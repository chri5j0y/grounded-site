// =====================================================================
// GROUNDED FIELD GUIDE (TM): Premarital Sessions 2, the Premarital tab (GWG BLD 750, CER 3; GWG BLD 751).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// A Staff and Founder tab for leading The Grounded Marriage, Grounded's own premarital program (six two-hour
// sessions, interfaith and built to each couple's faith): a couples list; a Before Session 1 checklist; for each
// couple the six session plans (goals, the minute by minute plan as a checklist, The Couple Workbook chapter, the
// videos, Practices for Two, Try This Week) and notes; Reading the Results and When to Add Sessions or Refer;
// an hours log toward 12; Bring In Their Card (the couple's cards from The Grounded Marriage app, v1 and v2,
// unlocked by the word only the two of them know, shown read only with their yes recorded); Strengths and Growing
// Edges in Session 2; each partner's faith background shaping Session 6; the Educator's Statement for the
// Minnesota reduced license fee (with a per couple switch, Also using PREPARE/ENRICH); and the couple's
// Certificate of Completion. Leaders' names come from Settings and the couple's record.
// Data: the Staff library's premarital key (LIB.premarital), with a small built-in fallback so the tab works
// before that library update is applied. A Field-tier Premarital Guide (GWG BLD 752) has no Staff library, so the
// Field Guide passes ctx.field and the tab reads FLD.premaritalGuide.program (the same shape) instead; its
// statement.defaults leaves the letterhead blank for the Guide's own Settings (pmRole, pmOrg, pmAddress, pmPhone). App data (questions, GMCore, results, faith) loads from ../marriage/.
// Couples live in DATA.pm.couples: encrypted with the rest of this device's records and carried in backups
// (merged by GGPm.merge). Nothing is sent.
// GWG BLD 753, The Grounded Marriage: Essentials: each couple has program 'full' (the default; older couples read
// as full) or 'essentials' (premarital.essentials: three two-hour sessions keyed e1 to e3, a 6 hour target, and its
// own Certificate of Completion). The Educator's Statement prints only at 12 logged hours, for every couple. The
// Upgrade to the Full Program moves an Essentials couple to full with c.upg {on, from, deeper: [full session
// numbers chosen to go deeper]}; their logged hours stay, and each full session shows the Essentials session that
// covered it. Log rows for Essentials sessions carry n 'e1' to 'e3'; full sessions keep their numbers.
// =====================================================================
(function(){
'use strict';

// ---------- the built-in fallback (the plan's shape, short) ----------
const FB = {
  title: 'Premarital Sessions',
  program: 'The Grounded Marriage',
  lead: 'The Grounded Marriage: twelve hours with the two of you, in six two-hour sessions. The full session plans arrive with the next Staff library update.',
  app: {name: 'The Grounded Marriage', link: 'https://growwithgrounded.com/marriage/'},
  sessions: [
    [1, 'Your Story and Your Hopes', ['expect', 'fun', 'dreams'], {safety: true}],
    [2, 'Your Strengths and Growing Edges', ['expect', 'home', 'family'], {results: true}],
    [3, 'Speaking and Listening', ['talk', 'close'], {}],
    [4, 'Conflict and Repair', ['repair', 'health'], {}],
    [5, 'Money, Families, and Home', ['money', 'family', 'home'], {}],
    [6, 'Meaning, Children, and the Road Ahead', ['faith', 'kids', 'close', 'dreams'], {faith: true, finish: true}]
  ].map(([n, title, btvAreas, x]) => Object.assign({n, title, mins: 120, goals: [], outline: [[120, 'The full plan for this session arrives with the next Staff library update.']], practice: '', bridge: '', btvAreas}, x)),
  before: {title: 'Before Session 1', lead: '', items: [
    {id: 'link', title: 'Send the App Link', text: 'Send both partners growwithgrounded.com/marriage/.'},
    {id: 'finish', title: 'Both Finish Before the Vows', text: 'Each partner answers privately.'},
    {id: 'card', title: 'Bring In Their Cards', text: 'Each partner sends a card link; the couple types their shared word.'},
    {id: 'read', title: 'Read the Results (About 30 Minutes)', text: 'Read Strengths and Growing Edges in Session 2 and Talk About This on Their Card.'}]},
  results: {title: 'Reading the Results', lead: '', tips: []},
  refer: {title: 'When to Add Sessions or Refer', lead: '', items: []},
  faith: {title: 'Built to Their Faith', lead: '', none: 'No faith background is named yet. Use Plain wording until you know.', one: '', two: 'Two backgrounds in one home. Honor both.', ask: ''},
  pe: {label: 'Also using PREPARE/ENRICH', lead: 'With this on, the Educator\'s Statement names both inventories.'},
  certificate: {title: 'Certificate of Completion', program: 'The Grounded Marriage', lead: '', presented: 'Presented to', for: 'for completing', text: '{hours} hours of premarital education in six sessions', wish: '', led: 'Led by',
    fields: [['names', 'The Couple\'s Names'], ['hours', 'Hours'], ['leaders', 'Leaders\' Names'], ['date', 'Date']]},
  hours: {target: 12, note: 'Minnesota asks for at least 12 hours of premarital education, including a premarital inventory and the teaching of communication and conflict management skills.'},
  statement: {
    title: 'Educator\'s Statement',
    intro: 'For the reduced marriage license fee, the couple brings this statement when they apply. It is signed and dated by the educator, on letterhead, and notarized or marked with a church seal.',
    text: 'I, {educator}, confirm that {names} received at least 12 hours of premarital education that included the use of a premarital inventory and the teaching of communication and conflict management skills. I am a licensed or ordained minister, a person authorized to solemnize marriages under Minnesota Statutes, section 517.18, or a person licensed to practice marriage and family therapy under Minnesota Statutes, section 148B.33.',
    fields: [['p1', 'First Partner\'s Full Name'], ['p2', 'Second Partner\'s Full Name'], ['educator', 'Educator\'s Full Name'], ['role', 'Educator\'s Title or Credential'], ['org', 'Organization (the Letterhead)'], ['address', 'Address'], ['phone', 'Phone'], ['start', 'First Session Date'], ['end', 'Last Session Date'], ['hours', 'Hours of Premarital Education'], ['inventory', 'Premarital Inventory Used'], ['signed', 'Date Signed']],
    inventory: 'The Grounded Marriage inventory (Before the Vows)',
    inventoryPE: 'The Grounded Marriage inventory (Before the Vows) and PREPARE/ENRICH',
    seal: 'Sign and date in front of a notary, or mark the statement with the church seal. Print it on the educator\'s letterhead.',
    fee: {standard: 125, reduced: 50, confirmed: false}
  },
  card: {lead: 'If the couple wants to, they can share their cards from The Grounded Marriage app with you. Paste one card link from each partner, then let the couple type the word only the two of them know.', yes: 'Both partners said yes to sharing this card with us for our sessions.'},
  safety: {lead: 'Meet with each partner alone for a few minutes. Whatever they share stays with them. Give each person these lines privately.', lines: [['Love Is Respect', 'Call 1-866-331-9474 or text LOVEIS to 22522'], ['National Domestic Violence Hotline', 'Call 1-800-799-7233'], ['Day One (Minnesota)', 'Call 1-866-223-1111'], ['988 Suicide and Crisis Lifeline', 'Call or text 988'], ['Emergency', 'Call 911']]},
  credits: []
};
// Area names, used until marriage/questions.js loads.
const AREAS = {talk: 'Talking and Listening', repair: 'Conflict and Repair', money: 'Money', family: 'Families and In-Laws', home: 'Home and Roles', expect: 'Hopes and Expectations', close: 'Affection and Closeness', kids: 'Children and Parenting', faith: 'Faith and Meaning', fun: 'Friends and Fun', health: 'Health and Stress', dreams: 'Dreams and Commitment'};
const STATUS = [['starting', 'Getting Started'], ['sessions', 'In Sessions'], ['complete', 'Complete']];
const NAV = [['sessions', 'Sessions'], ['hours', 'Hours Log'], ['card', 'Their Card'], ['statement', 'Educator\'s Statement'], ['cert', 'Certificate'], ['about', 'The Couple']];
const APP_LINK = 'https://growwithgrounded.com/marriage/';

let CTX = {lib: null, field: null, data: null, save: () => {}};
const S = {view: 'home', id: null, n: null, cardErr: '', cardBusy: false};

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const nice = d => { const m = /^(\d{4})-(\d\d)-(\d\d)/.exec(d || ''); if (!m) return d || ''; return new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}); };
const hnum = m => Math.round((m || 0) / 60 * 100) / 100;
const hrs = m => { const h = Math.round((m || 0) / 60 * 100) / 100; return (h === 1 ? '1 hour' : h + ' hours'); };
function toast(t){ const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 2200); }
async function copyText(t){ try { await navigator.clipboard.writeText(t); } catch (e){ const a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (x) {} a.remove(); } toast('Copied.'); }

// ---------- the library (LIB.premarital, filled in from the fallback where a piece is missing) ----------
let PC = null, PCsrc = null;
function pm(){
  const L = (CTX.lib && CTX.lib.premarital) || (CTX.field && CTX.field.premaritalGuide && CTX.field.premaritalGuide.program) || null;
  if (PC && PCsrc === L) return PC;
  const has = !!(L && Array.isArray(L.sessions) && L.sessions.length);
  const part = k => Object.assign({}, FB[k], (L && L[k]) || {});
  PC = Object.assign({}, FB, has ? L : {}, {
    full: has,
    sessions: has ? L.sessions : FB.sessions,
    app: part('app'), before: part('before'), results: part('results'), refer: part('refer'), faith: part('faith'), pe: part('pe'), certificate: part('certificate'),
    hours: part('hours'), statement: part('statement'), card: part('card'), safety: part('safety')
  });
  PC.statement.fee = Object.assign({}, FB.statement.fee, PC.statement.fee || {});
  PCsrc = L;
  return PC;
}
// ---------- the two programs: the full Grounded Marriage, and Essentials (premarital.essentials) ----------
const ESS = () => { const E = pm().essentials; return E && Array.isArray(E.sessions) && E.sessions.length ? E : null; };
const isEss = c => !!(c && c.program === 'essentials' && ESS());
const isUpg = c => !!(c && !isEss(c) && c.upg && ESS());
// The program a couple follows: the full one as is, or Essentials laid over it.
function pmc(c){
  const P = pm(); if (!isEss(c)) return P;
  const E = ESS();
  return Object.assign({}, P, {ess: true, sessions: E.sessions, hours: Object.assign({}, P.hours, E.hours || {}),
    certificate: Object.assign({}, P.certificate, E.certificate || {}), faith: Object.assign({}, P.faith, E.faith || {})});
}
const skey = s => String(s.id || s.n);
const sLabel = s => (s.id ? 'Essentials Session ' : 'Session ') + s.n;
const nk = v => /^e\d+$/.test(String(v)) ? String(v) : (Math.max(0, +v || 0));
const SES = k => pm().sessions.concat((ESS() || {}).sessions || []).find(x => skey(x) === String(k));
const target = c => +pmc(c).hours.target || 12;
const STMT = () => +pm().hours.target || 12;
const coveredBy = n => ((ESS() || {}).sessions || []).find(s => (s.covers || []).includes(+n)) || null;
const progName = c => isEss(c) ? (ESS().title || 'The Grounded Marriage: Essentials') : (pm().program || 'The Grounded Marriage');
const deeper = c => (c.upg && Array.isArray(c.upg.deeper)) ? c.upg.deeper.map(Number) : [];
const minsFor = (c, s) => (c.log || []).filter(x => String(x.n) === skey(s)).reduce((a, x) => a + (+x.mins || 0), 0);

