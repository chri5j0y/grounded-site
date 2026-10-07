/* The Grove app. Words for family practices live in grove/together.js. */
(function () {
'use strict';
const ICON = {
 body:`<circle cx="12" cy="9" r="2.6"/><path d="M12 3.2v1.4M12 13.4v1.4M6.2 9h1.4M16.4 9h1.4M7.9 4.9l1 1M15.1 12.1l1 1M7.9 13.1l1-1M15.1 5.9l1-1"/><path d="M12 15v7"/><path d="M12 19c-2.2-2-4.2-1.7-5.4-.8 1.4 1.3 3.6 1.5 5.4.8z"/>`,
 rest:`<path d="M12 22V8"/><g fill="currentColor" stroke="none"><circle cx="12" cy="4.4" r="1.2"/><circle cx="10.6" cy="6.7" r="1.2"/><circle cx="13.4" cy="6.7" r="1.2"/><circle cx="10.6" cy="9.4" r="1.2"/><circle cx="13.4" cy="9.4" r="1.2"/><circle cx="12" cy="11.8" r="1.1"/></g><path d="M12 20c-2.6-1.4-3.6-3.2-3.8-4.8M12 18.6c2.6-1.4 3.6-3.2 3.8-4.8"/>`,
 nourish:`<path d="M12 21.5V11"/><path d="M12 14c-3.8 0-5.8-2.8-5-6 3.2 0 5 2.4 5 6z"/><path d="M12 12c3.8 0 5.8-2.8 5-6-3.2 0-5 2.4-5 6z"/><path d="M12 18.6c-2.8 0-4.6-1.4-5.4-3.2 2.8-.6 4.6.6 5.4 3.2z"/>`,
 mind:`<path d="M8 21.5c0-7 3-12.6 8.4-15.6 2.6-1.3 4.3 1.6 2.2 2.7-1.6.8-2.8-.4-1.7-1.3"/><path d="M8.8 17.4 5.6 15.8M9.8 13.8 6.9 11.7M11.8 10.6 10.3 7.8M9.8 17.3l3.2-.8M11 13.9l3.2-1.3"/>`,
 connect:`<path d="M16.5 22V3.5"/><path d="M11.5 22c-3.6-3.2 3.8-5-.2-9.2-3.2-3.4 3.6-5.6 1.4-9.3"/><circle cx="7.6" cy="9.4" r="2.1"/><circle cx="9.3" cy="7.3" r="1.7"/><path d="M13.6 15.2c2-.2 2.8 1.8 1.2 2.8"/>`,
 spirit:`<path d="M12 2.8l1.6 6 5.6-1.3-4.3 3.9 2.7 5.4L12 13.6l-5.6 3.2 2.7-5.4-4.3-3.9 5.6 1.3z"/><path d="M12 13.6v8.4"/><path d="M12 19c1.8-1.8 3.8-2 5-1.4"/>`,
 create:`<path d="M7 22c0-5 .4-8.6 0-11.4M16.5 22c0-5.2 0-9.4.3-12.6M12 22v-7.4"/><circle cx="7" cy="8.4" r="2.2"/><circle cx="16.8" cy="7.2" r="2.2"/><circle cx="12" cy="12.4" r="2"/><g fill="currentColor" stroke="none"><circle cx="7" cy="8.4" r=".8"/><circle cx="16.8" cy="7.2" r=".8"/><circle cx="12" cy="12.4" r=".7"/></g>`,
 hope:`<path d="M12 22v-7"/><path d="M6.6 12.6a3 3 0 0 1 .5-5.3 4.2 4.2 0 0 1 7.9-2 3.5 3.5 0 0 1 3.2 5.6 2.9 2.9 0 0 1-2.5 4.1H8.9a2.7 2.7 0 0 1-2.3-2.4z"/><g fill="currentColor" stroke="none"><circle cx="9.2" cy="16.9" r="1.3"/><circle cx="15.2" cy="16.6" r="1.3"/><circle cx="14.4" cy="9" r="1.1"/></g><path d="M9.2 15v.6M15.2 15v.4M9.3 22h5.4"/>`,
 swap:`<path d="M4 8.5h13.5l-3-3M20 15.5H6.5l3 3"/>`,
 heart:`<path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.7a4.3 4.3 0 0 1 7.5 2.8c0 5.4-7.5 10-7.5 10z"/>`,
 seed:`<ellipse cx="12" cy="15.5" rx="5.4" ry="3.6"/><path d="M9.5 14.6c1-.8 2.4-1 3.6-.6"/>`,
 maple:`<path d="M12 21v-8.5"/><path d="M12 12.5c-3.8 0-5.6-2.6-4.9-5.6 3.2 0 4.9 2.2 4.9 5.6z"/><path d="M12 15c3.8 0 5.6-2.6 4.9-5.6-3.2 0-4.9 2.2-4.9 5.6z"/><path d="M7 21h10"/>`,
 birch:`<path d="M9.5 22V11M14.5 22V12.5"/><path d="M8.7 15h1.6M8.7 19h1.6M13.7 17h1.6"/><path d="M6.2 10.6a3.6 3.3 0 0 1 2.4-5.4 4 3.6 0 0 1 7-.4 3.4 3.1 0 0 1 2.4 5.4c-.8 1-2 1.4-3.2 1.4H9.4c-1.3 0-2.5-.4-3.2-1z"/>`,
 pine:`<path d="M12 22v-3.5"/><path d="M12 2.5 8.6 7.4h2l-3.9 5h2.2L4.6 18.5h14.8l-4.3-6.1h2.2l-3.9-5h2z"/>`,
 flower:`<path d="M12 22v-8"/><circle cx="12" cy="8" r="1.8"/><circle cx="12" cy="4.4" r="2"/><circle cx="15.4" cy="6.9" r="2"/><circle cx="14.1" cy="10.9" r="2"/><circle cx="9.9" cy="10.9" r="2"/><circle cx="8.6" cy="6.9" r="2"/><path d="M12 18c1.8-1.8 3.8-2 5-1.4"/>`,
 today:`<path d="M3 17.5h18"/><path d="M7 17.5a5 5 0 0 1 10 0"/><path d="M12 7.5v2M5.6 10.6l1.4 1.4M18.4 10.6 17 12M3.8 14.8h1.6M18.6 14.8h1.6"/><path d="M8 21h8"/>`,
 week:`<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle cx="8.5" cy="14.5" r="1" fill="currentColor"/><circle cx="12" cy="14.5" r="1" fill="currentColor"/><circle cx="15.5" cy="14.5" r="1"/>`,
 journal:`<path d="M5 4.5h10.5a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h10.5"/><path d="M9 8h6M9 11h4"/>`,
 guide:`<circle cx="12" cy="12" r="9"/><path d="m15.6 8.4-2.2 5-5 2.2 2.2-5z"/>`,
 morning:`<path d="M3 17h18"/><path d="M7 17a5 5 0 0 1 10 0"/><path d="M12 7v2.4M5.2 10.2l1.6 1.6M18.8 10.2l-1.6 1.6"/><path d="M9 20.5h6"/>`,
 midday:`<circle cx="12" cy="12" r="4"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/>`,
 evening:`<path d="M19.5 14.6A8 8 0 1 1 9.4 4.5a6.4 6.4 0 0 0 10.1 10.1z"/><path d="M16 4.5v2.4M14.8 5.7h2.4"/>`,
 can:`<path d="M5.5 10.5h9.5v8.2a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2z"/><path d="M15 12.5l5-3.6"/><path d="M19.2 7.2l2.3 2.6"/><path d="M8 10.5a2.3 2.3 0 0 1 4.6 0"/><path d="M5.5 13H3.8a1.3 1.3 0 0 0-1.3 1.3v1.2A1.3 1.3 0 0 0 3.8 17h1.7"/>`,
 check:`<path d="M5 12.5l4.2 4.2L19 7"/>`,
 print:`<path d="M7 8V3.5h10V8"/><rect x="3.5" y="8" width="17" height="8.5" rx="2"/><path d="M7 13.5h10V21H7z"/>`,
 calendar:`<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M12 13v5M9.5 15.5h5"/>`,
 image:`<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><path d="M3.5 16l5-4.5 4 3.5 3-2.5 5 4"/><circle cx="15.5" cy="9" r="1.6"/>`,
 people:`<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M16.4 14.2c2.6.2 4.6 2.6 4.6 5.3"/>`,
 menu:`<path d="M4 7h16M4 12h16M4 17h16"/>`,
 back:`<path d="M15 5l-7 7 7 7"/>`,
 library:`<path d="M4.5 5.5c2.6-1 5-.8 7.5.8v13.2c-2.5-1.6-4.9-1.8-7.5-.8z"/><path d="M19.5 5.5c-2.6-1-5-.8-7.5.8v13.2c2.5-1.6 4.9-1.8 7.5-.8z"/>`,
 search:`<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>`,
 play:`<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/>`,
 how:`<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r=".6" fill="currentColor"/>`
};
function icon(name, cls){ return `<svg class="${cls||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]||''}</svg>`; }

// ---------- PART ICONS ----------
Object.assign(ICON, {
 roots:`<path d="M12 3v8"/><path d="M4 11h16"/><path d="M12 11c0 4-1 7-3 10M12 11c0 4 1 7 3 10M12 11c-2 2-5 3-7 7M12 11c2 2 5 3 7 7"/>`,
 trunk:`<path d="M9.5 21c1-4 1.2-8 1.2-12.5M14.5 21c-1-4-1.2-8-1.2-12.5"/><circle cx="12" cy="6" r="3.4"/><path d="M6 21h12"/>`,
 bark:`<path d="M8 3c-1 6 1 12 0 18M16 3c1 6-1 12 0 18"/><path d="M11 6c1 2 0 4 1 6M12.5 14c-.5 2 .5 3 0 5"/>`,
 branches:`<path d="M12 21V11"/><path d="M12 15L6 9M12 12l6-6M6 9L4 5.5M6 9H2.8M18 6l1-3M18 6h3"/>`,
 leaves:`<path d="M12 21v-9"/><path d="M12 12C7 12 4 9 5 4c5 0 7 3 7 8z"/><path d="M12 15c4 0 7-2.5 6.5-7-4 0-6.5 2.5-6.5 7z"/>`,
 fruit:`<path d="M12 7.5c-.8-2-.8-3.6.2-5"/><path d="M12.3 6c2.6-2 5.6-.4 5 1.8-2 .6-3.8.2-5-1.8z"/><circle cx="12" cy="14.3" r="6.3"/>`,
 sequoia:`<path d="M12 2.4c-2 1.5-2.9 3.9-2.3 6.3.4 1.4 1.3 2.2 2.3 2.2s1.9-.8 2.3-2.2c.6-2.4-.3-4.8-2.3-6.3z"/><path d="M12.6 13.2c1.5-.9 3.2-.8 4.1.2-1.3 1-2.9 1-4.1-.2zM11.4 15.6c-1.5-.9-3.2-.8-4.1.2 1.3 1 2.9 1 4.1-.2z"/><path d="M8.6 21.5c1.6-1 2.2-3 2.2-6.2V10.6M15.4 21.5c-1.6-1-2.2-3-2.2-6.2V10.6M6.5 21.5h11"/>`,
 tree:`<circle cx="12" cy="8" r="5"/><circle cx="7.4" cy="11.2" r="3.4"/><circle cx="16.6" cy="11.2" r="3.4"/><path d="M12 13.5V21M9 21h6"/>`,
 grove:`<circle cx="7" cy="9.5" r="3.5"/><circle cx="16" cy="7.5" r="4.5"/><path d="M7 13v7M16 12v8M3 20h18"/>`
});
// =====================================================================
// THE GROVE . WHERE OUR TREES GROW TOGETHER (Rebrand Session 5)
// Your tree is yours. The grove is ours.
//
// Nothing personal happens here. People tend their own tree in their own
// app (Oak, Birch, Sequoia, Pine, Aspen, Maple). The Grove shows everyone's trees side by side,
// a family wall, and practices the family does together.
//
// What The Grove can see: each person's name, picture, age, and, if their
// "Show my growth on The Grove" switch is on, the big picture of their
// growth (days tended, rings, which parts they tended lately). Never
// answers, levels, notes, or journals. A grown-up also sees a quiet alert
// when a teen's check-in asked for a caring conversation, never the answers.
//
// Saved on this device only, for the household (gg-grove-family-v1).
// Built so a linked grove can plug in later: every post, reaction, and
// check-off carries who, when, and an id.
//
// Engagement guardrails (on purpose): no badges or unread counts, no
// endless scroll (this week, folded weeks), reactions show who, never
// totals, no streaks, growth only adds, and growth comes from tending and
// family practices only, never from posting or reacting. Group totals and
// family milestones (BLD 745) add the whole family together, never person by
// person, and a milestone once reached is kept.
// =====================================================================
const { stageOf, skyNow, sceneSVG } = window.GGScene;
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const T = window.GROVE_TOGETHER || { practices: [], featured: [], themes: [] };
const TP = Object.fromEntries(T.practices.map(p => [p.id, p]));
const PARTS6 = [
  { key:'roots', name:'Roots', sub:'What grounds you', color:'#8E5A2B' },
  { key:'trunk', name:'Trunk', sub:'Purpose', color:'#C27A1E' },
  { key:'bark', name:'Bark', sub:'Mind and feelings', color:'#6E5BB5' },
  { key:'branches', name:'Branches', sub:'Relationships', color:'#1F8A8F' },
  { key:'leaves', name:'Leaves', sub:'Body', color:'#3A9B58' },
  { key:'fruit', name:'Fruit', sub:'Hope', color:'#D9483F' }];
const PNAME = Object.fromEntries(PARTS6.map(p => [p.key, p.name]));
const TOOL = { adult:{ name:'Oak', href:'/oak/' }, pine:{ name:'Pine', href:'/pine/' }, birch:{ name:'Birch', href:'/birch/' }, aspen:{ name:'Aspen', href:'/aspen/' }, maple:{ name:'Maple', href:'/maple/' }, sequoia:{ name:'Sequoia', href:'/sequoia/' } };
// A grown-up whose tree is Sequoia (GWG BLD 733) or Birch (GWG BLD 742) tends there. toolOf takes an age, or a profile.
const ADULT_TREES = ['sequoia', 'birch'];
const adultTree = p => { if (!p || p.age !== 'adult') return ''; if (ADULT_TREES.includes(p.tree)) return p.tree; const t = ((p.shared || {}).tree || {}).tool; return ADULT_TREES.includes(t) ? t : ''; };
const toolOf = x => { const p = x && typeof x === 'object' ? x : null, age = p ? p.age : x;
  if (p && adultTree(p)) return TOOL[adultTree(p)];
  return TOOL[age] || TOOL.adult; };
const stageFor = p => stageOf(p.age, adultTree(p));
const REACTS = [['love','\u2764\uFE0F','Love'], ['proud','\uD83C\uDF1F','Proud of you'], ['hug','\uD83E\uDD17','Hug'], ['thanks','\uD83D\uDE4F','Thank you'], ['ha','\uD83D\uDE04','Ha']];
const KINDS = typeof TREE_KINDS !== 'undefined' ? TREE_KINDS : [{ id:'grove', name:'Grove tree', days:0 }];
const SCENES = typeof SCENERY !== 'undefined' ? SCENERY : [{ id:'forest', name:'Forest', days:0 }];
const VISITORS = typeof CRITTERS !== 'undefined' ? CRITTERS : [];

/* ---------- dates ---------- */
const pad = n => String(n).padStart(2, '0');
const dstr = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const today = () => dstr(new Date());
const parse = s => { const p = String(s).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); };
const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return dstr(d); };
const between = (a, b) => Math.round((parse(b) - parse(a)) / 864e5);
const nice = s => parse(s).toLocaleDateString(undefined, { weekday:'short', month:'short', day:'numeric' });
// Weeks run Monday to Sunday.
const weekStart = s => { const d = parse(s), k = (d.getDay() + 6) % 7; d.setDate(d.getDate() - k); return dstr(d); };
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* ---------- the family grove, saved on this device ---------- */
const STORE = 'gg-grove-family-v1', OLD = 'the-grove-v1', OLDER = 'tending-the-garden-v1';
const blank = () => ({ v:1, id: uid(), start: today(), wall: [], reacts: {}, done: {}, grew: {}, kinds: {}, scenery: 'forest', seen: {}, intro: false, scale: 1, family: [], famGone: {}, miles: {} });
let G = blank();
function load() {
  try { const j = JSON.parse(localStorage.getItem(STORE)); if (j && j.v) G = Object.assign(blank(), j); else {
    const o = JSON.parse(localStorage.getItem(OLD) || 'null'); if (o && o.scale) G.scale = o.scale; save(); } } catch (e) {}
}
function save() { try { localStorage.setItem(STORE, JSON.stringify(G)); } catch (e) { toast('Saving did not work in this browser.'); } }
function toast(m) { if (window.GGP && GGP.toast) GGP.toast(m); else { const t = document.createElement('div'); t.className = 'gv-toast'; t.textContent = m; document.body.appendChild(t); setTimeout(() => t.remove(), 2600); } }

