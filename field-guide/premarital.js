// =====================================================================
// GROUNDED FIELD GUIDE (TM): Premarital Sessions, the Premarital tab (GWG BLD 750, CER 3).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// A Staff and Founder tab for Chris and Kayti leading premarital education:
// a couples list; for each couple the six two-hour sessions with the plan as a
// checklist and notes; an hours log toward 12; Bring In Their Card (the couple's
// Before the Vows card, unlocked by the word only the two of them know, shown
// read only with their yes recorded); and the Educator's Statement for the
// Minnesota reduced license fee, filled from the log and printed.
// Data: the Staff library's premarital key (LIB.premarital), with a small
// built-in fallback so the tab works before that library update is applied.
// Couples live in DATA.pm.couples: encrypted with the rest of this device's
// records and carried in backups (merged by GGPm.merge). Nothing is sent.
// =====================================================================
(function(){
'use strict';

// ---------- the built-in fallback (the plan's shape, short) ----------
const FB = {
  title: 'Premarital Sessions',
  lead: 'Twelve hours with the two of you, in six two-hour sessions. The full session plans arrive with the next Staff library update.',
  sessions: [
    [1, 'Your Story and Your Hopes', ['expect', 'fun', 'dreams']],
    [2, 'Your Inventory: Strengths and Growing Edges', ['expect', 'home', 'family']],
    [3, 'Communication: Speaking and Listening', ['talk', 'close']],
    [4, 'Conflict and Repair', ['repair', 'health']],
    [5, 'Money, Families, and Home', ['money', 'family', 'home']],
    [6, 'Meaning, Children, and the Road Ahead', ['faith', 'kids', 'close', 'dreams']]
  ].map(([n, title, btvAreas]) => ({n, title, mins: 120, goals: [], outline: [[120, 'The full plan for this session arrives with the next Staff library update.']], practice: '', bridge: '', btvAreas})),
  hours: {target: 12, note: 'Minnesota asks for at least 12 hours of premarital education, including a premarital inventory and the teaching of communication and conflict management skills.'},
  statement: {
    title: 'Educator\'s Statement',
    intro: 'For the reduced marriage license fee, the couple brings this statement when they apply. It is signed and dated by the educator, on letterhead, and notarized or marked with a church seal.',
    text: 'I, {educator}, confirm that {names} received at least 12 hours of premarital education that included the use of a premarital inventory and the teaching of communication and conflict management skills. I am a licensed or ordained minister, a person authorized to solemnize marriages under Minnesota Statutes, section 517.18, or a person licensed to practice marriage and family therapy under Minnesota Statutes, section 148B.33.',
    fields: [['p1', 'First Partner\'s Full Name'], ['p2', 'Second Partner\'s Full Name'], ['educator', 'Educator\'s Full Name'], ['role', 'Educator\'s Title or Credential'], ['org', 'Organization (the Letterhead)'], ['address', 'Address'], ['phone', 'Phone'], ['start', 'First Session Date'], ['end', 'Last Session Date'], ['hours', 'Hours of Premarital Education'], ['inventory', 'Premarital Inventory Used'], ['signed', 'Date Signed']],
    seal: 'Sign and date in front of a notary, or mark the statement with the church seal. Print it on the educator\'s letterhead.',
    fee: {standard: 125, reduced: 50, confirmed: false}
  },
  card: {lead: 'If the couple wants to, they can share their Before the Vows cards with you. Paste one card link from each partner, then let the couple type the word only the two of them know.', yes: 'Both partners said yes to sharing this card with us for our sessions.'},
  safety: {lead: 'Meet with each partner alone for a few minutes. Whatever they share stays with them. Give each person these lines privately.', lines: [['Love Is Respect', 'Call 1-866-331-9474 or text LOVEIS to 22522'], ['National Domestic Violence Hotline', 'Call 1-800-799-7233'], ['Day One (Minnesota)', 'Call 1-866-223-1111'], ['988 Suicide and Crisis Lifeline', 'Call or text 988'], ['Emergency', 'Call 911']]},
  credits: []
};
// Before the Vows area names, used until before-the-vows/questions.js loads.
const AREAS = {talk: 'Talking and Listening', repair: 'Conflict and Repair', money: 'Money', family: 'Families and In-Laws', home: 'Home and Roles', expect: 'Hopes and Expectations', close: 'Affection and Closeness', kids: 'Children and Parenting', faith: 'Faith and Meaning', fun: 'Friends and Fun', health: 'Health and Stress', dreams: 'Dreams and Commitment'};
const STATUS = [['starting', 'Getting Started'], ['sessions', 'In Sessions'], ['complete', 'Complete']];
const NAV = [['sessions', 'Sessions'], ['hours', 'Hours Log'], ['card', 'Their Card'], ['statement', 'Educator\'s Statement'], ['about', 'The Couple']];

let CTX = {lib: null, data: null, save: () => {}};
const S = {view: 'home', id: null, n: null, cardErr: '', cardBusy: false};

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const nice = d => { const m = /^(\d{4})-(\d\d)-(\d\d)/.exec(d || ''); if (!m) return d || ''; return new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}); };
const hnum = m => Math.round((m || 0) / 60 * 100) / 100;
const hrs = m => { const h = Math.round((m || 0) / 60 * 100) / 100; return (h === 1 ? '1 hour' : h + ' hours'); };
function toast(t){ const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 2200); }

