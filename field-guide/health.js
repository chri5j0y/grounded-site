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
// Everything personal lives in DATA.health on this device, encrypted with the rest of the Field Guide's records and
// carried in the locked backup (merged by GGHealth.merge; deletions in DATA.deleted.health):
//   {set: {household, goals: [], goalLdl, start, nextLabs, u}, labs: [{id, date, ldl, total, hdl, trig, apob, note, u}],
//    marks: [{id, date, weight, waist, rhr, pushups, pullups, mile, energy, sleep, joint, u}],
//    days: {'YYYY-MM-DD': {checks: {id: true}, u}}, notes: [{id, date, text, u}],
//    panels: [{id, date, name, note, items: [{n, v, u, lo, hi}], u}]}  (full lab panels, shown with range bars)
// Library html is written by Grounded (sealed by the Founder); typed entries are always escaped.
// =====================================================================
(function(){
'use strict';
let C = {};
const S = {sec: 'today', form: null, setup: false, open: {}, ov: null};
const D = () => C.data ? C.data() : null;
const FLDH = () => { const f = C.fld && C.fld(); const h = f && f.healthJourney; return h && (Array.isArray(h.food) || Array.isArray(h.fitness) || h.app) ? h : null; };
const MINE = () => { const f = C.fdr && C.fdr(); const m = f && f.healthMine; if (!m || typeof m !== 'object') return null;
  // BLD 842: the Founder library is shared by both founders, so a named plan shows only on its owner's phone.
  const d = D(), who = d && d.health && d.health.set && d.health.set.who; return !m.who || who === m.who ? m : null; };
const MINE_ANY = () => { const f = C.fdr && C.fdr(); const m = f && f.healthMine; return m && typeof m === 'object' ? m : null; };
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
  h.labs = arr(h.labs); h.marks = arr(h.marks); h.notes = arr(h.notes); h.panels = arr(h.panels);
  h.days = h.days && typeof h.days === 'object' ? h.days : {};
  ['log', 'shop', 'lifts'].forEach(k => { h[k] = h[k] && typeof h[k] === 'object' && !Array.isArray(h[k]) ? h[k] : {}; }); h.wlog = arr(h.wlog);
  return h;
}
const byDate = (a, b) => String(a.date).localeCompare(String(b.date));
const labs = () => H().labs.slice().sort(byDate);
const marks = () => H().marks.slice().sort(byDate);

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
  1: {move: 'Session A: Full Body Strength', food: 'Dinner from Sunday prep'},
  2: {move: 'Session D: Mobility, Core, and Easy Miles. Evening: the Y', food: 'Fish night'},
  3: {move: 'Session C: Power and Upper-Lower', food: 'Wednesday mini prep, 20 minutes'},
  4: {move: 'Session D: Mobility and Core. Evening: the Y', food: 'Plan next week, 10 minutes. Use-it-up night'},
  5: {move: 'Session B: Full Body Strength', food: 'Write the list, 5 minutes. Fish night'},
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
  const mkForm = f && f.k === 'mark' ? `<div class="hj-blk" id="hj-form">${kick('Body and Training Markers')}<div class="hj-g3">${inp('date', 'Date', 'date')}${inp('weight', 'Weight (lb)')}${inp('waist', 'Waist (in)')}${inp('rhr', 'Resting heart rate')}${inp('pushups', 'Push-ups in a row')}${inp('pullups', 'Pull-ups in a row')}${inp('mile', 'One mile (minutes)')}${inp('energy', 'Energy, 1 to 10')}${inp('sleep', 'Sleep, hours')}${inp('joint', 'Joint comfort, 0 to 10 (10 is easy)')}</div>${inp('note', 'Note', 'text')}
    <div class="row"><button type="button" class="btn btn-gold btn-sm" data-hja="save">Save</button><button type="button" class="btn btn-line btn-sm" data-hja="cancel">Cancel</button></div></div>` : '';
  const pForm = f && (f.k === 'panel' || f.k === 'pitem') ? `<div class="hj-blk" id="hj-form">${kick(f.k === 'panel' ? 'New Lab Panel' : 'Add a Result')}<div class="hj-g3">${f.k === 'panel' ? inp('name', 'Panel name', 'text') + inp('date', 'Date', 'date') : ''}${inp('n', 'Test name', 'text')}${inp('v', 'Result', 'text')}${inp('u', 'Unit', 'text')}${inp('lo', 'Range low')}${inp('hi', 'Range high')}</div>
    <div class="row"><button type="button" class="btn btn-gold btn-sm" data-hja="psave">Save</button><button type="button" class="btn btn-line btn-sm" data-hja="cancel">Cancel</button></div></div>` : '';
  const loadMine = mine && mine.start && (arr(mine.start.labs).length || arr(mine.start.panels).length) && !h.labs.length && !h.panels.length ? `<div class="hj-blk">${kick('My Starting Numbers')}<p class="hj-sub">Your starting labs are ready to add to this device.</p><button type="button" class="btn btn-gold btn-sm" data-hja="mine">Add My Starting Numbers</button></div>` : '';
  const cell = v => v == null || v === '' ? '' : esc(v);
  return `${loadMine}
  <div class="row" style="margin-bottom:14px"><button type="button" class="btn btn-gold btn-sm" data-hja="new" data-hjv="lab">Add Lab Results</button><button type="button" class="btn btn-line btn-sm" data-hja="new" data-hjv="mark">Add Markers</button><button type="button" class="btn btn-line btn-sm" data-hja="new" data-hjv="panel">Add a Lab Panel</button><button type="button" class="btn btn-line btn-sm" data-hja="setup">My Goals</button></div>
  ${labForm}${mkForm}${pForm}
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
const nextMon = () => { const t = day0(new Date()); return addD(t, ((8 - t.getDay()) % 7) || 7); };
function startMon(){ const s = parseD(H().set.start); return s || nextMon(); }
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
  if (dow === 6) out.push({key: 'out', k: 'mark', hour: 11, kick: 'Together', title: 'Family hike or the Y', sub: 'Outside when the weather is good, the Y when it is wild.', btn: 'We Did It'});
  if (dow === 0){ const p = prepFor('sunday', fw); if (p) out.push({key: 'prep:sunday:' + fw, k: 'prep', v: 'sunday|' + fw, hour: 13, kick: 'Sunday prep', title: 'Prep for Week ' + letter(fw), sub: (p.mins || 90) + ' minutes, step by step with timers.', btn: 'Start Prep'});
    const pk = prepFor('pack', fw); if (pk) out.push({key: 'prep:pack:' + fw, k: 'prep', v: 'pack|' + fw, hour: 18, kick: 'Sunday evening', title: pk.title || 'Pack Lunches', sub: (pk.mins || 20) + ' minutes for the week ahead.', btn: 'Start'});
    const b = prepFor('batch', fw); if (b) out.push({key: 'prep:batch:' + fw, k: 'prep', v: 'batch|' + fw, hour: 15, kick: 'Freezer batch', title: b.title || 'Freezer Batch', sub: (b.mins || 40) + ' minutes. A great job to hand off.', btn: 'Start'}); }
  if (dow === 3 && n >= 1){ const p = prepFor('wednesday', n); if (p) out.push({key: 'prep:wednesday:' + n, k: 'prep', v: 'wednesday|' + n, hour: 16, kick: 'Midweek', title: 'Wednesday Mini Prep', sub: (p.mins || 20) + ' minutes.', btn: 'Start Prep'}); }
  if (dow === 2 || dow === 4){ const ev = arr(WK().evenings), e = ev.length ? ev[(Math.max(1, n) * 2 + dow) % ev.length] : null; out.push({key: 'y', k: 'mark', hour: 18.5, kick: 'Evening', title: 'The Y together', sub: e ? e.title + (e.how ? ': ' + e.how : '') : 'Swim, sauna, or a class, together.', btn: 'We Did It'}); }
  const dn = dinnerFor(d); if (dn) out.push({key: 'cook:' + dn.wk + ':' + dn.id, k: 'cook', v: dn.wk + '|' + dn.id, hour: 17, kick: 'Tonight', title: dn.name, sub: (dn.mins ? dn.mins + ' minutes' : '') + (nOk(dn.nut) ? ', ' + nSf(nOk(dn.nutHeart) ? dn.nutHeart : dn.nut) + (nOk(dn.nutHeart) ? ' on the heart-health plate' : ' a serving') : '') + (dn.prepped ? '. ' + dn.prepped : ''), btn: 'Cook It'});
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
  const at = hr => hr < 12 ? 'This morning' : hr < 17 ? 'This afternoon' : 'Tonight';
  // Thaw: frozen protein moves to the fridge one or two nights before its dinner.
  [1, 2].forEach(k => { const dd = addD(d, k), dn = dinnerFor(dd), t = dn && dn.thaw; if (!t || !t.item || (+t.nights || 1) !== k) return;
    push('thaw:' + ymd(dd), 20, 'Tonight', 'Thaw ' + t.item, 'Move ' + t.item + ' from the freezer to the fridge for ' + (k === 1 ? 'tomorrow' : DOWL[dd.getDay()]) + '\'s dinner: ' + dn.name + '.', '', 4, 'thaw:' + dn.id); });
  // A morning check, only when last night's thaw is still open.
  const dn0 = dinnerFor(d); if (dn0 && dn0.thaw && dn0.thaw.item && !all){ const k = +dn0.thaw.nights || 1, night = (h.log[ymd(addD(d, -k))] || {})['rem:thaw:' + ymd(d)];
    if (!night) push('thawam:' + ymd(d), 7, 'This morning', 'Is ' + dn0.thaw.item + ' thawed?', 'Tonight is ' + dn0.name + '. ' + (dn0.thaw.quick || 'Move it to the fridge now, and it is ready by dinner.')); }
  const wk = tw[letter(fw)] || {};
  if (dow === 6 && arr(wk.freeze).length) push('freeze:' + fw, 12, 'After shopping', 'Into the freezer', arr(wk.freeze).join('. ').replace(/\.?$/, '.'), '', 4, 'freeze:' + letter(fw));
  if (dow === 4) push('thu:' + n, 19, 'Tonight', 'Check the fridge for Saturday', 'Look over the fridge and pantry, and add anything running low to Saturday\'s list.', 'shop:' + (n + 1), 1, 'thu');
  if (dow === 5) push('fri:' + n, 19, 'Tonight', 'Shopping is tomorrow', 'Week ' + letter(n + 1) + '\'s list is ready. Copy it for a text if someone else is shopping.', 'shop:' + (n + 1), 1, 'fri');
  if (dow === 6){ const p = prepFor('sunday', fw); if (p) push('sunprep:' + fw, 20, 'Tonight', 'Sunday prep tomorrow', 'About ' + (p.mins || 90) + ' minutes. Clear a fridge shelf and the counter, and set out the slow cooker and Instant Pot.', 'prep:sunday:' + fw, 1, 'sunprep'); }
  if (dow === 2 && n >= 1){ const p = prepFor('wednesday', n); if (p) push('wedprep:' + n, 20, 'Tonight', 'Wednesday mini prep tomorrow', 'About ' + (p.mins || 20) + ' minutes after work.', 'prep:wednesday:' + n, 1, 'wedprep'); }
  if (dow >= 1 && dow <= 4 && (BAT() || {}).pack) push('gg:' + ymd(d), 20.5, 'Tonight', 'Tomorrow\'s grab and go', 'Set out the lunch bags, put the ice packs in the freezer, and move tomorrow\'s frozen breakfast to the fridge.', '', 1, 'gg:' + dow);
  // Freezer stock: once counts are kept on the Prep tab, a nudge Thursday to Saturday when a batch runs low.
  if (h.stockU && dow >= 4 && !all){ const low = arr((BAT() || {}).batches).filter(b => b.where === 'freezer' && b.low != null && (h.stock || {})[b.id] != null && +h.stock[b.id] <= +b.low);
    if (low.length) push('low:' + n, 18, at(18), 'Freezer stock is low', low.map(b => { const c = +((h.stock || {})[b.id] || 0); return b.name + ': ' + c + (b.unit && c !== 1 ? ' ' + b.unit : '') + ' left'; }).join('. ') + '. Make more this Sunday.', 'prepsec:' + fw); }
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
      'RRULE:FREQ=WEEKLY;INTERVAL=' + r.rep + ';COUNT=' + (r.rep === 4 ? 7 : 26), 'SUMMARY:' + e('My Health: ' + r.title), 'DESCRIPTION:' + e(r.sub), 'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + e(r.title), 'TRIGGER:PT0M', 'END:VALARM', 'END:VEVENT'].map(fold).join('\r\n')); }); }
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Grow With Grounded//My Health//EN', 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:My Health'].concat(ev, ['END:VCALENDAR']).join('\r\n') + '\r\n';
}
function remBlock(d){
  if (!remOn()) return `<p class="hj-sub" style="margin:0 0 14px"><button type="button" class="linkbtn" data-hja="remoff">Show Reminders</button></p>`;
  const rs = remindersFor(d); if (!rs.length) return '';
  return `<div class="hj-blk hj-rem">${kick('Keep It Rolling')}${rs.map(r => { const ok = isDone(d, r.key); return `<div class="hj-ag${ok ? ' ok' : ''}"><button type="button" class="hj-agck" data-hja="toggle" data-hjv="${esc(r.key)}" aria-pressed="${ok}" aria-label="Done: ${esc(r.title)}">${ok ? '&#10003;' : ''}</button><div class="hj-agt"><b>${esc(r.title)}</b><small>${esc(r.kick)}. ${esc(r.sub)}</small>${r.go ? `<button type="button" class="linkbtn" data-hja="go" data-hjv="${esc(r.go)}">Open</button>` : ''}</div></div>`; }).join('')}
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
  const checks = (arr(lib.today && lib.today.checks).length ? lib.today.checks : CHECKS).concat(arr(mine && mine.checks));
  const day = h.days[today()] || {checks: {}};
  const s0 = startMon(), before = n < 1;
  const L = labs(), last = L[L.length - 1], goal = num(h.set.goalLdl);
  const card = x => `<div class="hj-now"><div class="hj-kick">${esc(x.kick)}</div><h3>${esc(x.title)}</h3><p>${esc(x.sub || '')}</p>
      <button type="button" class="btn btn-gold hj-go" data-hja="go" data-hjv="${esc(x.key)}">${esc(x.btn)}</button>${x.did ? `<button type="button" class="linkbtn hj-did" data-hja="toggle" data-hjv="${esc(x.key)}">I Did It on My Own</button>` : ''}</div>`;
  return `${hero(lib)}
  ${before ? `<p class="hj-note">Your plan starts ${esc(DOWL[s0.getDay()])}, ${esc(shortDate(s0))}. This weekend: shop Saturday and prep Sunday, and you are ready.</p>` : `<p class="hj-wk">Week ${n} · Phase ${phaseOf(n)}${lightWk(n) ? ' · a lighter week' : ''} · Food Week ${letter(n)}</p>`}
  ${cur ? card(cur) : `<div class="hj-now done"><div class="hj-kick">Today</div><h3>Everything for today is done.</h3><p>Rest well. Tomorrow keeps growing.</p></div>`}
  ${remBlock(d)}
  ${items.length ? `<div class="hj-blk">${kick('Today')}${items.map(x => { const ok = isDone(d, x.key); return `<div class="hj-ag${ok ? ' ok' : ''}${cur && cur.key === x.key ? ' cur' : ''}"><button type="button" class="hj-agck" data-hja="toggle" data-hjv="${esc(x.key)}" aria-pressed="${ok}" aria-label="Done: ${esc(x.title)}">${ok ? '&#10003;' : ''}</button><button type="button" class="hj-agt" data-hja="go" data-hjv="${esc(x.key)}"><b>${esc(x.title)}</b><small>${esc(x.kick)}</small></button></div>`; }).join('')}</div>` : ''}
  <div class="hj-blk">${kick('Daily Habits')}<div class="hj-habits">${checks.map(c => { const on = !!(day.checks && day.checks[c.id]); return `<button type="button" class="hj-hb${on ? ' on' : ''}" aria-pressed="${on}" data-hja="check" data-hjv="${esc(c.id)}"><span class="box">${on ? '&#10003;' : ''}</span>${esc(c.label)}</button>`; }).join('')}</div></div>
  <button type="button" class="hj-ldl" data-hja="sec" data-hjv="numbers"><span class="hj-kick">LDL</span><b>${last && last.ldl != null ? esc(last.ldl) : 'Add'}</b><span>${last ? 'on ' + short(last.date) + (goal ? '. Goal ' + esc(goal) + '.' : '') : 'Add your first lab results'}</span></button>
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
      ${dn ? `<button type="button" class="hj-pill food" data-hja="cook" data-hjv="${esc(dn.wk + '|' + dn.id)}">${esc(dn.name)}${dn.mins || nOk(dn.nut) ? ` <small>${[dn.mins ? esc(dn.mins) + ' min' : '', nSf(nOk(dn.nutHeart) ? dn.nutHeart : dn.nut)].filter(Boolean).join(', ')}</small>` : ''}</button>` : ''}
      ${ses ? `<button type="button" class="hj-pill move" data-hja="work" data-hjv="${esc(ses.id)}">${esc(ses.title || 'Session ' + ses.id)}</button>` : ''}
      ${d.getDay() === 3 && prepFor('wednesday', n) ? `<button type="button" class="hj-pill prep" data-hja="prep" data-hjv="wednesday|${n}">Mini Prep</button>` : ''}
      ${d.getDay() === 6 ? `<button type="button" class="hj-pill prep" data-hja="shopwk" data-hjv="${n + 1}">Shop for Week ${letter(n + 1)}</button>` : ''}
      ${d.getDay() === 0 && prepFor('sunday', n + 1) ? `<button type="button" class="hj-pill prep" data-hja="prep" data-hjv="sunday|${n + 1}">Sunday Prep</button>` : ''}
      ${mf ? `<button type="button" class="hj-pill calm" data-hja="go" data-hjv="medid:${esc(mf.id)}">${esc(mf.title)} <small>${esc(medMins(n))} min meditation${track === 'practice' ? ', evening' : ''}</small></button>` : ''}
      ${remOn() ? remindersFor(d, 'all').map(r => `<span class="hj-pill rem">${esc(r.title)}</span>`).join('') : ''}
    </div></div>`; }).join('');
  const w = (din.weeks || {})[letter(n)] || {}, ideas = (t, list, key) => arr(list).length ? `<details class="hj-doc"${S.open['id:' + key] ? ' open' : ''} data-hjd="id:${key}"><summary><span>${esc(t)}</span></summary><div class="hj-body"><ul class="hj-ideas">${arr(list).map((x, i) => `<li><b>${esc(x.name)}</b>${x.mins ? ` <small>${esc(x.mins)} min</small>` : ''}<br><span>${esc(x.how || '')}</span>${nOk(x.nut) ? `<span class="hj-gi hj-nl">${nLine(x.nut)}${x.nut.per ? ' (' + esc(x.nut.per) + ')' : ''}</span>` : ''}
    ${arr(x.shop).length ? `<span class="hj-gi">Buy: ${arr(x.shop).map(g => esc(g.name) + (g.amt ? ' (' + esc(g.amt) + ')' : '')).join(', ')}</span>` : ''}${x.from ? `<span class="hj-gi">From prep: ${esc(x.from)}</span>` : ''}${x.pack ? `<span class="hj-gi">Pack it: ${esc(x.pack)}</span>` : ''}
    ${arr(x.shop).length ? `<button type="button" class="btn btn-line btn-sm hj-ggadd" data-hja="ggadd" data-hjv="${key}|${i}">Add to Shopping List</button>` : ''}</li>`).join('')}</ul></div></details>` : '';
  return `<div class="hj-wkbar"><button type="button" class="btn btn-line btn-sm" data-hja="wk" data-hjv="-1"${n <= 1 ? ' disabled' : ''}>Back</button><div><b>Week ${n}</b><small>Food Week ${letter(n)} · Phase ${phaseOf(n)}${lightWk(n) ? ' · lighter' : ''}</small></div><button type="button" class="btn btn-line btn-sm" data-hja="wk" data-hjv="1">Next</button></div>
  ${n0 < 1 && !S.wkOff ? `<p class="hj-note">Your plan starts ${esc(shortDate(startMon()))}. Here is your first week.</p>` : ''}
  <div class="hj-blk hj-days">${rows}</div>
  ${remOn() ? `<div class="row" style="margin:-4px 0 14px"><button type="button" class="btn btn-line btn-sm" data-hja="remics">Add Reminders to My Phone Calendar</button></div>` : ''}
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
let TK = null; function tick(){ clearInterval(TK); TK = setInterval(() => { const o = S.ov; if (!o){ clearInterval(TK); return; } if (!o.run) return; const ms = o.end - Date.now();
  document.querySelectorAll('[data-hjclock]').forEach(e => e.textContent = clock(Math.max(0, ms)));
  if (ms <= 0){ o.run = false; o.left = 0; chime(); if (o.k === 'work' && o.rest){ o.rest = false; o.set++; } if (o.k === 'med'){ markDone('med'); checkOn('still'); o.fin = true; } if (o.ti != null) o.tdone = Object.assign(o.tdone || {}, {[o.ti]: true}); rerender(true); } }, 250); }
const clock = ms => { const s = Math.ceil(ms / 1000); return Math.floor(s / 60) + ':' + pad(s % 60); };
function chime(){ try { const A = window.AudioContext || window.webkitAudioContext; if (A){ const c = chime.c = chime.c || new A(); [0, 0.35, 0.7].forEach(t => { const o = c.createOscillator(), g = c.createGain(); o.frequency.value = 660; g.gain.setValueAtTime(0.0001, c.currentTime + t); g.gain.exponentialRampToValueAtTime(0.25, c.currentTime + t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + t + 0.3); o.connect(g); g.connect(c.destination); o.start(c.currentTime + t); o.stop(c.currentTime + t + 0.32); }); } } catch(e){} try { navigator.vibrate && navigator.vibrate([200, 100, 200]); } catch(e){} }
function startTimer(o, secs, ti){ o.end = Date.now() + secs * 1000; o.left = secs * 1000; o.run = true; o.ti = ti; try { chime.c && chime.c.resume && chime.c.resume(); } catch(e){} }
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
    if (o.fin || !st){ body = `${top(o.title, 'Workout done', 100)}<div class="hj-ovb"><div class="hj-big2">Strong work.</div><p class="hj-sub">${o.done.length} moves finished. Breathe, drink water, and write a word about how it felt.</p>
      <label class="hj-fld"><span>How did it feel? (optional)</span><input id="hj-wnote" placeholder="Felt strong, knees easy..."></label>
      <button type="button" class="btn btn-gold hj-go" data-hja="wsave">Save Workout</button></div>`; }
    else {
      const pct = Math.round(100 * o.i / o.steps.length), lb = H().lifts[st.id];
      if (st.t === 'time'){ const ms = o.run ? o.end - Date.now() : (o.left || st.secs * 1000);
        body = `${top(o.title, st.part + ' · ' + (o.i + 1) + ' of ' + o.steps.length, pct)}<div class="hj-ovb"><h2 class="hj-exn">${esc(st.name)}</h2><p class="hj-how">${esc(st.how || '')}</p>
          <div class="hj-clock" data-hjclock>${clock(ms)}</div>
          <div class="hj-ovbtns"><button type="button" class="btn btn-line" data-hja="${o.run ? 'pause' : 'tstart'}">${o.run ? 'Pause' : (o.left && o.left < st.secs * 1000 ? 'Keep Going' : 'Start Timer')}</button><button type="button" class="btn btn-gold" data-hja="next">Next</button></div></div>`; }
      else if (o.rest){ body = `${top(o.title, 'Rest', pct)}<div class="hj-ovb"><div class="hj-kick">Rest, then set ${o.set + 1} of ${st.sets}</div><h2 class="hj-exn">${esc(st.name)}</h2><div class="hj-clock" data-hjclock>${clock(o.end - Date.now())}</div><p class="hj-how">Breathe slow. Sip water.</p>
          <div class="hj-ovbtns"><button type="button" class="btn btn-gold" data-hja="skiprest">Ready Now</button></div></div>`; }
      else { body = `${top(o.title, st.part + ' · ' + (o.i + 1) + ' of ' + o.steps.length, pct)}<div class="hj-ovb"><div class="hj-kick">Set ${o.set} of ${st.sets}</div><h2 class="hj-exn">${esc(o.swap ? (st.swap || st.name) : st.name)}</h2>
          <div class="hj-reps">${esc(st.reps)}${st.kind === 'time' ? ' seconds' : st.kind === 'distance' ? '' : ' reps'}</div>
          ${o.swap ? `<p class="hj-how">Swap for ${esc(st.name)}. Same sets and reps.</p>` : `<p class="hj-how">${esc(st.how || '')}</p>${st.cue ? `<p class="hj-cue">${esc(st.cue)}</p>` : ''}`}
          ${st.kind === 'reps' ? `<label class="hj-fld hj-lb"><span>Weight (lb), saved for next time</span><input id="hj-lb" inputmode="decimal" value="${esc(o.lb != null ? o.lb : (lb || ''))}" placeholder="Bodyweight"></label>` : ''}
          <div class="hj-ovbtns">${st.swap ? `<button type="button" class="btn btn-line" data-hja="swap">${o.swap ? 'Back to the Plan Move' : 'Joint-Friendly Swap'}</button>` : ''}<button type="button" class="btn btn-gold" data-hja="setdone">${o.set < st.sets ? 'Set Done' : 'Done, Next Move'}</button></div>
          <button type="button" class="linkbtn hj-skip" data-hja="next">Skip this move</button></div>`; }
    }
  } else if (o.k === 'med'){
    const m = WK().meditation || {}, ms = o.run ? o.end - Date.now() : (o.left || o.mins * 60000);
    body = `${top('Meditation', o.mins + ' minutes')}<div class="hj-ovb">${o.fin ? `<div class="hj-big2">Well done.</div><p class="hj-sub">Carry this stillness into your day.</p><button type="button" class="btn btn-gold hj-go" data-hja="ovclose">Close</button>` :
      `<ul class="hj-guide">${arr(m.guide).map(g => `<li>${esc(g)}</li>`).join('') || '<li>Sit tall and easy. Close your eyes.</li><li>Breathe in slowly through your nose, and out a little longer.</li><li>When your mind wanders, notice it, and come back to the breath.</li>'}</ul>
      <div class="hj-clock" data-hjclock>${clock(ms)}</div><div class="hj-ovbtns"><button type="button" class="btn btn-gold" data-hja="${o.run ? 'pause' : 'mstart'}">${o.run ? 'Pause' : (o.left && o.left < o.mins * 60000 ? 'Keep Going' : 'Begin')}</button><button type="button" class="btn btn-line" data-hja="mdone">I Am Done</button></div>`}</div>`;
  } else if (o.k === 'cook' || o.k === 'prep'){
    const x = o.data, steps = arr(x.steps), dn = o.dn = o.dn || {}, tdone = o.tdone || {};
    const nDone = steps.filter((s, i) => dn[i]).length, pct = steps.length ? Math.round(100 * nDone / steps.length) : 0;
    body = `${top(o.title, o.sub, pct)}<div class="hj-ovb hj-left"><button type="button" class="btn btn-gold hj-go" data-hja="guide" style="margin-bottom:12px">Guide Me, Step by Step</button>
      ${x.prepped ? `<p class="hj-note"><b>Prepped:</b> ${esc(x.prepped)}</p>` : ''}
      ${o.k === 'cook' && nOk(x.nut) ? `<details class="hj-doc"><summary><span>Nutrition per Serving</span></summary><div class="hj-body">${nTable(x.nut, x.nutHeart)}</div></details>` : ''}
      ${arr(x.ingredients).length ? `<details class="hj-doc" open><summary><span>Ingredients</span></summary><div class="hj-body"><ul class="hj-ing">${arr(x.ingredients).map(g => `<li>${esc(g)}</li>`).join('')}</ul></div></details>` : ''}
      <ol class="hj-steps">${steps.map((s, i) => { const t = typeof s === 'string' ? {t: s} : s, on = !!dn[i], tm = +t.min || 0, running = o.run && o.ti === i;
        return `<li class="${on ? 'on' : ''}"><button type="button" class="hj-agck" data-hja="step" data-hjv="${i}" aria-pressed="${on}">${on ? '&#10003;' : i + 1}</button><div>${t.at ? `<span class="hj-at">${esc(t.at)}</span> ` : ''}${esc(t.t || '')}
          ${tm ? `<div class="hj-tm">${running ? `<span class="hj-clock sm" data-hjclock>${clock(o.end - Date.now())}</span><button type="button" class="btn btn-line btn-sm" data-hja="tstop">Stop</button>` : tdone[i] ? `<span class="hj-tdone">Timer done</span>` : `<button type="button" class="btn btn-line btn-sm" data-hja="stime" data-hjv="${i}">Start ${tm} min Timer</button>`}</div>` : ''}</div></li>`; }).join('')}</ol>
      ${x.serve ? `<p class="hj-sub"><b>Serve:</b> ${esc(x.serve)}</p>` : ''}${x.tip ? `<p class="hj-sub"><b>Tip:</b> ${esc(x.tip)}</p>` : ''}
      ${arr(x.yields).length ? `<p class="hj-sub"><b>Ready after:</b> ${arr(x.yields).map(esc).join(', ')}</p>` : ''}
      <button type="button" class="btn btn-gold hj-go" data-hja="cdone">${o.k === 'cook' ? 'Dinner Is Done' : 'Prep Is Done'}</button></div>`;
  }
  return `<div class="hj-ov" role="dialog" aria-modal="true" aria-label="${esc(o.title || 'My Health')}"><div class="hj-ovin">${body}</div></div>`;
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
    case 'prep': { const [k, n] = v.split('|'); openPrep(k, +n); return true; }
    case 'wk': S.wkOff = (S.wkOff || 0) + (+v); rerender(true); return true;
    case 'shopwk': S.sec = 'shop'; S.shopWk = Math.max(1, +v); S.shopEd = null; rerender(false); return true;
    case 'prepwk': S.prepWk = Math.max(1, +v); rerender(true); return true;
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
    case 'next': o.lb = null; o.done.push(o.i); o.i++; o.set = 1; o.left = 0; o.run = false; o.rest = false; o.swap = false; o.sure = false; if (o.i >= o.steps.length) o.fin = true; rerender(true); return true;
    case 'swap': o.swap = !o.swap; rerender(true); return true;
    case 'setdone': { const st = o.steps[o.i], lb = document.getElementById('hj-lb'); if (lb && String(lb.value).trim()){ h.lifts[st.id] = String(lb.value).trim().slice(0, 12); save(); }
      if (o.set < st.sets){ o.rest = true; startTimer(o, st.rest); } else { o.lb = null; o.done.push(o.i); o.i++; o.set = 1; o.swap = false; o.run = false; o.rest = false; if (o.i >= o.steps.length) o.fin = true; } rerender(true); return true; }
    case 'skiprest': o.rest = false; o.run = false; o.set++; rerender(true); return true;
    case 'wsave': { const nt = document.getElementById('hj-wnote'); h.wlog.push({id: uid(), date: today(), s: o.s, title: o.title, moves: o.done.length, mins: o.active ? Math.round(o.active / 60000) : undefined, note: String(nt ? nt.value : '').trim().slice(0, 400), u: Date.now()});
      markDone(o.key || 'work:' + o.s); checkOn(o.prac ? 'still' : 'move'); toast('Workout saved. Well done.'); closeOv(); return true; }
    case 'mstart': startTimer(o, (o.left && o.left < o.mins * 60000 ? o.left : o.mins * 60000) / 1000); rerender(true); return true;
    case 'mdone': markDone('med'); checkOn('still'); o.run = false; o.fin = true; chime(); rerender(true); return true;
    case 'step': { o.dn = o.dn || {}; o.dn[v] = !o.dn[v]; rerender(true); return true; }
    case 'stime': { const s = arr(o.data.steps)[+v], m = +(s && s.min) || 0; if (m) startTimer(o, m * 60, +v); rerender(true); return true; }
    case 'tstop': o.run = false; o.ti = null; rerender(true); return true;
    case 'cdone': markDone(o.key); toast(o.k === 'cook' ? 'Dinner done. Enjoy the table together.' : 'Prep done. The week is ready.'); closeOv(); return true;
  }
  return false;
}

// ---------- BLD 842: the coach. Play Session (hands-free), Kayti's daily practice, the kitchen guide ----------
// Every line the voice can say comes from LN below, so allLines() lists exactly what gets recorded (Ava: workouts and
// the practice; Andrew: the kitchen). Voice Off, Music Off, and I Did It keep every guide optional (Chris, October 24, 2026).
const VO = () => window.GGVoice || null;
const NUMW = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'];
const unitOf = st => st.kind === 'time' ? ' seconds' : st.kind === 'distance' ? '' : ' reps';
const LN = {
  ses: (t, m) => t + '. About ' + m + ' minutes. We begin with the warm-up.',
  time: st => (st.name + '. ' + (st.how || '')).trim(),
  ex: st => st.name + '. ' + st.sets + ' set' + (st.sets === 1 ? '' : 's') + ' of ' + st.reps + unitOf(st) + '.',
  set: (n, m) => n === m ? 'Last set.' : 'Set ' + n + ' of ' + m + '.',
  go: 'Go.', rest: s => 'Rest ' + s + ' seconds.', ten: 'Ten seconds.', nextSet: 'Next set.',
  next: n => 'Next up: ' + n + '.', cool: 'Cooldown time. Nice work.', out: 'That is the session. Strong work today.',
  count: k => NUMW[k] + '.',
  pIntro: (t, m) => t + '. About ' + m + ' minutes. Settle in, and we begin.', pOut: 'Your practice is complete. Carry this calm with you.',
  mIntro: t => 'Today\'s meditation: ' + t + '. Find a comfortable seat, and let the day pause.', mOut: 'Your meditation is complete. Carry this stillness into your day.',
  cIntro: n => 'We are making ' + n + '.', prepIntro: t => 'We are starting ' + t + '.',
  tset: m => 'Timer set for ' + m + ' minute' + (m === 1 ? '' : 's') + '.', tdone: 'That timer is done.',
  cOut: 'All done. Enjoy the table together.', prepOut: 'Prep is done. Your week is ready.'
};
const repN = st => { const n = parseInt(String(st.reps), 10); return n > 0 && n <= 20 ? n : 0; };
const AVA = 'ava', ANDREW = 'andrew';
function stepsFor(ses, ph, light){
  const w = WK(), out = [];
  arr(w.warmup).forEach(x => out.push({t: 'time', name: x.name, how: x.how, secs: +x.secs || 45, part: 'Warm-up', fig: x.name}));
  arr(ses.blocks).forEach(b => arr(b.items).forEach(x => { const sets = +((x.sets || {})[ph] || (x.sets || {})['1'] || 1), reps = String((x.reps || {})[ph] || (x.reps || {})['1'] || '');
    out.push({t: 'ex', id: x.id || x.name, name: x.name, how: x.how, cue: x.cue, swap: x.swap, sets: light ? Math.max(1, sets - 1) : sets, reps, kind: x.kind || 'reps', rest: +x.rest || 60, part: b.title || 'Main', fig: x.name}); }));
  arr(w.cooldown).forEach(x => out.push({t: 'time', name: x.name, how: x.how, secs: +x.secs || 45, part: 'Cooldown', fig: x.name}));
  return out;
}
const PR = () => (APP() || {}).practice || null;
const MED = () => { const m = (APP() || {}).meditations; return m && arr(m.sessions).length ? m : null; };
const BRIAN = 'brian';
const lineSecs = t => 1.4 + String(t).split(/\s+/).length / 2.4;
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
    ['1', '2', '3'].forEach(ph => [false, true].forEach(light => stepsFor(ses, ph, light).forEach(st => {
      if (st.t === 'time') add(AVA, LN.time(st));
      else { add(AVA, LN.ex(st)); add(AVA, st.cue); add(AVA, LN.next(st.name)); add(AVA, LN.rest(st.rest)); for (let n = 2; n <= st.sets; n++) add(AVA, LN.set(n, st.sets)); }
      add(AVA, LN.next(st.name)); }))); });
  for (let k = 1; k <= 20; k++) add(AVA, LN.count(k));
  [LN.go, LN.ten, LN.nextSet, LN.cool, LN.out, LN.pOut].forEach(t => add(AVA, t));
  const md = app.meditations; arr(md && md.sessions).forEach(s => { add(BRIAN, LN.mIntro(s.title)); arr(s.segments).forEach(g => arr(g.lines).forEach(l => add(BRIAN, l))); }); add(BRIAN, LN.mOut);
  const p = app.practice; arr(p && p.sessions).forEach(s => { add(AVA, LN.pIntro(s.title, s.mins)); arr(s.steps).forEach(x => add(AVA, LN.time({name: x.name, how: x.how}))); });
  const dn = (app.dinners || {}).weeks || {}; Object.values(dn).forEach(wk => arr(wk.dinners).forEach(x => { add(ANDREW, LN.cIntro(x.name)); arr(x.steps).forEach(s => { const t = typeof s === 'string' ? {t: s} : s; add(ANDREW, t.t); if (+t.min) add(ANDREW, LN.tset(+t.min)); }); }));
  const sp = (app.shop || {}).weeks || {}; Object.values(sp).forEach(wk => ['sunday', 'wednesday', 'batch'].forEach(k => { const x = wk[k]; if (!x) return; add(ANDREW, LN.prepIntro({sunday: 'Sunday Prep', wednesday: 'Wednesday Mini Prep', batch: x.title || 'Freezer Batch'}[k]));
    arr(x.steps).forEach(s => { const t = typeof s === 'string' ? {t: s} : s; add(ANDREW, t.t); if (+t.min) add(ANDREW, LN.tset(+t.min)); }); }));
  const bt = app.batches || {}; arr(bt.batches).concat(bt.pack ? [Object.assign({name: bt.pack.title || 'Pack Lunches'}, bt.pack)] : []).forEach(x => { add(ANDREW, LN.prepIntro(x.title || x.name)); arr(x.steps).forEach(s => { const t = typeof s === 'string' ? {t: s} : s; add(ANDREW, t.t); if (+t.min) add(ANDREW, LN.tset(+t.min)); }); });
  [LN.tdone, LN.cOut, LN.prepOut].forEach(t => add(ANDREW, t));
  return [...out.values()];
}
// ---------- the hands-free engine ----------
const sleep = ms => new Promise(r => setTimeout(r, ms));
function estLeft(o){ let s = 0; o.steps.forEach((st, i) => { if (i < o.i) return; if (st.t === 'time') s += st.secs + arr(st.lines).reduce((a, l) => a + lineSecs(l) + 0.8, 0); else { const left = i === o.i ? st.sets - o.set + 1 : st.sets; s += left * ((repN(st) || 10) * 3 + (st.kind === 'time' ? +st.reps || 30 : 0) + st.rest); } }); return s * 1000; }
async function speak(o, text){ const V = VO(); if (!V || !text || o.dead) return; const nx = o.steps[o.i + 1]; await V.say(o.voice || AVA, text); if (nx && V.prefetch) V.prefetch(o.voice || AVA, nx.t === 'time' ? LN.time(nx) : LN.ex(nx)); }
async function snooze(o, ms){ const end = Date.now() + ms; while (Date.now() < end && !o.skip && !o.dead) await sleep(80); }
async function hold(o){ while (o.paused && !o.dead && !o.skip) await sleep(120); }
// A timer that honors Pause, Skip, and +15 seconds; ticks the last 3 seconds; says Ten seconds on rests.
async function runTimer(o, ms, rest){
  o.end = Date.now() + ms; o.run = true; o.rest = !!rest; let said10 = false, last = 99; rerender(true);
  while (!o.dead && !o.skip){
    if (o.paused){ const left = o.end - Date.now(); await hold(o); o.end = Date.now() + left; continue; }
    const left = o.end - Date.now(); if (left <= 0) break;
    const s = Math.ceil(left / 1000);
    if (rest && s === 10 && !said10 && ms > 15000){ said10 = true; speak(o, LN.ten); }
    if (s <= 3 && s !== last){ last = s; VO() && VO().tick(); }
    document.querySelectorAll('[data-hjclock]').forEach(e => e.textContent = clock(left));
    await sleep(100);
  }
  o.run = false; o.rest = false;
}
async function waitTap(o){ o.wait = true; rerender(true); while (o.wait && !o.dead && !o.skip) await sleep(120); o.wait = false; }
async function runSession(o){
  const V = VO(); o.mode = 'auto'; o.stage = 'run'; o.t0 = Date.now(); o.active = 0; o.dead = false; o.lastT = Date.now();
  if (V){ V.unlock(); V.music(o.music || '/audio/music/learning-' + (1 + (o.title.length % 7)) + '.mp3'); }
  rerender(true);
  await speak(o, o.med ? LN.mIntro(o.title) : o.prac ? LN.pIntro(o.title, o.mins || Math.round(estLeft(o) / 60000)) : LN.ses(o.title, o.mins || Math.round(estLeft(o) / 60000)));
  while (!o.dead && o.i < o.steps.length){
    const st = o.steps[o.i]; o.skip = false; rerender(true);
    if (st.t === 'time'){
      if (!o.prac && st.part === 'Cooldown' && o.steps[o.i - 1] && o.steps[o.i - 1].part !== 'Cooldown') await speak(o, LN.cool);
      if (st.lines){ for (const ln of st.lines){ if (o.dead || o.skip) break; o.line = ln; rerender(true); await hold(o); await speak(o, ln); if (!(VO() && VO().on())) await snooze(o, Math.min(4000, lineSecs(ln) * 1000)); await snooze(o, 800); } o.line = ''; }
      else await speak(o, LN.time(st));
      await hold(o); if (o.dead) break;
      if (!o.skip) await runTimer(o, st.secs * 1000);
      o.done.push(o.i); o.i++; o.set = 1; continue;
    }
    if (o.set === 1){ await speak(o, LN.ex(st)); if (st.cue) await speak(o, st.cue); } else await speak(o, LN.set(o.set, st.sets));
    await hold(o); if (o.dead) break;
    if (!o.skip){
      if (st.kind === 'time'){ await speak(o, LN.go); await runTimer(o, (+st.reps || 30) * 1000); }
      else if (o.count && repN(st)){ await speak(o, LN.go); o.rep = 0; rerender(true);
        for (let k = 1; k <= repN(st) && !o.dead && !o.skip && !o.wait; k++){ await hold(o); o.rep = k; document.querySelectorAll('[data-hjrep]').forEach(e => e.textContent = k); const t0 = Date.now(); await speak(o, LN.count(k)); const wt = 3000 - (Date.now() - t0); if (wt > 0) await sleep(wt); }
        o.rep = 0; }
      else await waitTap(o);
    }
    if (o.dead) break;
    const skipped = o.skip; o.skip = false;
    if (!skipped && o.set < st.sets){ await speak(o, LN.rest(st.rest)); await runTimer(o, st.rest * 1000, true); if (o.dead) break; o.skip = false; o.set++; continue; }
    o.done.push(o.i); o.i++; o.set = 1;
    const nx = o.steps[o.i]; if (nx && nx.t === 'ex' && !o.dead){ await speak(o, LN.next(nx.name)); }
  }
  if (!o.dead){ o.fin = true; o.run = false; rerender(true); if (o.med && typeof chime === 'function') chime(); await speak(o, o.med ? LN.mOut : o.prac ? LN.pOut : LN.out); }
  V && V.music(null);
}
function sessClock(o){ const now = Date.now(); if (!o.paused) o.active += now - (o.lastT || now); o.lastT = now; return clock(o.active); }
setInterval(() => { const o = S.ov; if (!o || o.mode !== 'auto' || o.fin) return; const e = document.querySelector('[data-hjsess]'); if (e) e.textContent = sessClock(o); const l = document.querySelector('[data-hjleft]'); if (l) l.textContent = 'about ' + Math.max(1, Math.round(estLeft(o) / 60000)) + ' min left'; }, 1000);
function figOf(st){ if (st && st.candle) return candle(); const M = window.GGMoves; if (!M || !st) return ''; try { const pat = st.figKey ? st.fig : (M.of ? M.of(st.fig || st.name) : 'standing'); return `<div class="hj-fig" aria-hidden="true">${M.svg(pat)}</div>`; } catch(e){ return ''; } }
function toggles(o){
  const V = VO(), on = V ? V.on() : false, mu = V ? V.musicOn() : false, ch = V ? V.chimeOn() : true;
  return `<div class="hj-tg">
    <button type="button" class="chip${on ? ' on' : ''}" aria-pressed="${on}" data-hja="tvoice">${on ? 'Voice On' : 'Voice Off'}</button>
    <button type="button" class="chip${mu ? ' on' : ''}" aria-pressed="${mu}" data-hja="tmusic">${mu ? 'Music On' : 'Music Off'}</button>
    <button type="button" class="chip${ch ? ' on' : ''}" aria-pressed="${ch}" data-hja="tchime">${ch ? 'Beeps On' : 'Beeps Off'}</button>
    ${o && !o.prac ? `<button type="button" class="chip${o.count ? ' on' : ''}" aria-pressed="${!!o.count}" data-hja="tcount">${o.count ? 'Ava Counts Reps' : 'I Tap Done'}</button>` : ''}</div>`;
}
function vStart(o, top){
  const moves = o.steps.filter(s => s.t === 'ex'), mins = o.mins || Math.round(estLeft(o) / 60000);
  const kit = o.med ? ['a comfortable seat'] : !o.prac ? ['dumbbells', 'bench', 'pull-up bar', 'dip bar', 'mat'].filter(k => moves.some(m => new RegExp(k.split(' ')[0].replace('dumbbells', 'dumbbell'), 'i').test((m.name || '') + ' ' + (m.how || '')))) : ['a mat or a cushion', 'water'];
  return `${top(o.title, o.med ? 'Daily Meditation' : o.prac ? 'Daily Practice' : 'Today\'s Session', null)}<div class="hj-ovb">
    <div class="hj-big2" style="margin-top:6px">${esc(String(mins))} minutes</div>
    <p class="hj-sub">${o.prac ? esc(o.lead || '') : `${moves.length} moves, with a warm-up and a cooldown.`}${kit.length ? ' Have ready: ' + esc(kit.join(', ')) + '.' : ''}</p>
    ${o.prac && (PR() || {}).safety ? `<p class="hj-note" style="text-align:left">${esc(PR().safety)}</p>` : ''}
    ${toggles(o)}
    <button type="button" class="btn btn-gold hj-go" data-hja="play">Play ${o.med ? 'Meditation' : o.prac ? 'Practice' : 'Session'}</button>
    <div class="hj-ovbtns"><button type="button" class="btn btn-line" data-hja="manual">Step Through</button><button type="button" class="btn btn-line" data-hja="didit">I Did It</button></div>
    <details class="hj-doc" style="text-align:left;margin-top:16px"><summary><span>What is in it</span></summary><div class="hj-body"><ol>${o.steps.map(s => `<li>${esc(s.name)}${s.t === 'ex' ? ` <small>${esc(s.sets + ' x ' + s.reps)}</small>` : ` <small>${Math.round(s.secs / 6) / 10} min</small>`}</li>`).join('')}</ol></div></details></div>`;
}
function vAuto(o, top){
  const st = o.steps[o.i], pct = Math.round(100 * o.i / o.steps.length);
  if (o.fin || !st) return `${top(o.title, o.prac ? 'Practice complete' : 'Session complete', 100)}<div class="hj-ovb"><div class="hj-big2">${o.prac ? 'Well done.' : 'Strong work.'}</div><p class="hj-sub">Time: ${esc(clock(o.active || 0))}.</p>
    <label class="hj-fld" style="text-align:left"><span>How did it feel? (optional)</span><input id="hj-wnote" placeholder="${o.prac ? 'Calm, loose, clear...' : 'Felt strong, knees easy...'}"></label>
    <button type="button" class="btn btn-gold hj-go" data-hja="wsave">Save</button></div>`;
  const big = o.run ? `<div class="hj-clock" data-hjclock>${clock(Math.max(0, o.end - Date.now()))}</div>` : o.rep ? `<div class="hj-clock" data-hjrep>${o.rep}</div>` : st.t === 'ex' ? `<div class="hj-reps">${esc(st.reps)}${esc(unitOf(st))}</div>` : `<div class="hj-clock" data-hjclock>${clock(st.secs * 1000)}</div>`;
  const label = o.rest ? `Rest, then ${o.set < st.sets ? 'set ' + (o.set + 1) + ' of ' + st.sets : 'the next move'}` : st.t === 'ex' ? `Set ${o.set} of ${st.sets}` : st.part;
  return `${top(o.title, (o.i + 1) + ' of ' + o.steps.length, pct)}
  <div class="hj-sess"><span data-hjsess>${esc(clock(o.active || 0))}</span><span data-hjleft>about ${Math.max(1, Math.round(estLeft(o) / 60000))} min left</span></div>
  <div class="hj-ovb">${o.rest ? '' : figOf(st)}<div class="hj-kick">${esc(label)}</div><h2 class="hj-exn">${esc(o.swap && st.swap ? st.swap : st.name)}</h2>${big}
    ${o.rest ? '<p class="hj-how">Breathe slow. Sip water.</p>' : st.lines ? `<p class="hj-how hj-mline">${esc(o.line || (o.run ? 'Rest in the quiet.' : ''))}</p>` : `<p class="hj-how">${esc(st.how || '')}</p>${st.cue ? `<p class="hj-cue">${esc(st.cue)}</p>` : ''}${st.ease ? `<p class="hj-note" style="text-align:left">${esc(st.ease)}</p>` : ''}`}
    ${o.wait ? `<button type="button" class="btn btn-gold hj-go" data-hja="tapdone">Set Done</button>` : ''}
    <div class="hj-ovbtns hj-ctl"><button type="button" class="btn btn-gold" data-hja="apause">${o.paused ? 'Resume' : 'Pause'}</button><button type="button" class="btn btn-line" data-hja="askip">Skip</button>${o.run ? `<button type="button" class="btn btn-line" data-hja="amore">+15 sec</button>` : ''}${st.swap && !o.rest ? `<button type="button" class="btn btn-line" data-hja="swap">${o.swap ? 'Plan Move' : 'Swap'}</button>` : ''}</div>
    ${toggles(o)}</div>`;
}
// ---------- the kitchen guide (Andrew) ----------
function kSteps(o){ return arr(o.data.steps).map(s => typeof s === 'string' ? {t: s} : s); }
async function kSay(o, text){ const V = VO(); if (V && !o.dead) await V.say(ANDREW, text); }
function kEnter(o){ const s = kSteps(o)[o.gi]; if (!s) return; kSay(o, s.t); const nx = kSteps(o)[o.gi + 1]; if (nx && VO()) VO().prefetch(ANDREW, nx.t); }
function kStartTimer(o, i){ const s = kSteps(o)[i]; if (!s || !+s.min) return; o.timers = (o.timers || []).filter(t => t.i !== i); o.timers.push({i, end: Date.now() + s.min * 60000, label: s.t}); kSay(o, LN.tset(+s.min)); rerender(true); }
setInterval(() => { const o = S.ov; if (!o || !o.guide || !o.timers || !o.timers.length) return; const now = Date.now();
  o.timers.forEach(t => { const e = document.querySelector('[data-hjkt="' + t.i + '"]'); if (e) e.textContent = clock(Math.max(0, t.end - now)); });
  const done = o.timers.filter(t => t.end <= now); if (!done.length) return;
  o.timers = o.timers.filter(t => t.end > now); o.rang = done[done.length - 1];
  if (typeof chime === 'function') chime(); kSay(o, LN.tdone); rerender(true); }, 500);
function vGuide(o, top){
  const steps = kSteps(o), s = steps[o.gi], pct = Math.round(100 * o.gi / Math.max(1, steps.length));
  const rang = o.rang ? `<div class="hj-rang"><b>Timer done:</b> ${esc(o.rang.label)}<button type="button" class="linkbtn" data-hja="kok">Got It</button></div>` : '';
  if (!s) return `${top(o.title, o.sub, 100)}${rang}${arr(o.timers).length ? `<div class="hj-ktimers">${arr(o.timers).map(t => `<div><span class="hj-clock sm" data-hjkt="${t.i}">${clock(t.end - Date.now())}</span><small>${esc(t.label.slice(0, 60))}</small></div>`).join('')}</div>` : ''}<div class="hj-ovb"><div class="hj-big2">${o.k === 'cook' ? 'Dinner is ready.' : 'Prep is done.'}</div>${arr(o.data.yields).length ? `<p class="hj-sub">Ready now: ${arr(o.data.yields).map(esc).join(', ')}</p>` : ''}<button type="button" class="btn btn-gold hj-go" data-hja="cdone">${o.k === 'cook' ? 'Dinner Is Done' : 'Prep Is Done'}</button></div>`;
  const tms = arr(o.timers);
  return `${top(o.title, 'Step ' + (o.gi + 1) + ' of ' + steps.length, pct)}
  ${o.rang ? `<div class="hj-rang"><b>Timer done:</b> ${esc(o.rang.label)}<button type="button" class="linkbtn" data-hja="kok">Got It</button></div>` : ''}
  ${tms.length ? `<div class="hj-ktimers">${tms.map(t => `<div><span class="hj-clock sm" data-hjkt="${t.i}">${clock(t.end - Date.now())}</span><small>${esc(t.label.slice(0, 60))}</small><button type="button" class="linkbtn" data-hja="kstop" data-hjv="${t.i}">Stop</button></div>`).join('')}</div>` : ''}
  <div class="hj-ovb">${s.at ? `<div class="hj-kick">${esc(s.at)}</div>` : ''}<p class="hj-kstep">${esc(s.t)}</p>
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
    case 'amore': if (o && o.run) o.end += 15000; return true;
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

