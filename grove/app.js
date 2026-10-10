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
Object.assign(ICON, {
 lock:`<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1.2" fill="currentColor"/>`,
 gear:`<circle cx="12" cy="12" r="3"/><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M5.5 18.5l1.8-1.8M16.7 7.3l1.8-1.8"/>`,
 plan:`<path d="M6 3.5h9l3 3V20.5H6z"/><path d="M9 10h6M9 13.5h6M9 17h4"/>`,
 circle:`<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="6.6" r="1.5"/><circle cx="17" cy="14.6" r="1.5"/><circle cx="7" cy="14.6" r="1.5"/>`
});
// =====================================================================
// THE GROVE . WHERE OUR TREES GROW TOGETHER
// Rebrand Session 5, rebuilt for families and groups in Grove 1: The App (GWG BLD 770).
// Your tree is yours. The grove is ours.
//
// A device holds up to six groves, each with its own kind (Family, Classroom, Faith Community,
// Small or Discussion Group, Team or Workplace), name, words, and lock. Words for each kind,
// the Group Check-in questions, results, plan words, and the practices per kind live in
// grove/kinds.js (window.GROVE_KINDS); the earlier household practices stay in grove/together.js.
//
// The Group Check-in keeps one shared answer per question, talked over together (with We See It
// Differently and Pass). No one's own answer is ever entered, counted, or saved. Results are words
// only: Shared Strengths, Steady, Growing Edges. An internal level per part lets seasons compare;
// it is never shown, printed, or exported.
//
// The check-ins, the Growth Plan, What's Changed Lately, and Who's in Our Circle are locked with
// the grove passcode (on by default): PBKDF2 (250,000 rounds, SHA-256) and AES-GCM, the passcode
// never stored. The Wall, practices done together, and the grove's name and kind stay readable on
// this device, as before.
// Root Words (GWG BLD 780, shared/gg-rootwords.js): a grove's locked part has its own random key,
// locked twice: with the grove passcode (lock.wrap, PBKDF2 with lock.salt, then AES-GCM) and with the
// grove's 12 Root Words (lock.rw). Either one opens it. The words are kept only inside the locked part
// (rootWords), shown once when the passcode is chosen, and again in Settings after the passcode.
// A grove locked before has only lock.salt; it opens with its passcode and moves to the two-lock way.
// Forgot the passcode: Use Our Root Words sets a new passcode and keeps everything. A gentle note, once
// per grove (ks.first), after the first check-in: Save a Backup and keep the Root Words safe.
//
// What The Grove can see of a person (Family groves): each person's name, picture, age, and, if
// their "Show my growth on The Grove" switch is on, the big picture of their growth. Never answers,
// levels, notes, or journals. A grown-up also sees a quiet alert when a teen's check-in asked for
// a caring conversation, never the answers.
//
// Saved on this device only (gg-grove-v2). The household grove from before (gg-grove-family-v1)
// is read forward as a Family grove and left in place, so older backups still load.
//
// Engagement guardrails (on purpose): no badges or unread counts, no endless scroll, reactions show
// who, never totals, no streaks, growth only adds, nothing ever counts against a group.
// =====================================================================
const { stageOf, skyNow } = window.GGScene;
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const T = window.GROVE_TOGETHER || { practices: [], featured: [], themes: [] };
const PARTS6 = [
  { key:'roots', name:'Roots', sub:'What grounds us', color:'#8E5A2B' },
  { key:'trunk', name:'Trunk', sub:'Purpose', color:'#C27A1E' },
  { key:'bark', name:'Bark', sub:'Mind and feelings', color:'#6E5BB5' },
  { key:'branches', name:'Branches', sub:'Relationships', color:'#1F8A8F' },
  { key:'leaves', name:'Leaves', sub:'Body', color:'#3A9B58' },
  { key:'fruit', name:'Fruit', sub:'Hope', color:'#D9483F' }];
const PNAME = Object.fromEntries(PARTS6.map(p => [p.key, p.name]));
const TOOL = { adult:{ name:'Oak', href:'/oak/' }, pine:{ name:'Pine', href:'/pine/' }, birch:{ name:'Birch', href:'/birch/' }, aspen:{ name:'Aspen', href:'/aspen/' }, maple:{ name:'Maple', href:'/maple/' }, sequoia:{ name:'Sequoia', href:'/sequoia/' } };
const ADULT_TREES = ['sequoia', 'birch'];
const adultTree = p => { if (!p || p.age !== 'adult') return ''; if (ADULT_TREES.includes(p.tree)) return p.tree; const t = ((p.shared || {}).tree || {}).tool; return ADULT_TREES.includes(t) ? t : ''; };
const toolOf = x => { const p = x && typeof x === 'object' ? x : null, age = p ? p.age : x;
  if (p && adultTree(p)) return TOOL[adultTree(p)];
  return TOOL[age] || TOOL.adult; };
const stageFor = p => stageOf(p.age, adultTree(p));
const REACTS = [['love','❤️','Love'], ['proud','🌟','Proud of you'], ['hug','🤗','Hug'], ['thanks','🙏','Thank you'], ['ha','😄','Ha']];
const KINDS = typeof TREE_KINDS !== 'undefined' ? TREE_KINDS : [{ id:'grove', name:'Grove tree', days:0 }];
const SCENES = typeof SCENERY !== 'undefined' ? SCENERY : [{ id:'forest', name:'Forest', days:0 }];
const VISITORS = typeof CRITTERS !== 'undefined' ? CRITTERS : [];

/* ---------- the kinds of grove, and their words (grove/kinds.js, with defaults here) ---------- */
const GK = window.GROVE_KINDS || {};
const KIND_IDS = ['family', 'classroom', 'faith', 'group', 'team'];
const KDEF = {
  family: { name:'Family', long:'Family', fits:'A household, or a family across homes. Also a family in a hard season.', namePrompt:'What do you call your family grove?', nameExample:'The Rivera Family',
    we:'our family', We:'Our family', checkin:'Family Check-in', plan:'Our Family Growth Plan', leader:'a grown-up', time:'10 to 20 minutes', faith:'faith', wall:true, trees:true },
  classroom: { name:'Classroom', long:'Classroom', fits:'A class, homeroom, homeschool co-op, after-school or youth program.', namePrompt:'What do you call your class grove?', nameExample:'Room 12',
    we:'our class', We:'Our class', checkin:'Class Check-in', plan:'Our Class Plan', leader:'the teacher', time:'about 10 minutes, as a circle', faith:'plain', wall:false, trees:false },
  faith: { name:'Faith Community', long:'Faith Community', fits:'A congregation, Sunday school or study class, youth group, or ministry team.', namePrompt:'What do you call your community grove?', nameExample:'Wednesday Night Fellowship',
    we:'our community', We:'Our community', checkin:'Group Check-in', plan:'Our Group Growth Plan', leader:'the leader', time:'15 to 30 minutes', faith:'faith', wall:false, trees:true },
  group: { name:'Small Group', long:'Small or Discussion Group', fits:'A support group, a book or study group, or a residents’ group.', namePrompt:'What do you call your group?', nameExample:'Thursday Caregivers',
    we:'our group', We:'Our group', checkin:'Group Check-in', plan:'Our Group Growth Plan', leader:'the leader', time:'15 to 30 minutes', faith:'ask', wall:false, trees:true },
  team: { name:'Team', long:'Team or Workplace', fits:'A hospice or hospital team, church staff, school staff, or a nonprofit team.', namePrompt:'What do you call your team grove?', nameExample:'North Hospice Team',
    we:'our team', We:'Our team', checkin:'Team Check-in', plan:'Our Team Plan', leader:'the team lead', time:'10 to 15 minutes', faith:'plain', wall:false, trees:false }
};
function KW(kind) { const k = kind || (G && G.kind) || 'family'; return Object.assign({}, KDEF[k] || KDEF.family, ((GK.kinds || {})[k]) || {}); }
const CHANGES_DEF = {
  family: ['A New Baby', 'A Move', 'An Illness', 'A Death', 'A New School', 'A Job Change', 'Someone New Joined Us', 'Money Is Tight', 'Nothing Big'],
  classroom: ['Someone New Joined Our Class', 'Someone Left', 'A Hard Week', 'A Loss in Our School', 'A Big Change in Routine', 'Nothing Big'],
  faith: ['Someone New Joined', 'Someone Left', 'A Loss', 'An Illness', 'A Change in Leaders', 'A Disagreement', 'Nothing Big'],
  group: ['Someone New Joined', 'Someone Left', 'A Loss', 'An Illness', 'A Change in Leaders', 'A Disagreement', 'Nothing Big'],
  team: ['A Hard Death', 'A Change in Leaders', 'Someone New Joined', 'Someone Left', 'A Heavy Season of Work', 'Nothing Big']
};
const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 24);
function changesFor(kind) { const g = (GK.changes || {})[kind]; return Array.isArray(g) && g.length ? g : CHANGES_DEF[kind].map(l => ({ id: l === 'Nothing Big' ? 'none' : slug(l), label: l })); }

/* Questions: four per part, question 1 is the quick one and never reverse, question 4 is the one gentle reverse.
   These Family drafts are the plan's (docs/grove-plan.md Section 3); grove/kinds.js gives each kind its own. */
const QDEF = { family: {
  roots: [{ q:'We have moments that steady us as a family, even on busy days.', kid:'Do we have calm times together?' },
    { q:'We share something that feels sacred or deeply meaningful to us: prayer, worship, a blessing, quiet, time outside, or our own traditions.', plain:'We share something that feels deeply meaningful to us: quiet, thanks, time outside, or our own traditions.', kid:'Do we have family traditions, or a faith, that feel special to us?' },
    { q:'We say thank you out loud for what we have.' },
    { q:'Faith or big questions have felt like a strain between us lately.', plain:'Big questions about what matters most have felt like a strain between us lately.', rev:true, tip:'Listen first. This is about what feels heavy, never about who is right.' }],
  trunk: [{ q:'We know what matters most to our family.' }, { q:'We do something good together for others: helping a neighbor, serving, or giving.' }, { q:'Everyone has a part at home that matters, even the youngest.' }, { q:'Our days are so full that what matters most gets crowded out.', rev:true }],
  bark: [{ q:'In our family it’s okay to say how we really feel.' }, { q:'When someone is upset, we know how to help each other calm down.' }, { q:'After an argument, we find our way back to each other.' }, { q:'Our home has felt tense or on edge lately.', rev:true }],
  branches: [{ q:'We tell each other what we appreciate.' }, { q:'We spend time together that we enjoy, with screens set aside.' }, { q:'When there’s a problem, we work it out together and everyone gets a say.' }, { q:'Lately we pass each other more than we spend time together.', rev:true }],
  leaves: [{ q:'Our daily rhythm helps everyone get enough rest.', strand:'rest' }, { q:'We move together in ways every body can: walks, play, dancing, or stretching.', strand:'move' }, { q:'We share meals together most days.', strand:'nourish' }, { q:'Our schedule leaves us running on empty.', rev:true, strand:'rest' }],
  fruit: [{ q:'We look forward to things together.' }, { q:'We celebrate good moments, big and small.' }, { q:'When something hard happens, we believe we’ll get through it together.' }, { q:'Lately it has been hard for our family to see the good.', rev:true }]
} };
function questionsFor(kind) {
  const g = (GK.questions || {})[kind] || (GK.questions || {}).family || QDEF.family;
  const out = {}; PARTS6.forEach(p => { out[p.key] = ((g[p.key] || QDEF.family[p.key]) || []).slice(0, 4); }); return out;
}
// The order a check-in runs: every part in turn, or question 1 of each part for the quick check-in.
function qList(kind, quick) {
  const Q = questionsFor(kind), out = [];
  PARTS6.forEach(p => (Q[p.key] || []).forEach((q, i) => { if (!quick || i === 0) out.push({ part: p.key, i, key: p.key + '.' + i, q }); }));
  return out;
}
const ANSWERS = [['n', 'Not Yet'], ['s', 'Sometimes'], ['o', 'Often'], ['a', 'Almost Always']];
const ASPECIAL = [['d', 'We See It Differently'], ['p', 'Pass']];
const ANAME = Object.fromEntries(ANSWERS.concat(ASPECIAL));
const LEVEL = { strength: 'Shared Strength', steady: 'Steady', edge: 'Growing Edge' };
const CIRCLE = [
  ['little', 'Little Ones', []], ['moving', 'Someone Who Moves Differently or Uses a Wheelchair', ['moving']], ['hearing', 'Deaf or Hard of Hearing', ['hearing']],
  ['seeing', 'Blind or Low Vision', ['seeing']], ['memory', 'Memory Loss', ['memory']], ['autism', 'Autism or Sensory Needs', ['autism']],
  ['serious', 'Serious Illness', ['serious', 'health']], ['close', 'Someone Grieving', ['close']]];
const ANCHORS_DEF = {
  family: ['Dinner', 'The Car', 'Bedtime', 'Saturday Morning', 'Breakfast', 'A Walk Together'],
  classroom: ['Morning Meeting', 'After Lunch', 'The End of the Day', 'Friday Circle'],
  faith: ['Before We Gather', 'After Worship', 'Our Weekly Gathering', 'A Shared Meal'],
  group: ['Opening Our Time', 'Closing Our Time', 'Our Weekly Gathering'],
  team: ['Team Huddle', 'Shift Change', 'Our Weekly Meeting', 'Lunch']
};
const W = (path, dflt) => { let o = GK; for (const k of path.split('.')) { if (o == null || typeof o !== 'object') return dflt; o = o[k]; } return o == null || o === '' ? dflt : o; };
const Wk = (v, kind) => v && typeof v === 'object' ? (v[kind] || v.family || '') : (v || '');
const fill = (s, o) => String(s || '').replace(/\{(\w+)\}/g, (m, k) => o[k] != null ? o[k] : m);

/* ---------- practices: the household practices (grove/together.js) and each kind's (grove/kinds.js) ---------- */
const EXK = GK.existingKinds || {};
const ALLP = T.practices.map(p => Object.assign({}, p, { kinds: (EXK[p.id] || p.kinds || ['family']).slice() }))
  .concat((GK.practices || []).filter(p => p && p.id && PNAME[p.part] && !T.practices.some(x => x.id === p.id)).map(p => Object.assign({ kinds: ['family'] }, p)))
  // Together practices new with When Life Changes Together (grove/guides.js, GWG BLD 774)
  .concat(((window.GROVE_GUIDES || {}).practices || []).filter(p => p && p.id && PNAME[p.part] && !T.practices.some(x => x.id === p.id) && !(GK.practices || []).some(x => x.id === p.id)).map(p => Object.assign({ kinds: ['family'] }, p)));
const TP = Object.fromEntries(ALLP.map(p => [p.id, p]));

/* ---------- dates ---------- */
const pad = n => String(n).padStart(2, '0');
const dstr = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const today = () => dstr(new Date());
const parse = s => { const p = String(s).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); };
const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return dstr(d); };
const between = (a, b) => Math.round((parse(b) - parse(a)) / 864e5);
const nice = s => parse(s).toLocaleDateString(undefined, { weekday:'short', month:'short', day:'numeric' });
const longDate = s => parse(s).toLocaleDateString(undefined, { month:'long', day:'numeric', year:'numeric' });
const weekStart = s => { const d = parse(s), k = (d.getDay() + 6) % 7; d.setDate(d.getDate() - k); return dstr(d); };
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* ---------- the groves, saved on this device ---------- */
const STORE2 = 'gg-grove-v2', STORE = 'gg-grove-family-v1', OLD = 'the-grove-v1', MAX_GROVES = 6;
const blankGrove = (kind, name) => ({ v:2, id: uid(), u: Date.now(), kind: kind || 'family', name: name || '', made: today(), start: today(),
  wall: [], reacts: {}, done: {}, grew: {}, kinds: {}, scenery: 'forest', seen: {}, intro: false, family: [], famGone: {}, miles: {}, gone: {},
  faith: (KDEF[kind || 'family'] || {}).faith === 'plain' ? 'plain' : 'faith', school: '', hard: false, line: null, children: false, kidsFirst: false,
  wallOn: !!(KDEF[kind || 'family'] || {}).wall, lockOn: true, lock: null, box: null, boxU: 0, plainBox: null });
let ROOT = { v:2, active: null, groves: [], gone: {}, scale: 1, v1seen: '' };
let G = null;
function load() {
  let j = null; try { j = JSON.parse(localStorage.getItem(STORE2) || 'null'); } catch (e) {}
  if (j && Array.isArray(j.groves)) ROOT = Object.assign(ROOT, j);
  // The household grove from before reads forward as a Family grove (and again whenever an older backup refills it).
  let v1s = null; try { v1s = localStorage.getItem(STORE); } catch (e) {}
  if (v1s && v1s !== ROOT.v1seen) {
    let v1 = null; try { v1 = JSON.parse(v1s); } catch (e) {}
    if (v1 && v1.v) {
      const have = ROOT.groves.find(g => g.id === v1.id);
      if (have) { const keep = { kind: have.kind, name: have.name, lock: have.lock, box: have.box, boxU: have.boxU, plainBox: have.plainBox, lockOn: have.lockOn };
        const m = deepMerge(have, v1), gone = Object.assign({}, have.gone || {}, v1.gone || {});
        m.wall = (m.wall || []).filter(x => !gone[x.id]); m.gone = gone; delete m.scale; Object.assign(have, m, keep, { v: 2 }); }
      else if (ROOT.groves.length < MAX_GROVES) { const g = Object.assign(blankGrove('family', 'Our Family Grove'), v1, { v: 2, kind: 'family', name: 'Our Family Grove', u: Date.now() });
        if (!g.id) g.id = uid(); delete g.scale; ROOT.groves.push(g); if (v1.scale && ROOT.scale === 1) ROOT.scale = v1.scale; }
      ROOT.v1seen = v1s;
    }
  }
  if (!ROOT.groves.length) { try { const o = JSON.parse(localStorage.getItem(OLD) || 'null'); if (o && o.scale) ROOT.scale = o.scale; } catch (e) {} }
  ROOT.groves = ROOT.groves.filter(g => g && g.id && !(ROOT.gone[g.id] >= (g.u || 0)));
  G = ROOT.groves.find(g => g.id === ROOT.active) || ROOT.groves[0] || null;
  if (G) { ROOT.active = G.id; fixGrove(G); }
  if (ROOT.groves.length && JSON.stringify(ROOT) !== JSON.stringify(j)) persist();
}
// The same merge as the backup (shared/gg-backup.js): lists combine by id, the newer entry (u) wins, nothing is lost.
function deepMerge(cur, inc) {
  if (cur === undefined || cur === null) return inc;
  if (inc === undefined || inc === null) return cur;
  const idOf = x => x && typeof x === 'object' && x.id != null ? 'id:' + x.id : 'j:' + JSON.stringify(x);
  if (Array.isArray(cur) && Array.isArray(inc)) { const seen = {}, out = [];
    cur.forEach(x => { seen[idOf(x)] = out.length; out.push(x); });
    inc.forEach(x => { const k = idOf(x); if (seen[k] === undefined) { seen[k] = out.length; out.push(x); } else if (x && typeof x === 'object' && (x.u || 0) > ((out[seen[k]] || {}).u || 0)) out[seen[k]] = x; });
    return out; }
  if (typeof cur === 'object' && typeof inc === 'object' && !Array.isArray(cur) && !Array.isArray(inc)) { const o = Object.assign({}, cur); Object.keys(inc).forEach(k => { o[k] = deepMerge(cur[k], inc[k]); }); return o; }
  return cur;
}
function fixGrove(g) { const b = blankGrove(g.kind, g.name); Object.keys(b).forEach(k => { if (g[k] === undefined) g[k] = b[k]; }); if (!KDEF[g.kind]) g.kind = 'family'; }
function persist() { try { localStorage.setItem(STORE2, JSON.stringify(ROOT)); return true; } catch (e) { return false; } }
function save() { if (G) G.u = Date.now(); if (!persist()) toast('Saving did not work in this browser.'); }
function toast(m) { if (window.GGP && GGP.toast) GGP.toast(m); else { const t = document.createElement('div'); t.className = 'gv-toast'; t.setAttribute('role', 'status'); t.textContent = m; document.body.appendChild(t); setTimeout(() => t.remove(), 2600); } }
const isFamily = () => G && G.kind === 'family';
const hasTrees = () => G && KW().trees;
// Classroom groves in a public school are Plain, locked. Team starts Plain. Everyone else follows the grove's choice.
const plainMode = () => !G || G.faith === 'plain' || (G.kind === 'classroom' && G.school !== 'faith');
// Children Take Part (Family, Classroom, Faith Community, Small Group): kid lines show, following the kids' faith rules.
const kidsOn = () => !!(G && G.kind !== 'team' && G.children);

