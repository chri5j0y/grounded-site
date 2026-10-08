// =====================================================================
// GROUNDED FIELD GUIDE (TM): Clients and Intake (GWG BLD 767).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// A Staff and Founder tab (Clients) for paid services, built like the Farewell Planning Session:
// First Conversation (at no charge, 10 to 15 minutes, with a timer and our internal policy card),
// the Intake Session (six steps: Privacy Notice, Who They Are, The Service, Services and Price,
// The Agreement, Deposit and Next Steps) with Say prompts, tap chips, quick notes, a Family View in
// its own window, and a Phone Mode; Client Files (contact, services agreed, the signed agreement,
// payments, numbered invoices, linked plans and sessions, notes); and Back Up (the weekly Back Up
// Now card on the Staff and Founder Home).
// Words: the Staff library's clients key, filled from the built-in words below wherever a piece is
// missing. Rates: the Staff library's services rates. Travel: no fee in St. Cloud, Sartell, Sauk
// Rapids, and Waite Park; beyond that, the IRS standard mileage rate, round trip from St. Cloud
// (a rate the Founder can update).
// GWG BLD 769: the privacy notice adds the writing-help line, and Step 1 asks the writing assistant yes (saved with how and when).
// Privacy: nothing is saved until the client's yes to the privacy notice is recorded. Files live in
// DATA.cli: encrypted with the rest of this device's records and carried in backups (merged by
// GGCli.merge, deletions recorded). Card numbers, bank numbers, and Social Security numbers are
// never asked for or kept. Nothing is sent anywhere: Copy, Text, and Email hand words to this
// device's own apps.
// =====================================================================
(function(){
'use strict';

let C = {}; // GGCli.init: data(), lib(), tier(), save(), render(), go(), toast(), sheet(), ph(), pf()
const S = {sec: 'first', step: 1, mode: 'chris', draft: null, intakeId: null, fileId: null, q: '', inv: null, payOpen: false,
  fc: {q: {}, notes: '', name: '', think: false, date: ''}, timer: {on: false, start: 0, el: 0}, sig: [], dep: {}, pay: {}, own: '', ownKind: 'session', rateEdit: false};
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const arr = x => Array.isArray(x) ? x : [];
const toast = m => C.toast ? C.toast(m) : null;
const D = () => (C.data && C.data()) || null;
const isStaff = () => { const t = C.tier && C.tier(); return t === 'staff' || t === 'founder'; };
const isFounder = () => (C.tier && C.tier()) === 'founder';

// ---------- dates and money ----------
const pad = n => String(n).padStart(2, '0');
const isoOf = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const today = () => isoOf(new Date());
const dOf = s => { const m = /^(\d{4})-(\d\d)-(\d\d)/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
const addDays = (s, n) => { const d = dOf(s); if (!d) return ''; d.setDate(d.getDate() + n); return isoOf(d); };
const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const nice = s => { const d = dOf(s); return d ? MON[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() : (s || ''); };
const tm = t => { const m = /^(\d\d?):(\d\d)/.exec(t || ''); if (!m) return t || ''; let h = +m[1]; const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + ':' + m[2] + ' ' + ap; };
const daysSince = ms => ms ? Math.floor((Date.now() - ms) / 864e5) : null;
const r2 = n => Math.round((+n || 0) * 100) / 100;
const perMile = n => '$' + (Math.round(n * 1000) % 10 ? (+n).toFixed(3) : (+n).toFixed(2));
const money = n => { n = r2(n); const whole = Math.abs(n % 1) < 0.001; return '$' + n.toLocaleString('en-US', {minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2}); };

// ---------- the built-in words (the Staff library's clients key replaces any piece) ----------
const L2 = (...a) => a.map(([id, t, svc, link]) => Object.assign({id, t}, svc ? {svc} : {}, link ? {link} : {}));
const DEF = {
  v: 0,
  irsRate: 0.725,
  firstConversation: {
    title: 'First Conversation',
    policy: ['At no charge, 10 to 15 minutes at most: for their questions, and for them to see who we are and decide.',
      'Spiritual guidance, emotional support, and session planning begin once there is a service agreement: the services, the price, and what is included, agreed in writing.',
      'If they say yes today, it can roll right into the first paid session.',
      'This is our own policy. Our pages and materials never advertise it.'],
    say: {open: "Thank you for reaching out. I'd love to hear what's on your heart, answer your questions, and let you get to know me a little. This first conversation is at no charge.",
      deep: "That matters, and I want to give it the time it deserves. Once we've agreed on the details, that's right where we'll begin.",
      close: "If you'd like to go ahead, the next step is a short intake where we agree on everything in writing: the services, the price, and what's included."},
    questions: ['What brings you to Grounded right now?', 'Who else is part of this with you?', 'Is there a date we should keep in mind?', 'What questions do you have for me?'],
    how: ['Who I am: a hospice chaplain who walks with people from all faith traditions and everything in-between.',
      "How it works: we talk through what you'd like, then agree on everything in writing: the services, the price, and what's included. No surprises.",
      'Faith shows up only as you choose it: at the center, in plain words, or a blend.',
      'Ceremonies are held with a 50% deposit, and the balance is due the day before. Sessions are paid at the time, and packages up front.',
      'What you share stays private, locked on my device.']
  },
  intake: {
    steps: [
      {id: 'privacy', title: 'Privacy Notice', say: "Before we begin, here's how I keep what you share. It's short, and I'll read it with you.", sub: 'Plain words. Read it together, eye to eye. Nothing is saved until their yes is recorded.',
        phoneLines: [['How I Keep What You Share', "I keep your names, how to reach you, the plans we make, and what we agree on. It's locked on my device and in my locked backup, and only my passcode opens it."], ['What I Never Keep', 'I never keep card numbers, bank numbers, or Social Security numbers.'], ['How Long', "Seven years after our last service, for business records, then it's deleted. You can ask to see it any time."], ['Your Yes', 'Is that all right with you?']]},
      {id: 'who', title: 'Who They Are', say: "Let's get the best ways to reach you, so nothing slips through.", sub: 'Names as they like them said, and the ways they like to be reached.',
        phoneLines: [['Your Name', "Can I get your full name, and how you'd like me to say it?"], ['Reaching You', "What's the best phone number, and an email?"], ['Your Address', 'And a mailing address, in case I send anything by mail.'], ['Best Ways and Times', 'Do you prefer a call, a text, or an email? Mornings, afternoons, or evenings?']]},
      {id: 'service', title: 'The Service', say: "Tell me what you'd like Grounded to help with, and when.", sub: 'Tap all that apply. The client chooses how faith shows up.',
        phoneLines: [['What We Are Planning', 'What would you like Grounded to help with?'], ['When and Where', 'Is there a date and a place already in mind?'], ["Who's Involved", 'Who else will be part of this: family, clergy, a funeral home or venue?'], ['Faith', 'Would you like faith at the center, plain words, or a blend? Any of these is right.']]},
      {id: 'price', title: 'Services and Price', say: "Here's each piece, what it costs, and when it's due. Ask me anything.", sub: 'Rates from the services library. A "From" rate is where pricing starts; the agreed price goes in Rate.',
        phoneLines: [['The Pieces', "I'll read each piece and its price, one at a time. Stop me with any question."], ['The Total', 'All together, that comes to [Total].'], ["When It's Due", 'A deposit of [Deposit] holds the date. The balance is due [Due].']]},
      {id: 'agree', title: 'The Agreement', say: "Here's everything we agreed, in one place. Take your time reading it.", sub: 'Two ways to sign: here together, or sent to read at home.',
        phoneLines: [['The Agreement', "I'll text or email you the agreement now. It lists the services, the price, and what's included."], ['Signing', 'When it looks right, reply "I agree" with your full name, and that is your signature on file.'], ['No Surprises', "Anything new or different, we'll agree on in writing first."]]},
      {id: 'next', title: 'Deposit and Next Steps', say: "Thank you. Let's record your deposit, and I'll tell you exactly what happens next.", sub: 'Never write down card or bank numbers here.',
        phoneLines: [['The Deposit', 'You can pay the deposit by check, card, Venmo, or I can send an invoice.'], ['What Happens Next', "Here's what comes next, and when you'll hear from me."]]}
    ],
    lists: {
      reach: L2(['call', 'Phone Call'], ['text', 'Text'], ['email', 'Email'], ['mail', 'Mail']),
      times: L2(['am', 'Mornings'], ['pm', 'Afternoons'], ['eve', 'Evenings'], ['any', 'Any Time']),
      services: L2(['funeral', 'Funeral or Memorial', 'officiant', 'farewell'], ['celebration', 'Celebration of Life', 'officiant', 'farewell'], ['graveside', 'Graveside or Committal', 'officiant', 'farewell'],
        ['wedding', 'Wedding', 'officiant', 'wedding'], ['elopement', 'Elopement', 'officiant', 'wedding'], ['vows', 'Vow Renewal', 'officiant', 'wedding'], ['tgm', 'The Grounded Marriage', 'officiant', 'premarital'],
        ['blessing', 'Blessings and Milestones', 'officiant'], ['eol', 'End-of-Life Support', 'eol'], ['guidance', 'Spiritual Guidance', 'counsel'], ['grief', 'Grief and Caregiver Support', 'grief'],
        ['meditation', 'Meditation, Sound, and Movement', 'meditation'], ['speaking', 'Speaking and Training', 'speaking']),
      faith: L2(['center', 'Faith at the Center'], ['plain', 'Plain Words'], ['blend', 'A Blend'], ['unsure', 'Not Sure Yet']),
      grace: L2(['standard', 'Standard Rate'], ['reduced', 'Reduced Rate'], ['gift', 'A Gift']),
      methods: L2(['check', 'Check'], ['card', 'Card'], ['venmo', 'Venmo'], ['invoice', 'Invoice']),
      yesHow: L2(['aloud', 'Said Yes Aloud'], ['signed', 'Signed Here'], ['text', 'Replied by Text'], ['email', 'Replied by Email']),
      signWays: L2(['here', 'Sign Here'], ['send', 'Send to Sign'])
    },
    payRules: ['Ceremonies: a 50% deposit holds the date. The balance is due the day before.', 'Sessions: paid at the time of each session.', 'Packages: paid up front.',
      'Travel: no fee in St. Cloud, Sartell, Sauk Rapids, and Waite Park. Beyond that, the IRS standard mileage rate, round trip from St. Cloud.',
      'Funerals and end-of-life work never carry a cancellation fee.'],
    included: ''
  },
  privacyNotice: [
    {h: 'What We Keep', p: "Your names, phone, email, and address. The service we're planning, with dates and places. What we agree on and what you've paid. A few notes that help me serve you well."},
    {h: 'Why', p: 'So I can plan with you, reach you, and keep our agreement clear.'},
    {h: 'Where', p: 'Locked (encrypted) on my device, and in my locked backup. Only my passcode opens it.'},
    {h: 'How Long', p: 'For seven years after our last service (to confirm with our attorney), for business and tax records. Then it is deleted. You can ask to see it any time.'}],
  neverKeep: 'Card numbers, bank numbers, or Social Security numbers. Health details only when a service needs them.',
  // GWG BLD 769: the writing assistant yes, asked once and saved with how and when.
  writingAssistant: {h: 'Writing Help', ask: 'I sometimes use a secure writing assistant to help draft words. Is that all right with you?', sub: 'Their answer is saved with how and when.',
    p: 'With your yes, I sometimes use a secure writing assistant to help draft words, like a eulogy or an obituary. Names are replaced with placeholders, and phone numbers, emails, and addresses are left out.'},
  agreement: {title: 'Service Agreement', intro: 'This agreement puts in writing what we planned together: the services, the price, and what is included, so everyone knows what to expect.',
    promise: 'No surprises: anything new or different is agreed in writing first.',
    dueWording: 'A deposit of [Deposit] holds the date. The balance of [Balance] is due [Due].',
    giftWording: 'Part or all of this service is offered as a gift from Grow With Grounded, shown above.'},
  invoice: {payTo: 'Grow With Grounded LLC', howToPay: 'Pay by check made out to Grow With Grounded LLC, by Venmo, or by card. Questions? Just reply or call.',
    thanks: 'Thank you for trusting Grow With Grounded.', footer: 'Grow With Grounded LLC · growwithgrounded.com'},
  sendWords: {agreement: 'Hi [Name], here is our service agreement for [For]: the services, the price, and what is included. Read it at your own pace. If it all looks right, reply "I agree" with your full name, and that is your signature. Any questions, just ask.\n\n[Chris]',
    invoice: 'Hi [Name], here is your invoice from Grow With Grounded. The total is [Total], and the balance of [Balance] is due [Due]. Thank you.\n\n[Chris]'},
  backup: {cardTitle: 'Back Up Now',
    steps: [{h: 'Tap Back Up Now', p: 'The Field Guide makes one locked backup file of every client file, plan, and note.'},
      {h: 'Save It to Your Cloud Folder', p: 'Save the file to the cloud folder you already use: iCloud Drive, Google Drive, or OneDrive. Your phone or computer asks where to save it.'},
      {h: 'Once a Month, a USB Drive Too', p: 'Optional, and a good second copy to keep in a drawer.'},
      {h: 'Keep Your Passcode Safe', p: 'The backup opens only with your passcode. Keep it somewhere safe and private.'}],
    whySafe: 'The file is locked with your passcode before it ever leaves this device. The cloud only holds scrambled data. Without your passcode, no one at Apple, Google, or Microsoft can read it.'}
};

// The library's key over the built-in words, piece by piece.
let CF = null, CFsrc;
function cfg(){
  const lib = (C.lib && C.lib()) || null, L = (lib && lib.clients) || null;
  if (CF && CFsrc === L) return CF;
  const o = (a, b) => Object.assign({}, a, b && typeof b === 'object' ? b : {});
  const A = (x, d) => Array.isArray(x) && x.length ? x : d;
  const fc = o(DEF.firstConversation, L && L.firstConversation);
  fc.say = o(DEF.firstConversation.say, L && L.firstConversation && L.firstConversation.say);
  fc.policy = A(fc.policy, DEF.firstConversation.policy); fc.questions = A(fc.questions, DEF.firstConversation.questions); fc.how = A(fc.how, DEF.firstConversation.how);
  const li = (L && L.intake) || {};
  const steps = DEF.intake.steps.map(d => { const l = arr(li.steps).find(x => x && x.id === d.id); return l ? Object.assign({}, d, l, {phoneLines: A(l.phoneLines, d.phoneLines)}) : d; });
  const lists = {}; Object.keys(DEF.intake.lists).forEach(k => { lists[k] = A(li.lists && li.lists[k], DEF.intake.lists[k]); });
  CF = {
    full: !!L, fc, steps, lists, payRules: A(li.payRules, DEF.intake.payRules), included: li.included || DEF.intake.included,
    privacyNotice: A(L && L.privacyNotice, DEF.privacyNotice), neverKeep: (L && L.neverKeep) || DEF.neverKeep, writingAssistant: o(DEF.writingAssistant, L && L.writingAssistant),
    agreement: o(DEF.agreement, L && L.agreement), invoice: o(DEF.invoice, L && L.invoice), sendWords: o(DEF.sendWords, L && L.sendWords),
    backup: Object.assign(o(DEF.backup, L && L.backup), {steps: A(L && L.backup && L.backup.steps, DEF.backup.steps)}),
    irsRate: +(L && L.irsRate) > 0 ? +L.irsRate : DEF.irsRate
  };
  CFsrc = L;
  return CF;
}
const STEP = n => cfg().steps[n - 1];
const CNT = 6;

// ---------- the store ----------
function store(){
  const d = D(); if (!d) return {files: [], rem: [], seq: 1000};
  const c = d.cli = d.cli || {};
  c.files = arr(c.files); c.rem = arr(c.rem); c.seq = +c.seq || 1000; c.usb = c.usb || {on: false, last: null};
  return c;
}
const files = () => store().files;
const fileOf = id => files().find(f => f.id === id) || null;
const saved = f => !!f && files().includes(f);
function touch(f){ if (f && saved(f)){ f.u = Date.now(); C.save && C.save(); } pushFam(); }
const me = () => { const n = String(((D() || {}).settings || {}).name || '').trim(); return n.split(/\s+/)[0] || 'Chris'; };
function newFile(){
  return {id: 'cl' + uid(), u: Date.now(), made: today(), stage: 'intake', step: 1,
    c: {first: '', last: '', rel: '', partner: '', phone: '', email: '', addr: '', city: ''},
    sel: {reach: [], times: [], svc: [], faith: [], grace: ['standard'], yesHow: [], signWay: ['here'], method: []}, own: {},
    privacy: {date: today()}, svc: {forWhom: '', date: '', time: '', place: ''}, people: [], items: [], reduce: '', included: cfg().included || '',
    signed: [], sent: null, pays: [], invoices: [], next: [], links: {fw: [], pm: [], wd: []}, pid: null,
    notes: {}, tidy: {}, stars: {}, custom: {}, fq: {}, fileNote: ''};
}
// The file being taken in: a saved file, or the draft that waits for their yes.
const cur = () => (S.intakeId && fileOf(S.intakeId)) || S.draft;
const nameOf = f => [f.c.first, f.c.last].filter(Boolean).join(' ').trim();
const fTitle = f => { const a = nameOf(f), p = (f.c.partner || '').trim(); return (a && p ? a + ' and ' + p : a || p) || 'A New Client'; };
const firstOf = f => (f.c.first || '').trim() || 'there';
const forOf = f => (f.svc.forWhom || '').trim() || fTitle(f);

// Lists: the library's items, then the client's own.
const items = (f, id) => arr(cfg().lists[id]).concat(arr(f && f.own[id]));
const LMAP = {reach: 'reach', times: 'times', svc: 'services', faith: 'faith', grace: 'grace', yesHow: 'yesHow', signWay: 'signWays', method: 'methods'};
const isOn = (f, id, v) => arr(f.sel[id]).includes(v);
const label = (f, id, v) => (items(f, LMAP[id] || id).find(x => x.id === v) || {}).t || v;
const picked = (f, id) => arr(f.sel[id]).map(v => label(f, id, v));
const grace = f => arr(f.sel.grace)[0] || 'standard';

function fill(t, f, x){
  x = x || {};
  const c = f ? calc(f) : null;
  const v = {Name: f ? firstOf(f) : 'there', For: f ? forOf(f) : '', Chris: me(), Total: c ? money(c.total) : '', Deposit: c ? money(c.deposit) : '', Balance: c ? money(c.balanceDue) : '', Due: f ? dueText(f) : 'the day before'};
  return String(t || '').replace(/\[(Name|For|Chris|Total|Deposit|Balance|Due)\]/g, (m, k) => x[k] != null ? x[k] : v[k] != null ? v[k] : m);
}

// ---------- rates from the Staff services library ----------
function irs(){ const r = store().irs; return r && +r.rate > 0 ? +r.rate : cfg().irsRate; }
function kindOf(label){
  const l = String(label || '').toLowerCase();
  if (/grounded marriage|package|sessions\)|five sessions|\d+ sessions/.test(l)) return 'package';
  if (/wedding|funeral|memorial|graveside|committal|elopement|vow renewal|rehearsal|blessing|celebration/.test(l)) return 'ceremony';
  return 'session';
}
function libRates(){
  const lib = (C.lib && C.lib()) || {}, out = [];
  arr(lib.services).forEach(s => arr(s.rates).forEach((r, i) => {
    const lab = String(r[0] || ''), pr = String(r[1] || ''), m = /\$\s*([\d,]+(?:\.\d+)?)/.exec(pr);
    if (!m || /first conversation/i.test(lab)) return;
    const unit = pr.slice(m.index + m[0].length).trim().replace(/^per\s+/i, 'per ');
    out.push({lid: s.id + '.' + i, svc: s.id, group: s.short || s.title || s.id, name: lab, kind: kindOf(lab), rate: +m[1].replace(/,/g, ''), from: /^\s*from/i.test(pr), unit});
  }));
  out.push({lid: 'travel-none', svc: 'travel', group: 'Travel', name: 'No travel fee: St. Cloud, Sartell, Sauk Rapids, or Waite Park', kind: 'nofee', rate: 0, unit: ''});
  out.push({lid: 'travel-miles', svc: 'travel', group: 'Travel', name: 'Travel, round trip from St. Cloud at the IRS standard mileage rate', kind: 'travel', rate: irs(), unit: 'a mile'});
  return out;
}
const KIND = {ceremony: 'Ceremony: 50% deposit, balance the day before', package: 'Package: paid up front', session: 'Session: paid at the time', travel: 'Travel: with the ceremony balance', nofee: 'No travel fee in the St. Cloud area'};
const fixed = it => it.kind === 'nofee';
function calc(f){
  let cer = 0, pkg = 0, ses = 0, trav = 0;
  const rows = arr(f.items).map(it => { const amt = fixed(it) ? 0 : r2((+it.qty || 0) * (+it.rate || 0));
    if (it.kind === 'ceremony') cer += amt; else if (it.kind === 'package') pkg += amt; else if (it.kind === 'travel') trav += amt; else if (it.kind === 'session') ses += amt; return {it, amt}; });
  if (cer) cer += trav; else ses += trav; // travel rides with the ceremony balance, or is paid at the time
  const sub = r2(cer + pkg + ses), g = grace(f);
  const off = g === 'gift' ? sub : g === 'reduced' ? Math.min(sub, Math.max(0, +f.reduce || 0)) : 0;
  let left = off; const cOff = Math.min(cer, left); left -= cOff; const pOff = Math.min(pkg, left); left -= pOff; const sOff = Math.min(ses, left);
  const cerN = r2(cer - cOff), pkgN = r2(pkg - pOff), sesN = r2(ses - sOff), deposit = r2(cerN * 0.5), total = r2(sub - off);
  const received = r2(arr(f.pays).reduce((a, p) => a + (+p.amt || 0), 0));
  return {rows, sub, off, g, total, cer: cerN, pkg: pkgN, ses: sesN, deposit, dueNow: r2(deposit + pkgN), balance: r2(cerN - deposit), received, balanceDue: r2(Math.max(0, total - received))};
}
function dueText(f){ const d = f.svc.date; return d ? nice(addDays(d, -1)) : 'the day before the service'; }
const amtCell = r => fixed(r.it) ? 'No fee' : money(r.amt);
function rowName(it){
  return it.name + (it.kind === 'travel' ? ', ' + (+it.qty || 0) + ' miles round trip at ' + perMile(it.rate) + ' a mile' : it.kind === 'session' && +it.qty > 1 ? ', ' + it.qty + ' sessions' : it.kind !== 'nofee' && +it.qty > 1 ? ', ' + it.qty : '');
}

// ---------- the agreement (one source for the page, the copy that is sent, and the signed record) ----------
function dueLines(f, c){
  const A = cfg().agreement, out = [];
  if (c.cer) out.push(fill(A.dueWording, f, {Deposit: money(c.deposit), Balance: money(c.balance), Due: dueText(f)}));
  if (c.pkg) out.push('Packages, ' + money(c.pkg) + ', are paid up front.');
  if (c.ses) out.push('Sessions are paid at the time of each session' + (c.cer ? '' : ', ' + money(c.ses) + ' in all') + '.');
  if (!c.total && c.sub) out.push('This service is a gift.');
  return out;
}
function agreementParts(f){
  const A = cfg().agreement, c = calc(f), svc = picked(f, 'svc').join(', ') || 'The services below';
  const when = [f.svc.date ? nice(f.svc.date) : '', tm(f.svc.time), f.svc.place].filter(Boolean).join(', ');
  return {A, c, title: A.title || 'Service Agreement', between: 'Between Grow With Grounded LLC and ' + fTitle(f) + '.', intro: fill(A.intro, f),
    forLine: 'For ' + svc + (f.svc.forWhom ? ', for ' + f.svc.forWhom.trim() : '') + (when ? ', ' + when : '') + '.',
    rows: c.rows.map(r => [rowName(r.it), amtCell(r)]), off: c.off ? [c.g === 'gift' ? 'A gift from Grow With Grounded' : 'A reduced rate', money(c.off) + ' off'] : null,
    total: money(c.total), due: dueLines(f, c), included: (f.included || '').trim(), gift: c.off ? fill(A.giftWording, f) : '', promise: fill(A.promise, f)};
}
function agreementText(f){
  const P = agreementParts(f), L = [P.title.toUpperCase(), 'Grow With Grounded LLC · growwithgrounded.com', '', P.between, P.intro, '', P.forLine, '', 'SERVICES AND PRICE'];
  P.rows.forEach(r => L.push('* ' + r[0] + ': ' + r[1])); if (P.off) L.push('* ' + P.off[0] + ': ' + P.off[1]);
  L.push('Agreed total: ' + P.total, '', "WHEN IT'S DUE", ...(P.due.length ? P.due : ['Nothing is due.']));
  if (P.included) L.push('', "WHAT'S INCLUDED", P.included);
  if (P.gift) L.push('', P.gift);
  L.push('', 'OUR PROMISE', P.promise);
  return L.join('\n');
}
function agreementHTML(f){
  const P = agreementParts(f);
  return `<div class="cl-paper"><div class="cl-ph"><div><h3>${esc(P.title)}</h3><div class="cl-site">Grow With Grounded LLC · growwithgrounded.com</div></div><div class="cl-meta">${esc(nice(today()))}</div></div>
    <p><b>${esc(P.between)}</b> ${esc(P.intro)}</p><p>${esc(P.forLine)}</p>
    <h4>Services and Price</h4><div class="cl-tw"><table class="cl-tbl"><thead><tr><th>Service</th><th class="r">Amount</th></tr></thead><tbody>
    ${P.rows.map(r => `<tr><td>${esc(r[0])}</td><td class="r">${esc(r[1])}</td></tr>`).join('') || '<tr><td colspan="2">Services to add in Step 4.</td></tr>'}${P.off ? `<tr><td>${esc(P.off[0])}</td><td class="r">${esc(P.off[1])}</td></tr>` : ''}</tbody>
    <tfoot><tr><td>Agreed total</td><td class="r">${esc(P.total)}</td></tr></tfoot></table></div>
    <h4>When It's Due</h4><p>${esc(P.due.join(' ') || 'Nothing is due.')}</p>
    ${P.included ? `<h4>What's Included</h4><p>${esc(P.included)}</p>` : ''}${P.gift ? `<p>${esc(P.gift)}</p>` : ''}
    <h4>Our Promise</h4><p>${esc(P.promise)}</p></div>`;
}
const lastSigned = f => arr(f.signed)[f.signed.length - 1] || null;
const isSigned = f => !!lastSigned(f);
const changedSince = f => { const s = lastSigned(f); return !!s && s.text !== agreementText(f); };
const HOW = {here: 'Signed here', send: 'Sent to sign, accepted by reply'};
function signedHTML(s, big){
  return `<div class="cl-paper cl-signed"><div class="cl-words${big ? ' big' : ''}">${esc(s.text)}</div>
    <div class="cl-sigrow">${s.sig ? `<img src="${esc(s.sig)}" alt="Signature of ${esc(s.name || 'the client')}">` : ''}
    <div><b>${s.way === 'send' ? 'Accepted by' : 'Signed by'}: ${esc(s.name || '')}</b><br>${esc(nice(s.date))}${s.way === 'send' && s.reply ? `<br><span class="muted">Their reply: "${esc(s.reply)}"</span>` : ''}<br><span class="muted">${esc(HOW[s.way] || '')}${s.sig ? ', finger signature' : s.way === 'here' ? ', typed name' : ''}</span></div></div></div>`;
}

// ---------- small builders (the Farewell Planning Session's look) ----------
const fk = k => ` data-fk="${esc(k)}"`;
function chips(f, id, single){
  return `<div class="fw-chips" role="group" aria-label="${esc(id)}">${items(f, LMAP[id] || id).map(o => `<button type="button" class="chip" data-cla="chip" data-clv="${esc(id + '|' + o.id)}"${single ? ' data-cls="1"' : ''} aria-pressed="${isOn(f, id, o.id)}"${fk('c|' + id + '|' + o.id)}>${esc(o.t)}</button>`).join('')}</div>`;
}
function addOwn(id, ph){
  return `<div class="fw-add"><input type="text" data-clown="${esc(id)}" aria-label="Add your own" placeholder="${esc(ph || 'Something else? Type it here')}" autocomplete="off"><button type="button" class="btn btn-line btn-sm" data-cla="own" data-clv="${esc(id)}"${fk('own|' + id)}>Add Your Own</button></div>`;
}
function note(f, sid){
  const t = !!f.tidy[sid];
  return `<div class="fw-note"><label class="f" for="cl-n-${sid}">Quick Note</label><textarea id="cl-n-${sid}" rows="2" data-cli="notes.${sid}" placeholder="A few words. Tidy them later.">${esc(f.notes[sid] || '')}</textarea>
    <button type="button" class="fw-tidy" data-cla="tidy" data-clv="${sid}" aria-pressed="${t}"${fk('td|' + sid)}>${t ? 'Tidy Up Later: Marked' : 'Tidy Up Later'}</button></div>`;
}
function custom(f, sid){
  return `<details class="fw-custom"${f.custom[sid] ? ' open' : ''}><summary>Your Custom Details</summary><textarea rows="3" aria-label="Your custom details" data-cli="custom.${sid}" placeholder="Anything else for this step, in your own words.">${esc(f.custom[sid] || '')}</textarea></details>`;
}
function star(f, key, lab){
  const on = !!f.stars[key];
  return `<button type="button" class="fw-star" data-cla="star" data-clv="${esc(key)}" data-cll="${esc(lab)}" aria-pressed="${on}"${fk('st|' + key)}><span aria-hidden="true">${on ? '&#9733;' : '&#9734;'}</span> Come Back To This</button>`;
}
function blk(f, title, key, inner, sub){
  return `<section class="fw-blk"><div class="fw-blk-h"><h3>${esc(title)}</h3>${f && key ? star(f, key, title) : ''}</div>${sub ? `<p class="fw-sub">${esc(sub)}</p>` : ''}${inner}</section>`;
}
function fld(path, lab, val, type, ph, attr){
  const id = 'cl-' + path.replace(/[^a-z0-9]+/gi, '-');
  return `<div class="fw-fld"><label class="f" for="${id}">${esc(lab)}</label><input id="${id}" type="${type || 'text'}" ${attr || 'data-cli'}="${esc(path)}" value="${esc(val == null ? '' : val)}"${ph ? ` placeholder="${esc(ph)}"` : ''}${type === 'number' ? ' min="0" step="0.01" inputmode="decimal"' : ''} autocomplete="off"></div>`;
}
const sayBox = (t, lab, f) => t ? `<div class="fw-say"><b>${esc(lab || 'Say')}</b><q>${esc(fill(t, f))}</q></div>` : '';
const lockNote = t => `<div class="cl-lock" role="note"><span aria-hidden="true">&#128274;</span><span>${esc(t)}</span></div>`;

// ---------- copy, text, email ----------
async function copyText(t, msg){
  API.lastCopy = t;
  try { await navigator.clipboard.writeText(t); toast(msg || 'Copied.'); }
  catch (e){ const a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (x) {} a.remove(); toast(msg || 'Copied.'); }
}
function openLink(u){
  API.lastLink = u; if (API.noOpen) return;
  const a = document.createElement('a'); a.href = u; a.rel = 'noopener'; document.body.appendChild(a); a.click(); setTimeout(() => a.remove(), 100);
}
const digits = s => String(s || '').replace(/[^\d+]/g, '');
const smsURL = (to, body) => 'sms:' + digits(to) + '?&body=' + encodeURIComponent(body);
const mailURL = (to, subj, body) => 'mailto:' + encodeURIComponent(String(to || '').trim()) + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);

// ---------- First Conversation ----------
const fmtClock = ms => { const s = Math.floor(ms / 1000); return pad(Math.floor(s / 60)) + ':' + pad(s % 60); };
const elapsed = () => S.timer.el + (S.timer.on ? Date.now() - S.timer.start : 0);
const timerNote = ms => { const m = ms / 60000; return m >= 15 ? 'Fifteen minutes. Time to close gently.' : m >= 10 ? 'Ten minutes. A good time to start the close.' : 'Aim for 10 to 15 minutes at most.'; };
function vFirst(){
  const F = cfg().fc;
  return `<div class="fw-kick">Before Any Agreement</div><h2 style="margin:2px 0 10px">${esc(F.title)}</h2>
  <div class="cl-policy" role="note"><span class="pill gold">Our internal policy</span><h3>At No Charge, 10 to 15 Minutes</h3><ul>${F.policy.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
  ${blk(null, 'Timer', '', `<div class="cl-timer"><span class="cl-clock" id="cl-clock">${fmtClock(elapsed())}</span><div class="row"><button type="button" class="btn btn-gold btn-sm" data-cla="timer" data-clv="go"${fk('tm|go')}>${S.timer.on ? 'Pause' : 'Start'}</button><button type="button" class="btn btn-line btn-sm" data-cla="timer" data-clv="reset"${fk('tm|reset')}>Reset</button></div><span class="muted" id="cl-tnote">${esc(timerNote(elapsed()))}</span></div>`)}
  ${sayBox(F.say.open)}
  ${blk(null, 'A Few Gentle Questions', '', `<div class="fw-prompts">${F.questions.map((q, i) => `<div class="fw-pcard"><label class="f" for="cl-fq-${i}" style="margin:0">${esc(q)}</label><textarea id="cl-fq-${i}" rows="2" data-clfc="q.${i}" placeholder="A few words">${esc(S.fc.q[i] || '')}</textarea></div>`).join('')}</div>
    <div class="fw-note"><label class="f" for="cl-fc-n">Quick Note</label><textarea id="cl-fc-n" rows="2" data-clfc="notes" placeholder="A few words. They move into the file if they say yes.">${esc(S.fc.notes)}</textarea></div>`, 'Listen more than you talk. These notes stay on this screen until they say yes and the privacy notice is read.')}
  ${blk(null, 'How Grounded Works', '', `<ul class="cl-how">${F.how.map(h => `<li>${esc(h)}</li>`).join('')}</ul>${sayBox(F.say.deep, 'If they start to go deep')}`, 'Share these in your own words.')}
  ${sayBox(F.say.close, 'The close')}
  <div class="cl-yes"><button type="button" class="btn btn-gold" data-cla="fc-yes"${fk('fc-yes')}>They Said Yes: Start Intake</button><button type="button" class="btn btn-line" data-cla="fc-think" aria-expanded="${S.fc.think}"${fk('fc-think')}>They'd Like Time to Think</button></div>
  ${S.fc.think ? `<div class="fw-blk" style="margin-top:12px"><h3 style="margin:0 0 4px">A Gentle Reminder</h3><p class="fw-sub">Saves only a first name or initials and a date, so you remember to check in kindly. It shows on Home.</p>
    <div class="fw-g2">${fld('name', 'First name or initials', S.fc.name, 'text', 'Walt, or W. L.', 'data-clfc')}${fld('date', 'Check in on', S.fc.date || addDays(today(), 4), 'date', '', 'data-clfc')}</div>
    <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold btn-sm" data-cla="rem-add"${fk('rem-add')}>Add the Reminder</button></div></div>` : ''}
  ${remList()}`;
}
function remList(){
  const R = store().rem.filter(r => !r.done).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  if (!R.length) return '';
  return `<div class="fw-blk" style="margin-top:14px"><h3 style="margin:0 0 6px">Gentle Check-ins</h3>${R.map(r => `<div class="fw-list-r"><div class="m"><b>${esc(r.name)}</b><br><small class="muted">${esc(nice(r.date))}${r.date < today() ? ' <span class="pill warn">Today or Before</span>' : ''}</small></div><div class="row"><button type="button" class="btn btn-line btn-sm" data-cla="rem-done" data-clv="${esc(r.id)}">Done</button></div></div>`).join('')}</div>`;
}

// ---------- Intake: Chris's View, one function per step ----------
const noticeItems = () => { const N = arr(cfg().privacyNotice).filter(n => n && n.h); return N.some(n => /writ/i.test(n.h)) ? N : N.concat([{h: cfg().writingAssistant.h, p: cfg().writingAssistant.p}]); };
const WA_HOW = [['aloud', 'Said Yes Aloud'], ['text', 'Replied by Text'], ['email', 'Replied by Email']];
function waBlk(f){ const W = cfg().writingAssistant, w = (f.privacy || {}).wa || {};
  return blk(f, W.h || 'Writing Help', 'wa', `<div class="fw-say" style="margin-top:0"><b>Ask</b><q>${esc(W.ask)}</q></div>
    <div class="fw-chips" role="group" aria-label="Their answer">${[['yes', 'Yes'], ['no', 'No, Thank You']].map(([k, l]) => `<button type="button" class="chip" data-cla="wa" data-clv="${k}" aria-pressed="${w.ans === k}"${fk('wa|' + k)}>${l}</button>`).join('')}</div>
    <div class="fw-who"><span class="fw-lbl">How</span>${WA_HOW.map(([k, l]) => `<button type="button" class="chip fw-sm" data-cla="wa-how" data-clv="${k}" aria-pressed="${w.how === k}"${fk('wah|' + k)}>${l}</button>`).join('')}</div>
    ${w.ans ? `<p class="cl-ok" role="status">Writing help: ${w.ans === 'yes' ? 'yes' : 'no'}${w.how ? ', ' + esc((WA_HOW.find(x => x[0] === w.how) || ['', w.how])[1].toLowerCase()) : ''}, ${esc(nice(w.date))}. Saved with the file.</p>` : ''}`, W.sub); }
const NOTICE = big => `<div class="cl-notice${big ? ' big' : ''}">${noticeItems().map(n => `<div class="cl-ni"><h4>${esc(n.h)}</h4><p>${esc(n.p)}</p></div>`).join('')}<div class="cl-ni never"><h4>What We Never Keep</h4><p>${esc(cfg().neverKeep)}</p></div></div>`;
const V = {};
V[1] = f => sayBox(STEP(1).say, '', f) +
  (saved(f) ? '' : `<div class="cl-banner" role="note">Nothing is saved yet. Record their yes below, and the file is saved, encrypted on this device.</div>`) +
  blk(f, 'Privacy Notice', 'notice', NOTICE(false), 'Read it together, eye to eye.') +
  blk(f, 'Their Yes', 'yes', chips(f, 'yesHow', true) + `<div class="fw-g2" style="margin-top:6px">${fld('privacy.date', 'Date', f.privacy.date || today(), 'date')}</div>
    ${f.privacy.how ? `<p class="cl-ok" role="status">Their yes: ${esc(label(f, 'yesHow', f.privacy.how))}, ${esc(nice(f.privacy.date))}. Saved with the file.</p>` : ''}`, 'How and when they gave it is saved with the file.') +
  waBlk(f) + note(f, 'privacy');
V[2] = f => sayBox(STEP(2).say, '', f) +
  blk(f, 'Contact', 'contact', `<div class="fw-g3">${fld('c.first', 'First name', f.c.first)}${fld('c.last', 'Last name', f.c.last)}${fld('c.rel', 'Their part in this', f.c.rel, 'text', 'Husband of Peg, the couple, ...')}</div>
    <div class="fw-g2">${fld('c.partner', 'Partner (for a couple)', f.c.partner, 'text', 'Full name')}${fld('c.phone', 'Phone', f.c.phone, 'tel')}${fld('c.email', 'Email', f.c.email, 'email')}${fld('c.addr', 'Street address', f.c.addr)}${fld('c.city', 'City, state, ZIP', f.c.city)}</div>`) +
  blk(f, 'How They Like to Be Reached', 'reach', chips(f, 'reach') + `<label class="f">Best times</label>` + chips(f, 'times', true) + addOwn('reach', 'Another way: through a daughter, a church office...')) +
  custom(f, 'who') + note(f, 'who');
V[3] = f => sayBox(STEP(3).say, '', f) +
  blk(f, 'Service Type', 'svc', chips(f, 'svc') + addOwn('svc', 'Another service'), 'Tap all that apply.') +
  blk(f, 'When and Where', 'when', `<div class="fw-g2">${fld('svc.forWhom', 'For whom', f.svc.forWhom, 'text', 'Margaret "Peg" Larson, or the couple')}${fld('svc.place', 'Place', f.svc.place)}${fld('svc.date', 'Date', f.svc.date, 'date')}${fld('svc.time', 'Time', f.svc.time, 'time')}</div>`) +
  blk(f, 'People Involved', 'people', `<div class="fw-lines">${f.people.map((p, i) => `<div class="cl-pline"><input type="text" data-cli="people.${i}.name" value="${esc(p.name)}" aria-label="Name" placeholder="Name"><input type="text" data-cli="people.${i}.role" value="${esc(p.role)}" aria-label="Their part" placeholder="Their part"><input type="tel" data-cli="people.${i}.phone" value="${esc(p.phone)}" aria-label="Phone" placeholder="Phone"><button type="button" class="btn btn-line btn-sm" data-cla="pp-del" data-clv="${i}">Remove</button></div>`).join('')}</div>` + addOwn('people', "Add a person's name"), 'Family, clergy, a funeral home or venue: name, their part, phone.') +
  blk(f, 'How Faith Shows Up', 'faith', chips(f, 'faith', true), 'The client chooses. All faith traditions and everything in-between.') +
  custom(f, 'service') + note(f, 'service');
function itemRows(f){
  const c = calc(f);
  return `<div class="cl-ihead" aria-hidden="true"><span>Service</span><span>Qty</span><span>Rate</span><span class="r">Amount</span><span></span></div><div class="cl-items">${c.rows.map((r, i) => `<div class="cl-irow"><span class="cl-nm"><b>${esc(r.it.name)}</b><small>${esc(KIND[r.it.kind] || '')}${r.it.unit ? ', ' + esc(r.it.unit) : ''}${r.it.from ? ', library rate from ' + money(r.it.base) : ''}</small></span>
    ${fixed(r.it) ? '<span></span><span></span>' : `<label class="cl-mini"><span>${r.it.kind === 'travel' ? 'Miles' : 'Qty'}</span><input type="number" min="0" step="1" inputmode="decimal" data-clit="${i}|qty" value="${esc(r.it.qty)}" aria-label="Quantity for ${esc(r.it.name)}"></label><label class="cl-mini"><span>Rate</span><input type="number" min="0" step="0.01" inputmode="decimal" data-clit="${i}|rate" value="${esc(r.it.rate)}" aria-label="Rate for ${esc(r.it.name)}"></label>`}
    <span class="cl-amt r" data-clamt="${i}">${amtCell(r)}</span><button type="button" class="btn btn-line btn-sm" data-cla="it-del" data-clv="${i}"${fk('itd|' + i)}>Remove</button></div>`).join('') || '<p class="muted" style="margin:6px 0">No services yet. Add them from the library below.</p>'}</div>`;
}
function totalsHTML(f){
  const c = calc(f), li = (a, b, cls) => `<div class="cl-tr${cls ? ' ' + cls : ''}"><span>${a}</span><span>${b}</span></div>`;
  return li('Services', money(c.sub)) + (c.off ? li(c.g === 'gift' ? 'A gift from Grow With Grounded' : 'A reduced rate', money(c.off) + ' off') : '') + li('Agreed total', '<b>' + money(c.total) + '</b>', 'big') +
    (c.cer ? li('Deposit to hold the date, 50%', money(c.deposit)) : '') + (c.pkg ? li('Packages, paid up front', money(c.pkg)) : '') + (c.ses ? li('Sessions, paid at each session', money(c.ses)) : '') +
    li('Due at signing', money(c.dueNow)) + (c.cer ? li('Balance due ' + esc(dueText(f)), money(c.balance)) : '');
}
function libPicker(f){
  const R = libRates(), want = new Set(picked(f, 'svc').length ? arr(f.sel.svc).map(v => (items(f, 'services').find(x => x.id === v) || {}).svc).filter(Boolean) : []);
  const groups = []; R.forEach(r => { let g = groups.find(x => x.k === r.svc); if (!g){ g = {k: r.svc, t: r.group, L: []}; groups.push(g); } g.L.push(r); });
  groups.sort((a, b) => (want.has(b.k) ? 1 : 0) - (want.has(a.k) ? 1 : 0));
  const opt = r => `<option value="${esc(r.lid)}">${esc(r.name)}${r.kind === 'nofee' ? ' (no fee)' : r.kind === 'travel' ? ' (' + perMile(r.rate) + ' a mile)' : ' (' + (r.from ? 'from ' : '') + money(r.rate) + (r.unit ? ' ' + r.unit : '') + ')'}</option>`;
  return `<div class="cl-addlib"><select id="cl-libpick" aria-label="Add from the services library">${groups.map(g => `<optgroup label="${esc(g.t)}">${g.L.map(opt).join('')}</optgroup>`).join('')}</select><button type="button" class="btn btn-line btn-sm" data-cla="lib-add"${fk('lib-add')}>Add From Library</button></div>
    <div class="cl-addlib"><input type="text" id="cl-own-name" placeholder="Your own line, for example a second visit" aria-label="Your own line" value="${esc(S.own)}"><select id="cl-own-kind" aria-label="Kind">${[['ceremony', 'Ceremony'], ['package', 'Package'], ['session', 'Session']].map(([k, l]) => `<option value="${k}"${S.ownKind === k ? ' selected' : ''}>${l}</option>`).join('')}</select><button type="button" class="btn btn-line btn-sm" data-cla="own-line"${fk('own-line')}>Add Your Own Line</button></div>`;
}
V[4] = f => sayBox(STEP(4).say, '', f) +
  (isSigned(f) ? `<div class="cl-banner" role="note">Signed ${esc(nice(lastSigned(f).date))}. Anything new or different is agreed in writing first: change it here, then sign again in Step 5.</div>` : '') +
  blk(f, 'Services and Price', 'price', itemRows(f) + libPicker(f) + `<div class="cl-totals" id="cl-totals">${totalsHTML(f)}</div>`, STEP(4).sub) +
  blk(f, 'A Gift or Reduced Rate', 'grace', chips(f, 'grace', true) + (grace(f) === 'reduced' ? `<div class="fw-g2" style="margin-top:6px">${fld('reduce', 'Amount off', f.reduce, 'number')}</div>` : ''), 'For a family in a hard season. Shown on the agreement plainly.') +
  blk(f, 'How Payment Works', '', `<ul class="cl-how">${cfg().payRules.map(x => `<li>${esc(x)}</li>`).join('')}</ul><p class="fw-sub">Travel rate: ${perMile(irs())} a mile, the IRS standard mileage rate${isFounder() ? ' (update it under Client Files)' : ''}.</p>`) +
  note(f, 'price');
function sigPad(f){
  return `<div class="cl-signwrap"><div class="fw-g2">${fld('sg.typed', 'Type your full name', f.sg && f.sg.typed, 'text', '', 'data-cli')}${fld('sg.date', 'Date', (f.sg && f.sg.date) || today(), 'date')}</div>
    <div class="spread" style="margin-top:10px"><span class="fw-lbl">Or sign with your finger</span><button type="button" class="btn btn-line btn-sm" data-cla="sig-clear"${fk('sig-clear')}>Clear</button></div>
    <canvas class="cl-sigbox" id="cl-sig" aria-label="Signature box: draw with a finger or a mouse"></canvas>
    <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold" data-cla="sign"${fk('sign')}>Sign the Agreement</button></div></div>`;
}
function sendBox(f){
  const s = f.sent, words = sendWords(f), fresh = s && s.text === agreementText(f);
  return `<div class="cl-signwrap"><span class="fw-lbl">Ready-to-send words, with the agreement</span><div class="fw-words cl-sendw">${esc(words)}</div>
    <div class="row" style="margin-top:10px"><button type="button" class="btn btn-line btn-sm" data-cla="send" data-clv="copy">Copy</button><button type="button" class="btn btn-line btn-sm" data-cla="send" data-clv="text">Text</button><button type="button" class="btn btn-line btn-sm" data-cla="send" data-clv="email">Email</button></div>
    ${s ? `<p class="fw-sub">${fresh ? 'Sent' : 'Last sent'} ${esc(nice(s.date))}${fresh ? '.' : '. The agreement changed since then; send it again.'}</p>` : ''}
    <details class="fw-load"${s && fresh ? ' open' : ''}><summary>Load Their Reply</summary><p class="fw-sub">Paste their text or email reply. It is saved with the exact agreement that was sent.</p>
      <textarea id="cl-reply" rows="3" aria-label="Their reply" placeholder="I agree. Walter J. Larson"></textarea>
      <div class="fw-g2">${fld('rp.name', 'Their full name', (f.rp && f.rp.name) || nameOf(f), 'text', '', 'data-cli')}${fld('rp.date', 'Date they replied', (f.rp && f.rp.date) || today(), 'date')}</div>
      <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold btn-sm" data-cla="accept"${fk('accept')}>Record Their Acceptance</button></div></details></div>`;
}
const sendWords = f => fill(cfg().sendWords.agreement, f) + '\n\n' + agreementText(f);
V[5] = f => {
  const way = arr(f.sel.signWay)[0] || 'here', s = lastSigned(f);
  return sayBox(STEP(5).say, '', f) + `<div id="cl-paper">${agreementHTML(f)}</div><div style="height:14px"></div>` +
  blk(f, "What's Included", 'included', `<textarea data-cli="included" rows="3" aria-label="What is included" placeholder="Planning together, the order of service, a printed copy to keep...">${esc(f.included || '')}</textarea>`) +
  (s ? `<div class="cl-okcard" role="status"><b>${s.way === 'send' ? 'Accepted' : 'Signed'} ${esc(nice(s.date))} by ${esc(s.name)}</b><p>${changedSince(f) ? 'The agreement changed after this. Sign again so the new wording is agreed in writing.' : 'The exact wording is saved in the file. Both of you get a copy.'}</p><div class="row"><button type="button" class="btn btn-line btn-sm" data-cla="ag-view" data-clv="${esc(f.id)}">View and Print the Signed Copy</button></div></div>` : '') +
  ((!s || changedSince(f)) ? blk(f, 'Two Ways to Sign', 'sign', chips(f, 'signWay', true) + (way === 'here' ? `<p class="fw-sub" style="margin-top:10px">Turn the screen toward them, or use Family View Here. They read it, then type a name or sign with a finger.</p>` + sigPad(f) : sendBox(f))) : '') +
  note(f, 'agree');
};
function nextDefaults(f){
  const c = calc(f), L = ['Send the signed agreement to ' + firstOf(f)];
  if (c.cer && f.svc.date) L.push('Balance reminder on ' + nice(addDays(f.svc.date, -3)));
  if (arr(f.sel.svc).some(v => linkOf(f, v) === 'farewell')) L.push('Start the Farewell Plan together');
  if (arr(f.sel.svc).some(v => linkOf(f, v) === 'premarital')) L.push('Schedule the first session of The Grounded Marriage');
  if (arr(f.sel.svc).some(v => linkOf(f, v) === 'wedding')) L.push('Start the Wedding Plan together');
  return L.map(t => ({t, done: false}));
}
const linkOf = (f, v) => (items(f, 'services').find(x => x.id === v) || {}).link || '';
V[6] = f => {
  const c = calc(f), d = S.dep, fw = arr(f.sel.svc).some(v => linkOf(f, v) === 'farewell'), pm = arr(f.sel.svc).some(v => linkOf(f, v) === 'premarital');
  if (!f.next.length && saved(f)) f.next = nextDefaults(f);
  const fwL = linkedPlans(f), pmL = linkedCouples(f), wd = arr(f.sel.svc).some(v => linkOf(f, v) === 'wedding'), wdL = linkedWeds(f);
  return sayBox(STEP(6).say, '', f) +
  blk(f, 'Record the Deposit', 'dep', `<div class="fw-g3">${fld('amt', 'Amount', d.amt != null ? d.amt : (c.dueNow || ''), 'number', '', 'data-cldep')}${fld('date', 'Date', d.date || today(), 'date', '', 'data-cldep')}${fld('ref', 'Check number or a short note', d.ref || '', 'text', 'Check #2147', 'data-cldep')}</div>
    <label class="f">Method</label>${chips(f, 'method', true)}<p class="fw-sub">Never write down card or bank numbers here.</p>
    <div class="row"><button type="button" class="btn btn-gold btn-sm" data-cla="dep"${fk('dep')}>Record the Deposit</button></div>
    ${f.pays.length ? `<p class="cl-ok" role="status">Received so far: ${money(c.received)}. ${f.pays.map(p => esc(money(p.amt) + ', ' + nice(p.date) + (p.method ? ', ' + p.method : ''))).join('; ')}.</p>` : ''}`, 'Due at signing: ' + money(c.dueNow) + '.') +
  blk(f, 'Next Steps', 'next', `${f.next.map((k, i) => `<label class="fw-ck"><input type="checkbox" data-clc="next.${i}.done"${k.done ? ' checked' : ''}><span>${esc(k.t)}</span></label>`).join('')}` + addOwn('next', 'Add a next step')) +
  blk(f, 'Start the Work', '', `<div class="row">${fw || fwL.length ? (fwL.length ? fwL.map(p => `<button type="button" class="btn btn-line" data-cla="fw-open" data-clv="${esc(p.id)}">Open the Farewell Plan</button>`).join('') : `<button type="button" class="btn btn-gold" data-cla="fw-new"${fk('fw-new')}>Start the Farewell Plan</button>`) : ''}
    ${pm || pmL.length ? (pmL.length ? pmL.map(x => `<button type="button" class="btn btn-line" data-cla="pm-open" data-clv="${esc(x.id)}">Open The Grounded Marriage</button>`).join('') : `<button type="button" class="btn btn-gold" data-cla="pm-new"${fk('pm-new')}>Start The Grounded Marriage</button>`) : ''}
    ${wd || wdL.length ? (wdL.length ? wdL.map(p => `<button type="button" class="btn btn-line" data-cla="wd-open" data-clv="${esc(p.id)}">Open the Wedding Plan</button>`).join('') : `<button type="button" class="btn btn-gold" data-cla="wd-new"${fk('wd-new')}>Start the Wedding Plan</button>`) : ''}
    ${!fw && !pm && !wd && !fwL.length && !pmL.length && !wdL.length && !(window.GGRun && saved(f) && GGRun.fileStart(f)) ? '<p class="muted" style="margin:0">Sessions start from the Sessions tab or the client file.</p>' : ''}</div>${window.GGRun && saved(f) ? GGRun.fileStart(f) : '' /* GWG BLD 771 hook */}`, "Opens the linked tool with this client's details filled in.") +
  note(f, 'next') +
  `<div class="row" style="margin-top:6px"><button type="button" class="btn btn-gold" data-cla="finish"${fk('finish')}>Finish the Intake: Open the Client File</button></div>`;
};

// ---------- Family View (its own window, or here to tilt the laptop) ----------
const fChips = (f, id) => `<div class="fw-fchips">${items(f, LMAP[id] || id).map(o => `<span class="fw-fchip${isOn(f, id, o.id) ? ' on' : ''}">${isOn(f, id, o.id) ? '&#10003; ' : ''}${esc(o.t)}</span>`).join('')}</div>`;
const fsec = (h, x) => `<div class="fw-fsec"><h3>${esc(h)}</h3>${x}</div>`;
const flist = rows => `<ul class="fw-flist">${rows.map(r => `<li><span>${r[0]}</span><span>${r[1] || ''}</span></li>`).join('')}</ul>`;
const FV = {};
FV[1] = f => fsec('How We Keep What You Share', NOTICE(true)) + fsec('Is That All Right With You?', fChips(f, 'yesHow')) +
  fsec(cfg().writingAssistant.h || 'Writing Help', `<p class="fw-big">${esc(cfg().writingAssistant.ask)}</p>${((f.privacy || {}).wa || {}).ans ? `<p class="fw-soft">${f.privacy.wa.ans === 'yes' ? '&#10003; Yes' : 'No, thank you'}</p>` : ''}`);
FV[2] = f => fsec("How We'll Reach You", flist([['Name', esc(fTitle(f))], ['Phone', esc(f.c.phone)], ['Email', esc(f.c.email)], ['Address', esc([f.c.addr, f.c.city].filter(Boolean).join(', '))]])) + fsec('Best Ways', fChips(f, 'reach')) + fsec('Best Times', fChips(f, 'times'));
FV[3] = f => fsec("What We're Planning", `<p class="fw-big">${esc(picked(f, 'svc').join(', ') || 'Still choosing')}</p>`) +
  fsec('When and Where', `<p class="fw-big">${esc([f.svc.date ? nice(f.svc.date) : '', tm(f.svc.time)].filter(Boolean).join(', ') || 'To choose together')}${f.svc.place ? `<br><span class="fw-soft">${esc(f.svc.place)}</span>` : ''}</p>`) + fsec('How Faith Shows Up', fChips(f, 'faith'));
FV[4] = f => { const c = calc(f); return fsec('Services and Price', flist(c.rows.map(r => [esc(rowName(r.it)), esc(amtCell(r))]).concat(c.off ? [[c.g === 'gift' ? 'A gift from Grow With Grounded' : 'A reduced rate', money(c.off) + ' off']] : [], [['<b>Total</b>', '<b>' + money(c.total) + '</b>']]))) +
  fsec("When It's Due", flist([].concat(c.cer ? [['Deposit to hold the date', money(c.deposit) + ' today'], ['Balance', money(c.balance) + ', ' + esc(dueText(f))]] : [], c.pkg ? [['Packages', money(c.pkg) + ' today']] : [], c.ses ? [['Sessions', 'At each session']] : []))); };
FV[5] = (f, here) => { const s = lastSigned(f), fresh = s && !changedSince(f);
  return (fresh ? signedHTML(s, true) : agreementHTML(f)) + (fresh ? '' : here && (arr(f.sel.signWay)[0] || 'here') === 'here' ? `<h3 class="cl-fsign">Sign Here</h3>` + sigPad(f) : `<p class="fw-big" style="margin-top:18px">${(arr(f.sel.signWay)[0] || 'here') === 'send' ? "We'll send this to you to read and sign." : 'Sign on the screen with me.'}</p>`); };
FV[6] = f => { const c = calc(f); return fsec('What Happens Next', flist(f.next.map(k => [(k.done ? '&#10003; ' : '') + esc(k.t), k.done ? 'Done' : '']))) + fsec('Received', `<p class="fw-big">${c.received ? money(c.received) + ', thank you' : 'Nothing yet'}</p>`); };
function famBody(f, here){
  const n = S.step, st = STEP(n);
  return `<div class="fw-fam"><p class="fw-fsub">For ${esc(fTitle(f))}</p><h2>${esc(st.title)}</h2>${FV[n](f, here)}</div>`;
}
const FCSS = `:root{--bg:#F6F0E4;--card:#FFFCF6;--ink:#2A1C12;--soft:#6B5A4D;--line:#DDD0B8;--gold:#8B5E1A;--on:#2E2118;--onink:#F4EBDA;}
@media (prefers-color-scheme: dark){:root{--bg:#18120D;--card:#231A13;--ink:#F2EADC;--soft:#BFB09A;--line:#3A2E23;--gold:#D9A847;--on:#D9A847;--onink:#1A130D;}}
*{box-sizing:border-box;}html,body{margin:0;}body{background:var(--bg);color:var(--ink);font-family:Barlow,Helvetica,Arial,sans-serif;font-size:22px;line-height:1.45;}
main{max-width:980px;margin:0 auto;padding:36px 28px 60px;}
.fw-fam h2{font-family:"Cormorant Garamond",Georgia,serif;font-size:2.4em;line-height:1.1;margin:.1em 0 .5em;}
.fw-fsub{font-family:"Barlow Condensed",sans-serif;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin:0;font-size:.8em;}
.fw-fsec,.cl-paper{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:18px 22px;margin:0 0 16px;}
.fw-fsec h3,.cl-paper h3{font-family:"Cormorant Garamond",Georgia,serif;font-size:1.35em;margin:0 0 10px;}.cl-paper h4{margin:14px 0 4px;}.cl-paper p{margin:4px 0;}
.cl-ph{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;border-bottom:1px solid var(--line);margin-bottom:10px;}.cl-site,.cl-meta{color:var(--soft);font-size:.7em;}
.cl-tw{overflow-x:auto;}.cl-tbl{width:100%;border-collapse:collapse;}.cl-tbl td,.cl-tbl th{border-top:1px solid var(--line);padding:8px 4px;text-align:left;vertical-align:top;}.cl-tbl .r{text-align:right;white-space:nowrap;}.cl-tbl tfoot td{font-weight:700;}
.cl-words{white-space:pre-wrap;overflow-wrap:anywhere;}.cl-sigrow{display:flex;gap:16px;align-items:center;flex-wrap:wrap;border-top:1px solid var(--line);margin-top:12px;padding-top:12px;}.cl-sigrow img{max-width:260px;width:100%;height:auto;background:#fff;border-radius:8px;}
.cl-notice{display:grid;gap:12px;}.cl-ni h4{margin:0 0 4px;font-size:1.1em;}.cl-ni p{margin:0;}.cl-ni.never{border-left:4px solid var(--gold);padding-left:12px;}
.fw-fchips{display:flex;flex-wrap:wrap;gap:10px;}.fw-fchip{border:1.5px solid var(--line);border-radius:30px;padding:10px 18px;color:var(--soft);}
.fw-fchip.on{background:var(--on);border-color:var(--on);color:var(--onink);font-weight:600;}
.fw-flist{list-style:none;margin:0;padding:0;}.fw-flist li{display:flex;justify-content:space-between;gap:16px;border-top:1px solid var(--line);padding:9px 0;}.fw-flist li:first-child{border-top:0;}
.fw-flist li span:last-child{color:var(--soft);text-align:right;}
.fw-big{font-size:1.2em;margin:0;}.fw-soft,.muted{color:var(--soft);font-size:.8em;}
.fw-top{display:flex;justify-content:space-between;align-items:center;gap:12px;color:var(--soft);font-size:.7em;border-bottom:1px solid var(--line);padding:10px 28px;}
@media(max-width:600px){body{font-size:18px;}main{padding:20px 16px 40px;}.fw-flist li{flex-wrap:wrap;}}`;
let famWin = null, famT = null;
function famPage(f){
  const fonts = new URL('/fonts/fonts.css', location.href).href;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Family View</title><link rel="stylesheet" href="${fonts}"><style>${FCSS}</style></head><body><div class="fw-top"><span>Grow With Grounded</span><span>Family View</span></div><main id="fv">${famBody(f, false)}</main></body></html>`;
}
function openFam(){
  const f = cur(); if (!f) return;
  let w = null; try { w = window.open('', 'gg-cl-family', 'width=1100,height=820'); } catch (e) { w = null; }
  if (!w){ toast('Your browser kept the window from opening. Showing the Family View here instead.'); S.mode = 'family'; rerender(true); return; }
  famWin = w; API.famWin = w;
  try { if (!w.document.getElementById('fv')){ w.document.open(); w.document.write(famPage(f)); w.document.close(); } else pushFam(true); w.focus(); } catch (e) {}
}
function pushFam(now){
  clearTimeout(famT);
  const go = () => { const f = cur(); if (!f || !famWin || famWin.closed || S.sec !== 'intake') return; try { const el = famWin.document.getElementById('fv'); if (el) el.innerHTML = famBody(f, false); } catch (e) {} };
  if (now) go(); else famT = setTimeout(go, 200);
}

// ---------- Phone Mode ----------
function vPhone(f){
  return `<div class="fw-phone"><div class="fw-ph-h"><span aria-hidden="true">&#9742;</span> Read aloud, one at a time. Pause after each.</div><ol>${arr(STEP(S.step).phoneLines).map(x => `<li><h3>${esc(fill(x[0], f))}</h3><p>${esc(fill(x[1], f))}</p></li>`).join('')}</ol></div>`;
}

// ---------- the Intake page ----------
function cbt(f){
  const ks = Object.keys(f.stars);
  return `<h2>Come Back To This</h2>${ks.length ? `<ul>${ks.map(k => `<li><button type="button" data-cla="step" data-clv="${f.stars[k].step}">&#9733; ${esc(f.stars[k].label)} <span class="muted">(Step ${f.stars[k].step})</span></button></li>`).join('')}</ul>` : '<p class="empty">Tap a star on any step to save it here.</p>'}`;
}
function vIntake(){
  let f = cur();
  if (!f){ S.draft = f = newFile(); S.step = 1; }
  const n = S.step, st = STEP(n), mode = S.mode;
  const body = mode === 'family' ? `<div class="fw-famwrap">${famBody(f, true)}</div>` : mode === 'phone' ? vPhone(f) : V[n](f);
  return `<div class="fw-head"><div style="min-width:0"><div class="eyebrow">Intake Session${saved(f) ? '' : ' · Not Saved Yet'}</div><h1 id="cl-title">${esc(fTitle(f))}</h1></div>
    <div class="fw-modes" role="group" aria-label="View">${[['chris', me() + "'s View"], ['family', 'Family View Here'], ['phone', 'Phone Mode']].map(([k, l]) => `<button type="button" class="chip" data-cla="mode" data-clv="${k}" aria-pressed="${mode === k}"${fk('md|' + k)}>${esc(l)}</button>`).join('')}<button type="button" class="btn btn-gold btn-sm" data-cla="famwin">Open Family View Window</button></div></div>
  <div class="fw-lay"><nav class="fw-rail" aria-label="Steps"><ol>${cfg().steps.map((s, i) => `<li><button type="button" data-cla="step" data-clv="${i + 1}"${n === i + 1 ? ' aria-current="step"' : ''}${fk('rs|' + (i + 1))}><span class="n">${i + 1}</span><span>${esc(s.title)}</span></button></li>`).join('')}</ol><div class="fw-cbt">${cbt(f)}</div></nav>
  <div id="cl-main" style="min-width:0"><div class="fw-kick">Step ${n} of ${CNT}${mode === 'family' ? ' &middot; Family View' : mode === 'phone' ? ' &middot; Phone Mode' : ''}</div><h2 style="margin:2px 0 6px">${esc(st.title)}</h2>
    ${mode === 'family' ? '<p class="fw-sub">This is what they see. For a call, open the Family View Window and share that window by itself on Zoom, Teams, or FaceTime. It follows your taps.</p>' : ''}
    ${body}
    <div class="fw-cbt mob" style="margin-top:16px">${cbt(f)}</div>
    <div class="fw-nav"><button type="button" class="btn btn-line" data-cla="nav" data-clv="-1"${n === 1 ? ' disabled' : ''}${fk('nb')}>&larr; Back</button><button type="button" class="btn btn-gold" data-cla="nav" data-clv="1"${n === CNT ? ' disabled' : ''}${fk('nn')}>Next &rarr;</button></div></div></div>`;
}

// ---------- Client Files ----------
function linkedPlans(f){ const F = window.GGFw && GGFw.plans ? GGFw.plans() : []; return F.filter(p => p.cli === f.id || arr(f.links.fw).includes(p.id)); }
// The Wedding Planning Session (GWG BLD 770, wedding.js).
function linkedWeds(f){ const F = window.GGWed && GGWed.plans ? GGWed.plans() : []; return F.filter(p => p.cli === f.id || arr(f.links.wd).includes(p.id)); }
function linkedCouples(f){ const d = D() || {}; return arr(d.pm && d.pm.couples).filter(c => c.cli === f.id || arr(f.links.pm).includes(c.id)); }
function linkedSessions(f){ const d = D() || {}; return f.pid ? arr(d.sessions).filter(s => s.clientId === f.pid) : []; }
function status(f){
  if (!isSigned(f)) return {t: 'Intake, Step ' + (f.step || 1), ok: false};
  const c = calc(f);
  if (changedSince(f)) return {t: 'Changed: sign again', ok: false};
  if (c.total && c.balanceDue <= 0) return {t: 'Paid in Full', ok: true};
  if (!c.total) return {t: 'A Gift', ok: true};
  return {t: c.cer && f.svc.date ? 'Balance due ' + nice(addDays(f.svc.date, -1)) : 'Balance ' + money(c.balanceDue), ok: false};
}
function vFiles(){
  const f = S.fileId && fileOf(S.fileId);
  if (f) return vFile(f);
  const q = S.q.trim().toLowerCase();
  const L = files().slice().sort((a, b) => (b.u || 0) - (a.u || 0)).filter(x => !q || (fTitle(x) + ' ' + picked(x, 'svc').join(' ') + ' ' + (x.svc.forWhom || '')).toLowerCase().includes(q));
  return `<div class="fw-kick">Paid Services</div><h2 style="margin:2px 0 10px">Client Files</h2>
  ${lockNote('Every file is encrypted on this device and in your locked backup. Only your passcode opens it.')}
  <div class="cl-top"><input type="search" id="cl-q" data-clq="1" aria-label="Search client files" placeholder="Search by name or service" value="${esc(S.q)}"><button type="button" class="btn btn-gold" data-cla="new-intake"${fk('new-intake')}>New Client: Start Intake</button></div>
  <div class="cl-list">${L.length ? L.map(x => { const st = status(x); return `<div class="cl-ccard"><h3>${esc(fTitle(x))}</h3><p>${esc(picked(x, 'svc').join(', ') || 'Service to choose')}</p><p class="muted">${esc([x.svc.date ? nice(x.svc.date) : 'Started ' + nice(x.made), x.svc.forWhom].filter(Boolean).join(' · '))}</p><span class="pill${st.ok ? ' sage' : ' gold'}">${esc(st.t)}</span><div class="row" style="margin-top:8px"><button type="button" class="btn btn-gold btn-sm" data-cla="file" data-clv="${esc(x.id)}">Open File</button></div></div>`; }).join('') : `<p class="muted">${files().length ? 'No files match. Try another name.' : 'Client files start in the Intake Session, once their yes to the privacy notice is recorded.'}</p>`}</div>
  <div class="fw-blk" style="margin-top:16px"><h3 style="margin:0 0 4px">Travel Rate</h3><p class="fw-sub">The IRS standard mileage rate, for travel beyond St. Cloud, Sartell, Sauk Rapids, and Waite Park, round trip from St. Cloud.</p>
    ${isFounder() ? `<div class="cl-addlib"><input type="number" min="0" step="0.001" id="cl-irs" aria-label="Rate a mile" value="${esc(irs())}"><button type="button" class="btn btn-line btn-sm" data-cla="irs">Update the Rate</button></div><p class="fw-sub">Now ${perMile(irs())} a mile. Update it each January when the IRS sets the new rate.${window.GGBooks ? ' The Mileage Log in Books uses this same rate.' : ''}</p>` : `<p style="margin:0"><b>${perMile(irs())} a mile.</b> <span class="muted">The Founder updates it each year.</span></p>`}</div>`;
}
const kv = rows => `<dl class="cl-kv">${rows.filter(r => r[1]).map(r => `<dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd>`).join('')}</dl>`;
function invoiceHTML(f, v){
  const I = cfg().invoice;
  return `<div class="cl-paper"><div class="cl-ph"><div><h3>${esc(I.payTo)}</h3><div class="cl-site">growwithgrounded.com</div></div><div class="cl-meta">Invoice ${esc(v.no)}<br>${esc(nice(v.date))}</div></div>
    <h4>Bill To</h4><p>${v.billTo.filter(Boolean).map(esc).join('<br>')}</p>
    <h4>Services</h4><div class="cl-tw"><table class="cl-tbl"><thead><tr><th>Service</th><th class="r">Amount</th></tr></thead><tbody>${v.lines.map(l => `<tr><td>${esc(l[0])}</td><td class="r">${esc(l[1])}</td></tr>`).join('')}</tbody>
    <tfoot><tr><td>Total</td><td class="r">${money(v.total)}</td></tr><tr><td>Received</td><td class="r">${money(v.received)}</td></tr><tr><td>Balance due</td><td class="r">${money(v.balance)}</td></tr></tfoot></table></div>
    ${v.balance > 0 ? `<h4>Due Date</h4><p>${esc(v.due)}</p>` : ''}<h4>How to Pay</h4><p>${esc(I.howToPay)}</p><p class="muted">${esc(I.thanks)}</p><p class="muted" style="font-size:.85em">${esc(I.footer)}</p></div>`;
}
function invoiceText(f, v){
  const I = cfg().invoice;
  return [I.payTo, 'Invoice ' + v.no + ', ' + nice(v.date), '', 'BILL TO', ...v.billTo.filter(Boolean), '', 'SERVICES', ...v.lines.map(l => '* ' + l[0] + ': ' + l[1]),
    'Total: ' + money(v.total), 'Received: ' + money(v.received), 'Balance due: ' + money(v.balance)].concat(v.balance > 0 ? ['Due: ' + v.due] : [], ['', 'HOW TO PAY', I.howToPay, '', I.thanks, I.footer]).join('\n');
}
function makeInvoice(f){
  const st = store(), c = calc(f); st.seq = (+st.seq || 1000) + 1;
  const lines = c.rows.map(r => [rowName(r.it), amtCell(r)]); if (c.off) lines.push([c.g === 'gift' ? 'A gift from Grow With Grounded' : 'A reduced rate', money(c.off) + ' off']);
  const v = {no: 'GG-' + st.seq, date: today(), billTo: [fTitle(f), f.c.addr, f.c.city], lines, total: c.total, received: c.received, balance: c.balanceDue,
    due: c.cer && f.svc.date ? dueText(f) + ', the day before the service' : 'At the time of service'};
  f.invoices.push(v); touch(f); return v;
}
function vFile(f){
  const c = calc(f), st = status(f), s = lastSigned(f), fwL = linkedPlans(f), pmL = linkedCouples(f), wdL = linkedWeds(f), ss = linkedSessions(f), P = S.pay;
  const allFw = window.GGFw && GGFw.plans ? GGFw.plans().filter(p => !p.cli && !arr(f.links.fw).includes(p.id)) : [], allPm = arr((D() || {}).pm && D().pm.couples).filter(x => !x.cli && !arr(f.links.pm).includes(x.id));
  const allWd = window.GGWed && GGWed.plans ? GGWed.plans().filter(p => !p.cli && !arr(f.links.wd).includes(p.id)) : [], wdN = p => [p.c && p.c.p1 && (p.c.p1.called || p.c.p1.full), p.c && p.c.p2 && (p.c.p2.called || p.c.p2.full)].filter(Boolean).join(' and ') || 'A plan';
  const inv = S.inv && f.invoices.find(v => v.no === S.inv);
  return `<button type="button" class="linkbtn" data-cla="file" data-clv="">&larr; All Client Files</button>
  <div class="fw-head"><div style="min-width:0"><div class="eyebrow">Client File</div><h1>${esc(fTitle(f))}</h1><p class="muted" style="margin:2px 0 0">${esc(picked(f, 'svc').join(', '))}</p></div><span class="pill${st.ok ? ' sage' : ' gold'}">${esc(st.t)}</span></div>
  ${lockNote('Everything in this file is encrypted on this device and in your locked backup.')}
  ${f.stage === 'intake' || !isSigned(f) ? `<div class="cl-banner" role="note">The intake is open at Step ${f.step || 1}. <button type="button" class="linkbtn" data-cla="intake-open" data-clv="${esc(f.id)}">Continue the Intake</button></div>` : ''}
  ${blk(null, 'Contact', '', kv([['Name', fTitle(f)], ['Their part', f.c.rel], ['Phone', f.c.phone], ['Email', f.c.email], ['Address', [f.c.addr, f.c.city].filter(Boolean).join(', ')], ['Best way to reach', [picked(f, 'reach').join(', '), picked(f, 'times').join(', ')].filter(Boolean).join(', ')],
    ['Also involved', f.people.map(p => [p.name, p.role, p.phone].filter(Boolean).join(', ')).join('; ')], ['For', f.svc.forWhom], ['When and where', [f.svc.date ? nice(f.svc.date) : '', tm(f.svc.time), f.svc.place].filter(Boolean).join(', ')], ['Faith', picked(f, 'faith').join(', ')], ['Privacy notice', f.privacy.how ? 'Yes, ' + label(f, 'yesHow', f.privacy.how).toLowerCase() + ', ' + nice(f.privacy.date) : ''], ['Writing help', (f.privacy.wa || {}).ans ? (f.privacy.wa.ans === 'yes' ? 'Yes' : 'No') + (f.privacy.wa.how ? ', ' + (WA_HOW.find(x => x[0] === f.privacy.wa.how) || ['', f.privacy.wa.how])[1].toLowerCase() : '') + ', ' + nice(f.privacy.wa.date) : '']]) +
    `<div class="row" style="margin-top:10px"><button type="button" class="btn btn-line btn-sm" data-cla="intake-open" data-clv="${esc(f.id)}">Edit in the Intake</button>${f.pid ? `<button type="button" class="btn btn-line btn-sm" data-act="open-client" data-v="${esc(f.pid)}">People Record</button>` : ''}</div>`)}
  ${blk(null, 'Services Agreed', '', `<div class="cl-tw"><table class="cl-tbl"><tbody>${c.rows.map(r => `<tr><td>${esc(rowName(r.it))}</td><td class="r">${esc(amtCell(r))}</td></tr>`).join('')}${c.off ? `<tr><td>${c.g === 'gift' ? 'A gift from Grow With Grounded' : 'A reduced rate'}</td><td class="r">${money(c.off)} off</td></tr>` : ''}</tbody><tfoot><tr><td>Agreed total</td><td class="r">${money(c.total)}</td></tr></tfoot></table></div>`)}
  ${blk(null, 'Signed Agreement', '', s ? kv([['Signed', nice(s.date)], ['How', HOW[s.way] + (s.sig ? ', finger signature' : s.way === 'here' ? ', typed name' : '')], [s.way === 'send' ? 'Accepted by' : 'Signed by', s.name], ['Earlier versions', f.signed.length > 1 ? String(f.signed.length - 1) : '']]) +
    (changedSince(f) ? '<p class="fw-sub">The services changed after this was signed. Continue the Intake to sign the new wording.</p>' : '') +
    `<div class="row" style="margin-top:10px"><button type="button" class="btn btn-line btn-sm" data-cla="ag-view" data-clv="${esc(f.id)}">View the Signed Copy</button><button type="button" class="btn btn-line btn-sm" data-cla="ag-print" data-clv="${esc(f.id)}">Print</button><button type="button" class="btn btn-line btn-sm" data-cla="ag-copy" data-clv="${esc(f.id)}">Copy for Them</button></div>${S.agView === f.id ? '<div style="margin-top:12px">' + signedHTML(s) + '</div>' : ''}` : '<p class="muted" style="margin:0">Not signed yet.</p>')}
  ${blk(null, 'Payments', '', `<div class="cl-sums"><div><span>Agreed</span><b>${money(c.total)}</b></div><div><span>Received</span><b>${money(c.received)}</b></div><div><span>Balance${c.cer && f.svc.date && c.balanceDue ? ', due ' + esc(dueText(f)) : ''}</span><b>${money(c.balanceDue)}</b></div></div>
    ${f.pays.length ? `<div class="cl-tw"><table class="cl-tbl"><thead><tr><th>Date</th><th>What</th><th>Method</th><th class="r">Amount</th><th></th></tr></thead><tbody>${f.pays.map((p, i) => `<tr><td>${esc(nice(p.date))}</td><td>${esc([p.what, p.ref].filter(Boolean).join(', '))}</td><td>${esc(p.method || '')}</td><td class="r">${money(p.amt)}</td><td class="r"><button type="button" class="linkbtn" data-cla="pay-del" data-clv="${i}" aria-label="Remove this payment">Remove</button></td></tr>`).join('')}</tbody></table></div>` : ''}
    ${S.payOpen ? `<div class="fw-inline" style="margin-top:12px"><div class="fw-g2">${fld('amt', 'Amount', P.amt != null ? P.amt : (c.balanceDue || ''), 'number', '', 'data-clpay')}${fld('date', 'Date', P.date || today(), 'date', '', 'data-clpay')}${fld('what', 'What it is for', P.what || (c.cer && c.balanceDue ? 'Balance' : 'Payment'), 'text', '', 'data-clpay')}${fld('ref', 'Check number or a short note', P.ref || '', 'text', '', 'data-clpay')}</div>
      <label class="f">Method</label><div class="fw-chips">${items(f, 'methods').map(o => `<button type="button" class="chip" data-cla="pay-m" data-clv="${esc(o.t)}" aria-pressed="${P.method === o.t}">${esc(o.t)}</button>`).join('')}</div><p class="fw-sub">Never write down card or bank numbers here.</p>
      <div class="row"><button type="button" class="btn btn-gold btn-sm" data-cla="pay-add"${fk('pay-add')}>Save the Payment</button><button type="button" class="btn btn-line btn-sm" data-cla="pay-open">Cancel</button></div></div>` : `<div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold btn-sm" data-cla="pay-open"${fk('pay-open')}>Record a Payment</button></div>`}`)}
  ${blk(null, 'Invoices', '', `${f.invoices.length ? `<ul class="cl-linked">${f.invoices.slice().reverse().map(v => `<li><span><b>${esc(v.no)}</b><small>${esc(nice(v.date))}, ${money(v.total)}, balance ${money(v.balance)}</small></span><button type="button" class="btn btn-line btn-sm" data-cla="inv-view" data-clv="${esc(v.no)}" aria-expanded="${S.inv === v.no}">${S.inv === v.no ? 'Hide' : 'View'}</button></li>`).join('')}</ul>` : '<p class="muted" style="margin:0">No invoices yet.</p>'}
    <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold btn-sm" data-cla="inv-make"${fk('inv-make')}>Make an Invoice</button></div>
    ${inv ? `<div style="margin-top:12px" id="cl-inv">${invoiceHTML(f, inv)}<div class="row" style="margin-top:10px"><button type="button" class="btn btn-line btn-sm" data-cla="inv-copy" data-clv="${esc(inv.no)}">Copy</button><button type="button" class="btn btn-line btn-sm" data-cla="inv-email" data-clv="${esc(inv.no)}">Email</button><button type="button" class="btn btn-line btn-sm" data-cla="inv-text" data-clv="${esc(inv.no)}">Text</button><button type="button" class="btn btn-line btn-sm" data-cla="inv-print" data-clv="${esc(inv.no)}">Print</button></div></div>` : ''}`, 'Numbered on this device, starting with GG.')}
  ${blk(null, 'Linked Plans and Sessions', '', `<ul class="cl-linked">${fwL.map(p => `<li><span><b>Farewell Plan</b><small>${esc((p.person && (p.person.full || p.person.called)) || 'A plan')}${p.made ? ', started ' + esc(nice(p.made)) : ''}</small></span><button type="button" class="btn btn-line btn-sm" data-cla="fw-open" data-clv="${esc(p.id)}">Open the Farewell Plan</button></li>`).join('')}
    ${wdL.map(p => `<li><span><b>Wedding Plan</b><small>${esc(wdN(p))}${p.day && p.day.date ? ', wedding ' + esc(nice(p.day.date)) : ''}</small></span><button type="button" class="btn btn-line btn-sm" data-cla="wd-open" data-clv="${esc(p.id)}">Open the Wedding Plan</button></li>`).join('')}
    ${pmL.map(x => `<li><span><b>The Grounded Marriage</b><small>${esc([x.p1 && x.p1.name, x.p2 && x.p2.name].filter(Boolean).join(' and '))}${x.wedding ? ', wedding ' + esc(nice(x.wedding)) : ''}</small></span><button type="button" class="btn btn-line btn-sm" data-cla="pm-open" data-clv="${esc(x.id)}">Open The Grounded Marriage</button></li>`).join('')}
    ${window.GGRun ? GGRun.fileRows(f) : '' /* GWG BLD 771 hook: session plans (runner.js) */}
    ${ss.map(x => `<li><span><b>${esc(x.title || 'Session')}</b><small>${esc(nice(x.date))}${x.minutes ? ', ' + x.minutes + ' minutes' : ''}</small></span><button type="button" class="btn btn-line btn-sm" data-act="view-session" data-v="${esc(x.id)}">Open the Session</button></li>`).join('')}</ul>
    ${!fwL.length && !pmL.length && !wdL.length && !ss.length && !(window.GGRun && GGRun.fileRows(f)) ? '<p class="muted" style="margin:0 0 8px">Nothing linked yet.</p>' : ''}
    <div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-cla="fw-new">Start a Farewell Plan</button><button type="button" class="btn btn-line btn-sm" data-cla="wd-new">Start a Wedding Plan</button><button type="button" class="btn btn-line btn-sm" data-cla="pm-new">Start The Grounded Marriage</button>${f.pid ? `<button type="button" class="btn btn-line btn-sm" data-act="open-client" data-v="${esc(f.pid)}">Start a Session</button>` : ''}</div>
    ${window.GGRun ? GGRun.fileStart(f) : '' /* GWG BLD 771 hook: start any session kit with this client */}
    ${allFw.length || allPm.length || allWd.length ? `<div class="cl-addlib"><select id="cl-linkpick" aria-label="Link an existing plan">${allWd.map(p => `<option value="wd|${esc(p.id)}">Wedding Plan: ${esc(wdN(p))}</option>`).join('')}${allFw.map(p => `<option value="fw|${esc(p.id)}">Farewell Plan: ${esc((p.person && (p.person.full || p.person.called)) || 'A plan')}</option>`).join('')}${allPm.map(x => `<option value="pm|${esc(x.id)}">The Grounded Marriage: ${esc([x.p1 && x.p1.name, x.p2 && x.p2.name].filter(Boolean).join(' and '))}</option>`).join('')}</select><button type="button" class="btn btn-line btn-sm" data-cla="link">Link an Existing Plan</button></div>` : ''}`)}
  ${window.GGHw && (pmL.length || f.hw || /marriage|premarital/i.test(picked(f, 'svc').join(' '))) ? GGHw.inviteBlock('cli', f.id) : '' /* GWG BLD 772 hook: Heartwood invites */}
  ${blk(null, 'Notes', '', `<textarea rows="4" data-cli="fileNote" aria-label="Notes for this file" placeholder="What helps you serve them well.">${esc(f.fileNote || '')}</textarea>${Object.keys(f.notes).filter(k => (f.notes[k] || '').trim()).length ? `<details class="fw-custom" style="margin-top:10px"><summary>Notes From the Intake</summary>${Object.entries(f.notes).filter(([, v]) => (v || '').trim()).map(([k, v]) => `<p><b>${esc((cfg().steps.find(s => s.id === k) || {title: k === 'first' ? 'First Conversation' : k}).title)}:</b> ${esc(v)}</p>`).join('')}</details>` : ''}`)}
  <div class="row" style="margin-top:14px"><button type="button" class="btn btn-danger btn-sm" data-cla="file-del" data-clv="${esc(f.id)}">Delete This File</button></div>`;
}

// ---------- Back Up ----------
function bkLine(){
  const d = D(), last = d && d.lastBackup, n = daysSince(last);
  return last ? 'Last backup ' + nice(isoOf(new Date(last))) + (n === 0 ? ', today' : n === 1 ? ', yesterday' : ', ' + n + ' days ago') + '.' : "You haven't backed up yet.";
}
function vBackup(){
  const B = cfg().backup, st = store();
  return `<div class="fw-kick">Keep Your Files Safe</div><h2 style="margin:2px 0 10px">Back Up</h2>
  <div class="cl-bcard"><div style="min-width:0"><h3>${esc(B.cardTitle)}</h3><p class="muted" style="margin:0">${esc(bkLine())} A weekly backup keeps every client file safe.</p></div><button type="button" class="btn btn-gold" data-act="export">${esc(B.cardTitle)}</button></div>
  ${blk(null, 'How a Backup Works', '', `<ol class="cl-steps">${B.steps.map(s => `<li><h4>${esc(s.h)}</h4><p>${esc(s.p)}</p></li>`).join('')}</ol>
    <label class="f">Your cloud folder</label><div class="fw-chips">${['iCloud Drive', 'Google Drive', 'OneDrive'].map(t => `<button type="button" class="chip" data-cla="cloud" data-clv="${esc(t)}" aria-pressed="${st.cloud === t}">${esc(t)}</button>`).join('')}</div>
    <label class="fw-ck" style="margin-top:10px"><input type="checkbox" data-clusb="1"${st.usb.on ? ' checked' : ''}><span>Remind me monthly to copy it to a USB drive</span></label>
    ${st.usb.on ? `<p class="fw-sub">${st.usb.last ? 'Last USB copy ' + esc(nice(st.usb.last)) + '.' : 'No USB copy marked yet.'} <button type="button" class="linkbtn" data-cla="usb-done">I Copied It Today</button></p>` : ''}`)}
  ${blk(null, 'Why the Cloud Is Safe Here', '', `<p style="margin:0 0 8px">${esc(B.whySafe)}</p><div class="cl-scramble" aria-label="An example of scrambled data">U2FsdGVkX19vQm8x9Kq3pZ+7f0hL2yT5wQe1rN8cV4mJbHs6Ga0xDkP9uY3tR</div>`)}`;
}

// ---------- the tab ----------
const SECS = [['first', 'First Conversation'], ['intake', 'Intake Session'], ['files', 'Client Files'], ['backup', 'Back Up']];
function inner(){ return S.sec === 'intake' ? vIntake() : S.sec === 'files' ? vFiles() : S.sec === 'backup' ? vBackup() : vFirst(); }
function view(){
  if (!isStaff() || !D()) return '';
  setTimeout(() => { headTop(); setupSig(); }, 0);
  return `<div id="cl-root"><div class="page-head" style="margin-bottom:12px"><div class="eyebrow">Paid Services</div><h1>Clients</h1><p>First conversations, the intake, and every client file, kept private on this device.</p></div>
  <div class="cl-secs" role="group" aria-label="Sections">${SECS.map(([k, l]) => `<button type="button" class="chip" data-cla="sec" data-clv="${k}" aria-pressed="${S.sec === k}"${fk('sec|' + k)}>${esc(l)}</button>`).join('')}</div>
  <div id="cl-in">${inner()}</div></div>`;
}
function headTop(){ const h = document.querySelector('header.bar'), r = document.getElementById('cl-root'); if (h && r) r.style.setProperty('--fw-top', h.offsetHeight + 'px'); }
function rerender(keepScroll){
  const r = document.getElementById('cl-root'); if (!r){ if (C.render) C.render(); return; }
  const ae = document.activeElement, k = ae && ae.getAttribute && ae.getAttribute('data-fk'), y = window.scrollY;
  r.outerHTML = view(); if (keepScroll) window.scrollTo(0, y); else window.scrollTo(0, 0);
  if (k){ const el = document.querySelector('#cl-root [data-fk="' + (window.CSS && CSS.escape ? CSS.escape(k) : k) + '"]'); if (el) try { el.focus({preventScroll: true}); } catch (e) {} }
  setupSig(); pushFam();
}

// ---------- the signature pad ----------
function setupSig(){
  const cv = document.getElementById('cl-sig'); if (!cv) return;
  const r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
  cv.width = Math.max(1, Math.round(r.width * dpr)); cv.height = Math.max(1, Math.round(r.height * dpr));
  const ctx = cv.getContext('2d'), ink = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#2A1C12';
  const draw = () => { ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, r.width, r.height); ctx.strokeStyle = ink; ctx.lineWidth = 2.4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    S.sig.forEach(s => { ctx.beginPath(); s.forEach((p, i) => i ? ctx.lineTo(p[0] * r.width, p[1] * r.height) : ctx.moveTo(p[0] * r.width, p[1] * r.height)); if (s.length === 1) ctx.lineTo(s[0][0] * r.width + 0.5, s[0][1] * r.height); ctx.stroke(); }); };
  draw();
  if (cv.dataset.ready) return; cv.dataset.ready = '1';
  let line = null;
  const pt = e => { const b = cv.getBoundingClientRect(); return [(e.clientX - b.left) / b.width, (e.clientY - b.top) / b.height]; };
  cv.addEventListener('pointerdown', e => { line = [pt(e)]; S.sig.push(line); try { cv.setPointerCapture(e.pointerId); } catch (x) {} e.preventDefault(); draw(); });
  cv.addEventListener('pointermove', e => { if (!line) return; line.push(pt(e)); draw(); });
  const end = () => { line = null; }; cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
}
// The saved image: dark ink on white, so it prints and reads in any theme.
function sigImage(){
  if (!S.sig.length) return '';
  const w = 600, h = 200, cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const x = cv.getContext('2d'); x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, w, h); x.strokeStyle = '#2A1C12'; x.lineWidth = 4; x.lineCap = 'round'; x.lineJoin = 'round';
  S.sig.forEach(s => { x.beginPath(); s.forEach((p, i) => i ? x.lineTo(p[0] * w, p[1] * h) : x.moveTo(p[0] * w, p[1] * h)); if (s.length === 1) x.lineTo(s[0][0] * w + 1, s[0][1] * h); x.stroke(); });
  try { return cv.toDataURL('image/png'); } catch (e) { return ''; }
}

// ---------- links to the Farewell Plan and The Grounded Marriage ----------
function ensurePerson(f){
  const d = D(); if (!d || !saved(f) || !(f.c.first || '').trim()) return;
  d.clients = arr(d.clients);
  const svcName = (() => { const ids = arr(f.sel.svc).map(v => (items(f, 'services').find(x => x.id === v) || {}).svc); return ids.includes('eol') ? 'End-of-Life Support' : ids.includes('counsel') ? 'Spiritual Guidance' : ids.includes('grief') ? 'Grief Support' : ids.includes('speaking') ? 'Speaking and Training' : arr(f.sel.svc).some(v => linkOf(f, v) === 'farewell') ? 'Officiant: Funeral or Memorial' : ids.includes('officiant') ? 'Officiant: Wedding' : ''; })();
  const nm = f.c.first.trim() + (f.c.last.trim() ? ' ' + f.c.last.trim()[0] + '.' : '');
  let p = f.pid && d.clients.find(c => c.id === f.pid);
  if (!p){ p = {id: uid(), u: Date.now(), name: nm, service: svcName, status: 'active', followups: [], created: today(), cli: f.id}; d.clients.push(p); f.pid = p.id; if (d.deleted && d.deleted.clients) delete d.deleted.clients[p.id]; }
  else { if (!p.service && svcName) p.service = svcName; p.cli = f.id; p.u = Date.now(); }
  if (grace(f) !== 'standard') p.grace = true;
  touch(f);
}
function startFw(f){
  if (!window.GGFw || !GGFw.create){ toast('The Farewell Planning Session is not on this device yet.'); return; }
  if (!saved(f)){ toast("Record their yes to the privacy notice first."); return; }
  const id = GGFw.create({cli: f.id, contact: {name: nameOf(f), rel: f.c.rel, ph: f.c.phone, em: f.c.email}, person: {full: (f.svc.forWhom || '').trim()}});
  f.links.fw = arr(f.links.fw).concat(id); touch(f); GGFw.open(id);
}
function startWd(f){
  if (!window.GGWed || !GGWed.create){ toast('The Wedding Planning Session is not on this device yet.'); return; }
  if (!saved(f)){ toast("Record their yes to the privacy notice first."); return; }
  const t = arr(f.sel.svc).map(v => (items(f, 'services').find(x => x.id === v) || {}).id).find(v => ['wedding', 'elopement', 'vows'].includes(v));
  const pm = linkedCouples(f)[0];
  const id = GGWed.create({cli: f.id, pm: pm ? pm.id : '', type: t === 'vows' ? 'renewal' : t || 'wedding', c: {p1: {full: nameOf(f), called: (f.c.first || '').trim(), ph: f.c.phone, em: f.c.email}, p2: {full: (f.c.partner || '').trim()}}, day: {date: f.svc.date || '', time: f.svc.time || '', place: f.svc.place || ''}});
  f.links.wd = arr(f.links.wd).concat(id); touch(f); GGWed.open(id);
}
function startPm(f){
  if (!window.GGPm || !GGPm.create){ toast('The Premarital tab is not on this device yet.'); return; }
  if (!saved(f)){ toast("Record their yes to the privacy notice first."); return; }
  const a = (f.c.first || '').trim() || 'Partner', b = ((f.c.partner || '').trim().split(/\s+/)[0]) || 'Partner';
  const id = GGPm.create({cli: f.id, a, b, full1: nameOf(f), full2: (f.c.partner || '').trim(), wedding: f.svc.date || '', data: D(), lib: C.lib && C.lib(), save: C.save});
  f.links.pm = arr(f.links.pm).concat(id); touch(f); GGPm.open(id); if (C.go) C.go('premarital');
}

// ---------- actions ----------
function setPath(o, path, v){
  const ks = path.split('.'); let x = o;
  for (let i = 0; i < ks.length - 1; i++){ const k = ks[i]; if (x[k] == null) x[k] = /^\d+$/.test(ks[i + 1]) ? [] : {}; x = x[k]; }
  x[ks[ks.length - 1]] = v;
}
function commit(f){
  if (saved(f)) return;
  const d = D(); files().push(f); S.intakeId = f.id; S.draft = null; if (d && d.deleted && d.deleted.cli) delete d.deleted.cli[f.id];
  f.u = Date.now(); C.save && C.save(); toast('Their yes is recorded. The file is saved, encrypted on this device.');
}
function goStep(n){
  const f = cur(); if (!f || n < 1 || n > CNT) return;
  if (S.step === 2 || n > 2) ensurePerson(f);
  S.step = n; f.step = Math.max(+f.step || 1, n); touch(f); rerender(false);
  if (window.matchMedia && matchMedia('(max-width: 900px)').matches){ const c = document.querySelector('#cl-root .fw-rail [aria-current="step"]'); if (c && c.scrollIntoView) c.scrollIntoView({block: 'nearest', inline: 'center'}); }
}
function addOwnItem(f, id, t){
  t = String(t || '').trim(); if (!t) return false;
  if (id === 'people'){ f.people.push({name: t, role: '', phone: ''}); return true; }
  if (id === 'next'){ f.next.push({t, done: false}); return true; }
  const L = LMAP[id] || id, it = {id: 'own_' + uid(), t}; (f.own[L] = arr(f.own[L])).push(it);
  (f.sel[id] = arr(f.sel[id])).push(it.id); return true;
}
function startIntake(fromFirst){
  const f = newFile();
  if (fromFirst){
    const F = cfg().fc, qa = F.questions.map((q, i) => (S.fc.q[i] || '').trim() ? q + ' ' + S.fc.q[i].trim() : '').filter(Boolean);
    const n = [qa.join('\n'), (S.fc.notes || '').trim(), S.timer.el || S.timer.on ? 'First conversation: about ' + Math.max(1, Math.round(elapsed() / 60000)) + ' minutes.' : ''].filter(Boolean).join('\n');
    if (n) f.notes.first = n;
    S.fc = {q: {}, notes: '', name: '', think: false, date: ''}; S.timer = {on: false, start: 0, el: 0};
  }
  S.draft = f; S.intakeId = null; S.step = 1; S.mode = 'chris'; S.sig = []; S.dep = {}; S.sec = 'intake'; rerender(false);
}
function act(a, v, el){
  const d = D(); if (!d) return;
  switch (a){
    case 'sec': S.sec = v; if (v === 'files') S.fileId = null; if (v === 'intake' && !cur()) startIntake(false); else rerender(false); return;
    case 'timer': if (v === 'go'){ if (S.timer.on){ S.timer.el += Date.now() - S.timer.start; S.timer.on = false; } else { S.timer.start = Date.now(); S.timer.on = true; } } else S.timer = {on: false, start: 0, el: 0}; rerender(true); return;
    case 'fc-yes': startIntake(true); return;
    case 'fc-think': S.fc.think = !S.fc.think; rerender(true); return;
    case 'rem-add': { const n = (S.fc.name || '').trim(); if (!n){ toast('Add a first name or initials.'); const i = document.querySelector('#cl-root [data-clfc="name"]'); if (i) i.focus(); return; }
      store().rem.push({id: 'rm' + uid(), u: Date.now(), name: n, date: S.fc.date || addDays(today(), 4), done: false}); C.save(); S.fc = {q: {}, notes: '', name: '', think: false, date: ''}; S.timer = {on: false, start: 0, el: 0}; toast('Reminder added. It shows on Home.'); rerender(true); return; }
    case 'rem-done': { const r = store().rem.find(x => x.id === v); if (r){ r.done = true; r.u = Date.now(); C.save(); } if (document.getElementById('cl-root')) rerender(true); else if (C.render) C.render(); return; }
    case 'new-intake': startIntake(false); return;
    case 'intake-open': S.intakeId = v; S.draft = null; S.sec = 'intake'; S.mode = 'chris'; S.sig = []; S.dep = {}; { const f = fileOf(v); S.step = Math.min(CNT, Math.max(1, (f && +f.step) || 1)); } if (C.go && !document.getElementById('cl-root')) C.go('cli'); else rerender(false); return;
    case 'file': S.fileId = v || null; S.inv = null; S.payOpen = false; S.pay = {}; S.agView = null; S.sec = 'files'; if (C.go && !document.getElementById('cl-root')) C.go('cli'); else rerender(false); return;
    case 'irs': { const i = document.getElementById('cl-irs'), r = i ? +i.value : 0; if (!isFounder()) return; if (!(r > 0 && r < 10)){ toast('Enter the rate a mile, for example 0.725.'); return; } store().irs = {rate: r, u: Date.now()}; C.save(); toast('Travel rate updated.'); rerender(true); return; }
    case 'cloud': store().cloud = store().cloud === v ? '' : v; C.save(); rerender(true); return;
    case 'usb-done': store().usb.last = today(); store().usb.u = Date.now(); C.save(); toast('Marked. The next reminder comes in a month.'); if (document.getElementById('cl-root')) rerender(true); else if (C.render) C.render(); return;
    case 'link': { const f = fileOf(S.fileId), s = document.getElementById('cl-linkpick'); if (!f || !s || !s.value) return; const [k, id] = s.value.split('|'); f.links[k] = arr(f.links[k]).concat(id);
      if (k === 'wd' && window.GGWed){ const p = GGWed.plans().find(x => x.id === id); if (p){ p.cli = f.id; p.u = Date.now(); } }
      if (k === 'fw' && window.GGFw){ const p = GGFw.plans().find(x => x.id === id); if (p){ p.cli = f.id; p.u = Date.now(); } }
      if (k === 'pm'){ const x = arr(d.pm && d.pm.couples).find(y => y.id === id); if (x){ x.cli = f.id; x.u = Date.now(); } }
      touch(f); rerender(true); toast('Linked.'); return; }
    case 'fw-open': if (window.GGFw && GGFw.open) GGFw.open(v); return;
    case 'wd-open': if (window.GGWed && GGWed.open) GGWed.open(v); return;
    case 'pm-open': if (window.GGPm && GGPm.open){ GGPm.open(v); if (C.go) C.go('premarital'); } return;
  }
  // File actions (Client Files)
  if (S.sec === 'files'){
    const f = fileOf(S.fileId);
    switch (a){
      case 'file-del': { const x = fileOf(v); if (!x || !confirm('Delete the client file for ' + fTitle(x) + '? Linked plans, sessions, and the People record stay until you delete them.')) return;
        d.cli.files = files().filter(y => y !== x); d.deleted = d.deleted || {clients: {}, sessions: {}}; d.deleted.cli = d.deleted.cli || {}; d.deleted.cli[x.id] = Date.now(); C.save(); S.fileId = null; toast('Deleted.'); rerender(false); return; }
      case 'ag-view': S.agView = S.agView === v ? null : v; rerender(true); return;
      case 'ag-print': printAgreement(fileOf(v)); return;
      case 'ag-copy': { const x = fileOf(v), s = x && lastSigned(x); if (s) copyText(s.text + '\n\n' + (s.way === 'send' ? 'Accepted by ' : 'Signed by ') + s.name + ', ' + nice(s.date) + '.', 'The signed agreement is copied.'); return; }
    }
    if (!f) return;
    switch (a){
      case 'pay-open': S.payOpen = !S.payOpen; S.pay = {}; rerender(true); return;
      case 'pay-m': S.pay.method = S.pay.method === v ? '' : v; rerender(true); return;
      case 'pay-add': { const c = calc(f), P = S.pay, amt = r2(P.amt != null ? P.amt : c.balanceDue); if (!(amt > 0)){ toast('Add the amount first.'); return; }
        f.pays.push({id: 'py' + uid(), date: P.date || today(), amt, what: P.what != null ? P.what : (c.cer && c.balanceDue ? 'Balance' : 'Payment'), method: P.method || '', ref: P.ref || ''});
        S.payOpen = false; S.pay = {}; touch(f); toast('Payment recorded.'); rerender(true); return; }
      case 'pay-del': if (!confirm('Remove this payment from the file?')) return; f.pays.splice(+v, 1); touch(f); rerender(true); return;
      case 'inv-make': { const x = makeInvoice(f); S.inv = x.no; rerender(true); toast('Invoice ' + x.no + ' is ready.'); return; }
      case 'inv-view': S.inv = S.inv === v ? null : v; rerender(true); return;
      case 'inv-copy': case 'inv-email': case 'inv-text': case 'inv-print': { const x = f.invoices.find(y => y.no === v); if (!x) return;
        const body = fill(cfg().sendWords.invoice, f, {Total: money(x.total), Balance: money(x.balance), Due: x.due}) + '\n\n' + invoiceText(f, x);
        if (a === 'inv-copy') copyText(invoiceText(f, x), 'The invoice is copied.');
        else if (a === 'inv-email') openLink(mailURL(f.c.email, 'Invoice ' + x.no + ' from Grow With Grounded', body));
        else if (a === 'inv-text') openLink(smsURL(f.c.phone, body));
        else sheet(invoiceHTML(f, x), 'Invoice ' + x.no, 'invoice');
        return; }
      case 'fw-new': startFw(f); return;
      case 'wd-new': startWd(f); return;
      case 'pm-new': startPm(f); return;
    }
    return;
  }
  // Intake actions
  const f = cur(); if (!f) return;
  switch (a){
    case 'step': goStep(+v); return;
    case 'nav': goStep(S.step + (+v)); return;
    case 'mode': S.mode = v; rerender(true); return;
    case 'famwin': openFam(); return;
    case 'chip': { const [id, val] = v.split('|'), single = el.dataset.cls === '1', c0 = arr(f.sel[id]);
      if (id === 'yesHow'){ f.sel.yesHow = [val]; f.privacy = Object.assign({}, f.privacy, {how: val, date: f.privacy.date || today(), at: Date.now()}); commit(f); touch(f); rerender(true); return; }
      if (single) f.sel[id] = c0.includes(val) && id !== 'grace' && id !== 'signWay' ? [] : [val]; else f.sel[id] = c0.includes(val) ? c0.filter(x => x !== val) : c0.concat(val);
      if (id === 'grace' || id === 'method') S.dep = Object.assign({}, S.dep, {amt: undefined});
      touch(f); rerender(true); return; }
    case 'own': { const inp = document.querySelector(`#cl-root [data-clown="${v}"]`); if (inp && addOwnItem(f, v, inp.value)){ touch(f); rerender(true); const n = document.querySelector(`#cl-root [data-clown="${v}"]`); if (n) n.focus(); } return; }
    case 'tidy': f.tidy[v] = !f.tidy[v]; touch(f); rerender(true); return;
    case 'star': if (f.stars[v]) delete f.stars[v]; else f.stars[v] = {label: el.dataset.cll || v, step: S.step}; touch(f); rerender(true); return;
    case 'pp-del': f.people.splice(+v, 1); touch(f); rerender(true); return;
    case 'it-del': f.items.splice(+v, 1); touch(f); rerender(true); return;
    case 'lib-add': { const s = document.getElementById('cl-libpick'), r = s && libRates().find(x => x.lid === s.value); if (!r) return;
      f.items.push({lid: r.lid, name: r.name, kind: r.kind, qty: r.kind === 'travel' ? 0 : 1, rate: r.rate, base: r.rate, from: !!r.from, unit: r.unit || ''}); touch(f); rerender(true); return; }
    case 'own-line': { const n = document.getElementById('cl-own-name'), k = document.getElementById('cl-own-kind'), t = n ? n.value.trim() : ''; if (!t){ if (n) n.focus(); return; }
      f.items.push({lid: 'own', name: t, kind: k ? k.value : 'session', qty: 1, rate: 0, base: 0, from: false, unit: ''}); S.own = ''; S.ownKind = k ? k.value : 'session'; touch(f); rerender(true); return; }
    case 'sig-clear': { S.sig = []; const cv = document.getElementById('cl-sig'); if (cv){ const x = cv.getContext('2d'); x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, cv.width, cv.height); } return; }
    case 'sign': { const sg = f.sg || {}, typed = (sg.typed || '').trim(), img = sigImage();
      if (!typed && !img){ toast('Type a full name or sign with a finger first.'); return; }
      if (!saved(f)){ toast("Record their yes to the privacy notice in Step 1 first."); return; }
      if (!f.items.length && !confirm('No services are listed yet. Sign anyway?')) return;
      f.signed.push({id: 'ag' + uid(), way: 'here', text: agreementText(f), name: typed || nameOf(f), date: sg.date || today(), at: Date.now(), sig: img});
      if (!arr(f.sel.yesHow).length) f.sel.yesHow = ['signed'];
      S.sig = []; f.sg = {}; touch(f); toast('Signed. The exact wording is saved in the file.'); rerender(true); return; }
    case 'send': { const words = sendWords(f), text = agreementText(f);
      if (!saved(f)){ toast("Record their yes to the privacy notice in Step 1 first."); return; }
      if (v === 'copy') copyText(words, 'The agreement and your words are copied.');
      else if (v === 'text') openLink(smsURL(f.c.phone, words));
      else openLink(mailURL(f.c.email, (cfg().agreement.title || 'Service Agreement') + ' from Grow With Grounded', words));
      f.sent = {text, date: today(), at: Date.now(), how: v}; touch(f); rerender(true); return; }
    case 'accept': { const t = document.getElementById('cl-reply'), reply = t ? t.value.trim() : '', rp = f.rp || {};
      if (!f.sent){ toast('Send the agreement first, so the file keeps the exact wording they read.'); return; }
      if (!reply){ toast('Paste their reply first.'); if (t) t.focus(); return; }
      if (!/\bagree\b|\byes\b/i.test(reply) && !confirm('Their reply does not say "I agree". Record it as their acceptance anyway?')) return;
      if (f.sent.text !== agreementText(f) && !confirm('The agreement changed after it was sent. Their acceptance is saved with the wording they were sent. Continue?')) return;
      f.signed.push({id: 'ag' + uid(), way: 'send', text: f.sent.text, name: (rp.name || '').trim() || nameOf(f), date: rp.date || today(), at: Date.now(), reply, sig: ''});
      f.rp = {}; touch(f); toast('Their acceptance is recorded with the exact wording.'); rerender(true); return; }
    case 'ag-view': S.agView = v; printAgreement(f, true); return;
    case 'dep': { const c = calc(f), amt = r2(S.dep.amt != null && S.dep.amt !== '' ? S.dep.amt : c.dueNow); if (!(amt > 0)){ toast('Add the amount first.'); return; }
      if (!saved(f)){ toast("Record their yes to the privacy notice in Step 1 first."); return; }
      f.pays.push({id: 'py' + uid(), date: S.dep.date || today(), amt, what: c.cer ? 'Deposit, 50%' : 'Payment at signing', method: label(f, 'method', arr(f.sel.method)[0] || '') || '', ref: S.dep.ref || ''});
      S.dep = {}; touch(f); toast('Deposit recorded.'); rerender(true); return; }
    case 'fw-new': startFw(f); return;
    case 'wd-new': startWd(f); return;
    case 'pm-new': startPm(f); return;
    case 'wa': case 'wa-how': { const w = Object.assign({}, f.privacy.wa || {}); if (a === 'wa'){ w.ans = v; if (!w.how) w.how = 'aloud'; } else { w.how = v; if (!w.ans) w.ans = 'yes'; } w.date = w.date || f.privacy.date || today(); w.at = Date.now();
      f.privacy = Object.assign({}, f.privacy, {wa: w}); touch(f); rerender(true); return; }
    case 'finish': if (!saved(f)){ toast("Record their yes to the privacy notice in Step 1 first."); goStep(1); return; }
      ensurePerson(f); f.stage = 'active'; touch(f); S.fileId = f.id; S.sec = 'files'; S.inv = null; rerender(false); return;
  }
}
function sheet(html, title, file){
  const body = (C.ph ? C.ph(title) : '') + `<style>${PCSS}</style>` + html + (C.pf ? C.pf() : '');
  API.last = {title, html: body};
  if (C.sheet) C.sheet(body, title, {file, confidential: true});
}
function printAgreement(f, viewOnly){
  const s = f && lastSigned(f); if (!s) return;
  if (viewOnly){ S.sec = 'files'; S.fileId = f.id; S.agView = f.id; rerender(false); const el = document.querySelector('#cl-root .cl-signed'); if (el && el.scrollIntoView) el.scrollIntoView({block: 'start'}); return; }
  sheet(signedHTML(s), cfg().agreement.title || 'Service Agreement', 'service-agreement');
}
const PCSS = `.cl-paper h3{margin:0 0 4px;}.cl-ph{display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid #ccc;margin-bottom:8px;}.cl-site,.cl-meta{font-size:11px;color:#555;}
.cl-tbl{width:100%;border-collapse:collapse;}.cl-tbl td,.cl-tbl th{border-top:1px solid #ccc;padding:5px 4px;text-align:left;vertical-align:top;}.cl-tbl .r{text-align:right;white-space:nowrap;}.cl-tbl tfoot td{font-weight:700;}
.cl-words{white-space:pre-wrap;}.cl-sigrow{display:flex;gap:16px;align-items:center;border-top:1px solid #ccc;margin-top:10px;padding-top:10px;}.cl-sigrow img{width:240px;height:auto;}.muted{color:#555;}`;