/* ---------- people and their trees ---------- */
const ORDER = { adult:1, pine:2, aspen:3, maple:4 };
function people() { return window.GGP && GGP.list ? GGP.list().slice().sort((a, b) => (ORDER[a.age] || 9) - (ORDER[b.age] || 9) || String(a.name).localeCompare(String(b.name))) : []; }
function who(id) { return people().find(p => p.id === id) || null; }
function nameOf(id) { const p = who(id); return p ? p.name : 'Someone'; }
function me() { return window.GGP && GGP.active ? GGP.active() : null; }
function treeOf(p) {
  const t = (p.shared || {}).tree, show = !!(t && t.show !== false && t.tool);
  const wk = addDays(today(), -6), parts = new Set();
  if (show) (t.recent || []).forEach(r => { if (r.d >= wk) (r.parts || []).forEach(k => parts.add(k)); });
  // Willow (Willow Build Session 2): a tree that grows in Willow stands as a willow, and a
  // remembered tree stays in the grove after a death, softer, with nothing asked of it.
  const sh = p.shared || {}, willow = !!(t && t.tool === 'willow'), remembered = !!sh.remembered;
  return { show, days: show ? (t.days || 0) : 0, rings: show ? (t.rings || 0) : 0, recent: show ? (t.recent || []) : [], parts: [...parts], updated: t && t.updated, willow, remembered, rememberedOn: remembered ? sh.remembered.date : '' };
}
function groveDays() {
  let changed = false;
  people().forEach(p => treeOf(p).recent.forEach(r => { if (!G.grew[r.d]) { G.grew[r.d] = 1; changed = true; } }));
  Object.keys(G.done).forEach(d => { if (Object.keys(G.done[d] || {}).length && !G.grew[d]) { G.grew[d] = 1; changed = true; } });
  if (changed) save();
  const most = Math.max(0, ...people().map(p => treeOf(p).days));
  return Math.max(Object.keys(G.grew).filter(d => d <= today()).length, most);
}
const myDays = p => p ? treeOf(p).days : 0;

