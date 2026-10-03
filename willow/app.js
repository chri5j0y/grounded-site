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

/* ---------- the six parts ---------- */
const PARTS = [
  { key: 'roots', part: 'Roots', name: 'What grounds you', color: 'var(--p-roots)' },
  { key: 'trunk', part: 'Trunk', name: 'A life that mattered', color: 'var(--p-trunk)' },
  { key: 'bark', part: 'Bark', name: 'Peace inside', color: 'var(--p-bark)' },
  { key: 'branches', part: 'Branches', name: 'Love said out loud', color: 'var(--p-branches)' },
  { key: 'leaves', part: 'Leaves', name: 'Comfort', color: 'var(--p-leaves)' },
  { key: 'fruit', part: 'Fruit', name: 'Hope and readiness', color: 'var(--p-fruit)' }
];
const PART = {}; PARTS.forEach(p => { PART[p.key] = p; });
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
    share: { tree: true, matters: true, cuttings: true, log: true, faith: false, answers: false, grove: true } };
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
function needPart(r) {
  const c = lastOwn(r); if (!c || !c.levels) return null;
  const order = { edge: 0, steady: 1, strong: 2 };
  const ks = PARTS.map(p => p.key).filter(k => c.levels[k]).sort((a, b) => order[c.levels[a]] - order[c.levels[b]]);
  return ks[0] || null;
}

