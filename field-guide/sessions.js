// =====================================================================
// GROUNDED FIELD GUIDE (TM): Your Sessions and the Session Builder (GWG BLD 758).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// Staff and Founders customize any session guide: edit any field, add, remove, or
// reorder steps. Their copy shows a Your Version pill, with Reset to Original one tap
// away. The Session Builder makes a new session from blank or from a copy of any
// session, in the shape of the library guides; the safety step and the After-Session
// Debrief link are always included. Founders also Save for Everyone, which prepares a
// Staff library update in Update a Library for them to seal.
// Data: copies live in DATA.ses.list ({id, base, u, made, g}): encrypted with the
// rest of this device's records and carried in backups (merged by GGSes.merge).
// =====================================================================
(function(){
'use strict';

let C = {}; // set by GGSes.init: data(), lib(), tier(), save(), render(), go(), toast(), esc(), icon(), guideHTML(), saveAll(), cats, services
const S = {mode: null, tab: 'edit', draft: null, kind: null, back: null, orig: null};
const esc = t => C.esc ? C.esc(t) : String(t == null ? '' : t);
const icon = n => C.icon ? C.icon(n) : '';
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const clone = o => JSON.parse(JSON.stringify(o));
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const isFounder = () => C.tier && C.tier() === 'founder';
const canEdit = () => C.tier && (C.tier() === 'staff' || C.tier() === 'founder');

// ---------- data ----------
const D = () => (C.data && C.data()) || null;
function store(){ const d = D(); if (!d) return []; d.ses = d.ses || {list: []}; d.ses.list = d.ses.list || []; return d.ses.list; }
function strip(g){ const o = clone(g); Object.keys(o).forEach(k => { if (k[0] === '_') delete o[k]; }); return o; }
function libList(){ const L = C.lib && C.lib(); return L && Array.isArray(L.guides) ? L.guides : []; }
const orig = id => libList().find(g => g.id === id) || null;
// The guides as this person sees them: the library's, with their own versions in place, then their own new sessions.
// A copy that matches the library exactly (after Save for Everyone is sealed) quietly gives way to the library's.
function list(){
  const lib = libList(), own = store();
  const out = lib.map(g => { const m = own.find(x => x.id === g.id); return m && !same(strip(m.g), strip(g)) ? Object.assign({}, m.g, {_mine: 'custom'}) : g; });
  own.forEach(m => { if (!lib.some(g => g.id === m.id)) out.push(Object.assign({}, m.g, {_mine: 'new'})); });
  return out;
}
const get = id => { const o = store().find(x => x.id === id), l = orig(id); if (!o) return l; if (!l) return Object.assign({}, o.g, {_mine: 'new'}); return same(strip(o.g), strip(l)) ? l : Object.assign({}, o.g, {_mine: 'custom'}); };
const kindOf = id => { const g = get(id); return g ? g._mine || null : null; };
function drop(id){
  const d = D(); if (!d) return; d.ses.list = store().filter(x => x.id !== id);
  d.deleted = d.deleted || {clients: {}, sessions: {}}; d.deleted.ses = d.deleted.ses || {}; d.deleted.ses[id] = Date.now();
}
function keep(g, base){
  const L = store(), i = L.findIndex(x => x.id === g.id), now = Date.now();
  const rec = {id: g.id, base: base || null, u: now, made: i < 0 ? now : (L[i].made || now), g: strip(g)};
  if (i < 0) L.push(rec); else L[i] = rec;
  const d = D(); if (d && d.deleted && d.deleted.ses) delete d.deleted.ses[g.id];
  C.save();
}

// ---------- the safety step and the debrief ----------
// The safety step is the one the Spiritual Guidance first session uses, word for word, with the 988 button.
const SAFETY_FB = {t: 'Safety check', m: 5, ask: ['How are you doing overall: sleep, eating, work, relationships?', 'Have you had any thoughts of harming yourself?'], do: ['If yes, move to the Crisis Protocol in Safety before continuing.'], tip: 'Asking directly about suicide does not plant the idea. It opens the door.'};
function safetyStep(){
  const g = orig('counsel-first'), s = g && (g.steps || []).find(x => /^safety/i.test(x.t || ''));
  return Object.assign(clone(s || SAFETY_FB), {link: '988', lock: 'safety'});
}
const isSafety = s => !!s && (s.lock === 'safety' || /^safety/i.test(s.t || ''));
const DEBRIEF = 'Take five minutes for the After-Session Debrief.';

// ---------- shaping a guide ----------
const LISTS = [['prep', 'Before the Session', 'One thing per line: what to read, set up, or have ready.'],
  ['ask', 'Questions to Ask', 'One question per line.'],
  ['words', 'Words That Help', 'One line each: words you can say as they are.'],
  ['bring', 'What to Bring', 'One thing per line.'],
  ['after', 'Follow-up', 'One thing per line: notes, emails, the next date.']];
const STEPL = [['say', 'Say'], ['ask', 'Ask'], ['do', 'Do']];
const lines = t => String(t || '').split('\n').map(x => x.trim()).filter(Boolean);
const minsOf = g => (g.steps || []).reduce((a, s) => a + (+s.m || 0), 0);
function blank(){
  return {id: 'my-' + uid(), cat: 'counsel', service: 'counsel', title: '', length: '60 minutes', who: '', purpose: '', prep: [], ask: [], words: [], bring: [],
    steps: [{t: 'Welcome', m: 5, say: [], ask: [], do: []}, safetyStep(), {t: 'Closing', m: 5, say: [], ask: [], do: []}], after: [DEBRIEF], debrief: true};
}
// Every new session keeps the safety step and the debrief, wherever the steps are moved.
function ensureNew(g){
  g.steps = g.steps || [];
  const k = g.steps.findIndex(isSafety);
  if (k < 0) g.steps.splice(Math.max(0, Math.min(2, g.steps.length - 1)), 0, safetyStep());
  else g.steps[k].lock = 'safety';
  g.after = g.after || [];
  if (!g.after.some(x => /debrief/i.test(x))) g.after.push(DEBRIEF);
  g.debrief = true;
  g.links = g.links || []; if (!g.links.includes('988')) g.links.push('988');
  return g;
}
function finish(src, kind){
  const g = clone(src);
  g.title = String(g.title || '').trim(); g.length = String(g.length || '').trim(); g.who = String(g.who || '').trim(); g.purpose = String(g.purpose || '').trim();
  LISTS.forEach(([k]) => { g[k] = (g[k] || []).map(x => String(x).trim()).filter(Boolean); if (!g[k].length && !(src[k] && src[k].length) && k !== 'prep' && k !== 'after') delete g[k]; });
  if (!g.who) delete g.who;
  g.steps = (g.steps || []).map(s => { const o = Object.assign({}, s); o.t = String(o.t || '').trim() || 'Step'; o.m = +o.m > 0 ? Math.round(+o.m) : 0; if (!o.m) delete o.m;
    STEPL.forEach(([k]) => { o[k] = (o[k] || []).map(x => String(x).trim()).filter(Boolean); if (!o[k].length) delete o[k]; });
    o.tip = String(o.tip || '').trim(); if (!o.tip) delete o.tip; return o; });
  if (kind === 'new') ensureNew(g);
  return g;
}
const slug = t => String(t || 'session').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'session';
function freeId(t){ const ids = new Set(libList().map(g => g.id).concat(store().map(x => x.id))); let b = slug(t), id = b, n = 2; while (ids.has(id)) id = b + '-' + n++; return id; }

// ---------- opening ----------
function openEdit(id, how){
  const g = get(id); if (!g) return;
  if (how === 'copy'){ const c = strip(g); c.id = 'my-' + uid(); c.title = 'Copy of ' + (g.title || 'Session'); S.draft = ensureNew(c); S.kind = 'new'; S.orig = null; }
  else { S.draft = strip(g); S.kind = g._mine === 'new' ? 'new' : 'custom'; S.orig = S.kind === 'custom' ? orig(id) : null; if (S.kind === 'new') ensureNew(S.draft); }
  S.mode = 'edit'; S.tab = 'edit'; S.back = how === 'copy' ? 'home' : id; C.go('guides');
}
function openBlank(){ S.draft = blank(); S.kind = 'new'; S.orig = null; S.mode = 'edit'; S.tab = 'edit'; S.back = 'home'; C.go('guides'); }
function leave(){
  const b = S.back; S.mode = b === 'home' || !b || !get(b) ? 'home' : null; S.draft = null;
  if (S.mode) C.go('guides'); else C.go('guides', {guide: b});
}

// ---------- views ----------
const CSS = `
#ses-root .card{min-width:0;}
.ses-pill{display:inline-block;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:1px;text-transform:uppercase;padding:2px 8px;border-radius:12px;background:color-mix(in srgb,var(--gold) 16%,transparent);color:var(--gold);margin-left:6px;vertical-align:middle;white-space:nowrap;}
.ses-pill.keep{background:color-mix(in srgb,var(--danger) 14%,transparent);color:var(--danger);}
.ses-mine{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:12px;padding-top:12px;border-top:1px solid var(--line);}
.ses-nav{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 4px;}
.ses-nav .btn[aria-current="page"]{background:var(--umber);border-color:var(--umber);color:#F4EBDA;}
.ses-time{position:sticky;top:var(--ses-top,110px);z-index:5;background:var(--bg);padding:8px 0 10px;margin-bottom:6px;}
.ses-time .t{display:flex;justify-content:space-between;gap:10px;font-weight:600;font-size:15px;flex-wrap:wrap;}
.ses-g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 14px;}
@media(max-width:700px){.ses-g2{grid-template-columns:minmax(0,1fr);}}
.ses-step{border-top:1px solid var(--line);padding:14px 0;}
.ses-step:first-of-type{border-top:0;padding-top:4px;}
.ses-st{display:flex;gap:8px;align-items:center;flex-wrap:wrap;}
.ses-st .n{font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:1px;color:var(--gold);font-size:14px;white-space:nowrap;}
.ses-st input.tt{flex:1;min-width:140px;font-weight:700;}
.ses-st input.mm{width:84px;}
.ses-mv{display:flex;gap:6px;flex-wrap:wrap;}
.ses-mv button{min-width:44px;min-height:44px;}
.ses-fixed{background:var(--bg-deep);border-radius:12px;padding:10px 12px;margin-top:8px;font-size:15px;overflow-wrap:anywhere;}
.ses-fixed ul{margin:4px 0 0 18px;}
#ses-root textarea{min-height:84px;}
.ses-hint{font-size:14px;color:var(--ink-soft);margin-top:2px;}
.ses-row{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:12px 0;border-top:1px solid var(--line);flex-wrap:wrap;}
.ses-row:first-child{border-top:0;}
.ses-row .m{min-width:0;flex:1 1 220px;}
.ses-row .m b{overflow-wrap:anywhere;}
.ses-starts{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;margin-top:10px;}
.ses-start{display:flex;flex-direction:column;align-items:flex-start;gap:2px;text-align:left;min-height:64px;padding:14px 16px;border:1.5px solid var(--line);border-radius:14px;background:var(--card);cursor:pointer;color:var(--ink);font:inherit;}
.ses-start b{font-family:'Cormorant Garamond',Georgia,serif;font-size:calc(22px * var(--scale));line-height:1.1;}
.ses-start small{color:var(--ink-soft);font-size:14px;line-height:1.35;}
.ses-start:hover{border-color:var(--gold);}
.ses-pv{border:1.5px dashed var(--gold);border-radius:16px;padding:14px;}
.ses-save{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px;}
`;
const backLink = () => `<button class="linkbtn" data-ses="back">&larr; ${S.back && S.back !== 'home' ? 'Back to the Guide' : 'Session Builder'}</button>`;
const ta = (attr, val, ph) => `<textarea ${attr}${ph ? ` placeholder="${esc(ph)}"` : ''}>${esc((val || []).join('\n'))}</textarea>`;

function vHome(){
  const own = store().slice().sort((a, b) => (b.u || 0) - (a.u || 0)).map(x => get(x.id)).filter(g => g && g._mine);
  const all = list().filter(g => g.cat !== 'safety');
  return `<div id="ses-root"><button class="linkbtn" data-ses="cards">&larr; Back to Sessions</button>
  <div class="page-head" style="margin-top:10px"><div class="eyebrow">Grow With Grounded</div><h1>Session Builder</h1><p>Build a session in the shape of the Grounded guides: who it is for, what to ask, the flow, and the follow-up. The safety step and the After-Session Debrief come with every session.</p></div>
  <div class="card"><h2 style="margin-bottom:4px">Start a Session</h2><p class="muted">Start from blank, or from a copy of any session.</p>
    <div class="ses-starts"><button type="button" class="ses-start" data-ses="blank"><b>Start Blank</b><small>A short template with a welcome, the safety step, and a closing.</small></button></div>
    <label class="f" for="ses-from">Start from a copy of</label>
    <div class="row"><select id="ses-from" style="max-width:420px">${all.map(g => `<option value="${esc(g.id)}">${esc(g.title)}${g._mine ? (g._mine === 'new' ? ' (Your Session)' : ' (Your Version)') : ''}</option>`).join('')}</select><button type="button" class="btn btn-gold btn-sm" data-ses="copy">Copy and Edit</button></div></div>
  <div class="card"><h2 style="margin-bottom:4px">Your Sessions</h2>
    ${own.length ? own.map(g => `<div class="ses-row"><div class="m"><b>${esc(g.title)}</b> ${pill(g)}<br><small class="muted">${esc(g.length || '')}</small></div>
      <div class="row"><button type="button" class="btn btn-gold btn-sm" data-ses="open" data-v="${esc(g.id)}">Open</button><button type="button" class="btn btn-line btn-sm" data-ses="edit" data-v="${esc(g.id)}">Edit</button><button type="button" class="btn btn-line btn-sm" data-ses="dup" data-v="${esc(g.id)}">Copy</button>${g._mine === 'custom' ? `<button type="button" class="btn btn-line btn-sm" data-ses="reset" data-v="${esc(g.id)}">Reset to Original</button>` : `<button type="button" class="btn btn-danger btn-sm" data-ses="del" data-v="${esc(g.id)}">Delete</button>`}</div></div>`).join('')
      : '<p class="muted">Sessions you build or customize show here. They stay on this device, encrypted with your records, and travel in your backups.</p>'}</div></div>`;
}
const pill = g => g && g._mine ? `<span class="ses-pill">${g._mine === 'new' ? 'Your Session' : 'Your Version'}</span>` : '';

function stepEd(s, i, n){
  const lock = isSafety(s);
  const mv = `<div class="ses-mv"><button type="button" class="btn btn-line btn-sm" data-ses="up" data-v="${i}" aria-label="Move step ${i + 1} up"${i ? '' : ' disabled'}>&uarr;</button><button type="button" class="btn btn-line btn-sm" data-ses="down" data-v="${i}" aria-label="Move step ${i + 1} down"${i < n - 1 ? '' : ' disabled'}>&darr;</button>${lock ? '' : `<button type="button" class="btn btn-line btn-sm" data-ses="rm" data-v="${i}">Remove</button>`}</div>`;
  const head = `<div class="ses-st"><span class="n">STEP ${i + 1}</span>${lock ? `<b style="flex:1;min-width:140px">${esc(s.t)}</b><span class="ses-pill keep">Always Included</span>` : `<input type="text" class="tt" data-sess="${i}|t" value="${esc(s.t || '')}" aria-label="Step ${i + 1} name" placeholder="Step name">`}
    <input type="number" class="mm" min="0" max="600" inputmode="numeric" data-sess="${i}|m" value="${esc(s.m || '')}" aria-label="Step ${i + 1} minutes" placeholder="min">${mv}</div>`;
  if (lock) return `<div class="ses-step">${head}<div class="ses-fixed">${STEPL.map(([k, l]) => (s[k] || []).length ? `<b>${l}</b><ul>${s[k].map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '').join('')}${s.tip ? `<p style="margin-top:6px"><i>${esc(s.tip)}</i></p>` : ''}<p class="ses-hint" style="margin-top:6px">The safety step stays in every session, word for word, with the 988 button. Move it or change its minutes.</p></div></div>`;
  return `<div class="ses-step">${head}<div class="ses-g2">${STEPL.map(([k, l]) => `<div><label class="f">${l}</label>${ta(`data-sess="${i}|${k}" aria-label="Step ${i + 1}: ${l}"`, s[k], 'One per line')}</div>`).join('')}
    <div><label class="f">Tip</label><textarea data-sess="${i}|tip" aria-label="Step ${i + 1}: Tip" placeholder="A short note for you">${esc(s.tip || '')}</textarea></div></div></div>`;
}
function timeBar(g){ const t = minsOf(g); return `<div class="ses-time" id="ses-time"><div class="t"><span>About ${t} minutes in the flow</span><span class="muted">${(g.steps || []).length} steps</span></div></div>`; }

function vEdit(){
  const g = S.draft, isNew = S.kind === 'new', CATS = (C.cats || []).filter(c => c[0] !== 'safety'), SV = C.services || {};
  const nav = `<div class="ses-nav"><button type="button" class="btn btn-line btn-sm" data-ses="tab" data-v="edit"${S.tab === 'edit' ? ' aria-current="page"' : ''}>Edit</button><button type="button" class="btn btn-line btn-sm" data-ses="tab" data-v="preview"${S.tab === 'preview' ? ' aria-current="page"' : ''}>Preview</button></div>`;
  const head = `<div id="ses-root">${backLink()}<div class="page-head" style="margin-top:10px"><div class="eyebrow">${isNew ? 'Session Builder' : 'Customize'}</div><h1>${esc(g.title || 'New Session')}</h1>
    <p>${isNew ? 'Your own session, in the shape of the Grounded guides. It stays on this device, encrypted with your records.' : 'Your own copy of this guide. The original stays one tap away with Reset to Original.'}</p></div>${nav}`;
  const saves = `<div class="ses-save"><button type="button" class="btn btn-gold" data-ses="save">${isNew ? 'Save My Session' : 'Save My Version'}</button>${isFounder() ? `<button type="button" class="btn btn-line" data-ses="save-all">Save for Everyone</button>` : ''}<button type="button" class="btn btn-line" data-ses="back">Cancel</button></div>
    ${isFounder() ? '<p class="muted" style="margin-top:8px;font-size:15px">Save for Everyone prepares a Staff library update in Update a Library. Seal it there and upload lib-staff.js.</p>' : ''}`;
  if (S.tab === 'preview') return head + `<p class="muted" style="margin:8px 0 10px">This is how the session page shows it.</p><div class="ses-pv" inert>${C.guideHTML ? C.guideHTML(Object.assign(finish(g, S.kind), S.kind === 'new' ? {_mine: 'new'} : {_mine: 'custom'}), true) : ''}</div>${saves}</div>`;
  const basics = `<div class="card"><h2 style="margin-bottom:4px">The Basics</h2>
    <label class="f" for="ses-t">Name</label><input type="text" id="ses-t" data-sesf="title" value="${esc(g.title || '')}" placeholder="Bedside Blessing: First Visit" autocomplete="off">
    <div class="ses-g2"><div><label class="f" for="ses-sv">Service</label><select id="ses-sv" data-sesf="service">${Object.entries(SV).filter(([k]) => k !== 'safety').map(([k, l]) => `<option value="${esc(k)}"${k === g.service ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select></div>
      <div><label class="f" for="ses-c">Category</label><select id="ses-c" data-sesf="cat">${CATS.map(([k, l]) => `<option value="${esc(k)}"${k === g.cat ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select></div>
      <div><label class="f" for="ses-l">Length</label><input type="text" id="ses-l" data-sesf="length" value="${esc(g.length || '')}" placeholder="60 minutes" autocomplete="off"></div>
      <div><label class="f" for="ses-w">Who It Is For</label><input type="text" id="ses-w" data-sesf="who" value="${esc(g.who || '')}" placeholder="A family at the bedside" autocomplete="off"></div></div>
    <label class="f" for="ses-p">Purpose</label><textarea id="ses-p" data-sesf="purpose" placeholder="What this session is for, in a sentence or two">${esc(g.purpose || '')}</textarea></div>`;
  const listCard = k => { const L = LISTS.find(x => x[0] === k); return `<div class="card"><h2 style="margin-bottom:4px">${L[1]}</h2><p class="ses-hint">${L[2]}</p>${ta(`data-sesl="${k}" aria-label="${L[1]}"`, g[k])}${k === 'after' && isNew ? '<p class="ses-hint" style="margin-top:6px">The After-Session Debrief link is always included.</p>' : ''}</div>`; };
  const flow = `<div class="card"><h2 style="margin-bottom:4px">The Flow</h2><p class="ses-hint">Timed steps, in order. Say, Ask, and Do take one line each.</p>${timeBar(g)}
    ${(g.steps || []).map((s, i, a) => stepEd(s, i, a.length)).join('')}
    <button type="button" class="btn btn-line btn-sm" style="margin-top:10px" data-ses="add">${icon('plus')} Add a Step</button></div>`;
  return head + basics + listCard('prep') + listCard('ask') + flow + listCard('words') + listCard('bring') + listCard('after') + saves + '</div>';
}

function view(){ setTimeout(headTop, 0); return S.mode === 'home' ? vHome() : S.draft ? vEdit() : vHome(); }
function rerender(){ const r = document.getElementById('ses-root'); if (!r) return C.render(); const y = window.scrollY; r.outerHTML = view(); window.scrollTo(0, y); }
function headTop(){ const h = document.querySelector('header.bar'), r = document.getElementById('ses-root'); if (h && r) r.style.setProperty('--ses-top', h.offsetHeight + 'px'); }
window.addEventListener('resize', headTop);

// ---------- saving ----------
function check(g){
  if (!g.title){ alert('Give the session a name first.'); const t = document.getElementById('ses-t'); if (t) t.focus(); return false; }
  if (!(g.steps || []).length){ alert('Add at least one step to the flow.'); return false; }
  return true;
}
function saveMine(){
  const g = finish(S.draft, S.kind); if (!check(g)) return;
  if (S.kind === 'custom'){ const o = orig(g.id); if (o && same(strip(o), g)){ drop(g.id); C.save(); } else keep(g, g.id); }
  else keep(g, null);
  S.mode = null; S.draft = null; C.toast(S.kind === 'new' ? 'Saved. It is in your Sessions.' : 'Saved as your version.'); C.go('guides', {guide: g.id});
}
// Founders: the guide goes into the Staff library through Update a Library. A new session gets a lasting id from its name.
function saveAll(src, kind){
  if (!isFounder() || !C.saveAll) return;
  const g = finish(src, kind); if (!check(g)) return;
  if (kind === 'new' && /^my-/.test(g.id)){ const old = g.id; g.id = freeId(g.title); const d = D(); if (d){ d.ses.list = store().filter(x => x.id !== old); (d.sessions || []).forEach(s => { if (s.guideId === old) s.guideId = g.id; }); } }
  keep(g, kind === 'new' ? null : g.id);
  S.mode = null; S.draft = null;
  C.saveAll(g, !orig(g.id));
}

// ---------- actions ----------
function act(a, v){
  const g = S.draft;
  switch (a){
    case 'home': S.mode = 'home'; S.draft = null; C.go('guides'); return;
    case 'cards': S.mode = null; S.draft = null; C.go('guides'); return;
    case 'open': S.mode = null; S.draft = null; C.go('guides', {guide: v}); return;
    case 'blank': openBlank(); return;
    case 'copy': { const sel = document.getElementById('ses-from'); if (sel && sel.value) openEdit(sel.value, 'copy'); return; }
    case 'dup': openEdit(v, 'copy'); return;
    case 'custom': case 'edit': openEdit(v, 'edit'); return;
    case 'reset': { const o = orig(v); if (!o || !confirm('Go back to the original guide? Your version is let go.')) return; drop(v); C.save(); C.toast('Back to the original.'); if (S.mode === 'home') C.render(); else C.go('guides', {guide: v}); return; }
    case 'del': { const x = get(v); if (!x || !confirm('Delete "' + (x.title || 'this session') + '"? Saved session notes keep their words.')) return; drop(v); C.save(); C.toast('Deleted.'); S.mode = 'home'; C.go('guides'); return; }
    case 'all': { const x = get(v); if (x && x._mine) saveAll(x, x._mine); return; }
    case 'back': leave(); return;
    case 'tab': S.tab = v === 'preview' ? 'preview' : 'edit'; rerender(); return;
    case 'save': saveMine(); return;
    case 'save-all': saveAll(S.draft, S.kind); return;
  }
  if (!g) return;
  const i = +v, st = g.steps;
  if (a === 'add'){ st.push({t: '', m: 5, say: [], ask: [], do: []}); rerender(); const ins = document.querySelectorAll('#ses-root input.tt'); if (ins.length) ins[ins.length - 1].focus({preventScroll: false}); return; }
  if (a === 'rm'){ if (isSafety(st[i])) return; const has = st[i] && (st[i].t || STEPL.some(([k]) => (st[i][k] || []).length)); if (has && !confirm('Remove step ' + (i + 1) + '?')) return; st.splice(i, 1); rerender(); return; }
  if (a === 'up' && i > 0){ [st[i - 1], st[i]] = [st[i], st[i - 1]]; rerender(); return; }
  if (a === 'down' && i < st.length - 1){ [st[i + 1], st[i]] = [st[i], st[i + 1]]; rerender(); return; }
}

// Tapping the Sessions tab while the builder is open returns to the Sessions cards, like the other tabs.
document.addEventListener('click', e => { const tb = e.target.closest && e.target.closest('#tabs [data-tab="guides"]'); if (tb){ S.mode = null; S.draft = null; } }, true);
document.addEventListener('click', e => {
  const t = e.target.closest && e.target.closest('[data-ses]'); if (!t || !canEdit()) return;
  e.preventDefault(); act(t.dataset.ses, t.dataset.v || '');
});
document.addEventListener('input', e => {
  const t = e.target; if (!t.closest || !t.closest('#ses-root') || !S.draft) return; const g = S.draft;
  if (t.dataset.sesf){ g[t.dataset.sesf] = t.value; if (t.dataset.sesf === 'title'){ const h = document.querySelector('#ses-root .page-head h1'); if (h) h.textContent = t.value || 'New Session'; } return; }
  if (t.dataset.sesl){ g[t.dataset.sesl] = t.value.split('\n'); return; }
  if (t.dataset.sess){ const [i, k] = t.dataset.sess.split('|'), s = g.steps[+i]; if (!s) return;
    if (k === 'm'){ s.m = t.value === '' ? 0 : Math.max(0, +t.value || 0); const b = document.getElementById('ses-time'); if (b) b.outerHTML = timeBar(g); return; }
    if (isSafety(s) && k !== 't') return;
    if (k === 't' || k === 'tip') s[k] = t.value; else s[k] = t.value.split('\n'); }
});
document.addEventListener('change', e => { const t = e.target; if (!t.closest || !t.closest('#ses-root') || !S.draft) return; if (t.tagName === 'SELECT' && t.dataset.sesf) S.draft[t.dataset.sesf] = t.value; });
(function(){ const s = document.createElement('style'); s.id = 'ses-css'; s.textContent = CSS; document.head.appendChild(s); })();

window.GGSes = {
  init(ctx){ C = ctx || {}; },
  list, get, orig, kindOf, pill, isSafety,
  open: () => !!S.mode && canEdit(),
  view,
  // The bar on a guide's page: Customize, the Your Version pill and Reset to Original, and Save for Everyone for Founders.
  guideBar(g){
    if (!g || !canEdit() || g.cat === 'safety') return '';
    const k = g._mine, id = esc(g.id);
    return `<div class="ses-mine">${k ? pill(g) : ''}<button type="button" class="btn btn-line btn-sm" data-ses="${k ? 'edit' : 'custom'}" data-v="${id}">${k ? 'Edit My Version' : 'Customize'}</button>
      <button type="button" class="btn btn-line btn-sm" data-ses="dup" data-v="${id}">Copy to a New Session</button>
      ${k === 'custom' ? `<button type="button" class="btn btn-line btn-sm" data-ses="reset" data-v="${id}">Reset to Original</button>` : ''}
      ${k === 'new' ? `<button type="button" class="btn btn-danger btn-sm" data-ses="del" data-v="${id}">Delete This Session</button>` : ''}
      ${k && isFounder() ? `<button type="button" class="btn btn-gold btn-sm" data-ses="all" data-v="${id}">Save for Everyone</button>` : ''}</div>`;
  },
  // Backups: copies combine like saved services; the newest copy of each wins and deleted ones stay deleted.
  merge(out, inc){
    out.deleted = out.deleted || {clients: {}, sessions: {}}; out.deleted.ses = out.deleted.ses || {};
    Object.entries((inc.deleted || {}).ses || {}).forEach(([id, ts]) => { out.deleted.ses[id] = Math.max(out.deleted.ses[id] || 0, ts); });
    out.ses = out.ses || {list: []}; out.ses.list = out.ses.list || []; let added = 0, updated = 0;
    ((inc.ses || {}).list || []).forEach(x => { const i = out.ses.list.findIndex(y => y.id === x.id); if (i < 0){ out.ses.list.push(x); added++; } else if ((x.u || 0) > (out.ses.list[i].u || 0)){ out.ses.list[i] = x; updated++; } });
    out.ses.list = out.ses.list.filter(x => !(out.deleted.ses[x.id] && out.deleted.ses[x.id] >= (x.u || 0)));
    return {added, updated};
  },
  state: S
};
})();
