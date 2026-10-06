// =====================================================================
// GROUNDED FIELD GUIDE (TM): the Service Builder, the Ceremonies tab (GWG BLD 747, CER 1).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// A Staff and Founder tab. A few setup questions, then the big checklist filled
// live with the family or the couple, then the editor to dial it in later, and
// four printouts: Officiant's Script, Order of Service, Program, Family Copy.
// Funeral types draft an obituary; wedding types keep the license checklist;
// blessings (home, child, bedside) add a Keepsake Copy of the blessing.
// Data: the Staff library's ceremonies key (LIB.ceremonies), with a small
// built-in fallback so the tab works before that library update is applied.
// Saved services live in DATA.cer.services: encrypted with the rest of this
// device's records and carried in backups (merged by GGCer.merge). Nothing is sent.
// =====================================================================
(function(){
'use strict';

// ---------- the built-in fallback (two types, a few parts, one reading) ----------
const FB = {
  version: 0,
  types: [
    {id: 'funeral', name: 'Funeral', family: 'funeral', lead: 'A service of remembrance and thanksgiving for a life.'},
    {id: 'wedding', name: 'Wedding', family: 'wedding', lead: 'A ceremony of promises, with the people who love the couple.'}
  ],
  setup: {
    faiths: [{id: 'christian', name: 'Christian'}, {id: 'spiritual', name: 'Spiritual, Not Religious'}, {id: 'none', name: 'No Faith Tradition'}, {id: 'mixed', name: 'Mixed Family'}],
    tones: [{id: 'worship', name: 'Worship Service'}, {id: 'celebration', name: 'Celebration'}, {id: 'between', name: 'In-Between'}],
    ages: [{id: 'child', name: 'Child'}, {id: 'young', name: 'Young Adult'}, {id: 'adult', name: 'Adult'}, {id: 'older', name: 'Older Adult'}],
    lengths: [20, 30, 45, 60],
    settings: [{id: 'funeral-home', name: 'Funeral Home'}, {id: 'church', name: 'Church'}, {id: 'graveside', name: 'Graveside'}, {id: 'home', name: 'Home'}, {id: 'outdoors', name: 'Outdoors'}, {id: 'venue', name: 'Venue'}],
    honors: [{id: 'military', name: 'Military Honors', family: 'funeral'}],
    speakers: [{id: 'officiant', name: 'Officiant'}, {id: 'family', name: 'Family Member'}, {id: 'friend', name: 'Friend'}]
  },
  groups: [
    {id: 'gathering', name: 'Gathering', family: 'funeral'}, {id: 'words', name: 'Words and Readings', family: 'funeral'},
    {id: 'life', name: 'The Life', family: 'funeral'}, {id: 'sending', name: 'Sending Forth', family: 'funeral'},
    {id: 'w-gathering', name: 'Gathering', family: 'wedding'}, {id: 'w-vows', name: 'Vows', family: 'wedding'}, {id: 'w-sending', name: 'Sending Forth', family: 'wedding'}
  ],
  parts: [
    {id: 'welcome', group: 'gathering', name: 'Welcome', types: ['funeral'], on: true, mins: 3, prompt: 'Who will greet people as they arrive? Any words the family wants said first?', say: 'Welcome. We gather today to remember {Name}, to give thanks for {their} life, and to hold one another close.'},
    {id: 'reading', group: 'words', name: 'Reading', types: ['funeral'], on: true, mins: 3, prompt: 'Is there a reading {First} loved, or one the family wants?', say: '', readings: true},
    {id: 'life-story', group: 'life', name: 'The Life Story', types: ['funeral'], on: true, mins: 10, prompt: 'Tell me about {First}. What would {they} want people to remember?', say: 'I have only a few words to hold a whole life. Here is some of what the family shared about {First}.'},
    {id: 'blessing', group: 'sending', name: 'Closing Blessing', types: ['funeral'], on: true, mins: 2, prompt: 'Would the family like a prayer or a blessing to close?', say: '', options: [
      {id: 'peace', name: 'Go in Peace', say: 'Go now in peace. Carry {First} with you in the love you shared, and hold one another close in the days ahead.'},
      {id: 'prayer', name: 'A Closing Prayer', say: 'Gracious God, we give thanks for the life of {Name}. Hold this family in your peace, today and in the days to come. Amen.'}
    ]},
    {id: 'w-welcome', group: 'w-gathering', name: 'Welcome', types: ['wedding'], on: true, mins: 3, prompt: 'How did the two of you meet? What do you want your guests to feel?', say: 'Welcome. We are here to celebrate {Partner1} and {Partner2}, and the promises they make today.'},
    {id: 'w-vows', group: 'w-vows', name: 'Vows', types: ['wedding'], on: true, mins: 4, prompt: 'Will you write your own vows, or repeat after me?', say: '', options: [
      {id: 'repeat', name: 'Repeat After Me', say: 'I, {Partner1Full}, take you, {Partner2Full}, to be my partner in marriage, to have and to hold from this day forward, for better, for worse, in sickness and in health, to love and to cherish, all the days of my life.'},
      {id: 'own', name: 'Their Own Vows', say: '{Partner1} and {Partner2} have written their own vows to share with each other now.'}
    ]},
    {id: 'w-pronounce', group: 'w-sending', name: 'Pronouncement', types: ['wedding'], on: true, mins: 1, prompt: 'How would you like to be introduced?', say: 'By the promises you have made today, I now pronounce you married.'}
  ],
  templates: [],
  readings: [
    {id: 'psalm-23', title: 'Psalm 23', kind: 'scripture', ref: 'Psalm 23:1-6', versions: {kjv: 'The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul: he leadeth me in the paths of righteousness for his name\'s sake. Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me. Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over. Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.'}, source: 'The Bible, King James Version (public domain)', tags: {types: ['funeral'], faith: ['christian'], tone: ['worship', 'between'], for: 'funeral'}}
  ],
  bible: {default: 'kjv', versions: [{id: 'kjv', name: 'King James Version', short: 'KJV', notice: ''}]},
  obituary: {
    questions: [
      {id: 'name', ask: 'Full name, with any nickname', hint: 'Mary "Mae" Jones'},
      {id: 'age', ask: 'Age', hint: '84'},
      {id: 'town', ask: 'Hometown or city', hint: 'Duluth'},
      {id: 'died', ask: 'Date of death', hint: 'October 1, 2026'},
      {id: 'life', ask: 'A few things about their life', hint: 'Work, love, what they made, what they gave', from: ['life']},
      {id: 'family', ask: 'Family who survive them, and those who went before', hint: 'Names only'},
      {id: 'service', ask: 'The service: day, time, and place', hint: ''}
    ],
    shapes: [
      {id: 'notice', name: 'Death Notice', words: 80, outline: ['{name}, {age}, of {town}, died {died}.', '{service}']},
      {id: 'newspaper', name: 'Newspaper Obituary', words: 200, outline: [['{name}, {age}, of {town}, died {died}.'], ['{life}'], ['{First} is survived by {family}.'], ['{service}']]},
      {id: 'online', name: 'Online Obituary', words: 500, outline: [['{name}, {age}, of {town}, died {died}.'], ['{life}'], ['{First} is survived by {family}.'], ['{service}']]}
    ],
    tips: ['Leave out the home address.', 'Leave out the full birth date and the mother\'s maiden name.', 'Ask someone to stay at the home during the service.']
  },
  wedding: {license: []},
  tokens: [['{Name}', 'full name'], ['{First}', 'first name'], ['{they}', 'he, she, or they'], ['{them}', 'him, her, or them'], ['{their}', 'his, her, or their'], ['{Partner1}', 'first partner\'s first name'], ['{Partner2}', 'second partner\'s first name']]
};

const STATUS = [['session', 'In Session'], ['draft', 'Draft'], ['final', 'Final']];
const KINDS = [['all', 'All'], ['scripture', 'Scripture'], ['poem', 'Poem'], ['prayer', 'Prayer'], ['blessing', 'Blessing'], ['reading', 'Reading']];
const PRON = {
  he: {they: 'he', them: 'him', their: 'his', theirs: 'his', themself: 'himself', themselves: 'himself', is: 'is', was: 'was', has: 'has', are: 'is', were: 'was', have: 'has'},
  she: {they: 'she', them: 'her', their: 'her', theirs: 'hers', themself: 'herself', themselves: 'herself', is: 'is', was: 'was', has: 'has', are: 'is', were: 'was', have: 'has'},
  they: {they: 'they', them: 'them', their: 'their', theirs: 'theirs', themself: 'themself', themselves: 'themselves', is: 'are', was: 'were', has: 'have', are: 'are', were: 'were', have: 'have'}
};

let CTX = {lib: null, data: null, save: () => {}};
const S = {view: 'home', id: null, draft: null, pick: null, pq: '', pk: 'all', pall: false, pmore: 0, startType: null, dragK: null, printOpen: false};

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const arr = x => Array.isArray(x) ? x : (x == null || x === '' ? [] : [x]);
const nice = d => { const m = /^(\d{4})-(\d\d)-(\d\d)/.exec(d || ''); if (!m) return d || ''; return new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}); };
const words = t => (String(t || '').trim().match(/\S+/g) || []).length;
function toast(t){ const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 2200); }
async function copyText(t){
  API.lastCopy = t;
  try { await navigator.clipboard.writeText(t); }
  catch (e){ const a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (x){} a.remove(); }
  toast('Copied.');
}

// ---------- the library (LIB.ceremonies, filled in from the fallback where a piece is missing) ----------
let CC = null, CCsrc = null;
function cer(){
  const L = (CTX.lib && CTX.lib.ceremonies) || null;
  if (CC && CCsrc === L) return CC;
  const has = L && Array.isArray(L.types) && L.types.length && Array.isArray(L.parts) && L.parts.length;
  const B = has ? L : FB;
  const pick = (k, d) => (L && L[k] && (Array.isArray(L[k]) ? L[k].length : Object.keys(L[k]).length)) ? L[k] : d;
  CC = {
    full: !!has,
    types: B.types, groups: B.groups || [], parts: B.parts, templates: Array.isArray(B.templates) ? B.templates : [],
    setup: Object.assign({}, FB.setup, (has && L.setup) || {}),
    readings: pick('readings', FB.readings).filter(r => r && r.id),
    bible: pick('bible', FB.bible),
    obituary: Object.assign({}, FB.obituary, pick('obituary', {})),
    wedding: Object.assign({license: []}, pick('wedding', {})),
    tokens: pick('tokens', FB.tokens)
  };
  CCsrc = L;
  return CC;
}
const typeOf = id => cer().types.find(t => t.id === id) || cer().types[0];
const famOf = id => (typeOf(id) || {}).family || 'funeral';
// Whom Setup asks about: a person (funerals, bedside), a child, a household (home), or a couple (weddings).
const whoOf = id => (typeOf(id) || {}).who || (famOf(id) === 'wedding' ? 'couple' : 'person');
const optName = (list, id) => ((list || []).find(x => String(x.id) === String(id)) || {}).name || '';
const groupsFor = fam => cer().groups.filter(g => !g.family || g.family === fam || g.family === 'both');
function partsFor(type){
  const fam = famOf(type), gids = groupsFor(fam).map(g => g.id);
  return cer().parts.filter(p => p && p.id && (Array.isArray(p.types) && p.types.length ? p.types.includes(type) : gids.includes(p.group)));
}
const PART = id => cer().parts.find(p => p.id === id);
function partOf(e){
  if (e.custom) return {id: 'custom', name: e.custom.name || 'My Own Part', group: e.custom.group, mins: 3, say: '', prompt: ''};
  return PART(e.part) || {id: e.part, name: e.title || e.part, group: '', mins: 2, say: '', prompt: ''};
}

// ---------- faith and the default-on rules ----------
function faithMatch(tag, f){
  tag = String(tag || '').toLowerCase(); f = String(f || '').toLowerCase();
  if (!tag || !f) return false;
  if (tag === 'any' || tag === 'all' || tag === f) return true;
  if (f.startsWith(tag + '-') || tag.startsWith(f + '-')) return true;
  const fo = (cer().setup.faiths || []).find(x => String(x.id).toLowerCase() === f);
  return !!(fo && [fo.group, fo.family, fo.kind].some(g => g && String(g).toLowerCase() === tag));
}
function ruleOn(r, s){
  if (r === true || r === 'always') return true;
  if (!r || typeof r !== 'object') return false;
  if (Array.isArray(r)) return r.some(x => ruleOn(x, s));
  const st = Object.assign({type: s.type, family: famOf(s.type)}, s.setup || {});
  return Object.keys(r).every(k => {
    const v = r[k];
    if (k === 'any') return arr(v).some(x => ruleOn(x, s));
    if (k === 'all') return arr(v).every(x => ruleOn(x, s));
    if (k === 'not') return !ruleOn(v, s);
    if (k === 'minLength') return +st.length >= +v;
    if (k === 'maxLength') return +st.length > 0 && +st.length <= +v;
    const want = arr(v).map(String), have = arr(st[k]).map(String);
    if (k === 'faith') return have.some(h => want.some(w => faithMatch(w, h)));
    return have.some(h => want.includes(h));
  });
}