/* ---------- family trees, shared by hand from other phones (Share to Family, BLD 732) ----------
   Each person shares from their own tree app: a link with their tree after the #.
   gg-app.js reads it, wipes it from the address bar, and checks it strictly.
   Saved here in G.family as {id: share id, u: when it was made, n, t, g, p, d, w, added}.
   A newer code from the same person replaces the older one, never the other way.
   Removed trees are remembered in G.famGone {id: u} so a backup merge doesn't bring them back.
   The backup merge (gg-backup.js mergeGrove) keeps the entry with the larger u for each id. */
const FAM_MAX = 20;
const FAM_STAGE = { maple:'maple', aspen:'aspen', pine:'pine', birch:'birch', oak:'adult', sequoia:'sequoia' };
const FAM_TOOL = { maple:'Maple', aspen:'Aspen', pine:'Pine', birch:'Birch', oak:'Oak', sequoia:'Sequoia' };
const famDate = u => dstr(new Date(u * 1000));
function famList() {
  const F = window.GGApp && GGApp.family, best = {};
  (Array.isArray(G.family) ? G.family : []).forEach(x => {
    if (!x || typeof x !== 'object') return;
    const c = F ? F.clean({ v:1, i:x.id, n:x.n, t:x.t, g:x.g, p:x.p, d:x.d, w:x.w, m:x.u }) : null; if (!c) return;
    if ((G.famGone || {})[c.i] >= c.m) return;
    if (!best[c.i] || best[c.i].u < c.m) best[c.i] = { id:c.i, u:c.m, n:c.n, t:c.t, g:c.g, p:c.p, d:c.d, w:c.w, added:x.added };
  });
  return Object.values(best).sort((a, b) => a.n.localeCompare(b.n) || a.u - b.u);
}
function famParts(f) { const order = (window.GGApp && GGApp.family && GGApp.family.parts) || PARTS6.map(x => x.key); return String(f.p || '').split('').map(i => order[+i]).filter(Boolean); }
function famLine(f) {
  const made = famDate(f.u), t = today();
  if (f.d && made === t) return 'Tended today';
  if (f.d) return 'Tended ' + nice(made);
  return 'Shared ' + nice(made);
}
function famWeek(f) { const made = famDate(f.u); return weekStart(made) === weekStart(today()) && f.w ? `${f.w} ${f.w === 1 ? 'day' : 'days'} tended this week` : ''; }
function famHtml() {
  const list = famList();
  let h = `<div class="card gv-fam"><h3>Family Trees</h3>`;
  if (!list.length) return h + `<p class="muted">Family on other phones can send you their tree. In their own tree app (Oak, Birch, Sequoia, Pine, Aspen, or Maple), they tap Share to Family and send you the link or QR code.</p></div>`;
  h += `<p class="muted">Trees shared from family's own phones. Each one shows how it looked when it was shared.</p><ul class="gv-fam-list">`;
  h += list.map(f => { const wk = famWeek(f); return `<li><span class="gv-fam-ic" aria-hidden="true">${icon(f.t === 'oak' ? 'tree' : f.t === 'sequoia' ? 'sequoia' : f.t === 'birch' ? 'birch' : f.t === 'pine' ? 'pine' : f.t === 'aspen' ? 'leaves' : 'maple')}</span><div><b>${esc(f.n)}</b> <small>${FAM_TOOL[f.t]}</small><span>${esc(famLine(f))}${wk ? ' · ' + esc(wk) : ''}</span></div><button type="button" class="btn btn-line btn-sm" data-act="famdrop" data-id="${esc(f.id)}" aria-label="Remove ${esc(f.n)}'s tree">Remove</button></li>`; }).join('');
  return h + `</ul><p class="muted">A shared tree is a snapshot. To see it grow, ask them to share again from their tree app.</p></div>`;
}
function famDrop(id) {
  const f = famList().find(x => x.id === id); if (!f) return;
  if (!confirm(`Remove ${f.n}'s tree from your grove? They can share it again any time.`)) return;
  G.famGone = G.famGone || {}; G.famGone[id] = Math.max(G.famGone[id] || 0, f.u);
  G.family = (G.family || []).filter(x => !x || x.id !== id); save(); render(); toast(`${f.n}'s tree is removed.`);
}
function famAdd(c) {
  const list = famList(), have = list.find(x => x.id === c.i);
  if (have && have.u >= c.m) { toast(have.u === c.m ? `${c.n}'s tree is already in your grove.` : `You already have a newer share from ${have.n}.`); return; }
  if (!have && list.length >= FAM_MAX) { toast(`Your grove holds up to ${FAM_MAX} family trees. Remove one to add another.`); return; }
  G.family = (G.family || []).filter(x => !x || x.id !== c.i);
  G.family.push({ id:c.i, u:c.m, n:c.n, t:c.t, g:c.g, p:c.p, d:c.d, w:c.w, added: new Date().toISOString() });
  if (G.famGone && G.famGone[c.i]) delete G.famGone[c.i];
  save(); S.tab = 'grove'; render(); toast(have ? `${c.n}'s tree is updated.` : `${c.n}'s tree is in your grove.`);
}
function famIntake() {
  const F = window.GGApp && GGApp.family; if (!F) return;
  if (F.bad()) toast('That family link could not be read. Ask them to share it again.');
  const c = F.pending(); if (!c) return; F.clear();
  const have = famList().find(x => x.id === c.i);
  if (have && have.u >= c.m) { famAdd(c); return; }
  const ask = have ? `Update ${c.n}'s tree in your grove?` : `Add ${c.n}'s tree to your grove?`;
  const html = `<p>${esc(c.n)} shared their ${FAM_TOOL[c.t]} tree: how it looks, whether they tended today, and days tended this week. It stays on this device, in your grove.</p><p class="ggx-small">It doesn't update by itself. ${esc(c.n)} can share again any time.</p>`;
  if (GGApp.dialog) GGApp.dialog({ title: ask, html, buttons: [{ t: have ? 'Update Their Tree' : 'Add to My Grove', kind: 'main', fn: () => famAdd(c) }, { t: 'Not Now', kind: 'quiet' }] });
  else if (confirm(ask)) famAdd(c);
}

