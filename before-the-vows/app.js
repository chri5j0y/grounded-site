/* Before the Vows (GWG BLD 750): a private check-in for two, then a Talk About This list.
   Everything stays on this device. Each partner's answers are locked with that partner's own passcode
   the way the site's other locked data is (PBKDF2, 250,000 rounds, SHA-256, then AES-GCM); the passcode
   never leaves the device and is never stored. Safety answers are never saved at all: they live only
   on the screen of the partner who answered, and never go on a card or a printout.
   Two devices: a card carries one partner's first name, the other's first name, Faith or Plain, and the
   answers as digits, locked with a word only the two of them know, after the # in a link or QR code.
   Questions: before-the-vows/questions.js (window.BTV_Q). Lessons: before-the-vows/learn.js (window.GG_LEARN_BTV). */
(function () {
  'use strict';
  var KEY = 'gg_btv_v1', PEND = 'gg-btv-in', ROUNDS = 250000;
  var subtle = window.crypto && crypto.subtle, enc = new TextEncoder(), dec = new TextDecoder();

  /* ---------- the questions (a small built-in set until questions.js is here) ---------- */
  var FALLBACK = {
    version: 0,
    areas: [
      { id: 'communication', name: 'Communication', lead: 'How the two of you talk, listen, and understand each other.' },
      { id: 'faith', name: 'Faith and Meaning', lead: 'What gives your life meaning, and how you want it to shape your home.', faith: true }
    ],
    scale: [[1, 'Strongly disagree'], [2, 'Disagree'], [3, 'Not sure'], [4, 'Agree'], [5, 'Strongly agree']],
    questions: [
      { id: 'c1', area: 'communication', text: 'My partner listens to me without rushing to fix things.', talk: 'When do you each feel most listened to? Share one recent time.' },
      { id: 'c2', area: 'communication', text: 'I find it easy to tell my partner when something bothers me.', talk: 'What makes it easier, or harder, to bring something up?' },
      { id: 'c3', area: 'communication', text: 'Sometimes I hold back what I really think to keep the peace.', rev: true, talk: 'What would help each of you say the hard thing kindly?' },
      { id: 'f1', area: 'faith', text: 'We have talked about how faith will shape our home.', plain: 'We have talked about how our values will shape our home.', talk: 'What do you each hope your home will feel like, and what shapes that?' },
      { id: 'f2', area: 'faith', text: 'I am comfortable with how my partner practices faith, or chooses not to.', plain: 'I am comfortable with what gives my partner meaning.', talk: 'What would help each of you feel respected in what matters most to you?' }
    ],
    safety: {
      title: 'A Few Private Questions',
      lead: 'These questions are just for you. Your answers here are not saved, and they never go on a card or a printout.',
      items: [
        { id: 's1', text: 'I sometimes feel afraid of my partner.' },
        { id: 's2', text: 'I feel pressured into this marriage, or into things I do not want.' },
        { id: 's3', text: 'My partner controls where I go, who I see, or the money I use.' },
        { id: 's4', text: 'My partner has hurt me, or threatened to.' }
      ],
      yesLead: 'Thank you for answering honestly. You deserve to feel safe, respected, and free to choose. Caring people are ready to listen, any time, and talking with them is private.',
      lines: [
        ['Love Is Respect', 'Call 1-866-331-9474, or text LOVEIS to 22522'],
        ['National Domestic Violence Hotline', 'Call 1-800-799-7233'],
        ['Day One (Minnesota)', 'Call 1-866-223-1111'],
        ['988 Suicide and Crisis Lifeline', 'Call or text 988'],
        ['In danger right now', 'Call 911']
      ]
    },
    differ: 2,
    sources: []
  };
  var Q = (window.BTV_Q && Array.isArray(window.BTV_Q.areas) && Array.isArray(window.BTV_Q.questions)) ? window.BTV_Q : FALLBACK;
  var AREAS = Q.areas, QS = Q.questions, SCALE = Q.scale || FALLBACK.scale, SAFETY = Q.safety || FALLBACK.safety, DIFF = +Q.differ || 2;
  function qsIn(aid) { return QS.filter(function (q) { return q.area === aid; }); }
  function label(v) { for (var i = 0; i < SCALE.length; i++) if (+SCALE[i][0] === +v) return SCALE[i][1]; return 'Skipped'; }

  /* ---------- small helpers ---------- */
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fname(s) { s = String(s == null ? '' : s).trim().split(/\s+/)[0] || ''; return s.length <= 24 && !/[<>&"`\\\u0000-\u001F\u007F]/.test(s) ? s : ''; }
  function b64(u) { var s = ''; for (var i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); }
  function unb64(s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function b64u(u) { return b64(u).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function unb64u(s) { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return unb64(s); }
  function load() { try { var t = localStorage.getItem(KEY); return t ? JSON.parse(t) : null; } catch (e) { return null; } }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
  function derive(pass, salt) {
    return subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveKey']).then(function (base) {
      return subtle.deriveKey({ name: 'PBKDF2', salt: salt, iterations: ROUNDS, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    });
  }
  function seal(key, obj) {
    var iv = crypto.getRandomValues(new Uint8Array(12));
    return subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, enc.encode(JSON.stringify(obj))).then(function (ct) { return { iv: b64(iv), ct: b64(new Uint8Array(ct)) }; });
  }
  function unseal(key, iv, ct) { return subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, ct).then(function (pt) { return JSON.parse(dec.decode(pt)); }); }

  /* ---------- state ----------
     st (saved, on this device): {v: 1, s: {a, b, mode: 'one' or 'two', me: 'a' or 'b'}, p: {a: box, b: box}, inCard}
     box: {salt, iv, ct, done}. Inside a box (only with its passcode): {ans: {id: 1 to 5}, fw: 'faith' or 'plain', at, partner}.
     inCard: a card from the other partner, still locked with the shared word. */
  var st = load(); if (!st || st.v !== 1) st = null;
  var KEYS = {}, DATA = {}, SAFE = {}, PARTNER_IN = null;
  var V = { view: 'welcome', who: null, area: 0 };
  function setup() { return st && st.s; }
  function nm(w) { return setup() ? st.s[w] : ''; }
  function other(w) { return w === 'a' ? 'b' : 'a'; }
  function box(w) { return st && st.p && st.p[w]; }
  function lockAll() { KEYS = {}; DATA = {}; SAFE = {}; }

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
  var PASS_NOTE = 'Grounded never sees it and cannot recover it. If it is ever forgotten, Clear Everything starts fresh.';
  // A new partner: choose a passcode, then an empty locked box.
  function newPass(w) {
    return ask({ title: nm(w) + ', choose your passcode', lead: 'Your answers are locked with it, so only you can open them. ' + PASS_NOTE, fields: ['Passcode', 'Passcode again'], ok: 'Lock and Start',
      check: function (v) { return v[0].length < 6 ? 'Use at least 6 characters.' : v[0] !== v[1] ? 'The two passcodes are different.' : ''; } })
      .then(function (v) {
        if (!v) return false;
        var salt = crypto.getRandomValues(new Uint8Array(16));
        return derive(v[0], salt).then(function (k) {
          KEYS[w] = k; DATA[w] = { ans: {}, fw: '', at: 0, partner: null };
          st.p[w] = { salt: b64(salt), done: false };
          if (PARTNER_IN && st.s.mode === 'two' && w === st.s.me) { DATA[w].partner = PARTNER_IN; PARTNER_IN = null; delete st.inCard; st.p[w].got = 1; try { sessionStorage.removeItem(PEND); } catch (e) {} }
          return save(w).then(function () { return true; });
        });
      });
  }
  // Open a partner's locked answers with their passcode.
  function unlock(w, why) {
    if (KEYS[w] && DATA[w]) return Promise.resolve(true);
    var bx = box(w); if (!bx) return newPass(w);
    var salt = unb64(bx.salt);
    return ask({ title: nm(w) + ', enter your passcode', lead: why || 'Only ' + nm(w) + ' should type here.', fields: ['Passcode'], ok: 'Open',
      verify: function (v) {
        return derive(v[0], salt).then(function (k) {
          return unseal(k, unb64(bx.iv), unb64(bx.ct)).then(function (d) { KEYS[w] = k; DATA[w] = d; d.ans = d.ans || {}; return true; }, function () { return 'That passcode does not open ' + nm(w) + '’s answers. Try again.'; });
        });
      } }).then(function (v) { return !!v; });
  }
  var saveT = {};
  function save(w) {
    clearTimeout(saveT[w]);
    if (!KEYS[w] || !DATA[w] || !st.p[w]) return Promise.resolve();
    return seal(KEYS[w], DATA[w]).then(function (b) { st.p[w].iv = b.iv; st.p[w].ct = b.ct; persist(); });
  }
  function saveSoon(w) { clearTimeout(saveT[w]); saveT[w] = setTimeout(function () { save(w); }, 300); }

  /* ---------- the card (two devices) ---------- */
  function cardData(w) {
    var d = DATA[w];
    return { v: 1, q: Q.version || 0, n: nm(w), to: nm(other(w)), fw: d.fw === 'faith' ? 'f' : 'p', a: QS.map(function (q) { var x = +d.ans[q.id] || 0; return x >= 1 && x <= 5 ? x : 0; }).join('') };
  }
  function cardClean(o) {
    if (!o || typeof o !== 'object' || Array.isArray(o)) return null;
    var ks = Object.keys(o).sort().join(','); if (ks !== 'a,fw,n,q,to,v') return null;
    if (o.v !== 1 || typeof o.q !== 'number') return null;
    if (typeof o.n !== 'string' || !o.n || fname(o.n) !== o.n || typeof o.to !== 'string' || fname(o.to) !== o.to) return null;
    if (o.fw !== 'f' && o.fw !== 'p') return null;
    if (typeof o.a !== 'string' || !/^[0-5]{1,300}$/.test(o.a)) return null;
    return { v: 1, q: o.q, n: o.n, to: o.to, fw: o.fw, a: o.a };
  }
  function makeCard(w, word) {
    var salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    return derive(word.trim().toLowerCase(), salt).then(function (k) { return subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, enc.encode(JSON.stringify(cardData(w)))); })
      .then(function (ct) { var c = new Uint8Array(ct), all = new Uint8Array(28 + c.length); all.set(salt, 0); all.set(iv, 16); all.set(c, 28); return 'b1.' + b64u(all); });
  }
  function readCard(code, word) {
    var all = unb64u(code.slice(3));
    return derive(word.trim().toLowerCase(), all.slice(0, 16)).then(function (k) { return unseal(k, all.slice(16, 28), all.slice(28)); }).then(cardClean);
  }
  function codeOf(s) { var m = /(?:^|[#&])btv=(b1\.[A-Za-z0-9_-]{20,2000})/.exec(String(s || '').trim()); return m ? m[1] : (/^b1\.[A-Za-z0-9_-]{20,2000}$/.test(String(s || '').trim()) ? String(s).trim() : ''); }
  function cardLink(code) { var base = /^https?:$/.test(location.protocol) ? location.origin : 'https://growwithgrounded.com'; return base + '/before-the-vows/#btv=' + code; }
  // A link opened on this device: keep the locked card, then wipe it from the address bar.
  function takeHash() {
    var c = codeOf(location.hash); if (!c) return false;
    try { sessionStorage.setItem(PEND, c); } catch (e) {}
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    return true;
  }
  function pendingCard() { var c = ''; try { c = sessionStorage.getItem(PEND) || ''; } catch (e) {} return c || (st && st.inCard) || ''; }
  function dropPending() { try { sessionStorage.removeItem(PEND); } catch (e) {} if (st && st.inCard) { delete st.inCard; persist(); } }
  // Open a card with the shared word, then keep it inside this partner's own locked answers.
  function openCard(code) {
    var got = null;
    return ask({ title: 'Open your partner’s card', lead: 'Type the word the two of you chose for this card.', fields: ['Your shared word'], ok: 'Open the Card',
      verify: function (v) { return readCard(code, v[0]).then(function (c) { if (!c) return 'This card is not one Before the Vows can read.'; got = c; return true; }, function () { return 'That word does not open this card. Try again.'; }); } })
      .then(function (v) {
        if (!v || !got) return;
        var partner = { n: got.n, fw: got.fw === 'f' ? 'faith' : 'plain', a: got.a, q: got.q, got: new Date().toISOString().slice(0, 10) };
        if (!setup()) {
          st = { v: 1, s: { a: got.n, b: got.to, mode: 'two', me: 'b' }, p: {}, inCard: code };
          PARTNER_IN = partner; persist(); try { sessionStorage.removeItem(PEND); } catch (e) {}
          V.view = 'setup'; render(); say(got.n + '’s card is open. Check your names below, then answer your own questions.');
          return;
        }
        var me = st.s.me;
        if (!box(me)) { PARTNER_IN = partner; st.inCard = code; persist(); try { sessionStorage.removeItem(PEND); } catch (e) {} V.view = 'hub'; render(); say(got.n + '’s card is open. Answer your own questions, then Talk About This is ready.'); return; }
        return unlock(me, 'Your partner’s card is kept with your own answers, locked with your passcode.').then(function (ok) {
          if (!ok) { st.inCard = code; persist(); render(); return; }
          DATA[me].partner = partner; st.p[me].got = 1; return save(me).then(function () { dropPending(); V.view = box(me).done ? 'talk' : 'hub'; render(); if (!box(me).done) say(got.n + '’s card is ready. Finish your own answers to see Talk About This.'); });
        });
      });
  }

  /* ---------- Talk About This ---------- */
  function side(q, v) { return v >= 4 ? (q.rev ? 'low' : 'high') : v <= 2 ? (q.rev ? 'high' : 'low') : 'mid'; }
  function differs(x, y) { return x >= 1 && y >= 1 && (Math.abs(x - y) >= DIFF || (x >= 4 && y <= 2) || (x <= 2 && y >= 4)); }
  // X and Y: {name, fw, ans {id: v}}
  function compare(X, Y) {
    var plain = X.fw !== 'faith' || Y.fw !== 'faith';
    return AREAS.map(function (ar) {
      var out = { area: ar, diff: [], agree: [], grow: [] };
      qsIn(ar.id).forEach(function (q) {
        var x = +X.ans[q.id] || 0, y = +Y.ans[q.id] || 0; if (!x || !y) return;
        var it = { q: q, text: (plain && q.plain) ? q.plain : q.text, x: x, y: y };
        if (differs(x, y)) out.diff.push(it);
        else if (side(q, x) === 'high' && side(q, y) === 'high') out.agree.push(it);
        else out.grow.push(it);
      });
      return out;
    });
  }
  function partnerAns(p) { var a = {}; QS.forEach(function (q, i) { var v = +(p.a.charAt(i) || 0); if (v) a[q.id] = v; }); return a; }
  function pair() {
    if (st.s.mode === 'one') return [{ name: nm('a'), fw: DATA.a.fw, ans: DATA.a.ans }, { name: nm('b'), fw: DATA.b.fw, ans: DATA.b.ans }];
    var me = st.s.me, p = DATA[me].partner;
    return [{ name: nm(me), fw: DATA[me].fw, ans: DATA[me].ans }, { name: p.n, fw: p.fw, ans: partnerAns(p) }];
  }

  /* ---------- views ---------- */
  var ICON_LOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
  function say(m) { var el = $('btv-say'); if (!el) return; el.textContent = m; clearTimeout(el._t); el._t = setTimeout(function () { el.textContent = ''; }, 6000); }
  function top() { var el = $('btv-app'); if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: 'start' }); }
  function countIn(d, aid) { return qsIn(aid).filter(function (q) { return d.ans[q.id]; }).length; }
  function answered(d) { return QS.filter(function (q) { return d.ans[q.id]; }).length; }

  function vWelcome() {
    var pc = pendingCard();
    return '<div class="ff-card gold"><h2>Welcome</h2>' +
      '<p>Before the Vows is a check-in for couples preparing for marriage or newly married. Each of you answers on your own, about 20 minutes each, in twelve areas of married life: communication, conflict and repair, money, families, home, expectations, closeness, children, faith and meaning, friends and fun, health and stress, and your dreams together.</p>' +
      '<p>Then Talk About This shows the places where you see things differently, each with a question to start the conversation, and the places you already agree. It is a conversation tool, not a test: there is nothing to pass and nothing to score. Every answer is simply a place to start talking.</p>' +
      '<p>It works well between premarital sessions, or on a quiet evening at home.</p>' +
      '<p class="ff-private">' + ICON_LOCK + '<span>Private by design. Each of you answers behind your own passcode, and everything stays on this device. Nothing is sent anywhere.</span></p>' +
      (pc ? '<div class="btv-note"><p><b>A card from your partner is here.</b> Open it with the word the two of you chose.</p><button type="button" class="btn btn-primary ff-sm" data-act="open-pending">Open the Card</button></div>' : '') +
      '<div class="ff-row"><button type="button" class="btn btn-primary" data-act="start">' + (setup() ? 'Continue' : 'Get Started') + '</button></div></div>';
  }
  function vSetup() {
    var s = setup() || { a: '', b: '', mode: 'one', me: 'a' }, locked = !!(st && st.p && (st.p.a || st.p.b));
    return '<div class="ff-card"><h2>Set Up</h2><p class="ff-sub">Just your first names, and how you would like to answer.</p>' +
      '<div class="ff-grid"><label class="ff-f"><span class="l">First partner</span><input id="btv-na" maxlength="24" autocomplete="off" value="' + esc(s.a) + '"' + (locked ? ' disabled' : '') + '></label>' +
      '<label class="ff-f"><span class="l">Second partner</span><input id="btv-nb" maxlength="24" autocomplete="off" value="' + esc(s.b) + '"' + (locked ? ' disabled' : '') + '></label></div>' +
      '<fieldset class="btv-choice"' + (locked ? ' disabled' : '') + '><legend>How will you answer?</legend>' +
      '<label><input type="radio" name="btv-mode" value="one"' + (s.mode !== 'two' ? ' checked' : '') + '><span><b>One device</b><small>Take turns. Hand the device over, and each of you answers behind your own passcode.</small></span></label>' +
      '<label><input type="radio" name="btv-mode" value="two"' + (s.mode === 'two' ? ' checked' : '') + '><span><b>Two devices</b><small>Each of you answers on your own phone or computer. Then you trade cards, locked with a word only the two of you know.</small></span></label></fieldset>' +
      '<fieldset class="btv-choice" id="btv-me-f"' + (s.mode === 'two' ? '' : ' hidden') + (locked ? ' disabled' : '') + '><legend>Who is using this device?</legend>' +
      '<label><input type="radio" name="btv-me" value="a"' + (s.me !== 'b' ? ' checked' : '') + '><span><b id="btv-me-a">' + esc(s.a || 'The first partner') + '</b></span></label>' +
      '<label><input type="radio" name="btv-me" value="b"' + (s.me === 'b' ? ' checked' : '') + '><span><b id="btv-me-b">' + esc(s.b || 'The second partner') + '</b></span></label></fieldset>' +
      (locked ? '<p class="ff-sub">Answers are already locked on this device. To change these, use Clear Everything below.</p>' : '') +
      '<div class="ff-row"><button type="button" class="btn btn-primary" data-act="setup-save">' + (locked ? 'Continue' : 'Save and Continue') + '</button><button type="button" class="btn btn-secondary ff-sm" data-act="welcome">Back</button><span class="ff-status" id="btv-st" role="status" aria-live="polite"></span></div></div>';
  }
  function status(w) { var b = box(w); return !b ? 'Not started yet' : b.done ? 'Finished' : 'Started'; }
  function vHub() {
    var s = st.s, h = '';
    if (s.mode === 'one') {
      var both = box('a') && box('a').done && box('b') && box('b').done;
      h += '<div class="ff-card"><h2>Your Check-in</h2><p class="ff-sub">Each of you answers privately. ' + esc(s.a) + '’s and ' + esc(s.b) + '’s answers stay hidden until you have both finished.</p><div class="btv-who">' +
        ['a', 'b'].map(function (w) {
          var b = box(w), done = b && b.done;
          return '<div class="btv-person' + (done ? ' done' : '') + '"><h3>' + esc(nm(w)) + '</h3><p>' + status(w) + '</p>' +
            (done ? '<p class="btv-small">Thank you. Your answers are locked.</p>' : '<button type="button" class="btn btn-primary ff-sm" data-act="answer" data-w="' + w + '">' + (b ? 'Keep Going' : 'Start') + '</button>') + '</div>';
        }).join('') + '</div>' +
        (both ? '<div class="btv-note"><p><b>You have both finished.</b> Sit together, and each of you types your passcode to open Talk About This.</p><button type="button" class="btn btn-primary" data-act="talk">Open Talk About This</button></div>'
          : '<p class="btv-small">When you are done, hand the device to your partner. Their turn starts with their own passcode.</p>') + '</div>';
    } else {
      var me = s.me, b = box(me), done = b && b.done, theirs = nm(other(me)), pc = pendingCard();
      h += '<div class="ff-card"><h2>' + esc(nm(me)) + '’s Check-in</h2><p class="ff-sub">On this device: ' + esc(nm(me)) + '. ' + esc(theirs) + ' answers on their own device.</p>' +
        '<div class="btv-who"><div class="btv-person' + (done ? ' done' : '') + '"><h3>Your answers</h3><p>' + status(me) + '</p>' +
        (done ? '' : '<button type="button" class="btn btn-primary ff-sm" data-act="answer" data-w="' + me + '">' + (b ? 'Keep Going' : 'Start') + '</button>') + '</div>' +
        '<div class="btv-person"><h3>' + esc(theirs) + '’s card</h3><p>' + (PARTNER_IN ? 'Open. It joins your answers when you start.' : (b && b.got) ? 'Opened and kept with your answers' : pc ? 'Waiting to be opened' : 'Not here yet') + '</p>' +
        (pc && !PARTNER_IN ? '<button type="button" class="btn btn-secondary ff-sm" data-act="open-pending">Open the Card</button>' : '') + '</div></div>' +
        (done ? '<div class="ff-row"><button type="button" class="btn btn-primary" data-act="talk">Open Talk About This</button><button type="button" class="btn btn-secondary" data-act="make-card">Make a Card for ' + esc(theirs) + '</button></div>' +
          '<div class="btv-paste"><label class="ff-f"><span class="l">Got a link from ' + esc(theirs) + '?</span><span class="h">Scan their QR code with this device’s camera, or paste their link here.</span><input id="btv-paste" autocomplete="off" placeholder="Paste the link"></label><div class="ff-row"><button type="button" class="btn btn-secondary ff-sm" data-act="paste">Open This Card</button></div></div>'
          : '<p class="btv-small">When you finish, you can make a card for ' + esc(theirs) + ' and open theirs.</p>') + '</div>';
    }
    return h + '<div class="ff-row"><button type="button" class="btn btn-secondary ff-sm" data-act="setup">Names and Setup</button></div>';
  }
  function scaleHtml(q, v) {
    return '<div class="btv-scale" role="group" aria-label="Your answer">' + SCALE.map(function (s) {
      return '<button type="button" data-act="pick" data-q="' + esc(q.id) + '" data-v="' + s[0] + '" aria-pressed="' + (+v === +s[0] ? 'true' : 'false') + '">' + esc(s[1]) + '</button>';
    }).join('') + '</div>';
  }
  function vAnswer() {
    var w = V.who, d = DATA[w], i = V.area, ar = AREAS[i], qs = qsIn(ar.id), n = AREAS.length;
    var faithPick = ar.faith ? '<div class="btv-fw"><p><b>Faith or Plain wording?</b> Choose the words that fit you. Either way, your answers line up with ' + esc(nm(other(w))) + '’s.</p><div class="btv-scale two" role="group" aria-label="Wording">' +
      [['faith', 'Faith'], ['plain', 'Plain']].map(function (o) { return '<button type="button" data-act="fw" data-v="' + o[0] + '" aria-pressed="' + (d.fw === o[0]) + '">' + o[1] + '</button>'; }).join('') + '</div></div>' : '';
    var showQs = !ar.faith || d.fw;
    return '<div class="ff-card"><div class="btv-prog"><span>' + esc(nm(w)) + ' &middot; Area ' + (i + 1) + ' of ' + n + '</span><span id="btv-cnt">' + countIn(d, ar.id) + ' of ' + qs.length + ' answered</span></div>' +
      '<div class="btv-bar" aria-hidden="true"><i style="width:' + Math.round(i / (n + 1) * 100) + '%"></i></div>' +
      '<h2>' + esc(ar.name) + '</h2>' + (ar.lead ? '<p class="ff-sub">' + esc(ar.lead) + '</p>' : '') + faithPick +
      (showQs ? qs.map(function (q, k) {
        var t = (ar.faith && d.fw === 'plain' && q.plain) ? q.plain : q.text;
        return '<fieldset class="btv-q" data-qid="' + esc(q.id) + '"><legend><span class="btv-qn">' + (k + 1) + '</span>' + esc(t) + '</legend>' + scaleHtml(q, d.ans[q.id]) + '</fieldset>';
      }).join('') : '') +
      '<p class="btv-small">Answer for yourself, as things are today. Skip any you like.</p>' +
      '<div class="ff-row btv-nav"><button type="button" class="btn btn-secondary ff-sm" data-act="prev">' + (i ? 'Back' : 'Back to the Start') + '</button><button type="button" class="btn btn-primary" data-act="next">' + (i < n - 1 ? 'Next Area' : 'Last Page') + '</button><button type="button" class="btn btn-secondary ff-sm" data-act="away">Lock and Step Away</button></div></div>';
  }
  function vSafety() {
    var w = V.who;
    return '<div class="ff-card btv-safe"><div class="btv-prog"><span>' + esc(nm(w)) + ' &middot; Last page</span><span>Just for you</span></div><div class="btv-bar" aria-hidden="true"><i style="width:96%"></i></div>' +
      '<h2>' + esc(SAFETY.title || 'A Few Private Questions') + '</h2><p class="ff-sub">' + esc(SAFETY.lead || '') + '</p>' +
      (SAFETY.items || []).map(function (it) {
        return '<fieldset class="btv-q"><legend>' + esc(it.text) + '</legend><div class="btv-scale two" role="group" aria-label="Your answer">' +
          [['y', 'Yes'], ['n', 'No']].map(function (o) { return '<button type="button" data-act="safe" data-s="' + esc(it.id) + '" data-v="' + o[0] + '" aria-pressed="' + (SAFE[it.id] === o[0]) + '">' + o[1] + '</button>'; }).join('') + '</div></fieldset>';
      }).join('') +
      '<div class="ff-row btv-nav"><button type="button" class="btn btn-secondary ff-sm" data-act="prev">Back</button><button type="button" class="btn btn-primary" data-act="finish">Finish</button></div></div>';
  }
  function linesHtml() {
    return '<ul class="btv-lines">' + (SAFETY.lines || FALLBACK.safety.lines).map(function (l) {
      var how = esc(l[1]).replace(/(\d-\d{3}-\d{3}-\d{4})/g, function (m) { return '<a href="tel:' + m.replace(/-/g, '') + '">' + m + '</a>'; }).replace(/\b(988|911)\b(?![^<]*<\/a>)/g, '<a href="tel:$1">$1</a>');
      return '<li><b>' + esc(l[0]) + '</b><span>' + how + '</span></li>';
    }).join('') + '</ul>';
  }
  function vSafeHelp() {
    return '<div class="ff-help btv-help" tabindex="-1" id="btv-help"><h2>You Deserve to Feel Safe</h2><p>' + esc(SAFETY.yesLead || FALLBACK.safety.yesLead) + '</p>' + linesHtml() +
      '<p>These answers stay with you. They are not saved on this device, and they never go on a card, a printout, or ' + esc(nm(other(V.who))) + '’s screen. If it helps, write down a number now, somewhere only you will see it.</p>' +
      '<div class="ff-row"><button type="button" class="btn btn-primary" data-act="safe-done">Continue</button></div></div>';
  }
  function vHandoff() {
    var w = V.who, o = other(w), od = box(o) && box(o).done;
    return '<div class="ff-card gold"><h2>Thank You, ' + esc(nm(w)) + '</h2><p>Your answers are locked with your passcode.</p>' +
      (st.s.mode === 'one' ? (od ? '<p>You have both finished. Sit together, and open Talk About This.</p><div class="ff-row"><button type="button" class="btn btn-primary" data-act="talk">Open Talk About This</button></div>'
        : '<p><b>Now hand the device to ' + esc(nm(o)) + '.</b> Their turn starts with their own passcode, and your answers stay hidden.</p><div class="ff-row"><button type="button" class="btn btn-primary" data-act="answer" data-w="' + o + '">Start ' + esc(nm(o)) + '’s Turn</button><button type="button" class="btn btn-secondary ff-sm" data-act="hub">Not Yet</button></div>')
        : '<div class="ff-row"><button type="button" class="btn btn-primary" data-act="hub">Continue</button></div>') + '</div>';
  }
  function vCard(code) {
    var link = cardLink(code), svg = '';
    try { if (window.GGQR) svg = GGQR.svg(link, { label: 'QR code for your Before the Vows card' }); } catch (e) { svg = ''; }
    var theirs = esc(nm(other(st.s.me)));
    return '<div class="ff-card gold"><h2>Your Card for ' + theirs + '</h2><p class="ff-sub">' + theirs + ' scans this with their phone’s camera, or opens the link, then types your shared word.</p>' +
      (svg ? '<div class="btv-qr">' + svg + '</div>' : '') +
      '<label class="ff-f"><span class="l">The link</span><input id="btv-link" readonly value="' + esc(link) + '"></label>' +
      '<div class="ff-row"><button type="button" class="btn btn-secondary ff-sm" data-act="copy">Copy the Link</button><span class="ff-status" id="btv-cst" role="status" aria-live="polite"></span></div>' +
      '<p class="btv-small">The card carries your first names, Faith or Plain, and your answers, locked with your shared word. The private questions on the last page never go on it. Share the word in person, never in the same message as the link. Nothing is uploaded: the card rides after the # in the link, the part a browser never sends to any server.</p>' +
      '<div class="ff-row"><button type="button" class="btn btn-primary" data-act="hub">Done</button></div></div>';
  }
  function itemHtml(it, X, Y, talk) {
    return '<li><p class="btv-it">' + esc(it.text) + '</p><p class="btv-ans"><span><b>' + esc(X.name) + ':</b> ' + esc(label(it.x)) + '</span><span><b>' + esc(Y.name) + ':</b> ' + esc(label(it.y)) + '</span></p>' +
      (talk && it.q.talk ? '<p class="btv-talk">' + esc(it.q.talk) + '</p>' : '') + '</li>';
  }
  function vTalk() {
    var P = pair(), X = P[0], Y = P[1], R = compare(X, Y);
    var nd = R.reduce(function (n, r) { return n + r.diff.length; }, 0), na = R.reduce(function (n, r) { return n + r.agree.length; }, 0);
    var h = '<div class="ff-card gold"><h2>Talk About This</h2><p class="ff-sub">' + esc(X.name) + ' and ' + esc(Y.name) + ': ' + nd + (nd === 1 ? ' place' : ' places') + ' to talk about, and ' + na + (na === 1 ? ' place' : ' places') + ' you already agree.</p>' +
      '<ul class="ff-tips"><li>Pick one or two a week. Set aside calm time, not the middle of a disagreement.</li><li>Take turns: one of you shares while the other listens and says back what they heard.</li><li>The goal is understanding each other. Some differences you will settle, and some you will simply understand and live with well.</li></ul>' +
      '<div class="ff-row"><button type="button" class="btn btn-primary ff-sm" data-act="print">Save or Print the List</button><button type="button" class="btn btn-secondary ff-sm" data-act="leave-talk">Lock and Close</button></div></div>';
    R.forEach(function (r) {
      if (!r.diff.length && !r.agree.length && !r.grow.length) return;
      h += '<section class="ff-card btv-area"><h3>' + esc(r.area.name) + '</h3>' +
        (r.diff.length ? '<p class="btv-k">Talk about this</p><ul class="btv-items">' + r.diff.map(function (it) { return itemHtml(it, X, Y, true); }).join('') + '</ul>' : '<p class="btv-small">You see this area much the same way.</p>') +
        (r.grow.length ? '<details class="btv-more"><summary>Worth Growing Together (' + r.grow.length + ')</summary><p class="btv-small">You answered these about the same, and there may be room to grow here, together.</p><ul class="btv-items">' + r.grow.map(function (it) { return itemHtml(it, X, Y, true); }).join('') + '</ul></details>' : '') +
        (r.agree.length ? '<details class="btv-more agree"><summary>Where You Agree (' + r.agree.length + ')</summary><p class="btv-small">Strengths to celebrate, and to lean on when the hard talks come.</p><ul class="btv-items">' + r.agree.map(function (it) { return itemHtml(it, X, Y, false); }).join('') + '</ul></details>' : '') +
        '</section>';
    });
    return h + '<div class="ff-row"><button type="button" class="btn btn-secondary ff-sm" data-act="print">Save or Print the List</button><button type="button" class="btn btn-secondary ff-sm" data-act="leave-talk">Lock and Close</button></div>';
  }
  function printTalk() {
    var P = pair(), X = P[0], Y = P[1], R = compare(X, Y), d = new Date();
    var li = function (it, talk) { return '<li><b>' + esc(it.text) + '</b><br>' + esc(X.name) + ': ' + esc(label(it.x)) + ' &middot; ' + esc(Y.name) + ': ' + esc(label(it.y)) + (talk && it.q.talk ? '<br><i>' + esc(it.q.talk) + '</i>' : '') + '</li>'; };
    var h = '<p class="p-eb">Before the Vows</p><h1>Talk About This</h1><p>' + esc(X.name) + ' and ' + esc(Y.name) + ', ' + d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) + '</p>';
    R.forEach(function (r) {
      if (!r.diff.length && !r.grow.length) return;
      h += '<h2>' + esc(r.area.name) + '</h2><ul class="p-list">' + r.diff.map(function (it) { return li(it, true); }).join('') + r.grow.map(function (it) { return li(it, true); }).join('') + '</ul>';
    });
    var ag = []; R.forEach(function (r) { r.agree.forEach(function (it) { ag.push(it); }); });
    if (ag.length) h += '<h2>Where You Agree</h2><ul class="p-list">' + ag.map(function (it) { return '<li>' + esc(it.text) + '</li>'; }).join('') + '</ul>';
    var r = $('gg-print'); if (!r) return;
    r.innerHTML = h + '<p class="p-foot">Made on this device with Before the Vows, Grow With Grounded, growwithgrounded.com. Nothing was sent anywhere.</p>';
    window.print();
    setTimeout(function () { r.innerHTML = ''; }, 1500);
  }

  function render() {
    var el = $('btv-app'); if (!el) return;
    if (!subtle) { el.innerHTML = '<div class="ff-card"><p>This browser cannot lock answers. Try a current version of Safari, Chrome, Edge, or Firefox.</p></div>'; return; }
    var v = V.view, h;
    if ((v === 'answer' || v === 'safety' || v === 'safehelp') && !DATA[V.who]) v = V.view = setup() ? 'hub' : 'welcome';
    if (v === 'talk') { try { h = vTalk(); } catch (e) { v = V.view = 'hub'; } }
    if (v !== 'talk' && v !== 'welcome' && v !== 'setup' && !setup()) v = V.view = 'welcome';
    if (v === 'welcome') h = vWelcome();
    else if (v === 'setup') h = vSetup();
    else if (v === 'hub') h = vHub();
    else if (v === 'answer') h = vAnswer();
    else if (v === 'safety') h = vSafety();
    else if (v === 'safehelp') h = vSafeHelp();
    else if (v === 'handoff') h = vHandoff();
    else if (v === 'card') h = vCard(V.code);
    el.innerHTML = '<p class="btv-say" id="btv-say" role="status" aria-live="polite"></p>' + h;
    var hp = $('btv-help'); if (hp) hp.focus();
  }
  function go(view, extra) { V.view = view; if (extra) for (var k in extra) V[k] = extra[k]; render(); top(); }

  /* ---------- actions ---------- */
  function finish() {
    var w = V.who; SAFE = {};
    st.p[w].done = true;
    return save(w).then(function () { delete KEYS[w]; delete DATA[w]; go('handoff'); });
  }
  function startTalk() {
    var s = st.s;
    if (s.mode === 'one') {
      return unlock('a', 'Each of you types your own passcode to open Talk About This.').then(function (ok) { return ok && unlock('b', 'Each of you types your own passcode to open Talk About This.'); })
        .then(function (ok) { if (ok) go('talk'); else { lockAll(); render(); } });
    }
    var me = s.me;
    return unlock(me).then(function (ok) {
      if (!ok) return;
      if (PARTNER_IN && !DATA[me].partner) { DATA[me].partner = PARTNER_IN; PARTNER_IN = null; st.p[me].got = 1; save(me).then(dropPending); }
      if (!DATA[me].partner) { var pc = pendingCard(); if (pc) return openCard(pc); say('Open ' + nm(other(me)) + '’s card first: scan their QR code, or paste their link below.'); render(); var p = $('btv-paste'); if (p) p.focus(); return; }
      go('talk');
    });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-act]'); if (!b || !$('btv-app') || !$('btv-app').contains(b) && !b.closest('.btv-clear')) return;
    var a = b.getAttribute('data-act'), w = b.getAttribute('data-w');
    if (a === 'start') go(setup() ? 'hub' : 'setup');
    else if (a === 'welcome') go('welcome');
    else if (a === 'setup') go('setup');
    else if (a === 'hub') { lockAll(); go('hub'); }
    else if (a === 'setup-save') {
      if (st && st.p && (st.p.a || st.p.b)) return go('hub');
      var na = fname($('btv-na').value), nb = fname($('btv-nb').value), mode = (document.querySelector('input[name="btv-mode"]:checked') || {}).value || 'one', me = (document.querySelector('input[name="btv-me"]:checked') || {}).value || 'a';
      if (!na || !nb) { $('btv-st').textContent = 'Add both first names.'; return; }
      if (na.toLowerCase() === nb.toLowerCase()) { $('btv-st').textContent = 'Use two different names, so each of you knows which turn is yours.'; return; }
      var keepCard = st && st.inCard;
      st = { v: 1, s: { a: na, b: nb, mode: mode, me: mode === 'two' ? me : 'a' }, p: {} }; if (keepCard) st.inCard = keepCard;
      persist(); go('hub');
    }
    else if (a === 'answer') {
      lockAll();
      unlock(w).then(function (ok) { if (!ok) return; var d = DATA[w]; var at = Math.max(0, Math.min(+d.at || 0, AREAS.length)); go(at >= AREAS.length ? 'safety' : 'answer', { who: w, area: Math.min(at, AREAS.length - 1) }); });
    }
    else if (a === 'pick') {
      var d = DATA[V.who]; if (!d) return; var q = b.getAttribute('data-q'), v = +b.getAttribute('data-v');
      if (d.ans[q] === v) delete d.ans[q]; else d.ans[q] = v;
      Array.prototype.forEach.call(b.parentNode.children, function (x) { x.setAttribute('aria-pressed', String(+x.getAttribute('data-v') === d.ans[q])); });
      var c = $('btv-cnt'); if (c) c.textContent = countIn(d, AREAS[V.area].id) + ' of ' + qsIn(AREAS[V.area].id).length + ' answered';
      saveSoon(V.who);
    }
    else if (a === 'fw') { var d2 = DATA[V.who]; d2.fw = b.getAttribute('data-v'); saveSoon(V.who); render(); var f = document.querySelector('.btv-q button'); if (f) f.focus(); }
    else if (a === 'next') {
      var d3 = DATA[V.who];
      if (V.area < AREAS.length - 1) { d3.at = V.area + 1; saveSoon(V.who); go('answer', { area: V.area + 1 }); }
      else { d3.at = AREAS.length; saveSoon(V.who); SAFE = {}; go('safety'); }
    }
    else if (a === 'prev') {
      if (V.view === 'safety') { SAFE = {}; go('answer', { area: AREAS.length - 1 }); }
      else if (V.area > 0) { DATA[V.who].at = V.area - 1; saveSoon(V.who); go('answer', { area: V.area - 1 }); }
      else { save(V.who); lockAll(); go('hub'); }
    }
    else if (a === 'away') { save(V.who).then(function () { lockAll(); go('hub'); say('Your answers are locked. Come back any time with your passcode.'); }); }
    else if (a === 'safe') { SAFE[b.getAttribute('data-s')] = b.getAttribute('data-v'); Array.prototype.forEach.call(b.parentNode.children, function (x) { x.setAttribute('aria-pressed', String(x === b)); }); }
    else if (a === 'finish') {
      var yes = Object.keys(SAFE).some(function (k) { return SAFE[k] === 'y'; });
      if (yes) { SAFE = {}; go('safehelp'); } else finish();
    }
    else if (a === 'safe-done') finish();
    else if (a === 'talk') startTalk();
    else if (a === 'leave-talk') { lockAll(); go('hub'); say('Locked. Each passcode opens it again.'); }
    else if (a === 'print') printTalk();
    else if (a === 'make-card') {
      var me = st.s.me;
      unlock(me).then(function (ok) {
        if (!ok) return;
        return ask({ title: 'Choose a shared word', lead: 'The card is locked with a word or short phrase only the two of you know. ' + nm(other(me)) + ' types it to open the card. Capital letters do not matter.', fields: ['Shared word', 'Shared word again'], ok: 'Make the Card',
          check: function (v) { return v[0].trim().length < 4 ? 'Use at least 4 letters. Longer is safer.' : v[0].trim().toLowerCase() !== v[1].trim().toLowerCase() ? 'The two words are different.' : ''; } })
          .then(function (v) { if (!v) return; return makeCard(me, v[0]).then(function (code) { go('card', { code: code }); }); });
      });
    }
    else if (a === 'copy') {
      var inp = $('btv-link'), cst = $('btv-cst'), t = inp ? inp.value : '';
      var ok = function () { if (cst) cst.textContent = 'Link copied.'; }, old = function () { try { inp.select(); document.execCommand('copy'); ok(); } catch (er) { if (cst) cst.textContent = 'Select the link and copy it by hand.'; } };
      try { if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(t).then(ok, old); return; } } catch (er) {}
      old();
    }
    else if (a === 'paste') { var c2 = codeOf($('btv-paste').value); if (!c2) { say('That link is not a Before the Vows card. Copy the whole link and try again.'); return; } openCard(c2); }
    else if (a === 'open-pending') { var pc = pendingCard(); if (pc) openCard(pc); }
    else if (a === 'clear') {
      if (!window.confirm('Clear Everything? This removes both of your answers and any card from this device. It cannot be undone.')) return;
      try { localStorage.removeItem(KEY); sessionStorage.removeItem(PEND); } catch (er) {}
      st = null; lockAll(); PARTNER_IN = null; go('welcome'); say('Cleared from this device.');
    }
  });
  document.addEventListener('change', function (e) {
    if (e.target.name === 'btv-mode') { var f = $('btv-me-f'); if (f) f.hidden = e.target.value !== 'two'; }
  });
  document.addEventListener('input', function (e) {
    if (e.target.id === 'btv-na' || e.target.id === 'btv-nb') { var k = e.target.id === 'btv-na' ? 'a' : 'b', el = $('btv-me-' + k); if (el) el.textContent = fname(e.target.value) || (k === 'a' ? 'The first partner' : 'The second partner'); }
  });
  // Leaving the page or hiding it locks everything again.
  window.addEventListener('pagehide', function () { ['a', 'b'].forEach(function (w) { if (KEYS[w]) save(w); }); });
  window.addEventListener('hashchange', function () {
    if (!takeHash()) return;
    var c = pendingCard(); if (c) { if (setup()) { st.inCard = c; persist(); } openCard(c); }
  });

  /* ---------- Learn (For You lessons, played by shared/gg-learn.js) ---------- */
  function learnData() {
    var L = window.GG_LEARN_BTV; if (!L) return null;
    var tracks = Array.isArray(L.tracks) ? L.tracks : Array.isArray(L.lessons) ? [{ id: 'btv-you', title: L.title || 'For You', lessons: L.lessons }] : Array.isArray(L) ? [{ id: 'btv-you', title: 'For You', lessons: L }] : [];
    tracks = tracks.filter(function (t) { return t && Array.isArray(t.lessons) && t.lessons.length; });
    return tracks.length ? { title: L.title || 'Learn', intro: L.intro || '', tracks: tracks } : null;
  }
  var LKEY = 'gg-learn:btv', CTL = null;
  function lload() { try { var d = JSON.parse(localStorage.getItem(LKEY) || '{}'); return { done: d.done || {}, at: d.at || {} }; } catch (e) { return { done: {}, at: {} }; } }
  function lkeep(d) { try { localStorage.setItem(LKEY, JSON.stringify(d)); } catch (e) {} }
  function need(src, test) { return new Promise(function (ok) { if (test()) return ok(); var s = document.createElement('script'); s.src = src; s.onload = s.onerror = function () { ok(); }; document.head.appendChild(s); }); }
  function learnList() {
    if (CTL) { CTL.stop(); CTL = null; }
    var L = learnData(), D = lload(), el = $('btv-learn');
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
    var el = $('btv-learn'), D = lload();
    el.innerHTML = '<button type="button" class="btn btn-secondary ff-sm" data-lback="1">&larr; All Lessons</button><div class="btv-eb">' + esc(f.t.title) + '</div><h2 class="btv-lh">' + esc(f.l.title) + '</h2><div id="btv-player"></div><div class="btv-lsrc">' + (window.GGSources ? GGSources.lesson('', f.l) : '') + '</div>';
    CTL = GGLearn.player($('btv-player'), {
      app: 'btv', lesson: f.l, track: f.t, tracks: L.tracks, done: D.done, at: D.at[f.l.id] || 0, accent: '#8B5E1A', mark: { name: 'Before the Vows' },
      onAt: function (i) { var d = lload(); d.at[f.l.id] = i; lkeep(d); },
      onDone: function (lid) { var d = lload(); if (!d.done[lid]) { d.done[lid] = new Date().toISOString().slice(0, 10); lkeep(d); } D.done[lid] = d.done[lid]; },
      open: function (nid) { learnPlay(nid); },
      home: function () { learnList(); }
    });
    el.scrollIntoView({ block: 'start' });
  }
  function tab(which) {
    var t = $('btv-tabs'); if (!t) return;
    Array.prototype.forEach.call(t.querySelectorAll('button'), function (b) { var on = b.getAttribute('data-tab') === which; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
    $('btv-app').hidden = which !== 'check'; $('btv-learn').hidden = which !== 'learn';
    if (which === 'learn') {
      $('btv-learn').innerHTML = '<div class="ff-card"><p>One moment...</p></div>';
      need('/read.js?v=vc3', function () { return !!window.GGRead; }).then(function () { return need('/shared/gg-learn.js?v=ln36', function () { return !!window.GGLearn; }); }).then(function () {
        if (window.GGLearn) learnList(); else $('btv-learn').innerHTML = '<div class="ff-card"><p>The lessons could not load. Check the connection and try again.</p></div>';
      });
    } else if (CTL) { CTL.stop(); CTL = null; }
  }
  function learnSetup() {
    var t = $('btv-tabs'); if (!t || !learnData()) return;
    t.hidden = false;
    t.addEventListener('click', function (e) { var b = e.target.closest('button[data-tab]'); if (b) tab(b.getAttribute('data-tab')); });
    t.addEventListener('keydown', function (e) { if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return; var n = $('btv-app').hidden ? 'check' : 'learn'; tab(n); t.querySelector('[data-tab="' + n + '"]').focus(); });
    $('btv-learn').addEventListener('click', function (e) {
      var b = e.target.closest('[data-lesson]'); if (b) return learnPlay(b.getAttribute('data-lesson'));
      if (e.target.closest('[data-lback]')) return learnList();
      var v = e.target.closest('[data-l="vcheck"]'); if (v && window.GGRead && GGRead.check) GGRead.check(function () { learnList(); });
    });
  }

  /* ---------- start ---------- */
  takeHash();
  if (st && st.s) V.view = 'hub';
  var pc0 = pendingCard();
  if (pc0 && st && st.s) { st.inCard = pc0; persist(); try { sessionStorage.removeItem(PEND); } catch (e) {} }
  render();
  learnSetup();
  var src = $('btv-src');
  if (src && window.GGSources && Q.sources && Q.sources.length) src.innerHTML = GGSources.line(Q.sources);
  if (pc0) setTimeout(function () { openCard(pendingCard() || pc0); }, 200);
  window.GGBTV = { state: function () { return st; }, compare: compare, differs: differs, cardClean: cardClean, readCard: readCard, Q: Q };
})();
