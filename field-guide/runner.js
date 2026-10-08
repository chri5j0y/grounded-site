// =====================================================================
// GROUNDED FIELD GUIDE (TM): the Session Runner (GWG BLD 771), window.GGRun.
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// One shared engine every session guide plugs into, to the Farewell standard: built for eye contact (big Say lines,
// tap chips, a custom box and Add Your Own everywhere, little typing), a Family View in its own window with Follow My
// Scroll, Phone Mode, Come Back To This, Tidy Up Later, a plan that grows across meetings with Since Last Time, the
// client file link, printouts and Send Everything, approval, a follow-up plan with ready emails and call prompts,
// Copy for Writing Help with placeholders, the session saved into Start a Session's records, the debrief offer, and
// the crisis lines.
// Kits: the Staff library's sessionKits key (sessionKits.<guideId>). A guide without a kit keeps the Field Guide's own
// runner. DEFAULT_KITS below stays empty: kits live only in the sealed library.
// Plans live in DATA.rk.plans: encrypted with the rest of this device's records and carried in backups (merged by
// GGRun.merge). Nothing is sent anywhere.
// The look reuses the Farewell Planning Session's styles (farewell.js loads first); the few new pieces are below.
// =====================================================================
(function(){
'use strict';

let C = {}; // GGRun.init: data(), lib(), tier(), save(), render(), go(), toast(), sheet(), ph(), pf(), guide(id), start(id, cid)
const S = {on: false, id: null, mid: null, step: 0, mode: 'chris', follow: true, appr: false, apName: '', fuOpen: null, pick: null, wsee: false, other: null};
const SITE = 'https://growwithgrounded.com/';
const DEFAULT_KITS = {};
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const arr = x => Array.isArray(x) ? x : [];
const obj = x => x && typeof x === 'object' && !Array.isArray(x) ? x : {};
const toast = m => C.toast ? C.toast(m) : null;
const D = () => (C.data && C.data()) || null;
const isStaff = () => { const t = C.tier && C.tier(); return t === 'staff' || t === 'founder'; };
const clean = t => String(t || '').trim().replace(/[ \t]+/g, ' ');
const slug = t => String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'x';
const fk = k => ` data-rkk="${esc(k)}"`;

// ---------- dates ----------
const pad = n => String(n).padStart(2, '0');
const isoOf = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const today = () => isoOf(new Date());
const dOf = s => { const m = /^(\d{4})-(\d\d)-(\d\d)/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
const addDays = (s, n) => { const d = dOf(s); if (!d) return ''; d.setDate(d.getDate() + n); return isoOf(d); };
const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const nice = s => { const d = dOf(s); return d ? MON[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() : (s || ''); };
const tm = t => { const m = /^(\d\d?):(\d\d)/.exec(t || ''); if (!m) return t || ''; let h = +m[1]; const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + ':' + m[2] + ' ' + ap; };

// ---------- kits ----------
const G = id => (C.guide && C.guide(id)) || null;
const libKits = () => { const l = C.lib && C.lib(); return obj(l && l.sessionKits); };
const NK = new WeakMap();
const isPair = x => x && typeof x === 'object' && !Array.isArray(x) && ('faith' in x || 'plain' in x);
function normOpt(o){
  if (o == null) return null;
  if (typeof o === 'string') return {id: slug(o), t: o};
  if (isPair(o) && o.t == null) return {id: o.id || slug(o.plain || o.faith), t: {faith: o.faith, plain: o.plain}};
  if (typeof o === 'object') return {id: o.id || slug(typeof o.t === 'string' ? o.t : (obj(o.t).plain || obj(o.t).faith)), t: o.t != null ? o.t : o.id};
  return {id: slug(String(o)), t: String(o)};
}
function norm(k){
  if (!k || typeof k !== 'object') return null;
  if (NK.has(k)) return NK.get(k);
  const steps = arr(k.steps).filter(s => s && s.id).map(s => Object.assign({}, s, {
    say: arr(Array.isArray(s.say) ? s.say : s.say ? [s.say] : []), do: arr(s.do), phone: arr(s.phone),
    fields: arr(s.fields).filter(f => f && f.id).map(f => Object.assign({}, f, {type: f.type || 'text',
      options: arr(f.type === 'scale' ? f.words : f.options).map(normOpt).filter(Boolean),
      cols: arr(f.cols).filter(c => c && c.id).map(c => Object.assign({}, c, {options: arr(c.options).map(normOpt).filter(Boolean)}))}))}));
  const n = Object.assign({}, k, {steps, outputs: arr(k.outputs).filter(o => o && o.id), tools: arr(k.tools)});
  NK.set(k, n); return n;
}
const kitRaw = id => libKits()[id] || DEFAULT_KITS[id] || null;
const kitOf = id => id ? norm(kitRaw(id)) : null;
function has(id){ if (!isStaff() || !kitRaw(id)) return false; const g = G(id); return !!(g && g._mine !== 'new'); }
const planGuides = k => k && k.plan && arr(k.plan.guides).length ? arr(k.plan.guides) : [];
// Every kit that shares this plan (the same plan id), the current one first.
function kitsOf(p){
  const ids = [], add = id => { if (id && !ids.includes(id) && kitRaw(id)) ids.push(id); };
  add(curG(p)); arr(p.guides).forEach(add); planGuides(kitOf(p.g0)).forEach(add);
  Object.keys(libKits()).forEach(id => { const k = kitOf(id); if (k && k.plan && k.plan.id && k.plan.id === p.key) add(id); });
  return ids.map(id => ({id, k: kitOf(id)}));
}
function fieldDef(p, id){
  for (const {k} of kitsOf(p)) for (const s of k.steps) for (const f of s.fields) if (f.id === id) return f;
  return null;
}

// ---------- plans ----------
function store(){ const d = D(); if (!d) return {plans: []}; d.rk = d.rk || {plans: []}; d.rk.plans = arr(d.rk.plans); d.rk.me = d.rk.me || {}; return d.rk; }
const plans = () => store().plans;
const plan = () => plans().find(p => p.id === S.id) || null;
const meet = p => p && S.mid ? arr(p.mt).find(m => m.id === S.mid) || null : null;
const curG = p => { const m = meet(p); return m ? m.g : (lastMeet(p) || {}).g || p.g0; };
const kit = p => kitOf(curG(p)) || kitOf(p.g0);
function touch(p){ if (p) p.u = Date.now(); if (C.save) C.save(); pushFam(); }
const me = () => { const n = String(((D() || {}).settings || {}).name || '').trim(); return n.split(/\s+/)[0] || 'Chris'; };
const people = () => arr((D() || {}).clients);
const person = p => p && p.pid ? people().find(c => c.id === p.pid) || null : null;
const files = () => arr(((D() || {}).cli || {}).files);
const fileOf = id => id ? files().find(f => f.id === id) || null : null;
function newPlan(gid, pid){
  const k = kitOf(gid), c = pid ? people().find(x => x.id === pid) : null, f = c && c.cli ? fileOf(c.cli) : null;
  const p = {id: 'rk' + uid(), u: Date.now(), made: today(), key: k && k.plan && k.plan.id ? k.plan.id : gid, g0: gid, guides: [gid], pid: c ? c.id : null, cli: f ? f.id : (c && c.cli) || null,
    name: c ? c.name : '', ct: {}, v: {}, vt: {}, own: {}, custom: {}, stars: {}, faith: false, mt: [], fu: {}, fuOwn: [], appr: [], apSent: null, hot: '', wa: null, wh: {own: []}, next: {}, sent: {}};
  p.faith = !!(k && k.faithDefault === 'faith');
  if (f && f.c){ p.ct = {em: f.c.email || '', ph: f.c.phone || ''}; if (f.c.first) p.name = clean((f.c.first || '') + ' ' + (f.c.last || ''));
    const fa = arr(f.sel && f.sel.faith); if (fa.some(x => /center|faith|blend/.test(x))) p.faith = true; else if (fa.includes('plain')) p.faith = false; }
  else if (c && c.contact){ const em = /[\w.+-]+@[\w-]+\.[\w.-]+/.exec(c.contact), ph = /\+?\d[\d\s().-]{8,}\d/.exec(c.contact); p.ct = {em: em ? em[0] : '', ph: ph ? ph[0] : ''}; }
  if (c) carry(p, k);
  return p;
}
// Carry-forward (BLD 771): a new plan for the same person prefills the kit's carry fields (field "carry": true, kit.carry ids,
// or by default person-name, hospice-line, call-order, rituals-after) from that person's latest plan, marked to confirm.
const CARRY = ['person-name', 'hospice-line', 'call-order', 'rituals-after'];
function carry(p, k){
  if (!k) return; const ids = []; k.steps.forEach(s => s.fields.forEach(f => { if (f.carry || arr(k.carry).includes(f.id) || (!arr(k.carry).length && CARRY.includes(f.id))) ids.push(f.id); }));
  if (!ids.length) return; const prev = plans().filter(x => x.pid === p.pid && x.id !== p.id).sort((a, b) => (b.u || 0) - (a.u || 0));
  p.carried = {};
  ids.forEach(id => { const src = prev.find(x => { const v = obj(x.v)[id]; return Array.isArray(v) ? v.length : clean(v); }); if (!src) return;
    p.v[id] = JSON.parse(JSON.stringify(src.v[id])); if (src.vt && src.vt[id]) p.vt[id] = src.vt[id]; if (arr(obj(src.own)[id]).length) p.own[id] = JSON.parse(JSON.stringify(src.own[id]));
    p.carried[id] = pTitle(src); });
}
const done = m => m && m.done;
function lastMeet(p){ const L = arr(p && p.mt).filter(done).sort((a, b) => (a.at || 0) - (b.at || 0)); return L[L.length - 1] || null; }
function prevMeets(p, m){ return arr(p.mt).filter(x => x !== m && (x.done || (m && x.date < m.date))).sort((a, b) => (a.at || 0) - (b.at || 0)); }
const isFirst = (p, m) => !prevMeets(p, m).length;
function nextGuide(p){ const L = arr(p.guides).length ? kitsOf(p).map(x => x.id) : [p.g0]; const k = kitOf(p.g0), order = planGuides(k).length ? planGuides(k) : L;
  const left = order.filter(id => kitRaw(id) && !arr(p.mt).some(m => m.g === id && m.done)); return left[0] || (lastMeet(p) || {}).g || order[order.length - 1] || p.g0; }
function newMeet(p, gid){
  const m = {id: 'm' + uid(), g: gid, date: today(), at: Date.now(), notes: {}, tidy: {}, done: false, sid: null, summary: '', nx: '', fee: '', paid: false, grace: false, fdate: '', ftext: ''};
  p.mt = arr(p.mt); p.mt.push(m); if (!arr(p.guides).includes(gid)) p.guides = arr(p.guides).concat(gid); return m;
}
const nameOf = p => clean(p.name) || (person(p) || {}).name || '';
const first = p => nameOf(p).split(/\s+/)[0] || '';
function pVal(p){ const k = kit(p), f = k && k.person && k.person.field; const v = f ? valText(p, fieldDef(p, f) || {id: f, type: 'text'}) : ''; return clean(v.split('\n')[0]); }
const pName = p => pVal(p) || T(p, ((kit(p) || {}).person || {}).fallback) || '';
const pTitle = p => { const k = kitOf(p.g0) || {}; return (k.plan && k.plan.title) || k.title || ((G(p.g0) || {}).title) || 'Session'; };
const whoLine = p => [nameOf(p), pVal(p) && pVal(p) !== nameOf(p) ? (((kit(p) || {}).person || {}).label ? '' : 'for ') + pVal(p) : ''].filter(Boolean).join(', ');

// Faith or Plain: plain words unless Faith is on for this plan; a missing plain word stays blank (faith is never pushed).
function T(p, x){
  if (x == null) return '';
  if (isPair(x)) return isFaith(p) ? String(x.faith != null && x.faith !== '' ? x.faith : (x.plain || '')) : String(x.plain != null ? x.plain : '');
  return String(x);
}
function fill(t, p, x){
  x = x || {}; const m = meet(p), s = T(p, t);
  const v = {Name: first(p), Person: pName(p), Chris: me(), Date: nice((m && m.date) || today()), Next: nice(((p && p.next) || {}).date || '')};
  return s.replace(/\[(Name|Person|Chris|Date|Next)\]/g, (a, k) => x[k] != null ? x[k] : v[k] ? v[k] : a)
    .replace(/\{([a-z0-9_-]+)\}/gi, (a, id) => { const f = p && fieldDef(p, id); return f ? valText(p, f).replace(/\n/g, '; ') : a; });
}
// Faith or Plain (lead note, BLD 771): the kit's faithDefault, the client file's choice, a wording field (kit.faithFrom, or a
// field with the id "wording") that follows the family's pick, and a Plain lock (kit.plainLock, or a field "plain-lock") for schools and groups.
const ffId = k => (k && k.faithFrom) || 'wording', plId = k => (k && k.plainLock) || 'plain-lock';
function locked(p){ if (!p) return false; for (const {k} of kitsOf(p)){ const v = p.v[plId(k)]; if (Array.isArray(v) ? v.length : v) return true; } return false; }
function isFaith(p){ if (!p || locked(p)) return false; const k = kit(p), w = arr(p.v[ffId(k)]); if (w.includes('faith')) return true; if (w.includes('plain')) return false; return !!p.faith; }
const hasPairs = k => /"(faith|plain)":/.test(JSON.stringify(kitRaw(k) || {}));

// ---------- field values ----------
const opts = (p, f) => f.options.concat(f.type === 'scale' ? [] : arr(p.own[f.id]));
const optT = (p, f, id) => { const o = opts(p, f).find(x => x.id === id); return o ? fill(o.t, p) : id; };
function valText(p, f){
  if (!p || !f) return ''; const v = p.v[f.id];
  switch (f.type){
    case 'chips': case 'check': return arr(v).map(id => optT(p, f, id)).filter(Boolean).join(', ');
    case 'scale': return clean(v);
    case 'list': return arr(v).map(r => f.cols.map(c => { const x = obj(r)[c.id]; return c.type === 'date' ? nice(x) : c.type === 'time' ? tm(x) : clean(x); }).filter(Boolean).join(', ')).filter(Boolean).join('\n');
    case 'date': return [v ? nice(v) : '', tm(p.vt[f.id])].filter(Boolean).join(', ');
    default: return String(v == null ? '' : v).trim();
  }
}
const isOn = (p, f, id) => f.type === 'scale' ? p.v[f.id] === optT(p, f, id) : arr(p.v[f.id]).includes(id);

// ---------- pages ----------
function steps(p){ const k = kit(p), m = meet(p), fst = !m || isFirst(p, m); return k ? k.steps.filter(s => !s.only || (s.only === 'first' ? fst : !fst)) : []; }
function pages(p){
  const k = kit(p) || {}, L = steps(p).map((s, i) => i);
  if (k.outputs && k.outputs.length || k.writing || k.approval) L.push('out');
  if (kitsOf(p).some(x => x.k.followUp && arr(x.k.followUp.touches).length) || arr(p.fuOwn).length) L.push('fu');
  L.push('tidy', 'finish'); return L;
}
const PAGE_T = {out: "What They'll Get", fu: 'Follow-Up Plan', tidy: 'Tidy Up', finish: 'Finish'};
const pageT = (p, k) => typeof k === 'number' ? fill((steps(p)[k] || {}).title || '', p) : PAGE_T[k];

// ---------- small builders ----------
const sayBox = (p, L) => arr(L).map(t => fill(t, p)).filter(Boolean).map(t => `<div class="fw-say"><b>Say</b><q>${esc(t)}</q></div>`).join('');
function star(p, key, lab){
  const on = !!p.stars[key];
  return `<button type="button" class="fw-star" data-rka="star" data-rkv="${esc(key)}" data-rkl="${esc(lab)}" aria-pressed="${on}"${fk('st|' + key)}><span aria-hidden="true">${on ? '&#9733;' : '&#9734;'}</span> Come Back To This</button>`;
}
const blk = (p, title, key, inner, sub) => `<section class="fw-blk" data-rkanc="${esc(key)}"><div class="fw-blk-h"><h3>${esc(title)}</h3>${key ? star(p, key, title) : ''}</div>${sub ? `<p class="fw-sub">${esc(sub)}</p>` : ''}${inner}</section>`;
const addOwn = (id, ph) => `<div class="fw-add"><input type="text" data-rkown="${esc(id)}" aria-label="Add your own" placeholder="${esc(ph || 'Something else? Type it here')}" autocomplete="off"><button type="button" class="btn btn-line btn-sm" data-rka="own" data-rkv="${esc(id)}"${fk('own|' + id)}>Add Your Own</button></div>`;
function note(p, sid){
  const m = meet(p); if (!m) return '';
  const t = !!m.tidy[sid];
  return `<div class="fw-note"><label class="f" for="rk-n-${esc(sid)}">Quick Note</label><textarea id="rk-n-${esc(sid)}" rows="2" data-rkm="notes.${esc(sid)}" placeholder="A few words. Tidy them later.">${esc(m.notes[sid] || '')}</textarea>
    <button type="button" class="fw-tidy" data-rka="tidy" data-rkv="${esc(sid)}" aria-pressed="${t}"${fk('td|' + sid)}>${t ? 'Tidy Up Later: Marked' : 'Tidy Up Later'}</button></div>`;
}
const custom = (p, sid) => `<details class="fw-custom"${p.custom[sid] ? ' open' : ''}><summary>Your Custom Details</summary><textarea rows="3" aria-label="Your custom details" data-rki="custom.${esc(sid)}" placeholder="Anything else for this step, in your own words.">${esc(p.custom[sid] || '')}</textarea></details>`;
const inp = (path, lab, val, type, ph, attr) => { const id = 'rk-' + String(path).replace(/[^a-z0-9]+/gi, '-'); return `<div class="fw-fld"><label class="f" for="${id}">${esc(lab)}</label><input id="${id}" type="${type || 'text'}" ${attr || 'data-rki'}="${esc(path)}" value="${esc(val || '')}"${ph ? ` placeholder="${esc(ph)}"` : ''} autocomplete="off"></div>`; };

// ---------- crisis lines ----------
const MAARC = '1-844-880-1574';
// The hospice line comes first when the plan has one (a "hospice-line" field, or the line typed into the crisis bar).
// A crisis line with a {field} placeholder shows only when that field is filled.
const lineOn = (p, t) => !/\{([a-z0-9_-]+)\}/i.test(T(p, t)) || [...T(p, t).matchAll(/\{([a-z0-9_-]+)\}/gi)].every(m => { const f = fieldDef(p, m[1]); return f && valText(p, f); });
const hot = p => clean(p.v['hospice-line']) || clean(p.hot);
function crisisIds(k){ let L = arr(k && k.crisisLines); if (!L.length) L = ['988', '911']; return L.includes('hospice') ? ['hospice'].concat(L.filter(x => x !== 'hospice')) : L; }
function crisisBar(p){
  const k = kit(p), L = crisisIds(k).map(x => {
    if (x === 'hospice') return hot(p) ? `<a class="btn btn-danger btn-sm" href="tel:${esc(String(hot(p)).replace(/[^\d+]/g, ''))}">Hospice 24/7 Line: ${esc(hot(p))}</a>` : `<span class="rk-hot"><input type="tel" data-rki="hot" aria-label="Their hospice 24/7 line" placeholder="Their hospice 24/7 line" autocomplete="off"></span>`;
    if (x === '988') return '<a class="btn btn-danger btn-sm" href="tel:988">Call or Text 988</a>';
    if (x === '911') return '<a class="btn btn-danger btn-sm" href="tel:911">Emergency: 911</a>';
    if (x === 'maarc') return `<a class="btn btn-line btn-sm" href="tel:18448801574">Vulnerable Adult: MAARC ${MAARC}</a>`;
    if (x && x.t) return lineOn(p, x.t) ? `<span class="rk-cl">${esc(fill(x.t, p))}</span>` : '';
    return ''; }).join('');
  return `<div class="rk-crisis" role="note"><b>In a Crisis</b><div class="row">${L}</div></div>`;
}
function crisisText(p){
  const k = kit(p), L = [];
  crisisIds(k).forEach(x => { if (x === 'hospice' && hot(p)) L.push('Your hospice 24/7 line: ' + hot(p) + '.'); if (x === '988') L.push('In a crisis, call or text 988 any time.'); if (x === '911') L.push('In an emergency, call 911.'); if (x === 'maarc') L.push('To report concern for a vulnerable adult in Minnesota: MAARC ' + MAARC + '.'); if (x && x.t && lineOn(p, x.t)) L.push(fill(x.t, p)); });
  return L.join(' ');
}
const crisisOn = (p, s) => !!((kit(p) || {}).crisis || (s && s.crisis));

// ---------- fields: Chris's View ----------
function chipsHTML(p, f){
  const single = f.type === 'scale' || !f.many;
  return `<div class="fw-chips" role="group" aria-label="${esc(f.label || f.id)}">${opts(p, f).map(o => `<button type="button" class="chip" data-rka="chip" data-rkv="${esc(f.id + '|' + o.id)}"${single ? ' data-rks="1"' : ''} aria-pressed="${isOn(p, f, o.id)}"${fk('c|' + f.id + '|' + o.id)}>${esc(fill(o.t, p))}</button>`).join('')}</div>`;
}
function listHTML(p, f){
  const rows = arr(p.v[f.id]);
  const cell = (r, i, c) => { const path = 'v.' + f.id + '.' + i + '.' + c.id, lab = fill(c.label || c.id, p), v = obj(r)[c.id];
    if (c.type === 'chips') return `<div class="rk-lc rk-lcw"><span class="fw-lbl">${esc(lab)}</span><div class="fw-chips">${c.options.map(o => { const t = fill(o.t, p); return `<button type="button" class="chip fw-sm" data-rka="lchip" data-rkv="${esc(f.id + '|' + i + '|' + c.id + '|' + o.id)}" aria-pressed="${v === t}">${esc(t)}</button>`; }).join('')}</div></div>`;
    return `<div class="rk-lc"><label class="f" for="rk-${esc(f.id)}-${i}-${esc(c.id)}">${esc(lab)}</label><input id="rk-${esc(f.id)}-${i}-${esc(c.id)}" type="${c.type === 'date' || c.type === 'time' ? c.type : 'text'}" data-rki="${esc(path)}" value="${esc(v || '')}" autocomplete="off"></div>`; };
  return `<div class="rk-list">${rows.map((r, i) => `<div class="rk-lrow">${f.cols.map(c => cell(r, i, c)).join('')}<button type="button" class="linkbtn rk-ldel" data-rka="ldel" data-rkv="${esc(f.id + '|' + i)}" aria-label="Remove this row">Remove</button></div>`).join('')}</div>
    <div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-rka="ladd" data-rkv="${esc(f.id)}"${fk('la|' + f.id)}>${esc(fill(f.add || 'Add a Row', p))}</button></div>`;
}
function fieldCtl(p, f){
  const id = f.id, v = p.v[id], own = f.own !== false;
  switch (f.type){
    case 'chips': return chipsHTML(p, f) + (own ? addOwn(id) : '');
    case 'scale': return chipsHTML(p, f);
    case 'check': return `<div class="rk-checks">${opts(p, f).map(o => `<label class="fw-ck"><input type="checkbox" data-rkc="${esc(id + '|' + o.id)}"${isOn(p, f, o.id) ? ' checked' : ''}><span>${esc(fill(o.t, p))}</span></label>`).join('')}</div>` + (own ? addOwn(id, 'Add an item') : '');
    case 'list': return listHTML(p, f);
    case 'date': return `<div class="fw-g2">${inp('v.' + id, 'Date', v, 'date')}${f.time ? inp('vt.' + id, 'Time', p.vt[id], 'time') : ''}</div>`;
    default: return (+f.rows || 1) > 1 ? `<textarea rows="${+f.rows}" data-rki="v.${esc(id)}" aria-label="${esc(fill(f.label || id, p))}"${f.placeholder ? ` placeholder="${esc(fill(f.placeholder, p))}"` : ''}>${esc(v || '')}</textarea>`
      : `<input type="text" data-rki="v.${esc(id)}" aria-label="${esc(fill(f.label || id, p))}" value="${esc(v || '')}"${f.placeholder ? ` placeholder="${esc(fill(f.placeholder, p))}"` : ''} autocomplete="off">`;
  }
}
function fieldHTML(p, f){
  const ask = f.ask ? `<p class="rk-ask"><b>Ask</b> ${esc(fill(f.ask, p))}</p>` : '';
  const cr = p.carried && p.carried[f.id] ? `<p class="fw-note2" style="margin:0 0 10px">Carried from ${esc(p.carried[f.id])}. Check it together. <button type="button" class="linkbtn" data-rka="carry-ok" data-rkv="${esc(f.id)}">Looks Right</button></p>` : '';
  return blk(p, fill(f.label || f.id, p), 'f:' + f.id, cr + ask + fieldCtl(p, f), f.hint ? fill(f.hint, p) : '');
}

// ---------- tools ----------
const TOOL_T = {intake: 'Open the Intake Session', farewell: 'Open the Farewell Planning Session', wedding: 'Open the Wedding Planning Session', marriage: 'Open The Grounded Marriage', services: 'Open the Service Builder', eulogy: 'Open the Eulogy Helper', obituary: 'Open the Obituary Helper'};
const TREE_TABS = ['oak', 'sequoia', 'pine', 'birch', 'maple', 'aspen', 'willow', 'grove'];
const TOOL_URL = {eulogy: 'eulogy-helper.html', obituary: 'obituary-helper.html'};
const toolURL = t => t.url || TOOL_URL[t.tool] || '';
const toolLabel = t => t.label || TOOL_T[t.tool] || (TREE_TABS.includes(t.tool) ? 'Open ' + t.tool.charAt(0).toUpperCase() + t.tool.slice(1) : 'Open');
function toolsHTML(p, L, where){
  L = arr(L); if (!L.length) return '';
  return `<div class="rk-tools">${L.map((t, i) => { const u = toolURL(t), full = u ? SITE + u.replace(/^\/+/, '') : '';
    const words = t.share && full ? (fill(t.words || 'Here is the link: [Link]', p, {Link: full})) : '';
    const w2 = words && !words.includes(full) ? words + '\n\n' + full : words;
    const qr = t.share && full && window.GGQR && GGQR.svg ? GGQR.svg(full, {label: 'QR code for ' + toolLabel(t)}) : '';
    return `<div class="rk-tool">${t.say ? `<p class="rk-ask"><b>Say</b> ${esc(fill(t.say, p))}</p>` : ''}<button type="button" class="btn btn-line" data-rka="tool" data-rkv="${esc(where + '|' + i)}">${esc(fill(toolLabel(t), p))}</button>
      ${t.share && full ? `<div class="fw-share"><div class="fw-qr">${qr}</div><div class="fw-share-m"><div class="fw-lbl">Ready-to-send words</div><div class="fw-words">${esc(w2)}</div>
        <div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-rka="copy-link" data-rkv="${esc(full)}">Copy Link</button><a class="btn btn-line btn-sm" href="${esc(smsHref(p.ct.ph, w2))}">Text It</a><a class="btn btn-line btn-sm" href="${esc(mailHref(p.ct.em, toolLabel(t).replace(/^Open (the )?/, ''), w2))}">Email It</a></div></div></div>` : ''}</div>`; }).join('')}</div>`;
}
function toolList(p, where){ const k = kit(p); if (where === 'kit') return k.tools; const s = steps(p)[+where]; return s ? arr(s.tools) : []; }
function openTool(p, t){
  if (!t) return;
  const f = fileOf(p.cli), c = person(p), nm = nameOf(p);
  const leave = () => { S.on = false; };
  if (t.tool === 'intake'){ if (window.GGCli && GGCli.open){ leave(); GGCli.open('intake'); } else toast('The Intake Session is not on this device yet.'); return; }
  if (t.tool === 'farewell'){ if (!window.GGFw || !GGFw.create) return toast('The Farewell Planning Session is not on this device yet.');
    const id = GGFw.create({cli: p.cli || '', contact: {name: nm, ph: p.ct.ph, em: p.ct.em}, person: {full: pVal(p)}}); if (f){ f.links = f.links || {}; f.links.fw = arr(f.links.fw).concat(id); f.u = Date.now(); }
    p.links = Object.assign({}, p.links, {fw: id}); touch(p); leave(); GGFw.open(id); return; }
  if (t.tool === 'wedding'){ if (!window.GGWed || !GGWed.create) return toast('The Wedding Planning Session is not on this device yet.');
    const id = GGWed.create({cli: p.cli || '', type: t.type || 'wedding', c: {p1: {full: nm, called: first(p), ph: p.ct.ph, em: p.ct.em}}}); if (f){ f.links = f.links || {}; f.links.wd = arr(f.links.wd).concat(id); f.u = Date.now(); }
    p.links = Object.assign({}, p.links, {wd: id}); touch(p); leave(); GGWed.open(id); return; }
  if (t.tool === 'marriage'){ leave(); if (C.go) C.go('premarital'); return; }
  if (t.tool === 'services'){ leave(); if (C.go) C.go('ceremonies'); return; }
  if (TREE_TABS.includes(t.tool)){ leave(); if (C.go) C.go(t.tool); return; }
  const u = toolURL(t); if (!u) return;
  API.lastLink = u; if (API.noOpen) return;
  try { window.open(new URL('../' + u.replace(/^\/+/, ''), location.href).href, '_blank', 'noopener'); } catch (e) {}
}

// ---------- Since Last Time and the meeting log ----------
function sinceBlk(p){
  const m = meet(p), k = kit(p), L = prevMeets(p, m); if (!L.length) return '';
  const last = L[L.length - 1], g = G(last.g) || {}, ids = arr(k.plan && k.plan.sinceLast);
  const rows = ids.map(id => fieldDef(p, id)).filter(Boolean).map(f => [fill(f.label || f.id, p), valText(p, f)]).filter(r => r[1]);
  const st = Object.keys(p.stars).map(x => p.stars[x].label);
  const fuDone = touches(p).filter(t => doneOf(p, t) && t.date && t.date >= last.date);
  return `<section class="fw-blk rk-sl" data-rkanc="since"><div class="fw-blk-h"><h3>Since Last Time</h3><span class="muted">${esc(nice(last.date))}${g.title ? ', ' + esc(g.title) : ''}</span></div>
    ${last.summary ? `<p>${esc(last.summary)}</p>` : ''}${last.nx ? `<p><b>Next steps we set:</b> ${esc(last.nx)}</p>` : ''}
    ${rows.length ? `<ul class="fw-flist">${rows.map(r => `<li><span>${esc(r[0])}</span><span>${esc(r[1]).replace(/\n/g, '<br>')}</span></li>`).join('')}</ul>` : ''}
    ${st.length ? `<p class="fw-sub"><b>Come Back To This:</b> ${esc(st.join('; '))}</p>` : ''}
    ${fuDone.length ? `<p class="fw-sub"><b>Follow-ups done since:</b> ${esc(fuDone.map(t => t.title).join('; '))}</p>` : ''}
    <p class="fw-sub" style="margin-bottom:0">${L.length} earlier ${L.length === 1 ? 'meeting' : 'meetings'} in this plan.</p></section>`;
}
function famSince(p){
  const m = meet(p), k = kit(p), L = prevMeets(p, m); if (!L.length) return '';
  const rows = arr(k.plan && k.plan.sinceLast).map(id => fieldDef(p, id)).filter(f => f && f.family).map(f => [fill(f.label || f.id, p), valText(p, f)]).filter(r => r[1]);
  return fsec('Since Last Time', `<p class="fw-big fw-soft">Picking up where we left off on ${esc(nice(L[L.length - 1].date))}.</p>${rows.length ? `<ul class="fw-flist">${rows.map(r => `<li><span>${esc(r[0])}</span><span>${esc(r[1]).replace(/\n/g, '<br>')}</span></li>`).join('')}</ul>` : ''}`, 'since');
}

// ---------- a step ----------
function prepBlk(p){
  const g = G(curG(p)) || {}, P = arr(g.prep), B = arr(g.bring); if (!P.length && !B.length) return '';
  return `<details class="fw-custom"><summary>Before You Begin</summary>${P.length ? `<ul class="rk-do">${P.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}${B.length ? `<div class="fw-lbl">What to Bring</div><ul class="rk-do">${B.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}</details>`;
}
function wordsBlk(p){ const g = G(curG(p)) || {}, W = arr(g.words); return W.length ? `<details class="fw-custom"><summary>Words That Help</summary><ul class="rk-do">${W.map(x => `<li>${esc(x)}</li>`).join('')}</ul></details>` : ''; }
function vStep(p, i){
  const s = steps(p)[i]; if (!s) return '';
  return (crisisOn(p, s) ? crisisBar(p) : '') + (i === 0 ? sinceBlk(p) + prepBlk(p) : '') +
    sayBox(p, s.say) + (s.sub ? `<p class="fw-sub">${esc(fill(s.sub, p))}</p>` : '') +
    (s.do.length ? `<ul class="rk-do" aria-label="Remember">${s.do.map(x => `<li>${esc(fill(x, p))}</li>`).join('')}</ul>` : '') +
    (i === 0 ? toolsHTML(p, kit(p).tools, 'kit') : '') + toolsHTML(p, s.tools, String(i)) +
    s.fields.map(f => fieldHTML(p, f)).join('') + custom(p, s.id) + note(p, s.id) + wordsBlk(p);
}

// ---------- the follow-up plan ----------
function touches(p){
  const out = [];
  kitsOf(p).forEach(({id, k}) => { const F = k.followUp; if (!F || !arr(F.touches).length) return;
    let base = ''; const ms = arr(p.mt).filter(m => m.g === id).sort((a, b) => (a.at || 0) - (b.at || 0)), m0 = ms.find(done) || ms[0], from = m0 ? m0.date : p.made;
    if (!F.anchor || F.anchor === 'meeting') base = m0 ? m0.date : '';
    else base = /^\d{4}-\d\d-\d\d$/.test(p.v[F.anchor] || '') ? p.v[F.anchor] : '';
    // A touch dated before this kit's first meeting (an anchor already in the past) is skipped, never a pile of overdue reminders.
    arr(F.touches).forEach(t => { if (!t || !t.id) return; const ta = t.anchor ? String(t.anchor).replace(/^field:/, '') : '';
      const b2 = ta ? (ta === 'meeting' ? (m0 ? m0.date : '') : /^\d{4}-\d\d-\d\d$/.test(p.v[ta] || '') ? p.v[ta] : '') : base, dt = b2 ? addDays(b2, +t.days || 0) : '';
      const an = ta ? (ta === 'meeting' ? '' : ta) : F.anchor && F.anchor !== 'meeting' ? F.anchor : '';
      out.push({id: id + ':' + t.id, g: id, f: t, anchor: an, title: fill(t.title || 'Follow-Up', p), date: dt, past: !!(dt && from && dt < from)}); }); });
  arr(p.fuOwn).forEach(o => out.push({id: o.id, own: true, f: {title: o.title}, title: o.title || 'My Own Check-In', date: o.date || ''}));
  return out.sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
}
const cfu = (p, t) => { const c = person(p); return c ? arr(c.followups).find(f => f.rk === p.id && f.tid === t.id) || null : null; };
const doneOf = (p, t) => !!((p.fu[t.id] || {}).done || (cfu(p, t) || {}).done);
// The follow-ups go into the People record's follow-ups too (marked, so the Home card lists them once).
function syncFu(p){
  const c = person(p); if (!c) return 0; c.followups = arr(c.followups); let n = 0;
  touches(p).forEach(t => { if (!t.date || t.past) return; const x = cfu(p, t), dn = doneOf(p, t), text = t.title + ' (' + pTitle(p) + ')';
    if (!x){ c.followups.push({date: t.date, text, done: dn, rk: p.id, tid: t.id}); n++; } else { x.date = t.date; x.text = text; x.done = dn; } });
  c.followups = c.followups.filter(f => !f.rk || f.rk !== p.id || touches(p).some(t => t.id === f.tid && t.date && !t.past));
  c.u = Date.now(); return n;
}
function dueSoon(){
  const out = [], until = addDays(today(), 7);
  plans().forEach(p => touches(p).forEach(t => { if (t.date && !t.past && t.date <= until && !doneOf(p, t)) out.push({p, t}); }));
  return out.sort((a, b) => a.t.date.localeCompare(b.t.date));
}
function vFu(p){
  const T = touches(p), nextT = (T.find(t => !doneOf(p, t) && !t.past) || {}).id;
  const unset = T.some(t => !t.date && !t.own && !t.anchor), anc = [...new Set(T.filter(t => t.anchor).map(t => t.anchor))];
  return `<p class="fw-sub" style="margin-top:0">Quiet reminders after today. Each one has ready words to send and a few prompts for a phone call. They show on Home when they are due${person(p) ? ', and in the People record' : ''}.</p>` +
    (unset ? '<p class="fw-sub">The dates fill in from the first meeting.</p>' : '') +
    anc.map(a => { const f = fieldDef(p, a); return blk(p, f ? fill(f.label || a, p) : 'The Date These Follow', '', `<p class="fw-sub" style="margin-top:0">The follow-up dates count from this date. Reminders that would fall before today's plan began are skipped.</p><div class="fw-g2">${inp('v.' + a, 'Date', p.v[a], 'date')}<div class="fw-fld" style="align-self:end"><button type="button" class="btn btn-line btn-sm" data-rka="anc-today" data-rkv="${esc(a)}">Use Today</button></div></div>`); }).join('') +
    `<div class="fw-tl">${T.map(t => { const f = t.f, st = p.fu[t.id] || {}, em = f.email || {}, cl = f.call || {}, open = S.fuOpen ? S.fuOpen === t.id : t.id === nextT, dn = doneOf(p, t);
      const body = fill(em.body || '', p), sub = fill(em.subject || t.title, p);
      return `<details class="fw-fu${dn ? ' done' : ''}" data-rkfu="${esc(t.id)}"${open ? ' open' : ''}><summary><span class="fw-dot" aria-hidden="true"></span><b>${esc(t.title)}</b><span class="fw-when">${t.date ? esc(nice(t.date)) : 'Date to come'}${t.past && !dn ? ' &middot; Passed before the plan began' : ''}${dn ? ' &middot; Done' : ''}</span></summary><div class="fw-fu-in">
        ${t.own ? '' : `${em.body ? `<div class="fw-box"><h4>Ready-to-Send Email</h4><div class="fw-words">${esc(body)}</div><div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-rka="fu-copy" data-rkv="${esc(t.id)}">Copy</button><a class="btn btn-line btn-sm" href="${esc(mailHref(p.ct.em, sub, body))}">Open in Mail</a></div></div>` : ''}
        ${cl.open || arr(cl.questions).length ? `<div class="fw-box"><h4>Phone Call</h4>${cl.open ? `<div class="fw-lbl">Opening</div><p>"${esc(fill(cl.open, p))}"</p>` : ''}${arr(cl.questions).length ? `<div class="fw-lbl">Gentle questions</div><ul>${cl.questions.map(q => `<li>${esc(fill(q, p))}</li>`).join('')}</ul>` : ''}${cl.listenFor ? `<div class="fw-lbl">Listen for</div><p>${esc(fill(cl.listenFor, p))}</p>` : ''}${cl.moreSupport ? `<div class="fw-lbl">When to suggest more support</div><p>${esc(fill(cl.moreSupport, p))}</p>` : ''}<div class="fw-crisis">${esc(crisisText(p))}</div></div>` : ''}
        ${f.resource ? `<div class="fw-box fw-full"><h4>Resource to Share</h4><p>${esc(fill(f.resource, p))}</p></div>` : ''}`}
        <div class="fw-box fw-full"><label class="fw-ck"><input type="checkbox" data-rkfd="${esc(t.id)}"${dn ? ' checked' : ''}> Done</label><textarea rows="2" data-rki="fu.${esc(t.id)}.note" aria-label="Note for ${esc(t.title)}" placeholder="How it went, a few words">${esc(st.note || '')}</textarea>${t.own ? `<button type="button" class="linkbtn" data-rka="fu-del" data-rkv="${esc(t.id)}">Remove This Check-In</button>` : ''}</div>
      </div></details>`; }).join('') || '<p class="muted">No follow-ups in this plan yet.</p>'}</div>
    <section class="fw-blk"><h3>Add Your Own Check-In</h3><div class="fw-g3"><div class="fw-fld"><label class="f" for="rk-fuo-t">What</label><input type="text" id="rk-fuo-t" placeholder="A hard date, a birthday, a milestone..." autocomplete="off"></div><div class="fw-fld"><label class="f" for="rk-fuo-d">Date</label><input type="date" id="rk-fuo-d"></div><div class="fw-fld" style="align-self:end"><button type="button" class="btn btn-line btn-sm" data-rka="fu-add">Add Your Own</button></div></div></section>` +
    custom(p, 'followup') + note(p, 'followup');
}

// ---------- outputs (printouts) ----------
const H = s => esc(s);
const paras = t => String(t || '').split(/\n{2,}/).map(x => x.trim()).filter(Boolean).map(x => `<p>${esc(x).replace(/\n/g, '<br>')}</p>`).join('');
const outs = p => arr((kit(p) || {}).outputs);
const famOuts = p => outs(p).filter(o => o.for !== 'chris');
// Chris's stories chosen in a field marked "stories": true (its options are story titles) add their credit lines to a printout that shows the field.
function storiesIn(p, o){ const ids = o ? arr(o.sections).flatMap(s => arr(s.fields)) : []; const L = [];
  ids.forEach(id => { const f = fieldDef(p, id); if (f && f.stories && (f.type === 'chips' || f.type === 'check')) arr(p.v[id]).forEach(v => L.push(optT(p, f, v))); }); return L; }
function srcHTML(p, o){ const k = kit(p) || {}; if (!window.GGSources || !GGSources.line) return ''; try { return GGSources.line(arr(k.sources), {stories: arr(k.stories).concat(storiesIn(p, o))}); } catch (e) { return ''; } }
function srcText(p, o){ const h = srcHTML(p, o); if (!h) return ''; const d = document.createElement('div'); d.innerHTML = h; return d.innerText.trim(); }
function secRows(p, sec){
  return arr(sec.fields).map(id => fieldDef(p, id)).filter(Boolean).map(f => ({f, lab: fill(f.label || f.id, p), v: valText(p, f)})).filter(r => r.v);
}
function outBody(p, o){
  const one = s => arr(s.fields).length === 1;
  let h = `<h1>${H(fill(o.title, p))}</h1>` + (whoLine(p) ? `<p class="rk-pfor">${H(whoLine(p))}</p>` : '') + (o.lead ? paras(fill(o.lead, p)) : '');
  arr(o.sections).forEach(sec => { const R = secRows(p, sec), t = sec.text ? fill(sec.text, p) : '';
    if (!R.length && !t) return;
    h += (sec.h ? `<h2>${H(fill(sec.h, p))}</h2>` : '') + R.map(r => r.f.type === 'list' ? `${one(sec) ? '' : `<h3>${H(r.lab)}</h3>`}<ul>${r.v.split('\n').map(x => `<li>${H(x)}</li>`).join('')}</ul>`
      : (r.f.type === 'text' && (+r.f.rows || 1) > 1) ? `${one(sec) ? '' : `<h3>${H(r.lab)}</h3>`}${paras(r.v)}` : `<p>${one(sec) ? '' : `<b>${H(r.lab)}:</b> `}${H(r.v)}</p>`).join('') + (t ? paras(t) : ''); });
  if (o.for === 'chris'){ const m = meet(p) || lastMeet(p), N = m ? steps(p).map(s => [fill(s.title, p), (m.notes || {})[s.id], p.custom[s.id]]).filter(r => clean(r[1]) || clean(r[2])) : [];
    if (N.length) h += `<h2>Your Notes</h2>` + N.map(r => `<h3>${H(r[0])}</h3>${paras([r[1], r[2]].filter(x => clean(x)).join('\n\n'))}`).join(''); }
  if (o.crisis) h += `<p class="rk-pcrisis">${H(crisisText(p))}</p>`;
  if (o.for !== 'chris') h += srcHTML(p, o);
  return h;
}
const PCSS = `<style>.rk-pg h1{margin:0 0 2mm;}.rk-pg h2{margin:5mm 0 2mm;}.rk-pg h3{margin:3mm 0 1mm;font-size:11pt;}.rk-pg p{margin:0 0 2mm;}.rk-pfor{font-style:italic;}.rk-pcrisis{margin-top:6mm;padding:2mm 3mm;border-left:1mm solid #9b2c2c;}.rk-card{max-width:125mm;border:.4mm solid #8B5E1A;border-radius:4mm;padding:6mm 7mm;margin:0 auto;}.rk-card h1{font-size:18pt;}</style>`;
const pageOf = (p, o) => `<div class="ht-page rk-pg${o.for === 'card' ? ' rk-card' : ''}">${outBody(p, o)}</div>`;
function outText(p, o){
  const L = [fill(o.title, p).toUpperCase()]; if (whoLine(p)) L.push(whoLine(p)); if (o.lead) L.push('', fill(o.lead, p));
  arr(o.sections).forEach(sec => { const R = secRows(p, sec), t = sec.text ? fill(sec.text, p) : ''; if (!R.length && !t) return;
    L.push('', fill(sec.h || '', p).toUpperCase()); R.forEach(r => L.push(r.f.type === 'list' ? r.lab + ':\n' + r.v.split('\n').map(x => '* ' + x).join('\n') : r.lab + ': ' + r.v)); if (t) L.push(t); });
  if (o.crisis) L.push('', crisisText(p));
  if (o.for !== 'chris' && srcText(p, o)) L.push('', srcText(p, o));
  return L.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
function sheet(html, title, file){
  const body = (C.ph ? C.ph(pTitle(plan() || {})) : '') + html + (C.pf ? C.pf() : '');
  API.last = {title, html: body};
  if (C.sheet) C.sheet(body, title, {file});
}
const bundleHTML = p => PCSS + famOuts(p).map(o => pageOf(p, o)).join('');
const bundleText = p => famOuts(p).map(o => outText(p, o)).join('\n\n\n');
const apOuts = p => { const A = (kit(p) || {}).approval, ids = arr(A && A.outputs); const L = ids.length ? outs(p).filter(o => ids.includes(o.id)) : famOuts(p); return L.length ? L : famOuts(p); };
const apText = p => apOuts(p).map(o => outText(p, o)).join('\n\n\n');
function verOf(p){ const t = apText(p); let h = 5381; for (let i = 0; i < t.length; i++) h = ((h << 5) + h + t.charCodeAt(i)) >>> 0; return h.toString(36).slice(0, 6); }
const lastAppr = p => arr(p.appr)[arr(p.appr).length - 1] || null;
function apStatus(p){ const a = lastAppr(p); if (!a) return {ok: false, t: 'Not approved yet.'}; const cur = a.ver === verOf(p);
  return {ok: cur, a, t: (a.name || 'They') + ' approved this on ' + nice(a.date) + (a.way === 'reply' ? ' by reply' : ' in the Family View') + (cur ? '.' : ', and it has changed since. Ask again when it is ready.')}; }
function recordAppr(p, o){ p.appr = arr(p.appr); p.appr.push({ver: o.ver || verOf(p), date: o.date || today(), at: Date.now(), name: o.name, way: o.way, reply: o.reply || '', text: o.text || apText(p)}); }
function apBox(p){ const A = (kit(p) || {}).approval || {}, st = apStatus(p);
  return `<div class="fw-apbox"><h3>${esc(fill(A.ask || 'Does this look right to you?', p))}</h3>${st.ok ? `<p class="fw-big">&#10003; ${esc(st.t)}</p>` : `<label for="rk-apn">Your name</label><input id="rk-apn" class="fw-apin" type="text" data-rkapn="1" value="${esc(S.apName || '')}" autocomplete="off"><button type="button" class="btn btn-gold fw-apbtn" data-rka="fam-approve">I Approve</button>`}</div>`; }

// ---------- writing help (placeholders, contact details left out) ----------
const reEsc = t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const PHONE = /(\+?1[\s.-]?)?\(?\b\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/g, EMAIL = /[\w.+-]+@[\w-]+\.[\w.-]+/g, ADDR = /\b\d{1,6}\s+(?:[A-Z0-9][\w.]*\s+){0,4}(?:Street|St|Avenue|Ave|Road|Rd|Lane|Ln|Drive|Dr|Boulevard|Blvd|Way|Court|Ct|Circle|Cir|Place|Pl|Parkway|Pkwy|Highway|Hwy|Trail|Terrace|NE|NW|SE|SW)\b\.?(?:,?\s*(?:Apt|Unit|Suite|#)\s*\w+)?/g;
function whMap(p){
  const M = [], seen = {}, add = (real, ph) => { real = clean(real); if (real.length < 2 || seen[real.toLowerCase()]) return; seen[real.toLowerCase()] = 1; M.push({real, ph, i: M.length}); };
  const nm = nameOf(p); add(nm, '[Name]'); nm.split(/\s+/).filter(x => x.length > 2 && !/\.$/.test(x)).forEach(x => add(x, '[Name]'));
  const pv = pVal(p); if (pv){ add(pv, '[Person]'); pv.split(/\s+/).filter(x => x.length > 2).forEach(x => add(x, '[Person]')); }
  let n = 2; kitsOf(p).forEach(({k}) => k.steps.forEach(s => s.fields.filter(f => f.type === 'list').forEach(f => arr(p.v[f.id]).forEach(r => f.cols.filter(c => /name|who/i.test(c.id)).forEach(c => { const v = clean(obj(r)[c.id]); if (v && !seen[v.toLowerCase()]) add(v, '[Name ' + (n++) + ']'); })))));
  arr(p.wh && p.wh.own).forEach(o => { if (!seen[clean(o).toLowerCase()]) add(o, '[Name ' + (n++) + ']'); });
  return M.sort((a, b) => b.real.length - a.real.length);
}
function hide(t, M){ let s2 = String(t || ''); M.forEach(m => { s2 = s2.replace(new RegExp('(^|[^\\w\\[])' + reEsc(m.real) + '(?![\\w])', 'gi'), (x, a) => a + m.ph); }); return s2; }
const scrub = t => String(t || '').replace(EMAIL, '[left out]').replace(ADDR, '[left out]').replace(PHONE, '[left out]');
const MARK = t => '=== ' + String(t || '').toUpperCase() + ' ===';
function whText(p){
  const W = (kit(p) || {}).writing || {}, M = whMap(p), P = arr(W.pieces);
  const hidePh = t => scrub(hide(t, M));
  const det = arr(W.fields).map(id => fieldDef(p, id)).filter(Boolean).map(f => [fill(f.label || f.id, p), valText(p, f)]).filter(r => r[1]).map(r => r[0] + ': ' + r[1]);
  const head = T(p, W.header || 'Write the pieces below in a warm, plain voice.').replace(/\[(Name|Person)\]/g, '[$1]').replace(/\[Chris\]/g, me());
  return [hidePh(head), '', 'Names are placeholders like [Name] and [Person]. Keep them exactly as written. Contact details are left out.', '', 'DETAILS', hidePh(det.join('\n')),
    '', 'Write each piece under its own heading line, exactly like this:', P.map(x => MARK(x.title)).join('\n')].join('\n').trim();
}
function whParse(p, text){
  const P = arr(((kit(p) || {}).writing || {}).pieces), out = []; let cur = null;
  String(text || '').replace(/\r\n?/g, '\n').split('\n').forEach(l => { const m = /^\s*[=#*_-]*\s*([^=#*]+?)\s*[=#*_-]*\s*$/.exec(l), t = m ? m[1].trim().toUpperCase() : '';
    const pc = /^[=#*]/.test(l.trim()) || (t && l.trim() === l.trim().toUpperCase() && /[A-Z]/.test(t)) ? P.find(x => String(x.title || '').toUpperCase() === t) : null;
    if (pc){ cur = {pc, t: ''}; out.push(cur); } else if (cur) cur.t += l + '\n'; });
  out.forEach(x => { x.t = x.t.trim(); }); return out.filter(x => x.t);
}
function restore(t, M){ let s2 = String(t || ''); const byPh = {}; M.slice().sort((a, b) => a.i - b.i).forEach(m => { if (byPh[m.ph] == null) byPh[m.ph] = m.real; });
  Object.keys(byPh).forEach(ph => { s2 = s2.split(ph).join(byPh[ph]); }); return s2; }
function whPaste(p, text){
  const L = whParse(p, text); if (!L.length){ toast('No pieces found. Each piece needs its heading line, like ' + MARK((arr(((kit(p) || {}).writing || {}).pieces)[0] || {}).title || 'Piece') + '.'); return null; }
  const M = whMap(p), prev = {}, put = [];
  L.forEach(x => { const id = x.pc.into || x.pc.id; prev[id] = p.v[id]; p.v[id] = restore(x.t, M); put.push(x.pc.title); });
  p.wh = Object.assign({}, p.wh, {last: {prev, at: Date.now()}}); return {put};
}
function waOf(p){ if (p.wa && p.wa.ans) return p.wa; const c = p.cli && window.GGCli && GGCli.wa ? GGCli.wa(p.cli) : null; return c && c.ans ? c : null; }
function vWriting(p){
  const W = (kit(p) || {}).writing; if (!W) return '';
  const wa = waOf(p), M = whMap(p);
  return blk(p, fill(W.title || 'Copy for Writing Help', p), 'writing', `<p class="fw-sub" style="margin-top:0">For a writing assistant: the details with names as placeholders and contact details left out. Paste the finished pieces back and the names return.</p>
    <div class="fw-lbl">Their yes to writing help</div><div class="fw-chips">${[['yes', 'Yes, They Agreed'], ['no', 'Not This Time']].map(([v, l]) => `<button type="button" class="chip fw-sm" data-rka="wa" data-rkv="${v}" aria-pressed="${!!(wa && wa.ans === v)}">${l}</button>`).join('')}</div>
    ${wa && wa.ans === 'yes' ? '' : '<p class="fw-warn" style="margin-top:10px">Ask first: may I use a writing assistant with these details, with names and contact details left out?</p>'}
    <div class="fw-lbl" style="margin-top:10px">Names hidden</div><p class="fw-sub" style="margin-top:2px">${M.length ? M.map(m => `${esc(m.real)} &rarr; ${esc(m.ph)}`).join('; ') : 'None yet.'}</p>
    <div class="fw-add"><input type="text" id="rk-whreal" aria-label="Another name to hide" placeholder="Another name to hide" autocomplete="off"><button type="button" class="btn btn-line btn-sm" data-rka="wh-add">Hide This Name</button></div>
    <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold btn-sm" data-rka="wh-copy">Copy for Writing Help</button><button type="button" class="btn btn-line btn-sm" data-rka="wh-see" aria-pressed="${!!S.wsee}">${S.wsee ? 'Hide What Gets Copied' : 'See What Gets Copied'}</button></div>
    ${S.wsee ? `<div class="fw-words" style="margin-top:10px">${esc(whText(p))}</div>` : ''}
    <label class="f" for="rk-whpaste" style="margin-top:12px">Paste Finished Pieces</label><textarea id="rk-whpaste" rows="4" placeholder="Paste the finished pieces here, each under its heading line."></textarea>
    <div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-rka="wh-paste">Put the Pieces in Place</button>${p.wh && p.wh.last ? '<button type="button" class="linkbtn" data-rka="wh-undo">Undo the Last Paste</button>' : ''}</div>`);
}

// ---------- What They'll Get: outputs, Send Everything, approval, writing help ----------
function vOut(p){
  const k = kit(p), A = k.approval, st = apStatus(p), O = outs(p), F = famOuts(p);
  return `<div class="fw-cards">${O.map(o => `<div class="fw-ocard"><h4>${esc(fill(o.title, p))}</h4><p>${esc(o.for === 'chris' ? 'Just for you. Never in the Family View or the packet.' : o.for === 'card' ? 'A small card to take home.' : fill(o.lead || 'Built from what you chose together.', p))}</p><div class="row"><button type="button" class="btn btn-line btn-sm" data-rka="out" data-rkv="${esc(o.id)}">Save or Print</button><button type="button" class="btn btn-line btn-sm" data-rka="out-copy" data-rkv="${esc(o.id)}">Copy</button></div></div>`).join('')}</div>` +
    (F.length ? blk(p, 'Send Everything', 'send', `<p class="fw-sub" style="margin-top:0">${esc(F.map(o => fill(o.title, p)).join(', '))}, together in one packet.</p>
      <div class="fw-g2">${inp('ct.em', 'Their email', p.ct.em, 'email')}${inp('ct.ph', 'Their mobile number', p.ct.ph, 'tel')}</div>
      <div class="row" style="margin-top:6px"><button type="button" class="btn btn-gold btn-sm" data-rka="bundle-print">Save or Print Everything</button><button type="button" class="btn btn-line btn-sm" data-rka="bundle-send" data-rkv="copy">Copy Everything</button><button type="button" class="btn btn-line btn-sm" data-rka="bundle-send" data-rkv="email">Email It</button><button type="button" class="btn btn-line btn-sm" data-rka="bundle-send" data-rkv="text">Text It</button></div>
      ${p.sent.bundle ? `<p class="fw-sub">Sent ${esc(nice(p.sent.bundle.date))}.</p>` : ''}`) : '') +
    (A ? blk(p, 'Their Approval', 'approval', `<p class="${st.ok ? 'fw-ok' : 'fw-sub'}" style="margin-top:0">${esc(st.t)}</p>
      <div class="row"><button type="button" class="btn btn-line btn-sm" data-rka="appr-show" aria-pressed="${!!S.appr}">${S.appr ? 'Hide the Approve Box' : 'Show the Approve Box in Family View'}</button></div>
      <div class="fw-lbl" style="margin-top:12px">Or send it to read at home</div><div class="row"><button type="button" class="btn btn-line btn-sm" data-rka="appr-send" data-rkv="copy">Copy the Words</button><button type="button" class="btn btn-line btn-sm" data-rka="appr-send" data-rkv="email">Email It</button><button type="button" class="btn btn-line btn-sm" data-rka="appr-send" data-rkv="text">Text It</button></div>
      ${p.apSent ? `<p class="fw-sub">Sent ${esc(nice(p.apSent.date))}${p.apSent.ver !== verOf(p) ? ', and it changed after that' : ''}.</p>` : ''}
      <label class="f" for="rk-apreply">Load Their Reply</label><textarea id="rk-apreply" rows="3" placeholder="Paste their reply here."></textarea>
      <div class="fw-g2">${inp('apr.name', 'Their name', (S.apr || {}).name || nameOf(p), 'text', '', 'data-rkapr')}${inp('apr.date', 'Date they replied', (S.apr || {}).date || today(), 'date', '', 'data-rkapr')}</div>
      <div class="row" style="margin-top:8px"><button type="button" class="btn btn-gold btn-sm" data-rka="appr-reply">Record Their Approval</button></div>
      ${arr(p.appr).length ? `<details class="fw-custom" style="margin-top:10px"><summary>Approval History (${arr(p.appr).length})</summary><ul class="rk-do">${p.appr.map(a => `<li>${esc(a.name)}, ${esc(nice(a.date))}, ${a.way === 'reply' ? 'by reply' : 'in the Family View'}, version ${esc(a.ver)}</li>`).join('')}</ul></details>` : ''}`) : '') +
    vWriting(p) + custom(p, 'outputs') + note(p, 'outputs');
}

// ---------- Tidy Up ----------
function vTidy(p){
  const m = meet(p); if (!m) return '<p class="muted">Start today\'s meeting to keep quick notes.</p>';
  const L = steps(p).map((s, i) => ({id: s.id, t: fill(s.title, p), i})).concat([{id: 'outputs', t: PAGE_T.out, i: 'out'}, {id: 'followup', t: PAGE_T.fu, i: 'fu'}]).filter(x => clean(m.notes[x.id]));
  const marked = L.filter(x => m.tidy[x.id]), rest = L.filter(x => !m.tidy[x.id]);
  const row = x => `<section class="fw-blk"><div class="fw-blk-h"><h3>${esc(x.t)}</h3><span class="row"><button type="button" class="btn btn-line btn-sm" data-rka="step" data-rkv="${esc(String(x.i))}">Go There</button>${m.tidy[x.id] ? `<button type="button" class="btn btn-gold btn-sm" data-rka="tidy" data-rkv="${esc(x.id)}">Tidied</button>` : ''}</span></div><textarea rows="3" data-rkm="notes.${esc(x.id)}" aria-label="Note for ${esc(x.t)}">${esc(m.notes[x.id])}</textarea></section>`;
  return `<p class="fw-sub" style="margin-top:0">After the meeting: the quick notes you marked Tidy Up Later, then every other note.</p>` +
    (marked.length ? marked.map(row).join('') : '<p class="muted">Nothing marked to tidy. Every note is below.</p>') + (rest.length ? `<h3 style="margin-top:18px">Other Notes</h3>${rest.map(row).join('')}` : '');
}

// ---------- Finish: the session saved into Start a Session's records ----------
function autoSummary(p){
  const L = []; steps(p).forEach(s => s.fields.forEach(f => { const v = valText(p, f); if (v && f.type !== 'list' && v.length < 200) L.push(fill(f.label || f.id, p) + ': ' + v.replace(/\n/g, '; ') + '.'); }));
  return L.slice(0, 12).join(' ');
}
function meetLog(p){
  const L = arr(p.mt).slice().sort((a, b) => (a.at || 0) - (b.at || 0));
  return L.length ? `<ul class="fw-flist rk-mt">${L.map(m => `<li><span><b>${esc(nice(m.date))}</b> ${esc((G(m.g) || {}).title || '')}${m.summary ? `<br><small class="muted">${esc(m.summary.length > 160 ? m.summary.slice(0, 160).replace(/\s+\S*$/, '') + '...' : m.summary)}</small>` : ''}</span><span>${m.done ? 'Saved' : m.id === S.mid ? 'Today' : 'Not saved'}</span></li>`).join('')}</ul>` : '<p class="muted">No meetings yet.</p>';
}
function vFinish(p){
  const m = meet(p), k = kit(p), c = person(p), g = G(curG(p)) || {}, multi = !!k.plan;
  if (!m) return blk(p, 'Meetings', 'log', meetLog(p)) + `<div class="row"><button type="button" class="btn btn-gold" data-rka="meet-start" data-rkv="${esc(nextGuide(p))}">Start Today's Meeting</button></div>`;
  const A = arr(g.after);
  return (crisisOn(p) ? crisisBar(p) : '') + (A.length ? blk(p, 'After the Session', '', A.map((x, i) => `<label class="fw-ck"><input type="checkbox" data-rkma="${i}"${(m.after || {})[i] ? ' checked' : ''}><span>${esc(x)}</span></label>`).join('')) : '') +
    blk(p, 'Session Note', '', `<label class="f" for="rk-sum">Summary</label><textarea id="rk-sum" rows="3" data-rkm="summary" placeholder="What happened, in a few lines">${esc(m.summary || '')}</textarea>
      <div class="row" style="margin-top:6px"><button type="button" class="btn btn-line btn-sm" data-rka="sum-fill">Fill From Today's Choices</button></div>
      <label class="f" for="rk-nx">Next Steps</label><textarea id="rk-nx" rows="2" data-rkm="nx">${esc(m.nx || '')}</textarea>
      ${multi ? `<div class="fw-g2">${inp('next.date', 'Next Meeting', p.next.date, 'date')}${inp('next.time', 'Time', p.next.time, 'time')}</div>` : ''}
      ${c ? `<div class="fw-g2">${inp('fdate', 'Follow-up date', m.fdate, 'date', '', 'data-rkm')}${inp('ftext', 'Follow-up note', m.ftext, 'text', 'Call to check in', 'data-rkm')}</div>` : ''}
      ${g.cat !== 'self' ? `<div class="fw-g2">${inp('fee', 'Fee', m.fee, 'text', '$125, a gift, or a reduced rate', 'data-rkm')}<div style="padding-top:30px"><label class="fw-ck"><input type="checkbox" data-rkmb="paid"${m.paid ? ' checked' : ''}> Paid</label><label class="fw-ck"><input type="checkbox" data-rkmb="grace"${m.grace ? ' checked' : ''}> Grace spot or reduced rate</label></div></div>` : ''}
      <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold" data-rka="save"${fk('save')}>${m.sid ? 'Save the Changes' : 'Save Session'}</button>${m.sid ? '<span class="fw-ok">Saved in Start a Session.</span>' : ''}</div>`) +
    toolsHTML(p, k.tools, 'kit') +
    (multi ? blk(p, 'Meetings in This Plan', 'log', meetLog(p)) : '') + custom(p, 'finish');
}

// ---------- Family View (its own window, or here to tilt the laptop) ----------
const fsec = (h, x, k) => `<div class="fw-fsec"${k ? ` data-rkanc="${esc(k)}"` : ''}><h3>${esc(h)}</h3>${x}</div>`;
const fChips = (p, f) => `<div class="fw-fchips">${opts(p, f).map(o => `<span class="fw-fchip${isOn(p, f, o.id) ? ' on' : ''}">${isOn(p, f, o.id) ? '&#10003; ' : ''}${esc(fill(o.t, p))}</span>`).join('')}</div>`;
function famField(p, f){
  const lab = fill(f.label || f.id, p), v = valText(p, f), soft = t => `<p class="fw-big fw-soft">${esc(t)}</p>`;
  let x;
  if (f.type === 'chips' || f.type === 'scale') x = fChips(p, f);
  else if (f.type === 'check') x = `<ul class="fw-flist">${opts(p, f).map(o => `<li><span>${isOn(p, f, o.id) ? '&#10003; ' : ''}${esc(fill(o.t, p))}</span><span>${isOn(p, f, o.id) ? 'Done' : ''}</span></li>`).join('')}</ul>`;
  else if (f.type === 'list') x = v ? `<ul class="fw-flist">${v.split('\n').map(r => `<li><span>${esc(r)}</span><span></span></li>`).join('')}</ul>` : soft('To add together');
  else if (f.type === 'date') x = v ? `<p class="fw-big">${esc(v)}</p>` : soft('To choose together');
  else x = v ? `<p class="fw-big fw-ans">${esc(v).replace(/\n/g, '<br>')}</p>` : soft('...');
  return fsec(lab, x, 'f:' + f.id);
}
function famBody(p){
  const n = S.step, k = kit(p), who = pName(p) || first(p);
  const head = t => `<div class="fw-fam"><p class="fw-fsub">${esc(fill(k.title || pTitle(p), p))}${who ? ' &middot; ' + esc(who) : ''}</p><h2>${esc(t)}</h2>`;
  if (typeof n === 'number'){ const s = steps(p)[n]; if (!s) return '';
    const F = s.fields.filter(f => f.family);
    return head(fill(s.title, p)) + (n === 0 ? famSince(p) : '') + (s.family ? `<p class="fw-big" style="margin:0 0 14px">${esc(fill(s.family, p))}</p>` : '') + F.map(f => famField(p, f)).join('') + (!F.length && !s.family ? '<p class="fw-big fw-soft">Talking together.</p>' : '') + '</div>'; }
  if (n === 'out') return head(PAGE_T.out) + famOuts(p).map(o => fsec(fill(o.title, p), `<div class="fw-read rk-fread">${outBody(p, o).replace(/<h1>[\s\S]*?<\/h1>/, '').replace(/<h2>/g, '<h4>').replace(/<\/h2>/g, '</h4>')}</div>`, 'o:' + o.id)).join('') + (S.appr && k.approval ? apBox(p) : '') + '</div>';
  if (n === 'fu') return head('Staying in Touch') + fsec('What Comes Next', `<ul class="fw-flist">${touches(p).filter(t => !t.own).map(t => `<li><span>${esc(t.title)}</span><span>${esc(t.date ? nice(t.date) : '')}</span></li>`).join('')}</ul>`, 'fu') + '</div>';
  const nx = p.next && p.next.date ? [nice(p.next.date), tm(p.next.time)].filter(Boolean).join(', ') : '';
  return head('Thank You') + `<p class="fw-big" style="margin:0 0 14px">${esc(fill(first(p) ? 'Thank you for today, [Name].' : 'Thank you for today.', p))}</p>` + (nx ? fsec('Next Time', `<p class="fw-big">${esc(nx)}</p>`, 'next') : '') + '</div>';
}
const FCSS = `:root{--bg:#F6F0E4;--card:#FFFCF6;--ink:#2A1C12;--soft:#6B5A4D;--line:#DDD0B8;--gold:#8B5E1A;--on:#2E2118;--onink:#F4EBDA;}
@media (prefers-color-scheme: dark){:root{--bg:#18120D;--card:#231A13;--ink:#F2EADC;--soft:#BFB09A;--line:#3A2E23;--gold:#D9A847;--on:#D9A847;--onink:#1A130D;}}
*{box-sizing:border-box;}html,body{margin:0;}body{background:var(--bg);color:var(--ink);font-family:Barlow,Helvetica,Arial,sans-serif;font-size:22px;line-height:1.45;}
main{max-width:980px;margin:0 auto;padding:36px 28px 60px;}
.fw-fam h2{font-family:"Cormorant Garamond",Georgia,serif;font-size:2.4em;line-height:1.1;margin:.1em 0 .5em;}
.fw-fsub{font-family:"Barlow Condensed",sans-serif;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin:0;font-size:.8em;}
.fw-fsec{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:18px 22px;margin:0 0 16px;}
.fw-fsec h3{font-family:"Cormorant Garamond",Georgia,serif;font-size:1.35em;margin:0 0 10px;}
.fw-fchips{display:flex;flex-wrap:wrap;gap:10px;}.fw-fchip{border:1.5px solid var(--line);border-radius:30px;padding:10px 18px;color:var(--soft);}
.fw-fchip.on{background:var(--on);border-color:var(--on);color:var(--onink);font-weight:600;}
.fw-flist{list-style:none;margin:0;padding:0;}.fw-flist li{display:flex;justify-content:space-between;gap:16px;border-top:1px solid var(--line);padding:9px 0;}.fw-flist li:first-child{border-top:0;}
.fw-flist li span:last-child{color:var(--soft);text-align:right;}
.fw-big{font-size:1.2em;margin:0;}.fw-soft{color:var(--soft);font-size:.8em;}.fw-ans{overflow-wrap:anywhere;}
.fw-read{font-family:"Cormorant Garamond",Georgia,serif;font-size:1.1em;line-height:1.5;overflow-wrap:anywhere;}.fw-read p{margin:0 0 .6em;}.fw-read h4{margin:.6em 0 .2em;}.fw-read .gg-src{font-size:.6em;}
.fw-top{display:flex;justify-content:space-between;align-items:center;gap:12px;color:var(--soft);font-size:.7em;border-bottom:1px solid var(--line);padding:10px 28px;}
.fw-apbox{background:var(--card);border:3px solid var(--gold);border-radius:18px;padding:18px 22px;margin:16px 0;}.fw-apbox h3{font-family:"Cormorant Garamond",Georgia,serif;font-size:1.35em;margin:0 0 10px;}
.fw-apin{display:block;width:100%;font:inherit;font-size:1.1em;padding:12px 14px;border:1.5px solid var(--line);border-radius:12px;background:var(--bg);color:var(--ink);margin:8px 0 12px;}
.fw-apbtn{font:inherit;font-weight:700;font-size:1.05em;background:var(--gold);color:var(--card);border:0;border-radius:14px;padding:14px 26px;cursor:pointer;min-height:54px;}
@media(max-width:600px){body{font-size:18px;}main{padding:20px 16px 40px;}.fw-flist li{flex-wrap:wrap;}}`;
let famWin = null, famT = null;
function famPage(p){
  const fonts = new URL('/fonts/fonts.css', location.href).href;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Family View</title><link rel="stylesheet" href="${fonts}"><style>${FCSS}</style></head><body><div class="fw-top"><span>Grow With Grounded</span><span>Family View</span></div><main id="fv">${famBody(p)}</main></body></html>`;
}
function openFam(){
  const p = plan(); if (!p) return;
  let w = null; try { w = window.open('', 'gg-rk-family', 'width=1100,height=820'); } catch (e) { w = null; }
  if (!w){ toast('Your browser kept the window from opening. Showing the Family View here instead.'); S.mode = 'family'; rerender(true); return; }
  famWin = w; API.famWin = w;
  try { if (!w.document.getElementById('fv')){ w.document.open(); w.document.write(famPage(p)); w.document.close(); } else pushFam(true); bindFam(w); w.focus(); } catch (e) {}
  setTimeout(syncFam, 120);
}
function bindFam(w){ try { const d = w.document; if (d.__rkBound) return; d.__rkBound = 1;
  d.addEventListener('input', e => { if (e.target && e.target.dataset && e.target.dataset.rkapn) S.apName = e.target.value; });
  d.addEventListener('click', e => { const b = e.target.closest && e.target.closest('[data-rka="fam-approve"]'); if (b){ e.preventDefault(); act('fam-approve', '', b); } }); } catch (e) {} }
function pushFam(now){
  clearTimeout(famT);
  const go = () => { const p = plan(); if (!p || !famWin || famWin.closed) return; try { const el = famWin.document.getElementById('fv'); if (el){ el.innerHTML = famBody(p); syncFam(); } } catch (e) {} };
  if (now) go(); else famT = setTimeout(go, 200);
}
// Follow My Scroll: the family window follows this window's place by section (the same idea as the Farewell Planning Session).
function syncFam(){
  if (!S.follow || !famWin || famWin.closed || !S.on || !S.id) return;
  let fd, fw = famWin; try { fd = fw.document; if (!fd || !fd.getElementById('fv')) return; } catch (e){ return; }
  const main = document.getElementById('rk-main'); if (!main) return;
  const de = document.documentElement, top = ((document.querySelector('header.bar') || {}).offsetHeight || 0) + 12;
  const fmax = Math.max(0, fd.documentElement.scrollHeight - fw.innerHeight), myMax = Math.max(0, de.scrollHeight - window.innerHeight);
  const F = {}; fd.querySelectorAll('[data-rkanc]').forEach(el => { if (!F[el.dataset.rkanc]) F[el.dataset.rkanc] = el; });
  const A = [...main.querySelectorAll('[data-rkanc]')];
  let i = -1; A.forEach((a, j) => { if (a.getBoundingClientRect().top <= top) i = j; });
  let target = null;
  for (let j = i; j >= 0; j--){ const a = A[j], f = F[a.dataset.rkanc]; if (!f) continue;
    const r = a.getBoundingClientRect(), frac = Math.max(0, Math.min(1, (top - r.top) / Math.max(1, r.height)));
    target = f.getBoundingClientRect().top + fw.scrollY + frac * f.offsetHeight - 16; break; }
  if (target == null) target = myMax ? window.scrollY / myMax * fmax : 0;
  if (window.scrollY <= 2) target = 0; else if (myMax && window.scrollY >= myMax - 2) target = fmax;
  target = Math.max(0, Math.min(fmax, Math.round(target)));
  try { fw.scrollTo(0, target); } catch (e) {}
  API.lastSync = {target, i, key: i >= 0 ? A[i].dataset.rkanc : null};
}
let syncRaf = 0;
window.addEventListener('scroll', () => { if (!famWin || famWin.closed || !S.follow || !S.on) return; if (syncRaf) return; syncRaf = requestAnimationFrame(() => { syncRaf = 0; syncFam(); }); }, {passive: true});

// ---------- Phone Mode ----------
function vPhone(p){
  const n = S.step, k = kit(p), hd = '<div class="fw-ph-h"><span aria-hidden="true">&#9742;</span> Read aloud, one at a time. Pause after each.</div>';
  if (typeof n !== 'number'){
    const L = [];
    if (n === 'out') famOuts(p).forEach(o => L.push([fill(o.title, p), 'I will send you the ' + fill(o.title, p) + ' after our call, so you have it in writing.']));
    if (n === 'out' && k.approval) L.push(['Your Approval', 'If it all sounds right, just say "I approve" and your name, and I will note it with today\'s date.']);
    if (n === 'fu') touches(p).filter(t => !t.own).slice(0, 4).forEach(t => L.push([t.title, (t.f.call && t.f.call.open) ? fill(t.f.call.open, p) : 'I will be in touch around ' + nice(t.date) + '.']));
    if (n === 'finish' || n === 'tidy'){ L.push(['Thank You', fill(first(p) ? 'Thank you for today, [Name]. It means a lot that you shared this with me.' : 'Thank you for today. It means a lot that you shared this with me.', p)]); if (p.next && p.next.date) L.push(['Next Time', 'Our next time together is ' + [nice(p.next.date), tm(p.next.time)].filter(Boolean).join(' at ') + '.']); }
    return `<div class="fw-phone">${hd}<ol>${L.map(x => `<li><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></li>`).join('')}</ol>${crisisOn(p) ? `<div class="fw-crisis">${esc(crisisText(p))}</div>` : ''}</div>`;
  }
  const s = steps(p)[n]; if (!s) return '';
  const lines = (s.phone.length ? s.phone : s.say).map(t => fill(t, p)).filter(Boolean);
  const asks = s.fields.filter(f => f.ask).map(f => [fill(f.label || f.id, p), fill(f.ask, p), (f.type === 'chips' || f.type === 'scale') && f.family ? opts(p, f).map(o => fill(o.t, p)).join(', ') : '']);
  return `<div class="fw-phone">${hd}<ol>${lines.map(t => `<li><p>${esc(t)}</p></li>`).join('')}${asks.map(a => `<li><h3>${esc(a[0])}</h3><p>${esc(a[1])}</p>${a[2] ? `<p class="fw-sub" style="font-family:inherit;font-weight:400">Choices to read aloud: ${esc(a[2])}</p>` : ''}</li>`).join('')}</ol>
    <p class="fw-sub">Tap their answers in ${esc(me())}'s View as they talk.</p>${crisisOn(p, s) ? `<div class="fw-crisis">${esc(crisisText(p))}</div>` : ''}</div>`;
}

// ---------- the page ----------
const CSS = `
#rk-root{min-width:0;}
.rk-crisis{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;margin:0 0 14px;padding:10px 14px;border-left:4px solid var(--danger);border-radius:12px;background:color-mix(in srgb,var(--danger) 7%,transparent);}
.rk-crisis b{font-family:'Barlow Condensed',sans-serif;letter-spacing:1.5px;text-transform:uppercase;font-size:14px;color:var(--danger);}
.rk-crisis .row{gap:6px;}.rk-hot input{max-width:240px;}.rk-cl{font-weight:600;font-size:15px;}
.rk-do{margin:6px 0 12px;padding-left:22px;color:var(--ink-soft);font-size:16px;}.rk-do li{margin:0 0 4px;}
.rk-ask{margin:0 0 10px;font-size:calc(18px * var(--scale));}.rk-ask b{font-family:'Barlow Condensed',sans-serif;letter-spacing:1.2px;text-transform:uppercase;font-size:13px;color:var(--gold);margin-right:6px;}
.rk-checks{display:flex;flex-direction:column;gap:2px;}
.rk-lrow{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:6px 12px;align-items:end;border-top:1px solid var(--line);padding:10px 0;}.rk-lrow:first-child{border-top:0;}
.rk-lc{min-width:0;}.rk-lcw{grid-column:1 / -1;}.rk-ldel{justify-self:start;}
.rk-tools{display:flex;flex-direction:column;gap:10px;margin:0 0 14px;}.rk-tool .btn{align-self:flex-start;}
.rk-sl{border-left:4px solid var(--gold);}
.rk-time{font-variant-numeric:tabular-nums;color:var(--ink-soft);font-weight:600;}
.rk-fread h4{font-size:.95em;}
.rk-mt li span:first-child{min-width:0;overflow-wrap:anywhere;}.rk-mt li span:last-child{white-space:nowrap;}
`;
(function(){ try { const s = document.createElement('style'); s.id = 'rk-css'; s.textContent = CSS; document.head.appendChild(s); } catch (e) {} })();
function rail(p){
  const P = pages(p), m = meet(p), nt = m ? Object.keys(m.tidy).filter(k => m.tidy[k] && clean(m.notes[k])).length : 0;
  return `<ol>${P.map(k => { const num = typeof k === 'number', sepB = k === P.find(x => typeof x !== 'number');
    return `${sepB ? '<li aria-hidden="true"><div class="fw-sep"></div></li>' : ''}<li><button type="button" data-rka="step" data-rkv="${esc(String(k))}"${S.step === k ? ' aria-current="step"' : ''}${fk('rs|' + k)}><span class="n">${num ? k + 1 : k === 'finish' ? '&#9825;' : k === 'tidy' ? '&#10003;' : k === 'fu' ? '&#9993;' : '&#9998;'}</span><span>${esc(pageT(p, k))}${k === 'tidy' && nt ? ' (' + nt + ')' : ''}</span></button></li>`; }).join('')}</ol>
    <div class="fw-cbt">${cbt(p)}</div>`;
}
function cbt(p){
  const ks = Object.keys(p.stars);
  return `<h2>Come Back To This</h2>${ks.length ? `<ul>${ks.map(k => `<li><button type="button" data-rka="goto" data-rkv="${esc(k)}">&#9733; ${esc(p.stars[k].label)}</button></li>`).join('')}</ul>` : '<p class="empty">Tap a star on any step to save it here.</p>'}`;
}
function vPlan(p){
  const n = S.step, P = pages(p), k = kit(p), m = meet(p), g = G(curG(p)) || {}, mode = S.mode, num = typeof n === 'number', st = num ? steps(p)[n] : null;
  let body;
  if (n === 'tidy') body = vTidy(p);
  else if (mode === 'family') body = `<div class="fw-famwrap">${famBody(p)}</div>`;
  else if (mode === 'phone') body = vPhone(p);
  else if (num) body = vStep(p, n);
  else if (n === 'out') body = vOut(p);
  else if (n === 'fu') body = vFu(p);
  else body = vFinish(p);
  const ix = P.indexOf(n), cnt = steps(p).length, faithT = true;
  const meetN = m ? arr(p.mt).filter(x => (x.at || 0) <= (m.at || 0)).length : 0;
  return `<button type="button" class="linkbtn" data-rka="leave">&larr; Leave for Now</button>
  <div class="fw-head"><div style="min-width:0"><div class="eyebrow">${esc(fill(k.title || g.title || 'Session', p))}${k.plan && meetN ? ' &middot; Meeting ' + meetN : ''}</div><h1>${esc(whoLine(p) || nameOf(p) || 'A New Session')}</h1>
    ${k.lead ? `<p class="muted" style="margin:2px 0 0">${esc(fill(k.lead, p))}</p>` : ''}${clientLine(p)}</div>
    <div class="fw-modes" role="group" aria-label="View">${[['chris', me() + "'s View"], ['family', 'Family View Here'], ['phone', 'Phone Mode']].map(([x, l]) => `<button type="button" class="chip" data-rka="mode" data-rkv="${x}" aria-pressed="${mode === x}"${fk('md|' + x)}>${esc(l)}</button>`).join('')}<button type="button" class="btn btn-gold btn-sm" data-rka="famwin">Open Family View Window</button><button type="button" class="chip" data-rka="follow" aria-pressed="${!!S.follow}"${fk('fl')} title="The Family View Window follows your place on the page">Follow My Scroll</button>${faithT ? `<button type="button" class="chip" data-rka="faith" aria-pressed="${isFaith(p)}"${fk('fa')}>${locked(p) ? 'Plain Words (Set by the Group)' : isFaith(p) ? 'Faith Words' : 'Plain Words'}</button>` : ''}${m ? '<span class="rk-time" id="rk-timer" aria-label="Time in this meeting"></span>' : ''}</div></div>
  ${m ? '' : `<div class="fw-inline" style="margin-top:12px"><b>Looking over the plan.</b> <span class="muted">Start today's meeting to keep notes and save the session.</span> <button type="button" class="btn btn-gold btn-sm" data-rka="meet-start" data-rkv="${esc(nextGuide(p))}">Start Today's Meeting</button></div>`}
  <div class="fw-lay"><nav class="fw-rail" aria-label="Steps">${rail(p)}</nav>
  <div id="rk-main" style="min-width:0"><div class="fw-kick">${num ? 'Step ' + (n + 1) + ' of ' + cnt + (st && st.minutes ? ' &middot; about ' + st.minutes + ' min' : '') : n === 'finish' ? 'All Done' : n === 'tidy' ? 'After the Meeting' : 'Together'}${mode === 'family' && n !== 'tidy' ? ' &middot; Family View' : mode === 'phone' && n !== 'tidy' ? ' &middot; Phone Mode' : ''}</div><h2 style="margin:2px 0 6px">${esc(pageT(p, n))}</h2>
    ${mode === 'family' && n !== 'tidy' ? '<p class="fw-sub">This is what they see. For a call, open the Family View Window and share that window by itself on Zoom, Teams, or FaceTime. It follows your taps.</p>' : ''}
    ${body}
    <div class="fw-cbt mob" style="margin-top:16px">${cbt(p)}</div>
    <div class="fw-nav"><button type="button" class="btn btn-line" data-rka="nav" data-rkv="-1"${ix <= 0 ? ' disabled' : ''}${fk('nb')}>&larr; Back</button>${n === 'finish' ? `<button type="button" class="btn btn-line" data-rka="leave">Close</button>` : `<button type="button" class="btn btn-gold" data-rka="nav" data-rkv="1"${fk('nn')}>${esc(pageT(p, P[ix + 1]) === 'Finish' ? 'Finish' : 'Next')} &rarr;</button>`}</div></div></div>`;
}
function clientLine(p){
  if (p.cli && window.GGCli && GGCli.link){ const l = GGCli.link(p.cli); if (l) return l; }
  const c = person(p); if (c) return `<button type="button" class="linkbtn" data-act="open-client" data-v="${esc(c.id)}">People Record: ${esc(c.name)}</button>`;
  const L = people().filter(x => x.status !== 'closed');
  return `<details class="rk-link"><summary class="linkbtn">Link to a Person</summary><div class="fw-add">${L.length ? `<select id="rk-linkp" aria-label="Choose a person">${L.map(x => `<option value="${esc(x.id)}">${esc(x.name)}</option>`).join('')}</select><button type="button" class="btn btn-line btn-sm" data-rka="link-p">Link</button>` : ''}<input type="text" id="rk-newp" aria-label="New person" placeholder="Or a new name or initials" autocomplete="off"><button type="button" class="btn btn-line btn-sm" data-rka="link-new">Add and Link</button></div></details>`;
}
function vPick(){
  const x = S.pick, k = kitOf(x.g), g = G(x.g) || {}, L = plans().filter(p => p.key === (k.plan ? k.plan.id : x.g) && !p.closed).sort((a, b) => (b.u || 0) - (a.u || 0));
  return `<button type="button" class="linkbtn" data-rka="pick-cancel">&larr; Back</button>
  <div class="page-head" style="margin-top:10px"><div class="eyebrow">${esc(k.title || 'Session')}</div><h1>${esc(g.title || 'Session')}</h1><p>Continue a plan already started, or begin a new one.</p></div>
  <div class="card"><div class="row"><button type="button" class="btn btn-gold" data-rka="pick-new">Start a New Plan</button></div></div>
  <div class="card"><h2 style="margin-bottom:4px">Continue a Plan</h2>${L.map(p => `<div class="fw-list-r"><div class="m"><b>${esc(whoLine(p) || 'A plan')}</b><br><small class="muted">${esc(pTitle(p))}, ${arr(p.mt).length} ${arr(p.mt).length === 1 ? 'meeting' : 'meetings'}, last ${esc(nice((lastMeet(p) || {}).date || p.made))}</small></div><button type="button" class="btn btn-line btn-sm" data-rka="pick-plan" data-rkv="${esc(p.id)}">Continue</button></div>`).join('')}</div>`;
}
function vList(){
  const L = plans().slice().sort((a, b) => (b.u || 0) - (a.u || 0)), due = dueSoon();
  return `<button type="button" class="linkbtn" data-rka="list-close">&larr; Sessions</button>
  <div class="page-head" style="margin-top:10px"><div class="eyebrow">Sessions</div><h1>Session Plans</h1><p>Every session run with a session kit keeps its plan here: the choices, the meetings, the printouts, and the follow-ups.</p></div>
  ${due.length ? `<div class="card"><h3>Follow-Ups Due This Week</h3>${due.map(x => `<div class="fw-list-r"><div class="m"><b>${esc(x.t.title)}</b> <span class="muted">${esc(whoLine(x.p) || pTitle(x.p))}</span><br><small class="muted">${esc(nice(x.t.date))}</small></div><button type="button" class="btn btn-line btn-sm" data-rka="fu-open" data-rkv="${esc(x.p.id + '|' + x.t.id)}">Open</button></div>`).join('')}</div>` : ''}
  <div class="card">${L.length ? L.map(p => `<div class="fw-list-r"><div class="m"><b>${esc(whoLine(p) || 'A plan')}</b><br><small class="muted">${esc(pTitle(p))} &middot; ${arr(p.mt).length} ${arr(p.mt).length === 1 ? 'meeting' : 'meetings'} &middot; started ${esc(nice(p.made))}</small></div>
    <div class="row"><button type="button" class="btn btn-gold btn-sm" data-rka="open" data-rkv="${esc(p.id)}">Open</button><button type="button" class="btn btn-line btn-sm" data-rka="del" data-rkv="${esc(p.id)}">Delete</button></div></div>`).join('') : '<p class="muted">Plans you start show here.</p>'}</div>
  <p class="muted" style="font-size:15px">Plans stay on this device, encrypted with your records, and travel in your backups.</p>`;
}
function view(){ setTimeout(headTop, 0); const p = plan(); return `<div id="rk-root">${S.pick ? vPick() : S.id && p ? vPlan(p) : vList()}</div>`; }
function headTop(){ const h = document.querySelector('header.bar'), r = document.getElementById('rk-root'); if (h && r) r.style.setProperty('--fw-top', h.offsetHeight + 'px'); }
function rerender(keepScroll){
  const r = document.getElementById('rk-root'); if (!r){ if (C.render) C.render(); return; }
  const ae = document.activeElement, k = ae && ae.getAttribute && ae.getAttribute('data-rkk'), y = window.scrollY;
  r.outerHTML = view(); if (keepScroll) window.scrollTo(0, y); else window.scrollTo(0, 0);
  if (k){ const el = document.querySelector('#rk-root [data-rkk="' + (window.CSS && CSS.escape ? CSS.escape(k) : k) + '"]'); if (el) try { el.focus({preventScroll: true}); } catch (e) {} }
  tick(); pushFam();
}
function goStep(n){ S.step = n; S.other = null; rerender(false); if (window.matchMedia && matchMedia('(max-width: 900px)').matches){ const c = document.querySelector('#rk-root .fw-rail [aria-current="step"]'); if (c && c.scrollIntoView) c.scrollIntoView({block: 'nearest', inline: 'center'}); } }
let timer = null;
function tick(){ const t = document.getElementById('rk-timer'), m = meet(plan()); if (!t || !m) return; const s = Math.max(0, Math.floor((Date.now() - (m.at || Date.now())) / 1000)); t.textContent = Math.floor(s / 60) + ':' + pad(s % 60); }
function show(){ S.on = true; clearInterval(timer); timer = setInterval(tick, 1000); if (C.go) C.go('guides'); }

// ---------- starting ----------
function begin(p, gid){
  let m = arr(p.mt).find(x => x.g === gid && !x.done && x.date === today());
  if (!m) m = newMeet(p, gid);
  S.id = p.id; S.mid = m.id; S.step = 0; S.mode = 'chris'; S.appr = false; S.fuOpen = null; S.pick = null; S.wsee = false;
  touch(p); show();
}
function start(gid, cid){
  if (!has(gid) || !D()) return false;
  const k = kitOf(gid), key = k.plan && k.plan.id ? k.plan.id : gid;
  if (window.GGFw && GGFw.state) GGFw.state.on = false; if (window.GGWed && GGWed.state) GGWed.state.on = false;
  if (k.plan){
    const L = plans().filter(p => p.key === key && !p.closed).sort((a, b) => (b.u || 0) - (a.u || 0));
    const mine = cid ? L.find(p => p.pid === cid) : null;
    if (mine){ begin(mine, gid); return true; }
    if (!cid && L.length){ S.pick = {g: gid}; S.id = null; show(); return true; }
  }
  const p = newPlan(gid, cid || null); plans().push(p); const d = D(); if (d.deleted && d.deleted.rk) delete d.deleted.rk[p.id];
  begin(p, gid); return true;
}
function openPlan(id, step){
  const p = plans().find(x => x.id === id); if (!p) return;
  const m = arr(p.mt).filter(x => !x.done && x.date === today()).sort((a, b) => (b.at || 0) - (a.at || 0))[0];
  S.id = id; S.mid = m ? m.id : null; S.pick = null; S.mode = 'chris'; S.appr = false;
  const P = pages(p); S.step = step != null && P.includes(step) ? step : 0; show();
}
// From a client file (or the Intake): the People record is made if the file has none yet.
function personFor(f){
  const d = D(); if (!d || !f) return null; d.clients = arr(d.clients);
  let c = f.pid && d.clients.find(x => x.id === f.pid);
  if (!c){ const nm = clean((f.c && f.c.first) || '') + (f.c && clean(f.c.last) ? ' ' + clean(f.c.last)[0] + '.' : '');
    if (!nm) return null;
    c = {id: uid(), u: Date.now(), name: nm, service: '', status: 'active', followups: [], created: today(), cli: f.id}; d.clients.push(c); f.pid = c.id; f.u = Date.now(); if (d.deleted && d.deleted.clients) delete d.deleted.clients[c.id]; }
  return c;
}
function startFromFile(gid, fid){
  const f = fileOf(fid); if (!f) return;
  const c = personFor(f); if (!c){ toast('Add their first name in the Intake first.'); return; }
  if (start(gid, c.id)){ const p = plan(); if (p && !p.cli){ p.cli = f.id; touch(p); } }
}
const kitGuides = () => Object.keys(libKits()).concat(Object.keys(DEFAULT_KITS)).filter((x, i, a) => a.indexOf(x) === i).filter(id => has(id)).map(id => G(id)).filter(g => g && g.cat !== 'self' && g.cat !== 'safety');

// ---------- saving the session ----------
function saveSession(p){
  const m = meet(p), d = D(); if (!m || !d) return;
  const g = G(m.g) || {}, k = kit(p), c = person(p);
  const notes = steps(p).map(s => [fill(s.title, p), clean(m.notes[s.id]), clean(p.custom[s.id])]).filter(r => r[1] || r[2]);
  ['outputs', 'followup', 'finish'].forEach(x => { if (clean(m.notes[x])) notes.push([PAGE_T[x === 'outputs' ? 'out' : x === 'followup' ? 'fu' : 'finish'], clean(m.notes[x]), '']); });
  const s = {id: m.sid || uid(), u: Date.now(), clientId: p.pid || null, guideId: m.g, title: g.title || k.title || '', date: m.date, minutes: Math.max(1, Math.round((Date.now() - (m.at || Date.now())) / 60000)),
    notes: {}, summary: m.summary || '', next: m.nx || '', fee: m.fee || '', paid: !!m.paid, grace: !!m.grace, rk: {plan: p.id, meeting: m.id, notes}};
  d.sessions = arr(d.sessions); const i = d.sessions.findIndex(x => x.id === s.id);
  if (i >= 0){ s.minutes = d.sessions[i].minutes || s.minutes; d.sessions[i] = s; } else d.sessions.push(s);
  if (d.deleted && d.deleted.sessions) delete d.deleted.sessions[s.id];
  m.sid = s.id; m.done = true; m.saved = Date.now();
  if (c){ c.u = Date.now(); c.last = m.date; if (m.fdate && !m.fuPushed){ c.followups = arr(c.followups); c.followups.push({date: m.fdate, text: m.ftext || 'Follow up', done: false}); m.fuPushed = 1; } if (m.grace) c.grace = c.grace || false; }
  syncFu(p); touch(p);
  return s;
}

// ---------- actions ----------
function setPath(o, path, v){
  const ks = path.split('.'); let x = o;
  for (let i = 0; i < ks.length - 1; i++){ const k = ks[i]; if (x[k] == null || typeof x[k] !== 'object') x[k] = /^\d+$/.test(ks[i + 1]) ? [] : {}; x = x[k]; }
  x[ks[ks.length - 1]] = v;
}
function fieldById(p, id){ return fieldDef(p, id) || {id, type: 'chips', options: []}; }
function addOwnItem(p, id, t){
  t = clean(t); if (!t) return false; const f = fieldById(p, id);
  const it = {id: 'own_' + uid(), t}; (p.own[id] = arr(p.own[id])).push(it);
  if (f.type === 'chips' && !f.many) p.v[id] = [it.id]; else p.v[id] = arr(p.v[id]).concat(it.id);
  return true;
}
async function copyText(t, msg){
  try { await navigator.clipboard.writeText(t); }
  catch (e){ const a = document.createElement('textarea'); a.value = t; a.setAttribute('readonly', ''); a.style.cssText = 'position:fixed;left:-9999px;'; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (x) {} a.remove(); }
  API.lastCopy = t; toast(msg || 'Copied.');
}
const smsHref = (ph, body) => 'sms:' + String(ph || '').replace(/[^\d+]/g, '') + '?&body=' + encodeURIComponent(body);
const mailHref = (em, sub, body) => 'mailto:' + encodeURIComponent(String(em || '').trim()).replace(/%40/g, '@') + '?subject=' + encodeURIComponent(sub) + '&body=' + encodeURIComponent(body);
function openLink(u){ API.lastLink = u; if (API.noOpen) return; try { window.location.href = u; } catch (e) {} }
function act(a, v, el){
  switch (a){
    case 'list-open': S.on = true; S.id = null; S.pick = null; if (C.go) C.go('guides'); return;
    case 'list-close': S.on = false; S.id = null; if (C.go) C.go('guides'); return;
    case 'open': openPlan(v); return;
    case 'del': { const x = plans().find(q => q.id === v); if (!x || !confirm('Delete this plan? Its saved sessions stay in the People record until you delete them.')) return;
      const d = D(); d.rk.plans = plans().filter(q => q.id !== v); d.deleted = d.deleted || {clients: {}, sessions: {}}; d.deleted.rk = d.deleted.rk || {}; d.deleted.rk[v] = Date.now();
      const c = people().find(q => q.id === x.pid); if (c){ c.followups = arr(c.followups).filter(f => f.rk !== v); c.u = Date.now(); }
      if (S.id === v){ S.id = null; S.mid = null; } C.save(); rerender(true); return; }
    case 'fu-open': { const i = v.indexOf('|'); S.fuOpen = v.slice(i + 1); openPlan(v.slice(0, i), 'fu'); return; }
    case 'pick-cancel': { const g = S.pick && S.pick.g; S.pick = null; S.on = false; if (C.go) C.go('guides', g ? {guide: g} : undefined); return; }
    case 'pick-new': { const g = S.pick.g, p = newPlan(g, null); plans().push(p); begin(p, g); return; }
    case 'pick-plan': { const p = plans().find(q => q.id === v); if (p) begin(p, S.pick.g); return; }
    case 'start-file': { const i = v.indexOf('|'); startFromFile(v.slice(0, i), v.slice(i + 1)); return; }
    case 'start-file-pick': { const sel = document.getElementById('rk-fstart'); if (sel && sel.value) startFromFile(sel.value, v); return; }
    case 'start-p': { const i = v.indexOf('|'); start(v.slice(0, i), v.slice(i + 1)); return; }
  }
  const p = plan(); if (!p) return;
  const m = meet(p);
  switch (a){
    case 'leave': { const g = curG(p); S.on = false; S.appr = false; clearInterval(timer); if (C.go) C.go('guides', {guide: g}); return; }
    case 'step': goStep(/^\d+$/.test(v) ? +v : v); return;
    case 'nav': { const P = pages(p), i = P.indexOf(S.step) + (+v); if (i < 0 || i >= P.length) return; goStep(P[i]); return; }
    case 'goto': { const st = p.stars[v]; if (!st) return; const P = pages(p); goStep(P.includes(st.page) ? st.page : 0); setTimeout(() => { const e2 = document.querySelector(`#rk-root [data-rkanc="${window.CSS && CSS.escape ? CSS.escape(v) : v}"]`); if (e2 && e2.scrollIntoView) e2.scrollIntoView({block: 'start'}); }, 30); return; }
    case 'mode': S.mode = v; rerender(true); return;
    case 'famwin': openFam(); return;
    case 'follow': S.follow = !S.follow; rerender(true); if (S.follow) syncFam(); toast(S.follow ? 'The Family View Window follows your scroll.' : 'The Family View Window stays where it is.'); return;
    case 'faith': { if (locked(p)) return toast('Plain words: this school or group asks for Plain wording.'); p.faith = !isFaith(p); const w = ffId(kit(p)), wf = fieldDef(p, w);
      if (wf && wf.options.some(o => o.id === 'faith')) p.v[w] = [p.faith ? 'faith' : 'plain']; touch(p); rerender(true); toast(p.faith ? 'Faith words, where the plan has them.' : 'Plain words.'); return; }
    case 'chip': { const i = v.indexOf('|'), id = v.slice(0, i), val = v.slice(i + 1), f = fieldById(p, id);
      if (f.type === 'scale'){ const w = optT(p, f, val); p.v[id] = p.v[id] === w ? '' : w; }
      else { const cur = arr(p.v[id]), single = el && el.dataset.rks === '1'; p.v[id] = single ? (cur.includes(val) ? [] : [val]) : cur.includes(val) ? cur.filter(x => x !== val) : cur.concat(val); }
      if (id === ffId(kit(p)) && (val === 'faith' || val === 'plain') && arr(p.v[id]).includes(val)) p.faith = val === 'faith';
      touch(p); rerender(true); return; }
    case 'own': { const box = document.querySelector(`#rk-root [data-rkown="${window.CSS && CSS.escape ? CSS.escape(v) : v}"]`); if (box && addOwnItem(p, v, box.value)){ touch(p); rerender(true); const n2 = document.querySelector(`#rk-root [data-rkown="${window.CSS && CSS.escape ? CSS.escape(v) : v}"]`); if (n2) n2.focus(); } else if (box) box.focus(); return; }
    case 'ladd': { p.v[v] = arr(p.v[v]).concat({}); touch(p); rerender(true); return; }
    case 'ldel': { const [id, i] = v.split('|'); const L = arr(p.v[id]); L.splice(+i, 1); p.v[id] = L; touch(p); rerender(true); return; }
    case 'lchip': { const [id, i, col, oid] = v.split('|'), f = fieldById(p, id), c = arr(f.cols).find(x => x.id === col), o = c && c.options.find(x => x.id === oid); if (!o) return;
      const L = arr(p.v[id]); L[+i] = obj(L[+i]); const t = fill(o.t, p); L[+i][col] = L[+i][col] === t ? '' : t; p.v[id] = L; touch(p); rerender(true); return; }
    case 'tidy': if (!m) return; m.tidy[v] = !m.tidy[v]; touch(p); rerender(true); return;
    case 'star': if (p.stars[v]) delete p.stars[v]; else p.stars[v] = {label: (el && el.dataset.rkl) || v, page: S.step}; touch(p); rerender(true); return;
    case 'tool': { const i = v.indexOf('|'); openTool(p, toolList(p, v.slice(0, i))[+v.slice(i + 1)]); return; }
    case 'copy-link': copyText(v, 'Link copied.'); return;
    case 'meet-start': { const mm = newMeet(p, v || nextGuide(p)); S.mid = mm.id; S.step = 0; touch(p); rerender(false); return; }
    case 'link-p': { const sel = document.getElementById('rk-linkp'); if (!sel || !sel.value) return; const c = people().find(x => x.id === sel.value); if (!c) return; p.pid = c.id; p.name = p.name || c.name; if (c.cli && !p.cli) p.cli = c.cli; syncFu(p); touch(p); rerender(true); toast('Linked to ' + c.name + '.'); return; }
    case 'link-new': { const box = document.getElementById('rk-newp'), nm = clean(box ? box.value : ''); if (!nm) return toast('Type a name or initials first.'); const d = D(); d.clients = arr(d.clients);
      const c = {id: uid(), u: Date.now(), name: nm, service: '', status: 'active', followups: [], created: today()}; d.clients.push(c); p.pid = c.id; p.name = p.name || nm; syncFu(p); touch(p); rerender(true); toast('Added and linked.'); return; }
    case 'out': { const o = outs(p).find(x => x.id === v); if (o) sheet(PCSS + pageOf(p, o), fill(o.title, p), slug(o.title)); return; }
    case 'out-copy': { const o = outs(p).find(x => x.id === v); if (o) copyText(outText(p, o), 'Copied.'); return; }
    case 'bundle-print': sheet(bundleHTML(p), 'Send Everything', slug(pTitle(p)) + '-packet'); return;
    case 'bundle-send': { const words = fill('Here is everything from our time together, [Name]. [Chris]', p), all = words + '\n\n' + bundleText(p); p.sent.bundle = {date: today(), at: Date.now(), how: v};
      if (v === 'copy') copyText(all, 'Everything is copied.'); else if (v === 'text') openLink(smsHref(p.ct.ph, all)); else openLink(mailHref(p.ct.em, fill(pTitle(p), p), all)); touch(p); rerender(true); return; }
    case 'appr-show': S.appr = !S.appr; if (S.appr) S.step = 'out'; rerender(true); if (S.appr && (!famWin || famWin.closed) && S.mode !== 'family') toast('The approve box shows in the Family View. Open the Family View Window, or use Family View Here.'); return;
    case 'fam-approve': { const box = el && el.closest('.fw-apbox'), i2 = box && box.querySelector('input'), nm = clean(i2 ? i2.value : S.apName);
      if (!nm){ toast('Type a name in the approve box first.'); return; }
      recordAppr(p, {way: 'view', name: nm}); S.apName = ''; S.appr = false; touch(p); rerender(true); toast('Approved and saved with this version.'); return; }
    case 'appr-send': { const A = kit(p).approval || {}, words = fill(A.words || 'Here is what we put together. Reply with any changes, or say "I approve" and your name. [Chris]', p) + '\n\n' + apText(p);
      p.apSent = {text: apText(p), ver: verOf(p), date: today(), at: Date.now(), how: v};
      if (v === 'copy') copyText(words, 'The words are copied.'); else if (v === 'text') openLink(smsHref(p.ct.ph, words)); else openLink(mailHref(p.ct.em, fill(pTitle(p), p), words)); touch(p); rerender(true); return; }
    case 'appr-reply': { const t = document.getElementById('rk-apreply'), reply = t ? t.value.trim() : '', r2 = S.apr || {};
      if (!p.apSent) return toast('Send it first, so their approval is saved with the exact version they read.');
      if (!reply){ toast('Paste their reply first.'); if (t) t.focus(); return; }
      if (!/\bapprove|\byes\b|\bagree\b|looks (good|right)/i.test(reply) && !confirm('Their reply does not say "I approve". Record it as their approval anyway?')) return;
      recordAppr(p, {way: 'reply', name: clean(r2.name) || nameOf(p) || 'They', date: r2.date || today(), reply, ver: p.apSent.ver, text: p.apSent.text}); S.apr = {}; touch(p); rerender(true); toast('Their approval is recorded with the version they read.'); return; }
    case 'wa': p.wa = {ans: v, date: today(), at: Date.now()}; touch(p); rerender(true); return;
    case 'wh-add': { const i2 = document.getElementById('rk-whreal'), nm = clean(i2 ? i2.value : ''); if (!nm) return toast('Type a name first.'); p.wh = Object.assign({own: []}, p.wh); p.wh.own = arr(p.wh.own).concat(nm); touch(p); rerender(true); return; }
    case 'wh-see': S.wsee = !S.wsee; rerender(true); return;
    case 'wh-copy': { const wa = waOf(p); if (!(wa && wa.ans === 'yes') && !confirm('They have not said yes to writing help yet. Copy anyway?')) return; p.wh = Object.assign({own: []}, p.wh, {copied: Date.now()}); touch(p); copyText(whText(p), 'Copied for writing help: names are placeholders, contact details left out.'); return; }
    case 'wh-paste': { const t = document.getElementById('rk-whpaste'), r = whPaste(p, t ? t.value : ''); if (!r) return; touch(p); rerender(true); toast('In place: ' + r.put.join(', ') + '.'); return; }
    case 'wh-undo': { const L = p.wh && p.wh.last; if (!L || !confirm('Undo the last paste and bring back what was there before?')) return; Object.keys(L.prev).forEach(id => { p.v[id] = L.prev[id]; }); p.wh.last = null; touch(p); rerender(true); toast('The last paste is undone.'); return; }
    case 'fu-copy': { const t = touches(p).find(x => x.id === v); if (t) copyText(fill((t.f.email || {}).body || '', p)); return; }
    case 'fu-add': { const t = document.getElementById('rk-fuo-t'), d2 = document.getElementById('rk-fuo-d'); if (!t || !t.value.trim()) return toast('Name the check-in first.'); p.fuOwn = arr(p.fuOwn).concat({id: 'own_' + uid(), title: t.value.trim(), date: d2 ? d2.value : ''}); syncFu(p); touch(p); rerender(true); return; }
    case 'carry-ok': if (p.carried) delete p.carried[v]; touch(p); rerender(true); return;
    case 'anc-today': p.v[v] = today(); syncFu(p); touch(p); rerender(true); return;
    case 'fu-del': p.fuOwn = arr(p.fuOwn).filter(x => x.id !== v); delete p.fu[v]; syncFu(p); touch(p); rerender(true); return;
    case 'sum-fill': { if (!m) return; const t = autoSummary(p); if (!t) return toast('Tap a few choices first.'); m.summary = [clean(m.summary), t].filter(Boolean).join(' '); touch(p); rerender(true); return; }
    case 'save': { const s = saveSession(p); if (!s) return; const g = G(s.guideId) || {}, k = kit(p);
      toast('Session saved.');
      const offer = k.debrief !== false && s.guideId !== 'debrief' && g.cat !== 'self';
      if (offer && confirm('Session saved. Take five minutes for the After-Session Debrief?')){ S.on = false; clearInterval(timer); if (C.start) C.start('debrief', null); return; }
      rerender(true); return; }
  }
}
document.addEventListener('click', e => {
  const t = e.target.closest && e.target.closest('[data-rka]'); if (!t || !D()) return;
  if (t.disabled) return;
  if (t.closest('summary')) return;
  e.preventDefault(); act(t.dataset.rka, t.dataset.rkv || '', t);
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || !e.target.closest) return;
  const o = e.target.closest('#rk-root [data-rkown]'); if (o){ e.preventDefault(); act('own', o.dataset.rkown, o); }
});
// Typing saves as it goes, with no redraw, so the next tap always lands.
document.addEventListener('input', e => {
  const t = e.target; if (!t.closest || !t.closest('#rk-root') || !D()) return;
  const p = plan(); if (!p) return;
  if (t.dataset.rki){ if (t.type === 'date' || t.type === 'time') return; setPath(p, t.dataset.rki, t.value); touch(p); return; }
  if (t.dataset.rkm){ const m = meet(p); if (!m) return; if (t.type === 'date') return; setPath(m, t.dataset.rkm, t.value); touch(p); return; }
  if (t.dataset.rkapn){ S.apName = t.value; return; }
  if (t.dataset.rkapr){ S.apr = S.apr || {}; S.apr[t.dataset.rkapr.slice(4)] = t.value; return; }
});
document.addEventListener('change', e => {
  const t = e.target; if (!t.closest || !t.closest('#rk-root') || !D()) return;
  const p = plan(); if (!p) return; const m = meet(p);
  if (t.dataset.rki && (t.type === 'date' || t.type === 'time')){ setPath(p, t.dataset.rki, t.value); touch(p); if (/^v\.|^next\./.test(t.dataset.rki)){ syncFu(p); } return; }
  if (t.dataset.rki === 'hot'){ setPath(p, 'hot', t.value); touch(p); rerender(true); return; }
  if (t.dataset.rkm && t.type === 'date'){ if (m){ setPath(m, t.dataset.rkm, t.value); touch(p); } return; }
  if (t.dataset.rkc){ const i = t.dataset.rkc.indexOf('|'), id = t.dataset.rkc.slice(0, i), val = t.dataset.rkc.slice(i + 1), cur = arr(p.v[id]); p.v[id] = t.checked ? (cur.includes(val) ? cur : cur.concat(val)) : cur.filter(x => x !== val); touch(p); rerender(true); return; }
  if (t.dataset.rkfd){ p.fu[t.dataset.rkfd] = Object.assign({}, p.fu[t.dataset.rkfd], {done: !!t.checked, at: Date.now()}); const tt = touches(p).find(x => x.id === t.dataset.rkfd), x = tt && cfu(p, tt); if (x) x.done = !!t.checked; syncFu(p); touch(p); rerender(true); return; }
  if (t.dataset.rkmb && m){ m[t.dataset.rkmb] = !!t.checked; touch(p); return; }
  if (t.dataset.rkma != null && m){ m.after = m.after || {}; m.after[t.dataset.rkma] = !!t.checked; touch(p); return; }
});
document.addEventListener('toggle', e => { const d = e.target; if (d && d.dataset && d.dataset.rkfu && d.open) S.fuOpen = d.dataset.rkfu; }, true);
// Cards elsewhere (Home, the Sessions tab, the People record, the client file) open plans here.
document.addEventListener('click', e => { const t = e.target.closest && e.target.closest('[data-rkgo],[data-act="rk-plans"]'); if (!t || !D()) return; e.preventDefault(); e.stopPropagation(); act(t.dataset.rkgo || 'list-open', t.dataset.rkv || '', t); }, true);

// ---------- the API ----------
const API = window.GGRun = {
  init(ctx){ C = ctx || {}; },
  has, start, kitOf, kitRaw,
  on: () => S.on && isStaff() && !!D(),
  view,
  off(){ S.on = false; },
  // The Sessions tab card.
  card(){
    if (!isStaff() || !D() || !kitGuides().length && !plans().length) return null;
    const n = plans().length, due = dueSoon().length;
    return {k: 'rk', act: 'rk-plans', eb: 'With the People You Serve', title: 'Session Plans', desc: 'Every session run with its session kit: the choices, the meetings, the printouts, and the follow-ups.', n: n ? n + (n === 1 ? ' plan' : ' plans') + (due ? ', ' + due + ' follow-up' + (due === 1 ? '' : 's') + ' due' : '') : '', accent: 'var(--gold)'};
  },
  // The Follow-Ups Due card on the Staff and Founder Home.
  homeCard(){
    if (!isStaff() || !D() || !plans().length) return '';
    const due = dueSoon(); if (!due.length) return '';
    return `<div class="card fw-home" style="margin-top:14px"><div class="spread"><h3>Session Follow-Ups Due</h3><button type="button" class="linkbtn" data-rkgo="list-open">Session Plans</button></div>
      ${due.map(x => `<div class="fw-list-r"><div class="m"><b>${esc(x.t.title)}</b> <span class="muted">${esc(whoLine(x.p) || pTitle(x.p))}</span><br><small class="muted">${esc(nice(x.t.date))}${x.t.date < today() ? ' <span class="pill warn">Overdue</span>' : ''}</small></div><button type="button" class="btn btn-line btn-sm" data-rkgo="fu-open" data-rkv="${esc(x.p.id + '|' + x.t.id)}">Open</button></div>`).join('')}</div>`;
  },
  // The People record: this person's plans.
  personCard(c){
    if (!isStaff() || !D() || !c) return '';
    const L = plans().filter(p => p.pid === c.id); if (!L.length) return '';
    return `<div class="card" style="margin-bottom:14px;border-left:4px solid var(--gold)"><h3>Session Plans</h3>${L.map(p => `<div class="fw-list-r"><div class="m"><b>${esc(pTitle(p))}</b><br><small class="muted">${arr(p.mt).length} ${arr(p.mt).length === 1 ? 'meeting' : 'meetings'}, last ${esc(nice((lastMeet(p) || {}).date || p.made))}</small></div><div class="row"><button type="button" class="btn btn-line btn-sm" data-rkgo="open" data-rkv="${esc(p.id)}">Open</button>${kitRaw(nextGuide(p)) ? `<button type="button" class="btn btn-gold btn-sm" data-rkgo="start-p" data-rkv="${esc(nextGuide(p) + '|' + c.id)}">Next Meeting</button>` : ''}</div></div>`).join('')}</div>`;
  },
  // The client file's Linked Plans and Sessions list.
  fileRows(f){
    if (!isStaff() || !D() || !f) return '';
    return plans().filter(p => p.cli === f.id || (f.pid && p.pid === f.pid)).map(p => `<li><span><b>${esc(pTitle(p))}</b><small>${arr(p.mt).length} ${arr(p.mt).length === 1 ? 'meeting' : 'meetings'}, started ${esc(nice(p.made))}</small></span><button type="button" class="btn btn-line btn-sm" data-rkgo="open" data-rkv="${esc(p.id)}">Open the Plan</button></li>`).join('');
  },
  // The client file and the Intake: start any session that has a kit, with this client's details.
  fileStart(f){
    if (!isStaff() || !D() || !f) return '';
    const L = kitGuides(); if (!L.length) return '';
    return `<div class="fw-add rk-fstart"><select id="rk-fstart" aria-label="Choose a session">${L.map(g => `<option value="${esc(g.id)}">${esc(g.title)}</option>`).join('')}</select><button type="button" class="btn btn-line btn-sm" data-rkgo="start-file-pick" data-rkv="${esc(f.id)}">Start This Session</button></div>`;
  },
  // A saved session's page: the kit's step notes and a way back to the plan.
  sessionCard(s){
    if (!s || !s.rk || !isStaff()) return '';
    const p = plans().find(x => x.id === s.rk.plan), N = arr(s.rk.notes);
    return `${N.length ? `<div class="card"><h3>Step Notes</h3>${N.map(r => `<h4 style="margin-top:12px">${esc(r[0])}</h4>${r[1] ? `<p style="white-space:pre-wrap">${esc(r[1])}</p>` : ''}${r[2] ? `<p style="white-space:pre-wrap" class="muted">${esc(r[2])}</p>` : ''}`).join('')}</div>` : ''}${p ? `<div class="card"><div class="spread"><div><b>Session Plan</b> <span class="muted">${esc(pTitle(p))}</span></div><button type="button" class="btn btn-line btn-sm" data-rkgo="open" data-rkv="${esc(p.id)}">Open the Plan</button></div></div>` : ''}`;
  },
  // A guide that is served by a full tool: buttons on its page.
  guideBar(g){
    if (!isStaff() || !g) return '';
    const T = {'first-conversation': [['cli-first', 'Open First Conversation'], ['cli-intake', 'Open the Intake Session']], 'funeral-interview': [['fw', 'Open the Farewell Planning Session']], 'funeral-service': [['fw', 'Open the Farewell Planning Session']],
      'wedding-interview': [['wd', 'Open the Wedding Planning Session']], 'wedding-day': [['wd', 'Open the Wedding Planning Session']], premarital: [['pm', 'Open The Grounded Marriage']]}[g.id];
    const ok = {fw: !!window.GGFw, wd: !!window.GGWed, 'cli-first': !!window.GGCli, 'cli-intake': !!window.GGCli, pm: true};
    const L = arr(T).filter(x => ok[x[0]]);
    return L.length ? `<div class="row" style="margin-top:10px">${L.map(x => `<button type="button" class="btn btn-line" data-rktool="${x[0]}">${esc(x[1])}</button>`).join('')}</div><p class="muted" style="font-size:15px;margin:8px 0 0">This session has its own full tool, built for eye contact, with a Family View, Phone Mode, and every printout.</p>` : '';
  },
  // Backups: plans combine like the Farewell plans; the newest copy of each wins and deleted ones stay deleted.
  merge(out, inc){
    out.deleted = out.deleted || {clients: {}, sessions: {}}; out.deleted.rk = out.deleted.rk || {};
    Object.entries((inc.deleted || {}).rk || {}).forEach(([id, ts]) => { out.deleted.rk[id] = Math.max(out.deleted.rk[id] || 0, ts); });
    out.rk = out.rk || {plans: []}; out.rk.plans = arr(out.rk.plans); let added = 0, updated = 0;
    arr((inc.rk || {}).plans).forEach(x => { if (!x || !x.id) return; const i = out.rk.plans.findIndex(y => y.id === x.id); if (i < 0){ out.rk.plans.push(x); added++; } else if ((x.u || 0) > (out.rk.plans[i].u || 0)){ out.rk.plans[i] = x; updated++; } });
    out.rk.plans = out.rk.plans.filter(x => !(out.deleted.rk[x.id] && out.deleted.rk[x.id] >= (x.u || 0)));
    return {added, updated};
  },
  // For tests and the lead.
  state: S, plan, plans, touches, dueSoon, famBody, outBody, outText, bundleHTML, bundleText, whText, whMap, whPaste, verOf, apStatus, valText, fill, steps, pages, syncFu, saveSession, openPlan,
  famWin: null, last: null, lastCopy: null, lastLink: null, noOpen: false, lastSync: null
};
// The full tools a guide links to.
document.addEventListener('click', e => {
  const t = e.target.closest && e.target.closest('[data-rktool]'); if (!t || !D()) return; e.preventDefault();
  const k = t.dataset.rktool;
  if (k === 'fw' && window.GGFw){ if (window.GGWed && GGWed.state) GGWed.state.on = false; GGFw.state.on = true; GGFw.state.id = null; if (C.go) C.go('ceremonies'); return; }
  if (k === 'wd' && window.GGWed){ if (window.GGFw && GGFw.state) GGFw.state.on = false; GGWed.state.on = true; GGWed.state.id = null; if (C.go) C.go('ceremonies'); return; }
  if (k === 'cli-first' && window.GGCli){ GGCli.open('first'); return; }
  if (k === 'cli-intake' && window.GGCli){ GGCli.open('intake'); return; }
  if (k === 'pm' && C.go) C.go('premarital');
});
})();
