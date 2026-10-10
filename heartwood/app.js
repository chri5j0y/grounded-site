/* Heartwood (GWG BLD 772; was The Grounded Marriage app, BLD 751, grown from Before the Vows, BLD 750): the couple's
   private app that comes with The Grounded Marriage, with two sides.
   Before the Vows: the check-in for two (87 questions), Talk About This, Strengths and Growing Edges, each partner's
   optional faith background, The Couple Workbook, The Money Map, and the card for two devices and for sessions.
   After the Vows (opens after the wedding date, or with "We're Married"): Practices for Two, the Monthly Check-in
   for Two, and the First-Year Check-in.
   Everything stays on this device. Each partner's answers, workbook writing, check-ins, and the Money Map are locked
   with that partner's own passcode (PBKDF2, 250,000 rounds, SHA-256, then AES-GCM); the passcode never leaves the
   device and is never stored. Safety answers are never saved at all: they live only on the screen of the partner
   who answered, and never go on a card or a printout. Names, faith backgrounds, and the wedding date are kept on
   this device unlocked, so the app knows which questions and wording to show.
   Two devices: a card carries one partner's first name, the other's, Faith or Plain, the faith background, and the
   answers as digits, locked with a word only the two of them know, after the # in a link or QR code (heartwood/core.js).
   A check-in card carries one partner's written check-in answers the same way.
   The Week Card (GWG BLD 755): before a session, the couple can choose to share a short card with their leaders
   (videos watched, practices tried, workbook answers marked Share With Our Leaders, and one question), locked with
   their shared word the same way and carried as #gmw=w1.<code> (GMCore.week). Nothing is sent anywhere else.
   Sending a card to Chris and Kayti (GWG BLD 773): beside each card (the partner card, the Week Card, and the
   check-in card), Email to Chris and Kayti (hello@growwithgrounded.com) is the main button and a smaller Text to Chris
   and Kayti ((320) 291-7393) sits beside it. Each opens the couple's own mail or messages app with the link and a
   reminder that the shared word is told in person, never in the message; Copy the Link stays. Not in the sample.
   Your Tree, Then Your Grove (GWG BLD 755): GM_TOGETHER in the hub and After the Vows, with
   invites to each partner's own Tree (Birch or Oak) and to a Grove together; the card shows without it too.
   Data (GWG BLD 772): heartwood/open.js opens the sealed content (heartwood/lib-heartwood.js) with the couple's invite
   and code, or the open sample (heartwood/sample.js, window.HW_SAMPLE true), then loads this file. The globals:
   BTV_Q (the questions), GM_FAITH, GM_RESULTS, GM_WB (The Couple Workbook), GM_MONEY, GM_PR (Practices for Two),
   GM_AFTER, GG_LEARN_GM (Learn), GM_TOGETHER; core.js (GMCore) is code and loads first.
   Saved on this device: gg_hw_v1 (gg_gm_v1 and the older gg_btv_v1 are read forward once, then removed); the sample
   keeps its own gg_hw_sample_v1, so sample answers never mix with Heartwood's. Learn progress: gg-learn:hw
   (gg-learn:gm and gg-learn:btv are read forward). A card made in the sample carries q 900 or more, and Heartwood
   and the sample each open only their own cards, since a card's answers follow the order of the questions. */
