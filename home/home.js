/* =====================================================================
   GROUNDED . MY HOME (home/home.js), GWG BLD 866
   growwithgrounded.com/home/: one place to come back to each day. Built from the
   approved BLD 865 mockup (grounded-workshop patches/bld865/home), wired to real data.

   What it reads (all inside the person's locked profile, through shared/gg-profiles.js)
     GGP.active(), GGP.tree(id)               name, age, and tree
     GGP.data(id, <tree>)                     the last check-in: history entries with scores
                                              (Oak, Birch, Sequoia, Pine), kid.checkins (Maple),
                                              student.rings (Aspen); and tend (season, week, days)
     GGP.data(id).life                        Living Sober: the card shows only when soberDate is set
     GGP.data(id, 'tending')                  Tending, shaped {health: {}, deleted: {health: {}}},
                                              drawn by field-guide/health.js (GGHealth) in public mode
     GGP.data(id, 'home')                     the Home's own choices:
                                              {who, stage, season, parts: [...], hidden: {tend}, days: {date: {quiet, talk, pray}}, kid: {date: 1}, created,
                                               tour: 'b884' once the welcome tour is seen (BLD 884),
                                               rhythm: {'part|Name': 'd'|'w'|'n'|'f3'} a practice's rhythm the person chose (BLD 885;
                                               'f' plus a number 2 to 5 is A Few Times a Week, that many days),
                                               later: {'part|Name': 'YYYY-MM-DD'} a When You're Ready nudge rests until then (BLD 885),
                                               way: My Grounded Way Plan's own choices (BLD 893, see that section)}
     window.GG_RHYTHM (shared/practice-rhythm.js, BLD 885)  {<tree>: {'part|Name': {r: 'd'|'f'|'w'|'n', x (times a week, for f), min, how: [steps]}}}
                                              each practice's suggested rhythm, minutes, and steps; read only, guarded
     GGP.list(), GGP.shared(id), GGP.openIds() Your Family: progress only (days tended, rings, season)

   Views (the address names each one, so Back works). BLD 881: four tabs for a grown-up profile.
     /home/ or #today  Today: one list in day order (Tending's items and the tree's check-in), a + button to log
     #week             Week: Shop for Week X, Sunday Together Prep, the seven days
     #grow             Grow: the tree, its six parts, this season, the Growth Plan, history
     #library          Library: search and the shelves (Learn, When Life Changes, Recipes, Workouts, Quiet)
     #me               the profile sheet: Numbers, Household, Settings, Privacy, Switch Profile
     #<tab>=<section>  a Tending section inside a tab (#week=shop, #week=prep, #today=log, #today=tending,
                       #library=workouts, #me=numbers, #me=settings, ...)
     Old addresses keep working: #tending opens Today, #tree opens Grow, #more and #privacy open the sheet,
     #recipe-<id> opens that recipe in the frame over Library. Kid profiles keep Today and My Tree (#tree).

   Tending host contract (helper A, field-guide/health.js public mode)
     Loaded only when Tending is chosen: field-guide/moves.js, stage.js, coach.js, health.js,
     shared/gg-tend-plan.js, shared/tending-public.js (window.GGTendPublic; until it exists the
     Home shows a kind card and creates nothing). Then:
     GGHealth.init({data, fld: () => window.GGTendPublic, fdr: () => null, tier: () => 'public', save, render, go, toast})
     GGHealth.summary() feeds Today's Tending when it exists; GGHealth.view() fills #hm-tend.

   Crisis lines appear as one line of text only. No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGHome) return;
  var V = 'b893';
  var TEND_SRC = ['/field-guide/moves.js?v=' + V, '/field-guide/stage.js?v=' + V, '/field-guide/coach.js?v=' + V, '/field-guide/health.js?v=' + V, '/shared/gg-scale.js?v=' + V, '/shared/gg-tend-plan.js?v=' + V, '/shared/tending-public.js?v=' + V];
  var WORDS_SRC = '/shared/sober-words.js?v=b851';
  var GGN_SRC = '/shared/ggn.js?v=b888';
  var IMG = '/shared/heroes/way/';

  /* ---------- small helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function now() { return new Date(); }
  function today() { return ymd(now()); }
  function parse(s) { var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(s || '')); return m ? new Date(+m[1], +m[2] - 1, +m[3], 12) : null; }
  function between(a, b) { var x = parse(a), y = parse(b); return x && y ? Math.round((y - x) / 864e5) : 0; }
  function addDays(s, n) { var d = parse(s); d.setDate(d.getDate() + n); return ymd(d); }
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function niceDay(s) { var d = parse(s); return d ? DAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate() : ''; }
  function niceDate(s) { var d = parse(s); return d ? MONTHS[d.getMonth()] + ' ' + d.getDate() : ''; }
  function shortDate(s) { var d = parse(s); return d ? MONTHS[d.getMonth()].slice(0, 3) + ' ' + d.getDate() : ''; }
  function arr(x) { return Array.isArray(x) ? x : []; }
  function obj(x) { return x && typeof x === 'object' && !Array.isArray(x) ? x : {}; }
  function num(v) { if (v === '' || v == null) return null; var n = +v; return isFinite(n) ? n : null; }
  function dayIndex() { var d = now(); return Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5); }
  function pick(list, n) { return list.length ? list[((n % list.length) + list.length) % list.length] : null; }
  function I(id) { return '<svg class="i" aria-hidden="true"><use href="#hmi-' + id + '"/></svg>'; }
  function $(s, r) { return (r || document).querySelector(s); }
  function load(src) {
    return new Promise(function (ok) {
      if (document.querySelector('script[data-hm-src="' + src + '"]')) return ok(true);
      var s = document.createElement('script'); s.src = src; s.setAttribute('data-hm-src', src);
      s.onload = function () { ok(true); }; s.onerror = function () { ok(false); };
      document.head.appendChild(s);
    });
  }
  function toast(m) { if (window.GGP && GGP.toast) GGP.toast(m); }

  /* ---------- icons (from the mockup kit) ---------- */
  var SYM = {
    check: '<path d="M5 12.5l4.4 4.4L19 7.4"/>',
    play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    plate: '<circle cx="13" cy="12.5" r="7.5"/><circle cx="13" cy="12.5" r="4"/><path d="M3 4v5.5a1.5 1.5 0 0 0 1.5 1.5v9M3 4v4M5.9 4v4"/>',
    move: '<circle cx="14" cy="4.6" r="2"/><path d="M8.5 21l3-6 3 2.5v3.5M11.5 15l1.2-5.5-3.7 1.6-1.6 3M12.7 9.5l2.5 3.2 3.3.9"/>',
    lotus: '<path d="M12 18.5c-3-2-4.4-4.6-4.4-7.6C9.5 11.7 11 13 12 15c1-2 2.5-3.3 4.4-4.1 0 3-1.4 5.6-4.4 7.6z"/><path d="M12 15c-1-2.8-1-5.6 0-8.6 1 3 1 5.8 0 8.6zM7.6 12.3C5.6 12 4 12.5 2.8 13.5c1.6 3 5 5 9.2 5M16.4 12.3c2-.3 3.6.2 4.8 1.2-1.6 3-5 5-9.2 5"/>',
    sunrise: '<path d="M3 18h18M6.5 18a5.5 5.5 0 0 1 11 0M12 4.5v3.5M4.6 10.2l1.7 1.2M19.4 10.2l-1.7 1.2M9.5 6.5L12 4l2.5 2.5"/>',
    moon: '<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z"/>',
    sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/>',
    heart: '<path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z"/><path d="M7.5 12.5h2.5l1.3-2.2 1.8 4 1.2-1.8h2.2"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    sprout: '<path d="M12 21v-8"/><path d="M12 13c0-4.4-3-7-7.5-7 0 4.4 3 7 7.5 7z"/><path d="M12 11c0-3.6 2.6-6 6.8-6 0 3.6-2.6 6-6.8 6z"/><path d="M7.5 21h9"/>',
    flame: '<path d="M12 3c.6 3.2 4.5 5 4.5 9.6A4.5 4.5 0 0 1 12 17a4.5 4.5 0 0 1-4.5-4.4c0-2.2 1.2-3.4 2.2-4.4.3 1.6 1 2.4 1.8 2.6-.4-2.6.2-5.6.5-7.8z"/><path d="M8 21h8M10 17v4M14 17v4"/>',
    people: '<circle cx="8.5" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M3 19.5c.4-3.4 2.6-5.5 5.5-5.5s5.1 2.1 5.5 5.5M14.2 14.3c.7-.3 1.4-.5 2.3-.5 2.4 0 4.1 1.8 4.5 4.7"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/><circle cx="12" cy="12" r="6.6"/>',
    tree: '<path d="M12 21.5v-7"/><path d="M12 14.5c-4.6 0-7.5-2.4-7.5-5.6 0-2.6 2-4.4 4.2-4.6C9.6 2.9 10.7 2.3 12 2.3s2.4.6 3.3 2c2.2.2 4.2 2 4.2 4.6 0 3.2-2.9 5.6-7.5 5.6z"/><path d="M12 17.5l-3-2M12 16.5l3-2.2M8.5 21.5h7"/>',
    flask: '<path d="M9.5 3h5M10.5 3v5.6L5 18.2A1.9 1.9 0 0 0 6.7 21h10.6a1.9 1.9 0 0 0 1.7-2.8L13.5 8.6V3"/><path d="M7.6 14h8.8"/>',
    book: '<path d="M4 5.5c2.8-1.2 5.6-1.2 8 .7 2.4-1.9 5.2-1.9 8-.7v13c-2.8-1.2-5.6-1.2-8 .7-2.4-1.9-5.2-1.9-8-.7z"/><path d="M12 6.2v13"/>',
    feather: '<path d="M19.5 4.5c-6.5 0-12 4.8-12 12.5v3.5"/><path d="M19.5 4.5c.5 7-3.5 12-10.5 12.5"/><path d="M11 13h5"/>',
    wind: '<path d="M3 9h11a3 3 0 1 0-3-3M3 13h15a3 3 0 1 1-3 3M3 17h7"/>',
    sun2: '<path d="M12 7v-3.5M7.4 9 5 6.6M16.6 9 19 6.6"/><path d="M5 17a7 7 0 0 1 14 0z"/><path d="M3 20.5h18"/>',
    shield: '<path d="M12 3l7 3v5.5c0 4.4-3 8-7 9.5-4-1.5-7-5.1-7-9.5V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
    star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2.5"/>',
    phone: '<rect x="6.5" y="2.8" width="11" height="18.4" rx="2.6"/><path d="M10.5 18h3"/>',
    home: '<path d="M4 11l8-6.5 8 6.5"/><path d="M6.5 9.5V20h11V9.5"/><path d="M10.5 20v-5h3v5"/>',
    choice: '<rect x="3.5" y="4" width="17" height="16" rx="3"/><path d="M7.5 9.5l1.6 1.6 3-3M7.5 15.5h9M14 10h2.5"/>',
    user: '<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20.5c.6-4 3.6-6.5 7.5-6.5s6.9 2.5 7.5 6.5"/>',
    love: '<path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z"/>',
    save: '<path d="M12 3.5v11M7.5 10l4.5 4.5 4.5-4.5"/><path d="M4 15.5v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
    open: '<path d="M12 14.5v-11M7.5 8L12 3.5 16.5 8"/><path d="M4 15.5v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
    swap: '<rect x="2.5" y="5" width="7" height="13" rx="1.8"/><rect x="14.5" y="5" width="7" height="13" rx="1.8"/><path d="M10.5 9.5h3M12 8l1.5 1.5L12 11"/>',
    key: '<circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v3M15.5 12v2"/>',
    medal: '<circle cx="12" cy="14.5" r="5.5"/><path d="M9 9.5L6.5 3.5h4l1.5 3 1.5-3h4L15 9.5"/><path d="M12 12v5M10.5 13.5L12 12"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    down: '<path d="M6.5 9.5l5.5 5.5 5.5-5.5"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>'
  };
  function mountIcons() {
    if (document.getElementById('hm-icons')) return;
    var d = document.createElement('div');
    d.innerHTML = '<svg id="hm-icons" width="0" height="0" style="position:absolute" aria-hidden="true">' + Object.keys(SYM).map(function (k) { return '<symbol id="hmi-' + k + '" viewBox="0 0 24 24">' + SYM[k] + '</symbol>'; }).join('') + '</svg>';
    document.body.insertBefore(d.firstChild, document.body.firstChild);
  }

  /* ---------- the trees and the parts ---------- */
  var PARTS = [
    { k: 'roots', n: 'Roots', m: 'what grounds you' }, { k: 'trunk', n: 'Trunk', m: 'your purpose' },
    { k: 'bark', n: 'Bark', m: 'your mind and feelings' }, { k: 'branches', n: 'Branches', m: 'your relationships' },
    { k: 'leaves', n: 'Leaves', m: 'your body' }, { k: 'fruit', n: 'Fruit', m: 'your hope' }
  ];
  var PART = {}; PARTS.forEach(function (p) { PART[p.k] = p; });
  var TREES = {
    maple: { n: 'Maple', href: '/maple/', who: 'Grades K to 5', age: 'maple' },
    aspen: { n: 'Aspen', href: '/aspen/', who: 'Grades 6 to 8', age: 'aspen' },
    pine: { n: 'Pine', href: '/pine/', who: 'Grades 9 to 12', age: 'pine', ck: true },
    birch: { n: 'Birch', href: '/birch/', who: 'Ages 18 to 26', age: 'adult', ck: true },
    oak: { n: 'Oak', href: '/oak/', who: 'Ages 26 to 60', age: 'adult', ck: true },
    sequoia: { n: 'Sequoia', href: '/sequoia/', who: '60 and up', age: 'adult', ck: true },
    willow: { n: 'Willow', href: '/willow/', who: 'Hospice and the people who love them', season: true },
    grove: { n: 'The Grove', href: '/grove/', who: 'Families and groups', season: true },
    heartwood: { n: 'Heartwood', href: '/heartwood/', who: 'Couples', season: true }
  };
  function mark(t) { return '/shared/marks/' + t + '-small.svg'; }
  function treeOfProfile(p) { if (!p) return 'oak'; if (p.age === 'maple' || p.age === 'aspen' || p.age === 'pine') return p.age; return (window.GGP && GGP.tree) ? GGP.tree(p.id) : 'oak'; }
  function isKid(p) { return p && (p.age === 'maple' || p.age === 'aspen'); }
  function levelKey(sc) { return sc == null ? 'unsure' : sc >= 8 ? 'strong' : sc >= 5 ? 'steady' : 'edge'; }

  /* The latest check-in for any tree: {date, type, scores, unsure, count, first} or null */
  function lastCheckin(id, tree) {
    if (!window.GGP || !GGP.isOpen || !GGP.isOpen(id)) return null;
    var v = GGP.data(id) || {}, list = [];
    if (tree === 'maple') {
      list = arr(obj(obj(v.maple).kid).checkins).filter(function (c) { return c && c.answers; }).map(function (c) {
        var s = {}, u = []; PARTS.forEach(function (p) { var x = obj(c.answers[p.k]).score; if (typeof x === 'number') s[p.k] = x; else u.push(p.k); });
        return { date: String(c.date || '').slice(0, 10), type: 'full', scores: s, unsure: u };
      });
    } else if (tree === 'aspen') {
      list = arr(obj(obj(v.aspen).student).rings).filter(function (r) { return r && !r.from && r.answers; }).map(function (r) {
        var s = {}, u = []; PARTS.forEach(function (p) { var x = obj(r.answers[p.k]).score; if (typeof x === 'number') s[p.k] = x; else u.push(p.k); });
        return { date: String(r.date || '').slice(0, 10), type: 'full', scores: s, unsure: u };
      });
    } else {
      list = arr(obj(v[tree]).history).filter(function (e) { return e && e.scores && !e.from; }).map(function (e) {
        return { date: String(e.date || '').slice(0, 10), type: e.type === 'quick' ? 'quick' : 'full', scores: e.scores, unsure: arr(e.unsure) };
      });
    }
    list = list.filter(function (e) { return /^\d{4}-\d{2}-\d{2}$/.test(e.date); }).sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    if (!list.length) return null;
    var last = list[list.length - 1];
    last.count = list.length; last.first = list[0].date; last.prev = list.length > 1 ? list[list.length - 2] : null;
    return last;
  }
  function levelsOf(ck) {
    var lv = {}; PARTS.forEach(function (p) { lv[p.k] = ck.unsure.indexOf(p.k) >= 0 ? 'unsure' : levelKey(num(ck.scores[p.k])); });
    return lv;
  }
  /* The Growing Edge parts, lowest first; with none, the lowest Steady part leads For You Today. */
  function edgesOf(ck) {
    if (!ck) return { edges: [], lead: null };
    var lv = levelsOf(ck);
    var scored = PARTS.filter(function (p) { return lv[p.k] !== 'unsure'; }).map(function (p) { return { k: p.k, s: num(ck.scores[p.k]) }; }).sort(function (a, b) { return a.s - b.s; });
    var edges = scored.filter(function (x) { return lv[x.k] === 'edge'; }).map(function (x) { return x.k; });
    var lead = edges[0] || (scored.length && lv[scored[0].k] === 'steady' ? scored[0].k : null);
    return { edges: edges, lead: lead, lv: lv };
  }
  function tendOf(id, tree) { var v = GGP.data(id) || {}; var t = obj(obj(v[tree]).tend); return t; }
  function tendedDays(t) { return Object.keys(obj(t.days)).filter(function (k) { var x = t.days[k]; return x && ((x.d && x.d.length) || (x.a && x.a.length)); }); }
  function weekNo(t) { return t.start ? Math.floor(Math.max(0, between(t.start, today())) / 7) + 1 : 0; }

  /* ---------- Living Sober ---------- */
  function soberCount(date) {
    var s = parse(date), t = parse(today()); if (!s || !t) return null;
    var days = Math.round((t - s) / 864e5); if (days < 0) return null;
    var months = (t.getFullYear() - s.getFullYear()) * 12 + (t.getMonth() - s.getMonth());
    var dim = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
    if (t.getDate() < Math.min(s.getDate(), dim)) months -= 1;
    return { days: days, months: months, years: Math.floor(months / 12) };
  }
  var SOBER_DAYS = [1, 3, 7, 14, 21];
  var NUMW = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven'];
  function addMonths(date, m) { var d = parse(date), day = d.getDate(); d.setDate(1); d.setMonth(d.getMonth() + m); var dim = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(); d.setDate(Math.min(day, dim)); return ymd(d); }
  /* Every medallion with the date it is reached: d1 is the sober date itself (Day One). */
  function medallions(date) {
    var out = SOBER_DAYS.map(function (n) { return { k: 'd' + n, name: n === 1 ? 'Day One' : n === 7 ? 'One Week' : n === 14 ? 'Two Weeks' : n === 21 ? 'Three Weeks' : 'Three Days', at: addDays(date, n) }; });
    for (var m = 1; m <= 11; m++) out.push({ k: 'm' + m, name: NUMW[m] + (m === 1 ? ' Month' : ' Months'), at: addMonths(date, m) });
    for (var y = 1; y <= 60; y++) out.push({ k: 'y' + y, name: (y <= 11 ? NUMW[y] : String(y)) + (y === 1 ? ' Year' : ' Years'), at: addMonths(date, 12 * y) });
    return out;
  }

  /* ---------- For You Today: Get Grounded Now videos matched to a part ---------- */
  var GGN = {
    'gg-long-exhale-now': ['Long Exhale Breathing', 2, 'Breathe out a little longer than you breathe in, soft and slow, and let your body settle.'],
    'gg-54321-now': ['5-4-3-2-1 Senses', 2, 'Five, four, three, two, one: your senses bring you back to right now.'],
    'gg-name-it-now': ['Name It to Tame It', 2, 'Give a big feeling one word, then one slow breath.'],
    'gg-box-now': ['Box Breathing', 2, 'Four even sides: in, hold, out, rest. A simple shape for a busy mind to follow.'],
    'gg-selfcompassion-now': ['Self-Compassion Break Right Now', 2, 'Three kind sentences for a hard moment, with a hand on your heart if you like.'],
    'gg-calm-place-now': ['Calm Place Imagery', 2, 'Picture a calm place, real or imagined, and rest there for a few breaths.'],
    'gg-chair-stretch-now': ['Gentle Chair Stretch', 2, 'Three slow seated stretches with your breath, right where you sit.'],
    'gg-bodyscan-now': ['Short Body Scan Right Now', 2, 'Notice and soften, from your feet to your forehead, in about two minutes.'],
    'gg-walk-it-out-now': ['Walk It Out', 2, 'A short walk, steps matched to breath, to move the feeling through.'],
    'gg-squeeze-release-now': ['Squeeze and Release', 2, 'Squeeze a few muscles gently, then let them go, and feel your body soften.'],
    'gg-belly-now': ['Hand-on-Belly Breathing', 2, 'One hand on your chest, one on your belly, and a slow breath that lifts the belly.'],
    'gg-p-spiritual-stillness': ['Rest in Stillness', 2, 'A quiet pause for anyone spiritual in their own way.'],
    'gg-p-spiritual-gratitude': ['A Gratitude Pause', 2, 'Three small thanks for what is here right now.'],
    'gg-p-spiritual-nature': ['Part of Something Larger', 3, 'Connect with nature and the wide world you belong to.'],
    'gg-lovingkindness-now': ['Loving-Kindness Right Now', 2, 'Warm wishes for someone easy to love, and then for you.'],
    'gg-p-spiritual-light': ['Holding Someone in Light', 2, 'Picture someone you love, surrounded by warm light.'],
    'gg-stop-now': ['STOP Right Now', 2, 'One calm pause, one breath, and one small next step you choose.'],
    'gg-opposite-action-now': ['Opposite Action', 2, 'Notice what a feeling urges you to do, and take one small step toward what helps.'],
    'gg-p-spiritual-blessing': ['A Blessing for Right Now', 2, 'A short blessing to hold you through this hour.'],
    'gg-sigh-now': ['Physiological Sigh', 1, 'Two breaths in, one long breath out. About one minute to help your body settle.'],
    'gg-paced-now': ['Paced Breathing', 2, 'Let your breath follow a slow, steady circle, about six easy breaths a minute.'],
    // the kids' versions, for Maple and Aspen
    'gg-k-calm-place-now': ['My Calm Place', 2, 'Close your eyes with your grown-up and picture a place where you feel calm and happy.'],
    'gg-k-name-it-now': ['Name It to Tame It', 2, 'Find the word for your feeling, say it, and breathe with it.'],
    'gg-k-bubble-breath-now': ['Slow Bubble Breath', 2, 'Smell the flower, then blow one giant, slow bubble.'],
    'gg-k-balloon-belly-now': ['Balloon Belly Breathing', 2, 'Fill your belly like a balloon, then let it float back down.'],
    'gg-k-hello-body-now': ['Hello, Body', 2, 'Say hello to each part of your body, from your toes to your head.'],
    'gg-k-puppy-shake-now': ['Wet Puppy Shake', 2, 'Shake it all out like a wet puppy, then be still and feel the buzz settle.'],
    'gg-k-tree-roots-now': ['Tree Roots', 2, 'Press your feet down and grow roots like a strong tree.'],
    'gg-k-hand-on-heart-now': ['Hand on Heart', 2, 'Rest a hand on your heart, feel the warmth, and breathe slowly.'],
    'gg-k-kind-wishes-now': ['Kind Wishes', 2, 'Send kind wishes to someone you love, then send them to you.'],
    'gg-k-butterfly-hug-now': ['Butterfly Hug', 2, 'Cross your arms like butterfly wings and tap slowly to feel safe and happy.'],
    'gg-k-wall-push-now': ['Wall Push', 2, 'Push a wall with all your strength, then let go and feel strong and steady.'],
    'gg-k-explorer-walk-now': ['Explorer Walk', 2, 'Take a short explorer walk, step by step, and notice what you find.'],
    'gg-k-senses-detective-now': ['Senses Detective', 2, 'A quick detective game with your five senses.']
  };
  var MATCH = {
    bark: ['gg-long-exhale-now', 'gg-54321-now', 'gg-name-it-now', 'gg-box-now', 'gg-selfcompassion-now', 'gg-calm-place-now'],
    leaves: ['gg-chair-stretch-now', 'gg-bodyscan-now', 'gg-walk-it-out-now', 'gg-squeeze-release-now', 'gg-belly-now'],
    roots: ['gg-p-spiritual-stillness', 'gg-p-spiritual-gratitude', 'gg-p-spiritual-nature'],
    branches: ['gg-lovingkindness-now', 'gg-p-spiritual-light'],
    trunk: ['gg-stop-now', 'gg-opposite-action-now'],
    fruit: ['gg-p-spiritual-gratitude', 'gg-p-spiritual-blessing'],
    none: ['gg-sigh-now', 'gg-long-exhale-now', 'gg-paced-now']
  };
  var KMATCH = {
    bark: ['gg-k-calm-place-now', 'gg-k-name-it-now', 'gg-k-bubble-breath-now'],
    leaves: ['gg-k-balloon-belly-now', 'gg-k-hello-body-now', 'gg-k-puppy-shake-now'],
    roots: ['gg-k-tree-roots-now', 'gg-k-hand-on-heart-now'],
    branches: ['gg-k-kind-wishes-now', 'gg-k-butterfly-hug-now'],
    trunk: ['gg-k-wall-push-now', 'gg-k-explorer-walk-now'],
    fruit: ['gg-k-kind-wishes-now', 'gg-k-senses-detective-now'],
    none: ['gg-k-calm-place-now', 'gg-k-balloon-belly-now', 'gg-k-tree-roots-now']
  };
  var ART = { bark: 'tend-mind', leaves: 'tend-move', roots: 'tend-spirit', trunk: 'tend-spirit', branches: 'tend-people', fruit: 'tend-fruit', none: 'tend-mind' };
  function playVideo(id, from) {
    load(GGN_SRC).then(function () {
      var tries = 0;
      (function go() {
        if (window.GGNow && window.GG_NOW) { window.GGNow.play(id, [id], from); return; }
        if (++tries > 60) { location.href = '/get-grounded-now.html'; return; }
        setTimeout(go, 100);
      })();
    });
  }
  /* The tree's own growth plan library, for one quiet line under For You Today. */
  var PRAC = { oak: ['/oak/practices.js?v=b885', 'OAK_PRACTICES'], birch: ['/birch/practices.js?v=b888', 'BIRCH_PRACTICES'], sequoia: ['/sequoia/practices.js?v=b885', 'SEQUOIA_PRACTICES'], pine: ['/pine/practices.js?v=b888', 'PINE_PRACTICES'] };
  var PRAC_SKIP = /^(Prayer|Worship|Tithe|Scripture|Faith|Faith Community|Chakras|Medicine|See the Doctor Early|My Medicines|Get Counseling|Talk With a Therapist)$/i;

  /* ---------- state ---------- */
  var S = { id: null, p: null, tree: 'oak', view: 'home', tendLoad: null, tendInit: false, words: null };
  var W = { who: 'me', stage: 'oak', parts: { move: true, food: true, still: true, connect: true, labs: false, pray: false, sober: false } };
  function homeRec(id) {
    var h = GGP.data(id || S.id, 'home'); if (!h) return {};
    h.parts = arr(h.parts); h.hidden = obj(h.hidden); h.days = obj(h.days); h.kid = obj(h.kid);
    return h;
  }
  function saveHome() { if (S.id && window.GGP) return GGP.save(S.id); return Promise.resolve(); }
  var TEND_PARTS = ['move', 'food', 'still', 'connect', 'labs', 'pray'];
  var HEALTH_PARTS = ['move', 'food', 'labs'];
  function tendWrap(id) {
    var w = GGP.data(id || S.id, 'tending'); if (!w) return null;
    if (!w.health || typeof w.health !== 'object') w.health = {};
    if (!w.deleted || typeof w.deleted !== 'object') w.deleted = {};
    if (!w.deleted.health || typeof w.deleted.health !== 'object') w.deleted.health = {};
    return w;
  }
  function tendStarted() { var w = GGP.data(S.id, 'tending'); return !!(w && (w.lib || (w.health && (obj(w.health.set).u || obj(w.health.set).pubDone || Object.keys(obj(w.health.days)).length)))); }
  function tendOn(h) { return h.parts.some(function (k) { return HEALTH_PARTS.indexOf(k) >= 0; }) || tendStarted(); }
  function anyTend(h) { return h.parts.some(function (k) { return TEND_PARTS.indexOf(k) >= 0; }) || tendStarted(); }

  /* ---------- Tending: load, then hand it to field-guide/health.js ---------- */
  function loadTending() {
    if (S.tendLoad) return S.tendLoad;
    S.tendLoad = TEND_SRC.reduce(function (p, src) { return p.then(function () { return load(src); }); }, Promise.resolve()).then(function () { S.tendLoadDone = true; initTending(); return !!window.GGHealth; });
    return S.tendLoad;
  }
  function initTending() {
    if (!window.GGHealth || !S.id) return false;
    window.GGHealth.init({
      data: function () { return S.id ? tendWrap(S.id) : null; },
      // BLD 867: a plan moved from the Field Guide runs as itself (its own library copy, kept in this vault).
      fld: function () { var w = tendWrap(S.id); return (w && w.lib) || window.GGTendPublic || null; },
      fdr: function () { var w = tendWrap(S.id); return (w && w.lib && w.fdr) || null; },
      tier: function () { var w = tendWrap(S.id); return w && w.lib ? (w.tier || 'guide') : 'public'; },
      host: 'home',
      save: function () { saveHome(); },
      // BLD 881: Tending redraws the tab or section showing, and shows itself (go) as Today's Tending section.
      render: function () { tendRender(); },
      // BLD 881: Tending saved something (a guide finished, a plate logged): Today and Week redraw behind it.
      changed: function () { tendChanged(); },
      // BLD 881: Tending asks for one of its sections (the shopping list, prep, setup): the Home opens it in its tab.
      section: function (sec) { var to = { shop: 'week=shop', prep: 'week=prep', setup: 'today=tending', numbers: 'me=numbers', settings: 'me=settings', log: 'today=log', plate: 'today=log', workouts: 'library=workouts' }[sec]; if (to && !S.quiet) goTo(to); },
      go: function (t) { if (t === 'health') tendGo(); },
      // BLD 877: a public recipe opens the public Recipes page (/recipes/#<id>) in the frame, so there is one recipe design.
      openPage: function (path) { var u; try { u = new URL(path, location.href); } catch (e) { return false; } if (u.origin !== location.origin) return false; openFrame(u); return true; },
      toast: toast,
      age: function () { return S.p ? S.p.age : 'adult'; },
      name: function () { return S.p ? S.p.name : ''; }
    });
    S.tendInit = S.id;
    return true;
  }
  function tendReady() { var w = S.id && window.GGP ? GGP.data(S.id, 'tending') : null; return !!(window.GGHealth && (window.GGTendPublic || (w && w.lib))); }
  function summary() {
    if (!tendReady() || typeof window.GGHealth.summary !== 'function') return null;
    if (S.tendInit !== S.id) initTending();
    try { var sm = window.GGHealth.summary() || null; return sm && sm.on !== false && sm.ready !== false ? sm : null; } catch (e) { return null; }
  }

  function app() { return document.getElementById('hm-app'); }
  window.addEventListener('popstate', function () { if (S.id && viewOf() !== S.view) render(); });

  /* =====================================================================
     RENDER
     ===================================================================== */
  function render() {
    var root = app(); if (!root) return;
    var a = window.GGP && GGP.active && GGP.active();
    document.body.classList.toggle('hm-bn', !!a);
    if (!a) { if (/^#(tending|privacy|more|tree|today|week|grow|library|me)/.test(location.hash)) { try { history.replaceState(null, '', location.pathname); } catch (e) {} } S.id = null; S.view = 'welcome'; closeSheet(true); root.innerHTML = welcomeHtml(); paintNav(''); afterWelcome(); return; }
    var changed = S.id !== a.id;
    S.id = a.id; S.p = GGP.get ? GGP.get(a.id) : a; S.tree = treeOfProfile(S.p);
    if (changed) { S.tendInit = false; S.words = null; S.paintedFor = null; LIB.load = null; }
    S.view = viewOf();
    // Kid profiles keep their Today and My Tree (BLD 869).
    if (isKid(S.p)) { closeSheet(true); if (location.hash === '#tree') { root.innerHTML = treeTabHtml(); paintNav('kidtree'); maybeTour(); return; } var kf = focusKey(); root.innerHTML = kidHtml(); paintNav('kid'); focusBack(kf); maybeTour(); return; }
    var wantPlan = location.hash === '#plan';
    if (wantPlan) { try { history.replaceState(null, '', location.pathname + '#today'); } catch (e) {} }
    renderApp(route());
    maybeTour();
    // BLD 893: /home/#plan opens My Grounded Way Plan; an open plan redraws with anything new (a check-in).
    if (wantPlan) openPlan(); else if (WP.open && WP.d) { WP.sug = null; if (WP.i <= 1) WP.d.prac = null; paintPlan(true); }
  }

  /* Kid profiles: a row of pills on a wide screen, a bar along the bottom on a phone (Today and My Tree). */
  function paintNav(cur) {
    var old = document.getElementById('hm-bnav'); if (old) old.remove();
    var tabs = document.getElementById('hm-tabs');
    if (!S.id || !cur) { if (tabs) tabs.innerHTML = ''; return; }
    var t = TREES[S.tree] || TREES.oak;
    var items = [['home', '#today', 'home', 'Today', 'Today'], ['tree', '#tree', 'tree', 'My ' + t.n, 'My Tree']];
    var on = cur === 'kidtree' ? 'tree' : 'home';
    if (tabs) tabs.innerHTML = items.map(function (x) { return '<a href="' + x[1] + '"' + (x[0] === on ? ' aria-current="page"' : '') + ' data-hm-nav="' + x[0] + '">' + I(x[2]) + esc(x[3]) + '</a>'; }).join('');
    var bn = document.createElement('nav'); bn.className = 'hm-bnav'; bn.id = 'hm-bnav'; bn.setAttribute('aria-label', 'The Grounded Way');
    bn.innerHTML = '<ul style="--n:' + items.length + '">' + items.map(function (x) { return '<li><a href="' + x[1] + '"' + (x[0] === on ? ' aria-current="page"' : '') + ' data-hm-nav="' + x[0] + '"><span class="ic">' + I(x[2]) + '</span><span class="l">' + esc(x[4]) + '</span></a></li>'; }).join('') + '</ul>';
    var host = document.querySelector('main.hm') || document.body; host.appendChild(bn);
  }

  /* ---------- first visit ---------- */
  function promiseHtml() {
    return '<div class="hm-promise">' +
      '<div class="hm-card hm-prom hm-p-leaves"><span class="hm-badge">' + I('eye') + '</span><div><h3 class="hm-h3">Private</h3><div class="hm-sub">Your Home is yours alone. Begin with just a name and a passcode.</div></div></div>' +
      '<div class="hm-card hm-prom hm-p-branches"><span class="hm-badge">' + I('phone') + '</span><div><h3 class="hm-h3">On Your Device</h3><div class="hm-sub">Everything stays right here, on this phone or computer.</div></div></div>' +
      '<div class="hm-card hm-prom hm-p-trunk"><span class="hm-badge">' + I('lock') + '</span><div><h3 class="hm-h3">Locked With Your Passcode</h3><div class="hm-sub">Only your passcode, or your Root Words, opens it.</div></div></div>' +
      '<div class="hm-card hm-prom hm-p-bark"><span class="hm-badge">' + I('choice') + '</span><div><h3 class="hm-h3">Everything Optional</h3><div class="hm-sub">Use what helps you. Change it any time in Settings.</div></div></div>' +
    '</div>';
  }
  var STAGES = [['maple'], ['aspen'], ['pine'], ['birch'], ['oak'], ['sequoia'], [null, 'For a Season of Life'], ['willow'], ['grove'], ['heartwood']];
  var TEND6 = [
    ['move', 'hm-a-move', 'move', 'Movement', [['leaves', 'Leaves']]],
    ['food', 'hm-a-plate', 'plate', 'Food', [['leaves', 'Leaves']]],
    ['still', 'hm-p-bark', 'lotus', 'Meditation and Mindfulness', [['bark', 'Bark']]],
    ['pray', 'hm-p-roots', 'flame', 'Prayer or Sacred Practice', [['roots', 'Roots']]],
    ['connect', 'hm-p-branches', 'people', 'Family Meals and Connection', [['branches', 'Branches']]],
    ['labs', 'hm-a-numbers', 'flask', 'Labs and Numbers', [['fruit', 'Fruit']]],
    ['sober', 'hm-a-sober', 'sun2', 'Living Sober', [['bark', 'Bark'], ['leaves', 'Leaves']]]
  ];
  function tend6Html(on, attr) {
    return '<div class="hm-tend6">' + TEND6.map(function (t) {
      var p = !!on[t[0]];
      return '<button class="hm-tg ' + t[1] + '" type="button" aria-pressed="' + p + '" ' + attr + '="' + t[0] + '"><span class="hm-badge">' + I(t[2]) + '</span><span class="tx"><span class="hm-h3" style="display:block">' + esc(t[3]) + '</span><span class="hm-pts">' + t[4].map(function (x) { return '<span class="hm-pt hm-p-' + x[0] + '">' + x[1] + '</span>'; }).join('') + '</span></span><span class="hm-sw" aria-hidden="true"></span></button>';
    }).join('') + '</div>';
  }
  function hasProfiles() { try { return GGP.list().length > 0; } catch (e) { return false; } }
  function welcomeHtml() {
    var back = window.GGP && hasProfiles();
    var hero = '<div class="hm-hero welcome"><picture><source media="(max-width:699px)" srcset="' + IMG + 'welcome-narrow.webp"><img class="art" src="' + IMG + 'welcome-wide.webp" alt="" width="1800" height="1012" fetchpriority="high"></picture>' +
      '<div class="in"><div class="hm-greet">' + I('sprout') + '<span>' + (back ? 'Welcome Back' : 'Welcome to Grounded') + '</span></div><h1>Your Home</h1>' +
      '<p>See your tree, tend your day, and keep everything you use in one calm place.</p>' +
      (back ? '<div class="hm-acts tight"><button type="button" class="hm-btn light" data-hm="open">' + I('lock') + 'Open The Grounded Way</button></div>' : '<div class="hm-acts tight"><a class="hm-btn light" href="#hm-steps">' + I('sprout') + 'Begin</a></div>') +
      '</div></div>';
    var sp = '<div class="hm-species" id="hm-species">' + STAGES.map(function (s) {
      if (!s[0]) return '<div class="hm-sp-k">' + s[1] + '</div>';
      var t = TREES[s[0]];
      return '<button class="hm-spc" type="button" aria-pressed="' + (W.stage === s[0]) + '" data-hm-stage="' + s[0] + '"><img src="' + mark(s[0]) + '" alt="" width="58" height="58"><b>' + esc(t.n) + '</b><small>' + esc(t.who) + '</small></button>';
    }).join('') + '</div>';
    var who = [['me', 'user', 'Me', 'Your own tree and your own day.'], ['family', 'people', 'My Family', 'Each person\'s tree, growing together in The Grove.'], ['other', 'love', 'Someone I Love', 'Set up their Home and stay close as their helper.']];
    var steps = '<div class="hm-steps" id="hm-steps">' +
      '<div class="hm-card hm-step hm-p-branches"><div class="hm-shd"><span class="hm-num">1</span><div><div class="hm-k">Step 1 of 3</div><h2 class="hm-h2">Who Is This For?</h2></div></div>' +
        '<div class="hm-who" role="group" aria-label="Who is this for">' + who.map(function (w) { return '<button type="button" class="hm-p-branches" aria-pressed="' + (W.who === w[0]) + '" data-hm-who="' + w[0] + '"><span class="hm-badge">' + I(w[1]) + '</span><span><b>' + w[2] + '</b><small>' + w[3] + '</small></span><span class="rd"></span></button>'; }).join('') + '</div></div>' +
      '<div class="hm-card hm-step hm-p-leaves"><div class="hm-shd"><span class="hm-num">2</span><div><div class="hm-k">Step 2 of 3</div><h2 class="hm-h2">Your Stage of Life</h2></div></div>' +
        '<p class="hm-sub" style="margin:-4px 0 12px">Your stage picks your tree. Each one is built for its season of life.</p>' + sp +
        '<div class="hm-note hm-p-leaves" style="margin-top:12px">' + I('people') + '<span id="hm-stage-note">Maple and Aspen are set up with a grown-up, who keeps a key with their own passcode.</span></div></div>' +
      '<div class="hm-card hm-step hm-p-roots"><div class="hm-shd"><span class="hm-num">3</span><div><div class="hm-k">Step 3 of 3</div><h2 class="hm-h2">What Would You Like to Tend?</h2></div></div>' +
        '<p class="hm-sub" style="margin:-4px 0 12px">Your tree check-in comes with every Home. Add any daily tending you like.</p>' + tend6Html(W.parts, 'data-hm-part') +
        '<div class="hm-go"><button class="hm-btn big hm-p-leaves" type="button" data-hm="create">' + I('lock') + 'Choose My Passcode</button><div class="hm-sub" style="text-align:center">Next: your passcode and 12 Root Words, then your first check-in.</div></div></div>' +
    '</div>';
    return '<div class="hm-wrap">' + hero + promiseHtml() +
      '<div class="hm-plink"><a class="hm-link hm-p-leaves" href="#hm-privacy">' + I('shield') + 'How your privacy works</a><span class="hm-time">' + (back ? 'New here? Three short steps' : 'Three short steps · about a minute') + '</span></div>' +
      steps + '<div style="margin-top:28px" id="hm-privacy">' + privacyBrief(false) + '</div>' + helpLine() + '</div>';
  }
  function afterWelcome() {}
  function helpLine() { return '<p class="hm-help">Need help right now? Call or text 988. In an emergency, call 911.</p>'; }

  /* Creating a profile through the real dialogs, then the Home's own choices. */
  function partsList() { return Object.keys(W.parts).filter(function (k) { return W.parts[k]; }); }
  function writeHome(id, extra) {
    if (!GGP.isOpen(id)) return Promise.resolve();
    var h = GGP.data(id, 'home');
    Object.assign(h, { created: h.created || today() }, extra || {});
    return GGP.save(id);
  }
  function create() {
    if (!window.GGP) return;
    var stage = W.stage, t = TREES[stage] || TREES.oak, kid = ['maple', 'aspen', 'pine'].indexOf(stage) >= 0;
    var mine = { who: W.who, stage: stage, parts: partsList() };
    if (t.season) mine.season = stage;
    var adultTree = stage === 'birch' || stage === 'sequoia' ? stage : 'oak';
    var hasAdult = GGP.list().some(function (p) { return p.age === 'adult'; });
    var done = function () { if (location.hash) { try { history.replaceState(null, '', location.pathname); } catch (e) {} } render(); window.scrollTo(0, 0); };
    if (kid) {
      var kidStep = function () {
        GGP.createDialog({ age: t.age, reason: t.n + ' is set up with a grown-up. Add the name your child goes by.', onCreated: function (kidId) { writeHome(kidId, { stage: stage }).then(done); } }).then(function () { done(); });
      };
      if (hasAdult) { kidStep(); return; }
      GGP.createDialog({ age: 'adult', reason: t.n + ' is set up with a grown-up. First, your own profile as the grown-up, then your child\'s.', onCreated: function (gid) {
        writeHome(gid, Object.assign({}, mine, { who: 'family', stage: 'oak' })).then(function () { setTimeout(kidStep, 300); });
      } });
      return;
    }
    if (W.who === 'other') {
      var forOther = function () {
        GGP.createDialog({ forOther: true, keepMe: true, tree: adultTree, onCreated: function (oid) { writeHome(oid, { stage: stage, parts: mine.parts, season: mine.season }).then(done); } }).then(done);
      };
      var a = GGP.active();
      if (a && a.age === 'adult') { forOther(); return; }
      GGP.createDialog({ age: 'adult', reason: 'First, your own profile, so you can stay close as their helper. Then theirs.', onCreated: function (mid) {
        writeHome(mid, { who: 'other', stage: 'oak', parts: [] }).then(function () { setTimeout(forOther, 300); });
      } });
      return;
    }
    GGP.createDialog({ age: 'adult', tree: adultTree, onCreated: function (id) { writeHome(id, mine).then(done); } });
  }

  /* ---------- the Home each day ---------- */
  function soberDate() { if (!S.id) return ''; var l = obj((GGP.data(S.id) || {}).life); return (arr(l.ids).indexOf('sober') >= 0 || l.soberDate) && l.soberDate ? l.soberDate : ''; }

  /* Your Tree */
  var LV = { strong: ['Strong', 'strong'], steady: ['Steady', 'steady'], edge: ['Growing Edge', 'edge'], unsure: ['Not sure yet', 'unsure'] };
  /* Today's Tending */
  var QUESTIONS = ['What made you laugh this week?', 'What is one thing you are looking forward to?', 'Who helped you today, and how?', 'What is something new you learned this week?', 'Where would you love to go together someday?', 'What was the best part of your day?', 'What is one kind thing you saw someone do?', 'What is a small win you had today?', 'If our family had a motto, what would it be?', 'What is a place outdoors you love to be?', 'What are you grateful for right now?', 'What is one thing you did this week that you are proud of?'];
  var CKSVG = '<span class="box"><svg viewBox="0 0 34 34"><circle class="o" cx="17" cy="17" r="15"/><path class="m" d="M10 17.5l4.6 4.6L24 12.4"/></svg></span>';
  function ckBtn(key, on, label) { return '<button class="hm-ck" type="button" aria-pressed="' + !!on + '" data-hm-ck="' + key + '">' + CKSVG + '<span class="lb">' + esc(label) + '</span></button>'; }
  function ring(size, w, v, max, mid, col) {
    return '<div class="hm-ring" data-hm-ring data-size="' + size + '" data-w="' + w + '" data-v="' + v + '" data-max="' + max + '"' + (col ? ' data-col="' + col + '"' : '') + ' data-mid="' + esc(mid) + '" style="width:' + size + 'px;height:' + size + 'px"></div>';
  }
  function paintRings(scope) {
    (scope || document).querySelectorAll('[data-hm-ring]').forEach(function (el) {
      var s = +el.dataset.size || 80, w = +el.dataset.w || 8, r = (s - w) / 2, C = 2 * Math.PI * r;
      var v = +el.dataset.v || 0, max = +el.dataset.max || 1, p = Math.max(0, Math.min(1, v / max));
      var col = el.dataset.col ? ' style="stroke:' + el.dataset.col + '"' : '';
      el.innerHTML = '<svg width="' + s + '" height="' + s + '" aria-hidden="true"><circle class="tr" cx="' + s / 2 + '" cy="' + s / 2 + '" r="' + r + '" fill="none" stroke-width="' + w + '"/><circle class="fg" cx="' + s / 2 + '" cy="' + s / 2 + '" r="' + r + '" fill="none" stroke-width="' + w + '"' + col + ' stroke-dasharray="' + C + '" stroke-dashoffset="' + C + '"/></svg><div class="mid"><div>' + el.dataset.mid + '</div></div>';
      var fg = el.querySelector('.fg');
      requestAnimationFrame(function () { requestAnimationFrame(function () { fg.style.strokeDashoffset = C * (1 - p); }); });
    });
  }
  function todayRec(h) { var d = today(); h.days[d] = obj(h.days[d]); return h.days[d]; }
  function target(x, d) { if (Array.isArray(x)) x = x[0]; var n = num(x); return n != null && n > 0 ? n : d; }

  /* Living Sober */
  function soberHtml(date) {
    var c = soberCount(date); if (!c) return '';
    var ms = medallions(date), nowS = today(), prev = null, next = null;
    ms.forEach(function (m) { if (m.at <= nowS) prev = m; else if (!next) next = m; });
    var from = prev ? prev.at : date, span = Math.max(1, between(from, next.at)), into = between(from, nowS), left = between(nowS, next.at);
    return '<article class="hm-card hm-sober hm-a-sober o4" id="hm-sober"><div class="row">' + ring(108, 10, into, span, '<b>' + (c.days + 1) + '</b><small>' + (c.days === 0 ? 'day' : 'days') + '</small>') +
      '<div style="min-width:0"><div class="dn">Living Sober</div><h3 class="hm-h3" style="font-size:28px">' + (c.days === 0 ? 'Day One' : 'Day ' + (c.days + 1)) + '</h3><div class="hm-sub">Next medallion: ' + esc(next.name) + ', in ' + left + (left === 1 ? ' day' : ' days') + '.</div></div></div>' +
      '<div class="hm-sk">Today\'s Encouragement</div><p class="words" id="hm-words">Every day counts. Today is one more.</p>' +
      '<div class="hm-smantra"><span class="hm-sk">Mantra</span><b class="hm-mtext">One day at a time.</b></div>' +
      '<div class="hm-acts tight hm-shares"><button type="button" class="hm-btn sm line hm-a-sober" data-hm-share="daily">' + I('open') + 'Share Today\'s Words</button><button type="button" class="hm-btn sm line hm-a-sober" data-hm-share="mantra">' + I('open') + 'Share the Mantra</button></div>' +
      '<div class="hm-acts"><a class="hm-btn sm hm-a-sober" href="/living-sober.html#today">' + I('sunrise') + 'Today\'s Intention</a><a class="hm-btn sm line hm-a-sober" href="/living-sober.html#wave">' + I('wind') + 'Ride the Wave</a></div></article>';
  }
  function soberInviteHtml() {
    var t = TREES[S.tree] || TREES.oak;
    return '<article class="hm-card hm-a-sober o4 hm-offer" id="hm-sober"><span class="hm-badge">' + I('sun2') + '</span><div style="flex:1;min-width:0"><div class="hm-k">Living Sober</div><div class="hm-sub">Turn on Living Sober and add your sober date in My ' + esc(t.n) + ', and your day count, words for today, and medallions show here.</div>' +
      '<div class="hm-quiet" style="margin-top:8px"><a href="' + t.href + '">Open My ' + esc(t.n) + '</a><span>·</span><a href="/living-sober.html">About Living Sober</a></div></div></article>';
  }
  /* BLD 882: the mantra of the day (Living Sober's mantras, by days since the sober date) in the hero and the Living Sober card. */
  function fillMantra() {
    if (!document.querySelector('#hm-mantra,.hm-mtext')) return;
    load(WORDS_SRC).then(function () {
      var G = window.GGSoberWords, list = G ? arr(G.mantras) : [], c = soberCount(soberDate()); if (!list.length || !c) return;
      var m = list[c.days % list.length]; S.mantra = m.text;
      document.querySelectorAll('#hm-mantra,.hm-mtext').forEach(function (el) { el.textContent = m.text; });
    });
  }
  function shareCard(kind) {
    var text = kind === 'mantra' ? (S.mantra || '') : ((document.getElementById('hm-words') || {}).textContent || '');
    if (!text) return;
    load('/shared/gg-sharecard.js?v=b839').then(function () { if (window.GGShareCard) window.GGShareCard.share({ kind: kind, text: text }); else toast('Sharing opens on Living Sober.'); });
  }
  function fillWords() {
    var el = document.getElementById('hm-words'); if (!el) return;
    load(WORDS_SRC).then(function () {
      var G = window.GGSoberWords, el2 = document.getElementById('hm-words'); if (!G || !el2) return;
      var list = arr(G.daily), c = soberCount(soberDate()); if (!list.length || !c) return;
      var st = obj((GGP.data(S.id) || {}).life).sober || '';
      for (var i = 0; i < list.length; i++) { var w = list[(c.days + i) % list.length]; if (!w.stage || !st || w.stage.indexOf(st) >= 0) { el2.textContent = w.text; return; } }
    });
  }

  /* For You Today */
  function forYouHtml(ed) {
    var part = ed && ed.lead ? ed.lead : 'none', ids = MATCH[part], id = pick(ids, dayIndex()), v = GGN[id];
    var tag = part === 'none' ? '<span>A good place to begin</span>' : '<span class="hm-pt hm-p-' + part + '">' + PART[part].n + '</span><span>' + (ed.edges.indexOf(part) >= 0 ? 'Matched to your Growing Edge' : 'Leaning toward your ' + PART[part].n) + '</span>';
    return '<article class="hm-card hm-foryou ' + (part === 'none' ? 'hm-p-leaves' : 'hm-p-' + part) + ' o5"><button type="button" class="art" data-hm-play="' + id + '" aria-label="Play ' + esc(v[0]) + '"><img src="' + IMG + ART[part] + '.webp" alt="" loading="lazy"><span class="play">' + I('play') + '</span></button>' +
      '<div class="body"><div class="hm-k">For You Today</div><h3 class="hm-h3">' + esc(v[0]) + '</h3><div class="hm-sub">A ' + (v[1] === 1 ? 'one' : v[1] === 3 ? 'three' : 'two') + ' minute practice from Get Grounded Now. ' + esc(v[2]) + '</div>' +
      '<div class="hm-match">' + tag + '</div><div class="hm-also" id="hm-also" data-part="' + part + '"></div></div></article>';
  }
  function fillAlso() {
    var el = document.getElementById('hm-also'); if (!el) return;
    var part = el.dataset.part, src = PRAC[S.tree]; if (!src || part === 'none') return;
    load(src[0]).then(function () {
      var P = window[src[1]], el2 = document.getElementById('hm-also'); if (!P || !el2) return;
      var def = arr(P.DOMAIN_DEFS).filter(function (d) { return d.key === part; })[0]; if (!def) return;
      var list = arr(def.restore).concat(arr(obj(P.NEW)[part])).filter(function (x) { return x && x[0] && !PRAC_SKIP.test(x[0]); });
      var x = pick(list, dayIndex()); if (!x) return;
      var t = TREES[S.tree];
      el2.innerHTML = 'From your ' + esc(t.n) + ' growth plan: <b>' + esc(x[0]) + '.</b> ' + esc(x[1]) + ' <a class="hm-link" href="' + t.href + '#plan">Open My Growth Plan ' + I('arrow') + '</a>';
    });
  }


  /* Your Family: kids a grown-up set up, and people they help. Progress only. */
  function familyHtml(h) {
    if (S.p.age !== 'adult') return '';
    var me = S.id, list = GGP.list();
    var kids = list.filter(function (p) { return p.id !== me && arr(p.grown).indexOf(me) >= 0; });
    var helping = GGP.helping ? GGP.helping().map(function (id) { return GGP.get(id); }).filter(Boolean) : [];
    if (!kids.length && !helping.length && h.who !== 'family' && h.who !== 'other') return '';
    var dn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var rows = kids.map(function (k) {
      var kt = k.age === 'maple' || k.age === 'aspen' || k.age === 'pine' ? k.age : 'oak', t = TREES[kt];
      var sh = obj(GGP.shared(k.id).tree), recent = arr(sh.recent).map(function (r) { return r.d; });
      var wk = '', cnt = 0;
      for (var i = 6; i >= 0; i--) { var dd = addDays(today(), -i), f = recent.indexOf(dd) >= 0; if (f) cnt++; wk += '<span class="' + (f ? 'f' : '') + '"><i>' + (f ? '✓' : '') + '</i>' + dn[parse(dd).getDay()] + '</span>'; }
      var open = GGP.isOpen(k.id), ck = open ? lastCheckin(k.id, kt) : null, set = [];
      if (ck) set.push('<div class="hm-row hm-p-leaves"><span class="ic2">' + I('check') + '</span><div class="tx"><b>Last check-in ' + esc(niceDay(ck.date)) + '</b><small>' + (kt === 'maple' ? 'Done together, as Maple asks' : 'Kept in ' + esc(k.name) + '\'s own tree') + '</small></div></div>');
      set.push('<div class="hm-row hm-p-fruit"><span class="ic2">' + I('star') + '</span><div class="tx"><b>' + cnt + (cnt === 1 ? ' day' : ' days') + ' tended this week</b><small>' + (sh.season ? 'Season ' + sh.season + (sh.rings ? ', ' + sh.rings + (sh.rings === 1 ? ' ring' : ' rings') : '') : 'Days tended show here as ' + esc(k.name) + ' tends') + '</small></div></div>');
      if (open && kt === 'maple') { var kw = obj(obj(GGP.data(k.id, 'maple')).kid).wording === 'plain' ? 'Plain' : 'Faith'; set.push('<div class="hm-row hm-p-roots"><span class="ic2">' + I('feather') + '</span><div class="tx"><b>Wording: ' + kw + '</b><small>Set by you, in ' + esc(k.name) + '\'s Maple settings.</small></div></div>'); }
      set.push('<div class="hm-row hm-p-trunk"><span class="ic2">' + I('key') + '</span><div class="tx"><b>' + (open ? 'Your passcode opens ' + esc(k.name) + '\'s ' + t.n : 'Only ' + esc(k.name) + '\'s passcode opens ' + t.n) + '</b><small>' + (open ? 'You set it up together, so you keep the key.' : 'You see days tended here. Answers stay with ' + esc(k.name) + '.') + '</small></div></div>');
      return '<div class="hm-kidrow"><div class="hm-kidhd"><img src="' + mark(kt) + '" alt=""><h3 class="hm-h3">' + esc(k.name) + '\'s ' + t.n + '</h3></div><div class="hm-week7" aria-label="Days tended this week">' + wk + '</div><div class="hm-set" style="margin-top:10px">' + set.join('') + '</div>' +
        '<div class="hm-acts"><a class="hm-btn hm-p-leaves" href="' + t.href + '">' + I(open ? 'lock' : 'tree') + 'Open ' + esc(k.name) + '\'s ' + t.n + '</a></div></div>';
    });
    helping.forEach(function (p) {
      var t = TREES[p.tree] || TREES.oak;
      rows.push('<div class="hm-kidrow"><div class="hm-kidhd"><img src="' + mark(p.tree || 'oak') + '" alt=""><h3 class="hm-h3">' + esc(p.name) + '\'s ' + t.n + '</h3></div><p class="hm-sub" style="margin-top:6px">You are ' + esc(p.name) + '\'s helper. You see what ' + esc(p.name) + ' chooses to share.</p>' +
        '<div class="hm-acts"><a class="hm-btn hm-p-leaves" href="' + t.href + '#for=' + encodeURIComponent(p.id) + '">' + I('love') + 'Open ' + esc(p.name) + '\'s ' + t.n + '</a></div></div>');
    });
    var add = '<div class="hm-quiet" style="margin-top:12px"><button type="button" data-hm="addkid">' + I('plus') + ' Add a Family Member</button><span>·</span><button type="button" data-hm="addlove">Set Up a Profile for Someone I Love</button></div>';
    return '<article class="hm-card hm-p-leaves o7" id="hm-family"><div class="hm-hd"><span class="hm-badge">' + I('people') + '</span><div><div class="hm-k">Your Family</div><div class="hm-sub">' + (rows.length ? 'Progress at a glance: days tended, check-ins, and rings. Answers and words stay inside each tree.' : 'Add the people you tend with. Each one has a tree of their own.') + '</div></div></div>' + rows.join('') + add + '</article>';
  }

  /* ---------- Settings and Privacy ---------- */
  function privacyBrief(open) {
    return '<div class="hm-lay c2"><article class="hm-card hm-priv hm-p-leaves"><div class="hm-pv-hd"><span class="hm-badge">' + I('shield') + '</span><div><div class="hm-k">' + (open ? 'Settings and Privacy' : 'How Your Privacy Works') + '</div><h2 class="hm-h2" style="font-size:34px">Your Home Stays Yours</h2></div></div>' +
      '<div class="hm-set" style="margin-top:10px">' +
        '<div class="hm-row hm-p-leaves"><span class="ic2">' + I('eye') + '</span><div class="tx"><b>What is kept</b><small>Your name and picture, your check-ins and growth plan, the days you tend, your Tending plan, your Living Sober count, and any lab numbers you add.</small></div></div>' +
        '<div class="hm-row hm-p-branches"><span class="ic2">' + I('phone') + '</span><div class="tx"><b>Where it lives</b><small>Only on this device, in this browser, locked with your passcode. You hold the only key.</small></div></div>' +
        '<div class="hm-row hm-p-trunk"><span class="ic2">' + I('key') + '</span><div class="tx"><b>Root Words</b><small>Twelve plain words that open your Home again if you forget your passcode. Keep them somewhere safe.</small></div></div>' +
        '<div class="hm-row hm-p-roots"><span class="ic2">' + I('save') + '</span><div class="tx"><b>Save a Backup</b><small>One locked file you keep in your files, iCloud, or a drive. It opens with your passcode.</small></div></div>' +
        '<div class="hm-row hm-p-bark"><span class="ic2">' + I('swap') + '</span><div class="tx"><b>Move to a New Phone</b><small>Save a Backup here, then on the new phone choose Open a Backup and enter your passcode. Your tree comes with you.</small></div></div>' +
        '<div class="hm-row hm-p-fruit"><span class="ic2">' + I('gear') + '</span><div class="tx"><b>Start Fresh</b><small>Manage My Profile removes a profile and its saved days from this device for good. Save a backup first to keep anything.</small></div></div>' +
      '</div>' +
      (open ? '<div class="hm-acts"><button class="hm-btn hm-p-leaves" type="button" data-hm="backup">' + I('save') + 'Save a Backup</button><button class="hm-btn line hm-p-leaves" type="button" data-hm="restore">' + I('open') + 'Open a Backup</button></div>' +
        '<div class="hm-acts">' + (GGP.rootState && GGP.rootState(S.id) ? '<button class="hm-btn line hm-p-trunk" type="button" data-hm="rootwords">' + I('key') + 'See My Root Words</button>' : '') + '<button class="hm-btn line hm-p-fruit" type="button" data-hm="manage">' + I('gear') + 'Manage My Profile</button><button class="hm-btn line hm-p-branches" type="button" data-hm="lock">' + I('lock') + 'Lock</button></div>' : '') +
      '</article><div class="hm-col">' +
        '<article class="hm-card hm-a-numbers"><div class="hm-hd"><span class="hm-badge">' + I('heart') + '</span><div><div class="hm-k">A Note on Health Numbers</div><h3 class="hm-h3">Talk It Over With Your Doctor</h3></div></div><div class="hm-sub">Plate rings, lab lines, and progress paths are research-informed estimates. They are here to help you notice and plan, and to bring to your doctor. Grounded offers guidance and support, and your doctor guides your medical choices.</div></article>' +
        '<article class="hm-card hm-p-trunk"><div class="hm-hd"><span class="hm-badge">' + I('people') + '</span><div><div class="hm-k">Kids and Helpers</div><h3 class="hm-h3">A Key for Those Who Help</h3></div></div><div class="hm-sub">Maple and Aspen are set up with a grown-up, who keeps a key with their own passcode. In Birch, Sequoia, and Willow, a helper sees only what the person chooses to share.</div></article>' +
        '<article class="hm-card hm-p-leaves"><div class="hm-hd"><span class="hm-badge">' + I('lock') + '</span><div><div class="hm-k">Locked Tight</div><h3 class="hm-h3">How the Lock Works</h3></div></div><div class="hm-sub">Your saved data is sealed with its own key (AES 256). That key is locked with your passcode, and again with your Root Words, so either one opens it.</div><div class="hm-quiet" style="margin-top:10px"><a href="/privacy.html">Read the full Privacy Policy</a></div></article>' +
      '</div></div>';
  }

  /* ---------- BLD 869: My Tree, a tab of the app (the person's own tree, inside) ---------- */
  function treeTabHtml() {
    var t = TREES[S.tree] || TREES.oak;
    return '<div class="hm-treetab"><nav class="hm-tabs" id="hm-tabs" aria-label="The Grounded Way"></nav><iframe class="hm-tree-if" src="' + t.href + '" title="My ' + esc(t.n) + '" allow="fullscreen; autoplay; clipboard-write" allowfullscreen></iframe></div>';
  }

  /* BLD 882: the practices a kid chose in their tree's growth plan, each with a done circle, in their tree's words.
     BLD 885: Every day ones first, then This week (done once this week), then Sometimes, each with How and a rhythm chip. */
  function kidLi(x, when) {
    var open = !!S.how[x.key];
    return '<li class="hm-kp' + (x.done ? ' done' : '') + (open ? ' open' : '') + '" style="--kp:' + KP[x.part] + ';--c:' + KP[x.part] + '" data-hm-card="' + esc(x.key) + '"><div class="hm-kprow"><button type="button" class="hm-kdc" data-hm-done="' + esc(x.key) + '" aria-pressed="' + !!(x.pressed != null ? x.pressed : x.done) + '" aria-label="' + esc(x.title) + (x.done ? ', done. Tap to undo' : ', mark done') + '">' + DONE_SVG + '</button>' +
      tile(x.image, 'sm') + '<span class="tx"><b>' + esc(x.title) + '</b><small>' + esc(when || x.when) + '</small></span></div>' +
      '<div class="hm-kbar">' + howBtn(x, 'hm-khowb') + rchipHtml(x) + '</div>' + rmenuHtml(x) + howPanel(x) + '</li>';
  }
  function kidPracHtml() {
    var items = planItems(true); if (!items.length) return '';
    items.forEach(function (x, i) { x.i = i; }); items.sort(function (a, b) { return a.hour - b.hour || a.i - b.i; });
    var day = items.filter(function (x) { return x.r === 'd'; }), wk = items.filter(function (x) { return x.r === 'w' || x.r === 'f'; }), some = items.filter(function (x) { return x.r === 'n'; });
    var n = day.filter(function (x) { return x.done; }).length;
    var line = !day.length ? 'Your practices for this week and for sometimes are right here.' : n === day.length ? 'You tended every one today. Your tree is glowing!' : n ? n + ' done. Keep growing!' : 'Tap the circle when you do one.';
    wk.sort(function (a, b) { return (a.done ? 1 : 0) - (b.done ? 1 : 0) || a.i - b.i; });
    return '<div class="hm-kcard hm-kpracs" style="--c:#4FA82C"><h2 class="hm-kh">My Practices Today</h2><p class="hm-kline">' + line + '</p>' +
      (day.length ? '<ul class="hm-kpl">' + day.map(function (x) { return kidLi(x); }).join('') + '</ul>' : '') +
      (wk.length ? '<h3 class="hm-kh hm-ksub">This week</h3><p class="hm-kline">' + (wk.some(function (x) { return x.r === 'f'; }) ? 'Do each one this week, on any days you like.' : 'Do each one once this week, any day you like.') + '</p><ul class="hm-kpl">' + wk.map(function (x) { return kidLi(x, x.done ? 'Done this week! ' + (PART[x.part] || { n: '' }).n : (x.r === 'f' ? x.cnt + ' of ' + x.x + ' this week' + (x.doneToday ? ', done today!' : '') : 'This week') + ' · ' + (PART[x.part] || { n: '' }).n); }).join('') + '</ul>' : '') +
      (some.length ? '<h3 class="hm-kh hm-ksub">Sometimes</h3><p class="hm-kline">Fun to do now and then, whenever you are ready.</p><ul class="hm-kpl">' + some.map(function (x) { return kidLi(x, (x.doneToday ? 'Done today!' : x.last ? 'Last time: ' + shortDate(x.last) : 'Whenever you are ready') + ' · ' + (PART[x.part] || { n: '' }).n); }).join('') + '</ul>' : '') + '</div>';
  }

  /* ---------- Kid Home: Maple and Aspen, playful, no numbers ---------- */
  var KP = { roots: '#FF6B6B', trunk: '#FF9F1C', bark: '#9B5DE5', branches: '#00B4D8', leaves: '#6CCB3A', fruit: '#D62839' };
  function kidHtml() {
    var t = TREES[S.tree], d = now(), hr = d.getHours(), eve = hr >= 17 || hr < 5, ck = lastCheckin(S.id, S.tree), ed = edgesOf(ck), h = homeRec();
    var did = !!h.kid[today()];
    var parts = PARTS.map(function (p) {
      var lv = ck ? ed.lv[p.k] : 'unsure', love = ck && lv === 'edge';
      return '<div class="' + (love || !ck ? 'dim' : '') + '" style="--kp:' + KP[p.k] + '"><i>' + (love ? '+' : ck && lv !== 'unsure' ? '✓' : '•') + '</i>' + p.n + '</div>';
    }).join('');
    var lead = ed.edges[0] || ed.lead || 'none', id = pick(KMATCH[lead], dayIndex()), v = GGN[id];
    var line = !ck ? 'Check in with your grown-up to wake up your tree.' : ed.edges.length ? 'The + part could use a little love today.' : 'Your whole tree is growing. Great tending!';
    return '<div class="hm-wrap"><nav class="hm-tabs" id="hm-tabs" aria-label="The Grounded Way"></nav><div class="hm-lay kidlay"><div class="hm-kid">' +
      '<div class="hm-ksky"><img class="art" src="' + IMG + (eve ? 'home-evening' : 'home-morning') + '-narrow.webp" alt=""><div class="hi"><span><b>Hi, ' + esc(S.p.name) + '!</b><small>' + DAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + '</small></span></div><img class="mark" src="' + mark(S.tree) + '" alt=""></div>' +
      '<div class="hm-kin">' +
        '<div class="hm-kcard" style="--c:#FF9F1C"><h2 class="hm-kh">Your ' + t.n + ' Is Growing</h2><div class="hm-kparts">' + parts + '</div><p style="margin-top:10px;font-weight:500">' + esc(line) + '</p></div>' +
        '<div class="hm-kcard" style="--c:#9B5DE5"><div class="hm-kprac"><button type="button" class="ill" data-hm-play="' + id + '" aria-label="Play ' + esc(v[0]) + '"><img src="' + IMG + ART[lead] + '.webp" alt=""><span>' + I('play') + '</span></button><div><h3 class="hm-kh">Today: ' + esc(v[0]) + '</h3><p>' + esc(v[2]) + '</p></div></div>' +
          '<button class="hm-kbtn" type="button" style="margin-top:12px" data-hm="kiddid" aria-pressed="' + did + '">' + I('check') + (did ? 'You Did It!' : 'We Did It!') + '</button></div>' +
        kidPracHtml() +
        (did ? '<div class="hm-kcard hm-surprise" style="--c:#00B4D8"><svg viewBox="0 0 52 52" aria-hidden="true"><g class="bird"><ellipse cx="26" cy="30" rx="13" ry="10" fill="#00B4D8"/><circle cx="34" cy="22" r="7" fill="#00B4D8"/><circle cx="36" cy="21" r="1.6" fill="#2C1810"/><path d="M40 22l6 2-6 2z" fill="#FF9F1C"/><path d="M16 28c4-6 10-6 14-2-5 1-9 3-14 2z" fill="#0090B0"/></g><path d="M8 44h36" stroke="#8A5A36" stroke-width="4" stroke-linecap="round"/></svg><div><h3 class="hm-kh" style="font-size:20px">A visitor came to your tree!</h3><div style="font-size:15px;font-weight:500">A little bird stopped by because you tended your tree today.</div></div></div>' : '') +
        '<a class="hm-kbtn" href="' + t.href + '" style="--c:#4FA82C">' + I('people') + 'Check In With My Grown-up</a>' +
        '<button type="button" class="hm-khow" data-hm="tour">' + I('sprout') + 'How It Works</button>' +
      '</div></div></div></div>';
  }

  /* =====================================================================
     BLD 881: The Grounded Way, top shelf. Four tabs for a grown-up profile (Today, Week, Grow, Library) and a
     profile button (initials, top right) that opens a sheet: Numbers, Household, Settings, Privacy, Switch Profile.
     Tending (field-guide/health.js) feeds Today and Week through GGHealth.today(date), act(key), week(n),
     render(el, section, {bare: true}) and counts(). Every call is guarded: while a function is missing, the app
     falls back to what the Home did before (GGHealth.summary, open and view).
     ===================================================================== */
  var TABS = [['today', 'Today'], ['week', 'Week'], ['grow', 'Grow'], ['library', 'Library']];
  var SUBS = {
    today: { log: 'Log a Plate or a Note', tending: 'Tending' },
    week: { shop: 'Shopping List', prep: 'Sunday Together Prep' },
    library: { workouts: 'Workouts' },
    me: { numbers: 'Numbers', household: 'Household', settings: 'Settings', privacy: 'Privacy' }
  };
  // The old section names, for the fallback while GGHealth.render is missing.
  var OLDSEC = { week: 'week', log: 'plate', tending: 'today', shop: 'shop', prep: 'prep', workouts: 'move', numbers: 'numbers', settings: 'today' };
  function hasFn(n) { return !!(window.GGHealth && typeof window.GGHealth[n] === 'function'); }
  function hCall(n) { if (!hasFn(n) || !tendReady()) return undefined; if (S.tendInit !== S.id) initTending(); try { return window.GGHealth[n].apply(window.GGHealth, [].slice.call(arguments, 1)); } catch (e) { if (window.console) console.error(e); return undefined; } }
  function tendSet() { var w = S.id ? tendWrap(S.id) : null; return obj(w && obj(w.health).set); }
  function tendIsReady() { var sm = summary(); return !!(sm && sm.ready !== false); }
  function tableOf() {
    var s = tendSet(), house = obj(s.house), n = (+house.adults || 0) + arr(house.kids).length || num(s.household) || 0;
    return n > 0 && n < 30 ? Math.max(2, Math.round(n)) : 0;
  }
  function initials(name) { var w = String(name || '').trim().split(/\s+/).filter(Boolean); return ((w[0] || '?').charAt(0) + (w.length > 1 ? w[w.length - 1].charAt(0) : '')).toUpperCase(); }
  var NUMW2 = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];
  function nWord(n) { return NUMW2[n] || String(n); }
  function greetWord() { var hr = now().getHours(); return hr < 5 ? 'Good evening' : hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening'; }
  function firstName() { return String(S.p && S.p.name || '').trim().split(/\s+/)[0] || ''; }

  /* Tints: a name from Tending (quiet, move, plate, kitchen, ...) or a color; each has a light and a dark value in home.css. */
  /* BLD 881 (Chris: "use our custom images for all cards"): every card carries one of our paintings, never a drawing.
     IMAGES.md in the workshop lists each card, the painting it uses now, and the ones still to paint. */
  var HERO = '/shared/heroes/';
  var ART2 = {
    quiet: IMG + 'tend-mind.webp', move: IMG + 'tend-move.webp', meal: IMG + 'tend-fruit.webp', cook: IMG + 'tend-body.webp',
    head: IMG + 'tend-body.webp', shop: IMG + 'recipes-narrow.webp', prep: IMG + 'tend-people.webp', supp: IMG + 'tend-fruit.webp',
    spirit: IMG + 'tend-spirit.webp', people: IMG + 'tend-people.webp', start: IMG + 'welcome-narrow.webp', growth: HERO + 'page-growth-narrow.webp'
  };
  var FOOD_ROT = [IMG + 'tend-body.webp', IMG + 'tend-fruit.webp', IMG + 'tend-people.webp', IMG + 'recipes-narrow.webp'];
  function treeArt(tree, wide) { return HERO + (/^(oak|birch|sequoia|pine|maple|aspen|willow|grove)$/.test(tree) ? tree : 'oak') + (wide ? '-wide.webp' : '-phone.webp'); }
  function artFor(x) {
    var k = String(x.kind || '') + ' ' + String(x.hkey || x.key || '');
    if (x.key === 'tree') return treeArt(S.tree);
    if (x.key === 'pray') return ART2.spirit;
    if (x.key === 'talk') return ART2.people;
    if (/quiet|med/.test(k)) return ART2.quiet;
    if (/work|prac|mark|wl:|move/.test(k)) return ART2.move;
    if (/head/.test(k)) return ART2.head;
    if (/cook/.test(k)) return ART2.cook;
    if (/shop/.test(k)) return ART2.shop;
    if (/prep/.test(k)) return ART2.prep;
    if (/supp/.test(k)) return ART2.supp;
    return ART2.meal;
  }
  function tile(src, cls) { return '<span class="hm-art ' + (cls || '') + '" aria-hidden="true"><img src="' + src + '" alt="" loading="lazy" decoding="async"></span>'; }
  var TINT_HEX = { '#6b4e8c': 'hm-tn-q', '#3f6f94': 'hm-tn-m', '#4e7d4a': 'hm-tn-p', '#a9562a': 'hm-tn-k', '#8b5e1a': 'hm-tn-g' };
  function tintClass(t, kind) {
    var s = String(t || '').toLowerCase();
    if (TINT_HEX[s]) return TINT_HEX[s];
    if (/^#/.test(s)) s = String(kind || '').toLowerCase();
    if (/quiet|still|med|bark|lotus/.test(s)) return 'hm-tn-q';
    if (/move|work|walk|week|sober/.test(s)) return 'hm-tn-m';
    if (/plate|lunch|food|leaves|grab/.test(s)) return 'hm-tn-p';
    if (/kitchen|dinner|cook|prep|bulk|head|fruit/.test(s)) return 'hm-tn-k';
    if (/roots|pray|sacred/.test(s)) return 'hm-tn-r';
    if (/branch|people|connect|talk/.test(s)) return 'hm-tn-b';
    return 'hm-tn-g';
  }

  /* ---------- routing: #today, #week, #grow, #library, #me, and #<tab>=<section> ---------- */
  function route() {
    var h = ''; try { h = decodeURIComponent(location.hash || ''); } catch (e) { h = location.hash || ''; }
    h = h.replace(/^#/, '');
    if (/^recipe-./.test(h)) return { tab: 'library', sub: '', recipe: h.slice(7) };
    var m = /^([a-z]+)(?:=([a-z0-9-]+))?$/.exec(h) || [], k = m[1] || '', sub = m[2] || '';
    if (k === 'week') return { tab: 'week', sub: SUBS.week[sub] ? sub : '' };
    if (k === 'grow' || k === 'tree') return { tab: 'grow', sub: '' };
    if (k === 'library') return { tab: 'library', sub: SUBS.library[sub] ? sub : '' };
    if (k === 'me' || k === 'more') return { tab: 'me', sub: SUBS.me[sub] ? sub : '' };
    if (k === 'privacy') return { tab: 'me', sub: 'privacy' };
    if (k === 'today') return { tab: 'today', sub: SUBS.today[sub] ? sub : '' };
    if (k === 'tending') return { tab: 'today', sub: '' };
    return { tab: 'today', sub: '' };
  }
  function viewOf() { var r = route(); return r.recipe ? 'recipe-' + r.recipe : r.tab + (r.sub ? '=' + r.sub : ''); }
  function goTo(v) {
    var hash = '#' + (v === 'home' ? 'today' : v);
    if (location.hash !== hash) location.hash = hash; else render();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', function () { if (location.hash === '#plan' && S.id) { render(); return; } if (viewOf() === S.view) return; var was = S.view; render(); if (!/^me/.test(S.view) && !/^me/.test(was || '')) window.scrollTo(0, 0); });

  /* ---------- the shell: header, the tab's own page, the tab bar ---------- */
  function headingOf(tab) {
    if (tab === 'today') return DAYS[now().getDay()];
    if (tab === 'week') { var wk = weekData(); return wk && wk.label ? weekLabel(wk.label) : 'This Week'; }
    return tab === 'grow' ? 'Grow' : 'Library';
  }
  function weekLabel(l) { l = String(l || ''); return /^week\b/i.test(l) ? l : 'Week ' + l; }
  function meBtn() { return '<button type="button" class="hm-me" data-hm="me" aria-label="Your profile, numbers, and settings" aria-haspopup="dialog">' + esc(initials(S.p && S.p.name)) + '</button>'; }
  /* BLD 882 (Chris: "bring back UI and UX"): the pre-881 Home's look is the base again. Today opens on the big bright hero
     with the day and date; Week, Grow, and Library open on a painted banner with the tab's name. */
  var BANNER = { week: ['recipes', 'Your meals, your movement, and Sunday Together Prep'], grow: ['tree', 'Your tree, its six parts, and your growth plan'], library: ['library', 'Lessons, guides, recipes, workouts, and quiet'] };
  function bannerHtml(tab) {
    var b = BANNER[tab] || BANNER.grow, wide = b[0] === 'tree' ? HERO + 'page-growth-wide.webp' : b[0] === 'recipes' ? IMG + 'recipes-wide.webp' : HERO + 'library-wide.webp', narrow = b[0] === 'tree' ? HERO + 'page-growth-narrow.webp' : b[0] === 'recipes' ? IMG + 'recipes-narrow.webp' : HERO + 'library-phone.webp';
    return '<header class="hm-ah hm-banner"><picture class="bg" aria-hidden="true"><source media="(max-width:699px)" srcset="' + narrow + '"><img src="' + wide + '" alt="" fetchpriority="high"></picture>' +
      '<div class="hm-ahl"><div class="hm-ak">The Grounded Way</div><h1 class="hm-at">' + esc(headingOf(tab)) + '</h1><p class="hm-asub">' + esc(b[1]) + '</p></div>' + meBtn() + '</header>';
  }
  function shellHtml(tab, body) {
    return '<div class="hm-app" data-tab="' + tab + '">' + (tab === 'today' ? '' : bannerHtml(tab)) +
      '<div class="hm-pane" id="hm-pane">' + body + '</div>' + helpLine() + '</div>';
  }
  function paintTabbar(cur) {
    var old = document.getElementById('hm-bnav'); if (old) old.remove();
    var tabs = document.getElementById('hm-tabs'); if (tabs) tabs.innerHTML = '';
    var bn = document.createElement('nav'); bn.className = 'hm-tabbar'; bn.id = 'hm-bnav'; bn.setAttribute('aria-label', 'The Grounded Way');
    bn.innerHTML = '<ul>' + TABS.map(function (t) { return '<li><a href="#' + t[0] + '" data-hm-tab="' + t[0] + '"' + (t[0] === cur ? ' aria-current="page"' : '') + '><span class="bar" aria-hidden="true"></span><span class="l">' + t[1] + '</span></a></li>'; }).join('') + '</ul>';
    (document.querySelector('main.hm') || document.body).appendChild(bn);
  }
  function subbarHtml(tab, sub) {
    var back = { today: 'Back to Today', week: 'Back to Week', library: 'Back to Library' }[tab];
    return '<div class="hm-subbar"><button type="button" class="hm-backbtn" data-hm-tab="' + tab + '">' + I('back') + '<span>' + back + '</span></button><h2 class="hm-h2">' + esc(SUBS[tab][sub]) + '</h2></div>';
  }
  function renderApp(r) {
    var root = app(), tab = r.tab === 'me' ? (S.under || 'today') : r.tab;
    if (r.tab !== 'me') { S.under = tab; S.sheetDepth = 0; S.sheetPushed = 0; }
    var sub = r.tab === 'me' ? '' : r.sub, body;
    if (sub) body = subbarHtml(tab, sub) + '<div id="hm-tend" class="hm-sec" data-sec="' + sub + '"><div class="hm-loading">Opening ' + esc(SUBS[tab][sub]) + '…</div></div>';
    else body = tab === 'week' ? weekHtml() : tab === 'grow' ? growHtml() : tab === 'library' ? libraryHtml() : todayHtml();
    root.innerHTML = shellHtml(tab, body);
    paintTabbar(tab);
    if (sub) paintSection(document.getElementById('hm-tend'), sub);
    else afterTab(tab);
    if (r.tab === 'me') openSheet(r.sub); else closeSheet(true);
    if (r.recipe) { try { history.replaceState(null, '', location.pathname + '#library'); } catch (e) {} S.view = 'library'; openRecipe(r.recipe); }
    if (!tendReady() || S.tendInit !== S.id) loadTending().then(function () { if (S.id && app() && S.paintedFor !== S.id + ':' + S.view) { S.paintedFor = S.id + ':' + S.view; refreshPane(); } });
  }
  function afterTab(tab) {
    if (tab === 'today') { paintRings(app()); fillAlso(); fillWords(); fillMantra(); }
    else if (tab === 'grow') { fillWords(); fillMantra(); paintRings(app()); fillFruit(); }
    else if (tab === 'library') fillLibrary();
    else if (tab === 'week') { var wb = document.querySelector('#hm-pane #hm-tend[data-sec="week"]'); if (wb) paintSection(wb, 'week'); }
  }
  /* Redraw just the page under the header (after Tending loads, or after a change), keeping the sheet. */
  function refreshPane() {
    var r = route(), tab = r.tab === 'me' ? (S.under || 'today') : r.tab, pane = document.getElementById('hm-pane'); if (!pane) return;
    var sub = r.tab === 'me' ? '' : r.sub;
    var at = document.querySelector('.hm-at'); if (at) at.textContent = headingOf(tab);
    if (sub) { var box = document.getElementById('hm-tend'); if (box && !box.querySelector('#hj-root,#hj-bare')) paintSection(box, sub); }
    else { var fk = focusKey(); pane.innerHTML = tab === 'week' ? weekHtml() : tab === 'grow' ? growHtml() : tab === 'library' ? libraryHtml() : todayHtml(); afterTab(tab); focusBack(fk); }
    var mb = document.getElementById('hm-sheet-body'); if (mb && S.sheet && !mb.querySelector('#hj-root,#hj-bare') && (S.sheet === 'numbers' || S.sheet === 'settings')) fillSheet(S.sheet);
  }

  /* A Tending section drawn into a box: GGHealth.render when it exists, otherwise the full Tending view at that section. */
  function paintSection(box, sec) {
    if (!box) return;
    loadTending().then(function () {
      if (!box.isConnected) return;
      if (!tendReady()) { box.innerHTML = tendSoonHtml(); return; }
      if (S.tendInit !== S.id) initTending();
      if (hasFn('render') && sec !== 'week') {
        S.quiet = true;
        if (sec === 'tending') S.setupFrom = tendIsReady() ? 'ready' : 'new';
        try { window.GGHealth.render(box, sec === 'tending' ? 'setup' : sec, { bare: true, onClose: function () { var r = route(); if (r.sub && r.tab !== 'me') goTo(r.tab); } }); } catch (e) { if (window.console) console.error(e); box.innerHTML = tendSoonHtml(); }
        S.quiet = false;
        return;
      }
      S.quiet = true;
      try { window.GGHealth.open(OLDSEC[sec] || 'today'); box.innerHTML = window.GGHealth.view() || tendSoonHtml(); } catch (e) { if (window.console) console.error(e); box.innerHTML = tendSoonHtml(); }
      S.quiet = false;
    });
  }
  function tendSoonHtml() {
    return '<div class="hm-card hm-p-leaves"><div class="hm-k">Tending</div><h2 class="hm-h2">Tending Opens Here</h2>' +
      '<p class="hm-sub" style="margin-top:6px">Food for your goal, movement for every level, quiet, and your own numbers, kept on this device inside your locked profile. Tending is getting ready for your Home. Your tree, check-ins, and practices are all here today.</p></div>';
  }
  /* Tending asks the Home to redraw (C.render) or to show itself (C.go). */
  function tendRender() {
    if (!S.id || !app()) return;
    var r = route();
    var box = document.getElementById('hm-tend');
    if (box && box.closest('.hm-sheet')) { if (!hasFn('render')) { try { box.innerHTML = window.GGHealth.view(); } catch (e) {} } return; }
    if (r.sub && r.tab !== 'me') { if (box && !hasFn('render')) { try { box.innerHTML = window.GGHealth.view(); } catch (e) {} } return; }
    if (r.tab === 'today' || r.tab === 'week' || (r.tab === 'me' && (S.under === 'today' || S.under === 'week'))) refreshPane();
  }
  function tendChanged() { var r0 = route(); if (r0.tab === 'today' && r0.sub === 'tending' && S.setupFrom === 'new' && tendIsReady()) { S.setupFrom = null; goTo('today'); return; } var r = route(), tab = r.tab === 'me' ? S.under : r.tab; if ((tab === 'today' || tab === 'week') && !(r.sub && r.tab !== 'me')) { clearTimeout(S.chT); S.chT = setTimeout(refreshPane, 60); } }
  function tendGo() { if (S.quiet) return; var r = route(); if (!(r.sub && r.tab !== 'me') && !(r.tab === 'me' && S.sheet)) goTo('today=tending'); }

  /* ---------- BLD 882: the Growth Plan's practices on Today ----------
     Chris (October 28, 2026): every practice chosen in the tree's Growth Plan is its own card on Today, so a person
     rarely needs the tree page except to check in and change practices. Read and written in the tree's own shapes,
     so the tree page, its progress, its seasons, and Grow all count the same marks.
       Where the plan lives (the tree's tend record, shared/gg-tend.js):
         Oak, Birch, Sequoia, Pine   GGP.data(id, <tree>).tend
         Maple                       GGP.data(id, 'maple').kid.tend
         Aspen                       GGP.data(id, 'aspen').student.tend
       tend.plan   {<part>: {selected: [names], custom: 'one name', own: [names], lib: [{k: library key, n: name}]}}
                   (before a plan is saved there, GGTend reads the latest check-in's growthPlan; so does this)
       tend.days   {'YYYY-MM-DD': {d: ['<part>|<name>', ...], n: {id: note}, e: [ids done the easier way], a: ['morning', 'evening']}}
                   GGTend.check(id) adds or takes away '<part>|<name>' in days[today].d; progress, seasons, the scene,
                   Days Tended, Hardy, and The Grove's shared line all read d. A practice record holds only its part
                   and name: no time of day, how often, or days of the week, so every practice shows every day
                   (as on the tree's own Today) and the time of day comes from its name or its part. */
  var PART_KEYS = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];
  var PRAC_ART = { roots: IMG + 'tend-spirit.webp', trunk: '/shared/heroes/page-growth-narrow.webp', bark: IMG + 'tend-mind.webp', branches: IMG + 'tend-people.webp', leaves: IMG + 'tend-move.webp', fruit: IMG + 'tend-fruit.webp' };
  var PART_SLOT = { roots: [6.9, 'Morning'], leaves: [7.6, 'Morning'], trunk: [11.8, 'Midday'], bark: [13.2, 'Midday'], branches: [18, 'Evening'], fruit: [19.8, 'Evening'] };
  var PINFO = {};
  function tendHost(id, tree) {
    if (!id || !window.GGP || !GGP.isOpen || !GGP.isOpen(id)) return null;
    var v = GGP.data(id) || {};
    if (tree === 'maple') { var m = v.maple; return m && m.kid && typeof m.kid === 'object' ? m.kid : null; }
    if (tree === 'aspen') { var a = v.aspen; return a && a.student && typeof a.student === 'object' ? a.student : null; }
    return GGP.data(id, tree);
  }
  function tendGet(id, tree, make) {
    var h = tendHost(id, tree); if (!h) return null;
    if (!h.tend || typeof h.tend !== 'object') { if (!make) return null; h.tend = {}; }
    return h.tend;
  }
  function planSize(p) { var n = 0; Object.keys(obj(p)).forEach(function (k) { var x = obj(p[k]); n += arr(x.selected).length + (x.custom ? 1 : 0) + arr(x.own).length + arr(x.lib).length; }); return n; }
  /* The plan the tree shows on its Today: tend.plan, or (Oak, Birch, Sequoia, Pine) the latest check-in's growthPlan. */
  function planOf(id, tree) {
    var t = tendGet(id, tree);
    if (t && t.plan && typeof t.plan === 'object') return t.plan;
    if (tree === 'maple' || tree === 'aspen') return null;
    var h = obj(tendHost(id, tree)), hist = arr(h.history).filter(function (e) { return e && !e.from && e.kind !== 'observed' && e.growthPlan && planSize(e.growthPlan); });
    return hist.length ? hist[hist.length - 1].growthPlan : null;
  }
  function planList(id, tree) {
    var p = planOf(id, tree), out = [], seen = {};
    if (!p) return out;
    var add = function (part, name, kind) { name = String(name || '').trim(); var pid = part + '|' + name; if (!name || seen[pid]) return; seen[pid] = 1; out.push({ part: part, name: name, pid: pid, kind: kind }); };
    PART_KEYS.forEach(function (k) {
      var x = obj(p[k]);
      arr(x.selected).forEach(function (n) { add(k, n, 'plan'); });
      if (x.custom) add(k, x.custom, 'own');
      arr(x.own).forEach(function (n) { add(k, n, 'own'); });
      arr(x.lib).forEach(function (l) { if (l && l.k) add(k, l.n, 'lib'); });
    });
    return out;
  }
  function practiceDone(t, pid, d) { var x = t && obj(t.days)[d || today()]; return !!(x && arr(x.d).indexOf(pid) >= 0); }
  /* The tree's practice library (oak, birch, sequoia, pine practices.js) for one short line on how, in the person's wording. */
  function pracInfo(tree) {
    if (PINFO[tree] !== undefined) return PINFO[tree];
    var src = PRAC[tree]; if (!src) { PINFO[tree] = null; return null; }
    PINFO[tree] = null;
    load(src[0]).then(function () {
      var P = window[src[1]], map = {}; if (!P) return;
      arr(P.DOMAIN_DEFS).forEach(function (d) {
        arr(d.restore).concat(arr(obj(P.NEW)[d.key])).forEach(function (r) {
          var row = Array.isArray(r) ? r : [r && (r.name || r.n), r && (r.text || r.t || '')];
          if (row[0] && !map[d.key + '|' + row[0]]) {
            // BLD 885: the guide's own "today" words and the library's minutes, for How while practice-rhythm.js is missing a practice.
            var gid = d.key + '|' + row[0], gd = obj(obj(P.GUIDES)[gid]).today ? obj(P.GUIDES)[gid] : obj(obj(P.G)[gid]), mt = arr(obj(obj(P.META)[d.key])[row[0]]);
            map[gid] = { line: String(row[1] || ''), today: typeof gd.today === 'string' ? gd.today : '', min: parseInt(mt[1], 10) || null };
          }
        });
      });
      Object.keys(obj(P.PLAIN)).forEach(function (k) { var pl = P.PLAIN[k] || {}; if (map[k]) { map[k].pn = pl.n || pl.name || ''; map[k].pl = pl.d || pl.line || pl.text || ''; } });
      PINFO[tree] = map;
      if (S.id && app() && S.tree === tree) { if (isKid(S.p)) render(); else refreshPane(); }
    });
    return null;
  }
  function plainWording(id, tree) { var h = obj(tendHost(id, tree)); return h.wording === 'plain'; }
  function slotOf(part, name, line) {
    var n = String(name || '').toLowerCase(), l = String(line || '').toLowerCase();
    if (/\b(morning|wake|waking|sunrise|dawn|breakfast)\b/.test(n) || /\b(each|every|this) morning\b|first thing/.test(l)) return [7, 'Morning'];
    if (/\b(lunch|midday|noon)\b/.test(n)) return [12, 'Midday'];
    if (/\b(evening|night|bed|bedtime|sleep|wind down|examen|sunset|dinner)\b/.test(n) || /before bed|bedtime|\bat night\b|each night|every night|tonight/.test(l)) return [21, 'Evening'];
    return PART_SLOT[part] || [12, 'Any time'];
  }
  function practiceArt(part, name) {
    if (part === 'leaves' && /\b(eat|food|meal|water|nourish|cook|vegetable|fruit|plate|kitchen)\b/i.test(name)) return IMG + 'tend-body.webp';
    return PRAC_ART[part] || IMG + 'tend-mind.webp';
  }
  /* Today's cards for the plan, for any tree. kid: Maple and Aspen wording. */
  function planItems(kid) {
    var tree = S.tree, list = planList(S.id, tree); if (!list.length) return [];
    var t = tendGet(S.id, tree), info = pracInfo(tree) || {}, plain = plainWording(S.id, tree);
    return list.map(function (it) {
      var pi = info[it.pid] || {}, line = plain && pi.pl ? pi.pl : pi.line || '', title = plain && pi.pn ? pi.pn : it.name, sl = slotOf(it.part, it.name, line), P = PART[it.part] || { n: '' };
      var sub = line || (it.kind === 'own' ? 'Your own practice, from your growth plan.' : it.kind === 'lib' ? 'From the practice library, in your growth plan.' : kid ? 'A practice for your ' + P.n + '. Check it off when you do it.' : 'A practice for your ' + P.n + ', from your growth plan.');
      // BLD 885: its rhythm (the person's choice, then practice-rhythm.js, then daily), its steps and minutes, and when it was done.
      var rf = rhythmFull(it.pid, tree), r = rf.r, ri = rhythmInfo(tree, it.pid) || {};
      var steps = arr(ri.how).filter(function (z) { return typeof z === 'string' && z.trim(); });
      var dToday = practiceDone(t, it.pid), dw = r === 'w' || r === 'f' ? doneThisWeek(t, it.pid) : '', cnt = r === 'f' ? weekCount(t, it.pid) : 0, full = r === 'w' ? !!dw : r === 'f' ? cnt >= rf.x : dToday;
      return { key: 'p:' + it.pid, pid: it.pid, part: it.part, src: 'plan', hour: sl[0], when: sl[1] + ' · ' + P.n, title: title, sub: sub, btn: 'How', tint: it.part, done: full, pressed: full || dToday, x: rf.x, cnt: cnt, image: practiceArt(it.part, it.name),
        r: r, steps: steps, howTxt: steps.length ? '' : (plain && pi.pl ? pi.pl : pi.today || line), min: num(ri.min) || pi.min || null, doneToday: dToday, doneWeek: dw, last: lastDone(t, it.pid), kid: !!kid };
    });
  }
  /* A practice checked or unchecked: the same mark GGTend.check makes, saved in the locked profile. */
  function togglePractice(pid, on, inTree) {
    var tree = inTree || S.tree, t = tendGet(S.id, tree, true); if (!t) return false;
    if (!t.plan) { var p = planOf(S.id, tree); if (p) t.plan = JSON.parse(JSON.stringify(p)); }
    if (!t.days || typeof t.days !== 'object') t.days = {};
    var d = today(), x = t.days[d];
    if (!x || typeof x !== 'object') x = t.days[d] = { d: [], n: {}, e: [], a: [] };
    ['d', 'e', 'a'].forEach(function (f) { if (!Array.isArray(x[f])) x[f] = []; });
    if (!x.n || typeof x.n !== 'object') x.n = {};
    var i = x.d.indexOf(pid);
    if (on && i < 0) x.d.push(pid); else if (!on && i >= 0) x.d.splice(i, 1);
    // BLD 885: a weekly practice undone takes away this week's mark, whichever day it was made.
    var rr = rhythmOf(pid, tree);
    // BLD 885: a few times a week, undone on a day with no mark today: the latest mark this week steps back.
    if (!on && rr === 'f' && i < 0) { var wd = weekDays().filter(function (k) { return k <= d; }).reverse(); for (var q = 0; q < wd.length; q++) { var z = t.days[wd[q]]; if (z && Array.isArray(z.d) && z.d.indexOf(pid) >= 0) { z.d.splice(z.d.indexOf(pid), 1); break; } } }
    if (!on && rr === 'w') weekDays().forEach(function (k) { var y = t.days[k]; if (y && Array.isArray(y.d)) { var j = y.d.indexOf(pid); if (j >= 0) y.d.splice(j, 1); } });
    publishTree(S.id, tree, t);
    if (!S.quietSave) saveHome();
    return true;
  }
  /* The big picture the tree shares with family and The Grove (the same line GGTend writes when a practice is checked). */
  function publishTree(id, tree, t) {
    try {
      if (!GGP.setShared || !GGP.shared) return;
      var old = obj(obj(GGP.shared(id)).tree);
      if (t.groveShow === false || old.show === false) return;
      var tended = function (k) { var x = t.days[k]; return !!(x && ((x.d && x.d.length) || (x.a && x.a.length))); };
      var recent = [], d = today();
      for (var i = 0; i < 14; i++) { var k = addDays(d, -i), x = t.days[k]; if (!x || !tended(k)) continue; var set = {}; arr(x.d).forEach(function (pk) { set[String(pk).split('|')[0]] = 1; }); recent.push({ d: k, parts: Object.keys(set) }); }
      var days = Object.keys(t.days).filter(tended).length;
      GGP.setShared(id, { tree: Object.assign({}, old, { tool: tree, show: true, days: days, rings: typeof old.rings === 'number' ? old.rings : arr(t.rings).length, season: t.season || old.season || 1, recent: recent, updated: d }) });
    } catch (e) { /* the shared line waits for the tree page */ }
  }

  /* ---------- BLD 892: one card, two credits (shared/gg-fills.js) ----------
     Chris (October 29, 2026): "we will not see Meditation twice, but this Meditation practice will become the main and
     fulfill the checkin practices from the tree's growth plan". A growth plan practice and a planned Tending session
     that fills it become one card: the session's title, "For your Oak growth plan" under it, and Play. Done credits
     both: the tree's day mark (the same mark GGTend.check makes, so Days Tended, Hardy, and The Grove's shared line
     count it) and the Tending log. The same practice in the person's other grown-up trees is credited too. A practice
     with no matching session today keeps its own card with Play a Guided One, which plays a session that fills it and
     credits the practice when the session finishes. The practice's rhythm still decides when it shows: a weekly or a
     few times a week practice joins the card until its week is full; a Now and Then practice stays in Grow.
     A session finished anywhere in Tending credits its practices once a day (home days[date].fill remembers each
     'tree:part|Name' credited, so a mark taken away on the tree page stays away). Kids' trees keep their own cards. */
  var FILL_TREES = ['oak', 'birch', 'sequoia', 'pine'];
  S.fillWait = null;
  function fillsOn() { return !!(window.GGFills && hasFn('fill') && hasFn('guided')) && !isKid(S.p) && FILL_TREES.indexOf(S.tree) >= 0; }
  function fillRule(x) { return GGFills.fillsFor(x.pid, null, S.tree); }
  function tendLogged(key) { var w = S.id ? tendWrap(S.id) : null, l = obj(obj(obj(w && w.health).log)[today()]); return +l[key] || 0; }
  /* The same practice in the person's other grown-up trees, for one card that credits each. */
  function otherFills(s) {
    var out = [], all = obj(window.GGP && GGP.data(S.id));
    // Read only the trees this profile already has (GGP.data(id, tree) would make an empty record for the others).
    FILL_TREES.forEach(function (tr) { if (tr === S.tree || !all[tr] || typeof all[tr] !== 'object') return; planList(S.id, tr).forEach(function (it) { if (GGFills.fills(it.pid, s, tr)) out.push({ tree: tr, pid: it.pid }); }); });
    return out;
  }
  function fillLine(others) {
    var L = [S.tree]; arr(others).forEach(function (o) { if (L.indexOf(o.tree) < 0) L.push(o.tree); });
    L = L.map(function (t) { return (TREES[t] || { n: t }).n; });
    return 'For your ' + (L.length > 1 ? L.slice(0, -1).join(', ') + ' and ' + L[L.length - 1] + ' growth plans' : L[0] + ' growth plan');
  }
  /* Pair today's Tending sessions with the plan practices they fill; a paired practice rides inside its session's card. */
  function mergeFills(items, plan) {
    if (!fillsOn() || !plan.length) return;
    var tend = items.filter(function (x) { return x.src === 'tend' && x.hkey; });
    tend.forEach(function (x) { x.fill = hCall('fill', x.hkey, today()) || null; });
    tend = tend.filter(function (x) { return x.fill; });
    plan.forEach(function (p) {
      if (p.r === 'n' || (p.done && !p.doneToday) || !fillRule(p)) return;
      var it = GGFills.match(p, tend, S.tree); if (!it) return;
      p.filledBy = it.key; (it.pairs = it.pairs || []).push(p);
    });
    tend.forEach(function (x) {
      if (!x.pairs) return;
      x.others = otherFills(x.fill); x.btn = 'Play'; x.ftitle = x.fill.title || x.title; x.forLine = fillLine(x.others); x.tendDone = x.done;
      x.done = x.done || x.pairs.every(function (p) { return p.doneToday; });
    });
  }
  function fillCredits(x) { return x.pairs.map(function (p) { return { tree: S.tree, pid: p.pid }; }).concat(arr(x.others)); }
  /* A session finished in Tending (or through Play a Guided One) credits its practices, once a day each. */
  function syncFills(items) {
    if (!S.id || !fillsOn()) return;
    var h = homeRec(), ch = false;
    var mark = function (L) { var rec = todayRec(h), got = false; rec.fill = obj(rec.fill); L.forEach(function (o) { var k = o.tree + ':' + o.pid; if (rec.fill[k]) return; rec.fill[k] = 1; if (togglePracticeQuiet(o.pid, true, o.tree)) got = true; }); return got; };
    items.forEach(function (x) { if (x.pairs && x.tendDone && mark(fillCredits(x))) { ch = true; x.done = true; x.pairs.forEach(function (p) { p.doneToday = true; }); } });
    var w = S.fillWait;
    if (w && w.date !== today()) S.fillWait = w = null;
    if (w && tendLogged(w.done) >= w.since) { S.fillWait = null; if (mark(w.list)) { ch = true; toast('Your growth plan practice is tended too.'); } }
    if (ch) { pruneDays(h); saveHome(); }
  }
  /* togglePractice without its own save (syncFills saves once). */
  function togglePracticeQuiet(pid, on, tree) { var was = S.quietSave; S.quietSave = true; try { return togglePractice(pid, on, tree); } finally { S.quietSave = was; } }
  /* Done on a paired card: the Tending log and every practice it fills, together. */
  function fillDone(x, on) {
    if (!!x.tendDone !== on) tendMark(x, on);
    var h = homeRec(), rec = todayRec(h); rec.fill = obj(rec.fill);
    fillCredits(x).forEach(function (o) { togglePracticeQuiet(o.pid, on, o.tree); var k = o.tree + ':' + o.pid; if (on) rec.fill[k] = 1; else delete rec.fill[k]; });
    pruneDays(h); saveHome();
  }
  /* Tending marks its own items: GGHealth.done(key) when it exists, otherwise toggle(key), otherwise act(key, 'done'). */
  function tendMark(x, on) { if (hasFn('done')) hCall('done', x.hkey, on); else if (hasFn('toggle')) hCall('toggle', x.hkey); else hCall('act', x.hkey, 'done'); }
  /* Play a Guided One on a practice with no session today: the best session that fills it (GGFills.pick). */
  function guideFor(plan) {
    if (!fillsOn()) return;
    var list = null;
    plan.forEach(function (p) {
      if (p.filledBy || p.done || !fillRule(p)) return;
      if (!list) list = arr(hCall('guided'));
      var g = GGFills.pick(p.pid, list, S.tree); if (g) p.guide = g;
    });
  }
  function guideBtn(x) { return x.guide && !x.done ? '<button type="button" class="hm-btn sm hm-pill hm-gplay" data-hm-fplay="' + esc(x.key) + '" aria-label="Play a Guided One: ' + esc(x.guide.title) + '">' + I('play') + 'Play a Guided One</button>' : ''; }
  function playGuided(key) {
    var x = (todayItems().plan || []).filter(function (p) { return p.key === key; })[0], g = x && x.guide; if (!g) return;
    S.fillWait = { list: [{ tree: S.tree, pid: x.pid }].concat(otherFills(g)), done: g.done, since: Date.now(), date: today() };
    hCall('act', g.key);
  }
  function fillCardHtml(x) {
    var sub = String(x.sub || ''), t = String(x.ftitle || x.title);
    if (sub.indexOf(t + '. ') === 0) sub = sub.slice(t.length + 2);
    return '<article class="hm-titem hm-card edge lift hm-fill ' + tintClass(x.tint, x.kind) + (x.done ? ' done' : '') + '" data-hm-card="' + esc(x.key) + '">' +
      '<div class="hm-pc"><div class="scene"><img src="' + esc(x.image || artFor(x)) + '" alt="" loading="lazy" decoding="async"></div><div class="bd tx">' +
      '<span class="hm-time ey">' + esc(x.when) + '</span><b class="hm-h3">' + esc(t) + '</b>' +
      '<span class="hm-fillfor">' + I('tree') + esc(x.forLine) + '</span>' + (sub ? '<small class="hm-meta">' + esc(sub) + '</small>' : '') +
      '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-go="' + esc(x.key) + '">' + I('play') + 'Play</button>' + doneBtn(x) + '</div></div></div></article>';
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-hm-fplay]'); if (!t || !t.closest('.hm')) return;
    playGuided(t.getAttribute('data-hm-fplay'));
  });

  /* ---------- BLD 885: practices with a rhythm ----------
     Chris (October 28, 2026): How opens right on the card (no new page, no searching), and each practice sits where its
     rhythm puts it. Daily practices fill the day. Weekly ones live in This Week (Today and the Week tab) until done once
     in the Monday to Sunday week, then step aside as done this week. Now and Then ones live in Grow under When You're
     Ready, with one gentle card on Today when one has rested 30 days. A small chip on each card changes its rhythm,
     saved in the home record (rhythm), never in the tree's data. The marks are the tree's own (tend.days[date].d), so a
     weekly practice done on any day this week counts as done this week. Until shared/practice-rhythm.js arrives, or for
     a practice it lacks, a practice is daily and How shows its own words from the tree's practice library. */
  var RH = { d: 'Daily', f: 'A Few Times a Week', w: 'Weekly', n: 'Now and Then' }, KRH = { d: 'Every day', f: 'A few times this week', w: 'This week', n: 'Sometimes' };
  var RORDER = ['d', 'f', 'w', 'n'];
  S.how = {}; S.rmenu = null;
  function okR(r) { return r === 'd' || r === 'w' || r === 'n' || r === 'f'; }
  function clampX(v) { var n = parseInt(v, 10); return n >= 2 && n <= 5 ? n : 3; }
  /* {r, x}: the person's choice (rhythm[pid] is 'd', 'w', 'n', or 'f' with its times a week, like 'f3'), then practice-rhythm.js, then daily. */
  function rhythmFull(pid, tree) {
    var info = rhythmInfo(tree || S.tree, pid), own = S.id && window.GGP ? obj(homeRec().rhythm)[pid] : null, m = /^([dwnf])([2-5])?$/.exec(String(own || ''));
    if (m) return { r: m[1], x: m[1] === 'f' ? (m[2] ? +m[2] : info && info.r === 'f' ? clampX(info.x) : 3) : 1 };
    if (info && okR(info.r)) return { r: info.r, x: info.r === 'f' ? clampX(info.x) : 1 };
    return { r: 'd', x: 1 };
  }
  function weekCount(t, pid) { var td = today(); return weekDays().filter(function (k) { return k <= td && practiceDone(t, pid, k); }).length; }
  function rhythmInfo(tree, pid) { var R = window.GG_RHYTHM; if (!R || typeof R !== 'object') return null; var x = obj(R[tree])[pid]; return x && typeof x === 'object' ? x : null; }
  function rhythmOf(pid, tree) {
    return rhythmFull(pid, tree).r;
  }
  function weekDays() { var td = today(), off = (parse(td).getDay() + 6) % 7, st = addDays(td, -off), out = []; for (var i = 0; i < 7; i++) out.push(addDays(st, i)); return out; }
  function doneThisWeek(t, pid) { var td = today(), got = ''; weekDays().forEach(function (k) { if (k <= td && practiceDone(t, pid, k)) got = k; }); return got; }
  function lastDone(t, pid) { var td = today(), best = ''; Object.keys(obj(t && t.days)).forEach(function (k) { if (/^\d{4}-\d{2}-\d{2}$/.test(k) && k <= td && k > best && practiceDone(t, pid, k)) best = k; }); return best; }
  function hid(key) { var s = String(key), h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return 'hm-how-' + s.replace(/[^A-Za-z0-9]+/g, '-').slice(0, 40) + '-' + (h >>> 0).toString(36); }
  function minsLine(m) { return m ? '<span class="hm-howmin">' + I('clock') + 'About ' + m + (m === 1 ? ' minute' : ' minutes') + '</span>' : ''; }
  function hDoneBtn(x) {
    var lb = x.r === 'w' ? (x.done ? 'Done this week' : 'Done for this week') : x.r === 'f' ? (x.done ? 'Done this week' : x.doneToday ? 'Done today' : 'Done') : 'Done';
    return '<button class="hm-ck" type="button" aria-pressed="' + !!(x.pressed != null ? x.pressed : x.done) + '" data-hm-hdone="' + esc(x.key) + '" aria-label="' + esc(x.title) + (x.done ? ', done. Tap to undo' : ', mark done') + '">' + CKSVG + '<span class="lb" aria-hidden="true">' + esc(lb) + '</span></button>';
  }
  /* How, right on the card: the steps (or the practice's own words), about how long, and Done. */
  function howPanel(x) {
    var body = x.steps && x.steps.length ? '<ol class="hm-howl">' + x.steps.map(function (z) { return '<li>' + esc(z) + '</li>'; }).join('') + '</ol>'
      : '<p class="hm-howp">' + esc(x.howTxt || (x.kid ? 'Try it with your grown-up, your own way. Tap the circle when you do it.' : x.sub || 'Do it your own way, a few quiet minutes at a time.')) + '</p>';
    return '<div class="hm-how" id="' + hid(x.key) + '" role="region" aria-label="How to do ' + esc(x.title) + '"><div class="hm-how-in"><div class="hm-how-box">' +
      '<div class="hm-how-hd"><span class="hm-how-k">' + (x.kid ? 'How to do it' : 'How') + '</span>' + minsLine(x.min) + '</div>' + body + '<div class="hm-how-ft">' + hDoneBtn(x) + '</div></div></div></div>';
  }
  function howBtn(x, cls) { var open = !!S.how[x.key]; return '<button type="button" class="' + (cls || 'hm-btn sm hm-pill hm-howbtn') + '" data-hm-how="' + esc(x.key) + '" aria-expanded="' + open + '" aria-controls="' + hid(x.key) + '">' + I('book') + 'How</button>'; }
  function rchipHtml(x) { var L = x.kid ? KRH : RH, open = S.rmenu === x.key; return '<button type="button" class="hm-rchip" data-hm-rchip="' + esc(x.key) + '" aria-expanded="' + open + '" aria-controls="' + hid(x.key) + '-r" aria-label="' + esc(L[x.r]) + '. Change how often">' + esc(L[x.r]) + I('down') + '</button>'; }
  function rmenuHtml(x) {
    var L = x.kid ? KRH : RH, open = S.rmenu === x.key;
    return '<div class="hm-rmenu" id="' + hid(x.key) + '-r" role="group" aria-label="How often for ' + esc(x.title) + '"' + (open ? '' : ' hidden') + '><span class="hm-rk">' + (x.kid ? 'How often?' : 'How Often') + '</span>' +
      RORDER.map(function (r) { return '<button type="button" data-hm-rset="' + esc(x.key) + '|' + r + '" aria-pressed="' + (x.r === r) + '">' + esc(L[r]) + '</button>'; }).join('') + '</div>';
  }
  /* A practice's card (Today, This Week, Week, Grow): the painting, its time, How, Done, and the rhythm chip. */
  function pracCardHtml(x, opt) {
    opt = opt || {};
    var open = !!S.how[x.key];
    return '<article class="hm-titem hm-card edge lift hm-prac ' + tintClass(x.tint, x.kind) + (x.done ? ' done' : '') + (open ? ' open' : '') + (opt.cls ? ' ' + opt.cls : '') + '" data-hm-card="' + esc(x.key) + '">' +
      '<div class="hm-pc"><div class="scene"><img src="' + esc(x.image || artFor(x)) + '" alt="" loading="lazy" decoding="async"></div><div class="bd tx">' +
      '<span class="hm-time ey">' + esc(opt.when || x.when) + '</span><b class="hm-h3">' + esc(x.title) + '</b>' + (x.sub && !opt.nosub ? '<small class="hm-meta">' + esc(x.sub) + '</small>' : '') +
      '<div class="hm-acts tight">' + howBtn(x) + doneBtn(x, opt.doneLabel) + (opt.plain ? '' : rchipHtml(x) + guideBtn(x)) + '</div>' + (opt.extra || '') + '</div></div>' + (opt.plain ? '' : rmenuHtml(x)) + howPanel(x) + '</article>';
  }
  function partName(x) { return (PART[x.part] || { n: '' }).n; }
  function dayName(d) { var x = parse(d); return x ? DAYS[x.getDay()] : ''; }
  /* This Week: the weekly practices, open ones first, then the ones done this week. */
  function thisWeekHtml(plan, where) {
    var wk = plan.filter(function (x) { return x.r === 'w' || x.r === 'f'; }); if (!wk.length) return '';
    var open = wk.filter(function (x) { return !x.done; }), dn = wk.filter(function (x) { return x.done; });
    var head = '<div class="hm-grp hm-p-branches"><span class="hm-badge">' + I('sunrise') + '</span><h2 class="hm-h2">' + (where === 'week' ? 'Practices This Week' : 'This Week') + '</h2><span class="sp"></span><span class="hm-time">' + dn.length + ' of ' + wk.length + ' done</span></div>';
    var line = !open.length ? 'Every practice for this week is tended. A fresh week begins Monday.' : open.some(function (x) { return x.r === 'f'; }) ? 'On any days that suit you, Monday to Sunday.' : 'Once this week, on any day that suits you.';
    return '<div class="hm-tweek hm-p-branches" role="region" aria-label="' + (where === 'week' ? 'Practices This Week' : 'This Week') + '">' + head + '<p class="hm-sub hm-twline">' + line + '</p>' +
      '<div class="hm-list">' + open.map(function (x) { return pracCardHtml(x, { when: (x.r === 'f' ? x.cnt + ' of ' + x.x + ' this week' + (x.doneToday ? ' · Done today' : '') : 'This Week') + ' · ' + partName(x) }); }).join('') +
      dn.map(function (x) { return pracCardHtml(x, { when: 'Done this week · ' + (x.doneWeek === today() ? 'Today' : dayName(x.doneWeek)), cls: 'hm-small', nosub: true }); }).join('') + '</div></div>';
  }
  /* When You're Ready, on Today: one Now and Then practice that has rested 30 days or more (or is new), one at a time. */
  function nudgeOf(plan) {
    var td = today(), later = obj(homeRec().later);
    var c = plan.filter(function (x) { return x.r === 'n' && !x.doneToday && (!x.last || between(x.last, td) >= 30) && !(later[x.pid] && later[x.pid] > td); });
    c.sort(function (a, b) { var p = a.last || '', q = b.last || ''; return p < q ? -1 : p > q ? 1 : (a.i || 0) - (b.i || 0); });
    return c[0] || null;
  }
  function nudgeHtml(plan) {
    var x = nudgeOf(plan); if (!x) return '';
    var extra = '<div class="hm-quiet hm-nlater"><span>' + esc(x.last ? 'Last done ' + niceDate(x.last) + '.' : 'Waiting in Grow, under When You\'re Ready.') + '</span><button type="button" class="hm-linkbtn" data-hm-later="' + esc(x.key) + '">Another Time</button></div>';
    return '<div class="hm-nudge" role="region" aria-label="When you\'re ready">' + pracCardHtml(x, { when: 'When you\'re ready · ' + partName(x), cls: 'hm-nudgec', extra: extra }) + '</div>';
  }
  /* Grow: When You're Ready, every Now and Then practice with the date it was last done. */
  function readyHtml(plan) {
    var n = plan.filter(function (x) { return x.r === 'n'; }); if (!n.length) return '';
    return '<div class="hm-tweek hm-p-fruit" id="hm-ready" role="region" aria-label="When You\'re Ready"><div class="hm-grp hm-p-fruit"><span class="hm-badge">' + I('sprout') + '</span><h2 class="hm-h2">When You\'re Ready</h2><span class="sp"></span></div>' +
      '<p class="hm-sub hm-twline">Practices for now and then. Each one waits here until the time feels right.</p><div class="hm-list">' +
      n.map(function (x) { return pracCardHtml(x, { when: (x.doneToday ? 'Done today' : x.last ? 'Last done ' + shortDate(x.last) : 'Whenever you like') + ' · ' + partName(x) }); }).join('') + '</div></div>';
  }
  /* Open or close How on a card, in place, keeping focus on the button. */
  function setHow(key, open) {
    if (open) S.how[key] = true; else delete S.how[key];
    document.querySelectorAll('[data-hm-card]').forEach(function (c) {
      if (c.getAttribute('data-hm-card') !== key) return;
      c.classList.toggle('open', open);
      var b = c.querySelector('[data-hm-how]'); if (b) b.setAttribute('aria-expanded', String(open));
    });
  }
  function setMenu(key) {
    S.rmenu = key || null;
    document.querySelectorAll('[data-hm-card]').forEach(function (c) {
      var on = !!key && c.getAttribute('data-hm-card') === key, m = c.querySelector('.hm-rmenu'), b = c.querySelector('[data-hm-rchip]');
      if (m) m.hidden = !on; if (b) b.setAttribute('aria-expanded', String(on));
    });
  }
  var RMOVED = { d: 'Daily now: it joins your day.', f: 'A few times a week now: it moves to This Week.', w: 'Weekly now: it moves to This Week.', n: 'Now and Then: it waits in Grow, under When You\'re Ready.' };
  var KMOVED = { d: 'Every day now!', f: 'Now it is a few times this week!', w: 'Now it is a this week practice!', n: 'Now it is a sometimes practice!' };
  function setRhythm(key, r) {
    if (!okR(r) || !S.id) return;
    var pid = key.replace(/^p:/, ''), h = GGP.data(S.id, 'home'); if (!h) return;
    h.rhythm = obj(h.rhythm); h.rhythm[pid] = r;
    if (r === 'f') h.rhythm[pid] = 'f' + rhythmFull(pid).x;
    S.rmenu = null; saveHome();
    toast((isKid(S.p) ? KMOVED : RMOVED)[r]);
    var go = function () { var c = document.querySelector('[data-hm-card="' + cssq(key) + '"] [data-hm-rchip]'); if (c) { try { c.focus({ preventScroll: false }); } catch (e) {} } };
    if (isKid(S.p)) render(); else refreshPane();
    go();
  }
  function cssq(s) { return String(s).replace(/["\\]/g, '\\$&'); }
  /* A redraw keeps the focus on the same control (How, Done, the chip), so a keyboard or screen reader stays put. */
  var FOCUS_ATTR = ['data-hm-how', 'data-hm-hdone', 'data-hm-done', 'data-hm-rchip', 'data-hm-rset', 'data-hm-go', 'data-hm-later'];
  function focusKey() { var a = document.activeElement; if (!a || !a.getAttribute) return null; for (var i = 0; i < FOCUS_ATTR.length; i++) { var v = a.getAttribute(FOCUS_ATTR[i]); if (v != null) return [FOCUS_ATTR[i], v]; } return null; }
  function focusBack(k) { if (!k) return; var el = document.querySelector('[' + k[0] + '="' + cssq(k[1]) + '"]'); if (el && el !== document.activeElement) { try { el.focus({ preventScroll: true }); } catch (e) {} } }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-hm-how],[data-hm-hdone],[data-hm-rchip],[data-hm-rset],[data-hm-later]');
    if (!t) { if (S.rmenu && !(e.target.closest && e.target.closest('.hm-rmenu'))) setMenu(null); return; }
    if (!t.closest('.hm')) return;
    if (t.hasAttribute('data-hm-how')) { var k = t.getAttribute('data-hm-how'); setHow(k, !S.how[k]); return; }
    if (t.hasAttribute('data-hm-hdone')) { itemDone(t.getAttribute('data-hm-hdone'), t); return; }
    if (t.hasAttribute('data-hm-rchip')) { var rk = t.getAttribute('data-hm-rchip'); setMenu(S.rmenu === rk ? null : rk); if (S.rmenu) { var first = document.querySelector('[data-hm-card="' + cssq(rk) + '"] .hm-rmenu [aria-pressed="true"]'); if (first) try { first.focus({ preventScroll: true }); } catch (x) {} } return; }
    if (t.hasAttribute('data-hm-rset')) { var v = t.getAttribute('data-hm-rset'), cut = v.lastIndexOf('|'); setRhythm(v.slice(0, cut), v.slice(cut + 1)); return; }
    if (t.hasAttribute('data-hm-later')) { var lk = t.getAttribute('data-hm-later'), hl = GGP.data(S.id, 'home'); if (!hl) return; hl.later = obj(hl.later); hl.later[lk.replace(/^p:/, '')] = addDays(today(), 7); saveHome(); toast('It waits in Grow, under When You\'re Ready.'); refreshPane(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || !S.rmenu) return;
    var k = S.rmenu; setMenu(null); var b = document.querySelector('[data-hm-card="' + cssq(k) + '"] [data-hm-rchip]'); if (b) try { b.focus({ preventScroll: true }); } catch (x) {}
    e.stopPropagation();
  }, true);
  /* Today's This Week sits beside the day on a wide screen and right after Right Now on a phone: redraw at the turn. */
  var WIDE = window.matchMedia ? matchMedia('(min-width:980px)') : null;
  function wideToday() { return !!(WIDE && WIDE.matches); }
  if (WIDE) { var onWide = function () { if (S.id && app() && !isKid(S.p) && route().tab === 'today' && !route().sub) refreshPane(); }; if (WIDE.addEventListener) WIDE.addEventListener('change', onWide); else if (WIDE.addListener) WIDE.addListener(onWide); }

  /* ---------- Today: one list in day order ---------- */
  function treeItem(h, d) {
    var t = TREES[S.tree] || TREES.oak, ck = lastCheckin(S.id, S.tree), did = !!(ck && ck.date === today()) || !!d.tree;
    return { key: 'tree', hour: 20.5, when: 'Evening', title: t.n + ' Check-in', sub: ck ? 'A short check-in to close the day' : 'Your first check-in plants your tree', btn: 'Check In', tint: 'gold', done: did, src: 'home' };
  }
  function todayItems() {
    wayJoin();
    var h = homeRec(), d = h.days[today()] || {}, items = [], tendItems = null, sm = null, ready = false;
    if (tendReady()) {
      sm = summary(); ready = !!(sm && sm.ready !== false);
      if (ready && hasFn('today')) tendItems = hCall('today', today());
    }
    if (Array.isArray(tendItems)) {
      tendItems.forEach(function (x) { if (!x || !x.key) return; items.push({ key: 't:' + x.key, hkey: x.key, hour: num(x.hour) != null ? +x.hour : 12, when: x.when || '', title: x.title || '', sub: x.sub || '', btn: x.btn || 'Open', tint: x.tint || '', done: !!x.done, kind: x.kind || '', image: x.image || '', src: 'tend' }); });
    } else if (ready && sm) {
      // Fallback (before GGHealth.today): the workout and Today's Plate from the summary.
      if (sm.workout) items.push({ key: 'o:move', hour: 7, when: 'Morning', title: sm.workout.title || 'Today\'s Workout', sub: sm.workout.mins ? 'About ' + sm.workout.mins + ' minutes, your level' : 'Your level, with a coach', btn: sm.workout.done ? 'Open' : 'Start', tint: 'move', done: !!sm.workout.done, src: 'old', old: 'move' });
      items.push({ key: 'o:plate', hour: 12, when: 'Every meal', title: 'Today\'s Plate', sub: 'Log what you eat and watch the rings fill', btn: 'Log', tint: 'plate', done: !!(sm.plate && sm.plate.logged), src: 'old', old: 'plate' });
    }
    var hasQuiet = items.some(function (x) { return /quiet|med/i.test(x.kind + ' ' + x.hkey); });
    if (h.parts.indexOf('still') >= 0 && !hasQuiet) items.push({ key: 'quiet', hour: 6.5, when: 'Morning', title: 'Morning Quiet', sub: 'A few minutes of breath and stillness', btn: 'Begin', tint: 'quiet', done: !!d.quiet, src: 'home' });
    if (h.parts.indexOf('pray') >= 0) items.push({ side: true, key: 'pray', hour: 12.5, when: 'Any time', title: 'A Sacred Pause', sub: 'Prayer, a reading, or quiet, in your own way', btn: 'Begin', tint: 'roots', done: !!d.pray, src: 'home' });
    if (h.parts.indexOf('connect') >= 0) items.push({ side: true, key: 'talk', hour: 18.5, when: 'At dinner', title: 'Tonight\'s Question', sub: pick(QUESTIONS, dayIndex() + (+d.q || 0)), btn: 'Another', tint: 'branches', done: !!d.talk, src: 'home' });
    // BLD 882: each practice in the tree's Growth Plan, its own card. BLD 885: daily ones in the day; a weekly or now and
    // then practice done today adds to today's count.
    var plan = planItems(false), extra = 0;
    // BLD 892: a practice a planned session fills rides inside that session's card (one card, two credits).
    mergeFills(items, plan); syncFills(items); guideFor(plan);
    plan.forEach(function (x, i) { x.i = i; if (x.filledBy) return; if (x.r === 'd') items.push(x); else if (x.doneToday) extra++; });
    plan = plan.filter(function (x) { return !x.filledBy; });
    // BLD 893: the spirit items My Grounded Way Plan chose for today.
    spiritItems().forEach(function (x) { items.push(x); });
    items.push(treeItem(h, d));
    items.forEach(function (x, i) { x.i = i; });
    items.sort(function (a, b) { return a.hour - b.hour || a.i - b.i; });
    return { items: items, plan: plan, extra: extra, ready: ready, loading: !tendReady() && !S.tendLoadDone };
  }
  var DONE_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.4 4.4L19 7.4"/></svg>';
  /* BLD 882: each thing in the day wears the pre-881 Home's card: a painting, the time in Barlow Condensed, the name in
     Cormorant, a bold action, and the animated Done check. */
  function doneBtn(x, label) {
    return '<button class="hm-ck" type="button" aria-pressed="' + !!(x.pressed != null ? x.pressed : x.done) + '" data-hm-done="' + esc(x.key) + '" aria-label="' + esc(x.title) + (x.done ? ', done. Tap to undo' : ', mark done') + '">' + CKSVG + '<span class="lb" aria-hidden="true">' + esc(label || 'Done') + '</span></button>';
  }
  var GO_ICON = { How: 'book', Begin: 'play', Start: 'play', 'Check In': 'check', Another: 'swap', Open: 'arrow', Log: 'plus', 'Guide Me': 'play' };
  function itemHtml(x) {
    if (x.src === 'plan') return pracCardHtml(x);
    if (x.src === 'spirit') return pracCardHtml(x, { plain: true });
    if (x.pairs) return fillCardHtml(x);
    return '<article class="hm-titem hm-card edge lift ' + tintClass(x.tint, x.kind) + (x.done ? ' done' : '') + (x.src === 'plan' ? ' hm-prac' : '') + '">' +
      '<div class="hm-pc"><div class="scene">' + '<img src="' + esc(x.image || artFor(x)) + '" alt="" loading="lazy" decoding="async"></div><div class="bd tx">' +
      '<span class="hm-time ey">' + esc(x.when) + '</span><b class="hm-h3">' + esc(x.title) + '</b>' + (x.sub ? '<small class="hm-meta">' + esc(x.sub) + '</small>' : '') +
      '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-go="' + esc(x.key) + '">' + I(GO_ICON[x.btn] || 'arrow') + esc(x.btn) + '</button>' + doneBtn(x) + '</div></div></div></article>';
  }
  /* Right Now: the next thing that is due, in a bold color block with a big button (Tending's own Right Now card, BLD 857). */
  function nowHtml(items) {
    var hr = now().getHours() + now().getMinutes() / 60, open = items.filter(function (x) { return !x.done && !x.side; });
    var due = open.filter(function (x) { return x.hour <= hr + 0.25; }), cur = due.length ? due[due.length - 1] : open[0];
    if (!cur) return '<article class="hm-now hm-tn-p"><img class="bg" src="' + IMG + 'home-evening-narrow.webp" alt="" aria-hidden="true"><div class="in"><div class="k">Right Now</div><h2>Everything for today is tended.</h2><p>Rest well. Tomorrow keeps growing.</p></div></article>';
    return '<article class="hm-now ' + tintClass(cur.tint, cur.kind) + '"><img class="bg" src="' + esc(cur.image || artFor(cur)) + '" alt="" aria-hidden="true"><div class="in"><div class="k">Right Now · ' + esc(cur.when) + '</div><h2>' + esc(cur.title) + '</h2>' + (cur.sub ? '<p>' + esc(cur.sub) + '</p>' : '') +
      '<div class="hm-acts tight"><button type="button" class="hm-btn big pulse" data-hm-go="' + esc(cur.key) + '">' + I(GO_ICON[cur.btn] || 'play') + esc(cur.btn) + '</button></div></div></article>';
  }
  /* The hero: the day and date over the morning or evening painting, as the pre-881 Home had it, with today's count and words. */
  var LINES = ['One small practice at a time grows a whole tree.', 'Tend what is in front of you today. It is enough.', 'Roots first. Slow and steady is how a tree grows.', 'Today is a good day to grow.', 'Breathe in. Begin where you are.', 'Small steps, tended daily, change a life.', 'You are growing, even on the quiet days.'];
  function heroLine() {
    var sd = soberDate(); if (sd) return { k: 'Today\'s Mantra', id: 'hm-mantra', text: 'One day at a time.' };
    var w = GGP.data(S.id, 'tending'), why = obj(obj(w && w.health).set).why;
    if (why) return { k: 'My Why', text: why };
    return { k: 'For Today', text: pick(LINES, dayIndex()) };
  }
  function todayHero(done, n) {
    var d = now(), hr = d.getHours() + d.getMinutes() / 60, eve = hr >= 17 || hr < 5, k = eve ? 'home-evening' : 'home-morning', t = TREES[S.tree] || TREES.oak, tend = tendOf(S.id, S.tree), wk = weekNo(tend), hl = heroLine();
    var chips = '<span class="hm-chip g">' + I('tree') + esc(t.n) + '</span>' + (wk ? '<span class="hm-chip">Season ' + (tend.season || 1) + ' · Week ' + Math.min(12, wk) + '</span>' : '') + (soberDate() ? '<span class="hm-chip s">' + I('sun2') + 'Day ' + (soberCount(soberDate()).days + 1) + ' Sober</span>' : '');
    return '<section class="hm-hero hm-thero o1' + (eve ? ' eve' : '') + '" aria-label="Today"><picture><source media="(max-width:699px)" srcset="' + IMG + k + '-narrow.webp"><img class="art" src="' + IMG + k + '-wide.webp" alt="" width="2000" height="800" fetchpriority="high"></picture>' +
      '<div class="in"><div class="hm-greet">' + I(eve ? 'moon' : 'sunrise') + '<span>' + esc(greetWord()) + (firstName() ? ', ' + esc(firstName()) : '') + '</span></div>' +
      '<h1 class="hm-day">' + DAYS[d.getDay()] + '</h1><div class="hm-date">' + MONTHS[d.getMonth()] + ' ' + d.getDate() + '</div>' +
      '<p class="hm-mantra"><span>' + esc(hl.k) + '</span><b' + (hl.id ? ' id="' + hl.id + '"' : '') + '>' + esc(hl.text) + '</b></p><div class="chips">' + chips + '</div></div>' +
      '<div class="hm-hcount">' + ring(innerWidth < 700 ? 72 : 96, innerWidth < 700 ? 8 : 9, done, Math.max(1, n), '<b>' + done + '</b><small>of ' + n + '</small>', '#F2C66B') + '<span>' + (n && done === n ? 'All tended' : 'Tended today') + '</span></div>' + meBtn() + '</section>';
  }
  /* The rich panels beside the day (one column on a phone, after the day). */
  function sideHtml(items, ed) {
    var h = homeRec(), sd = soberDate(), d = h.days[today()] || {}, out = [];
    if (sd) out.push(soberHtml(sd)); else if (h.parts.indexOf('sober') >= 0) out.push(soberInviteHtml());
    out.push(forYouHtml(ed));
    items.filter(function (x) { return x.side; }).forEach(function (x) {
      if (x.key === 'pray') out.push('<article class="hm-card edge lift hm-p-roots hm-side' + (x.done ? ' done' : '') + '"><div class="hm-pc"><div class="scene"><img src="' + IMG + 'tend-spirit.webp" alt="" loading="lazy"></div><div style="min-width:0"><div class="hm-time">Any time</div><h3 class="hm-h3">A Sacred Pause</h3><div class="hm-meta"><span>' + I('flame') + 'Prayer, a reading, or quiet, in your own way</span></div>' +
        '<div class="hm-acts tight"><button type="button" class="hm-btn sm" data-hm-go="pray">' + I('play') + 'Begin</button><a class="hm-btn sm line" href="/readings.html">' + I('feather') + 'Readings</a>' + doneBtn(x) + '</div></div></div></article>');
      if (x.key === 'talk') out.push('<article class="hm-card edge hm-p-branches hm-side hm-tqcard' + (x.done ? ' done' : '') + '"><img class="bg" src="' + IMG + 'tend-people.webp" alt="" aria-hidden="true" loading="lazy"><div class="hm-hd" style="margin-bottom:4px"><span class="hm-badge">' + I('people') + '</span><div><div class="hm-k">Tonight\'s Question</div><div class="hm-sub">For dinner together, phones away</div></div></div><p class="hm-tq">' + esc(pick(QUESTIONS, dayIndex() + (+d.q || 0))) + '</p>' +
        '<div class="hm-acts tight"><button class="hm-btn sm line" type="button" data-hm-go="talk">' + I('swap') + 'Another Question</button>' + doneBtn(x, 'We Talked') + '</div></article>');
    });
    out.push(progressHtml(h, lastCheckin(S.id, S.tree), tendOf(S.id, S.tree)));
    return out.join('');
  }
  function todayHtml() {
    var T = todayItems(), h = homeRec(), items = T.items, done = items.filter(function (x) { return x.done; }).length + T.extra, n = items.length + T.extra, ed = edgesOf(lastCheckin(S.id, S.tree));
    // BLD 885: This Week and the When You're Ready card: beside the day on a wide screen, right after Right Now on a phone.
    var wkb = thisWeekHtml(T.plan, 'today') + nudgeHtml(T.plan), wide = wideToday();
    var lead = '';
    if (T.loading) lead = '<p class="hm-loading">Opening your Tending…</p>';
    else if (!T.ready && !h.hidden.tend) {
      lead = '<article class="hm-startc hm-card edge lift hm-p-leaves"><div class="hm-pc"><div class="scene"><img src="' + IMG + 'tend-body.webp" alt="" loading="lazy"></div><div style="min-width:0"><div class="hm-k">Tending</div><h3 class="hm-h3">' + (tendStarted() ? 'Your Tending Plan' : 'Begin Your Tending') + '</h3><p class="hm-sub" style="margin-top:4px">' + (tendStarted() ? 'Finish a short start-up check and your meals, movement, and quiet fill your day.' : 'A short start-up check shapes it to you: your goals, the people at your table, and movement for your level.') + '</p>' +
        '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-tab="today=tending">' + I('sprout') + (tendStarted() ? 'Continue' : 'Start Tending') + '</button><button type="button" class="hm-linkbtn" data-hm="hidetend">Hide this card</button></div></div></div></article>';
    }
    lead = wayNoteHtml() + lead;
    var list = items.filter(function (x) { return !x.side; });
    var head = '<div class="hm-grp hm-p-leaves"><span class="hm-badge">' + I('sprout') + '</span><h2 class="hm-h2">Today\'s Tending</h2><span class="sp"></span><span class="hm-time">' + esc(done + ' of ' + n + ' tended') + '</span></div>';
    var fab = T.ready ? '<button type="button" class="hm-fab" data-hm-tab="today=log" aria-label="Log a plate or a note">' + I('plus') + '</button>' : '';
    return todayHero(done, n) + '<div class="hm-tgrid"><div class="hm-col hm-tmain">' + nowHtml(items) + (wide ? '' : wkb) + head + lead + '<div class="hm-list" id="hm-today">' + list.map(itemHtml).join('') + '</div></div>' +
      '<div class="hm-col hm-tside">' + (wide ? wkb : '') + sideHtml(items, ed) + '</div></div>' + fab;
  }
  function findItem(key) { var T = todayItems(); return T.items.filter(function (x) { return x.key === key; })[0] || null; }
  /* BLD 885: Right Now's How opens that practice's How on its card in the day, in place. */
  function openHowFromNow(key) {
    setHow(key, true);
    var c = document.querySelector('#hm-today [data-hm-card="' + cssq(key) + '"]'), b = c && c.querySelector('[data-hm-how]');
    if (c) { try { c.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' }); } catch (e) { c.scrollIntoView(); } }
    if (b) { try { b.focus({ preventScroll: true }); } catch (e) {} }
  }
  function itemGo(key) {
    if (/^[ps]:/.test(key)) { openHowFromNow(key); return; }
    var x = findItem(key), t = TREES[S.tree] || TREES.oak; if (!x) return;
    if (x.src === 'tend') { if (hasFn('act')) hCall('act', x.hkey); return; }
    if (x.src === 'old') { goTo('today=' + (x.old === 'plate' ? 'log' : 'tending')); if (x.old === 'move') { S.quiet = true; try { window.GGHealth.open('move'); } catch (e) {} S.quiet = false; } return; }
    if (x.src === 'plan') { openHowFromNow(key); return; }
    if (key === 'tree') { openTreeSheet(t.ck ? 'quick' : ''); return; }
    if (key === 'quiet') { playVideo('gg-paced-now'); return; }
    if (key === 'pray') { openFrame(new URL('/get-grounded-now.html', location.href)); return; }
    if (key === 'talk') { var r = todayRec(homeRec()); r.q = (+r.q || 0) + 1; saveHome(); refreshPane(); }
  }
  function itemDone(key, btn) {
    var x = /^p:/.test(key) ? { src: 'plan', pid: key.slice(2), done: btn ? btn.getAttribute('aria-pressed') === 'true' : false } : findItem(key); if (!x) return;
    var on = !x.done;
    if (x.src === 'plan') { if (!togglePractice(x.pid, on)) return; }
    else if (x.src === 'tend' && x.pairs) fillDone(x, on);
    else if (x.src === 'tend') tendMark(x, on); else if (x.src === 'old') { itemGo(key); return; }
    else if (x.src === 'spirit') spiritMark(x.pid, on);
    else { var hk = homeRec(), rec = todayRec(hk); rec[key] = on ? 1 : 0; pruneDays(hk); saveHome();
      // BLD 893: a Sacred Pause chosen in My Grounded Way Plan grows Roots too.
      if (key === 'pray' && planOK() && obj(wayRec().spirit).pause && waySaved()) spiritMark(spiritPid('pause', S.tree), on); }
    if (btn) { btn.setAttribute('aria-pressed', String(on)); var card = btn.closest('.hm-item,.hm-card,.hm-kp'); if (card) { card.classList.toggle('done', on); card.querySelectorAll('[data-hm-done],[data-hm-hdone]').forEach(function (b2) { if (b2 !== btn) b2.setAttribute('aria-pressed', String(on)); }); } }
    if (on && btn && !matchMedia('(prefers-reduced-motion: reduce)').matches) { var burst = document.createElement('span'); burst.className = 'hm-burst'; for (var j = 0; j < 8; j++) { var a = j / 8 * Math.PI * 2, dd = 22 + (j % 2) * 8, dot = document.createElement('i'); dot.style.setProperty('--x', Math.cos(a) * dd + 'px'); dot.style.setProperty('--y', Math.sin(a) * dd + 'px'); burst.appendChild(dot); } btn.appendChild(burst); setTimeout(function () { burst.remove(); }, 800); }
    setTimeout(function () { if (isKid(S.p)) render(); else refreshPane(); }, on ? 650 : 0);
  }

  /* ---------- Week: Shop, Sunday Together Prep, then the seven days ---------- */
  function weekData() { if (!tendReady() || !tendIsReady() || !hasFn('week')) return null; var w = hCall('week'); return w && Array.isArray(w.days) ? w : null; }
  /* BLD 885: the weekly practices lead the Week tab, beside the shopping list on a wide screen. */
  function weekHtml() {
    var wp = S.id ? thisWeekHtml(planItems(false), 'week') : '', body = planDoorWeek() + weekBody();
    if (!wp) return body;
    if (body.indexOf('<div class="hm-wgrid"><div class="hm-col hm-wside">') >= 0) return body.replace('<div class="hm-col hm-wside">', '<div class="hm-col hm-wside">' + wp);
    return '<div class="hm-wpracs">' + wp + '</div>' + body;
  }
  function weekBody() {
    if (!tendReady()) return S.tendLoadDone ? tendSoonHtml() : '<p class="hm-loading">Opening your week…</p>';
    if (!tendIsReady()) return '<article class="hm-start">' + tile(ART2.shop, 'wide') + '<div class="tx"><span class="ey">Tending</span><b>Start Tending</b><small>Your week fills in here: dinners to cook, workouts for your level, one shopping list, and Sunday Together Prep.</small></div><div class="hm-acts tight"><button type="button" class="hm-pill hm-tn-p" data-hm-tab="today=tending">Start</button></div></article>';
    var w = weekData();
    if (!w) return '<div id="hm-tend" class="hm-sec" data-sec="week"></div>';
    var hh = tableOf(), td = today();
    var shop = w.shopKey === null ? '' : '<button type="button" class="hm-shop" data-hm-tab="week=shop"><picture class="bg" aria-hidden="true"><source media="(max-width:699px)" srcset="' + IMG + 'recipes-narrow.webp"><img src="' + IMG + 'recipes-wide.webp" alt="" loading="lazy"></picture><span class="tx"><b>' + esc(w.shopLabel || 'Shop for ' + weekLabel(w.label)) + '</b><small>One list for the whole week' + (hh ? ', sized for ' + hh : '') + '</small></span><span class="go" aria-hidden="true">' + I('arrow') + '</span></button>';
    var prep = w.prepKey ? '<article class="hm-wcard hm-tn-k">' + tile(w.prepImage || ART2.prep) + '<div class="tx"><span class="ey">Sunday</span><b>' + esc(w.prepLabel || 'Sunday Together Prep') + '</b><small>' + esc(w.prepSub || 'Cook and Helper, side by side: the week\'s head start in one afternoon.') + '</small></div><button type="button" class="hm-pill" data-hm-tab="week=prep">Open</button></article>' : '';
    /* BLD 889: the Weekly Batch every Sunday, right after Sunday Together Prep (it was Monthly Bulk Together). */
    if (w.bulkKey) prep += '<article class="hm-wcard hm-tn-k">' + tile(ART2.cook) + '<div class="tx"><span class="ey">Sunday, after prep</span><b>' + esc(w.bulkLabel || 'Weekly Batch') + '</b><small>' + esc(w.bulkSub || 'Burritos and one more for the week, Cook and Helper, side by side.') + '</small></div><button type="button" class="hm-pill" data-hm-wk="' + esc(w.bulkKey) + '">Open</button></article>';
    if (w.starts) prep = '<p class="hm-sub" style="margin:0 4px 12px">Your plan begins ' + esc(niceDay(w.starts)) + '. Here is a look at the week ahead.</p>' + prep;
    var mark = function (x) { return x.done ? ' <span class="hm-wdone">' + I('check') + '<span class="sr">done</span></span>' : ''; };
    var rows = w.days.map(function (d, di) {
      var isT = d.today === true || String(d.date || '').slice(0, 10) === td, din = obj(d.dinner), mv = obj(d.move);
      return '<div class="hm-wday' + (isT ? ' today' : '') + '"' + (isT ? ' aria-current="date"' : '') + '><span class="dn">' + esc(String(d.day || '').slice(0, 3)) + '<small>' + esc(shortDate(d.date)) + '</small></span>' + tile(din.title ? FOOD_ROT[di % FOOD_ROT.length] : mv.title ? (mv.image || ART2.move) : ART2.quiet, 'sm') + '<div class="tx">' +
        (din.title ? '<button type="button" class="hm-wdin" data-hm-wk="' + esc(din.key || '') + '"' + (din.key ? '' : ' disabled') + ' aria-label="' + esc((d.dayName || d.day || '') + ' dinner: ' + din.title + (din.key ? ', open to cook' : '')) + '">' + esc(din.title) + mark(din) + '</button>' : '') +
        (mv.title ? '<button type="button" class="hm-wmove" data-hm-wk="' + esc(mv.key || '') + '"' + (mv.key ? '' : ' disabled') + ' aria-label="' + esc((d.dayName || d.day || '') + ': ' + mv.title + (mv.key ? ', start it' : '')) + '">' + esc(mv.title) + mark(mv) + '</button>' : '') +
        weekExtra(d) +
        (!din.title && !mv.title && !obj(d.med).title ? '<span class="hm-wnone">A day to rest</span>' : '') +
        '</div></div>';
    }).join('');
    /* BLD 892: the program week ("Week 6 of 12 · Build") and, once, What's New in Your Plan. */
    var nw = hasFn('news') ? hCall('news') : null;
    var news = nw ? '<article class="hm-card hm-p-leaves hm-new"><div class="hm-k">' + esc(nw.title) + '</div>' + (nw.label ? '<p class="hm-sub">You are in ' + esc(nw.label) + '.</p>' : '') + '<ul class="hm-newl">' + arr(nw.lines).map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul><div class="hm-acts tight"><button type="button" class="hm-pill" data-hm-new="1">Got It</button></div></article>' : '';
    return '<div class="hm-wgrid"><div class="hm-col hm-wside">' + shop + prep + '</div><div class="hm-col hm-wmain">' + news + '<h2 class="hm-label">This Week</h2>' + (w.prog ? '<p class="hm-sub hm-wprog">' + esc(w.prog) + '</p>' : '') + '<div class="hm-wlist">' + rows + '</div></div></div>';
  }

  /* ---------- Grow: the tree, the six parts, this season, the Growth Plan, history ---------- */
  function treeHash(t, what) {
    if (what === 'checkin') return t.href + (t.ck ? '#checkin' : '');
    if (what === 'quick') return t.href + (t.ck ? '#quick' : '');
    if (what === 'plan') return t.href + '#plan';
    if (what === 'history') return t.href + (S.tree === 'birch' || S.tree === 'pine' ? '#progress' : '#season');
    return t.href;
  }
  function treePic() { return '<picture class="hm-gpic" aria-hidden="true"><source media="(max-width:699px)" srcset="' + treeArt(S.tree) + '"><img src="' + treeArt(S.tree, true) + '" alt="" loading="lazy"></picture>'; }
  /* BLD 882: the pre-881 Home's tree card (the drawn tree with each part's level), restored on Grow. */
  function checkHref(t) { return t.href + (t.ck ? '#checkin' : ''); }
  function treeCardHtml(ck, ed, t) {
    if (!ck) {
      return '<article class="hm-card hm-p-leaves o2" id="hm-tree"><div class="hm-hd"><span class="hm-badge"><img src="' + mark(S.tree) + '" alt=""></span><div><div class="hm-k">Your Tree</div><div class="hm-sub">Your first check-in plants your tree here.</div></div></div>' +
        treePic() + '<div class="hm-plant"><p class="hm-sub" style="max-width:36ch">Six parts make you whole: Roots, Trunk, Bark, Branches, Leaves, and Fruit. A check-in shows how each one is growing, Strong, Steady, or a Growing Edge.</p></div>' +
        '<div class="hm-acts"><button type="button" class="hm-btn hm-p-leaves" data-hm-tree="checkin">' + I('check') + 'Begin My First Check-in</button></div></article>';
    }
    var lv = ed.lv, cnt = { strong: 0, steady: 0 }; PARTS.forEach(function (p) { if (cnt[lv[p.k]] != null) cnt[lv[p.k]]++; });
    var sum = (cnt.strong ? '<span class="hm-lvl s">' + cnt.strong + ' Strong</span>' : '') + (cnt.steady ? '<span class="hm-lvl st">' + cnt.steady + ' Steady</span>' : '') +
      (ed.edges.length ? '<span class="hm-lvl g hm-p-' + ed.edges[0] + '">Growing Edge: ' + ed.edges.map(function (k) { return PART[k].n; }).join(', ') + '</span>' : '');
    var line = ed.edges.length ? PART[ed.edges[0]].n + ', ' + PART[ed.edges[0]].m + ', is your Growing Edge this week. For You Today leans toward it.' : 'Every part is Steady or Strong. Keep tending what is working.';
    return '<article class="hm-card hm-p-leaves o2" id="hm-tree"><div class="hm-hd"><span class="hm-badge"><img src="' + mark(S.tree) + '" alt=""></span><div><div class="hm-k">Your Tree</div><div class="hm-last">' + I('check') + 'Last check-in ' + esc(niceDay(ck.date)) + '</div></div></div>' +
      treePic() + partsBars(ck, ed) + '<div class="hm-lvsum">' + sum + '</div><div class="hm-sub">' + esc(line) + '</div>' +
      '<div class="hm-acts"><button type="button" class="hm-btn hm-p-leaves" data-hm-tree="checkin">' + I('check') + 'Check In</button><button type="button" class="hm-btn line hm-p-leaves" data-hm-tree="quick">' + I('clock') + 'Quick Check-in</button></div>' +
      '<div class="hm-ckline"><span>' + I('check') + ck.count + ' check-in' + (ck.count === 1 ? '' : 's') + ' since ' + esc(MONTHS[parse(ck.first).getMonth()]) + '</span><span>' + I('clock') + (ck.type === 'quick' ? 'Last one quick, about 2 minutes' : 'Full check-in, about 8 minutes') + '</span></div></article>';
  }

  /* Your Progress (pre-881 Home, BLD 882 restored) */
  function progressHtml(h, ck, tend) {
    var rows = [], sd = soberDate();
    if (sd) { var ms = medallions(sd).filter(function (m) { return m.at <= today(); }); if (ms.length) rows.push('<div><i>' + I('check') + '</i>' + esc(ms[ms.length - 1].name) + ' Sober medallion</div>'); }
    var td = tendedDays(tend), mo = today().slice(0, 7), inMo = td.filter(function (k) { return k.slice(0, 7) === mo; }).length;
    if (inMo) rows.push('<div><i>' + I('check') + '</i>' + inMo + (inMo === 1 ? ' day' : ' days') + ' tended in ' + MONTHS[now().getMonth()] + '</div>');
    if (ck) rows.push('<div><i>' + I('check') + '</i>' + ck.count + ' check-in' + (ck.count === 1 ? '' : 's') + ' since ' + esc(niceDate(ck.first)) + '</div>');
    var rings = arr(tend.rings).length, wk = weekNo(tend);
    if (rings) rows.push('<div><i>' + I('tree') + '</i>' + rings + (rings === 1 ? ' ring' : ' rings') + ' on your tree</div>');
    if (wk && wk < 12) { var wl = 12 - wk + 1; rows.push('<div class="up"><i>' + I('tree') + '</i>' + (rings ? 'Next ring' : 'First ring') + ' at week 12, in about ' + wl + (wl === 1 ? ' week' : ' weeks') + '</div>'); }
    else if (wk >= 12) rows.push('<div class="up"><i>' + I('tree') + '</i>Your season check-in is ready: a full check-in adds a ring</div>');
    var ldl = ldlHtml();
    if (!rows.length && !ldl) rows.push('<div class="up"><i>' + I('sprout') + '</i>Your progress fills in as you check in and tend.</div>');
    return '<article class="hm-card hm-p-fruit o6" id="hm-progress"><div class="hm-hd"><span class="hm-badge">' + I('medal') + '</span><div><div class="hm-k">Your Progress</div><div class="hm-sub">What you have grown, counted with joy</div></div></div><div class="hm-mile">' + rows.join('') + '</div>' + ldl + '</article>';
  }
  function ldlHtml() {
    var w = GGP.data(S.id, 'tending'), hh = obj(w && w.health);
    var pts = arr(hh.labs).filter(function (l) { return l && num(l.ldl) != null && /^\d{4}-\d{2}-\d{2}/.test(l.date || ''); }).sort(function (a, b) { return a.date < b.date ? -1 : 1; }).slice(-6);
    if (!pts.length) return '';
    var goal = num(obj(hh.set).goalLdl), last = pts[pts.length - 1], first = pts[0], vals = pts.map(function (p) { return +p.ldl; });
    var hi = Math.max.apply(null, vals.concat(goal || 0)) + 8, lo = Math.min.apply(null, vals.concat(goal || 999)) - 8, n = pts.length;
    var X = function (i) { return n === 1 ? 160 : 18 + i * (284 / (n - 1)); }, Y = function (v) { return 10 + (hi - v) * (70 / Math.max(1, hi - lo)); };
    var line = pts.map(function (p, i) { return (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(+p.ldl).toFixed(1); }).join(' ');
    var svg = (goal ? '<line class="tg" x1="0" x2="320" y1="' + Y(goal) + '" y2="' + Y(goal) + '"/><text x="316" y="' + (Y(goal) + 15) + '" text-anchor="end">Goal ' + goal + '</text>' : '') +
      (n > 1 ? '<path class="area" d="' + line + ' L' + X(n - 1) + ' 92 L' + X(0) + ' 92Z"/><path class="done" d="' + line + '"/>' : '') +
      pts.map(function (p, i) { return '<circle cx="' + X(i) + '" cy="' + Y(+p.ldl) + '" r="4.5" fill="var(--c)"/><text x="' + X(i) + '" y="' + (Y(+p.ldl) - 9) + '" text-anchor="middle">' + esc(MONTHS[parse(p.date).getMonth()].slice(0, 3)) + '</text>'; }).join('');
    var pct = n > 1 && +first.ldl > +last.ldl ? Math.round((first.ldl - last.ldl) / first.ldl * 100) : 0;
    return '<div class="hm-ldl hm-a-numbers"><div class="hm-k">LDL Path</div><div class="nums"><div><b>' + esc(last.ldl) + '</b><small>' + esc(shortDate(last.date)) + ' labs</small></div>' + (goal ? '<div><b style="font-size:30px;color:var(--ink-soft)">' + goal + '</b><small>your goal</small></div>' : '') + (pct ? '<div style="margin-left:auto;text-align:right"><span class="hm-chip">' + I('check') + 'Down ' + pct + '%</span></div>' : '') + '</div>' +
      '<svg class="spark" viewBox="0 0 320 96" preserveAspectRatio="none" role="img" aria-label="LDL from your labs, ' + pts.map(function (p) { return p.ldl + ' on ' + niceDate(p.date); }).join(', ') + '">' + svg + '</svg>' +
      '<div class="hm-note" style="margin-top:8px">' + I('heart') + '<span>Your own lab numbers, kept on this device. Talk them over with your doctor.</span></div></div>';
  }

  /* The quiet Tending invitation for a person who uses check-ins */
  function offerHtml(h) {
    if (h.hidden.tend) return '';
    return '<div class="hm-card hm-p-leaves hm-offer o7"><span class="hm-badge">' + I('sprout') + '</span><div style="flex:1;min-width:0"><div class="hm-k">Whenever You Like</div><div class="hm-sub">Tending adds a few daily practices for body, mind, spirit, and the people you love.</div>' +
      '<div class="hm-quiet" style="margin-top:8px"><button type="button" data-hm="addtend">Add Tending</button><span>·</span><button type="button" data-hm="hidetend">Hide this card</button></div></div></div>';
  }

  function partsBars(ck, ed) {
    return '<div class="hm-parts">' + PARTS.map(function (p) {
      var l = ck ? ed.lv[p.k] : 'unsure', sc = ck ? num(ck.scores[p.k]) : null, w = sc == null ? 0 : Math.max(4, Math.min(100, sc * 10));
      return '<div class="hm-part hm-p-' + p.k + ' lv-' + l + '"><b>' + p.n + '</b><span class="bar" role="img" aria-label="' + p.n + ': ' + LV[l][0] + (sc != null ? ', ' + sc + ' of 10' : '') + '"><i style="width:' + w + '%"></i></span><small>' + esc(ck ? LV[l][0] : p.m.charAt(0).toUpperCase() + p.m.slice(1)) + '</small></div>';
    }).join('') + '</div>';
  }
  /* Grow, BLD 882: the pre-881 tree card on the left with Your Family; this season, the Growth Plan, Living Sober,
     and Tending's own milestones and last seven days on the right. */
  function growHtml() {
    var t = TREES[S.tree] || TREES.oak, ck = lastCheckin(S.id, S.tree), ed = edgesOf(ck), tend = tendOf(S.id, S.tree), wk = weekNo(tend), sd = soberDate(), h = homeRec();
    var trend = '';
    if (ck && ck.prev) {
      var avg = function (e) { var v = PARTS.map(function (p) { return num(e.scores[p.k]); }).filter(function (x) { return x != null; }); return v.length ? v.reduce(function (a, b) { return a + b; }, 0) / v.length : null; };
      var a = avg(ck), b = avg(ck.prev);
      if (a != null && b != null) trend = a - b >= 0.3 ? ' Growing since your last check-in.' : b - a >= 0.3 ? ' A little lower than last time: your Growing Edge shows where to tend.' : ' Holding steady since your last check-in.';
    }
    var rings = arr(tend.rings).length;
    var season = '<article class="hm-card edge lift hm-p-branches hm-gcard"><div class="hm-pc"><div class="scene"><img src="' + IMG + 'home-morning-narrow.webp" alt="" loading="lazy"></div><div style="min-width:0"><div class="hm-time">This Season</div><h3 class="hm-h3">' + (wk ? 'Season ' + (tend.season || 1) + ', Week ' + Math.min(12, wk) + ' of 12' : 'Your First Season') + '</h3><p class="hm-sub">' +
      (ck ? ck.count + ' check-in' + (ck.count === 1 ? '' : 's') + ' since ' + esc(niceDate(ck.first)) + '.' : 'Your season begins with your first full check-in.') + (rings ? ' ' + rings + (rings === 1 ? ' ring' : ' rings') + ' on your tree.' : '') + esc(trend) + '</p>' +
      (ck ? '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-tree="history">' + I('clock') + 'History</button></div>' : '') + '</div></div></article>';
    var pc = planList(S.id, S.tree).length;
    var plan = '<article class="hm-card edge lift hm-p-trunk hm-gcard"><div class="hm-pc"><div class="scene"><img src="' + ART2.spirit + '" alt="" loading="lazy"></div><div style="min-width:0"><div class="hm-time">Growth Plan</div><h3 class="hm-h3">Your Growth Plan</h3><p class="hm-sub">' + (pc ? nWord(pc) + (pc === 1 ? ' practice' : ' practices') + ' in your plan, each in its place: daily ones on Today, weekly ones in This Week, and now and then ones here. Open it when you change one.' : ck ? 'Choose a few practices for each part. Each one joins Today.' : 'Your growth plan grows from your first check-in.') + '</p>' +
      '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-tree="plan">' + I('sprout') + 'Open</button></div></div></div></article>';
    var ready = readyHtml(planItems(false));
    var sober = sd ? soberHtml(sd) : (h.parts.indexOf('sober') >= 0 ? soberInviteHtml() : '');
    var fruit = tendReady() && tendIsReady() && hasFn('render') ? '<div id="hm-fruit" class="hm-sec"></div>' : '';
    return '<div class="hm-grow"><div class="hm-gcol hm-col">' + treeCardHtml(ck, ed, t) + familyHtml(h) + '</div><div class="hm-gcol hm-col">' + season + plan + planDoorGrow() + ready + sober + fruit + (h.hidden.tend || tendStarted() ? '' : offerHtml(h)) + '</div></div>';
  }
  function fillFruit() { var el = document.getElementById('hm-fruit'); if (!el || el.firstChild) return; try { window.GGHealth.render(el, 'fruit', { bare: true }); } catch (e) { el.remove(); } }

  /* ---------- Library: search and the shelves, with real counts ---------- */
  var LEARN_SRC = '/shared/learn-lessons.js?v=b888';
  var GUIDES = { oak: ['/oak/guides.js?v=b888', 'OAK_GUIDES'], birch: ['/birch/guides.js?v=b888', 'BIRCH_GUIDES'], sequoia: ['/sequoia/guides.js?v=b888', 'SEQUOIA_GUIDES'], pine: ['/pine/guides.js?v=b888', 'PINE_GUIDES'] };
  var LIB = { load: null, guidesFor: null };
  function guidesOf(tree) { var g = GUIDES[tree]; return g && window[g[1]] && Array.isArray(window[g[1]].topics) ? window[g[1]].topics : null; }
  function learnOf(tree) {
    var L = window.GG_LEARN && window.GG_LEARN[tree]; if (!L) return null;
    var out = []; arr(L.tracks).forEach(function (t) { if (!t || t.unlisted || t.kind === 'forguides') return; arr(t.lessons).forEach(function (l) { if (l && l.id) out.push({ id: l.id, title: l.title || '', track: t.title || '' }); }); });
    return out;
  }
  function loadLib() {
    if (LIB.load && LIB.tree === S.tree) return LIB.load;
    LIB.tree = S.tree;
    var g = GUIDES[S.tree], jobs = [load(LEARN_SRC)];
    // The guides files declare their words at the top level, so only one tree's file loads in a visit.
    if (g && (!LIB.guidesFor || LIB.guidesFor === S.tree)) { LIB.guidesFor = S.tree; jobs.push(load(g[0])); }
    jobs.push(loadTending());
    LIB.load = Promise.all(jobs);
    return LIB.load;
  }
  function shelves() {
    var t = TREES[S.tree] || TREES.oak, c = hCall('counts') || {}, learn = learnOf(S.tree), lc = guidesOf(S.tree), rc = window.GGTendPublic ? arr(window.GGTendPublic.recipes).length : 0;
    var cnt = function (n, one, many) { return typeof n === 'number' && n > 0 ? n + ' ' + (n === 1 ? one : many) : ''; };
    return [
      { id: 'learn', name: 'Learn', count: learn ? cnt(learn.length, 'lesson', 'lessons') : '', plain: 'Guided lessons', line: 'Short guided lessons for every part of your ' + t.n + '.', cls: 'hm-sh-learn', art: HERO + 'library-phone.webp' },
      { id: 'life', name: 'When Life Changes', count: lc ? cnt(lc.length, 'guide', 'guides') : '', plain: 'Guides for big moments', line: 'Help for the big moments: loss, moves, new babies, hard seasons.', cls: 'hm-sh-life', art: HERO + 'page-hard-seasons-narrow.webp' },
      { id: 'recipes', name: 'Grounded Recipes', count: cnt(rc, 'recipe', 'recipes'), plain: 'Every meal', line: 'Every meal, sized for your table' + (tableOf() ? ' of ' + tableOf() : '') + ', guided step by step.', cls: 'hm-sh-rec', art: IMG + 'recipes-narrow.webp' },
      { id: 'workouts', name: 'Workouts', count: cnt(num(c.workouts), 'workout', 'workouts'), plain: 'Every level', line: 'Strength, cardio, Flow, and gentle sessions, with a coach.', cls: 'hm-sh-work', art: IMG + 'tend-move.webp' },
      { id: 'quiet', name: 'Quiet and Meditation', count: cnt(num(c.meditations), 'practice', 'practices'), plain: 'Morning and evening', line: 'Breath and stillness, and a sacred practice when you choose it.', cls: 'hm-sh-quiet', art: '/shared/cards/meditation.webp' }
    ];
  }
  function shelfHtml(s) {
    return '<button type="button" class="hm-shelf ' + s.cls + '" data-hm-shelf="' + s.id + '"><img class="bg" src="' + s.art + '" alt="" loading="lazy" decoding="async"><span class="ct" data-hm-count="' + s.id + '">' + esc(s.count || s.plain) + '</span><span class="nm">' + esc(s.name) + '</span><span class="ln">' + esc(s.line) + '</span></button>';
  }
  function libraryHtml() {
    var more = [['/get-grounded-now.html', HERO + 'page-get-grounded-now-narrow.webp', 'Get Grounded Now', 'Calm in a minute or two'], ['/readings.html', HERO + 'page-readings-narrow.webp', 'Readings Library', 'Prayers, poems, and blessings'], ['/library/', HERO + 'library-phone.webp', 'Book Library', 'Books and studies we draw from']];
    if (soberDate() || homeRec().parts.indexOf('sober') >= 0) more.unshift(['/living-sober.html', HERO + 'living-sober-card.webp', 'Living Sober', 'Today, Ride the Wave, milestones']);
    var h = homeRec(); if (h.season && TREES[h.season]) more.unshift([TREES[h.season].href, treeArt(h.season), TREES[h.season].n, TREES[h.season].who]);
    return '<label class="hm-search"><span>Search everything</span><input type="search" id="hm-q" placeholder="Grief, salmon, sleep, a Morning Quiet" autocomplete="off" enterkeyhint="search"></label>' +
      '<div class="hm-results" id="hm-results" aria-live="polite"></div>' +
      '<div class="hm-shelves" id="hm-shelves">' + shelves().map(shelfHtml).join('') + '</div>' +
      '<h2 class="hm-label">More to Explore</h2><div class="hm-more">' + more.map(function (m) { return '<a class="hm-mtool" href="' + m[0] + '">' + tile(m[1], 'sm') + '<span><b>' + esc(m[2]) + '</b><small>' + esc(m[3]) + '</small></span></a>'; }).join('') + '</div>';
  }
  function fillLibrary() {
    loadLib().then(function () {
      if (!document.getElementById('hm-shelves')) return;
      shelves().forEach(function (s) { var el = document.querySelector('[data-hm-count="' + s.id + '"]'); if (el) el.textContent = s.count || s.plain; });
      var q = document.getElementById('hm-q'); if (q && q.value) search(q.value);
    });
  }
  function search(q) {
    var box = document.getElementById('hm-results'); if (!box) return;
    q = String(q || '').trim().toLowerCase();
    if (q.length < 2) { box.innerHTML = ''; return; }
    var t = TREES[S.tree] || TREES.oak, out = [], has = function (s) { return String(s || '').toLowerCase().indexOf(q) >= 0; };
    shelves().forEach(function (s) { if (has(s.name) || has(s.line)) out.push({ k: 'shelf', id: s.id, title: s.name, sub: 'Shelf' }); });
    arr(window.GGTendPublic && window.GGTendPublic.recipes).forEach(function (r) { if (has(r.name) || has(r.protein) || has(r.meal)) out.push({ k: 'recipe', id: r.id, title: r.name, sub: 'Grounded Recipes' }); });
    arr(guidesOf(S.tree)).forEach(function (g) { if (has(g.title) || has(Array.isArray(g.keys) ? g.keys.join(' ') : g.keys)) out.push({ k: 'guide', id: g.id, title: g.title, sub: 'When Life Changes' }); });
    arr(learnOf(S.tree)).forEach(function (l) { if (has(l.title) || has(l.track)) out.push({ k: 'lesson', id: l.id, title: l.title, sub: 'Learn, ' + l.track }); });
    var n = out.length; out = out.slice(0, 14);
    box.innerHTML = n ? '<p class="hm-sub">' + n + (n === 1 ? ' match' : ' matches') + (n > out.length ? ', the first ' + out.length + ' here' : '') + '</p><ul>' + out.map(function (x) { return '<li><button type="button" data-hm-res="' + x.k + '|' + esc(x.id) + '"><b>' + esc(x.title) + '</b><small>' + esc(x.sub) + '</small></button></li>'; }).join('') + '</ul>' :
      '<p class="hm-sub">Try another word, or open a shelf below.</p>';
    void t;
  }
  function openRecipe(id) {
    var hh = tableOf();
    openFrame(new URL('/recipes/' + (hh ? '?serves=' + hh : '') + (id ? '#' + encodeURIComponent(id) : ''), location.href));
  }
  function openLearn(lessonId) {
    var t = TREES[S.tree] || TREES.oak;
    if (lessonId) { openFrame(new URL(t.href + '#learn=' + encodeURIComponent(lessonId), location.href)); return; }
    openFrame(new URL(t.href, location.href), true, function (win) {
      var tries = 0; (function go() { try { if (win.GGLearn && typeof win.GGLearn.open === 'function') { win.GGLearn.open(S.tree); return; } } catch (e) { return; } if (++tries < 40) setTimeout(go, 150); })();
    });
  }
  function openShelf(id) {
    var t = TREES[S.tree] || TREES.oak;
    if (id === 'learn') openLearn();
    else if (id === 'life') openFrame(new URL(t.href + '#life', location.href));
    else if (id === 'recipes') openRecipe('');
    else if (id === 'workouts') goTo('library=workouts');
    else if (id === 'quiet') { if (hasFn('render') && hasFn('counts') && num((hCall('counts') || {}).meditations)) goTo('library=quiet'); else openFrame(new URL('/get-grounded-now.html', location.href)); }
  }
  SUBS.library.quiet = 'Quiet and Meditation';
  OLDSEC.quiet = 'today';

  /* ---------- the profile sheet ---------- */
  var SHEET_ROWS = [
    ['numbers', 'flask', 'Numbers', 'Labs, LDL Path, My Heart Risk, PREVENT'],
    ['household', 'people', 'Household', 'The people at your table and your family'],
    ['settings', 'gear', 'Settings', 'Voice, music, Tending setup, Choose What You Use'],
    ['privacy', 'shield', 'Privacy', 'On this device, locked with your passcode'],
    ['howto', 'sprout', 'How It Works', 'A short painted tour of Today, Week, Grow, and Library'],
    ['switch', 'swap', 'Switch Profile', 'Open another person on this device']
  ];
  function openSheet(sub) {
    var old = document.getElementById('hm-sheet'), keep = old && S.sheet === (sub || '') ? old : null;
    if (keep) return;
    if (old) old.remove();
    S.sheet = sub || '';
    var wrap = document.createElement('div'); wrap.id = 'hm-sheet'; wrap.className = 'hm-sheetwrap';
    var head = sub ? '<div class="hm-sh-hd"><button type="button" class="hm-backbtn" data-hm-me="">' + I('back') + '<span>Back</span></button><h2 class="hm-h2" id="hm-sheet-t">' + esc(SUBS.me[sub]) + '</h2><button type="button" class="hm-x" data-hm="closeme" aria-label="Close">' + I('plus') + '</button></div>'
      : '<div class="hm-sh-hd"><span class="hm-me big" aria-hidden="true">' + esc(initials(S.p && S.p.name)) + '</span><h2 class="hm-h2" id="hm-sheet-t">' + esc(S.p && S.p.name || 'You') + '</h2><button type="button" class="hm-x" data-hm="closeme" aria-label="Close">' + I('plus') + '</button></div>';
    var band = '<picture class="hm-sh-band" aria-hidden="true"><source media="(max-width:699px)" srcset="' + IMG + 'home-morning-narrow.webp"><img src="' + IMG + 'home-morning-wide.webp" alt="" loading="lazy"></picture>';
    var body = sub ? '<div class="hm-sheet-body" id="hm-sheet-body"></div>' :
      '<ul class="hm-sh-rows">' + SHEET_ROWS.map(function (r) { return '<li><button type="button" data-hm-me="' + r[0] + '"><span class="ic">' + I(r[1]) + '</span><span class="tx"><b>' + r[2] + '</b><small>' + r[3] + '</small></span>' + I('arrow') + '</button></li>'; }).join('') + '</ul>' +
      '<button type="button" class="hm-done" data-hm="closeme">Done</button>';
    wrap.innerHTML = '<div class="hm-sheet-bg" data-hm="closeme"></div><section class="hm-sheet' + (sub ? ' tall' : '') + '" role="dialog" aria-modal="true" aria-labelledby="hm-sheet-t" tabindex="-1">' + (sub ? '' : band) + head + body + '</section>';
    (document.querySelector('main.hm') || document.body).appendChild(wrap);
    document.documentElement.classList.add('hm-sheeted');
    if (sub) fillSheet(sub);
    var sec = wrap.querySelector('.hm-sheet'); setTimeout(function () { try { sec.focus({ preventScroll: true }); } catch (e) {} }, 30);
  }
  function fillSheet(sub) {
    var b = document.getElementById('hm-sheet-body'); if (!b) return;
    var h = homeRec();
    if (sub === 'privacy') { b.innerHTML = privacyBrief(true); return; }
    if (sub === 'household') {
      var hh = tableOf(), fam = familyHtml(h);
      b.innerHTML = '<article class="hm-wcard hm-tn-p">' + tile(ART2.people) + '<div class="tx"><span class="ey">Your Table</span><b>' + (hh ? hh + ' people at your table' : 'The people at your table') + '</b><small>Recipes and the shopping list follow this number. Change it in Tending setup.</small></div><button type="button" class="hm-pill" data-hm-me="settings">Change</button></article>' +
        (fam || '<article class="hm-card hm-p-branches"><div class="hm-hd"><span class="hm-badge">' + I('people') + '</span><div><div class="hm-k">Your Family</div><div class="hm-sub">Add the people you tend with. Each one has a tree of their own.</div></div></div><div class="hm-acts"><button type="button" class="hm-btn hm-p-branches" data-hm="addkid">' + I('plus') + 'Add a Family Member</button><button type="button" class="hm-btn line hm-p-branches" data-hm="addlove">' + I('love') + 'Someone I Love</button></div></article>');
      return;
    }
    if (sub === 'settings') {
      var on = {}; h.parts.forEach(function (k) { on[k] = true; });
      b.innerHTML = '<article class="hm-card hm-p-roots"><div class="hm-k">Choose What You Use</div><h3 class="hm-h3">What Would You Like to Tend?</h3><p class="hm-sub" style="margin:6px 0 12px">Your tree check-in comes with every Home. Turn on any daily tending you like; Today shows only what you choose.</p>' + tend6Html(on, 'data-hm-setpart') +
        (h.hidden.tend ? '<div class="hm-quiet" style="margin-top:12px"><button type="button" data-hm="showtend">Show the Start Tending card again</button></div>' : '') + '</article>' +
        '<div class="hm-acts"><button type="button" class="hm-btn hm-p-leaves" data-hm-tab="today=tending">' + I('sprout') + 'Tending Setup</button></div>' +
        '<h3 class="hm-label">Tending Settings</h3><div id="hm-tend" class="hm-sec" data-sec="settings"><p class="hm-loading">Opening…</p></div>';
      var box = document.getElementById('hm-tend');
      loadTending().then(function () { if (!box.isConnected) return; if (!tendReady()) { box.innerHTML = tendSoonHtml(); return; } if (hasFn('render')) paintSection(box, 'settings'); else box.innerHTML = '<p class="hm-sub">Voice, music, and your Tending plan live in Tending Setup.</p>'; });
      return;
    }
    if (sub === 'numbers') { b.innerHTML = '<div id="hm-tend" class="hm-sec" data-sec="numbers"><p class="hm-loading">Opening your numbers…</p></div>'; paintSection(document.getElementById('hm-tend'), 'numbers'); }
  }
  function closeSheet(quiet) {
    var s = document.getElementById('hm-sheet'); if (!s) return;
    s.remove(); S.sheet = null; document.documentElement.classList.remove('hm-sheeted');
    if (!quiet) { var b = document.querySelector('.hm-me'); if (b) try { b.focus({ preventScroll: true }); } catch (e) {} }
  }
  function leaveSheet() {
    if (S.sheetPushed) { S.sheetPushed = 0; history.go(-(S.sheetDepth || 1)); S.sheetDepth = 0; return; }
    try { history.replaceState(null, '', location.pathname + '#' + (S.under || 'today')); } catch (e) {}
    closeSheet(); S.view = viewOf();
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.getElementById('hm-sheet') && !document.querySelector('.hm-frame')) leaveSheet(); });
  document.addEventListener('input', function (e) { if (e.target && e.target.id === 'hm-q') { loadLib().then(function () { search(e.target.value); }); } });


  /* ---------- clicks ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-hm],[data-hm-who],[data-hm-stage],[data-hm-part],[data-hm-setpart],[data-hm-ck],[data-hm-play],[data-hm-nav],[data-hm-tab],[data-hm-me],[data-hm-done],[data-hm-go],[data-hm-wk],[data-hm-tree],[data-hm-shelf],[data-hm-res],[data-hm-share],[data-hm-new]');
    if (!t || !t.closest('.hm')) return;
    if (t.hasAttribute('data-hm-nav')) { var nv = t.getAttribute('data-hm-nav'); e.preventDefault(); goTo(nv === 'tree' ? 'tree' : 'today'); return; }
    if (t.hasAttribute('data-hm-tab')) { e.preventDefault(); var tb = t.getAttribute('data-hm-tab'); if (document.getElementById('hm-sheet')) { S.sheetPushed = 0; closeSheet(true); } goTo(tb); return; }
    if (t.hasAttribute('data-hm-me')) {
      var ms = t.getAttribute('data-hm-me');
      if (ms === 'switch') { GGP.openDialog().then(function () { leaveSheet(); render(); }); return; }
      if (ms === 'howto') { howItWorks(); return; }
      if (!ms && S.sheetDepth > 1) { S.sheetDepth--; history.back(); return; }
      S.sheetDepth = (S.sheetDepth || 0) + 1; S.sheetPushed = 1; location.hash = ms ? '#me=' + ms : '#me'; return;
    }
    if (t.hasAttribute('data-hm-done')) { itemDone(t.getAttribute('data-hm-done'), t); return; }
    if (t.hasAttribute('data-hm-go')) { itemGo(t.getAttribute('data-hm-go')); return; }
    if (t.hasAttribute('data-hm-new')) { if (hasFn('newsSeen')) hCall('newsSeen'); refreshPane(); return; }
    if (t.hasAttribute('data-hm-wk')) { var wk = t.getAttribute('data-hm-wk'); if (wk && hasFn('act')) hCall('act', wk); return; }
    if (t.hasAttribute('data-hm-tree')) { openTreeSheet(t.getAttribute('data-hm-tree')); return; }
    if (t.hasAttribute('data-hm-share')) { shareCard(t.getAttribute('data-hm-share')); return; }
    if (t.hasAttribute('data-hm-shelf')) { openShelf(t.getAttribute('data-hm-shelf')); return; }
    if (t.hasAttribute('data-hm-res')) {
      var rs = t.getAttribute('data-hm-res').split('|'), k = rs[0], id = rs.slice(1).join('|'), tt = TREES[S.tree] || TREES.oak;
      if (k === 'shelf') openShelf(id); else if (k === 'recipe') openRecipe(id); else if (k === 'guide') openFrame(new URL(tt.href + '#life=' + encodeURIComponent(id), location.href)); else if (k === 'lesson') openLearn(id);
      return;
    }
    if (t.hasAttribute('data-hm-who')) { W.who = t.getAttribute('data-hm-who'); t.parentNode.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b === t)); }); return; }
    if (t.hasAttribute('data-hm-stage')) {
      W.stage = t.getAttribute('data-hm-stage'); document.querySelectorAll('[data-hm-stage]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === t)); });
      var nt = document.getElementById('hm-stage-note'), st = TREES[W.stage];
      if (nt) nt.textContent = st.season ? st.n + ' joins your Library. Your own tree follows your age, and you can change it any time.' : W.stage === 'pine' ? 'Pine is set up with a grown-up who agrees, and only the teen\'s passcode opens it.' : 'Maple and Aspen are set up with a grown-up, who keeps a key with their own passcode.';
      return;
    }
    if (t.hasAttribute('data-hm-part')) { var pk = t.getAttribute('data-hm-part'); W.parts[pk] = !W.parts[pk]; t.setAttribute('aria-pressed', String(W.parts[pk])); return; }
    if (t.hasAttribute('data-hm-setpart')) {
      var h = homeRec(), sk = t.getAttribute('data-hm-setpart'), i = h.parts.indexOf(sk);
      if (i >= 0) h.parts.splice(i, 1); else h.parts.push(sk);
      t.setAttribute('aria-pressed', String(i < 0)); saveHome(); toast('Saved, locked on this device.'); refreshPane(); return;
    }
    if (t.hasAttribute('data-hm-play')) { playVideo(t.getAttribute('data-hm-play'), t); return; }
    var act = t.getAttribute('data-hm');
    if (act === 'open') GGP.openDialog().then(render);
    else if (act === 'create') create();
    else if (act === 'home') goTo('today');
    else if (act === 'me') { S.sheetDepth = 1; S.sheetPushed = 1; location.hash = '#me'; }
    else if (act === 'closeme') leaveSheet();
    else if (act === 'addtend') goTo('today=tending');
    else if (act === 'hidetend') { homeRec().hidden.tend = true; saveHome(); toast('Hidden. Start Tending waits in Settings whenever you like.'); refreshPane(); }
    else if (act === 'showtend') { homeRec().hidden.tend = false; saveHome(); toast('Start Tending is back on Today.'); fillSheet('settings'); refreshPane(); }
    else if (act === 'backup') GGP.saveBackup();
    else if (act === 'restore') GGP.restore(function () { render(); });
    else if (act === 'rootwords') GGP.rootWords(S.id);
    else if (act === 'manage') GGP.manage(S.id);
    else if (act === 'lock') { closeSheet(true); GGP.lock().then(function () { goTo('today'); }); }
    else if (act === 'addkid') GGP.createDialog({ reason: 'Add a family member. Kids and teens are set up with you as their grown-up.' }).then(function (ok) { if (ok) goTo('today'); else render(); });
    else if (act === 'addlove') GGP.createDialog({ forOther: true, keepMe: true }).then(function (ok) { if (ok) goTo('today'); else render(); });
    else if (act === 'tour') howItWorks();
    else if (act === 'kiddid') { var hd = homeRec(); hd.kid[today()] = hd.kid[today()] ? 0 : 1; saveHome(); render(); }
  });

  /* ---------- BLD 884: the welcome tour ----------
     The first time a profile opens The Grounded Way after BLD 884, a short tour over the app: four painted cards for a
     grown-up (Today, Week, Grow, Library), two for Maple and Aspen (Today, My Tree) in kid words. Next, Back, dots, Skip
     anytime, Start on the last card. Remembered per profile in the home record (GGP data 'home', tour: 'b884'), so it rides
     the locked profile and its backups. Reopens from the initials sheet as How It Works (kids: a How It Works link). */
  var TOUR_V = 'b884';
  var TOUR = [
    { k: 'today', art: 'home-morning', ey: 'Welcome to The Grounded Way', t: 'Today', d: 'Your whole day in order: your practices, meals, movement, and quiet, with Right Now at the top.', tr: 'Tap the circle on one practice when you do it, and watch your day fill.' },
    { k: 'week', art: 'recipes', ey: 'Tab 2 of 4', t: 'Week', d: 'Seven days at a glance: your meals, your movement, and one shopping list for the week.', tr: 'Look over the next few days and pick your shopping day.' },
    { k: 'grow', art: 'tend-fruit', ey: 'Tab 3 of 4', t: 'Grow', d: 'Your tree, its six parts, and your growth plan, with each check-in adding to your story.', tr: 'Open your Growth Plan and choose one practice to begin with.' },
    { k: 'library', art: 'tend-mind', ey: 'Tab 4 of 4', t: 'Library', d: 'Lessons, guides for when life changes, recipes, workouts, and quiet, all in one place.', tr: 'Search one word, like sleep or calm, and see what is waiting.', note: 'Your initials, top right, open Numbers, Household, Settings, Privacy, and this tour again.' }
  ];
  var KTOUR = [
    { k: 'today', art: 'home-morning', ey: 'Welcome to Your Tree', t: 'Today', d: 'Here is your day with your tree: a fun practice to try and your own checkmarks.', tr: 'Tap the circle when you do a practice. Your tree loves it!' },
    { k: 'tree', art: 'tend-fruit', ey: 'Your Tree', t: 'My Tree', d: 'Your tree shows how each part of you is growing, from roots to fruit.', tr: 'Check in with your grown-up and watch your tree light up!' }
  ];
  var TOUR_ART = { 'home-morning': [IMG + 'home-morning-wide.webp', IMG + 'home-morning-narrow.webp'], recipes: [IMG + 'recipes-wide.webp', IMG + 'recipes-narrow.webp'], 'tend-fruit': [IMG + 'tend-fruit.webp', IMG + 'tend-fruit.webp'], 'tend-mind': [IMG + 'tend-mind.webp', IMG + 'tend-mind.webp'] };
  var T = { open: false, i: 0, list: TOUR, asked: {}, tries: 0, back: null };
  function tourSeen() { var h = homeRec(); return !!h.tour; }
  function maybeTour() {
    if (!S.id || T.open || T.asked[S.id] || tourSeen()) return;
    T.asked[S.id] = 1; T.tries = 0;
    var id = S.id;
    (function wait() {
      if (S.id !== id || T.open) return;
      var busy = document.querySelector('.ggp-back,.hm-frame,#hm-sheet,#hm-plan');
      if (busy || document.hidden) { if (++T.tries < 120) setTimeout(wait, 700); else T.asked[id] = 0; return; }
      if (!tourSeen()) openTour();
    })();
  }
  function tourCardHtml() {
    var c = T.list[T.i], n = T.list.length, last = T.i === n - 1, a = TOUR_ART[c.art] || TOUR_ART['home-morning'];
    return '<div class="hm-tour-pic"><picture aria-hidden="true"><source media="(max-width:699px)" srcset="' + a[1] + '"><img src="' + a[0] + '" alt="" decoding="async"></picture>' +
        '<div class="hm-tour-hd"><span class="hm-tour-ey">' + esc(c.ey) + '</span><h2 class="hm-tour-t" id="hm-tour-t">' + esc(c.t) + '</h2>' + (T.i === 0 ? '<span class="hm-tour-open">Open to everyone during our launch season</span>' : '') + '</div></div>' +
      '<div class="hm-tour-body" id="hm-tour-d"><p class="hm-tour-d">' + esc(c.d) + '</p><p class="hm-tour-try"><b>Try this:</b> ' + esc(c.tr) + '</p>' + (c.note ? '<p class="hm-tour-note">' + esc(c.note) + '</p>' : '') +
        // BLD 893: the last card opens My Grounded Way Plan.
        (last && !isKid(S.p) && planOK() ? '<button type="button" class="hm-tour-plan" data-hm-tour="plan">' + I('sprout') + '<span>' + (waySaved() ? 'Change My Plan' : 'Build My Grounded Way Plan') + '</span></button>' : '') + '</div>' +
      '<div class="hm-tour-ft">' +
        (T.i > 0 ? '<button type="button" class="hm-tour-b back" data-hm-tour="back">' + I('back') + '<span>Back</span></button>' : '<span class="hm-tour-sp" aria-hidden="true"></span>') +
        '<span class="hm-tour-dots" role="img" aria-label="Card ' + (T.i + 1) + ' of ' + n + '">' + T.list.map(function (x, j) { return '<i' + (j === T.i ? ' class="on"' : '') + '></i>'; }).join('') + '</span>' +
        '<button type="button" class="hm-tour-b next" data-hm-tour="' + (last ? 'start' : 'next') + '"><span>' + (last ? 'Start' : 'Next') + '</span>' + (last ? I('sprout') : I('arrow')) + '</button>' +
      '</div>';
  }
  function openTour() {
    if (T.open || !S.id) return;
    T.list = isKid(S.p) ? KTOUR : TOUR; T.i = 0; T.open = true; T.back = document.activeElement;
    var wrap = document.createElement('div'); wrap.id = 'hm-tour'; wrap.className = 'hm-tourwrap' + (isKid(S.p) ? ' kid' : '');
    wrap.innerHTML = '<div class="hm-tour-bg" aria-hidden="true"></div><section class="hm-tour" role="dialog" aria-modal="true" aria-labelledby="hm-tour-t" aria-describedby="hm-tour-d" tabindex="-1">' +
      '<button type="button" class="hm-tour-skip" data-hm-tour="skip">Skip</button><div class="hm-tour-in" id="hm-tour-in">' + tourCardHtml() + '</div></section>';
    (document.querySelector('main.hm') || document.body).appendChild(wrap);
    document.documentElement.classList.add('hm-toured');
    setTimeout(function () { var b = wrap.querySelector('.hm-tour-b.next'); try { (b || wrap.querySelector('.hm-tour')).focus({ preventScroll: true }); } catch (e) {} }, 30);
  }
  function tourStep(d) {
    var nx = Math.max(0, Math.min(T.list.length - 1, T.i + d)); if (nx === T.i) return;
    T.i = nx; var box = document.getElementById('hm-tour-in'); if (!box) return;
    box.innerHTML = tourCardHtml();
    var b = box.querySelector(d > 0 ? '.hm-tour-b.next' : (T.i > 0 ? '.hm-tour-b.back' : '.hm-tour-b.next')); try { b.focus({ preventScroll: true }); } catch (e) {}
  }
  function closeTour() {
    var w = document.getElementById('hm-tour'); if (w) w.remove();
    document.documentElement.classList.remove('hm-toured');
    var was = T.open; T.open = false;
    if (was && S.id && window.GGP && GGP.isOpen && GGP.isOpen(S.id)) { var h = homeRec(); if (h.tour !== TOUR_V) { h.tour = TOUR_V; saveHome(); } }
    var back = T.back; T.back = null;
    if (back && back.isConnected && back !== document.body) { try { back.focus({ preventScroll: true }); } catch (e) {} }
  }
  /* How It Works, from the initials sheet (or the kid Home): close the sheet, then the tour. */
  function howItWorks() {
    if (document.getElementById('hm-sheet')) leaveSheet();
    setTimeout(openTour, 120);
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-hm-tour]'); if (!t) return;
    var a = t.getAttribute('data-hm-tour');
    if (a === 'next') tourStep(1); else if (a === 'back') tourStep(-1); else if (a === 'skip' || a === 'start') closeTour();
    else if (a === 'plan') { closeTour(); setTimeout(function () { openPlan(); }, 60); }
  });
  document.addEventListener('keydown', function (e) {
    if (!T.open) return;
    var w = document.getElementById('hm-tour'); if (!w) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); closeTour(); return; }
    if (e.key === 'ArrowRight' && !(e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName))) { tourStep(1); return; }
    if (e.key === 'ArrowLeft' && !(e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName))) { tourStep(-1); return; }
    if (e.key !== 'Tab') return;
    var f = [].slice.call(w.querySelectorAll('button')).filter(function (b) { return b.offsetParent !== null; }); if (!f.length) return;
    var first = f[0], last = f[f.length - 1], cur = document.activeElement;
    if (!w.contains(cur)) { e.preventDefault(); first.focus(); return; }
    if (e.shiftKey && (cur === first || cur === w.querySelector('.hm-tour'))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && cur === last) { e.preventDefault(); first.focus(); }
  }, true);
  document.addEventListener('focusin', function (e) { if (!T.open) return; var w = document.getElementById('hm-tour'); if (w && !w.contains(e.target)) { var b = w.querySelector('.hm-tour-b.next'); if (b) try { b.focus({ preventScroll: true }); } catch (x) {} } });

  function pruneDays(h) { var cut = addDays(today(), -60); Object.keys(h.days).forEach(function (k) { if (k < cut) delete h.days[k]; }); }

  /* =====================================================================
     BLD 893: My Grounded Way Plan (Chris, October 29, 2026: "1", the approved mockup patches/bld893/mockup/my-plan.html).
     Ten screens over the app: Welcome, Growing Edges, Body, Mind, Spirit, Table, Practices, Start Small, Your Week, Today.
     The plan is a guided way to set the stores that already exist; it keeps no copy of them:
       Body, Mind, Table   Tending's own settings through GGHealth.applyPlan (set.track, level, cardioDays, days, mins, gear,
                           flow and flowDays, medFreq, medTime, use, house), the same fields the start-up check writes
       Sacred Pause        the home record's parts ('pray'), the A Sacred Pause card already on Today
       Practices           the lead tree's growth plan (tend.plan[part].selected), the same way the tree page saves picks
       Lead tree           the profile's own tree (GGP.setTree), so Today, Week, and Grow follow it
     and one small record of its own choices in the home record (GGP data 'home'):
       way: {v: 1, saved: 'YYYY-MM-DD', lead, spirit: {gratitude, kindness, nature, quiet, pause, prayer: 1},
             prac: ['part|Name'] picked here, pend: ['part|Name'] waiting for week 3 (Start Lighter), light: 1,
             join: 'YYYY-MM-DD' (week 3 begins), joined: 'YYYY-MM-DD', note: 1 (the one-time note on Today), draft: 1}
     Start Small applies the choices as a draft, so Your Week and Today read the real stores; Save My Plan keeps them, and
     closing before Save My Plan puts every store back as it was. Spirit items are Today cards on their own days, marked in the
     tree's day record (tend.days[date].d, the tree's own name when its library has one), so they grow their part of the tree.
     Prayer is offered only as a choice, never preselected. Kids' trees (Maple, Aspen) keep their own plans.
     ===================================================================== */
  var WP_SCREENS = ['Welcome', 'Growing Edges', 'Body', 'Mind', 'Spirit', 'Table', 'Practices', 'Start Small', 'Your Week', 'Today'];
  var WP_ALL = [0, 1, 2, 3, 4, 5, 6];
  var WP_SPIRIT = [
    { id: 'gratitude', n: 'Gratitude', line: 'Three good things, morning or night', today: 'Three good things from your day.', part: 'fruit', days: WP_ALL, hour: 21, when: 'Evening', min: 3,
      how: ['Find a quiet minute, in the morning or before sleep.', 'Name three good things from the last day. Small ones count.', 'For each one, notice what helped it happen.'] },
    { id: 'kindness', n: 'Kindness', line: 'Warm wishes and one kind act', today: 'Warm wishes and one kind act.', part: 'branches', days: [3, 6], hour: 12.5, when: 'Any time', min: 5,
      how: ['Picture someone you care about and wish them well: may you be well, may you be at peace.', 'Widen the circle to someone you know a little, and then to yourself.', 'Choose one kind act for today, and do it.'] },
    { id: 'nature', n: 'Time Outside', line: 'A walk among trees, a sky to look at', today: 'A slow walk among trees, or a sky to look at.', part: 'roots', days: [6, 0], hour: 15, when: 'Afternoon', min: 30,
      how: ['Step outside to a park, a tree lined street, or your own yard.', 'Walk or sit slowly, with your phone in your pocket.', 'Take it in one sense at a time: the light, the sounds, the air, the ground under you.'] },
    { id: 'quiet', n: 'Quiet Reflection', line: 'Ten still minutes with a question', today: 'Ten still minutes with one question.', part: 'bark', days: [1, 4], hour: 20, when: 'Evening', min: 10,
      how: ['Sit somewhere quiet for about ten minutes.', 'Hold one question, like: what mattered most today?', 'Let your thoughts settle, and write one line if you like.'] },
    { id: 'pause', n: 'Sacred Pause', line: 'A breath before meals or at noon', part: 'roots', days: WP_ALL, hour: 12.5, when: 'Any time', min: 1, home: 'pray' },
    { id: 'prayer', n: 'Prayer in My Tradition', title: 'Prayer', line: 'Only when you choose it, in your own words', today: 'In your own words, in the way of your own tradition.', part: 'roots', days: WP_ALL, hour: 7, when: 'Morning', min: 5,
      how: ['Find a quiet moment, in the way of your own tradition.', 'Pray in your own words, or with words you know by heart.', 'Close with a slow breath, and carry it into your day.'] }
  ];
  var WP_SP = {}; WP_SPIRIT.forEach(function (x) { WP_SP[x.id] = x; });
  /* The tree's own practice record where its library has one, so a spirit item and the tree's practice are one record. */
  var SP_REC = { gratitude: 'fruit|Three Good Things', kindness: 'branches|Kindness', nature: 'roots|A Walk Among Trees', quiet: 'bark|Quiet Reflection', pause: 'roots|Sacred Pause', prayer: 'roots|Prayer' };
  function spiritPid(id, tree) { return id === 'nature' && tree === 'pine' ? 'roots|Time Outside' : SP_REC[id]; }
  var WP_DAYSETS = { 2: [1, 4], 3: [1, 3, 5], 4: [1, 2, 4, 5], 5: [1, 2, 3, 4, 5], 6: [1, 2, 3, 4, 5, 6] };
  var WP_DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], WP_ORDER = [1, 2, 3, 4, 5, 6, 0];
  var WP_PLACE = { home: [], light: ['dumbbells', 'bands'], gym: ['dumbbells', 'bands', 'bar', 'dip', 'step', 'bench', 'machines', 'cardio'] };
  var WP_TRACK = { strength: 'Strength', cardio: 'Cardio', mixed: 'Mixed', gentle: 'Gentle' };
  var WP_MED = { daily: 'Every Day', few: 'A Few Times a Week', weekly: 'Once a Week', later: 'Later' };
  var WP_WORDS = { roots: 'What grounds you', trunk: 'Purpose and goals', bark: 'Mind and calm', branches: 'People and connection', leaves: 'Body and energy', fruit: 'Joy and progress' };
  var WP_LONG = { roots: 'what grounds you', trunk: 'purpose and goals', bark: 'calm and a steady mind', branches: 'people and connection', leaves: 'movement and energy', fruit: 'joy and progress' };
  /* Suggestions stay plain and general: faith practices wait for a person to choose them in the tree, and practices written
     for one season of life (Living Sober, health and ability, loss) stay in the tree, where they show as Fits You. */
  var WP_SKIP = /^(Prayer|Worship|Tithe|Scripture|Ritual|Teach|Faith|Faith Community|Centering Prayer|Examen|Breath Prayer|Lament|Sabbath Hour|Spiritual Direction|Mealtime Blessing|Sacred Music|Prayers You Know by Heart|Hold Someone in Light|Find Your People for Faith|Talk with a Faith Mentor|Carry Your Questions|Bring Your Questions|What Holds Me Up|Medicine|See the Doctor Early|My Medicines|Get Counseling|Talk With a Therapist|My Safety Plan|Support Group|Sober Week|Tell a Safe Adult|Name Your Trusted Adult|Pacing Your Day|Rest Before You're Spent|Appointment Prep|Hard-Day Plan|Body Kindness Scan|Quiet the Senses|Say What You Need|A Break for the Helper|Worth Beyond Doing|Fall Confidence|Home Safety Walk-Through|Grief Time|Letter to Someone Gone|Make Your Wishes Known|Comfort Within Reach|Worth Living|Caregiver Pause|Shift Worker's Rest Plan)$/i;
  var WP = { open: false, i: 0, d: null, snap: null, back: null, sug: null };

  function wayRec() { var h = S.id && window.GGP ? GGP.data(S.id, 'home') : null; return obj(h && h.way); }
  function waySaved() { return !!wayRec().saved; }
  function planOK() { return !!(S.id && S.p && !isKid(S.p) && FILL_TREES.indexOf(S.tree) >= 0); }
  /* The grown-up trees this profile has used (a check-in or a tend record), for the lead tree chips. */
  function wpTrees() {
    if (S.tree === 'pine') return ['pine'];
    var all = obj(GGP.data(S.id)), out = ['oak', 'birch', 'sequoia'].filter(function (tr) { return tr === S.tree || (all[tr] && typeof all[tr] === 'object' && (lastCheckin(S.id, tr) || obj(all[tr].tend).plan)); });
    return out.length ? out : [S.tree];
  }
  /* The spirit items on a day (the person's choices, their days, and Start Lighter's wait until week 3). */
  function spiritOn(date, w) {
    w = w || wayRec(); if (!w.saved && !w.draft) return [];
    if (w.light && w.join && date < w.join) return [];
    var dow = parse(date).getDay(), sp = obj(w.spirit);
    return WP_SPIRIT.filter(function (x) { return sp[x.id] && x.days.indexOf(dow) >= 0; });
  }
  /* Today's spirit cards. Sacred Pause is the A Sacred Pause card already on Today; a spirit item already in the growth plan
     is that practice's own card. */
  function spiritItems() {
    if (!planOK()) return [];
    var tree = S.tree, t = tendGet(S.id, tree), inPlan = {};
    planList(S.id, tree).forEach(function (x) { inPlan[x.pid] = 1; });
    return spiritOn(today()).filter(function (x) { return !x.home; }).map(function (x) {
      var pid = spiritPid(x.id, tree); if (inPlan[pid]) return null;
      var dn = practiceDone(t, pid), P = PART[x.part];
      return { key: 's:' + x.id, src: 'spirit', sid: x.id, pid: pid, part: x.part, hour: x.hour, when: x.when + ' · ' + P.n, title: x.title || x.n, sub: x.today || x.line + '.', btn: 'How', tint: x.part, done: dn, pressed: dn, image: PRAC_ART[x.part], steps: x.how, min: x.min, r: 'd', doneToday: dn };
    }).filter(Boolean);
  }
  /* A spirit item done or undone: the tree's own day mark, the same mark GGTend.check makes. */
  function spiritMark(pid, on) {
    var tree = S.tree, t = tendGet(S.id, tree, true); if (!t) return false;
    if (!t.days || typeof t.days !== 'object') t.days = {};
    var d = today(), x = t.days[d];
    if (!x || typeof x !== 'object') x = t.days[d] = { d: [], n: {}, e: [], a: [] };
    if (!Array.isArray(x.d)) x.d = [];
    var i = x.d.indexOf(pid); if (on && i < 0) x.d.push(pid); else if (!on && i >= 0) x.d.splice(i, 1);
    publishTree(S.id, tree, t); saveHome(); return true;
  }
  /* Start Lighter: on the first day of week 3 the waiting practices join the growth plan, and Today shows one note. */
  function wayJoin() {
    if (!planOK()) return;
    var h = GGP.data(S.id, 'home'); if (!h || !h.way || !h.way.saved || !h.way.light || !h.way.join || h.way.joined || today() < h.way.join) return;
    var w = h.way; w.joined = today(); w.note = 1;
    if (arr(w.pend).length) { addPicks(w.lead || S.tree, w.pend, []); w.prac = arr(w.prac).concat(w.pend); w.pend = []; }
    saveHome();
  }
  function wayNoteHtml() {
    var w = wayRec(); if (!w.note) return '';
    return '<article class="hm-card hm-p-leaves hm-waynote" role="status"><div class="hm-k">Week 3 · Your Plan Grows</div><h3 class="hm-h3">Spirit and practices join your day</h3>' +
      '<p class="hm-sub">Two good weeks of movement, meditation, and dinner. Today the rest of your plan joins in: your spirit choices and the practices for your Growing Edges.</p>' +
      '<div class="hm-acts tight"><button type="button" class="hm-pill" data-hm-wpnote="1">Got It</button></div></article>';
  }
  /* Add (and take away) names in a tree's growth plan, as the tree page does: tend.plan[part].selected. */
  function addPicks(tree, add, remove) {
    var t = tendGet(S.id, tree, true); if (!t) return;
    if (!t.plan || typeof t.plan !== 'object') { var p0 = planOf(S.id, tree); t.plan = p0 ? JSON.parse(JSON.stringify(p0)) : {}; }
    arr(add).forEach(function (pid) {
      var c = pid.indexOf('|'), part = pid.slice(0, c), name = pid.slice(c + 1); if (PART_KEYS.indexOf(part) < 0 || !name) return;
      var x = t.plan[part] = obj(t.plan[part]); if (!Array.isArray(x.selected)) x.selected = [];
      var has = x.selected.indexOf(name) >= 0 || x.custom === name || arr(x.own).indexOf(name) >= 0 || arr(x.lib).some(function (l) { return l && l.n === name; });
      if (!has) x.selected.push(name);
    });
    arr(remove).forEach(function (pid) {
      var c = pid.indexOf('|'), part = pid.slice(0, c), name = pid.slice(c + 1), x = t.plan[part]; if (!x) return;
      if (Array.isArray(x.selected)) { var j = x.selected.indexOf(name); if (j >= 0) x.selected.splice(j, 1); }
    });
  }

  /* ---------- the draft: every screen starts from the saved choices ---------- */
  function wpInfo() { return hCall('planInfo') || null; }
  function wpDraft() {
    var info = wpInfo() || {}, s = obj(info.set || tendSet()), w = wayRec(), h = homeRec(), gentle = s.level === 'gentle';
    var house = obj(s.house), n = ((+house.adults || 0) + arr(house.kids).length) || num(s.household) || 0;
    var trees = wpTrees();
    return {
      lead: w.lead && trees.indexOf(w.lead) >= 0 ? w.lead : S.tree,
      track: gentle ? 'gentle' : (s.track === 'cardio' || s.track === 'mixed' ? s.track : 'strength'),
      cardioDays: +s.cardioDays === 2 ? 2 : 1, days: WP_DAYSETS[+s.days] ? +s.days : 3, mins: [20, 40, 60].indexOf(+s.mins) >= 0 ? +s.mins : 20,
      level: s.level && s.level !== 'gentle' ? s.level : 'root', gear: Array.isArray(s.gear) ? s.gear.slice() : (WP_PLACE[s.place] || []).slice(),
      flow: !!s.flow || s.track === 'both', check: Object.assign({}, obj(s.check)), cleared: !!s.cleared,
      med: WP_MED[s.medFreq] ? s.medFreq : 'daily', medTime: /^(morning|afternoon|evening)$/.test(s.medTime || '') ? s.medTime : 'morning',
      spirit: w.spirit ? Object.assign({}, w.spirit) : (h.parts.indexOf('pray') >= 0 ? { pause: 1 } : {}),
      food: info.done && arr(info.use).indexOf('food') < 0 ? 'later' : 'yes', household: n > 0 && n < 30 ? Math.round(n) : 2,
      prac: null, prac0: null, light: !!w.light
    };
  }
  function wpNeedCheck(info) { info = info || wpInfo() || {}; return !!(info.pub && !info.done && info.check && arr(info.check.questions).length); }
  function wpHold(info) {
    info = info || wpInfo() || {}; var d = WP.d;
    if (wpNeedCheck(info)) return arr(info.check.questions).some(function (q) { return d.check[q.id] === true; }) && !d.cleared;
    var s = obj(info.set); return !!(s.checkYes && !s.cleared);
  }

  /* ---------- the week a set of choices makes (before saving, for Practices and Start Small) ---------- */
  function wpCardioSlots(n, c) { c = Math.max(1, Math.min(n > 1 ? n - 1 : 1, Math.floor(+c || 1))); var out = []; for (var j = 0; j < c; j++) { var k = Math.min(n - 1, Math.floor((j + 0.5) * n / c)); while (out.indexOf(k) >= 0 && k < n - 1) k++; if (out.indexOf(k) < 0) out.push(k); } return out; }
  function wpMedOn(f, dow) { return f === 'daily' ? true : f === 'few' ? [2, 4, 6].indexOf(dow) >= 0 : f === 'weekly' ? dow === 0 : false; }
  function wpSessions(d) {
    var info = wpInfo() || {}, wd = WP_DAYSETS[d.days] || WP_DAYSETS[3], cs = d.track === 'mixed' ? wpCardioSlots(wd.length, d.cardioDays) : [], out = [];
    var flows = arr(info.flows), meds = arr(info.meds);
    for (var dow = 0; dow < 7; dow++) {
      var L = [], k = wd.indexOf(dow);
      if (k >= 0) { var kind = d.track === 'cardio' || cs.indexOf(k) >= 0 ? 'cardio' : 'strength'; L.push({ kind: kind, id: '', title: d.track === 'gentle' ? 'Gentle' : kind === 'cardio' ? 'Cardio' : 'Strength', t: 'move' }); }
      else if (d.flow && dow !== 0) { var f = flows.length ? flows[((dow + 6) % 7) % flows.length] : { id: '', title: 'Flow', style: 'daily' }; L.push({ kind: 'flow', id: f.id, title: f.title || 'Flow', style: f.style || 'daily', t: 'flow' }); }
      if (wpMedOn(d.med, dow)) { var m = meds.filter(function (x) { return x.day === WP_DOW[dow]; })[0] || meds[0] || { id: '', title: 'Meditation' }; L.push({ kind: 'meditation', id: m.id, title: m.title || 'Meditation', t: 'med' }); }
      out.push(L);
    }
    return out;
  }
  /* What fills a practice in this week: the days and the first session, for "Filled by ..." */
  function wpFill(pid, d, ses) {
    if (!window.GGFills) return null;
    ses = ses || wpSessions(d); var days = [], first = null;
    ses.forEach(function (L, dow) { L.forEach(function (s) { if (GGFills.fills(pid, s, d.lead)) { if (days.indexOf(dow) < 0) days.push(dow); if (!first) first = s; } }); });
    if (!first) return null;
    var rule = GGFills.fillsFor(pid, null, d.lead) || {};
    var label = first.kind === 'meditation' ? (rule.only ? 'Filled by ' + first.title : 'Filled by your meditations') : first.kind === 'flow' ? 'Filled by Flow' : 'Filled by your ' + (d.track === 'gentle' ? 'Gentle' : first.kind === 'cardio' ? 'Cardio' : 'Strength') + ' workouts';
    return { days: days, label: label };
  }
  function wpPicks() { var d = WP.d; return d && d.prac ? Object.keys(d.prac).filter(function (k) { return d.prac[k]; }) : []; }
  function wpRhythm(pid, tree) { return rhythmFull(pid, tree).r; }
  /* Each day of the week the choices make: its items, dinner aside (Start Small counts these). */
  function wpProject(d) {
    var ses = wpSessions(d), picks = wpPicks(), out = [];
    WP_ORDER.forEach(function (dow) {
      var it = [];
      ses[dow].forEach(function (s) { it.push({ t: s.t === 'med' ? 'Meditation' : s.title, c: s.t === 'med' ? 'bark' : s.t === 'flow' ? 'leaves' : 'move', core: 1 }); });
      WP_SPIRIT.forEach(function (x) { if (d.spirit[x.id] && x.days.indexOf(dow) >= 0) it.push({ t: x.title || x.n, c: x.part }); });
      picks.forEach(function (pid) {
        if (wpRhythm(pid, d.lead) !== 'd') return;
        if (ses[dow].some(function (s) { return window.GGFills && GGFills.fills(pid, s, d.lead); })) return;
        it.push({ t: pid.split('|')[1], c: pid.split('|')[0] });
      });
      if (d.food === 'yes' && dow === 0) it.push({ t: 'Sunday Together Prep', c: 'plate', core: 1 });
      out.push({ dow: dow, it: it });
    });
    return out;
  }
  function wpMaxDay(d) { return Math.max.apply(null, wpProject(d).map(function (x) { return x.it.length; })); }

  /* ---------- suggestions for the Growing Edges, from the lead tree's own practice library ---------- */
  function wpLib(tree) { var src = PRAC[tree]; return src ? window[src[1]] || null : null; }
  function wpSuggest() {
    var d = WP.d, tree = d.lead, ck = lastCheckin(S.id, tree), P = wpLib(tree); if (!ck || !P) return [];
    var ed = edgesOf(ck), parts = ed.edges.slice(0, 2); if (!parts.length && ed.lead) parts = [ed.lead];
    var ses = wpSessions(d), out = [], RW = { d: 'daily', w: 'weekly', f: 'a few times a week', n: 'now and then' };
    parts.forEach(function (part) {
      var def = arr(P.DOMAIN_DEFS).filter(function (x) { return x.key === part; })[0]; if (!def) return;
      var seen = {}, list = [];
      arr(def.restore).concat(arr(obj(P.NEW)[part])).forEach(function (r, i) {
        var name = Array.isArray(r) ? r[0] : r && (r.name || r.n), pid = part + '|' + name;
        if (!name || seen[name] || WP_SKIP.test(name) || PRAC_SKIP.test(name) || arr(obj(obj(P.FLAGS)[pid]).life).indexOf('sober') >= 0) return; seen[name] = 1;
        var f = wpFill(pid, d, ses), r0 = wpRhythm(pid, tree);
        list.push({ pid: pid, part: part, n: name, fill: f ? f.label : '', why: PART[part].n + ' ' + (ed.edges.indexOf(part) >= 0 ? 'Growing Edge' : 'Steady') + (r0 !== 'd' ? ' · ' + RW[r0] : ''), i: i, rank: (f ? 0 : 2) + (r0 === 'n' ? 1 : 0) });
      });
      // A mix: up to two the plan already fills, then ones with a card of their own (daily and weekly before now and then).
      var n = parts.length > 1 ? 3 : 6, filled = list.filter(function (x) { return x.fill; }).slice(0, Math.min(2, n - 1)), own = list.filter(function (x) { return !x.fill; }).sort(function (a, b) { return a.rank - b.rank || a.i - b.i; });
      out = out.concat(filled.concat(own).slice(0, n).concat(list.filter(function (x) { return x.fill && filled.indexOf(x) < 0; })).slice(0, n));
    });
    return out;
  }
  /* The first time, the picks start with the ones the plan already fills (they add nothing to Today), up to three. */
  function wpInitPicks() {
    var d = WP.d; if (d.prac) return;
    var sug = WP.sug || [], w = wayRec(), inPlan = {}, picks = {};
    planList(S.id, d.lead).forEach(function (x) { inPlan[x.pid] = 1; });
    sug.forEach(function (x) { if (inPlan[x.pid]) picks[x.pid] = 1; });
    if (w.saved) arr(w.prac).concat(arr(w.pend)).forEach(function (pid) { if (sug.some(function (x) { return x.pid === pid; })) picks[pid] = 1; });
    else {
      // One filled practice for each Growing Edge first (they add nothing to Today), then a second, up to three.
      var n = Object.keys(picks).length, byPart = {};
      sug.forEach(function (x) { if (n < 3 && x.fill && !picks[x.pid] && !byPart[x.part]) { picks[x.pid] = 1; byPart[x.part] = 1; n++; } });
      if (!n && sug[0]) picks[sug[0].pid] = 1;
    }
    d.prac = picks; d.prac0 = Object.assign({}, picks);
  }

  /* ---------- draft, save, and put back ---------- */
  function wpSnapshot() {
    var w = tendWrap(S.id), hs = obj(w && w.health), h = homeRec(), all = obj(GGP.data(S.id)), trees = {};
    FILL_TREES.forEach(function (tr) { if (all[tr] && typeof all[tr] === 'object') { var t = all[tr].tend; trees[tr] = t && t.plan ? JSON.stringify(t.plan) : null; } });
    return { set: JSON.stringify(obj(hs.set)), plan: hs.plan ? JSON.stringify(hs.plan) : null, parts: h.parts.slice(), way: h.way ? JSON.stringify(h.way) : null, trees: trees, ptree: S.tree };
  }
  function wpRestore(sn) {
    var w = tendWrap(S.id); if (w) { w.health.set = JSON.parse(sn.set); if (sn.plan) w.health.plan = JSON.parse(sn.plan); else delete w.health.plan; }
    var h = GGP.data(S.id, 'home'); if (h) { h.parts = sn.parts.slice(); if (sn.way) h.way = JSON.parse(sn.way); else delete h.way; }
    var all = obj(GGP.data(S.id));
    Object.keys(sn.trees).forEach(function (tr) { var host = all[tr]; if (!host || typeof host !== 'object') return; if (sn.trees[tr]) { host.tend = obj(host.tend); host.tend.plan = JSON.parse(sn.trees[tr]); } else if (host.tend) delete host.tend.plan; });
    if (sn.ptree !== S.tree && S.p && S.p.age === 'adult' && GGP.setTree) { GGP.setTree(S.id, sn.ptree); S.tree = sn.ptree; }
  }
  /* Start Small's choice: apply every choice to the real stores (from the state before the plan opened). */
  function wpApply(light) {
    var d = WP.d, info = wpInfo() || {};
    if (!WP.snap) WP.snap = wpSnapshot(); else wpRestore(WP.snap);
    var hold = wpHold(info), s0 = obj(info.set);
    hCall('applyPlan', {
      track: d.track === 'gentle' ? (s0.track === 'cardio' || s0.track === 'mixed' ? s0.track : 'strength') : d.track, gentle: d.track === 'gentle' || hold, level: d.level,
      cardioDays: d.cardioDays, days: d.days, mins: d.mins, gear: d.gear.slice(), flow: d.flow, medFreq: d.med, medTime: d.medTime,
      food: d.food === 'yes', household: d.household, check: wpNeedCheck(info) ? Object.assign({}, d.check) : undefined, cleared: wpNeedCheck(info) ? d.cleared : undefined
    });
    var h = GGP.data(S.id, 'home'); h.parts = arr(h.parts);
    var pi = h.parts.indexOf('pray'); if (d.spirit.pause && pi < 0) h.parts.push('pray'); else if (!d.spirit.pause && pi >= 0) h.parts.splice(pi, 1);
    // The lead tree leads the profile, so Today, Week, and Grow follow it.
    if (d.lead !== S.tree && S.p && S.p.age === 'adult' && GGP.setTree) { GGP.setTree(S.id, d.lead); S.tree = d.lead; }
    var picks = wpPicks(), was = {}, ses = wpSessions(d);
    planList(S.id, d.lead).forEach(function (x) { was[x.pid] = 1; });
    var add = picks.filter(function (p) { return !was[p]; });
    var wait = light ? add.filter(function (p) { return !wpFill(p, d, ses); }) : [];
    var now0 = add.filter(function (p) { return wait.indexOf(p) < 0; });
    var drop = Object.keys(obj(d.prac0)).filter(function (p) { return d.prac0[p] && !d.prac[p] && was[p]; });
    addPicks(d.lead, now0, drop);
    var mon = addDays(today(), -((parse(today()).getDay() + 6) % 7));
    var hasLater = wait.length || WP_SPIRIT.some(function (x) { return d.spirit[x.id]; });
    h.way = { v: 1, lead: d.lead, spirit: Object.assign({}, d.spirit), prac: picks.filter(function (p) { return wait.indexOf(p) < 0; }), pend: wait,
      light: light && hasLater ? 1 : 0, join: light && hasLater ? addDays(mon, 14) : '', joined: '', note: 0, saved: obj(WP.snap.way ? JSON.parse(WP.snap.way) : null).saved || '', draft: 1, u: Date.now() };
    saveHome();
  }
  function wpSave() {
    var h = GGP.data(S.id, 'home'); if (!h || !h.way) return;
    h.way.saved = today(); delete h.way.draft; h.way.u = Date.now(); WP.snap = null; saveHome();
    toast('Your plan is saved, locked on this device.');
  }

  /* ---------- the screens ---------- */
  function wpChip(act, label, on, c, dis) { return '<button type="button" class="hm-wp-chip" data-hm-wp="' + esc(act) + '" aria-pressed="' + !!on + '"' + (c ? ' style="--c:var(--' + c + ')"' : '') + (dis ? ' aria-disabled="true"' : '') + '>' + esc(label) + '</button>'; }
  function wpLbl(t) { return '<div class="hm-wp-lbl">' + esc(t) + '</div>'; }
  function wpRow(c, b, s) { return '<div class="hm-wp-row"><span class="dot" style="--c:var(--' + c + ')"></span><div class="tx"><b>' + esc(b) + '</b><small>' + esc(s) + '</small></div></div>'; }
  function wpK(t, c) { return '<div class="hm-wp-k"' + (c ? ' style="--c:var(--' + c + ')"' : '') + '>' + esc(t) + '</div>'; }
  function wpH(t) { return '<h2 class="hm-wp-h2" id="hm-wp-h" tabindex="-1">' + esc(t) + '</h2>'; }
  function wpBtn(act, label, ghost) { return '<button type="button" class="hm-wp-btn' + (ghost ? ' ghost' : '') + '" data-hm-wp="' + act + '">' + esc(label) + '</button>'; }
  function wpScreen() {
    var i = WP.i, d = WP.d, info = wpInfo() || {}, b = '', f = '', t = TREES[d.lead] || TREES.oak;
    if (i === 0) {
      b = wpK('Grow') + wpH('Build one plan for your whole self') + '<p class="hm-wp-lead">Body, mind, spirit, and your table, shaped by your latest check-in. About five minutes, and every choice can change anytime.</p>' +
        '<div class="hm-wp-card">' + wpK('What you will choose', 'leaves') + '<div style="margin-top:6px"></div>' + wpRow('move', 'Body', 'Strength, Cardio, Mixed, or Gentle') + wpRow('bark', 'Mind', 'Meditation, how often and when') +
        wpRow('roots', 'Spirit', 'Gratitude, kindness, quiet, and more') + wpRow('plate', 'Table', 'Weekly dinners and Sunday Together Prep') + wpRow('leaves', 'Practices', 'A few for your Growing Edges') + '</div>' +
        '<p class="hm-wp-lead sm">Everything stays on this device, inside your locked profile.</p>';
      f = wpBtn('next', 'Start My Plan');
    } else if (i === 1) {
      var trees = wpTrees(), ck = lastCheckin(S.id, d.lead), ed = edgesOf(ck);
      var chips = trees.length > 1 ? '<div>' + wpLbl('Which tree leads your plan?') + '<div class="hm-wp-chips">' + trees.map(function (tr) { return wpChip('lead:' + tr, TREES[tr].n, d.lead === tr, 'leaves'); }).join('') + '</div></div>' : '';
      if (!ck) {
        b = wpK('Your ' + t.n) + wpH('Start with a check-in') + chips + '<p class="hm-wp-lead">Your plan starts where you are growing. A short guided check-in shows how each part of your tree is doing, and your plan picks up right here after.</p>' +
          '<div class="hm-wp-nudge"><b>About two minutes.</b> Six parts, one question each, at your own pace.</div>';
        f = wpBtn('later', 'Later', true) + wpBtn('checkin', 'Take My Check-in');
      } else {
        var LVW = { strong: 'Strong', steady: 'Steady', edge: 'Growing Edge', unsure: 'Not sure yet' };
        var parts = '<div class="hm-wp-parts">' + PARTS.map(function (p) { var l = ed.lv[p.k]; return '<div class="hm-wp-part' + (l === 'edge' ? ' edge' : '') + '" style="--c:var(--' + p.k + ');--cs:var(--' + p.k + '-s)"><b>' + p.n + '</b><span>' + WP_WORDS[p.k] + '</span><em class="lv-' + l + '">' + LVW[l] + '</em></div>'; }).join('') + '</div>';
        var first = ed.edges.length ? ed.edges.slice(0, 2) : ed.lead ? [ed.lead] : [];
        var nudge = ed.edges.length ? '<b>' + esc(first.map(function (k) { return PART[k].n; }).join(' and ')) + '</b> get' + (first.length === 1 ? 's' : '') + ' your first suggestions: ' + esc(first.map(function (k) { return WP_LONG[k]; }).join(', ')) + '.'
          : first.length ? 'Every part is Steady or Strong. Your first suggestions lean toward <b>' + esc(PART[first[0]].n) + '</b>, ' + esc(WP_LONG[first[0]]) + '.' : 'Every part keeps its good rhythm.';
        b = wpK('From your ' + t.n + ' check-in · ' + niceDate(ck.date), 'leaves') + wpH('Your Growing Edges') + chips + '<p class="hm-wp-lead">Your plan starts where you are growing. Strong parts keep their good rhythm.</p>' + parts + '<div class="hm-wp-nudge">' + nudge + '</div>';
        f = wpBtn('checkin', 'Check In Again', true) + wpBtn('next', 'Use This');
      }
    } else if (i === 2) {
      var hold = wpHold(info), pub = info.pub !== false, need = wpNeedCheck(info), K = obj(info.check), gentle = d.track === 'gentle';
      var progs = ['strength'].concat(info.cardio ? ['cardio', 'mixed'] : []).concat(pub ? ['gentle'] : []);
      var ckc = need ? '<div class="hm-wp-card hm-wp-check">' + wpK('A quick health check', 'move') + '<p class="hm-wp-lead sm">' + esc(K.lead || '') + '</p>' + arr(K.questions).map(function (q) {
        return '<div class="hm-wp-q"><p>' + esc(q.q) + '</p><div class="hm-wp-chips">' + wpChip('ck:' + q.id + ':1', 'Yes', d.check[q.id] === true, 'move') + wpChip('ck:' + q.id + ':0', 'No', d.check[q.id] === false, 'move') + '</div>' + (q.why && d.check[q.id] === true ? '<small>' + esc(q.why) + '</small>' : '') + '</div>';
      }).join('') + (arr(K.questions).some(function (q) { return d.check[q.id] === true; }) ? '<div class="hm-wp-nudge"><b>' + esc(K.yes || '') + '</b> ' + esc(K.yesMore || '') + '<div class="hm-wp-chips" style="margin-top:8px">' + wpChip('cleared', (arr(K.continue).filter(function (x) { return x.id === 'cleared'; })[0] || {}).label || 'My doctor or therapist says I can begin', d.cleared, 'leaves') + '</div></div>' : '') + '</div>' : '';
      if (hold && !need) ckc = '<div class="hm-wp-nudge">' + esc(obj(info.check).yes || 'Your health check keeps the Gentle path for now.') + '</div>';
      b = wpK('Body · grows Leaves', 'move') + wpH('How do you like to move?') + ckc +
        '<div>' + wpLbl('Program') + '<div class="hm-wp-chips">' + progs.map(function (tr) { return wpChip('set:track:' + tr, WP_TRACK[tr], (hold ? 'gentle' : d.track) === tr, 'move', hold && tr !== 'gentle'); }).join('') + '</div>' +
        (d.track === 'mixed' && !hold ? '<div class="hm-wp-chips" style="margin-top:8px">' + [1, 2].map(function (n) { return wpChip('set:cardioDays:' + n, n + (n === 1 ? ' Cardio Day' : ' Cardio Days'), d.cardioDays === n, 'move'); }).join('') + '</div>' : '') + '</div>';
      if (pub) {
        b += '<div>' + wpLbl('Days a week') + '<div class="hm-wp-chips">' + [2, 3, 4, 5, 6].map(function (n) { return wpChip('set:days:' + n, n + ' days', d.days === n, 'move'); }).join('') + '</div></div>';
        if (gentle || hold) { var gm = arr(obj(info.gentle).mins); b += '<p class="hm-wp-lead sm">' + esc(obj(info.gentle).lead || 'Gentle: chair strength, supported balance, easy range of motion, breathing, and short walks.') + (gm.length ? ' About ' + Math.min.apply(null, gm) + ' to ' + Math.max.apply(null, gm) + ' minutes.' : '') + '</p>'; }
        else {
          b += '<div>' + wpLbl('Minutes') + '<div class="hm-wp-chips">' + [20, 40, 60].map(function (n) { return wpChip('set:mins:' + n, n + ' min', d.mins === n, 'move'); }).join('') + '</div></div>' +
            '<div>' + wpLbl('Level') + '<div class="hm-wp-chips">' + [['root', 'Root'], ['rise', 'Rise'], ['thrive', 'Thrive']].map(function (l) { return wpChip('set:level:' + l[0], l[1], d.level === l[0], 'move'); }).join('') + '</div>' + (obj(info.levelLines)[d.level] ? '<small class="hm-wp-small">' + esc(info.levelLines[d.level]) + '</small>' : '') + '</div>';
          if (arr(info.gear).length) b += '<div>' + wpLbl('What you have') + '<div class="hm-wp-chips">' + info.gear.map(function (g) { return wpChip('gear:' + g.id, g.name, d.gear.indexOf(g.id) >= 0, 'trunk'); }).join('') + '</div><small class="hm-wp-small">' + (d.gear.length ? 'Every workout uses just what you check.' : esc(info.gearNone || 'Nothing checked: your body weight, a chair, a wall, and a mat.')) + '</small></div>';
        }
      } else b += '<p class="hm-wp-lead sm">Your Guide plan keeps its own days, minutes, and equipment.</p>';
      b += '<div class="hm-wp-card"><div class="hm-wp-row"><div class="tx"><b>Add Flow on other days</b><small>Yoga style, tai chi style, and stretch sessions, about 20 minutes</small></div>' + wpChip('flow', d.flow ? 'On' : 'Off', d.flow, 'leaves') + '</div></div>';
      var keep = info.done && info.prog && !gentle && !hold && d.track === (info.track || 'strength');
      b += '<p class="hm-wp-lead sm">' + (gentle || hold ? 'The Gentle walk grows a little each week.' : keep ? 'You are in ' + esc(info.prog) + '. Your place in the program stays.' : 'Week 1 of 12 · Foundation. Build starts week 5 and Peak week 9.') + '</p>';
      f = wpBtn('next', 'Next');
    } else if (i === 3) {
      var mm = arr(info.medMins), meds = arr(info.meds);
      b = wpK('Mind · grows Bark', 'bark') + wpH('A quiet place in your day') + '<p class="hm-wp-lead">Seven guided meditations, a new one each day of the week' + (mm.length === 2 ? ', about ' + mm[0] + ' minutes to start, growing to ' + mm[1] : '') + '.</p>' +
        '<div>' + wpLbl('How often') + '<div class="hm-wp-chips">' + Object.keys(WP_MED).map(function (k) { return wpChip('set:med:' + k, WP_MED[k], d.med === k, 'bark'); }).join('') + '</div></div>' +
        (d.med !== 'later' ? '<div>' + wpLbl('When') + '<div class="hm-wp-chips">' + [['morning', 'Morning'], ['afternoon', 'Afternoon'], ['evening', 'Evening']].map(function (x) { return wpChip('set:medTime:' + x[0], x[1], d.medTime === x[0], 'bark'); }).join('') + '</div></div>' : '<p class="hm-wp-lead sm">Meditation waits in the Library, under Quiet and Meditation, whenever you like.</p>') +
        (meds.length && d.med !== 'later' ? '<div class="hm-wp-card">' + wpK(d.med === 'daily' ? 'This week' : d.med === 'few' ? 'Tuesday, Thursday, and Saturday' : 'Sunday', 'bark') + '<small class="hm-wp-small">' + esc(meds.filter(function (m) { return wpMedOn(d.med, WP_DOW.indexOf(m.day)); }).map(function (m) { return m.title; }).join(', ')) + '</small></div>' : '');
      f = wpBtn('next', 'Next');
    } else if (i === 4) {
      b = wpK('Spirit · grows Roots, Branches, and Fruit', 'roots') + wpH('What feeds your spirit?') + '<p class="hm-wp-lead">Choose any that feel like you. Each one is short.</p>' +
        '<div class="hm-wp-tiles">' + WP_SPIRIT.map(function (x) { return '<button type="button" class="hm-wp-tile" data-hm-wp="sp:' + x.id + '" aria-pressed="' + !!d.spirit[x.id] + '" style="--c:var(--' + x.part + ');--cs:var(--' + x.part + '-s)"><b>' + esc(x.n) + '</b><small>' + esc(x.line) + '</small></button>'; }).join('') + '</div>';
      f = wpBtn('skip', 'Skip for Now', true) + wpBtn('next', 'Next');
    } else if (i === 5) {
      var hhs = [1, 2, 3, 4, 5, 6, 8]; if (hhs.indexOf(d.household) < 0) { hhs.push(d.household); hhs.sort(function (a, b2) { return a - b2; }); }
      b = wpK('Table · grows Leaves and Branches', 'plate') + wpH('Meals in your plan?') + '<p class="hm-wp-lead">Weekly dinners, Sunday Together Prep, and one shopping list sized to your table.</p>' +
        '<div class="hm-wp-chips">' + wpChip('set:food:yes', 'Yes, Add Meals', d.food === 'yes', 'plate') + wpChip('set:food:later', 'Later', d.food === 'later', 'plate') + '</div>' +
        (d.food === 'yes' ? '<div>' + wpLbl('Around the table') + '<div class="hm-wp-chips">' + hhs.map(function (n) { return wpChip('set:household:' + n, n + (n === 1 ? ' person' : ' people'), d.household === n, 'plate'); }).join('') + '</div></div>' : '') +
        '<p class="hm-wp-lead sm">' + (info.done ? 'Your food needs, allergies, and goals carry over from Tending.' : 'Food needs, allergies, and goals live in Tending Setup, ready whenever you like.') + '</p>';
      f = wpBtn('next', 'Next');
    } else if (i === 6) {
      if (!WP.sug) WP.sug = wpSuggest();
      wpInitPicks();
      var sug = WP.sug, picks = wpPicks().length, inPlan = {};
      planList(S.id, d.lead).forEach(function (x) { inPlan[x.pid] = 1; });
      b = wpK('Practices · for your Growing Edges', 'leaves') + wpH('A few to tend');
      if (!sug.length) b += '<p class="hm-wp-lead">' + (lastCheckin(S.id, d.lead) ? 'Your ' + esc(t.n) + ' practices are a tap away in your growth plan, anytime.' : 'Your first check-in brings suggestions for your Growing Edges. Every practice in your ' + esc(t.n) + ' stays a tap away in your growth plan.') + '</p>';
      else b += '<p class="hm-wp-lead">Pick up to three. Some are already part of your plan, so they count without adding a thing.</p><div class="hm-wp-list">' + sug.map(function (x) {
        return '<button type="button" class="hm-wp-tile" data-hm-wp="pr:' + esc(x.pid) + '" aria-pressed="' + !!d.prac[x.pid] + '" style="--c:var(--' + x.part + ');--cs:var(--' + x.part + '-s)"><b>' + esc(x.n) + '</b><small>' + esc(x.why) + '</small>' + (x.fill ? '<span class="covered">' + esc(x.fill) + '</span>' : '') + (inPlan[x.pid] ? '<span class="inplan">In your growth plan</span>' : '') + '</button>';
      }).join('') + '</div><p class="hm-wp-lead sm">' + picks + ' of 3 chosen. Every practice in your tree stays a tap away.</p>';
      f = wpBtn('next', 'Next');
    } else if (i === 7) {
      if (!d.prac) { WP.sug = WP.sug || wpSuggest(); wpInitPicks(); }
      var m = wpMaxDay(d), big = m > 4, sps = WP_SPIRIT.filter(function (x) { return d.spirit[x.id]; }).map(function (x) { return x.title || x.n; });
      b = wpK('Start small') + wpH(big ? 'A full plan. Start lighter?' : 'A good size to start') +
        (big ? '<p class="hm-wp-lead">Your busiest day holds ' + m + ' items. Habits stick best a few at a time, so many people begin with the core of the plan and add the rest after two good weeks.</p><div class="hm-wp-nudge"><b>Start lighter:</b> movement, meditation, and dinner first. Spirit and practices join on week 3, and the plan reminds you.</div>'
          : '<p class="hm-wp-lead">Your busiest day holds ' + m + (m === 1 ? ' item' : ' items') + '. That is a steady, doable start.</p>') +
        '<div class="hm-wp-card">' + wpRow('move', (wpHold(info) ? 'Gentle' : WP_TRACK[d.track]) + ', ' + d.days + ' days' + (d.track === 'gentle' || wpHold(info) ? '' : ', ' + d.mins + ' min'), d.track === 'gentle' || wpHold(info) ? 'Gentle path' + (d.flow ? ', Flow on other days' : '') : '12-week program' + (d.flow ? ', Flow on other days' : '')) +
        wpRow('bark', 'Meditation', d.med === 'later' ? 'Later' : WP_MED[d.med].charAt(0) + WP_MED[d.med].slice(1).toLowerCase() + ', ' + d.medTime) +
        wpRow('roots', 'Spirit', sps.length ? sps.join(', ') : 'Later') + wpRow('plate', 'Table', d.food === 'yes' ? 'Dinners for ' + d.household : 'Later') +
        wpRow('leaves', 'Practices', wpPicks().length ? wpPicks().map(function (p) { return p.split('|')[1]; }).join(', ') : 'From your growth plan, anytime') + '</div>';
      f = big ? wpBtn('keep', 'Keep It All', true) + wpBtn('trim', 'Start Lighter') : wpBtn('keep', 'See My Week');
    } else if (i === 8) {
      var w = wayRec(), wd = weekData();
      b = wpK(wd && wd.prog ? wd.prog : 'This week') + wpH('Your week') + (w.light && w.join && today() < w.join ? '<p class="hm-wp-lead">Starting lighter. Spirit and practices join on week 3, ' + esc(niceDay(w.join)) + '.</p>' : '') + wpWeekHtml();
      f = wpBtn('save', 'Save My Plan');
    } else {
      var T = todayItems(), items = T.items.filter(function (x) { return x.key !== 'talk'; }), mins = 0;
      items.forEach(function (x) { mins += wpMins(x); });
      b = wpK('Today · ' + DAYS[now().getDay()]) + wpH(greetWord()) + '<p class="hm-wp-lead">' + items.length + (items.length === 1 ? ' thing' : ' things') + ' today' + (mins ? ', about ' + mins + ' minutes' : '') + '. Each one grows a part of your tree.</p>' +
        '<div class="hm-wp-today">' + items.map(function (x) {
          return '<div class="hm-wp-tc ' + tintClass(x.tint, x.kind) + (x.done ? ' done' : '') + '"><span class="circle" aria-hidden="true"></span><div><span class="when">' + esc(String(x.when || '').split(' · ')[0]) + '</span><b>' + esc(x.ftitle || x.title) + '</b>' + (x.sub ? '<small>' + esc(String(x.sub).slice(0, 110)) + '</small>' : '') + (x.forLine ? '<span class="for">' + esc(x.forLine) + '</span>' : '') + '</div></div>';
        }).join('') + '</div>';
      f = wpBtn('restart', 'Start Over', true) + wpBtn('done', 'Done');
    }
    return { b: b, f: f };
  }
  function wpMins(x) {
    if (x.min) return +x.min || 0;
    if (x.fill && x.fill.mins) return +x.fill.mins || 0;
    var m = /(\d+)\s*min/.exec(String(x.sub || '')); return m ? +m[1] : 0;
  }
  /* Your Week, from the real stores: Tending's week (movement, meditation, dinner, Sunday Together Prep), the spirit days, and
     the growth plan's daily practices that no session fills that day. Weekly ones sit under This Week. */
  function wpWeekHtml() {
    var w = weekData(), td = today(), plan = planItems(false), way = wayRec();
    var days = w ? w.days : weekDays().map(function (k) { return { date: k, day: DAYS[parse(k).getDay()].slice(0, 3) }; });
    var prepMin = w && w.prepSub ? (+(/(\d+)\s*minutes/.exec(w.prepSub) || [0, 0])[1]) : 0;
    var rows = days.map(function (dd) {
      var date = String(dd.date || '').slice(0, 10), dow = parse(date).getDay(), pills = [], mins = 0, mv = dd.move, md = dd.med;
      var pill = function (t, c) { pills.push('<span class="hm-wp-pill" style="--c:var(--' + c + ');--cs:var(--' + c + '-s)">' + esc(t) + '</span>'); };
      if (mv) { pill(mv.title, mv.kind === 'flow' ? 'leaves' : 'move'); mins += +mv.mins || 0; }
      if (md) { pill('Meditation', 'bark'); mins += +md.mins || 0; }
      spiritOn(date, way).forEach(function (x) { pill(x.title || x.n, x.part); mins += x.min; });
      plan.forEach(function (p) {
        if (p.r !== 'd') return;
        if (window.GGFills && ((mv && GGFills.fills(p.pid, mv, S.tree)) || (md && GGFills.fills(p.pid, md, S.tree)))) return;
        pill(p.title, p.part); mins += +p.min || 0;
      });
      if (dow === 0 && w && w.prepKey) { pill('Sunday Together Prep', 'plate'); mins += prepMin; }
      if (dd.dinner) pill('Dinner', 'plate');
      return '<div class="hm-wp-day' + (date === td ? ' today' : '') + '"><span class="d">' + esc(String(dd.day || '').slice(0, 3)) + '</span><div class="pills">' + (pills.join('') || '<span class="hm-wp-rest">A day to rest</span>') + '</div><span class="m">' + (mins ? mins + ' min' : '') + '</span></div>';
    }).join('');
    var wk = plan.filter(function (p) { return p.r === 'w' || p.r === 'f'; });
    return '<div class="hm-wp-week">' + rows + '</div>' + (wk.length ? '<p class="hm-wp-lead sm"><b>This week, any day:</b> ' + esc(wk.map(function (p) { return p.title; }).join(', ')) + '.</p>' : '') +
      (!w ? '<p class="hm-wp-lead sm">Tending fills in movement and meals once it opens.</p>' : '');
  }

  /* ---------- the overlay ---------- */
  function paintPlan(keepScroll) {
    var wrap = document.getElementById('hm-plan'); if (!wrap || !WP.d) return;
    var i = WP.i, sc = wpScreen(), body = wrap.querySelector('.hm-wp-body'), top = keepScroll && body ? body.scrollTop : 0;
    wrap.querySelector('.hm-wp-t').textContent = i === 0 ? 'My Grounded Way Plan' : WP_SCREENS[i];
    wrap.querySelector('[data-hm-wp="back"]').disabled = i === 0;
    wrap.querySelector('.hm-wp-dots').innerHTML = WP_SCREENS.map(function (_, j) { return '<i class="' + (j <= i ? 'on' : '') + '"></i>'; }).join('');
    wrap.querySelector('.hm-wp-dots').setAttribute('aria-label', 'Screen ' + (i + 1) + ' of ' + WP_SCREENS.length);
    body.innerHTML = sc.b; wrap.querySelector('.hm-wp-foot').innerHTML = sc.f; body.scrollTop = top;
    wrap.setAttribute('data-screen', String(i));
  }
  function wpGo(i) {
    WP.i = Math.max(0, Math.min(WP_SCREENS.length - 1, i)); paintPlan();
    var h = document.getElementById('hm-wp-h'); if (h) try { h.focus({ preventScroll: true }); } catch (e) {}
  }
  function openPlan(at) {
    if (!planOK() || WP.open) return;
    WP.open = true; WP.i = at || 0; WP.snap = null; WP.sug = null; WP.back = document.activeElement;
    var wrap = document.createElement('div'); wrap.id = 'hm-plan'; wrap.className = 'hm-wpwrap';
    wrap.innerHTML = '<div class="hm-wp-bg" aria-hidden="true"></div><section class="hm-wp" role="dialog" aria-modal="true" aria-labelledby="hm-wp-tt">' +
      '<header class="hm-wp-bar"><button type="button" class="hm-wp-back" data-hm-wp="back" aria-label="Back">' + I('back') + '</button><div class="hm-wp-t" id="hm-wp-tt">My Grounded Way Plan</div><div class="hm-wp-dots" role="img"></div>' +
      '<button type="button" class="hm-wp-x" data-hm-wp="close" aria-label="Close">' + I('plus') + '</button></header>' +
      '<div class="hm-wp-body"><p class="hm-loading">Opening your plan…</p></div><footer class="hm-wp-foot"></footer></section>';
    (document.querySelector('main.hm') || document.body).appendChild(wrap);
    document.documentElement.classList.add('hm-planned');
    try { history.pushState({ hmPlan: 1 }, '', location.pathname + location.hash); } catch (e) {}
    var src = PRAC[S.tree];
    Promise.all([loadTending(), src ? load(src[0]) : Promise.resolve(), Promise.all(wpTrees().map(function (tr) { return PRAC[tr] ? load(PRAC[tr][0]) : null; }))]).then(function () {
      if (!WP.open) return;
      if (S.tendInit !== S.id) initTending();
      WP.d = wpDraft(); paintPlan();
      var b = wrap.querySelector('.hm-wp-foot .hm-wp-btn:last-child'); try { (b || wrap.querySelector('.hm-wp')).focus({ preventScroll: true }); } catch (e) {}
    });
  }
  function closePlan(fromPop, then) {
    var wrap = document.getElementById('hm-plan'); if (!WP.open) return;
    WP.open = false;
    if (WP.snap) { wpRestore(WP.snap); WP.snap = null; saveHome(); toast('Nothing changed. Your plan is just as it was.'); }
    if (wrap) wrap.remove();
    document.documentElement.classList.remove('hm-planned');
    if (!fromPop && history.state && history.state.hmPlan) { WP.popping = then || true; history.back(); }
    else if (then) then();
    if (S.id && app()) refreshPane();
    var back = WP.back; WP.back = null; if (back && back.isConnected) try { back.focus({ preventScroll: true }); } catch (e) {}
  }
  window.addEventListener('popstate', function () {
    if (WP.popping) { var then = WP.popping; WP.popping = false; if (typeof then === 'function') then(); return; }
    if (WP.open && !(history.state && (history.state.hmPlan || history.state.hmFrame)) && !FRAME) closePlan(true);
  });
  function wpAct(a) {
    var d = WP.d; if (!d && a !== 'close') return;
    var info = wpInfo() || {};
    if (a === 'close') { closePlan(); return; }
    if (a === 'back') { wpGo(WP.i === 8 ? 7 : WP.i - 1); return; }
    if (a === 'next') {
      if (WP.i === 2 && wpNeedCheck(info) && arr(info.check.questions).some(function (q) { return d.check[q.id] == null; })) { toast('Answer each question with Yes or No.'); return; }
      wpGo(WP.i + 1); return;
    }
    if (a === 'later') { wpGo(2); return; }
    if (a === 'skip') { d.spirit = {}; wpGo(5); return; }
    if (a === 'checkin') { openTreeSheet('quick'); return; }
    if (a === 'trim' || a === 'keep') { d.light = a === 'trim'; wpApply(d.light); wpGo(8); return; }
    if (a === 'save') { wpSave(); wpGo(9); return; }
    if (a === 'restart') { if (!WP.snap) { WP.d = wpDraft(); WP.sug = null; } wpGo(0); return; }
    if (a === 'done') { closePlan(false, function () { goTo('today'); }); return; }
    var p = a.split(':'), k = p[0];
    if (k === 'lead') { if (d.lead !== p[1]) { d.lead = p[1]; d.prac = null; WP.sug = null; } paintPlan(true); return; }
    if (k === 'set') { var v = /^\d+$/.test(p[2]) ? +p[2] : p[2]; if (p[1] === 'track' && wpHold(info) && v !== 'gentle') return; d[p[1]] = v; if (p[1] === 'track' || p[1] === 'med' || p[1] === 'days' || p[1] === 'cardioDays') WP.sug = null; paintPlan(true); return; }
    if (k === 'gear') { var gi = d.gear.indexOf(p[1]); if (gi >= 0) d.gear.splice(gi, 1); else d.gear.push(p[1]); paintPlan(true); return; }
    if (k === 'flow') { d.flow = !d.flow; WP.sug = null; paintPlan(true); return; }
    if (k === 'ck') { d.check[p[1]] = p[2] === '1'; if (wpHold(info)) d.track = 'gentle'; paintPlan(true); return; }
    if (k === 'cleared') { d.cleared = !d.cleared; paintPlan(true); return; }
    if (k === 'sp') { d.spirit[p[1]] = d.spirit[p[1]] ? 0 : 1; if (!d.spirit[p[1]]) delete d.spirit[p[1]]; paintPlan(true); return; }
    if (k === 'pr') { var pid = a.slice(3); if (d.prac[pid]) d.prac[pid] = 0; else if (wpPicks().length >= 3) { toast('Up to three to start. Every practice in your tree stays a tap away.'); return; } else d.prac[pid] = 1; paintPlan(true); return; }
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-hm-wp],[data-hm-wpopen],[data-hm-wpnote]'); if (!t) return;
    if (t.hasAttribute('data-hm-wpopen')) { e.preventDefault(); if (document.getElementById('hm-sheet')) leaveSheet(); openPlan(); return; }
    if (t.hasAttribute('data-hm-wpnote')) { var h = GGP.data(S.id, 'home'); if (h && h.way) { h.way.note = 0; saveHome(); } refreshPane(); return; }
    if (t.getAttribute('aria-disabled') === 'true') return;
    wpAct(t.getAttribute('data-hm-wp'));
  });
  document.addEventListener('keydown', function (e) {
    if (!WP.open || FRAME) return;
    var w = document.getElementById('hm-plan'); if (!w) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); closePlan(); return; }
    if (e.key !== 'Tab') return;
    var f = [].slice.call(w.querySelectorAll('button:not([disabled])')).filter(function (b) { return b.offsetParent !== null; }); if (!f.length) return;
    var first = f[0], last = f[f.length - 1], cur = document.activeElement;
    if (!w.contains(cur)) { e.preventDefault(); first.focus(); return; }
    if (e.shiftKey && cur === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && cur === last) { e.preventDefault(); first.focus(); }
  }, true);
  /* The doors: Grow's card, Week's Change My Plan, and the welcome tour's last card. */
  function planDoorGrow() {
    if (!planOK()) return '';
    var w = wayRec(), s = w.saved;
    return '<article class="hm-card edge lift hm-p-leaves hm-gcard hm-waycard"><div class="hm-pc"><div class="scene"><img src="' + IMG + 'welcome-narrow.webp" alt="" loading="lazy"></div><div style="min-width:0"><div class="hm-time">My Grounded Way Plan</div>' +
      '<h3 class="hm-h3">' + (s ? 'Your Plan' : 'One Plan for Your Whole Self') + '</h3><p class="hm-sub">' + (s ? 'Body, mind, spirit, and your table, in one plan since ' + esc(niceDate(s)) + '. Every choice can change anytime.' : 'Body, mind, spirit, and your table, shaped by your latest check-in. About five minutes.') + '</p>' +
      '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-wpopen="1">' + I('sprout') + (s ? 'Change My Plan' : 'Build My Grounded Way Plan') + '</button></div></div></div></article>';
  }
  function planDoorWeek() {
    if (!planOK()) return '';
    var s = waySaved();
    return '<div class="hm-wplan"><span class="tx"><b>My Grounded Way Plan</b><small>' + (s ? 'Movement, meditation, spirit, and meals, on their days.' : 'Build one plan for body, mind, spirit, and your table.') + '</small></span><button type="button" class="hm-pill" data-hm-wpopen="1">' + (s ? 'Change My Plan' : 'Build My Grounded Way Plan') + '</button></div>';
  }
  /* Week's day rows: the meditation and the spirit items on that day. */
  function weekExtra(d) {
    var out = '', md = obj(d.med);
    if (md.title) out += '<button type="button" class="hm-wmove hm-wmed" data-hm-wk="' + esc(md.key || '') + '" aria-label="' + esc((d.dayName || d.day || '') + ' meditation: ' + md.title + ', start it') + '">' + esc(md.title) + (md.done ? ' <span class="hm-wdone">' + I('check') + '<span class="sr">done</span></span>' : '') + '</button>';
    var sp = planOK() ? spiritOn(String(d.date || '').slice(0, 10)) : [];
    if (sp.length) out += '<span class="hm-wsp">' + sp.map(function (x) { return '<span class="hm-wpill" style="--c:var(--' + x.part + ');--cs:var(--' + x.part + '-s)">' + esc(x.title || x.n) + '</span>'; }).join('') + '</span>';
    return out;
  }

  /* ---------- start ---------- */
  function boot() {
    mountIcons();
    if (!window.GGP) { var r = app(); if (r) r.innerHTML = welcomeHtml(); return; }
    GGP.on(function (type) { if (type === 'change' || type === 'ready') render(); else if (type === 'data' && S.id) { if (isKid(S.p)) render(); else refreshPane(); sheetSaved(); if (WP.open && WP.d) { WP.sug = null; if (WP.i <= 1) WP.d.prac = null; paintPlan(true); } } });
    GGP.ready.then(render);
  }
  window.GGHome = { render: render, lastCheckin: lastCheckin, summary: summary, v: V };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

  /* ---------- BLD 867: trees and tools open inside the Home ----------
     A tap on a tree or a tool from the Home opens it in a full-page frame with a slim Back bar, so the person
     never leaves Home. The phone's Back closes it (history state). nav.js hides the site's own top bar and footer
     inside the frame. When it closes, the Home redraws with anything new (a check-in, a sober day). */
  var FRAME = null;
  function inHomeLink(a) {
    if (!a || !a.getAttribute) return null;
    var href = a.getAttribute('href'); if (!href || href.charAt(0) === '#' || a.target || a.hasAttribute('download')) return null;
    var u; try { u = new URL(href, location.href); } catch (e) { return null; }
    if (u.origin !== location.origin || /^\/home\//.test(u.pathname) || /^(mailto|tel):/.test(href)) return null;
    if (!/(\/|\.html)$/.test(u.pathname)) return null;
    if (a.closest('#hm-bnav, .site-footer, .topbar, .site-menu')) return null;
    return u;
  }
  function frameTitle(u) {
    var seg = u.pathname.split('/').filter(Boolean)[0] || '';
    if (TREES[seg]) return TREES[seg].n;
    var t = { 'living-sober.html': 'Living Sober', 'get-grounded-now.html': 'Get Grounded Now', 'readings.html': 'Readings Library', 'the-grounded-way.html': 'The Grounded Way', 'recipes': 'Grounded Recipes' }[seg];
    return t || 'Grounded';
  }
  function openFrame(u, push, onload, sheet) {
    closeFrame(true);
    var wrap = document.createElement('div'); wrap.className = 'hm-frame' + (sheet ? ' hm-fsheet' : ''); wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-label', sheet ? sheet.title : frameTitle(u));
    // BLD 882: a tree screen opens as an in-app sheet: the app's own header (the screen's name and Done) over that one screen.
    var bar = sheet ? '<header class="hm-fs-hd"><div class="hm-fs-l"><span class="hm-ak">' + esc(sheet.kick) + '</span><h2 class="hm-fs-t">' + esc(sheet.title) + '</h2></div><button type="button" class="hm-frame-home hm-fs-done">Done</button></header>'
      : '<div class="hm-frame-bar"><button type="button" class="hm-frame-home">' + I('home') + '<span>Back</span></button><b class="hm-frame-t">' + esc(frameTitle(u)) + '</b><span class="hm-frame-sp"></span></div>';
    wrap.innerHTML = bar + '<iframe class="hm-frame-if' + (sheet ? ' wait' : '') + '" title="' + esc(sheet ? sheet.title : frameTitle(u)) + '" allow="fullscreen; autoplay; clipboard-write" allowfullscreen></iframe>';
    var host = document.querySelector('main.hm') || document.body; host.appendChild(wrap);
    var ifr = wrap.querySelector('iframe'); ifr.src = u.pathname + u.search + u.hash;
    if (sheet) { wrap._sheet = sheet; sheetMode(ifr, u.pathname); }
    ifr.addEventListener('load', function () { if (!sheet) { try { var t = (ifr.contentDocument.title || '').replace(/\s*\|.*$/, ''); if (t) wrap.querySelector('.hm-frame-t').textContent = t; } catch (e) {} } else ifr.classList.remove('wait'); if (onload) { try { onload(ifr.contentWindow); } catch (e) {} onload = null; } });
    wrap.querySelector('.hm-frame-home').addEventListener('click', frameDone);
    document.documentElement.classList.add('hm-framed');
    FRAME = wrap;
    if (push !== false) { try { history.pushState({ hmFrame: u.pathname + u.search + u.hash }, '', location.pathname + location.hash); } catch (e) {} }
  }
  function closeFrame(quiet) {
    if (!FRAME) return; FRAME.remove(); FRAME = null; document.documentElement.classList.remove('hm-framed');
    if (!quiet) render();
  }
  function frameDone() { if (!FRAME) return; if (history.state && history.state.hmFrame) history.back(); else closeFrame(); }

  /* ---------- BLD 882: tree screens as in-app sheets ----------
     The check-in, Quick Check-in, Growth Plan, history, and the tree's practices open over the tab, with the app's
     header (the screen's name and Done) and only that screen of the tree: the tree page's own hero, part strip,
     and tab bar step aside inside the sheet (a class and a small style added to the framed page by the Home, so the
     tree page itself is unchanged everywhere else). Done, or a check-in saved, returns to the tab, redrawn. */
  var SHEET_SCREENS = { checkin: 'Check-in', quick: 'Quick Check-in', plan: 'Growth Plan', history: 'History', today: 'Your Practices' };
  var SHEET_CSS = 'html.gg-insheet body>.gg-hero,html.gg-insheet body>.gg-parts,html.gg-insheet body>nav#client-nav,html.gg-insheet body>nav.nav,html.gg-insheet body>nav.tabs,' +
    'html.gg-insheet .gg-skip,html.gg-insheet .gg-wayline,html.gg-insheet .topbar,html.gg-insheet .site-menu,html.gg-insheet .site-footer{display:none!important;}' +
    'html.gg-insheet body>main{padding-top:6px;}';
  function openTreeSheet(what) {
    var t = TREES[S.tree] || TREES.oak, title = SHEET_SCREENS[what] || t.n;
    var hash = what === 'today' ? '#today' : what ? treeHash(t, what).slice(t.href.length) : '';
    // BLD 886: the check-in, Quick Check-in, and Growth Plan open guided (?guided=checkin|quick|plan, read by GGGuided.flag() in the tree).
    var q = what === 'checkin' || what === 'quick' || what === 'plan' ? '?guided=' + what : '';
    var ck = lastCheckin(S.id, S.tree);
    openFrame(new URL(t.href + q + hash, location.href), true, null, { what: what, title: title, kick: 'My ' + t.n, ck: ck ? ck.count + ':' + ck.date : '' });
  }
  function sheetMode(ifr, path) {
    var tries = 0, done = false;
    var style = function (d) {
      if (done || !d || !d.documentElement || d.getElementById('gg-insheet-css')) return;
      done = true;
      d.documentElement.classList.add('gg-insheet');
      var st = d.createElement('style'); st.id = 'gg-insheet-css'; st.textContent = SHEET_CSS; (d.head || d.documentElement).appendChild(st);
      ifr.classList.remove('wait');
    };
    (function tick() {
      if (!ifr.isConnected) return;
      var w = null, d = null; try { w = ifr.contentWindow; if (w && w.location.pathname === path) d = ifr.contentDocument; } catch (e) { ifr.classList.remove('wait'); return; }
      if (d && d.documentElement) {
        if (d.readyState === 'loading') { w.addEventListener('DOMContentLoaded', function () { style(d); }); d.addEventListener('readystatechange', function () { style(d); }); }
        else style(d);
        return;
      }
      if (++tries < 400) setTimeout(tick, 20); else ifr.classList.remove('wait');
    })();
    // A move to another page inside the sheet shows that page whole.
    ifr.addEventListener('load', function () { try { var d = ifr.contentDocument; if (d && ifr.contentWindow.location.pathname === path && !d.getElementById('gg-insheet-css')) { done = false; style(d); } } catch (e) {} });
  }
  /* A check-in saved in the sheet: the Home hears the vault change, then returns to the tab. */
  function sheetSaved() {
    var sh = FRAME && FRAME._sheet; if (!sh || (sh.what !== 'checkin' && sh.what !== 'quick') || sh.closing) return;
    var ck = lastCheckin(S.id, S.tree), now = ck ? ck.count + ':' + ck.date : '';
    if (now === sh.ck) return;
    sh.closing = true; toast('Check-in saved. Your tree is up to date.');
    setTimeout(function () { if (FRAME && FRAME._sheet === sh) frameDone(); }, 900);
  }
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('#hm-app a[href]'); var u = inHomeLink(a); if (!u) return;
    if (!(window.GGP && GGP.active && GGP.active())) return;
    e.preventDefault();
    var own = (TREES[S.tree] || TREES.oak).href;
    if (u.pathname === own && !u.hash) { goTo('tree'); return; }
    openFrame(u);
  });
  window.addEventListener('popstate', function () { if (FRAME && !(history.state && history.state.hmFrame)) closeFrame(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && FRAME && FRAME._sheet) frameDone(); });
  window.addEventListener('message', function (e) { if (e.origin === location.origin && e.data === 'gg-home-close' && FRAME) { if (history.state && history.state.hmFrame) history.back(); else closeFrame(); } });
})();
