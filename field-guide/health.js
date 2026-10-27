// =====================================================================
// GROUNDED FIELD GUIDE (TM): My Health (GWG BLD 840; rebuilt as a tool in BLD 841).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// A personal health journey for every level (Guides, Staff, Founders; Chris, October 24, 2026: "why not make as a
// courtesy in case others can benefit"). Whole food for the household, steady strength, heart health.
//
// Content rides in the sealed Guide library as FLD.healthJourney:
//   {v, title, lead, tagline, hero: {wide, narrow}, doctor, food: [{id, title, html}], fitness: [{id, title, html}],
//    today: {checks: [{id, label, sub}], week: {mon..sun: {move, food}}}}
// A Founder's own plan rides in the Founder library as FDR.healthMine:
//   {title, lead, food: [...], fitness: [...], start: {labs: [{date, ldl, total, hdl, trig, note}], weight, goalLdl, nextLabs}}
// and the second founder's as FDR.healthKayti (BLD 855, same shape, who: 'Kayti'; start.weightDate dates the starting weight;
// yNote adds a line to the Y evening card).
// Everything personal lives in DATA.health on this device, encrypted with the rest of the Field Guide's records and
// carried in the locked backup (merged by GGHealth.merge; deletions in DATA.deleted.health):
//   {set: {household, goals: [], goalLdl, start, nextLabs, u}, labs: [{id, date, ldl, total, hdl, trig, apob, note, u}],
//    marks: [{id, date, weight, waist, rhr, pushups, pullups, mile, energy, sleep, joint, u}],
//    days: {'YYYY-MM-DD': {checks: {id: true}, eat: [Today's Plate entries, BLD 861], u}}, notes: [{id, date, text, u}],
//    myFoods: [{id, name, per, nut, u}], supps: {list: [{id, name, when, note}], u}, eatUse: {key: {c, t}} (BLD 861),
//    panels: [{id, date, name, note, items: [{n, v, u, lo, hi}], u}]}  (full lab panels, shown with range bars)
// Library html is written by Grounded (sealed by the Founder); typed entries are always escaped.
// =====================================================================
(function(){
'use strict';
let C = {};
const S = {sec: 'today', form: null, setup: false, open: {}, ov: null};
const D = () => C.data ? C.data() : null;
// A Family Kitchen code (BLD 846): the kitchen only. Dinners, cook guide, grab and go, snacks, lists, prep, reminders.
const KIT = () => !!(C.tier && C.tier() === 'kitchen');
const FLDH = () => { const f = C.fld && C.fld(); const h = f && f.healthJourney; return h && (Array.isArray(h.food) || Array.isArray(h.fitness) || h.app) ? h : null; };
// BLD 855: each founder has a plan of their own: FDR.healthMine (Chris) and FDR.healthKayti (Kayti), same shape.
const PLANS = () => { const f = C.fdr && C.fdr(); return f ? [f.healthMine, f.healthKayti].filter(m => m && typeof m === 'object') : []; };
const MINE = () => { const ps = PLANS(); if (!ps.length) return null;
  // BLD 842: the Founder library is shared by both founders, so a named plan shows only on its owner's phone.
  const d = D(), who = d && d.health && d.health.set && d.health.set.who; return ps.find(m => m.who && who === m.who) || ps.find(m => !m.who) || null; };
const MINE_ANY = () => PLANS()[0] || null;
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const save = () => { if (C.save) C.save(); };
const toast = m => { if (C.toast) C.toast(m); };
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const pad = n => String(n).padStart(2, '0');
const ymd = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const today = () => ymd(new Date());
const arr = x => Array.isArray(x) ? x : [];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const nice = s => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || '')); return m ? MONTHS[+m[2] - 1] + ' ' + (+m[3]) + ', ' + m[1] : esc(s); };
const short = s => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || '')); return m ? MONTHS[+m[2] - 1].slice(0, 3) + ' ' + (+m[3]) : esc(s); };
const num = v => { if (v === '' || v == null) return null; const n = +v; return isFinite(n) ? n : null; };

function H(){
  const d = D(); if (!d) return null;
  const h = d.health = d.health && typeof d.health === 'object' ? d.health : {};
  h.set = h.set && typeof h.set === 'object' ? h.set : {};
  h.labs = arr(h.labs); h.marks = arr(h.marks); h.notes = arr(h.notes); h.panels = arr(h.panels); h.myFoods = arr(h.myFoods);
  h.days = h.days && typeof h.days === 'object' ? h.days : {};
  ['log', 'shop', 'lifts'].forEach(k => { h[k] = h[k] && typeof h[k] === 'object' && !Array.isArray(h[k]) ? h[k] : {}; }); h.wlog = arr(h.wlog);
  return h;
}
const byDate = (a, b) => String(a.date).localeCompare(String(b.date));
const labs = () => H().labs.slice().sort(byDate);
const marks = () => H().marks.slice().sort(byDate);

// Living Sober tie (BLD 851): one quiet line in Why It Works, linking to sleep, food, and movement while growing sober.
const SOBER = `<p class="hj-note">Growing sober, or walking with someone who is? Living Sober has <a href="https://growwithgrounded.com/living-sober.html#every-day" target="_blank" rel="noopener">sleep, food, and movement tips for early sobriety</a>.</p>`;

// ---------- defaults the library may replace ----------
const CHECKS = [
  {id: 'move', label: 'Moved with purpose', sub: 'Today\'s session, a walk, or the Y'},
  {id: 'walk', label: 'Time outdoors', sub: 'A walk, the dog, fresh air'},
  {id: 'still', label: 'Meditation', sub: '10 minutes, building to 20'},
  {id: 'fiber', label: 'Fiber at two meals', sub: 'Oats, beans, lentils, barley, fruit'},
  {id: 'plants', label: 'Five colors of plants', sub: 'Vegetables, fruit, nuts, seeds'},
  {id: 'water', label: 'Water through the day', sub: 'The family drink'},
  {id: 'rest', label: 'Seven hours of sleep', sub: 'Last night counts'}
];
const WEEK = {
  1: {move: 'Session A: Full Body Strength, then the Core Finisher', food: 'Dinner from Sunday prep'},
  2: {move: 'Session D: Core and Strength. Evening: the Y', food: 'Fish night'},
  3: {move: 'Session C: Power and Upper-Lower, then the Core Finisher', food: 'Wednesday mini prep, 20 minutes'},
  4: {move: 'Session D: Core and Strength. Evening: the Y', food: 'Plan next week, 10 minutes. Use-it-up night'},
  5: {move: 'Session B: Full Body Strength, then the Core Finisher', food: 'Write the list, 5 minutes. Fish night'},
  6: {move: 'Family hike or the Y when the weather is wild', food: 'Shop: warehouse club and your grocer'},
  0: {move: 'Rest, a long walk, or a family outing', food: 'Sunday prep, about 90 minutes'}
};
const GOALS = [['ldl', 'Lower my LDL'], ['strong', 'Build strength and muscle'], ['endure', 'More endurance and energy'], ['joints', 'Easier joints'], ['family', 'Eat well as a family']];

// ---------- pieces ----------
const kick = t => `<div class="hj-kick">${esc(t)}</div>`;
const chip = (sec, label) => `<button type="button" class="chip${S.sec === sec ? ' on' : ''}" aria-pressed="${S.sec === sec}" data-hja="sec" data-hjv="${sec}">${esc(label)}</button>`;
function hero(lib){
  const h = (lib && lib.hero) || {}, w = h.wide || '../shared/heroes/page-growth-wide.webp', n = h.narrow || '../shared/heroes/page-growth-narrow.webp';
  return `<div class="hj-hero"><picture><source media="(max-width:700px)" srcset="${esc(n)}"><img src="${esc(w)}" alt="" loading="lazy"></picture>
    <div class="hj-hin"><div class="hj-eb">Grow With Grounded</div><h2>${esc((lib && lib.title) || 'My Health')}</h2><p>${esc((lib && lib.tagline) || 'Whole food, steady strength, and a strong heart, one week at a time.')}</p></div></div>`;
}
function docBlocks(list, key){
  return arr(list).map((s, i) => {
    const id = key + ':' + (s.id || i), open = S.open[id];
    return `<details class="hj-doc"${open ? ' open' : ''} data-hjd="${esc(id)}"><summary><span>${esc(s.title || '')}</span></summary><div class="hj-body">${s.html || ''}</div></details>`;
  }).join('');
}

