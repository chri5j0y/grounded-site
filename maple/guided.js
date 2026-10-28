/* =====================================================================
   GROW WITH GROUNDED . MAPLE GUIDED CHECK-INS AND GUIDED GROWTH PLAN (maple/guided.js), GWG BLD 886
   (c) 2026 Grow With Grounded LLC.
   Wires the shared player (shared/gg-guided.js, GGGuided.run) to Maple's own check-in, weekly
   check-in, and Growth Plan. Loaded after the page's main script, so it reads the page's own state
   and helpers (S, CK, PARTS, qsFor, sealPart, finishCheckin, mpTendGet, mpPlanSave, and the rest).
   Answers save through Maple's own logic exactly as the classic form does:
     check-in   S.answers[part] = {qa}, sealPart(part) once a part is answered, then finishCheckin()
     week       GGTend.saveWeekAns(ans), the same save as the Save this week button
     plan       MP_PLAN[part].selected, then mpPlanSave() (GGTend.setPlan, Today, the toast)
   Read It All closes the player and opens the classic form with the answers carried over.
   The voice reads the question text and the script's guide lines. The grown-up tip (q[1]) shows as
   type in grown-up mode and is never spoken. The quiet kids line (CK.quiet) shows as type only.
   Script overrides: kinds[k].grown when S.mode is 'grown', kinds[k].plain when Plain is in use.
   Everything stays in memory and on this device, as in the classic form.
   ===================================================================== */