/* ---------- the grove lock (the passcode never leaves the device and is never stored) ---------- */
const subtle = window.crypto && crypto.subtle, TE = new TextEncoder(), TD = new TextDecoder();
const b64 = u => { let s = ''; for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); };
const unb64 = s => { const b = atob(s), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; };
function deriveKey(pass, salt) {
  return subtle.importKey('raw', TE.encode(pass), 'PBKDF2', false, ['deriveKey']).then(base =>
    subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 250000, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']));
}
const KEYS = {};            // grove id: key, while open (memory only)
const RAWS = {};            // grove id: the locked part's own key bytes, while open (memory only, GWG BLD 780)
const VAULTS = {};          // grove id: the open locked data (memory only)
const blankVault = () => ({ checkins: [], plan: null, plans: [], circle: [], changes: [], notes: '' });
function vaultOpen() { return !!(G && VAULTS[G.id]); }
function V() { return G ? VAULTS[G.id] : null; }
function sealVault() {
  if (!G || !VAULTS[G.id]) return Promise.resolve();
  const data = VAULTS[G.id];
  if (!G.lockOn) { G.plainBox = data; G.box = null; G.boxU = Date.now(); save(); return Promise.resolve(); }
  const k = KEYS[G.id]; if (!k) return Promise.resolve();
  const iv = crypto.getRandomValues(new Uint8Array(12)), gid = G.id;
  return subtle.encrypt({ name: 'AES-GCM', iv }, k, TE.encode(JSON.stringify(data))).then(ct => {
    const g = ROOT.groves.find(x => x.id === gid); if (!g) return;
    g.box = { iv: b64(iv), ct: b64(new Uint8Array(ct)) }; g.boxU = Date.now(); g.plainBox = null; save();
  });
}
function lockNow() { if (G) { delete KEYS[G.id]; delete VAULTS[G.id]; delete RAWS[G.id]; } S.ci = null; S.pd = null; }
// Opens the locked part of this grove: asks for the passcode, or to choose one the first time.
function unlock(reason) {
  if (!G) return Promise.resolve(false);
  if (vaultOpen()) return Promise.resolve(true);
  if (!G.lockOn) { VAULTS[G.id] = Object.assign(blankVault(), G.plainBox || {}); return Promise.resolve(true); }
  if (!subtle) { alert('This browser cannot lock The Grove. Try another browser.'); return Promise.resolve(false); }
  if (!G.lock || !G.box) return choosePass(reason);
  const gid = G.id;
  function attempt(msg) {
    return passDialog({ title: 'Unlock ' + (G.name || 'This Grove'), lead: (reason ? reason + ' ' : '') + 'Enter your grove passcode. The check-ins, the plan, and the circle choices are locked with it.', fields: [['p', 'Grove passcode']], ok: 'Unlock', err: msg, forgot: true })
      .then(v => {
        if (!v) return false;
        if (v === 'forgot') return forgotPass();
        return openWithPass(gid, v.p).then(() => true, () => attempt('That passcode does not open this grove. Try again.'));
      });
  }
  return attempt('');
}
const rawKey = raw => subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
function openBox(gid, k) { const g = ROOT.groves.find(x => x.id === gid); return subtle.decrypt({ name: 'AES-GCM', iv: unb64(g.box.iv) }, k, unb64(g.box.ct)).then(pt => Object.assign(blankVault(), JSON.parse(TD.decode(pt)))); }
// The passcode opens the grove's own key (lock.wrap). A grove locked before Root Words is opened the old way, then moved over.
function openWithPass(gid, pass) {
  const g = ROOT.groves.find(x => x.id === gid);
  return deriveKey(pass, unb64(g.lock.salt)).then(pk => {
    if (g.lock.wrap) return subtle.decrypt({ name: 'AES-GCM', iv: unb64(g.lock.wrap.iv) }, pk, unb64(g.lock.wrap.ct)).then(r => {
      const raw = new Uint8Array(r); return rawKey(raw).then(k => openBox(gid, k).then(d => { KEYS[gid] = k; RAWS[gid] = raw; VAULTS[gid] = d; }));
    });
    return openBox(gid, pk).then(d => {
      const raw = crypto.getRandomValues(new Uint8Array(32)), iv = crypto.getRandomValues(new Uint8Array(12));
      return subtle.encrypt({ name: 'AES-GCM', iv }, pk, raw).then(ct => rawKey(raw).then(k => {
        g.lock = { salt: g.lock.salt, wrap: { iv: b64(iv), ct: b64(new Uint8Array(ct)) } };
        KEYS[gid] = k; RAWS[gid] = raw; VAULTS[gid] = d;
        const was = G; G = g; return sealVault().then(() => { G = was; });
      }));
    });
  });
}
function choosePass(reason, keep) {
  const gid = G.id;
  return passDialog({ title: keep ? 'Choose a New Grove Passcode' : 'Choose a Grove Passcode', lead: (reason ? reason + ' ' : '') + 'The check-ins, the plan, and the circle choices are locked with this passcode, on this device only. Grow With Grounded never sees it and cannot recover it. Share it only with the people who lead this grove.' + (keep ? '' : ' Next you get 12 Root Words that open the grove if the passcode is ever forgotten.'),
    fields: [['p1', 'Grove passcode'], ['p2', 'Passcode again']], ok: 'Lock This Grove', check: v => v.p1.length < 6 ? 'Use at least 6 characters.' : v.p1 !== v.p2 ? 'The two passcodes are different.' : '' })
    .then(v => { if (!v) return false; return setPass(gid, v.p1, null, keep).then(() => true); });
}
/* ---------- Root Words for a grove (GWG BLD 780) ---------- */
let rootP = null;
function needRoot() {
  if (window.GGRoot) return Promise.resolve(window.GGRoot);
  if (!rootP) rootP = new Promise((ok, no) => { const s = document.createElement('script'); s.src = '/shared/gg-rootwords.js?v=b780'; s.onload = () => window.GGRoot ? ok(window.GGRoot) : (rootP = null, no(new Error('load'))); s.onerror = () => { rootP = null; s.remove(); no(new Error('load')); }; document.head.appendChild(s); });
  return rootP;
}
function rootShowG(g, words, again) {
  return needRoot().then(R => R.show({ words, who: g.name || 'Our Grove', again, title: 'Root Words for ' + (g.name || 'This Grove'),
    lead: 'If the grove passcode is ever forgotten, these 12 words open the check-ins and the plan again, so a new passcode can be chosen. Keep them with the grove passcode, and share them only with the people who lead this grove.' }), () => {});
}
// keep: the grove's key and Root Words stay (Change the Passcode, or after Use Our Root Words); otherwise a new key and new Root Words.
function setPass(gid, pass, data, keep) {
  const g = ROOT.groves.find(x => x.id === gid); if (!g) return Promise.resolve();
  const same = keep && RAWS[gid] && g.lock && g.lock.rw;
  const raw = same ? RAWS[gid] : crypto.getRandomValues(new Uint8Array(32));
  const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
  let words = null;
  return deriveKey(pass, salt).then(pk => subtle.encrypt({ name: 'AES-GCM', iv }, pk, raw)).then(ct => rawKey(raw).then(k => {
    const vault = Object.assign(blankVault(), data || VAULTS[gid] || g.plainBox || {});
    const lock = { salt: b64(salt), wrap: { iv: b64(iv), ct: b64(new Uint8Array(ct)) } };
    if (same) lock.rw = g.lock.rw;
    KEYS[gid] = k; RAWS[gid] = raw; VAULTS[gid] = vault;
    if (same) return lock;
    return needRoot().then(R => { words = R.make(); return R.wrap(raw, words).then(rw => { lock.rw = rw; vault.rootWords = words.join(' '); return lock; }); }, () => { delete vault.rootWords; return lock; });
  })).then(lock => {
    g.lock = lock; g.lockOn = true; const was = G; G = g; return sealVault().then(() => { G = was; });
  }).then(() => words ? rootShowG(g, words, false) : null);
}
// Forgot the passcode: Use Our Root Words first; or start the locked part fresh, as before.
function forgotPass() {
  const g = G, gid = G.id, has = !!(g.lock && g.lock.wrap && g.lock.rw);
  const fresh = () => {
    if (!confirm('Without the passcode or the Root Words, the locked check-ins and plan of this grove cannot be opened by anyone. Start this grove\'s locked part fresh with a new passcode? The Wall and practices stay.')) return false;
    g.box = null; g.lock = null; g.boxU = Date.now(); delete VAULTS[gid]; delete KEYS[gid]; delete RAWS[gid]; save(); return choosePass('').then(ok => { render(); return ok; });
  };
  if (!has) return Promise.resolve(fresh());
  let raw = null;
  return needRoot().then(R => R.ask({ title: 'Use Our Root Words', lead: 'Type the grove\'s 12 Root Words in order. Capital letters and extra spaces do not matter, and the first four letters of each word are enough. No Root Words? Choose Cancel, then start the locked part fresh.',
    verify: words => R.unwrap(g.lock.rw, words).then(r => { raw = r; return true; }, () => 'Those Root Words do not open this grove. Check the order and try again.') }), () => null)
    .then(words => {
      if (!words || !raw) return fresh();
      return rawKey(raw).then(k => openBox(gid, k).then(d => { KEYS[gid] = k; RAWS[gid] = raw; VAULTS[gid] = d; }))
        .then(() => choosePass('The Root Words opened the grove. Everything stays, the Root Words still work, and the old passcode stops working.', true))
        .then(ok => { if (!ok) { delete KEYS[gid]; delete VAULTS[gid]; delete RAWS[gid]; return false; } toast('New grove passcode saved. The Root Words still work.'); render(); return true; });
    });
}
// Settings: the grove passcode first, then the Root Words (made now for a grove locked before).
function seeRoot() {
  const g = G, gid = G.id; if (!g || !g.lockOn || !g.lock) return;
  function attempt(msg) {
    return passDialog({ title: 'Root Words for ' + (g.name || 'This Grove'), lead: 'Enter the grove passcode first, so only the people who lead this grove see them.', fields: [['p', 'Grove passcode']], ok: 'Continue', err: msg })
      .then(v => {
        if (!v) return;
        return openWithPass(gid, v.p).then(() => {
          const vault = VAULTS[gid];
          if (vault.rootWords && g.lock.rw) return rootShowG(g, vault.rootWords.split(' '), true);
          return needRoot().then(R => { const words = R.make(); return R.wrap(RAWS[gid], words).then(rw => { g.lock.rw = rw; vault.rootWords = words.join(' '); const was = G; G = g; return sealVault().then(() => { G = was; return rootShowG(g, words, false); }); }); }, () => toast('Root Words could not load. Check the connection.'));
        }, () => attempt('That passcode does not open this grove. Try again.'));
      });
  }
  return attempt('').then(() => render());
}
function keepSafeNote(g) {
  if (!g || (g.ks && g.ks.first)) return;
  g.ks = Object.assign({}, g.ks, { first: today() }); save();
  setTimeout(() => needRoot().then(R => R.remind({ lead: 'Your first check-in together is saved.', wordsLabel: g.lockOn ? 'See Our Root Words' : 'Turn the Lock On', onBackup: () => { if (window.GGBackupGo) GGBackupGo('make'); }, onWords: () => { if (g.lockOn) seeRoot(); else { S.tab = 'settings'; render(); } } }), () => {}), 700);
}
function passDialog(o) {
  return new Promise(resolve => {
    const back = document.createElement('div'); back.className = 'gv-modal-back';
    back.innerHTML = `<div class="gv-modal" role="dialog" aria-modal="true" aria-labelledby="gv-pd-h"><h2 id="gv-pd-h">${esc(o.title)}</h2><p>${esc(o.lead)}</p>`
      + o.fields.map(f => `<label class="lbl" for="gv-pd-${f[0]}">${esc(f[1])}</label><input class="gv-input" type="password" id="gv-pd-${f[0]}" autocomplete="new-password">`).join('')
      + `<p class="gv-err" role="alert">${esc(o.err || '')}</p><div class="tools-row gv-modal-row">${o.forgot ? '<button type="button" class="text-btn" data-g="forgot">Forgot the passcode?</button>' : ''}<button type="button" class="btn btn-line btn-sm" data-g="no">Cancel</button><button type="button" class="btn btn-gold btn-sm" data-g="ok">${esc(o.ok)}</button></div></div>`;
    document.body.appendChild(back);
    const prev = document.activeElement, err = back.querySelector('.gv-err');
    const close = v => { back.remove(); try { prev && prev.focus && prev.focus(); } catch (e) {} resolve(v); };
    const go = () => { const v = {}; o.fields.forEach(f => { v[f[0]] = back.querySelector('#gv-pd-' + f[0]).value; }); const m = o.check ? o.check(v) : (v[o.fields[0][0]] ? '' : 'Enter the passcode.'); if (m) { err.textContent = m; return; } close(v); };
    back.addEventListener('click', e => { const g = e.target.getAttribute && e.target.getAttribute('data-g'); if (g === 'no') close(null); else if (g === 'ok') go(); else if (g === 'forgot') close('forgot'); else if (e.target === back) close(null); });
    back.addEventListener('keydown', e => { if (e.key === 'Enter') go(); else if (e.key === 'Escape') close(null); });
    setTimeout(() => { const f = back.querySelector('input'); if (f) f.focus(); }, 30);
  });
}
/* ---------- people and their trees ---------- */
const ORDER = { adult:1, pine:2, aspen:3, maple:4 };
// Household profiles stand in Family groves only. Other kinds keep no member list on the device.
function allPeople() { return window.GGP && GGP.list ? GGP.list().slice().sort((a, b) => (ORDER[a.age] || 9) - (ORDER[b.age] || 9) || String(a.name).localeCompare(String(b.name))) : []; }
function people() { return isFamily() ? allPeople() : []; }
function who(id) { return allPeople().find(p => p.id === id) || null; }
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
  // A shared tree stands in a grove that shows members' trees (Family, Faith Community, Small Group).
  if (!hasTrees()) { const g = ROOT.groves.find(x => KW(x.kind).trees); if (!g) { toast('Make a Family grove first, then open the shared link again.'); return; } G = g; ROOT.active = g.id; save(); }
  const have = famList().find(x => x.id === c.i);
  if (have && have.u >= c.m) { famAdd(c); return; }
  const ask = have ? `Update ${c.n}'s tree in your grove?` : `Add ${c.n}'s tree to your grove?`;
  const html = `<p>${esc(c.n)} shared their ${FAM_TOOL[c.t]} tree: how it looks, whether they tended today, and days tended this week. It stays on this device, in your grove.</p><p class="ggx-small">It doesn't update by itself. ${esc(c.n)} can share again any time.</p>`;
  if (GGApp.dialog) GGApp.dialog({ title: ask, html, buttons: [{ t: have ? 'Update Their Tree' : 'Add to My Grove', kind: 'main', fn: () => famAdd(c) }, { t: 'Not Now', kind: 'quiet' }] });
  else if (confirm(ask)) famAdd(c);
}

/* ---------- view state ---------- */
const S = { tab: 'grove', sel: null, wk: 0, part: '', open: '', lib: { q: '', hit: '' }, setup: null, pick: false, ci: null, view: '', pd: null, fresh: null };
function tabs() {
  if (!G || S.setup) return [['grove', G ? 'New Grove' : 'Start Our Grove', 'grove'], ['life', 'When Life Changes', 'guide'], ['how', 'How it works', 'how'], ['learn', 'Learn', 'play']];
  const K = KW(), t = [['grove', 'Our Grove', 'grove'], ['checkin', K.checkin, 'week'], ['plan', 'Growth Plan', 'plan'], ['together', 'Together', 'heart'], ['life', 'When Life Changes', 'guide']];
  if (isFamily() || G.wallOn) t.push(['wall', G.kind === 'classroom' ? 'Teacher Notes' : 'The Wall', 'people']);
  if (isFamily() && hasEarlier()) t.push(['earlier', 'Earlier', 'journal']);
  t.push(['how', 'How it works', 'how'], ['settings', 'Settings', 'gear'], ['learn', 'Learn', 'play']);
  return t;
}
function renderTabs() {
  const t = tabs(); if (S.tab !== 'library' && !t.some(x => x[0] === S.tab)) S.tab = 'grove';
  $('#tabs').innerHTML = t.map(([id, label, ic]) => `<button class="tab" role="tab" aria-selected="${S.tab === id}" data-tab="${id}">${icon(ic)}${esc(label)}</button>`).join('');
}
let LAST_SCENE = '';
function render() {
  renderTabs();
  const v = $('#view');
  window.GROVE_PLAIN = plainMode();
  const body = !G || S.setup ? ({ how: viewHow, library: viewLibrary, life: viewLife }[S.tab] || viewSetup)()
    : ({ grove: viewGrove, checkin: viewCheckin, plan: viewPlan, together: viewTogether, life: viewLife, wall: viewWall, earlier: viewEarlier, how: viewHow, settings: viewSettings, library: viewLibrary }[S.tab] || viewGrove)();
  v.innerHTML = (G && !S.setup ? groveBar() : '') + (isFamily() && !S.setup ? hereBar() + alertsHtml() : '') + body;
  // The Today scene plays a short moment (birds and a soft wind) when it opens, then rests still.
  const key = G && S.tab === 'grove' && !S.setup ? G.id : '';
  if (window.GGLiving && document.getElementById('gl-scene')) GGLiving.mount({ done: GV_DONE, moment: !!key && key !== LAST_SCENE });
  LAST_SCENE = key;
  if (S.tab === 'library' && S.lib.q) libFind();
}
window.render = render;

/* ---------- which grove: the grove bar, switching, and making a new grove ---------- */
function groveBar() {
  const K = KW(), locked = G.lockOn && !vaultOpen();
  let h = `<div class="gv-bar"><div class="gv-bar-id"><span class="gv-fam-ic" aria-hidden="true">${icon('grove')}</span><div><b>${esc(G.name || K.name)}</b><small>${esc(K.long)}${G.lockOn ? (locked ? ' · Locked' : ' · Unlocked') : ''}</small></div></div><div class="gv-bar-acts">`;
  if (ROOT.groves.length > 1) h += `<button class="btn btn-line btn-sm" data-act="pick" aria-expanded="${S.pick}">Switch Grove</button>`;
  if (ROOT.groves.length < MAX_GROVES) h += `<button class="btn btn-line btn-sm" data-act="newgrove">New Grove</button>`;
  if (G.lockOn && !locked) h += `<button class="btn btn-line btn-sm" data-act="glock">${icon('lock')} Lock</button>`;
  h += `</div></div>`;
  if (S.pick) h += `<div class="card gv-pick"><h3>Our Groves</h3><p class="muted">Up to ${MAX_GROVES} groves on this device, each with its own kind and lock.</p><ul class="gv-fam-list">${ROOT.groves.map(g => `<li><span class="gv-fam-ic" aria-hidden="true">${icon('grove')}</span><div><b>${esc(g.name || KW(g.kind).name)}</b><span>${esc(KW(g.kind).long)}</span></div>${g.id === G.id ? '<span class="muted">Open now</span>' : `<button type="button" class="btn btn-gold btn-sm" data-act="go" data-id="${esc(g.id)}">Open</button>`}</li>`).join('')}</ul></div>`;
  return h;
}
function switchTo(id) { const g = ROOT.groves.find(x => x.id === id); if (!g) return; fixGrove(g); G = g; ROOT.active = id; S.pick = false; S.ci = null; S.pd = null; S.view = ''; S.sel = null; persist(); render(); toast('Now in ' + (g.name || KW(g.kind).name) + '.'); }
function viewSetup() {
  const st = S.setup || (S.setup = { kind: '', name: '', school: 'public', faith: '', children: false, lock: true });
  let h = `<div class="section-head"><h2>${G ? 'A New Grove' : 'Start Our Grove'}</h2><p>The Grove is where trees grow together: a family, a class, a faith community, a small group, or a team. Pick the kind that fits, and the words, questions, and practices follow.</p></div>`;
  h += `<div class="card"><h3>What kind of grove is this?</h3><div class="gv-kinds" role="radiogroup" aria-label="Kind of grove">${KIND_IDS.map(k => { const K = KW(k); return `<button type="button" role="radio" class="gv-kind${st.kind === k ? ' on' : ''}" aria-checked="${st.kind === k}" data-act="setkind" data-id="${k}"><b>${esc(K.long)}</b><span>${esc(K.fits)}</span></button>`; }).join('')}</div></div>`;
  if (st.kind) {
    const K = KW(st.kind);
    h += `<div class="card">${K.setup ? `<p>${esc(K.setup)}</p>` : ''}<label class="lbl" for="gv-sname">${esc(K.namePrompt)}</label><input id="gv-sname" class="gv-input" maxlength="40" data-setup="name" value="${esc(st.name)}" placeholder="${esc(K.nameExample)}">`;
    if (st.kind === 'classroom') h += `<p class="lbl">Where is this class?</p><div class="gv-chips">${[['public', 'Public School'], ['faith', 'Faith-Based School'], ['other', 'Homeschool or Program']].map(([id, l]) => `<button type="button" class="chip${st.school === id ? ' on' : ''}" aria-pressed="${st.school === id}" data-act="setschool" data-id="${id}">${l}</button>`).join('')}</div><p class="muted">${st.school === 'faith' ? 'A faith-based school may choose Faith wording in Settings.' : 'Plain wording, about class life only. No names are kept.'}</p>`;
    if (st.kind === 'group') h += `<p class="lbl">Faith or Plain wording?</p><div class="gv-chips">${[['faith', 'Faith'], ['plain', 'Plain']].map(([id, l]) => `<button type="button" class="chip${st.faith === id ? ' on' : ''}" aria-pressed="${st.faith === id}" data-act="setfaith" data-id="${id}">${l}</button>`).join('')}</div><p class="muted">Decide together in your first time. Change it any time in Settings.</p>`;
    if (st.kind !== 'team') h += switchHtml('setchildren', st.children, 'Children Take Part', st.children ? 'On. Kid lines show under each question.' : 'Off. Turn it on when children join in.');
    h += switchHtml('setlock', st.lock, 'Lock the Check-ins and Plan With a Passcode', st.lock ? 'On, as recommended. Only people with the passcode open them.' : 'Off. Anyone using this device can open them.');
    if (st.lock) h += `<label class="lbl" for="gv-sp1">Grove passcode</label><input id="gv-sp1" class="gv-input" type="password" autocomplete="new-password"><label class="lbl" for="gv-sp2">Passcode again</label><input id="gv-sp2" class="gv-input" type="password" autocomplete="new-password"><p class="muted">At least 6 characters. Grow With Grounded never sees it and cannot recover it.</p>`;
    h += `<p class="gv-err" id="gv-serr" role="alert"></p><div class="tools-row" style="justify-content:flex-start"><button class="btn btn-gold btn-sm" data-act="create-grove">Plant This Grove</button>${G ? '<button class="btn btn-line btn-sm" data-act="cancel-setup">Cancel</button>' : ''}</div></div>`;
  }
  if (!G) h += `<div class="card"><h3>From Your Guide's Visit</h3><p>Did a Grove Guide visit your family and send your check-in and plan? Open them here with the link or message and the 8-letter code.</p><button class="btn btn-line btn-sm" data-act="gvload">From Your Guide's Visit</button></div>`;
  if (!G) h += `<div class="card"><h3>Your tree is yours. The grove is ours.</h3><p>Everyone tends their own tree in their own app: Oak, Birch, Sequoia, Pine, Aspen, or Maple. The Grove is shared ground: check in together, make a plan together, and do a few things side by side.</p></div>`;
  return h + helpCardHtml();
}
function switchHtml(act, on, title, sub) { return `<div class="gv-joinrow"><button type="button" class="gv-switch" role="switch" aria-checked="${!!on}" data-act="${act}"><span class="gv-track" aria-hidden="true"></span><span><b>${esc(title)}</b><small>${esc(sub)}</small></span></button></div>`; }
function createGrove() {
  const st = S.setup; if (!st || !st.kind) return;
  if (ROOT.groves.length >= MAX_GROVES) { toast('This device holds up to six groves. Clear one to make another.'); return; }
  const err = $('#gv-serr'), K = KW(st.kind);
  let pass = '';
  if (st.lock) {
    const a = ($('#gv-sp1') || {}).value || '', b = ($('#gv-sp2') || {}).value || '';
    if (a.length < 6) { err.textContent = 'Choose a passcode of at least 6 characters, or turn the lock off.'; return; }
    if (a !== b) { err.textContent = 'The two passcodes are different.'; return; }
    if (!subtle) { err.textContent = 'This browser cannot lock a grove. Turn the lock off, or try another browser.'; return; }
    pass = a;
  }
  const g = blankGrove(st.kind, (st.name || '').trim().slice(0, 40) || ('Our ' + K.name + ' Grove'));
  if (st.kind === 'classroom') g.school = st.school;
  if (st.kind === 'group') g.faith = st.faith || 'plain';
  if (st.kind === 'faith') g.faith = 'faith';
  if (st.kind === 'family' && !ROOT.groves.length) g.intro = false;
  g.children = !!st.children && st.kind !== 'team';
  g.lockOn = !!st.lock;
  ROOT.groves.push(g); G = g; ROOT.active = g.id; S.setup = null; S.tab = 'grove';
  save();
  const done = () => { render(); toast((g.name) + ' is planted.'); const a = $('#app'); if (a) a.scrollIntoView(); };
  if (pass) setPass(g.id, pass, blankVault()).then(done); else { VAULTS[g.id] = blankVault(); sealVault().then(done); }
}