// ---------- sections ----------
function vToday(lib){
  const h = H(), t = today(), day = h.days[t] || {checks: {}}, checks = arr(lib.today && lib.today.checks).length ? lib.today.checks : CHECKS;
  const wk = (lib.today && lib.today.week) || WEEK, dow = new Date().getDay(), plan = wk[dow] || WEEK[dow];
  const done = checks.filter(c => day.checks && day.checks[c.id]).length;
  // This week: days with at least four checks.
  const start = new Date(); start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  let strong = 0; for (let i = 0; i < 7; i++){ const d = new Date(start); d.setDate(start.getDate() + i); const x = h.days[ymd(d)]; if (x && Object.values(x.checks || {}).filter(Boolean).length >= 4) strong++; }
  const L = labs(), last = L[L.length - 1], first = L[0], goal = num(h.set.goalLdl);
  return `
  <div class="hj-g2">
    <div class="hj-blk">${kick('Today')}<h3>${esc(new Date().toLocaleDateString(undefined, {weekday: 'long', month: 'long', day: 'numeric'}))}</h3>
      <p class="hj-sub"><b>Move:</b> ${esc(plan.move)}<br><b>Food:</b> ${esc(plan.food)}</p>
      <div class="hj-checks">${checks.map(c => { const on = !!(day.checks && day.checks[c.id]); return `<button type="button" class="hj-ck${on ? ' on' : ''}" aria-pressed="${on}" data-hja="check" data-hjv="${esc(c.id)}"><span class="box">${on ? '&#10003;' : ''}</span><span><b>${esc(c.label)}</b><small>${esc(c.sub || '')}</small></span></button>`; }).join('')}</div>
      <p class="hj-sub" style="margin-top:10px">${done} of ${checks.length} today. ${strong} strong day${strong === 1 ? '' : 's'} this week.</p>
    </div>
    <div class="hj-blk">${kick('My Numbers')}
      ${last ? `<div class="hj-big">${esc(last.ldl != null ? last.ldl : '...')}</div><p class="hj-sub">LDL on ${nice(last.date)}${goal ? `. Goal: ${esc(goal)}.` : ''}${first && last !== first && first.ldl && last.ldl ? ` ${first.ldl > last.ldl ? 'Down' : 'Up'} ${Math.abs(Math.round((first.ldl - last.ldl) / first.ldl * 100))}% since ${short(first.date)}.` : ''}</p>${chart(L, goal)}`
        : `<p class="hj-sub">Add your first lab results to see your journey.</p>`}
      ${h.set.nextLabs ? `<p class="hj-sub">Next labs: ${nice(h.set.nextLabs)}.</p>` : ''}
      <div class="row"><button type="button" class="btn btn-gold btn-sm" data-hja="sec" data-hjv="numbers">Add Numbers</button><button type="button" class="btn btn-line btn-sm" data-hja="sec" data-hjv="journey">Write in My Journey</button></div>
    </div>
  </div>
  ${lib.doctor ? `<p class="hj-note">${esc(lib.doctor)}</p>` : ''}`;
}
function chart(L, goal){
  const pts = L.filter(x => num(x.ldl) != null); if (pts.length < 1) return '';
  const vals = pts.map(x => +x.ldl).concat(goal ? [goal] : []), hi = Math.max(...vals) * 1.08, lo = Math.max(0, Math.min(...vals) * 0.85);
  const W = 320, Ht = 120, x = i => pts.length === 1 ? W / 2 : 16 + i * (W - 32) / (pts.length - 1), y = v => 10 + (hi - v) / (hi - lo || 1) * (Ht - 30);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(+p.ldl).toFixed(1)).join(' ');
  return `<svg class="hj-chart" viewBox="0 0 ${W} ${Ht}" role="img" aria-label="LDL over time">
    ${goal ? `<line x1="0" x2="${W}" y1="${y(goal).toFixed(1)}" y2="${y(goal).toFixed(1)}" class="g"/><text x="${W - 4}" y="${(y(goal) - 4).toFixed(1)}" text-anchor="end" class="t">Goal ${esc(goal)}</text>` : ''}
    <path d="${line}" class="l"/>${pts.map((p, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(+p.ldl).toFixed(1)}" r="4" class="p"/><text x="${x(i).toFixed(1)}" y="${Ht - 4}" text-anchor="middle" class="t">${short(p.date)}</text>`).join('')}</svg>`;
}
// ---------- BLD 860: My LDL Path. Where the food plan can take LDL, lever by lever, and about how long to 100 ----------
// Chris, October 27, 2026: "show me a chart that estimates all my changes to reduce LDLs and lets estimate how long it will take to get sub 100".
// The model (research-informed estimates for a talk with a doctor; the person's own labs always lead):
//   Baseline B: the latest lab LDL on or before the plan start, startMon() (else the first lab).
//   Each lever i has a full effect e_i (central, low, high) as a share of the LDL that remains, an adherence a_i, and a ramp r_i(t),
//   with t in weeks from the plan start: LDL(t) = B x product over levers of (1 - e_i x a_i x r_i(t)).
//   r_i(t) = 1 - exp(-t / 2.5). Psyllium also eases in by dose: week 1 at 25 percent, week 2 at 50 percent, week 3 on in full.
//   Adherence: psyllium, sterols, and nuts are the share of the last 14 days checked (today counts once it is checked; BLD 861: one of
//   the two morning and evening My Supplements checks counts half); saturated fat is the share of days logged on Today's Plate at or
//   under the saturated fat target (BLD 861);
//   movement is planned workouts or practices done in the last 14 days; the other food levers, and any lever with fewer
//   than 7 days of data, use 0.85.
//   Lines: Central (central effects, current adherence), Best (high effects, full adherence), Careful (low effects, current adherence).
//   Calibration: with a lab after the start, every line is scaled by measured / Central at that lab. The scale eases in from 1 at
//   the start to the full ratio at the lab, so the path runs through the measured number and keeps that ratio ahead.
//   Medicine scenario: from today, a further 40 percent (30 to 50) on top of the Central line, on the same 2.5 week time course.
//   Lever bars: each lever's share of the full drop, split by log(1 - e_i x a_i), so the bars add up to the whole drop.
const LDL_TAU = 2.5, LDL_ASSUME = 0.85, LDL_MED = [0.40, 0.30, 0.50], LDL_GOAL = 100;
const LDL_LV = [
  {id: 'satfat', t: 'Saturated Fat Swap', sub: 'Soy milk in coffee, the whole food plan', e: [0.12, 0.08, 0.15], src: 'Mensink RP, "Effects of saturated fatty acids on serum lipids and lipoproteins", World Health Organization, 2016'},
  {id: 'psyllium', t: 'Psyllium', sub: 'About 10 g a day', e: [0.07, 0.05, 0.09], ck: 'psyllium', dose: 1, src: 'Jovanovski E and others, American Journal of Clinical Nutrition, 2018'},
  {id: 'sterols', t: 'Plant Sterols', sub: 'About 2 g a day', e: [0.085, 0.06, 0.10], ck: 'sterols', src: 'Gylling H and others, Atherosclerosis, 2014'},
  {id: 'oats', t: 'Oats and Barley', sub: 'About 3 g of beta-glucan a day', e: [0.05, 0.03, 0.07], src: 'Ho HVT and others, British Journal of Nutrition, 2016'},
  {id: 'nuts', t: 'Nuts', sub: 'About 1.5 oz a day', e: [0.045, 0.03, 0.06], ck: 'nuts', src: 'Del Gobbo LC and others, American Journal of Clinical Nutrition, 2015'},
  {id: 'soy', t: 'Soy Milk', sub: 'Soy protein', e: [0.02, 0.01, 0.04], src: 'Blanco Mejia S and others, Journal of Nutrition, 2019'},
  {id: 'move', t: 'Movement', sub: 'Strength and walks', e: [0.02, 0, 0.04], mv: 1, src: 'Source unknown'}
];
// A per-person override (BLD 860, the lead for Chris): coming off keto with heavy cream in coffee (28 to 40 g of saturated fat a day
// from cream alone, toward a plan of 13 to 15 g a day), the saturated fat lever is larger for that plan's owner.
const SATFAT_BIG = {who: 'Chris', central: 0.18, low: 0.12, high: 0.28, note: 'Coming off keto, this change is often larger'};
const ldlE = lv => { const m = MINE(); return lv.id === 'satfat' && m && m.who === SATFAT_BIG.who ? [SATFAT_BIG.central, SATFAT_BIG.low, SATFAT_BIG.high] : lv.e; };
const ldlNote = lv => { const m = MINE(); return lv.id === 'satfat' && m && m.who === SATFAT_BIG.who ? SATFAT_BIG.note : ''; };
const LDL_MED_SRC = 'Grundy SM and others, "2018 AHA/ACC Guideline on the Management of Blood Cholesterol", Circulation, 2019';
function ldlAdh(){
  const h = H(), lib = FLDH(), mine = MINE(), t0 = day0(new Date()), tk = ymd(t0), s0 = startMon();
  const have = new Set((arr(lib && lib.today && lib.today.checks).length ? lib.today.checks : CHECKS).concat(arr(mine && mine.checks)).map(c => c.id));
  const from = new Date(Math.max(+s0, +addD(t0, -13))), days = [];
  for (let d = new Date(from); d <= t0; d = addD(d, 1)) days.push(d);
  // BLD 861: a day's share can be a half (one of the two My Supplements checks for a lever).
  const share = on => { const kept = days.filter(d => ymd(d) !== tk || on(d) > 0); if (kept.length < 7) return {a: LDL_ASSUME, est: 1};
    return {a: kept.reduce((s, d) => s + on(d), 0) / kept.length, est: 0, n: kept.length}; };
  const out = {}, sp = supps(), hiSf = tHi(targets().sf) || 15;
  LDL_LV.forEach(lv => {
    // BLD 861: Today's Plate. The saturated fat lever is the share of logged days at or under the target (today counts once it is past it).
    if (lv.id === 'satfat'){ const L = days.filter(d => { const t = totals(ymd(d)); return t.n > 0 && (ymd(d) !== tk || t.sf > hiSf); });
      out[lv.id] = L.length < 7 ? {a: LDL_ASSUME, est: 1} : {a: L.filter(d => totals(ymd(d)).sf <= hiSf).length / L.length, est: 0, n: L.length}; }
    else if (lv.ck && (have.has(lv.ck) || sp.some(s => lever(s) === lv.ck))) out[lv.id] = share(d => leverDay(ymd(d), lv.ck));
    else if (lv.mv){
      const did = d => { const k = ymd(d); return Object.keys(h.log[k] || {}).some(x => /^(work:|prac)/.test(x)) || h.wlog.some(w => w.date === k); };
      const plan = d => agenda(d).some(x => x.k === 'work' || x.k === 'prac');
      const pd = days.filter(d => plan(d) && (ymd(d) !== tk || did(d)));
      out[lv.id] = days.length < 7 || pd.length < 4 ? {a: LDL_ASSUME, est: 1} : {a: Math.min(1, days.filter(did).length / pd.length), est: 0, n: pd.length};
    } else out[lv.id] = {a: LDL_ASSUME, est: 1};
  });
  return out;
}
function ldlModel(){
  const L = labs().filter(x => num(x.ldl) != null && parseD(x.date)); if (!L.length) return null;
  const s0 = startMon(), sk = ymd(s0), wk = d => (day0(d) - s0) / (7 * DAYMS);
  const base = L.filter(x => x.date <= sk).pop() || L[0], B = +base.ldl, adh = ldlAdh();
  const ramp = (lv, t) => t <= 0 ? 0 : (1 - Math.exp(-t / LDL_TAU)) * (lv.dose ? (t < 1 ? 0.25 : t < 2 ? 0.5 : 1) : 1);
  const K = {c: 0, k: 1, b: 2}, raw = (t, k) => B * LDL_LV.reduce((p, lv) => p * (1 - ldlE(lv)[K[k]] * (k === 'b' ? 1 : adh[lv.id].a) * ramp(lv, t)), 1);
  const tNow = Math.max(0, wk(new Date()));
  const after = L.filter(x => x.date > sk && x !== base), cal = after.length ? after[after.length - 1] : null;
  const tL = cal ? Math.max(1 / 7, wk(parseD(cal.date))) : 0, pred = cal ? raw(tL, 'c') : 0, ratio = cal ? +cal.ldl / pred : 1;
  const kf = t => !cal ? 1 : t >= tL ? ratio : 1 + (ratio - 1) * t / tL;
  const f = (t, k) => raw(t, k) * kf(t);
  const med = (t, m) => t < tNow ? null : f(t, 'c') * (1 - (m == null ? LDL_MED[0] : m) * (1 - Math.exp(-(t - tNow) / LDL_TAU)));
  const cross = fn => { for (let t = 0; t <= 156; t += 0.1){ const v = fn(t); if (v != null && v <= LDL_GOAL) return t; } return null; };
  const level = f(520, 'c'), drop = B * ratio - level;
  const lns = LDL_LV.map(lv => Math.log(1 - ldlE(lv)[0] * adh[lv.id].a)), lsum = lns.reduce((a, b) => a + b, 0) || 1;
  const levers = LDL_LV.map((lv, i) => ({lv, a: adh[lv.id], mg: drop * lns[i] / lsum})).sort((a, b) => b.mg - a.mg);
  const pts = L.map(x => ({x, t: x === base ? 0 : wk(parseD(x.date))})).filter(p => p.x === base || p.t > 0);
  const maxW = Math.min(104, Math.max(26, Math.ceil((tNow + 6) / 2) * 2, cal ? Math.ceil((tL + 4) / 2) * 2 : 0));
  return {B, base, s0, tNow, cal, pred, ratio, f, med, level, best: f(520, 'b'), careful: f(520, 'k'), now: f(tNow, 'c'),
    tC: cross(t => f(t, 'c')), tM: cross(t => med(t)), medLevel: med(520), levers, pts, maxW, drop,
    dateAt: t => addD(s0, Math.round(t * 7))};
}
const r0 = v => Math.round(v);
const wkDate = (m, t) => short(ymd(m.dateAt(t)));
function ldlRows(m){
  const rows = [];
  for (let t = 0; t <= m.maxW; t++){ const md = m.med(t), lab = m.pts.find(p => Math.round(p.t) === t);
    rows.push({t, date: wkDate(m, t), c: r0(m.f(t, 'c')), b: r0(m.f(t, 'b')), k: r0(m.f(t, 'k')), m: md == null ? null : r0(md), lab: lab ? {v: +lab.x.ldl, date: short(lab.x.date)} : null}); }
  return rows;
}
function ldlSvg(m){
  const phone = (window.innerWidth || 390) < 560, W = Math.round(Math.max(300, Math.min(720, (window.innerWidth || 390) - 72))), Ht = phone ? 270 : 310;
  const pl = 34, pr = phone ? 82 : 108, pt = 24, pb = 40, pw = W - pl - pr, ph = Ht - pt - pb;
  const all = [m.B, m.medLevel, m.best, LDL_GOAL].concat(m.pts.map(p => +p.x.ldl));
  const lo = Math.max(0, Math.floor((Math.min(...all) - 12) / 20) * 20), hi = Math.ceil((Math.max(...all) + 8) / 20) * 20;
  const x = t => pl + Math.max(0, Math.min(m.maxW, t)) / m.maxW * pw, y = v => pt + (hi - v) / (hi - lo) * ph, f1 = n => n.toFixed(1);
  const path = fn => { let d = '', on = false; for (let t = 0; t <= m.maxW + 1e-9; t += 0.25){ const v = fn(t); if (v == null){ on = false; continue; } d += (on ? 'L' : 'M') + f1(x(t)) + ' ' + f1(y(v)); on = true; } return d; };
  const band = (() => { let a = [], b = []; for (let t = 0; t <= m.maxW + 1e-9; t += 0.25){ a.push(f1(x(t)) + ' ' + f1(y(m.f(t, 'k')))); b.unshift(f1(x(t)) + ' ' + f1(y(m.f(t, 'b')))); } return 'M' + a.join('L') + 'L' + b.join('L') + 'Z'; })();
  const step = hi - lo > 140 ? 40 : 20, ticks = [];
  for (let v = lo; v <= hi; v += step) if ([100, 130].every(s => v === s || Math.abs(v - s) >= 15)) ticks.push(v);
  [100, 130].forEach(v => { if (v > lo && v < hi && !ticks.includes(v)) ticks.push(v); });
  const xs = []; for (let t = 0; t <= m.maxW; t += phone ? (m.maxW > 30 ? 8 : 4) : (m.maxW > 30 ? 4 : 2)) xs.push(t);
  // End labels on the right: nudged apart with a short leader when two would touch.
  const ends = [['c', phone ? 'Plan' : 'Food plan', m.f(m.maxW, 'c')], ['b', 'Best', m.f(m.maxW, 'b')], ['k', 'Careful', m.f(m.maxW, 'k')], ['m', 'Medicine', m.med(m.maxW)]].map(([k, l, v]) => ({k, l: l + ' ' + r0(v), y0: y(v), y: y(v)})).sort((a, b) => a.y - b.y);
  for (let i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 13) ends[i].y = ends[i - 1].y + 13;
  const xe = x(m.maxW), tx = x(m.tNow);
  const desc = `LDL path from ${r0(m.B)}. Estimate now ${r0(m.now)}. The food plan levels off near ${r0(m.level)}, with a range from ${r0(m.best)} to ${r0(m.careful)}.${m.tC != null ? ` It reaches 100 near week ${Math.ceil(m.tC)}.` : ''} With a medicine, ${m.tM != null ? `100 near week ${Math.ceil(m.tM)}` : `about ${r0(m.medLevel)}`}.`;
  S.lp = {W, pl, pw, maxW: m.maxW, x0: x, rows: ldlRows(m)};
  return `<div class="hj-lpw"><svg class="hj-lpsvg" viewBox="0 0 ${W} ${Ht}" width="${W}" height="${Ht}" role="img" tabindex="0" aria-label="${esc(desc)}">
    ${ticks.map(v => `<line x1="${pl}" x2="${f1(pl + pw)}" y1="${f1(y(v))}" y2="${f1(y(v))}" class="${v === 100 ? 'tg' : 'gr'}"/><text x="${pl - 6}" y="${f1(y(v) + 4)}" text-anchor="end" class="ax">${v}</text>`).join('')}
    ${100 > lo && 100 < hi ? `<text x="${pl + 6}" y="${f1(y(100) - 6)}" class="tl">Target 100</text>` : ''}
    <line x1="${pl}" x2="${f1(pl + pw)}" y1="${f1(pt + ph)}" y2="${f1(pt + ph)}" class="bs"/>
    ${xs.map(t => `<text x="${f1(x(t))}" y="${f1(pt + ph + 16)}" text-anchor="middle" class="ax">${t}</text>`).join('')}
    <text x="${f1(pl + pw / 2)}" y="${Ht - 4}" text-anchor="middle" class="ax">Weeks on the plan</text>
    <path d="${band}" class="bd"/>
    ${m.tNow > 0 ? `<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${pt - 6}" y2="${f1(pt + ph)}" class="td"/><text x="${f1(tx)}" y="${pt - 10}" text-anchor="${tx > pl + pw - 30 ? 'end' : 'start'}" class="ax">Today</text>` : ''}
    <path d="${path(t => m.f(t, 'c'))}" class="lc"/>
    <path d="${path(t => m.med(t))}" class="lm"/>
    ${m.pts.map(p => `<circle cx="${f1(x(p.t))}" cy="${f1(y(+p.x.ldl))}" r="4.5" class="lab"/>`).join('')}
    ${ends.map(e => `${Math.abs(e.y - e.y0) > 3 ? `<line x1="${f1(xe + 2)}" x2="${f1(xe + 7)}" y1="${f1(e.y0)}" y2="${f1(e.y - 4)}" class="ld"/>` : ''}<text x="${f1(xe + 8)}" y="${f1(e.y + 4)}" class="el${e.k === 'c' ? ' on' : ''}">${esc(e.l)}</text>`).join('')}
    <line class="xh" x1="0" x2="0" y1="${pt}" y2="${f1(pt + ph)}" visibility="hidden"/>
    <rect class="hit" x="${pl}" y="${pt}" width="${f1(pw)}" height="${f1(ph)}"/>
  </svg><div class="hj-lptip" hidden></div></div>`;
}
function ldlTable(m){
  const rows = S.lp ? S.lp.rows : ldlRows(m), shown = rows.filter(r => r.t % 2 === 0 || r.lab || r.t === Math.round(m.tNow));
  return `<div class="hj-tw"><table class="hj-tbl hj-lptbl"><thead><tr><th>Week</th><th>Date</th><th>Estimate</th><th>Careful to Best</th><th>With a Medicine</th><th>Lab</th></tr></thead><tbody>
    ${shown.map(r => `<tr><td>${r.t}</td><td>${esc(r.date)}</td><td><b>${r.c}</b></td><td>${r.b} to ${r.k}</td><td>${r.m == null ? '' : r.m}</td><td>${r.lab ? `${r.lab.v}<small>${esc(r.lab.date)}</small>` : ''}</td></tr>`).join('')}</tbody></table></div>
    <div class="hj-tw"><table class="hj-tbl"><thead><tr><th>Lever</th><th>Takes Off (mg/dL)</th><th>Days on Track</th></tr></thead><tbody>
    ${m.levers.map(x => `<tr><td>${esc(x.lv.t)}<small>${esc(x.lv.sub)}${ldlNote(x.lv) ? '. ' + esc(ldlNote(x.lv)) + '.' : ''}</small></td><td><b>${r0(x.mg)}</b></td><td>${r0(x.a.a * 100)}%${x.a.est ? ' (estimated)' : ''}</td></tr>`).join('')}</tbody></table></div>`;
}
function ldlPath(){
  const m = ldlModel();
  if (!m) return `<div class="hj-blk">${kick('My LDL Path')}<p class="hj-sub">Add your lab numbers to see your LDL path and about how long to 100.</p></div>`;
  const wkLine = (t, who) => `${who} reaches 100 near week ${Math.ceil(t)}, around ${esc(wkDate(m, t))}.`;
  const tile = (l, v, s) => `<div class="hj-lpk"><small>${esc(l)}</small><b>${v}</b>${s ? `<span>${esc(s)}</span>` : ''}</div>`;
  const maxMg = Math.max(...m.levers.map(x => x.mg), 1);
  const srcs = LDL_LV.map(lv => `${lv.t}: ${lv.src}.`).concat(`Medicine estimate: ${LDL_MED_SRC}.`).join(' ');
  return `<div class="hj-blk hj-lp">${kick('My LDL Path')}
    <div class="hj-lpks">${tile('Start', r0(m.B), short(m.base.date))}${tile('Estimate now', r0(m.now), m.tNow > 0 ? 'week ' + Math.floor(m.tNow) : 'plan start')}${tile('Food plan levels off near', r0(m.level), r0(m.best) + ' to ' + r0(m.careful))}${tile('Target', LDL_GOAL, '')}</div>
    <p class="hj-sub">${m.tC != null ? wkLine(m.tC, 'The food plan estimate') : `Food changes alone level off near ${r0(m.level)}.`} ${m.tM != null ? wkLine(m.tM, 'With a medicine, the estimate') : `With a medicine, the estimate levels off near ${r0(m.medLevel)}.`}</p>
    ${m.cal ? `<p class="hj-sub hj-lpcal">Fitted to your lab on ${esc(short(m.cal.date))} (${r0(+m.cal.ldl)}; the estimate for that day was ${r0(m.pred)}), so the path ahead runs through your measured number.</p>` : ''}
    ${m.B >= 190 ? `<p class="hj-note">An LDL of 190 or above is a reason to talk with your doctor about a medicine alongside these changes. The food plan keeps working either way.</p>` : ''}
    <div class="hj-lpleg" aria-hidden="true"><span><i class="k-c"></i>Food plan estimate</span><span><i class="k-b"></i>Careful to Best range</span><span><i class="k-m"></i>If your doctor adds a medicine</span><span><i class="k-l"></i>Your labs</span></div>
    ${S.lpTable ? ldlTable(m) : ldlSvg(m)}
    <button type="button" class="btn btn-line btn-sm" data-hja="lptable" aria-pressed="${!!S.lpTable}">${S.lpTable ? 'View as Chart' : 'View as Table'}</button>
    ${S.lpTable ? '' : `<div class="hj-kick" style="margin-top:16px">What Each Lever Takes Off</div><p class="hj-sub">mg/dL at full effect, with your days on track over the last two weeks. Together about ${r0(m.drop)}.</p>
    <div class="hj-lvs">${m.levers.map(x => `<div class="hj-lvr"><div class="hj-lvt"><b>${esc(x.lv.t)}</b><small>${r0(x.a.a * 100)}% of days${x.a.est ? ', estimated' : ''}</small></div><div class="hj-lvb"><span style="width:${(x.mg / maxMg * 72).toFixed(1)}%"></span><em>${r0(x.mg)} mg/dL</em></div>${ldlNote(x.lv) ? `<p class="hj-lvn">${esc(ldlNote(x.lv))}.</p>` : ''}</div>`).join('')}</div>`}
    <p class="hj-sub" style="font-size:14px">Research-informed estimates to talk over with your doctor. Your labs tell the real story, and each new lab refits the path.</p>
    <p class="hj-src">Sources: ${esc(srcs)}</p>
  </div>`;
}
function ldlSum(){
  if (!MINE()) return ''; const m = ldlModel(); if (!m) return '';
  return `<small class="hj-lps">My LDL Path: about ${r0(m.now)} now${m.tC != null ? `, 100 near week ${Math.ceil(m.tC)}` : `, leveling near ${r0(m.level)}`}. Target 100.</small>`;
}
function lpHover(svg, wkv){
  const L = S.lp, wrap = svg.parentNode, tip = wrap && wrap.querySelector('.hj-lptip'), xh = svg.querySelector('.xh'); if (!L || !tip || !xh) return;
  if (wkv == null){ tip.hidden = true; xh.setAttribute('visibility', 'hidden'); return; }
  const t = Math.max(0, Math.min(L.maxW, Math.round(wkv))), r = L.rows[t]; if (!r) return; S.lpAt = t;
  const xv = L.x0(t); xh.setAttribute('x1', xv); xh.setAttribute('x2', xv); xh.setAttribute('visibility', 'visible');
  tip.textContent = '';
  const add = (cls, val, lab) => { const d = document.createElement('div'), i = document.createElement('i'), b = document.createElement('b'), s = document.createElement('span'); if (cls) i.className = cls; b.textContent = val; s.textContent = lab; d.append(i, b, s); tip.appendChild(d); };
  const hd = document.createElement('div'); hd.className = 'hd'; hd.textContent = 'Week ' + r.t + ' · ' + r.date; tip.appendChild(hd);
  add('k-c', String(r.c), 'Food plan estimate'); add('k-b', r.b + ' to ' + r.k, 'Careful to Best');
  if (r.m != null) add('k-m', String(r.m), 'With a medicine');
  if (r.lab) add('k-l', String(r.lab.v), 'Lab on ' + r.lab.date);
  tip.hidden = false;
  const rc = svg.getBoundingClientRect(), px = xv / L.W * rc.width, tw = tip.offsetWidth || 170;
  tip.style.left = Math.max(0, Math.min(rc.width - tw, px > rc.width / 2 ? px - tw - 12 : px + 12)) + 'px';
}
const lpWeekAt = (svg, cx) => { const L = S.lp, rc = svg.getBoundingClientRect(); if (!L || !rc.width) return null; const px = (cx - rc.left) * L.W / rc.width; return (px - L.pl) / L.pw * L.maxW; };
function vPlan(lib, key){
  const mine = MINE(), hh = num(H().set.household);
  const scale = key === 'food' && hh && hh !== 6 ? `<p class="hj-note">Costs and amounts are for a household of six. For ${hh}, multiply by about ${(hh / 6).toFixed(2).replace(/0$/, '')}. Freezer batches keep well, so smaller households can make the full batch and freeze more.</p>` : '';
  return `${scale}${mine && arr(mine[key]).length ? `<div class="hj-blk">${kick(mine.title || 'My Plan')}<p class="hj-sub">${esc(mine.lead || 'Your own plan, written for you.')}</p>${docBlocks(mine[key], 'mine-' + key)}</div>${kick('The Grounded Plan')}` : ''}${docBlocks(lib[key], key)}`;
}
function vNumbers(){
  const h = H(), f = S.form, mine = MINE(), L = labs().reverse(), M = marks().reverse();
  const inp = (k, label, type, extra) => `<label class="hj-fld"><span>${esc(label)}</span><input type="${type || 'number'}" inputmode="${type === 'date' ? '' : 'decimal'}" data-hjf="${k}" value="${esc(f && f[k] != null ? f[k] : '')}"${extra || ''}></label>`;
  const labForm = f && f.k === 'lab' ? `<div class="hj-blk" id="hj-form">${kick('Lab Results')}<div class="hj-g3">${inp('date', 'Date', 'date')}${inp('ldl', 'LDL')}${inp('total', 'Total cholesterol')}${inp('hdl', 'HDL')}${inp('trig', 'Triglycerides')}${inp('apob', 'ApoB (if tested)')}</div>${inp('note', 'Note', 'text')}
    <div class="row"><button type="button" class="btn btn-gold btn-sm" data-hja="save">Save</button><button type="button" class="btn btn-line btn-sm" data-hja="cancel">Cancel</button></div></div>` : '';
  const mkForm = f && f.k === 'mark' ? `<div class="hj-blk" id="hj-form">${kick('Body and Training Markers')}<div class="hj-g3">${inp('date', 'Date', 'date')}${inp('weight', 'Weight (lb)')}${inp('waist', 'Waist (in)')}${inp('rhr', 'Resting heart rate')}${inp('pushups', 'Push-ups in a row')}${inp('pullups', 'Pull-ups in a row')}${inp('mile', 'One-mile walk (minutes)')}${inp('energy', 'Energy, 1 to 10')}${inp('sleep', 'Sleep, hours')}${inp('joint', 'Joint comfort, 0 to 10 (10 is easy)')}</div>${inp('note', 'Note', 'text')}
    <div class="row"><button type="button" class="btn btn-gold btn-sm" data-hja="save">Save</button><button type="button" class="btn btn-line btn-sm" data-hja="cancel">Cancel</button></div></div>` : '';
  const pForm = f && (f.k === 'panel' || f.k === 'pitem') ? `<div class="hj-blk" id="hj-form">${kick(f.k === 'panel' ? 'New Lab Panel' : 'Add a Result')}<div class="hj-g3">${f.k === 'panel' ? inp('name', 'Panel name', 'text') + inp('date', 'Date', 'date') : ''}${inp('n', 'Test name', 'text')}${inp('v', 'Result', 'text')}${inp('u', 'Unit', 'text')}${inp('lo', 'Range low')}${inp('hi', 'Range high')}</div>
    <div class="row"><button type="button" class="btn btn-gold btn-sm" data-hja="psave">Save</button><button type="button" class="btn btn-line btn-sm" data-hja="cancel">Cancel</button></div></div>` : '';
  const loadMine = mine && mine.start && (arr(mine.start.labs).length || arr(mine.start.panels).length) && !h.labs.length && !h.panels.length ? `<div class="hj-blk">${kick('My Starting Numbers')}<p class="hj-sub">Your starting labs are ready to add to this device.</p><button type="button" class="btn btn-gold btn-sm" data-hja="mine">Add My Starting Numbers</button></div>` : '';
  const cell = v => v == null || v === '' ? '' : esc(v);
  return `${loadMine}
  <div class="row" style="margin-bottom:14px"><button type="button" class="btn btn-gold btn-sm" data-hja="new" data-hjv="lab">Add Lab Results</button><button type="button" class="btn btn-line btn-sm" data-hja="new" data-hjv="mark">Add Markers</button><button type="button" class="btn btn-line btn-sm" data-hja="new" data-hjv="panel">Add a Lab Panel</button><button type="button" class="btn btn-line btn-sm" data-hja="setup">My Goals</button></div>
  ${labForm}${mkForm}${pForm}
  ${ldlPath()}
  <div class="hj-blk">${kick('LDL Over Time')}${chart(labs(), num(h.set.goalLdl)) || '<p class="hj-sub">Your chart starts with your first lab results.</p>'}
    ${L.length ? `<div class="hj-tw"><table class="hj-tbl"><thead><tr><th>Date</th><th>LDL</th><th>Total</th><th>HDL</th><th>Trig</th><th>ApoB</th><th></th></tr></thead><tbody>${L.map(x => `<tr><td>${short(x.date)}${x.note ? `<small>${esc(x.note)}</small>` : ''}</td><td><b>${cell(x.ldl)}</b></td><td>${cell(x.total)}</td><td>${cell(x.hdl)}</td><td>${cell(x.trig)}</td><td>${cell(x.apob)}</td><td><button type="button" class="linkbtn" data-hja="edit" data-hjv="lab|${esc(x.id)}">Edit</button></td></tr>`).join('')}</tbody></table></div>` : ''}</div>
  <div class="hj-blk">${kick('Markers')}${M.length ? `<div class="hj-tw"><table class="hj-tbl"><thead><tr><th>Date</th><th>Weight</th><th>Waist</th><th>Rest HR</th><th>Push-ups</th><th>Pull-ups</th><th>Mile</th><th>Energy</th><th>Sleep</th><th>Joints</th><th></th></tr></thead><tbody>${M.map(x => `<tr><td>${short(x.date)}</td><td>${cell(x.weight)}</td><td>${cell(x.waist)}</td><td>${cell(x.rhr)}</td><td>${cell(x.pushups)}</td><td>${cell(x.pullups)}</td><td>${cell(x.mile)}</td><td>${cell(x.energy)}</td><td>${cell(x.sleep)}</td><td>${cell(x.joint)}</td><td><button type="button" class="linkbtn" data-hja="edit" data-hjv="mark|${esc(x.id)}">Edit</button></td></tr>`).join('')}</tbody></table></div>` : '<p class="hj-sub">Test your markers in week 1, then every four weeks. The Fitness plan shows how.</p>'}</div>
  ${vPanels()}
  <p class="hj-note">Saved only on this device, locked with your Field Guide, and carried in your locked backup.</p>`;
}
function bar(it){
  const v = typeof it.v === 'number' ? it.v : parseFloat(String(it.v).replace(/[^0-9.]/g, '')), lo = num(it.lo), hi = num(it.hi);
  let st = 'in'; if (isFinite(v)){ if (lo != null && v < lo) st = 'low'; else if (hi != null && v > hi) st = 'high'; }
  if (/^[<>]/.test(String(it.v))) st = 'in';
  let pos = 50;
  if (isFinite(v) && lo != null && hi != null && hi > lo) pos = 25 + (v - lo) / (hi - lo) * 50;
  else if (isFinite(v) && hi != null) pos = v / hi * 70;
  else if (isFinite(v) && lo != null) pos = 25 + Math.min(70, (v - lo) / (lo || 1) * 50);
  pos = Math.max(3, Math.min(97, pos));
  const rng = lo != null && hi != null ? `${lo} to ${hi}` : hi != null ? `${hi} or below` : lo != null ? `${lo} or above` : '';
  const g0 = lo != null ? 25 : 0, g1 = hi != null ? 75 : 100;
  return `<div class="hj-pi"><div class="spread"><b>${esc(it.n)}</b><span class="hj-pv ${st}">${esc(it.v)}${st === 'in' ? '' : ' ' + (st === 'low' ? 'Low' : 'High')}</span></div>
    ${rng ? `<small>Range: ${esc(rng)} ${esc(it.u || '')}</small><div class="hj-rb" aria-hidden="true"><span class="ok" style="left:${g0}%;width:${g1 - g0}%"></span><i style="left:${pos.toFixed(1)}%"></i></div>` : `<small>${esc(it.u || '')}</small>`}</div>`;
}
function vPanels(){
  const P = H().panels.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
  if (!P.length) return '';
  return `<div class="hj-blk">${kick('Full Lab Panels')}${P.map(p => { const id = 'pn:' + p.id, open = S.open[id];
    const flags = arr(p.items).filter(it => { const v = +it.v; return isFinite(v) && ((num(it.lo) != null && v < it.lo) || (num(it.hi) != null && v > it.hi)); }).length;
    return `<details class="hj-doc"${open ? ' open' : ''} data-hjd="${esc(id)}"><summary><span>${esc(p.name)} <small class="hj-pd">${short(p.date)}${p.note ? ', ' + esc(p.note) : ''}. ${arr(p.items).length} results${flags ? `, ${flags} outside range` : ', all in range'}</small></span></summary><div class="hj-body"><div class="hj-pg">${arr(p.items).map(bar).join('')}</div>
      <div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-hja="pitem" data-hjv="${esc(p.id)}">Add a Result</button><button type="button" class="linkbtn" data-hja="pdel" data-hjv="${esc(p.id)}">Remove Panel</button></div></div></details>`; }).join('')}</div>`;
}
function milestones(){
  const h = H(), out = [], L = labs().filter(x => num(x.ldl) != null);
  if (L.length) out.push(['First numbers logged', L[0].date]);
  if (L.length > 1){ const a = +L[0].ldl; for (const p of [10, 25, 50]){ const hit = L.find(x => (a - x.ldl) / a * 100 >= p); if (hit) out.push(['LDL down ' + p + '%', hit.date]); } }
  const goal = num(h.set.goalLdl); if (goal){ const g = L.find(x => +x.ldl <= goal); if (g) out.push(['Goal reached', g.date]); }
  const strongDays = Object.entries(h.days).filter(([, x]) => Object.values(x.checks || {}).filter(Boolean).length >= 4).map(([d]) => d).sort();
  [[7, 'Seven strong days'], [30, 'Thirty strong days'], [100, 'One hundred strong days']].forEach(([n, t]) => { if (strongDays.length >= n) out.push([t, strongDays[n - 1]]); });
  return out.sort((a, b) => String(a[1]).localeCompare(String(b[1])));
}
function vJourney(){
  const h = H(), N = h.notes.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)) || (b.u || 0) - (a.u || 0)), ms = milestones();
  return `<div class="hj-blk">${kick('Write Today')}<p class="hj-sub">What you noticed, what felt strong, what you are growing toward.</p>
    <textarea id="hj-note" rows="4" placeholder="Today I...">${esc(S.draft || '')}</textarea>
    <div class="row" style="margin-top:8px"><button type="button" class="btn btn-gold btn-sm" data-hja="note">Save Entry</button></div></div>
  ${h.wlog.length ? `<div class="hj-blk">${kick('Workouts')}${h.wlog.slice().reverse().slice(0, 12).map(w => `<div class="hj-entry"><b>${nice(w.date)}</b> · ${esc(w.title || 'Session ' + w.s)}${w.note ? `<p>${esc(w.note)}</p>` : ''}</div>`).join('')}</div>` : ''}
  ${ms.length ? `<div class="hj-blk">${kick('Milestones')}<ul class="hj-ms">${ms.map(([t, d]) => `<li><span class="star">&#9733;</span><b>${esc(t)}</b><small>${nice(d)}</small></li>`).join('')}</ul></div>` : ''}
  ${N.length ? `<div class="hj-blk">${kick('My Journey')}${N.map(n => `<div class="hj-entry"><div class="spread"><b>${nice(n.date)}</b><button type="button" class="linkbtn" data-hja="note-del" data-hjv="${esc(n.id)}">Remove</button></div><p>${esc(n.text).replace(/\n/g, '<br>')}</p></div>`).join('')}</div>` : ''}`;
}
// ---------- BLD 841: the tool. A calendar, Today's one card, the workout player, cook and prep cards, the shop list ----------
// FLD.healthJourney.app = {workouts, dinners: {weeks, breakfasts, lunches, snacks}, shop: {weeks: {A: {shop, sunday, wednesday, batch}}, staples}}
// FDR.healthMine.addons = [shop items added to Week A lists]; FDR.healthMine.checks = [extra daily checks].
// DATA.health adds: log {'YYYY-MM-DD': {key: time}}, shop {'<week no>': {items: [...], u}}, lifts {exerciseId: lb}, wlog [{id, date, s, sets, note, u}].
const APP = () => { const l = FLDH(); return l && l.app && typeof l.app === 'object' ? l.app : null; };
const WK = () => (APP() || {}).workouts || {};
const DAYMS = 864e5, DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'], DOWL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const WMAP = {1: 'A', 2: 'D', 3: 'C', 4: 'D', 5: 'B'};
const parseD = s => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || '')); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
const addD = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const day0 = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
// The coming Monday, or today when today is a Monday (BLD 857b: on a Monday the old default jumped a week ahead).
const nextMon = () => { const t = day0(new Date()); return addD(t, (8 - t.getDay()) % 7); };
const monOf = d => addD(day0(d), -((d.getDay() + 6) % 7));
// With no saved start, the first logged day holds the plan in place: the Monday on or after it, since the weekend's
// shopping and Sunday prep belong to the week they get ready for (BLD 857c); then the coming Monday.
const firstLog = () => { const h = H(), ds = Object.keys(h.log || {}).concat(arr(h.wlog).map(w => w.date)).map(parseD).filter(Boolean).sort((a, b) => a - b); return ds[0] || null; };
function firstMon(){ const d = firstLog(); return d ? addD(d, (8 - d.getDay()) % 7) : null; }
function startMon(){ const s = parseD(H().set.start); return s || firstMon() || nextMon(); }
const weekNo = d => Math.floor((day0(d) - startMon()) / (7 * DAYMS)) + 1;
const letter = n => 'ABCD'[(Math.max(1, n) - 1) % 4];
const phaseOf = n => { n = Math.max(1, n); return n <= 12 ? Math.ceil(n / 4) : 2 + Math.floor(((n - 13) % 8) / 4); };
const lightWk = n => Math.max(1, n) % 4 === 0;
const foodWeek = d => { const w = d.getDay(); return weekNo(w === 6 ? addD(d, 2) : w === 0 ? addD(d, 1) : d); };
const medMins = n => { const m = WK().meditation || {}, a = +m.start || 10, b = +m.end || 20, k = +m.buildWeeks || 8; return Math.max(a, Math.min(b, Math.round(a + (Math.max(1, n) - 1) * (b - a) / Math.max(1, k - 1)))); };
const shortDate = d => d.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric'});
const logOf = d => { const h = H(), k = ymd(d); return h.log[k] = h.log[k] || {}; };
const isDone = (d, key) => !!(H().log[ymd(d)] || {})[key];
function markDone(key, d){ const l = logOf(d || new Date()); l[key] = Date.now(); l.u = Date.now(); save(); }
// Sunday dinner belongs to the coming food week: it is cooked on Sunday prep day, the day after shopping (BLD 846).
function dinnerFor(d){ const n = d.getDay() === 0 ? foodWeek(d) : weekNo(d), app = APP(); if (n < 1 || !app || !app.dinners) return null; const w = (app.dinners.weeks || {})[letter(n)]; if (!w) return null; const x = arr(w.dinners).find(z => z.day === DOW[d.getDay()]); return x ? Object.assign({wk: letter(n)}, x) : null; }
function sesFor(d){ const s = WMAP[d.getDay()], ss = (WK().sessions || {})[s]; return ss ? Object.assign({id: s}, ss) : null; }
const BAT = () => (APP() || {}).batches || null;
function prepFor(kind, n){ if (kind === 'pack') return (BAT() || {}).pack || null; if (kind.indexOf('bulk-') === 0){ const b = arr((BAT() || {}).batches).find(x => x.id === kind.slice(5)); return b ? Object.assign({title: b.name}, b) : null; }
  return prepFor0(kind, n); }
function prepFor0(kind, n){ const sp = (APP() || {}).shop || {}, w = (sp.weeks || {})[letter(n)]; return w && w[kind] ? w[kind] : null; }
function agenda(d){
  const out = [], dow = d.getDay(), n = weekNo(d), fw = foodWeek(d), ses = n >= 1 || dow !== 0 ? sesFor(d) : null;
  const track = H().set.track || 'strength', pr = practiceFor(d);
  if (track !== 'strength' && pr) out.push({key: 'prac', k: 'prac', hour: 14.5, kick: 'After work', title: pr.title || 'Daily Practice', sub: (pr.mins ? pr.mins + ' minutes. ' : '') + (pr.focus || ''), btn: 'Start Practice', did: true});
  if (track !== 'practice' && ses && n >= 1) out.push({did: true, key: 'work:' + ses.id, k: 'work', v: ses.id, hour: 6.5, kick: 'Morning', title: ses.title || ('Session ' + ses.id), sub: (ses.mins ? ses.mins + ' minutes. ' : '') + (lightWk(n) ? 'A lighter week: ease off a little.' : (ses.lead || '')), btn: 'Start Workout'});
  // Meditation for every track (Chris, October 24, 2026: "and off the meditations to her as well"): the Daily Practice track gets it in the evening.
  if (track === 'practice' && MED()){ const m1 = medFor(d); out.push({did: true, key: 'med', k: 'med', hour: 20.5, kick: 'This evening', title: 'Meditation', sub: (m1 && m1.title ? m1.title + '. ' : '') + medMins(n) + ' minutes with a candle and calm music.', btn: 'Start'}); }
  // Seven days a week (Chris, October 24, 2026: "make them 7 days a week"); weekday mornings after the shower, weekend mornings too.
  const mf = medFor(d);
  if (track !== 'practice' && MED()) out.push({did: true, key: 'med', k: 'med', hour: 8, kick: dow >= 1 && dow <= 5 ? 'After the shower' : 'Morning', title: 'Meditation', sub: (mf && mf.title ? mf.title + '. ' : '') + medMins(n) + ' minutes of stillness.', btn: 'Start'});
  if (dow === 6){ const L = shopList(fw), left = L ? L.items.filter(x => !x.done).length : 0; out.push({key: 'shop:' + fw, k: 'shop', v: fw, hour: 9, kick: 'Shopping day', title: 'Shop for Week ' + letter(fw), sub: left ? left + ' items on the list.' : 'Everything is in the cart.', btn: 'Open the List'}); }
  if (dow === 6 && !KIT()) out.push({key: 'out', k: 'mark', hour: 11, kick: 'Together', title: 'Family hike or the Y', sub: 'Outside when the weather is good, the Y when it is wild.', btn: 'We Did It'});
  if (dow === 0){ const p = prepFor('sunday', fw); if (p) out.push({key: 'prep:sunday:' + fw, k: 'prep', v: 'sunday|' + fw, hour: 13, kick: 'Sunday prep', title: 'Prep for Week ' + letter(fw), sub: (p.mins || 90) + ' minutes, step by step with timers.', btn: 'Start Prep'});
    const pk = prepFor('pack', fw); if (pk) out.push({key: 'prep:pack:' + fw, k: 'prep', v: 'pack|' + fw, hour: 18, kick: 'Sunday evening', title: pk.title || 'Pack Lunches', sub: (pk.mins || 20) + ' minutes for the week ahead.', btn: 'Start'});
    const b = prepFor('batch', fw); if (b) out.push({key: 'prep:batch:' + fw, k: 'prep', v: 'batch|' + fw, hour: 15, kick: 'Freezer batch', title: b.title || 'Freezer Batch', sub: (b.mins || 40) + ' minutes. A great job to hand off.', btn: 'Start'}); }
  if (dow === 3 && n >= 1){ const p = prepFor('wednesday', n); if (p) out.push({key: 'prep:wednesday:' + n, k: 'prep', v: 'wednesday|' + n, hour: 16, kick: 'Midweek', title: 'Wednesday Mini Prep', sub: (p.mins || 20) + ' minutes.', btn: 'Start Prep'}); }
  if ((dow === 2 || dow === 4) && !KIT()){ const ev = arr(WK().evenings), e = ev.find(x => (dow === 2 ? /zone 2/i : /^interval/i).test(x.title || '')) || (ev.length ? ev[(Math.max(1, n) * 2 + dow) % ev.length] : null); out.push({key: 'y', k: 'mark', hour: 18.5, kick: 'Evening', title: 'The Y together', sub: (e ? e.title + (e.how ? ': ' + e.how : '') : 'Swim, sauna, or a class, together.') + (MINE() && MINE().yNote ? ' ' + MINE().yNote : ''), btn: 'We Did It'}); }
  const dn = dinnerFor(d); if (dn) out.push({key: 'cook:' + dn.wk + ':' + dn.id, k: 'cook', v: dn.wk + '|' + dn.id, hour: 17, kick: 'Tonight', title: dn.name, sub: (dn.mins ? dn.mins + ' minutes' : '') + (nOk(dn.nut) ? ', ' + (nOk(dn.nutHeart) && !KIT() ? nSf(dn.nutHeart) + ' on the heart-health plate' : nSf(dn.nut) + ' a serving') : '') + (dn.prepped ? '. ' + dn.prepped : ''), btn: 'Cook It'});
  return out.sort((a, b) => a.hour - b.hour);
}
// ---------- BLD 846: Keep It Rolling. Reminders from the plan: thaw, freeze, shop, prep, grab and go, freezer stock ----------
// They show inside My Health (everything stays on this device). Add to My Phone Calendar hands the steady ones to the
// phone's own calendar, which can alert even when the app is closed (Chris, October 24, 2026, "1").
// ---------- BLD 846: nutrition numbers (Chris, October 25, 2026: saturated fat "next to all meals, snacks, and items", then
// "3 plus carbs"): estimates per serving in each item's nut {sf, fib, pro, cal, carb, na, sug, per}. ----------
const NUTK = [['sf', 'sat fat', ' g'], ['fib', 'fiber', ' g'], ['pro', 'protein', ' g'], ['cal', 'cal', ''], ['carb', 'carbs', ' g'], ['na', 'sodium', ' mg'], ['sug', 'added sugar', ' g']];
const nOk = n => n && typeof n === 'object' && n.sf != null;
const nSf = n => nOk(n) ? (+n.sf) + ' g sat fat' : '';
function nLine(n){ if (!nOk(n)) return ''; return NUTK.filter(([k]) => n[k] != null).map(([k, l, u]) => k === 'cal' ? esc(n[k]) + ' cal' : esc(l) + ' ' + esc(n[k]) + u).join(' · '); }
function nTable(n, h){ if (!nOk(n)) return ''; const row = ([k, l, u]) => `<tr><th>${k === 'cal' ? 'Calories' : esc(l[0].toUpperCase() + l.slice(1))}</th><td>${n[k] != null ? esc(n[k]) + u : ''}</td>${nOk(h) ? `<td>${h[k] != null ? esc(h[k]) + u : ''}</td>` : ''}</tr>`;
  return `<div class="hj-nut"><div class="hj-tw"><table class="hj-tbl"><thead><tr><th>Per serving</th><th>Family plate</th>${nOk(h) ? '<th>Heart-health plate</th>' : ''}</tr></thead><tbody>${NUTK.map(row).join('')}</tbody></table></div><p class="hj-sub">Estimates from typical label and USDA values.</p></div>`; }
function aims(){ return `<details class="hj-doc"${S.open['aims'] ? ' open' : ''} data-hjd="aims"><summary><span>Daily Aims</span></summary><div class="hj-body"><ul class="hj-ing">
  <li><b>Saturated fat:</b> about 13 g a day or less (about 6% of 2,000 calories), the American Heart Association's aim for lowering LDL.</li>
  <li><b>Fiber:</b> 30 to 38 g a day, with oats, beans, and psyllium for the soluble kind that carries LDL out.</li>
  <li><b>Protein for building muscle:</b> about 0.7 to 1 g per pound of body weight, spread across meals.</li>
  <li><b>Added sugar:</b> 36 g a day or less for men and 25 g for women (American Heart Association).</li>
  <li><b>Sodium:</b> 2,300 mg a day or less (Dietary Guidelines for Americans).</li>
  <li><b>Calories and carbs:</b> they follow your size and training; steady energy and a steady weight tell you they fit.</li></ul>
  <p class="hj-sub">Every number in My Health is an estimate per serving. Sources: American Heart Association, Saturated Fat and Added Sugars; Dietary Guidelines for Americans, 2020 to 2025; National Academies, Dietary Reference Intakes (fiber).</p></div></details>`; }
function medFor(d){ const m = MED(); if (!m) return null; return arr(m.sessions).find(x => x.day === DOW[d.getDay()]) || m.sessions[0]; }
const remOn = () => !H().set.remOff;
function remindersFor(d, opt){
  const out = [], h = H(), dow = d.getDay(), n = weekNo(d), fw = foodWeek(d), all = opt === 'all';
  if (n < 0 || !APP()) return out;
  const tw = ((APP().shop || {}).weeks || {}), push = (id, hour, kick, title, sub, go, rep, base) => out.push({id, key: 'rem:' + id, hour, kick, title, sub: sub || '', go: go || '', rep: rep || 0, base: base || ''});
  const at = hr => hr < 12 ? 'This morning' : hr < 17 ? 'This afternoon' : 'Tonight', lc = t => String(t || '').replace(/^./, c => c.toLowerCase());
  // Titles say the job, the when, and the what, so a tag on This Week reads on its own (Chris, October 25, 2026: "tomorrows grab and go? what is that mean?").
  // Thaw: frozen protein moves to the fridge one or two nights before its dinner.
  [1, 2].forEach(k => { const dd = addD(d, k), dn = dinnerFor(dd), t = dn && dn.thaw; if (!t || !t.item || (+t.nights || 1) !== k) return;
    push('thaw:' + ymd(dd), 20, 'Tonight', 'Tonight: move ' + t.item + ' from freezer to fridge for ' + (k === 1 ? 'tomorrow' : DOWL[dd.getDay()]) + '\'s dinner', 'It thaws slowly and safely in the fridge, ready for ' + dn.name + '.', '', 4, 'thaw:' + dn.id); });
  // A morning check, only when last night's thaw is still open.
  const dn0 = dinnerFor(d); if (dn0 && dn0.thaw && dn0.thaw.item && !all){ const k = +dn0.thaw.nights || 1, night = (h.log[ymd(addD(d, -k))] || {})['rem:thaw:' + ymd(d)];
    if (!night) push('thawam:' + ymd(d), 7, 'This morning', 'This morning: check that ' + dn0.thaw.item + ' is thawing for tonight', 'Tonight is ' + dn0.name + '. ' + (dn0.thaw.quick || 'Move it to the fridge now, and it is ready by dinner.')); }
  const wk = tw[letter(fw)] || {};
  if (dow === 6 && arr(wk.freeze).length) push('freeze:' + fw, 12, 'After shopping', 'After shopping: freeze ' + arr(wk.freeze).map(lc).join(', and '), 'These are for later in the week, so the freezer keeps them fresh. The thaw reminder comes a night or two before.', '', 4, 'freeze:' + letter(fw));
  if (dow === 4) push('thu:' + n, 19, 'Tonight', 'Tonight: check the fridge and pantry, and add what is low to Saturday\'s list', 'Use-it-up night is a good time to see what is left. Tap Open to add to the list.', 'shop:' + (n + 1), 1, 'thu');
  if (dow === 5) push('fri:' + n, 19, 'Tonight', 'Tonight: look over tomorrow\'s shopping list', 'Week ' + letter(n + 1) + '\'s list is ready. Copy it for a text if someone else is shopping.', 'shop:' + (n + 1), 1, 'fri');
  if (dow === 6){ const p = prepFor('sunday', fw); if (p) push('sunprep:' + fw, 20, 'Tonight', 'Tonight: get ready for Sunday prep (about ' + (p.mins || 90) + ' min)', 'Clear a fridge shelf and the counter, and set out the slow cooker, Instant Pot, and containers.', 'prep:sunday:' + fw, 1, 'sunprep'); }
  if (dow === 2 && n >= 1){ const p = prepFor('wednesday', n); if (p) push('wedprep:' + n, 20, 'Tonight', 'Tomorrow after work: Wednesday mini prep (about ' + (p.mins || 20) + ' min)', 'A short prep for Thursday and Friday dinners. Andrew guides it step by step.', 'prep:wednesday:' + n, 1, 'wedprep'); }
  if (dow >= 1 && dow <= 4 && (BAT() || {}).pack) push('gg:' + ymd(d), 20.5, 'Tonight', 'Tonight: pack tomorrow\'s lunches and snacks', 'Set out the lunch bags, put the ice packs in the freezer, and move tomorrow\'s frozen breakfast (burritos, muffins, or pancakes) to the fridge.', '', 1, 'gg:' + dow);
  // Freezer stock: once counts are kept on the Prep tab, a nudge Thursday to Saturday when a batch runs low.
  if (h.stockU && dow >= 4 && !all){ const low = arr((BAT() || {}).batches).filter(b => b.where === 'freezer' && b.low != null && (h.stock || {})[b.id] != null && +h.stock[b.id] <= +b.low);
    if (low.length) push('low:' + n, 18, at(18), 'Make more this Sunday: ' + low.map(b => b.name).join(', '), low.map(b => { const c = +((h.stock || {})[b.id] || 0); return b.name + ': ' + c + (b.unit && c !== 1 ? ' ' + b.unit : '') + ' left'; }).join('. ') + '. Tap Open for the Prep tab.', 'prepsec:' + fw); }
  return out.sort((a, b) => a.hour - b.hour);
}
// The phone calendar file: the next four weeks of steady reminders, each repeating (food weeks rotate every four weeks).
function icsText(){
  const d0 = day0(new Date()), seen = new Set(), ev = [], z = n => String(n).padStart(2, '0');
  const e = t => String(t).replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  const fold = l => { const o = []; while (l.length > 73){ o.push(l.slice(0, 73)); l = ' ' + l.slice(73); } o.push(l); return o.join('\r\n'); };
  const now = new Date(), st = now.getUTCFullYear() + z(now.getUTCMonth() + 1) + z(now.getUTCDate()) + 'T' + z(now.getUTCHours()) + z(now.getUTCMinutes()) + '00Z';
  for (let i = 0; i < 28; i++){ const d = addD(d0, i); remindersFor(d, 'all').forEach(r => { if (!r.rep || seen.has(r.base)) return; seen.add(r.base);
    const hh = Math.floor(r.hour), mm = Math.round((r.hour - hh) * 60), when = d.getFullYear() + z(d.getMonth() + 1) + z(d.getDate()) + 'T' + z(hh) + z(mm) + '00';
    ev.push(['BEGIN:VEVENT', 'UID:mh-' + r.base.replace(/[^a-z0-9-]/gi, '-') + '-' + when + '@growwithgrounded.com', 'DTSTAMP:' + st, 'DTSTART:' + when, 'DURATION:PT15M',
      'RRULE:FREQ=WEEKLY;INTERVAL=' + r.rep + ';COUNT=' + (r.rep === 4 ? 7 : 26), 'SUMMARY:' + e('My Health: ' + r.title.replace(/^(Tonight|This morning|After shopping|Tomorrow after work): /, m => /Tomorrow/.test(m) ? m : '')), 'DESCRIPTION:' + e(r.sub), 'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + e(r.title), 'TRIGGER:PT0M', 'END:VALARM', 'END:VEVENT'].map(fold).join('\r\n')); }); }
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Grow With Grounded//My Health//EN', 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:My Health'].concat(ev, ['END:VCALENDAR']).join('\r\n') + '\r\n';
}
function remBlock(d){
  if (!remOn()) return `<p class="hj-sub" style="margin:0 0 14px"><button type="button" class="linkbtn" data-hja="remoff">Show Reminders</button></p>`;
  const rs = remindersFor(d); if (!rs.length) return '';
  return `<div class="hj-blk hj-rem">${kick('Keep It Rolling')}${rs.map(r => { const ok = isDone(d, r.key); return `<div class="hj-ag${ok ? ' ok' : ''}"><button type="button" class="hj-agck" data-hja="toggle" data-hjv="${esc(r.key)}" aria-pressed="${ok}" aria-label="Done: ${esc(r.title)}">${ok ? '&#10003;' : ''}</button><div class="hj-agt"><b>${esc(r.title)}</b><small>${esc(r.sub)}</small>${r.go ? `<button type="button" class="linkbtn" data-hja="go" data-hjv="${esc(r.go)}">Open</button>` : ''}</div></div>`; }).join('')}
    <div class="row" style="margin-top:10px"><button type="button" class="btn btn-line btn-sm" data-hja="remics">Add to My Phone Calendar</button><button type="button" class="linkbtn" data-hja="remoff">Hide Reminders</button></div></div>`;
}
function nowCard(items, d){
  const hr = d.getHours() + d.getMinutes() / 60, open = items.filter(x => !isDone(d, x.key));
  if (!open.length) return null;
  const due = open.filter(x => x.hour <= hr + 0.75);
  return due.length ? due[due.length - 1] : open[0];
}
function vToday2(lib){
  const h = H(), d = new Date(), items = agenda(d), cur = nowCard(items, d), n = weekNo(d), mine = MINE();
  // BLD 861: movement, stillness, and the supplements a person lists live in Today's Plate, so Daily Habits holds the rest.
  const onPlate = new Set(['move', 'still'].concat(APP() ? supps().map(lever).filter(Boolean) : []));
  const checks = (arr(lib.today && lib.today.checks).length ? lib.today.checks : CHECKS).concat(arr(mine && mine.checks)).filter(c => KIT() || !APP() || !onPlate.has(c.id));
  const day = h.days[today()] || {checks: {}};
  const s0 = startMon(), before = n < 1;
  const L = labs(), last = L[L.length - 1], goal = num(h.set.goalLdl);
  const card = x => `<div class="hj-now"><div class="hj-kick">${esc(x.kick)}</div><h3>${esc(x.title)}</h3><p>${esc(x.sub || '')}</p>
      <button type="button" class="btn btn-gold hj-go" data-hja="go" data-hjv="${esc(x.key)}">${esc(x.btn)}</button>${x.did ? `<button type="button" class="linkbtn hj-did" data-hja="toggle" data-hjv="${esc(x.key)}">I Did It on My Own</button>` : ''}</div>`;
  return `${hero(lib)}
  ${before ? `<p class="hj-note">Your plan starts ${esc(DOWL[s0.getDay()])}, ${esc(shortDate(s0))}. This weekend: shop Saturday and prep Sunday, and you are ready.</p>` : `<p class="hj-wk">Week ${n}${KIT() ? '' : ' · Phase ' + phaseOf(n) + (lightWk(n) ? ' · a lighter week' : '')} · Food Week ${letter(n)}</p>`}
  ${cur ? card(cur) : `<div class="hj-now done"><div class="hj-kick">Today</div><h3>Everything for today is done.</h3><p>Rest well. Tomorrow keeps growing.</p></div>`}
  ${vPlate()}
  ${remBlock(d)}
  ${items.length ? `<div class="hj-blk">${kick('Today')}${items.map(x => { const ok = isDone(d, x.key); return `<div class="hj-ag${ok ? ' ok' : ''}${cur && cur.key === x.key ? ' cur' : ''}"><button type="button" class="hj-agck" data-hja="toggle" data-hjv="${esc(x.key)}" aria-pressed="${ok}" aria-label="Done: ${esc(x.title)}">${ok ? '&#10003;' : ''}</button><button type="button" class="hj-agt" data-hja="go" data-hjv="${esc(x.key)}"><b>${esc(x.title)}</b><small>${esc(x.kick)}</small></button></div>`; }).join('')}</div>` : ''}
  ${KIT() ? '' : `<div class="hj-blk">${kick('Daily Habits')}<div class="hj-habits">${checks.map(c => { const on = !!(day.checks && day.checks[c.id]); return `<button type="button" class="hj-hb${on ? ' on' : ''}" aria-pressed="${on}" data-hja="check" data-hjv="${esc(c.id)}"><span class="box">${on ? '&#10003;' : ''}</span>${esc(c.label)}</button>`; }).join('')}</div></div>
  `}${KIT() ? '' : `<button type="button" class="hj-ldl" data-hja="sec" data-hjv="numbers"><span class="hj-kick">LDL</span><b>${last && last.ldl != null ? esc(last.ldl) : 'Add'}</b><span>${last ? 'on ' + short(last.date) + (goal ? '. Goal ' + esc(goal) + '.' : '') : 'Add your first lab results'}</span>${ldlSum()}</button>`}
  ${lib.doctor ? `<p class="hj-note">${esc(lib.doctor)}</p>` : ''}`;
}
// Play anything, anytime (Chris, October 24, 2026: "give me access to the yoga set you made for kayti.. in case i want to incorporate these to my day").
function playLib(){
  const ses = Object.entries(WK().sessions || {}), pr = arr((PR() || {}).sessions), md = arr((MED() || {}).sessions);
  const row = (key, t, sub) => `<li><button type="button" class="hj-pill move" data-hja="go" data-hjv="${esc(key)}"><b>${esc(t)}</b>${sub ? ` <small>${esc(sub)}</small>` : ''}</button></li>`;
  const block = (title, list) => list.length ? `<details class="hj-doc"><summary><span>${esc(title)}</span></summary><div class="hj-body"><ul class="hj-lib">${list.join('')}</ul></div></details>` : '';
  return block('Play Any Workout', ses.map(([id, x]) => row('work:' + id, x.title || 'Session ' + id, (x.day || '') + (x.mins ? ', ' + x.mins + ' min' : ''))))
    + block('Play Any Daily Practice', pr.map(x => row('pracid:' + x.id, x.title, (x.mins ? x.mins + ' min. ' : '') + (x.focus || ''))))
    + block('Play Any Meditation', md.map(x => row('medid:' + x.id, x.title, (x.day || '') + (x.focus ? '. ' + x.focus : ''))));
}
function vWeek(){
  const d0 = new Date(), n0 = weekNo(d0), n = Math.max(1, n0 + (S.wkOff || 0)), mon = addD(startMon(), (n - 1) * 7), app = APP() || {}, din = app.dinners || {};
  const track = H().set.track || 'strength';
  const rows = [0, 1, 2, 3, 4, 5, 6].map(i => { const d = addD(mon, i), dn = dinnerFor(d), ses = track === 'practice' ? null : sesFor(d), isT = ymd(d) === today(), mf = medFor(d);
    return `<div class="hj-day${isT ? ' t' : ''}"><div class="hj-dl"><b>${esc(DOW[d.getDay()])}</b><small>${esc(short(ymd(d)))}</small></div><div class="hj-dr">
      ${dn ? `<button type="button" class="hj-pill food" data-hja="cook" data-hjv="${esc(dn.wk + '|' + dn.id)}">${esc(dn.name)}${dn.mins || nOk(dn.nut) ? ` <small>${[dn.mins ? esc(dn.mins) + ' min' : '', nSf(nOk(dn.nutHeart) && !KIT() ? dn.nutHeart : dn.nut)].filter(Boolean).join(', ')}</small>` : ''}</button>` : ''}
      ${ses ? `<button type="button" class="hj-pill move" data-hja="work" data-hjv="${esc(ses.id)}">${esc(ses.title || 'Session ' + ses.id)}</button>` : ''}
      ${d.getDay() === 3 && prepFor('wednesday', n) ? `<button type="button" class="hj-pill prep" data-hja="prep" data-hjv="wednesday|${n}">Mini Prep</button>` : ''}
      ${d.getDay() === 6 ? `<button type="button" class="hj-pill prep" data-hja="shopwk" data-hjv="${n + 1}">Shop for Week ${letter(n + 1)}</button>` : ''}
      ${d.getDay() === 0 && prepFor('sunday', n + 1) ? `<button type="button" class="hj-pill prep" data-hja="prep" data-hjv="sunday|${n + 1}">Sunday Prep</button>` : ''}
      ${mf ? `<button type="button" class="hj-pill calm" data-hja="go" data-hjv="medid:${esc(mf.id)}">${esc(mf.title)} <small>${esc(medMins(n))} min meditation${track === 'practice' ? ', evening' : ''}</small></button>` : ''}
      ${remOn() && !H().set.remWk ? remindersFor(d, 'all').map(r => `<button type="button" class="hj-pill rem${S.remOpen === r.id ? ' on' : ''}" data-hja="remshow" data-hjv="${esc(r.id)}" aria-expanded="${S.remOpen === r.id}">${esc(r.title)}</button>`).join('') : ''}
      ${remOn() && !H().set.remWk ? (rr => rr ? `<div class="hj-remd"><span>${esc(rr.sub)}</span>${rr.go ? `<button type="button" class="linkbtn" data-hja="go" data-hjv="${esc(rr.go)}">Open</button>` : ''}</div>` : '')(remindersFor(d, 'all').find(r => r.id === S.remOpen)) : ''}
    </div></div>`; }).join('');
  const w = (din.weeks || {})[letter(n)] || {}, ideas = (t, list, key) => arr(list).length ? `<details class="hj-doc"${S.open['id:' + key] ? ' open' : ''} data-hjd="id:${key}"><summary><span>${esc(t)}</span></summary><div class="hj-body"><ul class="hj-ideas">${arr(list).map((x, i) => `<li><b>${esc(x.name)}</b>${x.mins ? ` <small>${esc(x.mins)} min</small>` : ''}<br><span>${esc(x.how || '')}</span>${nOk(x.nut) ? `<span class="hj-gi hj-nl">${nLine(x.nut)}${x.nut.per ? ' (' + esc(x.nut.per) + ')' : ''}</span>` : ''}
    ${arr(x.shop).length ? `<span class="hj-gi">Buy: ${arr(x.shop).map(g => esc(g.name) + (g.amt ? ' (' + esc(g.amt) + ')' : '')).join(', ')}</span>` : ''}${x.from ? `<span class="hj-gi">From prep: ${esc(x.from)}</span>` : ''}${x.pack ? `<span class="hj-gi">Pack it: ${esc(x.pack)}</span>` : ''}${arr(x.steps).length ? `<button type="button" class="btn btn-line btn-sm hj-ideago" data-hja="idea" data-hjv="${key}|${i}">Guide Me</button>` : ''}
    ${arr(x.shop).length ? `<button type="button" class="btn btn-line btn-sm hj-ggadd" data-hja="ggadd" data-hjv="${key}|${i}">Add to Shopping List</button>` : ''}</li>`).join('')}</ul></div></details>` : '';
  return `<div class="hj-wkbar"><button type="button" class="btn btn-line btn-sm" data-hja="wk" data-hjv="-1"${n <= 1 ? ' disabled' : ''}>Back</button><div><b>Week ${n}</b><small>Food Week ${letter(n)}${KIT() ? '' : ' · Phase ' + phaseOf(n) + (lightWk(n) ? ' · lighter' : '')}</small></div><button type="button" class="btn btn-line btn-sm" data-hja="wk" data-hjv="1">Next</button></div>
  ${n0 < 1 && !S.wkOff ? `<p class="hj-note">Your plan starts ${esc(shortDate(startMon()))}. Here is your first week.</p>` : ''}
  <div class="hj-blk hj-days">${rows}</div>
  ${remOn() ? `<div class="row" style="margin:-4px 0 14px"><button type="button" class="btn btn-line btn-sm" data-hja="remics">Add Reminders to My Phone Calendar</button><button type="button" class="linkbtn" data-hja="remwk">${H().set.remWk ? 'Show Reminders on This Week' : 'Keep Reminders on Today Only'}</button></div>` : ''}
  ${w.batch ? `<p class="hj-note"><b>Freezer batch this week:</b> ${esc(String(w.batch).replace(/^Freezer batch:\s*/i, ''))}</p>` : ''}
  ${aims()}${ideas('Grab and Go Lunches', din.lunches, 'lunches')}${ideas('Grab and Go Breakfasts', din.breakfasts, 'breakfasts')}${ideas('Snacks', din.snacks, 'snacks')}
  ${playLib()}`;
}
// ---------- the Prep tab (BLD 845): this week's prep, the batch calendar, bulk basics, freezer stock ----------
function vPrep(){
  const n = S.prepWk || foodWeek(new Date()), L = letter(n), h = H(), B = BAT(), bs = arr(B && B.batches);
  const card = (kind, title, sub) => { const p = prepFor(kind, n); if (!p) return ''; const key = 'prep:' + kind + ':' + n, done = !!(h.log[ymd(addD(startMon(), (n - 1) * 7 + (kind === 'wednesday' ? 2 : -1)))] || {})[key];
    return `<div class="hj-pc"><div style="min-width:0"><b>${esc(title || p.title)}</b><small>${esc(sub)}${p.mins ? ' · about ' + esc(p.mins) + ' min' : ''}${done ? ' · done' : ''}</small></div><button type="button" class="btn btn-gold btn-sm" data-hja="prep" data-hjv="${kind}|${n}">Start</button></div>`; };
  const weeks = ['A', 'B', 'C', 'D'], inWk = (b, w) => b.weeks === 'every' || arr(b.weeks).includes(w) || b.every === 'weekly';
  return `<div class="hj-wkbar"><button type="button" class="btn btn-line btn-sm" data-hja="prepwk" data-hjv="${n - 1}"${n <= 1 ? ' disabled' : ''}>Back</button><div><b>Prep for Week ${letter(n)}</b><small>Week ${n}, starting ${esc(shortDate(addD(startMon(), (n - 1) * 7)))}</small></div><button type="button" class="btn btn-line btn-sm" data-hja="prepwk" data-hjv="${n + 1}">Next</button></div>
  <div class="hj-blk">${kick('This Week')}${card('sunday', 'Sunday Prep', 'Sunday')}${card('batch', '', 'Sunday, after prep')}${card('pack', 'Pack Lunches', 'Sunday evening')}${card('wednesday', 'Wednesday Mini Prep', 'Wednesday')}</div>
  ${bs.length ? `<div class="hj-blk">${kick('Batch Calendar')}<div class="hj-tw"><table class="hj-tbl"><thead><tr><th>Make</th>${weeks.map(w => `<th>${w === L ? '<b>' + w + '</b>' : w}</th>`).join('')}<th>Keeps</th></tr></thead><tbody>${bs.map(b => `<tr><td><b>${esc(b.name)}</b><small>${esc(b.makes || '')}</small></td>${weeks.map(w => `<td>${inWk(b, w) ? '&#9679;' : ''}</td>`).join('')}<td><small>${esc(b.keeps || '')}</small></td></tr>`).join('')}</tbody></table></div><p class="hj-sub">Food Week ${L} is this list's week. A dot means make it that week.</p></div>
  <div class="hj-blk">${kick('Bulk Basics and Freezer Stock')}${bs.map(b => { const c = +((h.stock || {})[b.id] || 0); return `<div class="hj-pc"><div style="min-width:0"><b>${esc(b.name)}</b><small>${esc(b.uses || '')}${b.mins ? ' · ' + esc(b.mins) + ' min' : ''}</small></div>
    ${b.where === 'freezer' ? `<div class="hj-stock"><button type="button" class="chip" data-hja="stock" data-hjv="${esc(b.id)}|-1" aria-label="One less">&minus;</button><span><b>${c}</b><small>in freezer</small></span><button type="button" class="chip" data-hja="stock" data-hjv="${esc(b.id)}|1" aria-label="One more">+</button></div>` : ''}
    <button type="button" class="btn btn-line btn-sm" data-hja="prep" data-hjv="bulk-${esc(b.id)}|${n}">Make It</button></div>`; }).join('')}</div>` : '<p class="hj-note">The batch calendar arrives with the next library update.</p>'}`;
}
// ---------- the shop list (on this device) ----------
const SECS = ['Grab and Go', 'Produce', 'Meat and Fish', 'Eggs, Dairy, and Milks', 'Bread and Tortillas', 'Frozen', 'Pantry', 'Add-ons', 'Other'];
const STORES = {costco: 'Costco', grocer: 'Coborn\'s'}; // Coborn's, the local grocer (Chris, October 24, 2026: Cub is 24 miles away)
function shopList(n){
  const h = H(), key = String(Math.max(1, n)); if (h.shop[key]) return h.shop[key];
  const sp = (APP() || {}).shop, w = sp && sp.weeks && sp.weeks[letter(n)]; if (!w) return null;
  const mine = MINE(), add = letter(n) === 'A' ? arr(mine && mine.addons) : [];
  return {seed: true, items: arr(w.shop).concat(add).map((x, i) => ({id: 's' + i, store: x.store === 'grocer' ? 'grocer' : 'costco', sec: x.gg ? 'Grab and Go' : SECS.includes(x.sec) ? x.sec : (x.sec ? 'Add-ons' : 'Other'), name: x.name, amt: x.amt || '', price: +x.price || 0, for: x.for || '', nut: nOk(x.nut) ? x.nut : undefined, done: false, n: i}))};
}
// Lists kept on a phone before BLD 846 lack numbers: look them up by name in the library.
function nutOf(x, n){ if (nOk(x.nut)) return x.nut; const k = String(x.name || '').toLowerCase(), app = APP() || {}, w = ((app.shop || {}).weeks || {})[letter(n)] || {}, din = app.dinners || {};
  const all = arr(w.shop).concat(arr((app.shop || {}).staples), ...['breakfasts', 'lunches', 'snacks'].map(t => arr(din[t]).flatMap(i => arr(i.shop))));
  const f = all.find(i => String(i.name || '').toLowerCase() === k && nOk(i.nut)); return f ? f.nut : null; }
function keepShop(n, L){ const h = H(); delete L.seed; L.u = Date.now(); h.shop[String(Math.max(1, n))] = L; save(); }
function vShop(){
  const d = new Date(), n = S.shopWk || foodWeek(d), L = shopList(n), h = H(), hh = num(h.set.household);
  if (!L) return `<p class="hj-note">The shopping lists arrive with the next library update.</p>`;
  const st = S.store || 'costco', vis = L.items.filter(x => st === 'all' || x.store === st), left = vis.filter(x => !x.done);
  const tot = vis.reduce((a, x) => a + (+x.price || 0), 0), cart = vis.filter(x => x.done).reduce((a, x) => a + (+x.price || 0), 0);
  const groups = SECS.map(s => [s, vis.filter(x => (SECS.includes(x.sec) ? x.sec : 'Other') === s).sort((a, b) => (a.done - b.done) || (a.n - b.n))]).filter(g => g[1].length);
  const ed = S.shopEd;
  return `<div class="hj-wkbar"><button type="button" class="btn btn-line btn-sm" data-hja="shopwk" data-hjv="${n - 1}"${n <= 1 ? ' disabled' : ''}>Back</button><div><b>Shop for Week ${letter(n)}</b><small>Week ${n}, shop ${esc(shortDate(addD(startMon(), (n - 1) * 7 - 2)))}</small></div><button type="button" class="btn btn-line btn-sm" data-hja="shopwk" data-hjv="${n + 1}">Next</button></div>
  ${hh && hh !== 6 ? `<p class="hj-note">Amounts are for six. For ${hh}, buy about ${Math.round(hh / 6 * 100)}% of each.</p>` : ''}
  <div class="hj-shopbar"><div class="hj-chips" style="margin:0">${['costco', 'grocer', 'all'].map(s => `<button type="button" class="chip${st === s ? ' on' : ''}" aria-pressed="${st === s}" data-hja="store" data-hjv="${s}">${s === 'all' ? 'Both' : STORES[s]}</button>`).join('')}<button type="button" class="chip${S.hideDone ? ' on' : ''}" aria-pressed="${!!S.hideDone}" data-hja="hide">Hide In Cart</button></div>
    <div class="hj-tot"><span><b>${left.length}</b> of ${vis.length} left</span><span>In cart <b>$${cart.toFixed(2)}</b> of about $${tot.toFixed(2)}</span></div><div class="hj-prog"><span style="width:${vis.length ? 100 * (vis.length - left.length) / vis.length : 0}%"></span></div></div>
  ${groups.map(([s, g]) => { const shown = S.hideDone ? g.filter(x => !x.done) : g; if (!shown.length) return ''; return `<h4 class="hj-sec">${esc(s)}<small>${g.filter(x => !x.done).length} left</small></h4>` + shown.map(x => `<div class="hj-it${x.done ? ' done' : ''}"><button type="button" class="hj-agck" data-hja="buy" data-hjv="${esc(x.id)}" aria-pressed="${!!x.done}" aria-label="In cart: ${esc(x.name)}">${x.done ? '&#10003;' : ''}</button><button type="button" class="hj-itt" data-hja="shoped" data-hjv="${esc(x.id)}"><b>${esc(x.name)}</b><small>${st === 'all' ? esc(STORES[x.store]) + ' · ' : ''}${esc(x.amt)}${x.for ? ' · ' + esc(x.for) : ''}${(q => q ? ' · ' + esc(q.sf) + ' g sat fat' + (q.per ? ' per ' + esc(q.per) : '') : '')(nutOf(x, n))}</small></button><span class="hj-pr">${x.price ? '$' + (+x.price).toFixed(2) : ''}</span></div>` + (ed === x.id ? `<div class="hj-ed">${(q => q ? `<p class="hj-sub hj-nl">${q.per ? 'Per ' + esc(q.per) + ': ' : ''}${nLine(q)}</p>` : '')(nutOf(x, n))}<label class="hj-fld"><span>Item</span><input data-hjsh="name" value="${esc(x.name)}"></label><div class="hj-g3"><label class="hj-fld"><span>Amount</span><input data-hjsh="amt" value="${esc(x.amt)}"></label><label class="hj-fld"><span>Price</span><input data-hjsh="price" inputmode="decimal" value="${esc(x.price || '')}"></label><label class="hj-fld"><span>Store</span><select data-hjsh="store"><option value="costco"${x.store === 'costco' ? ' selected' : ''}>Costco</option><option value="grocer"${x.store === 'grocer' ? ' selected' : ''}>Your Grocer</option></select></label></div>
      <div class="row"><button type="button" class="btn btn-gold btn-sm" data-hja="shopsave" data-hjv="${esc(x.id)}">Save</button><button type="button" class="btn btn-line btn-sm" data-hja="shopclose">Close</button><button type="button" class="linkbtn" data-hja="shopdel" data-hjv="${esc(x.id)}">Remove</button></div></div>` : '')).join(''); }).join('')}
  <div class="hj-add"><input id="hj-addname" placeholder="Add an item" autocomplete="off"><button type="button" class="btn btn-gold btn-sm" data-hja="shopadd">Add</button></div>
  <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold btn-sm" data-hja="shopcopy">Copy for a Text</button><button type="button" class="btn btn-line btn-sm" data-hja="shopreset">${S.sureReset ? 'Tap Again to Clear the Checks' : 'Start Over'}</button></div>
  <textarea id="hj-copy" class="hj-copy" readonly hidden></textarea>
  <p class="hj-note">Prices are estimates. Tap any item to change it. This list lives on this device.</p>`;
}
function shopText(n){
  const L = shopList(n), st = S.store || 'costco', out = [];
  (st === 'all' ? ['costco', 'grocer'] : [st]).forEach(s => { const g = L.items.filter(x => x.store === s && !x.done); if (!g.length) return; out.push(STORES[s].toUpperCase());
    SECS.forEach(sec => { const r = g.filter(x => (SECS.includes(x.sec) ? x.sec : 'Other') === sec); if (!r.length) return; out.push('', sec + ':'); r.forEach(x => out.push('[ ] ' + x.name + (x.amt ? ' (' + x.amt + ')' : ''))); }); out.push(''); });
  return out.join('\n').trim() || 'Everything is in the cart.';
}
// ---------- overlays: workout, cook, prep, meditation ----------
function buildWork(s){
  const w = WK(), ses = (w.sessions || {})[s]; if (!ses) return null;
  const n = Math.max(1, weekNo(new Date())), steps = stepsFor(ses, String(phaseOf(n)), lightWk(n));
  let count = true; try { count = localStorage.getItem('gg-health-count') !== '0'; } catch(e){}
  return {k: 'work', s, key: 'work:' + s, title: ses.title || 'Session ' + s, mins: ses.mins, steps, i: 0, set: 1, done: [], end: 0, left: 0, run: false, rest: false, stage: 'start', voice: AVA, count};
}
function openOv(o){ if (!o) { toast('That part arrives with the next library update.'); return; } S.ov = o; wake(true); tick(); rerender(true); }
function closeOv(){ const o = S.ov; if (o){ o.dead = true; o.skip = true; } const V = VO(); if (V){ V.stop(); V.music(null); } S.ov = null; wake(false); rerender(true); }
let WL = null; function wake(on){ try { if (on && navigator.wakeLock && !WL) navigator.wakeLock.request('screen').then(l => { WL = l; }).catch(() => {}); if (!on && WL){ WL.release(); WL = null; } } catch(e){} }
// BLD 857 (note 2, "says 3 sets, only does 2 sets"): this tick also ended Play Session's rests, so when it fired between the end
// of a rest and the engine's own check, the set count went up twice and a set was lost. Play Session keeps its own timers now.
let TK = null; function tick(){ clearInterval(TK); TK = setInterval(() => { const o = S.ov; if (!o){ clearInterval(TK); return; } if (!o.run || o.mode === 'auto') return; const ms = o.end - Date.now();
  document.querySelectorAll('[data-hjclock]').forEach(e => e.textContent = clock(Math.max(0, ms)));
  if (o.tot) stageUpd(Math.max(0, Math.min(1, ms / o.tot)), Math.max(0, Math.ceil(ms / 1000)));
  if (ms <= 0){ o.run = false; o.left = 0; chime(); if (o.k === 'work' && o.between){ o.between = false; } else if (o.k === 'work' && o.rest){ o.rest = false; o.set++; } if (o.k === 'med'){ markDone('med'); checkOn('still'); o.fin = true; } if (o.ti != null) o.tdone = Object.assign(o.tdone || {}, {[o.ti]: true}); rerender(true); } }, 250); }
const clock = ms => { const s = Math.ceil(ms / 1000); return Math.floor(s / 60) + ':' + pad(s % 60); };
function chime(){ try { const A = window.AudioContext || window.webkitAudioContext; if (A){ const c = chime.c = chime.c || new A(); [0, 0.35, 0.7].forEach(t => { const o = c.createOscillator(), g = c.createGain(); o.frequency.value = 660; g.gain.setValueAtTime(0.0001, c.currentTime + t); g.gain.exponentialRampToValueAtTime(0.25, c.currentTime + t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + t + 0.3); o.connect(g); g.connect(c.destination); o.start(c.currentTime + t); o.stop(c.currentTime + t + 0.32); }); } } catch(e){} try { navigator.vibrate && navigator.vibrate([200, 100, 200]); } catch(e){} }
function startTimer(o, secs, ti){ o.end = Date.now() + secs * 1000; o.left = secs * 1000; o.tot = secs * 1000; o.run = true; o.ti = ti; try { chime.c && chime.c.resume && chime.c.resume(); } catch(e){} }
function checkOn(id){ const h = H(), t = today(), d = h.days[t] = h.days[t] || {checks: {}}; d.checks = d.checks || {}; d.checks[id] = true; d.u = Date.now(); save(); }
function vOv(){
  const o = S.ov; if (!o) return '';
  const top = (title, sub, pct) => `<div class="hj-ovtop"><div><div class="hj-kick">${esc(sub || '')}</div><b>${esc(title)}</b></div><button type="button" class="hj-x" data-hja="ovclose" aria-label="Close">&times;</button></div>${pct != null ? `<div class="hj-prog"><span style="width:${pct}%"></span></div>` : ''}`;
  let body = '';
  if (o.k === 'work' && o.stage === 'start') body = vStart(o, top);
  else if (o.k === 'work' && o.mode === 'auto') body = vAuto(o, top);
  else if ((o.k === 'cook' || o.k === 'prep') && o.guide) body = vGuide(o, top);
  else if (o.k === 'work'){
    const st = o.steps[o.i];
    if (o.fin || !st){ body = `${top(o.title, 'Workout done', 100)}${stagePanel('done', {})}<div class="hj-ovb"><div class="hj-big2">Strong work.</div><p class="hj-sub">${o.done.length} moves finished. Breathe, drink water, and write a word about how it felt.</p>
      ${lightLine('end') ? `<p class="hj-light">${esc(lightLine('end'))}</p>` : ''}${weightRule() ? `<p class="hj-sub">${esc(weightRule())}</p>` : ''}
      <label class="hj-fld"><span>How did it feel? (optional)</span><input id="hj-wnote" placeholder="Felt strong, knees easy..."></label>
      <button type="button" class="btn btn-gold hj-go" data-hja="wsave">Save Workout</button></div>`; }
    else {
      const pct = Math.round(100 * o.i / o.steps.length), lb = H().lifts[st.id], state = stState(o), ring = o.run && (o.rest || o.between) ? {pct: Math.max(0, o.end - Date.now()) / (o.tot || 1), secs: Math.ceil(Math.max(0, o.end - Date.now()) / 1000)} : {};
      const t = trans(o, state), wrap = x => `${stagePanel(state, Object.assign({fig: moveFig(st, false, o.rest || o.between)}, ring))}<div class="hj-ovb${t.cls}" style="${t.style}" data-hjstate="${state}">${x}</div>`;
      if (st.t === 'time'){ const ms = o.run ? o.end - Date.now() : (o.left || st.secs * 1000);
        body = `${top(o.title, st.part + ' · ' + (o.i + 1) + ' of ' + o.steps.length, pct)}${wrap(`<h2 class="hj-exn">${esc(st.name)}</h2><p class="hj-how">${esc(st.how || '')}</p>
          <div class="hj-clock" data-hjclock>${clock(ms)}</div>
          <div class="hj-ovbtns"><button type="button" class="btn btn-line" data-hja="${o.run ? 'pause' : 'tstart'}">${o.run ? 'Pause' : (o.left && o.left < st.secs * 1000 ? 'Keep Going' : 'Start Timer')}</button><button type="button" class="btn btn-gold" data-hja="next">Next</button></div>`)}`; }
      else if (o.between){ body = `${top(o.title, 'Rest', pct)}${wrap(`<div class="hj-kick hj-stk">Rest, then next up</div><h2 class="hj-exn">${esc(st.name)}</h2><div class="hj-clock" data-hjclock>${clock(Math.max(0, o.end - Date.now()))}</div>
          ${arr(st.tips).length ? `<ul class="hj-tips">${st.tips.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}${weightTip(st) ? `<p class="hj-wtl"><b>Weight:</b> ${esc(weightTip(st))}</p>` : ''}
          <div class="hj-ovbtns"><button type="button" class="btn btn-gold" data-hja="skiprest">Ready Now</button></div>`)}`; }
      else if (o.rest){ body = `${top(o.title, 'Rest', pct)}${wrap(`<div class="hj-kick hj-stk">Rest, then ${o.set + 1 === st.sets ? 'the last set' : 'set ' + (o.set + 1) + ' of ' + st.sets}</div><h2 class="hj-exn">${esc(st.name)}</h2>${dots(o.set + 1, st.sets)}<div class="hj-clock" data-hjclock>${clock(o.end - Date.now())}</div><p class="hj-mot">${esc((MOT()[(o.i + o.set) % Math.max(1, MOT().length)]) || 'Breathe slow. Sip water.')}</p>
          <div class="hj-ovbtns"><button type="button" class="btn btn-gold" data-hja="skiprest">Ready Now</button></div>`)}`; }
      else { body = `${top(o.title, st.part + ' · ' + (o.i + 1) + ' of ' + o.steps.length, pct)}${wrap(`<div class="hj-kick hj-stk">${o.set === st.sets && st.sets > 1 ? 'Last set' : `Set ${o.set} of ${st.sets}`}</div><h2 class="hj-exn">${esc(o.swap ? (st.swap || st.name) : st.name)}</h2>${dots(o.set, st.sets)}
          <div class="hj-reps">${esc(repTxt(st))}${esc(unitOf(st))}${st.side ? ' each side' : ''}</div>
          ${st.side ? `<p class="hj-cue">Left side first, then the right.</p>` : ''}
          ${o.swap ? `<p class="hj-how">Swap for ${esc(st.name)}. Same sets and reps.</p>` : `<p class="hj-how">${esc(st.how || '')}</p>${st.cue ? `<p class="hj-cue">${esc(st.cue)}</p>` : ''}`}
          ${st.kind === 'reps' ? `${weightTip(st) ? `<p class="hj-wtl"><b>Weight:</b> ${esc(weightTip(st))}</p>` : ''}<label class="hj-fld hj-lb"><span>Weight (lb), saved for next time</span><input id="hj-lb" inputmode="decimal" value="${esc(o.lb != null ? o.lb : (lb || ''))}" placeholder="Bodyweight"></label>` : ''}
          <div class="hj-ovbtns">${st.swap ? `<button type="button" class="btn btn-line" data-hja="swap">${o.swap ? 'Back to the Plan Move' : 'Joint-Friendly Swap'}</button>` : ''}<button type="button" class="btn btn-gold" data-hja="setdone">${o.set < st.sets ? 'Set Done' : 'Done, Next Move'}</button></div>
          <button type="button" class="linkbtn hj-skip" data-hja="next">Skip this move</button>`)}`; }
    }
  } else if (o.k === 'med'){
    const m = WK().meditation || {}, ms = o.run ? o.end - Date.now() : (o.left || o.mins * 60000);
    body = `${top('Meditation', o.mins + ' minutes')}${stagePanel(o.fin ? 'done' : 'med', {fig: candle()})}<div class="hj-ovb">${o.fin ? `<div class="hj-big2">Well done.</div><p class="hj-sub">Carry this stillness into your day.</p><button type="button" class="btn btn-gold hj-go" data-hja="ovclose">Close</button>` :
      `<ul class="hj-guide">${arr(m.guide).map(g => `<li>${esc(g)}</li>`).join('') || '<li>Sit tall and easy. Close your eyes.</li><li>Breathe in slowly through your nose, and out a little longer.</li><li>When your mind wanders, notice it, and come back to the breath.</li>'}</ul>
      <div class="hj-clock" data-hjclock>${clock(ms)}</div><div class="hj-ovbtns"><button type="button" class="btn btn-gold" data-hja="${o.run ? 'pause' : 'mstart'}">${o.run ? 'Pause' : (o.left && o.left < o.mins * 60000 ? 'Keep Going' : 'Begin')}</button><button type="button" class="btn btn-line" data-hja="mdone">I Am Done</button></div>`}</div>`;
  } else if (o.k === 'cook' || o.k === 'prep'){
    const x = o.data, steps = arr(x.steps), dn = o.dn = o.dn || {}, tdone = o.tdone || {};
    const nDone = steps.filter((s, i) => dn[i]).length, pct = steps.length ? Math.round(100 * nDone / steps.length) : 0;
    body = `${top(o.title, o.sub, pct)}${stagePanel('cook', {fig: window.GGStage ? '' : POT, small: true})}<div class="hj-ovb hj-left"><button type="button" class="btn btn-gold hj-go" data-hja="guide" style="margin-bottom:12px">Guide Me, Step by Step</button>
      ${x.prepped ? `<p class="hj-note"><b>Prepped:</b> ${esc(x.prepped)}</p>` : ''}
      ${o.k === 'cook' && nOk(x.nut) ? `<details class="hj-doc"><summary><span>Nutrition per Serving</span></summary><div class="hj-body">${nTable(x.nut, x.nutHeart)}</div></details>` : ''}
      ${arr(x.ingredients).length ? `<details class="hj-doc" open><summary><span>Ingredients</span></summary><div class="hj-body"><ul class="hj-ing">${arr(x.ingredients).map(g => `<li>${esc(g)}</li>`).join('')}</ul></div></details>` : ''}
      <ol class="hj-steps">${steps.map((s, i) => { const t = typeof s === 'string' ? {t: s} : s, on = !!dn[i], tm = +t.min || 0, running = o.run && o.ti === i;
        return `<li class="${on ? 'on' : ''}"><button type="button" class="hj-agck" data-hja="step" data-hjv="${i}" aria-pressed="${on}">${on ? '&#10003;' : i + 1}</button><div>${t.at ? `<span class="hj-at">${esc(t.at)}</span> ` : ''}${esc(t.t || '')}
          ${tm ? `<div class="hj-tm">${running ? `<span class="hj-clock sm" data-hjclock>${clock(o.end - Date.now())}</span><button type="button" class="btn btn-line btn-sm" data-hja="tstop">Stop</button>` : tdone[i] ? `<span class="hj-tdone">Timer done</span>` : `<button type="button" class="btn btn-line btn-sm" data-hja="stime" data-hjv="${i}">Start ${tm} min Timer</button>`}</div>` : ''}</div></li>`; }).join('')}</ol>
      ${x.serve ? `<p class="hj-sub"><b>Serve:</b> ${esc(x.serve)}</p>` : ''}${x.tip ? `<p class="hj-sub"><b>Tip:</b> ${esc(x.tip)}</p>` : ''}
      ${arr(x.yields).length ? `<p class="hj-sub"><b>Ready after:</b> ${arr(x.yields).map(esc).join(', ')}</p>` : ''}
      <button type="button" class="btn btn-gold hj-go" data-hja="cdone">${o.idea ? 'All Done' : o.k === 'cook' ? 'Dinner Is Done' : 'Prep Is Done'}</button></div>`;
  }
  const sc = stCol(stState(o), HOUR());
  return `<div class="hj-ov hj-st" data-hjst="${esc(stState(o))}" style="--st:${esc(sc.accent)};${sc.bg ? `--stbg:${esc(sc.bg)};` : ''}${sc.fg ? `--stfg:${esc(sc.fg)};` : ''}" role="dialog" aria-modal="true" aria-label="${esc(o.title || 'My Health')}"><div class="hj-ovin">${body}</div></div>`;
}
function openKey(key){
  const [k, a, b] = key.split(':');
  if (k === 'work') return openOv(buildWork(a));
  if (k === 'prac') return openOv(buildPractice());
  if (k === 'med' && MED()) return openOv(buildMed());
  if (k === 'pracid') return openOv(buildPractice(a));
  if (k === 'medid') return openOv(buildMed(a));
  if (k === 'med') return openOv({k: 'med', title: 'Meditation', mins: medMins(weekNo(new Date())), left: 0, run: false});
  if (k === 'shop'){ S.sec = 'shop'; S.shopWk = +a; rerender(false); window.scrollTo(0, 0); return; }
  if (k === 'prepsec'){ S.sec = 'prep'; S.prepWk = +a || null; rerender(false); window.scrollTo(0, 0); return; }
  if (k === 'prep') return openPrep(a, +b);
  if (k === 'cook') return openCook(a, b);
  markDone(key); toast('Marked done. Well done.'); rerender(true);
}
function openCook(wk, id){ const w = ((APP() || {}).dinners || {}).weeks || {}, x = arr((w[wk] || {}).dinners).find(z => z.id === id); if (!x) return openOv(null);
  openOv({k: 'cook', key: 'cook:' + wk + ':' + id, title: x.name, sub: (x.mins ? x.mins + ' minutes' : '') + (x.cost ? ' · about $' + x.cost : ''), data: x}); }