// ---------- services ----------
function D(){ return CTX.data || {}; }
function list(){ const d = D(); d.cer = d.cer || {services: []}; d.cer.services = d.cer.services || []; return d.cer.services; }
const cur = () => S.draft || list().find(x => x.id === S.id) || null;
function keep(s){ if (!s) return; s.u = Date.now(); if (!S.draft || s !== S.draft) CTX.save(); }
function newSvc(type){
  const C = cer(), lens = (C.setup.lengths || [30]).map(Number);
  return {id: uid(), u: Date.now(), made: Date.now(), type, status: 'session', who: {pron: 'they'}, p1: {}, p2: {}, date: '', time: '', place: '',
    setup: {faith: '', tone: '', age: '', length: lens.includes(30) ? 30 : lens[0], setting: '', honors: [], speakers: []},
    template: '', parts: [], bible: (C.bible && C.bible.default) || 'kjv', obit: {a: {}, d: {}}, lic: {}, prog: {obit: true}};
}
function names(s){
  const nm = s.who || {}, fam = famOf(s.type);
  const first = o => (o.first || String(o.name || '').trim().split(/\s+/)[0] || '').trim();
  const last = o => { const p = String(o.name || '').trim().split(/\s+/); return p.length > 1 ? p[p.length - 1] : ''; };
  const pr = PRON[nm.pron] || PRON.they;
  const v = Object.assign({}, pr, {
    Name: nm.name || '', First: first(nm), Last: last(nm), Born: nm.born || '', Died: nm.died || '',
    Partner1: first(s.p1 || {}), Partner2: first(s.p2 || {}), Partner1Full: (s.p1 || {}).name || '', Partner2Full: (s.p2 || {}).name || '',
    Date: nice(s.date), Time: s.time || '', Place: s.place || '', Officiant: (D().settings || {}).name || ''
  });
  if (fam === 'wedding'){ v.Couple = [v.Partner1, v.Partner2].filter(Boolean).join(' and '); }
  if (whoOf(s.type) === 'home') v.First = v.Name;
  return v;
}
function title(s){
  if (!s) return '';
  if (s.title) return s.title;
  const t = typeOf(s.type) || {name: 'Service'};
  if (famOf(s.type) === 'wedding'){ const n = [(s.p1 || {}).name, (s.p2 || {}).name].filter(Boolean).join(' and '); return n ? t.name + ': ' + n : t.name; }
  return (s.who || {}).name ? t.name + ' for ' + s.who.name : t.name;
}
const BLANK = {Name: '[Name]', First: '[Name]', Partner1: '[Partner 1]', Partner2: '[Partner 2]', Partner1Full: '[Partner 1]', Partner2Full: '[Partner 2]', Couple: '[the couple]', Date: '[date]', Place: '[place]', Officiant: '[officiant]'};
// Fills {Tokens}. A capitalized pronoun token ({They}) capitalizes its word. extra holds question answers for obituaries.
function fill(t, s, extra){
  const v = names(s);
  return String(t || '').replace(/\{([A-Za-z][A-Za-z0-9]*)\}/g, (m, k) => {
    if (extra && Object.prototype.hasOwnProperty.call(extra, k)) return extra[k] || '';
    if (Object.prototype.hasOwnProperty.call(v, k)) return v[k] || BLANK[k] || '';
    const lo = k.charAt(0).toLowerCase() + k.slice(1);
    if (lo !== k && Object.prototype.hasOwnProperty.call(PRON.they, lo)){ const w = v[lo] || ''; return w.charAt(0).toUpperCase() + w.slice(1); }
    return m;
  });
}
// The words of one part: the edited words if changed in the Editor (names kept current), else the library words filled.
function baseSay(e){
  const p = partOf(e), o = (p.options || []).find(x => x.id === e.option);
  return o && o.say ? o.say : (p.say || '');
}
function partWords(e, s){
  if (e.text == null) return fill(baseSay(e), s);
  let t = e.text; const now = names(s), was = e.tn || {};
  Object.keys(was).filter(k => was[k] && String(was[k]).length > 1 && now[k] && was[k] !== now[k]).sort((a, b) => String(was[b]).length - String(was[a]).length)
    .forEach(k => { t = t.split(was[k]).join(now[k]); });
  return t;
}
// Words in [square brackets] are the officiant's choices, filled in before printing.
const BRX = /\[[^\]\n]{1,120}\]/g;
const brackets = t => String(t || '').match(BRX) || [];
const markBr = t => esc(t).replace(BRX, m => `<mark class="cer-br">${m}</mark>`);
function bracketNote(t){ const b = [...new Set(brackets(t))]; return b.length ? `<p class="cer-brn">To fill in before printing: ${b.map(x => `<mark class="cer-br">${esc(x)}</mark>`).join(' ')}</p>` : ''; }
// Directions for the officiant (part.do and option.do): never spoken, never on the program or the family copy.
const doOf = (e, s) => { const p = partOf(e), o = optOf(e); return [p.do, o && o.do].filter(Boolean).map(x => fill(x, s)); };
const NAMEKEYS = ['Name', 'First', 'Partner1', 'Partner2', 'Partner1Full', 'Partner2Full'];
const snap = s => { const v = names(s), o = {}; NAMEKEYS.forEach(k => { if (v[k]) o[k] = v[k]; }); return o; };
const optOf = e => (partOf(e).options || []).find(x => x.id === e.option) || null;
function minsOf(e){
  if (e.mins != null && e.mins !== '') return +e.mins || 0;
  const p = partOf(e), m = p.mins != null ? +p.mins : 2;
  return p.readings ? m + Math.max(0, (e.rd || []).length - 1) * 2 : m;
}
const onParts = s => (s.parts || []).filter(e => e.on);
const total = s => onParts(s).reduce((a, e) => a + minsOf(e), 0);

// The default option: the first whose fit rule matches this setup, or the first with no rule.
function fitOpt(p, s){ const os = p.options || []; const o = os.find(x => x.fit && s && ruleOn(x.fit, s)) || os.find(x => !x.fit) || os[0]; return o ? o.id : null; }
function mkEntry(p, on, option, s){
  const e = {k: uid(), part: p.id, on: !!on, option: option || null, note: '', rd: []};
  if (on && !e.option && !p.say && (p.options || []).length) e.option = fitOpt(p, s);
  return e;
}
// A template's reading hint ("Psalm 23") matched to a reading by its reference or title.
function hintReading(h){
  const n = x => String(x || '').toLowerCase().replace(/[^a-z0-9:]+/g, ' ').trim(), q = n(h); if (!q) return null;
  const L = cer().readings;
  return L.find(r => n(r.ref) === q || n(r.title) === q) || L.find(r => n(r.ref).startsWith(q) || n(r.title).startsWith(q)) || L.find(r => (n(r.ref) + ' ' + n(r.title)).includes(q)) || null;
}
// Builds the checklist from the setup rules and the template, keeping any notes and readings already typed for a part.
function build(s, keepOld){
  const C = cer(), parts = partsFor(s.type), groups = groupsFor(famOf(s.type)), gi = id => { const i = groups.findIndex(g => g.id === id); return i < 0 ? 999 : i; };
  const T = C.templates.find(t => t.id === s.template);
  const old = keepOld ? (s.parts || []).slice() : [];
  let out = [];
  if (T) (T.parts || []).forEach(tp => {
    const id = typeof tp === 'string' ? tp : tp.part, p = parts.find(x => x.id === id) || PART(id); if (!p) return;
    const e = mkEntry(p, true, tp.option, s);
    const vOf = r => r && r.versions ? (r.versions[s.bible] && !offIds().includes(s.bible) ? s.bible : 'kjv') : null;
    if (tp.readings) e.rd = arr(tp.readings).map(id => RD(id)).filter(Boolean).map(r => ({id: r.id, ver: vOf(r)}));
    else if (tp.hint){ const r = hintReading(tp.hint); if (r) e.rd = [{id: r.id, ver: vOf(r)}]; }
    out.push(e);
  });
  parts.forEach(p => {
    if (T && out.some(e => e.part === p.id)) return;
    // With a template, the template sets the parts; only honors and rituals chosen in setup add parts beyond it.
    const e = mkEntry(p, T ? mentions(p.on, 'honors') && ruleOn(p.on, s) : ruleOn(p.on, s), null, s);
    let at = out.length;
    if (T){ at = 0; out.forEach((x, i) => { if (gi(partOf(x).group) <= gi(p.group)) at = i + 1; }); }
    out.splice(at, 0, e);
  });
  if (!T) out = out.map((e, i) => [e, i]).sort((a, b) => gi(partOf(a[0]).group) - gi(partOf(b[0]).group) || a[1] - b[1]).map(x => x[0]);
  // carry over what was typed: notes, readings, edits, and the user's own choices
  old.forEach(o => {
    if (o.custom){ out.push(o); return; }
    const n = out.find(e => e.part === o.part && !e.carried);
    if (!n){ if (o.note || (o.rd || []).length || o.text != null) out.push(o); return; }
    n.carried = true; ['note', 'text', 'tn', 'mins', 'title', 'by'].forEach(k => { if (o[k] != null && o[k] !== '') n[k] = o[k]; });
    if ((o.rd || []).length) n.rd = o.rd;
    if (o.touched){ n.on = o.on; n.option = o.option; n.touched = true; }
  });
  out.forEach(e => { delete e.carried; });
  s.parts = out;
}
// After a setup change: parts not touched by hand follow the rules again; parts new to this type are added.
const mentions = (r, k) => !!r && typeof r === 'object' && (Object.prototype.hasOwnProperty.call(r, k) || Object.values(r).some(v => typeof v === 'object' && arr(v).some(x => mentions(x, k))));
function reapply(s){
  const parts = partsFor(s.type), T = cer().templates.find(t => t.id === s.template), inT = id => !!(T && (T.parts || []).some(tp => (typeof tp === 'string' ? tp : tp.part) === id));
  s.parts.forEach(e => { if (!e.custom && !e.touched && !e.note && e.text == null && !(e.rd || []).length && PART(e.part)){ const r = PART(e.part).on; e.on = inT(e.part) || ((!T || mentions(r, 'honors')) && ruleOn(r, s)); } });
  const missing = parts.filter(p => !s.parts.some(e => e.part === p.id));
  if (missing.length){ const keepP = s.parts; build(s, false); const fresh = s.parts; s.parts = keepP; missing.forEach(p => { const e = fresh.find(x => x.part === p.id); const i = fresh.indexOf(e); const prev = fresh.slice(0, i).reverse().find(x => keepP.some(y => y.part === x.part)); const at = prev ? keepP.findIndex(y => y.part === prev.part) + 1 : 0; keepP.splice(at, 0, e); }); }
}

// ---------- readings ----------
const RD = id => cer().readings.find(r => r.id === id);
const fam2for = fam => fam;
function rScore(r, s){
  const t = r.tags || {}, fam = famOf(s.type), st = s.setup || {}, sug = arr(typeOf(s.type).readings).includes(r.id);
  if (!sug && t.for && t.for !== 'both' && t.for !== fam2for(fam)) return -99;
  let n = sug ? 3 : 0;
  if (arr(t.types).includes(s.type)) n += 3; else if (!arr(t.types).length) n += 1;
  const fs = arr(t.faith);
  if (st.faith && fs.length){ if (fs.some(x => faithMatch(x, st.faith) && x !== 'any' && x !== 'all')) n += 3; else if (fs.some(x => x === 'any' || x === 'all')) n += 1; else n -= 5; }
  if (st.tone && arr(t.tone).includes(st.tone)) n += 1;
  return n;
}
// Bible versions (GWG BLD 749): a version marked off (NIV, until Biblica gives written permission)
// is never offered, shown, or printed; a saved reading that chose it shows and prints KJV.
const verOff = v => !!v && (v.off === true || (v.id === 'niv' && v.on !== true));
const offIds = () => (cer().bible.versions || []).filter(verOff).map(v => v.id).concat((cer().bible.versions || []).some(v => v.id === 'niv') ? [] : ['niv']);
const onVers = () => (cer().bible.versions || []).filter(v => !verOff(v));
const offName = id => { const v = (cer().bible.versions || []).find(x => x.id === id); return (v && (v.short || v.name)) || String(id || '').toUpperCase(); };
function vers(r){
  const out = [];
  onVers().forEach(v => { if (r.versions && r.versions[v.id]) out.push(v); });
  if (!out.length && r.versions) Object.keys(r.versions).filter(k => !offIds().includes(k)).forEach(k => out.push({id: k, name: k.toUpperCase(), short: k.toUpperCase()}));
  return out;
}
const vShort = id => { const v = (cer().bible.versions || []).find(x => x.id === id); return (v && (v.short || v.abbr)) || String(id || '').toUpperCase(); };
function rText(r, ver){
  if (!r) return '';
  if (r.versions){ const off = offIds(), ok = k => r.versions[k] && !off.includes(k);
    const v = ok(ver) ? ver : (r.versions.kjv ? 'kjv' : Object.keys(r.versions).find(ok) || Object.keys(r.versions)[0]); return {text: r.versions[v] || '', ver: v}; }
  return {text: r.text || '', ver: null};
}
const byOfR = r => r.by || r.author || '';
const rHead = (r, ver) => r.kind === 'scripture' ? (r.ref || r.title) + (ver ? ' (' + vShort(ver) + ')' : '') : r.title + (byOfR(r) ? ', ' + byOfR(r) : '');
// reading.note is for the officiant only (never printed); reading.bring means no text is stored: bring your own copy.
const rNote = r => (r.bring ? '<p class="cer-do"><b>Bring Your Own Copy</b>' + esc([r.title, byOfR(r)].filter(Boolean).join(', ')) + '</p>' : '') + (r.note ? `<p class="cer-do"><b>Note</b>${esc(r.note)}</p>` : '');
function usedNotices(s){
  const used = new Set(); onParts(s).forEach(e => (e.rd || []).forEach(x => { const r = RD(x.id); if (r && r.versions) used.add(rText(r, x.ver).ver); }));
  return onVers().filter(v => used.has(v.id) && v.notice).map(v => v.notice);
}

