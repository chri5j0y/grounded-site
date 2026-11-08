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
       opts.view      first view: sheet (the One Page sheet, the default since BLD 941), home (Money Home), give, live, protect, grow, ahead (the Plan part), gap, plan, month,
                    log, check, import, share, tools, tool:<id>
       opts.onView    fn(view) when the view changes (the host can keep its address in step)
       opts.onMembership fn('see' or 'code') for the Membership line buttons
       opts.toast     fn(message) to use the host's toast (the module has its own)
       opts.shareBase the start of a Family link (default https://growwithgrounded.com/home/#money=)
       opts.qrSrc     where shared/vendor/qrcode.js lives (default /shared/vendor/qrcode.js?v=b921)
       opts.css       false when the host already loads gg-money.css; else it is added once from beside this file
       opts.readHash  true reads #money=<code> from the address on render (then clears it)
       opts.art       (kept for older hosts; since BLD 939 every picture is drawn in code)
       opts.toolsSrc  where gg-money-tools.js lives (default beside this file); loaded the first time Grounded Money opens
     GGMoney.summary(store)  {has, income, spend, gap, after, month: {ahead, short, line}} for a Today line
     GGMoney.model, GGMoney.parse, GGMoney.share   the data layer, for tests and stage 2

   The money object (one per profile)
     {v: 1, pid (the plan's id, shared by every phone in one Family plan), created, u,
      lines:  [{id, n name, a amount, f how often (m, b, h, y, s), s status (fixed, varies, est, hold, pretax), o note, u, x removed}],
      income: [{id, n, a, lo, hi, o, u, x}],
      ideas:  {done: {key: time}, edit: {key: amount}, off: {key: 1}, mine: [{id, n, a, k: 'spend' or 'income', o, u, x}], u},
      logs:   [{id, d YYYY-MM-DD, a, c line id, n category name, u, x}],
      checks: {Monday YYYY-MM-DD: {well, steady 1 to 5, step, at}},
      tools:  {debt, goals, pay, fund, grocery, car, side, subs, calls, date, give, kids, tips} each tool's own answers (stage 1b,
              shared/gg-money-tools.js); they stay on this phone (a Family share carries the plan, ideas, and logs)
      own:    {lines, income, ideas, pid} this phone's own plan, kept while it follows a Family plan}
   Removing sets x and u (so a removal travels in a share); Undo clears it.

   BLD 939 (Chris: "better flow more color, variety.. bigger titles.. cards that collaps.. giving, generosity, investing,
   diversity, planning, no blind spots"): Grounded Money in five parts with plain names, Give, Live, Protect, Grow, and
   Plan. New views: home (Money Home, the first view: five bright tiles and Your Money Picture), give, live, protect, grow,
   and ahead (the Plan part; plan stays My Plan, so every older address still opens the same place). Each part is a page of
   cards that fold open and closed (open state kept for this tab, sessionStorage gg-money-open). Drawings are inline SVG in
   Grounded's own colors. New answers: tools.givelog, tools.insure, tools.blind, tools.grow (with grow.match), tools.year,
   and tools.generous (generosity ideas tried); a Family share still carries the plan, ideas, and logs only.

   BLD 940 (Grounded Money Standards): two Membership tools in the Plan part, std (Grounded Money Standards: suggested
   shares of take-home pay side by side with the plan, the two seasons, a top goal, What It Would Take) and windfall
   (Windfall Planner). New answers: tools.std {goal, size, pretax, pretaxF, areas: {lineId: area}, trims, celebrated} and
   tools.windfall {amt, kind, give, cards, past}. They stay on this phone like every tool answer (never in the Family share);
   money object v1 is unchanged. Money Home and the Plan part carry a Standards card, and each part page a short row.

   BLD 941 (Chris: "no clear direction, data is all over the place.. doesnt even have a place to see everything at once
   like my simple spread sheet"): Grounded Money opens on the One Page sheet (view sheet): Money In, Money Out, and Ahead
   or Short Each Month; a chip row (giving, saving with Before Taxes counted, the season, the Standards); and three compact
   panels, Expenses, Income, and Before Taxes, each line edited in place (tap a name or an amount, tap the tag for its
   status). Before Taxes lines stay out of Money Out (they leave before pay) and count as saving; they are the one source
   for the Standards' pretax saving. A new status, est (Estimate). Tools and Tips (view tools) gathers the five parts,
   every tool, the Standards, the Windfall Planner, and tips. Every older view name still opens its place; My Plan stays
   for notes and every detail. tools.sheet {sort: 'mine' or 'big'} keeps the Expenses order choice.

   BLD 942 (Chris: "a better way to plan this so it can be there if needed but not look like a short fall for the many months
   it is not needed"): Set-Asides on One Page. money.funds holds savings funds that live in a separate savings account:
   Known Bills (an amount on due months; the monthly amount is what has each due date ready) and Just in Case funds (a
   monthly amount up to a cap; $0 a month when full). Each month's set-aside counts in Money Out and joins the balance when
   the next month begins (roll(), idempotent). Pay From a Fund (a log with f, the fund's id) lowers the balance and stays out
   of the month's plan. money.holidays holds the Holidays and Birthdays planner (tool holidays), which feeds one fund (hol: 1).
   Both ride the Family share (f and h in the code). Older money objects load with no funds.

   No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGMoney) return;
  var V = 'b942';
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
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    map: '<path d="M3.5 6.5l5.5-2 6 2 5.5-2v13l-5.5 2-6-2-5.5 2z"/><path d="M9 4.5v13M15 6.5v13"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    umbrella: '<path d="M3 12a9 9 0 0 1 18 0z"/><path d="M12 12v6.5a2 2 0 0 1-4 0"/><path d="M12 3v.5"/>',
    chart: '<path d="M4 20h16"/><path d="M6.5 16v-3M11 16V10M15.5 16V7.5"/><path d="M5 9.5l5-4 3.5 2.5L19 3.5"/><path d="M15.5 3.5H19V7"/>',
    chev: '<path d="M6.5 9.5l5.5 5.5 5.5-5.5"/>',
    star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z"/>',
    dots: '<circle cx="5.5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18.5" cy="12" r="1.4"/>',
    sort: '<path d="M7 4v16M3.5 16.5L7 20l3.5-3.5M14 6h7M14 11h5M14 16h3"/>'
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
  var STATUS = { fixed: 'Fixed', varies: 'Varies', est: 'Estimate', hold: 'On Hold', pretax: 'Before Taxes' };
  var STATUS_ORDER = ['fixed', 'varies', 'est', 'hold', 'pretax'];

  function blank() { return { v: 1, pid: uid(), created: today(), u: Date.now(), lines: [], income: [], ideas: { done: {}, edit: {}, off: {}, mine: [], u: 0 }, logs: [], checks: {}, tools: {}, funds: [], holidays: { days: {}, people: [], u: 0 } }; }
  // Fills a money object in place (so a profile's own object stays the one saved).
  function norm(d) {
    if (!d || typeof d !== 'object') d = {};
    var b = blank(); Object.keys(b).forEach(function (k) { if (d[k] == null) d[k] = b[k]; });
    d.lines = arr(d.lines); d.income = arr(d.income); d.logs = arr(d.logs); d.checks = obj(d.checks); d.tools = obj(d.tools);
    d.ideas = obj(d.ideas); ['done', 'edit', 'off'].forEach(function (k) { d.ideas[k] = obj(d.ideas[k]); }); d.ideas.mine = arr(d.ideas.mine); d.ideas.u = +d.ideas.u || 0;
    d.lines.forEach(function (l) { if (!FREQ[l.f]) l.f = 'm'; if (!STATUS[l.s]) l.s = 'fixed'; l.a = +l.a || 0; });
    d.funds = arr(d.funds).filter(function (f) { return f && typeof f === 'object' && f.id; }); d.funds.forEach(normFund);
    d.holidays = obj(d.holidays); d.holidays.days = obj(d.holidays.days); d.holidays.people = arr(d.holidays.people).filter(function (x) { return x && x.id; }); d.holidays.u = +d.holidays.u || 0;
    return d;
  }
  function normFund(f) {
    f.kind = f.kind === 'jic' ? 'jic' : 'bill'; f.n = String(f.n == null ? '' : f.n); f.amt = +f.amt || 0; f.mon = +f.mon || 0; f.cap = +f.cap || 0; f.bal = r2(+f.bal || 0);
    f.due = arr(f.due).map(function (m) { return +m; }).filter(function (m, i, a) { return m >= 0 && m < 12 && Math.floor(m) === m && a.indexOf(m) === i; }).sort(function (a, b) { return a - b; });
    if (f.last != null && !/^\d{4}-\d{2}$/.test(String(f.last))) delete f.last; if (f.la != null) f.la = r2(+f.la || 0);
    if (f.pm && (typeof f.pm !== 'object' || !/^\d{4}-\d{2}$/.test(String(f.pm.m)))) delete f.pm;
    return f;
  }
  function freqOf(f) { return FREQ[f] || FREQ.m; }
  function monthly(l) { return r2((+l.a || 0) * freqOf(l.f).k); }
  // BLD 941: Money Out counts every line except On Hold and Before Taxes (Before Taxes leaves before pay, so it never
  // comes out of the take-home income; it counts as saving).
  function counts(l) { return l.s !== 'hold' && l.s !== 'pretax'; }
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
    // BLD 942: Money Out includes this month's set-asides (a full fund adds $0).
    var lineOut = r2(spend), sa = setAsideSum(d); spend += sa;
    var gap = r2(inc - spend);
    return { spend: r2(spend), lineOut: lineOut, setaside: sa, savings: fundSavings(d), income: r2(inc), lo: r2(lo), hi: r2(hi), pretax: r2(pretax), gap: gap, saved: r2(saved), savedSpend: r2(savedSpend), savedInc: r2(savedInc), after: r2(gap + saved), ideas: ideas };
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
    // BLD 942: spending paid from a set-aside fund (g.f) comes from savings already set aside, so it stays out of the month.
    var fromFund = 0;
    logs.forEach(function (g) { if (g.f) { fromFund += +g.a || 0; return; } logged += +g.a || 0; var l = find(d.lines, g.c); if (l && !l.x && counts(l)) by[l.id] = (by[l.id] || 0) + (+g.a || 0); else loose += +g.a || 0; });
    var rows = live(d.lines).filter(counts).map(function (l) { return { id: l.id, n: l.n, s: l.s, plan: monthly(l), got: r2(by[l.id] || 0) }; });
    var projected = rows.reduce(function (s, r) { return s + Math.max(r.plan, r.got); }, 0) + loose + t.setaside - t.savedSpend;
    var income = t.income + t.savedInc, diff = r2(income - projected);
    return { key: mk, name: MONTHS[+mk.slice(5, 7) - 1], income: r2(income), lo: t.lo, hi: t.hi, plan: r2(t.spend - t.savedSpend), setaside: t.setaside, fromFund: r2(fromFund), logged: r2(logged), loose: r2(loose), rows: rows, projected: r2(projected), diff: diff,
      line: diff >= 0 ? 'Ahead ' + money(diff) + ' this month' : 'Short ' + money(-diff) + ' this month', logs: logs };
  }
  function logAdd(d, a, c, date) {
    var l = find(d.lines, c), g = { id: uid(), d: date || today(), a: r2(a), c: l ? l.id : '', n: l ? l.n : (c || 'Other'), u: Date.now() };
    d.logs.push(g); touch(d); return g;
  }

  /* ---------- BLD 942: Set-Asides (savings funds in a separate savings account) ---------- */
  function mkAdd(mk, n) { var y = +mk.slice(0, 4), m = +mk.slice(5, 7) - 1 + n; y += Math.floor(m / 12); m = ((m % 12) + 12) % 12; return y + '-' + pad(m + 1); }
  function mIdx(mk) { return +String(mk).slice(5, 7) - 1; }
  // The Holidays and Birthdays planner's starting list: [key, name, usual month (0 to 11), suggested amount, per, moves].
  // per: 'person' (times the household), 'child' (times the children), '' (one amount). Every day starts off; the person checks
  // the ones their family celebrates. Suggested amounts are modest starting points to change.
  var HOLS = [
    ['christmas', 'Christmas', 11, 100, 'person'], ['thanksgiving', 'Thanksgiving', 10, 150, ''], ['easter', 'Easter', 3, 60, '', 1], ['hanukkah', 'Hanukkah', 11, 100, '', 1],
    ['eid', 'Eid al-Fitr', 2, 100, '', 1], ['diwali', 'Diwali', 9, 100, '', 1], ['lunar', 'Lunar New Year', 1, 80, '', 1], ['valentine', 'Valentine\u2019s Day', 1, 40, ''],
    ['mother', 'Mother\u2019s Day', 4, 50, ''], ['father', 'Father\u2019s Day', 5, 50, ''], ['halloween', 'Halloween', 9, 40, ''], ['school', 'Back to School', 7, 100, 'child'],
    ['grad', 'Graduations', 5, 100, '']
  ];
  var HOL = {}; HOLS.forEach(function (h) { HOL[h[0]] = h; });
  var PEOPLE_KIND = { bday: 'Birthday', anniv: 'Anniversary' };
  // Household size: the Standards' answer, or 2 plus the Allowance Helper's children. Children: the Allowance Helper's, or the household less two.
  function kidsOf(d) { var k = d.tools && d.tools.kids; return arr(k && k.kids).filter(function (x) { return (+x.age || 0) > 0; }).length; }
  function houseOf(d) { var s = d.tools && d.tools.std, n = Math.round(+(s && s.size) || 0); return n > 0 ? Math.min(15, n) : 2 + kidsOf(d); }
  function holSuggest(d, key) { var h = HOL[key]; if (!h) return 0; return h[4] === 'person' ? h[3] * houseOf(d) : h[4] === 'child' ? h[3] * Math.max(1, kidsOf(d) || houseOf(d) - 2) : h[3]; }
  // The planner's days by month: [{n, a, k}] for each of the twelve months.
  function holMonths(d) {
    var H = d.holidays || {}, out = []; for (var i = 0; i < 12; i++) out.push([]);
    HOLS.forEach(function (h) { var x = H.days && H.days[h[0]]; if (x && x.on) { var m = +x.m; if (!(m >= 0 && m < 12)) m = h[2]; out[m].push({ n: h[1], a: r2(+x.amt || 0), k: 'day' }); } });
    live(H.people).forEach(function (p) { var m = +p.m; if (m >= 0 && m < 12 && (+p.amt || 0) > 0) out[m].push({ n: (p.n || 'Someone') + '\u2019s ' + (p.kind === 'anniv' ? 'Anniversary' : 'Birthday'), a: r2(+p.amt || 0), k: p.kind === 'anniv' ? 'anniv' : 'bday' }); });
    return out;
  }
  // What a fund pays out in each calendar month.
  function fundEvents(d, f) {
    var ev = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (f.hol) holMonths(d).forEach(function (L, m) { ev[m] = r2(L.reduce(function (s, x) { return s + x.a; }, 0)); });
    else if (f.kind === 'bill') arr(f.due).forEach(function (m) { if (m >= 0 && m < 12) ev[m] = r2(ev[m] + (+f.amt || 0)); });
    return ev;
  }
  // A fund's set-aside for month mk, from its balance now.
  // Known Bill (and the holiday fund): this month's unpaid due amount is held from the balance; the monthly amount is the
  // smallest whole dollar amount that has every due date in the next twelve months ready. Just in Case: up to its cap.
  function fundNeed(d, f, mk) {
    mk = mk || monthKey(); var m = mIdx(mk), bal = +f.bal || 0;
    if (f.kind === 'jic' && !f.hol) {
      var mon = Math.max(0, +f.mon || 0), cap = Math.max(0, +f.cap || 0), a = cap > 0 ? Math.max(0, Math.min(mon, cap - bal)) : mon;
      return { a: r2(a), full: cap > 0 && bal >= cap - 0.005, target: cap, held: 0, next: null };
    }
    var ev = fundEvents(d, f), paid = f.pm && f.pm.m === mk ? +f.pm.a || 0 : 0, held = Math.max(0, ev[m] - paid), avail = bal - held, A = 0, c = 0, next = null;
    for (var j = 1; j <= 12; j++) { var e = ev[(m + j) % 12]; if (!e) continue; A += e; if (!next) next = { j: j, m: (m + j) % 12, a: e }; c = Math.max(c, (A - avail) / j); }
    return { a: Math.max(0, Math.ceil(c - 1e-6)), held: r2(held), now: ev[m], avail: r2(avail), next: next, target: held > 0 ? ev[m] : next ? next.a : 0, full: false };
  }
  // The amount a fund counts this month: frozen once the month is counted (so paying from it keeps the month even).
  function fundMonth(d, f, mk) { mk = mk || monthKey(); return f.last === mk && f.la != null ? +f.la || 0 : fundNeed(d, f, mk).a; }
  function setAsideSum(d, mk) { return r2(live(d.funds).reduce(function (s, f) { return s + fundMonth(d, f, mk); }, 0)); }
  function fundSavings(d) { return r2(live(d.funds).reduce(function (s, f) { return s + (+f.bal || 0); }, 0)); }
  // Each new month: last month's set-aside joins the balance, and this month's is counted. Missed months are applied one
  // by one (up to two years). Running it again changes nothing. It never changes u, so a newer edit from family still wins.
  function roll(d, mk) {
    mk = mk || monthKey(); var n = 0;
    live(d.funds).forEach(function (f) {
      if (!f.last) { f.last = mk; f.la = fundNeed(d, f, mk).a; return; }
      var k = 0;
      while (f.last < mk && k < 24) { f.bal = r2((+f.bal || 0) + (+f.la || 0)); f.last = mkAdd(f.last, 1); f.la = fundNeed(d, f, f.last).a; k++; n++; }
      if (f.last < mk) { f.last = mk; f.la = fundNeed(d, f, mk).a; }
    });
    if (n) touch(d);
    return n;
  }
  // After a change to a fund's amounts, due months, cap, or balance: this month's amount is counted again.
  function rec(d, f) { var mk = monthKey(); if (!f.last || f.last <= mk) { f.last = mk; f.la = fundNeed(d, f, mk).a; } }
  function recAll(d) { live(d.funds).forEach(function (f) { if (f.hol) rec(d, f); }); }
  function addFund(d, o) {
    var f = normFund(Object.assign({ id: uid(), n: '', kind: 'jic', amt: 0, due: [], mon: 0, cap: 0, bal: 0 }, o || {}, { u: Date.now() }));
    d.funds.push(f); rec(d, f); touch(d); return f;
  }
  function editFund(d, f, patch) { if ('due' in patch && f.pm && f.pm.auto) delete f.pm; Object.assign(f, patch); normFund(f); f.u = Date.now(); rec(d, f); touch(d); return f; }
  function holFund(d) { return live(d.funds).filter(function (f) { return f.hol; })[0] || null; }
  // Pay from a fund: a log marked with the fund (stays out of the month), and the balance comes down.
  function payFund(d, f, a, date) {
    a = r2(Math.abs(+a || 0)); var dt = date || today(), mk = dt.slice(0, 7);
    var g = { id: uid(), d: dt, a: a, c: '', n: f.n || 'Set-Aside', f: f.id, u: Date.now() }; d.logs.push(g);
    f.bal = r2((+f.bal || 0) - a); if (mk === monthKey()) f.pm = { m: mk, a: r2((f.pm && f.pm.m === mk ? +f.pm.a || 0 : 0) + a) };
    f.u = Date.now(); touch(d); return g;
  }
  // Undo a payment (or remove its log): the money goes back into the fund.
  function unpay(d, g, back) {
    var f = find(d.funds, g.f); if (!f) return; var s = back ? 1 : -1, mk = String(g.d || '').slice(0, 7);
    f.bal = r2((+f.bal || 0) + s * (+g.a || 0)); if (f.pm && f.pm.m === mk) f.pm.a = r2(Math.max(0, (+f.pm.a || 0) + (back ? -1 : 1) * (+g.a || 0))); f.u = Date.now(); touch(d);
  }
  function addToFund(d, f, a) { f.bal = r2((+f.bal || 0) + Math.abs(+a || 0)); f.u = Date.now(); touch(d); return f; }
  // Lines that read as set-asides: an Estimate, or a line that comes twice a year, yearly, or spread monthly.
  function fundable(l) { return !!l && !l.x && l.s !== 'pretax' && l.s !== 'hold' && (l.s === 'est' || l.f === 'h' || l.f === 'y' || l.f === 's'); }
  // Make This a Set-Aside: the line becomes a fund with the same monthly amount, and leaves Expenses (so it counts once).
  // A monthly Estimate becomes Just in Case (a cap of a year's worth); a twice a year, yearly, or spread line becomes a
  // Known Bill whose due months start from this month (marked paid, so the monthly amount stays the same until the
  // person sets the real months). An older Set-Aside Funds balance for the line comes along.
  function toFund(d, l) {
    if (!fundable(l)) return null;
    var mk = monthKey(), m = mIdx(mk), old = d.tools && d.tools.fund && d.tools.fund.bal, bal = old && +old[l.id] > 0 ? +old[l.id] : 0, o;
    if (l.f === 'm' || l.f === 'b') o = { n: l.n, kind: 'jic', mon: monthly(l), cap: Math.round(monthly(l) * 12), bal: bal };
    else { var due = l.f === 'h' ? [m, (m + 6) % 12] : [m]; o = { n: l.n, kind: 'bill', amt: +l.a || 0, due: due, bal: bal, pm: { m: mk, a: r2((+l.a || 0)), auto: 1 } }; }
    o.from = l.id;
    var f = addFund(d, o); remove(l, d); return f;
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
  function statusOf(v) { var s = cellText(v).toLowerCase(); if (!s) return 'fixed'; if (/pre.?tax|before tax/.test(s)) return 'pretax'; if (/hold|pause/.test(s)) return 'hold'; if (/estimat/.test(s)) return 'est'; if (/vari|flex|change/.test(s)) return 'varies'; return 'fixed'; }
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
    var I2 = d.ideas, H = d.holidays || { days: {}, people: [] }, hd = obj(H.days);
    var all = [].concat(d.lines, d.income, d.logs, I2.mine, arr(d.funds), arr(H.people), Object.keys(hd).map(function (k) { return hd[k]; })).map(function (x) { return +(x && x.u) || 0; }).filter(Boolean), t0 = all.length ? Math.min.apply(null, all) : Date.now();
    var U = function (u) { return Math.max(0, Math.floor(((+u || t0) - t0) / 1000)).toString(36); };
    return {
      v: 1, p: d.pid, t: Date.now(), o: t0,
      l: d.lines.map(function (l) { return [l.id, l.n, l.a, l.f, l.s, l.o || '', U(l.u), l.x ? 1 : 0]; }),
      i: d.income.map(function (s) { return [s.id, s.n, s.a, s.lo, s.hi, s.o || '', U(s.u), s.x ? 1 : 0]; }),
      g: d.logs.filter(function (g) { return String(g.d || '').slice(0, 7) >= since; }).map(function (g) { var r = [g.id, String(g.d).replace(/-/g, ''), g.a, g.c || '', g.c ? '' : g.n || '', U(g.u), g.x ? 1 : 0]; if (g.f) r.push(g.f); return r; }),
      k: { d: Object.keys(I2.done), e: I2.edit, o: Object.keys(I2.off), m: I2.mine.map(function (m) { return [m.id, m.n, m.a, m.k, m.o || '', U(m.u), m.x ? 1 : 0]; }), u: I2.u },
      // BLD 942: set-aside funds and the Holidays and Birthdays planner (an older phone reads past them)
      f: arr(d.funds).map(function (f) { return [f.id, f.n, f.kind, f.amt, arr(f.due).join('.'), f.mon, f.cap, f.bal, f.last || '', f.la == null ? '' : f.la, f.pm ? [f.pm.m, f.pm.a, f.pm.auto ? 1 : 0] : 0, f.hol ? 1 : 0, U(f.u), f.x ? 1 : 0]; }),
      h: { d: Object.keys(hd).reduce(function (o, k) { var x = hd[k]; o[k] = [x.on ? 1 : 0, +x.m, +x.amt || 0, U(x.u)]; return o; }, {}), p: arr(H.people).map(function (x) { return [x.id, x.n, x.kind, +x.m, +x.amt || 0, U(x.u), x.x ? 1 : 0]; }) }
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
      logs: arr(j.g).map(function (r) { var g = fx({ id: String(r[0]), d: ymd8(r[1]), a: +r[2] || 0, c: String(r[3] || ''), n: String(r[4] || ''), u: U(r[5]) }, r[6]); if (r[7]) g.f = String(r[7]); return g; }),
      funds: Array.isArray(j.f) ? j.f.map(function (r) { var pm = Array.isArray(r[10]) ? { m: String(r[10][0]), a: +r[10][1] || 0 } : null; if (pm && Array.isArray(r[10]) && r[10][2]) pm.auto = 1;
        var f = fx({ id: String(r[0]), n: String(r[1] || ''), kind: r[2] === 'jic' ? 'jic' : 'bill', amt: +r[3] || 0, due: String(r[4] || '').split('.').filter(Boolean).map(Number), mon: +r[5] || 0, cap: +r[6] || 0, bal: +r[7] || 0, u: U(r[12]) }, r[13]);
        if (r[8]) f.last = String(r[8]); if (r[9] !== '' && r[9] != null) f.la = +r[9] || 0; if (pm) f.pm = pm; if (r[11]) f.hol = 1; return normFund(f); }) : null,
      holidays: j.h && typeof j.h === 'object' ? { days: Object.keys(obj(j.h.d)).reduce(function (o, k) { var r = j.h.d[k]; if (Array.isArray(r) && HOL[k]) o[k] = { on: r[0] ? 1 : 0, m: +r[1] || 0, amt: +r[2] || 0, u: U(r[3]) }; return o; }, {}),
        people: arr(j.h.p).map(function (r) { return fx({ id: String(r[0]), n: String(r[1] || ''), kind: r[2] === 'anniv' ? 'anniv' : 'bday', m: +r[3] || 0, amt: +r[4] || 0, u: U(r[5]) }, r[6]); }) } : null,
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
      if (live(d.lines).length || live(d.income).length || live(d.funds).length) d.own = d.own || { pid: d.pid, lines: d.lines, income: d.income, ideas: d.ideas, funds: d.funds, holidays: d.holidays };
      d.pid = t.pid; d.lines = []; d.income = []; d.ideas = { done: {}, edit: {}, off: {}, mine: [], u: 0 }; d.funds = []; d.holidays = { days: {}, people: [], u: 0 }; joined = true;
    }
    // BLD 942: funds by id and planner days by key, the newest edit winning; a code from an older phone leaves them as they are.
    var fa = { added: 0, changed: 0 };
    if (t.funds) { fa = mergeList(d.funds, t.funds); d.funds = fa.list; }
    if (t.holidays) {
      var hd = d.holidays.days; Object.keys(t.holidays.days).forEach(function (k) { var x = t.holidays.days[k]; if (!hd[k] || (+x.u || 0) > (+hd[k].u || 0)) hd[k] = x; });
      d.holidays.people = mergeList(d.holidays.people, t.holidays.people).list; d.holidays.u = Date.now();
    }
    var a = mergeList(d.lines, t.lines), b = mergeList(d.income, t.income), g = mergeList(d.logs, t.logs), m = mergeList(d.ideas.mine, t.ideas.mine);
    d.lines = a.list; d.income = b.list; d.logs = g.list; d.ideas.mine = m.list;
    if (t.ideas.u > (d.ideas.u || 0)) { d.ideas.done = t.ideas.done; d.ideas.edit = t.ideas.edit; d.ideas.off = t.ideas.off; d.ideas.u = t.ideas.u; }
    touch(d);
    return { joined: joined, lines: a.added + a.changed + b.added + b.changed + fa.added + fa.changed, logs: g.added };
  }
  function leave(d) { if (!d.own) return false; d.pid = d.own.pid; d.lines = d.own.lines; d.income = d.own.income; d.ideas = d.own.ideas; d.funds = d.own.funds || []; d.holidays = d.own.holidays || { days: {}, people: [], u: 0 }; delete d.own; norm(d); touch(d); return true; }

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
    { v: 'log', n: 'Log', i: 'tap', m: 1 }, { v: 'check', n: 'Check-in', i: 'leaf', m: 1 }, { v: 'tools', n: 'Tools and Tips', i: 'grid' }
  ];
  // BLD 939: the five parts. 'ahead' is the Plan part's view name (plan stays My Plan).
  var PARTS = [
    { id: 'give', n: 'Give', i: 'gift', line: 'Generosity first: your giving goal, a giving tracker, and gifts beyond money.' },
    { id: 'live', n: 'Live', i: 'home', line: 'Your monthly plan, bills, spending, and smart ways to save.' },
    { id: 'protect', n: 'Protect', i: 'shield', line: 'An emergency fund, the right coverage, and no blind spots.' },
    { id: 'grow', n: 'Grow', i: 'chart', line: 'Investing basics, compound growth, and income on the side.' },
    { id: 'ahead', n: 'Plan', i: 'map', line: 'Goals, debt payoff, big purchases, paydays, and your whole year.' }
  ];
  var PART = {}; PARTS.forEach(function (x, i) { PART[x.id] = x; x.ix = i; });
  var LIVE_VIEWS = { gap: 1, plan: 1, month: 1, log: 1, check: 1, import: 1, share: 1 };
  var GEN = [
    ['time', 'Give an Hour', 'Volunteer an hour with a group you care about.'], ['meal', 'Bring a Meal', 'A warm meal for a new parent, a neighbor, or a friend in a hard season.'],
    ['skill', 'Share a Skill', 'Fix, teach, mow, or build something for someone.'], ['note', 'Write a Thank You Note', 'A few lines to someone who made a difference for you.'],
    ['visit', 'Make a Visit', 'Sit with someone who would love the company.'], ['lend', 'Lend and Share', 'Tools, books, and gear from your shelf to a neighbor.'],
    ['ride', 'Offer a Ride', 'To an appointment, the store, or a gathering.'], ['listen', 'Listen Well', 'Fifteen unhurried minutes, phone away, for someone who needs to be heard.']
  ];
  var TITLE = { sheet: 'Grounded Money', home: 'Money Home', give: 'Give', live: 'Live', protect: 'Protect', grow: 'Grow', ahead: 'Plan', gap: 'Close the Gap', plan: 'My Plan', month: 'This Month', log: 'Log Spending', check: 'Weekly Money Check-in', import: 'Bring In a Spreadsheet', share: 'Share With Family', tools: 'Tools and Tips' };
  var LINE = { home: 'Give, live, protect, grow, and plan: your whole money picture, bright and clear.', give: PARTS[0].line, live: PARTS[1].line, protect: PARTS[2].line, grow: PARTS[3].line, ahead: PARTS[4].line,
    gap: 'Every idea you choose brings your plan into balance.', plan: 'Every line, calm and clear.', month: 'Where this month is going.', log: 'One tap, and back to your day.', check: 'A calm look each week keeps money peaceful.', import: 'Start from the sheet you already keep.', share: 'One plan for your home, on each phone.', tools: 'The five parts, every tool, the Standards, and tips.' };
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
    var st = storeOf(opts.store), S = { view: opts.view || 'sheet', ed: null, rowOpen: null, open: readOpen(), pick: null, map: null, sheets: null, mode: 'replace', inc: null, share: null, more: {}, undo: null, addIdea: false, logAmt: '', logDate: '', chk: null, showOff: false, tw: {} };
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
    // BLD 942: the Holidays and Birthdays planner keeps its answers in money.holidays (household plan data, so it rides the Family share).
    function tstate(d, id) { if (id === 'holidays') return d.holidays; var t = d.tools[id]; if (!t || typeof t !== 'object') t = d.tools[id] = {}; return t; }
    function tctx(d, id) { return { d: d, t: tstate(d, id), U: UTIL, save: save, paint: paint, say: say, go: go, member: member, celebrate: celebrate, focus: function (sel) { setTimeout(function () { var x = root.querySelector(sel); if (x) try { x.focus(); if (x.select) x.select(); } catch (e) {} }, 0); } }; }
    function go(v) { if (!TITLE[v] && !/^tool:[a-z]+$/.test(v)) v = 'sheet'; S.ed = null; S.rowOpen = null; if (!allowed(v)) v = 'gap'; if (v === 'share') S.share = null; S.view = v; paint(); if (opts.onView) try { opts.onView(S.view); } catch (e) {} try { root.scrollIntoView && root.getBoundingClientRect().top < 0 && root.scrollIntoView({ block: 'start' }); } catch (e) {} }

    /* ----- painting ----- */
    var painting = false;
    function paint() { painting = true; try { paint0(); } finally { painting = false; } }
    function paint0() {
      var d = D();
      if (d && roll(d)) save();   // BLD 942: a new month adds last month's set-asides to each fund, once
      if (!d) { root.innerHTML = '<div class="gm-card gm-hello">' + head() + '<p class="gm-sub">Open your profile to see your money plan. It stays locked on this device with your passcode.</p>' + (window.GGP && GGP.require ? '<div class="gm-acts"><button type="button" class="gm-btn" data-gm="unlock">Open My Profile</button></div>' : '') + '</div>'; return; }
      // Stage 2: a view this person cannot open (a Membership place on Start) settles on Close the Gap, and the host's address follows.
      if (!TITLE[S.view] && !/^tool:[a-z]+$/.test(S.view)) S.view = 'sheet';   // BLD 941: an unknown view name settles on the sheet
      if (!allowed(S.view)) { S.view = 'gap'; if (opts.onView) try { opts.onView('gap'); } catch (e) {} }
      if (S.view === 'sheet') { root.innerHTML = '<div class="gm-shell gm-sheet gm-c-home">' + (S.inc ? vIncoming(d) : '') + '<div class="gm-body" data-gm-view="sheet">' + vSheet(d) + '</div></div>'; edFocus(); return; }
      var tid = /^tool:(.+)$/.exec(S.view), body = tid ? vTool(d, tid[1]) : PART[S.view] ? vPart(d, S.view) : { home: vHome, gap: vGap, plan: vPlan, month: vMonth, log: vLog, check: vCheck, import: vImport, share: vShare, tools: vTools }[S.view](d);
      root.innerHTML = '<div class="gm-shell gm-c-' + (partOf(S.view) || 'home') + '">' + head() + (S.view === 'tools' ? '' : pnav()) + tabs() + (S.inc ? vIncoming(d) : '') + '<div class="gm-body" data-gm-view="' + (tid ? 'tool' : S.view) + '"' + (tid ? ' data-tool="' + esc(tid[1]) + '"' : '') + '>' + body + '</div></div>';
    }
    // The part this view belongs to (give, live, protect, grow, ahead), or '' for Money Home and All Tools.
    function partOf(v) {
      if (PART[v]) return v; if (LIVE_VIEWS[v]) return 'live';
      var tid = /^tool:(.+)$/.exec(v || ''), T = tid && TL() && TL().get(tid[1]); return T ? T.part || '' : '';
    }
    // The header: a bright band in the part's own color, a big title, and the part's drawing.
    function head() {
      var tid = /^tool:(.+)$/.exec(S.view), T = tid && TL() && TL().get(tid[1]), pt = partOf(S.view), P = PART[pt];
      var title = T ? T.n : TITLE[S.view] || 'Grounded Money', line = T ? T.sub : LINE[S.view] || '';
      var kick = S.view === 'home' ? 'Grounded Money' : 'Grounded Money · ' + (P ? P.n : 'Tools');
      return '<header class="gm-hero' + (S.view === 'home' ? ' home' : '') + '"><div class="gm-hero-tx"><div><div class="gm-k">' + esc(kick) + '</div><h2 class="gm-h2">' + esc(title) + '</h2>' + (line ? '<p>' + esc(line) + '</p>' : '') + '</div></div>' + draw(P ? pt : 'home', 'gm-hero-draw') + '</header>';
    }
    // The five parts, always in reach, each in its own color.
    function pnav() {
      // BLD 941: One Page leads the row, and Tools and Tips ends it (Money Home opens from Tools and Tips).
      var cur = partOf(S.view) || (S.view === 'tools' || S.view === 'home' ? 'tools' : '');
      return '<nav class="gm-pnav" aria-label="Grounded Money parts"><button type="button" class="gm-pn gm-c-home" data-gm="go:sheet">' + I('list') + '<span>One Page</span></button>' +
        PARTS.map(function (x) { return '<button type="button" class="gm-pn gm-c-' + x.id + '" data-gm="go:' + x.id + '"' + (cur === x.id ? ' aria-current="page"' : '') + '>' + I(x.i) + '<span>' + esc(x.n) + '</span></button>'; }).join('') +
        '<button type="button" class="gm-pn gm-c-home" data-gm="go:tools"' + (cur === 'tools' ? ' aria-current="page"' : '') + '>' + I('grid') + '<span>Tools and Tips</span></button></nav>';
    }
    function tabs() {
      if (!(LIVE_VIEWS[S.view] || S.view === 'live')) return '';
      return '<nav class="gm-tabs" aria-label="Live">' + TABS.filter(function (t) { return !t.m || member(); }).map(function (t) {
        var on = S.view === t.v || (t.v === 'plan' && (S.view === 'import' || S.view === 'share'));
        return '<button type="button" class="gm-tab" data-gm="go:' + t.v + '"' + (on ? ' aria-current="page"' : '') + '>' + I(t.i) + '<span>' + esc(t.n) + '</span></button>';
      }).join('') + '</nav>';
    }
    function memberLine() {
      if (member()) return '';
      var b = opts.onMembership ? '<div class="gm-acts"><button type="button" class="gm-btn sm" data-gm="mem:see">See Membership</button><button type="button" class="gm-btn sm line" data-gm="mem:code">I Have a Code</button></div>' : '';
      return '<div class="gm-card gm-mem"><p class="gm-sub">Membership adds This Month, one tap logging, a weekly money check-in, one shared plan with your family, and every Grounded Money tool, with the Grounded Money Standards, the Windfall Planner, the Giving Tracker, Blind Spot Check, Growth Calculator, and Year Plan.</p>' + b + '</div>';
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
      var top, tr = balance(pct);
      if (short) {
        top = '<div class="gm-card gm-gap' + (left === 0 ? ' closed' : '') + '">' + tr + '<span class="gm-k">' + (left === 0 ? 'The Gap Is Closed' : 'Your Monthly Gap') + '</span>' +
          '<div class="gm-big" data-gm-gap="' + left + '">' + money(left) + '</div><p class="gm-sub">' + (left === 0 ? 'Your chosen ideas close the gap, with ' + money(t.after) + ' a month to spare for savings and giving.' : t.saved ? 'a month to close, down from ' + money(start) + '.' : 'a month to close. Each idea you choose brings it closer.') + '</p>' +
          '<div class="gm-bar" role="img" aria-label="' + pct + ' percent of the gap closed"><span style="width:' + pct + '%"></span></div>' +
          (t.saved ? '<p class="gm-mini">Ideas you chose: ' + money(t.saved) + ' a month</p>' : '') + '</div>';
      } else {
        top = '<div class="gm-card gm-gap closed">' + balance(100) + '<span class="gm-k">Ahead Each Month</span><div class="gm-big" data-gm-gap="0">' + money(t.after) + '</div><p class="gm-sub">Your income covers your plan. The ideas below grow what you keep for savings and giving.</p></div>';
      }
      var vis = t.ideas.filter(function (x) { return !x.off; }), hid = t.ideas.filter(function (x) { return x.off; });
      var cards = vis.map(ideaCard).join('');
      var mine = S.addIdea ? '<div class="gm-card gm-add"><h3 class="gm-h4">Add Your Own Idea</h3><label class="gm-f"><span>Idea</span><input class="gm-in" id="gm-in-n" maxlength="80" placeholder="Sell the extra bike"></label>' +
        '<div class="gm-two"><label class="gm-f"><span>About how much a month</span><input class="gm-in" id="gm-in-a" inputmode="decimal" placeholder="50"></label><label class="gm-f"><span>It</span><select class="gm-in" id="gm-in-k"><option value="spend">Saves</option><option value="income">Adds Income</option></select></label></div>' +
        '<div class="gm-acts"><button type="button" class="gm-btn sm" data-gm="idea:addsave">Add Idea</button><button type="button" class="gm-btn sm line" data-gm="idea:addcancel">Done</button></div></div>'
        : '<div class="gm-acts"><button type="button" class="gm-btn line sm" data-gm="idea:add">' + I('plus') + 'Add Your Own Idea</button></div>';
      var off = hid.length ? '<p class="gm-quiet"><button type="button" class="gm-linkbtn" data-gm="idea:showoff">' + (S.showOff ? 'Rest the hidden ideas' : 'Show ' + hid.length + ' hidden idea' + (hid.length > 1 ? 's' : '')) + '</button></p>' + (S.showOff ? hid.map(ideaCard).join('') : '') : '';
      return top + '<h3 class="gm-sec">Ideas From Your Own Plan</h3><div class="gm-ideas">' + cards + '</div>' + mine + off + tipCard() + memberLine();
    }
    function tipCard() {
      if (!TL()) return '';
      var T = TL(), i = T.tipOfWeek(), tip = T.tips[i];
      return '<div class="gm-card gm-tipwk"><span class="gm-k">This Week\u2019s Money Tip</span><p>' + esc(tip[1]) + '</p><button type="button" class="gm-linkbtn" data-gm="go:tool:tips">More Tips' + I('arrow') + '</button></div>';
    }
    // The balance: the beam levels as the gap closes (a still drawing; no motion needed).
    function balance(pct) {
      var a = -(1 - Math.max(0, Math.min(100, pct)) / 100) * 14;
      return '<svg class="gm-bal" viewBox="0 0 220 120" role="img" aria-label="' + (pct >= 100 ? 'Your plan in balance' : 'Your plan, ' + pct + ' percent of the way to balance') + '">' +
        '<ellipse cx="110" cy="112" rx="64" ry="6" class="gm-ground"/><path class="gm-bal-post" d="M110 104V34M88 108h44"/>' +
        '<g transform="rotate(' + a.toFixed(1) + ' 110 34)"><path class="gm-bal-beam" d="M46 34h128"/>' +
        '<path class="gm-bal-cord" d="M46 34l-16 34M46 34l16 34M174 34l-16 34M174 34l16 34"/><path class="gm-bal-pan" d="M26 68h40a20 10 0 0 1-40 0zM154 68h40a20 10 0 0 1-40 0z"/>' +
        '<ellipse class="gm-bal-coin" cx="46" cy="64" rx="11" ry="4"/><ellipse class="gm-bal-coin" cx="46" cy="59" rx="11" ry="4"/><path class="gm-bal-heart" d="M174 66c-6-4-10-7-10-11a5 5 0 0 1 10-2 5 5 0 0 1 10 2c0 4-4 7-10 11z"/></g>' +
        '<circle cx="110" cy="34" r="6" class="gm-bal-hub"/></svg>';
    }
    // A warm moment: a few leaves drift down over the card with a kind line (only a line under reduced motion).
    function celebrate(msg) {
      var box = document.createElement('div'); box.className = 'gm gm-cele'; box.setAttribute('role', 'status');
      var sp = ''; for (var i = 0; i < 14; i++) sp += '<span style="--x:' + (4 + (i * 37) % 92) + '%;--d:' + ((i * 0.17) % 1.4).toFixed(2) + 's;--r:' + ((i * 53) % 360) + 'deg" class="' + (i % 4 === 0 ? 'f' : '') + '"></span>';
      box.innerHTML = sp + '<p>' + I('sun') + esc(msg) + '</p>';
      el.appendChild(box);   // beside the drawn view, so a redraw keeps the moment
      setTimeout(function () { if (box.parentNode) box.remove(); }, 4200);
    }

    /* =====================================================================
       BLD 939: Money Home, the five parts, and cards that fold
       ===================================================================== */
    function readOpen() { try { return JSON.parse(sessionStorage.getItem('gg-money-open') || '{}') || {}; } catch (e) { return {}; } }
    function keepOpen() { try { sessionStorage.setItem('gg-money-open', JSON.stringify(S.open)); } catch (e) {} }
    function isOpen(key, dflt) { return S.open[key] == null ? !!dflt : !!S.open[key]; }
    // A card that folds: a header button (aria-expanded) with a summary line that stays in view when closed.
    // o: {t title, i icon, sum summary, body, open (the first time), need (a view this card opens; on Start a Membership view shows the Membership line), what (one line for Start)}
    function fold(key, o) {
      var locked = o.need && !allowed(o.need), on = isOpen(key, o.open), id = 'gmf-' + key;
      var sum = locked ? 'With Membership' : o.sum || '';
      var body = locked ? (o.taste || '<p class="gm-sub">' + esc(o.what || '') + '</p>') + memBtns() : o.body;
      return '<section class="gm-fc' + (on ? ' open' : '') + (locked ? ' locked' : '') + '" data-fold="' + esc(key) + '"><h3 class="gm-fh"><button type="button" class="gm-fbtn" data-gm="fold:' + esc(key) + '" aria-expanded="' + on + '" aria-controls="' + id + '">' +
        '<span class="gm-fic">' + I(o.i || 'leaf') + '</span><span class="gm-ftx"><b>' + esc(o.t) + '</b>' + (sum ? '<small class="gm-fsum">' + sum + '</small>' : '') + '</span><span class="gm-chev">' + I('chev') + '</span></button></h3>' +
        '<div class="gm-fbody" id="' + id + '"' + (on ? '' : ' hidden') + '>' + body + '</div></section>';
    }
    function memBtns() { return opts.onMembership ? '<div class="gm-acts"><button type="button" class="gm-btn sm" data-gm="mem:see">See Membership</button><button type="button" class="gm-btn sm line" data-gm="mem:code">I Have a Code</button></div>' : ''; }
    function openBtn(v, label, line) { return '<button type="button" class="gm-btn sm' + (line ? ' line' : '') + '" data-gm="go:' + v + '">' + esc(label) + I('arrow') + '</button>'; }
    function bar(pct, cls) { pct = Math.max(0, Math.min(100, Math.round(pct || 0))); return '<div class="gm-bar thin' + (cls ? ' ' + cls : '') + (pct >= 100 ? ' full' : '') + '" role="img" aria-label="' + pct + ' percent"><span style="width:' + pct + '%"></span></div>'; }
    function tl(id) { return TL() && TL().get(id); }
    function tv(d, id) { var t = d.tools[id]; return t && typeof t === 'object' ? t : {}; }
    function ess(d) { return live(d.lines).filter(function (l) { return l.s !== 'hold' && l.s !== 'pretax'; }).reduce(function (s, l) { return s + monthly(l); }, 0); }
    function n0(v) { var n = +v; return isFinite(n) ? n : 0; }

    // Where each part stands: {pct 0 to 100, line, next: [label, view]} (a quiet guide, never a score to chase).
    function status(d) {
      var T = TL(), M = T && T.math, out = {}, mn = MONTHS[new Date().getMonth()];
      // Give
      var g = T ? T.giveGoal(d) : 0, gs = M ? M.givenSums(tv(d, 'givelog').list) : { month: 0, year: 0 };
      out.give = g > 0 ? { pct: gs.month / g * 100, line: money(gs.month) + ' of ' + money(g) + ' given in ' + mn, next: gs.month < g ? ['Add a gift to the Giving Tracker', 'tool:givelog'] : null }
        : { pct: 0, line: 'Choose your giving goal', next: ['Set your giving goal', 'tool:give'] };
      // Live
      if (!live(d.lines).length) out.live = { pct: 0, line: 'Build your monthly plan', next: ['Build your monthly plan', 'gap'] };
      else { var t = totals(d), st = Math.abs(Math.min(0, t.gap)); out.live = t.after >= 0 ? { pct: 100, line: 'Ahead ' + money(t.after) + ' a month', next: null } : { pct: st ? t.saved / st * 100 : 0, line: money(-t.after) + ' a month to bring into balance', next: ['Close the Gap', 'gap'] }; }
      // Protect
      var gl = tv(d, 'goals'), e = ess(d), aim = n0(gl.efm) || 3, mo = e > 0 ? Math.floor(n0(gl.ef) / e * 10) / 10 : 0;
      var bl = M ? M.blindSums(tv(d, 'blind')) : { done: 0, total: 15, next: null }, ins = M ? M.insureSums(tv(d, 'insure')) : { have: 0, total: 6 };
      var pp = ((e > 0 ? Math.min(1, mo / aim) : 0) + (bl.total ? bl.done / bl.total : 1) + (ins.total ? ins.have / ins.total : 1)) / 3 * 100;
      out.protect = { pct: pp, line: e > 0 && n0(gl.ef) > 0 ? 'Emergency Fund: ' + mo + ' of ' + aim + ' months' : 'Blind Spots: ' + bl.done + ' of ' + bl.total + ' covered', ef: { mo: mo, aim: aim, has: e > 0 }, blind: bl, ins: ins,
        next: !(e > 0 && mo >= aim) ? ['Grow your emergency fund', 'tool:goals'] : bl.next ? ['Blind Spot Check: ' + bl.next[1], 'tool:blind'] : ins.have < ins.total ? ['Review your insurance', 'tool:insure'] : null };
      // Grow
      var gr = tv(d, 'grow'), gc = obj(gr.c), gm = n0(gc.monthly), match = gr.match, yrs = n0(gc.years) || 20;
      var fvv = M && gm > 0 ? M.fv(gc.start, gm, gc.rate == null ? 6 : gc.rate, yrs) : 0;
      out.grow = { pct: (gm > 0 || n0(obj(gr.r).monthly) > 0 ? 50 : 0) + (match === 'full' || match === 'na' ? 50 : match === 'check' ? 25 : 0),
        line: gm > 0 ? money(gm) + ' a month grows to ' + money(fvv) + ' in ' + yrs + ' years' : 'See how steady saving grows', next: gm > 0 ? (match === 'full' || match === 'na' ? null : ['Look at your employer match', 'grow']) : ['Try the Growth Calculator', 'tool:grow'] };
      // Plan
      var goals = arr(gl.goals).filter(function (x) { return n0(x.target) > 0; }), debts = arr(tv(d, 'debt').list).filter(function (x) { return n0(x.bal) > 0; }), yr = tv(d, 'year'), py = tv(d, 'pay');
      var hasYear = arr(yr.items).length || Object.keys(obj(yr.lm)).some(function (k) { return yr.lm[k] !== '' && yr.lm[k] != null; }), hasPay = n0(py.amt) > 0 || Object.keys(obj(py.due)).some(function (k) { return n0(py.due[k]) > 0; });
      var dp = M && debts.length ? M.debtPlan(debts, n0(tv(d, 'debt').extra), tv(d, 'debt').method) : null, dfree = dp && !dp.plan.stuck ? (function () { var x = new Date(); x.setMonth(x.getMonth() + dp.plan.months); return MONTHS[x.getMonth()] + ' ' + x.getFullYear(); })() : '';
      out.ahead = { pct: (goals.length ? 25 : 0) + (debts.length ? 25 : 0) + (hasYear ? 25 : 0) + (hasPay ? 25 : 0), goals: goals, debts: debts, dfree: dfree, hasYear: hasYear, hasPay: hasPay,
        line: dfree ? 'All debts paid off by ' + dfree : goals.length ? goals.length + ' savings goal' + (goals.length === 1 ? '' : 's') + ' in motion' : 'Goals, debt payoff, and your year',
        next: !goals.length ? ['Name a savings goal', 'tool:goals'] : !hasYear ? ['Map out your year', 'tool:year'] : !hasPay ? ['Plan your paychecks', 'tool:pay'] : null };
      Object.keys(out).forEach(function (k) { out[k].pct = Math.max(0, Math.min(100, Math.round(out[k].pct || 0))); });
      return out;
    }

    /* Money Home: five bright tiles, Your Money Picture, and the tip of the week. */
    function vHome(d) {
      var ss = status(d);
      var tiles = '<div class="gm-tiles">' + PARTS.map(function (x) {
        return '<button type="button" class="gm-tile gm-c-' + x.id + '" data-gm="go:' + x.id + '">' + draw(x.id, 'gm-tile-draw') + '<span class="gm-tile-tx"><b>' + esc(x.n) + '</b><small>' + esc(x.line) + '</small><span class="gm-tile-st">' + esc(ss[x.id].line) + '</span></span></button>';
      }).join('') + '</div>';
      var nx = PARTS.map(function (x) { return { p: x, s: ss[x.id] }; }).filter(function (r) { return r.s.next; }).sort(function (a, b) { return a.s.pct - b.s.pct; })[0];
      var pic = '<section class="gm-card gm-pic"><h3 class="gm-h3">Your Money Picture</h3><p class="gm-sub">Each part, side by side. A full picture leaves no blind spots.</p><div class="gm-picrows">' + PARTS.map(function (x) {
        return '<button type="button" class="gm-picrow gm-c-' + x.id + '" data-gm="go:' + x.id + '"><span class="gm-picn">' + I(x.i) + esc(x.n) + '</span>' + bar(ss[x.id].pct) + '<small>' + esc(ss[x.id].line) + '</small></button>';
      }).join('') + '</div>' + (nx ? '<div class="gm-nextstep gm-c-' + nx.p.id + '">' + I('star') + '<span><span class="gm-k">A Good Next Step</span><b>' + esc(nx.s.next[0]) + '</b></span>' + openBtn(allowed(nx.s.next[1]) ? nx.s.next[1] : nx.p.id, 'Go') + '</div>' : '<p class="gm-note">' + I('sun') + 'Every part is in motion. Look again each month, and enjoy the calm.</p>') + '</section>';
      var empty = !live(d.lines).length && !live(d.income).length ? '<div class="gm-card gm-hello gm-c-live"><h3 class="gm-h3">Start with your monthly plan.</h3><p class="gm-sub">Bring in the spreadsheet you already use, or start with a few common lines. Then each part fills in with your own numbers. Everything stays on this device.</p>' +
        '<div class="gm-acts"><button type="button" class="gm-btn" data-gm="go:import">' + I('up') + 'Bring In a Spreadsheet</button><button type="button" class="gm-btn line" data-gm="common">Start With Common Lines</button></div></div>' : '';
      return empty + tiles + stdCard(d) + pic + tipCard() + '<div class="gm-acts gm-center"><button type="button" class="gm-btn line sm" data-gm="go:sheet">' + I('list') + 'One Page</button><button type="button" class="gm-btn line sm" data-gm="go:tools">' + I('grid') + 'Tools and Tips</button></div>' + memberLine();
    }

    /* BLD 940: the Grounded Money Standards on Money Home and as a short row on each part page. */
    var STRIP = { give: ['give'], live: ['home', 'food', 'move', 'fun'], protect: ['health'], grow: ['save'], ahead: ['debt'] };
    function stdReady(d) { return !!(TL() && TL().math.stdView && member() && live(d.lines).length && totals(d).income > 0); }
    function stdOf(d) { return TL().math.stdView(d, tv(d, 'std')); }
    function stdSum(d) { if (!stdReady(d)) return ''; var v = stdOf(d); return (v.season.building ? 'Building Season: ' + v.season.done + ' of 5 steps' : 'Growing Season') + ', goal: ' + TL().goals.filter(function (g) { return g[0] === v.goal; })[0][1]; }
    function stdCard(d) {
      if (!TL() || !TL().math.stdView) return '';
      if (!member()) return '<section class="gm-card gm-stdcard gm-c-ahead"><span class="gm-k">Grounded Money Standards</span><h3 class="gm-h3">Your plan beside suggested shares of take-home pay.</h3><p class="gm-sub">Giving, saving, housing, food, and more, sized for your household, with Building Season and Growing Season steps.</p><div class="gm-acts">' + openBtn('ahead', 'See a Sample') + '</div></section>';
      if (!stdReady(d)) return '';
      var v = stdOf(d), on = v.rows.filter(function (r) { return r.k === 'on' || r.k === 'fair'; }).length, all = v.rows.filter(function (r) { return r.lo != null; }).length;
      return '<section class="gm-card gm-stdcard gm-c-ahead" data-season="' + (v.season.building ? 'building' : 'growing') + '"><span class="gm-k">Grounded Money Standards</span><h3 class="gm-h3">' + (v.season.building ? 'Building Season: every step here is a win.' : 'Growing Season: your plan has room to grow.') + '</h3>' +
        '<p class="gm-sub">' + (v.season.building ? v.season.done + ' of 5 Building Season steps done. ' : '') + on + ' of ' + all + ' areas on track or fair for your family size.</p><div class="gm-acts">' + openBtn('tool:std', 'See My Standards') + '</div></section>';
    }
    function stdStrip(d, part) {
      if (!stdReady(d) || !STRIP[part]) return '';
      var v = stdOf(d);
      return '<div class="gm-stdstrip" data-strip="' + part + '"><span class="gm-k">Grounded Money Standards</span>' + STRIP[part].map(function (id) { var r = v.by[id];
        return '<span class="gm-stdchip k-' + r.k + '" data-area="' + id + '"><b>' + esc(r.n) + '</b> ' + Math.round(r.pct) + '% <small>of ' + r.lo + ' to ' + r.hi + '%</small> <em>' + esc(r.word) + '</em></span>'; }).join('') +
        '<button type="button" class="gm-linkbtn" data-gm="go:tool:std">See All' + I('arrow') + '</button></div>';
    }

    /* A part page: its cards, its tips, and the way on to the next part. */
    function vPart(d, id) {
      var ss = status(d), s = ss[id], P = PART[id], cards = [];
      if (id === 'give') cards = partGive(d, s);
      else if (id === 'live') cards = partLive(d, s);
      else if (id === 'protect') cards = partProtect(d, s);
      else if (id === 'grow') cards = partGrow(d, s);
      else cards = partPlan(d, s);
      cards.push(tipsFold(id));
      var nx = PARTS[P.ix + 1];
      return '<div class="gm-partsum gm-c-' + id + '"><b>' + esc(s.line) + '</b>' + bar(s.pct) + '</div>' + stdStrip(d, id) +
        '<div class="gm-fcs">' + cards.join('') + '</div>' +
        (nx ? '<button type="button" class="gm-next gm-c-' + nx.id + '" data-gm="go:' + nx.id + '">' + draw(nx.id, 'gm-next-draw') + '<span><span class="gm-k">Next Part</span><b>' + esc(nx.n) + '</b><small>' + esc(nx.line) + '</small></span>' + I('arrow') + '</button>'
          : '<button type="button" class="gm-next gm-c-home" data-gm="go:home">' + draw('home', 'gm-next-draw') + '<span><span class="gm-k">All Five Parts</span><b>Money Home</b><small>Your whole money picture, side by side.</small></span>' + I('arrow') + '</button>') + memberLine();
    }
    function tipsFold(part) {
      if (!TL() || !TL().partTips) return '';
      var T = TL(), ix = T.partTips(part), keep = obj(tv(D() || { tools: {} }, 'tips').keep), name = PART[part].n;
      return fold(part + '-tips', { t: name + ' Tips', i: 'leaf', sum: ix.length + ' short tips', body: '<ul class="gm-tips">' + ix.map(function (i) { var on = !!keep[i]; return '<li><p>' + esc(T.tips[i][1]) + '</p><button type="button" class="gm-linkbtn" data-gm="tool:tips:keep:' + i + '" aria-pressed="' + on + '">' + (on ? 'Trying This' : 'Try This') + '</button></li>'; }).join('') + '</ul>' + '<div class="gm-acts">' + openBtn('tool:tips', 'All Tips', 1) + '</div>' });
    }
    function toolTiles(ids) { return '<div class="gm-tools">' + ids.map(function (id) { var T = tl(id); return T ? toolCard(T) : ''; }).join('') + '</div>'; }
    function partGive(d, s) {
      var g = TL() ? TL().giveGoal(d) : 0, gv = tv(d, 'give'), gs = TL() ? TL().math.givenSums(tv(d, 'givelog').list) : { month: 0, year: 0 }, mn = MONTHS[new Date().getMonth()];
      var recent = arr(tv(d, 'givelog').list).slice().sort(function (a, b) { return a.d < b.d ? 1 : -1; }).slice(0, 3), gen = obj(tv(d, 'generous')), gn = GEN.filter(function (x) { return gen[x[0]]; }).length;
      return [
        fold('give-goal', { t: 'Giving Goal', i: 'gift', open: 1, need: 'tool:give', what: 'Choose your giving first: a percent of income or a set amount each month, and the causes and people it goes to.',
          sum: g > 0 ? esc(money(g) + ' a month' + (gv.mode === 'amt' ? '' : ', ' + n0(gv.pct == null ? 10 : gv.pct) + '% of income')) : 'Choose a percent or an amount',
          body: (g > 0 ? '<div class="gm-tbigs"><div class="gm-tbig ok"><span class="gm-k">Giving a Month</span><b>' + money(g) + '</b></div><div class="gm-tbig"><span class="gm-k">Giving a Year</span><b>' + money(g * 12) + '</b></div></div>' : '<p class="gm-sub">Generosity grows when it comes first. Choose a percent of income or a set amount; you choose what fits your home.</p>') + '<div class="gm-acts">' + openBtn('tool:give', 'Giving Planner') + '</div>' }),
        fold('give-track', { t: 'Giving Tracker', i: 'heart', need: 'tool:givelog', what: 'What you gave and to whom, with a running total for the month and the year beside your goal.',
          sum: esc(money(gs.month, 1) + (g > 0 ? ' of ' + money(g) : '') + ' given in ' + mn),
          body: (g > 0 ? '<div class="gm-prog"><div class="gm-pt"><b>' + esc(mn) + '</b><span>' + money(gs.month, 1) + ' of ' + money(g) + '</span></div>' + bar(gs.month / g * 100) + '</div><div class="gm-prog"><div class="gm-pt"><b>This Year</b><span>' + money(gs.year, 1) + ' of ' + money(g * 12) + '</span></div>' + bar(gs.year / (g * 12) * 100) + '</div>' : '') +
            (recent.length ? '<ul class="gm-mlist">' + recent.map(function (x) { return '<li><span>' + esc(niceDate(x.d)) + '</span><b>' + esc(x.n || 'A gift') + '</b><span>' + money(x.a, 1) + '</span></li>'; }).join('') + '</ul>' : '<p class="gm-sub">Each gift you add shows here, with a running total.</p>') + '<div class="gm-acts">' + openBtn('tool:givelog', 'Giving Tracker') + '</div>' }),
        fold('give-more', { t: 'Generosity Beyond Money', i: 'people', sum: gn ? gn + ' of ' + GEN.length + ' you are trying' : GEN.length + ' gifts of time, skill, and presence',
          body: '<p class="gm-sub">Some of the best gifts cost nothing but time. Choose one or two for this month.</p><ul class="gm-gen">' + GEN.map(function (x) { var on = !!gen[x[0]]; return '<li class="' + (on ? 'on' : '') + '"><button type="button" class="gm-tick" data-gm="gen:' + x[0] + '" aria-pressed="' + on + '" aria-label="' + esc((on ? 'Trying: ' : 'Try: ') + x[1]) + '">' + I('check') + '</button><span class="gm-tx"><b>' + esc(x[1]) + '</b><small>' + esc(x[2]) + '</small></span></li>'; }).join('') + '</ul>' })
      ];
    }
    function partLive(d, s) {
      var has = live(d.lines).length, t = totals(d), m = has ? month(d) : null, wk = d.checks[weekKey()], L = live(d.lines), N = live(d.income);
      return [
        fold('live-gap', { t: 'Close the Gap', i: 'gap', open: 1, sum: esc(has ? (t.after >= 0 ? 'Ahead ' + money(t.after) + ' a month' : money(-t.after) + ' a month to bring into balance') : 'Start with your plan'),
          body: (has ? balance(Math.abs(Math.min(0, t.gap)) ? Math.min(100, Math.round(t.saved / Math.abs(t.gap) * 100)) : 100) + '<p class="gm-sub">Ideas from your own plan, each showing what it saves. Choose a few, and watch the plan come into balance.</p>' : '<p class="gm-sub">Bring in your spreadsheet or start with common lines, and Close the Gap shows ideas that fit your numbers.</p>') + '<div class="gm-acts">' + openBtn('gap', 'Close the Gap') + '</div>' }),
        fold('live-plan', { t: 'My Plan', i: 'list', sum: esc(L.length + ' line' + (L.length === 1 ? '' : 's') + ', ' + N.length + ' income source' + (N.length === 1 ? '' : 's')),
          body: sumRow(t) + '<div class="gm-acts">' + openBtn('plan', 'My Plan') + openBtn('import', 'Bring In a Spreadsheet', 1) + (member() ? openBtn('share', 'Share With Family', 1) : '') + '</div>' }),
        fold('live-month', { t: 'This Month', i: 'cal', need: 'month', what: 'Where this month is going, line by line, with one tap logging as you spend.', sum: esc(m ? m.line : 'Your month at a glance'),
          body: (m ? '<p class="gm-line1 ' + (m.diff >= 0 ? 'ok' : 'gp') + '">' + I(m.diff >= 0 ? 'sun' : 'leaf') + esc(m.line) + '</p><p class="gm-mini">Logged so far: ' + money(m.logged, 1) + '</p>' : '') + '<div class="gm-acts">' + openBtn('month', 'This Month') + openBtn('log', 'Log Spending', 1) + '</div>' }),
        fold('live-check', { t: 'Weekly Money Check-in', i: 'leaf', need: 'check', what: 'Three short questions each week, about a minute, calm and forward.', sum: wk ? 'Saved for this week' : 'About a minute, three questions',
          body: '<p class="gm-sub">What went well, how steady money feels, and one small step for the week ahead.</p><div class="gm-acts">' + openBtn('check', wk ? 'See This Week' : 'Start My Check-in') + '</div>' }),
        fold('live-save', { t: 'Ways to Save', i: 'coin', sum: 'Groceries, subscriptions, calls, and the car', body: toolTiles(['grocery', 'subs', 'calls', 'car']) }),
        fold('live-home', { t: 'Family and Home', i: 'people', sum: 'A weekly Money Date, and allowances for the kids', body: toolTiles(['date', 'kids']) })
      ];
    }
    function partProtect(d, s) {
      var ef = s.ef, bl = s.blind, ins = s.ins, gl = tv(d, 'goals'), iv = obj(tv(d, 'insure').k);
      return [
        fold('prot-fund', { t: 'Emergency Fund', i: 'shield', open: 1, need: 'tool:goals', what: 'A cushion of three to six months of spending, set aside for a hard season, with months covered at a glance.',
          sum: ef.has && n0(gl.ef) > 0 ? ef.mo + ' of ' + ef.aim + ' months' : 'Set aside a few months of spending',
          body: (ef.has ? '<div class="gm-prog"><div class="gm-pt"><b>Months Covered</b><span>' + ef.mo + ' of ' + ef.aim + '</span></div>' + bar(ef.mo / ef.aim * 100) + '</div>' : '<p class="gm-sub">Add your plan’s lines, and the months covered show here.</p>') + '<div class="gm-acts">' + openBtn('tool:goals', 'Emergency Fund') + '</div>' }),
        fold('prot-insure', { t: 'Insurance Overview', i: 'umbrella', need: 'tool:insure', what: 'Health, life, disability, home or renters, auto, and umbrella coverage at a glance: in place, or time to review.',
          sum: ins.have + ' of ' + ins.total + ' in place',
          body: '<ul class="gm-ilist">' + (TL() ? TL().insure : []).map(function (k) { var v = iv[k[0]]; return '<li class="' + (v || 'open') + '"><span>' + esc(k[1]) + '</span><b>' + (v === 'have' ? 'In Place' : v === 'review' ? 'Review' : v === 'na' ? 'Left Off' : 'To Look At') + '</b></li>'; }).join('') + '</ul><div class="gm-acts">' + openBtn('tool:insure', 'Insurance Overview') + '</div>' }),
        fold('prot-blind', { t: 'Blind Spot Check', i: 'eye', need: 'tool:blind', what: 'A will, beneficiaries, a health care directive, a credit freeze, an account list for family, and more: the often missed pieces, one by one.',
          sum: bl.done + ' of ' + bl.total + ' covered',
          body: '<div class="gm-blindsum">' + (TL() ? ring(bl.total ? bl.done / bl.total * 100 : 0) : '') + '<span>' + (bl.next ? '<span class="gm-k">Your Next Step</span><b>' + esc(bl.next[1]) + '</b><small>' + esc(bl.next[3]) + '</small>' : '<b>No blind spots.</b><small>Look again once a year.</small>') + '</span></div><div class="gm-acts">' + openBtn('tool:blind', 'Blind Spot Check') + '</div>' })
      ];
    }
    function ring(p) { p = Math.max(0, Math.min(100, Math.round(p))); var R = 26, C = 2 * Math.PI * R; return '<svg class="gm-ring" viewBox="0 0 64 64" role="img" aria-label="' + p + ' percent covered"><circle cx="32" cy="32" r="' + R + '" class="gm-ring-bg"/>' + (p > 0 ? '<circle cx="32" cy="32" r="' + R + '" class="gm-ring-fg" stroke-dasharray="' + (C * p / 100).toFixed(1) + ' ' + C.toFixed(1) + '" transform="rotate(-90 32 32)"/>' : '') + '<text x="32" y="37" text-anchor="middle">' + p + '%</text></svg>'; }
    function partGrow(d, s) {
      var gr = tv(d, 'grow'), match = gr.match || '', sd = tv(d, 'side'), sideRows = arr(sd.rows).filter(function (r) { return n0(r.qty) * n0(r.rate) > 0; });
      var MATCH = [['full', 'I Receive the Full Match'], ['check', 'I Will Look This Week'], ['na', 'Self Employed or Another Plan']];
      return [
        fold('grow-calc', { t: 'Growth Calculator', i: 'chart', open: 1, need: 'tool:grow', what: 'Compound growth and a retirement estimate: how much a monthly amount grows by the age you choose.',
          sum: esc(s.line), body: '<p class="gm-sub">Money set aside each month earns growth, and that growth earns more. Try a monthly amount and a number of years.</p><div class="gm-acts">' + openBtn('tool:grow', 'Growth Calculator') + '</div>' }),
        fold('grow-mix', { t: 'Diversification: Spread It Out', i: 'grid', sum: 'A mix of kinds, so no single one carries your future',
          body: '<div class="gm-mix">' + mixArt() + '<div class="gm-mixtx"><p class="gm-sub">Diversification means owning a mix of investment kinds. <b>Stocks</b> are small shares of many companies, for long term growth. <b>Bonds</b> are loans to governments and companies, for steadiness. <b>Cash</b> covers what you need soon.</p>' +
            '<p class="gm-sub">Many people use low cost index funds, which hold hundreds of companies in one fund, as a simple way to spread risk and keep fees small. Steady monthly amounts and time do much of the work.</p><p class="gm-mini">For your own plan, a licensed financial planner can help.</p></div></div>' }),
        fold('grow-match', { t: 'Employer Match', i: 'star', sum: match === 'full' ? 'Receiving the full match' : match === 'na' ? 'Another plan fits you' : match === 'check' ? 'Looking this week' : 'Money your workplace adds beside yours',
          body: '<p class="gm-sub">Many workplaces add to your retirement account when you add to it, often matching part of what you put in. Putting in at least enough to receive the full match is one of the strongest first steps in growing your money.</p>' +
            '<div class="gm-scale">' + MATCH.map(function (x) { var on = match === x[0]; return '<button type="button" class="gm-chip' + (on ? ' on' : '') + '" aria-pressed="' + on + '" data-gm="match:' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</div>' }),
        fold('grow-order', { t: 'A Common Order of Steps', i: 'path', sum: 'Five steps many families follow',
          body: '<ol class="gm-steps"><li><b>Start an emergency fund.</b> One month first, then three to six.</li><li><b>Receive the full employer match.</b> Money added beside yours.</li><li><b>Pay off high interest debt.</b> The Debt Payoff Planner shows the month.</li><li><b>Invest steadily each month.</b> A low cost mix, spread out, for the long run.</li><li><b>Keep giving and keep growing.</b> Generosity and growth travel well together.</li></ol><p class="gm-mini">For your own plan, a licensed financial planner can help.</p>' }),
        fold('grow-side', { t: 'Side Income', i: 'sprout', need: 'tool:side', what: 'Ceremonies, lessons, repairs, or seasonal work: what a few hours or events a month bring in, after taxes.',
          sum: sideRows.length && TL() ? esc(money(TL().math.sideIncome(sd.rows, sd.tax == null ? 25 : sd.tax).keep) + ' a month to keep') : 'Hours or events a month, times your rate',
          body: '<p class="gm-sub">A skill you already have, a few hours a month, can fund a goal or close a gap.</p><div class="gm-acts">' + openBtn('tool:side', 'Side Income Calculator') + '</div>' })
      ];
    }
    function partPlan(d, s) {
      var gl = tv(d, 'goals'), goals = s.goals, py = tv(d, 'pay'), PAYN = { w: 'Weekly', b: 'Every two weeks', s: 'Twice a month', m: 'Monthly' }, setA = live(d.lines).filter(function (l) { return l.s !== 'hold' && (l.f === 'y' || l.f === 'h' || l.f === 's'); }).reduce(function (z, l) { return z + monthly(l); }, 0);
      var nextGoal = goals.filter(function (x) { return n0(x.saved) < n0(x.target); }).sort(function (a, b) { return String(a.date || '9') < String(b.date || '9') ? -1 : 1; })[0];
      return [
        fold('plan-std', { t: 'Grounded Money Standards', i: 'star', open: 1, need: 'tool:std', taste: TL() && TL().stdTaste ? TL().stdTaste() : '',
          what: 'Suggested shares of take-home pay, side by side with your plan, sized for your household.',
          sum: esc(stdSum(d) || 'Your plan beside suggested shares of take-home pay'),
          body: '<p class="gm-sub">Giving, saving, housing, food, and more, each beside a suggested share of take-home pay, with a kind word and a next step for your top goal.</p><div class="gm-acts">' + openBtn('tool:std', 'Grounded Money Standards') + '</div>' }),
        fold('plan-wind', { t: 'Windfall Planner', i: 'sun', need: 'tool:windfall', what: 'A tax return, a bonus, or a gift, given a plan in one calm order: a starter emergency fund, the highest rate card, then your goals.',
          sum: 'A tax return, bonus, or gift, given a plan',
          body: '<p class="gm-sub">Money that arrives all at once finds its place in order: a starter emergency fund, the highest rate card, your goals, and the rest.</p><div class="gm-acts">' + openBtn('tool:windfall', 'Windfall Planner') + '</div>' }),
        fold('plan-goals', { t: 'Savings Goals', i: 'star', open: 1, need: 'tool:goals', what: 'Name each goal, its target, and its date, and see the monthly amount that gets you there.',
          sum: goals.length ? esc(goals.length + ' goal' + (goals.length === 1 ? '' : 's') + (nextGoal ? ', next: ' + (nextGoal.n || 'Goal') : '')) : 'Name a goal and its date',
          body: (goals.length ? goals.slice(0, 4).map(function (x) { return '<div class="gm-prog"><div class="gm-pt"><b>' + esc(x.n || 'Goal') + '</b><span>' + money(x.saved) + ' of ' + money(x.target) + '</span></div>' + bar(n0(x.saved) / n0(x.target) * 100) + '</div>'; }).join('') : '<p class="gm-sub">A family trip, a newer car, a home repair: each goal gets its own target and date.</p>') + '<div class="gm-acts">' + openBtn('tool:goals', 'Savings Goals') + '</div>' }),
        fold('plan-debt', { t: 'Debt Payoff', i: 'path', need: 'tool:debt', what: 'Smallest balance first or highest rate first: your payoff month and the interest you keep.',
          sum: s.dfree ? esc('All paid off by ' + s.dfree) : s.debts.length ? s.debts.length + ' debts listed' : 'Your payoff month, and the interest you keep',
          body: '<p class="gm-sub">List each debt with its balance, rate, and minimum, and watch the payoff month come closer as you add a little each month.</p><div class="gm-acts">' + openBtn('tool:debt', 'Debt Payoff Planner') + '</div>' }),
        fold('plan-big', { t: 'Big Purchases and Set-Aside Funds', i: 'jar', need: 'tool:fund', what: 'A little each month for yearly bills and big purchases, so each one arrives ready.',
          sum: setA ? esc(money(setA) + ' a month set aside') : 'A little each month for the big ones',
          body: '<p class="gm-sub">Yearly bills become set-aside funds, and a big purchase becomes a savings goal with its own date.</p><div class="gm-acts">' + openBtn('tool:fund', 'Set-Aside Funds') + openBtn('tool:goals', 'Add a Big Purchase Goal', 1) + '</div>' }),
        fold('plan-pay', { t: 'Paycheck Planner', i: 'cal', need: 'tool:pay', what: 'Which bills each paycheck covers, and the months with an extra paycheck.',
          sum: s.hasPay ? esc('Paid ' + (PAYN[py.s] || 'every two weeks').toLowerCase()) : 'Bills by paycheck, and extra paycheck months',
          body: '<p class="gm-sub">Every bill gets its paycheck, and each extra paycheck month goes to a goal.</p><div class="gm-acts">' + openBtn('tool:pay', 'Paycheck Planner') + '</div>' }),
        fold('plan-year', { t: 'Year Plan', i: 'map', need: 'tool:year', what: 'Big dates, yearly bills, and goals, season by season, so nothing big arrives as a surprise.',
          sum: s.hasYear ? 'Your year, season by season' : 'Big dates, yearly bills, and goals by season',
          body: yearStrip(d) + '<div class="gm-acts">' + openBtn('tool:year', 'Year Plan') + '</div>' })
      ];
    }
    // Twelve small months, each marked when the Year Plan holds something for it.
    function yearStrip(d) {
      var yr = tv(d, 'year'), on = {}; arr(yr.items).forEach(function (x) { on[+x.m || 0] = 1; }); Object.keys(obj(yr.lm)).forEach(function (k) { var m = yr.lm[k]; if (m !== '' && m != null && isFinite(+m)) on[+m] = 1; });
      return '<div class="gm-ystrip" role="img" aria-label="' + Object.keys(on).length + ' months with plans">' + MONTHS.map(function (m, i) { return '<span class="' + (on[i] ? 'on' : '') + (i === new Date().getMonth() ? ' now' : '') + '">' + m.slice(0, 1) + '</span>'; }).join('') + '</div>';
    }
    function mixArt() {
      // An illustration of a mix (three kinds), never a recommended split.
      return '<svg class="gm-mixart" viewBox="0 0 120 120" role="img" aria-label="A drawing of a mix of three investment kinds"><circle cx="60" cy="60" r="44" class="mx-a"/><path d="M60 60L60 16A44 44 0 0 1 101 76z" class="mx-b"/><path d="M60 60L101 76A44 44 0 0 1 82 98z" class="mx-c"/><circle cx="60" cy="60" r="22" class="mx-hole"/>' +
        '<text x="60" y="57" text-anchor="middle">A Mix</text><text x="60" y="70" text-anchor="middle" class="mx-sm">of kinds</text></svg>';
    }

    /* The drawings: simple, bright, in each part's own color (Give a gift and a heart, Live a home in the sun, Protect a shield,
       Grow rising bars, Plan a map with a path, Money Home coins in the sun). */
    function draw(id, cls) {
      var g = '<ellipse class="d-g" cx="60" cy="92" rx="46" ry="6"/>', a = '';
      if (id === 'give') a = g + '<rect class="d-k" x="32" y="50" width="56" height="38" rx="5"/><rect class="d-k2" x="28" y="40" width="64" height="14" rx="4"/><rect class="d-h" x="55" y="40" width="10" height="48"/>' +
        '<ellipse class="d-h" cx="50" cy="35" rx="10" ry="6" transform="rotate(-25 50 35)"/><ellipse class="d-h" cx="70" cy="35" rx="10" ry="6" transform="rotate(25 70 35)"/><circle class="d-h2" cx="60" cy="38" r="4"/>' +
        '<path class="d-k" d="M98 30c-7-5-11-8-11-12.5a5.5 5.5 0 0 1 11-2 5.5 5.5 0 0 1 11 2c0 4.5-4 7.5-11 12.5z"/><circle class="d-h" cx="20" cy="26" r="3"/><circle class="d-h" cx="104" cy="50" r="2.5"/>';
      else if (id === 'live') a = g + '<circle class="d-h" cx="96" cy="22" r="11"/><path class="d-hl" d="M96 4v4M96 36v4M78 22h4M110 22h4M83 9l3 3M106 32l3 3M83 35l3-3M106 12l3-3"/>' +
        '<rect class="d-s" x="30" y="48" width="56" height="40" rx="3"/><rect class="d-k" x="70" y="26" width="8" height="16"/><path class="d-k" d="M22 52L58 22l36 30z"/><rect class="d-k2" x="51" y="64" width="13" height="24" rx="2"/><rect class="d-h" x="36" y="58" width="10" height="10" rx="2"/><rect class="d-h" x="70" y="58" width="10" height="10" rx="2"/>';
      else if (id === 'protect') a = g + '<path class="d-k" d="M60 10l32 12v24c0 21-14 36-32 43-18-7-32-22-32-43V22z"/><path class="d-s" d="M60 20l23 9v17c0 15-10 26-23 32z"/><path class="d-lw" d="M45 50l10 10 20-21"/>' +
        '<path class="d-h" d="M100 18l2.5 5 5 2.5-5 2.5-2.5 5-2.5-5-5-2.5 5-2.5z"/><path class="d-h" d="M18 34l2 4 4 2-4 2-2 4-2-4-4-2 4-2z"/>';
      else if (id === 'grow') a = g + '<rect class="d-s" x="22" y="64" width="15" height="24" rx="3"/><rect class="d-s" x="42" y="54" width="15" height="34" rx="3"/><rect class="d-k2" x="62" y="42" width="15" height="46" rx="3"/><rect class="d-k" x="82" y="28" width="15" height="60" rx="3"/>' +
        '<path class="d-hl3" d="M18 52L40 40l18 6L94 14"/><path class="d-hl3" d="M80 13h15v15"/><circle class="d-h" cx="104" cy="70" r="7"/><circle class="d-h2" cx="104" cy="70" r="3"/>';
      else if (id === 'ahead') a = g + '<path class="d-s d-st" d="M16 24l28-8 28 8 32-8v62l-32 8-28-8-28 8z"/><path class="d-ln" d="M44 16v62M72 24v62"/><path class="d-dash" d="M26 70c10-18 22-4 30-18s20-14 28-16"/>' +
        '<path class="d-k" d="M88 14a10 10 0 0 1 10 10c0 8-10 18-10 18s-10-10-10-18a10 10 0 0 1 10-10z"/><circle class="d-w" cx="88" cy="24" r="3.6"/><circle class="d-h" cx="26" cy="70" r="4"/>';
      else a = g + '<circle class="d-h" cx="92" cy="24" r="12"/><path class="d-hl" d="M92 4v4M92 40v4M72 24h4M108 24h4M78 10l3 3M103 35l3 3M78 38l3-3M103 13l3-3"/>' +
        '<ellipse class="d-k2" cx="46" cy="82" rx="22" ry="7"/><rect class="d-k2" x="24" y="72" width="44" height="10"/><ellipse class="d-k" cx="46" cy="72" rx="22" ry="7"/><rect class="d-k" x="24" y="62" width="44" height="10"/><ellipse class="d-h" cx="46" cy="62" rx="22" ry="7"/><rect class="d-h" x="24" y="52" width="44" height="10"/><ellipse class="d-h2" cx="46" cy="52" rx="22" ry="7"/>' +
        '<circle class="p-give" cx="80" cy="66" r="5"/><circle class="p-live" cx="92" cy="60" r="5"/><circle class="p-protect" cx="104" cy="66" r="5"/><circle class="p-grow" cx="86" cy="78" r="5"/><circle class="p-ahead" cx="99" cy="78" r="5"/>';
      return '<svg class="gm-draw ' + (cls || '') + '" viewBox="0 0 120 100" aria-hidden="true" focusable="false">' + a + '</svg>';
    }

    /* =====================================================================
       BLD 941: the One Page sheet. Everything at once, like a simple spreadsheet: three totals, a chip row, and three
       compact panels. Tap a name or an amount to change it in place (Enter or leaving the field saves, Escape keeps it as
       it was), tap a tag for the next status, and the dots open How Often, every status, and Remove (with Undo).
       ===================================================================== */
    var TAG_CYCLE = ['fixed', 'varies', 'est', 'hold'];
    var FREQ_WORD = { m: 'a month', b: 'every two weeks', h: 'twice a year', y: 'a year', s: 'a year, spread monthly' };
    function sortOf(d) { var t = tv(d, 'sheet'); return t.sort === 'big' ? 'big' : 'mine'; }
    function vSheet(d) {
      var t = totals(d), all = live(d.lines), B = all.filter(function (l) { return l.s === 'pretax'; }), N = live(d.income);
      var L = all.filter(function (l) { return l.s !== 'pretax'; }), big = sortOf(d) === 'big';
      if (big) L = L.slice().sort(function (a, b) { return (b.s === 'hold' ? -1 : monthly(b)) - (a.s === 'hold' ? -1 : monthly(a)); });
      var top = '<header class="gm-stop"><h2 class="gm-h2 gm-stitle">Grounded Money</h2><span class="gm-smonth">' + esc(MONTHS[new Date().getMonth()]) + ' Plan · tap any number to change it</span></header>';
      var empty = !all.length && !N.length ? '<div class="gm-acts gm-sstart"><button type="button" class="gm-btn" data-gm="go:import">' + I('up') + 'Bring In a Spreadsheet</button><button type="button" class="gm-btn line" data-gm="common">Start With Common Lines</button></div>' : '';
      var exp = panel('out', 'Expenses', t.lineOut, L.map(function (l) { return sRow(l, 'line'); }).join(''),
        '<div class="gm-sadd"><button type="button" class="gm-addb" data-gm="sadd:line">' + I('plus') + 'Add a Line</button><button type="button" class="gm-linkbtn" data-gm="go:import">' + I('up') + 'Bring In a Spreadsheet</button></div>',
        L.length > 1 ? '<button type="button" class="gm-ssort" data-gm="ssort" aria-pressed="' + big + '" aria-label="Order: ' + (big ? 'Largest First' : 'Order Added') + '. Tap to change">' + I('sort') + (big ? 'Largest First' : 'Order Added') + '</button>' : '');
      var inc = panel('in', 'Income', t.income, N.map(function (s) { return sRow(s, 'income'); }).join(''), '<div class="gm-sadd"><button type="button" class="gm-addb" data-gm="sadd:income">' + I('plus') + 'Add Income</button></div>');
      var pre = panel('pre', 'Before Taxes', t.pretax, B.map(function (l) { return sRow(l, 'pre'); }).join(''),
        (B.length ? '<p class="gm-snote">Counted as saving. Already out before pay.</p>' : '') + '<div class="gm-sadd"><button type="button" class="gm-addb" data-gm="sadd:pre">' + I('plus') + 'Add Before Taxes</button></div>');
      var acts = '<div class="gm-acts gm-sacts">' + (member() ? '<button type="button" class="gm-btn" data-gm="go:month">' + I('cal') + 'This Month</button>' : '') +
        '<button type="button" class="gm-btn' + (member() ? ' line' : '') + '" data-gm="go:gap">' + I('gap') + 'Close the Gap</button><button type="button" class="gm-btn line" data-gm="go:tools">' + I('grid') + 'Tools and Tips</button>' +
        (member() ? '<button type="button" class="gm-btn line" data-gm="go:share">' + I('share') + 'Share With Family</button>' : '') + '</div>' +
        (d.own ? '<p class="gm-quiet">You follow a Family plan. <button type="button" class="gm-linkbtn" data-gm="leave">' + (S.sureLeave ? 'Tap Again to Return to My Own Plan' : 'Return to My Own Plan') + '</button></p>' : '');
      return top + sheetBoxes(t) + sheetChips(d, t) + empty + '<div class="gm-scols"><div class="gm-sleft">' + exp + '</div><div class="gm-sright">' + inc + pre + vFunds(d, t) + '</div></div>' + acts;
    }
    /* BLD 942: Set-Asides. One compact row a fund: its name, the amount counted this month, a slim bar for how full it is,
       and a small line. The dots open its amounts, due months or cap, Pay From This Fund, Add to Balance, Kind, and Remove. */
    var MON3 = MONTHS.map(function (m) { return m.slice(0, 3); });
    function fundLine(d, f) {
      var mk = monthKey(), need = fundNeed(d, f, mk), bal = +f.bal || 0, a = fundMonth(d, f, mk);
      if (f.kind === 'jic' && !f.hol) {
        if (need.full) return { t: 'Full · ' + money(a) + ' this month', pct: 100, full: 1 };
        return { t: f.cap > 0 ? money(bal) + ' of ' + money(f.cap) : money(bal) + ' set aside', pct: f.cap > 0 ? Math.max(0, Math.min(100, Math.round(bal / f.cap * 100))) : 0 };
      }
      if (need.held > 0) {
        var what = f.hol ? holMonths(d)[mIdx(mk)].map(function (x) { return x.n; }).join(', ') + ', ' + MONTHS[mIdx(mk)] : 'Due this month';
        return { t: what + ': ' + money(need.held) + ' from your fund', pct: need.now > 0 ? Math.max(0, Math.min(100, Math.round(bal / need.now * 100))) : 0, due: need.held, full: bal >= need.now - 0.005 };
      }
      if (!need.next) return { t: f.hol ? 'Plan your days in Holidays and Birthdays' : 'Choose its due months', pct: 0 };
      var tg = need.next.a;
      return { t: money(bal) + ' of ' + money(tg) + ' · due ' + MONTHS[need.next.m], pct: tg > 0 ? Math.max(0, Math.min(100, Math.round(bal / tg * 100))) : 0, full: bal >= tg - 0.005 };
    }
    function vFunds(d, t) {
      var F = live(d.funds), y = tv(d, 'sheet');
      var est = live(d.lines).filter(function (l) { return l.s === 'est' && fundable(l); });
      var ask = est.length && !y.sap ? '<div class="gm-sap" data-gm-sap><b>Turn estimates into set-asides?</b><p class="gm-snote">' + esc(names(est)) + (est.length === 1 ? ' fills' : ' each fill') + ' a savings fund a little each month, ready when needed.</p>' +
        '<div class="gm-acts"><button type="button" class="gm-btn sm" data-gm="sap:yes">Make ' + (est.length === 1 ? 'It a Set-Aside' : 'Them Set-Asides') + '</button><button type="button" class="gm-btn sm line" data-gm="sap:later">Later</button></div></div>' : '';
      var hf = holFund(d);
      var foot = (t.setaside > 0 ? '<p class="gm-snote" data-gm-move>Move ' + money(t.setaside) + ' to your set-aside savings this month.</p>' : F.length ? '' : '<p class="gm-snote">Repairs, yearly bills, and gifts each fill their own savings fund, so the month stays even.</p>') +
        '<div class="gm-sadd"><button type="button" class="gm-addb" data-gm="sadd:fund">' + I('plus') + 'Add a Set-Aside</button>' + (hf ? '' : '<button type="button" class="gm-linkbtn" data-gm="go:tool:holidays">' + I('gift') + 'Holidays and Birthdays</button>') + '</div>';
      var head = '<span class="gm-pbal" data-gm-savings>Savings <b>' + money(t.savings) + '</b></span>';
      return panel('fund', 'Set-Asides', t.setaside, ask + F.map(function (f) { return fRow(d, f); }).join(''), foot, head);
    }
    function fRow(d, f) {
      var open = S.rowOpen === f.id, ln = fundLine(d, f), a = fundMonth(d, f), nm = f.n || 'A set-aside';
      return '<div class="gm-sr gm-fr nt' + (open ? ' open' : '') + '" data-id="' + f.id + '" data-kind="fund" data-fk="' + (f.hol ? 'hol' : f.kind) + '">' +
        '<span class="gm-scn">' + cellHtml(f, 'fund', 'n') + '</span>' +
        '<span class="gm-sc gm-sca" data-cell="fa"><button type="button" class="gm-sv" data-gm="srow:' + f.id + '" aria-label="' + esc(nm + ': ' + money(a) + ' this month. Tap for more') + '">' + money(a) + '</button></span>' +
        '<button type="button" class="gm-smore" data-gm="srow:' + f.id + '" aria-expanded="' + open + '" aria-label="' + esc('More for ' + nm) + '">' + I('dots') + '</button>' +
        '<div class="gm-fbar' + (ln.full ? ' full' : '') + '" role="img" aria-label="' + esc(nm + ', ' + ln.pct + ' percent full') + '"><span style="width:' + ln.pct + '%"></span></div>' +
        '<small class="gm-fline" data-gm-fline>' + esc(ln.t) + '</small>' +
        (open ? fundMore(d, f, ln) : '') + '</div>';
    }
    function ffld(f, k, lbl, v, ph) { return '<label class="gm-f"><span>' + esc(lbl) + '</span><input class="gm-in" data-gmfd="' + k + '" data-fid="' + f.id + '" inputmode="decimal" value="' + (v ? plain(v) : '') + '" placeholder="' + esc(ph || '0') + '"></label>'; }
    function fundMore(d, f, ln) {
      var kind = '<div class="gm-srmg" role="group" aria-label="Kind"><span class="gm-k">Kind</span>' + [['bill', 'Known Bill'], ['jic', 'Just in Case']].map(function (k) { var on = f.kind === k[0]; return '<button type="button" class="gm-mchip' + (on ? ' on' : '') + '" aria-pressed="' + on + '" data-gm="fkind:' + f.id + ':' + k[0] + '">' + k[1] + '</button>'; }).join('') + '</div>';
      var set;
      if (f.hol) set = '<p class="gm-snote">Its days and amounts come from the planner.</p><div class="gm-acts"><button type="button" class="gm-btn sm line" data-gm="go:tool:holidays">' + I('gift') + 'Holidays and Birthdays</button></div><div class="gm-two">' + ffld(f, 'bal', 'Set aside now', f.bal) + '</div>';
      else if (f.kind === 'jic') set = '<div class="gm-grid3">' + ffld(f, 'mon', 'Each month', f.mon) + ffld(f, 'cap', 'Cap (full at)', f.cap) + ffld(f, 'bal', 'Set aside now', f.bal) + '</div>';
      else set = '<div class="gm-two">' + ffld(f, 'amt', 'Amount each time', f.amt) + ffld(f, 'bal', 'Set aside now', f.bal) + '</div>' +
        '<div class="gm-srmg gm-fdue" role="group" aria-label="Due months"><span class="gm-k">Due Months</span>' + MON3.map(function (m, i) { var on = f.due.indexOf(i) >= 0; return '<button type="button" class="gm-mchip' + (on ? ' on' : '') + '" aria-pressed="' + on + '" aria-label="' + MONTHS[i] + '" data-gm="fdue:' + f.id + ':' + i + '">' + m + '</button>'; }).join('') + '</div>';
      var pre = ln.due ? plain(ln.due) : '';
      var pay = '<div class="gm-fpay"><label class="gm-f"><span>Amount</span><input class="gm-in" data-gmfp="' + f.id + '" inputmode="decimal" value="' + pre + '" placeholder="0"></label>' +
        '<button type="button" class="gm-btn sm" data-gm="fpay:' + f.id + '">Pay From This Fund</button><button type="button" class="gm-btn sm line" data-gm="fadd:' + f.id + '">Add to Balance</button></div>';
      return '<div class="gm-srm">' + set + (f.hol ? '' : kind) + pay +
        '<div class="gm-acts"><button type="button" class="gm-btn sm line" data-gm="rm:fund:' + f.id + '">' + I('x') + 'Remove</button><button type="button" class="gm-linkbtn" data-gm="srow:' + f.id + '">Done</button></div></div>';
    }
    // A fund row's numbers, redrawn in place after a change (so the next tap lands).
    function fundNumbers(d, f) {
      var row = root.querySelector('.gm-fr[data-id="' + f.id + '"]'); if (!row) return;
      var ln = fundLine(d, f), a = fundMonth(d, f), b = row.querySelector('[data-cell="fa"] .gm-sv'), bar = row.querySelector('.gm-fbar'), fl = row.querySelector('[data-gm-fline]');
      if (b) b.textContent = money(a); if (fl) fl.textContent = ln.t; if (bar) { bar.classList.toggle('full', !!ln.full); bar.firstChild.style.width = ln.pct + '%'; }
    }
    function sheetBoxes(t) {
      var ok = t.gap >= 0;
      return '<div class="gm-sbox" data-gm-sums><div class="gm-sb" data-k="in"><span class="gm-k">Money In</span><b>' + money(t.income) + '</b></div><div class="gm-sb" data-k="out"><span class="gm-k">Money Out</span><b>' + money(t.spend) + '</b>' + (t.setaside > 0 ? '<small class="gm-sbsub" data-gm-incl>includes ' + money(t.setaside) + ' set aside</small>' : '') + '</div>' +
        '<div class="gm-sb ' + (ok ? 'ok' : 'short') + '" data-k="gap" data-gm-gap="' + t.gap + '"><span class="gm-k">' + (ok ? 'Ahead Each Month' : 'Short Each Month') + '</span><b>' + money(Math.abs(t.gap)) + '</b></div></div>';
    }
    // The chips: giving and saving as shares of take-home (Before Taxes counted as saving), the season, and the Standards.
    // Each opens its tool; on Start, a Membership tool opens its part's page instead.
    function sheetChips(d, t) {
      var M = TL() && TL().math; if (!M || !M.stdView) return '<div class="gm-schips" data-gm-chips></div>';
      var v = M.stdView(d, tv(d, 'std')), se = v.season, out = [];
      function chip(k, html, view, part) { var to = allowed(view) ? view : part; return '<button type="button" class="gm-schip" data-chip="' + k + '" data-gm="go:' + to + '">' + html + '</button>'; }
      if (t.income > 0) {
        out.push(chip('give', 'Giving <b>' + Math.round(v.by.give.pct) + '%</b>', 'tool:give', 'give'));
        out.push(chip('save', 'Saving <b>' + Math.round(v.by.save.pct) + '%</b>' + (v.pretax > 0 ? ' with Before Taxes' : ''), 'tool:goals', 'grow'));
      }
      if (live(d.lines).length) out.push(chip('season', se.building ? 'Building Season · <b>' + se.done + ' of 5</b> steps' : '<b>Growing Season</b>', 'tool:std', 'ahead'));
      out.push(chip('std', 'Standards ›', 'tool:std', 'ahead'));
      return '<div class="gm-schips" data-gm-chips>' + out.join('') + '</div>';
    }
    function panel(id, title, total, rows, foot, extra) {
      return '<section class="gm-panel" data-panel="' + id + '"><div class="gm-ph"><h3 class="gm-h3">' + esc(title) + '</h3>' + (extra || '') + '<b class="gm-ptot" data-gm-total="' + id + '">' + money(total) + '</b></div>' +
        '<div class="gm-srows">' + rows + '</div>' + foot + '</section>';
    }
    function subOf(l, k) {
      if (k === 'income') return l.lo != null || l.hi != null ? money(l.lo != null ? l.lo : l.a) + ' to ' + money(l.hi != null ? l.hi : l.a) : '';
      return l.f !== 'm' ? money(l.a) + ' ' + FREQ_WORD[l.f] : '';
    }
    function sRow(l, kind) {
      var k = kind === 'income' ? 'income' : 'line', open = S.rowOpen === l.id, sub = subOf(l, k), nm = l.n || (k === 'income' ? 'Income' : 'A line');
      return '<div class="gm-sr' + (kind === 'line' ? '' : ' nt') + (l.s === 'hold' ? ' hold' : '') + (open ? ' open' : '') + '" data-id="' + l.id + '" data-kind="' + k + '" data-s="' + esc(l.s || '') + '">' +
        '<span class="gm-scn">' + cellHtml(l, k, 'n') + '<small class="gm-ssub"' + (sub ? '' : ' hidden') + '>' + esc(sub) + '</small></span>' + cellHtml(l, k, 'a') +
        (kind === 'line' ? '<button type="button" class="gm-tag t-' + l.s + '" data-gm="tag:' + l.id + '" aria-label="' + esc(nm + ': ' + STATUS[l.s] + '. Tap for the next status') + '">' + esc(STATUS[l.s]) + '</button>' : '') +
        '<button type="button" class="gm-smore" data-gm="srow:' + l.id + '" aria-expanded="' + open + '" aria-label="' + esc('More for ' + nm) + '">' + I('dots') + '</button>' +
        (open ? rowMore(l, kind) : '') + '</div>';
    }
    // One cell: a button that shows the value, or the field while it changes.
    function cellHtml(l, k, f) {
      var e = S.ed, ed = e && e.id === l.id && e.f === f, nm = l.n || '';
      if (f === 'n') return '<span class="gm-sc" data-cell="n">' + (ed ? '<input class="gm-sin" data-ed="n:' + l.id + '" value="' + esc(e.val != null ? e.val : nm) + '" maxlength="80" aria-label="Name" placeholder="' + PH[k] + '" autocomplete="off" enterkeyhint="done">'
        : '<button type="button" class="gm-sv' + (nm ? '' : ' ph') + '" data-gm="ed:n:' + k + ':' + l.id + '" aria-label="' + esc((nm || 'Unnamed') + '. Tap to change the name') + '">' + esc(nm || PH[k]) + '</button>') + '</span>';
      var shown = k === 'income' ? +l.a || 0 : monthly(l), how = k === 'income' || l.f === 'm' ? 'a month' : FREQ_WORD[l.f];
      return '<span class="gm-sc gm-sca" data-cell="a">' + (ed ? '<input class="gm-sin gm-sina" data-ed="a:' + l.id + '" value="' + esc(e.val != null ? e.val : l.a ? plain(l.a) : '') + '" inputmode="decimal" enterkeyhint="done" autocomplete="off" placeholder="0" aria-label="' + esc('Amount ' + how + (nm ? ' for ' + nm : '')) + '">'
        : '<button type="button" class="gm-sv" data-gm="ed:a:' + k + ':' + l.id + '" aria-label="' + esc((nm || 'This line') + ': ' + money(shown) + ' a month. Tap to change the amount') + '">' + money(shown) + '</button>') + '</span>';
    }
    var PH = { income: 'Name this income', line: 'Name this line', fund: 'Name this set-aside' };
    function listOf(d, k) { return k === 'income' ? d.income : k === 'fund' ? d.funds : d.lines; }
    function rowMore(l, kind) {
      if (kind === 'income') return '<div class="gm-srm"><div class="gm-two"><label class="gm-f"><span>Low</span><input class="gm-in" data-gmf="lo" inputmode="decimal" value="' + (l.lo != null ? plain(l.lo) : '') + '" placeholder="' + (l.a ? plain(l.a) : '0') + '"></label>' +
        '<label class="gm-f"><span>High</span><input class="gm-in" data-gmf="hi" inputmode="decimal" value="' + (l.hi != null ? plain(l.hi) : '') + '" placeholder="' + (l.a ? plain(l.a) : '0') + '"></label></div>' +
        '<div class="gm-acts"><button type="button" class="gm-btn sm line" data-gm="rm:income:' + l.id + '">' + I('x') + 'Remove</button><button type="button" class="gm-linkbtn" data-gm="srow:' + l.id + '">Done</button></div></div>';
      return '<div class="gm-srm"><div class="gm-srmg" role="group" aria-label="How Often"><span class="gm-k">How Often</span>' + FREQ_ORDER.map(function (f) { var on = l.f === f; return '<button type="button" class="gm-mchip' + (on ? ' on' : '') + '" aria-pressed="' + on + '" data-gm="sfreq:' + l.id + ':' + f + '">' + esc(FREQ[f].n) + '</button>'; }).join('') + '</div>' +
        '<div class="gm-srmg" role="group" aria-label="Status"><span class="gm-k">Status</span>' + STATUS_ORDER.map(function (k) { var on = l.s === k; return '<button type="button" class="gm-mchip t-' + k + (on ? ' on' : '') + '" aria-pressed="' + on + '" data-gm="sst:' + l.id + ':' + k + '">' + esc(STATUS[k]) + '</button>'; }).join('') + '</div>' +
        (fundable(l) ? '<div class="gm-acts"><button type="button" class="gm-btn sm" data-gm="tofund:' + l.id + '">' + I('jar') + 'Make This a Set-Aside</button></div>' : '') +
        '<div class="gm-acts"><button type="button" class="gm-btn sm line" data-gm="rm:line:' + l.id + '">' + I('x') + 'Remove</button><button type="button" class="gm-linkbtn" data-gm="srow:' + l.id + '">Done</button></div></div>';
    }
    // The totals, chips, and panel totals, redrawn in place after a change (the rest of the sheet stays, so the next tap lands).
    function sheetNumbers(d) {
      var t = totals(d), b = root.querySelector('[data-gm-sums]'), c = root.querySelector('[data-gm-chips]');
      if (b) b.outerHTML = sheetBoxes(t); if (c) c.outerHTML = sheetChips(d, t);
      [['out', t.lineOut], ['pre', t.pretax], ['in', t.income], ['fund', t.setaside]].forEach(function (x) { var e = root.querySelector('[data-gm-total="' + x[0] + '"]'); if (e) e.textContent = money(x[1]); });
      var sv = root.querySelector('[data-gm-savings] b'); if (sv) sv.textContent = money(t.savings);
      var mv = root.querySelector('[data-gm-move]'); if (mv) mv.textContent = 'Move ' + money(t.setaside) + ' to your set-aside savings this month.';
    }
    function edFocus() {
      if (!S.ed) return; var i = root.querySelector('[data-ed="' + S.ed.f + ':' + S.ed.id + '"]'); if (!i) { S.ed = null; return; }
      try { i.focus({ preventScroll: true }); if (S.ed.val == null && i.select) i.select(); var r = i.getBoundingClientRect(); if (r.top < 60 || r.bottom > window.innerHeight - 40) i.scrollIntoView({ block: 'center' }); } catch (e) {}
    }
    // Saves (keep) or leaves as it was, then shows the value again in its cell.
    function edDone(inp, keep) {
      var e = S.ed; if (!e || !inp || !inp.isConnected || inp.getAttribute('data-ed') !== e.f + ':' + e.id) return null;
      S.ed = null; var d = D(), item = d && find(listOf(d, e.k), e.id); if (!item) return null;
      if (keep) {
        var patch = {};
        if (e.f === 'n') { var nv = inp.value.replace(/\s+/g, ' ').trim(); if (nv !== (item.n || '')) patch.n = nv; }
        else { var nn = num(inp.value); nn = nn == null ? 0 : r2(Math.abs(nn)); if (nn !== (+item.a || 0)) patch.a = nn; }
        if (Object.keys(patch).length) { edit(item, patch, d); save(); }
      }
      var cell = inp.closest('[data-cell]'), row = inp.closest('.gm-sr');
      if (cell) { var w = document.createElement('div'); w.innerHTML = cellHtml(item, e.k, e.f); cell.replaceWith(w.firstChild); }
      if (row) { var sb = row.querySelector('.gm-ssub'), sx = subOf(item, e.k); if (sb) { sb.textContent = sx; sb.hidden = !sx; } }
      sheetNumbers(d);
      return e;
    }
    function sheetAct(p, d) {
      var y = window.scrollY, item;
      switch (p[0]) {
        case 'ed':
          item = find(listOf(d, p[2]), p[3]); if (!item) return;
          S.ed = { f: p[1], k: p[2], id: p[3] }; paint(); return;
        case 'tag':
          item = find(d.lines, p[1]); if (!item) return;
          var i = TAG_CYCLE.indexOf(item.s); edit(item, { s: TAG_CYCLE[(i + 1) % TAG_CYCLE.length] }, d); save(); paint(); window.scrollTo(0, y);
          var tg = root.querySelector('[data-id="' + item.id + '"] .gm-tag'); if (tg) tg.focus({ preventScroll: true }); return;
        case 'srow': S.rowOpen = S.rowOpen === p[1] ? null : p[1]; paint(); window.scrollTo(0, y); return;
        case 'sfreq': item = find(d.lines, p[1]); if (item && FREQ[p[2]]) { edit(item, { f: p[2] }, d); save(); paint(); window.scrollTo(0, y); } return;
        case 'sst': item = find(d.lines, p[1]); if (item && STATUS[p[2]]) { edit(item, { s: p[2] }, d); save(); paint(); window.scrollTo(0, y); } return;
        case 'ssort': var st = tstate(d, 'sheet'); st.sort = st.sort === 'big' ? 'mine' : 'big'; touch(d); save(); paint(); window.scrollTo(0, y); return;
        case 'sadd':
          if (p[1] === 'fund') { item = addFund(d, { kind: 'jic' }); save(); S.rowOpen = null; S.ed = { f: 'n', k: 'fund', id: item.id, chain: 1 }; paint(); return; }
          item = p[1] === 'income' ? addIncome(d) : addLine(d, p[1] === 'pre' ? { s: 'pretax' } : { s: 'fixed' }); save();
          S.rowOpen = null; S.ed = { f: 'n', k: p[1] === 'income' ? 'income' : 'line', id: item.id, chain: 1 }; paint(); return;
        /* BLD 942: Set-Asides */
        case 'fkind': item = find(d.funds, p[1]); if (item && (p[2] === 'bill' || p[2] === 'jic')) { var kp = { kind: p[2] };
            if (p[2] === 'jic' && !item.mon) { kp.mon = fundMonth(d, item); if (!item.cap) kp.cap = Math.max(item.amt || 0, Math.round((kp.mon || 0) * 12)); }
            if (p[2] === 'bill' && !item.amt) kp.amt = item.cap || Math.round((item.mon || 0) * 12);
            editFund(d, item, kp); save(); paint(); window.scrollTo(0, y); } return;
        case 'fdue': item = find(d.funds, p[1]); if (item) { var dm = +p[2], du = item.due.slice(), at = du.indexOf(dm); if (at >= 0) du.splice(at, 1); else du.push(dm); editFund(d, item, { due: du }); save(); paint(); window.scrollTo(0, y); } return;
        case 'fpay': case 'fadd':
          item = find(d.funds, p[1]); if (!item) return; var fi = root.querySelector('[data-gmfp="' + item.id + '"]'), fa = num(fi && fi.value);
          if (!fa || fa <= 0) { say('Add the amount first.'); if (fi) fi.focus(); return; }
          if (p[0] === 'fpay') { var g = payFund(d, item, fa); save(); paint(); window.scrollTo(0, y); S.undo = function () { remove(g, d); unpay(d, g, true); }; say('Paid ' + money(g.a, 1) + ' from ' + (item.n || 'your fund') + '. This month stays even.', true); }
          else { var was0 = +item.bal || 0; addToFund(d, item, fa); save(); paint(); window.scrollTo(0, y); S.undo = function () { item.bal = was0; item.u = Date.now(); }; say('Added ' + money(fa, 1) + ' to ' + (item.n || 'your fund') + '.', true); }
          return;
        case 'tofund':
          item = find(d.lines, p[1]); var nf = toFund(d, item); if (!nf) return; save(); S.rowOpen = nf.kind === 'bill' ? nf.id : null; paint(); window.scrollTo(0, y);
          S.undo = function () { restore(item, d); remove(nf, d); }; say((item.n || 'The line') + ' is a set-aside now.' + (nf.kind === 'bill' ? ' Choose its due months.' : ''), true); return;
        case 'sap':
          var sy = tstate(d, 'sheet'); sy.sap = Date.now();
          if (p[1] === 'yes') { var made = []; live(d.lines).filter(function (l) { return l.s === 'est' && fundable(l); }).forEach(function (l) { var f2 = toFund(d, l); if (f2) made.push([l, f2]); });
            save(); paint(); window.scrollTo(0, y); S.undo = function () { made.forEach(function (x) { restore(x[0], d); remove(x[1], d); }); }; say(made.length + ' set-aside' + (made.length === 1 ? ' is' : 's are') + ' ready.', true); return; }
          touch(d); save(); paint(); window.scrollTo(0, y); return;
      }
    }

    /* Tools and Tips (BLD 941): the five parts as small tiles, the Standards and the Windfall Planner, every tool by part,
       the tip of the week, and the other places (Money Home, My Plan, Bring In a Spreadsheet). */
    function vTools(d) {
      if (!TL()) { loadTools().then(function (ok) { if (ok) paint(); }); return '<p class="gm-sub">Opening the tools…</p>'; }
      var L = TL().list, TOP = { std: 1, windfall: 1 }, rest = L.filter(function (T) { return !member() && !T.start; });
      var parts = '<nav class="gm-ptiles" aria-label="The five parts">' + PARTS.map(function (x) { return '<button type="button" class="gm-ptile gm-c-' + x.id + '" data-gm="go:' + x.id + '">' + draw(x.id, 'gm-ptile-draw') + '<b>' + esc(x.n) + '</b></button>'; }).join('') + '</nav>';
      // On Start the Standards and the Windfall Planner are named once, under With Membership (no locked cards up top).
      var top = member() ? '<h3 class="gm-sec">Standards and Windfall</h3><div class="gm-tools gm-tt-top">' + ['std', 'windfall'].map(function (id) { var T = tl(id); return T ? toolCard(T) : ''; }).join('') + '</div>' : '';
      var groups = PARTS.map(function (P) {
        var mine = L.filter(function (T) { return !TOP[T.id] && (T.part || 'live') === P.id && (member() || T.start); });
        return mine.length ? '<h3 class="gm-sec gm-c-' + P.id + '"><span class="gm-dot"></span>' + esc(P.n) + '</h3><div class="gm-tools">' + mine.map(toolCard).join('') + '</div>' : '';
      }).join('');
      var more = '<div class="gm-acts gm-tt-more"><button type="button" class="gm-btn line sm" data-gm="go:sheet">' + I('list') + 'One Page</button><button type="button" class="gm-btn line sm" data-gm="go:home">' + I('coin') + 'Money Home</button>' +
        '<button type="button" class="gm-btn line sm" data-gm="go:plan">' + I('pen') + 'My Plan, Every Detail</button><button type="button" class="gm-btn line sm" data-gm="go:import">' + I('up') + 'Bring In a Spreadsheet</button></div>';
      return '<button type="button" class="gm-linkbtn gm-ttback" data-gm="go:sheet">' + I('back') + 'Back to One Page</button>' + parts + top + groups + tipCard() + more +
        (rest.length ? '<div class="gm-card gm-mem"><span class="gm-k">With Membership</span><p class="gm-sub">' + esc(rest.map(function (T) { return T.n; }).join(', ')) + '.</p>' + memBtns() + '</div>' : '');
    }
    // A tool card: a bright tile in its part's color with the tool's own mark.
    function toolCard(T) {
      var ok = member() || T.start;
      return '<button type="button" class="gm-card gm-toolcard gm-c-' + (T.part || 'live') + '" data-gm="go:tool:' + T.id + '"><span class="gm-art">' + I(T.i) + '</span>' +
        '<span class="gm-tx"><b>' + esc(T.n) + '</b><small>' + esc(ok ? T.sub : 'With Membership') + '</small></span>' + I('arrow') + '</button>';
    }
    function vTool(d, id) {
      if (!TL()) { loadTools().then(function (ok) { if (ok) paint(); }); return '<p class="gm-sub">Opening the tool\u2026</p>'; }
      var T = TL().get(id); if (!T) return '<p class="gm-sub">This tool rests for now.</p>';
      var c = tctx(d, id); if (T.init) T.init(c.t, c);
      if (T.watch && !S.tw[id]) S.tw[id] = T.watch(c, null).state;
      var P = PART[T.part || 'live'];
      return '<div class="gm-acts"><button type="button" class="gm-linkbtn" data-gm="go:' + P.id + '">' + I('back') + 'Back to ' + esc(P.n) + '</button><button type="button" class="gm-linkbtn" data-gm="go:tools">' + I('grid') + 'All Tools</button></div>' +
        (T.lead ? '<div class="gm-tlead">' + T.lead(c) + '</div>' : '') +
        (T.outFirst ? '<div class="gm-tres" aria-live="polite">' + T.out(c) + '</div><div class="gm-card gm-tform">' + T.form(c) + '</div>' : '<div class="gm-card gm-tform">' + T.form(c) + '</div><div class="gm-tres" aria-live="polite">' + T.out(c) + '</div>') + (T.start && !member() ? memberLine() : '');
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
        '<div><span>Planned spending</span><b>' + money(m.plan) + '</b>' + (m.setaside ? '<small>includes ' + money(m.setaside) + ' set aside</small>' : '') + '</div><div><span>Logged so far</span><b>' + money(m.logged, 1) + '</b>' + (m.fromFund ? '<small>and ' + money(m.fromFund, 1) + ' from funds</small>' : '') + '</div></div>' +
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
        (live(d.funds).length ? '<div class="gm-logfund" data-gm-logfund><span class="gm-k">From a Fund</span><p class="gm-mini">Paid from set-aside savings, so this month stays even.</p><div class="gm-chips">' + live(d.funds).map(function (f) { return '<button type="button" class="gm-chip gm-fchip" data-gm="logf:' + f.id + '">' + I('jar') + esc(f.n || 'Set-Aside') + ' <small>' + money(f.bal) + '</small></button>'; }).join('') + '</div></div>' : '') +
        '<label class="gm-f gm-date"><span>Day</span><input class="gm-in" type="date" id="gm-log-d" value="' + esc(S.logDate || today()) + '"></label></div>' +
        '<h3 class="gm-sec">Logged in ' + esc(m.name) + ' <small>' + money(m.logged, 1) + (m.fromFund ? ', and ' + money(m.fromFund, 1) + ' from funds' : '') + '</small></h3>' +
        (recent.length ? '<div class="gm-card gm-loglist">' + recent.map(function (g) { var l = find(d.lines, g.c), fu = g.f && find(d.funds, g.f); return '<div class="gm-lg' + (g.f ? ' fromfund' : '') + '"><span class="gm-ld">' + esc(niceDate(g.d)) + '</span><b>' + esc(g.f ? (fu && !fu.x ? fu.n : g.n || 'Set-Aside') + ', from the fund' : l && !l.x ? l.n : g.n || 'Other') + '</b><span class="gm-la">' + money(g.a, 1) + '</span><button type="button" class="gm-x sm" data-gm="rm:log:' + g.id + '" aria-label="Remove ' + money(g.a, 1) + ' ' + esc(g.n || '') + '">' + I('x') + '</button></div>'; }).join('') + '</div>'
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
      if (!S.sheets) return top + '<div class="gm-acts"><button type="button" class="gm-linkbtn" data-gm="go:sheet">' + I('back') + 'Back to One Page</button></div>';
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
        '<div class="gm-acts"><button type="button" class="gm-linkbtn" data-gm="go:sheet">' + I('back') + 'Back to One Page</button></div>';
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
        case 'fold':
          var fk = p.slice(1).join(':'), fc = root.querySelector('[data-fold="' + cssq(fk) + '"]'), now = !(fc && fc.classList.contains('open'));
          S.open[fk] = now ? 1 : 0; keepOpen();
          if (fc) { fc.classList.toggle('open', now); var fb = fc.querySelector('.gm-fbtn'), fd = fc.querySelector('.gm-fbody'); if (fb) fb.setAttribute('aria-expanded', String(now)); if (fd) fd.hidden = !now; }
          return;
        case 'gen':
          var gv = d.tools.generous; if (!gv || typeof gv !== 'object') gv = d.tools.generous = {};
          if (gv[p[1]]) delete gv[p[1]]; else { gv[p[1]] = Date.now(); say('A good choice. Generosity grows by giving.'); }
          touch(d); save(); var yg = window.scrollY; paint(); window.scrollTo(0, yg); return;
        case 'match':
          var gw = d.tools.grow; if (!gw || typeof gw !== 'object') gw = d.tools.grow = {};
          if (gw.match === p[1]) delete gw.match; else gw.match = p[1];
          touch(d); save(); var ym = window.scrollY; paint(); window.scrollTo(0, ym); return;
        case 'tool':
          var TT = TL() && TL().get(p[1]); if (!TT || !TT.act) return;
          var cx = tctx(d, p[1]); if (TT.init) TT.init(cx.t, cx); if (TT.act(p[2], p.slice(3).join(':'), cx)) { touch(d); save(); var y0 = window.scrollY; paint(); window.scrollTo(0, y0); watchTool(d, p[1]); }
          return;
        case 'mem': if (opts.onMembership) opts.onMembership(p[1]); return;
        case 'ed': case 'tag': case 'srow': case 'sfreq': case 'sst': case 'ssort': case 'sadd': case 'fkind': case 'fdue': case 'fpay': case 'fadd': case 'tofund': case 'sap': sheetAct(p, d); return;
        case 'common': COMMON.forEach(function (c) { addLine(d, c); }); save(); if (S.view !== 'sheet') S.view = 'plan'; paint(); say('Twelve common lines are ready. Add your amounts, and rename or remove any.'); focusFirstEmpty(); return;
        case 'add':
          var it = p[1] === 'income' ? addIncome(d) : addLine(d); save(); paint();
          var inp = root.querySelector('[data-id="' + it.id + '"] .gm-name'); if (inp) { inp.focus(); try { inp.scrollIntoView({ block: 'center' }); } catch (e) {} }
          return;
        case 'rm':
          var list = p[1] === 'log' ? d.logs : listOf(d, p[1]), item = find(list, p[2]); if (!item) return;
          // A payment from a fund that is removed puts the money back in the fund (and Undo takes it out again).
          if (p[1] === 'log' && item.f) { remove(item, d); unpay(d, item, true); save(); S.undo = function () { restore(item, d); unpay(d, item, false); }; paint(); say('Removed ' + money(item.a, 1) + '. It is back in ' + (item.n || 'the fund') + '.', true); return; }
          if (p[1] === 'fund') S.rowOpen = null;
          remove(item, d); save(); S.undo = function () { restore(item, d); }; paint();
          say((p[1] === 'log' ? 'Removed ' + money(item.a, 1) + '.' : 'Removed ' + (item.n || 'the line') + '.'), true); return;
        case 'undo': if (S.undo) { S.undo(); S.undo = null; save(); paint(); } return;
        case 'note': S.more['n:' + p[1]] = 1; paint(); var ni = root.querySelector('[data-id="' + p[1] + '"] [data-gmf="o"]'); if (ni) ni.focus(); return;
        case 'leave': if (!S.sureLeave) { S.sureLeave = 1; paint(); return; } S.sureLeave = 0; leave(d); save(); paint(); say('Your own plan is back.'); return;
        case 'idea':
          if (p[1] === 'tick') { var key = p.slice(2).join(':'), on = !d.ideas.done[key], was = totals(d).after; ideaSet(d, key, { done: on }); save(); paint(); var t = totals(d);
            if (on && was < 0 && t.after >= 0) celebrate('The gap is closed. Your plan is in balance.'); else if (on) say(t.after < 0 ? 'Chosen. ' + money(-t.after) + ' to go.' : 'Chosen. More to keep for savings and giving.'); return; }
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
        case 'logf': case 'log':
          var ai = root.querySelector('#gm-log-a'), amt = num(ai && ai.value), dt = (root.querySelector('#gm-log-d') || {}).value || today();
          if (!amt || amt <= 0) { say('Add the amount first.'); if (ai) ai.focus(); return; }
          if (p[0] === 'logf') { var lf = find(d.funds, p[1]); if (!lf) return; var gf = payFund(d, lf, amt, dt); S.logAmt = ''; S.logDate = dt === today() ? '' : dt; save(); paint();
            S.undo = function () { remove(gf, d); unpay(d, gf, true); }; say('Paid ' + money(gf.a, 1) + ' from ' + (lf.n || 'your fund') + '. This month stays even.', true); var a3 = root.querySelector('#gm-log-a'); if (a3) a3.focus(); return; }
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
          if (p[1] === 'go') { var sh = S.sheets[S.sheet] || S.sheets[0], got = fromSheet(sh, S.map), had = live(d.lines).length + live(d.income).length; applyImport(d, got, had ? S.mode : 'add'); S.sheets = null; S.map = null; S.pick = null; save(); S.view = 'sheet'; paint(); if (opts.onView) opts.onView('sheet'); say('Brought in ' + got.lines.length + ' lines and ' + got.income.length + ' income sources.'); return; }
          return;
        case 'share':
          if (p[1] === 'make') { btn && (btn.disabled = true); Promise.all([encode(d), qrLoad(opts.qrSrc || '/shared/vendor/qrcode.js?v=b921')]).then(function (r) { var url = (opts.shareBase || SHARE_BASE) + r[0]; S.share = { url: url, svg: qrSvg(url) }; paint(); fitQr(); }); return; }
          if (p[1] === 'copy') { var li = root.querySelector('#gm-link'); copy(li ? li.value : ''); return; }
          if (p[1] === 'send') { try { navigator.share({ title: 'Grounded Money', text: 'Our money plan in Grounded Money', url: S.share.url }).catch(function () {}); } catch (e) {} return; }
          if (p[1] === 'done') { S.share = null; go('sheet'); return; }
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
      var c = tctx(d, id); setPath(c.t, t.getAttribute('data-gt'), v); if (T.onSet) T.onSet(t.getAttribute('data-gt'), c); touch(d);
      // BLD 942: the results are drawn again only when they change, so a tap on a button there lands after a field is left.
      var out = root.querySelector('.gm-tres'), oh = out && T.out(c); if (out && out._gmh !== oh) { out.innerHTML = oh; out._gmh = oh; }
      var lv = root.querySelector('[data-gm-live]'); if (lv && T.live) lv.innerHTML = T.live(c);
      return true;
    }
    function watchTool(d, id) { var T = TL() && TL().get(id); if (!T || !T.watch) return; var r = T.watch(tctx(d, id), S.tw[id]); S.tw[id] = r.state; if (r.msg) celebrate(r.msg); }
    function onChange(e) {
      var t = e.target, d = D(); if (!d || painting) return;   // a field leaving while the screen is drawn again changes nothing more
      if (t.getAttribute('data-gt')) {
        if (toolInput(t)) { save(); var id = t.closest('[data-tool]').getAttribute('data-tool'); watchTool(d, id); if (t.getAttribute('data-gtp') || t.tagName === 'SELECT' && /^(efm|list\.\d+\.f)$/.test(t.getAttribute('data-gt'))) { var key = t.getAttribute('data-gt'); paint(); var again = root.querySelector('[data-gt="' + key + '"]'); if (again) again.focus(); } }
        return;
      }
      var fd = t.getAttribute('data-gmfd');
      if (fd) {
        var fu = find(d.funds, t.getAttribute('data-fid')); if (!fu) return; var fv = num(t.value), fp = {}; fp[fd] = fv == null ? 0 : (fd === 'bal' ? r2(fv) : Math.abs(r2(fv)));
        editFund(d, fu, fp); save(); fundNumbers(d, fu); sheetNumbers(d); return;
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
        if (S.view === 'sheet') { var sb = row.querySelector('.gm-ssub'), sx = subOf(item, kind === 'income' ? 'income' : 'line'); if (sb) { sb.textContent = sx; sb.hidden = !sx; } sheetNumbers(d); return; }
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
    function onInput(e) { if (e.target.getAttribute && e.target.getAttribute('data-ed')) { if (S.ed) S.ed.val = e.target.value; return; } if (e.target.getAttribute && e.target.getAttribute('data-gt')) { toolInput(e.target); return; } if (e.target.id === 'gm-log-a') S.logAmt = e.target.value; else if (e.target.id === 'gm-log-d') S.logDate = e.target.value; else if (e.target.id === 'gm-c1' || e.target.id === 'gm-c3') { S.chk = S.chk || { well: '', steady: 0, step: '' }; S.chk[e.target.id === 'gm-c1' ? 'well' : 'step'] = e.target.value; } }
    function onKey(e) {
      var t = e.target;
      if (t.getAttribute && t.getAttribute('data-ed')) {
        if (e.key === 'Escape') { e.preventDefault(); edDone(t, false); return; }
        if (e.key !== 'Enter') return;
        e.preventDefault(); var was = edDone(t, true);
        // A new line flows from its name to its amount.
        if (was && was.chain && was.f === 'n') {
          if (was.k === 'fund') { S.rowOpen = was.id; paint(); var fm = root.querySelector('.gm-fr[data-id="' + was.id + '"] [data-gmfd]'); if (fm) try { fm.focus(); } catch (e) {} return; }
          S.ed = { f: 'a', k: was.k, id: was.id }; paint(); }
        return;
      }
      if (e.key !== 'Enter') return;
      if (t.id === 'gm-log-a') { e.preventDefault(); var first = root.querySelector('.gm-chips .gm-chip'); if (first) first.focus(); }
      else if (t.getAttribute('data-gmi')) { e.preventDefault(); act('idea:ed:' + t.getAttribute('data-gmi').slice(5)); }
      else if (t.id === 'gm-in-n' || t.id === 'gm-in-a') { e.preventDefault(); act('idea:addsave'); }
      else if (t.id === 'gm-paste') { e.preventDefault(); act('share:paste'); }
      else if ((t.getAttribute('data-gmf') || t.getAttribute('data-gmfd')) && t.tagName === 'INPUT') { t.blur(); }
      else if (t.getAttribute('data-gmfp')) { e.preventDefault(); act('fpay:' + t.getAttribute('data-gmfp')); }
    }
    function onBlur(e) { var t = e.target; if (t.getAttribute && t.getAttribute('data-ed')) edDone(t, true); }
    root.addEventListener('click', onClick); root.addEventListener('change', onChange); root.addEventListener('input', onInput); root.addEventListener('keydown', onKey); root.addEventListener('focusout', onBlur);
    // Stage 2: GGP.on returns nothing, so destroy takes the listener off with GGP.off (a host like Home draws a fresh copy each visit).
    var unsub = null; if (st.kind === 'ggp' && window.GGP && GGP.on) { try { var onG = function (ty) { if ((ty === 'change' || ty === 'ready') && root.isConnected) paint(); }, u0 = GGP.on(onG); unsub = typeof u0 === 'function' ? u0 : function () { if (window.GGP && GGP.off) GGP.off(onG); }; } catch (e) {} }

    if (TL()) TL().use(UTIL);
    paint();
    loadTools().then(function (ok) { if (ok && (S.view === 'sheet' || S.view === 'gap' || S.view === 'home' || PART[S.view] || S.view === 'tools' || /^tool:/.test(S.view))) paint(); });
    function readHash() { var hm = /#money=([A-Za-z0-9_-]+)/.exec(location.hash || ''); if (hm) { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} receive(hm[1]); } }
    if (opts.readHash) { readHash(); window.addEventListener('hashchange', readHash); }
    return {
      go: go, refresh: paint, receive: receive, view: function () { return S.view; },
      destroy: function () { if (scanStop) scanStop(); root.removeEventListener('click', onClick); root.removeEventListener('change', onChange); root.removeEventListener('input', onInput); root.removeEventListener('keydown', onKey); root.removeEventListener('focusout', onBlur); if (typeof unsub === 'function') unsub(); window.removeEventListener('hashchange', readHash); if (toastEl) toastEl.remove(); el.innerHTML = ''; }
    };
  }

  // Helpers the tools file uses (GGMoneyTools.use).
  var UTIL = { esc: esc, money: money, plain: plain, num: num, I: I, live: live, monthly: monthly, totals: totals, month: month, find: find, edit: edit, addLine: addLine, addIncome: addIncome,
    today: today, monthKey: monthKey, weekKey: weekKey, niceDate: niceDate, uid: uid,
    // BLD 942
    HOLS: HOLS, HOL: HOL, PEOPLE_KIND: PEOPLE_KIND, holMonths: holMonths, holSuggest: holSuggest, houseOf: houseOf, kidsOf: kidsOf, fundNeed: fundNeed, fundMonth: fundMonth, holFund: holFund,
    addFund: addFund, rec: rec, recAll: recAll, setAsideSum: setAsideSum, mkAdd: mkAdd, MONTHS: MONTHS };
  window.GGMoney = {
    v: V, render: render, summary: summary, util: UTIL,
    model: { blank: blank, norm: norm, monthly: monthly, totals: totals, ideas: ideaList, ideaSet: ideaSet, month: month, addLine: addLine, addIncome: addIncome, edit: edit, remove: remove, restore: restore, logAdd: logAdd, checkSave: checkSave, weekKey: weekKey, FREQ: FREQ, STATUS: STATUS, STEADY: STEADY,
      // BLD 942: Set-Asides
      fundNeed: fundNeed, fundMonth: fundMonth, fundEvents: fundEvents, setAsideSum: setAsideSum, roll: roll, rec: rec, addFund: addFund, editFund: editFund, payFund: payFund, unpay: unpay, addToFund: addToFund,
      toFund: toFund, fundable: fundable, holMonths: holMonths, holSuggest: holSuggest, holFund: holFund, HOLS: HOLS, mkAdd: mkAdd },
    parse: { xlsx: readXlsx, csv: readCsv, file: readFile, guess: guessMap, rows: fromSheet, pick: pickSheet, apply: applyImport, inflate: inflate, unzip: unzip },
    share: { encode: encode, decode: decode, unpack: unpack, merge: merge, leave: leave, code: codeFrom, base: SHARE_BASE },
    stores: { ggp: ggpStore, local: localStore, memory: memStore },
    _test: GGMoneyTest
  };
})();
