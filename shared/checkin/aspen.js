/* =====================================================================
   GROW WITH GROUNDED . ASPEN CHECK-IN IN HOME (shared/checkin/aspen.js), GWG BLD 912 Round 1
   (c) 2026 Grow With Grounded LLC.
   Aspen's full check-in (grades 6 to 8), run by Home in its own window: no iframe, no tree page, nothing from the
   tree page's DOM or globals. It is the glue from aspen/guided.js and aspen/index.html, moved here, around the same
   shared player (shared/gg-guided.js, GGGuided.run), the same script (shared/guided/aspen.js), and the same question
   bank (aspen/checkin.js, window.ASPEN_CHECKIN). Contract: grounded-workshop patches/bld912/CONTRACT.md.

   GGCheckin.aspen = {files, kinds: ['full'], run(ctx)}; run returns a handle {el, close(), state()} for the window
   on screen (the short Before You Start screen first on a fresh start, then the check-in itself).

   In Home the active profile IS the student (Chris, BLD 912): no Students list, no Add a student, no guests, no
   localStorage aspen_v1. The record lives at GGP.data(id, 'aspen').student, the same place the tree reads for a
   Middle school profile (aspen/index.html load 1214, save 1232).
   What it keeps from the tree:
     the draft on the profile, saved on every answer and resumed (startCheckin 1690, guided.js onAnswer 91)
     the mode (On my own, With a grown-up) and the note before starting (renderCheckin 1696 to 1724, setMode 1742)
     the wording: a Plain lock wins (student.plainLock or aspen.plainLock, plainLocked 1166), else Home's ctx.plain,
       else the student's saved one (wordingOf 1167)
     the grade as a number 6 to 8 on the student, asked here only when it is missing (changeGrade 1673)
     the questions in order, from CK.getBank(grade, wording, sens) (qsFor 1369; questions(), aspen/guided.js 44)
     the player options, the script with its grown and plain overrides, isEdge, the quiet line (guided.js 26 to 43, 75)
     the ring built as finishCheckin builds it (1759 to 1767): the ring, three leaves, the draft cleared, the season
   The optional question about vaping, alcohol, and drugs (grades 7 and 8, CK.sensitive) is on by default here (Chris,
   BLD 912: "add it.. 7 and 8 its time for this question"), unless a grown-up turned it off (askSens false). It says it
   is optional, it can be skipped, it never gets a tip, and it never counts toward the Leaves score; the ring records
   sens: true as the tree does. Read It All (the tree's classic form) lives on the tree page only.
   Safety: no harm questions, no flags, no alerts. The quiet line is type only (the player never speaks it). Notes for
   the grown-up (q[1]) show as type in grown-up mode and are never spoken. TALK prompts are never saved.
   ===================================================================== */
