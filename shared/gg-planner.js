/* =====================================================================
   FAMILY PLANNER (shared/gg-planner.js), GWG BLD 950
   Chris (November 7, 2026): "our family calendar we all share.. so we can plan family camping trips.. vacations..,
   older kids have to get work off.. [a teen] can put theatre days on there.. a communication hub.. a live wall for notes
   to each other.. shared schedules.. this can be a big feature for the Relationships category".
   Plan: grounded-workshop patches/plan/family-planner-plan.md. Notes and choices: patches/bld950/NOTES.md.

   Three places, in The Grounded Way's Library (Grounded Relationships) and on the Week tab:
     Family Calendar   events (title, kind, date, last day, all day or a time, who it is for, repeats, notes),
                       a month view and an agenda view, Back and Next, and Plan Something Together when a month has
                       no Family Time or Unplugged time yet
     Family Wall       short notes to each other, newest first, pinned notes on top, four kind reactions, the weekly
                       Family Check-in (one open question), Clear Old Notes
     Shared Schedules  who is where this week, built from the calendar, with the Family Kitchen dinners (read only)

   Where it lives
   - On this device: one family planner is one box in localStorage (gg-plan:<fid>), AES-GCM with the planner's own
     random key (AAD gg-plan-v1|<fid>). The key lives inside each family member's vault (vault.planner = {fid, k, at,
     by}), so only a profile that holds it can open the box. A grown-up who starts the planner holds it, and so does
     each child they open (Maple and Aspen). A teen or another grown-up on this device gets it when they type their
     own passcode beside the grown-up (GGP.giveTo in shared/gg-profiles.js, which writes that one record only).
   - With Accounts live and a Household: the Household shared space 'planner' (shared/gg-sync.js), end to end
     encrypted with the Household space key exactly like the Family Kitchen and Grounded Money. GGPlanner.space is the
     adapter: get() answers the planner's content, put() takes the merged copy. A grown-up on a new phone who meets the
     Household's planner starts their own box with it.
   Nothing here tracks a location, reads what is written, or sends any alert. Nothing leaves the family.

   Who does what
     grown-up  everything: events, the Wall, pins, Clear Old Notes, people, adding family on this device, Household
     teen      sees it all, adds and changes their own events, posts on the Wall, reacts, removes their own notes
     kid       a simple read only family week on Today (GGPlanner.kidCard)
   Membership: Start keeps the Family Calendar and Shared Schedules for this device (the grown-up, the children they
   open, and people added by name). Membership opens the Family Wall with the Family Check-in, adding a teen or another
   grown-up on this device, and the Household.

   The seam for other relationships (a later round): plan.circle is 'family' today; CIRCLES holds the words for each
   circle, so couples, caregivers sharing a schedule, and small groups can each get their own planner later.

   For a host page
     GGPlanner.host(h)        h: {id(), age(), name(), member(), dinners(weekOffset) -> {YYYY-MM-DD: title},
                               toast(m), onView(v), onMembership(k), household() -> null or {shared}, share() -> Promise}
     GGPlanner.render(box, o) the planner; o.view 'cal', 'wall', or 'week'; o.bare leaves out its own title (the host shows
                              one). Returns {go(view), refresh(), destroy()}
     GGPlanner.weekCard(el, off), GGPlanner.kidCard(el)   the Week tab card and a kid's family week
     GGPlanner.load(), has(), space {get, put}, on(fn), off(fn), model (for tests)
   No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGPlanner) return;
  var V = 'b951';
  var HERE = (function () { try { var s = document.currentScript && document.currentScript.src; return s ? s.replace(/[^/]*$/, '') : '/shared/'; } catch (e) { return '/shared/'; } })();
  var subtle = window.crypto && crypto.subtle, enc = new TextEncoder(), dec = new TextDecoder();
  var BOXK = 'gg-plan:';

  var CIRCLES = { family: { name: 'Family Planner', cal: 'Family Calendar', wall: 'Family Wall', week: 'Shared Schedules', us: 'your family' } };
  var KINDS = [
    { id: 'trip', n: 'Trip', ic: 'map', ph: 'Camping at the lake' },
    { id: 'off', n: 'Work Day Off', ic: 'sun', ph: 'Day off for the trip' },
    { id: 'show', n: 'Performance', ic: 'star', ph: 'Theatre night' },
    { id: 'game', n: 'Game', ic: 'ball', ph: 'Soccer game' },
    { id: 'bday', n: 'Birthday', ic: 'gift', ph: 'Birthday' },
    { id: 'appt', n: 'Appointment', ic: 'clock', ph: 'Dentist' },
    { id: 'family', n: 'Family Time', ic: 'people', ph: 'Game night' },
    { id: 'unplug', n: 'Unplugged', ic: 'leaf', ph: 'Unplugged evening outdoors' },
    { id: 'other', n: 'Other', ic: 'dot', ph: 'Something to remember' }
  ];
  var KIND = {}; KINDS.forEach(function (k) { KIND[k.id] = k; });
  var COLORS = ['sage', 'sky', 'plum', 'clay', 'honey', 'teal', 'rose', 'slate'];
  var REACTS = [['love', 'Love', 'heart'], ['thanks', 'Thank You', 'hands'], ['proud', 'Proud of You', 'star'], ['gotit', 'Got It', 'check']];
  // The weekly Family Check-in: open questions only, never about harm (CLAUDE.md, open questions)
  var QUESTIONS = [
    'What was a bright spot for our family this week?',
    'What is something you are looking forward to?',
    'Who helped you this week, and how?',
    'What is one thing we could do together soon?',
    'What made you laugh this week?',
    'What is something new you learned this week?',
    'What would help next week feel calm?',
    'Where would you love for us to go together?',
    'What is something you are proud of this week?',
    'What was your favorite moment at the table this week?',
    'What is a way we could help someone this week?',
    'What is one thing you are grateful for in our family?'
  ];
  // Plan Something Together: healthy, face to face, unplugged ideas
  var IDEAS = [['family', 'Family Walk'], ['family', 'Picnic at the Park'], ['unplug', 'Game Night, Unplugged'], ['family', 'Cook Dinner Together'], ['family', 'Bike Ride'], ['unplug', 'Stargazing Night'], ['family', 'Library Afternoon'], ['unplug', 'Hike and a Packed Lunch']];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var MAXN = 300, MAXE = 1500, OLD = 30;

  /* ---------- plain helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function arr(x) { return Array.isArray(x) ? x : []; }
  function obj(x) { return x && typeof x === 'object' && !Array.isArray(x) ? x : {}; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parse(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || '')); return m ? new Date(+m[1], +m[2] - 1, +m[3], 12) : null; }
  function today() { return ymd(new Date()); }
  function addD(s, n) { var d = parse(s); d.setDate(d.getDate() + n); return ymd(d); }
  function dayDiff(a, b) { return Math.round((parse(b) - parse(a)) / 864e5); }
  function monday(s) { var d = parse(s); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return ymd(d); }
  function rid() { var b = crypto.getRandomValues(new Uint8Array(9)); return b64u(b); }
  function b64u(u8) { var s = ''; for (var i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function unb64u(t) { t = String(t).replace(/-/g, '+').replace(/_/g, '/'); while (t.length % 4) t += '='; var s = atob(t), u = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; }
  function isYmd(s) { return /^\d{4}-\d{2}-\d{2}$/.test(String(s || '')) && !!parse(s); }
  function clip(s, n) { return String(s == null ? '' : s).replace(/[\u0000-\u0008\u000B-\u001F]/g, '').slice(0, n); }
  function niceDate(s, long) { var d = parse(s); if (!d) return ''; return (long ? DAYS[d.getDay()] + ', ' : DAYS[d.getDay()].slice(0, 3) + ', ') + (long ? MONTHS[d.getMonth()] : MONTHS[d.getMonth()].slice(0, 3)) + ' ' + d.getDate(); }
  function niceTime(t) { var m = /^(\d{2}):(\d{2})$/.exec(String(t || '')); if (!m) return ''; var h = +m[1], ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + ':' + m[2] + ' ' + ap; }
  function weekNo(s) { var d = parse(monday(s)); var y0 = new Date(d.getFullYear(), 0, 1, 12); return Math.floor((d - y0) / (7 * 864e5)); }

  /* ---------- icons (inline, stroke only) ---------- */
  var ICON = {
    map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    ball: '<circle cx="12" cy="12" r="9"/><path d="M12 7l4 3-1.5 4.5h-5L8 10z"/>',
    gift: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8c-2-4-6-3-6 0h6zM12 8c2-4 6-3 6 0h-6z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.2c3 .2 5.5 2.4 5.5 5.8"/>',
    leaf: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19 13 11"/>',
    dot: '<circle cx="12" cy="12" r="4"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    hands: '<path d="M7 11V6a1.5 1.5 0 0 1 3 0v5M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V12M16 9a1.5 1.5 0 0 1 3 0v4c0 4-3 7-7 7s-6-2-7-5l-1.5-3a1.5 1.5 0 0 1 2.6-1.5L7 13"/>',
    check: '<path d="m5 12 4.5 4.5L19 7"/>',
    pin: '<path d="M9 3h6l-1 6 3 3H7l3-3z"/><path d="M12 12v9"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    back: '<path d="m15 5-7 7 7 7"/>',
    next: '<path d="m9 5 7 7-7 7"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    list: '<path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
    wall: '<path d="M4 5h16v11H8l-4 4z"/>',
    week: '<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M8 5v15M13 5v15M18 5v15"/>',
    bowl: '<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 7c0-2 2-2 2-4M13 7c0-2 2-2 2-4"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    house: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>'
  };
  function I(n) { return '<svg class="gp-i" viewBox="0 0 24 24" aria-hidden="true">' + (ICON[n] || ICON.dot) + '</svg>'; }

  /* ---------- the host ---------- */
  var H = { id: function () { return null; }, age: function () { return 'adult'; }, name: function () { return ''; }, member: function () { return false; }, dinners: null, toast: null, onView: null, onMembership: null, household: null, share: null, go: null };
  function host(h) { Object.keys(h || {}).forEach(function (k) { if (h[k] != null) H[k] = h[k]; }); }
  function me() { try { return H.id() || null; } catch (e) { return null; } }
  function role() { var a = ''; try { a = H.age(); } catch (e) {} return a === 'pine' ? 'teen' : a === 'maple' || a === 'aspen' ? 'kid' : 'adult'; }
  function member() { try { return !!H.member(); } catch (e) { return false; } }
  function toast(m) { if (typeof H.toast === 'function') H.toast(m); }
  function G() { return window.GGP || null; }

  /* ---------- the model ---------- */
  function blank(fid) { return { v: 1, circle: 'family', fid: fid, people: [], events: [], notes: [], pins: {}, reacts: {}, u: 0 }; }
  // Content as it travels (the Household space): everything but this device's own box id
  var PARTS = ['circle', 'people', 'events', 'notes', 'pins', 'reacts'];
  function content(p) { var o = {}; PARTS.forEach(function (k) { if (p[k] !== undefined) o[k] = JSON.parse(JSON.stringify(p[k])); }); return o; }
  // Clean what comes in (from a box, a sync, or a form), so a bad record never draws
  function cleanEvent(e) {
    if (!e || typeof e.id !== 'string' || !isYmd(e.d)) return null;
    var o = { id: clip(e.id, 40), t: clip(e.t, 80) || 'Event', k: KIND[e.k] ? e.k : 'other', d: e.d, u: +e.u || 0 };
    if (isYmd(e.e) && e.e > e.d && dayDiff(e.d, e.e) <= 60) o.e = e.e;
    if (/^\d{2}:\d{2}$/.test(e.tm || '')) o.tm = e.tm;
    o.w = arr(e.w).filter(function (x) { return typeof x === 'string'; }).slice(0, 12);
    if (e.r === 'w' || e.r === 'y') o.r = e.r;
    if (e.o) o.o = clip(e.o, 400);
    if (typeof e.by === 'string') o.by = e.by;
    return o;
  }
  function cleanNote(n) {
    if (!n || typeof n.id !== 'string' || typeof n.t !== 'string' || !n.t.trim()) return null;
    var o = { id: clip(n.id, 40), t: clip(n.t, 400), at: +n.at || 0, by: typeof n.by === 'string' ? n.by : '', u: +n.u || 0 };
    if (typeof n.ck === 'string' && isYmd(n.ck)) o.ck = n.ck;
    return o;
  }
  function cleanPerson(p) {
    if (!p || typeof p.id !== 'string' || typeof p.n !== 'string') return null;
    var o = { id: clip(p.id, 40), n: clip(p.n, 30) || 'Someone', c: COLORS.indexOf(p.c) >= 0 ? p.c : 'sage', u: +p.u || 0 };
    if (p.pf) o.pf = 1;          // a profile (its id is the profile's id)
    if (p.in) o.in = 1;          // holds the planner key on a family device
    if (p.age === 'pine' || p.age === 'kid' || p.age === 'adult') o.age = p.age;
    return o;
  }
  function fixPlan(p, fid) {
    p = obj(p);
    var o = blank(fid || p.fid || '');
    o.circle = CIRCLES[p.circle] ? p.circle : 'family';
    o.people = arr(p.people).map(cleanPerson).filter(Boolean);
    o.events = arr(p.events).map(cleanEvent).filter(Boolean).slice(0, MAXE);
    o.notes = arr(p.notes).map(cleanNote).filter(Boolean).slice(0, MAXN);
    Object.keys(obj(p.pins)).forEach(function (k) { if (+p.pins[k]) o.pins[k] = +p.pins[k]; });
    Object.keys(obj(p.reacts)).forEach(function (k) { var r = obj(p.reacts[k]), out = {}; Object.keys(r).forEach(function (w) { if (REACTS.some(function (x) { return x[0] === r[w]; })) out[w] = r[w]; }); if (Object.keys(out).length) o.reacts[k] = out; });
    o.u = +p.u || 0;
    return o;
  }

  // Occurrences of one event between two dates: [{d, first, last}]; repeats weekly or yearly, a span up to 60 days.
  function occ(e, from, to) {
    var out = [], dur = e.e ? dayDiff(e.d, e.e) : 0, starts = [];
    if (e.r === 'w') {
      var gap = dayDiff(e.d, from) - dur, k = Math.max(0, Math.floor(gap / 7));
      for (var s = addD(e.d, k * 7), n = 0; s <= to && n < 60; s = addD(s, 7), n++) starts.push(s);
    } else if (e.r === 'y') {
      var md = e.d.slice(5), y0 = +from.slice(0, 4) - 1, y1 = +to.slice(0, 4);
      for (var y = Math.max(y0, +e.d.slice(0, 4)); y <= y1; y++) { var dd = y + '-' + md; if (!isYmd(dd)) dd = y + '-02-28'; if (dd >= e.d) starts.push(dd); }
    } else starts.push(e.d);
    starts.forEach(function (s0) {
      for (var i = 0; i <= dur; i++) { var d = addD(s0, i); if (d >= from && d <= to) out.push({ d: d, first: i === 0, last: i === dur, i: i }); }
    });
    return out;
  }
  // Every day between from and to: {YYYY-MM-DD: [{ev, first, last}]}, all day first, then by time
  function byDay(plan, from, to) {
    var m = {};
    arr(plan && plan.events).forEach(function (e) { occ(e, from, to).forEach(function (o) { (m[o.d] = m[o.d] || []).push({ ev: e, first: o.first, last: o.last, i: o.i }); }); });
    Object.keys(m).forEach(function (d) { m[d].sort(function (a, b) { return (a.ev.tm || '') < (b.ev.tm || '') ? -1 : (a.ev.tm || '') > (b.ev.tm || '') ? 1 : a.ev.t < b.ev.t ? -1 : 1; }); });
    return m;
  }
  function monthHasTogether(plan, ym) {
    var from = ym + '-01', d = parse(from); d.setMonth(d.getMonth() + 1); d.setDate(0);
    var m = byDay(plan, from, ymd(d));
    return Object.keys(m).some(function (k) { return m[k].some(function (x) { return x.ev.k === 'family' || x.ev.k === 'unplug'; }); });
  }
  function question(day) { return QUESTIONS[((weekNo(day) % QUESTIONS.length) + QUESTIONS.length) % QUESTIONS.length]; }

  /* ---------- the box on this device ---------- */
  var P = { fid: '', key: null, plan: null, who: null, p: null, subs: [] };
  function rec(id) {
    var g = G(); id = id || me();
    if (!g || !id || !g.isOpen || !g.isOpen(id)) return null;
    var d = g.data(id), r = d && d.planner;
    return r && typeof r.fid === 'string' && typeof r.k === 'string' ? r : null;
  }
  function keyOf(k) { return subtle.importKey('raw', unb64u(k), { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']); }
  function readBox(fid, key) {
    var box = null; try { box = JSON.parse(localStorage.getItem(BOXK + fid)); } catch (e) {}
    if (!box || !box.iv || !box.ct) return Promise.resolve(null);
    return subtle.decrypt({ name: 'AES-GCM', iv: unb64u(box.iv), additionalData: enc.encode('gg-plan-v1|' + fid) }, key, unb64u(box.ct))
      .then(function (b) { return fixPlan(JSON.parse(dec.decode(b)), fid); }).catch(function () { return null; });
  }
  function writeBox() {
    if (!P.plan || !P.key) return Promise.resolve();
    var iv = crypto.getRandomValues(new Uint8Array(12)), fid = P.fid;
    return subtle.encrypt({ name: 'AES-GCM', iv: iv, additionalData: enc.encode('gg-plan-v1|' + fid) }, P.key, enc.encode(JSON.stringify(P.plan))).then(function (ct) {
      try { localStorage.setItem(BOXK + fid, JSON.stringify({ v: 1, iv: b64u(iv), ct: b64u(new Uint8Array(ct)) })); } catch (e) { toast('This device is full. Clear old notes to make room.'); }
    });
  }
  function emit(t) { P.subs.slice().forEach(function (fn) { try { fn(t || 'data'); } catch (e) { if (window.console) console.error(e); } }); }
  function poke() { try { if (window.GGSync && GGSync.spaces && GGSync.spaces().some(function (s) { return s.kind === 'planner'; })) GGSync.changed('planner'); } catch (e) {} }
  // Load the planner for the open profile (once per profile and box); answers the plan or null
  function load() {
    var id = me(), r = rec(id);
    if (!r || !subtle) { P.fid = ''; P.key = null; P.plan = null; P.who = id; P.p = null; return Promise.resolve(null); }
    if (P.plan && P.fid === r.fid && P.who === id) return Promise.resolve(P.plan);
    if (P.p && P.p.fid === r.fid && P.p.who === id) return P.p.pr;
    var job = { fid: r.fid, who: id };
    job.pr = keyOf(r.k).then(function (key) {
      return readBox(r.fid, key).then(function (plan) {
        if (P.p !== job) return P.plan;
        P.fid = r.fid; P.key = key; P.who = id; P.plan = plan || blank(r.fid); P.p = null;
        return settle().then(function () { return P.plan; });
      });
    }).catch(function () { P.p = null; return null; });
    P.p = job;
    return job.pr;
  }
  function has() { return !!rec(); }
  // Change the planner: the newest copy on this device first (another tab may have written), then fn, then lock and store
  function mutate(fn) {
    return load().then(function (plan) {
      if (!plan) return false;
      return readBox(P.fid, P.key).then(function (fresh) {
        if (fresh) P.plan = fresh;
        var r = fn(P.plan);
        P.plan.u = Date.now();
        return writeBox().then(function () { emit('data'); poke(); return r === undefined ? true : r; });
      });
    });
  }
  window.addEventListener('storage', function (e) {
    if (!P.fid || e.key !== BOXK + P.fid || !P.key) return;
    readBox(P.fid, P.key).then(function (p) { if (p) { P.plan = p; emit('data'); } });
  });

  /* ---------- people ---------- */
  function nextColor(plan) { var used = plan.people.map(function (p) { return p.c; }); return COLORS.filter(function (c) { return used.indexOf(c) < 0; })[0] || COLORS[plan.people.length % COLORS.length]; }
  function firstName(n) { return String(n || '').trim().split(/\s+/)[0] || 'Someone'; }
  function ageRole(a) { return a === 'pine' ? 'pine' : a === 'maple' || a === 'aspen' ? 'kid' : 'adult'; }
  function addPerson(plan, id, name, age, flags) {
    var p = plan.people.filter(function (x) { return x.id === id; })[0];
    if (p) { var ch = false; if (flags && flags.in && !p.in) { p.in = 1; ch = true; } if (ch) p.u = Date.now(); return ch; }
    p = { id: id, n: clip(name, 30), c: nextColor(plan), u: Date.now() };
    if (flags && flags.pf) p.pf = 1; if (flags && flags.in) p.in = 1; if (age) p.age = ageRole(age);
    plan.people.push(p); return true;
  }
  // The open profile joins its people (with the children and teens under a grown-up), and each child the grown-up opens
  // here gets the key (they open with the grown-up already, so no passcode is asked).
  function settle() {
    var g = G(), id = me(), plan = P.plan; if (!g || !id || !plan) return Promise.resolve();
    var ch = addPerson(plan, id, firstName(H.name()), H.age(), { pf: 1, in: 1 }), r = rec(id), jobs = [];
    if (role() === 'adult') {
      g.list().forEach(function (q) {
        if (q.id === id || (q.grown || []).indexOf(id) < 0) return;
        if (addPerson(plan, q.id, firstName(q.name), q.age, { pf: 1 })) ch = true;
        if ((q.age === 'maple' || q.age === 'aspen') && g.isOpen(q.id)) {
          var kd = g.data(q.id), kr = kd && kd.planner;
          if (!kr || kr.fid !== r.fid) jobs.push(g.giveTo(q.id, '', 'planner', { fid: r.fid, k: r.k, at: today(), by: id }).then(function () { var pp = plan.people.filter(function (x) { return x.id === q.id; })[0]; if (pp && !pp.in) { pp.in = 1; pp.u = Date.now(); return writeBox(); } }).catch(function () {}));
        }
      });
    }
    return Promise.all(jobs).then(function () { if (ch) { plan.u = Date.now(); return writeBox().then(poke); } });
  }
  // A grown-up starts the planner (from = content to begin with, as when a Household's planner first arrives)
  function start(from) {
    var g = G(), id = me();
    if (!g || !id || role() !== 'adult' || !subtle) return Promise.resolve(false);
    var fid = rid(), raw = crypto.getRandomValues(new Uint8Array(32)), r = { fid: fid, k: b64u(raw), at: today(), by: id };
    g.data(id).planner = r;
    return g.save(id).then(function () { return keyOf(r.k); }).then(function (key) {
      P.fid = fid; P.key = key; P.who = id; P.p = null;
      P.plan = from ? fixPlan(from, fid) : blank(fid);
      return settle();
    }).then(function () { return writeBox(); }).then(function () { emit('data'); poke(); return true; });
  }
  // Add a teen or another grown-up on this device: they type their own passcode here
  function addHere(pid, pass) {
    var g = G(), r = rec(); if (!g || !r) return Promise.reject(new Error('Open the Family Planner first.'));
    var q = g.get(pid); if (!q) return Promise.reject(new Error('Choose someone on this device.'));
    return g.giveTo(pid, pass, 'planner', { fid: r.fid, k: r.k, at: today(), by: me() }).then(function () {
      return mutate(function (plan) { addPerson(plan, pid, firstName(q.name), q.age, { pf: 1, in: 1 }); });
    });
  }

  /* ---------- the Household space (Accounts live) ---------- */
  var space = {
    get: function () {
      // a grown-up open here with no planner yet answers an empty copy, so the Household's planner can come in
      if (!rec()) return me() && role() === 'adult' && subtle ? {} : null;
      if (!P.plan || P.who !== me()) { load(); return null; }
      return content(P.plan);
    },
    put: function (o) {
      if (!o || typeof o !== 'object') return;
      var id = me();
      if (!rec(id)) { if (role() !== 'adult') return; return start(o).then(function () { toast('The Family Planner is here from your Household.'); }); }
      return load().then(function (plan) {
        if (!plan) return;
        var nx = fixPlan(o, P.fid);
        PARTS.forEach(function (k) { P.plan[k] = nx[k]; });
        return writeBox().then(function () { return settle(); }).then(function () { emit('data'); });
      });
    }
  };

  /* ---------- CSS ---------- */
  function css() {
    if (document.getElementById('gp-css')) return;
    var lk = document.createElement('link'); lk.id = 'gp-css'; lk.rel = 'stylesheet'; lk.href = HERE + 'gg-planner.css?v=' + V; document.head.appendChild(lk);
  }

  /* ---------- small pieces of the page ---------- */
  function person(plan, id) { return arr(plan.people).filter(function (p) { return p.id === id; })[0] || null; }
  function whoLine(plan, e) {
    var w = arr(e.w).map(function (id) { return person(plan, id); }).filter(Boolean);
    return w.length ? w.map(function (p) { return p.n; }).join(', ') : 'Everyone';
  }
  function colorOf(plan, e) { var p = person(plan, arr(e.w)[0]); return p ? p.c : 'fam'; }
  function dots(plan, e) {
    var w = arr(e.w).map(function (id) { return person(plan, id); }).filter(Boolean);
    if (!w.length) return '<span class="gp-dot gp-c-fam" aria-hidden="true"></span>';
    return w.slice(0, 4).map(function (p) { return '<span class="gp-dot gp-c-' + p.c + '" aria-hidden="true"></span>'; }).join('');
  }
  function timeLine(e, x) {
    var t = e.tm ? niceTime(e.tm) : 'All day';
    if (e.e) t += ' · ' + (x ? 'Day ' + (x.i + 1) + ' of ' + (dayDiff(e.d, e.e) + 1) : 'Through ' + niceDate(e.e));
    return t;
  }
  function canEdit(e) { var r = role(); return r === 'adult' || (r === 'teen' && e.by === me()); }

  /* =====================================================================
     RENDER
     ===================================================================== */
  function render(box, o) {
    o = o || {}; css();
    // The place in the planner (month, day, week, a note being written) is kept for this page, so a redraw of the
    // whole Home (a sync, a profile change) brings the person back to the same spot with their words still there.
    if (!P.ui || P.ui.who !== me()) P.ui = { who: me(), ym: today().slice(0, 7), mode: 'month', pick: '', wk: 0, draft: '', ck: false };
    var st = P.ui; st.view = /^(cal|wall|week)$/.test(o.view || '') ? o.view : 'cal'; st.add = ''; st.sure = '';
    try { var sm = sessionStorage.getItem('gg-plan-mode'); if (sm === 'agenda' || sm === 'month') st.mode = sm; } catch (e) {}
    var root = document.createElement('div'); root.className = 'gp'; box.innerHTML = ''; box.appendChild(root);
    var dlg = null, alive = true;
    function setView(v) { st.view = v; st.sure = ''; if (typeof H.onView === 'function') H.onView(v); paint(); }
    function sub() { if (alive) paint(); }
    P.subs.push(sub);

    function head(plan) {
      var c = CIRCLES[(plan && plan.circle) || 'family'];
      var tabs = [['cal', c.cal, 'cal'], ['wall', c.wall, 'wall'], ['week', c.week, 'week']];
      return (o.bare ? '' : '<header class="gp-top"><span class="gp-badge">' + I('cal') + '</span><div><div class="gp-k">Grounded Relationships</div><h2 class="gp-h2">' + esc(c.name) + '</h2></div></header>') +
        (plan ? '<nav class="gp-tabs" aria-label="' + esc(c.name) + '">' + tabs.map(function (t) { return '<button type="button" class="gp-tab" data-gp="view:' + t[0] + '"' + (st.view === t[0] ? ' aria-current="page"' : '') + '>' + I(t[2]) + esc(t[1]) + '</button>'; }).join('') + '</nav>' : '');
    }
    function foot() { return '<p class="gp-note">' + I('lock') + '<span>The Family Planner holds only what your family adds here, locked so only your family can open it.</span></p>'; }

    function paint() {
      if (!alive) return;
      load().then(function (plan) {
        if (!alive) return;
        if (!plan) { root.innerHTML = '<div class="gp-shell">' + head(null) + welcome() + '</div>'; return; }
        var body = st.view === 'wall' ? wallHtml(plan) : st.view === 'week' ? weekHtml(plan) : calHtml(plan);
        var fk = document.activeElement && root.contains(document.activeElement) && document.activeElement.getAttribute('data-gp');
        var keep = document.getElementById('gp-draft'); if (keep) st.draft = keep.value;
        root.innerHTML = '<div class="gp-shell">' + head(plan) + body + (st.view === 'wall' ? '' : foot()) + '</div>';
        if (fk) { var b = root.querySelector('[data-gp="' + fk + '"]'); if (b) b.focus(); }
      });
    }
    function welcome() {
      var r = role();
      if (r !== 'adult') return '<article class="gp-card"><h3 class="gp-h3">Your Family Planner</h3><p class="gp-sub">Your family\'s calendar and Family Wall open here once a grown-up in your family adds you.</p></article>';
      return '<article class="gp-card gp-hero"><div class="gp-k">' + I('people') + 'For the Whole Family</div><h3 class="gp-h3">One Calendar for Your Family</h3>' +
        '<p class="gp-sub">Trips and vacations, work days off, performances, games, birthdays, and family time, all in one place, with a Family Wall for notes to each other and a look at who is where this week.</p>' +
        '<ul class="gp-ticks"><li>' + I('check') + 'Each person has their own color</li><li>' + I('check') + 'Month and agenda views</li><li>' + I('check') + 'Family Kitchen dinners on the same week</li></ul>' +
        '<div class="gp-acts"><button type="button" class="gp-btn" data-gp="start">' + I('plus') + 'Start Our Family Planner</button></div></article>';
    }

    /* ----- Family Calendar ----- */
    function calHtml(plan) {
      var y = +st.ym.slice(0, 4), m = +st.ym.slice(5, 7) - 1, first = new Date(y, m, 1, 12), last = new Date(y, m + 1, 0, 12);
      var gs = monday(ymd(first)), ge = addD(monday(ymd(last)), 6), map = byDay(plan, gs, ge), td = today(), kid = role() === 'kid';
      var nav = '<div class="gp-mnav"><button type="button" class="gp-btn sm line" data-gp="mon:-1" aria-label="Back a month">' + I('back') + 'Back</button><h3 class="gp-h3" aria-live="polite">' + MONTHS[m] + ' ' + y + '</h3><button type="button" class="gp-btn sm line" data-gp="mon:1" aria-label="Next month">Next' + I('next') + '</button></div>' +
        '<div class="gp-row2"><div class="gp-seg" role="group" aria-label="Calendar view"><button type="button" data-gp="mode:month" aria-pressed="' + (st.mode === 'month') + '">' + I('cal') + 'Month</button><button type="button" data-gp="mode:agenda" aria-pressed="' + (st.mode === 'agenda') + '">' + I('list') + 'Agenda</button></div>' +
        (st.ym !== td.slice(0, 7) ? '<button type="button" class="gp-linkbtn" data-gp="mon:0">Back to This Month</button>' : '') +
        (kid ? '' : '<button type="button" class="gp-btn sm" data-gp="add:' + (st.pick || '') + '">' + I('plus') + 'Add an Event</button>') + '</div>';
      var body = st.mode === 'agenda' ? agendaHtml(plan, map, ymd(first), ymd(last)) : monthHtml(plan, map, gs, ge, m, td);
      return '<div role="region" class="gp-cal" aria-label="' + esc(CIRCLES.family.cal) + '">' + nav + nudgeHtml(plan) + body + '</div>' + (kid ? '' : peopleHtml(plan));
    }
    function monthHtml(plan, map, gs, ge, m, td) {
      var cells = '', hd = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(function (d) { return '<span class="gp-wd" aria-hidden="true">' + d + '</span>'; }).join('');
      for (var d = gs; d <= ge; d = addD(d, 1)) {
        var L = map[d] || [], out = +d.slice(5, 7) - 1 !== m, lab = niceDate(d, true) + (L.length ? ', ' + L.length + (L.length === 1 ? ' event' : ' events') : '');
        cells += '<button type="button" class="gp-day' + (out ? ' out' : '') + (d === td ? ' today' : '') + (d === st.pick ? ' pick' : '') + '" data-gp="pick:' + d + '" aria-label="' + esc(lab) + '"' + (d === st.pick ? ' aria-pressed="true"' : '') + '><span class="n">' + (+d.slice(8)) + '</span>' +
          '<span class="chips">' + L.slice(0, 3).map(function (x) { return '<span class="gp-chip gp-c-' + colorOf(plan, x.ev) + (x.first ? '' : ' cont') + '">' + esc(x.ev.t) + '</span>'; }).join('') + (L.length > 3 ? '<span class="gp-more">+' + (L.length - 3) + ' more</span>' : '') + '</span>' +
          '<span class="dots" aria-hidden="true">' + L.slice(0, 4).map(function (x) { return '<i class="gp-c-' + colorOf(plan, x.ev) + '"></i>'; }).join('') + '</span></button>';
      }
      var dayList = st.pick ? '<div class="gp-card gp-dayl"><div class="gp-dayh"><h4 class="gp-h4">' + esc(niceDate(st.pick, true)) + '</h4>' + (role() === 'kid' ? '' : '<button type="button" class="gp-btn sm" data-gp="add:' + st.pick + '">' + I('plus') + 'Add to This Day</button>') + '</div>' + evList(plan, map[st.pick] || [], 'A clear day. Room for something good.') + '</div>' : '';
      return '<div class="gp-month" role="grid" aria-label="Month">' + hd + cells + '</div>' + dayList;
    }
    function agendaHtml(plan, map, from, to) {
      var days = Object.keys(map).filter(function (d) { return d >= from && d <= to; }).sort();
      if (!days.length) return '<div class="gp-card"><p class="gp-sub">This month is open. Add trips, games, performances, and family time, and they show here in order.</p></div>';
      return '<div class="gp-agenda">' + days.map(function (d) { var x = parse(d); return '<div class="gp-aday' + (d === today() ? ' today' : '') + '"><div class="gp-adate"><b>' + x.getDate() + '</b><small>' + DAYS[x.getDay()].slice(0, 3) + '</small></div>' + evList(plan, map[d], '') + '</div>'; }).join('') + '</div>';
    }
    function evList(plan, L, none) {
      if (!L.length) return none ? '<p class="gp-sub">' + esc(none) + '</p>' : '';
      return '<ul class="gp-evs">' + L.map(function (x) {
        var e = x.ev, k = KIND[e.k] || KIND.other;
        return '<li><button type="button" class="gp-ev gp-c-' + colorOf(plan, e) + '" data-gp="edit:' + esc(e.id) + '"><span class="ic">' + I(k.ic) + '</span><span class="tx"><b>' + esc(e.t) + '</b><small>' + esc(k.n) + ' · ' + esc(timeLine(e, x)) + (e.r ? ' · ' + (e.r === 'w' ? 'Every week' : 'Every year') : '') + '</small><small class="who">' + dots(plan, e) + esc(whoLine(plan, e)) + '</small>' + (e.o ? '<small class="nt">' + esc(e.o) + '</small>' : '') + '</span></button></li>';
      }).join('') + '</ul>';
    }
    function nudgeHtml(plan) {
      if (role() === 'kid' || st.ym < today().slice(0, 7) || monthHasTogether(plan, st.ym)) return '';
      var y = +st.ym.slice(0, 4), m = +st.ym.slice(5, 7) - 1;
      return '<article class="gp-card gp-nudge"><div class="gp-k">' + I('people') + 'Plan Something Together</div><p class="gp-sub">' + MONTHS[m] + ' has room for family time. Pick an idea, or make your own.</p>' +
        '<div class="gp-ideas">' + IDEAS.map(function (x, i) { return '<button type="button" class="gp-pill" data-gp="idea:' + i + '">' + I(x[0] === 'unplug' ? 'leaf' : 'people') + esc(x[1]) + '</button>'; }).join('') + '</div></article>';
    }
    function peopleHtml(plan) {
      var r = role(), g = G(), mem = member();
      if (r !== 'adult') return '';
      var rows = plan.people.map(function (p) {
        return '<li><button type="button" class="gp-sw gp-c-' + p.c + '" data-gp="color:' + esc(p.id) + '" aria-label="Change ' + esc(p.n) + '\'s color"></button><span class="tx"><b>' + esc(p.n) + '</b><small>' + (p.id === me() ? 'You' : p.pf ? (p.in ? 'Sees the Family Planner' : 'On the calendar') : 'Added by name') + '</small></span>' +
          (!p.pf ? '<button type="button" class="gp-linkbtn" data-gp="rmp:' + esc(p.id) + '">' + (st.sure === 'rmp:' + p.id ? 'Tap Again to Remove' : 'Remove') + '</button>' : '') + '</li>';
      }).join('');
      // Family on this device who can be added with their own passcode (teens and other grown-ups; Membership)
      var here = g ? g.list().filter(function (q) { var pp = person(plan, q.id); return q.id !== me() && (q.age === 'pine' || q.age === 'adult') && !(pp && pp.in); }) : [];
      var addHere = here.length ? '<div class="gp-here"><h4 class="gp-h4">Family on This Device</h4>' + (mem ? here.map(function (q) {
        return st.add === q.id ? '<form class="gp-form gp-passf" data-gp-form="here:' + esc(q.id) + '"><p class="gp-sub">' + esc(firstName(q.name)) + ', type your own passcode here to see the Family Planner in your profile.</p><label class="gp-l" for="gp-pass">' + esc(firstName(q.name)) + '\'s Passcode</label><input type="password" id="gp-pass" autocomplete="off"><div class="gp-acts"><button type="submit" class="gp-btn sm">Add ' + esc(firstName(q.name)) + '</button><button type="button" class="gp-btn sm line" data-gp="here:">Cancel</button></div></form>'
          : '<div class="gp-hrow"><span><b>' + esc(q.name) + '</b><small>' + (q.age === 'pine' ? 'Teen' : 'Grown-up') + '</small></span><button type="button" class="gp-btn sm line" data-gp="here:' + esc(q.id) + '">Add ' + esc(firstName(q.name)) + '</button></div>';
      }).join('') : '<p class="gp-sub">With Membership, teens and other grown-ups on this device can join the Family Planner with their own passcode.</p>') + '</div>' : '';
      var hh = null; try { hh = typeof H.household === 'function' ? H.household() : null; } catch (e) { hh = null; }
      var hhLine = hh ? '<div class="gp-here"><h4 class="gp-h4">' + I('house') + 'Household</h4>' + (hh.shared ? '<p class="gp-sub">Shared with your Household, end to end encrypted, so every phone in your Household sees the same calendar and Wall.</p>'
        : '<p class="gp-sub">Share the Family Planner with your Household, so each person\'s own phone sees the same calendar and Wall.</p><div class="gp-acts"><button type="button" class="gp-btn sm" data-gp="share">' + I('house') + 'Share With Our Household</button></div>') + '</div>' : '';
      return '<div role="region" class="gp-card gp-people" aria-label="Our Family"><h3 class="gp-h3">Our Family</h3><p class="gp-sub">Tap a color to change it.</p><ul class="gp-plist">' + rows + '</ul>' +
        '<form class="gp-form gp-addp" data-gp-form="person"><label class="gp-l" for="gp-pn">Add Someone by Name</label><div class="gp-inrow"><input type="text" id="gp-pn" maxlength="30" autocomplete="off" placeholder="A first name"><button type="submit" class="gp-btn sm line">' + I('plus') + 'Add</button></div></form>' + addHere + hhLine + '</div>';
    }

    /* ----- Family Wall ----- */
    function ckCard(plan) {
      var wk = monday(today()), n = plan.notes.filter(function (x) { return x.ck === wk; }).length, q = question(today());
      return '<article class="gp-card gp-ck"><div class="gp-k">' + I('heart') + 'This Week\'s Family Check-in</div><p class="gp-q">' + esc(q) + '</p>' +
        '<div class="gp-acts">' + (role() === 'kid' ? '' : '<button type="button" class="gp-btn sm" data-gp="ck">' + I('wall') + 'Answer on the Wall</button>') + (n ? '<span class="gp-mini">' + n + (n === 1 ? ' answer' : ' answers') + ' so far</span>' : '<span class="gp-mini">Talk it over at dinner, or answer here.</span>') + '</div></article>';
    }
    function wallHtml(plan) {
      if (!member()) return '<article class="gp-card gp-invite"><div class="gp-k">' + I('wall') + 'With Membership</div><h3 class="gp-h3">The Family Wall</h3><p class="gp-sub">Short notes to each other, kind reactions, pinned reminders, and a weekly Family Check-in question for the whole family.</p>' +
        '<div class="gp-acts"><button type="button" class="gp-btn sm" data-gp="mem:see">See Membership</button><button type="button" class="gp-btn sm line" data-gp="mem:code">I Have a Code</button></div></article>';
      var r = role(), mine = me();
      var compose = r === 'kid' ? '' : '<form class="gp-card gp-compose" data-gp-form="note">' + (st.ck ? '<p class="gp-mini gp-cklab">' + I('heart') + 'Answering: ' + esc(question(today())) + ' <button type="button" class="gp-linkbtn" data-gp="ck:off">Cancel</button></p>' : '') +
        '<label class="gp-l" for="gp-draft">A Note for Your Family</label><textarea id="gp-draft" maxlength="280" rows="3" placeholder="' + esc(st.ck ? 'Your answer' : 'Home by six tonight. Tacos!') + '">' + esc(st.draft) + '</textarea><div class="gp-acts"><button type="submit" class="gp-btn sm">' + I('wall') + 'Post to the Wall</button></div></form>';
      var pins = plan.pins, list = plan.notes.slice().sort(function (a, b) { var pa = pins[a.id] || 0, pb = pins[b.id] || 0; if (!!pa !== !!pb) return pa ? -1 : 1; if (pa && pb) return pb - pa; return b.at - a.at; });
      var notes = list.length ? '<ul class="gp-notes">' + list.map(function (x) {
        var who = person(plan, x.by), rs = obj(plan.reacts[x.id]), pinned = !!pins[x.id], canRm = r === 'adult' || x.by === mine;
        return '<li class="gp-noteb' + (pinned ? ' pinned' : '') + '"><div class="gp-nh"><span class="gp-dot gp-c-' + (who ? who.c : 'fam') + '" aria-hidden="true"></span><b>' + esc(who ? who.n : 'Someone') + '</b><small>' + esc(when(x.at)) + '</small>' + (pinned ? '<span class="gp-pinned">' + I('pin') + 'Pinned</span>' : '') + '</div>' +
          (x.ck ? '<p class="gp-mini gp-cklab">' + I('heart') + 'Family Check-in</p>' : '') + '<p class="gp-nt">' + esc(x.t).replace(/\n/g, '<br>') + '</p>' +
          '<div class="gp-reacts" role="group" aria-label="Reactions">' + REACTS.map(function (k) { var n = Object.keys(rs).filter(function (w) { return rs[w] === k[0]; }).length, on = rs[mine] === k[0]; return '<button type="button" class="gp-react" data-gp="react:' + esc(x.id) + ':' + k[0] + '" aria-pressed="' + on + '"' + (r === 'kid' ? ' disabled' : '') + '>' + I(k[2]) + '<span>' + k[1] + '</span>' + (n ? '<b>' + n + '</b>' : '') + '</button>'; }).join('') + '</div>' +
          '<div class="gp-nacts">' + (r === 'adult' ? '<button type="button" class="gp-linkbtn" data-gp="pin:' + esc(x.id) + '">' + I('pin') + (pinned ? 'Unpin' : 'Pin') + '</button>' : '') + (canRm ? '<button type="button" class="gp-linkbtn" data-gp="rmn:' + esc(x.id) + '">' + (st.sure === 'rmn:' + x.id ? 'Tap Again to Remove' : 'Remove') + '</button>' : '') + '</div></li>';
      }).join('') + '</ul>' : '<div class="gp-card"><p class="gp-sub">The Wall is ready for your first note: a thank you, a reminder, or a cheer for someone\'s big day.</p></div>';
      var old = plan.notes.filter(function (x) { return !pins[x.id] && x.at < Date.now() - OLD * 864e5; }).length;
      var clear = r === 'adult' && plan.notes.length ? '<div class="gp-acts gp-clear"><button type="button" class="gp-btn sm line" data-gp="clear">' + (st.sure === 'clear' ? 'Tap Again to Clear ' + old + (old === 1 ? ' Note' : ' Notes') : 'Clear Old Notes') + '</button><span class="gp-mini">Clears notes older than ' + OLD + ' days. Pinned notes stay.</span></div>' : '';
      return ckCard(plan) + compose + notes + clear + '<p class="gp-note">' + I('lock') + '<span>The Family Wall is for short notes between your family, locked so only your family can open it.</span></p>';
    }
    function when(at) {
      if (!at) return '';
      var d = new Date(at), td = today(), dd = ymd(d), t = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      if (dd === td) return 'Today, ' + t;
      if (dd === addD(td, -1)) return 'Yesterday, ' + t;
      return niceDate(dd) + ', ' + t;
    }

    /* ----- Shared Schedules ----- */
    function weekHtml(plan) {
      var m0 = addD(monday(today()), st.wk * 7), m6 = addD(m0, 6), map = byDay(plan, m0, m6), din = {};
      try { din = typeof H.dinners === 'function' ? obj(H.dinners(st.wk)) : {}; } catch (e) { din = {}; }
      var lab = st.wk === 0 ? 'This Week' : st.wk === 1 ? 'Next Week' : st.wk === -1 ? 'Last Week' : 'Week of ' + niceDate(m0).replace(/^\w+, /, '');
      var nav = '<div class="gp-mnav"><button type="button" class="gp-btn sm line" data-gp="wk:-1" aria-label="Back a week">' + I('back') + 'Back</button><h3 class="gp-h3" aria-live="polite">' + esc(lab) + '<small>' + esc(niceDate(m0).replace(/^\w+, /, '') + ' to ' + niceDate(m6).replace(/^\w+, /, '')) + '</small></h3><button type="button" class="gp-btn sm line" data-gp="wk:1" aria-label="Next week">Next' + I('next') + '</button></div>' +
        (st.wk ? '<div class="gp-row2"><button type="button" class="gp-linkbtn" data-gp="wk:0">Back to This Week</button></div>' : '');
      // Who is where: each person's days this week
      var who = plan.people.map(function (p) {
        var L = [];
        Object.keys(map).sort().forEach(function (d) { map[d].forEach(function (x) { var w = arr(x.ev.w); if ((w.indexOf(p.id) >= 0 || !w.length) && x.first) L.push(DAYS[parse(d).getDay()].slice(0, 3) + ' ' + x.ev.t); }); });
        return '<li><span class="gp-dot gp-c-' + p.c + '" aria-hidden="true"></span><b>' + esc(p.n) + '</b><span>' + (L.length ? esc(L.join(' · ')) : 'Home base this week') + '</span></li>';
      }).join('');
      var td = today(), days = '';
      for (var d = m0; d <= m6; d = addD(d, 1)) {
        var x = parse(d), L = map[d] || [];
        days += '<div class="gp-wday' + (d === td ? ' today' : '') + '"' + (d === td ? ' aria-current="date"' : '') + '><div class="gp-wdh"><b>' + DAYS[x.getDay()] + '</b><small>' + MONTHS[x.getMonth()].slice(0, 3) + ' ' + x.getDate() + '</small></div>' +
          evList(plan, L, '') + (din[d] ? '<p class="gp-din">' + I('bowl') + '<span><small>Family Kitchen</small>' + esc(din[d]) + '</span></p>' : '') + (!L.length && !din[d] ? '<p class="gp-mini">Open</p>' : '') + '</div>';
      }
      return '<div role="region" class="gp-cal" aria-label="' + esc(CIRCLES.family.week) + '">' + nav + (plan.people.length ? '<article class="gp-card"><h4 class="gp-h4">Who Is Where</h4><ul class="gp-who">' + who + '</ul></article>' : '') +
        '<div class="gp-week">' + days + '</div></div>' + (member() ? ckCard(plan) : '');
    }

    /* ----- the add and edit sheet ----- */
    function sheet(e, preset) {
      var plan = P.plan, ed = !!e, ro = ed && !canEdit(e);
      e = e || Object.assign({ id: '', t: '', k: 'other', d: st.pick || today(), w: [], r: '', o: '' }, preset || {});
      if (!ed && role() === 'teen' && !e.w.length) e.w = [me()];
      var allDay = !e.tm, k = KIND[e.k] || KIND.other;
      var html = ro ? '<div class="gp-dlgh"><h2 class="gp-h2" id="gp-dt">' + esc(e.t) + '</h2></div><p class="gp-sub">' + esc(k.n) + ' · ' + esc(niceDate(e.d, true)) + ' · ' + esc(timeLine(e)) + '</p><p class="gp-sub">' + esc(whoLine(plan, e)) + '</p>' + (e.o ? '<p class="gp-sub">' + esc(e.o) + '</p>' : '') + '<div class="gp-acts"><button type="button" class="gp-btn sm line" data-gpd="x">Close</button></div>'
        : '<form class="gp-form" data-gp-form="event" novalidate><div class="gp-dlgh"><h2 class="gp-h2" id="gp-dt">' + (ed ? 'Change the Event' : 'Add an Event') + '</h2><button type="button" class="gp-x" data-gpd="x" aria-label="Close">' + I('x') + '</button></div>' +
          '<label class="gp-l" for="gp-et">What</label><input type="text" id="gp-et" maxlength="80" autocomplete="off" value="' + esc(e.t) + '" placeholder="' + esc(k.ph) + '">' +
          '<span class="gp-l">Kind</span><div class="gp-kinds" role="group" aria-label="Kind">' + KINDS.map(function (x) { return '<button type="button" class="gp-pill" data-gpk="' + x.id + '" aria-pressed="' + (x.id === e.k) + '">' + I(x.ic) + esc(x.n) + '</button>'; }).join('') + '</div>' +
          '<div class="gp-two"><div><label class="gp-l" for="gp-ed">Date</label><input type="date" id="gp-ed" value="' + esc(e.d) + '"></div><div><label class="gp-l" for="gp-ee">Last Day <small>(for a trip or more than one day)</small></label><input type="date" id="gp-ee" value="' + esc(e.e || '') + '"></div></div>' +
          '<label class="gp-check"><input type="checkbox" id="gp-ea"' + (allDay ? ' checked' : '') + '> <span>All day</span></label><div id="gp-tmw"' + (allDay ? ' hidden' : '') + '><label class="gp-l" for="gp-tm">Time</label><input type="time" id="gp-tm" value="' + esc(e.tm || '18:00') + '"></div>' +
          '<span class="gp-l">Who It Is For</span><div class="gp-whos" role="group" aria-label="Who it is for"><button type="button" class="gp-pill" data-gpw="" aria-pressed="' + (!e.w.length) + '">' + I('people') + 'Everyone</button>' + plan.people.map(function (p) { return '<button type="button" class="gp-pill gp-pp gp-c-' + p.c + '" data-gpw="' + esc(p.id) + '" aria-pressed="' + (e.w.indexOf(p.id) >= 0) + '"><span class="gp-dot gp-c-' + p.c + '" aria-hidden="true"></span>' + esc(p.n) + '</button>'; }).join('') + '</div>' +
          '<span class="gp-l">Repeats</span><div class="gp-reps" role="group" aria-label="Repeats">' + [['', 'Once'], ['w', 'Every Week'], ['y', 'Every Year']].map(function (x) { return '<button type="button" class="gp-pill" data-gpr="' + x[0] + '" aria-pressed="' + ((e.r || '') === x[0]) + '">' + esc(x[1]) + '</button>'; }).join('') + '</div>' +
          '<label class="gp-l" for="gp-eo">Notes</label><textarea id="gp-eo" maxlength="400" rows="2" placeholder="Where, what to bring, who drives">' + esc(e.o || '') + '</textarea>' +
          '<p class="gp-msg" id="gp-emsg" role="alert"></p>' +
          '<div class="gp-acts"><button type="submit" class="gp-btn">' + I('check') + (ed ? 'Save' : 'Add to the Calendar') + '</button><button type="button" class="gp-btn line" data-gpd="x">Cancel</button>' + (ed ? '<button type="button" class="gp-linkbtn gp-rm" data-gpd="rm">Remove This Event</button>' : '') + '</div></form>';
      openDlg(html);
      if (ro) return;
      var f = dlg.querySelector('form'), cur = { k: e.k, w: e.w.slice(), r: e.r || '' };
      dlg.querySelector('#gp-ea').addEventListener('change', function () { dlg.querySelector('#gp-tmw').hidden = this.checked; });
      dlg.addEventListener('click', function (ev) {
        var b = ev.target.closest('[data-gpk],[data-gpw],[data-gpr],[data-gpd]'); if (!b) return;
        if (b.hasAttribute('data-gpk')) { cur.k = b.getAttribute('data-gpk'); if (cur.k === 'bday' && !ed && !cur.r) { cur.r = 'y'; mark('[data-gpr]', 'data-gpr', [cur.r]); } mark('[data-gpk]', 'data-gpk', [cur.k]); var ti = dlg.querySelector('#gp-et'); ti.placeholder = KIND[cur.k].ph; }
        else if (b.hasAttribute('data-gpw')) { var w = b.getAttribute('data-gpw'); if (!w) cur.w = []; else if (cur.w.indexOf(w) >= 0) cur.w = cur.w.filter(function (x) { return x !== w; }); else cur.w.push(w); mark('[data-gpw]', 'data-gpw', cur.w.length ? cur.w : ['']); }
        else if (b.hasAttribute('data-gpr')) { cur.r = b.getAttribute('data-gpr'); mark('[data-gpr]', 'data-gpr', [cur.r]); }
        else if (b.getAttribute('data-gpd') === 'rm') { if (!b.dataset.sure) { b.dataset.sure = 1; b.textContent = 'Tap Again to Remove'; return; } mutate(function (p) { p.events = p.events.filter(function (x) { return x.id !== e.id; }); }).then(function () { closeDlg(); toast('Removed from the calendar.'); }); }
      });
      function mark(sel, at, on) { dlg.querySelectorAll(sel).forEach(function (x) { x.setAttribute('aria-pressed', String(on.indexOf(x.getAttribute(at)) >= 0)); }); }
      f.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var t = dlg.querySelector('#gp-et').value.trim(), d = dlg.querySelector('#gp-ed').value, ee = dlg.querySelector('#gp-ee').value, ad = dlg.querySelector('#gp-ea').checked, tm = dlg.querySelector('#gp-tm').value, o = dlg.querySelector('#gp-eo').value.trim(), msg = dlg.querySelector('#gp-emsg');
        if (!t) { msg.textContent = 'Give it a name, like ' + KIND[cur.k].ph + '.'; return; }
        if (!isYmd(d)) { msg.textContent = 'Choose a date.'; return; }
        if (ee && (!isYmd(ee) || ee < d)) { msg.textContent = 'The last day comes on or after the first day.'; return; }
        if (ee && dayDiff(d, ee) > 60) { msg.textContent = 'Keep it to two months or less.'; return; }
        var ne = cleanEvent({ id: e.id || rid(), t: t, k: cur.k, d: d, e: ee && ee > d ? ee : '', tm: ad ? '' : tm, w: cur.w, r: cur.r, o: o, by: e.by || me(), u: Date.now() });
        mutate(function (p) { var at = -1; p.events.forEach(function (x, i) { if (x.id === ne.id) at = i; }); if (at >= 0) p.events[at] = ne; else p.events.push(ne); }).then(function () {
          closeDlg(); st.ym = d.slice(0, 7); if (st.mode === 'month') st.pick = d; toast(ed ? 'Saved.' : 'On the calendar.');
        });
      });
      setTimeout(function () { var ti = dlg && dlg.querySelector('#gp-et'); if (ti) ti.focus(); }, 30);
    }
    var lastFocus = null;
    function openDlg(html) {
      closeDlg(); lastFocus = document.activeElement;
      dlg = document.createElement('div'); dlg.className = 'gp gp-dlg'; dlg.setAttribute('role', 'dialog'); dlg.setAttribute('aria-modal', 'true'); dlg.setAttribute('aria-labelledby', 'gp-dt');
      dlg.innerHTML = '<div class="gp-scrim" data-gpd="x"></div><div class="gp-panel">' + html + '</div>';
      document.body.appendChild(dlg); document.body.classList.add('gp-noscroll');
      dlg.addEventListener('click', function (ev) { var x = ev.target.closest('[data-gpd="x"]'); if (x) closeDlg(); });
      dlg.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') closeDlg(); });
    }
    function closeDlg() { if (dlg) { dlg.remove(); dlg = null; document.body.classList.remove('gp-noscroll'); if (lastFocus && lastFocus.focus && document.body.contains(lastFocus)) lastFocus.focus(); } }

    /* ----- taps ----- */
    root.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-gp]'); if (!b || !root.contains(b)) return;
      var a = b.getAttribute('data-gp'), i = a.indexOf(':'), k = i < 0 ? a : a.slice(0, i), v = i < 0 ? '' : a.slice(i + 1);
      if (k !== 'rmp' && k !== 'rmn' && k !== 'clear') st.sure = '';
      if (k === 'view') return setView(v);
      if (k === 'start') { b.disabled = true; start().then(function (ok) { if (ok) toast('Your Family Planner is ready.'); paint(); }); return; }
      if (k === 'mon') { if (v === '0') st.ym = today().slice(0, 7); else { var d = parse(st.ym + '-15'); d.setMonth(d.getMonth() + (+v)); st.ym = ymd(d).slice(0, 7); } st.pick = ''; return paint(); }
      if (k === 'mode') { st.mode = v; try { sessionStorage.setItem('gg-plan-mode', v); } catch (e) {} return paint(); }
      if (k === 'pick') { st.pick = st.pick === v ? '' : v; return paint(); }
      if (k === 'add') { if (v) st.pick = v; return sheet(null, v ? { d: v } : null); }
      if (k === 'idea') { var x = IDEAS[+v]; return sheet(null, x ? { k: x[0], t: x[1], d: st.ym === today().slice(0, 7) ? (st.pick || today()) : st.ym + '-01' } : null); }
      if (k === 'edit') { var e = P.plan && P.plan.events.filter(function (y) { return y.id === v; })[0]; if (e) sheet(e); return; }
      if (k === 'wk') { st.wk = v === '0' ? 0 : Math.max(-52, Math.min(52, st.wk + (+v))); return paint(); }
      if (k === 'color') return mutate(function (p) { var q = person(p, v); if (q) { q.c = COLORS[(COLORS.indexOf(q.c) + 1) % COLORS.length]; q.u = Date.now(); } });
      if (k === 'rmp') { if (st.sure !== a) { st.sure = a; return paint(); } st.sure = ''; return mutate(function (p) { p.people = p.people.filter(function (q) { return q.id !== v || q.pf; }); p.events.forEach(function (y) { if (y.w.indexOf(v) >= 0) { y.w = y.w.filter(function (z) { return z !== v; }); y.u = Date.now(); } }); }); }
      if (k === 'here') { st.add = v; paint(); setTimeout(function () { var pi = root.querySelector('#gp-pass'); if (pi) pi.focus(); }, 30); return; }
      if (k === 'share') { if (typeof H.share !== 'function') return; b.disabled = true; H.share().then(function () { toast('Shared with your Household.'); paint(); }, function (er) { b.disabled = false; toast((er && er.message) || 'Try again in a moment.'); }); return; }
      if (k === 'mem') { if (typeof H.onMembership === 'function') H.onMembership(v); return; }
      if (k === 'ck') { st.ck = v !== 'off'; if (st.view !== 'wall') { st.view = 'wall'; if (typeof H.onView === 'function') H.onView('wall'); } paint(); setTimeout(function () { var t = root.querySelector('#gp-draft'); if (t) t.focus(); }, 30); return; }
      if (k === 'react') { var j = v.lastIndexOf(':'), nid = v.slice(0, j), w = v.slice(j + 1); if (role() === 'kid') return; return mutate(function (p) { var r = p.reacts[nid] = obj(p.reacts[nid]); if (r[me()] === w) delete r[me()]; else r[me()] = w; if (!Object.keys(r).length) delete p.reacts[nid]; }); }
      if (k === 'pin') { if (role() !== 'adult') return; return mutate(function (p) { if (p.pins[v]) delete p.pins[v]; else p.pins[v] = Date.now(); }); }
      if (k === 'rmn') { if (st.sure !== a) { st.sure = a; return paint(); } st.sure = ''; return mutate(function (p) { var n = p.notes.filter(function (x) { return x.id === v; })[0]; if (!n || (role() !== 'adult' && n.by !== me())) return; p.notes = p.notes.filter(function (x) { return x.id !== v; }); delete p.pins[v]; delete p.reacts[v]; }); }
      if (k === 'clear') {
        if (role() !== 'adult') return;
        var cut0 = Date.now() - OLD * 864e5;
        if (!P.plan || !P.plan.notes.some(function (x) { return !P.plan.pins[x.id] && x.at < cut0; })) { st.sure = ''; toast('Every note is recent. Nothing to clear yet.'); return; }
        if (st.sure !== 'clear') { st.sure = 'clear'; return paint(); }
        st.sure = '';
        return mutate(function (p) { var cut = Date.now() - OLD * 864e5, gone = p.notes.filter(function (x) { return !p.pins[x.id] && x.at < cut; }); p.notes = p.notes.filter(function (x) { return gone.indexOf(x) < 0; }); gone.forEach(function (x) { delete p.reacts[x.id]; }); return gone.length; }).then(function (n) { toast(n ? 'Cleared ' + n + (n === 1 ? ' old note.' : ' old notes.') : 'Every note is recent. Nothing to clear yet.'); });
      }
    });
    root.addEventListener('input', function (ev) { if (ev.target && ev.target.id === 'gp-draft') st.draft = ev.target.value; });
    root.addEventListener('submit', function (ev) {
      var f = ev.target.closest('[data-gp-form]'); if (!f) return;
      ev.preventDefault();
      var a = f.getAttribute('data-gp-form');
      if (a === 'note') {
        var ta = f.querySelector('#gp-draft'), t = clip(ta.value.trim(), 280); if (!t || role() === 'kid' || !member()) return;
        var n = { id: rid(), t: t, at: Date.now(), by: me(), u: Date.now() }; if (st.ck) n.ck = monday(today());
        st.draft = ''; st.ck = false;
        return mutate(function (p) { p.notes.unshift(n); if (p.notes.length > MAXN) p.notes = p.notes.slice(0, MAXN); }).then(function () { toast('On the Wall.'); });
      }
      if (a === 'person') { var nm = clip(f.querySelector('#gp-pn').value.trim(), 30); if (!nm) return; return mutate(function (p) { addPerson(p, 'm' + rid(), nm, '', null); }).then(function () { toast(nm + ' is on the calendar.'); }); }
      if (/^here:/.test(a)) {
        var pid = a.slice(5), pass = f.querySelector('#gp-pass').value, btn = f.querySelector('button[type=submit]');
        if (!pass) return;
        btn.disabled = true;
        addHere(pid, pass).then(function () { st.add = ''; toast('Added to the Family Planner.'); paint(); }, function (er) { btn.disabled = false; toast((er && er.message) || 'That passcode did not work. Try again.'); });
      }
    });

    paint();
    return {
      go: function (v) { if (/^(cal|wall|week)$/.test(v)) { st.view = v; paint(); } },
      refresh: paint,
      destroy: function () { alive = false; closeDlg(); P.subs = P.subs.filter(function (f) { return f !== sub; }); }
    };
  }

  /* ---------- the Week tab card and a kid's family week ---------- */
  function weekCard(el, off) {
    if (!el) return; css();
    load().then(function (plan) {
      if (!el.isConnected) return;
      var r = role();
      if (!plan) {
        el.innerHTML = r === 'adult' ? '<article class="gp gp-card gp-wcard"><div class="gp-wch"><span class="gp-badge">' + I('cal') + '</span><div><div class="gp-k">Grounded Relationships</div><h3 class="gp-h3">Family Planner</h3></div></div><p class="gp-sub">One calendar for your whole family: trips, work days off, performances, games, and birthdays, with who is where this week.</p><div class="gp-acts"><button type="button" class="gp-btn sm" data-gp-go="cal">' + I('plus') + 'Start Our Family Planner</button></div></article>' : '';
        return;
      }
      var m0 = addD(monday(today()), (off || 0) * 7), map = byDay(plan, m0, addD(m0, 6)), L = [];
      Object.keys(map).sort().forEach(function (d) { map[d].forEach(function (x) { if (x.first || d === m0) L.push({ d: d, x: x }); }); });
      var pinned = plan.notes.filter(function (n) { return plan.pins[n.id]; }).sort(function (a, b) { return plan.pins[b.id] - plan.pins[a.id]; })[0];
      el.innerHTML = '<article class="gp gp-card gp-wcard"><div class="gp-wch"><span class="gp-badge">' + I('cal') + '</span><div><div class="gp-k">Family Planner</div><h3 class="gp-h3">Family This Week</h3></div></div>' +
        (L.length ? '<ul class="gp-wlist">' + L.slice(0, 6).map(function (y) { var e = y.x.ev; return '<li><span class="gp-dot gp-c-' + colorOf(plan, e) + '" aria-hidden="true"></span><span><b>' + esc(e.t) + '</b><small>' + esc(niceDate(y.d) + (e.tm ? ', ' + niceTime(e.tm) : '') + ' · ' + whoLine(plan, e)) + '</small></span></li>'; }).join('') + '</ul>' + (L.length > 6 ? '<p class="gp-mini">And ' + (L.length - 6) + ' more this week.</p>' : '')
          : '<p class="gp-sub">A calm week so far. Add a trip, a game, or some family time.</p>') +
        (pinned && member() ? '<p class="gp-pinline">' + I('pin') + '<span>' + esc(pinned.t) + '</span></p>' : '') +
        '<div class="gp-acts"><button type="button" class="gp-btn sm" data-gp-go="week">' + I('week') + 'Shared Schedules</button><button type="button" class="gp-btn sm line" data-gp-go="cal">' + I('cal') + 'Open the Calendar</button>' + (member() ? '<button type="button" class="gp-btn sm line" data-gp-go="wall">' + I('wall') + 'Family Wall</button>' : '') + '</div></article>';
    });
    if (!el.__gp) { el.__gp = 1; el.addEventListener('click', function (ev) { var b = ev.target.closest && ev.target.closest('[data-gp-go]'); if (b && typeof H.go === 'function') H.go(b.getAttribute('data-gp-go')); }); }
  }
  function kidCard(el) {
    if (!el) return; css();
    load().then(function (plan) {
      if (!el.isConnected) return;
      if (!plan) { el.innerHTML = ''; return; }
      var td = today(), map = byDay(plan, td, addD(td, 6)), days = Object.keys(map).sort().slice(0, 5);
      el.innerHTML = '<div class="hm-kcard gp gp-kid" style="--c:#00B4D8"><h2 class="hm-kh">Our Family This Week</h2>' +
        (days.length ? '<ul class="gp-kl">' + days.map(function (d) { return '<li><b>' + (d === td ? 'Today' : DAYS[parse(d).getDay()]) + '</b>' + map[d].map(function (x) { return '<span class="gp-kev"><span class="gp-dot gp-c-' + colorOf(plan, x.ev) + '" aria-hidden="true"></span>' + esc(x.ev.t) + (arr(x.ev.w).length ? ' <small>with ' + esc(whoLine(plan, x.ev)) + '</small>' : '') + '</span>'; }).join('') + '</li>'; }).join('') + '</ul>'
          : '<p>A cozy week at home. Ask your grown-up what fun thing your family could plan.</p>') + '</div>';
    });
  }

  window.GGPlanner = {
    v: V, host: host, render: render, weekCard: weekCard, kidCard: kidCard, load: load, has: has, start: start, space: space,
    on: function (fn) { P.subs.push(fn); }, off: function (fn) { P.subs = P.subs.filter(function (f) { return f !== fn; }); },
    plan: function () { return P.plan && P.who === me() ? P.plan : null; },
    model: { occ: occ, byDay: byDay, fixPlan: fixPlan, monthHasTogether: monthHasTogether, question: question, QUESTIONS: QUESTIONS, KINDS: KINDS, CIRCLES: CIRCLES }
  };
})();
