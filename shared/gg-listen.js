/* =====================================================================
   GROUNDED LISTEN (GWG BLD 784): a small Listen control for readings.
   (c) 2026 Grow With Grounded LLC.
   Plays a reading line by line in Brian's recorded voice, through one reused audio element (Safari's rule).
   Split rule (the same in the recording plans): one clip per non-empty line. A line is the text between line
   breaks (or one array item), whitespace collapsed to single spaces and trimmed. An empty line is a stanza break:
   a longer pause, no clip.
   Clips: public readings (Willow) play public v1 clips, named by GGLearn.clipName('brian', line), at
   GGLearn.rec.base + 'v1/' + name + '.mp3'. Sealed readings (the Service Builder) play locked clips named by
   GGLearn.sealedName(the Staff library audio object, 'brian', line), at <base><round>/<folder>/<name>.bin, a 12-byte
   IV then the AES-GCM ciphertext, unlocked into a Blob URL (BLD 781). Naming comes from shared/gg-learn.js, which
   both pages load. A missing clip is skipped quietly and the reading goes on.
   Reader (GWG BLD 799): every reading offers a Reader choice, Brian or Jenny, Brian by default. The choice is kept on
   this device under one shared key, gg_voice_reader, which the Readings Library (shared/gg-readings.js) reads too, so a
   choice made in one place holds everywhere. A page tells the other players at once with a 'gg-reader' window event.
   Use: GGListen.html({id, lines, sealed: audioObj or null, voice: 'brian'}) returns the control's markup.
   ===================================================================== */