/* ---------- view state ---------- */
const S = { tab: 'grove', sel: null, wk: 0, part: '', open: '', lib: { q: '' } };
function tabs() {
  const t = [['grove','Our Grove','grove'], ['wall','The Wall','people'], ['together','Together','heart']];
  if (hasEarlier()) t.push(['earlier','Earlier','journal']);
  t.push(['how','How it works','how']);
  t.push(['learn','Learn','play']);
  return t;
}
function renderTabs() {
  const t = tabs(); if (S.tab !== 'library' && !t.some(x => x[0] === S.tab)) S.tab = 'grove';
  $('#tabs').innerHTML = t.map(([id, label, ic]) => `<button class="tab" role="tab" aria-selected="${S.tab === id}" data-tab="${id}">${icon(ic)}${label}</button>`).join('');
}
function render() {
  renderTabs();
  const v = $('#view');
  v.innerHTML = hereBar() + alertsHtml() + ({ grove: viewGrove, wall: viewWall, together: viewTogether, earlier: viewEarlier, how: viewHow, library: viewLibrary }[S.tab] || viewGrove)();
  if (window.GGLiving && document.getElementById('gl-scene')) GGLiving.mount({ done: GV_DONE });
  if (S.tab === 'library' && S.lib.q) libFind();
}
window.render = render;

/* ---------- who's here ---------- */
function hereBar() {
  const a = me();
  if (a) return `<div class="gv-here">${window.GGAv ? GGAv.html(a.avatar, a.name, 36) : ''}<p>Here as <b>${esc(a.name)}</b>.</p><div class="gv-here-acts"><button class="btn btn-line btn-sm" data-act="switch">Switch person</button><button class="btn btn-line btn-sm" data-act="lock">Lock</button></div></div>`;
  if (!people().length) return '';
  return `<div class="gv-here"><p>Looking around is open to everyone. To post, react, or check off a family practice, choose your picture first.</p><div class="gv-here-acts"><button class="btn btn-gold btn-sm" data-act="here">Who's here?</button></div></div>`;
}
function needHere(reason) { if (me()) return Promise.resolve(true); if (!window.GGP) return Promise.resolve(false); return GGP.openDialog({ reason: reason || "Who's here? Choose your picture." }).then(() => !!me()); }

/* ---------- quiet alerts for grown-ups ---------- */
function alertsHtml() {
  const a = me(); if (!a || a.age !== 'adult') return '';
  const list = people().filter(p => p.age !== 'adult' && (p.grown || []).includes(a.id)).map(p => ({ p, s: (p.shared || {}).safety })).filter(x => x.s && x.s.flag && G.seen[x.p.id] !== x.s.flag);
  return list.map(({ p, s }) => `<div class="gv-alert" role="note"><h3>Please check in with ${esc(p.name)}</h3><p>Their check-in on ${esc(nice(s.flag))} asked for a caring conversation. You won't see their answers. Find a quiet moment, ask how they're doing, and listen. If anyone is in danger, call or text 988, or call 911.</p><button class="btn btn-line btn-sm" data-act="seen" data-id="${esc(p.id)}">I checked in with them</button></div>`).join('');
}

/* ---------- Our grove ---------- */
/* The living Today scene (GWG BLD 756): The Grove's own painting, with light from the whole family's
   tending today (parts tended in anyone's tree that shows on The Grove, and practices done together).
   Days with no tending rest in soft mist; it never wilts, droops, or goes bare. Butterflies drift by as
   the day is tended (shared/gg-living.js). The family grove below (shared/grove-scene.js) stays as it is. */
let GV_DONE = 0;
function groveToday() {
  const d = today(), parts = new Set();
  people().forEach(p => treeOf(p).recent.forEach(r => { if (r.d === d) (r.parts || []).forEach(k => parts.add(k)); }));
  Object.keys(G.done[d] || {}).forEach(id => { const pr = TP[id]; if (pr && pr.part) parts.add(pr.part); });
  const anyToday = parts.size > 0 || Object.keys(G.done[d] || {}).length > 0 || !!G.grew[d];
  const done = parts.size || (anyToday ? 1 : 0);
  const before = Object.keys(G.grew).filter(k => k < d).sort();
  let miss = 0;
  if (before.length) { const last = before[before.length - 1]; miss = Math.max(0, between(last, d) - 1); }
  const lvl = miss === 0 ? 0 : miss <= 3 ? 1 : 2, base = [0.55, 0.3, 0.12][lvl];
  const light = Math.min(1, base + done * (1 - base) / 3), hr = new Date().getHours();
  const line = done >= 3 ? 'The grove is in full light today.'
    : done ? (lvl === 2 ? 'The sun is finding the grove again. Welcome back.' : 'The light is coming in. The grove is warming up.')
    : lvl === 0 ? (hr < 12 ? 'Good morning.' : hr < 17 ? 'Good afternoon.' : 'Good evening.') + ' The grove is ready for today.'
    : lvl === 1 ? 'The grove is waiting in the morning mist. One practice brings the sun.'
    : 'The grove has been resting in the mist. Nothing is lost. One practice brings the sun.';
  return { light, line, done, parts: [...parts] };
}
function groveTodayHtml() {
  if (!window.GGLiving) return '';
  const sc = groveToday(); GV_DONE = sc.done;
  return `<div class="card gv-today">${GGLiving.html({ app: 'grove', light: sc.light, label: sc.line })}
    <div class="gv-today-strip"><ul class="gv-marks" aria-label="Parts the family tended today">${PARTS6.map(p => `<li class="${sc.parts.includes(p.key) ? 'on' : ''}" style="--pc:${p.color}"><span aria-hidden="true"></span>${p.name}<b class="sr-only">${sc.parts.includes(p.key) ? ', tended today' : ''}</b></li>`).join('')}</ul>
    <p class="gv-today-line">${esc(sc.line)}</p></div></div>`;
}
function viewGrove() {
  const ps = people(), days = groveDays(), vis = VISITORS.filter(c => days >= c.days).map(c => c.id), next = VISITORS.find(c => days < c.days);
  const scen = SCENES.find(x => x.id === G.scenery && days >= x.days) ? G.scenery : 'forest';
  const trees = ps.slice(0, 8).map(p => { const t = treeOf(p); return { stage: t.willow ? 'willow' : stageFor(p), remembered: t.remembered, g: t.remembered ? 1 : t.show ? Math.min(1, .12 + t.days / 60) : .1, parts: t.remembered ? [] : t.parts, kind: t.willow ? 'grove' : (G.kinds[p.id] || 'grove'), label: p.name }; });
  const fam = famList(), famRoom = Math.max(0, 14 - trees.length), famShown = fam.slice(0, famRoom);
  famShown.forEach(f => trees.push({ stage: FAM_STAGE[f.t] || 'adult', g: Math.min(1, .12 + f.g / 60), parts: famParts(f), kind: 'grove', label: f.n }));
  let h = '';
  if (!G.intro) h += `<div class="banner gv-intro"><h3>Where our trees grow together</h3><p><b>Your tree is yours. The grove is ours.</b> Everyone tends their own tree in their own app: Oak for grown-ups, Birch for young adults, Sequoia for older adults, Pine for high schoolers, Aspen for middle schoolers, Maple for kids. The Grove is where your trees stand side by side. Cheer each other on, do a few things together, and watch the grove grow.</p><div class="tools-row" style="justify-content:flex-start"><button class="btn btn-light btn-sm" data-act="intro">Got it</button></div></div>`;
  h += groveTodayHtml();
  h += `<div class="section-head"><h2>Our Grove</h2><p>${ps.length ? (ps.length === 1 ? 'One tree so far. Add the people you live with, and their trees grow here too.' : 'Every tree in your household, side by side.') : 'No trees yet. Start with your own.'}</p></div>`;
  h += `<div class="gv-scene">${sceneSVG({ w: 1000, h: 470, gy: 330, trees: trees.length ? trees : [{ stage: 'adult', g: .05, parts: [], kind: 'grove' }], sky: skyNow(), scenery: scen, visitors: vis, uid: 'gv', seed: 11, label: 'Your family grove' })}</div>`;
  h += `<p class="gv-grew">${days ? `${days} ${days === 1 ? 'day' : 'days'} of growing together.` : 'The grove grows when anyone tends their tree or the family does a practice together.'}${next ? ` Next visitor: ${esc(next.name)}, at ${next.days} ${next.days === 1 ? 'day' : 'days'}.` : ''}</p>`;
  if (fam.length > famShown.length) h += `<p class="muted">${fam.length - famShown.length} more family ${fam.length - famShown.length === 1 ? 'tree is' : 'trees are'} in the Family Trees list.</p>`;
  if (!ps.length) return h + famHtml() + `<div class="card"><h3>Start with your own tree</h3><p>Make a private Grounded profile, then tend your tree in the app for your age. It grows here too.</p><div class="tools-row" style="justify-content:flex-start"><button class="btn btn-gold btn-sm" data-act="create">Make my profile</button><a class="btn btn-line btn-sm" href="/oak/">Oak</a><a class="btn btn-line btn-sm" href="/birch/">Birch</a><a class="btn btn-line btn-sm" href="/sequoia/">Sequoia</a><a class="btn btn-line btn-sm" href="/pine/">Pine</a><a class="btn btn-line btn-sm" href="/aspen/">Aspen</a><a class="btn btn-line btn-sm" href="/maple/">Maple</a></div></div>` + (days ? togetherHtml(days) : '') + helpCardHtml();
  h += `<div class="gv-people" role="list">${ps.map(p => { const t = treeOf(p); return `<button type="button" role="listitem" class="gv-person${S.sel === p.id ? ' on' : ''}" aria-pressed="${S.sel === p.id}" data-act="sel" data-id="${esc(p.id)}">${window.GGAv ? GGAv.html(p.avatar, p.name, 44) : ''}<b>${esc(p.name)}</b><span>${t.show ? `${t.days} ${t.days === 1 ? 'day' : 'days'} tended` : 'Growing quietly'}</span></button>`; }).join('')}</div>`;
  const sp = S.sel && who(S.sel);
  if (sp) {
    const t = treeOf(sp), tool = t.willow ? { name: 'Willow', href: '/willow/' } : toolOf(sp);
    if (t.remembered) h += `<div class="card gv-detail"><h3>Remembering ${esc(sp.name)}</h3><p>${t.rememberedOn ? 'Died ' + esc(nice(t.rememberedOn)) + '. ' : ''}Their willow stays in the grove, just as it was. Nothing is taken away.</p>${t.rings ? `<dl class="gv-stats"><div><dt>Rings</dt><dd>${t.rings}</dd></div></dl>` : ''}<a class="btn btn-gold btn-sm" href="/willow/#for=${esc(sp.id)}">Open their Willow</a></div>`;
    else h += `<div class="card gv-detail"><h3>${esc(sp.name)}'s tree</h3>`
      + (t.show ? `<dl class="gv-stats"><div><dt>Days Tended</dt><dd>${t.days}</dd></div><div><dt>Rings</dt><dd>${t.rings}</dd></div></dl>`
        + (t.parts.length ? `<p>Tended this week: ${PARTS6.filter(x => t.parts.includes(x.key)).map(x => `<span class="gv-part" style="--pc:${x.color}">${x.name}</span>`).join(' ')}</p>` : '<p class="muted">Resting this week. A tree never dies, and nothing is taken away.</p>')
        : `<p class="muted">${esc(sp.name)} keeps their growth private. Their tree still stands in the grove.</p>`)
      + `<p class="muted">The big picture only. Never answers, levels, or notes.</p><a class="btn btn-gold btn-sm" href="${tool.href}">Go tend your tree in ${tool.name}</a></div>`;
  }
  h += famHtml();
  h += togetherHtml(days);
  const a = me();
  if (a) {
    const mine = who(a.id), md = myDays(mine), gd = days;
    const row = (list, cur, act, n) => `<div class="unlock-row">${list.map(k => { const ok = n >= k.days; return `<button type="button" class="chip${cur === k.id ? ' on' : ''}${ok ? '' : ' is-off'}" ${ok ? `data-act="${act}" data-id="${k.id}"` : 'disabled'} aria-pressed="${cur === k.id}">${esc(k.name)}${ok ? '' : ` (${k.days} ${k.days === 1 ? 'day' : 'days'})`}</button>`; }).join('')}</div>`;
    h += `<div class="card"><h3>Your tree in the grove</h3><p class="muted">Days you tend in ${esc(toolOf(who(a.id) || a).name)} unlock new kinds of trees. Days the family grows together unlock scenery for everyone.</p>
      <label class="lbl">Kind of tree</label>${row(KINDS, G.kinds[a.id] || 'grove', 'kind', md)}
      <label class="lbl">Scenery</label>${row(SCENES, scen, 'scenery', gd)}</div>`;
  }
  return h + helpCardHtml();
}