// ---------- events ----------
document.addEventListener('click', e => {
  const t = e.target.closest && e.target.closest('[data-cla]'); if (!t || !D()) return;
  if (t.disabled) return;
  e.preventDefault(); act(t.dataset.cla, t.dataset.clv || '', t);
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || !e.target.closest) return;
  const o = e.target.closest('#cl-root [data-clown]'); if (o){ e.preventDefault(); act('own', o.dataset.clown, o); }
});
// Typing saves as it goes, with no redraw, so the next tap always lands; totals and the agreement follow along.
document.addEventListener('input', e => {
  const t = e.target; if (!t.closest || !t.closest('#cl-root') || !D()) return;
  const ds = t.dataset;
  if (ds.clfc){ setPath(S.fc, ds.clfc, t.value); return; }
  if (ds.cldep){ S.dep[ds.cldep] = t.value; return; }
  if (ds.clpay){ S.pay[ds.clpay] = t.value; return; }
  if (ds.clq){ S.q = t.value; const pos = t.selectionStart; rerender(true); const s = document.getElementById('cl-q'); if (s){ s.focus(); try { s.setSelectionRange(pos, pos); } catch (x) {} } return; }
  if (t.id === 'cl-own-name'){ S.own = t.value; return; }
  const f = S.sec === 'files' ? fileOf(S.fileId) : cur(); if (!f) return;
  if (ds.cli){ setPath(f, ds.cli, t.value); touch(f); if (/^c\./.test(ds.cli)){ const h = document.getElementById('cl-title'); if (h) h.textContent = fTitle(f); } if (ds.cli === 'included' || ds.cli === 'reduce') live(f); return; }
  if (ds.clit){ const [i, k] = ds.clit.split('|'), it = f.items[+i]; if (!it) return; it[k] = t.value === '' ? '' : +t.value; touch(f); live(f); }
});
function live(f){
  const c = calc(f);
  c.rows.forEach((r, i) => { const a = document.querySelector(`#cl-root [data-clamt="${i}"]`); if (a) a.textContent = amtCell(r); });
  const tt = document.getElementById('cl-totals'); if (tt) tt.innerHTML = totalsHTML(f);
  const pp = document.getElementById('cl-paper'); if (pp) pp.innerHTML = agreementHTML(f);
  const sw = document.querySelector('#cl-root .cl-sendw'); if (sw) sw.textContent = sendWords(f);
}
document.addEventListener('change', e => {
  const t = e.target; if (!t.closest || !t.closest('#cl-root') || !D()) return;
  if (t.dataset.clusb){ const u = store().usb; u.on = !!t.checked; u.u = Date.now(); C.save(); rerender(true); return; }
  const f = S.sec === 'files' ? fileOf(S.fileId) : cur(); if (!f) return;
  if (t.dataset.clc){ setPath(f, t.dataset.clc, !!t.checked); touch(f); return; }
  if (t.dataset.cli && (t.type === 'date' || t.type === 'time')){ setPath(f, t.dataset.cli, t.value); touch(f); if (/^svc\.date/.test(t.dataset.cli)) live(f); }
});
// The timer ticks without a redraw.
setInterval(() => { if (!S.timer.on) return; const c = document.getElementById('cl-clock'), n = document.getElementById('cl-tnote'); if (c) c.textContent = fmtClock(elapsed()); if (n) n.textContent = timerNote(elapsed()); }, 500);
let rz; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { const cv = document.getElementById('cl-sig'); if (cv){ cv.dataset.ready = ''; const n = cv.cloneNode(false); cv.replaceWith(n); setupSig(); } }, 150); });