// The willow drawing: the mark's tree, with a ring for every check-in.
function willowSVG(o) {
  o = o || {};
  const rings = Math.min(o.rings || 0, 24), soft = o.remembered;
  let ring = '';
  for (let i = 0; i < rings; i++) { const r = 4 + i * 1.6; ring += `<circle cx="50" cy="93.5" r="${r}" fill="none" stroke="${i % 2 ? '#B9977A' : '#8C6A4E'}" stroke-width=".7" transform="scale(1 .22) translate(0 ${(93.5 / .22 - 93.5).toFixed(1)})"/>`; }
  return `<svg class="w-tree" viewBox="0 0 100 100" role="img" aria-label="${esc(o.label || 'A willow tree')}" ${soft ? 'style="opacity:.78"' : ''}>
    <rect x="0" y="86" width="100" height="14" rx="3" fill="#846646"/>
    <g transform="translate(7.5 6.5) scale(0.85)">
      <path d="M43 90Q47 87 47.2 78L48 36H52L52.6 78Q53 87 57 90Z" fill="#5A3414"/>
      <path d="M49 52Q40 44 32 40M51 48Q60 42 68 38" stroke="#5A3414" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <g fill="${soft ? '#7E8A74' : '#5F7350'}"><circle cx="58.3" cy="23.9" r="8.7"/><circle cx="24.8" cy="29.7" r="8.9"/><circle cx="33.6" cy="33.5" r="8"/><circle cx="44.5" cy="31.6" r="7"/><circle cx="52.7" cy="29.6" r="7.6"/><circle cx="66" cy="30.2" r="8.6"/><circle cx="23.6" cy="37" r="8.1"/><circle cx="35.1" cy="36" r="7.7"/><circle cx="51" cy="36.4" r="8.2"/><circle cx="60.9" cy="39.3" r="7.6"/><circle cx="71.2" cy="37.8" r="7.1"/><circle cx="76.5" cy="40.8" r="7"/><circle cx="27.9" cy="46.1" r="7.7"/><circle cx="41.3" cy="46.8" r="8.3"/><circle cx="50.2" cy="44.7" r="8.6"/><circle cx="60.5" cy="45.8" r="7.7"/><circle cx="76.7" cy="44.3" r="8.7"/><circle cx="43" cy="51.6" r="7.3"/><circle cx="60.6" cy="55.5" r="8.3"/></g>
      <g fill="${soft ? '#A3AE97' : '#8BA071'}"><circle cx="56.9" cy="21.7" r="8"/><circle cx="23.4" cy="27.6" r="8.2"/><circle cx="32.2" cy="31.3" r="7.4"/><circle cx="43.1" cy="29.4" r="6.5"/><circle cx="51.3" cy="27.4" r="7"/><circle cx="64.6" cy="28.1" r="7.9"/><circle cx="22.2" cy="34.8" r="7.4"/><circle cx="41.2" cy="35.8" r="6.4"/><circle cx="59.5" cy="37.1" r="7"/><circle cx="69.8" cy="35.7" r="6.5"/><circle cx="26.5" cy="43.9" r="7"/><circle cx="48.8" cy="42.5" r="7.9"/><circle cx="66" cy="42.7" r="6.3"/><circle cx="48.7" cy="51.6" r="8.1"/></g>
      <path d="M18 37.9Q18 50.7 18 64.9M22.2 33Q21.1 52.2 20.5 73M26.4 30.3Q26 57.5 25.7 86.2M30.6 28.4Q30.8 54.8 30.9 82.7M34.8 27.1Q34.2 52.8 33.9 80M39 26.1Q40.9 50.7 42.1 76.8M43.2 25.5Q42.2 47 41.7 70M47.4 25.1Q46.1 53.9 45.3 84.2M51.6 25Q52.7 49.8 53.4 76.1M55.8 25.2Q54.6 53.4 53.8 83.2M60 25.6Q61.3 50.7 62.2 77.4M64.2 26.3Q66.1 55.3 67.3 85.8M68.4 27.4Q69.7 55.1 70.4 84.4M72.6 28.9Q74.5 50 75.7 72.6M76.8 30.9Q76.5 49.6 76.4 69.8M81 34Q82.8 48.4 83.9 64.3" stroke="${soft ? '#7E8A74' : '#5F7350'}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M17 37.9Q17 50.7 17 63.4M25.4 30.3Q25 57.5 24.7 84.7M33.8 27.1Q33.2 52.8 32.9 78.5M42.2 25.5Q41.2 47 40.7 68.5M50.6 25Q51.7 49.8 52.4 74.6M59 25.6Q60.3 50.7 61.2 75.9M67.4 27.4Q68.7 55.1 69.4 82.9M75.8 30.9Q75.5 49.6 75.4 68.3M80 34Q81.8 48.4 82.9 62.8" stroke="${soft ? '#A3AE97' : '#8BA071'}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    </g>
    ${ring}
    ${soft ? '<g transform="translate(84 14)"><path d="M0-6L1.6-1.6 6 0 1.6 1.6 0 6-1.6 1.6-6 0-1.6-1.6Z" fill="#E8C27A"/></g>' : ''}
  </svg>`;
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
const TAB_OF = { today: 'today', about: 'today', setup: 'today', checkin: 'today', results: 'today', history: 'today', matters: 'matters', share: 'today', visitin: 'today', cuttings: 'cuttings', bedside: 'bedside', guides: 'guides', readings: 'readings' };
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
function render() {
  paintNav(); renderBar();
  const v = $('#w-view'); if (!v) return;
  v.innerHTML = (VIEWS[S.tab] || VIEWS.today)();
  v.querySelectorAll('[data-read]').forEach(el => addRead(el));
  if (S.tab === 'guides' && !S.guide.open && S.guide.find) { const i = v.querySelector('.lc-search'); if (i) gFind(i); }
}
function go(v, force) {
  if (window.GGRead && GGRead.stop) GGRead.stop();
  if (v !== 'checkin' && S.ck && !S.ck.done && S.tab === 'checkin' && !confirm('Leave this check-in? Answers so far will not be saved.')) return;
  if (v !== 'checkin') S.ck = v === 'results' ? S.ck : null;
  S.tab = v; render(); scrollTop(force !== false);
}
// Read aloud: a button on anything marked data-read (read.js, shared)
function addRead(el) {
  const R = window.GGRead; if (!R || !R.control || el.querySelector('.gg-rbar')) return;
  try { el.insertBefore(R.control({ root: el, label: el.dataset.read || 'Read Aloud' }), el.firstChild); } catch (e) {}
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
    <h2>Who is Willow for today?</h2>
    <p class="lead">Willow keeps what matters in one gentle place: how the spirit is doing, what the person wants, the stories they want kept, and what helped today. Everything stays on this device, locked with a passcode.</p>
    <div class="w-choices">
      <button type="button" class="w-choice" onclick="W.setup('me')"><b>For me</b><span>I'm in hospice, or facing the end of my life.</span></button>
      <button type="button" class="w-choice" onclick="W.setup('love')"><b>For someone I love</b><span>I'm caring for a parent, a partner, a friend, or family.</span></button>
    </div>
    ${a && a.age !== 'adult' ? `<p class="w-small">Willow is written for grown-ups. Kids and middle schoolers have their own trees in <a class="text-link" href="/maple/">Maple</a> and <a class="text-link" href="/aspen/">Aspen</a>, and the guides and readings here are open to everyone.</p>` : ''}
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
  const need = needPart(r), order = PARTS.map(p => p.key);
  const part = need && off === 0 ? need : order[(dayNo() + off) % order.length];
  const L = P.person[part]; return { part, it: L[(dayNo() + off) % L.length] };
}
const evOf = it => it[it.length - 1];
const timeOf = it => it.length === 5 ? it[3] : '';
function practiceCard(r, role) {
  const o = offer(r, role), it = o.it, d = (r.days || {})[today()] || {}, done = (d.done || []).includes(o.part + ':' + it[0]);
  const p = PART[o.part];
  return `<div class="w-card w-practice" style="--pc:${p.color}" data-read="Read this practice aloud">
    <p class="w-eyebrow">One gentle thing for today${role === 'person' ? ' &middot; ' + p.part : ''}</p>
    <h3>${esc(it[1])}</h3>
    <p>${esc(it[2])}</p>
    <p class="w-meta">${timeOf(it) ? esc(timeOf(it)) + ' &middot; ' : ''}${esc(P.evidence[evOf(it)] || '')}</p>
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
  persist(t).then(() => { publish(t); render(); toast('Done for today. That\'s enough.'); });
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
function treeCard(r, id, role) {
  const self = id === (me() || {}).id, c = lastOwn(r), rings = ringsOf(r), show = sees('tree');
  const who = self ? 'your' : esc(nameOf(id)) + '\'s';
  let words = '';
  if (c && show) words = `<ul class="w-words">${PARTS.map(p => c.levels && c.levels[p.key] ? `<li style="--pc:${p.color}"><b>${p.part}</b><span>${esc(C.words[c.levels[p.key]])}</span></li>` : '').join('')}</ul><p class="w-small">From ${self ? 'your' : 'the'} check-in on ${nice(c.date)}${c.by === 'tapped' ? ', answered with a helper tapping' : ''}.</p>`;
  else if (c && !show) words = `<p>${esc(nameOf(id))} keeps how their tree is doing private. That's their choice to make.</p>`;
  else words = `<p>${self ? 'Your' : esc(nameOf(id)) + '\'s'} tree is planted. A first check-in gives it words.</p>`;
  return `<div class="w-card w-treecard">
    <div class="w-treewrap">${willowSVG({ rings, label: 'A willow tree with ' + rings + ' rings' })}<p class="w-rings">${rings ? rings + (rings === 1 ? ' ring' : ' rings') : 'No rings yet'}</p></div>
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
VIEWS.today = () => {
  const a = me();
  if (!a) return visitInCard() + welcomeHtml() + lineHtml() + aboutShort();
  const t = target(), r = rec(t), mine = rec(a.id);
  if (!mine.started && !helped().length) return visitInCard() + welcomeHtml() + lineHtml();
  if (!r) return welcomeHtml();
  if (remembered(t)) return rememberedHtml(t);
  const role = roleOf(t), self = t === a.id;
  let h = `<div class="w-head"><p class="w-eyebrow">${longDate(today())}</p><h2>${self ? (role === 'helper' ? 'Today, for you' : 'Today') : 'Today with ' + esc(nameOf(t))}</h2></div>`;
  h += lineHtml();
  h += visitInCard();
  h += treeCard(r, t, role);
  h += fromVisitCard(r, t);
  h += practiceCard(r, role);
  if (!self || role === 'person') h += logCard(t);
  if (!self) h += bedsidePick();
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
    <div class="w-card w-treecard"><div class="w-treewrap">${willowSVG({ rings: ringsOf(r), remembered: true, label: n + '\'s willow, remembered' })}</div>
      <div class="w-treetext">${r.matters && r.matters.who && sees('matters') ? `<p class="w-eyebrow">In their words</p><p class="w-quote">${esc(r.matters.who)}</p>` : ''}
      ${after ? `<div data-read="Read this aloud"><p class="w-eyebrow">${esc(after.title)}</p>${after.lines.map(l => `<p class="w-line-read">${esc(l)}</p>`).join('')}</div>` : ''}</div></div>
    <div class="w-card"><p class="w-eyebrow">The next few days</p>
      <div class="w-links"><button type="button" onclick="W.guide('firsthour')">The first hour after</button><button type="button" onclick="W.guide('official')">Making it official</button><button type="button" onclick="W.guide('relief')">Relief, and the guilt that follows</button><button type="button" onclick="W.go('cuttings')">Their Cuttings</button></div>
      <p class="w-small">Your hospice keeps caring for the family. Most offer bereavement support for about 13 months after a death. Ask for it by name.</p></div>
    ${logCard(t)}
    <div class="w-card"><p class="w-eyebrow">Your own tree</p><p>Grief is part of your tree now. Your check-ins keep growing it.</p><div class="btn-row"><button type="button" class="btn btn-secondary" onclick="W.view('${(me() || {}).id}')">Go to my own tree</button></div></div>`;
}
function aboutShort() {
  return `<div class="w-card"><p class="w-eyebrow">How Willow works</p><p>Check in on six parts of the tree, gently, whenever it helps. Keep what matters to you written down. Save stories and letters as Cuttings. Find words for hard conversations in When Life Changes, readings for all faith traditions and everything in-between, and what to do at the bedside.</p><div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="W.go('about')">Read more</button></div></div>`;
}
VIEWS.about = () => `<div class="w-head"><p class="w-eyebrow">How it works</p><h2>A tree for the last part of the path</h2></div>
  <div data-read="Read this aloud">
  <p class="lead">A willow bends. It bends so far in a storm you'd think it should break, and it doesn't. Near the end of life, everyone in the room is bending. Willow is here so no one bends alone.</p>
  <p class="lead">${esc(P.intro)}</p>
  <h3 class="section-title">The Six Parts</h3>
  <div class="w-parts">${PARTS.map(p => `<div class="w-part" style="--pc:${p.color}"><b>${p.part}</b><span>${esc(p.name)}</span><p>${esc(PART_WORDS[p.key].person)}</p></div>`).join('')}</div>
  <h3 class="section-title">Built for two</h3>
  <p class="lead">Willow is the person's own tree. It's also built for the people who love them: a family member can set it up, tap answers while their person talks, and keep a log of what helped today. Helpers open it with their own passcode, and see only what the person chooses to share. Helpers have their own tree here too, because caregivers carry this as well.</p>
  <h3 class="section-title">Every answer says who answered</h3>
  <p class="lead">They answered. They answered and a helper tapped. Or a helper answering from what they see, when their person can no longer say. That last kind is kept apart, and never speaks for the person's own tree.</p>
  <h3 class="section-title">Faith comes first</h3>
  <p class="lead">Willow asks about faith on the second screen, every time, because a chaplain always asks. Every answer is welcome, including none. Each person answers for themselves.</p>
  <h3 class="section-title">Who made this</h3>
  <div class="maker-card"><p>I'm Chris, a hospice chaplain. I sit with people at the end of their lives and the families around them, and I ask the same questions every day: what grounds you, what matters most, who do you want close. Willow is those questions, kept gently in one place.</p></div>
  </div>
  <div class="privacy-note" style="margin-top:22px"><strong>Your answers stay with you.</strong> Everything saved in Willow stays on this device, locked with a passcode. Nothing is sent to Grounded or anyone else. Willow is not medical care or a crisis service. For anything urgent, call your hospice first, day or night.</div>
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
function ckSteps(ck) {
  const s = [];
  if (ck.askWho) s.push('who');
  if (ck.by !== 'observed') s.push('faith');
  if (ck.quick) s.push('quick'); else PARTS.forEach(p => s.push(p.key));
  s.push('close');
  return s;
}
function startCheckin(quick) {
  const a = me();
  if (!a) { setup('me'); return; }
  const t = target(), r = rec(t); if (!r) return;
  if (remembered(t)) { toast('Their tree is remembered now. Nothing more to check.'); return; }
  if (!r.started) { r.started = today(); r.role = t === a.id ? (r.role || 'person') : 'person'; persist(t); }
  const self = t === a.id;
  S.ck = { pid: t, role: roleOf(t), self, by: self ? 'self' : '', askWho: !self, quick: !!quick, i: 0, ans: {}, faith: r.faith ? JSON.parse(JSON.stringify(r.faith)) : { lives: [] }, faithEdit: !r.faith, safety: {}, note: '', done: false };
  S.tab = 'checkin'; render(); scrollTop(true);
}
function ckStem(ck) {
  if (ck.role === 'helper') { const h = helped()[0]; return C.stems.helper.replace('{name}', h ? h.name : 'them'); }
  if (ck.by === 'observed') return `From what you've seen and heard, lately how often has ${esc(nameOf(ck.pid))}...`;
  return C.stems.standard;
}
const faithNone = ck => ck.faith && (ck.faith.trad === 'private' || ck.faith.matters === 'none');
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
  return `<div class="btn-row step-nav">${i > 0 ? `<button type="button" class="btn btn-secondary" onclick="W.step(-1)">Back</button>` : `<button type="button" class="btn btn-secondary" onclick="W.go('today')">Not now</button>`}
    ${last ? `<button type="button" class="btn btn-primary" onclick="W.finish()">See the tree</button>` : `<button type="button" class="btn btn-primary" onclick="W.step(1)">${esc(nextLabel || 'Next')}</button>`}</div>`;
}
function step(d) {
  const ck = S.ck; if (!ck) return;
  const steps = ckSteps(ck), cur = steps[ck.i];
  if (d > 0 && cur === 'who' && !ck.by) { toast('Choose who is answering first.'); return; }
  if (d > 0 && cur === 'faith' && ck.faithEdit && !ck.faith.trad && !ck.faith.own) { toast('Choose one, write your own words, or "I\'d rather not say."'); return; }
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
      <p class="lead">Every answer keeps track of who gave it, so ${n}'s own voice is never mixed up with anyone else's.</p>
      <div class="w-choices w-choices-3">${C.answeredBy.map(b => `<button type="button" class="w-choice" aria-pressed="${ck.by === b[0]}" onclick="W.who('${b[0]}')"><b>${esc(b[1])}</b><span>${b[0] === 'self' ? n + ' reads and answers on their own.' : b[0] === 'tapped' ? n + ' answers out loud. You read each question and tap.' : n + ' can\'t answer now. You answer from what you see and hear. This never adds to their rings.'}</span></button>`).join('')}</div>`;
  } else if (st === 'faith') body = faithStep(ck);
  else if (st === 'quick') {
    body = `<div class="step-head"><div><div class="step-count">About 2 minutes</div><h2 class="step-title" style="--domain-color:var(--gold)">Quick Check-in</h2><div class="step-domain">One question for each part of the tree</div></div></div>
      ${ck.by === 'tapped' ? `<p class="w-small">Read each question to ${n} slowly, and tap their answer. "Not sure" is always okay.</p>` : ''}
      <p class="q-stem">${ckStem(ck)}</p>${PARTS.map(p => `<div class="quick-part" style="--domain-color:${p.color}"><div class="quick-label" style="color:${p.color}">${p.part}</div>${qHtml(ck, p.key, 0)}</div>`).join('')}`;
  } else if (PART[st]) {
    const p = PART[st], k = PARTS.indexOf(p);
    body = `<div class="step-head" style="--domain-color:${p.color}"><div><div class="step-count">Part ${k + 1} of 6</div><h2 class="step-title">${p.part}</h2><div class="step-domain">${esc(p.name)}</div></div></div>
      <p class="w-partwords">${esc(PART_WORDS[st][ck.role])}</p>
      ${ck.by === 'tapped' && k === 0 ? `<p class="w-small">Read each question to ${n} slowly, and tap their answer. "Not sure" is always okay.</p>` : ''}
      <p class="q-stem">${ckStem(ck)}</p>${bank(ck.role)[st].map((q, i) => qHtml(ck, st, i)).join('')}`;
  } else body = closeStep(ck);
  const nextP = PART[steps[ck.i + 1]];
  return `<div class="w-ck" data-read="Read this aloud">${dots}${body}</div>${ckNav(ck, steps, nextP ? 'Next: ' + nextP.part : 'Next')}`;
};
function who(v) { const ck = S.ck; if (!ck) return; ck.by = v; render(); }

/* faith, on the second screen, every time */
function faithSummary(f) {
  if (!f) return '';
  const I = F.intake, opt = (k, v) => { const row = I.follow.find(x => x[0] === k); const o = row && row[2].find(x => x[0] === v); return o ? o[1] : ''; };
  const bits = [];
  if (f.trad) bits.push(faithName(f.trad));
  if (f.own) bits.push('"' + f.own + '"');
  if (f.matters) bits.push('Matters now: ' + opt('matters', f.matters).toLowerCase());
  if ((f.lives || []).length) bits.push('Lived through ' + f.lives.map(v => opt('lives', v).toLowerCase()).join(', '));
  if (f.changed) bits.push(opt('changed', f.changed));
  return bits.map(esc).join('. ') + '.';
}
function faithStep(ck) {
  const I = F.intake, f = ck.faith, r = rec(ck.pid), self = ck.self, n = esc(nameOf(ck.pid));
  const head = `<div class="step-head"><div><div class="step-count">${self ? '' : 'Asked of ' + n + ', in their own words'}</div><h2 class="step-title" style="--domain-color:var(--p-roots)">Faith, spirit, or something else</h2></div></div>`;
  if (r.faith && !ck.faithEdit) {
    return head + `<p class="lead">Last time${r.faith.date ? ', on ' + nice(r.faith.date) : ''}: ${faithSummary(r.faith)}</p>
      ${r.faith.never ? `<p class="w-small"><b>Never do:</b> ${esc(r.faith.never)}</p>` : ''}
      <p class="lead">Is that still true${self ? ' for you' : ' for ' + n}?</p>
      <div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.step(1)">Yes, still true</button><button type="button" class="btn btn-secondary" onclick="W.S.ck.faithEdit=true;W.render()">Something has changed</button></div>`;
  }
  const chip = id => `<button type="button" class="w-tchip" aria-pressed="${f.trad === id}" onclick="W.faith('trad','${id}')">${esc(faithName(id))}</button>`;
  const single = row => `<fieldset class="w-fs"><legend>${esc(row[1])}</legend><div class="w-tchips">${row[2].map(o => `<button type="button" class="w-tchip" aria-pressed="${f[row[0]] === o[0]}" onclick="W.faith('${row[0]}','${o[0]}')">${esc(o[1])}</button>`).join('')}</div></fieldset>`;
  const multi = row => `<fieldset class="w-fs"><legend>${esc(row[1])}</legend><div class="w-tchips">${row[2].map(o => `<button type="button" class="w-tchip" aria-pressed="${(f.lives || []).includes(o[0])}" onclick="W.faith('lives','${o[0]}')">${esc(o[1])}</button>`).join('')}</div></fieldset>`;
  return head + `<p class="lead">${esc(I.ask)} ${esc(I.welcome)}</p>
    ${self ? '' : `<p class="w-small">Each person answers for themselves. Ask ${n}, and tap what they say.</p>`}
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
  else f[k] = f[k] === v ? '' : v;
  const y = window.scrollY; render(); window.scrollTo(0, y);
}

/* the safety step, and closing */
function ckFlags(ck) {
  const out = [];
  PARTS.forEach(p => (bank(ck.role)[p.key] || []).forEach((q, i) => { const a = (ck.ans[p.key] || [])[i]; if (flagOn(ck, q, a) && !out.includes(q.flag)) out.push(q.flag); }));
  return out;
}
function linesHtml(hospiceOnly) {
  const L = line();
  const first = L ? `<li><b>${esc(L.name || 'Your hospice\'s 24/7 line')}</b><a href="${telHref(L.phone)}">${esc(L.phone)}</a></li>` : `<li><b>${esc(C.safety.lines[0])}</b><span>On your admission papers or the fridge sheet.</span></li>`;
  const rest = hospiceOnly ? '' : `<li><b>988 Suicide and Crisis Lifeline</b><a href="tel:988">Call 988</a> or <a href="sms:988">text 988</a></li><li><b>In danger now</b><a href="tel:911">Call 911</a></li>`;
  return `<ul class="w-lines">${first}${rest}</ul>`;
}
// Minnesota Adult Abuse Reporting Center (MAARC), any time
function homeLines() {
  return linesHtml(true).replace('</ul>', '<li><b>Minnesota Adult Abuse Reporting Center</b><a href="tel:18448801574">1-844-880-1574</a></li><li><b>In danger now</b><a href="tel:911">Call 911</a></li></ul>');
}
function closeStep(ck) {
  const fl = ckFlags(ck), n = esc(nameOf(ck.pid)), sf = ck.safety, SA = C.safety;
  let h = `<div class="step-head"><div><div class="step-count">Almost done</div><h2 class="step-title" style="--domain-color:var(--gold)">Before you see the tree</h2></div></div>`;
  if (ck.role === 'person' && fl.includes('end')) {
    if (ck.by === 'observed') {
      h += `<div class="q-card"><p class="q-text">${esc(SA.observed.ask)}</p><div class="q-opts w-opts3">${[['yes', 'Yes'], ['no', 'No'], ['unsure', 'Not sure']].map(o => `<button type="button" aria-pressed="${sf.observed === o[0]}" onclick="W.safe('observed','${o[0]}')">${o[1]}</button>`).join('')}</div>${sf.observed === 'yes' ? `<p class="w-flagnote">${esc(SA.observed.help)}</p>` : ''}</div>`;
    } else {
      const ch = SA.options.find(o => o[0] === sf.choice);
      h += `<div class="q-card w-safe"><p class="q-text">${esc(SA.ask)}</p><div class="w-safeopts">${SA.options.map(o => `<button type="button" aria-pressed="${sf.choice === o[0]}" onclick="W.safe('choice','${o[0]}')">${esc(o[1])}</button>`).join('')}</div>
        ${ch && ch[2] ? `<p class="w-flagnote">${esc(ch[2])}</p>` : ''}
        ${ch && SA.urgent.includes(ch[0]) ? linesHtml() : ch && SA.tellTeam.includes(ch[0]) ? linesHtml(true) : ''}</div>`;
    }
  }
  if (ck.role === 'helper' && fl.includes('hope')) {
    h += `<div class="q-card w-safe"><p class="q-text">${esc(SA.helper.ask)}</p><div class="q-opts w-opts3">${[['yes', 'Yes'], ['no', 'No'], ['skip', 'I\'d rather not say']].map(o => `<button type="button" aria-pressed="${sf.helper === o[0]}" onclick="W.safe('helper','${o[0]}')">${o[1]}</button>`).join('')}</div>
      ${sf.helper === 'yes' ? `<p class="w-flagnote">${esc(SA.helper.yes)}</p>${linesHtml()}` : sf.helper === 'no' ? `<p class="w-flagnote">${esc(SA.helper.no)}</p>` : ''}</div>`;
  }
  if (ck.role === 'person' && ck.by === 'self') {
    h += `<div class="q-card"><p class="q-text">${esc(SA.home.ask)}</p><p class="w-small">Only you see this answer. It is never shared with helpers.</p><div class="q-opts w-opts3">${SA.home.options.map(o => `<button type="button" aria-pressed="${sf.home === o[0]}" onclick="W.safe('home','${o[0]}')">${esc(o[1])}</button>`).join('')}</div>
      ${sf.home && sf.home !== 'yes' ? `<p class="w-flagnote">${esc(SA.home.help)}</p>${homeLines()}` : ''}</div>`;
  }
  h += `<label class="w-l" for="w-cknote">${ck.by === 'observed' ? 'Anything you noticed today (optional)' : 'Anything to remember about today? (optional)'}</label><textarea id="w-cknote" rows="3" maxlength="800" oninput="W.S.ck.note=this.value">${esc(ck.note)}</textarea>`;
  return h;
}
function safe(k, v) { const ck = S.ck; if (!ck) return; ck.safety[k] = v; const y = window.scrollY; render(); window.scrollTo(0, y); }
function finish() {
  const ck = S.ck, a = me(); if (!ck || !a) return;
  const r = rec(ck.pid); if (!r) return;
  const sc = {}, lv = {};
  PARTS.forEach(p => { const s = scorePart(ck.role, p.key, ck.ans[p.key]); if (s != null) { sc[p.key] = s; lv[p.key] = levelOf(s); } });
  if (!Object.keys(lv).length) { toast('Answer at least one question first. "Not sure" counts.'); return; }
  const by = ck.by || 'self';
  const e = { id: uid(), date: today(), by, helper: by === 'self' ? '' : a.name, quick: ck.quick, role: ck.role, answers: JSON.parse(JSON.stringify(ck.ans)), levels: lv, sc, flags: ckFlags(ck), safety: JSON.parse(JSON.stringify(ck.safety)), note: ck.note || '', v: C.version };
  if (by !== 'observed' && (ck.faithEdit || !r.faith) && (ck.faith.trad || ck.faith.own)) { r.faith = Object.assign({}, ck.faith, { date: today(), by: by === 'tapped' ? 'tapped' : 'self' }); }
  if (by !== 'observed' && r.faith && r.faith.never && !(r.matters || {}).never) { r.matters = r.matters || {}; r.matters.never = r.faith.never; }
  r.checkins.push(e);
  ck.done = true; ck.entry = e;
  persist(ck.pid).then(() => { publish(ck.pid); S.tab = 'results'; render(); scrollTop(true); });
}
const GUIDE_FOR_FLAG = { end: 'end', burden: 'burden', struggle: 'punish', regret: 'forgive', guilt: 'notthere', alone: 'conflict', hope: 'relief' };
VIEWS.results = () => {
  const ck = S.ck; if (!ck || !ck.entry) return VIEWS.today();
  const e = ck.entry, r = rec(ck.pid), n = esc(nameOf(ck.pid)), self = ck.self, seen = e.by === 'observed';
  const need = ['edge', 'steady', 'strong'].map(l => PARTS.find(p => e.levels[p.key] === l)).find(Boolean);
  const st = need && PART_STORY[need.key];
  const words = `<ul class="w-words">${PARTS.map(p => e.levels[p.key] ? `<li style="--pc:${p.color}"><b>${p.part}</b><span>${esc(seen ? C.words[e.levels[p.key]].replace(/your tree/g, 'their tree').replace(/You don't/g, 'They don\'t') : C.words[e.levels[p.key]])}</span></li>` : `<li style="--pc:${p.color}"><b>${p.part}</b><span>Not sure today. That's okay.</span></li>`).join('')}</ul>`;
  const flags = (e.flags || []).filter(f => !seen).map(f => `<p class="w-flagnote"><b>${esc(C.flags[f].title)}.</b> ${esc(C.flags[f].note)}${GUIDE_FOR_FLAG[f] ? ` <button type="button" class="text-btn" onclick="W.guide('${GUIDE_FOR_FLAG[f]}')">A guide for this</button>` : ''}</p>`).join('');
  const sf = e.safety || {}, urgent = C.safety.urgent.includes(sf.choice) || sf.helper === 'yes';
  const tell = !urgent && (C.safety.tellTeam.includes(sf.choice) || sf.observed === 'yes');
  const tellText = sf.observed === 'yes' ? C.safety.observed.help : ((C.safety.options.find(o => o[0] === sf.choice) || [])[2] || '');
  return `<div class="w-head"><p class="w-eyebrow">${seen ? 'What you\'ve seen' : self ? 'Your tree today' : n + '\'s tree today'}</p><h2>${seen ? 'From what you see' : 'Here\'s how the tree is doing'}</h2>
    <p class="lead">${seen ? 'This is kept apart from ' + n + '\'s own answers, and doesn\'t add a ring. It helps their helpers and their hospice team notice what\'s changing.' : 'These are gentle words, not grades. Every part of a tree has seasons.'}</p></div>
    ${urgent ? `<div class="w-card w-urgent"><p class="w-eyebrow">Please reach out now</p>${linesHtml()}</div>` : ''}
    ${self && sf.home && sf.home !== 'yes' ? `<div class="w-card w-never"><p class="w-eyebrow">Only you see this</p><p>${esc(C.safety.home.help)}</p>${homeLines()}</div>` : ''}
    ${tell ? `<div class="w-card"><p class="w-eyebrow">Let the hospice team know</p><p>${esc(tellText)}</p>${linesHtml(true)}</div>` : ''}
    <div class="w-card w-treecard"><div class="w-treewrap">${willowSVG({ rings: ringsOf(r), label: 'The willow tree' })}<p class="w-rings">${seen ? 'No new ring' : ringsOf(r) === 1 ? 'A first ring' : ringsOf(r) + ' rings'}</p></div><div class="w-treetext">${words}</div></div>
    ${flags ? `<div class="w-card"><p class="w-eyebrow">Gently</p>${flags}</div>` : ''}
    ${need && !seen ? `<div class="w-card"><p class="w-eyebrow">One small thing</p><p>Today's practice in Today leans toward the ${esc(need.part.toLowerCase())}: ${esc(need.name.toLowerCase())}.</p><div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.go('today')">Go to Today</button>${!(r.matters || {}).who && ck.role === 'person' ? `<button type="button" class="btn btn-secondary" onclick="W.go('matters')">Write what matters</button>` : ''}</div></div>` : `<div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.go('today')">Go to Today</button></div>`}
    ${st ? `<div class="w-card w-story"><p class="w-eyebrow">A Grounded story</p><h3><a class="text-link" href="${storyUrl(st[0])}" target="_blank" rel="noopener">${esc(st[0])}</a></h3><p class="w-quote">${esc(st[1])}</p></div>` : ''}
    <p class="w-small" style="text-align:center">Stories from the bedside arrive by email. <a class="text-link" href="https://chri5j0y.substack.com/subscribe" target="_blank" rel="noopener">Subscribe to Grounded</a></p>`;
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
    <h3 class="section-title">${self ? 'Your own answers' : 'In their own words'} (${own.length})</h3><ul class="w-histlist">${own.map(row).join('') || '<li class="w-small">None yet.</li>'}</ul>
    ${obs.length ? `<h3 class="section-title">What helpers have seen (${obs.length})</h3><p class="w-small">Kept apart. These never add rings.</p><ul class="w-histlist">${obs.map(row).join('')}</ul>` : ''}
    <div class="btn-row"><button type="button" class="btn btn-secondary" onclick="W.go('today')">Back to Today</button></div>`;
};