// ---------- views ----------
const CSS = `
#cer-root{--cer-pad:16px;}
#cer-root .card{min-width:0;}
.cer-types{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;margin-top:10px;}
.cer-type{display:flex;flex-direction:column;align-items:flex-start;gap:2px;text-align:left;min-height:64px;padding:14px 16px;border:1.5px solid var(--line);border-radius:14px;background:var(--card);cursor:pointer;color:var(--ink);font:inherit;}
.cer-type b{font-family:'Cormorant Garamond',Georgia,serif;font-size:calc(22px * var(--scale));line-height:1.1;}
.cer-type small{color:var(--ink-soft);font-size:14px;line-height:1.35;}
.cer-type:hover,.cer-type[aria-pressed="true"]{border-color:var(--gold);}
.cer-type[aria-pressed="true"]{box-shadow:inset 0 0 0 1.5px var(--gold);}
.cer-chips{display:flex;flex-wrap:wrap;gap:8px;}
.cer-chips .chip{min-height:44px;}
.cer-g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 14px;}
.cer-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0 14px;}
@media(max-width:700px){.cer-g2,.cer-g3{grid-template-columns:minmax(0,1fr);}}
.cer-head{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end;justify-content:space-between;}
.cer-head h1{overflow-wrap:anywhere;}
.cer-nav{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 4px;}
.cer-nav .btn[aria-current="page"]{background:var(--umber);border-color:var(--umber);color:#F4EBDA;}
.cer-time{position:sticky;top:var(--cer-top,110px);z-index:5;background:var(--bg);padding:8px 0 10px;margin-bottom:6px;}
.cer-time .t{display:flex;justify-content:space-between;gap:10px;font-weight:600;font-size:15px;flex-wrap:wrap;}
.cer-meter{height:8px;border-radius:6px;background:var(--bg-deep);overflow:hidden;margin-top:6px;border:1px solid var(--line);}
.cer-meter i{display:block;height:100%;background:var(--gold);}
.cer-meter.over i{background:var(--danger);}
.cer-grp{margin-top:14px;}
.cer-grp > h2{font-size:calc(26px * var(--scale));margin-bottom:6px;}
.cer-part{border-top:1px solid var(--line);padding:12px 0;}
.cer-part:first-of-type{border-top:0;}
.cer-ph{display:flex;align-items:flex-start;gap:12px;}
.cer-ph label{display:flex;align-items:center;gap:12px;cursor:pointer;flex:1;min-width:0;min-height:44px;}
.cer-ph input[type=checkbox]{width:28px;height:28px;flex:none;accent-color:var(--gold);}
.cer-ph .nm{font-weight:700;font-size:calc(19px * var(--scale));overflow-wrap:anywhere;}
.cer-ph .mn{color:var(--ink-soft);font-size:14px;font-weight:600;white-space:nowrap;margin-left:6px;}
.cer-part.off .nm{color:var(--ink-soft);font-weight:600;}
.cer-ask{margin:4px 0 8px 40px;color:var(--ink-soft);font-style:italic;overflow-wrap:anywhere;}
.cer-body{margin-left:40px;}
@media(max-width:560px){.cer-ask,.cer-body{margin-left:0;}}
.cer-body textarea{min-height:84px;}
.cer-say{background:var(--bg-deep);border-radius:10px;padding:10px 12px;margin:6px 0 8px;font-size:16px;white-space:pre-wrap;overflow-wrap:anywhere;}
.cer-rd{border:1px solid var(--line);border-radius:12px;padding:10px 12px;margin:8px 0;background:var(--card);}
.cer-rd .spread{align-items:flex-start;}
.cer-rd .rt{font-weight:700;overflow-wrap:anywhere;min-width:0;flex:1;}
.cer-rd select{width:auto;min-width:90px;padding:8px 10px;}
.cer-src{font-size:14px;color:var(--ink-soft);font-style:italic;margin-top:4px;overflow-wrap:anywhere;}
.cer-rd details{margin-top:6px;}
.cer-rd details p{white-space:pre-wrap;font-size:16px;margin-top:6px;}
.cer-pick{border:1.5px solid var(--gold);border-radius:14px;padding:12px;margin:8px 0;background:var(--card);}
.cer-pick-list{max-height:520px;overflow:auto;margin-top:8px;}
.cer-pr{display:flex;gap:10px;align-items:flex-start;justify-content:space-between;border-top:1px solid var(--line);padding:10px 0;}
.cer-pr:first-child{border-top:0;}
.cer-pr .m{min-width:0;flex:1;}
.cer-pr .m b{overflow-wrap:anywhere;}
.cer-pr .pv{font-size:14px;color:var(--ink-soft);overflow-wrap:anywhere;}
.cer-tag{display:inline-block;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:1px;text-transform:uppercase;padding:2px 8px;border-radius:12px;background:color-mix(in srgb,var(--gold) 16%,transparent);color:var(--gold);margin-left:6px;vertical-align:middle;}
.cer-ed{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,300px);gap:14px;align-items:start;}
@media(max-width:860px){.cer-ed{grid-template-columns:minmax(0,1fr);}}
.cer-ed-item.drag{opacity:.45;}
.cer-ed-item.over{outline:2px dashed var(--gold);outline-offset:3px;}
.cer-ed-top{display:flex;gap:8px;align-items:center;flex-wrap:wrap;}
.cer-ed-top .h{cursor:grab;font-size:22px;line-height:1;color:var(--ink-soft);padding:6px;user-select:none;}
.cer-ed-top input.tt{flex:1;min-width:140px;font-weight:700;}
.cer-ed-top input.mm{width:76px;}
.cer-ed-mv{display:flex;gap:6px;}
.cer-ed-mv button{min-width:44px;min-height:44px;}
.cer-ed textarea.words{min-height:120px;font-size:17px;}
.cer-side label.f:first-child{margin-top:0;}
.cer-note-side{background:var(--bg-deep);border-radius:12px;padding:10px 12px;}
.cer-row{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:12px 0;border-top:1px solid var(--line);flex-wrap:wrap;}
.cer-row:first-child{border-top:0;}
.cer-row .m{min-width:0;flex:1 1 220px;}
.cer-row .m b{overflow-wrap:anywhere;}
.cer-pc{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;}
@media(max-width:760px){.cer-pc{grid-template-columns:minmax(0,1fr);}}
.cer-pc .card + .card{margin-top:0;}
.cer-photo{max-width:160px;max-height:200px;border-radius:10px;display:block;margin-top:8px;}
.cer-lic li{list-style:none;border-top:1px solid var(--line);padding:10px 0;}
.cer-lic li:first-child{border-top:0;}
.cer-lic label{display:flex;gap:12px;align-items:flex-start;cursor:pointer;min-height:44px;}
.cer-lic input{width:26px;height:26px;flex:none;margin-top:2px;accent-color:var(--gold);}
.cer-count{font-weight:600;font-size:14px;color:var(--ink-soft);}
.cer-count.over{color:var(--danger);}
.cer-br{background:color-mix(in srgb,var(--gold) 26%,transparent);color:inherit;border-radius:4px;padding:0 3px;}
.cer-brn{font-size:14px;color:var(--ink-soft);margin-top:6px;overflow-wrap:anywhere;}
.cer-do{font-size:15px;color:var(--ink-soft);margin:4px 0 8px;overflow-wrap:anywhere;}
.cer-do b{font-family:'Barlow Condensed',sans-serif;letter-spacing:1px;text-transform:uppercase;font-size:12.5px;color:var(--gold);margin-right:6px;}
.cer-ck{display:inline-block;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:1px;text-transform:uppercase;padding:2px 8px;border-radius:12px;background:color-mix(in srgb,var(--danger) 14%,transparent);color:var(--danger);margin-left:6px;}
.cer-tmpl{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;}
`;
function chips(key, items, val, multi){
  const on = id => multi ? arr(val).map(String).includes(String(id)) : String(val) === String(id);
  return `<div class="cer-chips" role="group">${items.map(([id, l]) => `<button type="button" class="chip" data-cer="${key}" data-v="${esc(id)}" aria-pressed="${on(id)}">${esc(l)}</button>`).join('')}</div>`;
}
const backHome = () => `<button class="linkbtn" data-cer="home">&larr; All Services</button>`;
function timeBar(s){
  const t = total(s), L = +(s.setup || {}).length || 0, pct = L ? Math.min(100, Math.round(t / L * 100)) : 0, over = L && t > L + 2;
  return `<div class="cer-time" id="cer-time"><div class="t"><span>About ${t} minutes${L ? ' of ' + L : ''}</span><span class="muted">${onParts(s).length} parts</span></div>${L ? `<div class="cer-meter${over ? ' over' : ''}"><i style="width:${pct}%"></i></div>` : ''}</div>`;
}
function navBar(s){
  const fam = famOf(s.type);
  const b = (v, l) => `<button type="button" class="btn btn-line btn-sm" data-cer="go" data-v="${v}"${S.view === v ? ' aria-current="page"' : ''}>${l}</button>`;
  return `<div class="cer-nav">${b('setup', 'Setup')}${b('check', 'The Checklist')}${b('edit', 'The Editor')}${b('print', 'Print and Copy')}${fam === 'funeral' ? b('obit', 'Obituary') : ''}${fam === 'wedding' && (cer().wedding.license || []).length ? b('license', 'License Checklist') : ''}</div>`;
}
function headOf(s, eyebrow){
  const bits = [typeOf(s.type).name, nice(s.date), s.place].filter(Boolean).join(', ');
  return `${backHome()}<div class="page-head cer-head" style="margin-top:10px"><div style="min-width:0"><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(title(s))}</h1><p>${esc(bits)}</p></div>
    <div>${chips('status', STATUS, s.status || 'session')}</div></div>${navBar(s)}`;
}

function vHome(){
  const C = cer(), L = list().slice().sort((a, b) => (b.u || 0) - (a.u || 0));
  const fams = [['funeral', 'Funerals and Memorials'], ['wedding', 'Weddings'], ['blessing', 'Blessings']];
  return `<div class="page-head"><div class="eyebrow">Grow With Grounded</div><h1>Service Builder</h1><p>Build a service or a blessing live with the family or the couple, then dial it in and print it.</p></div>
  <div class="card"><h2 style="margin-bottom:4px">Start a Service</h2><p class="muted">Pick the kind of service. Setup takes about a minute.</p>
    ${fams.map(([f, l]) => { const ts = C.types.filter(t => t.family === f); return ts.length ? `<h3 style="margin-top:14px">${l}</h3><div class="cer-types">${ts.map(t => `<button type="button" class="cer-type" data-cer="new" data-v="${esc(t.id)}"><b>${esc(t.name)}</b>${t.lead ? `<small>${esc(t.lead)}</small>` : ''}</button>`).join('')}</div>` : ''; }).join('')}
    ${C.full ? '' : `<p class="muted" style="margin-top:12px;font-size:15px">The full set of parts, templates, and readings arrives with the next Staff library update.</p>`}</div>
  <div class="card"><h2 style="margin-bottom:4px">Saved Services</h2>
    ${L.length ? L.map(s => `<div class="cer-row"><div class="m"><b>${esc(title(s))}</b><br><small class="muted">${esc(typeOf(s.type).name)}${s.date ? ', ' + esc(nice(s.date)) : ''}</small> <span class="pill ${s.status === 'final' ? 'sage' : 'gold'}">${esc(optName(STATUS.map(x => ({id: x[0], name: x[1]})), s.status || 'session'))}</span></div>
      <div class="row"><button type="button" class="btn btn-gold btn-sm" data-cer="open" data-v="${s.id}">Open</button><button type="button" class="btn btn-line btn-sm" data-cer="dup" data-v="${s.id}">Duplicate</button><button type="button" class="btn btn-danger btn-sm" data-cer="del" data-v="${s.id}">Delete</button></div></div>`).join('')
      : '<p class="muted">Services you build show here. They stay on this device, encrypted with your records, and travel in your backups.</p>'}</div>`;
}

