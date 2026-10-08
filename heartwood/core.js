/* Heartwood: shared core (heartwood/core.js), GWG BLD 751; renamed from The Grounded Marriage app in GWG BLD 772.
   window.GMCore is shared by the couple's app (heartwood/app.js) and the Field Guide.
   It reads window.BTV_Q (the questions, from Heartwood's sealed content, or the open sample) when it runs. Nothing here is ever sent anywhere.

   GMCore.compare(X, Y, extra)  X, Y: {name, fw: 'faith' or 'plain', ans: {id: 1 to 5}}.
     Returns one entry per area: {area, diff: [], agree: [], grow: []}; each item {q, text, x, y}.
     extra (optional): more areas to compare after the 12, as [{area: {id, name}, qs: [questions]}]
     (the app uses it for the two-tradition questions in faith.js).
   GMCore.summary(cmp)  {areaId: 'strong' | 'talk' | 'grow'} for each area with answers from both:
     talk: any differences; strong: no differences and mostly agreeing on the good side;
     grow: the two agree, but not yet where they hope.
   GMCore.card  The card two partners trade between devices, locked with a word only they know
     (PBKDF2, 250,000 rounds, SHA-256, then AES-GCM), carried after the # in a link.
     make(dataObj, word) -> Promise of the code 'b1.<base64url of salt, iv, sealed text>'
     read(code, word) -> Promise of the card, or null when it is not a card this app can read
     codeOf(text) -> the code inside a link (/heartwood/#btv=, or the older /marriage/#btv= and /before-the-vows/#btv=), or ''
     link(code) -> https://growwithgrounded.com/heartwood/#btv=<code> (this site's own address when served)
     Card v2: {v: 2, q, n, to, fw: 'f' or 'p', a: '<digits>', fb: '<faith id or empty>'}. Card v1 has no fb.
     a: one digit (0 to 5, 0 is skipped) for each question in BTV_Q.questions, in order; when the app has
     faith.js, the digits for GM_FAITH.two.questions follow. Readers ignore digits past what they know.
     The private safety questions are never on a card.
   GMCore.answersOf(a) -> {id: v} from a card's digits (the two-tradition digits included when faith.js is here).
   GMCore.week (GWG BLD 755)  The Week Card for the couple's leaders: make, read, codeOf, link, clean (see below). */