/* ---------- printing (Save or print) ---------- */
function printHtml(title, html) {
  const box = $('#w-print'); if (!box) return;
  box.innerHTML = `<div class="w-pr"><p class="w-pr-brand">Willow&trade; by Grow With Grounded</p><h1>${esc(title)}</h1>${html}<p class="w-pr-foot">Kept in Willow, growwithgrounded.com/willow. &copy; ${new Date().getFullYear()} Chris Joy.</p></div>`;
  document.body.classList.add('w-printing');
  const done = () => { document.body.classList.remove('w-printing'); window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done);
  setTimeout(() => { window.print(); setTimeout(done, 1500); }, 60);
}
function needProfileHtml(what) {
  return `<div class="w-card w-empty"><p class="w-eyebrow">${esc(what)}</p><h3>This lives in a locked profile</h3><p>${esc(what)} is personal, so Willow keeps it in the person's own profile, locked with a passcode, on this device.</p><div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.begin()">Begin with Willow</button>${GP() && GGP.list().length ? `<button type="button" class="btn btn-secondary" onclick="W.open()">Open my profile</button>` : ''}</div></div>`;
}
function privateHtml(what) {
  return `<div class="w-card w-empty"><p class="w-eyebrow">${esc(what)}</p><h3>Kept private</h3><p>${esc(nameOf(target()))} keeps this private for now. That's their choice to make, and Willow honors it. They can change it any time in Settings.</p></div>`;
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
  ['never', 'Anything we should never do', F.intake.neverEx.replace(/"/g, '')]
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
    ${sees('faith') && r.faith ? `<div class="w-card w-faithsum"><p class="w-eyebrow">Faith, spirit, or something else</p><p>${faithSummary(r.faith)}</p>${r.faith.call ? `<p><b>Call:</b> ${esc(r.faith.call)}</p>` : ''}<p class="w-small">Asked in each check-in, ${self ? 'in your' : 'in their'} own words.</p></div>` : ''}
    <div class="w-matters">${MATTERS.map(x => field(x[0], x[1], x[2])).join('')}</div>
    <h3 class="section-title">When the time comes</h3>
    <p class="lead">Some people like to say how they want the last days to feel. Skip anything that doesn't fit.</p>
    <div class="w-matters">${VIGIL.map(x => field(x[0], x[1], x[2])).join('')}</div>
    <div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.saveMatters()">Save</button><button type="button" class="btn btn-secondary" onclick="W.readMatters()">Read it aloud</button><button type="button" class="btn btn-secondary" onclick="W.printMatters()">Save or Print</button></div>`;
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
  return MATTERS.concat(VIGIL).filter(x => m[x[0]]).map(x => `<h3>${esc(x[1])}</h3><p>${esc(m[x[0]]).replace(/\n/g, '<br>')}</p>`).join('') || '<p>Nothing written yet.</p>';
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
      <p class="w-small">${nice(c.date)}${c.by ? ', written down by ' + esc(c.by) : ''}</p>
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
  let h = `<div class="w-head"><p class="w-eyebrow">At the bedside</p><h2>What to do when you don't know what to do</h2><p class="lead">You don't have to say the perfect thing. You only have to stay. These are small, real things families and helpers can do, with how well each one is backed.</p></div>`;
  h += lineHtml();
  if (person && r.faith && (r.faith.trad || r.faith.never) && sees('faith')) {
    h += `<h3 class="section-title">${a && t === a.id ? 'Your' : n + '\'s'} faith</h3>`;
    if (r.faith.never) h += `<div class="w-card w-never"><p class="w-eyebrow">Never do</p><p>${esc(r.faith.never)}</p></div>`;
    if (r.faith.trad && F.cards[r.faith.trad]) h += cardHtml(r.faith.trad, (a && t === a.id ? 'Your' : n + '\'s') + ' tradition');
  } else if (person && r.matters && r.matters.never && sees('matters')) {
    h += `<div class="w-card w-never"><p class="w-eyebrow">Never do</p><p>${esc(r.matters.never)}</p></div>`;
  }
  h += `<h3 class="section-title">What helps</h3><div class="w-grid" data-read="Read these aloud">${P.bedside.map(x => `<div class="w-card w-tip"><h4>${esc(x[1])}</h4><p>${esc(x[2])}</p>${evTag(x[3])}</div>`).join('')}</div>`;
  h += `<h3 class="section-title">Care for the one keeping watch</h3><p class="lead">You can't pour from an empty cup, and this cup has been pouring a long time.</p><div class="w-grid" data-read="Read these aloud">${P.selfcare.map(x => `<div class="w-card w-tip"><h4>${esc(x[1])}</h4><p>${esc(x[2])}</p>${evTag(x[3])}</div>`).join('')}</div>`;
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
    <p class="lead"><b>How to show up.</b> What's happening, what to say, what not to say, and what helps. For families, and for the chaplains and doulas who sit with them.</p>
    <p class="w-tool">${esc(G.tool)}</p></div>
    <input class="lc-search" type="search" placeholder="Search: miracle, hell, burden, not eating, kids..." aria-label="Search the guides" value="${esc(st.find || '')}" oninput="W.gFind(this)" enterkeyhint="search">
    <div class="lc-chips" role="group" aria-label="Filter">
      <button class="lc-chip" style="--rc:var(--ink-soft)" aria-pressed="${st.ring === 'all'}" onclick="W.S.guide.ring='all';W.render()">All</button>
      ${G.rings.map(r => `<button class="lc-chip" style="--rc:${RING_COLOR[r[0]]}" aria-pressed="${st.ring === r[0]}" onclick="W.S.guide.ring='${r[0]}';W.render()">${esc(r[1])}</button>`).join('')}
    </div><div id="w-glist">${gListHtml()}</div>
    <p class="lc-note">${esc(G.foot)} These guides offer general spiritual and emotional support. They are not medical care, therapy, or legal advice. In danger now, call 911. Thinking about ending your life, call or text 988.</p>`;
  return h;
};
function gListHtml() {
  const st = S.guide; let h = '', n = 0;
  G.rings.filter(r => st.ring === 'all' || st.ring === r[0]).forEach(r => {
    const gs = G.guides.filter(g => g.ring === r[0] && gMatch(g, st.q)); if (!gs.length) return; n += gs.length;
    h += `<div class="lc-ring" style="--rc:${RING_COLOR[r[0]]}"><h3><i></i>${esc(r[1])}</h3><div class="lc-grid">${gs.map(g => {
      const first = g.parts.find(p => p[0] === 'what') || g.parts[0];
      return `<article class="lc-card" style="--rc:${RING_COLOR[r[0]]}"><span class="lc-label">Guide</span><h4>${esc(g.title)}</h4><p class="w-small">${esc(first[1])}</p><button class="btn btn-secondary" onclick="W.guide('${g.id}')">Open the guide</button></article>`;
    }).join('')}</div></div>`;
  });
  return n ? h : `<div class="lc-none"><p>No guides match "${esc(st.q)}." Try another word.</p></div>`;
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
    <div class="btn-row no-print" style="justify-content:space-between;align-items:center;margin:0 0 12px"><button class="lc-back" onclick="W.S.guide.open=null;W.render();W.top()">Back to all guides</button><button class="btn btn-secondary" onclick="W.printGuide('${g.id}')">Save or print this guide</button></div>
    <span class="lc-tag">${esc(ring ? ring[1] : '')}</span><h2>${esc(g.title)}</h2>
    <div data-read="Read this guide aloud">${body}</div>
    ${pro ? `<details class="w-det"><summary>${esc(G.labels.pro)}</summary><div><p>${esc(pro[1])}</p></div></details>` : ''}
    ${g.story ? `<h3>A Grounded story</h3><p><a class="text-link" href="${storyUrl(g.story)}" target="_blank" rel="noopener">${esc(g.story)}</a></p>` : ''}
    ${window.GGShelf ? GGShelf.html('willow', g.id) : ''}
    <p class="lc-note">${esc(G.foot)} From Willow&trade; by Grow With Grounded. General spiritual and emotional support, not medical care, therapy, or legal advice. &copy; ${new Date().getFullYear()} Chris Joy.</p>
  </article>`;
}
function openGuide(id) { S.guide.open = id; S.tab = 'guides'; render(); scrollTop(true); }
function printGuide(id) {
  const g = G.guides.find(x => x.id === id); if (!g) return;
  printHtml(g.title, g.parts.map(p => `<h3>${esc(G.labels[p[0]] || p[0])}</h3><p>${esc(p[1])}</p>`).join('') + `<p>${esc(G.foot)}</p>`);
}

/* ---------- Readings ---------- */
const RIGHTS = { pd: 'Public domain', grounded: 'Written for Willow', plain: 'In plain English' };
function myTrads() {
  const r = target() ? rec(target()) : null, f = r && r.faith, out = ['all'];
  if (f && f.trad && sees('faith')) { out.push(f.trad); if (CHRISTIAN.includes(f.trad)) out.push('christian'); }
  return out;
}
VIEWS.readings = () => {
  const st = S.read;
  if (st.open) { const x = RD.readings.find(y => y.id === st.open); if (x) return readingHtml(x); st.open = null; }
  const mine = myTrads(), hasMine = mine.length > 1;
  if (st.trad === 'mine' && !hasMine) st.trad = 'every';
  const filt = x => (st.trad === 'every' || (st.trad === 'mine' ? x.trad.some(t => mine.includes(t)) : x.trad.includes(st.trad) || (st.trad !== 'all' && CHRISTIAN.includes(st.trad) && x.trad.includes('christian')))) && (!st.q || (x.title + ' ' + x.by + ' ' + x.lines.join(' ')).toLowerCase().includes(st.q.toLowerCase()));
  const list = RD.readings.filter(filt);
  const tradOpts = [['every', 'Every reading'], ['all', 'For every tradition and in-between']].concat(F.intake.groups.flatMap(g => g[2].filter(id => RD.readings.some(x => x.trad.includes(id))).map(id => [id, faithName(id)])));
  return `<div class="lc-head"><p class="eyebrow">Readings</p><h2 class="section-title" style="margin-top:4px">Words to read aloud</h2>
    <p class="lead">Psalms, prayers, poems, and blessings for all faith traditions and everything in-between. Read slowly. Read it twice. Hearing is often the last sense to go.</p></div>
    <div class="w-readfilter">${hasMine ? `<button class="lc-chip" style="--rc:var(--gold)" aria-pressed="${st.trad === 'mine'}" onclick="W.S.read.trad='mine';W.render()">${isSelf() ? 'For me' : 'For ' + esc(nameOf(target()))}</button>` : ''}
      <label class="w-l w-inline" for="w-rtrad">Tradition</label><select id="w-rtrad" onchange="W.S.read.trad=this.value;W.render()">${tradOpts.map(o => `<option value="${o[0]}"${st.trad === o[0] ? ' selected' : ''}>${esc(o[1])}</option>`).join('')}</select></div>
    <input class="lc-search" type="search" placeholder="Search: shepherd, peace, river, home..." aria-label="Search the readings" value="${esc(st.q)}" onchange="W.S.read.q=this.value;W.render()">
    <div class="w-readlist">${list.map(x => `<button type="button" class="w-reading" onclick="W.reading('${x.id}')"><b>${esc(x.title)}</b><span>${esc(x.by)}</span><i>${esc(RIGHTS[x.rights] || '')}</i></button>`).join('') || '<p class="w-small">No readings match. Try another word or tradition.</p>'}</div>
    <h3 class="section-title">Songs families often ask for</h3><p>${RD.songs.map(esc).join(', ')}. Play a recording the family loves, or sing it. Off key counts.</p>
    <h3 class="section-title">Beloved writing to find in print</h3><p class="lead">Still under copyright, so Willow names them and you can find them in the book or online.</p>
    <ul class="w-linked">${RD.linked.map(l => `<li><b>${esc(l[0])}</b>, ${esc(l[1])}. In <i>${esc(l[2])}</i>. <span class="w-small">${esc(l[3])}</span></li>`).join('')}</ul>
    <h3 class="section-title">Words that stay with their people</h3><p class="lead">${esc(RD.rites)}</p>
    <ul class="w-linked">${RD.kept.map(k => `<li><b>${esc(k[0])}.</b> ${esc(k[1])}</li>`).join('')}</ul>`;
};
function readingHtml(x) {
  let body = '';
  x.lines.forEach(l => { body += l === '' ? '<br>' : `<p>${esc(l)}</p>`; });
  return `<article class="lc-article w-readingview" style="--rc:var(--gold)">
    <div class="btn-row no-print" style="justify-content:space-between;align-items:center;margin:0 0 12px"><button class="lc-back" onclick="W.S.read.open=null;W.render();W.top()">Back to readings</button><button class="btn btn-secondary" onclick="W.printReading('${x.id}')">Save or Print</button></div>
    <h2>${esc(x.title)}</h2><p class="w-small">${esc(x.by)} &middot; ${esc(RIGHTS[x.rights] || '')}</p>
    <div class="w-readtext" data-read="Read this aloud">${x.tr ? `<p class="w-tr">${esc(x.tr)}</p>` : ''}${body}</div>
  </article>`;
}
function openReading(id) { S.read.open = id; S.tab = 'readings'; render(); scrollTop(true); }
function printReading(id) {
  const x = RD.readings.find(y => y.id === id); if (!x) return;
  printHtml(x.title, (x.tr ? `<p><i>${esc(x.tr)}</i></p>` : '') + x.lines.map(l => l ? `<p>${esc(l)}</p>` : '<br>').join('') + `<p><small>${esc(x.by)}</small></p>`);
}

/* ---------- Settings ---------- */
const SHARE_ROWS = [
  ['tree', 'How my tree is doing', 'The gentle words for each part, never the answers.'],
  ['matters', 'What Matters to Me', 'So helpers can read it to nurses, aides, and visitors.'],
  ['cuttings', 'Cuttings', 'Stories, letters, and blessings you\'re leaving.'],
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
    if (lr) h += `<section id="w-set-line"><h3>Hospice 24/7 line</h3><p class="w-small">Shown at the top of Today and in every safety step${self && person ? '' : ', for ' + esc(lw)}. Call it first, day or night.</p>
      <label class="w-l" for="w-ln">Hospice name</label><input type="text" id="w-ln" maxlength="80" value="${esc(lr.line.name)}" placeholder="Our hospice">
      <label class="w-l" for="w-lp">24/7 phone number</label><input type="tel" id="w-lp" maxlength="30" value="${esc(lr.line.phone)}" placeholder="320-555-0100">
      <div class="btn-row"><button type="button" class="btn btn-primary btn-sm" onclick="W.saveLine()">Save the number</button></div></section>`;
    if (self && person) {
      h += `<section id="w-set-share"><h3>What helpers see</h3><p class="w-small">Helpers open your Willow with their own passcode. They see only what's switched on here. Your safety answers about home are never shared.</p>
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
  h += `<section><h3>Reading and Text</h3><div class="btn-row"><button type="button" class="btn btn-secondary btn-sm" onclick="cycleTextSize()">Change text size</button></div></section>
    <p class="w-small">Everything in Willow stays on this device, locked in each person's own profile. <a class="text-link" href="/privacy.html#willow">How Willow keeps things private</a></p></div>`;
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
  GGP.addHelper(t, hid, pass).then(() => { toast(nameOf(hid) + ' is now a helper.'); openSettings('helpers'); render(); }).catch(e => toast(e && e.message ? e.message : 'That did not work. Try again.'));
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
   Share with my chaplain or doula: check-ins, and only what the person chose to share. Never the home safety answer.
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
    <p class="lead">${self ? 'Choose what goes.' : 'You can share only what ' + n + ' chose to share with helpers.'} They scan a code on this screen with their Field Guide, and you read them two words and a number, out loud. Nothing passes through Grounded.</p></div>
    <div class="w-card">
      ${row('checkins', 'Check-ins', `The last ${cks.length === 1 ? 'one' : cks.length}, with answers. Your chaplain or doula sees how each part is doing.`, sees('tree') ? 'No check-ins yet.' : n + ' keeps this private.')}
      ${row('faith', 'Faith answers', 'Tradition, how it\'s lived out, who to call, and anything never to do.', !sees('faith') ? n + ' keeps this private.' : 'Not answered yet.')}
      ${row('matters', 'What Matters and vigil wishes', 'In ' + (self ? 'your' : 'their') + ' own words.', !sees('matters') ? n + ' keeps this private.' : 'Nothing written yet.')}
      ${row('notes', 'Notes from check-ins', 'Anything written at the end of a check-in.', !sees('answers') ? 'Kept private.' : 'No notes yet.')}
      <p class="w-small">Never shared: the answer about feeling safe at home.</p>
      <div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.shareMake()">Make the code</button><button type="button" class="btn btn-secondary" onclick="W.go('today')">Not now</button></div>
    </div>`;
};
function sharePick(k, v) { SHARE_PICK[k] = !!v; }
function shareMake() {
  const a = me(), t = target(), r = rec(t); if (!a || !r || !GB()) { toast('Sharing needs a newer browser.'); return; }
  const d = { n: first((GGP.get(t) || a).name), d: today(), by: first(a.name), role: roleOf(t) };
  if (SHARE_PICK.checkins && sees('tree')) d.ck = (r.checkins || []).slice(-4).reverse().map(c => {
    const o = { id: c.id, d: c.date, q: c.quick ? 1 : 0, by: c.by, h: first(c.helper), role: c.role, a: c.answers, sc: c.sc, fl: c.flags || [], v: c.v || 1,
      sf: { choice: (c.safety || {}).choice || '', observed: (c.safety || {}).observed || '', helper: (c.safety || {}).helper || '' } };
    if (SHARE_PICK.notes && sees('answers') && c.note) o.note = String(c.note).slice(0, 600);
    return o;
  });
  if (SHARE_PICK.faith && sees('faith') && r.faith) d.f = { trad: r.faith.trad || '', own: r.faith.own || '', matters: r.faith.matters || '', lives: r.faith.lives || [], changed: r.faith.changed || '', call: r.faith.call || '', never: r.faith.never || '', date: r.faith.date || '' };
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
    <div class="btn-row"><button type="button" class="btn btn-primary" onclick="W.visitOpen()">Open it</button><button type="button" class="btn btn-secondary" onclick="W.go('today')">Not now</button></div></div>`;
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

/* ---------- links: #for=id, #checkin, #quick, #guides, #guide=id, #readings, #reading=id, #bedside, #matters, #cuttings, #about ---------- */
function fromHash() {
  const h = decodeURIComponent(location.hash || '').slice(1); if (!h) return false;
  const [k, v] = h.split('=');
  if (k === 'for' && v) { S.pid = v; S.tab = 'today'; }
  else if (k === 'checkin' || k === 'quick') { setTimeout(() => startCheckin(k === 'quick'), 50); return true; }
  else if ((k === 'guide' || k === 'life') && v) { S.guide.open = v; S.tab = 'guides'; }
  else if (k === 'guides' || k === 'life' || k === 'talk') S.tab = 'guides';
  else if (k === 'reading' && v) { S.read.open = v; S.tab = 'readings'; }
  else if (['readings', 'bedside', 'matters', 'cuttings', 'about', 'today'].includes(k)) S.tab = k;
  else return false;
  render(); setTimeout(() => scrollTop(true), 80); return true;
}
window.addEventListener('hashchange', fromHash);
window.addEventListener('gg-bridge', e => { if (e.detail && e.detail.dest === 'willow') { S.tab = 'today'; render(); } });

/* ---------- start ---------- */
window.W = window.W || {};
Object.assign(window.W, {
  S, go, render, begin, setup, newPerson, existing, view, open: openProfile, lock, top: () => scrollTop(true),
  checkin: startCheckin, step, who, answer, faith, safe, finish, did, another, addLog,
  saveMatters, readMatters, printMatters, newCut, cutKind, saveCut, delCut, printCut,
  guide: openGuide, gList, gFind, printGuide, reading: openReading, printReading,
  settings: openSettings, closeSettings, saveLine, share, addHelper: addHelperNow, dropHelper, remember, unremember,
  sharePick, shareMake, visitOpen, visitAdd, visitDrop, INV,
  _theyify: theyify
});
const yr = $('#copyright-year'); if (yr) yr.textContent = new Date().getFullYear();
document.querySelectorAll('#client-nav .nav-btn[data-icon]').forEach(b => { if (!b.querySelector('.nav-ico')) b.insertAdjacentHTML('afterbegin', `<span class="nav-ico">${icon(b.dataset.icon, 22)}</span>`); });
applyTS();
if (!fromHash()) render();
if (GP()) {
  GGP.on(type => { if (type === 'change' || type === 'data' || type === 'ready') { if (S.tab !== 'checkin') render(); else renderBar(); } });
  GGP.ready.then(() => { if (S.tab !== 'checkin') render(); });
}
function readyRead() { const R = window.GGRead; if (!R) return; try { R.setProfile({ pref: 'female', rate: 0.88, key: 'gg_voice_willow' }); } catch (e) {} if (S.tab !== 'checkin') render(); }
if (window.GGRead) readyRead(); else window.addEventListener('ggread-ready', readyRead, { once: true });
})();