function vSetup(){
  const h = H(), s = S.set || (S.set = Object.assign({household: '', goals: [], goalLdl: '', nextLabs: '', start: ymd(nextMon())}, h.set));
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
  const h = H(), mine = MINE(), first = !h.set.u;
  let body;
  // A Founder's own starting numbers wait in the Founder library: offer them first, on every section, until added (BLD 840b).
  const ready = mine && mine.start && (arr(mine.start.labs).length || arr(mine.start.panels).length) && !h.labs.length && !h.panels.length;
  const offer = ready ? `<div class="hj-blk hj-offer">${kick('Your Starting Numbers Are Ready')}<p class="hj-sub">Your labs, full panels, starting weight, and goals, ready to add to this device in one tap.</p><button type="button" class="btn btn-gold btn-sm" data-hja="mine">Add My Starting Numbers</button></div>` : '';
  if (S.setup || (first && !ready && S.sec === 'today')) body = vSetup();
  else if (S.sec === 'week') body = vWeek();
  else if (S.sec === 'shop') body = vShop();
  else if (S.sec === 'prep') body = vPrep();
  else if (S.sec === 'learn') body = `<p class="hj-lead">The full plans behind every card: why it works, every recipe, every session.</p>${vPlan(lib, 'food')}${vPlan(lib, 'fitness')}`;
  else if (S.sec === 'numbers') body = vNumbers();
  else if (S.sec === 'journey') body = vJourney();
  else body = vToday2(lib);
  const askWho = MINE_ANY() && MINE_ANY().who && h.set.u && !h.set.who ? `<div class="hj-blk hj-offer">${kick('Whose Phone Is This?')}<p class="hj-sub">My Health keeps each person's plan and numbers on their own phone.</p><div class="hj-chips" style="margin:0">${['Chris', 'Kayti', 'Someone else'].map(w => `<button type="button" class="chip" data-hja="whoq" data-hjv="${w}">${w}</button>`).join('')}</div></div>` : '';
  return `<div id="hj-root">${askWho}${offer}
    <div class="hj-secs" role="group" aria-label="My Health">${chip('today', 'Today')}${chip('week', 'This Week')}${chip('shop', 'Shop')}${chip('prep', 'Prep')}${chip('numbers', 'My Numbers')}${chip('journey', 'Journal')}${chip('learn', 'Why It Works')}</div>
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
      if (m.start.weight && !h.marks.length) h.marks.push({id: uid(), date: (m.start.labs[0] || {}).date || today(), weight: m.start.weight, u: Date.now()});
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
document.addEventListener('keydown', e => { if (e.key === 'Escape' && S.ov && document.getElementById('hj-root')) act('ovclose'); if (e.key === 'Enter' && e.target && e.target.id === 'hj-addname') act('shopadd'); });
document.addEventListener('input', e => {
  const t = e.target; if (!t.closest || !t.closest('#hj-root')) return;
  if (t.dataset.hjf && S.form) S.form[t.dataset.hjf] = t.value;
  if (t.dataset.hjs && S.set) S.set[t.dataset.hjs] = t.value;
  if (t.id === 'hj-note') S.draft = t.value;
  if (t.id === 'hj-lb' && S.ov) S.ov.lb = t.value;
});
document.addEventListener('toggle', e => { const d = e.target; if (d && d.dataset && d.dataset.hjd) S.open[d.dataset.hjd] = d.open; }, true);

// ---------- styles ----------
const CSS = `
#hj-root{min-width:0;--hj:#5F7D48;--hjcalm:#6C7FA6;}
:root[data-theme="dark"] #hj-root{--hj:#8FB073;--hjcalm:#9DB0D6;}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) #hj-root{--hj:#8FB073;--hjcalm:#9DB0D6;}}
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
.hj-ldl b{font-family:'Cormorant Garamond',Georgia,serif;font-size:40px;line-height:1;}.hj-ldl span:last-child{color:var(--ink-soft);font-size:15px;}
.hj-wkbar{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 0 12px;}.hj-wkbar>div{text-align:center;min-width:0;}.hj-wkbar small{display:block;color:var(--ink-soft);font-size:13.5px;}
.hj-day{display:flex;gap:12px;padding:10px 0;border-top:1px solid var(--line);}.hj-day:first-child{border-top:0;}.hj-day.t .hj-dl b{color:var(--hj);}
.hj-dl{flex:0 0 52px;}.hj-dl small{display:block;color:var(--ink-soft);font-size:13px;}.hj-dr{flex:1;min-width:0;display:flex;flex-wrap:wrap;gap:6px;}
.hj-pill{border:1px solid var(--line);background:var(--bg-deep);color:var(--ink);border-radius:12px;padding:7px 11px;font:inherit;font-size:15px;cursor:pointer;text-align:left;max-width:100%;overflow-wrap:anywhere;}
.hj-nl{color:var(--ink-soft);font-size:13.5px;}.hj-nut .hj-tbl td,.hj-nut .hj-tbl th{text-align:left;}
.hj-pill.calm{border-left:4px solid var(--hjcalm);}.hj-pill.rem{border-style:dashed;background:none;color:var(--ink-soft);font-size:13.5px;cursor:default;padding:5px 10px;}
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
    ['labs', 'marks', 'notes', 'panels', 'wlog'].forEach(k => {
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
    if (i.stock && (!o.stock || (i.stockU || 0) > (o.stockU || 0))){ o.stock = i.stock; o.stockU = i.stockU; }
    return {added, updated};
  },
  state: S, act, allLines, LN
};
})();