(function () {
  'use strict';
  var ROUNDS = 250000;
  var subtle = window.crypto && crypto.subtle, enc = new TextEncoder(), dec = new TextDecoder();

  function Q() { return window.BTV_Q || { areas: [], questions: [], differ: 2 }; }
  function twoQs() { var F = window.GM_FAITH; return (F && F.two && Array.isArray(F.two.questions)) ? F.two.questions : []; }
  function qsIn(aid) { return Q().questions.filter(function (q) { return q.area === aid; }); }

  /* ---------- compare and summary ---------- */
  function side(q, v) { return v >= 4 ? (q.rev ? 'low' : 'high') : v <= 2 ? (q.rev ? 'high' : 'low') : 'mid'; }
  function differs(x, y) { var D = +Q().differ || 2; return x >= 1 && y >= 1 && (Math.abs(x - y) >= D || (x >= 4 && y <= 2) || (x <= 2 && y >= 4)); }
  function compare(X, Y, extra) {
    var plain = X.fw !== 'faith' || Y.fw !== 'faith';
    var groups = Q().areas.map(function (ar) { return { area: ar, qs: qsIn(ar.id) }; }).concat(Array.isArray(extra) ? extra : []);
    return groups.map(function (g) {
      var out = { area: g.area, diff: [], agree: [], grow: [] };
      g.qs.forEach(function (q) {
        var x = +(X.ans || {})[q.id] || 0, y = +(Y.ans || {})[q.id] || 0; if (!x || !y) return;
        var it = { q: q, text: (plain && q.plain) ? q.plain : q.text, x: x, y: y };
        if (differs(x, y)) out.diff.push(it);
        else if (side(q, x) === 'high' && side(q, y) === 'high') out.agree.push(it);
        else out.grow.push(it);
      });
      return out;
    });
  }
  function summary(cmp) {
    var out = {};
    (cmp || []).forEach(function (r) {
      var n = r.diff.length + r.agree.length + r.grow.length; if (!n) return;
      out[r.area.id] = r.diff.length ? 'talk' : (r.agree.length >= r.grow.length ? 'strong' : 'grow');
    });
    return out;
  }

  /* ---------- the card ---------- */
  function b64(u) { var s = ''; for (var i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); }
  function unb64(s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function b64u(u) { return b64(u).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function unb64u(s) { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return unb64(s); }
  function fname(s) { s = String(s == null ? '' : s).trim().split(/\s+/)[0] || ''; return s.length <= 24 && !/[<>&"`\\\u0000-\u001F\u007F]/.test(s) ? s : ''; }
  function derive(pass, salt) {
    return subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveKey']).then(function (base) {
      return subtle.deriveKey({ name: 'PBKDF2', salt: salt, iterations: ROUNDS, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    });
  }
  // A card from either version, checked field by field; anything else is null.
  function clean(o) {
    if (!o || typeof o !== 'object' || Array.isArray(o)) return null;
    var ks = Object.keys(o).sort().join(',');
    if (o.v === 1) { if (ks !== 'a,fw,n,q,to,v') return null; }
    else if (o.v === 2) { if (ks !== 'a,fb,fw,n,q,to,v') return null; }
    else return null;
    if (typeof o.q !== 'number') return null;
    if (typeof o.n !== 'string' || !o.n || fname(o.n) !== o.n || typeof o.to !== 'string' || fname(o.to) !== o.to) return null;
    if (o.fw !== 'f' && o.fw !== 'p') return null;
    if (typeof o.a !== 'string' || !/^[0-5]{1,300}$/.test(o.a)) return null;
    var fb = o.v === 2 ? o.fb : '';
    if (typeof fb !== 'string' || !/^[a-z0-9-]{0,40}$/.test(fb)) return null;
    return { v: o.v, q: o.q, n: o.n, to: o.to, fw: o.fw, a: o.a, fb: fb };
  }
  function make(dataObj, word) {
    var c0 = clean(dataObj); if (!c0 || c0.v !== 2) return Promise.reject(new Error('not a card'));
    var body = { v: 2, q: c0.q, n: c0.n, to: c0.to, fw: c0.fw, a: c0.a, fb: c0.fb };
    var salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    return derive(String(word).trim().toLowerCase(), salt).then(function (k) { return subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, enc.encode(JSON.stringify(body))); })
      .then(function (ct) { var c = new Uint8Array(ct), all = new Uint8Array(28 + c.length); all.set(salt, 0); all.set(iv, 16); all.set(c, 28); return 'b1.' + b64u(all); });
  }
  // Rejects when the word does not open the card; resolves null when it opens but is not a card.
  function read(code, word) {
    var all = unb64u(String(code).slice(3));
    return derive(String(word).trim().toLowerCase(), all.slice(0, 16))
      .then(function (k) { return subtle.decrypt({ name: 'AES-GCM', iv: all.slice(16, 28) }, k, all.slice(28)); })
      .then(function (pt) { var o; try { o = JSON.parse(dec.decode(pt)); } catch (e) { return null; } return clean(o); });
  }
  function codeOf(s) {
    s = String(s || '').trim();
    var m = /(?:^|[#&?])btv=(b1\.[A-Za-z0-9_-]{20,2000})/.exec(s);
    return m ? m[1] : (/^b1\.[A-Za-z0-9_-]{20,2000}$/.test(s) ? s : '');
  }
  function link(code) { var base = /^https?:$/.test(location.protocol) ? location.origin : 'https://growwithgrounded.com'; return base + '/heartwood/#btv=' + code; }
  function digits(ans) {
    var all = Q().questions.concat(twoQs());
    return all.map(function (q) { var x = +(ans || {})[q.id] || 0; return x >= 1 && x <= 5 ? x : 0; }).join('');
  }
  function answersOf(a) {
    var out = {}, all = Q().questions.concat(twoQs());
    all.forEach(function (q, i) { var v = +(String(a || '').charAt(i) || 0); if (v) out[q.id] = v; });
    return out;
  }

  /* ---------- the Week Card (GWG BLD 755) ----------
     Before a session, the couple can choose to share a short card with their leaders, locked with their shared word
     exactly like the answers card (PBKDF2 then AES-GCM, salt 16, iv 12), carried after the # as #gmw=w1.<code>.
     {v: 1, m: 'one' or 'two' (one device for both, or one partner's own device), s: session ('' or '1' to '6' or 'e1' to 'e3'),
      n, to (first names; on two devices n made it), on (YYYY-MM-DD),
      vid: [video titles watched], pr: [practices tried], wb: [{w: first name, t: exercise title, a: answer}], q: their question}
     The leader pastes it into the Field Guide (field-guide/premarital.js keeps its own reader of this same format). */
  var WLIM = { list: 40, item: 160, wb: 24, ans: 1500, q: 500 };
  function wclean(o) {
    if (!o || typeof o !== 'object' || Array.isArray(o) || o.v !== 1) return null;
    if (Object.keys(o).sort().join(',') !== 'm,n,on,pr,q,s,to,v,vid,wb') return null;
    if (o.m !== 'one' && o.m !== 'two') return null;
    if (typeof o.s !== 'string' || !/^(|[1-9]|e[1-9])$/.test(o.s)) return null;
    if (typeof o.n !== 'string' || !o.n || fname(o.n) !== o.n || typeof o.to !== 'string' || (o.to && fname(o.to) !== o.to)) return null;
    if (typeof o.on !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(o.on)) return null;
    var strs = function (a) { if (!Array.isArray(a) || a.length > WLIM.list) return null; for (var i = 0; i < a.length; i++) if (typeof a[i] !== 'string') return null; return a.map(function (x) { return x.slice(0, WLIM.item); }); };
    var vid = strs(o.vid), pr = strs(o.pr); if (!vid || !pr) return null;
    if (!Array.isArray(o.wb) || o.wb.length > WLIM.wb) return null;
    var wb = [];
    for (var i = 0; i < o.wb.length; i++) {
      var x = o.wb[i]; if (!x || typeof x !== 'object' || Array.isArray(x) || Object.keys(x).sort().join(',') !== 'a,t,w') return null;
      if (typeof x.w !== 'string' || fname(x.w) !== x.w || typeof x.t !== 'string' || typeof x.a !== 'string') return null;
      wb.push({ w: x.w, t: x.t.slice(0, WLIM.item), a: x.a.slice(0, WLIM.ans) });
    }
    if (typeof o.q !== 'string') return null;
    return { v: 1, m: o.m, s: o.s, n: o.n, to: o.to, on: o.on, vid: vid, pr: pr, wb: wb, q: o.q.slice(0, WLIM.q) };
  }
  function wmake(obj, word) {
    var c0 = wclean(obj); if (!c0) return Promise.reject(new Error('not a week card'));
    var salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    return derive(String(word).trim().toLowerCase(), salt).then(function (k) { return subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, enc.encode(JSON.stringify(c0))); })
      .then(function (ct) { var c = new Uint8Array(ct), all = new Uint8Array(28 + c.length); all.set(salt, 0); all.set(iv, 16); all.set(c, 28); return 'w1.' + b64u(all); });
  }
  function wread(code, word) {
    var all = unb64u(String(code).slice(3));
    return derive(String(word).trim().toLowerCase(), all.slice(0, 16))
      .then(function (k) { return subtle.decrypt({ name: 'AES-GCM', iv: all.slice(16, 28) }, k, all.slice(28)); })
      .then(function (pt) { var o; try { o = JSON.parse(dec.decode(pt)); } catch (e) { return null; } return wclean(o); });
  }
  function wcodeOf(s) {
    s = String(s || '').trim();
    var m = /(?:^|[#&?])gmw=(w1\.[A-Za-z0-9_-]{20,90000})/.exec(s);
    return m ? m[1] : (/^w1\.[A-Za-z0-9_-]{20,90000}$/.test(s) ? s : '');
  }
  function wlink(code) { var base = /^https?:$/.test(location.protocol) ? location.origin : 'https://growwithgrounded.com'; return base + '/heartwood/#gmw=' + code; }

  window.GMCore = {
    compare: compare, summary: summary, differs: differs, side: side,
    card: { make: make, read: read, codeOf: codeOf, link: link, clean: clean },
    week: { make: wmake, read: wread, codeOf: wcodeOf, link: wlink, clean: wclean, LIM: WLIM },
    digits: digits, answersOf: answersOf, derive: derive,
    b64: b64, unb64: unb64, b64u: b64u, unb64u: unb64u, fname: fname, ROUNDS: ROUNDS
  };
})();
