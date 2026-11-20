/* =====================================================================
   IN THE END, THE AUDIOBOOK (shared/gg-listen-book.js)   BLD 1026, November 2026; Founder and Supporter only, BLD 1029
   A private listening copy of In the End, read aloud by Brian, for in-the-end-listen.html. The chapters are locked
   with the stories key (shared/gg-stories.js and stories/data.js), and the page opens for Founder and Supporter codes
   only (BLD 1029, Chris: "Gl"). Staff, Guide, and Member codes hold the stories key too, so the level is read here:
     1. A typed code: codes.js (shared/lib, then field-guide) gives Founder, Staff, or Guide (and Organization); a
        lib-member.js wrap gives Member or Household (and the Member wraps of Founder and Staff codes); the Staff code
        from before levels opens lib-staff.js. A code that opens the stories and none of these is a Supporter code.
        Founder and Supporter open the book; every other level reads "This listening copy opens with a Founder or
        Supporter code." and the book stays closed (the code still opens Grounded Stories, as it always has).
     2. The Founder tab in the Field Guide: In the End, Read Aloud opens this page with #bk=<stories key>&f=<the Founder
        image key> in the address fragment (bk, so gg-stories.js leaves it to this file), which never reaches a server and is cleared at once. The image key opens
        the Image Library list (shared/imglib/library.js), which only a Founder key opens, so that proves a Founder.
   Once a Founder or Supporter is verified, this device keeps a mark (localStorage 'gg_book_lv'): {lv, h}, where h is
   HMAC SHA-256(stories key, 'gg-book-listen|' + lv). The page opens by itself only with that mark and the same stories
   key, so a device opened earlier by a Staff, Guide, or Member code shows the code box. Forget This Device clears it.

   The manifest (stories/in-the-end-audio.js) sets window.GG_BOOK_AUDIO = {v: 1, k: {round, folder}, iv, ct}:
     iv, ct: AES-GCM 256 with the stories key (base64) of JSON
       {title, by, chapters: [{n: chapter number, t: title, s: seconds, f: file id, b: bytes}]}
   so even the chapter list stays private until a code opens it.
   Each chapter lives at https://audio.growwithgrounded.com/<round>/<folder>/<file id>.bin: a 12-byte random IV, then
   the AES-GCM ciphertext (with its tag) of the chapter mp3, the same format as the locked story clips. The file id
   is the lowercase hex of the first 16 bytes of HMAC SHA-256(stories key, 'book|' + sha256 hex of the mp3), so no
   title shows in a file name and a new recording gets a new name.
   This device remembers the last chapter, the place in it, and the speed (localStorage 'gg_book_ite').
   ===================================================================== */