// ---------- the library (LIB.premarital, filled in from the fallback where a piece is missing) ----------
let PC = null, PCsrc = null;
function pm(){
  const L = (CTX.lib && CTX.lib.premarital) || null;
  if (PC && PCsrc === L) return PC;
  const has = !!(L && Array.isArray(L.sessions) && L.sessions.length);
  PC = Object.assign({}, FB, has ? L : {}, {
    full: has,
    sessions: has ? L.sessions : FB.sessions,
    hours: Object.assign({}, FB.hours, (L && L.hours) || {}),
    statement: Object.assign({}, FB.statement, (L && L.statement) || {}),
    card: Object.assign({}, FB.card, (L && L.card) || {}),
    safety: Object.assign({}, FB.safety, (L && L.safety) || {})
  });
  PC.statement.fee = Object.assign({}, FB.statement.fee, PC.statement.fee || {});
  PCsrc = L;
  return PC;
}
const SES = n => pm().sessions.find(x => +x.n === +n);
const target = () => +pm().hours.target || 12;

// ---------- Before the Vows questions (data only), loaded once from the public tool when it is there ----------
let QL = 'idle';
function needQ(){
  if (window.BTV_Q || QL !== 'idle') return;
  QL = 'loading';
  const s = document.createElement('script'); s.src = new URL('../before-the-vows/questions.js', location.href).href;
  s.onload = () => { QL = 'done'; rerender(true); }; s.onerror = () => { QL = 'none'; };
  document.head.appendChild(s);
}
const Q = () => window.BTV_Q || null;
const areaName = id => { const q = Q(); const a = q && (q.areas || []).find(x => x.id === id); return (a && a.name) || AREAS[id] || id; };

// ---------- couples ----------
function D(){ return CTX.data || {}; }
function list(){ const d = D(); d.pm = d.pm || {couples: []}; d.pm.couples = d.pm.couples || []; return d.pm.couples; }
const cur = () => list().find(x => x.id === S.id) || null;
function keep(c){ if (!c) return; c.u = Date.now(); CTX.save(); }
const names = c => [c.p1.name, c.p2.name].filter(Boolean).join(' and ') || 'A New Couple';
const fullNames = c => [c.p1.full || c.p1.name, c.p2.full || c.p2.name].filter(Boolean).join(' and ');
const logMins = c => (c.log || []).reduce((a, x) => a + (+x.mins || 0), 0);
function sess(c, n){ c.sess = c.sess || {}; c.sess[n] = c.sess[n] || {ck: {}, notes: ''}; c.sess[n].ck = c.sess[n].ck || {}; return c.sess[n]; }
function newCouple(a, b, wed){ return {id: uid(), u: Date.now(), made: Date.now(), status: 'starting', p1: {name: a, full: ''}, p2: {name: b, full: ''}, wedding: wed || '', sess: {}, log: [], card: null, stmt: {}}; }