// Breakfasts, lunches, and snacks with steps open in Andrew's guide too (BLD 859).
function openIdea(type, i){ const x = arr(((APP() || {}).dinners || {})[type])[+i]; if (!x || !arr(x.steps).length) return openOv(null);
  openOv({k: 'cook', idea: true, key: 'idea:' + type + ':' + i, title: x.name, sub: x.mins ? x.mins + ' minutes' : '', data: x}); }
function openPrep(kind, n){ const p = prepFor(kind, n); if (!p) return openOv(null);
  const t = {sunday: 'Sunday Prep', wednesday: 'Wednesday Mini Prep', batch: p.title || 'Freezer Batch', pack: p.title || 'Pack Lunches'}[kind] || p.title || p.name;
  openOv({k: 'prep', key: 'prep:' + kind + ':' + n, title: t, sub: 'Week ' + letter(n) + (p.mins ? ' · about ' + p.mins + ' minutes' : ''), data: p}); }
function actTool(a, v){
  const h = H(), o = S.ov;
  if (actCoach(a, v)) return true;
  switch (a){
    case 'go': return openKey(v), true;
    case 'toggle': { const l = logOf(new Date()); if (l[v]) delete l[v]; else l[v] = Date.now(); if (l[v]){ if (v.startsWith('work:')) checkOn('move'); if (v === 'prac' || v === 'med') checkOn('still'); } save(); rerender(true); return true; }
    case 'work': return openOv(buildWork(v)), true;
    case 'cook': { const [w, id] = v.split('|'); openCook(w, id); return true; }
    case 'idea': { const [ty, ix] = v.split('|'); openIdea(ty, ix); return true; }
    case 'prep': { const [k, n] = v.split('|'); openPrep(k, +n); return true; }
    case 'wk': S.wkOff = (S.wkOff || 0) + (+v); rerender(true); return true;
    case 'shopwk': S.sec = 'shop'; S.shopWk = Math.max(1, +v); S.shopEd = null; rerender(false); return true;
    case 'prepwk': S.prepWk = Math.max(1, +v); rerender(true); return true;
    case 'remshow': S.remOpen = S.remOpen === v ? null : v; rerender(true); return true;
    case 'remwk': h.set.remWk = !h.set.remWk; h.set.u = Date.now(); save(); rerender(true); return true;
    case 'remoff': h.set.remOff = !h.set.remOff; h.set.u = Date.now(); save(); rerender(true); return true;
    case 'remics': { try { const b = new Blob([icsText()], {type: 'text/calendar'}), u = URL.createObjectURL(b), a2 = document.createElement('a'); a2.href = u; a2.download = 'my-health-reminders.ics'; document.body.appendChild(a2); a2.click(); a2.remove(); setTimeout(() => URL.revokeObjectURL(u), 60000);
      toast('Open the file and choose Add All. Your phone calendar takes it from here.'); } catch(e){ toast('This browser keeps the calendar file to itself. Try Safari or Chrome.'); } return true; }
    case 'stock': { const [id, d] = v.split('|'); h.stock = h.stock || {}; h.stock[id] = Math.max(0, (+h.stock[id] || 0) + (+d)); h.stockU = Date.now(); save(); rerender(true); return true; }
    case 'ggadd': { const [k, i] = v.split('|'), x = arr(((APP() || {}).dinners || {})[k])[+i]; if (!x) return true; const n = foodWeek(new Date()), L = shopList(n); if (!L) return true; let added = 0;
      arr(x.shop).forEach(g => { if (L.items.some(y => String(y.name).toLowerCase() === String(g.name).toLowerCase())) return; L.items.push({id: 'g' + uid(), store: g.store === 'grocer' ? 'grocer' : 'costco', sec: 'Grab and Go', name: g.name, amt: g.amt || '', price: +g.price || 0, for: x.name, nut: nOk(g.nut) ? g.nut : undefined, done: false, n: 500 + L.items.length}); added++; });
      keepShop(n, L); toast(added ? 'Added to Week ' + letter(n) + '\'s list.' : 'Already on the list.'); return true; }
    case 'store': S.store = v; S.shopEd = null; rerender(true); return true;
    case 'hide': S.hideDone = !S.hideDone; rerender(true); return true;
    case 'buy': { const n = S.shopWk || foodWeek(new Date()), L = shopList(n), x = L.items.find(y => y.id === v); if (!x) return true; x.done = !x.done; keepShop(n, L); rerender(true); return true; }
    case 'shoped': S.shopEd = S.shopEd === v ? null : v; rerender(true); return true;
    case 'shopclose': S.shopEd = null; rerender(true); return true;
    case 'shopsave': { const n = S.shopWk || foodWeek(new Date()), L = shopList(n), x = L.items.find(y => y.id === v); if (!x) return true;
      document.querySelectorAll('[data-hjsh]').forEach(i => { const f = i.dataset.hjsh; x[f] = f === 'price' ? (parseFloat(String(i.value).replace(/[^0-9.]/g, '')) || 0) : String(i.value).trim(); });
      if (!x.name){ toast('Add a name.'); return true; } S.shopEd = null; keepShop(n, L); toast('Saved.'); rerender(true); return true; }
    case 'shopdel': { const n = S.shopWk || foodWeek(new Date()), L = shopList(n); L.items = L.items.filter(y => y.id !== v); S.shopEd = null; keepShop(n, L); toast('Removed.'); rerender(true); return true; }
    case 'shopadd': { const i = document.getElementById('hj-addname'), t = String(i ? i.value : '').trim(); if (!t){ if (i) i.focus(); return true; }
      const n = S.shopWk || foodWeek(new Date()), L = shopList(n); L.items.push({id: 'u' + uid(), store: (S.store === 'grocer' ? 'grocer' : 'costco'), sec: 'Other', name: t.slice(0, 120), amt: '', price: 0, for: '', done: false, n: 999 + L.items.length}); keepShop(n, L); toast('Added.'); rerender(true); return true; }
    case 'shopcopy': { const txt = shopText(S.shopWk || foodWeek(new Date())), box = document.getElementById('hj-copy');
      const show = () => { if (box){ box.hidden = false; box.value = txt; box.focus(); box.select(); } toast('Select the list and copy it.'); };
      try { navigator.clipboard.writeText(txt).then(() => toast('Copied. Paste it into a text.'), show); } catch(e){ show(); } return true; }
    case 'shopreset': { if (!S.sureReset){ S.sureReset = true; rerender(true); setTimeout(() => { if (S.sureReset){ S.sureReset = false; rerender(true); } }, 3500); return true; }
      S.sureReset = false; const n = S.shopWk || foodWeek(new Date()), L = shopList(n); L.items.forEach(x => x.done = false); keepShop(n, L); toast('All boxes cleared.'); rerender(true); return true; }
    case 'ovclose': { if (o && o.k === 'work' && !o.fin && o.done.length && !o.sure){ o.sure = true; toast('Tap the X again to end this workout.'); return true; } closeOv(); return true; }
    case 'tstart': { const st = o.steps[o.i]; startTimer(o, (o.left && o.left < st.secs * 1000 ? o.left : st.secs * 1000) / 1000); rerender(true); return true; }
    case 'pause': o.left = Math.max(0, o.end - Date.now()); o.run = false; rerender(true); return true;
    case 'next': o.lb = null; if (o.between){ o.between = false; o.run = false; rerender(true); return true; } o.done.push(o.i); o.i++; o.set = 1; o.left = 0; o.run = false; o.rest = false; o.swap = false; o.sure = false; if (o.i >= o.steps.length) o.fin = true; rerender(true); return true;
    case 'swap': o.swap = !o.swap; rerender(true); return true;
    case 'setdone': { const st = o.steps[o.i], lb = document.getElementById('hj-lb'); if (lb && String(lb.value).trim()){ h.lifts[st.id] = String(lb.value).trim().slice(0, 12); save(); }
      if (o.set < st.sets){ o.rest = true; startTimer(o, st.rest); } else { o.lb = null; o.done.push(o.i); o.i++; o.set = 1; o.swap = false; o.run = false; o.rest = false; if (o.i >= o.steps.length) o.fin = true;
        else if (o.steps[o.i].t === 'ex' && st.restAfter){ o.between = true; startTimer(o, st.restAfter); } } rerender(true); return true; }
    case 'skiprest': if (o.between) o.between = false; else { o.rest = false; o.set++; } o.run = false; rerender(true); return true;
    case 'wsave': { const nt = document.getElementById('hj-wnote'); h.wlog.push({id: uid(), date: today(), s: o.s, title: o.title, moves: o.done.length, mins: o.active ? Math.round(o.active / 60000) : undefined, note: String(nt ? nt.value : '').trim().slice(0, 400), u: Date.now()});
      markDone(o.key || 'work:' + o.s); checkOn(o.prac ? 'still' : 'move'); toast('Workout saved. Well done.'); closeOv(); return true; }
    case 'mstart': startTimer(o, (o.left && o.left < o.mins * 60000 ? o.left : o.mins * 60000) / 1000); rerender(true); return true;
    case 'mdone': markDone('med'); checkOn('still'); o.run = false; o.fin = true; chime(); rerender(true); return true;
    case 'step': { o.dn = o.dn || {}; o.dn[v] = !o.dn[v]; rerender(true); return true; }
    case 'stime': { const s = arr(o.data.steps)[+v], m = +(s && s.min) || 0; if (m) startTimer(o, m * 60, +v); rerender(true); return true; }
    case 'tstop': o.run = false; o.ti = null; rerender(true); return true;
    case 'cdone': markDone(o.key); toast(o.idea ? 'Done. Enjoy.' : o.k === 'cook' ? 'Dinner done. Enjoy the table together.' : 'Prep done. The week is ready.'); closeOv(); return true;
  }
  return false;
}

