/* =====================================================================
   WILLOW . the app (Willow Build Session 2)
   The person's own tree for the last part of the path, built for two:
   the person in hospice, and the people who love them.

   Who is who
   - The person: their own Grounded profile. Their tree, faith answers,
     What matters to me, and Cuttings live in their locked vault under
     "willow".
   - Helpers: grown-ups with their own profile and passcode. The person's
     key sits in the helper's vault (GGP.addHelper), so a helper opens it
     with their own passcode. Willow shows a helper only what the person
     chose to share (rec.share). Helpers' own check-ins grow their own
     tree in their own vault.
   - Every check-in records who answered: they answered, they answered and
     a helper tapped, or a helper answering from what they see. Observed
     check-ins are kept apart and never add rings to the person's tree.

   The rhythm
   - No weeks, seasons, or streaks. Today offers one gentle practice. Done
     is enough. The tree never dries out.
   - Check in whenever it helps: a quick one (one question per part) or a
     full one (three per part). The person sees words, never scores.

   Data files (edit wording there): checkin.js, faith.js, practices.js,
   guides.js, readings.js.
   ===================================================================== */
(function () {
'use strict';
const C = window.WILLOW_CHECKIN, F = window.WILLOW_FAITH, P = window.WILLOW_PRACTICES, G = window.WILLOW_GUIDES, RD = window.WILLOW_READINGS;

/* ---------- the parts of the tree (tend four, grow two; GWG BLD 907) ----------
   part is the tree word, name is Willow's own gentle words. wLabel() pairs the tree word with the plain
   word from shared/gg-parts.js (Roots: Spirit, Trunk: Meaning). Roots, Bark, Leaves, and Branches hold
   the gentle practices; Trunk and Fruit grow from that tending and keep their check-in questions. */
const PARTS = [
  { key: 'roots', part: 'Roots', name: 'Your connection with God and the sacred', color: 'var(--p-roots)' },
  { key: 'trunk', part: 'Trunk', name: 'A life that mattered', color: 'var(--p-trunk)' },
  { key: 'bark', part: 'Bark', name: 'Peace inside', color: 'var(--p-bark)' },
  { key: 'branches', part: 'Branches', name: 'Love said out loud', color: 'var(--p-branches)' },
  { key: 'leaves', part: 'Leaves', name: 'Comfort', color: 'var(--p-leaves)' },
  { key: 'fruit', part: 'Fruit', name: 'Hope and readiness', color: 'var(--p-fruit)' }
];
const PART = {}; PARTS.forEach(p => { PART[p.key] = p; });
const W_GW = window.GGParts && window.GGParts.label ? window.GGParts : null;
const wTends = k => W_GW ? W_GW.tend(k) : !['trunk', 'fruit'].includes(k);
const wLabel = p => W_GW ? W_GW.label(p.key) : p.part;
const PART_WORDS = {
  roots: { person: `Faith, spirit, or whatever holds you up. Roots are mostly unseen, and they matter most when the wind picks up.`, helper: `What holds you up while you hold them.` },
  trunk: { person: `Your story. Knowing your life mattered, and passing on what you know.`, helper: `The meaning in the care you give.` },
  bark: { person: `Peace inside. Fear and worry, and the moments of calm between.`, helper: `What you're feeling, and room to feel it.` },
  branches: { person: `The people you love, and the words you want to say to them.`, helper: `Who holds you up, and how the family is doing.` },
  leaves: { person: `Comfort, rest, and small joys for the senses.`, helper: `Food, sleep, and breaks. Your body is carrying this too.` },
  fruit: { person: `Hope that changes shape, and getting ready for what's ahead.`, helper: `Hope, and picturing yourself on the other side of this.` }
};

/* ---------- Grounded stories ---------- */
const STORY = {
  'He Was Praying Too': 'https://chri5j0y.substack.com/p/he-was-praying-too',
  'The Atypical Atheist': 'https://chri5j0y.substack.com/p/the-atypical-atheist',
  'He Came to Collect': 'https://chri5j0y.substack.com/p/he-came-to-collect',
  'Total Bliss': 'https://chri5j0y.substack.com/p/total-bliss',
  'The Recovery': 'https://chri5j0y.substack.com/p/the-recovery',
  'Drift Away': 'https://chri5j0y.substack.com/p/drift-away',
  'Welcome Home': 'https://chri5j0y.substack.com/p/welcome-home',
  'Please Help My Dad Die': 'https://chri5j0y.substack.com/p/please-help-my-dad-die',
  'If She Is Still Here': 'https://chri5j0y.substack.com/p/if-she-is-still-here',
  'Grief Debt': 'https://chri5j0y.substack.com/p/grief-debt',
  'Birth Plan': 'https://chri5j0y.substack.com/p/birth-plan',
  'My Boundaries Have Gates': 'https://chri5j0y.substack.com/p/my-boundaries-have-gates',
  'Grounded in Coffee': 'https://chri5j0y.substack.com/p/grounded-in-coffee',
  'Prayer.': 'https://chri5j0y.substack.com/p/thank-god-for-sending-you',
  'Enlightenment': 'https://chri5j0y.substack.com/p/enlightenment'
};
const storyUrl = t => STORY[t] || 'https://growwithgrounded.com/stories.html';
// One story per part on results (three touches max: this, Subscribe, the footer).
const PART_STORY = {
  roots: ['He Was Praying Too', 'When you were praying for me, I was praying too.'],
  trunk: ['Birth Plan', 'You get a say in how it goes.'],
  bark: ['Total Bliss', 'Peace wasn\'t a big enough word for what she had.'],
  branches: ['If She Is Still Here', 'I almost said tomorrow. She didn\'t have a tomorrow.'],
  leaves: ['Drift Away', 'Some people don\'t say goodbye. They sing it.'],
  fruit: ['Welcome Home', 'His arms stayed open the whole time.']
};

/* ---------- small helpers ---------- */
const $ = s => document.querySelector(s);
const esc = v => String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const pad = n => String(n).padStart(2, '0');
const dstr = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const today = () => dstr(new Date());
const nice = s => { const d = new Date(s + 'T00:00:00'); return isNaN(d) ? s : d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }); };
const longDate = s => { const d = new Date(s + 'T00:00:00'); return isNaN(d) ? s : d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }); };
const nowTime = () => new Date().toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const dayNo = () => Math.floor(Date.now() / 86400000);
function toast(m) { const t = $('#toast'); if (!t) return; t.textContent = m; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 3200); }
const ICONS = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
  heart: '<path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.9c0 5.4-7.5 10-7.5 10z"/>',
  scroll: '<path d="M7 3.5h10.5A2.5 2.5 0 0 1 20 6v0a2.5 2.5 0 0 1-2.5 2.5H17v10A2.5 2.5 0 0 1 14.5 21H6.5A2.5 2.5 0 0 1 4 18.5V18h10v.5a2.5 2.5 0 0 0 2.5 2.5"/><path d="M7 3.5A2.5 2.5 0 0 0 4.5 6v12M9 9h5M9 12.5h5"/>',
  hand: '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12M11 11V4a1.5 1.5 0 0 1 3 0v7M14 11V5.5a1.5 1.5 0 0 1 3 0V14c0 4-2.5 7-6.5 7S5 18.5 4.2 16.6L3 13.6a1.4 1.4 0 0 1 2.4-1.4L8 15"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/>',
  door: '<path d="M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21"/><path d="M3 21h18"/><circle cx="14.5" cy="12.5" r="1"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/><path d="M9 7.5h7"/>',
  phone: '<path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
  leaf: '<path d="M4.5 19.5C4.5 11 10 4.5 20 3.5c-.5 10-6.5 16-15.5 16z"/><path d="M4.5 19.5L13 11"/>',
  candle: '<path d="M9 21h6V10H9z"/><path d="M12 10V8"/><path d="M12 7.5c-1.6-1.4-1.2-3.2 0-4.5 1.2 1.3 1.6 3.1 0 4.5z"/>'
};
const icon = (n, s) => `<svg class="icon" width="${s || 22}" height="${s || 22}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`;

/* ---------- people ---------- */
const GP = () => window.GGP || null;
const me = () => GP() && GGP.active() ? GGP.active() : null;
const helped = () => (GP() && GGP.helping ? GGP.helping() : []).map(id => GGP.get(id)).filter(Boolean);
const nameOf = id => { const p = GP() && GGP.get(id); return p ? p.name : 'them'; };
const S = { tab: 'today', sub: null, pid: null, ck: null, guide: { q: '', ring: 'all', open: null, pro: false }, read: { q: '', trad: 'mine', open: null }, faithLook: null, cut: null, logAll: false };