/* ---------- growing together: group totals and family milestones (GWG BLD 745) ----------
   Decision 3: The Grove's flavor of the game layer. Totals are the whole family's, added
   together, never ranked or split person by person (no leaderboards). They count only what
   already shows here: trees whose "Show my growth" switch is on, Family Trees shared by hand,
   and the practices done together. Milestones are reached once and kept for good in
   G.miles {id: date}. Growth only adds: a quiet week never takes a milestone away. */
const FAM_MILES = [
  ['grow1', 'First Day Growing Together', 'The grove grew for the first time.'],
  ['together1', 'First Practice Together', 'The family did a practice side by side.'],
  ['grow7', 'A Week of Growing Together', 'Seven days of the grove growing.'],
  ['sixparts', 'All Six Parts in One Week', 'Together, the family tended every part of the tree in one week.'],
  ['alltrees', 'Every Tree Tended in One Week', 'Every tree in the grove was tended in the same week.'],
  ['together10', 'Ten Practices Together', 'Ten practices done side by side.'],
  ['ring1', 'A First Ring in the Family', 'A tree in the grove finished a season and added a ring.'],
  ['grow30', 'Thirty Days Growing Together', 'A month of days in the grove.'],
  ['together50', 'Fifty Practices Together', 'Fifty practices done side by side.'],
  ['grow100', 'One Hundred Days Growing Together', 'One hundred days of the grove growing.']
];
function famTotals(days) {
  const w0 = weekStart(today()), w1 = addDays(w0, 6), parts = new Set();
  let weekDays = 0, allDays = 0, rings = 0, shown = 0, tendedWk = 0;
  people().forEach(p => {
    const t = treeOf(p); if (!t.show || t.remembered) return;
    shown++; allDays += t.days; rings += t.rings;
    const wk = t.recent.filter(r => r.d >= w0 && r.d <= w1);
    weekDays += wk.length; if (wk.length) tendedWk++;
    wk.forEach(r => (r.parts || []).forEach(k => parts.add(k)));
  });
  famList().forEach(f => {
    shown++; allDays += f.g || 0;
    if (weekStart(famDate(f.u)) === w0 && f.w) { weekDays += f.w; tendedWk++; famParts(f).forEach(k => parts.add(k)); }
  });
  let together = 0, togetherWk = 0;
  Object.keys(G.done || {}).forEach(d => { const n = Object.keys(G.done[d] || {}).length; together += n; if (d >= w0 && d <= w1) togetherWk += n; });
  return { days, weekDays, allDays, rings, shown, tendedWk, parts: parts.size, together, togetherWk };
}
function famMilesNow(T) {
  const out = {};
  if (T.days >= 1) out.grow1 = 1;
  if (T.days >= 7) out.grow7 = 1;
  if (T.days >= 30) out.grow30 = 1;
  if (T.days >= 100) out.grow100 = 1;
  if (T.together >= 1) out.together1 = 1;
  if (T.together >= 10) out.together10 = 1;
  if (T.together >= 50) out.together50 = 1;
  if (T.parts >= 6) out.sixparts = 1;
  if (T.shown >= 2 && T.tendedWk === T.shown) out.alltrees = 1;
  if (T.rings >= 1) out.ring1 = 1;
  return out;
}
function famMilesCheck(T) {
  if (!G.miles || typeof G.miles !== 'object') G.miles = {};
  const now = famMilesNow(T), fresh = Object.keys(now).filter(id => !G.miles[id]);
  if (!fresh.length) return;
  fresh.forEach(id => { G.miles[id] = today(); }); save();
  const m = FAM_MILES.find(x => x[0] === fresh[fresh.length - 1]);
  if (m) setTimeout(() => toast('New family milestone: ' + m[1] + '.'), 300);
}
const famN = (n, one, many) => `${n} ${n === 1 ? one : many}`;
function togetherHtml(days) {
  const T = famTotals(days); famMilesCheck(T);
  const got = FAM_MILES.filter(m => G.miles && G.miles[m[0]]), ahead = FAM_MILES.filter(m => !(G.miles && G.miles[m[0]]));
  return `<div class="card gv-totals"><h3>Growing Together</h3><p class="muted">The whole family's growth, added together. Never a contest: every day anyone tends counts for all of you.</p>
    <dl class="gv-stats gv-stats-wrap"><div><dt>Days Tended This Week</dt><dd>${T.weekDays}</dd></div><div><dt>Practices Together This Week</dt><dd>${T.togetherWk}</dd></div><div><dt>Parts Tended This Week</dt><dd>${T.parts} of 6</dd></div></dl>
    <dl class="gv-stats gv-stats-wrap"><div><dt>Days Tended in All</dt><dd>${T.allDays}</dd></div><div><dt>Practices Together</dt><dd>${T.together}</dd></div><div><dt>Rings in the Grove</dt><dd>${T.rings}</dd></div></dl>
    <p class="muted">${T.shown ? `Counting ${famN(T.shown, 'tree', 'trees')} whose growth is shown here, and the practices you do together.` : 'Trees count here when their "Show my growth on The Grove" switch is on, and so do the practices you do together.'}</p>
    <h3 class="gv-miles-h">Family Milestones</h3>
    ${got.length ? `<ul class="gv-miles">${got.map(m => `<li><b>${esc(m[1])}</b><span>${esc(nice(G.miles[m[0]]))}</span><small>${esc(m[2])}</small></li>`).join('')}</ul>` : '<p class="muted">Your first family milestone comes with your first day of growing together.</p>'}
    ${ahead.length ? `<p class="muted">Still ahead: ${ahead.map(m => esc(m[1])).join(', ')}.</p>` : '<p class="muted">Every family milestone reached. The grove keeps growing.</p>'}</div>`;
}