function vSetup(s){
  const C = cer(), fam = famOf(s.type), st = s.setup, SU = C.setup;
  const L = (list, f) => (list || []).filter(x => !f || !x.family || x.family === f || x.family === 'both').map(x => [x.id, x.name]);
  const faiths = SU.faiths || [], fo = faiths.find(x => x.id === st.faith);
  const tmpls = C.templates.filter(t => arr(t.type).includes(s.type));
  const tScore = t => (st.faith && arr(t.faith).some(f => faithMatch(f, st.faith))) ? 2 : (!arr(t.faith).length || arr(t.faith).some(f => f === 'any' || f === 'all')) ? 1 : 0;
  const tm = tmpls.slice().sort((a, b) => tScore(b) - tScore(a));
  const hasScripture = C.readings.some(r => r.versions);
  const who = whoOf(s.type), inp = (id, f, l, ph) => `<div><label class="f" for="${id}">${l}</label><input type="text" id="${id}" data-cerf="${f}" value="${esc(f.split('.').reduce((o, k) => (o || {})[k], s) || '')}"${ph ? ` placeholder="${esc(ph)}"` : ''} autocomplete="off"></div>`;
  const pron = `<label class="f">Pronouns</label>${chips('pron', [['he', 'He'], ['she', 'She'], ['they', 'They']], s.who.pron || 'they')}`;
  const person = who === 'home' ? `<div class="cer-g2">${inp('cer-n', 'who.name', 'Household', 'Sam and Alex Rivera, or the Rivera family')}${inp('cer-fam', 'who.family', 'Who Lives Here', 'Names, children and pets included')}</div>`
    : who === 'child' ? `<div class="cer-g2">${inp('cer-n', 'who.name', "Child's Full Name")}${inp('cer-fn', 'who.first', 'Goes By', 'First name or nickname')}${inp('cer-b', 'who.born', 'Born or Welcomed', 'March 3, 2026')}${inp('cer-fam', 'who.family', 'Parents or Family', 'Sam and Alex Rivera')}</div>${pron}`
    : fam === 'blessing' ? `<div class="cer-g2">${inp('cer-n', 'who.name', 'Full Name')}${inp('cer-fn', 'who.first', 'Goes By', 'First name or nickname')}</div>${inp('cer-fam', 'who.family', 'Family Gathered', 'Who will be in the room')}${pron}`
    : fam === 'wedding'
    ? `<div class="cer-g2">${[['p1', 'Partner 1'], ['p2', 'Partner 2']].map(([k, l]) => `<div><label class="f" for="cer-${k}n">${l}: Full Name</label><input type="text" id="cer-${k}n" data-cerf="${k}.name" value="${esc((s[k] || {}).name || '')}" autocomplete="off">
        <label class="f" for="cer-${k}f">Goes By</label><input type="text" id="cer-${k}f" data-cerf="${k}.first" value="${esc((s[k] || {}).first || '')}" placeholder="First name" autocomplete="off"></div>`).join('')}</div>`
    : `<div class="cer-g2"><div><label class="f" for="cer-n">Full Name</label><input type="text" id="cer-n" data-cerf="who.name" value="${esc(s.who.name || '')}" autocomplete="off"></div>
       <div><label class="f" for="cer-fn">Goes By</label><input type="text" id="cer-fn" data-cerf="who.first" value="${esc(s.who.first || '')}" placeholder="First name or nickname" autocomplete="off"></div>
       <div><label class="f" for="cer-b">Born</label><input type="text" id="cer-b" data-cerf="who.born" value="${esc(s.who.born || '')}" placeholder="March 3, 1942" autocomplete="off"></div>
       <div><label class="f" for="cer-d">Died</label><input type="text" id="cer-d" data-cerf="who.died" value="${esc(s.who.died || '')}" placeholder="October 1, 2026" autocomplete="off"></div></div>
       <label class="f">Pronouns</label>${chips('pron', [['he', 'He'], ['she', 'She'], ['they', 'They']], s.who.pron || 'they')}`;
  return `${S.draft ? backHome() + `<div class="page-head" style="margin-top:10px"><div class="eyebrow">Service Builder</div><h1>Setup</h1><p>A few answers shape the checklist. Change any of them later.</p></div>` : headOf(s, 'Setup')}
  <div class="card"><label class="f">Ceremony</label>${chips('type', C.types.map(t => [t.id, t.name]), s.type)}
    ${person}
    <div class="cer-g3"><div><label class="f" for="cer-dt">Date</label><input type="date" id="cer-dt" data-cerf="date" value="${esc(s.date || '')}"></div>
      <div><label class="f" for="cer-tm">Time</label><input type="text" id="cer-tm" data-cerf="time" value="${esc(s.time || '')}" placeholder="11:00 a.m." autocomplete="off"></div>
      <div><label class="f" for="cer-pl">Place</label><input type="text" id="cer-pl" data-cerf="place" value="${esc(s.place || '')}" autocomplete="off"></div></div></div>
  <div class="card"><label class="f" for="cer-faith" style="margin-top:0">Faith</label>
    <select id="cer-faith" data-cers="faith"><option value="">Choose a tradition</option>${faiths.map(f => `<option value="${esc(f.id)}"${f.id === st.faith ? ' selected' : ''}>${esc(f.name)}</option>`).join('')}</select>
    ${fo && fo.note ? `<p class="muted" style="font-size:15px;margin-top:6px">${esc(fo.note)}</p>` : ''}
    <label class="f">Tone</label>${chips('tone', L(SU.tones), st.tone)}
    <label class="f">Age Group</label>${chips('age', L(SU.ages), st.age)}
    <label class="f">Length</label>${chips('length', (SU.lengths || []).map(n => [n, n + ' Minutes']), st.length)}
    <label class="f">Setting</label>${chips('setting', L(SU.settings, fam), st.setting)}
    ${L(SU.honors, fam).length ? `<label class="f">Honors and Rituals</label>${chips('honors', L(SU.honors, fam), st.honors, true)}` : ''}
    <label class="f">Who Speaks</label>${chips('speakers', L(SU.speakers, fam), st.speakers, true)}
    ${hasScripture ? `<label class="f">Bible Version</label>${chips('bible', onVers().map(v => [v.id, v.short || v.name]), offIds().includes(s.bible) ? 'kjv' : s.bible || C.bible.default || 'kjv')}${offIds().includes(s.bible) ? `<p class="muted" style="font-size:15px;margin-top:6px">${esc(offName(s.bible))} is waiting on permission; showing KJV</p>` : ''}` : ''}</div>
  <div class="card"><h3>Start From a Template</h3><p class="muted">Templates for this ceremony, the closest match to the faith first.</p>
    <div class="cer-tmpl" style="margin-top:10px"><button type="button" class="cer-type" data-cer="tmpl" data-v="" aria-pressed="${!s.template}"><b>The Usual Parts</b><small>The parts that fit these answers.</small></button>
    ${tm.map(t => `<button type="button" class="cer-type" data-cer="tmpl" data-v="${esc(t.id)}" aria-pressed="${s.template === t.id}"><b>${esc(t.name)}</b>${t.note ? `<small>${esc(t.note)}</small>` : ''}</button>`).join('')}</div>
    <div class="row" style="margin-top:16px"><button type="button" class="btn btn-gold" data-cer="begin">${S.draft ? 'Start the Checklist' : 'Save Setup and Go to the Checklist'}</button></div></div>`;
}

function readingBlock(s, e){
  const rd = e.rd || [];
  const chosen = rd.map((x, i) => { const r = RD(x.id); if (!r) return ''; const vs = vers(r), tx = rText(r, x.ver);
    return `<div class="cer-rd"><div class="spread"><span class="rt">${esc(rHead(r, tx.ver))}${r.kind !== 'scripture' && r.ref ? ` <span class="muted">${esc(r.ref)}</span>` : ''}</span>
      <span class="row">${vs.length > 1 ? `<select aria-label="Bible version" data-cerv="${e.k}|${i}">${vs.map(v => `<option value="${esc(v.id)}"${v.id === tx.ver ? ' selected' : ''}>${esc(v.short || v.name)}</option>`).join('')}</select>` : ''}
      <button type="button" class="btn btn-line btn-sm" data-cer="rd-x" data-v="${e.k}|${i}" aria-label="Remove ${esc(r.title)}">Remove</button></span></div>
      ${x.ver && x.ver !== tx.ver && offIds().includes(x.ver) ? `<p class="muted cer-off" style="font-size:14px;margin:2px 0 4px">${esc(offName(x.ver))} is waiting on permission; showing ${esc(vShort(tx.ver))}</p>` : ''}
      ${r.source ? `<div class="cer-src">${esc(r.source)}</div>` : ''}${rNote(r)}${tx.text ? `<details><summary class="muted" style="font-size:15px;cursor:pointer">Read it</summary><p>${esc(tx.text)}</p></details>` : ''}</div>`; }).join('');
  return chosen + (S.pick === e.k ? picker(s, e) : `<button type="button" class="btn btn-line btn-sm" data-cer="pick" data-v="${e.k}" style="margin-top:4px">Add a Reading</button>`);
}
function pickList(s, e){
  const q = S.pq.trim().toLowerCase(), have = (e.rd || []).map(x => x.id);
  let L = cer().readings.map(r => [r, rScore(r, s)]);
  if (!S.pall) L = L.filter(([, n]) => n > -5);
  if (S.pk !== 'all') L = L.filter(([r]) => (r.kind || 'reading') === S.pk);
  if (q) L = L.filter(([r]) => [r.title, r.ref, byOfR(r), r.about, r.source, r.text, r.versions && r.versions.kjv].join(' ').toLowerCase().includes(q));
  L.sort((a, b) => b[1] - a[1] || String(a[0].title).localeCompare(String(b[0].title)));
  const n = 30 + S.pmore, shown = L.slice(0, n);
  if (!L.length) return `<p class="muted">No readings match. Try another word${S.pall ? '' : ', or show every reading'}.</p>`;
  return shown.map(([r, sc]) => { const tx = rText(r, s.bible).text || (r.bring ? 'Bring your own copy. ' + (r.about || '') : r.about || '');
    return `<div class="cer-pr"><div class="m"><b>${esc(r.kind === 'scripture' ? (r.ref || r.title) : r.title)}</b>${sc >= 5 ? '<span class="cer-tag">Suggested</span>' : ''}<br><span class="pv">${esc((r.kind || 'reading').replace(/^./, c => c.toUpperCase()))}${r.kind === 'scripture' && r.title !== r.ref ? ', ' + esc(r.title) : ''}${byOfR(r) && r.kind !== 'scripture' ? ', ' + esc(byOfR(r)) : ''}. ${esc(tx.slice(0, 110))}${tx.length > 110 ? '...' : ''}</span>${r.source ? `<div class="cer-src">${esc(r.source)}</div>` : ''}</div>
      <button type="button" class="btn ${have.includes(r.id) ? 'btn-line' : 'btn-gold'} btn-sm" data-cer="rd-add" data-v="${e.k}|${esc(r.id)}"${have.includes(r.id) ? ' disabled' : ''}>${have.includes(r.id) ? 'Added' : 'Add'}</button></div>`; }).join('')
    + (L.length > n ? `<button type="button" class="btn btn-line btn-sm" data-cer="pmore" style="margin-top:8px">Show More (${L.length - n})</button>` : '');
}
function picker(s, e){
  return `<div class="cer-pick" id="cer-pick"><div class="spread"><b>Add a Reading</b><button type="button" class="btn btn-line btn-sm" data-cer="pick" data-v="">Done</button></div>
    <label class="f" for="cer-pq">Search</label><input type="text" id="cer-pq" data-cerq="1" value="${esc(S.pq)}" placeholder="A word, a title, or a verse" autocomplete="off">
    <label class="f">Kind</label>${chips('pk', KINDS, S.pk)}
    <label class="sc-cb" style="display:flex;gap:8px;align-items:center;margin-top:10px;font-weight:600;color:var(--ink-soft)"><input type="checkbox" data-cer-pall="1"${S.pall ? ' checked' : ''}> Show every reading, not only those that fit this service</label>
    <div class="cer-pick-list" id="cer-pick-list">${pickList(s, e)}</div></div>`;
}

