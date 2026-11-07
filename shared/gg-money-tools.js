/* =====================================================================
   GROUNDED MONEY TOOLS (shared/gg-money-tools.js), GWG BLD 937 stage 1b
   Chris (November 7, 2026): "more calculators/tips tools ways to save and make this a huge value add".
   Loaded by shared/gg-money.js the first time Grounded Money opens (window.GGMoneyTools). Every tool works on this
   device only and keeps its answers in the same money object as the plan (money.tools.<id>), so the profile lock,
   backups, and Move to Another Device carry them.

   A tool: {id, n name, i icon, art painting, sub one line, start: 1 for the Start taste, init(t, c), form(c), out(c), act(a, arg, c)}
   c (from gg-money.js): {d money, t this tool's state, U helpers, save(), paint(), say(msg), go(view), celebrate(msg), member()}
   Inputs carry data-gt="path" (data-n="1" for numbers); the module writes them into t and redraws out(c) as you type.
   Buttons carry data-gm="tool:<id>:<action>:<arg>".

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
  function billsByCheck(days, bills) {
    var groups = days.map(function (d) { return { day: d, bills: [], total: 0 }; }), prev = { day: 0, bills: [], total: 0 };
    bills.forEach(function (b) { var g = null; for (var i = groups.length - 1; i >= 0; i--) if (groups[i].day <= b.due) { g = groups[i]; break; } g = g || prev; g.bills.push(b); g.total = r2(g.total + b.amt); });
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
    ['Health', 'Ask for the cash price and a payment plan on medical bills.']
  ];
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
    { id: 'debt', n: 'Debt Payoff Planner', i: 'path', sub: 'Your payoff month, and the interest you keep.',
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

    { id: 'goals', n: 'Emergency Fund and Savings Goals', i: 'shield', art: 'tree-roots.webp', sub: 'Steady roots: months covered, and each goal by its date.',
      init: function (t) { t.goals = arr(t.goals); if (t.ef == null) t.ef = ''; t.efm = t.efm || 3; },
      form: function (c) {
        var t = c.t;
        return '<h3 class="gm-h4">Emergency Fund</h3><p class="gm-sub">Steady roots for a hard season: three to six months of your plan’s spending, set aside.</p>' +
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

    { id: 'pay', n: 'Paycheck Planner', i: 'cal', art: 'way-plan-sq.webp', sub: 'Which bills each paycheck covers, and your three paycheck months.',
      init: function (t, c) { t.s = t.s || 'b'; t.anchor = t.anchor || U.today(); t.due = t.due && typeof t.due === 'object' ? t.due : {}; if (t.amt == null) t.amt = ''; t.d1 = t.d1 || 1; t.d2 = t.d2 || 15; },
      form: function (c) {
        var t = c.t, ms = U.live(c.d.lines).filter(function (l) { return l.s !== 'hold' && l.s !== 'pretax' && l.f === 'm' && U.monthly(l) > 0; });
        return '<div class="gm-f"><span>I am paid</span>' + chips('pay', 's', t.s, [['w', 'Weekly'], ['b', 'Every Two Weeks'], ['s', 'Twice a Month'], ['m', 'Monthly']]) + '</div>' +
          '<div class="gm-two">' + (t.s === 'w' || t.s === 'b' ? fld('A recent payday', 'anchor', t.anchor, { text: 1, type: 'date' }) : fld(t.s === 's' ? 'First payday of the month' : 'Payday', 'd1', t.d1, { ph: '1' })) + (t.s === 's' ? fld('Second payday', 'd2', t.d2, { ph: '15' }) : fld('Each paycheck', 'amt', t.amt, { ph: String(Math.round(U.totals(c.d).income * 12 / checksPerYear(t.s)) || '') })) + '</div>' +
          (t.s === 's' ? fld('Each paycheck', 'amt', t.amt, { ph: String(Math.round(U.totals(c.d).income * 12 / 24) || '') }) : '') +
          (ms.length ? '<details class="gm-fold"><summary>Due days for your monthly bills</summary><div class="gm-grid3">' + ms.map(function (l) { return fld(l.n, 'due.' + l.id, t.due[l.id] || '', { ph: '1' }); }).join('') + '</div></details>' : '<p class="gm-mini">Add monthly lines to My Plan to place them on paychecks.</p>');
      },
      out: function (c) {
        var t = c.t, now = new Date(), y = now.getFullYear(), m = now.getMonth(), days = paydays(t.s, t.anchor, y, m, n0(t.d1), n0(t.d2));
        var per = n0(t.amt) || r2(U.totals(c.d).income * 12 / checksPerYear(t.s));
        var bills = U.live(c.d.lines).filter(function (l) { return l.s !== 'hold' && l.s !== 'pretax' && l.f === 'm' && U.monthly(l) > 0; }).map(function (l) { return { n: l.n, amt: U.monthly(l), due: Math.min(dim(y, m), Math.max(1, n0(t.due[l.id]) || 1)) }; });
        var g = billsByCheck(days, bills), ex = extraMonths(t.s, t.anchor, now);
        var card = function (lbl, x) { return '<div class="gm-check"><div class="gm-pt"><b>' + lbl + '</b><span>' + M(x.total) + ' of ' + M(per) + '</span></div><div class="gm-bar thin' + (x.total > per ? ' over' : '') + '"><span style="width:' + (per ? Math.min(100, Math.round(x.total / per * 100)) : 0) + '%"></span></div>' + (x.bills.length ? '<small>' + x.bills.map(function (b) { return E(b.n); }).join(', ') + '</small>' : '<small>Room for savings and goals.</small>') + '</div>'; };
        return '<h3 class="gm-h4">' + MONTHS[m] + '</h3>' + (g.prev.bills.length ? card('From last month’s last check', g.prev) : '') + g.groups.map(function (x) { return card(MONTHS[m].slice(0, 3) + ' ' + x.day, x); }).join('') +
          (t.s === 'w' || t.s === 'b' ? (ex.length ? '<div class="gm-note">' + U.I('sun') + '<span><b>Extra paycheck months:</b> ' + ex.map(function (x) { return E(x.name); }).join(', ') + '. Send each extra check to a goal: the emergency fund, the first debt in your payoff plan, or your set-aside funds.</span></div>' : '<p class="gm-mini">Your extra paycheck months show here.</p>') : '');
      },
      act: function (a, arg, c) { if (a === 's') c.t.s = arg; return true; } },

    { id: 'fund', n: 'Set-Aside Funds', i: 'jar', art: 'progress-sq.webp', sub: 'A little each month, so yearly bills arrive ready.',
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

    { id: 'grocery', n: 'Grocery Saver', i: 'plate', art: 'shop-sq.webp', start: 1, sub: 'What a meal at home costs, and what a few more save.',
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

    { id: 'car', n: 'True Cost of a Car', i: 'car', sub: 'Everything a car costs, by the month and by the mile.',
      init: function (t, c) { if (t.pay == null) { t.pay = Math.round(lineSum(c.d, /car pay|auto ?loan|car loan|vehicle/i)) || ''; t.ins = Math.round(lineSum(c.d, /car ins|auto ins/i)) || ''; t.miles = 1000; t.mpg = 28; t.gas = 3.2; t.upkeep = 900; } },
      form: function (c) {
        var t = c.t;
        return '<div class="gm-two">' + fld('Loan or lease a month', 'pay', t.pay, { ph: '0' }) + fld('Insurance a month', 'ins', t.ins, { ph: '0' }) + '</div>' +
          '<div class="gm-grid3">' + fld('Miles a month', 'miles', t.miles) + fld('Miles per gallon', 'mpg', t.mpg) + fld('Price of gas', 'gas', t.gas) + '</div>' +
          fld('Upkeep a year (oil, tires, repairs, registration)', 'upkeep', t.upkeep);
      },
      out: function (c) { var r = carCost(c.t); return '<div class="gm-tbigs">' + big('A Month', M(r.total), 'fuel ' + M(r.fuel) + ', upkeep ' + M(r.upkeep), 'hn') + big('A Mile', '$' + r.perMile.toFixed(2), 'every mile, all in') + '</div><p class="gm-mini">Walking or biking the short trips keeps miles, and dollars, in your pocket.</p>'; } },

    { id: 'side', n: 'Side Income Calculator', i: 'sprout', art: 'tree-fruit.webp', sub: 'Hours or events a month, times your rate.',
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

    { id: 'subs', n: 'Subscription Check', i: 'list', art: 'quiet-morning-sq.webp', start: 1, sub: 'Keep the ones you love; see the year at a glance.',
      init: function (t) { t.list = arr(t.list); },
      form: function (c) {
        var t = c.t, sugg = ['Streaming', 'Music', 'Cloud Storage', 'Apps', 'News', 'Fitness', 'Meal Kits', 'Shopping Club'];
        return '<p class="gm-sub">List each one with its price. Then choose Keep, Pause, or Let Go.</p>' +
          t.list.map(function (s, i) { return '<div class="gm-line gm-trow"><div class="gm-lr1">' + fld('Subscription', 'list.' + i + '.n', s.n, { text: 1, ph: 'Streaming', max: 60, cls: 'gm-grow' }) + rm('subs', i, s.n) + '</div><div class="gm-two">' + fld('Price', 'list.' + i + '.amt', s.amt, { ph: '0' }) + fld('Billed', 'list.' + i + '.f', s.f || 'm', { sel: [['m', 'Monthly'], ['y', 'Yearly']] }) + '</div>' + chips('subs', 'c' + i, s.c || 'keep', [['keep', 'Keep'], ['pause', 'Pause'], ['go', 'Let Go']]) + '</div>'; }).join('') +
          '<div class="gm-chips">' + sugg.map(function (s) { return '<button type="button" class="gm-chip soft" data-gm="tool:subs:add:' + s + '">' + U.I('plus') + E(s) + '</button>'; }).join('') + '</div>';
      },
      out: function (c) { var r = subsTotals(c.t.list); return c.t.list.length ? '<div class="gm-tbigs">' + big('All of Them, a Year', M(r.all)) + big('Back in Your Pocket', M(r.go + r.pause), 'a year, from Pause and Let Go', 'ok') + '</div>' : ''; },
      act: function (a, arg, c) { var t = c.t, m = /^c(\d+)$/.exec(a); if (a === 'add') t.list.push({ n: arg || '', amt: '', f: 'm', c: 'keep' }); else if (a === 'rm') t.list.splice(+arg, 1); else if (m && t.list[+m[1]]) t.list[+m[1]].c = arg; return true; } },

    { id: 'calls', n: 'Call Scripts', i: 'phone', sub: 'Short, calm words for lowering a bill.',
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

    { id: 'date', n: 'Money Date', i: 'heart', art: 'tend-people.webp', sub: 'Fifteen minutes a week, together. Tend your Branches.',
      init: function (t) { t.w = t.w && typeof t.w === 'object' ? t.w : {}; },
      form: function (c) {
        var wk = U.weekKey(), x = c.t.w[wk] || {}, m = U.month(c.d);
        var P = [['win', 'Celebrate', 'One money win from this week, big or small.'], ['look', 'Look', 'This Month at a glance: ' + m.line + '.'], ['plan', 'Plan', 'The bills ahead this week, and one choice you make together.'], ['dream', 'Dream', 'One thing you are tending toward together.']];
        return '<p class="gm-sub">Money peace is family peace. Sit together for fifteen minutes, warm drink in hand, and walk through four short steps.</p>' +
          P.map(function (p, i) { return '<label class="gm-f gm-prompt"><span><b>' + (i + 1) + '. ' + E(p[1]) + '</b> ' + E(p[2]) + '</span><textarea class="gm-in" rows="2" maxlength="300" data-gt="w.' + wk + '.' + p[0] + '">' + E(x[p[0]] || '') + '</textarea></label>'; }).join('') +
          '<div class="gm-acts">' + btn('date', 'done', x.at ? 'Saved for This Week' : 'We Had Our Money Date', !!x.at) + '</div>';
      },
      out: function (c) { var ks = Object.keys(c.t.w).filter(function (k) { return c.t.w[k].at && k !== U.weekKey(); }).sort().reverse(); return ks.length ? '<p class="gm-mini">Your last Money Date: the week of ' + E(U.niceDate(ks[0])) + '.</p>' : ''; },
      act: function (a, arg, c) { if (a !== 'done') return false; var wk = U.weekKey(); c.t.w[wk] = Object.assign({}, c.t.w[wk], { at: Date.now() }); c.celebrate('A good Money Date. Your Branches grow stronger together.'); return true; } },

    { id: 'give', n: 'Giving Planner', i: 'gift', art: 'tend-fruit.webp', sub: 'Choose your giving first, by percent or amount.',
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

    { id: 'kids', n: 'Allowance Helper', i: 'people', sub: 'Save, give, and spend jars, sized by age.',
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

    { id: 'tips', n: 'Grounded Money Tips', i: 'leaf', art: 'tree-leaves.webp', start: 1, sub: TIPS.length + ' short ways to save and earn, a new one each week.',
      init: function (t) { t.keep = t.keep && typeof t.keep === 'object' ? t.keep : {}; t.cat = t.cat || 'All'; },
      form: function (c) {
        var t = c.t, cats = ['All'].concat(TIPS.map(function (x) { return x[0]; }).filter(function (x, i, a) { return a.indexOf(x) === i; })), wk = tipOfWeek();
        return '<div class="gm-card gm-tipwk"><span class="gm-k">This Week’s Tip</span><p>' + E(TIPS[wk][1]) + '</p></div>' + chips('tips', 'cat', t.cat, cats.map(function (x) { return [x, x]; })) +
          '<ul class="gm-tips">' + TIPS.map(function (x, i) { if (t.cat !== 'All' && x[0] !== t.cat) return ''; var on = !!t.keep[i]; return '<li><span class="gm-pill soft">' + E(x[0]) + '</span><p>' + E(x[1]) + '</p><button type="button" class="gm-linkbtn" data-gm="tool:tips:keep:' + i + '" aria-pressed="' + on + '">' + (on ? 'Trying This' : 'Try This') + '</button></li>'; }).join('') + '</ul>';
      },
      out: function () { return ''; },
      act: function (a, arg, c) { var t = c.t; if (a === 'cat') t.cat = arg; else if (a === 'keep') { if (t.keep[arg]) delete t.keep[arg]; else t.keep[arg] = 1; } return true; } }
  ];
  var BY = {}; TOOLS.forEach(function (t) { BY[t.id] = t; });

  window.GGMoneyTools = {
    v: 'b937', list: TOOLS, get: function (id) { return BY[id] || null; }, tips: TIPS, tipOfWeek: tipOfWeek,
    use: function (u) { U = u; },
    math: { debtSim: debtSim, debtPlan: debtPlan, goalMonthly: goalMonthly, monthsUntil: monthsUntil, efMonths: efMonths, paydays: paydays, extraMonths: extraMonths, billsByCheck: billsByCheck, checksPerYear: checksPerYear,
      homeMeal: homeMeal, grocerySave: grocerySave, carCost: carCost, sideIncome: sideIncome, subsTotals: subsTotals, givingTotal: givingTotal, allowance: allowance, setAside: setAside }
  };
})();
