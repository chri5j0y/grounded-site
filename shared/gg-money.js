/* =====================================================================
   GROUNDED MONEY (shared/gg-money.js), GWG BLD 937 (stage 1 built it; stage 2 wired it into Home)
   A calm monthly money plan for a household, built like the Joy family sheet.
   Chris (November 7, 2026): "the gap is real and exactly why im doing this.. i need to build a tool that can fill the gap".
   Plan: grounded-workshop patches/plan/budget-plan.md. Stage 2 wiring: patches/bld937/STAGE2.md.

   Everything stays on this device. No bank connections, nothing sent anywhere. The Family share travels in the
   address hash (#money=), which never reaches a server.

   For a host page
     GGMoney.render(container, opts)   draws the tool; returns {go(view), refresh(), receive(codeOrLink), destroy()}
       opts.store     'ggp' (default: the open profile, GGP.data(id, 'money'), locked with the profile and saved by GGP.save),
                      'local' (this browser's localStorage, for the standalone preview only), 'memory', or an adapter
                      {get() -> the money object (kept and changed in place), put() -> saves it, ok() -> true when open}
       opts.member    true, false, or a function: Membership opens This Month, Log, the weekly check-in, and Family sharing.
                      Start (false) is the taste: Close the Gap and My Plan (with Bring In a Spreadsheet).
       opts.view      first view: gap, plan, month, log, check, import, share
       opts.onView    fn(view) when the view changes (the host can keep its address in step)
       opts.onMembership fn('see' or 'code') for the Membership line buttons
       opts.toast     fn(message) to use the host's toast (the module has its own)
       opts.shareBase the start of a Family link (default https://growwithgrounded.com/home/#money=)
       opts.qrSrc     where shared/vendor/qrcode.js lives (default /shared/vendor/qrcode.js?v=b921)
       opts.css       false when the host already loads gg-money.css; else it is added once from beside this file
       opts.readHash  true reads #money=<code> from the address on render (then clears it)
       opts.art       where the paintings live (default /shared/heroes/way/), or a function(name) returning each one's address
       opts.toolsSrc  where gg-money-tools.js lives (default beside this file); loaded the first time Grounded Money opens
     GGMoney.summary(store)  {has, income, spend, gap, after, month: {ahead, short, line}} for a Today line
     GGMoney.model, GGMoney.parse, GGMoney.share   the data layer, for tests and stage 2

   The money object (one per profile)
     {v: 1, pid (the plan's id, shared by every phone in one Family plan), created, u,
      lines:  [{id, n name, a amount, f how often (m, b, h, y, s), s status (fixed, varies, hold, pretax), o note, u, x removed}],
      income: [{id, n, a, lo, hi, o, u, x}],
      ideas:  {done: {key: time}, edit: {key: amount}, off: {key: 1}, mine: [{id, n, a, k: 'spend' or 'income', o, u, x}], u},
      logs:   [{id, d YYYY-MM-DD, a, c line id, n category name, u, x}],
      checks: {Monday YYYY-MM-DD: {well, steady 1 to 5, step, at}},
      tools:  {debt, goals, pay, fund, grocery, car, side, subs, calls, date, give, kids, tips} each tool's own answers (stage 1b,
              shared/gg-money-tools.js); they stay on this phone (a Family share carries the plan, ideas, and logs)
      own:    {lines, income, ideas, pid} this phone's own plan, kept while it follows a Family plan}
   Removing sets x and u (so a removal travels in a share); Undo clears it.

   No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGMoney) return;
  var V = 'b937';
  var HERE = (function () { try { var s = document.currentScript && document.currentScript.src; return s ? s.replace(/[^/]*$/, '') : '/shared/'; } catch (e) { return '/shared/'; } })();
  var SHARE_BASE = 'https://growwithgrounded.com/home/#money=';

  /* ---------- small helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function today() { return ymd(new Date()); }
  function monthKey(d) { d = d || new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1); }
  function weekKey(d) { d = new Date(d || new Date()); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return ymd(d); }
  function uid() { var s = ''; while (s.length < 8) s += Math.random().toString(36).slice(2); return s.slice(0, 8); }
  function arr(x) { return Array.isArray(x) ? x : []; }
  function obj(x) { return x && typeof x === 'object' && !Array.isArray(x) ? x : {}; }
  function num(v) {
    if (typeof v === 'number') return isFinite(v) ? v : null;
    var s = String(v == null ? '' : v).replace(/[$,\s]/g, ''); if (!s || !/^-?\d*\.?\d+$/.test(s)) return null; var n = +s; return isFinite(n) ? n : null;
  }
  function r2(n) { return Math.round((+n || 0) * 100) / 100; }
  function r5(n) { return Math.max(5, Math.round((+n || 0) / 5) * 5); }
  function money(n, cents) {
    n = +n || 0; var neg = n < 0; n = Math.abs(n);
    var s = cents && Math.round(n * 100) % 100 ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : Math.round(n).toLocaleString('en-US');
    return (neg ? '\u2212' : '') + '$' + s;
  }
  function plain(n) { n = +n || 0; return Math.round(n * 100) % 100 ? n.toFixed(2) : String(Math.round(n)); }
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function niceDate(s) { var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || ''); return m ? MONTHS[+m[2] - 1].slice(0, 3) + ' ' + (+m[3]) : ''; }
  function live(list) { return arr(list).filter(function (x) { return x && !x.x; }); }

  /* ---------- icons ---------- */
  var SYM = {
    coin: '<circle cx="12" cy="12" r="8.5"/><path d="M14.8 9.2c-.5-1-1.6-1.6-2.8-1.6-1.6 0-2.8.9-2.8 2.1 0 2.9 5.8 1.5 5.8 4.5 0 1.2-1.2 2.2-3 2.2-1.3 0-2.5-.6-3-1.7M12 6v1.6M12 16.4V18"/>',
    gap: '<path d="M4 18h16M6 18V9M10 18V6M14 18v-5M18 18v-8"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.2"/><circle cx="4.5" cy="12" r="1.2"/><circle cx="4.5" cy="18" r="1.2"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    tap: '<path d="M12 5v14M5 12h14"/>',
    leaf: '<path d="M5 19c0-8 5.5-13.5 14-14 0 8.5-5.5 14-14 14z"/><path d="M5 19l7.5-7.5"/>',
    check: '<path d="M5 12.5l4.4 4.4L19 7.4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
    up: '<path d="M12 15V4M7.5 8.5L12 4l4.5 4.5"/><path d="M4 15.5v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
    share: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.2 1.2"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.2-1.2"/>',
    cam: '<path d="M4 8.5h3l1.6-2.5h6.8L17 8.5h3v10.5H4z"/><circle cx="12" cy="13.3" r="3.4"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    heart: '<path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z"/>',
    sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/>',
    pen: '<path d="M4 20l1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5z"/><path d="M13.5 7l3 3"/>',
    home: '<path d="M4 11l8-6.5 8 6.5"/><path d="M6.5 9.5V20h11V9.5"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
    path: '<path d="M4 20c4 0 4-5 8-5s4-5 8-5"/><circle cx="20" cy="6" r="2"/><path d="M4 20h0"/>',
    shield: '<path d="M12 3l7 3v5.5c0 4.4-3 8-7 9.5-4-1.5-7-5.1-7-9.5V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
    jar: '<path d="M8 3.5h8M8.5 3.5v3L6.5 9v10a1.5 1.5 0 0 0 1.5 1.5h8a1.5 1.5 0 0 0 1.5-1.5V9l-2-2.5v-3"/><path d="M9 13h6"/>',
    plate: '<circle cx="13" cy="12.5" r="7.5"/><circle cx="13" cy="12.5" r="4"/><path d="M3 4v5.5a1.5 1.5 0 0 0 1.5 1.5v9M3 4v4M5.9 4v4"/>',
    car: '<path d="M4 16.5V12l2-5h12l2 5v4.5"/><path d="M3.5 16.5h17M4 12h16"/><circle cx="7.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/>',
    sprout: '<path d="M12 21v-8"/><path d="M12 13c0-4.4-3-7-7.5-7 0 4.4 3 7 7.5 7z"/><path d="M12 11c0-3.6 2.6-6 6.8-6 0 3.6-2.6 6-6.8 6z"/><path d="M7.5 21h9"/>',
    phone: '<rect x="6.5" y="2.8" width="11" height="18.4" rx="2.6"/><path d="M10.5 18h3"/>',
    gift: '<rect x="4" y="9" width="16" height="11.5" rx="1.5"/><path d="M3 9h18M12 9v11.5M12 9c-1-3-5-5-6-2.5S9.5 9 12 9zM12 9c1-3 5-5 6-2.5S14.5 9 12 9z"/>',
    people: '<circle cx="8.5" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M3 19.5c.4-3.4 2.6-5.5 5.5-5.5s5.1 2.1 5.5 5.5M14.2 14.3c.7-.3 1.4-.5 2.3-.5 2.4 0 4.1 1.8 4.5 4.7"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  function I(id) { return '<svg class="gm-i" aria-hidden="true" focusable="false"><use href="#gmi-' + id + '"/></svg>'; }
  function mountIcons() {
    if (document.getElementById('gm-icons')) return;
    var d = document.createElement('div');
    d.innerHTML = '<svg id="gm-icons" width="0" height="0" style="position:absolute" aria-hidden="true">' + Object.keys(SYM).map(function (k) { return '<symbol id="gmi-' + k + '" viewBox="0 0 24 24">' + SYM[k] + '</symbol>'; }).join('') + '</svg>';
    document.body.insertBefore(d.firstChild, document.body.firstChild);
  }

  /* =====================================================================
     THE DATA LAYER
     ===================================================================== */
  var FREQ = { m: { n: 'Monthly', k: 1 }, b: { n: 'Every Two Weeks', k: 26 / 12 }, h: { n: 'Twice a Year', k: 2 / 12 }, y: { n: 'Yearly', k: 1 / 12 }, s: { n: 'Spread Monthly', k: 1 / 12 } };
  var FREQ_ORDER = ['m', 'b', 'h', 'y', 's'];
  var STATUS = { fixed: 'Fixed', varies: 'Varies', hold: 'On Hold', pretax: 'Before Taxes' };
  var STATUS_ORDER = ['fixed', 'varies', 'hold', 'pretax'];

  function blank() { return { v: 1, pid: uid(), created: today(), u: Date.now(), lines: [], income: [], ideas: { done: {}, edit: {}, off: {}, mine: [], u: 0 }, logs: [], checks: {}, tools: {} }; }
  // Fills a money object in place (so a profile's own object stays the one saved).
  function norm(d) {
    if (!d || typeof d !== 'object') d = {};
    var b = blank(); Object.keys(b).forEach(function (k) { if (d[k] == null) d[k] = b[k]; });
    d.lines = arr(d.lines); d.income = arr(d.income); d.logs = arr(d.logs); d.checks = obj(d.checks); d.tools = obj(d.tools);
    d.ideas = obj(d.ideas); ['done', 'edit', 'off'].forEach(function (k) { d.ideas[k] = obj(d.ideas[k]); }); d.ideas.mine = arr(d.ideas.mine); d.ideas.u = +d.ideas.u || 0;
    d.lines.forEach(function (l) { if (!FREQ[l.f]) l.f = 'm'; if (!STATUS[l.s]) l.s = 'fixed'; l.a = +l.a || 0; });
    return d;
  }
  function freqOf(f) { return FREQ[f] || FREQ.m; }
  function monthly(l) { return r2((+l.a || 0) * freqOf(l.f).k); }
  function counts(l) { return l.s !== 'hold'; }
  function addLine(d, o) { var l = Object.assign({ id: uid(), n: '', a: 0, f: 'm', s: 'fixed', o: '' }, o || {}, { u: Date.now() }); d.lines.push(l); touch(d); return l; }
  function addIncome(d, o) { var l = Object.assign({ id: uid(), n: '', a: 0, lo: null, hi: null, o: '' }, o || {}, { u: Date.now() }); d.income.push(l); touch(d); return l; }
  function edit(item, patch, d) { Object.assign(item, patch, { u: Date.now() }); if (d) touch(d); return item; }
  function remove(item, d) { item.x = 1; item.u = Date.now(); if (d) touch(d); }
  function restore(item, d) { delete item.x; item.u = Date.now(); if (d) touch(d); }
  function touch(d) { d.u = Date.now(); }
  function find(list, id) { return arr(list).filter(function (x) { return x && x.id === id; })[0] || null; }

  function totals(d) {
    var spend = 0, inc = 0, lo = 0, hi = 0, pretax = 0;
    live(d.lines).forEach(function (l) { if (counts(l)) spend += monthly(l); if (l.s === 'pretax') pretax += monthly(l); });
    live(d.income).forEach(function (s) { var a = +s.a || 0; inc += a; lo += s.lo != null ? +s.lo : a; hi += s.hi != null ? +s.hi : a; });
    var ideas = ideaList(d), saved = 0, savedSpend = 0, savedInc = 0;
    ideas.forEach(function (x) { if (x.done) { saved += x.save; if (x.k === 'income') savedInc += x.save; else savedSpend += x.save; } });
    var gap = r2(inc - spend);
    return { spend: r2(spend), income: r2(inc), lo: r2(lo), hi: r2(hi), pretax: r2(pretax), gap: gap, saved: r2(saved), savedSpend: r2(savedSpend), savedInc: r2(savedInc), after: r2(gap + saved), ideas: ideas };
  }

  /* ---------- Close the Gap: ideas from the person's own lines ----------
     Each idea has a steady key, so a check, a changed amount, or a hidden idea stays with it. The amounts are
     starting estimates the person changes with one tap. */
  function rx(l, re) { return re.test(String(l.n || '') + ' ' + String(l.o || '')); }
  var RE = {
    hsa: /\bhsa\b|health savings/i,
    health: /\bmeds?\b|medic|pharm|prescri|\brx\b|doctor|clinic|dental|dentist|vision|copay|therap|chiro|hospital/i,
    food: /grocer|food|costco|aldi|walmart|kroger|target|trader|whole foods|market/i,
    out: /restaurant|dining|eat(ing)? ?out|take ?out|door ?dash|uber ?eats|grubhub|delivery/i,
    phone: /phone|mobile|wireless|cellular|verizon|at ?& ?t\b|sprint|t ?mobile|cricket|\bmint\b/i,
    energy: /energy|electric|power|xcel|excel energy|natural gas|\bgas\b(?! station)|utilit|heat/i,
    ins: /insur/i,
    subs: /subscri|netflix|hulu|spotify|disney|prime|streaming|apple tv|youtube|paramount|peacock|max\b/i,
    work: /ceremon|wedding|officiat|event|side|hustle|gig|freelance|tutor|lesson/i,
    fam: /contribut|family|rent from|board/i
  };
  function ideaList(d) {
    var L = live(d.lines).filter(function (l) { return counts(l) && monthly(l) > 0; }), out = [];
    function add(key, k, t, how, save, line) { out.push({ key: key, k: k, t: t, how: how, base: r5(save), line: line || '' }); }
    var pre = L.filter(function (l) { return l.s === 'pretax'; });
    if (pre.length) add('pretax', 'spend', 'Count Before Taxes Lines Once', 'If your paycheck amount is already after ' + names(pre) + ' come out, these are counted twice. Counting them once shows the true gap.', sum(pre));
    // An HSA counts even at zero (often listed Before Taxes with its amount in the note).
    var hsa = live(d.lines).filter(function (l) { return rx(l, RE.hsa); });
    if (hsa.length) L.filter(function (l) { return !rx(l, RE.hsa) && rx(l, RE.health); }).forEach(function (l) {
      add('hsa:' + l.id, 'spend', 'Pay ' + l.n + ' From Your HSA', 'Your HSA already sets money aside for health costs. When ' + l.n + ' comes from the HSA, it leaves the monthly spending.', monthly(l), l.id); });
    L.filter(function (l) { return rx(l, RE.food) && !rx(l, RE.out); }).slice(0, 2).forEach(function (l) {
      add('food:' + l.id, 'spend', 'Cook From Tending\u2019s Meal Plan', 'One weekly menu of whole, nourishing food with one shopping list for ' + l.n + ', sized for your table.', monthly(l) * 0.15, l.id); });
    L.filter(function (l) { return rx(l, RE.out); }).slice(0, 2).forEach(function (l) {
      add('out:' + l.id, 'spend', 'More Dinners at Home', 'Trade a few of the ' + l.n + ' nights for a simple dinner together at your own table.', monthly(l) * 0.5, l.id); });
    L.filter(function (l) { return rx(l, RE.phone); }).slice(0, 1).forEach(function (l) {
      if (monthly(l) >= 40) add('phone:' + l.id, 'spend', 'Look at a Smaller Phone Plan', 'Compare ' + l.n + ' with a prepaid or family plan for the phones you already have.', monthly(l) * 0.3, l.id); });
    L.filter(function (l) { return rx(l, RE.energy) && !rx(l, RE.phone); }).slice(0, 2).forEach(function (l) {
      add('energy:' + l.id, 'spend', 'Ask About Budget Billing', 'Ask ' + l.n + ' about budget billing for one even amount each month, and about a home energy check.', monthly(l) * 0.08, l.id); });
    L.filter(function (l) { return rx(l, RE.ins); }).slice(0, 2).forEach(function (l) {
      add('ins:' + l.id, 'spend', 'Get Two Insurance Quotes', 'Compare ' + l.n + ' with two other quotes for the same coverage, once a year.', monthly(l) * 0.1, l.id); });
    L.filter(function (l) { return rx(l, RE.subs); }).slice(0, 1).forEach(function (l) {
      add('subs:' + l.id, 'spend', 'Keep the Subscriptions You Love', 'Keep the one or two you use most from ' + l.n + ', and enjoy a few more unplugged evenings.', monthly(l) * 0.4, l.id); });
    var inc = live(d.income);
    inc.forEach(function (s) {
      var a = +s.a || 0, hi = s.hi != null ? +s.hi : a;
      if (hi > a + 10 && rx(s, RE.work)) add('reach:' + s.id, 'income', 'Lean Into ' + s.n, 'Your range for ' + s.n + ' reaches ' + money(hi) + '. One more piece of work a month moves it toward the high end.', (hi - a) / 2);
    });
    add('side', 'income', 'Side Work You Enjoy', 'A skill you already have, a few hours a month: ceremonies, tutoring, repairs, music, or seasonal work.', 200);
    if (!inc.some(function (s) { return rx(s, RE.fam); })) add('family', 'income', 'A Family Contribution', 'Grown children or family at home can add a set amount each month toward the home they share.', 150);
    arr(d.ideas.mine).forEach(function (m) { if (!m.x) out.push({ key: 'mine:' + m.id, k: m.k === 'income' ? 'income' : 'spend', t: m.n || 'My Idea', how: m.o || '', base: +m.a || 0, mine: m.id }); });
    var I2 = d.ideas;
    out.forEach(function (x) { x.tool = IDEA_TOOL[x.key.split(':')[0]] || ''; });
    out.forEach(function (x) { var e = I2.edit[x.key]; x.save = e != null && isFinite(+e) ? r2(+e) : x.base; x.done = !!I2.done[x.key]; x.off = !!I2.off[x.key]; });
    return out;
  }
  var IDEA_TOOL = { food: 'grocery', out: 'grocery', phone: 'calls', energy: 'calls', ins: 'calls', subs: 'subs', reach: 'side', side: 'side', family: 'date' };
  function names(list) { var n = list.map(function (l) { return l.n; }); return n.length < 3 ? n.join(' and ') : n.slice(0, -1).join(', ') + ', and ' + n[n.length - 1]; }
  function sum(list) { return list.reduce(function (s, l) { return s + monthly(l); }, 0); }
  function ideaSet(d, key, patch) {
    var I2 = d.ideas;
    if ('done' in patch) { if (patch.done) I2.done[key] = Date.now(); else delete I2.done[key]; }
    if ('save' in patch) { if (patch.save == null) delete I2.edit[key]; else I2.edit[key] = r2(patch.save); }
    if ('off' in patch) { if (patch.off) { I2.off[key] = 1; delete I2.done[key]; } else delete I2.off[key]; }
    I2.u = Date.now(); touch(d);
  }

  /* ---------- This Month ---------- */
  function month(d, mk) {
    mk = mk || monthKey(); var t = totals(d), logs = live(d.logs).filter(function (g) { return String(g.d || '').slice(0, 7) === mk; });
    var by = {}, loose = 0, logged = 0;
    logs.forEach(function (g) { logged += +g.a || 0; var l = find(d.lines, g.c); if (l && !l.x && counts(l)) by[l.id] = (by[l.id] || 0) + (+g.a || 0); else loose += +g.a || 0; });
    var rows = live(d.lines).filter(counts).map(function (l) { return { id: l.id, n: l.n, s: l.s, plan: monthly(l), got: r2(by[l.id] || 0) }; });
    var projected = rows.reduce(function (s, r) { return s + Math.max(r.plan, r.got); }, 0) + loose - t.savedSpend;
    var income = t.income + t.savedInc, diff = r2(income - projected);
    return { key: mk, name: MONTHS[+mk.slice(5, 7) - 1], income: r2(income), lo: t.lo, hi: t.hi, plan: r2(t.spend - t.savedSpend), logged: r2(logged), loose: r2(loose), rows: rows, projected: r2(projected), diff: diff,
      line: diff >= 0 ? 'Ahead ' + money(diff) + ' this month' : 'Short ' + money(-diff) + ' this month', logs: logs };
  }
  function logAdd(d, a, c, date) {
    var l = find(d.lines, c), g = { id: uid(), d: date || today(), a: r2(a), c: l ? l.id : '', n: l ? l.n : (c || 'Other'), u: Date.now() };
    d.logs.push(g); touch(d); return g;
  }

  /* ---------- the weekly money check-in ---------- */
  var STEADY = ['Finding My Footing', 'Getting Steadier', 'Steady', 'Strong', 'Thriving'];
  function checkSave(d, wk, ans) { d.checks[wk] = Object.assign({}, d.checks[wk] || {}, ans, { at: Date.now() }); touch(d); return d.checks[wk]; }

  /* ---------- storage ---------- */
  function ggpStore() {
    return {
      kind: 'ggp',
      ok: function () { var G = window.GGP; return !!(G && G.active && G.active()); },
      get: function () { var G = window.GGP, p = G && G.active && G.active(); if (!p) return null; var d = G.data(p.id, 'money'); return d ? norm(d) : null; },
      put: function () { var G = window.GGP, p = G && G.active && G.active(); return p && G.save ? G.save(p.id) : Promise.resolve(); }
    };
  }
  function localStore(key) {
    var mem = null; key = key || 'gg-money-preview';
    return {
      kind: 'local', ok: function () { return true; },
      get: function () { if (!mem) { try { mem = JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { mem = null; } mem = norm(mem || blank()); } return mem; },
      put: function () { try { localStorage.setItem(key, JSON.stringify(mem)); } catch (e) {} return Promise.resolve(); }
    };
  }
  function memStore(seed) { var mem = norm(seed || blank()); return { kind: 'memory', ok: function () { return true; }, get: function () { return mem; }, put: function () { return Promise.resolve(); } }; }
  function storeOf(s) {
    if (s && typeof s === 'object' && typeof s.get === 'function') return Object.assign({ ok: function () { return true; }, put: function () { return Promise.resolve(); } }, s);
    if (s === 'local') return localStore(); if (s === 'memory') return memStore();
    return ggpStore();
  }

  function summary(s) {
    var st = storeOf(s), d = st.ok() ? st.get() : null;
    if (!d || !live(d.lines).length) return { has: false };
    var t = totals(d), m = month(d);
    return { has: true, income: t.income, spend: t.spend, gap: t.gap, after: t.after, month: { ahead: m.diff >= 0 ? m.diff : 0, short: m.diff < 0 ? -m.diff : 0, line: m.line } };
  }

  /* =====================================================================
     SPREADSHEETS: xlsx (read in the browser, no library) and csv
     ===================================================================== */
  // Raw deflate, small and complete (after RFC 1951 and Mark Adler's puff). Used when the browser has no DecompressionStream.
  var LB = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], LE = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
  var DB = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], DE = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
  var CLO = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
  function inflate(src) {
    var pos = 0, bit = 0, bc = 0, out = new Uint8Array(Math.max(1024, src.length * 4)), op = 0;
    function grow(n) { if (op + n <= out.length) return; var b = new Uint8Array(Math.max(out.length * 2, op + n)); b.set(out); out = b; }
    function bits(n) { while (bc < n) { if (pos >= src.length) throw new Error('short'); bit |= src[pos++] << bc; bc += 8; } var v = bit & ((1 << n) - 1); bit >>>= n; bc -= n; return v; }
    function build(len, n) { var c = new Uint16Array(16), o = new Uint16Array(16), s = new Uint16Array(n), i; for (i = 0; i < n; i++) c[len[i]]++; c[0] = 0; for (i = 1; i < 16; i++) o[i] = o[i - 1] + c[i - 1]; for (i = 0; i < n; i++) if (len[i]) s[o[len[i]]++] = i; return { c: c, s: s }; }
    function dec(h) { var code = 0, first = 0, idx = 0; for (var l = 1; l < 16; l++) { code |= bits(1); var k = h.c[l]; if (code - k < first) return h.s[idx + (code - first)]; idx += k; first += k; first <<= 1; code <<= 1; } throw new Error('bad code'); }
    var FL, FD;
    function fixed() { if (FL) return; var l = new Uint8Array(288), i; for (i = 0; i < 144; i++) l[i] = 8; for (; i < 256; i++) l[i] = 9; for (; i < 280; i++) l[i] = 7; for (; i < 288; i++) l[i] = 8; FL = build(l, 288); var dd = new Uint8Array(30); dd.fill(5); FD = build(dd, 30); }
    function codes(lt, dt) {
      for (;;) {
        var sym = dec(lt);
        if (sym < 256) { grow(1); out[op++] = sym; }
        else if (sym === 256) return;
        else { sym -= 257; var len = LB[sym] + bits(LE[sym]), ds = dec(dt), dist = DB[ds] + bits(DE[ds]); grow(len); for (var i = 0; i < len; i++) { out[op] = out[op - dist]; op++; } }
      }
    }
    var last;
    do {
      last = bits(1); var type = bits(2);
      if (type === 0) { bit = 0; bc = 0; var n = src[pos] | (src[pos + 1] << 8); pos += 4; grow(n); out.set(src.subarray(pos, pos + n), op); op += n; pos += n; }
      else if (type === 1) { fixed(); codes(FL, FD); }
      else if (type === 2) {
        var hl = bits(5) + 257, hd = bits(5) + 1, hc = bits(4) + 4, cl = new Uint8Array(19), i;
        for (i = 0; i < hc; i++) cl[CLO[i]] = bits(3);
        var ch = build(cl, 19), ln = new Uint8Array(hl + hd);
        for (i = 0; i < hl + hd;) { var s = dec(ch); if (s < 16) ln[i++] = s; else { var rep = 0, val = 0; if (s === 16) { val = ln[i - 1]; rep = 3 + bits(2); } else if (s === 17) rep = 3 + bits(3); else rep = 11 + bits(7); while (rep--) ln[i++] = val; } }
        codes(build(ln.subarray(0, hl), hl), build(ln.subarray(hl), hd));
      } else throw new Error('bad block');
    } while (!last);
    return out.subarray(0, op);
  }
  function inflateRaw(u8) {
    if (typeof DecompressionStream === 'function' && !GGMoneyTest.noStreams) {
      try { var ds = new DecompressionStream('deflate-raw'); return new Response(new Blob([u8]).stream().pipeThrough(ds)).arrayBuffer().then(function (b) { return new Uint8Array(b); }, function () { return inflate(u8); }); } catch (e) {}
    }
    return Promise.resolve().then(function () { return inflate(u8); });
  }
  function deflateRaw(u8) {
    if (typeof CompressionStream !== 'function' || GGMoneyTest.noStreams) return Promise.resolve(null);
    try { var cs = new CompressionStream('deflate-raw'); return new Response(new Blob([u8]).stream().pipeThrough(cs)).arrayBuffer().then(function (b) { return new Uint8Array(b); }, function () { return null; }); } catch (e) { return Promise.resolve(null); }
  }
  var GGMoneyTest = { noStreams: false };
  // The files inside a zip (an xlsx is one): {name: bytes} for the names wanted.
  function unzip(buf, want) {
    var u8 = new Uint8Array(buf), dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength), e = -1;
    for (var i = u8.length - 22; i >= Math.max(0, u8.length - 66000); i--) if (dv.getUint32(i, true) === 0x06054b50) { e = i; break; }
    if (e < 0) return Promise.reject(new Error('zip'));
    var n = dv.getUint16(e + 10, true), p = dv.getUint32(e + 16, true), jobs = [], files = {}, td = new TextDecoder();
    for (var k = 0; k < n; k++) {
      if (dv.getUint32(p, true) !== 0x02014b50) break;
      var meth = dv.getUint16(p + 10, true), csz = dv.getUint32(p + 20, true), nl = dv.getUint16(p + 28, true), xl = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), lo = dv.getUint32(p + 42, true);
      var name = td.decode(u8.subarray(p + 46, p + 46 + nl)); p += 46 + nl + xl + cl;
      if (want && !want(name)) continue;
      var ds = lo + 30 + dv.getUint16(lo + 26, true) + dv.getUint16(lo + 28, true), raw = u8.subarray(ds, ds + csz);
      (function (name, meth, raw) { jobs.push((meth === 0 ? Promise.resolve(raw) : meth === 8 ? inflateRaw(raw) : Promise.resolve(null)).then(function (b) { if (b) files[name] = b; })); })(name, meth, raw);
    }
    return Promise.all(jobs).then(function () { return files; });
  }
  function colIdx(ref) { var m = /^([A-Z]+)/.exec(ref || ''), n = 0; if (!m) return -1; for (var i = 0; i < m[1].length; i++) n = n * 26 + (m[1].charCodeAt(i) - 64); return n - 1; }
  function colName(i) { var s = ''; i++; while (i > 0) { var m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; }
  function kids(el, tag) { var out = []; for (var c = el.firstElementChild; c; c = c.nextElementSibling) if (c.localName === tag) out.push(c); return out; }
  function textOf(el) { var s = ''; var ts = el.getElementsByTagNameNS('*', 't'); for (var i = 0; i < ts.length; i++) { var p = ts[i].parentNode; if (p && p.localName === 'rPh') continue; s += ts[i].textContent; } return s; }
  // Sheets from an xlsx file: [{name, rows: [[cell, ...]]}], cells as numbers or text.
  function readXlsx(buf) {
    return unzip(buf, function (n) { return /^xl\/(workbook\.xml|_rels\/workbook\.xml\.rels|sharedStrings\.xml|worksheets\/[^/]+\.xml)$/.test(n); }).then(function (f) {
      var td = new TextDecoder(), P = new DOMParser();
      function x(n) { return f[n] ? P.parseFromString(td.decode(f[n]), 'application/xml') : null; }
      var wb = x('xl/workbook.xml'), rel = x('xl/_rels/workbook.xml.rels'), ss = x('xl/sharedStrings.xml');
      if (!wb) throw new Error('workbook');
      var strs = ss ? Array.prototype.map.call(ss.getElementsByTagNameNS('*', 'si'), textOf) : [];
      var tg = {}; if (rel) Array.prototype.forEach.call(rel.getElementsByTagNameNS('*', 'Relationship'), function (r) { tg[r.getAttribute('Id')] = r.getAttribute('Target'); });
      return Array.prototype.map.call(wb.getElementsByTagNameNS('*', 'sheet'), function (s, i) {
        var rid = s.getAttribute('r:id') || s.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id'), t = tg[rid] || ('worksheets/sheet' + (i + 1) + '.xml');
        t = t.replace(/^\/?xl\//, '').replace(/^\//, ''); var doc = x('xl/' + t), rows = [];
        if (doc) Array.prototype.forEach.call(doc.getElementsByTagNameNS('*', 'row'), function (r, ri) {
          var rn = (+r.getAttribute('r') || ri + 1) - 1, row = rows[rn] = rows[rn] || [];
          kids(r, 'c').forEach(function (c, ci) {
            var ref = c.getAttribute('r'), col = ref ? colIdx(ref) : ci, ty = c.getAttribute('t') || 'n', v = kids(c, 'v')[0], val = null;
            if (ty === 's') val = v ? strs[+v.textContent] : null;
            else if (ty === 'inlineStr') { var is = kids(c, 'is')[0]; val = is ? textOf(is) : null; }
            else if (ty === 'str' || ty === 'e') val = v ? v.textContent : null;
            else if (ty === 'b') val = v ? v.textContent === '1' : null;
            else val = v && v.textContent !== '' ? +v.textContent : null;
            row[col] = val;
          });
        });
        for (var j = 0; j < rows.length; j++) if (!rows[j]) rows[j] = [];
        return { name: s.getAttribute('name') || 'Sheet ' + (i + 1), rows: rows };
      });
    });
  }
  function readCsv(text) {
    text = String(text || '').replace(/^\uFEFF/, ''); var rows = [], row = [], cell = '', q = false, i, ch, sep = ',';
    var first = text.split(/\r?\n/)[0] || ''; if ((first.match(/;/g) || []).length > (first.match(/,/g) || []).length) sep = ';'; if ((first.match(/\t/g) || []).length > (first.match(new RegExp(sep, 'g')) || []).length) sep = '\t';
    for (i = 0; i < text.length; i++) {
      ch = text[i];
      if (q) { if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += ch; }
      else if (ch === '"') q = true;
      else if (ch === sep) { row.push(cell); cell = ''; }
      else if (ch === '\n' || ch === '\r') { if (ch === '\r' && text[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
      else cell += ch;
    }
    if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
    return [{ name: 'CSV', rows: rows.map(function (r) { return r.map(function (c) { var n = num(c); return c.trim() === '' ? null : n != null && /^\s*\$?\s*-?[\d,]*\.?\d+\s*$/.test(c) ? n : c.trim(); }); }) }];
  }
  function cellText(v) { return v == null ? '' : String(v).replace(/\s+/g, ' ').trim(); }
  function statusOf(v) { var s = cellText(v).toLowerCase(); if (!s) return 'fixed'; if (/pre.?tax|before tax/.test(s)) return 'pretax'; if (/hold|pause/.test(s)) return 'hold'; if (/estimat|vari|flex|change/.test(s)) return 'varies'; return 'fixed'; }
  function freqText(v) { var s = cellText(v).toLowerCase(); if (!s) return 'm'; if (/spread/.test(s)) return 's'; if (/two week|bi.?week|every 2|26/.test(s)) return 'b'; if (/twice|semi|half/.test(s)) return 'h'; if (/year|annual/.test(s)) return 'y'; return 'm'; }
  function cleanName(s) {
    s = cellText(s); var note = '', i = s.indexOf('(');
    if (i > 0) { note = s.slice(i + 1).replace(/\)\s*$/, '').trim(); s = s.slice(0, i).trim(); }
    if (s && !/[a-z]/.test(s) && s.length > 3) s = s.toLowerCase().replace(/\b[a-z]/g, function (c) { return c.toUpperCase(); });
    return { n: s, o: note };
  }
  function rangeOf(v) {
    if (typeof v === 'number') return { lo: v, hi: v };
    var m = cellText(v).replace(/,/g, '').match(/\d+(?:\.\d+)?/g); if (!m) return null;
    var a = +m[0], b = m[1] != null ? +m[1] : a; return { lo: Math.min(a, b), hi: Math.max(a, b) };
  }
  var SKIP_NAME = /^(totals?|sub ?totals?|expenses?|income|budget|name|item|category|description|amount)$/i;
  // The Joy family sheet shape: status in A, name in C, amount in E; income name in G, amount in I, range text in J.
  var JOY = { name: 2, amount: 4, status: 0, freq: -1, note: -1, iname: 6, iamount: 8, irange: 9 };
  function looksJoy(rows) {
    var n = 0; rows.forEach(function (r) { if (/^(pre ?tax|active|estimate|on hold|fixed|varies|before taxes)$/i.test(cellText(r[0])) && cellText(r[2]) && num(r[4]) != null) n++; }); return n >= 3;
  }
  function guessMap(sheet) {
    var rows = sheet.rows; if (looksJoy(rows)) return Object.assign({ joy: 1 }, JOY);
    var h = -1, m = { name: -1, amount: -1, status: -1, freq: -1, note: -1, iname: -1, iamount: -1, irange: -1 };
    for (var i = 0; i < Math.min(rows.length, 8); i++) { var r = rows[i] || []; if (r.filter(function (c) { return typeof c === 'string'; }).length >= 2 && r.every(function (c) { return c == null || typeof c === 'string'; })) { h = i; break; } }
    if (h >= 0) (rows[h] || []).forEach(function (c, j) {
      var s = cellText(c).toLowerCase();
      if (m.name < 0 && /name|item|expense|bill|category|description|what/.test(s)) m.name = j;
      else if (m.amount < 0 && /amount|cost|monthly|budget|planned|\$|total/.test(s)) m.amount = j;
      else if (m.status < 0 && /status|type|kind/.test(s)) m.status = j;
      else if (m.freq < 0 && /often|frequen|freq|period|cycle/.test(s)) m.freq = j;
      else if (m.note < 0 && /note|memo|comment/.test(s)) m.note = j;
    });
    var body = rows.slice(h + 1, h + 30), w = body.reduce(function (x, r) { return Math.max(x, r.length); }, 0);
    for (var j = 0; j < w && (m.name < 0 || m.amount < 0); j++) {
      var t = 0, nn = 0; body.forEach(function (r) { if (typeof r[j] === 'string' && r[j].trim()) t++; if (num(r[j]) != null) nn++; });
      if (m.name < 0 && t >= 2 && t >= nn) m.name = j; else if (m.amount < 0 && nn >= 2 && j !== m.name) m.amount = j;
    }
    m.header = h; return m;
  }
  // Lines and income from a sheet and a map of columns (-1 leaves a column out).
  function fromSheet(sheet, map) {
    var lines = [], income = [], rows = sheet.rows, start = map.header >= 0 ? map.header + 1 : 0;
    for (var i = start; i < rows.length; i++) {
      var r = rows[i] || [];
      if (map.name >= 0 && map.amount >= 0) {
        var cn = cleanName(r[map.name]), a = num(r[map.amount]);
        if (cn.n && !SKIP_NAME.test(cn.n) && a != null) {
          var note = [cn.o, map.note >= 0 ? cellText(r[map.note]) : ''].filter(Boolean).join('. ');
          lines.push({ n: cn.n, a: Math.abs(r2(a)), f: map.freq >= 0 ? freqText(r[map.freq]) : 'm', s: map.status >= 0 ? statusOf(r[map.status]) : 'fixed', o: note });
        }
      }
      if (map.iname >= 0 && (map.iamount >= 0 || map.irange >= 0)) {
        var ci = cleanName(r[map.iname]), ia = map.iamount >= 0 ? num(r[map.iamount]) : null, rg = map.irange >= 0 ? rangeOf(r[map.irange]) : null;
        if (ci.n && !SKIP_NAME.test(ci.n) && (ia != null || rg)) {
          if (ia == null) ia = rg ? (rg.lo + rg.hi) / 2 : 0;
          income.push({ n: ci.n, a: Math.abs(r2(ia)), lo: rg ? r2(rg.lo) : null, hi: rg ? r2(rg.hi) : null, o: ci.o });
        }
      }
    }
    return { lines: lines, income: income };
  }
  function pickSheet(sheets) { var j = sheets.filter(function (s) { return looksJoy(s.rows); })[0]; return j || sheets.filter(function (s) { return /summary|budget|plan/i.test(s.name); })[0] || sheets[0]; }
  function readFile(file) {
    var isX = /\.xlsx$/i.test(file.name || '') || /spreadsheetml/.test(file.type || '');
    return isX ? file.arrayBuffer().then(readXlsx) : file.text().then(readCsv);
  }
  function applyImport(d, got, mode) {
    if (mode === 'replace') { live(d.lines).forEach(function (l) { remove(l); }); live(d.income).forEach(function (l) { remove(l); }); }
    got.lines.forEach(function (l) { addLine(d, l); }); got.income.forEach(function (l) { addIncome(d, l); }); touch(d);
  }

  /* =====================================================================
     FAMILY SHARING (a QR code made on this device, or the link)
     The code: 'z' + base64url(raw deflate(JSON)) when the browser can compress, else 'j' + base64url(JSON). The JSON:
     {v: 1, p: plan id, t: time, l: [[id, name, amount, how often, status, note, u, removed]], i: [[id, name, amount, lo, hi, note, u, removed]],
      g: [[id, YYYYMMDD, amount, line id, category, u, removed]] (this month and last), k: ideas {d: done keys, e: amounts, o: hidden, m: [[id, name, amount, kind, note, u, removed]], u}}
     Merging: lines, income, and own ideas by id, the newest edit wins (a removal is an edit); logged spending from both phones is kept.
     A phone joining another plan keeps its own plan aside (own) for Return to My Own Plan.
     ===================================================================== */
  function b64u(u8) { var s = ''; for (var i = 0; i < u8.length; i += 8192) s += String.fromCharCode.apply(null, u8.subarray(i, i + 8192)); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function unb64u(s) { s = String(s).replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function packOf(d) {
    var since = (function () { var x = new Date(); x.setDate(1); x.setMonth(x.getMonth() - 1); return monthKey(x); })();
    var I2 = d.ideas, all = [].concat(d.lines, d.income, d.logs, I2.mine).map(function (x) { return +x.u || 0; }).filter(Boolean), t0 = all.length ? Math.min.apply(null, all) : Date.now();
    var U = function (u) { return Math.max(0, Math.floor(((+u || t0) - t0) / 1000)).toString(36); };
    return {
      v: 1, p: d.pid, t: Date.now(), o: t0,
      l: d.lines.map(function (l) { return [l.id, l.n, l.a, l.f, l.s, l.o || '', U(l.u), l.x ? 1 : 0]; }),
      i: d.income.map(function (s) { return [s.id, s.n, s.a, s.lo, s.hi, s.o || '', U(s.u), s.x ? 1 : 0]; }),
      g: d.logs.filter(function (g) { return String(g.d || '').slice(0, 7) >= since; }).map(function (g) { return [g.id, String(g.d).replace(/-/g, ''), g.a, g.c || '', g.c ? '' : g.n || '', U(g.u), g.x ? 1 : 0]; }),
      k: { d: Object.keys(I2.done), e: I2.edit, o: Object.keys(I2.off), m: I2.mine.map(function (m) { return [m.id, m.n, m.a, m.k, m.o || '', U(m.u), m.x ? 1 : 0]; }), u: I2.u }
    };
  }
  function encode(d) {
    var js = JSON.stringify(packOf(d)), u8 = new TextEncoder().encode(js);
    return deflateRaw(u8).then(function (z) { return z && z.length < u8.length ? 'z' + b64u(z) : 'j' + b64u(u8); });
  }
  function codeFrom(s) { s = String(s || '').trim(); var m = /#money=([A-Za-z0-9_-]+)/.exec(s); if (m) return m[1]; return /^[zj][A-Za-z0-9_-]{8,}$/.test(s) ? s : ''; }
  function decode(s) {
    var c = codeFrom(s); if (!c) return Promise.reject(new Error('code'));
    var u8; try { u8 = unb64u(c.slice(1)); } catch (e) { return Promise.reject(new Error('code')); }
    return (c[0] === 'z' ? inflateRaw(u8) : Promise.resolve(u8)).then(function (b) {
      var j = JSON.parse(new TextDecoder().decode(b)); if (!j || j.v !== 1 || !j.p || !Array.isArray(j.l)) throw new Error('code'); return j;
    });
  }
  function unpack(j) {
    var ymd8 = function (s) { s = String(s || ''); return s.length === 8 ? s.slice(0, 4) + '-' + s.slice(4, 6) + '-' + s.slice(6) : today(); };
    var fx = function (o, x) { if (x) o.x = 1; return o; };
    var k = obj(j.k), t0 = +j.o || 0, U = function (v) { return typeof v === 'string' ? t0 + parseInt(v, 36) * 1000 : +v || 0; };
    return {
      pid: String(j.p),
      lines: arr(j.l).map(function (r) { return fx({ id: String(r[0]), n: String(r[1] || ''), a: +r[2] || 0, f: FREQ[r[3]] ? r[3] : 'm', s: STATUS[r[4]] ? r[4] : 'fixed', o: String(r[5] || ''), u: U(r[6]) }, r[7]); }),
      income: arr(j.i).map(function (r) { return fx({ id: String(r[0]), n: String(r[1] || ''), a: +r[2] || 0, lo: r[3] == null ? null : +r[3], hi: r[4] == null ? null : +r[4], o: String(r[5] || ''), u: U(r[6]) }, r[7]); }),
      logs: arr(j.g).map(function (r) { return fx({ id: String(r[0]), d: ymd8(r[1]), a: +r[2] || 0, c: String(r[3] || ''), n: String(r[4] || ''), u: U(r[5]) }, r[6]); }),
      ideas: { done: arr(k.d).reduce(function (o, x) { o[x] = 1; return o; }, {}), edit: obj(k.e), off: arr(k.o).reduce(function (o, x) { o[x] = 1; return o; }, {}),
        mine: arr(k.m).map(function (r) { return fx({ id: String(r[0]), n: String(r[1] || ''), a: +r[2] || 0, k: r[3] === 'income' ? 'income' : 'spend', o: String(r[4] || ''), u: U(r[5]) }, r[6]); }), u: +k.u || 0 }
    };
  }
  function mergeList(mine, theirs) {
    var by = {}, out = mine.slice(), added = 0, changed = 0;
    out.forEach(function (x, i) { by[x.id] = i; });
    theirs.forEach(function (t) { var i = by[t.id]; if (i == null) { out.push(t); by[t.id] = out.length - 1; if (!t.x) added++; } else if ((+t.u || 0) > (+out[i].u || 0)) { out[i] = t; changed++; } });
    return { list: out, added: added, changed: changed };
  }
  function merge(d, j) {
    var t = unpack(j), joined = false;
    if (t.pid !== d.pid) {
      if (live(d.lines).length || live(d.income).length) d.own = d.own || { pid: d.pid, lines: d.lines, income: d.income, ideas: d.ideas };
      d.pid = t.pid; d.lines = []; d.income = []; d.ideas = { done: {}, edit: {}, off: {}, mine: [], u: 0 }; joined = true;
    }
    var a = mergeList(d.lines, t.lines), b = mergeList(d.income, t.income), g = mergeList(d.logs, t.logs), m = mergeList(d.ideas.mine, t.ideas.mine);
    d.lines = a.list; d.income = b.list; d.logs = g.list; d.ideas.mine = m.list;
    if (t.ideas.u > (d.ideas.u || 0)) { d.ideas.done = t.ideas.done; d.ideas.edit = t.ideas.edit; d.ideas.off = t.ideas.off; d.ideas.u = t.ideas.u; }
    touch(d);
    return { joined: joined, lines: a.added + a.changed + b.added + b.changed, logs: g.added };
  }
  function leave(d) { if (!d.own) return false; d.pid = d.own.pid; d.lines = d.own.lines; d.income = d.own.income; d.ideas = d.own.ideas; delete d.own; norm(d); touch(d); return true; }

  /* ---------- the QR code (shared/vendor/qrcode.js, loaded the first time Share opens) ---------- */
  var QRP = null;
  function qrLoad(src) {
    if (window.qrcode) return Promise.resolve(true); if (QRP) return QRP;
    return (QRP = new Promise(function (ok) { var s = document.createElement('script'); s.src = src; s.onload = function () { ok(!!window.qrcode); }; s.onerror = function () { QRP = null; ok(false); }; document.head.appendChild(s); }));
  }
  function qrSvg(text) {
    if (!window.qrcode) return '';
    var lv = ['L'];
    for (var t = 0; t < lv.length; t++) {
      try {
        var q = window.qrcode(0, lv[t]); q.addData(text, 'Byte'); q.make(); var n = q.getModuleCount(), m = 4, N = n + m * 2, p = '';
        for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) if (q.isDark(r, c)) p += 'M' + (c + m) + ' ' + (r + m) + 'h1v1h-1z';
        var k = Math.max(2, Math.floor(320 / N));
        return '<svg width="' + N * k + '" height="' + N * k + '" viewBox="0 0 ' + N + ' ' + N + '" shape-rendering="crispEdges" aria-hidden="true" focusable="false" data-modules="' + n + '"><rect width="' + N + '" height="' + N + '" fill="#fff"/><path d="' + p + '" fill="#111"/></svg>';
      } catch (e) {}
    }
    return '';
  }

  /* =====================================================================
     THE SCREENS
     ===================================================================== */
  var TABS = [
    { v: 'gap', n: 'Close the Gap', i: 'gap' }, { v: 'plan', n: 'My Plan', i: 'list' }, { v: 'month', n: 'This Month', i: 'cal', m: 1 },
    { v: 'log', n: 'Log', i: 'tap', m: 1 }, { v: 'check', n: 'Check-in', i: 'leaf', m: 1 }, { v: 'tools', n: 'Tools', i: 'grid' }
  ];
  var TITLE = { gap: 'Close the Gap', plan: 'My Plan', month: 'This Month', log: 'Log Spending', check: 'Weekly Money Check-in', import: 'Bring In a Spreadsheet', share: 'Share With Family', tools: 'Tools and Calculators' };
  var LINE = { gap: 'Tend your money, and your Branches grow.', plan: 'Every line, calm and clear.', month: 'Where this month is going.', log: 'One tap, and back to your day.', check: 'A calm look each week keeps money peaceful.', import: 'Start from the sheet you already keep.', share: 'One plan for your home, on each phone.', tools: 'Ways to save, earn, and plan, all on this device.' };
  var COMMON = [
    { n: 'Rent or Mortgage', s: 'fixed' }, { n: 'Groceries', s: 'varies' }, { n: 'Energy', s: 'varies' }, { n: 'Water and Trash', s: 'fixed' },
    { n: 'Phone Plan', s: 'fixed' }, { n: 'Car Payment', s: 'fixed' }, { n: 'Car Insurance', s: 'fixed' }, { n: 'Gas for the Car', s: 'varies' },
    { n: 'Health Costs', s: 'varies' }, { n: 'Giving', s: 'fixed' }, { n: 'Gifts', s: 'varies', f: 'y' }, { n: 'Savings', s: 'fixed' }
  ];

  function render(el, opts) {
    opts = opts || {};
    if (!el) return null;
    mountIcons();
    if (opts.css !== false && !document.getElementById('gm-css')) { var lk = document.createElement('link'); lk.id = 'gm-css'; lk.rel = 'stylesheet'; lk.href = opts.cssHref || HERE + 'gg-money.css?v=' + V; document.head.appendChild(lk); }
    var st = storeOf(opts.store), S = { view: opts.view || 'gap', pick: null, map: null, sheets: null, mode: 'replace', inc: null, share: null, more: {}, undo: null, addIdea: false, logAmt: '', logDate: '', chk: null, showOff: false, leaves: -1, tw: {} };
    var ART = opts.art || '/shared/heroes/way/';
    function art(name) { return typeof ART === 'function' ? ART(name) : ART + name; }
    var root = document.createElement('div'); root.className = 'gm'; el.innerHTML = ''; el.appendChild(root);
    var toastEl = null, toastT = 0;
    function member() { var m = opts.member; return typeof m === 'function' ? !!m() : !!m; }
    function D() { return st.ok() ? st.get() : null; }
    function save() { try { var p = st.put(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
    function say(msg, undo) {
      if (opts.toast && !undo) return opts.toast(msg);
      if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'gm gm-toastwrap'; toastEl.setAttribute('role', 'status'); toastEl.setAttribute('aria-live', 'polite'); document.body.appendChild(toastEl); }
      toastEl.innerHTML = '<div class="gm-toast"><span>' + esc(msg) + '</span>' + (undo ? '<button type="button" class="gm-tbtn" data-gm="undo">Undo</button>' : '') + '</div>';
      toastEl.onclick = function (e) { if (e.target.closest('[data-gm="undo"]')) { act('undo'); toastEl.innerHTML = ''; } };
      clearTimeout(toastT); toastT = setTimeout(function () { if (toastEl) toastEl.innerHTML = ''; }, undo ? 6000 : 3200);
    }
    function allowed(v) {
      if (/^tool:/.test(v)) { var T = TL() && TL().get(v.slice(5)); return !TL() || (!!T && (member() || !!T.start)); }
      var t = TABS.filter(function (x) { return x.v === v; })[0]; if (v === 'share') return member(); return !t || !t.m || member();
    }
    /* ----- the tools (shared/gg-money-tools.js, loaded once) ----- */
    function TL() { return window.GGMoneyTools || null; }
    var toolsP = null;
    function loadTools() {
      if (TL()) { TL().use(UTIL); return Promise.resolve(true); }
      if (toolsP) return toolsP;
      return (toolsP = new Promise(function (ok) { var sc = document.createElement('script'); sc.src = opts.toolsSrc || HERE + 'gg-money-tools.js?v=' + V; sc.onload = function () { if (TL()) TL().use(UTIL); ok(!!TL()); }; sc.onerror = function () { toolsP = null; ok(false); }; document.head.appendChild(sc); }));
    }
    function tstate(d, id) { var t = d.tools[id]; if (!t || typeof t !== 'object') t = d.tools[id] = {}; return t; }
    function tctx(d, id) { return { d: d, t: tstate(d, id), U: UTIL, save: save, paint: paint, say: say, go: go, member: member, celebrate: celebrate }; }
    function go(v) { if (!TITLE[v] && !/^tool:[a-z]+$/.test(v)) v = 'gap'; if (!allowed(v)) v = 'gap'; if (v === 'share') S.share = null; S.view = v; paint(); if (opts.onView) try { opts.onView(v); } catch (e) {} try { root.scrollIntoView && root.getBoundingClientRect().top < 0 && root.scrollIntoView({ block: 'start' }); } catch (e) {} }

    /* ----- painting ----- */
    function paint() {
      var d = D();
      if (!d) { root.innerHTML = '<div class="gm-card gm-hello">' + head() + '<p class="gm-sub">Open your profile to see your money plan. It stays locked on this device with your passcode.</p>' + (window.GGP && GGP.require ? '<div class="gm-acts"><button type="button" class="gm-btn" data-gm="unlock">Open My Profile</button></div>' : '') + '</div>'; return; }
      if (!allowed(S.view)) S.view = 'gap';
      var tid = /^tool:(.+)$/.exec(S.view), body = tid ? vTool(d, tid[1]) : { gap: vGap, plan: vPlan, month: vMonth, log: vLog, check: vCheck, import: vImport, share: vShare, tools: vTools }[S.view](d);
      root.innerHTML = '<div class="gm-shell">' + head() + tabs() + (S.inc ? vIncoming(d) : '') + '<div class="gm-body" data-gm-view="' + (tid ? 'tool' : S.view) + '"' + (tid ? ' data-tool="' + esc(tid[1]) + '"' : '') + '>' + body + '</div></div>';
    }
    // The painted header: Grounded's Branches painting (a nest in the oak), the place, and one warm line.
    function head() {
      var tid = /^tool:(.+)$/.exec(S.view), T = tid && TL() && TL().get(tid[1]);
      var title = T ? T.n : TITLE[S.view] || 'Grounded Money', line = T ? T.sub : LINE[S.view] || '';
      return '<header class="gm-hero' + (S.view === 'gap' ? ' tall' : '') + '"><img class="gm-hero-art" src="' + esc(art('tree-branches.webp')) + '" alt="" loading="lazy" decoding="async" onerror="this.remove()">' +
        '<div class="gm-hero-tx"><span class="gm-badge">' + I('coin') + '</span><div><div class="gm-k">Grounded Money · Branches</div><h2 class="gm-h2">' + esc(title) + '</h2>' + (line ? '<p>' + esc(line) + '</p>' : '') + '</div></div></header>';
    }
    function tabs() {
      return '<nav class="gm-tabs" aria-label="Grounded Money">' + TABS.filter(function (t) { return !t.m || member(); }).map(function (t) {
        var on = S.view === t.v || (t.v === 'plan' && (S.view === 'import' || S.view === 'share')) || (t.v === 'tools' && /^tool:/.test(S.view));
        return '<button type="button" class="gm-tab" data-gm="go:' + t.v + '"' + (on ? ' aria-current="page"' : '') + '>' + I(t.i) + '<span>' + esc(t.n) + '</span></button>';
      }).join('') + '</nav>';
    }
    function memberLine() {
      if (member()) return '';
      var b = opts.onMembership ? '<div class="gm-acts"><button type="button" class="gm-btn sm" data-gm="mem:see">See Membership</button><button type="button" class="gm-btn sm line" data-gm="mem:code">I Have a Code</button></div>' : '';
      return '<div class="gm-card gm-mem"><p class="gm-sub">Membership adds This Month, one tap logging, a weekly money check-in, one shared plan with your family, and every Grounded Money tool.</p>' + b + '</div>';
    }
    function sumRow(t) {
      var g = t.gap;
      return '<div class="gm-sums" aria-live="polite"><div><span class="gm-k">Income a Month</span><b>' + money(t.income) + '</b>' + (t.lo !== t.hi ? '<small>' + money(t.lo) + ' to ' + money(t.hi) + '</small>' : '') + '</div>' +
        '<div><span class="gm-k">Spending a Month</span><b>' + money(t.spend) + '</b></div>' +
        '<div class="' + (g >= 0 ? 'ok' : 'gp') + '"><span class="gm-k">' + (g >= 0 ? 'Ahead' : 'Gap') + '</span><b>' + money(Math.abs(g)) + '</b></div></div>';
    }

    /* Close the Gap */
    function vGap(d) {
      if (!live(d.lines).length && !live(d.income).length) {
        return '<div class="gm-card gm-hello"><h3 class="gm-h3">Let\u2019s build your monthly plan.</h3><p class="gm-sub">Bring in the spreadsheet you already use, or start with a few common lines. Then Close the Gap shows ideas that fit your own numbers. Everything stays on this device.</p>' +
          '<div class="gm-acts"><button type="button" class="gm-btn" data-gm="go:import">' + I('up') + 'Bring In a Spreadsheet</button><button type="button" class="gm-btn line" data-gm="common">Start With Common Lines</button></div></div>' + memberLine();
      }
      var t = totals(d), short = t.gap < 0, start = Math.abs(Math.min(0, t.gap)), left = Math.max(0, -t.after), pct = start ? Math.min(100, Math.round(t.saved / start * 100)) : 100;
      var top, tr = tree(pct);
      if (short) {
        top = '<div class="gm-card gm-gap' + (left === 0 ? ' closed' : '') + '">' + tr + '<span class="gm-k">' + (left === 0 ? 'The Gap Is Closed' : 'Your Monthly Gap') + '</span>' +
          '<div class="gm-big" data-gm-gap="' + left + '">' + money(left) + '</div><p class="gm-sub">' + (left === 0 ? 'Your chosen ideas close the gap, with ' + money(t.after) + ' a month to spare for savings and giving.' : t.saved ? 'a month to close, down from ' + money(start) + '.' : 'a month to close. Each idea you choose brings it closer.') + '</p>' +
          '<div class="gm-bar" role="img" aria-label="' + pct + ' percent of the gap closed"><span style="width:' + pct + '%"></span></div>' +
          (t.saved ? '<p class="gm-mini">Ideas you chose: ' + money(t.saved) + ' a month</p>' : '') + '</div>';
      } else {
        top = '<div class="gm-card gm-gap closed">' + tr + '<span class="gm-k">Ahead Each Month</span><div class="gm-big" data-gm-gap="0">' + money(t.after) + '</div><p class="gm-sub">Your income covers your plan. The ideas below grow what you keep for savings and giving.</p></div>';
      }
      var vis = t.ideas.filter(function (x) { return !x.off; }), hid = t.ideas.filter(function (x) { return x.off; });
      var cards = vis.map(ideaCard).join('');
      var mine = S.addIdea ? '<div class="gm-card gm-add"><h3 class="gm-h4">Add Your Own Idea</h3><label class="gm-f"><span>Idea</span><input class="gm-in" id="gm-in-n" maxlength="80" placeholder="Sell the extra bike"></label>' +
        '<div class="gm-two"><label class="gm-f"><span>About how much a month</span><input class="gm-in" id="gm-in-a" inputmode="decimal" placeholder="50"></label><label class="gm-f"><span>It</span><select class="gm-in" id="gm-in-k"><option value="spend">Saves</option><option value="income">Adds Income</option></select></label></div>' +
        '<div class="gm-acts"><button type="button" class="gm-btn sm" data-gm="idea:addsave">Add Idea</button><button type="button" class="gm-btn sm line" data-gm="idea:addcancel">Done</button></div></div>'
        : '<div class="gm-acts"><button type="button" class="gm-btn line sm" data-gm="idea:add">' + I('plus') + 'Add Your Own Idea</button></div>';
      var off = hid.length ? '<p class="gm-quiet"><button type="button" class="gm-linkbtn" data-gm="idea:showoff">' + (S.showOff ? 'Rest the hidden ideas' : 'Show ' + hid.length + ' hidden idea' + (hid.length > 1 ? 's' : '')) + '</button></p>' + (S.showOff ? hid.map(ideaCard).join('') : '') : '';
      return top + '<p class="gm-tend">' + I('leaf') + '<span>Branches is the part of your tree for the people you love. Tending your money is tending them: each idea you choose grows a leaf, and a closed gap bears fruit.</span></p>' +
        '<h3 class="gm-sec">Ideas From Your Own Plan</h3><div class="gm-ideas">' + cards + '</div>' + mine + off + tipCard() + memberLine();
    }
    function tipCard() {
      if (!TL()) return '';
      var T = TL(), i = T.tipOfWeek(), tip = T.tips[i];
      return '<div class="gm-card gm-tipwk"><span class="gm-k">This Week\u2019s Money Tip</span><p>' + esc(tip[1]) + '</p><button type="button" class="gm-linkbtn" data-gm="go:tool:tips">More Tips' + I('arrow') + '</button></div>';
    }
    /* The Branches tree: two buds always, a leaf for each step of the gap closed, and fruit once it is closed.
       Sage and Honey, like the breathing ring. New leaves open with a small grow (still, under reduced motion). */
    var LEAF = [[88, 74, -30], [132, 70, 30], [70, 92, -50], [150, 88, 45], [104, 52, -10], [118, 50, 15], [58, 72, -40], [162, 68, 40], [94, 40, -20], [128, 38, 25], [78, 58, -60], [146, 54, 55], [110, 30, 0], [64, 104, -70], [156, 102, 65], [100, 64, 10]];
    var FRUIT = [[84, 84], [136, 80], [110, 44], [70, 70], [150, 64], [118, 62]];
    function tree(pct) {
      var n = pct >= 100 ? LEAF.length : Math.max(2, Math.round(pct / 100 * (LEAF.length - 2))), was = S.leaves; S.leaves = n;
      var lv = LEAF.slice(0, n).map(function (l, i) { var c = ['#8DB38A', '#6E9C6B', '#A9CBA0'][i % 3]; return '<ellipse class="gm-leaf' + (was >= 0 && i >= was ? ' new' : '') + '" cx="' + l[0] + '" cy="' + l[1] + '" rx="9" ry="5" fill="' + c + '" transform="rotate(' + l[2] + ' ' + l[0] + ' ' + l[1] + ')"/>'; }).join('');
      var fr = pct >= 100 ? FRUIT.map(function (f, i) { return '<circle class="gm-fruit' + (was >= 0 && was < LEAF.length ? ' new' : '') + '" style="--i:' + i + '" cx="' + f[0] + '" cy="' + f[1] + '" r="5.5" fill="#DDA45A" stroke="#B9822F" stroke-width="1"/>'; }).join('') : '';
      return '<svg class="gm-tree" viewBox="0 0 220 150" role="img" aria-label="' + (pct >= 100 ? 'Your Branches tree in full leaf, bearing fruit' : 'Your Branches tree, ' + n + ' leaves growing') + '">' +
        '<ellipse cx="110" cy="142" rx="70" ry="6" class="gm-ground"/>' +
        '<path class="gm-trunk" d="M104 142c2-14 2-30 0-46M116 142c-2-14-2-30 0-46M104 96c-8-8-18-14-30-18M116 96c8-8 18-14 32-20M108 98c-2-18 0-34 2-50M110 70c-10-8-24-10-36-6M112 66c10-8 24-12 38-8M110 56c-6-8-8-14-8-20M111 54c6-6 12-12 18-14"/>' + lv + fr + '</svg>';
    }
    // A warm moment: a few leaves drift down over the card with a kind line (only a line under reduced motion).
    function celebrate(msg) {
      var box = document.createElement('div'); box.className = 'gm-cele'; box.setAttribute('role', 'status');
      var sp = ''; for (var i = 0; i < 14; i++) sp += '<span style="--x:' + (4 + (i * 37) % 92) + '%;--d:' + ((i * 0.17) % 1.4).toFixed(2) + 's;--r:' + ((i * 53) % 360) + 'deg" class="' + (i % 4 === 0 ? 'f' : '') + '"></span>';
      box.innerHTML = sp + '<p>' + I('sun') + esc(msg) + '</p>';
      var host = root.querySelector('.gm-shell') || root; host.appendChild(box);
      setTimeout(function () { if (box.parentNode) box.remove(); }, 4200);
    }

    /* Tools */
    function vTools(d) {
      if (!TL()) { loadTools().then(function (ok) { if (ok) paint(); }); return '<p class="gm-sub">Opening the tools\u2026</p>'; }
      var L = TL().list, open = L.filter(function (T) { return member() || T.start; }), rest = L.filter(function (T) { return !member() && !T.start; });
      return '<div class="gm-tools">' + open.map(toolCard).join('') + '</div>' +
        (rest.length ? '<div class="gm-card gm-mem"><span class="gm-k">With Membership</span><p class="gm-sub">' + esc(rest.map(function (T) { return T.n; }).join(', ')) + '.</p>' + (opts.onMembership ? '<div class="gm-acts"><button type="button" class="gm-btn sm" data-gm="mem:see">See Membership</button><button type="button" class="gm-btn sm line" data-gm="mem:code">I Have a Code</button></div>' : '') + '</div>' : '');
    }
    function toolCard(T) {
      return '<button type="button" class="gm-card gm-toolcard" data-gm="go:tool:' + T.id + '">' + (T.art ? '<span class="gm-art"><img src="' + esc(art(T.art)) + '" alt="" decoding="async" onerror="this.parentNode.classList.add(\'none\');this.remove()">' + I(T.i) + '</span>' : '<span class="gm-art none">' + I(T.i) + '</span>') +
        '<span class="gm-tx"><b>' + esc(T.n) + '</b><small>' + esc(T.sub) + '</small></span>' + I('arrow') + '</button>';
    }
    function vTool(d, id) {
      if (!TL()) { loadTools().then(function (ok) { if (ok) paint(); }); return '<p class="gm-sub">Opening the tool\u2026</p>'; }
      var T = TL().get(id); if (!T) return '<p class="gm-sub">This tool rests for now.</p>';
      var c = tctx(d, id); if (T.init) T.init(c.t, c);
      if (T.watch && !S.tw[id]) S.tw[id] = T.watch(c, null).state;
      return '<div class="gm-acts"><button type="button" class="gm-linkbtn" data-gm="go:tools">' + I('back') + 'All Tools</button></div>' +
        '<div class="gm-card gm-tform">' + T.form(c) + '</div><div class="gm-tres" aria-live="polite">' + T.out(c) + '</div>' + (T.start && !member() ? memberLine() : '');
    }
    function ideaCard(x) {
      var verb = x.k === 'income' ? 'Adds about ' : 'Saves about ';
      var ed = S.more['e:' + x.key];
      return '<div class="gm-card gm-idea' + (x.done ? ' done' : '') + (x.off ? ' off' : '') + '" data-key="' + esc(x.key) + '">' +
        '<button type="button" class="gm-tick" data-gm="idea:tick:' + esc(x.key) + '" aria-pressed="' + (x.done ? 'true' : 'false') + '" aria-label="' + esc((x.done ? 'Chosen: ' : 'Choose: ') + x.t) + '">' + I('check') + '</button>' +
        '<div class="gm-tx"><b>' + esc(x.t) + '</b>' + (x.how ? '<small>' + esc(x.how) + '</small>' : '') +
        (ed ? '<div class="gm-inl"><label class="gm-f"><span>' + verb + 'this much a month</span><input class="gm-in" inputmode="decimal" data-gmi="save:' + esc(x.key) + '" value="' + plain(x.save) + '"></label><button type="button" class="gm-btn sm" data-gm="idea:ed:' + esc(x.key) + '">Done</button></div>'
          : '<div class="gm-save"><span class="gm-pill">' + verb + money(x.save) + ' a month</span><button type="button" class="gm-linkbtn" data-gm="idea:ed:' + esc(x.key) + '">Change</button>' +
            (x.tool && TL() && TL().get(x.tool) && (member() || TL().get(x.tool).start) ? '<button type="button" class="gm-linkbtn" data-gm="go:tool:' + x.tool + '">' + esc(TL().get(x.tool).n) + I('arrow') + '</button>' : '') +
            (x.mine ? '<button type="button" class="gm-linkbtn" data-gm="idea:rm:' + esc(x.mine) + '">Remove</button>' : '<button type="button" class="gm-linkbtn" data-gm="idea:off:' + esc(x.key) + '">' + (x.off ? 'Show' : 'Hide') + '</button>') + '</div>') +
        '</div></div>';
    }

    /* My Plan */
    function selOpts(map, order, cur) { return order.map(function (k) { return '<option value="' + k + '"' + (k === cur ? ' selected' : '') + '>' + esc(map[k].n || map[k]) + '</option>'; }).join(''); }
    function lineRow(l) {
      var mo = l.f !== 'm' ? 'About ' + money(monthly(l)) + ' a month' : '', note = l.o || S.more['n:' + l.id];
      return '<div class="gm-line s-' + l.s + '" data-id="' + l.id + '" data-kind="line">' +
        '<div class="gm-lr1"><input class="gm-in gm-name" data-gmf="n" value="' + esc(l.n) + '" aria-label="Line name" placeholder="Name this line" maxlength="80">' +
        '<button type="button" class="gm-x" data-gm="rm:line:' + l.id + '" aria-label="Remove ' + esc(l.n || 'this line') + '">' + I('x') + '</button></div>' +
        '<div class="gm-lr2"><label class="gm-f"><span>Amount</span><input class="gm-in" data-gmf="a" inputmode="decimal" value="' + (l.a ? plain(l.a) : '') + '" placeholder="0"></label>' +
        '<label class="gm-f"><span>How Often</span><select class="gm-in" data-gmf="f">' + selOpts(FREQ, FREQ_ORDER, l.f) + '</select></label>' +
        '<label class="gm-f"><span>Status</span><select class="gm-in" data-gmf="s">' + selOpts(STATUS, STATUS_ORDER, l.s) + '</select></label></div>' +
        (note ? '<label class="gm-f gm-notef"><span>Note</span><input class="gm-in" data-gmf="o" value="' + esc(l.o || '') + '" maxlength="160"></label>' : '') +
        (l.s === 'hold' || mo || !note ? '<div class="gm-meta"><span class="gm-mo">' + esc(l.s === 'hold' ? 'On Hold rests outside the monthly total.' + (mo ? ' ' + mo + '.' : '') : mo) + '</span>' + (note ? '' : '<button type="button" class="gm-linkbtn" data-gm="note:' + l.id + '">Add a Note</button>') + '</div>' : '<span class="gm-mo" hidden></span>') + '</div>';
    }
    function incRow(s) {
      var note = s.o || S.more['n:' + s.id];
      return '<div class="gm-line" data-id="' + s.id + '" data-kind="income">' +
        '<div class="gm-lr1"><input class="gm-in gm-name" data-gmf="n" value="' + esc(s.n) + '" aria-label="Income name" placeholder="Name this income" maxlength="80">' +
        '<button type="button" class="gm-x" data-gm="rm:income:' + s.id + '" aria-label="Remove ' + esc(s.n || 'this income') + '">' + I('x') + '</button></div>' +
        '<div class="gm-lr2"><label class="gm-f"><span>A Month</span><input class="gm-in" data-gmf="a" inputmode="decimal" value="' + (s.a ? plain(s.a) : '') + '" placeholder="0"></label>' +
        '<label class="gm-f"><span>Low</span><input class="gm-in" data-gmf="lo" inputmode="decimal" value="' + (s.lo != null ? plain(s.lo) : '') + '" placeholder="' + (s.a ? plain(s.a) : '0') + '"></label>' +
        '<label class="gm-f"><span>High</span><input class="gm-in" data-gmf="hi" inputmode="decimal" value="' + (s.hi != null ? plain(s.hi) : '') + '" placeholder="' + (s.a ? plain(s.a) : '0') + '"></label></div>' +
        (note ? '<label class="gm-f gm-notef"><span>Note</span><input class="gm-in" data-gmf="o" value="' + esc(s.o || '') + '" maxlength="160"></label>' : '<div class="gm-meta"><span></span><button type="button" class="gm-linkbtn" data-gm="note:' + s.id + '">Add a Note</button></div>') + '</div>';
    }
    function vPlan(d) {
      var t = totals(d), L = live(d.lines), N = live(d.income);
      return '<div class="gm-card">' + sumRow(t) + '</div>' +
        '<h3 class="gm-sec">Spending <small>' + L.length + ' line' + (L.length === 1 ? '' : 's') + '</small></h3><div class="gm-lines">' + L.map(lineRow).join('') + '</div>' +
        '<div class="gm-acts"><button type="button" class="gm-btn sm" data-gm="add:line">' + I('plus') + 'Add a Line</button>' + (L.length ? '' : '<button type="button" class="gm-btn sm line" data-gm="common">Start With Common Lines</button>') + '</div>' +
        '<h3 class="gm-sec">Income <small>a low to high range for each</small></h3><div class="gm-lines">' + N.map(incRow).join('') + '</div>' +
        '<div class="gm-acts"><button type="button" class="gm-btn sm" data-gm="add:income">' + I('plus') + 'Add Income</button></div>' +
        '<div class="gm-card gm-tools"><div class="gm-acts"><button type="button" class="gm-btn line sm" data-gm="go:import">' + I('up') + 'Bring In a Spreadsheet</button>' +
        (member() ? '<button type="button" class="gm-btn line sm" data-gm="go:share">' + I('share') + 'Share With Family</button>' : '') + '</div>' +
        (d.own ? '<p class="gm-quiet">You follow a Family plan. <button type="button" class="gm-linkbtn" data-gm="leave">' + (S.sureLeave ? 'Tap Again to Return to My Own Plan' : 'Return to My Own Plan') + '</button></p>' : '') +
        '<p class="gm-mini">How Often: Every Two Weeks, Twice a Year, and Yearly turn into a monthly amount. Spread Monthly takes a yearly total and sets aside a little each month. Before Taxes lines come out of a paycheck; On Hold lines rest outside the total.</p></div>' + memberLine();
    }

    /* This Month */
    function vMonth(d) {
      var m = month(d), ok = m.diff >= 0;
      var rows = m.rows.filter(function (r) { return r.got > 0 || r.s === 'varies'; }).sort(function (a, b) { return b.got - a.got; });
      return '<div class="gm-card gm-month"><span class="gm-k">' + esc(m.name) + ' at a Glance</span>' +
        '<div class="gm-mrows"><div><span>Income</span><b>' + money(m.income) + '</b>' + (m.lo !== m.hi ? '<small>' + money(m.lo) + ' to ' + money(m.hi) + '</small>' : '') + '</div>' +
        '<div><span>Planned spending</span><b>' + money(m.plan) + '</b></div><div><span>Logged so far</span><b>' + money(m.logged, 1) + '</b></div></div>' +
        '<p class="gm-line1 ' + (ok ? 'ok' : 'gp') + '" data-gm-month="' + m.diff + '">' + I(ok ? 'sun' : 'leaf') + esc(m.line) + '</p></div>' +
        '<div class="gm-acts"><button type="button" class="gm-btn" data-gm="go:log">' + I('tap') + 'Log Spending</button></div>' +
        (rows.length ? '<h3 class="gm-sec">Where It Goes</h3><div class="gm-card">' + rows.map(function (r) {
          var p = r.plan ? Math.min(100, Math.round(r.got / r.plan * 100)) : 100;
          return '<div class="gm-prog"><div class="gm-pt"><b>' + esc(r.n) + '</b><span>' + money(r.got, 1) + ' of ' + money(r.plan) + '</span></div><div class="gm-bar thin' + (r.got > r.plan ? ' over' : '') + '"><span style="width:' + p + '%"></span></div></div>';
        }).join('') + (m.loose ? '<div class="gm-prog"><div class="gm-pt"><b>Other</b><span>' + money(m.loose, 1) + '</span></div></div>' : '') + '</div>' : '');
    }

    /* Log */
    function vLog(d) {
      var L = live(d.lines).filter(function (l) { return counts(l) && l.s !== 'pretax'; }), vs = L.filter(function (l) { return l.s === 'varies'; }), fx = L.filter(function (l) { return l.s !== 'varies'; });
      var used = {}; live(d.logs).forEach(function (g) { used[g.c] = (used[g.c] || 0) + 1; });
      var cats = vs.concat(fx).sort(function (a, b) { return (used[b.id] || 0) - (used[a.id] || 0); });
      var m = month(d), recent = m.logs.slice().sort(function (a, b) { return a.d < b.d ? 1 : a.d > b.d ? -1 : (b.u || 0) - (a.u || 0); }).slice(0, 30);
      return '<div class="gm-card gm-log"><label class="gm-f gm-amt"><span>Amount</span><div class="gm-dollar"><span aria-hidden="true">$</span><input class="gm-in" id="gm-log-a" inputmode="decimal" placeholder="0" value="' + esc(S.logAmt) + '" autocomplete="off"></div></label>' +
        '<p class="gm-mini">Then tap where it went.</p><div class="gm-chips">' + cats.map(function (l) { return '<button type="button" class="gm-chip" data-gm="log:' + l.id + '">' + esc(l.n) + '</button>'; }).join('') +
        '<button type="button" class="gm-chip" data-gm="log:">Other</button></div>' +
        '<label class="gm-f gm-date"><span>Day</span><input class="gm-in" type="date" id="gm-log-d" value="' + esc(S.logDate || today()) + '"></label></div>' +
        '<h3 class="gm-sec">Logged in ' + esc(m.name) + ' <small>' + money(m.logged, 1) + '</small></h3>' +
        (recent.length ? '<div class="gm-card gm-loglist">' + recent.map(function (g) { var l = find(d.lines, g.c); return '<div class="gm-lg"><span class="gm-ld">' + esc(niceDate(g.d)) + '</span><b>' + esc(l && !l.x ? l.n : g.n || 'Other') + '</b><span class="gm-la">' + money(g.a, 1) + '</span><button type="button" class="gm-x sm" data-gm="rm:log:' + g.id + '" aria-label="Remove ' + money(g.a, 1) + ' ' + esc(g.n || '') + '">' + I('x') + '</button></div>'; }).join('') + '</div>'
          : '<p class="gm-sub">Your first logged spending shows here.</p>');
    }

    /* Weekly check-in */
    function vCheck(d) {
      var wk = weekKey(), c = d.checks[wk], ed = S.chk || (c ? null : { well: '', steady: 0, step: '' });
      var past = Object.keys(d.checks).filter(function (k) { return k !== wk; }).sort().reverse().slice(0, 6);
      var t = totals(d), sugg = t.ideas.filter(function (x) { return !x.off && !x.done; }).slice(0, 3);
      var html;
      if (ed) {
        html = '<div class="gm-card gm-chk"><p class="gm-sub">Three short questions, about a minute. Calm and forward.</p>' +
          '<label class="gm-f"><span>1. What went well with money this week?</span><textarea class="gm-in" id="gm-c1" rows="2" maxlength="400">' + esc(ed.well || '') + '</textarea></label>' +
          '<div class="gm-f"><span>2. How steady does money feel this week?</span><div class="gm-scale" role="radiogroup" aria-label="How steady money feels">' + STEADY.map(function (w, i) { var on = +ed.steady === i + 1; return '<button type="button" role="radio" aria-checked="' + on + '" class="gm-chip' + (on ? ' on' : '') + '" data-gm="steady:' + (i + 1) + '">' + esc(w) + '</button>'; }).join('') + '</div></div>' +
          '<label class="gm-f"><span>3. One small step for the week ahead</span><input class="gm-in" id="gm-c3" maxlength="200" value="' + esc(ed.step || '') + '"></label>' +
          (sugg.length ? '<div class="gm-chips">' + sugg.map(function (x) { return '<button type="button" class="gm-chip soft" data-gm="stepsugg:' + esc(x.key) + '">' + esc(x.t) + '</button>'; }).join('') + '</div>' : '') +
          '<div class="gm-acts"><button type="button" class="gm-btn" data-gm="chk:save">Save My Check-in</button>' + (c ? '<button type="button" class="gm-btn line" data-gm="chk:cancel">Done</button>' : '') + '</div></div>';
      } else {
        html = '<div class="gm-card gm-chk done"><span class="gm-k">This Week</span>' + chkView(c) + '<div class="gm-acts"><button type="button" class="gm-btn sm line" data-gm="chk:edit">' + I('pen') + 'Change</button></div></div>';
      }
      return html + (past.length ? '<h3 class="gm-sec">Earlier Weeks</h3>' + past.map(function (k) { return '<div class="gm-card gm-chk past"><span class="gm-k">Week of ' + esc(niceDate(k)) + '</span>' + chkView(d.checks[k]) + '</div>'; }).join('') : '');
    }
    function chkView(c) {
      return '<dl class="gm-dl">' + (c.well ? '<dt>Went well</dt><dd>' + esc(c.well) + '</dd>' : '') + (c.steady ? '<dt>How steady</dt><dd>' + esc(STEADY[c.steady - 1] || '') + '</dd>' : '') + (c.step ? '<dt>Next step</dt><dd>' + esc(c.step) + '</dd>' : '') + '</dl>';
    }

    /* Import */
    function colOpts(sheet, cur, none) {
      var w = sheet.rows.reduce(function (x, r) { return Math.max(x, r.length); }, 0), hdr = sheet.rows[S.map && S.map.header >= 0 ? S.map.header : -1] || [];
      var o = none ? '<option value="-1"' + (cur < 0 ? ' selected' : '') + '>Leave out</option>' : '';
      for (var j = 0; j < Math.min(w, 40); j++) { var ex = cellText(hdr[j]) || sample(sheet, j); o += '<option value="' + j + '"' + (j === cur ? ' selected' : '') + '>Column ' + colName(j) + (ex ? ': ' + esc(ex.slice(0, 24)) : '') + '</option>'; }
      return o;
    }
    function sample(sheet, j) { for (var i = 0; i < sheet.rows.length; i++) { var v = sheet.rows[i][j]; if (typeof v === 'string' && v.trim() && !SKIP_NAME.test(v.trim())) return v.trim(); } return ''; }
    function vImport(d) {
      var has = live(d.lines).length + live(d.income).length;
      var top = '<div class="gm-card"><p class="gm-sub">Choose an Excel (.xlsx) or CSV file. It is read right here on this device; the file itself stays where it is.</p>' +
        '<label class="gm-btn gm-file">' + I('up') + '<span>Choose a File</span><input type="file" id="gm-file" accept=".xlsx,.csv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"></label>' +
        (S.pick ? '<p class="gm-mini">' + esc(S.pick) + '</p>' : '') + '</div>';
      if (!S.sheets) return top + '<div class="gm-acts"><button type="button" class="gm-linkbtn" data-gm="go:plan">' + I('back') + 'Back to My Plan</button></div>';
      var sh = S.sheets[S.sheet] || S.sheets[0], m = S.map, got = fromSheet(sh, m);
      var sel = function (k, none) { return '<select class="gm-in" data-gmm="' + k + '">' + colOpts(sh, m[k], none) + '</select>'; };
      return top + '<div class="gm-card gm-map">' +
        (S.sheets.length > 1 ? '<label class="gm-f"><span>Sheet</span><select class="gm-in" id="gm-sheet">' + S.sheets.map(function (s, i) { return '<option value="' + i + '"' + (s === sh ? ' selected' : '') + '>' + esc(s.name) + '</option>'; }).join('') + '</select></label>' : '') +
        (m.joy ? '<p class="gm-note">' + I('check') + 'This looks like a monthly budget sheet: status in A, the line in C, the amount in E, and income in G, I, and J. Each column is ready below.</p>' : '') +
        '<h3 class="gm-h4">Spending</h3><div class="gm-grid3"><label class="gm-f"><span>Name</span>' + sel('name', true) + '</label><label class="gm-f"><span>Amount</span>' + sel('amount', true) + '</label><label class="gm-f"><span>Status</span>' + sel('status', true) + '</label>' +
        '<label class="gm-f"><span>How Often</span>' + sel('freq', true) + '</label><label class="gm-f"><span>Note</span>' + sel('note', true) + '</label></div>' +
        '<h3 class="gm-h4">Income</h3><div class="gm-grid3"><label class="gm-f"><span>Name</span>' + sel('iname', true) + '</label><label class="gm-f"><span>Amount</span>' + sel('iamount', true) + '</label><label class="gm-f"><span>Range</span>' + sel('irange', true) + '</label></div>' +
        '<p class="gm-found" data-gm-found="' + got.lines.length + ',' + got.income.length + '"><b>Found ' + got.lines.length + ' spending line' + (got.lines.length === 1 ? '' : 's') + ' and ' + got.income.length + ' income source' + (got.income.length === 1 ? '' : 's') + '.</b></p>' +
        (got.lines.length ? '<ul class="gm-prev">' + got.lines.slice(0, 6).map(function (l) { return '<li><span>' + esc(l.n) + '</span><span>' + esc(STATUS[l.s]) + '</span><b>' + money(l.a, 1) + '</b></li>'; }).join('') + (got.lines.length > 6 ? '<li class="more">and ' + (got.lines.length - 6) + ' more</li>' : '') + '</ul>' : '') +
        (has ? '<div class="gm-f"><span>Your plan has ' + has + ' lines now</span><div class="gm-scale"><button type="button" class="gm-chip' + (S.mode === 'replace' ? ' on' : '') + '" data-gm="imode:replace" aria-pressed="' + (S.mode === 'replace') + '">Replace My Plan</button><button type="button" class="gm-chip' + (S.mode === 'add' ? ' on' : '') + '" data-gm="imode:add" aria-pressed="' + (S.mode === 'add') + '">Add to My Plan</button></div></div>' : '') +
        '<div class="gm-acts"><button type="button" class="gm-btn" data-gm="import:go"' + (got.lines.length + got.income.length ? '' : ' disabled') + '>Bring It In</button><button type="button" class="gm-btn line" data-gm="import:cancel">Start Over</button></div></div>';
    }

    /* Share */
    function vShare(d) {
      var sh = S.share;
      var out = '<div class="gm-card gm-share"><h3 class="gm-h4">Share Our Plan</h3><p class="gm-sub">One plan for your home, on each phone. Scan this with the other phone\u2019s camera, or send the link. Logged spending from both phones comes together, and the newest change to each line stays.</p>';
      if (!sh) out += '<div class="gm-acts"><button type="button" class="gm-btn" data-gm="share:make">' + I('share') + 'Make the Code</button></div>';
      else out += (sh.svg ? '<div class="gm-qr" role="img" aria-label="QR code for the Grounded Money link">' + sh.svg + '</div>' : '<p class="gm-note">' + I('link') + 'This plan is a big one for a single code. Copy the link or send it instead.</p>') +
        '<label class="gm-f"><span>Family link</span><input class="gm-in" id="gm-link" readonly value="' + esc(sh.url) + '"></label>' +
        '<div class="gm-acts"><button type="button" class="gm-btn sm" data-gm="share:copy">Copy Link</button>' + (navigator.share ? '<button type="button" class="gm-btn sm line" data-gm="share:send">Send the Link</button>' : '') + '<button type="button" class="gm-btn sm line" data-gm="share:done">Done</button></div>' +
        '<p class="gm-mini">The link holds this money plan and the last two months of logged spending. Share it with the family you plan with.</p>';
      out += '</div><div class="gm-card gm-share"><h3 class="gm-h4">Bring In From Family</h3><p class="gm-sub">Scan the other phone\u2019s code with this phone\u2019s camera, or paste the link here.</p>' +
        '<label class="gm-f"><span>Family link</span><input class="gm-in" id="gm-paste" placeholder="Paste the link" autocomplete="off"></label>' +
        '<div class="gm-acts"><button type="button" class="gm-btn sm" data-gm="share:paste">Bring It In</button>' + (('BarcodeDetector' in window) && navigator.mediaDevices ? '<button type="button" class="gm-btn sm line" data-gm="share:scan">' + I('cam') + 'Scan a Code</button>' : '') + '</div><div id="gm-scan"></div></div>' +
        '<div class="gm-acts"><button type="button" class="gm-linkbtn" data-gm="go:plan">' + I('back') + 'Back to My Plan</button></div>';
      return out;
    }
    function vIncoming(d) {
      var t = S.inc.t, n = live(t.lines).length, g = live(t.logs).length, other = t.pid !== d.pid;
      return '<div class="gm-card gm-inc" role="region" aria-label="A shared plan"><span class="gm-k">From Your Family</span><h3 class="gm-h3">' + (other ? 'Bring in the shared money plan?' : 'Bring in the newest from your family?') + '</h3>' +
        '<p class="gm-sub">It has ' + n + ' line' + (n === 1 ? '' : 's') + ' and ' + g + ' logged item' + (g === 1 ? '' : 's') + '. ' + (other ? (live(d.lines).length ? 'Your own plan rests safely on this phone, and Return to My Own Plan brings it back. ' : '') + 'Your logged spending stays and joins theirs.' : 'The newest change to each line stays, and logged spending from both phones comes together.') + '</p>' +
        '<div class="gm-acts"><button type="button" class="gm-btn" data-gm="inc:yes">Bring It In</button><button type="button" class="gm-btn line" data-gm="inc:no">Later</button></div></div>';
    }

    /* ----- actions ----- */
    function act(a, btn) {
      var d = D(), p = a.split(':');
      if (p[0] === 'unlock') { GGP.require({ reason: 'Open your profile to see Grounded Money.' }).then(function () { paint(); }); return; }
      if (!d) return;
      switch (p[0]) {
        case 'go': S.sureLeave = 0; go(p.slice(1).join(':')); return;
        case 'tool':
          var TT = TL() && TL().get(p[1]); if (!TT || !TT.act) return;
          var cx = tctx(d, p[1]); if (TT.act(p[2], p.slice(3).join(':'), cx)) { touch(d); save(); var y0 = window.scrollY; paint(); window.scrollTo(0, y0); watchTool(d, p[1]); }
          return;
        case 'mem': if (opts.onMembership) opts.onMembership(p[1]); return;
        case 'common': COMMON.forEach(function (c) { addLine(d, c); }); save(); S.view = 'plan'; paint(); say('Twelve common lines are ready. Add your amounts, and rename or remove any.'); focusFirstEmpty(); return;
        case 'add':
          var it = p[1] === 'income' ? addIncome(d) : addLine(d); save(); paint();
          var inp = root.querySelector('[data-id="' + it.id + '"] .gm-name'); if (inp) { inp.focus(); try { inp.scrollIntoView({ block: 'center' }); } catch (e) {} }
          return;
        case 'rm':
          var list = p[1] === 'income' ? d.income : p[1] === 'log' ? d.logs : d.lines, item = find(list, p[2]); if (!item) return;
          remove(item, d); save(); S.undo = function () { restore(item, d); }; paint();
          say((p[1] === 'log' ? 'Removed ' + money(item.a, 1) + '.' : 'Removed ' + (item.n || 'the line') + '.'), true); return;
        case 'undo': if (S.undo) { S.undo(); S.undo = null; save(); paint(); } return;
        case 'note': S.more['n:' + p[1]] = 1; paint(); var ni = root.querySelector('[data-id="' + p[1] + '"] [data-gmf="o"]'); if (ni) ni.focus(); return;
        case 'leave': if (!S.sureLeave) { S.sureLeave = 1; paint(); return; } S.sureLeave = 0; leave(d); save(); paint(); say('Your own plan is back.'); return;
        case 'idea':
          if (p[1] === 'tick') { var key = p.slice(2).join(':'), on = !d.ideas.done[key], was = totals(d).after; ideaSet(d, key, { done: on }); save(); paint(); var t = totals(d);
            if (on && was < 0 && t.after >= 0) celebrate('The gap is closed. Your Branches are bearing fruit.'); else if (on) say(t.after < 0 ? 'Chosen. ' + money(-t.after) + ' to go.' : 'Chosen. More to keep for savings and giving.'); return; }
          if (p[1] === 'ed') { var k2 = p.slice(2).join(':'), was = S.more['e:' + k2]; if (was) { var v = root.querySelector('[data-gmi="save:' + cssq(k2) + '"]'); if (v) commitSave(d, k2, v.value); } S.more['e:' + k2] = !was; paint(); if (!was) { var f = root.querySelector('[data-gmi="save:' + cssq(k2) + '"]'); if (f) { f.focus(); f.select && f.select(); } } return; }
          if (p[1] === 'off') { var k3 = p.slice(2).join(':'); ideaSet(d, k3, { off: !d.ideas.off[k3] }); save(); paint(); return; }
          if (p[1] === 'showoff') { S.showOff = !S.showOff; paint(); return; }
          if (p[1] === 'add') { S.addIdea = true; paint(); var q = root.querySelector('#gm-in-n'); if (q) q.focus(); return; }
          if (p[1] === 'addcancel') { S.addIdea = false; paint(); return; }
          if (p[1] === 'addsave') {
            var nm = (root.querySelector('#gm-in-n') || {}).value || '', am = num((root.querySelector('#gm-in-a') || {}).value), kk = (root.querySelector('#gm-in-k') || {}).value;
            if (!nm.trim()) { say('Name your idea first.'); return; }
            var mi = { id: uid(), n: nm.trim(), a: am || 0, k: kk === 'income' ? 'income' : 'spend', o: '', u: Date.now() }; d.ideas.mine.push(mi); ideaSet(d, 'mine:' + mi.id, { done: true }); S.addIdea = false; save(); paint(); say('Your idea is added and chosen.'); return;
          }
          if (p[1] === 'rm') { var mm = find(d.ideas.mine, p[2]); if (mm) { remove(mm, d); d.ideas.u = Date.now(); delete d.ideas.done['mine:' + mm.id]; S.undo = function () { restore(mm, d); d.ideas.u = Date.now(); }; save(); paint(); say('Removed ' + mm.n + '.', true); } return; }
          return;
        case 'log':
          var ai = root.querySelector('#gm-log-a'), amt = num(ai && ai.value), dt = (root.querySelector('#gm-log-d') || {}).value || today();
          if (!amt || amt <= 0) { say('Add the amount first.'); if (ai) ai.focus(); return; }
          var g = logAdd(d, amt, p[1] || 'Other', dt); S.logAmt = ''; S.logDate = dt === today() ? '' : dt; save(); paint();
          S.undo = function () { remove(g, d); }; say('Logged ' + money(g.a, 1) + ' to ' + (g.n || 'Other') + '.', true);
          var a2 = root.querySelector('#gm-log-a'); if (a2) a2.focus(); return;
        case 'steady': S.chk = readChk(); S.chk.steady = +p[1]; paint(); return;
        case 'stepsugg': S.chk = readChk(); var ix = totals(d).ideas.filter(function (x) { return x.key === p.slice(1).join(':'); })[0]; if (ix) S.chk.step = ix.t; paint(); return;
        case 'chk':
          if (p[1] === 'edit') { S.chk = Object.assign({}, d.checks[weekKey()]); paint(); return; }
          if (p[1] === 'cancel') { S.chk = null; paint(); return; }
          if (p[1] === 'save') { var c = readChk(); if (!c.well.trim() && !c.steady && !c.step.trim()) { say('Answer one question, or all three, then save.'); return; } checkSave(d, weekKey(), c); S.chk = null; save(); paint(); say('Saved. Here is to a calm week ahead.'); return; }
          return;
        case 'imode': S.mode = p[1]; paint(); return;
        case 'import':
          if (p[1] === 'cancel') { S.sheets = null; S.map = null; S.pick = null; paint(); return; }
          if (p[1] === 'go') { var sh = S.sheets[S.sheet] || S.sheets[0], got = fromSheet(sh, S.map), had = live(d.lines).length + live(d.income).length; applyImport(d, got, had ? S.mode : 'add'); S.sheets = null; S.map = null; S.pick = null; save(); S.view = 'gap'; paint(); if (opts.onView) opts.onView('gap'); say('Brought in ' + got.lines.length + ' lines and ' + got.income.length + ' income sources.'); return; }
          return;
        case 'share':
          if (p[1] === 'make') { btn && (btn.disabled = true); Promise.all([encode(d), qrLoad(opts.qrSrc || '/shared/vendor/qrcode.js?v=b921')]).then(function (r) { var url = (opts.shareBase || SHARE_BASE) + r[0]; S.share = { url: url, svg: qrSvg(url) }; paint(); fitQr(); }); return; }
          if (p[1] === 'copy') { var li = root.querySelector('#gm-link'); copy(li ? li.value : ''); return; }
          if (p[1] === 'send') { try { navigator.share({ title: 'Grounded Money', text: 'Our money plan in Grounded Money', url: S.share.url }).catch(function () {}); } catch (e) {} return; }
          if (p[1] === 'done') { S.share = null; go('plan'); return; }
          if (p[1] === 'paste') { var pv = (root.querySelector('#gm-paste') || {}).value || ''; receive(pv); return; }
          if (p[1] === 'scan') { scan(); return; }
          return;
        case 'inc':
          if (p[1] === 'yes' && S.inc) { var r = merge(d, S.inc.j); S.inc = null; S.share = null; save(); paint(); say(r.joined ? 'You are in one Family plan now.' : 'Brought in ' + r.lines + ' change' + (r.lines === 1 ? '' : 's') + ' and ' + r.logs + ' logged item' + (r.logs === 1 ? '' : 's') + '.'); return; }
          S.inc = null; paint(); return;
      }
    }
    // Whole pixels for every module, as wide as the card allows (a crisp code reads best from a screen).
    function fitQr() { var q = root.querySelector('.gm-qr'), g = q && q.querySelector('svg'); if (!g) return; var N = +g.getAttribute('viewBox').split(' ')[2], pe = q.parentElement, pl = parseFloat(getComputedStyle(pe).paddingLeft) || 0, w = Math.min(340, (pe.clientWidth || 320) - 2 * pl - 16), k = Math.max(2, Math.floor(w / N)); g.setAttribute('width', N * k); g.setAttribute('height', N * k); }
    function cssq(s) { return String(s).replace(/["\\]/g, '\\$&'); }
    function commitSave(d, key, v) { var n = num(v); ideaSet(d, key, { save: n == null ? null : Math.max(0, n) }); var m = /^mine:(.+)$/.exec(key), mm = m && find(d.ideas.mine, m[1]); if (mm && n != null) { mm.a = Math.max(0, n); mm.u = Date.now(); } save(); }
    function readChk() { return { well: (root.querySelector('#gm-c1') || {}).value || (S.chk && S.chk.well) || '', steady: (S.chk && S.chk.steady) || 0, step: (root.querySelector('#gm-c3') || {}).value || (S.chk && S.chk.step) || '' }; }
    function focusFirstEmpty() { var x = root.querySelector('.gm-line [data-gmf="a"][value=""]') || root.querySelector('.gm-line [data-gmf="a"]'); if (x) try { x.focus(); x.scrollIntoView({ block: 'center' }); } catch (e) {} }
    function copy(text) { var ok = function () { say('Link copied.'); }; try { navigator.clipboard.writeText(text).then(ok, function () { fallback(); }); } catch (e) { fallback(); } function fallback() { var i = root.querySelector('#gm-link'); if (i) { i.select(); try { document.execCommand('copy'); ok(); } catch (e) {} } } }
    function receive(s) {
      return decode(s).then(function (j) { S.inc = { j: j, t: unpack(j) }; if (!allowed(S.view)) S.view = 'gap'; paint(); var x = root.querySelector('.gm-inc'); if (x && x.scrollIntoView) try { x.scrollIntoView({ block: 'start' }); } catch (e) {} return true; },
        function () { say('That link looks incomplete. Ask for a fresh one from the other phone.'); return false; });
    }
    var scanStop = null;
    function scan() {
      var box = root.querySelector('#gm-scan'); if (!box) return;
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function (stream) {
        box.innerHTML = '<video class="gm-video" playsinline muted></video><div class="gm-acts"><button type="button" class="gm-btn sm line" data-gm="scanstop">Done</button></div>';
        var v = box.querySelector('video'), det = new window.BarcodeDetector({ formats: ['qr_code'] }), on = true; v.srcObject = stream; v.play();
        scanStop = function () { on = false; stream.getTracks().forEach(function (t) { t.stop(); }); box.innerHTML = ''; scanStop = null; };
        (function tick() { if (!on) return; det.detect(v).then(function (c) { var hit = c && c.filter(function (x) { return codeFrom(x.rawValue); })[0]; if (hit) { scanStop(); receive(hit.rawValue); } else setTimeout(tick, 300); }, function () { setTimeout(tick, 500); }); })();
      }, function () { say('The camera is resting. Use the phone\u2019s own camera app, or paste the link.'); });
    }

    /* ----- events ----- */
    function onClick(e) {
      var b = e.target.closest('[data-gm]'); if (!b || !root.contains(b)) return;
      var a = b.getAttribute('data-gm'); if (a === 'scanstop') { if (scanStop) scanStop(); return; }
      e.preventDefault(); act(a, b);
    }
    function setPath(o, path, v) { var k = path.split('.'); for (var i = 0; i < k.length - 1; i++) { var nx = /^\d+$/.test(k[i + 1]); if (o[k[i]] == null || typeof o[k[i]] !== 'object') o[k[i]] = nx ? [] : {}; o = o[k[i]]; } o[k[k.length - 1]] = v; }
    function toolInput(t) {
      var view = t.closest('[data-tool]'), d = D(); if (!view || !d) return false; var id = view.getAttribute('data-tool'), T = TL() && TL().get(id); if (!T) return false;
      var v = t.value; if (t.getAttribute('data-n')) { var n = num(v); v = n == null ? '' : n; } else if (t.tagName === 'SELECT' && /^\d+$/.test(v)) v = +v;
      var c = tctx(d, id); setPath(c.t, t.getAttribute('data-gt'), v); touch(d);
      var out = root.querySelector('.gm-tres'); if (out) out.innerHTML = T.out(c);
      return true;
    }
    function watchTool(d, id) { var T = TL() && TL().get(id); if (!T || !T.watch) return; var r = T.watch(tctx(d, id), S.tw[id]); S.tw[id] = r.state; if (r.msg) celebrate(r.msg); }
    function onChange(e) {
      var t = e.target, d = D(); if (!d) return;
      if (t.getAttribute('data-gt')) {
        if (toolInput(t)) { save(); var id = t.closest('[data-tool]').getAttribute('data-tool'); watchTool(d, id); if (t.getAttribute('data-gtp') || t.tagName === 'SELECT' && /^(efm|list\.\d+\.f)$/.test(t.getAttribute('data-gt'))) { var key = t.getAttribute('data-gt'); paint(); var again = root.querySelector('[data-gt="' + key + '"]'); if (again) again.focus(); } }
        return;
      }
      var f = t.getAttribute('data-gmf');
      if (f) {
        var row = t.closest('[data-id]'), kind = row && row.getAttribute('data-kind'), item = row && find(kind === 'income' ? d.income : d.lines, row.getAttribute('data-id')); if (!item) return;
        var patch = {};
        if (f === 'n') patch.n = t.value.replace(/\s+/g, ' ').trim();
        else if (f === 'o') patch.o = t.value.trim();
        else if (f === 'a') patch.a = Math.abs(num(t.value) || 0);
        else if (f === 'lo' || f === 'hi') { var n = num(t.value); patch[f] = n == null ? null : Math.abs(n); }
        else if (f === 'f' && FREQ[t.value]) patch.f = t.value;
        else if (f === 's' && STATUS[t.value]) patch.s = t.value;
        edit(item, patch, d); save();
        if (f === 'f' || f === 's') { var y = window.scrollY; paint(); window.scrollTo(0, y); var again = root.querySelector('[data-id="' + item.id + '"] [data-gmf="' + f + '"]'); if (again) again.focus(); }
        else paintSums(d, item, row);
        return;
      }
      var mm = t.getAttribute('data-gmm');
      if (mm && S.map) { S.map[mm] = +t.value; S.map.joy = 0; paint(); return; }
      if (t.id === 'gm-sheet' && S.sheets) { S.sheet = +t.value; S.map = guessMap(S.sheets[S.sheet]); paint(); return; }
      if (t.id === 'gm-file' && t.files && t.files[0]) {
        var file = t.files[0]; S.pick = 'Reading ' + file.name + '\u2026'; paint();
        readFile(file).then(function (sheets) {
          sheets = sheets.filter(function (s) { return s.rows.some(function (r) { return r.some(function (c) { return c != null && c !== ''; }); }); });
          if (!sheets.length) throw new Error('empty');
          S.sheets = sheets; var best = pickSheet(sheets); S.sheet = sheets.indexOf(best); S.map = guessMap(best); S.pick = file.name; S.mode = 'replace'; paint();
        }).catch(function () { S.pick = null; S.sheets = null; paint(); say('Grounded Money reads .xlsx and .csv files. Save the sheet as one of those, then choose it again.'); });
        return;
      }
      var sv = t.getAttribute('data-gmi'); if (sv && /^save:/.test(sv)) { commitSave(d, sv.slice(5), t.value); }
    }
    function paintSums(d, item, row) {
      var s = root.querySelector('.gm-sums'); if (s) { var w = document.createElement('div'); w.innerHTML = sumRow(totals(d)); s.replaceWith(w.firstChild); }
      if (row && row.getAttribute('data-kind') === 'line') { var mo = row.querySelector('.gm-mo'); if (mo) mo.textContent = item.s === 'hold' ? 'On Hold rests outside the monthly total.' + (item.f !== 'm' ? ' About ' + money(monthly(item)) + ' a month.' : '') : item.f !== 'm' ? 'About ' + money(monthly(item)) + ' a month' : ''; }
      var nm = row && row.querySelector('.gm-x'); if (nm && item.n) nm.setAttribute('aria-label', 'Remove ' + item.n);
    }
    function onInput(e) { if (e.target.getAttribute && e.target.getAttribute('data-gt')) { toolInput(e.target); return; } if (e.target.id === 'gm-log-a') S.logAmt = e.target.value; else if (e.target.id === 'gm-log-d') S.logDate = e.target.value; else if (e.target.id === 'gm-c1' || e.target.id === 'gm-c3') { S.chk = S.chk || { well: '', steady: 0, step: '' }; S.chk[e.target.id === 'gm-c1' ? 'well' : 'step'] = e.target.value; } }
    function onKey(e) {
      if (e.key !== 'Enter') return; var t = e.target;
      if (t.id === 'gm-log-a') { e.preventDefault(); var first = root.querySelector('.gm-chips .gm-chip'); if (first) first.focus(); }
      else if (t.getAttribute('data-gmi')) { e.preventDefault(); act('idea:ed:' + t.getAttribute('data-gmi').slice(5)); }
      else if (t.id === 'gm-in-n' || t.id === 'gm-in-a') { e.preventDefault(); act('idea:addsave'); }
      else if (t.id === 'gm-paste') { e.preventDefault(); act('share:paste'); }
      else if (t.getAttribute('data-gmf') && t.tagName === 'INPUT') { t.blur(); }
    }
    root.addEventListener('click', onClick); root.addEventListener('change', onChange); root.addEventListener('input', onInput); root.addEventListener('keydown', onKey);
    // Stage 2: GGP.on returns nothing, so destroy takes the listener off with GGP.off (a host like Home draws a fresh copy each visit).
    var unsub = null; if (st.kind === 'ggp' && window.GGP && GGP.on) { try { var onG = function (ty) { if ((ty === 'change' || ty === 'ready') && root.isConnected) paint(); }, u0 = GGP.on(onG); unsub = typeof u0 === 'function' ? u0 : function () { if (window.GGP && GGP.off) GGP.off(onG); }; } catch (e) {} }

    if (TL()) TL().use(UTIL);
    paint();
    loadTools().then(function (ok) { if (ok && (S.view === 'gap' || S.view === 'tools' || /^tool:/.test(S.view))) paint(); });
    function readHash() { var hm = /#money=([A-Za-z0-9_-]+)/.exec(location.hash || ''); if (hm) { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} receive(hm[1]); } }
    if (opts.readHash) { readHash(); window.addEventListener('hashchange', readHash); }
    return {
      go: go, refresh: paint, receive: receive, view: function () { return S.view; },
      destroy: function () { if (scanStop) scanStop(); root.removeEventListener('click', onClick); root.removeEventListener('change', onChange); root.removeEventListener('input', onInput); root.removeEventListener('keydown', onKey); if (typeof unsub === 'function') unsub(); window.removeEventListener('hashchange', readHash); if (toastEl) toastEl.remove(); el.innerHTML = ''; }
    };
  }

  // Helpers the tools file uses (GGMoneyTools.use).
  var UTIL = { esc: esc, money: money, plain: plain, num: num, I: I, live: live, monthly: monthly, totals: totals, month: month, find: find, edit: edit, addLine: addLine, addIncome: addIncome,
    today: today, monthKey: monthKey, weekKey: weekKey, niceDate: niceDate };
  window.GGMoney = {
    v: V, render: render, summary: summary, util: UTIL,
    model: { blank: blank, norm: norm, monthly: monthly, totals: totals, ideas: ideaList, ideaSet: ideaSet, month: month, addLine: addLine, addIncome: addIncome, edit: edit, remove: remove, restore: restore, logAdd: logAdd, checkSave: checkSave, weekKey: weekKey, FREQ: FREQ, STATUS: STATUS, STEADY: STEADY },
    parse: { xlsx: readXlsx, csv: readCsv, file: readFile, guess: guessMap, rows: fromSheet, pick: pickSheet, apply: applyImport, inflate: inflate, unzip: unzip },
    share: { encode: encode, decode: decode, unpack: unpack, merge: merge, leave: leave, code: codeFrom, base: SHARE_BASE },
    stores: { ggp: ggpStore, local: localStore, memory: memStore },
    _test: GGMoneyTest
  };
})();