// ---------- The Grounded Marriage app data (data only), loaded once from the public app ----------
// questions.js (window.BTV_Q), core.js (window.GMCore), results.js (window.GM_RESULTS), faith.js (window.GM_FAITH).
const MV = '1';
const MFILES = [['questions.js', 'BTV_Q'], ['core.js', 'GMCore'], ['results.js', 'GM_RESULTS'], ['faith.js', 'GM_FAITH']];
let ML = 'idle';
function needM(){
  if (ML !== 'idle') return;
  const want = MFILES.filter(([, g]) => !window[g]);
  if (!want.length){ ML = 'done'; return; }
  ML = 'loading'; let left = want.length;
  want.forEach(([f]) => { const s = document.createElement('script'); s.async = false; s.src = new URL('../marriage/' + f + '?v=' + MV, location.href).href;
    s.onload = s.onerror = () => { if (--left) return; ML = window.BTV_Q ? 'done' : 'none'; if (S.view !== 'home') rerender(true); }; document.head.appendChild(s); });
}
const Q = () => window.BTV_Q || null;
const GC = () => window.GMCore || null;
const FA = () => window.GM_FAITH || null;
const RS = () => window.GM_RESULTS || null;
const areaName = id => { const q = Q(); const a = q && (q.areas || []).find(x => x.id === id); return (a && a.name) || AREAS[id] || id; };
const loadingNote = what => `<p class="muted" style="font-size:15px">${ML === 'none' ? 'The Grounded Marriage app data did not load, so ' + what + ' cannot show yet.' : 'Loading The Grounded Marriage app data.'}</p>`;

// ---------- couples ----------
function D(){ return CTX.data || {}; }
function list(){ const d = D(); d.pm = d.pm || {couples: []}; d.pm.couples = d.pm.couples || []; return d.pm.couples; }
const cur = () => list().find(x => x.id === S.id) || null;
function keep(c){ if (!c) return; c.u = Date.now(); CTX.save(); }
const names = c => [c.p1.name, c.p2.name].filter(Boolean).join(' and ') || 'A New Couple';
const fullNames = c => [c.p1.full || c.p1.name, c.p2.full || c.p2.name].filter(Boolean).join(' and ');
const logMins = c => (c.log || []).reduce((a, x) => a + (+x.mins || 0), 0);
const me = () => (D().settings || {}).name || '';
const leaders = c => (c.leaders || '').trim() || me();
function sess(c, n){ c.sess = c.sess || {}; c.sess[n] = c.sess[n] || {ck: {}, notes: ''}; c.sess[n].ck = c.sess[n].ck || {}; return c.sess[n]; }
function newCouple(a, b, wed, prog){ return {id: uid(), u: Date.now(), made: Date.now(), status: 'starting', program: prog === 'essentials' ? 'essentials' : 'full', p1: {name: a, full: ''}, p2: {name: b, full: ''}, wedding: wed || '', sess: {}, log: [], card: null, stmt: {}, pre: {}, fb: {}, pe: false, leaders: '', cert: {}}; }

// ---------- faith backgrounds (GM_FAITH: the Service Builder's traditions plus Rather not say) ----------
// Each partner's comes from what they picked in The Couple, or else from their v2 card's fb.
function cardOf(c, w){
  const k = c.card; if (!k) return null;
  const nm = x => String(x || '').trim().toLowerCase(), mine = nm(c[w].name), other = nm(c[w === 'p1' ? 'p2' : 'p1'].name);
  const ps = [k.a, k.b].filter(Boolean), hit = ps.find(p => nm(p.n) === mine);
  if (hit) return hit;
  const pos = w === 'p1' ? k.a : k.b;
  return pos && nm(pos.n) !== other ? pos : (ps.find(p => nm(p.n) !== other) || null);
}
function faithOf(c, w){
  const pick = (c.fb || {})[w], card = cardOf(c, w), cf = card && card.fb ? card.fb : '';
  return pick ? {id: pick, from: 'pick'} : cf ? {id: cf, from: 'card'} : {id: '', from: ''};
}
const faithItem = id => { const F = FA(); return (F && (F.list || []).find(x => x.id === id)) || null; };
const faithName = id => { const f = faithItem(id); return f ? f.name : id; };
const named = id => id && id !== 'rather-not-say';
function readingText(x){
  const br = t => esc(t).replace(/\n/g, '<br>');
  if (x == null) return '';
  if (typeof x === 'string') return br(x);
  if (Array.isArray(x)) return x.map((y, i) => i ? `<small class="muted">${esc(y)}</small>` : br(y)).join('<br>');
  const head = [x.title || x.name || '', x.ref || ''].filter(Boolean).join(', '), body = x.text || x.line || '', src = x.source || x.credit || x.src || '';
  return [head ? `<b style="font-weight:600">${esc(head)}</b>` : '', br(body), src ? `<small class="muted">${esc(src)}</small>` : ''].filter(Boolean).join('<br>');
}
function faithLines(c){
  return ['p1', 'p2'].map(w => { const f = faithOf(c, w), nm = c[w].name || (w === 'p1' ? 'First partner' : 'Second partner');
    return `<li><b>${esc(nm)}</b>: ${f.id ? esc(faithName(f.id)) + (f.from === 'card' ? ' <small class="muted">(from their card)</small>' : '') : '<span class="muted">Not named yet</span>'}</li>`; }).join('');
}
// The two-tradition questions ride on a card after the main questions (GMCore.answersOf reads them).
function twoDiff(c, id){
  const G = GC(), k = c.card; if (!G || !k || !k.a || !k.b || typeof G.answersOf !== 'function' || typeof G.differs !== 'function') return false;
  try { const x = +G.answersOf(k.a.a)[id] || 0, y = +G.answersOf(k.b.a)[id] || 0; return !!(x && y && G.differs(x, y)); } catch (e){ return false; }
}
function faithBlock(c){
  const P = pmc(c).faith, F = FA(), a = faithOf(c, 'p1').id, b = faithOf(c, 'p2').id;
  let h = `<div class="card pm-faith"><h3>${esc(P.title || 'Built to Their Faith')}</h3>${P.lead ? `<p>${esc(P.lead)}</p>` : ''}<ul class="pm-ul">${faithLines(c)}</ul>`;
  if (!F){ needM(); return h + loadingNote('the faith notes') + '</div>'; }
  const ids = [a, b].filter(named);
  if (!ids.length) h += `<p class="pm-note">${esc(P.none || '')}</p>`;
  else {
    const two = ids.length === 2 && ids[0] !== ids[1];
    h += `<p class="pm-note">${esc(two ? (P.two || '') : (ids.length === 2 ? (P.one || '') : ''))}</p>`.replace('<p class="pm-note"></p>', '');
    const gs = []; ids.forEach(id => { const it = faithItem(id), g = it && it.group; if (g && !gs.includes(g)) gs.push(g); });
    gs.forEach(g => { const G = (F.groups || {})[g]; if (!G) return; const who = ids.filter(id => (faithItem(id) || {}).group === g).filter((x, i, A) => A.indexOf(x) === i).map(faithName).join(' and ');
      h += `<div class="pm-fg"><h4>${esc(G.name || who)}${G.name && who && G.name !== who ? ` <small class="muted">(${esc(who)})</small>` : ''}</h4>
        ${G.sessionNote ? `<p>${esc(G.sessionNote)}</p>` : ''}
        ${ids.filter((x, i, A) => A.indexOf(x) === i).filter(id => (G.notes || {})[id]).map(id => `<p><b style="font-weight:600">${esc(faithName(id))}:</b> ${esc(G.notes[id])}</p>`).join('')}
        ${(G.readings || []).length ? `<b class="pm-sub">Readings and Ideas</b><ul class="pm-ul">${G.readings.map(r => `<li>${readingText(r)}</li>`).join('')}</ul>` : ''}</div>`; });
    if (two && F.two){
      h += `<div class="pm-fg pm-two-t"><h4>Two Traditions in One Home</h4>${F.two.lead ? `<p>${esc(F.two.lead)}</p>` : ''}
        <ul class="pm-ul">${(F.two.questions || []).map(q => `<li><b style="font-weight:600">${esc(q.text)}</b>${twoDiff(c, q.id) ? ' <span class="pill gold">They answered differently</span>' : ''}${q.talk ? `<br><small class="muted">${esc(q.talk)}</small>` : ''}</li>`).join('')}</ul></div>`;
    }
  }
  if (P.ask) h += `<p class="muted" style="font-size:15px">${esc(P.ask)}</p>`;
  return h + `<div class="row" style="margin-top:10px"><button type="button" class="btn btn-line btn-sm" data-pm="go" data-v="about">Change Faith Backgrounds</button></div></div>`;
}

