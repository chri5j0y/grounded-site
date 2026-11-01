// =====================================================================
// GROUNDED FIELD GUIDE (TM): Tending, formerly My Health (GWG BLD 840; rebuilt as a tool in BLD 841; Tending in BLD 862).
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
//
// BLD 866, public Tending: the same engine runs for everyone on any page when the library passed through C.fld() is
// window.GGTendPublic (shared/tending-public.js, public: true). Every public change sits behind PUB(); the Field Guide
// (tiers guide, staff, founder, kitchen) works exactly as before. The host contract for a public page:
//   <script src="/shared/tending-public.js"></script> <script src="/shared/gg-tend-plan.js"></script>
//   <script src="/field-guide/moves.js"></script> <script src="/field-guide/stage.js"></script>
//   <script src="/field-guide/coach.js"></script> <script src="/field-guide/health.js"></script>
//   GGHealth.init({data: () => wrapper, fld: () => window.GGTendPublic, fdr: () => null, tier: () => 'public',
//     save: () => { GGP.save(id); }, render: () => { box.innerHTML = GGHealth.view(); }, go: () => {}, toast: m => ...,
//     age: () => GGP.active().age (optional: 'pine' marks a teen), name: () => first name (optional),
//     asset: path => '/' + path (optional; default: the site root worked out from this script's own address)})
//   where wrapper is the profile vault object GGP.data(id, 'tending'), holding {health: {...}, deleted: {health: {}}}.
//   GGHealth.view() returns the HTML for the container the host gives; GGHealth.open(sec) works when C.go is a no-op;
//   GGHealth.summary() returns what the Home shows (see the API at the end of this file).
// Public adds to DATA.health: set {pubDone, who, teen, goals, needs, allergies, house: {adults, kids: [{id, name, band, sex}]},
//   check {qid: true}, checkYes, cleared, level, place, mins, days, weightLb, sex, goalLdl, ldlPick {leverId: 'do' or 'pass'}},
//   plan {seed, ids: {A..D: [dinner ids Mon to Sun]}, meals: {breakfasts, lunches, snacks}, sig, n, u},
//   team {list: [{id, ...fields, u}], u}, kids {log: {kidId: {date: {g: {group: amount}, eat: [{k, q}], rainbow: {}, play: {}, u}}}, u}.
// =====================================================================
(function(){
'use strict';
let C = {};
const S = {sec: 'today', form: null, setup: false, open: {}, ov: null};
const D = () => C.data ? C.data() : null;
// A Family Kitchen code (BLD 846): the kitchen only. Dinners, cook guide, grab and go, snacks, lists, prep, reminders.
const KIT = () => !!(C.tier && C.tier() === 'kitchen');
const FLDH = () => { const f = C.fld && C.fld(); if (f && f.public) return f; const h = f && f.healthJourney; return h && (Array.isArray(h.food) || Array.isArray(h.fitness) || h.app) ? h : null; };
// BLD 866: public Tending (the library is GGTendPublic). TEEN: a profile under 18 sees no weight and no calories.
const PUB = () => { const f = C.fld && C.fld(); return !!(f && f.public); };
const PLIB = () => { const f = C.fld && C.fld(); return f && f.public ? f : null; };
const TEEN = () => { if (!PUB()) return false; try { if (C.age && /^(pine|teen|aspen|maple)$/i.test(String(C.age() || ''))) return true; } catch(e){} const d = D(); return !!(d && d.health && d.health.set && d.health.set.teen); };
// The painted cards (shared/heroes/way/): a host may pass C.asset(path); otherwise the site root is worked out from this script's address.
const ROOT0 = (() => { try { const s = document.currentScript && document.currentScript.src; return s ? new URL('../', s).href : '/'; } catch(e){ return '/'; } })();
const asset = p => { try { if (C.asset) return C.asset(p); } catch(e){} return ROOT0 + p; };
// BLD 855: each founder has a plan of their own: FDR.healthMine (Chris) and FDR.healthKayti (Kayti), same shape.
const PLANS = () => { const f = C.fdr && C.fdr(); return f ? [f.healthMine, f.healthKayti].filter(m => m && typeof m === 'object') : []; };
const MINE = () => { const ps = PLANS(); if (!ps.length) return null;
  // BLD 842: the Founder library is shared by both founders, so a named plan shows only on its owner's phone.
  const d = D(), who = d && d.health && d.health.set && d.health.set.who; return ps.find(m => m.who && who === m.who) || ps.find(m => !m.who) || null; };
const MINE_ANY = () => PLANS()[0] || null;
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
// BLD 881: C.changed (optional) tells the host something was saved, so The Grounded Way can refresh Today behind a sheet.
const save = () => { if (C.save) C.save(); if (C.changed){ try { C.changed(); } catch(e){} } };
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
  h.labs = arr(h.labs); h.marks = arr(h.marks); h.risk = arr(h.risk); h.notes = arr(h.notes); h.panels = arr(h.panels); h.myFoods = arr(h.myFoods);
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
    <div class="hj-hin"><div class="hj-eb">Grow With Grounded</div><h2>${esc((lib && lib.title) || 'Tending')}</h2><p>${esc((lib && lib.tagline) || 'Whole food, steady strength, and a strong heart, one week at a time.')}</p></div></div>`;
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
  const scale = key === 'food' && hh && hh !== 6 && !PUB() ? `<p class="hj-note">Costs and amounts are for a household of six. For ${hh}, multiply by about ${(hh / 6).toFixed(2).replace(/0$/, '')}. The Weekly Batch sizes its own steps for ${hh}.</p>` : '';
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
const APP = () => { if (PUB()) return pubApp(); const l = FLDH(); return l && l.app && typeof l.app === 'object' ? l.app : null; };
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
// ---------- BLD 892: the 12-week program (Chris, October 29, 2026: phases Foundation, Build, Peak; tracks Strength, Cardio, Mixed) ----------
// The program clock counts from the plan start (set.start), or from set.progStart once a person switches track or starts again.
// Weeks 1 to 4 Foundation, 5 to 8 Build, 9 to 12 Peak; after week 12 Peak stays until the person taps Start Again (never forced).
// set.track: 'strength' (or unset), 'cardio', 'mixed' (set.cardioDays 1 or 2), and the older 'practice' (Flow only) and 'both'
// (Strength plus Flow), still read as before; set.flow adds Flow to the days. A library with no program keeps today's plan exactly.
const PH_IDS = ['foundation', 'build', 'peak'], PH_NAME = {foundation: 'Foundation', build: 'Build', peak: 'Peak'};
const PROG = () => { if (PUB()){ const L = PLIB(); return L && L.program && L.program.tracks && L.program.tracks.strength ? L.program : null; } const p = WK().program; return p && p.tracks && p.tracks.strength ? p : null; };
const progOn = () => !!PROG() && !(PUB() && (H().set.level || 'root') === 'gentle');
const progStart = () => parseD(H().set.progStart) || startMon();
const progWeek = d => Math.floor((day0(d || new Date()) - progStart()) / (7 * DAYMS)) + 1;
const phaseId = w => { w = Math.max(1, w); return w <= 4 ? 'foundation' : w <= 8 ? 'build' : 'peak'; };
const phName = id => ((arr((PROG() || {}).phases).find(p => p.id === id) || {}).name) || PH_NAME[id] || '';
const progTrack = () => { const t = H().set.track; return t === 'cardio' || t === 'mixed' ? t : 'strength'; };
const workOn = () => H().set.track !== 'practice';
const flowDaily = () => { const t = H().set.track; return t === 'practice' || t === 'both' || !!H().set.flow; };
const hasCardio = () => { const p = PROG(); return !!(p && p.tracks.cardio && PH_IDS.some(ph => p.tracks.cardio[ph])); };
// "Week 6 of 12 · Build"; after week 12, "12 Weeks Complete · Peak".
function progLabel(d){ if (!progOn()) return ''; const w = progWeek(d); if (w < 1) return ''; return (w <= 12 ? 'Week ' + w + ' of 12' : '12 Weeks Complete') + ' · ' + phName(phaseId(w)); }
// The sets and reps key: the phase (1, 2, 3) with the program; the old rotation without it.
const phNum = d => progOn() ? String(1 + PH_IDS.indexOf(phaseId(progWeek(d)))) : String(phaseOf(weekNo(d)));
const lightOn = d => progOn() ? lightWk(Math.max(1, progWeek(d))) : lightWk(Math.max(1, weekNo(d)));
// BLD 896 (Every Workout): a program workout plays with its own phase's sets and reps (a Build workout in week 1 plays as Build);
// the lighter week applies only to the phase the person is in. Any other workout keeps today's key.
const sesPh = id => { id = String(id || ''); if (!PROG() || !/^([A-L]|R\d+)$/.test(id)) return ''; return PH_IDS.find(ph => trackIds('strength', ph).includes(id) || trackIds('cardio', ph).includes(id)) || idPhase(id); };
function phKeyFor(id, d){ const own = sesPh(id); if (!own || !PROG()) return {ph: phNum(d), light: lightOn(d)};
  const cur = phaseId(Math.max(1, progWeek(d))); return {ph: String(1 + PH_IDS.indexOf(own)), light: own === cur && progOn() ? lightOn(d) : false}; }
// Session ids by phase: Strength A to D, E to H, I to L; Cardio R1 to R12 (the same ids in public Tending and the Guide library).
const STR_IDS = {foundation: ['A', 'B', 'C', 'D'], build: ['E', 'F', 'G', 'H'], peak: ['I', 'J', 'K', 'L']};
const CAR_IDS = {foundation: ['R1', 'R2', 'R3', 'R4'], build: ['R5', 'R6', 'R7', 'R8'], peak: ['R9', 'R10', 'R11', 'R12']};
function trackIds(tr, ph){ const p = PROG(); if (!p) return []; if (PUB()) return tr === 'cardio' ? (hasCardio() && p.tracks.cardio[ph] ? CAR_IDS[ph] : []) : STR_IDS[ph];
  const t = (p.tracks[tr] || {})[ph]; return Array.isArray(t) ? t : t && typeof t === 'object' ? Object.values(t) : []; }
const idPhase = id => PH_IDS.find(ph => STR_IDS[ph].includes(id) || CAR_IDS[ph].includes(id)) || 'foundation';
// A Mixed week: the cardio days among the workout days, spread through the week, with at least one strength day.
function cardioSlots(n, c){ c = Math.max(1, Math.min(n > 1 ? n - 1 : 1, Math.floor(+c || 1))); const out = [];
  for (let j = 0; j < c; j++){ let k = Math.min(n - 1, Math.floor((j + 0.5) * n / c)); while (out.includes(k) && k < n - 1) k++; if (!out.includes(k)) out.push(k); } return out; }
// The workout for position k of the n workout days in program week w.
function progKey(w, k, n){
  const ph = phaseId(w), tr = progTrack(), S1 = trackIds('strength', ph), C1 = trackIds('cardio', ph), wi = Math.max(1, w) - 1;
  if (tr === 'cardio' && C1.length) return C1[(wi * n + k) % C1.length];
  if (tr === 'mixed' && C1.length){ const cs = cardioSlots(n, H().set.cardioDays), j = cs.indexOf(k);
    if (j >= 0) return C1[(wi * cs.length + j) % C1.length];
    const sn = n - cs.length, sk = k - cs.filter(x => x < k).length; return S1.length ? S1[(wi * sn + sk) % S1.length] : null; }
  return S1.length ? S1[(wi * n + k) % S1.length] : null;
}
// The Guide library week (Monday A, Tuesday D, Wednesday C, Thursday D, Friday B): Strength keeps each day's letter in the phase;
// Cardio takes the five days in turn; Mixed makes Thursday (and Tuesday, for two) a cardio day.
function guideKey(d){
  const L0 = WMAP[d.getDay()]; if (!L0) return null; const w = Math.max(1, progWeek(d)), ph = phaseId(w), tr = progTrack(), S1 = trackIds('strength', ph), C1 = trackIds('cardio', ph);
  const pos = d.getDay() - 1, wi = w - 1;
  if (tr === 'cardio' && C1.length) return C1[(wi * 5 + pos) % C1.length];
  if (tr === 'mixed' && C1.length){ const cs = +H().set.cardioDays === 2 ? [1, 3] : [3], j = cs.indexOf(pos); if (j >= 0) return C1[(wi * cs.length + j) % C1.length]; }
  return S1['ABCD'.indexOf(L0)] || L0;
}
// What's new in your plan (Chris: "i am currently on this plan and was not expecting changes"): shown once per device, the first time
// the plan opens after the library's whatsNew version changes; a new plan starts with it seen.
const NEW_KEY = 'gg-health-new';
const newSeen = () => { try { return localStorage.getItem(NEW_KEY) || ''; } catch(e){ return ''; } };
const markNew = () => { const x = newestNew(); if (!x) return; try { localStorage.setItem(NEW_KEY, x.v); } catch(e){} };
function newestNew(){ const p = PROG(), L = arr(p && p.whatsNew); return L.length ? L[L.length - 1] : null; }
function whatsNew(){ const x = newestNew(); if (!x || !x.v || newSeen() === x.v || setupNeeded()) return null; return x; }
function newCard(){ const x = whatsNew(); if (!x) return ''; const pl = progLabel(new Date());
  return `<div class="tn-card a-move tn-new" id="tn-new"><div class="tn-hd">${badge('star', 'a-move')}<div style="min-width:0;flex:1"><div class="tn-k a-move">${esc(x.title || 'What\'s New in Your Plan')}</div>${pl ? `<div class="tn-sub">You are in ${esc(pl)}.</div>` : ''}</div></div>
    <ul class="tn-newl">${arr(x.lines).map(l => `<li>${esc(l)}</li>`).join('')}</ul><div class="tn-acts"><button type="button" class="tn-btn sm" data-hja="newok">${ic('check')}Got It</button></div></div>`; }
// After week 12: start again one level up (Root, Rise, Thrive; Thrive starts again at Thrive), or keep going at this level.
function againCard(){ if (!progOn() || progWeek(new Date()) <= 12) return ''; const lv = H().set.level || 'root', up = PUB() ? {root: 'rise', rise: 'thrive'}[lv] : null;
  return `<div class="tn-card a-move tn-again"><div class="tn-k a-move">12 Weeks Complete</div><h3>Strong work. Ready for the next round?</h3><p class="tn-sub">Start again at Week 1${up ? ' one level up, at ' + esc(LVL_NAME[up]) : ''}, or keep going at this level. Your Peak workouts stay with you until you choose.</p>
    <div class="tn-acts">${PUB() ? `<button type="button" class="tn-btn sm" data-hja="progup">${ic('sprout')}Start Again One Level Up</button>` : ''}<button type="button" class="tn-btn sm${PUB() ? ' line' : ''}" data-hja="progkeep">${ic('play')}Keep Going at This Level</button></div></div>`; }
const LVL_NAME = {root: 'Root', rise: 'Rise', thrive: 'Thrive', gentle: 'Gentle'};
// "Build 2" or "Cardio · Build 2": a program workout's place, small above its name.
function sesKick(id){ for (const ph of PH_IDS) for (const tr of ['strength', 'cardio']){ const i = trackIds(tr, ph).indexOf(id); if (i >= 0) return (tr === 'cardio' ? 'Cardio · ' : '') + phName(ph) + ' ' + (i + 1); } return 'Session ' + id; }
// Flow: the shelf by style (Flow, Yoga, Balance, Stretch; BLD 894 names), each tile with its minutes and, small, "Draws on tai chi" on Balance.
const FLOW_STYLES = [{id: 'daily', name: 'Flow'}, {id: 'yoga', name: 'Yoga'}, {id: 'taichi', name: 'Balance'}, {id: 'stretch', name: 'Stretch'}];
const flowKick = x => (x.mins ? x.mins + ' min' : 'Flow') + (x.from ? ' · ' + x.from : '');
function flowShelf(pr, card){
  if (!arr(pr).length) return ''; const st = arr((PR() || {}).styles).length ? PR().styles : FLOW_STYLES;
  const groups = st.map(s => [s, pr.filter(x => (x.style || 'daily') === s.id)]).filter(g => g[1].length), seen = new Set(groups.flatMap(g => g[1]));
  const rest = pr.filter(x => !seen.has(x)); if (rest.length) groups.push([{id: 'more', name: 'More Flow'}, rest]);
  if (groups.length <= 1) return `<h3 class="tn-h3">Flow</h3><div class="tn-kgrid">${pr.map(card).join('')}</div>`;
  return `<h3 class="tn-h3">Flow</h3>` + groups.map(([s, L]) => `<p class="tn-fst"><b>${esc(s.name)}</b>${s.line ? ' ' + esc(s.line) : ''}</p><div class="tn-kgrid">${L.map(card).join('')}</div>`).join('');
}
// My training (the Field Guide's My Goals). BLD 894 (Chris, October 29, 2026: "i want these 6 categories exactly"): Strength,
// Cardio, Flow, Yoga, Balance, Stretch, any mix; Strength and Cardio together work as Mixed, with 1 or 2 cardio days.
function trackChips(s){
  const chip = (act, v, l, on) => `<button type="button" class="chip${on ? ' on' : ''}" aria-pressed="${on}" data-hja="${act}" data-hjv="${v}">${esc(l)}</button>`;
  const mv = movesOf(s);
  return `<div class="hj-chips" role="group" aria-label="My movement">${moveChips(mv, 'mvset')}</div>
    ${mv.includes('strength') && mv.includes('cardio') ? `<div class="hj-chips">${[1, 2].map(n => chip('cardiodays', n, n + (n === 1 ? ' Cardio Day' : ' Cardio Days'), (+s.cardioDays || 1) === n)).join('')}</div>` : ''}
    <p class="hj-sub">${esc(movesLine(mv))} Switch anytime; a new Strength or Cardio choice starts at Week 1.</p>`;
}
// ---------- BLD 894: six movement categories (Chris, October 29, 2026: "i want these 6 categories exactly.. not the 3") ----------
// set.moves lists the chosen categories, any mix: strength, cardio (the 12-week program; both together work as Mixed, with
// set.cardioDays 1 or 2), flow (the daily sessions p1 to p7), yoga (f1 to f6), balance (tai chi-style, f7 to f10), stretch (f11 to f14).
// set.track and set.flowStyles are kept in step, so everything downstream reads them as before: strength, cardio, mixed, or
// 'practice' when no Strength or Cardio is chosen (then the Flow-type categories fill the days a week). Workout days hold
// Strength or Cardio; the other days, Monday to Saturday, take the chosen Flow-type categories in turn. With no set.moves,
// movesOf reads the old track and Flow setting, and nothing about the day changes.
const MOVE_IDS = ['strength', 'cardio', 'flow', 'yoga', 'balance', 'stretch'];
const MOVE_NAME = {strength: 'Strength', cardio: 'Cardio', flow: 'Flow', yoga: 'Yoga', balance: 'Balance', stretch: 'Stretch'};
const MOVE_STYLE = {flow: 'daily', yoga: 'yoga', balance: 'taichi', stretch: 'stretch'};
const MOVE_LINE = {strength: 'Strength: workouts with a coach, with core, balance, and agility in every one.', cardio: 'Cardio: low impact intervals and steady work, with light strength.',
  flow: 'Flow: movement, breath, and quiet focus, a different one each day.', yoga: 'Yoga: slow, flowing moves for strength, balance, and an easy back.',
  balance: 'Balance: soft, slow steps for steady balance, one a week for four weeks.', stretch: 'Stretch: easy movement, then short, steady holds.'};
function movesOf(s){
  s = s || {};
  if (Array.isArray(s.moves) && s.moves.length) return MOVE_IDS.filter(x => s.moves.includes(x));
  const t = s.track, out = [];
  if (t === 'mixed') out.push('strength', 'cardio'); else if (t === 'cardio') out.push('cardio'); else if (t !== 'practice') out.push('strength');
  (Array.isArray(s.flowStyles) ? s.flowStyles : (s.flow || t === 'both' || t === 'practice') ? ['daily'] : []).forEach(st => { const m = Object.keys(MOVE_STYLE).find(k => MOVE_STYLE[k] === st); if (m) out.push(m); });
  return MOVE_IDS.filter(x => out.includes(x));
}
function setMoves(s, moves){
  const m = MOVE_IDS.filter(x => arr(moves).includes(x)); if (!m.length) return false;
  const st = m.includes('strength'), ca = m.includes('cardio');
  s.moves = m; s.track = st && ca ? 'mixed' : ca ? 'cardio' : st ? 'strength' : 'practice';
  s.flowStyles = m.filter(x => MOVE_STYLE[x]).map(x => MOVE_STYLE[x]); s.flow = s.flowStyles.length > 0;
  if (s.flow) s.flowDays = 'other'; else delete s.flowDays;
  return true;
}
const movesLine = mv => mv.map(x => MOVE_LINE[x]).join(' ');
function moveChips(on, act){ return MOVE_IDS.filter(x => (x !== 'cardio' || hasCardio()) && (!MOVE_STYLE[x] || !arr((PR() || {}).sessions).length || arr((PR() || {}).sessions).some(y => (y.style || 'daily') === MOVE_STYLE[x])))
  .map(x => `<button type="button" class="chip${on.includes(x) ? ' on' : ''}" aria-pressed="${on.includes(x)}" data-hja="${act}" data-hjv="${x}">${esc(MOVE_NAME[x])}</button>`).join(''); }
const moveToggle = (cur, id) => { const L = cur.slice(), i = L.indexOf(id); if (i >= 0) L.splice(i, 1); else if (MOVE_IDS.includes(id)) L.push(id); return MOVE_IDS.filter(x => L.includes(x)); };
// The program card in the Field Guide's Move: where you are, this phase, and the track.
function progCard(){ if (!progOn()) return ''; const w = Math.max(1, progWeek(new Date())), ph = phaseId(w), p = arr(PROG().phases).find(x => x.id === ph) || {};
  return `${newCard()}${againCard()}<div class="tn-card a-move tn-path"><div class="tn-k">My Program</div><h3>${esc(progLabel(new Date()) || 'Week 1 of 12 · Foundation')}</h3><p class="tn-sub">${esc((PROG().tracks[progTrack()] || {}).name || {strength: 'Strength', cardio: 'Cardio', mixed: 'Mixed'}[progTrack()])}${progTrack() === 'mixed' ? ', ' + (+H().set.cardioDays || 1) + ' cardio ' + ((+H().set.cardioDays || 1) === 1 ? 'day' : 'days') : ''}. ${esc(p.note || '')}</p>
    <div class="tn-acts"><button type="button" class="tn-btn sm line" data-hja="setup">${ic('gear')}Change My Track</button></div></div>`; }
const medMins = n => { const m = WK().meditation || {}, a = +m.start || 10, b = +m.end || 20, k = +m.buildWeeks || 8; return Math.max(a, Math.min(b, Math.round(a + (Math.max(1, n) - 1) * (b - a) / Math.max(1, k - 1)))); };
const shortDate = d => d.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric'});
const logOf = d => { const h = H(), k = ymd(d); return h.log[k] = h.log[k] || {}; };
const isDone = (d, key) => !!(H().log[ymd(d)] || {})[key];
function markDone(key, d){ const l = logOf(d || new Date()); l[key] = Date.now(); l.u = Date.now(); save(); }
// Sunday dinner belongs to the coming food week: it is cooked on Sunday prep day, the day after shopping (BLD 846).
function dinnerFor(d){ const n = d.getDay() === 0 ? foodWeek(d) : weekNo(d), app = APP(); if (n < 1 || !app || !app.dinners) return null; const w = (app.dinners.weeks || {})[letter(n)]; if (!w) return null; const x = arr(w.dinners).find(z => z.day === DOW[d.getDay()]); return x ? Object.assign({wk: letter(n)}, x) : null; }
function sesFor(d){ const s = PUB() ? pubSesKey(d) : progOn() ? guideKey(d) : WMAP[d.getDay()], ss = sesById(s); return ss ? Object.assign({id: s}, ss) : null; }
// BLD 892: a session by id, from this phase's sessions or, in public Tending, built for the phase it belongs to (a later week in Week).
function sesById(id){ if (!id) return null; const ss = (WK().sessions || {})[id]; if (ss) return ss; return PUB() && progOn() ? pubPhaseSes(idPhase(id))[id] || null : null; }
// "Build 2: Legs and Balance": a program workout's phase and place in its track, then its name.
function sesLabel(id, x){ x = x || sesById(id) || {}; const t = x.title || 'Session ' + id; if (!progOn()) return t;
  for (const ph of PH_IDS) for (const tr of ['strength', 'cardio']){ const i = trackIds(tr, ph).indexOf(id); if (i >= 0) return phName(ph) + ' ' + (i + 1) + ': ' + t; } return t; }
// This phase's workouts, the person's own track first (Play Any, Move, and the Workouts shelf).
function phaseSes(){ const all = WK().sessions || {}; if (!progOn()) return Object.entries(all); const ph = phaseId(Math.max(1, progWeek(new Date()))), tr = progTrack();
  const ids = (tr === 'cardio' ? ['cardio', 'strength'] : ['strength', 'cardio']).flatMap(t => trackIds(t, ph)); return ids.map(id => [id, sesById(id)]).filter(x => x[1]); }
const BAT = () => (APP() || {}).batches || null;
function prepFor(kind, n){ if (kind === 'pack') return (BAT() || {}).pack || null; if (kind.indexOf('bulk-') === 0){ const b = arr((BAT() || {}).batches).find(x => x.id === kind.slice(5)); return b ? Object.assign({title: b.name}, b) : null; }
  return prepFor0(kind, n); }
function prepFor0(kind, n){ const sp = (APP() || {}).shop || {}, w = (sp.weeks || {})[letter(n)]; return w && w[kind] ? w[kind] : null; }
// ---------- BLD 889: the Weekly Batch (Chris, October 28, 2026: "we dont have room for a month.. i think weekly is good for most things") ----------
// Every Sunday, right after Sunday Together Prep: burritos and homemade sausage, plus the week's rotating item. Written for six
// (serves: 6); each step lists the amounts it names (sc), and those scale to the household with shared/gg-scale.js. At six the text
// is the recorded line; other sizes read the scaled text with the device voice.
const batchFor = () => { const hh = PUB() ? tableOf() : num((H() || {set: {}}).set.household); return hh > 0 && hh < 30 ? Math.round(hh) : 6; };
const batchSub = b => (b.mins ? 'About ' + b.mins + ' minutes, ' : '') + 'Cook and Helper, side by side' + (b.serves && batchFor() !== +b.serves ? ', sized for ' + batchFor() : '') + '.';
const wbNote = w => w && w.batch ? `<p class="hj-note"><b>Weekly Batch:</b> ${esc(String(w.batch).replace(/^(Freezer batch|Weekly Batch):\s*/i, ''))}${batchFor() !== 6 ? ' The guide sizes it for ' + batchFor() + '.' : ''}</p>` : '';
const CNT = /^(\d+)(\s+)(paper liners|muffin cups|energy bites|burritos|muffins|patties|pancakes|bites|liners)\b/i, ONE = {burritos: 'burrito', muffins: 'muffin', patties: 'patty', pancakes: 'pancake', bites: 'bite', 'energy bites': 'energy bite', liners: 'liner', 'paper liners': 'paper liner', 'muffin cups': 'muffin cup'};
function scAmt(q, f){ const m = CNT.exec(q); if (m){ const v = Math.max(1, Math.round(+m[1] * f)); return v + m[2] + (v === 1 ? ONE[m[3].toLowerCase()] || m[3] : m[3]) + q.slice(m[0].length); }
  return window.GGScale ? GGScale.line(q, f) : q; }
// Replace each listed amount where it stands on its own (so "1/2 tsp salt" never matches inside "1 1/2 tsp salt").
function scText(t, sc, f){ let out = String(t || ''); const done = []; arr(sc).slice().sort((a, b) => b.length - a.length).forEach(q => { let i = 0, k;
    while ((k = out.indexOf(q, i)) >= 0){ const pre = out.slice(Math.max(0, k - 2), k); if (/\d\s$|[\d\/]$/.test(pre) || done.some(([a, b]) => k < b && k + q.length > a)){ i = k + 1; continue; }
      const r = scAmt(q, f); out = out.slice(0, k) + r + out.slice(k + q.length); done.forEach(x => { if (x[0] > k){ x[0] += r.length - q.length; x[1] += r.length - q.length; } }); done.push([k, k + r.length]); i = k + r.length; } }); return out; }
function sizeBatch(p, N){ const f = N / (+p.serves || 6); if (Math.abs(f - 1) < 1e-9) return p;
  return Object.assign({}, p, {forN: N, steps: arr(p.steps).map(s => { const t = typeof s === 'string' ? {t: s} : s; return arr(t.sc).length ? Object.assign({}, t, {t: scText(t.t, t.sc, f)}) : t; }),
    ingredients: arr(p.ingredients).map(l => window.GGScale && typeof l === 'string' ? GGScale.line(l, f) : l), yields: arr(p.yields).map(y => scText(y, p.ysc, f))}); }
function servesRow(o){ const N = o.base.N; return `<div class="hj-serves" role="group" aria-label="Make it for"><span>Make it for <b data-hjserves>${N}</b> ${N === 1 ? 'person' : 'people'}</span><button type="button" class="chip" data-hja="bserve" data-hjv="-1" aria-label="One fewer"${N <= 1 ? ' disabled' : ''}>&minus;</button><button type="button" class="chip" data-hja="bserve" data-hjv="1" aria-label="One more"${N >= 12 ? ' disabled' : ''}>+</button></div>${o.data.keeps ? `<p class="hj-sub"><b>Keeps:</b> ${esc(o.data.keeps)}</p>` : ''}`; }
// BLD 893, My Grounded Way Plan: set.medFreq ('daily', 'few' for Tuesday, Thursday, and Saturday, 'weekly' for Sunday, 'later')
// and set.medTime ('morning', 'afternoon', 'evening') place the meditation; unset keeps it every day as before. set.flowDays 'other'
// keeps Flow to the days without a workout, Monday to Saturday (the plan's Flow, Yoga, Balance, and Stretch); unset keeps Flow every day.
const MED_FEW = [2, 4, 6];
function medOn(d){ const f = H().set.medFreq, w = d.getDay(); return !f || f === 'daily' ? true : f === 'few' ? MED_FEW.includes(w) : f === 'weekly' ? w === 0 : false; }
function medAt(){ const t = H().set.medTime; return t === 'afternoon' ? {hour: 15, kick: 'This afternoon'} : t === 'evening' ? {hour: 20.5, kick: 'This evening'} : t === 'morning' ? {hour: 8, kick: 'Morning'} : {}; }
// BLD 894: with no Strength or Cardio chosen, public Tending's Flow, Yoga, Balance, and Stretch fill the chosen days a week (the Guide plan keeps Monday to Saturday).
const flowRest = (d, hasWork) => { const s = H().set; if (PUB() && s.track === 'practice' && Array.isArray(s.moves) && s.moves.length) return !pubDays().includes(d.getDay()); return s.flowDays === 'other' && (!!hasWork || d.getDay() === 0); };
function agenda(d){
  const out = [], dow = d.getDay(), n = weekNo(d), fw = foodWeek(d), ses = n >= 1 || dow !== 0 ? sesFor(d) : null;
  const track = H().set.track || 'strength', pr = practiceFor(d);
  if (flowDaily() && pr && !flowRest(d, ses && n >= 1)) out.push({key: 'prac', k: 'prac', hour: 14.5, kick: 'After work', title: pr.title || 'Flow', sub: (pr.mins ? pr.mins + ' minutes. ' : '') + (pr.focus || ''), btn: 'Start Flow', did: true});
  if (workOn() && ses && n >= 1) out.push({did: true, key: 'work:' + ses.id, k: 'work', v: ses.id, hour: 6.5, kick: 'Morning', title: ses.title || ('Session ' + ses.id), sub: (ses.mins ? ses.mins + ' minutes. ' : '') + (lightOn(d) ? 'A lighter week: ease off a little.' : (ses.lead || '')), btn: 'Start Workout'});
  // Meditation for every track (Chris, October 24, 2026: "and off the meditations to her as well"): the Flow track gets it in the evening.
  if (track === 'practice' && MED() && medOn(d)){ const m1 = medFor(d); out.push({did: true, key: 'med', k: 'med', hour: 20.5, kick: 'This evening', title: 'Meditation', sub: (m1 && m1.title ? m1.title + '. ' : '') + medMins(n) + ' minutes with a candle and calm music.', btn: 'Start'}); }
  // Seven days a week (Chris, October 24, 2026: "make them 7 days a week"); weekday mornings after the shower, weekend mornings too.
  const mf = medFor(d);
  if (track !== 'practice' && MED() && medOn(d)) out.push({did: true, key: 'med', k: 'med', hour: medAt().hour || 8, kick: medAt().kick || (dow >= 1 && dow <= 5 ? 'After the shower' : 'Morning'), title: 'Meditation', sub: (mf && mf.title ? mf.title + '. ' : '') + medMins(n) + ' minutes of stillness.', btn: 'Start'});
  if (dow === 6){ const L = shopList(fw), left = L ? L.items.filter(x => !x.done).length : 0; out.push({key: 'shop:' + fw, k: 'shop', v: fw, hour: 9, kick: 'Shopping day', title: 'Shop for Week ' + letter(fw), sub: left ? left + ' items on the list.' : 'Everything is in the cart.', btn: 'Open the List'}); }
  if (dow === 6 && !KIT() && !PUB()) out.push({key: 'out', k: 'mark', hour: 11, kick: 'Together', title: 'Family hike or the Y', sub: 'Outside when the weather is good, the Y when it is wild.', btn: 'We Did It'});
  if (dow === 0){ const p = prepFor('sunday', fw); if (p) out.push({key: 'prep:sunday:' + fw, k: 'prep', v: 'sunday|' + fw, hour: 13, kick: 'Sunday prep', title: 'Prep for Week ' + letter(fw), sub: (p.mins || 90) + ' minutes, step by step with timers.', btn: 'Start Prep'});
    const pk = prepFor('pack', fw); if (pk) out.push({key: 'prep:pack:' + fw, k: 'prep', v: 'pack|' + fw, hour: 18, kick: 'Sunday evening', title: pk.title || 'Pack Lunches', sub: (pk.mins || 20) + ' minutes for the week ahead.', btn: 'Start'});
    // BLD 889: the Weekly Batch every Sunday, right after Sunday Together Prep (the key stays prep:batch:<week>, so old saved days still read).
    const b = prepFor('batch', fw); if (b) out.push({key: 'prep:batch:' + fw, k: 'prep', v: 'batch|' + fw, hour: 14, kick: 'After Sunday prep', title: b.title || 'Weekly Batch', sub: batchSub(b), btn: 'Start'}); }
  if (dow === 3 && n >= 1){ const p = prepFor('wednesday', n); if (p) out.push({key: 'prep:wednesday:' + n, k: 'prep', v: 'wednesday|' + n, hour: 16, kick: 'Midweek', title: 'Wednesday Mini Prep', sub: (p.mins || 20) + ' minutes.', btn: 'Start Prep'}); }
  if ((dow === 2 || dow === 4) && !KIT() && !PUB()){ const ev = arr(WK().evenings), e = ev.find(x => (dow === 2 ? /zone 2/i : /^interval/i).test(x.title || '')) || (ev.length ? ev[(Math.max(1, n) * 2 + dow) % ev.length] : null); out.push({key: 'y', k: 'mark', hour: 18.5, kick: 'Evening', title: 'The Y together', sub: (e ? e.title + (e.how ? ': ' + e.how : '') : 'Swim, sauna, or a class, together.') + (MINE() && MINE().yNote ? ' ' + MINE().yNote : ''), btn: 'We Did It'}); }
  const dn = mmDinner(d); if (dn) out.push({key: 'cook:' + dn.wk + ':' + dn.id, k: 'cook', v: dn.wk + '|' + dn.id, hour: 17, kick: 'Tonight', title: dn.name, sub: (dn.mins ? dn.mins + ' minutes' : '') + (nOk(dn.nut) ? ', ' + (nOk(dn.nutHeart) && !KIT() ? nSf(dn.nutHeart) + ' on the heart-health plate' : nSf(dn.nut) + ' a serving') : '') + (dn.prepped ? '. ' + dn.prepped : ''), btn: 'Cook It'});
  holAgenda(d).forEach(x => out.push(x)); // BLD 896: a set up holiday's shopping day and prep days
  mmAgenda(d).forEach(x => out.push(x)); // BLD 900: My Menu, each added meal on its day (a swapped dinner steps aside above)
  return out.sort((a, b) => a.hour - b.hour);
}
// ---------- BLD 846: Keep It Rolling. Reminders from the plan: thaw, freeze, shop, prep, grab and go, freezer stock ----------
// They show inside Tending (everything stays on this device). Add to My Phone Calendar hands the steady ones to the
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
  <p class="hj-sub">Every number in Tending is an estimate per serving. Sources: American Heart Association, Saturated Fat and Added Sugars; Dietary Guidelines for Americans, 2020 to 2025; National Academies, Dietary Reference Intakes (fiber).</p></div></details>`; }
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
  if (dow === 2 && n >= 1){ const p = prepFor('wednesday', n); if (p) push('wedprep:' + n, 20, 'Tonight', 'Tomorrow after work: Wednesday mini prep (about ' + (p.mins || 20) + ' min)', 'A short prep for Thursday and Friday dinners, guided step by step.', 'prep:wednesday:' + n, 1, 'wedprep'); }
  if (dow >= 1 && dow <= 4 && (BAT() || {}).pack) push('gg:' + ymd(d), 20.5, 'Tonight', 'Tonight: pack tomorrow\'s lunches and snacks', 'Set out the lunch bags, put the ice packs in the freezer, and move tomorrow\'s frozen breakfast from the Weekly Batch (burritos, muffins, or pancakes) to the fridge.', '', 1, 'gg:' + dow);
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
      'RRULE:FREQ=WEEKLY;INTERVAL=' + r.rep + ';COUNT=' + (r.rep === 4 ? 7 : 26), 'SUMMARY:' + e('Tending: ' + r.title.replace(/^(Tonight|This morning|After shopping|Tomorrow after work): /, m => /Tomorrow/.test(m) ? m : '')), 'DESCRIPTION:' + e(r.sub), 'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + e(r.title), 'TRIGGER:PT0M', 'END:VALARM', 'END:VEVENT'].map(fold).join('\r\n')); }); }
  holIcs(st, e, fold).forEach(x => ev.push(x)); // BLD 896: set up holidays, once each
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Grow With Grounded//Tending//EN', 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:Tending'].concat(ev, ownIcs(st, e, fold), ['END:VCALENDAR']).join('\r\n') + '\r\n';
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
  ${before ? `<p class="hj-note">Your plan starts ${esc(DOWL[s0.getDay()])}, ${esc(shortDate(s0))}. This weekend: shop Saturday and prep Sunday, and you are ready.</p>` : `<p class="hj-wk">Week ${n}${KIT() ? '' : progOn() ? (progLabel(d) ? ' · ' + esc(progLabel(d)) + (lightOn(d) ? ' · a lighter week' : '') : '') : ' · Phase ' + phaseOf(n) + (lightWk(n) ? ' · a lighter week' : '')} · Food Week ${letter(n)}</p>`}
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
  const ses = phaseSes(), pr = arr((PR() || {}).sessions), md = arr((MED() || {}).sessions);
  const row = (key, t, sub) => `<li><button type="button" class="hj-pill move" data-hja="go" data-hjv="${esc(key)}"><b>${esc(t)}</b>${sub ? ` <small>${esc(sub)}</small>` : ''}</button></li>`;
  const block = (title, list) => list.length ? `<details class="hj-doc"><summary><span>${esc(title)}</span></summary><div class="hj-body"><ul class="hj-lib">${list.join('')}</ul></div></details>` : '';
  return block('Play Any Workout', ses.map(([id, x]) => row('work:' + id, sesLabel(id, x), (progOn() ? '' : x.day || '') + (x.mins ? (progOn() ? '' : ', ') + x.mins + ' min' : ''))))
    + block('Play Any Flow', pr.map(x => row('pracid:' + x.id, x.title, (x.mins ? x.mins + ' min. ' : '') + (x.from ? x.from + '. ' : '') + (x.focus || ''))))
    + block('Play Any Meditation', md.map(x => row('medid:' + x.id, x.title, (x.day || '') + (x.focus ? '. ' + x.focus : ''))));
}
function ideasBlk(t, list, key){ return arr(list).length ? `<details class="hj-doc"${S.open['id:' + key] ? ' open' : ''} data-hjd="id:${key}"><summary><span>${esc(t)}</span></summary><div class="hj-body"><ul class="hj-ideas">${arr(list).map((x, i) => `<li><b>${esc(x.name)}</b>${x.mins ? ` <small>${esc(x.mins)} min</small>` : ''}<br><span>${esc(x.how || '')}</span>${nOk(x.nut) ? `<span class="hj-gi hj-nl">${nLine(x.nut)}${x.nut.per ? ' (' + esc(x.nut.per) + ')' : ''}</span>` : ''}
    ${arr(x.shop).length ? `<span class="hj-gi">Buy: ${arr(x.shop).map(g => esc(g.name) + (g.amt ? ' (' + esc(g.amt) + ')' : '')).join(', ')}</span>` : ''}${x.from ? `<span class="hj-gi">From prep: ${esc(x.from)}</span>` : ''}${x.pack ? `<span class="hj-gi">Pack it: ${esc(x.pack)}</span>` : ''}${arr(x.steps).length ? `<button type="button" class="btn btn-line btn-sm hj-ideago" data-hja="idea" data-hjv="${key}|${i}">Guide Me</button>` : ''}
    ${arr(x.shop).length ? `<button type="button" class="btn btn-line btn-sm hj-ggadd" data-hja="ggadd" data-hjv="${key}|${i}">Add to Shopping List</button>` : ''}</li>`).join('')}</ul></div></details>` : ''; }
function vWeek(){
  if (S.wkView === 'month') return ownViewTabs('month') + vMonth();   // BLD 896: the Month beside the Week
  const d0 = new Date(), n0 = weekNo(d0), n = Math.max(1, n0 + (S.wkOff || 0)), mon = addD(startMon(), (n - 1) * 7), app = APP() || {}, din = app.dinners || {};
  const track = H().set.track || 'strength';
  const rows = [0, 1, 2, 3, 4, 5, 6].map(i => { const d = addD(mon, i), dn = mmDinner(d), ses = !workOn() ? null : sesFor(d), isT = ymd(d) === today(), mf = medFor(d);
    return `<div class="hj-day${isT ? ' t' : ''}"><div class="hj-dl"><b>${esc(DOW[d.getDay()])}</b><small>${esc(short(ymd(d)))}</small></div><div class="hj-dr">
      ${dn ? `<button type="button" class="hj-pill food" data-hja="cook" data-hjv="${esc(dn.wk + '|' + dn.id)}">${esc(dn.name)}${dn.mins || nOk(dn.nut) ? ` <small>${[dn.mins ? esc(dn.mins) + ' min' : '', nSf(nOk(dn.nutHeart) && !KIT() ? dn.nutHeart : dn.nut)].filter(Boolean).join(', ')}</small>` : ''}</button>` : ''}
      ${ses ? `<button type="button" class="hj-pill move" data-hja="work" data-hjv="${esc(ses.id)}">${esc(sesLabel(ses.id, ses))}</button>` : ''}
      ${d.getDay() === 3 && prepFor('wednesday', n) ? `<button type="button" class="hj-pill prep" data-hja="prep" data-hjv="wednesday|${n}">Mini Prep</button>` : ''}
      ${d.getDay() === 6 ? `<button type="button" class="hj-pill prep" data-hja="shopwk" data-hjv="${n + 1}">Shop for Week ${letter(n + 1)}</button>` : ''}
      ${d.getDay() === 0 && prepFor('sunday', n + 1) ? `<button type="button" class="hj-pill prep" data-hja="prep" data-hjv="sunday|${n + 1}">Sunday Together Prep</button>` : ''}
      ${d.getDay() === 0 && prepFor('batch', n + 1) ? `<button type="button" class="hj-pill prep" data-hja="prep" data-hjv="batch|${n + 1}">${esc(prepFor('batch', n + 1).title || 'Weekly Batch')}</button>` : ''}
      ${mf ? `<button type="button" class="hj-pill calm" data-hja="go" data-hjv="medid:${esc(mf.id)}">${esc(mf.title)} <small>${esc(medMins(n))} min meditation${track === 'practice' ? ', evening' : ''}</small></button>` : ''}
      ${ownPills(d)}
      ${mmPills(d)}
      ${holWeekDay(d).map(x => `<button type="button" class="hj-pill prep" data-hja="go" data-hjv="${esc(x.key)}">${esc(x.title)}</button>`).join('')}
      ${remOn() && !H().set.remWk ? remindersFor(d, 'all').map(r => `<button type="button" class="hj-pill rem${S.remOpen === r.id ? ' on' : ''}" data-hja="remshow" data-hjv="${esc(r.id)}" aria-expanded="${S.remOpen === r.id}">${esc(r.title)}</button>`).join('') : ''}
      ${remOn() && !H().set.remWk ? (rr => rr ? `<div class="hj-remd"><span>${esc(rr.sub)}</span>${rr.go ? `<button type="button" class="linkbtn" data-hja="go" data-hjv="${esc(rr.go)}">Open</button>` : ''}</div>` : '')(remindersFor(d, 'all').find(r => r.id === S.remOpen)) : ''}
    </div></div>`; }).join('');
  const w = (din.weeks || {})[letter(n)] || {}, ideas = ideasBlk;
  return `${ownViewTabs('week')}${ownWeekLine(mon)}<div class="hj-wkbar"><button type="button" class="btn btn-line btn-sm" data-hja="wk" data-hjv="-1"${n <= 1 ? ' disabled' : ''}>Back</button><div><b>Week ${n}</b><small>Food Week ${letter(n)}${KIT() ? '' : progOn() ? (progLabel(mon) ? ' · ' + esc(progLabel(mon)) + (lightOn(mon) ? ' · lighter' : '') : '') : ' · Phase ' + phaseOf(n) + (lightWk(n) ? ' · lighter' : '')}</small></div><button type="button" class="btn btn-line btn-sm" data-hja="wk" data-hjv="1">Next</button></div>
  ${newCard()}${againCard()}${holCardsHtml()}${n0 < 1 && !S.wkOff ? `<p class="hj-note">Your plan starts ${esc(shortDate(startMon()))}. Here is your first week.</p>` : ''}
  <div class="hj-blk hj-days">${rows}</div>
  ${remOn() ? `<div class="row" style="margin:-4px 0 14px"><button type="button" class="btn btn-line btn-sm" data-hja="remics">Add Reminders to My Phone Calendar</button><button type="button" class="linkbtn" data-hja="remwk">${H().set.remWk ? 'Show Reminders on This Week' : 'Keep Reminders on Today Only'}</button></div>` : ''}
  ${wbNote(w)}
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
  <div class="hj-blk">${kick('This Week')}${card('sunday', 'Sunday Together Prep', 'Sunday')}${card('batch', '', 'Sunday, after prep')}${card('pack', 'Pack Lunches', 'Sunday evening')}${card('wednesday', 'Wednesday Mini Prep', 'Wednesday')}</div>
  ${bs.length ? `<div class="hj-blk">${kick('Batch Calendar')}<div class="hj-tw"><table class="hj-tbl"><thead><tr><th>Make</th>${weeks.map(w => `<th>${w === L ? '<b>' + w + '</b>' : w}</th>`).join('')}<th>Keeps</th></tr></thead><tbody>${bs.map(b => `<tr><td><b>${esc(b.name)}</b><small>${esc(b.makes || '')}</small></td>${weeks.map(w => `<td>${inWk(b, w) ? '&#9679;' : ''}</td>`).join('')}<td><small>${esc(b.keeps || '')}</small></td></tr>`).join('')}</tbody></table></div><p class="hj-sub">Food Week ${L} is this list's week. A dot means make it that week.</p></div>
  <div class="hj-blk">${kick('Bulk Basics and Freezer Stock')}${bs.map(b => { const c = +((h.stock || {})[b.id] || 0); return `<div class="hj-pc"><div style="min-width:0"><b>${esc(b.name)}</b><small>${esc(b.uses || '')}${b.mins ? ' · ' + esc(b.mins) + ' min' : ''}</small></div>
    ${b.where === 'freezer' ? `<div class="hj-stock"><button type="button" class="chip" data-hja="stock" data-hjv="${esc(b.id)}|-1" aria-label="One less">&minus;</button><span><b>${c}</b><small>in freezer</small></span><button type="button" class="chip" data-hja="stock" data-hjv="${esc(b.id)}|1" aria-label="One more">+</button></div>` : ''}
    <button type="button" class="btn btn-line btn-sm" data-hja="prep" data-hjv="bulk-${esc(b.id)}|${n}">Make It</button></div>`; }).join('')}</div>` : PUB() ? '<p class="hj-note">Each recipe in your plan carries its own make-ahead and leftover tips. Open any dinner in the Kitchen and a calm voice guides you through it.</p>' : '<p class="hj-note">The batch calendar arrives with the next library update.</p>'}`;
}
// ---------- the shop list (on this device) ----------
const SECS = ['Grab and Go', 'Produce', 'Meat and Fish', 'Eggs, Dairy, and Milks', 'Bread and Tortillas', 'Frozen', 'Pantry', 'Add-ons', 'Other'];
const STORES = {costco: 'Costco', grocer: 'Coborn\'s'}; // Coborn's, the local grocer (Chris, October 24, 2026: Cub is 24 miles away)
const SECS_P = ['Produce', 'Proteins', 'Grains and Beans', 'Dairy and Eggs', 'Frozen', 'Pantry', 'Spices', 'Grab and Go', 'Other'];
const SECX = () => PUB() ? SECS_P : SECS;
// BLD 896: My Own Shopping Items join each week's list (ownShop).
// BLD 896: a set up holiday's shopping joins the list for the week of its buy day (holMerge).
// BLD 900: My Menu's added recipes join the list, and a swapped meal's items step aside (mmMerge).
function shopList(n){ return mmMerge(holMerge(ownShop(shopList0(n), n), Math.max(1, n)), Math.max(1, n)); }
function shopList0(n){
  const h = H(), key = String(Math.max(1, n)); if (h.shop[key]) return wbMerge(h.shop[key], n);
  const sp = (APP() || {}).shop, w = sp && sp.weeks && sp.weeks[letter(n)]; if (!w) return null;
  const mine = MINE(), add = letter(n) === 'A' ? arr(mine && mine.addons) : [];
  return {seed: true, items: arr(w.shop).concat(add).map((x, i) => ({id: 's' + i, store: x.store === 'grocer' ? 'grocer' : 'costco', sec: x.gg ? 'Grab and Go' : SECX().includes(x.sec) ? x.sec : (x.sec && !PUB() ? 'Add-ons' : 'Other'), name: x.name, amt: x.amt || '', price: +x.price || 0, for: x.for || '', nut: nOk(x.nut) ? x.nut : undefined, done: false, n: i}))};
}
// Lists kept on a phone before BLD 846 lack numbers: look them up by name in the library.
function nutOf(x, n){ if (nOk(x.nut)) return x.nut; const k = String(x.name || '').toLowerCase(), app = APP() || {}, w = ((app.shop || {}).weeks || {})[letter(n)] || {}, din = app.dinners || {};
  const all = arr(w.shop).concat(arr((app.shop || {}).staples), ...['breakfasts', 'lunches', 'snacks'].map(t => arr(din[t]).flatMap(i => arr(i.shop))));
  const f = all.find(i => String(i.name || '').toLowerCase() === k && nOk(i.nut)); return f ? f.nut : null; }
// BLD 889: a list saved before the Weekly Batch picks up its batch buys once (by name), and keeps everything already on it.
function wbMerge(L, n){ if (!L || L.wb889 || PUB()) return L; const sp = (APP() || {}).shop, w = sp && sp.weeks && sp.weeks[letter(n)]; if (!w || !w.batch) return L;
  arr(w.shop).forEach((x, i) => { if (!/Weekly Batch/.test(x.for || '') || L.items.some(y => String(y.name).toLowerCase() === String(x.name).toLowerCase())) return;
    L.items.push({id: 'w' + i, store: x.store === 'grocer' ? 'grocer' : 'costco', sec: x.gg ? 'Grab and Go' : SECX().includes(x.sec) ? x.sec : 'Other', name: x.name, amt: x.amt || '', price: +x.price || 0, for: x.for || '', nut: nOk(x.nut) ? x.nut : undefined, done: false, n: 400 + i}); });
  L.wb889 = 1; return L; }
function keepShop(n, L){ const h = H(); delete L.seed; L.u = Date.now(); h.shop[String(Math.max(1, n))] = L; save(); }
function vShop(){
  const d = new Date(), n = S.shopWk || foodWeek(d), L = shopList(n), h = H(), hh = num(h.set.household);
  if (!L) return `<p class="hj-note">The shopping lists arrive with the next library update.</p>`;
  const st = PUB() ? 'all' : S.store || 'costco', vis = L.items.filter(x => st === 'all' || x.store === st || x.own || x.mm), left = vis.filter(x => !x.done);
  const tot = vis.reduce((a, x) => a + (+x.price || 0), 0), cart = vis.filter(x => x.done).reduce((a, x) => a + (+x.price || 0), 0);
  const groups = SECX().map(s => [s, vis.filter(x => (SECX().includes(x.sec) ? x.sec : 'Other') === s).sort((a, b) => (a.done - b.done) || (a.n - b.n))]).filter(g => g[1].length);
  const ed = S.shopEd;
  return `<div class="hj-wkbar"><button type="button" class="btn btn-line btn-sm" data-hja="shopwk" data-hjv="${n - 1}"${n <= 1 ? ' disabled' : ''}>Back</button><div><b>Shop for Week ${letter(n)}</b><small>Week ${n}, shop ${esc(shortDate(addD(startMon(), (n - 1) * 7 - 2)))}</small></div><button type="button" class="btn btn-line btn-sm" data-hja="shopwk" data-hjv="${n + 1}">Next</button></div>
  ${PUB() ? `<p class="hj-note">This list follows your plan for Food Week ${letter(n)}: dinners, plus your breakfasts, lunches, and snacks. ${pubHH() > 1 ? `Amounts fit your household of ${pubHH()}.` : pubHH() ? 'Amounts fit a table of two: one meal now and one for tomorrow.' : 'Amounts fit a table of six.'}</p>` : hh && hh !== 6 ? `<p class="hj-note">Amounts are for six. For ${hh}, buy about ${Math.round(hh / 6 * 100)}% of each.</p>` : ''}
  <div class="hj-shopbar"><div class="hj-chips" style="margin:0">${(PUB() ? [] : ['costco', 'grocer', 'all']).map(s => `<button type="button" class="chip${st === s ? ' on' : ''}" aria-pressed="${st === s}" data-hja="store" data-hjv="${s}">${s === 'all' ? 'Both' : STORES[s]}</button>`).join('')}<button type="button" class="chip${S.hideDone ? ' on' : ''}" aria-pressed="${!!S.hideDone}" data-hja="hide">Hide In Cart</button></div>
    <div class="hj-tot"><span><b>${left.length}</b> of ${vis.length} left</span>${PUB() && !tot ? '' : `<span>In cart <b>$${cart.toFixed(2)}</b> of about $${tot.toFixed(2)}</span>`}</div><div class="hj-prog"><span style="width:${vis.length ? 100 * (vis.length - left.length) / vis.length : 0}%"></span></div></div>
  ${groups.map(([s, g]) => { const shown = S.hideDone ? g.filter(x => !x.done) : g; if (!shown.length) return ''; return `<h4 class="hj-sec">${esc(s)}<small>${g.filter(x => !x.done).length} left</small></h4>` + shown.map(x => `<div class="hj-it${x.done ? ' done' : ''}"><button type="button" class="hj-agck" data-hja="buy" data-hjv="${esc(x.id)}" aria-pressed="${!!x.done}" aria-label="In cart: ${esc(x.name)}">${x.done ? '&#10003;' : ''}</button><button type="button" class="hj-itt" data-hja="shoped" data-hjv="${esc(x.id)}"><b>${esc(x.name)}</b><small>${st === 'all' && !PUB() ? esc(STORES[x.store]) + ' · ' : ''}${esc(mmAmt(x))}${mmFor(x) ? ' · ' + esc(mmFor(x)) : ''}${(q => q ? ' · ' + esc(q.sf) + ' g sat fat' + (q.per ? ' per ' + esc(q.per) : '') : '')(nutOf(x, n))}</small></button><span class="hj-pr">${x.price ? '$' + (+x.price).toFixed(2) : ''}</span></div>` + (ed === x.id ? `<div class="hj-ed">${(q => q ? `<p class="hj-sub hj-nl">${q.per ? 'Per ' + esc(q.per) + ': ' : ''}${nLine(q)}</p>` : '')(nutOf(x, n))}<label class="hj-fld"><span>Item</span><input data-hjsh="name" value="${esc(x.name)}"></label><div class="hj-g3"><label class="hj-fld"><span>Amount</span><input data-hjsh="amt" value="${esc(x.amt)}"></label><label class="hj-fld"><span>Price</span><input data-hjsh="price" inputmode="decimal" value="${esc(x.price || '')}"></label>${PUB() ? '' : `<label class="hj-fld"><span>Store</span><select data-hjsh="store"><option value="costco"${x.store === 'costco' ? ' selected' : ''}>Costco</option><option value="grocer"${x.store === 'grocer' ? ' selected' : ''}>Your Grocer</option></select></label>`}</div>
      <div class="row"><button type="button" class="btn btn-gold btn-sm" data-hja="shopsave" data-hjv="${esc(x.id)}">Save</button><button type="button" class="btn btn-line btn-sm" data-hja="shopclose">Close</button><button type="button" class="linkbtn" data-hja="shopdel" data-hjv="${esc(x.id)}">Remove</button></div></div>` : '')).join(''); }).join('')}
  <div class="hj-add"><input id="hj-addname" placeholder="Add an item" autocomplete="off"><button type="button" class="btn btn-gold btn-sm" data-hja="shopadd">Add</button></div>
  ${ownShopPanel(n)}
  <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold btn-sm" data-hja="shopcopy">Copy for a Text</button><button type="button" class="btn btn-line btn-sm" data-hja="shopreset">${S.sureReset ? 'Tap Again to Clear the Checks' : 'Start Over'}</button></div>
  <textarea id="hj-copy" class="hj-copy" readonly hidden></textarea>
  <p class="hj-note">Prices are estimates. Tap any item to change it. This list lives on this device.</p>`;
}
function shopText(n){
  const L = shopList(n), st = PUB() ? 'all' : S.store || 'costco', out = [];
  (PUB() ? [''] : st === 'all' ? ['costco', 'grocer'] : [st]).forEach(s => { const g = L.items.filter(x => (!s || x.store === s) && !x.done); if (!g.length) return; if (s) out.push(STORES[s].toUpperCase());
    SECX().forEach(sec => { const r = g.filter(x => (SECX().includes(x.sec) ? x.sec : 'Other') === sec); if (!r.length) return; out.push('', sec + ':'); r.forEach(x => out.push('[ ] ' + x.name + (mmAmt(x) ? ' (' + mmAmt(x) + ')' : ''))); }); out.push(''); });
  return out.join('\n').trim() || 'Everything is in the cart.';
}
// ---------- overlays: workout, cook, prep, meditation ----------
function buildWork(s){
  const ses = sesById(s); if (!ses) return null;
  const t0 = new Date(), pk = phKeyFor(s, t0), steps = stepsFor(ses, pk.ph, pk.light);
  let count = true; try { count = localStorage.getItem('gg-health-count') !== '0'; } catch(e){}
  return {k: 'work', s, key: 'work:' + s, title: ses.title || 'Session ' + s, mins: ses.mins, steps, i: 0, set: 1, done: [], end: 0, left: 0, run: false, rest: false, stage: 'start', voice: AVA, count, hands: handsOn()};
}
// BLD 883: hand the recorded voice its key before any guide plays, wherever it was opened from (Today in The Grounded Way opens guides directly).
function keyVoice(){ if (VO()) VO().setKey(((C.fld && C.fld()) || {}).audio); }
function openOv(o){ if (!o) { toast('That part arrives with the next library update.'); return; } keyVoice(); S.ov = o; wake(true); tick(); rerender(true); }
function closeOv(){ const o = S.ov; if (o){ o.dead = true; o.skip = true; } const V = VO(); if (V){ V.stop(); V.music(null); } S.ov = null; wake(false); rerender(true); }
let WL = null; function wake(on){ try { if (on && navigator.wakeLock && !WL) navigator.wakeLock.request('screen').then(l => { WL = l; }).catch(() => {}); if (!on && WL){ WL.release(); WL = null; } } catch(e){} }
// BLD 857 (note 2, "says 3 sets, only does 2 sets"): this tick also ended Play Session's rests, so when it fired between the end
// of a rest and the engine's own check, the set count went up twice and a set was lost. Play Session keeps its own timers now.
let TK = null; function tick(){ clearInterval(TK); TK = setInterval(() => { const o = S.ov; if (!o){ clearInterval(TK); return; } if (!o.run || o.mode === 'auto') return; const ms = o.end - Date.now();
  if (o.k === 'quiet'){ const q = document.querySelector('[data-hjqline]'); if (q){ const t = quietLine(o); if (q.textContent !== t) q.textContent = t; } }
  document.querySelectorAll('[data-hjclock]').forEach(e => e.textContent = clock(Math.max(0, ms)));
  if (o.tot) stageUpd(Math.max(0, Math.min(1, ms / o.tot)), Math.max(0, Math.ceil(ms / 1000)));
  if (ms <= 0){ o.run = false; o.left = 0; chime(); if (o.k === 'work' && o.between){ o.between = false; } else if (o.k === 'work' && o.rest){ o.rest = false; o.set++; } if (o.k === 'med'){ markDone('med'); checkOn('still'); o.fin = true; } if (o.k === 'quiet'){ checkOn('quiet'); o.fin = true; } if (o.ti != null) o.tdone = Object.assign(o.tdone || {}, {[o.ti]: true}); rerender(true); } }, 250); }
const clock = ms => { const s = Math.ceil(ms / 1000); return Math.floor(s / 60) + ':' + pad(s % 60); };
function chime(){ try { const A = window.AudioContext || window.webkitAudioContext; if (A){ const c = chime.c = chime.c || new A(); [0, 0.35, 0.7].forEach(t => { const o = c.createOscillator(), g = c.createGain(); o.frequency.value = 660; g.gain.setValueAtTime(0.0001, c.currentTime + t); g.gain.exponentialRampToValueAtTime(0.25, c.currentTime + t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + t + 0.3); o.connect(g); g.connect(c.destination); o.start(c.currentTime + t); o.stop(c.currentTime + t + 0.32); }); } } catch(e){} try { navigator.vibrate && navigator.vibrate([200, 100, 200]); } catch(e){} }
function startTimer(o, secs, ti){ o.end = Date.now() + secs * 1000; o.left = secs * 1000; o.tot = secs * 1000; o.run = true; o.ti = ti; try { chime.c && chime.c.resume && chime.c.resume(); } catch(e){} }
function checkOn(id){ const h = H(), t = today(), d = h.days[t] = h.days[t] || {checks: {}}; d.checks = d.checks || {}; d.checks[id] = true; d.u = Date.now(); save(); }
function vOv(){
  const o = S.ov; if (!o) return '';
  const top = (title, sub, pct) => `<div class="hj-ovtop"><div><div class="hj-kick">${esc(sub || '')}</div><b>${esc(title)}</b></div><button type="button" class="hj-x" data-hja="ovclose" aria-label="Close">&times;</button></div>${pct != null ? `<div class="hj-prog"><span style="width:${pct}%"></span></div>` : ''}`;
  let body = '';
  if (o.k === 'quiet') body = vQuiet(o, top);
  else if (o.k === 'work' && o.stage === 'start') body = vStart(o, top);
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
        body = `${top(o.title, st.part + ' · ' + (o.i + 1) + ' of ' + o.steps.length, pct)}${wrap(`<h2 class="hj-exn">${esc(st.name)}</h2>${howBlock(st)}${modsBlock(st)}
          <div class="hj-clock" data-hjclock>${clock(ms)}</div>
          <div class="hj-ovbtns"><button type="button" class="btn btn-line" data-hja="${o.run ? 'pause' : 'tstart'}">${o.run ? 'Pause' : (o.left && o.left < st.secs * 1000 ? 'Keep Going' : 'Start Timer')}</button><button type="button" class="btn btn-gold" data-hja="next">Next</button></div>`)}`; }
      else if (o.between){ body = `${top(o.title, 'Rest', pct)}${wrap(`<div class="hj-kick hj-stk">Rest, then next up</div><h2 class="hj-exn">${esc(st.name)}</h2><div class="hj-clock" data-hjclock>${clock(Math.max(0, o.end - Date.now()))}</div>
          ${arr(st.tips).length ? `<ul class="hj-tips">${st.tips.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}${weightTip(st) ? `<p class="hj-wtl"><b>Weight:</b> ${esc(weightTip(st))}</p>` : ''}
          <div class="hj-ovbtns"><button type="button" class="btn btn-gold" data-hja="skiprest">Ready Now</button></div>`)}`; }
      else if (o.rest){ body = `${top(o.title, 'Rest', pct)}${wrap(`<div class="hj-kick hj-stk">Rest, then ${o.set + 1 === st.sets ? 'the last set' : 'set ' + (o.set + 1) + ' of ' + st.sets}</div><h2 class="hj-exn">${esc(st.name)}</h2>${dots(o.set + 1, st.sets)}<div class="hj-clock" data-hjclock>${clock(o.end - Date.now())}</div><p class="hj-mot">${esc((MOT()[(o.i + o.set) % Math.max(1, MOT().length)]) || 'Breathe slow. Sip water.')}</p>
          <div class="hj-ovbtns"><button type="button" class="btn btn-gold" data-hja="skiprest">Ready Now</button></div>`)}`; }
      else { body = `${top(o.title, st.part + ' · ' + (o.i + 1) + ' of ' + o.steps.length, pct)}${wrap(`<div class="hj-kick hj-stk">${o.set === st.sets && st.sets > 1 ? 'Last set' : `Set ${o.set} of ${st.sets}`}</div><h2 class="hj-exn">${esc(o.swap ? (st.swap || st.name) : st.name)}</h2>${dots(o.set, st.sets)}
          <div class="hj-reps">${esc(repLine(st))}</div>
          ${st.side ? `<p class="hj-cue">Left side first, then the right.</p>` : st.alt ? `<p class="hj-cue">${ALT_CUE}</p>` : ''}
          ${o.swap ? `<p class="hj-how">Swap for ${esc(st.name)}. Same sets and reps.</p>` : `${formLine(st)}${howBlock(st)}${st.cue ? `<p class="hj-cue">${esc(st.cue)}</p>` : ''}${modsBlock(st)}`}
          ${st.kind === 'reps' ? `${weightTip(st) ? `<p class="hj-wtl"><b>Weight:</b> ${esc(weightTip(st))}</p>` : ''}<label class="hj-fld hj-lb"><span>Weight (lb), saved for next time</span><input id="hj-lb" inputmode="decimal" value="${esc(o.lb != null ? o.lb : (lb || ''))}" placeholder="Bodyweight"></label>` : ''}
          <div class="hj-ovbtns">${st.swap ? `<button type="button" class="btn btn-line" data-hja="swap">${o.swap ? 'Back to the Plan Move' : 'Joint-Friendly Swap'}</button>` : ''}<button type="button" class="btn btn-gold" data-hja="setdone">${o.set < st.sets ? 'Set Done' : 'Done, Next Move'}</button></div>
          <button type="button" class="linkbtn hj-skip" data-hja="next">Skip this move</button>`)}`; }
    }
  } else if (o.k === 'med'){
    const m = WK().meditation || {}, ms = o.run ? o.end - Date.now() : (o.left || o.mins * 60000);
    body = `${top('Meditation', o.mins + ' minutes')}${stagePanel(o.fin ? 'done' : 'med', medOp(o))}<div class="hj-ovb">${o.fin ? `<div class="hj-big2">Well done.</div><p class="hj-sub">Carry this stillness into your day.</p><button type="button" class="btn btn-gold hj-go" data-hja="ovclose">Close</button>` :
      `<ul class="hj-guide">${arr(m.guide).map(g => `<li>${esc(g)}</li>`).join('') || '<li>Sit tall and easy. Close your eyes.</li><li>Breathe in slowly through your nose, and out a little longer.</li><li>When your mind wanders, notice it, and come back to the breath.</li>'}</ul>
      <div class="hj-clock" data-hjclock>${clock(ms)}</div><div class="hj-ovbtns"><button type="button" class="btn btn-gold" data-hja="${o.run ? 'pause' : 'mstart'}">${o.run ? 'Pause' : (o.left && o.left < o.mins * 60000 ? 'Keep Going' : 'Begin')}</button><button type="button" class="btn btn-line" data-hja="mdone">I Am Done</button></div>`}</div>`;
  } else if (o.k === 'cook' || o.k === 'prep'){
    const x = o.data, steps = arr(x.steps), dn = o.dn = o.dn || {}, tdone = o.tdone || {};
    const nDone = steps.filter((s, i) => dn[i]).length, pct = steps.length ? Math.round(100 * nDone / steps.length) : 0;
    body = `${top(o.title, o.sub, pct)}${stagePanel('cook', {fig: window.GGStage ? '' : POT, small: true})}<div class="hj-ovb hj-left"><button type="button" class="btn btn-gold hj-go" data-hja="guide" style="margin-bottom:12px">Guide Me, Step by Step</button>${mmOvBtns(o)}
      ${x.prepped ? `<p class="hj-note"><b>Prepped:</b> ${esc(x.prepped)}</p>` : ''}${o.base ? servesRow(o) : ''}
      ${o.k === 'cook' && nOk(x.nut) ? `<details class="hj-doc"><summary><span>Nutrition per Serving</span></summary><div class="hj-body">${nTable(x.nut, x.nutHeart)}</div></details>` : ''}
      ${arr(x.ingredients).length ? `<details class="hj-doc" open><summary><span>Ingredients</span></summary><div class="hj-body"><ul class="hj-ing">${arr(x.ingredients).map(g => `<li>${esc(g)}</li>`).join('')}</ul></div></details>` : ''}
      <ol class="hj-steps">${steps.map((s, i) => { const t = typeof s === 'string' ? {t: s} : s, on = !!dn[i], tm = +t.min || 0, running = o.run && o.ti === i;
        return `<li class="${on ? 'on' : ''}"><button type="button" class="hj-agck" data-hja="step" data-hjv="${i}" aria-pressed="${on}">${on ? '&#10003;' : i + 1}</button><div>${t.at ? `<span class="hj-at">${esc(t.at)}</span> ` : ''}${esc(t.t || '')}
          ${tm ? `<div class="hj-tm">${running ? `<span class="hj-clock sm" data-hjclock>${clock(o.end - Date.now())}</span><button type="button" class="btn btn-line btn-sm" data-hja="tstop">Stop</button>` : tdone[i] ? `<span class="hj-tdone">Timer done</span>` : `<button type="button" class="btn btn-line btn-sm" data-hja="stime" data-hjv="${i}">Start ${tm} min Timer</button>`}</div>` : ''}</div></li>`; }).join('')}</ol>
      ${x.serve ? `<p class="hj-sub"><b>Serve:</b> ${esc(x.serve)}</p>` : ''}${x.tip ? `<p class="hj-sub"><b>Tip:</b> ${esc(x.tip)}</p>` : ''}${x.kid ? `<p class="hj-sub"><b>For kids:</b> ${esc(x.kid)}</p>` : ''}${x.swaps && typeof x.swaps === 'object' ? Object.entries(x.swaps).filter(([, t]) => t).map(([k, t]) => `<p class="hj-sub"><b>Swap for ${esc((arr((PLIB() || {}).needs).find(z => z.id === k) || {}).name || k.replace(/([A-Z])/g, ' $1').toLowerCase())}:</b> ${esc(t)}</p>`).join('') : ''}${x.keeps ? `<p class="hj-sub"><b>Leftovers:</b> ${esc(x.keeps)}</p>` : ''}${PUB() && x.serves ? `<p class="hj-sub">Serves ${esc(x.serves)}.${hhNote(x.serves)}</p>` : ''}
      ${arr(x.yields).length ? `<p class="hj-sub"><b>Ready after:</b> ${arr(x.yields).map(esc).join(', ')}</p>` : ''}
      <button type="button" class="btn btn-gold hj-go" data-hja="cdone">${o.peek ? 'Ready for Tomorrow' : o.idea ? 'All Done' : o.k === 'cook' ? 'Dinner Is Done' : 'Prep Is Done'}</button></div>`;
  }
  const sc = stCol(stState(o), HOUR()), art = ovArt(o);
  return `<div class="hj-ov hj-st${o.inline ? ' hj-inl' : ''}${art ? ' hj-hasart' : ''}" data-hjst="${esc(stState(o))}" style="--st:${esc(sc.accent)};${sc.bg ? `--stbg:${esc(sc.bg)};` : ''}${sc.fg ? `--stfg:${esc(sc.fg)};` : ''}" role="dialog" aria-modal="true" aria-label="${esc(o.title || 'Tending')}">${art}<div class="hj-ovin">${body}</div></div>`;
}
// BLD 895 (Chris, October 30, 2026: "try to bring the image into the video as background"; "food pics ride w guides too!"):
// every player plays over its own painting, softened under a scrim in the page's own colors so the figure, timers, and words read.
// The stage's sky stays as the card around the figure; a player with no painting keeps the scene as before. On a phone the square
// crop (-sq), on a wide screen the wide one. The drift continues across redraws (its delay counts from when the player opened).
const ART_KITCHEN = {lunch: 'meal-lunch', breakfast: 'weekly-batch', snack: 'weekly-batch', batch: 'weekly-batch', prep: 'prep-together', head: 'kitchen-headstart', dinner: 'todays-plate', party: 'kitchen-headstart', drink: 'tend-people'};
const ART_ONE = ['tend-people']; // BLD 902: one square painting serves both sizes
function ovArtName(o){
  if (!o) return '';
  if (o.k === 'quiet') return 'quiet-morning';
  if (o.med || o.k === 'med'){ const m = MED(), j = m ? arr(m.sessions).findIndex(x => x.id === o.s) : -1; return MED_ART.includes('m' + (j + 1)) ? 'med-m' + (j + 1) : 'quiet-meditation'; }
  if (o.prac) return flowArtName(arr((PR() || {}).sessions).find(z => z.id === o.s)).replace(/-sq$/, '');
  if (o.k === 'work'){ const p = String(o.key || '').split(':'), lvl = p[0] === 'wl' ? p[1] : '';
    const ses = lvl ? (levelSes(lvl, o.s) || {}).ses : sesById(o.s); return moveArtName(o.s, ses, lvl).replace(/-sq$/, ''); }
  if (o.k === 'prep') return /^prep:batch:/.test(o.key || '') ? ART_KITCHEN.batch : ART_KITCHEN.prep;
  if (o.hol) return (o.data && o.data.art) || ART_KITCHEN.dinner; // BLD 896: Today's Plate, or the Weekly Batch table on a make-ahead day
  if (o.k === 'cook'){ if (o.peek) return ART_KITCHEN.head; const k = String(o.key || ''), x = o.data || {}, meal = /^idea:/.test(k) && !/^idea:recipe:/.test(k) ? k.split(':')[1] : String(x.meal || 'dinner').toLowerCase();
    if (/^lunch/.test(meal)) return ART_KITCHEN.lunch; if (/^breakfast/.test(meal)) return ART_KITCHEN.breakfast; if (/^snack/.test(meal)) return ART_KITCHEN.snack;
    if (meal === 'party' || meal === 'drink') return ART_KITCHEN[meal];
    return (dinnerArtName(x) || '').replace(/-sq$/, '') || ART_KITCHEN.dinner; }
  return '';
}
function ovArt(o){
  const n = ovArtName(o); if (!n) return ''; if (!o.artT) o.artT = Date.now();
  const med = /^med-m\d$/.test(n), wide = WAY(med ? n + '-lg' : n), sq = WAY(med || ART_ONE.includes(n) ? n : n + '-sq'), d = -((Date.now() - o.artT) / 1000).toFixed(1);
  return `<div class="hj-paint" aria-hidden="true"><picture><source media="(max-width:699px)" srcset="${esc(sq)}"><img src="${esc(wide)}" alt="" decoding="async" style="animation-delay:${d}s"></picture></div>`;
}
function openKey(key){
  const [k, a, b] = key.split(':');
  if (k === 'work') return openOv(buildWork(a));
  if (k === 'prac') return openOv(buildPractice());
  if (k === 'med' && MED()) return openOv(buildMed());
  if (k === 'pracid') return openOv(buildPractice(a));
  if (k === 'medid') return openOv(buildMed(a));
  if (k === 'med') return openOv({k: 'med', title: 'Meditation', mins: medMins(weekNo(new Date())), left: 0, run: false});
  if (k === 'shop'){ S.shopWk = +a; S.shopEd = null; if (bareOn() || C.host === 'home') return want('shop'); S.sec = 'shop'; rerender(false); window.scrollTo(0, 0); return; }
  if (k === 'quiet') return openQuiet();
  if (k === 'prepsec'){ S.prepWk = +a || null; if (bareOn() || C.host === 'home') return want('prep'); S.sec = 'prep'; rerender(false); window.scrollTo(0, 0); return; }
  if (k === 'prep') return openPrep(a, +b);
  if (k === 'cook') return openCook(a, b);
  if (k === 'menu') return openOv(mmOv(a));   // BLD 900: a meal added to My Menu
  // BLD 881: a lunch or any idea, the head start for tomorrow, and a workout from any level open their guides too.
  if (k === 'idea') return openIdea(a, b);
  if (k === 'head') return openOv(headOv(a));
  if (k === 'wl') return openOv(buildLevelWork(a, b));
  if (/^hol(set|rec)?$/.test(k) && holAct(key)) return;
  markDone(key); toast('Marked done. Well done.'); rerender(true);
}
// BLD 881: each guide is built by its own *Ov function, so GGHealth.render can play one inside a sheet as well as full screen.
function cookOv(wk, id){ const w = ((APP() || {}).dinners || {}).weeks || {}, x = arr((w[wk] || {}).dinners).find(z => z.id === id); if (!x) return null;
  return {k: 'cook', key: 'cook:' + wk + ':' + id, title: x.name, sub: (x.mins ? x.mins + ' minutes' : '') + (x.cost ? ' · about $' + x.cost : ''), data: x}; }
function openCook(wk, id){ openOv(cookOv(wk, id)); }
// Breakfasts, lunches, and snacks with steps open in Andrew's guide too (BLD 859).
function ideaOv(type, i){ const x = arr(((APP() || {}).dinners || {})[type])[+i]; if (!x || !arr(x.steps).length) return null;
  return {k: 'cook', idea: true, key: 'idea:' + type + ':' + i, title: x.name, sub: x.mins ? x.mins + ' minutes' : '', data: x}; }
function openIdea(type, i){ openOv(ideaOv(type, i)); }
function prepOv(kind, n, forN){ const p0 = prepFor(kind, n); if (!p0) return null;
  const t = {sunday: 'Sunday Together Prep', wednesday: 'Wednesday Mini Prep', batch: p0.title || 'Weekly Batch', pack: p0.title || 'Pack Lunches'}[kind] || p0.title || p0.name;
  const N = p0.serves ? (forN || batchFor()) : 0, p = N ? sizeBatch(p0, N) : p0;
  return {k: 'prep', key: 'prep:' + kind + ':' + n, title: t, sub: 'Week ' + letter(n) + (N ? ' · for ' + N : '') + (p.mins ? ' · about ' + p.mins + ' minutes' : ''), data: p, base: N ? {kind, n, N} : null}; }
function openPrep(kind, n){ openOv(prepOv(kind, n)); }
// The head start for tomorrow (BLD 881): tomorrow's dinner, to look over tonight; finishing it marks tonight's head start.
function headOv(k){ const d = parseD(k) || day0(new Date()), dn = dinnerFor(addD(d, 1)), o = dn ? cookOv(dn.wk, dn.id) : null; if (!o) return null;
  return Object.assign(o, {key: 'head:' + ymd(d), peek: true, sub: 'Tomorrow' + (o.sub ? ' · ' + o.sub : '')}); }
function actTool(a, v){
  const h = H(), o = S.ov;
  if (actCoach(a, v)) return true;
  if (actRecipes(a, v)) return true;
  if (actHol(a, v)) return true;
  switch (a){
    case 'go': return openKey(v), true;
    case 'toggle': { const l = logOf(new Date()); if (l[v]) delete l[v]; else l[v] = Date.now(); if (l[v]){ if (v.startsWith('work:')) checkOn('move'); if (v === 'prac' || v === 'med') checkOn('still'); } save(); rerender(true); return true; }
    case 'work': return openOv(buildWork(v)), true;
    case 'cook': { const [w, id] = v.split('|'); openCook(w, id); return true; }
    case 'idea': { const [ty, ix] = v.split('|'); openIdea(ty, ix); return true; }
    case 'prep': { const [k, n] = v.split('|'); openPrep(k, +n); return true; }
    case 'bserve': { if (!o || !o.base) return true; const N = Math.max(1, Math.min(12, o.base.N + (+v || 0))), x = prepOv(o.base.kind, o.base.n, N); if (x){ x.dn = o.dn; x.inline = o.inline; Object.keys(o).forEach(k => delete o[k]); Object.assign(o, x); } rerender(true); return true; }
    case 'wk': S.wkOff = (S.wkOff || 0) + (+v); rerender(true); return true;
    case 'shopwk': S.sec = 'shop'; S.shopWk = Math.max(1, +v); S.shopEd = null; rerender(false); return true;
    case 'prepwk': S.prepWk = Math.max(1, +v); rerender(true); return true;
    case 'remshow': S.remOpen = S.remOpen === v ? null : v; rerender(true); return true;
    case 'remwk': h.set.remWk = !h.set.remWk; h.set.u = Date.now(); save(); rerender(true); return true;
    case 'remoff': h.set.remOff = !h.set.remOff; h.set.u = Date.now(); save(); rerender(true); return true;
    case 'remics': { try { const b = new Blob([icsText()], {type: 'text/calendar'}), u = URL.createObjectURL(b), a2 = document.createElement('a'); a2.href = u; a2.download = 'tending-reminders.ics'; document.body.appendChild(a2); a2.click(); a2.remove(); setTimeout(() => URL.revokeObjectURL(u), 60000);
      toast('Open the file and choose Add All. Your phone calendar takes it from here.'); } catch(e){ toast('This browser keeps the calendar file to itself. Try Safari or Chrome.'); } return true; }
    case 'stock': { const [id, d] = v.split('|'); h.stock = h.stock || {}; h.stock[id] = Math.max(0, (+h.stock[id] || 0) + (+d)); h.stockU = Date.now(); save(); rerender(true); return true; }
    case 'ggadd': { const [k, i] = v.split('|'), x = arr(((APP() || {}).dinners || {})[k])[+i]; if (!x) return true; const n = foodWeek(new Date()), L = shopList(n); if (!L) return true; let added = 0;
      arr(x.shop).forEach(g => { if (L.items.some(y => String(y.name).toLowerCase() === String(g.name).toLowerCase())) return; L.items.push({id: 'g' + uid(), store: g.store === 'grocer' ? 'grocer' : 'costco', sec: 'Grab and Go', name: g.name, amt: g.amt || '', price: +g.price || 0, for: x.name, nut: nOk(g.nut) ? g.nut : undefined, done: false, n: 500 + L.items.length}); added++; });
      keepShop(n, L); toast(added ? 'Added to Week ' + letter(n) + '\'s list.' : 'Already on the list.'); return true; }
    case 'store': S.store = v; S.shopEd = null; rerender(true); return true;
    case 'hide': S.hideDone = !S.hideDone; rerender(true); return true;
    case 'ewlvl': S.ewLvl = v; S.ewOpen = 'strength'; rerender(true); return true;
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
    case 'cdone': markDone(o.key); toast(o.peek ? 'Tomorrow is ready.' : o.idea ? 'Done. Enjoy.' : o.k === 'cook' ? 'Dinner done. Enjoy the table together.' : 'Prep done. The week is ready.'); closeOv(); return true;
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
// BLD 891 (Chris, October 29, 2026, mid workout: "Dead bugs and bird dogs tell you to do left side first then right side but
// aren't these exercises both left right left right back and forth?"): moves done alternating rep by rep run as one flow,
// with no Left side, Switch sides, or Right side stages. Matched by id or by name, so the public moves (m-dead-bug), the
// Guide library's sessions (c-dead-bugs, d-bird-dogs, b-pull-through), and its warm-up all follow it with no library patch.
// True one-side-at-a-time moves (split squats, single-leg bridges, side planks, one-arm rows, carries) keep each side in turn.
const ALT_IDS = ['m-dead-bug', 'm-bird-dog', 'm-plank-pull-through', 'g-seated-knee-lift', 'w-dead-bugs', 'b-bird-dog', 'b-pull-through', 'c-dead-bugs', 'd-dead-bugs', 'd-bird-dogs', 'd-pull-through'];
const ALT_RE = /^\s*(dead bugs?|bird dogs?|plank pull-throughs?|seated knee lifts?)\b/i;
const altMove = x => !!x && (x.alt === true || ALT_IDS.includes(x.id) || ALT_IDS.includes(x.move) || ALT_RE.test(x.name || ''));
const ALT_CUE = 'Alternate sides: left, then right, back and forth.';
// BLD 891 (Chris: "Plank pull thru needs more instruction"): a move may carry steps, shown as a numbered list in place of its how line.
const howBlock = st => arr(st.steps).length ? `<ol class="hj-hsteps">${st.steps.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : `<p class="hj-how">${esc(st.how || '')}</p>`;
// The count on the card: an alternating move whose reps count per side reads "8 each side (16 in all)" (a range doubles both
// ends); reps written as words or as a total read as written.
const repLine = st => { const r = repTxt(st), u = st.kind === 'time' ? ' seconds' : '';
  if (st.alt && st.per && !repWords(st) && !/total/i.test(r)) return r + u + ' each side (' + r.replace(/\d+/g, n => String(2 * n)) + u + ' in all)';
  return r + unitOf(st) + (st.side || st.per ? ' each side' : ''); };
const unitOf = st => repWords(st) ? '' : st.kind === 'time' ? ' seconds' : st.kind === 'distance' ? '' : (/total$/i.test(repTxt(st)) ? '' : ' reps');
const secsOf = st => parseInt(String(st.reps), 10) || 30;
// BLD 866: a long timed item (3 minutes or more, whole minutes, like the Gentle walks) is said in minutes.
const amtTxt = st => { const n = +repTxt(st); if (st.kind === 'time' && !repWords(st) && n >= 180 && n % 60 === 0){ const m = n / 60; return m + ' minute' + (m === 1 ? '' : 's'); } return repTxt(st) + unitOf(st); };
const LN = {
  ses: (t, m) => t + '. About ' + m + ' minutes. We begin with the warm-up.',
  time: st => (st.name + '. ' + (st.how || '')).trim(),
  ex: st => st.name + '. ' + st.sets + ' set' + (st.sets === 1 ? '' : 's') + ' of ' + amtTxt(st) + (st.side || st.per ? ' each side' : '') + '.',
  set: (n, m) => n === m ? 'Last set.' : 'Set ' + n + ' of ' + m + '.',
  go: 'Go.', rest: s => 'Rest ' + s + ' seconds.', ten: 'Ten seconds.', nextSet: 'Next set.',
  next: n => 'Next up: ' + n + '.', cool: 'Cooldown time. Nice work.', out: 'That is the session. Strong work today.',
  nextRest: (s, n) => 'Rest ' + s + ' seconds. Next up: ' + n + '.',
  left: 'Left side.', right: 'Right side.', sw: 'Switch sides.', way: 'Now the other way.', tap: 'Tap Set Done when you finish.',
  alt: 'Alternate sides, left then right, back and forth.',
  half: ['Halfway. Smooth and steady.', 'Halfway. Keep breathing.', 'Halfway. Nice control.'], last: 'Last few.', done: 'Set done.',
  hard: st => 'Too hard? ' + st.easier, easy: st => 'Too easy? ' + st.harder,
  weight: ['Pick a weight where the last two reps feel hard and your form stays clean.', 'If you could do five more reps, go a little heavier next set.', 'If your form slips, go a little lighter. Clean reps come first.'],
  count: k => NUMW[k] + '.',
  pIntro: (t, m) => t + '. About ' + m + ' minutes. Settle in, and we begin.', pOut: 'Your practice is complete. Carry this calm with you.',
  mIntro: t => 'Today\'s meditation: ' + t + '. Find a comfortable seat, and let the day pause.', mOut: 'Your meditation is complete. Carry this stillness into your day.',
  cIntro: n => 'We are making ' + n + '.', prepIntro: t => 'We are starting ' + t + '.',
  tset: m => 'Timer set for ' + m + ' minute' + (m === 1 ? '' : 's') + '.', tdone: 'That timer is done.',
  cOut: 'All done. Enjoy the table together.', prepOut: 'Prep is done. Your week is ready.'
};
// An alternating move counts every rep, both sides together (8 each side counts to Sixteen); past Twenty it is I Tap Done.
const repN = st => { if (repWords(st)) return 0; const n = parseInt(String(st.reps), 10) * (st.alt && st.per && !/total/i.test(String(st.reps)) ? 2 : 1); return n > 0 && n <= 20 ? n : 0; };
const workSecs = st => secsOf(st) * (st.alt && st.per ? 2 : 1);
// BLD 891, Auto Flow (Chris, October 29, 2026: "any ways to keep it hands free.. no one wants to have to tap or touch screen during
// workouts"): every rep runs at the move's tempo (seconds per rep, from the move; 3 when it has none), counted aloud or timed
// quietly; reps written as words ("2 to 3 short of your best") run about 8 reps. Pause and Set Done stay there, never required.
const tempoOf = st => Math.max(1, +st.tempo || REP_SECS), WORD_REPS = 8;
const handsOn = () => { try { return localStorage.getItem('gg-health-hands') !== '0'; } catch(e){ return true; } };
// A move that uses a weight gets Ava's weight advice now and then (a body weight move never does).
const loaded = st => !!st && st.t === 'ex' && st.kind !== 'time' && /dumbbell|kettlebell|barbell|machine|cable|plate|weight/i.test([st.name, st.load, st.equip].join(' ').replace(/your body ?weight\.?/ig, ''));
// The coaching behind these lines, credited on the workout's start screen (and in shared/gg-sources.js).
const COACH_SRC = [
  {t: 'Progression Models in Resistance Training for Healthy Adults (Position Stand, 2009)', who: 'American College of Sports Medicine', url: 'https://pubmed.ncbi.nlm.nih.gov/19204579/'},
  {t: 'Quantity and Quality of Exercise for Developing and Maintaining Fitness in Healthy Adults (Position Stand, 2011)', who: 'American College of Sports Medicine, Garber and others', url: 'https://pubmed.ncbi.nlm.nih.gov/21694556/'},
  {t: 'Acute Effects of Muscle Stretching on Physical Performance, Range of Motion, and Injury Incidence in Healthy Active Individuals (2016)', who: 'Behm and others, Applied Physiology, Nutrition, and Metabolism', url: 'https://pubmed.ncbi.nlm.nih.gov/26642915/'},
  {t: 'Application of the Repetitions in Reserve Based Rating of Perceived Exertion Scale for Resistance Training (2016)', who: 'Helms and others, Strength and Conditioning Journal', url: 'https://doi.org/10.1519/SSC.0000000000000218'}];
// BLD 892: a program workout's own credits (program.sources by track and phase) and a Flow session's (session.sources), drawn by
// shared/gg-sources.js where the page loads it, else from the library's own source list.
function progSrc(id){ const p = PROG(); if (!p || !p.sources) return []; for (const ph of PH_IDS) for (const tr of ['strength', 'cardio']) if (trackIds(tr, ph).includes(id)){ const x = (p.sources[tr] || {})[ph]; return arr(x); } return []; }
function srcLine(ids){ ids = arr(ids).filter(Boolean); if (!ids.length) return '';
  try { if (window.GGSources && GGSources.line){ const h = GGSources.line(ids); if (h) return `<div class="hj-src">${h}</div>`; } } catch(e){}
  const L = arr((PLIB() || {}).sources), xs = ids.map(i => L.find(x => x && x.id === i)).filter(Boolean); if (!xs.length) return '';
  return `<p class="hj-src">${xs.length > 1 ? 'Sources' : 'Source'}: ${xs.map(x => `<a href="${esc(x.url || '')}" target="_blank" rel="noopener">${esc(x.t || '')}</a>${x.who ? ', ' + esc(x.who) : ''}`).join('; ')}</p>`; }
const coachSrc = () => `<p class="hj-src">Sources: ${COACH_SRC.map(x => `<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.t)}</a>, ${esc(x.who)}`).join('; ')}</p>`;
// Feel it, Easier, Harder: shown on the card and in the rest (BLD 891).
const modsBlock = (st, only) => { const f = !only || only.includes('feel'), e = !only || only.includes('easier'), h = !only || only.includes('harder');
  const x = (f && st.feel ? `<p><b>Feel it:</b> ${esc(st.feel)}</p>` : '') + (e && st.easier ? `<p><b>Easier:</b> ${esc(st.easier)}</p>` : '') + (h && st.harder ? `<p><b>Harder:</b> ${esc(st.harder)}</p>` : '');
  return x ? `<div class="hj-mods">${x}</div>` : ''; };
const AVA = 'ava', ANDREW = 'andrew';
const REST_MAX = 60, GET_READY = 30, SWITCH = 5, REP_SECS = 3, TAP_EST = 35;
const capRest = v => Math.max(0, Math.min(REST_MAX, Math.round(v)));
// A warm-up or cooldown hold done on each side (Couch Stretch, Figure-4): Ava says Switch sides at the halfway point.
// An alternating warm-up (Dead Bugs, 6 per side) flows side to side with no Switch sides (BLD 891).
const halfSide = x => !altMove(x) && /per side|each side|switch sides/i.test((x.name || '') + ' ' + (x.how || ''));
function stepsFor(ses, ph, light, w0){
  const w = w0 || WK(), out = [];
  // BLD 891: a session may carry its own warm-up for its focus (public Tending by day; the Guide library per session).
  arr((ses && ses.warmup) || w.warmup).forEach(x => out.push(wuStep(x, 'Warm-up', ph)));
  arr(ses.blocks).forEach(b => arr(b.items).forEach(x => { const sets = +((x.sets || {})[ph] || (x.sets || {})['1'] || 1), reps = String((x.reps || {})[ph] || (x.reps || {})['1'] || ''), per = !!x.side || /per side|each side/i.test(reps), alt = altMove(x), mv = pubMove(x);
    out.push({t: 'ex', id: x.id || x.name, name: x.name, how: x.how, cue: x.cue, swap: x.swap, sets: light ? Math.max(1, sets - 1) : sets, reps, kind: x.kind || 'reps', part: b.title || 'Main', fig: x.fig || x.name,
      rest: capRest(+x.rest || REST_MAX), restAfter: x.restAfter != null ? capRest(+x.restAfter || 0) : REST_MAX, side: per && !alt, alt, per, steps: arr(x.steps).filter(Boolean), easier: x.easier || '', harder: x.harder || '', tempo: +x.tempo || 0, tips: arr(x.tips).filter(Boolean).slice(0, 2), load: x.load || '', equip: x.equip || '',
      form: sayLine(x.form) || sayLine(mv.form), breathLine: sayLine(x.breath) || sayLine(mv.breath)}); }));
  // The last move flows straight into the cooldown.
  for (let i = out.length - 1; i >= 0; i--) if (out[i].t === 'ex'){ out[i].restAfter = 0; break; }
  arr((ses && ses.cooldown) || w.cooldown).forEach(x => out.push(wuStep(x, 'Cooldown', ph)));
  return out;
}
// BLD 896 (Chris's Friday notes 2 to 4): a warm-up or cooldown item may carry reps and a tempo (seconds per rep); with Voice Counts
// Reps on, Ava counts it like a set, and a per side item ("10 each side") or a two way item ("5 each way") turns at the half with
// Switch sides or Now the other way. Without reps it keeps its timer, exactly as before. A move's form line (spoken after Go on set 1)
// and breath line (spoken on rep 1 of set 1) ride along from the item, or in public Tending from its move.
const sayLine = v => typeof v === 'string' && v.trim() && !BREATH[v] ? v.trim() : '';
const pubMove = x => { const id = x && x.move; if (!id || !PUB()) return {}; const L = PLIB(); return arr(L && L.moves).find(m => m && m.id === id) || {}; };
function wuStep(x, part, ph){
  const r0 = x.reps && typeof x.reps === 'object' ? (x.reps[ph] || x.reps['1'] || '') : x.reps, rs = String(r0 == null ? '' : r0), n = parseInt(rs, 10) || 0;
  const way = !!n && (x.way === true || (x.side !== true && /each way|each direction|both ways/i.test(rs))), side = !way && !!n && (x.side === true || x.per === true || /each side|per side/i.test(rs)), alt = altMove(x), mv = pubMove(x);
  return {t: 'time', name: x.name, how: x.how, steps: arr(x.steps).filter(Boolean), feel: x.feel || '', easier: x.easier || '', secs: +x.secs || 45, part, fig: x.fig || x.name, half: halfSide(x),
    wreps: n > 0 ? n : 0, wbreath: x.unit === 'breaths', tempo: +x.tempo || +mv.tempo || 0, wturn: side && !alt ? 'side' : way ? 'way' : '', walt: alt && (side || /each side|per side/i.test(rs)),
    form: sayLine(x.form) || sayLine(mv.form), breathLine: sayLine(x.breath) || sayLine(mv.breath)};
}
// How many counts a warm-up item takes per turn (0: it keeps its timer). Counted only with Voice Counts Reps on and a tempo.
const wuN = (st, o) => { if (!st || st.t !== 'time' || st.lines || !st.wreps || !(st.tempo > 0) || (o && (!o.count || o.prac))) return 0; const n = st.wreps * (st.walt ? 2 : 1); return n <= 20 ? n : 0; };
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
// BLD 899 (Chris, October 31, 2026, option 1): every meditation plays on its day's painting (the same one as its card) with a
// candle's flicker and breathing glow, drawn by the stage (GGStage.med, set by shared/med-stage.json). The drawn candle above
// stays for a page without the stage.
function medPaint(o){ const n = ovArtName(o) || 'quiet-meditation', m = /^med-m\d$/.test(n); if (!o.artT) o.artT = Date.now();
  return {art: n, src: WAY(n), lg: m ? WAY(n + '-lg') : '', since: o.artT}; }
const medOp = o => window.GGStage && GGStage.med ? {fig: '', med: medPaint(o)} : {fig: candle()};
// Andrew's kitchen: a simple pot with steam for the stage.
const POT = `<svg viewBox="0 0 240 240" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M52 118h136v54a28 28 0 0 1-28 28H80a28 28 0 0 1-28-28z"/><path d="M40 118h160M52 132H30M188 132h22"/><path class="hj-steam" d="M92 96c-10-12 10-20 0-34M120 96c-10-12 10-20 0-34M148 96c-10-12 10-20 0-34" opacity=".55"/></g></svg>`;
// BLD 892: the day's Flow rotates through the daily sessions only (p1 to p7, style daily), so the new Flow sessions leave the weekday order as it was.
// BLD 894 (Chris, October 29, 2026: "a person who wants the tai chi and stretch can choose those.. strength and yoga.. ok.. all of
// them"): set.flowStyles lists the Flow-type categories a person chose (daily, yoga, taichi, stretch: Flow, Yoga, Balance, Stretch;
// BLD 894 keeps it in step with set.moves), any mix. The Flow days of each week take the chosen styles in turn; within a style, Flow keeps
// its weekday session, Balance goes f7 to f10 in order week to week, and Yoga and Stretch cycle through their sessions. The same date always gives
// the same session. With no set.flowStyles, the day's Flow is the daily rotation p1 to p7, exactly as before.
const FLOW_IDS = ['daily', 'yoga', 'taichi', 'stretch'];
const flowStyles = () => { const L = (H() || {set: {}}).set.flowStyles; return Array.isArray(L) ? FLOW_IDS.filter(x => L.includes(x)) : null; };
const FLOW_EPOCH = new Date(2026, 0, 5, 12);
function flowDayOn(d){ const n = weekNo(d), work = workOn() && n >= 1 && !!sesFor(d); return !flowRest(d, work); }
function flowPick(d){
  const st = flowStyles(), p = PR(); if (!st || !st.length || !p || !arr(p.sessions).length) return null;
  const mon = monOf(d), days = []; for (let i = 0; i < 7; i++){ const x = addD(mon, i); if (flowDayOn(x)) days.push(ymd(x)); }
  const k = Math.max(0, days.indexOf(ymd(d))), n = Math.max(1, days.length), w = Math.round((day0(mon) - day0(FLOW_EPOCH)) / (7 * DAYMS)), seq = w * n + k, md = (a, b) => ((a % b) + b) % b;
  const style = st[md(seq, st.length)], L = p.sessions.filter(x => (x.style || 'daily') === style); if (!L.length) return null;
  if (style === 'daily') return L[(d.getDay() + 6) % 7 % L.length];
  if (style === 'taichi') return L[md(w, L.length)];
  return L[md(Math.floor(seq / st.length), L.length)];
}
const flowStyleList = () => { const pr = arr((PR() || {}).sessions), st = arr((PR() || {}).styles).length ? PR().styles : FLOW_STYLES; return st.filter(x => FLOW_IDS.includes(x.id) && pr.some(y => (y.style || 'daily') === x.id)).map(x => ({id: x.id, name: x.name, line: x.line || '', n: pr.filter(y => (y.style || 'daily') === x.id).length})); };
const flowOnOf = s => Array.isArray(s.flowStyles) ? FLOW_IDS.filter(x => s.flowStyles.includes(x)) : (s.flow || s.track === 'both') ? ['daily'] : [];
function practiceFor(d){ const fp = flowPick(d); if (fp) return fp; const p = PR(); if (!p || !arr(p.sessions).length) return null; const L = p.sessions.filter(x => !x.style || x.style === 'daily'), D0 = L.length ? L : p.sessions; return D0[(d.getDay() + 6) % 7 % D0.length]; }
function buildPractice(s){
  const p = PR(), ss = arr(p && p.sessions).find(x => x.id === s) || practiceFor(new Date()); if (!ss) return null;
  const steps = arr(ss.steps).map(x => ({t: 'time', name: x.name, how: x.how, secs: +x.secs || 60, part: 'Flow', fig: x.fig || 'seat', figKey: true, ease: x.ease, breath: x.breath}));
  return {k: 'work', prac: true, s: ss.id, title: ss.title || 'Flow', lead: ss.focus || '', from: ss.from || '', sources: arr(ss.sources), mins: ss.mins, steps, i: 0, set: 1, done: [], stage: 'start', voice: AVA, music: '/audio/music/calm-' + (1 + (new Date().getDay() % 7)) + '.mp3', key: 'prac'};
}
// Every line, for recording and for tests.
function allLines(){
  if (PUB()) return allLinesPub();
  const out = new Map(), add = (v, t) => { if (t) out.set(v + '|' + t, {voice: v, text: t}); }, w = WK(), app = APP() || {};
  Object.entries(w.sessions || {}).forEach(([id, ses]) => { add(AVA, LN.ses(ses.title || 'Session ' + id, ses.mins || 50));
    ['1', '2', '3'].forEach(ph => [false, true].forEach(light => { const S2 = stepsFor(ses, ph, light); S2.forEach((st, i) => {
      const nx = S2[i + 1];
      if (st.t === 'time'){ add(AVA, LN.time(st)); add(AVA, st.form); add(AVA, st.breathLine); if (nx && nx.t === 'ex') add(AVA, LN.nextRest(GET_READY, nx.name)); }
      else { add(AVA, LN.ex(st)); add(AVA, st.cue); add(AVA, st.form); add(AVA, st.breathLine); add(AVA, LN.rest(st.rest)); for (let n = 2; n <= st.sets; n++) add(AVA, LN.set(n, st.sets)); st.tips.forEach(t => add(AVA, t)); if (st.sets > 1){ if (st.easier) add(AVA, LN.hard(st)); if (st.harder) add(AVA, LN.easy(st)); }
        if (nx && nx.t === 'ex') add(AVA, st.restAfter ? LN.nextRest(st.restAfter, nx.name) : LN.next(nx.name)); }
    }); })); });
  for (let k = 1; k <= 20; k++) add(AVA, LN.count(k));
  [...LN.half, ...LN.weight, LN.last, LN.done, LN.go, LN.ten, LN.nextSet, LN.cool, LN.out, LN.pOut, LN.left, LN.right, LN.sw, LN.way, LN.tap, LN.alt, lightLine('start'), lightLine('end')].forEach(t => add(AVA, t));
  MOT().forEach(t => add(AVA, t));
  const md = app.meditations; arr(md && md.sessions).forEach(s => { add(BRIAN, LN.mIntro(s.title)); arr(s.segments).forEach(g => arr(g.lines).forEach(l => add(BRIAN, l))); }); add(BRIAN, LN.mOut);
  const p = app.practice; arr(p && p.sessions).forEach(s => { add(AVA, LN.pIntro(s.title, s.mins)); arr(s.steps).forEach(x => add(AVA, LN.time({name: x.name, how: x.how}))); });
  ['breakfasts', 'lunches', 'snacks'].forEach(ty => arr((app.dinners || {})[ty]).forEach(x => { if (!arr(x.steps).length) return; add(ANDREW, LN.cIntro(x.name)); arr(x.steps).forEach(s => { const t = typeof s === 'string' ? {t: s} : s; add(ANDREW, t.t); if (+t.min) add(ANDREW, LN.tset(+t.min)); }); }));
  const dn = (app.dinners || {}).weeks || {}; Object.values(dn).forEach(wk => arr(wk.dinners).forEach(x => { add(ANDREW, LN.cIntro(x.name)); arr(x.steps).forEach(s => { const t = typeof s === 'string' ? {t: s} : s; add(ANDREW, t.t); if (+t.min) add(ANDREW, LN.tset(+t.min)); }); }));
  const sp = (app.shop || {}).weeks || {}; Object.values(sp).forEach(wk => ['sunday', 'wednesday', 'batch'].forEach(k => { const x = wk[k]; if (!x) return; add(ANDREW, LN.prepIntro({sunday: 'Sunday Together Prep', wednesday: 'Wednesday Mini Prep', batch: x.title || 'Freezer Batch'}[k]));
    arr(x.steps).forEach(s => { const t = typeof s === 'string' ? {t: s} : s; add(ANDREW, t.t); if (+t.min) add(ANDREW, LN.tset(+t.min)); }); }));
  const bt = app.batches || {}; arr(bt.batches).concat(bt.pack ? [Object.assign({name: bt.pack.title || 'Pack Lunches'}, bt.pack)] : []).forEach(x => { add(ANDREW, LN.prepIntro(x.title || x.name)); arr(x.steps).forEach(s => { const t = typeof s === 'string' ? {t: s} : s; add(ANDREW, t.t); if (+t.min) add(ANDREW, LN.tset(+t.min)); }); });
  if (!KIT()) arr((window.GGTendPublic || {}).recipes).filter(r => r && PARTY_MEALS.includes(r.meal)).forEach(x => { add(ANDREW, LN.cIntro(x.name)); arr(x.steps).forEach(st => { const t = typeof st === 'string' ? {t: st} : st; add(ANDREW, t.t); if (+t.min) add(ANDREW, LN.tset(+t.min)); }); }); // BLD 902
  [LN.tdone, LN.cOut, LN.prepOut].forEach(t => add(ANDREW, t));
  return [...out.values()];
}
// BLD 866: every public line: each level, place, and length's sessions, every Gentle session at every walk week, every recipe.
function allLinesPub(){
  const L = PLIB() || {}, P = TP(), out = new Map(), add = (v, t) => { if (t) out.set(v + '|' + t, {voice: v, text: t}); };
  const sesLines = (sessions, w0) => Object.entries(sessions || {}).forEach(([id, ses]) => {
    [ses.mins].concat(Object.values(ses.minsByPhase || {})).filter(Boolean).forEach(m => add(AVA, LN.ses(ses.title || 'Session ' + id, m)));
    ['1', '2', '3'].forEach(ph => [false, true].forEach(light => { const S2 = stepsFor(ses, ph, light, w0); S2.forEach((st, i) => { const nx = S2[i + 1];
      if (st.t === 'time'){ add(AVA, LN.time(st)); add(AVA, st.form); add(AVA, st.breathLine); if (nx && nx.t === 'ex') add(AVA, LN.nextRest(GET_READY, nx.name)); }
      else { add(AVA, LN.ex(st)); add(AVA, st.cue); add(AVA, st.form); add(AVA, st.breathLine); add(AVA, LN.rest(st.rest)); for (let n = 2; n <= st.sets; n++) add(AVA, LN.set(n, st.sets)); st.tips.forEach(t => add(AVA, t)); if (st.sets > 1){ if (st.easier) add(AVA, LN.hard(st)); if (st.harder) add(AVA, LN.easy(st)); }
        if (nx && nx.t === 'ex') add(AVA, st.restAfter ? LN.nextRest(st.restAfter, nx.name) : LN.next(nx.name)); } }); })); });
  if (P) ['root', 'rise', 'thrive'].forEach(lv => ['home', 'light', 'gym'].forEach(pl => [20, 40, 60].forEach(m => { const b = P.buildSessions(L.moves, L.templates, {level: lv, place: pl, mins: m, warmup: L.warmup, cooldown: L.cooldown}); sesLines(b.sessions, b); })));
  // BLD 892: every track and phase at every level and length, for the old places and the usual equipment sets (a set not listed
  // here still plays; any line it alone needs uses the device voice). Then every move's own lines, whatever set picks it.
  if (P && L.program && L.program.tracks){
    const G = P.GEAR || [], sets = [null, [], ['dumbbells'], ['bands'], ['bar'], ['step'], ['bench'], ['cardio'], ['dumbbells', 'bands'], ['dumbbells', 'bench'], ['dumbbells', 'bands', 'bench'], ['dumbbells', 'bands', 'step'],
      ['dumbbells', 'bands', 'bar', 'dip', 'bench', 'step'], ['bands', 'bar'], ['dumbbells', 'bar'], G];
    ['strength', 'cardio'].forEach(tr => PH_IDS.forEach(ph => { if (!L.program.tracks[tr] || !L.program.tracks[tr][ph]) return;
      ['root', 'rise', 'thrive'].forEach(lv => [20, 40, 60].forEach(m => sets.forEach(g => (g ? [null] : ['home', 'light', 'gym']).forEach(pl => {
        const b = P.buildSessions(L.moves, L.templates, {level: lv, place: pl || 'home', gear: g || undefined, mins: m, warmup: L.warmup, cooldown: L.cooldown, track: tr, phase: ph, program: L.program}); sesLines(b.sessions, b); })))); }));
    arr(L.moves).forEach(mv => { add(AVA, mv.cue); add(AVA, sayLine(mv.form)); add(AVA, sayLine(mv.breath)); arr(mv.tips).slice(0, 2).forEach(t => add(AVA, t)); if (mv.easier) add(AVA, LN.hard(mv)); if (mv.harder) add(AVA, LN.easy(mv)); });
  }
  const G = L.gentle || {}, walks = [...new Set(arr(G.walkWeeks).map(x => +x.mins).filter(Boolean))];
  (walks.length ? walks : [0]).forEach(wm => { const ses = {}; arr(G.sessions).forEach((x, i) => { const c = JSON.parse(JSON.stringify(x));
    if (wm) arr(c.blocks).forEach(b => arr(b.items).forEach(it => { if (/steady walk/i.test(it.name || '')) it.reps = {'1': String(wm * 60), '2': String(wm * 60), '3': String(wm * 60)}; })); ses[x.id || 'G' + i] = c; });
    sesLines(ses, {warmup: arr(G.warmup), cooldown: arr(G.cooldown)}); });
  for (let k = 1; k <= 20; k++) add(AVA, LN.count(k));
  [...LN.half, ...LN.weight, LN.last, LN.done, LN.go, LN.ten, LN.nextSet, LN.cool, LN.out, LN.pOut, LN.left, LN.right, LN.sw, LN.way, LN.tap, LN.alt].forEach(t => add(AVA, t));
  arr(L.motivation).forEach(t => add(AVA, t));
  const app = L.app || {}, md = app.meditations; arr(md && md.sessions).forEach(x => { add(BRIAN, LN.mIntro(x.title)); arr(x.segments).forEach(g => arr(g.lines).forEach(l => add(BRIAN, l))); }); add(BRIAN, LN.mOut);
  const pr = app.practice; arr(pr && pr.sessions).forEach(x => { add(AVA, LN.pIntro(x.title, x.mins)); arr(x.steps).forEach(y => add(AVA, LN.time({name: y.name, how: y.how}))); });
  arr(L.recipes).concat(P && P.LEFT ? [P.LEFT] : []).forEach(x => { add(ANDREW, LN.cIntro(x.name)); arr(x.steps).forEach(st => { const t = typeof st === 'string' ? {t: st} : st; add(ANDREW, t.t); if (+t.min) add(ANDREW, LN.tset(+t.min)); }); });
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
    if (st.t === 'time'){ const wn = wuN(st, o), turns = st.wturn ? 2 : 1;
      s += (wn ? wn * st.tempo * turns + lineSecs(LN.go) + (st.wturn ? lineSecs(LN.sw) + 1 : 0) + (st.form ? lineSecs(st.form) : 0) + (st.breathLine ? lineSecs(st.breathLine) : 0) : st.secs) + (st.lines ? arr(st.lines).reduce((a, l) => a + lineSecs(l) + 0.8, 0) : lineSecs(LN.time(st))) + (st.half && !wn ? lineSecs(LN.sw) : 0);
      if (!st.lines && st.part === 'Cooldown' && steps[i - 1] && steps[i - 1].part !== 'Cooldown' && !(o && o.prac)) s += lineSecs(LN.cool);
      if (nx && nx.t === 'ex') s += GET_READY; return; }
    const first = i === at ? (set0 || 1) : 1, left = Math.max(0, st.sets - first + 1), sides = st.side ? 2 : 1;
    const work = st.kind === 'time' ? workSecs(st) : repN(st) ? repN(st) * tempoOf(st) : o && o.hands === false ? TAP_EST : WORD_REPS * tempoOf(st);
    const perSet = lineSecs(LN.go) + sides * work + (st.side ? 2 * lineSecs(LN.left) + lineSecs(LN.sw) + SWITCH : 0) + (repN(st) || st.kind === 'time' ? 0 : 2);
    s += (first === 1 ? lineSecs(LN.ex(st)) + (st.alt ? lineSecs(LN.alt) : 0) + (st.cue ? lineSecs(st.cue) : 0) + (st.form ? lineSecs(st.form) : 0) + (st.breathLine && repN(st) && o && o.count ? lineSecs(st.breathLine) : 0) : 0) + left * perSet + Math.max(0, left - 1) * (st.rest + lineSecs(LN.set(2, 3)));
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
async function runTimer(o, ms, kind, half, onTick){
  o.end = Date.now() + ms; o.tot = ms; o.run = true; o.rest = kind === 'rest'; o.sw = kind === 'switch'; let said10 = false, saidHalf = false, last = 99;
  // BLD 897: a hold done on each side shows the Left Side chip (and the figure on its left side) until the half, then the right.
  if (half) o.side = 'L'; rerender(true);
  while (!o.dead && !o.skip){
    if (o.paused){ const left = o.end - Date.now(); await hold(o); o.end = Date.now() + left; continue; }
    const left = o.end - Date.now(); if (left <= 0) break;
    const s = Math.ceil(left / 1000);
    if ((kind === 'rest' || kind === 'between') && s === 10 && !said10 && ms > 15000){ said10 = true; if (!o.spk) speak(o, LN.ten); }
    if (half && !saidHalf && left <= o.tot / 2){ saidHalf = true; o.side = 'R'; speak(o, LN.sw); rerender(true); }
    if (onTick) onTick(left);
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
    const lead = o.set === 1 && k === 0;
    if (st.kind === 'time'){ if (lead && st.form){ lg(o, {e: 'form'}); await speak(o, st.form); } await speak(o, LN.go); lg(o, {e: 'hold'}); o.ring = true; await runTimer(o, workSecs(st) * 1000, ''); o.ring = false; }
    else if (o.count && repN(st)){ // Chris (November 1, 2026): every instruction first, then Go, then the count.
      if (lead && st.form){ lg(o, {e: 'form'}); await speak(o, st.form); }
      if (lead && st.breathLine){ lg(o, {e: 'breath'}); await speak(o, st.breathLine); }
      await speak(o, LN.go);
      o.rep = 0; o.ring = true; await beats(o, repN(st), tempoOf(st));
      o.rep = 0; if (o.ring){ o.ring = false; rerender(true); } }
    else if (o.hands !== false) await hfSet(o, st, k === sides.length - 1, lead);
    else { if (lead && st.form) await speak(o, st.form); await speak(o, LN.go); if (o.set === 1 && k === 0 && !repN(st)) speak(o, LN.tap); await waitTap(o); }
    if (o.skip && k < sides.length - 1 && !o.skipMove) o.skip = false;
  }
  o.side = ''; o.rep = 0;
}
// Auto Flow (BLD 891): a set of reps timed at the move's tempo. Ava says Go, a halfway line, Last few, and Set done; the ring
// drains and the last three seconds tick. Set Done ends it early; Pause holds it.
async function hfSet(o, st, lastSide, lead){
  const n = repN(st) || WORD_REPS, t = tempoOf(st), secs = Math.max(8, n * t), lastAt = Math.min(3, Math.floor(n / 3)) * t;
  let saidHalf = false, saidLast = false; o.hf = true;
  if (lead && st.form && !o.dead){ lg(o, {e: 'form'}); await speak(o, st.form); }
  if (lead && st.breathLine && !o.dead){ lg(o, {e: 'breath'}); await speak(o, st.breathLine); }
  await speak(o, LN.go); lg(o, {e: 'hf', secs}); o.ring = true;
  await runTimer(o, secs * 1000, '', false, left => { const s2 = left / 1000;
    if (o.ring && secs - s2 >= RING_REPS * t){ o.ring = false; rerender(true); }
    if (!saidHalf && secs >= 16 && s2 <= secs / 2 && s2 > lastAt + 2){ saidHalf = true; if (!o.spk) speak(o, LN.half[(o.hi = (o.hi || 0) + 1) % LN.half.length]); }
    if (!saidLast && n >= 6 && s2 <= lastAt){ saidLast = true; if (!o.spk) speak(o, LN.last); } });
  o.hf = false; o.ring = false; if (!o.dead && lastSide) await speak(o, LN.done);
}
// BLD 896 (note 6): the breath ring on the first three reps of set 1, timed from the tempo: breathe in on the lowering (about
// six tenths of the rep), out on the push. A quick move (under 2 seconds a rep) takes one breath over two reps.
// BLD 897 (breath first, Grounded's niche): the tree breath guide shows on every rep of every set, so RING_REPS no longer ends it.
const RING_REPS = Infinity;
function repBreath(st){ const t = tempoOf(st), per = t < 2 ? t * 2 : t; if (per <= 2) return [1, 1]; const i = Math.round(per * 6) / 10; return [i, Math.round((per - i) * 10) / 10]; }
const repShow = r => { const els = document.querySelectorAll('[data-hjrep]'); if (!els.length) return rerender(true); els.forEach(e => e.textContent = r);
  const g = document.querySelector('.hj-stagebox [data-ggstage]'); if (g && window.GGStage && GGStage.update){ try { GGStage.update(g, {rep: r}); } catch(e){} } };
// BLD 896 (note 9): the figure starts its loop again on each counted rep, so it moves with Ava's count. GGMoves.restart (FIG) when
// the page has it; else the figure's own clock goes back to the start (an alternating move every other rep, its loop is two reps).
function figRep(st, r){ const M = window.GGMoves, two = !!(st && (st.alt || st.walt));
  document.querySelectorAll('.hj-stagebox svg.gg-move').forEach(el => { try { if (M && typeof M.restart === 'function') M.restart(el, {rep: r, alt: two, tempo: tempoOf(st)}); else if (el.setCurrentTime && (!two || r % 2 === 1)) el.setCurrentTime(0); } catch(e){} }); }
// ---------- BLD 898: one clock for the figure, the breath ring, and the count ----------
// (Chris, October 31, 2026: "the count, the breath and the movements were way out of sync".) o.clk.t0 is when the loop began
// (Date.now() time). Every planned figure and breath ring on the stage (svg[data-dur]) is held to it: clkSync seeks any that
// drift past 40 ms (after a redraw, a pause, a slow tab), holds them while paused, and slides t0 forward by the pause.
const clkKey = o => [o.i, o.set, o.side || '', o.rest ? 1 : 0, o.between ? 1 : 0, o.sw ? 1 : 0, o.run ? 1 : 0, o.bk || 0].join('|');
function clkOn(o, t0){ o.clk = {key: clkKey(o), t0: t0 == null ? Date.now() : t0, p: null, beat: false}; return o.clk; }
function clkSync(o){
  if (!o || !o.clk) return; const c = o.clk, now = Date.now();
  if (o.paused && c.p == null) c.p = now; else if (!o.paused && c.p != null){ c.t0 += now - c.p; c.p = null; }
  const el = ((c.p != null ? c.p : now) - c.t0) / 1000, hold = c.p != null || el < 0; c.s = now; c.el = el; c.tl = document.timeline ? document.timeline.currentTime : null;
  document.querySelectorAll('.hj-stagebox svg[data-dur]').forEach(s => { const d = +s.getAttribute('data-dur'); if (!(d > 0) || !s.setCurrentTime) return;
    try { const want = el <= 0 ? 0 : el % d, x = (((s.getCurrentTime() - want) % d) + d) % d; if (Math.min(x, d - x) > 0.04) s.setCurrentTime(want);
      if (hold && !s.animationsPaused()) s.pauseAnimations(); else if (!hold && s.animationsPaused()) s.unpauseAnimations(); } catch(e){} });
}
setInterval(() => { const o = S.ov; if (o && o.clk && o.mode === 'auto' && !o.fin) clkSync(o); }, 100);
// Count n reps of t seconds on that clock. The first beat comes a moment after the call (BEAT_LEAD), so Ava's One can be
// scheduled exactly. Before each beat the count is handed to the voice for that instant (GGVoice.at: a decoded clip starts
// past its lead in silence; a clip still downloading is left out rather than said late); at the beat the number shows.
// A paused set holds the clock and goes on from the same place; Skip ends it.
const BEAT_LEAD = 400;
async function beats(o, n, t, keep){
  const V = VO(), vo = o.voice || AVA; o.bk = (o.bk || 0) + 1; o.rep = 0;
  if (V && V.prime) V.prime(vo, Array.from({length: n}, (x, k) => LN.count(k + 1)));
  const c = clkOn(o, Date.now() + BEAT_LEAD); c.beat = true; rerender(true); lg(o, {e: 'beats', n, t, t0: c.t0});
  const at = r => c.t0 + (r - 1) * t * 1000, wake = async (ms, early) => { while (!o.dead && !o.skip){ await hold(o); clkSync(o); const left = ms() - Date.now() - early; if (left <= 0) return true; await sleep(Math.min(100, left)); } return false; };
  for (let r = 1; r <= n; r++){
    if (!(await wake(() => at(r), 150))) break;
    const when = at(r), txt = LN.count(r); lg(o, {e: 'count', r, when});
    if (V && V.at) V.at(vo, txt, when); else if (V) speak(o, txt);
    const w = when - Date.now(); if (w > 0) await sleep(w);
    if (o.dead || o.skip) break; o.rep = r;
    if (o.ring && !keep && (r === 1 || r > RING_REPS)){ if (r > RING_REPS) o.ring = false; rerender(true); } else if (r === 1) rerender(true); else repShow(r);
    figRep(o.steps[o.i], r);   // the same place the clock gives (BLD 896 FIG's restart on each count)
  }
  if (!o.dead && !o.skip) await wake(() => at(n + 1), 0);
  c.beat = false;
}
// A counted warm-up or cooldown item: its form and breath lines, then Go, then each rep counted at its tempo; a per side or two way item turns at the half.
async function wuCount(o, st){
  const n = wuN(st, o), turns = st.wturn ? 2 : 1; lg(o, {e: 'wcount', n, turns}); o.ring = true; if (st.wturn === 'side') o.side = 'L';
  for (let k = 0; k < turns && !o.dead && !o.skip; k++){
    if (k){ o.side = st.wturn === 'side' ? 'R' : ''; o.rep = 0; rerender(true); lg(o, {e: 'turn', w: st.wturn}); await speak(o, st.wturn === 'side' ? LN.sw : LN.way); await snooze(o, 1000); if (o.skip || o.dead) break; }
    else { if (st.form){ lg(o, {e: 'form'}); await speak(o, st.form); } if (st.breathLine && !o.dead && !o.skip){ lg(o, {e: 'breath'}); await speak(o, st.breathLine); } await speak(o, LN.go); }
    await beats(o, n, st.tempo, !!st.wbreath);
  }
  o.rep = 0; o.side = ''; o.ring = false;
}
// What Ava says in a rest between sets, here and there (BLD 891): after the first set the easier and harder versions, after the
// second a weight line for a move with a weight, otherwise a motivation line.
function restLines(o, st){
  if (o.set === 1 && (st.easier || st.harder)) return [st.easier ? LN.hard(st) : '', st.harder ? LN.easy(st) : ''].filter(Boolean);
  if (o.set === 2 && loaded(st)) return [LN.weight[(o.wi = (o.wi == null ? 0 : o.wi + 1)) % LN.weight.length]];
  const m = motLine(o); return m ? [m] : [];
}
// The rest before a move: Next up, its tips, its weight line, and a draining ring.
async function between(o, nx, secs){
  if (!secs){ await speak(o, LN.next(nx.name)); return; }
  o.between = true; lg(o, {e: 'between', secs});
  const wl = loaded(nx) && !o.wfirst ? (o.wfirst = true, LN.weight[0]) : '';
  (async () => { await speak(o, LN.nextRest(secs, nx.name)); for (const t of arr(nx.tips).concat(wl ? [wl] : [])){ if (o.dead || !o.between) break; await speak(o, t); } })();
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
  // BLD 898: Ava's counts download and decode now, so every count is ready for its beat.
  if (V && V.prime && !o.prac) V.prime(o.voice || AVA, Array.from({length: 20}, (x, k) => LN.count(k + 1)));
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
      if (!o.skip){ if (wuN(st, o)) await wuCount(o, st); else await runTimer(o, st.secs * 1000, '', st.half); }
      o.done.push(o.i); o.i++; o.set = 1; o.skip = false;
      const nx = o.steps[o.i]; if (nx && nx.t === 'ex' && !o.dead) await between(o, nx, GET_READY);
      continue;
    }
    if (o.set === 1){ await speak(o, LN.ex(st)); if (st.alt) await speak(o, LN.alt); if (st.cue) await speak(o, st.cue); } else await speak(o, LN.set(o.set, st.sets));
    await hold(o); if (o.dead) break;
    await doSet(o, st);
    if (o.dead) break;
    lg(o, {e: 'set'});
    const skipMove = o.skipMove; o.skip = false; o.skipMove = false;
    if (!skipMove && o.set < st.sets){ const r = st.rest, rl = restLines(o, st); lg(o, {e: 'rest', secs: r}); o.mline = rl.join(' '); o.mcoach = /^Too (hard|easy)\?/.test(rl[0] || '');
      (async () => { await speak(o, LN.rest(r)); for (const l of rl){ if (!o.rest || o.dead) break; await speak(o, l); } })();
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
// BLD 898: the pattern and options a step's figure is drawn with; ex adds {breath: [in, out]} (a Flow step's breath key) or
// {pose} (a held pose). The body takes the posture the step's words name (a standing breath stands, a seated march sits).
function figSpec(st, still, ex){ const M = window.GGMoves; if (!M || !st) return null;
  const p0 = st.figKey ? (M.pick ? M.pick(st.fig, st.name) : st.fig) : (st.fig && arr(M.patterns).includes(st.fig) ? (M.refine ? M.refine(st.fig, st.name) : st.fig) : M.of ? M.of(st.fig || st.name) : 'standing'), op = {size: 214, still: !!still};
  const pat = M.fit ? M.fit(p0, st.name, st.how || '') : p0;
  if (!st.figKey && (+st.tempo > 0 || (st.t === 'ex' && st.kind !== 'time'))){ op.tempo = tempoOf(st); op.alt = !!(st.alt || st.walt); }
  if (ex && !still) Object.assign(op, ex);
  return {M, pat, op}; }
function figPlan(st, ex){ try { const f = figSpec(st, false, ex); return f && f.M.plan && !f.op.still && f.op.pose == null && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) ? f.M.plan(f.pat, f.op) : null; } catch(e){ return null; } }
function moveFig(st, flip, still, ex){ const f = figSpec(st, still, ex); if (!f) return ''; try { const M = f.M, pat = f.pat, op = f.op;
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
  // BLD 900: a figure that the 3D stage will draw waits on the painting with a calm placeholder (no simple figure first).
  const wait = !fb && /gg-move/.test(String(op.fig || '')) && fig3dWait();
  return `<div class="hj-stagebox${fb ? ' fb' : ''}${op.small ? ' sm' : ''}${wait ? ' g3-wait' : ''}" aria-hidden="true">${inner}</div>`; }
function stageUpd(pct, secs){ const el = document.querySelector('[data-ggstage]'); if (!el) return;
  if (window.GGStage && GGStage.update){ try { GGStage.update(el, {pct, secs}); } catch(e){} return; }
  const r = el.querySelector('.hj-ring'); if (r){ r.style.setProperty('--p', pct.toFixed(3)); const b = r.querySelector('b'); if (b && secs != null) b.textContent = secs; } }
// ---------- BLD 897: the 3D stage (shared/fig3d/gg-fig3d.js) ----------
// Chris, October 31, 2026: the 3D figure inside the painting's own room, in every player. The player keeps drawing its SVG figure
// on the one clock (BLD 898); the 3D stage, loaded only when a player with a figure opens, follows that figure's own time, so
// the body, the tree, and the count stay together. Without WebGL, with Save Data, or with the Simple Figure setting, the SVG shows.
const FIG3D = 'shared/fig3d/gg-fig3d.js?v=b900';
function fig3dBody(){ const h = H(), x = h && h.set ? h.set.sex || (h.set.prevent || {}).sex : ''; return x === 'f' ? 'woman' : x === 'm' ? 'man' : ''; }
function fig3dCtx(o){ const art = ovArtName(o), cat = o.prac ? 'flow' : o.med ? 'gentle' : 'strength', steps = arr(o.steps);
  const st = o.stage === 'start' ? steps.find(s => s.t === 'ex') || steps[0] : steps[o.i] || {};
  return {art, kind: 'move', category: cat, workout: o.s || '', name: (o.swap && st.swap) || st.name || '', side: o.stage === 'start' ? '' : o.side || ''}; }
function fig3d(){
  const o = S.ov, G = window.GGFig3D;
  if (!o || !document.querySelector('.hj-stagebox svg.gg-move')){ if (G) G.detach(); return; }
  // BLD 900: a player that waited past about 6 s keeps the simple figure to its end (the bundle keeps loading for the next one).
  if (o === fig3d.late){ if (G){ G.detach(); G.load(); } return; }
  if (document.querySelector('.hj-stagebox.g3-wait')) fig3dTimer(o);
  if (G){ G.profileBody = fig3dBody; G.sync(fig3dCtx(o)); return; }
  if (/[?&]fig=svg\b/.test(location.search)) return;
  // 3D off for this device: the simple figure shows at once; the small adapter still loads (never the engine) so the
  // player can offer the 3D Figure setting wherever WebGL exists.
  try { if (localStorage.getItem('gg-fig3d') === 'off') return; } catch(e){}
  if (!fig3dLikely()) fig3dUnwait();
  fig3dScript();
}
// BLD 900 (Chris, live test, Full Body Strength: "very first screen ... shows the old stick figure for about 1 sec"). The 3D
// stage starts loading as soon as a player's start screen opens, and earlier, quietly, once the My Health view or the Home's
// Today shows (warm). Until the 3D stage is ready, the stage shows its painting with a calm placeholder: no figure, a soft
// light breathing on the floor. The simple figure shows only when 3D is off for this device (no WebGL, software drawing
// without the setting, Save Data, the Simple Figure setting), when the bundle fails, or when it takes over about 6 s.
const FIG3D_WAIT = 6000;
function fig3dScript(){
  if (fig3d.p) return fig3d.p;
  return (fig3d.p = new Promise(res => { const el = document.createElement('script'); el.src = asset(FIG3D); el.async = true;
    el.onload = () => { res(); if (window.GGFig3D){ if (S.ov) { fig3d(); rerenderSoon(); } else if (GGFig3D.ok()) GGFig3D.load(); } else fig3dUnwait(); };
    el.onerror = () => { res(); fig3d.failed = true; fig3dUnwait(); }; document.head.appendChild(el); }));
}
let GLP = null;
function glProbe(){
  if (GLP) return GLP; GLP = {gl: false, soft: false};
  try { const c = document.createElement('canvas'), g = c.getContext('webgl2') || c.getContext('webgl');
    if (g){ GLP.gl = true; const x = g.getExtension('WEBGL_debug_renderer_info'), r = String(x ? g.getParameter(x.UNMASKED_RENDERER_WEBGL) : g.getParameter(g.RENDERER) || '');
      GLP.soft = /swiftshader|llvmpipe|softpipe|software|basic render/i.test(r); const lc = g.getExtension('WEBGL_lose_context'); if (lc) lc.loseContext(); } } catch(e){}
  return GLP;
}
// The same choice gg-fig3d.js makes (ok()), before it has loaded.
function fig3dLikely(){
  const G = window.GGFig3D; if (G) return G.ok();
  if (fig3d.failed || /[?&]fig=svg\b/.test(location.search)) return false;
  let pf = null; try { pf = localStorage.getItem('gg-fig3d'); } catch(e){}
  if (pf === 'off') return false;
  try { if (navigator.connection && navigator.connection.saveData) return false; } catch(e){}
  try { if (window.matchMedia && matchMedia('(prefers-reduced-data: reduce)').matches) return false; } catch(e){}
  const w = glProbe(); return w.gl && (!w.soft || pf === 'on');
}
function fig3dWait(){ return !!S.ov && S.ov !== fig3d.late && fig3dLikely(); }
function fig3dUnwait(){ document.querySelectorAll('.hj-stagebox.g3-wait').forEach(b => b.classList.remove('g3-wait')); }
function fig3dTimer(o){
  if (fig3d.tov === o) return; fig3d.tov = o;
  setTimeout(() => { if (S.ov !== o || document.querySelector('.hj-stagebox.g3-on') || (window.GGFig3D && GGFig3D.state().ready)) return;
    fig3d.late = o; if (window.GGFig3D) GGFig3D.detach(); fig3dUnwait(); }, FIG3D_WAIT);
}
function fig3dWarm(){
  if (fig3d.p || fig3d.warm) return; fig3d.warm = 1;
  setTimeout(() => { const go = () => { if (!fig3d.p && fig3dLikely()) fig3dScript(); }; if (window.requestIdleCallback) requestIdleCallback(go, {timeout: 3000}); else go(); }, 1200);
}
// The figure chips (3D or simple, the man or the woman) appear once the 3D stage knows this device can draw it.
// They join the open player's chips in place (no redraw, so the painting and the figure carry on undisturbed).
function rerenderSoon(){ const tg = document.querySelector('.hj-ov .hj-tg'); if (!S.ov || !tg || tg.querySelector('[data-hja="tfig3d"]')) return; const h = figChips(); if (h) tg.insertAdjacentHTML('beforeend', h); }
function figChips(){
  const G = window.GGFig3D; if (!G || !(G.able ? G.able() : G.ok())) return '';
  const off = !G.ok();
  const b = G.body();
  return `<button type="button" class="chip${off ? '' : ' on'}" aria-pressed="${!off}" data-hja="tfig3d">${off ? 'Simple Figure' : '3D Figure'}</button>` +
    (off ? '' : `<button type="button" class="chip on" aria-pressed="true" data-hja="tfigbody">${b === 'woman' ? 'Figure: Woman' : 'Figure: Man'}</button>`);
}
// Which state the open player is in.
function stState(o){
  if (!o) return 'work';
  if (o.k === 'quiet') return o.fin ? 'done' : 'med';
  if (o.k === 'cook' || o.k === 'prep') return 'cook';
  if (o.k === 'med' || o.med) return o.fin ? 'done' : 'med';
  if (o.fin) return 'done';
  if (o.stage === 'start') return o.prac ? 'practice' : 'next';
  const st = o.steps && o.steps[o.i]; if (!st) return 'done';
  if (o.between) return 'next';
  if (o.rest || o.sw) return 'rest';
  // BLD 896: most Flow steps now carry a breath key for the ring; the breathe color stays for steps whose main work is breathing.
  if (o.prac) return st.breath && /breath|breathing|pranayama/i.test(st.name || '') ? 'breathe' : 'practice';
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
    ${o && !o.prac ? `<button type="button" class="chip${o.hands !== false ? ' on' : ''}" aria-pressed="${o.hands !== false}" data-hja="thands">${o.hands !== false ? 'Auto Flow On' : 'Auto Flow Off'}</button><button type="button" class="chip${o.count ? ' on' : ''}" aria-pressed="${!!o.count}" data-hja="tcount">${o.count ? 'Voice Counts Reps' : o.hands !== false ? 'Quiet Timed Reps' : 'I Tap Done'}</button>` : ''}${o ? figChips() : ''}</div>`;
}
// BLD 896 (Chris's Friday note 4): the Move Well card on a workout's start screen, shown only (folded until opened): the library's
// principles at workouts.moveWell (the Guide library) or program.moveWell (public Tending). A list of lines, or {lead, items},
// each item a line or {name, line}.
// BLD 897: the form line (each move's injury protection line) shows on the panel the whole time the move plays.
const formLine = st => st && st.form ? `<p class="hj-form"><span>Form</span>${esc(st.form)}</p>` : '';
function moveWell(){
  const w = WK(), mw = w.moveWell || (w.program || {}).moveWell || ((PLIB() || {}).program || {}).moveWell; if (!mw) return '';
  const items = Array.isArray(mw) ? mw : arr(mw.items || mw.points || mw.principles), lead = Array.isArray(mw) ? '' : mw.lead || mw.line || ''; if (!items.length) return '';
  const li = x => typeof x === 'string' ? esc(x) : `${x.name || x.title ? `<b>${esc(x.name || x.title)}.</b> ` : ''}${esc(x.line || x.text || x.how || '')}`;
  return `<details class="hj-doc hj-mw" data-hjmw style="text-align:left;margin-top:16px"><summary><span>Move Well</span></summary><div class="hj-body">${lead ? `<p class="hj-mwl">${esc(lead)}</p>` : ''}<ol>${items.map(x => `<li>${li(x)}</li>`).join('')}</ol></div></details>`;
}
function vStart(o, top){
  const moves = o.steps.filter(s => s.t === 'ex'), mins = o.prac || o.med ? (o.mins || Math.round(estLeft(o) / 60000)) : Math.max(1, Math.round(estLeft(o) / 60000 + (lineSecs(LN.ses(o.title, 50)) + lineSecs(LN.out)) / 60));
  const kit = !o.med && !o.prac && PUB() ? [...new Set(moves.map(m => m.equip).filter(Boolean))] : o.med ? ['a comfortable seat'] : !o.prac ? ['dumbbells', 'bench', 'pull-up bar', 'dip bar', 'mat'].filter(k => moves.some(m => new RegExp(k.split(' ')[0].replace('dumbbells', 'dumbbell'), 'i').test((m.name || '') + ' ' + (m.how || '')))) : ['a mat or a cushion', 'water'];
  const st0 = o.steps.find(s => s.t === 'ex') || o.steps[0], lt = !o.prac && lightLine('start');
  const pl = !o.prac && !o.med && progOn() ? progLabel(new Date()) : '';
  return `${top(o.title, o.med ? 'Daily Meditation' : o.prac ? 'Flow' : 'Today\'s Session', null)}${stagePanel(stState(o), o.med ? medOp(o) : {fig: moveFig(st0)})}<div class="hj-ovb">
    ${pl ? `<p class="hj-prog">${esc(pl)}</p>` : ''}${o.prac && o.from ? `<p class="hj-from">${esc(o.from)}</p>` : ''}<div class="hj-big2" style="margin-top:6px">${esc(String(mins))} minutes</div>
    <p class="hj-sub">${o.prac ? esc(o.lead || '') : `${moves.length} moves, with a warm-up and a cooldown, and a rest between moves.`}${kit.length ? ' Have ready: ' + esc(kit.join(', ')) + '.' : ''}</p>
    ${lt ? `<p class="hj-light">${esc(lt)}</p>` : ''}
    ${o.prac && (PR() || {}).safety ? `<p class="hj-note" style="text-align:left">${esc(PR().safety)}</p>` : ''}
    ${toggles(o)}
    ${!o.prac && o.hands !== false ? `<p class="hj-note hj-hfnote">Auto Flow: the session moves on its own, start to finish, with every set counted or timed for you. Need more time? Tap Pause anytime.</p>` : ''}
    <button type="button" class="btn btn-gold hj-go" data-hja="play">Play ${o.med ? 'Meditation' : o.prac ? 'Flow' : 'Session'}</button>
    <div class="hj-ovbtns"><button type="button" class="btn btn-line" data-hja="manual">Step Through</button><button type="button" class="btn btn-line" data-hja="didit">I Did It</button></div>
    ${!o.prac && !o.med ? moveWell() : ''}
    <details class="hj-doc hj-mlist" style="text-align:left;margin-top:16px"${o.steps.length <= 16 ? ' open' : ''}><summary><span>What is in it</span></summary><div class="hj-body"><ol>${o.steps.map(s => `<li>${esc(s.name)}${s.t === 'ex' ? ` <small>${esc(s.sets + ' x ' + repLine(s))}</small>` : ` <small>${Math.round(s.secs / 6) / 10} min</small>`}</li>`).join('')}</ol>${o.med ? '' : o.prac ? srcLine(o.sources) : coachSrc() + srcLine(progSrc(o.s))}</div></details></div>`;
}
function doneBlock(o, title){ const lt = !o.prac && lightLine('end'), wr = !o.prac && weightRule();
  return `${stagePanel('done', o.med ? medOp(o) : {fig: ''})}<div class="hj-ovb"><div class="hj-big2">${esc(title)}</div><p class="hj-sub">Time: ${esc(clock(o.active || 0))}.</p>
    ${lt ? `<p class="hj-light">${esc(lt)}</p>` : ''}${wr ? `<p class="hj-sub">${esc(wr)}</p>` : ''}
    <label class="hj-fld" style="text-align:left"><span>How did it feel? (optional)</span><input id="hj-wnote" placeholder="${o.prac ? 'Calm, loose, clear...' : 'Felt strong, knees easy...'}"></label>
    <button type="button" class="btn btn-gold hj-go" data-hja="wsave">Save</button></div>`; }
function vAuto(o, top){
  const st = o.steps[o.i], pct = Math.round(100 * o.i / o.steps.length);
  if (o.fin || !st) return `${top(o.title, o.prac ? (o.med ? 'Meditation complete' : 'Flow complete') : 'Session complete', 100)}${doneBlock(o, o.prac ? 'Well done.' : 'Strong work.')}`;
  const state = stState(o), left = o.run ? Math.max(0, o.end - Date.now()) : 0, ring = o.run && (o.rest || o.between || o.sw) ? {pct: left / (o.tot || 1), secs: Math.ceil(left / 1000)} : {};
  // BLD 898: one timeline. The figure's moves set the breath ring's phases (GGMoves.plan): a Flow step's breath key paces the
  // figure, a counted or timed rep paces both, and the clock (clkSync) starts them together on each count.
  const still = !!(o.rest || o.between), ringNow = !!(o.ring && !o.rest && !o.between && !o.sw);
  let br = st.breath ? BREATH[st.breath] || BREATH.long : o.prac && st.t === 'time' && !st.lines && !st.candle && !still ? BREATH.slow : state === 'breathe' && /breath/i.test(st.name) ? BREATH.slow : ringNow && st.wbreath ? [Math.round(st.tempo * 4) / 10, Math.round(st.tempo * 6) / 10] : null;
  const fex = br && !still && !st.candle ? (st.breath === 'fire' ? {pose: 1} : {breath: br}) : null, pl = st.candle ? null : figPlan(st, fex);
  let phases = null;
  if (pl && br && fex && fex.breath) phases = pl.phases;
  else if (ringNow && (st.t === 'ex' || (o.rep && +st.tempo > 0))){ const t = tempoOf(st); if (pl && t >= 2) phases = pl.phases; else if (pl) phases = [{k: 'in', d: t}, {k: 'out', d: t}]; else br = repBreath(st); }
  if (pl && (!o.clk || (o.clk.key !== clkKey(o) && !o.clk.beat))) clkOn(o);
  const flip = o.side === 'L', pill = st.t === 'ex' ? (o.between ? 'Next Up' : o.rest ? (o.set + 1 === st.sets ? 'Last Set Next' : 'Set ' + (o.set + 1) + ' Next') : o.set === st.sets && st.sets > 1 ? 'Last Set' : 'Set ' + o.set + ' of ' + st.sets) : '';
  // BLD 897: the count is the ink numeral on the stage (top right), with the progress line under the figure.
  const cntOf = o.rep && !o.run ? (st.t === 'ex' ? repN(st) : wuN(st, o)) || 0 : 0;
  const sop = Object.assign({fig: st.candle ? medOp(o).fig : moveFig(st, flip, still, fex), med: st.candle ? medPaint(o) : undefined, side: o.side || '', label: pill, count: cntOf ? {n: o.rep, of: cntOf} : undefined, inhale: phases ? phases.filter(x => x.k !== 'out').reduce((a, x) => a + x.d, 0) : br ? br[0] : undefined, exhale: phases ? phases.filter(x => x.k === 'out').reduce((a, x) => a + x.d, 0) : br ? br[1] : undefined, phases: phases || undefined}, ring);
  const big = o.run ? `<div class="hj-clock" data-hjclock>${clock(left)}</div>` : o.rep && cntOf ? (st.t === 'ex' ? `<div class="hj-reps">${esc(repLine(st))}</div>` : '') : o.rep ? `<div class="hj-clock" data-hjrep>${o.rep}</div>${st.t === 'ex' ? `<div class="hj-reps hj-repsof">${esc(repLine(st))}</div>` : ''}` : st.t === 'ex' ? `<div class="hj-reps">${esc(repLine(st))}</div>` : `<div class="hj-clock" data-hjclock>${clock(st.secs * 1000)}</div>`;
  const sideTxt = o.side === 'L' ? ' · Left side' : o.side === 'R' ? ' · Right side' : '';
  const label = o.between ? 'Rest, then next up' : o.sw ? 'Switch sides' : o.rest ? `Rest, then ${o.set + 1 === st.sets ? 'the last set' : 'set ' + (o.set + 1) + ' of ' + st.sets}` : st.t === 'ex' ? (o.set === st.sets && st.sets > 1 ? 'Last set' : `Set ${o.set} of ${st.sets}`) + sideTxt : st.part + sideTxt;
  let detail;
  if (o.between) detail = `${arr(st.tips).length ? `<ul class="hj-tips">${st.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : `<p class="hj-how">${esc(st.how || '')}</p>`}${weightBox(st)}`;
  else if (o.rest) detail = `${o.mcoach ? modsBlock(st, ['easier', 'harder']) : `<p class="hj-mot">${esc(o.mline || 'Breathe slow. Sip water.')}</p>`}${weightBox(st)}`;
  else if (o.sw) detail = `<p class="hj-how">Switch to your right side.</p>`;
  else if (st.lines) detail = `<p class="hj-how hj-mline">${esc(o.line || (o.run ? 'Rest in the quiet.' : ''))}</p>`;
  else detail = `${o.mline && o.i === 0 ? `<p class="hj-light">${esc(o.mline)}</p>` : ''}${formLine(st)}${howBlock(st)}${st.alt && st.t === 'ex' ? `<p class="hj-cue">${ALT_CUE}</p>` : ''}${st.cue ? `<p class="hj-cue">${esc(st.cue)}</p>` : ''}${st.ease ? `<p class="hj-note" style="text-align:left">${esc(st.ease)}</p>` : ''}${st.t === 'time' ? modsBlock(st, ['feel', 'easier']) : ''}${st.t === 'ex' && weightTip(st) ? `<p class="hj-wtl"><b>Weight:</b> ${esc(weightTip(st))}</p>` : ''}`;
  const t = trans(o, state);
  return `${top(o.title, (o.i + 1) + ' of ' + o.steps.length, pct)}
  <div class="hj-sess"><span data-hjsess>${esc(clock(o.active || 0))}</span><span data-hjleft>about ${Math.max(1, Math.round(estLeft(o) / 60000))} min left</span></div>
  ${stagePanel(state, sop)}
  <div class="hj-ovb${t.cls}" style="${t.style}" data-hjstate="${state}"><div class="hj-kick hj-stk">${esc(label)}</div><h2 class="hj-exn">${esc(o.swap && st.swap ? st.swap : st.name)}</h2>${st.t === 'ex' && !o.between ? dots(o.rest ? o.set + 1 : o.set, st.sets) : ''}${big}
    ${detail}
    ${o.wait ? `<button type="button" class="btn btn-gold hj-go" data-hja="tapdone">${o.side === 'L' ? 'Left Side Done' : 'Set Done'}</button>` : ''}
    <div class="hj-ovbtns hj-ctl"><button type="button" class="btn btn-gold" data-hja="apause">${o.paused ? 'Resume' : 'Pause'}</button><button type="button" class="btn btn-line" data-hja="askip">${o.between ? 'Start Now' : o.rest || o.sw ? 'Ready Now' : o.hf ? 'Set Done' : 'Skip'}</button>${o.run ? `<button type="button" class="btn btn-line" data-hja="amore">+15 sec</button>` : ''}${st.swap && !o.rest && !o.between ? `<button type="button" class="btn btn-line" data-hja="swap">${o.swap ? 'Plan Move' : 'Swap'}</button>` : ''}</div>
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
  if (!s) return `${top(o.title, o.sub, 100)}${stagePanel('done', {fig: window.GGStage ? '' : POT, small: true})}${rang}${arr(o.timers).length ? `<div class="hj-ktimers">${arr(o.timers).map(t => `<div><span class="hj-clock sm" data-hjkt="${t.i}">${clock(t.end - Date.now())}</span><small>${esc(t.label.slice(0, 60))}</small></div>`).join('')}</div>` : ''}<div class="hj-ovb"><div class="hj-big2">${o.idea ? 'Ready to enjoy.' : o.k === 'cook' ? 'Dinner is ready.' : 'Prep is done.'}</div>${arr(o.data.yields).length ? `<p class="hj-sub">Ready now: ${arr(o.data.yields).map(esc).join(', ')}</p>` : ''}<button type="button" class="btn btn-gold hj-go" data-hja="cdone">${o.peek ? 'Ready for Tomorrow' : o.idea ? 'All Done' : o.k === 'cook' ? 'Dinner Is Done' : 'Prep Is Done'}</button></div>`;
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
    case 'tfig3d': { const on = !!(window.GGFig3D && GGFig3D.ok()); try { localStorage.setItem('gg-fig3d', on ? 'off' : 'on'); } catch(e){} rerender(true); return true; }
    case 'tfigbody': if (window.GGFig3D) GGFig3D.setBody(GGFig3D.body() === 'woman' ? 'man' : 'woman'); rerender(true); return true;
    case 'thands': if (o){ o.hands = o.hands === false; try { localStorage.setItem('gg-health-hands', o.hands ? '1' : '0'); } catch(e){} } rerender(true); return true;
    case 'tcount': if (o){ o.count = !o.count; try { localStorage.setItem('gg-health-count', o.count ? '1' : '0'); } catch(e){} } rerender(true); return true;
    case 'play': if (o) runSession(o); return true;
    case 'manual': if (o){ o.stage = 'run'; o.mode = 'manual'; if (V) V.unlock(); } rerender(true); return true;
    case 'didit': if (o){ markDone(o.key || ('work:' + o.s)); checkOn(o.prac ? 'still' : 'move'); toast('Marked done. Well done.'); closeOv(); } return true;
    case 'apause': if (o){ o.paused = !o.paused; if (V){ o.paused ? V.pause() : V.resume(); } clkSync(o); } rerender(true); return true;
    case 'askip': if (o){ o.skip = true; o.wait = false; o.paused = false; if (V) V.stop(); } return true;
    case 'askipmove': if (o){ o.skip = true; o.skipMove = true; o.wait = false; o.paused = false; if (V) V.stop(); } return true;
    case 'amore': if (o && o.run){ o.end += 15000; o.tot = (o.tot || 0) + 15000; } return true;
    case 'tapdone': if (o) o.wait = false; return true;
    case 'guide': if (o){ o.guide = true; o.gi = 0; o.timers = []; if (V){ V.unlock(); V.music(null); } kSay(o, o.intro || (o.k === 'cook' ? LN.cIntro(o.title) : LN.prepIntro(o.title))).then(() => { if (S.ov === o && o.guide && o.gi === 0) kEnter(o); }); } rerender(true); return true;
    case 'knext': if (o){ const n = kSteps(o).length; if (V) V.stop(); o.dn = o.dn || {}; o.dn[o.gi] = true; o.gi = Math.min(n, o.gi + 1); rerender(true); if (o.gi < n) kEnter(o); else kSay(o, o.outro || (o.k === 'cook' ? LN.cOut : LN.prepOut)); } return true;
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
  return [['morning', 'Morning', FOODS().filter(f => f.plan === 'morning' && !PUB()).map(f => 'f:' + slug(f.name)).concat(idx('b', din.breakfasts))],
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
// ---- BLD 862: Quick Add (Chris, October 27, 2026: "could be able to add additional cups of coffee.. a banana, apple, items on our diet").
// One tap adds one serving; the chip shows today's count, with a small minus. Defaults: the plan's everyday staples, then the most used
// extras. Edit Quick Adds keeps the person's own list on this device: DATA.health.quick [plate keys], DATA.health.quickU.
const QA_DEF = ['Coffee with unsweetened soy milk', 'Banana', 'Apple', 'Clementine', ['Blueberries', 'Frozen mixed berries'], 'Almonds', 'Walnuts', 'Unsweetened soy milk', 'Avocado'];
function quickKeys(){
  const h = H(); if (Array.isArray(h.quick)) return h.quick.filter(k => plateItem(k));
  const F = FOODS(), key = n => { const f = F.find(x => x.name.toLowerCase() === String(n).toLowerCase()); return f ? 'f:' + slug(f.name) : null; };
  const out = QA_DEF.map(n => Array.isArray(n) ? n.map(key).find(Boolean) : key(n)).filter(Boolean), use = h.eatUse || {};
  Object.keys(use).filter(k => !out.includes(k) && plateItem(k)).sort((a, b) => (use[b].c - use[a].c) || (use[b].t - use[a].t)).slice(0, 3).forEach(k => out.push(k));
  return out;
}
const qaShort = n => { const t = String(n).split(/ with |, | \(/)[0]; return t.length > 22 ? t.slice(0, 21).trim() + '.' : t; };
function qaRow(eat){
  const ks = quickKeys(); if (!ks.length && !S.qaEd) return '';
  const chips = ks.map(k => { const it = plateItem(k); if (!it) return ''; const n = eat.filter(e => e.k === k).reduce((a, e) => a + (+e.q || 0), 0);
    return `<span class="tn-qc${n ? ' on' : ''}"><button type="button" class="tn-qa1" data-hja="eat" data-hjv="${esc(k)}|q" aria-label="Add one serving: ${esc(it.name)}${n ? ', ' + fmtQ(n) + ' today' : ''}">${n ? '' : ic('plus')}${esc(qaShort(it.name))}${n ? ` <b>${esc(fmtQ(n))}</b>` : ''}</button>${n ? `<button type="button" class="tn-qm" data-hja="eatless" data-hjv="${esc(k)}" aria-label="One less: ${esc(it.name)}">&minus;</button>` : ''}</span>`; }).join('');
  const ed = S.qaEd ? `<div class="tn-qaed"><div class="tn-qal">${ks.map(k => { const it = plateItem(k); return it ? `<span class="tn-qx">${esc(qaShort(it.name))}<button type="button" data-hja="qarm" data-hjv="${esc(k)}" aria-label="Remove from Quick Add: ${esc(it.name)}">${ic('plus')}</button></span>` : ''; }).join('')}</div>
      <input id="hj-qaq" type="search" placeholder="Add a food: pear, oats, eggs..." autocomplete="off" value="${esc(S.qaQuery || '')}" aria-label="Find a food for Quick Add"><div id="hj-qares" aria-live="polite">${qaResults()}</div>
      <button type="button" class="tn-btn sm" data-hja="qaed">Done</button></div>` : '';
  return `<div class="tn-qa"><div class="tn-qah"><span class="hj-eh">Quick Add</span><button type="button" class="linkbtn" data-hja="qaed" aria-expanded="${!!S.qaEd}">${S.qaEd ? 'Close' : 'Edit Quick Adds'}</button></div><div class="tn-qcs">${chips}</div>${ed}</div>`;
}
function qaResults(){
  const q = String(S.qaQuery || '').trim(); if (!q) return ''; const ks = quickKeys(), r = eatFind(q).list.filter(x => !ks.includes(x.k)).slice(0, 8);
  if (!r.length) return `<p class="hj-sub">Add My Own under Something Else, and it can join Quick Add.</p>`;
  return r.map(x => `<div class="hj-er"><div class="tn-qr"><span><b>${esc(x.name)}</b><small>${esc(x.per || '')}${x.cat ? ' · ' + esc(x.cat) : ''}</small></span><button type="button" class="tn-btn sm line" data-hja="qaadd" data-hjv="${esc(x.k)}">${ic('plus')}Add</button></div></div>`).join('');
}
const qaRes = () => { const b = document.getElementById('hj-qares'); if (b) b.innerHTML = qaResults(); };
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
// BLD 862: each meter is a ring (the large one for saturated fat). The ring wears the state color; the number, the aim, and the
// state word (with its icon) wear ink, so the state never rests on color alone.
function meter(row, v, T, big){
  const [k, label, u, kind] = row, m = mInfo(k, kind, v, T[k]), s = MST[m.st], goal = kind === 'lim' ? m.hi : m.lo != null ? m.lo : null;
  const full = goal || m.scale, size = big ? 116 : 80, w = big ? 12 : 8;
  return `<div class="hj-mt tn-rm${big ? ' big' : ''}" data-hjm="${k}" data-st="${m.st}" role="group" aria-label="${esc(label)} ${fmt(v)}${esc(u)}${m.aim ? ', aim ' + esc(m.aim) + (s[0] ? ', ' + esc(s[0]) : '') : ''}">
    ${ring(goal ? Math.min(v, goal) : v, full, size, w, `<div class="hj-mth"><b>${fmt(v)}${u}</b></div>`, 'tn-mr', 'var(--mc)')}
    <div class="tx"><span class="l">${esc(label)}${k === 'sol' ? ' <small>where known</small>' : ''}</span><div class="hj-mts">${m.aim ? `<span>Aim ${esc(m.aim)}</span>` : '<span>Counted through the day</span>'}${s[0] ? `<em>${s[1]} ${esc(s[0])}</em>` : ''}</div></div></div>`;
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
    ${aim ? `<line x1="${pl}" x2="${W - pr}" y1="${f1(y(aim))}" y2="${f1(y(aim))}" class="aim"/><text x="${pl + 4}" y="${f1(y(aim) - 4)}" class="al">Aim ${fmt(aim)}</text>` : ''}
    ${last.t.n ? `<text x="${f1(pl + pw / 7 * 6 + pw / 14)}" y="${f1(Math.max(10, y(last.t[key]) - 5))}" text-anchor="middle" class="vl">${fmt(last.t[key])}</text>` : ''}
  </svg>`;
}
function plateWeek(T){
  const d0 = day0(new Date()), rows = [6, 5, 4, 3, 2, 1, 0].map(i => { const d = addD(d0, -i), k = ymd(d); return {k, d1: DOW[d.getDay()].slice(0, 2), lab: DOW[d.getDay()] + ' ' + short(k), t: totals(k)}; });
  const hi = tHi(T.sf), pro = tLo(T.pro), L = rows.filter(r => r.t.n), under = L.filter(r => r.t.sf <= hi).length;
  const body = S.eatTable ? `<div class="hj-tw"><table class="hj-tbl"><thead><tr><th>Day</th><th>Sat Fat (g)</th><th>Protein (g)</th><th>Fiber (g)</th><th>Calories</th></tr></thead><tbody>${rows.slice().reverse().map(r => `<tr><td>${esc(r.lab)}</td><td>${r.t.n ? '<b>' + fmt(r.t.sf) + '</b>' : ''}</td><td>${r.t.n ? fmt(r.t.pro) : ''}</td><td>${r.t.n ? fmt(r.t.fib) : ''}</td><td>${r.t.n ? fmt(r.t.cal) : ''}</td></tr>`).join('')}</tbody></table></div>`
    : `<div class="hj-wbs"><div class="hj-wb"><div class="hj-wbt">Saturated Fat (g)</div>${weekBars(rows, 'sf', hi, 'sf', 'Saturated fat')}</div><div class="hj-wb"><div class="hj-wbt">Protein (g)</div>${weekBars(rows, 'pro', pro, 'pro', 'Protein')}</div><div class="hj-ptip" hidden></div></div>`;
  return `<details class="hj-doc hj-pw"${S.open['eat7'] ? ' open' : ''} data-hjd="eat7"><summary><span>My Last 7 Days</span></summary><div class="hj-body">
    <p class="hj-sub">${L.length ? `${under} of ${L.length} logged day${L.length === 1 ? '' : 's'} at or under ${fmt(hi)} g of saturated fat. ${PUB() ? '' : ' Each of these days feeds the saturated fat lever on My LDL Path.'}` : PUB() ? 'Your week fills in as you log each day.' : 'Your week fills in as you log each day. Each logged day feeds the saturated fat lever on My LDL Path.'}</p>
    ${body}<button type="button" class="btn btn-line btn-sm" data-hja="eattable" aria-pressed="${!!S.eatTable}">${S.eatTable ? 'View as Chart' : 'View as Table'}</button></div></details>`;
}
// ---- the card ----
function vPlate(mode){
  if (KIT() || !APP()) return ''; const lite = mode === 'today';
  const h = H(), d = new Date(), k = today(), day = h.days[k] || {checks: {}}, ck = day.checks || {}, T = targets(), tot = totals(k), eat = arr(day.eat), gs = plateGroups(d), hr = d.getHours();
  const inPlan = new Set(gs.flatMap(g => g.items.map(i => i.k))), extras = eat.filter(e => !inPlan.has(e.k)), cur = hr < 11 ? 'morning' : hr < 15 ? 'midday' : 'evening';
  const anyHeart = gs.some(g => g.items.some(i => i.heart)), V = plateV();
  const row = (it, g) => { const q = eat.filter(e => e.k === it.k).reduce((a, e) => a + (+e.q || 0), 0), n = it.heart && V === 'h' ? it.heart : it.nut;
    return `<div class="hj-pr8${q ? ' on' : ''}"><button type="button" class="hj-prt" data-hja="eat" data-hjv="${esc(it.k)}|${g}" aria-label="${q ? 'One more serving' : 'Add one serving'}: ${esc(it.name)}"><span class="box">${q ? (q === 1 ? '&#10003;' : esc(fmtQ(q))) : ''}</span><span class="nm"><b>${esc(it.name)}</b><small>${esc(n.per || it.per || '')}${n.per || it.per ? ' · ' : ''}${fmt(n.sf)} g sat fat · ${fmt(n.pro)} g protein</small></span></button>${q ? `<button type="button" class="hj-prm" data-hja="eatless" data-hjv="${esc(it.k)}" aria-label="One less: ${esc(it.name)}">&minus;</button>` : ''}</div>`; };
  const grp = g => { const id = 'eatg:' + g.id, n = g.items.filter(i => eat.some(e => e.k === i.k)).length, open = S.open[id] != null ? S.open[id] : !lite && (g.id === cur || (g.id === 'snacks' && n > 0) || (g.id === 'morning' && hr < 11));
    return `<details class="hj-pg8"${open ? ' open' : ''} data-hjd="${id}"><summary><span>${esc(g.t)}</span><small>${n ? n + ' logged' : g.items.length + ' on the plan'}</small></summary>${g.items.map(i => row(i, g.id)).join('')}</details>`; };
  const sp = supps(), cb = (id, label, sub) => `<button type="button" class="hj-hb hj-pck${ck[id] ? ' on' : ''}" aria-pressed="${!!ck[id]}" data-hja="check" data-hjv="${esc(id)}"><span class="box">${ck[id] ? '&#10003;' : ''}</span><span>${esc(label)}${sub ? `<small>${esc(sub)}</small>` : ''}</span></button>`;
  const ses = (H().set.track || 'strength') !== 'practice' ? sesFor(d) : null;
  const ckRow = (t, list) => list.length ? `<div class="hj-ckg"><div class="hj-eh">${esc(t)}</div><div class="hj-habits">${list.join('')}</div></div>` : '';
  const src = (APP() || {}).foodsSrc;
  return `<div class="hj-blk hj-plate tn-card tn-edge a-plate" id="hj-plate"><div class="tn-hd">${badge('plate')}<div style="flex:1;min-width:0"><div class="tn-k">Today\'s Plate</div><div class="tn-sub">${eat.length ? eat.length + ' logged today' : 'Tap what you eat, and the rings fill'}</div></div>${tpt('Leaves')}</div>
    <div class="hj-mts0">${meter(MT[0], tot.sf, T, true)}<div class="hj-mtg">${MT.slice(1).filter(r => !(r[0] === 'cal' && TEEN())).map(r => meter(r, tot[r[0]], T)).join('')}</div></div>
    <p class="hj-sub hj-p8s">${eat.length ? 'Tap again for a second serving.' : 'Tap what you eat. Each tap adds one serving.'} Numbers are estimates per listed portion.</p>
    ${qaRow(eat)}
    ${anyHeart ? `<div class="hj-chips hj-pv8" role="group" aria-label="Which plate">${[['h', 'Heart-Health Plate'], ['f', 'Family Plate']].map(([v, l]) => `<button type="button" class="chip${V === v ? ' on' : ''}" aria-pressed="${V === v}" data-hja="platev" data-hjv="${v}">${l}</button>`).join('')}</div>` : ''}
    ${gs.map(grp).join('')}
    ${lite ? `<details class="hj-pg8 tn-se"${S.open['eatse'] || extras.length || S.eatQuery ? ' open' : ''} data-hjd="eatse"><summary><span>Something Else</span><small>${extras.length ? extras.length + ' logged' : 'Search any food'}</small></summary>` : ''}<div class="hj-se">${lite ? '' : '<div class="hj-eh">Something Else</div>'}
      ${extras.length ? `<div class="hj-ex">${extras.map(e => `<div class="hj-exr"><span><b>${esc(e.n)}</b><small>${esc(fmtQ(+e.q))} × ${esc(e.per || 'serving')} · ${fmt((e.nut || {}).sf * e.q)} g sat fat</small></span><button type="button" class="linkbtn" data-hja="eatdel" data-hjv="${esc(e.id)}">Remove</button></div>`).join('')}</div>` : ''}
      <input id="hj-eatq" type="search" placeholder="Search foods: eggs, pizza, cream..." autocomplete="off" value="${esc(S.eatQuery || '')}" aria-label="Search foods">
      <div id="hj-eatres" aria-live="polite">${eatResults()}</div>
      <details class="hj-doc hj-own"${S.open['eatown'] ? ' open' : ''} data-hjd="eatown"><summary><span>Add My Own</span></summary><div class="hj-body">
        <label class="hj-fld"><span>Name</span><input data-hjo="name" autocomplete="off"></label><label class="hj-fld"><span>Portion (optional)</span><input data-hjo="per" placeholder="1 bowl" autocomplete="off"></label>
        <div class="hj-g3">${[['sf', 'Sat fat (g)'], ['pro', 'Protein (g)'], ['fib', 'Fiber (g), optional'], ['sug', 'Added sugar (g), optional'], ['cal', 'Calories, optional'], ['na', 'Sodium (mg), optional']].filter(([f]) => !(f === 'cal' && TEEN())).map(([f, l]) => `<label class="hj-fld"><span>${l}</span><input data-hjo="${f}" inputmode="decimal"></label>`).join('')}</div>
        <button type="button" class="btn btn-gold btn-sm" data-hja="eatown">Save to My Foods and Add</button></div></details></div>${lite ? '</details>' : ''}
    ${lite ? `<button type="button" class="tn-btn sm line" data-hja="sec" data-hjv="plate" style="margin-top:12px">${ic('plate')}My Plate, Supplements, and 7 Days</button>` : `<div class="hj-eh hj-ckh">Daily Checklist</div>
    ${ckRow('Movement', [cb('move', ses ? ses.title || 'Today\'s workout' : 'Movement today', 'Checks itself when the workout finishes')])}
    ${ckRow('Stillness', [cb('still', 'Meditation and Flow', 'Checks itself when one finishes')])}
    ${ckRow('Morning', sp.filter(s => s.when !== 'evening').map(s => cb(suppId(s), s.name, s.note)))}
    ${ckRow('Evening', sp.filter(s => s.when === 'evening').map(s => cb(suppId(s), s.name, s.note)))}
    <details class="hj-doc hj-sps"${S.open['supps'] ? ' open' : ''} data-hjd="supps"><summary><span>My Supplements</span></summary><div class="hj-body">
      ${sp.length ? sp.map(s => `<div class="hj-exr"><span><b>${esc(s.name)}</b><small>${s.when === 'evening' ? 'Evening' : 'Morning'}${s.note ? ' · ' + esc(s.note) : ''}</small></span><button type="button" class="linkbtn" data-hja="spdel" data-hjv="${esc(s.id)}">Remove</button></div>`).join('') : '<p class="hj-sub">Add what you take, and it joins your checklist.</p>'}
      <div class="hj-add"><input id="hj-spname" placeholder="Add a supplement" autocomplete="off" aria-label="Supplement name"></div>
      <div class="hj-chips" style="margin:8px 0 0">${['morning', 'evening'].map(w => `<button type="button" class="chip${(S.spWhen || 'evening') === w ? ' on' : ''}" aria-pressed="${(S.spWhen || 'evening') === w}" data-hja="spwhen" data-hjv="${w}">${w === 'morning' ? 'Morning' : 'Evening'}</button>`).join('')}<button type="button" class="btn btn-gold btn-sm" data-hja="spadd">Add</button></div></div></details>
    ${plateWeek(T)}`}
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
    case 'qaed': S.qaEd = !S.qaEd; S.qaQuery = ''; rerender(true); if (S.qaEd) setTimeout(() => { const i = document.getElementById('hj-qaq'); if (i) i.focus(); }, 30); return true;
    case 'qaadd': { const ks = quickKeys(); if (!ks.includes(v)) ks.push(v); h.quick = ks; h.quickU = Date.now(); S.qaQuery = ''; save(); const it = plateItem(v); toast('Added to Quick Add' + (it ? ': ' + it.name : '') + '.'); rerender(true); return true; }
    case 'qarm': h.quick = quickKeys().filter(k => k !== v); h.quickU = Date.now(); save(); rerender(true); return true;
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
    <p class="hj-sub" style="margin:6px 0"><b>My training</b></p>${trackChips(s)}
    <label class="hj-fld"><span>My plan starts on (a Monday)</span><input type="date" data-hjs="start" value="${esc(s.start || '')}"></label>
    <label class="hj-fld"><span>People who eat at home</span><input type="number" min="1" max="12" inputmode="numeric" data-hjs="household" value="${esc(s.household)}"></label>
    <p class="hj-sub" style="margin:12px 0 6px"><b>What are you growing toward?</b></p>
    <div class="hj-chips">${GOALS.map(([id, l]) => { const on = arr(s.goals).includes(id); return `<button type="button" class="chip${on ? ' on' : ''}" aria-pressed="${on}" data-hja="goal" data-hjv="${id}">${esc(l)}</button>`; }).join('')}</div>
    <div class="hj-g3" style="margin-top:12px"><label class="hj-fld"><span>LDL goal (optional)</span><input type="number" inputmode="numeric" data-hjs="goalLdl" value="${esc(s.goalLdl)}"></label><label class="hj-fld"><span>Next labs (optional)</span><input type="date" data-hjs="nextLabs" value="${esc(s.nextLabs)}"></label></div>
    <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold btn-sm" data-hja="setup-save">Save</button>${h.set.u ? '<button type="button" class="btn btn-line btn-sm" data-hja="setup-cancel">Cancel</button>' : ''}</div></div>`;
}

// ---------- BLD 862: Tending. My Health becomes Tending: whole person health that tends the tree, day by day ----------
// Chris, October 27, 2026 ("1"): "Your tree shows you where you are. Tending is how you grow it, one day at a time."
// Parts (connected, never required): Body (Leaves: food, movement, supplements), Mind (Bark), Spirit (Roots: offered, never
// pushed), People (Branches), Trunk (My Why), Fruit (progress). Choose What You Use picks the parts; the rest stays tucked away.
// Content rides in FLD.healthJourney.app.tending {intro, choose, spirit, people, milestones, why}; the built-in words below
// carry the app until the library holds them. DATA.health.set adds: use [part ids], why, whyHide, bridges {offers, oak, sober},
// celebrate (false to turn off), ms {milestone id: date reached}, needSetup. DATA.health.days[date].checks adds quiet, mindful,
// together, unplugged. Internal ids, DATA.health, and the gg-health- keys stay as they were, so nothing saved is lost.
const TEND_DEF = {
  intro: {h: 'Tending', line: 'Daily tending for body, mind, spirit, and the people you love, one day at a time.', tree: 'Your tree shows you where you are. Tending is how you grow it, one day at a time.',
    chooseH: 'Choose What You Use', choose: 'Pick what fits your life. What you choose shows on Today; the rest stays tucked away. You can change this any time in Settings.',
    start: 'Start Tending', alone: 'Tending works on its own. A Grounded tree can connect later in Settings, whenever you like.', quiet: 'Tending celebrates what you do. Days you skip stay quiet.',
    private: 'Everything stays on this device. Your tree sees only what you choose to share.'},
  choose: [
    {id: 'food', name: 'Food', line: 'Today\'s Plate, meals, and dinners with a calm voice guiding the kitchen.', part: 'Leaves'},
    {id: 'move', name: 'Movement', line: 'Workouts and Flow, with a calm voice coaching.', part: 'Leaves'},
    {id: 'mind', name: 'Meditation and Mindfulness', line: 'Breath, stillness, and mindful moments through the day.', part: 'Bark'},
    {id: 'spirit', name: 'Prayer or Sacred Practice', line: 'In your own tradition, or quiet reflection. Offered, always your choice.', part: 'Roots'},
    {id: 'supps', name: 'Supplements', line: 'Morning and evening checks for what you take, and when.', part: 'Leaves'},
    {id: 'labs', name: 'Labs and Numbers', line: 'Lab results and progress lines, private to this device.', part: 'Fruit'},
    {id: 'people', name: 'Family Meals and Connection', line: 'Meals together, unplugged time, and one good question.', part: 'Branches'}],
  spirit: {h: 'Morning Quiet', invite: 'Prayer, a sacred practice from your tradition, or quiet reflection. Your way, your words.', minutes: [5, 10, 15],
    readings: 'Open a Reading from the Readings Library', done: 'A quiet morning, tended.',
    lines: ['Settle in. This time is yours.', 'Breathe slowly, and let the day wait a moment.', 'Pray, practice, or simply rest in the quiet.', 'Notice one thing you are grateful for this morning.', 'Rest here as long as you like. The day will meet you ready.']},
  people: {questions: ['What made you smile today?', 'What was the best part of your day?', 'Who helped you today, and how?', 'What is something new you learned this week?', 'If we had a free afternoon together, what would you love to do?', 'What is one kind thing someone did for you lately?', 'What are you looking forward to this week?']},
  milestones: [
    {id: 'first-day', name: 'First Day Tended', line: 'You tended your first day. Every tree starts with one.', test: 'tendedDays:1'},
    {id: 'tended-7', name: 'Seven Days Tended', line: 'Seven days of tending, one day at a time.', test: 'tendedDays:7'},
    {id: 'first-workout', name: 'First Workout', line: 'Your first workout is done. Strong start.', test: 'firstWorkout'},
    {id: 'plate-7', name: 'Seven Days on the Plate', line: 'Seven days of Today\'s Plate.', test: 'plateDays:7'},
    {id: 'food-week', name: 'First Full Food Week', line: 'A whole Food Week, logged from start to finish.', test: 'foodWeek:1'},
    {id: 'first-lab', name: 'First Lab After the Start', line: 'A new point on your path.', test: 'labAfterStart'},
    {id: 'quiet-5', name: 'Five Quiet Mornings', line: 'Five mornings that began in quiet.', test: 'quietDays:5'},
    {id: 'dinner-10', name: 'Ten Dinners Together', line: 'Ten dinners around the table with the people you love.', test: 'dinnersTogether:10'}],
  why: {h: 'My Why', prompt: 'One line, in your words, about why you tend. It greets you here each morning.', write: 'Write My Why', examples: ['To be strong, present, and joyful for my family.', 'To have energy left at the end of the day for the people I love.']}
};
// The parts: where each sits on Today, its accent, its icon, its tree part.
const PARTS = {food: {g: 'body', a: 'a-plate', i: 'plate', p: 'Leaves'}, move: {g: 'body', a: 'a-move', i: 'move', p: 'Leaves'}, supps: {g: 'body', a: 'a-today', i: 'capsule', p: 'Leaves'},
  mind: {g: 'mind', a: 'p-bark', i: 'lotus', p: 'Bark'}, spirit: {g: 'spirit', a: 'p-roots', i: 'flame', p: 'Roots'}, people: {g: 'people', a: 'p-branches', i: 'people', p: 'Branches'}, labs: {g: 'fruit', a: 'a-numbers', i: 'flask', p: 'Fruit'}};
const PART_IDS = Object.keys(PARTS);
const PCLS = {Leaves: 'p-leaves', Bark: 'p-bark', Roots: 'p-roots', Branches: 'p-branches', Fruit: 'p-fruit', Trunk: 'p-trunk'};
function TD(){
  const a = APP(), t = a && a.tending && typeof a.tending === 'object' ? a.tending : {}, ok = (x, f) => arr(x).filter(f);
  const ch = ok(t.choose, c => c && PARTS[c.id] && c.name), sl = ok(t.spirit && t.spirit.lines, x => typeof x === 'string' && x), q = ok(t.people && t.people.questions, x => typeof x === 'string' && x);
  const ms = ok(t.milestones, m => m && m.id && m.name && typeof m.test === 'string'), mn = ok(t.spirit && t.spirit.minutes, x => +x > 0).map(Number);
  return {intro: Object.assign({}, TEND_DEF.intro, t.intro || {}), choose: ch.length ? ch : TEND_DEF.choose,
    spirit: Object.assign({}, TEND_DEF.spirit, t.spirit || {}, {lines: sl.length ? sl : TEND_DEF.spirit.lines, minutes: mn.length ? mn : TEND_DEF.spirit.minutes}),
    people: {questions: q.length ? q : TEND_DEF.people.questions}, milestones: ms.length ? ms : TEND_DEF.milestones,
    why: Object.assign({}, TEND_DEF.why, t.why || {}, {examples: ok(t.why && t.why.examples, x => typeof x === 'string' && x).length ? t.why.examples : TEND_DEF.why.examples})};
}
const TNAME = () => 'Tending';
// What this person already uses, for the prefill: Chris and Kayti have food, movement, supplements, labs, and meditation in use.
function detectUse(){
  const h = H(), out = new Set(), days = Object.values(h.days), logs = Object.values(h.log), keys = logs.flatMap(l => Object.keys(l || {}));
  if (MINE()) ['food', 'move', 'supps', 'labs', 'mind'].forEach(x => out.add(x));
  if (days.some(d => arr(d && d.eat).length) || Object.keys(h.shop).length || keys.some(k => /^(cook|prep|shop|idea):/.test(k))) out.add('food');
  if (h.wlog.length || keys.some(k => /^(work:|prac)/.test(k))) out.add('move');
  if (keys.includes('med') || days.some(d => d && d.checks && d.checks.still)) out.add('mind');
  if ((h.supps && arr(h.supps.list).length) || days.some(d => d && Object.keys(d.checks || {}).some(k => /^sp:/.test(k) && d.checks[k]))) out.add('supps');
  if (h.labs.length || h.panels.length) out.add('labs');
  if (!out.size) ['food', 'move'].forEach(x => out.add(x));
  return PART_IDS.filter(x => out.has(x));
}
const useSet = () => { const h = H(); return KIT() || Array.isArray(h.set.use); };
function USE(){ if (KIT()) return ['food']; const u = H().set.use; return Array.isArray(u) ? PART_IDS.filter(x => u.includes(x)) : detectUse(); }
const U = id => USE().includes(id);

// ---------- icons: inline SVG, 24 box, 1.9 stroke, round caps and joins (the concept set) ----------
const ICO = {today: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/>',
  week: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M7.5 14h2M11 14h2M14.5 14h2M7.5 17h2M11 17h2"/>',
  plate: '<circle cx="13" cy="12.5" r="7.5"/><circle cx="13" cy="12.5" r="4"/><path d="M3 4v5.5a1.5 1.5 0 0 0 1.5 1.5v9M3 4v4M5.9 4v4"/>',
  kitchen: '<path d="M4 11h16v5.5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M2 11h20M9 7.5c0-1.2 1-1.4 1-2.6M13 7.5c0-1.2 1-1.4 1-2.6"/>',
  move: '<circle cx="14" cy="4.6" r="2"/><path d="M8.5 21l3-6 3 2.5v3.5M11.5 15l1.2-5.5-3.7 1.6-1.6 3M12.7 9.5l2.5 3.2 3.3.9"/>',
  numbers: '<path d="M3.5 19.5h17"/><path d="M5 15.5l4.2-4.6 3.3 2.7 6.5-7.1"/><path d="M15.2 6.5H19v3.8"/>',
  check: '<path d="M5 12.5l4.4 4.4L19 7.4"/>', play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>', clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  leaf: '<path d="M5 19c0-8 5-13.5 14.5-14-.3 9.6-6 14.5-14 14.5zM5 19l7-7"/>',
  lotus: '<path d="M12 18.5c-3-2-4.4-4.6-4.4-7.6C9.5 11.7 11 13 12 15c1-2 2.5-3.3 4.4-4.1 0 3-1.4 5.6-4.4 7.6z"/><path d="M12 15c-1-2.8-1-5.6 0-8.6 1 3 1 5.8 0 8.6zM7.6 12.3C5.6 12 4 12.5 2.8 13.5c1.6 3 5 5 9.2 5M16.4 12.3c2-.3 3.6.2 4.8 1.2-1.6 3-5 5-9.2 5"/>',
  capsule: '<rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="M9.7 8.7l4.6 6.6"/>',
  sunrise: '<path d="M3 18h18M6.5 18a5.5 5.5 0 0 1 11 0M12 4.5v3.5M4.6 10.2l1.7 1.2M19.4 10.2l-1.7 1.2M9.5 6.5L12 4l2.5 2.5"/>', moon: '<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z"/>',
  bowl: '<path d="M3.5 11.5h17a8.5 8.5 0 0 1-17 0zM9 20h6"/><path d="M8 8.5c.5-1.6 2-2.5 3.5-2M13 8.5c.7-2 2.3-3 4.5-3"/>', arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', plus: '<path d="M12 5v14M5 12h14"/>',
  cart: '<path d="M3 4h2.5l2.2 10.5h10.5L20.5 7H6.6"/><circle cx="9.5" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
  sprout: '<path d="M12 21v-8"/><path d="M12 13c0-4.4-3-7-7.5-7 0 4.4 3 7 7.5 7z"/><path d="M12 11c0-3.6 2.6-6 6.8-6 0 3.6-2.6 6-6.8 6z"/><path d="M7.5 21h9"/>',
  flame: '<path d="M12 3c.6 3.2 4.5 5 4.5 9.6A4.5 4.5 0 0 1 12 17a4.5 4.5 0 0 1-4.5-4.4c0-2.2 1.2-3.4 2.2-4.4.3 1.6 1 2.4 1.8 2.6-.4-2.6.2-5.6.5-7.8z"/><path d="M8 21h8M10 17v4M14 17v4"/>',
  people: '<circle cx="8.5" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M3 19.5c.4-3.4 2.6-5.5 5.5-5.5s5.1 2.1 5.5 5.5M14.2 14.3c.7-.3 1.4-.5 2.3-.5 2.4 0 4.1 1.8 4.5 4.7"/>',
  gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/><circle cx="12" cy="12" r="6.6"/>',
  bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2H4.5z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>', link: '<path d="M10 14a4.2 4.2 0 0 0 6 0l3-3a4.2 4.2 0 0 0-6-6l-1.2 1.2"/><path d="M14 10a4.2 4.2 0 0 0-6 0l-3 3a4.2 4.2 0 0 0 6 6l1.2-1.2"/>',
  tree: '<path d="M12 21.5v-7"/><path d="M12 14.5c-4.6 0-7.5-2.4-7.5-5.6 0-2.6 2-4.4 4.2-4.6C9.6 2.9 10.7 2.3 12 2.3s2.4.6 3.3 2c2.2.2 4.2 2 4.2 4.6 0 3.2-2.9 5.6-7.5 5.6z"/><path d="M12 17.5l-3-2M12 16.5l3-2.2M8.5 21.5h7"/>',
  flask: '<path d="M9.5 3h5M10.5 3v5.6L5 18.2A1.9 1.9 0 0 0 6.7 21h10.6a1.9 1.9 0 0 0 1.7-2.8L13.5 8.6V3"/><path d="M7.6 14h8.8"/>',
  book: '<path d="M4 5.5c2.8-1.2 5.6-1.2 8 .7 2.4-1.9 5.2-1.9 8-.7v13c-2.8-1.2-5.6-1.2-8 .7-2.4-1.9-5.2-1.9-8-.7z"/><path d="M12 6.2v13"/>',
  wind: '<path d="M3 9h11a3 3 0 1 0-3-3M3 13h15a3 3 0 1 1-3 3M3 17h7"/>', compass: '<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  shield: '<path d="M12 3l7 3v5.5c0 4.4-3 8-7 9.5-4-1.5-7-5.1-7-9.5V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>', star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z"/>',
  fish: '<path d="M3 12c3.5-4.5 9-6 13.5-2.5L21 6.5v11l-4.5-3C12 18 6.5 16.5 3 12z"/><circle cx="7.5" cy="11.2" r=".9" fill="currentColor"/>',
  sun2: '<path d="M12 7v-3.5M7.4 9 5 6.6M16.6 9 19 6.6"/><path d="M5 17a7 7 0 0 1 14 0z"/><path d="M3 20.5h18"/>', water: '<path d="M12 3.5c3.3 4.3 6 7.6 6 11a6 6 0 0 1-12 0c0-3.4 2.7-6.7 6-11z"/>'};
const ic = n => `<svg class="tn-i" viewBox="0 0 24 24" aria-hidden="true">${ICO[n] || ICO.leaf}</svg>`;

// ---------- the hour's sky and the scenes (the same sky stops as field-guide/stage.js) ----------
const SKY = [[0, '#0E1630', '#26294D', null], [4.5, '#16203F', '#3B3B66', null], [5.5, '#4B6DB2', '#FFC79C', '#FFB347'], [7, '#5FB3F2', '#FFE6B5', '#FFC22E'], [9, '#4FAEF4', '#E8F6FF', '#FFCB2E'],
  [12, '#45A6F0', '#EEF8FF', '#FFD84A'], [15, '#5BA8E4', '#F4F1E2', '#FFCF55'], [17.5, '#7AA2D6', '#FFD9A3', '#FFAD3A'], [19, '#675C9F', '#FFA472', '#FF8A3D'], [20.5, '#33355F', '#C47767', null], [22, '#141B36', '#2C2C50', null], [24, '#0E1630', '#26294D', null]];
const hx2 = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
const toHx = a => '#' + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const mixC = (a, b, u) => { const p = hx2(a), q = hx2(b); return toHx(p.map((v, i) => v + (q[i] - v) * u)); };
function skyAt(h){ h = ((h % 24) + 24) % 24; let i = 0; while (i < SKY.length - 2 && SKY[i + 1][0] <= h) i++;
  const a = SKY[i], b = SKY[i + 1], u = (h - a[0]) / (b[0] - a[0] || 1);
  return {top: mixC(a[1], b[1], u), hor: mixC(a[2], b[2], u), sun: a[3] && b[3] ? mixC(a[3], b[3], u) : (a[3] || b[3] || null), h}; }
let SN = 0;
const darkOn = () => { const t = document.documentElement.getAttribute('data-theme'); return t ? t === 'dark' : !!(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches); };
function outdoors(sky, w, h, op){
  const id = 'tns' + (++SN), up = sky.h >= 5.5 && sky.h <= 20.5, u = up ? (sky.h - 5.5) / 15 : 0;
  const sx = op && op.flip ? w * 0.88 - w * 0.76 * u : w * 0.12 + w * 0.76 * u, sy = h * 0.62 - Math.sin(u * Math.PI) * h * 0.42;
  const far = mixC(sky.hor, up ? '#8DB59A' : '#1E2A3A', up ? 0.5 : 0.6), near = mixC(sky.hor, up ? '#5E9A69' : '#16202C', up ? 0.7 : 0.75), f = n => n.toFixed(1);
  let s = `<defs><linearGradient id="${id}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky.top}"/><stop offset=".75" stop-color="${sky.hor}"/></linearGradient><radialGradient id="${id}g"><stop offset="0" stop-color="${sky.sun || '#FFF3C4'}" stop-opacity=".55"/><stop offset="1" stop-color="${sky.sun || '#FFF3C4'}" stop-opacity="0"/></radialGradient></defs><rect width="${w}" height="${h}" fill="url(#${id}k)"/>`;
  if (up) s += `<circle cx="${f(sx)}" cy="${f(sy)}" r="${f(h * 0.34)}" fill="url(#${id}g)"/><circle class="tn-sun" cx="${f(sx)}" cy="${f(sy)}" r="${f(h * 0.075)}" fill="${sky.sun}"/><g class="tn-cloud" opacity=".85"><ellipse cx="${f(w * 0.22)}" cy="${f(h * 0.22)}" rx="${f(w * 0.07)}" ry="${f(h * 0.035)}" fill="#fff"/><ellipse cx="${f(w * 0.26)}" cy="${f(h * 0.19)}" rx="${f(w * 0.045)}" ry="${f(h * 0.04)}" fill="#fff"/></g>`;
  else { for (let i = 0; i < 22; i++) s += `<circle cx="${(i * 73) % w}" cy="${f((i * 37) % (h * 0.5))}" r="${i % 3 ? 0.9 : 1.4}" fill="#fff" opacity=".8"/>`; s += `<circle cx="${f(w * 0.78)}" cy="${f(h * 0.2)}" r="${f(h * 0.06)}" fill="#F6F0DA"/><circle cx="${f(w * 0.78 + h * 0.025)}" cy="${f(h * 0.18)}" r="${f(h * 0.055)}" fill="${sky.top}"/>`; }
  s += `<path d="M0 ${f(h * 0.66)} Q${f(w * 0.25)} ${f(h * 0.5)} ${f(w * 0.5)} ${f(h * 0.62)} T${w} ${f(h * 0.58)} V${h} H0Z" fill="${far}"/><path d="M0 ${f(h * 0.78)} Q${f(w * 0.3)} ${f(h * 0.66)} ${f(w * 0.62)} ${f(h * 0.76)} T${w} ${f(h * 0.72)} V${h} H0Z" fill="${near}"/>`;
  if (op && op.deck) s += `<rect y="${f(h * 0.86)}" width="${w}" height="${f(h * 0.14)}" fill="${mixC(near, '#6B4A2E', 0.55)}"/>`;
  return s;
}
function figure(kind, cx, base, sc){
  const c = '#F6EEDF', st = `stroke="${c}" stroke-width="${7 * sc}" stroke-linecap="round" fill="none"`, f = n => (+n).toFixed(1);
  if (kind === 'seat') return `<g class="tn-fig"><ellipse cx="${f(cx)}" cy="${f(base)}" rx="${f(30 * sc)}" ry="${f(4 * sc)}" fill="#000" opacity=".18"/><circle cx="${f(cx)}" cy="${f(base - 58 * sc)}" r="${f(9 * sc)}" fill="${c}"/><path ${st} d="M${f(cx)} ${f(base - 46 * sc)} V${f(base - 18 * sc)}"/><path ${st} d="M${f(cx - 24 * sc)} ${f(base - 4 * sc)} Q${f(cx)} ${f(base - 14 * sc)} ${f(cx + 24 * sc)} ${f(base - 4 * sc)}"/><path ${st} d="M${f(cx)} ${f(base - 38 * sc)} L${f(cx - 14 * sc)} ${f(base - 22 * sc)} L${f(cx - 18 * sc)} ${f(base - 10 * sc)} M${f(cx)} ${f(base - 38 * sc)} L${f(cx + 14 * sc)} ${f(base - 22 * sc)} L${f(cx + 18 * sc)} ${f(base - 10 * sc)}"/></g>`;
  return `<g class="tn-fig"><ellipse cx="${f(cx)}" cy="${f(base)}" rx="${f(28 * sc)}" ry="${f(4 * sc)}" fill="#000" opacity=".2"/><circle cx="${f(cx + 2 * sc)}" cy="${f(base - 70 * sc)}" r="${f(9 * sc)}" fill="${c}"/><path ${st} d="M${f(cx)} ${f(base - 58 * sc)} L${f(cx - 6 * sc)} ${f(base - 30 * sc)}"/><path ${st} d="M${f(cx - 6 * sc)} ${f(base - 30 * sc)} L${f(cx + 14 * sc)} ${f(base - 22 * sc)} L${f(cx + 10 * sc)} ${f(base)}"/><path ${st} d="M${f(cx - 6 * sc)} ${f(base - 30 * sc)} L${f(cx - 18 * sc)} ${f(base - 16 * sc)} L${f(cx - 14 * sc)} ${f(base)}"/><path ${st} d="M${f(cx - 2 * sc)} ${f(base - 52 * sc)} L${f(cx + 14 * sc)} ${f(base - 44 * sc)}"/><rect x="${f(cx + 10 * sc)}" y="${f(base - 50 * sc)}" width="${f(14 * sc)}" height="${f(16 * sc)}" rx="${f(5 * sc)}" fill="#3A3A40"/></g>`;
}
function kitchenScene(sky, w, h){
  const d = darkOn(), wall = d ? '#3E3128' : '#EADBC6', counter = d ? '#5A3E2A' : '#8A5A36', top = d ? '#6E4E36' : '#B07B4E', id = 'tnk' + (++SN), wx = w * 0.56, ww = w * 0.32, wy = h * 0.14, wh = h * 0.36, px = w * 0.3, pw = w * 0.26, py = h * 0.5;
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky.top}"/><stop offset="1" stop-color="${sky.hor}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="${wall}"/><rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" rx="6" fill="url(#${id})"/>`
    + (sky.sun ? `<circle cx="${wx + ww * 0.6}" cy="${wy + wh * 0.4}" r="${wh * 0.13}" fill="${sky.sun}"/>` : `<circle cx="${wx + ww * 0.7}" cy="${wy + wh * 0.3}" r="${wh * 0.09}" fill="#F6F0DA"/>`)
    + `<path d="M${wx + ww / 2} ${wy}V${wy + wh}M${wx} ${wy + wh / 2}H${wx + ww}" stroke="${wall}" stroke-width="4"/><rect x="${wx - 6}" y="${wy + wh}" width="${ww + 12}" height="5" rx="2" fill="${top}"/>`
    + `<rect x="${w * 0.06}" y="${h * 0.3}" width="${w * 0.36}" height="4" rx="2" fill="${top}"/><rect x="${w * 0.09}" y="${h * 0.2}" width="${w * 0.05}" height="${h * 0.1}" rx="3" fill="#7FA36A"/><rect x="${w * 0.16}" y="${h * 0.17}" width="${w * 0.05}" height="${h * 0.13}" rx="3" fill="#D9A847"/><rect x="${w * 0.23}" y="${h * 0.22}" width="${w * 0.06}" height="${h * 0.08}" rx="3" fill="#C66A3C"/>`
    + `<rect y="${h * 0.7}" width="${w}" height="${h * 0.3}" fill="${counter}"/><rect y="${h * 0.68}" width="${w}" height="${h * 0.05}" fill="${top}"/><rect x="${px}" y="${py}" width="${pw}" height="${h * 0.18}" rx="8" fill="#2E3238"/><rect x="${px - 6}" y="${py - 6}" width="${pw + 12}" height="8" rx="4" fill="#3C424A"/>`
    + `<g class="tn-steam" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"><path d="M${px + pw * 0.3} ${py - 16} q-6 -10 0 -20 q6 -10 0 -20"/><path d="M${px + pw * 0.5} ${py - 16} q-6 -10 0 -20 q6 -10 0 -20"/><path d="M${px + pw * 0.7} ${py - 16} q-6 -10 0 -20 q6 -10 0 -20"/></g>`
    + `<ellipse cx="${w * 0.78}" cy="${h * 0.66}" rx="${w * 0.08}" ry="${h * 0.03}" fill="#F2E9DA"/><circle cx="${w * 0.75}" cy="${h * 0.64}" r="${h * 0.03}" fill="#E07B3A"/><circle cx="${w * 0.8}" cy="${h * 0.635}" r="${h * 0.028}" fill="#5F9A4E"/>`;
}
function bowlScene(w, h){ const d = darkOn();
  return `<rect width="${w}" height="${h}" fill="${d ? '#2D3A28' : '#E3EDD9'}"/><circle cx="${w / 2}" cy="${h * 0.56}" r="${h * 0.36}" fill="${d ? '#EDE4D3' : '#FFFFFF'}" opacity=".95"/><circle cx="${w / 2}" cy="${h * 0.56}" r="${h * 0.27}" fill="#E9D6B4"/>`
    + [[0.42, 0.5, '#3E4C8A'], [0.5, 0.46, '#4A5AA0'], [0.58, 0.52, '#3E4C8A'], [0.47, 0.6, '#C2324A'], [0.56, 0.62, '#3E4C8A'], [0.62, 0.58, '#C2324A']].map(b => `<circle cx="${w * b[0]}" cy="${h * b[1]}" r="${h * 0.045}" fill="${b[2]}"/>`).join(''); }
function scene(kind, hour, w, h){
  w = w || 120; h = h || 120; let b;
  if (kind === 'cook') b = kitchenScene(skyAt(Math.max(hour, 17.6)), w, h);
  else if (kind === 'bowl') b = bowlScene(w, h);
  else if (kind === 'dawn') b = outdoors(skyAt(6.3), w, h, {deck: true}) + figure('seat', w / 2, h * 0.92, h / 120);
  else if (kind === 'practice') b = outdoors(skyAt(16.8), w, h, {deck: true}) + figure('seat', w / 2, h * 0.92, h / 120);
  else if (kind === 'night') b = outdoors(skyAt(21), w, h, {deck: true});
  else b = outdoors(skyAt(hour), w, h, {deck: true}) + figure('squat', w / 2 - 6, h * 0.92, h / 120);
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${b}</svg>`;
}

// ---------- pieces: rings, checks, switches, cards ----------
// A ring: one value, one color; the number in the middle wears ink, never the ring color.
function ring(v, max, size, w, mid, cls, col){
  const r = (size - w) / 2, C = 2 * Math.PI * r, p = Math.max(0, Math.min(1, max > 0 ? v / max : 0)), off = (C * (1 - p)).toFixed(1);
  return `<div class="tn-ring${cls ? ' ' + cls : ''}" style="width:${size}px;height:${size}px"><svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true" focusable="false"><circle class="tr" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="${w}"/><circle class="fg" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="${w}" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${off}" style="--c0:${C.toFixed(1)}${col ? ';stroke:' + col : ''}"/></svg><div class="mid">${mid || ''}</div></div>`;
}
const CKSVG = '<svg viewBox="0 0 34 34" aria-hidden="true" focusable="false"><circle class="o" cx="17" cy="17" r="15"/><path class="m" d="M10 17.5l4.6 4.6L24 12.4"/></svg>';
function tck(a, v, on, label, sub, cls){
  const pop = on && S.pop === a + '|' + v;
  return `<button type="button" class="tn-ck${pop ? ' pop' : ''}${cls ? ' ' + cls : ''}" data-hja="${a}" data-hjv="${esc(v)}" aria-pressed="${!!on}"><span class="box">${CKSVG}${pop ? `<span class="tn-burst" aria-hidden="true">${Array.from({length: 8}, (x, i) => { const g = i / 8 * Math.PI * 2, d = 22 + (i % 2) * 8; return `<i style="--x:${(Math.cos(g) * d).toFixed(1)}px;--y:${(Math.sin(g) * d).toFixed(1)}px"></i>`; }).join('')}</span>` : ''}</span><span class="lb">${esc(label)}${sub ? `<span class="sb">${esc(sub)}</span>` : ''}</span></button>`;
}
const tsw = (a, v, on, label) => `<button type="button" class="tn-sw" role="switch" aria-checked="${!!on}" data-hja="${a}" data-hjv="${esc(v)}" aria-label="${esc(label)}"></button>`;
const tpt = p => p ? `<span class="tn-pt ${PCLS[p] || 'p-leaves'}">${esc(p)}</span>` : '';
const badge = (n, cls) => `<span class="tn-badge${cls ? ' ' + cls : ''}">${ic(n)}</span>`;
// BLD 866: each Today section wears its painting (shared/heroes/way/tend-*.webp), for the Field Guide and public Tending alike.
const TIMG = {body: 'tend-body', move: 'tend-move', mind: 'tend-mind', spirit: 'tend-spirit', people: 'tend-people', fruit: 'tend-fruit'};
const paint = (id, cls) => TIMG[id] ? `<span class="tn-gimg${cls ? ' ' + cls : ''}" aria-hidden="true"><img src="${esc(asset('shared/heroes/way/' + TIMG[id] + '.webp'))}" alt="" loading="lazy" decoding="async" width="600" height="600"></span>` : '';
const grpHead = (id, title, icn, cls, part) => `<div class="tn-grp ${cls}" id="tn-${id}">${TIMG[id] ? paint(id) : badge(icn)}<h2>${esc(title)}</h2>${tpt(part)}<span class="sp"></span></div>`;
function secHead(icn, cls, title, sub){ return `<div class="tn-head ${cls}">${TIMG[icn] ? paint(icn, 'big') : badge(icn)}<div><h2>${esc(title)}</h2>${sub ? `<p class="tn-sub">${sub}</p>` : ''}</div></div>`; }
// A plan card: scene tile, time kicker, title, one line, actions with a check.
function planCard(o){
  return `<article class="tn-card tn-edge tn-lift ${o.cls}${o.done ? ' done' : ''}"><div class="tn-pc"><div class="tn-scene">${o.img ? `<img src="${esc(o.img)}" alt="" loading="lazy" decoding="async">` : scene(o.scene, o.hour)}</div><div style="min-width:0">
    <div class="tn-time">${esc(o.time)}</div><h3>${esc(o.title)}</h3>${o.sub ? `<div class="tn-meta">${esc(o.sub)}</div>` : ''}
    <div class="tn-acts">${o.btn ? `<button type="button" class="tn-btn sm" data-hja="${o.ba || 'go'}" data-hjv="${esc(o.bv)}">${ic(o.bi || 'play')}${esc(o.btn)}</button>` : ''}${o.ck || ''}</div></div></div>${o.more || ''}</article>`;
}

// ---------- each day, by part: what was tended (counts only what was done; a skipped day simply stays quiet) ----------
const isDay = k => /^\d{4}-\d{2}-\d{2}$/.test(k);
function dayInfo(k){
  const h = H(), d = h.days[k] || {}, c = d.checks || {}, l = h.log[k] || {}, lk = Object.keys(l).filter(x => x !== 'u' && l[x]), on = new Set(), ck = id => !!c[id];
  if (lk.some(x => /^(work:|prac|out$|y$)/.test(x)) || ck('move') || ck('walk')) on.add('move');
  if (arr(d.eat).length || lk.some(x => /^(cook|prep|shop|idea|rem|hol|holrec):/.test(x)) || ['fiber', 'plants', 'water', 'nuts'].some(ck)) on.add('food');
  if (Object.keys(c).some(x => c[x] && (/^sp:/.test(x) || x === 'psyllium' || x === 'sterols'))) on.add('supps');
  if (l.med || ck('mindful') || ck('still')) on.add('mind');
  if (ck('quiet')) on.add('spirit');
  if (ck('together') || ck('unplugged')) on.add('people');
  lk.forEach(x => { if (/^own:/.test(x)){ const it = OWN().items.find(i => ownKey(i) === x), tp = it && OWN_TP[it.part]; if (tp) on.add(tp); } });   // BLD 896
  const n = Object.values(c).filter(Boolean).length + lk.length + (arr(d.eat).length ? 1 : 0);
  return {on, n, eat: arr(d.eat).length, c, l, lk};
}
function tendStats(){
  const h = H(), keys = [...new Set(Object.keys(h.days).concat(Object.keys(h.log)))].filter(isDay).sort(), use = USE().filter(x => x !== 'labs');
  const s = {tendedDays: 0, fullRhythm: 0, workouts: 0, practices: 0, plateDays: 0, dinnersCooked: 0, suppDays: 0, medDays: 0, quietDays: 0, dinnersTogether: 0, unpluggedTables: 0, foodWeek: 0};
  const sp = supps(), weeks = {};
  keys.forEach(k => { const x = dayInfo(k); if (!x.n) return; s.tendedDays++;
    if (use.length && use.every(p => x.on.has(p))) s.fullRhythm++;
    s.workouts += x.lk.filter(y => /^work:/.test(y)).length; if (x.l.prac) s.practices++;
    if (x.eat){ s.plateDays++; const m = ymd(monOf(parseD(k))); weeks[m] = (weeks[m] || 0) + 1; }
    s.dinnersCooked += x.lk.filter(y => /^cook:/.test(y)).length;
    if (sp.length && sp.every(z => x.c[suppId(z)])) s.suppDays++;
    if (x.l.med || x.c.mindful) s.medDays++; if (x.c.quiet) s.quietDays++; if (x.c.together) s.dinnersTogether++; if (x.c.unplugged) s.unpluggedTables++; });
  s.foodWeek = Object.values(weeks).filter(n => n >= 7).length;
  s.firstWorkout = s.workouts; s.whyWritten = String(h.set.why || '').trim() ? 1 : 0;
  const sk = ymd(startMon()); s.labAfterStart = labs().some(x => String(x.date) > sk) ? 1 : 0;
  return s;
}
const MS_PART = {firstWorkout: 'move', workouts: 'move', practices: 'move', plateDays: 'food', foodWeek: 'food', dinnersCooked: 'food', suppDays: 'supps', labAfterStart: 'labs', medDays: 'mind', quietDays: 'spirit', dinnersTogether: 'people', unpluggedTables: 'people'};
function milestonesT(){
  const s = tendStats();
  return TD().milestones.map(m => { const [k, n] = String(m.test).split(':'), need = Math.max(1, +n || 1), part = MS_PART[k];
    if (!(k in s) || (part && !U(part))) return null;
    return Object.assign({}, m, {have: s[k], need, done: s[k] >= need, part}); }).filter(Boolean);
}
// Celebrate a milestone once, the day it is reached (Settings can turn the note off). The first look records quietly.
function celebrate(list){
  const h = H(), seen = h.set.ms && typeof h.set.ms === 'object' ? h.set.ms : null, now = list.filter(m => m.done), fresh = seen ? now.filter(m => !seen[m.id]) : [];
  if (seen && !fresh.length) return;
  const ms = Object.assign({}, seen || {}); now.forEach(m => { if (!ms[m.id]) ms[m.id] = today(); }); h.set.ms = ms; h.set.u = Date.now(); save();
  if (fresh.length && h.set.celebrate !== false) setTimeout(() => toast('Milestone: ' + fresh[fresh.length - 1].name + '. ' + (fresh[fresh.length - 1].line || '')), 300);
}

// ---------- Choose What You Use ----------
function vChoose(){
  const t = TD(), pick = S.pick || (Array.isArray(H().set.use) ? H().set.use.slice() : detectUse()), hr = new Date().getHours() + new Date().getMinutes() / 60;
  return `<section class="tn-choose" data-tn="choose">
    <div class="tn-hero tn-welcome"><svg class="tn-sky" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">${outdoors(skyAt(hr), 400, 300, {flip: true})}</svg>
      <div class="in"><div class="greet">${ic('sprout')}<span>Welcome</span></div><h1>${esc(t.intro.h)}</h1><p>${esc(t.intro.line)}</p></div></div>
    <p class="tn-lead">${esc(t.intro.tree)}</p>
    <div class="tn-chead"><h2>${esc(t.intro.chooseH)}</h2><p class="tn-sub">${esc(t.intro.choose)}</p></div>
    <div class="tn-chooseg">${t.choose.map(c => { const on = pick.includes(c.id), P = PARTS[c.id];
      return `<button type="button" class="tn-tg ${P.a}" data-hja="usetg" data-hjv="${esc(c.id)}" aria-pressed="${on}">${badge(P.i)}<span class="tx"><h3>${esc(c.name)}</h3><span class="tn-sub">${esc(c.line)}</span><span class="tn-pts">${tpt(c.part || P.p)}</span></span><span class="tn-sw" aria-hidden="true" data-on="${on}"></span></button>`; }).join('')}
      <div class="tn-card tn-startc"><div class="tn-k">Your Tending</div><div class="cnt"><span>${pick.length}</span> chosen</div>
        <button type="button" class="tn-btn big" data-hja="usesave"${pick.length ? '' : ' disabled'}>${ic('sprout')}${esc(t.intro.start)}</button><div class="tn-sub">${esc(t.intro.alone)}</div></div></div>
    <div class="tn-note">${ic('shield')}<div>${esc(t.intro.private)} ${esc(t.intro.quiet)}</div></div></section>`;
}

// ---------- Settings: What I Use, Bridges (stored for a later build), Reminders ----------
function vSettings(bare){
  const h = H(), t = TD(), br = h.set.bridges || {}, kit = KIT(), on = remOn();
  const row = (cls, icn, title, sub, sw) => `<div class="tn-row ${cls}">${icn ? `<span class="ic2">${ic(icn)}</span>` : ''}<div class="tx"><b>${esc(title)}</b><small>${esc(sub)}</small></div>${sw}</div>`;
  const what = kit ? '' : `<div class="tn-card">${'<div class="tn-hd">' + badge('sprout', 'p-leaves') + '<div><div class="tn-k p-leaves">What I Use</div><div class="tn-sub">Turn a part on and it shows on Today.</div></div></div>'}
    <div class="tn-set">${t.choose.map(c => row(PARTS[c.id].a, PARTS[c.id].i, c.name, c.line, tsw('use', c.id, U(c.id), c.name))).join('')}</div></div>`;
  const why = kit ? '' : `<div class="tn-card p-trunk"><div class="tn-hd">${badge('compass')}<div><div class="tn-k">${esc(t.why.h)}</div><div class="tn-sub">${h.set.why ? esc(h.set.why) : esc(t.why.prompt)}</div></div></div>
    <div class="tn-acts"><button type="button" class="tn-btn sm line" data-hja="why">${ic('plus')}${h.set.why ? 'Change My Why' : esc(t.why.write)}</button>${h.set.whyHide && !h.set.why ? `<button type="button" class="linkbtn" data-hja="whyshow">Show the My Why Card on Today</button>` : ''}</div></div>`;
  const bridges = kit ? '' : `<div class="tn-card"><div class="tn-hd">${badge('link', 'p-trunk')}<div><div class="tn-k p-trunk">Bridges</div><div class="tn-sub">How Tending and your other Grounded tools connect. Your choices are saved now, and the bridges open in a coming update.</div></div></div>
    <div class="tn-set">${row('p-leaves', 'sprout', 'Quiet Offers', 'A small card when a tree and Tending can help each other', tsw('bridge', 'offers', br.offers !== false, 'Quiet Offers'))}
    ${row('p-trunk', 'tree', 'Share My Week with My Tree', 'Workouts, meals, and quiet minutes appear beside Leaves and Bark in a check-in', tsw('bridge', 'oak', !!br.oak, 'Share My Week with My Tree'))}
    ${row('p-branches', 'sun2', 'Living Sober on Today', 'Living Sober\'s daily check joins Today, when you use both', tsw('bridge', 'sober', !!br.sober, 'Living Sober on Today'))}</div></div>`;
  const rem = `<div class="tn-card" id="tn-rem"><div class="tn-hd">${badge('bell', 'a-today')}<div><div class="tn-k a-today">Reminders</div><div class="tn-sub">Tending stays quiet until you ask.</div></div></div>
    <div class="tn-set">${row('a-today', '', 'Keep It Rolling', on ? 'On. Thaw, shop, prep, and grab and go notes show on Today.' : 'Off. Turn on to see thaw, shop, prep, and grab and go notes on Today.', tsw('remoff', '', on, 'Keep It Rolling'))}
    <div class="${on ? '' : 'dim'}">${row('a-week', 'week', 'Also on This Week', 'Each day\'s notes on the week view', tsw('remwk', '', on && !h.set.remWk, 'Also on This Week'))}
    <div class="tn-row a-today"><span class="ic2">${ic('clock')}</span><div class="tx"><b>My Phone Calendar</b><small>Steady reminders in your phone's own calendar, with an alert at each time.</small></div><button type="button" class="tn-btn sm line" data-hja="remics"${on ? '' : ' disabled'}>Add</button></div></div>
    ${kit ? '' : row('p-fruit', 'star', 'Celebrate Milestones', 'A small note when you reach one. Days you skip stay quiet.', tsw('celebrate', '', h.set.celebrate !== false, 'Celebrate Milestones'))}</div></div>`;
  const plan = kit ? '' : PUB() ? pubSettingsCard() : `<div class="tn-card"><div class="tn-hd">${badge('compass', 'a-numbers')}<div><div class="tn-k a-numbers">My Plan</div><div class="tn-sub">${MINE_ANY() && MINE_ANY().who ? 'Whose phone, your training' : 'Your training'}, the start date, your household, and your goals.</div></div></div><button type="button" class="tn-btn sm line a-numbers" data-hja="setup">My Goals</button></div>`;
  if (bare) return `<div class="tn-sec a-today"><div class="tn-two"><div class="tn-col">${voiceCard()}${houseCard()}${what}${why}</div><div class="tn-col">${plan}${holSetCard()}${rem}${bridges}<div class="tn-note">${ic('shield')}<div>${esc(TD().intro.private)}</div></div></div></div></div>`;
  return `<div class="tn-sec a-today">${secHead('gear', 'a-today', 'Settings', 'What you use, how Tending connects, and reminders. Every bridge and reminder starts from your choice.')}
    <div class="tn-two"><div class="tn-col">${what}${why}</div><div class="tn-col">${bridges}${rem}${plan}${holSetCard()}<div class="tn-note">${ic('shield')}<div>${esc(TD().intro.private)}</div></div></div></div></div>`;
}

// ---------- Morning Quiet: a gentle timer, a scene, one line at a time ----------
function quietLine(o){ const L = TD().spirit.lines, el = o.run ? (o.tot - Math.max(0, o.end - Date.now())) : (o.tot ? o.tot - (o.left || o.tot) : 0); return L[(o.l0 + Math.floor(el / 60000)) % L.length] || ''; }
function quietOv(m){ const sp = TD().spirit, mins = +m || +H().set.quietMins || sp.minutes[0] || 5, d = new Date();
  return {k: 'quiet', title: sp.h, mins, left: 0, run: false, tot: mins * 60000, l0: (d.getDate() + d.getMonth() * 31) % Math.max(1, sp.lines.length)}; }
function openQuiet(m){ openOv(quietOv(m)); }
function vQuiet(o, top){
  const sp = TD().spirit, ms = o.run ? o.end - Date.now() : (o.left || o.mins * 60000);
  const sceneBox = `<div class="tn-qscene" aria-hidden="true">${scene('dawn', 6.3, 400, 240)}</div>`;
  if (o.fin) return `${top(sp.h, 'Done')}${sceneBox}<div class="hj-ovb"><div class="hj-big2">${esc(sp.done)}</div><p class="hj-sub">${esc(quietLine(o))}</p><button type="button" class="btn btn-gold hj-go" data-hja="ovclose">Close</button></div>`;
  const started = o.run || (o.left && o.left < o.mins * 60000);
  return `${top(sp.h, o.mins + ' minutes')}${sceneBox}<div class="hj-ovb">
    ${started ? `<p class="hj-mot" data-hjqline>${esc(quietLine(o))}</p>` : `<p class="hj-mot">${esc(sp.invite)}</p><div class="hj-chips tn-qmins" role="group" aria-label="Minutes">${sp.minutes.map(n => `<button type="button" class="chip${n === o.mins ? ' on' : ''}" aria-pressed="${n === o.mins}" data-hja="qmin" data-hjv="${n}">${n} min</button>`).join('')}</div>`}
    <div class="hj-clock" data-hjclock>${clock(ms)}</div>
    <div class="hj-ovbtns"><button type="button" class="btn btn-gold" data-hja="${o.run ? 'pause' : 'qstart'}">${o.run ? 'Pause' : started ? 'Keep Going' : 'Begin'}</button><button type="button" class="btn btn-line" data-hja="qdone">Done</button></div>
    <p class="hj-sub" style="margin-top:16px"><a class="tn-link" href="/readings.html" target="_blank" rel="noopener">${ic('book')}${esc(sp.readings)}</a></p></div>`;
}

// ---------- the LDL sparkline for Fruit (one line: the food plan estimate, done to today, then ahead) ----------
function ldlSpark(m){
  const W = 300, Ht = 96, mw = Math.max(8, Math.min(m.maxW, 52)), vals = [m.B, m.f(mw, 'c')].concat(m.pts.map(p => +p.x.ldl));
  const hi = Math.max(...vals) + 6, lo = Math.min(...vals) - 10, x = t => 8 + Math.min(mw, Math.max(0, t)) / mw * (W - 16), y = v => 8 + (hi - v) / (hi - lo || 1) * (Ht - 20), f1 = n => n.toFixed(1);
  const pth = (a, b) => { let d = ''; for (let t = a; t <= b + 1e-9; t += 0.5) d += (d ? 'L' : 'M') + f1(x(t)) + ' ' + f1(y(m.f(t, 'c'))); return d; };
  const tn = Math.min(mw, m.tNow), lv = m.f(mw, 'c');
  return `<svg class="tn-spark" viewBox="0 0 ${W} ${Ht}" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <line class="tg" x1="0" x2="${W}" y1="${f1(y(lv))}" y2="${f1(y(lv))}"/><text x="${W - 4}" y="${f1(y(lv) - 5)}" text-anchor="end">Plan ${r0(lv)}</text>
    <path class="area" d="${pth(0, mw)} L${f1(x(mw))} ${Ht} L${f1(x(0))} ${Ht}Z"/><path class="proj" d="${pth(tn, mw)}"/>${tn > 0 ? `<path class="done" d="${pth(0, tn)}"/>` : ''}
    ${m.pts.map(p => `<circle class="lab" cx="${f1(x(p.t))}" cy="${f1(y(+p.x.ldl))}" r="4.5"/>`).join('')}
    <circle class="now" cx="${f1(x(tn))}" cy="${f1(y(m.f(tn, 'c')))}" r="6"/><text x="${f1(Math.min(W - 60, x(tn) + 10))}" y="${f1(Math.min(Ht - 4, y(m.f(tn, 'c')) + 4))}">Today</text></svg>`;
}
// The 7 day view: things tended each day, one bar each, today outlined; a table view for every reader.
function tendWeek(){
  const d0 = day0(new Date()), rows = [6, 5, 4, 3, 2, 1, 0].map(i => { const d = addD(d0, -i), k = ymd(d); return {k, d1: DOW[d.getDay()].slice(0, 2), lab: DOW[d.getDay()] + ' ' + short(k), n: dayInfo(k).n}; });
  if (S.fruitTable) return `<div class="hj-tw"><table class="hj-tbl"><thead><tr><th>Day</th><th>Things Tended</th></tr></thead><tbody>${rows.slice().reverse().map(r => `<tr><td>${esc(r.lab)}</td><td><b>${r.n}</b></td></tr>`).join('')}</tbody></table></div>`;
  const W = 320, Ht = 120, pl = 8, pr = 8, pt = 18, pb = 22, pw = W - pl - pr, ph = Ht - pt - pb, top = Math.max(4, ...rows.map(r => r.n)) * 1.12, bw = pw / 7 * 0.56, f1 = n => n.toFixed(1);
  const bar = (x, v) => { const h = Math.max(0, ph * v / top), r = Math.min(4, h, bw / 2), y0 = pt + ph; if (h <= 0) return ''; return `M${f1(x)},${f1(y0)}V${f1(y0 - h + r)}Q${f1(x)},${f1(y0 - h)} ${f1(x + r)},${f1(y0 - h)}H${f1(x + bw - r)}Q${f1(x + bw)},${f1(y0 - h)} ${f1(x + bw)},${f1(y0 - h + r)}V${f1(y0)}Z`; };
  return `<div class="hj-wbs tn-wk7"><svg class="hj-wbsvg tn-wbsvg" viewBox="0 0 ${W} ${Ht}" role="img" aria-label="Things tended, last 7 days: ${rows.map(r => r.lab + ' ' + r.n).join(', ')}.">
    <line x1="${pl}" x2="${W - pr}" y1="${pt + ph}" y2="${pt + ph}" class="gr"/>
    ${rows.map((r, i) => { const x = pl + pw / 7 * i + (pw / 7 - bw) / 2; return `<g class="hj-wbg" data-ptip="${esc(r.lab + ': ' + (r.n ? r.n + ' tended' : 'a quiet day'))}"><rect class="hit" x="${f1(pl + pw / 7 * i)}" y="${pt}" width="${f1(pw / 7)}" height="${ph}"/><path d="${bar(x, r.n)}" class="b${i === 6 ? ' on' : ''}"/>${r.n ? `<text x="${f1(x + bw / 2)}" y="${f1(pt + ph - ph * r.n / top - 4)}" text-anchor="middle" class="vl">${r.n}</text>` : ''}<text x="${f1(x + bw / 2)}" y="${Ht - 6}" text-anchor="middle" class="ax${i === 6 ? ' on' : ''}">${esc(r.d1)}</text></g>`; }).join('')}
  </svg><div class="hj-ptip" hidden></div></div>`;
}
function fruitCards(){
  const out = [], kit = KIT(); if (kit) return '';
  if (U('labs') && PUB()) out.push(pubLdlCard());
  else if (U('labs')){ const m = ldlModel();
    out.push(m ? `<button type="button" class="tn-card tn-lift tn-ldl p-fruit" data-hja="sec" data-hjv="numbers" aria-label="Open My LDL Path. Start ${r0(m.B)}, estimate now ${r0(m.now)}, the food plan path levels near ${r0(m.level)}.">
      <div class="tn-hd">${badge('star')}<div style="min-width:0;flex:1"><div class="tn-k">Fruit · My LDL Path</div><div class="tn-sub">Food plan estimate${m.tNow > 0 ? ', week ' + Math.max(1, Math.ceil(m.tNow)) : ''}</div></div></div>
      <div class="tn-nums"><div><b>${r0(m.B)}</b><small>Start, ${esc(short(m.base.date))}</small></div><div><b>${r0(m.now)}</b><small>Estimate now</small></div><div><b class="soft">${r0(m.level)}</b><small>Food plan path</small></div></div>
      ${ldlSpark(m)}<span class="tn-link">Open My LDL Path${ic('arrow')}</span></button>`
      : `<div class="tn-card p-fruit"><div class="tn-hd">${badge('flask')}<div><div class="tn-k">Fruit · My Numbers</div><div class="tn-sub">Add your lab numbers to see your path, private to this device.</div></div></div><button type="button" class="tn-btn sm" data-hja="sec" data-hjv="numbers">${ic('plus')}Add Numbers</button></div>`); }
  const ms = milestonesT(), got = ms.filter(m => m.done), next = ms.filter(m => !m.done).sort((a, b) => (a.need - a.have) / a.need - (b.need - b.have) / b.need)[0];
  out.push(`<div class="tn-card p-fruit" id="tn-ms"><div class="tn-hd">${badge('star')}<div style="min-width:0;flex:1"><div class="tn-k">Fruit · Milestones</div><div class="tn-sub">${got.length ? got.length + ' reached so far. ' : ''}${esc(TD().intro.quiet)}</div></div></div>
    <div class="tn-mile">${got.slice(-3).map(m => `<div><i>${ic('check')}</i><span><b>${esc(m.name)}</b><small>${esc(m.line || '')}</small></span></div>`).join('')}
    ${next ? `<div class="up"><i>${ic('star')}</i><span><b>${esc(next.name)}</b><small>${next.need > 1 ? `${Math.min(next.have, next.need)} of ${next.need}. ` : ''}${esc(next.line || '')}</small></span></div>` : ''}</div>
    ${ms.length > 4 ? `<details class="tn-more"${S.open['tnms'] ? ' open' : ''} data-hjd="tnms"><summary>See All Milestones</summary><div class="tn-mile">${ms.map(m => `<div class="${m.done ? '' : 'up'}"><i>${ic(m.done ? 'check' : 'star')}</i><span><b>${esc(m.name)}</b><small>${m.done ? 'Reached' : m.need > 1 ? Math.min(m.have, m.need) + ' of ' + m.need : 'Ahead'}</small></span></div>`).join('')}</div></details>` : ''}</div>`);
  out.push(`<div class="tn-card p-fruit" id="tn-wk7"><div class="tn-hd">${badge('week')}<div><div class="tn-k">Fruit · My Last 7 Days</div><div class="tn-sub">Things tended each day. Every one counts.</div></div></div>${tendWeek()}
    <button type="button" class="tn-btn sm line" data-hja="fruittable" aria-pressed="${!!S.fruitTable}">${S.fruitTable ? 'View as Chart' : 'View as Table'}</button></div>`);
  return out.join('');
}

// ---------- Today ----------
const partOf = x => x.k === 'work' || x.k === 'prac' || x.k === 'mark' ? 'move' : x.k === 'med' ? 'mind' : ['cook', 'shop', 'prep', 'hol', 'menu'].includes(x.k) ? 'food' : '';
const ACC = {work: 'a-move', prac: 'a-move', mark: 'a-move', med: 'p-bark', cook: 'a-kitchen', shop: 'a-kitchen', prep: 'a-kitchen', quiet: 'p-roots', supp: 'a-today'};
const SCN = {work: 'work', prac: 'practice', mark: 'work', med: 'practice', cook: 'cook', shop: 'bowl', prep: 'cook', quiet: 'dawn', supp: 'night'};
function habitList(){
  const lib = FLDH() || {}, mine = MINE(), sp = supps(), lv = new Set(sp.map(lever).filter(Boolean));
  const all = (arr(lib.today && lib.today.checks).length ? lib.today.checks : PUB() ? CHECKS_P : CHECKS).concat(arr(mine && mine.checks));
  const food = ['fiber', 'plants', 'water', 'nuts', 'psyllium', 'sterols'];
  return all.filter(c => c && c.id && !['move', 'still'].includes(c.id) && !(U('supps') && (lv.has(c.id) || (sp.length && ['psyllium', 'sterols'].includes(c.id)))))
    .map(c => Object.assign({part: food.includes(c.id) ? 'food' : c.id === 'walk' ? 'move' : U('food') ? 'food' : 'move'}, c)).filter(c => U(c.part));
}
function vTodayT(lib){
  const h = H(), d = new Date(), hr = d.getHours() + d.getMinutes() / 60, k = today(), day = h.days[k] || {}, c = day.checks || {}, n = weekNo(d), kit = KIT(), t = TD(), s0 = startMon(), before = n < 1;
  const tl = []; const tally = (part, done) => tl.push({part, done: !!done});
  const ag = agenda(d).filter(x => partOf(x) && U(partOf(x))).map(x => Object.assign({done: isDone(d, x.key)}, x));
  const sp = U('supps') && !kit ? supps() : [], spOf = w => sp.filter(s => (s.when === 'evening') === (w === 'evening')), allOn = L => L.length && L.every(s => c[suppId(s)]);
  const nowList = ag.slice();
  if (U('spirit') && !kit) nowList.push({key: 'quiet', k: 'quiet', hour: 6, kick: 'Morning', title: t.spirit.h, sub: t.spirit.invite, btn: 'Quiet Timer', done: !!c.quiet});
  ['morning', 'evening'].forEach(w => { const L = spOf(w); if (L.length) nowList.push({key: 'supp:' + w, k: 'supp', v: w, hour: w === 'morning' ? 6.2 : 20.5, kick: w === 'morning' ? 'This morning' : 'This evening', title: (w === 'morning' ? 'Morning' : 'Evening') + ' Supplements', sub: L.map(s => s.name).join(', ') + '.', btn: 'All Taken', done: allOn(L)}); });
  if (!kit) ownNow(d).forEach(x => nowList.push(x));   // BLD 896: My Own Items
  nowList.sort((a, b) => a.hour - b.hour);
  const open = nowList.filter(x => !x.done), due = open.filter(x => x.hour <= hr + 0.25), cur = due.length ? due[due.length - 1] : open[0];
  const nm = PUB() ? (() => { try { return C.name ? String(C.name() || '').trim().split(/\s+/)[0] : ''; } catch(e){ return ''; } })() : '';
  const greet = (hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening') + (['Chris', 'Kayti'].includes(h.set.who) ? ', ' + h.set.who : nm ? ', ' + nm : '');
  const plan = U('food') || U('move');
  const chips = kit || plan ? (before ? `<span class="tn-chip">Starts ${esc(shortDate(s0))}</span>` : `<span class="tn-chip">Week ${n}</span>${U('food') ? `<span class="tn-chip g">${ic('leaf')}Food Week ${letter(foodWeek(d))}</span>` : ''}`) : '';
  const hero = `<div class="tn-hero"><svg class="tn-sky" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">${outdoors(skyAt(hr), 400, 300, {flip: true})}</svg>
    <div class="in"><div class="greet">${ic(hr < 17 ? 'sunrise' : 'moon')}<span>${esc(greet)}</span></div><h2 class="day">${esc(DOWL[d.getDay()])}</h2><div class="date">${esc(MONTHS[d.getMonth()] + ' ' + d.getDate())}</div>${chips ? `<div class="chips">${chips}</div>` : ''}</div></div>`;
  const nowBtn = x => x.k === 'quiet' ? `data-hja="quiet" data-hjv=""` : x.k === 'supp' ? `data-hja="suppall" data-hjv="${esc(x.v)}"` : `data-hja="go" data-hjv="${esc(x.key)}"`;
  const nowCardT = cur ? `<div class="tn-card tn-now ${ACC[cur.k] || 'a-today'}"><div class="tn-k">Right Now · ${esc(cur.kick)}</div><div class="row"><div style="min-width:0;flex:1"><h3>${esc(cur.title)}</h3><div class="tn-sub">${esc(cur.sub || '')}</div></div><div class="art">${scene(SCN[cur.k] || 'work', cur.hour)}</div></div>
      <button type="button" class="tn-btn big pulse" ${nowBtn(cur)}>${ic(cur.k === 'quiet' ? 'clock' : cur.k === 'supp' ? 'check' : 'play')}<span>${esc(cur.btn)}</span></button>${cur.did ? `<button type="button" class="linkbtn tn-did" data-hja="toggle" data-hjv="${esc(cur.key)}">I Did It on My Own</button>` : ''}</div>`
    : `<div class="tn-card tn-now a-today"><div class="tn-k">Right Now</div><h3>Everything for today is tended.</h3><p class="tn-sub">Rest well. Tomorrow keeps growing.</p></div>`;
  // Body: movement, Today's Plate, tonight's dinner, prep and shopping, supplements, daily checks.
  const body = [], mind = [], spirit = [], people = [];
  const cardFor = x => { tally(partOf(x), x.done); const mark = x.k === 'mark';
    return planCard({cls: ACC[x.k], done: x.done, scene: SCN[x.k], hour: x.hour, time: x.kick, title: x.title, sub: x.sub, btn: mark ? '' : x.k === 'cook' ? 'Guide Me' : x.btn, bv: x.key, ck: tck('toggle', x.key, x.done, mark ? x.btn : x.k === 'cook' ? 'Cooked' : 'Done')}); };
  if (U('move')){ const mv = ag.filter(x => partOf(x) === 'move'); mv.forEach(x => body.push(cardFor(x)));
    if (!mv.length && !kit){ tally('move', c.move); body.push(`<div class="tn-card tn-edge a-move"><div class="tn-hd">${badge('move')}<div><div class="tn-k">Movement</div><div class="tn-sub">A rest day on the plan. Move in a way that feels good.</div></div></div><div class="tn-list">${tck('check', 'move', c.move, 'Moved with purpose', PUB() ? 'A walk, a stretch, fresh air' : 'A walk, the dog, fresh air')}</div></div>`); } }
  if (U('food')){ const pl = vPlate('today'); if (pl){ tally('food', arr(day.eat).length); body.push(pl); }
    ag.filter(x => partOf(x) === 'food').forEach(x => body.push(cardFor(x))); }
  if (sp.length){ sp.forEach(s => tally('supps', c[suppId(s)]));
    const col = w => { const L = spOf(w); return L.length ? `<div><div class="tn-k">${ic(w === 'morning' ? 'sunrise' : 'moon')}${w === 'morning' ? 'Morning' : 'Evening'}</div><div class="tn-list">${L.map(s => tck('check', suppId(s), c[suppId(s)], s.name, s.note)).join('')}</div></div>` : ''; };
    body.push(`<article class="tn-card a-today" id="tn-supps"><div class="tn-hd">${badge('capsule')}<div><div class="tn-k">Supplements</div><div class="tn-sub">Morning and evening, with a full glass of water</div></div></div><div class="tn-split">${col('morning')}${col('evening')}</div></article>`); }
  else if (U('supps') && !kit) body.push(`<div class="tn-card a-today"><div class="tn-hd">${badge('capsule')}<div><div class="tn-k">Supplements</div><div class="tn-sub">Add what you take on the Plate page, and it joins Today morning and evening.</div></div></div><button type="button" class="tn-btn sm line" data-hja="sec" data-hjv="${U('food') ? 'plate' : 'settings'}">${ic('plus')}Add a Supplement</button></div>`);
  if (!kit && plan){ const hb = habitList(); if (hb.length){ hb.forEach(x => tally(x.part, c[x.id]));
    body.push(`<div class="tn-card a-today" id="tn-checks"><div class="tn-hd">${badge('leaf', 'a-plate')}<div><div class="tn-k">Daily Checks</div><div class="tn-sub">Small things that add up</div></div></div><div class="tn-list tn-l2">${hb.map(x => tck('check', x.id, c[x.id], x.label, x.sub)).join('')}</div></div>`); } }
  if (PUB()) pubTodayCards(body, people, c, tally);
  // Mind
  if (U('mind') && !kit){ ag.filter(x => x.k === 'med').forEach(x => mind.push(cardFor(x))); tally('mind', c.mindful);
    mind.push(`<div class="tn-card p-bark"><div class="tn-hd">${badge('wind')}<div><div class="tn-k">Mindful Moments</div><div class="tn-sub">Slow breath and quiet attention through the day</div></div></div><div class="tn-list">${tck('check', 'mindful', c.mindful, 'Mindful Moment', 'One slow breath before each meal')}</div></div>`); }
  // Spirit: offered, never pushed.
  if (U('spirit') && !kit){ tally('spirit', c.quiet); const qm = +h.set.quietMins || t.spirit.minutes[0];
    spirit.push(planCard({cls: 'p-roots', done: c.quiet, scene: 'dawn', hour: 6.3, time: 'Morning · ' + qm + ' min', title: t.spirit.h, sub: t.spirit.invite, btn: 'Quiet Timer', ba: 'quiet', bv: '', bi: 'clock', ck: tck('check', 'quiet', c.quiet, 'Done'),
      more: `<a class="tn-link" href="/readings.html" target="_blank" rel="noopener">${ic('book')}${esc(t.spirit.readings)}</a>`})); }
  // People
  if (U('people') && !kit){ const qs = t.people.questions, doy = Math.floor((day0(d) - new Date(d.getFullYear(), 0, 0)) / DAYMS), q = qs[doy % qs.length], dn = U('food') ? dinnerFor(d) : null;
    tally('people', c.together); tally('people', c.unplugged);
    people.push(`<article class="tn-card tn-edge p-branches"><div class="tn-k">Family Meals and Connection</div><div class="tn-list">${tck('check', 'together', c.together, 'Dinner Together', dn ? dn.name + ', at the table' : 'Around the table, together')}${tck('check', 'unplugged', c.unplugged, 'Unplugged Table', 'Phones rest away from the table')}</div>
      <div class="tn-note">${ic('star')}<div><div class="tn-k">Tonight's Question</div><div class="tn-q">${esc(q)}</div></div></div></article>`); }
  if (!kit) ownTodayCards(d, tally, {body, mind, spirit, people});   // BLD 896: My Own Items, in the part each tends
  // Today's Rhythm: things tended today.
  const dn0 = tl.filter(x => x.done).length; S.tally = {done: dn0, total: tl.length}; const parts = USE().filter(p => p !== 'labs' && (!kit || p === 'food'));
  const rhythm = tl.length ? `<div class="tn-card a-today tn-rhythm"><div class="tn-prog">${ring(dn0, tl.length, 104, 11, `<b>${dn0}</b><small>of ${tl.length}</small>`)}<div style="min-width:0"><div class="tn-k">Today's Rhythm</div><div class="tn-big">${dn0} thing${dn0 === 1 ? '' : 's'} tended</div><div class="tn-sub">${esc(t.intro.quiet)}</div></div></div>
      ${parts.length > 1 ? `<div class="tn-dots">${parts.map(p => { const on = tl.some(x => x.part === p && x.done); return `<span class="${PARTS[p].a}${on ? ' f' : ''}">${ic(PARTS[p].i)}<em>${esc((t.choose.find(z => z.id === p) || {}).name || p)}${on ? ', tended' : ''}</em></span>`; }).join('')}</div>` : ''}</div>` : '';
  // Trunk: My Why.
  let why = '';
  if (!kit){ const ex = t.why.examples, ph = ex[(d.getDate()) % Math.max(1, ex.length)] || '';
    if (S.whyEd) why = `<div class="tn-card p-trunk" id="tn-why"><div class="tn-k">${esc(t.why.h)}</div><div class="tn-sub">${esc(t.why.prompt)}</div><label class="hj-fld"><span>My Why, one line</span><input id="tn-whyin" maxlength="160" value="${esc(h.set.why || '')}" placeholder="${esc(ph)}" autocomplete="off"></label><div class="tn-acts"><button type="button" class="tn-btn sm" data-hja="whysave">Save</button><button type="button" class="tn-btn sm line" data-hja="whyclose">Close</button></div></div>`;
    else if (h.set.why) why = `<div class="tn-card p-trunk tn-whyc" id="tn-why">${badge('compass')}<div style="min-width:0;flex:1"><div class="tn-k">${esc(t.why.h)}</div><div class="tn-whyl">${esc(h.set.why)}</div></div>${tpt('Trunk')}</div>`;
    else if (!h.set.whyHide) why = `<div class="tn-card p-trunk" id="tn-why"><div class="tn-whyc">${badge('compass')}<div style="min-width:0;flex:1"><div class="tn-k">${esc(t.why.h)}</div><div class="tn-sub">${esc(t.why.prompt)}</div></div></div><div class="tn-acts"><button type="button" class="tn-btn sm line" data-hja="why">${ic('plus')}${esc(t.why.write)}</button><button type="button" class="linkbtn" data-hja="whyhide">Maybe Later</button>${tpt('Trunk')}</div></div>`; }
  const rem = U('food') ? remBlock(d) : '';
  const G = [];
  if (body.length) G.push(grpHead('body', 'Body', 'leaf', 'p-leaves', 'Leaves') + body.join(''));
  if (mind.length) G.push(grpHead('mind', 'Mind', 'lotus', 'p-bark', 'Bark') + mind.join(''));
  if (spirit.length) G.push(grpHead('spirit', 'Spirit', 'flame', 'p-roots', 'Roots') + spirit.join(''));
  if (people.length) G.push(grpHead('people', 'People', 'people', 'p-branches', 'Branches') + people.join(''));
  const fruit = kit ? '' : grpHead('fruit', 'Fruit', 'star', 'p-fruit', 'Fruit') + fruitCards();
  const more = `<div class="tn-card tn-more"><div class="tn-k">More</div><div class="tn-acts">${lib && (arr(lib.food).length || arr(lib.fitness).length) ? `<button type="button" class="tn-btn sm line" data-hja="sec" data-hjv="learn">${ic('book')}Why It Works</button>` : ''}${kit ? '' : `<button type="button" class="tn-btn sm line" data-hja="sec" data-hjv="journey">${ic('compass')}My Journey</button>`}<button type="button" class="tn-btn sm line" data-hja="sec" data-hjv="settings">${ic('gear')}Settings</button></div>${lib && lib.doctor ? `<p class="tn-sub" style="margin-top:10px">${esc(lib.doctor)}</p>` : ''}</div>`;
  const c2 = G.shift() || '';
  return `<section class="tn-grid tn-today" data-tn="today"><div class="tn-col tn-c1">${hero}</div><div class="tn-col tn-cnow">${nowCardT}${rhythm}${why}</div><div class="tn-col tn-crem">${rem}</div><div class="tn-col tn-cb">${c2}</div><div class="tn-col tn-cr">${G.join('')}${fruit}${more}</div></section>`;
}

// ---------- the other sections, in the new frame ----------
const kitTabs = cur => `<div class="tn-tabs" role="group" aria-label="Kitchen">${[['kitchen', 'Dinners', 'kitchen'], ['recipes', 'Recipes', 'bowl'], ['shop', 'Shop', 'cart'], ['prep', 'Prep', 'clock']].map(([id, l, i]) => `<button type="button" class="tn-tab${cur === id ? ' on' : ''}" aria-pressed="${cur === id}" data-hja="sec" data-hjv="${id}">${ic(i)}${l}</button>`).join('')}</div>`;
const numTabs = cur => `<div class="tn-tabs" role="group" aria-label="Numbers">${[['numbers', 'My Numbers', 'numbers'], ['journey', 'My Journey', 'compass']].map(([id, l, i]) => `<button type="button" class="tn-tab${cur === id ? ' on' : ''}" aria-pressed="${cur === id}" data-hja="sec" data-hjv="${id}">${ic(i)}${l}</button>`).join('')}</div>`;
function vKitchen(){
  const d = new Date(), fw = foodWeek(d), L = letter(fw), din = (APP() || {}).dinners || {}, w = (din.weeks || {})[L] || {}, tn = dinnerFor(d), log = H().log[today()] || {};
  const nut = x => nOk(x.nutHeart) && !KIT() ? nSf(x.nutHeart) + ' on the heart-health plate' : nSf(x.nut);
  const feat = tn ? (() => { const key = 'cook:' + tn.wk + ':' + tn.id, on = !!log[key];
    return `<article class="tn-card tn-feature a-kitchen${on ? ' done' : ''}"><div class="tn-fscene">${scene('cook', Math.max(17.8, new Date().getHours()), 400, 200)}</div><div class="body"><div class="tn-time">Tonight${tn.mins ? ' · ' + esc(tn.mins) + ' min' : ''}</div><h3>${esc(tn.name)}</h3><div class="tn-meta">${[nut(tn), 'Guided step by step'].filter(Boolean).map(esc).join(' · ')}</div>
      ${tn.prepped ? `<p class="tn-sub">${esc(tn.prepped)}</p>` : ''}<div class="tn-acts"><button type="button" class="tn-btn sm" data-hja="go" data-hjv="${esc(key)}">${ic('play')}Guide Me</button>${tck('toggle', key, on, 'Cooked')}</div></div></article>`; })() : '';
  const rest = arr(w.dinners).filter(x => !tn || x.id !== tn.id);
  return `<div class="tn-sec a-kitchen">${secHead('kitchen', 'a-kitchen', 'Kitchen', `Food Week ${esc(L)}. Dinners guided step by step.`)}${kitTabs('kitchen')}
    <div class="tn-kgrid">${feat}${rest.map(x => `<button type="button" class="tn-card tn-lift tn-kc" data-hja="cook" data-hjv="${esc(L + '|' + x.id)}"><span class="ill">${scene('bowl', 12, 96, 96)}</span><span class="tx"><span class="tn-time">${esc(DOWL[DOW.indexOf(x.day)] || x.day || '')}${x.mins ? ' · ' + esc(x.mins) + ' min' : ''}</span><span class="h3">${esc(x.name)}</span><span class="tn-meta">${esc(nut(x))}</span></span></button>`).join('')}</div>
    ${wbNote(w)}
    ${PUB() ? pubPlanEdit(L) + pubAims() : aims()}${ideasBlk(PUB() ? 'Lunches' : 'Grab and Go Lunches', din.lunches, 'lunches')}${ideasBlk(PUB() ? 'Breakfasts' : 'Grab and Go Breakfasts', din.breakfasts, 'breakfasts')}${ideasBlk('Snacks', din.snacks, 'snacks')}</div>`;
}
// ---------- BLD 875: Recipes. Every recipe the current library holds, in one list, each one opening the kitchen guide ----------
// Public: GGTendPublic.recipes. The Field Guide, a moved plan, and the Family Kitchen: every week's dinners (one of each)
// plus the breakfasts, lunches, and snacks that carry steps. A recipe opened here uses an idea key ('idea:recipe:<id>'),
// so finishing it marks only that recipe; tonight's dinner opens as tonight's dinner.
const R_MEALS = [['all', 'All'], ['breakfast', 'Breakfast'], ['lunch', 'Lunch'], ['dinner', 'Dinner'], ['snack', 'Snack'], ['party', 'Party Food'], ['drink', 'Drinks']];
const R_GOALS = [['heart', 'Heart'], ['energy', 'Energy'], ['strength', 'Strength'], ['weight', 'Weight'], ['well', 'Well']];
const R_FITS = [['vegan', 'Vegan'], ['vegetarian', 'Vegetarian'], ['dairyFree', 'Dairy Free'], ['glutenFree', 'Gluten Free'], ['nutFree', 'Nut Free'], ['kidFriendly', 'Kid Friendly']];
const R_ICO = {
  breakfast: '<path d="M3 13h18a9 9 0 0 1-18 0z"/><path d="M8 10a4 4 0 0 1 8 0"/><path d="M12 3.5v2M5.8 6.3l1.3 1.3M18.2 6.3l-1.3 1.3"/>',
  lunch: '<path d="M3 10.5L12 5l9 5.5z"/><path d="M3.5 13.5c2 1.4 3.6-.8 5.6.5s3.6-.8 5.6.5 3.6-.8 5.8.3"/><path d="M3 17h18v2.5H3z"/>',
  dinner: '<circle cx="12" cy="13" r="5.5"/><circle cx="12" cy="13" r="2.8"/><path d="M3 4v4.5a1.3 1.3 0 0 0 2.6 0V4M4.3 4v16"/><path d="M20.8 4c-1.2 1.4-1.6 3.8-1.6 6h1.6v10"/>',
  snack: '<path d="M12 7.5c-1.6-1.2-5-1.4-6.4 1.4S5 16.2 7.6 18.6 11 20.2 12 19.6c1 .6 1.9 1.3 4.4-1S20 11.7 18.4 8.9 13.6 6.3 12 7.5z"/><path d="M12 7.5c0-2 .9-3.4 2.4-4"/>',
  party: '<path d="M3 13h18a9 7 0 0 1-18 0z"/><path d="M9 21h6"/><path d="M10.5 10l3-6.5 3 6.5"/>',
  drink: '<path d="M6 7h10l-1.5 14h-7z"/><path d="M6.8 11.5h8.4"/><path d="M12.5 7l3-4.5h2.5"/><circle cx="17" cy="7" r="3"/>'};
const rIco = m => `<span class="ri" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false">${R_ICO[m] || R_ICO.dinner}</svg></span>`;
function recipesAll(){
  const out = [], seen = new Set(), add = r => { const k = String(r.name || '').trim().toLowerCase(); if (!r.id || !k || seen.has(r.id) || seen.has('n:' + k)) return; seen.add(r.id); seen.add('n:' + k); out.push(r); };
  if (PUB()){ arr((PLIB() || {}).recipes).forEach(r => { if (r && arr(r.steps).length) add({id: r.id, meal: r.meal || 'dinner', name: r.name, mins: r.mins, nut: r.nut, ing: arr(r.ingredients), goals: arr(r.goals), fits: arr(r.fits), pub: true}); }); return out; }
  const din = (APP() || {}).dinners || {}, wks = din.weeks || {};
  Object.keys(wks).sort().forEach(wk => arr((wks[wk] || {}).dinners).forEach(x => { if (x && arr(x.steps).length) add({id: x.id, meal: 'dinner', name: x.name, mins: x.mins, nut: x.nut, ing: arr(x.ingredients), goals: arr(x.goals), fits: arr(x.fits), wk}); }));
  [['breakfasts', 'breakfast'], ['lunches', 'lunch'], ['snacks', 'snack']].forEach(([ty, m]) => arr(din[ty]).forEach((x, i) => { if (x && arr(x.steps).length) add({id: x.id || ty + '-' + i, meal: m, name: x.name, mins: x.mins, nut: x.nut, ing: arr(x.ingredients).concat(arr(x.shop).map(g => g && g.name)), goals: arr(x.goals), fits: arr(x.fits), ty, i}); }));
  partyRecs().forEach(r => add({id: r.id, meal: r.meal, name: r.name, mins: r.mins, nut: r.nut, ing: arr(r.ingredients), goals: arr(r.goals), fits: arr(r.fits), pub: true}));
  return out;
}
// BLD 902: Party Food and Celebration Drinks live in the public file (shared/tending-public.js). The Field Guide (and a moved plan)
// loads it once, on first need, and lists those two meals beside the library's own recipes; they open in the same kitchen guide
// (Andrew's lines are recorded in the Guide folder too) and go on My Menu as 'r:<id>'. The Family Kitchen keeps its own list.
const PARTY_MEALS = ['party', 'drink'];
function partyRecs(){ if (PUB() || KIT()) return []; const P = window.GGTendPublic; if (!P){ partyLoad(); return []; } return arr(P.recipes).filter(r => r && PARTY_MEALS.includes(r.meal) && arr(r.steps).length); }
function partyLoad(){
  if (partyLoad.p || PUB() || window.GGTendPublic) return; partyLoad.p = 1;
  try { const el = document.createElement('script'); el.src = asset('shared/tending-public.js?v=b902'); el.async = true; el.onload = () => { try { rerender(true); } catch(e){} }; document.head.appendChild(el); } catch(e){}
}
function recipesShown(all){
  const m = S.rMeal || 'all', g = arr(S.rGoals), f = arr(S.rFits), q = String(S.rq || '').toLowerCase().split(/\s+/).filter(Boolean);
  return all.filter(r => (m === 'all' || r.meal === m) && g.every(x => r.goals.includes(x)) && f.every(x => r.fits.includes(x))
    && q.every(w => (r.name + ' ' + r.ing.join(' ')).toLowerCase().includes(w)));
}
const rNut = n => nOk(n) ? nLine(TEEN() ? Object.assign({}, n, {cal: null}) : n) : '';
function recipeRows(list){
  if (!list.length) return `<div class="tn-card tn-rnone"><p class="tn-sub">Clear the filters to see every recipe again.</p><button type="button" class="tn-btn sm line" data-hja="rclear">${ic('leaf')}Show Every Recipe</button></div>`;
  const ML = Object.fromEntries(R_MEALS);
  return list.map(r => `<button type="button" class="tn-card tn-lift tn-rc" data-hja="recipe" data-hjv="${esc(r.id)}">${rIco(r.meal)}<span class="tx"><span class="tn-time">${esc(ML[r.meal] || 'Dinner')}${r.mins ? ' · ' + esc(r.mins) + ' min' : ''}</span><span class="h3">${esc(r.name)}</span>${nOk(r.nut) ? `<span class="tn-meta hj-nl">${rNut(r.nut)}</span>` : ''}</span></button>`).join('');
}
const rCount = n => n + (n === 1 ? ' recipe' : ' recipes');
function vRecipes(){
  const all = recipesAll(), list = recipesShown(all), m = S.rMeal || 'all';
  const has = k => all.some(r => r[k].length), meals = R_MEALS.filter(([id]) => id === 'all' || all.some(r => r.meal === id));
  const row = (lbl, a, opts, on) => `<div class="hj-chips tn-rchips" role="group" aria-label="${esc(lbl)}">${opts.map(([id, l]) => { const p = on(id); return `<button type="button" class="chip${p ? ' on' : ''}" aria-pressed="${p}" data-hja="${a}" data-hjv="${id}">${esc(l)}</button>`; }).join('')}</div>`;
  const goals = has('goals') ? R_GOALS.filter(([id]) => all.some(r => r.goals.includes(id))) : [], fits = has('fits') ? R_FITS.filter(([id]) => all.some(r => r.fits.includes(id))) : [];
  return `<div class="tn-sec a-kitchen">${secHead('kitchen', 'a-kitchen', 'Kitchen', 'Every recipe in one place, with ingredients, steps, and a calm voice guiding each one.')}${kitTabs('recipes')}${holShelf()}
    <div class="tn-card tn-rfind">${meals.length > 2 ? row('Meal', 'rmeal', meals, id => id === m) : ''}
      <label class="hj-fld"><span>Search by name or ingredient</span><input id="hj-rq" type="search" placeholder="Lentils, salmon, oats..." autocomplete="off" value="${esc(S.rq || '')}"></label>
      ${goals.length ? `<div class="tn-k tn-rk">Goals</div>${row('Goals', 'rgoal', goals, id => arr(S.rGoals).includes(id))}` : ''}${fits.length ? `<div class="tn-k tn-rk">Fits</div>${row('Fits', 'rfit', fits, id => arr(S.rFits).includes(id))}` : ''}
      <p class="tn-sub tn-rcount" id="hj-rcount" aria-live="polite">${rCount(list.length)}</p></div>
    <div class="tn-rlist" id="hj-rlist">${recipeRows(list)}</div></div>`;
}
function rRes(){ const l = recipesShown(recipesAll()), b = document.getElementById('hj-rlist'), c = document.getElementById('hj-rcount'); if (b) b.innerHTML = recipeRows(l); if (c) c.textContent = rCount(l.length); }
function openRecipeId(id){
  const r = recipesAll().find(z => z.id === id); if (!r) return false;
  // BLD 877: in The Grounded Way (public mode), a public recipe opens on the public Recipes page in the Home's frame, with its
  // step by step guide built in, so there is one recipe design. The Field Guide and a moved plan keep the overlay below.
  // BLD 880: the page opens at the household's size (?serves=N), so the ingredients fit the table.
  if (r.pub && PUB() && typeof C.openPage === 'function' && C.openPage('/recipes/' + (tableOf() ? '?serves=' + tableOf() : '') + '#' + encodeURIComponent(id))) return true;
  const tn = dinnerFor(new Date()); if (tn && tn.id === id && r.meal === 'dinner'){ openCook(tn.wk, tn.id); return true; }
  let x;
  if (r.pub) x = ideaOf(recOf(id));
  else if (r.wk) x = arr((((APP() || {}).dinners || {}).weeks || {})[r.wk].dinners).find(z => z.id === id);
  else x = arr(((APP() || {}).dinners || {})[r.ty])[r.i];
  if (!x) return false;
  openOv({k: 'cook', idea: true, key: 'idea:recipe:' + id, title: x.name, sub: (x.mins ? x.mins + ' minutes' : '') + (!PUB() && x.cost ? ' · about $' + x.cost : ''), data: x}); return true;
}
function actRecipes(a, v){
  switch (a){
    case 'recipe': openRecipeId(v); return true;
    case 'rmeal': S.rMeal = v; rerender(true); return true;
    case 'rgoal': case 'rfit': { const k = a === 'rgoal' ? 'rGoals' : 'rFits', l = arr(S[k]).slice(), i = l.indexOf(v); if (i < 0) l.push(v); else l.splice(i, 1); S[k] = l; rerender(true); return true; }
    case 'rclear': S.rMeal = 'all'; S.rGoals = []; S.rFits = []; S.rq = ''; rerender(true); return true;
  }
  return false;
}
function vMove(){
  const d = new Date(), h = H(), ses = phaseSes(), pr = arr((PR() || {}).sessions), md = U('mind') ? arr((MED() || {}).sessions) : [], n = Math.max(1, weekNo(d));
  const ag = agenda(d).filter(x => partOf(x) === 'move').map(x => Object.assign({done: isDone(d, x.key)}, x));
  const tile = (key, sc, kick, title, sub, cls) => `<button type="button" class="tn-card tn-lift tn-kc ${cls}" data-hja="go" data-hjv="${esc(key)}"><span class="ill">${scene(sc, sc === 'work' ? 7.5 : 16.8, 96, 96)}</span><span class="tx"><span class="tn-time">${esc(kick)}</span><span class="h3">${esc(title)}</span><span class="tn-meta">${esc(sub)}</span></span></button>`;
  const lifts = Object.entries(h.lifts || {}).filter(([, v]) => v);
  return `<div class="tn-sec a-move">${secHead('move', 'a-move', 'Move', 'Workouts and Flow, with a calm voice coaching. Play any of them, any day.')}${PUB() ? pubMoveHead() : progCard()}
    ${ag.length ? `<div class="tn-kgrid">${ag.map(x => planCard({cls: ACC[x.k], done: x.done, scene: SCN[x.k], hour: x.hour, time: 'Today · ' + x.kick, title: x.title, sub: x.sub, btn: x.k === 'mark' ? '' : x.btn, bv: x.key, ck: tck('toggle', x.key, x.done, x.k === 'mark' ? x.btn : 'Done')})).join('')}</div>` : ''}
    ${ses.length ? `<h3 class="tn-h3">Workouts</h3><div class="tn-kgrid">${ses.map(([id, x]) => tile('work:' + id, 'work', (progOn() ? sesKick(id) : x.day || 'Session ' + id) + (x.mins ? ' · ' + x.mins + ' min' : ''), x.title || 'Session ' + id, lightOn(d) ? 'A lighter week: ease off a little.' : (x.lead || ''), 'a-move')).join('')}</div>` : ''}
    ${flowShelf(pr, x => tile('pracid:' + x.id, 'practice', flowKick(x), x.title, x.focus || '', 'a-move'))}
    ${md.length ? `<h3 class="tn-h3">Meditation</h3><div class="tn-kgrid">${md.map(x => tile('medid:' + x.id, 'practice', (x.day || '') + ' · ' + medMins(n) + ' min', x.title, x.focus || '', 'p-bark')).join('')}</div>` : ''}
    ${h.wlog.length ? `<div class="hj-blk">${kick('Recent Workouts')}${h.wlog.slice().reverse().slice(0, 8).map(w => `<div class="hj-entry"><b>${nice(w.date)}</b> · ${esc(w.title || 'Session ' + w.s)}${w.mins ? ` <small>${esc(w.mins)} min</small>` : ''}${w.note ? `<p>${esc(w.note)}</p>` : ''}</div>`).join('')}</div>` : ''}
    ${lifts.length ? `<div class="hj-blk">${kick('My Weights')}<ul class="hj-ms">${lifts.map(([id, v]) => `<li><b>${esc(String(id).replace(/[-_]/g, ' '))}</b><small>${esc(v)}${/^\d+(\.\d+)?$/.test(String(v)) ? ' lb' : ''}</small></li>`).join('')}</ul></div>` : ''}</div>`;
}
const NAVDEF = {today: ['Today', 'today', 'a-today'], week: ['Week', 'week', 'a-week'], plate: ['Plate', 'plate', 'a-plate'], kitchen: ['Kitchen', 'kitchen', 'a-kitchen'], move: ['Move', 'move', 'a-move'], numbers: ['Numbers', 'numbers', 'a-numbers']};
function navIds(){ if (KIT()) return ['today', 'week', 'kitchen']; const f = U('food'), m = U('move');
  return ['today'].concat(f || m ? ['week'] : [], f ? ['plate', 'kitchen'] : [], m ? ['move'] : [], U('labs') ? ['numbers'] : []); }
const navCur = () => ({shop: 'kitchen', prep: 'kitchen', recipes: 'kitchen', journey: 'numbers', kids: 'today', kidview: 'today', team: 'move'})[S.sec] || S.sec;
function navHtml(kind){ const ids = navIds(), cur = navCur(); if (ids.length < 2) return '';
  if (kind === 'top') return `<nav class="tn-top" aria-label="Tending sections">${ids.map(id => { const x = NAVDEF[id]; return `<button type="button" class="${x[2]}" data-hja="sec" data-hjv="${id}"${cur === id ? ' aria-current="page"' : ''}>${ic(x[1])}${x[0]}</button>`; }).join('')}</nav>`;
  return `<nav class="tn-bnav" aria-label="Tending sections"><ul style="grid-template-columns:repeat(${ids.length},minmax(0,1fr))">${ids.map(id => { const x = NAVDEF[id]; return `<li><button type="button" class="${x[2]}" data-hja="sec" data-hjv="${id}"${cur === id ? ' aria-current="page"' : ''}><span class="ic">${ic(x[1])}</span>${x[0]}</button></li>`; }).join('')}</ul></nav>`;
}

function view(){
  const lib = FLDH(); if (!lib || !H()) return '';
  if (workOn()) fig3dWarm();
  if (VO()) VO().setKey(((C.fld && C.fld()) || {}).audio);
  const h = H(), mine = MINE(), an = S.anim; S.anim = false;
  // Keep the start date once the plan is running, so it never drifts (BLD 857b).
  if (!KIT() && !h.set.start && firstMon()){ h.set.start = ymd(firstMon()); h.set.startAuto = 1; save(); }
  // BLD 857c: b857b saved the Monday before a weekend of shopping and prep (one week early); put that one start right, once.
  if (!KIT() && h.set.startFix !== 2){ const d = firstLog(); if (d && h.set.start === ymd(monOf(d)) && h.set.start !== ymd(firstMon())){ h.set.start = ymd(firstMon()); h.set.startAuto = 1; } h.set.startFix = 2; save(); }
  if (KIT()){ const st = ((C.fld && C.fld()) || {}).start; if (st && !h.set.kitStart){ h.set.start = st; h.set.kitStart = st; h.set.u = Date.now(); save(); } else if (st && h.set.kitStart !== st){ h.set.start = st; h.set.kitStart = st; save(); } if (!h.set.u){ h.set.u = Date.now(); save(); } if (!['today', 'week', 'shop', 'prep', 'kitchen', 'recipes', 'settings'].includes(S.sec)) S.sec = 'today'; }
  const first = !h.set.u || !!h.set.needSetup, chosen = PUB() ? !!h.set.pubDone : useSet();
  // A Founder's own starting numbers wait in the Founder library: offer them first, on every section, until added (BLD 840b).
  const ready = mine && mine.start && (arr(mine.start.labs).length || arr(mine.start.panels).length) && !h.labs.length && !h.panels.length;
  const offer = ready && chosen ? `<div class="hj-blk hj-offer tn-card a-numbers">${kick('Your Starting Numbers Are Ready')}<p class="hj-sub">Your labs, full panels, starting weight, and goals, ready to add to this device in one tap.</p><button type="button" class="btn btn-gold btn-sm" data-hja="mine">Add My Starting Numbers</button></div>` : '';
  const SECS2 = ['today', 'week', 'plate', 'kitchen', 'recipes', 'shop', 'prep', 'move', 'numbers', 'journey', 'learn', 'settings', 'own', 'holidays'].concat(PUB() ? ['kids', 'kidview', 'team'] : []);
  if (!SECS2.includes(S.sec)) S.sec = 'today';
  let body;
  if (PUB() && (!chosen || S.setup)) body = vCheck();
  else if (!chosen) body = vChoose();
  else if (!KIT() && (S.setup || (first && !ready && S.sec === 'today'))) body = `<div class="tn-sec a-numbers">${vSetup()}</div>`;
  else if (S.sec === 'own') body = `<div class="tn-sec a-week">${secHead('week', 'a-week', 'My Own Items', 'Your own rhythms beside your plan, kept on this device.')}${vOwn()}</div>`;
  else if (S.sec === 'week') body = `<div class="tn-sec a-week">${secHead('week', 'a-week', 'This Week', 'Every day of the plan, the dinners, the sessions, and the notes that keep it rolling.')}${vWeek()}</div>`;
  else if (S.sec === 'plate') body = `<div class="tn-sec a-plate">${secHead('plate', 'a-plate', 'Today\'s Plate', PUB() ? 'Tap what you eat. The rings fill as you go, with aims set by your goals.' : 'Tap what you eat. The rings fill as you go, and each logged day feeds My LDL Path.')}${vPlate('full')}${PUB() ? pubAims() : aims()}</div>`;
  else if (S.sec === 'kitchen') body = vKitchen();
  else if (S.sec === 'recipes') body = vRecipes();
  else if (S.sec === 'shop') body = `<div class="tn-sec a-kitchen">${secHead('kitchen', 'a-kitchen', 'Kitchen', 'The shopping list, on this device.')}${kitTabs('shop')}${vShop()}</div>`;
  else if (S.sec === 'prep') body = `<div class="tn-sec a-kitchen">${secHead('kitchen', 'a-kitchen', 'Kitchen', 'This week\'s prep, the batch calendar, and freezer stock.')}${kitTabs('prep')}${vPrep()}</div>`;
  else if (S.sec === 'move') body = vMove();
  else if (S.sec === 'learn') body = `<div class="tn-sec a-today">${secHead('book', 'a-today', 'Why It Works', 'The full plans behind every card: why it works, every recipe, every session.')}${vPlan(lib, 'food')}${vPlan(lib, 'fitness')}${SOBER}</div>`;
  else if (S.sec === 'numbers' && PUB()) body = `<div class="tn-sec a-numbers">${secHead('numbers', 'a-numbers', 'Numbers', 'Your labs beside their recommended ranges, and My LDL Path. Private to this device.')}${numTabs('numbers')}${vLabsP()}${vRisk()}</div>`;
  else if (S.sec === 'numbers') body = `<div class="tn-sec a-numbers">${secHead('numbers', 'a-numbers', 'Numbers', 'Labs, markers, and My LDL Path. Private to this device.')}${numTabs('numbers')}${vNumbers()}${vRisk()}</div>`;
  else if (S.sec === 'kids') body = vKids();
  else if (S.sec === 'kidview') body = vKidView();
  else if (S.sec === 'team') body = vTeam();
  else if (S.sec === 'journey') body = `<div class="tn-sec a-numbers">${secHead('compass', 'a-numbers', 'My Journey', 'What you noticed, what felt strong, and every milestone.')}${numTabs('journey')}${vJourney()}</div>`;
  else if (S.sec === 'settings') body = vSettings();
  else if (S.sec === 'holidays') body = vHol();
  else body = vTodayT(lib);
  // BLD 879: in the Field Guide, Tending for the guide, staff, and founder tiers is one card; Preview for Guides opens the full view.
  const card = MOVABLE() && !PREVIEW();
  if (card) return `<div id="hj-root" class="tn tn-one">${vCard(chosen || !!h.set.u)}${vOv()}</div>`;
  if (chosen && !KIT()) celebrate(milestonesT());
  const askWho = chosen && MINE_ANY() && MINE_ANY().who && h.set.u && !h.set.who && !first ? `<div class="hj-blk hj-offer tn-card">${kick('Whose Phone Is This?')}<p class="hj-sub">Tending keeps each person's plan and numbers on their own phone.</p><div class="hj-chips" style="margin:0">${['Chris', 'Kayti', 'Someone else'].map(w => `<button type="button" class="chip" data-hja="whoq" data-hjv="${w}">${w}</button>`).join('')}</div></div>` : '';
  const nav = chosen && !(S.setup || (first && !ready && !KIT() && S.sec === 'today' && !PUB())) && S.sec !== 'kidview';
  return `<div id="hj-root" class="tn${PUB() ? ' tn-pub' : ''}${TEEN() ? ' tn-teen' : ''}${an ? ' tn-anim' : ''}">
    ${MOVABLE() ? '<div class="row tn-tocard"><button type="button" class="btn btn-line btn-sm" data-hja="tocard">Back to the Card</button></div>' : ''}
    <div class="tn-bar"><div class="tn-brand"><b>${ic('sprout')}</b>${esc(TNAME())}</div>${nav ? navHtml('top') : ''}<span class="sp"></span>${nav ? `<button type="button" class="tn-iconbtn${S.sec === 'settings' ? ' on' : ''}" data-hja="sec" data-hjv="settings" aria-label="Settings">${ic('gear')}</button>` : ''}</div>
    ${KIT() ? '' : askWho + offer}
    ${body}${nav ? navHtml('bottom') : ''}${S.ovHome === 'host' ? '' : vOv()}</div>`;
}
// ---------- BLD 871: Heart Risk (PREVENT scores from the person's doctor) ----------
// Shows an example for a healthy adult until the person adds their own 10-year and 30-year scores; then theirs, with history.
// Tending never computes PREVENT itself: the scores come from the doctor (Chris, October 27, 2026).
const RISK_EX = {r10: 2, r30: 8};
const RISK_BANDS = [[0, 5, 'Low', 'var(--rk-good)'], [5, 7.5, 'Borderline', 'var(--rk-warn)'], [7.5, 20, 'Intermediate', 'var(--rk-ser)'], [20, 25, 'High', 'var(--rk-crit)']];
const riskBand = v => { const b = RISK_BANDS.find(x => v < x[1]) || RISK_BANDS[3]; return b; };
function riskDots(v, label){ const whole = Math.floor(v), part = v - whole; let h = '';
  for (let i = 0; i < 100; i++){ const on = i < whole, pt = i === whole && part > 0.05; h += `<i class="${on ? 'on' : pt ? 'pt' : ''}"${pt ? ` style="--pp:${Math.round(part * 100)}%"` : ''}></i>`; }
  return `<div class="hj-rk-dots" role="img" aria-label="${esc(label)}">${h}</div>`; }
// BLD 872: the PREVENT calculator (American Heart Association, base model, ASCVD, 10 and 30 years), the published
// coefficients (Khan and others, Circulation 2024), checked against the preventr package's worked example
// (woman, 50: 9.2% and 35.4%). Valid for ages 30 to 79. The doctor's number is the one that counts.
const PREVENT_B = {"f10":{"k":-3.819975,"age":0.719883,"nh":0.117697,"hdl":-0.151185,"sl":-0.083536,"sh":0.359285,"dm":0.834858,"smk":0.483108,"el":0.486462,"eh":0.039778,"bp":0.226531,"st":-0.059237,"bpsh":-0.039576,"stnh":0.084442,"anh":-0.056784,"ahdl":0.032569,"ash":-0.103598,"adm":-0.241754,"asmk":-0.079114,"ael":-0.167149},"m10":{"k":-3.500655,"age":0.709985,"nh":0.165866,"hdl":-0.114429,"sl":-0.283721,"sh":0.323998,"dm":0.71896,"smk":0.395697,"el":0.369007,"eh":0.020362,"bp":0.203652,"st":-0.086558,"bpsh":-0.032292,"stnh":0.114563,"anh":-0.03,"ahdl":0.023275,"ash":-0.092702,"adm":-0.201852,"asmk":-0.097053,"ael":-0.121708},"f30":{"k":-1.974074,"age":0.46692,"age2":-0.089312,"nh":0.12569,"hdl":-0.154225,"sl":-0.001809,"sh":0.322949,"dm":0.629671,"smk":0.268292,"el":0.100106,"eh":0.049966,"bp":0.187529,"st":0.015248,"bpsh":-0.027612,"stnh":0.073615,"anh":-0.052196,"ahdl":0.031692,"ash":-0.10461,"adm":-0.272779,"asmk":-0.153091,"ael":-0.129915},"m30":{"k":-1.736444,"age":0.39941,"age2":-0.093748,"nh":0.174464,"hdl":-0.120203,"sl":-0.066512,"sh":0.275304,"dm":0.479026,"smk":0.178263,"el":-0.021879,"eh":0.060255,"bp":0.142118,"st":0.0136,"bpsh":-0.021826,"stnh":0.101315,"anh":-0.031262,"ahdl":0.020673,"ash":-0.092093,"adm":-0.215995,"asmk":-0.154881,"ael":-0.071255}};
function preventCalc(i, yrs){
  const c = PREVENT_B[(i.sex === 'm' ? 'm' : 'f') + yrs]; if (!c) return null;
  const a = (i.age - 55) / 10, nh = (i.tc - i.hdl) * 0.02586 - 3.5, hd = (i.hdl * 0.02586 - 1.3) / 0.3;
  const sl = (Math.min(i.sbp, 110) - 110) / 20, sh = (Math.max(i.sbp, 110) - 130) / 20;
  const el = (Math.min(i.egfr, 60) - 60) / -15, eh = (Math.max(i.egfr, 60) - 90) / -15;
  const bp = i.bp ? 1 : 0, st = i.st ? 1 : 0, dm = i.dm ? 1 : 0, sm = i.smk ? 1 : 0;
  let x = c.k + c.age * a + c.nh * nh + c.hdl * hd + c.sl * sl + c.sh * sh + c.dm * dm + c.smk * sm + c.el * el + c.eh * eh + c.bp * bp + c.st * st + c.bpsh * bp * sh + c.stnh * st * nh
    + a * (c.anh * nh + c.ahdl * hd + c.ash * sh + c.adm * dm + c.asmk * sm + c.ael * el);
  if (c.age2) x += c.age2 * a * a;
  return Math.exp(x) / (1 + Math.exp(x)) * 100;
}
const PV_RANGE = {age: [30, 79], tc: [130, 320], hdl: [20, 100], sbp: [90, 180], egfr: [15, 140]};
function pvDefaults(){
  const h = H(), sv = (h.set && h.set.prevent) || {}, E = labs(), last = k => { for (let i = E.length - 1; i >= 0; i--){ const v = num(E[i][k]); if (v != null) return v; } return null; };
  return Object.assign({sex: 'm', bp: false, st: false, dm: false, smk: false}, sv, {tc: last('total') != null ? last('total') : sv.tc, hdl: last('hdl') != null ? last('hdl') : sv.hdl, sbp: last('sys') != null ? last('sys') : sv.sbp});
}
function pvResult(i){
  const miss = ['age', 'tc', 'hdl', 'sbp', 'egfr'].filter(k => num(i[k]) == null);
  if (miss.length) return {msg: 'Fill in every number to see your estimate.'};
  const v = {}; ['age', 'tc', 'hdl', 'sbp', 'egfr'].forEach(k => { v[k] = +i[k]; });
  const out = Object.keys(PV_RANGE).filter(k => v[k] < PV_RANGE[k][0] || v[k] > PV_RANGE[k][1]);
  if (out.length) return {msg: 'PREVENT was built for ages 30 to 79, total cholesterol 130 to 320, HDL 20 to 100, top blood pressure 90 to 180, and eGFR 15 to 140. Your doctor can give you a score outside those ranges.'};
  const x = Object.assign({}, i, v);
  return {r10: preventCalc(x, 10), r30: preventCalc(x, 30)};
}
function vPrevent(){
  const i = S.pv || (S.pv = pvDefaults()), r = pvResult(i), pct = v => (Math.round(v * 100) / 100) + '%';
  const nf = (k, label) => `<label class="hj-fld"><span>${esc(label)}</span><input type="number" inputmode="decimal" data-hjpv="${k}" value="${esc(i[k] != null ? i[k] : '')}"></label>`;
  const tg = (k, label) => `<button type="button" class="chip${i[k] ? ' on' : ''}" aria-pressed="${!!i[k]}" data-hja="pvtg" data-hjv="${k}">${esc(label)}</button>`;
  return `<div class="hj-blk hj-pv" id="hj-pv">${kick('Calculate With PREVENT')}<p class="hj-sub">The American Heart Association's PREVENT equations, the same ones doctors use. Change any number to see how your risk moves.</p>
    <div class="row hj-pv-sex"><button type="button" class="chip${i.sex === 'f' ? ' on' : ''}" aria-pressed="${i.sex === 'f'}" data-hja="pvsex" data-hjv="f">Female</button><button type="button" class="chip${i.sex === 'm' ? ' on' : ''}" aria-pressed="${i.sex === 'm'}" data-hja="pvsex" data-hjv="m">Male</button></div>
    <div class="hj-g3">${nf('age', 'Age')}${nf('tc', 'Total cholesterol')}${nf('hdl', 'HDL')}${nf('sbp', 'Blood pressure, top number')}${nf('egfr', 'eGFR (kidney, from your labs)')}</div>
    <div class="row">${tg('bp', 'Blood pressure medicine')}${tg('st', 'Statin')}${tg('dm', 'Diabetes')}${tg('smk', 'Smoke now')}</div>
    <div class="hj-pv-out" id="hj-pv-out">${pvOut(r)}</div>
    <div class="row"><button type="button" class="btn btn-gold btn-sm" data-hja="pvsave"${r.r10 == null ? ' disabled' : ''}>Save This Estimate</button><button type="button" class="btn btn-line btn-sm" data-hja="pvclose">Close</button></div>
    <p class="hj-note">An estimate from the published equations (base model), for talking over with your doctor; your doctor's score is the one that counts. Sources: Khan and others, PREVENT, Circulation (2024); checked against the preventr package (Mayer, R).</p></div>`;
}
function pvOut(r){ if (r.msg) return `<p class="hj-sub">${esc(r.msg)}</p>`; const pct = v => (Math.round(v * 100) / 100) + '%', b = riskBand(r.r10);
  return `<div class="hj-rk-tiles"><div><b>${pct(r.r10)}</b><small>Next 10 years</small><em><i style="background:${b[3]}"></i>${esc(b[2])}</em></div><div><b>${pct(r.r30)}</b><small>Next 30 years</small><em>About ${Math.round(r.r30)} in 100</em></div></div>`; }

function vRisk(){
  const h = H(), f = S.form, R = h.risk.slice().sort(byDate), cur = R.length ? R[R.length - 1] : null, ex = !cur, d = cur || RISK_EX;
  const pct = v => v == null ? '' : (Math.round(v * 100) / 100) + '%';
  const form = f && f.k === 'risk' ? `<div class="hj-blk" id="hj-form">${kick('Add My Heart Risk Scores')}<p class="hj-sub">From your doctor: the PREVENT 10-year and 30-year ASCVD risk, in percent.</p>
    <div class="hj-g3"><label class="hj-fld"><span>Date</span><input type="date" data-hjf="date" value="${esc(f.date || '')}"></label><label class="hj-fld"><span>10-year risk (%)</span><input type="number" inputmode="decimal" step="0.01" data-hjf="r10" value="${esc(f.r10 != null ? f.r10 : '')}"></label><label class="hj-fld"><span>30-year risk (%)</span><input type="number" inputmode="decimal" step="0.01" data-hjf="r30" value="${esc(f.r30 != null ? f.r30 : '')}"></label></div>
    <div class="row"><button type="button" class="btn btn-gold btn-sm" data-hja="risksave">Save</button><button type="button" class="btn btn-line btn-sm" data-hja="cancel">Cancel</button></div></div>` : '';
  const b10 = d.r10 != null ? riskBand(d.r10) : null;
  const mk = d.r10 != null ? Math.min(100, d.r10 / 25 * 100) : null;
  const scale = d.r10 != null ? `<div class="hj-rk-scale"><div class="hj-rk-mk" style="left:${mk}%">${ex ? 'Example' : 'Me'}: ${pct(d.r10)}</div><div class="hj-rk-bands">${RISK_BANDS.map(x => `<span title="${esc(x[2])}" style="flex:${x[1] - x[0]};background:${x[3]}"></span>`).join('')}</div>
    <div class="hj-rk-ticks"><span style="left:0">0%</span><span style="left:20%">5%</span><span style="left:30%">7.5%</span><span style="left:80%">20%</span><span style="left:100%">25%+</span></div>
    <div class="hj-rk-key">${RISK_BANDS.map(x => `<span><i style="background:${x[3]}"></i>${esc(x[2])}</span>`).join('')}</div></div>` : '';
  const hist = R.length > 1 ? `<div class="hj-tw"><table class="hj-tbl"><thead><tr><th>Date</th><th>10-year</th><th>30-year</th><th></th></tr></thead><tbody>${R.slice().reverse().map(x => `<tr><td>${esc(short(x.date))}${x.src === 'calc' ? ' <small>(calculated)</small>' : ''}</td><td>${pct(x.r10)}</td><td>${pct(x.r30)}</td><td><button type="button" class="linkbtn" data-hja="riskdel" data-hjv="${esc(x.id)}">Remove</button></td></tr>`).join('')}</tbody></table></div>` : '';
  return `<div class="hj-blk hj-rk" id="hj-risk">${kick('My Heart Risk')}
    ${ex ? `<p class="hj-sub"><b>Example: a healthy adult.</b> Add the PREVENT scores from your doctor and this card becomes yours.</p>` : `<p class="hj-sub">${cur.src === 'calc' ? 'Your PREVENT estimate, calculated' : 'Your PREVENT scores from your doctor'}, ${esc(short(cur.date))}: the chance of a heart attack or stroke (ASCVD).</p>`}
    <div class="hj-rk-tiles${ex ? ' ex' : ''}">
      ${d.r10 != null ? `<div><b>${pct(d.r10)}</b><small>Next 10 years</small><em><i style="background:${b10[3]}"></i>${esc(b10[2])}</em></div>` : ''}
      ${d.r30 != null ? `<div><b>${pct(d.r30)}</b><small>Next 30 years</small><em>About ${Math.round(d.r30)} in 100</em></div>` : ''}
    </div>
    <div class="hj-rk-arr">${d.r10 != null ? `<div>${riskDots(d.r10, 'About ' + Math.round(d.r10) + ' of 100 in 10 years')}<small>10 years: about ${Math.round(d.r10)} of 100 people with these numbers</small></div>` : ''}${d.r30 != null ? `<div>${riskDots(d.r30, 'About ' + Math.round(d.r30) + ' of 100 in 30 years')}<small>30 years: about ${Math.round(d.r30)} of 100</small></div>` : ''}</div>
    ${scale}
    <p class="hj-note">Bands for 10-year risk from the 2018 AHA/ACC Cholesterol Guideline; 30-year risk has no standard bands. An LDL of 190 or more usually brings a statin into the conversation whatever the score. These are your doctor's numbers to talk through together; ask for a new PREVENT score with each new set of labs.</p>
    ${hist}
    ${form ? '' : `<div class="row"><button type="button" class="btn ${ex ? 'btn-gold' : 'btn-line'} btn-sm" data-hja="riskadd">${ex ? 'Add My Scores From My Doctor' : 'Add New Scores'}</button>${S.pvOpen ? '' : `<button type="button" class="btn btn-line btn-sm" data-hja="pvopen">Calculate With PREVENT</button>`}</div>`}
  </div>${form}${S.pvOpen ? vPrevent() : ''}`;
}

// ---------- BLD 867: Move to My Home ----------
// The Field Guide's own Tending (plan, library copy, and everything logged) moves into the person's My Home vault
// (GGP.data(id, 'tending')), where /home/ runs it with the same engine. Private: it stays on this device, locked.
const MOVABLE = () => !PUB() && !KIT() && !(C.host === 'home');
// BLD 879: Preview for Guides is remembered for this browser session only.
const PVKEY = 'gg-tend-preview';
function PREVIEW(){ if (S.hereOk == null){ try { S.hereOk = sessionStorage.getItem(PVKEY) === '1'; } catch (e){ S.hereOk = false; } } return S.hereOk; }
function setPreview(on){ S.hereOk = on; try { if (on) sessionStorage.setItem(PVKEY, '1'); else sessionStorage.removeItem(PVKEY); } catch (e){} }
function vCard(hasPlan){
  const moved = !!H().set.movedHome, busy = S.moving;
  const move = moved ? `<button type="button" class="btn btn-line btn-sm" data-hja="movehome"${busy ? ' disabled' : ''}>${busy ? 'Moving...' : 'Bring Over What\'s New'}</button>`
    : hasPlan ? `<button type="button" class="btn btn-line btn-sm" data-hja="movehome"${busy ? ' disabled' : ''}>${busy ? 'Moving...' : 'Move My Plan to The Grounded Way'}</button>` : '';
  const when = moved ? 'After a library update, tap Bring Over What\'s New.' : hasPlan ? 'Move My Plan brings everything you logged here over in one tap, private on this phone.' : '';
  return `<div class="hj-blk tn-card hj-one">${kick('Tending')}<h3>Your Tending Lives in The Grounded Way</h3>
    <p class="hj-sub">Your plan, your week, and your tree grow together in The Grounded Way app, private on this phone.</p>
    <div class="row"><button type="button" class="btn btn-gold btn-sm" data-hja="openhome">Open The Grounded Way</button>${move}</div>
    ${when ? `<p class="hj-sub" style="margin-top:10px">${esc(when)}</p>` : ''}
    <div class="row" style="margin-top:6px"><button type="button" class="linkbtn" data-hja="movehere">Preview for Guides</button></div></div>`;
}
const clone = x => x == null ? x : JSON.parse(JSON.stringify(x));
function loadGGP(){
  if (window.GGP) return Promise.resolve();
  return new Promise((res, rej) => { const sc = document.createElement('script'); sc.src = '../shared/gg-profiles.js?v=b888'; sc.onload = () => res(); sc.onerror = () => rej(new Error('profiles')); document.head.appendChild(sc); });
}
async function moveHome(){
  if (S.moving) return; S.moving = true; rerender(true);
  try {
    await loadGGP(); if (window.GGP.ready) await window.GGP.ready;
    const ok = await window.GGP.require({reason: 'Open The Grounded Way to bring your Tending over.'});
    const a = ok && window.GGP.active && window.GGP.active(); if (!a) throw new Error('locked');
    const w = window.GGP.data(a.id, 'tending'); if (!w) throw new Error('vault');
    const f = (C.fld && C.fld()) || {}, fd = C.fdr && C.fdr(), d = D() || {};
    w.lib = clone({healthJourney: f.healthJourney, audio: f.audio});
    w.fdr = fd ? clone({healthMine: fd.healthMine, healthKayti: fd.healthKayti}) : null;
    w.tier = C.tier ? C.tier() : 'guide'; w.moved = Date.now();
    const fresh = !w.health || !w.health.set || w.health.set.pubDone || !w.movedOnce;
    if (fresh){ w.health = clone(d.health || {}); w.deleted = {health: clone(((d.deleted || {}).health) || {})}; }
    else window.GGHealth.merge(w, {health: d.health || {}, deleted: d.deleted || {}});
    w.movedOnce = 1;
    await window.GGP.save(a.id);
    const h = H(); h.set.movedHome = h.set.movedHome || today(); h.set.u = Date.now(); save();
    S.moving = false; toast('Your Tending is in The Grounded Way.'); rerender(false);
  } catch (e){ S.moving = false; toast('The Grounded Way stayed closed. Your Tending is here, ready to move any time.'); rerender(true); }
}

// BLD 881: three homes for what health.js draws. The full view (#hj-root, the Field Guide and older links), one bare section
// inside the host's element (#hj-bare, from GGHealth.render), and, when no full view is showing, the overlays in their own
// layer on the page (#hj-ov0), so a guide opened from The Grounded Way's Today plays full screen.
const vis = el => !!(el && el.isConnected && el.getClientRects().length);
function rerender(keep){
  const y = window.scrollY, root = document.getElementById('hj-root'), sync = () => { if (S.ov && S.ov.clk) clkSync(S.ov); fig3d(); };
  if (bareOn()){ S.ovHome = 'host'; paintBare(); paintOv(); sync(); if (keep) window.scrollTo(0, y); return; }
  if (vis(root)){ S.ovHome = 'full'; paintOv(); const w = document.createElement('div'); w.innerHTML = view(); root.replaceWith(w.firstElementChild); sync(); if (keep) window.scrollTo(0, y); return; }
  S.ovHome = 'host'; paintOv(); sync(); if (S.ov) return;
  if (C.render) C.render();
}
const toForm = () => setTimeout(() => { const f = document.getElementById('hj-form'); if (f && f.scrollIntoView) f.scrollIntoView({block: 'start', behavior: 'smooth'}); }, 30);
const FIELDS = {lab: ['date', 'ldl', 'total', 'hdl', 'trig', 'apob', 'note'], mark: ['date', 'weight', 'waist', 'rhr', 'pushups', 'pullups', 'mile', 'energy', 'sleep', 'joint', 'note']};

function act(a, v){
  const h = H(); if (!h) return;
  if (actOwn(a, v)) return;   // BLD 896: My Own Items and the Month
  if (PUB() && actPub(a, v)) return;
  if (actTool(a, v)) return;
  if (actPlate(a, v)) return;
  switch (a){
    case 'movehome': moveHome(); return;
    case 'pvopen': S.pvOpen = true; S.pv = pvDefaults(); rerender(true); setTimeout(() => { const e = document.getElementById('hj-pv'); if (e && e.scrollIntoView) e.scrollIntoView({block: 'start', behavior: 'smooth'}); }, 30); return;
    case 'pvclose': S.pvOpen = false; rerender(true); return;
    case 'pvsex': S.pv.sex = v; rerender(true); return;
    case 'pvtg': S.pv[v] = !S.pv[v]; rerender(true); return;
    case 'pvsave': { const r = pvResult(S.pv); if (r.r10 == null) return; const sv = {}; ['sex', 'age', 'tc', 'hdl', 'sbp', 'egfr', 'bp', 'st', 'dm', 'smk'].forEach(k => { sv[k] = S.pv[k]; }); h.set.prevent = sv; h.set.u = Date.now();
      h.risk.push({id: uid(), date: today(), r10: Math.round(r.r10 * 100) / 100, r30: Math.round(r.r30 * 100) / 100, src: 'calc', u: Date.now()}); save(); S.pvOpen = false; toast('Saved on this device.'); rerender(true); return; }
    case 'riskadd': S.form = {k: 'risk', date: today()}; S.edit = null; rerender(true); toForm(); return;
    case 'risksave': { const f = S.form; if (!f) return; if (!/^\d{4}-\d{2}-\d{2}$/.test(String(f.date || ''))){ toast('Choose a date.'); return; }
      const r10 = num(f.r10), r30 = num(f.r30); if (r10 == null && r30 == null){ toast('Add at least one score.'); return; }
      if ((r10 != null && (r10 < 0 || r10 > 100)) || (r30 != null && (r30 < 0 || r30 > 100))){ toast('Scores are percents from 0 to 100.'); return; }
      const rec = {id: S.edit || uid(), date: f.date, u: Date.now()}; if (r10 != null) rec.r10 = r10; if (r30 != null) rec.r30 = r30;
      const i = h.risk.findIndex(x => x.id === rec.id); if (i < 0) h.risk.push(rec); else h.risk[i] = rec;
      save(); S.form = null; S.edit = null; toast('Saved on this device.'); rerender(true); return; }
    case 'riskdel': { const i = h.risk.findIndex(x => x.id === v); if (i >= 0){ (D().deleted = D().deleted || {}).health = D().deleted.health || {}; D().deleted.health[v] = Date.now(); h.risk.splice(i, 1); save(); rerender(true); } return; }
    case 'movehere': setPreview(true); S.sec = 'today'; S.anim = true; rerender(false); window.scrollTo(0, 0); return;
    case 'tocard': setPreview(false); rerender(false); window.scrollTo(0, 0); return;
    case 'openhome': location.href = '../home/#tending'; return;
    case 'sec': if (bareOn()){ S.form = null; S.setup = false; S.shopWk = null; S.shopEd = null; S.whyEd = false; S.bare.section = v; S.bare.closed = false; rerender(false); return; }
      S.sec = v; S.form = null; S.setup = false; S.shopWk = null; S.wkOff = 0; S.shopEd = null; S.whyEd = false; S.anim = true; rerender(false); window.scrollTo(0, 0); return;
    // BLD 862: Choose What You Use, Settings, My Why, Morning Quiet, and the evening and morning supplements in one tap.
    case 'usetg': { const P = S.pick = S.pick || USE().slice(); S.pick = P.includes(v) ? P.filter(x => x !== v) : PART_IDS.filter(x => P.includes(x) || x === v); rerender(true); return; }
    case 'usesave': { const P = PART_IDS.filter(x => (S.pick || USE()).includes(x)); if (!P.length){ toast('Choose at least one part.'); return; }
      if (!h.set.u){ h.set.remOff = true; if (P.some(x => ['food', 'move', 'labs'].includes(x))) h.set.needSetup = 1; }
      h.set.use = P; h.set.u = Date.now(); S.pick = null; S.sec = 'today'; S.anim = true; save(); toast('Welcome to Tending.'); rerender(false); if (!bareOn()) window.scrollTo(0, 0); return; }
    case 'use': { const P = USE(); h.set.use = P.includes(v) ? P.filter(x => x !== v) : PART_IDS.filter(x => P.includes(x) || x === v); h.set.u = Date.now(); save(); rerender(true); return; }
    case 'bridge': { const b = h.set.bridges = Object.assign({offers: true, oak: false, sober: false}, h.set.bridges || {}); b[v] = !b[v]; h.set.u = Date.now(); save(); rerender(true); return; }
    case 'celebrate': h.set.celebrate = h.set.celebrate === false; h.set.u = Date.now(); save(); rerender(true); return;
    case 'why': S.whyEd = true; if (S.sec !== 'today'){ S.sec = 'today'; rerender(false); } else rerender(true); setTimeout(() => { const i = document.getElementById('tn-whyin'); if (i){ if (i.scrollIntoView) i.scrollIntoView({block: 'center'}); i.focus(); } }, 40); return;
    case 'whysave': { const i = document.getElementById('tn-whyin'), t = String(i ? i.value : '').trim().slice(0, 160); h.set.why = t; if (t) h.set.whyHide = 0; h.set.u = Date.now(); S.whyEd = false; save(); toast(t ? 'Saved. It greets you here each morning.' : 'Saved.'); rerender(true); return; }
    case 'whyclose': S.whyEd = false; rerender(true); return;
    case 'whyhide': h.set.whyHide = 1; h.set.u = Date.now(); save(); toast('Tucked away. Settings brings it back any time.'); rerender(true); return;
    case 'whyshow': h.set.whyHide = 0; h.set.u = Date.now(); save(); rerender(true); return;
    case 'quiet': openQuiet(v); return;
    case 'qmin': { const o = S.ov; if (o && o.k === 'quiet'){ o.mins = +v || 5; o.tot = o.mins * 60000; o.left = 0; o.run = false; h.set.quietMins = o.mins; save(); } rerender(true); return; }
    case 'qstart': { const o = S.ov; if (o){ startTimer(o, (o.left && o.left < o.mins * 60000 ? o.left : o.mins * 60000) / 1000); o.tot = o.mins * 60000; } rerender(true); return; }
    case 'qdone': { const o = S.ov; checkOn('quiet'); if (o){ o.run = false; o.fin = true; } rerender(true); return; }
    case 'suppall': { const t = today(), d = h.days[t] = h.days[t] || {checks: {}}; d.checks = d.checks || {}; supps().filter(s => (s.when === 'evening') === (v === 'evening')).forEach(s => { d.checks[suppId(s)] = true; }); d.u = Date.now(); save(); toast('Checked off. Well done.'); rerender(true); return; }
    case 'fruittable': S.fruitTable = !S.fruitTable; rerender(true); return;
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
    case 'setup': S.setup = true; S.set = null; if (bareOn()){ toSetup(); return; } rerender(false); toForm(); return;
    case 'bareagain': if (S.bare && openInline(S.bare)) rerender(false); return;
    case 'hhadj': { if (PUB()){ const hs = h.set.house = Object.assign({adults: 1, kids: []}, h.set.house || {}); hs.adults = Math.max(1, Math.min(12, (+hs.adults || 1) + (+v || 0))); h.set.household = hs.adults + arr(hs.kids).length; PA = null; clearShop(); }
      else h.set.household = Math.max(1, Math.min(12, (+h.set.household || 1) + (+v || 0)));
      h.set.u = Date.now(); save(); rerender(true); return; }
    case 'setup-cancel': S.setup = false; S.set = null; rerender(false); return;
    case 'whoq': h.set.who = v; if (v === 'Kayti' && !h.set.track) h.set.track = 'practice'; h.set.u = Date.now(); save(); toast('Saved.'); rerender(false); return;
    case 'who': if (S.set){ S.set.who = v; if (v === 'Kayti' && !S.set.trackSet) S.set.track = 'practice'; } rerender(true); return;
    case 'track': if (S.set){ if (S.set.track === 'both' && v !== 'practice') S.set.flow = true; S.set.track = v; S.set.trackSet = true; } rerender(true); return;
    case 'cardiodays': if (S.set) S.set.cardioDays = +v === 2 ? 2 : 1; rerender(true); return;
    case 'flowon': if (S.set){ S.set.flow = v === '1'; if (S.set.track === 'both'){ S.set.track = 'strength'; } } rerender(true); return;
    case 'mvset': if (S.set){ const nx = moveToggle(movesOf(S.set), v); if (!nx.length){ toast('Choose at least one.'); return true; } S.set.moves = nx; S.set.track = nx.includes('strength') && nx.includes('cardio') ? 'mixed' : nx.includes('cardio') ? 'cardio' : nx.includes('strength') ? 'strength' : 'practice'; S.set.trackSet = true; } rerender(true); return;
    // BLD 894: My Path's six categories (public Tending) change right away; a new Strength or Cardio choice starts at Week 1.
    case 'pmove': { const nx = moveToggle(movesOf(h.set), v); if (!nx.length){ toast('Choose at least one.'); return true; } const t0 = progTrack(), w0 = workOn(); setMoves(h.set, nx); if (PROG() && workOn() && (progTrack() !== t0 || !w0)) h.set.progStart = ymd(monOf(new Date())); h.set.u = Date.now(); PA = null; save(); rerender(true); return; }
    case 'newok': markNew(); rerender(true); return;
    case 'progup': case 'progkeep': { const up = a === 'progup' && PUB() ? {root: 'rise', rise: 'thrive', thrive: 'thrive'}[h.set.level || 'root'] : null;
      if (up) h.set.level = up; h.set.progStart = ymd(monOf(new Date())); h.set.u = Date.now(); PA = null; save();
      toast(up ? 'Week 1 of 12 at ' + LVL_NAME[up] + '. Here we grow.' : 'Week 1 of 12. Here we grow.'); rerender(true); return; }
    case 'ptrack': { const t = ['strength', 'cardio', 'mixed'].includes(v) ? v : 'strength'; if (progTrack() !== t){ h.set.track = t; h.set.progStart = ymd(monOf(new Date())); h.set.u = Date.now(); PA = null; save(); toast('Your ' + {strength: 'Strength', cardio: 'Cardio', mixed: 'Mixed'}[t] + ' track starts at Week 1.'); } rerender(true); return; }
    case 'pcdays': h.set.cardioDays = +v === 2 ? 2 : 1; h.set.u = Date.now(); PA = null; save(); rerender(true); return;
    case 'goal': { const s = S.set; if (!s) return; s.goals = arr(s.goals); s.goals = s.goals.includes(v) ? s.goals.filter(x => x !== v) : s.goals.concat(v); rerender(true); return; }
    case 'setup-save': { const s = S.set || {}, hh = num(s.household);
      // BLD 892: the track (Strength, Cardio, Mixed, Flow only), Flow on the days, and the cardio days; a new track starts at Week 1.
      const sd = parseD(s.start), was = h.set.u, tr0 = progTrack(), track = s.track || 'strength', tr1 = track === 'cardio' || track === 'mixed' ? track : 'strength';
      h.set = Object.assign({}, h.set, {who: s.who || '', track, flow: track !== 'practice' && (Array.isArray(s.flowStyles) ? s.flowStyles.length > 0 : !!s.flow), flowStyles: Array.isArray(s.flowStyles) ? FLOW_IDS.filter(x => s.flowStyles.includes(x)) : h.set.flowStyles, cardioDays: +s.cardioDays === 2 ? 2 : 1, start: sd ? ymd(addD(sd, -((sd.getDay() + 6) % 7))) : ymd(nextMon()), household: hh && hh > 0 && hh < 30 ? Math.round(hh) : '', goals: arr(s.goals), goalLdl: num(s.goalLdl) || '', nextLabs: /^\d{4}-\d{2}-\d{2}$/.test(String(s.nextLabs || '')) ? s.nextLabs : '', u: Date.now()}); delete h.set.needSetup;
      if (Array.isArray(s.moves) && s.moves.length) setMoves(h.set, s.moves);
      if (was && tr1 !== tr0 && PROG()) h.set.progStart = ymd(monOf(new Date())); if (!was) markNew();
      save(); S.setup = false; S.set = null; if (S.sec !== 'numbers') S.sec = 'today'; S.ov = null; toast('Saved. Welcome to Tending.'); rerender(false); return; }
    case 'note': { const t = document.getElementById('hj-note'), text = String(t ? t.value : '').trim(); if (!text){ toast('Write a line first.'); return; }
      h.notes.push({id: uid(), date: today(), text: text.slice(0, 4000), u: Date.now()}); S.draft = ''; save(); toast('Saved to My Journey.'); rerender(true); return; }
    case 'note-del': { if (!confirm('Remove this entry?')) return; const d = D(); d.deleted = d.deleted || {clients: {}, sessions: {}}; d.deleted.health = d.deleted.health || {}; d.deleted.health[v] = Date.now();
      h.notes = h.notes.filter(n => n.id !== v); save(); rerender(true); return; }
  }
}

// =====================================================================
// BLD 866: PUBLIC TENDING. Everything below runs only when the library is GGTendPublic (PUB()).
// The food plan and the workouts are built by shared/gg-tend-plan.js (GGTendPlan) into the same shapes the Field Guide's views
// already play: dinners.weeks A to D, breakfasts, lunches, snacks, shop.weeks, and workouts.sessions A to D.
// =====================================================================
const TP = () => window.GGTendPlan || null;
const CHECKS_P = [
  {id: 'walk', label: 'Time outdoors', sub: 'A walk, fresh air, and daylight'},
  {id: 'fiber', label: 'Fiber at two meals', sub: 'Oats, beans, lentils, whole grains, fruit'},
  {id: 'plants', label: 'Five colors of plants', sub: 'Vegetables, fruit, nuts, seeds'},
  {id: 'water', label: 'Water through the day', sub: 'The family drink'},
  {id: 'rest', label: 'Seven hours of sleep', sub: 'Last night counts'}];
const LVL = [['root', 'Root'], ['rise', 'Rise'], ['thrive', 'Thrive'], ['gentle', 'Gentle']];
const PLACE = [['home', 'Home'], ['light', 'Light Weights'], ['gym', 'Full Gym']];
const DAYSETS = {2: [1, 4], 3: [1, 3, 5], 4: [1, 2, 4, 5], 5: [1, 2, 3, 4, 5], 6: [1, 2, 3, 4, 5, 6]};
const BAND_PORTION = {'1-3': 0.5, '4-8': 0.75, '9-13': 1, '14-18': 1};
const KIDS = () => arr(((H() || {}).set || {}).house && H().set.house.kids);
const srcOf = id => arr((PLIB() || {}).sources).find(x => x && x.id === id) || null;
const srcLinks = ids => arr(Array.isArray(ids) ? ids : [ids]).filter(Boolean).map(srcOf).filter(Boolean).map(x => x.url ? `<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.t)}</a>${x.who ? ', ' + esc(x.who) : ''}` : esc(x.t) + (x.who ? ', ' + esc(x.who) : '')).join('; ');
// BLD 880: every public recipe is written for six, and its ingredients scale to the household (shared/gg-scale.js, GGScale).
const pubHH = () => { const s = (H() || {}).set || {}, n = (+((s.house || {}).adults) || 0) + KIDS().length || num(s.household) || 0; return n > 0 && n < 30 ? Math.round(n) : 0; };
// A table of one cooks for two (one meal now, one for tomorrow): the smallest size on the Recipes page's Serves picker.
const tableOf = () => { const hh = pubHH(); return hh ? Math.max(2, hh) : 0; };
const sizeUp = r => { const hh = PUB() ? tableOf() : 0; return r && hh && window.GGScale && arr(r.ingredients).length ? GGScale.recipe(r, hh) : r; };
const hhNote = serves => { const hh = tableOf(); return hh && serves && hh !== +serves ? ` For your household of ${hh}, make about ${String(Math.round(hh / serves * 4) / 4).replace(/\.25$/, ' 1/4').replace(/\.5$/, ' 1/2').replace(/\.75$/, ' 3/4').replace(/^0 /, '')} times the recipe.` : ''; };
function planSet(){ const s = H().set; return {needs: arr(s.needs), allergies: s.allergies || '', goals: arr(s.goals).length ? s.goals : ['well'], kids: KIDS().length > 0, leftovers: s.leftovers !== false}; }
// The saved plan: ids only, so a library update keeps working; a change of needs, allergies, goals, or household builds it again.
function ensurePlan(force){
  const h = H(), L = PLIB(), P = TP(); if (!h || !L || !P) return null;
  const set = planSet(), sig = JSON.stringify(set), cur = h.plan && typeof h.plan === 'object' ? h.plan : null;
  const known = new Set(arr(L.recipes).map(r => r.id).concat('leftovers'));
  const intact = cur && cur.ids && 'ABCD'.split('').every(w => arr(cur.ids[w]).length === 7 && cur.ids[w].every(id => !id || known.has(id))) && cur.meals && Object.values(cur.meals).every(l => arr(l).every(id => known.has(id)));
  if (cur && cur.sig === sig && intact && !force) return cur;
  const seed = force || !cur ? (Date.now() % 100000) + 1 : cur.seed || 1;
  const pw = P.planWeeks(L.recipes, Object.assign({seed}, set)), meals = P.planMeals(L.recipes, Object.assign({seed}, set));
  h.plan = {seed, ids: pw.ids, meals, sig, n: 0, u: Date.now()}; PA = null; save(); return h.plan;
}
const recOf = id => arr((PLIB() || {}).recipes).find(r => r.id === id) || (PUB() ? null : partyRecs().find(r => r.id === id)) || null;
function ideaOf(r){ if (!r) return null; const P = TP(); r = sizeUp(r);
  return {id: r.id, name: r.name, mins: r.mins, how: r.serve || '', nut: r.nut ? Object.assign({per: '1 serving'}, r.nut) : null, steps: arr(r.steps), ingredients: arr(r.ingredients),
    serve: r.serve || '', tip: r.tip || '', keeps: r.keeps || '', kid: r.kid || '', serves: r.serves, swaps: r.swaps || null, ...(PARTY_MEALS.includes(r.meal) ? {meal: r.meal} : {}),
    shop: P ? P.shopList({dinners: [Object.assign({}, r, {leftover: false})]}).map(x => ({name: x.name, amt: x.amt, sec: x.sec})) : []}; }
// Workouts on the chosen days: the sessions rotate A, B, C, D across the weeks.
const pubDays = () => DAYSETS[+H().set.days] || DAYSETS[3];
function pubSesKey(d){ const dd = pubDays(), k = dd.indexOf(d.getDay()); if (k < 0) return null; if (progOn()) return progKey(Math.max(1, progWeek(d)), k, dd.length); const keys = Object.keys(WK().sessions || {}).slice(0, 4); if (!keys.length) return null;
  const n = Math.max(1, weekNo(d)); return keys[((n - 1) * dd.length + k) % keys.length]; }
let PA = null;
// BLD 892: one phase's workouts for a level (Strength A to D, E to H, or I to L; Cardio R1 to R12), built from the checked gear
// (or the old saved place) for the person's minutes, cached until anything they rest on changes.
let PPS = null;
const gearOf = s => Array.isArray(s.gear) ? s.gear : undefined;
const PLACE_GEAR = {home: [], light: ['dumbbells', 'bands'], gym: ['dumbbells', 'bands', 'bar', 'dip', 'step', 'bench', 'machines', 'cardio']};
const gearNow = () => { const s = H().set; return Array.isArray(s.gear) ? s.gear : PLACE_GEAR[s.place] || []; };
function pubPhaseSes(ph, lvl){
  const L = PLIB(), P = TP(), s = H().set; if (!L || !P || !L.program) return {}; lvl = lvl || s.level || 'root'; if (lvl === 'gentle') return {};
  const tr = progTrack(), sig = JSON.stringify([lvl, s.place, s.gear, s.mins, tr, ph]);
  if (!PPS || PPS.L !== L) PPS = {L, c: {}}; if (PPS.c[sig]) return PPS.c[sig];
  const out = {};
  (tr === 'cardio' ? ['cardio', 'strength'] : ['strength', 'cardio']).forEach(t => { if (!trackIds(t, ph).length) return;
    const b = P.buildSessions(L.moves, L.templates, {level: lvl, place: s.place || 'home', gear: gearOf(s), mins: +s.mins || 20, warmup: L.warmup, cooldown: L.cooldown, track: t, phase: ph, program: L.program});
    'ABCD'.split('').forEach((d, i) => { const x = b.sessions[d]; if (x) out[(t === 'cardio' ? CAR_IDS : STR_IDS)[ph][i]] = x; }); });
  return PPS.c[sig] = out;
}
// Gentle: its own sessions, with the walk growing week by week (shared with BLD 881's every-level Workouts shelf).
function gentleWo(L, wk){
  const G = L.gentle || {}, walk = arr(G.walkWeeks), wm = (walk.find(x => +x.week === Math.min(wk, walk.length)) || walk[walk.length - 1] || {}).mins;
  const ses = {}; arr(G.sessions).forEach((x, i) => { const c = JSON.parse(JSON.stringify(x));
    if (wm) arr(c.blocks).forEach(b => arr(b.items).forEach(it => { if (/steady walk/i.test(it.name || '')) it.reps = {'1': String(wm * 60), '2': String(wm * 60), '3': String(wm * 60)}; }));
    c.mins = (c.minsByPhase || {})[String(phaseOf(wk))] || c.mins; ses[i < 4 ? 'ABCD'[i] : (x.id || 'G' + i)] = c; });
  return {sessions: ses, warmup: arr(G.warmup), cooldown: arr(G.cooldown)};
}
function pubApp(){
  const L = PLIB(), h = H(), P = TP(); if (!L || !h) return null;
  const s = h.set, wk = Math.max(1, weekNo(new Date())), plan = P ? ensurePlan() : null;
  const sig = JSON.stringify([s.level, s.place, s.mins, s.days, s.goals, s.weightLb, s.teen, TEEN(), plan && plan.u, plan && plan.n, wk, s.house, s.gear, s.track, s.cardioDays, s.progStart, progOn() ? phaseId(Math.max(1, progWeek(new Date()))) : '']);
  if (PA && PA.L === L && PA.sig === sig) return PA.app;
  const app = Object.assign({}, L.app || {}), lvl = s.level || 'root';
  // Targets: the strictest of each across the chosen goals; protein by body weight when it is known (never for anyone under 18).
  const tg = P ? P.targets(arr(s.goals).length ? s.goals : ['well'], L.goals, {weightKg: TEEN() ? 0 : (+s.weightLb || 0) / 2.2046, teen: TEEN()}) : null;
  if (tg) app.targets = {sf: tg.sf, pro: tg.pro, fib: tg.fib, sol: tg.sol, sug: tg.sug, cal: null, na: tg.na, est: tg.est};
  // Workouts.
  const wo = {meditation: Object.assign({start: 5, end: 12}, (L.app && L.app.workouts && L.app.workouts.meditation) || {}), motivation: arr(L.motivation)};
  if (lvl === 'gentle') Object.assign(wo, gentleWo(L, wk));
  else if (P && L.program && L.program.tracks){
    // BLD 892: this phase's workouts for the person's track (both tracks, their own first, so Play Any holds them all).
    const ph = phaseId(Math.max(1, progWeek(new Date()))), b0 = P.buildSessions([], L.templates, {level: lvl, mins: +s.mins || 20, warmup: L.warmup, cooldown: L.cooldown});
    Object.assign(wo, {sessions: pubPhaseSes(ph, lvl), warmup: b0.warmup, cooldown: b0.cooldown, program: L.program});
  }
  else if (P){
    const b = P.buildSessions(L.moves, L.templates, {level: lvl, place: s.place || 'home', gear: gearOf(s), mins: +s.mins || 20, warmup: L.warmup, cooldown: L.cooldown});
    Object.assign(wo, {sessions: b.sessions, warmup: b.warmup, cooldown: b.cooldown});
  }
  app.workouts = wo;
  // Food: the plan's four weeks, breakfasts, lunches, snacks, and a shopping list for each week.
  if (P && plan){
    const weeks = P.weeksFromIds(L.recipes, plan.ids), m = plan.meals || {}, ideas = k => arr(m[k]).map(recOf).map(ideaOf).filter(Boolean);
    app.dinners = {weeks, breakfasts: ideas('breakfasts'), lunches: ideas('lunches'), snacks: ideas('snacks')};
    // BLD 880: the dinners and the shopping list follow the household's size (each recipe is written for six).
    Object.keys(weeks || {}).forEach(w => { if (weeks[w] && Array.isArray(weeks[w].dinners)) weeks[w] = Object.assign({}, weeks[w], {dinners: weeks[w].dinners.map(d => d && !d.leftover ? sizeUp(d) : d)}); });
    const extras = ['breakfasts', 'lunches', 'snacks'].flatMap(k => arr(m[k]).map(recOf)).filter(Boolean).map(r => Object.assign({}, sizeUp(r), {leftover: false}));
    app.shop = {weeks: {}}; 'ABCD'.split('').forEach(w => { app.shop.weeks[w] = {shop: P.shopList(weeks, w, extras).map(x => ({name: x.name, amt: x.amt, sec: x.sec, store: 'grocer', for: x.for}))}; });
  }
  PA = {L, sig, app}; return app;
}
// The Daily Aims in public: the person's own targets, from their goals, with the Standards.
function pubAims(){ const T = targets(), L = PLIB() || {}, gs = arr(L.goals).filter(g => arr(H().set.goals).includes(g.id)), f = v => Array.isArray(v) ? fmt(v[0]) + ' to ' + fmt(v[v.length - 1]) : fmt(v);
  return `<details class="hj-doc"${S.open['aims'] ? ' open' : ''} data-hjd="aims"><summary><span>My Daily Aims</span></summary><div class="hj-body"><ul class="hj-ing">
    <li><b>Saturated fat:</b> ${f(T.sf)} g a day or less.</li><li><b>Added sugar:</b> ${f(T.sug)} g a day or less.</li><li><b>Sodium:</b> ${Array.isArray(T.na) ? 'aim for ' + fmt(T.na[0]) + ' mg, up to ' + fmt(T.na[1]) + ' mg' : fmt(T.na) + ' mg or less'} a day.</li>
    <li><b>Fiber:</b> ${f(T.fib)} g a day or more${T.sol ? `, with about ${fmt(T.sol)} g soluble` : ''}.</li><li><b>Protein:</b> about ${f(T.pro)} g a day${TEEN() ? '' : T.est ? ' (add your weight in the start-up check for your own aim)' : ', from your weight and goals'}.</li></ul>
    <p class="hj-sub">${gs.length ? 'Set by ' + esc(gs.map(g => g.name).join(', ')) + '. ' : ''}When goals differ, Tending keeps the strictest of each.</p>
    ${L.standards && L.standards.html ? `<details class="hj-doc"><summary><span>The Grounded Nutritional Standards</span></summary><div class="hj-body">${L.standards.html}</div></details>` : ''}</div></details>`; }

// ---------- the start-up check ----------
function ckDraft(){
  if (S.ck) return S.ck; const s = H().set;
  const d = {who: s.who === 'family' ? 'family' : 'me', teen: !!s.teen, use: Array.isArray(s.use) ? s.use.slice() : ['food', 'move', 'mind', 'people', 'labs'], goals: arr(s.goals).slice(), needs: arr(s.needs).slice(),
    allergies: s.allergies || '', house: JSON.parse(JSON.stringify(s.house || {adults: 1, kids: []})), check: Object.assign({}, s.check || {}), cleared: !!s.cleared,
    level: s.level || '', place: s.place || 'home', mins: +s.mins || 20, gear: (Array.isArray(s.gear) ? s.gear : PLACE_GEAR[s.place] || []).slice(), gearSet: Array.isArray(s.gear),
    track: s.track === 'cardio' || s.track === 'mixed' ? s.track : 'strength', moves: movesOf(s), cardioDays: +s.cardioDays === 2 ? 2 : 1, days: +s.days || 3, weightLb: s.weightLb || '', sex: s.sex || '', goalLdl: s.goalLdl || '',
    lab: {date: today()}};
  return S.ck = {i: 0, d};
}
function ckSteps(d){
  const u = id => arr(d.use).includes(id), out = ['who', 'use', 'goals'];
  if (u('food')) out.push('food'); if (d.who === 'family') out.push('house');
  if (u('move')) out.push('check', 'level'); if (!TEEN() && !d.teen) out.push('body'); if (u('labs')) out.push('labs');
  return out.concat('done');
}
function vCheck(){
  const L = PLIB() || {}, K = L.check || {}, ck = ckDraft(), d = ck.d, steps = ckSteps(d), i = Math.min(ck.i, steps.length - 1), step = steps[i], t = TD();
  const chips = (field, list, multi) => `<div class="hj-chips" role="group">${list.map(([v, l, sub]) => { const on = multi ? arr(d[field]).includes(v) : String(d[field]) === String(v);
    return `<button type="button" class="chip tn-ckc${on ? ' on' : ''}" aria-pressed="${on}" data-hja="ckset" data-hjv="${esc(field + '|' + v + '|' + (multi ? 1 : 0))}">${esc(l)}${sub ? `<small>${esc(sub)}</small>` : ''}</button>`; }).join('')}</div>`;
  const inp = (k, label, type, extra) => `<label class="hj-fld"><span>${esc(label)}</span><input type="${type || 'number'}"${type === 'text' || type === 'date' ? '' : ' inputmode="decimal"'} data-hjck="${esc(k)}" value="${esc(k.split('.').reduce((o, x) => o == null ? '' : o[x], d) || '')}"${extra || ''}></label>`;
  const anyYes = arr(K.questions).some(q => d.check[q.id] === true);
  let body = '';
  if (step === 'who') body = `<h3>Who is Tending for?</h3><p class="hj-sub">${esc(L.lead || t.intro.line)}</p>${chips('who', [['me', 'Me'], ['family', 'Me and My Family']])}
    ${C.age ? '' : `<p class="hj-sub" style="margin-top:14px">Tending keeps the focus on food and energy for anyone under 18, with no weight and no calories.</p>${chips('teen', [['false', '18 or Older'], ['true', 'Under 18']])}`}`;
  else if (step === 'use') body = `<h3>${esc(t.intro.chooseH)}</h3><p class="hj-sub">${esc(t.intro.choose)}</p>${chips('use', t.choose.map(c => [c.id, c.name]), true)}`;
  else if (step === 'goals') body = `<h3>What are you growing toward?</h3><p class="hj-sub">Choose one or more. When goals differ, Tending keeps the strictest aim of each.</p>
    <div class="tn-ckg">${arr(L.goals).map(g => { const on = arr(d.goals).includes(g.id); return `<button type="button" class="tn-ckcard${on ? ' on' : ''}" aria-pressed="${on}" data-hja="ckset" data-hjv="goals|${esc(g.id)}|1"><b>${esc(g.name)}</b><small>${esc(g.line || '')}</small></button>`; }).join('')}</div>`;
  else if (step === 'food') body = `<h3>Food needs</h3><p class="hj-sub">Every recipe in your plan fits each need you choose.</p>${chips('needs', arr(L.needs).map(n => [n.id, n.name]), true)}
    ${arr(L.needs).filter(n => arr(d.needs).includes(n.id) && n.line).map(n => `<p class="hj-sub"><b>${esc(n.name)}:</b> ${esc(n.line)}</p>`).join('')}
    <label class="hj-fld" style="margin-top:12px"><span>Allergies (optional)</span><input type="text" data-hjck="allergies" value="${esc(d.allergies)}" placeholder="sesame, shellfish" autocomplete="off"></label><p class="hj-sub">${esc(L.allergyLine || '')}</p>${holPick()}`;
  else if (step === 'house') body = `<h3>Your household</h3><p class="hj-sub">${esc((L.kids || {}).lead || 'Track the food, never the body.')}</p>${inp('house.adults', 'Grown-ups who eat at home')}
    ${arr(d.house.kids).map((k, j) => `<div class="tn-kidrow"><label class="hj-fld"><span>Child's first name or nickname (optional)</span><input type="text" data-hjck="house.kids.${j}.name" value="${esc(k.name || '')}" autocomplete="off"></label>
      <div class="hj-chips">${arr((L.kids || {}).ages).map(a => `<button type="button" class="chip${k.band === a.id ? ' on' : ''}" aria-pressed="${k.band === a.id}" data-hja="ckkid" data-hjv="${j}|band|${esc(a.id)}">${esc(a.name)}</button>`).join('')}</div>
      <div class="hj-chips">${[['f', 'Girl'], ['m', 'Boy'], ['', 'Skip']].map(([v, l]) => `<button type="button" class="chip${(k.sex || '') === v ? ' on' : ''}" aria-pressed="${(k.sex || '') === v}" data-hja="ckkid" data-hjv="${j}|sex|${v}">${l}</button>`).join('')}<button type="button" class="linkbtn" data-hja="ckkid" data-hjv="${j}|remove|">Remove</button></div></div>`).join('')}
    <button type="button" class="btn btn-line btn-sm" data-hja="ckkid" data-hjv="-1|add|">Add a Child</button><p class="hj-sub">Girl or Boy only sets the daily amounts for iron and fiber by age.</p>`;
  else if (step === 'check') body = `<h3>A quick health check</h3><p class="hj-sub">${esc(K.lead || '')}</p>
    ${arr(K.questions).map(q => `<div class="tn-ckq"><p><b>${esc(q.q)}</b></p><div class="hj-chips">${[['true', 'Yes'], ['false', 'No']].map(([v, l]) => { const on = String(d.check[q.id]) === v; return `<button type="button" class="chip${on ? ' on' : ''}" aria-pressed="${on}" data-hja="ckq" data-hjv="${esc(q.id)}|${v}">${l}</button>`; }).join('')}</div>${q.why && d.check[q.id] === true ? `<p class="hj-sub">${esc(q.why)}</p>` : ''}</div>`).join('')}
    ${anyYes ? `<div class="hj-note tn-yes"><p><b>${esc(K.yes || '')}</b></p><p>${esc(K.yesMore || '')}</p>${chips('cleared', [['true', (arr(K.continue).find(x => x.id === 'cleared') || {}).label || 'My doctor or therapist says I can begin']])}</div>`
      : arr(K.questions).every(q => d.check[q.id] === false) ? `<p class="hj-note">${esc(K.allClear || '')}</p>` : ''}
    ${K.fullScreen ? `<p class="hj-sub">${esc(K.fullScreen.t)} <a href="${esc(K.fullScreen.url)}" target="_blank" rel="noopener">Open the PAR-Q+</a></p>` : ''}`;
  else if (step === 'level'){ const T = L.templates || {}, yesHold = anyYes && !d.cleared;
    body = `<h3>Your movement path</h3>${yesHold ? `<p class="hj-note">${esc(K.yes || '')} ${esc(K.yesMore || '')}</p>` : ''}
    <p class="hj-sub" style="margin:6px 0"><b>Level</b></p>${chips('level', LVL.filter(([v]) => !yesHold || v === 'gentle').map(([v, l]) => [v, l]))}
    ${d.level ? `<p class="hj-sub">${esc(d.level === 'gentle' ? (L.gentle || {}).lead || '' : (T.levelLines || {})[d.level] || '')}</p>` : ''}
    ${d.level && d.level !== 'gentle' ? `${L.program && L.program.gear ? `<p class="hj-sub" style="margin:10px 0 6px"><b>My equipment</b></p><p class="hj-sub">Check what you have. Every workout uses just that.</p>
      <div class="hj-chips tn-gear" role="group" aria-label="My equipment">${arr(L.program.gear).map(g => { const on = arr(d.gear).includes(g.id); return `<button type="button" class="chip tn-ckc${on ? ' on' : ''}" aria-pressed="${on}" data-hja="ckgear" data-hjv="${esc(g.id)}">${esc(g.name)}<small>${esc(g.line || '')}</small></button>`; }).join('')}</div>
      ${arr(d.gear).length ? '' : `<p class="hj-sub">${esc(L.program.gearNone || 'Nothing checked? Every workout uses your body weight, a sturdy chair, a wall, and a mat.')}</p>`}
`
      : `<p class="hj-sub" style="margin:10px 0 6px"><b>Where you move</b></p>${chips('place', PLACE)}${(T.placeLines || {})[d.place] ? `<p class="hj-sub">${esc(T.placeLines[d.place])}</p>` : ''}`}
      <p class="hj-sub" style="margin:10px 0 6px"><b>Minutes</b></p>${chips('mins', [[20, '20 Minutes'], [40, '40 Minutes'], [60, '60 Minutes']])}` : ''}
    <p class="hj-sub" style="margin:10px 0 6px"><b>My movement</b> (choose any, or all)</p><div class="hj-chips" role="group" aria-label="My movement">${moveChips(arr(d.moves), 'ckmove')}</div>
    ${arr(d.moves).includes('strength') && arr(d.moves).includes('cardio') ? chips('cardioDays', [[1, '1 Cardio Day'], [2, '2 Cardio Days']]) : ''}<p class="hj-sub">${esc(movesLine(arr(d.moves)))} Switch anytime.</p>
    <p class="hj-sub" style="margin:10px 0 6px"><b>Days a week</b></p>${chips('days', [2, 3, 4, 5, 6].map(n => [n, n + ' Days']))}
    ${yesHold ? `<button type="button" class="btn btn-line btn-sm" data-hja="ckteam">Add My Plan from My Team</button>` : ''}`; }
  else if (step === 'body') body = `<h3>Your protein aim (optional)</h3><p class="hj-sub">Your weight sets your daily protein aim. It stays on this device, and you can skip it.</p>${inp('weightLb', 'Weight (lb)')}`;
  else if (step === 'labs'){ const lg = arr((L.ldl || {}).goals);
    body = `<h3>Your labs (optional)</h3><p class="hj-sub">${esc((L.labs || {}).lead || '')} Skip this anytime, and add numbers later in Numbers.</p>
    <div class="hj-g3">${inp('lab.date', 'Lab date', 'date')}${inp('lab.ldl', 'LDL')}${inp('lab.hdl', 'HDL')}${inp('lab.total', 'Total cholesterol')}${inp('lab.trig', 'Triglycerides')}</div>
    <p class="hj-sub" style="margin:10px 0 6px"><b>Your LDL goal, set with your doctor</b></p>${chips('goalLdl', lg.map(g => [g.v, 'Under ' + g.v]))}${inp('goalLdl', 'Or your own goal')}`; }
  else body = `<h3>Ready to tend</h3><p class="hj-sub">${esc(t.intro.private)} ${esc(t.intro.quiet)}</p>${L.disclaimers && L.disclaimers.welcome ? `<p class="hj-note">${esc(L.disclaimers.welcome)}</p>` : ''}`;
  const last = i === steps.length - 1, canCancel = !!H().set.pubDone;
  return `<section class="tn-sec a-numbers tn-check" id="hj-form" data-tn="check">${secHead('sprout', 'a-numbers', H().set.pubDone ? 'My Start-Up Check' : 'Welcome to Tending', esc(L.tagline || ''))}
    <div class="tn-ckbar" aria-hidden="true"><span style="width:${Math.round(100 * (i + 1) / steps.length)}%"></span></div><p class="hj-sub tn-ckn">Step ${i + 1} of ${steps.length}</p>
    <div class="hj-blk tn-card">${body}</div>
    <div class="row tn-cknav">${i ? `<button type="button" class="btn btn-line" data-hja="ckback">Back</button>` : ''}<button type="button" class="btn btn-gold" data-hja="${last ? 'cksave' : 'cknext'}">${last ? (canCancel ? 'Save My Changes' : 'Start Tending') : 'Next'}</button>${canCancel ? `<button type="button" class="linkbtn" data-hja="ckcancel">Cancel</button>` : ''}</div>
    ${L.disclaimers && L.disclaimers.check && step === 'check' ? `<p class="hj-sub">${esc(L.disclaimers.check)}</p>` : ''}</section>`;
}
function ckSave(){
  const h = H(), d = S.ck.d, L = PLIB() || {}, anyYes = arr((L.check || {}).questions).some(q => d.check[q.id] === true);
  const kids = arr(d.house.kids).filter(k => k && k.band).map(k => ({id: k.id || uid(), name: String(k.name || '').trim().slice(0, 40), band: k.band, sex: k.sex || ''}));
  const was = h.set.pubDone, tr0 = progTrack(), w0 = workOn();
  h.set = Object.assign({}, h.set, {who: d.who, teen: !C.age && d.teen === true, use: PART_IDS.filter(x => arr(d.use).includes(x)), goals: arr(d.goals).length ? d.goals : ['well'], needs: arr(d.needs),
    allergies: String(d.allergies || '').slice(0, 200), house: {adults: Math.max(1, Math.min(12, Math.round(+((d.house || {}).adults) || 1))), kids: d.who === 'family' ? kids : []},
    check: d.check, checkYes: anyYes, cleared: !!d.cleared, level: d.level || (anyYes && !d.cleared ? 'gentle' : 'root'), place: d.place || 'home', mins: +d.mins || 20, days: +d.days || 3,
    gear: L.program && (d.gearSet || !was) ? arr(d.gear).slice() : h.set.gear, track: d.track || 'strength', cardioDays: +d.cardioDays === 2 ? 2 : 1,
    weightLb: TEEN() || d.teen ? '' : (num(d.weightLb) || ''), goalLdl: num(d.goalLdl) || '', pubDone: 1, u: Date.now()});
  if (anyYes && !d.cleared) h.set.level = 'gentle';
  h.set.household = h.set.house.adults + h.set.house.kids.length;
  // BLD 894: the start-up check's six categories set set.moves, set.track, and set.flowStyles together.
  if (arr(d.moves).length) setMoves(h.set, d.moves);
  if (!h.set.start) h.set.start = ymd(monOf(new Date()));
  if (!was) h.set.remOff = true;
  // BLD 892: a new track starts the program at Week 1; a new plan starts with What's New already seen.
  if (was && L.program && workOn() && (progTrack() !== tr0 || !w0)) h.set.progStart = ymd(monOf(new Date()));
  if (h.set.gear === undefined) delete h.set.gear; if (!was) markNew();
  const lab = d.lab || {}, rec = {id: uid(), date: /^\d{4}-\d{2}-\d{2}$/.test(String(lab.date || '')) ? lab.date : today(), u: Date.now()};
  ['ldl', 'hdl', 'total', 'trig'].forEach(k => { const n = num(lab[k]); if (n != null) rec[k] = n; });
  if (Object.keys(rec).length > 3) h.labs.push(rec);
  PA = null; ensurePlan(); save(); S.ck = null; S.setup = false; S.sec = 'today'; S.anim = true;
  toast(was ? 'Saved. Your plan follows your answers.' : 'Welcome to Tending.'); rerender(false); if (!bareOn()) window.scrollTo(0, 0);
}

// ---------- Today: My Plan from My Team, the start-up check note, the family's food ----------
function teamList(){ const t = H().team; return t && Array.isArray(t.list) ? t.list : []; }
function pubTodayCards(body, people, c, tally){
  const L = PLIB() || {}, K = L.check || {}, s = H().set, tm = teamList();
  if (tm.length){ tm.forEach(x => tally('move', c['team:' + x.id]));
    body.push(`<article class="tn-card tn-edge a-move" id="tn-team"><div class="tn-hd">${badge('compass')}<div style="min-width:0;flex:1"><div class="tn-k">${esc(((K.team || {}).remind) || 'Your team\'s plan for today')}</div><div class="tn-sub">${esc(((K.team || {}).keep) || '')}</div></div></div>
      <div class="tn-list">${tm.map(x => tck('check', 'team:' + x.id, c['team:' + x.id], x.name || 'My team\'s exercise', [x.amount || x.dose, x.often || x.when].filter(Boolean).join(' · '))).join('')}</div>
      <button type="button" class="tn-btn sm line" data-hja="sec" data-hjv="team">${ic('book')}Open My Plan from My Team</button></article>`); }
  if (U('move') && s.checkYes && !s.cleared && !tm.length) body.push(`<div class="tn-card a-move"><div class="tn-hd">${badge('shield')}<div><div class="tn-k">Before You Move More</div><div class="tn-sub">${esc(K.yes || '')}</div></div></div>
    <div class="tn-acts"><button type="button" class="tn-btn sm" data-hja="sec" data-hjv="team">${ic('plus')}Add My Plan from My Team</button><button type="button" class="tn-btn sm line" data-hja="pcleared">${esc((arr(K.continue).find(x => x.id === 'cleared') || {}).label || 'My doctor or therapist says I can begin')}</button></div></div>`);
  const kids = KIDS(); if (kids.length){ const k0 = today();
    const card = `<article class="tn-card tn-edge p-branches" id="tn-kids"><div class="tn-hd">${badge('people')}<div style="min-width:0;flex:1"><div class="tn-k">Family Food</div><div class="tn-sub">${esc(((L.kids || {}).lead || '').split('.')[0] + '.')}</div></div></div>
      <div class="tn-kidl">${kids.map((k, j) => { const day = kidDay(k.id, k0), n = Object.keys(day.rainbow || {}).length + Object.values(day.g || {}).filter(v => +v > 0).length; tally('people', n > 0);
        return `<div class="tn-kidc"><b>${esc(kidName(k, j))}</b><small>${esc(bandName(k.band))}</small><div class="tn-acts"><button type="button" class="tn-btn sm" data-hja="kidopen" data-hjv="${esc(k.id)}">${ic('plate')}Log Food</button><button type="button" class="tn-btn sm line" data-hja="kidview" data-hjv="${esc(k.id)}">${ic('star')}Kid View</button></div></div>`; }).join('')}</div></article>`;
    (U('people') ? people : body).push(card); }
}
const kidName = (k, j) => k.name || 'Child ' + (j + 1);
const bandName = id => (arr(((PLIB() || {}).kids || {}).ages).find(a => a.id === id) || {}).name || '';

// ---------- the Move section head: the path, the Gentle lead, and My Plan from My Team ----------
function pubMoveHead(){
  const L = PLIB() || {}, s = H().set, T = L.templates || {}, G = L.gentle || {}, lvl = s.level || 'root', K = L.check || {};
  const work = workOn(), prog = progOn() && work, tr = progTrack(), TN = {strength: 'Strength', cardio: 'Cardio', mixed: 'Mixed'};
  // BLD 894: with no Strength or Cardio chosen, the path names the chosen categories.
  const path = !work ? movesOf(s).map(x => MOVE_NAME[x]).join(' · ') : lvl === 'gentle' ? 'Gentle' : prog ? [(LVL.find(x => x[0] === lvl) || [, 'Root'])[1], TN[tr], (+s.mins || 20) + ' Minutes'].join(' · ') : [(LVL.find(x => x[0] === lvl) || [, 'Root'])[1], (PLACE.find(x => x[0] === s.place) || [, 'Home'])[1], (+s.mins || 20) + ' Minutes'].join(' · ');
  const w = Math.max(1, progWeek(new Date())), ph = arr((L.program || {}).phases).find(x => x.id === phaseId(w)) || {};
  const g = gearNow(), gl = g.length ? 'Equipment: ' + g.map(id => (arr((L.program || {}).gear).find(x => x.id === id) || {name: id}).name).join(', ') + '.' : 'Equipment: your body weight, a sturdy chair, a wall, and a mat.';
  const tchip = (v, l, on, act) => `<button type="button" class="chip${on ? ' on' : ''}" aria-pressed="${on}" data-hja="${act || 'ptrack'}" data-hjv="${v}">${esc(l)}</button>`;
  return `${prog ? newCard() + againCard() : ''}<div class="tn-card a-move tn-path"><div class="tn-k">My Path</div><h3>${esc(path)}</h3>${prog ? `<p class="hj-prog">${esc(progLabel(new Date()) || 'Week 1 of 12 · Foundation')}</p>` : ''}<p class="tn-sub">${esc((+s.days || 3) + ' days a week. ')}${esc(!work ? movesLine(movesOf(s)) : lvl === 'gentle' ? G.lead || '' : (T.levelLines || {})[lvl] || '')}${prog && ph.note ? ' ' + esc(ph.note) : ''}</p>
    ${prog ? `<p class="tn-sub">${esc(gl)}</p>` : ''}<p class="tn-sub" style="margin-top:8px"><b>My movement:</b> choose any, or all.</p><div class="hj-chips" role="group" aria-label="My movement">${moveChips(movesOf(s), 'pmove')}</div>${movesOf(s).includes('strength') && movesOf(s).includes('cardio') ? `<div class="hj-chips" role="group" aria-label="Cardio days">${[1, 2].map(n => tchip(n, n + (n === 1 ? ' Cardio Day' : ' Cardio Days'), (+s.cardioDays || 1) === n, 'pcdays')).join('')}</div>` : ''}
    ${lvl === 'gentle' && G.safety ? `<p class="hj-note">${esc(G.safety)}</p>` : ''}${s.checkYes && !s.cleared ? `<p class="hj-note">${esc(K.yes || '')}</p>` : ''}
    <div class="tn-acts"><button type="button" class="tn-btn sm line" data-hja="setup" data-hjv="level">${ic('gear')}Change My Path</button><button type="button" class="tn-btn sm line" data-hja="sec" data-hjv="team">${ic('compass')}My Plan from My Team</button></div>
    ${L.disclaimers && L.disclaimers.workouts ? `<p class="tn-sub" style="margin-top:10px">${esc(L.disclaimers.workouts)}</p>` : ''}</div>`;
}

// ---------- the Kitchen: swap a meal, build a new plan ----------
function pubPlanEdit(wk){
  const h = H(), plan = h.plan || {}, ids = arr((plan.ids || {})[wk]), m = plan.meals || {}, P = TP(); if (!P) return '';
  const st = P.weekStats(P.weeksFromIds(PLIB().recipes, plan.ids)[wk].dinners);
  const row = (key, label, r, sub) => `<div class="tn-pe"><span class="d">${esc(label)}</span><span class="n"><b>${esc(r ? r.name : 'Leftovers Night')}</b><small>${esc(sub)}</small></span><button type="button" class="tn-btn sm line" data-hja="pswap" data-hjv="${esc(key)}">Swap</button></div>`;
  const PROT = {fish: 'Fish', poultry: 'Poultry', beans: 'Beans', lentils: 'Lentils', tofu: 'Tofu', eggs: 'Eggs', yogurt: 'Yogurt', redmeat: 'Lean red meat', mixed: 'Mixed'};
  return `<details class="hj-doc tn-planed"${S.open['planed'] ? ' open' : ''} data-hjd="planed"><summary><span>My Plan for Food Week ${esc(wk)}</span></summary><div class="hj-body">
    <p class="hj-sub">${st.fish} fish dinners and ${st.red ? st.red + ' lean red meat dinner' : 'no red meat'} this week, about ${st.mins} minutes of cooking in all${st.cost != null ? ', about $' + st.cost : ''}. Swap any meal and the shopping list follows.</p>
    ${ids.map((id, i) => { const r = id === 'leftovers' ? null : recOf(id); return row('d|' + wk + '|' + DOW[(i + 1) % 7], DOWL[(i + 1) % 7], r, r ? [PROT[r.protein] || '', r.mins ? r.mins + ' min' : ''].filter(Boolean).join(' · ') : 'This week\'s leftovers, warmed through'); }).join('')}
    ${['breakfasts', 'lunches', 'snacks'].map(k => arr(m[k]).length ? `<h4 class="hj-sec">${k === 'breakfasts' ? 'Breakfasts' : k === 'lunches' ? 'Lunches' : 'Snacks'}</h4>` + arr(m[k]).map((id, i) => { const r = recOf(id); return r ? row('m|' + k + '|' + i, '', r, r.mins ? r.mins + ' min' : '') : ''; }).join('') : '').join('')}
    <div class="tn-acts" style="margin-top:12px"><button type="button" class="tn-btn sm line" data-hja="pleft">${h.set.leftovers === false ? 'Make Saturday a Leftovers Night' : 'Cook Saturday Too'}</button><button type="button" class="tn-btn sm line" data-hja="pnew">${S.sureNew ? 'Tap Again for a New Plan' : 'Build a New Plan'}</button></div></div></details>`;
}

// ---------- My Plan from My Team ----------
function vTeam(){
  const L = PLIB() || {}, T = (L.check || {}).team || {}, F = arr(T.fields).length ? T.fields : [{id: 'name', label: 'Exercise or instruction'}, {id: 'how', label: 'How to do it'}, {id: 'amount', label: 'Sets, reps, or time'}, {id: 'often', label: 'How often'}, {id: 'who', label: 'Who gave you this plan'}];
  const list = teamList(), ed = S.teamEd, cur = ed && ed !== 'new' ? list.find(x => x.id === ed) || {} : {};
  const form = ed ? `<div class="hj-blk" id="hj-form">${kick(ed === 'new' ? 'Add to My Plan' : 'Edit')}${F.map(f => `<label class="hj-fld"><span>${esc(f.label)}</span>${/how|notes/.test(f.id) ? `<textarea rows="3" data-hjtm="${esc(f.id)}">${esc(cur[f.id] || '')}</textarea>` : `<input type="text" data-hjtm="${esc(f.id)}" value="${esc(cur[f.id] || '')}" autocomplete="off">`}</label>`).join('')}
    <div class="row"><button type="button" class="btn btn-gold btn-sm" data-hja="tmsave">Save</button><button type="button" class="btn btn-line btn-sm" data-hja="tmcancel">Cancel</button></div></div>` : '';
  return `<div class="tn-sec a-move">${secHead('compass', 'a-move', T.h || 'My Plan from My Team', esc(T.lead || ''))}
    ${form}${list.length ? list.map(x => `<div class="tn-card a-move tn-tm"><h3>${esc(x.name || 'My team\'s exercise')}</h3>${F.filter(f => f.id !== 'name' && x[f.id]).map(f => `<p class="tn-sub"><b>${esc(f.label)}:</b> ${esc(x[f.id]).replace(/\n/g, '<br>')}</p>`).join('')}
      <div class="tn-acts"><button type="button" class="tn-btn sm line" data-hja="tmedit" data-hjv="${esc(x.id)}">Edit</button><button type="button" class="linkbtn" data-hja="tmdel" data-hjv="${esc(x.id)}">Remove</button></div></div>`).join('') : ed ? '' : `<p class="hj-note">Add each exercise or instruction from your physical therapist, doctor, or coach. It shows on Today as a reminder.</p>`}
    ${ed ? '' : `<button type="button" class="tn-btn" data-hja="tmedit" data-hjv="new">${ic('plus')}Add an Exercise or Instruction</button>`}
    <p class="tn-sub" style="margin-top:12px">${esc(T.keep || '')}</p></div>`;
}

// ---------- labs: every marker beside its recommended range ----------
const TONE_RANK = {good: 0, ok: 1, watch: 2, high: 3};
function markerBands(mk, entry){
  const b = mk.bands; if (Array.isArray(b)) return b;
  if (mk.bySex && b) return b[H().set.sex === 'm' ? 'm' : 'f'] || b.f || b.m || [];
  if (mk.byUnit && b) return b[(entry && entry[mk.id + 'U']) || mk.unit] || Object.values(b)[0] || [];
  return [];
}
function bandIdx(bands, v){ for (let i = 0; i < bands.length; i++){ const hi = bands[i].hi != null ? +bands[i].hi : null; if (hi == null || v < hi) return i; } return bands.length - 1; }
function markerVal(mk, e){ if (!e) return null; if (mk.fields) return mk.fields.every(f => num(e[f]) != null) ? mk.fields.map(f => +e[f]) : null;
  if (mk.computed){ const t = num(e.total), hd = num(e.hdl); return num(e[mk.id]) != null ? +e[mk.id] : t != null && hd != null ? t - hd : null; } return num(e[mk.id]); }
// The band a reading falls in: {band, idx, list}. Blood pressure takes the higher band of its two numbers (rule 'higher').
function markerBand(mk, e){
  const v = markerVal(mk, e); if (v == null) return null;
  if (mk.fields){ const B = mk.bands || {};
    if (Array.isArray(B)){ const idx = Math.max(...mk.fields.map((f, j) => { for (let i = 0; i < B.length; i++){ const hi = B[i][f]; if (hi == null || v[j] < hi) return i; } return B.length - 1; })); return {band: B[idx], idx, list: B, v}; }
    const per = mk.fields.map((f, j) => { const L = arr(B[f]), i = bandIdx(L, v[j]); return {f, L, i, b: L[i] || {}}; });
    const top = per.slice().sort((a, b) => (TONE_RANK[b.b.tone] || 0) - (TONE_RANK[a.b.tone] || 0))[0];
    return {band: top.b, idx: top.i, list: per[0].L, v, per}; }
  const L = markerBands(mk, e), i = bandIdx(L, v); return {band: L[i] || {}, idx: i, list: L, v};
}
// A range bar: one equal segment per band, colored by tone, the reading marked inside its band.
function rangeBar(list, v, marks){
  const n = list.length; if (!n) return '';
  const pos = x => { const i = bandIdx(list, x), lo = i ? +list[i - 1].hi : 0, hi = list[i].hi != null ? +list[i].hi : (i ? lo + (lo - (i > 1 ? +list[i - 2].hi : 0)) : lo * 2 || 1);
    const f = Math.max(0.04, Math.min(0.96, (x - lo) / ((hi - lo) || 1))); return (i + f) / n * 100; };
  return `<div class="tn-rb" aria-hidden="true">${list.map((b, i) => `<span class="t-${esc(b.tone || 'ok')}" style="left:${(i / n * 100).toFixed(2)}%;width:${(100 / n).toFixed(2)}%"></span>`).join('')}
    ${arr(marks).map(m => m.lo != null ? `<em class="rg" style="left:${pos(m.hi).toFixed(1)}%;width:${Math.max(1, pos(m.lo) - pos(m.hi)).toFixed(1)}%"></em>` : `<i class="${esc(m.cls || '')}" style="left:${pos(m.v).toFixed(1)}%"></i>`).join('')}
    ${v != null ? `<i class="me" style="left:${pos(v).toFixed(1)}%"></i>` : ''}</div>
    <div class="tn-rbl" aria-hidden="true" style="grid-template-columns:repeat(${n},minmax(0,1fr))">${list.map((b, i) => `<span>${esc(b.label || '')}${b.hi != null ? `<small>under ${esc(b.hi)}</small>` : ''}</span>`).join('')}</div>`;
}
function vLabsP(){
  const L = PLIB() || {}, h = H(), M = arr((L.labs || {}).markers), E = labs(), f = S.form;
  const latest = mk => { for (let i = E.length - 1; i >= 0; i--){ if (markerVal(mk, E[i]) != null) return E[i]; } return null; };
  const inp = (k, label, extra) => `<label class="hj-fld"><span>${esc(label)}</span><input type="number" inputmode="decimal" data-hjf="${esc(k)}" value="${esc(f && f[k] != null ? f[k] : '')}"${extra || ''}></label>`;
  const form = f && f.k === 'plab' ? `<div class="hj-blk" id="hj-form">${kick('Add Lab Results')}<label class="hj-fld"><span>Date</span><input type="date" data-hjf="date" value="${esc(f.date || '')}"></label>
    <div class="hj-g3">${M.filter(mk => !mk.computed).map(mk => mk.fields ? mk.fields.map(x => inp(x, mk.name + (x === 'sys' ? ', top number' : x === 'dia' ? ', bottom number' : ''))).join('')
      : inp(mk.id, mk.name + (mk.optional ? ' (optional)' : '') + (mk.units ? '' : ' (' + (mk.unit || '') + ')'))).join('')}</div>
    ${M.filter(mk => mk.units).map(mk => `<p class="hj-sub" style="margin:6px 0">${esc(mk.name)} unit</p><div class="hj-chips">${mk.units.map(u => `<button type="button" class="chip${(f[mk.id + 'U'] || mk.unit) === u ? ' on' : ''}" aria-pressed="${(f[mk.id + 'U'] || mk.unit) === u}" data-hja="plabu" data-hjv="${esc(mk.id + '|' + u)}">${esc(u)}</button>`).join('')}</div>`).join('')}
    ${M.some(mk => mk.bySex) ? `<p class="hj-sub" style="margin:6px 0">HDL ranges differ for women and men</p><div class="hj-chips">${[['f', 'Woman'], ['m', 'Man']].map(([v, l]) => `<button type="button" class="chip${(h.set.sex || 'f') === v ? ' on' : ''}" aria-pressed="${(h.set.sex || 'f') === v}" data-hja="psex" data-hjv="${v}">${l}</button>`).join('')}</div>` : ''}
    <label class="hj-fld"><span>Note (optional)</span><input type="text" data-hjf="note" value="${esc(f.note || '')}"></label>
    <div class="row"><button type="button" class="btn btn-gold btn-sm" data-hja="plabsave">Save</button><button type="button" class="btn btn-line btn-sm" data-hja="cancel">Cancel</button></div></div>` : '';
  const card = mk => { const e = latest(mk), r = e ? markerBand(mk, e) : null, hist = E.filter(x => markerVal(mk, x) != null).slice(-6), vs = v => Array.isArray(v) ? v.join('/') : fmt(v);
    const unit = e && e[mk.id + 'U'] || mk.unit || '', open = S.open['mk:' + mk.id];
    return `<div class="tn-card tn-mk${r ? ' t-' + esc(r.band.tone || 'ok') : ''}"><div class="spread"><div style="min-width:0"><div class="tn-k">${esc(mk.name)}${mk.optional ? ' <small>optional</small>' : ''}</div>
      ${r ? `<div class="tn-mkv"><b>${esc(vs(r.v))}</b> <small>${esc(unit)}</small></div><span class="tn-tone t-${esc(r.band.tone || 'ok')}">${esc(r.band.label || '')}</span>` : `<p class="tn-sub">${mk.computed ? 'Worked out from total cholesterol and HDL.' : 'Add a result to see where it falls.'}</p>`}</div>
      ${r ? `<small class="tn-mkd">${esc(short(e.date))}</small>` : ''}</div>
      ${rangeBar(r ? r.list : (mk.fields && !Array.isArray(mk.bands) ? arr((mk.bands || {})[mk.fields[0]]) : markerBands(mk, e)), r ? (Array.isArray(r.v) ? r.v[0] : r.v) : null)}
      ${r && r.per ? `<p class="tn-sub">${r.per.map(p => esc(p.f === 'sys' ? 'Top' : 'Bottom') + ' ' + esc(r.v[mk.fields.indexOf(p.f)]) + ': ' + esc(p.b.label || '')).join('. ')}.</p>` : ''}
      <details class="tn-more"${open ? ' open' : ''} data-hjd="mk:${esc(mk.id)}"><summary>About ${esc(mk.name)}</summary>${mk.note ? `<p class="tn-sub">${esc(mk.note)}</p>` : ''}
        ${hist.length > 1 ? `<p class="tn-sub">${hist.map(x => esc(short(x.date)) + ': ' + esc(vs(markerVal(mk, x)))).join(' · ')}</p>` : ''}<p class="hj-src">Source: ${srcLinks([mk.src].concat(arr(mk.src2)))}</p></details></div>`; };
  return `<div class="row" style="margin-bottom:14px"><button type="button" class="btn btn-gold btn-sm" data-hja="plabnew">Add Lab Results</button>${E.length ? `<button type="button" class="btn btn-line btn-sm" data-hja="new" data-hjv="mark">Add Markers</button>` : ''}</div>
    ${form}${f && f.k === 'mark' ? pubMarkForm() : ''}
    <p class="hj-sub">${esc((L.labs || {}).lead || '')}</p>
    <div class="tn-mks">${M.map(card).join('')}</div>
    ${vLdlP()}
    ${L.disclaimers && L.disclaimers.labs ? `<p class="hj-note">${esc(L.disclaimers.labs)}</p>` : ''}
    <p class="hj-note">Saved only on this device, locked inside your profile.</p>`;
}
function pubMarkForm(){ const f = S.form, teen = TEEN(), inp = (k, label) => `<label class="hj-fld"><span>${esc(label)}</span><input type="number" inputmode="decimal" data-hjf="${k}" value="${esc(f && f[k] != null ? f[k] : '')}"></label>`;
  return `<div class="hj-blk" id="hj-form">${kick('Markers')}<label class="hj-fld"><span>Date</span><input type="date" data-hjf="date" value="${esc(f.date || '')}"></label><div class="hj-g3">${teen ? '' : inp('weight', 'Weight (lb)') + inp('waist', 'Waist (in)')}${inp('rhr', 'Resting heart rate')}${inp('energy', 'Energy, 1 to 10')}${inp('sleep', 'Sleep, hours')}${inp('joint', 'Joint comfort, 0 to 10 (10 is easy)')}</div>
    <div class="row"><button type="button" class="btn btn-gold btn-sm" data-hja="save">Save</button><button type="button" class="btn btn-line btn-sm" data-hja="cancel">Cancel</button></div></div>`; }

// ---------- the LDL Path: your LDL, your goal, the levers you choose ----------
function ldlNow(){ const L = labs().filter(x => num(x.ldl) != null); return L.length ? L[L.length - 1] : null; }
function ldlCalc(){ const L = PLIB() || {}, P = TP(), e = ldlNow(); if (!P || !e) return null; return P.ldlRange(+e.ldl, arr((L.ldl || {}).levers), H().set.ldlPick || {}, (L.ldl || {}).combine || {}); }
function ldlChart(r, goal){
  const W = 340, Ht = 190, pl = 34, pr = 70, pt = 14, pb = 30, pw = W - pl - pr, ph = Ht - pt - pb, wks = 16, f1 = n => n.toFixed(1);
  const vals = [r.base, r.low, goal || r.low].filter(v => v != null), lo = Math.max(0, Math.floor((Math.min(...vals) - 15) / 20) * 20), hi = Math.ceil((Math.max(...vals) + 10) / 20) * 20;
  const x = t => pl + t / wks * pw, y = v => pt + (hi - v) / (hi - lo || 1) * ph;
  let up = [], dn = [], mid = ''; for (let t = 0; t <= wks; t += 0.5){ up.push(f1(x(t)) + ' ' + f1(y(r.at(t, 'lo')))); dn.unshift(f1(x(t)) + ' ' + f1(y(r.at(t, 'hi')))); mid += (t ? 'L' : 'M') + f1(x(t)) + ' ' + f1(y(r.at(t, 'mid'))); }
  const ticks = []; for (let v = lo; v <= hi; v += (hi - lo > 120 ? 40 : 20)) ticks.push(v);
  return `<svg class="tn-ldlsvg" viewBox="0 0 ${W} ${Ht}" role="img" aria-label="${esc(`From ${r.base}, your choices may bring LDL to about ${r.mid}, in a range of ${r.low} to ${r.high}, over about 12 weeks.${goal ? ' Your goal: ' + goal + '.' : ''}`)}">
    ${ticks.map(v => `<line x1="${pl}" x2="${pl + pw}" y1="${f1(y(v))}" y2="${f1(y(v))}" class="gr"/><text x="${pl - 6}" y="${f1(y(v) + 4)}" text-anchor="end" class="ax">${v}</text>`).join('')}
    ${[0, 4, 8, 12, 16].map(t => `<text x="${f1(x(t))}" y="${Ht - 12}" text-anchor="middle" class="ax">${t}</text>`).join('')}<text x="${f1(pl + pw / 2)}" y="${Ht - 1}" text-anchor="middle" class="ax">Weeks</text>
    ${r.count ? `<path d="M${up.join('L')}L${dn.join('L')}Z" class="bd"/><path d="${mid}" class="ln"/>` : ''}
    ${goal ? `<line x1="${pl}" x2="${pl + pw}" y1="${f1(y(goal))}" y2="${f1(y(goal))}" class="gl"/><text x="${pl + pw + 4}" y="${f1(y(goal) + 4)}" class="tl">Goal ${esc(goal)}</text>` : ''}
    <circle cx="${f1(x(0))}" cy="${f1(y(r.base))}" r="5" class="me"/><text x="${pl + pw + 4}" y="${f1(y(r.count ? r.mid : r.base) + 4)}" class="tl b">${r.count ? 'About ' + r.mid : 'Now ' + r.base}</text></svg>`;
}
function vLdlP(){
  const L = PLIB() || {}, D0 = L.ldl || {}, h = H(), e = ldlNow(), pick = h.set.ldlPick || {}, goal = num(h.set.goalLdl), r = ldlCalc(), mk = arr((L.labs || {}).markers).find(m => m.id === 'ldl');
  const levers = arr(D0.levers), inside = new Set(levers.filter(l => pick[l.id] === 'do').flatMap(l => arr(l.bundle))), B = e ? +e.ldl : null;
  const lev = l => { const st = pick[l.id], inB = inside.has(l.id), mid = l.mid != null ? l.mid : Math.round(((+l.lo || 0) + (+l.hi || 0)) / 2);
    return `<div class="tn-card tn-lev${st === 'do' ? ' do' : st === 'pass' ? ' pass' : ''}${inB ? ' inb' : ''}"><div class="spread"><div style="min-width:0;flex:1"><h3>${esc(l.name)}</h3><p class="tn-sub">${esc(l.how || '')}</p></div>
      <div class="tn-levr"><b>${esc(l.lo)} to ${esc(l.hi)}%</b><small>about ${esc(mid)}%${B ? `, ${Math.round(B * (+l.lo || 0) / 100)} to ${Math.round(B * (+l.hi || 0) / 100)} mg/dL` : ''}</small></div></div>
      ${l.daily ? `<p class="tn-sub"><b>Each day:</b> ${esc(l.daily)}</p>` : ''}${l.note ? `<p class="tn-sub">${esc(l.note)}</p>` : ''}
      ${l.kind === 'med' && D0.medicine ? `<p class="hj-note">${esc(typeof D0.medicine === 'string' ? D0.medicine : [D0.medicine.line, D0.medicine.change].filter(Boolean).join(' '))}</p>` : ''}
      ${inB ? `<p class="tn-sub"><b>Counted inside The Portfolio Pattern.</b></p>` : ''}
      <div class="tn-acts"><button type="button" class="tn-btn sm${st === 'do' ? '' : ' line'}" aria-pressed="${st === 'do'}" data-hja="lpick" data-hjv="${esc(l.id)}|do">${ic('check')}${l.kind === 'med' ? 'Do It, with My Doctor' : 'Do It'}</button><button type="button" class="tn-btn sm line${st === 'pass' ? ' on' : ''}" aria-pressed="${st === 'pass'}" data-hja="lpick" data-hjv="${esc(l.id)}|pass">Pass</button></div>
      <p class="hj-src">Source: ${srcLinks([l.src].concat(arr(l.src2)))}</p></div>`; };
  const goals = arr(D0.goals);
  return `<div class="hj-blk tn-ldlp" id="tn-ldlp">${kick('My LDL Path')}<p class="hj-sub">${esc(D0.lead || '')}</p>
    ${e ? '' : `<p class="hj-note">Add your LDL in Add Lab Results to see your path.</p>`}
    <p class="hj-sub" style="margin:10px 0 6px"><b>My LDL goal, set with my doctor</b></p>
    <div class="hj-chips">${goals.map(g => `<button type="button" class="chip${goal === +g.v ? ' on' : ''}" aria-pressed="${goal === +g.v}" data-hja="lgoal" data-hjv="${esc(g.v)}">Under ${esc(g.v)}</button>`).join('')}</div>
    ${goals.filter(g => goal === +g.v).map(g => `<p class="tn-sub">${esc(g.line)}</p>`).join('')}${D0.goalsSrc ? `<p class="hj-src">Source: ${srcLinks(D0.goalsSrc)}</p>` : ''}
    ${mk ? `<div class="tn-card tn-mk"><div class="tn-k">Recommended Levels and Yours</div>${rangeBar(markerBands(mk), B, r && r.count ? [{lo: r.low, hi: r.high}].concat(goal ? [{v: goal - 0.01, cls: 'go'}] : []) : goal ? [{v: goal - 0.01, cls: 'go'}] : [])}
      <div class="tn-leg"><span><i class="me"></i>My LDL${B != null ? ' ' + B : ''}</span>${r && r.count ? `<span><i class="rg"></i>Where my choices may lead, ${r.low} to ${r.high}</span>` : ''}${goal ? `<span><i class="go"></i>My goal, under ${goal}</span>` : ''}</div></div>` : ''}
    ${r ? `<div class="tn-card"><div class="tn-k">Where My Choices May Lead</div>${r.count ? `<p class="tn-big2">About ${r.mid} <small>mg/dL</small></p><p class="tn-sub">A range of ${r.low} to ${r.high}, about ${r.pctLo} to ${r.pctHi} percent lower, as each change settles in over about 12 weeks.${r.capped ? ' Food and movement together are capped near their research-informed limit.' : ''}${goal ? (r.mid < goal ? ` That reaches your goal of under ${goal}.` : r.low < goal ? ` Your goal of under ${goal} sits inside this range.` : ` Talk with your doctor about the path to under ${goal}.`) : ''}</p>` : `<p class="tn-sub">Choose Do It on any lever below, and the range appears here.</p>`}
      ${ldlChart(r, goal)}</div>` : ''}
    <h3 class="tn-h3">The Levers</h3>${levers.map(lev).join('')}
    ${D0.note ? `<p class="hj-sub">${esc(D0.note)}</p>` : ''}${L.disclaimers && L.disclaimers.ldl ? `<p class="hj-note">${esc(L.disclaimers.ldl)}</p>` : ''}</div>`;
}
function pubLdlCard(){
  const e = ldlNow(), r = ldlCalc(), goal = num(H().set.goalLdl);
  if (!e) return `<div class="tn-card p-fruit"><div class="tn-hd">${badge('flask')}<div><div class="tn-k">Fruit · My Numbers</div><div class="tn-sub">Add your lab numbers to see them beside their recommended ranges, private to this device.</div></div></div><button type="button" class="tn-btn sm" data-hja="sec" data-hjv="numbers">${ic('plus')}Add Numbers</button></div>`;
  return `<button type="button" class="tn-card tn-lift tn-ldl p-fruit" data-hja="sec" data-hjv="numbers"><div class="tn-hd">${badge('star')}<div style="min-width:0;flex:1"><div class="tn-k">Fruit · My LDL Path</div><div class="tn-sub">Your LDL, your goal, your choices</div></div></div>
    <div class="tn-nums"><div><b>${esc(e.ldl)}</b><small>LDL, ${esc(short(e.date))}</small></div>${goal ? `<div><b>${esc(goal)}</b><small>My goal</small></div>` : ''}${r && r.count ? `<div><b class="soft">${r.low} to ${r.high}</b><small>Where my choices may lead</small></div>` : ''}</div>
    <span class="tn-link">Open My LDL Path${ic('arrow')}</span></button>`;
}

// ---------- Kids: track the food, never the body ----------
function kidDay(id, k){ const h = H(); h.kids = h.kids && typeof h.kids === 'object' ? h.kids : {log: {}}; h.kids.log = h.kids.log || {}; const L = h.kids.log[id] = h.kids.log[id] || {}; return L[k] = L[k] || {g: {}, eat: [], rainbow: {}, play: {}}; }
function kidTot(id, k){ const d = kidDay(id, k), kid = KIDS().find(x => x.id === id) || {}, f = BAND_PORTION[kid.band] || 1, t = {fiber: 0, proteinG: 0, iron: 0, ca: 0, sug: 0};
  arr(d.eat).forEach(e => { const r = recOf(e.k), n = r && r.nut; if (!n) return; const q = (+e.q || 1) * f; t.fiber += (+n.fib || 0) * q; t.proteinG += (+n.pro || 0) * q; t.iron += (+n.iron || 0) * q; t.ca += (+n.ca || 0) * q; t.sug += (+n.sug || 0) * q; });
  Object.keys(t).forEach(x => { t[x] = r1(t[x]); }); return t; }
function kidBar(label, v, aim, unit, lim){ const a = aim && typeof aim === 'object' ? aim : {lo: aim, hi: aim}; if (a.lo == null) return '';
  const full = lim ? Math.max(a.hi || 1, v) : Math.max(a.hi || a.lo, v, 0.01), st = lim ? (v <= a.hi ? 'ok' : 'past') : v >= a.lo ? 'done' : 'build';
  return `<div class="tn-kb" data-st="${st}"><div class="spread"><b>${esc(label)}</b><small>${esc(fmtQ(r1(v)))} ${esc(unit)} · ${lim ? 'up to ' + esc(fmt(a.hi)) : 'aim ' + esc(a.lo === a.hi ? fmt(a.lo) : fmt(a.lo) + ' to ' + fmt(a.hi))} ${esc(unit)}</small></div><div class="tn-kbb"><span style="width:${Math.min(100, v / full * 100).toFixed(1)}%"></span></div></div>`; }
function vKids(){
  const L = PLIB() || {}, KD = L.kids || {}, kids = KIDS(), P = TP(), k0 = today(), cur = S.kid && kids.find(x => x.id === S.kid) ? S.kid : (kids[0] || {}).id;
  if (!kids.length) return `<div class="tn-sec p-branches">${secHead('people', 'p-branches', 'Family Food', esc(KD.lead || ''))}<p class="hj-note">Add children in your start-up check, and each one gets a food card here.</p><button type="button" class="tn-btn" data-hja="setup" data-hjv="house">${ic('plus')}Add a Child</button></div>`;
  const kid = kids.find(x => x.id === cur), j = kids.indexOf(kid), band = arr(KD.ages).find(a => a.id === kid.band) || {}, A = P ? P.kidAims(band, kid.sex) : {}, day = kidDay(kid.id, k0), t = kidTot(kid.id, k0), U2 = KD.units || {};
  const G = arr(KD.groups), step = id => /cups/.test((G.find(g => g.id === id) || {}).unit || U2[id] || '') ? 0.5 : 1;
  const din = (APP() || {}).dinners || {}, tn = dinnerFor(new Date()), opts = [].concat(tn && !tn.leftover ? [tn] : [], arr(din.breakfasts), arr(din.lunches), arr(din.snacks)).filter((x, i, a) => x && x.id && a.findIndex(y => y.id === x.id) === i);
  return `<div class="tn-sec p-branches">${secHead('people', 'p-branches', 'Family Food', esc(KD.lead || ''))}
    ${kids.length > 1 ? `<div class="hj-chips">${kids.map((x, i) => `<button type="button" class="chip${x.id === cur ? ' on' : ''}" aria-pressed="${x.id === cur}" data-hja="kidopen" data-hjv="${esc(x.id)}">${esc(kidName(x, i))}</button>`).join('')}</div>` : ''}
    <div class="tn-card p-branches"><div class="spread"><div><div class="tn-k">${esc(kidName(kid, j))} · Today</div><div class="tn-sub">${esc(band.name || '')}</div></div><button type="button" class="tn-btn sm" data-hja="kidview" data-hjv="${esc(kid.id)}">${ic('star')}Kid View</button></div>
      <h3 class="tn-h3">Food Groups</h3>${G.map(g => { const v = +((day.g || {})[g.id]) || 0, aim = A[g.id];
        return `<div class="tn-kg"><span class="dot" style="background:${esc(g.color || 'var(--c)')}"></span>${kidBar(g.name, v, aim, g.unit || U2[g.id] || '')}<div class="tn-kgb"><button type="button" class="tn-qm" data-hja="kidg" data-hjv="${esc(kid.id + '|' + g.id + '|-' + step(g.id))}" aria-label="Less ${esc(g.name)}">&minus;</button><button type="button" class="tn-qm" data-hja="kidg" data-hjv="${esc(kid.id + '|' + g.id + '|' + step(g.id))}" aria-label="More ${esc(g.name)}">+</button></div></div>`; }).join('')}
      <h3 class="tn-h3">From the Plan Today</h3><p class="tn-sub">Tap what ${esc(kidName(kid, j))} ate. Nutrients count a ${BAND_PORTION[kid.band] === 1 ? 'full' : BAND_PORTION[kid.band] === 0.5 ? 'half' : 'three-quarter'} portion for this age.</p>
      <div class="tn-qcs">${opts.map(x => { const n = arr(day.eat).filter(e => e.k === x.id).reduce((a, e) => a + (+e.q || 0), 0); return `<span class="tn-qc${n ? ' on' : ''}"><button type="button" class="tn-qa1" data-hja="kideat" data-hjv="${esc(kid.id + '|' + x.id + '|1')}">${n ? '' : ic('plus')}${esc(qaShort(x.name))}${n ? ` <b>${esc(fmtQ(n))}</b>` : ''}</button>${n ? `<button type="button" class="tn-qm" data-hja="kideat" data-hjv="${esc(kid.id + '|' + x.id + '|-1')}" aria-label="One less">&minus;</button>` : ''}</span>`; }).join('')}</div>
      <h3 class="tn-h3">Nutrients</h3>${kidBar('Fiber', t.fiber, A.fiber, 'g')}${kidBar('Protein', t.proteinG, A.proteinG, 'g')}${kidBar('Iron', t.iron, A.iron, 'mg')}${kidBar('Calcium', t.ca, A.ca, 'mg')}${kidBar('Added sugar', t.sug, {lo: 0, hi: A.sugarMax != null ? A.sugarMax : 25}, 'g', true)}
      ${band.note ? `<p class="tn-sub">${esc(band.note)}</p>` : ''}</div>
    ${KD.needs ? `<p class="hj-note">${esc(KD.needs)}</p>` : ''}${L.disclaimers && L.disclaimers.kids ? `<p class="tn-sub">${esc(L.disclaimers.kids)}</p>` : ''}
    <p class="hj-src">Sources: ${srcLinks(arr(band.src).length ? band.src : KD.src)}</p></div>`;
}
// Kid View: big, bright, playful, and no numbers.
function vKidView(){
  const L = PLIB() || {}, KD = L.kids || {}, pf = KD.playful || {}, kids = KIDS(), kid = kids.find(x => x.id === S.kid) || kids[0]; if (!kid) return vKids();
  const day = kidDay(kid.id, today()), rb = arr(pf.rainbow), got = rb.filter(c => (day.rainbow || {})[c.id || c.name]).length, mv = arr(pf.move), d0 = new Date().getDate();
  const ideas = mv.length ? [0, 1, 2].map(i => mv[(d0 + i * 3) % mv.length]).filter((x, i, a) => a.indexOf(x) === i) : [], cheers = arr(pf.cheers), sl = pf.sleep || {};
  return `<section class="tn-kv" data-tn="kidview"><div class="tn-kvtop"><h2>Hi, ${esc(kid.name || 'friend')}!</h2><button type="button" class="tn-btn sm line" data-hja="kidback">Back to Grown-up View</button></div>
    <div class="tn-kvc"><h3>Eat a Rainbow</h3><p>${esc(pf.rainbowGoal || 'Tap each color you eat today.')}</p>
      <div class="tn-rbw">${rb.map(c => { const k = c.id || c.name, on = !!(day.rainbow || {})[k]; return `<button type="button" class="tn-rbc${on ? ' on' : ''}" style="--rc:${esc(c.color || c.hex || '#4C9A4A')}" aria-pressed="${on}" data-hja="kidrb" data-hjv="${esc(kid.id + '|' + k)}"><span class="b">${on ? '&#9733;' : ''}</span><b>${esc(c.name || c.color)}</b><small>${esc(c.line || '')}</small></button>`; }).join('')}</div>
      ${got >= 3 && cheers.length ? `<p class="tn-cheer">${esc(cheers[(d0 + got) % cheers.length])}</p>` : ''}</div>
    <div class="tn-kvc"><h3>Move and Play</h3><div class="tn-rbw">${ideas.map((x, i) => { const on = !!(day.play || {})[x]; return `<button type="button" class="tn-rbc play${on ? ' on' : ''}" aria-pressed="${on}" data-hja="kidplay" data-hjv="${esc(kid.id + '|' + x)}"><span class="b">${on ? '&#9733;' : ''}</span><b>${esc(x)}</b></button>`; }).join('')}</div></div>
    <div class="tn-kvc"><h3>Sleep Well</h3><p>${esc(sl.lead || sl.line || '')}</p>${arr(sl.tips).length ? `<ul>${sl.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}</div></section>`;
}

// ---------- Settings: the start-up check, the team plan, the family ----------
function pubSettingsCard(){
  const s = H().set, kids = KIDS();
  return `<div class="tn-card"><div class="tn-hd">${badge('compass', 'a-numbers')}<div><div class="tn-k a-numbers">My Plan</div><div class="tn-sub">Goals, food needs, household, the health check, and your movement path.</div></div></div>
    <div class="tn-acts"><button type="button" class="tn-btn sm line a-numbers" data-hja="setup">My Start-Up Check</button><button type="button" class="tn-btn sm line" data-hja="sec" data-hjv="team">My Plan from My Team</button>${kids.length || s.who === 'family' ? `<button type="button" class="tn-btn sm line" data-hja="sec" data-hjv="kids">Family Food</button>` : ''}</div></div>`;
}

function actPub(a, v){
  const h = H();
  switch (a){
    case 'setup': S.setup = true; S.ck = null; ckDraft(); if (v){ const i = ckSteps(S.ck.d).indexOf(v); if (i >= 0) S.ck.i = i; } if (bareOn()){ toSetup(); return true; } rerender(false); window.scrollTo(0, 0); return true;
    case 'ckset': { const [f, val, multi] = v.split('|'), d = ckDraft().d, x = /^\d+$/.test(val) && f !== 'goalLdl' ? +val : f === 'goalLdl' ? +val : val === 'true' ? true : val === 'false' ? false : val;
      if (multi === '1'){ d[f] = arr(d[f]); d[f] = d[f].includes(x) ? d[f].filter(y => y !== x) : d[f].concat(x); } else d[f] = f === 'cleared' && d[f] === true ? false : x;
      rerender(true); return true; }
    case 'ckmove': { const d = ckDraft().d, nx = moveToggle(arr(d.moves), v); if (!nx.length){ toast('Choose at least one.'); return true; } d.moves = nx; d.track = nx.includes('strength') && nx.includes('cardio') ? 'mixed' : nx.includes('cardio') ? 'cardio' : 'strength'; rerender(true); return true; }
    case 'ckgear': { const d = ckDraft().d; d.gear = arr(d.gear); d.gear = d.gear.includes(v) ? d.gear.filter(x => x !== v) : d.gear.concat(v); d.gearSet = true; rerender(true); return true; }
    case 'ckq': { const [q, val] = v.split('|'), d = ckDraft().d; d.check[q] = val === 'true'; rerender(true); return true; }
    case 'ckkid': { const [j, f, val] = v.split('|'), d = ckDraft().d, K = d.house.kids = arr(d.house.kids);
      if (f === 'add') K.push({id: uid(), name: '', band: '', sex: ''}); else if (f === 'remove') K.splice(+j, 1); else if (K[+j]) K[+j][f] = val; rerender(true); return true; }
    case 'cknext': { const ck = ckDraft(), steps = ckSteps(ck.d), step = steps[ck.i];
      if (step === 'use' && !arr(ck.d.use).length){ toast('Choose at least one part.'); return true; }
      if (step === 'goals' && !arr(ck.d.goals).length){ toast('Choose at least one goal.'); return true; }
      if (step === 'check' && arr(((PLIB() || {}).check || {}).questions).some(q => ck.d.check[q.id] == null)){ toast('Answer each question with Yes or No.'); return true; }
      if (step === 'level' && !ck.d.level){ toast('Choose a level.'); return true; }
      ck.i = Math.min(steps.length - 1, ck.i + 1); rerender(false); window.scrollTo(0, 0); return true; }
    case 'ckback': S.ck.i = Math.max(0, S.ck.i - 1); rerender(false); window.scrollTo(0, 0); return true;
    case 'ckcancel': S.ck = null; S.setup = false; rerender(false); return true;
    case 'ckteam': ckSave(); S.sec = 'team'; S.teamEd = 'new'; rerender(false); return true;
    case 'cksave': ckSave(); return true;
    case 'pcleared': h.set.cleared = true; h.set.u = Date.now(); save(); toast('Saved. Welcome to your movement path.'); rerender(true); return true;
    case 'pswap': { const P = TP(), plan = h.plan, L = PLIB(); if (!P || !plan) return true; const [k, w, x] = v.split('|'); plan.n = (plan.n || 0) + 1;
      if (k === 'd') plan.ids = P.swapDinner(L.recipes, Object.assign({seed: plan.seed}, planSet()), plan.ids, w, x, plan.n);
      else plan.meals = Object.assign({}, plan.meals, {[w]: P.swapMeal(L.recipes, Object.assign({seed: plan.seed}, planSet()), arr(plan.meals[w]), w, +x, plan.n)});
      plan.u = Date.now(); clearShop(); PA = null; save(); S.open['planed'] = true; toast('Swapped. The shopping list follows.'); rerender(true); return true; }
    case 'pnew': if (!S.sureNew){ S.sureNew = true; rerender(true); setTimeout(() => { if (S.sureNew){ S.sureNew = false; rerender(true); } }, 3500); return true; }
      S.sureNew = false; ensurePlan(true); clearShop(); PA = null; toast('A new plan is ready.'); rerender(true); return true;
    case 'pleft': h.set.leftovers = h.set.leftovers === false; h.set.u = Date.now(); PA = null; ensurePlan(); clearShop(); save(); rerender(true); return true;
    case 'tmedit': S.teamEd = v; rerender(true); toForm(); return true;
    case 'tmcancel': S.teamEd = null; rerender(true); return true;
    case 'tmsave': { const x = {}; document.querySelectorAll('[data-hjtm]').forEach(i => { const t = String(i.value || '').trim(); if (t) x[i.dataset.hjtm] = t.slice(0, 1200); });
      if (!Object.keys(x).length){ toast('Add the exercise or instruction first.'); return true; }
      const t = h.team = h.team && Array.isArray(h.team.list) ? h.team : {list: []}, id = S.teamEd !== 'new' ? S.teamEd : uid(), i = t.list.findIndex(y => y.id === id);
      const rec = Object.assign({id, u: Date.now()}, x); if (i < 0) t.list.push(rec); else t.list[i] = rec; t.u = Date.now(); S.teamEd = null; save(); toast('Saved, just as you wrote it.'); rerender(true); return true; }
    case 'tmdel': { if (!confirm('Remove this from My Plan from My Team?')) return true; const t = h.team; if (t){ t.list = arr(t.list).filter(y => y.id !== v); t.u = Date.now(); const d = D(); d.deleted = d.deleted || {}; d.deleted.health = d.deleted.health || {}; d.deleted.health[v] = Date.now(); save(); } rerender(true); return true; }
    case 'plabnew': S.form = {k: 'plab', date: today()}; rerender(true); toForm(); return true;
    case 'plabu': { const [id, u] = v.split('|'); if (S.form) S.form[id + 'U'] = u; rerender(true); return true; }
    case 'psex': h.set.sex = v; h.set.u = Date.now(); save(); rerender(true); return true;
    case 'plabsave': { const f = S.form; if (!f) return true; if (!/^\d{4}-\d{2}-\d{2}$/.test(String(f.date || ''))){ toast('Choose a date.'); return true; }
      const rec = {id: uid(), date: f.date, u: Date.now()}; arr(((PLIB() || {}).labs || {}).markers).forEach(mk => { if (mk.computed) return; (mk.fields || [mk.id]).forEach(k => { const n = num(f[k]); if (n != null) rec[k] = n; }); if (mk.units && rec[mk.id] != null) rec[mk.id + 'U'] = f[mk.id + 'U'] || mk.unit; });
      const nt = String(f.note || '').trim(); if (nt) rec.note = nt.slice(0, 400);
      if (Object.keys(rec).length <= 3){ toast('Add at least one number.'); return true; }
      h.labs.push(rec); save(); S.form = null; toast('Saved on this device.'); rerender(true); return true; }
    case 'lpick': { const [id, c] = v.split('|'), p = h.set.ldlPick = Object.assign({}, h.set.ldlPick || {}); p[id] = p[id] === c ? '' : c; h.set.u = Date.now(); save(); rerender(true); return true; }
    case 'lgoal': h.set.goalLdl = num(h.set.goalLdl) === +v ? '' : +v; h.set.u = Date.now(); save(); rerender(true); return true;
    case 'kidopen': S.kid = v; S.sec = 'kids'; S.anim = true; rerender(false); window.scrollTo(0, 0); return true;
    case 'kidview': S.kid = v; S.sec = 'kidview'; rerender(false); window.scrollTo(0, 0); return true;
    case 'kidback': S.sec = 'kids'; rerender(false); window.scrollTo(0, 0); return true;
    case 'kidg': { const [id, g, d] = v.split('|'), day = kidDay(id, today()); day.g[g] = Math.max(0, r1((+day.g[g] || 0) + (+d))); day.u = Date.now(); h.kids.u = Date.now(); save(); rerender(true); return true; }
    case 'kideat': { const [id, k, d] = v.split('|'), day = kidDay(id, today()); const e = day.eat.find(x => x.k === k); if (e) e.q = Math.max(0, (+e.q || 0) + (+d)); else if (+d > 0) day.eat.push({k, q: 1});
      day.eat = day.eat.filter(x => +x.q > 0); day.u = Date.now(); h.kids.u = Date.now(); save(); rerender(true); return true; }
    case 'kidrb': case 'kidplay': { const i = v.indexOf('|'), id = v.slice(0, i), k = v.slice(i + 1), day = kidDay(id, today()), o = a === 'kidrb' ? day.rainbow : day.play; if (o[k]) delete o[k]; else o[k] = Date.now(); day.u = Date.now(); h.kids.u = Date.now(); save(); rerender(true); return true; }
  }
  return false;
}
function clearShop(){ const h = H(), n = foodWeek(new Date()); Object.keys(h.shop || {}).forEach(k => { if (+k >= n) delete h.shop[k]; }); }
document.addEventListener('input', e => { const t = e.target; if (!t.closest || !t.closest(ROOTS) || !t.dataset.hjck || !S.ck) return;
  const path = t.dataset.hjck.split('.'); let o = S.ck.d; for (let i = 0; i < path.length - 1; i++){ o = o[path[i]] = o[path[i]] == null ? {} : o[path[i]]; } o[path[path.length - 1]] = t.value; });

// ---------- the Home's summary ----------
function pubSummary(){
  const lib = FLDH(), h = H(); if (!lib || !h) return {on: false};
  const ready = PUB() ? !!h.set.pubDone : useSet(), d = new Date();
  if (ready){ try { vTodayT(lib); } catch(e){ S.tally = null; } }
  const T = targets(), t = totals(today()), wk = ready && U('move') ? sesFor(d) : null;
  return {on: true, ready, name: TNAME(), use: ready ? USE() : [],
    today: {checksDone: ready && S.tally ? S.tally.done : 0, checksTotal: ready && S.tally ? S.tally.total : 0},
    plate: {sf: t.sf, pro: t.pro, fib: t.fib, sug: t.sug, na: t.na, logged: t.n},
    targets: {sf: tHi(T.sf), pro: tLo(T.pro), fib: tLo(T.fib), sug: tHi(T.sug), na: tHi(T.na)},
    workout: wk ? {title: wk.title || 'Session ' + wk.id, mins: wk.mins || null, done: isDone(d, 'work:' + wk.id)} : null,
    nextLabs: h.set.nextLabs || '', kidsCount: PUB() ? KIDS().length : 0};
}

// =====================================================================
// BLD 896: My Own Items, My Own Shopping Items, and the Month (Chris, October 30, 2026: "maybe they want to add their meds,
// or a weekly racquetball.. or daily check in w grandma"; "regular item.. weekly, bi-weekly, monthly etc.. with specifics to
// add"; "we could have a monthly calendar avail"). Everything stays in DATA.health on this device, locked with the rest:
//   own: {items: [{id, name, freq: 'd'|'days'|'w'|'m', days: [0 to 6], dom: 1 to 31, time: 'HH:MM' or '', part: a tree part or '',
//          paused, from: 'YYYY-MM-DD', u}],
//         shop: [{id, name, amt, sec, store, brand, note, freq: 'once'|'w'|'2w'|'m', start: shopping week number, paused, u}], u}
// An item done on a day is the log key 'own:<id>' on that day, the same mark every Today item makes. Once a Week (any day)
// shows on Today until it is done that week. Once a Month falls on its day (the last day of a shorter month). Simple
// reminders only: a name and a time. A regular shopping item joins the list on its weeks (every week, every 2 weeks, or the
// first shopping day of each month) from its start week; Once is that one week's list. The Month shows a mark for each kind
// of thing on each day, the program week on each row, and the holiday sets planned (GGHolidays.planned, helper HOLC).
// =====================================================================
const OWN_PARTS = [['roots', 'Roots'], ['trunk', 'Trunk'], ['bark', 'Bark'], ['branches', 'Branches'], ['leaves', 'Leaves'], ['fruit', 'Fruit']];
const OWN_PN = {roots: 'Roots', trunk: 'Trunk', bark: 'Bark', branches: 'Branches', leaves: 'Leaves', fruit: 'Fruit'};
// Tending's own parts for Today's Rhythm, from the tree part an item tends.
const OWN_TP = {roots: 'spirit', bark: 'mind', branches: 'people', leaves: 'move', fruit: 'labs'};
const OWN_SLOT = {roots: 6.9, leaves: 7.6, trunk: 11.8, bark: 13.2, branches: 18, fruit: 19.8};
const OWN_ART = {roots: 'tend-spirit', trunk: 'tend-fruit', bark: 'tend-mind', branches: 'tend-people', leaves: 'tend-move', fruit: 'tend-fruit'};
const OWN_FREQ = [['d', 'Every Day'], ['days', 'Chosen Days'], ['w', 'Once a Week'], ['m', 'Once a Month']];
const OWN_SFREQ = [['once', 'Once'], ['w', 'Every Week'], ['2w', 'Every 2 Weeks'], ['m', 'Every Month']];
const OWN_WK = [1, 2, 3, 4, 5, 6, 0];
function OWN(){ const h = H(); if (!h) return {items: [], shop: []}; const o = h.own = h.own && typeof h.own === 'object' && !Array.isArray(h.own) ? h.own : {};
  o.items = arr(o.items).filter(x => x && x.id); o.shop = arr(o.shop).filter(x => x && x.id); return o; }
const ownSave = () => { OWN().u = Date.now(); save(); };
const ownKey = x => 'own:' + x.id;
const lastDom = d => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
const andList = L => L.length < 3 ? L.join(' and ') : L.slice(0, -1).join(', ') + ', and ' + L[L.length - 1];
const ordinal = n => n + (n % 100 >= 11 && n % 100 <= 13 ? 'th' : ({1: 'st', 2: 'nd', 3: 'rd'})[n % 10] || 'th');
function ownClock(t){ const m = /^(\d{1,2}):(\d{2})/.exec(String(t || '')); if (!m) return ''; const h = +m[1]; return (h % 12 || 12) + ':' + m[2] + (h < 12 ? ' AM' : ' PM'); }
const ownHour = x => { const m = /^(\d{1,2}):(\d{2})/.exec(String(x.time || '')); return m ? +m[1] + +m[2] / 60 : (OWN_SLOT[x.part] || 12); };
function ownHow(x){ const f = x.freq || 'd', t = ownClock(x.time), ds = OWN_WK.filter(w => arr(x.days).map(Number).includes(w));
  const base = f === 'days' ? (ds.length === 7 ? 'Every day' : 'Every ' + andList(ds.map(w => DOWL[w]))) : f === 'w' ? 'Once a week, any day' : f === 'm' ? 'Once a month, on the ' + ordinal(Math.max(1, Math.min(31, +x.dom || 1))) : 'Every day';
  return base + (t ? ' at ' + t : ''); }
function ownOnDay(x, d){ if (!x || x.paused || (x.from && ymd(d) < x.from)) return false;
  if (x.freq === 'days') return arr(x.days).map(Number).includes(d.getDay());
  if (x.freq === 'm') return d.getDate() === Math.min(Math.max(1, +x.dom || 1), lastDom(d));
  return x.freq !== 'w'; }
// The day in this week a Once a Week item was done, or ''.
function ownWeekDone(x, d){ const m = monOf(d), h = H(); for (let i = 0; i < 7; i++){ const k = ymd(addD(m, i)); if ((h.log[k] || {})[ownKey(x)]) return k; } return ''; }
// A day's own items. mode 'today': a Once a Week item shows until it is done that week; 'week': only on the day it was done.
function ownDay(d, mode){ const h = H(); if (!h) return []; const k = ymd(d), log = h.log[k] || {};
  return OWN().items.filter(x => { if (x.paused || (x.from && k < x.from)) return false; if (x.freq === 'w'){ const dw = ownWeekDone(x, d); return mode === 'today' ? (!dw || dw === k) : dw === k; } return ownOnDay(x, d); })
    .map(x => ({id: x.id, key: ownKey(x), title: x.name, hour: ownHour(x), when: ownClock(x.time) || (x.freq === 'w' ? 'This week' : 'Any time'), part: x.part || '', done: !!log[ownKey(x)], weekly: x.freq === 'w'}))
    .sort((a, b) => a.hour - b.hour); }
const ownSub = x => (x.weekly ? 'Once this week, any day' : 'My Own Item') + (x.part ? ' · ' + OWN_PN[x.part] : '');
// The Grounded Way's Today: one card each, checked off like the plan's own items.
function ownToday(d){ return ownDay(d, 'today').map(x => ({key: x.key, when: x.when, hour: x.hour, title: x.title, sub: ownSub(x), btn: 'Done', tint: x.part || 'week', done: x.done, kind: 'own', part: x.part, image: WAY(OWN_ART[x.part] || 'tend-body')})); }
// The Field Guide's Today: Right Now, and a My Own Items card in the part each item tends.
function ownNow(d){ return ownDay(d, 'today').map(x => ({key: x.key, k: 'own', hour: x.hour, kick: x.when, title: x.title, sub: ownSub(x), btn: 'Done', done: x.done})); }
function ownTodayCards(d, tally, G){
  const L = ownDay(d, 'today'), grp = p => p === 'bark' ? 'mind' : p === 'roots' ? 'spirit' : p === 'branches' ? 'people' : 'body', cls = {body: 'p-leaves', mind: 'p-bark', spirit: 'p-roots', people: 'p-branches'};
  if (!L.length){ if (!OWN().items.length) G.body.push(`<div class="tn-card a-week" id="tn-own-add"><div class="tn-hd">${badge('sprout')}<div><div class="tn-k">My Own Items</div><div class="tn-sub">Add your own rhythms to your days: a call to Grandma, a weekly game, your morning meds.</div></div></div><div class="tn-acts"><button type="button" class="tn-btn sm line" data-hja="sec" data-hjv="own">${ic('plus')}Add an Item</button></div></div>`); return; }
  L.forEach(x => tally(OWN_TP[x.part], x.done));
  ['body', 'mind', 'spirit', 'people'].forEach(g => { const M = L.filter(x => grp(x.part) === g); if (!M.length) return;
    G[g].push(`<article class="tn-card ${cls[g]}" id="tn-own-${g}"><div class="tn-hd">${badge('sprout')}<div><div class="tn-k">My Own Items</div><div class="tn-sub">Your own rhythms, beside your plan</div></div></div><div class="tn-list">${M.map(x => tck('toggle', x.key, x.done, x.title, x.when + (x.part ? ' · ' + OWN_PN[x.part] : ''))).join('')}</div><div class="tn-acts"><button type="button" class="tn-btn sm line" data-hja="sec" data-hjv="own">${ic('gear')}My Own Items</button></div></article>`); }); }
// The Field Guide's Week: each day's own items, and the Once a Week ones above the days.
function ownPills(d){ return ownDay(d, 'week').map(x => `<button type="button" class="hj-pill own" data-hja="ownedit" data-hjv="${esc(x.id)}">${esc(x.title)} <small>${esc(x.when)}${x.done ? ', done' : ''}</small></button>`).join(''); }
function ownWeekList(mon){ return OWN().items.filter(x => x.freq === 'w' && !x.paused).map(x => ({id: x.id, title: x.name, done: !!ownWeekDone(x, mon)})); }
function ownWeekLine(mon){ const L = ownWeekList(mon); return L.length ? `<p class="hj-note hj-ownwk"><b>Once this week:</b> ${L.map(x => esc(x.title) + (x.done ? ' (done)' : '')).join(', ')}</p>` : ''; }
const ownViewTabs = cur => `<div class="tn-tabs hj-wtabs" role="group" aria-label="Week or Month">${[['week', 'Week'], ['month', 'Month']].map(([id, l]) => `<button type="button" class="tn-tab${cur === id ? ' on' : ''}" aria-pressed="${cur === id}" data-hja="wkview" data-hjv="${id}">${ic(id === 'week' ? 'week' : 'clock')}${l}</button>`).join('')}<button type="button" class="tn-tab" data-hja="sec" data-hjv="own">${ic('sprout')}My Own Items</button></div>`;

// ---------- the phone calendar file: each active item repeats on its own rhythm ----------
function ownIcs(stamp, e, fold){
  const z = n => String(n).padStart(2, '0'), out = [], t0 = day0(new Date()), BY = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  OWN().items.filter(x => !x.paused && x.name).forEach(x => {
    let d = t0, rule = 'FREQ=DAILY';
    if (x.freq === 'days'){ const ds = arr(x.days).map(Number).filter(w => w >= 0 && w <= 6); if (!ds.length) return; for (let i = 0; i < 7; i++){ if (ds.includes(addD(t0, i).getDay())){ d = addD(t0, i); break; } } rule = 'FREQ=WEEKLY;BYDAY=' + OWN_WK.filter(w => ds.includes(w)).map(w => BY[w]).join(','); }
    else if (x.freq === 'w'){ d = monOf(t0); rule = 'FREQ=WEEKLY;BYDAY=MO'; }
    else if (x.freq === 'm'){ const dm = Math.max(1, Math.min(31, +x.dom || 1)); for (let i = 0; i < 62; i++){ const c = addD(t0, i); if (c.getDate() === Math.min(dm, lastDom(c))){ d = c; break; } } rule = 'FREQ=MONTHLY;BYMONTHDAY=' + (dm >= 29 ? -1 : dm); }
    const m = /^(\d{1,2}):(\d{2})/.exec(String(x.time || '')), day = d.getFullYear() + z(d.getMonth() + 1) + z(d.getDate());
    const start = m ? 'DTSTART:' + day + 'T' + z(+m[1]) + z(+m[2]) + '00' : 'DTSTART;VALUE=DATE:' + day;
    out.push(['BEGIN:VEVENT', 'UID:own-' + String(x.id).replace(/[^a-z0-9-]/gi, '-') + '@growwithgrounded.com', 'DTSTAMP:' + stamp, start, m ? 'DURATION:PT15M' : 'DURATION:P1D', 'RRULE:' + rule,
      'SUMMARY:' + e(x.name), 'DESCRIPTION:' + e(ownHow(x) + (x.freq === 'w' ? '. Any day this week.' : '.')), 'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + e(x.name), 'TRIGGER:' + (m ? 'PT0M' : 'PT9H'), 'END:VALARM', 'END:VEVENT'].map(fold).join('\r\n'));
  });
  return out;
}

// ---------- My Own Items: the list, Add an Item, Edit, Pause, Remove ----------
function ownForm(f){
  const ch = (k, v, l, on, al) => `<button type="button" class="chip${on ? ' on' : ''}" aria-pressed="${!!on}" data-hja="ownf" data-hjv="${k}|${v}"${al ? ` aria-label="${esc(al)}"` : ''}>${esc(l)}</button>`;
  const days = arr(f.days).map(Number);
  return `<div class="hj-ownf" id="hj-ownform"><h3>${S.ownEd ? 'Edit an Item' : 'Add an Item'}</h3>
    <label class="hj-fld"><span>Name</span><input id="hj-ownname" data-hjoi="name" maxlength="80" value="${esc(f.name || '')}" placeholder="Call Grandma" autocomplete="off"></label>
    <div class="hj-ownq" id="hj-ownq1">How often</div><div class="hj-chips" role="group" aria-labelledby="hj-ownq1">${OWN_FREQ.map(([v, l]) => ch('freq', v, l, (f.freq || 'd') === v)).join('')}</div>
    ${f.freq === 'days' ? `<div class="hj-ownq" id="hj-ownq2">Which days</div><div class="hj-chips hj-owndays" role="group" aria-labelledby="hj-ownq2">${OWN_WK.map(w => ch('day', w, DOW[w], days.includes(w), DOWL[w])).join('')}</div>` : ''}
    ${f.freq === 'm' ? `<label class="hj-fld"><span>Day of the month</span><select data-hjoi="dom">${Array.from({length: 31}, (x, i) => `<option value="${i + 1}"${(+f.dom || 1) === i + 1 ? ' selected' : ''}>${ordinal(i + 1)}</option>`).join('')}</select></label>` : ''}
    <label class="hj-fld"><span>Time (optional)</span><input type="time" data-hjoi="time" value="${esc(f.time || '')}"></label>
    <div class="hj-ownq" id="hj-ownq3">The part of your tree it tends (optional)</div><div class="hj-chips" role="group" aria-labelledby="hj-ownq3">${ch('part', '', 'None', !f.part)}${OWN_PARTS.map(([v, l]) => ch('part', v, l, f.part === v)).join('')}</div>
    <p class="tn-sub hj-ownmed">For a medicine, a name and a time make a simple reminder. Your doctor and pharmacist guide the rest.</p>
    <div class="tn-acts"><button type="button" class="tn-btn sm" data-hja="ownsave">${ic('check')}Save</button><button type="button" class="tn-btn sm line" data-hja="ownclose">Close</button></div></div>`;
}
function vOwn(){
  const o = OWN(), f = S.ownF;
  const row = x => `<div class="hj-own${x.paused ? ' paused' : ''}"><div class="tx"><b>${esc(x.name)}</b><small>${esc(ownHow(x))}${x.part ? ' · ' + OWN_PN[x.part] : ''}${x.paused ? ' · Paused' : ''}</small></div>
    <div class="acts"><button type="button" class="tn-btn sm line" data-hja="ownedit" data-hjv="${esc(x.id)}" aria-label="Edit ${esc(x.name)}">Edit</button><button type="button" class="tn-btn sm line" data-hja="ownpause" data-hjv="${esc(x.id)}" aria-label="${x.paused ? 'Resume' : 'Pause'} ${esc(x.name)}">${x.paused ? 'Resume' : 'Pause'}</button><button type="button" class="linkbtn" data-hja="owndel" data-hjv="${esc(x.id)}" aria-label="Remove ${esc(x.name)}">${S.ownSure === x.id ? 'Tap Again to Remove' : 'Remove'}</button></div></div>`;
  return `<div class="tn-card a-week hj-ownc" id="hj-own"><div class="tn-hd">${badge('sprout')}<div><div class="tn-k">My Own Items</div><div class="tn-sub">Your own rhythms beside your plan: a call to Grandma, a weekly game, your morning meds. They show on Today and in your Week, and they stay on this device.</div></div></div>
    ${o.items.length ? `<div class="hj-ownl">${o.items.map(row).join('')}</div>` : '<p class="tn-sub" style="margin:10px 0 0">Add the first one, and it joins your days.</p>'}
    ${f ? ownForm(f) : `<div class="tn-acts"><button type="button" class="tn-btn sm" data-hja="ownadd">${ic('plus')}Add an Item</button>${o.items.length ? `<button type="button" class="tn-btn sm line" data-hja="remics">${ic('clock')}Add to My Phone Calendar</button>` : ''}</div>`}</div>`;
}

// ---------- My Own Shopping Items ----------
const shopDate = n => addD(startMon(), (Math.max(1, n) - 1) * 7 - 2);
function ownShopDue(x, n){ if (!x || x.paused) return false; const s = Math.max(1, +x.start || 1); if (n < s) return false;
  if (x.freq === 'once') return n === s; if (x.freq === '2w') return (n - s) % 2 === 0; if (x.freq === 'm') return n === s || shopDate(n).getDate() <= 7; return true; }
const ownShopFor = x => [x.brand, x.store, x.note].map(t => String(t || '').trim()).filter(Boolean).join(' · ');
// The plan's list for week n plus the own items due that week; an own item's check rides the saved list (by its id).
function ownShop(L, n){
  if (!L || !Array.isArray(L.items)) return L; const due = OWN().shop.filter(x => ownShopDue(x, n)), had = {};
  L.items.forEach(x => { if (x && x.own) had[x.id] = !!x.done; });
  L.items = L.items.filter(x => !(x && x.own)).concat(due.map((x, i) => ({id: 'own-' + x.id, own: x.id, store: /coborn|grocer/i.test(x.store || '') ? 'grocer' : 'costco', sec: SECX().includes(x.sec) ? x.sec : 'Other',
    name: x.name, amt: x.amt || '', price: 0, for: ownShopFor(x), done: !!had['own-' + x.id], n: 800 + i})));
  return L;
}
const ownSFreqLine = x => { const s = Math.max(1, +x.start || 1), wd = shortDate(shopDate(s)); return x.freq === 'once' ? 'Once, on the list to shop ' + wd : x.freq === '2w' ? 'Every 2 weeks from ' + wd : x.freq === 'm' ? 'Every month, the first shopping day, from ' + wd : 'Every week from ' + wd; };
function ownShopForm(f, n){
  const ch = (k, v, l, on) => `<button type="button" class="chip${on ? ' on' : ''}" aria-pressed="${!!on}" data-hja="osf" data-hjv="${k}|${v}">${esc(l)}</button>`;
  const fld = (k, l, ph) => `<label class="hj-fld"><span>${esc(l)}</span><input data-hjos="${k}" value="${esc(f[k] || '')}" maxlength="80" placeholder="${esc(ph || '')}" autocomplete="off"${k === 'name' ? ' id="hj-osname"' : ''}></label>`;
  const n0 = Math.max(1, Math.min(n, foodWeek(new Date()))), opts = Array.from({length: 12}, (x, i) => n0 + i);
  return `<div class="hj-ownf" id="hj-osform"><h3>${S.ownSEd ? 'Edit a Shopping Item' : 'Add a Shopping Item'}</h3>
    <div class="hj-g2o">${fld('name', 'Item', 'Paper towels')}${fld('amt', 'Amount (optional)', '1 pack of 12')}
    <label class="hj-fld"><span>Store or aisle</span><select data-hjos="sec">${SECX().map(s => `<option${(f.sec || 'Other') === s ? ' selected' : ''}>${esc(s)}</option>`).join('')}</select></label>
    ${fld('store', 'Store (optional)', 'Any store')}${fld('brand', 'Brand (optional)', 'Your favorite')}${fld('note', 'Note (optional)', 'The big rolls')}</div>
    <div class="hj-ownq" id="hj-osq1">How often</div><div class="hj-chips" role="group" aria-labelledby="hj-osq1">${OWN_SFREQ.map(([v, l]) => ch('freq', v, l, (f.freq || 'once') === v)).join('')}</div>
    <label class="hj-fld"><span>${(f.freq || 'once') === 'once' ? 'Which shopping day' : 'Starting'}</span><select data-hjos="start">${opts.map(k => `<option value="${k}"${(+f.start || n) === k ? ' selected' : ''}>${esc(DOWL[shopDate(k).getDay()] + ', ' + shortDate(shopDate(k)) + ' · Week ' + letter(k))}</option>`).join('')}</select></label>
    <div class="tn-acts"><button type="button" class="tn-btn sm" data-hja="ossave">${ic('check')}Save</button><button type="button" class="tn-btn sm line" data-hja="osclose">Close</button></div></div>`;
}
function ownShopPanel(n){
  const o = OWN(), f = S.ownSF;
  const row = x => `<div class="hj-own${x.paused ? ' paused' : ''}"><div class="tx"><b>${esc(x.name)}</b><small>${esc([x.amt, ownShopFor(x), x.sec].filter(Boolean).join(' · '))}<br>${esc(ownSFreqLine(x))}${x.paused ? ' · Paused' : ownShopDue(x, n) ? ' · On this list' : ''}</small></div>
    <div class="acts"><button type="button" class="tn-btn sm line" data-hja="osedit" data-hjv="${esc(x.id)}" aria-label="Edit ${esc(x.name)}">Edit</button>${x.freq === 'once' ? '' : `<button type="button" class="tn-btn sm line" data-hja="ospause" data-hjv="${esc(x.id)}" aria-label="${x.paused ? 'Resume' : 'Pause'} ${esc(x.name)}">${x.paused ? 'Resume' : 'Pause'}</button>`}<button type="button" class="linkbtn" data-hja="osdel" data-hjv="${esc(x.id)}" aria-label="Remove ${esc(x.name)}">${S.ownSure === x.id ? 'Tap Again to Remove' : 'Remove'}</button></div></div>`;
  return `<div class="tn-card a-kitchen hj-ownc" id="hj-osp"><div class="tn-k">My Own Shopping Items</div><p class="tn-sub">What your household buys beyond the plan, with the specifics: once for one list, or a regular item that joins the list on its weeks.</p>
    ${o.shop.length ? `<div class="hj-ownl">${o.shop.map(row).join('')}</div>` : ''}
    ${f ? ownShopForm(f, n) : `<div class="tn-acts"><button type="button" class="tn-btn sm" data-hja="osadd">${ic('plus')}Add a Shopping Item</button></div>`}</div>`;
}

// ---------- the Month: a mark for each kind of thing on each day; tap a day to open it ----------
function holPlanned(){ try { return window.GGHolidays && typeof window.GGHolidays.planned === 'function' ? arr(window.GGHolidays.planned()).filter(x => x && x.id) : []; } catch(e){ return []; } }
const holDate = x => typeof x === 'string' ? x : x && typeof x === 'object' ? String(x.date || '') : '';
function monthDay(d, hols){
  const k = ymd(d), wn = weekNo(d), dow = d.getDay(), out = {date: k, move: null, dinner: null, prep: [], shop: null, own: ownDay(d, 'week').concat(k === today() ? ownDay(d, 'today').filter(x => x.weekly && !x.done) : []), hol: []};
  if (wn >= 1 || (dow === 0 && foodWeek(d) >= 1) || (dow === 6 && foodWeek(d) >= 1)){
    const fw = foodWeek(d);
    try { const ses = U('move') && workOn() && wn >= 1 ? sesFor(d) : null, pr = U('move') && flowDaily() && !ses && wn >= 1 && !flowRest(d, false) ? practiceFor(d) : null;
      if (ses) out.move = {title: sesLabel(ses.id, ses), key: 'work:' + ses.id, done: isDone(d, 'work:' + ses.id)};
      else if (pr) out.move = {title: pr.title || 'Flow', key: 'pracid:' + pr.id, done: isDone(d, 'prac')};
      const mf = U('mind') && MED() && wn >= 1 && H().set.medFreq && medOn(d) ? medFor(d) : null; if (mf) out.med = {title: mf.title || 'Meditation', key: 'medid:' + mf.id, done: isDone(d, 'med')};
      if (U('food')){ const dn = mmDinner(d); if (dn) out.dinner = {title: dn.name, key: 'cook:' + dn.wk + ':' + dn.id, done: isDone(d, 'cook:' + dn.wk + ':' + dn.id)};
        if (dow === 0){ const p = prepFor('sunday', fw), b = prepFor('batch', fw); if (p) out.prep.push({title: 'Sunday Together Prep', key: 'prep:sunday:' + fw}); if (b) out.prep.push({title: b.title || 'Weekly Batch', key: 'prep:batch:' + fw}); }
        if (dow === 3 && wn >= 1){ const p = prepFor('wednesday', wn); if (p) out.prep.push({title: 'Wednesday Mini Prep', key: 'prep:wednesday:' + wn}); }
        if (dow === 6){ const L = shopList(fw); if (L){ const own = arr(L.items).filter(x => x.own).length; out.shop = {title: 'Shop for Week ' + letter(fw), key: 'shop:' + fw, n: arr(L.items).length, own}; } } }
    } catch(e){}
  }
  hols.forEach(x => {
    if (x.date === k) out.hol.push({title: x.name || 'Holiday', key: 'holset:' + x.id, day: true});
    const sh = holDate(x.shop) || (window.GGHolidays && typeof GGHolidays.buyDate === 'function' && x.date ? (() => { try { return String(GGHolidays.buyDate(x.id, x.date) || ''); } catch(e){ return ''; } })() : '');
    if (sh && sh === k) out.hol.push({title: 'Shop for ' + (x.name || 'the holiday'), key: 'hol:' + x.id + ':shop'});
    arr(x.tasks).forEach(t => { if (t && t.date === k && t.date !== x.date) out.hol.push({title: t.title || 'Holiday prep', key: t.key || 'holset:' + x.id, prep: true}); });
  });
  out.menu = U('food') ? mmDayList(d) : [];   // BLD 900: My Menu
  return out;
}
const M_MARKS = [['move', 'Workout or Flow'], ['food', 'Dinner'], ['prep', 'Prep'], ['own', 'My Own Items'], ['shop', 'Shopping'], ['hol', 'Holiday']];
function monthMarks(x){ return {move: !!(x.move || x.med), food: !!x.dinner || arr(x.menu).length > 0, prep: x.prep.length > 0 || x.hol.some(h => h.prep), own: x.own.length > 0, shop: !!x.shop || x.hol.some(h => /:shop$/.test(h.key)), hol: x.hol.some(h => h.day)}; }
function monthLabel(x, d){
  const L = [];
  if (x.hol.some(h => h.day)) L.push(x.hol.filter(h => h.day).map(h => h.title).join(', '));
  if (x.move) L.push('workout'); if (x.med) L.push('meditation'); if (x.dinner) L.push('dinner'); if (arr(x.menu).length) L.push(x.menu.map(m => m.title).join(', ')); if (x.prep.length || x.hol.some(h => h.prep)) L.push('prep');
  if (x.shop || x.hol.some(h => /:shop$/.test(h.key))) L.push('shopping'); if (x.own.length) L.push(x.own.length + (x.own.length === 1 ? ' of my own items' : ' of my own items'));
  return DOWL[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + (ymd(d) === today() ? ', today' : '') + (L.length ? ': ' + L.join(', ') : '');
}
function vMonth(){
  const t0 = day0(new Date()), off = S.mOff || 0, first = new Date(t0.getFullYear(), t0.getMonth() + off, 1), y = first.getFullYear(), mo = first.getMonth(), last = new Date(y, mo + 1, 0);
  const hols = holPlanned(), rows = []; for (let w = monOf(first); w <= last; w = addD(w, 7)) rows.push(w);
  const inM = d => d.getMonth() === mo, sel = S.mSel && parseD(S.mSel) && inM(parseD(S.mSel)) ? S.mSel : (off === 0 ? ymd(t0) : ymd(first));
  const pw = d => progOn() ? progWeek(d) : weekNo(d), phs = new Set(); let w1 = 0, w2 = 0;
  const grid = rows.map(w => { const n = pw(addD(w, 3)), ph = progOn() && n >= 1 ? phaseId(Math.min(12, n)) : '';
    if (n >= 1){ if (!w1) w1 = n; w2 = n; if (ph) phs.add(phName(ph)); }
    const lab = n >= 1 ? `<span class="hj-mwk${ph ? ' ph-' + ph : ''}" title="${esc((progOn() ? (n <= 12 ? 'Program week ' + n + ' of 12' : '12 Weeks Complete') : 'Week ' + n) + (ph ? ', ' + phName(ph) : ''))}"><span class="sr">${progOn() ? 'Program week ' : 'Week '}</span>${n <= 99 ? n : ''}${ph ? `<span class="sr">, ${esc(phName(ph))}</span>` : ''}</span>` : '<span class="hj-mwk" aria-hidden="true"></span>';
    return lab + [0, 1, 2, 3, 4, 5, 6].map(i => { const d = addD(w, i), k = ymd(d), x = monthDay(d, hols), mk = monthMarks(x), on = k === sel;
      return `<button type="button" class="hj-mday${inM(d) ? '' : ' out'}${k === ymd(t0) ? ' t' : ''}${on ? ' on' : ''}${mk.hol ? ' hol' : ''}" data-hja="mday" data-hjv="${k}" aria-pressed="${on}" aria-label="${esc(monthLabel(x, d))}"><span class="n">${d.getDate()}</span><span class="dots" aria-hidden="true">${M_MARKS.filter(([m]) => mk[m]).map(([m]) => `<i class="m-${m}"></i>`).join('')}</span></button>`; }).join(''); }).join('');
  const prog = w1 ? (progOn() ? (w1 > 12 ? '12 Weeks Complete' : 'Week ' + w1 + (w2 > w1 ? ' to ' + Math.min(12, w2) : '') + ' of 12') : 'Week ' + w1 + (w2 > w1 ? ' to ' + w2 : '')) + (phs.size ? ' · ' + andList([...phs]) : '') : 'Your plan begins ' + shortDate(startMon());
  const soon = hols.filter(x => x.date >= ymd(t0)).slice(0, 3).map(x => `<button type="button" class="chip hj-mhol" data-hja="mday" data-hjv="${esc(x.date)}">${esc(x.name || 'Holiday')} <small>${esc(window.GGHolidays && GGHolidays.away ? GGHolidays.away(x.date) : shortDate(parseD(x.date) || t0))}</small></button>`).join('');
  const sd = parseD(sel), sx = monthDay(sd, hols), isT = sel === ymd(t0);
  const go = (key, label) => `<button type="button" class="tn-btn sm line" data-hja="mgo" data-hjv="${esc(key)}">${esc(label)}</button>`;
  const line = (cls, kick, title, btn) => `<div class="hj-mrow ${cls}"><div class="tx"><small>${esc(kick)}</small><b>${esc(title)}</b></div>${btn || ''}</div>`;
  const det = [];
  sx.hol.filter(h => h.day).forEach(h => det.push(line('m-hol', 'Holiday', h.title, go(h.key, 'Open the Set'))));
  if (sx.move) det.push(line('m-move', 'Move', sx.move.title + (sx.move.done ? ', done' : ''), go(sx.move.key, 'Start')));
  if (sx.med) det.push(line('m-move', 'Meditation', sx.med.title + (sx.med.done ? ', done' : ''), go(sx.med.key, 'Begin')));
  if (sx.dinner) det.push(line('m-food', 'Dinner', sx.dinner.title + (sx.dinner.done ? ', cooked' : ''), go(sx.dinner.key, 'Cook It')));
  arr(sx.menu).forEach(m => det.push(line('m-food', m.meal + ' · My Menu', m.title + (m.done ? ', done' : ''), go(m.key, 'Guide Me'))));
  sx.prep.forEach(p => det.push(line('m-prep', 'Prep', p.title, go(p.key, 'Open'))));
  sx.hol.filter(h => h.prep).forEach(h => det.push(line('m-prep', 'Holiday prep', h.title, go(h.key, 'Open'))));
  if (sx.shop) det.push(line('m-shop', 'Shopping', sx.shop.title + ' · ' + sx.shop.n + (sx.shop.n === 1 ? ' item' : ' items') + (sx.shop.own ? ', ' + sx.shop.own + ' of your own' : ''), go(sx.shop.key, 'Open the List')));
  sx.hol.filter(h => /:shop$/.test(h.key)).forEach(h => det.push(line('m-shop', 'Shopping', h.title, go(h.key, 'Open the List'))));
  sx.own.forEach(o => det.push(isT ? `<div class="hj-mrow m-own">${tck('toggle', o.key, o.done, o.title, o.when + (o.part ? ' · ' + OWN_PN[o.part] : ''))}</div>` : line('m-own', o.when + (o.part ? ' · ' + OWN_PN[o.part] : ''), o.title, `<button type="button" class="tn-btn sm line" data-hja="ownedit" data-hjv="${esc(o.id)}" aria-label="Edit ${esc(o.title)}">Edit</button>`)));
  return `<div class="hj-month">
    <div class="hj-wkbar"><button type="button" class="btn btn-line btn-sm" data-hja="mon" data-hjv="-1" aria-label="Previous month">Back</button><div><b>${MONTHS[mo]} ${y}</b><small>${esc(prog)}</small></div><button type="button" class="btn btn-line btn-sm" data-hja="mon" data-hjv="1" aria-label="Next month">Next</button></div>
    ${soon ? `<div class="hj-chips hj-msoon" aria-label="Holiday sets ahead">${soon}</div>` : ''}
    <div class="hj-mgrid" role="group" aria-label="${MONTHS[mo]} ${y}"><span class="hj-mwk hd" aria-hidden="true">Wk</span>${OWN_WK.map(w => `<span class="hj-mhd" aria-hidden="true">${DOW[w]}</span>`).join('')}${grid}</div>
    <div class="hj-mkey" aria-hidden="true">${M_MARKS.map(([m, l]) => `<span><i class="m-${m}"></i>${esc(l)}</span>`).join('')}</div>
    <div class="tn-card a-week hj-mdet" id="hj-mdet" tabindex="-1" aria-live="polite"><div class="tn-k">${esc(DOWL[sd.getDay()] + ', ' + MONTHS[sd.getMonth()] + ' ' + sd.getDate())}${isT ? ' · Today' : ''}</div>
      ${det.length ? det.join('') : '<p class="tn-sub">A day to rest and enjoy.</p>'}
      <div class="tn-acts"><button type="button" class="tn-btn sm line" data-hja="sec" data-hjv="own">${ic('plus')}Add an Item</button></div></div></div>`;
}

// ---------- actions ----------
function ownGoSec(sec){ if (bareOn() && C.section && C.host === 'home'){ try { C.section(sec); } catch(e){} return; } if (bareOn()){ S.bare.section = sec; S.bare.closed = false; rerender(false); return; } S.sec = sec; S.setup = false; rerender(false); }
const ownFocus = id => setTimeout(() => { const e = document.getElementById(id); if (e){ try { e.focus({preventScroll: true}); } catch(x){} if (e.scrollIntoView) e.scrollIntoView({block: 'center', behavior: 'smooth'}); } }, 40);
function actOwn(a, v){
  const o = OWN(), it = id => o.items.find(x => x.id === id), si = id => o.shop.find(x => x.id === id);
  const sure = id => { if (S.ownSure === id) return true; S.ownSure = id; rerender(true); setTimeout(() => { if (S.ownSure === id){ S.ownSure = null; rerender(true); } }, 3500); return false; };
  switch (a){
    case 'go': if (!/^own:/.test(String(v))) return false; actTool('toggle', v); return true;
    case 'sec': if (v !== 'own' || !bareOn() || C.host !== 'home' || !C.section) return false; S.ownF = null; S.ownEd = null; ownGoSec('own'); return true;
    case 'wkview': S.wkView = v === 'month' ? 'month' : 'week'; S.mOff = 0; S.mSel = null; rerender(true); return true;
    case 'mon': S.mOff = (S.mOff || 0) + (+v || 0); S.mSel = null; rerender(true); return true;
    case 'mday': { const d = parseD(v); if (!d) return true; const t = day0(new Date()); S.mOff = (d.getFullYear() - t.getFullYear()) * 12 + d.getMonth() - t.getMonth(); S.mSel = v; rerender(true); ownFocus('hj-mdet'); return true; }
    case 'mgo': { v = String(v || ''); if (/^shop:/.test(v)){ S.shopWk = +v.split(':')[1] || null; S.shopEd = null; ownGoSec('shop'); return true; }
      if (window.GGHealth && GGHealth.act) GGHealth.act(v); else apiAct(v); return true; }
    case 'ownadd': S.ownF = {name: '', freq: 'd', days: [], dom: new Date().getDate(), time: '', part: ''}; S.ownEd = null; rerender(true); ownFocus('hj-ownname'); return true;
    case 'ownedit': { const x = it(v); if (!x) return true; S.ownF = JSON.parse(JSON.stringify(x)); S.ownEd = x.id;
      const here = bareOn() ? S.bare.section === 'own' : S.sec === 'own'; if (here) rerender(true); else ownGoSec('own'); ownFocus('hj-ownname'); return true; }
    case 'ownf': { const f = S.ownF; if (!f) return true; const [k, val] = String(v).split('|');
      if (k === 'day'){ const w = +val, L = arr(f.days).map(Number); f.days = L.includes(w) ? L.filter(z => z !== w) : L.concat(w); }
      else if (k === 'freq'){ f.freq = val; if (val === 'days' && !arr(f.days).length) f.days = [new Date().getDay()]; }
      else f[k] = val; rerender(true); return true; }
    case 'ownclose': S.ownF = null; S.ownEd = null; rerender(true); return true;
    case 'ownsave': { const f = S.ownF; if (!f) return true; const name = String(f.name || '').trim().slice(0, 80);
      if (!name){ toast('Add a name.'); ownFocus('hj-ownname'); return true; }
      if (f.freq === 'days' && !arr(f.days).length){ toast('Choose at least one day.'); return true; }
      const rec = {id: S.ownEd || 'o' + uid(), name, freq: ['d', 'days', 'w', 'm'].includes(f.freq) ? f.freq : 'd', days: f.freq === 'days' ? arr(f.days).map(Number).filter(w => w >= 0 && w <= 6) : [],
        dom: f.freq === 'm' ? Math.max(1, Math.min(31, +f.dom || 1)) : null, time: /^\d{1,2}:\d{2}$/.test(String(f.time || '')) ? String(f.time) : '', part: OWN_PN[f.part] ? f.part : '',
        paused: !!f.paused, from: f.from || ymd(monOf(new Date())), u: Date.now()};
      const i = o.items.findIndex(x => x.id === rec.id); if (i < 0) o.items.push(rec); else o.items[i] = rec;
      S.ownF = null; S.ownEd = null; ownSave(); toast(i < 0 ? 'Added. It joins your days.' : 'Saved.'); rerender(true); return true; }
    case 'ownpause': { const x = it(v); if (!x) return true; x.paused = !x.paused; x.u = Date.now(); ownSave(); toast(x.paused ? 'Paused. Resume it anytime.' : 'Back in your days.'); rerender(true); return true; }
    case 'owndel': { if (!sure(v)) return true; S.ownSure = null; o.items = o.items.filter(x => x.id !== v); if (S.ownEd === v){ S.ownF = null; S.ownEd = null; } ownSave(); toast('Removed.'); rerender(true); return true; }
    case 'shoped': { if (!/^own-/.test(String(v))) return false; const x = si(String(v).slice(4)); if (!x) return true; S.ownSF = JSON.parse(JSON.stringify(x)); S.ownSEd = x.id; rerender(true); ownFocus('hj-osname'); return true; }
    case 'osadd': S.ownSF = {name: '', amt: '', sec: 'Other', store: '', brand: '', note: '', freq: 'once', start: S.shopWk || foodWeek(new Date())}; S.ownSEd = null; rerender(true); ownFocus('hj-osname'); return true;
    case 'osedit': { const x = si(v); if (!x) return true; S.ownSF = JSON.parse(JSON.stringify(x)); S.ownSEd = x.id; rerender(true); ownFocus('hj-osname'); return true; }
    case 'osf': { const f = S.ownSF; if (!f) return true; const [k, val] = String(v).split('|'); f[k] = val; rerender(true); return true; }
    case 'osclose': S.ownSF = null; S.ownSEd = null; rerender(true); return true;
    case 'ossave': { const f = S.ownSF; if (!f) return true; const name = String(f.name || '').trim().slice(0, 80); if (!name){ toast('Add a name.'); ownFocus('hj-osname'); return true; }
      const t = k => String(f[k] || '').trim().slice(0, 80);
      const rec = {id: S.ownSEd || 's' + uid(), name, amt: t('amt'), sec: SECX().includes(f.sec) ? f.sec : 'Other', store: t('store'), brand: t('brand'), note: t('note'),
        freq: ['once', 'w', '2w', 'm'].includes(f.freq) ? f.freq : 'once', start: Math.max(1, Math.round(+f.start || foodWeek(new Date()))), paused: !!f.paused, u: Date.now()};
      const i = o.shop.findIndex(x => x.id === rec.id); if (i < 0) o.shop.push(rec); else o.shop[i] = rec;
      S.ownSF = null; S.ownSEd = null; ownSave(); toast(i < 0 ? (rec.freq === 'once' ? 'Added to that list.' : 'Added. It joins the list on its weeks.') : 'Saved.'); rerender(true); return true; }
    case 'ospause': { const x = si(v); if (!x) return true; x.paused = !x.paused; x.u = Date.now(); ownSave(); rerender(true); return true; }
    case 'osdel': { if (!sure(v)) return true; S.ownSure = null; o.shop = o.shop.filter(x => x.id !== v); if (S.ownSEd === v){ S.ownSF = null; S.ownSEd = null; } ownSave(); toast('Removed.'); rerender(true); return true; }
  }
  return false;
}
document.addEventListener('input', e => { const t = e.target; if (!t || !t.closest || !t.closest(ROOTS)) return;
  if (t.dataset.hjoi && S.ownF) S.ownF[t.dataset.hjoi] = t.value; if (t.dataset.hjos && S.ownSF) S.ownSF[t.dataset.hjos] = t.value; });
document.addEventListener('change', e => { const t = e.target; if (!t || !t.closest || !t.closest(ROOTS)) return;
  if (t.dataset.hjoi && S.ownF) S.ownF[t.dataset.hjoi] = t.value; if (t.dataset.hjos && S.ownSF){ S.ownSF[t.dataset.hjos] = t.value; } });
document.addEventListener('keydown', e => { const t = e.target; if (e.key !== 'Enter' || !t || !t.dataset) return; if (t.dataset.hjoi === 'name' && S.ownF){ e.preventDefault(); act('ownsave'); } if (t.dataset.hjos && t.tagName === 'INPUT' && S.ownSF){ e.preventDefault(); act('ossave'); } });
(function(){ const s = document.createElement('style'); s.id = 'hj-own-css'; s.textContent = `
.hj-ownl{display:grid;gap:8px;margin:12px 0 4px;}
.hj-own{display:flex;align-items:center;gap:10px;flex-wrap:wrap;border:1px solid var(--line);border-radius:14px;padding:10px 12px;background:var(--t-card2,var(--card));}
.hj-own .tx{flex:1 1 200px;min-width:0;}.hj-own .tx b{display:block;font-size:17px;overflow-wrap:anywhere;}.hj-own .tx small{color:var(--ink-soft);font-size:14px;line-height:1.4;overflow-wrap:anywhere;}
.hj-own .acts{display:flex;flex-wrap:wrap;align-items:center;gap:8px;}.hj-own .acts .tn-btn{margin-top:0;}
.hj-own.paused{opacity:.7;}
.hj-ownf{margin-top:14px;padding-top:12px;border-top:1px solid var(--line);}.hj-ownf h3{margin:0 0 6px;font-size:20px;}
.hj-ownf input,.hj-ownf select{width:100%;min-width:0;min-height:44px;box-sizing:border-box;}
.hj-ownq{font-weight:700;font-size:15px;margin:12px 0 6px;}
.hj-ownf .hj-chips{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 6px;}.hj-ownf .chip{min-height:44px;}
.hj-owndays .chip{min-width:52px;justify-content:center;}
.hj-ownmed{font-size:14px;margin-top:8px;}
.hj-g2o{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0 12px;}
.hj-pill.own{border-left:4px solid var(--t-week,var(--gold));}
.hj-ownwk{margin:0 0 12px;}
.hj-wtabs{margin-bottom:12px;}
.hj-month .hj-wkbar small{display:block;}
.hj-msoon{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 10px;}.hj-mhol small{opacity:.8;margin-left:4px;}
.hj-mgrid{display:grid;grid-template-columns:26px repeat(7,minmax(0,1fr));gap:4px;align-items:stretch;}
.hj-mhd{text-align:center;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:.8px;text-transform:uppercase;color:var(--ink-soft);padding:2px 0;}
.hj-mwk{display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;color:var(--ink-soft);border-radius:8px;}
.hj-mwk.hd{font-size:11px;}
.hj-mwk.ph-foundation{color:var(--t-leaves,#4E7D4A);}.hj-mwk.ph-build{color:var(--t-move,#3F6F94);}.hj-mwk.ph-peak{color:var(--t-kitchen,#A9562A);}
.hj-mday{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:3px;min-height:52px;min-width:0;padding:5px 2px 6px;border:1.5px solid var(--line);border-radius:12px;background:var(--card,var(--bg));color:var(--ink);font:inherit;cursor:pointer;}
.hj-mday .n{font-weight:700;font-size:15px;line-height:1;}
.hj-mday.out{opacity:.45;}
.hj-mday.t{border-color:var(--c,var(--t-week));}.hj-mday.t .n{color:var(--c,var(--t-week));}
.hj-mday.on{background:var(--c,var(--t-week));border-color:var(--c,var(--t-week));color:var(--t-on,#fff);}.hj-mday.on .n{color:inherit;}
.hj-mday.hol{box-shadow:inset 0 0 0 2px var(--t-fruit,#D62839);}
.hj-mday .dots{display:flex;flex-wrap:wrap;justify-content:center;gap:2px;max-width:100%;}
.hj-mgrid i,.hj-mkey i{display:inline-block;width:7px;height:7px;border-radius:50%;flex:none;}
.hj-mday.on i{outline:1.5px solid var(--t-on,#fff);}
.m-move{background:var(--t-move,#3F6F94);}.m-food{background:var(--t-kitchen,#A9562A);}.m-prep{background:var(--t-trunk,#8B5E1A);}.m-own{background:var(--t-week,#6B4E8C);}.m-shop{background:var(--t-leaves,#4E7D4A);}.m-hol{background:var(--t-fruit,#D62839);}
.hj-mkey{display:flex;flex-wrap:wrap;gap:6px 14px;margin:10px 2px 14px;font-size:13.5px;color:var(--ink-soft);}.hj-mkey span{display:inline-flex;align-items:center;gap:6px;}
.hj-mdet{outline:none;}
.hj-mrow{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:8px 0;border-top:1px solid var(--line);}
.hj-mrow:first-of-type{border-top:0;}
.hj-mrow .tx{flex:1 1 160px;min-width:0;}.hj-mrow .tx small{display:block;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:var(--ink-soft);}
.hj-mrow .tx b{display:block;font-size:16px;overflow-wrap:anywhere;}.hj-mrow .tn-btn{margin-top:0;}.hj-mrow .tn-ck{flex:1 1 auto;}
.hj-mrow.m-move,.hj-mrow.m-food,.hj-mrow.m-prep,.hj-mrow.m-own,.hj-mrow.m-shop,.hj-mrow.m-hol{background:none;border-left:4px solid transparent;padding-left:10px;}
.hj-mrow.m-move{border-left-color:var(--t-move,#3F6F94);}.hj-mrow.m-food{border-left-color:var(--t-kitchen,#A9562A);}.hj-mrow.m-prep{border-left-color:var(--t-trunk,#8B5E1A);}.hj-mrow.m-own{border-left-color:var(--t-week,#6B4E8C);}.hj-mrow.m-shop{border-left-color:var(--t-leaves,#4E7D4A);}.hj-mrow.m-hol{border-left-color:var(--t-fruit,#D62839);}
:is(#hj-root,#hj-bare) .sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}
@media (max-width:420px){.hj-mgrid{grid-template-columns:20px repeat(7,minmax(0,1fr));gap:3px;}.hj-mday{min-height:48px;border-radius:10px;}.hj-mday .n{font-size:14px;}.hj-mgrid i{width:6px;height:6px;}}
`; document.head.appendChild(s); })();

// =====================================================================
// BLD 881: The Grounded Way, top shelf. The contract with home/home.js (host 'home', public Tending or a moved plan):
//   GGHealth.today(date) -> [{key, when, hour, title, sub, btn, tint, done, kind}] in day order (done from that day's log);
//     before Tending is set up, one item: {key: 'setup', title: 'Start Tending', kind: 'setup'}.
//   GGHealth.act(key) opens an item's guide or marks it; GGHealth.toggle(key) flips its done circle.
//   GGHealth.week(n) -> {label, days: [{day, date, dinner: {title, key}, move: {title, key}}], shopKey, prepKey, shopWeek, shopCount, shopLeft} (n: weeks from this one).
//   GGHealth.render(el, section, {bare: true}) draws one section into el: shop, prep, numbers, settings, log, workouts, quiet,
//     setup, cook:<key>, move:<key>. GGHealth.counts() -> {recipes, workouts, meditations, practices}.
// Optional host hooks: C.section(name) when an item asks for a section (act also returns {section}), C.changed() after a save.
// =====================================================================
const ROOTS = '#hj-root,#hj-bare,#hj-ov0';
const TINT = {quiet: '#6B4E8C', move: '#3F6F94', meals: '#4E7D4A', cook: '#A9562A'};
function bareOn(){ const b = S.bare; return !!(b && vis(b.el)); }
function want(sec){ if (bareOn()){ S.bare.section = sec; S.bare.closed = false; rerender(false); } else if (C.section){ try { C.section(sec); } catch(e){} } return {section: sec}; }
function toSetup(){ const b = S.bare; if (b.section !== 'setup') b.back = b.section; b.section = 'setup'; b.closed = false; rerender(false); }
function paintOv(){
  let host = document.getElementById('hj-ov0'); const need = S.ov && !S.ov.inline && S.ovHome === 'host';
  if (!need){ if (host) host.remove(); return; }
  if (!host){ host = document.createElement('div'); host.id = 'hj-ov0'; document.body.appendChild(host); }
  host.className = 'tn tn-ovl' + (PUB() ? ' tn-pub' : '') + (TEEN() ? ' tn-teen' : '');
  host.innerHTML = vOv();
}
function paintBare(){
  const b = S.bare; if (!b || !b.el) return;
  b.el.innerHTML = `<div id="hj-bare" class="tn tn-bare${PUB() ? ' tn-pub' : ''}${TEEN() ? ' tn-teen' : ''}" data-sec="${esc(b.section)}">${bareBody(b)}</div>`;
}
const setupNeeded = () => { const h = H(); return !h || (PUB() ? !h.set.pubDone : (!useSet() || !h.set.u || !!h.set.needSetup)); };
function bareClose(b, why){ if (b.closed) return; b.closed = true; const cb = b.opts && b.opts.onClose; if (typeof cb === 'function') setTimeout(() => { try { cb(why || b.section); } catch(e){} }, 0); }
function bareBody(b){
  const lib = FLDH(), h = H(); if (!lib || !h) return '';
  if (VO()) VO().setKey(((C.fld && C.fld()) || {}).audio);
  const sec = String(b.section || ''), base = sec.split(':')[0], box = (cls, html) => `<div class="tn-sec ${cls}">${html}</div>`;
  if (base === 'holidays'){ if (sec.length > 9) S.holId = sec.slice(9); return vHol(); } // BLD 896: open to anyone
  if (base !== 'setup' && setupNeeded()) return vSetupBare(b);
  switch (base){
    case 'shop': return box('a-kitchen', vShop());
    case 'prep': return box('a-kitchen', vPrep());
    case 'numbers': return box('a-numbers', (PUB() ? vLabsP() : vNumbers()) + vRisk());
    case 'journey': return box('a-numbers', vJourney());
    case 'settings': return vSettings(true);
    case 'log': return vLog((b.opts || {}).mode);
    case 'plate': return box('a-plate', vPlate('full') + (PUB() ? pubAims() : aims()));
    case 'workouts': return vWorkouts();
    case 'quiet': return vQuietShelf();
    case 'setup': return vSetupBare(b);
    case 'own': return box('a-week', vOwn());   // BLD 896
    case 'month': return box('a-week', vMonth());
    case 'week': return box('a-week', vWeek());
    case 'fruit': return KIT() ? '' : box('p-fruit', fruitCards());   // BLD 882: milestones, the last 7 days, and the LDL path, for the Home's Grow tab
    case 'learn': return box('a-today', vPlan(lib, 'food') + vPlan(lib, 'fitness') + SOBER);
    case 'team': return PUB() ? vTeam() : '';
    case 'kids': return PUB() ? vKids() : '';
    case 'kidview': return PUB() ? vKidView() : '';
    case 'cook': case 'move': return S.ov && S.ov.inline ? vOv() : (bareClose(b, 'closed'), `<div class="tn-card tn-bclosed"><h3>Well done.</h3><p class="tn-sub">It is here whenever you want it again.</p><button type="button" class="tn-btn sm line" data-hja="bareagain">${ic('play')}Open Again</button></div>`);
  }
  return box('a-today', vSettings(true));
}
function vSetupBare(b){
  if (S.setup || setupNeeded()){ if (PUB()) return vCheck(); if (!useSet()) return vChoose(); return `<div class="tn-sec a-numbers">${vSetup()}</div>`; }
  if (b.back && b.back !== 'setup'){ b.section = b.back; b.back = null; return bareBody(b); }
  bareClose(b, 'setup');
  return `<div class="tn-card tn-bclosed"><h3>Tending is ready.</h3><p class="tn-sub">Today shows your plan, one card at a time.</p></div>`;
}
// The plate or a note, from Today's green + button.
function vLog(mode){
  const h = H(), N = h.notes.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)) || (b.u || 0) - (a.u || 0)).slice(0, 3);
  const plate = mode === 'note' ? '' : vPlate('today');
  const note = mode === 'plate' && plate ? '' : `<div class="tn-card p-trunk" id="tn-note"><div class="tn-k">A Note for Today</div><p class="tn-sub">What you noticed, what felt strong, what you are growing toward.</p>
    <label class="hj-fld"><span>My note</span><textarea id="hj-note" rows="4" placeholder="Today I...">${esc(S.draft || '')}</textarea></label><div class="tn-acts"><button type="button" class="tn-btn sm" data-hja="note">${ic('check')}Save Note</button></div>
    ${N.length ? `<div class="tn-notes">${N.map(n => `<div class="hj-entry"><b>${nice(n.date)}</b><p>${esc(n.text).replace(/\n/g, '<br>')}</p></div>`).join('')}</div>` : ''}</div>`;
  return `<div class="tn-sec a-plate">${plate}${note}</div>`;
}
function voiceCard(){ return `<div class="tn-card" id="tn-voice"><div class="tn-hd">${badge('bell', 'a-move')}<div><div class="tn-k a-move">Voice and Music</div><div class="tn-sub">The calm voice, the music, and the beeps for workouts, quiet times, and the kitchen guide.</div></div></div>${toggles(null)}</div>`; }
function houseCard(){
  if (KIT()) return ''; const h = H(), s = h.set, pub = PUB(), kids = pub ? KIDS().length : 0, a = pub ? Math.max(1, +((s.house || {}).adults) || 1) : Math.max(1, +s.household || 1);
  return `<div class="tn-card" id="tn-hh"><div class="tn-hd">${badge('people', 'p-branches')}<div><div class="tn-k p-branches">Household</div><div class="tn-sub">Recipes and the shopping list fit your table.</div></div></div>
    <div class="tn-hhrow"><span>${pub ? 'Grown-ups' : 'People who eat at home'}</span><div class="hj-stock"><button type="button" class="chip" data-hja="hhadj" data-hjv="-1" aria-label="One fewer">&minus;</button><span><b>${a}</b></span><button type="button" class="chip" data-hja="hhadj" data-hjv="1" aria-label="One more">+</button></div></div>
    ${pub ? `<p class="tn-sub">${kids ? kids + (kids === 1 ? ' child' : ' children') + ' in Family Food, a table of ' + (a + kids) + '.' : 'A table of ' + a + '.'}</p><div class="tn-acts"><button type="button" class="tn-btn sm line" data-hja="setup" data-hjv="who">${ic('people')}Change My Household</button></div>` : ''}</div>`;
}
// ---------- every workout at every level, with art (BLD 881) ----------
// Chris, October 28, 2026: "make sure we use our custom images for all cards ... we need to stay on brand". Every card picture is one
// of Grounded's own paintings (shared/heroes/way, shared/cards); the animated stage stays inside the guided players only.
const WAY = n => asset(/\//.test(n) ? 'shared/' + n : 'shared/heroes/way/' + n + '.webp');
const ART_MOVE = ['tend-move', 'home-morning-narrow', 'tend-spirit', 'welcome-wide', 'tend-people', 'home-evening-narrow', 'tend-mind'];
const ART_QUIET = ['tend-mind', 'tend-spirit', 'cards/meditation.webp', 'home-morning-narrow', 'home-evening-narrow', 'welcome-wide', 'tend-people'];
// BLD 895 (Chris's Grok paintings, October 30, 2026): each card shows its own painting, square crops (-sq) for the small tiles.
const ITEM_ART = {quiet: 'quiet-morning-sq', meditation: 'quiet-meditation-sq', workout: 'move-strength-sq', practice: 'move-flow-sq', mark: 'progress-sq', cook: 'tend-body', meal: 'meal-lunch-sq',
  headstart: 'kitchen-headstart-sq', shop: 'shop-sq', prep: 'prep-together-sq', batch: 'weekly-batch-sq', supplements: 'supplements-sq', setup: 'tending-sq'};
// BLD 895: every workout by its kind: Strength by phase (Foundation, Build, Peak), Cardio, Walk, Gentle, and each Flow style.
const MOVE_ART = {foundation: 'move-strength-sq', build: 'move-build-sq', peak: 'move-peak-sq', cardio: 'move-cardio-sq', walk: 'move-walk-sq', gentle: 'move-gentle-sq',
  daily: 'move-flow-sq', yoga: 'move-yoga-sq', taichi: 'move-balance-sq', stretch: 'move-stretch-sq'};
// The meditation tiles Chris has made so far (m1 Monday to m7 Sunday, by position); install895.py rewrites this line. The rest keep ART_QUIET.
const MED_ART = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7'];
// Dinner nights by recipe type (fish, chili and soup, lentil and bean, stir fry and bowl); install895.py rewrites this line with the
// paintings present. A dinner with no night painting yet keeps the rotation (home.js FOOD_ROT, ITEM_ART.cook).
const DINNER_ART = ['fish', 'chili'];
const DIN_RE = [['fish', /salmon|\bcod\b|fish|shrimp|tuna|trout|sardine|halibut|tilapia/i], ['chili', /chili|soup|stew/i], ['curry', /lentil|bean|chickpea|curry|dal\b/i], ['stirfry', /stir fry|bowl|noodle/i]];
const dinnerArtName = dn => { const t = String((dn && (dn.name || dn.title)) || ''), m = DIN_RE.find(([, re]) => re.test(t)); return m && DINNER_ART.includes(m[0]) ? 'dinner-' + m[0] + '-sq' : ''; };
function moveKind(id, ses, lvl){
  id = String(id || ''); const t = String((ses && ses.title) || '');
  if ((lvl || (PUB() ? H().set.level || 'root' : '')) === 'gentle') return /walk/i.test(t) ? 'walk' : /balance/i.test(t) ? 'taichi' : 'gentle';
  if ((ses && (ses.track === 'cardio' || ses.kind === 'cardio')) || /^R\d+$/i.test(id)) return 'cardio';
  if (/walk/i.test(t)) return 'walk';
  if (!progOn()) return 'foundation';
  for (const ph of PH_IDS) if (trackIds('strength', ph).includes(id)) return ph;
  return STR_IDS.build.includes(id) ? 'build' : STR_IDS.peak.includes(id) ? 'peak' : 'foundation';
}
const moveArtName = (id, ses, lvl) => MOVE_ART[moveKind(id, ses, lvl)] || ITEM_ART.workout;
const moveArt = (id, ses, lvl) => { id = String(id || '').split(':').pop(); return WAY(moveArtName(id, ses || sesById(id), lvl)); };
const flowArtName = x => MOVE_ART[(x && x.style) || 'daily'] || ITEM_ART.practice;
const medArtName = j => j >= 0 && MED_ART.includes('m' + (j + 1)) ? 'med-m' + (j + 1) : ART_QUIET[Math.max(0, j) % ART_QUIET.length];
const medArtFor = d => { const m = MED(), x = m && medFor(d), j = x ? arr(m.sessions).indexOf(x) : -1; return MED_ART.includes('m' + (j + 1)) ? 'med-m' + (j + 1) : ITEM_ART.meditation; };
// set: a rotation (an array) or one painting's name (a string).
const artImg = (i, set) => { const L = set || ART_MOVE, n = typeof L === 'string' ? L : L[i % L.length]; return `<img src="${esc(WAY(n))}" alt="" loading="lazy" decoding="async" width="600" height="600">`; };
const artCard = (i, key, kick, title, sub, cls, set) => `<button type="button" class="tn-card tn-lift tn-kc tn-art ${cls}" data-hja="go" data-hjv="${esc(key)}"><span class="ill">${artImg(i, set)}</span><span class="tx"><span class="tn-time">${esc(kick)}</span><span class="h3">${esc(title)}</span>${sub ? `<span class="tn-meta">${esc(sub)}</span>` : ''}</span></button>`;
let LS = null;
function levelSets(){
  const L = PLIB(), P = TP(), w = WK();
  if (!PUB() || !L){ const ses = progOn() ? Object.fromEntries(phaseSes()) : w.sessions || {}; return Object.keys(ses).length ? [{id: 'mine', name: 'My Workouts', mine: true, sessions: ses, warmup: w.warmup, cooldown: w.cooldown}] : []; }
  const s = H().set, wk = Math.max(1, weekNo(new Date())), cur = s.level || 'root', ph = L.program ? phaseId(Math.max(1, progWeek(new Date()))) : '', sig = JSON.stringify([s.place, s.gear, s.mins, cur, wk, s.track, s.progStart, ph]);
  if (LS && LS.L === L && LS.sig === sig) return LS.list;
  const list = [];
  LVL.forEach(([id, name]) => {
    if (id === cur) list.unshift({id, name, mine: true, sessions: w.sessions || {}, warmup: w.warmup, cooldown: w.cooldown});
    else if (id === 'gentle') list.push(Object.assign({id, name}, gentleWo(L, wk)));
    else if (P && L.program && L.program.tracks){ const b0 = P.buildSessions([], L.templates, {level: id, mins: +s.mins || 20, warmup: L.warmup, cooldown: L.cooldown}); list.push({id, name, sessions: pubPhaseSes(ph, id), warmup: b0.warmup, cooldown: b0.cooldown}); }
    else if (P){ const b = P.buildSessions(L.moves, L.templates, {level: id, place: s.place || 'home', gear: gearOf(s), mins: +s.mins || 20, warmup: L.warmup, cooldown: L.cooldown}); list.push({id, name, sessions: b.sessions, warmup: b.warmup, cooldown: b.cooldown}); }
  });
  LS = {L, sig, list}; return list;
}
// BLD 896: a level's workout by id, from any phase (public Tending builds the phase it belongs to at that level).
function levelSes(lvl, id){
  const L = levelSets().find(x => x.id === lvl), ph = lvl === 'gentle' ? '' : sesPh(id);
  if (!ph || !PUB()){ const ses = L && (L.sessions || {})[id]; return ses ? {ses, w0: L, mine: !!L.mine} : null; }
  const ses = pubPhaseSes(ph, lvl)[id]; if (!ses) return null;
  if (L && L.mine) return {ses, w0: L, mine: true};
  return {ses, w0: L || WK(), mine: false};
}
function buildLevelWork(lvl, id){
  const X = levelSes(lvl, id); if (!X) return null; const ses = X.ses;
  if (X.mine) return buildWork(id);
  const t0 = new Date(), pk = phKeyFor(id, t0), steps = stepsFor(ses, pk.ph, pk.light, X.w0);
  let count = true; try { count = localStorage.getItem('gg-health-count') !== '0'; } catch(e){}
  return {k: 'work', s: id, key: 'wl:' + lvl + ':' + id, title: ses.title || 'Session ' + id, mins: ses.mins, steps, i: 0, set: 1, done: [], end: 0, left: 0, run: false, rest: false, stage: 'start', voice: AVA, count, hands: handsOn()};
}
function vWorkouts(){
  const h = H(), sets = levelSets().filter(L => L.mine); let i = 0;
  const lv = sets.map(L => { const ses = Object.entries(L.sessions || {}); if (!ses.length) return '';
    return `<h3 class="tn-h3">${progOn() ? 'This Week' : esc(L.name)}${progOn() ? ` <small class="tn-mine">${esc(phName(phaseId(Math.max(1, progWeek(new Date())))))}</small>` : ''}</h3><div class="tn-kgrid">${ses.map(([id, x]) => artCard(i++, L.mine ? 'work:' + id : 'wl:' + L.id + ':' + id, (progOn() && L.id !== 'gentle' && /^([A-L]|R\d+)$/.test(id) ? sesKick(id) + ' · ' : x.day ? x.day + ' · ' : '') + (x.mins ? x.mins + ' min' : 'Session ' + id), x.title || 'Session ' + id, L.mine && lightOn(new Date()) ? 'A lighter week: ease off a little.' : (x.lead || ''), 'a-move', moveArtName(id, x, L.mine ? '' : L.id))).join('')}</div>`; }).join('');
  const every = everyHtml((key, kick, title, sub, art) => artCard(i++, key, kick, title, sub, 'a-move', art));
  const recent = h.wlog.length ? `<div class="hj-blk">${kick('Recent Workouts')}${h.wlog.slice().reverse().slice(0, 6).map(w => `<div class="hj-entry"><b>${nice(w.date)}</b> · ${esc(w.title || 'Session ' + w.s)}${w.mins ? ` <small>${esc(w.mins)} min</small>` : ''}${w.note ? `<p>${esc(w.note)}</p>` : ''}</div>`).join('')}</div>` : '';
  return `<div class="tn-sec a-move">${PUB() ? pubMoveHead() : progCard()}${lv}${every}${recent}</div>`;
}
// BLD 896 (Chris, October 30, 2026): the Every Workout shelf. This Week (the phase the person is in) stays on top; then every workout
// by category: Strength, Cardio, Flow, Yoga, Balance, Stretch, and in public Tending Gentle; Strength and Cardio by phase (Foundation,
// Build, Peak), each tile with its place, like "Build 2 · 56 min". A workout from another phase plays with that phase's sets and reps.
// Public Tending shows the person's level first, with Root, Rise, and Thrive chips to look at the others.
const EW_CATS = {strength: 'Strength', cardio: 'Cardio', daily: 'Flow', yoga: 'Yoga', taichi: 'Balance', stretch: 'Stretch', gentle: 'Gentle'};
const EW_LVLS = [['root', 'Root'], ['rise', 'Rise'], ['thrive', 'Thrive']];
const curLvl = () => PUB() ? (H().set.level || 'root') : '';
function everyLvl(){ if (!PUB()) return ''; const v = S.ewLvl || curLvl(); return EW_LVLS.some(x => x[0] === v) ? v : 'root'; }
function everyGroups(lvl){
  const out = [], pr = arr((PR() || {}).sessions), cur = curLvl();
  if (PROG()) ['strength', 'cardio'].forEach(tr => { const g = PH_IDS.map(ph => { const ids = trackIds(tr, ph); if (!ids.length) return null;
      const src = PUB() ? pubPhaseSes(ph, lvl) : WK().sessions || {}, list = ids.map(id => [id, src[id]]).filter(x => x[1]); return list.length ? {name: phName(ph), list} : null; }).filter(Boolean);
    if (g.length) out.push({cat: tr, groups: g}); });
  else if (!PUB()){ const all = Object.entries(WK().sessions || {}); if (all.length) out.push({cat: 'strength', groups: [{name: '', list: all}]}); }
  FLOW_IDS.forEach(st => { const L = pr.filter(x => (x.style || 'daily') === st || (st === 'daily' && !FLOW_IDS.includes(x.style || 'daily'))); if (L.length) out.push({cat: st, groups: [{name: '', list: L.map(x => [x.id, x])}]}); });
  if (PUB() && PLIB()){ const g = cur === 'gentle' ? WK().sessions || {} : gentleWo(PLIB(), Math.max(1, weekNo(new Date()))).sessions || {}, list = Object.entries(g); if (list.length) out.push({cat: 'gentle', groups: [{name: '', list}]}); }
  return out;
}
function everyHtml(card){
  const lvl = everyLvl(), cur = curLvl(), G = everyGroups(lvl); if (!G.length) return '';
  const chips = PUB() && PROG() ? `<div class="hj-chips tn-ewl" role="group" aria-label="Level">${EW_LVLS.map(([v, l]) => `<button type="button" class="chip${lvl === v ? ' on' : ''}" aria-pressed="${lvl === v}" data-hja="ewlvl" data-hjv="${v}">${esc(l)}${v === cur ? ' <small>My Level</small>' : ''}</button>`).join('')}</div>` : '';
  const tiles = (c, g) => g.list.map(([id, x], j) => c === 'strength' || c === 'cardio' ? card(PUB() && lvl !== cur ? 'wl:' + lvl + ':' + id : 'work:' + id, (g.name ? g.name + ' ' + (j + 1) + ' · ' : '') + (x.mins ? x.mins + ' min' : 'Session ' + id), x.title || 'Session ' + id, x.lead || '', moveArtName(id, x, PUB() ? lvl : ''))
    : c === 'gentle' ? card(cur === 'gentle' ? 'work:' + id : 'wl:gentle:' + id, (x.day ? x.day + ' · ' : '') + (x.mins ? x.mins + ' min' : 'Gentle'), x.title || 'Session ' + id, x.lead || '', moveArtName(id, x, 'gentle'))
    : card('pracid:' + x.id, flowKick(x), x.title || 'Flow', x.focus || '', flowArtName(x))).join('');
  return `<h3 class="tn-h3" id="tn-every">Every Workout</h3><p class="tn-ews">Every workout we have built, by category.${PROG() ? ' A workout from another phase plays with that phase\'s sets and reps.' : ''}</p>${chips}` +
    G.map((c, k) => { const n = c.groups.reduce((a, g) => a + g.list.length, 0); return `<details class="tn-ew" data-ew="${esc(c.cat)}"${k === 0 || S.ewOpen === c.cat ? ' open' : ''}><summary><b>${esc(EW_CATS[c.cat] || c.cat)}</b><small>${n} ${n === 1 ? 'workout' : 'workouts'}</small></summary>${c.groups.map(g => `${g.name ? `<p class="tn-fst"><b>${esc(g.name)}</b></p>` : ''}<div class="tn-kgrid">${tiles(c.cat, g)}</div>`).join('')}</details>`; }).join('');
}
// The Library's count: every playable workout (public Tending: each level's Strength and Cardio, plus Gentle and the Flow family).
function everyCount(){
  const pr = arr((PR() || {}).sessions).length, tc = src => ['strength', 'cardio'].reduce((n, tr) => n + PH_IDS.reduce((m, ph) => m + trackIds(tr, ph).filter(src).length, 0), 0);
  if (!PUB()){ const all = WK().sessions || {}; return (PROG() ? tc(id => !!all[id]) : Object.keys(all).length) + pr; }
  const gn = arr(((PLIB() || {}).gentle || {}).sessions).length; return (PROG() ? EW_LVLS.length * tc(() => true) : levelSets().filter(L => L.id !== 'gentle').reduce((n, L) => n + Object.keys(L.sessions || {}).length, 0)) + gn + pr;
}
function vQuietShelf(){
  const t = TD(), h = H(), c = (h.days[today()] || {}).checks || {}, md = arr((MED() || {}).sessions), n = Math.max(1, weekNo(new Date())), qm = +h.set.quietMins || t.spirit.minutes[0]; let i = 0;
  return `<div class="tn-sec p-bark">${planCard({cls: 'p-roots', img: WAY(ITEM_ART.quiet), done: !!c.quiet, scene: 'dawn', hour: 6.3, time: 'Morning · ' + qm + ' min', title: t.spirit.h, sub: t.spirit.invite, btn: 'Quiet Timer', ba: 'quiet', bv: '', bi: 'clock', ck: tck('check', 'quiet', c.quiet, 'Done')})}
    ${md.length ? `<h3 class="tn-h3">Meditation</h3><div class="tn-kgrid">${md.map((x, j) => artCard(i++, 'medid:' + x.id, (x.day ? x.day + ' · ' : '') + medMins(n) + ' min', x.title, x.focus || '', 'p-bark', medArtName(j))).join('')}</div>` : ''}</div>`;
}
// ---------- the guides, built without opening ----------
function ovFor(key){
  const [k, a, b] = String(key || '').split(':');
  if (k === 'work') return buildWork(a);
  if (k === 'wl') return buildLevelWork(a, b);
  if (k === 'prac') return buildPractice();
  if (k === 'pracid') return buildPractice(a);
  if (k === 'med') return MED() ? buildMed() : null;
  if (k === 'medid') return MED() ? buildMed(a) : null;
  if (k === 'quiet') return quietOv();
  if (k === 'cook') return cookOv(a, b);
  if (k === 'menu') return mmOv(a);
  if (k === 'idea') return ideaOv(a, b);
  if (k === 'prep') return prepOv(a, +b);
  if (k === 'head') return headOv(a);
  return null;
}
function endInline(){ const o = S.ov; if (o && o.inline){ o.dead = true; o.skip = true; const V = VO(); if (V){ V.stop(); V.music(null); } S.ov = null; wake(false); } }
function openInline(b){
  const sec = String(b.section || ''), cook = /^cook:/.test(sec), key = sec.replace(/^(cook|move):/, '');
  const o = ovFor(cook ? (/^cook:/.test(key) ? key : 'cook:' + key) : (/^(work|wl|prac|pracid|med|medid|quiet)(:|$)/.test(key) ? key : 'work:' + key));
  b.closed = false; if (!o) return false; o.inline = true; S.ov = o; wake(true); tick(); return true;
}
// ---------- Today, one list in day order ----------
function dayOf(date){ if (date instanceof Date && !isNaN(date)) return new Date(date); const p = parseD(date); if (p){ const n = new Date(); p.setHours(n.getHours(), n.getMinutes()); return p; } return new Date(); }
function apiToday(date){
  const lib = FLDH(), h = H(); if (!lib || !h) return [];
  if (workOn()) fig3dWarm();
  const t = TD();
  if (setupNeeded()) return [{key: 'setup', when: 'Today', hour: 0, title: t.intro.start, sub: t.intro.line, btn: t.intro.start, tint: TINT.meals, done: false, kind: 'setup', image: WAY(ITEM_ART.setup)}];
  const d = dayOf(date), k = ymd(d), c = (h.days[k] || {}).checks || {}, out = [];
  const push = o => out.push(Object.assign({when: '', sub: '', btn: 'Open', done: false}, o));
  if (U('spirit')){ const qm = +h.set.quietMins || t.spirit.minutes[0]; push({key: 'quiet', when: 'Morning', hour: 6, title: t.spirit.h, sub: qm + ' minutes. ' + t.spirit.invite, btn: 'Begin', tint: TINT.quiet, done: !!c.quiet, kind: 'quiet'}); }
  agenda(d).forEach(x => { const p = partOf(x); if (!p || !U(p)) return; const base = {key: x.key, when: x.kick, hour: x.hour, title: x.title, sub: x.sub, btn: x.btn, done: isDone(d, x.key)};
    if (x.k === 'work' || x.k === 'prac') push(Object.assign(base, {tint: TINT.move, kind: x.k === 'work' ? 'workout' : 'practice'}));
    else if (x.k === 'med') push(Object.assign(base, {btn: 'Begin', tint: TINT.quiet, kind: 'meditation'}));
    else if (x.k === 'mark') push(Object.assign(base, {tint: TINT.move, kind: 'mark'}));
    else if (x.k === 'cook'){ const dn = dinnerFor(d); push(Object.assign(base, {when: 'Tonight', btn: dn && dn.leftover ? 'Open' : 'Cook It', tint: TINT.cook, kind: 'cook'})); }
    else if (x.k === 'shop') push(Object.assign(base, {tint: TINT.cook, kind: 'shop'}));
    else if (x.k === 'hol') push(Object.assign(base, {tint: TINT.cook, kind: 'holiday'}));
    else if (x.k === 'prep') push(Object.assign(base, {when: /^Monthly/.test(x.kick) ? 'Sunday' : x.kick, tint: TINT.cook, kind: 'prep'})); });
  if (U('food')){
    const L = arr(((APP() || {}).dinners || {}).lunches);
    if (L.length){ const i = ((d.getDay() + 6) % 7) % L.length, x = L[i], key = 'idea:lunches:' + i;
      push({key, when: 'Midday', hour: 12, title: x.name, sub: (x.mins ? x.mins + ' minutes' : 'Lunch') + (nOk(x.nut) ? ', ' + nSf(x.nut) : ''), btn: arr(x.steps).length ? 'Make It' : 'Done', tint: TINT.meals, done: isDone(d, key), kind: 'meal'}); }
    const dn = dinnerFor(addD(d, 1));
    if (dn && !dn.leftover){ const key = 'head:' + k, th = dn.thaw && dn.thaw.item;
      push({key, when: 'Tonight', hour: 20, title: 'Head Start for Tomorrow', sub: th ? 'Move ' + th + ' from the freezer to the fridge for ' + dn.name + '.' : 'Tomorrow is ' + dn.name + '. A quick look tonight makes dinner easy.', btn: 'Look Ahead', tint: TINT.cook, done: isDone(d, key), kind: 'headstart'}); }
  }
  if (U('supps')){ const sp = supps(); ['morning', 'evening'].forEach(w => { const L = sp.filter(s => (s.when === 'evening') === (w === 'evening')); if (!L.length) return;
    push({key: 'supp:' + w, when: w === 'morning' ? 'This morning' : 'This evening', hour: w === 'morning' ? 6.2 : 20.5, title: (w === 'morning' ? 'Morning' : 'Evening') + ' Supplements', sub: L.map(s => s.name).join(', ') + '.', btn: 'All Taken', tint: TINT.meals, done: L.every(s => c[suppId(s)]), kind: 'supplements'}); }); }
  out.forEach(x => { x.image = x.kind === 'workout' ? moveArt(x.key) : x.kind === 'practice' ? WAY(flowArtName(practiceFor(d))) : x.kind === 'meditation' ? WAY(medArtFor(d))
    : x.kind === 'prep' && /^prep:batch:/.test(x.key) ? WAY(ITEM_ART.batch) : x.kind === 'cook' && dinnerArtName(dinnerFor(d)) ? WAY(dinnerArtName(dinnerFor(d)))
    : WAY(ITEM_ART[x.kind] || 'tend-body'); });
  ownToday(d).forEach(x => out.push(x));   // BLD 896: My Own Items
  return out.map((x, i) => [x, i]).sort((a, b) => (a[0].hour - b[0].hour) || (a[1] - b[1])).map(x => x[0]);
}
function apiToggle(key){
  const h = H(); key = String(key || ''); if (!h || !key || key === 'setup') return null;
  const t = today(), day = () => { const d = h.days[t] = h.days[t] || {checks: {}}; d.checks = d.checks || {}; return d; };
  let on;
  if (key === 'quiet'){ const d = day(); on = d.checks.quiet = !d.checks.quiet; d.u = Date.now(); save(); }
  else if (/^supp:/.test(key)){ const d = day(), w = key.slice(5), L = supps().filter(s => (s.when === 'evening') === (w === 'evening')); on = !L.every(s => d.checks[suppId(s)]); L.forEach(s => { d.checks[suppId(s)] = on; }); d.u = Date.now(); save(); }
  else { const l = logOf(new Date()); if (l[key]) delete l[key]; else l[key] = Date.now(); on = !!l[key]; l.u = Date.now();
    if (on && /^(work|wl):/.test(key)) checkOn('move'); if (on && (key === 'prac' || key === 'med' || /^(pracid|medid):/.test(key))) checkOn('still'); save(); }
  rerender(true); return {done: !!on};
}
const ITEM_RE = /^(menu|own|ownedit|setup|quiet|med|prac|work|wl|pracid|medid|cook|prep|prepsec|shop|idea|head|supp|out|y|rem|hol|holset|holrec)(:|$)/;
function apiAct(key){
  key = String(key || ''); const [k, a, b] = key.split(':'); if (!H() || !FLDH()) return null;
  if (key === 'setup'){ S.setup = true; S.ck = null; S.set = null; if (PUB()) ckDraft(); if (bareOn()){ toSetup(); return {section: 'setup'}; } return want('setup'); }
  if (k === 'shop'){ S.shopWk = +a || null; S.shopEd = null; return want('shop'); }
  if (k === 'prepsec'){ S.prepWk = +a || null; return want('prep'); }
  // BLD 896: 'own' opens My Own Items, 'own:<id>' checks one off today, 'ownedit:<id>' opens it to edit.
  if (k === 'own'){ if (a) return apiToggle(key); S.ownF = null; S.ownEd = null; return want('own'); }
  if (k === 'ownedit'){ const x = OWN().items.find(i => i.id === a); S.ownF = x ? JSON.parse(JSON.stringify(x)) : null; S.ownEd = x ? x.id : null; return want('own'); }
  if (k === 'supp' || k === 'out' || k === 'y' || k === 'rem') return apiToggle(key);
  if (k === 'idea' && !ideaOv(a, b)) return apiToggle(key);
  if (/^hol(set|rec)?$/.test(k)){ const r = holAct(key); if (r) return r; }
  const o = ovFor(key); if (o){ openOv(o); return {overlay: o.k, key: o.key}; }
  return apiToggle(key);
}
function apiWeek(n){
  const h = H(); if (!FLDH() || !h || setupNeeded()) return null;
  const off = Math.round(+n || 0), t0 = day0(new Date()), mon = addD(monOf(t0), off * 7), N = weekNo(mon), track = h.set.track || 'strength';
  const fw = off === 0 ? foodWeek(t0) : Math.max(1, N);
  const days = [0, 1, 2, 3, 4, 5, 6].map(i => { const d = addD(mon, i), dn = U('food') ? dinnerFor(d) : null, wn = weekNo(d);
    const ses = U('move') && workOn() && wn >= 1 ? sesFor(d) : null, pr = U('move') && flowDaily() && !ses && !flowRest(d, false) ? practiceFor(d) : null, mf = U('mind') && MED() && H().set.medFreq && medOn(d) ? medFor(d) : null;
    const dk = dn ? 'cook:' + dn.wk + ':' + dn.id : null, mk = ses ? 'work:' + ses.id : pr ? 'pracid:' + pr.id : null;
    return {day: DOW[d.getDay()], dayName: DOWL[d.getDay()], date: ymd(d), today: ymd(d) === ymd(t0), hol: holWeekDay(d), own: ownDay(d, 'week'),
      dinner: dn ? {title: dn.name, key: dk, mins: dn.mins || null, leftover: !!dn.leftover, done: isDone(d, dk), image: WAY(dinnerArtName(dn) || ITEM_ART.cook), night: dinnerArtName(dn) ? WAY(dinnerArtName(dn)) : null} : null,
      move: ses ? {title: sesLabel(ses.id, ses), key: mk, mins: ses.mins || null, done: isDone(d, mk), image: moveArt(ses.id, ses), kind: wkKind(ses.id, ses), id: ses.id} : pr ? {title: pr.title || 'Flow', key: mk, mins: pr.mins || null, done: isDone(d, 'prac'), image: WAY(flowArtName(pr)), kind: 'flow', id: pr.id, style: pr.style || ''} : null,
      // BLD 893: the meditation on its days, once a person has chosen how often (My Grounded Way Plan).
      med: mf ? {title: mf.title || 'Meditation', key: 'medid:' + mf.id, mins: medMins(wn), done: isDone(d, 'med'), kind: 'meditation', image: WAY(medArtFor(d)), id: mf.id, at: medAt().kick || 'Morning'} : null}; });
  const sp = prepFor('sunday', fw), bt = prepFor('batch', fw);
  // BLD 894: the Week tab's Shopping List card reads the real list ("Week B · 42 items").
  const SL = U('food') ? shopList(fw) : null, sItems = SL ? arr(SL.items) : [];
  return {hol: holCards(), ownWeek: ownWeekList(mon), shopWeek: letter(fw), shopCount: sItems.length, shopLeft: sItems.filter(x => !x.done).length, n: Math.max(1, N), label: 'Week ' + Math.max(1, N), prog: U('move') && workOn() ? progLabel(mon) : '', start: ymd(mon), end: ymd(addD(mon, 6)), starts: N < 1 ? ymd(startMon()) : null,
    food: U('food') ? 'Food Week ' + letter(fw) : null, shopKey: U('food') && shopList(fw) ? 'shop:' + fw : null, shopLabel: 'Shop for Week ' + letter(fw),
    shopImage: WAY('shop-wide'), prepImage: sp ? WAY('prep-together') : null, bulkImage: bt ? WAY(ITEM_ART.batch) : null,
    prepKey: U('food') && sp ? 'prep:sunday:' + fw : null, prepLabel: sp ? 'Sunday Together Prep' : null, prepSub: sp ? 'About ' + (sp.mins || 90) + ' minutes, step by step with timers.' : null,
    bulkKey: U('food') && bt ? 'prep:batch:' + fw : null, bulkLabel: bt ? bt.title || 'Weekly Batch' : null, bulkSub: bt ? batchSub(bt) : null, days};
}
function apiRender(el, section, opts){
  if (!el || !FLDH() || !H()) return false;
  opts = Object.assign({bare: true}, opts || {}); const sec = String(section || 'settings'), base = sec.split(':')[0], arg = sec.slice(base.length + 1);
  endInline();
  S.bare = {el, section: sec, opts, closed: false}; S.form = null; S.edit = null; S.shopEd = null; S.whyEd = false; S.sureReset = false;
  if (base === 'shop') S.shopWk = +arg || +opts.week || S.shopWk || null;
  if (base === 'prep') S.prepWk = +arg || +opts.week || S.prepWk || null;
  if (base === 'setup'){ S.setup = true; S.ck = null; S.set = null; if (PUB()) ckDraft(); } else S.setup = false;
  if (base === 'cook' || base === 'move') openInline(S.bare);
  S.ovHome = 'host'; paintBare(); paintOv(); return true;
}
// ---------- BLD 893: My Grounded Way Plan (home/home.js) ----------
// The plan is a guided way to set Tending's own settings: no copy of them is kept anywhere else.
// o: {moves: [strength, cardio, flow, yoga, balance, stretch] (BLD 894; sets track and flowStyles), track: 'strength'|'cardio'|'mixed', gentle: bool, level, cardioDays, days, mins, gear: [ids], flowStyles: [daily, yoga, taichi, stretch] (BLD 894; or flow: bool),
//     medFreq, medTime, food: bool, household: n, check: {qid: bool}, cleared: bool}
// A first plan (no start-up check yet) also finishes the start-up check with plain defaults: Me (or Me and My Family when
// more than one eats at home), the goal Feel Well, no food needs. Any yes on the health check keeps the Gentle path until
// the person says their doctor or therapist says they can begin, exactly as the start-up check does.
function apiPlanInfo(){
  const h = H(), L = PLIB() || {}; if (!h || !FLDH()) return null; const s = h.set;
  return {pub: PUB(), done: PUB() ? !!s.pubDone : !setupNeeded(), set: JSON.parse(JSON.stringify(s)), use: USE(), check: L.check || null, gear: arr(L.program && L.program.gear), gearNone: (L.program || {}).gearNone || '',
    cardio: !!PROG() && hasCardio(), levelLines: (L.templates || {}).levelLines || {}, gentle: {lead: (L.gentle || {}).lead || '', mins: arr((L.gentle || {}).sessions).map(x => +x.mins).filter(Boolean)},
    meds: arr((MED() || {}).sessions).map(x => ({id: x.id, title: x.title || '', day: x.day || ''})), flows: arr((PR() || {}).sessions).filter(x => !x.style || x.style === 'daily').map(x => ({id: x.id, title: x.title || '', style: x.style || 'daily', mins: x.mins || null})),
    flowAll: arr((PR() || {}).sessions).map(x => ({id: x.id, title: x.title || '', style: x.style || 'daily', mins: x.mins || null})), flowStyles: flowStyleList(), flowOn: flowOnOf(s), moves: movesOf(s), moveNames: MOVE_NAME,
    medMins: [medMins(1), medMins(99)], prog: progLabel(new Date()), track: progTrack(), teen: TEEN()};
}
function apiPlan(o){
  const h = H(); if (!h || !FLDH() || !o) return false; o = o || {};
  const s = h.set, L = PLIB() || {}, was = PUB() ? !!s.pubDone : true, tr0 = progTrack(), gentle0 = s.level === 'gentle', w0 = workOn();
  const tr = ['strength', 'cardio', 'mixed'].includes(o.track) ? o.track : 'strength';
  if (PUB()){
    if (o.check && typeof o.check === 'object'){ s.check = Object.assign({}, s.check || {}, o.check); s.checkYes = arr((L.check || {}).questions).some(q => s.check[q.id] === true); }
    if (o.cleared != null) s.cleared = !!o.cleared;
    const hold = !!s.checkYes && !s.cleared;
    s.level = hold || o.gentle ? 'gentle' : ['root', 'rise', 'thrive'].includes(o.level) ? o.level : (s.level && s.level !== 'gentle' ? s.level : 'root');
    if ([2, 3, 4, 5, 6].includes(+o.days)) s.days = +o.days;
    if ([20, 40, 60].includes(+o.mins)) s.mins = +o.mins;
    if (Array.isArray(o.gear) && L.program) s.gear = o.gear.filter(g => typeof g === 'string').slice(0, 20);
    if (+o.household > 0){ const hs = s.house = Object.assign({adults: 1, kids: []}, s.house || {}), k = arr(hs.kids).length; hs.adults = Math.max(1, Math.min(12, Math.round(+o.household) - k)); s.household = hs.adults + k; if (!was) s.who = s.household > 1 ? 'family' : 'me'; }
  } else if (+o.household > 0) s.household = Math.max(1, Math.min(12, Math.round(+o.household)));
  if (Array.isArray(o.moves) && o.moves.length) setMoves(s, o.moves); else if (s.track !== 'practice' || o.track) s.track = tr;
  s.cardioDays = +o.cardioDays === 2 ? 2 : 1;
  if (Array.isArray(o.moves) && o.moves.length){ /* set.moves set the Flow-type categories */ }
  else if (Array.isArray(o.flowStyles)){ s.flowStyles = FLOW_IDS.filter(x => o.flowStyles.includes(x)); s.flow = s.flowStyles.length > 0; if (s.flow) s.flowDays = 'other'; else delete s.flowDays; }
  else if (o.flow != null){ s.flow = !!o.flow; if (s.flow) s.flowDays = 'other'; else delete s.flowDays; }
  if (['daily', 'few', 'weekly', 'later'].includes(o.medFreq)) s.medFreq = o.medFreq;
  if (['morning', 'afternoon', 'evening'].includes(o.medTime)) s.medTime = o.medTime;
  if (PUB()){
    const use = new Set(USE()); use.add('move'); if (s.medFreq !== 'later') use.add('mind'); if (o.food === true) use.add('food'); else if (o.food === false) use.delete('food');
    if (!was) ['people', 'labs'].forEach(x => use.add(x));
    s.use = PART_IDS.filter(x => use.has(x));
    if (!was){ s.goals = arr(s.goals).length ? s.goals : ['well']; s.needs = arr(s.needs); s.house = s.house || {adults: 1, kids: []}; s.household = s.household || (s.house.adults + arr(s.house.kids).length); s.who = s.who || (s.household > 1 ? 'family' : 'me');
      s.place = s.place || 'home'; s.pubDone = 1; s.start = s.start || ymd(monOf(new Date())); s.remOff = true; markNew(); }
    else if (L.program && s.track !== 'practice' && (progTrack() !== tr0 || !w0 || (gentle0 && s.level !== 'gentle'))) s.progStart = ymd(monOf(new Date()));
  } else {
    const use = h.set.use; if (Array.isArray(use)){ const u = new Set(use); u.add('move'); if (s.medFreq !== 'later') u.add('mind'); if (o.food === true) u.add('food'); else if (o.food === false) u.delete('food'); s.use = PART_IDS.filter(x => u.has(x)); }
    if ((progTrack() !== tr0 || !w0) && PROG() && s.track !== 'practice') s.progStart = ymd(monOf(new Date()));
  }
  delete s.needSetup; s.u = Date.now(); PA = null; if (PUB()) ensurePlan(); save(); return true;
}
function apiCounts(){
  if (!FLDH() || !H()) return {recipes: 0, workouts: 0, meditations: 0, practices: 0};
  return {recipes: recipesAll().length, workouts: everyCount(), meditations: arr((MED() || {}).sessions).length, practices: arr((PR() || {}).sessions).length};
}
// BLD 892, one card, two credits (shared/gg-fills.js): what a Today item plays, and every guided session the Home can offer
// as Play a Guided One. Each is {key (for act), done (the log key its finish writes), kind, id, title, style, mins}.
// A workout is cardio when its session says track 'cardio' (or its id is R1 to R12), otherwise strength.
const wkKind = (id, ses) => (ses && (ses.track === 'cardio' || ses.kind === 'cardio')) || /^R\d+$/i.test(String(id || '')) ? 'cardio' : 'strength';
const fillMed = (x, key) => x ? {key, done: 'med', kind: 'meditation', id: x.id, title: x.title || '', style: '', mins: x.mins || null} : null;
const fillPrac = (x, key) => x ? {key, done: 'prac', kind: 'flow', id: x.id, title: x.title || '', style: x.style || '', mins: x.mins || null} : null;
function apiFill(key, date){
  if (!FLDH() || !H()) return null; const [k, a, b] = String(key || '').split(':'), d = dayOf(date);
  if (k === 'med') return fillMed(medFor(d), 'med');
  if (k === 'medid') return fillMed(arr((MED() || {}).sessions).find(x => x.id === a), key);
  if (k === 'prac') return fillPrac(practiceFor(d), 'prac');
  if (k === 'pracid') return fillPrac(arr((PR() || {}).sessions).find(x => x.id === a), key);
  if (k === 'work'){ const ses = sesById(a); return ses ? {key, done: key, kind: wkKind(a, ses), id: a, title: ses.title || 'Session ' + a, style: '', mins: ses.mins || null} : null; }
  if (k === 'wl'){ const ses = (levelSes(a, b) || {}).ses; return ses ? {key, done: key, kind: wkKind(b, ses), id: b, title: ses.title || 'Session ' + b, style: '', mins: ses.mins || null} : null; }
  return null;
}
function apiGuided(){
  if (!FLDH() || !H()) return [];
  const out = arr((MED() || {}).sessions).map(x => fillMed(x, 'medid:' + x.id)).concat(arr((PR() || {}).sessions).map(x => fillPrac(x, 'pracid:' + x.id)));
  Object.keys(WK().sessions || {}).forEach(id => { const f = apiFill('work:' + id); if (f) out.push(f); });
  return out.filter(Boolean);
}

// ---------- events ----------
document.addEventListener('click', e => {
  const t = e.target.closest && e.target.closest('[data-hja]'); if (!t || !D() || !t.closest(ROOTS)) return;
  e.preventDefault(); S.pop = t.classList.contains('tn-ck') ? t.dataset.hja + '|' + (t.dataset.hjv || '') : null; act(t.dataset.hja, t.dataset.hjv || ''); S.pop = null;
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && S.ov && document.querySelector(ROOTS)) act('ovclose'); if (e.key === 'Enter' && e.target && e.target.id === 'hj-addname') act('shopadd'); if (e.key === 'Enter' && e.target && e.target.id === 'hj-spname') act('spadd'); });
document.addEventListener('input', e => {
  const t = e.target; if (!t.closest || !t.closest(ROOTS)) return;
  if (t.dataset.hjf && S.form) S.form[t.dataset.hjf] = t.value;
  if (t.dataset.hjpv && S.pv){ S.pv[t.dataset.hjpv] = t.value; const o = document.getElementById('hj-pv-out'); if (o) o.innerHTML = pvOut(pvResult(S.pv)); const b = document.querySelector('[data-hja="pvsave"]'); if (b) b.disabled = pvResult(S.pv).r10 == null; }
  if (t.dataset.hjs && S.set) S.set[t.dataset.hjs] = t.value;
  if (t.id === 'hj-note') S.draft = t.value;
  if (t.id === 'hj-eatq'){ S.eatQuery = t.value; S.eatPick = null; eatRes(); }
  if (t.id === 'hj-qaq'){ S.qaQuery = t.value; qaRes(); }
  if (t.id === 'hj-rq'){ S.rq = t.value; rRes(); }
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
/* BLD 871: My Heart Risk. Status steps from the validated dataviz palette; every band also carries its name. */
:is(#hj-root,#hj-bare,#hj-ov0){--rk-good:#0ca30c;--rk-warn:#fab219;--rk-ser:#ec835a;--rk-crit:#d03b3b;--rk-ev:#B5452F;--rk-empty:#E3D7C2;}
:root[data-theme="dark"] :is(#hj-root,#hj-bare,#hj-ov0){--rk-ev:#E0705A;--rk-empty:#3D342B;}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) :is(#hj-root,#hj-bare,#hj-ov0){--rk-ev:#E0705A;--rk-empty:#3D342B;}}
.hj-rk-tiles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:10px 0;}
.hj-rk-tiles>div{border:1px solid var(--line);border-radius:14px;padding:12px 14px;min-width:0;}
.hj-rk-tiles b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-size:38px;line-height:1;}
.hj-rk-tiles small{display:block;color:var(--ink-soft);margin-top:4px;}
.hj-rk-tiles em{display:inline-flex;align-items:center;gap:6px;font-style:normal;font-weight:700;font-size:12px;letter-spacing:.6px;text-transform:uppercase;margin-top:8px;color:var(--ink);}
.hj-rk-tiles em i{width:9px;height:9px;border-radius:50%;display:inline-block;}
.hj-rk-tiles.ex>div{border-style:dashed;}
.hj-rk-arr{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin:6px 0 4px;}
.hj-rk-arr>div{min-width:0}.hj-rk-arr small{color:var(--ink-soft);font-size:13px;}
.hj-rk-dots{display:grid;grid-template-columns:repeat(10,1fr);gap:4px;max-width:220px;margin:6px 0;}
.hj-rk-dots i{aspect-ratio:1;border-radius:50%;background:var(--rk-empty);}
.hj-rk-dots i.on{background:var(--rk-ev);}
.hj-rk-dots i.pt{background:linear-gradient(90deg,var(--rk-ev) var(--pp),var(--rk-empty) var(--pp));}
.hj-rk-scale{position:relative;margin:34px 0 6px;}
.hj-rk-mk{position:absolute;top:-30px;transform:translateX(-50%);font-weight:700;font-size:13px;white-space:nowrap;}
.hj-rk-mk::after{content:'';display:block;width:2px;height:28px;background:var(--ink);margin:2px auto 0;border-radius:1px;}
.hj-rk-bands{display:flex;gap:2px;height:18px;border-radius:5px;overflow:hidden;}
.hj-rk-ticks{position:relative;height:16px;margin-top:5px;color:var(--ink-soft);font-size:12px;}
.hj-rk-ticks span{position:absolute;transform:translateX(-50%);}.hj-rk-ticks span:first-child{transform:none}.hj-rk-ticks span:last-child{transform:translateX(-100%)}
.hj-rk-key{display:flex;flex-wrap:wrap;gap:12px;margin-top:8px;font-size:12px;color:var(--ink-soft);}
.hj-rk-key i{display:inline-block;width:9px;height:9px;border-radius:3px;margin-right:5px;}
@media (max-width:520px){.hj-rk-tiles,.hj-rk-arr{grid-template-columns:1fr;}}

:is(#hj-root,#hj-bare,#hj-ov0){min-width:0;--hj:#5F7D48;--hjcalm:#6C7FA6;--lpc:#4A8A2C;--lpm:#3D6FCC;}
:root[data-theme="dark"] :is(#hj-root,#hj-bare,#hj-ov0){--hj:#8FB073;--hjcalm:#9DB0D6;--lpc:#5E9E3A;--lpm:#5B8BE0;}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) :is(#hj-root,#hj-bare,#hj-ov0){--hj:#8FB073;--hjcalm:#9DB0D6;--lpc:#5E9E3A;--lpm:#5B8BE0;}}
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
:is(#hj-root,#hj-bare,#hj-ov0) textarea{width:100%;min-width:0;}
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
.hj-mods{text-align:left;max-width:46ch;margin:4px auto 10px;font-size:14px;color:var(--ink-soft);}.hj-mods p{margin:3px 0;overflow-wrap:anywhere;}.hj-st .hj-mods{color:var(--stfg,var(--ink-soft));}.hj-hfnote{text-align:left;}
.hj-hsteps{text-align:left;color:var(--ink-soft);margin:4px auto 10px;padding-left:22px;max-width:46ch;line-height:1.45;}.hj-st .hj-hsteps{color:var(--stfg,var(--ink-soft));}.hj-hsteps li{margin:4px 0;overflow-wrap:anywhere;}
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
.hj-serves{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin:0 0 10px;}.hj-serves span{flex:1 1 auto;min-width:0;}.hj-serves .chip{min-height:38px;min-width:40px;}
.hj-stock{display:flex;align-items:center;gap:6px;}.hj-stock span{text-align:center;min-width:52px;}.hj-stock small{display:block;font-size:12px;color:var(--ink-soft);}.hj-stock .chip{min-height:38px;min-width:40px;}
.hj-entry{border-top:1px solid var(--line);padding:10px 0;}.hj-entry:first-of-type{border-top:0;}.hj-entry p{margin:4px 0 0;}
/* BLD 857: color and the stage. Each player wears its state color (--st); the stage panel holds the scene from GGStage. */
.hj-ov.hj-st{background:var(--bg);background:var(--stbg,color-mix(in srgb,var(--st) 10%,var(--bg)));color:var(--stfg,var(--ink));}
.hj-st .hj-clock{color:var(--stfg,var(--ink));}.hj-st .hj-how{color:var(--stfg,var(--ink-soft));opacity:.85;}
.hj-st .hj-prog span{background:var(--st);}.hj-st .hj-reps{color:var(--st);}.hj-st .hj-stk{color:var(--st);}
.hj-st .hj-ovtop .hj-kick{color:var(--st);}
.hj-stagebox{position:relative;margin:10px 0 0;}
.hj-stagebox.g3-wait .ggs{--H:clamp(300px,92vw,440px);}
.hj-stagebox.g3-wait:not(.g3-on) .ggs-fig{opacity:0;}
.hj-stagebox.g3-wait:not(.g3-on)::after{content:"";position:absolute;left:50%;bottom:9%;width:min(46%,260px);height:16%;transform:translateX(-50%);border-radius:50%;pointer-events:none;z-index:2;background:radial-gradient(closest-side,rgba(255,232,180,.55),rgba(255,232,180,.18) 60%,rgba(255,232,180,0));animation:hjg3w 4.4s ease-in-out infinite;}
.hj-hasart .hj-stagebox.g3-wait:not(.g3-on):not(.g3-pre) :is(.ggs-sky,.ggs-deck,.ggs-tint,.ggs-scrim){visibility:hidden;}
.hj-hasart .hj-stagebox.g3-wait:not(.g3-on):not(.g3-pre) .ggs{background:color-mix(in srgb,var(--bg) 18%,transparent);-webkit-backdrop-filter:blur(1px) saturate(1.05);backdrop-filter:blur(1px) saturate(1.05);}
.hj-hasart .hj-stagebox.g3-wait:not(.g3-on) .ggs::after{box-shadow:none;}
@keyframes hjg3w{0%,100%{opacity:.45;transform:translateX(-50%) scale(.92);}50%{opacity:.9;transform:translateX(-50%) scale(1.04);}}
@media (prefers-reduced-motion: reduce){.hj-stagebox.g3-wait:not(.g3-on)::after{animation:none;opacity:.7;}}.hj-stagebox.sm .ggs{--H:clamp(120px,32vw,170px);}
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
:is(#hj-root,#hj-bare,#hj-ov0){--mok:#4A8A2C;--mclose:#C2740C;--mpast:#8E5BA6;--mbuild:var(--ink-soft);}
:root[data-theme="dark"] :is(#hj-root,#hj-bare,#hj-ov0){--mok:#5E9E3A;--mclose:#C47A1C;--mpast:#A77BC2;}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) :is(#hj-root,#hj-bare,#hj-ov0){--mok:#5E9E3A;--mclose:#C47A1C;--mpast:#A77BC2;}}
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
.hj-ex{margin:0 0 8px;}.hj-exr{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:7px 0;border-top:1px solid var(--line);min-width:0;}.hj-exr:first-child{border-top:0;}.hj-exr>span{min-width:0;}.hj-exr .linkbtn{flex:0 0 auto;white-space:nowrap;}.hj-exr b{display:block;font-weight:600;font-size:15px;overflow-wrap:anywhere;}.hj-exr small{display:block;color:var(--ink-soft);font-size:13px;}
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
/* BLD 862: Tending. One accent per section and per tree part (a strong --c and a soft --cs, tuned for light and dark), cards,
   rings, checks, the hero sky, and section navigation (a bottom bar on phones, pills at 1000 and up). Motion turns off under
   prefers-reduced-motion. */
:is(#hj-root,#hj-bare,#hj-ov0).tn{--t-today:#B87A1C;--t-today-s:#F6E7CC;--t-week:#3F6F94;--t-week-s:#DDE8F0;--t-plate:#4E7D4A;--t-plate-s:#E0ECD8;--t-kitchen:#A9562A;--t-kitchen-s:#F4E0D2;
  --t-move:#B83C0A;--t-move-s:#F8DFD2;--t-numbers:#6E5A8A;--t-numbers-s:#E9E3F0;--t-roots:#7A4E2D;--t-roots-s:#EFE2D6;--t-trunk:#8B5E1A;--t-trunk-s:#F3E6CC;--t-bark:#7A3FA8;--t-bark-s:#EEE3F6;
  --t-branches:#3F6F94;--t-branches-s:#DDE8F0;--t-leaves:#4E7D4A;--t-leaves-s:#E0ECD8;--t-fruit:#B5452F;--t-fruit-s:#F6DED6;--t-on:#FFFFFF;--t-card2:#FBF5EA;
  --t-shadow:0 1px 2px rgba(60,40,20,.06),0 8px 24px rgba(60,40,20,.08);--t-shadow-up:0 2px 4px rgba(60,40,20,.08),0 18px 40px rgba(60,40,20,.14);--c:var(--t-today);--cs:var(--t-today-s);}
:root[data-theme="dark"] :is(#hj-root,#hj-bare,#hj-ov0).tn{--t-today:#EDB85E;--t-today-s:#43341B;--t-week:#94BAD8;--t-week-s:#223446;--t-plate:#9CCB8A;--t-plate-s:#26381F;--t-kitchen:#F0A57C;--t-kitchen-s:#47291B;
  --t-move:#FF9A5C;--t-move-s:#4A2516;--t-numbers:#BCA9DB;--t-numbers-s:#342B42;--t-roots:#D9A982;--t-roots-s:#3E2D20;--t-trunk:#E3B25A;--t-trunk-s:#43341B;--t-bark:#CBA6F2;--t-bark-s:#372747;
  --t-branches:#94BAD8;--t-branches-s:#223446;--t-leaves:#9CCB8A;--t-leaves-s:#26381F;--t-fruit:#F0957C;--t-fruit-s:#47241C;--t-on:#1A1612;--t-card2:#2B2119;
  --t-shadow:0 1px 2px rgba(0,0,0,.3),0 10px 28px rgba(0,0,0,.28);--t-shadow-up:0 2px 6px rgba(0,0,0,.35),0 20px 44px rgba(0,0,0,.4);}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) :is(#hj-root,#hj-bare,#hj-ov0).tn{--t-today:#EDB85E;--t-today-s:#43341B;--t-week:#94BAD8;--t-week-s:#223446;--t-plate:#9CCB8A;--t-plate-s:#26381F;--t-kitchen:#F0A57C;--t-kitchen-s:#47291B;
  --t-move:#FF9A5C;--t-move-s:#4A2516;--t-numbers:#BCA9DB;--t-numbers-s:#342B42;--t-roots:#D9A982;--t-roots-s:#3E2D20;--t-trunk:#E3B25A;--t-trunk-s:#43341B;--t-bark:#CBA6F2;--t-bark-s:#372747;
  --t-branches:#94BAD8;--t-branches-s:#223446;--t-leaves:#9CCB8A;--t-leaves-s:#26381F;--t-fruit:#F0957C;--t-fruit-s:#47241C;--t-on:#1A1612;--t-card2:#2B2119;
  --t-shadow:0 1px 2px rgba(0,0,0,.3),0 10px 28px rgba(0,0,0,.28);--t-shadow-up:0 2px 6px rgba(0,0,0,.35),0 20px 44px rgba(0,0,0,.4);}}
.tn .a-today{--c:var(--t-today);--cs:var(--t-today-s);}.tn .a-week{--c:var(--t-week);--cs:var(--t-week-s);}.tn .a-plate{--c:var(--t-plate);--cs:var(--t-plate-s);}.tn .a-kitchen{--c:var(--t-kitchen);--cs:var(--t-kitchen-s);}
.tn .a-move{--c:var(--t-move);--cs:var(--t-move-s);}.tn .a-numbers{--c:var(--t-numbers);--cs:var(--t-numbers-s);}.tn .p-roots{--c:var(--t-roots);--cs:var(--t-roots-s);}.tn .p-trunk{--c:var(--t-trunk);--cs:var(--t-trunk-s);}
.tn .p-bark{--c:var(--t-bark);--cs:var(--t-bark-s);}.tn .p-branches{--c:var(--t-branches);--cs:var(--t-branches-s);}.tn .p-leaves{--c:var(--t-leaves);--cs:var(--t-leaves-s);}.tn .p-fruit{--c:var(--t-fruit);--cs:var(--t-fruit-s);}
.tn{padding-bottom:4px;}
.tn .tn-i{width:1em;height:1em;flex:none;stroke:currentColor;fill:none;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;}
.tn .tn-k{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:1.4px;text-transform:uppercase;color:var(--c);display:flex;align-items:center;gap:6px;}
.tn .tn-sub{color:var(--ink-soft);font-size:15.5px;line-height:1.4;margin:0;}
.tn .hj-kick{color:var(--c,var(--gold));}
.tn h2,.tn h3{font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;line-height:1.1;margin:0;}
/* bar and nav */
.tn-bar{display:flex;align-items:center;gap:12px;margin:0 0 14px;min-width:0;}
.tn-brand{display:flex;align-items:center;gap:10px;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;font-size:16px;flex:none;}
.tn-brand b{display:grid;place-items:center;width:34px;height:34px;border-radius:11px;background:var(--t-leaves);color:var(--t-on);font-size:19px;}
.tn-bar .sp{flex:1;}
.tn-iconbtn{display:grid;place-items:center;width:44px;height:44px;border-radius:13px;border:1px solid var(--line);background:var(--card);color:var(--ink);font-size:20px;cursor:pointer;flex:none;}
.tn-iconbtn.on{background:var(--t-today-s);color:var(--t-today);}
.tn-top{display:none;}
.tn-bnav{position:fixed;left:0;right:0;bottom:0;z-index:60;padding:6px 8px calc(6px + env(safe-area-inset-bottom,0px));background:color-mix(in srgb,var(--card) 94%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-top:1px solid var(--line);box-shadow:0 -8px 24px rgba(0,0,0,.06);}
.tn-bnav ul{list-style:none;margin:0 auto;padding:0;display:grid;max-width:560px;}
.tn-bnav button{display:flex;flex-direction:column;align-items:center;gap:3px;width:100%;padding:4px 0;background:none;border:0;cursor:pointer;color:var(--ink-soft);font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12.5px;letter-spacing:.5px;text-transform:uppercase;min-height:52px;}
.tn-bnav .ic{display:grid;place-items:center;width:46px;height:30px;border-radius:999px;font-size:21px;transition:background .25s ease,color .25s ease;}
.tn-bnav button[aria-current="page"]{color:var(--c);}.tn-bnav button[aria-current="page"] .ic{background:var(--cs);color:var(--c);}
@media (max-width:999px){:is(#hj-root,#hj-bare,#hj-ov0).tn{padding-bottom:84px;}body:has(.tn-bnav) .toast{bottom:calc(92px + env(safe-area-inset-bottom,0px));}}
@media (min-width:1000px){.tn-bnav{display:none;}.tn-top{display:flex;flex-wrap:wrap;gap:6px;margin-left:16px;min-width:0;}
  .tn-top button{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;border:1px solid transparent;background:none;color:var(--ink-soft);cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:15px;letter-spacing:.8px;text-transform:uppercase;min-height:42px;}
  .tn-top button .tn-i{font-size:19px;color:var(--c);}.tn-top button:hover{border-color:var(--line);color:var(--ink);}
  .tn-top button[aria-current="page"]{background:var(--c);color:var(--t-on);}.tn-top button[aria-current="page"] .tn-i{color:var(--t-on);}}
/* cards */
.tn .tn-card,.tn .hj-blk{position:relative;background:var(--card);border:1px solid var(--line);border-radius:22px;box-shadow:var(--t-shadow);padding:18px;min-width:0;margin:0;}
.tn .hj-blk{margin:0 0 14px;}
.tn-card.tn-lift{transition:transform .25s ease,box-shadow .25s ease;}.tn-card.tn-lift:hover{transform:translateY(-3px);box-shadow:var(--t-shadow-up);}
.tn-card.tn-edge{border-top:4px solid var(--c);}
.tn-card.done{background:color-mix(in srgb,var(--cs) 55%,var(--card));}
.tn .tn-hd{display:flex;align-items:center;gap:12px;margin-bottom:10px;min-width:0;}
.tn-badge{flex:none;width:44px;height:44px;border-radius:14px;display:grid;place-items:center;background:var(--cs);color:var(--c);font-size:23px;border:1px solid color-mix(in srgb,var(--c) 28%,transparent);}
.tn-pt{display:inline-flex;align-items:center;gap:5px;padding:2px 9px 2px 7px;border-radius:999px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12.5px;letter-spacing:.7px;text-transform:uppercase;background:var(--cs);color:var(--c);border:1px solid color-mix(in srgb,var(--c) 30%,transparent);white-space:nowrap;flex:none;}
.tn-pt::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--c);}
.tn-pts{display:flex;flex-wrap:wrap;gap:6px;margin-top:7px;}
.tn-chip{display:inline-flex;align-items:center;gap:6px;padding:5px 11px;border-radius:999px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:14px;letter-spacing:.6px;text-transform:uppercase;background:rgba(255,255,255,.9);color:#3A2A18;}
.tn-chip.g{background:#2F5E3A;color:#fff;}
.tn-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 20px;border-radius:999px;border:0;cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:17px;letter-spacing:.9px;text-transform:uppercase;background:var(--c);color:var(--t-on);box-shadow:0 6px 16px color-mix(in srgb,var(--c) 30%,transparent);transition:transform .15s ease,filter .15s ease;text-decoration:none;}
.tn-btn:hover{filter:brightness(1.06);}.tn-btn:active{transform:scale(.97);}.tn-btn[disabled]{opacity:.5;cursor:default;}
.tn-btn.line{background:transparent;color:var(--c);border:1.5px solid color-mix(in srgb,var(--c) 50%,transparent);box-shadow:none;}
.tn-btn.big{min-height:58px;font-size:20px;width:100%;}.tn-btn.sm{min-height:44px;font-size:15px;padding:0 15px;}
.tn-acts{display:flex;gap:8px 10px;flex-wrap:wrap;margin-top:12px;align-items:center;}
.tn-link{display:inline-flex;align-items:center;gap:6px;font-weight:600;color:var(--c);text-decoration:none;font-size:15.5px;margin-top:10px;}
.tn-note{display:flex;gap:10px;align-items:flex-start;background:var(--t-card2);border:1px solid var(--line);border-radius:16px;padding:12px 14px;font-size:14.5px;color:var(--ink-soft);line-height:1.4;margin-top:10px;}
.tn-note .tn-i{font-size:20px;color:var(--c,var(--gold));margin-top:1px;}
.tn-lead{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:clamp(22px,5.4vw,28px);line-height:1.25;margin:14px 2px 0;}
/* layout */
.tn-grid,.tn-col{display:grid;gap:16px;align-content:start;min-width:0;}
.tn-two{display:grid;gap:16px;}
@media (min-width:1000px){.tn-grid.tn-today{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:22px;align-items:start;}.tn-today .tn-c1{grid-column:1;grid-row:1;}.tn-today .tn-cnow{grid-column:2;grid-row:1 / span 2;}.tn-today .tn-crem{grid-column:1;grid-row:2;}.tn-today .tn-cb{grid-column:1;grid-row:3;}.tn-today .tn-cr{grid-column:2;grid-row:3;}.tn-today .tn-crem:empty{display:none;}.tn-two{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:22px;align-items:start;}}
@media (min-width:700px) and (max-width:999px){.tn-grid.tn-today{grid-template-columns:minmax(0,1fr) minmax(0,1fr);}.tn-today .tn-c1,.tn-today .tn-cnow,.tn-today .tn-crem{grid-column:1 / -1;}}
.tn-sec>.hj-blk,.tn-sec>.hj-doc,.tn-sec>.hj-note{margin-bottom:14px;}
.tn-head{display:flex;align-items:center;gap:14px;margin:4px 2px 16px;}
.tn-head .tn-badge{width:52px;height:52px;font-size:28px;border-radius:17px;}
.tn-head h2{font-size:clamp(32px,7vw,42px);}.tn-head .tn-sub{margin-top:2px;}
.tn-h3{font-size:26px;margin:20px 2px 10px;}
.tn-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 16px;}
.tn-tab{display:inline-flex;align-items:center;gap:7px;min-height:44px;padding:0 16px;border-radius:999px;border:1.5px solid var(--line);background:var(--card);color:var(--ink);cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:15px;letter-spacing:.8px;text-transform:uppercase;}
.tn-tab .tn-i{color:var(--c);font-size:18px;}.tn-tab.on{background:var(--c);border-color:var(--c);color:var(--t-on);}.tn-tab.on .tn-i{color:var(--t-on);}
/* hero */
.tn-hero{container-type:inline-size;position:relative;border-radius:28px;overflow:hidden;min-height:290px;color:#fff;box-shadow:var(--t-shadow-up);isolation:isolate;}
.tn-hero .tn-sky{position:absolute;inset:0;width:100%;height:100%;z-index:-2;display:block;}
.tn-hero::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(10,20,40,.4) 0%,rgba(10,20,40,.1) 48%,rgba(0,0,0,0) 64%);}
.tn-hero .in{padding:22px 22px 18px;}
.tn-hero .greet{font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;font-size:14px;display:flex;align-items:center;gap:8px;text-shadow:0 1px 8px rgba(10,20,50,.4);}
.tn-hero .day{font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:clamp(44px,19cqw,112px);line-height:.88;margin:10px 0 4px;letter-spacing:-1px;color:#fff;text-shadow:0 2px 18px rgba(10,20,50,.35);white-space:nowrap;}
.tn-hero .date{font-family:'Barlow Condensed',sans-serif;font-weight:600;font-size:clamp(30px,8.4vw,40px);line-height:1;text-shadow:0 1px 10px rgba(10,20,50,.35);}
.tn-hero .chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;}
.tn-welcome{min-height:260px;}.tn-welcome h1{color:#fff;font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(46px,12vw,80px);line-height:1;margin:10px 0 0;text-shadow:0 2px 18px rgba(10,20,50,.35);}
.tn-welcome p{max-width:30ch;margin:8px 0 6px;font-size:17px;font-weight:500;text-shadow:0 1px 8px rgba(10,20,50,.45);}
@media (min-width:1000px){.tn-hero{min-height:400px;}.tn-hero.tn-welcome{min-height:300px;}}
/* right now */
.tn-now{background:linear-gradient(140deg,var(--cs),var(--card) 70%);border:1px solid color-mix(in srgb,var(--c) 30%,var(--line));}
.tn-now .row{display:flex;gap:14px;align-items:center;margin-top:4px;}
.tn-now h3{font-size:30px;margin:2px 0 4px;overflow-wrap:anywhere;}
.tn-now .art{flex:none;width:92px;height:92px;border-radius:24px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,.12);}
.tn-now .tn-btn{margin-top:14px;}.tn-did{display:block;margin:10px auto 0;}
.tn-btn.pulse{position:relative;}
.tn-btn.pulse::before{content:"";position:absolute;inset:-4px;border-radius:999px;border:2px solid var(--c);opacity:0;animation:tnpulse 2.6s ease-out infinite;}
@keyframes tnpulse{0%{opacity:.6;transform:scale(.98);}100%{opacity:0;transform:scale(1.05);}}
/* rings */
.tn-ring{position:relative;flex:none;}.tn-ring svg{display:block;transform:rotate(-90deg);}
.tn-ring .tr{stroke:color-mix(in srgb,var(--c) 16%,transparent);}
.tn-ring .fg{stroke:var(--c);stroke-linecap:round;}
.tn-ring .mid{position:absolute;inset:0;display:grid;place-items:center;text-align:center;line-height:1;}
.tn-ring .mid b{display:block;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:34px;color:var(--ink);}
.tn-ring .mid small{display:block;font-size:12px;color:var(--ink-soft);margin-top:2px;}
.tn-prog{display:flex;gap:16px;align-items:center;}
.tn-big{font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:27px;line-height:1.1;margin:2px 0 4px;}
.tn-dots{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px;}
.tn-dots span{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;font-size:18px;background:var(--t-card2);color:var(--ink-soft);border:1.5px dashed color-mix(in srgb,var(--c) 45%,var(--line));}
.tn-dots span.f{background:var(--c);color:var(--t-on);border:1.5px solid var(--c);}
.tn-dots em{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}
/* group headers on Today */
.tn-grp{display:flex;align-items:center;gap:10px;margin:8px 2px -2px;}
.tn-grp .tn-badge{width:40px;height:40px;font-size:21px;border-radius:13px;}
.tn-grp h2{font-size:30px;}
.tn-grp .sp{flex:1;height:0;border-top:1.5px solid color-mix(in srgb,var(--c) 30%,var(--line));min-width:10px;}
/* plan cards */
.tn-pc{display:grid;grid-template-columns:auto minmax(0,1fr);gap:14px;align-items:start;}
.tn-scene{width:104px;height:104px;border-radius:18px;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(0,0,0,.06);}
.tn-scene svg,.tn-now .art svg{display:block;}
.tn-pc h3{font-size:25px;margin-top:2px;overflow-wrap:anywhere;}
.tn-time{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:14px;letter-spacing:1px;color:var(--ink-soft);text-transform:uppercase;}
.tn-meta{display:block;margin-top:6px;font-size:14.5px;color:var(--ink-soft);line-height:1.35;}
@media (max-width:380px){.tn-pc{grid-template-columns:minmax(0,1fr);}.tn-scene{width:100%;height:120px;}}
/* the check */
.tn-ck{position:relative;display:inline-flex;align-items:center;gap:10px;background:none;border:0;padding:4px 2px;text-align:left;color:var(--ink);cursor:pointer;font:inherit;min-height:44px;}
.tn-ck .box{position:relative;flex:none;width:34px;height:34px;}
.tn-ck .box svg{width:34px;height:34px;display:block;}
.tn-ck .o{stroke:color-mix(in srgb,var(--c) 60%,var(--line));stroke-width:2.2;fill:var(--card);transition:fill .3s ease,stroke .3s ease;}
.tn-ck .m{stroke:var(--t-on);stroke-width:3;fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:22;stroke-dashoffset:22;transition:stroke-dashoffset .35s .12s ease;}
.tn-ck[aria-pressed="true"] .o{fill:var(--c);stroke:var(--c);}.tn-ck[aria-pressed="true"] .m{stroke-dashoffset:0;}
.tn-ck.pop .box svg{animation:tnpop .45s cubic-bezier(.3,1.6,.5,1);}.tn-ck.pop .m{animation:tndraw .35s .1s ease both;}
@keyframes tnpop{0%{transform:scale(.7);}60%{transform:scale(1.18);}100%{transform:scale(1);}}@keyframes tndraw{from{stroke-dashoffset:22;}to{stroke-dashoffset:0;}}
.tn-ck .lb{font-weight:600;font-size:15.5px;line-height:1.3;}.tn-ck[aria-pressed="true"] .lb{color:var(--ink);}
.tn-ck .sb{display:block;font-weight:400;font-size:13.5px;color:var(--ink-soft);}
.tn-burst{position:absolute;left:17px;top:17px;width:0;height:0;pointer-events:none;}
.tn-burst i{position:absolute;width:7px;height:7px;margin:-3.5px;border-radius:50%;background:var(--c);animation:tnfly .7s ease-out forwards;}
@keyframes tnfly{0%{transform:translate(0,0) scale(1);opacity:1;}100%{transform:translate(var(--x),var(--y)) scale(.2);opacity:0;}}
.tn-list{display:grid;gap:2px;margin-top:4px;}.tn-list .tn-ck{width:100%;padding:6px 4px;border-radius:12px;}.tn-list .tn-ck:hover{background:var(--t-card2);}
@media (min-width:560px){.tn-l2{grid-template-columns:repeat(2,minmax(0,1fr));}}
.tn-split{display:grid;grid-template-columns:minmax(0,1fr);gap:10px;}
@media (min-width:430px){.tn-split{grid-template-columns:repeat(2,minmax(0,1fr));}}
.tn-split>div{background:var(--t-card2);border-radius:16px;padding:10px 10px 6px;border:1px solid var(--line);min-width:0;}
.tn-split .tn-k{margin:2px 4px 4px;}
/* My Why, Tonight's Question */
.tn-whyc{display:flex;align-items:center;gap:12px;}.tn-whyl{font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:24px;line-height:1.2;margin-top:2px;overflow-wrap:anywhere;}
.tn-q{font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:24px;line-height:1.2;margin:4px 0 2px;color:var(--ink);}
/* Fruit */
.tn-ldl{display:block;width:100%;text-align:left;color:var(--ink);font:inherit;cursor:pointer;}
.tn-nums{display:flex;gap:18px;align-items:flex-end;margin:4px 0 6px;flex-wrap:wrap;}
.tn-nums div{line-height:1;}.tn-nums b{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:42px;color:var(--ink);}.tn-nums b.soft{color:var(--ink-soft);}
.tn-nums small{display:block;font-size:12.5px;color:var(--ink-soft);margin-top:4px;}
.tn-spark{display:block;width:100%;height:96px;overflow:visible;}
.tn-spark .proj{stroke:var(--c);stroke-width:2;fill:none;stroke-dasharray:5 6;}.tn-spark .done{stroke:var(--c);stroke-width:3;fill:none;stroke-linecap:round;}
.tn-spark .area{fill:var(--c);opacity:.1;}.tn-spark .tg{stroke:var(--ink-soft);stroke-width:1;stroke-dasharray:2 4;opacity:.6;}
.tn-spark text{font-family:'Barlow',sans-serif;font-size:11px;fill:var(--ink-soft);}
.tn-spark .lab{fill:var(--ink);stroke:var(--card);stroke-width:2;}.tn-spark .now{fill:var(--card);stroke:var(--c);stroke-width:3;}
.tn-mile{display:grid;gap:8px;margin-top:6px;}
.tn-mile>div{display:flex;align-items:center;gap:10px;font-size:15px;line-height:1.3;}
.tn-mile b{display:block;font-weight:600;}.tn-mile small{display:block;color:var(--ink-soft);font-size:13.5px;}
.tn-mile i{flex:none;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--c);color:var(--t-on);font-style:normal;font-size:16px;}
.tn-mile .up i{background:transparent;border:2px dashed var(--c);color:var(--c);}
.tn-more summary{cursor:pointer;margin-top:12px;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--c);font-size:15px;list-style:none;}
.tn-more summary::-webkit-details-marker{display:none;}
.tn-wk7{grid-template-columns:minmax(0,1fr) !important;}
.tn-wbsvg .b{fill:color-mix(in srgb,var(--c) 70%,var(--card));}.tn-wbsvg .b.on{fill:var(--c);}
/* Choose What You Use */
.tn-chead{margin:20px 2px 12px;}.tn-chead h2{font-size:clamp(32px,8vw,44px);}.tn-chead .tn-sub{margin-top:4px;max-width:60ch;}
.tn-chooseg{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;}
.tn-tg{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:14px;align-items:center;text-align:left;width:100%;background:var(--card);border:1.5px solid var(--line);border-radius:20px;padding:14px;box-shadow:var(--t-shadow);color:var(--ink);font:inherit;cursor:pointer;transition:border-color .25s ease,background .25s ease,transform .2s ease;}
.tn-tg:hover{transform:translateY(-2px);}.tn-tg .tn-badge{width:52px;height:52px;font-size:27px;border-radius:17px;}
.tn-tg h3{font-size:23px;}.tn-tg .tn-sub{display:block;font-size:14.5px;margin-top:2px;}
.tn-tg[aria-pressed="true"]{border-color:color-mix(in srgb,var(--c) 60%,var(--line));background:color-mix(in srgb,var(--cs) 40%,var(--card));}
.tn-tg[aria-pressed="false"] .tn-badge{filter:saturate(.2);opacity:.6;}
.tn-sw{position:relative;flex:none;width:52px;height:30px;border-radius:999px;border:0;padding:0;cursor:pointer;background:color-mix(in srgb,var(--ink) 18%,var(--card));transition:background .25s ease;display:inline-block;}
.tn-sw::after{content:"";position:absolute;left:3px;top:3px;width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.25);transition:transform .25s cubic-bezier(.3,1.4,.5,1);}
.tn-sw[aria-checked="true"],.tn-sw[data-on="true"]{background:var(--c,var(--t-leaves));}.tn-sw[aria-checked="true"]::after,.tn-sw[data-on="true"]::after{transform:translateX(22px);}
.tn-startc{display:flex;flex-direction:column;justify-content:center;gap:10px;background:linear-gradient(150deg,var(--t-leaves-s),var(--card) 80%);--c:var(--t-leaves);}
.tn-startc .cnt{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:40px;line-height:1;color:var(--ink);}
@media (min-width:1000px){.tn-chooseg{grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;}.tn-tg{grid-template-columns:minmax(0,1fr) auto;align-items:start;padding:18px;}
  .tn-tg .tn-badge{grid-row:1;grid-column:1;}.tn-tg .tn-sw{grid-row:1;grid-column:2;}.tn-tg .tx{grid-row:2;grid-column:1 / -1;}}
/* settings rows */
.tn-set{display:grid;}
.tn-row{display:flex;align-items:center;gap:12px;padding:12px 2px;border-top:1px solid var(--line);}
.tn-set>.tn-row:first-child{border-top:0;}
.tn-row .ic2{flex:none;display:grid;place-items:center;width:36px;height:36px;border-radius:11px;background:var(--cs);color:var(--c);font-size:19px;}
.tn-row .tx{flex:1;min-width:0;}.tn-row .tx b{display:block;font-weight:600;font-size:16px;}.tn-row .tx small{display:block;color:var(--ink-soft);font-size:13.5px;line-height:1.35;}
.tn-set .dim{opacity:.55;}
/* kitchen and move */
.tn-kgrid{display:grid;gap:14px;margin-bottom:14px;}
@media (min-width:700px){.tn-kgrid{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media (min-width:1000px){.tn-kgrid{grid-template-columns:repeat(3,minmax(0,1fr));}.tn-kgrid .tn-feature{grid-row:span 2;}}
.tn-kc{display:grid;grid-template-columns:96px minmax(0,1fr);gap:14px;align-items:center;width:100%;text-align:left;color:var(--ink);font:inherit;cursor:pointer;}
.tn-rfind{margin-bottom:14px;}.tn-rfind .hj-fld input{width:100%;min-height:46px;}.tn-rk{margin:12px 0 6px;}.tn-rchips{margin:0 0 6px;}.tn-rcount{margin:12px 0 0;font-weight:600;}
.tn-rlist{display:grid;gap:12px;margin-bottom:14px;}@media (min-width:900px){.tn-rlist{grid-template-columns:repeat(2,minmax(0,1fr));}}
.tn .tn-card.tn-rc{display:grid;grid-template-columns:52px minmax(0,1fr);gap:14px;align-items:center;width:100%;text-align:left;color:var(--ink);font:inherit;cursor:pointer;padding:14px 16px;}
.tn-rc .ri{width:52px;height:52px;border-radius:16px;background:var(--cs);color:var(--c);display:grid;place-items:center;}.tn-rc .ri svg{width:30px;height:30px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;}
.tn-rc .tx{min-width:0;display:block;}.tn-rc .h3{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:20px;line-height:1.2;overflow-wrap:anywhere;}
.tn-kc .ill{width:96px;height:96px;border-radius:20px;overflow:hidden;display:block;}.tn-kc .ill svg{display:block;}
.tn-kc .tx{min-width:0;display:block;}.tn-kc .h3{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:22px;line-height:1.15;overflow-wrap:anywhere;}
.tn .tn-card.tn-feature{padding:0;overflow:hidden;}.tn-fscene{height:190px;}.tn-fscene svg{display:block;}
.tn-feature .body{padding:16px 18px 18px;}.tn-feature h3{font-size:30px;}
.tn-more .tn-acts{margin-top:8px;}
/* the older pieces, in the new frame */
.tn .hj-doc{border-radius:18px;box-shadow:var(--t-shadow);}
.tn .hj-note{border-left-color:var(--c,var(--hj));border-radius:14px;background:var(--t-card2);}
.tn-sec .btn-gold{background:var(--c);border-color:var(--c);color:var(--t-on);}
.tn-sec .btn-line{border-color:color-mix(in srgb,var(--c) 50%,var(--line));color:var(--c);}
.tn-sec .chip.on,.tn-sec .chip[aria-pressed="true"]{background:var(--c);border-color:var(--c);color:var(--t-on);}
.tn .hj-wkbar{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:8px;box-shadow:var(--t-shadow);}
.tn .hj-days{padding:6px 14px;}
.tn .hj-day.t{background:color-mix(in srgb,var(--cs) 55%,transparent);border-radius:14px;margin:0 -8px;padding:10px 8px;box-shadow:0 0 0 2px var(--c) inset;}
.tn .hj-day.t .hj-dl b{color:var(--c);}
.tn .hj-pill{border-radius:14px;background:var(--t-card2);}
.tn .hj-pill.food{border-left-color:var(--t-kitchen);}.tn .hj-pill.move{border-left-color:var(--t-move);}.tn .hj-pill.calm{border-left-color:var(--t-bark);}
.tn .hj-prog span{background:var(--c,var(--hj));}
.tn .hj-shopbar{border-radius:0 0 14px 14px;}
.tn .hj-agck{border-radius:50%;border:2px solid color-mix(in srgb,var(--c,var(--hj)) 55%,var(--line));color:var(--t-on);}.tn .hj-agck[aria-pressed="true"]{background:var(--c,var(--hj));border-color:var(--c,var(--hj));}
.tn .hj-rem{--c:var(--t-kitchen);}
.tn .hj-sec{color:var(--c);}
.tn .hj-plate .hj-eh,.tn .hj-plate .hj-pg8 summary,.tn .hj-plate .hj-pg8 summary::after{color:var(--c);}
.tn .hj-plate .hj-pr8.on .box{background:var(--c);border-color:var(--c);}
/* plate rings */
.tn .hj-mts0{grid-template-columns:minmax(0,1fr);gap:14px;}
.tn .hj-mtg{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px 8px;}
.tn .tn-rm{display:flex;flex-direction:column;align-items:center;text-align:center;min-width:0;--c:var(--mc);}
.tn .tn-rm .tn-ring .tr{stroke:color-mix(in srgb,var(--mc) 18%,var(--bg-deep));}
.tn .tn-rm .hj-mth{display:block;}.tn .tn-rm .hj-mth b{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:16px;color:var(--ink);white-space:nowrap;}
.tn .tn-rm .tx{min-width:0;margin-top:6px;}.tn .tn-rm .l{display:block;font-weight:600;font-size:13.5px;line-height:1.2;color:var(--ink);}
.tn .tn-rm .hj-mts{display:block;font-size:12px;line-height:1.3;}.tn .tn-rm .hj-mts span,.tn .tn-rm .hj-mts em{display:block;}
.tn .tn-rm.big{flex-direction:row;gap:16px;text-align:left;background:var(--t-card2);border:1px solid var(--line);border-radius:18px;padding:12px;}
.tn .tn-rm.big .hj-mth b{font-size:28px;}.tn .tn-rm.big .l{font-size:17px;}.tn .tn-rm.big .hj-mts{font-size:14px;}.tn .tn-rm.big .tx{margin:0;}
.tn-qa{margin:12px 0 6px;}.tn-qah{display:flex;align-items:baseline;justify-content:space-between;gap:10px;}.tn-qah .hj-eh{margin:0 0 6px;}.tn-qah .linkbtn{font-size:14px;min-height:44px;}
.tn-qcs{display:flex;flex-wrap:wrap;gap:8px;}
.tn-qc{display:inline-flex;align-items:stretch;border-radius:999px;border:1.5px solid color-mix(in srgb,var(--c) 45%,var(--line));background:var(--card);overflow:hidden;}
.tn-qc.on{background:var(--cs);border-color:var(--c);}
.tn-qa1{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:0 14px;border:0;background:none;color:var(--ink);font:inherit;font-weight:600;font-size:15px;cursor:pointer;}
.tn-qa1 .tn-i{color:var(--c);font-size:16px;}.tn-qa1 b{display:inline-grid;place-items:center;min-width:24px;height:24px;padding:0 6px;border-radius:999px;background:var(--c);color:var(--t-on);font-size:14px;}
.tn-qm{min-width:44px;min-height:44px;border:0;border-left:1px solid color-mix(in srgb,var(--c) 35%,var(--line));background:none;color:var(--ink);font-size:20px;line-height:1;cursor:pointer;}
.tn-qaed{margin-top:10px;padding:12px;border-radius:16px;background:var(--t-card2);border:1px solid var(--line);display:grid;gap:10px;}
.tn-qaed #hj-qaq{width:100%;min-width:0;min-height:46px;}
.tn-qal{display:flex;flex-wrap:wrap;gap:6px;}.tn-qx{display:inline-flex;align-items:center;gap:2px;padding-left:12px;border-radius:999px;background:var(--card);border:1px solid var(--line);font-size:14px;font-weight:600;}
.tn-qx button{display:grid;place-items:center;width:44px;height:40px;border:0;background:none;color:var(--ink-soft);cursor:pointer;font-size:16px;}.tn-qx button .tn-i{transform:rotate(45deg);}
.tn-qr{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:6px 0;}.tn-qr span{min-width:0;}.tn-qr b{display:block;font-weight:600;font-size:15px;overflow-wrap:anywhere;}.tn-qr small{display:block;color:var(--ink-soft);font-size:13px;}
/* Morning Quiet */
.tn-qscene{height:clamp(170px,30vh,260px);border-radius:22px;overflow:hidden;margin-top:10px;}.tn-qscene svg{display:block;}
.tn-qmins{justify-content:center;margin:6px 0 0;}
/* motion: cards rise in on a section's first look, rings sweep, scenes breathe */
.tn-anim .tn-col>*,.tn-anim .tn-sec>*,.tn-anim .tn-choose>*{animation:tnrise .6s cubic-bezier(.2,.8,.2,1) both;}
.tn-anim .tn-col>*:nth-child(2),.tn-anim .tn-sec>*:nth-child(2),.tn-anim .tn-choose>*:nth-child(2){animation-delay:70ms;}
.tn-anim .tn-col>*:nth-child(3),.tn-anim .tn-sec>*:nth-child(3),.tn-anim .tn-choose>*:nth-child(3){animation-delay:140ms;}
.tn-anim .tn-col>*:nth-child(4),.tn-anim .tn-sec>*:nth-child(4),.tn-anim .tn-choose>*:nth-child(4){animation-delay:210ms;}
.tn-anim .tn-col>*:nth-child(n+5),.tn-anim .tn-sec>*:nth-child(n+5),.tn-anim .tn-choose>*:nth-child(n+5){animation-delay:280ms;}
@keyframes tnrise{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
.tn-anim .tn-ring .fg{animation:tnsweep 1.1s cubic-bezier(.2,.8,.2,1) both;}@keyframes tnsweep{from{stroke-dashoffset:var(--c0);}}
.tn .tn-sun{animation:tnglow 5s ease-in-out infinite;transform-origin:center;transform-box:fill-box;}@keyframes tnglow{50%{transform:scale(1.07);}}
.tn .tn-cloud{animation:tndrift 26s linear infinite alternate;}@keyframes tndrift{from{transform:translateX(-30px);}to{transform:translateX(30px);}}
.tn .tn-fig{animation:tnbreathe 2.4s ease-in-out infinite;transform-origin:50% 100%;transform-box:fill-box;}@keyframes tnbreathe{50%{transform:translateY(2px) scaleY(.97);}}
.tn .tn-steam path{animation:tnsteam 3.2s ease-in-out infinite;opacity:0;}.tn .tn-steam path:nth-child(2){animation-delay:1s;}.tn .tn-steam path:nth-child(3){animation-delay:2s;}
@keyframes tnsteam{0%{opacity:0;transform:translateY(6px);}35%{opacity:.75;}100%{opacity:0;transform:translateY(-16px);}}
@media (prefers-reduced-motion: reduce){.tn *,.tn *::before,.tn *::after{animation:none !important;transition:none !important;}.tn .tn-steam path{opacity:.6;}}
/* BLD 866: the Today paintings, for every tier */
.tn-gimg{flex:none;width:52px;height:52px;border-radius:16px;overflow:hidden;background:var(--cs,var(--bg-deep));border:1px solid color-mix(in srgb,var(--c,var(--line)) 28%,transparent);display:block;}
.tn-gimg img{display:block;width:100%;height:100%;object-fit:cover;}
.tn-gimg.big{width:64px;height:64px;border-radius:19px;}
/* BLD 866: public Tending. Base pieces a public host page may lack, scoped to public Tending only */
:is(#hj-root,#hj-bare,#hj-ov0).tn-pub section{padding:0;border-top:0;background:none;}
:is(#hj-root,#hj-bare,#hj-ov0).tn-pub .tn-hero .day{font-size:clamp(44px,19cqw,112px);line-height:.88;margin:10px 0 4px;}
:is(#hj-root,#hj-bare,#hj-ov0).tn-pub .tn-head h2{font-size:clamp(32px,7vw,42px);}:is(#hj-root,#hj-bare,#hj-ov0).tn-pub .tn-grp h2{font-size:30px;}
:is(#hj-root,#hj-bare,#hj-ov0).tn-pub .hj-sub{margin:6px 0 10px;}:is(#hj-root,#hj-bare,#hj-ov0).tn-pub .tn-kv h2{font-size:clamp(38px,9vw,60px);}:is(#hj-root,#hj-bare,#hj-ov0).tn-pub .tn-kvc h3{font-size:clamp(28px,6vw,38px);}
:is(#hj-root,#hj-bare,#hj-ov0).tn-pub{--ok:#3F7F3A;--okb:#CFE5C4;--t-good:#3F8A47;--t-ok:#8DB257;--t-watch:#D69A2D;--t-high:#C4553B;}
:root[data-theme="dark"] :is(#hj-root,#hj-bare,#hj-ov0).tn-pub{--t-good:#5FAE62;--t-ok:#A8C66E;--t-watch:#E2AE4A;--t-high:#E07A5E;}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) :is(#hj-root,#hj-bare,#hj-ov0).tn-pub{--t-good:#5FAE62;--t-ok:#A8C66E;--t-watch:#E2AE4A;--t-high:#E07A5E;}}
.tn-pub .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:16px;letter-spacing:1px;text-transform:uppercase;border-radius:30px;padding:12px 22px;border:1px solid transparent;cursor:pointer;min-height:46px;text-decoration:none;}
.tn-pub .btn-gold{background:var(--gold);color:#fff;}.tn-pub .btn-line{background:var(--card);border-color:var(--line);color:var(--ink);}.tn-pub .btn-sm{min-height:40px;padding:8px 16px;font-size:14px;}
.tn-pub .btn[disabled]{opacity:.5;cursor:default;}
:root[data-theme="dark"] .tn-pub .btn-gold{color:#1A1612;}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .tn-pub .btn-gold{color:#1A1612;}}
.tn-pub .linkbtn{background:none;border:0;color:var(--gold);font-weight:600;cursor:pointer;text-decoration:underline;text-underline-offset:3px;font:inherit;min-height:40px;}
.tn-pub .row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;}.tn-pub .spread{display:flex;gap:10px;justify-content:space-between;align-items:center;flex-wrap:wrap;}
.tn-pub .chip{border:1px solid var(--line);background:var(--card);border-radius:30px;padding:9px 15px;cursor:pointer;font-weight:600;font-size:15px;color:var(--ink-soft);font-family:inherit;}
:is(#hj-root,#hj-bare,#hj-ov0).tn-pub .chip[aria-pressed="true"],:is(#hj-root,#hj-bare,#hj-ov0).tn-pub .chip.on{background:var(--c,var(--t-leaves));border-color:var(--c,var(--t-leaves));color:var(--t-on);}
.tn-pub input,.tn-pub select,.tn-pub textarea{font:inherit;color:var(--ink);background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px 12px;min-height:46px;max-width:100%;}
.tn-pub .chip small{display:block;font-weight:400;font-size:12.5px;}
/* the start-up check */
.tn-ckbar{height:8px;border-radius:5px;background:var(--bg-deep);overflow:hidden;margin:0 0 6px;}.tn-ckbar span{display:block;height:100%;background:var(--c,var(--gold));border-radius:5px;}
.tn-ckn{margin:0 0 10px;font-size:14px;}
.tn-check h3{font-size:clamp(24px,5vw,30px);margin:0 0 6px;}
.tn-ckg{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,220px),1fr));gap:10px;margin:8px 0;}
.tn-ckcard{display:block;text-align:left;background:var(--t-card2,var(--bg-deep));border:2px solid var(--line);border-radius:16px;padding:12px 14px;color:var(--ink);font:inherit;cursor:pointer;min-height:64px;}
.tn-ckcard b{display:block;font-size:17px;}.tn-ckcard small{display:block;color:var(--ink-soft);font-size:14px;line-height:1.35;margin-top:2px;}
.tn-ckcard.on{border-color:var(--c,var(--gold));background:var(--cs,var(--bg-deep));box-shadow:0 0 0 1px var(--c,var(--gold)) inset;}
.tn-ckq{padding:10px 0;border-top:1px solid var(--line);}.tn-ckq:first-of-type{border-top:0;}.tn-ckq p{margin:0 0 6px;}.tn-ckq .hj-chips{margin:0;}
.tn-yes p{margin:0 0 8px;}
.tn-kidrow{border:1px solid var(--line);border-radius:14px;padding:10px 12px;margin:10px 0;}.tn-kidrow .hj-chips{margin:6px 0;}
.tn-cknav{margin:14px 0 8px;}.tn-cknav .btn{min-width:120px;}
/* My Path, the plan editor, the team plan */
.tn-path h3{margin:2px 0 4px;font-size:26px;}
.tn-pe{display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid var(--line);min-width:0;}.tn-pe:first-of-type{border-top:0;}
.tn-pe .d{flex:0 0 84px;font-weight:700;font-size:14px;color:var(--ink-soft);}.tn-pe .d:empty{display:none;}.tn-pe .n{flex:1;min-width:0;}.tn-pe .n b{display:block;overflow-wrap:anywhere;font-size:15.5px;}.tn-pe .n small{display:block;color:var(--ink-soft);font-size:13px;}
@media(max-width:520px){.tn-pe{flex-wrap:wrap;}.tn-pe .d{flex-basis:100%;}}
.tn-tm h3{margin:0 0 6px;}.tn-tm p{margin:4px 0;}
/* labs */
.tn-mks{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:12px;margin:0 0 14px;}
.tn-mk{min-width:0;}.tn-mkv{margin:2px 0;}.tn-mkv b{font-family:'Cormorant Garamond',Georgia,serif;font-size:34px;line-height:1;}.tn-mkd{color:var(--ink-soft);font-size:13px;}
.tn-tone{display:inline-block;padding:2px 10px;border-radius:999px;font-size:13px;font-weight:700;color:#fff;background:var(--t-ok);}
.tn-tone.t-good{background:var(--t-good);}.tn-tone.t-ok{background:var(--t-ok);color:#1A1612;}.tn-tone.t-watch{background:var(--t-watch);color:#1A1612;}.tn-tone.t-high{background:var(--t-high);}
.tn-rb{position:relative;height:14px;margin:14px 0 4px;}.tn-rb>span{position:absolute;top:0;bottom:0;opacity:.85;}.tn-rb>span:first-child{border-radius:7px 0 0 7px;}
.tn-rb>span.t-good{background:var(--t-good);}.tn-rb>span.t-ok{background:var(--t-ok);}.tn-rb>span.t-watch{background:var(--t-watch);}.tn-rb>span.t-high{background:var(--t-high);}
.tn-rb i{position:absolute;top:-6px;width:6px;height:26px;margin-left:-3px;border-radius:3px;background:var(--ink);box-shadow:0 0 0 2px var(--card);}
.tn-rb i.go{background:transparent;border:2px dashed var(--ink);width:4px;}
.tn-rb em.rg{position:absolute;top:-3px;height:20px;border-radius:6px;background:color-mix(in srgb,var(--card) 35%,transparent);border:2px solid var(--ink);}
.tn-rbl{display:grid;gap:0 4px;font-size:11.5px;color:var(--ink-soft);line-height:1.15;}.tn-rbl span{min-width:0;padding:0 2px;overflow-wrap:anywhere;}.tn-rbl small{display:block;font-size:10.5px;}
.tn-leg{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:13.5px;color:var(--ink-soft);}.tn-leg i{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:6px;vertical-align:-1px;}
.tn-leg i.me{background:var(--ink);}.tn-leg i.rg{border:2px solid var(--ink);}.tn-leg i.go{border:2px dashed var(--ink);}
.tn-more summary{cursor:pointer;color:var(--gold);font-weight:600;font-size:14.5px;margin-top:8px;}
.tn-big2{font-family:'Cormorant Garamond',Georgia,serif;font-size:40px;font-weight:700;line-height:1;margin:6px 0;}.tn-big2 small{font-family:'Barlow',sans-serif;font-size:15px;color:var(--ink-soft);font-weight:400;}
.tn-ldlsvg{display:block;width:100%;max-width:560px;height:auto;margin:10px 0 0;}.tn-ldlsvg .gr{stroke:var(--line);}.tn-ldlsvg .ax{fill:var(--ink-soft);font-size:11px;font-family:'Barlow',sans-serif;}
.tn-ldlsvg .bd{fill:color-mix(in srgb,var(--lpc,#4A8A2C) 22%,transparent);}.tn-ldlsvg .ln{fill:none;stroke:var(--lpc,#4A8A2C);stroke-width:3;}.tn-ldlsvg .gl{stroke:var(--ink);stroke-width:1.5;stroke-dasharray:5 4;}
.tn-ldlsvg .tl{fill:var(--ink);font-size:12px;font-family:'Barlow',sans-serif;}.tn-ldlsvg .tl.b{font-weight:700;}.tn-ldlsvg .me{fill:var(--ink);}
.tn-lev h3{margin:0 0 4px;font-size:22px;}.tn-levr{text-align:right;}.tn-levr b{display:block;font-size:18px;}.tn-levr small{color:var(--ink-soft);font-size:13px;}
.tn-lev.do{border-color:var(--t-good);box-shadow:0 0 0 1px var(--t-good) inset;}.tn-lev.pass{opacity:.8;}.tn-lev.inb{opacity:.75;}
.tn-lev .tn-btn.on{background:var(--bg-deep);}
/* kids */
.tn-kidl{display:grid;gap:10px;}.tn-kidc{background:var(--t-card2);border:1px solid var(--line);border-radius:16px;padding:10px 12px;}.tn-kidc b{font-size:18px;}.tn-kidc small{color:var(--ink-soft);margin-left:8px;}
.tn-kg{display:flex;align-items:center;gap:10px;padding:6px 0;border-top:1px solid var(--line);}.tn-kg:first-of-type{border-top:0;}.tn-kg .dot{flex:none;width:14px;height:14px;border-radius:50%;}
.tn-kg .tn-kb{flex:1;min-width:0;border:0;padding:0;}.tn-kgb{display:flex;gap:4px;}.tn-kgb .tn-qm{border:1px solid var(--line);border-radius:12px;background:var(--card);}
.tn-kb{padding:6px 0;}.tn-kb b{font-size:15px;}.tn-kb small{color:var(--ink-soft);font-size:13px;}
.tn-kbb{height:10px;border-radius:6px;background:var(--bg-deep);overflow:hidden;margin-top:4px;}.tn-kbb span{display:block;height:100%;background:var(--t-ok);border-radius:6px;}
.tn-kb[data-st="done"] .tn-kbb span,.tn-kb[data-st="ok"] .tn-kbb span{background:var(--t-good);}.tn-kb[data-st="past"] .tn-kbb span{background:var(--t-watch);}
/* Kid View: big, bright, no numbers */
.tn-kv{padding:4px 0 24px;}.tn-kvtop{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;margin:0 0 14px;}
.tn-kvtop h2{font-size:clamp(38px,9vw,60px);margin:0;}
.tn-kvc{background:var(--card);border:1px solid var(--line);border-radius:28px;padding:18px;margin:0 0 16px;}.tn-kvc h3{font-size:clamp(28px,6vw,38px);margin:0 0 6px;}.tn-kvc p,.tn-kvc li{font-size:19px;}
.tn-rbw{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,150px),1fr));gap:12px;margin-top:10px;}
.tn-rbc{display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;background:color-mix(in srgb,var(--rc,#4C9A4A) 14%,var(--card));border:3px solid color-mix(in srgb,var(--rc,#4C9A4A) 55%,transparent);border-radius:24px;padding:14px 10px;cursor:pointer;color:var(--ink);font:inherit;min-height:120px;}
.tn-rbc .b{display:grid;place-items:center;width:56px;height:56px;border-radius:50%;background:var(--rc,#4C9A4A);color:#fff;font-size:30px;box-shadow:0 4px 0 color-mix(in srgb,var(--rc,#4C9A4A) 60%,#000);}
.tn-rbc b{font-size:20px;}.tn-rbc small{font-size:14px;color:var(--ink-soft);line-height:1.3;}
.tn-rbc.on{border-color:var(--rc,#4C9A4A);background:color-mix(in srgb,var(--rc,#4C9A4A) 30%,var(--card));transform:scale(1.02);}
.tn-rbc.play{--rc:#2AA8B8;}
.tn-cheer{font-family:'Cormorant Garamond',Georgia,serif;font-size:30px;font-weight:700;text-align:center;margin:14px 0 0;}
/* BLD 881: one section inside a sheet (#hj-bare), and the guides' own full-screen layer (#hj-ov0). */
#hj-bare.tn.tn-bare{padding-bottom:0;min-width:0;}
#hj-ov0.tn.tn-ovl{padding:0;margin:0;height:0;}
.tn-bare .tn-sec{margin-top:0;}
.hj-ov.hj-st.hj-inl{position:relative;inset:auto;z-index:auto;overflow:visible;border-radius:20px;padding:0 16px;}
/* BLD 895: the player's painting, behind everything, under a scrim in the page's own background color (light or dark). */
.hj-ov.hj-hasart{background:var(--bg);isolation:isolate;}
.hj-paint{position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none;background:var(--bg);}
.hj-ov.hj-inl .hj-paint{position:absolute;border-radius:20px;}
.hj-paint picture,.hj-paint img{display:block;width:100%;height:100%;}
.hj-paint img{object-fit:cover;filter:blur(3px) saturate(1.05);transform:scale(1.06);}
.hj-paint::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,color-mix(in srgb,var(--bg) 42%,transparent) 0%,color-mix(in srgb,var(--bg) 58%,transparent) 38%,color-mix(in srgb,var(--bg) 80%,transparent) 100%);}
@media (prefers-reduced-motion: no-preference){ .hj-paint img{animation:hjkb 48s ease-in-out infinite alternate;} }
@keyframes hjkb{from{transform:scale(1.06) translate(0,0);}to{transform:scale(1.14) translate(-1.5%,-1%);}}
.hj-hasart .hj-ovtop{padding:8px 12px;border-radius:16px;background:color-mix(in srgb,var(--bg) 78%,transparent);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);}
.hj-hasart .hj-ovb{margin-top:12px;padding:16px 16px 18px;border-radius:22px;background:color-mix(in srgb,var(--bg) 84%,transparent);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:0 6px 24px rgba(0,0,0,.12);}
.hj-hasart .hj-stagebox{box-shadow:0 8px 28px rgba(0,0,0,.18);border-radius:22px;}
.tn-kc.tn-art .ill img,.tn-scene>img{width:100%;height:100%;object-fit:cover;display:block;}
.tn-mine{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:1.2px;text-transform:uppercase;color:var(--c);margin-left:8px;}
/* BLD 892: the program line, What's New, the restart offer, the equipment checklist, and the Flow shelf */
.hj-prog{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:15px;letter-spacing:1.2px;text-transform:uppercase;color:var(--c,#3F6F94);margin:2px 0 6px;}
.hj-from{font-size:14px;color:var(--ink-soft);margin:-2px 0 6px;}
.tn-new .tn-newl{margin:8px 0 12px;padding-left:20px;}.tn-new .tn-newl li{margin:4px 0;line-height:1.45;overflow-wrap:anywhere;}
.tn-again h3{margin:4px 0 6px;font-size:22px;}
.tn-gear .chip{text-align:left;max-width:100%;white-space:normal;}.tn-gear .chip small{display:block;font-weight:400;opacity:.8;}
.tn-fst{margin:14px 2px 8px;font-size:15px;line-height:1.4;overflow-wrap:anywhere;}.tn-fst b{display:block;font-size:16px;}
.tn-hhrow{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:10px 0 4px;}
/* BLD 896: the Every Workout shelf and the Move Well card */
.tn-ews{margin:-4px 2px 10px;font-size:15px;line-height:1.45;color:var(--ink-soft);overflow-wrap:anywhere;}
.tn-ewl{margin:0 0 12px;}.tn-ewl .chip small{font-weight:400;opacity:.8;margin-left:4px;}
.tn-ew{background:var(--card);border:1px solid var(--line);border-radius:14px;margin:0 0 12px;padding:0 12px;min-width:0;}
.tn-ew>summary{cursor:pointer;list-style:none;display:flex;align-items:baseline;justify-content:space-between;gap:10px;padding:14px 4px;font-family:'Cormorant Garamond',Georgia,serif;font-size:22px;}
.tn-ew>summary::-webkit-details-marker{display:none;}.tn-ew>summary small{font-family:'Barlow',sans-serif;font-size:14px;color:var(--ink-soft);}
.tn-ew>summary::after{content:'Show';font-family:'Barlow',sans-serif;font-size:13px;font-weight:600;color:var(--gold);margin-left:auto;}.tn-ew[open]>summary::after{content:'Hide';}
.tn-ew[open]{padding-bottom:4px;}
.hj-repsof{font-size:16px;opacity:.75;margin-top:-4px;}
/* BLD 897: the form line, the Move Well card, and the start list in the warm ink and paper of the new player */
.hj-form{margin:10px 0;padding:10px 12px;border-left:3px solid #C98A2C;background:rgba(243,200,103,.14);border-radius:0 12px 12px 0;text-align:left;line-height:1.45;overflow-wrap:anywhere;}
.hj-form span{display:block;font:700 11px/1 'Barlow',sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#8A5A12;margin-bottom:4px;}
:root[data-theme="dark"] .hj-form span{color:#F0B850;}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .hj-form span{color:#F0B850;}}
.hj-ov .hj-exn{font-family:'Cormorant Garamond',Georgia,serif;}
.hj-mlist ol{padding-left:22px;}.hj-mlist li{padding:5px 0;border-bottom:1px dashed var(--line);overflow-wrap:anywhere;}.hj-mlist li small{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:15px;opacity:.85;margin-left:4px;}
.hj-ov .hj-clock[data-hjclock]{font-family:'Cormorant Garamond',Georgia,serif;font-variant-numeric:lining-nums tabular-nums;}
.hj-mw ol{margin:4px 0 6px;padding-left:22px;}.hj-mw li{margin:6px 0;line-height:1.45;overflow-wrap:anywhere;}.hj-mw .hj-mwl{margin:0 0 6px;}
.tn-bclosed{text-align:center;}.tn-bclosed .tn-btn{margin-top:10px;}
.tn-notes{margin-top:12px;}
`;
(function(){ const s = document.createElement('style'); s.id = 'hj-css'; s.textContent = CSS; document.head.appendChild(s); })();

window.GGHealth = {
  init(ctx){ C = ctx || {}; keyVoice(); },
  on: () => !!FLDH(),
  // BLD 892: What's New in Your Plan, once per device: news() -> {v, title, lines, label} or null; newsSeen() marks it seen.
  news(){ try { if (!FLDH() || !H()) return null; const x = whatsNew(); return x ? {v: x.v, title: x.title || 'What\'s New in Your Plan', lines: arr(x.lines).slice(), label: progLabel(new Date())} : null; } catch(e){ return null; } },
  newsSeen(){ markNew(); rerender(true); },
  // BLD 892: the player's own clock for a session (seconds), for the workshop and tests: sessionSecs(id, '1'|'2'|'3', light).
  sessionSecs(id, ph, light){ const ses = sesById(String(id || '')); return ses ? Math.round(sessSecs(ses, String(ph || phNum(new Date())), !!light)) : null; },
  view,
  open(sec){ S.sec = sec || 'today'; S.setup = false; if (C.go) C.go('health'); if (PUB()) rerender(false); },
  // BLD 866: what the Home shows. {on, ready, name, today: {checksDone, checksTotal}, plate: {sf, pro, fib, sug, na}, targets,
  // workout: {title, mins, done} or null, nextLabs, kidsCount, use: [parts]}
  summary: () => pubSummary(),
  // BLD 875: open Recipes with one recipe in the kitchen guide (the Home's /home/#recipe-<id>). False when the id is unknown.
  openRecipe(id){ S.sec = 'recipes'; S.setup = false; S.ov = null; if (C.go) C.go('health'); const ok = openRecipeId(String(id || '')); if (!ok) rerender(false); return ok; },
  // Backups: entries combine; the newest copy of each wins and removed entries stay removed.
  merge(out, inc){
    out.deleted = out.deleted || {clients: {}, sessions: {}}; out.deleted.health = out.deleted.health || {};
    Object.entries((inc.deleted || {}).health || {}).forEach(([id, ts]) => { out.deleted.health[id] = Math.max(out.deleted.health[id] || 0, ts); });
    const o = out.health = out.health && typeof out.health === 'object' ? out.health : {}, i = inc.health || {}; let added = 0, updated = 0;
    ['labs', 'marks', 'notes', 'panels', 'wlog', 'myFoods', 'risk'].forEach(k => {
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
    if (Array.isArray(i.quick) && (!Array.isArray(o.quick) || (i.quickU || 0) > (o.quickU || 0))){ o.quick = i.quick.slice(); o.quickU = i.quickU || 0; }
    o.eatUse = o.eatUse && typeof o.eatUse === 'object' ? o.eatUse : {}; Object.entries(i.eatUse || {}).forEach(([k, x]) => { const y = o.eatUse[k]; if (x && (!y || (x.t || 0) > (y.t || 0))) o.eatUse[k] = x; });
    if (i.stock && (!o.stock || (i.stockU || 0) > (o.stockU || 0))){ o.stock = i.stock; o.stockU = i.stockU; }
    ['plan', 'team', 'kids', 'own', 'menu'].forEach(k => { if (i[k] && typeof i[k] === 'object' && (!o[k] || (i[k].u || 0) > (o[k].u || 0))) o[k] = i[k]; });
    return {added, updated};
  },
  // BLD 881: act(key) with one item key (from today() or week()) opens or marks that item; act(action, value) is the engine's own.
  act(a, v){ if (arguments.length < 2 && ITEM_RE.test(String(a || ''))) return apiAct(a); return act(a, v); },
  today: apiToday, toggle: apiToggle, week: apiWeek, render: apiRender, counts: apiCounts,
  // BLD 892: fill(key, date) and guided() for one card, two credits on the Home's Today.
  fill: apiFill, guided: apiGuided,
  // BLD 893: My Grounded Way Plan writes the same settings the start-up check and My Goals write (see apiPlan).
  applyPlan: o => apiPlan(o), planInfo: () => apiPlanInfo(),
  state: S, allLines, LN,
  // BLD 857: the honest estimate, for tests and for setting each session's minutes: seconds for a session id, phase '1' to '3', light week.
  planSecs: (id, ph, light) => { const ses = (WK().sessions || {})[id]; return ses ? Math.round(sessSecs(ses, String(ph || '1'), !!light)) : 0; }
};
// ---------- BLD 896, Holiday Sets ----------
// Chris, October 30, 2026: "a special set for holidays and special occasions.. so you can select thanksgiving dinner, and it will
// add the items to shopping list ahead of time, and put all the prep on calendar, and build step by step guides to do all the
// cooking and prep", then "maybe when you set up food choices.. you can decide to include holidays you want to have.. and then
// they will all be avail in our recipe library". The sets are public data: window.GGHolidays (shared/gg-holidays.js).
// The person's own choices live in DATA.health.set.hol: {on: [ids] (My Holidays), plans: {id: {date, guests, u}}, skip: {id: date}, u}.
// A ticked holiday brings a countdown card about three weeks ahead ("Thanksgiving is in 3 weeks. Set it up?"). Set It Up puts
// the set's shopping on the Shopping List for the week of its buy day (each item marked with the set's name), its prep timeline
// on the days before (Today, Week, and the phone calendar file), and every recipe in the kitchen guide with the calm voice.
// Keys: hol:<id>:<i> a timeline task, hol:<id>:shop the shopping day, holset:<id> the set, holrec:<id>:<menu id> one recipe.
const HOL_LEAD = 24;
const HOL_OUT = 'Nicely done. That part is ready, and the big day just got easier.';
const HOL_ART = {ahead: 'weekly-batch', day: 'todays-plate'};
function holUse(){ const G = window.GGHolidays || null; if (G && G.use && G._hc !== holSt){ G.use(() => { try { return C.data && D() ? holSt() : null; } catch(e){ return null; } }); G._hc = holSt; } return G; }
function holSt(){ const h = H(); if (!h) return {on: [], plans: {}, skip: {}}; const x = h.set.hol = h.set.hol && typeof h.set.hol === 'object' ? h.set.hol : {};
  x.on = arr(x.on); x.plans = x.plans && typeof x.plans === 'object' ? x.plans : {}; x.skip = x.skip && typeof x.skip === 'object' ? x.skip : {}; return x; }
function holKeep(){ const h = H(), x = holSt(); x.u = Date.now(); if (h.set.u) h.set.u = Date.now(); save(); }
const holGet = id => { const G = holUse(); return G ? G.get(id) : null; };
const holSay = s => String((s && (s.spoken || s.name)) || '').replace(/\s*\/\s*/g, ' or ').replace(/\s*\(([^)]*)\)/g, '').trim();
const holLc = t => String(t || '').replace(/^[A-Z](?=[a-z])/, c => c.toLowerCase());
const holDay = s => { const d = parseD(s); return d ? DOWL[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate() : ''; };
const holShort = s => { const d = parseD(s); return d ? DOW[d.getDay()] + ', ' + MONTHS[d.getMonth()].slice(0, 3) + ' ' + d.getDate() : ''; };
const holDays = (a, b) => { const x = parseD(a), y = parseD(b); return x && y ? Math.round((y - x) / DAYMS) : 0; };
function holPlan(id){ const p = holSt().plans[id]; return p && p.date ? p : null; }
function holNext(id){ const G = holUse(), p = holPlan(id); if (p && p.date >= today()) return p.date; return G ? G.next(id, today()) : null; }
function holGuests(id){ const p = holPlan(id), s = holGet(id); return Math.max(1, Math.round(+(p && p.guests) || (s && +s.serves) || 6)); }
// The Shopping List for food week n is shopped the Saturday before that week; a set's buy day lands on the list shopped on or before it.
const holWeek = date => Math.max(1, Math.floor((day0(parseD(date)) - addD(startMon(), -2)) / (7 * DAYMS)) + 1);
const holSec = a => { if (SECX().includes(a)) return a; const m = {Proteins: 'Meat and Fish', 'Dairy and Eggs': 'Eggs, Dairy, and Milks', 'Grains and Beans': 'Pantry', Spices: 'Pantry'}[a]; return SECX().includes(m) ? m : 'Other'; };
function holShopItems(n){
  const G = holUse(), out = [], st = holSt(); if (!G || !H()) return out;
  Object.keys(st.plans).forEach(id => { const p = st.plans[id], s = G.get(id); if (!s || !p || !p.date || holWeek(G.buyDate(id, p.date)) !== n) return;
    G.shop(id, p.guests, p.pick).forEach((x, i) => out.push({id: 'h:' + id + ':' + i, store: 'grocer', sec: holSec(x.aisle), name: x.item, amt: x.amt || '', hamt: x.amt || '', price: 0, for: s.name, hol: id, done: false, n: 500 + out.length})); });
  return out;
}
// Merges a set's items into the week's list, keeps what was checked or edited, and takes off the items of a set that was cleared.
function holMerge(L, n){
  const want = holShopItems(n), has = L && arr(L.items).some(x => /^h:/.test(String(x.id || ''))); if (!want.length && !has) return L;
  L = L || {seed: true, items: []}; const ids = new Set(want.map(x => x.id));
  L.items = arr(L.items).filter(x => !/^h:/.test(String(x.id || '')) || ids.has(x.id));
  want.forEach(x => { const ex = L.items.find(y => y.id === x.id); if (!ex) L.items.push(x); else if (ex.amt === ex.hamt){ ex.amt = x.amt; ex.hamt = x.amt; ex.for = x.for; } });
  return L;
}
// Today and Week: the shopping day and each timeline task on its own day.
function holAgenda(d){
  const G = holUse(), out = []; if (!G || !H()) return out; const st = holSt(), k = ymd(d);
  Object.keys(st.plans).forEach(id => { const p = st.plans[id], s = G.get(id); if (!s || !p || !p.date) return;
    if (G.buyDate(id, p.date) === k) out.push({key: 'hol:' + id + ':shop', k: 'hol', v: id, hour: 9.5, kick: 'Shopping day', title: 'Shop for ' + s.name, sub: 'Everything for ' + s.name + ' is on your Shopping List, marked ' + s.name + '.', btn: 'Open the List', hol: id});
    G.tasks(id, p.date, p.pick).forEach(t => { if (t.date !== k) return;
      out.push({key: 'hol:' + id + ':' + t.i, k: 'hol', v: id, hour: t.daysBefore ? 16 : 9 + t.i / 100, kick: t.daysBefore ? s.name + ' prep' : s.name, title: t.title,
        sub: (t.mins ? 'About ' + t.mins + ' minutes. ' : '') + (t.steps.length ? 'A calm voice guides each step.' : ''), btn: t.steps.length ? 'Guide Me' : 'Done', hol: id}); }); });
  return out;
}
function holWeekDay(d){ return holAgenda(d).map(x => ({key: x.key, title: x.title, set: (holGet(x.v) || {}).name || '', shop: /:shop$/.test(x.key), done: isDone(d, x.key)})); }
// The countdown cards: a ticked holiday about three weeks out, and every set up holiday until its day.
function holCards(){
  const G = holUse(); if (!G || !H()) return []; const st = holSt(), t = today(), out = [], seen = new Set();
  st.on.concat(Object.keys(st.plans)).forEach(id => { if (seen.has(id)) return; seen.add(id); const s = G.get(id); if (!s) return;
    const p = holPlan(id), planned = !!(p && p.date >= t), date = planned ? p.date : G.next(id, t); if (!date) return;
    const n = holDays(t, date); if (n < 0 || (!planned && (n > HOL_LEAD || st.skip[id] === date || !st.on.includes(id)))) return;
    const away = G.away(date, t), when = away === 'today' ? s.name + ' is today.' : s.name + ' is ' + away + '.';
    out.push({id, name: s.name, date, away, planned, days: n, guests: planned ? holGuests(id) : null, kick: planned ? 'Set for ' + holDay(date) : holDay(date),
      line: planned ? when + ' Your list and prep are on the calendar.' : when + ' Set it up?', btn: planned ? 'Open' : 'Set It Up', key: 'holset:' + id}); });
  return out.sort((a, b) => a.days - b.days);
}
function holCardsHtml(){
  return holCards().map(c => `<div class="tn-card a-kitchen hj-holc"><div class="tn-pc"><div class="tn-scene"><img src="${esc(WAY(HOL_ART.day + '-sq'))}" alt="" loading="lazy" decoding="async"></div><div style="min-width:0">
    <div class="tn-time">${esc(c.kick)}</div><h3>${esc(c.line)}</h3>${c.planned ? `<div class="tn-meta">For ${c.guests}. Shopping, prep, and every recipe, step by step.</div>` : `<div class="tn-meta">The shopping on your list, the prep on your calendar, and a calm voice for every recipe.</div>`}
    <div class="tn-acts"><button type="button" class="tn-btn sm" data-hja="go" data-hjv="${esc(c.key)}">${ic(c.planned ? 'arrow' : 'plus')}${esc(c.btn)}</button>${c.planned ? '' : `<button type="button" class="linkbtn" data-hja="holskip" data-hjv="${esc(c.id + '|' + c.date)}">Skip This Year</button>`}</div></div></div></div>`).join('');
}
// The kitchen guide for one timeline task (the steps it names, from each recipe) or one recipe.
function holTaskOv(id, i){
  const G = holUse(), s = G && G.get(id); if (!s) return null; const p = holPlan(id), date = (p && p.date) || holNext(id) || today(), t = G.tasks(id, date, p && p.pick).find(x => x.i === +i); if (!t) return null;
  if (!t.steps.length) return null; const N = holGuests(id), ings = [], base = +s.serves || N;
  t.menus.forEach(m => { const r = G.recipe(id, m, N); if (r) r.ingredients.forEach(g => ings.push(t.menus.length > 1 ? g + ' (' + r.name + ')' : g)); });
  return {k: 'cook', idea: true, hol: id, key: 'hol:' + id + ':' + t.i, title: t.title, sub: s.name + ' · ' + holShort(t.date) + (t.mins ? ' · about ' + t.mins + ' min' : ''),
    intro: t.daysBefore ? 'Getting ready for ' + holSay(s) + ': ' + holLc(t.title).replace(/[.!?]?$/, '.') : 'The day is here. We take it one step at a time.', outro: t.daysBefore ? HOL_OUT : '',
    data: {name: t.title, meal: 'holiday', art: t.daysBefore ? HOL_ART.ahead : HOL_ART.day, steps: t.steps.map(x => ({t: x.t, min: x.min, at: x.at || ''})), ingredients: ings,
      tip: N !== base && ings.length ? 'The ingredients are sized for ' + N + '. The steps name the amounts for ' + base + '.' : ''}};
}
function holRecOv(id, mid){
  const G = holUse(), s = G && G.get(id), r = G && G.recipe(id, mid, holGuests(id)); if (!r) return null;
  return {k: 'cook', idea: true, hol: id, key: 'holrec:' + id + ':' + mid, title: r.name, sub: s.name + (r.mins ? ' · ' + r.mins + ' minutes' : '') + ' · for ' + r.serves,
    data: {name: r.name, meal: 'holiday', art: HOL_ART.day, steps: r.steps.map(x => ({t: x.t, min: x.min})), ingredients: r.ingredients, serves: r.serves,
      tip: [r.makeAhead ? 'Make ahead: ' + r.makeAhead : '', r.serves !== r.baseServes ? 'The ingredients are sized for ' + r.serves + '. The steps name the amounts for ' + r.baseServes + '.' : ''].filter(Boolean).join(' ')}};
}
// Every hol key, from Today, Week, the cards, and the Home (GGHealth.act).
function holAct(key){
  const [k, id, b] = String(key || '').split(':'); if (!holGet(id)) return null;
  if (k === 'holset' || (k === 'hol' && b === 'shop' && !holPlan(id))){ S.holId = id; S.holEd = null; return holGo(); }
  if (k === 'hol' && b === 'shop'){ S.shopWk = holWeek(holUse().buyDate(id, holPlan(id).date)); S.shopEd = null; if (bareOn() || C.host === 'home') return want('shop'); S.sec = 'shop'; rerender(false); window.scrollTo(0, 0); return {section: 'shop'}; }
  const o = k === 'holrec' ? holRecOv(id, b) : holTaskOv(id, b); if (!o) return null; openOv(o); return {overlay: o.k, key: o.key};
}
function holGo(){ if (bareOn() || C.host === 'home') return want('holidays'); S.sec = 'holidays'; S.setup = false; rerender(false); window.scrollTo(0, 0); return {section: 'holidays'}; }
function holToggle(id){ const st = holSt(), i = st.on.indexOf(id); if (i >= 0) st.on.splice(i, 1); else if (holGet(id)) st.on.push(id); holKeep(); return st.on.includes(id); }
// My Holidays: one chip per set (the start-up Food step, Settings, and the Holidays section).
function holChips(){ const G = holUse(); if (!G) return ''; const on = holSt().on;
  return `<div class="hj-chips hj-holchips" role="group" aria-label="My Holidays">${G.sets.map(s => { const p = on.includes(s.id); return `<button type="button" class="chip${p ? ' on' : ''}" aria-pressed="${p}" data-hja="holtog" data-hjv="${esc(s.id)}">${esc(s.name)}</button>`; }).join('')}</div>`; }
function holPick(){ return holUse() ? `<h3 style="margin-top:20px">My Holidays</h3><p class="hj-sub">Choose the days you celebrate. About three weeks before each one, a card offers to set it up: the shopping on your list, the prep on your calendar, and every recipe guided step by step. Every set stays in the recipe library too.</p>${holChips()}` : ''; }
function holShelf(){ const G = holUse(); if (!G || KIT()) return ''; return `<button type="button" class="tn-card tn-lift tn-kc tn-art a-kitchen hj-holshelf" data-hja="holall"><span class="ill"><img src="${esc(WAY(HOL_ART.day + '-sq'))}" alt="" loading="lazy" decoding="async" width="600" height="600"></span><span class="tx"><span class="tn-time">${G.sets.length} sets</span><span class="h3">Holidays and Gatherings</span><span class="tn-meta">Thanksgiving to a backyard gathering: whole food menus, the shopping, the prep, and every recipe step by step.</span></span></button>`; }
function holSetCard(){ if (KIT() || !holUse()) return ''; const n = holSt().on.length;
  return `<div class="tn-card a-kitchen" id="tn-hol"><div class="tn-hd">${badge('star', 'a-kitchen')}<div><div class="tn-k a-kitchen">My Holidays</div><div class="tn-sub">${n ? n + ' chosen. ' : ''}A card about three weeks before each one offers to set it up.</div></div></div>${holChips()}
    <div class="tn-acts"><button type="button" class="tn-btn sm line" data-hja="holall">${ic('arrow')}Every Holiday Set</button></div></div>`; }
// The Holidays section: My Holidays, what is coming up, and every set; one set opens with its Set Up, timeline, and recipes.
function vHol(){
  const G = holUse(); if (!G) return `<div class="tn-sec a-kitchen"><p class="hj-note">The holiday sets are on their way. Open this page again in a moment.</p></div>`;
  const id = S.holId && G.get(S.holId) ? S.holId : '';
  const head = secHead('kitchen', 'a-kitchen', 'Holidays and Gatherings', 'Whole food menus for the big days, with the shopping, the prep, and a calm voice guiding every recipe.');
  if (id) return `<div class="tn-sec a-kitchen hj-hol">${head}${vHolSet(G, G.get(id))}</div>`;
  const cards = holCardsHtml();
  return `<div class="tn-sec a-kitchen hj-hol">${head}${cards ? `<div class="hj-holup">${cards}</div>` : ''}
    <div class="tn-card a-kitchen"><div class="tn-k">My Holidays</div><p class="tn-sub">Choose the days you celebrate. About three weeks before each one, a card on your Week offers to set it up.</p>${holChips()}</div>
    <div class="tn-kgrid hj-holgrid">${G.sets.map(s => { const p = holPlan(s.id), nx = holNext(s.id);
      return `<button type="button" class="tn-card tn-lift tn-kc tn-art a-kitchen" data-hja="go" data-hjv="holset:${esc(s.id)}"><span class="ill"><img src="${esc(WAY(HOL_ART.day + '-sq'))}" alt="" loading="lazy" decoding="async" width="600" height="600"></span><span class="tx"><span class="tn-time">${esc(p && p.date >= today() ? 'Set for ' + holShort(p.date) : nx ? holShort(nx) : G.whenText(s.id))}</span><span class="h3">${esc(s.name)}</span><span class="tn-meta">${esc(s.menu.length + ' recipes · ' + s.lead)}</span></span></button>`; }).join('')}</div></div>`;
}
function vHolSet(G, s){
  const id = s.id, p = holPlan(id), planned = !!(p && p.date >= today()), ready = !setupNeeded() && (U('food') || PUB()), ed = S.holEd && S.holEd.id === id ? S.holEd : null;
  const sug = G.suggestions ? G.suggestions(id, today()) : [], pick = (s.when || {}).rule === 'pick';
  const dateIn = ed ? ed.date : (planned ? p.date : holNext(id) || ''), N = ed ? ed.guests : holGuests(id), pk = (ed && ed.pick) || (p && p.pick) || (s.choose ? s.menu[0].id : '');
  const form = `<div class="tn-card a-kitchen hj-holform"><div class="tn-k">${planned ? 'Change the Day or Guests' : 'Set It Up'}</div>
    ${pick && !dateIn ? '<p class="tn-sub">Choose the day.</p>' : ''}${sug.length ? `<div class="hj-chips">${sug.map(x => `<button type="button" class="chip${dateIn === x.date ? ' on' : ''}" aria-pressed="${dateIn === x.date}" data-hja="holdate" data-hjv="${esc(x.date)}">${esc(x.name + ', ' + holShort(x.date))}</button>`).join('')}</div>` : ''}
    ${s.choose ? `<p class="tn-sub">Choose the dish you bring.</p><div class="hj-chips">${s.menu.map(m => { const on = pk === m.id; return `<button type="button" class="chip${on ? ' on' : ''}" aria-pressed="${on}" data-hja="holpick" data-hjv="${esc(m.id)}">${esc(m.name)}</button>`; }).join('')}</div>` : ''}
    <label class="hj-fld"><span>The day</span><input type="date" data-hjhol="date" value="${esc(dateIn)}" min="${esc(today())}"></label>
    <div class="tn-hhrow"><span>Guests at the table</span><div class="hj-stock"><button type="button" class="chip" data-hja="holg" data-hjv="-1" aria-label="One fewer"${N <= 1 ? ' disabled' : ''}>&minus;</button><span><b data-hjholn>${N}</b></span><button type="button" class="chip" data-hja="holg" data-hjv="1" aria-label="One more"${N >= 40 ? ' disabled' : ''}>+</button></div></div>
    <p class="tn-sub">The menu is written for ${esc(s.serves)}. The shopping list sizes every amount for your guests.</p>
    <div class="tn-acts"><button type="button" class="tn-btn sm" data-hja="holsave" data-hjv="${esc(id)}">${ic('check')}${planned ? 'Save the Change' : 'Set It Up'}</button>${ed ? `<button type="button" class="linkbtn" data-hja="holcancel">Close</button>` : ''}</div></div>`;
  const tasks = planned ? G.tasks(id, p.date, p.pick) : [], buy = planned ? G.buyDate(id, p.date) : '';
  const plan = planned ? `<div class="tn-card a-kitchen hj-holplan"><div class="tn-k">Set for ${esc(holDay(p.date))} · for ${N}${s.choose && p.pick ? ' · ' + esc((s.menu.find(m => m.id === p.pick) || {}).name || '') : ''}</div><p class="tn-sub">${esc(s.name + ' is ' + G.away(p.date, today()) + '.')}</p>
    <ol class="hj-holtl">${[{date: buy, i: -1}].concat(tasks).sort((x, y) => x.date < y.date ? -1 : x.date > y.date ? 1 : x.i - y.i).map(t => t.i < 0 ? `<li><b>${esc(holShort(buy))}</b><span>Shop: ${G.shop(id, p.guests, p.pick).length} items join Shop for Week ${letter(holWeek(buy))}, marked ${esc(s.name)}.</span><button type="button" class="linkbtn" data-hja="go" data-hjv="hol:${esc(id)}:shop">Open the List</button></li>`
      : `<li><b>${esc(holShort(t.date))}</b><span>${esc(t.title)}${t.mins ? ' · about ' + t.mins + ' min' : ''}</span>${t.steps.length ? `<button type="button" class="linkbtn" data-hja="go" data-hjv="hol:${esc(id)}:${t.i}">Guide Me</button>` : ''}</li>`).join('')}</ol>
    <div class="tn-acts"><button type="button" class="tn-btn sm line" data-hja="holedit" data-hjv="${esc(id)}">${ic('clock')}Change the Day or Guests</button><button type="button" class="linkbtn" data-hja="holclear" data-hjv="${esc(id)}">${S.holSure === id ? 'Tap Again to Take It Off My Calendar' : 'Take It Off My Calendar'}</button></div></div>` : '';
  const menu = `<div class="tn-card a-kitchen"><div class="tn-k">The Menu</div><div class="hj-holmenu">${s.menu.map(m => { const r = G.recipe(id, m.id, N);
    return `<details class="hj-doc"${S.open['hol:' + id + ':' + m.id] ? ' open' : ''} data-hjd="hol:${esc(id)}:${esc(m.id)}"><summary><span>${esc(m.name)}<small>${esc([m.course ? m.course[0].toUpperCase() + m.course.slice(1) : '', m.mins ? m.mins + ' min' : ''].filter(Boolean).join(' · '))}</small></span></summary><div class="hj-body">
      ${m.makeAhead ? `<p class="hj-sub"><b>Make ahead:</b> ${esc(m.makeAhead)}</p>` : ''}${m.card ? `<div class="hj-holcard"><b>Reheat Card</b><p>${esc(m.card)}</p><div class="row"><button type="button" class="btn btn-line btn-sm" data-hja="holcard" data-hjv="${esc(id + '|' + m.id)}">Share the Card</button><button type="button" class="btn btn-line btn-sm" data-hja="holcardprint" data-hjv="${esc(id + '|' + m.id)}">Print the Card</button></div></div>` : ''}${m.note ? `<p class="hj-sub">${esc(m.note)}</p>` : ''}<ul class="hj-ing">${arr(r && r.ingredients).map(g => `<li>${esc(g)}</li>`).join('')}</ul>
      <ol class="hj-steps hj-holsteps">${arr(m.steps).map(x => `<li><div>${esc(x.say)}</div></li>`).join('')}</ol></div></details>
      <div class="tn-acts hj-holgo"><button type="button" class="tn-btn sm line" data-hja="go" data-hjv="holrec:${esc(id)}:${esc(m.id)}">${ic('play')}Guide Me: ${esc(m.name)}</button>${mmHolBtn(id, m.id)}</div>`; }).join('')}</div></div>`;
  const tips = arr(s.tips).length ? `<div class="tn-card"><div class="tn-k">For a Calm, Healthy Day</div><ul class="hj-ing">${s.tips.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : '';
  return `<div class="row" style="margin:0 0 12px"><button type="button" class="btn btn-line btn-sm" data-hja="holall">Every Holiday Set</button></div>
    <div class="tn-card a-kitchen hj-holtop"><div class="tn-k">${esc(G.whenText(id))}</div><h3>${esc(s.name)}</h3><p class="tn-sub">${esc(s.lead)}</p>${s.note ? `<p class="tn-sub">${esc(s.note)}</p>` : ''}</div>
    ${ready ? (planned && !ed ? plan : form) : `<div class="tn-card a-kitchen"><p class="tn-sub">Start Tending, and this set can put its shopping on your list and its prep on your calendar. Every recipe below plays now.</p></div>`}
    ${menu}${tips}${holSrc(s.sources)}`;
}
// Sources: ids in shared/gg-sources.js, or {t, who, url} written in the set.
function holSrc(L){ L = arr(L).filter(Boolean); if (!L.length) return ''; if (L.every(x => typeof x === 'string')) return srcLine(L);
  const xs = L.filter(x => x && typeof x === 'object' && (x.t || x.title)); if (!xs.length) return '';
  return `<p class="hj-src">${xs.length > 1 ? 'Sources' : 'Source'}: ${xs.map(x => (x.url ? `<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.t || x.title)}</a>` : esc(x.t || x.title)) + (x.who ? ', ' + esc(x.who) : '')).join('; ')}</p>`; }
function actHol(a, v){
  switch (a){
    case 'holtog': holToggle(v); rerender(true); return true;
    case 'holall': S.holId = null; S.holEd = null; holGo(); return true;
    case 'holskip': { const [id, d] = String(v).split('|'); holSt().skip[id] = d; holKeep(); rerender(true); return true; }
    case 'holedit': { const p = holPlan(v); S.holEd = {id: v, date: p ? p.date : holNext(v) || '', guests: holGuests(v)}; rerender(true); return true; }
    case 'holpick': { const id = S.holId; S.holEd = S.holEd && S.holEd.id === id ? S.holEd : {id, date: (holPlan(id) || {}).date || holNext(id) || '', guests: holGuests(id)}; S.holEd.pick = v; rerender(true); return true; }
    case 'holcard': { const [id, mid] = String(v).split('|'), r = holUse() && holUse().recipe(id, mid, holGuests(id)); if (!r || !r.card) return true; const txt = r.name + '\n\n' + r.card;
      try { if (navigator.share){ navigator.share({title: r.name, text: txt}).catch(() => {}); return true; } } catch(e){}
      try { navigator.clipboard.writeText(txt).then(() => toast('The card is copied. Paste it into a note or a text.'), () => toast('Select the card text to copy it.')); } catch(e){ toast('Select the card text to copy it.'); } return true; }
    case 'holcardprint': { const [id, mid] = String(v).split('|'), r = holUse() && holUse().recipe(id, mid, holGuests(id)); if (!r || !r.card) return true; const w = window.open('', '_blank'); if (!w) return true;
      w.document.write('<!doctype html><meta charset="utf-8"><title>' + esc(r.name) + '</title><body style="font:18px/1.5 Georgia,serif;max-width:34em;margin:40px auto;padding:0 16px"><h1 style="font-size:26px">' + esc(r.name) + '</h1><p style="white-space:pre-wrap">' + esc(r.card) + '</p></body>'); w.document.close(); try { w.focus(); w.print(); } catch(e){} return true; }
    case 'holcancel': S.holEd = null; rerender(true); return true;
    case 'holdate': { const id = S.holId; S.holEd = S.holEd && S.holEd.id === id ? S.holEd : {id, date: '', guests: holGuests(id)}; S.holEd.date = v; rerender(true); return true; }
    case 'holg': { const id = S.holId; S.holEd = S.holEd && S.holEd.id === id ? S.holEd : {id, date: (holPlan(id) || {}).date || holNext(id) || '', guests: holGuests(id)};
      S.holEd.guests = Math.max(1, Math.min(40, S.holEd.guests + (+v || 0))); rerender(true); return true; }
    case 'holsave': { const id = v, s = holGet(id); if (!s) return true; const ed = S.holEd && S.holEd.id === id ? S.holEd : {date: (holPlan(id) || {}).date || holNext(id) || '', guests: holGuests(id)};
      if (!parseD(ed.date) || ed.date < today()){ toast('Choose the day first.'); return true; }
      const st = holSt(), pk0 = s.choose ? ed.pick || (holPlan(id) || {}).pick || s.menu[0].id : null; st.plans[id] = {date: ed.date, guests: Math.max(1, +ed.guests || +s.serves || 6), u: Date.now()}; if (pk0) st.plans[id].pick = pk0; if (!st.on.includes(id)) st.on.push(id); delete st.skip[id];
      S.holEd = null; S.holSure = null; holKeep(); const G = holUse(), wk = holWeek(G.buyDate(id, ed.date));
      toast(s.name + ' is set: the shopping is on the list for Week ' + letter(wk) + ', and the prep is on your calendar.'); rerender(true); return true; }
    case 'holclear': if (S.holSure !== v){ S.holSure = v; rerender(true); return true; } delete holSt().plans[v]; S.holSure = null; S.holEd = null; holKeep(); toast('Taken off your calendar. The set stays here whenever you want it.'); rerender(true); return true;
  }
  return false;
}
// The phone calendar file: the shopping day and each prep day of every set up holiday, once each.
function holIcs(stamp, e, fold){
  const G = holUse(), out = []; if (!G || !H()) return out; const st = holSt(), z = n => String(n).padStart(2, '0'), t = today();
  const ev = (uidKey, date, hour, title, desc) => { const d = parseD(date); if (!d) return; const hh = Math.floor(hour), mm = Math.round((hour - hh) * 60), when = d.getFullYear() + z(d.getMonth() + 1) + z(d.getDate()) + 'T' + z(hh) + z(mm) + '00';
    out.push(['BEGIN:VEVENT', 'UID:mh-hol-' + uidKey.replace(/[^a-z0-9-]/gi, '-') + '-' + when + '@growwithgrounded.com', 'DTSTAMP:' + stamp, 'DTSTART:' + when, 'DURATION:PT30M', 'SUMMARY:' + e('Tending: ' + title), 'DESCRIPTION:' + e(desc), 'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + e(title), 'TRIGGER:PT0M', 'END:VALARM', 'END:VEVENT'].map(fold).join('\r\n')); };
  Object.keys(st.plans).forEach(id => { const p = st.plans[id], s = G.get(id); if (!s || !p || !p.date || p.date < t) return;
    ev(id + '-shop', G.buyDate(id, p.date), 9.5, 'Shop for ' + s.name, 'Everything for ' + s.name + ' is on your Shopping List.');
    G.tasks(id, p.date, p.pick).forEach(x => ev(id + '-' + x.i, x.date, x.daysBefore ? 16 : 9, x.title + (x.daysBefore ? ' (' + s.name + ')' : ''), s.name + (x.mins ? ', about ' + x.mins + ' minutes' : '') + '. Open Tending for the step by step guide.')); });
  return out;
}
ACC.hol = 'a-kitchen'; SCN.hol = 'cook'; ITEM_ART.holiday = HOL_ART.day + '-sq';
document.addEventListener('input', e => { const t = e.target; if (!t || !t.dataset || !t.dataset.hjhol || !t.closest || !t.closest(ROOTS)) return; const id = S.holId; if (!id) return;
  S.holEd = S.holEd && S.holEd.id === id ? S.holEd : {id, date: (holPlan(id) || {}).date || holNext(id) || '', guests: holGuests(id)}; S.holEd[t.dataset.hjhol] = t.value; });
(function(){ const s = document.createElement('style'); s.id = 'hj-hol-css'; s.textContent = `
.hj-holchips{margin:8px 0 4px;}
.hj-holgrid{margin-top:14px;}
.hj-holtl{list-style:none;margin:10px 0 6px;padding:0;display:grid;gap:8px;}
.hj-holtl li{display:grid;grid-template-columns:minmax(92px,auto) minmax(0,1fr) auto;gap:10px;align-items:baseline;padding:8px 0;border-top:1px solid var(--line);}
.hj-holtl li b{font-weight:700;white-space:nowrap;}.hj-holtl li span{min-width:0;overflow-wrap:anywhere;}
.hj-holmenu details summary small{display:block;color:var(--ink-soft);font-size:13px;font-weight:400;margin-top:2px;}
.hj-holgo{margin:-4px 0 14px;}.hj-holgo .tn-btn{max-width:100%;white-space:normal;text-align:left;}
.hj-holup{display:grid;gap:12px;margin-bottom:14px;}
.hj-holcard{border:1px dashed var(--line);border-radius:12px;padding:10px 12px;margin:8px 0;}.hj-holcard p{white-space:pre-wrap;margin:6px 0 10px;}
@media (max-width:520px){.hj-holtl li{grid-template-columns:1fr;gap:2px;}}
`; document.head.appendChild(s); })();
holUse();
Object.assign(window.GGHealth, {
  // BLD 896: Holiday Sets for hosts. holidays() -> {on, cards: [{id, name, date, away, planned, days, guests, kick, line, btn, key}]}.
  holidays(){ try { if (!H()) return null; holUse(); return {on: holSt().on.slice(), cards: holCards()}; } catch(e){ return null; } },
  holToggle(id){ if (!H()) return false; const r = holToggle(String(id || '')); rerender(true); return r; },
  holOpen(id){ S.holId = id && holGet(id) ? id : null; S.holEd = null; }
});
// ---------- BLD 900, My Menu: add and swap recipes ----------
// Chris, October 31, 2026: "if you chose a recipe.. you can add it to your calendar menu and add it to shopping list.. for ex i want to
// make apple nachos for halloween.. add it to menu for today and shopping list.. so when i go to store later i get all ingredients and
// then i see the guide on Today for easy access later.. also could be good to be able to substitute other meals too.. this way we can
// customize menu and try new recipes". Every recipe view offers Add to My Menu: a day (Today first, the next 14 days, or any day on
// the calendar), a meal (Breakfast, Lunch, Dinner, Snack, or Extra), and servings for the table. Each planned meal offers Swap (for that
// day), and an added one offers Remove from My Menu, with Undo right after. Everything lives in DATA.health.menu on this device, in
// the same locked record as the rest of Tending (merged by GGHealth.merge with the newest copy winning):
//   {items: [{id, date, meal, ref, name, mins, serves, wk, swap, u}], u}
// ref names the recipe: 'r:<id>' a public recipe, 'h:<set>:<menu id>' a holiday recipe, 'g:<id>' a Guide library dinner, and
// 'i:<type>:<index>' a Guide library breakfast, lunch, or snack. wk is the Shopping List the ingredients join, set when the meal is
// added: the list shopped on the shop day before the meal, or the list shopped today when that day is today or already past.
// swap is the planned item the meal stands in for on its day ('cook:<week>:<id>' a dinner, 'idea:lunches:<i>' a lunch).
// The lists stay computed (mmMerge, after the holiday sets): an added recipe's ingredients join its list, merged by name and marked
// with the recipe's name; a swapped meal's own items step aside (kept in L.mmHold) unless another planned meal that week still uses
// them, or they are already in the cart. Today, Week, and the Month show each added meal on its day with Guide Me (the kitchen guide).
const MM_MEALS = [['breakfast', 'Breakfast'], ['lunch', 'Lunch'], ['dinner', 'Dinner'], ['snack', 'Snack'], ['extra', 'Extra']];
const MM_NAME = Object.fromEntries(MM_MEALS);
const MM_HOUR = {breakfast: 7.5, lunch: 12, snack: 15, extra: 15.5, dinner: 17};
const MM = {sheet: null, undo: null};
function MENU(){ const h = H(); if (!h) return {items: []}; const m = h.menu = h.menu && typeof h.menu === 'object' && !Array.isArray(h.menu) ? h.menu : {};
  m.items = arr(m.items).filter(x => x && x.id && parseD(x.date)); return m; }
const mmSave = () => { MENU().u = Date.now(); save(); };
const mmReady = () => !!(H() && FLDH() && !setupNeeded() && (U('food') || KIT()));
const mmTable = () => { const n = PUB() ? tableOf() : num((H() || {set: {}}).set.household); return n > 0 && n < 30 ? Math.round(n) : 6; };
const mmCap = t => String(t || '').replace(/^./, c => c.toUpperCase());
// ---- the recipe behind a ref ----
function mmRecipe(ref){
  const [k, a, b] = String(ref || '').split(':'), din = (APP() || {}).dinners || {};
  if (k === 'r'){ const r = recOf(a); return r && arr(r.steps).length ? {ref, src: 'r', r, name: r.name, meal: r.meal || 'dinner', mins: r.mins, base: +r.serves || 6, goals: arr(r.goals), fits: arr(r.fits)} : null; }
  if (k === 'h'){ const G = holUse(), s = G && G.get(a), m = s && arr(s.menu).find(x => x.id === b); return m && arr(m.steps).length ? {ref, src: 'h', set: s, m, name: m.name, meal: 'extra', mins: m.mins, base: +m.serves || +s.serves || 4, goals: [], fits: []} : null; }
  if (k === 'g'){ const wks = din.weeks || {}; for (const w of Object.keys(wks).sort()){ const x = arr((wks[w] || {}).dinners).find(z => z && z.id === a); if (x && arr(x.steps).length) return {ref, src: 'g', wk: w, x, name: x.name, meal: 'dinner', mins: x.mins, base: +x.serves || 6, goals: arr(x.goals), fits: arr(x.fits)}; } return null; }
  if (k === 'i'){ const x = arr(din[a])[+b]; return x && arr(x.steps).length ? {ref, src: 'i', ty: a, i: +b, x, name: x.name, meal: {breakfasts: 'breakfast', lunches: 'lunch', snacks: 'snack'}[a] || 'extra', mins: x.mins, base: +x.serves || 6, goals: arr(x.goals), fits: arr(x.fits)} : null; }
  return null;
}
const mmRefOfR = r => r.pub ? 'r:' + r.id : r.wk ? 'g:' + r.id : 'i:' + r.ty + ':' + r.i;
// The ingredient lines for N servings (each recipe scales from the size it is written for, with shared/gg-scale.js).
function mmIngs(R, N){
  if (R.src === 'r') return arr((window.GGScale ? GGScale.recipe(R.r, N) : R.r).ingredients);
  if (R.src === 'h'){ const r = holUse().recipe(R.set.id, R.m.id, N); return arr(r && r.ingredients); }
  const L = arr(R.x.ingredients), f = N / R.base; return Math.abs(f - 1) < 1e-9 || !window.GGScale ? L : L.map(l => typeof l === 'string' ? GGScale.line(l, f) : l);
}
// One shopping line from an ingredient line, for the Field Guide (public Tending uses GGTendPlan.shopList, the plan's own merge).
const MM_AMT = /^((?:about\s+)?(?:\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)(?:\s*(?:to|or)\s*(?:\d+\/\d+|\d+(?:\.\d+)?))?(?:\s*\([^)]*\))?(?:\s+(?:cans?|cups?|tbsp|tsp|lbs?|pounds?|oz|ounces?|cloves?|bunch(?:es)?|heads?|packages?|bags?|jars?|cartons?|pints?|quarts?|slices?|stalks?|sprigs?|handfuls?|pinch(?:es)?|containers?|blocks?|fillets?|large|medium|small|whole|dozen)\b)?)\s+(?:of\s+)?(.+)$/i;
const MM_SEC = [['Produce', /\b(lettuce|spinach|kale|greens|cabbage|broccoli|cauliflower|carrots?|celery|onions?|garlic|ginger|peppers?|tomato(es)?|cucumbers?|zucchini|squash|potato(es)?|mushrooms?|beans? green|green beans|asparagus|avocados?|lemons?|limes?|oranges?|apples?|bananas?|berries|grapes|pears?|cilantro|parsley|basil|dill|mint|thyme|rosemary|scallions?|herbs|fruit|vegetables|clementines?|pumpkin)\b/i],
  ['Meat and Fish', /\b(chicken|turkey|beef|pork|salmon|cod|shrimp|fish|tuna|trout|sausage|steak)\b/i], ['Eggs, Dairy, and Milks', /\b(eggs?|milk|yogurt|cheese|butter|kefir)\b/i], ['Bread and Tortillas', /\b(bread|tortillas?|buns?|pitas?|toast)\b/i], ['Frozen', /\bfrozen\b/i]];
function mmParse(line){
  const t = String(line || '').replace(/\s+/g, ' ').trim(); if (!t) return null; const m = MM_AMT.exec(t); let amt = '', name = t; if (m){ amt = m[1].trim(); name = m[2]; }
  name = name.replace(/\([^)]*\)/g, '').split(/,| for | plus /)[0].replace(/^(?:fresh|plain)\s+/i, '').trim(); if (!name || /^(water|ice|hot water|cold water)$/i.test(name)) return null;
  const sx = PUB() ? null : MM_SEC.find(([, re]) => re.test(name)); return {name: mmCap(name), amt, sec: sx ? sx[0] : PUB() ? 'Pantry' : 'Pantry'}; }
// A holiday recipe's ingredients come written as amounts and aisles, sized the way the holiday list sizes them.
function mmHolRows(R, N){ const G = holUse(), s = R.set, f = s.scale === false ? 1 : N / (+R.m.serves || +s.serves || N);
  return arr(R.m.ingredients).filter(g => g && g.item).map(g => { const q = g.qty == null ? null : G.scale(+g.qty * f, 1, g.unit || ''); return {name: mmCap(g.item), amt: q == null ? (g.unit || '') : G.amt(q, g.unit || ''), sec: g.aisle || 'Other'}; }); }
const mmKey = n => String(n).toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean).map(w => w.length > 3 && /ies$/.test(w) ? w.slice(0, -3) + 'y' : w.length > 3 && /oes$/.test(w) ? w.slice(0, -2) : w.length > 3 && /[^s]s$/.test(w) ? w.slice(0, -1) : w).join(' ');
const MM_FR = [[0.25, '1/4'], [1 / 3, '1/3'], [0.5, '1/2'], [2 / 3, '2/3'], [0.75, '3/4']];
const mmNum = s => { let m = /^(\d+)\s+(\d+)\/(\d+)$/.exec(s); if (m) return +m[1] + m[2] / m[3]; m = /^(\d+)\/(\d+)$/.exec(s); if (m) return m[1] / m[2]; return isFinite(+s) ? +s : null; };
const mmFmt = n => { const w = Math.floor(n + 1e-9), f = n - w, fr = MM_FR.find(([v]) => Math.abs(f - v) < 0.04); return f < 0.04 ? String(w) : fr ? (w ? w + ' ' : '') + fr[1] : String(Math.round(n * 10) / 10); };
function mmSum(amts){ const P = amts.map(a => { const m = /^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)\s*(.*)$/.exec(String(a || '').trim()); return m ? {q: mmNum(m[1]), u: m[2].toLowerCase().replace(/s$/, '')} : null; });
  if (P.length > 1 && P.every(p => p && p.q != null) && new Set(P.map(p => p.u)).size === 1){ const tot = P.reduce((s, p) => s + p.q, 0), u = P[0].u; return mmFmt(tot) + (u ? ' ' + u + (tot > 1 && u && !/oz|tbsp|tsp|lb|g$/.test(u) ? 's' : '') : ''); }
  return amts.filter(Boolean).join(' + '); }
// Every added recipe for one list, merged into shopping lines {name, amt, sec, for}.
function mmShopRows(entries){
  const P = TP(), recs = [];
  entries.forEach(e => { const R = mmRecipe(e.ref); if (!R) return; const N = Math.max(1, +e.serves || mmTable());
    if (R.src === 'h') recs.push({name: R.name, rows: mmHolRows(R, N)});
    else if (R.src === 'i' && !arr(R.x.ingredients).length) recs.push({name: R.name, rows: arr(R.x.shop).map(g => ({name: g.name, amt: g.amt || '', sec: g.sec || 'Other'}))});
    else recs.push({name: R.name, ings: mmIngs(R, N)}); });
  if (!recs.length) return [];
  if (P && P.shopList && PUB()) return P.shopList({dinners: recs.map(r => r.rows ? {name: r.name, shop: r.rows} : {name: r.name, ingredients: r.ings})});
  const map = new Map();
  recs.forEach(r => (r.rows || arr(r.ings).map(mmParse).filter(Boolean)).forEach(x => { const k = mmKey(x.name), cur = map.get(k);
    if (!cur){ map.set(k, {name: x.name, sec: x.sec, amts: [x.amt], for: [r.name]}); return; } cur.amts.push(x.amt); if (!cur.for.includes(r.name)) cur.for.push(r.name); }));
  return [...map.values()].map(v => ({name: v.name, amt: mmSum(v.amts), sec: v.sec, for: v.for.join(', ')}));
}
// ---- days, weeks, and the planned meals ----
const mmMealWeek = d => Math.max(1, d.getDay() === 0 ? foodWeek(d) : weekNo(d));
function mmListWeek(date){ const d = parseD(date); if (!d) return Math.max(1, foodWeek(new Date())); const w = mmMealWeek(d); return ymd(shopDate(w)) <= today() ? Math.max(1, foodWeek(new Date())) : w; }
const mmWeekDays = n => { const mon = addD(startMon(), (Math.max(1, n) - 1) * 7); return [-1, 0, 1, 2, 3, 4, 5].map(i => addD(mon, i)); };
const mmSwapOf = (d, key) => { const k = ymd(d); return MENU().items.find(x => x.swap === key && x.date === k) || null; };
// The planned meals of one day that Swap can change: tonight's dinner and the day's lunch.
function mmPlanned(d){
  const out = []; if (!H() || !U('food')) return out; const din = (APP() || {}).dinners || {};
  const dn = dinnerFor(d); if (dn) out.push({key: 'cook:' + dn.wk + ':' + dn.id, meal: 'dinner', name: dn.name, ref: dn.leftover || dn.id === 'leftovers' ? '' : PUB() ? 'r:' + dn.id : 'g:' + dn.id, x: dn});
  const L = arr(din.lunches); if (L.length){ const i = ((d.getDay() + 6) % 7) % L.length, x = L[i]; if (x) out.push({key: 'idea:lunches:' + i, meal: 'lunch', name: x.name, ref: PUB() ? (x.id ? 'r:' + x.id : '') : 'i:lunches:' + i, x}); }
  return out;
}
const mmDinner = d => { const dn = dinnerFor(d); return dn && mmSwapOf(d, 'cook:' + dn.wk + ':' + dn.id) ? null : dn; };
// Plain words for matching a Guide list's items to a recipe (its lines name stores and brands, so names rarely match exactly).
const MM_STOP = new Set('fresh wild frozen large small medium whole raw cooked chopped minced sliced diced lean low no added organic boneless skinless and or of the a an with for plus to taste cup cups tbsp tsp lb lbs oz can cans pack bag dozen x extra virgin plain unsweetened natural light dark sodium free reduced pure baby mini thin thick peeled trimmed rinsed drained cut inch pieces piece into each about dinner night lunch lunches breakfast snack week weekly batch tonight sunday monday tuesday wednesday thursday friday saturday kirkland costco block part skim style bunch head jar jars packet packets package container bottle box loaf fillets fillet'.split(' '));
const mmWords = t => new Set(mmKey(String(t || '').replace(/\d+/g, ' ')).split(' ').filter(w => w.length > 2 && !MM_STOP.has(w)));
const mmShare = (a, b) => { for (const w of a) if (b.has(w)) return true; return false; };
function mmRecWords(p){ const R = p.ref ? mmRecipe(p.ref) : null, x = R ? (R.x || R.r || {}) : p.x || {}, L = arr(x.ingredients).map(l => (mmParse(l) || {}).name || '').concat(arr(x.shop).map(g => g && g.name)); const w = new Set(); L.forEach(t => mmWords(t).forEach(v => w.add(v))); return w; }
// Week n's swapped and still planned meals: null when nothing in that week is swapped.
function mmHoldInfo(n){
  const out = [], keep = []; mmWeekDays(n).forEach(d => mmPlanned(d).forEach(p => (mmSwapOf(d, p.key) ? out : keep).push(p)));
  if (!out.length) return null; const din = (APP() || {}).dinners || {};
  ['breakfasts', 'snacks'].forEach(t => arr(din[t]).forEach((x, i) => keep.push({name: x.name, ref: PUB() ? (x.id ? 'r:' + x.id : '') : 'i:' + t + ':' + i, x})));
  return {out, keep, outN: new Set(out.map(p => p.name)), keepN: new Set(keep.map(p => p.name))};
}
function mmHeld(x, I){
  if (!x || x.done || x.own || x.hol || x.mm || !/^[sw]\d+$/.test(String(x.id || ''))) return false;
  // Public lists name each recipe in full (names can hold commas): held when only swapped meals remain once their names are taken out.
  if (PUB() && x.for){ const f = String(x.for); if ([...I.outN].some(nm => I.keepN.has(nm) && f.includes(nm))) return false; let s = f, hit = false;
    [...I.outN].sort((p, q) => q.length - p.length).forEach(nm => { if (s.includes(nm)){ hit = true; s = s.split(nm).join(''); } }); return hit && !/[a-z]/i.test(s); }
  // The Guide library's lists: the item matches a swapped meal by its words, no meal still planned uses it, and its note names nothing else.
  I.ow = I.ow || I.out.map(mmRecWords); I.kw = I.kw || I.keep.map(mmRecWords); const w = mmWords(x.name);
  if (!w.size || !I.ow.some(o => mmShare(w, o)) || I.kw.some(k => mmShare(w, k))) return false;
  if (!I.of){ I.of = new Set(); I.out.forEach(p => { const R = p.ref ? mmRecipe(p.ref) : null, x = R ? (R.x || R.r || {}) : p.x || {}; [p.name].concat(arr(x.ingredients)).forEach(l => mmWords(l).forEach(v => I.of.add(v))); }); }
  const rest = mmWords(String(x.for || '').replace(/\([^)]*\)/g, '')); I.of.forEach(v => rest.delete(v)); w.forEach(v => rest.delete(v));
  return rest.size === 0;
}
// Merge My Menu into week n's list: menu lines rebuilt each time (their checks kept by id), swapped items held aside or back.
function mmMerge(L, n){
  if (!H()) return L; n = Math.max(1, n); const adds = MENU().items.filter(e => +e.wk === n), I = mmHoldInfo(n);
  const had = L && (arr(L.items).some(x => x && (x.mm || x.mmx)) || arr(L.mmHold).length);
  if (!adds.length && !I && !had) return L;
  L = L || {seed: true, items: []}; const done = {};
  arr(L.items).forEach(x => { if (x && x.mm) done[x.id] = !!x.done; });
  L.items = arr(L.items).filter(x => x && !x.mm).concat(arr(L.mmHold)); L.items.forEach(x => { delete x.mmx; }); L.mmHold = [];
  if (I){ const keepI = []; L.items.forEach(x => (mmHeld(x, I) ? L.mmHold : keepI).push(x)); L.items = keepI; }
  mmShopRows(adds).forEach((r, i) => { const k = mmKey(r.name), ex = L.items.find(x => !x.mm && !x.done && mmKey(x.name) === k);
    if (ex){ ex.mmx = {amt: r.amt || '', for: r.for || ''}; return; }
    const id = 'mm:' + k.replace(/\s+/g, '-'); L.items.push({id, mm: 1, store: 'grocer', sec: holSec(r.sec), name: r.name, amt: r.amt || '', price: 0, for: r.for || '', done: !!done[id], n: 700 + i}); });
  if (!L.mmHold.length) delete L.mmHold;
  return L;
}
// The list shows a merged item's amounts and names together.
function mmAmt(x){ return x && x.mmx && x.mmx.amt ? (x.amt ? mmSum([x.amt, x.mmx.amt]) : x.mmx.amt) : String((x && x.amt) || ''); }
function mmFor(x){ return x && x.mmx && x.mmx.for ? (x.for ? x.for + ', ' + x.mmx.for : x.mmx.for) : String((x && x.for) || ''); }
// ---- Today, Week, and the Month ----
const mmArt = e => { const m = e.meal === 'extra' ? ((mmRecipe(e.ref) || {}).meal || 'extra') : e.meal; return m === 'lunch' ? 'meal-lunch-sq' : m === 'breakfast' || m === 'snack' ? 'weekly-batch-sq' : m === 'party' ? 'kitchen-headstart-sq' : m === 'drink' ? 'tend-people' : dinnerArtName({name: e.name}) || 'todays-plate-sq'; };
const mmSub = e => (e.swap ? 'Swapped in for this day' : 'From My Menu') + (e.mins ? ', ' + e.mins + ' minutes' : '') + ', for ' + e.serves + '.';
function mmAgenda(d){ if (!H() || !U('food')) return []; const k = ymd(d);
  return MENU().items.filter(e => e.date === k).map(e => ({key: 'menu:' + e.id, k: 'menu', v: e.id, mm: e, hour: MM_HOUR[e.meal] || 15.5, kick: MM_NAME[e.meal] || 'Extra', title: e.name, sub: mmSub(e), btn: 'Guide Me', did: true})); }
const mmDayList = d => mmAgenda(d).map(x => ({key: x.key, id: x.v, title: x.title, meal: x.kick, done: isDone(d, x.key), swap: !!x.mm.swap}));
function mmPills(d){ return mmDayList(d).map(x => `<button type="button" class="hj-pill food hj-mmp" data-hja="go" data-hjv="${esc(x.key)}">${esc(x.title)} <small>${esc(x.meal)}${x.done ? ', done' : ''}</small></button>`).join(''); }
function mmToday(date){
  const out = apiToday(date); if (!Array.isArray(out) || !mmReady() || !U('food')) return out; const d = dayOf(date), d1 = addD(d, 1), tn = dinnerFor(d1);
  const L = out.filter(x => !(/^idea:lunches:/.test(x.key) && mmSwapOf(d, x.key)) && !(/^head:/.test(x.key) && tn && mmSwapOf(d1, 'cook:' + tn.wk + ':' + tn.id)));
  mmAgenda(d).forEach(x => L.push({key: x.key, when: x.kick, hour: x.hour, title: x.title, sub: x.sub, btn: 'Guide Me', done: isDone(d, x.key), tint: x.mm.meal === 'dinner' ? TINT.cook : TINT.meals, kind: x.mm.meal === 'dinner' ? 'cook' : 'meal', image: WAY(mmArt(x.mm)), menu: x.v}));
  return L.map((x, i) => [x, i]).sort((a, b) => (a[0].hour - b[0].hour) || (a[1] - b[1])).map(x => x[0]);
}
function mmWeek(n){
  const w = apiWeek(n); if (!w || !Array.isArray(w.days) || !H()) return w;
  w.days.forEach(day => { const d = parseD(day.date); if (!d) return; const L = mmDayList(d);
    if (day.dinner && /^cook:/.test(day.dinner.key || '') && mmSwapOf(d, day.dinner.key)) day.dinner = null;
    const sw = L.find(x => x.swap && x.meal === 'Dinner');
    if (!day.dinner && sw){ const nm = dinnerArtName({name: sw.title}); day.dinner = {title: sw.title, key: sw.key, mins: null, leftover: false, done: sw.done, image: WAY(nm || ITEM_ART.cook), night: nm ? WAY(nm) : null}; }
    day.menu = L.filter(x => x !== sw); });
  return w;
}
// ---- the kitchen guide for an added meal ----
function mmOv(id){
  const e = MENU().items.find(x => x.id === id), R = e && mmRecipe(e.ref); if (!R) return null; const N = Math.max(1, +e.serves || mmTable()), key = 'menu:' + e.id, idea = e.meal !== 'dinner';
  let o = null;
  if (R.src === 'r'){ const x = ideaOf(R.r); if (!x) return null; Object.assign(x, {ingredients: mmIngs(R, N), serves: undefined, meal: e.meal === 'extra' ? R.meal : e.meal});
    o = {k: 'cook', idea, key, title: R.name, sub: (R.mins ? R.mins + ' minutes · ' : '') + 'for ' + N, data: x}; }
  else if (R.src === 'h'){ const r = holUse().recipe(R.set.id, R.m.id, N); if (!r) return null;
    o = {k: 'cook', idea: true, hol: R.set.id, key, title: r.name, sub: R.set.name + (r.mins ? ' · ' + r.mins + ' minutes' : '') + ' · for ' + r.serves,
      data: {name: r.name, meal: 'holiday', art: HOL_ART.day, steps: r.steps.map(x => ({t: x.t, min: x.min})), ingredients: r.ingredients, serves: r.serves, tip: [r.makeAhead ? 'Make ahead: ' + r.makeAhead : '', r.serves !== r.baseServes ? 'The ingredients are sized for ' + r.serves + '. The steps name the amounts for ' + r.baseServes + '.' : ''].filter(Boolean).join(' ')}}; }
  else if (R.src === 'g'){ const c = cookOv(R.wk, R.x.id); if (!c) return null; o = Object.assign(c, {key, idea, data: Object.assign({}, c.data, {ingredients: mmIngs(R, N)}), sub: (c.sub ? c.sub + ' · ' : '') + 'for ' + N}); }
  else { const c = ideaOv(R.ty, R.i); if (!c) return null; o = Object.assign(c, {key, data: Object.assign({}, c.data, {ingredients: mmIngs(R, N)})}); }
  o.mm = e.id; return o;
}
// ---- what an open kitchen guide can do: Add to My Menu, Swap, Remove ----
function mmFindDay(key){ const t = day0(new Date()); for (const i of [...Array(35).keys(), ...[-1, -2, -3, -4, -5, -6].map(x => x)]){ const d = addD(t, i), dn = dinnerFor(d); if (dn && 'cook:' + dn.wk + ':' + dn.id === key) return d; } return t; }
function mmOvInfo(o){
  if (!o || o.k !== 'cook' || o.peek || !mmReady()) return null; const key = String(o.key || ''), [k, a, b] = key.split(':'), din = (APP() || {}).dinners || {};
  if (k === 'menu'){ const e = MENU().items.find(x => x.id === a); return e ? {entry: e} : null; }
  if (k === 'cook'){ const d = mmFindDay(key), p = mmPlanned(d).find(x => x.key === key); return {ref: p ? p.ref : '', slot: key, date: ymd(d)}; }
  if (k === 'idea' && a === 'lunches' && U('food')){ const x = arr(din.lunches)[+b]; return {ref: x ? (PUB() ? (x.id ? 'r:' + x.id : '') : 'i:lunches:' + b) : '', slot: key, date: today()}; }
  if (k === 'idea' && a === 'recipe'){ const r = recipesAll().find(z => z.id === b); return r ? {ref: mmRefOfR(r)} : null; }
  if (k === 'idea'){ const x = arr(din[a])[+b]; return x ? {ref: PUB() ? (x.id ? 'r:' + x.id : '') : 'i:' + a + ':' + b} : null; }
  if (k === 'holrec') return {ref: 'h:' + a + ':' + b};
  return null;
}
const mmBtn = (a, v, l, cls) => `<button type="button" class="btn ${cls || 'btn-line'} btn-sm" data-mma="${a}" data-mmv="${esc(v)}">${esc(l)}</button>`;
function mmOvBtns(o){ const I = mmOvInfo(o); if (!I) return ''; const b = [];
  if (I.entry){ b.push(mmBtn('swap', 'menu:' + I.entry.id, 'Swap')); b.push(mmBtn('remove', I.entry.id, 'Remove from My Menu')); }
  else { if (I.ref && mmRecipe(I.ref)) b.push(mmBtn('add', I.ref, 'Add to My Menu')); if (I.slot) b.push(mmBtn('swap', I.slot + '|' + I.date, 'Swap')); }
  return b.length ? `<div class="hj-mmacts">${b.join('')}</div>` : ''; }
const mmHolBtn = (id, mid) => mmReady() && mmRecipe('h:' + id + ':' + mid) ? `<button type="button" class="linkbtn" data-mma="add" data-mmv="${esc('h:' + id + ':' + mid)}">Add to My Menu</button>` : '';
// ---- changes ----
function mmSnap(){ MM.undo = JSON.stringify(MENU().items); }
// Each list's items by id, and whether My Menu adds to it: an item leaves or arrives, or a menu amount joins or leaves one already there.
function mmLists(weeks){ const ids = new Map(); [...new Set(weeks.filter(n => n >= 1))].forEach(n => { const L = shopList(n); arr(L && L.items).forEach(x => ids.set(n + '|' + x.id, !!x.mmx)); }); return ids; }
function mmDiff(before, after){ let gone = 0, came = 0; before.forEach((m, k) => { if (!after.has(k) || (m && !after.get(k))) gone++; }); after.forEach((m, k) => { if (!before.has(k) || (m && !before.get(k))) came++; }); return {gone, came}; }
const mmWeeksOf = e => e ? [+e.wk, mmMealWeek(parseD(e.date))] : [];
function mmAdd(ref, date, meal, serves){ const R = mmRecipe(ref); if (!R || !parseD(date)) return null; mmSnap();
  const e = {id: 'm' + uid(), date, meal: MM_NAME[meal] ? meal : 'extra', ref, name: R.name, mins: R.mins || null, serves: Math.max(1, Math.min(40, Math.round(+serves || mmTable()))), wk: mmListWeek(date), u: Date.now()};
  const b = mmLists([e.wk]); MENU().items.push(e); mmSave(); return {e, d: mmDiff(b, mmLists([e.wk]))}; }
function mmSwap(target, ref){
  const R = mmRecipe(ref), M = MENU(); if (!R) return null; let e, old = '', date;
  if (/^menu:/.test(target)){ e = M.items.find(x => x.id === target.slice(5)); if (!e) return null; date = e.date; old = e.name; }
  else { const i = target.lastIndexOf('|'), key = target.slice(0, i); date = target.slice(i + 1); const d = parseD(date); if (!d) return null;
    const p = mmPlanned(d).find(x => x.key === key); old = p ? p.name : ''; e = M.items.find(x => x.swap === key && x.date === date) || null;
    if (!e){ mmSnap(); const nw = {id: 'm' + uid(), date, meal: p ? p.meal : 'dinner', ref, name: R.name, mins: R.mins || null, serves: mmTable(), wk: mmListWeek(date), swap: key, u: Date.now()};
      const wk = mmWeeksOf(nw), b = mmLists(wk); M.items.push(nw); mmSave(); return {e: nw, old, d: mmDiff(b, mmLists(wk))}; } }
  mmSnap(); const wk0 = mmWeeksOf(e), back = e.swap && (mmPlanned(parseD(e.date)).find(x => x.key === e.swap) || {}).ref === ref;
  const nw = Object.assign({}, e, {ref, name: R.name, mins: R.mins || null, wk: mmListWeek(e.date), u: Date.now()}), wk = wk0.concat(mmWeeksOf(nw)), b = mmLists(wk);
  // Swapping back to the planned recipe simply returns the day to the plan.
  if (back) M.items.splice(M.items.indexOf(e), 1); else Object.assign(e, nw);
  mmSave(); return {e: nw, old, back, d: mmDiff(b, mmLists(wk))};
}
function mmRemove(id){ const M = MENU(), e = M.items.find(x => x.id === id); if (!e) return null; mmSnap(); const wk = mmWeeksOf(e), b = mmLists(wk); M.items.splice(M.items.indexOf(e), 1); mmSave(); return {e, d: mmDiff(b, mmLists(wk))}; }
function mmUndo(){ if (MM.undo == null) return false; try { MENU().items = JSON.parse(MM.undo); } catch(e){ return false; } MM.undo = null; mmSave(); return true; }
// ---- the sheet: Add to My Menu, Swap, and what changed ----
const mmDayName = s => { const d = parseD(s); if (!d) return ''; const t = today(), n = Math.round((day0(d) - day0(new Date())) / DAYMS); return s === t ? 'Today' : n === 1 ? 'Tomorrow' : DOW[d.getDay()] + ', ' + MONTHS[d.getMonth()].slice(0, 3) + ' ' + d.getDate(); };
const mmLong = s => { const d = parseD(s); return d ? (s === today() ? 'Today, ' : '') + DOWL[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate() : ''; };
function mmListLine(date){ const n = mmListWeek(date), sd = ymd(shopDate(n)), t = today();
  return sd === t ? `The ingredients join today's Shopping List, Shop for Week ${letter(n)}.` : sd < t ? `The ingredients join this week's Shopping List, Shop for Week ${letter(n)}, for a quick trip.` : `The ingredients join Shop for Week ${letter(n)}, the list for ${mmLong(sd)}.`; }
function mmOpenAdd(ref, o){ const R = mmRecipe(ref); if (!R) return false; o = o || {};
  MM.sheet = {kind: 'add', ref, name: R.name, date: o.date && parseD(o.date) && o.date >= today() ? o.date : today(), meal: MM_NAME[o.meal] ? o.meal : MM_NAME[R.meal] ? R.meal : R.meal === 'party' ? 'snack' : 'extra', serves: Math.max(1, Math.min(40, Math.round(+o.serves || mmTable()))), other: false};
  mmPaint(); return true; }
function mmOpenSwap(target){
  let cur = '', meal = 'dinner', date = '';
  if (/^menu:/.test(target)){ const e = MENU().items.find(x => x.id === target.slice(5)); if (!e) return false; cur = e.ref; meal = e.meal; date = e.date; }
  else { const i = target.lastIndexOf('|'), key = target.slice(0, i); date = target.slice(i + 1); const d = parseD(date), p = d && mmPlanned(d).find(x => x.key === key); if (!p) return false; meal = p.meal; cur = p.ref; }
  const R = cur ? mmRecipe(cur) : null, cn = R ? R.name : (/^menu:/.test(target) ? '' : (mmPlanned(parseD(date)).find(x => target.indexOf(x.key + '|') === 0) || {}).name || '');
  MM.sheet = {kind: 'swap', target, cur, curName: cn, meal, date, q: '', goals: [], fits: []}; mmPaint(); setTimeout(() => { const q = document.getElementById('hj-mmq'); if (q) try { q.focus({preventScroll: true}); } catch(e){} }, 30); return true; }
function mmChoices(s){
  const q = String(s.q || '').toLowerCase().split(/\s+/).filter(Boolean);
  return recipesAll().filter(r => (s.meal === 'extra' || r.meal === s.meal) && mmRefOfR(r) !== s.cur && s.goals.every(g => r.goals.includes(g)) && s.fits.every(f => r.fits.includes(f))
    && q.every(w => (r.name + ' ' + r.ing.join(' ')).toLowerCase().includes(w))); }
const mmChip = (a, v, l, on) => `<button type="button" class="hj-mmc${on ? ' on' : ''}" aria-pressed="${!!on}" data-mma="${a}" data-mmv="${esc(v)}">${esc(l)}</button>`;
const mmHead = (k, t) => `<div class="hj-mmhd"><div style="min-width:0"><div class="hj-mmk">${esc(k)}</div><h3 id="hj-mmt">${esc(t)}</h3></div><button type="button" class="hj-mmx" data-mma="close" aria-label="Close">&times;</button></div>`;
function mmRowsHtml(s){ const L = mmChoices(s); if (!L.length) return `<p class="hj-mmsub">Clear the search or a filter to see more recipes.</p>`;
  const ML = Object.fromEntries(R_MEALS); return L.slice(0, 80).map(r => `<button type="button" class="hj-mmrow" data-mma="pick" data-mmv="${esc(mmRefOfR(r))}"><b>${esc(r.name)}</b><small>${esc([ML[r.meal] || 'Dinner', r.mins ? r.mins + ' min' : ''].filter(Boolean).join(' · '))}</small></button>`).join(''); }
function mmSheetHtml(s){
  if (s.kind === 'add'){ const t = today(), days = Array.from({length: 14}, (x, i) => ymd(addD(day0(new Date()), i))), inList = days.includes(s.date);
    return `${mmHead('Add to My Menu', s.name)}
      <div class="hj-mmq" id="hj-mmq1">Day</div><div class="hj-mmchips" role="group" aria-labelledby="hj-mmq1">${days.map(k => mmChip('day', k, mmDayName(k), s.date === k)).join('')}${mmChip('dayother', '', inList ? 'Another Day' : mmDayName(s.date), !inList)}</div>
      ${s.other || !inList ? `<label class="hj-mmfld"><span>Any day on the calendar</span><input type="date" data-mmi="date" min="${esc(t)}" value="${esc(s.date)}"></label>` : ''}
      <div class="hj-mmq" id="hj-mmq2">Meal</div><div class="hj-mmchips" role="group" aria-labelledby="hj-mmq2">${MM_MEALS.map(([k, l]) => mmChip('meal', k, l, s.meal === k)).join('')}</div>
      <div class="hj-mmq">Servings</div><div class="hj-mmsrv"><button type="button" class="hj-mmc" data-mma="srv" data-mmv="-1" aria-label="One fewer"${s.serves <= 1 ? ' disabled' : ''}>&minus;</button><b aria-live="polite">${s.serves}</b><button type="button" class="hj-mmc" data-mma="srv" data-mmv="1" aria-label="One more"${s.serves >= 40 ? ' disabled' : ''}>+</button><span>${s.serves === mmTable() ? 'Your table' : 'Sized for ' + s.serves}</span></div>
      <p class="hj-mmsub">${esc(mmListLine(s.date))} It shows on ${esc(mmLong(s.date))} with Guide Me.</p>
      <div class="hj-mmbtns"><button type="button" class="hj-mmgo" data-mma="addgo">Add to My Menu</button><button type="button" class="hj-mmline" data-mma="close">Close</button></div>`; }
  if (s.kind === 'swap'){ const all = recipesAll(), goals = R_GOALS.filter(([id]) => all.some(r => r.goals.includes(id))), fits = R_FITS.filter(([id]) => all.some(r => r.fits.includes(id)));
    return `${mmHead('Swap ' + (MM_NAME[s.meal] || 'Meal'), mmLong(s.date))}
      ${s.curName ? `<div class="hj-mmcur"><small>On the menu now</small><b>${esc(s.curName)}</b></div>` : ''}
      <label class="hj-mmfld"><span>Search by name or ingredient</span><input id="hj-mmq" type="search" data-mmi="q" value="${esc(s.q)}" placeholder="Chicken, lentils, salmon..." autocomplete="off"></label>
      ${goals.length ? `<div class="hj-mmq">Goal</div><div class="hj-mmchips" role="group" aria-label="Goal">${goals.map(([id, l]) => mmChip('mgoal', id, l, s.goals.includes(id))).join('')}</div>` : ''}
      ${fits.length ? `<div class="hj-mmq">Fits</div><div class="hj-mmchips" role="group" aria-label="Fits">${fits.map(([id, l]) => mmChip('mfit', id, l, s.fits.includes(id))).join('')}</div>` : ''}
      <p class="hj-mmsub">The swap is for ${esc(mmLong(s.date))}, and the Shopping List follows along.</p>
      <div class="hj-mmlist" id="hj-mmlist">${mmRowsHtml(s)}</div>`; }
  return `${mmHead(s.kick || 'My Menu', s.title || '')}${arr(s.lines).map(l => `<p class="hj-mmsub">${esc(l)}</p>`).join('')}
    <div class="hj-mmbtns"><button type="button" class="hj-mmgo" data-mma="close">Done</button>${s.undo ? `<button type="button" class="hj-mmline" data-mma="undo">Undo</button>` : ''}</div>`;
}
function mmPaint(){
  const s = MM.sheet; let el = document.getElementById('hj-mm');
  if (!s){ if (el) el.remove(); return; }
  if (!el){ el = document.createElement('div'); el.id = 'hj-mm'; document.body.appendChild(el); }
  el.innerHTML = `<div class="hj-mmbg" data-mma="close"></div><div class="hj-mmsh" role="dialog" aria-modal="true" aria-labelledby="hj-mmt">${mmSheetHtml(s)}</div>`;
}
const mmCount = (n, one, many) => n + ' ' + (n === 1 ? one : many);
function mmDone(kick, title, lines, undo){ MM.sheet = {kind: 'done', kick, title, lines, undo}; mmPaint(); rerender(true); setTimeout(() => { const b = document.querySelector('#hj-mm .hj-mmgo'); if (b) try { b.focus({preventScroll: true}); } catch(e){} }, 30); }
function mmAct(a, v){
  const s = MM.sheet;
  switch (a){
    case 'add': if (!mmOpenAdd(v, {})) toast('That recipe is on its way. Open it again in a moment.'); return;
    case 'close': MM.sheet = null; mmPaint(); return;
    case 'day': if (s){ s.date = v; s.other = false; mmPaint(); } return;
    case 'dayother': if (s){ s.other = true; mmPaint(); const i = document.querySelector('#hj-mm [data-mmi="date"]'); if (i) try { i.focus(); } catch(e){} } return;
    case 'meal': if (s){ s.meal = v; mmPaint(); } return;
    case 'srv': if (s){ s.serves = Math.max(1, Math.min(40, s.serves + (+v || 0))); mmPaint(); } return;
    case 'addgo': { if (!s || !parseD(s.date) || s.date < today()){ toast('Choose a day from today on.'); return; }
      const r = mmAdd(s.ref, s.date, s.meal, s.serves); if (!r){ toast('That recipe is on its way. Open it again in a moment.'); return; }
      const n = r.e.wk, came = r.d.came;
      mmDone('Added to My Menu', r.e.name, [mmLong(r.e.date) + ', ' + (MM_NAME[r.e.meal] || 'Extra') + ', for ' + r.e.serves + '. It waits on Today with Guide Me.',
        (came ? mmCount(came, 'ingredient joins', 'ingredients join') + ' Shop for Week ' + letter(n) : 'Its ingredients are on Shop for Week ' + letter(n)) + ', marked ' + r.e.name + '.'], true); return; }
    case 'swap': if (!mmOpenSwap(v)) toast('That meal is on its way. Open it again in a moment.'); return;
    case 'mgoal': case 'mfit': if (s){ const k = a === 'mgoal' ? 'goals' : 'fits', i = s[k].indexOf(v); if (i < 0) s[k].push(v); else s[k].splice(i, 1); mmPaint(); } return;
    case 'pick': { if (!s || s.kind !== 'swap') return; const r = mmSwap(s.target, v); if (!r){ toast('That recipe is on its way. Open it again in a moment.'); return; }
      if (S.ov && S.ov.k === 'cook') closeOv();
      const ch = [r.d.gone ? mmCount(r.d.gone, 'item steps', 'items step') + ' off the list' : '', r.d.came ? mmCount(r.d.came, 'item joins', 'items join') + ' it' : ''].filter(Boolean);
      mmDone('Swapped', r.e.name, [(r.old ? r.old + ' becomes ' : '') + r.e.name + ' for ' + mmLong(r.e.date) + '.', ch.length ? 'The Shopping List follows along: ' + ch.join(', and ') + '.' : 'The Shopping List already holds what it needs.'], true); return; }
    case 'remove': { const r = mmRemove(v); if (!r) return; if (S.ov && S.ov.mm === v) closeOv();
      mmDone('Removed from My Menu', r.e.name, [mmLong(r.e.date) + ' is back to the plan.', r.d.gone ? mmCount(r.d.gone, 'item steps', 'items step') + ' off the Shopping List.' : 'The Shopping List is up to date.'], true); return; }
    case 'undo': if (mmUndo()) mmDone('My Menu', 'Back as it was', ['The menu and the Shopping List are just as they were.'], false); return;
  }
}
document.addEventListener('click', e => { const t = e.target.closest && e.target.closest('[data-mma]'); if (!t || !D()) return; e.preventDefault(); mmAct(t.dataset.mma, t.dataset.mmv || ''); });
document.addEventListener('input', e => { const t = e.target, s = MM.sheet; if (!t || !t.dataset || !t.dataset.mmi || !s || !t.closest || !t.closest('#hj-mm')) return;
  if (t.dataset.mmi === 'date'){ if (parseD(t.value) && t.value >= today()){ s.date = t.value; s.other = true; const p = document.querySelector('#hj-mm .hj-mmsub'); if (p) p.textContent = mmListLine(s.date) + ' It shows on ' + mmLong(s.date) + ' with Guide Me.'; } return; }
  if (t.dataset.mmi === 'q'){ s.q = t.value; const b = document.getElementById('hj-mmlist'); if (b) b.innerHTML = mmRowsHtml(s); } });
document.addEventListener('change', e => { const t = e.target; if (t && t.dataset && t.dataset.mmi === 'date' && MM.sheet && t.closest && t.closest('#hj-mm')) mmPaint(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && MM.sheet){ e.stopPropagation(); e.preventDefault(); MM.sheet = null; mmPaint(); } }, true);
ACC.menu = 'a-kitchen'; SCN.menu = 'cook';
(function(){ const s = document.createElement('style'); s.id = 'hj-mm-css'; s.textContent = `
#hj-mm{--mmc:#FFFCF6;--mmi:#2C1810;--mms:#6B5A4D;--mml:#E6DAC4;--mmg:#8B5E1A;--mmgt:#FFFCF6;--mmon:#F3E6CC;position:fixed;inset:0;z-index:1000;display:flex;align-items:flex-end;justify-content:center;}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) #hj-mm{--mmc:#28211A;--mmi:#F3EDE3;--mms:#C2B6A4;--mml:#3D342A;--mmg:#E3B25A;--mmgt:#1C1712;--mmon:#3A2F22;}}
:root[data-theme="dark"] #hj-mm{--mmc:#28211A;--mmi:#F3EDE3;--mms:#C2B6A4;--mml:#3D342A;--mmg:#E3B25A;--mmgt:#1C1712;--mmon:#3A2F22;}
#hj-mm .hj-mmbg{position:absolute;inset:0;background:rgba(20,12,6,.45);}
#hj-mm .hj-mmsh{position:relative;box-sizing:border-box;width:100%;max-width:560px;max-height:min(88vh,760px);overflow:auto;background:var(--mmc);color:var(--mmi);border-radius:22px 22px 0 0;padding:18px 16px calc(18px + env(safe-area-inset-bottom,0px));box-shadow:0 -10px 40px rgba(0,0,0,.25);font-size:16px;line-height:1.45;}
@media (min-width:700px){#hj-mm{align-items:center;}#hj-mm .hj-mmsh{border-radius:22px;padding:22px 24px;}}
#hj-mm .hj-mmhd{display:flex;gap:12px;align-items:flex-start;justify-content:space-between;margin-bottom:6px;}
#hj-mm .hj-mmk{font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:var(--mmg);font-weight:700;}
#hj-mm h3{margin:2px 0 0;font-size:21px;line-height:1.25;overflow-wrap:anywhere;color:var(--mmi);}
#hj-mm .hj-mmx{flex:none;width:40px;height:40px;border-radius:50%;border:1px solid var(--mml);background:transparent;color:var(--mmi);font-size:24px;line-height:1;cursor:pointer;}
#hj-mm .hj-mmq{font-weight:700;margin:14px 0 6px;font-size:15px;}
#hj-mm .hj-mmchips{display:flex;flex-wrap:wrap;gap:6px;}
#hj-mm .hj-mmc{border:1px solid var(--mml);background:transparent;color:var(--mmi);border-radius:999px;padding:7px 12px;font:inherit;font-size:14px;cursor:pointer;min-height:36px;}
#hj-mm .hj-mmc.on{background:var(--mmon);border-color:var(--mmg);font-weight:700;}
#hj-mm .hj-mmc[disabled]{opacity:.45;cursor:default;}
#hj-mm .hj-mmsrv{display:flex;align-items:center;gap:10px;}#hj-mm .hj-mmsrv b{min-width:26px;text-align:center;font-size:19px;}#hj-mm .hj-mmsrv span{color:var(--mms);font-size:14px;}
#hj-mm .hj-mmfld{display:grid;gap:4px;margin:10px 0 0;font-size:14px;color:var(--mms);}
#hj-mm .hj-mmfld input{box-sizing:border-box;width:100%;min-width:0;font:inherit;font-size:16px;padding:9px 12px;border-radius:12px;border:1px solid var(--mml);background:transparent;color:var(--mmi);}
#hj-mm .hj-mmsub{color:var(--mms);margin:12px 0 0;font-size:15px;overflow-wrap:anywhere;}
#hj-mm .hj-mmbtns{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px;}
#hj-mm .hj-mmgo,#hj-mm .hj-mmline{font:inherit;font-weight:700;border-radius:999px;padding:11px 20px;cursor:pointer;min-height:44px;}
#hj-mm .hj-mmgo{background:var(--mmg);color:var(--mmgt);border:1px solid var(--mmg);}#hj-mm .hj-mmline{background:transparent;color:var(--mmi);border:1px solid var(--mml);}
#hj-mm .hj-mmcur{border:1px dashed var(--mml);border-radius:14px;padding:10px 12px;margin:8px 0 0;}#hj-mm .hj-mmcur small{display:block;color:var(--mms);font-size:13px;}
#hj-mm .hj-mmlist{display:grid;gap:6px;margin-top:12px;}
#hj-mm .hj-mmrow{display:grid;text-align:left;gap:2px;border:1px solid var(--mml);background:transparent;color:var(--mmi);border-radius:14px;padding:10px 12px;font:inherit;cursor:pointer;}
#hj-mm .hj-mmrow b{overflow-wrap:anywhere;}#hj-mm .hj-mmrow small{color:var(--mms);font-size:13px;}
#hj-mm .hj-mmrow:hover,#hj-mm .hj-mmc:hover{border-color:var(--mmg);}
.hj-mmacts{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 12px;}
`; document.head.appendChild(s); })();
Object.assign(window.GGHealth, {
  // BLD 900, My Menu. menuOpen(ref, {serves, date, meal}) opens Add to My Menu (the public Recipes page calls it from the Home's frame);
  // true when it opened, otherwise 'setup' (Tending is not started yet) or 'recipe' (the ref is unknown). menu() lists the added meals.
  menuOpen(ref, o){ if (!H() || !FLDH()) return 'setup'; if (!mmReady()) return 'setup'; return mmOpenAdd(String(ref || ''), o || {}) ? true : 'recipe'; },
  menuSwap(target){ return mmReady() ? mmOpenSwap(String(target || '')) : false; },
  menu(){ return H() ? JSON.parse(JSON.stringify(MENU().items)) : []; },
  // The Shopping List for food week n as it reads (n defaults to the list for today): [{id, name, amt, for, done, menu}].
  shopItems(n){ if (!H() || !FLDH()) return []; const L = shopList(+n || foodWeek(new Date())); return arr(L && L.items).map(x => ({id: x.id, name: x.name, amt: mmAmt(x), for: mmFor(x), done: !!x.done, menu: !!(x.mm || x.mmx)})); },
  foodWeek(date){ const d = date ? parseD(date) : new Date(); return d ? foodWeek(d) : 0; },
  today: mmToday, week: mmWeek
});
})();
