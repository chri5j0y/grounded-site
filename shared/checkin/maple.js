/* =====================================================================
   GROW WITH GROUNDED . MAPLE CHECK-IN IN HOME (shared/checkin/maple.js), GWG BLD 912 Round 1
   (c) 2026 Grow With Grounded LLC.
   Maple's full check-in (grades K to 5), run by Home in its own window: no iframe, no tree page, nothing from
   the tree page's DOM or globals. It is the glue from maple/guided.js and maple/index.html, moved here, around
   the same shared player (shared/gg-guided.js, GGGuided.run), the same script (shared/guided/maple.js), and the
   same question bank (maple/checkin.js, window.MAPLE_CHECKIN). Contract: grounded-workshop patches/bld912/CONTRACT.md.

   GGCheckin.maple = {files, kinds: ['full'], run(ctx)}; run returns a handle {el, close(), state()} for the window
   on screen (the short Before You Start screen first on a fresh start, then the check-in itself).

   In Home the active profile IS the kid (Chris, BLD 912): no "Whose tree today?", no typed name, no kids list, no
   guests, no localStorage maple:kids. The record lives at GGP.data(id, 'maple').kid, the same place the tree reads
   for a Kids profile (maple/index.html loadKids 1527, saveKids 1572).
   What it keeps from the tree:
     the mode (On my own, With a grown-up), from the start screen (maple/index.html 860 to 864, setMode 1728)
     the wording: a Plain lock wins (kid.plainLock or maple.plainLock, plainLocked 1454), else a grown-up's pick on
       the start screen in grown-up mode (the wording box 873 to 880), else Home's ctx.plain, else the kid's saved one
     the grade, asked once and kept on the kid record as 'K' to '5' (Chris, BLD 912: asked once, like Aspen)
     the questions in order, from CK.getBank(grade, wording) (qsFor 1471; questions(), maple/guided.js 44)
     the player options, the script with its grown and plain overrides, isEdge, the quiet line (guided.js 26 to 43, 81)
     the record built as finishCheckin builds it (maple/index.html 1923 to 1938), sealed parts as sealPart (1888)
     the season step mpSeasonSync takes when the tree next opens (2326), done here at save time
   New in Home (Chris, BLD 912): an unfinished check-in is saved on the profile (kid.draft) and resumed, Aspen's way.
   Read It All (the tree's classic form) lives on the tree page only, so the player shows no Read It All here.
   Safety: no harm questions, no flags, no alerts. The quiet line is type only (the player never speaks it). Grown-up
   tips (q[1]) show as type in grown-up mode and are never spoken. TALK prompts are never saved: readers compute them.
   ===================================================================== */
