/* =====================================================================
   GROW WITH GROUNDED . THE TREE'S WEEK IN HOME (shared/home/week.js), GWG BLD 912 Round 2
   (c) 2026 Grow With Grounded LLC.
   The Week tab of every tree with a weekly check-in (#week): Oak, Sequoia, Birch, Pine, Maple, and Aspen.
   Run in Home's own window: no tree page, no iframe, nothing from the tree page's DOM or globals.
   Contract: grounded-workshop patches/bld912/CONTRACT-R2.md.

   Every tree draws its Week with the shared engine, shared/gg-tend.js (renderWeek 405, weeklyQs 388,
   prevWeek 399, calendarHtml 438, weekSave 713, saveRefl 778, editWeek 759, month 779, weekQuestions 770),
   set up by the tree's own GGTend.init config. gg-tend.js is one engine for a whole tree page (init takes the
   page's config and render draws Today, Week, and Season into the page), so GGTend.weekQuestions and
   saveWeekAns run only after a tree page's init. This module ports the Week pieces line for line instead, with
   each tree's config pieces (line numbers as of BLD 911):
     oak      oak/index.html TEND_CFG 2620 (questions, answers, weekStem, history 2638, store 2648)
     sequoia  sequoia/app.js TEND_CFG 1652 (journey AGES.sequoia, questions MAIN_Q 350, history 1673, store 1682)
     birch    birch/app.js TEND_CFG 1590 (journey AGES.birch, showStory false, plain, QUESTIONS bankFor 356)
     pine     pine/app.js TEND_CFG 1552 (journey AGES.pine, showStory false, plain, QUESTIONS loadBank 382)
     maple    maple/index.html mpInit 2388 (journey maple_k2 or maple_35, mpWeeklyBank 2337, weekStem by band,
              shareRefl, history from kid.checkins, store mpTendGet 2292 on GGP.data(id, 'maple').kid)
     aspen    aspen/index.html GGTend.init 2671 (journey AGES.aspen, aspWeeklyBank, shareRefl, history from
              student.rings, store aspTendGet on GGP.data(id, 'aspen').student)
   The tend record is made ready as GGTend.state() does (ensure 111): the blank fields, the season start from
   the latest full check-in, the plan from the latest check-in with one.
   The Guided Weekly Check-in (Oak and Sequoia: oakGuidedWeek oak/index.html 1807, sqGuidedWeek sequoia/app.js
   623) runs the shared player (shared/gg-guided.js, GGGuided.run) with the tree's script (shared/guided/<tree>.js),
   and saves exactly as Save this week saves.
   Saved exactly as the tree saves: tend.weeks['s<season>w<week>'] = { date, ans: { [questionId]: value },
   refl?, share? }, then GGP.save(id).
   Left out (the tree page keeps them): the kids' practice name read forward on the plan (mpNormTend, actsToPlan,
   picksToTend); Week neither shows nor saves the plan, so a plan carried from an older Maple or Aspen record
   reads forward the next time the tree page opens.
   Differences from the tree, on purpose: Begin my check-in opens Home's own check-in (ctx.openHome('checkin'));
   the tree's painting sits at the top; the story link opens in a new tab, as the tree's does.
   ===================================================================== */
