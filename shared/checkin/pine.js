/* =====================================================================
   GROW WITH GROUNDED . PINE CHECK-IN MODULE (shared/checkin/pine.js), GWG BLD 912 Round 1
   (c) 2026 Grow With Grounded LLC.
   Home (/home/home.js) runs Pine's guided check-in itself, in its own window, with this module:
   no iframe, no tree page, nothing read from the tree page's DOM or globals. It does exactly what
   /pine/app.js does for a guided full check-in and a Quick Check-in, then the guided Growth Plan,
   and saves the same record in the same place.
   Contract: patches/bld912/CONTRACT.md (grounded-workshop). Line numbers below are /pine/app.js
   as of BLD 911 unless another file is named.

     GGCheckin.pine = { files, kinds: ['full', 'quick'], run(ctx) }
     ctx.id       the open GGP profile id          ctx.kind  'full' | 'quick'
     ctx.plain    Plain wording on (Home's plainWording(id, 'pine'))
     ctx.member   passed along, unused (nothing in a check-in is locked)
     ctx.onSaved(entry, info)  after each save resolves. info.stage is 'grade' (entry is null;
                  info.grade is the grade just kept), 'checkin' (the record is in history; info.msg
                  is the season toast, or null; info.lifeCard is the Health and Ability offer card,
                  or null, for Home to show), or 'plan' (the growth plan is in tend.plan and in the
                  entry; info.msg is the plan toast)
     ctx.onClose()  once, when the last screen closes (after the plan, Maybe later, or closed early)
     Optional: ctx.plan (false: stop after the check-in, no Growth Plan step), ctx.toast(msg) (the tree's
               toasts, at the tree's own moments), ctx.mode ('self' default, or 'trust'), ctx.lifeHost (an element for the offer card),
               ctx.onLifeChoose() (Choose Now on the offer card; else GGLife's own dialog)
   plan(ctx) runs the Growth Plan on its own from the latest check-in (same ctx; onSaved(null, {stage: 'plan'});
   with no check-in yet it shows the tree's toast through ctx.toast and returns null, opening nothing).
   run() returns a handle {el, close(quiet), state(), stage()} that follows what is on screen
   (the grade step, the check-in, then the Growth Plan).

   The grade step (askGrade 584, setGrade 596): when pine.grade is not saved yet, the first screen asks
   "Which grade are you in?" once, saves pine.grade as '9' to '12', and the check-in begins in that
   grade's band (9 to 10 or 11 to 12). Maybe later starts nothing, as on the tree page.
   Ported here (each from the line named): the question steps (gdQuestions 637), answers (gdSet 655),
   the Growing Edge test (gdEdge 661), Health and Ability notes (lifeNote 269), scoring and the record
   (calculateResults 896), sortEntries, the tend record (TEND_CFG.store 1590) with GGTend's ensure,
   onFullCheckin, and setPlan (shared/gg-tend.js 112, 741, 733), the Growth Plan steps (gdPlanRun 691),
   and the plan save (gdPlanSave 708, oakPrefillPlan 1429, oakSavePlan 1449, savePersonalFile 1982,
   collectGrowthPlan 795). gg-tend.js is not loaded: it is one shared engine for a whole tree page
   (GGTend.init takes the page's config, and render draws Today, Week, and Season into the page), so
   the few pieces a check-in touches are ported line for line instead.
   Loaded as they are: the bank (pine/checkin.js), the practices (pine/practices.js, then pine/life.js,
   which adds to them), the player (shared/gg-guided.js) and its script (shared/guided/pine.js), the
   rhythm (shared/practice-rhythm.js), Health and Ability (shared/gg-life.js), and the part labels
   (shared/gg-parts.js).
   Left out (the tree page keeps them): Read It All and the classic form, the "Sit with this" notes
   (a guided run saves them empty, as the tree does), the results screen, and changing the grade
   (Settings). Pine has no check-in taken together.
   No question asks about harm; the quiet line shows as type under the player, never spoken (GWG BLD 887).
   ===================================================================== */