// ---------- styles (built on the Farewell Planning Session's) ----------
const CSS = `
#cl-root{min-width:0;}
#cl-root input[type=time],#cl-root input[type=tel],#cl-root input[type=email],#cl-root input[type=search]{width:100%;border:1px solid var(--line);border-radius:12px;padding:12px 14px;background:var(--bg);font-size:calc(17px * var(--scale));color:var(--ink);font-family:inherit;}
.cl-secs{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 16px;}.cl-secs .chip{min-height:46px;}
.cl-policy{background:var(--card);border:1.5px dashed var(--gold);border-radius:16px;padding:14px 18px;margin:0 0 14px;}.cl-policy h3{margin:8px 0 6px;}.cl-policy ul{margin:0;padding-left:20px;}.cl-policy li{margin:4px 0;}
.cl-timer{display:flex;flex-wrap:wrap;gap:14px;align-items:center;}.cl-clock{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:44px;letter-spacing:2px;font-variant-numeric:tabular-nums;}
.cl-how{margin:0;padding-left:20px;}.cl-how li{margin:6px 0;}
.cl-yes{display:flex;flex-wrap:wrap;gap:10px;margin-top:4px;}
.cl-banner{border-left:4px solid var(--gold);background:var(--bg-deep);border-radius:12px;padding:10px 14px;margin:0 0 14px;font-weight:600;}
.cl-ok{margin:10px 0 0;color:var(--ink);font-weight:600;}
.cl-okcard{border:1.5px solid var(--sage);background:color-mix(in srgb,var(--sage) 10%,transparent);border-radius:14px;padding:12px 16px;margin:0 0 14px;}.cl-okcard p{margin:4px 0 10px;}
.cl-lock{display:flex;gap:10px;align-items:center;background:var(--bg-deep);border-radius:12px;padding:10px 14px;margin:0 0 14px;font-size:15px;}
.cl-notice{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;}.cl-ni{background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:12px 14px;min-width:0;}.cl-ni h4{margin:0 0 4px;}.cl-ni p{margin:0;}
.cl-ni.never{grid-column:1 / -1;border-left:4px solid var(--gold);}
.fw-fam .cl-notice{grid-template-columns:minmax(0,1fr);}.fw-fam .cl-ni p{font-size:calc(18px * var(--scale));}
@media(max-width:700px){.cl-notice{grid-template-columns:minmax(0,1fr);}}
.cl-pline{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1.2fr) minmax(0,1fr) auto;gap:8px;align-items:center;}
@media(max-width:700px){.cl-pline{grid-template-columns:minmax(0,1fr) minmax(0,1fr);}.cl-pline .btn{justify-self:start;}}
.cl-ihead,.cl-irow{display:grid;grid-template-columns:minmax(0,1fr) 84px 110px 100px auto;gap:8px;align-items:center;}
.cl-ihead{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:1.2px;text-transform:uppercase;color:var(--ink-soft);padding:0 0 4px;}
.cl-irow{border-top:1px solid var(--line);padding:8px 0;}.cl-nm{min-width:0;}.cl-nm b{display:block;overflow-wrap:anywhere;}.cl-nm small{color:var(--ink-soft);font-size:14px;}
.cl-mini{display:flex;flex-direction:column;gap:2px;min-width:0;}.cl-mini span{display:none;font-size:12px;color:var(--ink-soft);font-weight:600;}.cl-mini input{padding:8px 10px;}
.r{text-align:right;}.cl-amt{font-weight:600;white-space:nowrap;}
@media(max-width:760px){.cl-ihead{display:none;}.cl-irow{grid-template-columns:minmax(0,1fr) minmax(0,1fr);}.cl-nm{grid-column:1 / -1;}.cl-mini span{display:block;}.cl-amt{text-align:left;}}
.cl-addlib{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;}.cl-addlib select,.cl-addlib input{flex:1 1 240px;min-width:0;width:auto;}
.cl-totals{margin-top:14px;background:var(--bg-deep);border-radius:12px;padding:10px 14px;}.cl-tr{display:flex;justify-content:space-between;gap:12px;padding:4px 0;}.cl-tr.big{border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin:4px 0;padding:8px 0;font-size:1.1em;}
.cl-paper{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px 20px;min-width:0;}
.cl-paper h3{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-size:calc(26px * var(--scale));}.cl-paper h4{margin:14px 0 4px;}.cl-paper p{margin:4px 0;}
.cl-ph{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;border-bottom:1px solid var(--line);padding-bottom:8px;margin-bottom:10px;}.cl-site,.cl-meta{color:var(--ink-soft);font-size:14px;}.cl-meta{text-align:right;}
.cl-tw{overflow-x:auto;max-width:100%;}.cl-tbl{width:100%;border-collapse:collapse;}.cl-tbl th,.cl-tbl td{border-top:1px solid var(--line);padding:8px 6px;text-align:left;vertical-align:top;overflow-wrap:anywhere;}.cl-tbl th{font-size:13px;color:var(--ink-soft);}
.cl-tbl .r{text-align:right;white-space:nowrap;}.cl-tbl tfoot td{font-weight:700;}
.cl-words{white-space:pre-wrap;overflow-wrap:anywhere;font-size:16px;}.cl-words.big{font-size:calc(19px * var(--scale));}
.cl-sigrow{display:flex;gap:16px;align-items:center;flex-wrap:wrap;border-top:1px solid var(--line);margin-top:12px;padding-top:12px;}.cl-sigrow img{max-width:260px;width:100%;height:auto;background:#fff;border-radius:8px;border:1px solid var(--line);}
.cl-signwrap{margin-top:10px;min-width:0;}
.cl-sigbox{display:block;width:100%;height:170px;border:1.5px dashed var(--gold);border-radius:12px;background:var(--bg);touch-action:none;cursor:crosshair;margin-top:6px;}
.cl-fsign{text-align:center;margin-top:20px;}
.cl-top{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 14px;}.cl-top input{flex:1 1 240px;min-width:0;width:auto !important;}
.cl-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;}
.cl-ccard{background:var(--card);border:1px solid var(--line);border-left:4px solid var(--gold);border-radius:14px;padding:14px 16px;min-width:0;}.cl-ccard h3{margin:0 0 4px;overflow-wrap:anywhere;}.cl-ccard p{margin:2px 0;}
.cl-kv{display:grid;grid-template-columns:minmax(0,170px) minmax(0,1fr);gap:6px 14px;margin:0;}.cl-kv dt{color:var(--ink-soft);font-weight:600;}.cl-kv dd{margin:0;overflow-wrap:anywhere;}
@media(max-width:560px){.cl-kv{grid-template-columns:minmax(0,1fr);}.cl-kv dd{margin-bottom:6px;}}
.cl-sums{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:12px;}.cl-sums div{background:var(--bg-deep);border-radius:12px;padding:10px 12px;min-width:0;}.cl-sums span{display:block;font-size:14px;color:var(--ink-soft);}.cl-sums b{font-size:1.25em;}
@media(max-width:560px){.cl-sums{grid-template-columns:minmax(0,1fr);}}
.cl-linked{list-style:none;margin:0;padding:0;}.cl-linked li{display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap;border-top:1px solid var(--line);padding:10px 0;}.cl-linked li:first-child{border-top:0;}
.cl-linked li > span{min-width:0;flex:1 1 220px;}.cl-linked b{display:block;}.cl-linked small{color:var(--ink-soft);}
.cl-bcard{display:flex;justify-content:space-between;gap:14px;align-items:center;flex-wrap:wrap;background:var(--card);border:1px solid var(--line);border-left:4px solid var(--gold);border-radius:16px;padding:16px 18px;margin:0 0 14px;}.cl-bcard h3{margin:0 0 4px;}
.cl-bcard.due{border-left-color:var(--danger);}
.cl-steps{margin:0;padding-left:22px;}.cl-steps li{margin:0 0 10px;}.cl-steps h4{margin:0 0 2px;}.cl-steps p{margin:0;}
.cl-scramble{font-family:ui-monospace,Menlo,monospace;font-size:14px;overflow-wrap:anywhere;background:var(--bg-deep);border-radius:10px;padding:10px 12px;color:var(--ink-soft);}
.cl-home{margin-top:14px;}.cl-home h3{margin:0;}
`;
(function(){ const s = document.createElement('style'); s.id = 'cl-css'; s.textContent = CSS; document.head.appendChild(s); })();

