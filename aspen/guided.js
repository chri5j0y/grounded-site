/* =====================================================================
   GROW WITH GROUNDED . ASPEN GUIDED CHECK-INS AND GUIDED GROWTH PLAN (aspen/guided.js), GWG BLD 886
   (c) 2026 Grow With Grounded LLC.
   Wires the shared player (shared/gg-guided.js, GGGuided.run) to Aspen's own check-in, weekly
   check-in, and Growth Plan. Loaded after the page's main script, so it reads the page's own state
   and helpers (me(), CK, PARTS, qsFor, save, finishCheckin, planDraft, savePlan, and the rest).
   Answers save through Aspen's own logic exactly as the classic form does:
     check-in   the student's draft (d.answers[part][i], saved on every answer, so it resumes), then
                finishCheckin() builds the ring, the leaves, the season, and Results
     week       GGTend.saveWeekAns(ans), the same save as the Save this week button
     plan       planDraft.picks, then savePlan() (the plan, its log, Today, the toast)
   Read It All closes the player and opens the classic form with the answers carried over.
   The voice reads the question text and the script's guide lines. The note for the grown-up (q[1])
   shows as type in grown-up mode and is never spoken. The quiet line (CK.quiet) shows as type only.
   Script overrides: kinds[k].grown when the mode is 'grown', kinds[k].plain when Plain is in use.
   ===================================================================== */