// ---------- views ----------
function bar(c){
  const done = logMins(c), t = target() * 60, pc = Math.min(100, Math.round(done / t * 100));
  return `<div class="pm-bar" role="img" aria-label="${esc(hrs(done))} of ${target()} hours"><span style="width:${pc}%"></span></div><small class="muted">${hnum(done)} of ${target()} hours logged</small>`;
}
function vHome(){
  const P = pm(), L = list().slice().sort((a, b) => (b.u || 0) - (a.u || 0));
  return `<div class="page-head"><div class="eyebrow">Grow With Grounded</div><h1>${esc(P.title || 'Premarital Sessions')}</h1><p>${esc(P.lead || '')}</p></div>
  <div class="card"><h2 style="margin-bottom:4px">Add a Couple</h2>
    <div class="pm-g3"><div><label class="f" for="pm-a">First Partner</label><input type="text" id="pm-a" autocomplete="off" placeholder="First name"></div>
    <div><label class="f" for="pm-b">Second Partner</label><input type="text" id="pm-b" autocomplete="off" placeholder="First name"></div>
    <div><label class="f" for="pm-w">Wedding Date</label><input type="date" id="pm-w"></div></div>
    <div class="row" style="margin-top:14px"><button type="button" class="btn btn-gold" data-pm="add">Add the Couple</button></div></div>
  <div class="card"><h2 style="margin-bottom:4px">Couples</h2>
    ${L.length ? L.map(c => `<div class="pm-row"><div class="m"><b>${esc(names(c))}</b> <span class="pill ${c.status === 'complete' ? 'sage' : 'gold'}">${esc((STATUS.find(x => x[0] === c.status) || STATUS[0])[1])}</span><br><small class="muted">${c.wedding ? 'Wedding ' + esc(nice(c.wedding)) : 'Wedding date not set yet'}</small><div style="max-width:320px">${bar(c)}</div></div>
      <div class="row"><button type="button" class="btn btn-gold btn-sm" data-pm="open" data-v="${c.id}">Open</button><button type="button" class="btn btn-danger btn-sm" data-pm="del" data-v="${c.id}">Delete</button></div></div>`).join('')
      : '<p class="muted">Couples you add show here. They stay on this device, encrypted with your records, and travel in your backups.</p>'}</div>
  ${P.full ? '' : '<p class="muted" style="margin-top:12px;font-size:15px">The full session plans arrive with the next Staff library update.</p>'}`;
}
function head(c, eyebrow){
  return `<button type="button" class="linkbtn" data-pm="home">&larr; All Couples</button>
  <div class="page-head pm-head" style="margin-top:10px"><div style="min-width:0"><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(names(c))}</h1><p>${c.wedding ? 'Wedding ' + esc(nice(c.wedding)) + '. ' : ''}${hnum(logMins(c))} of ${target()} hours logged.</p></div>
  <div class="pm-chips">${STATUS.map(([k, l]) => `<button type="button" class="chip" data-pm="status" data-v="${k}" aria-pressed="${(c.status || 'starting') === k}">${l}</button>`).join('')}</div></div>
  <div class="pm-nav">${NAV.map(([v, l]) => `<button type="button" class="btn btn-line btn-sm" data-pm="go" data-v="${v}"${(S.view === v || (v === 'sessions' && S.view === 'session')) ? ' aria-current="page"' : ''}>${l}</button>`).join('')}</div>`;
}
function vSessions(c){
  return `${head(c, 'Sessions')}
  ${pm().sessions.map(s => { const st = sess(c, s.n), n = (s.outline || []).length, d = Object.keys(st.ck).filter(k => st.ck[k]).length, lg = (c.log || []).filter(x => +x.n === +s.n).reduce((a, x) => a + (+x.mins || 0), 0);
    return `<div class="card pm-sc"><div class="spread"><div style="min-width:0"><div class="eyebrow">Session ${s.n}</div><h3>${esc(s.title)}</h3><small class="muted">${d} of ${n} parts checked${lg ? ', ' + esc(hrs(lg)) + ' logged' : ''}${st.notes ? ', notes kept' : ''}</small></div>
      <button type="button" class="btn btn-gold btn-sm" data-pm="session" data-v="${s.n}">Open Session ${s.n}</button></div></div>`; }).join('')}`;
}
function talkFor(c, areas){
  if (c.card) needQ();
  const t = c.card ? talkList(c.card).filter(x => areas.includes(x.area)) : [];
  if (!t.length) return '';
  return `<div class="pm-talk"><b>From Their Card: Talk About This</b><ul>${t.map(x => `<li>${esc(x.text)}${x.talk ? `<br><small class="muted">${esc(x.talk)}</small>` : ''}</li>`).join('')}</ul></div>`;
}
function vSession(c){
  const s = SES(S.n); if (!s) return vSessions(c);
  const st = sess(c, s.n), P = pm();
  let at = 0;
  const rows = (s.outline || []).map((r, i) => { const from = at; at += +r[0] || 0;
    return `<li><label><input type="checkbox" data-pmck="${i}"${st.ck[i] ? ' checked' : ''}><span><span class="pm-min">${from} to ${at} min</span> ${esc(r[1])}</span></label></li>`; }).join('');
  const lines = (P.safety.lines || []).map(([n, h]) => `<li><b>${esc(n)}</b>: ${esc(h)}</li>`).join('');
  return `${head(c, 'Session ' + s.n)}
  <div class="card"><div class="spread"><h2>${esc(s.title)}</h2><span class="pill">${esc(s.mins || at)} minutes</span></div>
    ${(s.goals || []).length ? `<h3 style="margin-top:10px">Goals</h3><ul class="pm-ul">${s.goals.map(g => `<li>${esc(g)}</li>`).join('')}</ul>` : ''}
    <h3 style="margin-top:14px">The Plan</h3><ul class="pm-ck">${rows}</ul>
    ${s.practice ? `<h3 style="margin-top:14px">Practice</h3><p>${esc(s.practice)}</p>` : ''}
    ${s.bridge ? `<h3 style="margin-top:14px">Before Next Time</h3><p>${esc(s.bridge)}</p>` : ''}
    ${(s.btvAreas || []).length ? `<h3 style="margin-top:14px">Before the Vows Areas</h3><div class="pm-tags">${s.btvAreas.map(a => `<span class="pill">${esc(areaName(a))}</span>`).join('')}</div>${talkFor(c, s.btvAreas)}` : ''}
  </div>
  ${s.safety ? `<div class="card pm-safe"><h3>Time With Each Partner Alone</h3><p>${esc(P.safety.lead || '')}</p><ul class="pm-ul">${lines}</ul></div>` : ''}
  <div class="card"><label class="f" for="pm-notes">Notes for Session ${s.n}</label><textarea id="pm-notes" data-pmn="${s.n}" placeholder="What the couple shared, what to come back to">${esc(st.notes || '')}</textarea>
    <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold" data-pm="logsess" data-v="${s.n}">Log This Session (${esc(s.mins || 120)} minutes, today)</button>${s.n < pm().sessions.length ? `<button type="button" class="btn btn-line" data-pm="session" data-v="${s.n + 1}">Session ${s.n + 1}</button>` : ''}</div></div>
  ${(s.credits || []).length ? `<p class="pm-src">Sources: ${s.credits.map(esc).join('. ')}.</p>` : ''}`;
}
function vHours(c){
  const L = (c.log || []).slice().sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  const opts = sel => `<option value="0"${+sel === 0 ? ' selected' : ''}>Other</option>` + pm().sessions.map(s => `<option value="${s.n}"${+sel === +s.n ? ' selected' : ''}>Session ${s.n}</option>`).join('');
  return `${head(c, 'Hours Log')}
  <div class="card"><div class="spread"><h2>Hours Toward ${target()}</h2><span class="pm-big">${esc(hrs(logMins(c)))}</span></div>${bar(c)}
    <p class="muted" style="font-size:15px;margin-top:8px">${esc(pm().hours.note || '')}</p></div>
  <div class="card"><h3>Add Time</h3>
    <div class="pm-g4"><div><label class="f" for="pm-ld">Date</label><input type="date" id="pm-ld" value="${today()}"></div>
    <div><label class="f" for="pm-lm">Minutes</label><input type="number" id="pm-lm" min="0" step="5" value="120"></div>
    <div><label class="f" for="pm-ln">Session</label><select id="pm-ln">${opts(Math.min(pm().sessions.length, ((c.log || []).length || 0) + 1))}</select></div>
    <div><label class="f" for="pm-lt">Notes</label><input type="text" id="pm-lt" autocomplete="off"></div></div>
    <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold" data-pm="logadd">Add to the Log</button></div></div>
  <div class="card"><h3>The Log</h3>
    ${L.length ? L.map(x => `<div class="pm-log"><div class="pm-g4"><div><label class="f">Date</label><input type="date" data-pml="date|${x.id}" value="${esc(x.date || '')}"></div>
      <div><label class="f">Minutes</label><input type="number" min="0" step="5" data-pml="mins|${x.id}" value="${esc(x.mins)}"></div>
      <div><label class="f">Session</label><select data-pml="n|${x.id}">${opts(x.n)}</select></div>
      <div><label class="f">Notes</label><input type="text" data-pml="notes|${x.id}" value="${esc(x.notes || '')}"></div></div>
      <button type="button" class="btn btn-line btn-sm" data-pm="logdel" data-v="${x.id}" style="margin-top:8px">Remove</button></div>`).join('') : '<p class="muted">No time logged yet. Log a session from its plan, or add time here.</p>'}</div>`;
}