// ---------- BLD 842: the coach. Play Session (hands-free), Kayti's daily practice, the kitchen guide ----------
// Every line the voice can say comes from LN below, so allLines() lists exactly what gets recorded (Ava: workouts and
// the practice; Andrew: the kitchen). Voice Off, Music Off, and I Did It keep every guide optional (Chris, October 24, 2026).
// BLD 857, the Grounded Health Regime (Chris, October 26, 2026, after his first full workout with Ava): a rest between
// moves with short tips, motivation lines in set rests, each side guided (Left side, Switch sides, Right side), I Tap Done
// for reps written as words, 60 seconds the longest rest, a weight line, an honest time estimate, and color and a stage
// (field-guide/stage.js, GGStage) for every player, with a morning palette.
const VO = () => window.GGVoice || null;
const NUMW = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'];
// Reps that are a number ("10 to 12", "8 per side", "10 total") are counted; reps written as words ("2 to 3 short of your best") are I Tap Done.
const REPS_RE = /^\s*(\d+)(\s*to\s*\d+)?\s*(reps?|seconds?|per side|each side|total|each)?\s*$/i;
const repWords = st => !REPS_RE.test(String(st.reps));
const repTxt = st => String(st.reps).replace(/\s*(per side|each side)\s*$/i, '').trim();
const unitOf = st => repWords(st) ? '' : st.kind === 'time' ? ' seconds' : st.kind === 'distance' ? '' : (/total$/i.test(repTxt(st)) ? '' : ' reps');
const secsOf = st => parseInt(String(st.reps), 10) || 30;
const LN = {
  ses: (t, m) => t + '. About ' + m + ' minutes. We begin with the warm-up.',
  time: st => (st.name + '. ' + (st.how || '')).trim(),
  ex: st => st.name + '. ' + st.sets + ' set' + (st.sets === 1 ? '' : 's') + ' of ' + repTxt(st) + unitOf(st) + (st.side ? ' each side' : '') + '.',
  set: (n, m) => n === m ? 'Last set.' : 'Set ' + n + ' of ' + m + '.',
  go: 'Go.', rest: s => 'Rest ' + s + ' seconds.', ten: 'Ten seconds.', nextSet: 'Next set.',
  next: n => 'Next up: ' + n + '.', cool: 'Cooldown time. Nice work.', out: 'That is the session. Strong work today.',
  nextRest: (s, n) => 'Rest ' + s + ' seconds. Next up: ' + n + '.',
  left: 'Left side.', right: 'Right side.', sw: 'Switch sides.', tap: 'Tap Set Done when you finish.',
  count: k => NUMW[k] + '.',
  pIntro: (t, m) => t + '. About ' + m + ' minutes. Settle in, and we begin.', pOut: 'Your practice is complete. Carry this calm with you.',
  mIntro: t => 'Today\'s meditation: ' + t + '. Find a comfortable seat, and let the day pause.', mOut: 'Your meditation is complete. Carry this stillness into your day.',
  cIntro: n => 'We are making ' + n + '.', prepIntro: t => 'We are starting ' + t + '.',
  tset: m => 'Timer set for ' + m + ' minute' + (m === 1 ? '' : 's') + '.', tdone: 'That timer is done.',
  cOut: 'All done. Enjoy the table together.', prepOut: 'Prep is done. Your week is ready.'
};
const repN = st => { if (repWords(st)) return 0; const n = parseInt(String(st.reps), 10); return n > 0 && n <= 20 ? n : 0; };
const AVA = 'ava', ANDREW = 'andrew';
const REST_MAX = 60, GET_READY = 30, SWITCH = 5, REP_SECS = 3, TAP_EST = 35;
const capRest = v => Math.max(0, Math.min(REST_MAX, Math.round(v)));
// A warm-up or cooldown hold done on each side (Couch Stretch, Figure-4): Ava says Switch sides at the halfway point.
const halfSide = x => /per side|each side|switch sides/i.test((x.name || '') + ' ' + (x.how || ''));
function stepsFor(ses, ph, light){
  const w = WK(), out = [];
  arr(w.warmup).forEach(x => out.push({t: 'time', name: x.name, how: x.how, secs: +x.secs || 45, part: 'Warm-up', fig: x.name, half: halfSide(x)}));
  arr(ses.blocks).forEach(b => arr(b.items).forEach(x => { const sets = +((x.sets || {})[ph] || (x.sets || {})['1'] || 1), reps = String((x.reps || {})[ph] || (x.reps || {})['1'] || '');
    out.push({t: 'ex', id: x.id || x.name, name: x.name, how: x.how, cue: x.cue, swap: x.swap, sets: light ? Math.max(1, sets - 1) : sets, reps, kind: x.kind || 'reps', part: b.title || 'Main', fig: x.name,
      rest: capRest(+x.rest || REST_MAX), restAfter: x.restAfter != null ? capRest(+x.restAfter || 0) : REST_MAX, side: !!x.side || /per side|each side/i.test(reps), tips: arr(x.tips).filter(Boolean).slice(0, 2), load: x.load || ''}); }));
  // The last move flows straight into the cooldown.
  for (let i = out.length - 1; i >= 0; i--) if (out[i].t === 'ex'){ out[i].restAfter = 0; break; }
  arr(w.cooldown).forEach(x => out.push({t: 'time', name: x.name, how: x.how, secs: +x.secs || 45, part: 'Cooldown', fig: x.name, half: halfSide(x)}));
  return out;
}
const PR = () => (APP() || {}).practice || null;
const MED = () => { const m = (APP() || {}).meditations; return m && arr(m.sessions).length ? m : null; };
const BRIAN = 'brian';
const lineSecs = t => 1.4 + String(t).split(/\s+/).length / 2.4;
// Morning light (workouts.light: {start, end}; an array or a string also works).
function lightLine(which){ const l = WK().light; if (!l) return ''; if (typeof l === 'string') return which === 'start' ? l : ''; if (Array.isArray(l)) return l[which === 'start' ? 0 : 1] || ''; return l[which] || ''; }
const MOT = () => arr(WK().motivation).filter(Boolean);
// A meditation fills the person's minutes (10, growing to 20): Brian's lines, then quiet sized by each segment's weight.
function buildMed(id){
  const m = MED(); if (!m) return null; const dow = DOW[new Date().getDay()];
  const ss = arr(m.sessions).find(x => x.id === id) || arr(m.sessions).find(x => x.day === dow) || m.sessions[0];
  const mins = medMins(weekNo(new Date())), segs = arr(ss.segments), talk = segs.reduce((a, g) => a + arr(g.lines).reduce((b, l) => b + lineSecs(l) + 0.8, 0), 0) + 8;
  const quiet = Math.max(60, mins * 60 - talk), wsum = segs.reduce((a, g) => a + (+g.quiet || 0), 0) || segs.length;
  const steps = segs.map(g => ({t: 'time', name: g.name, lines: arr(g.lines), secs: Math.round(quiet * ((wsum === segs.length && !segs.some(x => +x.quiet)) ? 1 : (+g.quiet || 0)) / wsum), part: ss.title, candle: true}));
  return {k: 'work', prac: true, med: true, s: ss.id, title: ss.title, lead: ss.focus || '', mins, steps, i: 0, set: 1, done: [], stage: 'start', voice: BRIAN, music: '/audio/music/calm-' + (1 + (new Date().getDay() + 3) % 7) + '.mp3', key: 'med'};
}
function candle(){ return `<div class="hj-candle" aria-hidden="true"><svg viewBox="0 0 120 200"><defs><radialGradient id="hjglow" cx="50%" cy="40%" r="50%"><stop offset="0" stop-color="#FFD58A" stop-opacity=".55"/><stop offset="1" stop-color="#FFD58A" stop-opacity="0"/></radialGradient></defs>
  <circle cx="60" cy="62" r="58" fill="url(#hjglow)" class="hj-glow"/><path class="hj-flame" d="M60 22 C72 44 74 58 60 74 C46 58 48 44 60 22 Z" fill="#F6B04A"/><path class="hj-flame2" d="M60 40 C66 52 66 60 60 70 C54 60 54 52 60 40 Z" fill="#FFF1C9"/>
  <line x1="60" y1="74" x2="60" y2="84" stroke="#3A2C1E" stroke-width="3" stroke-linecap="round"/><rect x="38" y="84" width="44" height="100" rx="8" fill="#F2ECE0" stroke="#D9CBB2" stroke-width="2"/><rect x="26" y="184" width="68" height="8" rx="4" fill="#B99B6B"/></svg></div>`; }
