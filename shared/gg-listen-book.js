/* =====================================================================
   IN THE END, THE AUDIOBOOK (shared/gg-listen-book.js)   BLD 1026, November 2026
   A private listening copy of In the End, read aloud by Brian, for in-the-end-listen.html. It opens with the same
   lock as Grounded Stories (shared/gg-stories.js and stories/data.js): any code on the Access list (Founder, Staff,
   Guide, Supporter, or a code Chris makes for a friend) unwraps the stories key, and a device that already holds the
   stories key opens straight away.

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
  var BASE = 'https://audio.growwithgrounded.com/', LS = 'gg_book_ite', SPEEDS = [0.9, 1, 1.15, 1.3];
  var subtle = root.crypto && root.crypto.subtle;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function unb64(s) { return Uint8Array.from(atob(String(s || '')), function (c) { return c.charCodeAt(0); }); }
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
      GGStories.unlock(inp.value).then(function (ok) {
        if (ok) { var raw = keyBytes(); if (raw) return opened(raw); }
        return false;
      }).then(function (ok) {
        btn.disabled = false;
        if (ok) return;
        msg.className = 'bk-msg bk-try';
        msg.textContent = "Let's try that once more: check each word and the number, like acorn-meadow-lantern-42.";
        inp.focus(); inp.select();
      }, function () {
        btn.disabled = false; msg.className = 'bk-msg bk-try';
        msg.textContent = "Let's try that once more: check each word and the number, like acorn-meadow-lantern-42.";
      });
    });
  }

  function mount() {
    lockBox();
    if (!subtle || !root.GGStories || !root.GG_BOOK_AUDIO) { shown(false); return Promise.resolve(false); }
    return GGStories.restore().then(function (ok) {
      var raw = ok && keyBytes();
      if (!raw) { shown(false); return false; }
      return opened(raw).catch(function () { shown(false); return false; });
    });
  }

  root.GGBook = { version: 'c167', mount: mount, clock: clock, _state: function () { return { cur: CUR, book: BOOK, audio: A }; } };
})(typeof window !== 'undefined' ? window : globalThis);