(function () {
  'use strict';
  window.GGScreen = window.GGScreen || {};
  if (window.GGScreen.week) return;
  var TREES = ['oak', 'sequoia', 'birch', 'pine', 'maple', 'aspen'];
  var GUIDED = { oak: 1, sequoia: 1 };
  var CK_JS = { oak: '/oak/checkin.js?v=b929', sequoia: '/sequoia/checkin.js?v=b929', birch: '/birch/checkin.js?v=b929', pine: '/pine/checkin.js?v=b907', maple: '/maple/checkin.js?v=b907', aspen: '/aspen/checkin.js?v=b907' };
  var CK_NAME = { oak: 'OAK_CHECKIN', sequoia: 'SEQUOIA_CHECKIN', birch: 'BIRCH_CHECKIN', pine: 'PINE_CHECKIN', maple: 'MAPLE_CHECKIN', aspen: 'ASPEN_CHECKIN' };
  var Q_OPTS0 = [['rarely', 'Rarely', 0], ['sometimes', 'Sometimes', 1], ['often', 'Often', 2], ['always', 'Almost always', 3], ['unsure', 'Not sure', null]];   // birch/app.js 352, pine/app.js 372
  var STEM = 'This past week, how often have you...';
  var KEYS = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];
  var NUM = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];   // gg-tend.js 152

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function dstr(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function today() { return dstr(new Date()); }
  function parse(s) { var p = String(s).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function between(a, b) { return Math.round((parse(b) - parse(a)) / 86400000); }
  function nice(s) { return parse(s).toLocaleDateString(undefined, { month: 'long', day: 'numeric' }); }
  function dayKey(t) { var d = new Date(t); return dstr(d); }   // aspen dayKey 1905, maple dkey 1567
  // mergeJourney, gg-tend.js 83
  function mergeJourney(base, over) {
    if (!over) return base;
    var out = {}; Object.keys(base).forEach(function (k) { out[k] = base[k]; });
    Object.keys(over).forEach(function (k) {
      if (k === 'WEEKS' && Array.isArray(base.WEEKS)) out.WEEKS = base.WEEKS.map(function (w, i) { var o = {}; Object.keys(w).forEach(function (x) { o[x] = w[x]; }); var v = over.WEEKS[i] || {}; Object.keys(v).forEach(function (x) { o[x] = v[x]; }); return o; });
      else out[k] = over[k];
    });
    return out;
  }
  function countPlan(p) { var n = 0; Object.keys(p || {}).forEach(function (k) { var x = p[k] || {}; n += (x.selected || []).length + (x.custom ? 1 : 0) + (x.own || []).length + (x.lib || []).length; }); return n; }

  /* ---------- each tree's config pieces ---------- */
  function cfgFor(ctx) {
    var tree = ctx.tree, CK = window[CK_NAME[tree]] || {}, J0 = window.GGJourney || {}, AG = J0.AGES || {};
    var G = window.GGParts;
    var label = function (k, plain) { return G && G.label ? G.label(k, { plain: plain }) : k.charAt(0).toUpperCase() + k.slice(1); };
    var c = { tree: tree, CK: CK, answers: CK.answers || Q_OPTS0, weekStem: STEM, showStory: true, shareRefl: false, plainWeek: false, guided: !!GUIDED[tree] };
    if (tree === 'oak' || tree === 'sequoia' || tree === 'birch' || tree === 'pine') {
      var d = function () { return GGP.data(ctx.id, tree); };
      var plain = typeof ctx.plain === 'boolean' ? ctx.plain : d().wording === 'plain';
      c.plain = plain;
      c.parts = KEYS.map(function (k) { return { key: k, part: label(k, plain) }; });
      c.rec = d;
      c.store = function () { var x = d(); if (!x.tend || typeof x.tend !== 'object') x.tend = {}; return x.tend; };
      c.history = function () { return (d().history || []).filter(function (e) { return e && !e.from && (tree !== 'sequoia' || e.kind !== 'observed'); }); };
      if (tree === 'oak') { c.questions = function () { return CK.questions || {}; }; c.answers = CK.answers || []; }
      else if (tree === 'sequoia') { c.questions = function () { return CK.questions || {}; }; c.answers = CK.answers || []; c.journey = AG.sequoia; }
      else {
        c.journey = AG[tree]; c.showStory = false; c.plainWeek = true;
        var wording = plain ? 'plain' : 'faith';
        c.questions = function () {
          if (tree === 'birch') {   // bankFor, birch/app.js 356
            var seasons = Array.isArray(d().seasons) ? d().seasons : [];
            if (typeof CK.getBank === 'function') return CK.getBank(seasons, wording);
          } else {   // bandNow 355 and bankFor 374, pine/app.js
            var g = d().grade ? String(d().grade) : null, band = CK.bandOf ? CK.bandOf(g || '9') : (g === '11' || g === '12' ? '11-12' : '9-10');
            if (typeof CK.getBank === 'function') return CK.getBank(band, wording);
            var out0 = {}; Object.keys(CK.questions || {}).forEach(function (k) { out0[k] = (CK.questions[k] || []).map(function (q) { return Object.assign({}, q, (q.v || {})[band] || {}, wording === 'plain' ? (q.plain || {}) : {}); }); }); return out0;
          }
          var out = {}; Object.keys(CK.questions || {}).forEach(function (k) { out[k] = (CK.questions[k] || []).map(function (q) { return Object.assign({}, q, wording === 'plain' ? (q.plain || {}) : {}); }); }); return out;
        };
      }
    } else {
      // Maple and Aspen: the kid's own record in a Kids profile (maple loadKids 1527, aspen me()).
      var who = tree === 'maple' ? 'kid' : 'student';
      var top = function () { return GGP.data(ctx.id, tree); };
      var kid = function () { var t = top(); if (!t[who] || typeof t[who] !== 'object') t[who] = {}; return t[who]; };
      // The wording: a Plain lock wins (plainLocked, maple 1454, aspen 1166), then Home's ctx.plain, then the saved one.
      var lock = kid().plainLock === true || top().plainLock === true;
      var plainK = lock ? true : typeof ctx.plain === 'boolean' ? ctx.plain : kid().wording === 'plain';
      var wd = plainK ? 'plain' : 'faith';
      c.plain = plainK; c.plainWeek = true; c.showStory = false; c.shareRefl = true; c.rec = kid;
      c.parts = KEYS.map(function (k) { return { key: k, part: G && G.tree ? G.tree(k) : k }; });   // PARTS name: Roots, Trunk, ...
      c.store = function () { var k = kid(); if (!k.tend || typeof k.tend !== 'object') k.tend = {}; return k.tend; };
      var grade = tree === 'maple' ? String(kid().grade || 'K') : String(kid().grade || 6);
      if (tree === 'maple') {
        var k2 = grade === 'k2' || grade === 'K' || grade === '1' || grade === '2', band = k2 ? 'k2' : '35';   // isK2 1422, mpBand 2219
        c.journey = AG['maple_' + band];
        c.weekStem = band === 'k2' ? 'Think about this week. A grown-up can read these out loud.' : 'Think about this past week.';
        c.history = function () { return (kid().checkins || []).map(function (x) { return { date: dayKey(x.date), type: 'full' }; }); };
      } else {
        c.journey = AG.aspen; c.weekStem = 'Think about this past week.';
        c.history = function () { return (kid().rings || []).map(function (x) { return { date: dayKey(x.date), type: 'full' }; }); };
      }
      // mpWeeklyBank 2337, aspWeeklyBank: question 1 of every part (Leaves 1 is sleep, so Rest), plus the tagged Leaves questions.
      c.questions = function () {
        var Q = CK.getBank ? CK.getBank(grade, wd) : ((CK.questions || {})[grade] || {}), tags = (CK.weekly || {})[grade] || {}, out = {};
        KEYS.forEach(function (key) {
          out[key] = (Q[key] || []).map(function (q, i) { return { t: q[0], s: key === 'leaves' ? (i === 0 ? 'rest' : (Object.keys(tags).filter(function (t) { return tags[t] === i; })[0] || null)) : null }; });
        });
        return out;
      };
    }
    c.J = mergeJourney(J0, c.journey);
    return c;
  }

  /* ---------- the Week, as gg-tend.js draws it ---------- */
  var STYLE = [
    '.ggwk{color:var(--ink);font-size:16.5px;line-height:1.5;max-width:760px;margin:0 auto;overflow-wrap:anywhere}',
    '.ggwk *{box-sizing:border-box}',
    '.ggwk-art{position:relative;margin:0 0 14px;border-radius:var(--r,22px);overflow:hidden;background:var(--bg-deep);aspect-ratio:16/6}',
    '.ggwk-art img{display:block;width:100%;height:100%;object-fit:cover}',
    '.ggwk-art figcaption{position:absolute;left:0;right:0;bottom:0;padding:26px 18px 12px;background:linear-gradient(transparent,rgba(20,14,8,.72));color:#fff}',
    '.ggwk-art figcaption small{display:block;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;opacity:.92}',
    '.ggwk-art figcaption b{display:block;font-family:"Barlow Condensed",sans-serif;font-size:28px;line-height:1.1}',
    '@media (max-width:560px){.ggwk-art{aspect-ratio:16/9}.ggwk-art figcaption b{font-size:23px}}',
    '.ggwk-stretch{margin:0 0 12px;color:var(--ink-soft)}',
    '.ggwk-card{padding:14px 16px;border-radius:18px;background:var(--card);border:1px solid var(--line);box-shadow:var(--shadow);margin:0 0 14px}',
    '.ggwk-card h3{margin:0 0 8px;font-size:18px}',
    '.ggwk-due{border:2px solid var(--gold-soft)}',
    '.ggwk-small{font-size:14.5px;color:var(--ink-soft);margin:6px 0}',
    '.ggwk-story{font-size:15px;margin:8px 0 0}',
    '.ggwk a{color:var(--gold)}',
    '.ggwk-wq{list-style:none;margin:10px 0 0;padding:0}',
    '.ggwk-wq li{padding:12px 0;border-top:1px solid var(--line)}',
    '.ggwk-wq li p{margin:0 0 8px}',
    '.ggwk-opts{display:flex;flex-wrap:wrap;gap:8px}',
    '.ggwk-opts button{font:inherit;font-size:14.5px;min-height:40px;padding:6px 14px;border-radius:20px;border:1.5px solid var(--line);background:var(--bg);color:var(--ink);cursor:pointer}',
    '.ggwk-opts button[aria-checked="true"]{border-color:var(--gold);background:var(--gold);color:var(--on)}',
    '.ggwk-opts button:focus-visible,.ggwk-cal-head button:focus-visible{outline:3px solid var(--gold);outline-offset:2px}',
    '.ggwk-sum{list-style:none;margin:0;padding:0}',
    '.ggwk-sum li{display:flex;flex-wrap:wrap;gap:4px 14px;padding:9px 0;border-top:1px solid var(--line);font-size:15px}',
    '.ggwk-sum li:first-child{border-top:0}',
    '.ggwk-sum li b{min-width:150px}',
    '.ggwk-sum li span:last-child{color:var(--ink-soft)}',
    '.ggwk-up{color:var(--strong)}',
    '@media (max-width:560px){.ggwk-sum li b{min-width:0;width:100%}}',
    '.ggwk-acts{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 0}',
    '.ggwk-guided{display:flex;flex-wrap:wrap;gap:6px 12px;align-items:center;margin:4px 0 8px}',
    '.ggwk-guided span{font-size:14.5px;color:var(--ink-soft)}',
    '.ggwk textarea{width:100%;font:inherit;color:var(--ink);background:var(--bg);border:1.5px solid var(--line);border-radius:12px;padding:10px 12px}',
    '.ggwk label.ggwk-q{display:block;font-weight:600;margin:0 0 6px}',
    '.ggwk-sw{display:flex;gap:10px;align-items:center;margin:8px 0 0}',
    '.ggwk-sw input{width:20px;height:20px;accent-color:var(--gold)}',
    '.ggwk-cal-head{display:flex;align-items:center;justify-content:space-between;margin:0 0 10px}',
    '.ggwk-cal-head h3{margin:0}',
    '.ggwk-cal-head button{width:42px;height:42px;border-radius:50%;border:1px solid var(--line);background:var(--bg);color:var(--ink);font-size:22px;cursor:pointer;line-height:1}',
    '.ggwk-cal-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px;text-align:center}',
    '.ggwk-cal-wd{font-size:13px;color:var(--ink-soft);font-weight:600}',
    '.ggwk-cal-day{display:flex;align-items:center;justify-content:center;aspect-ratio:1;border-radius:50%;font-size:14px;max-width:46px;margin:0 auto;width:100%}',
    '.ggwk-cal-day.on{background:var(--gold);color:var(--on);font-weight:700}',
    '.ggwk-cal-day.six{box-shadow:0 0 0 3px var(--card),0 0 0 5px var(--gold-soft)}',
    '.ggwk-cal-day.rest{border:1px dashed var(--ink-soft)}',
    '.ggwk-cal-day.today{outline:2px solid var(--ink);outline-offset:1px}'
  ].join('\n');
  function css() { if (document.getElementById('ggscr-week-css')) return; var s = document.createElement('style'); s.id = 'ggscr-week-css'; s.textContent = STYLE; document.head.appendChild(s); }

  function open(ctx) {
    css();
    var C = cfgFor(ctx), J = C.J, host = ctx.host;
    var root = document.createElement('div'); root.className = 'ggwk ggscr-week-' + C.tree; host.appendChild(root);
    var EDIT = false, CAL = null, PICK = {};
    // ensure, gg-tend.js 111
    function ensure() {
      if (!window.GGP || !GGP.isOpen(ctx.id)) return null;
      var s = C.store(), b = { v: 1, start: null, season: 1, rings: [], plan: null, level: null, days: {}, weeks: {} };
      Object.keys(b).forEach(function (k) { if (s[k] === undefined) s[k] = b[k]; });
      if (!s.start || !s.plan) {
        var full = (C.history() || []).filter(function (e) { return e && e.type !== 'quick' && e.date; }), last = full[full.length - 1];
        if (!s.start && last) s.start = last.date;
        if (!s.plan) { var wp = (C.history() || []).filter(function (e) { return e && e.growthPlan && countPlan(e.growthPlan); }), lp = wp[wp.length - 1]; if (lp) s.plan = JSON.parse(JSON.stringify(lp.growthPlan)); }
      }
      return s;
    }
    function weekNo(s) { if (!s.start) return 0; return Math.floor(Math.max(0, between(s.start, today())) / 7) + 1; }   // 177
    function weekShown(s) { return Math.min(12, Math.max(1, weekNo(s))); }
    function stretch(w) { return (J.SEASON_ORDER || ['planting', 'rooting', 'blooming'])[Math.min(2, Math.floor((w - 1) / 4))]; }
    function weekKey(s) { return 's' + (s.season || 1) + 'w' + weekNo(s); }
    function strandName(sid) { return { move: 'Move', rest: 'Rest', nourish: 'Nourish' }[sid] || sid; }
    // weeklyQs 388
    function weeklyQs() {
      var Q = C.questions(), out = [];
      C.parts.forEach(function (pt) {
        var list = Q[pt.key] || []; if (!list.length) return;
        out.push({ id: pt.key, key: pt.key, label: pt.part + (list[0].s ? ': ' + strandName(list[0].s) : ''), t: list[0].t });
        list.forEach(function (q, i) { if (i && q.s) out.push({ id: pt.key + '.' + q.s, key: pt.key, label: pt.part + ': ' + strandName(q.s), t: q.t }); });
      });
      return out;
    }
    function score(a) { var o = (C.answers || []).filter(function (x) { return x[0] === a; })[0]; return o ? o[2] : null; }
    function prevWeek(s) {
      var keys = Object.keys(s.weeks || {}).filter(function (k) { return k !== weekKey(s) && s.weeks[k] && s.weeks[k].ans; });
      keys.sort(function (a, b) { return String(s.weeks[a].date).localeCompare(String(s.weeks[b].date)); });
      return keys.length ? s.weeks[keys[keys.length - 1]] : null;
    }
    function theWeek(s) {
      var w = weekShown(s), W = (J.WEEKS || [])[w - 1] || {};
      if (C.plainWeek && W.plain && C.plain) { var Wp = {}; Object.keys(W).forEach(function (k) { Wp[k] = W[k]; }); Object.keys(W.plain).forEach(function (k) { Wp[k] = W.plain[k]; }); W = Wp; }
      return W;
    }
    // the calendar's parts and days (gg-tend.js 140 to 151, 276)
    var tendKeys = function () { var T = window.GGParts && GGParts.TEND ? GGParts.TEND : ['roots', 'bark', 'leaves', 'branches']; return T.filter(function (x) { return KEYS.indexOf(x) >= 0; }); };
    var tended = function (s, d) { var x = s.days[d]; return !!(x && ((x.d && x.d.length) || (x.a && x.a.length))); };
    var tendOn = function (s, d) { var x = s.days[d], set = {}, n = 0; if (!x) return 0; (x.d || []).forEach(function (id) { set[id.split('|')[0]] = 1; }); tendKeys().forEach(function (k) { if (set[k]) n++; }); return n; };
    var restOn = function (s, d) { return (s.rests || []).some(function (r) { return r && r.f <= d && d <= r.t; }); };
    // calendarHtml 438
    function calendarHtml(s) {
      var now = new Date(); if (!CAL) CAL = { y: now.getFullYear(), m: now.getMonth() };
      var first = new Date(CAL.y, CAL.m, 1), days = new Date(CAL.y, CAL.m + 1, 0).getDate(), lead = first.getDay();
      var name = first.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
      var cells = '', n = 0, t = today(), anyRest = false, tk = tendKeys();
      for (var i = 0; i < lead; i++) cells += '<span></span>';
      for (var d = 1; d <= days; d++) {
        var k = CAL.y + '-' + pad(CAL.m + 1) + '-' + pad(d), on = tended(s, k), six = tk.length > 0 && tendOn(s, k) >= tk.length, rest = !on && restOn(s, k);
        if (on) n++; if (rest) anyRest = true;
        cells += '<span class="ggwk-cal-day' + (on ? ' on' : '') + (six ? ' six' : '') + (rest ? ' rest' : '') + (k === t ? ' today' : '') + '" aria-label="' + nice(k) + (six ? ', all ' + NUM[tk.length] + ' parts tended' : on ? ', tended' : rest ? ', Rest Week' : '') + '">' + d + '</span>';
      }
      var wk = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(function (x) { return '<span class="ggwk-cal-wd" aria-hidden="true">' + x + '</span>'; }).join('');
      return '<div class="ggwk-card"><div class="ggwk-cal-head"><button type="button" data-wk="month" data-n="-1" aria-label="Previous month">&lsaquo;</button><h3>' + esc(name) + '</h3><button type="button" data-wk="month" data-n="1" aria-label="Next month">&rsaquo;</button></div>' +
        '<div class="ggwk-cal-grid">' + wk + cells + '</div><p class="ggwk-small">' + n + ' day' + (n === 1 ? '' : 's') + ' tended this month. A filled day means you tended your tree. A ring means all ' + NUM[tk.length] + ' parts.' + (anyRest ? ' A soft dotted circle is a Rest Week day.' : '') + '</p></div>';
    }
    var ART = '/shared/heroes/' + C.tree + '-wide.webp';
    function art(kick, title) { return '<figure class="ggwk-art"><img src="' + ART + '" alt="" loading="lazy"><figcaption><small>' + esc(kick) + '</small><b>' + esc(title) + '</b></figcaption></figure>'; }
    // renderWeek 405
    function render() {
      var s = ensure();
      if (!s) { root.innerHTML = '<p>Open your profile to see your week.</p>'; return; }
      if (!s.start) {
        root.innerHTML = art('Week', 'Your season starts with a full check-in') + '<div class="ggwk-card"><p>A season is twelve weeks. Each week brings a theme, a short check-in, and a question to sit with. It begins the day you finish your first full check-in.</p><div class="ggwk-acts"><button type="button" class="hm-btn sm" data-wk="full">Begin my check-in</button></div></div>' + calendarHtml(s);
        return;
      }
      var w = weekShown(s), W = theWeek(s), st = (J.SEASONS || {})[stretch(w)] || {}, rec = (s.weeks || {})[weekKey(s)] || null;
      var html = art('Season ' + (s.season || 1) + ', week ' + w + ' of 12', W.theme || '') + '<p class="ggwk-stretch"><b>' + esc(st.name || '') + '.</b> ' + esc(st.line || '') + '</p>';
      if (weekNo(s) > 12) html += '<div class="ggwk-card ggwk-due"><p><b>Your season check-in is ready.</b> Finish a full check-in to add a ring to your tree and begin a new season.</p><div class="ggwk-acts"><button type="button" class="hm-btn sm" data-wk="full">Begin my season check-in</button></div></div>';
      html += '<div class="ggwk-card"><p>' + esc(W.intro || '') + '</p>' + (W.story && C.showStory !== false ? '<p class="ggwk-story">From Grounded: <a href="' + esc(W.story.url) + '" target="_blank" rel="noopener">' + esc(W.story.title) + '</a>. <i>' + esc(W.story.line) + '</i></p>' : '') + '</div>';
      var Qs = weeklyQs(), pv = prevWeek(s);
      if (rec && rec.ans && !EDIT) {
        html += '<div class="ggwk-card"><h3>This Week\'s Check-in</h3><ul class="ggwk-sum">' + Qs.map(function (q) {
          var a = rec.ans[q.id], lab = ((C.answers || []).filter(function (x) { return x[0] === a; })[0] || [])[1] || 'Skipped', p = pv && pv.ans ? score(pv.ans[q.id]) : null, n = score(a);
          var tr = p === null || n === null ? '' : n > p ? '<span class="ggwk-up">Up from last week</span>' : n < p ? '<span>Down from last week</span>' : '<span>Same as last week</span>';
          return '<li><b>' + esc(q.label) + '</b><span>' + esc(lab) + '</span>' + tr + '</li>';
        }).join('') + '</ul><div class="ggwk-acts"><button type="button" class="hm-btn sm line" data-wk="edit">Change my answers</button></div></div>';
      } else {
        // The Guided Weekly Check-in button (oakWeekGuidedBar 2662, sqWeekGuidedBar 638), above the stem.
        var gd = C.guided && guidedOk() ? '<p class="ggwk-guided"><button type="button" class="hm-btn sm" data-wk="guided">Guided Weekly Check-in</button> <span>One question at a time, read aloud.</span></p>' : '';
        html += '<div class="ggwk-card"><h3>This Week\'s Check-in</h3>' + gd + '<p class="ggwk-small">' + esc(C.weekStem) + '</p><ol class="ggwk-wq">' + Qs.map(function (q) {
          var cur = PICK[q.id] != null ? PICK[q.id] : rec && rec.ans ? rec.ans[q.id] : null;
          return '<li><p><b>' + esc(q.label) + '.</b> ' + esc(q.t) + '</p><div class="ggwk-opts" role="radiogroup" aria-label="' + esc(q.label) + '">' + (C.answers || []).map(function (o) {
            return '<button type="button" role="radio" aria-checked="' + (cur === o[0]) + '" data-wk="pick" data-q="' + esc(q.id) + '" data-a="' + esc(o[0]) + '">' + esc(o[1]) + '</button>';
          }).join('') + '</div></li>';
        }).join('') + '</ol><div class="ggwk-acts"><button type="button" class="hm-btn sm" data-wk="save">Save this week</button></div></div>';
      }
      html += '<div class="ggwk-card"><h3>Reflection</h3><label class="ggwk-q" for="ggwk-refl">' + esc(W.q || 'What did you notice this week?') + '</label><textarea id="ggwk-refl" rows="4">' + esc(rec && rec.refl || '') + '</textarea>' +
        (C.shareRefl ? '<label class="ggwk-sw"><input type="checkbox" id="ggwk-share"' + (rec && rec.share ? ' checked' : '') + '> Share this reflection with my grown-up</label><p class="ggwk-small">Your reflections are just for you unless you share one.</p>' : '') +
        '<div class="ggwk-acts"><button type="button" class="hm-btn sm line" data-wk="refl">Save my reflection</button></div></div>';
      html += calendarHtml(s);
      root.innerHTML = html;
    }
    function persist() { return Promise.resolve(GGP.save(ctx.id)).then(function () { if (ctx.changed) ctx.changed(); }).catch(function () { ctx.toast('That did not save. Open your profile and try again.'); }); }
    // weekSave 713 (saveWeek 760 and saveWeekAns 777)
    function weekSave(ans, refl, share) {
      var s = ensure(); if (!s) return false;
      if (Object.keys(ans).length < weeklyQs().length) { ctx.toast('Answer each question, or choose Not sure.'); return false; }
      var k = weekKey(s); s.weeks[k] = Object.assign(s.weeks[k] || {}, { date: today(), ans: ans }); if (refl != null) s.weeks[k].refl = String(refl).trim();
      if (share !== undefined) { if (share) s.weeks[k].share = true; else delete s.weeks[k].share; }
      PICK = {}; EDIT = false;
      persist(); render(); ctx.toast('Saved. See you next week.');
      return true;
    }
    function picked() { var ans = {}; root.querySelectorAll('.ggwk-opts [aria-checked="true"]').forEach(function (b) { ans[b.getAttribute('data-q')] = b.getAttribute('data-a'); }); return ans; }
    // The guided week (oakGuidedWeek 1807, sqGuidedWeek 623)
    function guidedOk() { return !!(window.GGGuided && window.GG_GUIDED && GG_GUIDED[C.tree]); }
    var GD = null;
    function guided() {
      var s = ensure(); if (!s || !s.start || !guidedOk()) return;
      var Q = C.questions(), opts = (C.answers || []).map(function (o) { return { v: o[0], label: o[1] }; });
      var qOf = function (id) { var p = String(id).split('.'), L = Q[p[0]] || []; return (p[1] ? L.filter(function (q) { return q.s === p[1]; })[0] : L[0]) || {}; };
      var qs = weeklyQs().map(function (q, n) { return { id: q.id, part: q.key, stem: C.weekStem, text: q.t, say: n ? q.t : C.weekStem + ' ' + q.t, type: 'choice', options: opts, rev: !!qOf(q.id).r }; });
      // oakGdEdge 1757, sqGdEdge 578: Rarely or Sometimes on a forward question, Often or Almost always on a reverse one.
      var isEdge = function (q, v) { var o = (C.answers || []).filter(function (x) { return x[0] === v; })[0]; if (!o || o[2] === null) return false; return (q.rev ? 3 - o[2] : o[2]) <= 1; };
      var was = window.gwPlainOn; if (C.tree === 'oak') window.gwPlainOn = function () { return !!C.plain; };
      var o = { tree: C.tree, kind: 'week', voice: 'brian', title: 'Weekly Check-in', questions: qs, quiet: ((C.CK.help || {}).quiet) || undefined, isEdge: isEdge,
        onDone: function (r) { if (C.tree === 'oak') window.gwPlainOn = was; GD = null; weekSave(Object.assign({}, r.answers || {}), null); },
        onReadAll: function (ans) { if (C.tree === 'oak') window.gwPlainOn = was; GD = null; EDIT = true; PICK = Object.assign({}, ans || {}); render(); EDIT = false; },
        onClose: function () { if (C.tree === 'oak') window.gwPlainOn = was; GD = null; } };
      if (C.tree === 'oak') o.plain = function () { return !!C.plain; };
      GD = GGGuided.run(o);
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-wk]'); if (!b || !root.contains(b)) return;
      var k = b.getAttribute('data-wk');
      if (k === 'pick') { Array.prototype.forEach.call(b.parentNode.children, function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); }); PICK[b.getAttribute('data-q')] = b.getAttribute('data-a'); return; }
      if (k === 'save') { var sh = root.querySelector('#ggwk-share'); weekSave(picked(), (root.querySelector('#ggwk-refl') || {}).value, sh ? sh.checked : undefined); return; }
      if (k === 'edit') { EDIT = true; render(); EDIT = false; return; }
      if (k === 'refl') {
        // saveRefl 778
        var s = ensure(); if (!s) return; var wk = weekKey(s), v = ((root.querySelector('#ggwk-refl') || {}).value || '').trim();
        s.weeks[wk] = Object.assign(s.weeks[wk] || { date: today() }, { refl: v.slice(0, 4000) });
        var shr = root.querySelector('#ggwk-share'); if (shr) { if (shr.checked) s.weeks[wk].share = true; else delete s.weeks[wk].share; }
        persist(); ctx.toast(shr && shr.checked ? 'Reflection saved and shared with your grown-up.' : 'Reflection saved.');
        return;
      }
      if (k === 'month') { if (!CAL) return; CAL.m += +b.getAttribute('data-n'); if (CAL.m < 0) { CAL.m = 11; CAL.y--; } if (CAL.m > 11) { CAL.m = 0; CAL.y++; } var keep = picked(); Object.keys(keep).forEach(function (q) { PICK[q] = keep[q]; }); var tx = (root.querySelector('#ggwk-refl') || {}).value; var ed = !!root.querySelector('.ggwk-wq') && !!(((ensure() || {}).weeks || {})[weekKey(ensure())] || {}).ans; EDIT = ed; render(); EDIT = false; var ta = root.querySelector('#ggwk-refl'); if (ta && tx != null) ta.value = tx; return; }
      if (k === 'full') { ctx.openHome('checkin'); return; }
      if (k === 'guided') { guided(); return; }
    });
    render();
    return { close: function () { if (GD && GD.close) { try { GD.close(true); } catch (e) {} } root.remove(); }, state: function () { return { picked: picked() }; } };
  }

  window.GGScreen.week = {
    files: function (tree) {
      var f = ['/shared/gg-journey.js?v=b929', '/shared/gg-parts.js?v=b929', CK_JS[tree] || CK_JS.oak];
      if (GUIDED[tree]) f.push('/shared/gg-guided.js?v=b907', '/shared/guided/' + tree + '.js?v=b907');
      return f;
    },
    title: function () { return 'Weekly Check-in'; },
    trees: TREES.slice(),
    open: open
  };
})();