function vCheck(s){
  const fam = famOf(s.type), groups = groupsFor(fam), gids = groups.map(g => g.id);
  const byG = {}; s.parts.forEach(e => { const g = gids.includes(partOf(e).group) ? partOf(e).group : '_more'; (byG[g] = byG[g] || []).push(e); });
  const G = groups.concat(byG._more ? [{id: '_more', name: 'More'}] : []);
  const row = e => { const p = partOf(e), o = optOf(e), say = e.on ? partWords(e, s) : '';
    return `<div class="cer-part${e.on ? '' : ' off'}" data-k="${e.k}"><div class="cer-ph"><label><input type="checkbox" data-cerc="${e.k}"${e.on ? ' checked' : ''}><span><span class="nm">${esc(e.title || p.name)}</span><span class="mn">${minsOf(e)} min</span></span></label>
      ${e.on && !e.custom ? `<button type="button" class="linkbtn" data-cer="again" data-v="${e.k}" style="font-size:14px;white-space:nowrap">Add Another</button>` : ''}</div>
      ${p.prompt ? `<p class="cer-ask">${esc(fill(p.prompt, s))}</p>` : ''}
      ${e.on ? `<div class="cer-body">${(p.options || []).length ? chips('opt|' + e.k, p.options.map(x => [x.id, x.name]), e.option) : ''}
        ${say ? `<div class="cer-say">${markBr(say)}</div>` : ''}${o && o.source ? `<div class="cer-src">${esc(o.source)}</div>` : ''}
        ${doOf(e, s).map(d => `<p class="cer-do"><b>For You</b>${esc(d)}</p>`).join('')}
        ${p.readings ? readingBlock(s, e) : ''}
        <label class="f" for="cer-n-${e.k}">The family's words</label><textarea id="cer-n-${e.k}" data-cern="${e.k}" placeholder="Type their exact words here.">${esc(e.note || '')}</textarea></div>` : ''}</div>`; };
  return `${headOf(s, 'The Checklist')}${timeBar(s)}
  ${G.filter(g => byG[g.id]).map(g => `<div class="card cer-grp"><h2>${esc(g.name)}</h2>${byG[g.id].map(row).join('')}</div>`).join('')}
  <div class="card"><h3>Add Your Own Part</h3><div class="cer-g2"><div><label class="f" for="cer-cn">Name of the Part</label><input type="text" id="cer-cn" placeholder="Lighting of a Candle" autocomplete="off"></div>
    <div><label class="f" for="cer-cg">Where It Goes</label><select id="cer-cg">${groups.map(g => `<option value="${esc(g.id)}">${esc(g.name)}</option>`).join('')}</select></div></div>
    <div class="row" style="margin-top:12px"><button type="button" class="btn btn-line" data-cer="custom">Add the Part</button><button type="button" class="btn btn-gold" data-cer="go" data-v="edit">On to the Editor</button></div></div>`;
}

function vEdit(s){
  const on = onParts(s);
  const item = (e, i) => { const p = partOf(e);
    return `<div class="card cer-ed-item" draggable="true" data-cerd="${e.k}"><div class="cer-ed">
      <div style="min-width:0"><div class="cer-ed-top"><span class="h" aria-hidden="true" title="Drag to move">&#x2630;</span>
        <input type="text" class="tt" aria-label="Name of the part" data-cere="title|${e.k}" value="${esc(e.title || p.name)}">
        <input type="number" class="mm" min="0" max="120" aria-label="Minutes" data-cere="mins|${e.k}" value="${minsOf(e)}">
        <span class="cer-ed-mv"><button type="button" class="btn btn-line btn-sm" data-cer="up" data-v="${e.k}" aria-label="Move up"${i === 0 ? ' disabled' : ''}>&uarr;</button><button type="button" class="btn btn-line btn-sm" data-cer="down" data-v="${e.k}" aria-label="Move down"${i === on.length - 1 ? ' disabled' : ''}>&darr;</button></span></div>
        <label class="f" for="cer-w-${e.k}">Words</label><textarea class="words" id="cer-w-${e.k}" data-cere="text|${e.k}">${esc(partWords(e, s))}</textarea>
        <div id="cer-br-${e.k}">${bracketNote(partWords(e, s))}</div>
        ${e.text != null ? `<button type="button" class="linkbtn" data-cer="reset" data-v="${e.k}" style="font-size:14px">Go Back to the Library Words</button>` : ''}
        ${p.readings ? readingBlock(s, e) : ''}</div>
      <div class="cer-side">${doOf(e, s).map(d => `<p class="cer-do"><b>For You</b>${esc(d)}</p>`).join('')}<label class="f" for="cer-by-${e.k}">Led By</label><input type="text" id="cer-by-${e.k}" data-cere="by|${e.k}" value="${esc(e.by || '')}" placeholder="${esc((D().settings || {}).name || 'Officiant')}" autocomplete="off">
        <label class="f" for="cer-n-${e.k}">Notes</label><div class="cer-note-side"><textarea id="cer-n-${e.k}" data-cern="${e.k}" placeholder="The family's words and reminders.">${esc(e.note || '')}</textarea></div>
        <button type="button" class="btn btn-line btn-sm" data-cer="off" data-v="${e.k}" style="margin-top:10px">Take Out</button></div></div></div>`; };
  return `${headOf(s, 'The Editor')}${timeBar(s)}
  <div class="card"><label class="f" for="cer-title" style="margin-top:0">Service Title</label><input type="text" id="cer-title" data-cerf="title" value="${esc(s.title || '')}" placeholder="${esc(title(Object.assign({}, s, {title: ''})))}" autocomplete="off">
    <p class="muted" style="font-size:15px;margin-top:8px">Drag a part to move it, or use the arrows. Names and pronouns from Setup fill in everywhere. Notes stay beside each part and print only on the Officiant's Script.</p></div>
  <div id="cer-ed-list">${on.map(item).join('')}</div>
  ${on.length ? '' : '<div class="card"><p class="muted">No parts are checked yet. Turn some on in the Checklist.</p></div>'}
  <div class="row" style="margin-top:14px"><button type="button" class="btn btn-gold" data-cer="go" data-v="print">Print and Copy</button></div>`;
}

function vPrint(s){
  const fam = famOf(s.type), bl = fam === 'blessing', hasObit = fam === 'funeral' && Object.values((s.obit || {}).d || {}).some(Boolean);
  const card = (k, h, p, extra) => `<div class="card"><h3>${h}</h3><p class="muted">${p}</p>${extra || ''}<div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold btn-sm" data-cer="pr" data-v="${k}">Print or Save as PDF</button><button type="button" class="btn btn-line btn-sm" data-cer="cp" data-v="${k}">Copy Text</button></div></div>`;
  const prog = `<label class="f">Photo for the Cover</label>${s.photo ? `<img class="cer-photo" src="${s.photo}" alt="The cover photo"><div class="row" style="margin-top:8px"><label class="btn btn-line btn-sm" style="cursor:pointer">Change Photo<input type="file" accept="image/*" data-cerph="1" hidden></label><button type="button" class="btn btn-line btn-sm" data-cer="photo-x">Remove Photo</button></div>` : `<label class="btn btn-line btn-sm" style="cursor:pointer">Choose a Photo<input type="file" accept="image/*" data-cerph="1" hidden></label><p class="muted" style="font-size:14px;margin-top:6px">Optional. It stays on this device with the service.</p>`}
    ${fam === 'funeral' ? `<label style="display:flex;gap:8px;align-items:center;margin-top:12px;font-weight:600"><input type="checkbox" data-cer-po="1"${(s.prog || {}).obit !== false ? ' checked' : ''}${hasObit ? '' : ' disabled'}> Include the short obituary${hasObit ? '' : ' (draft one in Obituary first)'}</label>` : ''}`;
  return `${headOf(s, 'Print and Copy')}
  <div class="cer-pc">${card('script', "Officiant's Script", 'Large type, every part with its words, readings in full with their sources, and your notes beside them.')}
  ${bl ? card('order', 'Order of Blessing', 'A short page with the parts in order, for the family and anyone leading a part.') : card('order', 'Order of Service', 'One page for the funeral director, the musicians, or the coordinator.')}
  ${bl ? card('keep', 'Keepsake Copy', 'The blessing itself on one page, to sign, date, and leave with the family: by the door, in a frame, or in a baby book.') : ''}
  ${card('program', 'Program', (bl ? 'Optional, for a larger gathering. ' : '') + 'A folded half-letter program: print both sides of one letter sheet, then fold.', prog)}
  ${card('family', 'Family Copy', 'A clean copy for the family or the couple to read and approve.')}</div>
  <p class="muted" style="font-size:14px;margin-top:12px">Each reading prints with its source line. The NKJV and ESV notices print whenever their text is used.</p>`;
}

// Prefills: setup answers first, then Checklist notes. Each part's notes fill only the first question that asks for them.
function obitPrefills(s){
  const n = names(s), used = new Set(), out = {};
  const svcLine = [s.date ? 'on ' + nice(s.date) : '', s.time ? 'at ' + s.time : '', s.place ? 'at ' + s.place : ''].filter(Boolean).join(', ');
  (cer().obituary.questions || []).forEach(q => {
    const id = String(q.id || '').toLowerCase();
    const fixed = {name: n.Name, fullname: n.Name, known: n.Name, born: n.Born, birth: n.Born, died: n.Died, death: n.Died, first: n.First, service: svcLine, services: svcLine}[id];
    if (fixed){ out[q.id] = fixed; return; }
    const from = Array.isArray(q.from) && q.from.length ? q.from : (/life|story/.test(id) ? ['life', 'f-life'] : []);
    const es = s.parts.filter(e => e.on && e.note && e.note.trim() && !used.has(e.k) && from.some(x => x === e.part || x === partOf(e).group));
    es.forEach(e => used.add(e.k));
    out[q.id] = es.map(e => e.note.trim()).join('\n\n');
  });
  return out;
}
const obitAns = (s, q, pre) => { const a = (s.obit || {}).a || {}; return a[q.id] != null ? a[q.id] : (pre || obitPrefills(s))[q.id] || ''; };
function draftOf(s, shape){
  const O = cer().obituary, qs = O.questions || [], ans = {}, pre = obitPrefills(s); qs.forEach(q => { ans[q.id] = String(obitAns(s, q, pre) || '').trim().replace(/\s*\n+\s*/g, ' '); });
  const qids = new Set(qs.map(q => q.id));
  const toks = t => (t.match(/\{([A-Za-z][A-Za-z0-9]*)\}/g) || []).map(x => x.slice(1, -1)).filter(k => qids.has(k));
  const tidy = t => fill(t, s, ans).replace(/\s+([.,;:])/g, '$1').replace(/\.{2,}/g, '.').replace(/\s{2,}/g, ' ').trim();
  // One sentence: dropped when all its answers are empty; when only some are, its clauses with empty answers drop out.
  const sentence = t => {
    const used = toks(t); if (!used.length) return tidy(t);
    if (used.every(k => !ans[k])) return '';
    if (used.every(k => ans[k])) return tidy(t);
    const parts = t.replace(/[.!?]\s*$/, '').split(/,\s+/).filter(c => toks(c).every(k => ans[k]));
    if (!parts.length) return '';
    let out = tidy(parts.join(', ')).replace(/^and\s+/i, ''); out = out.charAt(0).toUpperCase() + out.slice(1);
    return out + '.';
  };
  const item = it => {
    let t = typeof it === 'string' ? it : (it && (it.text || it.t)) || '';
    if (it && it.q && !ans[it.q]) return '';
    return t.split(/(?<=[.!?])\s+(?=[{A-Z])/).map(sentence).filter(Boolean).join(' ');
  };
  const ol = Array.isArray(shape.outline) ? shape.outline : String(shape.outline || '').split(/\n+/);
  const paras = ol.some(Array.isArray) ? ol.map(p => arr(p).map(item).filter(Boolean).join(' ')) : (+shape.words || 0) > 120 ? ol.map(item) : [ol.map(item).filter(Boolean).join(' ')];
  return paras.filter(Boolean).join('\n\n');
}
function vObit(s){
  const O = cer().obituary, d = (s.obit = s.obit || {a: {}, d: {}}).d = s.obit.d || {};
  return `${headOf(s, 'Obituary')}
  <div class="card"><h3>The Questions</h3><p class="muted">Filled in from the setup and the Checklist notes. Change anything, then make the drafts.</p>
    ${(() => { const pre = obitPrefills(s); return (O.questions || []).map(q => `<label class="f" for="cer-oq-${esc(q.id)}">${esc(fill(q.ask, s))}</label><textarea id="cer-oq-${esc(q.id)}" data-cero="${esc(q.id)}" rows="2" style="min-height:60px" placeholder="${esc(fill(q.hint || '', s))}">${esc(obitAns(s, q, pre))}</textarea>`).join(''); })()}
    <div class="row" style="margin-top:14px"><button type="button" class="btn btn-gold" data-cer="obit-make">Make the Drafts</button></div></div>
  ${(O.shapes || []).map(sh => { const t = d[sh.id] || ''; const n = words(t), aim = +sh.words || 0;
    return `<div class="card"><div class="spread"><h3>${esc(sh.name)}</h3><span class="cer-count${aim && n > aim * 1.25 ? ' over' : ''}">${n} words${aim ? ', aim for about ' + aim : ''}</span></div>
      <textarea data-cerod="${esc(sh.id)}" style="min-height:${aim > 300 ? 260 : aim > 100 ? 180 : 110}px;margin-top:8px" placeholder="Tap Make the Drafts.">${esc(t)}</textarea>
      <div class="row" style="margin-top:10px"><button type="button" class="btn btn-line btn-sm" data-cer="obit-cp" data-v="${esc(sh.id)}">Copy</button><button type="button" class="btn btn-line btn-sm" data-cer="obit-pr" data-v="${esc(sh.id)}">Print or Save as PDF</button></div></div>`; }).join('')}
  ${(O.tips || []).length ? `<div class="card" style="border-left:4px solid var(--gold)"><h3>Safety Tips</h3><ul style="margin:8px 0 0 20px">${O.tips.map(t => `<li>${esc(typeof t === 'string' ? t : t.text || '')}</li>`).join('')}</ul></div>` : ''}`;
}

function licItems(){ return (cer().wedding.license || []).map((x, i) => typeof x === 'string' ? {id: 'i' + i, text: x, confirmed: true} : Object.assign({id: 'i' + i}, x, {text: x.text || x.name || x.t || ''})); }
const WHO = {couple: 'The Couple', officiant: 'The Officiant', both: 'Both'};
function vLicense(s){
  const L = licItems(), lic = s.lic = s.lic || {}, done = L.filter(x => lic[x.id]).length;
  return `${headOf(s, 'License Checklist')}
  <div class="card"><div class="spread"><h3>Minnesota Marriage License</h3><span class="cer-count">${done} of ${L.length} done</span></div>
    ${L.length ? `<ul class="cer-lic" style="margin-top:8px">${L.map(x => `<li><label><input type="checkbox" data-cerl="${esc(x.id)}"${lic[x.id] ? ' checked' : ''}><span>${x.who ? `<span class="cer-tag" style="margin:0 6px 0 0">${esc(WHO[x.who] || x.who)}</span>` : ''}<b style="font-weight:600">${esc(x.text)}</b>${x.confirmed === false ? '<span class="cer-ck">Check with the County</span>' : ''}${x.note ? `<br><small class="muted">${esc(x.note)}</small>` : ''}${x.source ? `<br><small class="muted" style="font-style:italic">Source: ${esc(x.source)}</small>` : ''}${x.link ? `<br><a href="${esc(x.link)}" target="_blank" rel="noopener noreferrer" style="font-size:15px">${esc(x.linkLabel || 'Learn more')}</a>` : ''}</span></label></li>`).join('')}</ul>` : '<p class="muted">The license checklist arrives with the next Staff library update.</p>'}</div>`;
}

function inner(){
  if (S.view !== 'home' && !cur()) S.view = 'home';
  const s = cur();
  switch (S.view){
    case 'setup': return vSetup(s);
    case 'check': return vCheck(s);
    case 'edit': return vEdit(s);
    case 'print': return vPrint(s);
    case 'obit': return famOf(s.type) === 'funeral' ? vObit(s) : vCheck(s);
    case 'license': return famOf(s.type) === 'wedding' ? vLicense(s) : vCheck(s);
    default: return vHome();
  }
}
function rerender(keepScroll){
  const r = document.getElementById('cer-root'); if (!r) return;
  const y = window.scrollY; r.innerHTML = inner();
  if (keepScroll) window.scrollTo(0, y); else window.scrollTo(0, 0);
}
function goView(v){ S.view = v; S.pick = null; rerender(); }
function updTime(){ const s = cur(), t = document.getElementById('cer-time'); if (s && t) t.outerHTML = timeBar(s); }

// ---------- printouts ----------
const PBASE = `*{box-sizing:border-box;}html,body{margin:0;}body{background:#E6DFD2;font-family:Barlow,Helvetica,Arial,sans-serif;color:#2C1810;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
.bar{position:sticky;top:0;z-index:5;display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:10px 14px;background:#2E2118;color:#F6EFE2;font-size:15px;}
.bar b{font-family:"Cormorant Garamond",Georgia,serif;font-size:20px;font-weight:600;margin-right:auto;}
.bar button{min-height:44px;padding:8px 16px;border-radius:10px;border:1.5px solid #D9A847;background:#D9A847;color:#2E2118;font:inherit;font-weight:600;cursor:pointer;}
.tip{padding:8px 14px;font-size:14px;color:#5A4B3F;text-align:center;}
.serif,h1,h2,h3{font-family:"Cormorant Garamond",Georgia,serif;}
.doc{background:#FFFCF6;max-width:8.5in;margin:14px auto 40px;padding:.7in .75in;box-shadow:0 2px 14px rgba(44,24,16,.18);}
.eb{font-family:"Barlow Condensed","Arial Narrow",sans-serif;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8B5E1A;font-size:11pt;}
.src{font-style:italic;color:#6B5A4D;font-size:.8em;margin-top:.3em;}
.notices{margin-top:2em;border-top:1px solid #DDD0B8;padding-top:.8em;font-size:9pt;color:#6B5A4D;}
.notices p{margin:.3em 0;}
@media print{.bar,.tip{display:none !important;}body{background:none;}.doc{margin:0;box-shadow:none;max-width:none;padding:0;}}`;
function openPage(title, css, body, page, tip, script){
  const fonts = new URL('/fonts/fonts.css', location.href).href;
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${esc(title)}</title><link rel="stylesheet" href="${fonts}"><style>@page{${page || 'size:letter;margin:.7in .75in;'}}${PBASE}${css || ''}</style></head><body>
<div class="bar"><b>${esc(title)}</b><button type="button" onclick="window.print()">Print or Save as PDF</button></div><div class="tip">To keep a copy, choose Save as PDF in the print window.${tip ? ' ' + esc(tip) : ''}</div>${body}${script ? `<script>${script}<\/script>` : ''}</body></html>`;
  API.last = {title, html};
  if (typeof API.printer === 'function') return API.printer(title, html);
  let w = null; try { w = window.open('', '_blank'); } catch (e) { w = null; }
  if (w && w.document){ w.document.open(); w.document.write(html); w.document.close(); try { w.focus(); } catch (e) {} return w; }
  const f = document.createElement('iframe'); f.setAttribute('aria-hidden', 'true'); f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
  document.body.appendChild(f); f.contentDocument.open(); f.contentDocument.write(html); f.contentDocument.close();
  setTimeout(() => { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) {} setTimeout(() => f.remove(), 60000); }, 900);
  return null;
}
const paras = t => String(t || '').split(/\n{2,}/).map(p => p.trim()).filter(Boolean).map(p => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`).join('');
const subline = s => { const n = names(s); return [nice(s.date), s.time, s.place].filter(Boolean).join(', '); };
const lifeLine = s => { const n = names(s); return n.Born && n.Died ? n.Born + ' to ' + n.Died : n.Born ? 'Born ' + n.Born : n.Died ? 'Died ' + n.Died : ''; };
function rdHTML(s, x, forOfficiant){
  const r = RD(x.id); if (!r) return ''; const tx = rText(r, x.ver);
  return `<div class="rd"><h3>${esc(rHead(r, tx.ver))}</h3>${r.kind !== 'scripture' && r.ref ? `<div class="src" style="font-style:normal">${esc(r.ref)}</div>` : ''}${r.bring && forOfficiant ? '<p class="src" style="font-style:normal;font-weight:600">Read from your own copy.</p>' : ''}${paras(tx.text)}${r.source ? `<div class="src">${esc(r.source)}</div>` : ''}</div>`;
}
function rdText(s, x, forOfficiant){
  const r = RD(x.id); if (!r) return ''; const tx = rText(r, x.ver);
  return [rHead(r, tx.ver), r.bring && forOfficiant ? '(Read from your own copy.)' : '', tx.text, r.source].filter(Boolean).join('\n');
}
const noticeHTML = s => { const N = usedNotices(s); return N.length ? `<div class="notices">${N.map(n => `<p>${esc(n)}</p>`).join('')}</div>` : ''; };
const byOf = e => e.by || '';
function scriptDoc(s){
  const css = `.doc{font-size:16pt;line-height:1.5;}h1{font-size:30pt;margin:.1em 0 .1em;line-height:1.1;}.meta{font-size:13pt;color:#6B5A4D;}
.part{margin-top:1.1em;padding-top:.7em;border-top:1px solid #DDD0B8;display:grid;grid-template-columns:minmax(0,1fr);gap:0 .3in;break-inside:auto;}
.part.n{grid-template-columns:minmax(0,1fr) 2.1in;}
.part h2{font-size:21pt;margin:0 0 .2em;line-height:1.15;break-after:avoid;}.part h2 small{font-family:Barlow,sans-serif;font-size:11pt;color:#8B5E1A;font-weight:600;margin-left:.4em;}
.part p{margin:.35em 0;}.rd{margin:.6em 0 .6em .2in;}.rd h3{font-size:17pt;margin:.3em 0 .1em;}
.note{font-size:11.5pt;line-height:1.4;background:#F3ECDF;border-left:3px solid #8B5E1A;padding:.5em .7em;border-radius:4px;white-space:pre-wrap;align-self:start;}
.note b{display:block;font-family:"Barlow Condensed",sans-serif;letter-spacing:1px;text-transform:uppercase;font-size:9.5pt;color:#8B5E1A;}
@media(max-width:640px){.doc{padding:24px 18px;font-size:13pt;}.part.n{grid-template-columns:minmax(0,1fr);}h1{font-size:24pt;}}`;
  const body = `<div class="doc"><div class="eb">Officiant's Script</div><h1>${esc(title(s))}</h1><div class="meta">${esc(subline(s))}${lifeLine(s) ? '<br>' + esc(lifeLine(s)) : ''}<br>About ${total(s)} minutes${names(s).Officiant ? ', led by ' + esc(names(s).Officiant) : ''}</div>
    ${onParts(s).map(e => { const p = partOf(e), o = optOf(e), w = partWords(e, s);
      const dos = doOf(e, s);
      return `<div class="part${e.note || dos.length ? ' n' : ''}"><div><h2>${esc(e.title || p.name)}<small>${minsOf(e)} min${byOf(e) ? ', ' + esc(byOf(e)) : ''}</small></h2>${paras(w)}${o && o.source && e.text == null ? `<div class="src">${esc(o.source)}</div>` : ''}${(e.rd || []).map(x => rdHTML(s, x, true)).join('')}</div>${e.note || dos.length ? `<div class="note">${dos.length ? `<b>For the Officiant</b>${esc(dos.join(' '))}` : ''}${e.note ? `<b${dos.length ? ' style="margin-top:.5em"' : ''}>Notes</b>${esc(e.note)}` : ''}</div>` : ''}</div>`; }).join('')}
    ${noticeHTML(s)}</div>`;
  return {title: "Officiant's Script", css, body};
}
function scriptText(s){
  return ["OFFICIANT'S SCRIPT", title(s), subline(s), lifeLine(s), 'About ' + total(s) + ' minutes', ''].filter((x, i) => x || i === 5).join('\n') + '\n'
    + onParts(s).map(e => { const p = partOf(e), o = optOf(e); return [(e.title || p.name).toUpperCase() + ' (' + minsOf(e) + ' min' + (byOf(e) ? ', ' + byOf(e) : '') + ')', partWords(e, s), o && o.source && e.text == null ? o.source : '', ...(e.rd || []).map(x => rdText(s, x, true)), doOf(e, s).length ? 'For the officiant: ' + doOf(e, s).join(' ') : '', e.note ? 'Notes: ' + e.note : ''].filter(Boolean).join('\n\n'); }).join('\n\n') + (usedNotices(s).length ? '\n\n' + usedNotices(s).join('\n') : '');
}
function orderRows(s){
  return onParts(s).map(e => { const p = partOf(e), rs = (e.rd || []).map(x => { const r = RD(x.id); return r ? rHead(r, rText(r, x.ver).ver) : ''; }).filter(Boolean); return {name: e.title || p.name, by: byOf(e), rs, mins: minsOf(e)}; });
}
const FIT = `(function(){function flow(){var a=document.querySelector('[data-flow-from]'),b=document.querySelector('[data-flow-to]');if(!a||!b)return;a.style.fontSize='9pt';var n=0;while(a.scrollHeight>a.clientHeight+1&&a.querySelectorAll('.rd').length>1&&n<40){var r=a.querySelectorAll('.rd');b.insertBefore(r[r.length-1],b.firstChild);n++;}}function fit(){document.querySelectorAll('[data-fit]').forEach(function(b){var f=parseFloat(b.getAttribute('data-fit'));b.style.fontSize=f+'pt';var n=0;while(b.scrollHeight>b.clientHeight+1&&f>6.5&&n<80){f-=.25;n++;b.style.fontSize=f+'pt';}if(b.scrollHeight>b.clientHeight+1){b.classList.add('toolong');var t=document.querySelector('.tip');if(t&&!t.dataset.w){t.dataset.w=1;t.textContent+=' Some words do not fit on a panel: trim a reading or the obituary in the Service Builder.';}}});}var go=function(){flow();fit();};if(document.fonts&&document.fonts.ready)document.fonts.ready.then(go);go();window.addEventListener('beforeprint',fit);})();`;
function orderDoc(s){
  const css = `.sheet{background:#FFFCF6;width:8.5in;height:11in;margin:14px auto 40px;padding:.7in .8in;box-shadow:0 2px 14px rgba(44,24,16,.18);overflow:hidden;}
.box{height:9.6in;overflow:hidden;font-size:13pt;line-height:1.4;}
h1{font-size:2.1em;margin:.1em 0;line-height:1.1;}.meta{color:#6B5A4D;}
ol{list-style:none;padding:0;margin:1em 0 0;}li{display:flex;gap:1em;justify-content:space-between;border-bottom:1px dotted #CDBFA6;padding:.45em 0;}
li .r{color:#6B5A4D;font-size:.85em;}li .w{text-align:right;color:#6B5A4D;font-size:.9em;white-space:nowrap;}.toolong{outline:2px dashed #A33D2A;}
@media print{.sheet{margin:0;box-shadow:none;}.toolong{outline:0;}}@media(max-width:860px){.sheet{zoom:.45;}}`;
  const body = `<div class="sheet"><div class="box" data-fit="13"><div class="eb">${esc(orderName(s))}</div><h1>${esc(title(s))}</h1><div class="meta">${esc(subline(s))}<br>About ${total(s)} minutes${names(s).Officiant ? '. Officiant: ' + esc(names(s).Officiant) : ''}</div>
    <ol>${orderRows(s).map((r, i) => `<li><span><b>${i + 1}. ${esc(r.name)}</b>${r.rs.length ? `<br><span class="r">${esc(r.rs.join('; '))}</span>` : ''}</span><span class="w">${r.by ? esc(r.by) + '<br>' : ''}${r.mins} min</span></li>`).join('')}</ol></div></div>`;
  return {title: orderName(s), css, body, page: 'size:letter;margin:0;', script: FIT};
}
const orderName = s => famOf(s.type) === 'blessing' ? 'Order of Blessing' : 'Order of Service';
function orderText(s){ return [orderName(s).toUpperCase(), title(s), subline(s), 'About ' + total(s) + ' minutes', ''].join('\n') + '\n' + orderRows(s).map((r, i) => `${i + 1}. ${r.name}${r.by ? ', ' + r.by : ''} (${r.mins} min)${r.rs.length ? '\n   ' + r.rs.join('; ') : ''}`).join('\n'); }
function progObit(s){ if (famOf(s.type) !== 'funeral' || (s.prog || {}).obit === false) return ''; const d = (s.obit || {}).d || {}; return d.newspaper || d.notice || d.online || ''; }
function programDoc(s){
  const n = names(s), fam = famOf(s.type), allRd = []; onParts(s).forEach(e => (e.rd || []).forEach(x => { if (RD(x.id)) allRd.push(x); }));
  const css = `.sh{width:11in;height:8.5in;margin:14px auto 6px;background:#FFFCF6;display:grid;grid-template-columns:5.5in 5.5in;box-shadow:0 2px 14px rgba(44,24,16,.18);}
.lab{text-align:center;font-size:13px;color:#5A4B3F;margin-top:14px;}
.pn{height:8.5in;padding:.5in .5in;overflow:hidden;position:relative;}
.pn + .pn{border-left:1px dashed #E2D8C6;}
.box{height:7.5in;overflow:hidden;font-size:11pt;line-height:1.4;}
.cover{text-align:center;display:flex;flex-direction:column;justify-content:center;}
.cover img{width:3.3in;height:3.6in;object-fit:cover;border-radius:6px;margin:0 auto .25in;display:block;}
.cover h1{font-size:2.6em;line-height:1.05;margin:.1em 0;}.cover .d{font-size:1.15em;color:#6B5A4D;}.cover .l{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:1.3em;margin-top:.15in;}
h2{font-size:1.7em;margin:0 0 .3em;color:#8B5E1A;}
ol{list-style:none;padding:0;margin:0;}li{border-bottom:1px dotted #CDBFA6;padding:.35em 0;}li small{display:block;color:#6B5A4D;}
.rd{margin:0 0 .8em;}.rd h3{font-size:1.25em;margin:0 0 .1em;}.rd p{margin:.25em 0;}
.ob p{margin:.3em 0;}.thanks{margin-top:1em;font-family:"Cormorant Garamond",serif;font-style:italic;font-size:1.2em;}
.toolong{outline:2px dashed #A33D2A;}
@media print{.toolong{outline:0;}.lab,.bar,.tip{display:none !important;}.sh{margin:0;box-shadow:none;break-after:page;}.pn + .pn{border-left:0;}}
@media(max-width:1100px){.sh{zoom:.4;}}`;
  const cover = `<div class="pn cover"><div class="box" data-fit="11" style="display:flex;flex-direction:column;justify-content:center">${s.photo ? `<img src="${s.photo}" alt="">` : ''}<div class="eb">${fam === 'wedding' ? (s.type === 'wedding' ? 'The Wedding of' : esc(typeOf(s.type).name)) : fam === 'blessing' ? esc(typeOf(s.type).cover || typeOf(s.type).name) : 'In Loving Memory'}</div>
    <h1>${esc(fam === 'wedding' ? [n.Partner1Full, n.Partner2Full].filter(Boolean).join(' and ') || title(s) : n.Name || title(s))}</h1>${fam !== 'wedding' && lifeLine(s) ? `<div class="d">${esc(lifeLine(s))}</div>` : ''}<div class="l">${esc(subline(s))}</div></div></div>`;
  const order = `<div class="pn"><div class="box" data-fit="11"><h2>${esc(orderName(s))}</h2><ol>${orderRows(s).map(r => `<li><b>${esc(r.name)}</b>${r.by ? ', ' + esc(r.by) : ''}${r.rs.length ? `<small>${esc(r.rs.join('; '))}</small>` : ''}</li>`).join('')}</ol>${n.Officiant ? `<p style="margin-top:1em;color:#6B5A4D">Officiant: ${esc(n.Officiant)}</p>` : ''}</div></div>`;
  const readings = `<div class="pn"><div class="box" data-fit="11" data-flow-from="1">${allRd.length ? `<h2>Readings</h2>${allRd.map(x => rdHTML(s, x)).join('')}` : ''}</div></div>`;
  const ob = progObit(s);
  const back = `<div class="pn"><div class="box" data-fit="11"><div data-flow-to="1"></div>${ob ? `<h2>${esc(n.Name || 'In Memory')}</h2><div class="ob">${paras(ob)}</div>` : ''}<p class="thanks">${fam === 'wedding' ? 'Thank you for being here to celebrate with us.' : fam === 'blessing' ? 'Thank you for being here to share this blessing.' : 'The family thanks you for your love and presence.'}</p>${noticeHTML(s)}</div></div>`;
  const body = `<div class="lab">Outside: print this side first</div><div class="sh">${back}${cover}</div><div class="lab">Inside: print on the back, then fold in half</div><div class="sh">${order}${readings}</div>`;
  return {title: 'Program', css, body, page: 'size:11in 8.5in;margin:0;', script: FIT, tip: 'Print both sides, flipping on the short edge, then fold in half.'};
}
function programText(s){
  const allRd = []; onParts(s).forEach(e => (e.rd || []).forEach(x => { if (RD(x.id)) allRd.push(x); }));
  const ob = progObit(s);
  return [title(s), lifeLine(s), subline(s), '', orderName(s).toUpperCase(), orderRows(s).map(r => r.name + (r.by ? ', ' + r.by : '') + (r.rs.length ? ' (' + r.rs.join('; ') + ')' : '')).join('\n'), allRd.length ? '\nREADINGS\n' + allRd.map(x => rdText(s, x)).join('\n\n') : '', ob ? '\n' + ob : '', usedNotices(s).join('\n')].filter((x, i) => x || i === 3).join('\n');
}
function familyDoc(s){
  const css = `.doc{font-size:12.5pt;line-height:1.55;}h1{font-size:26pt;margin:.1em 0;line-height:1.1;}.meta{color:#6B5A4D;}
.intro{background:#F3ECDF;border-radius:6px;padding:.6em .9em;margin:1em 0;}
.part{margin-top:1em;padding-top:.6em;border-top:1px solid #DDD0B8;}.part h2{font-size:17pt;margin:0 0 .2em;}.part p{margin:.3em 0;}.rd{margin:.5em 0 .5em .2in;}.rd h3{font-size:14pt;margin:.2em 0 .1em;}
.lines{margin-top:1.4em;}.lines div{border-bottom:1px solid #9C8B76;height:2em;}.sign{display:grid;grid-template-columns:2fr 1fr;gap:.4in;margin-top:2.4em;}.sign div{border-top:1px solid #2C1810;padding-top:.3em;font-size:10pt;color:#6B5A4D;}
@media(max-width:640px){.doc{padding:24px 18px;}}`;
  const body = `<div class="doc"><div class="eb">Family Copy, a Draft for Your Approval</div><h1>${esc(title(s))}</h1><div class="meta">${esc(subline(s))}</div>
    <div class="intro">Here is the ${famOf(s.type) === 'blessing' ? 'blessing' : 'service'} as we have it so far. Read it through, mark anything you would like changed, added, or left out, and send it back. Every word can still change.</div>
    ${onParts(s).map(e => { const p = partOf(e); return `<div class="part"><h2>${esc(e.title || p.name)}</h2>${paras(partWords(e, s))}${(e.rd || []).map(x => rdHTML(s, x)).join('')}</div>`; }).join('')}
    <h2 style="margin-top:1.4em;font-size:17pt">Changes or Notes</h2><div class="lines"><div></div><div></div><div></div><div></div></div>
    <div class="sign"><div>Approved by</div><div>Date</div></div>${noticeHTML(s)}</div>`;
  return {title: 'Family Copy', css, body};
}
function familyText(s){
  return ['FAMILY COPY, A DRAFT FOR YOUR APPROVAL', title(s), subline(s), '', 'Here is the ' + (famOf(s.type) === 'blessing' ? 'blessing' : 'service') + ' as we have it so far. Mark anything you would like changed, added, or left out, and send it back.', ''].join('\n') + '\n'
    + onParts(s).map(e => [(e.title || partOf(e).name).toUpperCase(), partWords(e, s), ...(e.rd || []).map(x => rdText(s, x))].filter(Boolean).join('\n\n')).join('\n\n') + (usedNotices(s).length ? '\n\n' + usedNotices(s).join('\n') : '');
}
// The Keepsake Copy (blessings): the parts marked keep in the library (the blessing, the naming, the promises), with their readings; no directions or notes.
function keepParts(s){ const on = onParts(s), k = on.filter(e => partOf(e).keep); return k.length ? k : on; }
function keepDoc(s){
  const n = names(s), t = typeOf(s.type), who = (s.who || {}).family;
  const css = `.doc{font-size:14pt;line-height:1.6;text-align:center;border:3px double #8B5E1A;padding:.8in .9in;}h1{font-size:30pt;margin:.1em 0 .1em;line-height:1.1;}.meta{color:#6B5A4D;font-style:italic;font-family:"Cormorant Garamond",Georgia,serif;font-size:15pt;}
.part{margin-top:1.1em;}.part p{margin:.35em 0;}.rd{margin:.8em 0;}.rd h3{font-size:15pt;margin:.2em 0;}.sign{display:grid;grid-template-columns:2fr 1fr;gap:.4in;margin-top:2.2em;text-align:left;}.sign div{border-top:1px solid #2C1810;padding-top:.3em;font-size:10pt;color:#6B5A4D;}
@media(max-width:640px){.doc{padding:28px 20px;font-size:12.5pt;}h1{font-size:24pt;}}`;
  const body = `<div class="doc"><div class="eb">${esc(t.cover || t.name)}</div><h1>${esc(n.Name || title(s))}</h1><div class="meta">${esc([who, subline(s)].filter(Boolean).join(', '))}</div>
    ${keepParts(s).map(e => { const o = optOf(e); return `<div class="part">${paras(partWords(e, s))}${o && o.source && e.text == null ? `<div class="src">${esc(o.source)}</div>` : ''}${(e.rd || []).map(x => rdHTML(s, x)).join('')}</div>`; }).join('')}
    <div class="sign"><div>Blessed by${n.Officiant ? ' ' + esc(n.Officiant) : ''}</div><div>Date</div></div>${noticeHTML(s)}</div>`;
  return {title: 'Keepsake Copy', css, body};
}
function keepText(s){
  const t = typeOf(s.type), who = (s.who || {}).family;
  return [(t.cover || t.name).toUpperCase(), names(s).Name || title(s), [who, subline(s)].filter(Boolean).join(', '), ''].join('\n') + '\n'
    + keepParts(s).map(e => [partWords(e, s), optOf(e) && optOf(e).source && e.text == null ? optOf(e).source : '', ...(e.rd || []).map(x => rdText(s, x))].filter(Boolean).join('\n\n')).join('\n\n') + (usedNotices(s).length ? '\n\n' + usedNotices(s).join('\n') : '');
}
const DOCS = {script: [scriptDoc, scriptText], order: [orderDoc, orderText], program: [programDoc, programText], family: [familyDoc, familyText], keep: [keepDoc, keepText]};
function printKind(k){ const s = cur(); if (!s || !DOCS[k]) return;
  const n = onParts(s).reduce((a, e) => a + brackets(partWords(e, s)).length, 0);
  if (n && k !== 'order' && !confirm(n + (n === 1 ? ' place' : ' places') + ' in [square brackets] still need your words. You can fill them in the Editor. Print anyway?')) return;
  const d = DOCS[k][0](s); openPage(d.title + ', ' + title(s), d.css, d.body, d.page, d.tip, d.script); }
function obitPrint(id){
  const s = cur(), sh = (cer().obituary.shapes || []).find(x => x.id === id); if (!s || !sh) return;
  const t = ((s.obit || {}).d || {})[id] || draftOf(s, sh);
  openPage(sh.name + ', ' + (names(s).Name || title(s)), `.doc{font-size:13pt;line-height:1.55;}h1{font-size:24pt;margin:.1em 0 .4em;}`, `<div class="doc"><div class="eb">${esc(sh.name)}</div><h1>${esc(names(s).Name || title(s))}</h1>${paras(t)}</div>`);
}

// ---------- photo ----------
function photoIn(file){
  if (!file) return;
  const s = cur(), rd = new FileReader();
  rd.onload = () => { const im = new Image(); im.onload = () => { const k = Math.min(1, 900 / Math.max(im.width, im.height)), c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); s.photo = c.toDataURL('image/jpeg', .82); keep(s); rerender(true); toast('Photo added.'); }; im.onerror = () => toast("That photo didn't open. Try another."); im.src = rd.result; };
  rd.readAsDataURL(file);
}

// ---------- actions ----------
const entry = k => { const s = cur(); return s ? s.parts.find(e => e.k === k) : null; };
function setField(s, path, v){ const [a, b] = path.split('.'); if (b){ s[a] = s[a] || {}; s[a][b] = v; } else s[a] = v; }
function begin(){
  const s = cur(); if (!s) return;
  if (S.draft){ delete s._tmpl; delete s._fam; build(s, false); list().push(s); S.id = s.id; S.draft = null; keep(s); goView('check'); return; }
  const famNow = famOf(s.type), famWas = s._fam || famNow;
  if (s.template !== (s._tmpl == null ? s.template : s._tmpl) || famNow !== famWas){
    if (confirm('Rebuild the checklist for this setup? Notes and readings you added stay with their parts.')) build(s, true);
  } else reapply(s);
  delete s._tmpl; delete s._fam; keep(s); goView('check');
}
function move(k, dir){
  const s = cur(), on = onParts(s), i = on.findIndex(e => e.k === k), j = i + dir; if (i < 0 || j < 0 || j >= on.length) return;
  const a = s.parts.indexOf(on[i]), b = s.parts.indexOf(on[j]); s.parts.splice(a, 1); s.parts.splice(s.parts.indexOf(on[j]) + (dir > 0 ? 1 : 0), 0, on[i]);
  keep(s); rerender(true);
}
function dropOn(fromK, toK, after){
  const s = cur(); if (!s || fromK === toK) return;
  const e = s.parts.find(x => x.k === fromK), t = s.parts.find(x => x.k === toK); if (!e || !t) return;
  s.parts.splice(s.parts.indexOf(e), 1); s.parts.splice(s.parts.indexOf(t) + (after ? 1 : 0), 0, e); keep(s); rerender(true);
}
function act(k, v, el){
  const s = cur();
  switch (k){
    case 'home': if (S.draft && (S.draft.who.name || S.draft.p1.name) && !confirm('Leave this setup? It is saved once you start the checklist.')) return; S.draft = null; S.id = null; goView('home'); return;
    case 'new': { S.draft = newSvc(v); S.id = null; goView('setup'); return; }
    case 'open': { S.id = v; S.draft = null; const x = cur(); goView(x && x.parts.length ? 'check' : 'setup'); return; }
    case 'dup': { const x = list().find(y => y.id === v); if (!x) return; const c = JSON.parse(JSON.stringify(x)); c.id = uid(); c.made = Date.now(); c.title = title(x) + ' (Copy)'; c.status = 'draft'; c.parts.forEach(e => { e.k = uid(); }); list().push(c); keep(c); toast('Copy made.'); rerender(true); return; }
    case 'del': { const x = list().find(y => y.id === v); if (!x || !confirm('Delete "' + title(x) + '"? This removes it from this device.')) return; const d = D(); d.deleted = d.deleted || {clients: {}, sessions: {}}; d.deleted.cer = d.deleted.cer || {}; d.deleted.cer[x.id] = Date.now(); d.cer.services = list().filter(y => y !== x); CTX.save(); toast('Deleted.'); rerender(true); return; }
    case 'go': if (s && S.view === 'setup' && !S.draft && v !== 'setup'){ begin(); if (v !== 'check') goView(v); return; } goView(v); return;
    case 'status': s.status = v; keep(s); rerender(true); return;
    case 'type': { if (s._fam == null) s._fam = famOf(s.type); if (s._tmpl == null) s._tmpl = s.template; s.type = v; const T = cer().templates.find(t => t.id === s.template); if (T && !arr(T.type).includes(v)) s.template = ''; keep(s); rerender(true); return; }
    case 'pron': s.who.pron = v; keep(s); rerender(true); return;
    case 'tone': case 'age': case 'setting': s.setup[k] = s.setup[k] === v ? '' : v; keep(s); rerender(true); return;
    case 'length': s.setup.length = +v; keep(s); rerender(true); return;
    case 'honors': case 'speakers': { const a = arr(s.setup[k]).map(String); s.setup[k] = a.includes(v) ? a.filter(x => x !== v) : a.concat(v); keep(s); rerender(true); return; }
    case 'bible': s.bible = v; keep(s); rerender(true); return;
    case 'tmpl': { if (s._tmpl == null) s._tmpl = s.template; s.template = v; const T = cer().templates.find(t => t.id === v); if (T && T.length) s.setup.length = +T.length; keep(s); rerender(true); return; }
    case 'begin': begin(); return;
    case 'again': { const e = entry(v); if (!e) return; const p = partOf(e), n = mkEntry(p, true, null, s); n.touched = true; s.parts.splice(s.parts.indexOf(e) + 1, 0, n); keep(s); rerender(true); return; }
    case 'custom': { const nm = (document.getElementById('cer-cn') || {}).value || '', g = (document.getElementById('cer-cg') || {}).value || ''; if (!nm.trim()) { toast('Give the part a name first.'); return; }
      const e = {k: uid(), part: 'custom', custom: {name: nm.trim(), group: g}, on: true, touched: true, note: '', rd: [], text: ''};
      const groups = groupsFor(famOf(s.type)).map(x => x.id), gi = groups.indexOf(g); let at = s.parts.length; s.parts.forEach((x, i) => { if (groups.indexOf(partOf(x).group) <= gi) at = i + 1; });
      s.parts.splice(at, 0, e); keep(s); rerender(true); toast('Part added.'); return; }
    case 'pick': S.pick = v || null; S.pq = ''; S.pmore = 0; S.pk = 'all'; S.pall = false; rerender(true); if (v){ const q = document.getElementById('cer-pq'); if (q) q.focus({preventScroll: true}); } return;
    case 'pk': S.pk = v; S.pmore = 0; { const e = entry(S.pick), l = document.getElementById('cer-pick-list'); if (e && l){ l.innerHTML = pickList(s, e); document.querySelectorAll('#cer-pick [data-cer="pk"]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === v))); } } return;
    case 'pmore': S.pmore += 30; { const e = entry(S.pick), l = document.getElementById('cer-pick-list'); if (e && l) l.innerHTML = pickList(s, e); } return;
    case 'rd-add': { const i = v.indexOf('|'), e = entry(v.slice(0, i)), id = v.slice(i + 1), r = RD(id); if (!e || !r) return; e.rd = e.rd || [];
      if (e.rd.some(x => x.id === id)){ toast('Already added.'); return; }
      e.rd.push({id, ver: r.versions ? (r.versions[s.bible] && !offIds().includes(s.bible) ? s.bible : 'kjv') : null}); e.touched = true; keep(s); S.pick = null; rerender(true); toast('Reading added.'); return; }
    case 'rd-x': { const [ek, i] = v.split('|'), e = entry(ek); if (!e) return; e.rd.splice(+i, 1); keep(s); rerender(true); return; }
    case 'up': move(v, -1); return;
    case 'down': move(v, 1); return;
    case 'off': { const e = entry(v); if (!e) return; e.on = false; e.touched = true; keep(s); rerender(true); toast('Taken out. Turn it back on in the Checklist.'); return; }
    case 'reset': { const e = entry(v); if (!e || !confirm('Go back to the library words for this part? Your edits to its words are let go.')) return; e.text = null; delete e.tn; keep(s); rerender(true); return; }
    case 'pr': printKind(v); return;
    case 'cp': if (DOCS[v]) copyText(DOCS[v][1](s)); return;
    case 'photo-x': if (confirm('Remove the cover photo?')){ delete s.photo; keep(s); rerender(true); } return;
    case 'obit-make': { const O = cer().obituary, d = s.obit.d = s.obit.d || {}; const edited = (O.shapes || []).some(sh => d[sh.id] && s.obit.e && s.obit.e[sh.id]);
      if (edited && !confirm('Make fresh drafts? Changes you typed into the drafts are replaced.')) return;
      (O.shapes || []).forEach(sh => { d[sh.id] = draftOf(s, sh); }); s.obit.e = {}; keep(s); rerender(true); toast('Drafts ready.'); return; }
    case 'obit-cp': { const sh = (cer().obituary.shapes || []).find(x => x.id === v); copyText(((s.obit || {}).d || {})[v] || (sh ? draftOf(s, sh) : '')); return; }
    case 'obit-pr': obitPrint(v); return;
  }
  if (k.startsWith('opt|')){ const e = entry(k.slice(4)); if (!e) return; e.option = e.option === v && partOf(e).say ? null : v; e.touched = true; keep(s); rerender(true); }
}

// The session guides' button carries data-tab="ceremonies", so the Field Guide opens the tab; this sets Setup on its type first.
// Tapping the Ceremonies tab while it is open returns to the Ceremonies home, like the other tabs' cards.
document.addEventListener('click', e => {
  const g = e.target.closest && e.target.closest('[data-cer="from-guide"]'); if (g){ S.startType = g.dataset.v; return; }
  const tb = e.target.closest && e.target.closest('#tabs [data-tab="ceremonies"]');
  if (tb && document.getElementById('cer-root') && !S.draft){ S.view = 'home'; S.id = null; S.pick = null; }
}, true);
document.addEventListener('click', e => {
  const t = e.target.closest && e.target.closest('[data-cer]'); if (!t || !t.closest('#cer-root')) return;
  e.preventDefault(); act(t.dataset.cer, t.dataset.v || '', t);
});
document.addEventListener('change', e => {
  const t = e.target; if (!t.closest || !t.closest('#cer-root')) return; const s = cur(); if (!s) return;
  if (t.dataset.cerc){ const x = entry(t.dataset.cerc); if (!x) return; x.on = t.checked; x.touched = true; if (x.on && !x.option && !partOf(x).say && (partOf(x).options || []).length) x.option = fitOpt(partOf(x), s); keep(s); rerender(true); return; }
  if (t.dataset.cers){ s.setup[t.dataset.cers] = t.value; keep(s); rerender(true); return; }
  if (t.dataset.cerv){ const [ek, i] = t.dataset.cerv.split('|'), x = entry(ek); if (x && x.rd[+i]){ x.rd[+i].ver = t.value; keep(s); rerender(true); } return; }
  if (t.dataset.cerl){ s.lic = s.lic || {}; if (t.checked) s.lic[t.dataset.cerl] = Date.now(); else delete s.lic[t.dataset.cerl]; keep(s); rerender(true); return; }
  if (t.dataset.cerPall){ S.pall = t.checked; S.pmore = 0; const x = entry(S.pick), l = document.getElementById('cer-pick-list'); if (x && l) l.innerHTML = pickList(s, x); return; }
  if (t.dataset.cerPo){ s.prog = s.prog || {}; s.prog.obit = t.checked; keep(s); return; }
  if (t.dataset.cerph && t.files && t.files[0]){ photoIn(t.files[0]); return; }
  if (t.dataset.cere && /^mins\|/.test(t.dataset.cere)){ rerender(true); }
});
document.addEventListener('input', e => {
  const t = e.target; if (!t.closest || !t.closest('#cer-root')) return; const s = cur(); if (!s) return;
  if (t.dataset.cern){ const x = entry(t.dataset.cern); if (x){ x.note = t.value; x.touched = true; keep(s); } return; }
  if (t.dataset.cerf){ setField(s, t.dataset.cerf, t.value); keep(s); return; }
  if (t.dataset.cerq){ S.pq = t.value; S.pmore = 0; const x = entry(S.pick), l = document.getElementById('cer-pick-list'); if (x && l) l.innerHTML = pickList(s, x); return; }
  if (t.dataset.cero){ s.obit = s.obit || {a: {}, d: {}}; s.obit.a = s.obit.a || {}; s.obit.a[t.dataset.cero] = t.value; keep(s); return; }
  if (t.dataset.cerod){ s.obit.d = s.obit.d || {}; s.obit.d[t.dataset.cerod] = t.value; s.obit.e = s.obit.e || {}; s.obit.e[t.dataset.cerod] = 1; keep(s); const c = t.closest('.card').querySelector('.cer-count'); if (c) c.textContent = c.textContent.replace(/^\d+ words/, words(t.value) + ' words'); return; }
  if (t.dataset.cere){ const [f, ek] = t.dataset.cere.split('|'), x = entry(ek); if (!x) return;
    if (f === 'text'){ x.text = t.value; x.tn = snap(s); }
    else if (f === 'mins'){ x.mins = t.value === '' ? null : Math.max(0, +t.value || 0); updTime(); }
    else x[f] = t.value;
    x.touched = true; keep(s);
    if (f === 'text'){ const b = document.getElementById('cer-br-' + ek); if (b) b.innerHTML = bracketNote(t.value); } }
});
// drag to reorder in the Editor
document.addEventListener('dragstart', e => { const it = e.target.closest && e.target.closest('#cer-root [data-cerd]'); if (!it) return; if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return; S.dragK = it.dataset.cerd; it.classList.add('drag'); try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', S.dragK); } catch (x) {} });
document.addEventListener('dragover', e => { const it = e.target.closest && e.target.closest('#cer-root [data-cerd]'); if (!it || !S.dragK) return; e.preventDefault(); document.querySelectorAll('#cer-root .cer-ed-item.over').forEach(x => x !== it && x.classList.remove('over')); it.classList.add('over'); });
document.addEventListener('drop', e => { const it = e.target.closest && e.target.closest('#cer-root [data-cerd]'); if (!it || !S.dragK) return; e.preventDefault(); const r = it.getBoundingClientRect(), after = e.clientY > r.top + r.height / 2, k = S.dragK; S.dragK = null; dropOn(k, it.dataset.cerd, after); });
document.addEventListener('dragend', () => { S.dragK = null; document.querySelectorAll('#cer-root .drag,#cer-root .over').forEach(x => x.classList.remove('drag', 'over')); });

// The time bar sticks just under the Field Guide's own sticky header (the app bar and the tabs).
function headTop(){ const h = document.querySelector('header.bar'), r = document.getElementById('cer-root'); if (h && r) r.style.setProperty('--cer-top', h.offsetHeight + 'px'); }
window.addEventListener('resize', headTop);
(function(){ const s = document.createElement('style'); s.id = 'cer-css'; s.textContent = CSS; document.head.appendChild(s); })();

// The session guides that open the Service Builder (funeral, memorial, celebration of life, graveside, wedding, vow renewal, blessings, vigil).
function guideType(g){
  if (!g) return null;
  const x = ((g.id || '') + ' ' + (g.title || '')).toLowerCase(), has = id => cer().types.some(t => t.id === id) ? id : null;
  if (/renewal/.test(x)) return has('renewal') || has('wedding');
  if (/elope/.test(x)) return has('elopement') || has('wedding');
  if (/wedding/.test(x)) return has('wedding');
  if (/celebration.of.life/.test(x)) return has('celebration') || has('funeral');
  if (/memorial/.test(x)) return has('memorial') || has('funeral');
  if (/graveside|committal/.test(x)) return has('graveside') || has('funeral');
  if (/infant/.test(x)) return has('infant-loss') || has('funeral');
  if (/funeral/.test(x)) return has('funeral');
  if (/vigil sitting/.test(x)) return has('bedside-blessing');
  if (/bless/.test(x)) return has('house-blessing');
  return null;
}

const API = window.GGCer = {
  // ctx: {lib, data, save}. A different DATA (another unlock) starts fresh at the Ceremonies home.
  view(ctx){
    ctx = ctx || {};
    if (CTX.data && ctx.data !== CTX.data){ S.view = 'home'; S.id = null; S.draft = null; S.pick = null; }
    CTX = {lib: ctx.lib || null, data: ctx.data || null, save: typeof ctx.save === 'function' ? ctx.save : () => {}};
    if (S.startType){ const t = S.startType; S.startType = null; if (cer().types.some(x => x.id === t)){ S.draft = newSvc(t); S.id = null; S.view = 'setup'; } }
    setTimeout(headTop, 0);
    return `<div id="cer-root">${inner()}</div>`;
  },
  guideButton(g, lib){ if (lib) CTX.lib = lib; const t = guideType(g); return t ? `<button type="button" class="btn btn-line" data-tab="ceremonies" data-cer="from-guide" data-v="${esc(t)}">Open the Service Builder</button>` : ''; },
  // Backups: services combine like saved decks; the newest copy of each wins and deleted ones stay deleted.
  merge(out, inc){
    out.deleted = out.deleted || {clients: {}, sessions: {}}; out.deleted.cer = out.deleted.cer || {};
    Object.entries((inc.deleted || {}).cer || {}).forEach(([id, ts]) => { out.deleted.cer[id] = Math.max(out.deleted.cer[id] || 0, ts); });
    out.cer = out.cer || {services: []}; out.cer.services = out.cer.services || []; let added = 0, updated = 0;
    ((inc.cer || {}).services || []).forEach(x => { const i = out.cer.services.findIndex(y => y.id === x.id); if (i < 0){ out.cer.services.push(x); added++; } else if ((x.u || 0) > (out.cer.services[i].u || 0)){ out.cer.services[i] = x; updated++; } });
    out.cer.services = out.cer.services.filter(x => !(out.deleted.cer[x.id] && out.deleted.cer[x.id] >= (x.u || 0)));
    return {added, updated};
  },
  // For tests and the lead.
  state: S, data: cer, fill, draftOf, ruleOn, docs: DOCS, printer: null, last: null, lastCopy: null,
  current: cur
};
})();