(function () {
  'use strict';
  window.GGCheckin = window.GGCheckin || {};
  if (window.GGCheckin.pine) return;
  var TREE = 'pine';
  var FILES = [
    '/shared/gg-parts.js?v=b929',
    '/pine/checkin.js?v=b907',
    '/pine/practices.js?v=b949',
    '/shared/gg-life.js?v=b907',
    '/pine/life.js?v=b907',
    '/shared/practice-rhythm.js?v=b929',
    '/shared/gg-guided.js?v=c030',
    '/shared/guided/pine.js?v=b949'
  ];
  var PART_ORDER = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];   // 181
  var TEND_FALLBACK = ['roots', 'bark', 'leaves', 'branches'];
  var GD_TITLE = { start: 'Your First Check-in', full: 'Your Check-in', quick: 'Quick Check-in' };   // 631
  var GD_SENS = 'You turned this question on. It never counts toward a score, and it is never shared.';   // 632
  var OAK_ROT_N = 6;   // 766
  var PLAN_TOAST = 'Saved. Your practices are in Today.';   // 1457
  var GRADES = [['9', 'Grade 9'], ['10', 'Grade 10'], ['11', 'Grade 11'], ['12', 'Grade 12']];   // 586

  function deep(x) { return JSON.parse(JSON.stringify(x)); }
  function arr(x) { return Array.isArray(x) ? x : []; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  // 119
  function todayKey() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function sortEntries(list) { list.sort(function (a, b) { return String(a.date).localeCompare(String(b.date)) || String(a.id).localeCompare(String(b.id)); }); return list; }
  function tendKeys() { return window.GGParts && GGParts.TEND ? GGParts.TEND.slice() : TEND_FALLBACK.slice(); }

  /* ---------- the practice library, as the app builds it (54 to 89) ---------- */
  function practices() {
    var SP = window.PINE_PRACTICES || {};
    var spGet = function () { for (var i = 0; i < arguments.length; i++) if (SP[arguments[i]] != null) return SP[arguments[i]]; return null; };
    var raw = spGet('DOMAIN_DEFS', 'domainDefs', 'domains', 'parts') || [];
    if (!Array.isArray(raw)) raw = Object.keys(raw).map(function (k) { return Object.assign({ key: k }, raw[k]); });
    var by = {}; raw.forEach(function (d) { if (d && d.key) by[d.key] = d; });
    var NEW = spGet('NEW', 'added') || {}, restore = {};
    PART_ORDER.forEach(function (k) {
      var rows = ((by[k] || {}).restore || []).map(function (r) { return Array.isArray(r) ? r.slice() : [r.name || r.n, r.text || r.t || '']; });
      var have = {}; rows.forEach(function (r) { have[r[0]] = 1; });
      (NEW[k] || []).forEach(function (r) { var row = Array.isArray(r) ? r : [r.name || r.n, r.text || r.t || '']; if (row[0] && !have[row[0]]) { rows.push(row); have[row[0]] = 1; } });
      restore[k] = rows;
    });
    return { restore: restore, GUIDES: Object.assign({}, spGet('GUIDES', 'guides') || {}, spGet('G') || {}), PLAIN_P: spGet('PLAIN', 'plain') || {}, FLAGS_P: spGet('FLAGS') || {} };
  }

  /* ---------- the tend record and GGTend's pieces a check-in uses ---------- */
  // TEND_CFG.store.get (1590): the record lives at GGP.data(id, 'pine').tend.
  function tendRec(d) { if (!d.tend || typeof d.tend !== 'object') d.tend = {}; return d.tend; }
  // TEND_CFG.history: the teen's own entries, never the ones carried in.
  function ownHistory(d) { return arr(d.history).filter(function (e) { return e && !e.from; }); }
  // shared/gg-tend.js countPlan (130)
  function countPlan(p) { var n = 0; Object.keys(p || {}).forEach(function (k) { var x = p[k] || {}; n += (x.selected || []).length + (x.custom ? 1 : 0) + (x.own || []).length + (x.lib || []).length; }); return n; }
  // shared/gg-tend.js ensure (112), blank (111)
  function ensure(d) {
    var s = tendRec(d), b = { v: 1, start: null, season: 1, rings: [], plan: null, level: null, days: {}, weeks: {} };
    Object.keys(b).forEach(function (k) { if (s[k] === undefined) s[k] = b[k]; });
    if (!s.start || !s.plan) {
      var hist = ownHistory(d), full = hist.filter(function (e) { return e && e.type !== 'quick' && e.date; }), last = full[full.length - 1];
      if (!s.start && last) s.start = last.date;
      if (!s.plan) { var withPlan = hist.filter(function (e) { return e && e.growthPlan && countPlan(e.growthPlan); }), lp = withPlan[withPlan.length - 1]; if (lp) s.plan = deep(lp.growthPlan); }
    }
    return s;
  }
  // shared/gg-tend.js parse, between, weekNo (101, 103, 177)
  function parse(s) { var p = String(s).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function between(a, b) { return Math.round((parse(b) - parse(a)) / 86400000); }
  function weekNo(s) { if (!s.start) return 0; return Math.floor(Math.max(0, between(s.start, todayKey())) / 7) + 1; }
  // shared/gg-tend.js onFullCheckin (741): season 1 begins, or a ring at week 12 or later and the next season.
  function onFullCheckin(d, entry, saves, id) {
    var s = ensure(d), dt = (entry && entry.date) || todayKey(), msg = null;
    if (!s.start) { s.start = dt; s.season = 1; msg = 'Your first season has begun. Week 1 starts today.'; }
    else if (weekNo(s) >= 12) { s.rings = (s.rings || []).concat([{ date: dt, season: s.season || 1 }]); s.season = (s.season || 1) + 1; s.start = dt; msg = 'A new ring for your tree. Season ' + s.season + ' begins today.'; }
    saves.push(GGP.save(id));
    return msg;
  }
  // shared/gg-tend.js setPlan (733): a deep copy, keeping library picks and own practices from the old plan.
  function setPlan(d, p, saves, id) {
    var s = ensure(d), old = s.plan || {}; s.plan = deep(p);
    Object.keys(old).forEach(function (k) { var L = (old[k] || {}).lib, O = (old[k] || {}).own; if (L && L.length) { if (!s.plan[k]) s.plan[k] = { selected: [] }; if (!s.plan[k].lib) s.plan[k].lib = L; } if (O && O.length) { if (!s.plan[k]) s.plan[k] = { selected: [] }; if (!s.plan[k].own) s.plan[k].own = O; } });
    saves.push(GGP.save(id));
  }

  /* ---------- the grade step: the first screen, in the player's own look (askGrade 584) ---------- */
  function ensureCss() {
    var has = function (re) { return Array.prototype.some.call(document.querySelectorAll('link[rel="stylesheet"]'), function (l) { return re.test(l.getAttribute('href') || ''); }); };
    if (!has(/gg-guided\.css/)) { var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = '/shared/gg-guided.css?v=b934'; document.head.appendChild(l); }
    if (!has(/fonts\/fonts\.css/)) { var f = document.createElement('link'); f.rel = 'stylesheet'; f.href = '/fonts/fonts.css?v=b788'; document.head.appendChild(f); }
  }
  function gradeScreen(o) {
    ensureCss();
    var CKB = window.PINE_CHECKIN || {}, G = CKB.grades || GRADES, prev = document.activeElement, closed = false;
    var insheet = document.documentElement.classList.contains('gg-insheet');
    var el = document.createElement('div');
    el.className = 'ggd ggd-t-pine' + (insheet ? ' ggd-insheet' : '');
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-labelledby', 'ggd-h');
    el.style.setProperty('--ggd-hero-w', 'url("/shared/heroes/pine-wide.webp")'); el.style.setProperty('--ggd-hero-p', 'url("/shared/heroes/pine-phone.webp")');
    el.innerHTML = '<div class="ggd-bg" aria-hidden="true"></div>'
      + '<header class="ggd-top"><div class="ggd-ttl"><b>' + esc(o.title) + '</b><span class="ggd-prog"></span></div>'
      + '<div class="ggd-ctl"><button type="button" class="ggd-tb ggd-done" data-x="later">Done</button></div><div class="ggd-bar" aria-hidden="true"><i></i></div></header>'
      + '<main class="ggd-stage"><section class="ggd-card ggd-go"><div class="ggd-eb">Before We Begin</div>'
      + '<h2 id="ggd-h" tabindex="-1">Which grade are you in?</h2>'
      + '<p class="ggd-help">Pine asks a few questions differently for grades 9 and 10 and for grades 11 and 12. You only need to answer this once. You can change it in Settings.</p>'
      + '<div class="ggd-ans">' + G.map(function (g, j) { return '<button type="button" class="ggd-opt ggd-a" data-grade="' + esc(g[0]) + '" aria-pressed="false"><span class="ggd-k" aria-hidden="true">' + (j + 1) + '</span><span class="ggd-ot">' + esc(g[1]) + '</span></button>'; }).join('') + '</div>'
      + '</section></main>'
      + '<footer class="ggd-foot"><button type="button" class="ggd-btn" data-x="later">Maybe later</button><span class="ggd-sp"></span></footer>'
      + '<p class="ggd-quiet">' + esc(o.quiet || 'If you ever feel like hurting yourself, call or text 988. In danger now, call 911.') + '</p>';
    document.body.appendChild(el);
    document.documentElement.classList.add('ggd-open');
    function close(quiet, picked) {
      if (closed) return; closed = true;
      document.removeEventListener('keydown', onKey, true);
      el.remove(); document.documentElement.classList.remove('ggd-open');
      try { if (prev && prev.focus && prev.isConnected) prev.focus(); } catch (e) {}
      if (picked) o.onPick(picked); else if (!quiet) o.onLater();
    }
    function onKey(e) {
      if (closed) return;
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(false); return; }   // Escape closes, just like Maybe later (594)
      if (/^[1-9]$/.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey) { var b = el.querySelectorAll('[data-grade]')[+e.key - 1]; if (b) { e.preventDefault(); b.click(); } }
    }
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-grade],[data-x]'); if (!b || !el.contains(b)) return;
      if (b.hasAttribute('data-x')) { close(false); return; }
      el.querySelectorAll('[data-grade]').forEach(function (y) { y.setAttribute('aria-pressed', y === b); });
      close(false, b.getAttribute('data-grade'));
    });
    document.addEventListener('keydown', onKey, true);
    var h = el.querySelector('h2'); try { h.focus({ preventScroll: true }); } catch (e) { h.focus(); }
    return { el: el, close: function (quiet) { close(quiet); }, state: function () { return { screen: { k: 'grade' } }; } };
  }

  /* ---------- run ---------- */
  function run(ctx, only) {
    ctx = ctx || {};
    var id = ctx.id, quick = ctx.kind === 'quick';
    var CKB = window.PINE_CHECKIN || {};
    // rec() (352): the teen's own Pine record, with a history list.
    var d = GGP.data(id, TREE); if (!Array.isArray(d.history)) d.history = [];
    // Faith or Plain (isPlain 353): Home's choice for this profile, else the record's own wording.
    var plain = typeof ctx.plain === 'boolean' ? ctx.plain : d.wording === 'plain';
    var wording = plain ? 'plain' : 'faith';
    var plainFn = function () { return plain; };
    var mode = ctx.mode === 'trust' ? 'trust' : 'self';   // CK_MODE (388); a guided run on the tree starts On My Own
    var Q_OPTS = CKB.answers || [['rarely', 'Rarely', 0], ['sometimes', 'Sometimes', 1], ['often', 'Often', 2], ['always', 'Almost always', 3], ['unsure', 'Not sure', null]];   // 371
    var ST_STD = CKB.version || 1;   // 370
    var Q_STEM = (CKB.stems || {}).standard || 'In the past two weeks, how often have you...';   // 383
    var gradeNow = function () { var g = d.grade; return g ? String(g) : null; };   // 354
    var bandNow = function () { var g = gradeNow(); return CKB.bandOf ? CKB.bandOf(g || '9') : (g === '11' || g === '12' ? '11-12' : '9-10'); };   // 355
    var sensList = function () { return typeof CKB.sensitiveList === 'function' ? CKB.sensitiveList() : (CKB.SENSITIVE || CKB.sensitive || []); };   // 379
    var CK_SENS = !quick && !!d.askSens;   // gdBegin 662, sensOn 357
    var QUESTIONS = {}, CK_BAND = '9-10', ST_ANS = {}, ST_SENS = {};
    // bankFor and loadBank (374, 381): the grade band, the wording, and each question's place for its notes.
    function loadBank() {
      var band = bandNow();
      if (typeof CKB.getBank === 'function') QUESTIONS = CKB.getBank(band, wording);
      else { QUESTIONS = {}; Object.keys(CKB.questions || {}).forEach(function (k) { QUESTIONS[k] = (CKB.questions[k] || []).map(function (q) { return Object.assign({}, q, (q.v || {})[band] || {}, wording === 'plain' ? (q.plain || {}) : {}); }); }); }
      Object.keys(QUESTIONS).forEach(function (k) { (QUESTIONS[k] || []).forEach(function (q, i) { if (q && typeof q === 'object') { q._k = k; q._i = i; } }); });
    }
    var quickQ = function (key) { return ((QUESTIONS[key] || [])[0] || {}).t || ''; };   // 384
    function stQ(key, i) {   // 399
      if (QUESTIONS[key]) return QUESTIONS[key][i] || null;
      if (key.indexOf('quick_') === 0 && QUESTIONS[key.slice(6)]) return QUESTIONS[key.slice(6)][0];
      if (key.indexOf('sens_') === 0) return sensList().find(function (x) { return x.id === key.slice(5); }) || null;
      return null;
    }
    // Health and Ability (262 to 275): lifeOn, lifeIds, lifeNote, from pine/life.js (PINE_LIFE).
    var lifeOn = function () { return !!window.GGLife; };
    var lifeIds = function () { return lifeOn() ? GGLife.chosen(TREE) : []; };
    var lifeUniq = function (a) { return a.filter(function (x, i) { return x && a.indexOf(x) === i; }); };
    function lifeNote(q) {
      var PL = window.PINE_LIFE || { notes: [], steps: {} }, out = { ex: [], tip: [] }; if (!q || q.flag || q._k == null) return out;
      var ids = lifeIds(); if (!ids.length) return out;
      (PL.notes || []).forEach(function (n) { if (n.part !== q._k || n.i !== q._i) return; ids.forEach(function (x) { var y = (n.n || {})[x]; if (y) { if (y.ex) out.ex.push(y.ex); if (y.tip) out.tip.push(y.tip); } }); });
      out.ex = lifeUniq(out.ex); out.tip = lifeUniq(out.tip); return out;
    }
    // partScore (390)
    function partScore(key, answers) {
      var qs = QUESTIONS[key] || [], sum = 0, n = 0;
      qs.forEach(function (q, i) {
        var a = answers[i]; if (a == null) return;
        var opt = Q_OPTS.find(function (o) { return o[0] === a; }); if (!opt || opt[2] === null) return;
        sum += q.r ? 3 - opt[2] : opt[2]; n++;
      });
      return n ? Math.max(1, Math.min(10, Math.round(1 + 9 * (sum / n) / 3))) : null;
    }
    // buildScreens (476): the question screens only, in order.
    function screens() {
      var out = [], sens = CK_SENS ? sensList() : [];
      PART_ORDER.forEach(function (k) {
        if (quick) { out.push({ key: 'quick_' + k, part: k, i: 0 }); return; }
        var n = (QUESTIONS[k] || []).length;
        for (var i = 0; i < n; i++) out.push({ key: k, part: k, i: i });
        sens.filter(function (x) { return x.part === k; }).forEach(function (x) { out.push({ key: 'sens_' + x.id, part: k, i: 0, sens: true }); });
      });
      return out;
    }
    // gdQuestions (637)
    function gdQuestions() {
      var opts = Q_OPTS.map(function (o) { return { v: o[0], label: o[1] }; }), out = [];
      screens().forEach(function (sc) {
        var q = stQ(sc.key, sc.i) || {}, text = sc.key.indexOf('quick_') === 0 ? quickQ(sc.part) : q.t || '';
        if (!text) return;
        var first = !out.length || (!quick && !sc.sens && out[out.length - 1].part !== sc.part);
        var ln = lifeNote(q), help = [sc.sens ? GD_SENS : Q_STEM];
        if (ln.ex.length) help.push(ln.ex.join(' '));
        var tip = [q.tip || ''].concat(ln.tip).filter(Boolean).join(' ');
        if (mode === 'trust' && tip) help.push('To talk about together: ' + tip);
        out.push({ id: sc.key + '-' + sc.i, part: sc.part, text: text, say: first && !sc.sens ? Q_STEM + ' ' + text : text, help: help.join(' '),
          type: 'choice', options: opts, rv: !!q.r, sens: !!sc.sens, tags: sc.sens ? ['sens'] : [] });
      });
      return out;
    }
    // gdSet (655)
    function gdSet(qid, v) {
      var at = qid.lastIndexOf('-'), key = qid.slice(0, at), i = +qid.slice(at + 1);
      if (key.indexOf('sens_') === 0) ST_SENS[key.slice(5)] = v;
      else { ST_ANS[key] = ST_ANS[key] || {}; ST_ANS[key][i] = v; }
    }
    // gdEdge (661): a Growing Edge answer is worth 0 points.
    function gdEdge(q, v) { var o = Q_OPTS.find(function (x) { return x[0] === v; }); return !!o && o[2] !== null && (q.rv ? 3 - o[2] : o[2]) === 0; }
    // gdKind (634)
    var kind = quick ? 'quick' : d.history.some(function (e) { return e && !e.from && e.type !== 'quick' && e.scores; }) ? 'full' : 'start';

    /* the handle, the Roots words, and closing once */
    var cur = null, stage = 'checkin', ended = false, hadPlain = Object.prototype.hasOwnProperty.call(window, 'gwPlainOn'), oldPlain = window.gwPlainOn;
    // shared/guided/pine.js reads a global gwPlainOn for the Roots enter line (on the tree page it is the app's own, 197).
    window.gwPlainOn = plainFn;
    function end() {
      if (ended) return; ended = true; cur = null;
      try { if (hadPlain) window.gwPlainOn = oldPlain; else delete window.gwPlainOn; } catch (e) { window.gwPlainOn = oldPlain; }
      if (typeof ctx.onClose === 'function') { try { ctx.onClose(); } catch (e) {} }
    }
    var handle = {
      get el() { return cur ? cur.el : null; },
      close: function (q) { if (cur) cur.close(q); else end(); },
      state: function () { return cur ? cur.state() : null; },
      stage: function () { return stage; }
    };
    // The tree's toasts (season 900 ms after, the plan 700 ms after), through Home's ctx.toast when it gives one.
    function toast(m, ms) { if (m && typeof ctx.toast === 'function') setTimeout(function () { try { ctx.toast(m); } catch (e) {} }, ms || 0); }

    /* the record (calculateResults 896), the season, the offer card */
    var saved = null;   // {entry, scores, unsure, prefill}
    function save() {
      var scores = {}, reflections = {}, unsure = [];
      PART_ORDER.forEach(function (k) {
        var sc;
        if (quick) { var o = Q_OPTS.find(function (x) { return x[0] === (ST_ANS['quick_' + k] || {})[0]; }); sc = o && o[2] !== null ? Math.round(1 + 9 * o[2] / 3) : null; }
        else sc = partScore(k, ST_ANS[k] || {});
        if (sc == null) { unsure.push(k); sc = 5; }   // drawn as a middle shade, shown as Not sure yet
        scores[k] = sc;
        reflections[k] = '';   // a guided run leaves the Sit with this boxes empty
      });
      var sens = {}; if (CK_SENS) sensList().forEach(function (x) { if (ST_SENS[x.id]) sens[x.id] = ST_SENS[x.id]; });
      var entry = { id: Date.now().toString(36), date: todayKey(), std: ST_STD, bank: CKB.bank || 1, band: CK_BAND, grade: gradeNow(), wording: wording,
        scores: scores, unsure: unsure, reflections: reflections, sens: sens, mode: mode, growthPlan: {}, type: quick ? 'quick' : 'full', answers: quick ? null : deep(ST_ANS) };
      // On the tree page the tend record is already filled in when the page opens (GGTend.render), before this entry is added.
      ensure(d);
      var saves = [], msg = null, card = null;
      d.history.push(deep(entry)); sortEntries(d.history); saves.push(GGP.save(id));   // 932, profPersist
      if (!quick) msg = onFullCheckin(d, entry, saves, id);                              // 934
      // Health and Ability (937): one quiet card after the first full check-in, at most once (vault.lifeOffer.pine).
      if (!quick && lifeOn() && ownHistory(d).filter(function (e) { return e.type !== 'quick'; }).length === 1) {
        var host = (typeof ctx.lifeHost === 'function' ? ctx.lifeHost() : ctx.lifeHost) || document.createElement('div');
        card = GGLife.offerCard(host, TREE, typeof ctx.onLifeChoose === 'function' ? { onChoose: ctx.onLifeChoose } : {});
        if (card) saves.push(GGP.save(id));
      }
      // oakPrefillPlan (1429): the builder starts from the saved plan, else this entry's own (empty) plan.
      var prefill = ensure(d).plan || entry.growthPlan || {};
      saved = { entry: entry, scores: scores, unsure: unsure, prefill: prefill };
      return Promise.all(saves).then(function () {
        if (typeof ctx.onSaved === 'function') { try { ctx.onSaved(entry, { stage: 'checkin', msg: msg, lifeCard: card || null }); } catch (e) {} }
        toast(msg, 900);
      });
    }

    /* the guided Growth Plan (gdPlanRun 691) */
    function rhythm(then) {   // gdRhythm 674
      if (window.GG_RHYTHM) { then(); return; }
      var done = false, go = function () { if (!done) { done = true; then(); } };
      var s = document.createElement('script'); s.src = '/shared/practice-rhythm.js?v=b929'; s.onload = go; s.onerror = go; document.head.appendChild(s);
    }
    function planRun() {
      if (ended) return;
      var L = practices();
      var plainOf = function (key, name) { if (!plain) return null; var k = key + '|' + name, g = L.GUIDES[k] || {}; return L.PLAIN_P[k] || g.plain || null; };   // 81
      var shownName = function (key, name) { var p = plainOf(key, name); return (p && (p.n || p.name)) || name; };   // 86
      var lifeTags = function (key, name) { var f = L.FLAGS_P[key + '|' + name] || {}, g = L.GUIDES[key + '|' + name] || {}; return { life: f.life || [], adapt: f.adapt || g.adapt || '', sober: f.sober || [] }; };   // 264
      var rowsOf = function (k) { var rows = L.restore[k] || []; return lifeOn() ? GGLife.order(rows, function (r) { return lifeTags(k, r[0]); }) : rows; };   // 696, the builder's order 742
      var scores = saved.scores, unsure = saved.unsure, savedPlan = ensure(d).plan || {};
      var R = (window.GG_RHYTHM || {})[TREE] || {}, back = {}, start = {};
      var lvl = function (k) { return unsure.indexOf(k) >= 0 ? 5.5 : (+scores[k] || 5); };
      var TK = tendKeys(), tendOrder = PART_ORDER.filter(function (k) { return TK.indexOf(k) >= 0; });   // TEND_DOMAINS 205
      var steps = tendOrder.slice().sort(function (a, b) { return lvl(a) - lvl(b); }).map(function (k) {
        var rows = rowsOf(k);
        var had = ((savedPlan[k] || {}).selected || []).filter(function (n) { return rows.some(function (r) { return r[0] === n; }); });
        var pick = rows.filter(function (r) { return had.indexOf(r[0]) >= 0; }).concat(rows.filter(function (r) { return had.indexOf(r[0]) < 0; }).slice(0, OAK_ROT_N));
        back[k] = {}; start[k] = had.map(function (n) { return shownName(k, n); });
        return { type: 'plan', part: k, max: Math.max(3, had.length), choices: pick.map(function (r) {
          var nm = shownName(k, r[0]), x = R[k + '|' + r[0]] || {}; back[k][nm] = r[0];
          return { name: nm, how: x.how, r: x.r || 'd', x: x.x, min: x.min };
        }) };
      });
      stage = 'plan';
      cur = GGGuided.run({ plain: plainFn, tree: TREE, kind: 'plan', title: 'Your Growth Plan', voice: 'jenny', questions: steps, plan: start, quiet: CKB.quiet || undefined,
        onDone: function (res) { planSave(res.plan || {}, back, rowsOf); },
        onClose: function () { end(); } });
    }
    // gdPlanSave (708), collectGrowthPlan (795), oakSavePlan (1449), savePersonalFile (1982)
    function planSave(plan, back, rowsOf) {
      var pre = saved.prefill || {}, TK = tendKeys(), p = {};
      PART_ORDER.forEach(function (k) {
        if (TK.indexOf(k) < 0) { p[k] = { selected: [], custom: '' }; return; }   // Trunk and Fruit: no practices, no own line
        var names = Object.prototype.hasOwnProperty.call(plan, k) ? (plan[k] || []).map(function (n) { return (back[k] || {})[n] || n; }) : ((pre[k] || {}).selected || []);
        p[k] = { selected: rowsOf(k).filter(function (r) { return names.indexOf(r[0]) >= 0; }).map(function (r) { return r[0]; }), custom: String((pre[k] || {}).custom || '').trim() };
      });
      var n = PART_ORDER.reduce(function (t, k) { return t + p[k].selected.length + (p[k].custom ? 1 : 0); }, 0);
      if (!n) return;   // the tree shows "Choose at least one practice first." and saves nothing
      var saves = [];
      setPlan(d, p, saves, id);
      // savePersonalFile runs only when a check-in finished in this same visit (currentClientEntry); the Growth Plan
      // on its own keeps the latest entry as it is and saves the plan in tend.plan alone.
      var entry = saved.entry;
      if (entry) {
        entry.growthPlan = deep(p);
        var copy = deep(entry), at = d.history.findIndex(function (e) { return e && e.id === copy.id; });
        if (at >= 0) d.history[at] = copy; else d.history.push(copy);
        sortEntries(d.history); saves.push(GGP.save(id));
      }
      Promise.all(saves).then(function () { if (typeof ctx.onSaved === 'function') { try { ctx.onSaved(entry, { stage: 'plan', msg: PLAN_TOAST }); } catch (e) {} } toast(PLAN_TOAST, 700); });
    }

    /* the Growth Plan on its own (Home's Grow; on the tree page #plan, then the guided plan): oakPlanOpen 1442, oakLatestEntry, startGuidedPlan 679 */
    if (only === 'plan') {
      // oakLatestEntry: the latest own full check-in, else the latest of any kind.
      var list = d.history.filter(function (e) { return e && e.scores && !e.from; }), full = list.filter(function (e) { return e.type !== 'quick'; });
      var last = full[full.length - 1] || list[list.length - 1] || null;
      if (!last) {   // no check-in yet: the tree shows this and opens nothing
        toast('Take a check-in first, and your Growth Plan grows from it.');
        try { if (hadPlain) window.gwPlainOn = oldPlain; else delete window.gwPlainOn; } catch (e) { window.gwPlainOn = oldPlain; }
        ended = true;
        return null;
      }
      // oakPrefillPlan: the saved plan (GGTend.plan(), filled in on page open), else nothing chosen.
      saved = { entry: null, scores: last.scores, unsure: last.unsure || [], prefill: ensure(d).plan || {} };
      stage = 'plan';
      rhythm(planRun);
      return handle;
    }
    /* the check-in (gdBegin 660) */
    var finished = false;
    function begin() {
      loadBank(); CK_BAND = bandNow(); ST_ANS = {}; ST_SENS = {};
      stage = 'checkin';
      cur = GGGuided.run({ plain: plainFn, tree: TREE, kind: kind, title: GD_TITLE[kind], voice: 'jenny', questions: gdQuestions(), quiet: CKB.quiet || undefined,
        isEdge: gdEdge, onAnswer: gdSet,
        onDone: function () { finished = true; cur = null; save().then(function () { if (ctx.plan === false) end(); else rhythm(planRun); }, function () { end(); }); },
        onClose: function () { if (!finished) end(); } });
    }
    if (!gradeNow()) {
      // startCheckin and startQuick (617, 618) ask the grade first, once.
      stage = 'grade';
      cur = gradeScreen({ title: GD_TITLE[kind], quiet: CKB.quiet,
        onLater: function () { end(); },
        onPick: function (g) {
          d.grade = g;   // setGrade (596): '9' to '12', kept on the record
          GGP.save(id).then(function () {
            if (typeof ctx.onSaved === 'function') { try { ctx.onSaved(null, { stage: 'grade', grade: g, msg: 'Grade ' + g + ' saved.' }); } catch (e) {} }
            toast('Grade ' + g + ' saved.');
            begin();
          }, function () { end(); });
        } });
      return handle;
    }
    begin();
    return handle;
  }

  window.GGCheckin.pine = { files: FILES, kinds: ['full', 'quick'], run: function (ctx) { return run(ctx); }, plan: function (ctx) { return run(ctx, 'plan'); } };
})();