(function (root) {
  'use strict';
  var BASE = 'https://audio.growwithgrounded.com/', LS = 'gg_book_ite', LV = 'gg_book_lv', SPEEDS = [0.9, 1, 1.15, 1.3], ITER = 250000;
  var OPENS = { founder: 1, supporter: 1 }, IMGLIB = '/shared/imglib/library.js?v=c173';
  var NOT = 'This listening copy opens with a Founder or Supporter code.';
  var subtle = root.crypto && root.crypto.subtle;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function unb64(s) { s = String(s || '').replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return Uint8Array.from(atob(s), function (c) { return c.charCodeAt(0); }); }
  function b64(buf) { var s = ''; new Uint8Array(buf).forEach(function (b) { s += String.fromCharCode(b); }); return btoa(s); }
  var enc = new TextEncoder(), dec = new TextDecoder();
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function clock(sec) {
    sec = Math.max(0, Math.floor(+sec || 0));
    var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
    return (h ? h + ':' + (m < 10 ? '0' : '') : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }
  function lsGet() { try { return JSON.parse(root.localStorage.getItem(LS) || 'null') || {}; } catch (e) { return {}; } }
  function lsSet(o) { try { root.localStorage.setItem(LS, JSON.stringify(o)); } catch (e) {} }

  var KEY = null, BOOK = null, CUR = -1, URLS = {}, LOADING = {}, A = null, SAVED = lsGet(), WANT = false, RESUME = 0;

  function keyBytes() { var k = root.GGStories && GGStories.keyObj && GGStories.keyObj(); return k && k.key ? unb64(k.key) : null; }
  function openManifest(raw) {
    var m = root.GG_BOOK_AUDIO; if (!m || !m.ct || !subtle) return Promise.reject(new Error('manifest'));
    return subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['decrypt']).then(function (k) {
      KEY = k; return subtle.decrypt({ name: 'AES-GCM', iv: unb64(m.iv) }, k, unb64(m.ct));
    }).then(function (pt) { return JSON.parse(new TextDecoder().decode(pt)); });
  }
  function fileUrl(c) { var k = root.GG_BOOK_AUDIO.k || {}; return BASE + (k.round || 's1') + '/' + (k.folder || 't') + '/' + c.f + '.bin'; }

  // Fetches and unlocks one chapter; resolves a Blob URL. onp(fraction) shows the download.
  function load(i, onp) {
    if (URLS[i]) return Promise.resolve(URLS[i]);
    if (LOADING[i]) return LOADING[i];
    var c = BOOK.chapters[i];
    LOADING[i] = fetch(fileUrl(c)).then(function (r) {
      if (!r.ok) throw new Error('chapter ' + r.status);
      var total = +r.headers.get('content-length') || c.b || 0;
      if (!r.body || !r.body.getReader || !total) return r.arrayBuffer();
      var rd = r.body.getReader(), parts = [], got = 0;
      function pump() {
        return rd.read().then(function (x) {
          if (x.done) { var u = new Uint8Array(got), o = 0; parts.forEach(function (p) { u.set(p, o); o += p.length; }); return u.buffer; }
          parts.push(x.value); got += x.value.length; if (onp) onp(Math.min(1, got / total)); return pump();
        });
      }
      return pump();
    }).then(function (buf) {
      if (buf.byteLength < 29) throw new Error('chapter');
      return subtle.decrypt({ name: 'AES-GCM', iv: buf.slice(0, 12) }, KEY, buf.slice(12));
    }).then(function (mp3) {
      URLS[i] = URL.createObjectURL(new Blob([mp3], { type: 'audio/mpeg' }));
      delete LOADING[i];
      // Keep only this chapter and its neighbors in memory.
      Object.keys(URLS).forEach(function (j) { j = +j; if (Math.abs(j - CUR) > 1 && j !== i) { URL.revokeObjectURL(URLS[j]); delete URLS[j]; } });
      return URLS[i];
    }, function (e) { delete LOADING[i]; throw e; });
    return LOADING[i];
  }

  function save() { if (CUR < 0 || !A || !A.src) return; SAVED = { c: CUR, t: Math.floor(A.currentTime || 0), r: A.playbackRate || 1 }; lsSet(SAVED); }
  function status(t) { var s = $('#bk-status'); if (s) s.textContent = t || ''; }

  function setPlayIcon() {
    var b = $('#bk-play'), on = !A.paused;
    b.setAttribute('aria-label', on ? 'Pause' : 'Play'); b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.innerHTML = on ? '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>';
  }
  function showChapter() {
    var c = BOOK.chapters[CUR];
    $('#bk-now').textContent = c.t;
    $('#bk-num').textContent = 'Chapter ' + (CUR + 1) + ' of ' + BOOK.chapters.length;
    $('#bk-prev').disabled = CUR <= 0; $('#bk-next').disabled = CUR >= BOOK.chapters.length - 1;
    Array.prototype.forEach.call(document.querySelectorAll('.bk-ch'), function (r) {
      var on = +r.getAttribute('data-i') === CUR; r.classList.toggle('on', on); if (on) r.setAttribute('aria-current', 'true'); else r.removeAttribute('aria-current');
    });
    if ('mediaSession' in navigator && root.MediaMetadata) {
      try { navigator.mediaSession.metadata = new MediaMetadata({ title: c.t, artist: 'Chris Joy', album: BOOK.title || 'In the End' }); } catch (e) {}
    }
  }
  function tick() {
    var d = A.duration || (BOOK.chapters[CUR] || {}).s || 0, t = A.currentTime || 0, bar = $('#bk-bar');
    if (!bar.dragging) { bar.max = Math.max(1, Math.floor(d)); bar.value = Math.floor(t); }
    bar.style.setProperty('--p', (d ? Math.min(100, (bar.value / bar.max) * 100) : 0) + '%');
    $('#bk-t').textContent = clock(bar.dragging ? bar.value : t); $('#bk-d').textContent = clock(d);
  }

  // Opens chapter i at time t; plays when play is true.
  function go(i, t, play) {
    if (!BOOK || i < 0 || i >= BOOK.chapters.length) return Promise.resolve();
    RESUME = 0;
    save();
    CUR = i; WANT = !!play; showChapter();
    A.pause(); setPlayIcon();
    status('Opening the chapter, one moment.');
    var rate = A.playbackRate || 1;
    return load(i, function (p) { if (CUR === i) status('Opening the chapter, ' + Math.round(p * 100) + ' percent.'); }).then(function (u) {
      if (CUR !== i) return;
      A.src = u; A.playbackRate = rate; A.defaultPlaybackRate = rate;
      var start = function () {
        A.removeEventListener('loadedmetadata', start);
        if (t > 0 && t < (A.duration || Infinity) - 2) A.currentTime = t;
        A.playbackRate = rate; tick(); status('');
        if (WANT) A.play().catch(function () { setPlayIcon(); });
      };
      A.addEventListener('loadedmetadata', start);
      A.load();
      save();
    }, function () {
      if (CUR === i) status('This chapter is taking a moment to arrive. Check the connection, then press Play again.');
    });
  }
  // The first Play opens the place this device saved, after that a chapter starts at its beginning.
  function toggle() {
    if (!A.src) { var t = RESUME; RESUME = 0; go(CUR < 0 ? 0 : CUR, t, true); return; }
    if (A.paused) { WANT = true; A.play().catch(function () {}); } else { WANT = false; A.pause(); }
  }
  function skip(sec) { if (!A.src) return; A.currentTime = Math.max(0, Math.min((A.duration || 0) - 0.5, A.currentTime + sec)); tick(); save(); }
  function setSpeed(r) {
    A.playbackRate = r; A.defaultPlaybackRate = r;
    Array.prototype.forEach.call(document.querySelectorAll('.bk-sp button'), function (b) { b.setAttribute('aria-pressed', +b.getAttribute('data-r') === r ? 'true' : 'false'); });
    if (A.src) save(); else { SAVED.r = r; lsSet(SAVED); }
  }

  function draw() {
    var host = $('#bk-app'), C = BOOK.chapters, total = C.reduce(function (a, c) { return a + (+c.s || 0); }, 0);
    var ico = function (d) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>'; };
    host.innerHTML = '<div class="bk-head"><h2 class="bk-title"><i>' + esc(BOOK.title || 'In the End') + '</i></h2>'
      + (BOOK.sub ? '<p class="bk-sub">' + esc(BOOK.sub) + '</p>' : '')
      + '<p class="bk-by">Written by ' + esc(BOOK.by || 'Chris Joy') + ' &middot; Read by a narrator &middot; ' + C.length + ' chapters, about ' + (Math.round(total / 360) / 10) + ' hours</p></div>'
      + '<section class="bk-player" aria-label="Player">'
      + '<p class="bk-num" id="bk-num"></p><p class="bk-now" id="bk-now" aria-live="polite"></p>'
      + '<div class="bk-prog"><label class="sr-only" for="bk-bar">Place in this chapter</label><input type="range" id="bk-bar" min="0" max="1" value="0" step="1">'
      + '<div class="bk-times"><span id="bk-t">0:00</span><span id="bk-d">0:00</span></div></div>'
      + '<div class="bk-ctl">'
      + '<button type="button" class="bk-b" id="bk-prev" aria-label="Previous chapter">' + ico('<path d="M6 5v14M18 5.8v12.4a.8.8 0 0 1-1.25.66L8.5 12.66a.8.8 0 0 1 0-1.32l8.25-6.2A.8.8 0 0 1 18 5.8z"/>') + '</button>'
      + '<button type="button" class="bk-b bk-skip" id="bk-back" aria-label="Back 15 seconds">' + ico('<path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" fill="none"/>') + '<span>15</span></button>'
      + '<button type="button" class="bk-b bk-play" id="bk-play" aria-label="Play"></button>'
      + '<button type="button" class="bk-b bk-skip" id="bk-fwd" aria-label="Forward 30 seconds">' + ico('<path d="M20 12a8 8 0 1 1-2.4-5.7M20 4v4h-4" fill="none"/>') + '<span>30</span></button>'
      + '<button type="button" class="bk-b" id="bk-next" aria-label="Next chapter">' + ico('<path d="M18 5v14M6 5.8v12.4a.8.8 0 0 0 1.25.66l8.25-6.2a.8.8 0 0 0 0-1.32L7.25 5.14A.8.8 0 0 0 6 5.8z"/>') + '</button>'
      + '</div>'
      + '<div class="bk-sp" role="group" aria-label="Speed"><span class="bk-sp-l">Speed</span>'
      + SPEEDS.map(function (r) { return '<button type="button" data-r="' + r + '" aria-pressed="false">' + r + '&times;</button>'; }).join('') + '</div>'
      + '<p class="bk-status" id="bk-status" aria-live="polite"></p>'
      + '</section>'
      + '<h2 class="bk-h">Chapters</h2><ol class="bk-list">'
      + C.map(function (c, i) { return '<li><button type="button" class="bk-ch" data-i="' + i + '"><span class="bk-ch-n">' + (i + 1) + '</span><span class="bk-ch-t">' + esc(c.t) + '</span><span class="bk-ch-s">' + clock(c.s) + '</span></button></li>'; }).join('')
      + '</ol>'
      + '<p class="bk-forget"><button type="button" class="bk-link" id="bk-forget">Forget This Device</button></p>';

    A = $('#bk-audio');
    A.addEventListener('timeupdate', function () {
      tick();
      if (Math.floor(A.currentTime) % 5 === 0) save();
      // Get the next chapter ready halfway through, so the book flows on without a wait.
      if (A.duration && A.currentTime > A.duration / 2 && CUR + 1 < C.length && !URLS[CUR + 1] && !LOADING[CUR + 1]) load(CUR + 1).catch(function () {});
    });
    A.addEventListener('play', setPlayIcon); A.addEventListener('pause', function () { setPlayIcon(); save(); });
    A.addEventListener('ended', function () {
      if (CUR + 1 < C.length) go(CUR + 1, 0, true);
      else { SAVED = { c: 0, t: 0, r: A.playbackRate || 1 }; lsSet(SAVED); status('The end of the book. Thank you for listening.'); }
    });
    $('#bk-play').addEventListener('click', toggle);
    $('#bk-back').addEventListener('click', function () { skip(-15); });
    $('#bk-fwd').addEventListener('click', function () { skip(30); });
    $('#bk-prev').addEventListener('click', function () { go(CUR - 1, 0, !A.paused || WANT); });
    $('#bk-next').addEventListener('click', function () { go(CUR + 1, 0, !A.paused || WANT); });
    var bar = $('#bk-bar');
    bar.addEventListener('input', function () { bar.dragging = true; tick(); });
    bar.addEventListener('change', function () { bar.dragging = false; if (A.src) { A.currentTime = +bar.value; save(); } tick(); });
    $('.bk-sp').addEventListener('click', function (e) { var b = e.target.closest('button[data-r]'); if (b) setSpeed(+b.getAttribute('data-r')); });
    $('.bk-list').addEventListener('click', function (e) { var b = e.target.closest('.bk-ch'); if (b) go(+b.getAttribute('data-i'), 0, true); });
    $('#bk-forget').addEventListener('click', function () {
      try { A.pause(); } catch (e) {}
      try { root.localStorage.removeItem(LS); } catch (e) {}
      lvSet(null);
      if (root.GGStories && GGStories.forget) GGStories.forget();
      Object.keys(URLS).forEach(function (j) { URL.revokeObjectURL(URLS[j]); }); URLS = {};
      location.reload();
    });
    root.addEventListener('pagehide', save);
    document.addEventListener('visibilitychange', function () { if (document.hidden) save(); });
    if ('mediaSession' in navigator) {
      var ms = navigator.mediaSession, h = function (a, f) { try { ms.setActionHandler(a, f); } catch (e) {} };
      h('play', function () { toggle(); }); h('pause', function () { toggle(); });
      h('seekbackward', function () { skip(-15); }); h('seekforward', function () { skip(30); });
      h('previoustrack', function () { go(CUR - 1, 0, true); }); h('nexttrack', function () { go(CUR + 1, 0, true); });
    }
    setPlayIcon();
    var r = SPEEDS.indexOf(+SAVED.r) >= 0 ? +SAVED.r : 1; setSpeed(r);
    // Pick up where this device left off; the chapter arrives on the first press of Play.
    var c0 = +SAVED.c >= 0 && +SAVED.c < C.length ? +SAVED.c : 0;
    CUR = c0; showChapter();
    var t0 = +SAVED.t || 0;
    $('#bk-bar').max = Math.max(1, Math.floor(C[c0].s || 1)); $('#bk-bar').value = Math.floor(t0); $('#bk-t').textContent = clock(t0); $('#bk-d').textContent = clock(C[c0].s);
    RESUME = t0;
    if (t0 > 0) status('Welcome back. Press Play to pick up at ' + clock(t0) + '.');
  }

  // ---------------- who may open the book (BLD 1029) ----------------
  function lvGet() { try { return JSON.parse(root.localStorage.getItem(LV) || 'null'); } catch (e) { return null; } }
  function lvSet(o) { try { if (o) root.localStorage.setItem(LV, JSON.stringify(o)); else root.localStorage.removeItem(LV); } catch (e) {} }
  function markOf(raw, lv) {
    return subtle.importKey('raw', raw, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
      .then(function (k) { return subtle.sign('HMAC', k, enc.encode('gg-book-listen|' + lv)); }).then(b64);
  }
  function keepMark(raw, lv) { return markOf(raw, lv).then(function (h) { lvSet({ lv: lv, h: h }); }); }
  // True when this device kept a Founder or Supporter mark for the stories key it holds now.
  function marked(raw) {
    var o = lvGet(); if (!o || !OPENS[o.lv] || typeof o.h !== 'string') return Promise.resolve(false);
    return markOf(raw, o.lv).then(function (h) { return h === o.h; }, function () { return false; });
  }
  function loadScript(url) { return new Promise(function (ok) { var s = document.createElement('script'); s.src = url; s.onload = function () { ok(true); }; s.onerror = function () { ok(false); }; document.head.appendChild(s); }); }
  function loadLib(name, global) {
    if (root[global]) return Promise.resolve(root[global]);
    var t = Date.now();
    return loadScript('/shared/lib/' + name + '.js?t=' + t).then(function () { return root[global] ? true : loadScript('/field-guide/' + name + '.js?t=' + t); }).then(function () { return root[global] || null; });
  }
  function pbk(pass, salt) {
    return subtle.importKey('raw', enc.encode(String(pass).normalize('NFKC')), 'PBKDF2', false, ['deriveKey'])
      .then(function (base) { return subtle.deriveKey({ name: 'PBKDF2', salt: unb64(salt), iterations: ITER, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']); });
  }
  // The first box this key opens, as parsed JSON, or null.
  function firstOpen(k, boxes) {
    var i = 0;
    function next() {
      if (i >= boxes.length) return Promise.resolve(null);
      var b = boxes[i++]; if (!b || !b.iv || !b.ct) return next();
      return subtle.decrypt({ name: 'AES-GCM', iv: unb64(b.iv) }, k, unb64(b.ct)).then(function (pt) { try { return JSON.parse(dec.decode(pt)); } catch (e) { return {}; } }, next);
    }
    return next();
  }
  var tierOf = function (t) { return t === 'own' + 'er' ? 'founder' : t === 'fie' + 'ld' ? 'guide' : t === 'org' ? 'guide' : t; };
  // codes.js: the Field Guide's own reading of a code (trimmed and lowercase), and the three words and number form.
  function codesLevel(code) {
    return loadLib('codes', 'GFG_CODES').then(function (C) {
      if (!C) throw new Error('later');
      if (!C.salt || !(C.codes || []).length) return null;
      var forms = [String(code).trim().toLowerCase()], n = GGStories.normCode(code); if (forms.indexOf(n) < 0) forms.push(n);
      return Promise.all(forms.map(function (f) { return pbk(f, C.salt).then(function (k) { return firstOpen(k, C.codes); }); }))
        .then(function (r) { var hit = r[0] || r[1]; return hit ? tierOf(hit.tier) || 'staff' : null; });
    });
  }
  // lib-member.js: Member, Household, and the Member wraps of Founder and Staff codes (kind).
  function memberLevel(code) {
    return loadLib('lib-member', 'GFG_MEMBER').then(function (M) {
      if (!M) throw new Error('later');
      if (!M.ws || !(M.wraps || []).length) return null;
      return pbk(GGStories.normCode(code), M.ws).then(function (k) { return firstOpen(k, M.wraps); })
        .then(function (r) { return r ? tierOf(r.kind) || 'member' : null; });
    });
  }
  // The Staff code from before levels opens lib-staff.js with its own salt.
  function legacyStaff(code) {
    return loadLib('lib-staff', 'GFG_STAFF').then(function (B) {
      if (!B || !B.salt || !B.ct) return null;
      return pbk(String(code).trim().toLowerCase(), B.salt).then(function (k) { return subtle.decrypt({ name: 'AES-GCM', iv: unb64(B.iv) }, k, unb64(B.ct)); })
        .then(function () { return 'staff'; }, function () { return null; });
    });
  }
  // The level of a code that opens the stories: founder, staff, guide, member, household, or supporter.
  function levelOf(code) {
    return Promise.all([codesLevel(code), memberLevel(code)]).then(function (r) {
      if (r[0]) return r[0];
      if (r[1]) return r[1];
      return legacyStaff(code).then(function (s) { return s || 'supporter'; });
    });
  }
  // The Founder card's hand off: #bk=<stories key>&f=<Founder image key>. Resolves true when it proves a Founder.
  function fromCard() {
    var h = root.location.hash || '', k = /[#&]bk=([A-Za-z0-9+/=_-]+)/.exec(h), f = /[#&]f=([A-Za-z0-9+/=_-]+)/.exec(h);
    if (!k) return Promise.resolve(false);
    try { root.history.replaceState(root.history.state, '', root.location.pathname + root.location.search); } catch (e) {}
    if (!f || !GGStories.remember(decodeURIComponent(k[1]))) return Promise.resolve(false);
    var fk = unb64(decodeURIComponent(f[1]));
    return (root.GG_IMGLIB ? Promise.resolve(true) : loadScript(IMGLIB)).then(function () {
      var box = root.GG_IMGLIB; if (!box || !box.iv || !box.ct || fk.length !== 32) return false;
      return subtle.importKey('raw', fk, { name: 'AES-GCM' }, false, ['decrypt'])
        .then(function (ik) { return subtle.decrypt({ name: 'AES-GCM', iv: unb64(box.iv) }, ik, unb64(box.ct)); })
        .then(function () { return GGStories.restore(); }).then(function (ok) { var raw = ok && keyBytes(); return raw ? keepMark(raw, 'founder').then(function () { return true; }) : false; });
    }).catch(function () { return false; });
  }

  function shown(open) { $('#bk-lock').hidden = open; $('#bk-app').hidden = !open; }
  function opened(raw) {
    return openManifest(raw).then(function (b) { BOOK = b; shown(true); draw(); return true; });
  }
  function lockBox() {
    var f = $('#bk-form'), inp = $('#bk-code'), msg = $('#bk-msg'), btn = $('button', f);
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!root.GGStories || !GGStories.normCode(inp.value)) { msg.className = 'bk-msg bk-try'; msg.textContent = 'Type the code just as you received it: three words and a number.'; inp.focus(); return; }
      btn.disabled = true; msg.className = 'bk-msg'; msg.textContent = 'Opening the book, one moment.';
      var code = inp.value, again = "Let's try that once more: check each word and the number, like acorn-meadow-lantern-42.";
      function done(t) { btn.disabled = false; if (!t) return; msg.className = 'bk-msg bk-try'; msg.textContent = t; inp.focus(); inp.select(); }
      Promise.all([GGStories.unlock(code), levelOf(code).catch(function (e) { return e && e.message === 'later' ? 'later' : null; })]).then(function (r) {
        var raw = r[0] && keyBytes(), lv = r[1];
        if (!raw) return done(again);
        if (lv === 'later') return done('The book is still on its way. Try again in a moment.');
        if (!OPENS[lv]) return done(NOT);
        return keepMark(raw, lv).then(function () { return opened(raw); }).then(function () { done(''); inp.value = ''; }, function () { done(again); });
      }, function () { done(again); });
    });
  }

  function mount() {
    lockBox();
    if (!subtle || !root.GGStories || !root.GG_BOOK_AUDIO) { shown(false); return Promise.resolve(false); }
    return fromCard().then(function () { return GGStories.restore(); }).then(function (ok) {
      var raw = ok && keyBytes();
      if (!raw) { shown(false); return false; }
      return marked(raw).then(function (yes) {
        if (!yes) { shown(false); return false; }
        return opened(raw).catch(function () { shown(false); return false; });
      });
    });
  }

  root.GGBook = { version: 'c172', mount: mount, levelOf: levelOf, clock: clock, _state: function () { return { cur: CUR, book: BOOK, audio: A }; } };
})(typeof window !== 'undefined' ? window : globalThis);
