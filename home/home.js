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
                                              {who, stage, season, parts: [...], hidden: {tend}, days: {date: {quiet, talk, pray}}, kid: {date: 1}, created}
     GGP.list(), GGP.shared(id), GGP.openIds() Your Family: progress only (days tended, rings, season)

   Views (the address names each one, so Back works)
     /home/            the Home (or the welcome, before a profile is open)
     /home/#tending    Tending, inside the Home, with a way back
     /home/#privacy    Settings and Privacy

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
  var V = 'b871';
  var TEND_SRC = ['/field-guide/moves.js?v=' + V, '/field-guide/stage.js?v=' + V, '/field-guide/coach.js?v=' + V, '/field-guide/health.js?v=' + V, '/shared/gg-tend-plan.js?v=' + V, '/shared/tending-public.js?v=' + V];
  var WORDS_SRC = '/shared/sober-words.js?v=b851';
  var GGN_SRC = '/shared/ggn.js?v=b849';
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
    last.count = list.length; last.first = list[0].date;
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
  var PRAC = { oak: ['/oak/practices.js?v=b852', 'OAK_PRACTICES'], birch: ['/birch/practices.js?v=b852', 'BIRCH_PRACTICES'], sequoia: ['/sequoia/practices.js?v=b852', 'SEQUOIA_PRACTICES'], pine: ['/pine/practices.js?v=b852', 'PINE_PRACTICES'] };
  var PRAC_SKIP = /^(Prayer|Worship|Tithe|Scripture|Faith|Chakras|Medicine|Get Counseling)$/i;

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
    S.tendLoad = TEND_SRC.reduce(function (p, src) { return p.then(function () { return load(src); }); }, Promise.resolve()).then(function () { initTending(); return !!window.GGHealth; });
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
      render: function () { if (S.view === 'tending') paintTending(); else paintToday(); },
      go: function (t) { if (t === 'health') goTo('tending'); },
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

  /* ---------- routing ---------- */
  function viewOf() { var h = decodeURIComponent(location.hash || ''); return h === '#tending' ? 'tending' : (h === '#privacy' || h === '#more') ? 'more' : h === '#tree' ? 'tree' : 'home'; }
  function goTo(v) {
    var hash = v === 'home' ? '' : '#' + v;
    if (v === 'home') { try { history.pushState(null, '', location.pathname); } catch (e) { location.hash = ''; } render(); }
    else if (location.hash !== hash) location.hash = hash; else render();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', function () {
    var v = viewOf();
    if (v === S.view && v === 'home') return; // an in-page anchor (#tools, #sober)
    render(); if (v !== 'home') window.scrollTo(0, 0);
  });
  window.addEventListener('popstate', function () { if (viewOf() !== S.view) render(); });

  function app() { return document.getElementById('hm-app'); }

  /* =====================================================================
     RENDER
     ===================================================================== */
  function render() {
    var root = app(); if (!root) return;
    var a = window.GGP && GGP.active && GGP.active();
    document.body.classList.toggle('hm-bn', !!a);
    if (!a) { if (/^#(tending|privacy|more|tree)$/.test(location.hash)) { try { history.replaceState(null, '', location.pathname); } catch (e) {} } S.id = null; S.view = 'home'; root.innerHTML = welcomeHtml(); paintNav(''); afterWelcome(); return; }
    var changed = S.id !== a.id;
    S.id = a.id; S.p = GGP.get ? GGP.get(a.id) : a; S.tree = treeOfProfile(S.p);
    if (changed) { S.tendInit = false; S.words = null; }
    S.view = viewOf();
    if (isKid(S.p)) { if (S.view === 'tree') { root.innerHTML = treeTabHtml(); paintNav('kidtree'); return; } S.view = 'home'; root.innerHTML = kidHtml(); paintNav('kid'); return; }
    if (S.view === 'tending') { root.innerHTML = tendingHtml(); paintNav('tending'); paintTending(); return; }
    if (S.view === 'more') { root.innerHTML = moreHtml(); paintNav('more'); return; }
    if (S.view === 'tree') { root.innerHTML = treeTabHtml(); paintNav('tree'); return; }
    root.innerHTML = homeHtml(); paintNav('home'); afterHome();
  }

  /* The Home's own places: a row of pills on a wide screen, a bar along the bottom on a phone. */
  function paintNav(cur) {
    var old = document.getElementById('hm-bnav'); if (old) old.remove();
    var tabs = document.getElementById('hm-tabs');
    if (!S.id || !cur) { if (tabs) tabs.innerHTML = ''; return; }
    var t = TREES[S.tree] || TREES.oak, h = homeRec();
    // BLD 869: The Grounded Way app: Today, My Tree, Tending, More (kids: Today and My Tree).
    var kid = cur === 'kid' || cur === 'kidtree';
    var items = [['home', '/home/', 'home', 'Today', 'Today'], ['tree', '#tree', 'tree', 'My ' + t.n, 'My Tree']];
    if (!kid) { items.push(['tending', '#tending', 'sprout', 'Tending', 'Tending']); items.push(['more', '#more', 'grid', 'More', 'More']); }
    var on = cur === 'kid' ? 'home' : cur === 'kidtree' ? 'tree' : cur;
    if (tabs) tabs.innerHTML = items.map(function (x) { return '<a href="' + x[1] + '"' + (x[0] === on ? ' aria-current="page"' : '') + ' data-hm-nav="' + x[0] + '">' + I(x[2]) + esc(x[3]) + '</a>'; }).join('');
    var bn = document.createElement('nav'); bn.className = 'hm-bnav'; bn.id = 'hm-bnav'; bn.setAttribute('aria-label', 'The Grounded Way');
    var phone = items.filter(function (x) { return x[0] !== 'privacy' || items.length <= 5; }).slice(0, 5);
    bn.innerHTML = '<ul style="--n:' + phone.length + '">' + phone.map(function (x) { return '<li><a href="' + x[1] + '"' + (x[0] === on ? ' aria-current="page"' : '') + ' data-hm-nav="' + x[0] + '"><span class="ic">' + I(x[2]) + '</span><span class="l">' + esc(x[4]) + '</span></a></li>'; }).join('') + '</ul>';
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
  function heroHtml(name, chips) {
    var d = now(), hr = d.getHours() + d.getMinutes() / 60, eve = hr >= 17 || hr < 5;
    var greet = hr < 5 ? 'Good evening' : hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening';
    var k = eve ? 'home-evening' : 'home-morning';
    return '<div class="hm-hero o1' + (eve ? ' eve' : '') + '" data-sky="' + (eve ? 'evening' : 'morning') + '"><picture><source media="(max-width:699px)" srcset="' + IMG + k + '-narrow.webp"><img class="art" src="' + IMG + k + '-wide.webp" alt="" width="2000" height="800" fetchpriority="high"></picture>' +
      '<div class="in"><div class="hm-greet">' + I(eve ? 'moon' : 'sunrise') + '<span>' + greet + ', ' + esc(name) + '</span></div>' +
      '<div class="hm-day">' + DAYS[d.getDay()] + '</div><div class="hm-date">' + MONTHS[d.getMonth()] + ' ' + d.getDate() + '</div>' +
      (chips ? '<div class="chips">' + chips + '</div>' : '') + '</div></div>';
  }
  function homeHtml() {
    var h = homeRec(), t = TREES[S.tree] || TREES.oak, tend = tendOf(S.id, S.tree), wk = weekNo(tend);
    var chips = '<span class="hm-chip g">' + I('tree') + esc(t.n) + '</span>' + (wk ? '<span class="hm-chip">Season ' + (tend.season || 1) + ' · Week ' + Math.min(12, wk) + '</span>' : '');
    var ck = lastCheckin(S.id, S.tree), ed = edgesOf(ck);
    var full = anyTend(h), sd = soberDate();
    var fam = familyHtml(h);
    var col1 = treeCardHtml(ck, ed, t) + fam;
    var col2 = full ? '<div class="hm-col o3" id="hm-today">' + todayHtml(h, null) + '</div>' : '';
    var col3 = (sd ? soberHtml(sd) : (h.parts.indexOf('sober') >= 0 ? soberInviteHtml() : '')) + forYouHtml(ed) + progressHtml(h, ck, tend) + (full ? '' : offerHtml(h));
    return '<div class="hm-wrap">' + '<nav class="hm-tabs" id="hm-tabs" aria-label="The Grounded Way"></nav>' + heroHtml(S.p.name, chips) +
      '<div class="hm-grid' + (full ? '' : ' c2') + '">' +
        '<div class="hm-col">' + col1 + '</div>' + col2 + '<div class="hm-col">' + col3 + '</div>' +
      '</div>' + toolsHtml(h, full) + '</div>';
  }
  function afterHome() { paintRings(); if (tendOn(homeRec())) loadTending().then(function () { paintToday(); }); fillAlso(); fillWords(); }

  /* Your Tree */
  var LV = { strong: ['Strong', 'strong'], steady: ['Steady', 'steady'], edge: ['Growing Edge', 'edge'], unsure: ['Not sure yet', 'unsure'] };
  var PILLS = {
    leaves: { x: 372, y: 26, w: 196, halo: '<ellipse class="halo" cx="300" cy="150" rx="215" ry="125"/>' },
    fruit: { x: 392, y: 146, w: 196, halo: '<circle class="halo" cx="400" cy="214" r="34"/><circle class="halo" cx="226" cy="196" r="34"/>' },
    branches: { x: 196, y: 252, w: 208, halo: '<ellipse class="halo" cx="300" cy="250" rx="150" ry="58"/>' },
    bark: { x: 22, y: 318, w: 196, halo: '<ellipse class="halo" cx="300" cy="372" rx="48" ry="88"/>' },
    trunk: { x: 360, y: 364, w: 196, halo: '<ellipse class="halo" cx="300" cy="372" rx="48" ry="88"/>' },
    roots: { x: 196, y: 566, w: 208, halo: '<ellipse class="halo" cx="300" cy="540" rx="200" ry="70"/>' }
  };
  var TREE_N = 0;
  function treeSvg(levels, lead) {
    var n = ++TREE_N, edge = lead;
    var s = '<svg class="hm-tree" viewBox="0 0 600 640" role="img" aria-label="Your tree from your last check-in. ' + PARTS.map(function (p) { return p.n + ': ' + LV[levels[p.k]][0]; }).join('. ') + '.">';
    s += '<ellipse class="t-glow" cx="300" cy="180" rx="280" ry="190"/>';
    s += '<clipPath id="hm-sc' + n + '"><rect x="0" y="436" width="600" height="204" rx="26"/></clipPath><g clip-path="url(#hm-sc' + n + ')"><rect class="t-soil" x="0" y="436" width="600" height="204"/><rect class="t-soil2" x="0" y="560" width="600" height="80"/></g>';
    if (edge === 'roots') s += '<g class="hm-p-roots">' + PILLS.roots.halo + '</g>';
    s += '<path class="t-grass" d="M0 446 Q150 432 300 440 T600 436 V458 H0Z"/>';
    s += '<g class="t-root"><path d="M300 450 C292 490 240 510 176 544" stroke-width="10"/><path d="M300 450 C312 496 368 516 432 552" stroke-width="10"/><path d="M296 454 C282 510 268 550 252 612" stroke-width="7"/><path d="M306 454 C322 512 338 556 352 616" stroke-width="7"/><path d="M176 544 C150 556 126 560 96 560" stroke-width="4"/><path d="M432 552 C462 562 488 564 516 560" stroke-width="4"/></g>';
    if (edge === 'bark' || edge === 'trunk') s += '<g class="hm-p-' + edge + '">' + PILLS[edge].halo + '</g>';
    s += '<path class="t-trunk" d="M258 450 C276 440 282 414 284 384 C286 354 287 322 289 290 L311 290 C313 322 314 354 316 384 C318 414 324 440 342 450 Z"/>';
    s += '<path class="t-barkline" d="M294 304 C292 334 296 356 292 384 M306 320 C309 348 304 372 309 402 M296 404 C293 422 290 432 284 442"/>';
    s += '<g class="hm-crown">';
    if (edge === 'branches' || edge === 'leaves') s += '<g class="hm-p-' + edge + '">' + PILLS[edge].halo + '</g>';
    s += '<g class="t-branch"><path d="M300 304 C284 270 240 250 196 234" stroke-width="12"/><path d="M300 300 C318 266 364 246 410 230" stroke-width="12"/><path d="M298 292 C290 244 270 200 248 164" stroke-width="9"/><path d="M302 292 C312 244 334 200 356 160" stroke-width="9"/></g>';
    s += '<circle class="t-leaf1" cx="168" cy="214" r="62"/><circle class="t-leaf1" cx="432" cy="210" r="62"/><circle class="t-leaf1" cx="300" cy="228" r="54"/><circle class="t-leaf2" cx="214" cy="150" r="76"/><circle class="t-leaf2" cx="388" cy="146" r="76"/><circle class="t-leaf2" cx="300" cy="110" r="80"/><circle class="t-leaf2" cx="140" cy="176" r="44"/><circle class="t-leaf2" cx="462" cy="172" r="44"/><circle class="t-leaf3" cx="268" cy="74" r="28" opacity=".55"/><circle class="t-leaf3" cx="380" cy="96" r="22" opacity=".5"/>';
    if (edge === 'fruit') s += '<g class="hm-p-fruit">' + PILLS.fruit.halo + '</g>';
    s += [[350, 78], [438, 144], [226, 196], [400, 214], [160, 154], [300, 164]].map(function (p) { return '<circle class="t-fruit" cx="' + p[0] + '" cy="' + p[1] + '" r="10"/>'; }).join('');
    s += '</g>';
    PARTS.forEach(function (pp) {
      var p = PILLS[pp.k], l = LV[levels[pp.k]];
      s += '<g class="pl hm-p-' + pp.k + (l[1] === 'edge' ? ' edge' : l[1] === 'unsure' ? ' unsure' : '') + '"><rect x="' + p.x + '" y="' + p.y + '" width="' + p.w + '" height="58" rx="29"/><circle class="d" cx="' + (p.x + 26) + '" cy="' + (p.y + 29) + '" r="8"/><text class="pn" x="' + (p.x + 44) + '" y="' + (p.y + 26) + '">' + pp.n + '</text><text class="pm ' + l[1] + '" x="' + (p.x + 44) + '" y="' + (p.y + 47) + '">' + l[0] + '</text></g>';
    });
    return s + '</svg>';
  }
  function checkHref(t) { return t.href + (t.ck ? '#checkin' : ''); }
  function treeCardHtml(ck, ed, t) {
    if (!ck) {
      return '<article class="hm-card hm-p-leaves o2" id="hm-tree"><div class="hm-hd"><span class="hm-badge"><img src="' + mark(S.tree) + '" alt=""></span><div><div class="hm-k">Your Tree</div><div class="hm-sub">Your first check-in plants your tree here.</div></div></div>' +
        '<div class="hm-plant"><img src="' + IMG + 'welcome-narrow.webp" alt="" width="120" height="120" loading="lazy"><p class="hm-sub" style="max-width:36ch">Six parts make you whole: Roots, Trunk, Bark, Branches, Leaves, and Fruit. A check-in shows how each one is growing, Strong, Steady, or a Growing Edge.</p></div>' +
        '<div class="hm-acts"><a class="hm-btn hm-p-leaves" href="' + checkHref(t) + '">' + I('check') + 'Begin My First Check-in</a><a class="hm-btn line hm-p-leaves" href="' + t.href + '">' + I('tree') + 'Open My ' + esc(t.n) + '</a></div></article>';
    }
    var lv = ed.lv, cnt = { strong: 0, steady: 0 }; PARTS.forEach(function (p) { if (cnt[lv[p.k]] != null) cnt[lv[p.k]]++; });
    var sum = (cnt.strong ? '<span class="hm-lvl s">' + cnt.strong + ' Strong</span>' : '') + (cnt.steady ? '<span class="hm-lvl st">' + cnt.steady + ' Steady</span>' : '') +
      (ed.edges.length ? '<span class="hm-lvl g hm-p-' + ed.edges[0] + '">Growing Edge: ' + ed.edges.map(function (k) { return PART[k].n; }).join(', ') + '</span>' : '');
    var line = ed.edges.length ? PART[ed.edges[0]].n + ', ' + PART[ed.edges[0]].m + ', is your Growing Edge this week. For You Today leans toward it.' : 'Every part is Steady or Strong. Keep tending what is working.';
    return '<article class="hm-card hm-p-leaves o2" id="hm-tree"><div class="hm-hd"><span class="hm-badge"><img src="' + mark(S.tree) + '" alt=""></span><div><div class="hm-k">Your Tree</div><div class="hm-last">' + I('check') + 'Last check-in ' + esc(niceDay(ck.date)) + '</div></div></div>' +
      treeSvg(lv, ed.edges[0] || null) + '<div class="hm-lvsum">' + sum + '</div><div class="hm-sub">' + esc(line) + '</div>' +
      '<div class="hm-acts"><a class="hm-btn hm-p-leaves" href="' + checkHref(t) + '">' + I('check') + 'Check In Again</a><a class="hm-btn line hm-p-leaves" href="' + t.href + '">' + I('tree') + 'Open My ' + esc(t.n) + '</a></div>' +
      '<div class="hm-ckline"><span>' + I('check') + ck.count + ' check-in' + (ck.count === 1 ? '' : 's') + ' since ' + esc(MONTHS[parse(ck.first).getMonth()]) + '</span><span>' + I('clock') + (ck.type === 'quick' ? 'Last one quick, about 2 minutes' : 'Full check-in, about 8 minutes') + '</span></div></article>';
  }

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
  function todayHtml(h, sm) {
    var parts = h.parts, d = h.days[today()] || {}, hr = now().getHours(), cards = [], done = 0, total = 0;
    var chosen = TEND6.filter(function (t) { return parts.indexOf(t[0]) >= 0 && t[0] !== 'sober'; });
    if (sm && sm.workout && parts.indexOf('move') >= 0) {
      var wd = !!sm.workout.done;
      cards.push('<article class="hm-card edge lift hm-a-move' + (wd ? ' done' : '') + '"><div class="hm-pc"><div class="scene"><img src="' + IMG + 'tend-move.webp" alt="" loading="lazy"></div><div style="min-width:0"><div class="hm-time">' + (hr < 12 ? 'Morning' : hr < 17 ? 'Today' : 'This evening') + (sm.workout.mins ? ' · ' + esc(sm.workout.mins) + ' min' : '') + '</div><h3 class="hm-h3">' + esc(sm.workout.title || 'Today\'s Workout') + '</h3><div class="hm-meta"><span>' + I('move') + 'Movement</span><span>Ava coaches</span></div>' +
        '<div class="hm-acts tight"><button class="hm-btn sm" type="button" data-hm-open="move">' + I('play') + (wd ? 'Open' : 'Start') + '</button>' + (wd ? '<span class="hm-chip">' + I('check') + 'Done</span>' : '') + '</div></div></div></article>');
      total++; if (wd) done++;
    }
    if (sm && sm.plate && parts.indexOf('food') >= 0) {
      var pl = sm.plate, tg = obj(sm.targets);
      var fib = target(tg.fib, 30), pro = target(tg.pro || tg.protein, 0), sf = target(tg.sf, 13);
      cards.push('<article class="hm-card edge hm-a-plate"><div class="hm-hd"><span class="hm-badge">' + I('plate') + '</span><div><div class="hm-k">Today\'s Plate</div><div class="hm-sub">Rings fill as you log what you eat.</div></div></div><div class="hm-meters">' +
        '<div class="hm-meter">' + ring(74, 8, num(pl.fib) || 0, fib, '<b>' + Math.round(num(pl.fib) || 0) + 'g</b>', '#5F9A4E') + '<div class="nm">Fiber</div><div class="nt">goal ' + fib + ' g or more</div></div>' +
        '<div class="hm-meter">' + ring(74, 8, num(pl.pro) || 0, pro || Math.max(1, num(pl.pro) || 1), '<b>' + Math.round(num(pl.pro) || 0) + 'g</b>', '#3F6F94') + '<div class="nm">Protein</div><div class="nt">' + (pro ? 'goal ' + pro + ' g' : 'set by your goal') + '</div></div>' +
        '<div class="hm-meter">' + ring(74, 8, num(pl.sf) || 0, sf, '<b>' + Math.round(num(pl.sf) || 0) + 'g</b>', '#C2410C') + '<div class="nm">Saturated Fat</div><div class="nt">' + sf + ' g or less</div></div>' +
        '</div><div class="hm-acts tight"><button class="hm-btn sm line" type="button" data-hm-open="plate">' + I('plus') + 'Log a Meal</button></div></article>');
    }
    if (parts.indexOf('still') >= 0) {
      total++; if (d.quiet) done++;
      cards.push('<article class="hm-card edge lift hm-p-bark' + (d.quiet ? ' done' : '') + '"><div class="hm-pc"><div class="scene"><img src="' + IMG + 'tend-mind.webp" alt="" loading="lazy"></div><div style="min-width:0"><div class="hm-time">' + (hr < 12 ? 'Morning' : hr < 17 ? 'Afternoon' : 'Evening') + ' · a few minutes</div><h3 class="hm-h3">' + (hr < 12 ? 'Morning Quiet' : hr < 17 ? 'Afternoon Quiet' : 'Evening Quiet') + '</h3><div class="hm-meta"><span>' + I('lotus') + 'Breath and stillness</span></div>' +
        '<div class="hm-acts tight"><button class="hm-btn sm" type="button" data-hm-play="gg-paced-now">' + I('play') + 'Begin</button>' + ckBtn('quiet', d.quiet, 'Done') + '</div></div></div></article>');
    }
    if (parts.indexOf('pray') >= 0) {
      total++; if (d.pray) done++;
      cards.push('<article class="hm-card edge lift hm-p-roots' + (d.pray ? ' done' : '') + '"><div class="hm-pc"><div class="scene"><img src="' + IMG + 'tend-spirit.webp" alt="" loading="lazy"></div><div style="min-width:0"><div class="hm-time">Any time</div><h3 class="hm-h3">A Sacred Pause</h3><div class="hm-meta"><span>' + I('flame') + 'Prayer, a reading, or quiet, in your own way</span></div>' +
        '<div class="hm-acts tight"><a class="hm-btn sm" href="/get-grounded-now.html">' + I('play') + 'Begin</a><a class="hm-btn sm line" href="/readings.html">' + I('feather') + 'Readings</a>' + ckBtn('pray', d.pray, 'Done') + '</div></div></div></article>');
    }
    if (parts.indexOf('connect') >= 0) {
      total++; if (d.talk) done++;
      var q = pick(QUESTIONS, dayIndex() + (+d.q || 0));
      cards.push('<article class="hm-card edge hm-p-branches' + (d.talk ? ' done' : '') + '"><div class="hm-hd" style="margin-bottom:4px"><span class="hm-badge">' + I('people') + '</span><div><div class="hm-k">Tonight\'s Question</div><div class="hm-sub">For dinner together, phones away</div></div></div><p class="hm-tq">' + esc(q) + '</p>' +
        '<div class="hm-acts tight"><button class="hm-btn sm line" type="button" data-hm="anotherq">Another Question</button>' + ckBtn('talk', d.talk, 'We Talked') + '</div></article>');
    }
    if (sm && sm.today) { done += +sm.today.checksDone || 0; total += +sm.today.checksTotal || 0; }
    var lead = '';
    if (!sm && tendOn(h)) {
      lead = '<article class="hm-card edge hm-p-leaves"><div class="hm-pc"><div class="scene"><img src="' + IMG + 'tend-body.webp" alt="" loading="lazy"></div><div style="min-width:0"><div class="hm-k">Tending</div><h3 class="hm-h3">' + (tendStarted() ? 'Your Tending Plan' : 'Begin Your Tending') + '</h3>' +
        '<p class="hm-sub" style="margin-top:4px">' + (tendStarted() ? 'Food for your goal, movement for your level, and your own numbers, all on this device.' : 'A short start-up check shapes it to you: your goals, your food needs, and movement for your level. Built to thrive.') + '</p>' +
        '<div class="hm-acts tight"><button class="hm-btn sm" type="button" data-hm-open="today">' + I('sprout') + 'Open Tending</button></div></div></div></article>';
    } else if (sm) {
      var extra = [];
      if (sm.nextLabs) extra.push('<span>' + I('flask') + 'Next labs ' + esc(niceDate(sm.nextLabs) || sm.nextLabs) + '</span>');
      if (sm.kidsCount) extra.push('<span>' + I('people') + 'Family nutrition for ' + (+sm.kidsCount) + (+sm.kidsCount === 1 ? ' child' : ' kids') + '</span>');
      lead = extra.length ? '<div class="hm-stat">' + extra.join('') + '</div>' : '';
    }
    var head = '<div class="hm-grp hm-p-leaves"><span class="hm-badge">' + I('sprout') + '</span><h2 class="hm-h2">Today\'s Tending</h2><span class="sp"></span>' + (total ? ring(70, 8, done, total, '<b>' + done + '</b><small>of ' + total + '</small>') : '') + '</div>';
    var chips = '<div class="hm-chosen">' + chosen.map(function (t) { var k = t[4][0][0]; return '<span class="hm-pt hm-p-' + k + '">' + esc(t[3].replace('Meditation and Mindfulness', 'Mindfulness').replace('Family Meals and Connection', 'Connection').replace('Prayer or Sacred Practice', 'Sacred Practice')) + '</span>'; }).join('') + '<a href="#privacy">Change</a></div>';
    return head + chips + lead + cards.join('');
  }
  function paintToday() {
    var box = document.getElementById('hm-today'); if (!box || S.view !== 'home') return;
    box.innerHTML = todayHtml(homeRec(), summary()); paintRings(box);
  }

  /* Living Sober */
  function soberHtml(date) {
    var c = soberCount(date); if (!c) return '';
    var ms = medallions(date), nowS = today(), prev = null, next = null;
    ms.forEach(function (m) { if (m.at <= nowS) prev = m; else if (!next) next = m; });
    var from = prev ? prev.at : date, span = Math.max(1, between(from, next.at)), into = between(from, nowS), left = between(nowS, next.at);
    return '<article class="hm-card hm-sober hm-a-sober o4" id="hm-sober"><div class="row">' + ring(108, 10, into, span, '<b>' + (c.days + 1) + '</b><small>' + (c.days === 0 ? 'day' : 'days') + '</small>') +
      '<div style="min-width:0"><div class="dn">Living Sober</div><h3 class="hm-h3" style="font-size:28px">' + (c.days === 0 ? 'Day One' : 'Day ' + (c.days + 1)) + '</h3><div class="hm-sub">Next medallion: ' + esc(next.name) + ', in ' + left + (left === 1 ? ' day' : ' days') + '.</div></div></div>' +
      '<p class="words" id="hm-words">Every day counts. Today is one more.</p>' +
      '<div class="hm-acts"><a class="hm-btn sm hm-a-sober" href="/living-sober.html#today">' + I('sunrise') + 'Today\'s Intention</a><a class="hm-btn sm line hm-a-sober" href="/living-sober.html#wave">' + I('wind') + 'Ride the Wave</a></div></article>';
  }
  function soberInviteHtml() {
    var t = TREES[S.tree] || TREES.oak;
    return '<article class="hm-card hm-a-sober o4 hm-offer" id="hm-sober"><span class="hm-badge">' + I('sun2') + '</span><div style="flex:1;min-width:0"><div class="hm-k">Living Sober</div><div class="hm-sub">Turn on Living Sober and add your sober date in My ' + esc(t.n) + ', and your day count, words for today, and medallions show here.</div>' +
      '<div class="hm-quiet" style="margin-top:8px"><a href="' + t.href + '">Open My ' + esc(t.n) + '</a><span>·</span><a href="/living-sober.html">About Living Sober</a></div></div></article>';
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

  /* Your Progress */
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

  /* Your Tools */
  function toolsHtml(h, full) {
    var t = TREES[S.tree] || TREES.oak, out = [];
    var tool = function (cls, href, icon, name, line, img) { return '<a class="hm-tool ' + cls + '" href="' + href + '"><span class="hm-badge">' + (img ? '<img src="' + img + '" alt="">' : I(icon)) + '</span><b>' + esc(name) + '</b><small>' + esc(line) + '</small></a>'; };
    out.push(tool('hm-p-leaves', t.href, 'tree', 'My ' + t.n, full ? 'Check-ins, growth plan, guides' : 'Check-ins and growth plan', mark(S.tree)));
    if (h.season && TREES[h.season]) out.push(tool('hm-p-branches', TREES[h.season].href, 'tree', TREES[h.season].n, TREES[h.season].who, mark(h.season)));
    if (full) out.push(tool('hm-p-leaves', '#tending', 'sprout', 'Tending', 'Food, movement, quiet, connection'));
    if (soberDate() || h.parts.indexOf('sober') >= 0) out.push(tool('hm-a-sober', '/living-sober.html', 'sun2', 'Living Sober', 'Today, Ride the Wave, milestones'));
    if (h.who === 'family' && out.length < 6) out.push(tool('hm-p-branches', '/grove/', 'people', 'The Grove', 'Your family\'s trees, together', mark('grove')));
    out.push(tool('hm-p-bark', '/get-grounded-now.html', 'wind', 'Get Grounded Now', 'Calm in a minute or two'));
    out.push(tool('hm-p-roots', '/readings.html', 'feather', 'Readings Library', 'Prayers, poems, and blessings'));
    if (full) out.push(tool('hm-p-trunk', '/library/', 'book', 'Book Library', 'Books and studies we draw from'));
    out = out.slice(0, 6);
    return '<div style="margin-top:28px" id="hm-tools"><div class="hm-plan-hd"><h2 class="hm-h2">Your Tools</h2><span class="hm-time">Everything you use</span></div><div class="hm-tools' + (out.length <= 3 ? ' few' : '') + '">' + out.join('') + '</div>' +
      '<div class="hm-setlink">' + I('lock') + '<span style="flex:1;min-width:0">Your Home stays on this device, locked with your passcode.</span><a href="#privacy">Settings and Privacy</a></div>' + helpLine() + '</div>';
  }

  /* ---------- Tending, inside the Home ---------- */
  function tendingHtml() {
    return '<div class="hm-wrap"><nav class="hm-tabs" id="hm-tabs" aria-label="The Grounded Way"></nav><div class="hm-back"><button type="button" class="hm-btn sm line hm-p-leaves" data-hm="home">' + I('back') + 'Back to Today</button></div>' +
      '<div id="hm-tend"><div class="hm-loading">Opening Tending…</div></div>' + helpLine() + '</div>';
  }
  function paintTending() {
    var box = document.getElementById('hm-tend'); if (!box) return;
    loadTending().then(function () {
      var b = document.getElementById('hm-tend'); if (!b || S.view !== 'tending') return;
      var html = '';
      if (tendReady()) { if (S.tendInit !== S.id) initTending(); try { html = window.GGHealth.view() || ''; } catch (e) { if (window.console) console.error(e); html = ''; } }
      if (!html) html = tendSoonHtml();
      b.innerHTML = html;
      var h = homeRec(); if (!tendOn(h) && tendReady()) { h.parts = h.parts.concat(['move', 'food']); saveHome(); }
    });
  }
  function tendSoonHtml() {
    return '<div class="hm-card hm-p-leaves"><div class="hm-pc"><div class="scene"><img src="' + IMG + 'tend-body.webp" alt=""></div><div style="min-width:0"><div class="hm-k">Tending</div><h2 class="hm-h2">Tending Opens Here</h2>' +
      '<p class="hm-sub" style="margin-top:6px">Food for your goal, movement for every level, quiet, your own labs and the LDL Path, and family nutrition. Built to thrive, and kept on this device inside your locked profile.</p>' +
      '<p class="hm-sub" style="margin-top:8px">Tending is getting ready for your Home. Your tree, check-ins, and practices are all here today.</p>' +
      '<div class="hm-acts tight"><button type="button" class="hm-btn sm hm-p-leaves" data-hm="home">' + I('home') + 'Back to Today</button><a class="hm-btn sm line hm-p-leaves" href="/the-grounded-way.html">The Grounded Way</a></div></div></div></div>';
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
  function privacyHtml() {
    var h = homeRec(), on = {}; h.parts.forEach(function (k) { on[k] = true; });
    return '<div class="hm-wrap"><nav class="hm-tabs" id="hm-tabs" aria-label="The Grounded Way"></nav><div class="hm-back"><h1 class="hm-h2">Settings and Privacy</h1><button type="button" class="hm-btn sm line hm-p-leaves" data-hm="home">' + I('back') + 'Back to Today</button></div>' +
      privacyBrief(true) +
      '<div class="hm-lay c2" style="margin-top:22px"><article class="hm-card hm-p-roots"><div class="hm-hd"><span class="hm-badge">' + I('choice') + '</span><div><div class="hm-k">Your Home</div><h3 class="hm-h3">What Would You Like to Tend?</h3></div></div>' +
        '<p class="hm-sub" style="margin:0 0 12px">Your tree check-in comes with every Home. Turn on any daily tending you like; the Home shows only what you choose.</p>' + tend6Html(on, 'data-hm-setpart') +
        (h.hidden.tend ? '<div class="hm-quiet" style="margin-top:12px"><button type="button" data-hm="showtend">Show the Whenever You Like card again</button></div>' : '') +
      '</article><article class="hm-card hm-p-branches"><div class="hm-hd"><span class="hm-badge">' + I('people') + '</span><div><div class="hm-k">Your Family</div><h3 class="hm-h3">The People You Tend With</h3></div></div>' +
        '<p class="hm-sub">Add a child (Maple, Aspen, or Pine) with your own passcode as their grown-up, or set up a profile for someone you love and stay close as their helper.</p>' +
        '<div class="hm-acts"><button type="button" class="hm-btn hm-p-branches" data-hm="addkid">' + I('plus') + 'Add a Family Member</button><button type="button" class="hm-btn line hm-p-branches" data-hm="addlove">' + I('love') + 'Someone I Love</button></div></article></div>' +
      helpLine() + '</div>';
  }

  /* ---------- BLD 869: My Tree, a tab of the app (the person's own tree, inside) ---------- */
  function treeTabHtml() {
    var t = TREES[S.tree] || TREES.oak;
    return '<div class="hm-treetab"><nav class="hm-tabs" id="hm-tabs" aria-label="The Grounded Way"></nav><iframe class="hm-tree-if" src="' + t.href + '" title="My ' + esc(t.n) + '" allow="fullscreen; autoplay; clipboard-write" allowfullscreen></iframe></div>';
  }
  /* ---------- BLD 869: More (your tools, then settings and privacy) ---------- */
  function moreHtml() {
    var h = homeRec(), x = privacyHtml();
    x = x.replace('<h1 class="hm-h2">Settings and Privacy</h1>', '<h1 class="hm-h2">More</h1>');
    var i = x.indexOf('</div>', x.indexOf('class="hm-back"')) + 6;
    return x.slice(0, i) + toolsHtml(h, true).replace('<a href="#privacy">Settings and Privacy</a>', '') + '<h2 class="hm-h2" style="margin-top:30px">Settings and Privacy</h2>' + x.slice(i);
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
    return '<div class="hm-wrap"><div class="hm-lay kidlay"><div class="hm-kid">' +
      '<div class="hm-ksky"><img class="art" src="' + IMG + (eve ? 'home-evening' : 'home-morning') + '-narrow.webp" alt=""><div class="hi"><span><b>Hi, ' + esc(S.p.name) + '!</b><small>' + DAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + '</small></span></div><img class="mark" src="' + mark(S.tree) + '" alt=""></div>' +
      '<div class="hm-kin">' +
        '<div class="hm-kcard" style="--c:#FF9F1C"><h2 class="hm-kh">Your ' + t.n + ' Is Growing</h2><div class="hm-kparts">' + parts + '</div><p style="margin-top:10px;font-weight:500">' + esc(line) + '</p></div>' +
        '<div class="hm-kcard" style="--c:#9B5DE5"><div class="hm-kprac"><button type="button" class="ill" data-hm-play="' + id + '" aria-label="Play ' + esc(v[0]) + '"><img src="' + IMG + ART[lead] + '.webp" alt=""><span>' + I('play') + '</span></button><div><h3 class="hm-kh">Today: ' + esc(v[0]) + '</h3><p>' + esc(v[2]) + '</p></div></div>' +
          '<button class="hm-kbtn" type="button" style="margin-top:12px" data-hm="kiddid" aria-pressed="' + did + '">' + I('check') + (did ? 'You Did It!' : 'We Did It!') + '</button></div>' +
        (did ? '<div class="hm-kcard hm-surprise" style="--c:#00B4D8"><svg viewBox="0 0 52 52" aria-hidden="true"><g class="bird"><ellipse cx="26" cy="30" rx="13" ry="10" fill="#00B4D8"/><circle cx="34" cy="22" r="7" fill="#00B4D8"/><circle cx="36" cy="21" r="1.6" fill="#2C1810"/><path d="M40 22l6 2-6 2z" fill="#FF9F1C"/><path d="M16 28c4-6 10-6 14-2-5 1-9 3-14 2z" fill="#0090B0"/></g><path d="M8 44h36" stroke="#8A5A36" stroke-width="4" stroke-linecap="round"/></svg><div><h3 class="hm-kh" style="font-size:20px">A visitor came to your tree!</h3><div style="font-size:15px;font-weight:500">A little bird stopped by because you tended your tree today.</div></div></div>' : '') +
        '<a class="hm-kbtn" href="' + t.href + '" style="--c:#4FA82C">' + I('people') + 'Check In With My Grown-up</a>' +
      '</div></div></div></div>';
  }

  /* ---------- clicks ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-hm],[data-hm-who],[data-hm-stage],[data-hm-part],[data-hm-setpart],[data-hm-ck],[data-hm-play],[data-hm-open],[data-hm-nav]');
    if (!t || !t.closest('.hm')) return;
    if (t.hasAttribute('data-hm-nav')) {
      var nv = t.getAttribute('data-hm-nav');
      if (nv === 'home' || nv === 'more' || nv === 'tending' || nv === 'tree') { e.preventDefault(); goTo(nv); return; }
      if ((nv === 'tools' || nv === 'sober') && S.view !== 'home') { e.preventDefault(); var tgt = nv === 'tools' ? 'hm-tools' : 'hm-sober'; goTo('home'); setTimeout(function () { var x = document.getElementById(tgt); if (x) x.scrollIntoView({ block: 'start' }); }, 60); }
      return;
    }
    if (t.hasAttribute('data-hm-who')) { W.who = t.getAttribute('data-hm-who'); t.parentNode.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b === t)); }); return; }
    if (t.hasAttribute('data-hm-stage')) {
      W.stage = t.getAttribute('data-hm-stage'); document.querySelectorAll('[data-hm-stage]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === t)); });
      var nt = document.getElementById('hm-stage-note'), st = TREES[W.stage];
      if (nt) nt.textContent = st.season ? st.n + ' joins your Tools. Your own tree follows your age, and you can change it any time.' : W.stage === 'pine' ? 'Pine is set up with a grown-up who agrees, and only the teen\'s passcode opens it.' : 'Maple and Aspen are set up with a grown-up, who keeps a key with their own passcode.';
      return;
    }
    if (t.hasAttribute('data-hm-part')) { var k = t.getAttribute('data-hm-part'); W.parts[k] = !W.parts[k]; t.setAttribute('aria-pressed', String(W.parts[k])); return; }
    if (t.hasAttribute('data-hm-setpart')) {
      var h = homeRec(), sk = t.getAttribute('data-hm-setpart'), i = h.parts.indexOf(sk);
      if (i >= 0) h.parts.splice(i, 1); else h.parts.push(sk);
      t.setAttribute('aria-pressed', String(i < 0)); saveHome(); toast('Saved, locked on this device.'); return;
    }
    if (t.hasAttribute('data-hm-ck')) {
      var hk = homeRec(), rec = todayRec(hk), key = t.getAttribute('data-hm-ck'), on = !rec[key];
      rec[key] = on ? 1 : 0; pruneDays(hk); saveHome();
      t.setAttribute('aria-pressed', String(on));
      if (on && !matchMedia('(prefers-reduced-motion: reduce)').matches) { var box = t.querySelector('.box'), burst = document.createElement('span'); burst.className = 'hm-burst'; for (var j = 0; j < 8; j++) { var a = j / 8 * Math.PI * 2, dd = 22 + (j % 2) * 8, dot = document.createElement('i'); dot.style.setProperty('--x', Math.cos(a) * dd + 'px'); dot.style.setProperty('--y', Math.sin(a) * dd + 'px'); burst.appendChild(dot); } box.appendChild(burst); setTimeout(function () { burst.remove(); }, 800); }
      setTimeout(paintToday, on ? 650 : 0); return;
    }
    if (t.hasAttribute('data-hm-play')) { playVideo(t.getAttribute('data-hm-play'), t); return; }
    if (t.hasAttribute('data-hm-open')) {
      var sec = t.getAttribute('data-hm-open');
      if (window.GGHealth && tendReady()) { window.GGHealth.open(sec); return; }
      goTo('tending'); return;
    }
    var act = t.getAttribute('data-hm');
    if (act === 'open') GGP.openDialog().then(render);
    else if (act === 'create') create();
    else if (act === 'home') goTo('home');
    else if (act === 'addtend') { var ha = homeRec(); ['move', 'food'].forEach(function (x) { if (ha.parts.indexOf(x) < 0) ha.parts.push(x); }); saveHome().then(function () { goTo('tending'); }); }
    else if (act === 'hidetend') { homeRec().hidden.tend = true; saveHome(); toast('Hidden. Tending waits in Settings whenever you like.'); render(); }
    else if (act === 'showtend') { homeRec().hidden.tend = false; saveHome(); render(); }
    else if (act === 'anotherq') { var r = todayRec(homeRec()); r.q = (+r.q || 0) + 1; saveHome(); paintToday(); }
    else if (act === 'backup') GGP.saveBackup();
    else if (act === 'restore') GGP.restore(function () { render(); });
    else if (act === 'rootwords') GGP.rootWords(S.id);
    else if (act === 'manage') GGP.manage(S.id);
    else if (act === 'lock') GGP.lock().then(function () { goTo('home'); });
    else if (act === 'addkid') GGP.createDialog({ reason: 'Add a family member. Kids and teens are set up with you as their grown-up.' }).then(function (ok) { if (ok) goTo('home'); else render(); });
    else if (act === 'addlove') GGP.createDialog({ forOther: true, keepMe: true }).then(function (ok) { if (ok) goTo('home'); else render(); });
    else if (act === 'kiddid') { var hd = homeRec(); hd.kid[today()] = hd.kid[today()] ? 0 : 1; saveHome(); render(); }
  });
  function pruneDays(h) { var cut = addDays(today(), -60); Object.keys(h.days).forEach(function (k) { if (k < cut) delete h.days[k]; }); }

  /* ---------- start ---------- */
  function boot() {
    mountIcons();
    if (!window.GGP) { var r = app(); if (r) r.innerHTML = welcomeHtml(); return; }
    GGP.on(function (type) { if (type === 'change' || type === 'ready') render(); else if (type === 'data' && S.view === 'home') render(); });
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
    var t = { 'living-sober.html': 'Living Sober', 'get-grounded-now.html': 'Get Grounded Now', 'readings.html': 'Readings Library', 'the-grounded-way.html': 'The Grounded Way' }[seg];
    return t || 'Grounded';
  }
  function openFrame(u, push) {
    closeFrame(true);
    var wrap = document.createElement('div'); wrap.className = 'hm-frame'; wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-label', frameTitle(u));
    wrap.innerHTML = '<div class="hm-frame-bar"><button type="button" class="hm-frame-home">' + I('home') + '<span>Back</span></button><b class="hm-frame-t">' + esc(frameTitle(u)) + '</b><span class="hm-frame-sp"></span></div>' +
      '<iframe class="hm-frame-if" title="' + esc(frameTitle(u)) + '" allow="fullscreen; autoplay; clipboard-write" allowfullscreen></iframe>';
    var host = document.querySelector('main.hm') || document.body; host.appendChild(wrap);
    var ifr = wrap.querySelector('iframe'); ifr.src = u.pathname + u.search + u.hash;
    ifr.addEventListener('load', function () { try { var t = (ifr.contentDocument.title || '').replace(/\s*\|.*$/, ''); if (t) wrap.querySelector('.hm-frame-t').textContent = t; } catch (e) {} });
    wrap.querySelector('.hm-frame-home').addEventListener('click', function () { if (history.state && history.state.hmFrame) history.back(); else closeFrame(); });
    document.documentElement.classList.add('hm-framed');
    FRAME = wrap;
    if (push !== false) { try { history.pushState({ hmFrame: u.pathname + u.search + u.hash }, '', location.pathname + location.hash); } catch (e) {} }
  }
  function closeFrame(quiet) {
    if (!FRAME) return; FRAME.remove(); FRAME = null; document.documentElement.classList.remove('hm-framed');
    if (!quiet) render();
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
  window.addEventListener('message', function (e) { if (e.origin === location.origin && e.data === 'gg-home-close' && FRAME) { if (history.state && history.state.hmFrame) history.back(); else closeFrame(); } });
})();