/* ---------- who's here (Family groves) ---------- */
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
/* The living Today scene: The Grove's own painting, with light from the day's tending (parts tended in anyone's
   tree that shows here, and practices done together). Days with no tending rest in soft mist; it never wilts.
   Birds and a soft wind play for a few seconds when the scene opens and after a check-off (shared/gg-living.js). */
let GV_DONE = 0;
function groveToday() {
  const d = today(), parts = new Set(), K = KW();
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
  return { light, line, done, parts: [...parts], K };
}
function groveTodayHtml() {
  if (!window.GGLiving) return '';
  const sc = groveToday(); GV_DONE = sc.done;
  return `<div class="card gv-today">${GGLiving.html({ app: 'grove', light: sc.light, label: sc.line })}
    <div class="gv-today-strip"><ul class="gv-marks" aria-label="Parts tended today">${PARTS6.map(p => `<li class="${sc.parts.includes(p.key) ? 'on' : ''}" style="--pc:${p.color}"><span aria-hidden="true"></span>${p.name}<b class="sr-only">${sc.parts.includes(p.key) ? ', tended today' : ''}</b></li>`).join('')}</ul>
    <p class="gv-today-line">${esc(sc.line)}</p></div></div>`;
}
function viewGrove() {
  const K = KW(), ps = people(), days = groveDays(), vis = VISITORS.filter(c => days >= c.days).map(c => c.id), next = VISITORS.find(c => days < c.days);
  // A visitor that arrives today opens its wings once (shown once per visit to the page).
  if (S.fresh === null) S.fresh = VISITORS.filter(c => c.days === days && days > 0).map(c => c.id); const fresh = S.fresh; S.fresh = [];
  const scen = SCENES.find(x => x.id === G.scenery && days >= x.days) ? G.scenery : 'forest';
  const d0 = today();
  const trees = ps.slice(0, 8).map(p => { const t = treeOf(p), last = t.recent.map(r => r.d).filter(x => x <= d0).sort().pop() || '';
    const td = t.recent.filter(r => r.d === d0).reduce((a, r) => a.concat(r.parts || []), []);
    return { id: p.id, on: S.sel === p.id, stage: t.willow ? 'willow' : stageFor(p), remembered: t.remembered, private: !t.show,
      g: t.remembered ? 1 : t.show ? Math.min(1, .12 + t.days / 60) : .1, today: td, week: t.remembered ? [] : t.parts,
      tended: t.show && last === d0, misty: t.show && (!last || between(last, d0) >= 2), kind: t.willow ? 'grove' : (G.kinds[p.id] || 'grove'), label: p.name }; });
  const fam = hasTrees() ? famList() : [], famRoom = Math.max(0, 14 - trees.length), famShown = fam.slice(0, famRoom);
  famShown.forEach(f => { const made = famDate(f.u), on = !!f.d && made === d0, pp = famParts(f);
    trees.push({ stage: FAM_STAGE[f.t] || 'adult', g: Math.min(1, .12 + f.g / 60), today: on ? pp : [], week: pp, tended: on, misty: !on && between(made, d0) >= 2, kind: 'grove', label: f.n }); });
  let h = '';
  if (!G.intro) h += `<div class="banner gv-intro"><h2 class="gv-h3">${esc(Wk(W('kinds.' + G.kind + '.introTitle'), G.kind) || 'Where our trees grow together')}</h2><p>${isFamily()
    ? '<b>Your tree is yours. The grove is ours.</b> Everyone tends their own tree in their own app: Oak for grown-ups, Birch for young adults, Sequoia for older adults, Pine for high schoolers, Aspen for middle schoolers, Maple for kids. The Grove is where your trees stand side by side. Check in together, make a plan together, and watch the grove grow.'
    : `<b>This grove belongs to ${esc(K.we)}.</b> Check in together with one shared answer for each question, make a Growth Plan together, and do a few practices side by side. Nothing about any one person is ever asked or kept.`}</p><div class="tools-row" style="justify-content:flex-start"><button class="btn btn-light btn-sm" data-act="intro">Got it</button></div></div>`;
  h += groveTodayHtml();
  h += nextStepHtml();
  h += lcHomeHtml();
  if (hasTrees()) {
    const lead = isFamily() ? (ps.length ? (ps.length === 1 ? 'One tree so far. Add the people you live with, and their trees grow here too.' : 'Every tree in your household, side by side.') : 'No trees yet. Start with your own.')
      : (fam.length ? 'Trees shared by members from their own tree apps, side by side.' : 'Members can share their own tree here from their tree app, if they choose. It is never required.');
    h += `<div class="section-head"><h2>Our Grove</h2><p>${lead}</p></div>`;
    h += `<div class="gv-scene">${window.GGGroveRow ? GGGroveRow.html({ trees: trees.length ? trees : [{ stage: 'adult', g: .05, kind: 'grove', private: true }], sky: skyNow(), scenery: scen, visitors: vis, fresh, pick: isFamily(), label: 'Our grove' }) : ''}</div>`;
  }
  h += `<p class="gv-grew">${days ? `${days} ${days === 1 ? 'day' : 'days'} of growing together.` : (isFamily() ? 'The grove grows when anyone tends their tree or the family does a practice together.' : 'The grove grows with every practice done together.')}${next && hasTrees() ? ` Next visitor: ${esc(next.name)}, at ${next.days} ${next.days === 1 ? 'day' : 'days'}.` : ''}</p>`;
  if (fam.length > famShown.length) h += `<p class="muted">${fam.length - famShown.length} more ${fam.length - famShown.length === 1 ? 'tree is' : 'trees are'} in the Family Trees list.</p>`;
  if (isFamily() && !ps.length) return h + famHtml() + `<div class="card"><h3>Start with your own tree</h3><p>Make a private Grounded profile, then tend your tree in the app for your age. It grows here too.</p><div class="tools-row" style="justify-content:flex-start"><button class="btn btn-gold btn-sm" data-act="create">Make my profile</button>${ownTreeChips()}</div></div>` + togetherHtml(days) + moveOnHtml() + helpCardHtml();
  if (isFamily()) {
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
  }
  if (hasTrees()) h += famHtml();
  h += togetherHtml(days);
  const a = me();
  if (isFamily() && a) {
    const mine = who(a.id), md = myDays(mine), gd = days;
    const row = (list, cur, act, n) => `<div class="unlock-row">${list.map(k => { const ok = n >= k.days; return `<button type="button" class="chip${cur === k.id ? ' on' : ''}${ok ? '' : ' is-off'}" ${ok ? `data-act="${act}" data-id="${k.id}"` : 'disabled'} aria-pressed="${cur === k.id}">${esc(k.name)}${ok ? '' : ` (${k.days} ${k.days === 1 ? 'day' : 'days'})`}</button>`; }).join('')}</div>`;
    h += `<div class="card"><h3>Your tree in the grove</h3><p class="muted">Days you tend in ${esc(toolOf(who(a.id) || a).name)} unlock new kinds of trees. Days the family grows together unlock scenery for everyone.</p>
      <label class="lbl">Kind of tree</label>${row(KINDS, G.kinds[a.id] || 'grove', 'kind', md)}
      <label class="lbl">Scenery</label>${row(SCENES, scen, 'scenery', gd)}</div>`;
  }
  return h + moveOnHtml() + helpCardHtml();
}
// The next good step for this grove, in one card: a first check-in, a plan, or this week's plan.
function nextStepHtml() {
  const K = KW();
  if (G.lockOn && !vaultOpen()) return `<div class="card gv-next"><h3>${icon('lock')} ${esc(K.checkin)} and ${esc(K.plan)}</h3><p class="muted">Locked with the grove passcode.</p><button class="btn btn-gold btn-sm" data-act="unlock">Unlock</button></div>`;
  const v = V() || blankVault(), last = v.checkins[v.checkins.length - 1];
  if (!last) return `<div class="card gv-next"><h3>Start With a ${esc(K.checkin)}</h3><p>${esc(K.time)}, together. One shared answer for each question, talked over as ${esc(K.we)}. Words only, never scores.</p><button class="btn btn-gold btn-sm" data-tab="checkin">Begin</button></div>`;
  if (!v.plan) return `<div class="card gv-next"><h3>Make ${esc(K.plan)}</h3><p>About five minutes, from your last check-in on ${esc(nice(last.date))}.</p><button class="btn btn-gold btn-sm" data-act="startplan">Make Our Plan</button></div>`;
  const wk = planWeek(v.plan), its = (v.plan.items || []).map(x => TP[x.pid]).filter(Boolean);
  return `<div class="card gv-next"><h3>${esc(K.plan)}</h3><p class="muted">Week ${Math.min(12, wk)} of 12${wk > 12 ? ', twelve weeks together' : ''}.</p>${its.length ? `<p>${its.map(p => `<span class="gv-part" style="--pc:${(PARTS6.find(x => x.key === p.part) || {}).color}">${esc(pv(p).name)}</span>`).join(' ')}</p>` : ''}<button class="btn btn-line btn-sm" data-tab="plan">Open Our Plan</button></div>`;
}

/* ---------- growing together: group totals and milestones ---------- */
const MILES = [
  ['grow1', 'First Day Growing Together', 'The grove grew for the first time.'],
  ['together1', 'First Practice Together', '{We} did a practice side by side.'],
  ['checkin1', 'First Check-in Together', '{We} checked in together for the first time.'],
  ['plan1', 'Our First Growth Plan', '{We} made a growth plan together.'],
  ['grow7', 'A Week of Growing Together', 'Seven days of the grove growing.'],
  ['sixparts', 'All Six Parts in One Week', 'Together, every part of the tree was tended in one week.'],
  ['alltrees', 'Every Tree Tended in One Week', 'Every tree in the grove was tended in the same week.'],
  ['together10', 'Ten Practices Together', 'Ten practices done side by side.'],
  ['ring1', 'A First Ring in the Grove', 'A tree in the grove finished a season and added a ring.'],
  ['grow30', 'Thirty Days Growing Together', 'A month of days in the grove.'],
  ['season1', 'Twelve Weeks Together', '{We} finished twelve weeks of a growth plan.'],
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
  (hasTrees() ? famList() : []).forEach(f => {
    shown++; allDays += f.g || 0;
    if (weekStart(famDate(f.u)) === w0 && f.w) { weekDays += f.w; tendedWk++; famParts(f).forEach(k => parts.add(k)); }
  });
  let together = 0, togetherWk = 0;
  Object.keys(G.done || {}).forEach(d => { const n = Object.keys(G.done[d] || {}).length; together += n; if (d >= w0 && d <= w1) { togetherWk += n; Object.keys(G.done[d] || {}).forEach(id => { const pr = TP[id]; if (pr) parts.add(pr.part); }); } });
  const v = V();
  return { days, weekDays, allDays, rings, shown, tendedWk, parts: parts.size, together, togetherWk,
    checkins: v ? v.checkins.length : 0, plans: v ? (v.plans.length + (v.plan ? 1 : 0)) : 0, season: v ? ([v.plan].concat(v.plans).some(p => p && planWeek(p) > 12)) : false };
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
  if (T.checkins >= 1) out.checkin1 = 1;
  if (T.plans >= 1) out.plan1 = 1;
  if (T.season) out.season1 = 1;
  return out;
}
function famMilesCheck(T) {
  if (!G.miles || typeof G.miles !== 'object') G.miles = {};
  const now = famMilesNow(T), fresh = Object.keys(now).filter(id => !G.miles[id]);
  if (!fresh.length) return;
  fresh.forEach(id => { G.miles[id] = today(); }); save();
  const m = MILES.find(x => x[0] === fresh[fresh.length - 1]);
  if (m) setTimeout(() => toast('New milestone: ' + m[1] + '.'), 300);
}
const famN = (n, one, many) => `${n} ${n === 1 ? one : many}`;
function togetherHtml(days) {
  const T = famTotals(days), K = KW(); famMilesCheck(T);
  const list = MILES.filter(m => hasTrees() || !['alltrees', 'ring1'].includes(m[0]));
  const got = list.filter(m => G.miles && G.miles[m[0]]), ahead = list.filter(m => !(G.miles && G.miles[m[0]]));
  const mt = s => fill(s, { We: K.We, we: K.we });
  let h = `<div class="card gv-totals"><h3>Growing Together</h3><p class="muted">${isFamily() ? "The whole family's growth, added together. Never a contest: every day anyone tends counts for all of you." : 'Everything done together, added up. Never a contest, and no one is counted on their own.'}</p>`;
  if (hasTrees()) h += `<dl class="gv-stats gv-stats-wrap"><div><dt>Days Tended This Week</dt><dd>${T.weekDays}</dd></div><div><dt>Practices Together This Week</dt><dd>${T.togetherWk}</dd></div><div><dt>Parts Tended This Week</dt><dd>${T.parts} of 6</dd></div></dl>
    <dl class="gv-stats gv-stats-wrap"><div><dt>Days Tended in All</dt><dd>${T.allDays}</dd></div><div><dt>Practices Together</dt><dd>${T.together}</dd></div><div><dt>Rings in the Grove</dt><dd>${T.rings}</dd></div></dl>
    <p class="muted">${T.shown ? `Counting ${famN(T.shown, 'tree', 'trees')} whose growth is shown here, and the practices you do together.` : 'Trees count here when their "Show my growth on The Grove" switch is on, and so do the practices you do together.'}</p>`;
  else h += `<dl class="gv-stats gv-stats-wrap"><div><dt>Practices Together This Week</dt><dd>${T.togetherWk}</dd></div><div><dt>Practices Together</dt><dd>${T.together}</dd></div><div><dt>Days Growing Together</dt><dd>${T.days}</dd></div></dl>`;
  h += `<h3 class="gv-miles-h">${isFamily() ? 'Family Milestones' : 'Grove Milestones'}</h3>
    ${got.length ? `<ul class="gv-miles">${got.map(m => `<li><b>${esc(m[1])}</b><span>${esc(nice(G.miles[m[0]]))}</span><small>${esc(mt(m[2]))}</small></li>`).join('')}</ul>` : '<p class="muted">Your first milestone comes with your first day of growing together.</p>'}
    ${ahead.length ? `<p class="muted">Still ahead: ${ahead.map(m => esc(m[1])).join(', ')}.</p>` : '<p class="muted">Every milestone reached. The grove keeps growing.</p>'}</div>`;
  return h;
}

/* ---------- help, any time ---------- */
function helpCardHtml(more, hospice) {
  let first = '';
  if ((isFamily() && G.hard) || hospice) first = G && G.line && G.line.phone
    ? `<p><b>${esc(G.line.name || 'Our hospice 24/7 line')}</b>: <a class="text-link" href="tel:${esc(String(G.line.phone).replace(/[^0-9+]/g, ''))}">${esc(G.line.phone)}</a>. Call first, day or night, for anything hospice can help with.</p>`
    : `<p><b>In a hard season with hospice?</b> Call your hospice's 24/7 line first, day or night, for anything hospice can help with. It is on the admission papers.</p>`;
  return `<div class="card gv-help" role="note"><h3>If Someone Needs Help Now</h3>${first}<p>If someone is thinking about ending their life, or is in crisis, call or text <a class="text-link" href="tel:988">988</a>, any time, day or night.</p><p>If anyone is in danger right now, call <a class="text-link" href="tel:911">911</a>.</p>${more ? `<p>If a vulnerable adult in Minnesota may be harmed, neglected, or taken advantage of, call MAARC at <a class="text-link" href="tel:18448801574">1-844-880-1574</a>, any time.</p>` : ''}</div>`;
}

/* ---------- The Wall (Family), Teacher Notes (Classroom), and a leader's wall (other kinds, when turned on) ---------- */
function wallItems(w0) {
  const w1 = addDays(w0, 6), out = [];
  G.wall.forEach(x => { if (x.day >= w0 && x.day <= w1) out.push(Object.assign({ kind: 'post' }, x)); });
  people().forEach(p => treeOf(p).recent.forEach(r => { if (r.d >= w0 && r.d <= w1) out.push({ kind: 'growth', id: 'g:' + p.id + ':' + r.d, by: p.id, day: r.d, at: r.d + 'T20:00', parts: r.parts || [] }); }));
  Object.keys(G.done).forEach(d => { if (d >= w0 && d <= w1) Object.keys(G.done[d]).forEach(k => { const x = G.done[d][k]; out.push({ kind: 'practice', id: 'p:' + d + ':' + k, by: x.by, day: d, at: x.at || d + 'T19:00', practice: k }); }); });
  return out.sort((a, b) => String(b.at).localeCompare(String(a.at)));
}
const list3 = a => a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
function reactsHtml(id) {
  if (!isFamily()) return '';
  const r = G.reacts[id] || {}, a = me(), mine = a && r[a.id];
  const whoBy = REACTS.map(([k, e]) => { const n = Object.keys(r).filter(pid => r[pid] === k).map(nameOf); return n.length ? `<span class="gv-rwho">${e} ${esc(list3(n))}</span>` : ''; }).join('');
  return `<div class="gv-react">${REACTS.map(([k, e, l]) => `<button type="button" class="gv-rbtn" aria-pressed="${mine === k}" aria-label="${l}" title="${l}" data-act="react" data-id="${esc(id)}" data-k="${k}">${e}</button>`).join('')}</div>${whoBy ? `<p class="gv-rline">${whoBy}</p>` : ''}`;
}
const leaderName = () => G.kind === 'classroom' ? 'Teacher' : 'Leader';
function itemHtml(x) {
  const p = x.by && x.by !== 'leader' ? who(x.by) : null, a = me(), av = p && window.GGAv ? GGAv.html(p.avatar, p.name, 36) : `<span class="gv-dot">${icon('grove')}</span>`;
  const K = KW();
  let body = '';
  if (x.kind === 'post') body = `<p class="gv-text">${esc(x.text)}</p>`;
  if (x.kind === 'growth') { const tool = toolOf(p || 'adult'), names = PARTS6.filter(k => (x.parts || []).includes(k.key)).map(k => k.name);
    body = `<p class="gv-text">${esc(nameOf(x.by))} tended their tree${names.length ? ': ' + esc(list3(names)) : ''}.</p><p><a class="text-link" href="${tool.href}">Go tend your tree</a></p>`; }
  if (x.kind === 'practice') { const pr = TP[x.practice]; body = `<p class="gv-text">${esc(K.We)} did <b>${esc(pr ? pv(pr).name : 'a practice')}</b> together${p ? ', checked off by ' + esc(p.name) : ''}.</p>`; }
  const canDrop = x.kind === 'post' && (!isFamily() || (a && (a.id === x.by || a.age === 'adult')));
  const by = x.kind === 'practice' ? 'Together' : x.by === 'leader' ? leaderName() : nameOf(x.by);
  return `<li class="gv-item gv-${x.kind}"><div class="gv-item-head">${x.kind === 'practice' ? `<span class="gv-dot">${icon('heart')}</span>` : av}<div><b>${esc(by)}</b><small>${esc(nice(x.day))}</small></div>${canDrop ? `<button type="button" class="gv-drop" data-act="drop" data-id="${esc(x.id)}">Remove</button>` : ''}</div>${body}${reactsHtml(x.id)}</li>`;
}
function viewWall() {
  const a = me(), w0 = addDays(weekStart(today()), -7 * S.wk), items = wallItems(w0), cls = G.kind === 'classroom';
  let h = `<div class="section-head"><h2>${cls ? 'Teacher Notes' : 'The Wall'}</h2><p>${isFamily() ? "Cheer each other on. Growth from your tree apps shows here when someone's switch is on, along with short posts and the things you do together." : cls ? 'Short notes from the teacher, and the practices the class did together. Students do not post here.' : 'Short notes from the leader, and the practices done together.'}</p></div>`;
  if (S.wk === 0) {
    if (!isFamily()) h += `<div class="card gv-compose"><label class="lbl" for="gv-post">${cls ? 'A note from the teacher' : 'A note from the leader'}</label><textarea id="gv-post" maxlength="280" rows="3" placeholder="${cls ? 'Our class did the Calm Corner Breath before the test. Proud of you all.' : 'Thank you for showing up for each other this week.'}"></textarea><div class="tools-row" style="justify-content:space-between"><span class="muted">Notes stay on this device. No names of students, please.</span><button class="btn btn-gold btn-sm" data-act="post">Post</button></div></div>`;
    else h += a ? `<div class="card gv-compose"><label class="lbl" for="gv-post">Post to the wall as ${esc(a.name)}</label><textarea id="gv-post" maxlength="280" rows="3" placeholder="Proud of you for the walk today."></textarea><div class="tools-row" style="justify-content:space-between"><span class="muted">Posts stay on this device, for your household. A grown-up can remove any post.</span><button class="btn btn-gold btn-sm" data-act="post">Post</button></div></div>`
      : (people().length ? `<div class="card gv-compose"><p>Choose your picture to write a post or react.</p><button class="btn btn-gold btn-sm" data-act="here">Who's here?</button></div>` : '');
  }
  h += `<h3 class="gv-wk">${S.wk === 0 ? 'This week' : S.wk === 1 ? 'Last week' : 'Week of ' + esc(nice(w0))}</h3>`;
  h += items.length ? `<ul class="gv-wall">${items.map(itemHtml).join('')}</ul>` : `<p class="muted">${S.wk === 0 ? 'Nothing here yet this week.' : 'A quiet week.'}</p>`;
  h += `<div class="tools-row gv-fold">${S.wk < 3 ? `<button class="btn btn-line btn-sm" data-act="older">Show ${S.wk === 0 ? 'last week' : 'the week before'}</button>` : ''}${S.wk > 0 ? '<button class="btn btn-line btn-sm" data-act="newer">Back to this week</button>' : ''}</div>`;
  return h + (isFamily() ? `<p class="muted gv-end">That's the wall. Now go tend your tree.</p>` : '');
}