// Andrew's kitchen: a simple pot with steam for the stage.
const POT = `<svg viewBox="0 0 240 240" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M52 118h136v54a28 28 0 0 1-28 28H80a28 28 0 0 1-28-28z"/><path d="M40 118h160M52 132H30M188 132h22"/><path class="hj-steam" d="M92 96c-10-12 10-20 0-34M120 96c-10-12 10-20 0-34M148 96c-10-12 10-20 0-34" opacity=".55"/></g></svg>`;
function practiceFor(d){ const p = PR(); if (!p || !arr(p.sessions).length) return null; const s = p.sessions[(d.getDay() + 6) % 7 % p.sessions.length]; return s; }
function buildPractice(s){
  const p = PR(), ss = arr(p && p.sessions).find(x => x.id === s) || practiceFor(new Date()); if (!ss) return null;
  const steps = arr(ss.steps).map(x => ({t: 'time', name: x.name, how: x.how, secs: +x.secs || 60, part: 'Practice', fig: x.fig || 'seat', figKey: true, ease: x.ease, breath: x.breath}));
  return {k: 'work', prac: true, s: ss.id, title: ss.title || 'Daily Practice', lead: ss.focus || '', mins: ss.mins, steps, i: 0, set: 1, done: [], stage: 'start', voice: AVA, music: '/audio/music/calm-' + (1 + (new Date().getDay() % 7)) + '.mp3', key: 'prac'};
}
// Every line, for recording and for tests.
function allLines(){
  const out = new Map(), add = (v, t) => { if (t) out.set(v + '|' + t, {voice: v, text: t}); }, w = WK(), app = APP() || {};
  Object.entries(w.sessions || {}).forEach(([id, ses]) => { add(AVA, LN.ses(ses.title || 'Session ' + id, ses.mins || 50));
    ['1', '2', '3'].forEach(ph => [false, true].forEach(light => { const S2 = stepsFor(ses, ph, light); S2.forEach((st, i) => {
      const nx = S2[i + 1];
      if (st.t === 'time'){ add(AVA, LN.time(st)); if (nx && nx.t === 'ex') add(AVA, LN.nextRest(GET_READY, nx.name)); }
      else { add(AVA, LN.ex(st)); add(AVA, st.cue); add(AVA, LN.rest(st.rest)); for (let n = 2; n <= st.sets; n++) add(AVA, LN.set(n, st.sets)); st.tips.forEach(t => add(AVA, t));
        if (nx && nx.t === 'ex') add(AVA, st.restAfter ? LN.nextRest(st.restAfter, nx.name) : LN.next(nx.name)); }
    }); })); });
  for (let k = 1; k <= 20; k++) add(AVA, LN.count(k));
  [LN.go, LN.ten, LN.nextSet, LN.cool, LN.out, LN.pOut, LN.left, LN.right, LN.sw, LN.tap, lightLine('start'), lightLine('end')].forEach(t => add(AVA, t));
  MOT().forEach(t => add(AVA, t));
  const md = app.meditations; arr(md && md.sessions).forEach(s => { add(BRIAN, LN.mIntro(s.title)); arr(s.segments).forEach(g => arr(g.lines).forEach(l => add(BRIAN, l))); }); add(BRIAN, LN.mOut);
  const p = app.practice; arr(p && p.sessions).forEach(s => { add(AVA, LN.pIntro(s.title, s.mins)); arr(s.steps).forEach(x => add(AVA, LN.time({name: x.name, how: x.how}))); });
  ['breakfasts', 'lunches', 'snacks'].forEach(ty => arr((app.dinners || {})[ty]).forEach(x => { if (!arr(x.steps).length) return; add(ANDREW, LN.cIntro(x.name)); arr(x.steps).forEach(s => { const t = typeof s === 'string' ? {t: s} : s; add(ANDREW, t.t); if (+t.min) add(ANDREW, LN.tset(+t.min)); }); }));
  const dn = (app.dinners || {}).weeks || {}; Object.values(dn).forEach(wk => arr(wk.dinners).forEach(x => { add(ANDREW, LN.cIntro(x.name)); arr(x.steps).forEach(s => { const t = typeof s === 'string' ? {t: s} : s; add(ANDREW, t.t); if (+t.min) add(ANDREW, LN.tset(+t.min)); }); }));
  const sp = (app.shop || {}).weeks || {}; Object.values(sp).forEach(wk => ['sunday', 'wednesday', 'batch'].forEach(k => { const x = wk[k]; if (!x) return; add(ANDREW, LN.prepIntro({sunday: 'Sunday Prep', wednesday: 'Wednesday Mini Prep', batch: x.title || 'Freezer Batch'}[k]));
    arr(x.steps).forEach(s => { const t = typeof s === 'string' ? {t: s} : s; add(ANDREW, t.t); if (+t.min) add(ANDREW, LN.tset(+t.min)); }); }));
  const bt = app.batches || {}; arr(bt.batches).concat(bt.pack ? [Object.assign({name: bt.pack.title || 'Pack Lunches'}, bt.pack)] : []).forEach(x => { add(ANDREW, LN.prepIntro(x.title || x.name)); arr(x.steps).forEach(s => { const t = typeof s === 'string' ? {t: s} : s; add(ANDREW, t.t); if (+t.min) add(ANDREW, LN.tset(+t.min)); }); });
  [LN.tdone, LN.cOut, LN.prepOut].forEach(t => add(ANDREW, t));
  return [...out.values()];
}
// ---------- the honest clock: the same model the engine runs ----------
// Seconds from step i (set `set`) to the end. Speech is lineSecs per line; counted reps 3 seconds each; a tapped set about
// 35 seconds; holds their seconds; each side doubles the work and adds Switch sides (5 seconds); every rest and the rest
// between moves at its full length; 30 seconds to get ready after the warm-up.
function planSecs(steps, i0, set0, o){
  let s = 0; const at = i0 || 0;
  steps.forEach((st, i) => { if (i < at) return; const nx = steps[i + 1];
    if (st.t === 'time'){ s += st.secs + (st.lines ? arr(st.lines).reduce((a, l) => a + lineSecs(l) + 0.8, 0) : lineSecs(LN.time(st))) + (st.half ? lineSecs(LN.sw) : 0);
      if (!st.lines && st.part === 'Cooldown' && steps[i - 1] && steps[i - 1].part !== 'Cooldown' && !(o && o.prac)) s += lineSecs(LN.cool);
      if (nx && nx.t === 'ex') s += GET_READY; return; }
    const first = i === at ? (set0 || 1) : 1, left = Math.max(0, st.sets - first + 1), sides = st.side ? 2 : 1;
    const work = st.kind === 'time' ? secsOf(st) : repN(st) ? repN(st) * REP_SECS : TAP_EST;
    const perSet = lineSecs(LN.go) + sides * work + (st.side ? 2 * lineSecs(LN.left) + lineSecs(LN.sw) + SWITCH : 0) + (repN(st) || st.kind === 'time' ? 0 : 2);
    s += (first === 1 ? lineSecs(LN.ex(st)) + (st.cue ? lineSecs(st.cue) : 0) : 0) + left * perSet + Math.max(0, left - 1) * (st.rest + lineSecs(LN.set(2, 3)));
    if (nx && nx.t === 'ex') s += st.restAfter || lineSecs(LN.next(nx.name)); });
  return s;
}
function sessSecs(ses, ph, light){ const st = stepsFor(ses, ph, light); return planSecs(st, 0, 1) + lineSecs(LN.ses(ses.title || '', 50)) + lineSecs(lightLine('start')) + lineSecs(LN.out) + lineSecs(lightLine('end')); }
// ---------- the hands-free engine ----------
const sleep = ms => new Promise(r => setTimeout(r, ms));
function estLeft(o){ let s = planSecs(o.steps, o.i, o.between ? 1 : o.set, o); const left = o.run && o.end ? Math.max(0, o.end - Date.now()) / 1000 : 0;
  if (o.between) s += left; else if (o.run) s -= Math.max(0, (o.tot || 0) / 1000 - left); return Math.max(0, s) * 1000; }
async function speak(o, text){ const V = VO(); if (!V || !text || o.dead) return; const nx = o.steps[o.i + 1]; o.spk = (o.spk || 0) + 1;
  try { await V.say(o.voice || AVA, text); } finally { o.spk--; }
  if (nx && V.prefetch) V.prefetch(o.voice || AVA, nx.t === 'time' ? LN.time(nx) : LN.ex(nx)); }
async function snooze(o, ms){ const end = Date.now() + ms; while (Date.now() < end && !o.skip && !o.dead) await sleep(80); }
async function hold(o){ while (o.paused && !o.dead && !o.skip) await sleep(120); }
const lg = (o, e) => { (o.log = o.log || []).push(Object.assign({i: o.i, set: o.set, side: o.side || ''}, e)); };
// A timer that honors Pause, Skip, and +15 seconds; ticks the last 3 seconds; says Ten seconds on longer rests; drains the ring.
// kind: '' for work, 'rest' between sets, 'between' between moves, 'switch' between sides.
async function runTimer(o, ms, kind, half){
  o.end = Date.now() + ms; o.tot = ms; o.run = true; o.rest = kind === 'rest'; o.sw = kind === 'switch'; let said10 = false, saidHalf = false, last = 99; rerender(true);
  while (!o.dead && !o.skip){
    if (o.paused){ const left = o.end - Date.now(); await hold(o); o.end = Date.now() + left; continue; }
    const left = o.end - Date.now(); if (left <= 0) break;
    const s = Math.ceil(left / 1000);
    if ((kind === 'rest' || kind === 'between') && s === 10 && !said10 && ms > 15000){ said10 = true; if (!o.spk) speak(o, LN.ten); }
    if (half && !saidHalf && left <= o.tot / 2){ saidHalf = true; o.side = 'R'; speak(o, LN.sw); rerender(true); }
    if (s <= 3 && s !== last){ last = s; VO() && VO().tick(); }
    document.querySelectorAll('[data-hjclock]').forEach(e => e.textContent = clock(left));
    stageUpd(Math.max(0, Math.min(1, left / (o.tot || ms))), s);
    await sleep(100);
  }
  o.run = false; o.rest = false; o.sw = false; if (half) o.side = '';
}
async function waitTap(o){ o.wait = true; rerender(true); while (o.wait && !o.dead && !o.skip) await sleep(120); o.wait = false; }
// One set: each side in turn (Left side, the work, Switch sides, Right side, the work). Skip ends the stage it is on:
// during the left side it moves to the right side; otherwise it ends this set, and the rest and the next sets still run.
async function doSet(o, st){
  const sides = st.side ? ['L', 'R'] : [''];
  for (let k = 0; k < sides.length && !o.dead; k++){
    if (k){ o.side = ''; await speak(o, LN.sw); await runTimer(o, SWITCH * 1000, 'switch'); if (o.dead) break; if (o.skip){ o.skip = false; if (o.skipMove) break; } }
    o.side = sides[k]; rerender(true);
    if (o.side) await speak(o, o.side === 'L' ? LN.left : LN.right);
    await hold(o); if (o.dead || o.skip) { if (o.skip && k < sides.length - 1 && !o.skipMove){ o.skip = false; continue; } break; }
    if (st.kind === 'time'){ await speak(o, LN.go); lg(o, {e: 'hold'}); await runTimer(o, secsOf(st) * 1000, ''); }
    else if (o.count && repN(st)){ await speak(o, LN.go); o.rep = 0; rerender(true);
      for (let r = 1; r <= repN(st) && !o.dead && !o.skip; r++){ await hold(o); if (o.skip) break; o.rep = r; document.querySelectorAll('[data-hjrep]').forEach(e => e.textContent = r); const t0 = Date.now(); await speak(o, LN.count(r)); const wt = REP_SECS * 1000 - (Date.now() - t0); if (wt > 0) await snooze(o, wt); }
      o.rep = 0; }
    else { await speak(o, LN.go); if (o.set === 1 && k === 0 && !repN(st)) speak(o, LN.tap); await waitTap(o); }
    if (o.skip && k < sides.length - 1 && !o.skipMove) o.skip = false;
  }
  o.side = ''; o.rep = 0;
}
// The rest before a move: Next up, its tips, its weight line, and a draining ring.
async function between(o, nx, secs){
  if (!secs){ await speak(o, LN.next(nx.name)); return; }
  o.between = true; lg(o, {e: 'between', secs});
  (async () => { await speak(o, LN.nextRest(secs, nx.name)); for (const t of arr(nx.tips)){ if (o.dead || !o.between) break; await speak(o, t); } })();
  await runTimer(o, secs * 1000, 'between');
  o.between = false; o.skip = false;
}
function motLine(o){ const m = MOT(); if (!m.length) return ''; if (o.mi == null){ const d = new Date(); o.mi = (d.getDate() * 7 + d.getMonth() * 3) % m.length; } return m[o.mi++ % m.length]; }
// Upbeat workout music when the move tracks are on the site (BLD 857), else the learning tracks.
let MOVE_OK = null;
async function moveMusic(){ if (MOVE_OK == null){ try { const c = new AbortController(), t = setTimeout(() => c.abort(), 2500); const r = await fetch('/audio/music/move-1.mp3', {method: 'HEAD', signal: c.signal}); clearTimeout(t); MOVE_OK = !!r.ok; } catch(e){ MOVE_OK = false; } } return MOVE_OK; }
async function runSession(o){
  const V = VO(); o.mode = 'auto'; o.stage = 'run'; o.t0 = Date.now(); o.active = 0; o.dead = false; o.lastT = Date.now(); o.log = [];
  if (V) V.unlock();
  if (!o.music && !o.prac) o.music = (await moveMusic()) ? '/audio/music/move-' + (1 + (new Date().getDay() + o.title.length) % 7) + '.mp3' : '/audio/music/learning-' + (1 + (o.title.length % 7)) + '.mp3';
  if (V) V.music(o.music);
  rerender(true);
  await speak(o, o.med ? LN.mIntro(o.title) : o.prac ? LN.pIntro(o.title, o.mins || Math.round(estLeft(o) / 60000)) : LN.ses(o.title, o.mins || Math.round(estLeft(o) / 60000)));
  if (!o.prac && lightLine('start')){ o.mline = lightLine('start'); rerender(true); await speak(o, o.mline); }
  while (!o.dead && o.i < o.steps.length){
    const st = o.steps[o.i]; o.skip = false; o.skipMove = false; o.mline = ''; rerender(true);
    if (st.t === 'time'){
      if (!o.prac && st.part === 'Cooldown' && o.steps[o.i - 1] && o.steps[o.i - 1].part !== 'Cooldown') await speak(o, LN.cool);
      if (st.lines){ for (const ln of st.lines){ if (o.dead || o.skip) break; o.line = ln; rerender(true); await hold(o); await speak(o, ln); if (!(VO() && VO().on())) await snooze(o, Math.min(4000, lineSecs(ln) * 1000)); await snooze(o, 800); } o.line = ''; }
      else await speak(o, LN.time(st));
      await hold(o); if (o.dead) break;
      if (!o.skip) await runTimer(o, st.secs * 1000, '', st.half);
      o.done.push(o.i); o.i++; o.set = 1; o.skip = false;
      const nx = o.steps[o.i]; if (nx && nx.t === 'ex' && !o.dead) await between(o, nx, GET_READY);
      continue;
    }
    if (o.set === 1){ await speak(o, LN.ex(st)); if (st.cue) await speak(o, st.cue); } else await speak(o, LN.set(o.set, st.sets));
    await hold(o); if (o.dead) break;
    await doSet(o, st);
    if (o.dead) break;
    lg(o, {e: 'set'});
    const skipMove = o.skipMove; o.skip = false; o.skipMove = false;
    if (!skipMove && o.set < st.sets){ const r = st.rest; lg(o, {e: 'rest', secs: r}); o.mline = motLine(o);
      (async () => { await speak(o, LN.rest(r)); if (o.rest && o.mline) await speak(o, o.mline); })();
      await runTimer(o, r * 1000, 'rest'); if (o.dead) break; o.skip = false; o.set++; continue; }
    o.done.push(o.i); o.i++; o.set = 1; o.mline = '';
    const nx = o.steps[o.i]; if (nx && nx.t === 'ex' && !o.dead) await between(o, nx, st.restAfter);
  }
  if (!o.dead){ o.fin = true; o.run = false; rerender(true); if (o.med && typeof chime === 'function') chime(); await speak(o, o.med ? LN.mOut : o.prac ? LN.pOut : LN.out); if (!o.prac && lightLine('end')) await speak(o, lightLine('end')); }
  V && V.music(null);
}
function sessClock(o){ const now = Date.now(); if (!o.paused) o.active += now - (o.lastT || now); o.lastT = now; return clock(o.active); }
setInterval(() => { const o = S.ov; if (!o || o.mode !== 'auto' || o.fin) return; const e = document.querySelector('[data-hjsess]'); if (e) e.textContent = sessClock(o); const l = document.querySelector('[data-hjleft]'); if (l) l.textContent = 'about ' + Math.max(1, Math.round(estLeft(o) / 60000)) + ' min left'; }, 1000);
// ---------- color and the stage (BLD 857): every player wears its state's color over a scene from GGStage ----------
// States: work, rest, next, breathe, last, done, cook, med, practice. A morning palette before noon, warmer after 6 pm.
const HOUR = () => new Date().getHours();
const BREATH = {long: [5, 5], four: [4, 4], alternate: [4, 4], fire: [0.5, 0.5], slow: [4, 6]};
const STC = {work: ['#1C7CE0', '#2A6FB5', '#B8612E'], rest: ['#0FA394', '#26907F', '#3C8B78'], next: ['#E09A12', '#CC8E1E', '#C9822B'], breathe: ['#4F8EE0', '#6C7FA6', '#8A74B4'],
  last: ['#F0631A', '#DF5F28', '#CC512E'], done: ['#2FA350', '#4F9A48', '#6C984C'], cook: ['#E0852A', '#C9772B', '#B5632C'], med: ['#7766CC', '#7A68A6', '#94688C'], practice: ['#1FA37C', '#3F977A', '#6E8E5C']};
function stCol(state, hour){
  if (window.GGStage && GGStage.colors){ try { const c = GGStage.colors(state, hour); if (c && c.accent) return c; } catch(e){} }
  const a = STC[state] || STC.work, k = hour < 12 ? 0 : hour < 18 ? 1 : 2; return {bg: '', fg: '', accent: a[k]};
}
let FLIP_OK = null;
function moveFig(st, flip, still){ const M = window.GGMoves; if (!M || !st) return ''; try { const pat = st.figKey ? (M.pick ? M.pick(st.fig, st.name) : st.fig) : (M.of ? M.of(st.fig || st.name) : 'standing'), op = {size: 214, still: !!still};
  if (!flip) return M.svg(pat, op); if (FLIP_OK == null) FLIP_OK = M.svg('standing', {flip: true, still: true}) !== M.svg('standing', {still: true});
  return FLIP_OK ? M.svg(pat, Object.assign(op, {flip: true})) : `<div style="transform:scaleX(-1)">${M.svg(pat, op)}</div>`; } catch(e){ return ''; } }
function figOf(st, flip){ if (st && st.candle) return candle(); const f = moveFig(st, flip); return f ? `<div class="hj-fig" aria-hidden="true">${f}</div>` : ''; }
function stageFallback(state, op){ const c = stCol(state, op.hour);
  return `<div class="hj-scn" data-ggstage data-st="${esc(state)}" style="--ac:${esc(c.accent)}"><div class="hj-sky"></div>${op.inhale ? `<div class="hj-breath" style="--in:${+op.inhale}s;--out:${+op.exhale || +op.inhale}s"></div>` : ''}
    ${op.fig ? `<div class="hj-scfig${op.pct != null ? ' wring' : ''}">${op.fig}</div>` : ''}${op.pct != null ? `<div class="hj-ring${op.fig ? ' sm' : ''}" style="--p:${(+op.pct).toFixed(3)}"><b>${esc(op.secs != null ? op.secs : '')}</b></div>` : ''}
    ${op.side ? `<span class="hj-sidebadge">${op.side === 'L' ? 'Left' : 'Right'}</span>` : ''}</div>`; }
function stagePanel(state, op){ op = Object.assign({hour: HOUR()}, op || {}); let inner = '';
  if (window.GGStage && GGStage.scene){ try { inner = GGStage.scene(state, op) || ''; } catch(e){ inner = ''; } }
  const fb = !inner; if (fb) inner = stageFallback(state, op);
  return `<div class="hj-stagebox${fb ? ' fb' : ''}${op.small ? ' sm' : ''}" aria-hidden="true">${inner}</div>`; }
function stageUpd(pct, secs){ const el = document.querySelector('[data-ggstage]'); if (!el) return;
  if (window.GGStage && GGStage.update){ try { GGStage.update(el, {pct, secs}); } catch(e){} return; }
  const r = el.querySelector('.hj-ring'); if (r){ r.style.setProperty('--p', pct.toFixed(3)); const b = r.querySelector('b'); if (b && secs != null) b.textContent = secs; } }
// Which state the open player is in.
function stState(o){
  if (!o) return 'work';
  if (o.k === 'cook' || o.k === 'prep') return 'cook';
  if (o.k === 'med' || o.med) return o.fin ? 'done' : 'med';
  if (o.fin) return 'done';
  if (o.stage === 'start') return o.prac ? 'practice' : 'next';
  const st = o.steps && o.steps[o.i]; if (!st) return 'done';
  if (o.between) return 'next';
  if (o.rest || o.sw) return 'rest';
  if (o.prac) return st.breath ? 'breathe' : 'practice';
  if (st.t === 'time') return st.part === 'Cooldown' ? 'breathe' : 'work';
  return o.set >= st.sets && st.sets > 1 ? 'last' : 'work';
}
// The overlay wears the state color; when the state changes, the color washes over from the last one.
const TR = {key: '', ac: '', prev: '', at: 0};
function trans(o, state){ const st = o && o.steps ? o.steps[o.i] : null, c = stCol(state, HOUR()), key = state + '|' + (o ? (o.i || 0) + '|' + (o.set || 0) + '|' + (o.side || '') + '|' + (o.gi || 0) : '');
  if (key !== TR.key){ TR.prev = TR.ac || c.accent; TR.ac = c.accent; TR.key = key; TR.at = Date.now(); }
  const el = Date.now() - TR.at, on = el < 700; return {cls: on ? ' hj-in' : '', style: `--st:${c.accent};--st0:${TR.prev};${on ? `--hjd:-${el}ms;` : ''}`}; }
// Saved weight first, then the Founder's starting suggestion, then the library's general line.
function weightTip(st){ if (!st || st.t !== 'ex') return '';
  const last = (H().lifts || {})[st.id]; if (last) return 'Last time: ' + last + (/^\d+(\.\d+)?$/.test(String(last)) ? ' lb' : '') + '.';
  const m = MINE(), w = m && m.weights && (m.weights[st.name] || m.weights[st.id]); if (w) return 'Suggested: ' + w + '.';
  return st.load || ''; }
const weightRule = () => { const m = MINE(); return (m && m.weightsRule) || ''; };
const wantsWeight = st => st && st.t === 'ex' && st.kind !== 'time' && (!!weightTip(st) || /dumbbell|weight/i.test(st.name + ' ' + (st.how || '')));
function weightBox(st){ if (!wantsWeight(st)) return ''; const tip = weightTip(st), lb = (H().lifts || {})[st.id];
  return `<div class="hj-wt">${tip ? `<p class="hj-wtl"><b>Weight:</b> ${esc(tip)}</p>` : ''}<label class="hj-fld hj-lb"><span>Weight (lb), saved for next time</span><input id="hj-lb" data-hjid="${esc(st.id)}" inputmode="decimal" value="${esc(lb || '')}" placeholder="Bodyweight"></label></div>`; }
const dots = (n, m) => m > 1 ? `<div class="hj-dots" aria-label="Set ${n} of ${m}">${Array.from({length: m}, (x, k) => `<i class="${k < n - 1 ? 'd' : k === n - 1 ? 'c' : ''}"></i>`).join('')}</div>` : '';
function toggles(o){
  const V = VO(), on = V ? V.on() : false, mu = V ? V.musicOn() : false, ch = V ? V.chimeOn() : true;
  return `<div class="hj-tg">
    <button type="button" class="chip${on ? ' on' : ''}" aria-pressed="${on}" data-hja="tvoice">${on ? 'Voice On' : 'Voice Off'}</button>
    <button type="button" class="chip${mu ? ' on' : ''}" aria-pressed="${mu}" data-hja="tmusic">${mu ? 'Music On' : 'Music Off'}</button>
    <button type="button" class="chip${ch ? ' on' : ''}" aria-pressed="${ch}" data-hja="tchime">${ch ? 'Beeps On' : 'Beeps Off'}</button>
    ${o && !o.prac ? `<button type="button" class="chip${o.count ? ' on' : ''}" aria-pressed="${!!o.count}" data-hja="tcount">${o.count ? 'Ava Counts Reps' : 'I Tap Done'}</button>` : ''}</div>`;
}
function vStart(o, top){
  const moves = o.steps.filter(s => s.t === 'ex'), mins = o.prac || o.med ? (o.mins || Math.round(estLeft(o) / 60000)) : Math.max(1, Math.round(estLeft(o) / 60000 + (lineSecs(LN.ses(o.title, 50)) + lineSecs(LN.out)) / 60));
  const kit = o.med ? ['a comfortable seat'] : !o.prac ? ['dumbbells', 'bench', 'pull-up bar', 'dip bar', 'mat'].filter(k => moves.some(m => new RegExp(k.split(' ')[0].replace('dumbbells', 'dumbbell'), 'i').test((m.name || '') + ' ' + (m.how || '')))) : ['a mat or a cushion', 'water'];
  const st0 = o.steps.find(s => s.t === 'ex') || o.steps[0], lt = !o.prac && lightLine('start');
  return `${top(o.title, o.med ? 'Daily Meditation' : o.prac ? 'Daily Practice' : 'Today\'s Session', null)}${stagePanel(stState(o), {fig: o.med ? candle() : moveFig(st0)})}<div class="hj-ovb">
    <div class="hj-big2" style="margin-top:6px">${esc(String(mins))} minutes</div>
    <p class="hj-sub">${o.prac ? esc(o.lead || '') : `${moves.length} moves, with a warm-up and a cooldown, and a rest between moves.`}${kit.length ? ' Have ready: ' + esc(kit.join(', ')) + '.' : ''}</p>
    ${lt ? `<p class="hj-light">${esc(lt)}</p>` : ''}
    ${o.prac && (PR() || {}).safety ? `<p class="hj-note" style="text-align:left">${esc(PR().safety)}</p>` : ''}
    ${toggles(o)}
    <button type="button" class="btn btn-gold hj-go" data-hja="play">Play ${o.med ? 'Meditation' : o.prac ? 'Practice' : 'Session'}</button>
    <div class="hj-ovbtns"><button type="button" class="btn btn-line" data-hja="manual">Step Through</button><button type="button" class="btn btn-line" data-hja="didit">I Did It</button></div>
    <details class="hj-doc" style="text-align:left;margin-top:16px"><summary><span>What is in it</span></summary><div class="hj-body"><ol>${o.steps.map(s => `<li>${esc(s.name)}${s.t === 'ex' ? ` <small>${esc(s.sets + ' x ' + s.reps)}</small>` : ` <small>${Math.round(s.secs / 6) / 10} min</small>`}</li>`).join('')}</ol></div></details></div>`;
}
function doneBlock(o, title){ const lt = !o.prac && lightLine('end'), wr = !o.prac && weightRule();
  return `${stagePanel('done', {fig: o.med ? candle() : ''})}<div class="hj-ovb"><div class="hj-big2">${esc(title)}</div><p class="hj-sub">Time: ${esc(clock(o.active || 0))}.</p>
    ${lt ? `<p class="hj-light">${esc(lt)}</p>` : ''}${wr ? `<p class="hj-sub">${esc(wr)}</p>` : ''}
    <label class="hj-fld" style="text-align:left"><span>How did it feel? (optional)</span><input id="hj-wnote" placeholder="${o.prac ? 'Calm, loose, clear...' : 'Felt strong, knees easy...'}"></label>
    <button type="button" class="btn btn-gold hj-go" data-hja="wsave">Save</button></div>`; }