(function () {
  'use strict';
  var SAMPLE = !!window.HW_SAMPLE;
  var KEY = SAMPLE ? 'gg_hw_sample_v1' : 'gg_hw_v1', GMKEY = 'gg_gm_v1', OLDKEY = 'gg_btv_v1', PEND = 'gg-gm-in', PENDM = 'gg-gm-min';
  var C = window.GMCore;
  var subtle = window.crypto && crypto.subtle, enc = new TextEncoder(), dec = new TextDecoder();
  var $ = function (id) { return document.getElementById(id); };
  if (!C) { var a0 = $('gm-app'); if (a0) a0.innerHTML = '<div class="ff-card"><p>Heartwood could not load. Check the connection and try again.</p></div>'; return; }

  /* ---------- the data files ---------- */
  var Q = window.BTV_Q || { version: 0, areas: [], questions: [], scale: [], safety: {} };
  var AREAS = Q.areas, QS = Q.questions, SCALE = Q.scale, SAFETY = Q.safety || {};
  var F = window.GM_FAITH || null, RS = window.GM_RESULTS || null, WB = window.GM_WB || null, MN = window.GM_MONEY || null, PR = window.GM_PR || null, AF = window.GM_AFTER || null;
  var TG = (window.GM_TOGETHER && typeof window.GM_TOGETHER === 'object') ? window.GM_TOGETHER : null;
  var TWOQ = (F && F.two && Array.isArray(F.two.questions)) ? F.two.questions : [];
  var TWO_AREA = { id: 'two', name: 'Two Traditions, One Home', lead: F && F.two ? F.two.lead : '' };
  function qsIn(aid) { return aid === 'two' ? TWOQ : QS.filter(function (q) { return q.area === aid; }); }
  function label(v) { for (var i = 0; i < SCALE.length; i++) if (+SCALE[i][0] === +v) return SCALE[i][1]; return 'Skipped'; }
  function faithItem(id) { if (!F || !id) return null; for (var i = 0; i < F.list.length; i++) if (F.list[i].id === id) return F.list[i]; return null; }
  function faithGroup(id) { var it = faithItem(id); return it && F.groups && F.groups[it.group] ? F.groups[it.group] : null; }
  function known(id) { return !!faithItem(id) && id !== 'rather-not-say'; }

  /* ---------- small helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var fname = C.fname, b64 = C.b64, unb64 = C.unb64;
  function today() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function monthKey() { return today().slice(0, 7); }
  function monthName(k) { if (k === 'fy') return AF ? AF.firstYear.title : 'First-Year Check-in'; var p = k.split('-'); return new Date(+p[0], +p[1] - 1, 1).toLocaleDateString(undefined, { year: 'numeric', month: 'long' }); }
  function niceDate(s) { var p = String(s || '').split('-'); if (p.length !== 3) return ''; return new Date(+p[0], +p[1] - 1, +p[2]).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }); }
  function load() {
    try {
      var t = localStorage.getItem(KEY); if (t) return JSON.parse(t);
      if (SAMPLE) return null;
      // The Grounded Marriage app (BLD 751 to 771) kept the same data under gg_gm_v1: carry it over once.
      var g = localStorage.getItem(GMKEY);
      if (g) { var gm = JSON.parse(g); if (gm && gm.v === 2) { localStorage.setItem(KEY, g); localStorage.removeItem(GMKEY); return gm; } }
      // Before the Vows (BLD 750) kept its data under another key: carry it over once, then remove the old one.
      var o = localStorage.getItem(OLDKEY); if (!o) return null;
      var old = JSON.parse(o); localStorage.removeItem(OLDKEY);
      if (!old || old.v !== 1 || !old.s) return null;
      var m = { v: 2, s: old.s, p: old.p || {} }; if (old.inCard) m.inCard = old.inCard;
      localStorage.setItem(KEY, JSON.stringify(m)); return m;
    } catch (e) { return null; }
  }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
  function seal(key, obj) {
    var iv = crypto.getRandomValues(new Uint8Array(12));
    return subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, enc.encode(JSON.stringify(obj))).then(function (ct) { return { iv: b64(iv), ct: b64(new Uint8Array(ct)) }; });
  }
  function unseal(key, iv, ct) { return subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, ct).then(function (pt) { return JSON.parse(dec.decode(pt)); }); }

  /* ---------- state ----------
     st (saved, on this device): {v: 2, s: setup, p: {a: box, b: box}, inCard, inM}
     setup: {a, b, mode: 'one' or 'two', me: 'a' or 'b', fb: {a, b} (faith ids, optional), fwp: {a, b} (Faith or Plain,
       mirrored from each partner's own choice so practices can show the right line), wd (wedding date), wed (1 after
       "We're Married"), mk (whose passcode keeps the Money Map)}
     box: {salt, iv, ct, done, got}. Inside a box (only with its passcode): {ans: {id: 1 to 5}, fw, at, partner,
       wb: {exerciseId: {t: [text], c: choice, sh: 1 to show my partner}}, money: {v: {itemId: amount}, g: [text]},
       mo: {roundKey: {r: {questionId: text}, done}}, mp: {roundKey: {n, r}} (the partner's check-in from a card)}
     inCard, inM: a card from the other partner, still locked with the shared word. */
  var st = load(); if (!st || st.v !== 2) st = null;
  function fix() { if (!st || !st.s) return; var s = st.s; s.fb = s.fb || { a: '', b: '' }; s.fwp = s.fwp || { a: '', b: '' }; st.p = st.p || {}; }
  fix();
  var KEYS = {}, DATA = {}, SAFE = {}, PARTNER_IN = null;
  var V = { view: 'welcome', side: 'before', who: null, area: 0 };
  function setup() { return st && st.s; }
  function nm(w) { return setup() ? st.s[w] : ''; }
  function other(w) { return w === 'a' ? 'b' : 'a'; }
  function box(w) { return st && st.p && st.p[w]; }
  function lockAll() { KEYS = {}; DATA = {}; SAFE = {}; }
  function oneDevice() { return st.s.mode === 'one'; }
  function twoOn() { var s = setup(); return !!(s && TWOQ.length && known(s.fb.a) && known(s.fb.b) && s.fb.a !== s.fb.b); }
  function areasFor() { return twoOn() ? AREAS.concat([TWO_AREA]) : AREAS; }
  function extra() { return twoOn() ? [{ area: TWO_AREA, qs: TWOQ }] : []; }
  function afterOpen() { var s = setup(); return !!(s && (s.wed || (s.wd && today() >= s.wd))); }
  function dataOf(w) { var d = DATA[w]; d.ans = d.ans || {}; d.wb = d.wb || {}; d.mo = d.mo || {}; d.mp = d.mp || {}; return d; }

  /* ---------- a small dialog for passcodes and the shared word ---------- */
  function ask(o) {
    return new Promise(function (resolve) {
      var back = document.createElement('div'); back.className = 'btv-back';
      back.innerHTML = '<div class="btv-dlg" role="dialog" aria-modal="true" aria-labelledby="btv-dh"><h3 id="btv-dh">' + esc(o.title) + '</h3>' + (o.lead ? '<p>' + esc(o.lead) + '</p>' : '') +
        o.fields.map(function (f, i) { return '<label for="btv-f' + i + '">' + esc(f) + '</label><input type="password" id="btv-f' + i + '" autocomplete="new-password" autocapitalize="off" spellcheck="false">'; }).join('') +
        '<p class="btv-err" role="alert"></p><div class="btv-drow"><button type="button" class="btn btn-secondary ff-sm" data-d="no">Cancel</button><button type="button" class="btn btn-primary ff-sm" data-d="ok">' + esc(o.ok) + '</button></div></div>';
      document.body.appendChild(back);
      var err = back.querySelector('.btv-err'), busy = false, prev = document.activeElement;
      function close(v) { back.remove(); try { if (prev && prev.focus) prev.focus(); } catch (e) {} resolve(v); }
      function go() {
        if (busy) return;
        var vals = Array.prototype.map.call(back.querySelectorAll('input'), function (i) { return i.value; });
        var m = o.check ? o.check(vals) : ''; if (m) { err.textContent = m; return; }
        if (!o.verify) return close(vals);
        busy = true; err.textContent = 'One moment...';
        o.verify(vals).then(function (r) { busy = false; if (r === true) close(vals); else { err.textContent = r || 'That did not work. Try again.'; var i = back.querySelector('input'); i.select(); } },
          function () { busy = false; err.textContent = 'That did not work. Try again.'; });
      }
      back.addEventListener('click', function (e) { var d = e.target.getAttribute && e.target.getAttribute('data-d'); if (d === 'no') close(null); else if (d === 'ok') go(); });
      back.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); else if (e.key === 'Escape') close(null); });
      setTimeout(function () { var f = back.querySelector('input'); if (f) f.focus(); }, 30);
    });
  }
  var PASS_NOTE = 'Grow With Grounded never sees it and cannot recover it. If it is ever forgotten, Clear Everything starts fresh.';
  function newPass(w) {
    return ask({ title: nm(w) + ', choose your passcode', lead: 'Your answers are locked with it, so only you can open them. ' + PASS_NOTE, fields: ['Passcode', 'Passcode again'], ok: 'Lock and Start',
      check: function (v) { return v[0].length < 6 ? 'Use at least 6 characters.' : v[0] !== v[1] ? 'The two passcodes are different.' : ''; } })
      .then(function (v) {
        if (!v) return false;
        var salt = crypto.getRandomValues(new Uint8Array(16));
        return C.derive(v[0], salt).then(function (k) {
          KEYS[w] = k; DATA[w] = { ans: {}, fw: '', at: 0, partner: null, wb: {}, mo: {}, mp: {} };
          st.p[w] = { salt: b64(salt), done: false };
          if (PARTNER_IN && st.s.mode === 'two' && w === st.s.me) { DATA[w].partner = PARTNER_IN; PARTNER_IN = null; delete st.inCard; st.p[w].got = 1; try { sessionStorage.removeItem(PEND); } catch (e) {} }
          return save(w).then(function () { return true; });
        });
      });
  }
  function unlock(w, why) {
    if (KEYS[w] && DATA[w]) return Promise.resolve(true);
    var bx = box(w); if (!bx) return newPass(w);
    var salt = unb64(bx.salt);
    return ask({ title: nm(w) + ', enter your passcode', lead: why || 'Only ' + nm(w) + ' should type here.', fields: ['Passcode'], ok: 'Open',
      verify: function (v) {
        return C.derive(v[0], salt).then(function (k) {
          return unseal(k, unb64(bx.iv), unb64(bx.ct)).then(function (d) { KEYS[w] = k; DATA[w] = d; dataOf(w); return true; }, function () { return 'That passcode does not open ' + nm(w) + '’s answers. Try again.'; });
        });
      } }).then(function (v) { return !!v; });
  }
  function unlockBoth(why) { return unlock('a', why).then(function (ok) { return ok && unlock('b', why); }); }
  var saveT = {};
  function save(w) {
    clearTimeout(saveT[w]);
    if (!KEYS[w] || !DATA[w] || !st.p[w]) return Promise.resolve();
    return seal(KEYS[w], DATA[w]).then(function (b) { st.p[w].iv = b.iv; st.p[w].ct = b.ct; persist(); });
  }
  function saveSoon(w) { clearTimeout(saveT[w]); saveT[w] = setTimeout(function () { save(w); }, 300); }
  function saveAll() { return Promise.all(['a', 'b'].map(function (w) { return KEYS[w] ? save(w) : null; })); }
  function wordAsk(theirs, what) {
    return ask({ title: 'Choose a shared word', lead: 'The ' + what + ' is locked with a word or short phrase only the two of you know. ' + theirs + ' types it to open the ' + what + '. Capital letters do not matter.', fields: ['Shared word', 'Shared word again'], ok: 'Make the Card',
      check: function (v) { return v[0].trim().length < 4 ? 'Use at least 4 letters. Longer is safer.' : v[0].trim().toLowerCase() !== v[1].trim().toLowerCase() ? 'The two words are different.' : ''; } });
  }

  /* ---------- the card (two devices) ---------- */
  function cardData(w) {
    var d = DATA[w], fb = st.s.fb[w];
    return { v: 2, q: Q.version || 0, n: nm(w), to: nm(other(w)), fw: d.fw === 'faith' ? 'f' : 'p', a: C.digits(d.ans), fb: faithItem(fb) ? fb : '' };
  }
  function takeHash() {
    var h = location.hash || '', c = C.card.codeOf(h), m = mcodeOf(h); if (!c && !m) return false;
    try { if (c) sessionStorage.setItem(PEND, c); if (m) sessionStorage.setItem(PENDM, m); } catch (e) {}
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    return true;
  }
  function pendingCard() { var c = ''; try { c = sessionStorage.getItem(PEND) || ''; } catch (e) {} return c || (st && st.inCard) || ''; }
  function dropPending() { try { sessionStorage.removeItem(PEND); } catch (e) {} if (st && st.inCard) { delete st.inCard; persist(); } }
  function partnerFrom(got) {
    if (got.fb && faithItem(got.fb)) { st.s.fb[other(st.s.me)] = got.fb; }
    st.s.fwp[other(st.s.me)] = got.fw === 'f' ? 'faith' : 'plain';
  }
  function openCard(code) {
    var got = null;
    return ask({ title: 'Open your partner’s card', lead: 'Type the word the two of you chose for this card.', fields: ['Your shared word'], ok: 'Open the Card',
      verify: function (v) { return C.card.read(code, v[0]).then(function (c) { if (!c) return 'This card is not one Heartwood can read.'; if ((+c.q >= 900) !== SAMPLE) return SAMPLE ? 'This card comes from Heartwood. Open it in Heartwood, with your code.' : 'This card comes from the Heartwood sample. Make a new card in Heartwood and send it again.'; got = c; return true; }, function () { return 'That word does not open this card. Try again.'; }); } })
      .then(function (v) {
        if (!v || !got) return;
        var partner = { n: got.n, fw: got.fw === 'f' ? 'faith' : 'plain', a: got.a, q: got.q, fb: got.fb || '', got: today() };
        if (!setup()) {
          st = { v: 2, s: { a: got.n, b: got.to, mode: 'two', me: 'b', fb: { a: '', b: '' }, fwp: { a: '', b: '' } }, p: {}, inCard: code };
          partnerFrom(got); PARTNER_IN = partner; persist(); try { sessionStorage.removeItem(PEND); } catch (e) {}
          V.side = 'before'; V.view = 'setup'; render(); say(got.n + '’s card is open. Check your names below, then answer your own questions.');
          return;
        }
        var me = st.s.me; partnerFrom(got); persist();
        if (!box(me)) { PARTNER_IN = partner; st.inCard = code; persist(); try { sessionStorage.removeItem(PEND); } catch (e) {} V.view = 'hub'; render(); say(got.n + '’s card is open. Answer your own questions, then Talk About This is ready.'); return; }
        return unlock(me, 'Your partner’s card is kept with your own answers, locked with your passcode.').then(function (ok) {
          if (!ok) { st.inCard = code; persist(); render(); return; }
          DATA[me].partner = partner; st.p[me].got = 1; return save(me).then(function () { dropPending(); V.side = 'before'; V.view = box(me).done ? 'talk' : 'hub'; render(); if (!box(me).done) say(got.n + '’s card is ready. Finish your own answers to see Talk About This.'); });
        });
      });
  }

  /* ---------- the check-in card (two devices, After the Vows) ----------
     {v: 1, k: roundKey ('YYYY-MM' or 'fy'), n, to, r: {questionId: text}}, locked like the answers card,
     in a link ending #gmm=m1.<code>. */
  function mclean(o) {
    if (!o || typeof o !== 'object' || Array.isArray(o) || o.v !== 1) return null;
    if (Object.keys(o).sort().join(',') !== 'k,n,r,to,v') return null;
    if (typeof o.k !== 'string' || !/^(fy|\d{4}-\d{2})$/.test(o.k)) return null;
    if (typeof o.n !== 'string' || !o.n || fname(o.n) !== o.n || typeof o.to !== 'string' || fname(o.to) !== o.to) return null;
    if (!o.r || typeof o.r !== 'object' || Array.isArray(o.r)) return null;
    var r = {}; for (var k in o.r) { if (!/^[A-Za-z0-9_-]{1,40}$/.test(k) || typeof o.r[k] !== 'string') return null; r[k] = o.r[k].slice(0, 600); }
    return { v: 1, k: o.k, n: o.n, to: o.to, r: r };
  }
  function mmake(obj, word) {
    var salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    return C.derive(word.trim().toLowerCase(), salt).then(function (k) { return subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, enc.encode(JSON.stringify(obj))); })
      .then(function (ct) { var c = new Uint8Array(ct), all = new Uint8Array(28 + c.length); all.set(salt, 0); all.set(iv, 16); all.set(c, 28); return 'm1.' + C.b64u(all); });
  }
  function mread(code, word) {
    var all = C.unb64u(code.slice(3));
    return C.derive(word.trim().toLowerCase(), all.slice(0, 16)).then(function (k) { return unseal(k, all.slice(16, 28), all.slice(28)); }).then(mclean);
  }
  function mcodeOf(s) { s = String(s || '').trim(); var m = /(?:^|[#&?])gmm=(m1\.[A-Za-z0-9_-]{20,6000})/.exec(s); return m ? m[1] : (/^m1\.[A-Za-z0-9_-]{20,6000}$/.test(s) ? s : ''); }
  function mlink(code) { var base = /^https?:$/.test(location.protocol) ? location.origin : 'https://growwithgrounded.com'; return base + '/heartwood/#gmm=' + code; }
  function pendingM() { var c = ''; try { c = sessionStorage.getItem(PENDM) || ''; } catch (e) {} return c || (st && st.inM) || ''; }
  function dropM() { try { sessionStorage.removeItem(PENDM); } catch (e) {} if (st && st.inM) { delete st.inM; persist(); } }
  function openM(code) {
    if (!setup() || st.s.mode !== 'two') { say('Set up Heartwood on two devices first, then open this check-in card.'); return Promise.resolve(); }
    var got = null, me = st.s.me;
    return ask({ title: 'Open your partner’s check-in', lead: 'Type the word the two of you chose for this check-in.', fields: ['Your shared word'], ok: 'Open',
      verify: function (v) { return mread(code, v[0]).then(function (c) { if (!c) return 'This card is not one Heartwood can read.'; got = c; return true; }, function () { return 'That word does not open this card. Try again.'; }); } })
      .then(function (v) {
        if (!v || !got) return;
        return unlock(me, 'Your partner’s check-in is kept with your own answers, locked with your passcode.').then(function (ok) {
          if (!ok) { st.inM = code; persist(); return; }
          dataOf(me).mp[got.k] = { n: got.n, r: got.r }; st.p[me].m = st.p[me].m || {}; st.p[me].m[got.k] = 1; return save(me).then(function () { dropM(); V.side = 'after'; go('roundread', { rk: got.k }); });
        });
      });
  }

  /* ---------- Talk About This, and Strengths and Growing Edges ---------- */
  function partnerAns(p) { return C.answersOf(p.a); }
  function pair() {
    if (oneDevice()) return [{ name: nm('a'), fw: DATA.a.fw, ans: DATA.a.ans }, { name: nm('b'), fw: DATA.b.fw, ans: DATA.b.ans }];
    var me = st.s.me, p = DATA[me].partner;
    return [{ name: nm(me), fw: DATA[me].fw, ans: DATA[me].ans }, { name: p.n, fw: p.fw, ans: partnerAns(p) }];
  }
  function compareNow() { var P = pair(); return { X: P[0], Y: P[1], R: C.compare(P[0], P[1], extra()) }; }

  /* ---------- views ---------- */
  var ICON_LOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
  function say(m) { var el = $('btv-say'); if (!el) return; el.textContent = m; clearTimeout(el._t); el._t = setTimeout(function () { el.textContent = ''; }, 6000); }
  function top() { var el = $('gm-tabs') || $('gm-app'); if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: 'start' }); }
  function countIn(d, aid) { return qsIn(aid).filter(function (q) { return d.ans[q.id]; }).length; }
  function btn(act, text, o) { o = o || {}; var at = ''; for (var k in o) if (k !== 'cls') at += ' data-' + k + '="' + esc(o[k]) + '"'; return '<button type="button" class="btn ' + (o.cls || 'btn-primary') + '" data-act="' + act + '"' + at + '>' + text + '</button>'; }
  function sec(o) { return o && o.cls ? o : { cls: 'btn-secondary ff-sm' }; }
  function srcLine(ids, opts) { var h = (window.GGSources && ids && ids.length) ? GGSources.line(ids, opts) : ''; return h ? '<div class="ff-sources gm-src">' + h + '</div>' : ''; }

  function vWelcome() {
    var pc = pendingCard();
    return '<div class="ff-card gold"><h2>Welcome</h2>' +
      '<p>Heartwood is a private place for the two of you, in two parts. <b>Before the Vows</b> is for the season before the wedding: a check-in where each of you answers on your own, about 20 minutes each, in twelve areas of married life, then Talk About This, your Strengths and Growing Edges, The Couple Workbook, and The Money Map. <b>After the Vows</b> opens after your wedding day, with Practices for Two, a Monthly Check-in for Two, and your First-Year Check-in.</p>' +
      '<p>It is a conversation tool, not a test: there is nothing to pass and nothing to score. Every answer is simply a place to start talking.</p>' +
      '<p class="ff-private">' + ICON_LOCK + '<span>Private by design. Each of you answers behind your own passcode, and everything stays on this device. Nothing is sent anywhere.</span></p>' +
      (pc ? '<div class="btv-note"><p><b>A card from your partner is here.</b> Open it with the word the two of you chose.</p>' + btn('open-pending', 'Open the Card', { cls: 'btn-primary ff-sm' }) + '</div>' : '') +
      '<div class="ff-row">' + btn('start', setup() ? 'Continue' : 'Get Started') + '</div></div>';
  }
  function faithSelect(w, val) {
    if (!F || !Array.isArray(F.list)) return '';
    return '<label class="ff-f"><span class="l" id="gm-fl-' + w + '">' + esc(nm(w) || (w === 'a' ? 'First partner' : 'Second partner')) + '’s faith background</span><select id="gm-fb-' + w + '"><option value="">Choose if you like</option>' +
      F.list.map(function (f) { return '<option value="' + esc(f.id) + '"' + (f.id === val ? ' selected' : '') + '>' + esc(f.name) + '</option>'; }).join('') + '</select></label>';
  }
  function vSetup() {
    var s = setup() || { a: '', b: '', mode: 'one', me: 'a', fb: { a: '', b: '' } }, locked = !!(st && st.p && (st.p.a || st.p.b));
    return '<div class="ff-card"><h2>' + (setup() ? 'Names and Settings' : 'Set Up') + '</h2><p class="ff-sub">Just your first names, and how you would like to answer.</p>' +
      '<div class="ff-grid"><label class="ff-f"><span class="l">First partner</span><input id="btv-na" maxlength="24" autocomplete="off" value="' + esc(s.a) + '"' + (locked ? ' disabled' : '') + '></label>' +
      '<label class="ff-f"><span class="l">Second partner</span><input id="btv-nb" maxlength="24" autocomplete="off" value="' + esc(s.b) + '"' + (locked ? ' disabled' : '') + '></label></div>' +
      '<fieldset class="btv-choice"' + (locked ? ' disabled' : '') + '><legend>How will you answer?</legend>' +
      '<label><input type="radio" name="btv-mode" value="one"' + (s.mode !== 'two' ? ' checked' : '') + '><span><b>One device</b><small>Take turns. Hand the device over, and each of you answers behind your own passcode.</small></span></label>' +
      '<label><input type="radio" name="btv-mode" value="two"' + (s.mode === 'two' ? ' checked' : '') + '><span><b>Two devices</b><small>Each of you answers on your own phone or computer. Then you trade cards, locked with a word only the two of you know.</small></span></label></fieldset>' +
      '<fieldset class="btv-choice" id="btv-me-f"' + (s.mode === 'two' ? '' : ' hidden') + (locked ? ' disabled' : '') + '><legend>Who is using this device?</legend>' +
      '<label><input type="radio" name="btv-me" value="a"' + (s.me !== 'b' ? ' checked' : '') + '><span><b id="btv-me-a">' + esc(s.a || 'The first partner') + '</b></span></label>' +
      '<label><input type="radio" name="btv-me" value="b"' + (s.me === 'b' ? ' checked' : '') + '><span><b id="btv-me-b">' + esc(s.b || 'The second partner') + '</b></span></label></fieldset>' +
      (locked ? '<p class="ff-sub">Answers are already locked on this device. To change the names or devices, use Clear Everything below.</p>' : '') +
      (F ? '<div class="gm-set"><h3>Faith Backgrounds</h3><p class="btv-small">' + esc(F.lead || 'Optional, and you can change it any time.') + ' When your two backgrounds differ, a short set of questions for a home that honors both is added for each of you.</p><div class="ff-grid">' + faithSelect('a', s.fb.a) + faithSelect('b', s.fb.b) + '</div></div>' : '') +
      '<div class="gm-set"><h3>Your Wedding Day</h3><p class="btv-small">After the Vows opens on this date. Optional, and kept only on this device.</p><div class="ff-grid"><label class="ff-f"><span class="l">Wedding date</span><input type="date" id="gm-wd" value="' + esc(s.wd || '') + '"></label></div>' +
      '<label class="gm-check"><input type="checkbox" id="gm-wed"' + (s.wed ? ' checked' : '') + '><span>We’re married. Open After the Vows now.</span></label></div>' +
      '<div class="ff-row">' + btn('setup-save', 'Save and Continue') + btn('welcome', 'Back', sec()) + '<span class="ff-status" id="btv-st" role="status" aria-live="polite"></span></div></div>';
  }
  function status(w) { var b = box(w); return !b ? 'Not started yet' : b.done ? 'Finished' : 'Started'; }
  function vHub() {
    var s = st.s, h = '', both;
    if (s.mode === 'one') {
      both = box('a') && box('a').done && box('b') && box('b').done;
      h += '<div class="ff-card"><h2>Your Check-in</h2><p class="ff-sub">Each of you answers privately. ' + esc(s.a) + '’s and ' + esc(s.b) + '’s answers stay hidden until you have both finished.</p><div class="btv-who">' +
        ['a', 'b'].map(function (w) {
          var b = box(w), done = b && b.done;
          return '<div class="btv-person' + (done ? ' done' : '') + '"><h3>' + esc(nm(w)) + '</h3><p>' + status(w) + '</p>' +
            (done ? '<p class="btv-small">Thank you. Your answers are locked.</p>' + (twoOn() ? btn('answer-two', 'Answer the Two Traditions Questions', { w: w, cls: 'btn-secondary ff-sm' }) : '') : btn('answer', b ? 'Keep Going' : 'Start', { w: w, cls: 'btn-primary ff-sm' })) + '</div>';
        }).join('') + '</div>' +
        (both ? '<div class="btv-note"><p><b>You have both finished.</b> Sit together, and each of you types your passcode to open Talk About This, or your Strengths and Growing Edges.</p><div class="ff-row">' + btn('talk', 'Open Talk About This') + (RS ? btn('results', 'Strengths and Growing Edges', { cls: 'btn-secondary' }) : '') + '</div></div>'
          : '<p class="btv-small">When you are done, hand the device to your partner. Their turn starts with their own passcode.</p>') + '</div>';
    } else {
      var me = s.me, b = box(me), done = b && b.done, theirs = nm(other(me)), pc = pendingCard();
      h += '<div class="ff-card"><h2>' + esc(nm(me)) + '’s Check-in</h2><p class="ff-sub">On this device: ' + esc(nm(me)) + '. ' + esc(theirs) + ' answers on their own device.</p>' +
        '<div class="btv-who"><div class="btv-person' + (done ? ' done' : '') + '"><h3>Your answers</h3><p>' + status(me) + '</p>' +
        (done ? (twoOn() ? btn('answer-two', 'Answer the Two Traditions Questions', { w: me, cls: 'btn-secondary ff-sm' }) : '') : btn('answer', b ? 'Keep Going' : 'Start', { w: me, cls: 'btn-primary ff-sm' })) + '</div>' +
        '<div class="btv-person"><h3>' + esc(theirs) + '’s card</h3><p>' + (PARTNER_IN ? 'Open. It joins your answers when you start.' : (b && b.got) ? 'Opened and kept with your answers' : pc ? 'Waiting to be opened' : 'Not here yet') + '</p>' +
        (pc && !PARTNER_IN ? btn('open-pending', 'Open the Card', sec()) : '') + '</div></div>' +
        (done ? '<div class="ff-row">' + btn('talk', 'Open Talk About This') + (RS ? btn('results', 'Strengths and Growing Edges', { cls: 'btn-secondary' }) : '') + btn('make-card', 'Make a Card for ' + esc(theirs), { cls: 'btn-secondary' }) + '</div>' +
          '<div class="btv-paste"><label class="ff-f"><span class="l">Got a link from ' + esc(theirs) + '?</span><span class="h">Scan their QR code with this device’s camera, or paste their link here.</span><input id="btv-paste" autocomplete="off" placeholder="Paste the link"></label><div class="ff-row">' + btn('paste', 'Open This Card', sec()) + '</div></div>'
          : '<p class="btv-small">When you finish, you can make a card for ' + esc(theirs) + ' and open theirs. Bring your card to your sessions too.</p>') + '</div>';
    }
    h += weekHub();
    if (WB) h += '<div class="ff-card sage"><h2>' + esc(WB.title) + '</h2>' + (WB.lead ? '<p class="ff-sub">' + esc(WB.lead) + '</p>' : '') + '<p class="btv-small">Each of you writes privately. Choose Show My Partner on any exercise you would like to read together.</p><div class="ff-row">' +
      whoButtons('wb') + (oneDevice() ? btn('wb-read', 'Read Together', sec()) : '') + btn('wb-print', 'Print the Workbook', sec()) + '</div><p class="btv-small">Print the Workbook prints the six chapters with blank lines to write on. To print your own answers too, open your workbook first.</p></div>';
    if (MN) h += '<div class="ff-card sage"><h2>' + esc(MN.title) + '</h2>' + (MN.lead ? '<p class="ff-sub">' + esc(MN.lead) + '</p>' : '') + '<div class="ff-row">' + moneyButtons() + '</div></div>';
    if (PR) h += '<div class="ff-card sage"><h2>' + esc(PR.title) + '</h2>' + (PR.lead ? '<p class="ff-sub">' + esc(PR.lead) + '</p>' : '') + '<div class="ff-row">' + btn('pr', 'Open Practices for Two', sec()) + '</div></div>';
    h += tgHtml();
    return h + '<div class="ff-row">' + btn('setup', 'Names and Settings', sec()) + '</div>';
  }
  function whoButtons(act) {
    if (!oneDevice()) return btn(act, 'Open', { w: st.s.me, cls: 'btn-primary ff-sm' });
    return ['a', 'b'].map(function (w) { return btn(act, 'Open as ' + esc(nm(w)), { w: w, cls: 'btn-primary ff-sm' }); }).join('');
  }
  function moneyButtons() {
    var mk = st.s.mk;
    if (!oneDevice()) return btn('money', 'Open The Money Map', { w: st.s.me, cls: 'btn-primary ff-sm' });
    if (mk) return btn('money', 'Open The Money Map', { w: mk, cls: 'btn-primary ff-sm' }) + '<span class="btv-small gm-inline">Kept with ' + esc(nm(mk)) + '’s answers, opened with ' + esc(nm(mk)) + '’s passcode.</span>';
    return ['a', 'b'].map(function (w) { return btn('money', 'Keep It With ' + esc(nm(w)) + '’s Passcode', { w: w, cls: 'btn-primary ff-sm' }); }).join('');
  }
  function scaleHtml(q, v) {
    return '<div class="btv-scale" role="group" aria-label="Your answer">' + SCALE.map(function (s) {
      return '<button type="button" data-act="pick" data-q="' + esc(q.id) + '" data-v="' + s[0] + '" aria-pressed="' + (+v === +s[0] ? 'true' : 'false') + '">' + esc(s[1]) + '</button>';
    }).join('') + '</div>';
  }
  function examplesHtml(w) {
    var g = faithGroup(st.s.fb[w]); if (!g || !Array.isArray(g.examples) || !g.examples.length) return '';
    var it = faithItem(st.s.fb[w]);
    return '<div class="btv-note gm-ex"><p><b>Examples that may fit you</b>' + (known(st.s.fb[w]) ? '<br><span class="btv-small">From your faith background: ' + esc(it.name) + '</span>' : '') + '</p><ul class="ff-tips">' + g.examples.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>';
  }
  function vAnswer() {
    var w = V.who, d = DATA[w], AR = areasFor(), i = V.area, ar = AR[i], qs = qsIn(ar.id), n = AR.length;
    var faithPick = ar.faith ? '<div class="btv-fw"><p><b>Faith or Plain wording?</b> Choose the words that fit you. Either way, your answers line up with ' + esc(nm(other(w))) + '’s.</p><div class="btv-scale two" role="group" aria-label="Wording">' +
      [['faith', 'Faith'], ['plain', 'Plain']].map(function (o) { return '<button type="button" data-act="fw" data-v="' + o[0] + '" aria-pressed="' + (d.fw === o[0]) + '">' + o[1] + '</button>'; }).join('') + '</div></div>' : '';
    var showQs = !ar.faith || d.fw;
    return '<div class="ff-card"><div class="btv-prog"><span>' + esc(nm(w)) + ' &middot; Area ' + (i + 1) + ' of ' + n + '</span><span id="btv-cnt">' + countIn(d, ar.id) + ' of ' + qs.length + ' answered</span></div>' +
      '<div class="btv-bar" aria-hidden="true"><i style="width:' + Math.round(i / (n + 1) * 100) + '%"></i></div>' +
      '<h2>' + esc(ar.name) + '</h2>' + (ar.lead ? '<p class="ff-sub">' + esc(ar.lead) + '</p>' : '') + faithPick +
      (ar.faith && showQs ? examplesHtml(w) : '') +
      (showQs ? qs.map(function (q, k) {
        var t = (ar.faith && d.fw === 'plain' && q.plain) ? q.plain : q.text;
        return '<fieldset class="btv-q" data-qid="' + esc(q.id) + '"><legend><span class="btv-qn">' + (k + 1) + '</span>' + esc(t) + '</legend>' + scaleHtml(q, d.ans[q.id]) + '</fieldset>';
      }).join('') : '') +
      '<p class="btv-small">Answer for yourself, as things are today. Skip any you like.</p>' +
      '<div class="ff-row btv-nav">' + btn('prev', i ? 'Back' : 'Back to the Start', sec()) + btn('next', i < n - 1 ? 'Next Area' : 'Last Page') + btn('away', 'Lock and Step Away', sec()) + '</div></div>';
  }
  function vSafety() {
    var w = V.who;
    return '<div class="ff-card btv-safe"><div class="btv-prog"><span>' + esc(nm(w)) + ' &middot; Last page</span><span>Just for you</span></div><div class="btv-bar" aria-hidden="true"><i style="width:96%"></i></div>' +
      '<h2>' + esc(SAFETY.title || 'Just for You') + '</h2><p class="ff-sub">' + esc(SAFETY.lead || '') + '</p>' +
      (SAFETY.items || []).map(function (it) {
        return '<fieldset class="btv-q"><legend>' + esc(it.text) + '</legend><div class="btv-scale two" role="group" aria-label="Your answer">' +
          [['y', 'Yes'], ['n', 'No']].map(function (o) { return '<button type="button" data-act="safe" data-s="' + esc(it.id) + '" data-v="' + o[0] + '" aria-pressed="' + (SAFE[it.id] === o[0]) + '">' + o[1] + '</button>'; }).join('') + '</div></fieldset>';
      }).join('') +
      '<div class="ff-row btv-nav">' + btn('prev', 'Back', sec()) + btn('finish', 'Finish') + '</div></div>';
  }
  function linesHtml() {
    return '<ul class="btv-lines">' + (SAFETY.lines || []).map(function (l) {
      var how = esc(l[1]).replace(/(\d-\d{3}-\d{3}-\d{4})/g, function (m) { return '<a href="tel:' + m.replace(/-/g, '') + '">' + m + '</a>'; }).replace(/\b(988|911)\b(?![^<]*<\/a>)/g, '<a href="tel:$1">$1</a>');
      return '<li><b>' + esc(l[0]) + '</b><span>' + how + '</span></li>';
    }).join('') + '</ul>';
  }
  function vSafeHelp() {
    return '<div class="ff-help btv-help" tabindex="-1" id="btv-help"><h2>You Deserve to Feel Safe</h2><p>' + esc(SAFETY.yesLead || '') + '</p>' + linesHtml() +
      '<p>These answers stay with you. They are not saved on this device, and they never go on a card, a printout, or ' + esc(nm(other(V.who))) + '’s screen. If it helps, write down a number now, somewhere only you will see it.</p>' +
      '<div class="ff-row">' + btn('safe-done', 'Continue') + '</div></div>';
  }
  function vHandoff() {
    var w = V.who, o = other(w), od = box(o) && box(o).done;
    return '<div class="ff-card gold"><h2>Thank You, ' + esc(nm(w)) + '</h2><p>Your answers are locked with your passcode.</p>' +
      (oneDevice() ? (od ? '<p>You have both finished. Sit together, and open Talk About This.</p><div class="ff-row">' + btn('talk', 'Open Talk About This') + '</div>'
        : '<p><b>Now hand the device to ' + esc(nm(o)) + '.</b> Their turn starts with their own passcode, and your answers stay hidden.</p><div class="ff-row">' + btn('answer', 'Start ' + esc(nm(o)) + '’s Turn', { w: o }) + btn('hub', 'Not Yet', sec()) + '</div>')
        : '<div class="ff-row">' + btn('hub', 'Continue') + '</div>') + '</div>';
  }
  // Email and Text to Chris and Kayti (GWG BLD 773): the couple's own mail or messages app opens with the link.
  var GG_MAIL = 'hello@growwithgrounded.com', GG_SMS = '+13202917393';
  var SEND_WHAT = { card: 'card', week: 'Week Card', m: 'check-in card' };
  function fromWho(kind) { return kind === 'week' && oneDevice() ? nm('a') + ' and ' + nm('b') : nm(st.s.me); }
  function sendBits(link, kind) {
    if (SAMPLE || !SEND_WHAT[kind]) return '';
    var what = SEND_WHAT[kind], who = fromWho(kind) || '', our = kind === 'week' ? 'our' : 'my';
    var sub = 'Heartwood: ' + (kind === 'week' ? 'Week Card' : kind === 'm' ? 'Check-in Card' : 'Card') + (who ? ' from ' + who : '');
    var body = 'Hi Chris and Kayti,\n\nHere is ' + our + ' ' + what + ' from Heartwood:\n\n' + link + '\n\nOur shared word stays out of this message. We will tell you in person.' + (who ? '\n\n' + who : '');
    var sms = 'Hi Chris and Kayti, here is ' + our + ' ' + what + ' from Heartwood: ' + link + ' We will tell you our shared word in person.';
    var mail = 'mailto:' + GG_MAIL + '?subject=' + encodeURIComponent(sub) + '&body=' + encodeURIComponent(body);
    var text = 'sms:' + GG_SMS + '?&body=' + encodeURIComponent(sms);
    return '<div class="ff-row gm-send"><a class="btn btn-primary" id="gm-send-mail" href="' + esc(mail) + '">Email to Chris and Kayti</a>' +
      '<a class="btn btn-secondary ff-sm" id="gm-send-text" href="' + esc(text) + '">Text to Chris and Kayti</a></div>' +
      '<p class="btv-small">Each opens your own mail or messages app with the link inside. Tell Chris and Kayti your shared word in person, never in the message.</p>' +
      '<details class="btv-more gm-mailcopy"><summary>Email did not open? Copy the message</summary>' +
      '<p class="btv-small">Send it to <b>' + esc(GG_MAIL) + '</b> from any email you use.</p>' +
      '<textarea readonly rows="7" aria-label="The message to copy">' + esc('To: ' + GG_MAIL + '\nSubject: ' + sub + '\n\n' + body) + '</textarea>' +
      '<div class="ff-row"><button type="button" class="btn btn-secondary ff-sm" data-act="copy-mail">Copy the Message</button></div><p class="btv-small gm-cpst" aria-live="polite"></p></details>';
  }
  function cardView(link, title, lead, small, qrLabel, kind) {
    var svg = '';
    try { if (window.GGQR) svg = GGQR.svg(link, { label: qrLabel }); } catch (e) { svg = ''; }
    return '<div class="ff-card gold"><h2>' + title + '</h2><p class="ff-sub">' + lead + '</p>' +
      (svg ? '<div class="btv-qr">' + svg + '</div>' : '') +
      '<label class="ff-f"><span class="l">The link</span><input id="btv-link" readonly value="' + esc(link) + '"></label>' +
      sendBits(link, kind) +
      '<div class="ff-row">' + btn('copy', 'Copy the Link', sec()) + '<span class="ff-status" id="btv-cst" role="status" aria-live="polite"></span></div>' +
      '<p class="btv-small">' + small + ' Share the word in person, never in the same message as the link. Nothing is uploaded: the card rides after the # in the link, the part a browser never sends to any server.</p>' +
      '<div class="ff-row">' + btn(V.side === 'after' ? 'after' : 'hub', 'Done') + '</div></div>';
  }
  function vCard(code) {
    var theirs = esc(nm(other(st.s.me)));
    return cardView(C.card.link(code), 'Your Card for ' + theirs, theirs + ' scans this with their phone’s camera, or opens the link, then types your shared word.',
      'The card carries your first names, Faith or Plain, your faith background if you chose one, and your answers, locked with your shared word. The private questions on the last page never go on it. Bring it to your sessions, too.', 'QR code for your Heartwood card', 'card');
  }
  function itemHtml(it, X, Y, talk) {
    return '<li><p class="btv-it">' + esc(it.text) + '</p><p class="btv-ans"><span><b>' + esc(X.name) + ':</b> ' + esc(label(it.x)) + '</span><span><b>' + esc(Y.name) + ':</b> ' + esc(label(it.y)) + '</span></p>' +
      (talk && it.q.talk ? '<p class="btv-talk">' + esc(it.q.talk) + '</p>' : '') + '</li>';
  }
  function vTalk() {
    var c = compareNow(), X = c.X, Y = c.Y, R = c.R;
    var nd = R.reduce(function (n, r) { return n + r.diff.length; }, 0), na = R.reduce(function (n, r) { return n + r.agree.length; }, 0);
    var h = '<div class="ff-card gold"><h2>Talk About This</h2><p class="ff-sub">' + esc(X.name) + ' and ' + esc(Y.name) + ': ' + nd + (nd === 1 ? ' place' : ' places') + ' to talk about, and ' + na + (na === 1 ? ' place' : ' places') + ' you already agree.</p>' +
      '<ul class="ff-tips"><li>Pick one or two a week. Set aside calm time, not the middle of a disagreement.</li><li>Take turns: one of you shares while the other listens and says back what they heard.</li><li>The goal is understanding each other. Some differences you will settle, and some you will simply understand and live with well.</li></ul>' +
      '<div class="ff-row">' + btn('print', 'Save or Print the List', { cls: 'btn-primary ff-sm' }) + (RS ? btn('results-open', 'Strengths and Growing Edges', sec()) : '') + btn('leave-talk', 'Lock and Close', sec()) + '</div></div>';
    R.forEach(function (r) {
      if (!r.diff.length && !r.agree.length && !r.grow.length) return;
      h += '<section class="ff-card btv-area"><h3>' + esc(r.area.name) + '</h3>' +
        (r.diff.length ? '<p class="btv-k">Talk about this</p><ul class="btv-items">' + r.diff.map(function (it) { return itemHtml(it, X, Y, true); }).join('') + '</ul>' : '<p class="btv-small">You see this area much the same way.</p>') +
        (r.grow.length ? '<details class="btv-more"><summary>Worth Growing Together (' + r.grow.length + ')</summary><p class="btv-small">You answered these about the same, and there may be room to grow here, together.</p><ul class="btv-items">' + r.grow.map(function (it) { return itemHtml(it, X, Y, true); }).join('') + '</ul></details>' : '') +
        (r.agree.length ? '<details class="btv-more agree"><summary>Where You Agree (' + r.agree.length + ')</summary><p class="btv-small">Strengths to celebrate, and to lean on when the hard talks come.</p><ul class="btv-items">' + r.agree.map(function (it) { return itemHtml(it, X, Y, false); }).join('') + '</ul></details>' : '') +
        '</section>';
    });
    return h + '<div class="ff-row">' + btn('print', 'Save or Print the List', sec()) + btn('leave-talk', 'Lock and Close', sec()) + '</div>';
  }
  function vResults() {
    var c = compareNow(), X = c.X, Y = c.Y, sm = C.summary(c.R), S = RS.states || {};
    var order = ['strong', 'talk', 'grow'], by = { strong: [], talk: [], grow: [] };
    c.R.forEach(function (r) { var k = sm[r.area.id]; if (k) by[k].push(r); });
    var h = '<div class="ff-card gold"><h2>' + esc(RS.title || 'Strengths and Growing Edges') + '</h2><p class="ff-sub">' + esc(X.name) + ' and ' + esc(Y.name) + '</p>' + (RS.lead ? '<p>' + esc(RS.lead) + '</p>' : '') +
      '<div class="ff-row">' + btn('talk-open', 'Open Talk About This', { cls: 'btn-primary ff-sm' }) + btn('print-results', 'Save or Print', sec()) + btn('leave-talk', 'Lock and Close', sec()) + '</div></div>';
    order.forEach(function (k) {
      if (!by[k].length) return;
      var s = S[k] || {};
      h += '<section class="ff-card gm-res gm-' + k + '"><h3>' + esc(s.label || k) + '</h3>' + (s.lead ? '<p class="ff-sub">' + esc(s.lead) + '</p>' : '') +
        by[k].map(function (r) { var t = (RS.areas && RS.areas[r.area.id] && RS.areas[r.area.id][k]) || ''; return '<div class="gm-ra"><h4>' + esc(r.area.name) + '</h4>' + (t ? '<p>' + esc(t) + '</p>' : '') + '</div>'; }).join('') + '</section>';
    });
    return h;
  }
  function printPage(h) {
    var r = $('gg-print'); if (!r) return;
    r.innerHTML = h + '<p class="p-foot">Made on this device with Heartwood, Grow With Grounded, growwithgrounded.com. Nothing was sent anywhere.</p>';
    window.print();
    setTimeout(function () { r.innerHTML = ''; }, 1500);
  }
  function dateLine() { return new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }); }
  function printTalk() {
    var c = compareNow(), X = c.X, Y = c.Y, R = c.R;
    var li = function (it, talk) { return '<li><b>' + esc(it.text) + '</b><br>' + esc(X.name) + ': ' + esc(label(it.x)) + ' &middot; ' + esc(Y.name) + ': ' + esc(label(it.y)) + (talk && it.q.talk ? '<br><i>' + esc(it.q.talk) + '</i>' : '') + '</li>'; };
    var h = '<p class="p-eb">Heartwood</p><h1>Talk About This</h1><p>' + esc(X.name) + ' and ' + esc(Y.name) + ', ' + dateLine() + '</p>';
    R.forEach(function (r) {
      if (!r.diff.length && !r.grow.length) return;
      h += '<h2>' + esc(r.area.name) + '</h2><ul class="p-list">' + r.diff.map(function (it) { return li(it, true); }).join('') + r.grow.map(function (it) { return li(it, true); }).join('') + '</ul>';
    });
    var ag = []; R.forEach(function (r) { r.agree.forEach(function (it) { ag.push(it); }); });
    if (ag.length) h += '<h2>Where You Agree</h2><ul class="p-list">' + ag.map(function (it) { return '<li>' + esc(it.text) + '</li>'; }).join('') + '</ul>';
    printPage(h);
  }
  function printResults() {
    var c = compareNow(), sm = C.summary(c.R), S = RS.states || {};
    var h = '<p class="p-eb">Heartwood</p><h1>' + esc(RS.title) + '</h1><p>' + esc(c.X.name) + ' and ' + esc(c.Y.name) + ', ' + dateLine() + '</p>';
    ['strong', 'talk', 'grow'].forEach(function (k) {
      var rs = c.R.filter(function (r) { return sm[r.area.id] === k; }); if (!rs.length) return;
      h += '<h2>' + esc((S[k] || {}).label || k) + '</h2><ul class="p-list">' + rs.map(function (r) { var t = (RS.areas && RS.areas[r.area.id] && RS.areas[r.area.id][k]) || ''; return '<li><b>' + esc(r.area.name) + '</b>' + (t ? '<br>' + esc(t) : '') + '</li>'; }).join('') + '</ul>';
    });
    printPage(h);
  }

  /* ---------- The Couple Workbook ---------- */
  function exEntry(d, ex) { var e = d.wb[ex.id]; if (!e) e = d.wb[ex.id] = { t: [], c: '', sh: 0 }; return e; }
  function hasWords(e) { return !!e && ((e.t || []).some(function (x) { return String(x || '').trim(); }) || e.c !== '' && e.c != null); }
  function prTitle(id) { var p = prItem(id); return p ? p.title : ''; }
  function fwOf(w) { return (DATA[w] && DATA[w].fw) || st.s.fwp[w] || ''; }
  function vWbList() {
    var w = V.who;
    return '<div class="ff-card gold"><h2>' + esc(WB.title) + '</h2><p class="ff-sub">' + esc(nm(w)) + '’s workbook, locked with ' + esc(nm(w)) + '’s passcode.</p>' + (WB.lead ? '<p>' + esc(WB.lead) + '</p>' : '') +
      '<div class="btv-lessons">' + WB.chapters.map(function (ch, i) {
        var n = ch.exercises.filter(function (ex) { return hasWords(DATA[w].wb[ex.id]); }).length;
        return '<button type="button" class="btv-lesson" data-act="wb-ch" data-i="' + i + '"><span class="btv-ln">' + esc(String(ch.n || i + 1)) + '</span><span><b>' + esc(ch.title) + '</b><small>' + (ch.session ? 'Session ' + esc(String(ch.session)) + ' &middot; ' : '') + n + ' of ' + ch.exercises.length + ' started</small></span></button>';
      }).join('') + '</div><div class="ff-row">' + btn('wb-print', 'Print the Workbook', { w: w, cls: 'btn-secondary ff-sm' }) + btn('wb-print-mine', 'Print With My Answers', { w: w, cls: 'btn-secondary ff-sm' }) + btn('wb-away', 'Lock and Step Away', sec()) + '</div></div>';
  }
  function exHtml(ex, e) {
    var id = esc(ex.id), body = '';
    var prompts = ex.prompts || [];
    if (ex.kind === 'write') body = prompts.map(function (p, k) { return '<label class="ff-f"><span class="h">' + esc(p) + '</span><textarea data-wb="' + id + '" data-k="' + k + '" rows="3">' + esc((e.t || [])[k] || '') + '</textarea></label>'; }).join('');
    else if (ex.kind === 'list') body = prompts.map(function (p, k) { return '<label class="ff-f"><span class="h">' + esc(p) + '</span><input data-wb="' + id + '" data-k="' + k + '" maxlength="300" value="' + esc((e.t || [])[k] || '') + '"></label>'; }).join('');
    else if (ex.kind === 'choose') body = prompts.map(function (p) { return '<p class="gm-pq">' + esc(p) + '</p>'; }).join('') + '<fieldset class="btv-choice gm-pick"><legend class="gm-sr">Choose one</legend>' + (ex.choices || []).map(function (c, k) {
      return '<label><input type="radio" name="wbc-' + id + '" data-wbc="' + id + '" value="' + k + '"' + (String(e.c) === String(k) ? ' checked' : '') + '><span>' + esc(c) + '</span></label>'; }).join('') + '</fieldset>' +
      '<label class="ff-f"><span class="h">A few words on why, if you like</span><textarea data-wb="' + id + '" data-k="0" rows="2">' + esc((e.t || [])[0] || '') + '</textarea></label>';
    else body = '<ul class="ff-tips">' + prompts.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' +
      '<label class="ff-f"><span class="h">Notes for yourself, if you like</span><textarea data-wb="' + id + '" data-k="0" rows="2">' + esc((e.t || [])[0] || '') + '</textarea></label>';
    return '<section class="gm-ex-card"><h3>' + esc(ex.title) + '</h3>' + (ex.lead ? '<p class="ff-sub">' + esc(ex.lead) + '</p>' : '') + body +
      (ex.together ? '<p class="btv-talk">' + esc(ex.together) + '</p>' : '') +
      '<label class="gm-check"><input type="checkbox" data-wbsh="' + id + '"' + (e.sh ? ' checked' : '') + '><span>Show my partner' + (oneDevice() ? ' when we Read Together' : '') + '</span></label>' +
      '<label class="gm-check"><input type="checkbox" data-wbld="' + id + '"' + (e.ld ? ' checked' : '') + '><span>Share with our leaders on our Week Card</span></label></section>';
  }
  function reflectHtml(ch, w) {
    var r = ch.reflect; if (!r) return '';
    var t = fwOf(w) === 'faith' ? r.faith : r.plain; if (!t) t = r.plain || r.faith;
    return '<div class="btv-note"><p><b>Reflection</b></p><p>' + esc(t) + '</p></div>';
  }
  function tryWeekHtml(ids) {
    ids = (ids || []).filter(prItem); if (!ids.length) return '';
    return '<div class="gm-try"><h3>Try This Week</h3><div class="ff-row">' + ids.map(function (id) { return btn('pr-one', esc(prTitle(id)), { id: id, cls: 'btn-secondary ff-sm' }); }).join('') + '</div></div>';
  }
  function vWbCh() {
    var w = V.who, d = DATA[w], ch = WB.chapters[V.ch];
    return '<div class="ff-card"><div class="btv-prog"><span>' + esc(nm(w)) + ' &middot; Chapter ' + esc(String(ch.n || V.ch + 1)) + ' of ' + WB.chapters.length + '</span>' + (ch.session ? '<span>Session ' + esc(String(ch.session)) + '</span>' : '') + '</div>' +
      '<h2>' + esc(ch.title) + '</h2>' + (ch.teach || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
      ch.exercises.map(function (ex) { return exHtml(ex, exEntry(d, ex)); }).join('') +
      tryWeekHtml(ch.tryWeek) + reflectHtml(ch, w) + srcLine(ch.sources) +
      '<div class="ff-row btv-nav">' + btn('wb-list', 'All Chapters', sec()) + (V.ch < WB.chapters.length - 1 ? btn('wb-ch', 'Next Chapter', { i: V.ch + 1 }) : '') + btn('wb-away', 'Lock and Step Away', sec()) + '<span class="ff-status" id="gm-wbst" role="status" aria-live="polite"></span></div></div>';
  }
  function shownText(ex, e) {
    if (!e || !e.sh || !hasWords(e)) return '';
    var out = '';
    if (ex.kind === 'choose' && e.c !== '' && e.c != null && ex.choices) out += '<p><b>' + esc(ex.choices[+e.c] || '') + '</b></p>';
    (e.t || []).forEach(function (t, k) { if (String(t || '').trim()) out += (ex.kind === 'write' || ex.kind === 'list') && ex.prompts[k] ? '<p class="gm-pq">' + esc(ex.prompts[k]) + '</p><p>' + esc(t) + '</p>' : '<p>' + esc(t) + '</p>'; });
    return out;
  }
  function vWbRead() {
    var h = '<div class="ff-card gold"><h2>Read Together</h2><p class="ff-sub">Only the exercises each of you chose to show. Everything else stays private.</p><div class="ff-row">' + btn('leave-talk', 'Lock and Close', sec()) + '</div></div>', any = false;
    WB.chapters.forEach(function (ch) {
      var rows = ch.exercises.map(function (ex) {
        var A = shownText(ex, DATA.a.wb[ex.id]), B = shownText(ex, DATA.b.wb[ex.id]); if (!A && !B) return '';
        return '<div class="gm-ex-card"><h4>' + esc(ex.title) + '</h4><div class="btv-who"><div class="btv-person"><h3>' + esc(nm('a')) + '</h3>' + (A || '<p class="btv-small">Kept private for now.</p>') + '</div><div class="btv-person"><h3>' + esc(nm('b')) + '</h3>' + (B || '<p class="btv-small">Kept private for now.</p>') + '</div></div>' + (ex.together ? '<p class="btv-talk">' + esc(ex.together) + '</p>' : '') + '</div>';
      }).join('');
      if (rows) { any = true; h += '<section class="ff-card"><h3>' + esc(ch.title) + '</h3>' + rows + '</section>'; }
    });
    if (!any) h += '<div class="ff-card"><p>Nothing to read together yet. In the workbook, choose Show My Partner on an exercise you would like to share.</p></div>';
    return h;
  }

  // The workbook on paper (Letter size, one chapter a page or more). Blank lines unless the partner who is
  // unlocked chooses Print With My Answers; nobody's writing is printed otherwise.
  function lines(n) { var h = '<div class="p-lines">'; for (var i = 0; i < n; i++) h += '<i></i>'; return h + '</div>'; }
  function reflectFor(r, w) {
    if (!r) return '';
    var fws = w ? [fwOf(w)] : (setup() ? (oneDevice() ? [st.s.fwp.a, st.s.fwp.b] : [st.s.fwp[st.s.me]]) : []);
    var hasF = fws.indexOf('faith') >= 0, hasP = fws.indexOf('plain') >= 0 || fws.indexOf('') >= 0 || !fws.length;
    if (hasF && !hasP) return '<p>' + esc(r.faith || r.plain) + '</p>';
    if (hasP && !hasF) return '<p>' + esc(r.plain || r.faith) + '</p>';
    return '<p><b>Faith:</b> ' + esc(r.faith) + '</p><p><b>Plain:</b> ' + esc(r.plain) + '</p>';
  }
  function printWorkbook(w, mine) {
    var d = mine && w && DATA[w] ? dataOf(w) : null;
    var h = '<div class="p-wb"><p class="p-eb">Heartwood</p><h1>' + esc(WB.title) + '</h1>' + (d ? '<p>' + esc(nm(w)) + '’s workbook, ' + dateLine() + '</p>' : '<p>Names: ______________________ and ______________________</p>') + (WB.lead ? '<p>' + esc(WB.lead) + '</p>' : '');
    WB.chapters.forEach(function (ch, i) {
      h += '<section class="p-ch"><p class="p-eb">Chapter ' + esc(String(ch.n || i + 1)) + (ch.session ? ' &middot; Session ' + esc(String(ch.session)) : '') + '</p><h2 class="p-cht">' + esc(ch.title) + '</h2>' + (ch.teach || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
      ch.exercises.forEach(function (ex) {
        var e = d ? (d.wb[ex.id] || { t: [] }) : null, t = e ? (e.t || []) : [];
        var ans = function (k, n) { var v = t[k] && String(t[k]).trim(); return v ? '<p class="p-ans">' + esc(v) + '</p>' : lines(n); };
        h += '<div class="p-ex"><h3>' + esc(ex.title) + '</h3>' + (ex.lead ? '<p><i>' + esc(ex.lead) + '</i></p>' : '');
        var pr = ex.prompts || [];
        if (ex.kind === 'write') pr.forEach(function (p, k) { h += '<p class="p-q">' + esc(p) + '</p>' + ans(k, 4); });
        else if (ex.kind === 'list') pr.forEach(function (p, k) { h += '<p class="p-q">' + esc(p) + '</p>' + ans(k, 1); });
        else if (ex.kind === 'choose') { pr.forEach(function (p) { h += '<p class="p-q">' + esc(p) + '</p>'; }); h += '<ul class="p-box">' + (ex.choices || []).map(function (c, k) { return '<li>' + (e && String(e.c) === String(k) ? '&#9746; ' : '&#9744; ') + esc(c) + '</li>'; }).join('') + '</ul><p class="p-q">Why</p>' + ans(0, 2); }
        else { h += '<ul class="p-list">' + pr.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul><p class="p-q">Notes</p>' + ans(0, 3); }
        if (ex.together) h += '<p class="p-tog"><b>Together:</b> ' + esc(ex.together) + '</p>';
        h += '</div>';
      });
      var tw = (ch.tryWeek || []).map(prItem).filter(Boolean);
      if (tw.length) h += '<div class="p-ex"><h3>Try This Week</h3>' + tw.map(function (p) { return '<p class="p-q">' + esc(p.title) + (p.mins ? ' (' + esc(String(p.mins)) + ' min)' : '') + '</p><ol class="p-list">' + (p.steps || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>'; }).join('') + '</div>';
      if (ch.reflect) h += '<div class="p-ex"><h3>Reflection</h3>' + reflectFor(ch.reflect, d ? w : (w || null)) + lines(3) + '</div>';
      h += '</section>';
    });
    printPage(h + '</div>');
  }

  /* ---------- The Money Map ---------- */
  function num(x) { x = parseFloat(String(x == null ? '' : x).replace(/[^0-9.]/g, '')); return isFinite(x) ? x : 0; }
  function money(x) { return '$' + Math.round(x).toLocaleString(); }
  function mm() { var d = DATA[V.who]; d.money = d.money || { v: {}, g: [] }; d.money.v = d.money.v || {}; d.money.g = d.money.g || []; return d.money; }
  function isIncome(g, i) { return /inc/i.test(g.id) || (i === 0 && /income/i.test(g.name)); }
  function totals() {
    var m = mm(), inc = 0, out = 0, per = {};
    MN.groups.forEach(function (g, i) { var t = 0; g.items.forEach(function (it) { t += num(m.v[it[0]]); }); per[g.id] = t; if (isIncome(g, i)) inc += t; else out += t; });
    return { inc: inc, out: out, per: per, hasInc: MN.groups.some(isIncome) };
  }
  function totalsHtml() {
    var t = totals();
    return '<div class="btv-note gm-tot" id="gm-tot"><p><b>Each month</b></p><ul class="btv-lines">' + MN.groups.map(function (g) { return '<li><b>' + esc(g.name) + '</b><span>' + money(t.per[g.id]) + '</span></li>'; }).join('') +
      (t.hasInc ? '<li><b>Left after everything</b><span>' + money(t.inc - t.out) + '</span></li>' : '') + '</ul></div>';
  }
  function vMoney() {
    var m = mm();
    return '<div class="ff-card"><h2>' + esc(MN.title) + '</h2><p class="ff-sub">Kept with ' + esc(nm(V.who)) + '’s answers, locked with ' + esc(nm(V.who)) + '’s passcode.</p>' + (MN.lead ? '<p>' + esc(MN.lead) + '</p>' : '') +
      '<p class="btv-small">Amounts for one month, in dollars. Rough numbers are fine.</p>' +
      MN.groups.map(function (g) {
        return '<section class="gm-mg"><h3>' + esc(g.name) + '</h3><div class="ff-grid">' + g.items.map(function (it) {
          return '<label class="ff-f"><span class="h">' + esc(it[1]) + '</span><input inputmode="decimal" data-mv="' + esc(it[0]) + '" value="' + esc(m.v[it[0]] || '') + '" autocomplete="off"></label>'; }).join('') + '</div></section>';
      }).join('') + totalsHtml() +
      (MN.goals ? '<section class="gm-mg"><h3>Goals</h3>' + (MN.goals.lead ? '<p class="ff-sub">' + esc(MN.goals.lead) + '</p>' : '') + (MN.goals.prompts || []).map(function (p, k) {
        return '<label class="ff-f"><span class="h">' + esc(p) + '</span><textarea data-mg="' + k + '" rows="2">' + esc(m.g[k] || '') + '</textarea></label>'; }).join('') + '</section>' : '') +
      (MN.talk && MN.talk.length ? '<section class="gm-mg"><h3>Talk About This</h3><ul class="ff-tips">' + MN.talk.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul></section>' : '') +
      (MN.note ? '<p class="btv-small">' + esc(MN.note) + '</p>' : '') + srcLine(MN.sources) +
      '<div class="ff-row">' + btn('money-save', 'Save') + btn('money-print', 'Save or Print', sec()) + btn('money-close', 'Lock and Close', sec()) + '<span class="ff-status" id="gm-mst" role="status" aria-live="polite"></span></div></div>';
  }
  function printMoney() {
    var m = mm(), t = totals();
    var h = '<p class="p-eb">Heartwood</p><h1>' + esc(MN.title) + '</h1><p>' + esc(nm('a')) + ' and ' + esc(nm('b')) + ', ' + dateLine() + '</p>';
    MN.groups.forEach(function (g) { h += '<h2>' + esc(g.name) + ': ' + money(t.per[g.id]) + '</h2><ul class="p-list">' + g.items.map(function (it) { return '<li>' + esc(it[1]) + ': ' + (m.v[it[0]] ? money(num(m.v[it[0]])) : '') + '</li>'; }).join('') + '</ul>'; });
    if (t.hasInc) h += '<h2>Left after everything: ' + money(t.inc - t.out) + '</h2>';
    if (MN.goals) h += '<h2>Goals</h2><ul class="p-list">' + (MN.goals.prompts || []).map(function (p, k) { return '<li><b>' + esc(p) + '</b><br>' + esc(m.g[k] || '') + '</li>'; }).join('') + '</ul>';
    if (MN.talk && MN.talk.length) h += '<h2>Talk About This</h2><ul class="p-list">' + MN.talk.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>';
    printPage(h);
  }

  /* ---------- Practices for Two ---------- */
  function prItem(id) { if (!PR) return null; for (var i = 0; i < PR.items.length; i++) if (PR.items[i].id === id) return PR.items[i]; return null; }
  // The general Faith line, or each partner's own tradition's line when that partner chose Faith wording and a background.
  function faithLines(p) {
    var lines = [], s = setup();
    if (s && F) ['a', 'b'].forEach(function (w) { var g = faithGroup(s.fb[w]); if (s.fwp[w] === 'faith' && known(s.fb[w]) && g && g.practiceLine && lines.indexOf(g.practiceLine) < 0) lines.push(g.practiceLine); });
    return lines.length ? lines : (p.faith ? [p.faith] : []);
  }
  function vPr() {
    return '<div class="ff-card gold"><h2>' + esc(PR.title) + '</h2>' + (PR.lead ? '<p class="ff-sub">' + esc(PR.lead) + '</p>' : '') + '<div class="btv-lessons">' + PR.items.map(function (p, i) {
      return '<button type="button" class="btv-lesson" data-act="pr-one" data-id="' + esc(p.id) + '"><span class="btv-ln">' + (i + 1) + '</span><span><b>' + esc(p.title) + '</b>' + (p.lead ? '<small>' + esc(p.lead) + '</small>' : '') + (p.mins ? '<small>' + esc(String(p.mins)) + ' min</small>' : '') + '</span></button>';
    }).join('') + '</div><div class="ff-row">' + btn('pr-back', 'Back', sec()) + '</div></div>';
  }
  function vPrOne() {
    var p = prItem(V.pid); if (!p) return vPr();
    return '<div class="ff-card"><div class="btv-prog"><span>' + esc(PR.title) + '</span>' + (p.mins ? '<span>' + esc(String(p.mins)) + ' min</span>' : '') + '</div><h2>' + esc(p.title) + '</h2>' + (p.lead ? '<p class="ff-sub">' + esc(p.lead) + '</p>' : '') +
      '<ol class="gm-steps">' + (p.steps || []).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>' +
      (p.after ? '<p class="btv-talk">' + esc(p.after) + '</p>' : '') +
      faithLines(p).map(function (l) { return '<p class="gm-faith">' + esc(l) + '</p>'; }).join('') +
      (p.why ? '<p class="btv-small">' + esc(p.why) + '</p>' : '') + srcLine(p.sources, { practice: true }) +
      '<div class="ff-row">' + btn('pr', 'All Practices', sec()) + (V.prBack ? btn('pr-back', 'Back', sec()) : '') + '</div></div>';
  }

  /* ---------- After the Vows ---------- */
  function roundQs(k) { return k === 'fy' ? AF.firstYear.questions : AF.monthly.questions; }
  function roundOf(k) { return k === 'fy' ? AF.firstYear : AF.monthly; }
  function rdone(w, k) { return !!(box(w) && box(w).r && box(w).r[k]); }
  function markDone(w, k) { var b = st.p[w]; b.r = b.r || {}; b.r[k] = 1; persist(); }
  function roundStatus(k) {
    var s = st.s;
    if (oneDevice()) return '<div class="btv-who">' + ['a', 'b'].map(function (w) {
      var dn = rdone(w, k); return '<div class="btv-person' + (dn ? ' done' : '') + '"><h3>' + esc(nm(w)) + '</h3><p>' + (dn ? 'Answered' : 'Not yet') + '</p>' + btn('round', dn ? 'Change My Answers' : 'Answer', { w: w, k: k, cls: dn ? 'btn-secondary ff-sm' : 'btn-primary ff-sm' }) + '</div>'; }).join('') + '</div>' +
      (rdone('a', k) && rdone('b', k) ? '<div class="ff-row">' + btn('round-read', 'Read Them Side by Side', { k: k }) + '</div>' : '<p class="btv-small">When you have both answered, sit together and read them side by side.</p>');
    var me = s.me, dn = rdone(me, k), theirs = esc(nm(other(me)));
    return '<div class="btv-who"><div class="btv-person' + (dn ? ' done' : '') + '"><h3>Your answers</h3><p>' + (dn ? 'Answered' : 'Not yet') + '</p>' + btn('round', dn ? 'Change My Answers' : 'Answer', { w: me, k: k, cls: 'btn-primary ff-sm' }) + '</div>' +
      '<div class="btv-person"><h3>' + theirs + '’s answers</h3><p>' + (box(me) && box(me).m && box(me).m[k] ? 'Opened and kept with your answers' : 'Their check-in card opens here') + '</p></div></div>' +
      (dn ? '<div class="ff-row">' + btn('round-card', 'Make a Card for ' + theirs, { k: k, cls: 'btn-secondary' }) + btn('round-read', 'Read Them Side by Side', { k: k, cls: 'btn-secondary' }) + '</div>' : '') +
      '<div class="btv-paste"><label class="ff-f"><span class="l">Got a check-in link from ' + theirs + '?</span><input id="gm-mpaste" autocomplete="off" placeholder="Paste the link"></label><div class="ff-row">' + btn('mpaste', 'Open This Check-in', sec()) + '</div></div>';
  }
  function vAfter() {
    if (!AF) return SAMPLE ? '<div class="ff-card gold"><h2>After the Vows</h2><p>In Heartwood, After the Vows opens on your wedding day, with Practices for Two, a Monthly Check-in for Two, and your First-Year Check-in.</p></div>' + (PR ? '<div class="ff-card sage"><h2>' + esc(PR.title) + '</h2>' + (PR.lead ? '<p class="ff-sub">' + esc(PR.lead) + '</p>' : '') + '<div class="ff-row">' + btn('pr', 'Open Practices for Two', sec()) + '</div></div>' : '') : '<div class="ff-card"><p>After the Vows is on its way.</p></div>';
    var h = '';
    if (!afterOpen()) {
      h += '<div class="ff-card gold"><h2>After the Vows</h2><p>' + esc(AF.opens) + '</p>' + (setup() && st.s.wd ? '<p class="btv-small">Your wedding date on this device: ' + esc(niceDate(st.s.wd)) + '.</p>' : '') +
        (setup() ? '<div class="ff-row">' + btn('married', 'We’re Married') + btn('setup', 'Set Your Wedding Date', sec()) + '</div>' : '<div class="ff-row">' + btn('start', 'Get Started') + '</div>') + '</div>';
      if (PR) h += '<div class="ff-card sage"><h2>' + esc(PR.title) + '</h2>' + (PR.lead ? '<p class="ff-sub">' + esc(PR.lead) + '</p>' : '') + '<div class="ff-row">' + btn('pr', 'Open Practices for Two', sec()) + '</div></div>';
      return h + tgHtml();
    }
    var k = monthKey(), M = AF.monthly, Y = AF.firstYear;
    h += '<div class="ff-card gold"><h2>After the Vows</h2>' + (AF.lead ? '<p>' + esc(AF.lead) + '</p>' : '') + '</div>';
    if (PR) h += '<div class="ff-card sage"><h2>' + esc(PR.title) + '</h2>' + (PR.lead ? '<p class="ff-sub">' + esc(PR.lead) + '</p>' : '') + '<div class="ff-row">' + btn('pr', 'Open Practices for Two', sec()) + '</div></div>';
    h += '<div class="ff-card"><h2>' + esc(M.title) + '</h2>' + (M.lead ? '<p class="ff-sub">' + esc(M.lead) + '</p>' : '') + '<p class="btv-k">' + esc(monthName(k)) + '</p>' + roundStatus(k);
    var past = {}; ['a', 'b'].forEach(function (w) { var b = box(w); if (b && b.r) Object.keys(b.r).forEach(function (x) { if (x !== 'fy' && x !== k) past[x] = 1; }); });
    var pk = Object.keys(past).sort().reverse();
    if (pk.length) h += '<details class="btv-more"><summary>Earlier Months (' + pk.length + ')</summary><div class="ff-row">' + pk.map(function (x) { return btn('round-read', esc(monthName(x)), { k: x, cls: 'btn-secondary ff-sm' }); }).join('') + '</div></details>';
    h += '</div>';
    h += '<div class="ff-card"><h2>' + esc(Y.title) + '</h2>' + (Y.lead ? '<p class="ff-sub">' + esc(Y.lead) + '</p>' : '') + roundStatus('fy') +
      '<div class="btv-note"><p>' + esc(Y.invite) + '</p><a class="btn btn-primary ff-sm" href="/contact.html#plan=Premarital%20Sessions">Book Your First-Year Check-in</a></div></div>';
    return h + tgHtml();
  }
  function vRound() {
    var w = V.who, k = V.rk, R = roundOf(k), d = dataOf(w), e = d.mo[k] || { r: {} };
    return '<div class="ff-card"><div class="btv-prog"><span>' + esc(nm(w)) + ' &middot; ' + esc(monthName(k)) + '</span><span>Just for you, until you share</span></div><h2>' + esc(R.title) + '</h2>' + (R.lead ? '<p class="ff-sub">' + esc(R.lead) + '</p>' : '') +
      roundQs(k).map(function (q) { return '<label class="ff-f"><span class="h gm-qq">' + esc(q.text) + '</span><textarea data-mo="' + esc(q.id) + '" rows="3" maxlength="600">' + esc((e.r || {})[q.id] || '') + '</textarea></label>'; }).join('') +
      '<div class="ff-row btv-nav">' + btn('round-done', 'Done') + btn('round-away', 'Lock and Step Away', sec()) + '</div></div>';
  }
  function vRoundRead() {
    var k = V.rk, R = roundOf(k), qs = roundQs(k), cols;
    if (oneDevice()) cols = [[nm('a'), (dataOf('a').mo[k] || {}).r || {}], [nm('b'), (dataOf('b').mo[k] || {}).r || {}]];
    else { var me = st.s.me, d = dataOf(me), p = d.mp[k]; cols = [[nm(me), (d.mo[k] || {}).r || {}], [p ? p.n : nm(other(me)), p ? p.r : null]]; }
    return '<div class="ff-card gold"><h2>' + esc(R.title) + '</h2><p class="ff-sub">' + esc(monthName(k)) + '</p><div class="ff-row">' + btn('leave-after', 'Lock and Close', sec()) + '</div></div>' +
      qs.map(function (q) {
        return '<section class="ff-card"><h3 class="gm-qh">' + esc(q.text) + '</h3><div class="btv-who">' + cols.map(function (c) {
          var t = c[1] ? String(c[1][q.id] || '').trim() : null;
          return '<div class="btv-person"><h3>' + esc(c[0]) + '</h3><p>' + (t ? esc(t) : t === null ? '<span class="btv-small">Their check-in card is not here yet.</span>' : '<span class="btv-small">Left blank.</span>') + '</p></div>'; }).join('') + '</div></section>';
      }).join('') + (R.close ? '<div class="ff-card sage"><p>' + esc(R.close) + '</p></div>' : '') +
      (k === 'fy' && AF.firstYear.invite ? '<div class="ff-card"><p>' + esc(AF.firstYear.invite) + '</p><div class="ff-row"><a class="btn btn-primary ff-sm" href="/contact.html#plan=Premarital%20Sessions">Book Your First-Year Check-in</a></div></div>' : '');
  }
  function vMCard(code) {
    var theirs = esc(nm(other(st.s.me)));
    return cardView(mlink(code), 'Your Check-in for ' + theirs, theirs + ' scans this with their phone’s camera, or opens the link, then types your shared word.',
      'The card carries your first names and your check-in answers, locked with your shared word.', 'QR code for your check-in card', 'm');
  }

  /* ---------- Your Tree, Then Your Grove (GM_TOGETHER), and the invites ---------- */
  var APP_LINKS = { '/birch/': 'Open Birch', '/oak/': 'Open Oak', '/grove/': 'Open The Grove' };
  function siteBase() { return /^https?:$/.test(location.protocol) ? location.origin : 'https://growwithgrounded.com'; }
  function safeLink(u) { u = String(u || ''); return /^\/[A-Za-z0-9/_#.?=&-]*$/.test(u) || /^https:\/\/growwithgrounded\.com\//.test(u) ? u : ''; }
  function coupleFw() {
    var s = setup(); if (!s) return { faith: false, plain: true, groups: [] };
    var ws = ['a', 'b'], f = ws.filter(function (w) { return s.fwp[w] === 'faith'; });
    var groups = []; f.forEach(function (w) { var it = faithItem(s.fb[w]); if (it && known(s.fb[w]) && groups.indexOf(it.group) < 0) groups.push(it.group); });
    return { faith: f.length > 0, plain: f.length < 2, groups: groups };
  }
  // A practice's Faith line: each partner's own tradition's line (faithBy, keyed by the faith.js group) when that
  // partner chose Faith wording and a background, or else the general Faith line.
  function tgFaith(p, fw) {
    var by = p.faithBy && typeof p.faithBy === 'object' ? p.faithBy : {}, out = [];
    fw.groups.forEach(function (g) { if (typeof by[g] === 'string' && out.indexOf(by[g]) < 0) out.push(by[g]); });
    if (!out.length && typeof p.faith === 'string' && p.faith) out.push(p.faith);
    return out;
  }
  function tgPractice(p, fw) {
    var meta = [p.when, p.time].filter(function (t) { return t && typeof t === 'string'; }).map(esc).join(' &middot; ');
    var faith = fw.faith ? tgFaith(p, fw) : [], plain = typeof p.plain === 'string' ? p.plain : '';
    var body = '';
    if (faith.length && fw.plain && plain) body = '<p><b>Plain:</b> ' + esc(plain) + '</p>' + faith.map(function (l) { return '<p class="gm-faith"><b>Faith:</b> ' + esc(l) + '</p>'; }).join('');
    else if (faith.length) body = faith.map(function (l) { return '<p class="gm-faith">' + esc(l) + '</p>'; }).join('');
    else body = plain ? '<p>' + esc(plain) + '</p>' : '';
    return '<li><b>' + esc(p.title || '') + '</b>' + (meta ? '<small>' + meta + '</small>' : '') + body + '</li>';
  }
  function tgHtml() {
    var T = TG || {}, steps = Array.isArray(T.steps) ? T.steps.filter(function (x) { return x && x.title; }) : [];
    var prs = Array.isArray(T.practices) ? T.practices.filter(function (x) { return x && x.title; }) : [];
    var s = setup(), A = s ? nm('a') : '', B = s ? nm('b') : '';
    var h = '<div class="ff-card gm-tg" id="gm-tg"><h2>' + esc(T.title || 'Your Tree, Then Your Grove') + '</h2>' +
      '<p class="ff-sub">' + esc(T.lead || 'Each of you grows a Tree of your own, and then the two of you grow a Grove together.') + '</p>';
    if (steps.length) h += '<ol class="gm-tg-steps">' + steps.map(function (x) {
      var ls = (Array.isArray(x.links) ? x.links : []).map(function (k) { return k && { href: safeLink(k.href), label: k.label }; }).filter(function (k) { return k && k.href && k.label; });
      var l = safeLink(x.link); if (l && !ls.some(function (k) { return k.href === l; })) ls.push({ href: l, label: APP_LINKS[l] || 'Open' });
      return '<li><b>' + esc(x.title) + '</b>' + (x.text ? '<p>' + esc(x.text) + '</p>' : '') + (ls.length ? '<p>' + ls.map(function (k) { return '<a href="' + esc(k.href) + '">' + esc(k.label) + '</a>'; }).join(' &middot; ') + '</p>' : '') + '</li>';
    }).join('') + '</ol>';
    // the invites: each partner onto their own Tree (Birch or Oak, by age), and the two of them into a Grove
    var person = function (w, name) {
      return '<div class="btv-person"><h3>' + esc(name ? name + '’s Tree' : (w === 'a' ? 'The First Tree' : 'The Second Tree')) + '</h3><p>Birch is for ages 18 to 26, and Oak for ages 26 to 60. Choose the one that fits' + (name ? ' ' + esc(name) : '') + '.</p>' +
        '<div class="ff-links"><a href="/birch/">Birch, Ages 18 to 26</a><a href="/oak/">Oak, Ages 26 to 60</a></div>' +
        '<div class="ff-row">' + btn('invite', 'Copy ' + (name ? esc(name) + '’s' : 'an') + ' Invite', { to: w, cls: 'btn-secondary ff-sm' }) + '</div></div>';
    };
    h += '<div class="gm-inv"><h3>Your Invites</h3><p class="btv-small">Each Tree lives on its own device, behind its own lock, so each of you grows at your own pace.</p>' +
      '<div class="btv-who">' + person('a', A) + person('b', B) + '</div>' +
      '<div class="btv-note"><p><b>Your Grove, Together</b><br>When you each have a Tree, start a Grove, where your two trees stand side by side.</p><div class="ff-row"><a class="btn btn-primary ff-sm" href="/grove/">Open The Grove</a>' + btn('invite', 'Copy a Grove Invite', { to: 'grove', cls: 'btn-secondary ff-sm' }) + '</div></div>' +
      '<p class="ff-status" id="gm-invst" role="status" aria-live="polite"></p></div>';
    if (prs.length) {
      var fw = coupleFw();
      h += '<details class="btv-more gm-prs"><summary>Family Practices (' + prs.length + ')</summary>' + (fw.faith ? '' : '<p class="btv-small">Shown in Plain wording. Choose Faith wording in your check-in to see the Faith version.</p>') +
        '<ul>' + prs.map(function (p) { return tgPractice(p, fw); }).join('') + '</ul></details>';
    }
    return h + srcLine(T.sources) + '</div>';
  }
  function copyText(t, done) {
    var fail = function () { var a = document.createElement('textarea'); a.value = t; a.setAttribute('readonly', ''); a.style.position = 'fixed'; a.style.opacity = '0'; document.body.appendChild(a); a.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (e) {} a.remove(); done(ok); };
    try { if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(t).then(function () { done(true); }, fail); return; } } catch (e) {}
    fail();
  }
  function copyInvite(to) {
    var base = siteBase(), name = to === 'a' || to === 'b' ? nm(to) : '', t;
    if (to === 'grove') t = 'Let’s grow a Grove together, where our two trees stand side by side: ' + base + '/grove/';
    else t = (name ? name + ', here' : 'Here') + ' is a Tree of your own from Grow With Grounded. Birch is for ages 18 to 26: ' + base + '/birch/ and Oak is for ages 26 to 60: ' + base + '/oak/ Everything stays on your own device.';
    copyText(t, function (ok) { var el = $('gm-invst'); if (el) el.textContent = ok ? 'Invite copied. Paste it in a message.' : 'Copy did not work here. ' + t; });
  }

  /* ---------- the Week Card (GMCore.week) ---------- */
  var WEEK_HERE = 'This link is a Week Card for your leaders. They paste it into their Field Guide, and you type your shared word there.';
  function weekHash(start) {
    var h = location.hash || ''; if (!/(?:^|[#&?])gmw=w1\./.test(h)) return false;
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    if (!start) say(WEEK_HERE);
    return true;
  }
  function weekWho() { return !setup() ? [] : oneDevice() ? ['a', 'b'] : [st.s.me]; }
  function weekReady() { var ws = weekWho(); return ws.length && ws.every(function (w) { return !!DATA[w]; }); }
  function weekHub() {
    var two = !oneDevice();
    return '<div class="ff-card gm-wk"><h2>The Week Card</h2><p class="ff-sub">Before each session, you can choose to share a short card with your leaders: the videos you watched, the practices you tried, any workbook answers you marked Share With Our Leaders, and one question you want to talk about.</p>' +
      '<p class="btv-small">It is your choice, and it is locked with your shared word. You open it with your leaders at your session' + (two ? ', and each of you can make one from your own device' : '') + '.</p>' +
      '<div class="ff-row">' + btn('week', 'Make a Week Card', { cls: 'btn-primary ff-sm' }) + '</div></div>';
  }
  function wbText(ex, e) {
    var out = [], t = e.t || [];
    if (ex.kind === 'choose' && e.c !== '' && e.c != null && ex.choices && ex.choices[+e.c]) out.push(ex.choices[+e.c]);
    t.forEach(function (x, k) { x = String(x || '').trim(); if (!x) return; var pr = (ex.kind === 'write' || ex.kind === 'list') && ex.prompts && ex.prompts[k]; out.push(pr ? pr + '\n' + x : x); });
    return out.join('\n');
  }
  function weekItems() {
    var L = learnData(), D = lload(), since = new Date(Date.now() - 14 * 864e5), cut = since.getFullYear() + '-' + ('0' + (since.getMonth() + 1)).slice(-2) + '-' + ('0' + since.getDate()).slice(-2);
    var vids = []; if (L) L.tracks.forEach(function (tr) { tr.lessons.forEach(function (l) { if (D.done[l.id]) vids.push({ id: l.id, title: l.title, on: String(D.done[l.id]) >= cut }); }); });
    var prs = []; (PR ? PR.items : []).forEach(function (p) { prs.push({ id: 'p-' + p.id, title: p.title }); });
    ((TG && Array.isArray(TG.practices)) ? TG.practices : []).forEach(function (p) { if (p && p.title && p.id) prs.push({ id: 't-' + p.id, title: p.title }); });
    var wbs = []; weekWho().forEach(function (w) { (WB ? WB.chapters : []).forEach(function (ch) { ch.exercises.forEach(function (ex) { var e = DATA[w].wb[ex.id]; if (e && e.ld && hasWords(e)) wbs.push({ id: w + '-' + ex.id, w: nm(w), t: ex.title, a: wbText(ex, e) }); }); }); });
    return { vids: vids, prs: prs, wbs: wbs };
  }
  function vWeek() {
    var I = weekItems(), two = !oneDevice();
    var row = function (kind, it, checked, small) { return '<label><input type="checkbox" data-wk="' + kind + '" value="' + esc(it.id) + '"' + (checked ? ' checked' : '') + '><span>' + esc(it.title || it.t) + (small ? '<small>' + small + '</small>' : '') + '</span></label>'; };
    var sel = '<option value="">Our next session</option>' + [1, 2, 3, 4, 5, 6].map(function (n) { return '<option value="' + n + '">Session ' + n + '</option>'; }).join('') + [1, 2, 3].map(function (n) { return '<option value="e' + n + '">Essentials Session ' + n + '</option>'; }).join('');
    return '<div class="ff-card gm-wk"><h2>Make a Week Card</h2><p class="ff-sub">Choose what to share with your leaders this week. Only what you check goes on the card.</p>' +
      '<div class="ff-grid"><label class="ff-f"><span class="l">For which session?</span><select id="gm-wk-s">' + sel + '</select></label></div>' +
      '<h3>Videos You Watched</h3>' + (I.vids.length ? '<div class="gm-wk-list">' + I.vids.map(function (v) { return row('vid', v, v.on); }).join('') + '</div>' : '<p class="btv-small">Videos you finish in Learn show here.</p>') +
      '<h3>Practices You Tried</h3>' + (I.prs.length ? '<div class="gm-wk-list">' + I.prs.map(function (p) { return row('pr', p, false); }).join('') + '</div>' : '<p class="btv-small">Practices for Two show here.</p>') +
      '<h3>From The Couple Workbook</h3>' + (I.wbs.length ? '<div class="gm-wk-list">' + I.wbs.map(function (x) { return row('wb', x, true, esc(x.w) + ': ' + esc(x.a.length > 140 ? x.a.slice(0, 140) + '...' : x.a)); }).join('') + '</div>'
        : '<p class="btv-small">In The Couple Workbook, choose Share With Our Leaders on any exercise you would like to bring' + (two ? ' from your own answers' : '') + '.</p>') +
      '<h3>One Question</h3><label class="ff-f"><span class="h">One question you want to talk about at your session, if you like.</span><textarea id="gm-wk-q" rows="2" maxlength="500"></textarea></label>' +
      '<label class="gm-check"><input type="checkbox" id="gm-wk-yes"><span>' + (two ? 'I say yes to sharing this card with our leaders.' : 'We both say yes to sharing this card with our leaders.') + '</span></label>' +
      '<div class="ff-row">' + btn('wk-make', 'Lock and Make the Card') + btn('leave-talk', 'Lock and Close', sec()) + '<span class="ff-status" id="gm-wkst" role="status" aria-live="polite"></span></div>' +
      '<p class="btv-small">Nothing is sent anywhere. The card rides in a link you bring to your leaders, and it opens only with your shared word.</p></div>';
  }
  function makeWeek() {
    var msg = $('gm-wkst'), W = C.week;
    if (!W) { if (msg) msg.textContent = 'The Week Card could not load. Refresh the page and try again.'; return; }
    if (!($('gm-wk-yes') || {}).checked) { if (msg) msg.textContent = 'Check the yes box first. Sharing is always your choice.'; return; }
    var I = weekItems(), on = function (kind) { return Array.prototype.filter.call(document.querySelectorAll('[data-wk="' + kind + '"]'), function (x) { return x.checked; }).map(function (x) { return x.value; }); };
    var pick = function (list, ids) { return list.filter(function (x) { return ids.indexOf(x.id) >= 0; }); };
    var ws = weekWho(), card = { v: 1, m: oneDevice() ? 'one' : 'two', s: ($('gm-wk-s') || {}).value || '', n: nm(ws[0]), to: oneDevice() ? nm('b') : nm(other(st.s.me)), on: today(),
      vid: pick(I.vids, on('vid')).map(function (x) { return x.title; }), pr: pick(I.prs, on('pr')).map(function (x) { return x.title; }),
      wb: pick(I.wbs, on('wb')).map(function (x) { return { w: x.w, t: x.t, a: x.a.slice(0, W.LIM.ans) }; }).slice(0, W.LIM.wb), q: String(($('gm-wk-q') || {}).value || '').trim().slice(0, W.LIM.q) };
    if (!card.vid.length && !card.pr.length && !card.wb.length && !card.q) { if (msg) msg.textContent = 'Choose at least one thing to share, or write your question.'; return; }
    ask({ title: 'Choose a shared word', lead: 'The Week Card is locked with a word or short phrase only the two of you know. At your session, you type it into your leaders’ Field Guide to open the card. Capital letters do not matter.', fields: ['Shared word', 'Shared word again'], ok: 'Make the Card',
      check: function (v) { return v[0].trim().length < 4 ? 'Use at least 4 letters. Longer is safer.' : v[0].trim().toLowerCase() !== v[1].trim().toLowerCase() ? 'The two words are different.' : ''; } })
      .then(function (v) { if (!v) return; return W.make(card, v[0]).then(function (code) { go('wcard', { code: code }); }); })
      .catch(function () { if (msg) msg.textContent = 'The card could not be made. Try again.'; });
  }
  function vWCard(code) {
    return cardView(C.week.link(code), 'Your Week Card', 'Send this link to your leaders, or bring it to your session. There, you type your shared word into their Field Guide to open it.',
      'The card carries your first names, the videos, practices, and workbook answers you chose, and your question, locked with your shared word. Nothing else from the app goes on it.', 'QR code for your Week Card', 'week');
  }

  /* ---------- render ---------- */
  var BEFORE_VIEWS = { hub: 1, answer: 1, safety: 1, safehelp: 1, handoff: 1, card: 1, talk: 1, results: 1, wb: 1, wbch: 1, wbread: 1, money: 1, week: 1, wcard: 1 };
  function render() {
    var el = $('gm-app'); if (!el) return;
    if (!subtle) { el.innerHTML = '<div class="ff-card"><p>This browser cannot lock answers. Try a current version of Safari, Chrome, Edge, or Firefox.</p></div>'; return; }
    var v = V.view, h;
    var needOne = { answer: 1, safety: 1, safehelp: 1, wb: 1, wbch: 1, money: 1, round: 1 };
    if (needOne[v] && !DATA[V.who]) v = V.view = setup() ? (V.side === 'after' ? 'after' : 'hub') : 'welcome';
    if (v === 'talk' || v === 'results' || v === 'wbread' || v === 'roundread') {
      try { h = v === 'talk' ? vTalk() : v === 'results' ? vResults() : v === 'wbread' ? vWbRead() : vRoundRead(); } catch (e) { v = V.view = V.side === 'after' ? 'after' : 'hub'; h = null; }
    }
    if (!h && v !== 'welcome' && v !== 'setup' && v !== 'after' && v !== 'pr' && v !== 'prone' && !setup()) v = V.view = 'welcome';
    if (h) { /* already made above */ }
    else if (v === 'welcome') h = vWelcome();
    else if (v === 'setup') h = vSetup();
    else if (v === 'hub') h = vHub();
    else if (v === 'answer') h = vAnswer();
    else if (v === 'safety') h = vSafety();
    else if (v === 'safehelp') h = vSafeHelp();
    else if (v === 'handoff') h = vHandoff();
    else if (v === 'card') h = vCard(V.code);
    else if (v === 'wb') h = vWbList();
    else if (v === 'wbch') h = vWbCh();
    else if (v === 'money') h = vMoney();
    else if (v === 'pr') h = vPr();
    else if (v === 'prone') h = vPrOne();
    else if (v === 'after') h = vAfter();
    else if (v === 'round') h = vRound();
    else if (v === 'mcard') h = vMCard(V.code);
    else if (v === 'week') h = weekReady() ? vWeek() : (V.view = 'hub', vHub());
    else if (v === 'wcard') h = vWCard(V.code);
    else h = vWelcome();
    el.innerHTML = '<p class="btv-say" id="btv-say" role="status" aria-live="polite"></p>' + h;
    tabMark();
    var hp = $('btv-help'); if (hp) hp.focus();
  }
  function go(view, extra) { V.view = view; if (extra) for (var k in extra) V[k] = extra[k]; if (BEFORE_VIEWS[view]) V.side = 'before'; if (view === 'after' || view === 'round' || view === 'roundread' || view === 'mcard') V.side = 'after'; render(); top(); }
  function home() { return V.side === 'after' ? 'after' : (setup() ? 'hub' : 'welcome'); }

  /* ---------- actions ---------- */
  function finish() {
    var w = V.who; SAFE = {};
    st.p[w].done = true;
    return save(w).then(function () { delete KEYS[w]; delete DATA[w]; go('handoff'); });
  }
  // Talk About This and Strengths and Growing Edges both need both sets of answers open.
  function startTalk(view) {
    var s = st.s;
    if (s.mode === 'one') {
      return unlockBoth('Each of you types your own passcode to open ' + (view === 'results' ? 'your Strengths and Growing Edges.' : 'Talk About This.'))
        .then(function (ok) { if (ok) go(view); else { lockAll(); render(); } });
    }
    var me = s.me;
    return unlock(me).then(function (ok) {
      if (!ok) return;
      if (PARTNER_IN && !DATA[me].partner) { DATA[me].partner = PARTNER_IN; PARTNER_IN = null; st.p[me].got = 1; save(me).then(dropPending); }
      if (!DATA[me].partner) { var pc = pendingCard(); if (pc) return openCard(pc); say('Open ' + nm(other(me)) + '’s card first: scan their QR code, or paste their link below.'); render(); var p = $('btv-paste'); if (p) p.focus(); return; }
      go(view);
    });
  }
  function saveSetup() {
    var locked = st && st.p && (st.p.a || st.p.b), msg = $('btv-st');
    var fa = $('gm-fb-a') ? $('gm-fb-a').value : '', fbb = $('gm-fb-b') ? $('gm-fb-b').value : '';
    var wd = $('gm-wd') ? $('gm-wd').value : '', wed = $('gm-wed') && $('gm-wed').checked ? 1 : 0;
    if (wd && !/^\d{4}-\d{2}-\d{2}$/.test(wd)) wd = '';
    if (!locked) {
      var na = fname($('btv-na').value), nb = fname($('btv-nb').value), mode = (document.querySelector('input[name="btv-mode"]:checked') || {}).value || 'one', me = (document.querySelector('input[name="btv-me"]:checked') || {}).value || 'a';
      if (!na || !nb) { msg.textContent = 'Add both first names.'; return; }
      if (na.toLowerCase() === nb.toLowerCase()) { msg.textContent = 'Use two different names, so each of you knows which turn is yours.'; return; }
      var keep = st && st.inCard, keepM = st && st.inM, fwp = (st && st.s && st.s.fwp) || { a: '', b: '' };
      st = { v: 2, s: { a: na, b: nb, mode: mode, me: mode === 'two' ? me : 'a', fb: { a: '', b: '' }, fwp: fwp }, p: {} }; if (keep) st.inCard = keep; if (keepM) st.inM = keepM;
    }
    st.s.fb = { a: faithItem(fa) ? fa : '', b: faithItem(fbb) ? fbb : '' };
    st.s.wd = wd; st.s.wed = wed;
    persist(); go('hub');
  }
  function exById(id) { var f = null; (WB ? WB.chapters : []).forEach(function (ch) { ch.exercises.forEach(function (ex) { if (ex.id === id) f = ex; }); }); return f; }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-act]'); if (!b || !$('gm-app') || !$('gm-app').contains(b) && !b.closest('.btv-clear')) return;
    var a = b.getAttribute('data-act'), w = b.getAttribute('data-w'), k = b.getAttribute('data-k');
    if (a === 'copy-mail') { var box = b.closest('.gm-mailcopy'), ta = box && box.querySelector('textarea'), cs = box && box.querySelector('.gm-cpst'); if (ta) copyText(ta.value, function (ok) { if (cs) cs.textContent = ok ? 'Copied. Paste it into a new email to ' + GG_MAIL + '.' : 'Select the text above and copy it.'; if (!ok) { ta.focus(); ta.select(); } }); return; }
    if (a === 'start') go(setup() ? 'hub' : 'setup');
    else if (a === 'welcome') go(setup() ? home() : 'welcome');
    else if (a === 'setup') go('setup');
    else if (a === 'hub') { saveAll().then(function () { lockAll(); go('hub'); }); }
    else if (a === 'after') { saveAll().then(function () { lockAll(); go('after'); }); }
    else if (a === 'setup-save') saveSetup();
    else if (a === 'answer' || a === 'answer-two') {
      lockAll();
      unlock(w).then(function (ok) {
        if (!ok) return; var d = DATA[w], n = areasFor().length;
        if (a === 'answer-two') { st.p[w].done = false; persist(); return go('answer', { who: w, area: AREAS.length }); }
        var at = Math.max(0, Math.min(+d.at || 0, n)); go(at >= n ? 'safety' : 'answer', { who: w, area: Math.min(at, n - 1) });
      });
    }
    else if (a === 'pick') {
      var d = DATA[V.who]; if (!d) return; var q = b.getAttribute('data-q'), v = +b.getAttribute('data-v');
      if (d.ans[q] === v) delete d.ans[q]; else d.ans[q] = v;
      Array.prototype.forEach.call(b.parentNode.children, function (x) { x.setAttribute('aria-pressed', String(+x.getAttribute('data-v') === d.ans[q])); });
      var c = $('btv-cnt'), ar = areasFor()[V.area]; if (c) c.textContent = countIn(d, ar.id) + ' of ' + qsIn(ar.id).length + ' answered';
      saveSoon(V.who);
    }
    else if (a === 'fw') { var d2 = DATA[V.who]; d2.fw = b.getAttribute('data-v'); st.s.fwp[V.who] = d2.fw; persist(); saveSoon(V.who); render(); var f = document.querySelector('.btv-q button'); if (f) f.focus(); }
    else if (a === 'next') {
      var d3 = DATA[V.who], n = areasFor().length;
      if (V.area < n - 1) { d3.at = V.area + 1; saveSoon(V.who); go('answer', { area: V.area + 1 }); }
      else { d3.at = n; saveSoon(V.who); SAFE = {}; go('safety'); }
    }
    else if (a === 'prev') {
      if (V.view === 'safety') { SAFE = {}; go('answer', { area: areasFor().length - 1 }); }
      else if (V.area > 0) { DATA[V.who].at = V.area - 1; saveSoon(V.who); go('answer', { area: V.area - 1 }); }
      else { save(V.who); lockAll(); go('hub'); }
    }
    else if (a === 'away') { save(V.who).then(function () { lockAll(); go('hub'); say('Your answers are locked. Come back any time with your passcode.'); }); }
    else if (a === 'safe') { SAFE[b.getAttribute('data-s')] = b.getAttribute('data-v'); Array.prototype.forEach.call(b.parentNode.children, function (x) { x.setAttribute('aria-pressed', String(x === b)); }); }
    else if (a === 'finish') {
      var yes = Object.keys(SAFE).some(function (x) { return SAFE[x] === 'y'; });
      if (yes) { SAFE = {}; go('safehelp'); } else finish();
    }
    else if (a === 'safe-done') finish();
    else if (a === 'talk') startTalk('talk');
    else if (a === 'results') startTalk('results');
    else if (a === 'results-open') go('results');
    else if (a === 'talk-open') go('talk');
    else if (a === 'leave-talk') { saveAll().then(function () { lockAll(); go('hub'); say('Locked. Each passcode opens it again.'); }); }
    else if (a === 'print') printTalk();
    else if (a === 'print-results') printResults();
    else if (a === 'make-card') {
      var me = st.s.me;
      unlock(me).then(function (ok) {
        if (!ok) return;
        return wordAsk(nm(other(me)), 'card').then(function (v) { if (!v) return; return C.card.make(cardData(me), v[0]).then(function (code) { go('card', { code: code }); }); });
      });
    }
    else if (a === 'copy') {
      var inp = $('btv-link'), cst = $('btv-cst'), t = inp ? inp.value : '';
      var ok = function () { if (cst) cst.textContent = 'Link copied.'; }, old = function () { try { inp.select(); document.execCommand('copy'); ok(); } catch (er) { if (cst) cst.textContent = 'Select the link and copy it by hand.'; } };
      try { if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(t).then(ok, old); return; } } catch (er) {}
      old();
    }
    else if (a === 'paste') { var c2 = C.card.codeOf($('btv-paste').value); if (!c2) { say('That link is not a Heartwood card. Copy the whole link and try again.'); return; } openCard(c2); }
    else if (a === 'open-pending') { var pc = pendingCard(); if (pc) openCard(pc); }
    /* the workbook */
    else if (a === 'wb') { lockAll(); unlock(w).then(function (ok) { if (ok) { dataOf(w); go('wb', { who: w }); } }); }
    else if (a === 'wb-ch') go('wbch', { ch: +b.getAttribute('data-i') });
    else if (a === 'wb-list') { save(V.who); go('wb'); }
    else if (a === 'wb-away') { save(V.who).then(function () { lockAll(); go('hub'); say('Your workbook is locked. Come back any time with your passcode.'); }); }
    else if (a === 'wb-print') printWorkbook(w && DATA[w] ? w : null, false);
    else if (a === 'wb-print-mine') { if (DATA[w]) { save(w); printWorkbook(w, true); } }
    else if (a === 'wb-read') { lockAll(); unlockBoth('Each of you types your own passcode to read together.').then(function (ok) { if (ok) { dataOf('a'); dataOf('b'); go('wbread'); } else { lockAll(); render(); } }); }
    /* the Money Map */
    else if (a === 'money') { lockAll(); unlock(w).then(function (ok) { if (!ok) return; if (!st.s.mk) { st.s.mk = w; persist(); } go('money', { who: w }); }); }
    else if (a === 'money-save') { save(V.who).then(function () { var m = $('gm-mst'); if (m) m.textContent = 'Saved and locked on this device.'; }); }
    else if (a === 'money-print') { save(V.who); printMoney(); }
    else if (a === 'money-close') { save(V.who).then(function () { lockAll(); go('hub'); say('The Money Map is locked.'); }); }
    /* Practices for Two */
    else if (a === 'pr' || a === 'pr-one') { if (V.view !== 'pr' && V.view !== 'prone') V.prBack = V.view; if (a === 'pr') go('pr'); else go('prone', { pid: b.getAttribute('data-id') }); }
    else if (a === 'pr-back') { var back = V.prBack || home(); V.prBack = ''; if ((back === 'wbch' || back === 'wb') && !DATA[V.who]) back = 'hub'; go(back); }
    /* After the Vows */
    else if (a === 'married') { st.s.wed = 1; persist(); go('after'); say('Congratulations. After the Vows is open.'); }
    else if (a === 'round') { lockAll(); unlock(w).then(function (ok) { if (ok) { dataOf(w); go('round', { who: w, rk: k }); } }); }
    else if (a === 'round-done') {
      var dd = dataOf(V.who), rr = {};
      Array.prototype.forEach.call(document.querySelectorAll('[data-mo]'), function (x) { rr[x.getAttribute('data-mo')] = x.value.slice(0, 600); });
      dd.mo[V.rk] = { r: rr, done: 1 }; markDone(V.who, V.rk);
      var wasK = V.rk, ww = V.who;
      save(ww).then(function () { lockAll(); go('after'); say('Thank you, ' + nm(ww) + '. Your answers are locked.'); if (oneDevice() && rdone(other(ww), wasK)) say('You have both answered. Sit together and read them side by side.'); });
    }
    else if (a === 'round-away') { save(V.who).then(function () { lockAll(); go('after'); }); }
    else if (a === 'round-read') {
      var rk = k; lockAll();
      if (oneDevice()) unlockBoth('Each of you types your own passcode to read your check-ins side by side.').then(function (ok) { if (ok) go('roundread', { rk: rk }); else { lockAll(); render(); } });
      else unlock(st.s.me).then(function (ok) { if (ok) go('roundread', { rk: rk }); });
    }
    else if (a === 'round-card') {
      var me2 = st.s.me, rk2 = k;
      unlock(me2).then(function (ok) {
        if (!ok) return; var e2 = dataOf(me2).mo[rk2]; if (!e2) return;
        return wordAsk(nm(other(me2)), 'check-in').then(function (v) { if (!v) return; return mmake({ v: 1, k: rk2, n: nm(me2), to: nm(other(me2)), r: e2.r }, v[0]).then(function (code) { go('mcard', { code: code }); }); });
      });
    }
    else if (a === 'mpaste') { var c3 = mcodeOf($('gm-mpaste').value); if (!c3) { say('That link is not a Heartwood check-in. Copy the whole link and try again.'); return; } openM(c3); }
    else if (a === 'leave-after') { saveAll().then(function () { lockAll(); go('after'); say('Locked. Each passcode opens it again.'); }); }
    /* Your Tree, Then Your Grove: invites */
    else if (a === 'invite') copyInvite(b.getAttribute('data-to'));
    /* the Week Card */
    else if (a === 'week') {
      lockAll();
      var wkOpen = oneDevice() ? unlockBoth('Each of you types your own passcode to make your Week Card together.') : unlock(st.s.me, 'Your Week Card is made from your own answers.');
      wkOpen.then(function (ok) { if (ok) { V.wk = null; go('week'); } else { lockAll(); render(); } });
    }
    else if (a === 'wk-make') makeWeek();
    else if (a === 'clear') {
      if (!window.confirm(SAMPLE ? 'Clear Everything? This removes everything you wrote in the sample from this device. It cannot be undone.' : 'Clear Everything? This removes both of your answers, your workbook, The Money Map, your check-ins, and any card from this device, and Heartwood will ask for your code again. It cannot be undone.')) return;
      try { localStorage.removeItem(KEY); localStorage.removeItem(GMKEY); localStorage.removeItem(OLDKEY); sessionStorage.removeItem(PEND); sessionStorage.removeItem(PENDM); } catch (er) {}
      // Heartwood's key and invite leave this device too, so the code is needed to open it again (GWG BLD 772).
      if (!SAMPLE && window.HWOpen) HWOpen.forget();
      st = null; lockAll(); PARTNER_IN = null; V.side = 'before'; go('welcome'); say('Cleared from this device.');
    }
  });
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.name === 'btv-mode') { var f = $('btv-me-f'); if (f) f.hidden = t.value !== 'two'; }
    if (t.hasAttribute && t.hasAttribute('data-wbsh') && DATA[V.who]) { var ex = exById(t.getAttribute('data-wbsh')); if (ex) { exEntry(DATA[V.who], ex).sh = t.checked ? 1 : 0; saveSoon(V.who); var s = $('gm-wbst'); if (s) s.textContent = t.checked ? 'Your partner can read this one.' : 'This one stays private.'; } }
    if (t.hasAttribute && t.hasAttribute('data-wbld') && DATA[V.who]) { var exl = exById(t.getAttribute('data-wbld')); if (exl) { exEntry(DATA[V.who], exl).ld = t.checked ? 1 : 0; saveSoon(V.who); var sl = $('gm-wbst'); if (sl) sl.textContent = t.checked ? 'This one can go on your Week Card.' : 'This one stays off your Week Card.'; } }
    if (t.hasAttribute && t.hasAttribute('data-wbc') && DATA[V.who]) { var ex2 = exById(t.getAttribute('data-wbc')); if (ex2) { exEntry(DATA[V.who], ex2).c = +t.value; saveSoon(V.who); } }
  });
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.id === 'btv-na' || t.id === 'btv-nb') { var k = t.id === 'btv-na' ? 'a' : 'b', el = $('btv-me-' + k), nmv = fname(t.value) || (k === 'a' ? 'The first partner' : 'The second partner'); if (el) el.textContent = nmv; var fl = $('gm-fl-' + k); if (fl) fl.textContent = (fname(t.value) || (k === 'a' ? 'First partner' : 'Second partner')) + '’s faith background'; }
    if (t.hasAttribute && t.hasAttribute('data-wb') && DATA[V.who]) { var ex = exById(t.getAttribute('data-wb')); if (ex) { var en = exEntry(DATA[V.who], ex); en.t = en.t || []; en.t[+t.getAttribute('data-k')] = t.value.slice(0, 4000); saveSoon(V.who); } }
    if (t.hasAttribute && t.hasAttribute('data-mv') && DATA[V.who]) { mm().v[t.getAttribute('data-mv')] = t.value.slice(0, 20); saveSoon(V.who); var tot = $('gm-tot'); if (tot) tot.outerHTML = totalsHtml(); }
    if (t.hasAttribute && t.hasAttribute('data-mg') && DATA[V.who]) { mm().g[+t.getAttribute('data-mg')] = t.value.slice(0, 2000); saveSoon(V.who); }
    if (t.hasAttribute && t.hasAttribute('data-mo') && DATA[V.who]) { var dm = dataOf(V.who), cur = dm.mo[V.rk] || { r: {} }; cur.r = cur.r || {}; cur.r[t.getAttribute('data-mo')] = t.value.slice(0, 600); dm.mo[V.rk] = cur; saveSoon(V.who); }
  });
  window.addEventListener('pagehide', function () { ['a', 'b'].forEach(function (w) { if (KEYS[w]) save(w); }); });
  window.addEventListener('hashchange', function () {
    if (weekHash()) return;
    if (!takeHash()) return;
    var c = pendingCard(); if (c) { if (setup()) { st.inCard = c; persist(); } openCard(c); return; }
    var m = pendingM(); if (m) openM(m);
  });

  /* ---------- the tabs: Before the Vows, After the Vows, and Learn ---------- */
  function tabMark() {
    var t = $('gm-tabs'); if (!t) return;
    var which = !$('gm-learn').hidden ? 'learn' : V.side;
    Array.prototype.forEach.call(t.querySelectorAll('button'), function (b) { var on = b.getAttribute('data-tab') === which; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
  }
  function tab(which) {
    $('gm-app').hidden = which === 'learn'; $('gm-learn').hidden = which !== 'learn';
    if (which === 'learn') { tabMark(); return learnOpen(); }
    if (CTL) { CTL.stop(); CTL = null; }
    saveAll().then(function () { lockAll(); V.side = which; go(which === 'after' ? 'after' : (setup() ? 'hub' : 'welcome')); });
  }

  /* ---------- Learn (lessons played by shared/gg-learn.js) ---------- */
  function learnData() {
    var L = window.GG_LEARN_GM; if (!L) return null;
    var tracks = Array.isArray(L.tracks) ? L.tracks : Array.isArray(L.lessons) ? [{ id: 'gm-you', title: L.title || 'For You', lessons: L.lessons }] : [];
    tracks = tracks.filter(function (t) { return t && Array.isArray(t.lessons) && t.lessons.length; });
    return tracks.length ? { title: L.title || 'Learn', intro: L.intro || '', tracks: tracks } : null;
  }
  var LKEY = 'gg-learn:hw', CTL = null;
  function lload() {
    try {
      var raw = localStorage.getItem(LKEY);
      // Learn progress from The Grounded Marriage app (gg-learn:gm) or Before the Vows (gg-learn:btv) carries over once.
      ['gg-learn:gm', 'gg-learn:btv'].forEach(function (k) { if (raw) return; raw = localStorage.getItem(k); if (raw) { localStorage.setItem(LKEY, raw); localStorage.removeItem(k); } });
      var d = JSON.parse(raw || '{}'); return { done: d.done || {}, at: d.at || {} };
    } catch (e) { return { done: {}, at: {} }; }
  }
  function lkeep(d) { try { localStorage.setItem(LKEY, JSON.stringify(d)); } catch (e) {} }
  function need(src, test) { return new Promise(function (ok) { if (test()) return ok(); var s = document.createElement('script'); s.src = src; s.onload = s.onerror = function () { ok(); }; document.head.appendChild(s); }); }
  function learnList() {
    if (CTL) { CTL.stop(); CTL = null; }
    var L = learnData(), D = lload(), el = $('gm-learn');
    el.innerHTML = '<div class="ff-card"><h2>' + esc(L.title) + '</h2>' + (L.intro ? '<p class="ff-sub">' + esc(L.intro) + '</p>' : '') + '</div>' +
      (window.GGLearn && GGLearn.voiceCard ? '<div class="btv-voice">' + GGLearn.voiceCard() + '</div>' : '') +
      L.tracks.map(function (t) {
        return '<div class="ff-card"><h3>' + esc(t.title) + '</h3>' + (t.who ? '<p class="ff-sub">' + esc(t.who) + '</p>' : '') + '<div class="btv-lessons">' + t.lessons.map(function (l) {
          return '<button type="button" class="btv-lesson' + (D.done[l.id] ? ' done' : '') + '" data-lesson="' + esc(l.id) + '"><span class="btv-ln">' + (D.done[l.id] ? '&#10003;' : esc(String(l.n || ''))) + '</span><span><b>' + esc(l.title) + '</b>' + (l.blurb ? '<small>' + esc(l.blurb) + '</small>' : '') + (l.mins ? '<small>' + esc(l.mins) + ' min</small>' : '') + '</span></button>';
        }).join('') + '</div></div>';
      }).join('');
  }
  function learnPlay(id) {
    var L = learnData(), f = null; L.tracks.forEach(function (t) { t.lessons.forEach(function (l) { if (l.id === id) f = { t: t, l: l }; }); }); if (!f) return learnList();
    var el = $('gm-learn'), D = lload();
    el.innerHTML = '<button type="button" class="btn btn-secondary ff-sm" data-lback="1">&larr; All Lessons</button><div class="btv-eb">' + esc(f.t.title) + '</div><h2 class="btv-lh">' + esc(f.l.title) + '</h2><div id="gm-player"></div><div class="btv-lsrc">' + (window.GGSources ? GGSources.lesson('', f.l) : '') + '</div>';
    CTL = GGLearn.player($('gm-player'), {
      app: 'gm', lesson: f.l, track: f.t, tracks: L.tracks, done: D.done, at: D.at[f.l.id] || 0, accent: '#3F5F86', mark: { name: 'Heartwood' },
      onAt: function (i) { var d = lload(); d.at[f.l.id] = i; lkeep(d); },
      onDone: function (lid) { var d = lload(); if (!d.done[lid]) { d.done[lid] = today(); lkeep(d); } D.done[lid] = d.done[lid]; },
      open: function (nid) { learnPlay(nid); },
      home: function () { learnList(); }
    });
    el.scrollIntoView({ block: 'start' });
  }
  function learnOpen() {
    saveAll().then(lockAll);
    var el = $('gm-learn');
    if (!learnData()) { el.innerHTML = '<div class="ff-card"><p>The lessons are on their way.</p></div>'; return; }
    el.innerHTML = '<div class="ff-card"><p>One moment...</p></div>';
    need('/read.js?v=vc3', function () { return !!window.GGRead; }).then(function () { return need('/shared/gg-learn.js?v=b780a', function () { return !!window.GGLearn; }); }).then(function () {
      if (window.GGLearn) learnList(); else el.innerHTML = '<div class="ff-card"><p>The lessons could not load. Check the connection and try again.</p></div>';
    });
  }
  function tabsSetup() {
    var t = $('gm-tabs'); if (!t) return;
    t.hidden = false;
    var lb = t.querySelector('[data-tab="learn"]'); if (lb && !learnData()) lb.hidden = true;
    t.addEventListener('click', function (e) { var b = e.target.closest('button[data-tab]'); if (b) tab(b.getAttribute('data-tab')); });
    t.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var bs = Array.prototype.filter.call(t.querySelectorAll('button[data-tab]'), function (b) { return !b.hidden; }), i = bs.indexOf(document.activeElement); if (i < 0) return;
      var n = bs[(i + (e.key === 'ArrowRight' ? 1 : bs.length - 1)) % bs.length]; tab(n.getAttribute('data-tab')); n.focus();
    });
    $('gm-learn').addEventListener('click', function (e) {
      var b = e.target.closest('[data-lesson]'); if (b) return learnPlay(b.getAttribute('data-lesson'));
      if (e.target.closest('[data-lback]')) return learnList();
      var v = e.target.closest('[data-l="vcheck"]'); if (v && window.GGRead && GGRead.check) GGRead.check(function () { learnList(); });
    });
  }

  /* ---------- start ---------- */
  var wk0 = weekHash(true);
  takeHash();
  if (st && st.s) V.view = 'hub';
  var pc0 = pendingCard(), pm0 = pendingM();
  if (pc0 && st && st.s) { st.inCard = pc0; persist(); try { sessionStorage.removeItem(PEND); } catch (e) {} }
  if (pm0 && st && st.s) { st.inM = pm0; persist(); try { sessionStorage.removeItem(PENDM); } catch (e) {} }
  render();
  tabsSetup(); tabMark();
  var src = $('gm-src');
  if (src && window.GGSources && Q.sources && Q.sources.length) src.innerHTML = GGSources.line(Q.sources);
  if (wk0) setTimeout(function () { say(WEEK_HERE); }, 60);
  if (pc0) setTimeout(function () { openCard(pendingCard() || pc0); }, 200);
  else if (pm0) setTimeout(function () { openM(pendingM() || pm0); }, 200);
  window.GGGM = { state: function () { return st; }, view: function () { return V; }, Q: Q, sample: SAMPLE };
})();