/* ---------- practices for this grove ---------- */
// A practice in this grove's words: Plain wording replaces Faith wording where a practice has it.
function pv(pr) { const o = Object.assign({}, pr); if (plainMode() && pr.plain) Object.assign(o, pr.plain); return o; }
function kindPractices(part) { return ALLP.filter(p => (p.kinds || []).includes(G.kind) && (!part || p.part === part)); }
function circleTags() { const v = V(); if (!v || !v.circle || !v.circle.length) return null; const t = new Set(); CIRCLE.forEach(c => { if (v.circle.includes(c[0])) c[2].forEach(x => t.add(x)); }); return { tags: t, little: v.circle.includes('little') }; }
function fitsCircle(pr) { const c = circleTags(); if (!c) return false; return (pr.life || []).some(x => c.tags.has(x)) || (c.little && !!pr.kid); }
const joinFits = x => !!(x.adapt || (x.life || []).includes('gentle'));
function joinOrder(list) {
  let out = G.joinFirst ? list.filter(joinFits).concat(list.filter(x => !joinFits(x))) : list;
  if (circleTags()) out = out.filter(fitsCircle).concat(out.filter(x => !fitsCircle(x)));
  return out;
}
const LEVERS = () => Object.assign({ lighten: 'Lightens the Load', support: 'Adds Support', reframe: 'A New Way to See It' }, W('plan.levers', {}));
function weekNo() { return Math.floor(Math.max(0, between(G.start, today())) / 7) % 12; }
function doneToday(id) { return !!(G.done[today()] || {})[id]; }
function practiceCard(pr0, featured, extra) {
  const pr = pv(pr0), open = S.open === pr.id, done = doneToday(pr.id), part = PARTS6.find(x => x.key === pr.part) || {};
  const showKid = pr.kid && (isFamily() || kidsOn());
  const fit = fitsCircle(pr0);
  return `<div class="${featured ? 'card gv-featured' : 'gv-prac'}" style="--pc:${part.color}"><div class="gv-prac-top"><b>${esc(pr.name)}</b><small>${esc(part.name || '')}</small></div>${extra || ''}<p>${esc(pr.text)}</p>${showKid ? `<p class="muted gv-kid">For little ones: ${esc(pr.kid)}</p>` : ''}${fit ? `<p class="gv-join"><b>Fits Our Circle.</b> ${esc(pr.adapt || '')}</p>` : G.joinFirst && pr.adapt ? `<p class="gv-join"><b>Everyone can join.</b> ${esc(pr.adapt)}</p>` : ''}
    <div class="gv-acts"><button type="button" class="btn ${done ? 'btn-line' : 'btn-gold'} btn-sm" aria-pressed="${done}" data-act="did" data-id="${pr.id}">${done ? 'Done today. Undo' : 'We did this today'}</button><button type="button" class="text-btn" aria-expanded="${open}" data-act="how" data-id="${pr.id}">${open ? 'Hide how' : 'Show me how'}</button></div>
    ${open ? `<ol class="gv-steps">${String(pr.steps || '').split('|').filter(Boolean).map(s => `<li>${esc(s)}</li>`).join('')}</ol>${srcLine(pr0)}` : ''}</div>`;
}
// Sources (shared/gg-sources.js): "Adapted from" under a practice's steps, and a Sources line under the check-in, results, and plan.
function srcLine(pr) { const ids = pr.sources || []; return ids.length && window.GGSources ? GGSources.line(ids, { practice: true }) : ''; }
function srcFor(key) { const ids = W('sources.' + key, null); return Array.isArray(ids) && ids.length && window.GGSources ? `<div class="gv-srcs">${GGSources.line(ids)}</div>` : ''; }
function viewTogether() {
  const K = KW(), w = weekNo(), v = vaultOpen() ? V() : null, plan = v && v.plan;
  const planItems = plan ? (plan.items || []).map(x => TP[x.pid]).filter(Boolean) : [];
  let feat = null;
  if (planItems.length) feat = planItems[w % planItems.length];
  else { const f = TP[T.featured[w]]; feat = f && (f.kinds || []).includes(G.kind) ? f : kindPractices()[(w * 5) % Math.max(1, kindPractices().length)]; }
  let h = `<div class="section-head"><h2>Together</h2><p>Things ${esc(K.we)} does side by side. Each one grows the grove. Suggestions only: do one, do several, or skip a week.</p></div>`;
  if (planItems.length) h += `<p class="gv-kicker">From ${esc(K.plan)}</p>` + planItems.map(p => { const it = plan.items.find(x => x.pid === p.id) || {}; return practiceCard(p, true, it.anchor ? `<p class="muted">When: ${esc(it.anchor)}</p>` : ''); }).join('');
  else if (feat) h += `<p class="gv-kicker">This week's theme: ${esc(T.themes[w] || '')}</p>` + practiceCard(feat, true);
  if (G.lockOn && !vaultOpen()) h += `<p class="muted">${icon('lock', 'gv-ic-inline')} Unlock the grove to see your plan's practices first. <button class="text-btn" data-act="unlock">Unlock</button></p>`;
  h += `<div class="gv-chips"><button type="button" class="chip${!S.part ? ' on' : ''}" aria-pressed="${!S.part}" data-act="part" data-id="">All parts</button>${PARTS6.map(p => `<button type="button" class="chip${S.part === p.key ? ' on' : ''}" aria-pressed="${S.part === p.key}" data-act="part" data-id="${p.key}">${p.name}</button>`).join('')}</div>`;
  h += switchHtml('joinfirst', G.joinFirst, 'Show Ways Everyone Can Join First', G.joinFirst ? 'On. Seated and gentle ways come first, with a way for everyone to join.' : 'Off. Turn it on to put seated and gentle ways first.');
  if (circleTags()) h += `<p class="muted">Practices that fit Who's in Our Circle come first, marked Fits Our Circle.</p>`;
  PARTS6.filter(p => !S.part || S.part === p.key).forEach(p => {
    const list = joinOrder(kindPractices(p.key)); if (!list.length) return;
    h += `<section class="gv-partsec" style="--pc:${p.color}"><h3>${icon(p.key)}${p.name} <small>${p.sub}</small></h3>${list.map(x => practiceCard(x, false)).join('')}</section>`;
  });
  return h;
}

/* ---------- When Life Changes Together (GWG BLD 774) ----------
   Guides for the changes a family, class, faith community, group, or team goes through together (grove/guides.js,
   window.GROVE_GUIDES), each with two views (For the Group, For the Leader), two videos (grove/guide-videos.js, played
   by shared/gg-learn.js; a Plain grove hears the Plain scenes), Together practices, and links to the matching tree guides.
   Picked for Us puts first the guides that fit this grove: its kind, What's Changed Lately, its Growing Edges, Who's in
   Our Circle, and a Hard Season. Nothing is hidden. Deep links: #life, #life=<id>. */