function vAuto(o, top){
  const st = o.steps[o.i], pct = Math.round(100 * o.i / o.steps.length);
  if (o.fin || !st) return `${top(o.title, o.prac ? 'Practice complete' : 'Session complete', 100)}${doneBlock(o, o.prac ? 'Well done.' : 'Strong work.')}`;
  const state = stState(o), left = o.run ? Math.max(0, o.end - Date.now()) : 0, ring = o.run && (o.rest || o.between || o.sw) ? {pct: left / (o.tot || 1), secs: Math.ceil(left / 1000)} : {};
  const br = st.breath ? BREATH[st.breath] || BREATH.long : state === 'breathe' && /breath/i.test(st.name) ? BREATH.slow : null;
  const flip = o.side === 'L', pill = st.t === 'ex' ? (o.between ? 'Next Up' : o.rest ? (o.set + 1 === st.sets ? 'Last Set Next' : 'Set ' + (o.set + 1) + ' Next') : o.set === st.sets && st.sets > 1 ? 'Last Set' : 'Set ' + o.set + ' of ' + st.sets) : '';
  const sop = Object.assign({fig: st.candle ? candle() : moveFig(st, flip, o.rest || o.between), side: o.side || '', label: pill, inhale: br && br[0], exhale: br && br[1]}, ring);
  const big = o.run ? `<div class="hj-clock" data-hjclock>${clock(left)}</div>` : o.rep ? `<div class="hj-clock" data-hjrep>${o.rep}</div>` : st.t === 'ex' ? `<div class="hj-reps">${esc(repTxt(st))}${esc(unitOf(st))}${st.side ? ' each side' : ''}</div>` : `<div class="hj-clock" data-hjclock>${clock(st.secs * 1000)}</div>`;
  const sideTxt = o.side === 'L' ? ' · Left side' : o.side === 'R' ? ' · Right side' : '';
  const label = o.between ? 'Rest, then next up' : o.sw ? 'Switch sides' : o.rest ? `Rest, then ${o.set + 1 === st.sets ? 'the last set' : 'set ' + (o.set + 1) + ' of ' + st.sets}` : st.t === 'ex' ? (o.set === st.sets && st.sets > 1 ? 'Last set' : `Set ${o.set} of ${st.sets}`) + sideTxt : st.part + sideTxt;
  let detail;
  if (o.between) detail = `${arr(st.tips).length ? `<ul class="hj-tips">${st.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : `<p class="hj-how">${esc(st.how || '')}</p>`}${weightBox(st)}`;
  else if (o.rest) detail = `<p class="hj-mot">${esc(o.mline || 'Breathe slow. Sip water.')}</p>${weightBox(st)}`;
  else if (o.sw) detail = `<p class="hj-how">Switch to your right side.</p>`;
  else if (st.lines) detail = `<p class="hj-how hj-mline">${esc(o.line || (o.run ? 'Rest in the quiet.' : ''))}</p>`;
  else detail = `${o.mline && o.i === 0 ? `<p class="hj-light">${esc(o.mline)}</p>` : ''}<p class="hj-how">${esc(st.how || '')}</p>${st.cue ? `<p class="hj-cue">${esc(st.cue)}</p>` : ''}${st.ease ? `<p class="hj-note" style="text-align:left">${esc(st.ease)}</p>` : ''}${st.t === 'ex' && weightTip(st) ? `<p class="hj-wtl"><b>Weight:</b> ${esc(weightTip(st))}</p>` : ''}`;
  const t = trans(o, state);
  return `${top(o.title, (o.i + 1) + ' of ' + o.steps.length, pct)}
  <div class="hj-sess"><span data-hjsess>${esc(clock(o.active || 0))}</span><span data-hjleft>about ${Math.max(1, Math.round(estLeft(o) / 60000))} min left</span></div>
  ${stagePanel(state, sop)}
  <div class="hj-ovb${t.cls}" style="${t.style}" data-hjstate="${state}"><div class="hj-kick hj-stk">${esc(label)}</div><h2 class="hj-exn">${esc(o.swap && st.swap ? st.swap : st.name)}</h2>${st.t === 'ex' && !o.between ? dots(o.rest ? o.set + 1 : o.set, st.sets) : ''}${big}
    ${detail}
    ${o.wait ? `<button type="button" class="btn btn-gold hj-go" data-hja="tapdone">${o.side === 'L' ? 'Left Side Done' : 'Set Done'}</button>` : ''}
    <div class="hj-ovbtns hj-ctl"><button type="button" class="btn btn-gold" data-hja="apause">${o.paused ? 'Resume' : 'Pause'}</button><button type="button" class="btn btn-line" data-hja="askip">${o.between ? 'Start Now' : o.rest || o.sw ? 'Ready Now' : 'Skip'}</button>${o.run ? `<button type="button" class="btn btn-line" data-hja="amore">+15 sec</button>` : ''}${st.swap && !o.rest && !o.between ? `<button type="button" class="btn btn-line" data-hja="swap">${o.swap ? 'Plan Move' : 'Swap'}</button>` : ''}</div>
    ${st.t === 'ex' && !o.between ? `<button type="button" class="linkbtn hj-skip" data-hja="askipmove">Skip This Move</button>` : ''}
    ${toggles(o)}</div>`;
}
// ---------- the kitchen guide (Andrew) ----------
function kSteps(o){ return arr(o.data.steps).map(s => typeof s === 'string' ? {t: s} : s); }
async function kSay(o, text){ const V = VO(); if (V && !o.dead) await V.say(ANDREW, text); }
function kEnter(o){ const s = kSteps(o)[o.gi]; if (!s) return; kSay(o, s.t); const nx = kSteps(o)[o.gi + 1]; if (nx && VO()) VO().prefetch(ANDREW, nx.t); }
function kStartTimer(o, i){ const s = kSteps(o)[i]; if (!s || !+s.min) return; o.timers = (o.timers || []).filter(t => t.i !== i); o.timers.push({i, end: Date.now() + s.min * 60000, label: s.t}); kSay(o, LN.tset(+s.min)); rerender(true); }
setInterval(() => { const o = S.ov; if (!o || !o.guide || !o.timers || !o.timers.length) return; const now = Date.now();
  o.timers.forEach(t => { const e = document.querySelector('[data-hjkt="' + t.i + '"]'); if (e) e.textContent = clock(Math.max(0, t.end - now)); });
  { const ft = o.timers.slice().sort((a, b) => a.end - b.end)[0], fs = arr(o.data.steps)[ft.i]; if (fs) stageUpd(Math.max(0, Math.min(1, (ft.end - now) / ((+fs.min || 1) * 60000))), Math.ceil(Math.max(0, ft.end - now) / 1000)); }
  const done = o.timers.filter(t => t.end <= now); if (!done.length) return;
  o.timers = o.timers.filter(t => t.end > now); o.rang = done[done.length - 1];
  if (typeof chime === 'function') chime(); kSay(o, LN.tdone); rerender(true); }, 500);
function vGuide(o, top){
  const steps = kSteps(o), s = steps[o.gi], pct = Math.round(100 * o.gi / Math.max(1, steps.length));
  const rang = o.rang ? `<div class="hj-rang"><b>Timer done:</b> ${esc(o.rang.label)}<button type="button" class="linkbtn" data-hja="kok">Got It</button></div>` : '';
  if (!s) return `${top(o.title, o.sub, 100)}${stagePanel('done', {fig: window.GGStage ? '' : POT, small: true})}${rang}${arr(o.timers).length ? `<div class="hj-ktimers">${arr(o.timers).map(t => `<div><span class="hj-clock sm" data-hjkt="${t.i}">${clock(t.end - Date.now())}</span><small>${esc(t.label.slice(0, 60))}</small></div>`).join('')}</div>` : ''}<div class="hj-ovb"><div class="hj-big2">${o.idea ? 'Ready to enjoy.' : o.k === 'cook' ? 'Dinner is ready.' : 'Prep is done.'}</div>${arr(o.data.yields).length ? `<p class="hj-sub">Ready now: ${arr(o.data.yields).map(esc).join(', ')}</p>` : ''}<button type="button" class="btn btn-gold hj-go" data-hja="cdone">${o.idea ? 'All Done' : o.k === 'cook' ? 'Dinner Is Done' : 'Prep Is Done'}</button></div>`;
  const tms = arr(o.timers);
  const t = trans(o, 'cook'), ft = tms.length ? tms.slice().sort((a, b) => a.end - b.end)[0] : null, fs = ft ? arr(o.data.steps)[ft.i] : null, ftot = fs ? (+fs.min || 1) * 60000 : 1;
  return `${top(o.title, 'Step ' + (o.gi + 1) + ' of ' + steps.length, pct)}
  ${stagePanel('cook', Object.assign({fig: window.GGStage ? '' : POT, small: true}, ft ? {pct: Math.max(0, Math.min(1, (ft.end - Date.now()) / ftot)), secs: Math.ceil(Math.max(0, ft.end - Date.now()) / 1000)} : {}))}
  ${o.rang ? `<div class="hj-rang"><b>Timer done:</b> ${esc(o.rang.label)}<button type="button" class="linkbtn" data-hja="kok">Got It</button></div>` : ''}
  ${tms.length ? `<div class="hj-ktimers">${tms.map(t => `<div><span class="hj-clock sm" data-hjkt="${t.i}">${clock(t.end - Date.now())}</span><small>${esc(t.label.slice(0, 60))}</small><button type="button" class="linkbtn" data-hja="kstop" data-hjv="${t.i}">Stop</button></div>`).join('')}</div>` : ''}
  <div class="hj-ovb${t.cls}" style="${t.style}" data-hjstate="cook">${s.at ? `<div class="hj-kick">${esc(s.at)}</div>` : ''}<p class="hj-kstep">${esc(s.t)}</p>
    ${+s.min ? (tms.some(t => t.i === o.gi) ? `<p class="hj-sub">Timer running.</p>` : `<button type="button" class="btn btn-line" data-hja="ktimer" data-hjv="${o.gi}">Start ${+s.min} min Timer</button>`) : ''}
    <div class="hj-ovbtns"><button type="button" class="btn btn-line" data-hja="kback"${o.gi ? '' : ' disabled'}>Back</button><button type="button" class="btn btn-gold" data-hja="knext">${o.gi === steps.length - 1 ? 'Finish' : 'Next Step'}</button></div>
    <button type="button" class="linkbtn hj-skip" data-hja="krepeat">Say It Again</button>
    ${toggles(null)}</div>`;
}
function actCoach(a, v){
  const o = S.ov, V = VO(), h = H();
  switch (a){
    case 'tvoice': if (V){ V.setOn(!V.on()); } rerender(true); return true;
    case 'tmusic': if (V){ V.setMusic(!V.musicOn()); if (V.musicOn() && o && o.mode === 'auto' && !o.fin && !o.paused) V.music(o.music || '/audio/music/learning-' + (1 + (o.title.length % 7)) + '.mp3'); } rerender(true); return true;
    case 'tchime': if (V) V.setChime(!V.chimeOn()); rerender(true); return true;
    case 'tcount': if (o){ o.count = !o.count; try { localStorage.setItem('gg-health-count', o.count ? '1' : '0'); } catch(e){} } rerender(true); return true;
    case 'play': if (o) runSession(o); return true;
    case 'manual': if (o){ o.stage = 'run'; o.mode = 'manual'; if (V) V.unlock(); } rerender(true); return true;
    case 'didit': if (o){ markDone(o.key || ('work:' + o.s)); checkOn(o.prac ? 'still' : 'move'); toast('Marked done. Well done.'); closeOv(); } return true;
    case 'apause': if (o){ o.paused = !o.paused; if (V){ o.paused ? V.pause() : V.resume(); } } rerender(true); return true;
    case 'askip': if (o){ o.skip = true; o.wait = false; o.paused = false; if (V) V.stop(); } return true;
    case 'askipmove': if (o){ o.skip = true; o.skipMove = true; o.wait = false; o.paused = false; if (V) V.stop(); } return true;
    case 'amore': if (o && o.run){ o.end += 15000; o.tot = (o.tot || 0) + 15000; } return true;
    case 'tapdone': if (o) o.wait = false; return true;
    case 'guide': if (o){ o.guide = true; o.gi = 0; o.timers = []; if (V){ V.unlock(); V.music(null); } kSay(o, o.k === 'cook' ? LN.cIntro(o.title) : LN.prepIntro(o.title)).then(() => { if (S.ov === o && o.guide && o.gi === 0) kEnter(o); }); } rerender(true); return true;
    case 'knext': if (o){ const n = kSteps(o).length; if (V) V.stop(); o.dn = o.dn || {}; o.dn[o.gi] = true; o.gi = Math.min(n, o.gi + 1); rerender(true); if (o.gi < n) kEnter(o); else kSay(o, o.k === 'cook' ? LN.cOut : LN.prepOut); } return true;
    case 'kback': if (o && o.gi > 0){ if (V) V.stop(); o.gi--; rerender(true); kEnter(o); } return true;
    case 'krepeat': if (o){ if (V) V.stop(); kEnter(o); } return true;
    case 'ktimer': if (o) kStartTimer(o, +v); return true;
    case 'kstop': if (o){ o.timers = arr(o.timers).filter(t => t.i !== +v); rerender(true); } return true;
    case 'kok': if (o){ o.rang = null; rerender(true); } return true;
  }
  return false;
}

// ---------- BLD 861: Today's Plate. Tap what you eat, see the day's numbers live, check off movement, stillness, and supplements ----------
// Chris, October 27, 2026: "maybe we can create a check box system that tracks what i eat and then shows my daily sat fat live
// tracking to stay under target. also for sugars protein and other important datas", then "also to check off fitness, meditation,
// and taking the supplements breakfast and dinner.. i also take magnesium glycinate at evening".
// Library: FLD.healthJourney.app.foods [{name, per, cat, nut, plan, quick, est, id}], app.foodsSrc {t, url, note}, app.targets;
// FDR.healthMine.targets and healthKayti.targets {sf, pro, fib, sol, sug, cal, na} (a number is a daily aim, [aim, ceiling] a range),
// and .supplements [{name, when: 'morning' or 'evening', note}].
// DATA.health adds: days[date].eat [{id, k, n, per, q, v: 'h' or 'f', g, nut, t}] (nut is copied in, so history keeps its numbers),
// myFoods [{id, name, per, nut, u}], supps {list: [{id, name, when, note}], u} (once edited), eatUse {key: {c, t}} (recent and favorite).
// Keys: b:i, l:i, s:i (breakfasts, lunches, snacks), d:W:id (a dinner), f:slug (the food list), m:id (My Foods).
const NK = ['sf', 'pro', 'fib', 'sol', 'sug', 'cal', 'na'];
const TGT_DEF = {sf: 15, pro: 90, fib: 30, sol: 10, sug: 25, cal: null, na: 2300};
function targets(){ const m = MINE(), a = APP(), t = (m && m.targets) || (a && a.targets) || {}; return Object.assign({}, TGT_DEF, t); }
const tLo = v => Array.isArray(v) ? +v[0] : v == null ? null : +v;
const tHi = v => Array.isArray(v) ? +v[v.length - 1] : v == null ? null : +v;
const FOODS = () => arr((APP() || {}).foods).filter(f => f && f.name && nOk(f.nut));
const slug = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const r1 = v => Math.round(v * 10) / 10;
const fmt = v => { v = +v || 0; return v >= 1000 ? Math.round(v).toLocaleString('en-US') : v >= 100 ? String(Math.round(v)) : String(r1(v)); };
const fmtQ = q => q === 0.5 ? '1/2' : q === 1.5 ? '1 1/2' : String(q);
const DINS = {b: 'breakfasts', l: 'lunches', s: 'snacks'};
function plateItem(k){
  const app = APP() || {}, din = app.dinners || {}, p = String(k).split(':'), t = p[0];
  const mk = (x, per) => x && nOk(x.nut) ? {k, name: x.name, per: x.nut.per || per || '', nut: x.nut, heart: nOk(x.nutHeart) ? x.nutHeart : null} : null;
  if (DINS[t]) return mk(arr(din[DINS[t]])[+p[1]], '1 serving');
  if (t === 'd') return mk(arr(((din.weeks || {})[p[1]] || {}).dinners).find(z => z.id === p.slice(2).join(':')), '1 serving');
  if (t === 'f'){ const x = FOODS().find(z => slug(z.name) === p[1]); return x ? {k, name: x.name, per: x.per || '', nut: x.nut, heart: null, est: !!x.est} : null; }
  if (t === 'm'){ const x = arr(H().myFoods).find(z => z.id === p[1]); return x ? {k, name: x.name, per: x.per || 'My portion', nut: x.nut, heart: null, mine: 1} : null; }
  return null;
}
function plateGroups(d){
  const din = (APP() || {}).dinners || {}, idx = (t, list) => arr(list).map((x, i) => t + ':' + i), dn = dinnerFor(d);
  return [['morning', 'Morning', FOODS().filter(f => f.plan === 'morning').map(f => 'f:' + slug(f.name)).concat(idx('b', din.breakfasts))],
    ['midday', 'Midday', idx('l', din.lunches)], ['evening', 'Evening', dn ? ['d:' + dn.wk + ':' + dn.id] : []], ['snacks', 'Snacks', idx('s', din.snacks)]]
    .map(([id, t, ks]) => ({id, t, items: ks.map(plateItem).filter(Boolean)})).filter(g => g.items.length);
}
const plateV = () => H().set.plate === 'f' ? 'f' : 'h';
const eatOf = k => arr((H().days[k] || {}).eat);
// ---- My Supplements: seeded from the plan (supplements, else the add-ons), edited on this device ----
const lever = s => /psyllium/i.test(s.name || '') ? 'psyllium' : /sterol/i.test(s.name || '') ? 'sterols' : '';
const suppId = s => 'sp:' + s.id;
function seedSupps(){
  const m = MINE(), mk = (name, when, note) => ({id: slug(name) + '-' + when, name, when, note: note || ''});
  if (m && arr(m.supplements).length) return m.supplements.filter(s => s && s.name).map(s => mk(s.name, s.when === 'evening' ? 'evening' : 'morning', s.note));
  const out = []; arr(m && m.addons).forEach(a => { const l = lever(a); if (l === 'psyllium') out.push(mk('Psyllium', 'morning', 'Before breakfast'), mk('Psyllium', 'evening', 'Before dinner'));
    if (l === 'sterols') out.push(mk('Plant sterols', 'morning', 'With breakfast'), mk('Plant sterols', 'evening', 'With dinner')); });
  return out;
}
function supps(){ const h = H(); return h.supps && Array.isArray(h.supps.list) ? h.supps.list : seedSupps(); }
function keepSupps(list){ H().supps = {list, u: Date.now()}; save(); }
const PSY = () => FOODS().find(f => f.id === 'psyllium');
function totals(k){
  const day = H().days[k] || {}, ck = day.checks || {}, t = {sf: 0, pro: 0, fib: 0, sol: 0, sug: 0, cal: 0, na: 0};
  arr(day.eat).forEach(e => NK.forEach(n => { t[n] += (+((e.nut || {})[n]) || 0) * (+e.q || 0); }));
  const p = PSY(); if (p) supps().filter(s => lever(s) === 'psyllium' && ck[suppId(s)]).forEach(() => NK.forEach(n => { t[n] += +(p.nut[n] || 0); }));
  NK.forEach(n => { t[n] = r1(t[n]); }); t.n = arr(day.eat).length; return t;
}
// The LDL Path's psyllium and sterol levers: the plan's own check counts as a full day; otherwise each My Supplements half counts its share.
function leverDay(k, ck){ const c = (H().days[k] || {}).checks || {}; if (c[ck]) return 1; const L = supps().filter(s => lever(s) === ck); return L.length ? L.filter(s => c[suppId(s)]).length / L.length : 0; }
const eatPick = n => { const o = {}; NK.concat('carb').forEach(x => { if (n[x] != null && isFinite(+n[x])) o[x] = +n[x]; }); return o; };
function eatAdd(k, q, g){
  const it = plateItem(k); if (!it) return null; const h = H(), t = today(), d = h.days[t] = h.days[t] || {checks: {}};
  d.eat = arr(d.eat); const v = it.heart && plateV() === 'h' ? 'h' : 'f', n = v === 'h' ? it.heart : it.nut;
  const ex = d.eat.find(e => e.k === k && e.v === v);
  if (ex) ex.q = r1((+ex.q || 0) + q); else d.eat.push({id: uid(), k, n: it.name, per: n.per || it.per || '', q, v, g: g || '', nut: eatPick(n), t: Date.now()});
  if (g === 'x'){ h.eatUse = h.eatUse && typeof h.eatUse === 'object' ? h.eatUse : {}; const u = h.eatUse[k] = h.eatUse[k] || {c: 0, t: 0}; u.c++; u.t = Date.now(); }
  d.u = Date.now(); save(); return it;
}
function eatLess(k){ const d = H().days[today()]; if (!d) return; d.eat = arr(d.eat); const L = d.eat.filter(e => e.k === k), e = L[L.length - 1]; if (!e) return;
  e.q = r1((+e.q || 0) - 1); if (e.q <= 0) d.eat = d.eat.filter(x => x !== e); d.u = Date.now(); save(); }
// ---- the search: every plan item (all weeks), the food list, and My Foods ----
let EIX = null;
function eatIndex(){
  const app = APP(), mf = arr(H().myFoods), sig = mf.map(x => x.id + (x.u || '')).join(','); if (EIX && EIX.app === app && EIX.sig === sig) return EIX.list;
  const din = (app || {}).dinners || {}, seen = new Set(), list = [], add = (k, cat) => { const it = plateItem(k); if (!it || seen.has(it.name.toLowerCase())) return; seen.add(it.name.toLowerCase()); list.push(Object.assign({cat, q: (it.name + ' ' + cat).toLowerCase()}, it)); };
  mf.forEach(x => add('m:' + x.id, 'My Foods'));
  Object.entries(DINS).forEach(([t, key]) => arr(din[key]).forEach((x, i) => add(t + ':' + i, 'My Plan')));
  'ABCD'.split('').forEach(w => arr(((din.weeks || {})[w] || {}).dinners).forEach(x => add('d:' + w + ':' + x.id, 'My Plan, Week ' + w)));
  FOODS().forEach(f => add('f:' + slug(f.name), f.cat || 'Foods'));
  EIX = {app, sig, list}; return list;
}
function eatFind(q){
  const words = String(q || '').toLowerCase().split(/[^a-z0-9%]+/).filter(Boolean), use = H().eatUse || {}, L = eatIndex();
  if (!words.length){ const fav = L.filter(x => use[x.k]).sort((a, b) => (use[b.k].c - use[a.k].c) || (use[b.k].t - use[a.k].t)).slice(0, 5);
    return {head: fav.length ? 'Recent and Favorites' : 'Quick Adds', list: fav.concat(L.filter(x => !use[x.k] && (x.mine || (FOODS().find(f => f.name === x.name) || {}).quick))).slice(0, 8)}; }
  const sc = x => { const n = x.name.toLowerCase(); return (use[x.k] ? 40 + Math.min(20, use[x.k].c) : 0) + (x.mine ? 30 : 0) + (n.startsWith(words[0]) ? 20 : 0) + (/^My Plan/.test(x.cat) ? 5 : 0) - n.length / 40; };
  return {head: '', list: L.filter(x => words.every(w => x.q.includes(w))).sort((a, b) => sc(b) - sc(a)).slice(0, 12)};
}
function eatResults(){
  const r = eatFind(S.eatQuery), Q = [0.5, 1, 1.5, 2], q = S.eatQ || 1;
  if (!r.list.length) return `<p class="hj-sub">Add it as your own below, and it stays in My Foods for next time.</p>`;
  return `${r.head ? `<div class="hj-eh">${esc(r.head)}</div>` : ''}${r.list.map(x => { const on = S.eatPick === x.k, n = x.heart && plateV() === 'h' ? x.heart : x.nut;
    return `<div class="hj-er${on ? ' on' : ''}"><button type="button" class="hj-ert" data-hja="eatpick" data-hjv="${esc(x.k)}" aria-expanded="${on}"><b>${esc(x.name)}</b><small>${esc(n.per || x.per || '')}${n.per || x.per ? ' · ' : ''}${fmt(n.sf)} g sat fat · ${fmt(n.pro)} g protein${x.cat ? ' · ' + esc(x.cat) : ''}</small></button>
    ${on ? `<div class="hj-eq"><span>Servings</span>${Q.map(v => `<button type="button" class="chip${v === q ? ' on' : ''}" aria-pressed="${v === q}" data-hja="eatq" data-hjv="${v}">${fmtQ(v)}</button>`).join('')}<button type="button" class="btn btn-gold btn-sm" data-hja="eatx" data-hjv="${esc(x.k)}">Add</button></div>` : ''}</div>`; }).join('')}`;
}
const eatRes = () => { const b = document.getElementById('hj-eatres'); if (b) b.innerHTML = eatResults(); };
// ---- meters ----
const MT = [['sf', 'Saturated fat', ' g', 'lim'], ['pro', 'Protein', ' g', 'reach'], ['fib', 'Fiber', ' g', 'reach'], ['sol', 'Soluble fiber', ' g', 'reach'], ['sug', 'Added sugar', ' g', 'lim'], ['cal', 'Calories', '', 'range'], ['na', 'Sodium', ' mg', 'lim']];
const MST = {ok: ['On track', '&#10003;'], close: ['Getting close', '&#9679;'], past: ['Past your aim', '&#9650;'], build: ['Building', '&#8599;'], done: ['Reached', '&#10003;'], none: ['', '']};
function mInfo(k, kind, v, tv){
  const lo = tLo(tv), hi = tHi(tv), u = k === 'na' ? ' mg' : k === 'cal' ? '' : ' g';
  if (tv == null || !isFinite(hi)) return {st: 'none', aim: '', scale: Math.max(v, 1), lo: null, hi: null};
  if (kind === 'lim'){ const a = Array.isArray(tv) ? lo : hi * 0.85; return {st: v <= a ? 'ok' : v <= hi ? 'close' : 'past', aim: (Array.isArray(tv) ? fmt(lo) + ' to ' : '') + fmt(hi) + u + ' or less', scale: Math.max(hi * 1.3, v), lo: a, hi}; }
  if (kind === 'reach') return {st: v >= lo ? 'done' : 'build', aim: Array.isArray(tv) ? fmt(lo) + ' to ' + fmt(hi) + u : fmt(lo) + u + ' or more', scale: Math.max(hi * 1.15, v), lo, hi: Array.isArray(tv) ? hi : null};
  return {st: v < lo ? 'build' : v <= hi ? 'ok' : 'past', aim: 'about ' + fmt(lo) + ' to ' + fmt(hi), scale: Math.max(hi * 1.15, v), lo, hi};
}
function meter(row, v, T, big){
  const [k, label, u, kind] = row, m = mInfo(k, kind, v, T[k]), pct = x => Math.max(0, Math.min(100, x / m.scale * 100)).toFixed(1), s = MST[m.st];
  return `<div class="hj-mt${big ? ' big' : ''}" data-hjm="${k}" data-st="${m.st}"><div class="hj-mth"><span class="l">${esc(label)}${k === 'sol' ? ' <small>where known</small>' : ''}</span><b>${fmt(v)}${u}</b></div>
    <div class="hj-mtb" role="img" aria-label="${esc(label)} ${fmt(v)}${esc(u)}${m.aim ? ', aim ' + esc(m.aim) + ', ' + esc(s[0]) : ''}"><span class="f" style="width:${pct(v)}%"></span>${m.lo != null ? `<i style="left:${pct(m.lo)}%"></i>` : ''}${m.hi != null && m.hi !== m.lo ? `<i style="left:${pct(m.hi)}%"></i>` : ''}</div>
    <div class="hj-mts">${m.aim ? `<span>Aim ${esc(m.aim)}</span>` : '<span>Counted through the day</span>'}${s[0] ? `<em>${s[1]} ${esc(s[0])}</em>` : ''}</div></div>`;
}
// ---- the 7-day view: saturated fat and protein, one chart each (one axis each) ----
function weekBars(rows, key, aim, cls, label){
  const W = 320, Ht = 132, pl = 30, pr = 8, pt = 14, pb = 22, pw = W - pl - pr, ph = Ht - pt - pb, vals = rows.map(r => r.t[key]);
  const top = Math.max(aim || 0, ...vals, 1) * 1.15, step = top > 120 ? 50 : top > 60 ? 20 : top > 30 ? 10 : 5, y = v => pt + ph - v / top * ph, bw = pw / 7 * 0.56, f1 = n => n.toFixed(1);
  const bar = (x, v) => { const h = Math.max(0, ph * v / top), r = Math.min(4, h, bw / 2), y0 = pt + ph; if (h <= 0) return ''; return `M${f1(x)},${f1(y0)}V${f1(y0 - h + r)}Q${f1(x)},${f1(y0 - h)} ${f1(x + r)},${f1(y0 - h)}H${f1(x + bw - r)}Q${f1(x + bw)},${f1(y0 - h)} ${f1(x + bw)},${f1(y0 - h + r)}V${f1(y0)}Z`; };
  const ticks = []; for (let v = 0; v <= top; v += step) ticks.push(v);
  const last = rows[rows.length - 1];
  return `<svg class="hj-wbsvg ${cls}" viewBox="0 0 ${W} ${Ht}" role="img" aria-label="${esc(label)}, last 7 days: ${rows.map(r => r.lab + ' ' + (r.t.n ? fmt(r.t[key]) + ' g' : 'nothing logged')).join(', ')}. Aim ${fmt(aim)} g.">
    ${ticks.map(v => `<line x1="${pl}" x2="${W - pr}" y1="${f1(y(v))}" y2="${f1(y(v))}" class="gr"/><text x="${pl - 5}" y="${f1(y(v) + 4)}" text-anchor="end" class="ax">${v}</text>`).join('')}
    ${rows.map((r, i) => { const x = pl + pw / 7 * i + (pw / 7 - bw) / 2; return `<g class="hj-wbg" data-ptip="${esc(r.lab + ': ' + (r.t.n || r.t[key] ? fmt(r.t[key]) + ' g ' + label.toLowerCase() : 'nothing logged yet'))}"><rect class="hit" x="${f1(pl + pw / 7 * i)}" y="${pt}" width="${f1(pw / 7)}" height="${ph}"/><path d="${bar(x, r.t[key])}" class="b"/><text x="${f1(x + bw / 2)}" y="${Ht - 6}" text-anchor="middle" class="ax${i === 6 ? ' on' : ''}">${esc(r.d1)}</text></g>`; }).join('')}
    ${aim ? `<line x1="${pl}" x2="${W - pr}" y1="${f1(y(aim))}" y2="${f1(y(aim))}" class="aim"/><text x="${W - pr}" y="${f1(y(aim) - 4)}" text-anchor="end" class="al">Aim ${fmt(aim)}</text>` : ''}
    ${last.t.n ? `<text x="${f1(pl + pw / 7 * 6 + pw / 14)}" y="${f1(Math.max(10, y(last.t[key]) - 5))}" text-anchor="middle" class="vl">${fmt(last.t[key])}</text>` : ''}
  </svg>`;
}
function plateWeek(T){
  const d0 = day0(new Date()), rows = [6, 5, 4, 3, 2, 1, 0].map(i => { const d = addD(d0, -i), k = ymd(d); return {k, d1: DOW[d.getDay()].slice(0, 2), lab: DOW[d.getDay()] + ' ' + short(k), t: totals(k)}; });
  const hi = tHi(T.sf), pro = tLo(T.pro), L = rows.filter(r => r.t.n), under = L.filter(r => r.t.sf <= hi).length;
  const body = S.eatTable ? `<div class="hj-tw"><table class="hj-tbl"><thead><tr><th>Day</th><th>Sat Fat (g)</th><th>Protein (g)</th><th>Fiber (g)</th><th>Calories</th></tr></thead><tbody>${rows.slice().reverse().map(r => `<tr><td>${esc(r.lab)}</td><td>${r.t.n ? '<b>' + fmt(r.t.sf) + '</b>' : ''}</td><td>${r.t.n ? fmt(r.t.pro) : ''}</td><td>${r.t.n ? fmt(r.t.fib) : ''}</td><td>${r.t.n ? fmt(r.t.cal) : ''}</td></tr>`).join('')}</tbody></table></div>`
    : `<div class="hj-wbs"><div class="hj-wb"><div class="hj-wbt">Saturated Fat (g)</div>${weekBars(rows, 'sf', hi, 'sf', 'Saturated fat')}</div><div class="hj-wb"><div class="hj-wbt">Protein (g)</div>${weekBars(rows, 'pro', pro, 'pro', 'Protein')}</div><div class="hj-ptip" hidden></div></div>`;
  return `<details class="hj-doc hj-pw"${S.open['eat7'] ? ' open' : ''} data-hjd="eat7"><summary><span>My Last 7 Days</span></summary><div class="hj-body">
    <p class="hj-sub">${L.length ? `${under} of ${L.length} logged day${L.length === 1 ? '' : 's'} at or under ${fmt(hi)} g of saturated fat. Each of these days feeds the saturated fat lever on My LDL Path.` : 'Your week fills in as you log each day. Each logged day feeds the saturated fat lever on My LDL Path.'}</p>
    ${body}<button type="button" class="btn btn-line btn-sm" data-hja="eattable" aria-pressed="${!!S.eatTable}">${S.eatTable ? 'View as Chart' : 'View as Table'}</button></div></details>`;
}
// ---- the card ----
function vPlate(){
  if (KIT() || !APP()) return '';
  const h = H(), d = new Date(), k = today(), day = h.days[k] || {checks: {}}, ck = day.checks || {}, T = targets(), tot = totals(k), eat = arr(day.eat), gs = plateGroups(d), hr = d.getHours();
  const inPlan = new Set(gs.flatMap(g => g.items.map(i => i.k))), extras = eat.filter(e => !inPlan.has(e.k)), cur = hr < 11 ? 'morning' : hr < 15 ? 'midday' : 'evening';
  const anyHeart = gs.some(g => g.items.some(i => i.heart)), V = plateV();
  const row = (it, g) => { const q = eat.filter(e => e.k === it.k).reduce((a, e) => a + (+e.q || 0), 0), n = it.heart && V === 'h' ? it.heart : it.nut;
    return `<div class="hj-pr8${q ? ' on' : ''}"><button type="button" class="hj-prt" data-hja="eat" data-hjv="${esc(it.k)}|${g}" aria-label="${q ? 'One more serving' : 'Add one serving'}: ${esc(it.name)}"><span class="box">${q ? (q === 1 ? '&#10003;' : esc(fmtQ(q))) : ''}</span><span class="nm"><b>${esc(it.name)}</b><small>${esc(n.per || it.per || '')}${n.per || it.per ? ' · ' : ''}${fmt(n.sf)} g sat fat · ${fmt(n.pro)} g protein</small></span></button>${q ? `<button type="button" class="hj-prm" data-hja="eatless" data-hjv="${esc(it.k)}" aria-label="One less: ${esc(it.name)}">&minus;</button>` : ''}</div>`; };
  const grp = g => { const id = 'eatg:' + g.id, n = g.items.filter(i => eat.some(e => e.k === i.k)).length, open = S.open[id] != null ? S.open[id] : (g.id === cur || (g.id === 'snacks' && n > 0) || (g.id === 'morning' && hr < 11));
    return `<details class="hj-pg8"${open ? ' open' : ''} data-hjd="${id}"><summary><span>${esc(g.t)}</span><small>${n ? n + ' logged' : g.items.length + ' on the plan'}</small></summary>${g.items.map(i => row(i, g.id)).join('')}</details>`; };
  const sp = supps(), cb = (id, label, sub) => `<button type="button" class="hj-hb hj-pck${ck[id] ? ' on' : ''}" aria-pressed="${!!ck[id]}" data-hja="check" data-hjv="${esc(id)}"><span class="box">${ck[id] ? '&#10003;' : ''}</span><span>${esc(label)}${sub ? `<small>${esc(sub)}</small>` : ''}</span></button>`;
  const ses = (H().set.track || 'strength') !== 'practice' ? sesFor(d) : null;
  const ckRow = (t, list) => list.length ? `<div class="hj-ckg"><div class="hj-eh">${esc(t)}</div><div class="hj-habits">${list.join('')}</div></div>` : '';
  const src = (APP() || {}).foodsSrc;
  return `<div class="hj-blk hj-plate" id="hj-plate">${kick('Today\'s Plate')}
    <div class="hj-mts0">${meter(MT[0], tot.sf, T, true)}<div class="hj-mtg">${MT.slice(1).map(r => meter(r, tot[r[0]], T)).join('')}</div></div>
    <p class="hj-sub hj-p8s">${eat.length ? 'Tap again for a second serving.' : 'Tap what you eat. Each tap adds one serving.'} Numbers are estimates per listed portion.</p>
    ${anyHeart ? `<div class="hj-chips hj-pv8" role="group" aria-label="Which plate">${[['h', 'Heart-Health Plate'], ['f', 'Family Plate']].map(([v, l]) => `<button type="button" class="chip${V === v ? ' on' : ''}" aria-pressed="${V === v}" data-hja="platev" data-hjv="${v}">${l}</button>`).join('')}</div>` : ''}
    ${gs.map(grp).join('')}
    <div class="hj-se"><div class="hj-eh">Something Else</div>
      ${extras.length ? `<div class="hj-ex">${extras.map(e => `<div class="hj-exr"><span><b>${esc(e.n)}</b><small>${esc(fmtQ(+e.q))} × ${esc(e.per || 'serving')} · ${fmt((e.nut || {}).sf * e.q)} g sat fat</small></span><button type="button" class="linkbtn" data-hja="eatdel" data-hjv="${esc(e.id)}">Remove</button></div>`).join('')}</div>` : ''}
      <input id="hj-eatq" type="search" placeholder="Search foods: eggs, pizza, cream..." autocomplete="off" value="${esc(S.eatQuery || '')}" aria-label="Search foods">
      <div id="hj-eatres" aria-live="polite">${eatResults()}</div>
      <details class="hj-doc hj-own"${S.open['eatown'] ? ' open' : ''} data-hjd="eatown"><summary><span>Add My Own</span></summary><div class="hj-body">
        <label class="hj-fld"><span>Name</span><input data-hjo="name" autocomplete="off"></label><label class="hj-fld"><span>Portion (optional)</span><input data-hjo="per" placeholder="1 bowl" autocomplete="off"></label>
        <div class="hj-g3">${[['sf', 'Sat fat (g)'], ['pro', 'Protein (g)'], ['fib', 'Fiber (g), optional'], ['sug', 'Added sugar (g), optional'], ['cal', 'Calories, optional'], ['na', 'Sodium (mg), optional']].map(([f, l]) => `<label class="hj-fld"><span>${l}</span><input data-hjo="${f}" inputmode="decimal"></label>`).join('')}</div>
        <button type="button" class="btn btn-gold btn-sm" data-hja="eatown">Save to My Foods and Add</button></div></details></div>
    <div class="hj-eh hj-ckh">Daily Checklist</div>
    ${ckRow('Movement', [cb('move', ses ? ses.title || 'Today\'s workout' : 'Movement today', 'Checks itself when the workout finishes')])}
    ${ckRow('Stillness', [cb('still', 'Meditation and the Daily Practice', 'Checks itself when one finishes')])}
    ${ckRow('Morning', sp.filter(s => s.when !== 'evening').map(s => cb(suppId(s), s.name, s.note)))}
    ${ckRow('Evening', sp.filter(s => s.when === 'evening').map(s => cb(suppId(s), s.name, s.note)))}
    <details class="hj-doc hj-sps"${S.open['supps'] ? ' open' : ''} data-hjd="supps"><summary><span>My Supplements</span></summary><div class="hj-body">
      ${sp.length ? sp.map(s => `<div class="hj-exr"><span><b>${esc(s.name)}</b><small>${s.when === 'evening' ? 'Evening' : 'Morning'}${s.note ? ' · ' + esc(s.note) : ''}</small></span><button type="button" class="linkbtn" data-hja="spdel" data-hjv="${esc(s.id)}">Remove</button></div>`).join('') : '<p class="hj-sub">Add what you take, and it joins your checklist.</p>'}
      <div class="hj-add"><input id="hj-spname" placeholder="Add a supplement" autocomplete="off" aria-label="Supplement name"></div>
      <div class="hj-chips" style="margin:8px 0 0">${['morning', 'evening'].map(w => `<button type="button" class="chip${(S.spWhen || 'evening') === w ? ' on' : ''}" aria-pressed="${(S.spWhen || 'evening') === w}" data-hja="spwhen" data-hjv="${w}">${w === 'morning' ? 'Morning' : 'Evening'}</button>`).join('')}<button type="button" class="btn btn-gold btn-sm" data-hja="spadd">Add</button></div></div></details>
    ${plateWeek(T)}
    ${src ? `<p class="hj-src">${src.url ? `<a href="${esc(src.url)}" target="_blank" rel="noopener">${esc(src.t)}</a>` : esc(src.t)}. ${esc(src.note || '')} Plan items carry the plan's own estimates.</p>` : ''}
  </div>`;
}
function actPlate(a, v){
  const h = H();
  switch (a){
    case 'eat': { const [k, g] = v.split('|'); eatAdd(k, 1, g); rerender(true); return true; }
    case 'eatless': eatLess(v); rerender(true); return true;
    case 'eatdel': { const d = h.days[today()]; if (d){ d.eat = arr(d.eat).filter(e => e.id !== v); d.u = Date.now(); save(); } rerender(true); return true; }
    case 'platev': h.set.plate = v === 'f' ? 'f' : 'h'; h.set.u = Date.now(); save(); rerender(true); return true;
    case 'eatpick': S.eatPick = S.eatPick === v ? null : v; S.eatQ = 1; eatRes(); return true;
    case 'eatq': S.eatQ = +v || 1; eatRes(); return true;
    case 'eatx': { const it = eatAdd(v, S.eatQ || 1, 'x'); S.eatPick = null; S.eatQ = 1; S.eatQuery = ''; if (it) toast('Added: ' + it.name + '.'); rerender(true); return true; }
    case 'eatown': { const val = f => { const i = document.querySelector('[data-hjo="' + f + '"]'); return i ? String(i.value).trim() : ''; }, name = val('name').slice(0, 80), sf = num(val('sf')), pro = num(val('pro'));
      if (!name || sf == null || pro == null){ toast('Add a name, the sat fat, and the protein.'); return true; }
      const nut = {sf, pro}; ['fib', 'sug', 'cal', 'na'].forEach(f => { const n = num(val(f)); if (n != null) nut[f] = n; });
      const x = {id: uid(), name, per: val('per').slice(0, 60), nut, u: Date.now()}; h.myFoods = arr(h.myFoods); h.myFoods.push(x);
      eatAdd('m:' + x.id, 1, 'x'); S.open['eatown'] = false; toast('Saved to My Foods and added.'); rerender(true); return true; }
    case 'eattable': S.eatTable = !S.eatTable; S.open['eat7'] = true; rerender(true); return true;
    case 'spwhen': S.spWhen = v; rerender(true); return true;
    case 'spadd': { const i = document.getElementById('hj-spname'), name = String(i ? i.value : '').trim().slice(0, 60); if (!name){ if (i) i.focus(); return true; }
      const when = S.spWhen || 'evening', list = supps().slice(); let id = slug(name) + '-' + when; while (list.some(s => s.id === id)) id += '1';
      list.push({id, name, when, note: ''}); keepSupps(list); S.open['supps'] = true; toast('Added to My Supplements.'); rerender(true); return true; }
    case 'spdel': keepSupps(supps().filter(s => s.id !== v)); rerender(true); return true;
  }
  return false;
}
document.addEventListener('pointerover', e => { const g = e.target.closest && e.target.closest('[data-ptip]'); if (!g) return; const wrap = g.closest('.hj-wbs'), tip = wrap && wrap.querySelector('.hj-ptip'); if (!tip) return;
  tip.textContent = g.dataset.ptip; tip.hidden = false; const rc = wrap.getBoundingClientRect(), gr = g.getBoundingClientRect(); tip.style.left = Math.max(0, Math.min(rc.width - (tip.offsetWidth || 150), gr.left - rc.left + gr.width / 2 - (tip.offsetWidth || 150) / 2)) + 'px'; tip.style.top = Math.max(0, gr.top - rc.top - 6) + 'px'; });
document.addEventListener('pointerout', e => { const g = e.target.closest && e.target.closest('[data-ptip]'); if (!g || (e.relatedTarget && g.contains(e.relatedTarget))) return; const tip = g.closest('.hj-wbs') && g.closest('.hj-wbs').querySelector('.hj-ptip'); if (tip && e.pointerType !== 'touch') tip.hidden = true; });

function vSetup(){
  const h = H(), s = S.set || (S.set = Object.assign({household: '', goals: [], goalLdl: '', nextLabs: '', start: ymd(startMon())}, h.set));
  return `<div class="hj-blk" id="hj-form">${kick('My Goals')}<h3>Make this plan your own</h3>
    <p class="hj-sub">A few answers shape what you see. Everything stays on this device.</p>
    ${MINE_ANY() && MINE_ANY().who ? `<p class="hj-sub" style="margin:6px 0"><b>Whose phone is this?</b></p><div class="hj-chips">${['Chris', 'Kayti', 'Someone else'].map(w => `<button type="button" class="chip${(s.who || '') === w ? ' on' : ''}" aria-pressed="${(s.who || '') === w}" data-hja="who" data-hjv="${w}">${w}</button>`).join('')}</div>` : ''}
    <p class="hj-sub" style="margin:6px 0"><b>My training</b></p><div class="hj-chips">${[['strength', 'Strength and Heart, with a coach'], ['practice', 'Daily Practice: movement, breath, stillness'], ['both', 'Both']].map(([k, l]) => `<button type="button" class="chip${(s.track || 'strength') === k ? ' on' : ''}" aria-pressed="${(s.track || 'strength') === k}" data-hja="track" data-hjv="${k}">${l}</button>`).join('')}</div>
    <label class="hj-fld"><span>My plan starts on (a Monday)</span><input type="date" data-hjs="start" value="${esc(s.start || '')}"></label>
    <label class="hj-fld"><span>People who eat at home</span><input type="number" min="1" max="12" inputmode="numeric" data-hjs="household" value="${esc(s.household)}"></label>
    <p class="hj-sub" style="margin:12px 0 6px"><b>What are you growing toward?</b></p>
    <div class="hj-chips">${GOALS.map(([id, l]) => { const on = arr(s.goals).includes(id); return `<button type="button" class="chip${on ? ' on' : ''}" aria-pressed="${on}" data-hja="goal" data-hjv="${id}">${esc(l)}</button>`; }).join('')}</div>
    <div class="hj-g3" style="margin-top:12px"><label class="hj-fld"><span>LDL goal (optional)</span><input type="number" inputmode="numeric" data-hjs="goalLdl" value="${esc(s.goalLdl)}"></label><label class="hj-fld"><span>Next labs (optional)</span><input type="date" data-hjs="nextLabs" value="${esc(s.nextLabs)}"></label></div>
    <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold btn-sm" data-hja="setup-save">Save</button>${h.set.u ? '<button type="button" class="btn btn-line btn-sm" data-hja="setup-cancel">Cancel</button>' : ''}</div></div>`;
}

