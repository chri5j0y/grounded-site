/* =====================================================================
   GROUNDED MONEY TOOLS (shared/gg-money-tools.js), GWG BLD 937 stage 1b
   Chris (November 7, 2026): "more calculators/tips tools ways to save and make this a huge value add".
   Loaded by shared/gg-money.js the first time Grounded Money opens (window.GGMoneyTools). Every tool works on this
   device only and keeps its answers in the same money object as the plan (money.tools.<id>), so the profile lock,
   backups, and Move to Another Device carry them.

   A tool: {id, part (give, live, protect, grow, ahead: the Plan part), n name, i icon, sub one line, start: 1 for the Start taste, init(t, c), form(c), out(c), act(a, arg, c)}
   c (from gg-money.js): {d money, t this tool's state, U helpers, save(), paint(), say(msg), go(view), celebrate(msg), member()}
   Inputs carry data-gt="path" (data-n="1" for numbers); the module writes them into t and redraws out(c) as you type.
   Buttons carry data-gm="tool:<id>:<action>:<arg>".

   BLD 939 (Grounded Money in five parts: Give, Live, Protect, Grow, Plan): each tool names its part; five new tools
   (givelog Giving Tracker, insure Insurance Overview, blind Blind Spot Check, grow Growth Calculator, year Year Plan) keep
   their answers in money.tools.<id> like the rest; each tip shows in its part (tipPart). The tree paintings are gone.

   GGMoneyTools.math holds every calculation (pure, for tests). No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGMoneyTools) return;
  var U = null; // helpers from gg-money.js, set by use()
  function arr(x) { return Array.isArray(x) ? x : []; }
  function n0(v) { var n = +v; return isFinite(n) ? n : 0; }
  function r2(n) { return Math.round((+n || 0) * 100) / 100; }
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function pad(n) { return String(n).padStart(2, '0'); }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parseD(s) { var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(s || '')); return m ? new Date(+m[1], +m[2] - 1, +m[3], 12) : null; }
  function addMonths(d, n) { var x = new Date(d.getFullYear(), d.getMonth() + n, 1, 12); return x; }
  function monthName(d) { return MONTHS[d.getMonth()] + ' ' + d.getFullYear(); }
  function dim(y, m) { return new Date(y, m + 1, 0).getDate(); }

  /* =====================================================================
     THE MATH
     ===================================================================== */
  // Debts: [{n, bal, rate (yearly percent), min}]. method 'small' (smallest balance first) or 'rate' (highest rate first).
  // extra: added each month; roll: a paid off debt's minimum joins the next one. Months capped at 600.
  function debtSim(debts, extra, method, roll) {
    var ds = arr(debts).filter(function (x) { return n0(x.bal) > 0; }).map(function (x, i) { return { i: i, n: x.n || 'Debt ' + (i + 1), b: n0(x.bal), r: n0(x.rate) / 1200, m: Math.max(0, n0(x.min)), done: 0 }; });
    var month = 0, interest = 0, order = [];
    function open() { return ds.filter(function (x) { return x.b > 0.005; }); }
    function pri() { return open().sort(method === 'rate' ? function (a, b) { return b.r - a.r || a.b - b.b; } : function (a, b) { return a.b - b.b || b.r - a.r; }); }
    while (open().length && month < 600) {
      month++;
      var pool = Math.max(0, n0(extra));
      if (roll) ds.forEach(function (x) { if (x.done) pool += x.m; });
      open().forEach(function (x) { var i = x.b * x.r; x.b += i; interest += i; });
      open().forEach(function (x) { var p = Math.min(x.m, x.b); x.b -= p; if (roll) pool += x.m - p; });
      var ps = pri();
      for (var k = 0; k < ps.length && pool > 0.005; k++) { var p2 = Math.min(pool, ps[k].b); ps[k].b -= p2; pool -= p2; }
      ds.forEach(function (x) { if (x.b <= 0.005 && !x.done) { x.done = month; order.push({ n: x.n, month: month }); } });
    }
    return { months: month, interest: r2(interest), order: order, stuck: open().length > 0 };
  }
  function debtPlan(debts, extra, method) {
    var plan = debtSim(debts, extra, method, true), base = debtSim(debts, 0, method, false);
    return { plan: plan, base: base, saved: base.stuck ? null : r2(base.interest - plan.interest), sooner: base.stuck ? null : base.months - plan.months };
  }
  function monthsUntil(dateStr, from) { var d = parseD(dateStr), f = from || new Date(); if (!d) return 0; return Math.max(1, (d.getFullYear() - f.getFullYear()) * 12 + (d.getMonth() - f.getMonth())); }
  function goalMonthly(target, saved, dateStr, from) { var left = Math.max(0, n0(target) - n0(saved)); if (!left) return 0; return Math.ceil(left / monthsUntil(dateStr, from)); }
  function efMonths(saved, monthly) { return monthly > 0 ? Math.floor(n0(saved) / monthly * 10) / 10 : 0; }
  // Paydays in a month: sched 'w' weekly, 'b' every two weeks (from anchor), 's' twice a month (d1, d2), 'm' monthly (d1).
  function paydays(sched, anchor, y, m, d1, d2) {
    var out = [], last = dim(y, m);
    if (sched === 'w' || sched === 'b') {
      var a = parseD(anchor) || new Date(y, m, 1, 12), step = sched === 'w' ? 7 : 14, first = new Date(y, m, 1, 12);
      var diff = Math.round((first - a) / 864e5), k = Math.ceil(diff / step), d = new Date(a); d.setDate(a.getDate() + k * step);
      while (d.getMonth() === m && d.getFullYear() === y) { out.push(d.getDate()); d.setDate(d.getDate() + step); }
    } else if (sched === 's') { out.push(Math.min(last, d1 || 1), Math.min(last, d2 || 15)); out = out.filter(function (x, i, a) { return a.indexOf(x) === i; }).sort(function (a, b) { return a - b; }); }
    else out.push(Math.min(last, d1 || 1));
    return out;
  }
  function checksPerYear(sched) { return { w: 52, b: 26, s: 24, m: 12 }[sched] || 12; }
  // Months in the next twelve with an extra paycheck (three for every two weeks, five for weekly).
  function extraMonths(sched, anchor, from) {
    if (sched !== 'w' && sched !== 'b') return [];
    var f = from || new Date(), out = [], usual = sched === 'w' ? 4 : 2;
    for (var i = 0; i < 12; i++) { var d = addMonths(f, i), c = paydays(sched, anchor, d.getFullYear(), d.getMonth()).length; if (c > usual) out.push({ name: monthName(d), count: c }); }
    return out;
  }
  // Bills by paycheck: each bill goes to the latest payday on or before its due day; earlier bills ride last month's last check.
  // A bill with no due day yet goes to the month's first paycheck.
  function billsByCheck(days, bills) {
    var groups = days.map(function (d) { return { day: d, bills: [], total: 0 }; }), prev = { day: 0, bills: [], total: 0 };
    bills.forEach(function (b) { var g = null; if (!b.due) g = groups[0] || prev; else for (var i = groups.length - 1; i >= 0; i--) if (groups[i].day <= b.due) { g = groups[i]; break; } g = g || prev; g.bills.push(b); g.total = r2(g.total + b.amt); });
    return { prev: prev, groups: groups };
  }
  function homeMeal(groceryWeek, mealsWeek) { return mealsWeek > 0 ? r2(n0(groceryWeek) / mealsWeek) : 0; }
  function grocerySave(groceryWeek, mealsWeek, outCost, swaps) { var h = homeMeal(groceryWeek, mealsWeek); return { home: h, perMeal: r2(Math.max(0, n0(outCost) - h)), month: Math.round(Math.max(0, n0(outCost) - h) * n0(swaps) * 52 / 12) }; }
  function carCost(o) {
    var miles = n0(o.miles), fuel = n0(o.mpg) > 0 ? miles / n0(o.mpg) * n0(o.gas) : 0, total = n0(o.pay) + n0(o.ins) + fuel + n0(o.upkeep) / 12;
    return { fuel: r2(fuel), upkeep: r2(n0(o.upkeep) / 12), total: r2(total), perMile: miles > 0 ? r2(total / miles) : 0 };
  }
  function sideIncome(rows, taxPct) { var g = arr(rows).reduce(function (s, r) { return s + n0(r.qty) * n0(r.rate) - n0(r.cost) * n0(r.qty); }, 0); g = Math.max(0, g); return { gross: r2(g), keep: r2(g * (1 - n0(taxPct) / 100)) }; }
  function subsTotals(list) {
    var t = { all: 0, keep: 0, pause: 0, go: 0 };
    arr(list).forEach(function (s) { var y = n0(s.amt) * (s.f === 'y' ? 1 : 12); t.all += y; t[s.c === 'pause' ? 'pause' : s.c === 'go' ? 'go' : 'keep'] += y; });
    Object.keys(t).forEach(function (k) { t[k] = r2(t[k]); }); return t;
  }
  function givingTotal(mode, pct, amt, income) { return r2(mode === 'pct' ? n0(income) * n0(pct) / 100 : n0(amt)); }
  // A common family guideline: about a dollar a week for each year of age, split into save, give, and spend jars.
  function allowance(age, jars) { var a = Math.max(0, Math.min(18, Math.round(n0(age)))), wk = a >= 4 ? a : a >= 3 ? 2 : 0, j = jars || { save: 40, give: 10, spend: 50 }, sum = n0(j.save) + n0(j.give) + n0(j.spend) || 100;
    return { week: wk, save: r2(wk * n0(j.save) / sum), give: r2(wk * n0(j.give) / sum), spend: r2(wk * n0(j.spend) / sum), month: r2(wk * 52 / 12) }; }
  function setAside(line, bal, monthly) { var target = n0(line.a), left = Math.max(0, target - n0(bal)); return { target: target, left: r2(left), months: monthly > 0 ? Math.ceil(left / monthly) : 0, pct: target > 0 ? Math.min(100, Math.round(n0(bal) / target * 100)) : 0 }; }


  /* ---------- BLD 939: the math for Give, Protect, Grow, and Plan ---------- */
  // Future value with monthly growth: a starting amount plus a monthly amount, a yearly rate, over years.
  function fv(start, monthly, ratePct, years) {
    var r = n0(ratePct) / 1200, n = Math.round(n0(years) * 12), s0 = n0(start), m = n0(monthly);
    if (n <= 0) return r2(s0);
    if (!r) return r2(s0 + m * n);
    var g = Math.pow(1 + r, n); return r2(s0 * g + m * (g - 1) / r);
  }
  // Year by year: [{y, put, total}] for the chart.
  function fvSeries(start, monthly, ratePct, years) { var out = [], Y = Math.max(0, Math.min(60, Math.round(n0(years)))); for (var y = 1; y <= Y; y++) out.push({ y: y, put: r2(n0(start) + n0(monthly) * 12 * y), total: fv(start, monthly, ratePct, y) }); return out; }
  // The monthly giving goal from the Giving Planner's answers (percent of income, or a set amount).
  function giveGoal(d) { var g = d && d.tools && d.tools.give; if (!g || typeof g !== 'object') return 0; var inc = U ? U.totals(d).income : 0; return givingTotal(g.mode || 'pct', g.pct == null ? 10 : g.pct, g.amt, inc); }
  function givenSums(list, now) { now = now || new Date(); var mk = now.getFullYear() + '-' + pad(now.getMonth() + 1), yr = String(now.getFullYear()), m = 0, y = 0;
    arr(list).forEach(function (x) { var d = String(x && x.d || ''); if (d.slice(0, 4) === yr) { y += n0(x.a); if (d.slice(0, 7) === mk) m += n0(x.a); } }); return { month: r2(m), year: r2(y) }; }
  var INSURE = [
    ['health', 'Health', 'Doctor visits, hospital stays, and prescriptions.'],
    ['life', 'Life', 'Income for the people who count on you.'],
    ['dis', 'Disability', 'Income through a season of illness or injury away from work.'],
    ['home', 'Home or Renters', 'Your home and belongings, and liability at home.'],
    ['auto', 'Auto', 'Your car, your passengers, and others on the road.'],
    ['umb', 'Umbrella', 'Extra liability coverage above home and auto.']
  ];
  function insureSums(t) { var k = (t && t.k) || {}, have = 0, review = 0, total = 0, next = '';
    INSURE.forEach(function (x) { var v = k[x[0]]; if (v === 'na') return; total++; if (v === 'have') have++; else { if (v === 'review') review++; if (!next) next = x[1]; } }); return { have: have, review: review, total: total, next: next }; }
  // The Blind Spot Check: [key, name, why, next step]. Commonly missed pieces of a steady household plan.
  var BLIND = [
    ['will', 'A Will', 'Says who receives what, and who raises your children.', 'Write a simple will with an attorney or a trusted will service.'],
    ['benef', 'Beneficiaries on Every Account', 'Retirement accounts, life insurance, and bank accounts each name who receives them.', 'Sign in to each account and add or confirm the beneficiary.'],
    ['poa', 'Power of Attorney', 'Someone you trust can handle money matters for you through a hard season.', 'Name a financial power of attorney, with an attorney or your state’s form.'],
    ['hcd', 'Health Care Directive', 'Your wishes for medical choices, and who speaks for you.', 'Fill out your state’s health care directive and share copies with family.'],
    ['life', 'Enough Life Coverage', 'Income for the people who count on you, sized to their needs.', 'Add up what your family would need, and compare it with your coverage.'],
    ['dis', 'Disability Coverage', 'Your income keeps coming through a season away from work.', 'Ask your workplace what disability coverage you have, and fill any gap.'],
    ['efund', 'An Emergency Fund', 'A cushion of a few months of spending, set aside.', 'Start with one month, a small steady amount at a time.'],
    ['freeze', 'Credit Freeze', 'A freeze at each credit bureau keeps new accounts in your hands.', 'Freeze your credit online at each of the three credit bureaus.'],
    ['report', 'Yearly Credit Report Look', 'A yearly look keeps your credit history accurate.', 'Request your credit reports and look for anything unfamiliar.'],
    ['list', 'Account List for Family', 'Your family knows where your accounts are and how to reach them.', 'Write a list of accounts and keep it somewhere safe your family can find.'],
    ['docs', 'Key Documents in One Place', 'IDs, birth certificates, titles, policies, and passports together.', 'Gather them into one folder or a fireproof box.'],
    ['signin', 'Strong Sign In', 'Strong passwords and two step sign in on email and bank accounts.', 'Turn on two step sign in for your email and your bank.'],
    ['subs', 'Yearly Subscription Review', 'Each subscription earns its place once a year.', 'Open Subscription Check and choose Keep, Pause, or Let Go for each one.'],
    ['tax', 'Tax Set Aside for Side Income', 'Side income often owes tax at year end; a set aside keeps spring calm.', 'Set aside a share of each side payment in its own savings account.'],
    ['autopay', 'Every Due Date Covered', 'Autopay or reminders cover each bill on time.', 'Set autopay or a reminder for each bill in My Plan.']
  ];
  function blindSums(t) { var done = (t && t.done) || {}, na = (t && t.na) || {}, d = 0, total = 0, next = null;
    BLIND.forEach(function (b) { if (na[b[0]]) return; total++; if (done[b[0]]) d++; else if (!next) next = b; });
    return { done: d, total: total, left: total - d, pct: total ? Math.round(d / total * 100) : 0, next: next }; }
  function ring(pct) { var R = 26, C = 2 * Math.PI * R, p = Math.max(0, Math.min(100, n0(pct)));
    return '<svg class="gm-ring" viewBox="0 0 64 64" role="img" aria-label="' + p + ' percent covered"><circle cx="32" cy="32" r="' + R + '" class="gm-ring-bg"/>' + (p > 0 ? '<circle cx="32" cy="32" r="' + R + '" class="gm-ring-fg" stroke-dasharray="' + (C * p / 100).toFixed(1) + ' ' + C.toFixed(1) + '" transform="rotate(-90 32 32)"/>' : '') + '<text x="32" y="37" text-anchor="middle">' + p + '%</text></svg>'; }
  // A small bar chart of what you put in and what growth adds, year by year (every few years on longer spans).
  function growChart(series) {
    if (!series.length) return '';
    var step = series.length > 30 ? 5 : series.length > 15 ? 2 : 1, pts = series.filter(function (x) { return x.y % step === 0 || x.y === series.length; }), max = pts[pts.length - 1].total || 1;
    var W = 320, H = 150, bw = Math.max(4, Math.floor((W - 20) / pts.length) - 3), gap = (W - 20 - bw * pts.length) / Math.max(1, pts.length);
    var bars = pts.map(function (x, i) { var hx = 10 + i * (bw + gap) + gap / 2, ht = Math.max(1, x.total / max * (H - 30)), hp = Math.min(ht, x.put / max * (H - 30));
      return '<rect class="gm-gc-g" x="' + hx.toFixed(1) + '" y="' + (H - 18 - ht).toFixed(1) + '" width="' + bw + '" height="' + (ht - hp).toFixed(1) + '" rx="2"/><rect class="gm-gc-p" x="' + hx.toFixed(1) + '" y="' + (H - 18 - hp).toFixed(1) + '" width="' + bw + '" height="' + hp.toFixed(1) + '" rx="2"/>' +
        (i === 0 || i === pts.length - 1 || pts.length <= 10 ? '<text x="' + (hx + bw / 2).toFixed(1) + '" y="' + (H - 4) + '" text-anchor="middle">' + x.y + '</text>' : ''); }).join('');
    var last = pts[pts.length - 1];
    return '<figure class="gm-gchart"><svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Growth over ' + last.y + ' years: you put in ' + U.money(last.put) + ', and it grows to ' + U.money(last.total) + '">' + bars + '</svg>' +
      '<figcaption><span class="gm-key p"></span>You put in<span class="gm-key g"></span>Growth<span class="gm-mini">Years along the bottom</span></figcaption></figure>';
  }
  function compoundOut(tc) {
    var yrs = n0(tc.years); if (!(yrs > 0) || !(n0(tc.start) + n0(tc.monthly) > 0)) return '<p class="gm-mini">Add a starting amount or a monthly amount to see it grow.</p>';
    var f = fv(tc.start, tc.monthly, tc.rate, yrs), put = n0(tc.start) + n0(tc.monthly) * 12 * yrs;
    return '<div class="gm-tbigs">' + big('In ' + yrs + ' Year' + (yrs === 1 ? '' : 's'), U.money(f), 'at ' + n0(tc.rate) + '% a year', 'ok') + big('You Put In', U.money(put), 'growth adds ' + U.money(Math.max(0, f - put)), 'hn') + '</div>' + growChart(fvSeries(tc.start, tc.monthly, tc.rate, yrs));
  }
  var KIND = { date: 'Big Date', bill: 'Bill', goal: 'Goal' };
  function yearlyLines(d) { return U.live(d.lines).filter(function (l) { return l.s !== 'hold' && (l.f === 'y' || l.f === 'h'); }); }
  // Four seasons (winter holds December, January, and February), with yearly bills, goals by their date, and the person's own items.
  function seasons(c) {
    var t = c.t, rows = [], S = [['winter', 'Winter', [11, 0, 1]], ['spring', 'Spring', [2, 3, 4]], ['summer', 'Summer', [5, 6, 7]], ['fall', 'Fall', [8, 9, 10]]];
    yearlyLines(c.d).forEach(function (l) { var m = t.lm[l.id]; if (m === '' || m == null || !isFinite(+m)) return; m = +m; rows.push({ m: m, n: l.n, a: l.a }); if (l.f === 'h') rows.push({ m: (m + 6) % 12, n: l.n, a: l.a }); });
    var gl = c.d.tools && c.d.tools.goals; arr(gl && gl.goals).forEach(function (g) { var dd = parseD(g.date); if (dd && n0(g.target) > 0) rows.push({ m: dd.getMonth(), n: (g.n || 'Goal') + ' (goal)', a: 0 }); });
    arr(t.items).forEach(function (x) { rows.push({ m: +x.m || 0, n: x.n || KIND[x.k] || 'Big Date', a: n0(x.a) }); });
    return S.map(function (s) { var r = rows.filter(function (x) { return s[2].indexOf(x.m) >= 0; }).sort(function (a, b) { return s[2].indexOf(a.m) - s[2].indexOf(b.m); }); return { id: s[0], n: s[1], rows: r, total: r2(r.reduce(function (z, x) { return z + n0(x.a); }, 0)) }; });
  }

  /* =====================================================================
     BLD 940: GROUNDED MONEY STANDARDS and the WINDFALL PLANNER (the math, pure, for tests)
     Suggested shares of take-home pay (Chris approved, November 8, 2026). Each plan line maps to an area by its name
     (the person can choose another), lines marked Before Taxes stay out (they come out before take-home), and the
     person's pretax saving (a workplace plan with the employer's part, an HSA) counts as saving.
     ===================================================================== */
  var AREAS = [
    ['give', 'Giving', 'gift'], ['save', 'Saving and Investing', 'chart'], ['home', 'Housing', 'home'], ['food', 'Food', 'plate'],
    ['move', 'Transportation', 'car'], ['health', 'Insurance and Health', 'umbrella'], ['debt', 'Debt Payments', 'path'], ['fun', 'Family Life and Fun', 'people'], ['other', 'Everything Else', 'grid']
  ];
  var AREA = {}; AREAS.forEach(function (a) { AREA[a[0]] = { id: a[0], n: a[1], i: a[2] }; });
  // [low, high] percent of take-home pay
  var STD_BASE = { give: [5, 10], save: [15, 20], home: [25, 30], food: [10, 15], move: [10, 15], health: [5, 10], debt: [0, 10], fun: [5, 10] };
  var GOALS = [
    ['gap', 'Close the Gap', 'Bring the monthly plan into balance first.'], ['cards', 'Clear the Cards', 'Fun and extra saving lean toward the cards for a season.'],
    ['efund', 'Build an Emergency Fund', 'Saving leans toward a cushion of a few months.'], ['home', 'Buy a Home', 'Saving for a down payment, and housing within the lender line.'],
    ['give', 'Give More', 'Giving grows toward the high end.'], ['retire', 'Grow Toward Retirement', 'Saving and investing lean toward the high end.']
  ];
  // Each goal shifts a few ranges for a season.
  var GOAL_SHIFT = {
    gap: { fun: [3, 5], save: [10, 15] }, cards: { fun: [3, 5], save: [10, 15], debt: [0, 20] }, efund: { save: [20, 25], fun: [3, 7] },
    home: { save: [20, 25], home: [25, 28], fun: [3, 7] }, give: { give: [10, 15] }, retire: { save: [20, 25] }
  };
  // The order next steps come in, by goal.
  var GOAL_ORDER = {
    gap: ['food', 'fun', 'move', 'home', 'health', 'debt', 'give', 'save'], cards: ['debt', 'fun', 'food', 'move', 'save', 'give', 'home', 'health'],
    efund: ['save', 'fun', 'food', 'move', 'debt', 'give', 'home', 'health'], home: ['save', 'debt', 'fun', 'food', 'home', 'move', 'give', 'health'],
    give: ['give', 'fun', 'food', 'save', 'move', 'debt', 'home', 'health'], retire: ['save', 'debt', 'fun', 'food', 'give', 'move', 'home', 'health']
  };
  // USDA Food Plans: Cost of Food, Moderate-Cost plan, about $330 a person a month (approximate, 2026; the USDA updates it monthly),
  // with the USDA's household size factors: 1 person add 20%, 2 add 10%, 3 add 5%, 4 as is, 5 or 6 subtract 5%, 7 or more subtract 10%.
  var FOOD_PER = 330, FOOD_AS_OF = '2026';
  function sizeOf(n) { n = Math.round(n0(n)); return Math.max(1, Math.min(15, n || 2)); }
  function foodFactor(n) { n = sizeOf(n); return n === 1 ? 1.2 : n === 2 ? 1.1 : n === 3 ? 1.05 : n === 4 ? 1 : n <= 6 ? 0.95 : 0.9; }
  function foodRef(n) { n = sizeOf(n); return Math.round(FOOD_PER * n * foodFactor(n) / 10) * 10; }
  function stdRanges(goal, size) {
    var r = {}, n = sizeOf(size), extra = Math.max(0, n - 4);
    Object.keys(STD_BASE).forEach(function (k) { r[k] = STD_BASE[k].slice(); });
    // A bigger household: housing and family life stretch a little (one point a person over four).
    r.home[1] = Math.min(35, r.home[1] + extra); r.fun[1] = Math.min(12, r.fun[1] + extra);
    var sh = GOAL_SHIFT[goal] || {};
    Object.keys(sh).forEach(function (k) { r[k] = [sh[k][0], k === 'fun' ? Math.min(12, sh[k][1] + extra) : sh[k][1]]; });
    return r;
  }
  var AREA_RE = [
    ['give', /giv|donat|tith|church|charit|offering|mosque|temple|synagogue/i],
    ['save', /sav(e|ing)|\b40[13]|\bira\b|roth|\bhsa\b|invest|retire|emergency|brokerage|\b529\b/i],
    ['move', /\bcars?\b|auto|vehicle|truck|gas for|fuel|transit|\bbus\b|parking|toll|uber|lyft|registration/i],
    ['home', /mortgage|\brent\b|home loan|heloc/i],
    ['debt', /card|credit|loan|debt|payoff|student|visa|mastercard|discover|amex/i],
    ['home', /energy|electric|power|natural gas|\bgas\b|water|trash|sewer|internet|wifi|utilit|\bhoa\b|property tax|home|house|repair|upkeep|maint|heat|xcel|phone|mobile|wireless|cell/i],
    ['food', /grocer|food|costco|aldi|market|restaurant|dining|eat(ing)? ?out|take ?out|lunch|coffee|meal/i],
    ['health', /insur|medic|\bmeds?\b|doctor|dental|dentist|pharm|prescri|\brx\b|therap|vision|clinic|hospital|copay|chiro|gym|fitness|health/i],
    ['fun', /fun|entertain|stream|netflix|hulu|spotify|disney|subscri|vacation|trip|travel|gift|hobby|sport|activit|lesson|movie|date night|camp|allowance|\bpets?\b|cloth|kids|outing/i]
  ];
  function stdArea(l) { var s = String(l.n || '') + ' ' + String(l.o || ''); for (var i = 0; i < AREA_RE.length; i++) if (AREA_RE[i][1].test(s)) return AREA_RE[i][0]; return 'other'; }
  var HOMEDEBT = /mortgage|home loan|heloc/i, CARD = /card|credit|visa|mastercard|discover|amex/i;
  // The person's lines that count toward take-home spending: live, not On Hold, not Before Taxes.
  function stdLines(d, t) {
    var areas = (t && t.areas) || {};
    return U.live(d.lines).filter(function (l) { return l.s !== 'hold' && l.s !== 'pretax' && U.monthly(l) > 0; }).map(function (l) {
      var a = AREA[areas[l.id]] && areas[l.id] ? areas[l.id] : stdArea(l);
      return { id: l.id, n: l.n, s: l.s, o: l.o || '', amt: U.monthly(l), area: a, auto: !areas[l.id], fixed: l.s === 'fixed' };
    });
  }
  function pretaxSum(d) { return r2(U.live(d.lines).filter(function (l) { return l.s === 'pretax'; }).reduce(function (s, l) { return s + U.monthly(l); }, 0)); }
  // Pretax saving a month: entered a month ('m') or a paycheck ('p', on the Paycheck Planner's schedule, every two weeks by default).
  function pretaxMonthly(d, t) { var v = n0(t && t.pretax); if (t && t.pretaxF === 'p') { var s = (d.tools && d.tools.pay && d.tools.pay.s) || 'b'; return r2(v * checksPerYear(s) / 12); } return r2(v); }
  // Cards that carry a balance: the Debt Payoff Planner's cards (a card name, or a yearly rate of 15% or more).
  function cardsOf(d) { var t = d.tools && d.tools.debt; return arr(t && t.list).filter(function (x) { return n0(x.bal) > 0 && (CARD.test(x.n || '') || n0(x.rate) >= 15); }).map(function (x) { return { n: x.n || 'Card', bal: n0(x.bal), rate: n0(x.rate) }; }); }
  function cardsCarry(d, t) {
    var c = cardsOf(d); if (c.length) return c.reduce(function (s, x) { return s + x.bal; }, 0);
    var hasList = d.tools && d.tools.debt && arr(d.tools.debt.list).some(function (x) { return n0(x.bal) > 0 || x.n; });
    // With no Debt Payoff Planner list yet, a card payment line in the plan shows a balance carried.
    return hasList ? 0 : stdLines(d, t).filter(function (l) { return l.area === 'debt' && CARD.test(l.n + ' ' + l.o); }).length ? 1 : 0;
  }
  // The whole side by side view.
  function stdView(d, t) {
    t = t || {};
    var T = U.totals(d), inc = r2(T.income), size = sizeOf(t.size), L = stdLines(d, t), P = pretaxMonthly(d, t);
    var season = seasonOf(d, t), goal = t.goal && GOAL_SHIFT[t.goal] ? t.goal : season.building ? (T.after < 0 ? 'gap' : 'cards') : 'retire';
    var R = stdRanges(goal, size), fref = foodRef(size), trims = t.trims || {};
    var rows = AREAS.map(function (a) {
      var id = a[0], ls = L.filter(function (l) { return l.area === id; }), amt = r2(ls.reduce(function (s, l) { return s + l.amt; }, 0) + (id === 'save' ? P : 0));
      var flex = r2(ls.filter(function (l) { return !l.fixed; }).reduce(function (s, l) { return s + l.amt; }, 0)), rg = R[id] || null, pct = inc > 0 ? amt / inc * 100 : 0, word = '', k = '';
      if (rg) {
        if (id === 'give' || id === 'save') { if (pct >= rg[0] - 0.05) { word = 'On Track'; k = 'on'; } else { word = 'Room to Grow'; k = 'grow'; } }
        else if (pct <= rg[1] + 0.05) { word = 'On Track'; k = 'on'; }
        else if (id === 'food' && amt <= fref) { word = 'Fair for Your Family Size'; k = 'fair'; }
        else { word = 'Above the Range'; k = 'above'; }
      }
      var over = rg && k === 'above' ? r2(amt - rg[1] * inc / 100) : 0, trim = Math.max(0, Math.min(flex, n0(trims[id])));
      return { id: id, n: a[1], i: a[2], amt: amt, pct: Math.round(pct * 10) / 10, lo: rg ? rg[0] : null, hi: rg ? rg[1] : null, loAmt: rg ? r2(rg[0] * inc / 100) : 0, hiAmt: rg ? r2(rg[1] * inc / 100) : 0,
        word: word, k: k, lines: ls, flex: flex, over: over, suggest: Math.round(Math.min(over, flex)), trim: r2(trim), pretax: id === 'save' ? P : 0 };
    });
    var by = {}; rows.forEach(function (r) { by[r.id] = r; });
    var homeDebt = L.filter(function (l) { return l.area === 'home' && HOMEDEBT.test(l.n + ' ' + l.o); }).reduce(function (s, l) { return s + l.amt; }, 0);
    var dti = inc > 0 ? Math.round((homeDebt + by.debt.amt) / inc * 1000) / 10 : 0;
    var order = (GOAL_ORDER[goal] || GOAL_ORDER.gap), next = [];
    order.forEach(function (id) { var r = by[id]; if (r && (r.k === 'above' || r.k === 'grow')) next.push(r); });
    var O = r2(rows.filter(function (r) { return r.id !== 'give' && r.id !== 'save'; }).reduce(function (s, r) { return s + r.amt; }, 0));
    var trimSum = r2(rows.reduce(function (s, r) { return s + r.trim; }, 0));
    var wt = whatItTakes({ other: O, pretax: P, give: R.give[0], save: R.save[0] }), wt2 = whatItTakes({ other: O - trimSum, pretax: P, give: R.give[0], save: R.save[0] });
    return { income: inc, size: size, goal: goal, season: season, ranges: R, rows: rows, by: by, food: fref, dti: dti, homeDebt: r2(homeDebt), next: next, other: O, pretax: P, trims: trimSum, need: wt, needTrim: wt2 };
  }
  // The take-home pay that meets the standards with spending as it is: (other spending minus pretax saving) / (1 minus giving% minus saving%).
  function whatItTakes(o) { var g = n0(o.give) / 100, s = n0(o.save) / 100, k = 1 - g - s; if (!(k > 0)) return 0; return Math.max(0, Math.round((n0(o.other) - n0(o.pretax)) / k)); }
  // The two seasons and the five Building Season steps.
  var STEPS = [
    ['gap', 'Close the Gap', 'Your monthly plan comes into balance.', 'gap', 'The gap is closed. Every step here is a win.'],
    ['give', 'Give Something', 'Any amount, to the causes and people you care about.', 'tool:give', 'You are giving. Generosity grows from here.'],
    ['match', 'Keep Any Employer Match', 'Put in enough at work to receive the full match, where there is one.', 'grow', 'Your employer match is kept: money added beside yours.'],
    ['ef', 'Starter Emergency Fund of $1,000', 'A first cushion, so a surprise becomes an errand.', 'tool:goals', 'Your starter emergency fund is in place: $1,000 of calm.'],
    ['cards', 'Clear the Cards', 'Every card balance cleared, highest rate first or smallest first.', 'tool:debt', 'Card balance cleared. A big step, well done.']
  ];
  function seasonOf(d, t) {
    var T = U.totals(d), cards = cardsCarry(d, t), gv = d.tools || {}, gl = gv.givelog, mk = U.monthKey();
    var gave = stdLines(d, t).some(function (l) { return l.area === 'give'; }) || arr(gl && gl.list).some(function (x) { return String(x.d || '').slice(0, 7) === mk && n0(x.a) > 0; });
    var met = { gap: T.after >= 0, give: gave, match: !!(gv.grow && (gv.grow.match === 'full' || gv.grow.match === 'na')), ef: n0(gv.goals && gv.goals.ef) >= 1000, cards: !cards };
    var building = T.after < 0 || !!cards;
    return { building: building, met: met, done: STEPS.filter(function (s) { return met[s[0]]; }).length, cards: cards, short: T.after < 0 ? r2(-T.after) : 0 };
  }
  // A windfall, split in order: a giving share first when chosen, the starter emergency fund up to $1,000,
  // high interest cards (highest rate first), the person's goals (soonest date first), and the rest.
  function windfallSplit(o) {
    var left = Math.max(0, n0(o.amt)), rows = [];
    function take(k, n, want) { var a = Math.max(0, Math.min(left, n0(want))); a = r2(a); if (a > 0) { rows.push({ k: k, n: n, a: a }); left = r2(left - a); } }
    if (n0(o.give) > 0) take('give', 'Giving', n0(o.amt) * n0(o.give) / 100);
    take('ef', 'Starter Emergency Fund', 1000 - n0(o.ef));
    arr(o.cards).slice().sort(function (a, b) { return n0(b.rate) - n0(a.rate) || n0(a.bal) - n0(b.bal); }).forEach(function (c) { take('card', c.n || 'Card', c.bal); });
    arr(o.goals).forEach(function (g) { take('goal', g.n || 'Goal', g.left); });
    if (left > 0) rows.push({ k: 'rest', n: 'Yours to Enjoy or Grow', a: left });
    return { rows: rows, total: r2(n0(o.amt)) };
  }
  function goalsLeft(d) {
    var gl = d.tools && d.tools.goals;
    return arr(gl && gl.goals).filter(function (g) { return n0(g.target) > n0(g.saved); }).sort(function (a, b) { return String(a.date || '9') < String(b.date || '9') ? -1 : 1; }).map(function (g) { return { n: g.n || 'Goal', left: r2(n0(g.target) - n0(g.saved)) }; });
  }
  // The same credits live in shared/gg-sources.js (money-usda-food, money-fidelity15, money-cfpb-dti, money-nfcc; 'money:standards').
  var STD_SRC = [
    ['USDA Food Plans: Cost of Food, U.S. Department of Agriculture (the Moderate-Cost plan and household size factors)', 'https://www.fns.usda.gov/research/cnpp/usda-food-plans/cost-food-monthly-reports'],
    ['Fidelity Investments, How much should I save for retirement? (15% of pay, employer contributions included)', 'https://www.fidelity.com/viewpoints/retirement/how-much-money-should-i-save'],
    ['Consumer Financial Protection Bureau, Your Money, Your Goals: debt to income calculator (all debts, the home included, at 36% or less)', 'https://files.consumerfinance.gov/f/documents/cfpb_your-money-your-goals_debt_income_calc_tool_2018-11_ADA.pdf'],
    ['National Foundation for Credit Counseling', 'https://www.nfcc.org/']
  ];
  function stdSources() {
    return '<p class="gm-mini gm-srcline"><b>Sources:</b> ' + STD_SRC.map(function (s) { return '<a href="' + E(s[1]) + '" target="_blank" rel="noopener">' + E(s[0]) + '</a>'; }).join('; ') + '. Other details: source unknown.</p>';
  }
  // One area, side by side: theirs, the suggested range, and a kind word (no grades, no score).
  function stdRow(r, inc) {
    if (r.lo == null) return r.amt ? '<div class="gm-std gm-std-other" data-area="other"><div class="gm-std-h"><span class="gm-std-n">' + U.I(r.i) + E(r.n) + '</span><span class="gm-std-y"><b>' + M(r.amt) + '</b> ' + Math.round(r.pct) + '%</span></div></div>' : '';
    var scale = Math.max(r.hi * 1.6, r.pct * 1.1, 8), band = 'left:' + (r.lo / scale * 100).toFixed(1) + '%;width:' + ((r.hi - r.lo) / scale * 100).toFixed(1) + '%', dot = 'left:' + Math.min(100, r.pct / scale * 100).toFixed(1) + '%';
    return '<div class="gm-std k-' + r.k + '" data-area="' + r.id + '"><div class="gm-std-h"><span class="gm-std-n">' + U.I(r.i) + E(r.n) + '</span><span class="gm-std-w">' + E(r.word) + '</span></div>' +
      '<div class="gm-std-c"><div><span class="gm-k">Yours</span><b>' + M(r.amt) + '</b><small>' + (Math.round(r.pct * 10) / 10) + '% of take-home</small></div>' +
      '<div><span class="gm-k">Suggested</span><b>' + r.lo + ' to ' + r.hi + '%</b><small>' + (inc > 0 ? M(r.loAmt) + ' to ' + M(r.hiAmt) : '') + '</small></div></div>' +
      '<div class="gm-std-t" role="img" aria-label="' + E(r.n + ': ' + Math.round(r.pct) + ' percent, suggested ' + r.lo + ' to ' + r.hi + ' percent') + '"><span class="gm-std-b" style="' + band + '"></span><span class="gm-std-d" style="' + dot + '"></span></div></div>';
  }
  function stepsHtml(met, reading) {
    return '<ol class="gm-bsteps">' + STEPS.map(function (s, i) { var on = !reading && met && met[s[0]];
      return '<li class="' + (on ? 'on' : '') + '" data-step="' + s[0] + '"><span class="gm-bnum">' + (on ? U.I('check') : String(i + 1)) + '</span><span class="gm-tx"><b>' + E(s[1]) + '</b><small>' + E(on ? 'Done. ' + s[2] : s[2]) + '</small></span>' +
        (!reading && !on ? '<button type="button" class="gm-linkbtn" data-gm="go:' + (s[0] === 'match' ? 'grow' : s[3]) + '">' + (s[0] === 'gap' ? 'Close the Gap' : s[0] === 'give' ? 'Giving Planner' : s[0] === 'match' ? 'Employer Match' : s[0] === 'ef' ? 'Emergency Fund' : 'Debt Payoff') + U.I('arrow') + '</button>' : '') + '</li>'; }).join('') + '</ol>';
  }
  // The Start taste: the Building Season steps as reading, and one sample area with made-up numbers.
  function stdTaste() {
    var inc = 5000, r = { id: 'food', n: 'Food', i: 'plate', amt: 650, pct: 13, lo: 10, hi: 15, loAmt: 500, hiAmt: 750, word: 'On Track', k: 'on' };
    return '<p class="gm-sub">Suggested shares of take-home pay for giving, saving, housing, food, and more, side by side with your own plan, sized for your household.</p>' +
      '<h4 class="gm-h4">Building Season</h4><p class="gm-mini">When the month runs short or cards carry a balance, five steps lead the way, and each one is a win.</p>' + stepsHtml(null, true) +
      '<h4 class="gm-h4">A Sample, Side by Side</h4><p class="gm-mini">Made-up numbers: a take-home of ' + M(inc) + ' a month.</p>' + stdRow(r, inc);
  }

  /* =====================================================================
     GROUNDED MONEY TIPS: short, forward, and doable. One is featured each week.
     ===================================================================== */
  var TIPS = [
    ['Food', 'Plan the week’s dinners before you shop. One list keeps the cart calm.'],
    ['Food', 'Shop with your list after a meal, and the cart fills with what you planned.'],
    ['Food', 'Cook once, eat twice: double the soup or chili and enjoy a night off the stove.'],
    ['Food', 'Sunday Prep: wash and chop on Sunday so weeknight dinners come together in minutes.'],
    ['Food', 'Pack lunch the night before, three days a week, and carry it out the door with you.'],
    ['Food', 'Make water the house drink: a full pitcher on the table at every meal.'],
    ['Food', 'Keep staples on hand in bulk: oats, beans, rice, and frozen vegetables.'],
    ['Food', 'Compare the price per ounce on the shelf tag; the store brand often wins for staples.'],
    ['Food', 'Once a week, cook a Use It Up dinner from what is already in the fridge.'],
    ['Food', 'Grow basil and parsley on a sunny windowsill and snip fresh herbs all season.'],
    ['Home', 'Set the thermostat a few degrees toward the season and dress warm or cool to match.'],
    ['Home', 'Ask the energy company about budget billing for one steady amount each month.'],
    ['Home', 'Use LED bulbs in the lamps you use most.'],
    ['Home', 'Wash clothes in cold water, and line dry on sunny days.'],
    ['Home', 'Call your internet company once a year and ask for their best current rate.'],
    ['Home', 'Borrow first: tools, books, and gear from neighbors, friends, and the library.'],
    ['Car', 'Keep tires filled to the number on the door sticker for a smoother ride and better mileage.'],
    ['Car', 'Combine errands into one loop around town.'],
    ['Car', 'Compare car insurance once a year with the same coverage.'],
    ['Car', 'Once your emergency fund is steady, ask what a higher deductible saves each month.'],
    ['Habits', 'Give every dollar a job at the start of the month.'],
    ['Habits', 'Give any purchase over $50 a 48 hour pause. The things you truly want are still there.'],
    ['Habits', 'Pay yourself first: move savings on payday, before the bills.'],
    ['Habits', 'Set automatic minimum payments so every due date is covered on time.'],
    ['Habits', 'Round up each purchase in your head and move the difference to savings each week.'],
    ['Habits', 'Keep a small envelope of fun money each week and enjoy every dollar of it.'],
    ['Habits', 'Name each savings goal. A Car Fund grows faster than a plain Savings account.'],
    ['Habits', 'Fifteen calm minutes with your plan each week keeps money peaceful.'],
    ['Habits', 'Keep store emails to a quiet few; a calm inbox keeps spending on purpose.'],
    ['Earn', 'Turn a skill into side work: tutoring, music lessons, repairs, or ceremonies.'],
    ['Earn', 'Sell what your family has outgrown: more space and more income in one step.'],
    ['Earn', 'Bring a short list of this year’s wins to your next review at work.'],
    ['Earn', 'Send each three paycheck month to a goal: the emergency fund, a debt, or a set-aside fund.'],
    ['Earn', 'Check your tax withholding so more of your pay arrives each month.'],
    ['Earn', 'Put in at least enough at work to receive the full match.'],
    ['Family', 'Hold a weekly Money Date: fifteen minutes, one win, one plan.'],
    ['Family', 'Give kids save, give, and spend jars. They learn by doing.'],
    ['Family', 'Plan the whole year of gifts in January and spread the cost across the months.'],
    ['Family', 'Choose shared experiences: a picnic, a hike, or a game night at home.'],
    ['Family', 'Celebrate a goal reached with something simple you enjoy together.'],
    ['Giving', 'Choose your giving first, then plan the rest around it.'],
    ['Giving', 'Give time too: a meal for a neighbor or an hour of help is a real gift.'],
    ['Health', 'Walk or bike the short trips; good for the body and the budget.'],
    ['Health', 'Use the library for books, movies, classes, and quiet.'],
    ['Health', 'Enjoy unplugged evenings: fewer streaming plans and more time together.'],
    ['Health', 'Keep up with preventive visits at the doctor and dentist; staying well costs less.'],
    ['Health', 'Ask for the cash price and a payment plan on medical bills.'],
    // BLD 939: tips for Give, Protect, and Grow (each tip shows in the part where it fits; see tipPart)
    ['Giving', 'Keep a short list of the causes and people you care about, and give to them on purpose.'],
    ['Protect', 'Keep a list of your accounts where your family can find it.'],
    ['Protect', 'Name a beneficiary on every account, and look again after each big life change.'],
    ['Protect', 'Build your emergency fund one small, steady amount at a time.'],
    ['Grow', 'Start with any amount: steady monthly saving and time do much of the growing.'],
    ['Grow', 'Spread your savings across many kinds of investments, so no single one carries your future.'],
    ['Grow', 'Keep investing costs low; small yearly fees add up over many years.'],
    // BLD 940: tips for the Grounded Money Standards and the two seasons
    ['Standards', 'Look at your plan beside the Grounded Money Standards once a season, and choose one area to tend.'],
    ['Standards', 'Building Season is a real season: every step, from closing the gap to a card balance cleared, is a win.'],
    ['Standards', 'Count money set aside before payday, like a workplace retirement plan or an HSA, as saving. It is already working for you.'],
    ['Standards', 'When cards carry a balance, nonprofit credit counseling from a member of the National Foundation for Credit Counseling (nfcc.org) can help you build a plan. Choose a nonprofit member over a debt settlement company.'],
    ['Standards', 'A tax return or a bonus goes furthest with a plan: a starter emergency fund first, then the highest rate card, then your goals.'],
    ['Standards', 'Choose one top goal for this season. One clear goal makes every other choice simpler.'],
    ['Standards', 'Keep debt payments other than your home as low as you can; each balance cleared returns money to your goals.'],
    ['Standards', 'A $1,000 starter emergency fund turns many surprises into simple errands.'],
    ['Standards', 'Housing near a quarter of take-home pay leaves room for the rest of life. When it runs higher, tend the other lines gently.'],
    ['Giving', 'Give something every month, even a small amount. Generosity is a habit before it is a number.'],
    ['Giving', 'As your plan grows, let giving grow with it: a percent rises with your income on its own.'],
    ['Food', 'Cook whole food at home most nights. It is a kind choice for your body and for your food line.'],
    ['Food', 'A big family eats well on a fair budget: plan the week, cook in batches, and buy staples in bulk.'],
    ['Food', 'Water at the table, fruit for dessert, and simple home meals keep the food line steady.'],
    ['Health', 'Once a season, take an Unplugged look at subscriptions: keep the ones you love and pause the rest.'],
    ['Family', 'Plan outdoor family time: parks, trails, and picnics bring joy at a small cost.'],
    ['Family', 'Choose family fun that brings you together: a game night, a bike ride, or a library afternoon.'],
    ['Protect', 'Look at your insurance once a year; the right coverage keeps the plan steady through a hard season.'],
    ['Grow', 'Keep any employer match, even in Building Season: it is money added beside yours.'],
    ['Grow', 'When the cards are cleared, send what you paid on them to saving and investing. The habit keeps growing.'],
    ['Grow', 'Fifteen percent of pay, any employer match included, is a common retirement saving guideline. Start where you are and grow toward it.']
  ];
  var NFCC_TIP = 0; TIPS.forEach(function (x, i) { if (/nfcc\.org/.test(x[1])) NFCC_TIP = i; });
  // The part each tip belongs to (Give, Live, Protect, Grow, Plan), by its kind, with a few placed by hand.
  var CATPART = { Food: 'live', Home: 'live', Car: 'live', Habits: 'ahead', Earn: 'grow', Family: 'live', Giving: 'give', Health: 'live', Protect: 'protect', Grow: 'grow', Standards: 'ahead' };
  function tipPart(i) { var x = TIPS[i]; if (/emergency fund is steady/.test(x[1])) return 'protect'; if (/three paycheck month|tax withholding/.test(x[1])) return 'ahead'; return CATPART[x[0]] || 'live'; }
  function partTips(part) { var out = []; TIPS.forEach(function (x, i) { if (tipPart(i) === part) out.push(i); }); return out; }
  function tipOfWeek(d) { d = d || new Date(); var j = new Date(d.getFullYear(), 0, 1), w = Math.floor((d - j) / (7 * 864e5)); return (w + d.getFullYear() * 7) % TIPS.length; }

  /* =====================================================================
     THE TOOLS
     ===================================================================== */
  function E(s) { return U.esc(s); }
  function M(n, c) { return U.money(n, c); }
  function fld(lbl, path, val, o) {
    o = o || {}; var v = val == null || val === '' ? '' : val;
    return '<label class="gm-f' + (o.cls ? ' ' + o.cls : '') + '"><span>' + E(lbl) + '</span>' + (o.sel ? '<select class="gm-in" data-gt="' + path + '"' + (o.re ? ' data-gtp="1"' : '') + '>' + o.sel.map(function (x) { return '<option value="' + E(x[0]) + '"' + (String(x[0]) === String(v) ? ' selected' : '') + '>' + E(x[1]) + '</option>'; }).join('') + '</select>'
      : '<input class="gm-in" data-gt="' + path + '"' + (o.text ? '' : ' data-n="1" inputmode="decimal"') + (o.type ? ' type="' + o.type + '"' : '') + ' value="' + E(v) + '" placeholder="' + E(o.ph || '') + '"' + (o.max ? ' maxlength="' + o.max + '"' : '') + '>') + '</label>';
  }
  function row(a, b) { return '<div class="gm-tr"><span>' + a + '</span><b>' + b + '</b></div>'; }
  function big(k, v, sub, cls) { return '<div class="gm-tbig' + (cls ? ' ' + cls : '') + '"><span class="gm-k">' + E(k) + '</span><b>' + v + '</b>' + (sub ? '<small>' + sub + '</small>' : '') + '</div>'; }
  function btn(id, a, label, line) { return '<button type="button" class="gm-btn sm' + (line ? ' line' : '') + '" data-gm="tool:' + id + ':' + a + '">' + label + '</button>'; }
  function rm(id, i, name) { return '<button type="button" class="gm-x sm" data-gm="tool:' + id + ':rm:' + i + '" aria-label="Remove ' + E(name || 'this row') + '">' + U.I('x') + '</button>'; }
  function chips(id, act, cur, opts) { return '<div class="gm-scale">' + opts.map(function (o) { var on = String(cur) === String(o[0]); return '<button type="button" class="gm-chip' + (on ? ' on' : '') + '" aria-pressed="' + on + '" data-gm="tool:' + id + ':' + act + ':' + o[0] + '">' + E(o[1]) + '</button>'; }).join('') + '</div>'; }
  function lines(d, re) { return U.live(d.lines).filter(function (l) { return l.s !== 'hold' && re.test(l.n + ' ' + (l.o || '')); }); }
  function lineSum(d, re) { return lines(d, re).reduce(function (s, l) { return s + U.monthly(l); }, 0); }
  function essentials(d) { return U.live(d.lines).filter(function (l) { return l.s !== 'hold' && l.s !== 'pretax'; }).reduce(function (s, l) { return s + U.monthly(l); }, 0); }

  var TOOLS = [
    { id: 'debt', part: 'ahead', n: 'Debt Payoff Planner', i: 'path', sub: 'Your payoff month, and the interest you keep.',
      init: function (t) { t.list = arr(t.list); if (!t.list.length) t.list.push({ n: '', bal: '', rate: '', min: '' }); t.method = t.method || 'small'; if (t.extra == null) t.extra = ''; },
      form: function (c) {
        var t = c.t;
        return '<p class="gm-sub">List each debt with its balance, yearly rate, and minimum. Choose an order, add what you can each month, and watch the payoff month come closer.</p>' +
          t.list.map(function (x, i) { return '<div class="gm-line gm-trow"><div class="gm-lr1">' + fld('Debt', 'list.' + i + '.n', x.n, { text: 1, ph: 'Car loan', max: 60, cls: 'gm-grow' }) + rm('debt', i, x.n) + '</div><div class="gm-lr2 c3">' + fld('Balance', 'list.' + i + '.bal', x.bal, { ph: '0' }) + fld('Rate %', 'list.' + i + '.rate', x.rate, { ph: '0' }) + fld('Minimum', 'list.' + i + '.min', x.min, { ph: '0' }) + '</div></div>'; }).join('') +
          '<div class="gm-acts">' + btn('debt', 'add', U.I('plus') + 'Add a Debt', 1) + '</div>' +
          '<div class="gm-f"><span>Order</span>' + chips('debt', 'method', t.method, [['small', 'Smallest Balance First'], ['rate', 'Highest Rate First']]) + '</div>' +
          fld('Extra each month', 'extra', t.extra, { ph: '100' });
      },
      out: function (c) {
        var t = c.t, ok = t.list.filter(function (x) { return n0(x.bal) > 0; });
        if (!ok.length) return '<p class="gm-mini">Add a balance to see your payoff month.</p>';
        var r = debtPlan(t.list, n0(t.extra), t.method), p = r.plan, when = addMonths(new Date(), p.months);
        if (p.stuck) return '<p class="gm-note">' + U.I('leaf') + 'Raise a minimum or the extra each month so every balance comes down. The plan steadies once each payment covers its interest.</p>';
        return '<div class="gm-tbigs">' + big('All Paid Off By', E(monthName(when)), p.months + ' month' + (p.months === 1 ? '' : 's'), 'ok') + (r.saved != null ? big('Interest You Keep', M(r.saved), 'compared with minimums only', 'hn') : '') + '</div>' +
          (r.sooner > 0 ? '<p class="gm-sub">That is ' + r.sooner + ' month' + (r.sooner === 1 ? '' : 's') + ' sooner than minimums alone.</p>' : '') +
          '<ol class="gm-order">' + p.order.map(function (o) { return '<li><b>' + E(o.n) + '</b><span>' + E(monthName(addMonths(new Date(), o.month))) + '</span></li>'; }).join('') + '</ol>';
      },
      act: function (a, arg, c) { var t = c.t; if (a === 'add') t.list.push({ n: '', bal: '', rate: '', min: '' }); else if (a === 'rm') t.list.splice(+arg, 1); else if (a === 'method') t.method = arg === 'rate' ? 'rate' : 'small'; return true; } },

    { id: 'goals', part: 'protect', n: 'Emergency Fund and Savings Goals', i: 'shield', sub: 'A steady cushion: months covered, and each goal by its date.',
      init: function (t) { t.goals = arr(t.goals); if (t.ef == null) t.ef = ''; t.efm = t.efm || 3; },
      form: function (c) {
        var t = c.t;
        return '<h3 class="gm-h4">Emergency Fund</h3><p class="gm-sub">A steady cushion for a hard season: three to six months of your plan’s spending, set aside.</p>' +
          '<div class="gm-two">' + fld('Saved now', 'ef', t.ef, { ph: '0' }) + fld('Months to aim for', 'efm', t.efm, { sel: [[3, '3 months'], [4, '4 months'], [6, '6 months']] }) + '</div>' +
          '<h3 class="gm-h4">Savings Goals</h3>' +
          t.goals.map(function (g, i) { return '<div class="gm-line gm-trow"><div class="gm-lr1">' + fld('Goal', 'goals.' + i + '.n', g.n, { text: 1, ph: 'Family trip', max: 60, cls: 'gm-grow' }) + rm('goals', i, g.n) + '</div><div class="gm-lr2 c3">' + fld('Target', 'goals.' + i + '.target', g.target, { ph: '0' }) + fld('Saved', 'goals.' + i + '.saved', g.saved, { ph: '0' }) + fld('By', 'goals.' + i + '.date', g.date, { text: 1, type: 'date' }) + '</div></div>'; }).join('') +
          '<div class="gm-acts">' + btn('goals', 'add', U.I('plus') + 'Add a Goal', 1) + '</div>';
      },
      out: function (c) {
        var t = c.t, ess = essentials(c.d), m = efMonths(t.ef, ess), aim = r2(ess * n0(t.efm));
        var ef = ess > 0 ? '<div class="gm-tbigs">' + big('Months Covered', String(m), 'of ' + n0(t.efm) + ', at ' + M(ess) + ' a month', m >= n0(t.efm) ? 'ok' : 'hn') + big('Your Aim', M(aim), n0(t.ef) >= aim ? 'Reached. Well tended.' : M(aim - n0(t.ef)) + ' to go') + '</div>' : '<p class="gm-mini">Add your plan’s lines to see months covered.</p>';
        var gs = t.goals.filter(function (g) { return n0(g.target) > 0; }).map(function (g) {
          var done = n0(g.saved) >= n0(g.target), mo = goalMonthly(g.target, g.saved, g.date), pct = Math.min(100, Math.round(n0(g.saved) / n0(g.target) * 100));
          return '<div class="gm-prog"><div class="gm-pt"><b>' + E(g.n || 'Goal') + '</b><span>' + (done ? 'Reached' : g.date ? M(mo) + ' a month' : 'Add a date') + '</span></div><div class="gm-bar thin' + (done ? ' full' : '') + '"><span style="width:' + pct + '%"></span></div></div>';
        }).join('');
        return ef + (gs ? '<div class="gm-card gm-in-card">' + gs + '</div>' : '');
      },
      watch: function (c, before) { var reached = c.t.goals.filter(function (g) { return n0(g.target) > 0 && n0(g.saved) >= n0(g.target); }).map(function (g) { return g.n; }); var was = before || []; var fresh = reached.filter(function (n) { return was.indexOf(n) < 0; }); return { state: reached, msg: fresh.length ? 'You reached ' + (fresh[0] || 'your goal') + '. Well tended.' : '' }; },
      act: function (a, arg, c) { var t = c.t; if (a === 'add') t.goals.push({ n: '', target: '', saved: '', date: '' }); else if (a === 'rm') t.goals.splice(+arg, 1); return true; } },

    { id: 'pay', part: 'ahead', n: 'Paycheck Planner', i: 'cal', sub: 'Which bills each paycheck covers, and your three paycheck months.',
      init: function (t, c) { t.s = t.s || 'b'; t.anchor = t.anchor || U.today(); t.due = t.due && typeof t.due === 'object' ? t.due : {}; if (t.amt == null) t.amt = ''; t.d1 = t.d1 || 1; t.d2 = t.d2 || 15; },
      form: function (c) {
        var t = c.t, ms = U.live(c.d.lines).filter(function (l) { return l.s !== 'hold' && l.s !== 'pretax' && l.f === 'm' && U.monthly(l) > 0; });
        return '<div class="gm-f"><span>I am paid</span>' + chips('pay', 's', t.s, [['w', 'Weekly'], ['b', 'Every Two Weeks'], ['s', 'Twice a Month'], ['m', 'Monthly']]) + '</div>' +
          '<div class="gm-two">' + (t.s === 'w' || t.s === 'b' ? fld('A recent payday', 'anchor', t.anchor, { text: 1, type: 'date' }) : fld(t.s === 's' ? 'First payday of the month' : 'Payday', 'd1', t.d1, { ph: '1' })) + (t.s === 's' ? fld('Second payday', 'd2', t.d2, { ph: '15' }) : fld('Each paycheck', 'amt', t.amt, { ph: String(Math.round(U.totals(c.d).income * 12 / checksPerYear(t.s)) || '') })) + '</div>' +
          (t.s === 's' ? fld('Each paycheck', 'amt', t.amt, { ph: String(Math.round(U.totals(c.d).income * 12 / 24) || '') }) : '') +
          (ms.length ? '<details class="gm-fold"' + (Object.keys(t.due).some(function (k) { return n0(t.due[k]) > 0; }) ? '' : ' open') + '><summary>Due days for your monthly bills</summary><p class="gm-mini">Add the day of the month each bill is due. Until then, it sits on the first paycheck.</p><div class="gm-grid3">' + ms.map(function (l) { return fld(l.n, 'due.' + l.id, t.due[l.id] || '', { ph: '1' }); }).join('') + '</div></details>' : '<p class="gm-mini">Add monthly lines to My Plan to place them on paychecks.</p>');
      },
      out: function (c) {
        var t = c.t, now = new Date(), y = now.getFullYear(), m = now.getMonth(), days = paydays(t.s, t.anchor, y, m, n0(t.d1), n0(t.d2));
        var per = n0(t.amt) || r2(U.totals(c.d).income * 12 / checksPerYear(t.s));
        var bills = U.live(c.d.lines).filter(function (l) { return l.s !== 'hold' && l.s !== 'pretax' && l.f === 'm' && U.monthly(l) > 0; }).map(function (l) { return { n: l.n, amt: U.monthly(l), due: n0(t.due[l.id]) > 0 ? Math.min(dim(y, m), n0(t.due[l.id])) : 0 }; });
        var g = billsByCheck(days, bills), ex = extraMonths(t.s, t.anchor, now);
        var card = function (lbl, x) { return '<div class="gm-check"><div class="gm-pt"><b>' + lbl + '</b><span>' + M(x.total) + ' of ' + M(per) + '</span></div><div class="gm-bar thin' + (x.total > per ? ' over' : '') + '"><span style="width:' + (per ? Math.min(100, Math.round(x.total / per * 100)) : 0) + '%"></span></div>' + (x.bills.length ? '<small>' + x.bills.map(function (b) { return E(b.n); }).join(', ') + '</small>' : '<small>Room for savings and goals.</small>') + '</div>'; };
        return '<h3 class="gm-h4">' + MONTHS[m] + '</h3>' + (g.prev.bills.length ? card('From last month’s last check', g.prev) : '') + g.groups.map(function (x) { return card(MONTHS[m].slice(0, 3) + ' ' + x.day, x); }).join('') +
          (t.s === 'w' || t.s === 'b' ? (ex.length ? '<div class="gm-note">' + U.I('sun') + '<span><b>Extra paycheck months:</b> ' + ex.map(function (x) { return E(x.name); }).join(', ') + '. Send each extra check to a goal: the emergency fund, the first debt in your payoff plan, or your set-aside funds.</span></div>' : '<p class="gm-mini">Your extra paycheck months show here.</p>') : '');
      },
      act: function (a, arg, c) { if (a === 's') c.t.s = arg; return true; } },

    { id: 'fund', part: 'ahead', n: 'Set-Aside Funds', i: 'jar', sub: 'A little each month, so yearly bills arrive ready.',
      init: function (t) { t.bal = t.bal && typeof t.bal === 'object' ? t.bal : {}; },
      form: function (c) {
        var t = c.t, L = U.live(c.d.lines).filter(function (l) { return l.s !== 'hold' && (l.f === 'y' || l.f === 'h' || l.f === 's'); });
        if (!L.length) return '<p class="gm-sub">Lines marked Yearly, Twice a Year, or Spread Monthly in My Plan become set-aside funds here.</p>';
        return '<p class="gm-sub">Each yearly or twice a year line gets its own fund. Add its monthly amount each month, and the bill arrives ready.</p>' +
          L.map(function (l) { return '<div class="gm-line gm-trow"><div class="gm-pt"><b>' + E(l.n) + '</b><span>' + M(U.monthly(l)) + ' a month</span></div>' + fld('In this fund now', 'bal.' + l.id, t.bal[l.id] || '', { ph: '0' }) + '</div>'; }).join('') +
          '<div class="gm-acts">' + btn('fund', 'month', t.last === U.monthKey() ? 'Added for ' + MONTHS[new Date().getMonth()] : 'Add This Month’s Set-Aside', t.last === U.monthKey()) + '</div>';
      },
      out: function (c) {
        var t = c.t, L = U.live(c.d.lines).filter(function (l) { return l.s !== 'hold' && (l.f === 'y' || l.f === 'h' || l.f === 's'); }), tot = 0;
        L.forEach(function (l) { tot += U.monthly(l); });
        return L.length ? '<div class="gm-tbigs">' + big('Set Aside Each Month', M(tot), L.length + ' fund' + (L.length === 1 ? '' : 's'), 'hn') + '</div>' + L.map(function (l) { var s = setAside(l, t.bal[l.id], U.monthly(l)); return '<div class="gm-prog"><div class="gm-pt"><b>' + E(l.n) + '</b><span>' + (s.left ? M(s.left) + ' to go, about ' + s.months + ' month' + (s.months === 1 ? '' : 's') : 'Ready') + '</span></div><div class="gm-bar thin' + (s.left ? '' : ' full') + '"><span style="width:' + s.pct + '%"></span></div></div>'; }).join('') : '';
      },
      act: function (a, arg, c) {
        if (a !== 'month') return false; var t = c.t; if (t.last === U.monthKey()) { c.say('This month’s set-aside is already added.'); return false; }
        U.live(c.d.lines).filter(function (l) { return l.s !== 'hold' && (l.f === 'y' || l.f === 'h' || l.f === 's'); }).forEach(function (l) { t.bal[l.id] = r2(n0(t.bal[l.id]) + U.monthly(l)); });
        t.last = U.monthKey(); c.say('Added. Each fund grew by its monthly amount.'); return true;
      } },

    { id: 'grocery', part: 'live', n: 'Grocery Saver', i: 'plate', start: 1, sub: 'What a meal at home costs, and what a few more save.',
      init: function (t, c) { if (t.week == null) { var g = lineSum(c.d, /grocer|food|costco|aldi|market/i); t.week = g ? Math.round(g * 12 / 52) : ''; } if (t.meals == null) t.meals = 14; if (t.out == null) t.out = 45; if (t.swap == null) t.swap = 2; },
      form: function (c) {
        var t = c.t;
        return '<p class="gm-sub">Count the meals your household eats at home in a week, and what one family meal out costs.</p>' +
          '<div class="gm-two">' + fld('Groceries a week', 'week', t.week, { ph: '200' }) + fld('Meals at home a week', 'meals', t.meals, { ph: '14' }) + '</div>' +
          '<div class="gm-two">' + fld('One family meal out', 'out', t.out, { ph: '45' }) + fld('Meals to cook at home instead, each week', 'swap', t.swap, { ph: '2' }) + '</div>';
      },
      out: function (c) {
        var t = c.t, r = grocerySave(t.week, n0(t.meals), t.out, t.swap);
        return '<div class="gm-tbigs">' + big('A Meal at Home', M(r.home, 1), 'for the whole table') + big('You Keep', M(r.month), 'a month, cooking ' + n0(t.swap) + ' more at home each week', 'ok') + '</div>' +
          '<div class="gm-note">' + U.I('plate') + '<span>Tending’s meal plan gives you a weekly menu of whole, nourishing food with one shopping list, and Sunday Prep makes weeknights quick.</span></div>';
      } },

    { id: 'car', part: 'live', n: 'True Cost of a Car', i: 'car', sub: 'Everything a car costs, by the month and by the mile.',
      init: function (t, c) { if (t.pay == null) { t.pay = Math.round(lineSum(c.d, /car pay|auto ?loan|car loan|vehicle/i)) || ''; t.ins = Math.round(lineSum(c.d, /car ins|auto ins/i)) || ''; t.miles = 1000; t.mpg = 28; t.gas = 3.2; t.upkeep = 900; } },
      form: function (c) {
        var t = c.t;
        return '<div class="gm-two">' + fld('Loan or lease a month', 'pay', t.pay, { ph: '0' }) + fld('Insurance a month', 'ins', t.ins, { ph: '0' }) + '</div>' +
          '<div class="gm-grid3">' + fld('Miles a month', 'miles', t.miles) + fld('Miles per gallon', 'mpg', t.mpg) + fld('Price of gas', 'gas', t.gas) + '</div>' +
          fld('Upkeep a year (oil, tires, repairs, registration)', 'upkeep', t.upkeep);
      },
      out: function (c) { var r = carCost(c.t); return '<div class="gm-tbigs">' + big('A Month', M(r.total), 'fuel ' + M(r.fuel) + ', upkeep ' + M(r.upkeep), 'hn') + big('A Mile', '$' + r.perMile.toFixed(2), 'every mile, all in') + '</div><p class="gm-mini">Walking or biking the short trips keeps miles, and dollars, in your pocket.</p>'; } },

    { id: 'side', part: 'grow', n: 'Side Income Calculator', i: 'sprout', sub: 'Hours or events a month, times your rate.',
      init: function (t) { t.rows = arr(t.rows); if (!t.rows.length) t.rows.push({ n: '', qty: '', rate: '', cost: '' }); if (t.tax == null) t.tax = 25; },
      form: function (c) {
        var t = c.t;
        return '<p class="gm-sub">Ceremonies, lessons, repairs, or seasonal work: list each with how many a month and your rate.</p>' +
          t.rows.map(function (x, i) { return '<div class="gm-line gm-trow"><div class="gm-lr1">' + fld('Work', 'rows.' + i + '.n', x.n, { text: 1, ph: 'Weddings', max: 60, cls: 'gm-grow' }) + rm('side', i, x.n) + '</div><div class="gm-lr2 c3">' + fld('Hours or events a month', 'rows.' + i + '.qty', x.qty, { ph: '2' }) + fld('Rate', 'rows.' + i + '.rate', x.rate, { ph: '300' }) + fld('Costs each', 'rows.' + i + '.cost', x.cost, { ph: '0' }) + '</div></div>'; }).join('') +
          '<div class="gm-acts">' + btn('side', 'add', U.I('plus') + 'Add Work', 1) + '</div>' + fld('Set aside for taxes %', 'tax', t.tax);
      },
      out: function (c) { var r = sideIncome(c.t.rows, c.t.tax); return '<div class="gm-tbigs">' + big('A Month', M(r.gross), 'before taxes') + big('Yours to Keep', M(r.keep), 'after setting aside ' + n0(c.t.tax) + '%', 'ok') + '</div>' + (r.keep > 0 ? '<div class="gm-acts">' + btn('side', 'income', U.I('plus') + 'Add to My Income') + '</div>' : ''); },
      act: function (a, arg, c) {
        var t = c.t; if (a === 'add') t.rows.push({ n: '', qty: '', rate: '', cost: '' }); else if (a === 'rm') t.rows.splice(+arg, 1);
        else if (a === 'income') { var r = sideIncome(t.rows, t.tax), nm = t.rows.filter(function (x) { return x.n; }).map(function (x) { return x.n; }).join(' and ') || 'Side Work'; U.addIncome(c.d, { n: nm, a: r.keep, lo: 0, hi: r.keep }); c.say(nm + ' is in My Income at ' + M(r.keep) + ' a month.'); }
        return true;
      } },

    { id: 'subs', part: 'live', n: 'Subscription Check', i: 'list', start: 1, sub: 'Keep the ones you love; see the year at a glance.',
      init: function (t) { t.list = arr(t.list); },
      form: function (c) {
        var t = c.t, sugg = ['Streaming', 'Music', 'Cloud Storage', 'Apps', 'News', 'Fitness', 'Meal Kits', 'Shopping Club'];
        return '<p class="gm-sub">List each one with its price. Then choose Keep, Pause, or Let Go.</p>' +
          t.list.map(function (s, i) { return '<div class="gm-line gm-trow"><div class="gm-lr1">' + fld('Subscription', 'list.' + i + '.n', s.n, { text: 1, ph: 'Streaming', max: 60, cls: 'gm-grow' }) + rm('subs', i, s.n) + '</div><div class="gm-two">' + fld('Price', 'list.' + i + '.amt', s.amt, { ph: '0' }) + fld('Billed', 'list.' + i + '.f', s.f || 'm', { sel: [['m', 'Monthly'], ['y', 'Yearly']] }) + '</div>' + chips('subs', 'c' + i, s.c || 'keep', [['keep', 'Keep'], ['pause', 'Pause'], ['go', 'Let Go']]) + '</div>'; }).join('') +
          '<div class="gm-chips">' + sugg.map(function (s) { return '<button type="button" class="gm-chip soft" data-gm="tool:subs:add:' + s + '">' + U.I('plus') + E(s) + '</button>'; }).join('') + '</div>';
      },
      out: function (c) { var r = subsTotals(c.t.list); return c.t.list.length ? '<div class="gm-tbigs">' + big('All of Them, a Year', M(r.all)) + big('Back in Your Pocket', M(r.go + r.pause), 'a year, from Pause and Let Go', 'ok') + '</div>' : ''; },
      act: function (a, arg, c) { var t = c.t, m = /^c(\d+)$/.exec(a); if (a === 'add') t.list.push({ n: arg || '', amt: '', f: 'm', c: 'keep' }); else if (a === 'rm') t.list.splice(+arg, 1); else if (m && t.list[+m[1]]) t.list[+m[1]].c = arg; return true; } },

    { id: 'calls', part: 'live', n: 'Call Scripts', i: 'phone', sub: 'Short, calm words for lowering a bill.',
      init: function (t) { t.done = t.done && typeof t.done === 'object' ? t.done : {}; },
      form: function (c) {
        var S = [
          ['phone', 'Phone Plan', /phone|mobile|wireless|cell/i, ['Hi, I’m calling to review my plan. I have been a customer for a while and I’d like to keep my service.', 'Which plans fit the way we use our phones today?', 'Is there a lower rate, a loyalty offer, or a family plan you can apply today?', 'Thank you. Please confirm the new monthly total and the date it starts.']],
          ['net', 'Internet', /internet|wifi|cable|broadband/i, ['Hi, I’m looking at our monthly costs and I’d like to keep my internet with you.', 'What is the best current rate for my speed, or a slightly lower speed that fits our home?', 'Are there promotions for current customers, or a rate if I sign up for autopay?', 'Thank you. Please confirm the new price and how long it lasts.']],
          ['ins', 'Insurance', /insur/i, ['Hi, I’m reviewing our policy and comparing quotes for the same coverage.', 'Which discounts can you add: bundling, safe driving, autopay, or paying in full?', 'What would a higher deductible save each month?', 'Thank you. Please send the updated policy and the new monthly amount.']],
          ['energy', 'Energy, Budget Billing', /energy|electric|power|gas|xcel|utilit|heat/i, ['Hi, I’d like one steady amount each month. Can you set up budget billing on my account?', 'What will the monthly amount be, and when is it reviewed?', 'Do you offer a home energy check or rebates for efficient bulbs and appliances?', 'Thank you. Please confirm when budget billing begins.']]
        ];
        return '<p class="gm-sub">A calm call often lowers a bill. Read each line in your own words, listen, and say thank you. Then put the new amount in your plan.</p>' + S.map(function (s) {
          var L = lines(c.d, s[2])[0], dn = c.t.done[s[0]];
          return '<div class="gm-card gm-script"><div class="gm-pt"><b>' + E(s[1]) + (L ? ' <small>' + E(L.n) + ', ' + M(U.monthly(L)) + ' a month</small>' : '') + '</b></div><ol>' + s[3].map(function (x) { return '<li>' + E(x) + '</li>'; }).join('') + '</ol>' +
            (L ? '<div class="gm-inl">' + fld('New monthly amount', 'newamt.' + s[0], (c.t.newamt || {})[s[0]] || '', { ph: String(Math.round(U.monthly(L))) }) + btn('calls', 'set:' + s[0] + ':' + L.id, 'Update My Plan') + '</div>' : '') + (dn ? '<p class="gm-mini">' + U.I('check') + ' Called ' + E(dn) + '</p>' : '') + '</div>';
        }).join('');
      },
      out: function () { return ''; },
      act: function (a, arg, c) {
        if (a !== 'set') return false; var p = arg.split(':'), L = U.find(c.d.lines, p[1]), v = n0((c.t.newamt || {})[p[0]]);
        if (!L || !(v > 0)) { c.say('Add the new monthly amount first.'); return false; }
        var was = U.monthly(L); U.edit(L, { a: L.f === 'm' ? v : r2(v / ({ m: 1, b: 26 / 12, h: 2 / 12, y: 1 / 12, s: 1 / 12 }[L.f] || 1)) }, c.d); c.t.done[p[0]] = U.niceDate(U.today());
        c.say(was > v ? 'Updated. That call keeps ' + M(was - v) + ' a month with you.' : 'Updated in your plan.'); return true;
      } },

    { id: 'date', part: 'live', n: 'Money Date', i: 'heart', sub: 'Fifteen minutes a week, together, for a calm money plan.',
      init: function (t) { t.w = t.w && typeof t.w === 'object' ? t.w : {}; },
      form: function (c) {
        var wk = U.weekKey(), x = c.t.w[wk] || {}, m = U.month(c.d);
        var P = [['win', 'Celebrate', 'One money win from this week, big or small.'], ['look', 'Look', 'This Month at a glance: ' + m.line + '.'], ['plan', 'Plan', 'The bills ahead this week, and one choice you make together.'], ['dream', 'Dream', 'One thing you are tending toward together.']];
        return '<p class="gm-sub">Money peace is family peace. Sit together for fifteen minutes, warm drink in hand, and walk through four short steps.</p>' +
          P.map(function (p, i) { return '<label class="gm-f gm-prompt"><span><b>' + (i + 1) + '. ' + E(p[1]) + '</b> ' + E(p[2]) + '</span><textarea class="gm-in" rows="2" maxlength="300" data-gt="w.' + wk + '.' + p[0] + '">' + E(x[p[0]] || '') + '</textarea></label>'; }).join('') +
          '<div class="gm-acts">' + btn('date', 'done', x.at ? 'Saved for This Week' : 'We Had Our Money Date', !!x.at) + '</div>';
      },
      out: function (c) { var ks = Object.keys(c.t.w).filter(function (k) { return c.t.w[k].at && k !== U.weekKey(); }).sort().reverse(); return ks.length ? '<p class="gm-mini">Your last Money Date: the week of ' + E(U.niceDate(ks[0])) + '.</p>' : ''; },
      act: function (a, arg, c) { if (a !== 'done') return false; var wk = U.weekKey(); c.t.w[wk] = Object.assign({}, c.t.w[wk], { at: Date.now() }); c.celebrate('A good Money Date. You grow stronger together.'); return true; } },

    { id: 'give', part: 'give', n: 'Giving Planner', i: 'gift', sub: 'Your giving goal, by percent or amount, and where it goes.',
      init: function (t) { t.mode = t.mode || 'pct'; if (t.pct == null) t.pct = 10; if (t.amt == null) t.amt = ''; t.places = arr(t.places); if (!t.places.length) t.places.push({ n: '', amt: '' }); },
      form: function (c) {
        var t = c.t;
        return '<div class="gm-f"><span>I give</span>' + chips('give', 'mode', t.mode, [['pct', 'A Percent of Income'], ['amt', 'A Set Amount']]) + '</div>' +
          (t.mode === 'pct' ? fld('Percent of income', 'pct', t.pct) : fld('Amount a month', 'amt', t.amt, { ph: '100' })) +
          '<h3 class="gm-h4">Where It Goes</h3>' + t.places.map(function (p, i) { return '<div class="gm-lr1">' + fld('Place', 'places.' + i + '.n', p.n, { text: 1, ph: 'Our community', max: 60, cls: 'gm-grow' }) + fld('Amount', 'places.' + i + '.amt', p.amt, { ph: '0', cls: 'gm-w110' }) + rm('give', i, p.n) + '</div>'; }).join('') +
          '<div class="gm-acts">' + btn('give', 'add', U.I('plus') + 'Add a Place', 1) + '</div>';
      },
      out: function (c) {
        var t = c.t, tot = givingTotal(t.mode, t.pct, t.amt, U.totals(c.d).income), placed = t.places.reduce(function (s, p) { return s + n0(p.amt); }, 0), gl = lines(c.d, /giv|donat|tith|church|charit/i)[0];
        return '<div class="gm-tbigs">' + big('Giving a Month', M(tot), M(tot * 12) + ' a year', 'ok') + big('Still to Place', M(Math.max(0, tot - placed))) + '</div>' + (tot > 0 ? '<div class="gm-acts">' + btn('give', 'plan', gl ? 'Set ' + E(gl.n) + ' to ' + M(tot) : 'Add Giving to My Plan') + '</div>' : '');
      },
      act: function (a, arg, c) {
        var t = c.t; if (a === 'mode') t.mode = arg === 'amt' ? 'amt' : 'pct'; else if (a === 'add') t.places.push({ n: '', amt: '' }); else if (a === 'rm') t.places.splice(+arg, 1);
        else if (a === 'plan') { var tot = givingTotal(t.mode, t.pct, t.amt, U.totals(c.d).income), gl = lines(c.d, /giv|donat|tith|church|charit/i)[0]; if (gl) U.edit(gl, { a: tot, f: 'm' }, c.d); else U.addLine(c.d, { n: 'Giving', a: tot, s: 'fixed' }); c.say('Giving is in your plan at ' + M(tot) + ' a month.'); }
        return true;
      } },

    { id: 'kids', part: 'live', n: 'Allowance Helper', i: 'people', sub: 'Save, give, and spend jars, sized by age.',
      init: function (t) { t.kids = arr(t.kids); if (!t.kids.length) t.kids.push({ n: '', age: '' }); t.jars = t.jars || { save: 40, give: 10, spend: 50 }; },
      form: function (c) {
        var t = c.t;
        return '<p class="gm-sub">A common family guide: about a dollar a week for each year of age, split into three jars. Change any number to fit your home.</p>' +
          t.kids.map(function (k, i) { return '<div class="gm-lr1">' + fld('Child', 'kids.' + i + '.n', k.n, { text: 1, ph: 'First name', max: 30, cls: 'gm-grow' }) + fld('Age', 'kids.' + i + '.age', k.age, { ph: '8', cls: 'gm-w80' }) + rm('kids', i, k.n) + '</div>'; }).join('') +
          '<div class="gm-acts">' + btn('kids', 'add', U.I('plus') + 'Add a Child', 1) + '</div>' +
          '<div class="gm-grid3">' + fld('Save jar %', 'jars.save', t.jars.save) + fld('Give jar %', 'jars.give', t.jars.give) + fld('Spend jar %', 'jars.spend', t.jars.spend) + '</div>';
      },
      out: function (c) {
        var t = c.t, tot = 0, rows = t.kids.filter(function (k) { return n0(k.age) > 0; }).map(function (k) { var a = allowance(k.age, t.jars); tot += a.month; return '<div class="gm-check"><div class="gm-pt"><b>' + E(k.n || 'Age ' + n0(k.age)) + '</b><span>' + M(a.week, 1) + ' a week</span></div><div class="gm-jars"><span>Save ' + M(a.save, 1) + '</span><span>Give ' + M(a.give, 1) + '</span><span>Spend ' + M(a.spend, 1) + '</span></div></div>'; }).join('');
        return rows ? rows + '<div class="gm-tbigs">' + big('All Allowances', M(tot), 'a month') + '</div><div class="gm-acts">' + btn('kids', 'plan', 'Add to My Plan') + '</div>' : '';
      },
      act: function (a, arg, c) {
        var t = c.t; if (a === 'add') t.kids.push({ n: '', age: '' }); else if (a === 'rm') t.kids.splice(+arg, 1);
        else if (a === 'plan') { var tot = r2(t.kids.reduce(function (s, k) { return s + allowance(k.age, t.jars).month; }, 0)), al = lines(c.d, /allowance/i)[0]; if (al) U.edit(al, { a: tot, f: 'm' }, c.d); else U.addLine(c.d, { n: 'Allowances', a: tot, s: 'fixed' }); c.say('Allowances are in your plan at ' + M(tot) + ' a month.'); }
        return true;
      } },

    { id: 'tips', part: 'live', n: 'Grounded Money Tips', i: 'leaf', start: 1, sub: TIPS.length + ' short ways to save and earn, a new one each week.',
      init: function (t) { t.keep = t.keep && typeof t.keep === 'object' ? t.keep : {}; t.cat = t.cat || 'All'; },
      form: function (c) {
        var t = c.t, cats = ['All'].concat(TIPS.map(function (x) { return x[0]; }).filter(function (x, i, a) { return a.indexOf(x) === i; })), wk = tipOfWeek();
        return '<div class="gm-card gm-tipwk"><span class="gm-k">This Week’s Tip</span><p>' + E(TIPS[wk][1]) + '</p></div>' + chips('tips', 'cat', t.cat, cats.map(function (x) { return [x, x]; })) +
          '<ul class="gm-tips">' + TIPS.map(function (x, i) { if (t.cat !== 'All' && x[0] !== t.cat) return ''; var on = !!t.keep[i]; return '<li><span class="gm-pill soft">' + E(x[0]) + '</span><p>' + E(x[1]) + '</p><button type="button" class="gm-linkbtn" data-gm="tool:tips:keep:' + i + '" aria-pressed="' + on + '">' + (on ? 'Trying This' : 'Try This') + '</button></li>'; }).join('') + '</ul>';
      },
      out: function () { return ''; },
      act: function (a, arg, c) { var t = c.t; if (a === 'cat') t.cat = arg; else if (a === 'keep') { if (t.keep[arg]) delete t.keep[arg]; else t.keep[arg] = 1; } return true; } },

    /* ---------- BLD 939: new tools for Give, Protect, Grow, and Plan ---------- */
    { id: 'givelog', part: 'give', n: 'Giving Tracker', i: 'heart', sub: 'What you gave, and to whom, beside your giving goal.',
      init: function (t) { t.list = arr(t.list); t.draft = t.draft && typeof t.draft === 'object' ? t.draft : {}; if (!t.draft.d) t.draft.d = U.today(); },
      form: function (c) {
        var t = c.t, g = giveGoal(c.d), yr = String(new Date().getFullYear());
        var rows = t.list.map(function (x, i) { return { x: x, i: i }; }).filter(function (r) { return String(r.x.d || '').slice(0, 4) === yr; }).sort(function (a, b) { return a.x.d < b.x.d ? 1 : a.x.d > b.x.d ? -1 : b.i - a.i; });
        return '<p class="gm-sub">Each gift to the causes and people you care about, in one place. Your running total grows beside your goal.</p>' +
          (g > 0 ? '' : '<div class="gm-note">' + U.I('gift') + '<span>Set your giving goal in the Giving Planner, and this tracker shows how close you are each month. <button type="button" class="gm-linkbtn" data-gm="go:tool:give">Giving Planner' + U.I('arrow') + '</button></span></div>') +
          '<div class="gm-line gm-trow"><div class="gm-lr2 c3">' + fld('Amount', 'draft.a', t.draft.a, { ph: '25' }) + fld('To', 'draft.n', t.draft.n, { text: 1, ph: 'A neighbor in need', max: 60 }) + fld('Day', 'draft.d', t.draft.d, { text: 1, type: 'date' }) + '</div>' +
          '<div class="gm-acts">' + btn('givelog', 'add', U.I('plus') + 'Add This Gift') + '</div></div>' +
          (rows.length ? '<h3 class="gm-h4">Given in ' + yr + '</h3><div class="gm-card gm-loglist">' + rows.slice(0, 40).map(function (r) { var x = r.x; return '<div class="gm-lg"><span class="gm-ld">' + E(U.niceDate(x.d)) + '</span><b>' + E(x.n || 'A gift') + '</b><span class="gm-la">' + M(x.a, 1) + '</span>' + rm('givelog', r.i, x.n || 'this gift') + '</div>'; }).join('') + '</div>' : '<p class="gm-mini">Your first gift shows here.</p>');
      },
      out: function (c) {
        var r = givenSums(c.t.list), g = giveGoal(c.d), mn = MONTHS[new Date().getMonth()];
        var pm = g > 0 ? Math.min(100, Math.round(r.month / g * 100)) : 0, py = g > 0 ? Math.min(100, Math.round(r.year / (g * 12) * 100)) : 0;
        return '<div class="gm-tbigs">' + big('Given in ' + mn, M(r.month, 1), g > 0 ? 'of your ' + M(g) + ' goal' : 'this month', r.month >= g && g > 0 ? 'ok' : 'hn') + big('Given This Year', M(r.year, 1), g > 0 ? 'of ' + M(g * 12) + ' for the year' : 'so far') + '</div>' +
          (g > 0 ? '<div class="gm-prog"><div class="gm-pt"><b>' + E(mn) + '</b><span>' + pm + '%</span></div><div class="gm-bar thin' + (pm >= 100 ? ' full' : '') + '"><span style="width:' + pm + '%"></span></div></div><div class="gm-prog"><div class="gm-pt"><b>The Year</b><span>' + py + '%</span></div><div class="gm-bar thin' + (py >= 100 ? ' full' : '') + '"><span style="width:' + py + '%"></span></div></div>' : '');
      },
      act: function (a, arg, c) {
        var t = c.t;
        if (a === 'rm') { t.list.splice(+arg, 1); return true; }
        if (a !== 'add') return false;
        var amt = n0(t.draft.a); if (!(amt > 0)) { c.say('Add the amount first.'); return false; }
        t.list.push({ d: t.draft.d || U.today(), n: String(t.draft.n || '').trim(), a: r2(amt) }); t.draft = { d: t.draft.d };
        var r = givenSums(t.list), g = giveGoal(c.d);
        if (g > 0 && r.month >= g && r.month - amt < g) c.celebrate('Your giving goal for the month is reached. Generous and well done.'); else c.say('Added. Thank you for giving.');
        return true;
      } },

    { id: 'insure', part: 'protect', n: 'Insurance Overview', i: 'umbrella', sub: 'Each kind of coverage at a glance: in place, or time to review.',
      init: function (t) { t.k = t.k && typeof t.k === 'object' ? t.k : {}; t.o = t.o && typeof t.o === 'object' ? t.o : {}; },
      form: function (c) {
        var t = c.t;
        return '<p class="gm-sub">Go down the list once a year. Mark each one you have, and each one to look into. A note can hold the renewal month or the company.</p>' +
          INSURE.map(function (k) { return '<div class="gm-line gm-trow gm-ins" data-k="' + k[0] + '"><div class="gm-pt"><b>' + E(k[1]) + '</b></div><p class="gm-mini">' + E(k[2]) + '</p>' + chips('insure', 'k:' + k[0], t.k[k[0]] || '', [['have', 'I Have It'], ['review', 'Review It'], ['na', 'Leave Off']]) + fld('Note', 'o.' + k[0], t.o[k[0]] || '', { text: 1, ph: 'Renews in March', max: 80 }) + '</div>'; }).join('') +
          '<p class="gm-mini">Comparing quotes for the same coverage once a year often lowers the price. Call Scripts has calm words for that call.</p>';
      },
      out: function (c) {
        var r = insureSums(c.t);
        return '<div class="gm-tbigs">' + big('In Place', r.have + ' of ' + r.total, r.total ? 'kinds that fit your home' : '', r.have === r.total && r.total ? 'ok' : 'hn') + big('To Review', String(r.review), r.next ? 'Next: ' + E(r.next) : 'All set for now') + '</div>';
      },
      act: function (a, arg, c) { if (a !== 'k') return false; var q = String(arg).split(':'), k = q[0], v = q[1]; if (!/^(have|review|na)$/.test(v)) return false; if (c.t.k[k] === v) delete c.t.k[k]; else c.t.k[k] = v; return true; } },

    { id: 'blind', part: 'protect', n: 'Blind Spot Check', i: 'eye', outFirst: 1, sub: 'The often missed pieces of a steady plan, one by one.',
      init: function (t) { t.done = t.done && typeof t.done === 'object' ? t.done : {}; t.na = t.na && typeof t.na === 'object' ? t.na : {}; },
      form: function (c) {
        var t = c.t;
        return '<p class="gm-sub">A short list of what steady households have in place. Tap the box beside each one you have, and the next step shows the way for the rest.</p>' +
          '<div class="gm-blinds">' + BLIND.map(function (b) {
            var on = !!t.done[b[0]], na = !!t.na[b[0]];
            return '<div class="gm-blind' + (on ? ' on' : '') + (na ? ' na' : '') + '" data-k="' + b[0] + '"><button type="button" class="gm-tick" data-gm="tool:blind:done:' + b[0] + '" aria-pressed="' + on + '" aria-label="' + E((on ? 'Covered: ' : 'Mark covered: ') + b[1]) + '">' + U.I('check') + '</button>' +
              '<div class="gm-tx"><b>' + E(b[1]) + '</b><small>' + E(b[2]) + '</small>' + (on ? '' : '<small class="gm-step">' + U.I('arrow') + E(b[3]) + '</small>') +
              '<button type="button" class="gm-linkbtn" data-gm="tool:blind:na:' + b[0] + '" aria-pressed="' + na + '">' + (na ? 'Add Back to My List' : 'Leave Off My List') + '</button></div></div>';
          }).join('') + '</div>';
      },
      out: function (c) {
        var r = blindSums(c.t);
        return '<div class="gm-tbigs"><div class="gm-tbig ' + (r.left ? 'hn' : 'ok') + ' gm-ringbox">' + ring(r.pct) + '<span><span class="gm-k">Covered</span><b>' + r.done + ' of ' + r.total + '</b></span></div>' +
          big('Your Next Step', r.next ? E(r.next[1]) : 'No blind spots', r.next ? E(r.next[3]) : 'Look again once a year, and after each big life change.', r.next ? '' : 'ok') + '</div>';
      },
      watch: function (c, before) { var r = blindSums(c.t), all = r.total > 0 && !r.left; return { state: all, msg: all && before === false ? 'No blind spots. Your plan stands on steady ground.' : '' }; },
      act: function (a, arg, c) { var t = c.t; if (a === 'done') { if (t.done[arg]) delete t.done[arg]; else { t.done[arg] = Date.now(); delete t.na[arg]; } return true; } if (a === 'na') { if (t.na[arg]) delete t.na[arg]; else { t.na[arg] = 1; delete t.done[arg]; } return true; } return false; } },

    { id: 'grow', part: 'grow', n: 'Growth Calculator', i: 'chart', sub: 'How steady saving grows over time, and by a chosen age.',
      init: function (t, c) { t.c = t.c && typeof t.c === 'object' ? t.c : {}; t.r = t.r && typeof t.r === 'object' ? t.r : {}; var tc = t.c, tr = t.r;
        if (tc.start == null) tc.start = ''; if (tc.monthly == null) tc.monthly = ''; if (tc.rate == null) tc.rate = 6; if (tc.years == null) tc.years = 20;
        if (tr.age == null) tr.age = ''; if (tr.at == null) tr.at = 65; if (tr.saved == null) tr.saved = ''; if (tr.monthly == null) tr.monthly = ''; if (tr.rate == null) tr.rate = 6; },
      form: function (c) {
        var t = c.t;
        return '<h3 class="gm-h4">Compound Growth</h3><p class="gm-sub">Money set aside each month earns growth, and that growth earns more. Time does much of the work.</p>' +
          '<div class="gm-two">' + fld('Starting amount', 'c.start', t.c.start, { ph: '0' }) + fld('Added each month', 'c.monthly', t.c.monthly, { ph: '200' }) + '</div>' +
          '<div class="gm-two">' + fld('Yearly growth %', 'c.rate', t.c.rate, { ph: '6' }) + fld('Years', 'c.years', t.c.years, { ph: '20' }) + '</div>' +
          '<div class="gm-tlive" data-gm-live aria-live="polite">' + compoundOut(t.c) + '</div>' +
          '<h3 class="gm-h4">By a Chosen Age</h3><p class="gm-sub">What a monthly amount grows to by the age you choose, for retirement or any season ahead.</p>' +
          '<div class="gm-grid3">' + fld('My age now', 'r.age', t.r.age, { ph: '35' }) + fld('By age', 'r.at', t.r.at, { ph: '65' }) + fld('Saved now', 'r.saved', t.r.saved, { ph: '0' }) + '</div>' +
          '<div class="gm-two">' + fld('Added each month', 'r.monthly', t.r.monthly, { ph: '300' }) + fld('Yearly growth %', 'r.rate', t.r.rate, { ph: '6' }) + '</div>' +
          '<p class="gm-mini">Markets rise and fall from year to year, so try a few rates to see a range. For your own plan, a licensed financial planner can help.</p>';
      },
      out: function (c) {
        var r = c.t.r, yrs = n0(r.at) - n0(r.age);
        if (!(n0(r.age) > 0) || !(yrs > 0)) return '<p class="gm-mini">Add your age and the age you choose to see what your monthly amount grows to.</p>';
        var f = fv(r.saved, r.monthly, r.rate, yrs), put = n0(r.saved) + n0(r.monthly) * 12 * yrs;
        return '<div class="gm-tbigs">' + big('By Age ' + n0(r.at), M(f), 'in ' + yrs + ' year' + (yrs === 1 ? '' : 's'), 'ok') + big('You Put In', M(put), 'growth adds ' + M(Math.max(0, f - put)), 'hn') + '</div>';
      },
      live: function (c) { return compoundOut(c.t.c); },
      act: function () { return false; } },

    { id: 'year', part: 'ahead', n: 'Year Plan', i: 'map', sub: 'Big dates, yearly bills, and goals, season by season.',
      init: function (t) { t.items = arr(t.items); t.lm = t.lm && typeof t.lm === 'object' ? t.lm : {}; t.draft = t.draft && typeof t.draft === 'object' ? t.draft : {}; if (t.draft.m == null) t.draft.m = new Date().getMonth(); t.draft.k = t.draft.k || 'date'; },
      form: function (c) {
        var t = c.t, Y = yearlyLines(c.d), mo = [['', 'Choose a month']].concat(MONTHS.map(function (m, i) { return [i, m]; }));
        return '<p class="gm-sub">The whole year on one page: birthdays and holidays, yearly bills, and the goals you are saving toward. Nothing big arrives as a surprise.</p>' +
          (Y.length ? '<details class="gm-fold" open><summary>Yearly bills from My Plan</summary><p class="gm-mini">Choose the month each one is due.</p><div class="gm-grid3">' + Y.map(function (l) { return fld(l.n + ' (' + M(l.a) + ')', 'lm.' + l.id, t.lm[l.id] == null ? '' : t.lm[l.id], { sel: mo }); }).join('') + '</div></details>' : '') +
          '<h3 class="gm-h4">Add to the Year</h3><div class="gm-line gm-trow">' + chips('year', 'k', t.draft.k, [['date', 'Big Date'], ['bill', 'Bill'], ['goal', 'Goal']]) +
          '<div class="gm-lr2 c3">' + fld('What', 'draft.n', t.draft.n, { text: 1, ph: 'Family birthday', max: 60 }) + fld('Month', 'draft.m', t.draft.m, { sel: MONTHS.map(function (m, i) { return [i, m]; }) }) + fld('Amount', 'draft.a', t.draft.a, { ph: '0' }) + '</div>' +
          '<div class="gm-acts">' + btn('year', 'add', U.I('plus') + 'Add to My Year') + '</div></div>' +
          (t.items.length ? '<ul class="gm-tips">' + t.items.map(function (x, i) { return '<li class="gm-yi"><div class="gm-pt"><b>' + E(x.n || KIND[x.k]) + '</b><span>' + E(MONTHS[x.m] || '') + (n0(x.a) ? ', ' + M(x.a) : '') + '</span></div><div class="gm-tr"><span class="gm-pill soft">' + E(KIND[x.k] || 'Big Date') + '</span>' + rm('year', i, x.n) + '</div></li>'; }).join('') + '</ul>' : '');
      },
      out: function (c) {
        var S = seasons(c), tot = S.reduce(function (s, x) { return s + x.total; }, 0);
        return '<div class="gm-seasons">' + S.map(function (x) {
          return '<div class="gm-season gm-s-' + x.id + '"><div class="gm-pt"><b>' + E(x.n) + '</b><span>' + (x.total ? M(x.total) : '') + '</span></div>' + (x.rows.length ? '<ul>' + x.rows.map(function (r) { return '<li><span class="gm-mo">' + E(MONTHS[r.m].slice(0, 3)) + '</span><span>' + E(r.n) + '</span>' + (r.a ? '<b>' + M(r.a) + '</b>' : '<b></b>') + '</li>'; }).join('') + '</ul>' : '<p class="gm-mini">A calm season so far.</p>') + '</div>';
        }).join('') + '</div>' + (tot ? '<p class="gm-mini">The year holds ' + M(tot) + ' in bills and goals: about ' + M(tot / 12) + ' a month, set aside steadily, keeps each season calm.</p>' : '');
      },
      act: function (a, arg, c) {
        var t = c.t;
        if (a === 'k') { t.draft.k = /^(date|bill|goal)$/.test(arg) ? arg : 'date'; return true; }
        if (a === 'rm') { t.items.splice(+arg, 1); return true; }
        if (a !== 'add') return false;
        var n = String(t.draft.n || '').trim(); if (!n) { c.say('Name it first.'); return false; }
        t.items.push({ n: n, m: Math.max(0, Math.min(11, Math.round(n0(t.draft.m)))), a: r2(n0(t.draft.a)), k: t.draft.k || 'date' }); t.draft = { m: t.draft.m, k: t.draft.k };
        c.say('Added to your year.'); return true;
      } },

    /* ---------- BLD 940: Grounded Money Standards and the Windfall Planner ---------- */
    { id: 'std', part: 'ahead', n: 'Grounded Money Standards', i: 'star', outFirst: 1, sub: 'Your plan beside suggested shares of take-home pay, sized for your household.',
      init: function (t, c) {
        t.areas = t.areas && typeof t.areas === 'object' ? t.areas : {}; t.trims = t.trims && typeof t.trims === 'object' ? t.trims : {}; t.celebrated = t.celebrated && typeof t.celebrated === 'object' ? t.celebrated : {};
        if (t.size == null) { var kd = c.d.tools && c.d.tools.kids; t.size = 2 + arr(kd && kd.kids).filter(function (k) { return n0(k.age) > 0; }).length; }
        if (t.pretax == null) t.pretax = pretaxSum(c.d) || ''; t.pretaxF = t.pretaxF === 'p' ? 'p' : 'm';
        if (!U.live(c.d.lines).length) return;
        // A warm moment for each step met (and for reaching Growing Season), once each; a step that slips can be celebrated again.
        var se = seasonOf(c.d, t), fresh = [];
        STEPS.forEach(function (s) { if (se.met[s[0]]) { if (!t.celebrated[s[0]]) { t.celebrated[s[0]] = Date.now(); if (se.building) fresh.push(s[4]); } } else delete t.celebrated[s[0]]; });
        if (!se.building) { if (!t.celebrated.grow) { t.celebrated.grow = Date.now(); fresh.unshift('Growing Season. Your plan has room to grow.'); } } else delete t.celebrated.grow;
        if (fresh.length) { c.celebrate(fresh[0]); c.save(); }
      },
      out: function (c) {
        var t = c.t, d = c.d;
        if (!U.live(d.lines).length) return '<div class="gm-note">' + U.I('list') + '<span>Add your plan’s lines in My Plan, and the standards show beside them. <button type="button" class="gm-linkbtn" data-gm="go:plan">My Plan' + U.I('arrow') + '</button></span></div>';
        var v = stdView(d, t), se = v.season, inc = v.income;
        var head = se.building
          ? '<div class="gm-seasoncard b" data-season="building"><span class="gm-k">Building Season</span><h3 class="gm-h3">Building Season: every step here is a win.</h3><p class="gm-sub">' + (se.short ? 'The month runs ' + M(se.short) + ' short' + (se.cards ? ' and cards carry a balance' : '') : 'Cards carry a balance') + '. Five steps lead the way: ' + se.done + ' of 5 done.</p>' + stepsHtml(se.met) +
            '<p class="gm-mini">A tax return, a bonus, or a gift? <button type="button" class="gm-linkbtn" data-gm="go:tool:windfall">Windfall Planner' + U.I('arrow') + '</button></p></div>'
          : '<div class="gm-seasoncard g" data-season="growing"><span class="gm-k">Growing Season</span><h3 class="gm-h3">Growing Season: your plan has room to grow.</h3><p class="gm-sub">Your month is in balance and the cards are clear. The full standards guide each area below.</p></div>';
        var G = GOALS.filter(function (g) { return g[0] === v.goal; })[0];
        var goal = '<div class="gm-stdgoal"><h3 class="gm-h4">Your Top Goal</h3>' + chips('std', 'goal', v.goal, GOALS.map(function (g) { return [g[0], g[1]]; })) + '<p class="gm-mini" data-goal-line>' + E(G[2]) + '</p></div>';
        if (!(inc > 0)) return head + goal + '<div class="gm-note">' + U.I('coin') + '<span>Add your take-home pay in My Plan, and each area shows its share. <button type="button" class="gm-linkbtn" data-gm="go:plan">My Plan' + U.I('arrow') + '</button></span></div>';
        var rows = '<h3 class="gm-h4">Side by Side</h3><p class="gm-mini">Shares of your take-home pay of ' + M(inc) + ' a month, for a household of ' + v.size + '.</p><div class="gm-stds">' + v.rows.map(function (r) { return stdRow(r, inc); }).join('') + '</div>' +
          '<p class="gm-mini" data-food-ref>Food for a household of ' + v.size + ': about ' + M(v.food) + ' a month on the USDA Moderate-Cost plan (approximate, ' + FOOD_AS_OF + '). Within it, a bigger share for food is fair for your family size.</p>' +
          (v.dti > 0 ? '<p class="gm-mini" data-dti>Debt payments, the home included: ' + v.dti + '% of take-home. Lenders often look for 36% or less of pay before taxes, so their number for you reads a little lower.</p>' : '');
        var nx = v.next.slice(0, 4).map(function (r) {
          var flex = r.lines.filter(function (l) { return !l.fixed; });
          if (r.k === 'grow') return '<li data-next="' + r.id + '"><b>' + E(r.n) + '</b><span>About ' + M(Math.max(0, r.loAmt - r.amt)) + ' more a month reaches ' + r.lo + '%.' + (r.id === 'save' ? ' Pretax saving counts here, and any employer match comes first.' : ' Any amount is a good start.') + '</span></li>';
          return '<li data-next="' + r.id + '"><b>' + E(r.n) + '</b><span>About ' + M(r.over) + ' a month above the range. ' + (flex.length ? 'Lines with room: ' + E(flex.map(function (l) { return l.n; }).join(', ')) + '.' : 'Every line here is fixed for now; the rest of the plan grows around it.') + '</span></li>';
        }).join('');
        var next = '<h3 class="gm-h4">Next Steps for Your Goal</h3>' + (nx ? '<ol class="gm-stdnext">' + nx + '</ol>' : '<p class="gm-note">' + U.I('sun') + 'Every area sits within its range. Well tended.</p>') +
          (se.cards ? '<div class="gm-note" data-nfcc>' + U.I('leaf') + '<span>' + E(TIPS[NFCC_TIP][1]) + '</span></div>' : '');
        var w = v.need, w2 = v.needTrim;
        var take = '<div class="gm-card gm-in-card gm-wit" data-wit="' + w + '"><h3 class="gm-h4">What It Would Take</h3><p class="gm-mini">The take-home pay that meets the standards for giving and saving, with spending as it is.</p><div class="gm-tbigs">' +
          big('With Spending as It Is', M(w), 'take-home a month', w <= inc ? 'ok' : 'hn') + (v.trims > 0 ? big('With Your Trims', M(w2), M(v.trims) + ' a month trimmed', w2 <= inc ? 'ok' : 'hn') : '') + '</div>' +
          '<p class="gm-sub" data-wit-line>' + (w <= inc ? 'Your take-home of ' + M(inc) + ' already meets the standards with spending as it is.' : 'About ' + M(w - inc) + ' more take-home a month meets the standards with spending as it is.' + (v.trims > 0 ? (w2 <= inc ? ' Your trims bring it within reach today.' : ' With your trims, about ' + M(w2 - inc) + ' more.') : ' Trims below bring it closer.')) + '</p></div>';
        return head + goal + rows + next + take;
      },
      form: function (c) {
        var t = c.t, d = c.d; if (!U.live(d.lines).length) return '';
        var v = stdView(d, t), opts = AREAS.map(function (a) { return [a[0], a[1]]; });
        var trims = v.rows.filter(function (r) { return r.lo != null && r.id !== 'give' && r.id !== 'save' && r.flex > 0; });
        return '<h3 class="gm-h4">Your Household and Pretax Saving</h3><div class="gm-grid3">' + fld('People in your household', 'size', t.size, { ph: '2' }) + fld('Pretax saving', 'pretax', t.pretax, { ph: '0' }) + fld('Entered', 'pretaxF', t.pretaxF, { sel: [['m', 'A Month'], ['p', 'A Paycheck']], re: 1 }) + '</div>' +
          '<p class="gm-mini">Money set aside before pay counts as saving: a workplace retirement plan with the employer’s part, and an HSA. Lines marked Before Taxes in My Plan stay out of the areas.</p>' +
          (trims.length ? '<h3 class="gm-h4">Your Own Trims</h3><p class="gm-mini">Trims come from lines that vary; fixed lines stay as they are.</p><div class="gm-grid3">' + trims.map(function (r) { return fld(r.n + ' (up to ' + M(r.flex) + ')', 'trims.' + r.id, t.trims[r.id] == null ? '' : t.trims[r.id], { ph: r.suggest ? String(r.suggest) : '0' }); }).join('') + '</div>' : '') +
          '<details class="gm-fold gm-stdmap"><summary>Your Lines and Their Areas</summary><p class="gm-mini">Each line finds its area by its name. Choose another area for any line.</p><div class="gm-grid3">' +
          stdLines(d, t).map(function (l) { return fld(l.n + ' (' + M(l.amt) + ')' + (l.fixed ? ', Fixed' : ''), 'areas.' + l.id, l.area, { sel: opts, re: 1 }); }).join('') + '</div></details>' +
          '<p class="gm-mini">These are suggested ranges, a calm guide for your own choices. For your own plan, a licensed financial planner can help.</p>' + stdSources();
      },
      act: function (a, arg, c) { if (a === 'goal' && GOAL_SHIFT[arg]) { c.t.goal = arg; return true; } return false; } },

    { id: 'windfall', part: 'ahead', n: 'Windfall Planner', i: 'sun', sub: 'A tax return, a bonus, or a gift, given a plan in one calm order.',
      init: function (t) { if (t.amt == null) t.amt = ''; t.kind = t.kind || 'tax'; t.give = [0, 5, 10].indexOf(+t.give) >= 0 ? +t.give : 0; t.cards = arr(t.cards); t.past = arr(t.past); },
      form: function (c) {
        var t = c.t, dc = cardsOf(c.d), ef = n0(c.d.tools && c.d.tools.goals && c.d.tools.goals.ef);
        return '<p class="gm-sub">Money that arrives all at once goes furthest with a plan. Enter the amount, and each dollar finds its place in order.</p>' +
          fld('Amount', 'amt', t.amt, { ph: '2000' }) +
          '<div class="gm-f"><span>It is</span>' + chips('windfall', 'kind', t.kind, [['tax', 'A Tax Return'], ['bonus', 'A Bonus'], ['gift', 'A Gift'], ['other', 'Something Else']]) + '</div>' +
          '<div class="gm-f"><span>Give a share first</span>' + chips('windfall', 'give', t.give, [[0, 'Not This Time'], [5, '5%'], [10, '10%']]) + '</div>' +
          '<p class="gm-mini">Emergency fund now: ' + M(ef) + ' (from Emergency Fund and Savings Goals).</p>' +
          (dc.length ? '<p class="gm-mini" data-cards="planner">Cards from your Debt Payoff Planner: ' + E(dc.map(function (x) { return x.n + ' ' + M(x.bal) + ' at ' + x.rate + '%'; }).join(', ')) + '.</p>'
            : '<h3 class="gm-h4">Cards With a Balance</h3>' + t.cards.map(function (x, i) { return '<div class="gm-line gm-trow"><div class="gm-lr1">' + fld('Card', 'cards.' + i + '.n', x.n, { text: 1, ph: 'Store card', max: 60, cls: 'gm-grow' }) + rm('windfall', i, x.n) + '</div><div class="gm-two">' + fld('Balance', 'cards.' + i + '.bal', x.bal, { ph: '0' }) + fld('Rate %', 'cards.' + i + '.rate', x.rate, { ph: '22' }) + '</div></div>'; }).join('') +
              '<div class="gm-acts">' + btn('windfall', 'add', U.I('plus') + 'Add a Card', 1) + '</div>');
      },
      out: function (c) {
        var t = c.t, d = c.d; if (!(n0(t.amt) > 0)) return '<p class="gm-mini">Add the amount to see where it goes.</p>';
        var dc = cardsOf(d), cards = dc.length ? dc : arr(t.cards).filter(function (x) { return n0(x.bal) > 0; }).map(function (x) { return { n: x.n || 'Card', bal: n0(x.bal), rate: n0(x.rate) }; });
        var sp = windfallSplit({ amt: t.amt, give: t.give, ef: n0(d.tools && d.tools.goals && d.tools.goals.ef), cards: cards, goals: goalsLeft(d) });
        var KN = { give: 'Generosity first', ef: 'Up to $1,000, a first cushion', card: 'Highest rate first', goal: 'Your goals, soonest first', rest: 'Enjoy some, and grow the rest' };
        return '<h3 class="gm-h4">Where It Goes</h3><ol class="gm-wsplit">' + sp.rows.map(function (r) { return '<li class="w-' + r.k + '" data-wk="' + r.k + '"><div class="gm-pt"><b>' + E(r.n) + '</b><span>' + M(r.a, 1) + '</span></div><small>' + E(KN[r.k]) + '</small>' + '<div class="gm-bar thin"><span style="width:' + Math.round(r.a / sp.total * 100) + '%"></span></div></li>'; }).join('') + '</ol>' +
          '<div class="gm-acts">' + btn('windfall', 'keep', U.I('check') + 'Keep This Plan') + '</div>' +
          (t.past.length ? '<p class="gm-mini">Kept plans: ' + E(t.past.slice(-3).reverse().map(function (p) { return U.niceDate(p.d) + ', ' + M(p.amt); }).join('; ')) + '.</p>' : '') +
          '<p class="gm-mini">For your own plan, a licensed financial planner can help.</p>';
      },
      act: function (a, arg, c) {
        var t = c.t;
        if (a === 'kind') { t.kind = /^(tax|bonus|gift|other)$/.test(arg) ? arg : 'tax'; return true; }
        if (a === 'give') { t.give = [0, 5, 10].indexOf(+arg) >= 0 ? +arg : 0; return true; }
        if (a === 'add') { t.cards.push({ n: '', bal: '', rate: '' }); return true; }
        if (a === 'rm') { t.cards.splice(+arg, 1); return true; }
        if (a === 'keep') { if (!(n0(t.amt) > 0)) { c.say('Add the amount first.'); return false; } t.past.push({ d: U.today(), amt: r2(n0(t.amt)), kind: t.kind, give: t.give }); if (t.past.length > 12) t.past.shift(); c.celebrate('A plan for every dollar. Well done.'); return true; }
        return false;
      } }
  ];
  var BY = {}; TOOLS.forEach(function (t) { BY[t.id] = t; });

  window.GGMoneyTools = {
    v: 'b940', list: TOOLS, get: function (id) { return BY[id] || null; }, tips: TIPS, tipOfWeek: tipOfWeek, tipPart: tipPart, partTips: partTips,
    use: function (u) { U = u; },
    math: { debtSim: debtSim, debtPlan: debtPlan, goalMonthly: goalMonthly, monthsUntil: monthsUntil, efMonths: efMonths, paydays: paydays, extraMonths: extraMonths, billsByCheck: billsByCheck, checksPerYear: checksPerYear,
      homeMeal: homeMeal, grocerySave: grocerySave, carCost: carCost, sideIncome: sideIncome, subsTotals: subsTotals, givingTotal: givingTotal, allowance: allowance, setAside: setAside,
      fv: fv, fvSeries: fvSeries, givenSums: givenSums, insureSums: insureSums, blindSums: blindSums,
      stdArea: stdArea, stdLines: stdLines, stdRanges: stdRanges, foodRef: foodRef, foodFactor: foodFactor, stdView: stdView, whatItTakes: whatItTakes, season: seasonOf, cardsOf: cardsOf, windfallSplit: windfallSplit, goalsLeft: goalsLeft, pretaxMonthly: pretaxMonthly },
    areas: AREAS, goals: GOALS, steps: STEPS, stdTaste: stdTaste, stdRow: stdRow, stdSources: STD_SRC,
    blind: BLIND, insure: INSURE, giveGoal: function (d) { return giveGoal(d); }
  };
})();