// ---------- Before the Vows cards ----------
// Each partner makes a card from their own answers (before-the-vows/app.js): a link ending #btv=b1.<code>, where the
// code is base64url of salt (16 bytes), iv (12), then the AES-GCM text, keyed by PBKDF2 (250,000 rounds, SHA-256) from
// the shared word (trimmed, lowercase). Inside: {v: 1, q: questions version, n: this partner's first name, to: the other's,
// fw: 'f' (Faith wording) or 'p' (Plain), a: one digit per question in questions.js order, 0 for skipped}.
// Safety answers never ride on a card. The word is used once here and never kept.
const unb64u = s => { s = String(s).replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; const b = atob(s), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; };
function codeOf(t){ t = String(t || '').trim(); const m = /(?:^|[#&?])btv=(b1\.[A-Za-z0-9_-]{20,2000})/.exec(t); return m ? m[1] : (/^b1\.[A-Za-z0-9_-]{20,2000}$/.test(t) ? t : ''); }
function cardOk(o){
  if (!o || typeof o !== 'object' || Array.isArray(o) || o.v !== 1 || typeof o.q !== 'number') return null;
  const nm = x => typeof x === 'string' && x && x.length <= 24 && !/[<>&"`\\\u0000-\u001F\u007F\s]/.test(x);
  if (!nm(o.n) || !nm(o.to) || (o.fw !== 'f' && o.fw !== 'p') || typeof o.a !== 'string' || !/^[0-5]{1,300}$/.test(o.a)) return null;
  return {v: 1, q: o.q, n: o.n, to: o.to, fw: o.fw, a: o.a};
}
async function readCard(code, word){
  const all = unb64u(code.slice(3)), enc = new TextEncoder();
  const base = await crypto.subtle.importKey('raw', enc.encode(String(word).trim().toLowerCase()), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey({name: 'PBKDF2', salt: all.slice(0, 16), iterations: 250000, hash: 'SHA-256'}, base, {name: 'AES-GCM', length: 256}, false, ['decrypt']);
  let pt; try { pt = await crypto.subtle.decrypt({name: 'AES-GCM', iv: all.slice(16, 28)}, key, all.slice(28)); } catch (e) { throw new Error('word'); }
  let o = null; try { o = JSON.parse(new TextDecoder().decode(pt)); } catch (e) {}
  o = cardOk(o); if (!o) throw new Error('link'); return o;
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
  needQ();
  const scale = n => { const s = Bq && (Bq.scale || []).find(x => +x[0] === +n); return s ? s[1] : 'No answer'; };
  const have = k ? [k.a, k.b].filter(Boolean) : [];
  let body = '';
  if (have.length){
    const tl = talkList(k), A = ansOf(k.a), B = ansOf(k.b), na = k.a ? k.a.n : '', nb = k.b ? k.b.n : '';
    const old = Bq && have.some(p => p.q !== Bq.version);
    body = `<div class="card"><div class="spread"><h2>Their Cards</h2><span class="pill sage">Read Only</span></div>
      <p>${have.map(p => esc(p.n) + '\'s card').join(' and ')}${have.length < 2 ? '. Add the other partner\'s card to see Talk About This.' : '.'} ${plainOf(k) ? 'Plain wording.' : 'Faith wording.'}</p>
      <p class="muted" style="font-size:15px">Brought in ${esc(nice(k.brought))}. ${k.yes ? esc(k.yes.text) + ' (' + esc(nice(k.yes.on)) + ')' : ''}</p>
      ${old ? '<p class="pm-warn">A card was made with an earlier set of questions, so some answers may not line up. The couple can make fresh cards.</p>' : ''}
      ${Bq ? '' : `<p class="muted" style="font-size:15px">${QL === 'none' ? 'The Before the Vows questions did not load, so the answers cannot show yet.' : 'Loading the Before the Vows questions.'}</p>`}
      ${have.length === 2 && Bq ? (tl.length ? `<h3 style="margin-top:12px">Talk About This (${tl.length})</h3><ul class="pm-ul">${tl.map(x => `<li><b style="font-weight:600">${esc(x.text)}</b><br><small class="muted">${esc(areaName(x.area))}${x.talk ? ': ' + esc(x.talk) : ''}</small></li>`).join('')}</ul>` : '<p>Their answers sit close together on every question.</p>') : ''}
      <div class="row" style="margin-top:12px"><button type="button" class="btn btn-danger btn-sm" data-pm="cardx">Remove the Cards</button></div></div>
      ${Bq ? (Bq.areas || []).map(a => { const aq = (Bq.questions || []).filter(q => q.area === a.id); if (!aq.length) return '';
        return `<div class="card"><h3>${esc(a.name)}</h3>${aq.map(q => `<div class="pm-qa${differs(A[q.id], B[q.id]) ? ' pm-dif' : ''}"><p>${esc(qText(q, k))}</p><div class="pm-two">${k.a ? `<span><b>${esc(na)}</b>: ${esc(scale(A[q.id]))}</span>` : ''}${k.b ? `<span><b>${esc(nb)}</b>: ${esc(scale(B[q.id]))}</span>` : ''}</div></div>`).join('')}</div>`; }).join('') : ''}`;
  }
  const form = have.length === 2 ? '' : `<div class="card"><h2>Bring In Their Card</h2><p>${esc(P.card.lead || '')}</p>
    <label class="f" for="pm-cl">${have.length ? 'The Other Partner\'s Card Link' : 'Card Link'}</label><input type="text" id="pm-cl" autocomplete="off" spellcheck="false" placeholder="Paste a Before the Vows card link">
    ${have.length ? '' : `<label class="f" for="pm-cl2">The Other Partner's Card Link (if they have one)</label><input type="text" id="pm-cl2" autocomplete="off" spellcheck="false" placeholder="Paste the second card link">`}
    <label class="f" for="pm-cw">Their Shared Word</label><input type="password" id="pm-cw" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="The couple types it">
    ${have.length ? '' : `<label class="pm-yes"><input type="checkbox" id="pm-cy"> <span>${esc(P.card.yes || '')}</span></label>`}
    ${S.cardErr ? `<p class="pm-err" role="alert">${esc(S.cardErr)}</p>` : ''}
    <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold" data-pm="cardin"${S.cardBusy ? ' disabled' : ''}>${S.cardBusy ? 'Opening' : 'Bring In Their Card'}</button></div>
    <p class="muted" style="font-size:14px;margin-top:10px">The word is used once to open the card and is never kept. The answers stay on this device, encrypted with your records.</p></div>`;
  return `${head(c, 'Their Card')}${form}${body}`;
}

// ---------- the Educator's Statement ----------
function stmtDefaults(c){
  const L = (c.log || []).map(x => x.date).filter(Boolean).sort();
  return {p1: c.p1.full || c.p1.name || '', p2: c.p2.full || c.p2.name || '', educator: (D().settings || {}).name || '', role: '', org: 'Grow With Grounded LLC', address: 'St. Cloud, Minnesota', phone: '320-291-7393',
    start: L[0] || '', end: L[L.length - 1] || '', hours: String(Math.round(logMins(c) / 60 * 100) / 100), inventory: 'PREPARE/ENRICH', signed: ''};
}
function stmtVals(c){ const d = stmtDefaults(c), s = c.stmt || {}; const o = {}; Object.keys(d).forEach(k => { o[k] = (s[k] != null && s[k] !== '') ? s[k] : d[k]; }); (pm().statement.fields || []).forEach(([k]) => { if (!(k in o)) o[k] = s[k] || ''; }); return o; }
const DATEF = ['start', 'end', 'signed'];
function fillText(v){
  const n = [v.p1, v.p2].filter(Boolean).join(' and ');
  return String(pm().statement.text || '').replace(/\{educator\}/g, v.educator || '________________').replace(/\{names\}/g, n || '________________');
}
function vStatement(c){
  const P = pm().statement, v = stmtVals(c), f = P.fee || {}, short = logMins(c) < target() * 60;
  return `${head(c, 'Educator\'s Statement')}
  <div class="card"><h2>${esc(P.title || 'Educator\'s Statement')}</h2><p>${esc(P.intro || '')}</p>
    ${f.standard ? `<p class="muted" style="font-size:15px">${esc(f.note || ('The license fee is $' + f.standard + ', or $' + f.reduced + ' with the Educator\'s Statement.'))}${f.confirmed ? '' : ' <span class="pm-ck">Check with the County</span>'}${f.source ? `<br><i>Source: ${esc(f.source)}</i>` : ''}</p>` : ''}
    ${short ? `<p class="pm-warn">${esc(hrs(logMins(c)))} logged so far. The statement confirms at least ${target()} hours, so finish the log first.</p>` : ''}</div>
  <div class="card"><h3>Details</h3><p class="muted" style="font-size:15px">Filled from the couple and the hours log. Change anything here; it prints exactly as shown.</p>
    <div class="pm-g2">${(P.fields || []).map(([k, l]) => `<div><label class="f" for="pm-s-${esc(k)}">${esc(l)}</label><input type="${DATEF.includes(k) ? 'date' : 'text'}" id="pm-s-${esc(k)}" data-pms="${esc(k)}" value="${esc(v[k] || '')}" autocomplete="off"></div>`).join('')}</div>
    <h3 style="margin-top:16px">The Statement</h3><p class="pm-quote" id="pm-quote">${esc(fillText(v))}</p>
    <p class="muted" style="font-size:15px">${esc(P.seal || '')}</p>
    <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold" data-pm="print">Print or Save as PDF</button><button type="button" class="btn btn-line" data-pm="sreset">Fill Again From the Log</button></div>
    ${(P.sources || []).length ? `<p class="pm-src">Sources: ${P.sources.map(esc).join('. ')}.</p>` : ''}</div>`;
}
function vAbout(c){
  const f = (k, l, v, t) => `<div><label class="f" for="pm-c-${k}">${l}</label><input type="${t || 'text'}" id="pm-c-${k}" data-pmc="${k}" value="${esc(v || '')}" autocomplete="off"></div>`;
  return `${head(c, 'The Couple')}
  <div class="card"><div class="pm-g2">${f('p1.name', 'First Partner', c.p1.name)}${f('p1.full', 'First Partner\'s Full Legal Name', c.p1.full)}${f('p2.name', 'Second Partner', c.p2.name)}${f('p2.full', 'Second Partner\'s Full Legal Name', c.p2.full)}${f('wedding', 'Wedding Date', c.wedding, 'date')}${f('email', 'Email or Phone', c.email)}</div>
    <label class="f" for="pm-c-notes">Notes</label><textarea id="pm-c-notes" data-pmc="notes">${esc(c.notes || '')}</textarea></div>`;
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
function openPage(title, css, body, page){
  const fonts = new URL('/fonts/fonts.css', location.href).href;
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${esc(title)}</title><link rel="stylesheet" href="${fonts}"><style>@page{${page}}${PBASE}${css || ''}</style></head><body>
<div class="bar"><b>${esc(title)}</b><button type="button" onclick="window.print()">Print or Save as PDF</button></div><div class="tip">To keep a copy, choose Save as PDF in the print window. Sign it in front of a notary, or add the church seal.</div>${body}</body></html>`;
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
  if (codes.some(x => !x)){ S.cardErr = 'That link does not look like a Before the Vows card. Copy it again from their phone.'; rerender(true); return; }
  if (!word.trim()){ S.cardErr = 'The couple types their shared word to open the card.'; rerender(true); return; }
  if (!yes){ S.cardErr = 'Check the box once both partners say yes to sharing their cards.'; rerender(true); return; }
  S.cardBusy = true; rerender(true);
  try {
    const got = []; for (const x of codes) got.push(await readCard(x, word));
    const k = k0 ? JSON.parse(JSON.stringify(k0)) : {brought: today(), yes: {on: today(), text: pm().card.yes || 'Both partners said yes.'}};
    got.forEach(o => { const slot = k.a && k.a.n === o.n ? 'a' : k.b && k.b.n === o.n ? 'b' : !k.a ? 'a' : 'b'; k[slot] = o; });
    c.card = k; keep(c); S.cardBusy = false; rerender(true); toast(got.length > 1 || (k.a && k.b) ? 'Their cards are in.' : 'The card is in.');
  } catch (e){
    S.cardBusy = false; S.cardErr = e && e.message === 'word' ? 'That word did not open the card. Let the couple try again.' : 'That card could not be read. The couple can make a fresh card.'; rerender(true);
  }
}
function act(k, v){
  const c = cur();
  switch (k){
    case 'home': S.id = null; goView('home'); return;
    case 'add': { const a = val('pm-a').trim(), b = val('pm-b').trim(); if (!a || !b){ toast('Add both first names.'); return; } const x = newCouple(a, b, val('pm-w')); list().push(x); keep(x); S.id = x.id; toast('Couple added.'); goView('sessions'); return; }
    case 'open': S.id = v; goView('sessions'); return;
    case 'del': { const x = list().find(y => y.id === v); if (!x || !confirm('Delete ' + names(x) + '? This removes their sessions, log, and card from this device.')) return; const d = D(); d.deleted = d.deleted || {clients: {}, sessions: {}}; d.deleted.pm = d.deleted.pm || {}; d.deleted.pm[x.id] = Date.now(); d.pm.couples = list().filter(y => y !== x); CTX.save(); toast('Deleted.'); rerender(true); return; }
  }
  if (!c) return;
  switch (k){
    case 'go': goView(v); return;
    case 'status': c.status = v; keep(c); rerender(true); return;
    case 'session': S.n = +v; goView('session'); return;
    case 'logsess': { const s = SES(v); c.log = c.log || []; c.log.push({id: uid(), date: today(), mins: +(s && s.mins) || 120, n: +v, notes: ''}); if (c.status === 'starting') c.status = 'sessions'; keep(c); rerender(true); toast('Logged. ' + hrs(logMins(c)) + ' in all.'); return; }
    case 'logadd': { const m = Math.max(0, +val('pm-lm') || 0); if (!m){ toast('Add the minutes first.'); return; } c.log = c.log || []; c.log.push({id: uid(), date: val('pm-ld') || today(), mins: m, n: +val('pm-ln') || 0, notes: val('pm-lt')}); if (c.status === 'starting') c.status = 'sessions'; keep(c); rerender(true); toast('Added. ' + hrs(logMins(c)) + ' in all.'); return; }
    case 'logdel': c.log = (c.log || []).filter(x => x.id !== v); keep(c); rerender(true); return;
    case 'cardin': cardIn(c); return;
    case 'cardx': if (!confirm('Remove their card from this device? They can share it again anytime.')) return; c.card = null; keep(c); rerender(true); return;
    case 'sreset': c.stmt = {}; keep(c); rerender(true); toast('Filled again from the log.'); return;
    case 'print': printStatement(c); return;
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
function setLog(c, spec, value){ const [f, id] = spec.split('|'), x = (c.log || []).find(y => y.id === id); if (!x) return; x[f] = f === 'mins' || f === 'n' ? Math.max(0, +value || 0) : value; keep(c); }
document.addEventListener('change', e => {
  const t = e.target; if (!t.closest || !t.closest('#pm-root')) return; const c = cur(); if (!c) return;
  if (t.dataset.pmck != null){ const st = sess(c, S.n); if (t.checked) st.ck[t.dataset.pmck] = Date.now(); else delete st.ck[t.dataset.pmck]; keep(c); return; }
  if (t.dataset.pml){ setLog(c, t.dataset.pml, t.value); rerender(true); return; }
  if (t.dataset.pmc === 'wedding'){ c.wedding = t.value; keep(c); return; }
});
document.addEventListener('input', e => {
  const t = e.target; if (!t.closest || !t.closest('#pm-root')) return; const c = cur(); if (!c) return;
  if (t.dataset.pmn){ sess(c, t.dataset.pmn).notes = t.value; keep(c); return; }
  if (t.dataset.pms){ c.stmt = c.stmt || {}; c.stmt[t.dataset.pms] = t.value; keep(c); const q = document.getElementById('pm-quote'); if (q) q.textContent = fillText(stmtVals(c)); return; }
  if (t.dataset.pml && t.tagName === 'INPUT' && t.type === 'text'){ setLog(c, t.dataset.pml, t.value); return; }
  if (t.dataset.pmc){ const [a, b] = t.dataset.pmc.split('.'); if (b) c[a][b] = t.value; else c[a] = t.value; keep(c); return; }
});

const CSS = `
#pm-root .card{min-width:0;}
.pm-g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 14px;}
.pm-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0 14px;}
.pm-g4{display:grid;grid-template-columns:1fr .7fr .9fr 1.6fr;gap:0 12px;}
@media (max-width:760px){.pm-g2,.pm-g3,.pm-g4{grid-template-columns:minmax(0,1fr);}}
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
.pm-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;}
.pm-talk{margin-top:12px;padding:12px 14px;border-radius:12px;background:var(--bg-deep);}
.pm-safe{border-left:4px solid var(--danger);}
.pm-src{font-size:14px;font-style:italic;color:var(--ink-soft);margin-top:14px;overflow-wrap:anywhere;}
.pm-big{font-family:'Cormorant Garamond',Georgia,serif;font-size:calc(30px * var(--scale));font-weight:600;color:var(--gold);}
.pm-log{padding:10px 0;border-top:1px solid var(--line);}.pm-log:first-of-type{border-top:0;}
.pm-yes{display:flex;gap:10px;align-items:flex-start;margin-top:14px;cursor:pointer;}.pm-yes input{width:22px;height:22px;margin-top:3px;flex:none;accent-color:var(--gold);}
.pm-err,.pm-warn{color:var(--danger);font-weight:600;margin-top:10px;}
.pm-ck-c,.pm-ck{}
span.pm-ck{display:inline-block;font-size:13px;font-weight:700;color:var(--danger);}
.pm-quote{font-family:'Cormorant Garamond',Georgia,serif;font-size:calc(21px * var(--scale));line-height:1.45;padding:12px 16px;border-left:3px solid var(--gold);background:var(--bg-deep);border-radius:0 12px 12px 0;}
.pm-qa{padding:10px 0;border-top:1px solid var(--line);}.pm-qa:first-of-type{border-top:0;}.pm-qa p{margin:0 0 4px;}
.pm-qa.pm-dif{border-left:3px solid var(--gold);padding-left:10px;}
.pm-two{display:flex;flex-wrap:wrap;gap:4px 18px;font-size:15px;color:var(--ink-soft);}
`;
(function(){ const s = document.createElement('style'); s.id = 'pm-css'; s.textContent = CSS; document.head.appendChild(s); })();

const API = window.GGPm = {
  // ctx: {lib, data, save}. A different DATA (another unlock) starts fresh at the couples list.
  view(ctx){
    ctx = ctx || {};
    if (CTX.data && ctx.data !== CTX.data){ S.view = 'home'; S.id = null; }
    CTX = {lib: ctx.lib || null, data: ctx.data || null, save: typeof ctx.save === 'function' ? ctx.save : () => {}};
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
  state: S, data: pm, current: cur, readCard, codeOf, talkList, printer: null, last: null
};
})();