function view(){
  const lib = FLDH(); if (!lib || !H()) return '';
  if (VO()) VO().setKey(((C.fld && C.fld()) || {}).audio);
  const h = H(), mine = MINE();
  // Keep the start date once the plan is running, so it never drifts (BLD 857b).
  if (!KIT() && !h.set.start && firstMon()){ h.set.start = ymd(firstMon()); h.set.startAuto = 1; save(); }
  // BLD 857c: b857b saved the Monday before a weekend of shopping and prep (one week early); put that one start right, once.
  if (!KIT() && h.set.startFix !== 2){ const d = firstLog(); if (d && h.set.start === ymd(monOf(d)) && h.set.start !== ymd(firstMon())){ h.set.start = ymd(firstMon()); h.set.startAuto = 1; } h.set.startFix = 2; save(); }
  if (KIT()){ const st = ((C.fld && C.fld()) || {}).start; if (st && !h.set.kitStart){ h.set.start = st; h.set.kitStart = st; h.set.u = Date.now(); save(); } else if (st && h.set.kitStart !== st){ h.set.start = st; h.set.kitStart = st; save(); } if (!h.set.u){ h.set.u = Date.now(); save(); } if (!['today', 'week', 'shop', 'prep'].includes(S.sec)) S.sec = 'today'; }
  const first = !h.set.u;
  let body;
  // A Founder's own starting numbers wait in the Founder library: offer them first, on every section, until added (BLD 840b).
  const ready = mine && mine.start && (arr(mine.start.labs).length || arr(mine.start.panels).length) && !h.labs.length && !h.panels.length;
  const offer = ready ? `<div class="hj-blk hj-offer">${kick('Your Starting Numbers Are Ready')}<p class="hj-sub">Your labs, full panels, starting weight, and goals, ready to add to this device in one tap.</p><button type="button" class="btn btn-gold btn-sm" data-hja="mine">Add My Starting Numbers</button></div>` : '';
  if (!KIT() && (S.setup || (first && !ready && S.sec === 'today'))) body = vSetup();
  else if (S.sec === 'week') body = vWeek();
  else if (S.sec === 'shop') body = vShop();
  else if (S.sec === 'prep') body = vPrep();
  else if (S.sec === 'learn') body = `<p class="hj-lead">The full plans behind every card: why it works, every recipe, every session.</p>${vPlan(lib, 'food')}${vPlan(lib, 'fitness')}${SOBER}`;
  else if (S.sec === 'numbers') body = vNumbers();
  else if (S.sec === 'journey') body = vJourney();
  else body = vToday2(lib);
  const askWho = MINE_ANY() && MINE_ANY().who && h.set.u && !h.set.who ? `<div class="hj-blk hj-offer">${kick('Whose Phone Is This?')}<p class="hj-sub">My Health keeps each person's plan and numbers on their own phone.</p><div class="hj-chips" style="margin:0">${['Chris', 'Kayti', 'Someone else'].map(w => `<button type="button" class="chip" data-hja="whoq" data-hjv="${w}">${w}</button>`).join('')}</div></div>` : '';
  return `<div id="hj-root">${KIT() ? '' : askWho + offer}
    <div class="hj-secs" role="group" aria-label="My Health">${chip('today', 'Today')}${chip('week', 'This Week')}${chip('shop', 'Shop')}${chip('prep', 'Prep')}${KIT() ? '' : chip('numbers', 'My Numbers') + chip('journey', 'Journal') + chip('learn', 'Why It Works')}</div>
    ${body}${vOv()}</div>`;
}
function rerender(keep){
  const root = document.getElementById('hj-root'); if (!root){ if (C.render) C.render(); return; }
  const y = window.scrollY, w = document.createElement('div'); w.innerHTML = view(); root.replaceWith(w.firstElementChild);
  if (keep) window.scrollTo(0, y);
}
const toForm = () => setTimeout(() => { const f = document.getElementById('hj-form'); if (f && f.scrollIntoView) f.scrollIntoView({block: 'start', behavior: 'smooth'}); }, 30);
const FIELDS = {lab: ['date', 'ldl', 'total', 'hdl', 'trig', 'apob', 'note'], mark: ['date', 'weight', 'waist', 'rhr', 'pushups', 'pullups', 'mile', 'energy', 'sleep', 'joint', 'note']};

function act(a, v){
  const h = H(); if (!h) return;
  if (actTool(a, v)) return;
  if (actPlate(a, v)) return;
  switch (a){
    case 'sec': S.sec = v; S.form = null; S.setup = false; S.shopWk = null; S.wkOff = 0; S.shopEd = null; rerender(false); window.scrollTo(0, 0); return;
    case 'check': { const t = today(), d = h.days[t] = h.days[t] || {checks: {}}; d.checks = d.checks || {}; d.checks[v] = !d.checks[v]; d.u = Date.now(); save(); rerender(true); return; }
    case 'new': S.form = {k: v, date: today()}; S.edit = null; rerender(true); toForm(); return;
    case 'edit': { const [k, id] = v.split('|'), x = (k === 'lab' ? h.labs : h.marks).find(y => y.id === id); if (!x) return; S.form = Object.assign({k}, x); S.edit = id; rerender(true); toForm(); return; }
    case 'cancel': S.form = null; S.edit = null; rerender(true); return;
    case 'save': {
      const f = S.form; if (!f) return; if (!/^\d{4}-\d{2}-\d{2}$/.test(String(f.date || ''))){ toast('Choose a date.'); return; }
      const rec = {id: S.edit || uid(), date: f.date, u: Date.now()};
      FIELDS[f.k].forEach(k => { if (k === 'date') return; if (k === 'note'){ const n = String(f.note || '').trim(); if (n) rec.note = n.slice(0, 400); return; } const n = num(f[k]); if (n != null) rec[k] = n; });
      if (Object.keys(rec).length <= 3){ toast('Add at least one number.'); return; }
      const list = f.k === 'lab' ? h.labs : h.marks, i = list.findIndex(x => x.id === rec.id); if (i < 0) list.push(rec); else list[i] = rec;
      save(); S.form = null; S.edit = null; toast('Saved on this device.'); rerender(true); return; }
    case 'mine': { const m = MINE(); if (!m || !m.start) return; arr(m.start.labs).forEach(x => h.labs.push(Object.assign({}, x, {id: uid(), u: Date.now()})));
      arr(m.start.panels).forEach(p => h.panels.push({id: uid(), date: p.date, name: p.name, note: p.note || '', items: arr(p.items).map(i => Object.assign({}, i)), u: Date.now()}));
      if (m.start.weight && !h.marks.length) h.marks.push({id: uid(), date: m.start.weightDate || (m.start.labs[0] || {}).date || today(), weight: m.start.weight, u: Date.now()});
      if (m.start.goalLdl && !h.set.goalLdl) h.set.goalLdl = m.start.goalLdl; if (m.start.nextLabs && !h.set.nextLabs) h.set.nextLabs = m.start.nextLabs;
      if (m.start.household && !h.set.household) h.set.household = m.start.household; h.set.u = h.set.u || Date.now();
      save(); S.setup = false; S.sec = 'numbers'; toast('Your starting numbers are on this device.'); rerender(false); return; }
    case 'pitem': S.form = {k: 'pitem', pid: v}; rerender(true); toForm(); return;
    case 'psave': { const f = S.form; if (!f) return; const n = String(f.n || '').trim(), val = String(f.v == null ? '' : f.v).trim();
      if (!n || !val){ toast('Add the test name and result.'); return; }
      const it = {n: n.slice(0, 80), v: isFinite(+val) && val !== '' ? +val : val.slice(0, 20), u: String(f.u || '').trim().slice(0, 20)}; const lo = num(f.lo), hi = num(f.hi); if (lo != null) it.lo = lo; if (hi != null) it.hi = hi;
      if (f.k === 'panel'){ if (!/^\d{4}-\d{2}-\d{2}$/.test(String(f.date || ''))){ toast('Choose a date.'); return; } h.panels.push({id: uid(), date: f.date, name: String(f.name || 'Lab Panel').trim().slice(0, 80) || 'Lab Panel', items: [it], u: Date.now()}); }
      else { const p = h.panels.find(x => x.id === f.pid); if (!p) return; p.items = arr(p.items).concat(it); p.u = Date.now(); S.open['pn:' + p.id] = true; }
      save(); S.form = null; toast('Saved on this device.'); rerender(true); return; }
    case 'pdel': { if (!confirm('Remove this lab panel from this device?')) return; const d = D(); d.deleted = d.deleted || {clients: {}, sessions: {}}; d.deleted.health = d.deleted.health || {}; d.deleted.health[v] = Date.now();
      h.panels = h.panels.filter(p => p.id !== v); save(); rerender(true); return; }
    case 'lptable': S.lpTable = !S.lpTable; rerender(true); return;
    case 'setup': S.setup = true; S.set = null; rerender(false); toForm(); return;
    case 'setup-cancel': S.setup = false; S.set = null; rerender(false); return;
    case 'whoq': h.set.who = v; if (v === 'Kayti' && !h.set.track) h.set.track = 'practice'; h.set.u = Date.now(); save(); toast('Saved.'); rerender(false); return;
    case 'who': if (S.set){ S.set.who = v; if (v === 'Kayti' && !S.set.trackSet) S.set.track = 'practice'; } rerender(true); return;
    case 'track': if (S.set){ S.set.track = v; S.set.trackSet = true; } rerender(true); return;
    case 'goal': { const s = S.set; if (!s) return; s.goals = arr(s.goals); s.goals = s.goals.includes(v) ? s.goals.filter(x => x !== v) : s.goals.concat(v); rerender(true); return; }
    case 'setup-save': { const s = S.set || {}, hh = num(s.household);
      const sd = parseD(s.start); h.set = {who: s.who || '', track: s.track || 'strength', start: sd ? ymd(addD(sd, -((sd.getDay() + 6) % 7))) : ymd(nextMon()), household: hh && hh > 0 && hh < 30 ? Math.round(hh) : '', goals: arr(s.goals), goalLdl: num(s.goalLdl) || '', nextLabs: /^\d{4}-\d{2}-\d{2}$/.test(String(s.nextLabs || '')) ? s.nextLabs : '', u: Date.now()};
      save(); S.setup = false; S.set = null; if (S.sec !== 'numbers') S.sec = 'today'; S.ov = null; toast('Saved. Welcome to My Health.'); rerender(false); return; }
    case 'note': { const t = document.getElementById('hj-note'), text = String(t ? t.value : '').trim(); if (!text){ toast('Write a line first.'); return; }
      h.notes.push({id: uid(), date: today(), text: text.slice(0, 4000), u: Date.now()}); S.draft = ''; save(); toast('Saved to My Journey.'); rerender(true); return; }
    case 'note-del': { if (!confirm('Remove this entry?')) return; const d = D(); d.deleted = d.deleted || {clients: {}, sessions: {}}; d.deleted.health = d.deleted.health || {}; d.deleted.health[v] = Date.now();
      h.notes = h.notes.filter(n => n.id !== v); save(); rerender(true); return; }
  }
}

// ---------- events ----------
document.addEventListener('click', e => {
  const t = e.target.closest && e.target.closest('[data-hja]'); if (!t || !D() || !t.closest('#hj-root')) return;
  e.preventDefault(); act(t.dataset.hja, t.dataset.hjv || '');
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && S.ov && document.getElementById('hj-root')) act('ovclose'); if (e.key === 'Enter' && e.target && e.target.id === 'hj-addname') act('shopadd'); if (e.key === 'Enter' && e.target && e.target.id === 'hj-spname') act('spadd'); });
document.addEventListener('input', e => {
  const t = e.target; if (!t.closest || !t.closest('#hj-root')) return;
  if (t.dataset.hjf && S.form) S.form[t.dataset.hjf] = t.value;
  if (t.dataset.hjs && S.set) S.set[t.dataset.hjs] = t.value;
  if (t.id === 'hj-note') S.draft = t.value;
  if (t.id === 'hj-eatq'){ S.eatQuery = t.value; S.eatPick = null; eatRes(); }
  if (t.id === 'hj-lb' && S.ov){ S.ov.lb = t.value; const id = t.dataset.hjid, v = String(t.value).trim().slice(0, 12); if (id && H()){ if (v) H().lifts[id] = v; else delete H().lifts[id]; clearTimeout(S.lbT); S.lbT = setTimeout(save, 700); } }
});
// BLD 860: the My LDL Path crosshair follows the pointer and snaps to whole weeks; arrow keys move it when the chart has focus.
// On a phone a tap shows the readout and it stays until a tap lands somewhere else.
['pointermove', 'pointerdown'].forEach(n => document.addEventListener(n, e => { const svg = e.target.closest && e.target.closest('.hj-lpsvg');
  if (svg) lpHover(svg, lpWeekAt(svg, e.clientX)); else if (n === 'pointerdown'){ const o = document.querySelector('.hj-lpsvg'); if (o && document.activeElement !== o) lpHover(o, null); } }));
document.addEventListener('pointerout', e => { const svg = e.target.closest && e.target.closest('.hj-lpsvg'); if (svg && e.pointerType !== 'touch' && !(e.relatedTarget && svg.contains(e.relatedTarget)) && document.activeElement !== svg) lpHover(svg, null); });
document.addEventListener('focusin', e => { if (e.target.classList && e.target.classList.contains('hj-lpsvg') && S.lp) lpHover(e.target, S.lpAt != null ? S.lpAt : Math.round((ldlModel() || {tNow: 0}).tNow)); });
document.addEventListener('focusout', e => { if (e.target.classList && e.target.classList.contains('hj-lpsvg')) lpHover(e.target, null); });
document.addEventListener('keydown', e => { const svg = e.target; if (!svg.classList || !svg.classList.contains('hj-lpsvg') || !S.lp) return;
  const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return; e.preventDefault(); lpHover(svg, (S.lpAt || 0) + d); });
document.addEventListener('toggle', e => { const d = e.target; if (d && d.dataset && d.dataset.hjd) S.open[d.dataset.hjd] = d.open; }, true);