const GGD = window.GROVE_GUIDES || { rings: [], topics: [], practices: [] };
const LC_RINGS = GGD.rings || [], LC = GGD.topics || [];
const GV_SRC = '/grove/guide-videos.js?v=b774';
const KIND_NAME = { family: 'Family', classroom: 'Classroom', faith: 'Faith Community', group: 'Small Group', team: 'Team' };
const TREE_LINK = { maple: ['Maple', '/maple/#talk=', 'for grown-ups of kids, K to 5'], aspen: ['Aspen', '/aspen/#talk=', 'for grown-ups of middle schoolers'], pine: ['Pine', '/pine/#life=', 'for grades 9 to 12'], birch: ['Birch', '/birch/#life=', 'for ages 18 to 26'], oak: ['Oak', '/oak/#life=', 'for grown-ups'], sequoia: ['Sequoia', '/sequoia/#life=', 'for older adults'], willow: ['Willow', '/willow/#guide=', 'for hospice families'] };
const HOSPICE_FIRST = ['hospice', 'hard-death'];
S.lc = { q: '', ring: 'all', open: null, persp: 'group' };
const lcRing = k => LC_RINGS.find(r => r.key === k) || { key: k, name: '', color: 'var(--gold)', blurb: '' };
const lcFits = t => !G || (t.kinds || []).includes(G.kind);
// A guide in this grove's words: Plain wording replaces any field the guide gives a Plain version of.
function lcT(t) { const o = Object.assign({}, t); if (plainMode() && t.plain) Object.assign(o, t.plain); return o; }
function lcMatches(t, q) {
  if (!q) return true;
  const words = (t.title + ' ' + (t.keys || '') + ' ' + (t.short || '') + ' ' + (t.quick || []).join(' ')).toLowerCase().replace(/[’']/g, '').split(/[^a-z0-9]+/);
  return q.toLowerCase().replace(/[’']/g, '').split(/[^a-z0-9]+/).filter(Boolean).every(w => words.some(x => x.startsWith(w)));
}
const lcUl = a => (a || []).length ? '<ul>' + a.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' : '';
const lcKinds = t => (t.kinds || []).map(k => KIND_NAME[k] || k);
// What this grove has told us, from the locked part (only while it is open): changes, Growing Edges, the circle.
function lcSignals(ci) {
  if (G && !G.lockOn && !VAULTS[G.id]) VAULTS[G.id] = Object.assign(blankVault(), G.plainBox || {}); // no lock: nothing to ask
  const v = vaultOpen() ? V() : null;
  const c = ci || (v ? latestCheckin(false) : null), L = c ? levelsOf(c) : {};
  const ch = (ci ? ci.changes : (v && v.changes) || []).filter(x => x !== 'none').map(x => G.kind + ':' + x);
  return { ch, edges: PARTS6.filter(p => L[p.key] === 'edge').map(p => p.key), circ: (v && v.circle) || [] };
}
function lcPicks(max, ci) {
  if (!G || !LC.length) return [];
  const sg = lcSignals(ci);
  const score = t => {
    if (!lcFits(t)) return 0;
    let s = 0;
    if ((t.changes || []).some(c => sg.ch.includes(c))) s += 10;
    s += (t.parts || []).filter(p => sg.edges.includes(p)).length * 2;
    if (sg.circ.includes('close') && t.ring === 'gw-loss') s += 3;
    if (sg.circ.includes('serious') && t.ring === 'gw-illness') s += 3;
    if (isFamily() && G.hard && ['hospice', 'diagnosis', 'hospital', 'family-death'].includes(t.id)) s += 6;
    return s;
  };
  return LC.map(t => [t, score(t)]).filter(x => x[1] > 0).sort((a, b) => b[1] - a[1]).slice(0, max).map(x => x[0]);
}
function lcPickPractices(picks, max) {
  const seen = new Set(), out = [];
  picks.forEach(t => (t.practices || []).forEach(id => { const p = TP[id]; if (p && !seen.has(id) && (p.kinds || []).includes(G.kind)) { seen.add(id); out.push(p); } }));
  return joinOrder(out).slice(0, max);
}
function lcCard(t) {
  const r = lcRing(t.ring), fit = lcFits(t), tt = lcT(t);
  return `<article class="gv-lc-card" style="--rc:${r.color}"><span class="gv-lc-label">${esc(r.name)}</span><h4>${esc(t.title)}</h4><p>${esc(tt.short || '')}</p>
    <p class="gv-lc-for">${fit && G ? 'Fits our grove' : 'For ' + esc(list3(lcKinds(t)))}${lcWatchedBoth(t.id) ? ' · Both videos watched' : ''}</p>
    <button type="button" class="btn btn-line btn-sm" data-act="lc-open" data-id="${esc(t.id)}">Open This Guide</button></article>`;
}
// The guides list: Picked for Us first, then each ring with the guides that fit this grove's kind first.
function lcListHtml() {
  const st = S.lc; let h = '', n = 0;
  if (G && st.ring === 'all' && !st.q) {
    const picks = lcPicks(6);
    if (picks.length) h += `<div class="gv-lc-ring gv-lc-picked" style="--rc:var(--gold)"><h3><i></i>Picked for Us</h3><p>Guides that fit ${esc(KW().we)} right now, from What's Changed Lately, our Growing Edges, and Who's in Our Circle. Every guide stays open.</p><div class="gv-lc-grid">${picks.map(lcCard).join('')}</div></div>`;
  }
  LC_RINGS.filter(r => st.ring === 'all' || r.key === st.ring).forEach(r => {
    const ts = LC.filter(t => t.ring === r.key && lcMatches(t, st.q)); if (!ts.length) return;
    const ord = ts.filter(lcFits).concat(ts.filter(t => !lcFits(t)));
    n += ts.length;
    h += `<div class="gv-lc-ring" style="--rc:${r.color}"><h3><i></i>${esc(r.name)}</h3><p>${esc(r.blurb)}</p><div class="gv-lc-grid">${ord.map(lcCard).join('')}</div></div>`;
  });
  return n ? h : `<div class="card"><p>No guides match “${esc(st.q)}.” Try another word, or browse every topic.</p></div>`;
}
function viewLife() {
  const st = S.lc;
  if (st.open) { const t = LC.find(x => x.id === st.open); if (t) return lcDetail(t); st.open = null; }
  const filled = LC_RINGS.filter(r => LC.some(t => t.ring === r.key));
  if (st.ring !== 'all' && !filled.some(r => r.key === st.ring)) st.ring = 'all';
  let h = `<div class="section-head"><p class="gv-kicker">When Life Changes Together</p><h2>Guides for the changes we go through together</h2>
    <p>For a family, a class, a faith community, a group, or a team. Each guide has two views: For the Group, to read together, and For the Leader, for the grown-up, teacher, pastor, group leader, or team lead guiding the way. Each has two short videos, a few Together practices, and links to the guides in each person's own tree app.</p></div>`;
  if (!LC.length) return h + `<div class="card"><p>The guides are on the way.</p></div>` + helpCardHtml(true);
  h += `<input class="gv-input gv-lc-search" id="gv-lcq" type="search" placeholder="Search: a move, a new baby, hospice, a team..." aria-label="Search the guides" value="${esc(st.q)}" enterkeyhint="search">
    <div class="gv-chips" role="group" aria-label="Filter by topic"><button type="button" class="chip${st.ring === 'all' ? ' on' : ''}" aria-pressed="${st.ring === 'all'}" data-act="lc-ring" data-id="all">All Topics</button>${filled.map(r => `<button type="button" class="chip${st.ring === r.key ? ' on' : ''}" aria-pressed="${st.ring === r.key}" data-act="lc-ring" data-id="${r.key}" style="--rc:${r.color}">${esc(r.name)}</button>`).join('')}</div>`;
  if (G && G.lockOn && !vaultOpen()) h += `<p class="muted">${icon('lock', 'gv-ic-inline')} Unlock the grove to see Picked for Us, from your check-in and What's Changed Lately. <button class="text-btn" data-act="unlock">Unlock</button></p>`;
  h += `<div id="gv-lclist">${lcListHtml()}</div>`;
  return h + helpCardHtml(true) + `<p class="muted gv-lc-note">These guides offer spiritual guidance and emotional support for groups going through change, drawn from chaplaincy and trusted family, school, faith, and workplace organizations. For therapy, medical care, or legal advice, they point you to the right people. In danger right now, call 911. For a crisis, call or text 988.</p>`;
}
function lcWatchedOne(id) { try { return !!(window.GGLearn && GGLearn.watched && GGLearn.watched('grove', id)); } catch (e) { return false; } }
function lcWatchedBoth(gid) { return lcWatchedOne('gr-g-' + gid + '-you') && lcWatchedOne('gr-g-' + gid + '-helper'); }
function lcVids(t, lead) {
  const b = (side, name, pri) => { const id = 'gr-g-' + t.id + '-' + side, w = lcWatchedOne(id);
    return `<button type="button" class="btn ${pri ? 'btn-gold' : 'btn-line'} btn-sm" data-act="lc-watch" data-id="${esc(t.id)}" data-side="${side}">${w ? icon('check') : icon('play')} Watch: ${name}${w ? ' <span class="gv-lc-w">Watched</span>' : ''}</button>`; };
  return `<div class="gv-lc-vids no-print"><div class="tools-row" style="justify-content:flex-start">${b('you', 'For the Group', !lead)}${b('helper', 'For the Leader', lead)}</div>
    <p class="muted">For the Group, to watch together. For the Leader, for whoever is guiding the way. A few minutes each, narrated aloud.</p></div>`;
}
function lcWatch(gid, side) {
  window.GROVE_PLAIN = plainMode();
  const go = () => { if (window.GROVE_VIDS_WORDING) GROVE_VIDS_WORDING(plainMode()); if (window.GGLearn) GGLearn.open('grove', 'gr-g-' + gid + '-' + side, { from: 'guide' }); };
  if (window.GG_LEARN_GUIDES && GG_LEARN_GUIDES.grove) go(); else loadScript(GV_SRC).then(go);
}
const lcKidsOn = () => !G || (G.kind !== 'team' && (kidsOn() || isFamily()));
function lcFaith(t) { return plainMode() ? ((t.plain || {}).faith || '') : (t.faith || ''); }
function lcTreeLinks(t) {
  const L = (t.trees || []).filter(x => TREE_LINK[x[0]]); if (!L.length) return '';
  return `<h3>A guide of your own</h3><p>For anyone who wants their own guide, in the tree app for their age:</p><ul class="gv-lc-trees">${L.map(([tr, id, title]) => { const T0 = TREE_LINK[tr]; return `<li><a class="text-link" href="${T0[1]}${encodeURIComponent(id)}">${esc(title || id)}</a> <span class="muted">in ${T0[0]}, ${esc(T0[2])}</span></li>`; }).join('')}</ul>`;
}
function lcSources(t) { return window.GGSources ? GGSources.html('grove:' + t.id, { stories: t.stories || [] }) : ''; }
function lcPracHtml(t) {
  const ps = (t.practices || []).map(id => TP[id]).filter(Boolean);
  if (!ps.length) return '';
  const ord = G ? joinOrder(ps.filter(p => (p.kinds || []).includes(G.kind)).concat(ps.filter(p => !(p.kinds || []).includes(G.kind)))) : ps;
  return `<h3>Together practices for this season</h3><p class="muted">Small things to do side by side. Each one grows the grove.</p>${G ? ord.map(p => practiceCard(p, false)).join('') : ord.map(p0 => { const p = pv(p0); return `<div class="gv-prac" style="--pc:${(PARTS6.find(x => x.key === p.part) || {}).color}"><div class="gv-prac-top"><b>${esc(p.name)}</b><small>${esc(PNAME[p.part] || '')}</small></div><p>${esc(p.text)}</p></div>`; }).join('')}`;
}
function lcDetail(t0) {
  const t = lcT(t0), r = lcRing(t.ring), lead = S.lc.persp === 'leader', tg = t.together || {}, ld = t.leader || {};
  const kid = lcKidsOn() && (t.kids || []).length ? `<h3>With children</h3><p class="muted">Words for children, honest and simple.</p>${lcUl(t.kids)}` : '';
  const bk = t.byKind || {}, bkLines = G ? (bk[G.kind] ? [[G.kind, bk[G.kind]]] : []) : Object.entries(bk);
  const view = !lead ? `
      <h3>What this season can feel like</h3><p>${esc(t.feel)}</p>
      <h3>First steps together</h3>${lcUl(tg.first)}
      <h3>What helps</h3>${lcUl(tg.helps)}
      ${(tg.say || []).length ? `<h3>Words we can say together</h3><div class="gv-lc-say">${tg.say.map(x => `<p>${esc(x)}</p>`).join('')}</div>` : ''}
      ${kid}
      ${tg.people ? `<h3>Talking it over</h3><p>${esc(tg.people)}</p>` : ''}`
    : `
      <h3>What they may be carrying</h3><p>${esc(t.feel)} ${esc(ld.feel || '')}</p>
      <h3>What to say</h3><div class="gv-lc-say">${(ld.say || []).map(x => `<p>${esc(x)}</p>`).join('')}</div>
      <div class="gv-lc-two"><div><b>What not to say or do</b>${lcUl(ld.avoid)}</div><div><b>Practical ways to lead</b>${lcUl(ld.help)}</div></div>
      ${kid}
      <h3>Looking after yourself as the leader</h3><p>${esc(ld.you || '')}</p>`;
  const faith = lcFaith(t0);
  return `<article class="gv-lc-article" id="gv-lc-article" style="--rc:${r.color}">
    <div class="tools-row no-print" style="justify-content:space-between;margin:0 0 12px"><button type="button" class="text-btn" data-act="lc-back">${icon('back', 'gv-ic-inline')} All guides</button>
      <span class="gv-lc-tools"><button type="button" class="btn btn-line btn-sm" data-act="lc-read">${icon('how', 'gv-ic-inline')} Read Aloud</button><button type="button" class="btn btn-line btn-sm" data-act="lc-print" data-id="${esc(t.id)}">${icon('print', 'gv-ic-inline')} Save or Print This Guide</button></span></div>
    <span class="gv-lc-label">${esc(r.name)}</span>
    <h2>${esc(t.title)}</h2>
    <p class="gv-lc-for">For ${esc(list3(lcKinds(t)))}${G && !lcFits(t) ? `. Written for other kinds of groves, and open to ${esc(KW().we)} too.` : ''}</p>
    <div class="gv-lc-quick"><b>Quick Reference</b>${lcUl(t.quick)}</div>
    ${lcVids(t0, lead)}
    <div class="seg gv-lc-toggle no-print" role="group" aria-label="Choose a view"><button type="button" aria-pressed="${!lead}" data-act="lc-persp" data-id="group">For the Group</button><button type="button" aria-pressed="${lead}" data-act="lc-persp" data-id="leader">For the Leader</button></div>
    ${view}
    ${bkLines.map(([k, x]) => `<p class="gv-tip"><b>In a ${esc(KIND_NAME[k] || k)} grove.</b> ${esc(x)}</p>`).join('')}
    ${faith ? `<h3>${plainMode() ? 'What matters most' : 'Faith and meaning'}</h3><p>${esc(faith)}</p>` : ''}
    ${lcPracHtml(t0)}
    ${lcTreeLinks(t0)}
    <h3>When to reach out for more help</h3>${lcUl(t.reach)}
    ${(t.more || []).length ? `<h3>Learn more</h3><ul>${t.more.map(([n, u]) => `<li><a class="text-link" href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a></li>`).join('')}</ul>` : ''}
    <div class="gv-srcs">${lcSources(t0)}</div>
    ${helpCardHtml(true, HOSPICE_FIRST.includes(t0.id))}
    <p class="muted gv-lc-note">From When Life Changes Together in The Grove&trade; by Grow With Grounded. Spiritual guidance and emotional support; for therapy, medical care, or legal advice, it points you to the right people. &copy; ${new Date().getFullYear()} Grow With Grounded LLC. You are welcome to print this guide for your family or group.</p>
  </article>`;
}
// Print: both views, the practices, the tree guides, the help lines, and the Sources line.
function lcPrint(id) {
  const t0 = LC.find(x => x.id === id); if (!t0) return;
  const t = lcT(t0), tg = t.together || {}, ld = t.leader || {}, faith = lcFaith(t0), win = window.open('', '_blank');
  const ul = a => (a || []).length ? '<ul>' + a.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' : '';
  const ps = (t.practices || []).map(x => TP[x]).filter(Boolean).map(pv);
  const trees = (t.trees || []).filter(x => TREE_LINK[x[0]]);
  const inner = `<p class="muted">${esc(lcRing(t.ring).name)} · For ${esc(list3(lcKinds(t)))}</p><div class="card"><b>Quick Reference</b>${ul(t.quick)}</div>
    <h2>For the Group</h2><p>${esc(t.feel)}</p><p><b>First steps together</b></p>${ul(tg.first)}<p><b>What helps</b></p>${ul(tg.helps)}${(tg.say || []).length ? `<p><b>Words we can say together</b></p>${ul(tg.say)}` : ''}${lcKidsOn() && (t.kids || []).length ? `<p><b>With children</b></p>${ul(t.kids)}` : ''}${tg.people ? `<p>${esc(tg.people)}</p>` : ''}
    <h2>For the Leader</h2><p>${esc(ld.feel || '')}</p><p><b>What to say</b></p>${ul(ld.say)}<p><b>What not to say or do</b></p>${ul(ld.avoid)}<p><b>Practical ways to lead</b></p>${ul(ld.help)}<p>${esc(ld.you || '')}</p>
    ${faith ? `<h2>${plainMode() ? 'What Matters Most' : 'Faith and Meaning'}</h2><p>${esc(faith)}</p>` : ''}
    ${ps.length ? `<h2>Together Practices</h2>${ps.map(p => `<div class="card"><b>${esc(p.name)}</b><p>${esc(p.text)}</p><ol>${String(p.steps || '').split('|').filter(Boolean).map(s => `<li>${esc(s)}</li>`).join('')}</ol></div>`).join('')}` : ''}
    ${trees.length ? `<h2>A Guide of Your Own</h2><ul>${trees.map(([tr, gid, title]) => `<li>${esc(title || gid)}, in ${TREE_LINK[tr][0]} (growwithgrounded.com/${tr}/)</li>`).join('')}</ul>` : ''}
    <h2>When to Reach Out for More Help</h2>${ul(t.reach)}
    ${HOSPICE_FIRST.includes(t0.id) ? '<p><b>In hospice, call your hospice 24/7 line first, day or night.</b></p>' : ''}<p>If a vulnerable adult in Minnesota may be harmed, neglected, or taken advantage of, call MAARC at 1-844-880-1574, any time.</p>
    <div class="muted" style="font-size:13px">${lcSources(t0)}</div>`;
  printDoc(t.title, inner, win);
}
function lcReadAloud() {
  const a = $('#gv-lc-article'); if (!a) return;
  if (window.GGRead && GGRead.read) { GGRead.read(a); return; }
  if (!window.speechSynthesis) { toast('Read Aloud is not available in this browser.'); return; }
  speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(a.textContent.replace(/\s+/g, ' ')); u.rate = .92; speechSynthesis.speak(u);
}
function lcOpen(id) { const fromList = S.tab === 'life' && !S.lc.open; S.tab = 'life'; S.lc.open = id && LC.some(t => t.id === id) ? id : null; render(); const a = $('#app'); if (a) a.scrollIntoView(); pushHash(fromList ? { gList: 1 } : null); }
// Picked for Us on the home view: up to three guides and three practices, when the grove has told us something.
function lcHomeHtml() {
  if (!G || !LC.length) return '';
  const picks = lcPicks(3); if (!picks.length) return '';
  const ps = lcPickPractices(picks, 3);
  return `<div class="card gv-lc-home"><h3>Picked for Us</h3><p class="muted">From What's Changed Lately, our Growing Edges, and Who's in Our Circle. Every guide and practice stays open.</p>
    <div class="gv-lc-links">${picks.map(t => `<button type="button" class="btn btn-line btn-sm" data-act="lc-open" data-id="${esc(t.id)}">${esc(t.title)}</button>`).join('')}</div>
    ${ps.length ? `<p class="gv-lc-pp">Practices: ${ps.map(p => esc(pv(p).name)).join(', ')}. <button type="button" class="text-btn" data-tab="together">Open Together</button></p>` : ''}</div>`;
}
// After a check-in: the guides that fit what changed and where the grove wants to grow.
function lcAfterCheckin(ci) {
  const picks = lcPicks(4, ci); if (!picks.length) return '';
  return `<h4>When Life Changes Together</h4><p class="muted">Guides that may help, from what changed and our Growing Edges.</p><div class="gv-lc-links">${picks.map(t => `<button type="button" class="btn btn-line btn-sm" data-act="lc-open" data-id="${esc(t.id)}">${esc(t.title)}</button>`).join('')}</div>`;
}
window.GG_GUIDE_OPEN = window.GG_GUIDE_OPEN || {};
window.GG_GUIDE_OPEN.grove = id => { if (LC.some(t => t.id === id)) lcOpen(id); };
['gg-learn-marks', 'gg-learn-close'].forEach(ev => window.addEventListener(ev, () => { if (S.tab === 'life') { const y = window.scrollY; render(); window.scrollTo(0, y); } }));

/* ---------- the Group Check-in ---------- */
const SCORE = { n: 1, s: 2, o: 3, a: 4 };
// The internal level for a part (1 to 10, this grove only). Never shown, printed, or exported: only the words come out.
function levelsOf(ci) {
  const Q = questionsFor(G.kind), out = {};
  PARTS6.forEach(p => {
    const vals = [];
    (Q[p.key] || []).forEach((q, i) => { const a = (ci.ans || {})[p.key + '.' + i]; if (SCORE[a]) vals.push(q.rev ? 5 - SCORE[a] : SCORE[a]); });
    if (!vals.length) { out[p.key] = null; return; }
    const ten = Math.round(1 + (vals.reduce((x, y) => x + y, 0) / vals.length - 1) * 3);
    out[p.key] = ten >= 8 ? 'strength' : ten >= 5 ? 'steady' : 'edge';
  });
  return out;
}
function qText(q) { return plainMode() && q.plain ? q.plain : q.q; }
function kidText(q) { return plainMode() && q.kidPlain ? q.kidPlain : q.kid; }
function lockedHtml(what) {
  return `<div class="card gv-locked"><h3>${icon('lock')} ${esc(what)} Is Locked</h3><p>The check-ins, the Growth Plan, What's Changed Lately, and Who's in Our Circle are locked with the grove passcode, on this device only.</p><button class="btn btn-gold btn-sm" data-act="unlock">Unlock</button></div>` + helpCardHtml(true);
}
function viewCheckin() {
  const K = KW();
  if (!vaultOpen()) return `<div class="section-head"><h2>${esc(K.checkin)}</h2></div>` + lockedHtml(K.checkin);
  if (S.ci) return runnerHtml();
  const v = V(), list = v.checkins.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)) || String(b.id).localeCompare(String(a.id)));
  const showing = list.find(c => c.id === S.view) || null;
  let h = `<div class="section-head"><h2>${esc(K.checkin)}</h2><p>${esc(Wk(K.leaderIntro, G.kind) || `Read each question aloud together, talk it over, and settle on one answer for ${K.we}. No one's own answer is ever entered or kept.`)}</p></div>`;
  if (K.privacyLine) h += `<p class="muted">${icon('lock', 'gv-ic-inline')} ${esc(K.privacyLine)}</p>`;
  if (showing) return h + `<p><button class="btn btn-line btn-sm" data-act="ciback">${icon('back')} All Check-ins</button></p>` + resultsHtml(showing) + helpCardHtml(true);
  h += `<div class="card"><h3>Check In Together</h3><p>Answers in words: Not Yet, Sometimes, Often, Almost Always. When you don't agree, choose We See It Differently, and it becomes a Thing to Talk About. Pass skips a question with nothing lost.</p>
    <div class="tools-row" style="justify-content:flex-start"><button class="btn btn-gold btn-sm" data-act="cistart" data-id="full">Full ${esc(K.checkin)}, 24 Questions</button><button class="btn btn-line btn-sm" data-act="cistart" data-id="quick">Quick Check-in, 6 Questions</button></div>
    <p class="muted">The full one takes ${esc(K.time)}. The quick one fits a weekly huddle or the end of a gathering.</p></div>`;
  if (list.length) {
    h += resultsHtml(list[0]);
    h += seasonsHtml();
    h += `<div class="card"><h3>Earlier Check-ins</h3><ul class="gv-fam-list">${list.map(c => `<li><div><b>${esc(longDate(c.date))}</b><span>${c.quick ? 'Quick check-in' : 'Full check-in'}</span></div><button class="btn btn-line btn-sm" data-act="ciview" data-id="${esc(c.id)}">Open</button></li>`).join('')}</ul></div>`;
  }
  return h + helpCardHtml(true) + srcFor('checkin');
}
function runnerHtml() {
  const K = KW(), ci = S.ci;
  if (ci.step === 'changes') {
    return `<div class="section-head"><h2>${esc(K.checkin)}</h2><p>Before the questions: what's changed lately? Tap any that fit. This helps choose practices, and never changes a result.</p></div>
      <div class="card"><h3>What's Changed Lately?</h3><div class="gv-chips">${changesFor(G.kind).map(c => `<button type="button" class="chip${ci.changes.includes(c.id) ? ' on' : ''}" aria-pressed="${ci.changes.includes(c.id)}" data-act="cichange" data-id="${esc(c.id)}">${esc(c.label)}</button>`).join('')}</div>
      <div class="tools-row" style="justify-content:flex-start"><button class="btn btn-gold btn-sm" data-act="cinext">Start the Questions</button><button class="btn btn-line btn-sm" data-act="cistop">Stop</button></div></div>` + helpCardHtml(true);
  }
  const list = qList(G.kind, ci.quick), item = list[ci.i], q = item.q, part = PARTS6.find(p => p.key === item.part), cur = ci.ans[item.key];
  const kid = kidsOn() && kidText(q);
  return `<div class="section-head"><h2>${esc(K.checkin)}</h2><p>Question ${ci.i + 1} of ${list.length}. ${ci.quick ? 'Quick check-in.' : ''}</p></div>
    <div class="card gv-q" style="--pc:${part.color}"><p class="gv-kicker">${icon(part.key, 'gv-ic-inline')} ${esc(part.name)}, ${esc(part.sub)}</p>
    ${G.kidsFirst && kidsOn() ? `<p class="gv-tip"><b>Children first.</b> Let the children answer before the grown-ups speak.</p>` : ''}
    <p class="gv-qtext" id="gv-qtext">${esc(qText(q))}</p>${kid ? `<p class="gv-qkid">For children: ${esc(kid)}</p>` : ''}
    <div class="gv-acts"><button type="button" class="btn btn-line btn-sm" data-act="ciread">Read Aloud</button></div>
    <details class="gv-why"><summary>Why this question?</summary><p>${esc(q.why || Wk(W('results.why.' + item.part), G.kind) || 'It helps ' + K.we + ' notice ' + part.sub.toLowerCase() + ' together.')}</p></details>
    ${q.tip ? `<p class="gv-tip"><b>Leader tip.</b> ${esc(q.tip)}</p>` : ''}
    <div class="gv-ans" role="group" aria-label="Our shared answer">${ANSWERS.map(([k, l]) => `<button type="button" class="gv-a${cur === k ? ' on' : ''}" aria-pressed="${cur === k}" data-act="cians" data-id="${k}">${l}</button>`).join('')}</div>
    <div class="gv-ans gv-ans2">${ASPECIAL.map(([k, l]) => `<button type="button" class="gv-a gv-a2${cur === k ? ' on' : ''}" aria-pressed="${cur === k}" data-act="cians" data-id="${k}">${l}</button>`).join('')}</div>
    <div class="tools-row" style="justify-content:space-between">${ci.i > 0 ? `<button class="btn btn-line btn-sm" data-act="ciprev">${icon('back')} Back</button>` : '<span></span>'}<button class="btn btn-line btn-sm" data-act="cistop">Stop</button></div></div>` + helpCardHtml(true);
}
function ciAnswer(k) {
  const ci = S.ci, list = qList(G.kind, ci.quick); ci.ans[list[ci.i].key] = k;
  if (ci.i < list.length - 1) { ci.i++; render(); focusQ(); return; }
  const rec = { id: uid(), date: today(), at: new Date().toISOString(), quick: !!ci.quick, changes: ci.changes.slice(), ans: Object.assign({}, ci.ans) };
  const v = V(); v.checkins.push(rec); v.changes = rec.changes.slice();
  S.ci = null; S.view = rec.id;
  const gNow = G;
  sealVault().then(() => { render(); toast('Check-in saved, locked with the grove.'); window.scrollTo({ top: $('#app').offsetTop - 10 }); keepSafeNote(gNow); });
}
function focusQ() { const t = $('#gv-qtext'); if (t) { t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); } }
function resultsHtml(ci) {
  const K = KW(), L = levelsOf(ci), Q = questionsFor(G.kind);
  const by = lv => PARTS6.filter(p => L[p.key] === lv);
  const st = by('strength'), sd = by('steady'), ed = by('edge'), none = PARTS6.filter(p => !L[p.key]);
  const line = (kind, part) => Wk(W('results.' + kind + '.' + part), G.kind);
  const DEF = { strength: p => `${p.name} is a Shared Strength. Keep doing what grows it.`, edge: p => `${p.name} is where ${K.we} wants to grow next.` };
  let h = `<div class="card gv-results"><h3>${ci.quick ? 'Our Quick Check-in' : 'Our ' + esc(K.checkin)}, ${esc(longDate(ci.date))}</h3>`;
  if (W('results.intro')) h += `<p class="muted">${esc(Wk(W('results.intro'), G.kind))}</p>`;
  h += resultScene(L);
  if (st.length) h += `<h4>Our Shared Strengths</h4><ul class="gv-rlist">${st.map(p => `<li style="--pc:${p.color}"><b>${p.name}</b> <span>${esc(line('strength', p.key) || DEF.strength(p))}</span></li>`).join('')}</ul>`;
  if (sd.length) h += `<h4>Steady</h4><p>${esc(list3(sd.map(p => p.name)))}. ${esc(sd.length === 1 ? (line('steady', sd[0].key) || 'Steady ground to grow from.') : 'Steady ground to grow from.')}</p>`;
  if (ed.length) h += `<h4>Our Growing Edges</h4><ul class="gv-rlist">${ed.map(p => `<li style="--pc:${p.color}"><b>${p.name}</b> <span>${esc(line('edge', p.key) || DEF.edge(p))}</span>${ideasHtml(p.key)}</li>`).join('')}</ul>`;
  else h += `<p>${esc(Wk(W('results.noEdges'), G.kind) || 'No Growing Edges this time. Pick any part to grow in your plan, or keep a Shared Strength going.')}</p>`;
  if (none.length) h += `<p class="muted">${esc(list3(none.map(p => p.name)))}: passed this time.</p>`;
  const talk = []; PARTS6.forEach(p => (Q[p.key] || []).forEach((q, i) => { if ((ci.ans || {})[p.key + '.' + i] === 'd') talk.push(qText(q)); }));
  if (talk.length) h += `<h4>Things to Talk About</h4><p class="muted">${esc(Wk(W('results.talkIntro'), G.kind) || 'You saw these differently. That is good to know. Talk them over gently, never about who saw it which way.')}</p><ul>${talk.map(t => `<li>${esc(Wk(W('results.talkLead'), G.kind) || '')}${esc(t)}</li>`).join('')}</ul>`;
  h += `<p class="gv-shape">${esc(Wk(W('results.oneShape'), G.kind) || (isFamily() ? 'No family is strong in all six. Every grove has its own shape.' : 'No group is strong in all six. Every grove has its own shape.'))}</p>`;
  if (ci.quick) h += `<p class="muted">${esc(Wk(W('results.quickLine'), G.kind) || 'A quick check-in is a snapshot of this week. The full check-in adds a ring to the grove.')}</p>`;
  h += lcAfterCheckin(ci);
  const v = V();
  h += `<div class="tools-row" style="justify-content:flex-start">${!v.plan ? '<button class="btn btn-gold btn-sm" data-act="startplan">Make Our Growth Plan</button>' : ''}<button class="btn btn-line btn-sm" data-act="print" data-id="summary" data-ci="${esc(ci.id)}">${icon('print')} Print Our Check-in Summary</button></div>${srcFor('results')}</div>`;
  return h;
}
// The grove painting with a lit marker for each part: full light for a Shared Strength, soft light for Steady, an open ring for a Growing Edge.
function resultScene(L) {
  const art = window.GGLiving ? GGLiving.svg('grove', .85, 'The grove painting').replace('<svg ', '<svg preserveAspectRatio="xMidYMax slice" ') : '';
  return `<div class="gv-rscene">${art}<ul class="gv-rmarks" aria-label="Each part, in words">${PARTS6.map(p => `<li class="lv-${L[p.key] || 'none'}" style="--pc:${p.color}"><span aria-hidden="true"></span><b>${p.name}</b><small>${L[p.key] ? LEVEL[L[p.key]] : 'Passed'}</small></li>`).join('')}</ul></div>`;
}
function ideasHtml(part) {
  const list = joinOrder(kindPractices(part)).slice(0, 3); if (!list.length) return '';
  return `<p class="muted gv-ideas">Ideas: ${list.map(p => esc(pv(p).name)).join(', ')}.</p>`;
}
// Seasons: each full check-in becomes a ring for the grove, in words. Quick check-ins show as short weekly lines.
function seasonsHtml() {
  const v = V(), full = v.checkins.filter(c => !c.quick).sort((a, b) => String(a.date).localeCompare(String(b.date)) || String(a.at).localeCompare(String(b.at)));
  const quick = v.checkins.filter(c => c.quick).sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 6);
  if (!full.length && !quick.length) return '';
  const ring = W('seasons.ringLine', '{part} grew from {from} to {to}'), now = W('seasons.nowLine', '{part} is {level} this season');
  let h = `<div class="card gv-seasons"><h3>Our Seasons</h3>`;
  if (full.length) h += `<ol class="gv-rings">${full.map((c, k) => {
    const L = levelsOf(c);
    if (!k) return `<li><b>Ring ${k + 1}, ${esc(longDate(c.date))}</b><span>${esc(W('seasons.firstRing', 'Our first ring.'))}</span></li>`;
    const P = levelsOf(full[k - 1]), rank = { edge: 1, steady: 2, strength: 3 }, lines = [];
    PARTS6.forEach(p => { const a = P[p.key], b = L[p.key]; if (!a || !b || a === b) return; lines.push(rank[b] > rank[a] ? fill(ring, { part: p.name, from: LEVEL[a], to: LEVEL[b] }) : fill(now, { part: p.name, level: LEVEL[b] })); });
    return `<li><b>Ring ${k + 1}, ${esc(longDate(c.date))}</b><span>${esc(lines.length ? lines.join('. ') + '.' : 'Every part held its place.')}</span></li>`;
  }).join('')}</ol>`;
  if (quick.length) h += `<h4>Quick Check-ins</h4><ul class="gv-quicks">${quick.map(c => { const L = levelsOf(c), s = PARTS6.filter(p => L[p.key] === 'strength').map(p => p.name), e = PARTS6.filter(p => L[p.key] === 'edge').map(p => p.name);
    return `<li><b>Week of ${esc(nice(weekStart(c.date)))}</b><span>${esc([s.length ? 'Shared Strength in ' + list3(s) : '', e.length ? 'Growing Edge in ' + list3(e) : ''].filter(Boolean).join('; ') || 'Steady all around')}.</span></li>`; }).join('')}</ul>`;
  return h + `</div>`;
}

