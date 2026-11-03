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
                                               way: My Grounded Way Plan's own choices (BLD 893, see that section),
                                               setup: the four areas, one at a time (BLD 907, see that section),
                                               later also holds Do Tomorrow: {'part|Name' or an item key: the date it shows again}}
     window.GG_RHYTHM (shared/practice-rhythm.js, BLD 885)  {<tree>: {'part|Name': {r: 'd'|'f'|'w'|'n', x (times a week, for f), min, how: [steps]}}}
                                              each practice's suggested rhythm, minutes, and steps; read only, guarded
     GGP.list(), GGP.shared(id), GGP.openIds() Your Family: progress only (days tended, rings, season)

   Views (the address names each one, so Back works). BLD 881: four tabs for a grown-up profile.
     /home/ or #today  Today: one list in day order (Tending's items and the tree's check-in), a + button to log
     #week             Week: Shop for Week X, Sunday Together Prep, the seven days
     #grow             Grow: the tree (tend four, grow two), this season, the Growth Plan, history
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
  var V = 'b908';
  var TEND_SRC = ['/field-guide/moves.js?v=' + V, '/field-guide/stage.js?v=b911b', '/field-guide/coach.js?v=' + V, '/field-guide/health.js?v=b911b', '/shared/gg-scale.js?v=' + V, '/shared/gg-tend-plan.js?v=' + V, '/shared/tending-public.js?v=' + V];
  var WORDS_SRC = '/shared/sober-words.js?v=b908';
  var GGN_SRC = '/shared/ggn.js?v=b912';
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
    cart: '<path d="M2.5 4h2.6l2.3 10.6a1.6 1.6 0 0 0 1.6 1.3h8.2a1.6 1.6 0 0 0 1.6-1.2L20.5 8H6.2"/><circle cx="9.5" cy="19.6" r="1.4"/><circle cx="17" cy="19.6" r="1.4"/>',
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

  /* ---------- the trees and the parts ----------
     BLD 907, The One Grounded Way: tend four, grow two. Roots, Bark, Leaves, and Branches get practices; Trunk and
     Fruit grow from that tending and keep their check-in questions. Every label pairs the tree word and the plain
     word from shared/gg-parts.js (Roots: Spirit, Bark: Mind), and Plain wording (or a school's Plain lock) reads
     Roots: what grounds you. */
  var PARTS = [
    { k: 'roots', n: 'Roots', m: 'your connection with God and the sacred' }, { k: 'trunk', n: 'Trunk', m: 'your meaning and purpose' },
    { k: 'bark', n: 'Bark', m: 'your thoughts, feelings, and focus' }, { k: 'branches', n: 'Branches', m: 'the people you love' },
    { k: 'leaves', n: 'Leaves', m: 'food, movement, and rest' }, { k: 'fruit', n: 'Fruit', m: 'your hope' }
  ];
  var PART = {}; PARTS.forEach(function (p) { PART[p.k] = p; });
  var TEND4 = ['roots', 'bark', 'leaves', 'branches'], GROW2 = ['trunk', 'fruit'];
  var PLAIN_WORD = { roots: 'what grounds you', trunk: 'Meaning', bark: 'Mind', branches: 'Relationships', leaves: 'Body', fruit: 'Hope' };
  var FAITH_WORD = { roots: 'Spirit', trunk: 'Meaning', bark: 'Mind', branches: 'Relationships', leaves: 'Body', fruit: 'Hope' };
  function gparts() { return window.GGParts && typeof window.GGParts.label === 'function' ? window.GGParts : null; }
  function isTend(k) { return TEND4.indexOf(k) >= 0; }
  /* Plain wording for the open profile's tree: the tree's own wording choice or a school's Plain lock. */
  function plainNow() { return !!(S && S.id && plainWording(S.id, S.tree)); }
  /* 'Roots: Spirit' (or 'Roots: what grounds you' in Plain). */
  function plabel(k, plain) {
    var pl = plain == null ? plainNow() : !!plain, G = gparts();
    if (G && G.has(k)) return G.label(k, { plain: pl });
    return PART[k] ? PART[k].n + ': ' + (pl ? PLAIN_WORD : FAITH_WORD)[k] : '';
  }
  function pmeaning(k, plain) {
    var pl = plain == null ? plainNow() : !!plain, G = gparts();
    if (k === 'roots' && pl) return 'what grounds you: calm, values, wonder, and gratitude';
    if (G && G.has(k)) return G.meaning(k, { plain: pl });
    return PART[k] ? PART[k].m : '';
  }
  var PROMISE_LINE = 'The Grounded Way works when you tend all four parts.';
  function promise() { var G = gparts(); return G && G.PROMISE ? G.PROMISE : PROMISE_LINE; }
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
    // BLD 907: For You Today and suggestions lean toward one of the four a person tends; Trunk and Fruit grow from them.
    var tended = scored.filter(function (x) { return isTend(x.k); });
    var lead = edges.filter(isTend)[0] || (tended.length && lv[tended[0].k] === 'steady' ? tended[0].k : null);
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
  /* BLD 906 MILESTONE DAYS START: the day shown on the card (N) is noticed when its digits step forward (123, 6789),
     repeat (111, 7777), land on a round number (100, 500, every thousand), or the day is a sober anniversary (years,
     from the medallions). soberMile(n, years) gives {kind, line, count, text} or null; years is the anniversary
     reached today (0 when none). The card shows line; the share card shows count large and text below it. Never the date. */
  var MILE_ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  var MILE_TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  var MILE_DIGIT = ['zeros', 'ones', 'twos', 'threes', 'fours', 'fives', 'sixes', 'sevens', 'eights', 'nines'];
  function mileWord(n) { return n < 20 ? MILE_ONES[n] : MILE_TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + MILE_ONES[n % 10] : ''); }
  function mileComma(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function mileKind(n) {
    var s = String(n), i, up = s.length >= 3, same = s.length >= 3;
    for (i = 1; i < s.length; i++) { if (+s[i] !== +s[i - 1] + 1) up = false; if (s[i] !== s[0]) same = false; }
    if (up) return 'forward';
    if (same) return 'repeating';
    if (n === 100 || n === 500 || (n >= 1000 && n % 1000 === 0)) return 'round';
    return '';
  }
  function soberMile(n, years) {
    var c = mileComma(n), cap = function (t) { return t.charAt(0).toUpperCase() + t.slice(1); };
    if (years > 0) {
      var yw = years === 1 ? '1 year' : years + ' years';
      return { kind: 'anniversary', line: yw + ' today, one day at a time. Congratulations!', count: yw, text: 'One day at a time, all the way here. Congratulations!' };
    }
    var k = mileKind(n), rest = '';
    if (k === 'forward') rest = 'every digit stepping forward';
    else if (k === 'repeating') rest = 'all ' + MILE_DIGIT[+String(n)[0]];
    else if (k === 'round') {
      var th = n / 1000, word = n === 100 ? 'one hundred' : n === 500 ? 'five hundred' : th === 1 ? 'a thousand' : th < 100 ? mileWord(th) + ' thousand' : '';
      rest = word ? cap(word) + ' todays' : 'Every one of them a today';
    } else return null;
    var sep = k === 'round' ? '. ' : ', ';
    return { kind: k, line: c + ' days' + sep + rest + '. Congratulations!', count: c + ' days', text: cap(rest) + '. Congratulations!' };
  }
  /* BLD 906 MILESTONE DAYS END */
  /* The anniversary in years reached on today (0 when none), from the same medallions the card counts toward. */
  function soberYearsToday(date) {
    var nowS = today(), y = 0;
    medallions(date).forEach(function (m) { if (m.at === nowS && m.k.charAt(0) === 'y') y = +m.k.slice(1); });
    return y;
  }
  /* Once per card open on a milestone day: the ring warms to gold with a soft glow and a few sparkles (about 2 seconds),
     then rests gold. Under reduced motion the ring is simply gold. */
  function mileGlow(scope) {
    (scope || document).querySelectorAll('.hm-sober[data-hm-mile] [data-hm-ring]').forEach(function (el) {
      if (el.getAttribute('data-hm-glow')) return;
      var still = false; try { still = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
      el.setAttribute('data-hm-glow', still ? 'rest' : 'on');
      el.classList.add('hm-mgold');
      if (still) return;
      var sp = document.createElement('div'); sp.className = 'hm-msparks'; sp.setAttribute('aria-hidden', 'true');
      var at = [[50, -4, 0], [92, 22, .25], [102, 64, .55], [74, 98, .8], [26, 100, .4], [-2, 66, .95], [6, 20, .65], [48, 50, 1.15]];
      sp.innerHTML = at.map(function (a) { return '<i style="left:' + a[0] + '%;top:' + a[1] + '%;animation-delay:' + a[2] + 's"></i>'; }).join('');
      el.appendChild(sp);
      el.classList.add('hm-mglow');
      setTimeout(function () { el.classList.remove('hm-mglow'); el.setAttribute('data-hm-glow', 'rest'); if (sp.parentNode) sp.parentNode.removeChild(sp); }, 2300);
    });
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
  /* BLD 912: Get Grounded Now opens in Home's own window (GGNow.mount), never as a page in a frame. */
  function openGGN() {
    mDialog('Get Grounded Now', '<div id="hm-ggn" class="ggn-root hm-ggn"><p class="hm-loading">Opening Get Grounded Now…</p></div>');
    load(GGN_SRC).then(function () {
      var el = document.getElementById('hm-ggn'); if (!el) return;
      if (window.GGNow && GGNow.mount) GGNow.mount(el, { kids: isKid(S.p) }); else openFrame(new URL('/get-grounded-now.html' + (isKid(S.p) ? '#kids' : ''), location.href));
    });
  }
  function playVideo(id, from) {
    load(GGN_SRC).then(function () {
      var tries = 0;
      (function go() {
        if (window.GGNow && window.GG_NOW) { window.GGNow.play(id, [id], from); return; }
        if (++tries > 60) { openGGN(); return; }
        setTimeout(go, 100);
      })();
    });
  }
  /* The tree's own growth plan library, for one quiet line under For You Today. */
  var PRAC = { oak: ['/oak/practices.js?v=b907', 'OAK_PRACTICES'], birch: ['/birch/practices.js?v=b907', 'BIRCH_PRACTICES'], sequoia: ['/sequoia/practices.js?v=b907', 'SEQUOIA_PRACTICES'], pine: ['/pine/practices.js?v=b907', 'PINE_PRACTICES'] };
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
      section: function (sec) { var to = { holidays: route().tab === 'library' ? 'library=holidays' : 'week=holidays', shop: 'week=shop', prep: 'week=prep', setup: 'today=tending', numbers: 'me=numbers', settings: 'me=settings', log: 'today=log', plate: 'today=log', workouts: 'library=workouts', own: 'week=own' }[sec]; if (to && !S.quiet) goTo(to); },
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
    if (DOOR === undefined) readDoor();
    var a = window.GGP && GGP.active && GGP.active();
    document.body.classList.toggle('hm-bn', !!a);
    if (!a) { if (/^#(tending|privacy|more|tree|today|week|grow|library|me)/.test(location.hash)) { try { history.replaceState(null, '', location.pathname); } catch (e) {} } S.id = null; S.view = 'welcome'; closeSheet(true); root.innerHTML = welcomeHtml(); paintNav(''); afterWelcome(); return; }
    var changed = S.id !== a.id;
    S.id = a.id; S.p = GGP.get ? GGP.get(a.id) : a; S.tree = treeOfProfile(S.p);
    if (changed) { S.tendInit = false; S.words = null; S.paintedFor = null; LIB.load = null; if (SU.id !== a.id) SU.open = false; }
    // BLD 907: the Home's own records follow re-filed practices (once a profile opens; a second pass changes nothing).
    if (changed && GGP.isOpen && GGP.isOpen(a.id)) { var hr0 = GGP.data(a.id, 'home'); if (hr0 && aliasHome(hr0)) saveHome(); }
    S.view = viewOf();
    // BLD 907: a new profile sets up its four first; Change My Setup opens the same screens.
    if ((SU.open && SU.id === S.id) || suPending()) { renderSetup(); return; }
    // Kid profiles keep their Today and My Tree (BLD 869).
    if (isKid(S.p)) {
      closeSheet(true); S.view = location.hash === '#watch' ? 'watch' : 'today';
      var kck = location.hash === '#checkin', kgu = location.hash === '#grownups';
      if (kck || kgu || location.hash === '#tree') { try { history.replaceState(null, '', location.pathname + '#today'); } catch (e) {} }
      if (S.view === 'watch') { root.innerHTML = kidWatchHtml(); paintNav('kidwatch'); fillLearn(); maybeTour(); return; }
      var kf = focusKey(); root.innerHTML = kidHtml(); paintNav('kid'); focusBack(kf); maybeTour();
      if (kck) openTreeSheet('checkin'); else if (kgu) openTool('guide');
      return;
    }
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
    // BLD 910: a kid's tree has three tabs in the same app: My Tree, Check-in, Watch.
    var items = [['home', '#today', 'tree', 'My ' + t.n, 'My Tree'], ['ck', '#checkin', 'check', 'Check-in', 'Check-in'], ['watch', '#watch', 'play', 'Watch', 'Watch']];
    var on = cur === 'kidwatch' ? 'watch' : 'home';
    if (tabs) tabs.innerHTML = items.map(function (x) { return '<a href="' + x[1] + '"' + (x[0] === on ? ' aria-current="page"' : '') + ' data-hm-nav="' + x[0] + '">' + I(x[2]) + esc(x[3]) + '</a>'; }).join('');
    var bn = document.createElement('nav'); bn.className = 'hm-bnav'; bn.id = 'hm-bnav'; bn.setAttribute('aria-label', 'The Grounded Way');
    bn.innerHTML = '<ul style="--n:' + items.length + '">' + items.map(function (x) { return '<li><a href="' + x[1] + '"' + (x[0] === on ? ' aria-current="page"' : '') + ' data-hm-nav="' + x[0] + '"><span class="ic">' + I(x[2]) + '</span><span class="l">' + esc(x[4]) + '</span></a></li>'; }).join('') + '</ul>';
    var host = document.querySelector('main.hm') || document.body; host.appendChild(bn);
  }

  /* ---------- first visit ---------- */
  function promiseHtml() {
    return '<div class="hm-promise">' +
      '<div class="hm-card hm-prom hm-p-leaves">' + pb(IMG + 'quiet-morning-sq.webp') + '<div><h3 class="hm-h3">Private</h3><div class="hm-sub">The Grounded Way is yours alone. Begin with just a name and a passcode.</div></div></div>' +
      '<div class="hm-card hm-prom hm-p-branches">' + pb(IMG + 'tending-sq.webp') + '<div><h3 class="hm-h3">On Your Device</h3><div class="hm-sub">Everything stays right here, on this phone or computer.</div></div></div>' +
      '<div class="hm-card hm-prom hm-p-trunk">' + pb(IMG + 'candle-alcove-sq.webp') + '<div><h3 class="hm-h3">Locked With Your Passcode</h3><div class="hm-sub">Only your passcode, or your Root Words, opens it.</div></div></div>' +
      '<div class="hm-card hm-prom hm-p-bark">' + pb(IMG + 'way-plan-sq.webp') + '<div><h3 class="hm-h3">Yours to Shape</h3><div class="hm-sub">Choose how you tend each of the four. Change it any time in Settings.</div></div></div>' +
    '</div>';
  }
  var STAGES = [['maple'], ['aspen'], ['pine'], ['birch'], ['oak'], ['sequoia'], [null, 'For a Season of Life'], ['willow'], ['grove'], ['heartwood']];
  /* BLD 907: the setup, one area at a time, replaces the old seven switches. Two quiet extras stay as switches in
     Settings: Labs and Numbers (now part of Leaves: Body) and Living Sober (a season). */
  var EXTRAS = [
    ['labs', 'hm-a-numbers', 'flask', 'Labs and Numbers', ['leaves']],
    ['sober', 'hm-a-sober', 'sun2', 'Living Sober', ['bark', 'leaves']]
  ];
  function extrasHtml(on, attr) {
    return '<div class="hm-tend6">' + EXTRAS.map(function (t) {
      var p = !!on[t[0]];
      return '<button class="hm-tg ' + t[1] + '" type="button" aria-pressed="' + p + '" ' + attr + '="' + t[0] + '">' + pb(t[2] === 'flask' ? IMG + 'supplements-sq.webp' : HERO + 'living-sober-card.webp') + '<span class="tx"><span class="hm-h3" style="display:block">' + esc(t[3]) + '</span><span class="hm-pts">' + t[4].map(function (x) { return '<span class="hm-pt hm-p-' + x + '">' + esc(plabel(x)) + '</span>'; }).join('') + '</span></span><span class="hm-sw" aria-hidden="true"></span></button>';
    }).join('') + '</div>';
  }
  function hasProfiles() { try { return GGP.list().length > 0; } catch (e) { return false; } }
  function welcomeHtml() {
    var back = window.GGP && hasProfiles();
    var hero = '<div class="hm-hero welcome"><picture><source media="(max-width:699px)" srcset="' + IMG + 'grounded-way-narrow.webp"><img class="art" src="' + IMG + 'grounded-way-wide.webp" alt="" width="1792" height="1008" fetchpriority="high"></picture>' +
      '<div class="in"><div class="hm-greet">' + I('sprout') + '<span>' + (back ? 'Welcome Back' : 'Welcome to Grounded') + '</span></div><h1>The Grounded Way</h1>' +
      '<p>See your tree, tend your day, and keep everything you use in one calm place.</p>' +
      (back ? '<div class="hm-acts tight"><button type="button" class="hm-btn light" data-hm="open">' + I('lock') + 'Open The Grounded Way</button></div>' : '<div class="hm-acts tight"><a class="hm-btn light" href="#hm-steps">' + I('sprout') + 'Begin The Grounded Way</a></div>') +
      '</div></div>';
    var sp = '<div class="hm-species" id="hm-species">' + STAGES.map(function (s) {
      if (!s[0]) return '<div class="hm-sp-k">' + s[1] + '</div>';
      var t = TREES[s[0]];
      return '<button class="hm-spc" type="button" aria-pressed="' + (W.stage === s[0]) + '" data-hm-stage="' + s[0] + '"><img class="hm-sppic" src="' + treeArt(s[0]) + '" alt="" width="58" height="58" loading="lazy"><b>' + esc(t.n) + '</b><small>' + esc(t.who) + '</small></button>';
    }).join('') + '</div>';
    var who = [['me', 'user', 'Me', 'Your own tree and your own day.'], ['family', 'people', 'My Family', 'Each person\'s tree, growing together in The Grove.'], ['other', 'love', 'Someone I Love', 'Set up their Grounded Way and stay close as their helper.']];
    var steps = '<div class="hm-steps" id="hm-steps">' +
      '<div class="hm-card hm-step hm-p-branches"><div class="hm-shd"><span class="hm-num">1</span><div><div class="hm-k">Step 1 of 3</div><h2 class="hm-h2">Who Is This For?</h2></div></div>' +
        '<div class="hm-who" role="group" aria-label="Who is this for">' + who.map(function (w) { return '<button type="button" class="hm-p-branches" aria-pressed="' + (W.who === w[0]) + '" data-hm-who="' + w[0] + '">' + pb(w[0] === 'me' ? treeArt('oak') : w[0] === 'family' ? treeArt('grove') : IMG + 'tend-people.webp') + '<span><b>' + w[2] + '</b><small>' + w[3] + '</small></span><span class="rd"></span></button>'; }).join('') + '</div></div>' +
      '<div class="hm-card hm-step hm-p-leaves"><div class="hm-shd"><span class="hm-num">2</span><div><div class="hm-k">Step 2 of 3</div><h2 class="hm-h2">Your Stage of Life</h2></div></div>' +
        '<p class="hm-sub" style="margin:-4px 0 12px">Your stage picks your tree. Each one is built for its season of life.</p>' + sp +
        '<div class="hm-note hm-p-leaves" style="margin-top:12px">' + I('people') + '<span id="hm-stage-note">Maple and Aspen are set up with a grown-up, who keeps a key with their own passcode.</span></div></div>' +
      '<div class="hm-card hm-step hm-p-roots"><div class="hm-shd"><span class="hm-num">3</span><div><div class="hm-k">Step 3 of 3</div><h2 class="hm-h2">Tend Your Four</h2></div></div>' +
        '<p class="hm-sub" style="margin:-4px 0 12px">Right after your passcode, you set up each part you tend, one at a time: ' + TEND4.map(function (k) { return esc(plabel(k, false)); }).join(', ') + '. Then a quick or full check-in.</p>' +
        '<p class="hm-promise-line">' + I('sprout') + '<span>' + esc(promise()) + '</span></p>' +
        '<div class="hm-go"><button class="hm-btn big hm-p-leaves" type="button" data-hm="create">' + I('lock') + 'Choose My Passcode</button><div class="hm-sub" style="text-align:center">Next: your passcode and 12 Root Words, then your four, one at a time.</div></div></div>' +
    '</div>';
    return '<div class="hm-wrap">' + hero + promiseHtml() +
      '<div class="hm-plink"><a class="hm-link hm-p-leaves" href="#hm-privacy">' + I('shield') + 'How your privacy works</a><span class="hm-time">' + (back ? 'New here? Three short steps' : 'Three short steps · about a minute') + '</span></div>' +
      steps + '<div style="margin-top:28px" id="hm-privacy">' + privacyBrief(false) + '</div>' + helpLine() + '</div>';
  }
  function afterWelcome() {}
  function helpLine() { return '<p class="hm-help">' + (S.p && isKid(S.p) ? 'If you ever feel unsafe, tell a trusted grown-up right away. You can also call or text 988, or call 911 in an emergency.' : 'If you ever feel like hurting yourself, call or text 988. In danger now, call 911.') + '</p>'; }

  /* Creating a profile through the real dialogs, then the Home's own choices. */
  function partsList() { return []; }
  /* A new profile opens its setup first (BLD 907): the four areas, one at a time, then a check-in. */
  function newSetup() { return { v: 1, i: 0, at: today() }; }
  function writeHome(id, extra) {
    if (!GGP.isOpen(id)) return Promise.resolve();
    var h = GGP.data(id, 'home');
    Object.assign(h, { created: h.created || today() }, extra || {});
    return GGP.save(id);
  }
  function create() {
    if (!window.GGP) return;
    var stage = W.stage, t = TREES[stage] || TREES.oak, kid = ['maple', 'aspen', 'pine'].indexOf(stage) >= 0;
    var mine = { who: W.who, stage: stage, parts: partsList(), setup: newSetup() };
    if (t.season) mine.season = stage;
    var adultTree = stage === 'birch' || stage === 'sequoia' ? stage : 'oak';
    var hasAdult = GGP.list().some(function (p) { return p.age === 'adult'; });
    var done = function () { if (location.hash) { try { history.replaceState(null, '', location.pathname); } catch (e) {} } render(); window.scrollTo(0, 0); };
    if (kid) {
      var kidStep = function () {
        GGP.createDialog({ age: t.age, reason: t.n + ' is set up with a grown-up. Add the name your child goes by.', onCreated: function (kidId) { writeHome(kidId, { stage: stage, setup: newSetup() }).then(done); } }).then(function () { done(); });
      };
      if (hasAdult) { kidStep(); return; }
      GGP.createDialog({ age: 'adult', reason: t.n + ' is set up with a grown-up. First, your own profile as the grown-up, then your child\'s.', onCreated: function (gid) {
        writeHome(gid, Object.assign({}, mine, { who: 'family', stage: 'oak' })).then(function () { setTimeout(kidStep, 300); });
      } });
      return;
    }
    if (W.who === 'other') {
      var forOther = function () {
        GGP.createDialog({ forOther: true, keepMe: true, tree: adultTree, onCreated: function (oid) { writeHome(oid, { stage: stage, parts: mine.parts, season: mine.season, setup: newSetup() }).then(done); } }).then(done);
      };
      var a = GGP.active();
      if (a && a.age === 'adult') { forOther(); return; }
      GGP.createDialog({ age: 'adult', reason: 'First, your own profile, so you can stay close as their helper. Then theirs.', onCreated: function (mid) {
        writeHome(mid, { who: 'other', stage: 'oak', parts: [], setup: newSetup() }).then(function () { setTimeout(forOther, 300); });
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
    var mile = c.days > 0 ? soberMile(c.days + 1, soberYearsToday(date)) : null; S.mile = mile;
    return '<article class="hm-card hm-sober hm-a-sober o4" id="hm-sober"' + (mile ? ' data-hm-mile="' + mile.kind + '"' : '') + '><div class="row">' + ring(108, 10, into, span, '<b>' + (c.days + 1) + '</b><small>' + (c.days === 0 ? 'day' : 'days') + '</small>') +
      '<div style="min-width:0"><div class="dn">Living Sober</div><h3 class="hm-h3" style="font-size:28px">' + (c.days === 0 ? 'Day One' : 'Day ' + (c.days + 1)) + '</h3>' + (mile ? '<p class="hm-mline">' + I('star') + '<span>' + esc(mile.line) + '</span></p>' : '') + '<div class="hm-sub">Next medallion: ' + esc(next.name) + ', in ' + left + (left === 1 ? ' day' : ' days') + '.</div></div></div>' +
      '<div class="hm-sk">Today\'s Encouragement</div><p class="words" id="hm-words">Every day counts. Today is one more.</p>' +
      '<div class="hm-smantra"><span class="hm-sk">Mantra</span><b class="hm-mtext">One day at a time.</b></div>' +
      '<div class="hm-acts tight hm-shares"><button type="button" class="hm-btn sm line hm-a-sober" data-hm-share="daily">' + I('open') + 'Share Today\'s Words</button><button type="button" class="hm-btn sm line hm-a-sober" data-hm-share="mantra">' + I('open') + 'Share the Mantra</button>' + (mile ? '<button type="button" class="hm-btn sm hm-a-sober hm-mshare" data-hm-share="mile">' + I('open') + 'Share My Milestone</button>' : '') + '</div>' +
      '<div class="hm-acts"><a class="hm-btn sm hm-a-sober" href="/living-sober.html#today">' + I('sunrise') + 'Today\'s Intention</a><a class="hm-btn sm line hm-a-sober" href="/living-sober.html#wave">' + I('wind') + 'Ride the Wave</a></div>' +
      // BLD 911: Living Sober's tools open right here in Home (shared/gg-sober.js), never a tree page.
      '<div class="hm-acts tight"><button type="button" class="hm-btn sm line hm-a-sober" data-hm-sober="anchor">' + I('shield') + 'My Anchor Plan</button>' + (member() ? '<button type="button" class="hm-btn sm line hm-a-sober" data-hm-sober="mine">' + I('people') + 'My Good People</button><button type="button" class="hm-btn sm line hm-a-sober" data-hm-sober="people">' + I('sprout') + 'Healthy People, Healthy Places</button>' : '') + '</div></article>' +
      (c.days >= 90 && !member() && !isKid(S.p) ? inviteHtml('sober', 'hm-a-sober') : '');
  }
  function soberInviteHtml() {
    var t = TREES[S.tree] || TREES.oak;
    return '<article class="hm-card hm-a-sober o4 hm-offer" id="hm-sober">' + pb(HERO + 'living-sober-card.webp') + '<div style="flex:1;min-width:0"><div class="hm-k">Living Sober</div><div class="hm-sub">Turn on Living Sober and add your sober date in My ' + esc(t.n) + ', and your day count, words for today, and medallions show here.</div>' +
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
    if (kind === 'mile') {
      var m = S.mile; if (!m) return;
      load('/shared/gg-sharecard.js?v=b839').then(function () { if (window.GGShareCard) window.GGShareCard.share({ kind: 'milestone', star: 'gold', count: m.count, text: m.text }); else toast('Sharing opens on Living Sober.'); });
      return;
    }
    var text = kind === 'mantra' ? (S.mantra || '') : ((document.getElementById('hm-words') || {}).textContent || '');
    if (!text) return;
    load('/shared/gg-sharecard.js?v=b839').then(function () { if (window.GGShareCard) window.GGShareCard.share({ kind: kind, text: text }); else toast('Sharing opens on Living Sober.'); });
  }
  function fillWords() {
    var el = document.getElementById('hm-words'); if (!el) return;
    load(WORDS_SRC).then(function () {
      var G = window.GGSoberWords, el2 = document.getElementById('hm-words'); if (!G || !el2) return;
      var list = arr(G.daily), c = soberCount(soberDate()); if (!list.length || !c) return;
      // BLD 908: GGSoberWords.all() is the 90 plus days 91 to 365 when Membership is open on this device (day n is list[n - 1]).
      if (typeof G.all === 'function') { try { var al = arr(G.all()); if (al.length) list = al; } catch (e) {} }
      var st = obj((GGP.data(S.id) || {}).life).sober || '';
      for (var i = 0; i < list.length; i++) { var w = list[(c.days + i) % list.length]; if (!w.stage || !st || w.stage.indexOf(st) >= 0) { el2.textContent = w.text; return; } }
    });
  }

  /* For You Today */
  function forYouHtml(ed) {
    var part = ed && ed.lead ? ed.lead : 'none', ids = MATCH[part], id = pick(ids, dayIndex()), v = GGN[id];
    var tag = part === 'none' ? '<span>A good place to begin</span>' : '<span class="hm-pt hm-p-' + part + '">' + esc(plabel(part)) + '</span><span>' + (ed.edges.indexOf(part) >= 0 ? 'Matched to your Growing Edge' : 'Leaning toward your ' + PART[part].n) + '</span>';
    return '<article class="hm-card hm-foryou ' + (part === 'none' ? 'hm-p-leaves' : 'hm-p-' + part) + ' o5"><button type="button" class="art" data-hm-play="' + id + '" aria-label="Play ' + esc(v[0]) + '"><img src="' + IMG + ART[part] + '.webp" alt="" loading="lazy"><span class="play">' + I('play') + '</span></button>' +
      '<div class="body"><div class="hm-k">For You Today</div><h3 class="hm-h3">' + esc(v[0]) + '</h3><div class="hm-sub">A ' + (v[1] === 1 ? 'one' : v[1] === 3 ? 'three' : 'two') + ' minute practice from Get Grounded Now. ' + esc(v[2]) + '</div>' +
      '<div class="hm-match">' + tag + '</div><div class="hm-also" id="hm-also" data-part="' + part + '"></div></div></article>';
  }
  function fillAlso() {
    var el = document.getElementById('hm-also'); if (!el) return;
    var part = el.dataset.part, src = PRAC[S.tree]; if (!src || part === 'none' || !isTend(part)) return;
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
    return '<article class="hm-card hm-p-leaves o7" id="hm-family"><div class="hm-hd">' + pb(treeArt('grove')) + '<div><div class="hm-k">Your Family</div><div class="hm-sub">' + (rows.length ? 'Progress at a glance: days tended, check-ins, and rings. Answers and words stay inside each tree.' : 'Add the people you tend with. Each one has a tree of their own.') + '</div></div></div>' + rows.join('') + add + '</article>';
  }

  /* ---------- Settings and Privacy ---------- */
  function privacyBrief(open) {
    return '<div class="hm-lay c2"><article class="hm-card hm-priv hm-p-leaves"><div class="hm-pv-hd">' + pb(IMG + 'candle-alcove-sq.webp') + '<div><div class="hm-k">' + (open ? 'Settings and Privacy' : 'How Your Privacy Works') + '</div><h2 class="hm-h2" style="font-size:34px">Your Grounded Way Stays Yours</h2></div></div>' +
      '<div class="hm-set" style="margin-top:10px">' +
        '<div class="hm-row hm-p-leaves"><span class="ic2">' + I('eye') + '</span><div class="tx"><b>What is kept</b><small>Your name and picture, your check-ins and growth plan, the days you tend, your Tending plan, your Living Sober count, and any lab numbers you add.</small></div></div>' +
        '<div class="hm-row hm-p-branches"><span class="ic2">' + I('phone') + '</span><div class="tx"><b>Where it lives</b><small>Only on this device, in this browser, locked with your passcode. You hold the only key.</small></div></div>' +
        '<div class="hm-row hm-p-trunk"><span class="ic2">' + I('key') + '</span><div class="tx"><b>Root Words</b><small>Twelve plain words that open The Grounded Way again if you forget your passcode. Keep them somewhere safe.</small></div></div>' +
        '<div class="hm-row hm-p-roots"><span class="ic2">' + I('save') + '</span><div class="tx"><b>Save a Backup</b><small>One locked file you keep in your files, iCloud, or a drive. It opens with your passcode.</small></div></div>' +
        '<div class="hm-row hm-p-bark"><span class="ic2">' + I('swap') + '</span><div class="tx"><b>Move to a New Phone</b><small>Save a Backup here, then on the new phone choose Open a Backup and enter your passcode. Your tree comes with you.</small></div></div>' +
        '<div class="hm-row hm-p-fruit"><span class="ic2">' + I('gear') + '</span><div class="tx"><b>Start Fresh</b><small>Manage My Profile removes a profile and its saved days from this device for good. Save a backup first to keep anything.</small></div></div>' +
      '</div>' +
      (open ? '<div class="hm-acts"><button class="hm-btn hm-p-leaves" type="button" data-hm="backup">' + I('save') + 'Save a Backup</button><button class="hm-btn line hm-p-leaves" type="button" data-hm="restore">' + I('open') + 'Open a Backup</button></div>' +
        '<div class="hm-acts">' + (GGP.rootState && GGP.rootState(S.id) ? '<button class="hm-btn line hm-p-trunk" type="button" data-hm="rootwords">' + I('key') + 'See My Root Words</button>' : '') + '<button class="hm-btn line hm-p-fruit" type="button" data-hm="manage">' + I('gear') + 'Manage My Profile</button><button class="hm-btn line hm-p-branches" type="button" data-hm="lock">' + I('lock') + 'Lock</button></div>' : '') +
      '</article><div class="hm-col">' +
        '<article class="hm-card hm-a-numbers"><div class="hm-hd">' + pb(IMG + 'progress-sq.webp') + '<div><div class="hm-k">A Note on Health Numbers</div><h3 class="hm-h3">Talk It Over With Your Doctor</h3></div></div><div class="hm-sub">Plate rings, lab lines, and progress paths are research-informed estimates. They are here to help you notice and plan, and to bring to your doctor. Grounded offers guidance and support, and your doctor guides your medical choices.</div></article>' +
        '<article class="hm-card hm-p-trunk"><div class="hm-hd">' + pb(IMG + 'tend-people.webp') + '<div><div class="hm-k">Kids and Helpers</div><h3 class="hm-h3">A Key for Those Who Help</h3></div></div><div class="hm-sub">Maple and Aspen are set up with a grown-up, who keeps a key with their own passcode. In Birch, Sequoia, and Willow, a helper sees only what the person chooses to share.</div></article>' +
        '<article class="hm-card hm-p-leaves"><div class="hm-hd">' + pb(IMG + 'candle-alcove-sq.webp') + '<div><div class="hm-k">Locked Tight</div><h3 class="hm-h3">How the Lock Works</h3></div></div><div class="hm-sub">Your saved data is sealed with its own key (AES 256). That key is locked with your passcode, and again with your Root Words, so either one opens it.</div><div class="hm-quiet" style="margin-top:10px"><a href="/privacy.html">Read the full Privacy Policy</a></div></article>' +
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
      '<div class="hm-kbar">' + howBtn(x, 'hm-khowb') + rchipHtml(x) + (when ? '' : dtBtn(x)) + '</div>' + rmenuHtml(x) + howPanel(x) + '</li>';
  }
  function kidPracHtml() {
    var items = planItems(true); if (!items.length) return '';
    items.forEach(function (x, i) { x.i = i; }); items.sort(function (a, b) { return a.hour - b.hour || a.i - b.i; });
    // BLD 907: Do Tomorrow rests a daily practice until tomorrow.
    var later = obj(homeRec().later), td = today(), moved = items.filter(function (x) { return x.r === 'd' && !x.done && later[x.pid] && later[x.pid] > td; });
    items = items.filter(function (x) { return moved.indexOf(x) < 0; });
    var day = items.filter(function (x) { return x.r === 'd'; }), wk = items.filter(function (x) { return x.r === 'w' || x.r === 'f'; }), some = items.filter(function (x) { return x.r === 'n'; });
    var n = day.filter(function (x) { return x.done; }).length;
    var line = !day.length ? 'Your practices for this week and for sometimes are right here.' : n === day.length ? 'You tended every one today. Your tree is glowing!' : n ? n + ' done. Keep growing!' : 'Tap the circle when you do one.';
    wk.sort(function (a, b) { return (a.done ? 1 : 0) - (b.done ? 1 : 0) || a.i - b.i; });
    return '<div class="hm-kcard hm-kpracs" style="--c:#4FA82C"><h2 class="hm-kh">My Practices Today</h2><p class="hm-kline">' + line + '</p>' +
      (day.length ? '<ul class="hm-kpl">' + day.map(function (x) { return kidLi(x); }).join('') + '</ul>' : '') + movedHtml(moved, true) +
      (wk.length ? '<h3 class="hm-kh hm-ksub">This week</h3><p class="hm-kline">' + (wk.some(function (x) { return x.r === 'f'; }) ? 'Do each one this week, on any days you like.' : 'Do each one once this week, any day you like.') + '</p><ul class="hm-kpl">' + wk.map(function (x) { return kidLi(x, x.done ? 'Done this week! ' + plabel(x.part) : (x.r === 'f' ? x.cnt + ' of ' + x.x + ' this week' + (x.doneToday ? ', done today!' : '') : 'This week') + ' · ' + plabel(x.part)); }).join('') + '</ul>' : '') +
      (some.length ? '<h3 class="hm-kh hm-ksub">Sometimes</h3><p class="hm-kline">Fun to do now and then, whenever you are ready.</p><ul class="hm-kpl">' + some.map(function (x) { return kidLi(x, (x.doneToday ? 'Done today!' : x.last ? 'Last time: ' + shortDate(x.last) : 'Whenever you are ready') + ' · ' + plabel(x.part)); }).join('') + '</ul>' : '') + '</div>';
  }

  /* ---------- Kid Home: Maple and Aspen, playful, no numbers ---------- */
  var KP = { roots: '#FF6B6B', trunk: '#FF9F1C', bark: '#9B5DE5', branches: '#00B4D8', leaves: '#6CCB3A', fruit: '#D62839' };
  function kidHtml() {
    var t = TREES[S.tree], d = now(), hr = d.getHours(), eve = hr >= 17 || hr < 5, ck = lastCheckin(S.id, S.tree), ed = edgesOf(ck), h = homeRec();
    var did = !!h.kid[today()];
    // BLD 907: the four parts a kid tends, each with its paired label; Trunk and Fruit grow from that tending.
    var kitems = planItems(true), parts = TEND4.map(function (k) {
      var lv = ck ? ed.lv[k] : 'unsure', love = ck && lv === 'edge', has = kitems.some(function (x) { return x.part === k; });
      return '<div class="' + (love || !ck ? 'dim' : '') + '" style="--kp:' + KP[k] + '"><i>' + (love ? '+' : ck && lv !== 'unsure' ? '✓' : '•') + '</i>' + esc(plabel(k)) + (has ? '' : '<small class="hm-kready">Ready for tending</small>') + '</div>';
    }).join('');
    var grow = '<p class="hm-kgrow">' + GROW2.map(function (k) { var lv = ck ? ed.lv[k] : 'unsure'; return '<span style="--kp:' + KP[k] + '"><b>' + esc(plabel(k)) + '</b> grows from your tending' + (ck && lv !== 'unsure' ? ': ' + esc(LV[lv][0]) : '') + '</span>'; }).join('') + '</p>';
    var lead = ed.edges.filter(isTend)[0] || ed.lead || 'none', id = pick(KMATCH[lead], dayIndex()), v = GGN[id];
    var line = !ck ? 'Check in with your grown-up to wake up your tree.' : ed.edges.filter(isTend).length ? 'The + part could use a little love today.' : 'Your whole tree is growing. Great tending!';
    return '<div class="hm-wrap"><nav class="hm-tabs" id="hm-tabs" aria-label="The Grounded Way"></nav><div class="hm-lay kidlay"><div class="hm-kid">' +
      '<div class="hm-ksky"><img class="art" src="' + IMG + (eve ? 'home-evening' : 'home-morning') + '-narrow.webp" alt=""><div class="hi"><span><b>Hi, ' + esc(S.p.name) + '!</b><small>' + DAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + '</small></span></div><img class="mark" src="' + mark(S.tree) + '" alt=""></div>' +
      '<div class="hm-kin">' +
        '<div class="hm-kcard" style="--c:#FF9F1C"><h2 class="hm-kh">Your ' + t.n + ' Is Growing</h2><div class="hm-kparts">' + parts + '</div>' + grow + '<p style="margin-top:10px;font-weight:500">' + esc(line) + '</p></div>' +
        '<div class="hm-kcard" style="--c:#9B5DE5"><div class="hm-kprac"><button type="button" class="ill" data-hm-play="' + id + '" aria-label="Play ' + esc(v[0]) + '"><img src="' + IMG + ART[lead] + '.webp" alt=""><span>' + I('play') + '</span></button><div><h3 class="hm-kh">Today: ' + esc(v[0]) + '</h3><p>' + esc(v[2]) + '</p></div></div>' +
          '<button class="hm-kbtn" type="button" style="margin-top:12px" data-hm="kiddid" aria-pressed="' + did + '">' + I('check') + (did ? 'You Did It!' : 'We Did It!') + '</button></div>' +
        kidPracHtml() +
        (did ? '<div class="hm-kcard hm-surprise" style="--c:#00B4D8"><svg viewBox="0 0 52 52" aria-hidden="true"><g class="bird"><ellipse cx="26" cy="30" rx="13" ry="10" fill="#00B4D8"/><circle cx="34" cy="22" r="7" fill="#00B4D8"/><circle cx="36" cy="21" r="1.6" fill="#2C1810"/><path d="M40 22l6 2-6 2z" fill="#FF9F1C"/><path d="M16 28c4-6 10-6 14-2-5 1-9 3-14 2z" fill="#0090B0"/></g><path d="M8 44h36" stroke="#8A5A36" stroke-width="4" stroke-linecap="round"/></svg><div><h3 class="hm-kh" style="font-size:20px">A visitor came to your tree!</h3><div style="font-size:15px;font-weight:500">A little bird stopped by because you tended your tree today.</div></div></div>' : '') +
        '<button type="button" class="hm-kbtn" data-hm-tree="checkin" style="--c:#4FA82C">' + I('people') + 'Check In With My Grown-up</button>' +
        '<button type="button" class="hm-khow" data-hm-tool="guide">' + I('people') + 'For Grown-ups</button>' +
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
  // BLD 910 (Chris: "one app that had tree profiless"): five tabs for every grown-up tree; Week opens from Today and Grow.
  var TABS = [['today', 'Today', 'sun'], ['checkin', 'Check-in', 'check'], ['grow', 'Grow', 'sprout'], ['learn', 'Learn', 'play'], ['library', 'Library', 'book']];
  var SUBS = {
    today: { log: 'Log a Plate or a Note', tending: 'Tending' },
    week: { holidays: 'Holidays and Gatherings', shop: 'Shopping List', prep: 'Sunday Together Prep', own: 'My Own Items' },
    library: { holidays: 'Holidays and Gatherings', workouts: 'Grounded Fitness' },
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
  /* BLD 895: Chris's Grok paintings, each card its own; -sq files are the square crops for small tiles, the others are wide. */
  var ART2 = {
    quiet: IMG + 'quiet-morning-sq.webp', move: IMG + 'move-strength-sq.webp', meal: IMG + 'meal-lunch-sq.webp', cook: IMG + 'tend-body.webp',
    head: IMG + 'kitchen-headstart-sq.webp', shop: IMG + 'shop-wide.webp', shopSq: IMG + 'shop-sq.webp', prep: IMG + 'prep-together-sq.webp', supp: IMG + 'supplements-sq.webp',
    spirit: IMG + 'tend-spirit.webp', people: IMG + 'tend-people.webp', start: IMG + 'tending-sq.webp', startWide: IMG + 'tending-wide.webp', growth: HERO + 'page-growth-narrow.webp',
    batch: IMG + 'weekly-batch-sq.webp', rest: IMG + 'rest-day-sq.webp', plan: IMG + 'growth-plan-sq.webp', med: IMG + 'quiet-meditation-sq.webp'
  };
  var FOOD_ROT = [IMG + 'tend-body.webp', IMG + 'tend-fruit.webp', IMG + 'tend-people.webp', IMG + 'recipes-narrow.webp'];
  function treeArt(tree, wide) { if (tree === 'heartwood') return wide ? '/heartwood/hero-wide.webp' : HERO + 'heartwood-card.webp'; return HERO + (/^(oak|birch|sequoia|pine|maple|aspen|willow|grove)$/.test(tree) ? tree : 'oak') + (wide ? '-wide.webp' : '-phone.webp'); }
  function artFor(x) {
    var k = String(x.kind || '') + ' ' + String(x.hkey || x.key || '');
    if (x.key === 'tree') return treeArt(S.tree);
    if (x.key === 'pray') return ART2.spirit;
    if (x.key === 'talk') return ART2.people;
    if (/med/.test(k)) return ART2.med;
    if (/quiet/.test(k)) return ART2.quiet;
    if (/work|prac|mark|wl:|move/.test(k)) return ART2.move;
    if (/head/.test(k)) return ART2.head;
    if (/cook/.test(k)) return ART2.cook;
    if (/shop/.test(k)) return ART2.shopSq;
    if (/batch/.test(k)) return ART2.batch;
    if (/prep/.test(k)) return ART2.prep;
    if (/supp/.test(k)) return ART2.supp;
    return ART2.meal;
  }
  // BLD 910 (Chris: "all cards get high quality images not the cheap graphics"): a card's badge is one of Grounded's paintings.
  function pb(src) { return '<span class="hm-badge hm-pb" aria-hidden="true"><img src="' + src + '" alt="" loading="lazy" decoding="async"></span>'; }
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
    if (k === 'checkin' || k === 'season') return { tab: 'checkin', sub: '' };
    if (k === 'learn' || k === 'watch') return { tab: 'learn', sub: '' };
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
    if (tab === 'checkin') return 'Check-in';
    if (tab === 'learn') return 'Learn';
    return tab === 'grow' ? 'Grow' : 'Library';
  }
  function weekLabel(l) { l = String(l || ''); return /^week\b/i.test(l) ? l : 'Week ' + l; }
  function meBtn() { return '<button type="button" class="hm-me" data-hm="me" aria-label="Your profile, numbers, and settings" aria-haspopup="dialog">' + esc(initials(S.p && S.p.name)) + '</button>'; }
  /* BLD 882 (Chris: "bring back UI and UX"): the pre-881 Home's look is the base again. Today opens on the big bright hero
     with the day and date; Week, Grow, and Library open on a painted banner with the tab's name. */
  var BANNER = { week: ['recipes', 'Your meals, your movement, and Sunday Together Prep'], grow: ['tree', 'Tend four, grow two: your growth plan, your season, and your family'], library: ['library', 'Recipes, workouts, quiet, stories, and every Grounded tool'], checkin: ['mytree', 'How each part of your tree is growing'], learn: ['learn', 'Lessons and guides chosen for your tree'] };
  function bannerHtml(tab) {
    var b = BANNER[tab] || BANNER.grow; if (b[0] === 'mytree' || b[0] === 'learn') return bannerArt(tab, b, b[0] === 'mytree' ? treeArt(S.tree, true) : HERO + 'learn/c133.webp', b[0] === 'mytree' ? treeArt(S.tree) : HERO + 'learn/c133.webp');
    var wide = b[0] === 'tree' ? HERO + 'page-growth-wide.webp' : b[0] === 'recipes' ? IMG + 'recipes-wide.webp' : HERO + 'library-wide.webp', narrow = b[0] === 'tree' ? HERO + 'page-growth-narrow.webp' : b[0] === 'recipes' ? IMG + 'recipes-narrow.webp' : HERO + 'library-phone.webp';
    return '<header class="hm-ah hm-banner"><picture class="bg" aria-hidden="true"><source media="(max-width:699px)" srcset="' + narrow + '"><img src="' + wide + '" alt="" fetchpriority="high"></picture>' +
      '<div class="hm-ahl"><div class="hm-ak">The Grounded Way</div><h1 class="hm-at">' + esc(headingOf(tab)) + '</h1><p class="hm-asub">' + esc(b[1]) + '</p></div>' + meBtn() + '</header>';
  }
  function bannerArt(tab, b, wide, narrow) {
    var kick = tab === 'checkin' ? 'My ' + (TREES[S.tree] || TREES.oak).n : 'The Grounded Way';
    return '<header class="hm-ah hm-banner"><picture class="bg" aria-hidden="true"><source media="(max-width:699px)" srcset="' + narrow + '"><img src="' + wide + '" alt="" fetchpriority="high"></picture>' +
      '<div class="hm-ahl"><div class="hm-ak">' + esc(kick) + '</div><h1 class="hm-at">' + esc(headingOf(tab)) + '</h1><p class="hm-asub">' + esc(b[1]) + '</p></div>' + meBtn() + '</header>';
  }
  function shellHtml(tab, body) {
    return '<div class="hm-app" data-tab="' + tab + '">' + (tab === 'today' ? '' : bannerHtml(tab)) +
      '<div class="hm-pane" id="hm-pane">' + body + '</div>' + helpLine() + '</div>';
  }
  function paintTabbar(cur) {
    var old = document.getElementById('hm-bnav'); if (old) old.remove();
    var tabs = document.getElementById('hm-tabs'); if (tabs) tabs.innerHTML = '';
    var bn = document.createElement('nav'); bn.className = 'hm-tabbar'; bn.id = 'hm-bnav'; bn.setAttribute('aria-label', 'The Grounded Way');
    var on = cur === 'week' ? 'today' : cur;
    bn.innerHTML = '<ul>' + TABS.map(function (t) { return '<li><a href="#' + t[0] + '" data-hm-tab="' + t[0] + '"' + (t[0] === on ? ' aria-current="page"' : '') + '><span class="bar" aria-hidden="true"></span><span class="ic">' + I(t[2]) + '</span><span class="l">' + t[1] + '</span></a></li>'; }).join('') + '</ul>';
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
    if (sub) body = subbarHtml(tab, sub) + (sub === 'quiet' ? medTopHtml() : '') + '<div id="hm-tend" class="hm-sec" data-sec="' + sub + '"><div class="hm-loading">Opening ' + esc(SUBS[tab][sub]) + '…</div></div>';
    else body = tabHtml(tab);
    root.innerHTML = shellHtml(tab, body);
    paintTabbar(tab);
    if (sub) paintSection(document.getElementById('hm-tend'), sub);
    else afterTab(tab);
    if (r.tab === 'me') openSheet(r.sub); else closeSheet(true);
    if (r.recipe) { try { history.replaceState(null, '', location.pathname + '#library'); } catch (e) {} S.view = 'library'; openRecipe(r.recipe); }
    if (!tendReady() || S.tendInit !== S.id) loadTending().then(function () { if (S.id && app() && S.paintedFor !== S.id + ':' + S.view) { S.paintedFor = S.id + ':' + S.view; refreshPane(); } });
  }
  function tabHtml(tab) { return tab === 'week' ? weekHtml() : tab === 'grow' ? growHtml() : tab === 'library' ? libraryHtml() : tab === 'checkin' ? checkinTabHtml() : tab === 'learn' ? learnTabHtml() : todayHtml(); }
  function afterTab(tab) {
    if (tab === 'checkin') { paintRings(app()); return; }
    if (tab === 'learn') { fillLearn(); return; }
    if (tab === 'today') { paintRings(app()); mileGlow(app()); fillAlso(); fillWords(); fillMantra(); }
    else if (tab === 'grow') { fillWords(); fillMantra(); paintRings(app()); mileGlow(app()); fillFruit(); }
    else if (tab === 'library') fillLibrary();
    else if (tab === 'week') { var wb = document.querySelector('#hm-pane #hm-tend[data-sec="week"]'); if (wb) paintSection(wb, 'week'); var mb = document.querySelector('#hm-pane #hm-tend[data-sec="month"]'); if (mb) paintSection(mb, 'month'); }
  }
  /* Redraw just the page under the header (after Tending loads, or after a change), keeping the sheet. */
  function refreshPane() {
    var r = route(), tab = r.tab === 'me' ? (S.under || 'today') : r.tab, pane = document.getElementById('hm-pane'); if (!pane) return;
    var sub = r.tab === 'me' ? '' : r.sub;
    var at = document.querySelector('.hm-at'); if (at) at.textContent = headingOf(tab);
    if (sub) { var box = document.getElementById('hm-tend'); if (box && !box.querySelector('#hj-root,#hj-bare')) paintSection(box, sub); }
    else { var fk = focusKey(); pane.innerHTML = tabHtml(tab); afterTab(tab); focusBack(fk); }
    var mb = document.getElementById('hm-sheet-body'); if (mb && S.sheet && !mb.querySelector('#hj-root,#hj-bare') && (S.sheet === 'numbers' || S.sheet === 'settings')) fillSheet(S.sheet);
  }

  /* A Tending section drawn into a box: GGHealth.render when it exists, otherwise the full Tending view at that section. */
  function paintSection(box, sec) {
    if (!box) return;
    // BLD 908: the Tending suite opens with Membership; Start sees one invitation.
    // The holiday sets are part of Grounded Recipes, open to everyone: on Start an old #library=holidays or #week=holidays opens them there.
    if (!member() && sec === 'holidays') {
      var rdy = window.GGMember && GGMember.ready && typeof GGMember.ready.then === 'function' ? GGMember.ready : Promise.resolve();
      rdy.then(function () { if (member() || !box.isConnected) return; var tb = route().tab; try { history.replaceState(null, '', location.pathname + '#' + tb); } catch (e) {} render(); openShelf('holidays'); });
      return;
    }
    if (!member() && TEND_MEMBER.test(sec)) { box.innerHTML = inviteHtml(sec === 'numbers' ? 'numbers' : 'tend'); return; }
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
    return '<div class="hm-card hm-p-leaves"><div class="hm-hd">' + pb(IMG + 'tend-body.webp') + '<div style="min-width:0"><div class="hm-k">Tending</div><h2 class="hm-h2">Tending Opens Here</h2></div></div>' +
      '<p class="hm-sub" style="margin-top:6px">Food for your goal, movement for every level, quiet, and your own numbers, kept on this device inside your locked profile. Tending is getting ready for The Grounded Way. Your tree, check-ins, and practices are all here today.</p></div>';
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
  /* Plain wording: the tree's own choice (kid.wording, student.wording) or a school's Plain lock (plainLock), BLD 907. */
  function plainWording(id, tree) {
    var h = obj(tendHost(id, tree)); if (h.wording === 'plain' || h.plainLock === true) return true;
    try { var all = window.GGP && GGP.data(id), rec = obj(all && all[tree]); return rec.plainLock === true || rec.wording === 'plain'; } catch (e) { return false; }
  }
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
    var tree = S.tree, list = planList(S.id, tree); if (!list.length) return tierPlan([], kid);
    var t = tendGet(S.id, tree), info = pracInfo(tree) || {}, plain = plainWording(S.id, tree);
    var items = list.map(function (it) {
      var pi = info[it.pid] || {}, line = plain && pi.pl ? pi.pl : pi.line || '', title = plain && pi.pn ? pi.pn : it.name, sl = slotOf(it.part, it.name, line), P = PART[it.part] || { n: '' };
      var sub = line || (it.kind === 'own' ? 'Your own practice, from your growth plan.' : it.kind === 'lib' ? 'From the practice library, in your growth plan.' : kid ? 'A practice for your ' + P.n + '. Check it off when you do it.' : 'A practice for your ' + P.n + ', from your growth plan.');
      // BLD 907: a saved own practice still filed under Trunk or Fruit shows with the part it now tends.
      var lp = isTend(it.part) ? it.part : 'bark';
      // BLD 885: its rhythm (the person's choice, then practice-rhythm.js, then daily), its steps and minutes, and when it was done.
      var rf = rhythmFull(it.pid, tree), r = rf.r, ri = rhythmInfo(tree, it.pid) || {};
      var steps = arr(ri.how).filter(function (z) { return typeof z === 'string' && z.trim(); });
      var dToday = practiceDone(t, it.pid), dw = r === 'w' || r === 'f' ? doneThisWeek(t, it.pid) : '', cnt = r === 'f' ? weekCount(t, it.pid) : 0, full = r === 'w' ? !!dw : r === 'f' ? cnt >= rf.x : dToday;
      return { key: 'p:' + it.pid, pid: it.pid, part: lp, mpart: it.part, src: 'plan', hour: sl[0], when: sl[1] + ' · ' + plabel(lp, plain), title: title, sub: sub, btn: 'How', tint: it.part, done: full, pressed: full || dToday, x: rf.x, cnt: cnt, image: practiceArt(it.part, it.name),
        r: r, steps: steps, howTxt: steps.length ? '' : (plain && pi.pl ? pi.pl : pi.today || line), min: num(ri.min) || pi.min || null, doneToday: dToday, doneWeek: dw, last: lastDone(t, it.pid), kid: !!kid };
    });
    // BLD 908: Start keeps one practice a day for each of the four; Membership opens the full plan.
    return tierPlan(items, kid);
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
      '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-go="' + esc(x.key) + '">' + I('play') + 'Play</button>' + doneBtn(x) + dtBtn(x) + '</div></div></div></article>';
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
      '<div class="hm-acts tight">' + howBtn(x) + doneBtn(x, opt.doneLabel) + (opt.plain ? '' : rchipHtml(x) + guideBtn(x)) + (opt.dt ? dtBtn(x) : '') + '</div>' + (opt.extra || '') + '</div></div>' + (opt.plain ? '' : rmenuHtml(x)) + howPanel(x) + '</article>';
  }
  function partName(x) { return PART[x.part] ? plabel(x.part) : ''; }
  function dayName(d) { var x = parse(d); return x ? DAYS[x.getDay()] : ''; }
  /* This Week: the weekly practices, open ones first, then the ones done this week. */
  function thisWeekHtml(plan, where) {
    var wk = plan.filter(function (x) { return x.r === 'w' || x.r === 'f'; }); if (!wk.length) return '';
    var open = wk.filter(function (x) { return !x.done; }), dn = wk.filter(function (x) { return x.done; });
    var head = '<div class="hm-grp hm-p-branches">' + pb(IMG + 'this-season.webp') + '<h2 class="hm-h2">' + (where === 'week' ? 'Practices This Week' : 'This Week') + '</h2><span class="sp"></span><span class="hm-time">' + dn.length + ' of ' + wk.length + ' done</span></div>';
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
    return '<div class="hm-tweek hm-p-fruit" id="hm-ready" role="region" aria-label="When You\'re Ready"><div class="hm-grp hm-p-fruit">' + pb(IMG + 'tend-fruit.webp') + '<h2 class="hm-h2">When You\'re Ready</h2><span class="sp"></span></div>' +
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
      if (ready && hasFn('today')) tendItems = startTend(hCall('today', today()));
    }
    if (Array.isArray(tendItems)) {
      tendItems.forEach(function (x) { if (!x || !x.key) return; items.push({ key: 't:' + x.key, hkey: x.key, hour: num(x.hour) != null ? +x.hour : 12, when: x.when || '', title: x.title || '', sub: x.sub || '', btn: x.btn || 'Open', tint: x.tint || '', done: !!x.done, kind: x.kind || '', image: x.image || '', src: 'tend', opart: x.kind === 'own' ? (x.part || '') : '' }); });
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
    // BLD 907: Do Tomorrow. A practice moved to tomorrow rests until then (home later, the same record as Another Time).
    var later = obj(h.later), td = today(), moved = [];
    items = items.filter(function (x) { var k = dtKey(x); if (k && !x.done && later[k] && later[k] > td) { moved.push(x); return false; } return true; });
    items.push(treeItem(h, d));
    items.forEach(function (x, i) { x.i = i; });
    items.sort(function (a, b) { return a.hour - b.hour || a.i - b.i; });
    return { items: items, plan: plan, extra: extra, moved: moved, ready: ready, loading: !tendReady() && !S.tendLoadDone };
  }
  var DONE_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.4 4.4L19 7.4"/></svg>';

  /* ---------- BLD 907: Do Tomorrow ----------
     Every practice in the day carries Do Tomorrow. It rests in the home record's later list ('part|Name' for a growth plan
     or spirit practice, the item's own key for anything else), shows again on Today tomorrow, and nothing is counted as
     missed. A short Tomorrow list under the day brings any of them back with Do Today. */
  function dtKey(x) { if (!x || !x.key || x.key === 'tree') return ''; return (x.src === 'plan' || x.src === 'spirit') && x.pid ? x.pid : x.key; }
  function dtBtn(x) {
    if (!dtKey(x) || x.done || (x.src === 'plan' && x.r && x.r !== 'd')) return '';
    return '<button type="button" class="hm-dtbtn" data-hm-dt="' + esc(x.key) + '" aria-label="Do Tomorrow: ' + esc(x.ftitle || x.title) + '">' + I('sunrise') + '<span aria-hidden="true">Do Tomorrow</span></button>';
  }
  function movedHtml(list, kid) {
    if (!list || !list.length) return '';
    return '<div class="hm-dtwait' + (kid ? ' kid' : '') + '" role="region" aria-labelledby="hm-dtw-h"><h3 class="hm-dtw-h" id="hm-dtw-h">' + I('sunrise') + 'Tomorrow</h3><p class="hm-sub">' + (kid ? 'These wait for tomorrow.' : 'Saved for tomorrow. Each one shows on Today tomorrow.') + '</p><ul>' +
      list.map(function (x) { var t = x.ftitle || x.title; return '<li><span>' + esc(t) + '</span><button type="button" class="hm-linkbtn" data-hm-dtback="' + esc(dtKey(x)) + '" aria-label="Do Today: ' + esc(t) + '">Do Today</button></li>'; }).join('') + '</ul></div>';
  }
  function pruneLater(h) { var td = today(); Object.keys(obj(h.later)).forEach(function (k) { if (!(h.later[k] > td)) delete h.later[k]; }); }
  function announce(m) {
    var el = document.getElementById('hm-live');
    if (!el) { el = document.createElement('div'); el.id = 'hm-live'; el.className = 'hm-sr'; el.setAttribute('aria-live', 'polite'); el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.textContent = ''; setTimeout(function () { el.textContent = m; }, 30);
  }
  function doTomorrow(key, btn) {
    if (!S.id) return;
    var kid = isKid(S.p), x = kid ? planItems(true).filter(function (y) { return y.key === key; })[0] : findItem(key);
    if (!x && !kid) x = (todayItems().plan || []).filter(function (y) { return y.key === key; })[0];
    var k = dtKey(x); if (!k) return;
    var h = GGP.data(S.id, 'home'); if (!h) return;
    h.later = obj(h.later); pruneLater(h); h.later[k] = addDays(today(), 1);
    // Focus moves to the next Do Tomorrow in the day (or the one before it), else to Do Today for this one.
    var all = [].slice.call(document.querySelectorAll('[data-hm-dt]')), at = all.indexOf(btn), nx = all[at + 1] || all[at - 1], nk = nx ? nx.getAttribute('data-hm-dt') : '';
    saveHome();
    var t = x.ftitle || x.title;
    toast(kid ? 'See you tomorrow, ' + t + '!' : t + ' moves to tomorrow.');
    announce(t + ' moves to tomorrow. It shows on Today tomorrow.');
    if (kid) render(); else refreshPane();
    var f = nk ? document.querySelector('[data-hm-dt="' + cssq(nk) + '"]') : document.querySelector('[data-hm-dtback="' + cssq(k) + '"]');
    if (f) { try { f.focus({ preventScroll: true }); } catch (e) {} }
  }
  function doToday(k) {
    var h = S.id && GGP.data(S.id, 'home'); if (!h || !h.later) return;
    delete h.later[k]; saveHome();
    announce('Back on Today.');
    if (isKid(S.p)) render(); else refreshPane();
    var c = document.querySelector('[data-hm-dt="p:' + cssq(k) + '"],[data-hm-dt="s:' + cssq(k) + '"],[data-hm-dt="' + cssq(k) + '"]');
    if (!c) { var sk = 's:' + k; c = document.querySelector('[data-hm-dt="' + cssq(sk) + '"]'); }
    if (c) { try { c.focus({ preventScroll: false }); } catch (e) {} }
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-hm-dt],[data-hm-dtback]'); if (!t || !t.closest('.hm')) return;
    if (t.hasAttribute('data-hm-dt')) doTomorrow(t.getAttribute('data-hm-dt'), t); else doToday(t.getAttribute('data-hm-dtback'));
  });

  /* ---------- BLD 907: Your Four on Today ----------
     The four parts a person tends, each with its paired label and today's practices for it; an area with nothing yet reads
     forward ("Your Leaves are ready for tending.") with a way in. Trunk: Meaning and Fruit: Hope show as Grows from your
     tending, with their latest check-in level, never with practices. */
  function partOfItem(x) {
    if (!x) return '';
    if (x.part && PART[x.part]) return isTend(x.part) ? x.part : 'bark';
    if (x.key === 'quiet') return 'bark'; if (x.key === 'pray') return 'roots'; if (x.key === 'talk') return 'branches';
    if (x.opart && isTend(x.opart)) return x.opart;
    var k = String(x.kind || '') + ' ' + String(x.hkey || '');
    if (/med|quiet|mind|breath/i.test(k)) return 'bark';
    if (/people|connect|talk|family/i.test(k)) return 'branches';
    if (/pray|spirit|sacred/i.test(k)) return 'roots';
    return x.src === 'tend' || x.src === 'old' ? 'leaves' : '';
  }
  function readyLine(k, kid) { return 'Your ' + PART[k].n + (k === 'bark' ? ' is' : ' are') + ' ready for tending.'; }
  function fourHtml(T) {
    var ck = lastCheckin(S.id, S.tree), lv = ck ? levelsOf(ck) : {}, day = T.items.filter(function (x) { return x.key !== 'tree'; });
    var rows = TEND4.map(function (k) {
      var L = day.filter(function (x) { return partOfItem(x) === k; }), W = arr(T.plan).filter(function (x) { return x.part === k && x.r !== 'd'; }), M = arr(T.moved).filter(function (x) { return partOfItem(x) === k; }), lb = plabel(k);
      if (!L.length && !W.length && !M.length) return '<li class="hm-four-r ready" style="--c:var(--' + k + ');--cs:var(--' + k + '-s)"><span class="dot" aria-hidden="true"></span><div class="tx"><b>' + esc(lb) + '</b><small>' + esc(readyLine(k)) + '</small></div><button type="button" class="hm-pill hm-four-go" data-hm-setup="' + k + '" aria-label="Choose a practice for ' + esc(lb) + '">Choose</button></li>';
      var dn = L.filter(function (x) { return x.done; }).length, names = L.map(function (x) { return x.ftitle || x.title; }).slice(0, 3);
      var line = L.length ? dn + ' of ' + L.length + ' today: ' + names.join(', ') + (L.length > 3 ? ', and more' : '') : W.length ? 'This week: ' + W.map(function (x) { return x.title; }).slice(0, 2).join(', ') : 'Tomorrow: ' + M.map(function (x) { return x.ftitle || x.title; }).slice(0, 2).join(', ');
      return '<li class="hm-four-r' + (L.length && dn === L.length ? ' done' : '') + '" style="--c:var(--' + k + ');--cs:var(--' + k + '-s)"><span class="dot" aria-hidden="true">' + (L.length && dn === L.length ? I('check') : '') + '</span><div class="tx"><b>' + esc(lb) + '</b><small>' + esc(line) + '</small></div></li>';
    }).join('');
    var grow = GROW2.map(function (k) {
      var l = ck ? lv[k] : '', lb = plabel(k);
      return '<li class="hm-four-r grow" style="--c:var(--' + k + ');--cs:var(--' + k + '-s)"><span class="dot" aria-hidden="true"></span><div class="tx"><b>' + esc(lb) + '</b><small>Grows from your tending</small></div><span class="hm-four-lv' + (l ? ' lv-' + l : '') + '">' + esc(l ? LV[l][0] : 'After your first check-in') + '</span></li>';
    }).join('');
    return '<article class="hm-card hm-p-leaves hm-four o2" id="hm-four" aria-labelledby="hm-four-h"><div class="hm-hd">' + pb(treeArt(S.tree)) + '<div><div class="hm-k" id="hm-four-h">Your Four</div><div class="hm-sub">' + esc(promise()) + '</div></div></div>' +
      '<ul class="hm-four-l" aria-label="The four parts you tend">' + rows + '</ul><h3 class="hm-four-k">Tend four, grow two</h3><ul class="hm-four-l" aria-label="The two parts that grow from your tending">' + grow + '</ul></article>';
  }
  /* BLD 882: each thing in the day wears the pre-881 Home's card: a painting, the time in Barlow Condensed, the name in
     Cormorant, a bold action, and the animated Done check. */
  function doneBtn(x, label) {
    return '<button class="hm-ck" type="button" aria-pressed="' + !!(x.pressed != null ? x.pressed : x.done) + '" data-hm-done="' + esc(x.key) + '" aria-label="' + esc(x.title) + (x.done ? ', done. Tap to undo' : ', mark done') + '">' + CKSVG + '<span class="lb" aria-hidden="true">' + esc(label || 'Done') + '</span></button>';
  }
  var GO_ICON = { How: 'book', Begin: 'play', Start: 'play', 'Check In': 'check', Another: 'swap', Open: 'arrow', Log: 'plus', 'Grounded Cooking': 'play', Done: 'check' };
  function itemHtml(x) {
    if (x.src === 'plan') return pracCardHtml(x, { dt: 1 });
    if (x.src === 'spirit') return pracCardHtml(x, { plain: true, dt: 1 });
    if (x.pairs) return fillCardHtml(x);
    return '<article class="hm-titem hm-card edge lift ' + tintClass(x.tint, x.kind) + (x.done ? ' done' : '') + (x.src === 'plan' ? ' hm-prac' : '') + '">' +
      '<div class="hm-pc"><div class="scene">' + '<img src="' + esc(x.image || artFor(x)) + '" alt="" loading="lazy" decoding="async"></div><div class="bd tx">' +
      '<span class="hm-time ey">' + esc(x.when) + '</span><b class="hm-h3">' + esc(x.title) + '</b>' + (x.sub ? '<small class="hm-meta">' + esc(x.sub) + '</small>' : '') +
      '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-go="' + esc(x.key) + '">' + I(GO_ICON[x.btn] || 'arrow') + esc(x.btn) + '</button>' + doneBtn(x) + dtBtn(x) + '</div></div></div></article>';
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
        '<div class="hm-acts tight"><button type="button" class="hm-btn sm" data-hm-go="pray">' + I('play') + 'Begin</button><a class="hm-btn sm line" href="/readings.html">' + I('feather') + 'Readings</a>' + doneBtn(x) + dtBtn(x) + '</div></div></div></article>');
      if (x.key === 'talk') out.push('<article class="hm-card edge hm-p-branches hm-side hm-tqcard' + (x.done ? ' done' : '') + '"><img class="bg" src="' + IMG + 'tend-people.webp" alt="" aria-hidden="true" loading="lazy"><div class="hm-hd" style="margin-bottom:4px">' + pb(IMG + 'dinner-chili-sq.webp') + '<div><div class="hm-k">Tonight\'s Question</div><div class="hm-sub">For dinner together, phones away</div></div></div><p class="hm-tq">' + esc(pick(QUESTIONS, dayIndex() + (+d.q || 0))) + '</p>' +
        '<div class="hm-acts tight"><button class="hm-btn sm line" type="button" data-hm-go="talk">' + I('swap') + 'Another Question</button>' + doneBtn(x, 'We Talked') + dtBtn(x) + '</div></article>');
    });
    out.push(progressHtml(h, lastCheckin(S.id, S.tree), tendOf(S.id, S.tree)));
    return out.join('');
  }
  /* BLD 894 (Chris could not find My Plate): Today's Plate near the top of Today, for people who chose food in Tending.
     Three rings from Tending's own numbers (GGHealth.summary plate and targets) and one button to log. */
  function plateCardHtml() {
    var sm = summary(); if (!sm || arr(sm.use).indexOf('food') < 0) return '';
    var pl = obj(sm.plate), tg = obj(sm.targets), n = +pl.logged || 0, sz = innerWidth < 700 ? 66 : 78;
    var R = [['pro', 'Protein', 'of ', 'var(--tn-m)'], ['fib', 'Fiber', 'of ', 'var(--tn-p)'], ['sf', 'Saturated Fat', 'under ', 'var(--tn-k)']];
    var rings = R.map(function (r) {
      var v = Math.round(+pl[r[0]] || 0), t = Math.round(+tg[r[0]] || 0); if (!t) return '';
      return '<div class="hm-prg" data-hm-pk="' + r[0] + '">' + ring(sz, 7, Math.min(v, t), t, '<b>' + v + '</b><small>' + r[2] + t + ' g</small>', r[3]) + '<span>' + r[1] + '</span></div>';
    }).join('');
    var line = n ? n + (n === 1 ? ' food' : ' foods') + ' logged today. Tap again as you eat.' : 'Tap what you eat, and the rings fill.';
    return '<article class="hm-card edge hm-p-leaves hm-plate" id="hm-plate"><picture class="hm-sh-band" aria-hidden="true"><img src="' + IMG + 'todays-plate.webp" alt="" loading="lazy" decoding="async"></picture><div class="hm-hd">' + pb(IMG + 'todays-plate-sq.webp') + '<div style="min-width:0"><div class="hm-k">Today\'s Plate</div><div class="hm-sub">' + esc(line) + '</div></div></div>' +
      (rings ? '<div class="hm-prings">' + rings + '</div>' : '') +
      '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-tab="today=log">' + I('plus') + 'Log a Plate</button><button type="button" class="hm-linkbtn" data-hm-tab="today=log">Add a Note</button></div></article>';
  }
  function todayHtml() {
    var T = todayItems(), h = homeRec(), items = T.items, done = items.filter(function (x) { return x.done; }).length + T.extra, n = items.length + T.extra, ed = edgesOf(lastCheckin(S.id, S.tree));
    // BLD 885: This Week and the When You're Ready card: beside the day on a wide screen, right after Right Now on a phone.
    var wkb = thisWeekHtml(T.plan, 'today') + nudgeHtml(T.plan), wide = wideToday();
    var lead = '';
    if (T.loading) lead = '<p class="hm-loading">Opening your Tending…</p>';
    else if (!T.ready && !h.hidden.tend) {
      lead = '<article class="hm-startc hm-card edge lift hm-p-leaves"><div class="hm-pc"><div class="scene"><img src="' + ART2.start + '" alt="" loading="lazy"></div><div style="min-width:0"><div class="hm-k">Tending</div><h3 class="hm-h3">' + (tendStarted() ? 'Your Tending Plan' : 'Begin Your Tending') + '</h3><p class="hm-sub" style="margin-top:4px">' + (tendStarted() ? 'Finish a short start-up check and your meals, movement, and quiet fill your day.' : 'A short start-up check shapes it to you: your goals, the people at your table, and movement for your level.') + '</p>' +
        '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-tab="today=tending">' + I('sprout') + (tendStarted() ? 'Continue' : 'Start Tending') + '</button><button type="button" class="hm-linkbtn" data-hm="hidetend">Hide this card</button></div></div></div></article>';
    }
    lead = wayNoteHtml() + lead;
    var list = items.filter(function (x) { return !x.side; });
    var head = '<div class="hm-grp hm-p-leaves">' + pb(IMG + 'tending-sq.webp') + '<h2 class="hm-h2">Today\'s Tending</h2><span class="sp"></span><span class="hm-time">' + esc(done + ' of ' + n + ' tended') + '</span></div>';
    /* BLD 896 (Chris, note E: "not sure why we have the random green +"): the Plate card's + Log a Plate button is the one way in.
       With no Plate card, a labeled Log a Note button stands in its place, never a bare plus. */
    var plate = T.ready ? plateCardHtml() : '';
    var fab = T.ready && !plate ? '<button type="button" class="hm-fab lab" data-hm-tab="today=log">' + I('plus') + '<span>Log a Note</span></button>' : '';
    return todayHero(done, n) + '<div class="hm-tgrid"><div class="hm-col hm-tmain">' + nowHtml(items) + plate + (wide ? '' : wkb) + head + lead + '<div class="hm-list" id="hm-today">' + list.map(itemHtml).join('') + '</div>' + movedHtml(T.moved) + (T.ready ? ownLinkHtml() : '') + '</div>' +
      '<div class="hm-col hm-tside">' + fourHtml(T) + (wide ? wkb : '') + sideHtml(items, ed) + dailyMedHtml() + '</div></div>' + fab;
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
    if (x.src === 'tend' && x.kind === 'own') { itemDone(key); return; }   // BLD 896: My Own Items check off (and credit their part)
    if (x.src === 'tend') { if (hasFn('act')) hCall('act', x.hkey); return; }
    if (x.src === 'old') { goTo('today=' + (x.old === 'plate' ? 'log' : 'tending')); if (x.old === 'move') { S.quiet = true; try { window.GGHealth.open('move'); } catch (e) {} S.quiet = false; } return; }
    if (x.src === 'plan') { openHowFromNow(key); return; }
    if (key === 'tree') { openTreeSheet(t.ck ? 'quick' : ''); return; }
    if (key === 'quiet') { playVideo('gg-paced-now'); return; }
    if (key === 'pray') { openGGN(); return; }
    if (key === 'talk') { var r = todayRec(homeRec()); r.q = (+r.q || 0) + 1; saveHome(); refreshPane(); }
  }
  function itemDone(key, btn) {
    var x = /^p:/.test(key) ? { src: 'plan', pid: key.slice(2), done: btn ? btn.getAttribute('aria-pressed') === 'true' : false } : findItem(key); if (!x) return;
    var on = !x.done;
    if (x.src === 'plan') { if (!togglePractice(x.pid, on)) return; }
    else if (x.src === 'tend' && x.pairs) fillDone(x, on);
    else if (x.src === 'tend') { tendMark(x, on); if (x.opart && PART[x.opart] && !isKid(S.p)) togglePractice(x.opart + '|' + x.title, on); }   // BLD 896: an own item credits the tree part it tends
    else if (x.src === 'old') { itemGo(key); return; }
    else if (x.src === 'spirit') spiritMark(x.pid, on);
    else { var hk = homeRec(), rec = todayRec(hk); rec[key] = on ? 1 : 0; pruneDays(hk); saveHome();
      // BLD 893: a Sacred Pause chosen in My Grounded Way Plan grows Roots too.
      if (key === 'pray' && planOK() && obj(wayRec().spirit).pause && waySaved()) spiritMark(spiritPid('pause', S.tree), on); }
    if (btn) { btn.setAttribute('aria-pressed', String(on)); var card = btn.closest('.hm-item,.hm-card,.hm-kp'); if (card) { card.classList.toggle('done', on); card.querySelectorAll('[data-hm-done],[data-hm-hdone]').forEach(function (b2) { if (b2 !== btn) b2.setAttribute('aria-pressed', String(on)); }); } }
    if (on && btn && !matchMedia('(prefers-reduced-motion: reduce)').matches) { var burst = document.createElement('span'); burst.className = 'hm-burst'; for (var j = 0; j < 8; j++) { var a = j / 8 * Math.PI * 2, dd = 22 + (j % 2) * 8, dot = document.createElement('i'); dot.style.setProperty('--x', Math.cos(a) * dd + 'px'); dot.style.setProperty('--y', Math.sin(a) * dd + 'px'); burst.appendChild(dot); } btn.appendChild(burst); setTimeout(function () { burst.remove(); }, 800); }
    setTimeout(function () { if (isKid(S.p)) render(); else refreshPane(); }, on ? 650 : 0);
  }

  /* ---------- Week: Shop, Sunday Together Prep, then the seven days ---------- */
  function bigCard(cls, tab, art, icon, ey, title, line, go) {
    return '<button type="button" class="hm-wbig ' + cls + '" data-hm-tab="' + tab + '"><span class="pic" aria-hidden="true"><img src="' + esc(art) + '" alt="" loading="lazy" decoding="async"><span class="ic">' + I(icon) + '</span></span>' +
      '<span class="tx"><span class="ey">' + esc(ey) + '</span><b>' + esc(title) + '</b><small>' + esc(line) + '</small></span><span class="go">' + esc(go) + I('arrow') + '</span></button>';
  }
  function weekData() { if (!tendReady() || !tendIsReady() || !hasFn('week')) return null; var w = hCall('week'); return w && Array.isArray(w.days) ? w : null; }
  /* BLD 885: the weekly practices lead the Week tab, beside the shopping list on a wide screen. */
  /* BLD 896: Week or Month (Chris: "we could have a monthly calendar avail"); the Month is Tending's own, drawn into the Week tab. */
  function weekHtml() { if (!member()) return startWeekHtml(); var on = tendReady() && tendIsReady() && hasFn('render'); return (on ? wkTogHtml() : '') + (on && S.wkv === 'month' ? '<div id="hm-tend" class="hm-sec hm-month" data-sec="month"><p class="hm-loading">Opening your month…</p></div>' : weekHtml0()); }
  function weekHtml0() {
    var wp = S.id ? thisWeekHtml(planItems(false), 'week') : '', body = weekBody(planDoorWeek());
    if (!wp) return body;
    if (body.indexOf('<div class="hm-wgrid"><div class="hm-col hm-wside">') >= 0) return body.replace('<div class="hm-col hm-wside">', '<div class="hm-col hm-wside">' + wp);
    return '<div class="hm-wpracs">' + wp + '</div>' + body;
  }
  function weekBody(door) {
    door = door || '';
    if (!tendReady()) return door + (S.tendLoadDone ? tendSoonHtml() : '<p class="hm-loading">Opening your week…</p>');
    if (!tendIsReady()) return door + '<article class="hm-start">' + tile(ART2.startWide, 'wide') + '<div class="tx"><span class="ey">Tending</span><b>Start Tending</b><small>Your week fills in here: dinners to cook, workouts for your level, one shopping list, and Sunday Together Prep.</small></div><div class="hm-acts tight"><button type="button" class="hm-pill hm-tn-p" data-hm-tab="today=tending">Start</button></div></article>';
    var w = weekData();
    if (!w) return door + '<div id="hm-tend" class="hm-sec" data-sec="week"></div>';
    var hh = tableOf(), td = today();
    /* BLD 894 (Chris: "Didn't even realize Shopping was a button"): two large cards lead the Week, the Shopping List and
       Sunday Together Prep, side by side on a wide screen and stacked on a phone. Each opens the same section as before. */
    var cnt = num(w.shopCount), left = num(w.shopLeft);
    var shopLine = (w.shopWeek ? 'Week ' + w.shopWeek : weekLabel(w.label)) + (cnt ? ' · ' + cnt + (cnt === 1 ? ' item' : ' items') + (left != null && left < cnt ? (left ? ', ' + left + ' to go' : ', all in the cart') : '') : '') + (hh ? ' · sized for ' + hh : '');
    var shop = w.shopKey === null ? '' : bigCard('hm-wshop hm-tn-g', 'week=shop', w.shopImage || ART2.shop, 'cart', w.shopLabel || 'Shop for ' + weekLabel(w.label), 'Shopping List', shopLine, 'Open the List');
    var prepC = w.prepKey ? bigCard('hm-wprep hm-tn-k', 'week=prep', w.prepImage || ART2.prep, 'people', 'Sunday', w.prepLabel || 'Sunday Together Prep', w.prepSub || 'Cook and Helper, side by side: the week\'s head start in one afternoon.', 'Open Prep') : '';
    var find = shop || prepC ? '<div class="hm-wfind' + (shop && prepC ? '' : ' one') + '">' + shop + prepC + '</div>' : '';
    var prep = '';
    /* BLD 889: the Weekly Batch every Sunday, right after Sunday Together Prep (it was Monthly Bulk Together). */
    if (w.bulkKey) prep += '<article class="hm-wcard hm-tn-k">' + tile(w.bulkImage || ART2.batch) + '<div class="tx"><span class="ey">Sunday, after prep</span><b>' + esc(w.bulkLabel || 'Weekly Batch') + '</b><small>' + esc(w.bulkSub || 'Burritos and one more for the week, Cook and Helper, side by side.') + '</small></div><button type="button" class="hm-pill" data-hm-wk="' + esc(w.bulkKey) + '">Open</button></article>';
    /* BLD 896: Holiday Sets. A ticked holiday about three weeks out ("Thanksgiving is in 3 weeks. Set it up?") and each set up one until its day. */
    arr(w.hol).forEach(function (c) { prep = '<article class="hm-wcard hm-tn-k hm-whc">' + tile(IMG + 'todays-plate-sq.webp') + '<div class="tx"><span class="ey">' + esc(c.kick) + '</span><b>' + esc(c.line) + '</b><small>' + (c.planned ? 'For ' + esc(c.guests) + '. Shopping, prep, and every recipe, step by step.' : 'The shopping on your list, the prep on your calendar, and a calm voice for every recipe.') + '</small></div><button type="button" class="hm-pill" data-hm-wk="' + esc(c.key) + '">' + esc(c.btn) + '</button></article>' + prep; });
    if (w.starts) find = '<p class="hm-sub" style="margin:0 4px 12px">Your plan begins ' + esc(niceDay(w.starts)) + '. Here is a look at the week ahead.</p>' + find;
    var mark = function (x) { return x.done ? ' <span class="hm-wdone">' + I('check') + '<span class="sr">done</span></span>' : ''; };
    var rows = w.days.map(function (d, di) {
      var isT = d.today === true || String(d.date || '').slice(0, 10) === td, din = obj(d.dinner), mv = obj(d.move);
      return '<div class="hm-wday' + (isT ? ' today' : '') + '"' + (isT ? ' aria-current="date"' : '') + '><span class="dn">' + esc(String(d.day || '').slice(0, 3)) + '<small>' + esc(shortDate(d.date)) + '</small></span>' + tile(din.title ? (din.night || FOOD_ROT[di % FOOD_ROT.length]) : mv.title ? (mv.image || ART2.move) : obj(d.med).title ? (obj(d.med).image || ART2.med) : ART2.rest, 'sm') + '<div class="tx">' +
        (din.title ? '<button type="button" class="hm-wdin" data-hm-wk="' + esc(din.key || '') + '"' + (din.key ? '' : ' disabled') + ' aria-label="' + esc((d.dayName || d.day || '') + ' dinner: ' + din.title + (din.key ? ', open to cook' : '')) + '">' + esc(din.title) + mark(din) + '</button>' : '') +
        (mv.title ? '<button type="button" class="hm-wmove" data-hm-wk="' + esc(mv.key || '') + '"' + (mv.key ? '' : ' disabled') + ' aria-label="' + esc((d.dayName || d.day || '') + ': ' + mv.title + (mv.key ? ', start it' : '')) + '">' + esc(mv.title) + mark(mv) + '</button>' : '') +
        weekExtra(d) +
        (!din.title && !mv.title && !obj(d.med).title && !arr(d.own).length && !arr(d.menu).length ? '<span class="hm-wnone">A day to rest</span>' : '') +
        '</div></div>';
    }).join('');
    /* BLD 892: the program week ("Week 6 of 12 · Build") and, once, What's New in Your Plan. */
    var nw = hasFn('news') ? hCall('news') : null;
    var news = nw ? '<article class="hm-card hm-p-leaves hm-new"><div class="hm-hd">' + pb(IMG + 'growth-plan-sq.webp') + '<div style="min-width:0"><div class="hm-k">' + esc(nw.title) + '</div></div></div>' + (nw.label ? '<p class="hm-sub">You are in ' + esc(nw.label) + '.</p>' : '') + '<ul class="hm-newl">' + arr(nw.lines).map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul><div class="hm-acts tight"><button type="button" class="hm-pill" data-hm-new="1">Got It</button></div></article>' : '';
    return find + door + '<div class="hm-wgrid"><div class="hm-col hm-wside">' + prep + '</div><div class="hm-col hm-wmain">' + news + '<h2 class="hm-label">This Week</h2>' + (w.prog ? '<p class="hm-sub hm-wprog">' + esc(w.prog) + '</p>' : '') + ownWeekHtml(w) + '<div class="hm-wlist">' + rows + '</div></div></div>';
  }

  /* ---------- Grow: the tree (tend four, grow two), this season, the Growth Plan, history ---------- */
  function treeHash(t, what) {
    if (what === 'checkin') return t.href + (t.ck ? '#checkin' : '');
    if (what === 'quick') return t.href + (t.ck ? '#quick' : '');
    if (what === 'plan') return t.href + '#plan';
    if (what === 'guide') return t.href + (S.tree === 'aspen' ? '#grown' : '#guide');
    if (ROOM_HASH[what]) return t.href + ROOM_HASH[what];
    if (what === 'history') return t.href + (S.tree === 'birch' || S.tree === 'pine' ? '#progress' : '#season');
    return t.href;
  }
  function treePic() { return '<picture class="hm-gpic" aria-hidden="true"><source media="(max-width:699px)" srcset="' + treeArt(S.tree) + '"><img src="' + treeArt(S.tree, true) + '" alt="" loading="lazy"></picture>'; }
  /* BLD 882: the pre-881 Home's tree card (the drawn tree with each part's level), restored on Grow. */
  function checkHref(t) { return t.href + (t.ck ? '#checkin' : ''); }
  function treeCardHtml(ck, ed, t) {
    if (!ck) {
      return '<article class="hm-card hm-p-leaves o2" id="hm-tree"><div class="hm-hd">' + pb(treeArt(S.tree)) + '<div><div class="hm-k">Your Tree</div><div class="hm-sub">Your first check-in plants your tree here.</div></div></div>' +
        treePic() + '<div class="hm-plant"><p class="hm-sub" style="max-width:40ch">Tend four, grow two. You tend ' + TEND4.map(function (k) { return esc(plabel(k)); }).join(', ') + ', and ' + GROW2.map(function (k) { return esc(plabel(k)); }).join(' and ') + ' grow from your tending. A check-in shows how each part is growing: Strong, Steady, or a Growing Edge.</p></div>' +
        '<div class="hm-acts"><button type="button" class="hm-btn hm-p-leaves" data-hm-tree="checkin">' + I('check') + 'Begin My First Check-in</button></div></article>';
    }
    var lv = ed.lv, cnt = { strong: 0, steady: 0 }; PARTS.forEach(function (p) { if (cnt[lv[p.k]] != null) cnt[lv[p.k]]++; });
    var sum = (cnt.strong ? '<span class="hm-lvl s">' + cnt.strong + ' Strong</span>' : '') + (cnt.steady ? '<span class="hm-lvl st">' + cnt.steady + ' Steady</span>' : '') +
      (ed.edges.length ? '<span class="hm-lvl g hm-p-' + ed.edges[0] + '">Growing Edge: ' + ed.edges.map(function (k) { return esc(plabel(k)); }).join(', ') + '</span>' : '');
    var e4 = ed.edges.filter(isTend), e2 = ed.edges.filter(function (k) { return !isTend(k); });
    var line = e4.length ? plabel(e4[0]) + ', ' + pmeaning(e4[0]) + ', is your Growing Edge this week. For You Today leans toward it.'
      : e2.length ? plabel(e2[0]) + ' is a Growing Edge this week. It grows as you tend all four parts.' : 'Every part is Steady or Strong. Keep tending what is working.';
    if (e4.length && e2.length) line += ' ' + e2.map(function (k) { return plabel(k); }).join(' and ') + ' grow' + (e2.length === 1 ? 's' : '') + ' from that tending.';
    return '<article class="hm-card hm-p-leaves o2" id="hm-tree"><div class="hm-hd">' + pb(treeArt(S.tree)) + '<div><div class="hm-k">Your Tree</div><div class="hm-last">' + I('check') + 'Last check-in ' + esc(niceDay(ck.date)) + '</div></div></div>' +
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
    return '<article class="hm-card hm-p-fruit o6" id="hm-progress"><div class="hm-hd">' + pb(IMG + 'progress-sq.webp') + '<div><div class="hm-k">Your Progress</div><div class="hm-sub">What you have grown, counted with joy</div></div></div><div class="hm-mile">' + rows.join('') + '</div>' + ldl + '</article>';
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
    return '<div class="hm-card hm-p-leaves hm-offer o7">' + pb(IMG + 'tend-body.webp') + '<div style="flex:1;min-width:0"><div class="hm-k">Whenever You Like</div><div class="hm-sub">Tending adds a few daily practices for body, mind, spirit, and the people you love.</div>' +
      '<div class="hm-quiet" style="margin-top:8px"><button type="button" data-hm="addtend">Add Tending</button><span>·</span><button type="button" data-hm="hidetend">Hide this card</button></div></div></div>';
  }

  function partsBars(ck, ed) {
    return '<div class="hm-parts">' + PARTS.map(function (p) {
      var l = ck ? ed.lv[p.k] : 'unsure', sc = ck ? num(ck.scores[p.k]) : null, w = sc == null ? 0 : Math.max(4, Math.min(100, sc * 10));
      var lb = plabel(p.k), g = isTend(p.k) ? '' : 'Grows from your tending';
      return '<div class="hm-part hm-p-' + p.k + ' lv-' + l + (g ? ' grows' : '') + '"><b>' + esc(lb) + '</b><span class="bar" role="img" aria-label="' + esc(lb) + ': ' + LV[l][0] + (sc != null ? ', ' + sc + ' of 10' : '') + (g ? '. ' + g : '') + '"><i style="width:' + w + '%"></i></span><small>' + esc(ck ? LV[l][0] + (g ? ' · ' + g : '') : (g || (function (m) { return m.charAt(0).toUpperCase() + m.slice(1); })(pmeaning(p.k)))) + '</small></div>';
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
    var season = '<article class="hm-card edge lift hm-p-branches hm-gcard"><div class="hm-pc"><div class="scene"><img src="' + IMG + 'this-season-narrow.webp" alt="" loading="lazy"></div><div style="min-width:0"><div class="hm-time">This Season</div><h3 class="hm-h3">' + (wk ? 'Season ' + (tend.season || 1) + ', Week ' + Math.min(12, wk) + ' of 12' : 'Your First Season') + '</h3><p class="hm-sub">' +
      (ck ? ck.count + ' check-in' + (ck.count === 1 ? '' : 's') + ' since ' + esc(niceDate(ck.first)) + '.' : 'Your season begins with your first full check-in.') + (rings ? ' ' + rings + (rings === 1 ? ' ring' : ' rings') + ' on your tree.' : '') + esc(trend) + '</p>' +
      (ck ? '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-tree="history">' + I('clock') + 'History</button></div>' : '') + '</div></div></article>';
    var pc = planList(S.id, S.tree).length;
    var plan = '<article class="hm-card edge lift hm-p-trunk hm-gcard"><div class="hm-pc"><div class="scene"><img src="' + ART2.plan + '" alt="" loading="lazy"></div><div style="min-width:0"><div class="hm-time">Growth Plan</div><h3 class="hm-h3">Your Growth Plan</h3><p class="hm-sub">' + (pc ? nWord(pc) + (pc === 1 ? ' practice' : ' practices') + ' in your plan, each in its place: daily ones on Today, weekly ones in This Week, and now and then ones here. Open it when you change one.' : ck ? 'Choose a few practices for each part. Each one joins Today.' : 'Your growth plan grows from your first check-in.') + '</p>' +
      '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-tree="plan">' + I('sprout') + 'Open</button></div></div></div></article>';
    var ready = readyHtml(planItems(false));
    var sober = sd ? soberHtml(sd) : (h.parts.indexOf('sober') >= 0 ? soberInviteHtml() : '');
    var fruit = tendReady() && tendIsReady() && hasFn('render') ? '<div id="hm-fruit" class="hm-sec"></div>' : '';
    void season; void ed;
    // BLD 911 (Chris: "it is confusing to have 2 plans.. cant we condense to one?"): one Growth Plan. My Growth Plan (the BLD 893
    // flow) holds the practices, body, mind, spirit, and table in one; the tree's own plan card shows only where that flow is not offered.
    return '<div class="hm-grow"><div class="hm-gcol hm-col">' + growToolsHtml() + familyHtml(h) + '</div><div class="hm-gcol hm-col">' + (planOK() ? planDoorGrow() : plan) + ready + memberGrowHtml() + sober + fruit + (h.hidden.tend || tendStarted() || !member() ? '' : offerHtml(h)) + '</div></div>';
  }
  function fillFruit() { var el = document.getElementById('hm-fruit'); if (!el || el.firstChild) return; try { window.GGHealth.render(el, 'fruit', { bare: true }); } catch (e) { el.remove(); } }

  /* ---------- Library: search and the shelves, with real counts ---------- */
  var LEARN_SRC = '/shared/learn-lessons.js?v=b908';
  var GUIDES = { oak: ['/oak/guides.js?v=b907', 'OAK_GUIDES'], birch: ['/birch/guides.js?v=b907', 'BIRCH_GUIDES'], sequoia: ['/sequoia/guides.js?v=b907', 'SEQUOIA_GUIDES'], pine: ['/pine/guides.js?v=b907', 'PINE_GUIDES'] };
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
      { id: 'learn', name: 'Learn', count: learn ? cnt(learn.length, 'lesson', 'lessons') : '', plain: 'Guided lessons', line: 'Short guided lessons for every part of your ' + t.n + '.', cls: 'hm-sh-learn', art: IMG + 'library-learn.webp' },
      { id: 'life', name: 'When Life Changes', count: lc ? cnt(lc.length, 'guide', 'guides') : '', plain: 'Guides for big moments', line: 'Help for the big moments: loss, moves, new babies, hard seasons.', cls: 'hm-sh-life', art: HERO + 'page-hard-seasons-narrow.webp' },
      // BLD 899 (Chris: "holiday gatherings [needs no] card in library just put this in the recipes"): Holidays and Gatherings lives inside Grounded Recipes.
      { id: 'recipes', name: 'Grounded Recipes', count: cnt(rc, 'recipe', 'recipes'), plain: 'Every meal', line: 'Every meal, party food, sauces and dressings, celebration drinks, and the holidays, sized for your table' + (tableOf() ? ' of ' + tableOf() : '') + ', guided step by step.', cls: 'hm-sh-rec', art: IMG + 'recipes-narrow.webp' },
      member() ? { id: 'workouts', name: 'Grounded Fitness', count: cnt(num(c.workouts), 'workout', 'workouts'), plain: 'Every Workout', line: 'Every workout, by category, with a coach, and the 12-week program.', cls: 'hm-sh-work', art: IMG + 'move-strength.webp' } : null,
      // BLD 911 (Chris: "we have 2 meditation sets too.. join or rename", then "1"): one Grounded Meditation: today's pick, your
      // week of seven (Tending's), and the full library by need (Membership), on one shelf.
      member() ? { id: 'quiet', name: 'Grounded Meditation', count: cnt((num(c.meditations) || 0) + mItems('meditation').length, 'meditation', 'meditations'), plain: 'Today, your week, and the library', line: 'Today\'s meditation, your week of seven, and the full library for sleep, worry, grief, focus, and more.', cls: 'hm-sh-quiet', art: IMG + 'quiet-meditation.webp' }
        : { id: 'quiet', name: 'Grounded Meditation', count: '', plain: 'Today\'s meditation', line: 'Today\'s meditation, Morning Quiet, and Get Grounded Now: calm in a minute or two.', cls: 'hm-sh-quiet', art: IMG + 'quiet-meditation.webp' }
    ].filter(Boolean);
  }
  // BLD 911 (Chris: "1"): a small Grounded over the short name on the Library shelves; the full name everywhere else (and in search).
  function shelfHtml(s) {
    return '<button type="button" class="hm-shelf ' + s.cls + '" data-hm-shelf="' + s.id + '"><img class="bg" src="' + s.art + '" alt="" loading="lazy" decoding="async"><span class="ct" data-hm-count="' + s.id + '">' + esc(s.count || s.plain) + '</span>' + (/^Grounded /.test(s.name) ? '<span class="nm"><small class="br">Grounded</small>' + esc(s.name.slice(9)) + '</span>' : '<span class="nm">' + esc(s.name) + '</span>') + '<span class="ln">' + esc(s.line) + '</span></button>';
  }
  function libraryHtml() {
    var more = [['/get-grounded-now.html', HERO + 'page-get-grounded-now-narrow.webp', 'Get Grounded Now', 'Calm in a minute or two'], ['/readings.html', HERO + 'page-readings-narrow.webp', 'Readings Library', 'Prayers, poems, and blessings'], ['/stories.html', IMG + 'tend-fruit.webp', 'Grounded Stories', member() ? 'Every story, read aloud' : 'Stories from the bedside and the road'], ['/library/', HERO + 'library-phone.webp', 'Book Library', 'Books and studies we draw from'],
      ['/grove/', treeArt('grove'), 'The Grove', 'Families and groups, growing together'], ['/willow/', treeArt('willow'), 'Willow', 'Hospice and the people who love them'], ['/heartwood/', treeArt('heartwood'), 'Heartwood', 'Couples, with The Grounded Marriage']];
    if (soberDate() || homeRec().parts.indexOf('sober') >= 0) more.unshift(['/living-sober.html', HERO + 'living-sober-card.webp', 'Living Sober', 'Today, Ride the Wave, milestones']);
    var h = homeRec(); if (h.season && TREES[h.season]) more.unshift([TREES[h.season].href, treeArt(h.season), TREES[h.season].n, TREES[h.season].who]);
    return '<label class="hm-search"><span>Search everything</span><input type="search" id="hm-q" placeholder="Grief, salmon, sleep, a Morning Quiet" autocomplete="off" enterkeyhint="search"></label>' +
      '<div class="hm-results" id="hm-results" aria-live="polite"></div>' +
      '<div class="hm-shelves" id="hm-shelves">' + shelves().map(shelfHtml).join('') + mShelfHtml() + '</div>' + (member() ? '' : inviteHtml('library')) +
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
    // BLD 911 (Chris: "forces you to old Oak page.. with 2 different back buttons"): lessons and guides live on the Learn tab.
    if (id === 'learn' || id === 'life') { LT.f = id === 'life' ? 'life' : 'learn'; if (isKid(S.p)) goTo('watch'); else goTo('learn'); }
    else if (id === 'recipes') openRecipe('');
    else if (id === 'holidays') { var hh = tableOf(); openFrame(new URL('/recipes/' + (hh ? '?serves=' + hh : '') + '#holidays', location.href)); }
    else if (/^m-/.test(id)) openMShelf(id.slice(2));
    else if (id === 'workouts') goTo('library=workouts');
    else if (id === 'quiet') { if (!member()) { openDailyMed(); return; } if (hasFn('render') && hasFn('counts') && num((hCall('counts') || {}).meditations)) goTo('library=quiet'); else openGGN(); }
  }
  SUBS.library.quiet = 'Grounded Meditation';
  OLDSEC.quiet = 'today';

  /* ---------- the profile sheet ---------- */
  var SHEET_ROWS = [
    ['numbers', 'flask', 'Numbers', 'Labs, LDL Path, My Heart Risk, PREVENT'],
    ['household', 'people', 'Household', 'The people at your table and your family'],
    ['settings', 'gear', 'Settings', 'Your Four, voice, music, Tending setup'],
    ['privacy', 'shield', 'Privacy', 'On this device, locked with your passcode'],
    ['howto', 'sprout', 'How It Works', 'A short painted tour of Today, Check-in, Grow, Learn, and Library'],
    ['switch', 'swap', 'Who Is Tending?', 'Open another person on this device, or add one']
  ];
  function openSheet(sub) {
    var old = document.getElementById('hm-sheet'), keep = old && S.sheet === (sub || '') ? old : null;
    if (keep) return;
    if (old) old.remove();
    S.sheet = sub || '';
    var wrap = document.createElement('div'); wrap.id = 'hm-sheet'; wrap.className = 'hm-sheetwrap';
    var head = sub ? '<div class="hm-sh-hd"><button type="button" class="hm-backbtn" data-hm-me="">' + I('back') + '<span>Back</span></button><h2 class="hm-h2" id="hm-sheet-t">' + esc(SUBS.me[sub]) + '</h2><button type="button" class="hm-x" data-hm="closeme" aria-label="Close">' + I('plus') + '</button></div>'
      : '<div class="hm-sh-hd"><span class="hm-me big" aria-hidden="true">' + esc(initials(S.p && S.p.name)) + '</span><h2 class="hm-h2" id="hm-sheet-t">' + esc(S.p && S.p.name || 'You') + '</h2><button type="button" class="hm-x" data-hm="closeme" aria-label="Close">' + I('plus') + '</button></div>';
    var band = '<picture class="hm-sh-band" aria-hidden="true"><source media="(max-width:699px)" srcset="' + IMG + 'profile-band-narrow.webp"><img src="' + IMG + 'profile-band-wide.webp" alt="" loading="lazy"></picture>';
    var mcard = ''; if (!sub && !isKid(S.p) && window.GGMember && typeof window.GGMember.card === 'function') { try { mcard = '<div class="hm-sh-member">' + (window.GGMember.card() || '') + '</div>'; } catch (e) { mcard = ''; } }
    var body = sub ? '<div class="hm-sheet-body" id="hm-sheet-body"></div>' : mcard +
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
        (fam || '<article class="hm-card hm-p-branches"><div class="hm-hd">' + pb(treeArt('grove')) + '<div><div class="hm-k">Your Family</div><div class="hm-sub">Add the people you tend with. Each one has a tree of their own.</div></div></div><div class="hm-acts"><button type="button" class="hm-btn hm-p-branches" data-hm="addkid">' + I('plus') + 'Add a Family Member</button><button type="button" class="hm-btn line hm-p-branches" data-hm="addlove">' + I('love') + 'Someone I Love</button></div></article>');
      return;
    }
    if (sub === 'settings') {
      var on = {}; h.parts.forEach(function (k) { on[k] = true; });
      // BLD 907: Your Four, as set up one area at a time, with Change My Setup; Labs and Numbers and Living Sober stay as switches.
      b.innerHTML = '<article class="hm-card hm-p-roots hm-sufour"><div class="hm-hd">' + pb(treeArt(S.tree)) + '<div style="min-width:0"><div class="hm-k">Choose What You Use</div><h3 class="hm-h3">Your Four</h3></div></div><p class="hm-sub" style="margin:6px 0 12px">' + esc(promise()) + ' Each part keeps at least one practice, by the Grounded Plan or your own.</p>' + suSummaryHtml() +
        '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-setup="roots">' + I('sprout') + 'Change My Setup</button></div>' +
        '<h4 class="hm-label">Also</h4>' + extrasHtml(on, 'data-hm-setpart') +
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
      if (ms === 'switch') { leaveSheet(); openWho(); return; }
      if (ms === 'howto') { howItWorks(); return; }
      if (!ms && S.sheetDepth > 1) { S.sheetDepth--; history.back(); return; }
      S.sheetDepth = (S.sheetDepth || 0) + 1; S.sheetPushed = 1; location.hash = ms ? '#me=' + ms : '#me'; return;
    }
    if (t.hasAttribute('data-hm-done')) { itemDone(t.getAttribute('data-hm-done'), t); return; }
    if (t.hasAttribute('data-hm-go')) { itemGo(t.getAttribute('data-hm-go')); return; }
    if (t.hasAttribute('data-hm-new')) { if (hasFn('newsSeen')) hCall('newsSeen'); refreshPane(); return; }
    if (t.hasAttribute('data-hm-wk')) { var wk = t.getAttribute('data-hm-wk'); if (wk && hasFn('act')) hCall('act', wk); return; }
    if (t.hasAttribute('data-hm-tree')) { var tw = t.getAttribute('data-hm-tree'); if (tw === 'history') { seasonOpen(); return; } if ((tw === 'checkin' || tw === 'quick') && openCheckin(tw === 'quick' ? 'quick' : 'full')) return; openTreeSheet(tw); return; }
    if (t.hasAttribute('data-hm-share')) { shareCard(t.getAttribute('data-hm-share')); return; }
    if (t.hasAttribute('data-hm-shelf')) { openShelf(t.getAttribute('data-hm-shelf')); return; }
    if (t.hasAttribute('data-hm-res')) {
      var rs = t.getAttribute('data-hm-res').split('|'), k = rs[0], id = rs.slice(1).join('|'), tt = TREES[S.tree] || TREES.oak;
      if (k === 'shelf') openShelf(id); else if (k === 'recipe') openRecipe(id); else if (k === 'guide') { void tt; playGuide(id); } else if (k === 'lesson') playTreeLesson(id);
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
    { k: 'today', art: 'home-morning', ey: 'Welcome to The Grounded Way', t: 'Today', d: 'Your whole day in order: a practice for each of your four, your meals, movement, and quiet, with Right Now at the top. Do Tomorrow moves any practice to tomorrow.', tr: 'Tap the circle on one practice when you do it, and watch your day fill.' },
    // BLD 911: five tabs (BLD 910), and Week opens from Today and Grow.
    { k: 'checkin', art: 'tend-mind', ey: 'Tab 2 of 5', t: 'Check-in', d: 'How each part of your tree is growing: Strong, Steady, or a Growing Edge. The questions come from your tree, made for your age.', tr: 'Take a Quick Check-in, about two minutes.' },
    { k: 'grow', art: 'growth', ey: 'Tab 3 of 5', t: 'Grow', d: 'Your Growth Plan, your week, your season, and your family: the practices you choose, body, mind, spirit, and your table, in one plan.', tr: 'Open your Growth Plan and choose one practice to begin with.' },
    { k: 'learn', art: 'learn', ey: 'Tab 4 of 5', t: 'Learn', d: 'Short lessons and guides for when life changes, chosen for your tree, each playing right here.', tr: 'Play one lesson, about three minutes.' },
    { k: 'library', art: 'library', ey: 'Tab 5 of 5', t: 'Library', d: 'Grounded Recipes with holidays and gatherings, workouts, quiet, stories, and every Grounded tool, all in one place.', tr: 'Search one word, like sleep or calm, and see what is waiting.', note: 'Your initials, top right, open Numbers, Household, Settings, Privacy, and this tour again.' }
  ];
  var KTOUR = [
    { k: 'today', art: 'home-morning', ey: 'Welcome to Your Tree', t: 'Today', d: 'Here is your day with your tree: a fun practice to try and your own checkmarks.', tr: 'Tap the circle when you do a practice. Your tree loves it!' },
    { k: 'tree', art: 'tend-fruit', ey: 'Check-in', t: 'Check-in', d: 'You tend four parts of your tree, and the trunk and fruit grow from your tending. A check-in shows how each part is doing.', tr: 'Check in with your grown-up and watch your tree light up!' },
    { k: 'watch', art: 'tend-mind', ey: 'Watch', t: 'Watch', d: 'Short videos to breathe, feel calm and strong, and learn about your tree.', tr: 'Try Birthday Candle Sigh: sniff, sniff, whoosh!' }
  ];
  var TOUR_ART = { learn: [HERO + 'learn/c133.webp', HERO + 'learn/c133.webp'], 'home-morning': [IMG + 'home-morning-wide.webp', IMG + 'home-morning-narrow.webp'], recipes: [IMG + 'recipes-wide.webp', IMG + 'recipes-narrow.webp'], 'tend-fruit': [IMG + 'tend-fruit.webp', IMG + 'tend-fruit.webp'], 'tend-mind': [IMG + 'tend-mind.webp', IMG + 'tend-mind.webp'], growth: [HERO + 'page-growth-wide.webp', HERO + 'page-growth-wide.webp'], library: [HERO + 'library-wide.webp', HERO + 'library-wide.webp'] };
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
        (last && !isKid(S.p) && planOK() ? '<button type="button" class="hm-tour-plan" data-hm-tour="plan">' + I('sprout') + '<span>' + (waySaved() ? 'Change My Plan' : 'Build My Growth Plan') + '</span></button>' : '') + '</div>' +
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
    { id: 'gratitude', n: 'Gratitude', line: 'Three good things, morning or night', today: 'Three good things from your day.', part: 'roots', days: WP_ALL, hour: 21, when: 'Evening', min: 3,
      how: ['Find a quiet minute, in the morning or before sleep.', 'Name three good things from the last day. Small ones count.', 'For each one, notice what helped it happen.'] },
    { id: 'kindness', n: 'Kindness', line: 'Warm wishes and one kind act', today: 'Warm wishes and one kind act.', part: 'branches', days: [3, 6], hour: 12.5, when: 'Any time', min: 5,
      how: ['Picture someone you care about and wish them well: may you be well, may you be at peace.', 'Widen the circle to someone you know a little, and then to yourself.', 'Choose one kind act for today, and do it.'] },
    { id: 'nature', n: 'Time Outside', line: 'A walk among trees, a sky to look at', today: 'A slow walk among trees, or a sky to look at.', part: 'roots', days: [6, 0], hour: 15, when: 'Afternoon', min: 30,
      how: ['Step outside to a park, a tree lined street, or your own yard.', 'Walk or sit slowly, with your phone in your pocket.', 'Take it in one sense at a time: the light, the sounds, the air, the ground under you.'] },
    { id: 'quiet', n: 'Quiet Reflection', line: 'Ten still minutes with a question', today: 'Ten still minutes with one question.', part: 'bark', days: [1, 4], hour: 20, when: 'Evening', min: 10,
      how: ['Sit somewhere quiet for about ten minutes.', 'Hold one question, like: what mattered most today?', 'Let your thoughts settle, and write one line if you like.'] },
    { id: 'pause', n: 'Sacred Pause', line: 'A breath before meals or at noon', part: 'roots', days: WP_ALL, hour: 12.5, when: 'Any time', min: 1, home: 'pray', faith: 1 },
    { id: 'prayer', n: 'Prayer in My Tradition', faith: 1, title: 'Prayer', line: 'Only when you choose it, in your own words', today: 'In your own words, in the way of your own tradition.', part: 'roots', days: WP_ALL, hour: 7, when: 'Morning', min: 5,
      how: ['Find a quiet moment, in the way of your own tradition.', 'Pray in your own words, or with words you know by heart.', 'Close with a slow breath, and carry it into your day.'] }
  ];
  var WP_SP = {}; WP_SPIRIT.forEach(function (x) { WP_SP[x.id] = x; });
  /* The tree's own practice record where its library has one, so a spirit item and the tree's practice are one record. */
  var SP_REC = { gratitude: 'roots|Three Good Things', kindness: 'branches|Kindness', nature: 'roots|A Walk Among Trees', quiet: 'bark|Quiet Reflection', pause: 'roots|Sacred Pause', prayer: 'roots|Prayer' };
  function spiritPid(id, tree) { return id === 'nature' && tree === 'pine' ? 'roots|Time Outside' : SP_REC[id]; }
  var FLOW_NAME = { daily: 'Flow', yoga: 'Yoga', taichi: 'Balance', stretch: 'Stretch' };
  /* BLD 894 (Chris, October 29, 2026: "i want these 6 categories exactly.. not the 3"): Body is one choice of six, any mix. */
  var WP_MOVES = [['strength', 'Strength', 'The 12-week program, with core, balance, and agility', 'move'], ['cardio', 'Cardio', 'Low impact intervals and steady work', 'move'],
    ['flow', 'Flow', 'Movement, breath, and quiet focus', 'leaves'], ['yoga', 'Yoga', 'Slow, flowing moves and an easy back', 'leaves'],
    ['balance', 'Balance', 'Soft, slow steps for steady balance', 'leaves'], ['stretch', 'Stretch', 'Easy movement, then steady holds', 'leaves']];
  var WP_MSTYLE = { flow: 'daily', yoga: 'yoga', balance: 'taichi', stretch: 'stretch' };
  /* The draft's track and Flow styles follow its moves, the same way Tending keeps set.track and set.flowStyles in step. */
  function wpSync(d) {
    var m = d.moves, st = m.indexOf('strength') >= 0, ca = m.indexOf('cardio') >= 0;
    d.track = st && ca ? 'mixed' : ca ? 'cardio' : st ? 'strength' : 'practice';
    d.flowStyles = m.filter(function (x) { return WP_MSTYLE[x]; }).map(function (x) { return WP_MSTYLE[x]; });
    return d;
  }
  function wpWork(d) { return d.track !== 'practice'; }
  function wpList(L) { return L.length < 3 ? L.join(' and ') : L.slice(0, -1).join(', ') + ', and ' + L[L.length - 1]; }
  /* The line under Days a week: where the workouts land and how the other categories take turns. */
  function wpDaysLine(d) {
    var work = d.moves.filter(function (x) { return !WP_MSTYLE[x]; }).map(function (x) { return x === 'cardio' ? 'Cardio' : 'Strength'; });
    var rest = d.moves.filter(function (x) { return WP_MSTYLE[x]; }).map(function (x) { return FLOW_NAME[WP_MSTYLE[x]]; });
    if (!work.length) return wpList(rest) + (rest.length > 1 ? ' take turns on these days' : ' on these days') + ', about 20 minutes each.';
    return wpList(work) + ' on these days.' + (rest.length ? ' ' + wpList(rest) + (rest.length > 1 ? ' take turns' : ' comes') + ' on the other days, Monday to Saturday, about 20 minutes each.' : '');
  }
  var WP_DAYSETS = { 2: [1, 4], 3: [1, 3, 5], 4: [1, 2, 4, 5], 5: [1, 2, 3, 4, 5], 6: [1, 2, 3, 4, 5, 6] };
  var WP_DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], WP_ORDER = [1, 2, 3, 4, 5, 6, 0];
  var WP_PLACE = { home: [], light: ['dumbbells', 'bands'], gym: ['dumbbells', 'bands', 'bar', 'dip', 'step', 'bench', 'machines', 'cardio'] };
  var WP_MED = { daily: 'Every Day', few: 'A Few Times a Week', weekly: 'Once a Week', later: 'Later' };
  /* BLD 907: the plain word under each tree word (Spirit, or what grounds you in Plain wording), and the longer meaning. */
  var WP_WORDS = { roots: 'Spirit', trunk: 'Meaning', bark: 'Mind', branches: 'Relationships', leaves: 'Body', fruit: 'Hope' };
  var WP_LONG = { roots: 'your connection with God and the sacred', trunk: 'your meaning and purpose', bark: 'your thoughts, feelings, and focus', branches: 'the people you love', leaves: 'food, movement, and rest', fruit: 'your hope' };
  function wpWord(k) { return k === 'roots' && plainNow() ? 'What grounds you' : WP_WORDS[k]; }
  function wpLong(k) { return k === 'roots' && plainNow() ? 'what grounds you: calm, values, wonder, and gratitude' : WP_LONG[k]; }
  /* Spirit choices: in Plain wording the faith ones (Prayer, Sacred Pause) wait, with no God language. */
  function wpSpiritList() { var pl = plainNow(); return WP_SPIRIT.filter(function (x) { return !(pl && x.faith); }); }
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
      var dn = practiceDone(t, pid);
      return { key: 's:' + x.id, src: 'spirit', sid: x.id, pid: pid, part: x.part, hour: x.hour, when: x.when + ' · ' + plabel(x.part), title: x.title || x.n, sub: x.today || x.line + '.', btn: 'How', tint: x.part, done: dn, pressed: dn, image: PRAC_ART[x.part], steps: x.how, min: x.min, r: 'd', doneToday: dn };
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
    return '<article class="hm-card hm-p-leaves hm-waynote" role="status"><div class="hm-hd">' + pb(IMG + 'way-plan-sq.webp') + '<div style="min-width:0"><div class="hm-k">Week 3 · Your Plan Grows</div><h3 class="hm-h3">Spirit and practices join your day</h3></div></div>' +
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
    return wpSync({
      lead: w.lead && trees.indexOf(w.lead) >= 0 ? w.lead : S.tree,
      moves: arr(info.moves).length ? info.moves.slice() : ['strength'],
      cardioDays: +s.cardioDays === 2 ? 2 : 1, days: WP_DAYSETS[+s.days] ? +s.days : 3, mins: [20, 40, 60].indexOf(+s.mins) >= 0 ? +s.mins : 20,
      level: s.level || 'root', gear: Array.isArray(s.gear) ? s.gear.slice() : (WP_PLACE[s.place] || []).slice(),
      check: Object.assign({}, obj(s.check)), cleared: !!s.cleared,
      med: WP_MED[s.medFreq] ? s.medFreq : 'daily', medTime: /^(morning|afternoon|evening)$/.test(s.medTime || '') ? s.medTime : 'morning',
      spirit: w.spirit ? Object.assign({}, w.spirit) : (h.parts.indexOf('pray') >= 0 ? { pause: 1 } : {}),
      food: info.done && arr(info.use).indexOf('food') < 0 ? 'later' : 'yes', household: n > 0 && n < 30 ? Math.round(n) : 2,
      prac: null, prac0: null, light: !!w.light
    }); }
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
    var flows = arr(info.flows), meds = arr(info.meds), all = arr(info.flowAll), fk = 0, fn = {};
    for (var di = 0; di < 7; di++) { var dow = WP_ORDER[di];
      var L = [], k = wd.indexOf(dow);
      if (k >= 0 && wpWork(d)) { var kind = d.track === 'cardio' || cs.indexOf(k) >= 0 ? 'cardio' : 'strength'; L.push({ kind: kind, id: '', title: d.level === 'gentle' ? 'Gentle' : kind === 'cardio' ? 'Cardio' : 'Strength', t: 'move' }); }
      else if (d.flowStyles.length && (wpWork(d) ? dow !== 0 : k >= 0)) { var st = d.flowStyles[fk++ % d.flowStyles.length], sl = all.filter(function (x) { return x.style === st; }), sn = fn[st] = (fn[st] || 0) + 1, f = st === 'daily' ? (flows.length ? flows[((dow + 6) % 7) % flows.length] : null) : st === 'taichi' ? sl[0] : sl[(sn - 1) % (sl.length || 1)]; f = f || { id: '', title: 'Flow', style: st }; L.push({ kind: 'flow', id: f.id, title: f.title || 'Flow', style: f.style || st, t: 'flow' }); }
      if (wpMedOn(d.med, dow)) { var m = meds.filter(function (x) { return x.day === WP_DOW[dow]; })[0] || meds[0] || { id: '', title: 'Meditation' }; L.push({ kind: 'meditation', id: m.id, title: m.title || 'Meditation', t: 'med' }); }
      out[dow] = L;
    }
    return out;
  }
  /* What fills a practice in this week: the days and the first session, for "Filled by ..." */
  function wpFill(pid, d, ses) {
    if (!window.GGFills) return null;
    ses = ses || wpSessions(d); var days = [], first = null;
    ses.forEach(function (L, dow) { L.forEach(function (s) { if (GGFills.fills(pid, s, d.lead)) { if (days.indexOf(dow) < 0) days.push(dow); if (!first) first = s; } }); });
    // A chosen Flow program fills on its turn, some weeks on a day this projection gives another style.
    if (!first && d.flowStyles.length) d.flowStyles.forEach(function (st) { var s = { kind: 'flow', id: '', title: 'Flow', style: st }; if (!first && GGFills.fills(pid, s, d.lead)) first = s; });
    if (!first) return null;
    var rule = GGFills.fillsFor(pid, null, d.lead) || {};
    var label = first.kind === 'meditation' ? (rule.only ? 'Filled by ' + first.title : 'Filled by your meditations') : first.kind === 'flow' ? 'Filled by ' + (FLOW_NAME[first.style] && first.style !== 'daily' ? FLOW_NAME[first.style] : 'Flow') : 'Filled by your ' + (d.level === 'gentle' ? 'Gentle' : first.kind === 'cardio' ? 'Cardio' : 'Strength') + ' workouts';
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
    var ed = edgesOf(ck), parts = ed.edges.filter(isTend).slice(0, 2); if (!parts.length && ed.lead) parts = [ed.lead];
    var ses = wpSessions(d), out = [], RW = { d: 'daily', w: 'weekly', f: 'a few times a week', n: 'now and then' };
    parts.forEach(function (part) {
      var def = arr(P.DOMAIN_DEFS).filter(function (x) { return x.key === part; })[0]; if (!def) return;
      var seen = {}, list = [];
      arr(def.restore).concat(arr(obj(P.NEW)[part])).forEach(function (r, i) {
        var name = Array.isArray(r) ? r[0] : r && (r.name || r.n), pid = part + '|' + name;
        if (!name || seen[name] || WP_SKIP.test(name) || PRAC_SKIP.test(name) || arr(obj(obj(P.FLAGS)[pid]).life).indexOf('sober') >= 0) return; seen[name] = 1;
        var f = wpFill(pid, d, ses), r0 = wpRhythm(pid, tree);
        list.push({ pid: pid, part: part, n: name, fill: f ? f.label : '', why: plabel(part) + ' ' + (ed.edges.indexOf(part) >= 0 ? 'Growing Edge' : 'Steady') + (r0 !== 'd' ? ' · ' + RW[r0] : ''), i: i, rank: (f ? 0 : 2) + (r0 === 'n' ? 1 : 0) });
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
      moves: d.moves.slice(), gentle: d.level === 'gentle' || hold, level: d.level,
      cardioDays: d.cardioDays, days: d.days, mins: d.mins, gear: d.gear.slice(), medFreq: d.med, medTime: d.medTime,
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
        '<div class="hm-wp-card">' + wpK('What you will choose', 'leaves') + '<div style="margin-top:6px"></div>' + wpRow('move', 'Body', 'Strength, Cardio, Flow, Yoga, Balance, Stretch') + wpRow('bark', 'Mind', 'Meditation, how often and when') +
        wpRow('roots', plainNow() ? 'What Grounds You' : 'Spirit', 'Gratitude, kindness, quiet, and more') + wpRow('plate', 'Table', 'Weekly dinners and Sunday Together Prep') + wpRow('leaves', 'Practices', 'A few for your Growing Edges') + '</div>' +
        '<p class="hm-wp-lead sm">Everything stays on this device, inside your locked profile.</p>';
      f = wpBtn('next', 'Start My Plan');
    } else if (i === 1) {
      var trees = wpTrees(), ck = lastCheckin(S.id, d.lead), ed = edgesOf(ck);
      var chips = trees.length > 1 ? '<div>' + wpLbl('Which tree leads your plan?') + '<div class="hm-wp-chips">' + trees.map(function (tr) { return wpChip('lead:' + tr, TREES[tr].n, d.lead === tr, 'leaves'); }).join('') + '</div></div>' : '';
      if (!ck) {
        b = wpK('Your ' + t.n) + wpH('Start with a check-in') + chips + '<p class="hm-wp-lead">Your plan starts where you are growing. A short guided check-in shows how each part of your tree is doing, and your plan picks up right here after.</p>' +
          '<div class="hm-wp-nudge"><b>About two minutes.</b> One question for each part of your tree: the four you tend and the two that grow from your tending, at your own pace.</div>';
        f = wpBtn('later', 'Later', true) + wpBtn('checkin', 'Take My Check-in');
      } else {
        var LVW = { strong: 'Strong', steady: 'Steady', edge: 'Growing Edge', unsure: 'Not sure yet' };
        var parts = '<div class="hm-wp-parts">' + PARTS.map(function (p) { var l = ed.lv[p.k]; return '<div class="hm-wp-part' + (l === 'edge' ? ' edge' : '') + '" style="--c:var(--' + p.k + ');--cs:var(--' + p.k + '-s)"><b>' + p.n + '</b><span>' + esc(wpWord(p.k)) + (isTend(p.k) ? '' : ', grows from your tending') + '</span><em class="lv-' + l + '">' + LVW[l] + '</em></div>'; }).join('') + '</div>';
        var e4 = ed.edges.filter(isTend), first = e4.length ? e4.slice(0, 2) : ed.lead ? [ed.lead] : [];
        var nudge = e4.length ? '<b>' + esc(first.map(function (k) { return plabel(k); }).join(' and ')) + '</b> get' + (first.length === 1 ? 's' : '') + ' your first suggestions: ' + esc(first.map(function (k) { return wpLong(k); }).join(', ')) + '.'
          : first.length ? 'Your first suggestions lean toward <b>' + esc(plabel(first[0])) + '</b>, ' + esc(wpLong(first[0])) + '. Meaning and hope grow as you tend all four.' : 'Every part keeps its good rhythm.';
        b = wpK('From your ' + t.n + ' check-in · ' + niceDate(ck.date), 'leaves') + wpH('Your Growing Edges') + chips + '<p class="hm-wp-lead">Your plan starts where you are growing. Strong parts keep their good rhythm.</p>' + parts + '<div class="hm-wp-nudge">' + nudge + '</div>';
        f = wpBtn('checkin', 'Check In Again', true) + wpBtn('next', 'Use This');
      }
    } else if (i === 2) {
      var hold = wpHold(info), pub = info.pub !== false, need = wpNeedCheck(info), K = obj(info.check), gentle = d.level === 'gentle' || hold, work = wpWork(d);
      var mvs = WP_MOVES.filter(function (x) { return x[0] !== 'cardio' || info.cardio; }), sty = arr(info.flowStyles).map(function (x) { return x.id; });
      if (sty.length) mvs = mvs.filter(function (x) { return !WP_MSTYLE[x[0]] || sty.indexOf(WP_MSTYLE[x[0]]) >= 0; });
      var ckc = need ? '<div class="hm-wp-card hm-wp-check">' + wpK('A quick health check', 'move') + '<p class="hm-wp-lead sm">' + esc(K.lead || '') + '</p>' + arr(K.questions).map(function (q) {
        return '<div class="hm-wp-q"><p>' + esc(q.q) + '</p><div class="hm-wp-chips">' + wpChip('ck:' + q.id + ':1', 'Yes', d.check[q.id] === true, 'move') + wpChip('ck:' + q.id + ':0', 'No', d.check[q.id] === false, 'move') + '</div>' + (q.why && d.check[q.id] === true ? '<small>' + esc(q.why) + '</small>' : '') + '</div>';
      }).join('') + (arr(K.questions).some(function (q) { return d.check[q.id] === true; }) ? '<div class="hm-wp-nudge"><b>' + esc(K.yes || '') + '</b> ' + esc(K.yesMore || '') + '<div class="hm-wp-chips" style="margin-top:8px">' + wpChip('cleared', (arr(K.continue).filter(function (x) { return x.id === 'cleared'; })[0] || {}).label || 'My doctor or therapist says I can begin', d.cleared, 'leaves') + '</div></div>' : '') + '</div>' : '';
      if (hold && !need) ckc = '<div class="hm-wp-nudge">' + esc(obj(info.check).yes || 'Your health check keeps the Gentle path for now.') + '</div>';
      b = wpK('Body · grows Leaves', 'move') + wpH('How do you like to move?') + ckc +
        '<div>' + wpLbl('Choose any, or all') + '<div class="hm-wp-tiles hm-wp-moves">' + mvs.map(function (x) { return '<button type="button" class="hm-wp-tile" data-hm-wp="mv:' + x[0] + '" aria-pressed="' + (d.moves.indexOf(x[0]) >= 0) + '" style="--c:var(--' + x[3] + ');--cs:var(--' + x[3] + '-s)"><b>' + esc(x[1]) + '</b><small>' + esc(x[2]) + '</small></button>'; }).join('') + '</div>' +
        (d.track === 'mixed' ? '<div style="margin-top:10px">' + wpLbl('Cardio days') + '<div class="hm-wp-chips">' + [1, 2].map(function (n) { return wpChip('set:cardioDays:' + n, n + (n === 1 ? ' Cardio Day' : ' Cardio Days'), d.cardioDays === n, 'move'); }).join('') + '</div></div>' : '') + '</div>';
      if (pub) {
        b += '<div>' + wpLbl('Days a week') + '<div class="hm-wp-chips">' + [2, 3, 4, 5, 6].map(function (n) { return wpChip('set:days:' + n, n + ' days', d.days === n, 'move'); }).join('') + '</div>' +
          '<small class="hm-wp-small">' + esc(wpDaysLine(d)) + '</small></div>';
        if (work) {
          b += '<div>' + wpLbl('Level') + '<div class="hm-wp-chips">' + [['root', 'Root'], ['rise', 'Rise'], ['thrive', 'Thrive'], ['gentle', 'Gentle']].map(function (l) { return wpChip('set:level:' + l[0], l[1], (hold ? 'gentle' : d.level) === l[0], 'move', hold && l[0] !== 'gentle'); }).join('') + '</div>' +
            (gentle ? '<small class="hm-wp-small">' + esc(obj(info.gentle).lead || 'Gentle: chair strength, supported balance, easy range of motion, breathing, and short walks.') + (arr(obj(info.gentle).mins).length ? ' About ' + Math.min.apply(null, info.gentle.mins) + ' to ' + Math.max.apply(null, info.gentle.mins) + ' minutes.' : '') + '</small>' : obj(info.levelLines)[d.level] ? '<small class="hm-wp-small">' + esc(info.levelLines[d.level]) + '</small>' : '') + '</div>';
          if (!gentle) {
            b += '<div>' + wpLbl('Minutes') + '<div class="hm-wp-chips">' + [20, 40, 60].map(function (n) { return wpChip('set:mins:' + n, n + ' min', d.mins === n, 'move'); }).join('') + '</div></div>';
            if (arr(info.gear).length) b += '<div>' + wpLbl('What you have') + '<div class="hm-wp-chips">' + info.gear.map(function (g) { return wpChip('gear:' + g.id, g.name, d.gear.indexOf(g.id) >= 0, 'trunk'); }).join('') + '</div><small class="hm-wp-small">' + (d.gear.length ? 'Every workout uses just what you check.' : esc(info.gearNone || 'Nothing checked: your body weight, a chair, a wall, and a mat.')) + '</small></div>';
          }
        }
      } else b += '<p class="hm-wp-lead sm">Your Guide plan keeps its own days, minutes, and equipment.</p>';
      var keep = info.done && info.prog && !gentle && work && d.track === (info.track || 'strength');
      if (work) b += '<p class="hm-wp-lead sm">' + (gentle ? 'The Gentle walk grows a little each week.' : keep ? 'You are in ' + esc(info.prog) + '. Your place in the program stays.' : 'Week 1 of 12 · Foundation. Build starts week 5 and Peak week 9.') + '</p>';
      f = wpBtn('next', 'Next');
    } else if (i === 3) {
      var mm = arr(info.medMins), meds = arr(info.meds);
      b = wpK('Mind · grows Bark', 'bark') + wpH('A quiet place in your day') + '<p class="hm-wp-lead">Seven guided meditations, a new one each day of the week' + (mm.length === 2 ? ', about ' + mm[0] + ' minutes to start, growing to ' + mm[1] : '') + '.</p>' +
        '<div>' + wpLbl('How often') + '<div class="hm-wp-chips">' + Object.keys(WP_MED).map(function (k) { return wpChip('set:med:' + k, WP_MED[k], d.med === k, 'bark'); }).join('') + '</div></div>' +
        (d.med !== 'later' ? '<div>' + wpLbl('When') + '<div class="hm-wp-chips">' + [['morning', 'Morning'], ['afternoon', 'Afternoon'], ['evening', 'Evening']].map(function (x) { return wpChip('set:medTime:' + x[0], x[1], d.medTime === x[0], 'bark'); }).join('') + '</div></div>' : '<p class="hm-wp-lead sm">Meditation waits in the Library, under Grounded Meditation, whenever you like.</p>') +
        (meds.length && d.med !== 'later' ? '<div class="hm-wp-card">' + wpK(d.med === 'daily' ? 'This week' : d.med === 'few' ? 'Tuesday, Thursday, and Saturday' : 'Sunday', 'bark') + '<small class="hm-wp-small">' + esc(meds.filter(function (m) { return wpMedOn(d.med, WP_DOW.indexOf(m.day)); }).map(function (m) { return m.title; }).join(', ')) + '</small></div>' : '');
      f = wpBtn('next', 'Next');
    } else if (i === 4) {
      var spPl = plainNow();
      b = wpK(plabel('roots') + ' · and the parts it touches', 'roots') + wpH(spPl ? 'What grounds you?' : 'What feeds your spirit?') + '<p class="hm-wp-lead">' + (spPl ? 'What grounds you: calm, values, wonder, and gratitude. ' : 'Your connection with God and the sacred, in your own way. ') + 'Choose any that feel like you. Each one is short.</p>' +
        '<div class="hm-wp-tiles">' + wpSpiritList().map(function (x) { return '<button type="button" class="hm-wp-tile" data-hm-wp="sp:' + x.id + '" aria-pressed="' + !!d.spirit[x.id] + '" style="--c:var(--' + x.part + ');--cs:var(--' + x.part + '-s)"><b>' + esc(x.n) + '</b><small>' + esc(x.line) + ' · ' + esc(plabel(x.part)) + '</small></button>'; }).join('') + '</div>';
      f = wpBtn('skip', 'Skip for Now', true) + wpBtn('next', 'Next');
    } else if (i === 5) {
      var hhs = [1, 2, 3, 4, 5, 6, 8]; if (hhs.indexOf(d.household) < 0) { hhs.push(d.household); hhs.sort(function (a, b2) { return a - b2; }); }
      b = wpK('Table · grows Leaves and Branches', 'plate') + wpH('Meals in your plan?') + '<p class="hm-wp-lead">Weekly dinners, Sunday Together Prep, and one shopping list sized to your table.</p>' +
        '<div class="hm-wp-chips">' + wpChip('set:food:yes', 'Yes, Add Meals', d.food === 'yes', 'plate') + wpChip('set:food:later', 'Later', d.food === 'later', 'plate') + '</div>' +
        (d.food === 'yes' ? '<div>' + wpLbl('Around the table') + '<div class="hm-wp-chips">' + hhs.map(function (n) { return wpChip('set:household:' + n, n + (n === 1 ? ' person' : ' people'), d.household === n, 'plate'); }).join('') + '</div></div>' : '') +
        (window.GGHolidays && hasFn('holidays') ? '<div>' + wpLbl('My Holidays') + '<div class="hm-wp-chips">' + arr(window.GGHolidays.sets).map(function (x) { return wpChip('hol:' + x.id, x.name, arr(obj(hCall('holidays')).on).indexOf(x.id) >= 0, 'plate'); }).join('') + '</div><small class="hm-wp-small">About three weeks before each one, a card on your Week offers to set it up: the shopping, the prep, and every recipe guided. Every set stays in the Library too.</small></div>' : '') +
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
        '<div class="hm-wp-card">' + wpRow('move', d.moves.map(function (x) { return x === 'strength' ? 'Strength' : x === 'cardio' ? 'Cardio' : FLOW_NAME[WP_MSTYLE[x]]; }).join(', ') + ', ' + d.days + ' days', wpWork(d) ? (d.level === 'gentle' || wpHold(info) ? 'Gentle level' : '12-week program, ' + d.mins + ' min') + (d.flowStyles.length ? ', the rest on other days' : '') : 'About 20 minutes each, taking turns') +
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
    wrap.querySelector('.hm-wp-t').textContent = i === 0 ? 'My Growth Plan' : WP_SCREENS[i];
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
      '<header class="hm-wp-bar"><button type="button" class="hm-wp-back" data-hm-wp="back" aria-label="Back">' + I('back') + '</button><div class="hm-wp-t" id="hm-wp-tt">My Growth Plan</div><div class="hm-wp-dots" role="img"></div>' +
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
    if (k === 'set') { var v = /^\d+$/.test(p[2]) ? +p[2] : p[2]; if (p[1] === 'level' && wpHold(info) && v !== 'gentle') return; d[p[1]] = v; if (p[1] === 'level' || p[1] === 'med' || p[1] === 'days' || p[1] === 'cardioDays') WP.sug = null; paintPlan(true); return; }
    if (k === 'hol') { hCall('holToggle', p[1]); paintPlan(true); return; }
    if (k === 'gear') { var gi = d.gear.indexOf(p[1]); if (gi >= 0) d.gear.splice(gi, 1); else d.gear.push(p[1]); paintPlan(true); return; }
    if (k === 'mv') { var mi = d.moves.indexOf(p[1]); if (mi >= 0 && d.moves.length === 1) { toast('Choose at least one.'); return; } if (mi >= 0) d.moves.splice(mi, 1); else d.moves.push(p[1]); d.moves = WP_MOVES.map(function (x) { return x[0]; }).filter(function (x) { return d.moves.indexOf(x) >= 0; }); wpSync(d); WP.sug = null; paintPlan(true); return; }
    if (k === 'ck') { d.check[p[1]] = p[2] === '1'; if (wpHold(info)) d.level = 'gentle'; paintPlan(true); return; }
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
    return '<article class="hm-card edge lift hm-p-leaves hm-gcard hm-waycard"><div class="hm-pc"><div class="scene"><img src="' + IMG + 'way-plan-sq.webp' + '" alt="" loading="lazy"></div><div style="min-width:0"><div class="hm-time">Growth Plan</div>' +
      '<h3 class="hm-h3">Your Growth Plan</h3><p class="hm-sub">' + (function () { var pc = planList(S.id, S.tree).length; return (pc ? nWord(pc) + (pc === 1 ? ' practice' : ' practices') + ' for your four. ' : '') + (s ? 'Your practices, body, mind, spirit, and table, in one plan since ' + esc(niceDate(s)) + '. Every choice can change anytime.' : 'Your practices, body, mind, spirit, and table, in one plan shaped by your latest check-in. About five minutes.'); })() + '</p>' +
      '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-wpopen="1">' + I('sprout') + (s ? 'Change My Plan' : 'Build My Growth Plan') + '</button></div></div></div></article>';
  }
  function planDoorWeek() {
    if (!planOK()) return '';
    var s = waySaved();
    return '<div class="hm-wplan"><span class="tx"><b>My Growth Plan</b><small>' + (s ? 'Movement, meditation, spirit, and meals, on their days.' : 'Build one plan for body, mind, spirit, and your table.') + '</small></span><button type="button" class="hm-pill" data-hm-wpopen="1">' + (s ? 'Change My Plan' : 'Build My Growth Plan') + '</button></div>';
  }
  /* Week's day rows: the meditation and the spirit items on that day. */
  function weekExtra(d) {
    var out = '', md = obj(d.med);
    /* BLD 896: a set up holiday's shopping day and prep tasks on their days. */
    arr(d.hol).forEach(function (x) { out += '<button type="button" class="hm-wmove hm-whol" data-hm-wk="' + esc(x.key) + '" aria-label="' + esc((d.dayName || d.day || '') + ': ' + x.title + (x.set ? ', ' + x.set : '')) + '">' + esc(x.title) + (x.done ? ' <span class="hm-wdone">' + I('check') + '<span class="sr">done</span></span>' : '') + '</button>'; });
    // BLD 896: My Own Items on their days (tap to edit).
    arr(d.own).forEach(function (o) { out += '<button type="button" class="hm-wmove hm-wown" data-hm-wk="ownedit:' + esc(o.id) + '" aria-label="' + esc((d.dayName || d.day || '') + ': ' + o.title + ', ' + o.when + (o.done ? ', done' : '') + '. Edit it') + '">' + esc(o.title) + ' <small>' + esc(o.when) + '</small>' + (o.done ? ' <span class="hm-wdone">' + I('check') + '<span class="sr">done</span></span>' : '') + '</button>'; });
    // BLD 900: My Menu, each added recipe on its day (tap to open its kitchen guide, with Swap and Remove).
    arr(d.menu).forEach(function (m) { out += '<button type="button" class="hm-wmove hm-wmenu" data-hm-wk="' + esc(m.key) + '" aria-label="' + esc((d.dayName || d.day || '') + ' ' + m.meal + ': ' + m.title + (m.done ? ', done' : '') + ', open the guide') + '">' + esc(m.title) + ' <small>' + esc(m.meal) + '</small>' + (m.done ? ' <span class="hm-wdone">' + I('check') + '<span class="sr">done</span></span>' : '') + '</button>'; });
    if (md.title) out += '<button type="button" class="hm-wmove hm-wmed" data-hm-wk="' + esc(md.key || '') + '" aria-label="' + esc((d.dayName || d.day || '') + ' meditation: ' + md.title + ', start it') + '">' + esc(md.title) + (md.done ? ' <span class="hm-wdone">' + I('check') + '<span class="sr">done</span></span>' : '') + '</button>';
    var sp = planOK() ? spiritOn(String(d.date || '').slice(0, 10)) : [];
    if (sp.length) out += '<span class="hm-wsp">' + sp.map(function (x) { return '<span class="hm-wpill" style="--c:var(--' + x.part + ');--cs:var(--' + x.part + '-s)">' + esc(x.title || x.n) + '</span>'; }).join('') + '</span>';
    return out;
  }

  /* ---------- BLD 896: My Own Items and the Month on the Week tab ---------- */
  S.wkv = (function () { try { return localStorage.getItem('gg-home-wkview') === 'month' ? 'month' : 'week'; } catch (e) { return 'week'; } })();
  function wkTogHtml() {
    var b = function (v, l, ic) { return '<button type="button" class="hm-wtb' + (S.wkv === v ? ' on' : '') + '" data-hm-wkv="' + v + '" aria-pressed="' + (S.wkv === v) + '">' + I(ic) + l + '</button>'; };
    return '<div class="hm-wtog"><div class="hm-wseg" role="group" aria-label="Week or Month">' + b('week', 'Week', 'grid') + b('month', 'Month', 'clock') + '</div><button type="button" class="hm-pill hm-wownb" data-hm-tab="week=own">' + I('sprout') + 'My Own Items</button></div>';
  }
  function ownWeekHtml(w) { var L = arr(w && w.ownWeek); return L.length ? '<p class="hm-sub hm-ownwk"><b>Once this week:</b> ' + L.map(function (x) { return esc(x.title) + (x.done ? ' (done)' : ''); }).join(', ') + '</p>' : ''; }
  function ownLinkHtml() { return '<div class="hm-ownlink"><span>My Own Items</span><button type="button" class="hm-btn sm line" data-hm-tab="week=own">' + I('plus') + 'Add an Item</button></div>'; }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-hm-wkv]'); if (!b) return;
    e.preventDefault(); S.wkv = b.getAttribute('data-hm-wkv') === 'month' ? 'month' : 'week';
    try { localStorage.setItem('gg-home-wkview', S.wkv); } catch (x) {}
    refreshPane(); var nb = document.querySelector('[data-hm-wkv="' + S.wkv + '"]'); if (nb) try { nb.focus({ preventScroll: true }); } catch (x) {}
  });

  /* =====================================================================
     BLD 907: The One Grounded Way, set up one area at a time (Chris, November 2, 2026; grounded-workshop
     docs/brand/BRANDSCRIPT.md, The One Way blueprint). A new profile opens here first, after its passcode. Its tree is set
     by age. Then Roots: Spirit, Bark: Mind, Leaves: Body, and Branches: Relationships, one at a time. Each feature takes
     one of three:
       Use the Grounded Plan   a short guided choice; its practices join the tree's growth plan (tend.plan[part].selected),
                               and Fitness, Nutrition, and Meditation reach Tending through GGHealth.applyPlan, the same
                               store My Grounded Way Plan sets (with its health check for Fitness)
       I Have My Own           counts when the person says it meets the Grounded standard for that area; it joins the
                               growth plan as their own practice (tend.plan[part].own)
       Not Yet                 nothing added for that feature
     Every area keeps at least one daily practice: with no daily practice chosen there, a gentle starter joins the plan.
     Then a quick or full check-in in the tree's own guided sheet. The promise shows on every screen.
     Saved in the home record: setup {v: 1, done: 'YYYY-MM-DD' once finished, i and d while a new profile is mid way,
       d: the choices, added: ['part|Name'] the setup put in the growth plan, own: ['part|Name'] its own practices}.
     A later setup (Settings, Change My Setup) takes away only what an earlier setup added. Nothing here leaves the device.
     ===================================================================== */
  var SU = { open: false, id: null, i: 0, d: null, edit: false };
  var SU_N = 6;
  var SU_FEATS = {
    roots: [{ id: 'spirit', n: 'Spirit Practices', pn: 'Grounding Practices', kn: 'A Calm, Thankful Moment' }],
    bark: [{ id: 'med', n: 'Meditation', kn: 'Calm Breathing' }],
    leaves: [{ id: 'food', n: 'Nutrition', kn: '' }, { id: 'fit', n: 'Fitness', kn: 'Move, Play, and Eat Well' }],
    branches: [{ id: 'connect', n: 'Connection Practices', kn: 'Kindness and Helping' }]
  };
  var SU_PLAN = {
    spirit: 'Grounded Spirit: a few minutes each day for your connection with God and the sacred, in your own way, gratitude first.',
    spiritPlain: 'A few minutes each day for what grounds you: gratitude, calm, wonder, and your values.',
    med: 'Grounded Meditation: a guided meditation on the days and at the time you choose.',
    food: 'Grounded Nutrition: whole food meals, Grounded Cooking step by step, and one shopping list for your table.',
    fit: 'Grounded Fitness: movement for your level, on the days you choose.',
    connect: 'Time face to face with the people you love, phones away.'
  };
  var SU_STD = { roots: 'time most days for your connection with God and the sacred, in your own way', bark: 'a few still minutes most days for a calm, clear mind', leaves: 'whole food most meals, movement most days, and good rest', branches: 'time face to face with the people you love most days, with phones away' };
  var SU_STD_PLAIN = 'time most days for what grounds you: gratitude, calm, wonder, or your values';
  var SU_KSTD = { roots: 'a calm, thankful moment most days', bark: 'a few calm breaths most days', leaves: 'moving and playing most days, with good food and good sleep', branches: 'kind time with family and friends most days' };
  var SU_OWN = { spirit: 'My Own Spirit Practice', med: 'My Own Meditation', food: 'My Own Eating Plan', fit: 'My Own Movement Routine', connect: 'My Own Connection Time' };
  var SU_KOWN = { spirit: 'My Own Calm Moment', med: 'My Own Calm Breathing', fit: 'My Own Way to Move', connect: 'My Own Kind Time' };
  // The trees' own daily practices (shared/practice-rhythm.js), so each one is a real practice of its tree.
  var SU_ROOTS = ['Three Good Things', 'Sit Spot', 'Quiet Time', 'Watch Something Grow', 'Prayer', 'Breath Prayer', 'Mealtime Blessing', 'Scripture', 'Examen'];
  var SU_FAITH = /Prayer|Blessing|Scripture|Examen/;
  var SU_MEDP = { oak: 'Meditation', sequoia: 'Meditation', birch: 'Body Scan', pine: 'Mindfulness' };
  var SU_BRANCH = ['Active Listening', 'One Reach-Out a Day', 'Loving-Kindness', 'Pay It Forward'];
  var SU_START = { roots: 'Three Good Things', bark: 'Slow Exhale', leaves: 'Stretch Break', branches: 'One Reach-Out a Day' };
  var SU_KID = {
    maple: { plan: { roots: 'Look Up', bark: 'Balloon Breaths', leaves: 'Outside Play', branches: 'Helper Job' }, start: { roots: 'Three Good Things', bark: 'Feelings Weather', leaves: 'Water Check', branches: 'Friend Cheer' } },
    aspen: { plan: { roots: 'Step outside, look up at the sky, and take three slow breaths.', bark: 'Breathe in for four, out for six, five times.', leaves: 'Get outside and move for ten minutes: walk, bike, shoot hoops, anything.', branches: 'Ask a family member about their day and really listen.' },
      start: { roots: 'Leave your phone inside and spend five minutes outside, just noticing.', bark: 'Name the feeling you have right now in one word.', leaves: 'Take five slow breaths and notice how your body feels.', branches: 'Tell someone thank you for something they do for you.' } }
  };
  function suKid() { return isKid(S.p); }
  function suTree() { return FILL_TREES.indexOf(S.tree) >= 0 || SU_KID[S.tree] ? S.tree : 'oak'; }
  function suRh(tree, pid) { var R = window.GG_RHYTHM; return R && R[tree] ? R[tree][pid] || null : undefined; }
  function suHas(tree, pid) { var x = suRh(tree, pid); return x === undefined || !!x; }
  function suDaily(tree, pid) { var x = suRh(tree, pid); return !x || x.r === 'd'; }
  function suStart(tree, k) { return k === 'leaves' && tree === 'sequoia' ? 'Chair Stretch' : SU_START[k]; }
  function suFeats(k) { return SU_FEATS[k].filter(function (f) { return !suKid() || f.kn; }); }
  function suLocked() { var h = obj(tendHost(S.id, S.tree)); if (h.plainLock === true) return true; try { return obj(obj(GGP.data(S.id))[S.tree]).plainLock === true; } catch (e) { return false; } }
  function suPlain(d) { return suKid() ? (suLocked() || (d && d.wording === 'plain')) : plainNow(); }
  function suRootsList(tree, plain) { return SU_ROOTS.filter(function (n) { return suHas(tree, 'roots|' + n) && suDaily(tree, 'roots|' + n) && !(plain && SU_FAITH.test(n)); }); }
  function suBranchList(tree) { return SU_BRANCH.filter(function (n) { return suHas(tree, 'branches|' + n); }); }
  function suOwnName(f, kid) { return (kid ? SU_KOWN : SU_OWN)[f.id] || 'My Own Practice'; }
  function suPending() { if (!S.id || !window.GGP) return false; var sv = obj(homeRec().setup); return !!(sv.v && !sv.done); }
  function suDraft() {
    var h = homeRec(), sv = obj(h.setup);
    if (sv.d && typeof sv.d === 'object' && sv.d.v === 1) { try { return JSON.parse(JSON.stringify(sv.d)); } catch (e) {} }
    var on = function (k) { return h.parts.indexOf(k) >= 0; };
    var d = { v: 1, f: {
      spirit: { c: 'plan', meets: false, pick: ['Three Good Things'], pause: on('pray') ? 1 : 0 },
      med: { c: 'plan', meets: false, freq: 'daily', time: 'morning' },
      food: { c: 'plan', meets: false, house: tableOf() || 2 },
      fit: { c: 'plan', meets: false, moves: ['strength'], days: 3, check: {}, cleared: false },
      connect: { c: 'plan', meets: false, pick: ['Active Listening'], question: 1 }
    }, labs: on('labs') ? 1 : 0 };
    if (suKid()) d.wording = plainWording(S.id, S.tree) ? 'plain' : 'faith';
    return d;
  }
  /* What the choices add, area by area: the growth plan picks, own practices, rhythms, Today cards, and each area's names. */
  function suResult(d) {
    var tree = suTree(), kid = suKid(), K = SU_KID[tree] || SU_KID.maple, plain = suPlain(d);
    var out = { add: [], own: [], rhythm: {}, parts: { pray: 0, food: 0, move: 0, connect: 0, labs: !kid && d.labs ? 1 : 0 }, areas: {} };
    TEND4.forEach(function (k) {
      var A = { names: [], daily: 0, start: '' };
      var P = function (n, daily) { var pid = k + '|' + n; if (out.add.indexOf(pid) < 0) out.add.push(pid); if (A.names.indexOf(n) < 0) A.names.push(n); if (daily !== false && suDaily(tree, pid)) A.daily++; };
      suFeats(k).forEach(function (f) {
        var x = obj(d.f[f.id]);
        if (x.c === 'plan') {
          if (kid) { P(K.plan[k]); return; }
          if (f.id === 'spirit') {
            var ok = suRootsList(tree, plain); arr(x.pick).filter(function (n) { return ok.indexOf(n) >= 0; }).forEach(function (n) { P(n); });
            if (x.pause && !plain) { out.parts.pray = 1; A.names.push('A Sacred Pause'); A.daily++; }
          } else if (f.id === 'med') { var mn = SU_MEDP[tree] || 'Meditation'; out.rhythm['bark|' + mn] = x.freq === 'few' ? 'f3' : x.freq === 'weekly' ? 'w' : 'd'; P(mn, x.freq === 'daily'); }
          else if (f.id === 'food' && !member()) { P(tree === 'sequoia' ? 'Walk Your Way' : 'Walk or Jog'); }
          else if (f.id === 'food') { P('Food'); out.parts.food = 1; }
          else if (f.id === 'fit') { P('Movement'); out.parts.move = 1; }
          else if (f.id === 'connect') {
            var okb = suBranchList(tree); arr(x.pick).filter(function (n) { return okb.indexOf(n) >= 0; }).forEach(function (n) { P(n); });
            if (x.question) { out.parts.connect = 1; A.names.push('Tonight\'s Question'); A.daily++; }
          }
        } else if (x.c === 'own' && x.meets) { var on = suOwnName(f, kid); out.own.push(k + '|' + on); A.names.push(on); A.daily++; }
      });
      if (!A.daily) { var st = kid ? K.start[k] : suStart(tree, k); P(st); A.start = st; }
      out.areas[k] = A;
    });
    return out;
  }
  /* Maple and Aspen keep their plan inside the child's record; a new child gets an empty one their tree fills in. */
  function suHost(tree) {
    if (tree === 'maple') { var m = GGP.data(S.id, 'maple'); if (m && (!m.kid || typeof m.kid !== 'object')) m.kid = { checkins: [] }; }
    else if (tree === 'aspen') { var a = GGP.data(S.id, 'aspen'); if (a && (!a.student || typeof a.student !== 'object')) a.student = {}; }
  }
  function ownPicks(tree, add, remove) {
    var t = tendGet(S.id, tree, true); if (!t) return;
    if (!t.plan || typeof t.plan !== 'object') { var p0 = planOf(S.id, tree); t.plan = p0 ? JSON.parse(JSON.stringify(p0)) : {}; }
    arr(remove).forEach(function (pid) { var c = pid.indexOf('|'), x = t.plan[pid.slice(0, c)]; if (x && Array.isArray(x.own)) { var j = x.own.indexOf(pid.slice(c + 1)); if (j >= 0) x.own.splice(j, 1); } });
    arr(add).forEach(function (pid) {
      var c = pid.indexOf('|'), part = pid.slice(0, c), name = pid.slice(c + 1), x = t.plan[part] = obj(t.plan[part]);
      if (!Array.isArray(x.selected)) x.selected = []; if (!Array.isArray(x.own)) x.own = [];
      if (x.own.indexOf(name) < 0 && x.custom !== name) x.own.push(name);
    });
  }
  function suSave(ck) {
    var d = SU.d, res = suResult(d), h = GGP.data(S.id, 'home'), tree = suTree(), kid = suKid(); if (!h) return;
    h.parts = arr(h.parts); var sv = obj(h.setup);
    suHost(tree);
    if (kid && !suLocked() && (d.wording === 'plain' || d.wording === 'faith')) { var host = tendHost(S.id, tree); if (host) host.wording = d.wording; }
    addPicks(tree, res.add, arr(sv.added).filter(function (p) { return res.add.indexOf(p) < 0; }));
    ownPicks(tree, res.own, arr(sv.own).filter(function (p) { return res.own.indexOf(p) < 0; }));
    h.rhythm = obj(h.rhythm); Object.keys(res.rhythm).forEach(function (pid) { if (res.rhythm[pid] === 'd') delete h.rhythm[pid]; else h.rhythm[pid] = res.rhythm[pid]; });
    if (!kid) ['pray', 'food', 'move', 'connect', 'labs'].forEach(function (k) { var i = h.parts.indexOf(k); if (res.parts[k] && i < 0) h.parts.push(k); else if (!res.parts[k] && i >= 0) h.parts.splice(i, 1); });
    // Fitness by the Grounded Plan sets up Tending the same way My Grounded Way Plan does, health check included.
    if (!kid && planOK() && obj(d.f.fit).c === 'plan' && tendReady() && hasFn('applyPlan')) {
      var info = wpInfo() || {}, f = d.f.fit, o = { moves: arr(f.moves).length ? f.moves.slice() : ['strength'], days: f.days, food: obj(d.f.food).c === 'plan', household: obj(d.f.food).house, medFreq: obj(d.f.med).c === 'plan' ? d.f.med.freq : 'later', medTime: obj(d.f.med).time };
      if (wpNeedCheck(info)) { o.check = Object.assign({}, f.check); o.cleared = !!f.cleared; }
      hCall('applyPlan', o);
    }
    var tp = tendGet(S.id, tree); if (tp) publishTree(S.id, tree, tp);
    h.setup = { v: 1, done: sv.done || today(), u: today(), d: d, added: res.add, own: res.own };
    saveHome();
    SU.open = false; SU.d = null;
    toast('Your four are set, locked on this device.');
    if (location.hash && !/^#(today)?$/.test(location.hash)) { try { history.replaceState(null, '', location.pathname); } catch (e) {} }
    render(); window.scrollTo(0, 0);
    if (ck) setTimeout(function () { openTreeSheet(ck); }, 200);
  }
  /* Open the setup: at an area (Settings' Change My Setup, or Your Four's Choose), or where a new profile left off. */
  function openSetup(at) {
    if (!S.id) return;
    var sv = obj(homeRec().setup), i = TEND4.indexOf(at);
    SU = { open: true, id: S.id, i: i >= 0 ? i + 1 : (sv.done ? 0 : +sv.i || 0), d: suDraft(), edit: !!sv.done };
    if (document.getElementById('hm-sheet')) { S.sheetPushed = 0; closeSheet(true); try { history.replaceState(null, '', location.pathname + '#' + (S.under || 'today')); } catch (e) {} }
    render(); window.scrollTo(0, 0);
  }
  function suKeep() {
    if (SU.edit || !S.id) return;
    var h = GGP.data(S.id, 'home'); if (!h) return;
    h.setup = Object.assign(obj(h.setup), { v: 1, i: SU.i, d: SU.d }); saveHome();
  }
  function renderSetup() {
    var root = app(); if (!root) return;
    if (!SU.open || SU.id !== S.id) { var sv = obj(homeRec().setup); SU = { open: true, id: S.id, i: +sv.i || 0, d: suDraft(), edit: false }; }
    closeSheet(true); paintNav('');
    document.body.classList.add('hm-bn');
    root.innerHTML = '<div class="hm-wrap hm-su" id="hm-su">' + suHtml() + '</div>' + helpLine();
    loadTending().then(function () { if (SU.open && SU.i === 3 && document.getElementById('hm-su') && !SU.infoPainted) { SU.infoPainted = 1; suPaint(); } });
  }
  function suChip(act, label, on, c) { return '<button type="button" class="hm-wp-chip" data-hm-su="' + esc(act) + '" aria-pressed="' + !!on + '"' + (c ? ' style="--c:var(--' + c + ')"' : '') + '>' + esc(label) + '</button>'; }
  function suRadio(fid, val, label, sub, cur) {
    var id = 'hm-su-' + fid + '-' + val;
    return '<label class="hm-su-c' + (cur === val ? ' on' : '') + '" for="' + id + '"><input type="radio" id="' + id + '" name="hm-su-' + fid + '" value="' + val + '" data-hm-su="c:' + fid + ':' + val + '"' + (cur === val ? ' checked' : '') + '><span><b>' + esc(label) + '</b><small>' + esc(sub) + '</small></span></label>';
  }
  function suFeatHtml(k, f, d) {
    var x = d.f[f.id] = obj(d.f[f.id]), kid = suKid(), tree = suTree(), plain = suPlain(d), K = SU_KID[tree] || SU_KID.maple;
    var name = kid ? f.kn : f.id === 'spirit' && plain ? f.pn : f.n, sub = '';
    if (x.c === 'plan') {
      if (kid) sub = '<p class="hm-su-note">' + I('sprout') + '<span><b>' + esc(K.plan[k]) + '</b> joins your day.</span></p>';
      else if (f.id === 'spirit') {
        var L = suRootsList(tree, plain);
        sub = '<div class="hm-wp-lbl">Choose one or more</div><div class="hm-wp-chips">' + L.map(function (n) { return suChip('pk:spirit:' + n, n, arr(x.pick).indexOf(n) >= 0, 'roots'); }).join('') + (plain ? '' : suChip('pause', 'A Sacred Pause', !!x.pause, 'roots')) + '</div>' +
          '<small class="hm-wp-small">' + (plain ? 'Gratitude leads, with calm and wonder close behind.' : 'Gratitude leads. Prayer waits for you to choose it, in the way of your own tradition.') + '</small>';
      } else if (f.id === 'med') {
        sub = '<div class="hm-wp-lbl">How often</div><div class="hm-wp-chips">' + [['daily', 'Every Day'], ['few', 'A Few Times a Week'], ['weekly', 'Once a Week']].map(function (o) { return suChip('set:med:freq:' + o[0], o[1], x.freq === o[0], 'bark'); }).join('') + '</div>' +
          '<div class="hm-wp-lbl" style="margin-top:10px">When</div><div class="hm-wp-chips">' + [['morning', 'Morning'], ['afternoon', 'Afternoon'], ['evening', 'Evening']].map(function (o) { return suChip('set:med:time:' + o[0], o[1], x.time === o[0], 'bark'); }).join('') + '</div>';
      } else if (f.id === 'food') {
        sub = '<div class="hm-wp-lbl">Around the table</div><div class="hm-wp-chips">' + [1, 2, 3, 4, 5, 6, 8].map(function (n) { return suChip('set:food:house:' + n, n + (n === 1 ? ' person' : ' people'), x.house === n, 'leaves'); }).join('') + '</div>' +
          '<small class="hm-wp-small">Food needs, allergies, and goals live in Tending Setup, ready whenever you like.</small>';
      } else if (f.id === 'fit') {
        var info = wpInfo() || {}, mvs = WP_MOVES.filter(function (m) { return m[0] !== 'cardio' || info.cardio !== false; }), need = wpNeedCheck(info), KQ = obj(info.check);
        sub = '<div class="hm-wp-lbl">How do you like to move? Choose any</div><div class="hm-wp-chips">' + mvs.map(function (m) { return suChip('mv:' + m[0], m[1], arr(x.moves).indexOf(m[0]) >= 0, 'move'); }).join('') + '</div>' +
          '<div class="hm-wp-lbl" style="margin-top:10px">Days a week</div><div class="hm-wp-chips">' + [2, 3, 4, 5, 6].map(function (n) { return suChip('set:fit:days:' + n, n + ' days', x.days === n, 'move'); }).join('') + '</div>' +
          (need ? '<div class="hm-wp-card hm-wp-check" style="margin-top:12px">' + wpK('A quick health check', 'move') + '<p class="hm-wp-lead sm">' + esc(KQ.lead || '') + '</p>' + arr(KQ.questions).map(function (q) {
            return '<div class="hm-wp-q"><p>' + esc(q.q) + '</p><div class="hm-wp-chips">' + suChip('ck:' + q.id + ':1', 'Yes', obj(x.check)[q.id] === true, 'move') + suChip('ck:' + q.id + ':0', 'No', obj(x.check)[q.id] === false, 'move') + '</div></div>';
          }).join('') + (arr(KQ.questions).some(function (q) { return obj(x.check)[q.id] === true; }) ? '<div class="hm-wp-nudge"><b>' + esc(KQ.yes || '') + '</b> ' + esc(KQ.yesMore || '') + '<div class="hm-wp-chips" style="margin-top:8px">' + suChip('cleared', (arr(KQ.continue).filter(function (c) { return c.id === 'cleared'; })[0] || {}).label || 'My doctor or therapist says I can begin', !!x.cleared, 'leaves') + '</div></div>' : '') + '</div>' : '');
      } else if (f.id === 'connect') {
        sub = '<div class="hm-wp-lbl">Choose one or more</div><div class="hm-wp-chips">' + suBranchList(tree).map(function (n) { return suChip('pk:connect:' + n, n, arr(x.pick).indexOf(n) >= 0, 'branches'); }).join('') + suChip('question', 'Tonight\'s Question at Dinner', !!x.question, 'branches') + '</div>';
      }
      if (!kid) sub = '<p class="hm-su-plan">' + esc(f.id === 'spirit' && plain ? SU_PLAN.spiritPlain : !member() && SU_START_PLAN[f.id] ? SU_START_PLAN[f.id] : SU_PLAN[f.id]) + '</p>' + sub;
    } else if (x.c === 'own') {
      var std = kid ? SU_KSTD[k] : k === 'roots' && plain ? SU_STD_PLAIN : SU_STD[k], mid = 'hm-su-m-' + f.id;
      sub = '<div class="hm-su-std"><p><b>The Grounded standard for ' + esc(plabel(k, plain)) + ':</b> ' + esc(std) + '.</p>' +
        '<label class="hm-su-meets" for="' + mid + '"><input type="checkbox" id="' + mid + '" data-hm-su="m:' + f.id + '"' + (x.meets ? ' checked' : '') + '><span>' + (kid ? 'A grown-up says yes: our routine meets this' : 'My routine meets this') + '</span></label>' +
        '<small class="hm-wp-small">' + (x.meets ? 'It counts. It joins Today as ' + esc(suOwnName(f, kid)) + ', with Done and Do Tomorrow.' : 'Once it does, it counts. The Grounded Plan is here too, whenever you like.') + '</small></div>';
    }
    var plainHint = kid ? 'Practice: ' + K.plan[k] : f.id === 'fit' ? 'Movement for your level' : f.id === 'food' ? 'Grounded Nutrition and Grounded Cooking' : f.id === 'med' ? 'Guided, on your days' : 'A short guided start';
    return '<fieldset class="hm-su-f" data-f="' + f.id + '"><legend class="hm-su-fl">' + esc(name) + '</legend><div class="hm-su-cs">' +
      suRadio(f.id, 'plan', 'Use the Grounded Plan', plainHint, x.c) + suRadio(f.id, 'own', 'I Have My Own', 'Counts when it meets the Grounded standard', x.c) + suRadio(f.id, 'later', 'Not Yet', 'Ready whenever you are', x.c) +
      '</div>' + (sub ? '<div class="hm-su-sub">' + sub + '</div>' : '') + '</fieldset>';
  }
  function suHtml() {
    var i = SU.i, d = SU.d, kid = suKid(), t = TREES[S.tree] || TREES.oak, plain = suPlain(d), b = '', f = '';
    var dots = '<div class="hm-su-dots" role="img" aria-label="Step ' + (i + 1) + ' of ' + SU_N + '">' + Array.apply(null, Array(SU_N)).map(function (_, j) { return '<i class="' + (j <= i ? 'on' : '') + '"></i>'; }).join('') + '</div>';
    var prom = '<p class="hm-promise-line">' + I('sprout') + '<span>' + esc(promise()) + '</span></p>';
    var top = '<div class="hm-su-top"><img src="' + mark(S.tree) + '" alt="" width="40" height="40"><div class="hm-k">' + (SU.edit ? 'Change My Setup' : 'Set Up Your Grounded Way') + '</div>' + dots + (SU.edit ? '<button type="button" class="hm-x" data-hm-su="close" aria-label="Close without changes">' + I('plus') + '</button>' : '') + '</div>';
    if (i === 0) {
      b = '<h1 class="hm-su-h" id="hm-su-h" tabindex="-1">' + esc(kid ? 'Let’s Set Up Your ' + t.n : 'Your ' + t.n + ': Four Parts to Tend') + '</h1>' +
        '<p class="hm-su-lead">Your tree is ' + esc(t.n) + ', set by age (' + esc(t.who) + '). Next, choose how you tend each part, one at a time. About three minutes, and every choice can change in Settings.</p>' + prom +
        '<ol class="hm-su-four">' + TEND4.map(function (k) { return '<li style="--c:var(--' + k + ');--cs:var(--' + k + '-s)"><b>' + esc(plabel(k, plain)) + '</b><small>' + esc(cap(pmeaning(k, plain))) + '</small></li>'; }).join('') + '</ol>' +
        '<p class="hm-sub">' + GROW2.map(function (k) { return esc(plabel(k, plain)); }).join(' and ') + ' grow from your tending. Your check-in shows how they are growing.</p>' +
        (kid ? (suLocked() ? '<p class="hm-su-note">' + I('feather') + '<span>Plain wording, set by your school: Roots reads what grounds you.</span></p>'
          : '<fieldset class="hm-su-f"><legend class="hm-su-fl">Grown-up, choose the wording</legend><div class="hm-su-cs two">' + suRadio('w', 'faith', 'Faith', 'Roots: Spirit, with words of faith', d.wording === 'plain' ? 'plain' : 'faith') + suRadio('w', 'plain', 'Plain', 'Roots: what grounds you, with no religious words', d.wording === 'plain' ? 'plain' : 'faith') + '</div></fieldset>') : '');
      f = '<button type="button" class="hm-btn line hm-p-leaves" data-hm-su="all">Grounded Plan for All Four</button><button type="button" class="hm-btn hm-p-leaves" data-hm-su="next">' + I('arrow') + 'Start With Roots</button>';
    } else if (i <= 4) {
      var k = TEND4[i - 1], res = suResult(d), A = res.areas[k];
      b = '<div class="hm-k" style="color:var(--' + k + ')">Part ' + i + ' of 4</div><h1 class="hm-su-h" id="hm-su-h" tabindex="-1" style="--c:var(--' + k + ')">' + esc(plabel(k, plain)) + '</h1>' +
        '<p class="hm-su-lead">' + esc(cap(pmeaning(k, plain))) + '.</p>' + prom +
        suFeats(k).map(function (ft) { return suFeatHtml(k, ft, d); }).join('') +
        (k === 'leaves' && !kid ? '<label class="hm-su-meets hm-su-labs" for="hm-su-labs"><input type="checkbox" id="hm-su-labs" data-hm-su="labs"' + (d.labs ? ' checked' : '') + '><span><b>Add Labs and Numbers</b> · your own lab numbers and LDL Path, to bring to your doctor</span></label>' : '') +
        '<p class="hm-su-keep" aria-live="polite">' + I('check') + '<span>' + esc(A.start && A.names.length === 1 ? 'A gentle starter keeps your ' + PART[k].n + ' tended: ' + A.start + '.' : 'Your ' + PART[k].n + ' stay tended with ' + wpList(A.names) + '.') + '</span></p>';
      f = '<button type="button" class="hm-btn line hm-p-leaves" data-hm-su="back">' + I('back') + 'Back</button><button type="button" class="hm-btn hm-p-leaves" data-hm-su="next">' + I('arrow') + (i < 4 ? 'Next: ' + esc(PART[TEND4[i]].n) : 'Next: Check In') + '</button>';
    } else {
      var rs = suResult(d);
      b = '<div class="hm-k">Last step</div><h1 class="hm-su-h" id="hm-su-h" tabindex="-1">Your Four Are Ready</h1>' + prom +
        '<ul class="hm-su-sum">' + TEND4.map(function (k) { return '<li style="--c:var(--' + k + ');--cs:var(--' + k + '-s)"><b>' + esc(plabel(k, plain)) + '</b><small>' + esc(wpList(rs.areas[k].names)) + '</small></li>'; }).join('') + '</ul>' +
        '<p class="hm-su-lead">' + (kid ? 'Now a check-in with your grown-up shows how each part of your tree is growing.' : 'Now a check-in shows how each part is growing, the four you tend and the two that grow from them. Choose quick, about two minutes, or full, about eight.') + '</p>';
      f = '<button type="button" class="hm-btn line hm-p-leaves" data-hm-su="back">' + I('back') + 'Back</button>' +
        (t.ck ? '<button type="button" class="hm-btn line hm-p-leaves" data-hm-su="fin:quick">' + I('clock') + 'Quick Check-in</button><button type="button" class="hm-btn hm-p-leaves" data-hm-su="fin:checkin">' + I('check') + 'Full Check-in</button>'
          : '<button type="button" class="hm-btn hm-p-leaves" data-hm-su="fin:checkin">' + I('people') + 'Check In With My Grown-up</button>') +
        '<button type="button" class="hm-linkbtn" data-hm-su="fin:">Check In Later</button>';
    }
    return top + '<section class="hm-card hm-su-card" aria-labelledby="hm-su-h"><div class="hm-su-body">' + b + '</div><div class="hm-su-foot">' + f + '</div></section>';
  }
  function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
  function suPaint(focusHead) {
    var el = document.getElementById('hm-su'); if (!el) return;
    var a = document.activeElement, key = a && a.getAttribute && (a.id || a.getAttribute('data-hm-su')), byId = !!(a && a.id);
    el.innerHTML = suHtml();
    if (focusHead) { var h = document.getElementById('hm-su-h'); if (h) try { h.focus({ preventScroll: true }); } catch (e) {} window.scrollTo(0, 0); return; }
    if (key) { var n = byId ? document.getElementById(key) : document.querySelector('[data-hm-su="' + cssq(key) + '"]'); if (n) try { n.focus({ preventScroll: true }); } catch (e) {} }
  }
  function suGo(i) { SU.i = Math.max(0, Math.min(SU_N - 1, i)); suKeep(); suPaint(true); }
  function suFitNeedsAnswers() {
    var x = obj(SU.d.f.fit), info = wpInfo() || {};
    return !suKid() && x.c === 'plan' && wpNeedCheck(info) && arr(info.check.questions).some(function (q) { return obj(x.check)[q.id] == null; });
  }
  function suAct(a, el) {
    var d = SU.d; if (!d) return;
    if (a === 'close') { SU.open = false; SU.d = null; render(); return; }
    if (a === 'next') { if (SU.i === 3 && suFitNeedsAnswers()) { toast('Answer each health check question with Yes or No.'); return; } suGo(SU.i + 1); return; }
    if (a === 'back') { suGo(SU.i - 1); return; }
    if (a === 'all') { Object.keys(d.f).forEach(function (k) { d.f[k].c = 'plan'; }); if (suFitNeedsAnswers()) { toast('One quick health check for Fitness first.'); suGo(3); } else suGo(5); return; }
    if (a.indexOf('fin:') === 0) { if (suFitNeedsAnswers()) { toast('One quick health check for Fitness first.'); suGo(3); return; } suSave(a.slice(4)); return; }
    var p = a.split(':'), k = p[0];
    if (k === 'c') { if (p[1] === 'w') d.wording = p[2]; else { d.f[p[1]] = obj(d.f[p[1]]); d.f[p[1]].c = p[2]; } }
    else if (k === 'm') { d.f[p[1]].meets = !!(el && el.checked); }
    else if (k === 'labs') d.labs = el && el.checked ? 1 : 0;
    else if (k === 'pk') { var x = d.f[p[1]], n = p.slice(2).join(':'), j = arr(x.pick).indexOf(n); x.pick = arr(x.pick); if (j >= 0) x.pick.splice(j, 1); else x.pick.push(n); }
    else if (k === 'pause' || k === 'question') { var y = d.f[k === 'pause' ? 'spirit' : 'connect']; y[k] = y[k] ? 0 : 1; }
    else if (k === 'set') { d.f[p[1]][p[2]] = /^\d+$/.test(p[3]) ? +p[3] : p[3]; }
    else if (k === 'mv') { var fm = d.f.fit, mi = arr(fm.moves).indexOf(p[1]); fm.moves = arr(fm.moves); if (mi >= 0 && fm.moves.length === 1) { toast('Choose at least one.'); return; } if (mi >= 0) fm.moves.splice(mi, 1); else fm.moves.push(p[1]); }
    else if (k === 'ck') { d.f.fit.check = obj(d.f.fit.check); d.f.fit.check[p[1]] = p[2] === '1'; }
    else if (k === 'cleared') d.f.fit.cleared = !d.f.fit.cleared;
    else return;
    suPaint();
  }
  document.addEventListener('click', function (e) {
    var s = e.target.closest && e.target.closest('[data-hm-setup]');
    if (s && s.closest('.hm')) { e.preventDefault(); openSetup(s.getAttribute('data-hm-setup')); return; }
    var t = e.target.closest && e.target.closest('button[data-hm-su]'); if (!t || !SU.open) return;
    suAct(t.getAttribute('data-hm-su'), t);
  });
  document.addEventListener('change', function (e) {
    var t = e.target; if (!SU.open || !t || !t.matches || !t.matches('input[data-hm-su]')) return;
    suAct(t.getAttribute('data-hm-su'), t);
  });
  /* Settings: Your Four as set up (or ready for tending). */
  function suSummaryHtml() {
    var sv = obj(homeRec().setup), d = sv.d && sv.d.v === 1 ? sv.d : null, res = d ? suResult(d) : null, plan = planList(S.id, S.tree);
    return '<ul class="hm-su-sum">' + TEND4.map(function (k) {
      var names = res ? res.areas[k].names : plan.filter(function (x) { return x.part === k; }).map(function (x) { return x.name; });
      return '<li style="--c:var(--' + k + ');--cs:var(--' + k + '-s)"><b>' + esc(plabel(k)) + '</b><small>' + esc(names.length ? wpList(names.slice(0, 4)) : readyLine(k)) + '</small></li>';
    }).join('') + '</ul>';
  }

  /* ---------- BLD 907: saved Home records follow re-filed practices ----------
     The tree records come forward in gg-profiles.js (GGPracticeAlias.fixVault). The Home's own records keyed by a practice
     follow the same map: later (Do Tomorrow and Another Time), rhythm, each day's fill credits ('tree:part|Name'), My
     Grounded Way Plan's prac and pend, and the setup's added and own lists. A second pass changes nothing. */
  function aliasHome(h) {
    var A = window.GGPracticeAlias, M = A && A.MAP; if (!M || !h || typeof h !== 'object') return false;
    var own = function (m, k) { return !!m && Object.prototype.hasOwnProperty.call(m, k); };
    var order = function (first) { var L = []; [first, S.tree].concat(Object.keys(M)).forEach(function (t) { if (t && M[t] && L.indexOf(t) < 0) L.push(t); }); return L; };
    var to = function (k, first) { var L = order(first); for (var i = 0; i < L.length; i++) if (own(M[L[i]], k)) return M[L[i]][k]; return k; };
    var ch = false;
    ['later', 'rhythm'].forEach(function (f) {
      var o = h[f]; if (!o || typeof o !== 'object' || Array.isArray(o)) return;
      Object.keys(o).forEach(function (k) { var nk = to(k); if (nk === k) return; if (o[nk] == null || (f === 'later' && o[k] > o[nk])) o[nk] = o[k]; delete o[k]; ch = true; });
    });
    Object.keys(obj(h.days)).forEach(function (dk) {
      var fl = h.days[dk] && h.days[dk].fill; if (!fl || typeof fl !== 'object') return;
      Object.keys(fl).forEach(function (k) { var c = k.indexOf(':'); if (c < 0) return; var tr = k.slice(0, c), pid = k.slice(c + 1); if (!own(M[tr], pid)) return; var nk = tr + ':' + M[tr][pid]; if (!fl[nk]) fl[nk] = fl[k]; delete fl[k]; ch = true; });
    });
    var list = function (o, f, first) {
      if (!o || !Array.isArray(o[f])) return; var out = [];
      o[f].forEach(function (k) { var nk = typeof k === 'string' ? to(k, first) : k; if (nk !== k) ch = true; if (out.indexOf(nk) < 0) out.push(nk); else ch = true; });
      o[f] = out;
    };
    if (h.way && typeof h.way === 'object') { list(h.way, 'prac', h.way.lead); list(h.way, 'pend', h.way.lead); }
    if (h.setup && typeof h.setup === 'object') { list(h.setup, 'added'); list(h.setup, 'own'); }
    return ch;
  }

  /* ---------- start ---------- */
  function boot() {
    mountIcons();
    if (!window.GGP) { var r = app(); if (r) r.innerHTML = welcomeHtml(); return; }
    GGP.on(function (type) { if (type === 'change' || type === 'ready') render(); else if (type === 'data' && S.id) { if (isKid(S.p)) render(); else refreshPane(); sheetSaved(); if (WP.open && WP.d) { WP.sug = null; if (WP.i <= 1) WP.d.prac = null; paintPlan(true); } } });
    // BLD 908: the door and Membership are read once this whole file has run (its later parts set their names).
    setTimeout(memberBoot, 0);
    GGP.ready.then(function () { render(); walkDoor(); walkGo(); });
  }
  window.GGHome = { render: render, lastCheckin: lastCheckin, summary: summary, v: V };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();


  /* BLD 908: what Start keeps from Tending's Today: Morning Quiet, one Flow session, one meditation, My Own Items, and Tending's own Start cards. */
  var TEND_MEMBER = /^(shop|prep|own|holidays|workouts|month|log|numbers|week|quiet)$/;
  function startTend(list) {
    if (!Array.isArray(list) || member()) return list;
    var flow = 0, med = 0;
    // Tending folds its own Start view in (field-guide/health.js with GGMember.tend); this keeps Home right either way.
    return list.filter(function (x) {
      if (!x) return false;
      if (/^(workout|cook|shop|holiday|prep|meal|supplement|mark)$/.test(x.kind || '')) return false;
      if (x.kind === 'practice') return !flow++;
      if (x.kind === 'meditation') return !med++;
      return true;
    });
  }
  var SU_START_PLAN = {
    food: 'A simple daily body practice from your tree: a walk, water, rest, and time outdoors. Membership opens Grounded Nutrition: meal plans, Grounded Cooking in your plan, and one shopping list.',
    fit: 'One Flow session a day, the day\'s pick, with a coach. Membership opens Grounded Fitness: the 12-week program, every guided workout, yoga, tai chi, and stretch.'
  };
  /* The Week for Start: the week's practices and the Tomorrow list, then one invitation for meals and movement. */
  function startWeekHtml() {
    var wp = S.id ? thisWeekHtml(planItems(false), 'week') : '';
    return (wp ? '<div class="hm-wpracs">' + wp + '</div>' : '<p class="hm-sub" style="margin:0 4px 12px">Each day brings one practice for each of the four to Today, from your growth plan, taking turns through the ones you chose.</p>') + inviteHtml('tend', 'hm-p-leaves');
  }
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
  // BLD 908: the frame closes first, so steps the tree took inside it (a Learn list, a guide) never hold Back.
  function frameDone() { if (!FRAME) return; var pushed = !!(history.state && history.state.hmFrame); closeFrame(); if (pushed) { try { history.back(); } catch (e) {} } }

  /* ---------- BLD 882: tree screens as in-app sheets ----------
     The check-in, Quick Check-in, Growth Plan, history, and the tree's practices open over the tab, with the app's
     header (the screen's name and Done) and only that screen of the tree: the tree page's own hero, part strip,
     and tab bar step aside inside the sheet (a class and a small style added to the framed page by the Home, so the
     tree page itself is unchanged everywhere else). Done, or a check-in saved, returns to the tab, redrawn. */
  var SHEET_SCREENS = { checkin: 'Check-in', quick: 'Quick Check-in', plan: 'Growth Plan', history: 'History', today: 'Your Practices' };
  var SHEET_CSS = 'html.gg-insheet body>.gg-hero,html.gg-insheet body>.gg-parts,html.gg-insheet body>nav#client-nav,html.gg-insheet body>nav.nav,html.gg-insheet body>nav.tabs,' +
    'html.gg-insheet .gg-skip,html.gg-insheet .gg-wayline,html.gg-insheet .topbar,html.gg-insheet .site-menu,html.gg-insheet .site-footer{display:none!important;}' +
    'html.gg-insheet body>main{padding-top:6px;}';
  /* BLD 912 Round 1: every check-in runs right here, through the tree's own check-in module (shared/checkin/<tree>.js,
     GGCheckin[tree].run), with the same questions, voice, and saved records as the tree page, and no tree page at all. */
  var CK_MOD = { oak: '/shared/checkin/oak.js?v=b912', sequoia: '/shared/checkin/sequoia.js?v=b912', birch: '/shared/checkin/birch.js?v=b912', pine: '/shared/checkin/pine.js?v=b912', maple: '/shared/checkin/maple.js?v=b912', aspen: '/shared/checkin/aspen.js?v=b912' };
  var CK_READY = { maple: true, aspen: true };
  function openCheckin(kind) {
    var tree = S.tree, src = CK_MOD[tree]; if (!src || !S.id || !CK_READY[tree]) return false;
    mClose();
    var fall = function () { CK_READY[tree] = false; openTreeSheet(kind === 'quick' ? 'quick' : 'checkin'); };
    load(src).then(function () {
      var M = window.GGCheckin && window.GGCheckin[tree]; if (!M || typeof M.run !== 'function') { fall(); return; }
      if (arr(M.kinds).indexOf(kind) < 0) kind = 'full';
      return arr(M.files).reduce(function (pr, f) { return pr.then(function () { return load(f); }); }, Promise.resolve()).then(function () {
        M.run({ id: S.id, kind: kind, plain: plainWording(S.id, S.tree), member: member(),
          onSaved: function (entry, info) { toast(info && info.season ? info.season : 'Check-in saved. Your tree is up to date.'); },
          onClose: function () { render(); } });
      });
    }).catch(fall);
    return true;
  }
  function openTreeSheet(what) {
    if ((what === 'checkin' || what === 'quick') && openCheckin(what === 'quick' ? 'quick' : 'full')) return;
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
    if (u.pathname === '/get-grounded-now.html') { openGGN(); return; }
    if (u.pathname === '/living-sober.html') { goTo('today'); setTimeout(function () { var c = document.getElementById('hm-sober'); if (c) c.scrollIntoView({ block: 'start', behavior: 'smooth' }); }, 120); return; }
    var own = (TREES[S.tree] || TREES.oak).href;
    if (u.pathname === own && !u.hash) { goTo('tree'); return; }
    openFrame(u);
  });
  window.addEventListener('popstate', function () { if (FRAME && !(history.state && history.state.hmFrame)) closeFrame(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && FRAME && FRAME._sheet) frameDone(); });
  window.addEventListener('message', function (e) { if (e.origin === location.origin && e.data === 'gg-home-close' && FRAME) frameDone(); });
  /* =====================================================================
     BLD 908: The one Grounded app (Chris, November 3, 2026: "i want to try to have one app not many apps.. a tree is a
     profile and decides what vids and guides etc one sees"). Maple, Aspen, Pine, Birch, Oak, and Sequoia live inside
     Home: each tree page loads shared/gg-room.js, which turns the page into a door to /home/?tree=<tree> (the old ? and
     # kept) when it is opened on its own, and lets it run as the tree room inside Home. Every tree tool opens here as a
     tree sheet (one screen, the tree's own code and records) or as the whole tree (My Tree).

     Membership (window.GGMember, shared/gg-member.js): the lock lives in one place, here. Start keeps the basic growth
     plan (one practice a day for each of the four, rotating through the practices chosen), Do Tomorrow, check-ins and
     tree growth, check-in history, one daily meditation, one daily Flow session, core Spirit, and Living Sober days 1
     to 90. Membership opens the full growth plan (every practice, custom practices, trends, practice history,
     reminders), the full Tending suite, the Meditation library, Spirit, Relationships, and seasons programs, and Stories
     in full. A Start person sees one quiet invitation card per feature, in forward words, never on a kid screen.
     Saved in the home record: custom: [{id, part, n, r, min, how, at}] (Member custom practices).
     ===================================================================== */
  function member() { try { return !!(window.GGMember && typeof window.GGMember.has === 'function' && window.GGMember.has()); } catch (e) { return false; } }
  function mSection(name) { try { return window.GGMember && typeof window.GGMember.get === 'function' ? window.GGMember.get(name) : null; } catch (e) { return null; } }
  function mCode() { if (window.GGMember && typeof window.GGMember.open === 'function') { try { window.GGMember.open(); return; } catch (e) {} } location.href = '/the-grounded-way.html#ways'; }
  var MEMBER_URL = '/the-grounded-way.html#ways';
  var INVITE = {
    plan: ['The Full Growth Plan', 'Membership opens every practice you choose, each day, plus your own custom practices, trends, practice history, and reminders.'],
    tend: ['Grounded Nutrition and Grounded Fitness', 'Membership opens meal plans, My Menu, one shopping list, Sunday Together Prep, Grounded Cooking in your plan, health numbers, the 12-week program, and every guided workout with a coach.'],
    library: ['Grow Deeper', 'Membership opens the Grounded Meditation library, Grounded Spirit programs, Grounded Relationships programs, Grounded Seasons, and every Grounded Story read aloud.'],
    numbers: ['Your Health Numbers', 'Membership opens Labs, the LDL Path, My Heart Risk, and PREVENT, kept on this device inside your locked profile.'],
    sober: ['Living Sober, the Whole Year', 'Membership opens daily words for every day of the year, Living Sober Together, and My Week trends.']
  };
  function inviteHtml(id, cls) {
    var x = INVITE[id]; if (!x) return '';
    return '<article class="hm-card hm-invite ' + (cls || 'hm-p-trunk') + '" data-hm-inv="' + id + '">' + pb(IMG + 'growth-plan-sq.webp') + '<div style="flex:1;min-width:0"><div class="hm-k">Membership</div><h3 class="hm-h3">' + esc(x[0]) + '</h3><p class="hm-sub">' + esc(x[1]) + '</p>' +
      '<div class="hm-acts tight"><a class="hm-btn sm hm-pill" href="' + MEMBER_URL + '" data-hm-mlink="1">' + I('arrow') + 'See Membership</a><button type="button" class="hm-btn sm line hm-pill" data-hm-mcode="1">' + I('lock') + 'I Have a Code</button></div></div></article>';
  }

  /* ---------- the basic growth plan (Start) and the full plan (Member) ---------- */
  /* Start: one practice a day for each of the four. The daily practices chosen for an area take turns, one each day;
     one already done today, or moved here from yesterday with Do Tomorrow, keeps its place. */
  function tierPlan(items, kid) {
    if (member()) return items.concat(customItems(kid));
    var later = obj(homeRec().later), td = today(), out = [], hid = 0, day = dayIndex();
    TEND4.forEach(function (k) {
      var all = items.filter(function (x) { return x.part === k; }); if (!all.length) return;
      var daily = all.filter(function (x) { return x.r === 'd'; }), pool = daily.length ? daily : all;
      var keep = pool.filter(function (x) { return x.doneToday || x.pressed; })[0] || pool.filter(function (x) { return later[x.pid] === td; })[0] || pick(pool, day);
      if (keep.r !== 'd') keep.r = 'd';
      out.push(keep); hid += all.length - 1;
    });
    S.planMore = hid;
    return out;
  }
  function customList() { var h = homeRec(); if (!Array.isArray(h.custom)) h.custom = []; return h.custom; }
  function customItems(kid) {
    var t = tendGet(S.id, S.tree), plain = plainWording(S.id, S.tree);
    return customList().filter(function (c) { return c && c.n && isTend(c.part); }).map(function (c) {
      var pid = c.part + '|' + c.n, r = okR(c.r) ? c.r : 'd', sl = PART_SLOT[c.part] || [12, 'Midday'], dToday = practiceDone(t, pid), dw = r === 'w' || r === 'f' ? doneThisWeek(t, pid) : '', cnt = r === 'f' ? weekCount(t, pid) : 0, x = r === 'f' ? 3 : null;
      var steps = String(c.how || '').split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean);
      return { key: 'p:' + pid, pid: pid, part: c.part, mpart: c.part, src: 'plan', kind: 'custom', hour: sl[0], when: sl[1] + ' · ' + plabel(c.part, plain), title: c.n, sub: 'Your own custom practice.', btn: 'How', tint: c.part,
        done: r === 'w' ? !!dw : r === 'f' ? cnt >= 3 : dToday, pressed: dToday, x: x, cnt: cnt, image: practiceArt(c.part, c.n), r: r, steps: steps, howTxt: steps.length ? '' : 'Your own practice, in your own way.', min: num(c.min), doneToday: dToday, doneWeek: dw, last: lastDone(t, pid), kid: !!kid };
    });
  }
  /* Every check-in for the tree, oldest first (the same reading lastCheckin makes). */
  function checkinsOf(id, tree) {
    var out = [], ck = lastCheckin(id, tree); if (!ck) return out;
    var v = GGP.data(id) || {};
    if (tree === 'maple' || tree === 'aspen') { var src = tree === 'maple' ? arr(obj(obj(v.maple).kid).checkins) : arr(obj(obj(v.aspen).student).rings); src.forEach(function (c) { if (c && c.answers && !c.from) { var s = {}; PARTS.forEach(function (p) { var x = obj(c.answers[p.k]).score; if (typeof x === 'number') s[p.k] = x; }); out.push({ date: String(c.date || '').slice(0, 10), scores: s }); } }); }
    else arr(obj(v[tree]).history).forEach(function (e) { if (e && e.scores && !e.from) out.push({ date: String(e.date || '').slice(0, 10), scores: e.scores, type: e.type === 'quick' ? 'quick' : 'full' }); });
    return out.filter(function (e) { return /^\d{4}-\d{2}-\d{2}$/.test(e.date); }).sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
  }
  /* Trends: each part's check-in scores over time, a small line per part (Member). */
  function trendsHtml() {
    var list = checkinsOf(S.id, S.tree).slice(-12);
    if (list.length < 2) return '<p class="hm-sub">Your trends draw a line for each part once you have two check-ins.</p>';
    var W0 = 220, H0 = 46;
    var rows = PART_KEYS.map(function (k) {
      var pts = list.map(function (e, i) { var s = num(e.scores[k]); return s == null ? null : [Math.round(8 + i * (W0 - 16) / (list.length - 1)), Math.round(H0 - 6 - (s / 10) * (H0 - 12))]; }).filter(Boolean);
      if (pts.length < 2) return '';
      var first = num(list[0].scores[k]), last = num(list[list.length - 1].scores[k]), word = last - first >= 1 ? 'Growing' : first - last >= 1 ? 'Ready for tending' : 'Steady';
      return '<li class="hm-trow" style="--c:var(--' + k + ')"><span class="tx"><b>' + esc(plabel(k)) + '</b><small>' + word + '</small></span><svg viewBox="0 0 ' + W0 + ' ' + H0 + '" role="img" aria-label="' + esc(plabel(k) + ': ' + word) + '"><polyline fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="' + pts.map(function (p) { return p.join(','); }).join(' ') + '"/>' + '<circle cx="' + pts[pts.length - 1][0] + '" cy="' + pts[pts.length - 1][1] + '" r="4" fill="currentColor"/></svg></li>';
    }).join('');
    return '<p class="hm-sub">' + list.length + ' check-ins, from ' + esc(niceDate(list[0].date)) + ' to ' + esc(niceDate(list[list.length - 1].date)) + '.</p><ul class="hm-trends">' + rows + '</ul>';
  }
  /* Practice history: the days each of the four was tended, week by week, the last eight weeks (Member). */
  function historyHtml() {
    var t = tendGet(S.id, S.tree), days = obj(t && t.days), td = today(), st = addDays(td, -((parse(td).getDay() + 6) % 7) - 49);
    var cols = []; for (var w = 0; w < 8; w++) cols.push(addDays(st, w * 7));
    var rows = TEND4.map(function (k) {
      var cells = cols.map(function (s) { var n = 0; for (var i = 0; i < 7; i++) { var d = addDays(s, i); if (d > td) break; var x = days[d]; if (x && arr(x.d).some(function (p) { return String(p).indexOf(k + '|') === 0; })) n++; } return n; });
      return '<li class="hm-hrow" style="--c:var(--' + k + ')"><span class="tx"><b>' + esc(plabel(k)) + '</b></span><span class="hm-hbars" aria-label="' + esc(plabel(k) + ': ' + cells.join(', ') + ' days a week, the last eight weeks') + '">' + cells.map(function (n) { return '<i style="--h:' + Math.round(n / 7 * 100) + '%" title="' + n + (n === 1 ? ' day' : ' days') + '"></i>'; }).join('') + '</span></li>';
    }).join('');
    return '<p class="hm-sub">The days you tended each part, week by week, the last eight weeks.</p><ul class="hm-hist">' + rows + '</ul>';
  }
  /* Reminders: a calendar file for the daily practices, each at its time of day (Member). Nothing leaves the device. */
  function icsText(items) {
    var pad2 = function (n) { return String(n).padStart(2, '0'); }, d = parse(today()), base = d.getFullYear() + pad2(d.getMonth() + 1) + pad2(d.getDate());
    var stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
    var clean = function (s) { return String(s || '').replace(/[\\;,]/g, function (c) { return '\\' + c; }).replace(/\n/g, '\\n'); };
    var ev = items.map(function (x, i) {
      var hr = Math.floor(x.hour), mn = Math.round((x.hour - hr) * 60) % 60, dur = Math.max(5, x.min || 10), end = hr * 60 + mn + dur;
      return ['BEGIN:VEVENT', 'UID:gg-' + base + '-' + i + '-' + hid(x.key) + '@growwithgrounded.com', 'DTSTAMP:' + stamp, 'DTSTART:' + base + 'T' + pad2(hr) + pad2(mn) + '00', 'DTEND:' + base + 'T' + pad2(Math.floor(end / 60) % 24) + pad2(end % 60) + '00',
        'RRULE:FREQ=' + (x.r === 'w' ? 'WEEKLY' : 'DAILY'), 'SUMMARY:' + clean(x.title), 'DESCRIPTION:' + clean(plabel(x.part) + '. ' + (x.steps && x.steps.length ? x.steps.join(' ') : x.howTxt || x.sub || '') + ' The Grounded Way.'), 'BEGIN:VALARM', 'TRIGGER:-PT5M', 'ACTION:DISPLAY', 'DESCRIPTION:' + clean(x.title), 'END:VALARM', 'END:VEVENT'].join('\r\n');
    });
    return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Grow With Grounded//The Grounded Way//EN', 'CALSCALE:GREGORIAN'].concat(ev).concat(['END:VCALENDAR']).join('\r\n') + '\r\n';
  }
  function remindItems() { return planItems(false).filter(function (x) { return x.r === 'd' || x.r === 'w'; }); }
  function saveReminders() {
    var items = remindItems(); if (!items.length) { toast('Choose a practice in your growth plan first.'); return; }
    var blob = new Blob([icsText(items)], { type: 'text/calendar' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'grounded-way-reminders.ics'; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    toast('Your reminders are ready for your calendar.');
  }
  var RNAME = { d: 'Daily', f: 'A Few Times a Week', w: 'Weekly', n: 'Now and Then' };
  function customHtml() {
    var L = customList(), plain = plainWording(S.id, S.tree);
    var rows = L.map(function (c) { return '<li><span class="dot" style="background:var(--' + esc(c.part) + ')" aria-hidden="true"></span><span class="tx"><b>' + esc(c.n) + '</b><small>' + esc(plabel(c.part, plain)) + ' · ' + esc(RNAME[c.r] || 'Daily') + (c.min ? ' · about ' + esc(c.min) + ' minutes' : '') + '</small></span><button type="button" class="hm-linkbtn" data-hm-cdel="' + esc(c.id) + '" aria-label="Remove ' + esc(c.n) + '">Remove</button></li>'; }).join('');
    var opts = TEND4.map(function (k) { return '<option value="' + k + '">' + esc(plabel(k, plain)) + '</option>'; }).join('');
    return (rows ? '<ul class="hm-clist">' + rows + '</ul>' : '<p class="hm-sub">Add a practice of your own, with its own rhythm and steps. It joins Today beside your growth plan.</p>') +
      '<form class="hm-cform" id="hm-cform" autocomplete="off"><label><span>Name</span><input type="text" id="hm-cn" maxlength="60" required placeholder="Evening walk with the dog"></label>' +
      '<label><span>Part</span><select id="hm-cp">' + opts + '</select></label>' +
      '<label><span>How often</span><select id="hm-cr"><option value="d">Daily</option><option value="f">A Few Times a Week</option><option value="w">Weekly</option><option value="n">Now and Then</option></select></label>' +
      '<label><span>Minutes</span><input type="number" id="hm-cm" min="1" max="240" inputmode="numeric" placeholder="10"></label>' +
      '<label class="wide"><span>Steps, one per line</span><textarea id="hm-ch" rows="2" maxlength="600"></textarea></label>' +
      '<div class="hm-acts tight wide"><button type="submit" class="hm-btn sm hm-pill">' + I('plus') + 'Add My Practice</button></div></form>';
  }
  function memberGrowHtml() {
    if (isKid(S.p)) return '';
    if (!member()) return inviteHtml('plan');
    var ART_M = { 'hm-phist': IMG + 'tending-sq.webp', 'hm-custom': IMG + 'way-plan-sq.webp', 'hm-remind': IMG + 'quiet-morning-sq.webp' };
    var card = function (cls, ey, title, body, id) { return '<article class="hm-card hm-gcard ' + cls + '" id="' + id + '"><div class="hm-hd">' + pb(ART_M[id] || IMG + 'growth-plan-sq.webp') + '<div><div class="hm-time">' + esc(ey) + '</div><h3 class="hm-h3">' + esc(title) + '</h3></div></div>' + body + '</article>'; };
    return card('hm-p-leaves hm-mcard', 'Membership', 'Practice History', historyHtml(), 'hm-phist') +
      card('hm-p-roots hm-mcard', 'Membership', 'My Custom Practices', customHtml(), 'hm-custom') +
      card('hm-p-branches hm-mcard', 'Membership', 'Reminders', '<p class="hm-sub">A calendar file with each daily and weekly practice at its time of day, with a gentle alert five minutes before. Save it once, and your phone keeps the rhythm.</p><div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-remind="1">' + I('clock') + 'Save My Reminders</button></div>', 'hm-remind');
  }

  /* ---------- My Tree: every tool of the profile's tree, inside Home ---------- */
  var TOOLS = {
    common: [['checkin', 'check', 'Check-in'], ['quick', 'clock', 'Quick Check-in'], ['plan', 'sprout', 'Growth Plan'], ['week', 'calendar', 'Week'], ['history', 'clock', 'Season and Rings'], ['life', 'book', 'When Life Changes'], ['learn', 'play', 'Learn'], ['settings', 'gear', 'Tree Settings']],
    pine: [['next', 'arrow', 'Next Steps']], birch: [['ground', 'arrow', 'Groundwork']], sequoia: [['legacy', 'book', 'Legacy Book']]
  };
  var ROOM_HASH = { week: '#week', life: '#life', next: '#next', ground: '#groundwork', legacy: '#legacy', today: '#today', guide: '#guide' };
  SHEET_SCREENS.week = 'Week'; SHEET_SCREENS.life = 'When Life Changes'; SHEET_SCREENS.next = 'Next Steps'; SHEET_SCREENS.ground = 'Groundwork'; SHEET_SCREENS.legacy = 'Legacy Book'; SHEET_SCREENS.settings = 'Tree Settings'; SHEET_SCREENS.guide = 'For Grown-ups';
  function toolsOf(tree) {
    var t = TREES[tree] || TREES.oak, L = TOOLS.common.filter(function (x) { return t.ck || (x[0] !== 'quick' && x[0] !== 'checkin' && x[0] !== 'plan' && x[0] !== 'week' && x[0] !== 'history'); });
    return L.slice(0, 5).concat(TOOLS[tree] || []).concat(L.slice(5));
  }
  function myTreeHtml() {
    if (isKid(S.p)) return '';
    var t = TREES[S.tree] || TREES.oak;
    return '<article class="hm-card hm-p-leaves hm-mytree" id="hm-mytree"><div class="hm-hd">' + pb(treeArt(S.tree)) + '<div><div class="hm-k">My ' + esc(t.n) + '</div><div class="hm-sub">Every ' + esc(t.n) + ' tool, right here in The Grounded Way.</div></div></div>' +
      '<div class="hm-tools">' + toolsOf(S.tree).map(function (x) { var lb = x[2] + (/ $/.test(x[2]) ? t.n : ''); return '<button type="button" class="hm-tool" data-hm-tool="' + x[0] + '">' + I(x[1]) + '<span>' + esc(lb) + '</span></button>'; }).join('') + '</div>' +
      '<p class="hm-sub hm-otrees">Open another tree here, for a child, a student, or someone you help: ' + ['maple', 'aspen', 'pine', 'birch', 'oak', 'sequoia'].filter(function (k) { return k !== S.tree; }).map(function (k) { return '<button type="button" class="hm-linkbtn" data-hm-look="' + k + '">' + esc(TREES[k].n) + '</button>'; }).join(' ') + '</p></article>';
  }
  /* A tree tool: a known screen opens as a tree sheet; the rest open inside the whole tree. */
  function openTool(what, tree) {
    tree = tree || S.tree; var t = TREES[tree] || TREES.oak;
    if (what === 'learn') { if (tree === S.tree) goTo(isKid(S.p) ? 'watch' : 'learn'); else openRoom(tree, '', ''); return; }
    if (what === 'whole') { if (tree === S.tree) goTo(isKid(S.p) ? 'today' : 'grow'); else openRoom(tree, '', ''); return; }
    if (what === 'settings' && tree === S.tree && openScreen('settings', tree)) return;
    if (what === 'video' || what === 'settings') {
      openFrame(new URL(t.href, location.href), true, function (win) {
        var tries = 0; (function go() {
          try {
            if (what === 'settings') { if (win.document.getElementById('gt-settings')) return; var sb = win.document.querySelector('button[onclick*="openSettings"]'); if (sb && sb.offsetParent && tries > 3) sb.click(); }
            if (what === 'video') { var b = win.document.querySelector('[data-gg-watch]:not([hidden])'); if (b) { b.click(); return; } }
          } catch (e) { return; }
          if (++tries < 60) setTimeout(go, 150);
        })();
      }, what === 'settings' ? { what: what, title: SHEET_SCREENS.settings, kick: 'My ' + t.n } : null);
      return;
    }
    if (tree === S.tree && SCR_MOD[what] && openScreen(what, tree)) return;
    if (ROOM_HASH[what] && !(what === 'today')) { if (tree === S.tree) openTreeSheet(what); else openRoom(tree, '', ROOM_HASH[what]); return; }
    if (tree === S.tree) openTreeSheet(what); else openRoom(tree, '', '');
  }
  /* BLD 912 Round 2: the tree's own screens (Tree Settings, Week, Groundwork, Next Steps, Legacy Book, For Grown-ups,
     the kids' talks) run here in Home's window through a screen module (shared/home/<name>.js, GGScreen[name].open). */
  var SCR_MOD = { settings: '/shared/home/settings.js?v=b912', week: '/shared/home/week.js?v=b912', ground: '/shared/home/groundwork.js?v=b912', next: '/shared/home/nextsteps.js?v=b912', legacy: '/shared/home/legacy.js?v=b912', guide: '/shared/home/grownup.js?v=b912', talk: '/shared/home/talk.js?v=b912' };
  var SCR_READY = {};
  var SCR_CTL = null;
  function openScreen(name, tree, extra) {
    tree = tree || S.tree; var src = SCR_MOD[name]; if (!src || !S.id || !SCR_READY[name]) return false;
    mDialog(SHEET_SCREENS[name] || 'Grounded', '<p class="hm-loading">Opening…</p>');
    var fail = function () { SCR_READY[name] = false; mClose(); toast('That screen is still on its way. Please try again.'); };
    load(src).then(function () {
      var M = window.GGScreen && GGScreen[name]; if (!M || typeof M.open !== 'function' || (M.trees && M.trees.indexOf(tree) < 0)) { fail(); return; }
      var files = typeof M.files === 'function' ? M.files(tree) : arr(M.files);
      return files.reduce(function (pr, f) { return pr.then(function () { return load(f); }); }, Promise.resolve()).then(function () {
        var host = document.getElementById('hm-mdlg-b'); if (!host) return;
        var t = document.getElementById('hm-mdlg-t'); if (t && typeof M.title === 'function') t.textContent = M.title(tree, extra) || t.textContent;
        host.innerHTML = '';
        var ctx = { id: S.id, tree: tree, host: host, plain: plainWording(S.id, tree), member: member(),
          toast: toast, close: function () { mClose(); render(); }, changed: function () { if (window.GGP && GGP.get) S.p = GGP.get(S.id) || S.p; S.tree = treeOfProfile(S.p) || S.tree; render(); },
          openHome: function (what) { mClose(); screenGo(what); } };
        if (extra) Object.keys(extra).forEach(function (k) { ctx[k] = extra[k]; });
        SCR_CTL = M.open(ctx) || null;
      });
    }).catch(fail);
    return true;
  }
  function screenGo(what) {
    what = String(what || '');
    if (what === 'checkin' || what === 'quick') { openTreeSheet(what); return; }
    if (what === 'history') { seasonOpen(); return; }
    if (what === 'plan') { goTo('grow'); return; }
    if (what === 'learn') { goTo(isKid(S.p) ? 'watch' : 'learn'); return; }
    if (/^guide:/.test(what)) { openGuide(what.slice(6)); return; }
    openTool(what);
  }
  /* The whole tree inside Home, with its own tabs (and any old address it was given). */
  function openRoom(tree, q, hash) {
    var t = TREES[tree]; if (!t) return;
    openFrame(new URL(t.href + (q ? '?' + q : '') + (hash || ''), location.href));
  }

  /* ---------- the doors: /home/?tree=<tree> from /<tree>/ (shared/gg-room.js) ---------- */
  var ROOM_TREES = /^(maple|aspen|pine|birch|oak|sequoia)$/;
  var DOOR_SHEET = { '#checkin': 'checkin', '#quick': 'quick', '#plan': 'plan', '#season': 'history', '#progress': 'history', '#week': 'week', '#today': 'today', '#life': 'life', '#legacy': 'legacy', '#groundwork': 'ground', '#ground': 'ground', '#next': 'next', '#nextsteps': 'next' };
  var DOOR;
  /* BLD 911 (Chris: "you will need to hard sweep the entire site"): addresses that open a place inside the app, never a tree page.
       /home/?sober=1              turns Living Sober on (with no profile, the welcome starts with it chosen)
       /home/?sober=learn          the same, then Learn opens on the Living Sober lessons
       /home/?guide=<id>&tree=<t>  plays a When Life Changes guide in the window (the profile's tree, else <t>)
       /home/?lesson=<id>&tree=<t> plays a lesson in the window */
  var GO = null;
  function readGo() {
    var sp; try { sp = new URLSearchParams(location.search); } catch (e) { return; }
    var so = sp.get('sober'), gd = sp.get('guide'), ls = sp.get('lesson'), tr = sp.get('tree');
    if (!so && !gd && !ls) return;
    GO = { sober: so || '', guide: gd || '', lesson: ls || '', tree: ROOM_TREES.test(tr || '') ? tr : '', done: false };
    if (GO.sober) W.parts.sober = true;
    if (GO.tree) W.stage = GO.tree;
    // Living Sober's own tools (shared/gg-sober.js) read ?sober= themselves, so a sober link keeps it until they do.
    try { history.replaceState(null, '', location.pathname + (GO.sober && GO.sober !== 'learn' ? '?sober=' + encodeURIComponent(GO.sober) : '') + (location.hash || '')); } catch (e) {}
  }
  function walkGo() {
    if (!GO || GO.done) return; GO.done = true;
    var g = GO, a = window.GGP && GGP.active && GGP.active();
    if (g.sober && a) { var h = homeRec(); if (h.parts.indexOf('sober') < 0) { h.parts.push('sober'); saveHome(); } }
    if (g.sober === 'learn' && a) { toast('Living Sober is on.'); LT.q = 'Healthy Tree'; goTo('learn'); return; }
    if (g.sober) { soberTools(); if (a) goTo('today'); return; }
    if (!a && g.tree) S.tree = g.tree;
    if (g.guide) { if (a && !isKid(S.p)) goTo('learn'); playGuide(g.guide, '', g.tree); }
    else if (g.lesson) { if (a && !isKid(S.p)) goTo('learn'); playTreeLesson(g.lesson); }
  }
  /* Living Sober's tools in Home (BLD 911): the same shared module the trees used, opened right here (no tree page):
     My Anchor Plan, Healthy People, Strong on Your Own, My Good People, Sleep, Food, and Movement, and Loving Someone. */
  var SOBER_JS = ['/shared/gg-life.js?v=b907', '/shared/gg-sober.js?v=b908'];
  function soberTree() { return /^(birch|oak|sequoia)$/.test(S.tree) ? S.tree : 'oak'; }
  function soberTools(kind) {
    var go = function () {
      if (!window.GGSober) return;
      if (!soberTools.on) { soberTools.on = true; try { GGSober.init(soberTree(), { open: function () {}, create: function () { return GGP.createDialog().then(function () { render(); }); }, openProfile: function () { return GGP.openDialog().then(function () { render(); }); }, helper: function () { return false; } }); } catch (e) { console.error(e); } }
      if (kind === 'anchor') GGSober.anchor(soberTree(), false); else if (kind) GGSober.together(soberTree(), kind);
    };
    return load(WORDS_SRC).then(function () { return load(SOBER_JS[0]); }).then(function () { return load(SOBER_JS[1]); }).then(go).catch(function () {});
  }
  function readDoor() {
    DOOR = null;
    if (GO === null) readGo();
    var sp; try { sp = new URLSearchParams(location.search); } catch (e) { return; }
    var tree = sp.get('tree'); if (!tree || !ROOM_TREES.test(tree)) return;
    sp.delete('tree');
    var h = location.hash || '';
    DOOR = { tree: tree, q: sp.toString(), hash: h, done: false };
    W.stage = tree;
    try { history.replaceState(null, '', location.pathname + (/^#(today|week|grow|library|me)\b/.test(h) && !DOOR.q ? h : '')); } catch (e) {}
  }
  /* Called once the profile state is known. With no profile, a tree screen named in the old address (a guide, a lesson,
     a visit or a talk) opens inside Home at once; with a profile, a known screen opens as a tree sheet. */
  function walkDoor() {
    if (!DOOR || DOOR.done) return; DOOR.done = true;
    var d = DOOR, a = window.GGP && GGP.active && GGP.active(), h = decodeURIComponent(d.hash || ''), guided = /(^|&)guided=(checkin|quick|plan)\b/.exec(d.q || '');
    if (!a) { if (h || d.q) openRoom(d.tree, d.q, d.hash); else { var b = document.querySelector('[data-hm-stage="' + d.tree + '"]'); if (b) b.setAttribute('aria-pressed', 'true'); } return; }
    var mine = d.tree === S.tree;
    if (mine && guided && !h) { openTreeSheet(guided[2]); return; }
    if (mine && !d.q && (!h || h === '#')) { if (isKid(S.p)) goTo('tree'); return; }
    if (mine && !d.q && DOOR_SHEET[h] && !isKid(S.p)) { openTool(DOOR_SHEET[h] === 'today' ? 'today' : DOOR_SHEET[h]); return; }
    openRoom(d.tree, d.q, d.hash);
  }

  /* ---------- Member content shelves (Library): read from GGMember.get(section) ---------- */
  var MSHELVES = [
    { id: 'meditation', name: 'Grounded Meditation', line: 'Guided meditations for sleep, worry, grief, focus, and more.', art: IMG + 'quiet-meditation.webp', cls: 'hm-sh-quiet' },
    { id: 'spirit', name: 'Grounded Spirit', line: 'Deeper guided programs for your connection with God and the sacred, in your own tradition or your own way.', art: IMG + 'tend-spirit.webp', cls: 'hm-sh-learn' },
    { id: 'relationships', name: 'Grounded Relationships', line: 'Listening, repair, unplugged time, family dinner, and a weekly connection plan.', art: IMG + 'tend-people.webp', cls: 'hm-sh-life' },
    { id: 'seasons', name: 'Grounded Seasons', line: 'Guided programs for the seasons of life, and Living Sober for the whole year.', art: HERO + 'page-hard-seasons-narrow.webp', cls: 'hm-sh-life' }
  ];
  /* A section may be a list of items, {items: [...]}, or {programs: [{title, items or sessions}]}; items carry scenes. */
  function mItems(name) {
    var x = mSection(name); if (!x) return [];
    var out = [], take = function (it, prog) { if (it && it.id && (it.title || it.h)) out.push({ id: it.id, title: it.title || it.h, mins: it.mins, need: it.need || prog || it.program || '', tradition: it.tradition || '', session: it.session, area: it.area || '', scenes: it.scenes, item: it }); };
    if (Array.isArray(x)) x.forEach(function (i) { take(i); });
    else {
      arr(x.items).forEach(function (i) { take(i); });
      arr(x.lessons).forEach(function (i) { take(i); });
      arr(x.programs).forEach(function (p) { arr(p.items || p.sessions).forEach(function (i) { take(i, p.title || p.id); }); });
    }
    return out;
  }
  function mShelfHtml() {
    if (!member()) return '';
    return MSHELVES.filter(function (s) { return s.id !== 'meditation'; }).map(function (s) { var n = mItems(s.id).length; return shelfHtml({ id: 'm-' + s.id, name: s.name, count: n ? n + (n === 1 ? ' session' : ' sessions') : 'Membership', plain: 'Membership', line: s.line, cls: s.cls, art: s.art }); }).join('');
  }
  function openMShelf(id) {
    var s = MSHELVES.filter(function (x) { return x.id === id; })[0]; if (!s) return;
    var L = mItems(id), groups = {}, trad = {}, md = obj(homeRec().mdone);
    // Programs by tradition wait in their own list, opened and chosen by the person; never suggested or preselected.
    L.forEach(function (x) { var g = x.need || 'More', box = x.tradition ? trad : groups; (box[g] = box[g] || []).push(x); });
    var grp = function (G) { return Object.keys(G).map(function (g) { return '<h3 class="hm-label">' + esc(g.charAt(0).toUpperCase() + g.slice(1)) + '</h3><ul class="hm-mlist">' + G[g].map(function (x) { var dn = !!md[id + '|' + x.id]; return '<li><button type="button" data-hm-mplay="' + esc(id + '|' + x.id) + '"' + (dn ? ' class="done"' : '') + '>' + I(dn ? 'check' : 'play') + '<span><b>' + esc(x.title) + '</b><small>' + (x.mins ? 'About ' + esc(x.mins) + ' minutes' : '') + (dn ? (x.mins ? ' · ' : '') + 'Finished' : '') + '</small></span></button></li>'; }).join('') + '</ul>'; }).join(''); };
    var body = (id === 'relationships' && L.length ? hhPickHtml() : '') + (L.length ? grp(groups) + (Object.keys(trad).length ? '<details class="hm-trad"><summary>By Tradition</summary><p class="hm-sub">Programs from one tradition, labeled. Open the one you choose.</p>' + grp(trad) + '</details>' : '')
      : '<p class="hm-sub">' + esc(s.name) + ' fills in here as soon as the Member library opens on this device.</p>');
    mDialog(s.name, body);
  }
  function mDialog(title, body) {
    var old = document.getElementById('hm-mdlg'); if (old) old.remove();
    var w = document.createElement('div'); w.id = 'hm-mdlg'; w.className = 'hm-sheetwrap';
    w.innerHTML = '<div class="hm-sheet-bg" data-hm-mclose="1"></div><section class="hm-sheet tall" role="dialog" aria-modal="true" aria-labelledby="hm-mdlg-t" tabindex="-1"><div class="hm-sh-hd"><span></span><h2 class="hm-h2" id="hm-mdlg-t">' + esc(title) + '</h2><button type="button" class="hm-x" data-hm-mclose="1" aria-label="Close">' + I('plus') + '</button></div><div class="hm-sheet-body" id="hm-mdlg-b">' + body + '</div></section>';
    (document.querySelector('main.hm') || document.body).appendChild(w);
    document.documentElement.classList.add('hm-sheeted');
    setTimeout(function () { try { w.querySelector('.hm-sheet').focus({ preventScroll: true }); } catch (e) {} }, 30);
  }
  function mClose() { if (SCR_CTL && typeof SCR_CTL.close === 'function') { try { SCR_CTL.close(); } catch (e) {} } SCR_CTL = null; if (M_CTL && typeof M_CTL.stop === 'function') { try { M_CTL.stop(); } catch (e) {} } M_CTL = null; var w = document.getElementById('hm-mdlg'); if (w) { w.remove(); if (!document.getElementById('hm-sheet')) document.documentElement.classList.remove('hm-sheeted'); if (window.GGLearn && GGLearn.close) { try { GGLearn.close(true); } catch (e) {} } } }
  var LEARN_JS = '/shared/gg-learn.js?v=b911b';
  function mPlay(key) {
    var c = key.indexOf('|'), sec = key.slice(0, c), id = key.slice(c + 1), x = mItems(sec).filter(function (i) { return i.id === id; })[0]; if (!x) return;
    if (sec === 'relationships') x = altFor(x, hhKind());
    var b = document.getElementById('hm-mdlg-b'); if (!b) return;
    b.innerHTML = '<div class="hm-mplayer" id="hm-mplayer"><p class="hm-loading">Opening ' + esc(x.title) + '…</p></div>';
    load(LEARN_JS).then(function () {
      var host = document.getElementById('hm-mplayer'); if (!host || !window.GGLearn || !GGLearn.player) return;
      playLesson(host, Object.assign({ id: x.id, title: x.title, scenes: arr(x.scenes) }, x.item), function () { var h = homeRec(); if (!h.mdone || typeof h.mdone !== 'object') h.mdone = {}; h.mdone[key] = today(); saveHome(); });
    });
  }
  /* Relationships: scenes carry alt wording per household kind ({group: {beats, say, h, sub, items}}, sometimes couple);
     the family wording is the main one. The person chooses For My Family, For Us Two, or For Our Group (home record hhKind). */
  var HH_KINDS = [['family', 'For My Family'], ['couple', 'For Us Two'], ['group', 'For Our Group']];
  function hhKind() { var k = homeRec().hhKind; return k === 'couple' || k === 'group' ? k : 'family'; }
  function altFor(x, kind) {
    if (kind === 'family') return x;
    var item = JSON.parse(JSON.stringify(x.item || {}));
    item.scenes = arr(item.scenes || x.scenes).map(function (sc) { var a = sc && sc.alt && sc.alt[kind]; if (!a) return sc; ['beats', 'say', 'h', 'sub', 'items'].forEach(function (f) { if (a[f] != null) sc[f] = a[f]; }); return sc; });
    return Object.assign({}, x, { item: item, scenes: item.scenes });
  }
  function hhPickHtml() { var k = hhKind(); return '<div class="hm-acts tight" role="group" aria-label="Who this is for">' + HH_KINDS.map(function (h) { return '<button type="button" class="hm-btn sm hm-pill' + (h[0] === k ? '' : ' line') + '" aria-pressed="' + (h[0] === k) + '" data-hm-hh="' + h[0] + '">' + esc(h[1]) + '</button>'; }).join('') + '</div>'; }
  /* One lesson in the shared player (STD's call: a one-lesson support track). */
  // BLD 911 (Chris: "close the box with the x it no longer stops playing"): the dialog's player stops when the dialog closes.
  var M_CTL = null;
  function playLesson(host, lesson, onDone, track) {
    var tr = track || { id: 'hm-' + lesson.id, kind: 'support', title: lesson.title, lessons: [lesson] }, app = ROOM_TREES.test(S.tree) ? S.tree : 'site';
    // BLD 911: the voice the tree recorded this lesson in (Jenny or Brian), so every line plays its recording.
    var vo = lesson.voice || (track && app !== 'site' && GGLearn.recVoice ? GGLearn.recVoice({ app: app, lesson: lesson, track: tr }, true) : '') || 'brian';
    try { M_CTL = GGLearn.player(host, { app: app, lesson: lesson, track: tr, tracks: [tr], voice: vo, clip: !track && window.GGMember && GGMember.has() && lesson.tier !== 'start' ? GGMember.clip : null, done: {}, onDone: onDone || null }); }
    catch (e) { if (window.console) console.error(e); host.innerHTML = '<p class="hm-sub">This session opens in a moment. Please try again.</p>'; }
  }

  /* The one daily meditation (Start and Member alike): the day's pick from the Start rotation (shared/start-videos.js). */
  var START_JS = '/shared/start-videos.js?v=b908';
  function dailyMed(sec) { var V0 = window.GG_START_VIDEOS, L = arr(obj(obj(obj(V0).sections)[sec || 'meditation']).lessons).filter(function (l) { return l && l.rotate; }); if (!L.length) return null; var n = L.length, want = (dayIndex() % n) + 1; return L.filter(function (l) { return +l.rotate === want; })[0] || pick(L, dayIndex()); }
  function dailyMedHtml() {
    if (isKid(S.p)) return '';
    var x = window.GG_START_VIDEOS ? dailyMed() : null;
    if (!window.GG_START_VIDEOS) load(START_JS).then(function () { var el = document.getElementById('hm-dmed'); if (el && dailyMed()) el.outerHTML = dailyMedHtml(); });
    return dailySpiritHtml() + '<article class="hm-card hm-p-bark hm-dmed" id="hm-dmed"><div class="hm-hd">' + pb(IMG + 'quiet-meditation-sq.webp') + '<div style="min-width:0"><div class="hm-k">Today\'s Meditation</div><h3 class="hm-h3">' + esc(x ? x.title : 'A Few Quiet Minutes') + '</h3></div></div><p class="hm-sub">' + esc(x ? (x.mins ? 'About ' + x.mins + ' minutes. ' : '') + (x.blurb || '') : 'A guided meditation for today, with a calm voice.') + '</p>' +
      '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-dmed="1">' + I('play') + 'Begin</button></div></article>';
  }
  /* Core Spirit (Start): the day's Spirit session when shared/start-videos.js carries a spirit section; never in Plain wording. */
  function dailySpiritHtml() {
    var x = window.GG_START_VIDEOS && !plainNow() ? dailyMed('spirit') : null; if (!x) return '';
    return '<article class="hm-card hm-p-roots hm-dmed"><div class="hm-hd">' + pb(IMG + 'tend-spirit.webp') + '<div style="min-width:0"><div class="hm-k">Today\'s Spirit Practice</div><h3 class="hm-h3">' + esc(x.title) + '</h3></div></div><p class="hm-sub">' + esc((x.mins ? 'About ' + x.mins + ' minutes. ' : '') + (x.blurb || '')) + '</p><div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-dmed="spirit">' + I('play') + 'Begin</button></div></article>';
  }
  /* Grounded Meditation's top (BLD 911): today's pick, then the full library by need; Tending's week of seven follows. */
  function medTopHtml() {
    var n = mItems('meditation').length;
    var dm = dailyMedHtml(), sp = dailySpiritHtml(); if (sp && dm.indexOf(sp) === 0) dm = dm.slice(sp.length);
    return dm + (n ? '<article class="hm-card hm-gcard hm-p-bark"><div class="hm-hd">' + pb(IMG + 'quiet-meditation-sq.webp') + '<div><div class="hm-time">The Full Library</div><h3 class="hm-h3">' + n + ' Meditations by Need</h3></div></div><p class="hm-sub">Sleep, worry, grief, focus, and more, each one guided.</p><div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-shelf="m-meditation">' + I('play') + 'Open the Library</button></div></article>' : '') +
      '<h2 class="hm-label">Your Week of Meditation</h2>';
  }
  function openDailyMed(sec) {
    load(START_JS).then(function () {
      var x = dailyMed(sec); if (!x) { openGGN(); return; }
      mDialog(sec === 'spirit' ? 'Today\'s Spirit Practice' : 'Today\'s Meditation', '<div class="hm-mplayer" id="hm-mplayer"><p class="hm-loading">Opening ' + esc(x.title) + '…</p></div><p class="hm-sub" style="margin-top:12px">Calm in a minute or two: <a class="hm-linkbtn" href="/get-grounded-now.html">Get Grounded Now</a></p>');
      load(LEARN_JS).then(function () { var host = document.getElementById('hm-mplayer'); if (host && window.GGLearn && GGLearn.player) playLesson(host, x); });
    });
  }

  /* ---------- clicks for the BLD 908 parts ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-hm-hh],[data-hm-dmed],[data-hm-mcode],[data-hm-tool],[data-hm-look],[data-hm-remind],[data-hm-cdel],[data-hm-mclose],[data-hm-mplay],[data-hm-mshelf]');
    if (!t) return;
    if (t.hasAttribute('data-hm-dmed')) { openDailyMed(t.getAttribute('data-hm-dmed') === 'spirit' ? 'spirit' : ''); return; }
    if (t.hasAttribute('data-hm-hh')) { homeRec().hhKind = t.getAttribute('data-hm-hh'); saveHome(); openMShelf('relationships'); return; }
    if (t.hasAttribute('data-hm-mcode')) { e.preventDefault(); mCode(); return; }
    if (t.hasAttribute('data-hm-tool')) { openTool(t.getAttribute('data-hm-tool')); return; }
    if (t.hasAttribute('data-hm-look')) { openRoom(t.getAttribute('data-hm-look'), '', ''); return; }
    if (t.hasAttribute('data-hm-remind')) { saveReminders(); return; }
    if (t.hasAttribute('data-hm-mclose')) { mClose(); return; }
    if (t.hasAttribute('data-hm-mplay')) { mPlay(t.getAttribute('data-hm-mplay')); return; }
    if (t.hasAttribute('data-hm-cdel')) {
      var id = t.getAttribute('data-hm-cdel'), L = customList(), j = -1; L.forEach(function (c, i) { if (c.id === id) j = i; });
      if (j >= 0) { var nm = L[j].n; L.splice(j, 1); saveHome().then(function () { toast(nm + ' is out of your plan.'); refreshPane(); }); }
    }
  });
  document.addEventListener('submit', function (e) {
    if (!e.target || e.target.id !== 'hm-cform') return;
    e.preventDefault(); if (!member()) return;
    var n = String((document.getElementById('hm-cn') || {}).value || '').trim().replace(/\s+/g, ' ').slice(0, 60); if (!n) return;
    var part = (document.getElementById('hm-cp') || {}).value || 'roots', r = (document.getElementById('hm-cr') || {}).value || 'd', m = num((document.getElementById('hm-cm') || {}).value), how = String((document.getElementById('hm-ch') || {}).value || '').slice(0, 600);
    if (!isTend(part)) part = 'roots';
    var L = customList(); if (L.some(function (c) { return c.n.toLowerCase() === n.toLowerCase() && c.part === part; })) { toast(n + ' is already in your plan.'); return; }
    L.push({ id: 'c' + Date.now().toString(36), part: part, n: n, r: okR(r) ? r : 'd', min: m && m > 0 && m <= 240 ? Math.round(m) : null, how: how, at: today() });
    saveHome().then(function () { toast(n + ' joins your plan.'); refreshPane(); });
  });
  function memberBoot() {
    if (!window.GGMember) return;
    try { if (typeof GGMember.on === 'function') GGMember.on(function () { if (S.id) render(); }); } catch (e) {}
    try { if (GGMember.ready && typeof GGMember.ready.then === 'function') GGMember.ready.then(function () { if (S.id) render(); }); } catch (e) {}
  }

  /* =====================================================================
     BLD 910: True One App (Chris, November 3, 2026: "i was expecting to see one app that had tree profiless. i still
     see lots of tree apps"). One Home, one look, one set of tabs: Today, Check-in, Grow, Learn, Library for a grown-up
     tree, and My Tree, Check-in, Watch for a kid's tree. The profile's tree decides the questions, practices, lessons,
     and guides; each tree screen opens as a sheet with the app's own header, never as a second app. Every picture here
     is one of Grounded's own paintings (Chris: "do NOT go back to these graphics! i woked hard to make graphics we have").
     ===================================================================== */
  var ART_JS = '/shared/learn-art.js?v=b908';
  function heroSrc(im) { return /\//.test(im) ? HERO + im + '.webp' : im === 'marriage' ? '/heartwood/hero-wide.webp' : HERO + im + '-wide.webp'; }
  // A lesson's painting: the first painting in its art plan (shared/learn-art.js), or the tree's own painting.
  // A lesson card's painting by its topic (BLD 911: the art plans spread paintings across scenes, so the first one can miss
  // the topic); the tree's own painting for welcomes, check-ins, and anything else.
  var TOPIC_ART = [
    [/roots|spirit|prayer|faith|sacred|gratitude/i, IMG + 'tend-spirit.webp'], [/bark|mind|worry|anxi|calm|breath|stress|sleep/i, IMG + 'tend-mind.webp'],
    [/leaves|body|move|walk|stretch|food|eat|meal/i, IMG + 'tend-move.webp'], [/branches|relationship|family|friend|marriage|together|household/i, IMG + 'tend-people.webp'],
    [/trunk|meaning|purpose|values/i, HERO + 'page-growth-narrow.webp'], [/fruit|hope|joy/i, IMG + 'tend-fruit.webp'],
    [/growth plan|practice|plan\b/i, IMG + 'growth-plan.webp'], [/when life changes|grief|loss|hard season/i, HERO + 'page-hard-seasons-narrow.webp'],
    [/today, week|season|rings|progress/i, IMG + 'this-season.webp']
  ];
  function lessonArt(app, id, i, title) {
    void i; var s = String(title || '');
    for (var k = 0; k < TOPIC_ART.length; k++) if (TOPIC_ART[k][0].test(s)) return TOPIC_ART[k][1];
    void id; return treeArt(app);
  }
  // BLD 911 (Chris: "when pet dies has table with plates of food"): every card shows its own painting, from its own video's
  // art plan; a card with no plan shows its tree's painting.
  var GPFX = { oak: 'ok', birch: 'br', sequoia: 'sq', pine: 'pn', aspen: 'as', maple: 'mp' };
  function planArt(key) {
    var G = window.GG_ART, row = G && G.m ? G.m[key] : null; if (!row) return null;
    var toks = String(row).split(' ');
    for (var k = 0; k < toks.length; k++) { var m = /^[pcf]?([0-9a-z]+)/.exec(toks[k]); if (!m || toks[k] === '-') continue; var im = (G.imgs || [])[parseInt(m[1], 36)]; if (im) return heroSrc(im); }
    return null;
  }
  function guideArt(tree, id) { var p = GPFX[tree]; return (p && (planArt(tree + ':' + p + '-g-' + id + '-you') || planArt(tree + ':' + p + '-g-' + id + '-helper'))) || treeArt(tree); }
  function tracksOf(tree) {
    var L = window.GG_LEARN && window.GG_LEARN[tree]; if (!L) return null;
    return arr(L.tracks).filter(function (t) { return t && !t.unlisted && t.kind !== 'forguides' && arr(t.lessons).length; });
  }
  function findLesson(tree, id) { var out = null; arr(tracksOf(tree)).forEach(function (t) { arr(t.lessons).forEach(function (l) { if (l && l.id === id) out = { l: l, t: t }; }); }); return out; }
  function lessonCard(tree, l, i) {
    return '<button type="button" class="hm-lcard" data-hm-lesson="' + esc(l.id) + '"><span class="im"><img src="' + lessonArt(tree, l.id, i, l.title) + '" alt="" loading="lazy" decoding="async"><span class="pl">' + I('play') + '</span></span><span class="tx"><b>' + esc(l.title || '') + '</b>' + (l.mins ? '<small>' + esc(l.mins) + ' minutes</small>' : '') + '</span></button>';
  }
  function rowHtml(title, sub, cards) { return '<div class="hm-lrow"><h2 class="hm-label">' + esc(title) + '</h2>' + (sub ? '<p class="hm-sub hm-lrsub">' + esc(sub) + '</p>' : '') + '<div class="hm-lscroll">' + cards + '</div></div>'; }
  function lifeTopics(tree) {
    if (tree === 'maple') return arr(obj(window.MAPLE_GUIDES).topics);
    if (tree === 'aspen') { var g = []; arr(obj(window.ASPEN_GUIDES).groups).forEach(function (x) { g = g.concat(arr(x.topics)); }); return g; }
    return arr(guidesOf(tree));
  }
  var KID_GUIDES = { maple: ['/maple/guides.js?v=b907', 'MAPLE_GUIDES'], aspen: ['/aspen/guides.js?v=b907', 'ASPEN_GUIDES'] };
  var LT = { f: 'all', load: null, tree: null };
  function loadLearn() {
    if (LT.load && LT.tree === S.tree) return LT.load;
    LT.tree = S.tree;
    var jobs = [loadLib(), window.GG_ART ? Promise.resolve() : load(ART_JS)], kg = KID_GUIDES[S.tree];
    if (kg && !window[kg[1]]) jobs.push(load(kg[0]));
    LT.load = Promise.all(jobs).catch(function () {});
    return LT.load;
  }
  function fillLearn() {
    loadLearn().then(function () {
      var box = document.getElementById('hm-learn'); if (!box || !box.isConnected) return;
      box.innerHTML = isKid(S.p) ? kidWatchBody() : learnBody();
    });
  }
  function learnTabHtml() { return '<div id="hm-learn" class="hm-learn">' + (tracksOf(S.tree) && window.GG_ART ? learnBody() : '<p class="hm-loading">Opening Learn for your ' + esc((TREES[S.tree] || TREES.oak).n) + '…</p>') + '</div>'; }
  function guideCard(g) { return '<button type="button" class="hm-lcard" data-hm-guide="' + esc(g.id) + '"><span class="im"><img src="' + guideArt(S.tree, g.id) + '" alt="" loading="lazy" decoding="async"></span><span class="tx"><b>' + esc(g.title || '') + '</b><small>Guide</small></span></button>'; }
  // BLD 911 (Chris: "learn tab needs search bar"): one search box over the tree's lessons and guides; results show as you type.
  function learnBody() {
    var chips = [['all', 'For You'], ['learn', 'Lessons'], ['life', 'When Life Changes']].map(function (c) { return '<button type="button" class="hm-lchip" data-hm-lf="' + c[0] + '" aria-pressed="' + (c[0] === LT.f && !LT.q) + '">' + c[1] + '</button>'; }).join('');
    return '<label class="hm-search hm-lsearch"><span>Search Learn</span><input type="search" id="hm-lq" placeholder="Grief, sleep, worry, moving" autocomplete="off" enterkeyhint="search" value="' + esc(LT.q || '') + '"></label>' +
      '<div class="hm-lchips" role="group" aria-label="Show">' + chips + '</div><div id="hm-lres">' + learnRows() + '</div>';
  }
  function learnRows() {
    var tr = arr(tracksOf(S.tree)), life = lifeTopics(S.tree), f = LT.f, n = 0, q = String(LT.q || '').trim().toLowerCase();
    if (q.length >= 2) {
      var has = function () { for (var k = 0; k < arguments.length; k++) if (String(arguments[k] || '').toLowerCase().indexOf(q) >= 0) return true; return false; };
      var ls = [], gs = [];
      tr.forEach(function (x) { arr(x.lessons).forEach(function (l) { if (l && l.id && has(l.title, l.blurb, x.title)) ls.push(lessonCard(S.tree, l, n++)); }); });
      life.forEach(function (g) { if (g && g.id && has(g.title, g.blurb, g.ring, g.group, [].concat(g.keys || []).join(' '), typeof g.quick === 'string' ? g.quick : '', g.ring === 'loss' ? 'grief loss died death' : '')) gs.push(guideCard(g)); });
      if (!ls.length && !gs.length) return '<p class="hm-sub hm-lnone">Nothing yet for that word. Try another, like sleep, worry, or family.</p>';
      return (ls.length ? '<div class="hm-lrow"><h2 class="hm-label">Lessons</h2><div class="hm-lgrid">' + ls.join('') + '</div></div>' : '') +
        (gs.length ? '<div class="hm-lrow"><h2 class="hm-label">When Life Changes</h2><div class="hm-lgrid">' + gs.join('') + '</div></div>' : '');
    }
    var out = '';
    if (f !== 'life') tr.forEach(function (x) { out += rowHtml(x.title || 'Lessons', x.who || '', arr(x.lessons).filter(function (l) { return l && l.id; }).map(function (l) { return lessonCard(S.tree, l, n++); }).join('')); });
    if (f !== 'learn' && life.length) out += rowHtml('When Life Changes', 'Help for the big moments: loss, moves, new babies, hard seasons.', life.map(guideCard).join(''));
    return out;
  }
  document.addEventListener('input', function (e) { if (!e.target || e.target.id !== 'hm-lq') return; LT.q = e.target.value; var r = document.getElementById('hm-lres'); if (r) r.innerHTML = learnRows(); document.querySelectorAll('[data-hm-lf]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-hm-lf') === LT.f && !String(LT.q || '').trim())); }); });

  /* A kid's Watch tab: today's short video, every kid video, and the tree's lessons. */
  function kidWatchHtml() {
    var t = TREES[S.tree], d = now(), eve = d.getHours() >= 17 || d.getHours() < 5;
    return '<div class="hm-wrap"><nav class="hm-tabs" id="hm-tabs" aria-label="The Grounded Way"></nav><div class="hm-lay kidlay"><div class="hm-kid">' +
      '<div class="hm-ksky"><img class="art" src="' + treeArt(S.tree, true) + '" alt=""><div class="hi"><span><b>Watch</b><small>Short videos for your ' + esc(t.n) + '</small></span></div></div>' +
      '<div class="hm-kin"><div id="hm-learn" class="hm-learn kid">' + (tracksOf(S.tree) ? kidWatchBody() : '<p class="hm-loading">Opening your videos…</p>') + '</div></div></div></div></div>';
    void eve;
  }
  function kidWatchBody() {
    var seen = {}, ids = [];
    Object.keys(KMATCH).forEach(function (k) { arr(KMATCH[k]).forEach(function (id) { if (!seen[id] && GGN[id]) { seen[id] = 1; ids.push(id); } }); });
    var ck = lastCheckin(S.id, S.tree), ed = edgesOf(ck), lead = ed.edges.filter(isTend)[0] || ed.lead || 'none', today0 = pick(KMATCH[lead] || ids, dayIndex());
    var vid = function (id) { var v = GGN[id]; return '<button type="button" class="hm-lcard" data-hm-play="' + esc(id) + '"><span class="im"><img src="' + (planArt(id) || treeArt(S.tree)) + '" alt="" loading="lazy"><span class="pl">' + I('play') + '</span></span><span class="tx"><b>' + esc(v[0]) + '</b><small>' + esc(v[1]) + ' minutes</small></span></button>'; };
    var n = 0, out = today0 && GGN[today0] ? rowHtml('Today', '', vid(today0)) : '';
    out += rowHtml('Calm and Strong', 'Breathing, feelings, and kind moves.', ids.map(vid).join(''));
    arr(tracksOf(S.tree)).forEach(function (x) { out += rowHtml(x.title || 'Lessons', '', arr(x.lessons).filter(function (l) { return l && l.id; }).map(function (l) { return lessonCard(S.tree, l, n++); }).join('')); });
    return out;
  }
  function playTreeLesson(id) {
    if (!tracksOf(S.tree)) { loadLearn().then(function () { if (tracksOf(S.tree)) playTreeLesson(id); }); return; }
    var f = findLesson(S.tree, id); if (!f) { openLearn(id); return; }
    var l = f.l;
    load(LEARN_JS).then(function () {
      mDialog(l.title || 'Learn', '<div class="hm-mplayer" id="hm-mplayer"><p class="hm-loading">Opening ' + esc(l.title || '') + '…</p></div>');
      var host = document.getElementById('hm-mplayer'); if (host && window.GGLearn && GGLearn.player) playLesson(host, l, null, f.t); else { mClose(); openLearn(id); }
    });
  }
  /* BLD 911 (Chris: "when i chose a vid from When life changes.. i am forced to a new page and then hard to find way back"):
     a guide's two videos (For You and For the Helper) play in the same window on Learn; Read the Guide opens the written guide. */
  var GUIDE_JS = { oak: '/oak/guide-videos.js?v=b907', aspen: '/aspen/guide-videos.js?v=b888', maple: '/maple/guide-videos.js?v=b888', sequoia: '/sequoia/guide-videos.js?v=b888', pine: '/pine/guide-videos.js?v=b907', birch: '/birch/guide-videos.js?v=b907' };
  function guideVideos(tree, id) { var D = window.GG_LEARN_GUIDES && window.GG_LEARN_GUIDES[tree]; return D ? arr(D.guides).filter(function (g) { return g && g.id === id; })[0] || null : null; }
  function playGuide(id, side, tree0) {
    var tree = tree0 && GUIDE_JS[tree0] ? tree0 : S.tree, src = GUIDE_JS[tree]; if (!src) { toast('This guide waits in Learn.'); goTo('learn'); return; }
    mDialog('When Life Changes', '<div class="hm-mplayer" id="hm-mplayer"><p class="hm-loading">Opening the guide…</p></div>');
    Promise.all([load(LEARN_JS), load(src)]).then(function () {
      var g = guideVideos(tree, id), x = g && (g[side || 'you'] || g.you);
      var box = document.getElementById('hm-mdlg-b'); if (!box) return;
      if (!g || !x || !window.GGLearn || !GGLearn.player) { mClose(); toast('This guide waits in Learn.'); goTo('learn'); return; }
      var t = document.getElementById('hm-mdlg-t'); if (t) t.textContent = g.title || x.title || 'When Life Changes';
      var tabs = ['you', 'helper'].filter(function (s) { return g[s]; }).map(function (s) { return '<button type="button" class="hm-lchip" data-hm-gside="' + esc(id) + '|' + s + '|' + tree + '" aria-pressed="' + (s === (side || 'you')) + '">' + esc(g[s].sideName || (s === 'you' ? 'For You' : 'For the Helper')) + '</button>'; }).join('');
      box.innerHTML = '<div class="hm-lchips">' + tabs + '<button type="button" class="hm-lchip" data-hm-gread="' + esc(id) + '|' + tree + '">' + I('book') + 'Read the Guide</button></div><div class="hm-mplayer" id="hm-mplayer"></div>';
      var tr = { id: 'hm-g-' + id, kind: 'guide', title: g.title, lessons: [x] };
      var keep = S.tree; S.tree = tree; playLesson(document.getElementById('hm-mplayer'), x, null, tr); S.tree = keep;
    }).catch(function () { mClose(); toast('This guide waits in Learn.'); goTo('learn'); });
  }
  function openGuide(id, tree0) {
    var tr0 = tree0 && TREES[tree0] ? tree0 : S.tree, t = TREES[tr0] || TREES.oak, kid = tr0 === 'maple' || tr0 === 'aspen';
    if (kid && tr0 === S.tree && openScreen('talk', tr0, { talk: id })) return;
    openFrame(new URL(t.href + (kid ? '#talk=' : '#life=') + encodeURIComponent(id), location.href), true, null, { what: 'life', title: SHEET_SCREENS.life, kick: 'My ' + t.n });
  }

  /* The Check-in tab: the tree painting with each part's level, Check In and Quick Check-in, this season, and trends. */
  function seasonCardHtml() {
    var ck = lastCheckin(S.id, S.tree), tend = tendOf(S.id, S.tree), wk = weekNo(tend), rings = arr(tend.rings).length;
    return '<article class="hm-card edge lift hm-p-branches hm-gcard"><div class="hm-pc"><div class="scene"><img src="' + IMG + 'this-season-narrow.webp" alt="" loading="lazy"></div><div style="min-width:0"><div class="hm-time">This Season</div><h3 class="hm-h3">' + (wk ? 'Season ' + (tend.season || 1) + ', Week ' + Math.min(12, wk) + ' of 12' : 'Your First Season') + '</h3><p class="hm-sub">' +
      (ck ? ck.count + ' check-in' + (ck.count === 1 ? '' : 's') + ' since ' + esc(niceDate(ck.first)) + '.' : 'Your season begins with your first full check-in.') + (rings ? ' ' + rings + (rings === 1 ? ' ring' : ' rings') + ' on your tree.' : '') + '</p>' +
      (ck ? '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-tree="history">' + I('clock') + 'Season and Rings</button></div>' : '') + '</div></div></article>';
  }
  function checkinTabHtml() {
    var t = TREES[S.tree] || TREES.oak, ck = lastCheckin(S.id, S.tree), ed = edgesOf(ck);
    var trends = member() ? '<article class="hm-card hm-gcard hm-p-bark hm-mcard" id="hm-trend"><div class="hm-hd">' + pb(IMG + 'progress-sq.webp') + '<div><div class="hm-time">Membership</div><h3 class="hm-h3">Trends</h3></div></div>' + trendsHtml() + '</article>' : '';
    return '<div class="hm-grow"><div class="hm-gcol hm-col">' + treeCardHtml(ck, ed, t) + '</div><div class="hm-gcol hm-col">' + seasonCardHtml() + trends +
      '<p class="hm-sub hm-cknote">The questions come from your ' + esc(t.n) + '. Every person on this device has a tree of their own, with questions made for their age.</p></div></div>';
  }

  /* Grow: the tree's own tools as painted cards (Week, Season and Rings, and each tree's special book), all in this app. */
  var SPECIAL = { pine: ['next', 'Next Steps', 'After high school: college, work, service, and the life you are growing toward.', HERO + 'page-growth-narrow.webp'], birch: ['ground', 'Groundwork', 'Money, home, work, and the everyday skills of a grown-up life.', IMG + 'balance-lawn.webp'], sequoia: ['legacy', 'Legacy Book', 'Your stories, your wisdom, and the words you want to pass on.', IMG + 'library-learn.webp'] };
  function gtool(cls, img, ey, title, line, attr, btn) {
    return '<article class="hm-card edge lift ' + cls + ' hm-gcard"><div class="hm-pc"><div class="scene"><img src="' + img + '" alt="" loading="lazy"></div><div style="min-width:0"><div class="hm-time">' + esc(ey) + '</div><h3 class="hm-h3">' + esc(title) + '</h3><p class="hm-sub">' + esc(line) + '</p><div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" ' + attr + '>' + btn + '</button></div></div></div></article>';
  }
  function growToolsHtml() {
    var t = TREES[S.tree] || TREES.oak, sp = SPECIAL[S.tree];
    return gtool('hm-p-leaves', treeArt(S.tree), 'My ' + t.n, 'Your ' + t.n + ' Grows With You', 'Your check-ins, practices, lessons, and guides are chosen for your ' + t.n + ', ' + String(t.who).toLowerCase() + '.', 'data-hm-tab="checkin"', I('check') + 'Check-in') +
      gtool('hm-p-trunk', IMG + 'tending-sq.webp', 'This Week', 'Your Week', 'This week\'s practices, meals, and movement, day by day.', 'data-hm-tab="week"', I('clock') + 'Open') +
      seasonCardHtml() +
      (sp ? gtool('hm-p-fruit', sp[3], 'My ' + t.n, sp[1], sp[2], 'data-hm-tool="' + sp[0] + '"', I('book') + 'Open') : '') +
      '<div class="hm-acts tight hm-tset"><button type="button" class="hm-btn sm line hm-pill" data-hm-tool="settings">' + I('gear') + 'Tree Settings</button></div>';
  }

  /* Who Is Tending? Every person on this device with their tree's painting, and Add a Person. */
  var AGE_TREES = [['maple', 'Kids'], ['aspen', 'Middle school'], ['pine', 'Teens'], ['birch', '18 to 26'], ['oak', '26 to 60'], ['sequoia', '60 and up']];
  function openWho() {
    var list = []; try { list = GGP.list(); } catch (e) {}
    var rows = list.map(function (p) {
      var tr = treeOfProfile(p), tn = (TREES[tr] || TREES.oak).n, here = p.id === S.id;
      return '<li><button type="button" class="hm-who" data-hm-pick="' + esc(p.id) + '"' + (here ? ' aria-current="true"' : '') + '><span class="av"><img src="' + treeArt(tr) + '" alt=""></span><span class="tx"><b>' + esc(p.name) + '</b><small>' + esc(tn) + (here ? ', open now' : '') + '</small></span>' + I('arrow') + '</button></li>';
    }).join('');
    mDialog('Who Is Tending?', '<picture class="hm-whoband" aria-hidden="true"><img src="' + IMG + 'home-morning-narrow.webp" alt=""></picture><p class="hm-sub" style="margin:10px 2px 12px">One app for the whole family. Each person\'s tree comes from their age and grows with them.</p>' +
      '<ul class="hm-wholist">' + rows + '</ul><button type="button" class="hm-btn line hm-pill hm-whoadd" data-hm-padd="1">' + I('plus') + 'Add a Person</button>' +
      '<h3 class="hm-label">Trees Grow With You</h3><ul class="hm-treerow">' + AGE_TREES.map(function (x) { return '<li><img src="' + treeArt(x[0]) + '" alt=""><b>' + TREES[x[0]].n + '</b><small>' + x[1] + '</small></li>'; }).join('') + '</ul>');
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-hm-lesson],[data-hm-guide],[data-hm-gside],[data-hm-gread],[data-hm-gpersp],[data-hm-lf],[data-hm-pick],[data-hm-padd],[data-hm-sober]');
    if (t && t.hasAttribute('data-hm-gpersp')) { GREAD.self = t.getAttribute('data-hm-gpersp') === 'self'; guideRead(GREAD.id, GREAD.tree); return; }
    if (!t) return;
    if (t.hasAttribute('data-hm-sober')) { soberTools(t.getAttribute('data-hm-sober')); return; }
    if (t.hasAttribute('data-hm-lesson')) { playTreeLesson(t.getAttribute('data-hm-lesson')); return; }
    if (t.hasAttribute('data-hm-guide')) { playGuide(t.getAttribute('data-hm-guide')); return; }
    if (t.hasAttribute('data-hm-gside')) { var gs = t.getAttribute('data-hm-gside').split('|'); if (M_CTL && M_CTL.stop) { try { M_CTL.stop(); } catch (e) {} } playGuide(gs[0], gs[1], gs[2]); return; }
    if (t.hasAttribute('data-hm-gread')) { var gr = t.getAttribute('data-hm-gread').split('|'); if (GUIDE_SRC2[gr[1]]) { guideRead(gr[0], gr[1]); return; } mClose(); openGuide(gr[0], gr[1]); return; }
    if (t.hasAttribute('data-hm-lf')) { LT.f = t.getAttribute('data-hm-lf'); LT.q = ''; var box = document.getElementById('hm-learn'); if (box) box.innerHTML = learnBody(); return; }
    if (t.hasAttribute('data-hm-pick')) { var id = t.getAttribute('data-hm-pick'); mClose(); if (id === S.id) return; GGP.openDialog({ id: id }).then(function () { render(); }); return; }
    if (t.hasAttribute('data-hm-padd')) { mClose(); GGP.createDialog().then(function () { render(); }); return; }
  });

  /* BLD 912 Round 1: Season and Rings, and your check-ins, drawn right here from the tree's own records (no tree page).
     The same reading the trees make: tend.start, tend.season, tend.rings (shared/gg-tend.js 177 to 180, 741 to 746) and each
     check-in's scores; Grew when a part rose by 2 or more since the check-in before, Dipped when it fell by 2, else Same. */
  function seasonOpen() {
    var t = TREES[S.tree] || TREES.oak, tend = tendGet(S.id, S.tree), wk = weekNo(tend), rings = arr(tend.rings), list = checkinsOf(S.id, S.tree).slice().reverse();
    var wkS = wk ? Math.min(12, wk) : 0, ready = wk >= 12;
    var head = '<article class="hm-card hm-gcard hm-p-branches"><div class="hm-pc"><div class="scene"><img src="' + treeArt(S.tree) + '" alt="" loading="lazy"></div><div style="min-width:0"><div class="hm-time">My ' + esc(t.n) + '</div><h3 class="hm-h3">' + (tend.start ? 'Season ' + (tend.season || 1) + ', Week ' + wkS + ' of 12' : 'Your First Season') + '</h3><p class="hm-sub">' +
      (tend.start ? 'This season began ' + esc(niceDate(tend.start)) + '. ' : 'Your first full check-in begins your first season. ') + (rings.length ? rings.length + (rings.length === 1 ? ' ring' : ' rings') + ' on your tree, one for each season you have finished.' : 'A ring grows on your tree each time you finish a season of twelve weeks.') + '</p>' +
      (ready ? '<p class="hm-sub"><b>Your season check-in is ready.</b> A full check-in now adds a ring and begins your next season.</p>' : '') +
      '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-pill" data-hm-tree="checkin">' + I('check') + 'Check In</button>' + ((TREES[S.tree] || {}).ck ? '<button type="button" class="hm-btn sm line hm-pill" data-hm-tree="quick">' + I('clock') + 'Quick Check-in</button>' : '') + '</div></div></div></article>';
    var rows = list.slice(0, 12).map(function (e, i) {
      var prev = null; for (var j = i + 1; j < list.length; j++) if (list[j].type === e.type) { prev = list[j]; break; }
      var cells = PART_KEYS.map(function (k) {
        var s = num(e.scores[k]), p0 = prev ? num(prev.scores[k]) : null, d = s != null && p0 != null ? s - p0 : null, word = d == null ? '' : d >= 2 ? 'Grew' : d <= -2 ? 'Dipped' : 'Same';
        return '<li class="hm-p-' + k + '"><b>' + esc(plabel(k)) + '</b><span>' + (s == null ? 'Not sure yet' : LV[levelKey(s)][0]) + (word ? ' · ' + word : '') + '</span></li>';
      }).join('');
      return '<article class="hm-card hm-hrow"><div class="hm-time">' + (e.type === 'quick' ? 'Quick Check-in' : 'Full Check-in') + '</div><h3 class="hm-h3">' + esc(niceDay(e.date)) + '</h3><ul class="hm-hparts">' + cells + '</ul></article>';
    }).join('');
    mDialog('Season and Rings', head + '<h3 class="hm-label">Your Check-ins</h3>' + (rows || '<p class="hm-sub">Your check-ins gather here, newest first.</p>'));
  }

  /* BLD 912 Round 2: Read the Guide, right here (no tree page). The grown-up trees' guides share one shape (oak/index.html
     lcDetail 3396 to 3436, birch/app.js 1188, pine/app.js 1211, sequoia/app.js 1479): Quick Reference, I'm going through
     this or I'm helping someone, faith, practices, when to reach out, learn more, and the sources line. */
  var GREAD = { tree: '', id: '', self: true };
  var FAITH_H = { oak: 'Faith and the holy', sequoia: 'Faith and the holy', birch: 'Faith and meaning', pine: 'Faith and meaning' };
  var GUIDE_SRC2 = { oak: ['/oak/guides.js?v=b907', 'OAK_GUIDES'], birch: ['/birch/guides.js?v=b907', 'BIRCH_GUIDES'], sequoia: ['/sequoia/guides.js?v=b907', 'SEQUOIA_GUIDES'], pine: ['/pine/guides.js?v=b907', 'PINE_GUIDES'] };
  function gList(xs) { return '<ul class="hm-glist">' + arr(xs).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; }
  function gSay(xs) { return '<div class="hm-gsay">' + arr(xs).map(function (x) { return '<p>' + esc(x) + '</p>'; }).join('') + '</div>'; }
  function guideRead(id, tree) {
    var g = GUIDE_SRC2[tree]; if (!g) { openGuide(id, tree); return; }
    GREAD.tree = tree; GREAD.id = id;
    var go = function () {
      var T = window[g[1]] && arr(window[g[1]].topics).filter(function (x) { return x && x.id === id; })[0];
      if (!T) { openGuide(id, tree); return; }
      var self = GREAD.self, h = T.helper || {}, s = T.self || {};
      var view = self ? '<h3>What this can feel like</h3><p>' + esc(T.feel) + '</p><h3>First steps</h3>' + gList(s.first) + '<h3>What helps</h3>' + gList(s.helps) + '<h3>What to tell yourself</h3>' + gSay(s.tell) + (s.people ? '<h3>Telling your people</h3><p>' + esc(s.people) + '</p>' : '')
        : '<h3>What they may be carrying</h3><p>' + esc(T.feel) + ' ' + esc(h.feel || '') + '</p><h3>What to say</h3>' + gSay(h.say) + '<h3>What to avoid</h3>' + gList(h.avoid) + '<h3>Practical ways to help</h3>' + gList(h.help) + (h.you ? '<h3>Caring for yourself as the helper</h3><p>' + esc(h.you) + '</p>' : '');
      var prac = arr(T.practices).map(function (k) { var nm = String(k).split('|')[1] || k; return '<span class="hm-gprac">' + esc(nm) + '</span>'; }).join('');
      var html = '<div class="hm-lchips"><button type="button" class="hm-lchip" data-hm-gside="' + esc(id) + '|you|' + tree + '">' + I('play') + 'Watch: For You</button><button type="button" class="hm-lchip" data-hm-gside="' + esc(id) + '|helper|' + tree + '">' + I('play') + 'Watch: For the Helper</button></div>' +
        '<div class="hm-gread"><div class="hm-gquick"><b>Quick Reference</b>' + gList(T.quick) + '</div>' +
        '<div class="hm-lchips" role="group" aria-label="Choose a view"><button type="button" class="hm-lchip" data-hm-gpersp="self" aria-pressed="' + self + '">I\'m going through this</button><button type="button" class="hm-lchip" data-hm-gpersp="helper" aria-pressed="' + !self + '">I\'m helping someone</button></div>' +
        view + (T.story ? '<h3>From Chris\'s Story</h3>' + gSay([T.story.text]) : '') + (T.faith ? '<h3>' + esc(FAITH_H[tree] || 'Faith and meaning') + '</h3><p>' + esc(T.faith) + '</p>' : '') +
        (prac ? '<h3>Practices that can help</h3><p class="hm-gpracs">' + prac + '</p>' : '') +
        (T.kids ? '<h3>If children are involved</h3><p><a class="hm-linkbtn" href="/home/?guide=' + encodeURIComponent(T.kids) + '&amp;tree=maple">A guide for talking with kids about this</a></p>' : '') +
        '<h3>When to reach out for more help</h3>' + gList(T.reach) +
        (arr(T.more).length ? '<h3>Learn more</h3><ul class="hm-glist">' + arr(T.more).map(function (m) { return '<li><a class="hm-linkbtn" href="' + esc(m[1]) + '" target="_blank" rel="noopener">' + esc(m[0]) + '</a></li>'; }).join('') + '</ul>' : '') +
        (window.GGSources && GGSources.html ? GGSources.html(tree + ':' + T.id, { stories: T.story ? [T.story.title] : [] }) : '') +
        '<p class="hm-gnote">General spiritual and emotional support. For therapy, medical care, or legal advice, see a licensed professional. Emergency: 911. Crisis: call or text 988.</p></div>';
      if (M_CTL && M_CTL.stop) { try { M_CTL.stop(); } catch (e) {} } M_CTL = null;
      var box = document.getElementById('hm-mdlg-b');
      if (box && document.getElementById('hm-mdlg')) { box.innerHTML = html; var tt = document.getElementById('hm-mdlg-t'); if (tt) tt.textContent = T.title; box.scrollTop = 0; }
      else mDialog(T.title, html);
    };
    Promise.all([load(g[0]), load('/shared/gg-sources.js?v=b908')]).then(go);
  }
  window.GGHome.member = member;
  window.GGHome.openWho = openWho;
  window.GGHome.openTool = openTool;
  window.GGHome.v908 = true;
})();