// ---------- styles ----------
const CSS = `
#hj-root{min-width:0;--hj:#5F7D48;--hjcalm:#6C7FA6;--lpc:#4A8A2C;--lpm:#3D6FCC;}
:root[data-theme="dark"] #hj-root{--hj:#8FB073;--hjcalm:#9DB0D6;--lpc:#5E9E3A;--lpm:#5B8BE0;}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) #hj-root{--hj:#8FB073;--hjcalm:#9DB0D6;--lpc:#5E9E3A;--lpm:#5B8BE0;}}
.hj-hero{position:relative;border-radius:20px;overflow:hidden;margin:0 0 14px;min-height:220px;display:flex;align-items:flex-end;background:#3E5A2E;}
.hj-hero picture,.hj-hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.hj-hero::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(25,35,18,.05) 20%,rgba(25,35,18,.72));}
.hj-hin{position:relative;z-index:1;padding:22px 22px 18px;color:#FAF7F2;max-width:620px;}
.hj-hin h2{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(34px,6vw,48px);line-height:1.05;margin:4px 0;color:#FAF7F2;}
.hj-hin p{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:19px;}
.hj-eb,.hj-kick{font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;font-size:13.5px;}
.hj-kick{color:var(--gold);margin:0 0 6px;}
.hj-lead{color:var(--ink-soft);margin:0 0 12px;}
.hj-secs,.hj-chips{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 16px;}.hj-secs .chip,.hj-chips .chip{min-height:46px;}
.hj-blk{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px 18px;margin:0 0 14px;min-width:0;}.hj-blk h3{margin:0 0 8px;}
.hj-g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 14px;}@media(max-width:760px){.hj-g2{grid-template-columns:minmax(0,1fr);}}
.hj-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0 12px;}@media(max-width:700px){.hj-g3{grid-template-columns:repeat(2,minmax(0,1fr));}}
.hj-fld{display:block;min-width:0;margin:6px 0;}.hj-fld span{display:block;font-size:14px;color:var(--ink-soft);margin-bottom:3px;}.hj-fld input{width:100%;min-width:0;}
#hj-root textarea{width:100%;min-width:0;}
.hj-sub{color:var(--ink-soft);font-size:15.5px;margin:6px 0 10px;}
.hj-big{font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:48px;line-height:1;}
.hj-note{background:var(--bg-deep);border-left:4px solid var(--hj);border-radius:10px;padding:12px 14px;margin:0 0 14px;font-size:15px;}
.hj-checks{display:grid;gap:8px;}
.hj-ck{display:flex;gap:12px;align-items:center;text-align:left;background:var(--bg-deep);border:1px solid var(--line);border-radius:12px;padding:10px 12px;color:var(--ink);font:inherit;cursor:pointer;min-height:52px;}
.hj-ck .box{flex:0 0 26px;height:26px;border-radius:8px;border:2px solid var(--line);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;background:var(--card);}
.hj-ck.on .box{background:var(--hj);border-color:var(--hj);}.hj-ck small{display:block;color:var(--ink-soft);font-size:14px;}
.hj-chart{display:block;width:100%;max-width:420px;height:auto;margin:6px 0 8px;}.hj-chart .l{fill:none;stroke:var(--hj);stroke-width:3;stroke-linejoin:round;stroke-linecap:round;}
.hj-chart .p{fill:var(--card);stroke:var(--hj);stroke-width:2.5;}.hj-chart .g{stroke:var(--gold);stroke-width:1.5;stroke-dasharray:5 5;}.hj-chart .t{fill:var(--ink-soft);font-size:11px;font-family:'Barlow',sans-serif;}
.hj-tw{overflow-x:auto;max-width:100%;}.hj-tbl{width:100%;border-collapse:collapse;font-size:15px;}.hj-tbl th,.hj-tbl td{border-top:1px solid var(--line);padding:7px 6px;text-align:left;vertical-align:top;}.hj-tbl th{font-size:13px;color:var(--ink-soft);white-space:nowrap;}.hj-tbl small{display:block;color:var(--ink-soft);font-size:13px;}
.hj-doc{background:var(--card);border:1px solid var(--line);border-radius:14px;margin:0 0 10px;min-width:0;}
.hj-doc summary{cursor:pointer;padding:14px 16px;font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:22px;list-style:none;display:flex;justify-content:space-between;gap:10px;}
.hj-doc summary::after{content:'+';color:var(--gold);font-family:'Barlow',sans-serif;}.hj-doc[open] summary::after{content:'\\2212';}
.hj-doc summary::-webkit-details-marker{display:none;}
.hj-body{padding:0 16px 14px;overflow-wrap:anywhere;min-width:0;}.hj-body h3{font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;color:var(--gold);font-size:15px;margin:18px 0 6px;}
.hj-body h4{margin:14px 0 4px;}.hj-body p,.hj-body li{max-width:70ch;}
.hj-body table{border-collapse:collapse;width:100%;font-size:15px;}.hj-body th,.hj-body td{border-top:1px solid var(--line);padding:7px 8px;text-align:left;vertical-align:top;}.hj-body th{background:var(--bg-deep);font-size:13.5px;}
.hj-body .hj-tw{border:1px solid var(--line);border-radius:10px;margin:8px 0 12px;}
.hj-ms{list-style:none;padding:0;margin:0;}.hj-ms li{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;padding:7px 0;border-top:1px solid var(--line);}.hj-ms li:first-child{border-top:0;}.hj-ms .star{color:var(--gold);}.hj-ms small{color:var(--ink-soft);}
.hj-pg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px 18px;}@media(max-width:700px){.hj-pg{grid-template-columns:minmax(0,1fr);}}
.hj-pi{padding:8px 0;border-top:1px solid var(--line);min-width:0;}.hj-pi small{display:block;color:var(--ink-soft);font-size:13px;}
.hj-pv{font-weight:700;color:var(--hj);white-space:nowrap;}.hj-pv.low,.hj-pv.high{color:var(--gold);}
.hj-rb{position:relative;height:8px;border-radius:5px;background:var(--bg-deep);margin:6px 0 2px;}.hj-rb .ok{position:absolute;top:0;bottom:0;background:var(--hj);opacity:.55;border-radius:5px;}
.hj-rb i{position:absolute;top:-4px;width:4px;height:16px;margin-left:-2px;border-radius:2px;background:var(--ink);}
.hj-pd{display:block;font-family:'Barlow',sans-serif;font-weight:400;font-size:14px;color:var(--ink-soft);}
.hj-offer{border-left:4px solid var(--gold);}
@media(max-width:700px){.hj-hero{min-height:150px;}.hj-hin{padding:16px 18px 14px;}.hj-hin p{display:none;}}
.hj-wk{color:var(--ink-soft);font-size:14.5px;margin:0 0 10px;font-weight:600;}
.hj-now{background:var(--card);border:2px solid var(--hj);border-radius:20px;padding:20px 20px 18px;margin:0 0 14px;}
.hj-now h3{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(28px,6vw,36px);line-height:1.1;margin:4px 0 6px;}.hj-now p{margin:0 0 14px;color:var(--ink-soft);}
.hj-now.done{border-color:var(--line);}
.hj-go{width:100%;min-height:56px;font-size:18px;justify-content:center;}
.hj-ag,.hj-it{display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid var(--line);min-width:0;}.hj-ag:first-of-type,.hj-it:first-of-type{border-top:0;}
.hj-ag.cur .hj-agt b{color:var(--hj);}.hj-ag.ok .hj-agt b,.hj-it.done .hj-itt b{text-decoration:line-through;opacity:.6;}
.hj-agck{flex:0 0 34px;height:34px;border-radius:10px;border:2px solid var(--line);background:var(--card);color:#fff;font-weight:700;font-size:17px;cursor:pointer;display:flex;align-items:center;justify-content:center;}
.hj-agck[aria-pressed="true"]{background:var(--hj);border-color:var(--hj);}
.hj-agt,.hj-itt{flex:1;min-width:0;text-align:left;background:none;border:0;color:var(--ink);font:inherit;cursor:pointer;padding:4px 0;}.hj-agt small,.hj-itt small{display:block;color:var(--ink-soft);font-size:13.5px;overflow-wrap:anywhere;}.hj-itt b{overflow-wrap:anywhere;}
.hj-habits{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,190px),1fr));gap:8px;}
.hj-hb{display:flex;align-items:center;gap:8px;text-align:left;background:var(--bg-deep);border:1px solid var(--line);border-radius:12px;padding:9px 10px;color:var(--ink);font:inherit;font-size:15px;cursor:pointer;min-height:48px;}
.hj-hb .box{flex:0 0 24px;height:24px;border-radius:7px;border:2px solid var(--line);background:var(--card);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;}.hj-hb.on .box{background:var(--hj);border-color:var(--hj);}
.hj-ldl{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;width:100%;text-align:left;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:14px 18px;margin:0 0 14px;color:var(--ink);font:inherit;cursor:pointer;}
.hj-ldl b{font-family:'Cormorant Garamond',Georgia,serif;font-size:40px;line-height:1;}.hj-ldl span:last-of-type{color:var(--ink-soft);font-size:15px;}
.hj-ldl .hj-lps{flex-basis:100%;color:var(--ink-soft);font-size:14.5px;}
/* BLD 860: My LDL Path. Series colors validated with the dataviz palette check on the card surfaces (light #FFFCF6, dark #231A13). */
.hj-lpks{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:4px 0 10px;}@media(max-width:700px){.hj-lpks{grid-template-columns:repeat(2,minmax(0,1fr));}}
.hj-lpk{background:var(--bg-deep);border-radius:12px;padding:10px 12px;min-width:0;}.hj-lpk small{display:block;color:var(--ink-soft);font-size:13.5px;line-height:1.25;}
.hj-lpk b{display:block;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-weight:600;font-size:28px;line-height:1.15;color:var(--ink);}.hj-lpk span{display:block;color:var(--ink-soft);font-size:13px;}
.hj-lpcal{font-size:14.5px;}
.hj-lpleg{display:flex;flex-wrap:wrap;gap:6px 16px;margin:4px 0 6px;font-size:13.5px;color:var(--ink-soft);}.hj-lpleg span{display:inline-flex;align-items:center;gap:6px;}
.hj-lp i[class^="k-"]{display:inline-block;flex:0 0 auto;width:18px;height:0;border-top:2px solid var(--lpc);}
.hj-lp i.k-b{height:10px;border:0;border-radius:2px;background:color-mix(in srgb,var(--lpc) 16%,transparent);}
.hj-lp i.k-m{border-top:2px dashed var(--lpm);}.hj-lp i.k-l{width:9px;height:9px;border:0;border-radius:50%;background:var(--ink);}
.hj-lpw{position:relative;margin:4px 0 10px;}
.hj-lpsvg{display:block;width:100%;max-width:720px;height:auto;touch-action:pan-y;outline:none;border-radius:8px;}.hj-lpsvg:focus-visible{box-shadow:0 0 0 2px var(--gold);}
.hj-lpsvg text{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:11.5px;}
.hj-lpsvg .ax{fill:var(--ink-soft);font-variant-numeric:tabular-nums;}.hj-lpsvg .tl{fill:var(--ink);font-weight:600;}
.hj-lpsvg .el{fill:var(--ink-soft);}.hj-lpsvg .el.on{fill:var(--ink);font-weight:600;}
.hj-lpsvg .gr{stroke:var(--line);stroke-width:1;}.hj-lpsvg .tg{stroke:var(--ink-soft);stroke-width:1;opacity:.75;}.hj-lpsvg .bs{stroke:var(--ink-soft);stroke-width:1;opacity:.5;}
.hj-lpsvg .td{stroke:var(--ink-soft);stroke-width:1;}.hj-lpsvg .ld{stroke:var(--ink-soft);stroke-width:1;}
.hj-lpsvg .bd{fill:var(--lpc);opacity:.12;stroke:none;}
.hj-lpsvg .lc{fill:none;stroke:var(--lpc);stroke-width:2;stroke-linejoin:round;stroke-linecap:round;}
.hj-lpsvg .lm{fill:none;stroke:var(--lpm);stroke-width:2;stroke-dasharray:6 4;stroke-linejoin:round;stroke-linecap:round;}
.hj-lpsvg .lab{fill:var(--ink);stroke:var(--card);stroke-width:2;}
.hj-lpsvg .xh{stroke:var(--ink-soft);stroke-width:1;}.hj-lpsvg .hit{fill:transparent;cursor:crosshair;}
.hj-lptip{position:absolute;top:6px;left:0;z-index:2;pointer-events:none;background:var(--card);border:1px solid var(--line);border-radius:10px;box-shadow:0 6px 18px rgba(0,0,0,.14);padding:8px 10px;font-size:13.5px;min-width:150px;max-width:220px;}
.hj-lptip .hd{color:var(--ink-soft);font-size:12.5px;margin-bottom:4px;}.hj-lptip div{display:flex;align-items:center;gap:7px;line-height:1.5;}
.hj-lptip b{color:var(--ink);font-variant-numeric:tabular-nums;}.hj-lptip span{color:var(--ink-soft);}
.hj-lvs{display:grid;gap:10px;margin:6px 0 12px;}
.hj-lvr{display:grid;grid-template-columns:minmax(0,38%) minmax(0,1fr);gap:4px 12px;align-items:center;}
.hj-lvt b{display:block;font-size:15px;line-height:1.2;}.hj-lvt small{display:block;color:var(--ink-soft);font-size:13px;}
.hj-lvb{display:flex;align-items:center;gap:8px;min-width:0;}.hj-lvb span{display:block;height:14px;min-width:2px;background:var(--lpc);border-radius:0 4px 4px 0;}
.hj-lvr:hover .hj-lvb span{filter:brightness(1.12);}
.hj-lvb em{font-style:normal;font-size:13.5px;color:var(--ink);white-space:nowrap;font-variant-numeric:tabular-nums;}
.hj-lvn{grid-column:1 / -1;margin:0;color:var(--ink-soft);font-size:13.5px;font-style:italic;}
.hj-lptbl td small{display:block;}
.hj-src{color:var(--ink-soft);font-size:13px;line-height:1.45;margin:8px 0 0;overflow-wrap:anywhere;}
.hj-wkbar{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 0 12px;}.hj-wkbar>div{text-align:center;min-width:0;}.hj-wkbar small{display:block;color:var(--ink-soft);font-size:13.5px;}
.hj-day{display:flex;gap:12px;padding:10px 0;border-top:1px solid var(--line);}.hj-day:first-child{border-top:0;}.hj-day.t .hj-dl b{color:var(--hj);}
.hj-dl{flex:0 0 52px;}.hj-dl small{display:block;color:var(--ink-soft);font-size:13px;}.hj-dr{flex:1;min-width:0;display:flex;flex-wrap:wrap;gap:6px;}
.hj-pill{border:1px solid var(--line);background:var(--bg-deep);color:var(--ink);border-radius:12px;padding:7px 11px;font:inherit;font-size:15px;cursor:pointer;text-align:left;max-width:100%;overflow-wrap:anywhere;}
.hj-nl{color:var(--ink-soft);font-size:13.5px;}.hj-nut .hj-tbl td,.hj-nut .hj-tbl th{text-align:left;}
.hj-pill.calm{border-left:4px solid var(--hjcalm);}.hj-pill.rem{border-style:dashed;background:none;color:var(--ink-soft);font-size:13.5px;padding:5px 10px;}.hj-pill.rem.on{border-style:solid;border-color:var(--hj);color:var(--ink);}
.hj-remd{flex-basis:100%;font-size:14px;color:var(--ink-soft);background:var(--bg-deep);border-radius:10px;padding:8px 10px;display:flex;flex-wrap:wrap;gap:8px;align-items:baseline;}
.hj-rem .hj-agt .linkbtn{display:inline-block;margin-top:2px;font-size:14px;}
.hj-pill.food{border-left:4px solid var(--gold);}.hj-pill.move{border-left:4px solid var(--hj);}.hj-pill.prep{border-left:4px solid var(--ink-soft);}.hj-pill small{color:var(--ink-soft);}
.hj-ideas{padding-left:18px;}.hj-ideas li{margin:6px 0;}.hj-ideas span{color:var(--ink-soft);font-size:15px;}
.hj-shopbar{position:sticky;top:0;z-index:4;background:var(--bg);padding:8px 0;border-bottom:1px solid var(--line);margin-bottom:6px;}
.hj-tot{display:flex;justify-content:space-between;flex-wrap:wrap;gap:6px;margin-top:8px;font-size:14.5px;color:var(--ink-soft);}.hj-tot b{color:var(--ink);}
.hj-prog{height:6px;border-radius:4px;background:var(--bg-deep);overflow:hidden;margin-top:6px;}.hj-prog span{display:block;height:100%;background:var(--hj);transition:width .3s;}
.hj-sec{font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:var(--gold);font-size:14px;margin:16px 0 2px;display:flex;justify-content:space-between;}.hj-sec small{font-family:'Barlow',sans-serif;letter-spacing:0;text-transform:none;color:var(--ink-soft);font-weight:500;}
.hj-pr{font-weight:600;white-space:nowrap;font-size:15px;}
.hj-ed{background:var(--bg-deep);border-radius:12px;padding:10px 12px;margin:0 0 8px;}
.hj-add{display:flex;gap:8px;margin-top:12px;}.hj-add input{flex:1;min-width:0;}
.hj-copy{width:100%;min-height:180px;margin-top:10px;font:14px/1.4 ui-monospace,monospace;}
.hj-ov{position:fixed;inset:0;z-index:80;background:var(--bg);overflow:auto;padding:env(safe-area-inset-top,0px) max(16px,env(safe-area-inset-right,0px)) env(safe-area-inset-bottom,0px) max(16px,env(safe-area-inset-left,0px));}
.hj-ovin{max-width:640px;margin:0 auto;padding:14px 0 40px;}
.hj-ovtop{display:flex;justify-content:space-between;align-items:center;gap:10px;}.hj-ovtop b{font-size:17px;}
.hj-x{flex:0 0 44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--card);color:var(--ink);font-size:26px;line-height:1;cursor:pointer;}
.hj-ovb{text-align:center;padding-top:18px;}.hj-ovb.hj-left{text-align:left;}
.hj-exn{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(30px,8vw,44px);line-height:1.08;margin:6px 0 8px;}
.hj-reps{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:clamp(34px,10vw,52px);color:var(--hj);line-height:1;margin:6px 0 10px;}
.hj-how{color:var(--ink-soft);max-width:46ch;margin:0 auto 8px;}.hj-cue{font-weight:600;max-width:46ch;margin:0 auto 10px;}
.hj-lb{max-width:240px;margin:8px auto 4px;text-align:left;}
.hj-clock{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:clamp(64px,22vw,110px);line-height:1;margin:14px 0;color:var(--ink);font-variant-numeric:tabular-nums;}
.hj-clock.sm{font-size:26px;margin:0 8px 0 0;display:inline-block;color:var(--hj);}
.hj-ovbtns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:12px;}.hj-ovbtns .btn{min-height:54px;min-width:150px;font-size:17px;justify-content:center;}
.hj-skip{margin-top:14px;}
.hj-big2{font-family:'Cormorant Garamond',Georgia,serif;font-size:44px;font-weight:700;margin:18px 0 6px;}
.hj-guide{text-align:left;max-width:46ch;margin:10px auto;color:var(--ink-soft);}
.hj-steps{list-style:none;padding:0;margin:8px 0 14px;}.hj-steps li{display:flex;gap:12px;padding:10px 0;border-top:1px solid var(--line);}.hj-steps li:first-child{border-top:0;}
.hj-steps li.on>div{opacity:.55;}.hj-steps li>div{flex:1;min-width:0;padding-top:5px;}
.hj-at{font-weight:700;color:var(--gold);font-variant-numeric:tabular-nums;}
.hj-tm{display:flex;align-items:center;gap:8px;margin-top:6px;flex-wrap:wrap;}.hj-tdone{color:var(--hj);font-weight:600;font-size:14px;}
.hj-ing{columns:2 220px;padding-left:18px;margin:0;}.hj-ing li{margin:3px 0;break-inside:avoid;}
.hj-did{display:block;margin:10px auto 0;}
.hj-tg{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:14px 0;}.hj-tg .chip{min-height:40px;font-size:14px;}
.hj-sess{display:flex;justify-content:space-between;color:var(--ink-soft);font-size:14px;margin-top:6px;font-variant-numeric:tabular-nums;}.hj-sess span:first-child{font-weight:700;color:var(--ink);}
.hj-fig{width:min(190px,48vw);margin:0 auto -4px;color:var(--hj);}.hj-fig svg{width:100%;height:auto;display:block;}
.hj-ctl .btn{min-width:110px;}
.hj-kstep{font-size:clamp(22px,5.5vw,28px);line-height:1.35;font-weight:600;max-width:32ch;margin:10px auto 16px;}
.hj-ktimers{display:grid;gap:6px;margin:10px 0;}.hj-ktimers>div{display:flex;align-items:center;gap:8px;background:var(--bg-deep);border-radius:12px;padding:6px 10px;min-width:0;}.hj-ktimers small{flex:1;min-width:0;color:var(--ink-soft);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.hj-rang{background:var(--hj);color:#fff;border-radius:12px;padding:10px 12px;margin:10px 0;display:flex;gap:8px;align-items:center;flex-wrap:wrap;}.hj-rang .linkbtn{color:#fff;margin-left:auto;}
.hj-lib{list-style:none;padding:0;margin:0;display:grid;gap:6px;}.hj-lib .hj-pill{width:100%;}
.hj-candle{width:min(150px,40vw);margin:0 auto 4px;}.hj-candle svg{width:100%;height:auto;display:block;}
.hj-flame{transform-origin:60px 74px;animation:hjfl 2.6s ease-in-out infinite;}.hj-flame2{transform-origin:60px 70px;animation:hjfl 2.1s ease-in-out infinite reverse;}.hj-glow{animation:hjgl 3.4s ease-in-out infinite;}
@keyframes hjfl{0%,100%{transform:scale(1,1) rotate(0);}30%{transform:scale(.96,1.05) rotate(-2deg);}60%{transform:scale(1.03,.97) rotate(2deg);}}@keyframes hjgl{0%,100%{opacity:.8;}50%{opacity:1;}}
@media (prefers-reduced-motion: reduce){.hj-flame,.hj-flame2,.hj-glow{animation:none;}}
.hj-mline{font-family:'Cormorant Garamond',Georgia,serif;font-size:22px;font-style:italic;min-height:3em;}
.hj-gi{display:block;font-size:14px;color:var(--ink-soft);margin-top:3px;}.hj-ggadd{margin-top:6px;}
.hj-pc{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 0;border-top:1px solid var(--line);}.hj-pc:first-of-type{border-top:0;}.hj-pc>div:first-child{flex:1 1 180px;}.hj-pc small{display:block;color:var(--ink-soft);font-size:13.5px;}
.hj-stock{display:flex;align-items:center;gap:6px;}.hj-stock span{text-align:center;min-width:52px;}.hj-stock small{display:block;font-size:12px;color:var(--ink-soft);}.hj-stock .chip{min-height:38px;min-width:40px;}
.hj-entry{border-top:1px solid var(--line);padding:10px 0;}.hj-entry:first-of-type{border-top:0;}.hj-entry p{margin:4px 0 0;}
/* BLD 857: color and the stage. Each player wears its state color (--st); the stage panel holds the scene from GGStage. */
.hj-ov.hj-st{background:var(--bg);background:var(--stbg,color-mix(in srgb,var(--st) 10%,var(--bg)));color:var(--stfg,var(--ink));}
.hj-st .hj-clock{color:var(--stfg,var(--ink));}.hj-st .hj-how{color:var(--stfg,var(--ink-soft));opacity:.85;}
.hj-st .hj-prog span{background:var(--st);}.hj-st .hj-reps{color:var(--st);}.hj-st .hj-stk{color:var(--st);}
.hj-st .hj-ovtop .hj-kick{color:var(--st);}
.hj-stagebox{position:relative;margin:10px 0 0;}.hj-stagebox.sm .ggs{--H:clamp(120px,32vw,170px);}
.hj-stagebox.fb{height:clamp(170px,32vh,290px);border-radius:22px;overflow:hidden;background:var(--st);}
.hj-stagebox.fb.sm{height:clamp(96px,16vh,130px);}
.hj-stagebox.fb>*{position:absolute;inset:0;}
.hj-scn{color:#fff;background:linear-gradient(180deg,color-mix(in srgb,var(--ac) 55%,#fff) 0%,var(--ac) 100%);display:flex;align-items:center;justify-content:center;}
.hj-scn .hj-sky{position:absolute;inset:0;background:radial-gradient(circle at 78% 18%,rgba(255,240,200,.75) 0,rgba(255,240,200,0) 30%);}
.hj-scn[data-st="rest"] .hj-sky,.hj-scn[data-st="med"] .hj-sky,.hj-scn[data-st="breathe"] .hj-sky{background:radial-gradient(circle at 50% 110%,rgba(255,255,255,.35) 0,rgba(255,255,255,0) 60%);}
.hj-scfig{position:relative;height:88%;aspect-ratio:1;display:flex;align-items:center;justify-content:center;}.hj-scfig>svg,.hj-scfig>div,.hj-scfig .hj-candle{width:100%;height:100%;}.hj-scfig svg{width:100%;height:100%;display:block;}
.hj-scfig.wring{height:70%;margin-right:22%;}
.hj-ring{position:relative;width:min(62%,190px);aspect-ratio:1;border-radius:50%;background:conic-gradient(#fff calc(var(--p) * 360deg),rgba(255,255,255,.22) 0);display:flex;align-items:center;justify-content:center;transition:background .1s linear;}
.hj-ring::before{content:'';position:absolute;inset:9%;border-radius:50%;background:var(--ac);}
.hj-ring b{position:relative;font-family:'Barlow Condensed',sans-serif;font-size:clamp(40px,11vw,64px);font-variant-numeric:tabular-nums;color:#fff;}
.hj-ring.sm{position:absolute;right:6%;top:50%;transform:translateY(-50%);width:min(36%,120px);}.hj-ring.sm b{font-size:clamp(26px,7vw,40px);}
.hj-breath{position:absolute;left:50%;top:50%;width:min(70%,220px);aspect-ratio:1;margin:0;border-radius:50%;border:3px solid rgba(255,255,255,.8);transform:translate(-50%,-50%) scale(.6);animation:hjbr calc(var(--in) + var(--out)) ease-in-out infinite;}
@keyframes hjbr{0%,100%{transform:translate(-50%,-50%) scale(.6);opacity:.55;}50%{transform:translate(-50%,-50%) scale(1);opacity:1;}}
.hj-sidebadge{position:absolute;left:12px;top:12px;background:rgba(255,255,255,.92);color:#1d2a36;border-radius:999px;padding:5px 14px;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;font-size:16px;}
.hj-dots{display:flex;gap:8px;justify-content:center;margin:2px 0 8px;}.hj-dots i{width:14px;height:14px;border-radius:50%;border:2px solid var(--st);opacity:.6;}.hj-dots i.d{background:var(--st);opacity:1;}.hj-dots i.c{background:var(--st);opacity:1;box-shadow:0 0 0 4px color-mix(in srgb,var(--st) 30%,transparent);}
.hj-tips{list-style:none;padding:0;margin:8px auto 10px;max-width:40ch;text-align:left;}.hj-tips li{background:var(--card);border-left:4px solid var(--st);border-radius:10px;padding:9px 12px;margin:6px 0;font-weight:600;}
.hj-mot{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:24px;line-height:1.25;max-width:30ch;margin:6px auto 10px;}
.hj-light{background:var(--card);border:1px solid var(--line);border-left:4px solid #E5A823;border-radius:12px;padding:10px 12px;max-width:44ch;margin:8px auto 10px;text-align:left;font-size:15.5px;}
.hj-wtl{max-width:44ch;margin:6px auto;color:var(--ink);font-size:15.5px;}.hj-wt .hj-lb{margin-top:4px;}
.hj-ovb.hj-in{animation:hjin .45s ease-out both;animation-delay:var(--hjd,0ms);}
.hj-ovb[data-hjstate="rest"] .hj-clock,.hj-ovb[data-hjstate="next"] .hj-clock{font-size:clamp(34px,9vw,48px);margin:4px 0 8px;opacity:.8;}
@keyframes hjin{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
.hj-stagebox .hj-steam{animation:hjst 2.4s ease-in-out infinite;}@keyframes hjst{0%,100%{opacity:.25;transform:translateY(4px);}50%{opacity:.7;transform:none;}}
@media (prefers-reduced-motion: reduce){.hj-ovb.hj-in,.hj-breath,.hj-stagebox .hj-steam{animation:none;}.hj-ring{transition:none;}}
/* BLD 861: Today's Plate. Meter states carry an icon and a word; getting close and past also wear a stripe, so state never rests on color alone.
   State colors checked with the dataviz palette validator on the card surfaces (normal vision separation passes; green and amber lean on the icon, word, and stripe). */
#hj-root{--mok:#4A8A2C;--mclose:#C2740C;--mpast:#8E5BA6;--mbuild:var(--ink-soft);}
:root[data-theme="dark"] #hj-root{--mok:#5E9E3A;--mclose:#C47A1C;--mpast:#A77BC2;}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) #hj-root{--mok:#5E9E3A;--mclose:#C47A1C;--mpast:#A77BC2;}}
.hj-plate{padding-bottom:12px;}
.hj-mts0{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.6fr);gap:12px 18px;align-items:start;margin:2px 0 4px;}@media(max-width:700px){.hj-mts0{grid-template-columns:minmax(0,1fr);}}
.hj-mtg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 14px;}@media(max-width:700px){.hj-mtg{grid-template-columns:repeat(2,minmax(0,1fr));}}
.hj-mt{min-width:0;--mc:var(--mbuild);}.hj-mt[data-st="ok"],.hj-mt[data-st="done"]{--mc:var(--mok);}.hj-mt[data-st="close"]{--mc:var(--mclose);}.hj-mt[data-st="past"]{--mc:var(--mpast);}.hj-mt[data-st="none"]{--mc:var(--ink-soft);}
.hj-mth{display:flex;justify-content:space-between;align-items:baseline;gap:6px;}.hj-mth .l{font-size:13.5px;color:var(--ink-soft);line-height:1.2;}.hj-mth .l small{font-size:11.5px;}
.hj-mth b{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-weight:600;font-size:17px;color:var(--ink);font-variant-numeric:tabular-nums;white-space:nowrap;}
.hj-mt.big .hj-mth .l{font-size:15px;font-weight:600;color:var(--ink);}.hj-mt.big .hj-mth b{font-size:34px;line-height:1.05;}
.hj-mtb{position:relative;height:8px;border-radius:5px;background:color-mix(in srgb,var(--mc) 18%,var(--bg-deep));margin:5px 0 4px;overflow:visible;}.hj-mt.big .hj-mtb{height:14px;border-radius:7px;}
.hj-mtb .f{position:absolute;left:0;top:0;bottom:0;border-radius:inherit;background:var(--mc);transition:width .35s ease;min-width:0;}
.hj-mt[data-st="close"] .hj-mtb .f,.hj-mt[data-st="past"] .hj-mtb .f{background-image:repeating-linear-gradient(45deg,rgba(255,255,255,.28) 0 3px,transparent 3px 7px);}
.hj-mtb i{position:absolute;top:-3px;bottom:-3px;width:2px;margin-left:-1px;background:var(--ink);opacity:.55;border-radius:1px;}
.hj-mts{display:flex;justify-content:space-between;gap:6px;flex-wrap:wrap;font-size:12.5px;color:var(--ink-soft);line-height:1.3;}.hj-mts em{font-style:normal;color:var(--ink);font-weight:600;white-space:nowrap;}.hj-mt.big .hj-mts{font-size:14px;}
@media (prefers-reduced-motion: reduce){.hj-mtb .f{transition:none;}}
.hj-p8s{font-size:14px;margin:8px 0;}.hj-pv8{margin:0 0 8px;}.hj-pv8 .chip{min-height:40px;font-size:14px;}
.hj-pg8{border-top:1px solid var(--line);}.hj-pg8 summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:baseline;gap:8px;padding:11px 0;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:var(--gold);font-size:15px;}
.hj-pg8 summary::-webkit-details-marker{display:none;}.hj-pg8 summary small{font-family:'Barlow',sans-serif;letter-spacing:0;text-transform:none;color:var(--ink-soft);font-weight:500;font-size:13.5px;}
.hj-pg8 summary::after{content:'+';color:var(--gold);padding-left:8px;font-family:'Barlow',sans-serif;}.hj-pg8[open] summary::after{content:'\\2212';}
.hj-pg8 summary small{margin-left:auto;}
.hj-pr8{display:flex;align-items:center;gap:6px;min-width:0;}
.hj-prt{flex:1;min-width:0;display:flex;align-items:center;gap:10px;text-align:left;background:none;border:0;border-radius:10px;padding:7px 4px;color:var(--ink);font:inherit;cursor:pointer;min-height:48px;}
.hj-prt:hover{background:var(--bg-deep);}.hj-prt .nm{min-width:0;}.hj-prt b{display:block;font-weight:600;font-size:15.5px;overflow-wrap:anywhere;}.hj-prt small{display:block;color:var(--ink-soft);font-size:13px;overflow-wrap:anywhere;}
.hj-prt .box{flex:0 0 30px;height:30px;border-radius:9px;border:2px solid var(--line);background:var(--card);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;}
.hj-pr8.on .box{background:var(--mok);border-color:var(--mok);}
.hj-prm{flex:0 0 40px;height:40px;border-radius:50%;border:1px solid var(--line);background:var(--card);color:var(--ink);font-size:20px;line-height:1;cursor:pointer;}
.hj-eh{font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:var(--gold);font-size:14px;margin:12px 0 6px;}
.hj-se{border-top:1px solid var(--line);margin-top:4px;}.hj-se #hj-eatq{width:100%;min-width:0;min-height:46px;}
.hj-er{border-top:1px solid var(--line);}.hj-er:first-of-type{border-top:0;}
.hj-ert{display:block;width:100%;text-align:left;background:none;border:0;padding:8px 2px;color:var(--ink);font:inherit;cursor:pointer;}.hj-ert b{font-weight:600;font-size:15px;overflow-wrap:anywhere;}.hj-ert small{display:block;color:var(--ink-soft);font-size:13px;overflow-wrap:anywhere;}
.hj-eq{display:flex;align-items:center;flex-wrap:wrap;gap:6px;padding:0 0 10px;}.hj-eq>span{font-size:13.5px;color:var(--ink-soft);margin-right:2px;}.hj-eq .chip{min-height:40px;min-width:46px;}
#hj-eatres{margin:6px 0 4px;}#hj-eatres .hj-eh{margin-top:6px;font-size:13px;}
.hj-ex{margin:0 0 8px;}.hj-exr{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:7px 0;border-top:1px solid var(--line);min-width:0;}.hj-exr:first-child{border-top:0;}.hj-exr>span{min-width:0;}.hj-exr b{display:block;font-weight:600;font-size:15px;overflow-wrap:anywhere;}.hj-exr small{display:block;color:var(--ink-soft);font-size:13px;}
.hj-own,.hj-sps,.hj-pw{margin:10px 0 0;}.hj-own summary,.hj-sps summary,.hj-pw summary{font-size:19px;padding:11px 14px;}
.hj-ckh{border-top:1px solid var(--line);padding-top:12px;margin-top:14px;}.hj-ckg{margin:0 0 8px;}.hj-ckg .hj-eh{color:var(--ink-soft);font-size:12.5px;margin:6px 0 4px;}
.hj-pck small{display:block;color:var(--ink-soft);font-size:12.5px;line-height:1.25;}
.hj-wbs{position:relative;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 18px;margin:4px 0 10px;}@media(max-width:700px){.hj-wbs{grid-template-columns:minmax(0,1fr);}}
.hj-wbt{font-size:13.5px;font-weight:600;color:var(--ink);margin-bottom:2px;}
.hj-wbsvg{display:block;width:100%;max-width:420px;height:auto;}.hj-wbsvg text{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:11px;}
.hj-wbsvg .ax{fill:var(--ink-soft);font-variant-numeric:tabular-nums;}.hj-wbsvg .ax.on{fill:var(--ink);font-weight:600;}.hj-wbsvg .gr{stroke:var(--line);stroke-width:1;}
.hj-wbsvg.sf .b{fill:var(--lpc);}.hj-wbsvg.pro .b{fill:var(--lpm);}.hj-wbsvg .hit{fill:transparent;}.hj-wbg:hover .b{filter:brightness(1.12);}
.hj-wbsvg .aim{stroke:var(--ink);stroke-width:1.25;stroke-dasharray:5 4;opacity:.7;}.hj-wbsvg .al{fill:var(--ink);font-weight:600;}.hj-wbsvg .vl{fill:var(--ink);font-weight:600;font-variant-numeric:tabular-nums;}
.hj-ptip{position:absolute;z-index:2;pointer-events:none;transform:translateY(-100%);background:var(--card);border:1px solid var(--line);border-radius:10px;box-shadow:0 6px 18px rgba(0,0,0,.14);padding:6px 10px;font-size:13.5px;color:var(--ink);white-space:nowrap;}
`;
(function(){ const s = document.createElement('style'); s.id = 'hj-css'; s.textContent = CSS; document.head.appendChild(s); })();

window.GGHealth = {
  init(ctx){ C = ctx || {}; },
  on: () => !!FLDH(),
  view,
  open(sec){ S.sec = sec || 'today'; if (C.go) C.go('health'); },
  // Backups: entries combine; the newest copy of each wins and removed entries stay removed.
  merge(out, inc){
    out.deleted = out.deleted || {clients: {}, sessions: {}}; out.deleted.health = out.deleted.health || {};
    Object.entries((inc.deleted || {}).health || {}).forEach(([id, ts]) => { out.deleted.health[id] = Math.max(out.deleted.health[id] || 0, ts); });
    const o = out.health = out.health && typeof out.health === 'object' ? out.health : {}, i = inc.health || {}; let added = 0, updated = 0;
    ['labs', 'marks', 'notes', 'panels', 'wlog', 'myFoods'].forEach(k => {
      o[k] = arr(o[k]);
      arr(i[k]).forEach(x => { if (!x || !x.id) return; const j = o[k].findIndex(y => y.id === x.id); if (j < 0){ o[k].push(x); added++; } else if ((x.u || 0) > (o[k][j].u || 0)){ o[k][j] = x; updated++; } });
      o[k] = o[k].filter(x => !(out.deleted.health[x.id] && out.deleted.health[x.id] >= (x.u || 0)));
    });
    o.days = o.days && typeof o.days === 'object' ? o.days : {};
    Object.entries(i.days || {}).forEach(([d, x]) => { if (x && (!o.days[d] || (x.u || 0) > (o.days[d].u || 0))) o.days[d] = x; });
    if (i.set && (!o.set || (i.set.u || 0) > (o.set.u || 0))) o.set = i.set;
    o.log = o.log && typeof o.log === 'object' ? o.log : {}; Object.entries(i.log || {}).forEach(([d, x]) => { if (x && (!o.log[d] || (x.u || 0) > (o.log[d].u || 0))) o.log[d] = x; });
    o.shop = o.shop && typeof o.shop === 'object' ? o.shop : {}; Object.entries(i.shop || {}).forEach(([w, x]) => { if (x && (!o.shop[w] || (x.u || 0) > (o.shop[w].u || 0))) o.shop[w] = x; });
    o.lifts = Object.assign({}, i.lifts || {}, o.lifts || {});
    if (i.supps && (!o.supps || (i.supps.u || 0) > (o.supps.u || 0))) o.supps = i.supps;
    o.eatUse = o.eatUse && typeof o.eatUse === 'object' ? o.eatUse : {}; Object.entries(i.eatUse || {}).forEach(([k, x]) => { const y = o.eatUse[k]; if (x && (!y || (x.t || 0) > (y.t || 0))) o.eatUse[k] = x; });
    if (i.stock && (!o.stock || (i.stockU || 0) > (o.stockU || 0))){ o.stock = i.stock; o.stockU = i.stockU; }
    return {added, updated};
  },
  state: S, act, allLines, LN,
  // BLD 857: the honest estimate, for tests and for setting each session's minutes: seconds for a session id, phase '1' to '3', light week.
  planSecs: (id, ph, light) => { const ses = (WK().sessions || {})[id]; return ses ? Math.round(sessSecs(ses, String(ph || '1'), !!light)) : 0; }
};
})();