// ---------- views ----------
function bar(c){
  const done = logMins(c), t = target(c) * 60, pc = Math.min(100, Math.round(done / t * 100));
  return `<div class="pm-bar" role="img" aria-label="${esc(hrs(done))} of ${target(c)} hours"><span style="width:${pc}%"></span></div><small class="muted">${hnum(done)} of ${target(c)} hours logged</small>`;
}
// The program picker (when the library has Essentials), the couple's program pill, and the upgrade card.
function progPick(id, sel){
  const E = ESS(); if (!E) return '';
  return `<div style="margin-top:12px;max-width:520px"><label class="f" for="${id}">Program</label><select id="${id}"${id === 'pm-c-prog' ? ' data-pmprog="1"' : ''}>
    <option value="full"${sel !== 'essentials' ? ' selected' : ''}>${esc(pm().program || 'The Grounded Marriage')} (${STMT()} Hours)</option>
    <option value="essentials"${sel === 'essentials' ? ' selected' : ''}>${esc(E.title || 'The Grounded Marriage: Essentials')} (${+(E.hours || {}).target || 6} Hours)</option></select>
    ${E.price ? `<small class="muted">Essentials: ${esc(E.price)}</small>` : ''}</div>`;
}
const progPill = c => isEss(c) ? ' <span class="pill">Essentials</span>' : isUpg(c) ? ' <span class="pill">Upgraded From Essentials</span>' : '';
function upgradeBlock(c){
  const E = ESS(), U = (E && E.upgrade) || null; if (!U || !isEss(c)) return '';
  return `<div class="card pm-upg"><h3>${esc(U.title || 'Upgrade to the Full Program')}</h3>${U.lead ? `<p>${esc(U.lead)}</p>` : ''}
    ${(U.steps || []).length ? `<ol class="pm-ol">${U.steps.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : ''}
    ${U.price ? `<p class="muted" style="font-size:15px">${esc(U.price)}</p>` : ''}
    <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold btn-sm" data-pm="upgrade">${esc(U.title || 'Upgrade to the Full Program')}</button></div></div>`;
}
function upgrade(c){
  const U = (ESS() || {}).upgrade || {};
  c.program = 'full'; c.upg = {on: today(), from: 'essentials', deeper: (U.suggest || []).map(Number).slice(0, +U.count || 3)}; keep(c);
}
function vHome(){
  const P = pm(), L = list().slice().sort((a, b) => (b.u || 0) - (a.u || 0));
  return `<div class="page-head"><div class="eyebrow">${esc(P.program || 'Grow With Grounded')}</div><h1>${esc(P.title || 'Premarital Sessions')}</h1><p>${esc(P.lead || '')}</p></div>
  <div class="card"><h2 style="margin-bottom:4px">Add a Couple</h2>
    <div class="pm-g3"><div><label class="f" for="pm-a">First Partner</label><input type="text" id="pm-a" autocomplete="off" placeholder="First name"></div>
    <div><label class="f" for="pm-b">Second Partner</label><input type="text" id="pm-b" autocomplete="off" placeholder="First name"></div>
    <div><label class="f" for="pm-w">Wedding Date</label><input type="date" id="pm-w"></div></div>
    ${progPick('pm-p', 'full')}
    <div class="row" style="margin-top:14px"><button type="button" class="btn btn-gold" data-pm="add">Add the Couple</button></div></div>
  <div class="card"><h2 style="margin-bottom:4px">Couples</h2>
    ${L.length ? L.map(c => `<div class="pm-row"><div class="m"><b>${esc(names(c))}</b> <span class="pill ${c.status === 'complete' ? 'sage' : 'gold'}">${esc((STATUS.find(x => x[0] === c.status) || STATUS[0])[1])}</span>${progPill(c)}${c.pe ? ' <span class="pill">PREPARE/ENRICH</span>' : ''}<br><small class="muted">${c.wedding ? 'Wedding ' + esc(nice(c.wedding)) : 'Wedding date not set yet'}</small><div style="max-width:320px">${bar(c)}</div></div>
      <div class="row"><button type="button" class="btn btn-gold btn-sm" data-pm="open" data-v="${c.id}">Open</button><button type="button" class="btn btn-danger btn-sm" data-pm="del" data-v="${c.id}">Delete</button></div></div>`).join('')
      : '<p class="muted">Couples you add show here. They stay on this device, encrypted with your records, and travel in your backups.</p>'}</div>
  ${P.full ? '' : '<p class="muted" style="margin-top:12px;font-size:15px">The full session plans arrive with the next Staff library update.</p>'}`;
}
function head(c, eyebrow){
  return `<button type="button" class="linkbtn" data-pm="home">&larr; All Couples</button>
  <div class="page-head pm-head" style="margin-top:10px"><div style="min-width:0"><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(names(c))}</h1><p>${c.wedding ? 'Wedding ' + esc(nice(c.wedding)) + '. ' : ''}${hnum(logMins(c))} of ${target(c)} hours logged.${progPill(c)}</p></div>
  <div class="pm-chips">${STATUS.map(([k, l]) => `<button type="button" class="chip" data-pm="status" data-v="${k}" aria-pressed="${(c.status || 'starting') === k}">${l}</button>`).join('')}</div></div>
  <div class="pm-nav">${NAV.map(([v, l]) => `<button type="button" class="btn btn-line btn-sm" data-pm="go" data-v="${v}"${(S.view === v || (v === 'sessions' && S.view === 'session')) ? ' aria-current="page"' : ''}>${l}</button>`).join('')}</div>`;
}
function vBefore(c){
  const B = pm().before, items = B.items || [], pre = c.pre || {}, done = items.filter(x => pre[x.id]).length;
  if (!items.length) return '';
  return `<div class="card pm-pre"><div class="spread"><h2>${esc(B.title || 'Before Session 1')}</h2><span class="pill ${done === items.length ? 'sage' : 'gold'}">${done} of ${items.length} done</span></div>${B.lead ? `<p>${esc(B.lead)}</p>` : ''}
    <ul class="pm-ck">${items.map(x => `<li><label><input type="checkbox" data-pmpre="${esc(x.id)}"${pre[x.id] ? ' checked' : ''}><span><b style="font-weight:600">${esc(x.title)}</b><br><small class="muted">${esc(x.text || '')}</small></span></label></li>`).join('')}</ul>
    <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold btn-sm" data-pm="copylink">Copy the App Link</button><button type="button" class="btn btn-line btn-sm" data-pm="go" data-v="card">Bring In Their Cards</button></div></div>`;
}
function tipsBlock(open){
  const R = pm().results; if (!(R.tips || []).length) return '';
  return `<details class="card pm-det"${open ? ' open' : ''}><summary><h3>${esc(R.title || 'Reading the Results')}</h3></summary>${R.lead ? `<p>${esc(R.lead)}</p>` : ''}
    ${R.tips.map(t => `<div class="pm-tip"><b>${esc(t.title)}</b><p>${esc(t.text)}</p></div>`).join('')}</details>`;
}
function referBlock(){
  const R = pm().refer, lines = (pm().safety.lines || []).map(([n, h]) => `<li><b>${esc(n)}</b>: ${esc(h)}</li>`).join('');
  if (!(R.items || []).length) return '';
  return `<details class="card pm-det"><summary><h3>${esc(R.title || 'When to Add Sessions or Refer')}</h3></summary>${R.lead ? `<p>${esc(R.lead)}</p>` : ''}
    ${R.items.map(x => `<div class="pm-tip${x.id === 'safety' ? ' pm-safe' : ''}"><b>${esc(x.title)}</b>${x.when ? `<p><span class="pm-min">When</span> ${esc(x.when)}</p>` : ''}${x.what ? `<p><span class="pm-min">What to Do</span> ${esc(x.what)}</p>` : ''}${x.id === 'safety' ? `<ul class="pm-ul">${lines}</ul>` : ''}</div>`).join('')}</details>`;
}
function sessCard(c, s, extra){
  const st = sess(c, skey(s)), n = (s.outline || []).length, d = Object.keys(st.ck).filter(k => st.ck[k]).length, lg = minsFor(c, s);
  return `<div class="card pm-sc"><div class="spread"><div style="min-width:0"><div class="eyebrow">${sLabel(s)}</div><h3>${esc(s.title)}</h3>${extra || ''}<small class="muted">${d} of ${n} parts checked${lg ? ', ' + esc(hrs(lg)) + ' logged' : ''}${st.notes ? ', notes kept' : ''}</small></div>
      <button type="button" class="btn btn-gold btn-sm" data-pm="session" data-v="${skey(s)}">Open ${sLabel(s)}</button></div></div>`;
}
function vSessions(c){
  let body;
  if (isUpg(c)){
    const E = ESS(), U = E.upgrade || {}, dp = deeper(c), want = +U.count || 3, em = E.sessions.reduce((a, s) => a + minsFor(c, s), 0);
    body = `<div class="card pm-upg"><h2>${esc(pm().program || 'The Grounded Marriage')}, From Essentials</h2>
      <p>Upgraded from Essentials on ${esc(nice(c.upg.on))}. ${esc(hrs(em))} logged in Essentials stay in the log, and each full session below shows the Essentials session that covered it. ${dp.length} of ${want} sessions chosen to go deeper.</p>
      ${U.pick ? `<p class="muted" style="font-size:15px">${esc(U.pick)}</p>` : ''}</div>
      ${pm().sessions.map(s => { const cv = coveredBy(s.n), on = dp.includes(+s.n);
        return sessCard(c, s, `<div class="pm-tags">${cv ? `<span class="pill sage">Covered in ${esc(sLabel(cv))}</span>` : ''}${on ? '<span class="pill gold">Going Deeper</span>' : ''}</div>
          <label class="pm-yes" style="margin:4px 0 6px"><input type="checkbox" data-pmdeep="${s.n}"${on ? ' checked' : ''}> <span>Go deeper here</span></label>`); }).join('')}
      <details class="card pm-det"><summary><h3>Essentials Sessions</h3></summary>
        ${E.sessions.map(s => { const lg = minsFor(c, s); return `<div class="pm-row"><div class="m"><b>${esc(sLabel(s))}: ${esc(s.title)}</b><br><small class="muted">${lg ? esc(hrs(lg)) + ' logged' : 'Not logged'}</small></div><button type="button" class="btn btn-line btn-sm" data-pm="session" data-v="${skey(s)}">Open</button></div>`; }).join('')}</details>`;
  } else body = pmc(c).sessions.map(s => sessCard(c, s)).join('') + upgradeBlock(c);
  return `${head(c, 'Sessions')}${vBefore(c)}
  ${body}
  ${tipsBlock(false)}${referBlock()}`;
}
function talkFor(c, areas){
  if (c.card) needM();
  const t = c.card ? talkList(c.card).filter(x => areas.includes(x.area)) : [];
  if (!t.length) return '';
  return `<div class="pm-talk"><b>From Their Card: Talk About This</b><ul>${t.map(x => `<li>${esc(x.text)}${x.talk ? `<br><small class="muted">${esc(x.talk)}</small>` : ''}</li>`).join('')}</ul></div>`;
}
// Strengths and Growing Edges, from both cards: GMCore.summary(GMCore.compare(X, Y)) and the words in GM_RESULTS.
function partnerX(p){ return {name: p.n, fw: p.fw === 'f' ? 'faith' : 'plain', ans: ansOf(p)}; }
function summaryOf(k){
  const G = GC(); if (!G || !Q() || !k || !k.a || !k.b) return null;
  try { return G.summary(G.compare(partnerX(k.a), partnerX(k.b))) || null; } catch (e){ return null; }
}
function resultsBlock(c){
  const k = c.card, R = RS();
  let h = `<div class="card pm-res"><h3>${esc((R && R.title) || 'Strengths and Growing Edges')}</h3>`;
  if (!k || !k.a || !k.b) return h + `<p>Bring in both partners' cards to see their Strengths and Growing Edges here.</p><div class="row"><button type="button" class="btn btn-line btn-sm" data-pm="go" data-v="card">Bring In Their Cards</button></div></div>`;
  needM();
  const sum = summaryOf(k);
  if (!sum || !R) return h + loadingNote('their Strengths and Growing Edges') + '</div>';
  const order = (Q().areas || []).map(a => a.id);
  h += `<p class="muted" style="font-size:15px">${esc(k.a.n)} and ${esc(k.b.n)}, from their cards. No scores and no labels: a map for conversation.</p>`;
  ['strong', 'talk', 'grow'].forEach(st => {
    const ids = order.filter(id => sum[id] === st); if (!ids.length) return;
    const S0 = (R.states || {})[st] || {};
    h += `<div class="pm-st pm-st-${st}"><h4>${esc(S0.label || st)} <span class="pill">${ids.length}</span></h4>${S0.lead ? `<p class="muted" style="font-size:15px">${esc(S0.lead)}</p>` : ''}
      <ul class="pm-ul">${ids.map(id => { const t = ((R.areas || {})[id] || {})[st] || ''; return `<li><b style="font-weight:600">${esc(areaName(id))}</b>${t ? `<br><small class="muted">${esc(t)}</small>` : ''}</li>`; }).join('')}</ul></div>`;
  });
  return h + '</div>';
}
function pills(arr){ return `<div class="pm-tags">${arr.map(x => `<span class="pill">${esc(Array.isArray(x) ? x[1] : x)}</span>`).join('')}</div>`; }
function vSession(c){
  const s = SES(S.n); if (!s) return vSessions(c);
  const st = sess(c, skey(s)), P = pmc(c), group = s.id ? ESS().sessions : pm().sessions, nx = group[group.indexOf(s) + 1] || null;
  const cv = isUpg(c) && !s.id ? coveredBy(s.n) : null, deep = cv && deeper(c).includes(+s.n);
  let at = 0;
  const rows = (s.outline || []).map((r, i) => { const from = at; at += +r[0] || 0;
    return `<li><label><input type="checkbox" data-pmck="${i}"${st.ck[i] ? ' checked' : ''}><span><span class="pm-min">${from} to ${at} min</span> ${esc(r[1])}</span></label></li>`; }).join('');
  const lines = (P.safety.lines || []).map(([n, h]) => `<li><b>${esc(n)}</b>: ${esc(h)}</li>`).join('');
  const wbs = s.workbook ? (Array.isArray(s.workbook) ? s.workbook : [s.workbook]) : [];
  return `${head(c, sLabel(s))}
  <div class="card"><div class="spread"><h2>${esc(s.title)}</h2><span class="pill">${esc(s.mins || at)} minutes</span></div>
    ${cv ? `<p class="pm-note">Covered in ${esc(sLabel(cv))}.${deep ? ' Chosen to go deeper: lead the full plan, building on what the couple shared in Essentials.' : ''}</p>` : ''}
    ${(s.goals || []).length ? `<h3 style="margin-top:10px">Goals</h3><ul class="pm-ul">${s.goals.map(g => `<li>${esc(g)}</li>`).join('')}</ul>` : ''}
    <h3 style="margin-top:14px">The Plan</h3><ul class="pm-ck">${rows}</ul>
    ${s.practice ? `<h3 style="margin-top:14px">Practice</h3><p>${esc(s.practice)}</p>` : ''}
    ${wbs.length ? `<h3 style="margin-top:14px">The Couple Workbook</h3>${wbs.map(wb => `<p>Chapter ${esc(wb.chapter)}${wb.title ? ': ' + esc(wb.title) : ''}</p>${(wb.exercises || []).length ? pills(wb.exercises) : ''}`).join('')}` : ''}
    ${(s.videos || []).length ? `<h3 style="margin-top:14px">Videos</h3>${pills(s.videos)}<small class="muted">In The Grounded Marriage app, ${esc(APP_LINK.replace(/^https:\/\//, ''))}</small>` : ''}
    ${(s.practices || []).length ? `<h3 style="margin-top:14px">Practices for Two</h3>${pills(s.practices)}` : ''}
    ${s.tryWeek ? `<h3 style="margin-top:14px">Try This Week</h3><p>${esc(s.tryWeek)}</p>` : ''}
    ${s.bridge ? `<h3 style="margin-top:14px">Before Next Time</h3><p>${esc(s.bridge)}</p>` : ''}
    ${(s.btvAreas || []).length ? `<h3 style="margin-top:14px">Before the Vows Areas</h3><div class="pm-tags">${s.btvAreas.map(a => `<span class="pill">${esc(areaName(a))}</span>`).join('')}</div>${talkFor(c, s.btvAreas)}` : ''}
  </div>
  ${s.safety ? `<div class="card pm-safe"><h3>Time With Each Partner Alone</h3><p>${esc(P.safety.lead || '')}</p><ul class="pm-ul">${lines}</ul></div>` : ''}
  ${s.results ? resultsBlock(c) + tipsBlock(true) : ''}
  ${s.faith ? faithBlock(c) : ''}
  ${s.finish && isEss(c) ? `<div class="card"><h3>Finishing Well</h3><p>${esc(ESS().finish || 'Confirm the hours and present the Certificate of Completion.')}</p><div class="row"><button type="button" class="btn btn-line btn-sm" data-pm="go" data-v="cert">Certificate of Completion</button></div></div>${upgradeBlock(c)}` : ''}
  ${s.finish && !isEss(c) ? `<div class="card"><h3>Finishing Well</h3><p>Confirm the hours, sign the Educator's Statement, and present the Certificate of Completion.</p><div class="row"><button type="button" class="btn btn-line btn-sm" data-pm="go" data-v="statement">Educator's Statement</button><button type="button" class="btn btn-line btn-sm" data-pm="go" data-v="cert">Certificate of Completion</button></div></div>` : ''}
  <div class="card"><label class="f" for="pm-notes">Notes for ${sLabel(s)}</label><textarea id="pm-notes" data-pmn="${skey(s)}" placeholder="What the couple shared, what to come back to">${esc(st.notes || '')}</textarea>
    <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold" data-pm="logsess" data-v="${skey(s)}">Log This Session (${esc(s.mins || 120)} minutes, today)</button>${nx ? `<button type="button" class="btn btn-line" data-pm="session" data-v="${skey(nx)}">${sLabel(nx)}</button>` : ''}</div></div>
  ${(s.credits || []).length ? `<p class="pm-src">Sources: ${s.credits.map(esc).join('. ')}.</p>` : ''}`;
}
function vHours(c){
  const L = (c.log || []).slice().sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  const os = [['0', 'Other']].concat((isEss(c) || isUpg(c)) ? ESS().sessions.map(s => [skey(s), sLabel(s)]) : [], isEss(c) ? [] : pm().sessions.map(s => [skey(s), sLabel(s)]));
  const opts = sel => os.map(([v, l]) => `<option value="${v}"${String(sel) === v ? ' selected' : ''}>${esc(l)}</option>`).join('');
  const first = arr => { const s = arr.find(x => !minsFor(c, x)); return s ? skey(s) : '0'; };
  const dflt = isEss(c) ? first(ESS().sessions) : isUpg(c) ? first(pm().sessions.filter(s => deeper(c).includes(+s.n))) : Math.min(pm().sessions.length, ((c.log || []).length || 0) + 1);
  return `${head(c, 'Hours Log')}
  <div class="card"><div class="spread"><h2>Hours Toward ${target(c)}</h2><span class="pm-big">${esc(hrs(logMins(c)))}</span></div>${bar(c)}
    <p class="muted" style="font-size:15px;margin-top:8px">${esc(pmc(c).hours.note || '')}</p></div>
  <div class="card"><h3>Add Time</h3>
    <div class="pm-g4"><div><label class="f" for="pm-ld">Date</label><input type="date" id="pm-ld" value="${today()}"></div>
    <div><label class="f" for="pm-lm">Minutes</label><input type="number" id="pm-lm" min="0" step="5" value="120"></div>
    <div><label class="f" for="pm-ln">Session</label><select id="pm-ln">${opts(dflt)}</select></div>
    <div><label class="f" for="pm-lt">Notes</label><input type="text" id="pm-lt" autocomplete="off"></div></div>
    <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold" data-pm="logadd">Add to the Log</button></div></div>
  <div class="card"><h3>The Log</h3>
    ${L.length ? L.map(x => `<div class="pm-log"><div class="pm-g4"><div><label class="f">Date</label><input type="date" data-pml="date|${x.id}" value="${esc(x.date || '')}"></div>
      <div><label class="f">Minutes</label><input type="number" min="0" step="5" data-pml="mins|${x.id}" value="${esc(x.mins)}"></div>
      <div><label class="f">Session</label><select data-pml="n|${x.id}">${opts(x.n)}</select></div>
      <div><label class="f">Notes</label><input type="text" data-pml="notes|${x.id}" value="${esc(x.notes || '')}"></div></div>
      <button type="button" class="btn btn-line btn-sm" data-pm="logdel" data-v="${x.id}" style="margin-top:8px">Remove</button></div>`).join('') : '<p class="muted">No time logged yet. Log a session from its plan, or add time here.</p>'}</div>`;
}

// ---------- the couple's cards ----------
// Each partner makes a card from their own answers in The Grounded Marriage app: a link ending #btv=b1.<code>
// (growwithgrounded.com/marriage/, or the older /before-the-vows/), read with GMCore.card. The code is base64url of
// salt (16 bytes), iv (12), then the AES-GCM text, keyed by PBKDF2 (250,000 rounds, SHA-256) from the shared word
// (trimmed, lowercase). Inside: {v: 1 or 2, q: questions version, n: this partner's first name, to: the other's,
// fw: 'f' (Faith wording) or 'p' (Plain), a: one digit per question in questions.js order, 0 for skipped,
// fb (v2 only): their faith background id or empty}. Safety answers never ride on a card. The word is used once
// here and never kept. A small reader of the same format stays here in case core.js has not loaded.
const unb64u = s => { s = String(s).replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; const b = atob(s), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; };
function codeOf(t){
  const G = GC(); if (G && G.card && typeof G.card.codeOf === 'function'){ try { const x = G.card.codeOf(t); if (x) return x; } catch (e) {} }
  t = String(t || '').trim(); const m = /(?:^|[#&?])btv=(b1\.[A-Za-z0-9_-]{20,2000})/.exec(t); return m ? m[1] : (/^b1\.[A-Za-z0-9_-]{20,2000}$/.test(t) ? t : '');
}
function cardOk(o){
  if (!o || typeof o !== 'object' || Array.isArray(o) || (o.v !== 1 && o.v !== 2) || typeof o.q !== 'number') return null;
  const nm = x => typeof x === 'string' && x && x.length <= 40 && x === x.trim() && !/[<>&"`\\\u0000-\u001F\u007F]/.test(x);
  if (!nm(o.n) || !nm(o.to) || (o.fw !== 'f' && o.fw !== 'p') || typeof o.a !== 'string' || !/^[0-5]{1,300}$/.test(o.a)) return null;
  const r = {v: o.v, q: o.q, n: o.n, to: o.to, fw: o.fw, a: o.a};
  if (o.v === 2) r.fb = (typeof o.fb === 'string' && /^[a-z0-9-]{0,40}$/.test(o.fb)) ? o.fb : '';
  return r;
}
async function ownRead(code, word){
  const all = unb64u(code.slice(3)), enc = new TextEncoder();
  const base = await crypto.subtle.importKey('raw', enc.encode(String(word).trim().toLowerCase()), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey({name: 'PBKDF2', salt: all.slice(0, 16), iterations: 250000, hash: 'SHA-256'}, base, {name: 'AES-GCM', length: 256}, false, ['decrypt']);
  let pt; try { pt = await crypto.subtle.decrypt({name: 'AES-GCM', iv: all.slice(16, 28)}, key, all.slice(28)); } catch (e) { throw new Error('word'); }
  let o = null; try { o = JSON.parse(new TextDecoder().decode(pt)); } catch (e) {}
  o = cardOk(o); if (!o) throw new Error('link'); return o;
}
async function readCard(code, word){
  const G = GC();
  if (G && G.card && typeof G.card.read === 'function'){
    // GMCore.card.read rejects when the word does not open the card, and resolves null when it is not a card.
    let o; try { o = await G.card.read(code, word); } catch (e) { throw new Error('word'); }
    o = cardOk(o); if (!o) throw new Error('link'); return o;
  }
  return ownRead(code, word);
}
// One partner's answers by question id (needs questions.js; until then the digits are kept as they came).
function ansOf(p){ const Bq = Q(), r = {}; if (!p) return r; if (Bq) (Bq.questions || []).forEach((q, i) => { const n = +p.a.charAt(i); if (n >= 1 && n <= 5) r[q.id] = n; }); return r; }
const plainOf = k => [k.a, k.b].some(p => p && p.fw === 'p');
const qText = (q, k) => (plainOf(k) && q.plain) ? q.plain : q.text;
function differs(x, y){ const Bq = Q(), gap = (Bq && +Bq.differ) || 2; return x >= 1 && y >= 1 && (Math.abs(x - y) >= gap || (x >= 4 && y <= 2) || (y >= 4 && x <= 2)); }
function talkList(k){
  const Bq = Q(); if (!Bq || !k || !k.a || !k.b) return [];
  const A = ansOf(k.a), B = ansOf(k.b);
  return (Bq.questions || []).filter(q => differs(A[q.id], B[q.id])).map(q => ({area: q.area, text: qText(q, k), talk: q.talk || ''}));
}
function vCard(c){
  const P = pm(), k = c.card, Bq = Q();
  needM();
  const scale = n => { const s = Bq && (Bq.scale || []).find(x => +x[0] === +n); return s ? s[1] : 'No answer'; };
  const have = k ? [k.a, k.b].filter(Boolean) : [];
  let body = '';
  if (have.length){
    const tl = talkList(k), A = ansOf(k.a), B = ansOf(k.b), na = k.a ? k.a.n : '', nb = k.b ? k.b.n : '';
    const old = Bq && have.some(p => p.q !== Bq.version);
    const fbs = have.filter(p => p.fb).map(p => esc(p.n) + ': ' + esc(faithName(p.fb)));
    body = `<div class="card"><div class="spread"><h2>Their Cards</h2><span class="pill sage">Read Only</span></div>
      <p>${have.map(p => esc(p.n) + '\'s card').join(' and ')}${have.length < 2 ? '. Add the other partner\'s card to see Talk About This.' : '.'} ${plainOf(k) ? 'Plain wording.' : 'Faith wording.'}</p>
      ${fbs.length ? `<p>Faith backgrounds from their cards: ${fbs.join('; ')}.</p>` : ''}
      <p class="muted" style="font-size:15px">Brought in ${esc(nice(k.brought))}. ${k.yes ? esc(k.yes.text) + ' (' + esc(nice(k.yes.on)) + ')' : ''}</p>
      ${old ? '<p class="pm-warn">A card was made with an earlier set of questions, so some answers may not line up. The couple can make fresh cards.</p>' : ''}
      ${Bq ? '' : loadingNote('the answers')}
      ${have.length === 2 && Bq ? `<div class="row" style="margin-top:8px"><button type="button" class="btn btn-gold btn-sm" data-pm="session" data-v="${isEss(c) ? 'e1' : '2'}">Strengths and Growing Edges (${isEss(c) ? 'Essentials Session 1' : 'Session 2'})</button></div>` : ''}
      ${have.length === 2 && Bq ? (tl.length ? `<h3 style="margin-top:12px">Talk About This (${tl.length})</h3><ul class="pm-ul">${tl.map(x => `<li><b style="font-weight:600">${esc(x.text)}</b><br><small class="muted">${esc(areaName(x.area))}${x.talk ? ': ' + esc(x.talk) : ''}</small></li>`).join('')}</ul>` : '<p>Their answers sit close together on every question.</p>') : ''}
      <div class="row" style="margin-top:12px"><button type="button" class="btn btn-danger btn-sm" data-pm="cardx">Remove the Cards</button></div></div>
      ${Bq ? (Bq.areas || []).map(a => { const aq = (Bq.questions || []).filter(q => q.area === a.id); if (!aq.length) return '';
        return `<div class="card"><h3>${esc(a.name)}</h3>${aq.map(q => `<div class="pm-qa${differs(A[q.id], B[q.id]) ? ' pm-dif' : ''}"><p>${esc(qText(q, k))}</p><div class="pm-two">${k.a ? `<span><b>${esc(na)}</b>: ${esc(scale(A[q.id]))}</span>` : ''}${k.b ? `<span><b>${esc(nb)}</b>: ${esc(scale(B[q.id]))}</span>` : ''}</div></div>`).join('')}</div>`; }).join('') : ''}`;
  }
  const form = have.length === 2 ? '' : `<div class="card"><h2>Bring In Their Card</h2><p>${esc(P.card.lead || '')}</p>
    <label class="f" for="pm-cl">${have.length ? 'The Other Partner\'s Card Link' : 'Card Link'}</label><input type="text" id="pm-cl" autocomplete="off" spellcheck="false" placeholder="Paste a card link from The Grounded Marriage">
    ${have.length ? '' : `<label class="f" for="pm-cl2">The Other Partner's Card Link (if they have one)</label><input type="text" id="pm-cl2" autocomplete="off" spellcheck="false" placeholder="Paste the second card link">`}
    <label class="f" for="pm-cw">Their Shared Word</label><input type="password" id="pm-cw" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="The couple types it">
    ${have.length ? '' : `<label class="pm-yes"><input type="checkbox" id="pm-cy"> <span>${esc(P.card.yes || '')}</span></label>`}
    ${S.cardErr ? `<p class="pm-err" role="alert">${esc(S.cardErr)}</p>` : ''}
    <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold" data-pm="cardin"${S.cardBusy ? ' disabled' : ''}>${S.cardBusy ? 'Opening' : 'Bring In Their Card'}</button></div>
    <p class="muted" style="font-size:14px;margin-top:10px">The word is used once to open the card and is never kept. The answers stay on this device, encrypted with your records.</p></div>`;
  return `${head(c, 'Their Card')}${form}${body}`;
}

// ---------- the Educator's Statement ----------
const invLine = c => { const P = pm().statement; return c.pe ? (P.inventoryPE || FB.statement.inventoryPE) : (P.inventory || FB.statement.inventory); };
function stmtDefaults(c){
  const L = (c.log || []).map(x => x.date).filter(Boolean).sort();
  const df = pm().statement.defaults, st = D().settings || {};
  const lh = df ? {role: st.pmRole || df.role || '', org: st.pmOrg || df.org || '', address: st.pmAddress || df.address || '', phone: st.pmPhone || df.phone || ''}
    : {role: '', org: 'Grow With Grounded LLC', address: 'St. Cloud, Minnesota', phone: '320-291-7393'};
  return {p1: c.p1.full || c.p1.name || '', p2: c.p2.full || c.p2.name || '', educator: me(), role: lh.role, org: lh.org, address: lh.address, phone: lh.phone,
    start: L[0] || '', end: L[L.length - 1] || '', hours: String(Math.round(logMins(c) / 60 * 100) / 100), inventory: invLine(c), signed: ''};
}
function stmtVals(c){ const d = stmtDefaults(c), s = c.stmt || {}; const o = {}; Object.keys(d).forEach(k => { o[k] = (s[k] != null && s[k] !== '') ? s[k] : d[k]; }); (pm().statement.fields || []).forEach(([k]) => { if (!(k in o)) o[k] = s[k] || ''; }); return o; }
const DATEF = ['start', 'end', 'signed', 'date'];
function fillText(v){
  const n = [v.p1, v.p2].filter(Boolean).join(' and ');
  return String(pm().statement.text || '').replace(/\{educator\}/g, v.educator || '________________').replace(/\{names\}/g, n || '________________');
}
const peSwitch = c => `<label class="pm-yes"><input type="checkbox" data-pmpe="1"${c.pe ? ' checked' : ''}> <span><b style="font-weight:600">${esc(pm().pe.label || 'Also using PREPARE/ENRICH')}</b><br><small class="muted">${esc(pm().pe.lead || '')}</small></span></label>`;
function vStatement(c){
  const P = pm().statement, v = stmtVals(c), f = P.fee || {}, short = logMins(c) < STMT() * 60;
  const lock = isEss(c) ? ((ESS().statement || {}).locked || 'Essentials is six hours. The Educator\'s Statement needs at least 12 hours, so it stays locked until 12 hours are logged.')
    : `The Educator's Statement confirms at least ${STMT()} hours of premarital education, so printing opens once ${STMT()} hours are logged.`;
  return `${head(c, 'Educator\'s Statement')}
  <div class="card"><h2>${esc(P.title || 'Educator\'s Statement')}</h2><p>${esc(P.intro || '')}</p>
    ${f.standard ? `<p class="muted" style="font-size:15px">${esc(f.note || ('The license fee is $' + f.standard + ', or $' + f.reduced + ' with the Educator\'s Statement.'))}${f.confirmed ? '' : ' <span class="pm-ck">Check with the County</span>'}${f.source ? `<br><i>Source: ${esc(f.source)}</i>` : ''}</p>` : ''}
    ${short ? `<div class="pm-lock" id="pm-lock"><b>Locked Until ${STMT()} Hours</b><p>${esc(hrs(logMins(c)))} logged so far. ${esc(lock)}</p></div>` : ''}</div>
  ${short ? upgradeBlock(c) : ''}
  <div class="card"><h3>Details</h3><p class="muted" style="font-size:15px">Filled from the couple and the hours log. Change anything here; it prints exactly as shown.</p>
    ${peSwitch(c)}
    <div class="pm-g2" style="margin-top:8px">${(P.fields || []).map(([k, l]) => `<div><label class="f" for="pm-s-${esc(k)}">${esc(l)}</label><input type="${DATEF.includes(k) ? 'date' : 'text'}" id="pm-s-${esc(k)}" data-pms="${esc(k)}" value="${esc(v[k] || '')}" autocomplete="off"></div>`).join('')}</div>
    <h3 style="margin-top:16px">The Statement</h3><p class="pm-quote" id="pm-quote">${esc(fillText(v))}</p>
    <p class="muted" style="font-size:15px">${esc(P.seal || '')}</p>
    <div class="row" style="margin-top:12px">${short ? `<button type="button" class="btn btn-gold" data-pm="print" disabled aria-disabled="true">Printing Opens at ${STMT()} Hours</button>` : '<button type="button" class="btn btn-gold" data-pm="print">Print or Save as PDF</button>'}<button type="button" class="btn btn-line" data-pm="sreset">Fill Again From the Log</button></div>
    ${(P.sources || []).length ? `<p class="pm-src">Sources: ${P.sources.map(esc).join('. ')}.</p>` : ''}</div>`;
}

// ---------- the Certificate of Completion ----------
function certDefaults(c){
  const L = (c.log || []).map(x => x.date).filter(Boolean).sort();
  return {names: fullNames(c), hours: String(Math.max(hnum(logMins(c)), 0)), leaders: leaders(c), date: L[L.length - 1] || today()};
}
function certVals(c){ const d = certDefaults(c), s = c.cert || {}, o = {}; Object.keys(d).forEach(k => { o[k] = (s[k] != null && s[k] !== '') ? s[k] : d[k]; }); return o; }
function vCert(c){
  const P = pmc(c).certificate, v = certVals(c), short = logMins(c) < target(c) * 60;
  return `${head(c, P.title || 'Certificate of Completion')}
  <div class="card"><h2>${esc(P.title || 'Certificate of Completion')}</h2><p>${esc(P.lead || '')}</p>
    ${short ? `<p class="pm-warn">${esc(hrs(logMins(c)))} logged so far. ${esc(P.program || 'The Grounded Marriage')} is ${target(c)} hours; finish the log first.</p>` : ''}
    <div class="pm-g2">${(P.fields || FB.certificate.fields).map(([k, l]) => `<div><label class="f" for="pm-ct-${esc(k)}">${esc(l)}</label><input type="${DATEF.includes(k) ? 'date' : 'text'}" id="pm-ct-${esc(k)}" data-pmct="${esc(k)}" value="${esc(v[k] || '')}" autocomplete="off"></div>`).join('')}</div>
    <p class="pm-quote" id="pm-cq">${esc(certLine(c, v))}</p>
    <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold" data-pm="cprint">Print the Certificate</button><button type="button" class="btn btn-line" data-pm="creset">Fill Again From the Log</button></div></div>`;
}
const certText = (c, v) => String(pmc(c).certificate.text || FB.certificate.text).replace(/\{hours\}/g, v.hours || String(target(c)));
const certLine = (c, v) => { const P = pmc(c).certificate, pg = P.program || 'The Grounded Marriage';
  return `${v.names || '________________'}, ${P.for || 'for completing'} ${pg}${/:/.test(pg) ? ',' : ':'} ${certText(c, v)}. ${v.leaders ? (P.led || 'Led by') + ' ' + v.leaders + ', ' : ''}${nice(v.date)}.`; };
function splitLeaders(s){ return String(s || '').split(/\s*(?:,\s*and\s+|,|&|\band\b)\s*/).map(x => x.trim()).filter(Boolean).slice(0, 4); }
function printCert(c){
  const P = pmc(c).certificate, v = certVals(c), ls = splitLeaders(v.leaders), logo = new URL('/favicon.svg', location.href).href;
  const css = `@page{size:11in 8.5in;margin:0;}
.cw{max-width:11in;margin:14px auto 40px;padding:0 14px;}
.cert{container-type:inline-size;position:relative;width:100%;aspect-ratio:11/8.5;background:#FFFCF6;box-shadow:0 2px 14px rgba(44,24,16,.18);overflow:hidden;}
.cf{position:absolute;inset:2.9cqw;border:.5cqw double #8B5E1A;}
.ci{position:absolute;inset:1.1cqw;border:.1cqw solid #8B5E1A;display:flex;flex-direction:column;align-items:center;text-align:center;padding:2.6cqw 5cqw 1.8cqw;}
.ch{display:flex;align-items:center;gap:.8cqw;}.ch img{width:3.2cqw;height:auto;}.ch span{font-family:"Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.3cqw;font-weight:600;font-size:1.4cqw;color:#8B5E1A;}
.cm{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;padding-bottom:1cqw;}
.ct{font-family:"Cormorant Garamond",Georgia,serif;font-size:5.4cqw;font-weight:600;color:#8B5E1A;line-height:1;}
.cs{font-size:1.6cqw;color:#6B5A4D;margin-top:1.8cqw;letter-spacing:.03cqw;}
.cn{font-family:"Cormorant Garamond",Georgia,serif;font-size:4.6cqw;font-style:italic;font-weight:600;line-height:1.1;margin-top:.4cqw;padding:0 2cqw .4cqw;border-bottom:.1cqw solid #8B5E1A;max-width:84cqw;overflow-wrap:anywhere;}
.cp{font-family:"Cormorant Garamond",Georgia,serif;font-size:4cqw;font-weight:600;line-height:1.1;margin-top:.4cqw;color:#2C1810;}
.cb{font-size:1.7cqw;line-height:1.4;color:#4A3B30;margin-top:1cqw;}
.cwish{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:2.3cqw;color:#5A4B3F;margin-top:2cqw;}
.cd{font-size:1.5cqw;color:#6B5A4D;margin-top:1cqw;}
.cl{width:100%;display:flex;justify-content:center;gap:4cqw;flex-wrap:wrap;}
.cl div{width:24cqw;display:flex;flex-direction:column;}.cl i{display:block;border-bottom:.1cqw solid #2C1810;height:4.4cqw;}.cl span{font-size:1.25cqw;color:#4A3B30;margin-top:.4cqw;}
.cfoot{font-size:1cqw;color:#7A6A5D;margin-top:1.2cqw;}
@media print{.cw{margin:0;padding:0;max-width:none;}.cert{width:11in;height:8.5in;aspect-ratio:auto;box-shadow:none;}}`;
  const body = `<div class="cw"><div class="cert"><div class="cf"><div class="ci">
    <div class="ch"><img src="${esc(logo)}" alt=""><span>GROW WITH GROUNDED</span></div>
    <div class="cm"><div class="ct">${esc(P.title || 'Certificate of Completion')}</div>
    <div class="cs">${esc(P.presented || 'Presented to')}</div>
    <div class="cn">${esc(v.names || '')}</div>
    <div class="cs">${esc(P.for || 'for completing')}</div>
    <div class="cp">${esc(P.program || 'The Grounded Marriage')}</div>
    <div class="cb">${esc(certText(c, v))}</div>
    ${P.wish ? `<div class="cwish">${esc(P.wish)}</div>` : ''}
    <div class="cd">${esc(nice(v.date))}</div></div>
    <div class="cl">${(ls.length ? ls : ['']).map(n => `<div><i></i><span>${esc((P.led || 'Led by') + (n ? ' ' + n : ''))}</span></div>`).join('')}</div>
    <div class="cfoot">Grow With Grounded&trade;, growwithgrounded.com</div>
  </div></div></div></div>`;
  return openPage((P.title || 'Certificate of Completion') + ': ' + (v.names || names(c)), css, body, 'size:11in 8.5in;margin:0;', 'Print in landscape on card stock, and sign it by hand.');
}

// ---------- The Couple ----------
function vAbout(c){
  const f = (k, l, v, t, ph) => `<div><label class="f" for="pm-c-${k}">${l}</label><input type="${t || 'text'}" id="pm-c-${k}" data-pmc="${k}" value="${esc(v || '')}" autocomplete="off"${ph ? ` placeholder="${esc(ph)}"` : ''}></div>`;
  const F = FA(); needM();
  const sel = w => { const card = cardOf(c, w), cf = card && card.fb ? card.fb : '', pick = (c.fb || {})[w] || '';
    const first = cf ? 'From their card: ' + faithName(cf) : 'Not named yet';
    return `<div><label class="f" for="pm-fb-${w}">${esc((c[w].name || (w === 'p1' ? 'First Partner' : 'Second Partner')) + '\'s Faith Background')}</label>
      <select id="pm-fb-${w}" data-pmf="${w}"><option value=""${pick ? '' : ' selected'}>${esc(first)}</option>${F ? (F.list || []).map(x => `<option value="${esc(x.id)}"${pick === x.id ? ' selected' : ''}>${esc(x.name)}</option>`).join('') : ''}</select></div>`; };
  return `${head(c, 'The Couple')}
  <div class="card"><div class="pm-g2">${f('p1.name', 'First Partner', c.p1.name)}${f('p1.full', 'First Partner\'s Full Legal Name', c.p1.full)}${f('p2.name', 'Second Partner', c.p2.name)}${f('p2.full', 'Second Partner\'s Full Legal Name', c.p2.full)}${f('wedding', 'Wedding Date', c.wedding, 'date')}${f('email', 'Email or Phone', c.email)}${f('leaders', 'Leaders\' Names', c.leaders, 'text', me() || 'Your name from Settings')}</div>
    <label class="f" for="pm-c-notes">Notes</label><textarea id="pm-c-notes" data-pmc="notes">${esc(c.notes || '')}</textarea></div>
  <div class="card"><h3>${esc(pm().faith.title || 'Built to Their Faith')}</h3><p class="muted" style="font-size:15px">${esc(pm().faith.pick || 'Each partner\'s faith background comes from their card, or pick it here.')}</p>
    <div class="pm-g2">${sel('p1')}${sel('p2')}</div>${F ? '' : loadingNote('the list of faith backgrounds')}</div>
  ${ESS() ? `<div class="card"><h3>Program</h3>${progPick('pm-c-prog', isEss(c) ? 'essentials' : 'full')}${isUpg(c) ? `<p class="muted" style="font-size:15px;margin-top:8px">Upgraded from Essentials on ${esc(nice(c.upg.on))}. Their Essentials hours stay in the log.</p>` : ''}</div>${upgradeBlock(c)}` : ''}
  <div class="card"><h3>PREPARE/ENRICH</h3>${peSwitch(c)}</div>`;
}

function printStatement(c){
  const P = pm().statement, v = stmtVals(c);
  const line = (l, x) => `<div class="ln"><div class="v">${esc(x || '')}</div><div class="l">${esc(l)}</div></div>`;
  const css = `.doc{font-size:14pt;line-height:1.55;}.lh{text-align:center;border-bottom:2px solid #8B5E1A;padding-bottom:10pt;margin-bottom:22pt;}.lh h2{margin:0;font-size:26pt;font-weight:600;}.lh p{margin:2pt 0 0;font-size:11.5pt;color:#5A4B3F;}
h1{font-size:30pt;font-weight:600;text-align:center;margin:0 0 2pt;}.sub{text-align:center;color:#6B5A4D;font-size:12pt;margin:0 0 22pt;}
.st{font-size:15pt;margin:0 0 18pt;}.dl{display:grid;grid-template-columns:1fr 1fr;gap:6pt 24pt;margin:0 0 26pt;font-size:13pt;}.dl b{font-weight:600;}
.ln{margin-top:30pt;}.ln .v{border-bottom:1.2px solid #2C1810;min-height:22pt;font-size:13pt;}.ln .l{font-size:10.5pt;color:#6B5A4D;margin-top:2pt;}.two{display:grid;grid-template-columns:2fr 1fr;gap:24pt;}
.no{margin-top:30pt;display:grid;grid-template-columns:3fr 2fr;gap:24pt;font-size:12pt;}.no .box{border:1.2px dashed #8B5E1A;min-height:150pt;padding:8pt;color:#6B5A4D;font-size:10.5pt;}
.no h3{margin:0 0 4pt;font-size:15pt;}@media print{.doc{font-size:13.5pt;}}`;
  const body = `<div class="doc"><div class="lh"><h2>${esc(v.org || '')}</h2><p>${esc([v.address, v.phone].filter(Boolean).join(' | '))}</p></div>
  <h1>${esc(P.title || 'Educator\'s Statement')}</h1><p class="sub">Premarital Education, Minnesota Statutes, section 517.08</p>
  <p class="st">${esc(fillText(v))}</p>
  <div class="dl"><div><b>Dates of premarital education:</b> ${esc([nice(v.start), nice(v.end)].filter(Boolean).join(' to '))}</div><div><b>Hours:</b> ${esc(v.hours)}</div><div><b>Premarital inventory:</b> ${esc(v.inventory)}</div>${v.role ? `<div><b>Title:</b> ${esc(v.role)}</div>` : ''}</div>
  <div class="two">${line('Educator\'s signature', '')}${line('Date', nice(v.signed))}</div>
  ${line('Educator\'s printed name and title', [v.educator, v.role].filter(Boolean).join(', '))}
  <div class="no"><div><h3>Notary</h3>State of Minnesota, County of ____________________<br><br>Signed and sworn to before me on ____________________ by ${esc(v.educator || '____________________')}.${line('Notary Public signature', '')}${line('My commission expires', '')}</div>
  <div><h3>Or Church Seal</h3><div class="box">Seal here</div></div></div></div>`;
  return openPage((P.title || 'Educator\'s Statement') + ': ' + fullNames(c), css, body, 'size:letter;margin:.6in .75in;');
}
const PBASE = `*{box-sizing:border-box;}html,body{margin:0;}body{background:#E6DFD2;font-family:Barlow,Helvetica,Arial,sans-serif;color:#2C1810;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
.bar{position:sticky;top:0;z-index:5;display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:10px 14px;background:#2E2118;color:#F6EFE2;font-size:15px;}
.bar b{font-family:"Cormorant Garamond",Georgia,serif;font-size:20px;font-weight:600;margin-right:auto;}
.bar button{min-height:44px;padding:8px 16px;border-radius:10px;border:1.5px solid #D9A847;background:#D9A847;color:#2E2118;font:inherit;font-weight:600;cursor:pointer;}
.tip{padding:8px 14px;font-size:14px;color:#5A4B3F;text-align:center;}
h1,h2,h3{font-family:"Cormorant Garamond",Georgia,serif;}
.doc{background:#FFFCF6;max-width:8.5in;margin:14px auto 40px;padding:.6in .75in;box-shadow:0 2px 14px rgba(44,24,16,.18);}
@media (max-width:700px){.doc{padding:.35in .3in;}}
@media print{.bar,.tip{display:none !important;}body{background:none;}.doc{margin:0;box-shadow:none;max-width:none;padding:0;}}`;
function openPage(title, css, body, page, tip){
  const fonts = new URL('/fonts/fonts.css', location.href).href;
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${esc(title)}</title><link rel="stylesheet" href="${fonts}"><style>@page{${page}}${PBASE}${css || ''}</style></head><body>
<div class="bar"><b>${esc(title)}</b><button type="button" onclick="window.print()">Print or Save as PDF</button></div><div class="tip">To keep a copy, choose Save as PDF in the print window. ${esc(tip || 'Sign it in front of a notary, or add the church seal.')}</div>${body}</body></html>`;
  API.last = {title, html};
  if (typeof API.printer === 'function') return API.printer(title, html);
  let w = null; try { w = window.open('', '_blank'); } catch (e) { w = null; }
  if (w && w.document){ w.document.open(); w.document.write(html); w.document.close(); try { w.focus(); } catch (e) {} return w; }
  const f = document.createElement('iframe'); f.setAttribute('aria-hidden', 'true'); f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
  document.body.appendChild(f); f.contentDocument.open(); f.contentDocument.write(html); f.contentDocument.close();
  setTimeout(() => { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) {} setTimeout(() => f.remove(), 60000); }, 900);
  return null;
}

function inner(){
  if (S.view !== 'home' && !cur()) S.view = 'home';
  const c = cur();
  switch (S.view){
    case 'sessions': return vSessions(c);
    case 'session': return vSession(c);
    case 'hours': return vHours(c);
    case 'card': return vCard(c);
    case 'statement': return vStatement(c);
    case 'cert': return vCert(c);
    case 'about': return vAbout(c);
    default: return vHome();
  }
}
function rerender(keepScroll){
  const r = document.getElementById('pm-root'); if (!r) return;
  const y = window.scrollY; r.innerHTML = inner();
  window.scrollTo(0, keepScroll ? y : 0);
}
function goView(v){ S.view = v; S.cardErr = ''; rerender(); }
const val = id => ((document.getElementById(id) || {}).value || '');

async function cardIn(c){
  const k0 = c.card, links = [val('pm-cl'), val('pm-cl2')].map(x => x.trim()).filter(Boolean), word = val('pm-cw'), yes = k0 ? true : (document.getElementById('pm-cy') || {}).checked;
  S.cardErr = '';
  if (!links.length){ S.cardErr = 'Paste the card link first.'; rerender(true); return; }
  const codes = links.map(codeOf);
  if (codes.some(x => !x)){ S.cardErr = 'That link does not look like a card from The Grounded Marriage. Copy it again from their phone.'; rerender(true); return; }
  if (!word.trim()){ S.cardErr = 'The couple types their shared word to open the card.'; rerender(true); return; }
  if (!yes){ S.cardErr = 'Check the box once both partners say yes to sharing their cards.'; rerender(true); return; }
  S.cardBusy = true; rerender(true);
  try {
    const got = []; for (const x of codes) got.push(await readCard(x, word));
    const k = k0 ? JSON.parse(JSON.stringify(k0)) : {brought: today(), yes: {on: today(), text: pm().card.yes || 'Both partners said yes.'}};
    got.forEach(o => { const slot = k.a && k.a.n === o.n ? 'a' : k.b && k.b.n === o.n ? 'b' : !k.a ? 'a' : 'b'; k[slot] = o; });
    c.card = k; c.pre = c.pre || {}; if (k.a && k.b && !c.pre.card) c.pre.card = Date.now();
    keep(c); S.cardBusy = false; rerender(true); toast(got.length > 1 || (k.a && k.b) ? 'Their cards are in.' : 'The card is in.');
  } catch (e){
    S.cardBusy = false; S.cardErr = e && e.message === 'word' ? 'That word did not open the card. Let the couple try again.' : 'That card could not be read. The couple can make a fresh card.'; rerender(true);
  }
}
function act(k, v){
  const c = cur();
  switch (k){
    case 'home': S.id = null; goView('home'); return;
    case 'add': { const a = val('pm-a').trim(), b = val('pm-b').trim(); if (!a || !b){ toast('Add both first names.'); return; } const x = newCouple(a, b, val('pm-w'), val('pm-p') || 'full'); list().push(x); keep(x); S.id = x.id; toast('Couple added.'); goView('sessions'); return; }
    case 'open': S.id = v; goView('sessions'); return;
    case 'del': { const x = list().find(y => y.id === v); if (!x || !confirm('Delete ' + names(x) + '? This removes their sessions, log, and card from this device.')) return; const d = D(); d.deleted = d.deleted || {clients: {}, sessions: {}}; d.deleted.pm = d.deleted.pm || {}; d.deleted.pm[x.id] = Date.now(); d.pm.couples = list().filter(y => y !== x); CTX.save(); toast('Deleted.'); rerender(true); return; }
    case 'copylink': copyText(pm().app.link || APP_LINK); if (c){ c.pre = c.pre || {}; if (!c.pre.link){ c.pre.link = Date.now(); keep(c); rerender(true); } } return;
  }
  if (!c) return;
  switch (k){
    case 'go': goView(v); return;
    case 'status': c.status = v; keep(c); rerender(true); return;
    case 'session': S.n = String(v); goView('session'); return;
    case 'upgrade': if (!isEss(c) || !confirm('Move ' + names(c) + ' to the full program? Their logged hours stay, and three more sessions bring them to ' + STMT() + ' hours.')) return; upgrade(c); goView('sessions'); toast('Upgraded to the full program.'); return;
    case 'logsess': { const s = SES(v); c.log = c.log || []; c.log.push({id: uid(), date: today(), mins: +(s && s.mins) || 120, n: nk(v), notes: ''}); if (c.status === 'starting') c.status = 'sessions'; keep(c); rerender(true); toast('Logged. ' + hrs(logMins(c)) + ' in all.'); return; }
    case 'logadd': { const m = Math.max(0, +val('pm-lm') || 0); if (!m){ toast('Add the minutes first.'); return; } c.log = c.log || []; c.log.push({id: uid(), date: val('pm-ld') || today(), mins: m, n: nk(val('pm-ln')), notes: val('pm-lt')}); if (c.status === 'starting') c.status = 'sessions'; keep(c); rerender(true); toast('Added. ' + hrs(logMins(c)) + ' in all.'); return; }
    case 'logdel': c.log = (c.log || []).filter(x => x.id !== v); keep(c); rerender(true); return;
    case 'cardin': cardIn(c); return;
    case 'cardx': if (!confirm('Remove their card from this device? They can share it again anytime.')) return; c.card = null; keep(c); rerender(true); return;
    case 'sreset': c.stmt = {}; keep(c); rerender(true); toast('Filled again from the log.'); return;
    case 'print': if (logMins(c) < STMT() * 60){ toast('The Educator\'s Statement opens at ' + STMT() + ' logged hours.'); return; } printStatement(c); return;
    case 'creset': c.cert = {}; keep(c); rerender(true); toast('Filled again from the log.'); return;
    case 'cprint': printCert(c); return;
  }
}

// Tapping the Premarital tab while it is open returns to the couples list.
document.addEventListener('click', e => {
  const tb = e.target.closest && e.target.closest('#tabs [data-tab="premarital"]');
  if (tb && document.getElementById('pm-root')){ S.view = 'home'; S.id = null; }
}, true);
document.addEventListener('click', e => {
  const t = e.target.closest && e.target.closest('[data-pm]'); if (!t || !t.closest('#pm-root')) return;
  e.preventDefault(); act(t.dataset.pm, t.dataset.v || '');
});
function setLog(c, spec, value){ const [f, id] = spec.split('|'), x = (c.log || []).find(y => y.id === id); if (!x) return; x[f] = f === 'mins' ? Math.max(0, +value || 0) : f === 'n' ? nk(value) : value; keep(c); }
document.addEventListener('change', e => {
  const t = e.target; if (!t.closest || !t.closest('#pm-root')) return; const c = cur(); if (!c) return;
  if (t.dataset.pmck != null){ const st = sess(c, S.n); if (t.checked) st.ck[t.dataset.pmck] = Date.now(); else delete st.ck[t.dataset.pmck]; keep(c); return; }
  if (t.dataset.pmpre != null){ c.pre = c.pre || {}; if (t.checked) c.pre[t.dataset.pmpre] = Date.now(); else delete c.pre[t.dataset.pmpre]; keep(c); rerender(true); return; }
  if (t.dataset.pmpe != null){ c.pe = !!t.checked; keep(c); rerender(true); return; }
  if (t.dataset.pmf){ c.fb = c.fb || {}; if (t.value) c.fb[t.dataset.pmf] = t.value; else delete c.fb[t.dataset.pmf]; keep(c); return; }
  if (t.dataset.pml){ setLog(c, t.dataset.pml, t.value); rerender(true); return; }
  if (t.dataset.pmc === 'wedding'){ c.wedding = t.value; keep(c); return; }
  if (t.dataset.pmprog){
    if (t.value === 'essentials'){ c.program = 'essentials'; delete c.upg; keep(c); }
    else if (isEss(c)){ if ((c.log || []).some(x => /^e\d+$/.test(String(x.n)))) upgrade(c); else { c.program = 'full'; keep(c); } }
    rerender(true); return;
  }
  if (t.dataset.pmdeep){
    const n = +t.dataset.pmdeep, d = deeper(c).filter(x => x !== n), max = +((ESS() || {}).upgrade || {}).count || 3;
    if (t.checked && d.length >= max){ t.checked = false; toast('Choose ' + max + '. Uncheck one first.'); return; }
    if (t.checked) d.push(n); c.upg.deeper = d.sort((a, b) => a - b); keep(c); rerender(true); return;
  }
});
document.addEventListener('input', e => {
  const t = e.target; if (!t.closest || !t.closest('#pm-root')) return; const c = cur(); if (!c) return;
  if (t.dataset.pmn){ sess(c, t.dataset.pmn).notes = t.value; keep(c); return; }
  if (t.dataset.pms){ c.stmt = c.stmt || {}; c.stmt[t.dataset.pms] = t.value; keep(c); const q = document.getElementById('pm-quote'); if (q) q.textContent = fillText(stmtVals(c)); return; }
  if (t.dataset.pmct){ c.cert = c.cert || {}; c.cert[t.dataset.pmct] = t.value; keep(c); const q = document.getElementById('pm-cq'); if (q) q.textContent = certLine(c, certVals(c)); return; }
  if (t.dataset.pml && t.tagName === 'INPUT' && t.type === 'text'){ setLog(c, t.dataset.pml, t.value); return; }
  if (t.dataset.pmc){ const [a, b] = t.dataset.pmc.split('.'); if (b) c[a][b] = t.value; else c[a] = t.value; keep(c); return; }
});

const CSS = `
#pm-root .card{min-width:0;}
.pm-g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 14px;}
.pm-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0 14px;}
.pm-g4{display:grid;grid-template-columns:1fr .7fr .9fr 1.6fr;gap:0 12px;}
@media (max-width:760px){.pm-g2,.pm-g3,.pm-g4{grid-template-columns:minmax(0,1fr);}}
#pm-root select{max-width:100%;}
.pm-row{display:flex;gap:12px;justify-content:space-between;align-items:center;flex-wrap:wrap;padding:12px 0;border-top:1px solid var(--line);}
.pm-row:first-of-type{border-top:0;}.pm-row .m{min-width:0;flex:1 1 240px;}
.pm-bar{height:10px;border-radius:6px;background:var(--bg-deep);overflow:hidden;margin:8px 0 2px;}.pm-bar span{display:block;height:100%;background:var(--gold);}
.pm-head{display:flex;gap:14px;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;}
.pm-chips{display:flex;flex-wrap:wrap;gap:8px;}.pm-chips .chip{min-height:44px;}
.pm-nav{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 14px;}
.pm-nav .btn[aria-current="page"]{background:var(--umber);border-color:var(--umber);color:#F4EBDA;}
.pm-ck,.pm-ul{margin:8px 0 0;padding:0;list-style:none;}
.pm-ul{padding-left:20px;list-style:disc;}.pm-ul li{margin:4px 0;}
.pm-ck li{border-top:1px solid var(--line);}.pm-ck li:first-child{border-top:0;}
.pm-ck label{display:flex;gap:12px;align-items:flex-start;padding:10px 0;cursor:pointer;}
.pm-ck input{width:22px;height:22px;margin-top:3px;flex:none;accent-color:var(--gold);}
.pm-min{display:inline-block;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:var(--gold);margin-right:4px;}
.pm-tags{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 4px;}.pm-tags .pill{white-space:normal;}
.pm-talk{margin-top:12px;padding:12px 14px;border-radius:12px;background:var(--bg-deep);}
.pm-safe{border-left:4px solid var(--danger);}
.pm-src{font-size:14px;font-style:italic;color:var(--ink-soft);margin-top:14px;overflow-wrap:anywhere;}
.pm-big{font-family:'Cormorant Garamond',Georgia,serif;font-size:calc(30px * var(--scale));font-weight:600;color:var(--gold);}
.pm-log{padding:10px 0;border-top:1px solid var(--line);}.pm-log:first-of-type{border-top:0;}
.pm-yes{display:flex;gap:10px;align-items:flex-start;margin-top:14px;cursor:pointer;}.pm-yes input{width:22px;height:22px;margin-top:3px;flex:none;accent-color:var(--gold);}
.pm-err,.pm-warn{color:var(--danger);font-weight:600;margin-top:10px;}
span.pm-ck{display:inline-block;font-size:13px;font-weight:700;color:var(--danger);}
.pm-quote{font-family:'Cormorant Garamond',Georgia,serif;font-size:calc(21px * var(--scale));line-height:1.45;padding:12px 16px;border-left:3px solid var(--gold);background:var(--bg-deep);border-radius:0 12px 12px 0;overflow-wrap:anywhere;}
.pm-qa{padding:10px 0;border-top:1px solid var(--line);}.pm-qa:first-of-type{border-top:0;}.pm-qa p{margin:0 0 4px;}
.pm-qa.pm-dif{border-left:3px solid var(--gold);padding-left:10px;}
.pm-two{display:flex;flex-wrap:wrap;gap:4px 18px;font-size:15px;color:var(--ink-soft);}
.pm-pre{border-left:4px solid var(--gold);}
.pm-det>summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:10px;min-height:44px;}
.pm-det>summary::-webkit-details-marker{display:none;}
.pm-det>summary::after{content:'+';margin-left:auto;font-size:24px;color:var(--gold);font-weight:600;}
.pm-det[open]>summary::after{content:'\\2212';}
.pm-det>summary h3{margin:0;}
.pm-tip{padding:10px 0;border-top:1px solid var(--line);}.pm-tip p{margin:4px 0 0;}
.pm-tip.pm-safe{padding-left:12px;}
.pm-st{padding:10px 0;border-top:1px solid var(--line);}.pm-st:first-of-type{border-top:0;}.pm-st h4,.pm-fg h4{margin:0 0 4px;font-size:calc(19px * var(--scale));}
.pm-st-strong{border-left:4px solid var(--sage);padding-left:12px;}.pm-st-talk{border-left:4px solid var(--gold);padding-left:12px;}.pm-st-grow{border-left:4px solid var(--umber);padding-left:12px;}
.pm-fg{margin-top:12px;padding:12px 14px;border-radius:12px;background:var(--bg-deep);}.pm-fg p{margin:4px 0;}
.pm-sub{display:block;margin-top:8px;}
.pm-note{font-weight:600;}
.pm-ol{margin:8px 0 0;padding-left:22px;}.pm-ol li{margin:6px 0;}
.pm-upg{border-left:4px solid var(--sage);}
.pm-lock{margin-top:12px;padding:12px 14px;border-radius:12px;background:var(--bg-deep);border-left:4px solid var(--gold);}.pm-lock p{margin:4px 0 0;}
`;
(function(){ const s = document.createElement('style'); s.id = 'pm-css'; s.textContent = CSS; document.head.appendChild(s); })();

const API = window.GGPm = {
  // ctx: {lib, field, data, save}. A different DATA (another unlock) starts fresh at the couples list.
  view(ctx){
    ctx = ctx || {};
    if (CTX.data && ctx.data !== CTX.data){ S.view = 'home'; S.id = null; }
    CTX = {lib: ctx.lib || null, field: ctx.field || null, data: ctx.data || null, save: typeof ctx.save === 'function' ? ctx.save : () => {}};
    needM();
    return `<div id="pm-root">${inner()}</div>`;
  },
  // Backups: couples combine like saved services; the newest copy of each wins and deleted ones stay deleted.
  merge(out, inc){
    out.deleted = out.deleted || {clients: {}, sessions: {}}; out.deleted.pm = out.deleted.pm || {};
    Object.entries((inc.deleted || {}).pm || {}).forEach(([id, ts]) => { out.deleted.pm[id] = Math.max(out.deleted.pm[id] || 0, ts); });
    out.pm = out.pm || {couples: []}; out.pm.couples = out.pm.couples || []; let added = 0, updated = 0;
    ((inc.pm || {}).couples || []).forEach(x => { const i = out.pm.couples.findIndex(y => y.id === x.id); if (i < 0){ out.pm.couples.push(x); added++; } else if ((x.u || 0) > (out.pm.couples[i].u || 0)){ out.pm.couples[i] = x; updated++; } });
    out.pm.couples = out.pm.couples.filter(x => !(out.deleted.pm[x.id] && out.deleted.pm[x.id] >= (x.u || 0)));
    return {added, updated};
  },
  // For tests and the lead.
  state: S, data: pm, program: pmc, current: cur, page: openPage, readCard, codeOf, talkList, summaryOf, faithOf, printer: null, last: null
};
})();