/* ---------- help, any time (GWG BLD 745) ---------- */
function helpCardHtml() {
  return `<div class="card gv-help" role="note"><h3>If Someone Needs Help Now</h3><p>If you or someone in your family is thinking about ending their life, or is in crisis, call or text <a class="text-link" href="tel:988">988</a>, any time, day or night.</p><p>If anyone is in danger right now, call <a class="text-link" href="tel:911">911</a>.</p></div>`;
}

/* ---------- The wall ---------- */
function wallItems(w0) {
  const w1 = addDays(w0, 6), out = [];
  G.wall.forEach(x => { if (x.day >= w0 && x.day <= w1) out.push(Object.assign({ kind: 'post' }, x)); });
  people().forEach(p => treeOf(p).recent.forEach(r => { if (r.d >= w0 && r.d <= w1) out.push({ kind: 'growth', id: 'g:' + p.id + ':' + r.d, by: p.id, day: r.d, at: r.d + 'T20:00', parts: r.parts || [] }); }));
  Object.keys(G.done).forEach(d => { if (d >= w0 && d <= w1) Object.keys(G.done[d]).forEach(k => { const x = G.done[d][k]; out.push({ kind: 'practice', id: 'p:' + d + ':' + k, by: x.by, day: d, at: x.at || d + 'T19:00', practice: k }); }); });
  return out.sort((a, b) => String(b.at).localeCompare(String(a.at)));
}
const list3 = a => a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
function reactsHtml(id) {
  const r = G.reacts[id] || {}, a = me(), mine = a && r[a.id];
  const whoBy = REACTS.map(([k, e]) => { const n = Object.keys(r).filter(pid => r[pid] === k).map(nameOf); return n.length ? `<span class="gv-rwho">${e} ${esc(list3(n))}</span>` : ''; }).join('');
  return `<div class="gv-react">${REACTS.map(([k, e, l]) => `<button type="button" class="gv-rbtn" aria-pressed="${mine === k}" aria-label="${l}" title="${l}" data-act="react" data-id="${esc(id)}" data-k="${k}">${e}</button>`).join('')}</div>${whoBy ? `<p class="gv-rline">${whoBy}</p>` : ''}`;
}
function itemHtml(x) {
  const p = who(x.by), a = me(), av = p && window.GGAv ? GGAv.html(p.avatar, p.name, 36) : `<span class="gv-dot">${icon('grove')}</span>`;
  let body = '';
  if (x.kind === 'post') body = `<p class="gv-text">${esc(x.text)}</p>`;
  if (x.kind === 'growth') { const tool = toolOf(p || 'adult'), names = PARTS6.filter(k => (x.parts || []).includes(k.key)).map(k => k.name);
    body = `<p class="gv-text">${esc(nameOf(x.by))} tended their tree${names.length ? ': ' + esc(list3(names)) : ''}.</p><p><a class="text-link" href="${tool.href}">Go tend your tree</a></p>`; }
  if (x.kind === 'practice') { const pr = TP[x.practice]; body = `<p class="gv-text">The family did <b>${esc(pr ? pr.name : 'a practice')}</b> together${p ? ', checked off by ' + esc(p.name) : ''}.</p>`; }
  const canDrop = x.kind === 'post' && a && (a.id === x.by || a.age === 'adult');
  return `<li class="gv-item gv-${x.kind}"><div class="gv-item-head">${x.kind === 'practice' ? `<span class="gv-dot">${icon('heart')}</span>` : av}<div><b>${x.kind === 'practice' ? 'Together' : esc(nameOf(x.by))}</b><small>${esc(nice(x.day))}</small></div>${canDrop ? `<button type="button" class="gv-drop" data-act="drop" data-id="${esc(x.id)}">Remove</button>` : ''}</div>${body}${reactsHtml(x.id)}</li>`;
}
function viewWall() {
  const a = me(), w0 = addDays(weekStart(today()), -7 * S.wk), items = wallItems(w0);
  let h = `<div class="section-head"><h2>The Wall</h2><p>Cheer each other on. Growth from your tree apps shows here when someone's switch is on, along with short posts and the things you do together.</p></div>`;
  if (S.wk === 0) h += a ? `<div class="card gv-compose"><label class="lbl" for="gv-post">Post to the wall as ${esc(a.name)}</label><textarea id="gv-post" maxlength="280" rows="3" placeholder="Proud of you for the walk today."></textarea><div class="tools-row" style="justify-content:space-between"><span class="muted">Posts stay on this device, for your household. A grown-up can remove any post.</span><button class="btn btn-gold btn-sm" data-act="post">Post</button></div></div>`
    : (people().length ? `<div class="card gv-compose"><p>Choose your picture to write a post or react.</p><button class="btn btn-gold btn-sm" data-act="here">Who's here?</button></div>` : '');
  h += `<h3 class="gv-wk">${S.wk === 0 ? 'This week' : S.wk === 1 ? 'Last week' : 'Week of ' + esc(nice(w0))}</h3>`;
  h += items.length ? `<ul class="gv-wall">${items.map(itemHtml).join('')}</ul>` : `<p class="muted">${S.wk === 0 ? 'Nothing here yet this week. Tend your tree, or do something together.' : 'A quiet week.'}</p>`;
  h += `<div class="tools-row gv-fold">${S.wk < 3 ? `<button class="btn btn-line btn-sm" data-act="older">Show ${S.wk === 0 ? 'last week' : 'the week before'}</button>` : ''}${S.wk > 0 ? '<button class="btn btn-line btn-sm" data-act="newer">Back to this week</button>' : ''}</div>`;
  return h + `<p class="muted gv-end">That's the wall. Now go tend your tree.</p>`;
}

/* ---------- Together ---------- */
function weekNo() { return Math.floor(Math.max(0, between(G.start, today())) / 7) % 12; }
function doneToday(id) { return !!(G.done[today()] || {})[id]; }
function practiceCard(pr, featured) {
  const open = S.open === pr.id, done = doneToday(pr.id), part = PARTS6.find(x => x.key === pr.part) || {};
  return `<div class="${featured ? 'card gv-featured' : 'gv-prac'}" style="--pc:${part.color}"><div class="gv-prac-top"><b>${esc(pr.name)}</b><small>${esc(part.name || '')}</small></div><p>${esc(pr.text)}</p>${pr.kid ? `<p class="muted gv-kid">For little ones: ${esc(pr.kid)}</p>` : ''}${G.joinFirst && pr.adapt ? `<p class="gv-join"><b>Everyone can join.</b> ${esc(pr.adapt)}</p>` : ''}
    <div class="gv-acts"><button type="button" class="btn ${done ? 'btn-line' : 'btn-gold'} btn-sm" aria-pressed="${done}" data-act="did" data-id="${pr.id}">${done ? 'Done today. Undo' : 'We did this today'}</button><button type="button" class="text-btn" aria-expanded="${open}" data-act="how" data-id="${pr.id}">${open ? 'Hide how' : 'Show me how'}</button></div>
    ${open ? `<ol class="gv-steps">${String(pr.steps || '').split('|').filter(Boolean).map(s => `<li>${esc(s)}</li>`).join('')}</ol>` : ''}</div>`;
}
/* Show Ways Everyone Can Join First (GWG BLD 756): a family setting, kept with the grove on this device. It holds
   no one's health information. When it is on, practices with a seated or gentle way (grove/together.js life tags)
   come first, with their way for everyone to join. Nothing is hidden. */