(function () {
  'use strict';
  window.GGCheckin = window.GGCheckin || {};
  if (window.GGCheckin.maple) return;

  var FILES = [
    '/maple/checkin.js?v=b907',      // window.MAPLE_CHECKIN, the question bank
    '/shared/gg-parts.js?v=b907',    // part labels in the player (Roots: Spirit, or Roots: what grounds you)
    '/shared/gg-life.js?v=b907',     // Health and Ability: the example and tip lines under a question
    '/maple/life.js?v=b907',         // window.MAPLE_LIFE notes, read by those lines
    '/shared/gg-guided.js?v=b907',   // the shared player (it loads gg-guided.css itself)
    '/shared/guided/maple.js?v=b907' // window.GG_GUIDED.maple, every spoken line
  ];
  var PARTS = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];   // maple/index.html PARTS 983, in order
  var CK = function () { return window.MAPLE_CHECKIN; };
  var clone = function (x) { return JSON.parse(JSON.stringify(x)); };
  var isObj = function (x) { return !!x && typeof x === 'object' && !Array.isArray(x); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  function ansOf(v) { var A = CK().answers; for (var i = 0; i < A.length; i++) if (A[i][0] === v) return A[i]; return null; }

  /* ---------- the bank, as the tree reads it ---------- */
  // qsFor, maple/index.html 1471: the questions in a wording, [text, tip] or [text, tip, 'r'] (reverse).
  function qsFor(grade, key, wording) { var C = CK(); return ((C.getBank ? C.getBank(grade, wording) : C.questions[grade]) || {})[key] || []; }
  // partScore, maple/index.html 1482: the shared 1 to 10 scale; reverse questions count backward; "I don't know" is left out.
  function partScore(grade, key, qa, wording) {
    var sum = 0, n = 0;
    qsFor(grade, key, wording).forEach(function (q, i) {
      var a = ansOf((qa || [])[i]); if (!a || a[2] == null) return;
      var v = q[2] === 'r' ? 4 - a[2] : a[2];
      sum += (v - 1) / 2; n++;
    });
    return n ? Math.round(1 + 9 * sum / n) : null;
  }
  function wxOf(sc) { return sc == null ? 'skip' : sc >= 8 ? 'sun' : sc >= 5 ? 'cloud' : 'rain'; }   // 1493
  function mpTalk(part, i) { return ((CK().talk || {})[part] || {})[i] || ''; }                   // 1920
  function gradeKeys() { return CK().grades.map(function (g) { return g[0]; }); }

  /* ---------- the kid record (GGP.data(id, 'maple').kid) ---------- */
  function vault(id) { return window.GGP && GGP.data ? GGP.data(id, 'maple') : null; }
  function plainLocked(kid, id) {   // maple/index.html 1454
    if (kid && kid.plainLock === true) return true;
    try { return (vault(id) || {}).plainLock === true; } catch (e) { return false; }
  }
  function kidWording(kid, id) { return kid && (plainLocked(kid, id) || kid.wording === 'plain') ? 'plain' : 'faith'; }   // 1460
  function dkey(d) { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function keyDate(k) { var p = k.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function addDays(k, n) { var d = keyDate(k); d.setDate(d.getDate() + n); return dkey(d); }
  // moveOldCheckins and migrateKid, maple/index.html 1544 to 1570: run on every load, so the saved record carries them.
  var OLD_CI = 'check' + 'ups', OLD_CI_ID = 'check' + 'upId';
  function moveOldCheckins(k) {
    if (Array.isArray(k[OLD_CI])) k.checkins = (k.checkins || []).concat(k[OLD_CI]);
    delete k[OLD_CI];
    var fix = function (p) { if (p && p[OLD_CI_ID] !== undefined) { if (p.checkinId === undefined) p.checkinId = p[OLD_CI_ID]; delete p[OLD_CI_ID]; } };
    fix(k.plan); (k.pastPlans || []).forEach(fix);
  }
  function migrateKid(k) {
    moveOldCheckins(k);
    if (!k.checkins) k.checkins = [];
    if (!k.pastPlans) k.pastPlans = [];
    var last = k.checkins[k.checkins.length - 1];
    if (!k.grade && last) k.grade = last.grade;
    if (k.plan === undefined) {
      k.plan = null;
      if (last && last.plan && last.plan.acts) {
        var start = dkey(new Date(last.plan.made || last.date));
        k.plan = { acts: last.plan.acts.slice(), weeks: last.plan.weeks || 2, start: start, end: addDays(start, (last.plan.weeks || 2) * 7 - 1), checkinId: last.id, log: {} };
      }
    }
    return k;
  }
  // The kid as loadKids reads a Kids profile (1530 to 1534): the saved record, the profile's name, migrateKid.
  // Held in place in the vault, so later writes keep anything else beside it (like a Plain lock), as saveKids does.
  function kidRec(id) {
    var m = vault(id); if (!m) return null;
    var k = Object.assign({ checkins: [] }, isObj(m.kid) ? m.kid : {});
    var p = GGP.get ? GGP.get(id) : null; if (p && p.name) k.name = p.name;
    delete k.avatar; delete k._pid; delete k._legacy;   // saveKids keeps the picture on the profile (1580)
    m.kid = migrateKid(k);
    return k;
  }
  function peekKid(id) { var m = vault(id); return m && isObj(m.kid) ? m.kid : { checkins: [] }; }

  /* ---------- Health and Ability lines (mpNote, maple/index.html 2366) ---------- */
  function lifeIds(id) {
    var L = window.GGLife; if (!L || !L.chosen || !(window.GGP && GGP.isOpen && GGP.isOpen(id))) return [];
    try { if (L.who && L.use && L.who() !== id) L.use(id); return L.chosen('maple') || []; } catch (e) { return []; }
  }
  function uniq(a) { return a.filter(function (x, i) { return x && a.indexOf(x) === i; }); }
  function mpNote(part, i, grade, ids) {
    var out = { ex: [], tip: [] }; if (!ids.length) return out;
    ((window.MAPLE_LIFE || {}).notes || []).forEach(function (n) {
      if (n.part !== part || n.i !== i || (n.grades && n.grades.indexOf(String(grade)) < 0)) return;
      ids.forEach(function (lid) { var x = (n.n || {})[lid]; if (x) { if (x.ex) out.ex.push(x.ex); if (x.tip) out.tip.push(x.tip); } });
    });
    out.ex = uniq(out.ex); out.tip = uniq(out.tip); return out;
  }

  /* ---------- the player's options, as maple/guided.js passes them ---------- */
  // The script for one run: the kind, with Plain and grown-up overrides laid over the same slots (guided.js 26 to 36).
  function over(base, o) {
    var out = Object.assign({}, base); delete out.grown; delete out.plain;
    if (isObj(o)) Object.keys(o).forEach(function (k) { out[k] = isObj(o[k]) && isObj(base[k]) ? Object.assign({}, base[k], o[k]) : o[k]; });
    return out;
  }
  function kindFor(K, grown, plain) { var k = over(K, plain ? K.plain : null); if (grown) k = over(k, K.grown); return k; }
  function script(kinds, grown, plain) {
    var s = window.GG_GUIDED.maple, out = { voice: s.voice || 'jenny', tipSkip: s.tipSkip || [], kinds: {} };
    (kinds || Object.keys(s.kinds)).forEach(function (k) { if (s.kinds[k]) out.kinds[k] = kindFor(s.kinds[k], grown, plain); });
    return out;
  }
  // A Growing Edge answer: "Not really" on a forward question, "Yes, a lot" on a reverse one (guided.js 38).
  function isEdge(q, v) { var a = ansOf(v); if (!a || a[2] == null) return false; return q.rev ? a[2] === 3 : a[2] === 1; }
  function opts() { return CK().answers.map(function (a) { return { v: a[0], label: a[1] }; }); }
  // questions(), guided.js 44: one screen per question, parts in order, the grown-up tip as type in grown-up mode.
  function questions(grade, mode, wording, id) {
    var out = [], ids = lifeIds(id);
    PARTS.forEach(function (key) {
      qsFor(grade, key, wording).forEach(function (q, i) {
        var talk = mpTalk(key, i), ln = talk ? { ex: [], tip: [] } : mpNote(key, i, grade, ids);
        var help = mode === 'grown' ? 'Grown-up tip. ' + q[1] + ln.tip.map(function (x) { return ' ' + x; }).join('') : ln.ex.join(' ');
        out.push({ id: key + ':' + i, part: key, text: q[0], help: help, type: 'choice', options: opts(), noTip: !!talk, rev: q[2] === 'r' });
      });
    });
    return out;
  }

  /* ---------- the season, at save time (mpSeasonSync, maple/index.html 2326, and shared/gg-tend.js) ----------
     shared/gg-tend.js is one shared engine set up by a tree page (GGTend.init with that page's store and screens), so
     its two steps a check-in uses are ported here on kid.tend, line for line: ensure() (gg-tend.js 112 to 124) and
     onFullCheckin (741 to 746). The tree takes the step when it next opens: a first open records seenRings (and
     ensure() runs); each later check-in past seenRings calls onFullCheckin. Here the same two happen in that order. */
  function between(a, b) { return Math.round((keyDate(b) - keyDate(a)) / 86400000); }
  function weekNo(t) { if (!t.start) return 0; return Math.floor(Math.max(0, between(t.start, dkey())) / 7) + 1; }
  function history(kid) { return (kid.checkins || []).map(function (c) { return { date: dkey(new Date(c.date)), type: 'full' }; }); }   // mpInit history
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
  function tendOf(kid) { if (!kid.tend || typeof kid.tend !== 'object') kid.tend = {}; return kid.tend; }   // mpTendGet 2292

  /* ---------- the Before You Start screen (a form step in the same player) ---------- */
  // Shown on a fresh start: the mode, the grade the first time, and, with a grown-up, the wording (maple/index.html 853
  // to 885). Nothing on it is spoken (say: false), so it needs no clip.
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
    if (!id || !C || !window.GGGuided || !window.GG_GUIDED || !window.GG_GUIDED.maple || !vault(id)) return null;
    var cur = null, H = { close: function (q) { if (cur) cur.close(q); }, state: function () { return cur ? cur.state() : null; } };
    Object.defineProperty(H, 'el', { get: function () { return cur ? cur.el : null; } });
    var closed = function () { if (typeof ctx.onClose === 'function') { try { ctx.onClose(); } catch (e) {} } };
    var kid0 = peekKid(id), locked = plainLocked(kid0, id);
    var homeW = locked ? 'plain' : typeof ctx.plain === 'boolean' ? (ctx.plain ? 'plain' : 'faith') : kidWording(kid0, id);
    var d0 = kid0.draft;
    // A draft from older questions, or in another wording, starts fresh (restore, maple/guided.js 65).
    // A grown-up's wording pick on the start screen holds for that check-in; a lock always wins.
    var keep = isObj(d0) && d0.std === C.version && gradeKeys().indexOf(d0.grade) >= 0 && isObj(d0.answers)
      && (d0.wording === homeW || (!locked && d0.pickW === true)) && Object.keys(d0.answers).some(function (k) { return (d0.answers[k] || []).some(Boolean); });
    if (keep) { cur = checkin(ctx, H, d0, false); return H; }

    // A fresh start: the Before You Start screen, then the check-in.
    css();
    var savedGrade = gradeKeys().indexOf(String(kid0.grade || '')) >= 0 ? String(kid0.grade) : (function () { var c = kid0.checkins || [], l = c[c.length - 1]; return l && gradeKeys().indexOf(String(l.grade)) >= 0 ? String(l.grade) : null; })();
    var st = { mode: 'self', grade: savedGrade, pickW: null }, began = false;
    var form = {
      id: 'setup', type: 'form', aside: true, say: false, eb: 'Before You Start', text: "Let's check on your tree!", label: '', next: 'Start my check-in',
      html: function () {
        var h = '<span class="gck-lbl" id="gck-m">How are we doing this?</span><div class="gck-row" role="group" aria-labelledby="gck-m">'
          + btn('mode', 'self', st.mode === 'self', 'On my own', 'I can do it myself.')
          + btn('mode', 'grown', st.mode === 'grown', 'With a grown-up', 'A parent, guardian, or teacher is helping.') + '</div>';
        if (!savedGrade) h += '<span class="gck-lbl" id="gck-g">What grade are you in?</span><div class="gck-g" role="group" aria-labelledby="gck-g">'
          + C.grades.map(function (g) { return btn('grade', g[0], st.grade === g[0], g[0] === 'K' ? 'K' : g[0], g[0] === 'K' ? 'Kinder' : 'Grade'); }).join('') + '</div>';
        if (st.mode === 'grown' && !locked) {
          var w = st.pickW || homeW;
          h += '<span class="gck-lbl" id="gck-w">Grown-up, choose the wording</span><div class="gck-row" role="group" aria-labelledby="gck-w">'
            + btn('word', 'faith', w === 'faith', 'Faith', 'Prayer and faith as one door among several.')
            + btn('word', 'plain', w === 'plain', 'Plain', 'The same questions without religious words.') + '</div>'
            + '<p class="gck-note">Scores are the same either way. You can change it later in Settings.</p>';
        }
        return h + '<p class="gck-note">We read each question out loud, one at a time.</p>';
      },
      ready: function () { return st.grade ? '' : 'Pick your grade to start.'; }
    };
    cur = GGGuided.run({
      tree: 'maple', kind: 'setup', title: (kid0.checkins || []).length ? 'My Check-in' : 'My First Check-in', voice: 'jenny', kid: true, plain: homeW === 'plain',
      questions: [form], answers: {}, script: { voice: 'jenny', kinds: { setup: {} } }, quiet: C.quiet || undefined, noClose: true,
      onDone: function () {
        began = true;
        var kid = kidRec(id), wording = locked ? 'plain' : (st.mode === 'grown' && st.pickW) || homeW;
        var d = { mode: st.mode, grade: st.grade, std: C.version, wording: wording, pickW: st.mode === 'grown' && !!st.pickW, answers: {}, started: new Date().toISOString() };
        kid.draft = d;
        if (!savedGrade) kid.grade = st.grade;   // the grade is asked once and kept on the kid record
        GGP.save(id);
        cur = checkin(ctx, H, d, true);
      },
      onClose: function () { if (!began) closed(); }
    });
    if (cur && cur.el) cur.el.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-gck]'); if (!b) return;
      var k = b.getAttribute('data-gck'), v = b.getAttribute('data-val');
      if (k === 'mode') st.mode = v; else if (k === 'grade') st.grade = v; else if (k === 'word') st.pickW = v;
    }, true);   // before the player redraws the form (its own handler draws it again on the next tick)
    return H;
  }

  // The check-in itself, on the draft d (kid.draft): every answer saves into the draft, Done builds the record.
  function checkin(ctx, H, d, fresh) {
    var id = ctx.id, C = CK(), kid0 = peekKid(id);
    var kind = (kid0.checkins || []).length ? 'full' : 'start', grown = d.mode === 'grown', plain = d.wording === 'plain';
    var Q = questions(d.grade, d.mode, d.wording, id), A = {};
    PARTS.forEach(function (key) { (d.answers[key] || []).forEach(function (v, i) { if (v) A[key + ':' + i] = v; }); });
    var ended = '', saving = null;
    var put = function (qid, v) {
      var kid = kidRec(id), dd = kid.draft; if (!isObj(dd)) return;
      var c = qid.indexOf(':'), key = qid.slice(0, c), i = +qid.slice(c + 1), n = qsFor(dd.grade, key, dd.wording).length;
      var qa = Array.isArray(dd.answers[key]) ? dd.answers[key].slice() : [];
      while (qa.length < n) qa.push(null);
      qa[i] = v; dd.answers[key] = qa; GGP.save(id);
    };
    var finish = function () {
      var kid = kidRec(id), dd = isObj(kid.draft) ? kid.draft : d;
      // S.answers as put and sealPart leave it (guided.js 55 and 84, index.html 1888): a part with every answer is sealed.
      var answers = {};
      PARTS.forEach(function (key) {
        var qa = dd.answers[key]; if (!Array.isArray(qa)) return;
        var n = qsFor(dd.grade, key, dd.wording).length, all = qa.length >= n && qa.slice(0, n).every(Boolean);
        if (all) { var sc = partScore(dd.grade, key, qa, dd.wording); answers[key] = { qa: qa, score: sc, w: wxOf(sc), signs: [] }; }
        else answers[key] = { qa: qa };
      });
      // finishCheckin, maple/index.html 1923 to 1938.
      // kid.name: the profile's name (kidRec). The tree writes the typed name here (first letter capitalized), and its
      // next save writes the profile's name back (loadKids 1532), so the profile's name is what the record keeps.
      kid.grade = dd.grade;
      if (!plainLocked(kid, id) && (!kid.wording || dd.pickW)) kid.wording = dd.wording;
      var rec = { id: 'c' + Date.now(), date: new Date().toISOString(), grade: dd.grade, std: C.version, mode: dd.mode, wording: dd.wording, answers: clone(answers), plan: null };
      // The season step mpSeasonSync takes (2326 to 2334): a first open records seenRings, then this check-in counts.
      var t = tendOf(kid), n0 = kid.checkins.length;
      if (t.seenRings == null) { t.seenRings = n0; ensure(t, history(kid)); }
      kid.checkins.push(rec);
      delete kid.draft;
      var msg = null;
      if (kid.checkins.length > t.seenRings) { t.seenRings = kid.checkins.length; msg = onFullCheckin(t, history(kid), dkey(new Date(rec.date))); }
      saving = Promise.resolve(GGP.save(id)).then(function () {
        if (typeof ctx.onSaved === 'function') { try { ctx.onSaved(rec, { season: msg }); } catch (e) {} }
      });
    };
    var p = GGGuided.run({
      tree: 'maple', kind: kind, title: kind === 'start' ? 'My First Check-in' : 'My Check-in', voice: 'jenny', kid: true, plain: plain,
      questions: Q, answers: A, script: script([kind], grown, plain), isEdge: isEdge, quiet: C.quiet || undefined,
      onAnswer: put,
      onDone: function () { ended = 'done'; finish(); },
      onClose: function () {
        setTimeout(function () {
          var fin = function () { if (typeof ctx.onClose === 'function') { try { ctx.onClose(ended ? undefined : { draft: true }); } catch (e) {} } };
          if (saving) saving.then(fin, fin); else fin();
        }, 0);
      }
    });
    return p;
  }

  window.GGCheckin.maple = { files: FILES, kinds: ['full'], run: run };
})();