/* ---------- the Group Growth Plan ---------- */
const planWeek = p => p && p.start ? Math.floor(Math.max(0, between(p.start, today())) / 7) + 1 : 1;
function latestCheckin(full) { const v = V(); return v ? v.checkins.filter(c => !full || !c.quick).sort((a, b) => String(b.date).localeCompare(String(a.date)) || String(b.at).localeCompare(String(a.at)))[0] : null; }
function startPlan(from) {
  const ci = latestCheckin(), L = ci ? levelsOf(ci) : {};
  const edges = PARTS6.filter(p => L[p.key] === 'edge').map(p => p.key).slice(0, 2);
  S.pd = from ? JSON.parse(JSON.stringify(from)) : { edges, items: [], youngest: '', strength: '', words: '', own: '', from: ci ? ci.id : '' };
  S.pd.suggest = PARTS6.filter(p => L[p.key] === 'edge').map(p => p.key);
  S.pd.strong = PARTS6.filter(p => L[p.key] === 'strength').map(p => p.key);
  S.tab = 'plan'; render();
}
function viewPlan() {
  const K = KW();
  if (!vaultOpen()) return `<div class="section-head"><h2>${esc(K.plan)}</h2></div>` + lockedHtml('The Growth Plan');
  if (S.pd) return builderHtml();
  const v = V();
  if (v.plan) return planHtml(v.plan);
  let h = `<div class="section-head"><h2>${esc(K.plan)}</h2><p>${esc(W('plan.intro', 'Built from your check-in, together, in about five minutes: one or two Growing Edges, two or three practices, each anchored to a time you are already together.'))}</p></div>`;
  if (!v.checkins.length) h += `<div class="card"><h3>Start With a Check-in</h3><p>The plan grows from your ${esc(K.checkin)}. You can also make a plan now and check in later.</p><div class="tools-row" style="justify-content:flex-start"><button class="btn btn-gold btn-sm" data-tab="checkin">Go to the Check-in</button><button class="btn btn-line btn-sm" data-act="startplan">Make a Plan Now</button></div></div>`;
  else h += `<div class="card"><h3>Make ${esc(K.plan)}</h3><p>From your check-in on ${esc(nice(latestCheckin().date))}.</p><button class="btn btn-gold btn-sm" data-act="startplan">Make Our Plan</button></div>`;
  if (v.plans.length) h += earlierPlansHtml();
  return h + helpCardHtml();
}
function builderHtml() {
  const K = KW(), pd = S.pd, L2 = LEVERS();
  const step = (n, t, sub) => `<h3 class="gv-step"><span>${n}</span>${esc(t)}</h3>${sub ? `<p class="muted">${esc(sub)}</p>` : ''}`;
  let h = `<div class="section-head"><h2>${esc(K.plan)}</h2><p>${esc(W('plan.intro', 'About five minutes, together.'))}</p></div><div class="card gv-builder">`;
  h += step(1, 'Pick One or Two Growing Edges', W('plan.stepEdges', '') + (pd.suggest.length ? ' Suggested from your check-in; any part can be chosen.' : ' Any part can be chosen.'));
  h += `<div class="gv-chips">${PARTS6.map(p => `<button type="button" class="chip${pd.edges.includes(p.key) ? ' on' : ''}" aria-pressed="${pd.edges.includes(p.key)}" data-act="pdedge" data-id="${p.key}">${p.name}${pd.suggest.includes(p.key) ? ' (Suggested)' : ''}</button>`).join('')}</div>`;
  h += step(2, 'Pick Two or Three Practices', W('plan.stepPractices', 'One that lightens the load, one that adds support, or one that looks at things a new way all help.'));
  if (!pd.edges.length) h += `<p class="muted">Pick a Growing Edge first.</p>`;
  pd.edges.forEach(k => { const p = PARTS6.find(x => x.key === k), list = joinOrder(kindPractices(k));
    h += `<p class="lbl" style="--pc:${p.color}">${p.name}</p><div class="gv-picklist">${list.map(x => { const on = pd.items.some(i => i.pid === x.id), y = pv(x);
      return `<button type="button" class="gv-pickp${on ? ' on' : ''}" aria-pressed="${on}" data-act="pdprac" data-id="${esc(x.id)}"><b>${esc(y.name)}</b><span>${esc(y.text)}</span>${x.lever ? `<small>${esc(L2[x.lever] || '')}</small>` : ''}${fitsCircle(x) ? '<small>Fits Our Circle</small>' : ''}</button>`; }).join('')}</div>`; });
  if (pd.items.length) {
    h += step(3, 'Anchor Each Practice', W('plan.stepAnchor', 'Anchor each practice to a time you are already together. This is how routines stick.'));
    const anchors = W('plan.anchors.' + G.kind, null) || ANCHORS_DEF[G.kind];
    pd.items.forEach((it, n) => { const x = TP[it.pid]; if (!x) return;
      h += `<p class="lbl">${esc(pv(x).name)}</p><div class="gv-chips">${anchors.map(a => `<button type="button" class="chip${it.anchor === a ? ' on' : ''}" aria-pressed="${it.anchor === a}" data-act="pdanchor" data-n="${n}" data-id="${esc(a)}">${esc(a)}</button>`).join('')}</div><input class="gv-input" data-pd="anchor" data-n="${n}" maxlength="60" placeholder="Or our own time" value="${esc(anchors.includes(it.anchor) ? '' : it.anchor || '')}" aria-label="Our own time for ${esc(pv(x).name)}">`; });
  }
  let n = 4;
  if (isFamily() && kidsOn()) {
    h += step(n++, 'One Choice From the Youngest', W('plan.stepYoungest', 'Let the youngest pick one practice for the plan.'));
    const kidList = kindPractices().filter(x => x.kid);
    h += `<label class="lbl" for="gv-pdy">The youngest picked</label><select id="gv-pdy" class="gv-input" data-pd="youngest"><option value="">Choose one</option>${kidList.map(x => `<option value="${esc(x.id)}"${pd.youngest === x.id ? ' selected' : ''}>${esc(pv(x).name)}</option>`).join('')}</select>`;
  }
  if (pd.strong.length) {
    h += step(n++, 'Keep One Shared Strength Going', W('plan.stepStrength', 'One practice from a part that is already strong, so the plan grows what already works.'));
    const sl = pd.strong.flatMap(k => joinOrder(kindPractices(k)).slice(0, 4));
    h += `<div class="gv-chips">${sl.map(x => `<button type="button" class="chip${pd.strength === x.id ? ' on' : ''}" aria-pressed="${pd.strength === x.id}" data-act="pdstrength" data-id="${esc(x.id)}">${esc(pv(x).name)}</button>`).join('')}</div>`;
  }
  h += step(n++, 'Our Words', W('plan.stepWords', 'Optional.'));
  h += `<label class="lbl" for="gv-pdw">${esc(W('plan.wordsPrompt', 'What this plan means to us, in a line'))}</label><textarea id="gv-pdw" class="gv-input" rows="2" maxlength="200" data-pd="words">${esc(pd.words)}</textarea>`;
  h += `<label class="lbl" for="gv-pdo">${esc(W('plan.ownPracticePrompt', 'Our own tradition or practice to add'))}</label><input id="gv-pdo" class="gv-input" maxlength="120" data-pd="own" value="${esc(pd.own)}">`;
  h += step(n++, 'Our Rhythm', '');
  h += `<p>${esc(W('plan.rhythm', 'Twelve weeks together, with a quick check-in at weeks 4 and 8 and a full check-in at week 12.'))}</p>`;
  h += `<p class="gv-err" id="gv-pderr" role="alert"></p><div class="tools-row" style="justify-content:flex-start"><button class="btn btn-gold btn-sm" data-act="pdsave">Save Our Plan</button><button class="btn btn-line btn-sm" data-act="pdcancel">Cancel</button></div></div>`;
  return h;
}
function savePlan() {
  const pd = S.pd, err = $('#gv-pderr');
  if (!pd.edges.length) { err.textContent = 'Pick at least one Growing Edge.'; return; }
  const avail = pd.edges.reduce((n, k) => n + kindPractices(k).length, 0);
  if (pd.items.length < Math.min(2, avail)) { err.textContent = 'Pick two or three practices.'; return; }
  const v = V(), old = v.plan;
  if (old && !pd.keep) v.plans.push(Object.assign({}, old, { ended: today() }));
  v.plan = { edges: pd.edges.slice(), items: pd.items.map(i => ({ pid: i.pid, anchor: i.anchor || '' })), youngest: pd.youngest || '', strength: pd.strength || '', words: (pd.words || '').trim(), own: (pd.own || '').trim(),
    from: pd.from || '', start: pd.keep && old ? old.start : today(), made: today() };
  S.pd = null;
  sealVault().then(() => { render(); toast(W('plan.done', 'Our plan is saved, locked with the grove.')); });
}
function planHtml(p) {
  const K = KW(), wk = planWeek(p), v = V();
  const after = d => v.checkins.filter(c => c.date >= addDays(p.start, d));
  let h = `<div class="section-head"><h2>${esc(K.plan)}</h2><p>Started ${esc(longDate(p.start))}. Week ${Math.min(12, wk)} of 12.</p></div><div class="card gv-plan">`;
  h += `<p><b>Growing:</b> ${p.edges.map(k => `<span class="gv-part" style="--pc:${(PARTS6.find(x => x.key === k) || {}).color}">${PNAME[k]}</span>`).join(' ')}</p>`;
  const rows = p.items.map(it => ({ x: TP[it.pid], anchor: it.anchor, tag: '' })).filter(r => r.x);
  if (p.youngest && TP[p.youngest]) rows.push({ x: TP[p.youngest], anchor: '', tag: 'The Youngest’s Choice' });
  if (p.strength && TP[p.strength]) rows.push({ x: TP[p.strength], anchor: '', tag: 'Keeping a Shared Strength Going' });
  h += rows.map(r => practiceCard(r.x, false, `${r.tag ? `<p class="gv-kicker">${esc(r.tag)}</p>` : ''}${r.anchor ? `<p class="muted">When: ${esc(r.anchor)}</p>` : ''}${r.x.lever ? `<p class="muted">${esc(LEVERS()[r.x.lever] || '')}</p>` : ''}`)).join('');
  if (p.own) h += `<div class="gv-prac" style="--pc:var(--accent)"><div class="gv-prac-top"><b>Our Own Practice</b></div><p>${esc(p.own)}</p></div>`;
  if (p.words) h += `<blockquote class="gv-words">${esc(p.words)}</blockquote>`;
  // The rhythm: quick check-ins at weeks 4 and 8, a full check-in at week 12.
  const due = wk >= 12 && !after(77).some(c => !c.quick) ? 'full' : wk >= 8 && !after(49).length ? 'quick8' : wk >= 4 && !after(21).length ? 'quick4' : '';
  if (due) h += `<div class="gv-due"><b>${esc(due === 'full' ? W('seasons.week12', 'Week 12: time for a full check-in.') : due === 'quick8' ? W('seasons.week8', 'Week 8: time for a quick check-in.') : W('seasons.week4', 'Week 4: time for a quick check-in.'))}</b> <button class="btn btn-gold btn-sm" data-act="cistart" data-id="${due === 'full' ? 'full' : 'quick'}">${due === 'full' ? 'Start the Full Check-in' : 'Start the Quick Check-in'}</button></div>`;
  else h += `<p class="muted">${esc(W('plan.rhythm', 'Twelve weeks together, with a quick check-in at weeks 4 and 8 and a full check-in at week 12.'))}</p>`;
  h += `<div class="tools-row" style="justify-content:flex-start"><button class="btn btn-line btn-sm" data-act="print" data-id="plan">${icon('print')} Print Our Growth Plan</button><button class="btn btn-line btn-sm" data-act="print" data-id="card">${icon('print')} Print Our Practice Card</button><button class="btn btn-line btn-sm" data-act="editplan">Change Our Plan</button></div></div>`;
  if (wk > 12) h += seasonEndHtml();
  if (v.plans.length) h += earlierPlansHtml();
  return h + srcFor('plan') + helpCardHtml();
}
function seasonEndHtml() {
  const K = KW(), cls = G.kind === 'classroom';
  return `<div class="card gv-season-end"><h3>${esc(W('certificate.title', 'Twelve Weeks Together'))}</h3><p>${esc(W('certificate.sub', '') || `Twelve weeks of growing together. That is worth marking, as ${K.we}.`)}</p>
    <div class="tools-row" style="justify-content:flex-start"><button class="btn btn-gold btn-sm" data-act="cert">Print Our Certificate</button><button class="btn btn-line btn-sm" data-act="newseason">${esc(W('seasons.newSeason', 'Start a New Season Together'))}</button>${cls ? '<button class="btn btn-line btn-sm" data-act="closeclass">Close Our Class Grove</button>' : ''}</div>
    <p class="muted">${esc(Wk(W('seasons.newSeasonText'), G.kind) || 'A new season begins with a full check-in and a fresh plan. This plan is kept with your earlier plans.')}</p></div>`;
}
function earlierPlansHtml() {
  const v = V();
  return `<div class="card"><h3>Earlier Plans</h3><ul class="gv-fam-list">${v.plans.slice().reverse().map(p => `<li><div><b>${esc(longDate(p.start))}${p.ended ? ' to ' + esc(longDate(p.ended)) : ''}</b><span>${p.edges.map(k => PNAME[k]).join(', ')}: ${p.items.map(i => TP[i.pid] ? pv(TP[i.pid]).name : '').filter(Boolean).join(', ')}</span></div></li>`).join('')}</ul></div>`;
}

/* ---------- Settings ---------- */
function viewSettings() {
  const K = KW(), cls = G.kind === 'classroom', fixedPlain = cls && G.school !== 'faith';
  let h = `<div class="section-head"><h2>Settings</h2><p>For ${esc(G.name || K.name)}. Each grove keeps its own settings.</p></div>`;
  h += `<div class="card"><h3>Our Grove</h3><label class="lbl" for="gv-name">Name</label><input id="gv-name" class="gv-input" maxlength="40" value="${esc(G.name)}"><button class="btn btn-line btn-sm" data-act="setname">Save the Name</button>
    <p class="lbl">Kind of grove</p><div class="gv-chips">${KIND_IDS.map(k => `<button type="button" class="chip${G.kind === k ? ' on' : ''}" aria-pressed="${G.kind === k}" data-act="setgkind" data-id="${k}">${esc(KW(k).long)}</button>`).join('')}</div>
    <p class="muted">Changing the kind changes the words, questions, and practices. Check-ins and plans you made stay.</p></div>`;
  h += `<div class="card"><h3>Words</h3>`;
  if (cls) h += `<p class="lbl">Where is this class?</p><div class="gv-chips">${[['public', 'Public School'], ['faith', 'Faith-Based School'], ['other', 'Homeschool or Program']].map(([id, l]) => `<button type="button" class="chip${(G.school || 'public') === id ? ' on' : ''}" aria-pressed="${(G.school || 'public') === id}" data-act="setgschool" data-id="${id}">${l}</button>`).join('')}</div>`;
  h += `<p class="lbl">Faith or Plain</p>${fixedPlain ? `<p class="muted">Plain, about class life only.${G.school === 'other' ? '' : ' A public school class keeps Plain wording.'}</p>` : `<div class="gv-chips">${[['faith', 'Faith'], ['plain', 'Plain']].map(([id, l]) => `<button type="button" class="chip${(plainMode() ? 'plain' : 'faith') === id ? ' on' : ''}" aria-pressed="${(plainMode() ? 'plain' : 'faith') === id}" data-act="setgfaith" data-id="${id}">${l}</button>`).join('')}</div><p class="muted">Faith wording names prayer, worship, and the sacred, for all faith traditions and everything in-between. Plain wording speaks of quiet, thanks, and what matters most.</p>`}`;
  if (G.kind !== 'team') h += switchHtml('gchildren', G.children, 'Children Take Part', G.children ? 'On. Kid lines show under each question and practice.' : 'Off.');
  if (G.kind !== 'team' && G.children) h += switchHtml('gkidsfirst', G.kidsFirst, "Children's Turn First", G.kidsFirst ? 'On. A reminder on each question to let the children answer first.' : 'Off.');
  if (!isFamily()) h += switchHtml('gwall', G.wallOn, cls ? 'Teacher Notes' : 'The Wall', G.wallOn ? 'On. Short notes from the ' + (cls ? 'teacher' : 'leader') + ', and practices done together.' : 'Off.');
  h += `</div>`;
  if (isFamily()) {
    h += `<div class="card"><h3>A Hard Season</h3>${switchHtml('ghard', G.hard, 'We Are in a Hard Season', G.hard ? 'On. Your hospice 24/7 line shows first in the help card.' : 'Off. Turn it on when someone in the family is in hospice or seriously ill.')}`;
    if (G.hard) h += `<label class="lbl" for="gv-lname">Hospice name (optional)</label><input id="gv-lname" class="gv-input" maxlength="60" value="${esc((G.line || {}).name || '')}"><label class="lbl" for="gv-lphone">Hospice 24/7 phone number</label><input id="gv-lphone" class="gv-input" type="tel" maxlength="30" value="${esc((G.line || {}).phone || '')}" placeholder="320-555-0100"><button class="btn btn-line btn-sm" data-act="setline">Save the Line</button><p class="muted"><a class="text-link" href="/willow/">Willow</a> is for the person in hospice and the people who love them. A remembered willow stays in the grove.</p>`;
    h += `</div>`;
  }
  h += `<div class="card"><h3>${icon('circle', 'gv-ic-inline')} Who's in Our Circle</h3>`;
  if (!vaultOpen()) h += `<p class="muted">Locked with the grove passcode.</p><button class="btn btn-gold btn-sm" data-act="unlock">Unlock</button>`;
  else { const c = V().circle || [];
    h += `<p class="muted">${esc(W('circle.intro', 'Pick any that are part of our circle. Practices that fit come first, with a way for everyone to join.'))} ${esc(W('circle.note', 'It never changes a question, a result, or a help line.'))}</p><div class="gv-chips">${CIRCLE.map(([id, l]) => `<button type="button" class="chip${c.includes(id) ? ' on' : ''}" aria-pressed="${c.includes(id)}" data-act="circle" data-id="${id}">${esc(l)}</button>`).join('')}</div>`; }
  h += `</div>`;
  h += `<div class="card"><h3>${icon('lock', 'gv-ic-inline')} The Grove Lock</h3><p class="muted">${G.lockOn ? 'On. The check-ins, the plan, and the circle choices are locked with the grove passcode. The Wall and practices done together stay readable on this device.' : 'Off. Anyone using this device can open the check-ins and the plan.'}</p><div class="tools-row" style="justify-content:flex-start">`
    + (G.lockOn ? (vaultOpen() ? `<button class="btn btn-line btn-sm" data-act="glock">Lock Now</button><button class="btn btn-line btn-sm" data-act="gpass">Change the Passcode</button><button class="btn btn-line btn-sm" data-act="groot">${G.lock && G.lock.rw ? 'See Our Root Words' : 'Make Our Root Words'}</button><button class="btn btn-line btn-sm" data-act="glockoff">Turn the Lock Off</button>` : `<button class="btn btn-gold btn-sm" data-act="unlock">Unlock</button>`) : `<button class="btn btn-gold btn-sm" data-act="glockon">Turn the Lock On</button>`) + `</div></div>`;
  h += `<div class="card"><h3>${icon('print', 'gv-ic-inline')} Printouts</h3><div class="tools-row" style="justify-content:flex-start">`
    + (!isFamily() ? `<button class="btn btn-line btn-sm" data-act="print" data-id="agree">${esc(W('print.agreementsTitle', 'Group Agreements'))}</button>` : '')
    + (cls ? `<button class="btn btn-line btn-sm" data-act="print" data-id="notice">${esc(W('print.noticeTitle', 'Classroom Family Notice'))}</button>` : '')
    + `<button class="btn btn-line btn-sm" data-tab="plan">Our Plan and Practice Card</button></div></div>`;
  h += moveOnHtml(true);
  h += `<div class="card"><h3>Keep It Safe</h3><p class="muted">Back Up Everything saves one locked file with every grove and profile on this device, for a lost or broken phone: keep it on this device, iCloud Drive, or another drive. Save to a File keeps just this grove, locked with a passcode, to keep it or move it to another device.${G.lockOn ? ' The grove\'s Root Words open its locked part if the passcode is ever forgotten.' : ''}</p><div class="tools-row" style="justify-content:flex-start"><button class="btn btn-gold btn-sm" data-act="gbackup">Back Up Everything</button><button class="btn btn-line btn-sm" data-act="savefile">Save to a File</button><button class="btn btn-line btn-sm" data-act="loadfile">Load From a File</button><button class="btn btn-line btn-sm" data-act="gvload">From Your Guide's Visit</button></div>
    <h3 style="margin-top:18px">Clear This Grove</h3><p class="muted">Removes this grove and everything in it from this device. Other groves stay.</p><button class="btn btn-line btn-sm" data-act="cleargrove">Clear This Grove</button></div>`;
  return h + helpCardHtml();
}

/* ---------- move-on offers ---------- */
function ownTreeChips() { return [['Oak', '/oak/', 'Grown-ups'], ['Birch', '/birch/', 'Young Adults'], ['Sequoia', '/sequoia/', '60 and Up'], ['Pine', '/pine/', 'High School'], ['Aspen', '/aspen/', 'Middle School'], ['Maple', '/maple/', 'Kids']].map(t => `<a class="btn btn-line btn-sm" href="${t[1]}">${t[0]}<span class="sr-only">, ${t[2]}</span></a>`).join(''); }
// grove/kinds.js words may begin with the offer's own name ("Take The Grove Home: ..."); the card shows the name once.
const moW = (k, d) => String(W('moveOn.' + k, d)).replace(/^[^:.]{3,40}:\s*/, '').replace(/^./, c => c.toUpperCase());
function moveOnHtml(all) {
  const K = KW(), kind = G.kind;
  let h = `<div class="card gv-moveon"><h3>Where to Grow Next</h3>`;
  if (kind === 'faith' || kind === 'group') h += `<p><b>Take The Grove Home.</b> ${esc(moW('takeHome', 'Members can start a Family grove of their own at home. Print a card with a QR code to hand out.'))}</p><button class="btn btn-line btn-sm" data-act="print" data-id="home">Print the Take Home Card</button>`;
  if (kind === 'classroom' && all) h += `<p><b>Close Our Class Grove.</b> ${esc(moW('closeClass', 'At the end of the year: a goodbye circle, the certificate, and then the class grove is cleared from this device.'))}</p><button class="btn btn-line btn-sm" data-act="closeclass">Close Our Class Grove</button>`;
  if (isFamily() && G.hard) h += `<p><b>Willow.</b> ${esc(moW('hardSeason', 'For the person in hospice and the people who love them. A remembered willow stays in the grove.'))}</p><a class="btn btn-line btn-sm" href="/willow/">Open Willow</a>`;
  h += `<p><b>Start Your Own Tree.</b> ${esc(moW('ownTree', 'Everyone can tend their own tree, private to them, in the app for their age.'))}</p><div class="tools-row" style="justify-content:flex-start">${ownTreeChips()}</div>`;
  return h + `</div>`;
}