const joinFits = x => !!(x.adapt || (x.life || []).includes('gentle'));
function joinOrder(list) { return G.joinFirst ? list.filter(joinFits).concat(list.filter(x => !joinFits(x))) : list; }
function viewTogether() {
  const w = weekNo(), feat = TP[T.featured[w]];
  let h = `<div class="section-head"><h2>Together</h2><p>Things your family does side by side. Each one grows the grove. Suggestions only: do one, do several, or skip a week.</p></div>`;
  if (feat) h += `<p class="gv-kicker">This week's theme: ${esc(T.themes[w] || '')}</p>` + practiceCard(feat, true);
  h += `<div class="gv-chips"><button type="button" class="chip${!S.part ? ' on' : ''}" aria-pressed="${!S.part}" data-act="part" data-id="">All parts</button>${PARTS6.map(p => `<button type="button" class="chip${S.part === p.key ? ' on' : ''}" aria-pressed="${S.part === p.key}" data-act="part" data-id="${p.key}">${p.name}</button>`).join('')}</div>`;
  h += `<div class="gv-joinrow"><button type="button" class="gv-switch" role="switch" aria-checked="${!!G.joinFirst}" data-act="joinfirst"><span class="gv-track" aria-hidden="true"></span><span><b>Show Ways Everyone Can Join First</b><small>${G.joinFirst ? 'On. Seated and gentle ways come first, with a way for everyone to join.' : 'Off. Turn it on to put seated and gentle ways first.'}</small></span></button></div>`;
  PARTS6.filter(p => !S.part || S.part === p.key).forEach(p => {
    const list = joinOrder(T.practices.filter(x => x.part === p.key)); if (!list.length) return;
    h += `<section class="gv-partsec" style="--pc:${p.color}"><h3>${icon(p.key)}${p.name} <small>${p.sub}</small></h3>${list.map(x => practiceCard(x, false)).join('')}</section>`;
  });
  return h;
}

/* ---------- Earlier ---------- */
function oldDevice() { try { const o = JSON.parse(localStorage.getItem(OLD) || 'null'); const g = o && o.self; return g && (g.start || Object.keys(g.watered || {}).length) ? g : null; } catch (e) { return null; } }
function myOldGrove() { const a = me(); if (!a || !window.GGP || !GGP.isOpen(a.id)) return null; const d = GGP.data(a.id); const g = d && d.grove && d.grove.self; return g && (g.start || Object.keys(g.watered || {}).length) ? g : null; }
function hasEarlier() { return !!(oldDevice() || myOldGrove()); }
function viewEarlier() {
  let h = `<div class="section-head"><h2>Earlier</h2><p>Personal tending used to happen in The Grove. Now your tree is yours, in your own app.</p></div>`;
  const a = me(), mine = myOldGrove();
  if (mine) { const tool = toolOf(who(a.id) || a), n = Object.keys(mine.watered || {}).length;
    h += `<div class="card"><h3>${esc(a.name)}, your earlier tending is ready to move</h3><p>${n} ${n === 1 ? 'day' : 'days'} tended in The Grove, plus any reflections you wrote. Open your tree in ${tool.name} and it moves there on its own, private to you, under "Earlier, from The Grove."</p><a class="btn btn-gold btn-sm" href="${tool.href}">Open my tree in ${tool.name}</a></div>`; }
  const od = oldDevice();
  if (od) { const days = Object.keys(od.watered || {}).sort(), notes = Object.keys(od.journal || {}).filter(k => String(od.journal[k] || '').trim());
    h += `<div class="card"><h3>Earlier, from this device</h3><p class="muted">Tending saved on this device before Grounded profiles. Read only.</p><dl class="gv-stats"><div><dt>Days Tended</dt><dd>${days.length}</dd></div>${notes.length ? `<div><dt>Reflections</dt><dd>${notes.length}</dd></div>` : ''}</dl>${days.length ? `<p class="muted">From ${esc(nice(days[0]))} to ${esc(nice(days[days.length - 1]))}.</p>` : ''}
      ${notes.length ? `<button class="btn btn-line btn-sm" data-act="oldnotes" aria-expanded="${S.open === 'oldnotes'}">${S.open === 'oldnotes' ? 'Hide reflections' : 'Read reflections'}</button>${S.open === 'oldnotes' ? notes.map(k => `<div class="gv-note"><b>Week ${esc(k)}</b><p>${esc(od.journal[k])}</p></div>`).join('') : ''}` : ''}
      <p class="muted">To keep it with you, make a profile and open your tree app.</p></div>`; }
  return h;
}

/* ---------- How it works ---------- */
function viewHow() {
  return `<div class="section-head"><h2>How The Grove works</h2><p>Where our trees grow together.</p></div>
  <div class="card gv-how">
    <h3>Your tree is yours. The grove is ours.</h3>
    <p>Everyone tends their own tree in their own app: <a class="text-link" href="/oak/">Oak</a> for grown-ups, <a class="text-link" href="/birch/">Birch</a> for young adults, <a class="text-link" href="/sequoia/">Sequoia</a> for older adults, <a class="text-link" href="/pine/">Pine</a> for high schoolers, <a class="text-link" href="/aspen/">Aspen</a> for middle schoolers, and <a class="text-link" href="/maple/">Maple</a> for kids. Check-ins, daily practices, and journals all live there, private to each person.</p>
    <p>The Grove is the family's shared ground. Every tree in your household stands here side by side, shaped by its life stage.</p>
    <h3>What grows the grove</h3>
    <p>Two things: each person tending their own tree, and the practices you do together. Critters visit and scenery unlocks as the days add up. Growth only adds. A quiet week never takes anything away.</p>
    <h3>Growing Together</h3>
    <p>The Growing Together card adds up the whole family's growth: days tended, practices done together, parts tended this week, and rings. It is never a contest, and no one is ranked. Family milestones, like your first practice together or a week when every tree was tended, are reached once and kept for good.</p>
    <h3>The Wall</h3>
    <p>Short posts and reactions, so you can cheer each other on. When someone tends their tree with their switch on, a small note appears. Reactions show who reacted, not running totals. There's no endless feed: you see this week, and older weeks fold away.</p>
    <h3>What stays private</h3>
    <p>The Grove never sees anyone's answers, levels, notes, or journal. It sees names, pictures, and, only if someone's "Show my growth on The Grove" switch is on, the big picture: days tended, rings, and which parts they tended. Anyone can turn that switch off in their tree app's settings, kids included.</p>
    <p>For kids and teens, the grown-ups who agreed for them get a quiet alert here if a check-in asks for a caring conversation. Never the answers.</p>
    <p>Everything stays on this device. Nothing is sent anywhere.</p>
    <h3>Share to Family</h3>
    <p>Family on other phones can still grow side by side. Each person opens their own tree app and taps Share to Family, then sends the link or QR code. Open it here, and their tree stands in your grove. A shared tree is a snapshot: it updates when they share again, any time they like.</p>
    <h3>Keeping it safe</h3>
    <p>One backup file holds The Grove, every profile on this device (each still locked), and settings. Load it on another device to bring everything back, or to combine two devices.</p>
    <div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="GGBackupGo('make')">Back up everything</button><button type="button" class="btn btn-secondary btn-sm" onclick="GGBackupGo('pick')">Load a backup</button></div>
    <h3>Coming later</h3>
    <p>Groves that stay in step across phones on their own, and groves for classrooms and churches, after careful review.</p>
  </div>`;
}