(function () {
  'use strict';
  if (window.MPGuided) return;
  const SC = () => (window.GG_GUIDED || {}).maple;
  const ok = () => !!(window.GGGuided && SC());
  const clone = x => JSON.parse(JSON.stringify(x));
  const isObj = x => !!x && typeof x === 'object' && !Array.isArray(x);

  /* the script for one run: the kind, with Plain and grown-up overrides laid over the same slots */
  function over(base, o) {
    const out = Object.assign({}, base); delete out.grown; delete out.plain;
    if (isObj(o)) Object.keys(o).forEach(k => { out[k] = isObj(o[k]) && isObj(base[k]) ? Object.assign({}, base[k], o[k]) : o[k]; });
    return out;
  }
  function kindFor(K, grown, plain) { let k = over(K, plain ? K.plain : null); if (grown) k = over(k, K.grown); return k; }
  function script(kinds, grown, plain) {
    const s = SC(), out = { voice: s.voice || 'jenny', tipSkip: s.tipSkip || [], kinds: {} };
    (kinds || Object.keys(s.kinds)).forEach(k => { if (s.kinds[k]) out.kinds[k] = kindFor(s.kinds[k], grown, plain); });
    return out;
  }
  // A Growing Edge answer: "Not really" on a forward question, "Yes, a lot" on a reverse one.
  function isEdge(q, v) { const a = ANS[v]; if (!a || a[2] == null) return false; return q.rev ? a[2] === 3 : a[2] === 1; }
  const opts = () => CK.answers.map(a => ({ v: a[0], label: a[1] }));
  const quiet = () => CK.quiet || undefined;

  /* ---------- the full check-in (kinds start and full) ---------- */
  let KEEP = null; // a guided check-in closed partway: kept in memory until this page closes, like the classic form
  function questions(grade, mode, wording, kid) {
    const out = [];
    PARTS.forEach(p => {
      qsFor(grade, p.key, wording).forEach((q, i) => {
        const talk = mpTalk(p.key, i), ln = talk || !kid ? { ex: [], tip: [] } : mpNote(p.key, i, kid);
        const help = mode === 'grown' ? 'Grown-up tip. ' + q[1] + ln.tip.map(x => ' ' + x).join('') : ln.ex.join(' ');
        out.push({ id: p.key + ':' + i, part: p.key, text: q[0], help, type: 'choice', options: opts(), noTip: !!talk, rev: q[2] === 'r' });
      });
    });
    return out;
  }
  function put(id, v) {
    const c = id.indexOf(':'), key = id.slice(0, c), i = +id.slice(c + 1), n = qsFor(S.grade, key).length;
    const qa = S.answers[key] && S.answers[key].qa ? S.answers[key].qa.slice() : [];
    while (qa.length < n) qa.push(null);
    qa[i] = v; S.answers[key] = { qa };
    if (qa.every(Boolean)) { sealPart(key); if (!S.done.includes(key)) S.done.push(key); }
  }
  const partOpen = key => { const qa = (S.answers[key] && S.answers[key].qa) || [], n = qsFor(S.grade, key).length; for (let i = 0; i < n; i++) if (!qa[i]) return true; return false; };
  function firstOpenStep() { const i = PARTS.findIndex(p => partOpen(p.key)); return i < 0 ? PARTS.length - 1 : i; }
  // Called by startCheckin once the child, grade, mode, and wording are set: a kept guided check-in picks up again.
  function restore() {
    if (!KEEP || KEEP.id !== kidId(S.name) || KEEP.grade !== S.grade || KEEP.wording !== curWording()) { KEEP = null; return; }
    S.answers = KEEP.answers; S.done = KEEP.done; S.step = firstOpenStep(); KEEP = null;
  }
  // Guided is the way a check-in starts. False when the player is missing (the classic form opens instead).
  function checkin() {
    if (!ok()) return false;
    const kid = loadKids()[kidId(S.name)];
    const kind = kid && kid.checkins && kid.checkins.length ? 'full' : 'start';
    const grown = S.mode === 'grown', plain = curWording() === 'plain';
    const Q = questions(S.grade, S.mode, curWording(), kid || { _pid: null }), A = {};
    PARTS.forEach(p => ((S.answers[p.key] && S.answers[p.key].qa) || []).forEach((v, i) => { if (v) A[p.key + ':' + i] = v; }));
    let ended = '';
    hush();
    GGGuided.run({
      tree: 'maple', kind, title: kind === 'start' ? 'My First Check-in' : 'My Check-in', voice: 'jenny', kid: true,
      questions: Q, answers: A, script: script([kind], grown, plain), isEdge, quiet: quiet(),
      onAnswer: put,
      onDone: () => {
        ended = 'done';
        PARTS.forEach(p => { if (!S.done.includes(p.key) && !partOpen(p.key)) { sealPart(p.key); S.done.push(p.key); } });
        S.step = PARTS.length - 1;
        finishCheckin('fruit');
      },
      onReadAll: () => { ended = 'read'; S.step = firstOpenStep(); go('checkin'); renderStep(true); },
      onClose: () => setTimeout(() => {
        if (ended) return;
        if (Object.keys(S.answers).length) { KEEP = { id: kidId(S.name), grade: S.grade, wording: curWording(), answers: clone(S.answers), done: S.done.slice() }; toast('We kept your answers. Tap Start my check-in to pick up where you left off.'); }
      }, 0)
    });
    return true;
  }

  /* ---------- the weekly check-in (kind week) ---------- */
  function weekQuestions() {
    const W = window.GGTend && GGTend.weekQuestions ? GGTend.weekQuestions() : null; if (!W) return null;
    const g = String((MP_KID && MP_KID.grade) || 'K'), bank = CK.getBank ? CK.getBank(g, curWording()) : (CK.questions[g] || {}), tags = (CK.weekly || {})[g] || {};
    W.qs = W.questions.map(q => {
      const dot = q.id.indexOf('.'), key = dot < 0 ? q.id : q.id.slice(0, dot), s = dot < 0 ? '' : q.id.slice(dot + 1), idx = !s || s === 'rest' ? 0 : tags[s];
      const bq = (bank[key] || [])[idx] || [];
      return { id: q.id, part: key, text: q.t, type: 'choice', options: W.answers.map(a => ({ v: a[0], label: a[1] })), rev: bq[2] === 'r', noTip: !!mpTalk(key, idx) };
    });
    return W;
  }
  function week() {
    if (!ok() || !MP_KID) return false;
    const W = weekQuestions(); if (!W) return false;
    if (!W.started) { GGTend.act('fullCheckin'); return true; }
    let ended = '';
    GGGuided.run({
      tree: 'maple', kind: 'week', title: "This Week's Check-in", voice: 'jenny', kid: true, questions: W.qs, answers: {},
      script: script(['week'], S.mode === 'grown', isPlain()), isEdge, quiet: quiet(),
      onDone: r => { ended = 'done'; if (S.treeTab !== 'week') mpTab('week'); GGTend.saveWeekAns(r.answers); },
      onReadAll: ans => { ended = 'read'; weekForm(ans); }
    });
    return true;
  }
  // Read It All for the week: the Week tab's own form, with the answers chosen so far.
  function weekForm(ans) {
    mpTab('week');
    let box = document.getElementById('mp-week');
    if (box && !box.querySelector('.gt-wq') && GGTend.editWeek) { GGTend.editWeek(); box = document.getElementById('mp-week'); }
    if (box) box.querySelectorAll('.gt-opts [data-q][data-a]').forEach(b => { if (ans && ans[b.getAttribute('data-q')] === b.getAttribute('data-a')) GGTend.pick(b); });
    const f = box && box.querySelector('.gt-wq'); if (f) f.scrollIntoView({ block: 'start' });
  }
  // A Guided start for the Week tab's check-in, added to the card each time the Week tab draws its form.
  function weekButton() {
    const box = document.getElementById('mp-week'); if (!box || !ok()) return;
    const form = box.querySelector('.gt-wq'); if (!form || box.querySelector('.mpg-week')) return;
    const row = document.createElement('div');
    row.className = 'btn-row mpg-week';
    row.innerHTML = '<button type="button" class="btn btn-primary">Guided Check-in</button><span class="gt-small">We read each question out loud, one at a time.</span>';
    row.querySelector('button').addEventListener('click', week);
    form.parentNode.insertBefore(row, form);
  }
  // The tree view redraws its panes, so the watch sits on the view itself.
  function watchWeek() {
    const v = document.getElementById('view-tree'); if (!v || v._mpg) return;
    v._mpg = new MutationObserver(weekButton); v._mpg.observe(v, { childList: true, subtree: true }); weekButton();
  }

  /* ---------- the Guided Growth Plan (kind plan) ---------- */
  function normPlan(P) {
    PARTS.forEach(p => { const x = P[p.key] = P[p.key] || {}; x.selected = x.selected || []; x.own = x.own || []; x.custom = x.custom || ''; if (x.custom) { x.own.push(x.custom); x.custom = ''; } });
    return P;
  }
  function planSteps(base) {
    const R = (window.GG_RHYTHM || {}).maple || {}, young = isK2(MP_KID.grade);
    const answers = (MP_KID.checkins[MP_KID.checkins.length - 1] || {}).answers || {};
    const sug = suggestedParts(answers), order = sug.concat(PARTS.map(p => p.key).filter(k => !sug.includes(k)));
    const life = mpLifeUse(MP_KID);
    return order.map(k => {
      const sel = base[k].selected;
      let acts = ACTIVITIES.filter(a => a.part === k);
      if (life && mpLifeOk()) acts = GGLife.order(acts, a => ({ life: a.life || [], adapt: a.adapt || '' }));
      const chosen = acts.filter(a => sel.includes(shownTitle(a))), open = acts.filter(a => !sel.includes(shownTitle(a)));
      const show = chosen.concat(open.slice(0, Math.max(0, 8 - chosen.length)));
      return { type: 'plan', part: k, max: 3, choices: show.map(a => { const w = actW(a), r = R[k + '|' + w.title]; return { name: w.title, how: r && r.how ? undefined : (young ? [w.k2] : w.g35) }; }) };
    });
  }
  // Lay the guided choices over the saved plan: a part's shown cards take the choices, anything else stays.
  function planMerge(base, steps, picked) {
    const P = clone(base);
    steps.forEach(st => {
      if (!picked || !Object.prototype.hasOwnProperty.call(picked, st.part)) return;
      const shown = st.choices.map(c => c.name);
      P[st.part].selected = P[st.part].selected.filter(n => !shown.includes(n)).concat(picked[st.part] || []);
    });
    return P;
  }
  function plan(id) {
    id = id || S.kid || kidId(S.name || '');
    const kid = loadKids()[id]; if (!kid) return false;
    if (S.kid !== id || !document.getElementById('view-tree').classList.contains('active')) openTree(id, 'today');
    if (!ok() || !MP_KID) { mpTab('plan'); return false; }
    const t = mpTendGet(), base = normPlan(clone((t && t.plan) || {})), steps = planSteps(base), cur = {}, picked = {};
    steps.forEach(st => { cur[st.part] = base[st.part].selected.filter(n => st.choices.some(c => c.name === n)); });
    let ended = '';
    GGGuided.run({
      tree: 'maple', kind: 'plan', title: 'My Growth Plan', voice: 'jenny', kid: true, questions: steps, plan: cur,
      script: script(['plan'], S.mode === 'grown', isPlain()), quiet: quiet(),
      onPlan: (part, names) => { picked[part] = names; },
      onDone: r => {
        ended = 'done';
        const P = planMerge(base, steps, r.plan || picked);
        const n = PARTS.reduce((s, p) => s + P[p.key].selected.length + P[p.key].own.length, 0);
        if (!n) { mpTab('plan'); toast('Pick 1 thing to practice, and it will be waiting in Today.'); return; }
        MP_PLAN = P; mpPlanSave();
      },
      onReadAll: () => { ended = 'read'; MP_PLAN = planMerge(base, steps, picked); mpTab('plan'); }
    });
    return true;
  }

  /* ---------- every spoken line, for the recorder (GGGuided.lines with allKinds) ---------- */
  function recLines() {
    const qs = [], seen = {};
    [false, true].forEach(plainW => CK.grades.forEach(([g]) => PARTS.forEach(p => qsFor(g, p.key, plainW ? 'plain' : 'faith').forEach((q, i) => {
      if (seen[q[0]]) return; seen[q[0]] = 1; qs.push({ id: g + ':' + p.key + ':' + i, part: p.key, text: q[0], type: 'choice', options: opts() });
    }))));
    const out = [], have = {};
    [[false, false], [true, false], [false, true], [true, true]].forEach(([grown, plain]) => {
      GGGuided.lines({ tree: 'maple', allKinds: true, questions: qs, script: script(null, grown, plain) }).forEach(x => { const k = x.voice + '|' + x.text; if (!have[k]) { have[k] = 1; out.push(x); } });
    });
    return out;
  }

  /* ---------- ?guided=checkin, quick, or plan (The Grounded Way's tree sheet) ---------- */
  // One child on this device: their screen opens guided. Otherwise the start screen, where Start is guided too.
  function fromFlag() {
    const f = window.GGGuided && GGGuided.flag ? GGGuided.flag() : ''; if (!f) return;
    GGGuided.clearFlag();
    const ids = mpKidIds(), id = ids.length === 1 ? ids[0] : null, k = id ? loadKids()[id] : null;
    if (!k) { go('home'); return; }
    if (f === 'plan') plan(id);
    else if (f === 'quick') { openTree(id, 'week'); if (!week()) mpTab('week'); }
    else { go('home'); $('kid-name').value = k.name; setGrade(k.grade || (k.checkins.length ? k.checkins[k.checkins.length - 1].grade : null)); if (S.grade) startCheckin(); }
  }

  window.MPGuided = { checkin, restore, week, weekForm, plan, recLines, script, watchWeek, ok };
  const boot = () => { watchWeek(); const go1 = () => setTimeout(fromFlag, 0); if (window.GGP && GGP.ready) GGP.ready.then(go1, go1); else go1(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