(function () {
  'use strict';
  window.GGCheckin = window.GGCheckin || {};
  if (window.GGCheckin.aspen) return;

  var FILES = [
    '/aspen/checkin.js?v=b907',      // window.ASPEN_CHECKIN, the question bank
    '/shared/gg-parts.js?v=c212',    // part labels in the player (Roots: Spirit, or Roots: what grounds you)
    '/shared/gg-life.js?v=c197',     // Health and Ability: the example and tip lines under a question
    '/aspen/life.js?v=b907',         // window.ASPEN_LIFE notes, read by those lines
    '/shared/gg-guided.js?v=c212',   // the shared player (it loads gg-guided.css itself)
    '/shared/guided/aspen.js?v=b907', // window.GG_GUIDED.aspen, every spoken line
    '/shared/kids/aspen-practices.js?v=c187' // BLD 1037: the practices, for the Growth Plan (Home loads practice-rhythm.js)
  ];
  var PARTS = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];   // aspen/index.html PARTS 1130, in order
  var GRADES = [6, 7, 8];
  var CK = function () { return window.ASPEN_CHECKIN; };
  var clone = function (x) { return JSON.parse(JSON.stringify(x)); };
  var isObj = function (x) { return !!x && typeof x === 'object' && !Array.isArray(x); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  function ansOf(v) { var A = CK().answers; for (var i = 0; i < A.length; i++) if (A[i][0] === v) return A[i]; return null; }
  var SKIP = 'skip';   // the optional question's own Skip choice, kept in the draft; the ring keeps null (no answer)

  /* ---------- the bank, as the tree reads it ---------- */
  // qsFor, aspen/index.html 1369 (the bank's part names are the tree's, CK_KEY 1140).
  function qsFor(grade, key, sens, wording) { var C = CK(); return ((C.getBank(grade, wording || 'faith', sens) || {})[key] || []).filter(Boolean); }
  function sensAt(grade, key, i, sens) { var x = sens && (CK().sensitive || {})[String(grade)]; return !!(x && x[0] === key && x[1] === i); }   // guided.js 41
  // partScore, aspen/index.html 1386, with one change Chris made for Home (BLD 912): the optional question never counts.
  function partScore(grade, key, qa, sens) {
    var sum = 0, n = 0;
    qsFor(grade, key, sens).forEach(function (q, i) {
      if (sensAt(grade, key, i, sens)) return;
      var a = ansOf((qa || [])[i]); if (!a || a[2] == null) return;
      var v = q[2] === 'r' ? 4 - a[2] : a[2];
      sum += (v - 1) / 2; n++;
    });
    return n ? Math.round(1 + 9 * sum / n) : null;
  }
  function asTalk(part, i) { return ((CK().talk || {})[part] || {})[i] || ''; }
  var stale = function (d) { return !isObj(d) || d.std !== CK().version || (d.bank || 1) !== CK().bank; };   // guided.js 52
  var anyAnswer = function (d) { return isObj(d) && Object.keys(d.answers || {}).some(function (k) { return (d.answers[k] || []).some(Boolean); }); };

  /* ---------- the student record (GGP.data(id, 'aspen').student) ---------- */
  function vault(id) { return window.GGP && GGP.data ? GGP.data(id, 'aspen') : null; }
  function plainLocked(s, id) { var r = vault(id); return !!(s && s.plainLock === true) || !!(r && r.plainLock === true); }   // 1166
  function wordingOf(s, id) { if (plainLocked(s, id)) return 'plain'; var r = vault(id), w = (s && s.wording) || (r && r.wording); return w === 'plain' ? 'plain' : 'faith'; }   // 1167
  function blankStudent() { return { rings: [], draft: null, plan: null, log: {}, leaves: 0, style: 'aspen', theme: 'lake', grade: 6 }; }   // 1213
  // The student as load() reads a Middle school profile (1216 to 1225) and save() writes it back (1235 to 1238): the
  // blank defaults, the profile's name, rings from another tree kept apart, the look from The Grove. Held in place in
  // the vault, so anything saved beside it (an Aspen Guide's Plain lock, the wording) stays as it is.
  function stuRec(id) {
    var r = vault(id); if (!r) return null;
    var st = Object.assign(blankStudent(), isObj(r.student) ? r.student : {});
    var p = GGP.get ? GGP.get(id) : null; if (p && p.name) st.name = p.name;
    var fr = (st.rings || []).filter(function (x) { return x && x.from; });
    if (fr.length) { st.rings = st.rings.filter(function (x) { return !(x && x.from); }); st.earlier = (st.earlier || []).concat(fr); }
    var all = GGP.data(id) || {}, gv = all.grove, kind = gv && gv.self && gv.self.kind;
    if (kind) st.style = { birch: 'birch', maple: 'maple', pine: 'pine' }[kind] || 'aspen';
    delete st._pid; delete st.avatar; delete st.id; delete st._legacy;
    r.student = st;
    return st;
  }
  function peekStu(id) { var r = vault(id); return r && isObj(r.student) ? r.student : {}; }
  function ownRings(s) { return (s.rings || []).filter(function (x) { return !(x && x.from); }); }
  function gradeOk(g) { return GRADES.indexOf(g) >= 0; }
  // The wording for this check-in: a lock wins, then Home's choice for the profile (ctx.plain), then the saved one.
  function wdOf(s, id, ctx) { return plainLocked(s, id) ? 'plain' : typeof ctx.plain === 'boolean' ? (ctx.plain ? 'plain' : 'faith') : wordingOf(s, id); }

  /* ---------- Health and Ability lines (asNote, aspen/index.html 2190) ---------- */
  function lifeIds(id) {
    var L = window.GGLife; if (!L || !L.chosen || !(window.GGP && GGP.isOpen && GGP.isOpen(id))) return [];
    try { if (L.who && L.use && L.who() !== id) L.use(id); return L.chosen('aspen') || []; } catch (e) { return []; }
  }
  function uniq(a) { return a.filter(function (x, i) { return x && a.indexOf(x) === i; }); }
  function asNote(part, i, grade, ids) {
    var out = { ex: [], tip: [] }; if (!ids.length) return out;
    ((window.ASPEN_LIFE || {}).notes || []).forEach(function (n) {
      if (n.part !== part || n.i !== i || (n.grades && n.grades.indexOf(String(grade)) < 0)) return;
      ids.forEach(function (lid) { var x = (n.n || {})[lid]; if (x) { if (x.ex) out.ex.push(x.ex); if (x.tip) out.tip.push(x.tip); } });
    });
    out.ex = uniq(out.ex); out.tip = uniq(out.tip); return out;
  }

  /* ---------- the player's options, as aspen/guided.js passes them ---------- */
  function over(base, o) {
    var out = Object.assign({}, base); delete out.grown; delete out.plain;
    if (isObj(o)) Object.keys(o).forEach(function (k) { out[k] = isObj(o[k]) && isObj(base[k]) ? Object.assign({}, base[k], o[k]) : o[k]; });
    return out;
  }
  function kindFor(K, grown, plain) { var k = over(K, plain ? K.plain : null); if (grown) k = over(k, K.grown); return k; }
  function script(kinds, grown, plain) {   // guided.js 31 to 35
    var s = window.GG_GUIDED.aspen, out = { voice: s.voice || 'jenny', tipSkip: s.tipSkip || [], kinds: {} };
    (kinds || Object.keys(s.kinds)).forEach(function (k) { if (s.kinds[k]) out.kinds[k] = kindFor(s.kinds[k], grown, plain); });
    return out;
  }
  // A Growing Edge answer: "Not really" on a forward question, "Yeah, most of the time" on a reverse one (guided.js 37).
  function isEdge(q, v) { var a = ansOf(v); if (!a || a[2] == null) return false; return q.rev ? a[2] === 3 : a[2] === 1; }
  function opts() { return CK().answers.map(function (a) { return { v: a[0], label: a[1] }; }); }
  // questions(), guided.js 44. The optional question says it is optional (the bank's own Why line, as type) and adds
  // a Skip choice; answer labels and help are never spoken, so its spoken words stay the recorded question.
  function questions(d, wording, id) {
    var out = [], ids = lifeIds(id), C = CK();
    PARTS.forEach(function (key) {
      qsFor(d.grade, key, d.sens, wording).forEach(function (q, i) {
        var talk = asTalk(key, i), sens = sensAt(d.grade, key, i, d.sens), ln = talk ? { ex: [], tip: [] } : asNote(key, i, d.grade, ids);
        var help = d.mode === 'grown' ? 'For the grown-up. ' + q[1] + ln.tip.map(function (x) { return ' ' + x; }).join('') : ln.ex.join(' ');
        var o = opts();
        if (sens) {
          var why = C.whyOf ? C.whyOf(d.grade, key, i, wording, true) : '';
          help = [why, help].filter(Boolean).join(' ');
          o.push({ v: SKIP, label: 'Skip this question' });
        }
        var x = { id: key + ':' + i, part: key, text: q[0], help: help, type: 'choice', options: o, noTip: !!talk || sens, rev: q[2] === 'r' };
        if (sens) x.sens = true;   // the script's tipSkip names sens too
        out.push(x);
      });
    });
    return out;
  }

  /* ---------- the season (finishCheckin 1765, and shared/gg-tend.js) ----------
     shared/gg-tend.js is one shared engine set up by a tree page (GGTend.init with that page's store and screens), so
     its two steps a check-in uses are ported here on student.tend, line for line: ensure() (gg-tend.js 112 to 124) and
     onFullCheckin (741 to 746), with Aspen's history (one full entry per ring, aspen/index.html 2692). */
  function pad(n) { return String(n).padStart(2, '0'); }
  function dayKey(t) { var d = new Date(t); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }   // 1905
  function keyDate(k) { var p = k.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function between(a, b) { return Math.round((keyDate(b) - keyDate(a)) / 86400000); }
  function weekNo(t) { if (!t.start) return 0; return Math.floor(Math.max(0, between(t.start, dayKey(new Date()))) / 7) + 1; }
  function history(s) { return (s.rings || []).map(function (r) { return { date: dayKey(r.date), type: 'full' }; }); }
  function ensure(t, hist) {
    var b = { v: 1, start: null, season: 1, rings: [], plan: null, level: null, days: {}, weeks: {} };
    Object.keys(b).forEach(function (k) { if (t[k] === undefined) t[k] = b[k]; });
    if (!t.start || !t.plan) {
      var full = hist.filter(function (e) { return e && e.type !== 'quick' && e.date; }), last = full[full.length - 1];
      if (!t.start && last) t.start = last.date;
      if (!t.plan) { var wp = hist.filter(function (e) { return e && e.growthPlan; }), lp = wp[wp.length - 1]; if (lp) t.plan = clone(lp.growthPlan); }
    }
    return t;
  }
  function onFullCheckin(t, hist, d) {
    ensure(t, hist); var msg = null;
    if (!t.start) { t.start = d; t.season = 1; msg = 'Your first season has begun. Week 1 starts today.'; }
    else if (weekNo(t) >= 12) { t.rings = (t.rings || []).concat([{ date: d, season: t.season || 1 }]); t.season = (t.season || 1) + 1; t.start = d; msg = 'A new ring for your tree. Season ' + t.season + ' begins today.'; }
    return msg;
  }
  function tendOf(s) { if (!s.tend || typeof s.tend !== 'object') s.tend = {}; return s.tend; }   // aspTendGet 1559
  var uid = function () { return Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4); };   // 1281

  /* ---------- the Before You Start screen (a form step in the same player) ---------- */
  // Shown on a fresh start: the note, the mode, and the grade when the student has none (renderCheckin 1700 to 1712).
  // Nothing on it is spoken (say: false), so it needs no clip.
  var CSS = '.gck-lbl{display:block;font:700 15px/1.3 var(--sans,inherit);color:var(--soft);margin:18px 0 8px;}'
    + '.gck-row{display:grid;gap:10px;}.gck-g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;}'
    + '.gck-g .ggd-opt{justify-content:center;text-align:center;min-height:54px;}.gck-opt small{display:block;font-size:14px;font-weight:400;opacity:.85;margin-top:2px;}'
    + '.gck-note{margin:14px 0 0;font-size:15px;color:var(--soft);}';
  function css() { if (document.getElementById('gck-css')) return; var st = document.createElement('style'); st.id = 'gck-css'; st.textContent = CSS; document.head.appendChild(st); }
  function btn(k, v, on, label, sub) {
    return '<button type="button" class="ggd-opt gck-opt" data-gck="' + k + '" data-val="' + esc(v) + '" aria-pressed="' + !!on + '"><span class="ggd-ot">' + esc(label) + (sub ? '<small>' + esc(sub) + '</small>' : '') + '</span></button>';
  }

  /* ---------- run ---------- */
  function run(ctx) {
    ctx = ctx || {};
    var id = ctx.id, C = CK();
    if (!id || !C || !window.GGGuided || !window.GG_GUIDED || !window.GG_GUIDED.aspen || !vault(id)) return null;
    var cur = null, H = { close: function (q) { if (cur) cur.close(q); }, state: function () { return cur ? cur.state() : null; } };
    Object.defineProperty(H, 'el', { get: function () { return cur ? cur.el : null; } });
    var closed = function () { if (typeof ctx.onClose === 'function') { try { ctx.onClose(); } catch (e) {} } };
    var s0 = peekStu(id);
    // Pick up a check-in with answers (resume, guided.js 106); a stale or empty draft starts fresh.
    // BLD 1040: an old draft is offered once (the Pick Up card), then cleared.
    var gone = isObj(s0.draft) && GGGuided.draftGone(s0.draft.up || Date.parse(s0.draft.started || ''), s0.draft.offered);
    if (anyAnswer(s0.draft) && !stale(s0.draft) && gradeOk(s0.draft.grade) && !gone) { cur = checkin(ctx, H, setup); return H; }
    if (gone) { stuRec(id).draft = null; GGP.save(id); }
    setup();
    return H;

    // A fresh start: Before You Start, then the check-in (and Start Fresh on the Pick Up card, BLD 1040).
    function setup() {
    css();
    var savedGrade = gradeOk(s0.grade) ? s0.grade : null;
    var st = { mode: 'self', grade: savedGrade }, began = false;
    var form = {
      id: 'setup', type: 'form', aside: true, say: false, eb: 'Before You Start', text: 'Before you start', label: '', next: "Let's go",
      html: function () {
        var h = '<p class="ggd-help"><b>This is yours.</b> Your grown-up sees how each part of your tree is doing, not your answers, except a few about friends and hope, so they can cheer you on. Every answer is welcome. "Not sure" is always okay. Afterward you\'ll see how each part of your tree is doing: Strong, Steady, or Growing Edge.</p>'
          + '<span class="gck-lbl" id="gck-m">How are you doing this check-in?</span><div class="gck-row" role="group" aria-labelledby="gck-m">'
          + btn('mode', 'self', st.mode === 'self', 'On my own') + btn('mode', 'grown', st.mode === 'grown', 'With a grown-up') + '</div>'
          + '<p class="gck-note">' + (st.mode === 'grown' ? 'Your grown-up will see a gold note with a question to talk about after each answer.' : 'Read each question and pick what fits best.') + '</p>';
        if (!savedGrade) h += '<span class="gck-lbl" id="gck-g">Which grade are you in?</span><div class="gck-g" role="group" aria-labelledby="gck-g">'
          + GRADES.map(function (g) { return btn('grade', g, st.grade === g, String(g), 'Grade'); }).join('') + '</div>';
        else h += '<p class="gck-note">Grade ' + esc(savedGrade) + ' questions. Every part of your tree, six questions each.</p>';
        return h + '<p class="gck-note">We read each question out loud, one at a time.</p>';
      },
      ready: function () { return st.grade ? '' : 'Pick your grade to start.'; }
    };
    cur = GGGuided.run({
      tree: 'aspen', kind: 'setup', title: ownRings(s0).length ? 'My Check-in' : 'My First Check-in', voice: 'jenny', kid: true, plain: wdOf(s0, id, ctx) === 'plain',
      questions: [form], answers: {}, script: { voice: 'jenny', kinds: { setup: {} } }, quiet: C.quiet || undefined, noClose: true,
      onDone: function () {
        began = true;
        var s = stuRec(id);
        if (!savedGrade) s.grade = st.grade;   // the grade is asked once and kept on the student, as a number
        // startCheckin 1690 to 1694, with the optional question on by default for grades 7 and 8 (Chris, BLD 912).
        var sens = s.askSens !== false && !!C.sensitive[String(s.grade)];
        s.draft = { step: 'parts', page: 0, mode: st.mode, grade: s.grade, std: C.version, bank: C.bank, sens: sens, answers: {}, started: new Date().toISOString() };
        GGP.save(id);
        cur = checkin(ctx, H, setup);
      },
      onClose: function () { if (!began) closed(); }
    });
    if (cur && cur.el) cur.el.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-gck]'); if (!b) return;
      var k = b.getAttribute('data-gck'), v = b.getAttribute('data-val');
      if (k === 'mode') st.mode = v; else if (k === 'grade') st.grade = +v;
    }, true);   // before the player redraws the form (its own handler draws it again on the next tick)
    }
  }

  // The check-in itself, on the student's draft (aspen/guided.js checkin 63).
  function checkin(ctx, H, again) {
    var id = ctx.id, C = CK(), s = stuRec(id), d = s.draft;
    var wd = wdOf(s, id, ctx);
    var kind = ownRings(s).length ? 'full' : 'start';
    if (d.step !== 'parts') { d.step = 'parts'; d.page = d.page || 0; GGP.save(id); }
    var A = {};
    PARTS.forEach(function (key) { (d.answers[key] || []).forEach(function (v, i) { if (v) A[key + ':' + i] = v; }); });
    var ended = '', saving = null;
    var finish = function () {
      var st = stuRec(id), dd = st.draft; if (!isObj(dd)) return;
      // finishCheckin 1759 to 1767; a skipped optional question is kept as no answer.
      var answers = {};
      PARTS.forEach(function (key) {
        var qa = (dd.answers[key] || qsFor(dd.grade, key, dd.sens).map(function () { return null; })).slice().map(function (v) { return v === SKIP ? null : v; });
        answers[key] = { qa: qa, score: partScore(dd.grade, key, qa, dd.sens) };
      });
      var ring = { id: uid(), date: new Date().toISOString(), grade: dd.grade, std: C.version, bank: C.bank, sens: !!dd.sens, wording: wd, mode: dd.mode, answers: answers };
      st.rings.push(ring); st.draft = null; st.leaves = (st.leaves || 0) + 3;   // each check-in: one ring, three leaves
      var msg = onFullCheckin(tendOf(st), history(st), dayKey(ring.date));
      saving = Promise.resolve(GGP.save(id)).then(function () {
        if (typeof ctx.onSaved === 'function') { try { ctx.onSaved(ring, { season: msg }); } catch (e) {} }
      });
    };
    return GGGuided.run({
      tree: 'aspen', kind: kind, title: kind === 'start' ? 'My First Check-in' : 'My Check-in', voice: 'jenny', kid: true, plain: wd === 'plain',
      questions: questions(d, wd, id), answers: A, script: script([kind], d.mode === 'grown', wd === 'plain'), isEdge: isEdge, quiet: C.quiet || undefined, early: true,
      // BLD 1040: the Pick Up card on the student's own draft (onAnswer saves each answer into it); Start Fresh opens Before You Start.
      draft: {
        load: function () { var dd = stuRec(id).draft; return isObj(dd) ? { a: {}, at: dd.started, up: dd.up || Date.parse(dd.started || ''), offered: !!dd.offered } : null; },
        save: function (x) { var dd = stuRec(id).draft; if (!isObj(dd)) return; dd.up = x.up; if (x.offered) dd.offered = true; else delete dd.offered; GGP.save(id); },
        clear: function (soon) { if (soon) return; var st = stuRec(id); if (st.draft) { st.draft = null; GGP.save(id); } },
        fresh: typeof again === 'function' ? function () { setTimeout(again, 30); } : null
      },
      onAnswer: function (qid, v) {   // guided.js 91 to 96: every answer saves into the draft
        var st = stuRec(id), dd = st.draft; if (!isObj(dd)) return;
        var c = qid.indexOf(':'), key = qid.slice(0, c), i = +qid.slice(c + 1), qs = qsFor(dd.grade, key, dd.sens, wd);
        dd.answers[key] = dd.answers[key] || qs.map(function () { return null; });
        dd.answers[key][i] = v; dd.step = 'parts'; dd.page = PARTS.indexOf(key); GGP.save(id);
      },
      onDone: function () {
        ended = 'done';
        var st = stuRec(id); if (!st.draft) return;
        st.draft.step = 'parts'; st.draft.page = PARTS.length - 1;
        finish();
      },
      onClose: function () {
        setTimeout(function () {
          var fin = function () { if (typeof ctx.onClose === 'function') { try { ctx.onClose(ended ? undefined : { draft: true }); } catch (e) {} } };
          if (saving) saving.then(fin, fin); else fin();
        }, 0);
      }
    });
  }

  /* ---------- the Growth Plan (GWG BLD 1037): aspen/guided.js planSteps, planMerge, and plan, here in Home ----------
     Chris (November 21, 2026): after the check-in, walk through building the growth plan; with a plan already chosen,
     review it with the new Growing Edges first. The practices are the one shared copy (shared/kids/aspen-practices.js),
     with aspen/life.js and the moved practices added in the tree page's own order, so every index matches. The plan
     saves where Today reads it (student.tend.plan: {part: {selected, custom, own}}, picksToTend), and the student's
     picks (student.plan.picks) follow, as savePlan keeps them. */
  var LIB = null;
  function lib() {
    if (LIB) return LIB;
    var src = (window.GG_KIDS_PRAC || {}).aspen; if (!isObj(src)) return null;
    var X = clone(src), PR = X.PRACTICES, LE = X.LEARN, PP = X.PLAIN_PR, ASL = window.ASPEN_LIFE || {}, LIFE = Object.assign({}, ASL.pr || {});
    GRADES.forEach(function (g) { (ASL.add || []).forEach(function (a) {
      var list = (PR[g] || {})[a.part]; if (!list || list.some(function (r) { return r[2] === a.row[2]; })) return;
      list.push(a.row.slice()); var i = list.length - 1;
      (LE[g][a.part] = LE[g][a.part] || [])[i] = (a.learn || []).slice();
      LIFE[g + ':' + a.part + ':' + i] = { life: (a.life || []).slice(), adapt: a.adapt };
    }); });
    GRADES.forEach(function (g) { Object.keys((X.PRACTICES_MOVED || {})[g] || {}).forEach(function (k) { X.PRACTICES_MOVED[g][k].forEach(function (m) {
      var list = PR[g][k] = PR[g][k] || []; if (list.some(function (r) { return r[2] === m[0][2]; })) return;
      list.push(m[0].slice()); var i = list.length - 1, pid = g + ':' + k + ':' + i;
      if (m[1]) (LE[g][k] = LE[g][k] || [])[i] = m[1].slice();
      if (m[2]) PP[pid] = m[2];
      if (ASL.pr && ASL.pr[m[3]]) LIFE[pid] = ASL.pr[m[3]];
    }); }); });
    return (LIB = { PR: PR, LE: LE, PP: PP, LIFE: LIFE });
  }
  function prText(g, k, i, plain) { var L = lib(), pr = ((L.PR[g] || {})[k] || [])[i]; if (!pr) return ''; var p = plain && L.PP[g + ':' + k + ':' + i]; return (p && p.t) || pr[2]; }
  function learnRow(g, k, i, plain) { var L = lib(), R = ((L.LE[g] || {})[k] || [])[i]; if (!R) return null; var p = plain && L.PP[g + ':' + k + ':' + i]; return p && p.L ? R.map(function (x, j) { return p.L[j] != null ? p.L[j] : x; }) : R; }
  function prIndex(g, k, name) { var list = (lib().PR[g] || {})[k] || []; for (var i = 0; i < list.length; i++) if (list[i][2] === name || prText(g, k, i, true) === name) return i; return -1; }
  function tends(k) { return !window.GGParts || !GGParts.tend || GGParts.tend(k); }
  function partLabel(k, plain) { return window.GGParts && GGParts.label ? GGParts.label(k, { plain: plain }) : k; }
  function ringScore(ring, k) { var a = ((ring || {}).answers || {})[k]; return a && typeof a.score === 'number' ? a.score : null; }
  // lowestTend (aspen/index.html): the two lowest of the four tended parts in the latest ring.
  function lowestTend(ring) { return PARTS.filter(tends).map(function (k) { var v = ringScore(ring, k); return [k, v == null ? 5.5 : v]; }).sort(function (a, b) { return a[1] - b[1]; }).slice(0, 2).map(function (x) { return x[0]; }); }
  function normPlan(P, g, plain) {
    PARTS.forEach(function (k) {
      var x = P[k] = isObj(P[k]) ? P[k] : {};
      x.selected = Array.isArray(x.selected) ? x.selected : []; x.own = Array.isArray(x.own) ? x.own : []; x.custom = x.custom || '';
      if (x.custom) { x.own.push(x.custom); x.custom = ''; }
      x.selected = x.selected.map(function (n) { var i = prIndex(g, k, n); return i >= 0 ? prText(g, k, i, plain) : n; }).filter(function (n, i, all) { return n && all.indexOf(n) === i; });
    });
    return P;
  }
  function planSteps(s, base, plain, id) {
    var g = s.grade, R = (window.GG_RHYTHM || {}).aspen || {}, rs = ownRings(s), last = rs[rs.length - 1] || null, L = lib();
    var sug = last ? lowestTend(last) : [], order = sug.concat(PARTS.filter(function (k) { return tends(k) && sug.indexOf(k) < 0; }));
    var life = lifeIds(id).length > 0 && window.GGLife && GGLife.order;
    return order.map(function (k) {
      var sel = base[k].selected, all = ((L.PR[g] || {})[k] || []).map(function (pr, i) { return i; });
      var isP = function (i) { return sel.indexOf(prText(g, k, i, plain)) >= 0; };
      var open = all.filter(function (i) { return !isP(i); });
      if (life) open = GGLife.order(open, function (i) { return L.LIFE[g + ':' + k + ':' + i] || { life: [] }; });
      var show = all.filter(isP).concat(open.slice(0, Math.max(0, 8 - all.filter(isP).length)));
      var choices = show.map(function (i) {
        var name = prText(g, k, i, plain), r = R[k + '|' + name], Lr = learnRow(g, k, i, plain), pr = L.PR[g][k][i];
        return { name: name, idx: i, how: r && r.how ? undefined : (Lr ? String(Lr[1]).split('|') : []), min: r && r.min != null ? undefined : pr[1] };
      });
      sel.forEach(function (n) { if (!choices.some(function (c) { return c.name === n; })) choices.unshift({ name: n }); });
      var sc = ringScore(last, k), edge = sug.indexOf(k) >= 0 && sc != null && sc < 5;
      return { type: 'plan', part: k, max: 3, edge: edge, text: edge ? partLabel(k, plain) + ' is a Growing Edge. Choose up to three to help it grow.' : undefined, choices: choices };
    });
  }
  function planMerge(base, steps, picked) {
    var P = clone(base);
    steps.forEach(function (st) {
      if (!picked || !Object.prototype.hasOwnProperty.call(picked, st.part)) return;
      var shown = st.choices.map(function (c) { return c.name; });
      P[st.part].selected = P[st.part].selected.filter(function (n) { return shown.indexOf(n) < 0; }).concat(picked[st.part] || []);
    });
    return P;
  }
  function planSize(P) { return PARTS.reduce(function (n, k) { var x = P[k] || {}; return n + (x.selected || []).length + (x.own || []).length + (x.lib || []).length; }, 0); }
  // plan(ctx): ctx.review (a plan already chosen: Review My Growth Plan), ctx.onPlanSaved(plan), ctx.onClose({saved}).
  function plan(ctx) {
    ctx = ctx || {};
    var id = ctx.id;
    if (!id || !window.GGGuided || !window.GG_GUIDED || !window.GG_GUIDED.aspen || !vault(id) || !lib()) return null;
    var s = stuRec(id); if (!gradeOk(s.grade)) s.grade = 6;
    var t = tendOf(s), rs = ownRings(s), last = rs[rs.length - 1] || {}, plain = wdOf(s, id, ctx) === 'plain';
    var base = normPlan(clone(isObj(t.plan) ? t.plan : {}), s.grade, plain), steps = planSteps(s, base, plain, id), cur = {}, picked = {};
    steps.forEach(function (st) { cur[st.part] = base[st.part].selected.filter(function (n) { return st.choices.some(function (c) { return c.name === n; }); }); });
    var sc = script(['plan'], last.mode === 'grown', plain);
    if (ctx.review && sc.kinds.plan) sc.kinds.plan.open = [];   // a review opens on its first part: the open lines say "let's build"
    var saved = false;
    return GGGuided.run({
      tree: 'aspen', kind: 'plan', title: ctx.title || (ctx.review ? 'Review My Growth Plan' : 'Build My Growth Plan'), planTitle: 'My Growth Plan', voice: 'jenny', kid: true, plain: plain,
      questions: steps, plan: cur, script: sc, quiet: false,
      onPlan: function (part, names) { picked[part] = names; },
      onDone: function (r) {
        var P = planMerge(base, steps, r.plan || picked);
        if (!planSize(P)) { if (typeof ctx.toast === 'function') ctx.toast('Pick 1 practice, and it will be waiting in Today.'); return; }
        var st = stuRec(id), t2 = tendOf(st), old = isObj(t2.plan) ? t2.plan : {}, now = new Date().toISOString(), g = st.grade;
        t2.plan = clone(P);
        Object.keys(old).forEach(function (k) { var Lb = (old[k] || {}).lib; if (Lb && Lb.length) { t2.plan[k] = t2.plan[k] || { selected: [] }; if (!t2.plan[k].lib) t2.plan[k].lib = Lb; } });
        // savePlan: the student's picks follow (this grade's practices by index, own practices and other grades as they were).
        var prev = isObj(st.plan) && Array.isArray(st.plan.picks) ? st.plan.picks : [], keep = prev.filter(function (p) { return p && (p.own || p.grade !== g); }), picks = keep.slice();
        PARTS.forEach(function (k) { (P[k].selected || []).forEach(function (n) {
          var i = prIndex(g, k, n); if (i < 0) return;
          var was = prev.filter(function (p) { return p && !p.own && p.part === k && p.grade === g && p.idx === i; })[0];
          picks.push({ part: k, idx: i, grade: g, added: (was && was.added) || Date.now() });
        }); });
        st.plan = { picks: picks, created: (isObj(st.plan) && st.plan.created) || now, updated: now };
        t2.planChosen = dayKey(now);   // BLD 1037: the person chose their plan (the setup's starters were the backup until now)
        saved = Promise.resolve(GGP.save(id)).then(function () { if (typeof ctx.onPlanSaved === 'function') { try { ctx.onPlanSaved(clone(t2.plan)); } catch (e) {} } });
      },
      onClose: function () {
        setTimeout(function () {
          var fin = function () { if (typeof ctx.onClose === 'function') { try { ctx.onClose({ saved: !!saved }); } catch (e) {} } };
          if (saved) saved.then(fin, fin); else fin();
        }, 0);
      }
    });
  }

  window.GGCheckin.aspen = { files: FILES, kinds: ['full'], run: run, plan: plan };
})();
