/* =====================================================================
   GROUNDED LIVE (shared/gg-live.js), GWG BLD 1036
   One join page (growwithgrounded.com/live/) and one live room on the Grounded server, used by many hosts:
   a teacher's Class Check-in in The Grove, and quick polls in the Field Guide for seminars and talks.
   (Chris, November 21, 2026: "this works well w seminars too to get the audience involved.. we need to get this built for
   lots of grounded live stuff".)

   How it stays private:
   - Each room has its own key (AES-GCM, 256 bits) made on the host's device. The QR code carries it after the # in the
     address, and browsers never send that part to any server. A typed code (GROVE 4821) works too: the server hands back
     the room key sealed with a key both devices make from the code (PBKDF2, 300,000 rounds, SHA-256, with a salt from
     the host). The server sees only a one way hash of the code, never the code or the key.
   - Every screen and every answer is sealed on the device. The server keeps ciphertext and two counts: how many joined
     and how many answered the question on screen. The host's device opens the answers and makes the totals.
   - No sign in, no names, no typing on student screens: a tap on an answer.
   - A room is deleted when the host ends it, and within 2 hours at most.
   - Classrooms keep nothing on the server, ever. A seminar poll may turn on Grounded Insights (off by default): with 10
     or more in the room, the server keeps the totals for each question under the poll's label, and nothing else.

   LIVE_ON (below) keeps all of it resting until go-live (patches/bld1036/DEPLOY1036.md). Tests turn it on for one
   browser with window.GG_LIVE_ON = true; nothing on the site sets that.

   GGLive.on()                         true once LIVE_ON is on
   GGLive.host(opts)                   the host's screen, ready for a projector; resolves with the totals, or null
   GGLive.mountJoin(el)                the join page (live/index.html)
   GGLive.spread(counts)               for a four step answer scale: the average (1 to 4), how far answers spread, and split
   No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGLive) return;
  var LIVE_ON = false;
  function on() { return LIVE_ON === true || window.GG_LIVE_ON === true; }
  var site = /(^|\.)growwithgrounded\.com$/.test(location.hostname);
  function api() { return window.GG_LIVE_API || window.GG_ACCOUNT_API || (site ? 'https://api.growwithgrounded.com/v1' : ''); }
  function joinUrl() { return location.origin + '/live/'; }
  function joinShown() { return (site ? 'growwithgrounded.com' : location.host) + '/live'; }
  var subtle = window.crypto && crypto.subtle, TE = new TextEncoder(), TD = new TextDecoder();
  var ROUNDS = 300000, POLL_HOST = 1500, POLL_JOIN = 2000;

  /* ---------- small helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function b64u(u8) { u8 = new Uint8Array(u8); var s = ''; for (var i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function unb64u(s) { s = String(s || '').replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function rnd(n) { return crypto.getRandomValues(new Uint8Array(n)); }
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function normCode(s) { return String(s || '').replace(/[^0-9]/g, '').slice(-4); }
  function newCode() { var u = new Uint32Array(1); crypto.getRandomValues(u); return String(u[0] % 10000).padStart(4, '0'); }
  function aes(raw) { return subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']); }
  function seal(key, obj, aad) {
    var iv = rnd(12);
    return subtle.encrypt({ name: 'AES-GCM', iv: iv, additionalData: TE.encode(aad) }, key, TE.encode(JSON.stringify(obj)))
      .then(function (ct) { return b64u(iv) + '.' + b64u(ct); });
  }
  function openBox(key, s, aad, raw) {
    var p = String(s || '').split('.');
    return subtle.decrypt({ name: 'AES-GCM', iv: unb64u(p[0]), additionalData: TE.encode(aad) }, key, unb64u(p[1]))
      .then(function (pt) { return raw ? new Uint8Array(pt) : JSON.parse(TD.decode(pt)); });
  }
  // The typed code: the server finds the room by a one way hash, and both devices make the code key from code plus salt.
  function findOf(code) { return subtle.digest('SHA-256', TE.encode('gg-live-find|' + normCode(code))).then(b64u); }
  function codeKey(code, salt) {
    return subtle.importKey('raw', TE.encode('gg-live|' + normCode(code)), 'PBKDF2', false, ['deriveKey']).then(function (base) {
      return subtle.deriveKey({ name: 'PBKDF2', salt: salt, iterations: ROUNDS, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    });
  }
  function req(method, path, body, auth) {
    var h = { 'X-GG-Client': '1' };
    if (body != null) h['Content-Type'] = 'application/json';
    if (auth) h.Authorization = 'Live ' + auth;
    return fetch(api() + path, { method: method, headers: h, body: body == null ? undefined : JSON.stringify(body), credentials: 'omit', cache: 'no-store' })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || !j.ok) { var e = new Error((j && j.why) || 'server'); e.why = (j && j.why) || 'server'; e.status = r.status; throw e; } return j; }); },
        function () { var e = new Error('offline'); e.why = 'offline'; throw e; });
  }
  var aadState = function (room) { return 'gg-live-state|' + room; };
  var aadAns = function (room, step) { return 'gg-live-ans|' + room + '|' + step; };

  // A four step scale (Not Yet, Sometimes, Often, Almost Always, then Pass, which counts for nothing):
  // the average from 1 to 4, the spread (standard deviation), and split when the room sees it in very different ways.
  function spread(counts) {
    var c = (counts || []).slice(0, 4).map(function (x) { return +x || 0; }), n = c.reduce(function (a, b) { return a + b; }, 0);
    if (!n) return { n: 0, avg: null, sd: 0, split: false };
    var avg = (c[0] + 2 * c[1] + 3 * c[2] + 4 * c[3]) / n, v = 0;
    c.forEach(function (k, i) { v += k * Math.pow(i + 1 - avg, 2); });
    var sd = Math.sqrt(v / n), low = (c[0] + c[1]) / n, high = (c[2] + c[3]) / n;
    return { n: n, avg: avg, sd: sd, split: n >= 4 && sd >= 1 && Math.min(low, high) >= 0.25 };
  }

  /* =====================================================================
     THE HOST: a room on the server, and the screen for a projector
     ===================================================================== */
  function Room() { this.id = ''; this.token = ''; this.key = null; this.raw = null; this.code = ''; this.insights = false; this.expires = 0; }
  Room.prototype.open = function (kind, insights) {
    var self = this, raw = rnd(32), salt = rnd(16), tries = 0;
    self.raw = raw;
    function go() {
      var code = newCode();
      return Promise.all([aes(raw), findOf(code), codeKey(code, salt)]).then(function (x) {
        self.key = x[0];
        return seal(x[2], b64u(raw), 'gg-live-wrap').then(function (wrap) {
          return req('POST', '/live/rooms', { kind: kind, find: x[1], salt: b64u(salt), wrap: wrap, insights: !!insights });
        });
      }).then(function (j) { self.id = j.room; self.token = j.host; self.code = code; self.insights = !!j.insights; self.expires = j.expires; return self; },
        function (e) { if (e.why === 'taken' && ++tries < 6) return go(); throw e; });
    }
    return go();
  };
  Room.prototype.url = function () { return joinUrl() + '#j=' + this.id + '.' + b64u(this.raw); };
  Room.prototype.show = function (state, step, open) {
    var self = this;
    return seal(self.key, state, aadState(self.id)).then(function (s) { return req('PUT', '/live/rooms/' + self.id, { state: s, step: step, open: !!open }, self.token); });
  };
  Room.prototype.peek = function (step) { return req('GET', '/live/rooms/' + this.id + '/host?step=' + step, null, this.token); };
  // Opens every sealed answer for a step and counts each choice. An answer that does not open is left out.
  Room.prototype.tally = function (step, nChoices, answers) {
    var self = this, counts = []; for (var i = 0; i < nChoices; i++) counts.push(0);
    var n = 0;
    return Promise.all((answers || []).map(function (ct) {
      return openBox(self.key, ct, aadAns(self.id, step)).then(function (a) {
        var picks = Array.isArray(a && a.a) ? a.a : [], seen = {}, okOne = false;
        picks.forEach(function (k) { if (Number.isInteger(k) && k >= 0 && k < nChoices && !seen[k]) { seen[k] = 1; counts[k]++; okOne = true; } });
        if (okOne) n++;
      }, function () {});
    })).then(function () { return { counts: counts, answered: n }; });
  };
  Room.prototype.end = function (insights, keepalive) {
    if (!this.id) return Promise.resolve({ kept: false });
    var id = this.id, tok = this.token; this.id = '';
    if (keepalive) {
      try { fetch(api() + '/live/rooms/' + id + '/end', { method: 'POST', keepalive: true, credentials: 'omit', headers: { 'X-GG-Client': '1', 'Content-Type': 'application/json', Authorization: 'Live ' + tok }, body: '{}' }); } catch (e) {}
      return Promise.resolve({ kept: false });
    }
    return req('POST', '/live/rooms/' + id + '/end', insights ? { insights: insights } : {}, tok).catch(function () { return { kept: false }; });
  };

  var OV = null;   // the open host screen
  function bars(choices, counts, total, opt) {
    opt = opt || {};
    var max = Math.max(1, total || 0);
    return '<div class="gl-bars">' + choices.map(function (c, i) {
      var n = (counts || [])[i] || 0, w = Math.round(100 * n / max);
      return '<div class="gl-bar' + (opt.dim && opt.dim(i) ? ' gl-dim' : '') + '"><span class="gl-bl">' + esc(c) + '</span><span class="gl-bt"><i style="width:' + w + '%"></i></span><b class="gl-bn">' + n + '</b></div>';
    }).join('') + '</div>';
  }
  function hostCss() {
    if (document.getElementById('gl-css')) return;
    var src = (document.querySelector('script[src*="gg-live.js"]') || {}).src || '/shared/gg-live.js', v = /[?&]v=([^&]+)/.exec(src);
    var l = document.createElement('link'); l.id = 'gl-css'; l.rel = 'stylesheet'; l.href = '/shared/gg-live.css' + (v ? '?v=' + v[1] : ''); document.head.appendChild(l);
  }

  // opts: {kind: 'class' or 'poll', mode: 'devices' or 'hands', title, sub, word ('GROVE' or 'LIVE'), insights, label,
  //        quiet (one quiet line for a check-in), changes ([{id, label}] for What's Changed Lately), changesLead,
  //        questions: [{text, kid, say, kicker, choices: [labels], many, scale (a four step scale plus Pass)}]}
  // Resolves {how, joined, changes, results: [{counts, answered}], kept} when the host finishes, or null when they end early.
  function host(opts) {
    if (OV) OV.close(true);
    hostCss();
    return new Promise(function (resolve) {
      var Q = opts.questions || [], hands = opts.mode === 'hands', kind = opts.kind === 'class' ? 'class' : 'poll';
      var S = { phase: hands ? 'lobby' : 'opening', i: -1, joined: 0, answered: 0, live: null, results: [], changes: [], err: '', busy: false, ended: false, kept: false };
      var R = new Room(), timer = 0, last = null, prevFocus = document.activeElement;
      var el = document.createElement('div');
      el.className = 'gl-ov'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', opts.title || 'Grounded Live');
      document.body.appendChild(el); document.documentElement.classList.add('gl-open');
      var unload = function () { R.end(null, true); };
      window.addEventListener('pagehide', unload);
      function stateFor() {
        var q = S.i >= 0 ? Q[S.i] : null;
        return { v: 1, kind: kind, title: opts.title || 'Grounded Live', phase: S.phase === 'ask' ? 'ask' : S.phase === 'show' ? 'show' : S.phase === 'done' ? 'end' : 'lobby',
          n: S.i + 1, of: Q.length, q: q ? { text: q.say || q.text, kicker: q.kicker || '', choices: q.choices, many: !!q.many } : null, quiet: opts.quiet || '' };
      }
      function push() { if (hands || !R.id) return Promise.resolve(); return R.show(stateFor(), S.i + 1, S.phase === 'ask').catch(function (e) { S.err = words(e); paint(); }); }
      function words(e) { var w = e && e.why; return w === 'offline' ? 'You look offline. Check the connection; the room keeps everything so far.' : w === 'wait' ? 'That is a lot of rooms from here for one hour. Try again a little later.' : w === 'none' ? 'This room has closed. Start a new one any time.' : 'The Grounded server is out of reach right now. Try again in a moment.'; }
      function tick() {
        if (hands || !R.id || S.ended) return;
        var step = S.i + 1;
        R.peek(step).then(function (j) {
          S.joined = j.seats; S.answered = j.answered; S.err = '';
          if (kind === 'poll' && S.phase === 'ask') return R.tally(step, Q[S.i].choices.length, j.answers).then(function (t) { S.live = t; S.answered = t.answered; });
        }).then(paintCounts, function (e) { if (e && e.why === 'none') { S.err = words(e); S.ended = true; } paintCounts(); });
      }
      function begin() {
        if (!Q.length) return;
        S.i = 0; S.phase = 'ask'; S.answered = 0; S.live = null;
        if (hands) S.results[0] = { counts: Q[0].choices.map(function () { return 0; }), answered: 0 };
        paint(); push().then(tick);
      }
      // Closes answers for this question, then counts them once more, so a late tap is never lost or counted twice.
      function closeQ() {
        if (hands) { var r = S.results[S.i]; r.answered = Q[S.i].many ? r.answered : r.counts.reduce(function (a, b) { return a + b; }, 0); return Promise.resolve(); }
        S.busy = true; paint();
        var step = S.i + 1;
        return R.show(Object.assign(stateFor(), { phase: 'show' }), step, false).then(function () { return R.peek(step); }).then(function (j) {
          S.joined = j.seats; return R.tally(step, Q[S.i].choices.length, j.answers);
        }).then(function (t) { S.results[S.i] = t; S.answered = t.answered; }, function (e) { S.err = words(e); S.results[S.i] = S.results[S.i] || { counts: Q[S.i].choices.map(function () { return 0; }), answered: 0 }; })
          .then(function () { S.busy = false; });
      }
      function next() {
        if (S.i < Q.length - 1) {
          S.i++; S.phase = 'ask'; S.answered = 0; S.live = null;
          if (hands) S.results[S.i] = { counts: Q[S.i].choices.map(function () { return 0; }), answered: 0 };
          paint(); push().then(tick);
        } else finish();
      }
      function finish() {
        S.phase = 'done'; S.busy = true; paint();
        var ins = null;
        if (kind === 'poll' && R.insights && S.joined >= 10) ins = { label: opts.label || opts.title || 'Poll', questions: Q.map(function (q, i) { var r = S.results[i] || { counts: [], answered: 0 }; return { step: i + 1, q: q.text, many: !!q.many, c: q.choices.map(function (t, k) { return { t: t, n: r.counts[k] || 0 }; }) }; }) };
        var done = function (j) { S.kept = !!(j && j.kept); S.busy = false; S.ended = true; stop(); paint(); if (kind === 'class') close(false, true); };
        if (hands) { done(null); return; }
        push().then(function () { return R.end(ins); }).then(done, done);
      }
      function result() { return { how: hands ? 'hands' : 'devices', joined: hands ? null : S.joined, changes: S.changes.slice(), results: S.results.slice(), kept: S.kept, title: opts.title || '' }; }
      function stop() { clearInterval(timer); timer = 0; }
      function close(early, finished) {
        stop(); window.removeEventListener('pagehide', unload);
        if (early && R.id) R.end(null);
        el.remove(); document.documentElement.classList.remove('gl-open'); OV = null;
        try { if (prevFocus && prevFocus.focus) prevFocus.focus(); } catch (e) {}
        resolve(finished ? result() : null);
      }
      OV = { close: close };

      function head() {
        return '<div class="gl-top"><div><p class="gl-eb">' + esc(hands ? 'Show of Hands' : 'Grounded Live') + '</p><h2 class="gl-h" tabindex="-1">' + esc(opts.title || 'Grounded Live') + '</h2>' + (opts.sub ? '<p class="gl-sub">' + esc(opts.sub) + '</p>' : '') + '</div>' +
          (S.phase === 'done' ? '' : '<button type="button" class="gl-btn gl-line gl-sm" data-gl="end">End</button>') + '</div>';
      }
      function changesH() {
        if (!opts.changes || !opts.changes.length) return '';
        return '<div class="gl-changes"><p><b>' + esc(opts.changesLead || 'What’s changed lately?') + '</b> Tap any that fit. This helps choose practices, and never changes a result.</p><div class="gl-chips">' +
          opts.changes.map(function (c) { var on = S.changes.indexOf(c.id) >= 0; return '<button type="button" class="gl-chip' + (on ? ' on' : '') + '" aria-pressed="' + on + '" data-gl="chg" data-id="' + esc(c.id) + '">' + esc(c.label) + '</button>'; }).join('') + '</div></div>';
      }
      function countsH() {
        if (hands) return '';
        return '<p class="gl-count" aria-live="polite"><b data-gl-n>' + S.answered + '</b> of <b data-gl-of>' + S.joined + '</b> answered</p>';
      }
      function qHead(q) {
        return '<p class="gl-eb">Question ' + (S.i + 1) + ' of ' + Q.length + (q.kicker ? ' &middot; ' + esc(q.kicker) : '') + '</p><p class="gl-q">' + esc(q.text) + '</p>' +
          (q.kid && q.kid !== q.text ? '<p class="gl-kid">For children: ' + esc(q.kid) + '</p>' : '') + (q.many ? '<p class="gl-sub">Pick any that fit.</p>' : '');
      }
      function body() {
        if (S.phase === 'opening') return '<div class="gl-mid"><p class="gl-q">Opening the room…</p>' + (S.err ? '<p class="gl-err">' + esc(S.err) + '</p><div class="gl-row"><button type="button" class="gl-btn" data-gl="retry">Try Again</button></div>' : '') + '</div>';
        if (S.phase === 'lobby') {
          if (hands) return '<div class="gl-mid"><p class="gl-lead">Read each question aloud. Count the raised hands for each answer, and tap + for each one. Everyone can pass any time.</p>' + changesH() +
            '<div class="gl-row"><button type="button" class="gl-btn" data-gl="begin">Begin the Questions</button></div><p class="gl-sub">' + Q.length + (Q.length === 1 ? ' question' : ' questions') + '. Only the totals are saved, on this device.</p></div>';
          var code = (opts.word || 'LIVE') + ' ' + R.code;
          return '<div class="gl-lobby"><div class="gl-qr" data-gl-url="' + esc(R.url()) + '">' + (window.GGQR ? GGQR.svg(R.url(), { label: 'Scan to join', border: 2 }) : '') + '</div><div class="gl-join">' +
            '<p class="gl-lead">Scan the code to join, or go to <b>' + esc(joinShown()) + '</b> and type</p><p class="gl-code" aria-label="Join code ' + esc(code.split('').join(' ')) + '">' + esc(code) + '</p>' +
            '<p class="gl-sub">No sign-in and no names. Answers are sealed on each device, and this room is deleted when it ends.</p>' +
            (R.insights ? '<p class="gl-sub">Grounded Insights is on: with 10 or more here, the totals for each question count toward Grounded’s overall totals.</p>' : '') +
            '<p class="gl-count" aria-live="polite"><b data-gl-of>' + S.joined + '</b> joined</p>' + changesH() +
            '<div class="gl-row"><button type="button" class="gl-btn" data-gl="begin">Begin the Questions</button></div></div></div>';
        }
        var q = Q[S.i], r = S.results[S.i];
        if (S.phase === 'ask') {
          if (hands) return '<div class="gl-mid">' + qHead(q) + '<div class="gl-hands">' + q.choices.map(function (c, k) {
            var n = r.counts[k] || 0;
            return '<div class="gl-hand"><span class="gl-bl">' + esc(c) + '</span><button type="button" class="gl-pm" data-gl="minus" data-k="' + k + '" aria-label="One fewer for ' + esc(c) + '">−</button><b class="gl-hn" aria-live="polite">' + n + '</b><button type="button" class="gl-pm" data-gl="plus" data-k="' + k + '" aria-label="One more for ' + esc(c) + '">+</button></div>';
          }).join('') + '</div>' +
            '<div class="gl-row">' + (S.i ? '<button type="button" class="gl-btn gl-line" data-gl="back">Back</button>' : '') + '<button type="button" class="gl-btn" data-gl="next">' + (S.i < Q.length - 1 ? 'Next Question' : 'Finish and Save') + '</button></div></div>';
          var liveBars = kind === 'poll' ? '<div data-gl-live>' + bars(q.choices, (S.live || {}).counts || [], Math.max(1, S.answered)) + '</div>' : '';
          return '<div class="gl-mid">' + qHead(q) + countsH() + liveBars + '<div class="gl-row"><button type="button" class="gl-btn" data-gl="close"' + (S.busy ? ' disabled' : '') + '>' + (kind === 'class' ? 'Show the Spread' : S.i < Q.length - 1 ? 'Next Question' : 'Finish') + '</button></div></div>';
        }
        if (S.phase === 'show') {
          var sp = q.scale ? spread(r.counts) : null;
          return '<div class="gl-mid">' + qHead(q) + '<p class="gl-count"><b>' + r.answered + '</b> answered</p>' + bars(q.choices, r.counts, Math.max(1, r.answered), { dim: function (k) { return q.scale && k >= 4; } }) +
            (sp && sp.split ? '<p class="gl-talk"><b>Good to talk about together.</b> The class sees this one in different ways.</p>' : '') +
            '<div class="gl-row"><button type="button" class="gl-btn" data-gl="next">' + (S.i < Q.length - 1 ? 'Next Question' : 'Finish and Save') + '</button></div></div>';
        }
        // done (a poll shows every result here; a Class Check-in closes into The Grove's results)
        return '<div class="gl-mid"><p class="gl-q">' + (S.busy ? 'Saving…' : 'Thank you, everyone.') + '</p>' + (S.busy ? '' : '<p class="gl-sub">The room is closed and deleted from the Grounded server.' + (S.kept ? ' The totals counted toward Grounded Insights.' : '') + '</p>') +
          (S.busy ? '' : Q.map(function (q, i) { var x = S.results[i] || { counts: [], answered: 0 }; return '<div class="gl-sum"><p class="gl-eb">Question ' + (i + 1) + '</p><p><b>' + esc(q.text) + '</b></p><p class="gl-sub">' + x.answered + ' answered</p>' + bars(q.choices, x.counts, Math.max(1, x.answered)) + '</div>'; }).join('') +
          '<div class="gl-row"><button type="button" class="gl-btn" data-gl="done">Done</button></div>') + '</div>';
      }
      function paint() {
        var sy = el.scrollTop;
        el.innerHTML = '<div class="gl-box">' + head() + (S.err && S.phase !== 'opening' ? '<p class="gl-err" role="status">' + esc(S.err) + '</p>' : '') + body() + (opts.quiet ? '<p class="gl-quiet">' + esc(opts.quiet) + '</p>' : '') + '</div>';
        el.scrollTop = sy;
        var k = S.phase + ':' + S.i; if (k !== last) { last = k; var h = el.querySelector('.gl-q, .gl-h'); if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (e) {} } }
      }
      function paintCounts() {
        var n = el.querySelector('[data-gl-n]'), of = el.querySelector('[data-gl-of]'), lv = el.querySelector('[data-gl-live]');
        if (n) n.textContent = S.answered; if (of) of.textContent = S.joined;
        if (lv && S.live && S.i >= 0) lv.innerHTML = bars(Q[S.i].choices, S.live.counts, Math.max(1, S.answered));
        var er = el.querySelector('.gl-err');
        if (S.err && !er) paint(); else if (!S.err && er && S.phase !== 'opening') er.remove();
      }
      el.addEventListener('click', function (e) {
        var b = e.target.closest('[data-gl]'); if (!b || S.busy && b.dataset.gl !== 'end') return;
        var a = b.dataset.gl;
        if (a === 'end') { if (S.phase === 'done') return; if (!window.confirm(S.i >= 0 ? 'End now? The answers so far are cleared, and nothing is saved.' : 'End this room?')) return; close(true, false); }
        else if (a === 'retry') { S.err = ''; paint(); openRoom(); }
        else if (a === 'chg') { var id = b.dataset.id, c = S.changes, x = c.indexOf(id); if (x >= 0) c.splice(x, 1); else { if (id === 'none') c.length = 0; else { var y = c.indexOf('none'); if (y >= 0) c.splice(y, 1); } c.push(id); } paint(); }
        else if (a === 'begin') begin();
        else if (a === 'plus' || a === 'minus') { var r = S.results[S.i], k = +b.dataset.k; r.counts[k] = Math.max(0, (r.counts[k] || 0) + (a === 'plus' ? 1 : -1)); r.answered = Q[S.i].many ? Math.max.apply(null, r.counts) : r.counts.reduce(function (p, q) { return p + q; }, 0); paint(); var f = el.querySelector('[data-gl="' + a + '"][data-k="' + k + '"]'); if (f) f.focus(); }
        else if (a === 'back') { if (S.i > 0) { S.i--; paint(); } }
        else if (a === 'close') { closeQ().then(function () { if (kind === 'class') { S.phase = 'show'; paint(); } else next(); }); }
        else if (a === 'next') { if (hands) { closeQ().then(next); } else next(); }
        else if (a === 'done') close(false, true);
      });
      function openRoom() {
        if (hands) { paint(); return; }
        if (!on() || !api() || !subtle) { S.err = 'Grounded Live opens soon.'; paint(); return; }
        R.open(kind, !!opts.insights).then(function () { S.phase = 'lobby'; paint(); push(); timer = setInterval(tick, POLL_HOST); tick(); }, function (e) { S.err = words(e); paint(); });
      }
      paint(); openRoom();
    });
  }

  /* =====================================================================
     THE JOIN PAGE (live/index.html): no sign in, no names, a tap on an answer
     ===================================================================== */
  var JKEY = 'gg-live-join';
  function mountJoin(el) {
    var J = { room: '', key: null, seat: '', ver: -1, step: 0, open: false, mine: false, picks: [], st: null, insights: false, kind: '', phase: 'start', err: '', busy: false, off: false, sentStep: -1 };
    var timer = 0;
    function saveJ(raw) { try { sessionStorage.setItem(JKEY, JSON.stringify({ room: J.room, key: raw, seat: J.seat })); } catch (e) {} }
    function forget() { try { sessionStorage.removeItem(JKEY); } catch (e) {} }
    function errWords(w) { return w === 'none' ? 'That code opens no room right now. Check the numbers on the screen.' : w === 'wait' ? 'That is a lot of tries. Give it a few minutes, then try again.' : w === 'full' ? 'This room is full.' : w === 'offline' ? 'You look offline. Check your connection, then try again.' : 'That did not go through. Try again in a moment.'; }
    function enter(room, raw) {
      J.room = room; J.seat = J.seat || b64u(rnd(16));
      return aes(raw).then(function (k) { J.key = k; return req('POST', '/live/rooms/' + room + '/join', { seat: J.seat }); }).then(function (j) {
        J.insights = !!j.insights; J.kind = j.kind; J.phase = 'in'; saveJ(b64u(raw)); paint(); poll(); clearInterval(timer); timer = setInterval(poll, POLL_JOIN);
      });
    }
    function typed(code) {
      code = normCode(code);
      if (code.length !== 4) { J.err = 'Type the four numbers on the screen.'; paint(); return; }
      J.busy = true; J.err = ''; paint();
      findOf(code).then(function (f) { return req('POST', '/live/find', { find: f }); }).then(function (j) {
        return codeKey(code, unb64u(j.salt)).then(function (ck) { return openBox(ck, j.wrap, 'gg-live-wrap'); }).then(function (rawStr) { return enter(j.room, unb64u(rawStr)); });
      }).catch(function (e) { J.err = errWords(e && e.why); }).then(function () { J.busy = false; paint(); });
    }
    function poll() {
      if (!J.room) return;
      req('GET', '/live/rooms/' + J.room + '?v=' + J.ver + '&s=' + J.seat).then(function (j) {
        J.off = false; J.open = j.open; J.mine = j.mine; J.insights = j.insights;
        var changed = j.step !== J.step; J.step = j.step;
        if (changed) { J.picks = []; J.sentStep = -1; }
        if (j.state !== undefined && j.ver !== J.ver) {
          J.ver = j.ver;
          if (!j.state) return paint();
          return openBox(J.key, j.state, aadState(J.room)).then(function (s) { J.st = s; if (s.phase === 'end') { J.phase = 'end'; stopJ(); } paint(); }, function () {});
        }
        if (changed) paint(); else paintSent();
      }, function (e) {
        if (e && e.why === 'none') { J.phase = J.phase === 'in' ? 'gone' : J.phase; stopJ(); paint(); return; }
        if (!J.off) { J.off = true; paint(); }
      });
    }
    function stopJ() { clearInterval(timer); timer = 0; forget(); }
    function send(picks) {
      var step = J.step;
      J.busy = true; paintSent();
      seal(J.key, { a: picks }, aadAns(J.room, step)).then(function (ct) { return req('POST', '/live/rooms/' + J.room + '/answer', { seat: J.seat, step: step, ct: ct }); })
        .then(function () { J.sentStep = step; J.mine = true; J.err = ''; }, function (e) { J.err = e && e.why === 'closed' ? 'This question has closed. Look up at the screen.' : errWords(e && e.why); })
        .then(function () { J.busy = false; paint(); });
    }
    function paintSent() { var s = el.querySelector('[data-gj-sent]'); if (s) s.hidden = !J.mine; }
    function screen() {
      var insL = J.insights ? '<p class="gj-note">Your answers are anonymous and count toward Grounded’s overall totals.</p>' : '';
      var offL = J.off ? '<p class="gj-note" role="status">Reconnecting…</p>' : '';
      if (!on()) return '<h1>Grounded Live</h1><p class="gj-lead">Grounded Live opens soon.</p>';
      if (J.phase === 'start') return '<h1>Join Grounded Live</h1><p class="gj-lead">Type the code on the screen.</p>' +
        '<form class="gj-form" data-gj="form"><label for="gj-code">Code</label><input id="gj-code" inputmode="numeric" autocomplete="off" maxlength="12" placeholder="4821" value=""><button type="submit" class="gj-btn"' + (J.busy ? ' disabled' : '') + '>' + (J.busy ? 'Joining…' : 'Join') + '</button></form>' +
        (J.err ? '<p class="gj-err" role="alert">' + esc(J.err) + '</p>' : '') + '<p class="gj-note">No sign-in and no names. Your answers are sealed on this device, and the room is deleted when it ends.</p>';
      if (J.phase === 'gone') return '<h1>Thank You</h1><p class="gj-lead">This session has ended. Thank you for taking part.</p>';
      if (J.phase === 'end') return '<h1>Thank You</h1><p class="gj-lead">Thank you for taking part. You can close this page.</p>' + insL;
      var s = J.st;
      if (!s || s.phase === 'lobby' || !s.q) return '<h1>You’re In</h1><p class="gj-lead">The questions start soon. Keep this page open.</p>' + insL + offL;
      var q = s.q, head = '<p class="gj-eb">Question ' + s.n + ' of ' + s.of + (q.kicker ? ' &middot; ' + esc(q.kicker) : '') + '</p><h1 class="gj-q">' + esc(q.text) + '</h1>';
      if (s.phase === 'show' || !J.open) return head + '<p class="gj-lead">Look up at the screen to see how everyone answered.</p>' + insL + offL;
      var picks = J.picks;
      return head + (q.many ? '<p class="gj-note">Pick any that fit, then tap Send My Answers.</p>' : '') + '<div class="gj-ans" role="group" aria-label="Answers">' + q.choices.map(function (c, k) {
        var onK = picks.indexOf(k) >= 0;
        return '<button type="button" class="gj-a' + (onK ? ' on' : '') + '" aria-pressed="' + onK + '" data-gj="pick" data-k="' + k + '"' + (J.busy ? ' disabled' : '') + '>' + esc(c) + '</button>';
      }).join('') + '</div>' + (q.many ? '<button type="button" class="gj-btn" data-gj="send"' + (picks.length && !J.busy ? '' : ' disabled') + '>Send My Answers</button>' : '') +
        '<p class="gj-sent" data-gj-sent' + (J.mine ? '' : ' hidden') + ' role="status">Your answer is in. Tap another answer to change it.</p>' + (J.err ? '<p class="gj-err" role="alert">' + esc(J.err) + '</p>' : '') + insL + offL;
    }
    function paint() {
      var s = J.st, quiet = s && s.quiet && J.phase === 'in' ? '<p class="gj-quiet">' + esc(s.quiet) + '</p>' : '';
      var f = document.activeElement && document.activeElement.id === 'gj-code' ? (document.getElementById('gj-code') || {}).value : null;
      el.innerHTML = '<div class="gj-card">' + screen() + '</div>' + quiet;
      if (f != null) { var i = document.getElementById('gj-code'); if (i) { i.value = f; i.focus(); } }
    }
    el.addEventListener('submit', function (e) { var f = e.target.closest('[data-gj="form"]'); if (!f) return; e.preventDefault(); typed((document.getElementById('gj-code') || {}).value); });
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-gj]'); if (!b || J.busy) return;
      if (b.dataset.gj === 'pick') {
        var k = +b.dataset.k, q = J.st && J.st.q; if (!q) return;
        if (q.many) { var x = J.picks.indexOf(k); if (x >= 0) J.picks.splice(x, 1); else J.picks.push(k); paint(); }
        else { J.picks = [k]; paint(); send([k]); }
      } else if (b.dataset.gj === 'send') { if (J.picks.length) send(J.picks.slice().sort()); }
    });
    // Arriving: the QR (#j=room.key, wiped from the address bar at once), or a reload in this tab, or the typed code.
    paint();
    if (!on()) return;
    var m = /#j=(r[a-z0-9]{20})\.([A-Za-z0-9_-]{43})/.exec(location.hash || ''), saved = null;
    if (m) { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} }
    else { try { saved = JSON.parse(sessionStorage.getItem(JKEY) || 'null'); } catch (e) {} }
    var go = m ? { room: m[1], key: m[2] } : saved && /^r[a-z0-9]{20}$/.test(saved.room || '') ? saved : null;
    if (go) {
      if (saved && saved.seat) J.seat = saved.seat;
      J.busy = true; paint();
      enter(go.room, unb64u(go.key)).catch(function (e) { forget(); J.phase = 'start'; J.err = e && e.why === 'none' ? 'That room has closed. Type the code on the screen to join a new one.' : errWords(e && e.why); }).then(function () { J.busy = false; paint(); });
    }
  }

  window.GGLive = { on: on, host: host, mountJoin: mountJoin, spread: spread, _: { Room: Room, findOf: findOf, codeKey: codeKey, seal: seal, open: openBox, normCode: normCode } };
})();