(function () {
  'use strict';
  var SPEC = {}, P = { id: null, i: 0, state: 'idle', el: null, played: 0, token: 0, mid: false, timer: null, blobs: {}, quiet: {} };
  var SPEEDS = [[1, 'Normal'], [0.85, 'Slower'], [1.15, 'Faster']];
  var sp = 0;
  try { sp = Math.max(0, SPEEDS.map(function (s) { return String(s[0]); }).indexOf(localStorage.getItem('gg_listen_speed') || '1')); } catch (e) { sp = 0; }
  // The Reader: one key for every player on the site (GWG BLD 799).
  var READER_KEY = 'gg_voice_reader';
  var MEM = null; // this visit's choice, for a device where storage is blocked
  function chosen() { var v = null; try { v = localStorage.getItem(READER_KEY); } catch (e) {} return v === 'brian' || v === 'jenny' ? v : MEM; }
  function readerFor(spec) { return chosen() || (spec && spec.voice === 'jenny' ? 'jenny' : 'brian'); }
  function readerName(v) { return v === 'jenny' ? 'Jenny' : 'Brian'; }
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var norm = function (t) { return String(t == null ? '' : t).replace(/\s+/g, ' ').trim(); };
  // Text to lines, keeping single '' entries as stanza breaks.
  function linesOf(t) {
    var a = Array.isArray(t) ? t : String(t == null ? '' : t).split('\n'), out = [];
    a.forEach(function (x) { x = norm(x); if (x || (out.length && out[out.length - 1] !== '')) out.push(x); });
    while (out.length && out[out.length - 1] === '') out.pop();
    return out;
  }
  function clipText(spec) { return spec.lines.filter(function (x) { return !!x; }); }
  var L = function () { return window.GGLearn || null; };
  function publicUrl(v, t) { var G = L(); return G && G.clipName ? (G.rec && G.rec.base || 'https://audio.growwithgrounded.com/') + 'v1/' + G.clipName(v, t) + '.mp3' : ''; }
  var AK = {};
  function aesKey(k) {
    if (!AK[k.key]) AK[k.key] = Promise.resolve().then(function () {
      var raw = Uint8Array.from(atob(k.key), function (c) { return c.charCodeAt(0); });
      if (raw.length !== 32) throw new Error('key');
      return crypto.subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['decrypt']);
    });
    return AK[k.key];
  }
  function sealedUrl(k, v, t) {
    var G = L();
    if (!G || !G.sealedName || !window.crypto || !crypto.subtle) return Promise.reject(new Error('none'));
    return G.sealedName(k, v, t).then(function (n) { return fetch((G.rec && G.rec.base || 'https://audio.growwithgrounded.com/') + k.round + '/' + k.folder + '/' + n + '.bin'); })
      .then(function (r) { if (!r.ok) throw new Error('clip ' + r.status); return r.arrayBuffer(); })
      .then(function (buf) { if (buf.byteLength < 29) throw new Error('clip'); return aesKey(k).then(function (ak) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: buf.slice(0, 12) }, ak, buf.slice(12)); }); })
      .then(function (mp3) { return URL.createObjectURL(new Blob([mp3], { type: 'audio/mpeg' })); });
  }
  function urlFor(spec, i) {
    var t = spec.lines[i], v = readerFor(spec);
    if (!spec.sealed) return Promise.resolve(publicUrl(v, t));
    if (!P.blobs[v + i]) P.blobs[v + i] = sealedUrl(spec.sealed, v, t);
    return P.blobs[v + i];
  }
  function okSealed(k) { return !!(k && typeof k.key === 'string' && /^[a-z0-9]+$/i.test(String(k.round || '')) && /^[a-z0-9]+$/i.test(String(k.folder || ''))); }
  // A moment of silence played on the tap, so Safari lets the one element play clips unlocked after it.
  var SILENT = null;
  function silent() {
    if (SILENT) return SILENT;
    var n = 400, b = new Uint8Array(44 + n), d = new DataView(b.buffer), w = function (o, t) { for (var i = 0; i < t.length; i++) b[o + i] = t.charCodeAt(i); };
    w(0, 'RIFF'); d.setUint32(4, 36 + n, true); w(8, 'WAVEfmt '); d.setUint32(16, 16, true); d.setUint16(20, 1, true); d.setUint16(22, 1, true);
    d.setUint32(24, 8000, true); d.setUint32(28, 8000, true); d.setUint16(32, 1, true); d.setUint16(34, 8, true); w(36, 'data'); d.setUint32(40, n, true);
    for (var i = 44; i < b.length; i++) b[i] = 128;
    return (SILENT = 'data:audio/wav;base64,' + btoa(String.fromCharCode.apply(null, b)));
  }
  function el() { if (!P.el) { P.el = new Audio(); P.el.preload = 'auto'; } return P.el; }

  var ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>',
    stop: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="6.5" width="11" height="11" rx="1.5" fill="currentColor"/></svg>'
  };
  // The Reader toggle: one quiet button that names the reader and switches to the other one.
  function readerBtn(id) {
    var v = readerFor(SPEC[id]), o = v === 'jenny' ? 'brian' : 'jenny';
    return '<button type="button" class="ggl-b ggl-s ggl-r" data-ggl-act="reader" data-ggl-id="' + esc(id) + '" aria-label="Reader: ' + readerName(v) + '. Switch to ' + readerName(o) + '">Reader: ' + readerName(v) + '</button>';
  }
  function inner(id) {
    var st = P.id === id ? P.state : 'idle', sb = SPEEDS[sp];
    if (st === 'idle') return '<button type="button" class="ggl-b" data-ggl-act="play" data-ggl-id="' + esc(id) + '">' + ICON.play + 'Listen</button>' + readerBtn(id) + (P.quiet[id] ? '<span class="ggl-note">The recording is on its way.</span>' : '');
    return (st === 'playing' ? '<button type="button" class="ggl-b" data-ggl-act="pause" data-ggl-id="' + esc(id) + '">' + ICON.pause + 'Pause</button>' : '<button type="button" class="ggl-b" data-ggl-act="resume" data-ggl-id="' + esc(id) + '">' + ICON.play + 'Resume</button>')
      + '<button type="button" class="ggl-b" data-ggl-act="stop" data-ggl-id="' + esc(id) + '">' + ICON.stop + 'Stop</button>'
      + '<button type="button" class="ggl-b ggl-s" data-ggl-act="speed" data-ggl-id="' + esc(id) + '" aria-label="Speed: ' + sb[1] + '">Speed: ' + sb[1] + '</button>' + readerBtn(id);
  }
  function stamp(id) { return (P.id === id ? P.state : 'idle') + '|' + sp + '|' + (P.quiet[id] ? 1 : 0) + '|' + readerFor(SPEC[id]); }
  function sel(id) { return '[data-ggl="' + (window.CSS && CSS.escape ? CSS.escape(id) : id) + '"]'; }
  function paint(id) {
    if (!id) return;
    // Repaint a control only when its state changes, so its buttons (and keyboard focus) stay put line to line.
    var mk = stamp(id);
    Array.prototype.forEach.call(document.querySelectorAll('.ggl' + sel(id)), function (n) {
      if (n.getAttribute('data-ggl-st') === mk) return;
      var f = document.activeElement && n.contains(document.activeElement) ? document.activeElement.getAttribute('data-ggl-act') : null;
      n.innerHTML = inner(id); n.setAttribute('data-ggl-st', mk);
      if (f) { var b = n.querySelector('[data-ggl-act]'); var m = { play: 'pause', pause: 'resume', resume: 'pause', stop: 'play', reader: 'reader' }; b = n.querySelector('[data-ggl-act="' + f + '"]') || n.querySelector('[data-ggl-act="' + (m[f] || '') + '"]') || b; try { b.focus({ preventScroll: true }); } catch (e) {} }
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-ggl-text]'), function (box) {
      var on = P.id && box.getAttribute('data-ggl-text') === P.id && P.state !== 'idle';
      Array.prototype.forEach.call(box.querySelectorAll('[data-ggl-ln]'), function (p) { p.classList.toggle('ggl-now', !!on && +p.getAttribute('data-ggl-ln') === P.i); });
    });
  }
  function css() {
    if (document.getElementById('ggl-listen-css')) return;
    var s = document.createElement('style'); s.id = 'ggl-listen-css';
    s.textContent = '.ggl{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:6px 0 12px;min-width:0}'
      + '.ggl-b{display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:6px 14px;border-radius:999px;border:1.5px solid var(--line,rgba(0,0,0,.2));background:var(--card,transparent);color:var(--ink,inherit);font:inherit;font-size:15px;font-weight:600;cursor:pointer;line-height:1.1}'
      + '.ggl-b:hover{border-color:var(--gold,currentColor)}.ggl-b:focus-visible{outline:2px solid var(--gold,currentColor);outline-offset:2px}'
      + '.ggl-b svg{width:16px;height:16px;flex:none;color:var(--gold,currentColor)}.ggl-s{font-weight:500;color:var(--ink-soft,inherit)}'
      + '.ggl-note{font-size:14px;color:var(--ink-soft,inherit)}'
      + '[data-ggl-ln]{transition:background-color .3s ease;border-radius:6px}[data-ggl-ln].ggl-now{background:rgba(201,162,39,.16)}'
      + '@media print{.ggl{display:none!important}}';
    (document.head || document.documentElement).appendChild(s);
  }

  function clearTimer() { if (P.timer) { clearTimeout(P.timer); P.timer = null; } }
  function revoke() { Object.keys(P.blobs).forEach(function (k) { P.blobs[k].then(function (u) { try { URL.revokeObjectURL(u); } catch (e) {} }, function () {}); }); P.blobs = {}; }
  function stop() {
    var id = P.id; P.token++; clearTimer();
    if (P.el) { P.el.onended = P.el.onerror = null; try { P.el.pause(); } catch (e) {} }
    P.state = 'idle'; P.mid = false; P.id = null; revoke(); paint(id);
  }
  function finish() {
    var id = P.id, none = P.played === 0; stop();
    if (none && id) { P.quiet[id] = true; paint(id); }
  }
  function next(gap) {
    var tk = P.token; P.mid = false; P.i++;
    clearTimer(); P.timer = setTimeout(function () { P.timer = null; if (tk === P.token && P.state === 'playing') step(); }, gap);
  }
  function step() {
    var spec = SPEC[P.id], tk = P.token;
    if (!spec) return stop();
    while (P.i < spec.lines.length && !spec.lines[P.i]) P.i++; // stanza breaks are handled by the gap
    if (P.i >= spec.lines.length) return finish();
    paint(P.id);
    var i = P.i, a = el();
    for (var j = i + 1; j < spec.lines.length; j++) if (spec.lines[j]) { if (spec.sealed) urlFor(spec, j).catch(function () {}); break; }
    var gapAfter = function () { return spec.lines[i + 1] === '' ? 900 : 380; };
    urlFor(spec, i).then(function (u) {
      if (tk !== P.token) return;
      if (!u) { next(0); return; }
      P.mid = true;
      a.onended = function () { if (tk !== P.token) return; P.played++; next(gapAfter()); };
      a.onerror = function () { if (tk !== P.token) return; next(0); };
      a.src = u; a.playbackRate = SPEEDS[sp][0];
      if (P.state !== 'playing') return;
      var pr = a.play(); if (pr && pr.catch) pr.catch(function () { if (tk === P.token && P.state === 'playing' && a.src === u && a.paused) next(0); });
    }, function () { if (tk === P.token) next(0); });
  }
  function play(id) {
    var spec = SPEC[id]; if (!spec) return;
    stop(); P.id = id; P.i = 0; P.played = 0; P.state = 'playing'; delete P.quiet[id];
    var a = el(); a.onended = a.onerror = null;
    if (spec.sealed) { try { a.src = silent(); var pr = a.play(); if (pr && pr.catch) pr.catch(function () {}); } catch (e) {} }
    step();
  }
  function act(what, id) {
    if (what === 'reader') return setReader(readerFor(SPEC[id]) === 'jenny' ? 'brian' : 'jenny');
    if (what === 'play') return play(id);
    if (P.id !== id) return;
    if (what === 'stop') return stop();
    if (what === 'pause' && P.state === 'playing') { P.state = 'paused'; clearTimer(); try { el().pause(); } catch (e) {} paint(id); return; }
    if (what === 'resume' && P.state === 'paused') {
      P.state = 'playing'; paint(id);
      if (P.mid) { var a = el(), pr = a.play(); if (pr && pr.catch) pr.catch(function () {}); } else step();
      return;
    }
    if (what === 'speed') { sp = (sp + 1) % SPEEDS.length; try { localStorage.setItem('gg_listen_speed', String(SPEEDS[sp][0])); } catch (e) {} if (P.el) P.el.playbackRate = SPEEDS[sp][0]; paint(id); }
  }
  // Switching the reader keeps the place: the line that is playing starts over in the other voice.
  function swapVoice() {
    if (!P.id || P.state === 'idle') return;
    P.token++; clearTimer(); revoke();
    if (P.el) { P.el.onended = P.el.onerror = null; try { P.el.pause(); } catch (e) {} }
    P.mid = false;
    if (P.state === 'playing') step();
  }
  function setReader(v, quiet) {
    if (v !== 'brian' && v !== 'jenny') return;
    MEM = v;
    if (!quiet) try { localStorage.setItem(READER_KEY, v); } catch (e) {}
    swapVoice();
    Object.keys(SPEC).forEach(function (id) { delete P.quiet[id]; paint(id); });
    if (!quiet) try { window.dispatchEvent(new CustomEvent('gg-reader', { detail: { voice: v, from: 'listen' } })); } catch (e) {}
  }
  // Another player on this page (the Readings Library) or another tab changed the reader.
  window.addEventListener('gg-reader', function (e) { if (e.detail && e.detail.from !== 'listen') setReader(e.detail.voice, true); });
  window.addEventListener('storage', function (e) { if (e.key === READER_KEY && (e.newValue === 'brian' || e.newValue === 'jenny')) setReader(e.newValue, true); });
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('[data-ggl-act]'); if (!b) return;
    e.preventDefault(); e.stopPropagation(); act(b.getAttribute('data-ggl-act'), b.getAttribute('data-ggl-id'));
  }, true);
  // When the reading that is playing leaves the page (back to the list, another view), the voice stops with it.
  var pend = false;
  function watch() {
    if (!window.MutationObserver || !document.body) return;
    new MutationObserver(function () {
      if (pend || !P.id) return; pend = true;
      setTimeout(function () { pend = false; if (P.id && !document.querySelector('.ggl' + sel(P.id))) stop(); else if (P.id) paint(P.id); }, 0);
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.body) watch(); else document.addEventListener('DOMContentLoaded', watch);

  // spec: {id, lines: array or text, sealed: the library audio object or null, voice: the default reader, 'brian'}. Returns '' when
  // there is nothing to play (no lines, or a sealed reading whose library has no audio key yet).
  function html(spec) {
    if (!spec || !spec.id) return '';
    var lines = linesOf(spec.lines);
    if (!lines.some(Boolean)) return '';
    if (spec.sealed != null && !okSealed(spec.sealed)) return '';
    css();
    SPEC[spec.id] = { id: spec.id, lines: lines, sealed: spec.sealed || null, voice: spec.voice === 'jenny' ? 'jenny' : 'brian' };
    return '<div class="ggl" data-ggl="' + esc(spec.id) + '" data-ggl-st="' + stamp(spec.id) + '" role="group" aria-label="Listen to this reading">' + inner(spec.id) + '</div>';
  }
  // For tests and tools: the clip names a reading will ask for, in order, in the chosen reader's voice (or spec.reader).
  function names(spec) {
    var lines = linesOf(spec.lines).filter(Boolean), G = L(), v = spec.reader || readerFor(spec);
    if (spec.sealed) return Promise.all(lines.map(function (t) { return G.sealedName(spec.sealed, v, t); }));
    return Promise.resolve(lines.map(function (t) { return G.clipName(v, t); }));
  }
  window.GGListen = { html: html, linesOf: linesOf, names: names, stop: stop, state: function () { return { id: P.id, i: P.i, state: P.state, played: P.played, speed: SPEEDS[sp][0], reader: readerFor(SPEC[P.id]), src: P.el ? P.el.src : '' }; }, act: act,
    reader: { get: function () { return chosen() || 'brian'; }, set: function (v) { setReader(v); }, key: READER_KEY }, version: 'b799' };
})();