// ---------- the API ----------
const API = window.GGCli = {
  init(ctx){ C = ctx || {}; },
  view,
  // The weekly Back Up Now card on the Staff and Founder Home, with gentle check-ins and the monthly USB reminder.
  homeCard(){
    if (!isStaff() || !D()) return '';
    const B = cfg().backup, st = store(), d = D(), n = daysSince(d.lastBackup), due = n === null || n >= 7;
    const usbDue = st.usb.on && (!st.usb.last || (dOf(st.usb.last) && (Date.now() - dOf(st.usb.last)) / 864e5 >= 30));
    const rem = st.rem.filter(r => !r.done && r.date && r.date <= addDays(today(), 2));
    return `<div class="cl-bcard cl-home${due ? ' due' : ''}"><div style="min-width:0;flex:1 1 260px"><h3>${due ? 'Time for Your Weekly Backup' : esc(B.cardTitle)}</h3><p class="muted" style="margin:2px 0 0">${esc(bkLine())} ${due ? 'Save it to your cloud folder when it downloads.' : 'Next one by ' + esc(nice(addDays(isoOf(new Date(d.lastBackup)), 7))) + '.'}</p>
      ${usbDue ? `<p style="margin:6px 0 0"><b>Once a month:</b> copy your latest backup to a USB drive. <button type="button" class="linkbtn" data-cla="usb-done">Done</button></p>` : ''}
      <p style="margin:6px 0 0"><button type="button" class="linkbtn" data-cla="home-bk">How to save it to a cloud folder</button></p></div>
      <button type="button" class="btn btn-gold" data-act="export">${esc(B.cardTitle)}</button></div>
      ${rem.length ? `<div class="card fw-home" style="margin-top:14px"><h3>Gentle Check-ins</h3>${rem.map(r => `<div class="fw-list-r"><div class="m"><b>${esc(r.name)}</b> <span class="muted">from a first conversation</span><br><small class="muted">${esc(nice(r.date))}</small></div><button type="button" class="btn btn-line btn-sm" data-cla="rem-done" data-clv="${esc(r.id)}">Done</button></div>`).join('')}</div>` : ''}`;
  },
  // A small card on a People record that belongs to a client file.
  personCard(p){
    if (!isStaff() || !D() || !p) return '';
    const f = files().find(x => x.pid === p.id || x.id === p.cli); if (!f) return '';
    return `<div class="card" style="margin-bottom:14px;border-left:4px solid var(--gold)"><div class="spread"><div><b>Client File</b> <span class="muted">${esc(fTitle(f))}: services, the signed agreement, payments, and invoices.</span></div><button type="button" class="btn btn-line btn-sm" data-cla="file" data-clv="${esc(f.id)}">Open</button></div></div>`;
  },
  // A link back to the client file, for the Farewell Plan and The Grounded Marriage headers.
  // GWG BLD 769: the writing assistant yes from a client file, for the Farewell Planning Session.
  wa(id){ const f = D() ? fileOf(id) : null; return f && f.privacy && f.privacy.wa && f.privacy.wa.ans ? Object.assign({}, f.privacy.wa) : null; },
  link(id){ const f = isStaff() && D() ? fileOf(id) : null; return f ? `<button type="button" class="linkbtn" data-cla="file" data-clv="${esc(f.id)}">Client File: ${esc(fTitle(f))}</button>` : ''; },
  // Backups: files and reminders combine; the newest copy of each wins and deleted files stay deleted.
  merge(out, inc){
    out.deleted = out.deleted || {clients: {}, sessions: {}}; out.deleted.cli = out.deleted.cli || {};
    Object.entries((inc.deleted || {}).cli || {}).forEach(([id, ts]) => { out.deleted.cli[id] = Math.max(out.deleted.cli[id] || 0, ts); });
    const o = out.cli = out.cli || {}, i = inc.cli || {}; o.files = arr(o.files); o.rem = arr(o.rem); let added = 0, updated = 0;
    arr(i.files).forEach(x => { const k = o.files.findIndex(y => y.id === x.id); if (k < 0){ o.files.push(x); added++; } else if ((x.u || 0) > (o.files[k].u || 0)){ o.files[k] = x; updated++; } });
    o.files = o.files.filter(x => !(out.deleted.cli[x.id] && out.deleted.cli[x.id] >= (x.u || 0)));
    arr(i.rem).forEach(x => { const k = o.rem.findIndex(y => y.id === x.id); if (k < 0) o.rem.push(x); else if ((x.u || 0) > (o.rem[k].u || 0)) o.rem[k] = x; });
    o.seq = Math.max(+o.seq || 1000, +i.seq || 1000);
    if (i.irs && (!o.irs || (i.irs.u || 0) > (o.irs.u || 0))) o.irs = i.irs;
    if (i.usb && (!o.usb || (i.usb.u || 0) > (o.usb.u || 0))) o.usb = i.usb;
    if (i.cloud && !o.cloud) o.cloud = i.cloud;
    return {added, updated};
  },
  // GWG BLD 770: every client payment, read live by Books (books.js, Founders) as income.
  payments(){ return D() ? files().flatMap(f => arr(f.pays).map(p => ({id: p.id, date: p.date, amt: +p.amt || 0, what: p.what || '', method: p.method || '', ref: p.ref || '', file: f.id, name: fTitle(f)}))) : []; },
  // Open the tab at a section (Home's Back Up link, the People card).
  open(sec, id){ S.sec = sec || 'files'; if (sec === 'files') S.fileId = id || null; if (C.go) C.go('cli'); },
  // For tests and the lead.
  state: S, cfg, files, calc, libRates, agreementText, invoiceText, fill, DEF, irs,
  famWin: null, last: null, lastCopy: null, lastLink: null, noOpen: false
};
document.addEventListener('click', e => { const t = e.target.closest && e.target.closest('[data-cla="home-bk"]'); if (!t || !D()) return; e.stopPropagation(); API.open('backup'); }, true);
})();