/* ---------- Practice library (deep links from the site-wide search) ---------- */
function libItemHtml(it) {
  const L = window.GGLibrary, v = L.view(it, 'oak'), open = S.open === it.key;
  return `<li class="gv-prac" style="--pc:${(PARTS6.find(p => p.key === it.part) || {}).color}"><div class="gv-prac-top"><b>${esc(v.name)}</b><small>${esc(PNAME[it.part] || '')}</small></div><p>${esc(v.text)}</p><button type="button" class="text-btn" data-act="libhow" data-id="${esc(it.key)}" aria-expanded="${open}">${open ? 'Hide how' : 'Show me how'}</button>${open ? `<div class="gv-steps">${L.guideHtml(v)}</div>` : ''}</li>`;
}
function viewLibrary() {
  const L = window.GGLibrary, q = S.lib.q;
  let h = `<div class="section-head"><h2>Practice Library</h2><p>Every Grounded practice, with how to do it. To add one to your own practices, open your tree app and tap Find more practices. Searching here also finds When Life Changes guides, books, and more.</p></div>
    <label class="lbl" for="gv-libq">Search</label><input id="gv-libq" class="gv-input" type="search" value="${esc(q)}" placeholder="Try sleep, calm, friends, or grief" enterkeyhint="search">
    <div id="gv-libres"></div>`;
  if (!L) return h;
  if (!window.GGFind) {   // without the shared search engine, the library's own search still works
    const list = (q ? L.search(q) : []).slice(0, 40);
    h += list.length ? `<ul class="gv-libl">${list.map(libItemHtml).join('')}</ul>` : `<p class="muted">${q ? 'Nothing found. Try a simpler word.' : 'Type a word to search.'}</p>`;
  } else if (!q) h += '<p class="muted" id="gv-libhint">Type a word to search.</p>';
  return h + `<p><button class="btn btn-line btn-sm" data-tab="grove">Back to our grove</button></p>`;
}
/* Search: the same engine as the header search. Practices first, then the rest of Grow With Grounded. */
function libFind() {
  const i = $('#gv-libq'); if (!i || !window.GGFind || !window.GGLibrary) return;
  const hint = $('#gv-libhint'); if (hint) hint.hidden = !!i.value.trim();
  GGLibrary.ready().then(() => GGFind(i, { here: 'grove', localType: 'practice', localLabel: 'Practices', localNone: 'No practices',
    localKeep: x => !!GGLibrary.get(x.key),
    localHTML: items => `<ul class="gv-libl">${items.slice(0, 40).map(x => libItemHtml(GGLibrary.get(x.key))).join('')}</ul>`,
    after: '#gv-libres', accent: 'var(--accent)' }));
}

/* ---------- actions ---------- */
function react(id, k) {
  needHere('Choose your picture to react.').then(ok => { if (!ok) return; const a = me(); const r = G.reacts[id] || (G.reacts[id] = {});
    if (r[a.id] === k) delete r[a.id]; else r[a.id] = k; save(); render(); });
}
function post() {
  const a = me(), t = $('#gv-post'); if (!a || !t) return; const text = t.value.trim().slice(0, 280);
  if (!text) { toast('Write something first.'); return; }
  G.wall.push({ id: uid(), by: a.id, text, day: today(), at: new Date().toISOString() }); save(); render(); toast('Posted to the wall.');
}
function drop(id) {
  const a = me(), x = G.wall.find(p => p.id === id); if (!a || !x || !(a.id === x.by || a.age === 'adult')) return;
  if (!confirm('Remove this post from the wall?')) return;
  G.wall = G.wall.filter(p => p.id !== id); delete G.reacts[id]; G.gone = G.gone || {}; G.gone[id] = Date.now(); save(); render();
}
function did(id) {
  const d = today(), day = G.done[d] || (G.done[d] = {});
  if (day[id]) { delete day[id]; if (!Object.keys(day).length) delete G.done[d]; save(); render(); return; }
  const a = me(); day[id] = { by: a ? a.id : null, at: new Date().toISOString() }; G.grew[d] = 1; save(); render(); if (window.GGLiving) GGLiving.burst(2); toast('Nice work. The grove grew today.');
}
document.addEventListener('click', e => {
  const t = e.target.closest('[data-tab]');
  if (t && (t.closest('#tabs') || t.closest('#view') || t.closest('.gg-hero'))) { e.preventDefault(); if (t.dataset.tab === 'learn') { if (window.GGLearn) GGLearn.open('grove'); return; } const k = t.dataset.tab === 'guide' ? 'how' : t.dataset.tab; S.tab = k; S.open = ''; render(); if (t.closest('.gg-hero')) $('#app').scrollIntoView({ behavior: 'smooth' }); return; }
  const b = e.target.closest('[data-act]'); if (!b || !b.closest('#view')) return;
  const id = b.dataset.id, act = b.dataset.act;
  if (act === 'here' || act === 'switch') { if (window.GGP) GGP.openDialog({ reason: "Who's here? Choose your picture." }).then(render); }
  else if (act === 'lock') { if (window.GGP) GGP.lock().then(render); }
  else if (act === 'create') { if (window.GGP) GGP.createDialog({}).then(render); }
  else if (act === 'intro') { G.intro = true; save(); render(); }
  else if (act === 'sel') { S.sel = S.sel === id ? null : id; render(); }
  else if (act === 'kind') { const a = me(); if (a) { G.kinds[a.id] = id; save(); render(); } }
  else if (act === 'scenery') { G.scenery = id; save(); render(); }
  else if (act === 'react') react(id, b.dataset.k);
  else if (act === 'post') post();
  else if (act === 'drop') drop(id);
  else if (act === 'older') { S.wk = Math.min(3, S.wk + 1); render(); }
  else if (act === 'newer') { S.wk = 0; render(); }
  else if (act === 'did') did(id);
  else if (act === 'how' || act === 'libhow') { S.open = S.open === id ? '' : id; render(); }
  else if (act === 'part') { S.part = id; render(); }
  else if (act === 'joinfirst') { G.joinFirst = !G.joinFirst; save(); render(); const b = document.querySelector('[data-act="joinfirst"]'); if (b) b.focus(); toast(G.joinFirst ? 'Ways everyone can join come first.' : 'Back to the usual order.'); }
  else if (act === 'oldnotes') { S.open = S.open === 'oldnotes' ? '' : 'oldnotes'; render(); }
  else if (act === 'famdrop') famDrop(id);
  else if (act === 'seen') { const p = who(id), s = p && (p.shared || {}).safety; if (s) { G.seen[id] = s.flag; save(); render(); } }
});
document.addEventListener('input', e => { if (e.target.id !== 'gv-libq') return; S.lib.q = e.target.value;
  if (window.GGFind && window.GGLibrary) { libFind(); return; }
  const pos = e.target.selectionStart; render(); const f = $('#gv-libq'); if (f) { f.focus(); try { f.setSelectionRange(pos, pos); } catch (x) {} } });

/* ---------- boot ---------- */
function setScale() { document.documentElement.style.setProperty('--scale', G.scale); const b = $('#size-btn'); if (b) { b.textContent = G.scale > 1.2 ? 'A' : 'A+'; b.setAttribute('aria-label', 'Text size, now ' + (G.scale === 1 ? 'normal' : G.scale < 1.2 ? 'larger' : 'largest')); } }
function fromHash() {
  const h = decodeURIComponent(location.hash || '');
  if (/^#library(=|$)/.test(h)) { S.tab = 'library'; S.lib.q = h.startsWith('#library=') ? h.slice(9) : ''; S.open = ''; if (window.GGLibrary) GGLibrary.ready().then(render); render(); const a = $('#app'); if (a) a.scrollIntoView(); }
  else if (/^#(wall|together|how|earlier|grove)$/.test(h)) { S.tab = h.slice(1); render(); }
}
load();
$('#year').textContent = new Date().getFullYear();
$('#size-btn').addEventListener('click', () => { G.scale = G.scale === 1 ? 1.12 : G.scale < 1.2 ? 1.25 : 1; setScale(); save(); });
$('#menu-btn').addEventListener('click', () => { const open = $('#site-menu').classList.toggle('open'); $('#menu-btn').setAttribute('aria-expanded', open); });
$('#hero-cta').addEventListener('click', () => { S.tab = 'grove'; render(); $('#app').scrollIntoView({ behavior: 'smooth' }); });
setScale(); render(); fromHash();
window.addEventListener('hashchange', fromHash);
window.addEventListener('gg-fam', famIntake);
famIntake();
if (window.GGP) { GGP.on(() => render()); GGP.ready.then(() => { render(); fromHash(); }); }
})();