function blankRec() {
  return { v: 1, started: '', role: '', faith: null, checkins: [], matters: {}, cuttings: [], log: [], days: {}, visits: [], line: { name: '', phone: '' },
    share: { tree: true, matters: true, cuttings: true, log: true, faith: false, answers: false, grove: true, farewell: true }, farewell: {} };
}
function rec(id) {
  if (!GP() || !id || !GGP.isOpen(id)) return null;
  const d = GGP.data(id, 'willow'); const b = blankRec();
  Object.keys(b).forEach(k => { if (d[k] === undefined) d[k] = b[k]; });
  d.share = Object.assign({}, b.share, d.share || {});
  d.line = Object.assign({ name: '', phone: '' }, d.line || {});
  return d;
}
const persist = id => GP() ? GGP.save(id) : Promise.resolve();
// Whose tree is showing: your own, or someone you help.
function target() {
  const a = me(); if (!a) return null;
  const ids = helped().map(p => p.id);
  if (S.pid && (S.pid === a.id || ids.includes(S.pid))) return S.pid;
  const r = rec(a.id);
  if (r && r.role === 'helper' && ids.length) return ids[0];
  return a.id;
}
const isSelf = () => { const a = me(); return !!a && target() === a.id; };
const T = () => rec(target());
const roleOf = id => { const r = rec(id); return r && r.role === 'helper' ? 'helper' : 'person'; };
const remembered = id => { const p = GP() && GGP.get(id); return p && p.shared && p.shared.remembered ? p.shared.remembered : null; };
// What a helper may see of the person's Willow.
function sees(what) { if (isSelf()) return true; const r = T(); return !!(r && r.share && r.share[what]); }
// The hospice 24/7 line: the person's own setting, or the first person a helper cares for.
function line() {
  const a = me(); if (!a) return null;
  let r = T(); if (r && r.line && r.line.phone) return r.line;
  const h = helped()[0]; r = h && rec(h.id); return r && r.line && r.line.phone ? r.line : null;
}
const telHref = n => 'tel:' + String(n || '').replace(/[^0-9+*#]/g, '');

/* ---------- the tree ---------- */
const ANS = {}; C.answers.forEach(a => { ANS[a[0]] = a; });
const bank = role => role === 'helper' ? C.helper : C.questions;
function scorePart(role, key, arr) {
  const qs = bank(role)[key] || [], vals = [];
  (arr || []).forEach((a, i) => { const o = ANS[a]; if (!o || o[2] == null || !qs[i]) return; vals.push(qs[i].r ? 3 - o[2] : o[2]); });
  if (!vals.length) return null;
  return Math.round(10 * (1 + 9 * (vals.reduce((x, y) => x + y, 0) / vals.length) / 3)) / 10;
}
const levelOf = sc => sc == null ? null : sc >= 8 ? 'strong' : sc >= 5 ? 'steady' : 'edge';
const LEVEL_NAME = {}; C.levels.forEach(l => { LEVEL_NAME[l[0]] = l[1]; });
const ownCheckins = r => (r && r.checkins || []).filter(c => c.by !== 'observed');
const seenCheckins = r => (r && r.checkins || []).filter(c => c.by === 'observed');
const ringsOf = r => ownCheckins(r).length;
const lastOwn = r => { const l = ownCheckins(r); return l.length ? l[l.length - 1] : null; };
function needPart(r, only) {
  const c = lastOwn(r); if (!c || !c.levels) return null;
  const order = { edge: 0, steady: 1, strong: 2 };
  const ks = PARTS.map(p => p.key).filter(k => c.levels[k] && (!only || only.includes(k))).sort((a, b) => order[c.levels[a]] - order[c.levels[b]]);
  return ks[0] || null;
}

/* The tree art (GWG BLD 780): Willow's own painting with six soft markers (shared/gg-treeart.js,
   spots in shared/gg-treeart-kids.js). It replaced the drawn willow in How it works, Results, Past
   Check-ins, and a remembered tree. Gentle on purpose: no level badge, no game, and no line about
   a part going down. Strong a full warm glow, Steady a soft glow, Growing Edge a new green light. */
const ART_LV = { strong: 's', steady: 't', edge: 'g' };
const ART_WORDS = { s: 'Strong', t: 'Steady', g: 'Growing Edge', u: 'Not sure today' };
const ART_ON = () => !!window.GGTreeArt;
function artParts(withText, role) { return PARTS.map(p => ({ key: p.key, name: p.part, tag: p.name, text: withText ? PART_WORDS[p.key][role === 'helper' ? 'helper' : 'person'] : '' })); }
function artLevels(levels) { const o = {}; PARTS.forEach(p => { o[p.key] = ART_LV[(levels || {})[p.key]] || 'u'; }); return o; }
// The painting with each part's light (the words sit beside it, in Willow's own sentences).
function artTreeHtml(levels, label, cls) {
  if (!ART_ON()) return `<img class="w-tree" src="/shared/heroes/willow-phone.webp" alt="${esc(label || 'The willow painting')}">`;
  return `<div class="w-art ${cls || ''}">${GGTreeArt.results(null, { app: 'willow', parts: artParts(), levels: artLevels(levels), words: ART_WORDS, label: label || 'The willow painting', maxH: 340 })}</div>`;
}
// Then and Now from the person's own check-ins (never the observed ones), with growth rings.
function artGrowthHtml(r, id, self) {
  if (!ART_ON()) return '';
  const own = ownCheckins(r).filter(c => c.levels); if (!own.length) return '';
  const who = self ? 'Your' : nameOf(id) + '\'s';
  return `<div class="w-card w-grow"><p class="w-eyebrow">Then and Now</p>${GGTreeArt.growth(null, { app: 'willow', parts: artParts(), words: ART_WORDS, maxH: 320,
    history: own.map(c => ({ date: String(c.date).slice(0, 10), levels: artLevels(c.levels) })),
    grewLine: who + ' {parts} grew since {date}.', steadyLine: 'Every part of a tree has seasons.',
    oneLine: 'A first ring. The next check-in shows Then and Now.' })}</div>`;
}

/* ---------- The Grove: show my growth (on by default) ---------- */
function publish(id) {
  const r = rec(id); if (!r || !GP()) return;
  if (r.share.grove === false) { GGP.setShared(id, { tree: { tool: 'willow', show: false } }); return; }
  const days = Object.keys(r.days || {}).filter(d => (r.days[d] || {}).done && r.days[d].done.length).sort();
  const recent = days.slice(-14).map(d => ({ d, parts: (r.days[d].done || []).map(x => x.split(':')[0]).filter(k => PART[k]) }));
  GGP.setShared(id, { tree: { tool: 'willow', show: true, days: days.length, rings: ringsOf(r), season: 1, recent, updated: today() } });
}

/* ---------- views ---------- */
// The six tabs (GWG BLD 971) and the pages each one holds; the old pages keep their names, so #matters, #cuttings,
// #guides, #readings, and #about still open where they live now.
const TAB_OF = { today: 'today', setup: 'today', checkin: 'today', results: 'today', history: 'today', share: 'today', visitin: 'today',
  wishes: 'wishes', matters: 'wishes', faithpage: 'wishes', vigil: 'wishes', service: 'wishes',
  stories: 'stories', cuttings: 'stories', legacy: 'stories', bedside: 'bedside',
  farewell: 'farewell', plan: 'farewell', obituary: 'farewell', eulogy: 'farewell', readings: 'farewell', send: 'farewell',
  learn: 'learn', guides: 'learn', about: 'learn' };
const VIEWS = {};
function paintNav() {
  const tab = TAB_OF[S.tab] || 'today';
  document.querySelectorAll('#client-nav .nav-btn').forEach(b => { const on = b.dataset.tab === tab; b.classList.toggle('active', on); if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
}
function scrollTop(force) {
  const nav = $('#client-nav'), main = $('main'); if (!main) return;
  const top = main.getBoundingClientRect().top + window.scrollY - (window.innerWidth > 700 && nav ? nav.offsetHeight : 0) - 6;
  if (force || window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
}
/* Sequoia (GWG BLD 733): a person who kept a Legacy Book in Sequoia finds it in Cuttings here.
   Copied, never moved: the Legacy Book stays whole in Sequoia, and each written answer comes over once. */
const SQ_KIND = { blessings: 'blessing', learned: 'learned' };
const SQ_ONE = { 'things-1': 'recipe', 'blessings-9': 'letter', 'blessings-5': 'four', 'blessings-6': 'four', 'blessings-7': 'four' };
function carrySequoia(id) {
  if (!GP() || !id || !GGP.isOpen(id)) return;
  const v = GGP.data(id), lg = v && v.sequoia && v.sequoia.legacy, r = rec(id);
  if (!lg || !lg.answers || !r || !r.started || r.role !== 'person') return;
  r.fromSequoia = r.fromSequoia || {};
  let n = 0;
  Object.keys(lg.answers).forEach(pid => {
    const x = lg.answers[pid]; if (!x || !String(x.text || '').trim() || r.fromSequoia[pid]) return;
    r.cuttings.push({ id: uid(), kind: SQ_ONE[pid] || SQ_KIND[pid.split('-')[0]] || 'story', date: x.date || today(), by: x.told || '', title: x.q || '', to: '', text: String(x.text), from: 'sequoia' });
    r.fromSequoia[pid] = today(); n++;
  });
  if (n) persist(id).then(() => toast('Your Legacy Book from Sequoia is in Cuttings now.'));
}
function render() {
  const a0 = me(); if (a0 && target() === a0.id) carrySequoia(a0.id);
  paintNav(); renderBar();
  const v = $('#w-view'); if (!v) return;
  document.body.setAttribute('data-wtab', TAB_OF[S.tab] || 'today'); heroActs();
  v.innerHTML = topOf(S.tab) + (VIEWS[S.tab] || VIEWS.today)();
  if (window.GGLiving && document.getElementById('gl-scene')) GGLiving.mount({ done: W_SCENE });
  v.querySelectorAll('[data-read]').forEach(el => addRead(el));
  if (S.tab === 'guides' && !S.guide.open && S.guide.find) { const i = v.querySelector('.lc-search'); if (i) gFind(i); }
}
// The Today hero: Begin with Willow at first; once Willow is started, the check-in and the farewell plans.
function heroActs() {
  const a = me(), r = a ? rec(a.id) : null, on = !!(a && ((r && r.started) || helped().length));
  const g = $('#w-hero-go'), two = $('#w-hero-two'), pro = $('#w-hero-pro'); if (!g || !two) return;
  g.textContent = on ? 'Quick Check-in' : 'Begin with Willow'; g.setAttribute('onclick', on ? 'W.checkin(true)' : 'W.begin()');
  two.textContent = on ? 'Plan the Farewell' : 'How It Works'; two.setAttribute('onclick', on ? "W.go('farewell')" : "W.go('about')");
  if (pro) pro.hidden = on;
}
function go(v, force) {
  if (window.GGRead && GGRead.stop) GGRead.stop();
  if (v !== 'checkin' && S.ck && !S.ck.done && S.tab === 'checkin' && !confirm('Leave this check-in? Answers so far will be cleared.')) return;
  if (v !== 'checkin') S.ck = v === 'results' ? S.ck : null;
  S.tab = v; render(); scrollTop(force !== false); pushHash();
}
// Read aloud: a button on anything marked data-read (read.js, shared). data-read-rec marks a guide or a practice,
// read in the Grounded voice (Brian, BLD 796); nothing a person writes carries it.
function addRead(el) {
  const R = window.GGRead; if (!R || !R.control || el.querySelector('.gg-rbar')) return;
  try { el.insertBefore(R.control({ root: el, label: el.dataset.read || 'Read Aloud', recorded: el.hasAttribute('data-read-rec') ? 'willow' : '' }), el.firstChild); } catch (e) {}
}

/* ---------- who's here ---------- */
function renderBar() {
  const bar = $('#w-bar'); if (!bar) return;
  const a = me();
  if (!a) {
    const n = GP() ? GGP.list().filter(p => p.age === 'adult').length : 0;
    bar.innerHTML = n ? `<div class="pbar pbar-off"><div class="pbar-who"><strong>Welcome back</strong><span>Open your profile to see your Willow. Each tree stays locked in its own profile.</span></div><div class="pbar-act"><button type="button" class="btn btn-primary btn-sm" onclick="W.open()">Open my profile</button></div></div>` : '';
    return;
  }
  const t = target(), ppl = helped(), mine = rec(a.id), own = mine && mine.started;
  const chips = ppl.map(p => `<button type="button" class="w-chip" aria-pressed="${t === p.id}" onclick="W.view('${p.id}')">${window.GGAv ? GGAv.html(p.avatar, p.name, 26) : ''}<span>${remembered(p.id) ? icon('candle', 14) + ' ' : ''}${esc(p.name)}'s tree</span></button>`).join('');
  const myChip = (ppl.length && (own || true)) ? `<button type="button" class="w-chip" aria-pressed="${t === a.id}" onclick="W.view('${a.id}')">${window.GGAv ? GGAv.html(a.avatar, a.name, 26) : ''}<span>My Own Tree</span></button>` : '';
  bar.innerHTML = `<div class="pbar"><button type="button" class="pbar-pic" onclick="W.settings()" aria-label="Willow Settings">${window.GGAv ? GGAv.html(a.avatar, a.name, 40) : ''}</button>
    <div class="pbar-who"><strong>${t === a.id ? 'Here as ' + esc(a.name) : 'Caring for ' + esc(nameOf(t))}</strong><span>${t === a.id ? 'Saving to your own locked profile on this device.' : 'You are here as ' + esc(a.name) + ', their helper. You see what ' + esc(nameOf(t)) + ' chose to share.'}</span></div>
    <div class="pbar-act"><button type="button" class="btn btn-secondary btn-sm" onclick="W.settings()">Settings</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.lock()">Lock</button></div>
    ${chips ? `<div class="w-chips" role="group" aria-label="Whose tree">${chips}${myChip}</div>` : ''}</div>`;
}

/* ---------- setup ---------- */
function welcomeHtml() {
  const a = me();
  return `<div class="w-card w-welcome">
    <p class="w-eyebrow">Welcome</p>
    <h2>Is Willow for you, or for someone you love?</h2>
    <p class="lead">Willow keeps what matters in one gentle place: how the spirit is doing, what the person wants, the stories they want kept, and what helped today. Everything stays locked with a passcode.</p>
    <div class="w-choices w-choices-big">
      <button type="button" class="w-choice" data-w-for="me" onclick="W.setup('me')"><b>This is for me</b><span>I am in hospice care, or facing the end of life. Willow and its check-ins speak to me.</span></button>
      <button type="button" class="w-choice" data-w-for="helper" onclick="W.setup('helper')"><b>I'm caring for someone I love</b><span>A parent, a partner, a friend, or family. I set up their tree, and my own caregiver tree grows here too.</span></button>
    </div>
    ${a && a.age !== 'adult' ? `<p class="w-small">Willow is written for grown-ups. Kids and middle schoolers have their own trees, Maple and Aspen, in <a class="text-link" href="/home/">The Grounded Way</a>, and the guides and readings here are open to everyone.</p>` : ''}
    <p class="w-small">You don't need a profile to read the guides, the readings, or the bedside list. They're in the tabs above${window.innerWidth <= 700 ? ' and below' : ''}.</p>
  </div>`;
}
function setup(kind) {
  if (!GP()) { toast('Profiles need a newer browser.'); return; }
  const reason = kind === 'me'
    ? 'Willow keeps your tree, your faith answers, and your stories in your own profile, locked with a passcode only you know.'
    : 'First, your own profile. You will open your loved one\'s tree with your own passcode, and your own tree grows here too, because you are carrying this as well.';
  GGP.require({ reason, age: 'adult' }).then(ok => {
    const a = me(); if (!ok || !a) return;
    if (a.age !== 'adult') { toast('Willow is written for grown-ups.'); return; }
    const r = rec(a.id);
    if (kind === 'me') {
      if (!r.started) { r.started = today(); r.role = 'person'; }
      persist(a.id).then(() => { S.pid = a.id; startCheckin(false); });
    } else {
      if (!r.started) { r.started = today(); r.role = 'helper'; }
      persist(a.id).then(() => { S.tab = 'setup'; render(); scrollTop(true); });
    }
  });
}
VIEWS.setup = () => {
  const a = me(); if (!a) return welcomeHtml();
  const ppl = helped();
  return `<div class="w-card">
    <p class="w-eyebrow">Someone you love</p>
    <h2>Set up Willow for them</h2>
    <p class="lead">Willow is their own tree. They get their own profile, and you open it as their helper with your own passcode. They choose what helpers see.</p>
    <div class="w-choices">
      <button type="button" class="w-choice" onclick="W.newPerson()"><b>Make a profile for them</b><span>Do it together if you can. You'll stay signed in as their helper.</span></button>
      <button type="button" class="w-choice" onclick="W.existing()"><b>They already have a profile here</b><span>Open it with their passcode, then add yourself as a helper.</span></button>
    </div>
    ${ppl.length ? `<p class="w-small">You already help ${ppl.map(p => esc(p.name)).join(', ')}. <button type="button" class="text-btn" onclick="W.view('${ppl[0].id}')">Go to ${esc(ppl[0].name)}'s tree</button></p>` : ''}
    <p class="w-small">Your own tree is here too. <button type="button" class="text-btn" onclick="W.view('${a.id}');W.checkin(true)">Take a quick check-in for yourself</button></p>
  </div>`;
};
function newPerson() {
  if (!GP()) return;
  let made = null;
  GGP.createDialog({ forOther: true, keepMe: true, reason: 'Willow will be their own tree, locked in their own profile. As their helper, you open it with your own passcode.', onCreated: id => { made = id; } }).then(ok => {
    if (!ok || !made) return;
    const r = rec(made); if (!r) { toast('Their profile is ready. Open it to begin.'); return; }
    r.started = today(); r.role = 'person'; r.setupBy = (me() || {}).name || '';
    persist(made).then(() => { S.pid = made; publish(made); S.tab = 'today'; render(); scrollTop(true); toast('Willow is ready for ' + nameOf(made) + '.'); });
  });
}
function existing() {
  if (!GP()) return;
  GGP.openDialog({ reason: 'Choose their picture and type their passcode. Then open Settings in Willow and add yourself as a helper.' }).then(ok => {
    if (!ok) return;
    const a = me(), r = rec(a.id); if (r && !r.started) { r.started = today(); r.role = 'person'; persist(a.id); }
    S.pid = a.id; S.tab = 'today'; render(); setTimeout(() => openSettings('helpers'), 250);
  });
}

/* ---------- Today ---------- */
function offer(r, role) {
  const d = (r.days || {})[today()] || {}, off = d.off || 0;
  if (role === 'helper') { const L = P.selfcare; const it = L[(dayNo() + off) % L.length]; return { part: 'leaves', it }; }
  // The four tended parts only (GWG BLD 907); Trunk and Fruit grow from that tending.
  const order = PARTS.map(p => p.key).filter(k => wTends(k) && (P.person[k] || []).length), need = needPart(r, order);
  const part = need && off === 0 ? need : order[(dayNo() + off) % order.length];
  const L = P.person[part]; return { part, it: L[(dayNo() + off) % L.length] };
}
const evOf = it => it[it.length - 1];
const timeOf = it => it.length === 5 ? it[3] : '';
function practiceCard(r, role) {
  const o = offer(r, role), it = o.it, d = (r.days || {})[today()] || {}, done = (d.done || []).includes(o.part + ':' + it[0]);
  const p = PART[o.part];
  return `<div class="w-card w-practice" style="--pc:${p.color}" data-read="Read this practice aloud" data-read-rec>
    <img class="w-pimg" src="/shared/heroes/p/willow-${role === 'helper' ? 'helpers' : 'today'}-card.webp" alt="" width="800" height="450" loading="lazy">
    <p class="w-eyebrow">One gentle thing for today${role === 'person' ? ' &middot; ' + p.part : ''}</p>
    <h3>${esc(it[1])}</h3>
    <p>${esc(it[2])}</p>
    <p class="w-meta">${timeOf(it) ? esc(timeOf(it)) + ' &middot; ' : ''}${esc(P.evidence[evOf(it)] || '')}</p>
    ${window.GGSources ? GGSources.practice(it[1], 'willow') : ''}
    <div class="btn-row">
      ${done ? `<span class="w-done">${icon('leaf', 18)} Done for today. That's enough.</span>` : `<button type="button" class="btn btn-primary" onclick="W.did('${o.part}','${it[0]}')">Did it today</button>`}
      <button type="button" class="btn btn-secondary" onclick="W.another()">Something else</button>
    </div>
    <p class="w-small">${role === 'person' ? 'Every practice works lying down, and every one can be done with a helper.' : 'Five minutes for you counts. It helps them too.'} No streaks here. One a day is plenty, and none is okay.</p>
  </div>`;
}
function did(part, id) {
  const t = target(), r = rec(t); if (!r) return;
  const d = r.days[today()] = r.days[today()] || {}; d.done = d.done || [];
  if (!d.done.includes(part + ':' + id)) d.done.push(part + ':' + id);
  persist(t).then(() => { publish(t); render(); if (window.GGLiving) GGLiving.burst(2); toast('Done for today. That\'s enough.'); });
}
function another() {
  const t = target(), r = rec(t); if (!r) return;
  const d = r.days[today()] = r.days[today()] || {}; d.off = (d.off || 0) + 1;
  persist(t).then(render);
}
function lineHtml() {
  const L = line();
  return `<div class="w-line" role="note">${icon('phone', 20)}<div>${L ? `<b>${esc(L.name || 'Hospice 24/7 line')}</b> <a href="${telHref(L.phone)}">${esc(L.phone)}</a><span>Call any time, day or night, before 911 for anything hospice can help with.</span>` : `<b>Worried? Call your hospice first, day or night.</b><span>${me() ? '<button type="button" class="text-btn" onclick="W.settings(\'line\')">Add your hospice\'s 24/7 number</button> so it is one tap away.' : 'Their number is on your admission papers or the fridge sheet.'}</span>`}</div></div>`;
}
/* The living Today scene (GWG BLD 756): Willow's own painting, with light from today's gentle thing.
   One practice a day is plenty here, so one brings full light. Days without one rest in a light morning
   mist only; it never wilts, droops, or goes bare. Fireflies drift at dusk (shared/gg-living.js). */
function willowScene(r, self) {
  const d = today(), done = new Set(((r.days || {})[d] || {}).done || []).size;
  const tended = k => !!(((r.days || {})[k] || {}).done || []).length;
  let miss = 0; const any = Object.keys(r.days || {}).some(k => k < d && tended(k));
  if (any) { for (let i = 1; i <= 30; i++) { const x = new Date(); x.setDate(x.getDate() - i); if (tended(dstr(x))) break; miss++; } }
  const who = self ? 'Your willow' : 'Their willow', hr = new Date().getHours();
  const light = done ? 1 : miss ? 0.3 : 0.55;
  const line = done ? who + ' is in full light today. That\'s enough.'
    : miss ? who + ' is resting in a soft morning mist. One gentle thing brings the light, whenever it fits.'
    : (hr < 12 ? 'Good morning. ' : hr < 17 ? 'Good afternoon. ' : 'Good evening. ') + who + ' is ready for today.';
  W_SCENE = done;
  return { light, line, done };
}
let W_SCENE = 0;
function treeCard(r, id, role) {
  const self = id === (me() || {}).id, c = lastOwn(r), rings = ringsOf(r), show = sees('tree');
  const who = self ? 'your' : esc(nameOf(id)) + '\'s';
  let words = '';
  if (c && show) words = `<ul class="w-words">${PARTS.map(p => c.levels && c.levels[p.key] ? `<li style="--pc:${p.color}"><b>${esc(wLabel(p))}</b><span>${esc(C.words[c.levels[p.key]])}</span></li>` : '').join('')}</ul><p class="w-small">From ${self ? 'your' : 'the'} check-in on ${nice(c.date)}${c.by === 'tapped' ? ', answered with a helper tapping' : ''}.</p>`;
  else if (c && !show) words = `<p>${esc(nameOf(id))} keeps how their tree is doing private. That's their choice to make.</p>`;
  else words = `<p>${self ? 'Your' : esc(nameOf(id)) + '\'s'} tree is planted. A first check-in gives it words.</p>`;
  const sc = willowScene(r, self);
  return `<div class="w-card w-treecard w-treelive">
    <div class="w-treewrap">${window.GGLiving ? GGLiving.html({ app: 'willow', light: sc.light, label: sc.line }) : artTreeHtml(c && show ? c.levels : null, 'A willow tree with ' + rings + ' rings')}
      <p class="w-sceneline">${esc(sc.line)}</p><p class="w-rings">${rings ? rings + (rings === 1 ? ' ring' : ' rings') : 'Rings grow with each check-in'}</p></div>
    <div class="w-treetext">
      <p class="w-eyebrow">${self ? 'Your tree' : who + ' tree'}</p>
      ${words}
      <div class="btn-row">
        <button type="button" class="btn btn-primary" onclick="W.checkin(true)">Quick Check-in</button>
        <button type="button" class="btn btn-secondary" onclick="W.checkin(false)">Full Check-in</button>
        ${(r.checkins || []).length ? `<button type="button" class="btn btn-secondary" onclick="W.go('history')">Past Check-ins</button>` : ''}
      </div>
      <p class="w-small">A ring grows with every check-in ${role === 'helper' ? 'you answer for yourself' : 'they answer themselves, with or without a helper tapping'}. Check in whenever it helps.</p>
    </div>
  </div>`;
}
function logCard(id) {
  const r = rec(id); if (!r) return '';
  if (!sees('log')) return '';
  const td = today(), list = (r.log || []).slice().reverse(), now = list.filter(e => e.d === td), before = list.filter(e => e.d !== td).slice(0, 40);
  const row = e => `<li><span class="w-logwho">${esc(e.t || '')}${e.by ? ' &middot; ' + esc(e.by) : ''}</span>${esc(e.text)}</li>`;
  return `<div class="w-card" id="w-log">
    <p class="w-eyebrow">What helped today</p>
    <h3>${isSelf() ? 'What helped' : 'Pass it on to the next helper'}</h3>
    <p class="w-small">One line is enough. "She settled when we played Amazing Grace." "He asked for his brother." The next person on shift will know.</p>
    ${now.length ? `<ul class="w-log">${now.map(row).join('')}</ul>` : '<p class="w-small"><i>Nothing yet today.</i></p>'}
    <label class="w-l" for="w-logtext">Add a line</label>
    <textarea id="w-logtext" rows="2" maxlength="600" placeholder="What helped, or what the next person should know"></textarea>
    <div class="btn-row"><button type="button" class="btn btn-primary btn-sm" onclick="W.addLog()">Add to today</button>${before.length ? `<button type="button" class="btn btn-secondary btn-sm" onclick="W.S.logAll=!W.S.logAll;W.render()">${S.logAll ? 'Hide earlier days' : 'Earlier days'}</button>` : ''}</div>
    ${S.logAll && before.length ? `<ul class="w-log w-log-old">${before.map(e => `<li><span class="w-logwho">${nice(e.d)} ${esc(e.t || '')}${e.by ? ' &middot; ' + esc(e.by) : ''}</span>${esc(e.text)}</li>`).join('')}</ul>` : ''}
  </div>`;
}
function addLog() {
  const t = target(), r = rec(t), el = $('#w-logtext'); if (!r || !el) return;
  const text = el.value.trim(); if (!text) { toast('Write a line first.'); return; }
  r.log = r.log || []; r.log.push({ id: uid(), d: today(), t: nowTime(), by: (me() || {}).name || '', text });
  if (r.log.length > 1500) r.log = r.log.slice(-1500);
  persist(t).then(() => { render(); toast('Added. The next helper will see it.'); });
}
function bedsidePick() {
  const L = P.bedside, a = L[dayNo() % L.length], b = L[(dayNo() + 5) % L.length];
  return `<div class="w-card" data-read="Read these aloud">
    <p class="w-eyebrow">At the bedside today</p>
    ${[a, b].map(x => `<h3 class="w-h4">${esc(x[1])}</h3><p>${esc(x[2])}</p>`).join('')}
    <div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="W.go('bedside')">More for the bedside</button></div>
  </div>`;
}
/* Support for Right Now: short videos from Learn (shared/learn-lessons.js), one tap from Today (Willow Learn, October 2026) */
function supportCard(after) {
  const vids = after
    ? [['wl-s-after', 'The First Hour After'], ['wl-s-blessing', 'A Blessing for the Room'], ['wl-s-tonight', 'Caring for Yourself Tonight'], ['wl-s-breathe', 'Breathe at the Bedside']]
    : [['wl-s-breathe', 'Breathe at the Bedside'], ['wl-s-say', "When You Don't Know What to Say"], ['wl-s-vigil', 'The Vigil Hours'], ['wl-s-tonight', 'Caring for Yourself Tonight']];
  return `<div class="w-card"><p class="w-eyebrow">${icon('play', 16)} Support for Right Now</p><p>Short videos, narrated aloud, for the hard hours. Open one anytime.</p>
    <div class="w-links">${vids.map(v => `<button type="button" onclick="window.GGLearn&&GGLearn.open('willow','${v[0]}')">${esc(v[1])}</button>`).join('')}<button type="button" onclick="window.GGLearn&&GGLearn.open('willow')">All Support Videos</button></div></div>`;
}
VIEWS.today = () => {
  const a = me();
  if (!a) return visitInCard() + welcomeHtml() + lineHtml() + supportCard() + aboutShort();
  const t = target(), r = rec(t), mine = rec(a.id);
  if (!mine.started && !helped().length) return visitInCard() + welcomeHtml() + lineHtml() + supportCard();
  if (!r) return welcomeHtml();
  if (remembered(t)) return rememberedHtml(t);
  const role = roleOf(t), self = t === a.id;
  let h = `<div class="w-head"><p class="w-eyebrow">${longDate(today())}</p><h2>${self ? (role === 'helper' ? 'Today, for you' : 'Today') : 'Today with ' + esc(nameOf(t))}</h2></div>`;
  h += lineHtml();
  h += visitInCard();
  h += practiceCard(r, role);
  h += treeCard(r, t, role);
  h += fromVisitCard(r, t);
  if (!self || role === 'person') h += logCard(t);
  if (!self) h += bedsidePick();
  h += supportCard();
  h += shareCard(t, role);
  if (self && role === 'helper') {
    const ppl = helped();
    h += `<div class="w-card"><p class="w-eyebrow">The people you care for</p>${ppl.length ? `<div class="w-chips">${ppl.map(p => `<button type="button" class="w-chip" onclick="W.view('${p.id}')">${window.GGAv ? GGAv.html(p.avatar, p.name, 26) : ''}<span>${esc(p.name)}'s tree</span></button>`).join('')}</div>` : `<p>You're not set up as anyone's helper yet.</p>`}<div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="W.go('setup')">Set up Willow for someone</button></div></div>`;
  }
  return h;
};
function rememberedHtml(t) {
  const r = rec(t), m = remembered(t), n = esc(nameOf(t));
  const after = (RD.readings || []).find(x => x.id === 'gb-after');
  return `<div class="w-head w-remember"><p class="w-eyebrow">${icon('candle', 16)} Remembered</p><h2>Remembering ${n}</h2><p class="lead">${m.date ? 'Died ' + longDate(m.date) + '. ' : ''}Their tree stays here, just as it was. Nothing is taken away.</p></div>
    <div class="w-card w-treecard"><div class="w-treewrap">${artTreeHtml(sees('tree') && lastOwn(r) ? lastOwn(r).levels : null, n + '\'s willow, remembered', 'w-remart')}<p class="w-rings">${ringsOf(r) ? ringsOf(r) + (ringsOf(r) === 1 ? ' ring' : ' rings') : 'Remembered'}</p></div>
      <div class="w-treetext">${r.matters && r.matters.who && sees('matters') ? `<p class="w-eyebrow">In their words</p><p class="w-quote">${esc(r.matters.who)}</p>` : ''}
      ${after ? `<div data-read="Read this aloud"><p class="w-eyebrow">${esc(after.title)}</p>${after.lines.map(l => `<p class="w-line-read">${esc(l)}</p>`).join('')}</div>` : ''}</div></div>
    <div class="w-card"><p class="w-eyebrow">The next few days</p>
      <div class="w-links"><button type="button" onclick="W.guide('firsthour')">The first hour after</button><button type="button" onclick="W.guide('official')">Making it official</button><button type="button" onclick="W.guide('relief')">Relief, and the guilt that follows</button><button type="button" onclick="W.go('cuttings')">Their Cuttings</button></div>
      <div class="btn-row"><button type="button" class="btn btn-primary btn-sm" onclick="W.go('plan')">The Farewell Checklist</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.go('obituary')">The Obituary</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.go('eulogy')">The Eulogy</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.go('send')">Send to the Grounded Team</button></div>
      <p class="w-small">Your hospice keeps caring for the family. Most offer bereavement support for about 13 months after a death. Ask for it by name.</p></div>
    ${supportCard(true)}
    ${logCard(t)}
    <div class="w-card"><p class="w-eyebrow">Your own tree</p><p>Grief is part of your tree now. Your check-ins keep growing it.</p><div class="btn-row"><button type="button" class="btn btn-secondary" onclick="W.view('${(me() || {}).id}')">Go to my own tree</button></div></div>`;
}
function aboutShort() {
  return `<div class="w-card"><p class="w-eyebrow">How Willow works</p><p>Check in on every part of the tree, gently, whenever it helps. Keep what matters to you written down. Save stories and letters as Cuttings, gathered into a Legacy Book. Plan the farewell in one place: Service Wishes, a checklist, the Obituary, and the Eulogy, with one tap to send it all to the Grounded team. Find words for hard conversations in When Life Changes, readings and faith cards for all faith traditions and everything in-between, what to do at the bedside, and short videos in Learn.</p><div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="W.go('about')">Read more</button></div></div>`;
}
VIEWS.about = () => `<div class="w-head"><p class="w-eyebrow">How it works</p><h2>A tree for the last part of the path</h2></div>
  <div data-read="Read this aloud">
  <p class="lead">A willow bends. It bends so far in a storm you'd think it should break, and it doesn't. Near the end of life, everyone in the room is bending. Willow is here so no one bends alone.</p>
  <p class="lead">${esc(P.intro)}</p>
  <h3 class="section-title">Tend Four, Grow Two</h3>
  <p class="lead">Gentle tending for four parts, spirit, mind, body, and relationships, in whatever way the day allows. Meaning and hope grow from that tending.</p>
  ${ART_ON() ? `<div class="w-art w-how">${GGTreeArt.howItWorks(null, { app: 'willow', parts: artParts(true), maxH: 420, label: 'The Willow painting with soft lights to tap', hint: 'Tap a soft light on the tree to read what that part holds.' })}</div>`
    : `<div class="w-parts">${PARTS.map(p => `<div class="w-part" style="--pc:${p.color}"><b>${esc(wLabel(p))}</b><span>${esc(wTends(p.key) ? p.name : 'Grows from your tending')}</span><p>${esc(PART_WORDS[p.key].person)}</p></div>`).join('')}</div>`}
  <h3 class="section-title">Built for two</h3>
  <p class="lead">Willow is the person's own tree. It's also built for the people who love them: a family member can set it up, tap answers while their person talks, and keep a log of what helped today. Helpers open it with their own passcode, and see only what the person chooses to share. Helpers have their own tree here too, because caregivers carry this as well.</p>
  <h3 class="section-title">Every answer says who answered</h3>
  <p class="lead">They answered. They answered and a helper tapped. Or a helper answering from what they see, when their person can no longer say. That last kind is kept apart, and never speaks for the person's own tree.</p>
  <h3 class="section-title">Faith comes first</h3>
  <p class="lead">Willow asks about faith on the second screen, every time, because a chaplain always asks. Every answer is welcome, including none, and a person can choose more than one tradition. Each person answers for themselves.</p>
  <h3 class="section-title">What's inside</h3>
  <p class="lead">Gentle guided check-ins on every part of the tree, one question at a time: one that speaks to the person in hospice care, and Your Caregiver Check-in for the people beside them. What Matters to Me, Vigil Wishes, and Service Wishes; Cuttings for stories and letters, gathered into the Legacy Book; and help at the Bedside are here too. The Farewell tab holds the Farewell Checklist, the Obituary, the Eulogy, readings, and Send to the Grounded Team, so the people preparing the service have everything in one place. When Life Changes holds 22 guides for the hardest conversations, each with two short videos. Readings for all faith traditions and everything in-between, many with Listen to hear them read aloud, and faith cards for 29 traditions. Learn has short videos for the person and the people who love them. Your hospice's 24/7 line comes first, at the top of Today and under every check-in.</p>
  <h3 class="section-title">Who made this</h3>
  <div class="maker-card"><p>I'm Chris, a hospice chaplain. I sit with people at the end of their lives and the families around them, and I ask the same questions every day: what grounds you, what matters most, who do you want close. Willow is those questions, kept gently in one place.</p></div>
  </div>
  <div class="privacy-note" style="margin-top:22px"><strong>Your answers stay with you.</strong> Everything saved in Willow stays locked with a passcode. Grow With Grounded never reads it, and only the people you choose can open it. Willow offers spiritual guidance and emotional support; your hospice team holds the medical care. For anything urgent, call your hospice first, day or night.</div>
  <div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.begin()">Begin with Willow</button><button type="button" class="btn btn-secondary" onclick="W.go('guides')">When Life Changes</button><button type="button" class="btn btn-secondary" onclick="W.go('readings')">Readings</button></div>`;
function begin() {
  const a = me();
  if (a && (rec(a.id).started || helped().length)) { go('today'); return; }
  S.tab = 'today'; render(); scrollTop(true);
}

/* ---------- the check-in ---------- */
const FAITH_EXTRA = { 'christian-other': 'Another Christian church', raised: 'Raised in a faith, not practicing now', private: 'I\'d rather not say' };
const faithName = id => (F.cards[id] && F.cards[id].name) || FAITH_EXTRA[id] || id;
// A helper answering from what they see: the same questions, about them.
function theyify(t) {
  const cut = t.indexOf('? Like '), head = cut > -1 ? t.slice(0, cut) : t, tail = cut > -1 ? t.slice(cut) : '';
  return head.replace(/\byourself\b/g, 'themselves').replace(/\byour\b/g, 'their').replace(/\byou (need|know|hold|want)\b/g, 'they $1').replace(/\byou\b/g, 'them') + tail;
}
/* Who Is Answering (GWG BLD 890): the person in hospice comes first, answering for themselves. The saved values stay
   self, tapped, observed (C.answeredBy, read by the Field Guide too); only the words on these buttons change, with the name. */
function whoLabel(v, n) { return v === 'self' ? `It's me, ${n}` : v === 'tapped' ? `${n} talks, I tap` : 'I\'m answering from what I see'; }
function whoSub(v, n) {
  return v === 'self' ? 'I am answering for myself. The questions speak to me.'
    : v === 'tapped' ? `${n} answers out loud. You read each question and tap.`
    : `When ${n} is resting, you answer from what you see and hear. This is kept apart from their own rings.`;
}
function whoHelp(n) { return `Every answer remembers who gave it, so ${n}'s own voice stays clear.`; }
function ckSteps(ck) {
  const s = [];
  if (ck.askWho) s.push('who');
  if (ck.by !== 'observed') s.push('faith');
  if (ck.quick) s.push('quick'); else PARTS.forEach(p => s.push(p.key));
  s.push('close');
  return s;
}
function startCheckin(quick, classic) {
  const a = me();
  if (!a) { setup('me'); return; }
  const t = target(), r = rec(t); if (!r) return;
  if (remembered(t)) { toast('Their tree is remembered now. Nothing more to check.'); return; }
  if (!r.started) { r.started = today(); r.role = t === a.id ? (r.role || 'person') : 'person'; persist(t); }
  const self = t === a.id;
  S.ck = { pid: t, role: roleOf(t), self, by: self ? 'self' : '', askWho: !self, quick: !!quick, i: 0, ans: {}, faith: r.faith ? JSON.parse(JSON.stringify(r.faith)) : { lives: [] }, faithEdit: !r.faith, note: '', done: false };
  S.tab = 'checkin'; render(); scrollTop(true);
  if (!classic && GUIDED()) guided(); // GWG BLD 886: Guided is the way in; Read It All shows this classic form
}
function ckStem(ck) {
  if (ck.role === 'helper') { const h = helped()[0]; return C.stems.helper.replace('{name}', h ? h.name : 'them'); }
  if (ck.by === 'observed') return `From what you've seen and heard, lately how often has ${esc(nameOf(ck.pid))}...`;
  return C.stems.standard;
}
// GWG BLD 890 (Chris: "we should always be able to select more than one religion on all checkins"): a person may
// choose several traditions. f.trads is the list; f.trad keeps the first one, so older records and readers still work.
// A record saved before holds only f.trad, and reads as a one-item list. "I'd rather not say" stands alone.
const FAITH_ALONE = ['private'];
const tradsOf = f => !f ? [] : Array.isArray(f.trads) ? f.trads.filter(x => x && typeof x === 'string') : (f.trad ? [f.trad] : []);
function setTrads(f, L) { f.trads = L.slice(); f.trad = L[0] || ''; }
function toggleTrad(f, v) {
  const L = tradsOf(f);
  setTrads(f, L.includes(v) ? L.filter(x => x !== v) : FAITH_ALONE.includes(v) ? [v] : L.filter(x => !FAITH_ALONE.includes(x)).concat(v));
}
const andList = a => a.length < 2 ? (a[0] || '') : a.length === 2 ? a[0] + ' and ' + a[1] : a.slice(0, -1).join(', ') + ', and ' + a[a.length - 1];
const FAITH_ASK = 'Choose any that fit, write your own words, or "I\'d rather not say."';
const faithNone = ck => ck.faith && (tradsOf(ck.faith).includes('private') || ck.faith.matters === 'none');
function qText(ck, q) { let t = faithNone(ck) && q.none ? q.none : q.t; if (ck.by === 'observed') t = theyify(t); return t; }
function flagOn(ck, q, a) { const f = q.flag && C.flags[q.flag]; return !!(f && f.on.includes(a) && f.who === (ck.role === 'helper' ? 'helper' : 'person')); }
function qHtml(ck, key, i) {
  const q = bank(ck.role)[key][i], cur = (ck.ans[key] || [])[i], text = qText(ck, q);
  const note = flagOn(ck, q, cur) && ck.by !== 'observed' ? `<p class="w-flagnote">${esc(C.flags[q.flag].note)}</p>` : '';
  return `<div class="q-card${cur ? ' answered' : ''}" role="radiogroup" aria-label="${esc(text)}" style="--domain-color:${PART[key].color}">
    <p class="q-text"><span class="q-num">${ck.quick ? '' : i + 1}</span>${esc(text)}</p>
    <div class="q-opts">${C.answers.map(o => `<button type="button" data-v="${o[0]}" aria-pressed="${cur === o[0]}" onclick="W.answer('${key}',${i},'${o[0]}')">${esc(o[1])}</button>`).join('')}</div>
    ${q.why && ck.role === 'person' ? `<details class="q-why"><summary>Why this question?</summary><p>${esc(q.why)}</p></details>` : ''}
    ${note}
  </div>`;
}
function answer(key, i, v) {
  const ck = S.ck; if (!ck) return;
  ck.ans[key] = ck.ans[key] || []; ck.ans[key][i] = v;
  const y = window.scrollY; render(); window.scrollTo(0, y);
}
function ckNav(ck, steps, nextLabel) {
  const i = ck.i, last = i === steps.length - 1;
  return `<div class="btn-row step-nav">${i > 0 ? `<button type="button" class="btn btn-secondary" onclick="W.step(-1)">Back</button>` : `<button type="button" class="btn btn-secondary" onclick="W.go('today')">Maybe later</button>`}
    ${last ? `<button type="button" class="btn btn-primary" onclick="W.finish()">See the tree</button>` : `<button type="button" class="btn btn-primary" onclick="W.step(1)">${esc(nextLabel || 'Next')}</button>`}</div>`;
}
function step(d) {
  const ck = S.ck; if (!ck) return;
  const steps = ckSteps(ck), cur = steps[ck.i];
  if (d > 0 && cur === 'who' && !ck.by) { toast('Choose who is answering first.'); return; }
  if (d > 0 && cur === 'faith' && ck.faithEdit && !tradsOf(ck.faith).length && !ck.faith.own) { toast(FAITH_ASK); return; }
  ck.i = Math.max(0, Math.min(steps.length - 1, ck.i + d));
  if (window.GGRead && GGRead.stop) GGRead.stop();
  render(); scrollTop(true);
}
VIEWS.checkin = () => {
  const ck = S.ck; if (!ck) return VIEWS.today();
  const steps = ckSteps(ck); if (ck.i >= steps.length) ck.i = steps.length - 1;
  const st = steps[ck.i], n = esc(nameOf(ck.pid));
  const dots = `<div class="step-progress">${steps.map((s, j) => { const p = PART[s]; return `<span class="step-dot${j === ck.i ? ' current' : j < ck.i ? ' done' : ''}" style="--domain-color:${p ? p.color : 'var(--gold)'}"><span class="lbl">${p ? p.part : s === 'who' ? 'Who' : s === 'faith' ? 'Faith' : s === 'quick' ? 'Six parts' : 'Close'}</span></span>`; }).join('')}</div>`;
  let body = '';
  if (st === 'who') {
    body = `<div class="step-head"><div><div class="step-count">${ck.quick ? 'Quick Check-in' : 'Full Check-in'} for ${n}</div><h2 class="step-title" style="--domain-color:var(--gold)">Who is answering?</h2></div></div>
      <p class="lead">${esc(whoHelp(nameOf(ck.pid)))}</p>
      <div class="w-choices w-choices-3">${C.answeredBy.map(b => `<button type="button" class="w-choice" aria-pressed="${ck.by === b[0]}" onclick="W.who('${b[0]}')"><b>${esc(whoLabel(b[0], nameOf(ck.pid)))}</b><span>${esc(whoSub(b[0], nameOf(ck.pid)))}</span></button>`).join('')}</div>`;
  } else if (st === 'faith') body = faithStep(ck);
  else if (st === 'quick') {
    body = `<div class="step-head"><div><div class="step-count">About 2 minutes</div><h2 class="step-title" style="--domain-color:var(--gold)">Quick Check-in</h2><div class="step-domain">One question for each part of the tree</div></div></div>
      ${ck.by === 'tapped' ? `<p class="w-small">Read each question to ${n} slowly, and tap their answer. "Not sure" is always okay.</p>` : ''}
      <p class="q-stem">${ckStem(ck)}</p>${PARTS.map(p => `<div class="quick-part" style="--domain-color:${p.color}"><div class="quick-label" style="color:${p.color}">${esc(wLabel(p))}</div>${qHtml(ck, p.key, 0)}</div>`).join('')}`;
  } else if (PART[st]) {
    const p = PART[st], k = PARTS.indexOf(p);
    body = `<div class="step-head" style="--domain-color:${p.color}"><div><div class="step-count">Part ${k + 1} of 6</div><h2 class="step-title">${esc(wLabel(p))}</h2><div class="step-domain">${esc(p.name)}</div></div></div>
      <p class="w-partwords">${esc(PART_WORDS[st][ck.role])}</p>
      ${ck.by === 'tapped' && k === 0 ? `<p class="w-small">Read each question to ${n} slowly, and tap their answer. "Not sure" is always okay.</p>` : ''}
      <p class="q-stem">${ckStem(ck)}</p>${bank(ck.role)[st].map((q, i) => qHtml(ck, st, i)).join('')}`;
  } else body = closeStep(ck);
  const nextP = PART[steps[ck.i + 1]];
  const back = GUIDED() ? `<div class="btn-row w-guided-row"><button type="button" class="btn btn-secondary btn-sm" onclick="W.guided()">Guided Check-in</button></div>` : '';
  return `<div class="w-ck" data-read="Read this aloud">${back}${dots}${body}</div>${ckNav(ck, steps, nextP ? 'Next: ' + nextP.part : 'Next')}${quietHtml()}`;
};
function who(v) { const ck = S.ck; if (!ck) return; ck.by = v; render(); }

/* faith, on the second screen, every time */
function faithSummary(f) {
  if (!f) return '';
  const I = F.intake, opt = (k, v) => { const row = I.follow.find(x => x[0] === k); const o = row && row[2].find(x => x[0] === v); return o ? o[1] : ''; };
  const bits = [];
  const ts = tradsOf(f); if (ts.length) bits.push(andList(ts.map(faithName)));
  if (f.own) bits.push('"' + f.own + '"');
  if (f.matters) bits.push('Matters now: ' + opt('matters', f.matters).toLowerCase());
  if ((f.lives || []).length) bits.push('Lived through ' + f.lives.map(v => opt('lives', v).toLowerCase()).join(', '));
  if (f.changed) bits.push(opt('changed', f.changed));
  return bits.map(esc).join('. ') + '.';
}
function faithStep(ck, inGuided) {
  const I = F.intake, f = ck.faith, r = rec(ck.pid), self = ck.self, n = esc(nameOf(ck.pid));
  const head = inGuided ? (self ? '' : `<p class="w-small">Asked of ${n}, in their own words.</p>`) : `<div class="step-head"><div><div class="step-count">${self ? '' : 'Asked of ' + n + ', in their own words'}</div><h2 class="step-title" style="--domain-color:var(--p-roots)">Faith, spirit, or something else</h2></div></div>`;
  if (r.faith && !ck.faithEdit) {
    return head + `<p class="lead">Last time${r.faith.date ? ', on ' + nice(r.faith.date) : ''}: ${faithSummary(r.faith)}</p>
      ${r.faith.never ? `<p class="w-small"><b>Please Keep in Mind:</b> ${esc(r.faith.never)}</p>` : ''}
      <p class="lead">Is that still true${self ? ' for you' : ' for ' + n}?</p>
      <div class="btn-row"><button type="button" class="btn btn-primary" ${inGuided ? 'data-ggd-next' : 'onclick="W.step(1)"'}>Yes, still true</button><button type="button" class="btn btn-secondary" onclick="W.S.ck.faithEdit=true;W.render()">Something has changed</button></div>`;
  }
  const mine = tradsOf(f), chip = id => `<button type="button" class="w-tchip" aria-pressed="${mine.includes(id)}" onclick="W.faith('trad','${id}')">${esc(faithName(id))}</button>`;
  const single = row => `<fieldset class="w-fs"><legend>${esc(row[1])}</legend><div class="w-tchips">${row[2].map(o => `<button type="button" class="w-tchip" aria-pressed="${f[row[0]] === o[0]}" onclick="W.faith('${row[0]}','${o[0]}')">${esc(o[1])}</button>`).join('')}</div></fieldset>`;
  const multi = row => `<fieldset class="w-fs"><legend>${esc(row[1])}</legend><div class="w-tchips">${row[2].map(o => `<button type="button" class="w-tchip" aria-pressed="${(f.lives || []).includes(o[0])}" onclick="W.faith('lives','${o[0]}')">${esc(o[1])}</button>`).join('')}</div></fieldset>`;
  return head + `<p class="lead">${esc(I.ask)} ${esc(I.welcome)}</p>
    ${self ? '' : `<p class="w-small">Each person answers for themselves. Ask ${n}, and tap what they say.</p>`}
    <p class="w-small">${esc(I.many || 'Choose as many as fit.')}</p>
    ${I.groups.map(g => `<fieldset class="w-fs"><legend>${esc(g[1])}</legend><div class="w-tchips">${g[2].map(chip).join('')}</div></fieldset>`).join('')}
    <label class="w-l" for="w-fown">${esc(I.own)}</label><input type="text" id="w-fown" maxlength="120" value="${esc(f.own || '')}" oninput="W.S.ck.faith.own=this.value">
    ${single(I.follow[0])}${multi(I.follow[1])}${single(I.follow[2])}
    <label class="w-l" for="w-fcall">${esc(I.call)}</label><input type="text" id="w-fcall" maxlength="160" value="${esc(f.call || '')}" placeholder="A name, a church, a temple, a phone number" oninput="W.S.ck.faith.call=this.value">
    <label class="w-l" for="w-fnever">${esc(I.never)}</label><input type="text" id="w-fnever" maxlength="200" value="${esc(f.never || '')}" placeholder='${esc(I.neverEx)}' oninput="W.S.ck.faith.never=this.value">
    <p class="w-small">These answers stay locked in ${self ? 'your' : n + '\'s'} profile.${self ? ' Helpers see them only if you choose to share them in Settings.' : ''}</p>`;
}
function faith(k, v) {
  const f = S.ck && S.ck.faith; if (!f) return;
  if (k === 'lives') { f.lives = f.lives || []; f.lives = f.lives.includes(v) ? f.lives.filter(x => x !== v) : f.lives.concat(v); }
  else if (k === 'trad') toggleTrad(f, v);
  else f[k] = f[k] === v ? '' : v;
  const y = window.scrollY; render(); window.scrollTo(0, y);
}

/* closing (GWG BLD 887: no safety step, only the quiet line of type) */
function ckFlags(ck) {
  const out = [];
  PARTS.forEach(p => (bank(ck.role)[p.key] || []).forEach((q, i) => { const a = (ck.ans[p.key] || [])[i]; if (flagOn(ck, q, a) && !out.includes(q.flag)) out.push(q.flag); }));
  return out;
}
// The quiet line: the hospice's 24/7 line first, then 988 and 911. Type only, never read aloud.
function quietInner() {
  const L = line(), H = C.help || {};
  const hos = L ? `Call ${esc(L.name || H.hospice || 'your hospice\'s 24/7 line')} first, day or night: <a class="text-link" href="${telHref(L.phone)}">${esc(L.phone)}</a>.` : esc(H.hospiceFirst || 'Call your hospice\'s 24/7 line first, day or night.');
  return `${hos} ${esc(H.quiet || 'If you ever feel like hurting yourself, call or text 988. In danger now, call 911.')}`;
}
function quietHtml() { return `<p class="w-small w-quiet" style="margin-top:14px">${quietInner()}</p>`; }
function closeStep(ck) {
  let h = `<div class="step-head"><div><div class="step-count">Almost done</div><h2 class="step-title" style="--domain-color:var(--gold)">Before you see the tree</h2></div></div>`;
  h += `<label class="w-l" for="w-cknote">${ck.by === 'observed' ? 'Anything you noticed today (optional)' : 'Anything to remember about today? (optional)'}</label><textarea id="w-cknote" rows="3" maxlength="800" oninput="W.S.ck.note=this.value">${esc(ck.note)}</textarea>`;
  return h;
}
function finish() {
  const ck = S.ck, a = me(); if (!ck || !a) return;
  const r = rec(ck.pid); if (!r) return;
  const sc = {}, lv = {};
  PARTS.forEach(p => { const s = scorePart(ck.role, p.key, ck.ans[p.key]); if (s != null) { sc[p.key] = s; lv[p.key] = levelOf(s); } });
  if (!Object.keys(lv).length) { toast('Answer at least one question first. "Not sure" counts.'); return; }
  const by = ck.by || 'self';
  const e = { id: uid(), date: today(), by, helper: by === 'self' ? '' : a.name, quick: ck.quick, role: ck.role, answers: JSON.parse(JSON.stringify(ck.ans)), levels: lv, sc, flags: ckFlags(ck), note: ck.note || '', v: C.version };
  if (by !== 'observed' && (ck.faithEdit || !r.faith) && (tradsOf(ck.faith).length || ck.faith.own)) { r.faith = Object.assign({}, ck.faith, { date: today(), by: by === 'tapped' ? 'tapped' : 'self' }); setTrads(r.faith, tradsOf(ck.faith)); }
  if (by !== 'observed' && r.faith && r.faith.never && !(r.matters || {}).never) { r.matters = r.matters || {}; r.matters.never = r.faith.never; }
  r.checkins.push(e);
  ck.done = true; ck.entry = e;
  persist(ck.pid).then(() => { publish(ck.pid); S.tab = 'results'; render(); scrollTop(true); });
}
/* ---------- the guided check-in (GWG BLD 886) ----------
   Guided is the way into every check-in kind: one question at a time, read aloud in Brian's voice
   (shared/gg-guided.js, the guide's words in shared/guided/willow.js). Answers go straight into S.ck, the same
   state the classic form uses, and Done calls finish(), so Willow's own scoring, flags, save, and results run as
   they always have. Read It All shows the classic form with every answer carried over. Who Is Answering comes
   first as its own short step (it decides the questions and the guide's words). Faith is Willow's own form inside
   the player. The hospice line and the quiet line show as type only. Willow has no Growth Plan builder yet, so
   the plan kind waits. Open with ?guided=checkin or ?guided=quick (The Grounded Way's sheet and links). */
const GUIDED = () => !!(window.GGGuided && GGGuided.run && window.GG_GUIDED && GG_GUIDED.willow);
let GH = null; // the player while it shows
function gKind(ck) {
  if (ck.role === 'helper') return 'helper';
  if (ck.by === 'tapped') return 'tapped';
  if (ck.by === 'observed') return 'observed';
  return ownCheckins(rec(ck.pid)).length ? (ck.quick ? 'quick' : 'full') : 'start';
}
function gTitle(ck) {
  const k = gKind(ck), n = nameOf(ck.pid);
  if (k === 'start') return 'Your First Check-in';
  if (k === 'helper') return 'Your Caregiver Check-in'; // GWG BLD 890: never mistaken for the person's own check-in
  if (k === 'tapped' || k === 'observed') return (ck.quick ? 'Quick Check-in' : 'Full Check-in') + ' for ' + n;
  return ck.quick ? 'Quick Check-in' : 'Full Check-in';
}
// The stem shows with each question (with the name), and the voice reads it before each one (no names, so it is a recorded clip).
function gStem(ck) {
  if (ck.role === 'helper') { const h = helped()[0]; return C.stems.helper.replace('{name}', h ? h.name : 'them'); }
  if (ck.by === 'observed') return `From what you've seen and heard, lately how often has ${nameOf(ck.pid)}...`;
  return C.stems.standard;
}
function gStemSay(ck) {
  if (ck.role === 'helper') return C.stems.helper.replace('{name}', 'them');
  if (ck.by === 'observed') return 'From what you\'ve seen and heard, lately how often have they...';
  return C.stems.standard;
}
function gFaithQ(ck, K) {
  return { id: 'faith', type: 'form', aside: true, label: 'Faith', eb: 'Before the Questions', part: '', text: 'Faith, spirit, or something else', say: false, lead: K.faith || null,
    html: () => faithStep(ck, true), ready: () => (ck.faithEdit && !tradsOf(ck.faith).length && !ck.faith.own) ? FAITH_ASK : '' };
}
function gPartQs(ck) {
  const out = [], bk = bank(ck.role), stem = gStem(ck), sayStem = gStemSay(ck);
  PARTS.forEach(p => (ck.quick ? [0] : [0, 1, 2]).forEach(i => {
    const q = (bk[p.key] || [])[i]; if (!q) return;
    const text = qText(ck, q);
    out.push({ id: p.key + '.' + i, part: p.key, i, text, stem, say: sayStem + ' ' + text, type: 'choice', r: !!q.r, noTip: !!q.flag, wq: q,
      options: C.answers.map(a => ({ v: a[0], label: a[1] })),
      more: q.why && ck.role === 'person' ? [{ label: 'Why this question?', text: q.why }] : null });
  }));
  return out;
}
function gNoteQ(ck) {
  return { id: 'note', type: 'text', aside: true, label: 'Almost Done', eb: 'Before You See the Tree', part: '', maxlength: 800,
    text: ck.by === 'observed' ? 'Anything you noticed today?' : 'Anything to remember about today?', help: 'This one is optional. A word or two, or nothing at all.' };
}
function gQuestions(ck, K) {
  const out = [];
  if (ck.by !== 'observed') out.push(gFaithQ(ck, K || {}));
  return out.concat(gPartQs(ck), [gNoteQ(ck)]);
}
// The step of the classic form that holds a guided screen, so Read It All opens right there.
function gStepOf(ck, sc, Q) {
  const steps = ckSteps(ck); let key = 'close';
  const q = sc && Q && Q[sc.k === 'q' ? sc.i : sc.from];
  if (sc && sc.k === 'open') key = steps[0];
  else if (q) key = q.id === 'faith' ? 'faith' : q.id === 'note' ? 'close' : ck.quick ? 'quick' : q.part;
  const at = steps.indexOf(key); return at >= 0 ? at : 0;
}
function gAnswersOf(ck) {
  const a = {};
  Object.keys(ck.ans || {}).forEach(k => (ck.ans[k] || []).forEach((v, i) => { if (v != null) a[k + '.' + i] = v; }));
  if (ck.gFaith) a.faith = true;
  if (ck.gNote) a.note = ck.note || '';
  return a;
}
function guided() {
  const ck = S.ck; if (!ck || !GUIDED()) return;
  if (ck.askWho && !ck.by) return gWho(ck);
  gMain(ck);
}
function gClassic(ck, sc, Q) { if (S.ck !== ck) return; ck.i = gStepOf(ck, sc, Q); render(); scrollTop(true); }
function gWho(ck) {
  const n = nameOf(ck.pid), T = ((GG_GUIDED.willow.kinds || {}).tapped || {}).who;
  let done = false;
  GH = GGGuided.run({ tree: 'willow', kind: 'who', voice: 'brian', title: (ck.quick ? 'Quick Check-in' : 'Full Check-in') + ' for ' + n,
    script: { voice: 'brian', open: [], close: [] }, noClose: true, quietHtml: quietInner(),
    questions: [{ id: 'who', type: 'choice', aside: true, label: 'Who Is Answering', eb: 'Who Is Answering', text: 'Who is answering?', lead: T || null, noTip: true,
      help: whoHelp(n),
      options: C.answeredBy.map(b => ({ v: b[0], label: whoLabel(b[0], n), sub: whoSub(b[0], n) })) }],
    onAnswer: (id, v) => { if (S.ck === ck) ck.by = v; },
    onDone: () => { done = true; if (S.ck !== ck) return; if (!ck.by) { render(); return; } setTimeout(() => gMain(ck), 30); },
    onReadAll: () => { done = true; render(); scrollTop(true); },
    onClose: () => { GH = null; if (!done) setTimeout(() => { if (!done && S.ck === ck) render(); }, 0); }
  });
}
function gMain(ck) {
  const base = GG_GUIDED.willow, kind = gKind(ck), kinds = Object.assign({}, base.kinds || {}), K = Object.assign({}, kinds[kind] || kinds.full || {});
  if (ck.quick) K.enter = null; // the quick check-in: one question for each part, no part openers
  kinds[kind] = K;
  const script = Object.assign({}, base, { kinds });
  const Q = gQuestions(ck, K);
  // Faith answered as none or private: Roots asks its "none" wording (the same rule as qText), from here on.
  const refresh = () => Q.forEach(q => { if (q.wq) { q.text = qText(ck, q.wq); q.say = gStemSay(ck) + ' ' + q.text; } });
  let done = false, H = null;
  H = GH = GGGuided.run({ tree: 'willow', kind, voice: 'brian', title: gTitle(ck), script, questions: Q, answers: gAnswersOf(ck), quietHtml: quietInner(),
    isEdge: (q, v) => q.r ? (v === 'often' || v === 'always') : v === 'rarely',
    onAnswer: (id, v) => {
      if (S.ck !== ck) return;
      if (id === 'faith') { ck.gFaith = true; refresh(); return; }
      if (id === 'note') { ck.note = String(v || ''); ck.gNote = true; return; }
      const m = /^(\w+)\.(\d)$/.exec(id); if (!m) return;
      ck.ans[m[1]] = ck.ans[m[1]] || []; ck.ans[m[1]][+m[2]] = v;
    },
    onDone: () => { done = true; if (S.ck !== ck) return; ck.i = ckSteps(ck).length - 1; finish(); },
    onReadAll: () => { done = true; gClassic(ck, H && H.state().screen, Q); },
    onClose: () => { if (GH === H) GH = null; if (!done) setTimeout(() => { if (!done) gClassic(ck, H && H.state().screen, Q); }, 0); }
  });
  // GWG BLD 890: a caregiver's own check-in offers the person's check-in right there, so the two are never mixed up.
  if (kind === 'helper' && H && H.el) {
    const ppl = helped().filter(p => !remembered(p.id));
    if (ppl.length) {
      const bar = document.createElement('p'); bar.className = 'w-ggd-swap';
      bar.innerHTML = 'This check-in is about you. ' + ppl.map(p => `<button type="button" class="text-btn" data-w-swap="${esc(p.id)}">Check in with ${esc(p.name)} instead</button>`).join(' ');
      bar.addEventListener('click', e => {
        const b = e.target.closest('[data-w-swap]'); if (!b) return;
        done = true; const id = b.getAttribute('data-w-swap'), quick = ck.quick;
        if (window.GGGuided && GGGuided.close) GGGuided.close();
        setTimeout(() => { view(id); startCheckin(quick); }, 30);
      });
      const top = H.el.querySelector('.ggd-top'); if (top && top.parentNode) top.parentNode.insertBefore(bar, top.nextSibling); else H.el.appendChild(bar);
    }
  }
}
// Every sentence Brian can say in Willow's guided check-ins, for the recorder (each kind, each way of answering).
function guidedLines() {
  if (!GUIDED()) return [];
  const all = [], seen = {}, base = { pid: '', role: 'person', self: true, by: 'self', quick: false, ans: {}, faith: { lives: [] }, faithEdit: true, note: '' };
  const add = list => list.forEach(x => { if (!seen[x.text]) { seen[x.text] = 1; all.push(x); } });
  [['person', 'self', ''], ['person', 'self', 'none'], ['person', 'observed', ''], ['person', 'observed', 'none'], ['helper', 'self', ''], ['helper', 'self', 'none']].forEach(([role, by, none]) => {
    const ck = Object.assign({}, base, { role, by, faith: none ? { matters: 'none', lives: [] } : { lives: [] } });
    add(GGGuided.lines({ tree: 'willow', voice: 'brian', allKinds: true, script: GG_GUIDED.willow, questions: gQuestions(ck, {}) }));
  });
  add(GGGuided.lines({ tree: 'willow', voice: 'brian', script: { voice: 'brian', open: [], close: [] }, questions: [{ id: 'who', text: 'Who is answering?', lead: ((GG_GUIDED.willow.kinds || {}).tapped || {}).who }] }));
  return all;
}
const GUIDE_FOR_FLAG = { end: 'end', burden: 'burden', struggle: 'punish', regret: 'forgive', guilt: 'notthere', alone: 'conflict', hope: 'relief' };
VIEWS.results = () => {
  const ck = S.ck; if (!ck || !ck.entry) return VIEWS.today();
  const e = ck.entry, r = rec(ck.pid), n = esc(nameOf(ck.pid)), self = ck.self, seen = e.by === 'observed';
  const need = ['edge', 'steady', 'strong'].map(l => PARTS.find(p => e.levels[p.key] === l)).find(Boolean);
  const st = need && PART_STORY[need.key];
  const words = `<ul class="w-words">${PARTS.map(p => e.levels[p.key] ? `<li style="--pc:${p.color}"><b>${esc(wLabel(p))}</b><span>${esc(seen ? C.words[e.levels[p.key]].replace(/your tree/g, 'their tree').replace(/You don't/g, 'They don\'t') : C.words[e.levels[p.key]])}</span></li>` : `<li style="--pc:${p.color}"><b>${esc(wLabel(p))}</b><span>Not sure today. That's okay.</span></li>`).join('')}</ul>`;
  const flags = (e.flags || []).filter(f => !seen && C.flags[f] && C.flags[f].note).map(f => `<p class="w-flagnote"><b>${esc(C.flags[f].title)}.</b> ${esc(C.flags[f].note)}${GUIDE_FOR_FLAG[f] ? ` <button type="button" class="text-btn" onclick="W.guide('${GUIDE_FOR_FLAG[f]}')">A guide for this</button>` : ''}</p>`).join('');
  return `<div class="w-head"><p class="w-eyebrow">${seen ? 'What you\'ve seen' : self ? 'Your tree today' : n + '\'s tree today'}</p><h2>${seen ? 'From what you see' : 'Here\'s how the tree is doing'}</h2>
    <p class="lead">${seen ? 'This is kept apart from ' + n + '\'s own answers, and doesn\'t add a ring. It helps their helpers and their hospice team notice what\'s changing.' : 'These are gentle words, not grades. Every part of a tree has seasons.'}</p></div>
    <div class="w-card w-treecard"><div class="w-treewrap">${artTreeHtml(e.levels, (seen ? 'From what you see: ' : '') + 'the willow painting, each part in light', seen ? 'w-seen' : '')}<p class="w-rings">${seen ? 'No new ring' : ringsOf(r) === 1 ? 'A first ring' : ringsOf(r) + ' rings'}</p></div><div class="w-treetext">${words}</div></div>
    ${flags ? `<div class="w-card"><p class="w-eyebrow">Gently</p>${flags}</div>` : ''}
    ${need && !seen ? `<div class="w-card"><p class="w-eyebrow">One small thing</p><p>Today's practice in Today leans toward the ${esc(need.part.toLowerCase())}: ${esc(need.name.toLowerCase())}.</p><div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.go('today')">Go to Today</button>${!(r.matters || {}).who && ck.role === 'person' ? `<button type="button" class="btn btn-secondary" onclick="W.go('matters')">Write what matters</button>` : ''}</div></div>` : `<div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.go('today')">Go to Today</button></div>`}
    ${st ? `<div class="w-card w-story"><p class="w-eyebrow">A Grounded story</p><h3><a class="text-link" href="${storyUrl(st[0])}" target="_blank" rel="noopener">${esc(st[0])}</a></h3><p class="w-quote">${esc(st[1])}</p></div>` : ''}
    <p class="w-small" style="text-align:center">New Grounded Stories arrive by email. <a class="text-link" href="https://chri5j0y.substack.com/subscribe" target="_blank" rel="noopener">Subscribe to Grounded</a></p>
    ${quietHtml()}`;
};
VIEWS.history = () => {
  const t = target(), r = rec(t); if (!r) return VIEWS.today();
  const self = t === (me() || {}).id, show = sees('tree');
  const row = e => `<li class="w-hist"><div><b>${nice(e.date)}</b><span>${e.quick ? 'Quick' : 'Full'} &middot; ${esc((C.answeredBy.find(b => b[0] === e.by) || [])[1] || '')}${e.helper ? ' (' + esc(e.helper) + ')' : ''}</span></div>
    ${show ? `<div class="w-dots">${PARTS.map(p => e.levels && e.levels[p.key] ? `<span class="w-dot w-lv-${e.levels[p.key]}" style="--pc:${p.color}" title="${p.part}: ${esc(LEVEL_NAME[e.levels[p.key]])}">${p.part}<i>${esc(LEVEL_NAME[e.levels[p.key]])}</i></span>` : '').join('')}</div>` : ''}
    ${e.note && (self || sees('answers')) ? `<p class="w-small">${esc(e.note)}</p>` : ''}</li>`;
  const own = ownCheckins(r).slice().reverse(), obs = seenCheckins(r).slice().reverse();
  return `<div class="w-head"><p class="w-eyebrow">${self ? 'Your' : esc(nameOf(t)) + '\'s'} check-ins</p><h2>Past Check-ins</h2></div>
    ${!show ? `<p class="lead">${esc(nameOf(t))} keeps how their tree is doing private.</p>` : ''}
    ${show ? artGrowthHtml(r, t, self) : ''}
    <h3 class="section-title">${self ? 'Your own answers' : 'In their own words'} (${own.length})</h3><ul class="w-histlist">${own.map(row).join('') || '<li class="w-small">None yet.</li>'}</ul>
    ${obs.length ? `<h3 class="section-title">What helpers have seen (${obs.length})</h3><p class="w-small">Kept apart. These never add rings.</p><ul class="w-histlist">${obs.map(row).join('')}</ul>` : ''}
    <div class="btn-row"><button type="button" class="btn btn-secondary" onclick="W.go('today')">Back to Today</button></div>`;
};

/* ---------- printing (Save or print) ---------- */
function printHtml(title, html) {
  const box = $('#w-print'); if (!box) return;
  box.innerHTML = `<div class="w-pr"><p class="w-pr-brand">Willow&trade; by Grow With Grounded</p><h1>${esc(title)}</h1>${html}<p class="w-pr-foot">Kept in Willow, growwithgrounded.com/willow. &copy; ${new Date().getFullYear()} Grow With Grounded LLC.</p></div>`;
  document.body.classList.add('w-printing');
  const done = () => { document.body.classList.remove('w-printing'); window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done);
  setTimeout(() => { window.print(); setTimeout(done, 1500); }, 60);
}
function needProfileHtml(what) {
  return `<div class="w-card w-empty"><p class="w-eyebrow">${esc(what)}</p><h2 class="w-h3">This lives in a locked profile</h2><p>${esc(what)} is personal, so Willow keeps it in the person's own profile, locked with a passcode, on this device.</p><div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.begin()">Begin with Willow</button>${GP() && GGP.list().length ? `<button type="button" class="btn btn-secondary" onclick="W.open()">Open my profile</button>` : ''}</div></div>`;
}
function privateHtml(what) {
  return `<div class="w-card w-empty"><p class="w-eyebrow">${esc(what)}</p><h2 class="w-h3">Kept private</h2><p>${esc(nameOf(target()))} keeps this private for now. That's their choice to make, and Willow honors it. They can change it any time in Settings.</p></div>`;
}

/* ---------- What matters to me ---------- */
const MATTERS = [
  ['who', F.intake.who, 'The work you did, the people you love, what makes you laugh, what you want remembered.'],
  ['good', 'What makes a good day now?', 'Coffee by the window. The grandkids after school. Quiet.'],
  ['joy', 'Small things that bring joy', 'A song, a taste, a smell, the dog on the bed.'],
  ['hope', 'What I\'m hoping for', 'Peace. A visit. One more good day. What comes after.'],
  ['worry', 'What worries me', 'Pain, the people I\'m leaving, the money, what comes after.'],
  ['close', 'Who I want close', 'And who I wish were here.'],
  ['comfort', 'What comforts me', 'Music, readings, prayers, touch, light or dark, a window open.'],
  ['never', 'Anything we should steer clear of', F.intake.neverEx.replace(/"/g, '')]
];
const VIGIL = (C.guide.vigil || []).map((v, i) => ['vigil' + i, v[0], v[1]]);
VIEWS.matters = () => {
  const a = me(); if (!a) return needProfileHtml('What Matters to Me');
  const t = target(), r = rec(t); if (!r || !r.started) return needProfileHtml('What Matters to Me');
  if (!sees('matters')) return privateHtml('What Matters to Me');
  const self = t === a.id, m = r.matters || {}, n = esc(nameOf(t)), role = roleOf(t);
  if (role === 'helper' && self) {
    return `<div class="w-head"><p class="w-eyebrow">What Matters</p><h2>This page belongs to the person you care for</h2><p class="lead">Open their tree to read or add to what matters to them. Helpers write here with them, in their words.</p></div>
      <div class="btn-row">${helped().map(p => `<button type="button" class="btn btn-primary" onclick="W.view('${p.id}');W.go('matters')">${esc(p.name)}'s page</button>`).join('')}</div>`;
  }
  const field = (k, label, ph) => `<div class="w-field"><label class="w-l" for="w-m-${k}">${esc(label)}</label><textarea id="w-m-${k}" rows="3" maxlength="2000" placeholder="${esc(ph)}">${esc(m[k] || '')}</textarea></div>`;
  return `<div class="w-head"><p class="w-eyebrow">${self ? 'In your words' : 'In ' + n + '\'s words'}</p><h2>What Matters to ${self ? 'me' : esc(nameOf(t))}</h2>
    <p class="lead">${self ? 'So the people caring for you know who you are, not just what you have. Write a little or a lot. A helper can type while you talk.' : 'Write it with ' + n + ', in their words. Read it aloud to new nurses, aides, and visitors so they know who they\'re caring for.'}</p></div>
    ${m.updated ? `<p class="w-small">Last changed ${nice(m.updated)}${m.by ? ' by ' + esc(m.by) : ''}.</p>` : ''}
    <div class="w-card"><div class="w-matters">${MATTERS.map(x => field(x[0], x[1], x[2])).join('')}</div>
    <div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.saveMatters()">Save</button><button type="button" class="btn btn-secondary" onclick="W.readMatters()">Read it aloud</button><button type="button" class="btn btn-secondary" onclick="W.printMatters()">Save or Print</button></div></div>
    <p class="w-small">What Matters fills in <button type="button" class="text-btn" onclick="W.go('service')">Service Wishes</button>. How the last days should feel lives in <button type="button" class="text-btn" onclick="W.go('vigil')">Vigil Wishes</button>.</p>`;
};
function saveMatters() {
  const t = target(), r = rec(t); if (!r) return;
  r.matters = r.matters || {};
  MATTERS.concat(VIGIL).forEach(x => { const el = $('#w-m-' + x[0]); if (el) r.matters[x[0]] = el.value.trim(); });
  r.matters.updated = today(); r.matters.by = (me() || {}).name || '';
  persist(t).then(() => { toast('Saved.'); render(); });
}
function mattersBlocks() {
  const r = T(); if (!r) return '';
  const m = r.matters || {};
  return MATTERS.concat(VIGIL).filter(x => m[x[0]]).map(x => `<h3>${esc(x[1])}</h3><p>${esc(m[x[0]]).replace(/\n/g, '<br>')}</p>`).join('') || '<p>Ready when you are.</p>';
}
function readMatters() {
  const R = window.GGRead; const div = document.createElement('div'); div.innerHTML = mattersBlocks();
  if (R && R.read) { const box = $('#w-view'); const tmp = document.createElement('div'); tmp.className = 'w-hidden'; tmp.innerHTML = div.innerHTML; box.appendChild(tmp); R.read(tmp); setTimeout(() => tmp.remove(), 500); }
  else toast('Read aloud isn\'t available in this browser.');
}
function printMatters() { saveMatters(); printHtml('What Matters to ' + (isSelf() ? (me() || {}).name : nameOf(target())), mattersBlocks()); }

/* ---------- Cuttings ---------- */
const CUT_KINDS = [
  ['story', 'A story', 'Tell one story you want remembered.'],
  ['learned', 'Things I learned', 'Three things life taught you, for the people you love.'],
  ['letter', 'A letter to keep', 'To someone, for now or for later.'],
  ['four', 'One of the Four Things', 'Please forgive me. I forgive you. Thank you. I love you.'],
  ['blessing', 'A blessing to leave', 'Words to give someone: for a wedding you won\'t see, a birthday, a hard day.'],
  ['recipe', 'A recipe or a how-to', 'The pie. The fishing spot. How to fix the furnace.']
];
const CUT = {}; CUT_KINDS.forEach(k => { CUT[k[0]] = k; });
VIEWS.cuttings = () => {
  const a = me(); if (!a) return needProfileHtml('Cuttings');
  const t = target(), r = rec(t); if (!r || !r.started) return needProfileHtml('Cuttings');
  if (!sees('cuttings')) return privateHtml('Cuttings');
  const self = t === a.id, n = esc(nameOf(t)), list = (r.cuttings || []).slice().reverse();
  const edit = S.cut ? (S.cut === 'new' ? { kind: S.cutKind || 'story' } : (r.cuttings || []).find(c => c.id === S.cut)) : null;
  let h = `<div class="w-head"><p class="w-eyebrow">Cuttings</p><h2>${self ? 'What I want to leave' : 'What ' + n + ' wants to leave'}</h2>
    <p class="lead">A cutting is a small piece of a tree that can root and grow somewhere new. Stories, letters, lessons, and blessings, kept for the people who stay. ${self ? 'Type them, or have a helper type while you talk.' : 'Type while they talk. Use their words, not yours.'}</p></div>`;
  if (edit) {
    h += `<div class="w-card w-cutedit"><p class="w-eyebrow">${S.cut === 'new' ? 'A new cutting' : 'Edit'}</p>
      <fieldset class="w-fs"><legend>What kind</legend><div class="w-tchips">${CUT_KINDS.map(k => `<button type="button" class="w-tchip" aria-pressed="${edit.kind === k[0]}" onclick="W.cutKind('${k[0]}')">${esc(k[1])}</button>`).join('')}</div></fieldset>
      <p class="w-small">${esc((CUT[edit.kind] || CUT.story)[2])}</p>
      <label class="w-l" for="w-c-title">A title</label><input type="text" id="w-c-title" maxlength="120" value="${esc(edit.title || '')}" placeholder="The summer at the lake">
      <label class="w-l" for="w-c-to">For (optional)</label><input type="text" id="w-c-to" maxlength="120" value="${esc(edit.to || '')}" placeholder="For Emma, on her wedding day">
      <label class="w-l" for="w-c-text">The words</label><textarea id="w-c-text" rows="9" maxlength="20000">${esc(edit.text || '')}</textarea>
      <div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.saveCut()">Save this cutting</button><button type="button" class="btn btn-secondary" onclick="W.S.cut=null;W.render()">Cancel</button></div></div>`;
  } else {
    h += `<div class="w-choices w-choices-3">${CUT_KINDS.map(k => `<button type="button" class="w-choice" onclick="W.newCut('${k[0]}')"><b>${esc(k[1])}</b><span>${esc(k[2])}</span></button>`).join('')}</div>`;
  }
  h += list.length ? `<h3 class="section-title">Kept so far (${list.length})</h3>` + list.map(c => `<article class="w-card w-cut" id="cut-${c.id}" data-read="Read this aloud">
      <p class="w-eyebrow">${esc((CUT[c.kind] || CUT.story)[1])}${c.to ? ' &middot; ' + esc(c.to) : ''}</p>
      <h3>${esc(c.title || 'Untitled')}</h3>
      <div class="w-cuttext">${esc(c.text).replace(/\n/g, '<br>')}</div>
      <p class="w-small">${nice(c.date)}${c.by ? ', written down by ' + esc(c.by) : ''}${c.from === 'sequoia' ? '. From your Legacy Book in Sequoia' : ''}</p>
      <div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="W.printCut('${c.id}')">Save or Print</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.S.cut='${c.id}';W.render()">Edit</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.delCut('${c.id}')">Remove</button></div>
    </article>`).join('') : `<p class="w-small" style="margin-top:18px">Nothing kept yet. One story is enough to start.</p>`;
  return h;
}
function newCut(kind) { S.cut = 'new'; S.cutKind = kind; render(); }
function cutKind(kind) {
  const keep = { title: ($('#w-c-title') || {}).value, to: ($('#w-c-to') || {}).value, text: ($('#w-c-text') || {}).value };
  if (S.cut === 'new') S.cutKind = kind; else { const c = (T().cuttings || []).find(x => x.id === S.cut); if (c) c.kind = kind; }
  render(); if ($('#w-c-title')) { $('#w-c-title').value = keep.title || ''; $('#w-c-to').value = keep.to || ''; $('#w-c-text').value = keep.text || ''; }
}
function saveCut() {
  const t = target(), r = rec(t); if (!r) return;
  const text = $('#w-c-text').value.trim(); if (!text) { toast('Write a few words first.'); return; }
  const o = { title: $('#w-c-title').value.trim(), to: $('#w-c-to').value.trim(), text };
  if (S.cut === 'new') r.cuttings.push(Object.assign({ id: uid(), kind: S.cutKind || 'story', date: today(), by: isSelf() ? '' : (me() || {}).name || '' }, o));
  else { const c = r.cuttings.find(x => x.id === S.cut); if (c) Object.assign(c, o); }
  S.cut = null;
  persist(t).then(() => { render(); toast('Kept.'); });
}
function delCut(id) {
  const t = target(), r = rec(t); if (!r) return;
  if (!confirm('Remove this cutting? This cannot be undone unless you have a backup.')) return;
  r.cuttings = r.cuttings.filter(c => c.id !== id); persist(t).then(render);
}
function printCut(id) {
  const c = (T().cuttings || []).find(x => x.id === id); if (!c) return;
  printHtml(c.title || 'A cutting', `${c.to ? `<p><i>${esc(c.to)}</i></p>` : ''}<div>${esc(c.text).replace(/\n/g, '<br>')}</div><p><small>${esc(nameOf(target()))}, ${longDate(c.date)}</small></p>`);
}

/* ---------- At the bedside ---------- */
const CARD_FIELDS = [['words', 'Words they may use'], ['ask', 'Ask'], ['comfort', 'What may comfort'], ['before', 'Before death'], ['care', 'Care notes'], ['after', 'After death'], ['hard', 'Hard questions'], ['avoid', 'Please avoid'], ['call', 'Who to call'], ['note', 'Good to know']];
const CHRISTIAN = (F.intake.groups.find(g => g[0] === 'christian') || [0, 0, []])[2];
function cardHtml(id, title) {
  const c = F.cards[id]; if (!c) return '';
  return `<article class="w-card w-faithcard" id="faith-${id}" data-read="Read this card aloud">
    <p class="w-eyebrow">${esc(title || 'Tradition card')}</p><h3>${esc(c.name)}</h3>
    ${CARD_FIELDS.filter(f => c[f[0]]).map(f => `<p><b>${f[1]}.</b> ${esc(c[f[0]])}</p>`).join('')}
    <p class="w-end">${esc(F.end)}</p>
  </article>`;
}
const evTag = ev => `<span class="w-ev w-ev-${ev}">${esc(P.evidence[ev] || '')}</span>`;
VIEWS.bedside = () => {
  const a = me(), t = target(), r = t ? rec(t) : null, n = t ? esc(nameOf(t)) : '';
  const person = r && r.started && roleOf(t) === 'person';
  let h = `<div class="w-head"><p class="w-eyebrow">At the bedside</p><h2>What to do when you don't know what to do</h2><p class="lead">A simple, kind word is enough. You only have to stay. These are small, real things families and helpers can do, with how well each one is backed.</p></div>`;
  h += lineHtml();
  if (person && r.faith && (tradsOf(r.faith).length || r.faith.never) && sees('faith')) {
    h += `<h3 class="section-title">${a && t === a.id ? 'Your' : n + '\'s'} faith</h3>`;
    if (r.faith.never) h += `<div class="w-card w-never"><p class="w-eyebrow">Please Keep in Mind</p><p>${esc(r.faith.never)}</p></div>`;
    const ts = tradsOf(r.faith).filter(id => F.cards[id]); // GWG BLD 890: a card for each tradition they chose
    ts.forEach(id => { h += cardHtml(id, (a && t === a.id ? 'Your' : n + '\'s') + ' tradition'); });
  } else if (person && r.matters && r.matters.never && sees('matters')) {
    h += `<div class="w-card w-never"><p class="w-eyebrow">Please Keep in Mind</p><p>${esc(r.matters.never)}</p></div>`;
  }
  h += `<h3 class="section-title">What helps</h3><div class="w-grid" data-read="Read these aloud" data-read-rec>${P.bedside.map(x => `<div class="w-card w-tip"><h4>${esc(x[1])}</h4><p>${esc(x[2])}</p>${evTag(x[3])}${window.GGSources ? GGSources.practice(x[1], 'willow') : ''}</div>`).join('')}</div>`;
  h += `<h3 class="section-title">Care for the one keeping watch</h3><p class="lead">You can't pour from an empty cup, and this cup has been pouring a long time.</p><div class="w-grid" data-read="Read these aloud" data-read-rec>${P.selfcare.map(x => `<div class="w-card w-tip"><h4>${esc(x[1])}</h4><p>${esc(x[2])}</p>${evTag(x[3])}${window.GGSources ? GGSources.practice(x[1], 'willow') : ''}</div>`).join('')}</div>`;
  h += `<h3 class="section-title">Faith at the bedside</h3><div class="w-card" data-read="Read these aloud">${F.rules.map(x => `<p><b>${esc(x[0])}</b> ${esc(x[1])}</p>`).join('')}</div>`;
  h += `<h3 class="section-title">Look up a tradition</h3><p class="lead">For a family with more than one faith, a visitor from another tradition, or just to understand. ${esc(F.end)}</p>
    <label class="w-l" for="w-flook">Tradition</label><select id="w-flook" onchange="W.S.faithLook=this.value;W.render()"><option value="">Choose one</option>${F.intake.groups.map(g => `<optgroup label="${esc(g[1])}">${g[2].filter(id => F.cards[id]).map(id => `<option value="${id}"${S.faithLook === id ? ' selected' : ''}>${esc(F.cards[id].name)}</option>`).join('')}</optgroup>`).join('')}</select>
    ${S.faithLook ? cardHtml(S.faithLook) : ''}`;
  h += `<h3 class="section-title">When faith is complicated</h3>
    <details class="w-det"><summary>When faith has changed</summary><div>${F.changed.map(x => `<p><b>${esc(x[0])}</b> <i>${esc(x[1])}.</i> ${esc(x[2])}</p>`).join('')}<p>${esc(F.home)}</p></div></details>
    <details class="w-det"><summary>Old wounds</summary><div><p>${esc(F.wounds)}</p></div></details>
    <details class="w-det"><summary>Mixed-faith families</summary><div>${F.mixed.map(x => `<p><b>${esc(x[0])}</b> ${esc(x[1])}</p>`).join('')}</div></details>
    <details class="w-det"><summary>Children and faith</summary><div><p>${esc(F.kids)}</p></div></details>
    <p class="w-small">Tradition cards are drafts until a reviewer from each tradition reads them. If something is wrong for your family, trust your family.</p>`;
  h += `<h3 class="section-title">When the time comes</h3><div class="w-card"><p>Gentle helps for the family, kept in Willow: the Farewell Checklist for the first hours and days, Service Wishes, the Obituary, and the Eulogy.</p><div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="W.go('plan')">The Farewell Checklist</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.go('farewell')">Farewell Planning</button></div></div>`;
  return h;
};

/* ---------- Guides: When Life Changes ---------- */
const RING_COLOR = { spirit: 'var(--p-roots)', last: 'var(--p-fruit)' };
function gMatch(g, q) {
  if (!q) return true;
  const hay = (g.title + ' ' + g.keys + ' ' + g.parts.map(p => p[1]).join(' ')).toLowerCase().replace(/[’']/g, '');
  return q.toLowerCase().replace(/[’']/g, '').split(/[^a-z0-9]+/).filter(Boolean).every(w => hay.includes(w));
}
VIEWS.guides = () => {
  const st = S.guide;
  if (st.open) { const g = G.guides.find(x => x.id === st.open); if (g) return guideHtml(g); st.open = null; }
  let h = `<div class="lc-head"><p class="eyebrow">When Life Changes</p><h2 class="section-title" style="margin-top:4px">Words for the hardest conversations</h2>
    <p class="lead"><b>How to show up.</b> What's happening, what to say, words to set aside, and what helps. For families, and for the chaplains and doulas who sit with them.</p>
    <p class="w-small">${icon('play', 16)} Every guide has two short videos, narrated aloud: For You, and For the Helper. Open any guide below to watch them.</p>
    <p class="w-tool">${esc(G.tool)}</p></div>
    <input class="lc-search" type="search" placeholder="Search: miracle, hell, burden, not eating, kids..." aria-label="Search the guides" value="${esc(st.find || '')}" oninput="W.gFind(this)" enterkeyhint="search">
    <div class="lc-chips" role="group" aria-label="Filter">
      <button class="lc-chip" style="--rc:var(--ink-soft)" aria-pressed="${st.ring === 'all'}" onclick="W.gRing('all')">All</button>
      ${G.rings.map(r => `<button class="lc-chip" style="--rc:${RING_COLOR[r[0]]}" aria-pressed="${st.ring === r[0]}" onclick="W.gRing('${r[0]}')">${esc(r[1])}</button>`).join('')}
    </div><div id="w-glist">${gListHtml()}</div>
    <p class="lc-note">Worried? Call your hospice's 24/7 line first, day or night. These guides offer spiritual and emotional support alongside your hospice team. For medical, therapy, or legal questions, turn to your hospice nurse, your doctor, a therapist, or a lawyer.</p>`;
  return h;
};
/* When Life Changes as Cards (GWG BLD 790): with no search and All chosen, one card per group; a card is the same
   as its chip, and All Groups returns. The readings list does the same with a card for each tradition. */
const RING_BLURB = { spirit: 'Faith, hope, forgiveness, and family: words for what the heart carries near the end.', last: 'What the last days can look like, what helps at the bedside, and the first hours and days after.' };
const nGuides = n => n + (n === 1 ? ' guide' : ' guides');
function wStyle() {
  if (document.getElementById('w-lc790')) return;
  const st = document.createElement('style'); st.id = 'w-lc790';
  st.textContent = `.w-groups{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:22px;}
.w-groups.w-groups-3{grid-template-columns:repeat(3,minmax(0,1fr));}
@media (max-width:900px){.w-groups.w-groups-3{grid-template-columns:repeat(2,minmax(0,1fr));}}@media (max-width:600px){.w-groups,.w-groups.w-groups-3{grid-template-columns:1fr;}}
button.w-group{text-align:left;font:inherit;color:var(--ink);cursor:pointer;border-top-width:1px;border-left:7px solid var(--rc);min-width:0;}
button.w-group:hover{border-color:var(--rc);}
button.w-group:focus-visible{outline:3px solid var(--gold);outline-offset:3px;}
button.w-group h4{overflow-wrap:anywhere;}
button.w-group .w-small{margin:0;}
.w-group-n{margin-top:auto;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:14px;letter-spacing:1px;text-transform:uppercase;color:var(--ink);}
.w-group-n i{display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--rc);margin-right:8px;}
.w-allg{margin:20px 0 0;}
.lc-cbtns{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto;}
.lc-card .lc-cbtns .btn{margin-top:0;}`;
  document.head.appendChild(st);
}
function gGroupsHtml() {
  return `<div class="w-groups" role="list">${G.rings.map(r => { const n = G.guides.filter(g => g.ring === r[0]).length; if (!n) return '';
    return `<div role="listitem" style="display:flex;min-width:0"><button type="button" class="lc-card w-group" style="--rc:${RING_COLOR[r[0]]};flex:1" onclick="W.gRing('${r[0]}',1)" aria-label="${esc(r[1])}, ${nGuides(n)}"><h4>${esc(r[1])}</h4><p class="w-small">${esc(RING_BLURB[r[0]] || '')}</p><span class="w-group-n"><i></i>${nGuides(n)}</span></button></div>`; }).join('')}</div>`;
}
const oneLine = (t, max) => { const x = String(t || '').trim(), m = x.match(/^.*?[.!?](\s|$)/), f = (m ? m[0] : x).trim(); return f.length > (max || 150) ? f.slice(0, (max || 150) - 1).replace(/\s+\S*$/, '') + '...' : f; };
function gListHtml() {
  const st = S.guide; let h = '', n = 0;
  wStyle();
  if (st.ring === 'all' && !st.q) return gGroupsHtml();
  G.rings.filter(r => st.q || st.ring === r[0]).forEach(r => {
    const gs = G.guides.filter(g => g.ring === r[0] && gMatch(g, st.q)); if (!gs.length) return; n += gs.length;
    h += `<div class="lc-ring" style="--rc:${RING_COLOR[r[0]]}"><h3><i></i>${esc(r[1])}</h3>${RING_BLURB[r[0]] ? `<p>${esc(RING_BLURB[r[0]])}</p>` : ''}<div class="lc-grid">${gs.map(g => {
      const first = g.parts.find(p => p[0] === 'what') || g.parts[0], tl = esc(g.title);
      return `<article class="lc-card" style="--rc:${RING_COLOR[r[0]]}"><span class="lc-label">${esc(r[1])}</span><h4>${tl}</h4><p class="w-small">${esc(oneLine(first[1]))}</p><div class="lc-cbtns"><button type="button" class="btn btn-primary btn-sm" onclick="W.guide('${g.id}')" aria-label="Read: ${tl}">Read</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.watch('${g.id}','you')" aria-label="Watch For You: ${tl}">${icon('play', 16)} For You</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.watch('${g.id}','helper')" aria-label="Watch For the Helper: ${tl}">${icon('play', 16)} For the Helper</button></div></article>`;
    }).join('')}</div></div>`;
  });
  const back = st.q ? '' : `<button type="button" class="lc-back w-allg no-print" id="w-allg" onclick="W.gRing('all',2)">All Groups</button>`;
  return back + (n ? h : `<div class="lc-none"><p>No guides match "${esc(st.q)}." Try another word.</p></div>`);
}
// A group card or chip: from a card, focus moves to All Groups; from All Groups, back to that card.
function gRing(k, from) {
  const was = S.guide.ring; S.guide.ring = k || 'all'; render();
  const x = from === 1 ? $('#w-allg') : from === 2 ? document.querySelector('.w-group[onclick*="\'' + was + '\'"]') : null;
  if (x) x.focus();
}
function gList() { const b = $('#w-glist'); if (b) b.innerHTML = gListHtml(); }
/* Search: the same engine as the header search. Willow's guides first, then the rest of Grow With Grounded. */
function gFind(el) {
  S.guide.q = ''; S.guide.find = el.value;
  if (!window.GGFind) return;
  GGFind(el, { here: 'willow', localType: 'talk', open: id => openGuide(id), openLabel: 'Open the guide',
    hide: ['#w-glist', '.lc-chips'], accent: 'var(--btn-ink)' });
}
function guideHtml(g) {
  const ring = G.rings.find(r => r[0] === g.ring), rc = RING_COLOR[g.ring];
  const body = g.parts.filter(p => p[0] !== 'pro').map(p => p[0] === 'say' ? `<h3>${esc(G.labels[p[0]])}</h3><div class="lc-say"><p>${esc(p[1])}</p></div>` : p[0] === 'dont' ? `<h3>${esc(G.labels[p[0]])}</h3><div class="lc-reach"><p>${esc(p[1])}</p></div>` : `<h3>${esc(G.labels[p[0]] || p[0])}</h3><p>${esc(p[1])}</p>`).join('');
  const pro = g.parts.find(p => p[0] === 'pro');
  return `<article class="lc-article" id="w-guide" style="--rc:${rc}">
    <div class="btn-row no-print" style="justify-content:space-between;align-items:center;margin:0 0 12px"><button class="lc-back" onclick="W.closeGuide()">Back to all guides</button><button class="btn btn-secondary" onclick="W.printGuide('${g.id}')">Save or Print This Guide</button></div>
    <span class="lc-tag">${esc(ring ? ring[1] : '')}</span><h2>${esc(g.title)}</h2>
    ${guideVids(g.id)}
    <div data-read="Read this guide aloud" data-read-rec>${body}</div>
    ${pro ? `<details class="w-det"><summary>${esc(G.labels.pro)}</summary><div><p>${esc(pro[1])}</p></div></details>` : ''}
    ${g.story ? `<h3>A Grounded story</h3><p><a class="text-link" href="${storyUrl(g.story)}" target="_blank" rel="noopener">${esc(g.story)}</a></p>` : ''}
    ${window.GGShelf ? GGShelf.html('willow', g.id) : ''}
    ${window.GGSources ? GGSources.html('willow:' + g.id) : ''}
    <p class="lc-note">${esc(G.foot)} From Willow&trade; by Grow With Grounded. General spiritual and emotional support. For medical care, therapy, or legal advice, see a licensed professional. &copy; ${new Date().getFullYear()} Grow With Grounded LLC.</p>
  </article>`;
}
function openGuide(id) { const fromList = S.tab === 'guides' && !S.guide.open; S.guide.open = id; S.tab = 'guides'; render(); scrollTop(true); pushHash(fromList ? { wList: 1 } : null); }
// Back to all guides: when the guide was opened from the list, step back in history so Back and this button agree.
function closeGuide() { if (history.state && history.state.wList && S.guide.open) { history.back(); return; } S.guide.open = null; render(); scrollTop(true); pushHash(); }
/* When Life Changes videos (Build B1, October 2026): two per guide, played by shared/gg-learn.js from willow/guide-videos.js.
   A quiet check shows once a video has been watched (kept inside the unlocked profile's vault by gg-learn.js, BLD 756). */
function vidWatched(id) { try { return !!(window.GGLearn && GGLearn.watched && GGLearn.watched('willow', id)); } catch (e) { return false; } }
function guideVids(gid) {
  const b = (side, name, cls) => { const id = 'wl-g-' + gid + '-' + side, w = vidWatched(id);
    return `<button type="button" class="btn ${cls} w-gv-btn" onclick="W.watch('${gid}','${side}')">${icon(w ? 'check' : 'play', 18)} Watch: ${name}${w ? '<span class="w-gv-w">Watched</span>' : ''}</button>`; };
  return `<div class="w-gv no-print"><div class="btn-row">${b('you', 'For You', 'btn-primary')}${b('helper', 'For the Helper', 'btn-secondary')}</div>
    <p class="w-small">For You, if this is what you're facing. For the Helper, if you're walking beside someone who is. A few minutes each, narrated aloud.</p></div>`;
}
function watchGuide(gid, side) { if (window.GGLearn) GGLearn.open('willow', 'wl-g-' + gid + '-' + side, { from: 'guide' }); }
// gg-learn's Open the Full Guide button lands here.
window.GG_GUIDE_OPEN = window.GG_GUIDE_OPEN || {};
window.GG_GUIDE_OPEN.willow = id => { if (G.guides.some(g => g.id === id)) openGuide(id); };
['gg-learn-close', 'gg-learn-marks'].forEach(ev => window.addEventListener(ev, () => { if (S.tab === 'guides' && S.guide.open) { const y = window.scrollY; render(); window.scrollTo(0, y); } }));
// Save or Print This Guide (BLD 788): the share sheet with a real PDF (shared/gg-pdf.js), Print as the backup.
function printGuide(id) {
  const g = G.guides.find(x => x.id === id); if (!g) return;
  const html = g.parts.map(p => `<h3>${esc(G.labels[p[0]] || p[0])}</h3><p>${esc(p[1])}</p>`).join('') + `<p>${esc(G.foot)}</p>` + (window.GGSources ? GGSources.html('willow:' + g.id) : '');
  const now = () => printHtml(g.title, html);
  if (!window.GGApp || !window.ggPdfFromHTML) { now(); return; }
  GGApp.sheet({ title: g.title, file: 'willow-' + g.id + '.pdf', print: now,
    blocks: () => ggPdfFromHTML(`<h1>${esc(g.title)}</h1>` + html, { eyebrow: 'Willow by Grow With Grounded', foot: 'Willow(TM) by Grow With Grounded. growwithgrounded.com/willow' }) });
}

/* ---------- Readings ---------- */
const RIGHTS = { pd: 'Public domain', grounded: 'Written for Willow', plain: 'In plain English' };
function myTrads() {
  const r = target() ? rec(target()) : null, f = r && r.faith, out = ['all'];
  if (f && sees('faith')) tradsOf(f).forEach(t => { if (!out.includes(t)) out.push(t); if (CHRISTIAN.includes(t) && !out.includes('christian')) out.push('christian'); });
  return out;
}
function readFilt(trad, q, mine) { return x => (trad === 'every' || (trad === 'mine' ? x.trad.some(t => mine.includes(t)) : x.trad.includes(trad) || (trad !== 'all' && CHRISTIAN.includes(trad) && x.trad.includes('christian')))) && (!q || (x.title + ' ' + x.by + ' ' + x.lines.join(' ')).toLowerCase().includes(q.toLowerCase())); }
// The readings All view (BLD 790): a card for each tradition the Tradition list offers, the same as choosing it there.
function readGroupsHtml(opts) {
  const grp = id => id === 'all' ? 'Every Tradition' : ((F.intake.groups.find(g => g[2].includes(id)) || [0, ''])[1]);
  return `<div class="w-groups w-groups-3" role="list">${opts.map(o => { const rs = RD.readings.filter(readFilt(o[0], '')), n = rs.length; if (!n) return '';
    const own = rs.filter(x => x.trad.includes(o[0])).concat(rs.filter(x => !x.trad.includes(o[0]))).slice(0, 2).map(x => x.title);
    return `<div role="listitem" style="display:flex;min-width:0"><button type="button" class="lc-card w-group" style="--rc:var(--gold);flex:1" onclick="W.rTrad('${o[0]}',1)" aria-label="${esc(o[1])}, ${n} ${n === 1 ? 'reading' : 'readings'}"><span class="lc-label">${esc(grp(o[0]))}</span><h4>${esc(o[1])}</h4><p class="w-small">${esc(own.join(', '))}${n > 2 ? ', and more' : ''}.</p><span class="w-group-n"><i></i>${n} ${n === 1 ? 'reading' : 'readings'}</span></button></div>`; }).join('')}</div>`;
}
function rTrad(k, from) {
  const was = S.read.trad; S.read.trad = k || 'every'; render();
  const x = from === 1 ? $('#w-rallg') : from === 2 ? document.querySelector('.w-group[onclick*="\'' + was + '\'"]') : null;
  if (x) x.focus();
}
VIEWS.readings = () => {
  const st = S.read;
  if (st.open) { const x = RD.readings.find(y => y.id === st.open); if (x) return readingHtml(x); const lid = st.open; st.open = null; if (window.GGReadings) setTimeout(() => openLib({ id: lid }), 0); }
  const mine = myTrads(), hasMine = mine.length > 1;
  if (st.trad === 'mine' && !hasMine) st.trad = 'every';
  const filt = readFilt(st.trad, st.q, mine);
  const list = RD.readings.filter(filt);
  wStyle();
  const tradOpts = [['every', 'Every reading'], ['all', 'For every tradition and in-between']].concat(F.intake.groups.flatMap(g => g[2].filter(id => RD.readings.some(x => x.trad.includes(id))).map(id => [id, faithName(id)])));
  return `<div class="lc-head"><p class="eyebrow">Readings</p><h2 class="section-title" style="margin-top:4px">Words to read aloud</h2>
    <p class="lead">Psalms, prayers, poems, and blessings for all faith traditions and everything in-between. Read slowly. Read it twice. Hearing is often the last sense to go.</p></div>
    ${window.GGReadings ? `<div class="w-card w-libcard no-print"><p class="w-eyebrow">Readings Library</p><p>Many more prayers, blessings, poems, hymns, songs, and stories, from every tradition and the churches and schools within each one, many with Listen.</p><div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="W.lib()">Open the Library</button></div></div>` : ''}
    <div class="w-readfilter">${hasMine ? `<button class="lc-chip" style="--rc:var(--gold)" aria-pressed="${st.trad === 'mine'}" onclick="W.S.read.trad='mine';W.render()">${isSelf() ? 'For me' : 'For ' + esc(nameOf(target()))}</button>` : ''}
      <label class="w-l w-inline" for="w-rtrad">Tradition</label><select id="w-rtrad" onchange="W.S.read.trad=this.value;W.render()">${tradOpts.map(o => `<option value="${o[0]}"${st.trad === o[0] ? ' selected' : ''}>${esc(o[1])}</option>`).join('')}</select></div>
    <input class="lc-search" type="search" placeholder="Search: shepherd, peace, river, home..." aria-label="Search the readings" value="${esc(st.q)}" onchange="W.S.read.q=this.value;W.render()">
    ${st.trad === 'every' && !st.q ? readGroupsHtml(tradOpts.slice(1)) : `${st.q || st.trad === 'mine' ? '' : `<button type="button" class="lc-back w-allg no-print" id="w-rallg" onclick="W.rTrad('every',2)">All Groups</button><h3 class="section-title">${esc((tradOpts.find(o => o[0] === st.trad) || [0, ''])[1])}</h3>`}<div class="w-readlist">${list.map(x => `<button type="button" class="w-reading" onclick="W.reading('${x.id}')"><b>${esc(x.title)}</b><span>${esc(x.by)}</span><i>${esc(RIGHTS[x.rights] || '')}</i></button>`).join('') || '<p class="w-small">No readings match. Try another word or tradition.</p>'}</div>${st.q && window.GGReadings ? `<div class="btn-row no-print"><button type="button" class="btn btn-secondary btn-sm" onclick="W.lib(W.S.read.q)">Search the Readings Library</button></div>` : ''}`}
    <h3 class="section-title">Songs families often ask for</h3><p>${RD.songs.map(esc).join(', ')}. Play a recording the family loves, or sing it. Off key counts.</p>
    <h3 class="section-title">Beloved writing to find in print</h3><p class="lead">Still under copyright, so Willow names them and you can find them in the book or online.</p>
    <ul class="w-linked">${RD.linked.map(l => `<li><b>${esc(l[0])}</b>, ${esc(l[1])}. In <i>${esc(l[2])}</i>. <span class="w-small">${esc(l[3])}</span></li>`).join('')}</ul>
    <h3 class="section-title">Words that stay with their people</h3><p class="lead">${esc(RD.rites)}</p>
    <ul class="w-linked">${RD.kept.map(k => `<li><b>${esc(k[0])}.</b> ${esc(k[1])}</li>`).join('')}</ul>`;
};
// Bible versions (GWG BLD 748, 749): KJV, NKJV, ESV for the passages that have them, shown only while
// readings.js turns the switch on. KJV is always the text in x.lines. The switch lists the versions in
// readings.js BIBLE, so a saved choice that is no longer offered (NIV) shows KJV.
function verOf(x) { const vs = RD.versionsOn && RD.versions && RD.versions[x.id]; const v = vs && S.read.ver; return v && vs[v] ? v : 'kjv'; }
function linesOf(x) { const v = verOf(x); return v === 'kjv' ? x.lines : RD.versions[x.id][v]; }
function byOf(x) { const v = verOf(x); return v === 'kjv' ? x.by : (RD.bible[v] || {}).name || x.by; }
function noticeOf(x) { const v = verOf(x); return v === 'kjv' ? '' : (RD.bible[v] || {}).notice || ''; }
function setVer(v) { S.read.ver = v; render(); }
// Listen (GWG BLD 784): Brian reads the public domain texts, the King James Version, and Grounded's own words aloud,
// one recorded clip per line (shared/gg-listen.js, public v1 clips). Scripture: only while KJV is showing.
const VOICED = ['pd', 'grounded', 'plain'];
const voiced = x => VOICED.includes(x.rights) && verOf(x) === 'kjv' && !!window.GGListen;
function readingHtml(x) {
  let body = '';
  const lv = voiced(x), listen = lv ? GGListen.html({id: 'w:' + x.id, lines: x.lines}) : '';
  // refs (GWG BLD 787): where each line comes from (Julian's chapters), in small type after it.
  const ref = (l, i) => x.refs && x.refs[i] && l === x.lines[i] ? ` <small class="w-small">${esc(x.refs[i])}</small>` : '';
  if (listen) GGListen.linesOf(x.lines).forEach((l, i) => { body += l === '' ? '<br>' : `<p data-ggl-ln="${i}">${esc(l)}${ref(l, i)}</p>`; });
  else linesOf(x).forEach((l, i) => { body += l === '' ? '<br>' : `<p>${esc(l)}${ref(l, i)}</p>`; });
  // From Chris's Shelf (GWG BLD 787): a reading may carry a breath prayer, its own Learn video, and a Sources line.
  const bp = x.breath ? `<section class="w-breath" style="margin-top:18px"><h3>${esc(x.breath.title || 'A Breath Prayer')}</h3><p class="w-readtext"><i>Breathe in:</i> ${esc(x.breath.in)}<br><i>Breathe out:</i> ${esc(x.breath.out)}</p>${x.breath.how ? `<p>${esc(x.breath.how)}</p>` : ''}</section>` : '';
  const vid = x.video && window.GGLearn ? `<div class="btn-row no-print" style="margin:8px 0 12px"><button type="button" class="btn btn-primary" onclick="GGLearn.open('willow','${esc(x.video)}')">&#9654; Watch the Video</button></div>` : '';
  const src = Array.isArray(x.sources) && x.sources.length && window.GGSources ? GGSources.line(x.sources) : '';
  const vs = RD.versionsOn && RD.versions && RD.versions[x.id], v = verOf(x), note = noticeOf(x);
  const sw = vs ? `<div class="btn-row no-print" role="group" aria-label="Bible version" style="margin:4px 0 12px">${Object.keys(RD.bible).filter(k => k === 'kjv' || vs[k]).map(k => [k, RD.bible[k].short || k.toUpperCase()]).map(o => `<button type="button" class="lc-chip" style="--rc:var(--gold)" aria-pressed="${v === o[0]}" title="${esc(o[0] === 'kjv' ? 'King James Version' : (RD.bible[o[0]] || {}).name || '')}" onclick="W.bibleVer('${o[0]}')">${o[1]}</button>`).join('')}</div>` : '';
  return `<article class="lc-article w-readingview" style="--rc:var(--gold)">
    <div class="btn-row no-print" style="justify-content:space-between;align-items:center;margin:0 0 12px"><button class="lc-back" onclick="W.closeReading()">Back to readings</button><button class="btn btn-secondary" onclick="W.printReading('${x.id}')">Save or Print</button></div>
    <h2>${esc(x.title)}</h2><p class="w-small">${esc(byOf(x))} &middot; ${esc(v === 'kjv' ? RIGHTS[x.rights] || '' : 'Used by permission')}</p>${sw}${listen}
    ${vid}<div class="w-readtext" data-read="Read this aloud"${listen ? ` data-ggl-text="w:${esc(x.id)}"` : ''}>${x.tr ? `<p class="w-tr">${esc(x.tr)}</p>` : ''}${body}</div>
    ${bp}${note ? `<p class="w-small w-notice">${esc(note)}</p>` : ''}${src}
  </article>`;
}
// The Readings Library (GWG BLD 798, shared/gg-readings.js) opens in a window over Willow, starting with this
// person's tradition when Willow knows it. Willow's own readings and their ids stay here, as before.
function openLib(o) {
  if (!window.GGReadings) return;
  o = typeof o === 'string' ? { q: o } : (o || {});
  if (!o.q && !o.id && !o.trad) { const t = myTrads().find(x => x !== 'all' && x !== 'christian' && GGReadings.labels.trad[x]); if (t) o.trad = t; }
  GGReadings.open(o);
}
function openReading(id) { const fromList = S.tab === 'readings' && !S.read.open; S.read.open = id; S.tab = 'readings'; render(); scrollTop(true); pushHash(fromList ? { wList: 1 } : null); }
function closeReading() { if (history.state && history.state.wList && S.read.open) { history.back(); return; } S.read.open = null; render(); scrollTop(true); pushHash(); }
function printReading(id) {
  const x = RD.readings.find(y => y.id === id); if (!x) return;
  const note = noticeOf(x);
  const bp = x.breath ? `<h3>${esc(x.breath.title || 'A Breath Prayer')}</h3><p><i>Breathe in:</i> ${esc(x.breath.in)}<br><i>Breathe out:</i> ${esc(x.breath.out)}</p>` : '';
  printHtml(x.title, (x.tr ? `<p><i>${esc(x.tr)}</i></p>` : '') + linesOf(x).map(l => l ? `<p>${esc(l)}</p>` : '<br>').join('') + `<p><small>${esc(byOf(x))}</small></p>` + bp + (note ? `<p><small>${esc(note)}</small></p>` : ''));
}

/* ---------- the Willow Hub (GWG BLD 971) ----------
   Six tabs in The Grounded Way's look: Today, Wishes, Stories, Bedside, Farewell, Learn. Each tab has its own page with
   painted cards, and its pages sit in a row of chips. Write once, use everywhere: Cuttings fill the Eulogy's stories and the
   Legacy Book, What Matters fills Service Wishes, and Life Facts fill the Obituary and the Eulogy. Everything saves in the
   person's own locked profile (rec.farewell), and nothing leaves this device until someone taps Send. Wording: willow/farewell.js. */
const FW = window.WILLOW_FAREWELL;
const TABS = FW.tabs;
const artSrc = (n, kind) => '/shared/heroes/p/willow-' + n + '-' + kind + '.webp';
const HUBS = TABS.map(t => t[0]).filter(k => FW.hub[k]);
function theadHtml(v) {
  const h = FW.heads[v], a = FW.art[v]; if (!h || !a) return '';
  const hub = HUBS.includes(v) || v === 'bedside';
  return `<header class="w-thero${hub ? '' : ' sub'}"><picture><source media="(max-width:700px)" srcset="${artSrc(a[0], hub ? 'narrow' : 'card')}"><img src="${artSrc(a[0], hub ? 'wide' : 'card')}" alt="${esc(a[1])}" width="1600" height="900"></picture>
    <div class="tx"><p class="w-eyebrow">${esc(h[0])}</p><h2>${esc(h[1])}</h2><p>${esc(h[2])}</p></div></header>`;
}
function subHtml(v) {
  const T = TABS.find(t => t[0] === TAB_OF[v]); if (!T || !T[3].length) return '';
  return `<nav class="w-sub no-print" aria-label="${esc(T[1])}">${T[3].map(p => `<button type="button" class="w-subb" aria-pressed="${p[0] === v}" onclick="W.go('${p[0]}')">${esc(p[1])}</button>`).join('')}${T[0] === 'learn' ? `<button type="button" class="w-subb" onclick="window.GGLearn&&GGLearn.open('willow')">Learn Videos</button>` : ''}</nav>`;
}
// The top of a page: the painted head, then the chips (a guide or a reading that is open keeps only the chips).
function topOf(v) {
  if (!FW.heads[v]) return '';
  if ((v === 'guides' && S.guide.open) || (v === 'readings' && S.read.open)) return subHtml(v);
  return theadHtml(v) + subHtml(v);
}
function hubHtml(tab) {
  return `<div class="w-hub">${(FW.hub[tab] || []).map(c => {
    const a = FW.art[c[0]] || FW.art[tab], go = c[0] === 'videos' ? `window.GGLearn&&GGLearn.open('willow')` : `W.go('${c[0]}')`, st = hubStatus(c[0]);
    return `<button type="button" class="w-pc" onclick="${go}"><img src="${artSrc(a[0], 'card')}" alt="" width="800" height="450" loading="lazy"><span class="tx"><b>${esc(c[1])}</b><span>${esc(c[2])}</span>${st ? `<i>${esc(st)}</i>` : ''}</span></button>`;
  }).join('')}</div>`;
}
// A short line on a card: how far along each piece is.
function hubStatus(k) {
  const t = target(), r = t ? rec(t) : null; if (!r || !r.started) return '';
  const f = fwOf(r), m = r.matters || {};
  if (k === 'matters') { const n = MATTERS.filter(x => m[x[0]]).length; return n ? n + ' of ' + MATTERS.length + ' written' : ''; }
  if (k === 'vigil') { const n = VIGIL.filter(x => m[x[0]]).length; return n ? n + ' of ' + VIGIL.length + ' written' : ''; }
  if (k === 'faithpage') return r.faith && sees('faith') ? 'Answered' : '';
  if (k === 'service') { const n = Object.keys(f.wishes).filter(x => wishFilled(f.wishes[x])).length; return n ? n + (n === 1 ? ' wish' : ' wishes') + ' written' : ''; }
  if (k === 'cuttings' || k === 'legacy') { const n = (r.cuttings || []).length; return n ? n + (n === 1 ? ' Cutting' : ' Cuttings') + ' kept' : ''; }
  if (k === 'plan') { const all = FW.checklist.secs.reduce((s, x) => s + x.items.length, 0), n = Object.keys(f.plan.c).length; return n ? n + ' of ' + all + ' done' : ''; }
  if (k === 'obituary') return FW.obituary.shapes.some(s => String(f.obit.d[s.id] || '').trim()) ? 'Drafts ready' : '';
  if (k === 'eulogy') return String(f.eulogy.d || '').trim() ? 'Outline ready' : '';
  if (k === 'send') return f.sent.length ? 'Last sent ' + nice(f.sent[f.sent.length - 1].d) : '';
  return '';
}
const wishFilled = v => Array.isArray(v) ? v.length > 0 : !!String(v || '').trim();

/* the person's farewell record, inside their locked Willow */
function fwOf(r) {
  r.farewell = r.farewell || {}; const f = r.farewell;
  f.facts = f.facts || {}; f.wishes = f.wishes || {}; f.plan = f.plan || {}; f.plan.c = f.plan.c || {};
  f.obit = f.obit || {}; f.obit.a = f.obit.a || {}; f.obit.d = f.obit.d || {}; f.obit.e = f.obit.e || {};
  f.eulogy = f.eulogy || {}; f.eulogy.a = f.eulogy.a || {}; f.eulogy.d = f.eulogy.d || ''; f.sent = f.sent || []; f.send = f.send || {};
  return f;
}
// Everything on the Farewell and Wishes pages saves itself a moment after typing stops.
let FW_T = null;
function fwKeep() { const t = target(); clearTimeout(FW_T); FW_T = setTimeout(() => { persist(t); }, 500); }
function fwSet(path, v) {
  const r = T(); if (!r) return; const f = fwOf(r), p = path.split('.'); let o = f;
  for (let i = 0; i < p.length - 1; i++) { o[p[i]] = o[p[i]] || {}; o = o[p[i]]; }
  o[p[p.length - 1]] = v; fwKeep();
}
function fwIn(el) {
  fwSet(el.dataset.k, el.value);
  const k = el.dataset.k;
  if (k.startsWith('obit.d.')) { const id = k.split('.')[2]; fwSet('obit.e.' + id, 1); const sh = FW.obituary.shapes.find(s => s.id === id), c = $('#w-on-' + id); if (sh && c) c.outerHTML = obCount(sh, el.value); }
  if (k === 'eulogy.d') { fwSet('eulogy.edited', true); const c = $('#w-eu-time'); if (c) c.textContent = euTime(el.value); }
  const n = el.parentNode && el.parentNode.querySelector('.w-fill'); if (n) n.remove();
  if (k.startsWith('send.')) { const t = $('#w-send-text'); if (t) t.value = sendText(sendData()); }
}
function fwPick(el) {
  const k = el.dataset.c, r = T(); if (!r) return; const f = fwOf(r);
  if (el.type === 'radio') f.wishes[k] = el.value;
  else { const v = (Array.isArray(f.wishes[k]) ? f.wishes[k] : []).filter(x => x !== el.value); if (el.checked) v.push(el.value); f.wishes[k] = v; }
  fwKeep();
}
// Who may open the Farewell pages: the person, and helpers when the person shares Farewell plans.
function fwGate(what, share, pages) {
  const more = pages === false ? '' : fwPages();
  const a = me(); if (!a) return needProfileHtml(what) + more;
  const t = target(), r = rec(t); if (!r || !r.started) return needProfileHtml(what) + more;
  if (roleOf(t) === 'helper' && t === a.id) return `<div class="w-card"><p class="w-eyebrow">${esc(what)}</p><h2 class="w-h3">This belongs to the person you care for</h2><p>Open their Willow to plan together, in their words.</p><div class="btn-row">${helped().map(p => `<button type="button" class="btn btn-primary" onclick="W.view('${p.id}');W.go('${S.tab}')">${esc(p.name)}'s ${esc(what)}</button>`).join('')}</div></div>`;
  if (share && !sees(share)) return privateHtml(what);
  return '';
}
const fwPages = () => `<p class="w-small" style="margin-top:-6px">Starting without a profile? <a class="text-link" href="/planning-a-farewell.html">Planning a Farewell</a>, the <a class="text-link" href="/obituary-helper.html">Obituary Helper</a>, and the <a class="text-link" href="/eulogy-helper.html">Eulogy Helper</a> also keep your words on this device.</p>`;
const sourcesLine = L => `<p class="w-sources">Sources: ${L.map(x => `<a href="${esc(x[1])}" target="_blank" rel="noopener">${esc(x[0])}</a>`).join('; ')}.</p>`;
function fField(k, kind, label, hint, ph, val, fill, full) {
  const id = 'w-fw-' + k.replace(/\./g, '-');
  return `<label class="w-f${full || kind === 'a' ? ' full' : ''}" for="${id}"><span class="l">${esc(label)}</span>${hint ? `<span class="h">${esc(hint)}</span>` : ''}${kind === 'a'
    ? `<textarea id="${id}" data-k="${k}" rows="3" maxlength="6000" oninput="W.fwIn(this)"${ph ? ` placeholder="${esc(ph)}"` : ''}>${esc(val)}</textarea>`
    : `<input type="text" id="${id}" data-k="${k}" maxlength="300" oninput="W.fwIn(this)" value="${esc(val)}"${ph ? ` placeholder="${esc(ph)}"` : ''}>`}${fill ? `<span class="w-fill">${esc(fill)}</span>` : ''}</label>`;
}
// A value, or what another page offers when this one is still empty (never written over what someone typed).
const orFrom = (o, k, from) => o[k] == null ? (from || '') : o[k];
const PRON = { he: { they: 'he', them: 'him', their: 'his' }, she: { they: 'she', them: 'her', their: 'her' }, they: { they: 'they', them: 'them', their: 'their' } };
const pronOf = f => PRON[f.facts.pron] ? f.facts.pron : 'they';
const pronSel = f => `<label class="w-f" for="w-fw-pron"><span class="l">Words for them</span><select id="w-fw-pron" onchange="W.fwPron(this.value)">${[['he', 'He, him, his'], ['she', 'She, her, hers'], ['they', 'They, them, their']].map(o => `<option value="${o[0]}"${pronOf(f) === o[0] ? ' selected' : ''}>${o[1]}</option>`).join('')}</select></label>`;
function fwPron(v) { fwSet('facts.pron', v); render(); }

/* ---------- Wishes ---------- */
VIEWS.wishes = () => {
  const g = fwGate('Wishes', 'matters', false);
  return hubHtml('wishes') + (g || `<div class="w-card"><p class="w-eyebrow">${icon('heart', 16)} Write once, use everywhere</p><p>What Matters fills in Service Wishes, and Service Wishes travel with the farewell plans. Helpers read What Matters aloud to new nurses, aides, and visitors.</p></div>`);
};
VIEWS.vigil = () => {
  const a = me(); if (!a) return needProfileHtml('Vigil Wishes');
  const t = target(), r = rec(t); if (!r || !r.started) return needProfileHtml('Vigil Wishes');
  if (!sees('matters')) return privateHtml('Vigil Wishes');
  const m = r.matters || {};
  return `<div class="w-head"><p class="lead">Some people like to say how they want the last days to feel. Skip anything that doesn't fit, and change it any time.</p></div>
    <div class="w-card"><div class="w-matters">${VIGIL.map(x => `<div class="w-field"><label class="w-l" for="w-m-${x[0]}">${esc(x[1])}</label><textarea id="w-m-${x[0]}" rows="3" maxlength="2000" placeholder="${esc(x[2])}">${esc(m[x[0]] || '')}</textarea></div>`).join('')}</div>
    <div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.saveMatters()">Save</button><button type="button" class="btn btn-secondary" onclick="W.readMatters()">Read it aloud</button><button type="button" class="btn btn-secondary" onclick="W.printMatters()">Save or Print</button></div></div>
    <p class="w-small">These go to your chaplain or doula only when you share them, from Today.</p>`;
};
VIEWS.faithpage = () => {
  const a = me(); if (!a) return needProfileHtml('Faith');
  const t = target(), r = rec(t); if (!r || !r.started) return needProfileHtml('Faith');
  if (!sees('faith')) return privateHtml('Faith');
  const self = t === a.id, f = r.faith, n = esc(nameOf(t));
  let h = '';
  if (f) {
    h += `<div class="w-card w-faithsum"><p class="w-eyebrow">${self ? 'In your words' : 'In ' + n + '\'s words'}</p><p>${faithSummary(f)}</p>${f.call ? `<p><b>Call:</b> ${esc(f.call)}</p>` : ''}${f.never ? `<p><b>Please keep in mind:</b> ${esc(f.never)}</p>` : ''}<p class="w-small">Asked on the second screen of each check-in${f.date ? ', last on ' + nice(f.date) : ''}.</p>
      <div class="btn-row"><button type="button" class="btn btn-secondary" onclick="W.checkin(false)">Update in a Full Check-in</button></div></div>`;
    tradsOf(f).filter(id => F.cards[id]).forEach(id => { h += cardHtml(id, (self ? 'Your' : n + '\'s') + ' tradition'); });
  } else {
    h += `<div class="w-card"><p>Willow asks about faith on the second screen of each check-in, because a chaplain always asks. Every answer is welcome, including none, and a person can choose more than one tradition.</p><div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.checkin(false)">Begin a Full Check-in</button></div></div>`;
  }
  h += `<div class="w-card"><p class="w-eyebrow">Faith at the bedside</p><p>Tradition cards, words for mixed-faith families, and readings for all faith traditions and everything in-between.</p><div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="W.go('bedside')">At the Bedside</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.go('readings')">Readings</button></div></div>`;
  return h;
};
VIEWS.service = () => {
  const g = fwGate('Service Wishes', 'farewell', false); if (g) return g;
  const r = T(), f = fwOf(r), w = f.wishes, SV = FW.service, fromM = wishFrom(r);
  const field = q => {
    const k = q[0], kind = q[1];
    if (kind === 'm' || kind === '1') {
      const cur = w[k], many = kind === 'm';
      return `<fieldset class="w-chipset full"><legend>${esc(q[2])}</legend><div class="w-cs">${SV.choices[k].map(o => { const on = many ? (Array.isArray(cur) && cur.includes(o[0])) : cur === o[0];
        return `<label><input type="${many ? 'checkbox' : 'radio'}" name="w-sv-${k}" data-c="${k}" value="${o[0]}"${on ? ' checked' : ''} onchange="W.fwPick(this)"><span>${esc(o[1])}</span></label>`; }).join('')}</div></fieldset>`;
    }
    const filled = w[k] == null && fromM[k];
    return fField('wishes.' + k, kind, q[2], '', q[3], orFrom(w, k, fromM[k]), filled ? (k === 'tradition' ? 'From the faith answers.' : SV.filled) : '', kind === 'a');
  };
  return `<p class="lead" style="margin:0 0 14px">${roleOf(target()) === 'person' && isSelf() ? 'Write what you hope the day holds. The people you love will be glad to know.' : 'Write it with ' + esc(nameOf(target())) + ', in their words, or from what you know they would want.'} It saves as you type.</p>
    ${SV.groups.map(g => `<div class="w-card"><p class="w-eyebrow">${esc(g[0])}</p><div class="w-fwgrid">${g[1].map(field).join('')}</div></div>`).join('')}
    <div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.fwSave()">Save</button><button type="button" class="btn btn-secondary" onclick="W.printWishes()">Save or Print</button><button type="button" class="btn btn-secondary" onclick="W.go('send')">Send to the Grounded Team</button></div>`;
};
// What Matters (and the faith answers) offer words for Service Wishes that are still empty.
function wishFrom(r) {
  const m = sees('matters') ? (r.matters || {}) : {}, out = {};
  FW.service.fromMatters.forEach(x => { const v = x[1].map(k => String(m[k] || '').trim()).filter(Boolean).join('\n'); if (v) out[x[0]] = x[2] + v; });
  const tr = r.faith && sees('faith') ? tradsOf(r.faith).filter(x => x !== 'private').map(faithName).join(', ') : '';
  if (tr) out.tradition = tr;
  return out;
}
// Service Wishes as lines: [label, words], with What Matters filling what is still empty.
function wishLines(r) {
  const f = fwOf(r), w = f.wishes, SV = FW.service, fromM = wishFrom(r), out = [];
  const lab = (k, id) => ((SV.choices[k] || []).find(o => o[0] === id) || [0, id])[1];
  SV.groups.forEach(g => g[1].forEach(q => {
    let v = w[q[0]];
    if (q[1] === 'm') { v = (Array.isArray(v) ? v : []).filter(x => x !== 'unsure').map(x => lab(q[0], x)).join(', '); }
    else if (q[1] === '1') { v = v && v !== 'unsure' ? lab(q[0], v) : ''; }
    else if (v == null) v = fromM[q[0]] || '';
    v = String(v || '').trim(); if (v) out.push([q[2], v]);
  }));
  return out;
}
function fwSave() { const t = target(); clearTimeout(FW_T); persist(t).then(() => toast('Saved.')); }
function printWishes() {
  const r = T(); if (!r) return; fwSave();
  printHtml('Service Wishes for ' + nameOf(target()), wishLines(r).map(x => `<h3>${esc(x[0])}</h3><p>${esc(x[1]).replace(/\n/g, '<br>')}</p>`).join('') || '<p>Ready when you are.</p>');
}

/* ---------- Stories ---------- */
VIEWS.stories = () => {
  const a = me(), t = target(), r = t ? rec(t) : null;
  let h = hubHtml('stories');
  if (r && r.started && sees('cuttings')) {
    const last = (r.cuttings || []).slice(-3).reverse();
    h += last.length ? `<div class="w-card"><p class="w-eyebrow">${icon('scroll', 16)} Kept lately</p><ul class="w-sum">${last.map(c => `<li><b>${esc(c.title || 'Untitled')}</b> &middot; ${esc((CUT[c.kind] || CUT.story)[1])}</li>`).join('')}</ul><div class="btn-row"><button type="button" class="btn btn-primary btn-sm" onclick="W.go('cuttings')">All Cuttings</button></div></div>`
      : `<div class="w-card"><p>One story is enough to start. Type it, or have a helper type while ${a && t === a.id ? 'you talk' : 'they talk'}.</p><div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.go('cuttings');W.newCut('story')">Keep a First Story</button></div></div>`;
    h += `<p class="w-small">Cuttings also fill the Eulogy's three stories and the Legacy Book.</p>`;
  } else if (!a || !r || !r.started) h += needProfileHtml('Stories');
  else h += privateHtml('Cuttings');
  return h;
};
const legacyName = (r, t) => { const f = fwOf(r); return String(orFrom(f.facts, 'first', nameOf(t)) || '').trim() || String(f.facts.name || '').trim() || nameOf(t); };
function legacyBody(r, t) {
  const m = sees('matters') ? (r.matters || {}) : {}, cuts = r.cuttings || [];
  let h = m.who ? `<h4>In ${esc(legacyName(r, t))}'s words</h4><p class="w-quote">${esc(m.who).replace(/\n/g, '<br>')}</p>` : '';
  CUT_KINDS.forEach(k => { const L = cuts.filter(c => (CUT[c.kind] ? c.kind : 'story') === k[0]); if (!L.length) return;
    h += `<h4>${esc(k[1].replace(/^A /, '').replace(/^One of the /, '').replace(/^./, s => s.toUpperCase()))}</h4>` + L.map(c => `<h3>${esc(c.title || 'Untitled')}</h3>${c.to ? `<p><i>${esc(c.to)}</i></p>` : ''}<div class="w-cuttext">${esc(c.text).replace(/\n/g, '<br>')}</div>`).join(''); });
  return h;
}
VIEWS.legacy = () => {
  const a = me(); if (!a) return needProfileHtml('The Legacy Book');
  const t = target(), r = rec(t); if (!r || !r.started) return needProfileHtml('The Legacy Book');
  if (!sees('cuttings')) return privateHtml('The Legacy Book');
  const n = esc(legacyName(r, t)), cuts = r.cuttings || [];
  if (!cuts.length) return `<div class="w-card"><p>The Legacy Book gathers every Cutting into one book. Keep a first story, and it starts here.</p><div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.go('cuttings');W.newCut('story')">Keep a First Story</button></div></div>`;
  return `<div class="btn-row no-print" style="margin:0 0 14px"><button type="button" class="btn btn-primary" onclick="W.printLegacy()">Save or Print the Book</button><button type="button" class="btn btn-secondary" onclick="W.go('cuttings')">Add a Cutting</button></div>
    <article class="w-card w-book" data-read="Read the book aloud"><div class="w-legacy-cover"><p class="w-eyebrow" style="justify-content:center">The Legacy Book</p><h3>${n}</h3><p class="w-small">${cuts.length} ${cuts.length === 1 ? 'Cutting' : 'Cuttings'}, kept in Willow</p></div>${legacyBody(r, t)}</article>`;
};
function printLegacy() {
  const t = target(), r = rec(t); if (!r) return;
  const html = `<p><i>${(r.cuttings || []).length} Cuttings, kept in Willow</i></p>` + legacyBody(r, t);
  const title = 'The Legacy Book of ' + legacyName(r, t), now = () => printHtml(title, html);
  if (!window.GGApp || !window.ggPdfFromHTML) { now(); return; }
  GGApp.sheet({ title, file: 'legacy-book.pdf', print: now, blocks: () => ggPdfFromHTML(`<h1>${esc(title)}</h1>` + html, { eyebrow: 'Willow by Grow With Grounded', foot: 'Willow(TM) by Grow With Grounded. growwithgrounded.com/willow' }) });
}

/* ---------- Farewell ---------- */
VIEWS.farewell = () => {
  let h = hubHtml('farewell');
  const t = target(), r = t ? rec(t) : null;
  if (r && r.started && sees('farewell') && roleOf(t) === 'person') {
    const L = wishLines(r);
    h += `<div class="w-card"><div class="w-spread"><p class="w-eyebrow">${icon('candle', 16)} Service Wishes</p><button type="button" class="text-btn" onclick="W.go('service')">${L.length ? 'Change' : 'Write them'}</button></div>
      ${L.length ? `<ul class="w-sum">${L.slice(0, 8).map(x => `<li><b>${esc(x[0])}:</b> ${esc(x[1]).replace(/\n/g, '; ')}</li>`).join('')}</ul>` : '<p>Music, readings, who speaks, burial or cremation, and the feel of the day. What Matters fills in what it can.</p>'}</div>`;
  } else if (!me() || !r || !r.started) h += needProfileHtml('Farewell planning') + fwPages();
  h += `<div class="w-card"><p class="w-eyebrow">${icon('hand', 16)} The Grounded team</p><p>We help families prepare a service that sounds like the person they love: a funeral, a memorial, a graveside, or a celebration of life, for all faith traditions and everything in-between. When you are ready, Send to the Grounded Team shares your plans in one tap.</p></div>`;
  return h;
};
VIEWS.plan = () => {
  const g = fwGate('The Farewell Checklist', 'farewell'); if (g) return g;
  const f = fwOf(T()), C2 = FW.checklist;
  const count = s => s.items.filter(it => f.plan.c[s.id + '.' + it.id]).length;
  return lineHtml() + `<p class="lead" style="margin:0 0 14px">${esc(C2.lead)}</p>` + C2.secs.map(s => `<div class="w-card" id="w-fws-${s.id}"><div class="w-spread"><h3>${esc(s.name)}</h3><span class="w-count" id="w-fwn-${s.id}">${count(s)} of ${s.items.length} done</span></div><p class="w-small">${esc(s.lead)}</p>
      <ul class="w-checks">${s.items.map(it => { const k = s.id + '.' + it.id, on = !!f.plan.c[k];
        return `<li class="${on ? 'done' : ''}"><label><input type="checkbox" data-k="${k}"${on ? ' checked' : ''} onchange="W.fwCheck(this)"><span><b>${esc(it.t)}</b><span class="d">${esc(it.d)}</span></span></label>${it.go ? `<div class="w-go">${it.go.map(x => `<button type="button" onclick="W.go('${x[1]}')">${esc(x[0])}</button>`).join('')}</div>` : ''}</li>`; }).join('')}</ul></div>`).join('')
    + `<div class="btn-row"><button type="button" class="btn btn-secondary" onclick="W.printPlan()">Print the Checklist</button><button type="button" class="btn btn-secondary" onclick="W.go('send')">Send to the Grounded Team</button></div>` + sourcesLine(C2.sources);
};
function fwCheck(el) {
  const r = T(); if (!r) return; const f = fwOf(r), k = el.dataset.k;
  if (el.checked) f.plan.c[k] = today(); else delete f.plan.c[k];
  const li = el.closest('li'); if (li) li.classList.toggle('done', el.checked);
  const s = FW.checklist.secs.find(x => x.id === k.split('.')[0]), n = s && $('#w-fwn-' + s.id);
  if (n) n.textContent = s.items.filter(it => f.plan.c[s.id + '.' + it.id]).length + ' of ' + s.items.length + ' done';
  fwKeep();
}
function printPlan() {
  const r = T(); if (!r) return; const f = fwOf(r);
  printHtml('Planning a Farewell', FW.checklist.secs.map(s => `<h3>${esc(s.name)}</h3><ul>${s.items.map(it => `<li>${f.plan.c[s.id + '.' + it.id] ? '&#10003; ' : '&#9744; '}<b>${esc(it.t)}</b>. ${esc(it.d)}</li>`).join('')}</ul>`).join('')
    + `<p><small>With hospice, call the hospice's 24/7 line first. If a death was sudden or unexpected, call 911.</small></p><p><small>Sources: ${FW.checklist.sources.map(x => esc(x[0])).join('; ')}.</small></p>`);
}

/* the Obituary (the Obituary Helper's drafting, GWG BLD 748, inside Willow) */
const OQ = []; FW.obituary.groups.forEach(g => g.qs.forEach(q => OQ.push(q.id)));
const OB_FACTS = FW.facts.map(x => x[0]);
function obVals(f) {
  const p = PRON[pronOf(f)], name = String(f.facts.name || '').trim();
  const first = String(orFrom(f.facts, 'first', nameOf(target())) || '').trim() || name.replace(/["“”].*?["“”]/g, ' ').trim().split(/\s+/)[0] || '';
  return Object.assign({ Name: name || first || '[Name]', First: first || '[Name]' }, p);
}
function obFill(t, f, extra) {
  const v = obVals(f);
  return String(t || '').replace(/\{([A-Za-z]+)\}/g, (m0, k) => {
    if (extra && Object.prototype.hasOwnProperty.call(extra, k)) return extra[k] || '';
    if (Object.prototype.hasOwnProperty.call(v, k)) return v[k];
    const lo = k.charAt(0).toLowerCase() + k.slice(1);
    if (lo !== k && Object.prototype.hasOwnProperty.call(v, lo)) { const w = v[lo]; return w.charAt(0).toUpperCase() + w.slice(1); }
    return m0;
  });
}
// What Matters offers the words for a question that is still empty (q.from).
function obFrom(r, q) { const m = sees('matters') ? (r.matters || {}) : {}; return (q.from || []).map(k => String(m[k] || '').trim()).filter(Boolean).join(' '); }
function obAns(r) {
  const f = fwOf(r), a = {};
  OB_FACTS.forEach(k => { a[k] = k === 'first' ? '' : String(f.facts[k] || ''); });
  FW.obituary.groups.forEach(g => g.qs.forEach(q => { a[q.id] = String(orFrom(f.obit.a, q.id, obFrom(r, q))); }));
  return a;
}
// The same drafting rules as the Service Builder: a sentence drops out when its answers are empty, and a clause drops out when only its own answer is empty.
function obDraft(r, shape) {
  const f = fwOf(r), raw = obAns(r), ids = OB_FACTS.filter(k => k !== 'first').concat(OQ), ans = {};
  ids.forEach(id => { ans[id] = String(raw[id] || '').trim().replace(/\s*\n+\s*/g, ' ').replace(/[.;,]\s*$/, ''); });
  if (ans.loved) ans.loved = lc1(ans.loved);
  ['early', 'work', 'married', 'remembered', 'faith'].forEach(id => { if (ans[id] && !/[.!?"”]$/.test(ans[id])) ans[id] += '.'; if (ans[id]) ans[id] = ans[id].charAt(0).toUpperCase() + ans[id].slice(1); });
  const toks = t => (t.match(/\{([A-Za-z]+)\}/g) || []).map(x => x.slice(1, -1)).filter(k => ids.includes(k));
  const tidy = t => obFill(t, f, ans).replace(/\s+([.,;:])/g, '$1').replace(/([.!?]["”]?)\./g, '$1').replace(/\.{2,}/g, '.').replace(/\s{2,}/g, ' ').trim();
  const sentence = t => {
    const used = toks(t); if (!used.length) return tidy(t);
    if (used.every(k => !ans[k])) return '';
    if (used.every(k => ans[k])) return tidy(t);
    const parts = t.replace(/[.!?]\s*$/, '').split(/,\s+/).filter(c => toks(c).every(k => ans[k]));
    if (!parts.length) return '';
    let out = tidy(parts.join(', ')).replace(/^and\s+/i, ''); out = out.charAt(0).toUpperCase() + out.slice(1);
    return out + '.';
  };
  const item = t => t.split(/(?<=[.!?])\s+(?=[{A-Z])/).map(sentence).filter(Boolean).join(' ');
  const paras = shape.words > 120 ? shape.outline.map(item) : [shape.outline.map(item).filter(Boolean).join(' ')];
  return paras.filter(Boolean).join('\n\n');
}
// Words that start a sentence on their own page read mid-sentence here ("Ruth loved coffee"); names and "I" keep their capital.
// Lowercase only a common opening word, so a name at the start of a family's note keeps its capital (Mary, Grandpa Joe).
const LC_WORDS = /^(The|A|An|And|Or|But|Her|His|Their|Our|My|Your|Its|This|That|These|Those|Being|Spending|Cooking|Gardening|Reading|Singing|Playing|Fishing|Walking|Teaching|Helping|Making|Watching|Listening|Time|Family|Friends|Music|Faith|Love|Laughing|Laughter|Sundays|Mornings|Evenings|Every|All|Long|Quiet|Simple|Good)\b/;
const lc1 = t => LC_WORDS.test(t) ? t.charAt(0).toLowerCase() + t.slice(1) : t;
const words = t => { const m = String(t || '').trim().match(/\S+/g); return m ? m.length : 0; };
const obCount = (sh, t) => { const n = words(t); return `<span class="w-count${n > sh.words * 1.25 ? ' over' : ''}" id="w-on-${sh.id}">${n} words, aim for about ${sh.words}</span>`; };
function factsCard(f) {
  return `<div class="w-card"><div class="w-spread"><p class="w-eyebrow">Life Facts</p><span class="w-small">Written once. The Obituary, the Eulogy, and the Legacy Book use them.</span></div><div class="w-fwgrid">${FW.facts.map(x => fField('facts.' + x[0], 't', x[1], x[2], x[3], x[0] === 'first' ? orFrom(f.facts, 'first', nameOf(target())) : (f.facts[x[0]] || ''), '', x[0] === 'born' || x[0] === 'death')).join('')}${pronSel(f)}</div></div>`;
}
VIEWS.obituary = () => {
  const g = fwGate('The Obituary', 'farewell'); if (g) return g;
  const r = T(), f = fwOf(r), O = FW.obituary, any = O.shapes.some(s => String(f.obit.d[s.id] || '').trim());
  let h = `<p class="lead" style="margin:0 0 14px">${esc(O.lead)}</p>
    <div class="w-card"><p class="w-eyebrow">Before you share it</p><ul class="w-tips">${O.tips.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` + factsCard(f);
  h += O.groups.map(gr => `<div class="w-card"><p class="w-eyebrow">${esc(gr.name)}</p><div class="w-fwgrid">${gr.qs.map(q => { const from = f.obit.a[q.id] == null ? obFrom(r, q) : '';
    return fField('obit.a.' + q.id, 'a', obFill(q.ask, f), obFill(q.hint || '', f), q.ph || '', orFrom(f.obit.a, q.id, from), from ? 'Filled in from What Matters.' : '', true); }).join('')}</div></div>`).join('');
  h += `<div class="btn-row" style="margin:0 0 18px"><button type="button" class="btn btn-primary" onclick="W.obMake()">${any ? 'Make New Drafts' : 'Make the Drafts'}</button></div><div id="w-ob-drafts">`;
  if (any) h += O.shapes.map(sh => { const t = f.obit.d[sh.id] || '';
    return `<div class="w-card" id="w-obd-${sh.id}"><div class="w-spread"><h3>${esc(sh.name)}</h3>${obCount(sh, t)}</div><p class="w-small">${esc(sh.about)}</p>
      <textarea class="w-draft" data-k="obit.d.${sh.id}" aria-label="${esc(sh.name)} draft" rows="${sh.words > 300 ? 14 : sh.words > 100 ? 10 : 6}" oninput="W.fwIn(this)">${esc(t)}</textarea>
      <div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="W.fwCopy('obit','${sh.id}')">Copy</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.obPrint('${sh.id}')">Save or Print</button></div></div>`; }).join('')
    + `<div class="btn-row"><button type="button" class="btn btn-secondary" onclick="W.obPrint('all')">Save or Print All Three</button><button type="button" class="btn btn-secondary" onclick="W.go('send')">Send to the Grounded Team</button></div>`;
  return h + `</div>` + sourcesLine(O.sources);
};
function obMake() {
  const r = T(); if (!r) return; const f = fwOf(r), O = FW.obituary;
  if (O.shapes.some(sh => f.obit.e[sh.id] && f.obit.d[sh.id]) && !confirm('Make new drafts? This replaces the changes you made to the drafts.')) return;
  const a = obAns(r); if (!OQ.concat(OB_FACTS).some(k => String(a[k] || '').trim() && k !== 'first')) { toast('Answer a question or two first.'); return; }
  O.shapes.forEach(sh => { f.obit.d[sh.id] = obDraft(r, sh); }); f.obit.e = {};
  persist(target()).then(() => { render(); toast('Your drafts are ready below.'); const d = $('#w-obd-notice'); if (d) d.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
}
const paras = t => String(t || '').split(/\n\s*\n/).map(p => p.trim() ? `<p>${esc(p.trim()).replace(/\n/g, '<br>')}</p>` : '').join('');
function obPrint(id) {
  const r = T(); if (!r) return; const f = fwOf(r), v = obVals(f);
  const L = FW.obituary.shapes.filter(sh => (id === 'all' || sh.id === id) && String(f.obit.d[sh.id] || '').trim());
  if (!L.length) { toast('Make the drafts first.'); return; }
  printHtml('Obituary for ' + v.Name, L.map(sh => `<h3>${esc(sh.name)}</h3>${paras(f.obit.d[sh.id])}`).join(''));
}
function fwCopy(kind, id) {
  const r = T(); if (!r) return; const f = fwOf(r);
  const text = kind === 'obit' ? f.obit.d[id] : kind === 'eulogy' ? f.eulogy.d : kind === 'send' ? sendText(sendData()) : kind === 'mail' ? TEAM() : '';
  copyText(text);
}
function copyText(text) {
  text = String(text || ''); if (!text.trim()) { toast('Nothing to copy yet.'); return; }
  const old = () => { const t = document.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.top = '-1000px'; document.body.appendChild(t); t.select(); let ok = false; try { ok = document.execCommand('copy'); } catch (e) {} t.remove(); toast(ok ? 'Copied.' : 'Select the words and copy them by hand.'); };
  try { if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(() => toast('Copied.'), old); return; } } catch (e) {}
  old();
}

/* the Eulogy (the Eulogy Helper's outline, GWG BLD 748, inside Willow); Cuttings offer the stories */
const EU = FW.eulogy;
const clean = t => String(t || '').trim().replace(/[ \t]+/g, ' ');
const sent = t => { t = clean(t); if (!t) return ''; t = t.charAt(0).toUpperCase() + t.slice(1); return /[.!?"”]$/.test(t) ? t : t + '.'; };
const low = t => lc1(clean(t).replace(/[.]+$/, ''));
function euAns(r) {
  const f = fwOf(r), m = sees('matters') ? (r.matters || {}) : {}, a = {};
  EU.groups.forEach(g => g[2].forEach(q => { a[q[0]] = String(f.eulogy.a[q[0]] == null ? (q[0] === 'name' ? obVals(f).First.replace('[Name]', '') : q[0] === 'who' ? (m.who || '') : '') : f.eulogy.a[q[0]]); }));
  return a;
}
function euBuild(r) {
  const f = fwOf(r), a = euAns(r), n = clean(a.name) || '[Name]', p = PRON[pronOf(f)];
  const open = [a.me ? sent(a.me) : '[Who you are to them.]', a.who ? n + ' was ' + low(a.who) + '.' : n + ' was [one sentence that captures ' + p.them + '].'];
  const stories = ['s1', 's2', 's3'].map((k, i) => clean(a[k]) ? sent(a[k]) : '[' + ['First', 'Second', 'Third'][i] + ' story]');
  const gave = [a.taught ? n + ' taught me ' + low(a.taught) + '.' : 'What ' + n + ' taught me was [what ' + p.they + ' taught you].', a.carry ? 'And what we carry forward is ' + low(a.carry) + '.' : 'And what we carry forward is [what we carry].'];
  return [open.join(' '), stories.join('\n\n'), gave.join(' '), a.close ? sent(a.close) : '[A closing line.]'].join('\n\n');
}
function euTime(t) {
  const w = words(String(t || '').replace(/\[[^\]]*\]/g, ' ')), halves = Math.round(w / EU.wpm * 2), m = Math.floor(halves / 2), half = halves % 2;
  return w + ' words, about ' + (halves < 2 ? 'under a minute' : m + (half ? ' and a half' : '') + (m === 1 && !half ? ' minute' : ' minutes')) + ' at an easy pace';
}
VIEWS.eulogy = () => {
  const g = fwGate('The Eulogy', 'farewell'); if (g) return g;
  const r = T(), f = fwOf(r), a = euAns(r), cuts = sees('cuttings') ? (r.cuttings || []) : [];
  const uses = (k, kinds) => { const L = cuts.filter(c => kinds.includes(c.kind || 'story')); if (!L.length) return '';
    return `<div class="w-uses"><span>${esc(EU.useCutting)}:</span>${L.slice(-6).reverse().map(c => `<button type="button" onclick="W.euUse('${k}','${c.id}')" title="${esc(c.title || 'Untitled')}">${esc(c.title || String(c.text).slice(0, 40))}</button>`).join('')}</div>`; };
  let h = `<p class="lead" style="margin:0 0 14px">${esc(EU.lead)}</p>`;
  h += EU.groups.map(gr => `<div class="w-card"><p class="w-eyebrow">${esc(gr[0])}</p>${gr[1] ? `<p class="w-small">${esc(gr[1])}</p>` : ''}<div class="w-fwgrid">${gr[2].map(q => {
    const k = q[0], from = f.eulogy.a[k] == null && a[k] ? (k === 'who' ? 'Filled in from What Matters.' : 'From Life Facts.') : '';
    let x = fField('eulogy.a.' + k, q[1], q[2], q[3], q[4], a[k], from, q[1] === 'a');
    const u = /^s[123]$/.test(k) ? uses(k, ['story', 'letter', 'four', 'blessing', 'recipe']) : k === 'taught' ? uses(k, ['learned']) : '';
    if (u) x = x.replace(/<\/label>$/, u + '</label>');
    return x; }).join('')}${gr[0] === EU.groups[0][0] ? pronSel(f) : ''}</div></div>`).join('');
  h += `<div class="btn-row" style="margin:0 0 18px"><button type="button" class="btn btn-primary" onclick="W.euMake()">${f.eulogy.d ? 'Build a New Outline' : 'Build My Outline'}</button></div>`;
  if (f.eulogy.d) h += `<div class="w-card" id="w-eu-draft"><div class="w-spread"><h3>The Eulogy</h3><span class="w-count" id="w-eu-time">${esc(euTime(f.eulogy.d))}</span></div>
    <p class="w-small">Opening, then the stories, then what ${esc(clean(a.name) || 'they')} gave us, then goodbye. Words in [brackets] are spots still waiting for you. Change anything; this is your voice.</p>
    <textarea class="w-draft" data-k="eulogy.d" aria-label="The eulogy" rows="16" oninput="W.fwIn(this)">${esc(f.eulogy.d)}</textarea>
    <p class="w-small">Reading time counts about ${EU.wpm} words a minute, an easy pace for a hard day.</p>
    <div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="W.fwCopy('eulogy')">Copy</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.euPrint()">Print in Large Type</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.go('send')">Send to the Grounded Team</button></div></div>`;
  h += `<div class="w-card"><p class="w-eyebrow">Speaking through tears</p><p>Tears are welcome. They mean you loved them, and the room is with you.</p><ul class="w-tips">${EU.tips.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`;
  return h;
};
function euUse(k, id) {
  const r = T(); if (!r) return; const c = (r.cuttings || []).find(x => x.id === id); if (!c) return;
  const el = $('#w-fw-eulogy-a-' + k), cur = el ? el.value.trim() : '';
  const v = cur ? cur + '\n\n' + String(c.text).trim() : String(c.text).trim();
  if (el) { el.value = v; } fwSet('eulogy.a.' + k, v); const n = el && el.parentNode.querySelector('.w-fill'); if (n) n.remove();
  toast('Added from Cuttings.');
}
function euMake() {
  const r = T(); if (!r) return; const f = fwOf(r);
  if (f.eulogy.edited && f.eulogy.d && !confirm('Build a new outline? This replaces the changes you made to the eulogy.')) return;
  f.eulogy.d = euBuild(r); f.eulogy.edited = false;
  persist(target()).then(() => { render(); toast('Your outline is ready below.'); const d = $('#w-eu-draft'); if (d) d.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
}
function euPrint() {
  const r = T(); if (!r) return; const f = fwOf(r); if (!f.eulogy.d) { toast('Build the outline first.'); return; }
  document.body.classList.add('w-bigprint'); printHtml('Eulogy for ' + (clean(euAns(r).name) || nameOf(target())), paras(f.eulogy.d));
  setTimeout(() => document.body.classList.remove('w-bigprint'), 3000);
}

/* ---------- Send to the Grounded Team ----------
   A plain summary and a file (format GGFW1, kind farewell-start, the same one Planning a Farewell sends) that the team opens
   into the Farewell Planning Session in the Field Guide. Through the phone's share sheet when it can carry a file; otherwise an
   email to the team with the file saved to attach. Only what is checked goes, only what the person shares, only on Send. */
const TEAM = () => 'hello' + '@' + 'growwithgrounded' + '.' + 'com';
const SEND_ON = {}; FW.send.parts.forEach(p => { SEND_ON[p[0]] = p[3]; });
function sendCan(k, r) {
  if (k === 'matters') return sees('matters') && MATTERS.concat(VIGIL).some(x => (r.matters || {})[x[0]]);
  if (k === 'cuttings') return sees('cuttings') && (r.cuttings || []).length > 0;
  return sees('farewell');
}
function sendData() {
  const t = target(), r = rec(t); if (!r) return null;
  const f = fwOf(r), w = f.wishes, on = k => SEND_ON[k] && sendCan(k, r), ff = f.facts, d = { v: 1, kind: 'farewell-start', src: 'willow', made: today() };
  const set = (o, k, v) => { v = typeof v === 'string' ? v.trim() : v; if (v && (!Array.isArray(v) || v.length)) o[k] = v; };
  if (on('facts')) { const p = {}; set(p, 'called', String(orFrom(ff, 'first', nameOf(t)))); set(p, 'full', ff.name); set(p, 'born', ff.born); set(p, 'died', ff.death); if (Object.keys(p).length) d.person = p; }
  const fr = f.send.from || {}, from = {}; set(from, 'name', fr.name); set(from, 'rel', fr.rel); set(from, 'phone', fr.phone); set(from, 'email', fr.email); if (Object.keys(from).length) d.from = from;
  if (on('service')) {
    const L = wishLines(r), val = k => { const x = FW.service.groups.flatMap(g => g[1]).find(q => q[0] === k); const l = x && L.find(y => y[0] === x[2]); return l ? l[1] : ''; };
    const many = k => (Array.isArray(w[k]) ? w[k] : []).filter(x => x !== 'unsure');
    set(d, 'gatherings', many('gatherings').concat(w.rest && w.rest !== 'unsure' ? (w.rest === 'scattering' ? ['cremation', 'scattering'] : [w.rest]) : []));
    if (w.faithway) d.faithway = w.faithway;
    set(d, 'tradition', val('tradition')); set(d, 'customs', many('customs')); set(d, 'honors', many('honors'));
    set(d, 'readings', val('readings')); set(d, 'music', val('music')); set(d, 'funeralHome', val('funeralHome'));
    const sp = val('speakers').split('\n').map(clean).filter(Boolean).map(x => ({ name: x.slice(0, 80) })); if (sp.length) d.speakers = sp;
    set(d, 'when', [val('place') ? 'Place: ' + val('place') : '', val('when')].filter(Boolean).join('. '));
    set(d, 'notes', [val('feel') ? 'The feel of the day: ' + val('feel') : '', val('lead') ? 'Who leads: ' + val('lead') : '', val('notes')].filter(Boolean).join('\n'));
  }
  const ob = on('obituary') ? obAns(r) : {};
  if (on('obituary') || on('matters')) { const m = on('matters') ? (r.matters || {}) : {}, st = {};
    set(st, 'loved', ob.loved || m.joy); set(st, 'who', m.who); set(st, 'work', ob.work); set(st, 'values', ob.remembered);
    if (on('cuttings')) { const c = (r.cuttings || []).find(x => (x.kind || 'story') === 'story'); if (c) set(st, 'memory', String(c.text).slice(0, 1200)); }
    if (Object.keys(st).length) d.story = st; }
  if (on('plan')) { const c = Object.keys(f.plan.c); if (c.length) d.checked = c; }
  const wl = {};
  if (on('service')) { const L = wishLines(r); if (L.length) wl.wishes = L.map(x => ({ h: x[0], t: x[1] })); }
  if (on('obituary')) { const o = FW.obituary.shapes.filter(s => String(f.obit.d[s.id] || '').trim()).map(s => ({ h: s.name, t: String(f.obit.d[s.id]).trim() })); if (o.length) wl.obituary = o; }
  if (on('eulogy') && String(f.eulogy.d || '').trim()) wl.eulogy = String(f.eulogy.d).trim();
  if (on('matters')) { const m = r.matters || {}, o = MATTERS.concat(VIGIL).filter(x => m[x[0]]).map(x => ({ h: x[1], t: String(m[x[0]]) })); if (o.length) wl.matters = o; }
  if (on('cuttings')) wl.cuttings = (r.cuttings || []).map(c => ({ kind: (CUT[c.kind] || CUT.story)[1], title: c.title || '', to: c.to || '', t: String(c.text) }));
  if (Object.keys(wl).length) d.willow = wl;
  return d;
}
const sendName = d => { const p = (d && d.person) || {}; return p.full || p.called || nameOf(target()); };
function sendText(d) {
  if (!d) return '';
  const L = [], p = d.person || {}, f = d.from || {}, add = (h, v) => { if (v) L.push(h + ': ' + v); };
  L.push('Farewell plans for ' + sendName(d), 'To the Grounded team (' + TEAM() + ')');
  add('From', [[f.name, f.rel ? '(' + f.rel + ')' : ''].filter(Boolean).join(' '), f.phone, f.email].filter(Boolean).join(', '));
  L.push('Made in Willow at growwithgrounded.com/willow', '');
  add('Born', p.born); add('Died', p.died);
  const w = d.willow || {};
  if (w.wishes) { L.push('', 'Service Wishes'); w.wishes.forEach(x => add(x.h, x.t.replace(/\n/g, '; '))); }
  if (d.checked) L.push('', 'Checklist: ' + d.checked.length + ' done');
  if (w.obituary) L.push('Obituary drafts: ' + w.obituary.map(x => x.h).join(', '));
  if (w.eulogy) L.push('Eulogy: ' + euTime(w.eulogy));
  if (w.matters) L.push('What Matters: ' + w.matters.length + (w.matters.length === 1 ? ' answer' : ' answers'));
  if (w.cuttings) L.push('Cuttings: ' + w.cuttings.length);
  L.push('', FW.send.fileNote);
  return L.join('\n').replace(/\n{3,}/g, '\n\n');
}
const sendFileName = d => 'willow-farewell-' + (String(sendName(d)).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'family') + '.json';
VIEWS.send = () => {
  const g = fwGate('Send to the Grounded Team', 'farewell'); if (g) return g;
  const r = T(), f = fwOf(r), a = me(), fr = f.send.from = f.send.from || {};
  if (fr.name == null) fr.name = a ? a.name : '';
  const d = sendData(), last = f.sent[f.sent.length - 1];
  return `<p class="lead" style="margin:0 0 14px">${esc(FW.send.lead)}</p>
    <div class="w-card"><p class="w-eyebrow">What goes</p>${FW.send.parts.map(p => { const can = sendCan(p[0], r);
      return `<label class="w-switch"><input type="checkbox" ${can && SEND_ON[p[0]] ? 'checked' : ''} ${can ? '' : 'disabled'} onchange="W.sendPart('${p[0]}',this.checked)"><span><b>${esc(p[1])}</b><small>${can ? esc(p[2]) : (p[0] === 'matters' || p[0] === 'cuttings') && !sees(p[0]) ? esc(nameOf(target())) + ' keeps this private.' : 'Ready when you are.'}</small></span></label>`; }).join('')}</div>
    <div class="w-card"><p class="w-eyebrow">From you</p><div class="w-fwgrid">${fField('send.from.name', 't', 'Your name', '', '', fr.name || '')}${fField('send.from.rel', 't', 'Who you are to them', '', 'Daughter', fr.rel || '')}${fField('send.from.phone', 't', 'Your phone', '', '', fr.phone || '')}${fField('send.from.email', 't', 'Your email', '', '', fr.email || '')}</div>
      <p class="w-small">So the Grounded team can reach you. It goes only with what you send.</p></div>
    <div class="w-card"><div class="w-spread"><p class="w-eyebrow">Ready to send</p><button type="button" class="text-btn" onclick="W.render()">Refresh</button></div>
      <textarea class="w-draft" id="w-send-text" readonly rows="10" aria-label="The summary, ready to send">${esc(sendText(d))}</textarea>
      <p class="w-small">To the Grounded team: <span class="w-teammail">${esc(TEAM())}</span>. ${esc(FW.send.fileNote)}</p>
      <div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.sendGo()">Send to the Grounded Team</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.sendMail()">Email It</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.sendFile()">Save the File</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.fwCopy('send')">Copy the Words</button></div>
      ${last ? `<p class="w-sentnote">Last sent ${nice(last.d)}${last.by ? ' by ' + esc(last.by) : ''}.</p>` : ''}</div>`;
};
function sendPart(k, v) { SEND_ON[k] = !!v; const t = $('#w-send-text'); if (t) t.value = sendText(sendData()); }
function sendBlob(d) { return new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' }); }
function saveFile(d) {
  try { const url = URL.createObjectURL(sendBlob(d)), a = document.createElement('a'); a.href = url; a.download = sendFileName(d); document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000); return true; } catch (e) { return false; }
}
function sendReady() {
  clearTimeout(FW_T); const d = sendData();
  if (!d || !(d.person || d.willow || d.checked || d.gatherings || d.story)) { toast('Write a little first: Life Facts, Service Wishes, or the Checklist.'); return null; }
  return d;
}
function sentNow(how) { const r = T(); if (!r) return; const f = fwOf(r); f.sent.push({ d: today(), how, by: (me() || {}).name || '' }); persist(target()).then(() => { render(); toast(FW.send.after); }); }
function sendMail(d) {
  d = d || sendReady(); if (!d) return;
  const saved = saveFile(d), note = saved ? '\n\nThe file ' + sendFileName(d) + ' is saved on this device. Please attach it to this email.' : '';
  let body = sendText(d) + note; if (body.length > 1700) body = body.slice(0, 1600) + '\n...' + note;
  try { window.location.href = 'mailto:' + TEAM() + '?subject=' + encodeURIComponent('Farewell plans for ' + sendName(d)) + '&body=' + encodeURIComponent(body); } catch (e) {}
  sentNow('email');
}
function sendGo() {
  const d = sendReady(); if (!d) return;
  let file = null; try { file = new File([sendBlob(d)], sendFileName(d), { type: 'application/json' }); } catch (e) {}
  const data = { title: 'Farewell plans for ' + sendName(d), text: sendText(d) };
  if (file) data.files = [file];
  if (navigator.share && (!file || (navigator.canShare && navigator.canShare(data)))) {
    navigator.share(data).then(() => sentNow('share')).catch(e => { if (!e || e.name !== 'AbortError') sendMail(d); });
    return;
  }
  sendMail(d);
}
function sendFile() { const d = sendReady(); if (!d) return; toast(saveFile(d) ? 'Saved. Attach the file to a text or email to the Grounded team.' : 'This browser could not save a file. Copy the words instead.'); }

/* ---------- Learn ---------- */
VIEWS.learn = () => hubHtml('learn') + supportCard();

/* ---------- Settings ---------- */
const SHARE_ROWS = [
  ['tree', 'How my tree is doing', 'The gentle words for each part, never the answers.'],
  ['matters', 'What Matters to Me', 'So helpers can read it to nurses, aides, and visitors.'],
  ['cuttings', 'Cuttings', 'Stories, letters, and blessings you\'re leaving.'],
  ['farewell', 'Farewell plans', 'Service Wishes, the checklist, the Obituary, and the Eulogy, so helpers can plan with you.'],
  ['log', 'What helped today', 'The shift log helpers write in.'],
  ['faith', 'My faith answers', 'Your tradition, how you live it, and who to call.'],
  ['answers', 'Notes from my check-ins', 'Anything you wrote at the end of a check-in.']
];
function closeSettings() { const s = $('#w-sheet'); if (s) s.remove(); document.removeEventListener('keydown', sheetKey); }
function sheetKey(e) { if (e.key === 'Escape') closeSettings(); }
function openSettings(focus) {
  closeSettings();
  const a = me(), wrap = document.createElement('div');
  wrap.id = 'w-sheet'; wrap.className = 'w-sheet'; wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-modal', 'true'); wrap.setAttribute('aria-labelledby', 'w-sheet-t');
  let h = `<div class="w-sheet-in"><div class="w-sheet-top"><h2 id="w-sheet-t">Willow Settings</h2><button type="button" class="w-x" aria-label="Close" onclick="W.closeSettings()">&times;</button></div>`;
  if (!a) {
    h += `<section><p>Open a profile to change Willow settings. Each person's settings stay in their own locked profile.</p><div class="btn-row"><button type="button" class="btn btn-primary btn-sm" onclick="W.closeSettings();W.open()">Open a profile</button></div></section>`;
  } else {
    const t = target(), r = rec(t), self = t === a.id, n = esc(nameOf(t)), person = roleOf(t) === 'person';
    h += `<section><h3>Profile</h3><p class="w-who">${window.GGAv ? GGAv.html(a.avatar, a.name, 40) : ''}<b>${esc(a.name)}</b></p>
      <div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="W.closeSettings();GGP.manage()">Picture, passcode, and more</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.closeSettings();GGP.openDialog()">Switch person</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.closeSettings();W.lock()">Lock</button></div></section>`;
    const lr = self && !person ? (helped()[0] ? rec(helped()[0].id) : null) : r, lw = self && !person ? (helped()[0] || {}).name : nameOf(t);
    if (lr) h += `<section id="w-set-line"><h3>Hospice 24/7 line</h3><p class="w-small">Shown at the top of Today and under every check-in${self && person ? '' : ', for ' + esc(lw)}. Call it first, day or night.</p>
      <label class="w-l" for="w-ln">Hospice name</label><input type="text" id="w-ln" maxlength="80" value="${esc(lr.line.name)}" placeholder="Our hospice">
      <label class="w-l" for="w-lp">24/7 phone number</label><input type="tel" id="w-lp" maxlength="30" value="${esc(lr.line.phone)}" placeholder="320-555-0100">
      <div class="btn-row"><button type="button" class="btn btn-primary btn-sm" onclick="W.saveLine()">Save the number</button></div></section>`;
    if (self && person) {
      h += `<section id="w-set-share"><h3>What helpers see</h3><p class="w-small">Helpers open your Willow with their own passcode. They see only what's switched on here.</p>
        ${SHARE_ROWS.map(x => `<label class="w-switch"><input type="checkbox" ${r.share[x[0]] ? 'checked' : ''} onchange="W.share('${x[0]}',this.checked)"><span><b>${esc(x[1])}</b><small>${esc(x[2])}</small></span></label>`).join('')}</section>`;
      const hs = (GP() ? GGP.helpers(t) : []).map(id => GGP.get(id)).filter(Boolean);
      const can = (GP() ? GGP.list() : []).filter(p => p.age === 'adult' && p.id !== t && !hs.some(x => x.id === p.id));
      h += `<section id="w-set-helpers"><h3>Helpers</h3>${hs.length ? hs.map(x => `<p class="w-helper">${window.GGAv ? GGAv.html(x.avatar, x.name, 30) : ''}<b>${esc(x.name)}</b><button type="button" class="text-btn" onclick="W.dropHelper('${x.id}')">Remove</button></p>`).join('') : '<p class="w-small">No helpers yet.</p>'}
        ${can.length ? `<label class="w-l" for="w-hid">Add a helper</label><select id="w-hid">${can.map(p => `<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select><label class="w-l" for="w-hpass">Their own passcode (they type it)</label><input type="password" id="w-hpass" autocomplete="off"><div class="btn-row"><button type="button" class="btn btn-primary btn-sm" onclick="W.addHelper()">Add as a helper</button></div>`
        : '<p class="w-small">A helper first creates their own Grounded profile on this device (the profile button at the top of the page), then comes back here to be added.</p>'}</section>`;
    } else if (!self) {
      const hs = (GP() ? GGP.helpers(t) : []).map(id => GGP.get(id)).filter(Boolean);
      h += `<section><h3>${n}'s helpers</h3><p>${hs.map(x => esc(x.name)).join(', ') || 'Just you.'}</p><p class="w-small">${n} chooses what helpers see, in their own Willow settings.</p></section>`;
    }
    if (self) h += `<section><h3>The Grove</h3><label class="w-switch"><input type="checkbox" ${r.share.grove !== false ? 'checked' : ''} onchange="W.share('grove',this.checked)"><span><b>Show my growth on The Grove</b><small>Your willow stands with your family's trees: rings and days tended, never answers.</small></span></label></section>`;
    if (person) {
      const m = remembered(t);
      h += `<section id="w-set-remember"><h3>${m ? 'Remembered' : 'After a death'}</h3>${m ? `<p>${n}'s tree is remembered${m.date ? ', ' + longDate(m.date) : ''}. It stays just as it was.</p><div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="W.unremember()">This was a mistake</button></div>`
        : `<p class="w-small">When ${self ? 'you die, a helper' : n + ' dies, you'} can mark ${self ? 'your' : 'their'} tree as remembered. Nothing is erased. Check-ins stop, and The Grove shows a remembered willow.</p><label class="w-l" for="w-rd">Date</label><input type="date" id="w-rd" value="${today()}"><div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="W.remember()">Remember ${self ? 'my' : esc(nameOf(t)) + '\'s'} tree</button></div>`}</section>`;
    }
  }
  // Root Words (GWG BLD 780): shown for the person who is unlocked, after their passcode (shared/gg-profiles.js).
  const rs = a && GP() && GGP.rootState ? GGP.rootState(a.id) : '';
  h += `<section><h3>Your Records</h3><div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="W.closeSettings();GGBackupGo('make')">Back up everything</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.closeSettings();GGBackupGo('pick')">Load a backup</button>${rs ? `<button type="button" class="btn btn-secondary btn-sm" onclick="W.closeSettings();GGP.rootWords()">${rs === 'has' ? 'See My Root Words' : 'Make My Root Words'}</button>` : ''}</div><p class="w-small">One file with every profile on this device, each still locked, for a lost or broken phone: keep it on this device, iCloud Drive, or another drive. Load it on any device to bring it all back.${rs ? ' Your Root Words open your profile if your passcode is ever forgotten.' : ''}</p></section>
  <section><h3>Reading and Text</h3><div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="cycleTextSize()">Change text size</button></div></section>
    <p class="w-small">Everything in Willow stays locked in each person's own profile. <a class="text-link" href="/privacy.html#willow">How Willow keeps things private</a></p></div>`;
  wrap.innerHTML = h;
  document.body.appendChild(wrap);
  wrap.addEventListener('click', e => { if (e.target === wrap) closeSettings(); });
  document.addEventListener('keydown', sheetKey);
  const f = focus && wrap.querySelector('#w-set-' + focus); if (f) setTimeout(() => f.scrollIntoView({ block: 'start' }), 30);
  const x = wrap.querySelector('.w-x'); if (x) x.focus();
}
function saveLine() {
  const a = me(); if (!a) return;
  const t = target(), id = t === a.id && roleOf(t) === 'helper' ? (helped()[0] || {}).id : t, r = rec(id); if (!r) return;
  r.line = { name: $('#w-ln').value.trim(), phone: $('#w-lp').value.trim() };
  persist(id).then(() => { toast('Saved. It\'s one tap away on Today.'); render(); });
}
function share(k, v) { const t = target(), r = rec(t); if (!r) return; r.share[k] = !!v; persist(t).then(() => { publish(t); render(); }); }
function addHelperNow() {
  const t = target(), hid = $('#w-hid').value, pass = $('#w-hpass').value;
  if (!pass) { toast('Your helper types their own passcode.'); return; }
  GGP.addHelper(t, hid, pass).then(() => { toast(nameOf(hid) + ' is now a helper.'); openSettings('helpers'); render(); }).catch(e => toast(e && e.message ? e.message : 'Let\'s try that again.'));
}
function dropHelper(id) { if (!confirm('Remove ' + nameOf(id) + ' as a helper? They will no longer open your Willow.')) return; GGP.removeHelper(target(), id); openSettings('helpers'); render(); }
function remember() {
  const t = target(), d = ($('#w-rd') || {}).value || today();
  if (!confirm('Mark ' + nameOf(t) + '\'s tree as remembered? Nothing is erased.')) return;
  GGP.setShared(t, { remembered: { date: d, by: (me() || {}).name || '' } });
  publish(t); closeSettings(); S.tab = 'today'; render(); scrollTop(true);
}
function unremember() { const t = target(); GGP.setShared(t, { remembered: null }); closeSettings(); render(); }

/* ---------- the bridge: Willow and a chaplain's or doula's Willow Guide (Willow Build Session 3) ----------
   Both ways, in person, sealed with a short spoken code (shared/gg-bridge.js). Nothing is uploaded.
   Share with my chaplain or doula: check-ins, and only what the person chose to share.
   From your visit: a card from Willow Guide with practices, What matters, and the vigil plan. Fills in blanks only. */
const GB = () => window.GGBridge || null;
const first = n => String(n || '').trim().split(/\s+/)[0] || '';
const VIGIL_MAP = { v0: 'vigil0', v1: 'vigil1', v2: 'vigil2', v3: 'vigil3', v4: 'vigil4' };
function shareCard(t, role) {
  return `<div class="w-card w-bridge"><p class="w-eyebrow">${icon('hand', 16)} Your chaplain or doula</p>
    <p>${role === 'helper' && t === (me() || {}).id ? 'Share your own check-ins with the hospice chaplain or doula who visits.' : 'Share check-ins with the chaplain or doula who visits, so they know where to start.'} You choose what goes. It travels in person, sealed with a code you read aloud.</p>
    <div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="W.go('share')">Share with my chaplain or doula</button></div></div>`;
}
const SHARE_PICK = { checkins: true, faith: true, matters: true, notes: false };
VIEWS.share = () => {
  const a = me(); if (!a) return needProfileHtml('Sharing');
  const t = target(), r = rec(t); if (!r) return VIEWS.today();
  const self = t === a.id, n = esc(nameOf(t)), cks = (r.checkins || []).slice(-4).reverse();
  const can = { checkins: sees('tree') && cks.length > 0, faith: sees('faith') && !!r.faith, matters: sees('matters') && Object.keys(r.matters || {}).some(k => r.matters[k] && k !== 'updated' && k !== 'by'), notes: sees('answers') && cks.some(c => c.note) };
  const row = (k, label, sub, why) => `<label class="w-switch"><input type="checkbox" ${can[k] && SHARE_PICK[k] ? 'checked' : ''} ${can[k] ? '' : 'disabled'} onchange="W.sharePick('${k}',this.checked)"><span><b>${esc(label)}</b><small>${can[k] ? esc(sub) : esc(why)}</small></span></label>`;
  return `<div class="w-head"><p class="w-eyebrow">Your chaplain or doula</p><h2>Share with my chaplain or doula</h2>
    <p class="lead">${self ? 'Choose what goes.' : 'You can share only what ' + n + ' chose to share with helpers.'} They scan a code on this screen with their Field Guide, and you read them two words and a number, out loud. Nothing passes through Grow With Grounded.</p></div>
    <div class="w-card">
      ${row('checkins', 'Check-ins', `The last ${cks.length === 1 ? 'one' : cks.length}, with answers. Your chaplain or doula sees how each part is doing.`, sees('tree') ? 'Your first check-in will show here.' : n + ' keeps this private.')}
      ${row('faith', 'Faith answers', 'Tradition, how it\'s lived out, who to call, and anything never to do.', !sees('faith') ? n + ' keeps this private.' : 'Not answered yet.')}
      ${row('matters', 'What Matters and vigil wishes', 'In ' + (self ? 'your' : 'their') + ' own words.', !sees('matters') ? n + ' keeps this private.' : 'Ready when you are.')}
      ${row('notes', 'Notes from check-ins', 'Anything written at the end of a check-in.', !sees('answers') ? 'Kept private.' : 'Notes will show here.')}
      <div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.shareMake()">Make the code</button><button type="button" class="btn btn-secondary" onclick="W.go('today')">Maybe later</button></div>
    </div>`;
};
function sharePick(k, v) { SHARE_PICK[k] = !!v; }
function shareMake() {
  const a = me(), t = target(), r = rec(t); if (!a || !r || !GB()) { toast('Sharing needs a newer browser.'); return; }
  const d = { n: first((GGP.get(t) || a).name), d: today(), by: first(a.name), role: roleOf(t) };
  if (SHARE_PICK.checkins && sees('tree')) d.ck = (r.checkins || []).slice(-4).reverse().map(c => {
    const o = { id: c.id, d: c.date, q: c.quick ? 1 : 0, by: c.by, h: first(c.helper), role: c.role, a: c.answers, sc: c.sc, fl: (c.flags || []).filter(x => C.flags[x] && C.flags[x].on.length), v: c.v || 1 };
    if (SHARE_PICK.notes && sees('answers') && c.note) o.note = String(c.note).slice(0, 600);
    return o;
  });
  if (SHARE_PICK.faith && sees('faith') && r.faith) d.f = { trad: tradsOf(r.faith)[0] || '', trads: tradsOf(r.faith), own: r.faith.own || '', matters: r.faith.matters || '', lives: r.faith.lives || [], changed: r.faith.changed || '', call: r.faith.call || '', never: r.faith.never || '', date: r.faith.date || '' };
  if (SHARE_PICK.matters && sees('matters')) {
    const m = r.matters || {}, out = {}, vg = {};
    ['who', 'good', 'joy', 'hope', 'worry', 'close', 'comfort', 'never'].forEach(k => { if (m[k]) out[k] = String(m[k]).slice(0, 400); });
    Object.keys(VIGIL_MAP).forEach(k => { if (m[VIGIL_MAP[k]]) vg[k] = String(m[VIGIL_MAP[k]]).slice(0, 400); });
    if (Object.keys(out).length) d.m = out; if (Object.keys(vg).length) d.v = vg;
  }
  if (!d.ck && !d.f && !d.m && !d.v) { toast('Choose at least one thing to share.'); return; }
  const code = GB().code();
  GB().seal('wl-share', d, code).then(tok => {
    GB().show({ title: 'Share with my chaplain or doula', link: GB().url('guide', tok), code,
      say: 'Your chaplain or doula scans this with their Field Guide. Then read them these words out loud.',
      small: 'Nothing is uploaded. It only opens with these words, so never write or text them with the link. You can copy the link to send another way, then say the words by phone.' });
  }).catch(() => toast('That did not work on this device. Try a current browser.'));
}
// A card from a visit, waiting to be opened.
const INV = { code: '', card: null, err: '', to: '' };
function visitInCard() {
  if (!GB() || !GB().pending('willow')) return '';
  if (!me()) return `<div class="w-card w-bridge"><p class="w-eyebrow">${icon('candle', 16)} A card from your visit</p><p>Your chaplain or doula sent a card. Open your profile first, then type the words they read to you.</p><div class="btn-row"><button type="button" class="btn btn-primary btn-sm" onclick="W.open()">Open my profile</button></div></div>`;
  return `<div class="w-card w-bridge"><p class="w-eyebrow">${icon('candle', 16)} A card from your visit</p><p>Your chaplain or doula sent a card from today's visit.</p><div class="btn-row"><button type="button" class="btn btn-primary btn-sm" onclick="W.go('visitin')">Open the card</button><button type="button" class="btn btn-secondary btn-sm" onclick="W.visitDrop()">Throw it away</button></div></div>`;
}
VIEWS.visitin = () => {
  const a = me(); if (!a) return needProfileHtml('A card from your visit');
  if (!GB() || (!GB().pending('willow') && !INV.card)) return VIEWS.today();
  if (!INV.card) return `<div class="w-head"><p class="w-eyebrow">A card from your visit</p><h2>Type the words they read to you</h2><p class="lead">Two words and a number, like "cedar lantern 47." The card only opens with them.</p></div>
    <div class="w-card"><label class="w-l" for="w-invc">The words</label><input type="text" id="w-invc" autocomplete="off" autocapitalize="none" spellcheck="false" value="${esc(INV.code)}" oninput="W.INV.code=this.value">
    ${INV.err ? `<p class="w-flagnote">${esc(INV.err)}</p>` : ''}
    <div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.visitOpen()">Open it</button><button type="button" class="btn btn-secondary" onclick="W.go('today')">Maybe later</button></div></div>`;
  const c = INV.card, mine = [a].concat(helped());
  const def = INV.to || (c.who === 'helper' ? a.id : (mine.find(p => p.id === target() && roleOf(p.id) === 'person') || mine.find(p => roleOf(p.id) === 'person') || a).id);
  INV.to = def;
  const tries = (c.t || []).map(x => `<li><b>${esc(x[2])}</b> ${esc(x[3])}</li>`).join('');
  return `<div class="w-head"><p class="w-eyebrow">A card from your visit</p><h2>From ${esc(c.g || 'your visit')}${c.r ? ', ' + esc(c.r === 'doula' ? 'your doula' : 'your chaplain') : ''}</h2><p class="lead">${nice(c.d)}. For ${esc(c.n || 'you')}.</p></div>
    <div class="w-card">${tries ? `<p class="w-eyebrow">To try</p><ul class="w-list">${tries}</ul>` : ''}
      ${c.m ? `<p class="w-eyebrow">What Matters</p><p class="w-small">Fills in What Matters where nothing is written yet. Nothing already written is changed.</p>` : ''}
      ${c.v ? `<p class="w-eyebrow">Vigil plan</p><p class="w-small">Fills in "When the time comes" where nothing is written yet.</p>` : ''}
      <label class="w-l" for="w-invto">Add it to</label><select id="w-invto" onchange="W.INV.to=this.value">${mine.map(p => `<option value="${p.id}" ${p.id === def ? 'selected' : ''}>${p.id === a.id ? 'My Own Tree' : esc(p.name) + '\'s tree'}</option>`).join('')}</select>
      <div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.visitAdd()">Add to the tree</button><button type="button" class="btn btn-secondary" onclick="W.visitDrop()">Throw it away</button></div></div>`;
};
function visitOpen() {
  if (!GB()) return;
  const tok = GB().pending('willow'); if (!tok) { go('today'); return; }
  if (!INV.code.trim()) { INV.err = 'Type the words first.'; render(); return; }
  GB().open(tok, INV.code, 'wl-visit').then(d => {
    if (!d) { INV.err = 'Those words didn\'t open it. Check them with your chaplain or doula, and try again.'; render(); return; }
    INV.card = d; INV.err = ''; render();
  }).catch(() => { INV.err = 'This browser can\'t open the card. Try a current Safari, Chrome, or Edge.'; render(); });
}
function visitAdd() {
  const c = INV.card, id = INV.to, r = rec(id); if (!c || !r) return;
  if (!r.started) { r.started = today(); r.role = c.who === 'helper' ? 'helper' : 'person'; }
  r.visits = r.visits || [];
  r.visits.push({ id: uid(), d: c.d, g: c.g || '', r: c.r || '', t: (c.t || []).slice(0, 3), v: c.v || null, vl: c.vl || [], added: today() });
  const canM = id === (me() || {}).id || (r.share && r.share.matters);
  if (canM && (c.m || c.v)) {
    r.matters = r.matters || {}; let n = 0;
    Object.keys(c.m || {}).forEach(k => { if (c.m[k] && !r.matters[k]) { r.matters[k] = String(c.m[k]).slice(0, 2000); n++; } });
    Object.keys(VIGIL_MAP).forEach(k => { const v = (c.v || {})[k]; if (v && !r.matters[VIGIL_MAP[k]]) { r.matters[VIGIL_MAP[k]] = String(v).slice(0, 2000); n++; } });
    if (n) { r.matters.updated = today(); r.matters.by = (me() || {}).name || ''; }
  }
  GB().clear('willow'); INV.card = null; INV.code = ''; INV.to = '';
  persist(id).then(() => { S.pid = id; go('today'); toast('Added. It\'s on Today.'); });
}
function visitDrop() { if (GB()) GB().clear('willow'); INV.card = null; INV.code = ''; INV.err = ''; go('today'); toast('Thrown away. Nothing was saved.'); }
function fromVisitCard(r, t) {
  const v = (r.visits || []).slice(-1)[0]; if (!v) return '';
  const tries = (v.t || []).map(x => { const part = x[0] === 'self' ? 'leaves' : x[0], d = (r.days || {})[today()] || {}, done = (d.done || []).includes(part + ':' + x[1]);
    return `<li><b>${esc(x[2])}</b> ${esc(x[3])} ${done ? '<span class="w-done">Done today</span>' : `<button type="button" class="text-btn" onclick="W.did('${part}','${esc(x[1])}')">Did it today</button>`}</li>`; }).join('');
  const extra = sees('matters') && v.v ? (v.vl || []).filter(x => v.v[x[0]]).map(x => `<li><b>${esc(x[1])}:</b> ${esc(v.v[x[0]])}</li>`).join('') : '';
  if (!tries && !extra) return '';
  return `<div class="w-card w-fromvisit"><p class="w-eyebrow">${icon('candle', 16)} From your visit${v.g ? ' with ' + esc(v.g) : ''}</p>
    ${tries ? `<ul class="w-list">${tries}</ul>` : ''}${extra ? `<p class="w-small" style="margin-top:8px">Also in the vigil plan:</p><ul class="w-list">${extra}</ul>` : ''}
    <p class="w-small">${nice(v.d)}. No streaks. Done is enough.</p></div>`;
}

/* ---------- moving between people ---------- */
function view(id) { S.pid = id; S.ck = null; if (S.tab === 'checkin' || S.tab === 'results' || S.tab === 'setup') S.tab = 'today'; render(); }
function openProfile() { if (GP()) GGP.openDialog({ reason: 'Choose your picture, then type your passcode.' }); }
function lock() { if (GP()) GGP.lock().then(() => { S.pid = null; S.ck = null; toast('Locked. Everything is safe on this device.'); }); }

/* ---------- page chrome (the header buttons call these) ---------- */
window.goHome = () => go('today');
window.toggleSiteMenu = btn => { const open = $('#site-menu').classList.toggle('open'); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); };
const TS = ['', 'ts-1', 'ts-2'], TL = ['A+', 'A++', 'A'];
let ts = 0; try { ts = parseInt(localStorage.getItem('willow:text-size') || '0', 10) || 0; } catch (e) {}
function applyTS() { document.documentElement.classList.remove('ts-1', 'ts-2'); if (TS[ts]) document.documentElement.classList.add(TS[ts]); const b = $('#size-btn'); if (b) { b.textContent = TL[ts]; b.setAttribute('aria-label', 'Text size: ' + ['normal', 'larger', 'largest'][ts] + '. Tap to change.'); } }
window.cycleTextSize = () => { ts = (ts + 1) % TS.length; try { localStorage.setItem('willow:text-size', String(ts)); } catch (e) {} applyTS(); };

/* ---------- links: #for=id, #checkin, #quick, #guides, #guide=id, #readings, #reading=id, #bedside, #matters, #cuttings, #about,
   and the Willow Hub pages (#wishes, #service, #stories, #legacy, #farewell, #plan, #obituary, #eulogy, #send, #learn) ---------- */
function fromHash() {
  const h = decodeURIComponent(location.hash || '').slice(1); if (!h) return false;
  const [k, v] = h.split('=');
  if (k === 'for' && v) { S.pid = v; S.tab = 'today'; }
  else if (k === 'checkin' || k === 'quick') { setTimeout(() => startCheckin(k === 'quick'), 50); return true; }
  else if ((k === 'guide' || k === 'life') && v) { S.guide.open = v; S.tab = 'guides'; }
  else if (k === 'guides' || k === 'life' || k === 'talk') { S.guide.open = null; S.tab = 'guides'; }
  else if (k === 'reading' && v) { S.read.open = v; S.tab = 'readings'; }
  else if (k === 'readings') { S.read.open = null; S.tab = 'readings'; }
  else if (HASH_TABS.includes(k)) S.tab = k;
  else return false;
  render(); setTimeout(() => scrollTop(true), 80); return true;
}
/* Back and Forward (GWG nav fix): tapping a tab or opening a guide or reading adds a history entry (#matters,
   #guide=id, #reading=id), so Back steps through Willow before it leaves. Reading the hash never adds one, and
   one-time links (#for=, cards from gg-bridge.js) are left exactly as they were. */
const HASH_TABS = ['today', 'matters', 'cuttings', 'bedside', 'guides', 'readings', 'about',
  'wishes', 'faithpage', 'vigil', 'service', 'stories', 'legacy', 'farewell', 'plan', 'obituary', 'eulogy', 'send', 'learn'];
let HASH_SEEN = location.hash;
const canonHash = h => (!h || h === '#') ? '#today' : h;
function hashOf() {
  if (S.tab === 'guides' && S.guide.open) return '#guide=' + encodeURIComponent(S.guide.open);
  if (S.tab === 'readings' && S.read.open) return '#reading=' + encodeURIComponent(S.read.open);
  return HASH_TABS.includes(S.tab) ? '#' + S.tab : '';
}
function pushHash(st) {
  const h = hashOf(); if (!h || canonHash(h) === canonHash(location.hash)) return;
  try { history.pushState(st || null, '', h); } catch (e) { return; }
  HASH_SEEN = location.hash;
}
function onPop() {
  if (S.tab === 'checkin' && S.ck && !S.ck.done && !confirm('Leave this check-in? Answers so far will be cleared.')) {
    try { history.pushState(null, '', HASH_SEEN || location.pathname + location.search); } catch (x) {} return;
  }
  HASH_SEEN = location.hash;
  const h = location.hash;
  if (h && h !== '#') {
    // Only the hashes Willow reads; an anchor (#main) or a one-time link (a card from gg-bridge.js) is left to its own reader.
    const k = decodeURIComponent(h).slice(1).split('=')[0];
    if (!['checkin', 'quick', 'for', 'guide', 'life', 'talk', 'reading'].concat(HASH_TABS).includes(k)) return;
    if (window.GGRead && GGRead.stop) GGRead.stop(); S.ck = null; fromHash(); return;
  }
  if (window.GGRead && GGRead.stop) GGRead.stop();
  S.ck = null; S.tab = 'today'; S.guide.open = null; S.read.open = null;
  render(); setTimeout(() => scrollTop(true), 80);
}
window.addEventListener('popstate', function (e) { if (window.GGHistOwn && GGHistOwn(e)) return; onPop(e); }); // Learn and page videos keep their own history entries (GWG BLD 780)
window.addEventListener('hashchange', () => { if (!location.hash || location.hash === HASH_SEEN) return; HASH_SEEN = location.hash; fromHash(); });
window.addEventListener('gg-bridge', e => { if (e.detail && e.detail.dest === 'willow') { S.tab = 'today'; render(); } });

/* ---------- start ---------- */
window.W = window.W || {};
Object.assign(window.W, {
  S, go, render, begin, setup, newPerson, existing, view, open: openProfile, lock, top: () => scrollTop(true),
  checkin: startCheckin, step, who, answer, faith, finish, did, another, addLog, guided, guidedLines, classic: quick => startCheckin(quick, true),
  saveMatters, readMatters, printMatters, newCut, cutKind, saveCut, delCut, printCut,
  guide: openGuide, closeGuide, closeReading, lib: openLib, watch: watchGuide, gList, gFind, gRing, rTrad, printGuide, reading: openReading, printReading, bibleVer: setVer,
  settings: openSettings, closeSettings, saveLine, share, addHelper: addHelperNow, dropHelper, remember, unremember,
  sharePick, shareMake, visitOpen, visitAdd, visitDrop, INV,
  fwIn, fwPick, fwPron, fwSave, fwCheck, fwCopy, printWishes, printLegacy, printPlan, obMake, obPrint, euUse, euMake, euPrint,
  sendPart, sendGo, sendMail, sendFile, _sendData: () => sendData(), _sendText: () => sendText(sendData()),
  _theyify: theyify
});
const yr = $('#copyright-year'); if (yr) yr.textContent = new Date().getFullYear();
document.querySelectorAll('#client-nav .nav-btn[data-icon]').forEach(b => { if (!b.querySelector('.nav-ico')) b.insertAdjacentHTML('afterbegin', `<span class="nav-ico">${icon(b.dataset.icon, 22)}</span>`); });
applyTS();
// GWG BLD 886: ?guided=checkin or ?guided=quick (The Grounded Way's sheet) starts that check-in, guided. Willow has no Growth Plan yet.
const GFLAG = window.GGGuided && GGGuided.flag ? GGGuided.flag() : '';
if (GFLAG) GGGuided.clearFlag();
if (GFLAG === 'checkin' || GFLAG === 'quick') { if (/^#(checkin|quick)$/.test(location.hash)) { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} } render(); setTimeout(() => startCheckin(GFLAG === 'quick'), 50); }
else if (!fromHash()) render();
HASH_SEEN = location.hash;
if (GP()) {
  GGP.on(type => { if (type === 'change' || type === 'data' || type === 'ready') { if (S.tab !== 'checkin') render(); else renderBar(); } });
  GGP.ready.then(() => { if (S.tab !== 'checkin') render(); });
}
function readyRead() { const R = window.GGRead; if (!R) return; try { R.setProfile({ pref: 'female', rate: 0.88, key: 'gg_voice_willow' }); } catch (e) {} if (S.tab !== 'checkin') render(); }
if (window.GGRead) readyRead(); else window.addEventListener('ggread-ready', readyRead, { once: true });
})();
