/* =====================================================================
   GROW WITH GROUNDED . OAK CHECK-IN MODULE (shared/checkin/oak.js), GWG BLD 912 Round 1
   (c) 2026 Grow With Grounded LLC.
   Oak's guided check-in and Quick Check-in, by the person themselves, run by Home in its own window: no tree page,
   no iframe, no navigation. The contract: grounded-workshop patches/bld912/CONTRACT.md.
   Everything here is the glue oak/index.html (V b907) runs today, moved into one place, so every sentence spoken is the
   same (and plays the same recorded clip) and every record saved is the same, key for key:
     questions        oakGdQuestions (oak/index.html:1758), bank /oak/checkin.js (OAK_CHECKIN.questions)
     the player       oakGuided (oak/index.html:1767), kind from oakFullKind (oak/index.html:1748)
     scoring          partScore (oak/index.html:1524), the quick formula (oak/index.html:2017)
     the record       calculateResults (oak/index.html:2008 to 2066), sortEntries (2687), profPersist (2725)
     season, rings    GGTend.onFullCheckin and ensure (shared/gg-tend.js:112, 177, 741), ported here, because GGTend is
                      one per page and runs the tree page's own screens (its init draws Today, Week, and Season)
     Health offer     GGLife.offerCard (shared/gg-life.js:658), the vault.lifeOffer date
     growth plan      oakGuidedPlan (oak/index.html:1829), oakPrefillPlan (2314), oakRotApply (2160),
                      collectGrowthPlan (2677), oakSavePlan (2335), GGTend.setPlan (gg-tend.js:733), savePersonalFile (3078)
   Left out on purpose (Round 1): a check-in taken together (by 'tapped', kind 'together'), the helper view, the weekly
   check-in, Read It All (the classic form lives on the tree page; ctx.onReadAll is passed through when Home gives one).

   GGCheckin.oak = { files, kinds: ['full', 'quick'], run(ctx), plan(ctx) }
     run(ctx): ctx.id, ctx.kind 'full' | 'quick', ctx.plain, ctx.member, ctx.onSaved(entry), ctx.onClose(),
               optional: ctx.plan (false: stop after the check-in, no Growth Plan step), ctx.toast(msg),
               ctx.onPlanSaved(plan, entry), ctx.lifeHost (an element for the Health and Ability card), ctx.onLife(),
               ctx.onLifeOffer() (called when the card is due and no lifeHost is given), ctx.onReadAll(answers).
     plan(ctx): the Growth Plan step on its own (?guided=plan): scores from the latest check-in, as oakPlanOpen does.
     Both return a handle {el, close(), state()} that follows whichever player is on screen.
   No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  var TREE = 'oak';
  var FILES = [
    '/oak/checkin.js?v=b929',
    '/oak/practices.js?v=b929',
    '/shared/gg-parts.js?v=b929',
    '/shared/gg-life.js?v=b907',
    '/shared/practice-rhythm.js?v=b929',
    '/shared/gg-guided.js?v=b907',
    '/shared/guided/oak.js?v=b929'
  ];
  var PART_ORDER = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];          // oak/index.html:1337
  // oak/index.html:1746
  var TITLE = { start: 'Your First Check-in', full: 'Check-in', season: 'Season Check-in', quick: 'Quick Check-in', week: 'Weekly Check-in', together: 'Check-in Together', plan: 'Your Growth Plan' };
  var LEFT = null;   // a check-in closed part way: {sig, ans}, picked up when the same one starts again (oak/index.html:1771)

  function CKB() { return window.OAK_CHECKIN || {}; }
  function OPTS() { return CKB().answers || []; }
  function QS() { return CKB().questions || {}; }
  function clone(x) { return JSON.parse(JSON.stringify(x)); }
  function pad(n) { return String(n).padStart(2, '0'); }
  // oak/index.html:2353
  function todayKey() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function toast(ctx, m) { try { if (ctx && typeof ctx.toast === 'function') ctx.toast(m); } catch (e) {} }

  /* ---------- the parts and their words (oak/index.html:1350 to 1363) ---------- */
  function tendKeys() { var G = window.GGParts; return G && G.label && G.TEND ? G.TEND.slice() : ['roots', 'bark', 'leaves', 'branches']; }
  function label(key, plainFn) { var G = window.GGParts; return G && G.label ? G.label(key, { plain: plainFn }) : key.charAt(0).toUpperCase() + key.slice(1); }

  /* ---------- the vault ---------- */
  function rec(id) { return GGP.data(id, TREE); }
  // profSync (oak/index.html:2706): history is a list, and the old care plan key moves to growthPlan
  function history(id) {
    var d = rec(id); if (!Array.isArray(d.history)) d.history = [];
    d.history.forEach(function (h) { var old = 'care' + 'Plan'; if (h && h[old] !== undefined) { if (h.growthPlan === undefined) h.growthPlan = h[old]; delete h[old]; } });
    return d.history;
  }
  // sortEntries (oak/index.html:2687)
  function sortEntries(list) { list.sort(function (a, b) { return String(a.date).localeCompare(String(b.date)) || String(a.id).localeCompare(String(b.id)); }); return list; }

  /* ---------- tend: the same record and rules as GGTend (shared/gg-tend.js), for this profile ---------- */
  // TEND_CFG.store.get (oak/index.html:2647) and TEND_CFG.history (2636)
  function tendRec(id) { var d = rec(id); if (!d.tend || typeof d.tend !== 'object') d.tend = {}; return d.tend; }
  function tendHistory(id) { return history(id).filter(function (e) { return e && !e.from; }); }
  function parse(s) { var p = String(s).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function between(a, b) { return Math.round((parse(b) - parse(a)) / 86400000); }
  function weekNo(s) { if (!s.start) return 0; return Math.floor(Math.max(0, between(s.start, todayKey())) / 7) + 1; }   // gg-tend.js:177
  function countPlan(p) { var n = 0; Object.keys(p || {}).forEach(function (k) { var x = p[k] || {}; n += (x.selected || []).length + (x.custom ? 1 : 0) + (x.own || []).length + (x.lib || []).length; }); return n; }
  // ensure (gg-tend.js:112)
  function ensure(id) {
    var s = tendRec(id);
    var b = { v: 1, start: null, season: 1, rings: [], plan: null, level: null, days: {}, weeks: {} };
    Object.keys(b).forEach(function (k) { if (s[k] === undefined) s[k] = b[k]; });
    if (!s.start || !s.plan) {
      var H = tendHistory(id);
      var full = H.filter(function (e) { return e && e.type !== 'quick' && e.date; });
      var last = full[full.length - 1];
      if (!s.start && last) s.start = last.date;
      if (!s.plan) { var withPlan = H.filter(function (e) { return e && e.growthPlan && countPlan(e.growthPlan); }); var lp = withPlan[withPlan.length - 1]; if (lp) s.plan = clone(lp.growthPlan); }
    }
    return s;
  }
  // onFullCheckin (gg-tend.js:741): start the first season, or at week 12 or later add a ring and begin the next one
  function onFullCheckin(id, entry) {
    var s = ensure(id), d = (entry && entry.date) || todayKey(), msg = null;
    if (!s.start) { s.start = d; s.season = 1; msg = 'Your first season has begun. Week 1 starts today.'; }
    else if (weekNo(s) >= 12) { s.rings = (s.rings || []).concat([{ date: d, season: s.season || 1 }]); s.season = (s.season || 1) + 1; s.start = d; msg = 'A new ring for your tree. Season ' + s.season + ' begins today.'; }
    if (msg && s.rings && s.rings.length) ringMiles(s);
    return msg;
  }
  // A new ring is a milestone. The tree page's game layer stamps it the moment Today draws again after the check-in
  // (Oak checkMiles(s, true) and milesNow, oak/index.html:2421 to 2436; pnRec 2391). The other milestones come from
  // days tended, never from a check-in, and stay with Today.
  function ringMiles(s) {
    if (!s.ok || typeof s.ok !== 'object') s.ok = { miles: {}, bal: {} }; s.ok.miles = s.ok.miles || {}; s.ok.bal = s.ok.bal || {};
    var R = s.ok;
    s.rings.forEach(function (r, i) { var mid = i ? 'season' + (i + 1) : 'ring'; if (!R.miles[mid]) R.miles[mid] = todayKey(); });
  }
  // setPlan (gg-tend.js:733): library picks and own practices stay when the plan is rebuilt
  function setPlan(id, p) {
    var s = ensure(id), old = s.plan || {}; s.plan = clone(p);
    Object.keys(old).forEach(function (k) { var L = (old[k] || {}).lib, O = (old[k] || {}).own; if (L && L.length) { if (!s.plan[k]) s.plan[k] = { selected: [] }; if (!s.plan[k].lib) s.plan[k].lib = L; } if (O && O.length) { if (!s.plan[k]) s.plan[k] = { selected: [] }; if (!s.plan[k].own) s.plan[k].own = O; } });
  }
  // oakFullKind (oak/index.html:1748), with a profile open
  function fullKind(id) { var s = ensure(id); return !s.start ? 'start' : weekNo(s) >= 12 ? 'season' : 'full'; }

  /* ---------- the questions (oak/index.html:1754 to 1766) ---------- */
  function gdOpts() { return OPTS().map(function (o) { return { v: o[0], label: o[1] }; }); }
  function isEdge(q, v) { var o = OPTS().filter(function (x) { return x[0] === v; })[0]; if (!o || o[2] === null) return false; return (q.rev ? 3 - o[2] : o[2]) <= 1; }
  // BLD 929 (M6): Plain wording reads each question's plain version where the Faith question names faith.
  function gdQuestions(quick, plain) {
    var out = [], stem = CKB().stems.standard, Q = QS();
    PART_ORDER.forEach(function (k) {
      (quick ? [Q[k][0]] : Q[k]).forEach(function (q, i) {
        var key = quick ? 'quick_' + k : k, lead = quick ? !out.length : i === 0, t = plain && q.plain && q.plain.t ? q.plain.t : q.t;
        out.push({ id: key + '.' + i, key: key, i: i, part: k, stem: stem, text: t, say: lead ? stem + ' ' + t : t, type: 'choice', options: gdOpts(), rev: !!q.r });
      });
    });
    return out;
  }

  /* ---------- scoring (oak/index.html:1524, 2015 to 2021) ---------- */
  function partScore(key, answers) {
    var qs = QS()[key], sum = 0, n = 0, O = OPTS();
    qs.forEach(function (q, i) {
      var a = answers[i]; if (q.c || a == null) return;
      var opt = O.filter(function (o) { return o[0] === a; })[0]; if (!opt || opt[2] === null) return;
      sum += q.r ? 3 - opt[2] : opt[2]; n++;
    });
    return n ? Math.max(1, Math.min(10, Math.round(1 + 9 * (sum / n) / 3))) : null;
  }
  function makeEntry(ans, quick) {
    var scores = {}, reflections = {}, unsure = [], O = OPTS();
    PART_ORDER.forEach(function (k) {
      var sc;
      if (quick) { var o = O.filter(function (x) { return x[0] === (ans['quick_' + k] || {})[0]; })[0]; sc = o && o[2] !== null ? Math.round(1 + 9 * o[2] / 3) : null; }
      else sc = partScore(k, ans[k] || {});
      if (sc == null) { unsure.push(k); sc = 5; }   // drawn as a middle shade, shown as "Not sure yet"
      scores[k] = sc;
      reflections[k] = '';   // a guided run has no "Sit with this" boxes on screen
    });
    // oak/index.html:2057, the keys in this order
    return { id: Date.now().toString(36), date: todayKey(), std: 1, scores: scores, unsure: unsure, reflections: reflections, growthPlan: {}, type: quick ? 'quick' : 'full', answers: quick ? null : clone(ans), by: 'self' };
  }

  /* ---------- Health and Ability: one quiet card after a full check-in, once per tree (gg-life.js:658) ---------- */
  function lifeOffer(ctx) {
    var L = window.GGLife;
    if (ctx.lifeHost && L && L.offerCard) { L.offerCard(ctx.lifeHost, TREE, { onChoose: function () { if (typeof ctx.onLife === 'function') ctx.onLife(); } }); return; }
    var c = L && L.get ? L.get(ctx.id) : (function () { var v = GGP.data(ctx.id).life || {}; return { ids: Array.isArray(v.ids) ? v.ids : [], none: !!v.none, rather: !!v.rather }; })();
    if (c.ids.length || c.none || c.rather) return;
    var v = GGP.data(ctx.id); if (!v) return;
    v.lifeOffer = v.lifeOffer && typeof v.lifeOffer === 'object' ? v.lifeOffer : {};
    if (v.lifeOffer[TREE]) return;
    v.lifeOffer[TREE] = todayKey();
    if (typeof ctx.onLifeOffer === 'function') { try { ctx.onLifeOffer(); } catch (e) {} }
  }

  /* ---------- the practices (oak/index.html:1172, 1388 to 1395, 1825 to 1827) ---------- */
  function P() { return window.OAK_PRACTICES || {}; }
  function defOf(key) { return (P().DOMAIN_DEFS || []).filter(function (d) { return d.key === key; })[0] || { restore: [] }; }
  // d.restore with the NEW rows added after it, the way the page adds them once on load (oak/index.html:1392)
  function restoreOf(key) {
    var d = defOf(key), rows = (d.restore || []).slice(), have = {};
    rows.forEach(function (r) { have[r[0]] = 1; });
    ((P().NEW || {})[key] || []).forEach(function (r) { if (!have[r[0]]) rows.push(r); });
    return rows;
  }
  function lifeTags(key, name) {
    var p = P(), G = p.G || {}, k = key + '|' + name, f = (p.FLAGS || {})[k] || {};
    var g = (Object.prototype.hasOwnProperty.call(G, k) ? G[k] : (p.GUIDES || {})[k]) || {};   // Object.assign(GUIDES, G)
    return { life: f.life || [], adapt: f.adapt || g.adapt || '', sober: f.sober || [] };
  }
  function lifeOrder(key, rows) { return window.GGLife ? GGLife.order(rows, function (r) { return lifeTags(key, r[0]); }) : rows; }

  /* ---------- a handle that follows the player on screen ---------- */
  function handle() {
    var H = { cur: null, gone: false };
    H.api = {
      get el() { return H.cur ? H.cur.el : null; },
      close: function (quiet) { H.gone = true; if (H.cur) H.cur.close(quiet); },
      state: function () { return H.cur ? H.cur.state() : null; }
    };
    return H;
  }
  function closed(ctx) { if (typeof ctx.onClose === 'function') { try { ctx.onClose(); } catch (e) {} } }

  // window.gwPlainOn: the guided script's Roots enter line reads this global (shared/guided/oak.js:80).
  // Oak's own page defines it from the profile's wording; here it is Home's Plain choice for this profile.
  function usePlain(on) { var was = window.gwPlainOn; window.gwPlainOn = function () { return !!on; }; return function () { window.gwPlainOn = was; }; }

  /* ---------- the Growth Plan step (oakGuidedPlan, oak/index.html:1829) ---------- */
  function planRun(ctx, H, sc, un, entry) {
    var id = ctx.id, plainFn = function () { return !!ctx.plain; };
    var s = ensure(id), prior = s.plan || (entry && entry.growthPlan) || null;   // oakPrefillPlan (oak/index.html:2318)
    var TK = tendKeys(), ROWS = {}, ON = {}, CUSTOM = {};
    PART_ORDER.forEach(function (k) {
      if (TK.indexOf(k) < 0) return;   // Trunk and Fruit grow from the tending: no boxes, no own practice line
      ROWS[k] = lifeOrder(k, restoreOf(k));
      var p = (prior || {})[k] || {}, chosen = p.selected || [];
      ON[k] = ROWS[k].filter(function (r) { return chosen.indexOf(r[0]) >= 0; }).map(function (r) { return r[0]; });
      CUSTOM[k] = prior ? String(p.custom || '').trim() : '';
    });
    // collectGrowthPlan (oak/index.html:2677): the boxes in list order (chosen first, each in its list place)
    function collect() { var plan = {}; PART_ORDER.forEach(function (k) { plan[k] = { selected: ROWS[k] ? ON[k].slice() : [], custom: ROWS[k] ? CUSTOM[k] : '' }; }); return plan; }
    function pick(part, names) { if (!ROWS[part]) return; ON[part] = ROWS[part].filter(function (r) { return names.indexOf(r[0]) >= 0; }).map(function (r) { return r[0]; }); }
    var cur = collect();
    var order = PART_ORDER.filter(function (k) { return TK.indexOf(k) >= 0; }).sort(function (a, b) { return (un.indexOf(a) >= 0 ? 1 : 0) - (un.indexOf(b) >= 0 ? 1 : 0) || sc[a] - sc[b]; });
    var steps = order.map(function (k) {
      var rows = ROWS[k], mine = cur[k].selected;
      var pk = rows.filter(function (r) { return mine.indexOf(r[0]) >= 0; }).concat(rows.filter(function (r) { return mine.indexOf(r[0]) < 0; }).slice(0, 8));
      return { type: 'plan', part: k, label: label(k, plainFn), choices: pk.map(function (r) { return { name: r[0] }; }), max: 3 };
    });
    var plan0 = {}; order.forEach(function (k) { plan0[k] = cur[k].selected.slice(); });
    var undo = usePlain(ctx.plain);
    var o = {
      tree: TREE, kind: 'plan', voice: 'brian', title: TITLE.plan, questions: steps, plan: plan0, quiet: false, plain: plainFn,
      onPlan: function (part, names) { pick(part, names); },
      onDone: function (r) {
        Object.keys(r.plan || {}).forEach(function (p) { pick(p, r.plan[p]); });
        // oakSavePlan (oak/index.html:2335)
        var plan = collect();
        var n = PART_ORDER.reduce(function (t, k) { return t + plan[k].selected.length + (plan[k].custom ? 1 : 0); }, 0);
        if (!n) { toast(ctx, 'Choose at least one practice first.'); return; }
        setPlan(id, plan);
        if (entry) {   // savePersonalFile (oak/index.html:3078): the plan lands in the check-in's own record too
          entry.growthPlan = clone(plan);
          var c = clone(entry), list = history(id), i = -1;
          list.forEach(function (e, j) { if (e && e.id === c.id) i = j; });
          if (i >= 0) list[i] = c; else list.push(c);
          sortEntries(list);
          rec(id).history = clone(list);
        }
        GGP.save(id).then(function () {
          if (typeof ctx.onPlanSaved === 'function') { try { ctx.onPlanSaved(clone(plan), entry ? clone(entry) : null); } catch (e) {} }
          setTimeout(function () { toast(ctx, 'Saved. Your practices are in Today.'); }, 700);
        });
      },
      onClose: function () { undo(); H.cur = null; closed(ctx); }
    };
    if (typeof ctx.onReadAll === 'function') o.onReadAll = function () { ctx.onReadAll(null); };
    H.cur = GGGuided.run(o);
    return H.api;
  }

  /* ---------- the check-in (oakGuided, oak/index.html:1767) ---------- */
  function run(ctx) {
    ctx = ctx || {};
    var id = ctx.id, quick = ctx.kind === 'quick';
    if (!id || !window.GGP || !window.GGGuided || !window.OAK_CHECKIN) return null;
    history(id);   // the page reads the record's history when the profile opens, before tend (profSync)
    var kind = quick ? 'quick' : fullKind(id);
    if (quick) ensure(id);   // the page's Today screen has filled the tend record before any check-in starts
    var sig = [id, kind, 'self', '', quick ? 'q' : 'f'].join('|');
    var ans = LEFT && LEFT.sig === sig ? LEFT.ans : {};
    LEFT = { sig: sig, ans: ans };
    var qs = gdQuestions(quick, !!ctx.plain), byId = {}, H = handle(), saved = null;
    qs.forEach(function (q) { byId[q.id] = q; });
    var have = {}; qs.forEach(function (q) { var v = (ans[q.key] || {})[q.i]; if (v) have[q.id] = v; });
    function answerQ(key, i, v) { ans[key] = ans[key] || {}; ans[key][i] = v; }   // oak/index.html:1544
    var undo = usePlain(ctx.plain), plainFn = function () { return !!ctx.plain; };
    var o = {
      tree: TREE, kind: kind, voice: 'brian', plain: plainFn,
      title: TITLE[kind] || 'Check-in',
      questions: qs, answers: have, quiet: (CKB().help || {}).quiet || undefined, isEdge: isEdge,
      onAnswer: function (qid, v) { var q = byId[qid]; if (q) answerQ(q.key, q.i, v); },
      onDone: function (r) {
        Object.keys(r.answers || {}).forEach(function (qid) { var q = byId[qid]; if (q && r.answers[qid]) answerQ(q.key, q.i, r.answers[qid]); });
        LEFT = null;   // a finished check-in: the next one starts fresh (oak/index.html:2009)
        saved = save(ctx, ans, quick);
      },
      onClose: function () {
        undo(); H.cur = null;
        if (saved && ctx.plan !== false && !H.gone) { var e = saved; planRun(ctx, H, e.scores, e.unsure || [], e); return; }
        closed(ctx);
      }
    };
    if (typeof ctx.onReadAll === 'function') o.onReadAll = function (a) { ctx.onReadAll(a); };
    H.cur = GGGuided.run(o);
    return H.api;
  }

  // calculateResults (oak/index.html:2056 to 2063) for a check-in by the person themselves
  function save(ctx, ans, quick) {
    var id = ctx.id, entry = makeEntry(ans, quick), list = history(id);
    list.push(clone(entry)); sortEntries(list);
    rec(id).history = clone(list);   // profPersist (oak/index.html:2725)
    var msg = quick ? null : onFullCheckin(id, entry);
    if (!quick) lifeOffer(ctx);
    GGP.save(id).then(function () {
      if (typeof ctx.onSaved === 'function') { try { ctx.onSaved(clone(entry)); } catch (e) {} }
      if (msg) setTimeout(function () { toast(ctx, msg); }, 900);
    });
    return entry;
  }

  // The Growth Plan on its own: the latest check-in's scores (oakPlanOpen and oakLatestEntry, oak/index.html:2309, 2327)
  function planOnly(ctx) {
    ctx = ctx || {};
    if (!ctx.id || !window.GGP || !window.GGGuided) return null;
    var list = history(ctx.id).filter(function (e) { return e && e.scores && !e.from; }), full = list.filter(function (e) { return e.type !== 'quick'; });
    var e = full[full.length - 1] || list[list.length - 1] || null;
    if (!e) return null;
    return planRun(ctx, handle(), e.scores, e.unsure || [], null);
  }

  window.GGCheckin = window.GGCheckin || {};
  window.GGCheckin[TREE] = { files: FILES, kinds: ['full', 'quick'], run: run, plan: planOnly };
})();
