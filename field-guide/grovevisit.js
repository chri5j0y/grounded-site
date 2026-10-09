// =====================================================================
// GROUNDED FIELD GUIDE (TM): the Grove Guide's Family Check-in and Group Check-in (GWG BLD 776).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// Built to the session tool rule (eye contact first): short Say lines, big tap answers with
// We See It Differently and Pass, Read Aloud, a Family View in its own window (tilt the laptop or
// share that window alone on Zoom, Teams, or FaceTime) with Follow My Scroll, a Phone Mode with
// words to read, and quick notes with Tidy Up Later.
// A Family Visit runs: Welcome, Their Yes, What's Changed Lately, the Family Check-in (full or quick,
// questions from grove/kinds.js for the grove's kind), What We Saw Together (words only), Our Growth
// Plan (built with the family), Take It Home (a printout, and Send to The Grove: an encrypted code the
// family's own grove loads, only after the family's yes), and Close and Next Visit.
// A Group Series holds a quick Group Check-in at sessions 1, 6, and 12, in group words only.
// What is kept: the Guide's record in DATA.gvg (encrypted, in backups, merged) keeps the date, the parts
// the family chose for its plan, the practices, consent, whether the code was sent, the next visit, the
// follow-ups, and private notes. Never an answer and never a level: the answers live only in this
// screen's memory during the visit, then go home with the family.
// Words: the Guide library's groveGuide.visit, groupCheckin, and followUp keys, filled from the
// built-in words below wherever a piece is missing.
// =====================================================================
(function(){
'use strict';

let C = {}; // GGGv.init: data(), gvg(), gt(), tier(), save(), render(), go(), toast(), rec(), sheet(), ph(), pf(), esc(), icon(), name()
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const arr = x => Array.isArray(x) ? x : x ? [x] : [];
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const toast = m => C.toast ? C.toast(m) : null;
const pad = n => String(n).padStart(2, '0');
const isoOf = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const today = () => isoOf(new Date());
const dOf = s => { const m = /^(\d{4})-(\d\d)-(\d\d)/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
const addDays = (s, n) => { const d = dOf(s); if (!d) return ''; d.setDate(d.getDate() + n); return isoOf(d); };
const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const nice = s => { const d = dOf(s); return d ? MON[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() : (s || ''); };
const list3 = a => a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];

const PARTS6 = [
  {key: 'roots', name: 'Roots', sub: 'What grounds us', color: '#8E5A2B'},
  {key: 'trunk', name: 'Trunk', sub: 'Purpose', color: '#C27A1E'},
  {key: 'bark', name: 'Bark', sub: 'Mind and feelings', color: '#6E5BB5'},
  {key: 'branches', name: 'Branches', sub: 'Relationships', color: '#1F8A8F'},
  {key: 'leaves', name: 'Leaves', sub: 'Body', color: '#3A9B58'},
  {key: 'fruit', name: 'Fruit', sub: 'Hope', color: '#D9483F'}];
const PART = Object.fromEntries(PARTS6.map(p => [p.key, p]));
const ANSWERS = [['n', 'Not Yet'], ['s', 'Sometimes'], ['o', 'Often'], ['a', 'Almost Always']];
const ASPECIAL = [['d', 'We See It Differently'], ['p', 'Pass']];
const ANAME = Object.fromEntries(ANSWERS.concat(ASPECIAL));
const SCORE = {n: 1, s: 2, o: 3, a: 4};
const LEVEL = {strength: 'Shared Strength', steady: 'Steady', edge: 'Growing Edge'};
const SERIES_AT = [1, 6, 12];

// ---------- the grove's kinds (grove/kinds.js, read in its own scope) ----------
let GK = null, GK_WAIT = null, GK_FAIL = false;
function gkLoad(){
  if (GK || GK_WAIT) return;
  GK_FAIL = false;
  GK_WAIT = fetch('../grove/kinds.js', {cache: 'no-cache'}).then(r => { if (!r.ok) throw 0; return r.text(); })
    .then(t => { GK = new Function('window', t + '\n;return window.GROVE_KINDS;')({}) || {}; GK_WAIT = null; if (S.on) rerender(true); else if (C.render) C.render(); })
    .catch(() => { GK_WAIT = null; GK_FAIL = true; if (C.render) C.render(); });
}
const KDEF = {
  family: {name: 'Family', we: 'our family', We: 'Our family', checkin: 'Family Check-in', plan: 'Our Family Growth Plan', faith: 'faith'},
  classroom: {name: 'Classroom', we: 'our class', We: 'Our class', checkin: 'Class Check-in', plan: 'Our Class Plan', faith: 'plain'},
  faith: {name: 'Faith Community', we: 'our community', We: 'Our community', checkin: 'Group Check-in', plan: 'Our Group Growth Plan', faith: 'faith'},
  group: {name: 'Small Group', we: 'our group', We: 'Our group', checkin: 'Group Check-in', plan: 'Our Group Growth Plan', faith: 'ask'},
  team: {name: 'Team', we: 'our team', We: 'Our team', checkin: 'Team Check-in', plan: 'Our Team Plan', faith: 'plain'}};
const GROUP_KINDS = [['group', 'Small or Discussion Group'], ['faith', 'Faith Community'], ['classroom', 'Classroom'], ['team', 'Team or Workplace']];
const KW = k => Object.assign({}, KDEF[k] || KDEF.family, ((GK && GK.kinds) || {})[k] || {});
const GW = (path, dflt) => { let o = GK || {}; for (const k of path.split('.')) { if (o == null || typeof o !== 'object') return dflt; o = o[k]; } return o == null || o === '' ? dflt : o; };
const Wk = (v, kind) => v && typeof v === 'object' && !Array.isArray(v) ? (v[kind] || v.family || '') : (v || '');
function questionsFor(kind){
  const Q = (GK && GK.questions) || {}, g = Q[kind] || Q.family || {}, out = {};
  PARTS6.forEach(p => { out[p.key] = arr(g[p.key]).slice(0, 4); }); return out;
}
function qList(kind, quick){
  const Q = questionsFor(kind), out = [];
  PARTS6.forEach(p => (Q[p.key] || []).forEach((q, i) => { if (!quick || i === 0) out.push({part: p.key, i, key: p.key + '.' + i, q}); }));
  return out;
}
function changesFor(kind){ const g = ((GK && GK.changes) || {})[kind]; return arr(g).filter(c => c && c.id && c.label); }
// Practices for a kind: The Grove's household practices (grove/together.js, kinds from existingKinds) and each kind's own.
function allPractices(){
  const T = (C.gt && C.gt()) || {practices: []}, EXK = (GK && GK.existingKinds) || {}, out = [];
  arr(T.practices).forEach(p => out.push(Object.assign({}, p, {kinds: arr(EXK[p.id] || p.kinds || ['family'])})));
  arr(GK && GK.practices).forEach(p => { if (p && p.id && PART[p.part] && !out.some(x => x.id === p.id)) out.push(Object.assign({kinds: ['family']}, p)); });
  return out;
}
let PCACHE = null, PCACHE_K = '';
function practices(){ const k = (GK ? 'k' : '') + ((C.gt && C.gt()) ? 't' : ''); if (!PCACHE || PCACHE_K !== k){ PCACHE = allPractices(); PCACHE_K = k; } return PCACHE; }
const prac = id => practices().find(p => p.id === id) || null;
const kindPractices = (kind, part) => practices().filter(p => arr(p.kinds).includes(kind) && (!part || p.part === part));
const LEVERS = () => Object.assign({lighten: 'Lightens the Load', support: 'Adds Support', reframe: 'A New Way to See It'}, GW('plan.levers', {}));

// ---------- words (groveGuide.visit, groupCheckin, followUp; built-in below) ----------
const DEF = {
  visit: {
    title: 'Family Check-in Visit',
    lead: 'Sit with the family, look up, and talk. Read each question aloud, let them talk it over, and tap the one answer they settle on together. The results and the plan go home with them. Your record keeps no answers and no levels.',
    card: 'A Family Check-in, the results in words, and a Growth Plan built together, about 45 to 60 minutes.',
    steps: {
      welcome: {title: 'Welcome', say: ['Thank you for having me. Before we start, tell me who is here today.'], phone: ['Thank you for making time for this call. Who is with you today?'], family: 'Welcome. This is a conversation, never a test.'},
      consent: {title: 'Their Yes', say: ["Today I'd like to try The Grove's {checkin} with you. I read a question, you talk it over, and you choose one answer for the whole family. Anyone can pass, and we can stop any time. Is that okay with you?"], phone: ["I'd like to try a short family check-in with you. I'll read a question, you talk it over, and you tell me the one answer that fits your family. Anyone can pass, and we can stop any time. Is that okay?"], family: 'Anyone can pass. We can stop any time.', points: ['For a child, a parent or guardian agrees first.', 'Say the limits of privacy plainly: danger right now, harm to a child or a vulnerable adult, and what the law and your organization require.', 'Only the family\'s shared answer is ever tapped. No one\'s own answer is entered.']},
      changes: {title: "What's Changed Lately", say: ["First, what's changed for your family lately? Big or small."], phone: ["First, has anything changed for your family lately? A new baby, a move, an illness, a loss, a new school, a job change, money being tight, or nothing big?"], family: "What's changed lately?"},
      checkin: {title: 'The Check-in', say: ['Here is the first one. Take your time and talk it over.'], phone: ["I'll read each one slowly. Talk it over, then tell me the answer that fits your family best."], family: 'Talk it over, then choose one answer together.'},
      results: {title: 'What We Saw Together', say: ['Here is what you saw together today. Let\'s start with what is already strong.'], phone: ["Here is what you saw together. I'll start with your strengths."], family: 'What we saw together, in words.'},
      plan: {title: 'Our Growth Plan', say: ["Let's build a small plan together. Pick one or two parts to grow, and two or three practices to try."], phone: ["Let's choose one or two parts to grow, and two or three small practices. I'll read the choices."], family: 'Our plan, built together.', kid: 'And one practice chosen by the youngest.'},
      home: {title: 'Take It Home', say: ['This page is yours to keep: what you saw together and your plan.'], phone: ["I'll send your page after our call, so you have it in writing."], family: 'Yours to keep.'},
      close: {title: 'Close and Next Visit', say: ['Thank you for letting me be part of this today. Shall we choose a time to check in again?'], phone: ['Thank you for this time together. When would be a good time for our next check-in?'], family: 'Thank you.'}
    },
    parts: {
      roots: {say: 'Now a few about Roots: what grounds your family.', phone: 'The next few are about Roots: what grounds your family.'},
      trunk: {say: 'Now Trunk: purpose, and what matters most to your family.', phone: 'Now some about Trunk: purpose, and what matters most to your family.'},
      bark: {say: 'Now Bark: feelings, and how your family handles hard moments.', phone: 'Now some about Bark: feelings, and how your family handles hard moments.'},
      branches: {say: 'Now Branches: how you connect with each other.', phone: 'Now some about Branches: how you connect with each other.'},
      leaves: {say: 'Now Leaves: rest, moving, and meals together.', phone: 'Now some about Leaves: rest, moving, and meals together.'},
      fruit: {say: 'And last, Fruit: hope, and what you look forward to.', phone: 'And last, some about Fruit: hope, and what you look forward to.'}
    },
    answers: {
      say: 'For each one, choose together: Not Yet, Sometimes, Often, or Almost Always. If you see it differently, that is welcome too, and anyone can pass.',
      phone: 'You can answer: not yet, sometimes, often, or almost always. Or, we see it differently. Or pass.',
      family: 'Not Yet, Sometimes, Often, Almost Always, We See It Differently, or Pass.',
      differ: 'That is good news. It means everyone spoke. We will keep it as something to talk about.',
      pass: 'Passing is always fine. Here is the next one.',
      settle: 'If it is hard to settle on one answer, choose We See It Differently and we will come back to it.'
    },
    kids: {first: 'Let\'s hear from the kids first this time.', tip: 'Let the children answer before the grown-ups speak, so their voices shape the answer.', faith: 'With children, follow the kids\' faith rules: invite, never assume; start from the family\'s own traditions; ask about experience, never belief; God is one door among several and never a judge; Plain words whenever the family chose them.', youngest: 'Now the youngest gets to choose one practice for the plan.'},
    consentSend: {say: 'Would you like your results and plan sent to your family\'s own Grove on your phone? It goes in a locked code only your family can open.', phone: 'Would you like me to send your results and plan to your family\'s own Grove? It goes in a locked code only your family can open.', family: 'Send to our own Grove? Your choice.', yes: 'They Said Yes to Send to The Grove', no: 'Not Today'},
    send: {title: 'Send to The Grove', lead: 'A link or QR code that loads today\'s check-in and plan into the family\'s own Grove, locked with an 8-letter code. Send the link first, then the code in a separate message, or say the code aloud.',
      family: 'Scan with your phone, then type the code.', steps: ['On your phone, scan the code or tap the link. The Grove opens.', 'Type the 8-letter code.', 'Choose your family\'s grove, or start one. Your check-in and plan are added, locked with your grove passcode.'],
      codeSay: 'Here is your code. It is on your page too.', textLink: 'Here is the link for your family\'s Grove, from today\'s visit: {link}', textCode: 'Your code for The Grove: {code}', subject: 'Your family\'s check-in and plan for The Grove'},
    print: {title: 'Our Family Check-in and Growth Plan', lead: 'What we saw together, in words, and the plan we chose. Small and steady grows the most.', foot: 'The Grove, a whole-person practice from Grow With Grounded. growwithgrounded.com/grove'},
    close: {say: ['Thank you for letting me be part of this today. I saw a family that shows up for each other.'], phone: ['Thank you for this time together today.'], family: 'Thank you for today.'},
    next: {say: 'When would be a good time to check in again?', phone: 'When would be a good time for our next check-in?'},
    tidy: 'After the visit: the quick notes you marked Tidy Up Later, then every other note. Codes or initials only.',
    privacy: 'Your record keeps the date, the parts the family chose for its plan, the practices, their yes, and your private notes. Never an answer and never a level: those go home with the family.'
  },
  groupCheckin: {
    title: 'Quick Group Check-in',
    lead: 'Six questions in group words, one for each part, about ten minutes. One shared answer for the room, never anyone\'s own.',
    sessions: [1, 6, 12],
    at: {1: 'Session 1: a first look at where the group is starting.', 6: 'Session 6: halfway, a look at what is growing.', 12: 'Session 12: the last session, a look back at what grew together.'},
    steps: {
      open: {title: 'Opening', say: ['Before we start, a short check-in for all of us together. One answer for the whole group, and anyone can pass.'], phone: ['A short check-in for all of us together. One answer for the whole group, and anyone can pass.'], family: 'One answer for the whole group. Anyone can pass.'},
      checkin: {title: 'Quick Group Check-in', say: ['Here is the first one. Talk it over in pairs or all together.'], phone: ["I'll read each one. Talk it over, and we'll settle on one answer for the group."], family: 'Talk it over, then choose one answer together.'},
      results: {title: 'What We Saw Together', say: ['Here is what we saw together, as a group.'], phone: ['Here is what we saw together, as a group.'], family: 'What we saw together, in words.'},
      close: {title: 'Closing', say: ['Thank you, everyone. What we saw today belongs to all of us together.'], phone: ['Thank you, everyone.'], family: 'Thank you.'}
    },
    big: 'In a big group, listen to the room and tap the answer that fits what you hear.',
    safety: 'If someone shares something that points to harm or danger, thank them, keep the group calm, and speak with that person privately as soon as you can, with a co-leader holding the room. Then follow your safety protocol. Call or text 988 any time. In an emergency, call 911. A vulnerable adult at risk: MAARC 1-844-880-1574.'
  },
  followUp: {
    intro: 'Short and light: a note, two quick check-ins, and a week 12 visit.',
    touches: [
      {id: 'note', days: 3, title: 'A Short Note', call: 'I was thinking of your family and wanted to say thank you again for our visit.', email: {subject: 'Thank you from our visit', body: 'Hello {name},\n\nThank you again for our visit. I hope the practices you chose are fitting into your days. Small and steady grows the most.\n\n{guide}\n\nCall or text 988 any time. In an emergency, call 911.'}},
      {id: 'week4', days: 28, title: 'Week 4 Quick Check-in', call: 'It has been about four weeks. How is your plan going? This is a good week for a quick check-in in The Grove.', email: {subject: 'Week 4: a quick check-in', body: 'Hello {name},\n\nIt has been about four weeks since our visit. This is a good week for a quick check-in in The Grove: six questions, about five minutes. Keep what helps, and swap anything that is not working.\n\n{guide}\n\nCall or text 988 any time. In an emergency, call 911.'}},
      {id: 'week8', days: 56, title: 'Week 8 Quick Check-in', call: 'It has been about eight weeks. How are the practices going?', email: {subject: 'Week 8: another quick check-in', body: 'Hello {name},\n\nIt has been about eight weeks. Another quick check-in in The Grove shows what is growing.\n\n{guide}\n\nCall or text 988 any time. In an emergency, call 911.'}},
      {id: 'week12', days: 84, title: 'Week 12 Visit', call: 'Twelve weeks already. Would you like to set up a visit for a full check-in and a new plan?', email: {subject: 'Twelve weeks together', body: 'Hello {name},\n\nTwelve weeks together. Would you like to set up a visit for a full check-in and a fresh plan for the next season?\n\n{guide}\n\nCall or text 988 any time. In an emergency, call 911.'}}
    ]
  }
};
const LIBW = () => (C.gvg && C.gvg()) || {};
// Piece by piece: the library's value wherever it has one, else the built-in.
function mergeW(d, l){
  if (l == null) return d;
  if (Array.isArray(d)) return Array.isArray(l) && l.length ? l : d;
  if (d && typeof d === 'object'){ if (typeof l !== 'object' || Array.isArray(l)) return d; const o = Object.assign({}, l); Object.keys(d).forEach(k => { o[k] = mergeW(d[k], l[k]); }); return o; }
  return (typeof l === 'string' && l.trim()) || typeof l === 'number' ? l : d;
}
let WC = null, WC_SRC = null;
function WW(){ const L = LIBW(); if (!WC || WC_SRC !== L){ WC = {visit: mergeW(DEF.visit, L.visit), groupCheckin: mergeW(DEF.groupCheckin, L.groupCheckin), followUp: mergeW(DEF.followUp, L.followUp)}; WC_SRC = L; } return WC; }
const seriesAt = () => { const s = arr(WW().groupCheckin.sessions).map(Number).filter(n => n > 0); return s.length ? s : SERIES_AT; };

// ---------- the open visit (memory only: answers never reach DATA) ----------
const S = {on: false, cur: null, mode: 'guide', follow: true, step: 0};
const rec = () => S.cur && C.rec ? C.rec(S.cur.rid) : null;
const isFam = () => !!(S.cur && S.cur.kind === 'family');
const gk = () => (S.cur && S.cur.gk) || 'family';
const K = () => KW(gk());
// Faith or Plain: Classroom always Plain; Team Plain unless the group chose Faith; everyone else as chosen.
const plainLocked = () => gk() === 'classroom';
const isPlain = () => plainLocked() || (S.cur && S.cur.words === 'plain');
const kidsOn = () => !!(S.cur && S.cur.kids && gk() !== 'team');
const pick = (o, k) => o ? (isPlain() && o[k + 'Plain'] ? o[k + 'Plain'] : o[k]) : '';
function fill(t){
  const r = rec(), k = K(), o = {name: r ? r.name : '', we: k.we, We: k.We, checkin: k.checkin, plan: k.plan, guide: (C.name && C.name()) || '', date: nice(today())};
  return String(t == null ? '' : t).replace(/\{(\w+)\}/g, (m, x) => o[x] != null ? o[x] : m);
}
const pv = p => { const o = Object.assign({}, p); if (isPlain() && p.plain) Object.assign(o, p.plain); return o; };
const qText = q => isPlain() && q.plain ? q.plain : q.q;
const kidText = q => isPlain() && q.kidPlain ? q.kidPlain : q.kid;
const stepIds = () => isFam() ? ['welcome', 'consent', 'changes', 'checkin', 'results', 'plan', 'home', 'close'] : ['open', 'checkin', 'results', 'close'];
const pages = () => stepIds().concat(['tidy', 'finish']);
const stepW = id => isFam() ? WW().visit.steps[id] || {} : WW().groupCheckin.steps[id] || {};
const PAGE_T = {tidy: 'Tidy Up', finish: 'Finish'};
const pageT = id => PAGE_T[id] || fill(stepW(id).title || id);

function newVisit(r, n){
  const fam = r.kind === 'family', k = fam ? 'family' : (r.gk || 'group');
  return {id: uid(), rid: r.id, kind: r.kind, n: n || 0, gk: k, date: today(), words: r.words === 'plain' || (k === 'team' && r.words !== 'faith') || k === 'classroom' ? 'plain' : 'faith', kids: !!r.kids, kidsFirst: false,
    consent: fam && r.consent && r.consent.how && r.consent.how !== 'declined' ? 'kept' : '', changes: [], quick: !fam, i: 0, ans: {}, started: false,
    plan: {edges: [], items: [], youngest: '', strength: '', words: '', own: '', made: false}, send: '', code: null, next: '', notes: {}, tidy: {}, hospice: r.hospice || ''};
}
// Levels for this screen only: the same rule as The Grove (grove/app.js levelsOf). Never saved, never printed as levels.
function levels(){
  const Q = questionsFor(gk()), out = {}, A = S.cur.ans;
  PARTS6.forEach(p => { const vals = []; (Q[p.key] || []).forEach((q, i) => { const a = A[p.key + '.' + i]; if (SCORE[a]) vals.push(q.rev ? 5 - SCORE[a] : SCORE[a]); });
    if (!vals.length){ out[p.key] = null; return; }
    const ten = Math.round(1 + (vals.reduce((x, y) => x + y, 0) / vals.length - 1) * 3);
    out[p.key] = ten >= 8 ? 'strength' : ten >= 5 ? 'steady' : 'edge'; });
  return out;
}
const answered = () => Object.keys(S.cur.ans).length;
function talkList(){ const Q = questionsFor(gk()), t = []; PARTS6.forEach(p => (Q[p.key] || []).forEach((q, i) => { if (S.cur.ans[p.key + '.' + i] === 'd') t.push(qText(q)); })); return t; }

// ---------- rendering helpers ----------
const rerender = keep => { const y = window.scrollY; if (C.render) C.render(); if (keep) window.scrollTo(0, y); pushFam(); };
const sayBlk = (lines, lab) => arr(lines).filter(Boolean).length ? `<div class="fw-say"><b>${esc(lab || 'Say')}</b>${arr(lines).filter(Boolean).map(t => `<q>${esc(fill(t))}</q>`).join('<br>')}</div>` : '';
const sub = t => t ? `<p class="fw-sub">${esc(fill(t))}</p>` : '';
function crisis(){
  const h = S.cur && S.cur.hospice;
  return `<div class="fw-crisis gv-crisis">${h ? `Their hospice's 24/7 line first: ${esc(h)}. ` : ''}Call or text 988 any time. In an emergency, call 911. A vulnerable adult at risk: MAARC 1-844-880-1574.</div>`;
}
function noteBox(id){
  const c = S.cur, t = !!c.tidy[id];
  return `<div class="fw-note"><label class="f" for="gv-n-${id}">Quick Note (private)</label><textarea id="gv-n-${id}" rows="2" data-gvm="note" data-gvk="${id}" placeholder="A few words, codes or initials only. Tidy them later.">${esc(c.notes[id] || '')}</textarea>
    <button type="button" class="fw-tidy" data-gva="tidy" data-gvv="${id}" aria-pressed="${t}">${t ? 'Tidy Up Later: Marked' : 'Tidy Up Later'}</button></div>`;
}
const chip = (act, v, on, label, extra) => `<button type="button" class="chip" data-gva="${act}" data-gvv="${esc(v)}" aria-pressed="${!!on}"${extra || ''}>${esc(label)}</button>`;

// ---------- the steps (the Guide's view) ----------
function vWelcome(){
  const w = stepW('welcome'), c = S.cur;
  return sayBlk(pick(w, 'say')) + sub(w.sub) +
    `<div class="fw-blk"><h3>This Visit</h3>
     <div class="fw-chips" role="group" aria-label="Words">${plainLocked() ? '<span class="pill">Plain words, set for a Classroom</span>' : chip('words', 'faith', !isPlain(), 'Faith Words Welcome') + chip('words', 'plain', isPlain(), 'Plain Words')}</div>
     ${gk() !== 'team' ? `<div class="fw-chips" style="margin-top:10px">${chip('kids', '', c.kids, 'Children Take Part')}${c.kids ? chip('kidsfirst', '', c.kidsFirst, "Kids' Turn First") : ''}</div>` : ''}
     ${c.kids ? `<p class="fw-sub">${esc(WW().visit.kids.faith)}</p>` : ''}
     <label class="f" for="gv-hosp">Their hospice's 24/7 line, if they have one (shown first in the help line)</label><input type="tel" id="gv-hosp" data-gvm="hospice" value="${esc(c.hospice)}" placeholder="Leave blank if it doesn't apply" autocomplete="off"></div>` + noteBox('welcome');
}
function vConsent(){
  const w = stepW('consent'), G = LIBW(), CH = (G.consent && G.consent.how) || [['verbal', 'They said yes out loud'], ['written', 'Written or signed'], ['agent', 'A parent, guardian, or healthcare agent agreed'], ['declined', 'They said no for now']];
  const r = rec(), c = S.cur, kept = r && r.consent && r.consent.how && r.consent.how !== 'declined';
  return sayBlk(pick(w, 'say')) +
    (arr(w.points).length ? `<div class="fw-blk"><h3>Keep in Mind</h3><ul class="rk-do">${w.points.map(x => `<li>${esc(fill(x))}</li>`).join('')}</ul></div>` : '') +
    `<div class="fw-blk"><h3>Their Answer</h3>${kept ? `<p class="fw-ok">Their yes is on record: ${esc((CH.find(h => h[0] === r.consent.how) || [, r.consent.how])[1])}, ${esc(nice(r.consent.date))}.</p><p class="fw-sub">Check again that today is still okay. Tap a new answer only if it changed.</p>` : ''}
     <div class="fw-chips" role="group" aria-label="Their answer">${CH.map(h => chip('consent', h[0], c.consent === h[0] || (c.consent === 'kept' && kept && r.consent.how === h[0]), h[1])).join('')}</div>
     <label class="f" for="gv-cby">Who agreed (relationship only)</label><input type="text" id="gv-cby" data-gvm="cby" value="${esc(c.cby || (r && r.consent ? r.consent.by : '') || '')}" placeholder="Parent, guardian, grandparent" autocomplete="off">
     ${c.consent === 'declined' ? '<p class="fw-warn">They said no for now. Thank them warmly. Nothing more is asked today; close the visit gently.</p>' : ''}</div>` + noteBox('consent');
}
const okToGo = () => !isFam() || (S.cur.consent && S.cur.consent !== 'declined');
function vChanges(){
  const w = stepW('changes'), c = S.cur, L = changesFor(gk());
  return sayBlk(pick(w, 'say')) + `<div class="fw-blk"><h3>Tap Any That Fit</h3><p class="fw-sub">This shapes the ideas you offer, and never changes a result.</p>
    <div class="fw-chips">${L.map(x => chip('change', x.id, c.changes.includes(x.id), x.label)).join('')}</div></div>` + noteBox('changes');
}
function vCheckin(){
  const w = stepW('checkin'), c = S.cur, A = WW().visit.answers, k = K();
  if (!okToGo()) return `<p class="fw-warn">Record their yes on Their Yes first.</p>`;
  if (!c.started){
    return `<div class="fw-blk"><h3>${esc(isFam() ? k.checkin : WW().groupCheckin.title)}</h3>
      ${isFam() ? `<p>${esc(fill('A full check-in is four questions for each part, 24 in all, about 15 to 20 minutes. The quick one is six questions, about five minutes.'))}</p>
      <div class="fw-chips">${chip('quick', '0', !c.quick, 'Full Check-in, 24 Questions')}${chip('quick', '1', c.quick, 'Quick Check-in, 6 Questions')}</div>` : `<p>${esc(fill(WW().groupCheckin.lead))}</p>${S.cur.n ? `<p class="fw-sub">${esc(fill(WW().groupCheckin.at[S.cur.n] || ''))}</p>` : ''}<p class="fw-sub">${esc(WW().groupCheckin.big)}</p>`}
      ${sayBlk([A.say])}
      <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold" data-gva="cistart">Start the Questions</button></div></div>` + noteBox('checkin');
  }
  const list = qList(gk(), c.quick);
  if (!list.length) return `<p class="fw-warn">The questions did not load. Check the connection, then try again.</p>`;
  const it = list[Math.min(c.i, list.length - 1)], q = it.q, P = PART[it.part], cur = c.ans[it.key], first = it.i === 0 || (c.quick);
  const ps = WW().visit.parts[it.part] || {}, kid = kidsOn() && kidText(q);
  return `<div class="gv-prog" aria-label="Question ${c.i + 1} of ${list.length}">${list.map((x, j) => `<span class="${c.ans[x.key] ? 'on' : ''}${j === c.i ? ' cur' : ''}" style="--pc:${PART[x.part].color}"></span>`).join('')}</div>
    ${first && isFam() ? sayBlk([pick(ps, 'say')]) : ''}
    ${c.i === 0 ? sayBlk(pick(w, 'say')) : ''}
    ${c.kidsFirst && kidsOn() ? `<p class="gv-tip"><b>Kids' Turn First.</b> ${esc(WW().visit.kids.tip)}</p>` : ''}
    <div class="fw-blk gv-q" style="--pc:${P.color}" data-gvanc="q"><p class="gv-kick">${esc(P.name)}, ${esc(P.sub)} &middot; Question ${c.i + 1} of ${list.length}</p>
      <p class="gv-qtext" id="gv-qtext">${esc(qText(q))}</p>${kid ? `<p class="gv-qkid">For children: ${esc(kid)}</p>` : ''}
      <div class="row" style="margin:8px 0"><button type="button" class="btn btn-line btn-sm" data-gva="read">Read Aloud</button></div>
      <details class="gv-why"><summary>Why this question?</summary><p>${esc(q.why || Wk(GW('results.why.' + it.part), gk()) || 'It helps ' + k.we + ' notice ' + P.sub.toLowerCase() + ' together.')}</p></details>
      ${q.tip ? `<p class="gv-tip"><b>Leader tip.</b> ${esc(q.tip)}</p>` : ''}
      <div class="gv-ans" role="group" aria-label="The shared answer">${ANSWERS.map(([a, l]) => `<button type="button" class="gv-a" data-gva="ans" data-gvv="${a}" aria-pressed="${cur === a}">${l}</button>`).join('')}</div>
      <div class="gv-ans gv-ans2">${ASPECIAL.map(([a, l]) => `<button type="button" class="gv-a gv-a2" data-gva="ans" data-gvv="${a}" aria-pressed="${cur === a}">${l}</button>`).join('')}</div>
      ${cur === 'd' ? `<p class="fw-sub">${esc(A.differ)}</p>` : cur === 'p' ? `<p class="fw-sub">${esc(A.pass)}</p>` : `<p class="fw-sub">${esc(A.settle)}</p>`}
      <div class="row" style="justify-content:space-between;margin-top:10px">${c.i > 0 ? '<button type="button" class="btn btn-line btn-sm" data-gva="qprev">&larr; Previous Question</button>' : '<span></span>'}${c.i < list.length - 1 ? '<button type="button" class="btn btn-line btn-sm" data-gva="qnext">Next Question &rarr;</button>' : `<button type="button" class="btn btn-gold btn-sm" data-gva="step" data-gvv="results">See What We Saw &rarr;</button>`}</div></div>` + noteBox('checkin');
}
function resultsInner(forFam){
  const c = S.cur, k = K(), L = levels(), by = lv => PARTS6.filter(p => L[p.key] === lv), st = by('strength'), sd = by('steady'), ed = by('edge'), none = PARTS6.filter(p => !L[p.key]);
  const line = (lv, part) => Wk(GW('results.' + lv + '.' + part), gk());
  const DEFL = {strength: p => `${p.name} is a Shared Strength. Keep doing what grows it.`, edge: p => `${p.name} is where ${k.we} wants to grow next.`};
  let h = '';
  if (!answered()) return `<p class="fw-soft fw-big">The check-in comes first.</p>`;
  if (st.length) h += `<h4>Our Shared Strengths</h4><ul class="gv-rlist">${st.map(p => `<li style="--pc:${p.color}"><b>${p.name}</b> <span>${esc(line('strength', p.key) || DEFL.strength(p))}</span></li>`).join('')}</ul>`;
  if (sd.length) h += `<h4>Steady</h4><p>${esc(list3(sd.map(p => p.name)))}. Steady ground to grow from.</p>`;
  if (ed.length) h += `<h4>Our Growing Edges</h4><ul class="gv-rlist">${ed.map(p => { const ideas = kindPractices(gk(), p.key).slice(0, 3); return `<li style="--pc:${p.color}"><b>${p.name}</b> <span>${esc(line('edge', p.key) || DEFL.edge(p))}</span>${ideas.length && !forFam ? `<small class="gv-ideas">Ideas: ${esc(ideas.map(x => pv(x).name).join(', '))}.</small>` : ''}</li>`; }).join('')}</ul>`;
  else h += `<p>${esc(Wk(GW('results.noEdges'), gk()) || 'Nothing stood out as a Growing Edge today. Choose any part to grow, or keep tending what already works.')}</p>`;
  if (none.length) h += `<p class="fw-soft">${esc(list3(none.map(p => p.name)))}: passed this time.</p>`;
  const t = talkList();
  if (t.length) h += `<h4>Things to Talk About</h4><p class="fw-soft">${esc(Wk(GW('results.talkIntro'), gk()) || 'You saw these differently. Talk them over gently, never about who saw it which way.')}</p><ul>${t.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  h += `<p class="gv-shape">${esc(Wk(GW('results.oneShape'), gk()) || 'No family is strong in all six. Every grove has its own shape.')}</p>`;
  if (c.quick && isFam()) h += `<p class="fw-soft">${esc(Wk(GW('results.quickLine'), gk()) || 'A quick check-in is a short look.')}</p>`;
  return h;
}
function marks(){ const L = levels(); return `<ul class="gv-rmarks" aria-label="Each part, in words">${PARTS6.map(p => `<li class="lv-${L[p.key] || 'none'}" style="--pc:${p.color}"><span aria-hidden="true"></span><b>${p.name}</b><small>${L[p.key] ? LEVEL[L[p.key]] : 'Passed'}</small></li>`).join('')}</ul>`; }
function vResults(){
  const w = stepW('results');
  if (!answered()) return `<p class="fw-warn">Start the check-in first.</p>`;
  return sayBlk(pick(w, 'say')) + `<div class="fw-blk gv-results" data-gvanc="res">${marks()}${resultsInner(false)}</div>
    <p class="fw-sub">${esc(WW().visit.privacy)}</p>` + noteBox('results');
}
// The plan, built with the family (grove-plan.md Section 4): one or two Growing Edges, two or three practices each anchored to a
// time they're already together, one choice from the youngest, one Shared Strength kept going, Our Words, twelve weeks.
function vPlan(){
  const w = stepW('plan'), c = S.cur, pd = c.plan, L = levels(), k = gk(), LV = LEVERS();
  const sugg = PARTS6.filter(p => L[p.key] === 'edge').map(p => p.key), strong = PARTS6.filter(p => L[p.key] === 'strength').map(p => p.key);
  const step = (n, t, s) => `<h3 class="gv-step"><span>${n}</span>${esc(t)}</h3>${s ? `<p class="fw-sub">${esc(s)}</p>` : ''}`;
  const anchors = GW('plan.anchors.' + k, null) || ['Dinner', 'The Car', 'Bedtime', 'Saturday Morning'];
  let h = sayBlk(pick(w, 'say')) + `<div class="fw-blk gv-builder" data-gvanc="plan">`;
  h += step(1, 'One or Two Growing Edges', GW('plan.stepEdges', '') + (sugg.length ? ' Suggested from the check-in; any part can be chosen.' : ' Any part can be chosen.'));
  h += `<div class="fw-chips">${PARTS6.map(p => chip('edge', p.key, pd.edges.includes(p.key), p.name + (sugg.includes(p.key) ? ' (Suggested)' : ''))).join('')}</div>`;
  h += step(2, 'Two or Three Practices', GW('plan.stepPractices', ''));
  if (!pd.edges.length) h += '<p class="fw-soft">Pick a Growing Edge first.</p>';
  pd.edges.forEach(e => { const P = PART[e], list = kindPractices(k, e);
    h += `<p class="gv-lbl" style="--pc:${P.color}">${P.name}</p><div class="gv-picklist">${list.map(x => { const on = pd.items.some(i => i.pid === x.id), y = pv(x);
      return `<button type="button" class="gv-pickp" data-gva="prac" data-gvv="${esc(x.id)}" aria-pressed="${on}"><b>${esc(y.name)}</b><span>${esc(y.text)}</span>${x.lever && LV[x.lever] ? `<small>${esc(LV[x.lever])}</small>` : ''}</button>`; }).join('') || '<p class="fw-soft">No practices for this part yet.</p>'}</div>`; });
  if (pd.items.length){
    h += step(3, 'Anchor Each Practice', GW('plan.stepAnchor', ''));
    pd.items.forEach((it, n) => { const x = prac(it.pid); if (!x) return;
      h += `<p class="gv-lbl">${esc(pv(x).name)}</p><div class="fw-chips">${anchors.map(a => chip('anchor', n + '|' + a, it.anchor === a, a)).join('')}</div>
        <input type="text" data-gvm="anchor" data-gvk="${n}" maxlength="60" placeholder="Or their own time" value="${esc(anchors.includes(it.anchor) ? '' : it.anchor || '')}" aria-label="Their own time for ${esc(pv(x).name)}" style="margin-top:6px">`; });
  }
  let n = 4;
  if (isFam() && kidsOn()){
    h += step(n++, 'One Choice From the Youngest', GW('plan.stepYoungest', '')) + sayBlk([WW().visit.kids.youngest]);
    const kl = kindPractices(k).filter(x => x.kid);
    h += `<div class="fw-chips">${kl.slice(0, 12).map(x => chip('youngest', x.id, pd.youngest === x.id, pv(x).name)).join('')}</div>`;
  }
  if (strong.length){
    h += step(n++, 'Keep One Shared Strength Going', GW('plan.stepStrength', ''));
    const sl = strong.flatMap(s => kindPractices(k, s).slice(0, 4));
    h += `<div class="fw-chips">${sl.map(x => chip('strength', x.id, pd.strength === x.id, pv(x).name)).join('')}</div>`;
  }
  h += step(n++, 'Our Words', 'Optional.');
  h += `<label class="f" for="gv-pw">${esc(GW('plan.wordsPrompt', 'What do we hope this season brings us?'))}</label><textarea id="gv-pw" rows="2" maxlength="200" data-gvm="pwords">${esc(pd.words)}</textarea>
    <label class="f" for="gv-po">${esc(GW('plan.ownPracticePrompt', 'Our own practice or tradition'))}</label><input type="text" id="gv-po" maxlength="120" data-gvm="pown" value="${esc(pd.own)}">`;
  h += step(n++, 'Our Rhythm', '') + `<p>${esc(GW('plan.rhythm', 'Twelve weeks together: a quick check-in at weeks 4 and 8, and a full check-in at week 12.'))}</p></div>`;
  return h + noteBox('plan');
}
const planPids = pd => pd.items.map(i => i.pid).concat(pd.youngest ? [pd.youngest] : [], pd.strength ? [pd.strength] : []).filter((x, i, a) => x && a.indexOf(x) === i);
function vHome(){
  const w = stepW('home'), c = S.cur, CS = WW().visit.consentSend, SD = WW().visit.send;
  let h = sayBlk(pick(w, 'say')) + `<div class="fw-blk"><h3>${esc(fill(WW().visit.print.title))}</h3><p class="fw-sub">What they saw together, in words, and their plan. No numbers anywhere.</p>
    <div class="row"><button type="button" class="btn btn-gold" data-gva="print">Save or Print Their Page</button></div></div>`;
  h += `<div class="fw-blk"><h3>${esc(SD.title)}</h3>${sayBlk([CS.say], 'Ask first')}
    <div class="fw-chips">${chip('send', 'yes', c.send === 'yes', CS.yes)}${chip('send', 'no', c.send === 'no', CS.no)}</div>`;
  if (c.send === 'yes'){
    if (!c.code) h += `<p class="fw-sub">${esc(SD.lead)}</p><div class="row" style="margin-top:8px"><button type="button" class="btn btn-gold" data-gva="mkcode">Make the Code</button></div>`;
    else h += `<div class="fw-share gv-share"><div class="fw-qr">${qrSvg(c.code.link)}</div><div class="fw-share-m"><p class="gv-code" aria-label="The code">${esc(c.code.show)}</p>${sayBlk([SD.codeSay])}
      <ol class="rk-do">${SD.steps.map(x => `<li>${esc(fill(x))}</li>`).join('')}</ol>
      <div class="row"><button type="button" class="btn btn-line btn-sm" data-gva="copylink">Copy the Link</button><button type="button" class="btn btn-line btn-sm" data-gva="textlink">Text the Link</button><button type="button" class="btn btn-line btn-sm" data-gva="maillink">Email the Link</button></div>
      <div class="row" style="margin-top:6px"><button type="button" class="btn btn-line btn-sm" data-gva="copycode">Copy the Code</button><button type="button" class="btn btn-line btn-sm" data-gva="textcode">Text the Code</button><button type="button" class="btn btn-line btn-sm" data-gva="mailcode">Email the Code</button></div>
      <p class="fw-sub">Send the link first, then the code in a separate message. The page you print carries both.</p></div></div>`;
  } else if (c.send === 'no') h += '<p class="fw-sub">Their page is theirs to keep. They can add it to The Grove by hand any time.</p>';
  return h + '</div>' + noteBox('home');
}
function vClose(){
  const w = stepW('close'), c = S.cur, V2 = WW().visit, fam = isFam();
  const T = fam ? arr(WW().followUp.touches) : [];
  return sayBlk(pick(w, 'say')) + (fam ? `<div class="fw-blk"><h3>Next Visit</h3>${sayBlk([V2.next.say])}<label class="f" for="gv-next">Date</label><input type="date" id="gv-next" data-gvm="next" value="${esc(c.next)}" style="max-width:220px"></div>
    <div class="fw-blk"><h3>Follow-Ups</h3><p class="fw-sub">${esc(WW().followUp.intro)}</p><ul class="fw-flist">${T.map(t => `<li><span>${esc(t.title)}</span><span>${esc(nice(addDays(c.date, +t.days || 0)))}</span></li>`).join('')}</ul><p class="fw-sub">They show in Caseload and on Home when they come due.</p></div>` : `<div class="fw-blk"><p>${esc(WW().groupCheckin.safety)}</p></div>`) + noteBox('close');
}
function vTidy(){
  const c = S.cur, ids = stepIds(), marked = ids.filter(id => c.tidy[id]), rest = ids.filter(id => !c.tidy[id] && (c.notes[id] || '').trim());
  const row = id => `<section class="fw-blk"><div class="fw-blk-h"><h3>${esc(pageT(id))}</h3><span class="row"><button type="button" class="btn btn-line btn-sm" data-gva="step" data-gvv="${id}">Go There</button>${c.tidy[id] ? `<button type="button" class="btn btn-gold btn-sm" data-gva="tidy" data-gvv="${id}">Tidied</button>` : ''}</span></div><textarea rows="3" data-gvm="note" data-gvk="${id}" aria-label="Note for ${esc(pageT(id))}">${esc(c.notes[id] || '')}</textarea></section>`;
  return `<p class="fw-sub" style="margin-top:0">${esc(WW().visit.tidy)}</p>` + (marked.length ? marked.map(row).join('') : '<p class="fw-soft">Nothing marked to tidy.</p>') + (rest.length ? `<h3 style="margin-top:18px">Other Notes</h3>${rest.map(row).join('')}` : '');
}
function vFinish(){
  const c = S.cur, fam = isFam(), pd = c.plan;
  const parts = pd.edges.map(e => PART[e].name), ps = planPids(pd).map(id => (prac(id) && pv(prac(id)).name) || '').filter(Boolean);
  return `<div class="fw-fin"><p><b>What your record keeps.</b> ${esc(WW().visit.privacy)}</p>
    <ul class="fw-flist"><li><span>Date</span><span>${esc(nice(c.date))}</span></li>
    <li><span>${fam ? 'Check-in' : 'Quick Group Check-in'}</span><span>${answered() ? (c.quick ? 'Quick, held' : 'Full, held') : 'Not held'}</span></li>
    ${fam ? `<li><span>Plan parts</span><span>${esc(parts.join(', ') || 'None chosen')}</span></li><li><span>Practices</span><span>${esc(ps.join(', ') || 'None chosen')}</span></li>
    <li><span>Send to The Grove</span><span>${c.code ? 'Sent, with their yes' : c.send === 'no' ? 'Not today' : 'Not sent'}</span></li><li><span>Next visit</span><span>${esc(c.next ? nice(c.next) : 'Not set')}</span></li>` : `<li><span>Session</span><span>${c.n || ''}</span></li>`}
    <li><span>Private notes</span><span>${Object.values(c.notes).filter(x => (x || '').trim()).length} ${Object.values(c.notes).filter(x => (x || '').trim()).length === 1 ? 'note' : 'notes'}</span></li></ul></div>
    <label class="f" for="gv-vdate">Visit date</label><input type="date" id="gv-vdate" data-gvm="date" value="${esc(c.date)}" style="max-width:220px">
    <div class="row" style="margin-top:14px"><button type="button" class="btn btn-gold" data-gva="save">Save the ${fam ? 'Visit' : 'Session'}</button><button type="button" class="btn btn-line" data-gva="discard">Leave Without Saving</button></div>`;
}

// ---------- Phone Mode ----------
function vPhone(){
  const id = curStep(), w = stepW(id), V2 = WW().visit, c = S.cur, L = [];
  const hd = '<div class="fw-ph-h"><span aria-hidden="true">&#9742;</span> Read aloud, one at a time. Pause after each.</div>';
  arr(pick(w, 'phone')).forEach(t => L.push(['', t]));
  if (id === 'changes') { const ch = changesFor(gk()); if (ch.length) L.push(['Choices to read', ch.map(x => x.label).join(', ')]); }
  if (id === 'checkin' && c.started){
    const list = qList(gk(), c.quick), it = list[c.i];
    if (it){ const ps = V2.parts[it.part] || {}; if ((it.i === 0 || c.quick) && isFam() && pick(ps, 'phone')) L.push(['', pick(ps, 'phone')]);
      L.push(['Question ' + (c.i + 1) + ' of ' + list.length, qText(it.q)]); if (kidsOn() && kidText(it.q)) L.push(['For children', kidText(it.q)]); L.push(['The answers', V2.answers.phone]); }
  } else if (id === 'checkin') L.push(['The answers', V2.answers.phone]);
  if (id === 'results' && answered()){
    const Lv = levels(), st = PARTS6.filter(p => Lv[p.key] === 'strength').map(p => p.name), ed = PARTS6.filter(p => Lv[p.key] === 'edge').map(p => p.name);
    if (st.length) L.push(['Shared Strengths', 'Your Shared ' + (st.length === 1 ? 'Strength is ' : 'Strengths are ') + list3(st) + '.']);
    if (ed.length) L.push(['Growing Edges', 'Where you want to grow: ' + list3(ed) + '.']);
    const t = talkList(); if (t.length) L.push(['Things to Talk About', 'You saw ' + (t.length === 1 ? 'one question' : t.length + ' questions') + ' differently. That is good news: everyone spoke.']);
  }
  if (id === 'plan'){ const ed = c.plan.edges.map(e => PART[e].name); if (ed.length) L.push(['Growing', list3(ed)]); c.plan.edges.forEach(e => { const ps = kindPractices(gk(), e).slice(0, 4).map(x => pv(x).name); if (ps.length) L.push(['Choices for ' + PART[e].name, ps.join(', ')]); }); }
  if (id === 'home') { L.push(['Send to The Grove', V2.consentSend.phone]); if (c.code) L.push(['The code', c.code.show.split('').join(' ')]); }
  if (id === 'close' && isFam()) L.push(['Next time', V2.next.phone]);
  if (id === 'tidy' || id === 'finish') L.push(['', 'Thank you for today.']);
  return `<div class="fw-phone">${hd}<ol>${L.filter(x => x[1]).map(x => `<li>${x[0] ? `<h3>${esc(x[0])}</h3>` : ''}<p>${esc(fill(x[1]))}</p></li>`).join('')}</ol><p class="fw-sub">Tap their answers in ${esc(guideName())}'s View as they talk.</p>${crisis()}</div>`;
}
const guideName = () => ((C.name && C.name()) || 'Guide').split(/\s+/)[0];

// ---------- Family View (its own window, or here to tilt the laptop) ----------
const fsec = (h, x, k) => `<div class="fw-fsec"${k ? ` data-gvanc="${esc(k)}"` : ''}>${h ? `<h3>${esc(h)}</h3>` : ''}${x}</div>`;
function famBody(){
  const c = S.cur; if (!c) return '';
  const id = curStep(), w = stepW(id), r = rec(), head = t => `<div class="fw-fam"><p class="fw-fsub">${esc(isFam() ? K().checkin : WW().groupCheckin.title)}${r ? ' &middot; ' + esc(r.name) : ''}</p><h2>${esc(t)}</h2>`;
  const line = pick(w, 'family') ? `<p class="fw-big" style="margin:0 0 14px">${esc(fill(pick(w, 'family')))}</p>` : '';
  if (id === 'changes') return head(pageT(id)) + line + fsec('', `<div class="fw-fchips">${changesFor(gk()).map(x => `<span class="fw-fchip${c.changes.includes(x.id) ? ' on' : ''}">${c.changes.includes(x.id) ? '&#10003; ' : ''}${esc(x.label)}</span>`).join('')}</div>`, 'ch') + '</div>';
  if (id === 'checkin' && c.started && okToGo()){
    const list = qList(gk(), c.quick), it = list[c.i]; if (!it) return head(pageT(id)) + '</div>';
    const P = PART[it.part], cur = c.ans[it.key], kid = kidsOn() && kidText(it.q);
    return head(P.name + ', ' + P.sub) + `<p class="fw-fsub" style="color:inherit;opacity:.75">Question ${c.i + 1} of ${list.length}</p>` +
      fsec('', `<p class="gv-fq">${esc(qText(it.q))}</p>${kid ? `<p class="fw-big fw-soft">For children: ${esc(kid)}</p>` : ''}`, 'q') +
      fsec('', `<div class="fw-fchips">${ANSWERS.concat(ASPECIAL).map(([a, l]) => `<span class="fw-fchip${cur === a ? ' on' : ''}">${cur === a ? '&#10003; ' : ''}${l}</span>`).join('')}</div>`, 'a') + '</div>';
  }
  if (id === 'results' && answered()) return head(pageT(id)) + fsec('', marks() + `<div class="fw-read gv-fres">${resultsInner(true)}</div>`, 'res') + '</div>';
  if (id === 'plan'){
    const pd = c.plan, rows = pd.items.map(i => [prac(i.pid), i.anchor, '']).concat(pd.youngest ? [[prac(pd.youngest), '', "The Youngest's Choice"]] : [], pd.strength ? [[prac(pd.strength), '', 'Keeping a Shared Strength Going']] : []).filter(x => x[0]);
    return head(fill(K().plan)) + line + fsec('Growing', `<div class="fw-fchips">${PARTS6.map(p => `<span class="fw-fchip${pd.edges.includes(p.key) ? ' on' : ''}">${pd.edges.includes(p.key) ? '&#10003; ' : ''}${p.name}</span>`).join('')}</div>`, 'plan') +
      (rows.length ? fsec('Our Practices', `<ul class="fw-flist">${rows.map(x => `<li><span><b>${esc(pv(x[0]).name)}</b>${x[2] ? ' (' + esc(x[2]) + ')' : ''}<br>${esc(pv(x[0]).text)}</span><span>${esc(x[1] || '')}</span></li>`).join('')}</ul>`, 'pp') : '') +
      (pd.words ? fsec('Our Words', `<p class="fw-big">${esc(pd.words)}</p>`, 'pw') : '') + (pd.own ? fsec('Our Own Practice', `<p class="fw-big">${esc(pd.own)}</p>`, 'po') : '') + '</div>';
  }
  if (id === 'home'){
    const SD = WW().visit.send;
    if (c.send === 'yes' && c.code) return head(SD.title) + `<p class="fw-big" style="margin:0 0 14px">${esc(fill(SD.family))}</p>` + fsec('', `<div class="gv-fqr">${qrSvg(c.code.link)}</div><p class="gv-fcode">${esc(c.code.show)}</p><ol>${SD.steps.map(x => `<li>${esc(fill(x))}</li>`).join('')}</ol>`, 'qr') + '</div>';
    return head(pageT(id)) + line + (c.send ? '' : fsec('', `<p class="fw-big">${esc(fill(WW().visit.consentSend.family))}</p>`, 'send')) + '</div>';
  }
  if (id === 'close' || id === 'finish' || id === 'tidy') return head(pageT('close')) + `<p class="fw-big" style="margin:0 0 14px">${esc(fill(pick(stepW('close'), 'family') || 'Thank you.'))}</p>` + (c.next ? fsec('Next Time', `<p class="fw-big">${esc(nice(c.next))}</p>`, 'next') : '') + '</div>';
  return head(pageT(id)) + (line || '<p class="fw-big fw-soft">Talking together.</p>') + '</div>';
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
.fw-flist li span:first-child{min-width:0;overflow-wrap:anywhere;}.fw-flist li span:last-child{color:var(--soft);text-align:right;}
.fw-big{font-size:1.2em;margin:0;}.fw-soft{color:var(--soft);font-size:.8em;}
.fw-read{font-size:1em;line-height:1.5;overflow-wrap:anywhere;}.fw-read h4{font-family:"Cormorant Garamond",Georgia,serif;font-size:1.3em;margin:.6em 0 .2em;}
.gv-fq{font-family:"Cormorant Garamond",Georgia,serif;font-size:1.9em;font-weight:600;line-height:1.2;margin:0 0 .3em;overflow-wrap:anywhere;}
.gv-rmarks{list-style:none;margin:0 0 10px;padding:0;display:flex;flex-wrap:wrap;gap:8px;}.gv-rmarks li{display:flex;align-items:center;gap:8px;border:1px solid var(--line);border-radius:30px;padding:6px 14px;}
.gv-rmarks span{width:16px;height:16px;border-radius:50%;border:2px solid var(--pc);}.gv-rmarks .lv-strength span{background:var(--pc);}.gv-rmarks .lv-steady span{background:color-mix(in srgb,var(--pc) 45%,transparent);}
.gv-rmarks small{color:var(--soft);}.gv-rlist{list-style:none;padding:0;margin:0;}.gv-rlist li{border-left:4px solid var(--pc);padding:4px 12px;margin:0 0 8px;}.gv-rlist span{display:block;}
.gv-shape{font-style:italic;color:var(--soft);}
.gv-fqr svg{width:min(320px,80vw);height:auto;background:#fff;border-radius:12px;display:block;margin:0 auto;padding:8px;}
.gv-fcode{font-family:"Barlow Condensed",sans-serif;font-weight:700;letter-spacing:4px;font-size:2em;text-align:center;margin:12px 0;}
.fw-top{display:flex;justify-content:space-between;align-items:center;gap:12px;color:var(--soft);font-size:.7em;border-bottom:1px solid var(--line);padding:10px 28px;}
@media(max-width:600px){body{font-size:18px;}main{padding:20px 16px 40px;}.fw-flist li{flex-wrap:wrap;}.gv-fq{font-size:1.5em;}}`;
let famWin = null, famT = null;
function famPage(){
  const fonts = new URL('/fonts/fonts.css', location.href).href;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Family View</title><link rel="stylesheet" href="${fonts}"><style>${FCSS}</style></head><body><div class="fw-top"><span>Grow With Grounded</span><span>Family View</span></div><main id="fv">${famBody()}</main></body></html>`;
}
function openFam(){
  let w = null; try { w = window.open('', 'gg-gv-family', 'width=1100,height=820'); } catch (e) { w = null; }
  if (!w){ toast('Your browser kept the window from opening. Showing the Family View here instead.'); S.mode = 'family'; rerender(true); return; }
  famWin = w; API.famWin = w;
  try { if (!w.document.getElementById('fv')){ w.document.open(); w.document.write(famPage()); w.document.close(); } else pushFam(true); w.focus(); } catch (e) {}
  setTimeout(syncFam, 120);
}
function pushFam(now){
  clearTimeout(famT);
  const go = () => { if (!S.cur || !famWin || famWin.closed) return; try { const el = famWin.document.getElementById('fv'); if (el){ el.innerHTML = famBody(); syncFam(); } } catch (e) {} };
  if (now) go(); else famT = setTimeout(go, 150);
}
// Follow My Scroll: the family window follows this window's place by section.
function syncFam(){
  if (!S.follow || !famWin || famWin.closed || !S.on) return;
  let fd, fw = famWin; try { fd = fw.document; if (!fd || !fd.getElementById('fv')) return; } catch (e){ return; }
  const main = document.getElementById('gv-main'); if (!main) return;
  const de = document.documentElement, top = ((document.querySelector('header.bar') || {}).offsetHeight || 0) + 12;
  const fmax = Math.max(0, fd.documentElement.scrollHeight - fw.innerHeight), myMax = Math.max(0, de.scrollHeight - window.innerHeight);
  const F = {}; fd.querySelectorAll('[data-gvanc]').forEach(el => { if (!F[el.dataset.gvanc]) F[el.dataset.gvanc] = el; });
  const A = [...main.querySelectorAll('[data-gvanc]')];
  let i = -1; A.forEach((a, j) => { if (a.getBoundingClientRect().top <= top) i = j; });
  let target = null;
  for (let j = i; j >= 0; j--){ const a = A[j], f = F[a.dataset.gvanc]; if (!f) continue; const r = a.getBoundingClientRect(), frac = Math.max(0, Math.min(1, (top - r.top) / Math.max(1, r.height)));
    target = f.getBoundingClientRect().top + fw.scrollY + frac * f.offsetHeight - 16; break; }
  if (target == null) target = myMax ? window.scrollY / myMax * fmax : 0;
  if (window.scrollY <= 2) target = 0; else if (myMax && window.scrollY >= myMax - 2) target = fmax;
  target = Math.max(0, Math.min(fmax, Math.round(target)));
  try { fw.scrollTo(0, target); } catch (e) {}
  API.lastSync = {target, i};
}
let syncRaf = 0;
window.addEventListener('scroll', () => { if (!famWin || famWin.closed || !S.follow || !S.on) return; if (syncRaf) return; syncRaf = requestAnimationFrame(() => { syncRaf = 0; syncFam(); }); }, {passive: true});

// ---------- the page ----------
const curStep = () => { const P = pages(); return P[Math.max(0, Math.min(P.length - 1, S.step))]; };
function view(){
  const c = S.cur, r = rec();
  if (!c || !r){ S.on = false; return ''; }
  if (!GK && !GK_FAIL){ gkLoad(); return '<div class="card"><p class="muted">Loading the check-in questions...</p></div>'; }
  if (GK_FAIL) return `<div class="card"><h3>The check-in questions didn't load</h3><p class="muted">They come from growwithgrounded.com, so this needs a connection.</p><div class="row" style="margin-top:10px"><button class="btn btn-line btn-sm" data-gva="retry">Try Again</button><button class="btn btn-line btn-sm" data-gva="leave">Back</button></div></div>`;
  const P = pages(), id = curStep(), mode = S.mode, n = P.indexOf(id), num = n < stepIds().length;
  let body;
  if (id === 'tidy') body = vTidy();
  else if (id === 'finish') body = vFinish();
  else if (mode === 'family') body = `<div class="fw-famwrap">${famBody()}</div>`;
  else if (mode === 'phone') body = vPhone();
  else body = {welcome: vWelcome, consent: vConsent, changes: vChanges, checkin: vCheckin, results: vResults, plan: vPlan, home: vHome, close: vClose, open: vOpen}[id]();
  const rail = `<ol>${P.map((k, j) => `${k === 'tidy' ? '<li aria-hidden="true"><div class="fw-sep"></div></li>' : ''}<li><button type="button" data-gva="step" data-gvv="${k}"${id === k ? ' aria-current="step"' : ''}><span class="n">${j < stepIds().length ? j + 1 : k === 'finish' ? '&#9825;' : '&#10003;'}</span><span>${esc(pageT(k))}</span></button></li>`).join('')}</ol>`;
  return `<div id="gv-root"><button type="button" class="linkbtn" data-gva="leave">&larr; Leave for Now</button>
  <div class="fw-head"><div style="min-width:0"><div class="eyebrow">${esc(isFam() ? WW().visit.title : WW().groupCheckin.title + (c.n ? ', Session ' + c.n : ''))}</div><h1>${esc(r.name)}</h1><p class="muted" style="margin:2px 0 0">${esc(KW(gk()).name)} words${isPlain() ? ', Plain' : ', Faith welcome'}${kidsOn() ? ', children take part' : ''}. Answers stay on this screen only.</p></div>
   <div class="fw-modes" role="group" aria-label="View">${[['guide', guideName() + "'s View"], ['family', 'Family View Here'], ['phone', 'Phone Mode']].map(([x, l]) => chip('mode', x, mode === x, l)).join('')}<button type="button" class="btn btn-gold btn-sm" data-gva="famwin">Open Family View Window</button>${chip('follow', '', S.follow, 'Follow My Scroll', ' title="The Family View Window follows your place on the page"')}</div></div>
  ${crisis()}
  <div class="fw-lay"><nav class="fw-rail" aria-label="Steps">${rail}</nav>
  <div id="gv-main" style="min-width:0"><div class="fw-kick">${num ? 'Step ' + (n + 1) + ' of ' + stepIds().length : id === 'tidy' ? 'After the Visit' : 'All Done'}${mode === 'family' && num ? ' &middot; Family View' : mode === 'phone' && num ? ' &middot; Phone Mode' : ''}</div><h2 style="margin:2px 0 6px">${esc(pageT(id))}</h2>
   ${mode === 'family' && num ? '<p class="fw-sub">This is what they see. For a call, open the Family View Window and share that window by itself on Zoom, Teams, or FaceTime. It follows your taps.</p>' : ''}
   ${body}
   <div class="fw-nav"><button type="button" class="btn btn-line" data-gva="nav" data-gvv="-1"${n <= 0 ? ' disabled' : ''}>&larr; Back</button>${id === 'finish' ? '' : `<button type="button" class="btn btn-gold" data-gva="nav" data-gvv="1">${esc(P[n + 1] === 'finish' ? 'Finish' : 'Next')} &rarr;</button>`}</div></div></div></div>`;
}
function vOpen(){
  const w = stepW('open'), r = rec(), G = LIBW(), SS = G.series || {};
  return sayBlk(pick(w, 'say')) + (S.cur.n ? `<p class="fw-sub">${esc(fill(WW().groupCheckin.at[S.cur.n] || ''))}</p>` : '') +
    (arr(SS.groupRules).length ? `<div class="fw-blk"><h3>Group Agreements</h3><ul class="rk-do">${SS.groupRules.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : '') +
    `<div class="fw-blk"><h3>This Group</h3><label class="f" for="gv-gk">Kind of group (sets the questions)</label><select id="gv-gk" data-gvm="gk" style="max-width:340px">${GROUP_KINDS.map(([k, l]) => `<option value="${k}"${gk() === k ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select>
     <div class="fw-chips" style="margin-top:10px">${plainLocked() ? '<span class="pill">Plain words, set for a Classroom</span>' : chip('words', 'faith', !isPlain(), 'Faith Words Welcome') + chip('words', 'plain', isPlain(), 'Plain Words')}${gk() !== 'team' ? chip('kids', '', S.cur.kids, 'Children Take Part') : ''}</div></div>` + noteBox('open');
}

// ---------- printing (their page: words only, never a number) ----------
function helpHtml(){
  const h = S.cur && S.cur.hospice;
  return `<h2>Help any time</h2>${h ? `<p><b>Your hospice, 24/7:</b> ${esc(h)}</p>` : ''}<p><b>Crisis:</b> Call or text 988, any time (US). In an emergency, call 911.</p><p><b>A vulnerable adult at risk:</b> MAARC 1-844-880-1574.</p>`;
}
function printPage(){
  const c = S.cur, r = rec(), PR = WW().visit.print, k = K(), pd = c.plan, fam = isFam();
  const L = levels(), by = lv => PARTS6.filter(p => L[p.key] === lv);
  const line = (lv, part) => Wk(GW('results.' + lv + '.' + part), gk());
  let h = C.ph(fam ? 'For Your Family' : 'For Our Group') + `<p>${esc(r ? r.name : '')}, ${esc(nice(c.date))}</p><h1>${esc(fam ? fill(PR.title) : 'Our Group Check-in')}</h1><p>${esc(fill(PR.lead))}</p>`;
  if (answered()){
    const st = by('strength'), sd = by('steady'), ed = by('edge');
    if (st.length) h += `<h2>Our Shared Strengths</h2>${st.map(p => `<p><b>${p.name}.</b> ${esc(line('strength', p.key) || p.name + ' is a Shared Strength.')}</p>`).join('')}`;
    if (sd.length) h += `<h2>Steady</h2><p>${esc(list3(sd.map(p => p.name)))}.</p>`;
    if (ed.length) h += `<h2>Our Growing Edges</h2>${ed.map(p => `<p><b>${p.name}.</b> ${esc(line('edge', p.key) || p.name + ' is where ' + k.we + ' wants to grow next.')}</p>`).join('')}`;
    const t = talkList(); if (t.length) h += `<h2>Things to Talk About</h2><ul>${t.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
    h += `<p><i>${esc(Wk(GW('results.oneShape'), gk()) || 'Every grove has its own shape.')}</i></p>`;
  }
  if (fam && (pd.edges.length || pd.items.length)){
    h += `<h2>${esc(k.plan)}</h2><p><b>Growing:</b> ${esc(pd.edges.map(e => PART[e].name).join(', '))}</p>`;
    const rows = pd.items.map(i => [prac(i.pid), i.anchor, '']).concat(pd.youngest ? [[prac(pd.youngest), '', "The Youngest's Choice"]] : [], pd.strength ? [[prac(pd.strength), '', 'Keeping a Shared Strength Going']] : []).filter(x => x[0]);
    h += rows.map(([x, a, tag]) => { const y = pv(x); return `<div class="pr-step" style="border-left-color:${PART[x.part].color}"><h3>${esc(y.name)}${tag ? ' (' + esc(tag) + ')' : ''}</h3><p>${esc(y.text)}</p>${a ? `<p><b>When:</b> ${esc(a)}</p>` : ''}${kidsOn() && y.kid ? `<p><i>For children: ${esc(y.kid)}</i></p>` : ''}</div>`; }).join('');
    if (pd.own) h += `<p><b>Our own practice:</b> ${esc(pd.own)}</p>`;
    if (pd.words) h += `<p><i>${esc(pd.words)}</i></p>`;
    h += `<p>${esc(GW('plan.rhythm', 'Twelve weeks together: a quick check-in at weeks 4 and 8, and a full check-in at week 12.'))}</p>`;
  }
  if (c.code){ const SD = WW().visit.send; h += `<h2>${esc(SD.title)}</h2><div class="ht-qr" data-url="${esc(c.code.link)}" data-label="Scan to open The Grove">${qrSvg(c.code.link)}</div><p><b>Your code:</b> ${esc(c.code.show)}</p><ol>${SD.steps.map(x => `<li>${esc(fill(x))}</li>`).join('')}</ol>`; }
  if (c.next) h += `<p><b>Next visit:</b> ${esc(nice(c.next))}</p>`;
  h += helpHtml() + `<div class="pr-foot">${esc(fill(PR.foot))}</div>`;
  C.sheet(h, fam ? fill(PR.title) : 'Our Group Check-in', {file: fam ? 'grove-family-checkin' : 'grove-group-checkin', date: c.date});
}
const qrSvg = t => window.GGQR && GGQR.svg ? GGQR.svg(t, {label: 'QR code for The Grove'}) : '';

// ---------- Send to The Grove: an encrypted code (format GGGV1) the family's own grove loads ----------
// The payload: {v, k:'grove-visit', gk, w (f or p), c (children 1 or 0), d (date), q (quick 1 or 0), ch [changes],
// a (one letter per question in the full order, '-' for none), p (plan: e edges, i [[pid, anchor]], y youngest, s strength, w words, o own)}.
// Sealed with a key from an 8-letter code (PBKDF2 250,000, SHA-256, AES-GCM). The link is /grove/#gv=salt.iv.ct.
const ALPHA = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const b64u = u => { let s = ''; for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
function payload(){
  const c = S.cur, pd = c.plan, full = qList(gk(), false);
  return {v: 1, k: 'grove-visit', gk: gk(), w: isPlain() ? 'p' : 'f', c: c.kids ? 1 : 0, d: c.date, q: c.quick ? 1 : 0, ch: c.changes.slice(),
    a: full.map(x => c.ans[x.key] || '-').join(''),
    p: pd.edges.length || pd.items.length ? {e: pd.edges.slice(), i: pd.items.map(i => [i.pid, i.anchor || '']), y: pd.youngest || '', s: pd.strength || '', w: (pd.words || '').trim(), o: (pd.own || '').trim()} : null};
}
async function seal(obj, code){
  const TE = new TextEncoder(), salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
  const base = await crypto.subtle.importKey('raw', TE.encode(code), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey({name: 'PBKDF2', salt, iterations: 250000, hash: 'SHA-256'}, base, {name: 'AES-GCM', length: 256}, false, ['encrypt']);
  const ct = new Uint8Array(await crypto.subtle.encrypt({name: 'AES-GCM', iv}, key, TE.encode(JSON.stringify(obj))));
  return b64u(salt) + '.' + b64u(iv) + '.' + b64u(ct);
}
async function makeCode(){
  const c = S.cur; if (!c || c.send !== 'yes') return;
  if (!(window.crypto && crypto.subtle)){ toast('This browser cannot lock the code. Print their page instead.'); return; }
  const r = crypto.getRandomValues(new Uint8Array(8)); let code = ''; for (let i = 0; i < 8; i++) code += ALPHA[r[i] % ALPHA.length];
  const sealed = await seal(payload(), code);
  const link = new URL('../grove/', location.href).href.replace(/[?#].*$/, '') + '#gv=' + sealed;
  c.code = {code, show: code.slice(0, 4) + '-' + code.slice(4), link, text: '[GGGV1]' + sealed + '[/GGGV1]'};
  API.lastCode = c.code; rerender(true); toast('The code is ready.');
}
function copyText(t){ const done = () => toast('Copied.'); try { navigator.clipboard.writeText(t).then(done, () => fallback()); } catch (e){ fallback(); } function fallback(){ const a = document.createElement('textarea'); a.value = t; a.style.cssText = 'position:fixed;left:-9999px'; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (x) {} a.remove(); done(); } API.lastCopy = t; }
function openUrl(u){ API.lastUrl = u; try { const a = document.createElement('a'); a.href = u; a.rel = 'noopener'; document.body.appendChild(a); a.click(); a.remove(); } catch (e) {} }

// ---------- saving the visit: the record keeps no levels ----------
function saveVisit(){
  const c = S.cur, r = rec(); if (!c || !r) return;
  const fam = isFam(), notes = stepIds().map(id => (c.notes[id] || '').trim() ? pageT(id) + ': ' + c.notes[id].trim() : '').filter(Boolean).join('\n');
  r.meets = arr(r.meets);
  if (fam){
    if (c.consent && c.consent !== 'kept') r.consent = {how: c.consent, by: (c.cby || '').trim().slice(0, 40), date: c.date};
    else if (c.cby && r.consent) r.consent.by = c.cby.trim().slice(0, 40);
    r.meets.push({id: uid(), date: c.date, ck: answered() ? (c.quick ? 'quick' : 'full') : '', parts: c.plan.edges.slice(), practices: planPids(c.plan), sent: c.code ? c.date : '', notes});
    r.words = isPlain() ? 'plain' : 'faith'; r.kids = !!c.kids; if (c.hospice) r.hospice = c.hospice.slice(0, 40); else delete r.hospice;
    if (c.next) r.next = c.next; else delete r.next;
    if (answered() || c.plan.edges.length) r.fu = arr(WW().followUp.touches).map(t => ({id: t.id, date: addDays(c.date, +t.days || 0), title: t.title, done: false, from: c.date}));
  } else {
    let m = r.meets.find(x => x.n === c.n);
    if (!m){ m = {id: uid(), n: c.n, practices: [], date: c.date, notes: ''}; r.meets.push(m); }
    m.ck = answered() ? 'quick' : ''; m.date = m.date || c.date; if (notes) m.notes = (m.notes ? m.notes + '\n' : '') + notes;
    r.gk = gk(); r.words = isPlain() ? 'plain' : 'faith'; r.kids = !!c.kids;
  }
  r.u = Date.now(); C.save(); S.cur = null; S.on = false; S.step = 0; closeFam();
  toast(fam ? 'Visit saved. The answers went home with them, not into your records.' : 'Session saved. The answers stay with the group.');
  C.go('grove', backTo(c));
}
const backTo = c => c.kind === 'family' ? {gvr: c.rid} : {gvs: c.n || 1, gvsr: c.rid};
function closeFam(){ try { if (famWin && !famWin.closed) famWin.close(); } catch (e) {} famWin = null; }

// ---------- caseload, follow-ups, Home ----------
const recs = () => arr(C.data && C.data() && C.data().gvg);
const dueList = days => { const lim = addDays(today(), days == null ? 7 : days), out = [];
  recs().filter(r => !r.closed).forEach(r => { arr(r.fu).forEach((f, i) => { if (!f.done && f.date && f.date <= lim) out.push({r, f, i}); }); if (r.next && r.next <= lim && r.next >= addDays(today(), -14)) out.push({r, next: r.next}); });
  return out.sort((a, b) => ((a.f && a.f.date) || a.next).localeCompare((b.f && b.f.date) || b.next)); };
const lastMeet = r => arr(r.meets).filter(m => m.date).sort((a, b) => b.date.localeCompare(a.date))[0] || null;
const lastParts = r => (arr(r.meets).filter(m => arr(m.parts).length).sort((a, b) => (b.date || '').localeCompare(a.date || ''))[0] || {}).parts || [];
function caseload(){
  const L = recs().filter(r => !r.closed).sort((a, b) => ((lastMeet(b) || {}).date || b.created || '').localeCompare((lastMeet(a) || {}).date || a.created || ''));
  const due = dueList(7);
  return `<div class="page-head"><div class="eyebrow">Grove Guide</div><h1>Caseload</h1><p>The families and groups you walk with, by code. Last visit, the parts in their plan, the next visit, and follow-ups. Never a score.</p></div>
  ${due.length ? `<div class="card" style="border-left:4px solid var(--gold)"><h3>Follow-Ups Due</h3>${due.map(dueRow).join('')}</div>` : ''}
  <div class="card"><h3>Families and Groups</h3>${L.length ? L.map(r => { const m = lastMeet(r), fam = r.kind === 'family', parts = lastParts(r), open = arr(r.fu).filter(f => !f.done).length;
    return `<div class="list-row gv-cl"><div class="lr-main"><b>${esc(r.name)}</b> <span class="pill">${fam ? 'Family' : 'Group'}</span><br><small class="muted">${m ? 'Last ' + (fam ? 'visit' : 'session') + ' ' + esc(nice(m.date)) : 'No ' + (fam ? 'visits' : 'sessions') + ' yet'}${parts.length ? ' &middot; Plan: ' + esc(parts.map(p => (PART[p] || {}).name).filter(Boolean).join(', ')) : ''}${r.next ? ' &middot; Next visit ' + esc(nice(r.next)) : ''}${open ? ' &middot; ' + open + (open === 1 ? ' follow-up' : ' follow-ups') + ' ahead' : ''}</small></div><button class="btn btn-line btn-sm" data-act="gx-open" data-v="${esc(r.id)}">Open</button></div>`; }).join('') : '<p class="muted" style="margin-top:8px">No families or groups yet.</p>'}</div>`;
}
function dueRow(x){
  if (x.next) return `<div class="list-row"><div class="lr-main"><b>${esc(x.r.name)}</b> <span class="muted">Next visit</span><br><small class="muted">${esc(nice(x.next))}${x.next < today() ? ' <span class="pill warn">Past</span>' : ''}</small></div><button class="btn btn-line btn-sm" data-act="gx-open" data-v="${esc(x.r.id)}">Open</button></div>`;
  const t = arr(WW().followUp.touches).find(y => y.id === x.f.id) || {};
  return `<div class="list-row"><div class="lr-main"><b>${esc(x.r.name)}</b> <span class="muted">${esc(x.f.title)}</span><br><small class="muted">${esc(nice(x.f.date))}${x.f.date < today() ? ' <span class="pill warn">Overdue</span>' : ''}</small>${t.call ? `<details class="st-lf"><summary>Call words</summary><p>${esc(fillFor(t.call, x.r))}</p><p class="muted" style="font-size:14px">Call or text 988 any time. In an emergency, call 911.</p></details>` : ''}</div>
    <div class="row">${t.email ? `<button class="btn btn-line btn-sm" data-gva="fumail" data-gvv="${esc(x.r.id)}|${x.i}">Email</button>` : ''}<button class="btn btn-gold btn-sm" data-gva="fudone" data-gvv="${esc(x.r.id)}|${x.i}">Done</button></div></div>`;
}
const fillFor = (t, r, k) => { const K2 = KW(k || (r && r.kind === 'family' ? 'family' : (r && r.gk) || 'group')); return String(t || '').replace(/\{name\}/g, r.name).replace(/\{guide\}/g, (C.name && C.name()) || '').replace(/\{we\}/g, K2.we).replace(/\{We\}/g, K2.We).replace(/\{checkin\}/g, K2.checkin).replace(/\{plan\}/g, K2.plan); };
function homeCard(){
  if (!C.open || !C.open()) return '';
  const due = dueList(7); if (!due.length) return '';
  return `<div class="card" style="margin-top:14px;border-left:4px solid var(--sage)"><div class="spread"><h3>Grove Guide Follow-Ups</h3><button class="linkbtn" data-gva="caseload">Caseload</button></div>${due.slice(0, 5).map(dueRow).join('')}</div>`;
}
// On a family's or a group's record: the visit card, the next visit, follow-ups, and what each visit kept.
function recCard(r){
  if (!r) return '';
  const open = S.cur && S.cur.rid === r.id;
  if (r.kind === 'family'){
    const V2 = WW().visit, fu = arr(r.fu);
    return `<div class="card" style="border-left:4px solid var(--gold)"><div class="spread"><div><h3>${esc(V2.title)}</h3><p class="muted">${esc(V2.card)}</p></div><div class="row">${open ? '<button class="btn btn-gold" data-gva="resume">Return to the Visit</button>' : `<button class="btn btn-gold" data-gva="start" data-gvv="${esc(r.id)}">Start a Visit</button>`}</div></div>
      <p class="muted" style="font-size:14px;margin-top:8px">${esc(V2.privacy)}</p>
      ${r.next ? `<p style="margin-top:8px"><b>Next visit:</b> ${esc(nice(r.next))}</p>` : ''}
      ${fu.length ? `<details class="st-lf" style="margin-top:8px"${fu.some(f => !f.done && f.date <= addDays(today(), 7)) ? ' open' : ''}><summary>Follow-Ups (${fu.filter(f => !f.done).length} ahead)</summary><ul class="fw-flist">${fu.map((f, i) => `<li><span>${f.done ? '&#10003; ' : ''}${esc(f.title)}</span><span>${esc(nice(f.date))} ${f.done ? '' : `<button class="btn btn-line btn-sm" data-gva="fudone" data-gvv="${esc(r.id)}|${i}">Done</button>`}</span></li>`).join('')}</ul></details>` : ''}</div>`;
  }
  return '';
}
// A Group Series session that holds a quick Group Check-in (1, 6, 12).
function seriesCard(r, n){
  if (!r || !seriesAt().includes(n)) return '';
  const m = arr(r.meets).find(x => x.n === n), held = m && m.ck, open = S.cur && S.cur.rid === r.id && S.cur.n === n;
  return `<div class="card" style="border-left:4px solid var(--gold)"><div class="spread"><div><h3>${esc(WW().groupCheckin.title)}</h3><p class="muted">${esc(fillFor(WW().groupCheckin.at[n] || WW().groupCheckin.lead, r, r.gk || 'group'))}</p></div>${open ? '<button class="btn btn-gold" data-gva="resume">Return to It</button>' : `<button class="btn btn-gold" data-gva="gstart" data-gvv="${esc(r.id)}|${n}">${held ? 'Hold It Again' : 'Start the Quick Group Check-in'}</button>`}</div>${held ? `<p style="margin-top:8px"><span class="pill sage">Held ${esc(nice(m.date))}</span> <span class="muted">Group words only. No answers or levels are kept.</span></p>` : ''}</div>`;
}
const seriesPill = (r, n) => seriesAt().includes(n) ? ` <span class="pill${arr(r && r.meets).some(m => m.n === n && m.ck) ? ' sage' : ''}">Quick Check-in</span>` : '';
const meetLine = m => [m.ck ? (m.ck === 'full' ? 'Full check-in held' : 'Quick check-in held') : '', arr(m.parts).length ? 'Plan: ' + m.parts.map(p => (PART[p] || {}).name).filter(Boolean).join(', ') : '', m.sent ? 'Sent to The Grove' : ''].filter(Boolean).join(' &middot; ');

// The Staff session guide "Meeting with a Family Using The Grove" (grove-visit) links to the Grove Guide's own visit tool.
function guideBar(g){
  const t = C.tier && C.tier(); if (!g || g.id !== 'grove-visit' || (t !== 'staff' && t !== 'founder')) return '';
  const F = recs().filter(r => r.kind === 'family' && !r.closed);
  return `<div class="row" style="margin-top:10px"><button type="button" class="btn btn-line" data-gva="gvopen">Open the Grove Guide</button>${F.length ? `<select id="gv-gpick" aria-label="Choose a family" style="max-width:240px">${F.map(r => `<option value="${esc(r.id)}">${esc(r.name)}</option>`).join('')}</select><button type="button" class="btn btn-line" data-gva="gvpick">Start a Family Check-in Visit</button>` : ''}</div>
    <p class="muted" style="font-size:15px;margin:8px 0 0">The Grove Guide has the Family Check-in built for eye contact: one shared answer, a Family View, Phone Mode, the plan built together, and Send to The Grove.${F.length ? '' : ' Add the family there first, by code or initials.'}</p>`;
}
// ---------- actions ----------
function start(rid, n){
  const r = C.rec(rid); if (!r) return;
  if (S.cur && (S.cur.rid !== rid || (S.cur.n || 0) !== (n || 0)) && !confirm('Another visit is open on this screen. Leave it without saving and start this one?')) return;
  if (!S.cur || S.cur.rid !== rid || (S.cur.n || 0) !== (n || 0)){ S.cur = newVisit(r, n); S.step = 0; S.mode = 'guide'; }
  S.on = true; gkLoad(); C.go('grove', {gvv: 1});
}
function act(a, v, el){
  const c = S.cur;
  switch (a){
    case 'start': start(v); return;
    case 'gstart': { const [rid, n] = String(v).split('|'); start(rid, +n); return; }
    case 'resume': if (S.cur){ S.on = true; C.go('grove', {gvv: 1}); } return;
    case 'caseload': C.go('grove', {gvcl: 1}); return;
    case 'gvopen': C.go('grove'); return;
    case 'gvpick': { const sel = document.getElementById('gv-gpick'); if (sel && sel.value) start(sel.value); return; }
    case 'retry': GK_FAIL = false; gkLoad(); rerender(); return;
    case 'fudone': { const [rid, i] = String(v).split('|'), r = C.rec(rid), f = r && arr(r.fu)[+i]; if (!f) return; f.done = today(); r.u = Date.now(); C.save(); const y = window.scrollY; C.render(); window.scrollTo(0, y); toast('Marked done.'); return; }
    case 'fumail': { const [rid, i] = String(v).split('|'), r = C.rec(rid), f = r && arr(r.fu)[+i], t = f && arr(WW().followUp.touches).find(y => y.id === f.id); if (!t || !t.email) return;
      openUrl('mailto:?subject=' + encodeURIComponent(fillFor(t.email.subject, r)) + '&body=' + encodeURIComponent(fillFor(t.email.body, r))); return; }
  }
  if (!c) return;
  const list = () => qList(gk(), c.quick);
  switch (a){
    case 'leave': S.on = false; closeFam(); C.go('grove', backTo(c)); return;
    case 'discard': if (!confirm('Leave without saving? The answers and notes on this screen are cleared.')) return; { const b = backTo(c); S.cur = null; S.on = false; S.step = 0; closeFam(); C.go('grove', b); } return;
    case 'mode': S.mode = v; rerender(true); return;
    case 'famwin': openFam(); return;
    case 'follow': S.follow = !S.follow; rerender(true); if (S.follow) syncFam(); toast(S.follow ? 'The Family View Window follows your scroll.' : 'The Family View Window stays where it is.'); return;
    case 'step': S.step = Math.max(0, pages().indexOf(v)); rerender(); return;
    case 'nav': { const P = pages(); S.step = Math.max(0, Math.min(P.length - 1, S.step + (+v))); rerender(); return; }
    case 'tidy': c.tidy[v] = !c.tidy[v]; rerender(true); return;
    case 'words': if (!plainLocked()){ c.words = v; rerender(true); } return;
    case 'kids': c.kids = !c.kids; if (!c.kids) c.kidsFirst = false; rerender(true); return;
    case 'kidsfirst': c.kidsFirst = !c.kidsFirst; rerender(true); return;
    case 'consent': c.consent = v; rerender(true); return;
    case 'change': { const i = c.changes.indexOf(v); if (v === 'none') c.changes = i >= 0 ? [] : ['none']; else { c.changes = c.changes.filter(x => x !== 'none'); if (i >= 0) c.changes.splice(c.changes.indexOf(v), 1); else c.changes.push(v); } rerender(true); return; }
    case 'quick': if (!c.started){ c.quick = v === '1'; rerender(true); } return;
    case 'cistart': if (!okToGo()) return; c.started = true; c.i = 0; rerender(); focusQ(); return;
    case 'ans': { const L = list(), it = L[c.i]; if (!it) return; c.ans[it.key] = v; if (c.i < L.length - 1){ c.i++; rerender(true); focusQ(); } else { rerender(true); toast('That was the last question. See What We Saw when you are ready.'); } return; }
    case 'qprev': if (c.i > 0){ c.i--; rerender(true); } return;
    case 'qnext': if (c.i < list().length - 1){ c.i++; rerender(true); } return;
    case 'read': readAloud(); return;
    case 'edge': { const pd = c.plan, i = pd.edges.indexOf(v); if (i >= 0){ pd.edges.splice(i, 1); pd.items = pd.items.filter(x => (prac(x.pid) || {}).part !== v); } else { if (pd.edges.length >= 2) return toast('One or two Growing Edges. Tap one to remove it first.'); pd.edges.push(v); } rerender(true); return; }
    case 'prac': { const pd = c.plan, i = pd.items.findIndex(x => x.pid === v); if (i >= 0) pd.items.splice(i, 1); else { if (pd.items.length >= 3) return toast('Two or three practices. Tap one to remove it first.'); pd.items.push({pid: v, anchor: ''}); } rerender(true); return; }
    case 'anchor': { const j = String(v).indexOf('|'), n = +String(v).slice(0, j), an = String(v).slice(j + 1), it = c.plan.items[n]; if (it){ it.anchor = it.anchor === an ? '' : an; rerender(true); } return; }
    case 'youngest': c.plan.youngest = c.plan.youngest === v ? '' : v; rerender(true); return;
    case 'strength': c.plan.strength = c.plan.strength === v ? '' : v; rerender(true); return;
    case 'print': printPage(); return;
    case 'send': c.send = v; if (v !== 'yes') c.code = null; rerender(true); return;
    case 'mkcode': makeCode(); return;
    case 'copylink': if (c.code) copyText(c.code.link); return;
    case 'copycode': if (c.code) copyText(c.code.show); return;
    case 'textlink': if (c.code) openUrl('sms:?&body=' + encodeURIComponent(fill(WW().visit.send.textLink).replace('{link}', c.code.link))); return;
    case 'textcode': if (c.code) openUrl('sms:?&body=' + encodeURIComponent(fill(WW().visit.send.textCode).replace('{code}', c.code.show))); return;
    case 'maillink': if (c.code) openUrl('mailto:?subject=' + encodeURIComponent(fill(WW().visit.send.subject)) + '&body=' + encodeURIComponent(fill(WW().visit.send.textLink).replace('{link}', c.code.link))); return;
    case 'mailcode': if (c.code) openUrl('mailto:?subject=' + encodeURIComponent(fill(WW().visit.send.subject)) + '&body=' + encodeURIComponent(fill(WW().visit.send.textCode).replace('{code}', c.code.show))); return;
    case 'save': saveVisit(); return;
  }
}
function focusQ(){ const t = document.getElementById('gv-qtext'); if (t){ t.setAttribute('tabindex', '-1'); try { t.focus({preventScroll: true}); } catch (e) {} } }
function readAloud(){
  const c = S.cur, it = qList(gk(), c.quick)[c.i]; if (!it) return;
  if (!window.speechSynthesis){ toast('Read Aloud is not available in this browser.'); return; }
  const kid = kidsOn() && kidText(it.q), u = new SpeechSynthesisUtterance(qText(it.q) + (kid ? ' For children: ' + kid : ''));
  u.rate = .92; try { speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {} API.lastRead = u.text;
}
function input(t){
  const c = S.cur, m = t.dataset.gvm; if (!m) return false;
  if (m === 'fu') return true;
  if (!c) return true;
  if (m === 'note'){ c.notes[t.dataset.gvk] = t.value; return true; }
  if (m === 'hospice'){ c.hospice = t.value.slice(0, 40); return true; }
  if (m === 'cby'){ c.cby = t.value; return true; }
  if (m === 'anchor'){ const it = c.plan.items[+t.dataset.gvk]; if (it){ it.anchor = t.value.slice(0, 60); pushFam(); } return true; }
  if (m === 'pwords'){ c.plan.words = t.value.slice(0, 200); pushFam(); return true; }
  if (m === 'pown'){ c.plan.own = t.value.slice(0, 120); pushFam(); return true; }
  if (m === 'next'){ c.next = t.value; pushFam(); return true; }
  if (m === 'date'){ if (t.value) c.date = t.value; return true; }
  if (m === 'gk'){ if (!c.started || confirm('Change the kind of group? The answers so far are cleared.')){ c.gk = t.value; c.ans = {}; c.i = 0; c.started = false; if (c.gk === 'classroom') c.words = 'plain'; if (c.gk === 'team') c.kids = false; rerender(true); } else t.value = c.gk; return true; }
  return true;
}
document.addEventListener('click', e => {
  const b = e.target.closest && e.target.closest('[data-gva]'); if (!b || b.disabled) return;
  e.preventDefault(); act(b.dataset.gva, b.dataset.gvv || '', b);
});
document.addEventListener('input', e => { const t = e.target; if (t && t.dataset && t.dataset.gvm && t.tagName !== 'SELECT' && t.type !== 'date') input(t); });
document.addEventListener('change', e => { const t = e.target; if (t && t.dataset && t.dataset.gvm && (t.tagName === 'SELECT' || t.type === 'date')) input(t); });

const CSS = `
#gv-root{min-width:0;}
.gv-crisis{margin:12px 0 0;}
.gv-prog{display:flex;flex-wrap:wrap;gap:4px;margin:0 0 10px;}.gv-prog span{width:14px;height:14px;border-radius:50%;border:2px solid var(--pc);opacity:.55;}
.gv-prog span.on{background:var(--pc);opacity:1;}.gv-prog span.cur{outline:2px solid var(--ink);outline-offset:1px;opacity:1;}
.gv-q{border-left:6px solid var(--pc);}
.gv-kick{font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;font-size:14px;color:var(--pc);margin:0 0 6px;}
.gv-qtext{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:calc(30px * var(--scale));line-height:1.2;margin:0 0 8px;overflow-wrap:anywhere;}
.gv-qkid{color:var(--ink-soft);font-size:calc(18px * var(--scale));margin:0 0 6px;}
.gv-why{margin:6px 0;}.gv-why summary{cursor:pointer;font-weight:600;min-height:32px;}
.gv-tip{background:var(--bg-deep);border-radius:10px;padding:8px 12px;font-size:15px;margin:8px 0;}
.gv-ans{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:12px;}
.gv-ans2{grid-template-columns:repeat(2,minmax(0,1fr));margin-top:8px;}
.gv-a{min-height:64px;border:2px solid var(--line);border-radius:16px;background:var(--card);color:var(--ink);font:inherit;font-weight:700;font-size:calc(18px * var(--scale));cursor:pointer;padding:8px;}
.gv-a2{min-height:52px;font-weight:600;}
.gv-a[aria-pressed="true"]{background:var(--umber);border-color:var(--umber);color:#F4EBDA;}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .gv-a[aria-pressed="true"]{background:var(--gold);border-color:var(--gold);color:#1A130D;}}:root[data-theme="dark"] .gv-a[aria-pressed="true"]{background:var(--gold);border-color:var(--gold);color:#1A130D;}
@media(max-width:620px){.gv-ans{grid-template-columns:repeat(2,minmax(0,1fr));}}
.gv-rmarks{list-style:none;margin:0 0 12px;padding:0;display:flex;flex-wrap:wrap;gap:8px;}.gv-rmarks li{display:flex;align-items:center;gap:8px;border:1px solid var(--line);border-radius:30px;padding:6px 14px;background:var(--card);}
.gv-rmarks span{width:16px;height:16px;border-radius:50%;border:2px solid var(--pc);flex:none;}.gv-rmarks .lv-strength span{background:var(--pc);}.gv-rmarks .lv-steady span{background:color-mix(in srgb,var(--pc) 45%,transparent);}
.gv-rmarks small{color:var(--ink-soft);}
.gv-rlist{list-style:none;padding:0;margin:0 0 10px;}.gv-rlist li{border-left:4px solid var(--pc);padding:4px 12px;margin:0 0 8px;}.gv-rlist span,.gv-rlist small{display:block;}.gv-ideas{color:var(--ink-soft);}
.gv-results h4{margin:12px 0 6px;}.gv-shape{font-style:italic;color:var(--ink-soft);}
.gv-step{display:flex;gap:10px;align-items:center;margin:16px 0 4px;}.gv-step span{display:inline-grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--gold);color:var(--card);font-size:15px;flex:none;}
.gv-lbl{font-weight:700;margin:12px 0 6px;border-left:4px solid var(--pc,var(--gold));padding-left:8px;}
.gv-picklist{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px;}
.gv-pickp{text-align:left;border:1.5px solid var(--line);border-radius:14px;background:var(--card);color:var(--ink);font:inherit;padding:10px 12px;cursor:pointer;min-width:0;}
.gv-pickp b,.gv-pickp span,.gv-pickp small{display:block;overflow-wrap:anywhere;}.gv-pickp span{font-size:15px;color:var(--ink-soft);}.gv-pickp small{font-size:13px;color:var(--gold);margin-top:4px;}
.gv-pickp[aria-pressed="true"]{border-color:var(--gold);box-shadow:inset 0 0 0 2px var(--gold);}
.gv-code{font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:4px;font-size:calc(34px * var(--scale));margin:0 0 6px;}
.gv-share .fw-qr svg{width:180px;height:180px;}
.gv-cl small{overflow-wrap:anywhere;}
`;
(function(){ try { const s = document.createElement('style'); s.id = 'gv-css'; s.textContent = CSS; document.head.appendChild(s); } catch (e) {} })();

const API = {
  init: o => { C = o || {}; },
  on: () => !!(S.on && S.cur),
  view, caseload, homeCard, guideBar, recCard, seriesCard, seriesPill, meetLine, dueList, words: WW, seriesAt, prac,
  state: S, levels: () => S.cur ? levels() : null, payload: () => S.cur ? payload() : null, famBody: () => famBody(),
  kindsReady: () => !!GK, load: gkLoad
};
window.GGGv = API;
})();