(function () {
  'use strict';
  if (window.ASGuided) return;
  const SC = () => (window.GG_GUIDED || {}).aspen;
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
  // A Growing Edge answer: "Not really" on a forward question, "Yeah, most of the time" on a reverse one.
  function isEdge(q, v) { const a = ANS[v]; if (!a || a[2] == null) return false; return q.rev ? a[2] === 3 : a[2] === 1; }
  const opts = () => ANSWERS.map(a => ({ v: a[0], label: a[1] }));
  const quiet = () => CK.quiet || undefined;
  const sensAt = (grade, key, i, sens) => { const x = sens && (CK.sensitive || {})[String(grade)]; return !!(x && x[0] === CK_KEY[key] && x[1] === i); };

  /* ---------- the full check-in (kinds start and full) ---------- */
  function questions(d, wording) {
    const out = [];
    PARTS.forEach(p => {
      qsFor(d.grade, p.key, d.sens, wording).forEach((q, i) => {
        const talk = asTalk(p.key, i), ln = talk ? { ex: [], tip: [] } : asNote(p.key, i, d.grade);
        const help = d.mode === 'grown' ? 'For the grown-up. ' + q[1] + ln.tip.map(x => ' ' + x).join('') : ln.ex.join(' ');
        out.push({ id: p.key + ':' + i, part: p.key, text: q[0], help, type: 'choice', options: opts(), noTip: !!talk || sensAt(d.grade, p.key, i, d.sens), rev: q[2] === 'r' });
      });
    });
    return out;
  }
  const stale = d => !d || d.std !== CK.version || (d.bank || 1) !== CK.bank;
  const anyAnswer = d => !!d && Object.keys(d.answers || {}).some(k => (d.answers[k] || []).some(Boolean));
  function firstOpenPage(s, d) {
    const wd = wordingOf(s);
    const i = PARTS.findIndex(p => { const qs = qsFor(d.grade, p.key, d.sens, wd), a = d.answers[p.key] || []; return qs.some((q, j) => !a[j]); });
    return i < 0 ? PARTS.length - 1 : i;
  }
  // The guided check-in on the student's draft (a new one starts when there is none).
  function checkin() {
    const s = me(); if (!s) { go('students'); return false; }
    if (!ok()) { if (s.draft) go('checkin'); else startCheckin(); return false; }
    if (!s.draft) { const sens = !!s.askSens && !!CK.sensitive[String(s.grade)]; s.draft = { step: 'intro', page: 0, mode: 'self', grade: s.grade, std: CK.version, bank: CK.bank, sens, answers: {}, started: new Date().toISOString() }; save(); }
    if (stale(s.draft)) { go('checkin'); return false; }   // the classic form starts an older draft fresh on the new questions
    const d = s.draft, wd = wordingOf(s), kind = s.rings.length ? 'full' : 'start';
    if (d.step !== 'parts') { d.step = 'parts'; d.page = d.page || 0; save(); }
    const A = {};
    PARTS.forEach(p => (d.answers[p.key] || []).forEach((v, i) => { if (v) A[p.key + ':' + i] = v; }));
    let ended = '';
    hush();
    GGGuided.run({
      tree: 'aspen', kind, title: kind === 'start' ? 'My First Check-in' : 'My Check-in', voice: 'jenny', kid: true,
      questions: questions(d, wd), answers: A, script: script([kind], d.mode === 'grown', wd === 'plain'), isEdge, quiet: quiet(),
      onAnswer: (id, v) => {
        const st = me(), dd = st && st.draft; if (!dd) return;
        const c = id.indexOf(':'), key = id.slice(0, c), i = +id.slice(c + 1), qs = qsFor(dd.grade, key, dd.sens, wordingOf(st));
        dd.answers[key] = dd.answers[key] || qs.map(() => null);
        dd.answers[key][i] = v; dd.step = 'parts'; dd.page = PARTS.findIndex(p => p.key === key); save();
      },
      onDone: () => {
        ended = 'done';
        const st = me(); if (!st || !st.draft) return;
        st.draft.step = 'parts'; st.draft.page = PARTS.length - 1; save();
        if (!document.getElementById('view-checkin').classList.contains('active')) go('checkin');
        finishCheckin();
      },
      onReadAll: () => { ended = 'read'; const st = me(); if (!st || !st.draft) return; st.draft.step = 'parts'; st.draft.page = firstOpenPage(st, st.draft); save(); go('checkin'); },
      onClose: () => setTimeout(() => { if (!ended && me() && me().draft) pauseCheckin(); }, 0)
    });
    return true;
  }
  // Pick up a check-in: guided when it has answers, else the start of the check-in (Before you start).
  function resume() { const s = me(); if (!s) return; if (s.draft && anyAnswer(s.draft) && !stale(s.draft)) checkin(); else if (s.draft) go('checkin'); else startCheckin(); }

  /* ---------- the weekly check-in (kind week) ---------- */
  function week() {
    const s = me(); if (!ok() || !s || !window.GGTend || !GGTend.weekQuestions) return false;
    const W = GGTend.weekQuestions(); if (!W) return false;
    if (!W.started) { GGTend.act('fullCheckin'); return true; }
    const g = String(s.grade || 6), bank = CK.getBank ? CK.getBank(g, wordingOf(s)) : (CK.questions[g] || {}), tags = (CK.weekly || {})[g] || {};
    const Q = W.questions.map(q => {
      const dot = q.id.indexOf('.'), key = dot < 0 ? q.id : q.id.slice(0, dot), sid = dot < 0 ? '' : q.id.slice(dot + 1), idx = !sid || sid === 'rest' ? 0 : tags[sid];
      const bq = (bank[key] || [])[idx] || [];
      return { id: q.id, part: key, text: q.t, type: 'choice', options: W.answers.map(a => ({ v: a[0], label: a[1] })), rev: bq[2] === 'r', noTip: !!asTalk(key, idx) };
    });
    const last = s.rings[s.rings.length - 1];
    GGGuided.run({
      tree: 'aspen', kind: 'week', title: "This Week's Check-in", voice: 'jenny', kid: true, questions: Q, answers: {},
      script: script(['week'], !!(last && last.mode === 'grown'), isPlain(s)), isEdge, quiet: quiet(),
      onDone: r => { if (ASP_TAB !== 'week') aspTab('week'); GGTend.saveWeekAns(r.answers); },
      onReadAll: ans => weekForm(ans)
    });
    return true;
  }
  // Read It All for the week: the Week tab's own form, with the answers chosen so far.
  function weekForm(ans) {
    aspTab('week');
    let box = document.getElementById('asp-week');
    if (box && !box.querySelector('.gt-wq') && GGTend.editWeek) { GGTend.editWeek(); box = document.getElementById('asp-week'); }
    if (box) box.querySelectorAll('.gt-opts [data-q][data-a]').forEach(b => { if (ans && ans[b.getAttribute('data-q')] === b.getAttribute('data-a')) GGTend.pick(b); });
    const f = box && box.querySelector('.gt-wq'); if (f) f.scrollIntoView({ block: 'start' });
  }
  // A Guided start for the Week tab's check-in, added to the card each time the Week tab draws its form.
  function weekButton() {
    const box = document.getElementById('asp-week'); if (!box || !ok()) return;
    const form = box.querySelector('.gt-wq'); if (!form || box.querySelector('.asg-week')) return;
    const row = document.createElement('div');
    row.className = 'btn-row asg-week';
    row.innerHTML = '<button type="button" class="btn btn-primary">Guided Check-in</button><span class="gt-small">We read each question out loud, one at a time.</span>';
    row.querySelector('button').addEventListener('click', week);
    form.parentNode.insertBefore(row, form);
  }
  // The student view redraws its panes, so the watch sits on the view itself.
  function watchWeek() {
    const v = document.getElementById('view-dash'); if (!v || v._asg) return;
    v._asg = new MutationObserver(weekButton); v._asg.observe(v, { childList: true, subtree: true }); weekButton();
  }

  /* ---------- the Guided Growth Plan (kind plan) ---------- */
  function planSteps(s, picks) {
    const g = s.grade, R = (window.GG_RHYTHM || {}).aspen || {}, plain = isPlain(s);
    const last = s.rings[s.rings.length - 1], sug = last ? lowestTwo(last) : [];
    const order = sug.concat(PARTS.map(p => p.key).filter(k => !sug.includes(k)));
    asLifeUse(s);
    return order.map(k => {
      const all = ((PRACTICES[g] || {})[k] || []).map((pr, i) => i);
      const isP = i => picks.some(p => !p.own && p.part === k && p.idx === i && p.grade === g);
      const chosen = all.filter(isP), open = aspOrder(g, k, all.filter(i => !isP(i)));
      const show = chosen.concat(open.slice(0, Math.max(0, 8 - chosen.length)));
      return { type: 'plan', part: k, max: 3, choices: show.map(i => {
        const name = prText(g, k, i, plain), r = R[k + '|' + name], L = learnRow(g, k, i, plain), pr = PRACTICES[g][k][i];
        return { name, idx: i, how: r && r.how ? undefined : (L ? String(L[1]).split('|') : []), min: r && r.min != null ? undefined : pr[1] };
      }) };
    });
  }
  // Lay the guided choices over the saved picks: a part's shown cards take the choices; own practices,
  // other grades' picks, and anything not shown stay as they are.
  function planMerge(s, picks, steps, picked) {
    const g = s.grade, out = clone(picks);
    steps.forEach(st => {
      if (!picked || !Object.prototype.hasOwnProperty.call(picked, st.part)) return;
      const shown = st.choices.map(c => c.idx), want = (picked[st.part] || []).map(n => (st.choices.filter(c => c.name === n)[0] || {}).idx).filter(i => i != null);
      for (let j = out.length - 1; j >= 0; j--) { const p = out[j]; if (!p.own && p.part === st.part && p.grade === g && shown.includes(p.idx) && !want.includes(p.idx)) out.splice(j, 1); }
      want.forEach(i => { if (!out.some(p => !p.own && p.part === st.part && p.grade === g && p.idx === i)) out.push({ part: st.part, idx: i, grade: g, added: Date.now() }); });
    });
    return out;
  }
  function plan() {
    const s = me(); if (!s) { go('students'); return false; }
    if (!ok()) { aspTab('plan'); return false; }
    if (!document.getElementById('view-dash').classList.contains('active')) go('dash');
    const picks = s.plan ? clone(s.plan.picks) : [], steps = planSteps(s, picks), cur = {}, picked = {};
    steps.forEach(st => { cur[st.part] = st.choices.filter(c => picks.some(p => !p.own && p.part === st.part && p.grade === s.grade && p.idx === c.idx)).map(c => c.name); });
    const last = s.rings[s.rings.length - 1];
    GGGuided.run({
      tree: 'aspen', kind: 'plan', title: 'My Growth Plan', voice: 'jenny', kid: true, questions: steps, plan: cur,
      script: script(['plan'], !!(last && last.mode === 'grown'), isPlain(s)), quiet: quiet(),
      onPlan: (part, names) => { picked[part] = names; },
      onDone: r => {
        const st = me(); if (!st) return;
        const next = planMerge(st, picks, steps, r.plan || picked);
        if (!next.length && !st.plan) { aspTab('plan'); toast('Pick 1 practice, and it will be waiting in Today.'); return; }
        planDraft = { sid: st.id, picks: next }; savePlan();
      },
      onReadAll: () => { const st = me(); if (!st) return; planDraft = { sid: st.id, picks: planMerge(st, picks, steps, picked) }; aspTab('plan'); }
    });
    return true;
  }

  /* ---------- every spoken line, for the recorder (GGGuided.lines with allKinds) ---------- */
  function recLines() {
    const qs = [], seen = {};
    ['faith', 'plain'].forEach(w => CK.grades.forEach(([g]) => [false, true].forEach(sens => PARTS.forEach(p => qsFor(g, p.key, sens, w).forEach((q, i) => {
      if (seen[q[0]]) return; seen[q[0]] = 1; qs.push({ id: g + ':' + p.key + ':' + i, part: p.key, text: q[0], type: 'choice', options: opts() });
    })))));
    const out = [], have = {};
    [[false, false], [true, false], [false, true], [true, true]].forEach(([grown, plain]) => {
      GGGuided.lines({ tree: 'aspen', allKinds: true, questions: qs, script: script(null, grown, plain) }).forEach(x => { const k = x.voice + '|' + x.text; if (!have[k]) { have[k] = 1; out.push(x); } });
    });
    return out;
  }

  /* ---------- ?guided=checkin, quick, or plan (The Grounded Way's tree sheet) ---------- */
  // The open student (or the only one on this device) gets that screen guided; otherwise the student list.
  function fromFlag() {
    const f = window.GGGuided && GGGuided.flag ? GGGuided.flag() : ''; if (!f) return;
    GGGuided.clearFlag();
    if (!me() && DB.students.length === 1) openStudent(DB.students[0].id);
    if (!me()) { go('students'); return; }
    if (f === 'plan') plan();
    else if (f === 'quick') { aspTab('week'); week(); }
    else if (me().draft) resume();
    else { startCheckin(); checkin(); }
  }

  window.ASGuided = { checkin, resume, week, weekForm, plan, recLines, script, ok };
  const boot = () => { watchWeek(); const go1 = () => setTimeout(fromFlag, 0); if (window.GGP && GGP.ready) GGP.ready.then(go1, go1); else go1(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