/* ---------- printouts (words only, never a number for a result) ---------- */
function loadScript(src) { return new Promise(ok => { if (document.querySelector('script[src="' + src + '"]')) return ok(); const s = document.createElement('script'); s.src = src; s.onload = s.onerror = () => ok(); document.head.appendChild(s); }); }
function printDoc(title, inner, win) {
  const K = KW();
  const hs = isFamily() && G.hard ? ' In a hard season, call your hospice 24/7 line first.' : '';
  const help = W('print.footer') ? (hs ? `<div class="help">${hs.trim()}</div>` : '') : `<div class="help"><b>If someone needs help now:</b> call or text 988, any time. If anyone is in danger, call 911.${hs}</div>`;
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><link rel="stylesheet" href="${location.origin}/fonts/fonts.css"><style>
    *{box-sizing:border-box}body{margin:0;background:#E6DFD2;font-family:Barlow,Helvetica,Arial,sans-serif;color:#2C1810;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .bar{position:sticky;top:0;display:flex;gap:10px;align-items:center;padding:10px 14px;background:#2E2118;color:#F6EFE2}.bar b{font-family:"Cormorant Garamond",Georgia,serif;font-size:20px;margin-right:auto}
    .bar button{min-height:44px;padding:8px 16px;border-radius:10px;border:1.5px solid #D9A847;background:#D9A847;color:#2E2118;font:inherit;font-weight:600;cursor:pointer}
    .sheet{background:#FFFCF6;max-width:8.5in;margin:14px auto 40px;padding:.6in .7in;box-shadow:0 2px 14px rgba(44,24,16,.18)}
    h1{font-family:"Cormorant Garamond",Georgia,serif;font-size:34px;margin:0 0 2px;color:#223829}h2{font-family:"Cormorant Garamond",Georgia,serif;font-size:22px;margin:22px 0 6px;color:#2F5A3C}
    .who{color:#6B5A4D;margin:0 0 16px}ul{padding-left:20px}li{margin:6px 0;line-height:1.45}.part{display:inline-block;border-left:4px solid var(--pc);padding:0 8px;margin-right:6px;font-weight:600}
    .card{border:1px solid #E3D8C4;border-radius:12px;padding:12px 14px;margin:10px 0;break-inside:avoid}.muted{color:#6B5A4D}.big{font-size:20px;line-height:1.5}
    .help{margin-top:26px;border-top:1px solid #E3D8C4;padding-top:10px;font-size:13px;color:#4A3B30}.co{margin-top:8px;font-size:12px;color:#6B5A4D;letter-spacing:2px;text-transform:uppercase;font-family:"Barlow Condensed",Arial,sans-serif}
    .qr{display:flex;gap:16px;align-items:center}.qr svg{width:1.4in;height:1.4in}
    @media print{.bar{display:none}body{background:none}.sheet{box-shadow:none;margin:0;max-width:none;padding:.5in .6in}}
    </style></head><body><div class="bar"><b>${esc(title)}</b><button onclick="window.print()">Print or Save as PDF</button></div><div class="sheet"><h1>${esc(title)}</h1><p class="who">${esc((G && G.name) || (G ? K.name : 'The Grove'))} · ${esc(longDate(today()))}</p>${inner}${help}<div class="co">Grow With Grounded · The Grove · growwithgrounded.com/grove</div>${W('print.footer') ? `<div class="help">${esc(W('print.footer'))}</div>` : ''}</div></body></html>`;
  const w = win || window.open('', '_blank');
  if (w && w.document) { w.document.open(); w.document.write(html); w.document.close(); return; }
  toast('Allow pop-ups for this page to print.');
}
function printWhat(id, ciId) {
  const K = KW(), v = V(), part = k => { const p = PARTS6.find(x => x.key === k); return `<span class="part" style="--pc:${p.color}">${p.name}</span>`; };
  if (id === 'summary') {
    const ci = v.checkins.find(c => c.id === ciId) || latestCheckin(); if (!ci) return;
    const L = levelsOf(ci), Q = questionsFor(G.kind), line = (kd, k) => Wk(W('results.' + kd + '.' + k), G.kind);
    const st = PARTS6.filter(p => L[p.key] === 'strength'), sd = PARTS6.filter(p => L[p.key] === 'steady'), ed = PARTS6.filter(p => L[p.key] === 'edge');
    const talk = []; PARTS6.forEach(p => (Q[p.key] || []).forEach((q, i) => { if ((ci.ans || {})[p.key + '.' + i] === 'd') talk.push(qText(q)); }));
    let b = `<p class="muted">${ci.quick ? 'Quick check-in' : esc(K.checkin)}, ${esc(longDate(ci.date))}. Words only.</p>`;
    if (st.length) b += `<h2>Our Shared Strengths</h2><ul>${st.map(p => `<li>${part(p.key)} ${esc(line('strength', p.key))}</li>`).join('')}</ul>`;
    if (sd.length) b += `<h2>Steady</h2><p>${sd.map(p => part(p.key)).join(' ')}</p>`;
    if (ed.length) b += `<h2>Our Growing Edges</h2><ul>${ed.map(p => `<li>${part(p.key)} ${esc(line('edge', p.key))}</li>`).join('')}</ul>`;
    if (talk.length) b += `<h2>Things to Talk About</h2><ul>${talk.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;
    b += `<p class="muted">${esc(Wk(W('results.oneShape'), G.kind) || 'Every grove has its own shape.')}</p>`;
    return printDoc(W('print.summaryTitle', 'Our Check-in Summary'), b);
  }
  if (id === 'plan' || id === 'card') {
    const p = v.plan; if (!p) return;
    const rows = p.items.map(it => ({ x: TP[it.pid], anchor: it.anchor, tag: '' })).filter(r => r.x);
    if (p.youngest && TP[p.youngest]) rows.push({ x: TP[p.youngest], tag: 'The Youngest’s Choice' });
    if (p.strength && TP[p.strength]) rows.push({ x: TP[p.strength], tag: 'Keeping a Shared Strength Going' });
    if (id === 'plan') {
      let b = `<p class="big"><b>Growing:</b> ${p.edges.map(part).join(' ')}</p>${p.words ? `<p class="big"><i>${esc(p.words)}</i></p>` : ''}<h2>Our Practices</h2>`
        + rows.map(r => `<div class="card"><b>${esc(pv(r.x).name)}</b>${r.tag ? ` <span class="muted">(${esc(r.tag)})</span>` : ''}<br>${esc(pv(r.x).text)}${r.anchor ? `<br><span class="muted">When: ${esc(r.anchor)}</span>` : ''}</div>`).join('')
        + (p.own ? `<div class="card"><b>Our Own Practice</b><br>${esc(p.own)}</div>` : '')
        + `<h2>Our Rhythm</h2><p>Started ${esc(longDate(p.start))}. ${esc(W('plan.rhythm', 'Twelve weeks together, with a quick check-in at weeks 4 and 8 and a full check-in at week 12.'))}</p>`;
      return printDoc(K.plan, b);
    }
    const b = rows.map(r => `<div class="card"><h2>${esc(pv(r.x).name)}</h2><p>${esc(pv(r.x).text)}</p><ol>${String(pv(r.x).steps || '').split('|').filter(Boolean).map(s => `<li>${esc(s)}</li>`).join('')}</ol></div>`).join('');
    return printDoc(isFamily() ? W('print.cardTitle', 'Our Family Practice Card') : 'Our Practice Card', b);
  }
  if (id === 'agree') {
    const list = W('print.agreements', null) || ['We listen to understand.', 'One voice at a time.', 'What is shared here stays here.', 'Anyone can pass.', 'We speak for ourselves, using "I" and "we."', 'We start and end on time.', 'We look out for each other.'];
    return printDoc(W('print.agreementsTitle', 'Group Agreements'), `<ul class="big">${list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`);
  }
  if (id === 'notice') {
    const t = W('print.notice', 'Our class is using The Grove by Grow With Grounded this year, a short weekly circle about our class life together: how we listen, how we include each other, and how we take good breaks.\n\nThe class answers together, out loud, with one shared answer. No student\'s own answer is asked for, entered, or saved, and no names are kept. Questions are about class life only.\n\nEverything stays on the teacher\'s device. Nothing is sent anywhere.\n\nQuestions are welcome. Please reach out to the teacher any time.');
    return printDoc(W('print.noticeTitle', 'Classroom Family Notice'), String(t).split(/\n\n/).map(x => `<p class="big">${esc(x)}</p>`).join(''));
  }
  if (id === 'home') {
    const win = window.open('', '_blank');
    loadScript('/shared/gg-qr.js').then(() => {
      const q = window.GGQR && GGQR.svg ? GGQR.svg('https://growwithgrounded.com/grove/', { label: 'Scan to start a grove at home', border: 2 }) : '';
      printDoc('Take The Grove Home', `<div class="qr">${q}<div><p class="big">${esc(moW('takeHome', 'Start a Family grove of your own at home. Check in together, make a plan together, and do a few practices side by side.'))}</p><p>growwithgrounded.com/grove</p></div></div>`, win);
    });
  }
}
function printCert() {
  const K = KW(), go = () => GGPrint.certificate({ tree: 'grove', name: G.name || K.name, title: W('certificate.title', 'Twelve Weeks Together'), body: W('certificate.sub', 'Twelve weeks of growing together: checking in, making a plan, and practicing side by side.'), date: today() });
  if (window.GGPrint) go(); else loadScript('/shared/gg-print.js?v=b776').then(() => { if (window.GGPrint) go(); else toast('The certificate could not load. Check the connection.'); });
}

/* ---------- Earlier (Family) ---------- */
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
    <p>Everyone tends their own tree in their own app: <a class="text-link" href="/oak/">Oak</a> for grown-ups, <a class="text-link" href="/birch/">Birch</a> for young adults, <a class="text-link" href="/sequoia/">Sequoia</a> for older adults, <a class="text-link" href="/pine/">Pine</a> for high schoolers, <a class="text-link" href="/aspen/">Aspen</a> for middle schoolers, and <a class="text-link" href="/maple/">Maple</a> for kids. Personal check-ins, practices, and journals live there, private to each person.</p>
    <h3>Kinds of Grove</h3>
    <p>A grove can be a Family, a Classroom, a Faith Community, a Small or Discussion Group, or a Team or Workplace. The kind sets the words, the check-in questions, and the practices. One device holds up to six groves, each with its own name, kind, and lock.</p>
    <h3>Checking In Together</h3>
    <p>The Family Check-in (Class Check-in, Team Check-in, or Group Check-in) is read aloud together. For each question, talk it over and settle on one shared answer: Not Yet, Sometimes, Often, or Almost Always. When you don't agree, choose We See It Differently, and it becomes a Thing to Talk About. Pass skips a question. No one's own answer is ever entered, counted, or kept.</p>
    <p>Results come in words only: Our Shared Strengths, Steady, and Our Growing Edges, with each part's marker lit on the grove painting. Each full check-in adds a ring, so you can see how the grove grows season to season.</p>
    <h3>Our Growth Plan</h3>
    <p>Built together from the check-in in about five minutes: one or two Growing Edges, two or three practices anchored to a time you are already together, one choice from the youngest in a family, and one Shared Strength kept going. Twelve weeks, with quick check-ins at weeks 4 and 8. After twelve weeks, print your Twelve Weeks Together certificate.</p>
    <h3>What grows the grove</h3>
    <p>The practices you do together, and in a family, each person tending their own tree. Growth only adds. A quiet week never takes anything away.</p>
    <h3>The Wall</h3>
    <p>In a Family grove: short posts and reactions, so you can cheer each other on. Reactions show who reacted, not running totals. A Classroom has Teacher Notes instead, and other groves can turn a leader's wall on in Settings.</p>
    <h3>What stays private</h3>
    <p>The check-ins, the plan, What's Changed Lately, and Who's in Our Circle are locked with the grove passcode, on by default. The Grove never sees anyone's own answers, levels, notes, or journal from their tree app. In a Family grove it sees names, pictures, and, only if someone's "Show my growth on The Grove" switch is on, the big picture: days tended, rings, and which parts they tended.</p>
    <p>For kids and teens, the grown-ups who agreed for them get a quiet alert here if a check-in asks for a caring conversation. Never the answers.</p>
    <p>Everything stays on this device. Nothing is sent anywhere.</p>
    <h3>Share to Family</h3>
    <p>Family on other phones can still grow side by side. Each person opens their own tree app and taps Share to Family, then sends the link or QR code. Open it here, and their tree stands in your grove. In a Faith Community or Small Group grove, members may share their tree the same way, if they choose.</p>
    <h3>Keeping it safe</h3>
    <p>One backup file holds every grove, every profile on this device (each still locked), and settings. Load it on another device to bring everything back, or to combine two devices. Each grove can also be saved to its own locked file in Settings.</p>
    <div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="GGBackupGo('make')">Back up everything</button><button type="button" class="btn btn-secondary btn-sm" onclick="GGBackupGo('pick')">Load a backup</button></div>
    <h3>When Life Changes Together</h3>
    <p>Guides for the changes a family, class, faith community, group, or team goes through together: a new baby or a move, illness and hospice, a loss, scary news, a hard day at school, a leader leaving, a hard season at work. Each has a view For the Group and a view For the Leader, two short videos, Together practices, and links to the guides in each person's own tree app. Picked for Us puts first the guides that fit what your grove shared in its check-in and What's Changed Lately.</p>
    <h3>Coming later</h3>
    <p>Groves that stay in step across phones on their own, after careful review.</p>
  </div>`;
}

/* ---------- Practice library (deep links from the site-wide search) ---------- */
function libItemHtml(it) {
  const L = window.GGLibrary, v = L.view(it, 'oak'), open = S.open === it.key;
  return `<li class="gv-prac" style="--pc:${(PARTS6.find(p => p.key === it.part) || {}).color}"><div class="gv-prac-top"><b>${esc(v.name)}</b><small>${esc(PNAME[it.part] || '')}</small></div><p>${esc(v.text)}</p><button type="button" class="text-btn" data-act="libhow" data-id="${esc(it.key)}" aria-expanded="${open}">${open ? 'Hide how' : 'Show me how'}</button>${open ? `<div class="gv-steps">${L.guideHtml(v)}</div>` : ''}</li>`;
}
function viewLibrary() {
  const L = window.GGLibrary, q = S.lib.q, hit = !q && S.lib.hit ? libGet(S.lib.hit) : null;
  let h = `<div class="section-head"><h2>Practice Library</h2><p>Every Grounded practice, with how to do it. To add one to your own practices, open your tree app and tap Find more practices. Searching here also finds When Life Changes guides, books, and more.</p></div>
    <label class="lbl" for="gv-libq">Search</label><input id="gv-libq" class="gv-input" type="search" value="${esc(q)}" placeholder="Try sleep, calm, friends, or grief" enterkeyhint="search">
    <div id="gv-libres"></div>`;
  if (!L) return h;
  if (!window.GGFind) {
    const list = (q ? L.search(q) : []).slice(0, 40);
    if (!hit) h += list.length ? `<ul class="gv-libl">${list.map(libItemHtml).join('')}</ul>` : `<p class="muted">${q ? 'Nothing found. Try a simpler word.' : 'Type a word to search.'}</p>`;
  } else if (!q && !hit) h += '<p class="muted" id="gv-libhint">Type a word to search.</p>';
  if (hit) h += `<div id="gv-libhit"><ul class="gv-libl">${libItemHtml(hit)}</ul></div>`;
  return h + `<p><button class="btn btn-line btn-sm" data-tab="grove">Back to our grove</button></p>`;
}
// A Library link (#library=Tell Them) names one practice: open that practice first, and search by words only when no name matches.
function libGet(key) { const L = window.GGLibrary, it = L && L.get(key); return it || (window.GroveLibrary ? GroveLibrary.get(key) : null); }
function libExact(name) {
  const items = (window.GroveLibrary && GroveLibrary.items) || [], n = String(name || '').trim().toLowerCase(); if (!n) return null;
  return items.find(it => String(it.name || '').toLowerCase() === n) || items.find(it => String(it.kidName || '').toLowerCase() === n) || null;
}
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
  const a = me(), t = $('#gv-post'); if (!t || (isFamily() && !a)) return; const text = t.value.trim().slice(0, 280);
  if (!text) { toast('Write something first.'); return; }
  G.wall.push({ id: uid(), by: isFamily() ? a.id : 'leader', text, day: today(), at: new Date().toISOString() }); save(); render(); toast('Posted.');
}
function drop(id) {
  const a = me(), x = G.wall.find(p => p.id === id); if (!x) return;
  if (isFamily() && !(a && (a.id === x.by || a.age === 'adult'))) return;
  if (!confirm('Remove this post?')) return;
  G.wall = G.wall.filter(p => p.id !== id); delete G.reacts[id]; G.gone = G.gone || {}; G.gone[id] = Date.now(); save(); render();
}
function did(id) {
  const d = today(), day = G.done[d] || (G.done[d] = {});
  if (day[id]) { delete day[id]; if (!Object.keys(day).length) delete G.done[d]; save(); render(); return; }
  const a = isFamily() ? me() : null; day[id] = { by: a ? a.id : null, at: new Date().toISOString() }; G.grew[d] = 1; save(); render(); if (window.GGLiving) GGLiving.burst(2); toast('Nice work. The grove grew today.');
}
function withVault(reason, fn) { unlock(reason).then(ok => { if (ok) fn(); else render(); }); }
function saveFile() {
  const go = () => GGFileLock.save({ app: 'grove', filename: 'the-grove-' + slug(G.name || G.kind) + '-' + today() + '.json', data: { app: 'grove', v: 2, grove: G } })
    .then(ok => { if (ok) toast('Saved. The check-ins and plan inside stay locked with the grove passcode too.'); });
  if (window.GGFileLock) go(); else loadScript('/shared/gg-filelock.js?v=b766').then(() => window.GGFileLock ? go() : toast('Saving could not load. Check the connection.'));
}
function loadFile() {
  const pick = () => { const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.json,application/json';
    inp.onchange = () => { const f = inp.files && inp.files[0]; if (!f) return; f.text().then(t => GGFileLock.read(t, { app: 'grove' })).then(d => {
      const g = d && d.grove; if (!g || !g.id || !KDEF[g.kind]) { alert('That file is not a grove from The Grove.'); return; }
      const have = ROOT.groves.findIndex(x => x.id === g.id);
      if (have >= 0) { if (!confirm('This grove is already on this device. Use the file\'s copy instead?')) return; ROOT.groves[have] = g; }
      else { if (ROOT.groves.length >= MAX_GROVES) { alert('This device holds up to six groves. Clear one first.'); return; } ROOT.groves.push(g); }
      delete ROOT.gone[g.id]; delete VAULTS[g.id]; delete KEYS[g.id]; delete RAWS[g.id]; fixGrove(g); G = g; ROOT.active = g.id; persist(); S.tab = 'grove'; render(); toast((g.name || 'The grove') + ' is loaded.');
    }, e => { if (e && e.message !== 'cancel') alert('That file could not be read.'); }); };
    inp.click(); };
  if (window.GGFileLock) pick(); else loadScript('/shared/gg-filelock.js?v=b766').then(() => window.GGFileLock ? pick() : toast('Loading could not start. Check the connection.'));
}
function clearGrove(skipAsk) {
  if (!skipAsk && !confirm('Clear ' + (G.name || 'this grove') + ' from this device? Its wall, practices, check-ins, and plan are removed. This cannot be undone. Other groves stay.')) return;
  const id = G.id; ROOT.gone[id] = Date.now(); ROOT.groves = ROOT.groves.filter(g => g.id !== id); delete VAULTS[id]; delete KEYS[id];
  G = ROOT.groves[0] || null; ROOT.active = G ? G.id : null; S.tab = 'grove'; S.ci = null; S.pd = null; persist(); render(); toast('The grove is cleared.');
}
function closeClass() {
  const back = document.createElement('div'); back.className = 'gv-modal-back';
  back.innerHTML = `<div class="gv-modal" role="dialog" aria-modal="true" aria-labelledby="gv-cc-h"><h2 id="gv-cc-h">Close Our Class Grove</h2>
    <p>A good ending matters. Three steps:</p>
    <ol><li><b>A goodbye circle.</b> Go around once: one thing each person will remember about this class, or a wish for the summer. Anyone can pass.</li><li><b>The certificate.</b> Print Twelve Weeks Together for the class, if you'd like.</li><li><b>Clear the grove.</b> The class grove is removed from this device.</li></ol>
    <div class="tools-row gv-modal-row"><button class="btn btn-line btn-sm" data-g="no">Not Yet</button><button class="btn btn-line btn-sm" data-g="cert">Print the Certificate</button><button class="btn btn-gold btn-sm" data-g="clear">Clear the Class Grove</button></div></div>`;
  document.body.appendChild(back);
  back.addEventListener('click', e => { const g = e.target.getAttribute && e.target.getAttribute('data-g'); if (g === 'no' || e.target === back) back.remove(); else if (g === 'cert') printCert(); else if (g === 'clear') { back.remove(); clearGrove(); } });
  const b = back.querySelector('button'); if (b) b.focus();
}
function readAloud() {
  const t = $('#gv-qtext'); if (!t || !window.speechSynthesis) { toast('Read Aloud is not available in this browser.'); return; }
  speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t.textContent); u.rate = .92; speechSynthesis.speak(u);
}
document.addEventListener('click', e => {
  const t = e.target.closest('[data-tab]');
  if (t && (t.closest('#tabs') || t.closest('#view') || t.closest('.gg-hero'))) { e.preventDefault(); if (t.dataset.tab === 'learn') { window.GROVE_PLAIN = plainMode(); if (window.GROVE_VIDS_WORDING) GROVE_VIDS_WORDING(plainMode()); if (window.GGLearn) GGLearn.open('grove'); return; } const k = t.dataset.tab === 'guide' ? 'how' : t.dataset.tab; S.tab = k; S.open = ''; S.view = ''; if (k === 'life') S.lc.open = null; render(); pushHash(); if (t.closest('.gg-hero') || t.closest('#view')) $('#app').scrollIntoView({ behavior: 'smooth' }); return; }
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
  else if (act === 'joinfirst') { G.joinFirst = !G.joinFirst; save(); render(); const f = document.querySelector('[data-act="joinfirst"]'); if (f) f.focus(); toast(G.joinFirst ? 'Ways everyone can join come first.' : 'Back to the usual order.'); }
  else if (act === 'oldnotes') { S.open = S.open === 'oldnotes' ? '' : 'oldnotes'; render(); }
  else if (act === 'famdrop') famDrop(id);
  else if (act === 'seen') { const p = who(id), s = p && (p.shared || {}).safety; if (s) { G.seen[id] = s.flag; save(); render(); } }
  // groves
  else if (act === 'pick') { S.pick = !S.pick; render(); }
  else if (act === 'go') switchTo(id);
  else if (act === 'newgrove') { if (ROOT.groves.length >= MAX_GROVES) { toast('This device holds up to six groves.'); return; } S.setup = { kind: '', name: '', school: 'public', faith: '', children: false, lock: true }; S.pick = false; S.tab = 'grove'; render(); }
  else if (act === 'cancel-setup') { S.setup = null; render(); }
  else if (act === 'setkind') { S.setup.kind = id; S.setup.children = id === 'family' || id === 'classroom' ? S.setup.children : false; render(); const n = $('#gv-sname'); if (n) n.focus(); }
  else if (act === 'setschool') { S.setup.school = id; render(); }
  else if (act === 'setfaith') { S.setup.faith = id; render(); }
  else if (act === 'setchildren') { S.setup.children = !S.setup.children; render(); }
  else if (act === 'setlock') { S.setup.lock = !S.setup.lock; render(); }
  else if (act === 'create-grove') createGrove();
  else if (act === 'unlock') withVault('', render);
  else if (act === 'glock') { lockNow(); render(); toast('Locked.'); }
  // check-in
  else if (act === 'cistart') withVault('', () => { S.ci = { quick: id === 'quick', step: 'changes', i: 0, ans: {}, changes: [] }; S.tab = 'checkin'; render(); $('#app').scrollIntoView(); });
  else if (act === 'cichange') { const c = S.ci.changes, i = c.indexOf(id); if (i >= 0) c.splice(i, 1); else { if (id === 'none') c.length = 0; else { const k = c.indexOf('none'); if (k >= 0) c.splice(k, 1); } c.push(id); } render(); }
  else if (act === 'cinext') { S.ci.step = 'q'; render(); focusQ(); }
  else if (act === 'cians') ciAnswer(id);
  else if (act === 'ciprev') { S.ci.i = Math.max(0, S.ci.i - 1); render(); focusQ(); }
  else if (act === 'cistop') { if (Object.keys(S.ci.ans).length && !confirm('Stop this check-in? Answers so far are not kept.')) return; S.ci = null; render(); }
  else if (act === 'ciread') readAloud();
  else if (act === 'ciview') { S.view = id; render(); }
  else if (act === 'ciback') { S.view = ''; render(); }
  // plan
  else if (act === 'startplan') withVault('', () => startPlan());
  else if (act === 'editplan') { const p = V().plan; startPlan({ edges: p.edges.slice(), items: p.items.map(i => Object.assign({}, i)), youngest: p.youngest, strength: p.strength, words: p.words, own: p.own, from: p.from, keep: true }); }
  else if (act === 'pdcancel') { S.pd = null; render(); }
  else if (act === 'pdedge') { const e2 = S.pd.edges, i = e2.indexOf(id); if (i >= 0) { e2.splice(i, 1); S.pd.items = S.pd.items.filter(x => TP[x.pid] && e2.includes(TP[x.pid].part)); } else { if (e2.length >= 2) { toast('Pick one or two Growing Edges.'); return; } e2.push(id); } render(); }
  else if (act === 'pdprac') { const it = S.pd.items, i = it.findIndex(x => x.pid === id); if (i >= 0) it.splice(i, 1); else { if (it.length >= 3) { toast('Two or three practices is plenty.'); return; } it.push({ pid: id, anchor: TP[id].anchor || '' }); } render(); }
  else if (act === 'pdanchor') { const it = S.pd.items[+b.dataset.n]; if (it) { it.anchor = it.anchor === id ? '' : id; render(); } }
  else if (act === 'pdstrength') { S.pd.strength = S.pd.strength === id ? '' : id; render(); }
  else if (act === 'pdsave') savePlan();
  else if (act === 'newseason') { if (!confirm('Start a new season? This plan is kept with your earlier plans, and a new season begins with a full check-in.')) return; const v = V(); v.plans.push(Object.assign({}, v.plan, { ended: today() })); v.plan = null; sealVault().then(() => { S.ci = { quick: false, step: 'changes', i: 0, ans: {}, changes: [] }; S.tab = 'checkin'; render(); }); }
  else if (act === 'cert') printCert();
  else if (act === 'print') { if (['summary', 'plan', 'card'].includes(id) && !vaultOpen()) { withVault('', render); return; } printWhat(id, b.dataset.ci); }
  else if (act === 'closeclass') closeClass();
  // settings
  else if (act === 'setname') { const n = ($('#gv-name') || {}).value || ''; G.name = n.trim().slice(0, 40) || G.name; save(); render(); toast('Saved.'); }
  else if (act === 'setgkind') { if (id === G.kind) return; if (!confirm('Change this grove to ' + KW(id).long + '? The words, questions, and practices change. Check-ins and plans you made stay.')) return; G.kind = id; if (id === 'team' || id === 'classroom') G.faith = 'plain'; if (id === 'team') G.children = false; if (!isFamily()) S.sel = null; save(); render(); }
  else if (act === 'setgschool') { G.school = id; save(); render(); }
  else if (act === 'setgfaith') { G.faith = id; save(); render(); }
  else if (act === 'gchildren') { G.children = !G.children; save(); render(); }
  else if (act === 'gkidsfirst') { G.kidsFirst = !G.kidsFirst; save(); render(); }
  else if (act === 'gwall') { G.wallOn = !G.wallOn; save(); render(); }
  else if (act === 'ghard') { G.hard = !G.hard; save(); render(); }
  else if (act === 'setline') { const n = ($('#gv-lname') || {}).value || '', p = ($('#gv-lphone') || {}).value || ''; G.line = p.trim() ? { name: n.trim().slice(0, 60), phone: p.trim().slice(0, 30) } : null; save(); render(); toast('Saved.'); }
  else if (act === 'circle') { const c = V().circle || (V().circle = []), i = c.indexOf(id); if (i >= 0) c.splice(i, 1); else c.push(id); sealVault().then(render); }
  else if (act === 'gpass') choosePass('', true).then(render);
  else if (act === 'groot') seeRoot();
  else if (act === 'gbackup') { if (window.GGBackupGo) GGBackupGo('make'); }
  else if (act === 'glockoff') { if (!confirm('Turn the lock off? Anyone using this device could open the check-ins and plan.')) return; G.lockOn = false; G.lock = null; delete KEYS[G.id]; delete RAWS[G.id]; if (VAULTS[G.id]) delete VAULTS[G.id].rootWords; sealVault().then(render); }
  else if (act === 'glockon') { const data = VAULTS[G.id] || Object.assign(blankVault(), G.plainBox || {}); VAULTS[G.id] = data; G.lockOn = true; choosePass('').then(ok => { if (!ok) { G.lockOn = false; } else G.plainBox = null; save(); render(); }); }
  else if (act === 'lc-open') lcOpen(id);
  else if (act === 'lc-back') { if (history.state && history.state.gList && S.lc.open) { history.back(); return; } S.lc.open = null; render(); const a = $('#app'); if (a) a.scrollIntoView(); pushHash(); }
  else if (act === 'lc-ring') { S.lc.ring = id || 'all'; render(); }
  else if (act === 'lc-persp') { S.lc.persp = id === 'leader' ? 'leader' : 'group'; const y = window.scrollY; render(); window.scrollTo(0, y); }
  else if (act === 'lc-watch') lcWatch(id, b.dataset.side === 'helper' ? 'helper' : 'you');
  else if (act === 'lc-print') lcPrint(id);
  else if (act === 'lc-read') lcReadAloud();
  else if (act === 'savefile') saveFile();
  else if (act === 'loadfile') loadFile();
  else if (act === 'gvload') gvFromGuide('');
  else if (act === 'cleargrove') clearGrove();
});
document.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset && t.dataset.setup && S.setup) { S.setup[t.dataset.setup] = t.value; return; }
  if (t.dataset && t.dataset.pd && S.pd) { if (t.dataset.pd === 'anchor') { const it = S.pd.items[+t.dataset.n]; if (it) it.anchor = t.value.slice(0, 60); } else S.pd[t.dataset.pd] = t.value; return; }
  if (t.id === 'gv-lcq') { S.lc.q = t.value; const box = $('#gv-lclist'); if (box) box.innerHTML = lcListHtml(); return; }
  if (t.id !== 'gv-libq') return; S.lib.q = t.value;
  if (S.lib.hit) { S.lib.hit = ''; const hb = $('#gv-libhit'); if (hb) hb.remove(); }
  if (window.GGFind && window.GGLibrary) { libFind(); return; }
  const pos = t.selectionStart; render(); const f = $('#gv-libq'); if (f) { f.focus(); try { f.setSelectionRange(pos, pos); } catch (x) {} } });
document.addEventListener('change', e => { const t = e.target; if (t.dataset && t.dataset.pd === 'youngest' && S.pd) S.pd.youngest = t.value; });

/* ---------- From a Guide's visit: Send to The Grove (GWG BLD 776) ----------
   A Grove Guide's visit (field-guide/grovevisit.js) can send the family's check-in and plan here, only after the family's
   yes: a link /grove/#gv=salt.iv.ct, or the same in [GGGV1]...[/GGGV1] text, sealed with an 8-letter code (PBKDF2 250,000,
   SHA-256, AES-GCM). The link is read once and taken out of the address bar; nothing is sent anywhere. The check-in and plan
   go into the grove's locked part, like one made here. */
const GVRE = /\[GGGV1\]\s*([A-Za-z0-9_\-.\s]+?)\s*\[\/GGGV1\]/, GVHASH = /#gv=([A-Za-z0-9_\-.]+)/;
const unb64u = s => unb64(String(s).replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((String(s).length + 3) % 4));
function gvSealedFrom(t) { t = String(t || ''); const m = GVRE.exec(t) || GVHASH.exec(t); const x = m ? m[1].replace(/\s+/g, '') : t.trim(); return /^[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+$/.test(x) ? x : ''; }
function gvOpenSealed(sealed, code) {
  const [a, b, c] = sealed.split('.'), cd = String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  return subtle.importKey('raw', TE.encode(cd), 'PBKDF2', false, ['deriveKey'])
    .then(base => subtle.deriveKey({ name: 'PBKDF2', salt: unb64u(a), iterations: 250000, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']))
    .then(k => subtle.decrypt({ name: 'AES-GCM', iv: unb64u(b) }, k, unb64u(c)))
    .then(pt => { const d = JSON.parse(TD.decode(pt)); if (!d || d.k !== 'grove-visit' || !KDEF[d.gk]) throw new Error('shape'); return d; });
}
function gvModal(html, wire) {
  return new Promise(resolve => {
    const back = document.createElement('div'); back.className = 'gv-modal-back'; back.innerHTML = `<div class="gv-modal" role="dialog" aria-modal="true" aria-labelledby="gv-gm-h">${html}</div>`;
    document.body.appendChild(back);
    const prev = document.activeElement, close = v => { back.remove(); try { prev && prev.focus && prev.focus(); } catch (e) {} resolve(v); };
    back.addEventListener('click', e => { const g = e.target.closest && e.target.closest('[data-g]'); if (g) { const v = g.getAttribute('data-g'); if (v === 'no') close(null); else if (wire) wire(v, back, close); else close(v); } else if (e.target === back) close(null); });
    back.addEventListener('keydown', e => { if (e.key === 'Escape') close(null); else if (e.key === 'Enter' && wire && e.target.tagName === 'INPUT') { e.preventDefault(); wire('ok', back, close); } });
    setTimeout(() => { const f = back.querySelector('input,textarea,button[data-g]'); if (f) f.focus(); }, 30);
  });
}
function gvFromGuide(sealed) {
  if (!subtle) { alert('This browser cannot open a locked code. Try another browser.'); return; }
  const html = `<h2 id="gv-gm-h">From Your Guide's Visit</h2><p>Your Guide sent your family's check-in and plan, locked with an 8-letter code. Type the code to add them to your grove on this device.</p>`
    + (sealed ? '' : `<label class="lbl" for="gv-gm-t">The link or message from your Guide</label><textarea id="gv-gm-t" class="gv-input" rows="3" placeholder="Paste the link or the whole message"></textarea>`)
    + `<label class="lbl" for="gv-gm-c">The 8-letter code</label><input id="gv-gm-c" class="gv-input" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="ABCD-EFGH" maxlength="12">`
    + `<p class="gv-err" role="alert"></p><div class="tools-row gv-modal-row"><button type="button" class="btn btn-line btn-sm" data-g="no">Cancel</button><button type="button" class="btn btn-gold btn-sm" data-g="ok">Open It</button></div>`;
  gvModal(html, (v, back, close) => {
    if (v !== 'ok') return;
    const err = back.querySelector('.gv-err'), s2 = sealed || gvSealedFrom((back.querySelector('#gv-gm-t') || {}).value), code = back.querySelector('#gv-gm-c').value;
    if (!s2) { err.textContent = 'Paste the whole link or message from your Guide.'; return; }
    if (String(code).replace(/[^A-Za-z0-9]/g, '').length !== 8) { err.textContent = 'The code has 8 letters and numbers.'; return; }
    err.textContent = 'Opening...';
    gvOpenSealed(s2, code).then(d => { close(true); gvPlace(d, s2); }, () => { err.textContent = 'That code does not open this. Check the code, and try again.'; });
  });
}
// Which grove gets it: one of the same kind (its questions match), or a new Family grove.
function gvPlace(d, sealed) {
  const same = ROOT.groves.filter(g => g.kind === d.gk), K = KW(d.gk);
  const pickNew = () => {
    if (ROOT.groves.length >= MAX_GROVES) { alert('This device holds up to six groves. Clear one first.'); return; }
    const g = blankGrove(d.gk, 'Our ' + K.name + ' Grove'); g.faith = d.w === 'p' ? 'plain' : 'faith'; g.children = !!d.c && d.gk !== 'team';
    ROOT.groves.push(g); G = g; ROOT.active = g.id; S.setup = null; save();
    choosePass('Your new grove keeps the check-in and plan locked.').then(ok => { if (!ok) { G.lockOn = false; VAULTS[G.id] = blankVault(); } gvAdd(d, sealed); });
  };
  if (!same.length) { pickNew(); return; }
  if (same.length === 1 && G && G.id === same[0].id) { gvAdd(d, sealed); return; }
  gvModal(`<h2 id="gv-gm-h">Which Grove?</h2><p>Add your Guide's visit to one of your ${esc(K.name)} groves, or start a new one.</p><div class="tools-row" style="flex-direction:column;align-items:stretch">${same.map(g => `<button type="button" class="btn btn-line" data-g="${esc(g.id)}">${esc(g.name || K.name)}</button>`).join('')}<button type="button" class="btn btn-gold" data-g="new">Start a New ${esc(K.name)} Grove</button><button type="button" class="btn btn-line btn-sm" data-g="no">Cancel</button></div>`)
    .then(v => { if (!v) return; if (v === 'new') { pickNew(); return; } const g = ROOT.groves.find(x => x.id === v); if (!g) return; fixGrove(g); G = g; ROOT.active = g.id; persist(); gvAdd(d, sealed); });
}
function gvAdd(d, sealed) {
  withVault('To add your Guide\'s visit,', () => {
    const v = V(), src = String(sealed).slice(-24);
    if (v.checkins.some(c => c.src === src)) { S.tab = 'checkin'; S.view = (v.checkins.find(c => c.src === src) || {}).id || ''; render(); toast('This visit is already in your grove.'); return; }
    const list = qList(d.gk, false), ans = {};
    if (d.a) list.forEach((x, i) => { const a = String(d.a)[i]; if (a && ANAME[a]) ans[x.key] = a; });
    const rec = { id: uid(), date: /^\d{4}-\d\d-\d\d$/.test(d.d || '') ? d.d : today(), at: new Date().toISOString(), quick: !!d.q, changes: Array.isArray(d.ch) ? d.ch.slice(0, 20).map(String) : [], ans, from: 'guide', src };
    const go = () => sealVault().then(() => { S.tab = 'checkin'; S.view = rec.id; S.ci = null; render(); toast('Your Guide\'s visit is in your grove: the check-in' + (d.p ? ' and your plan.' : '.')); const a = $('#app'); if (a) a.scrollIntoView(); });
    if (Object.keys(ans).length) { v.checkins.push(rec); v.changes = rec.changes.slice(); }
    const p = d.p;
    if (p && Array.isArray(p.e) && p.e.length) {
      const plan = { edges: p.e.filter(k => PNAME[k]).slice(0, 2), items: (Array.isArray(p.i) ? p.i : []).filter(x => Array.isArray(x) && x[0]).slice(0, 3).map(x => ({ pid: String(x[0]), anchor: String(x[1] || '').slice(0, 60) })),
        youngest: String(p.y || ''), strength: String(p.s || ''), words: String(p.w || '').slice(0, 200), own: String(p.o || '').slice(0, 120), from: Object.keys(ans).length ? rec.id : '', start: rec.date, made: today(), guide: true };
      if (v.plan && !confirm('Use the plan from your visit? Your current plan is kept with your earlier plans.')) { go(); return; }
      if (v.plan) v.plans.push(Object.assign({}, v.plan, { ended: today() }));
      v.plan = plan;
    }
    go();
  });
}
/* ---------- boot ---------- */
function setScale() { const sc = ROOT.scale || 1; document.documentElement.style.setProperty('--scale', sc); const b = $('#size-btn'); if (b) { b.textContent = sc > 1.2 ? 'A' : 'A+'; b.setAttribute('aria-label', 'Text size, now ' + (sc === 1 ? 'normal' : sc < 1.2 ? 'larger' : 'largest')); } }
function fromHash() {
  const h = decodeURIComponent(location.hash || '');
  const gvm = GVHASH.exec(location.hash || ''); // GWG BLD 776: a Guide's visit, read once and taken out of the address bar
  if (gvm) { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} HASH_SEEN = location.hash; gvFromGuide(gvm[1]); return; }
  if (/^#library(=|$)/.test(h)) { const q = h.startsWith('#library=') ? h.slice(9) : '', hit = libExact(q); S.tab = 'library'; S.lib.q = hit ? '' : q; S.lib.hit = hit ? hit.key : ''; S.open = hit ? hit.key : ''; if (window.GGLibrary) GGLibrary.ready().then(render); render(); const a = $('#app'); if (a) a.scrollIntoView(); }
  else if (/^#(life|talk)(=|$)/.test(h)) { const id = /^#(life|talk)=/.test(h) ? h.slice(h.indexOf('=') + 1) : null; S.tab = 'life'; S.lc.open = id && LC.some(t => t.id === id) ? id : null; render(); const a = $('#app'); if (a) { a.scrollIntoView(); setTimeout(() => a.scrollIntoView(), 350); } }
  else if (/^#(wall|together|how|earlier|grove|checkin|plan|settings)$/.test(h)) { S.tab = h.slice(1); S.open = ''; S.view = ''; render(); }
}
/* Back and Forward (GWG nav fix): tapping a tab or opening a When Life Changes guide adds a history entry (#plan,
   #life=id), so Back steps through The Grove before it leaves. Reading the hash never adds one. One-time links
   (#gv=, #gg-fam= and the other links read in shared/gg-app.js and gg-bridge.js) are read and wiped as before. */
let HASH_SEEN = location.hash;
const canonHash = h => (!h || h === '#') ? '#grove' : h;
function pushHash(st) {
  const h = S.tab === 'life' && S.lc.open ? '#life=' + encodeURIComponent(S.lc.open) : S.tab === 'learn' ? '' : '#' + S.tab;
  if (!h || canonHash(h) === canonHash(location.hash)) return;
  try { history.pushState(st || null, '', h); } catch (e) { return; }
  HASH_SEEN = location.hash;
}
function onPop() {
  HASH_SEEN = location.hash;
  if (location.hash && location.hash !== '#') { fromHash(); return; }
  S.tab = 'grove'; S.open = ''; S.view = ''; S.lc.open = null; render();
}
load();
$('#year').textContent = new Date().getFullYear();
$('#size-btn').addEventListener('click', () => { const sc = ROOT.scale || 1; ROOT.scale = sc === 1 ? 1.12 : sc < 1.2 ? 1.25 : 1; setScale(); persist(); });
$('#menu-btn').addEventListener('click', () => { const open = $('#site-menu').classList.toggle('open'); $('#menu-btn').setAttribute('aria-expanded', open); });
$('#hero-cta').addEventListener('click', () => { S.tab = 'grove'; render(); pushHash(); $('#app').scrollIntoView({ behavior: 'smooth' }); });
setScale(); render(); fromHash(); HASH_SEEN = location.hash;
window.addEventListener('popstate', onPop);
window.addEventListener('hashchange', () => { if (!location.hash || location.hash === HASH_SEEN) return; HASH_SEEN = location.hash; fromHash(); });
window.addEventListener('gg-fam', famIntake);
famIntake();
if (window.GGP) { GGP.on(() => render()); GGP.ready.then(() => { render(); fromHash(); }); }
})();
