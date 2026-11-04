/* =====================================================================
   GROW WITH GROUNDED . SEQUOIA CHECK-IN MODULE (shared/checkin/sequoia.js), GWG BLD 912 Round 1
   (c) 2026 Grow With Grounded LLC.
   Sequoia's guided check-in and Quick Check-in, by the person themselves, run by Home in its own window: no tree page,
   no iframe, no navigation. The contract: grounded-workshop patches/bld912/CONTRACT.md.
   Everything here is the glue sequoia/app.js (V b907) runs today, moved into one place, so every sentence spoken is the
   same (and plays the same recorded clip) and every record saved is the same, key for key:
     questions        sqGdQuestions (sequoia/app.js:582), bank /sequoia/checkin.js (SEQUOIA_CHECKIN.questions)
     the player       sqGuided (sequoia/app.js:594), kind from sqFullKind (sequoia/app.js:570)
     scoring          partScore (sequoia/app.js:363), the quick formula (sequoia/app.js:851)
     the record       calculateResults (sequoia/app.js:845 to 905), sortEntries (1713), profPersist (1782).
                      The date is the UTC date (new Date().toISOString()), kept exactly as Sequoia writes it today.
     names forward    sqNamesForward (sequoia/app.js:1747), run on the record first, as sqRec and the tend store do
     season, rings    GGTend.onFullCheckin and ensure (shared/gg-tend.js:112, 177, 741), ported here, because GGTend is
                      one per page and runs the tree page's own screens (its init draws Today, Week, and Season)
     Health offer     GGLife.offerCard (shared/gg-life.js:658), the vault.lifeOffer date
     growth plan      sqGuidedPlan (sequoia/app.js:654), oakPrefillPlan (1528), oakRotApply (1161),
                      collectGrowthPlan (1703), oakSavePlan (1549), GGTend.setPlan (gg-tend.js:733), savePersonalFile (2096)
   Wording: Sequoia is always Faith (gwPlainOn is false, sequoia/app.js:211, and no plain goes to the player), whatever
   ctx.plain says.
   Left out on purpose (Round 1): taken together ('tapped'), What I See ('observed'), a helper's own check-in
   ('helper'), the helper view, the weekly check-in, Read It All (the classic screens live on the tree page;
   ctx.onReadAll is passed through when Home gives one).

   GGCheckin.sequoia = { files, kinds: ['full', 'quick'], run(ctx), plan(ctx) }
     run(ctx): ctx.id, ctx.kind 'full' | 'quick', ctx.plain, ctx.member, ctx.onSaved(entry), ctx.onClose(),
               optional: ctx.plan (false: stop after the check-in, no Growth Plan step), ctx.toast(msg),
               ctx.onPlanSaved(plan, entry), ctx.lifeHost (an element for the Health and Ability card), ctx.onLife(),
               ctx.onLifeOffer() (called when the card is due and no lifeHost is given), ctx.onReadAll(answers).
     plan(ctx): the Growth Plan step on its own (?guided=plan): scores from the latest check-in, as oakPlanOpen does
               (sequoia/app.js:1541).
     Both return a handle {el, close(), state()} that follows whichever player is on screen.
   No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  var TREE = 'sequoia';
  var FILES = [
    '/sequoia/checkin.js?v=b907',
    '/sequoia/practices.js?v=b914a',
    '/shared/gg-parts.js?v=b907',
    '/shared/gg-life.js?v=b907',
    '/shared/practice-rhythm.js?v=b914a',
    '/shared/gg-guided.js?v=b907',
    '/shared/guided/sequoia.js?v=b907'
  ];
  var PART_ORDER = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];          // sequoia/app.js:195
  // sequoia/app.js:566
  var TITLE = { start: 'Your First Check-in', full: 'Check-in', season: 'Season Check-in', quick: 'Quick Check-in', week: 'Weekly Check-in', together: 'Check-in Together', observed: 'What I See', helper: 'My Own Check-in', plan: 'Your Growth Plan' };
  var LEFT = null;   // a check-in closed part way: {sig, ans}, picked up when the same one starts again (sequoia/app.js:598)
  var NEVER_PLAIN = function () { return false; };   // gwPlainOn (sequoia/app.js:211)

  function CKB() { return window.SEQUOIA_CHECKIN || {}; }
  function OPTS() { return CKB().answers || []; }
  function QS() { return CKB().questions || {}; }
  function clone(x) { return JSON.parse(JSON.stringify(x)); }
  function pad(n) { return String(n).padStart(2, '0'); }
  // the local day, as GGTend and GGLife count it (gg-tend.js:98)
  function todayKey() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function toast(ctx, m) { try { if (ctx && typeof ctx.toast === 'function') ctx.toast(m); } catch (e) {} }

  /* ---------- the parts and their words (sequoia/app.js:207 to 219) ---------- */
  function tendKeys() { var G = window.GGParts; return G && G.label && G.TEND ? G.TEND.slice() : ['roots', 'bark', 'leaves', 'branches']; }
  function label(key, plainFn) { var G = window.GGParts; return G && G.label ? G.label(key, { plain: plainFn }) : key.charAt(0).toUpperCase() + key.slice(1); }

  /* ---------- the vault ---------- */
  // Practice names that moved to Title Case (GWG BLD 745), read forward once (sqNamesForward, sequoia/app.js:1746)
  var SQ_RENAMED = { 'Peace With the Past': 'Peace with the Past', 'Read With a Child': 'Read with a Child' };
  function namesForward(d) {
    if (!d || d.nm745) return d;
    var fix = function (x, depth) {
      if (!x || typeof x !== 'object' || depth > 30) return;
      Object.keys(x).forEach(function (k) {
        var v = x[k];
        if (typeof v === 'string') { var i = v.indexOf('|'), n = i >= 0 ? v.slice(i + 1) : v; if (SQ_RENAMED[n]) x[k] = (i >= 0 ? v.slice(0, i + 1) : '') + SQ_RENAMED[n]; }
        else fix(v, depth + 1);
        var j = k.indexOf('|'), kn = j >= 0 ? k.slice(j + 1) : k;
        if (SQ_RENAMED[kn]) { var nk = (j >= 0 ? k.slice(0, j + 1) : '') + SQ_RENAMED[kn]; if (x[nk] == null) x[nk] = x[k]; delete x[k]; }
      });
    };
    fix(d, 0); d.nm745 = 1; return d;
  }
  function rec(id) { return namesForward(GGP.data(id, TREE)); }
  // sqRec (sequoia/app.js:1761): history is a list
  function history(id) { var d = rec(id); if (!Array.isArray(d.history)) d.history = []; return d.history; }
  // sortEntries (sequoia/app.js:1713)
  function sortEntries(list) { list.sort(function (a, b) { return String(a.date).localeCompare(String(b.date)) || String(a.id).localeCompare(String(b.id)); }); return list; }

  /* ---------- tend: the same record and rules as GGTend (shared/gg-tend.js), for this profile ---------- */
  // TEND_CFG.store.get (sequoia/app.js:1683) and TEND_CFG.history (1673): What I See entries never count
  function tendRec(id) { var d = rec(id); if (!d.tend || typeof d.tend !== 'object') d.tend = {}; return d.tend; }
  function tendHistory(id) { return history(id).filter(function (e) { return e && e.kind !== 'observed' && !e.from; }); }
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
  // (Sequoia sgCheckMiles(s, true) and sgMilesNow, sequoia/app.js:1033 to 1052; sgRec 1026). The other milestones come from
  // days tended, never from a check-in, and stay with Today.
  function ringMiles(s) {
    if (!s.sg || typeof s.sg !== 'object') s.sg = { miles: {}, bal: {} }; s.sg.miles = s.sg.miles || {}; s.sg.bal = s.sg.bal || {};
    var R = s.sg;
    s.rings.forEach(function (r, i) { var mid = i ? 'season' + (i + 1) : 'ring'; if (!R.miles[mid]) R.miles[mid] = todayKey(); });
  }
  // setPlan (gg-tend.js:733): library picks and own practices stay when the plan is rebuilt
  function setPlan(id, p) {
    var s = ensure(id), old = s.plan || {}; s.plan = clone(p);
    Object.keys(old).forEach(function (k) { var L = (old[k] || {}).lib, O = (old[k] || {}).own; if (L && L.length) { if (!s.plan[k]) s.plan[k] = { selected: [] }; if (!s.plan[k].lib) s.plan[k].lib = L; } if (O && O.length) { if (!s.plan[k]) s.plan[k] = { selected: [] }; if (!s.plan[k].own) s.plan[k].own = O; } });
  }
  // sqFullKind (sequoia/app.js:570), with a profile open
  function fullKind(id) { var s = ensure(id); return !s.start ? 'start' : weekNo(s) >= 12 ? 'season' : 'full'; }

  /* ---------- the questions (sequoia/app.js:576 to 593) ---------- */
  function gdOpts() { return OPTS().map(function (o) { return { v: o[0], label: o[1] }; }); }
  function isEdge(q, v) { var o = OPTS().filter(function (x) { return x[0] === v; })[0]; if (!o || o[2] === null) return false; return (q.rev ? 3 - o[2] : o[2]) <= 1; }
  // The person's own check-in: the stem is the standard one (stemNow, sequoia/app.js:378), and a {name} in a question
  // reads "them" and "their" (sqSayName, sequoia/app.js:568), as the page does when no one else is named.
  function sayName(t) { return String(t).replace(/\{name\}'s/g, 'their').replace(/\{name\}/g, 'them'); }
  function gdQuestions(quick) {
    var out = [], stem = (CKB().stems || {}).standard || 'In the past two weeks, how often have you...', sayStem = stem, nm = 'them', Q = QS();
    PART_ORDER.forEach(function (k) {
      var list = Q[k] || [];
      (quick ? list.slice(0, 1) : list).forEach(function (q, i) {
        var key = quick ? 'quick_' + k : k, lead = quick ? !out.length : i === 0, said = sayName(q.t);
        out.push({ id: key + '.' + i, key: key, i: i, part: k, stem: stem, text: q.t.replace(/\{name\}/g, nm), say: lead ? sayStem + ' ' + said : said, type: 'choice', options: gdOpts(), rev: !!q.r });
      });
    });
    return out;
  }

  /* ---------- scoring (sequoia/app.js:363, 849 to 852) ---------- */
  function partScore(key, answers) {
    var qs = QS()[key] || [], sum = 0, n = 0, O = OPTS();
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
    // sequoia/app.js:890, the keys in this order. The date is the UTC date, as Sequoia writes it.
    return { id: Date.now().toString(36), date: new Date().toISOString().split('T')[0], std: 1, scores: scores, unsure: unsure, reflections: reflections, growthPlan: {}, type: quick ? 'quick' : 'full', answers: quick ? null : clone(ans), by: 'self', helper: '' };
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

  /* ---------- the practices (sequoia/app.js:45 to 72, 238, 701 to 703) ---------- */
  function SP() { return window.SEQUOIA_PRACTICES || {}; }
  function spGet() { var sp = SP(); for (var i = 0; i < arguments.length; i++) if (sp[arguments[i]] != null) return sp[arguments[i]]; return null; }
  // DOMAIN_DEFS as the page reads them (sequoia/app.js:50): each row a copy, then the NEW rows not already there
  function restoreOf(key) {
    var raw = spGet('DOMAIN_DEFS', 'domainDefs', 'domains', 'parts') || [];
    if (!Array.isArray(raw)) raw = Object.keys(raw).map(function (k) { return Object.assign({ key: k }, raw[k]); });
    var d = raw.filter(function (x) { return x && x.key === key; }).pop() || {};
    var rows = (d.restore || []).map(function (r) { return Array.isArray(r) ? r.slice() : [r.name || r.n, r.text || r.t || '']; }), have = {};
    rows.forEach(function (r) { have[r[0]] = 1; });
    ((spGet('NEW', 'added') || {})[key] || []).forEach(function (r) { var row = Array.isArray(r) ? r : [r.name || r.n, r.text || r.t || '']; if (row[0] && !have[row[0]]) { rows.push(row); have[row[0]] = 1; } });
    return rows;
  }
  function lifeTags(key, name) {
    var k = key + '|' + name, f = (spGet('FLAGS') || {})[k] || {};
    var G = Object.assign({}, spGet('GUIDES', 'guides') || {}, spGet('G') || {}), g = G[k] || {};
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

  // window.gwPlainOn: the guided script's Roots enter line reads this global (shared/guided/sequoia.js:124).
  // Sequoia's own page defines it as false: Roots always reads Faith here.
  function usePlain(on) { var was = window.gwPlainOn; window.gwPlainOn = function () { return !!on; }; return function () { window.gwPlainOn = was; }; }

  /* ---------- the Growth Plan step (sqGuidedPlan, sequoia/app.js:654) ---------- */
  function planRun(ctx, H, sc, un, entry) {
    var id = ctx.id, plainFn = NEVER_PLAIN;
    var s = ensure(id), prior = s.plan || (entry && entry.growthPlan) || null;   // oakPrefillPlan (sequoia/app.js:1532)
    var TK = tendKeys(), ROWS = {}, ON = {}, CUSTOM = {};
    PART_ORDER.forEach(function (k) {
      if (TK.indexOf(k) < 0) return;   // Trunk and Fruit grow from the tending: no boxes, no own practice line
      ROWS[k] = lifeOrder(k, restoreOf(k));
      var p = (prior || {})[k] || {}, chosen = p.selected || [];
      ON[k] = ROWS[k].filter(function (r) { return chosen.indexOf(r[0]) >= 0; }).map(function (r) { return r[0]; });
      CUSTOM[k] = prior ? String(p.custom || '').trim() : '';
    });
    // collectGrowthPlan (sequoia/app.js:1703): the boxes in list order (chosen first, each in its list place)
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
    var undo = usePlain(false);
    var o = {
      tree: TREE, kind: 'plan', voice: 'brian', title: TITLE.plan, questions: steps, plan: plan0, quiet: false,
      onPlan: function (part, names) { pick(part, names); },
      onDone: function (r) {
        Object.keys(r.plan || {}).forEach(function (p) { pick(p, r.plan[p]); });
        // oakSavePlan (sequoia/app.js:1549)
        var plan = collect();
        var n = PART_ORDER.reduce(function (t, k) { return t + plan[k].selected.length + (plan[k].custom ? 1 : 0); }, 0);
        if (!n) { toast(ctx, 'Choose at least one practice first.'); return; }
        setPlan(id, plan);
        if (entry) {   // savePersonalFile (sequoia/app.js:2096): the plan lands in the check-in's own record too
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

  /* ---------- the check-in (sqGuided, sequoia/app.js:594) ---------- */
  function run(ctx) {
    ctx = ctx || {};
    var id = ctx.id, quick = ctx.kind === 'quick';
    if (!id || !window.GGP || !window.GGGuided || !window.SEQUOIA_CHECKIN) return null;
    history(id);   // the page reads the record's history when the profile opens, before tend (profSync)
    var kind = quick ? 'quick' : fullKind(id);
    if (quick) ensure(id);   // the page's Today screen has filled the tend record before any check-in starts
    var sig = [id, kind, 'self', '', quick ? 'q' : 'f'].join('|');
    var ans = LEFT && LEFT.sig === sig ? LEFT.ans : {};
    LEFT = { sig: sig, ans: ans };
    var qs = gdQuestions(quick), byId = {}, H = handle(), saved = null;
    qs.forEach(function (q) { byId[q.id] = q; });
    var have = {}; qs.forEach(function (q) { var v = (ans[q.key] || {})[q.i]; if (v) have[q.id] = v; });
    function answerQ(key, i, v) { ans[key] = ans[key] || {}; ans[key][i] = v; }   // sqGdSet (sequoia/app.js:593)
    var undo = usePlain(false);
    var o = {
      tree: TREE, kind: kind, voice: 'brian',
      title: TITLE[kind] || 'Check-in',
      questions: qs, answers: have, quiet: (CKB().help || {}).quiet || undefined, isEdge: isEdge,
      onAnswer: function (qid, v) { var q = byId[qid]; if (q) answerQ(q.key, q.i, v); },
      onDone: function (r) {
        Object.keys(r.answers || {}).forEach(function (qid) { var q = byId[qid]; if (q && r.answers[qid]) answerQ(q.key, q.i, r.answers[qid]); });
        LEFT = null;   // a finished check-in: the next one starts fresh (sequoia/app.js:846)
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

  // calculateResults (sequoia/app.js:890 to 902) for a check-in by the person themselves
  function save(ctx, ans, quick) {
    var id = ctx.id, entry = makeEntry(ans, quick), list = history(id);
    list.push(clone(entry)); sortEntries(list);
    rec(id).history = clone(list);   // profPersist (sequoia/app.js:1782)
    var msg = quick ? null : onFullCheckin(id, entry);
    if (!quick) lifeOffer(ctx);
    GGP.save(id).then(function () {
      if (typeof ctx.onSaved === 'function') { try { ctx.onSaved(clone(entry)); } catch (e) {} }
      if (msg) setTimeout(function () { toast(ctx, msg); }, 900);
    });
    return entry;
  }

  // The Growth Plan on its own: the latest check-in's scores (oakPlanOpen and oakLatestEntry, sequoia/app.js:1523, 1541)
  function planOnly(ctx) {
    ctx = ctx || {};
    if (!ctx.id || !window.GGP || !window.GGGuided) return null;
    var list = history(ctx.id).filter(function (e) { return e && e.scores && e.kind !== 'observed'; }), full = list.filter(function (e) { return e.type !== 'quick'; });
    var e = full[full.length - 1] || list[list.length - 1] || null;
    if (!e) return null;
    return planRun(ctx, handle(), e.scores, e.unsure || [], null);
  }

  window.GGCheckin = window.GGCheckin || {};
  window.GGCheckin[TREE] = { files: FILES, kinds: ['full', 'quick'], run: run, plan: planOnly };
})();
