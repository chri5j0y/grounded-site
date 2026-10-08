/* =====================================================================
   BIRCH . the app (GWG BLD 742)
   The Grow With Grounded tree for young adults, 18 to 26, between Pine
   (grades 9 to 12) and Oak (adults, 26 to 60). Built from Pine's newest
   structures (the app, the game layer, Faith or Plain) with Oak's and
   Sequoia's adult pieces (adult privacy, adult faith rules, helpers in
   Sequoia's model, adult help lines). Where they differ, Oak and Sequoia
   win on privacy and safety, and Pine wins on structure and voice.

   Where the words live (edit them there, not here)
     birch/checkin.js     the question bank, My Season, Faith or Plain wording,
                          flags, safety step, help lines, the optional
                          betting question (BIRCH_CHECKIN)
     birch/practices.js   the practice library: parts, practices, how-to guides (BIRCH_PRACTICES)
     birch/groundwork.js  the Groundwork chapters, prompts, and Skills I've Got (BIRCH_GROUNDWORK)
     shared/gg-journey.js the twelve weeks, anchors, and movement levels (AGES.birch)

   What is saved, and where
   - Everything stays on this device, locked in the person's own Grounded
     profile under "birch": history (check-ins), tend (daily tending and the
     game layer, game state in tend.bc), groundwork (the notebook and skills),
     wording ('faith' or 'plain'), seasons (My Season ids), askOpt (the
     optional question), birthday (optional, for the Oak card at 26, GGP.moveOn), setup,
     oakBrought, pineBrought, helpersOn and share (helpers), movedToOak.
   - A Birch profile is an adult profile: age "adult" with the tree set to
     'birch' (GGP.tree). Any adult profile opened here tends a Birch tree;
     one whose tree is Oak or Sequoia sees a gentle note, never a block.
   - Only the person's own passcode opens it. There is no grown-up alert and
     nothing is ever sent to anyone (ALERT_KINDS is empty).
   - Save to a file writes a passcode-locked file (shared/gg-filelock.js).

   Helpers (Sequoia's model, only when the person turns it on)
   - Add a Helper is off by default. Only the person can turn it on, in Settings.
   - A helper opens the person's Birch with their own passcode (GGP.addHelper)
     and sees only what the person shares: the levels of the tree, the
     growth plan, notes, and Roots, each by choice. Faith and notes start
     private. Never the safety step, flags, help notes, the optional
     question (BIRCH_CHECKIN.NEVER_SHARE), or Groundwork.
   - A helper can sit with the person for a check-in (they answer, the
     helper taps). That check-in skips the safety step, which the person
     answers on their own, and is marked answeredBy 'tapped'.

   The game layer, Pine's (decision 13), through the gg-tend.js hooks
   - Mastery: a practice moves Tried, Building, Mine as it is checked off.
   - Tree levels: named stages as days tended grow. Days tended never go down.
   - Milestones: first day, first ring, first full week, all six in a day,
     each season, and Skills I've Got in Groundwork.
   - Balance bonus: all six parts tended in one week (Monday to Sunday).
   - Steady by default. Hardy, which the person can choose, shows trouble on a
     part left untended a long while, and one practice heals it.
   - No leaderboards, no random rewards, no streak shame. Everything pauses its
     penalties for 14 days after a check-in flags losing hope or feeling alone.

   When Life Changes (GWG BLD 743): Birch's own guides, built like Pine's.
   The words live in birch/guides.js (BIRCH_GUIDES = {rings, links, topics}); the
   videos in birch/guide-videos.js, played by shared/gg-learn.js. Two views: For
   You (the young adult) and For the Helper. Faith lines show as written, under
   the adult faith rules. Oak's guides stay one quiet tap away (/oak/#life).
   ===================================================================== */
let PROF = null;      // the open Birch profile: { id, name, avatar, age }
let HELP = null;      // the id of the person a helper is helping, while in helper view

/* ---------- the practice library (birch/practices.js) ----------
   Sequoia's shapes: DOMAIN_DEFS (key, name, color, group, prompt, restore,
   strength_msg, growth_steps), GUIDES ("part|Name": {why, today, build, hard, vary,
   adapt}), META, NEW, EV, DISC, SHELF, FLAGS, plus Plain variants for spiritual
   practices (PLAIN "part|Name": {name, line, why, today, build, hard}, or a
   guide's own plain: {...}). */
const SP = window.BIRCH_PRACTICES || {};
function spGet() { for (let i = 0; i < arguments.length; i++) if (SP[arguments[i]] != null) return SP[arguments[i]]; return null; }
const PART_COLORS = { roots: 'var(--p-roots)', trunk: 'var(--p-trunk)', bark: 'var(--p-bark)', branches: 'var(--p-branches)', leaves: 'var(--p-leaves)', fruit: 'var(--p-fruit)' };
const PART_GROUP = { roots: 'root', trunk: 'root', bark: 'root', branches: 'branch', leaves: 'branch', fruit: 'branch' };
const PART_NAMES = { roots: 'What grounds you', trunk: 'Purpose', bark: 'Mind and feelings', branches: 'Relationships', leaves: 'Body', fruit: 'Hope' };
const DOMAIN_DEFS = (function () {
  let raw = spGet('DOMAIN_DEFS', 'domainDefs', 'domains', 'parts') || [];
  if (!Array.isArray(raw)) raw = Object.keys(raw).map(k => Object.assign({ key: k }, raw[k]));
  const by = {}; raw.forEach(d => { if (d && d.key) by[d.key] = d; });
  return ['roots', 'bark', 'trunk', 'fruit', 'leaves', 'branches'].map(k => {
    const d = Object.assign({}, by[k] || {});
    d.key = k; d.name = PART_NAMES[k]; d.color = PART_COLORS[k]; d.group = d.group || PART_GROUP[k];
    d.prompt = d.prompt || ''; d.restore = (d.restore || []).map(r => Array.isArray(r) ? r.slice() : [r.name || r.n, r.text || r.t || '']);
    d.strength_msg = d.strength_msg || d.strength || ''; d.growth_steps = d.growth_steps || d.steps || [];
    return d;
  });
})();
const GUIDES = Object.assign({}, spGet('GUIDES', 'guides') || {}, spGet('G') || {});
const META = spGet('META', 'meta') || {};
const NEW = spGet('NEW', 'added') || {};
const EV = spGet('EV') || { W: 'Well studied', S: 'Some evidence', E: 'Early research', T: 'Rooted in tradition' };
const DISC = spGet('DISC') || { C: 'Contemplative and prayer', B: 'Body and breath', R: 'Relationships', W: 'Writing and creativity', S: 'Service and generosity', L: 'Study and learning', N: 'Nature', Z: 'Rest and sabbath' };
const SHELF = spGet('SHELF', 'shelf') || {};
const PLAIN_P = spGet('PLAIN', 'plain') || {};
DOMAIN_DEFS.forEach(d => {
  const have = new Set(d.restore.map(r => r[0]));
  (NEW[d.key] || []).forEach(r => { const row = Array.isArray(r) ? r : [r.name || r.n, r.text || r.t || '']; if (row[0] && !have.has(row[0])) { d.restore.push(row); have.add(row[0]); } });
});
// Plain wording for a practice (decision 8). The saved name never changes, so a plan
// and its checkmarks stay whole when the wording changes; only the shown words do.
function plainOf(key, name) {
  if (!isPlain()) return null;
  const k = key + '|' + name, g = GUIDES[k] || {};
  return PLAIN_P[k] || g.plain || null;
}
function shownName(key, name) { const p = plainOf(key, name); return (p && (p.n || p.name)) || name; }
function shownLine(key, name, line) { const p = plainOf(key, name); return (p && (p.d || p.line || p.text)) || line; }
const PLAIN_PARTS = spGet('PLAIN_PARTS') || {}, PLAIN_SHELF = spGet('PLAIN_SHELF') || {};
// A part's words in the current wording (Roots has its own Plain prompt, strength line, and steps).
function partDef(d) { const p = isPlain() && PLAIN_PARTS[d.key]; return p ? Object.assign({}, d, p) : d; }

// =====================================================================
// HELPERS
// =====================================================================
function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => t.classList.remove('show'), 3200);
}
function formatDate(isoDate) {
  if (!isoDate) return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const d = new Date(String(isoDate).slice(0, 10) + 'T00:00:00');
  if (isNaN(d)) return isoDate;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
const todayKey = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };

// =====================================================================
// BIRCH: THE SIX PARTS, in words for young adults
// =====================================================================
const CKB = window.BIRCH_CHECKIN || {};
const DOMAIN_BY_KEY = {};
DOMAIN_DEFS.forEach(d => { DOMAIN_BY_KEY[d.key] = d; });
const CK_PART = {}; (CKB.parts || []).forEach(p => { CK_PART[p.key] = p; });

const PARTS = {
  roots: {
    part: 'Roots', icon: 'roots',
    treeLabel: 'What roots do for a birch', youLabel: 'What your roots do for you',
    tree: 'A birch spreads its roots wide and close to the surface, holding on in thin soil where few trees can. Roots are why a young tree stays standing in the wind.',
    you: 'Your roots are what holds you steady: peace inside, the people and traditions you come from, and faith, if faith is part of your life. These are years for making your roots your own, keeping what holds and choosing what you will grow.',
    plainYou: 'Your roots are what holds you steady: peace inside, the people and traditions you come from, and the values you live by. These are years for making your roots your own, keeping what holds and choosing what you will grow.',
    health: ['You have something steady to come back to when life gets loud.', 'You make time to be quiet and know yourself.', 'You can bring your honest questions without fear.'],
    stress: ['Nothing feels solid when life shakes.', 'Something about faith, a community, or what you were raised with leaves you feeling not good enough.', 'You feel empty, like something is missing.'],
    plainStress: ['Nothing feels solid when life shakes.', 'Rules or beliefs you were raised with leave you feeling not good enough.', 'You feel empty, like something is missing.']
  },
  trunk: {
    part: 'Trunk', icon: 'trunk',
    treeLabel: 'What the trunk does for a birch', youLabel: 'What your trunk does for you',
    tree: 'Birches often grow two or three trunks from one root, each reaching for its own light. The trunk carries everything the tree is becoming.',
    you: 'Your trunk is purpose: what you care about, what you are good at, and where you are headed in work, school, service, or the life you are building. You do not need it all figured out. A direction is enough.',
    health: ['You know what you care about enough to act on.', 'You can name something you are good at, or getting better at.', 'You have a next step, even a small one.'],
    stress: ['Days feel like going through the motions.', 'Other people\'s plans for you feel louder than your own.', 'Comparing your path with everyone else\'s leaves you feeling behind.']
  },
  bark: {
    part: 'Bark', icon: 'bark',
    treeLabel: 'What bark does for a birch', youLabel: 'What your bark does for you',
    tree: 'Birch bark is thin and white, and it peels and renews as the tree grows. It carries its marks and keeps the tree whole.',
    you: 'Your bark is your mind and feelings: how you handle stress, setbacks, money worries, and everything adult life asks of you. Strong bark is not about never getting hurt. It is about healing well.',
    health: ['You have real ways to calm down when stress climbs.', 'You can make a mistake and keep going.', 'You can name what you are feeling, and ask for help when you need it.'],
    stress: ['Worry or sadness has settled in and stayed.', 'You are hard on yourself most of the time.', 'Stress shows up as poor sleep, snapping at people, or shutting down.']
  },
  branches: {
    part: 'Branches', icon: 'branches',
    treeLabel: 'What branches do for a birch', youLabel: 'What your branches do for you',
    tree: 'Birch branches are light and flexible, and they bend in the wind instead of breaking. Birches grow in stands, the first trees to make a home in new ground.',
    you: 'Your branches are your people: friends, family by blood or by choice, roommates, coworkers, a partner if you have one, and the people in your corner. Who shows up for you, and who you show up for.',
    health: ['You have at least one person you can be real with.', 'You can say no and still belong.', 'You know who you could call if something went wrong.'],
    stress: ['You feel alone, even around people.', 'A friendship or relationship leaves you feeling worse about yourself.', 'Someone is controlling, threatening, or hurting you.']
  },
  leaves: {
    part: 'Leaves', icon: 'leaf',
    treeLabel: 'What leaves do for a birch', youLabel: 'What your leaves do for you',
    tree: 'Birch leaves flutter in the lightest breeze and turn gold in the fall. They turn light into energy for the whole tree, and they are the first place stress shows.',
    you: 'Your leaves are your body: Move, Rest, and Nourish. Sleep, movement, food, your phone, and how you cope all live here, on any schedule, shift work included. This part asks about what your body allows, never about looking a certain way.',
    health: ['You get enough sleep most nights, whatever your schedule.', 'You move in ways you enjoy.', 'You eat real meals that give you energy.'],
    stress: ['You run on too little sleep.', 'Your phone keeps you up or keeps you scrolling.', 'You lean on drinking, cannabis, or other things to get through.']
  },
  fruit: {
    part: 'Fruit', icon: 'fruit',
    treeLabel: 'What catkins do for a birch', youLabel: 'What your fruit does for you',
    tree: 'Birch catkins hold tiny seeds that ride the wind to new ground. A birch is often the first tree to grow where nothing grew before.',
    you: 'Your fruit is hope: something worth looking forward to, a way to get there, and the belief that things can get better. Hope is a skill you can grow.',
    health: ['You can name something you are looking forward to.', 'You can picture a way through hard things.', 'You notice good moments and keep them.'],
    stress: ['The future feels closed or pointless.', 'It feels like trying does not matter.', 'You have stopped expecting anything good.']
  }
};
const PART_ORDER = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];
PART_ORDER.forEach(k => Object.assign(DOMAIN_BY_KEY[k], { part: PARTS[k].part, icon: PARTS[k].icon }));
const ALL_DOMAINS = PART_ORDER.map(k => DOMAIN_BY_KEY[k]);
function partLine(k) { const p = CK_PART[k] || {}; return (isPlain() && p.plainLine) || p.line || ''; }

// PRACTICE GUIDES, ICONS
const FLAGS_P = spGet('FLAGS') || {};
function practiceMeta(key, name) {
  const m = (META[key] || {})[name], f = FLAGS_P[key + '|' + name] || {};
  const fit = f.seated ? '<span class="pm-tag pm-fit">Seated or low energy</span>' : '';
  if (!m) return fit ? `<span class="pm-tags">${fit}</span>` : '';
  return `<span class="pm-tags"><span class="pm-tag">${DISC[m[0]] || ''}</span><span class="pm-tag">${m[1]}</span><span class="pm-tag pm-ev pm-ev-${m[2]}">${EV[m[2]] || ''}</span>${fit}</span>`;
}
function shelfHtml(key) {
  const list = (isPlain() && PLAIN_SHELF[key]) || SHELF[key] || []; if (!list.length) return '';
  return `<details class="shelf"><summary>Resource shelf</summary><ul>${list.map(r => `<li>${r[1] ? `<a class="text-link" href="${r[1]}" target="_blank" rel="noopener">${r[0]}</a>` : `<strong>${r[0]}</strong>`}<span>${r[2]}</span></li>`).join('')}</ul></details>`;
}
function guideHtml(key, name) {
  const g0 = GUIDES[key + '|' + name];
  if (!g0) return '';
  const pl = plainOf(key, name), g = Object.assign({}, g0, (pl && (pl.g || pl)) || {});
  let s = `<p><strong>Why it helps.</strong> ${g.why || ''}</p>
    <p><strong>Try it today.</strong> ${g.today || ''}</p>
    <p><strong>Build it.</strong> ${g.build || ''}</p>
    <p><strong>If it's hard.</strong> ${g.hard || ''}</p>`;
  if (g.vary && !isPlain()) s += `<p><strong>For different beliefs.</strong> ${g.vary}</p>`;
  const m = (META[key] || {})[name];
  if (m && m[3]) s += `<p class="guide-src"><a class="text-link" href="${m[3]}" target="_blank" rel="noopener">Learn more at the source</a></p>`;
  if (g.adapt) s += '<p><strong>Seated or low energy.</strong> ' + g.adapt + '</p>';
  if (window.GGSources) s += GGSources.line(GGSources.practiceList(name, 'birch'), { practice: true });
  return s;
}
function toggleGuide(btn) {
  const g = btn.nextElementSibling;
  const open = g.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  btn.innerHTML = open ? 'Hide guide &uarr;' : 'How to do this &darr;';
}

// =====================================================================
// ICONS
// =====================================================================
const ICONS = {
  roots: '<path d="M3 7h18"/><path d="M12 2.5V7"/><path d="M12 7v5c0 3.5-2.5 6-5 8.5"/><path d="M12 12c0 3.5 2.5 6 5 8.5"/><path d="M12 10.5c-2 1-5 1.5-8 3.5"/><path d="M12 10.5c2 1 5 1.5 8 3.5"/><path d="M12 14v7"/>',
  trunk: '<circle cx="12" cy="12" r="9"/><path d="M12 5.5a6.5 6.5 0 1 1-6.5 6.5"/><circle cx="12" cy="12" r="3.2"/>',
  bark: '<rect x="5" y="2.5" width="14" height="19" rx="3.5"/><path d="M9.5 5.5c1.2 2-1.2 3.5 0 5.5s-1.2 3.5 0 5.5"/><path d="M14.5 7c1.2 2-1.2 3.5 0 5.5s-1 3 0 4.5"/>',
  branches: '<path d="M12 21.5V10"/><path d="M12 14.5L6 9"/><path d="M12 11.5l5.5-5.5"/><path d="M6 9V4.5"/><path d="M6 9H2.5"/><path d="M17.5 6h3.5"/><path d="M17.5 6V2.5"/>',
  leaf: '<path d="M4.5 19.5C4.5 11 10 4.5 20 3.5c-.5 10-6.5 16-15.5 16z"/><path d="M4.5 19.5l9-9"/><path d="M9.5 14.5h3.5"/><path d="M12 12V8.5"/>',
  fruit: '<path d="M12 8.5c-4.5-2.2-8.5 1-8.5 6 0 4.2 3.2 7.5 5.8 7 1.2-.2 1.6-.7 2.7-.7s1.5.5 2.7.7c2.6.5 5.8-2.8 5.8-7 0-5-4-8.2-8.5-6z"/><path d="M12 8.5c0-2.2 1-4.2 3.2-5.5"/><path d="M12.5 5.5c-2-.3-3.6-1.4-4.3-3"/>',
  can: '<path d="M4 10h11v8.5a2.5 2.5 0 0 1-2.5 2.5h-6A2.5 2.5 0 0 1 4 18.5z"/><path d="M15 12.5l5.5-4.5"/><path d="M20.5 8l1-1.5"/><path d="M7 10V7.5a2.5 2.5 0 0 1 5 0V10"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/>',
  door: '<path d="M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21"/><path d="M3 21h18"/><circle cx="14.5" cy="12.5" r="1"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle cx="12" cy="15" r="1.2"/>',
  path: '<path d="M6 21c0-4 3-5 6-7s5-4 5-8"/><path d="M14 3.5l3 2.5 2.5-3"/><circle cx="6" cy="21" r="0.6"/><path d="M4 12h3M9 9h2"/>',
  rings: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.8"/><circle cx="12" cy="12" r="2.6"/>'
};
function icon(name, size) {
  return `<svg class="icon" width="${size || 22}" height="${size || 22}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}
function partIcon(d, size) { return icon(d.icon, size); }

// =====================================================================
// THE SIX-PIECE PUZZLE TREE, drawn as the birch in the Birch mark
// variant: 'color' (part colors), 'score' (shaded by score), 'hero'
// The mark's own tree (shared/marks/birch.svg, Two Trunks) scaled into this
// view (trunk bases near x 200, ground at y 292). Roots: wide and shallow, as
// birch roots grow. Trunk: the two white trunks. Bark: the dark marks on them.
// Branches: the limbs. Leaves: the airy crown (kind 'blobs'). Fruit: catkins.
// =====================================================================
const TREE_SHAPES = {
  roots: {
    kind: 'taper', dx: 0, dy: 16, delay: 0,
    paths: [
      ['M186 296 C166 304 136 310 96 314', 8, 1.6],
      ['M214 296 C234 304 264 310 304 314', 8, 1.6],
      ['M192 298 C182 312 170 324 152 334', 6.5, 1.2],
      ['M210 298 C220 312 232 324 250 334', 6.5, 1.2],
      ['M200 299 C200 312 199 322 196 332', 5, 1],
      ['M100 313 C88 317 76 322 62 328', 3, 1],
      ['M300 313 C312 317 324 322 338 328', 3, 1],
      ['M154 333 C148 340 142 345 134 350', 2.4, .8],
      ['M248 333 C254 340 260 345 268 350', 2.4, .8],
      ['M140 309 C130 316 120 320 108 326', 2, .6],
      ['M262 309 C272 316 282 320 294 326', 2, .6]
    ]
  },
  // the two slender white trunks of the mark
  trunk: { kind: 'fill', dx: 0, dy: 12, delay: 0.25, paths: ['M172.8 292 Q182.4 279.2 183.4 253.6 L184 100 H193.6 L194.2 253.6 Q195.2 279.2 204.8 292Z', 'M199.4 292 Q207.4 279.2 208 253.6 L208.6 144.8 H217 L217.6 253.6 Q218.2 279.2 226.2 292Z'] },
  // the dark bark marks: [x, y, length]
  bark: { kind: 'marks', dx: 0, dy: 0, delay: 0.45, marks: [[185.6, 276, 5.1], [184.6, 247.2, 5.8], [184, 222.9, 7.7], [185.6, 201.1, 4.8], [186.9, 177.1, 5.1], [184.6, 150.6, 6.7], [184.6, 125.3, 5.4], [210.2, 276, 6.1], [210.6, 253.3, 5.1], [209, 227.7, 5.4], [209.3, 199.2, 6.7], [209.6, 171, 6.4]] },
  // the limbs, reaching out from both trunks
  branches: { kind: 'taper', dx: 0, dy: -8, delay: 0.65, paths: [['M188.8 151.2 C172.8 138.4 156.3 127.7 139.2 119.2', 6, 2.2], ['M195.2 132 C209.1 119.2 224.5 109.6 241.6 103.2', 6, 2.2], ['M185.6 189.6 C173.9 181.1 162.7 174.7 152 170.4', 6, 2.2], ['M200 170.4 C212.8 161.9 225.6 155.5 238.4 151.2', 6, 2.2]] },
  // the airy crown: [x, y, r, layer] (layer 0 shade, 1 body, 2 light), and the fine hanging tips
  leaves: { kind: 'blobs', dx: 0, dy: -12, delay: 0.85,
    blobs: [[134.7, 73.4, 13.8, 0], [146.6, 139.4, 19.2, 0], [263.7, 101.6, 22.1, 0], [213.1, 133, 21.4, 0], [134.7, 68, 21.8, 0], [212.5, 157.9, 14.1, 0], [137.3, 66.4, 15, 0], [162.6, 164.6, 20.5, 0], [142.4, 129.8, 17.6, 0], [138.6, 60, 16, 0], [223, 161.4, 19.2, 0], [144, 122.1, 13.8, 0], [225, 134.6, 21.8, 0], [190.4, 152.5, 16.6, 0], [187.5, 180, 20.5, 0], [144, 153.8, 19.8, 0], [144.6, 154.1, 16.3, 0], [195.8, 120.8, 15, 0], [124.5, 102.6, 13.4, 0], [203.8, 160.2, 21.1, 0], [201, 58.7, 21.4, 0], [138.6, 144.2, 13.4, 0], [241.9, 93.9, 11.5, 1], [112, 123, 15.7, 1], [206.4, 143.5, 18.2, 1], [271.7, 93.9, 16.3, 1], [185.6, 109, 11.8, 1], [220.2, 127.5, 10.9, 1], [153, 164.3, 16.6, 1], [239.7, 122.7, 12.8, 1], [249, 76.3, 13.4, 1], [270.4, 85.9, 14.1, 1], [201.3, 119.8, 15.7, 1], [177.9, 145.8, 11.5, 1], [246.1, 111.8, 17, 1], [172.5, 161.8, 16.3, 1], [196.2, 77.9, 11.5, 1], [187.2, 131, 17, 1], [218.6, 96.2, 16, 1], [267.2, 95.5, 16, 1], [217.3, 81.8, 16, 1], [228.2, 59.4, 12.5, 1], [164.5, 121.1, 12.5, 1], [225.9, 137.4, 8.6, 2], [161.3, 162.4, 12.5, 2], [278.4, 114.7, 13.8, 2], [199, 68.6, 8.3, 2], [156.8, 116, 8.3, 2], [213.1, 44.6, 9.3, 2], [140.5, 64.5, 11.8, 2], [231.4, 82.1, 12.5, 2], [225.9, 137.8, 11.2, 2], [203.5, 137.8, 13.8, 2], [256.6, 122.1, 14.1, 2], [176.3, 55.8, 12.5, 2], [201.6, 137.1, 12.2, 2], [202.2, 39.5, 8.6, 2], [183.4, 168.5, 12.8, 2], [176, 47.5, 12.8, 2], [149.1, 158.6, 13.1, 2], [206.1, 135.8, 10.9, 2], [177, 139, 13.4, 2], [154.9, 72.5, 9.9, 2], [191.7, 49.4, 12.2, 2]],
    tips: [[129.6, 132, 157.6], [142.4, 151.2, 176.8], [244.8, 132, 160.8], [257.6, 144.8, 180], [155.2, 164, 189.6], [232, 164, 189.6]] },
  fruit: { kind: 'catkins', dx: 0, dy: -18, delay: 1.1, cats: [[148.8, 144.8], [225.6, 125.6], [180.8, 164], [244.8, 157.6], [168, 106.4], [206.4, 100], [129.6, 132]] }
};
const PIECE_FOR = { roots: 'roots', trunk: 'trunk', bark: 'bark', branches: 'branches', leaves: 'leaves', fruit: 'fruit' };
const DRAW_ORDER = ['branches', 'trunk', 'bark', 'leaves', 'fruit', 'roots'];
// Results: the Birch mark's own colors, each part shaded by its score
const LOGO_COLORS = { roots: '#9A7A55', trunk: '#F4F1EA', bark: '#2C2C2A', branches: '#5A4A3C', leaves: '#79A84E', fruit: '#7F6610' };
const HERO_COLORS = { roots: '#E8D6B6', trunk: '#FFFFFF', bark: '#DECAA9', branches: '#EEE0C6', leaves: '#FAF6EE', fruit: '#F3E7D1' };

// Turns a single curve into a filled shape that tapers from w0 to w1
function taperPath(d, w0, w1) {
  const n = d.match(/-?\d+(\.\d+)?/g).map(Number);
  const [x0, y0, x1, y1, x2, y2, x3, y3] = n;
  const pt = t => { const u = 1 - t; return [u*u*u*x0 + 3*u*u*t*x1 + 3*u*t*t*x2 + t*t*t*x3, u*u*u*y0 + 3*u*u*t*y1 + 3*u*t*t*y2 + t*t*t*y3]; };
  const der = t => { const u = 1 - t; return [3*u*u*(x1-x0) + 6*u*t*(x2-x1) + 3*t*t*(x3-x2), 3*u*u*(y1-y0) + 6*u*t*(y2-y1) + 3*t*t*(y3-y2)]; };
  const N = 18, left = [], right = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N, [px, py] = pt(t);
    const [dx, dy] = der(t), L = Math.hypot(dx, dy) || 1;
    const w = (w0 + (w1 - w0) * t) / 2;
    left.push([px - dy / L * w, py + dx / L * w]);
    right.push([px + dy / L * w, py - dx / L * w]);
  }
  const f = p => p[0].toFixed(1) + ' ' + p[1].toFixed(1);
  return 'M' + left.map(f).join(' L') + ' L' + f(pt(1)) + ' L' + right.reverse().map(f).join(' L') + ' Z';
}
let TREE_UID = 0;
function puzzleTreeSvg(opts) {
  const o = Object.assign({ variant: 'color', scores: null, interactive: false, seam: '#2C1810', assemble: false, cls: '' }, opts);
  const ground = o.variant === 'hero'
    ? `<path d="M26 293.5 Q200 289 374 293.5 Q200 298 26 293.5 Z" fill="#FAF7F2" opacity="0.75"/>`
    : `<path d="M26 293.5 Q200 290 374 293.5 Q200 297 26 293.5 Z" style="fill:var(--ink-soft);" opacity="0.35"/>`;
  let pieces = '';
  DRAW_ORDER.forEach(key => {
    const d = DOMAIN_BY_KEY[key];
    const shape = TREE_SHAPES[PIECE_FOR[key]];
    const hero = o.variant === 'hero';
    const color = hero ? HERO_COLORS[key] : o.variant === 'score' ? LOGO_COLORS[key] : d.color;
    let pieceOpacity = 1;
    if (o.variant === 'score' && o.scores) pieceOpacity = 0.2 + 0.8 * ((o.scores[key] || 5) / 10);
    let inner = '';
    if (shape.kind === 'taper') {
      const ends = p => { const n = p[0].match(/-?\d+(\.\d+)?/g).map(Number); return [n[0], n[1], n[6], n[7]]; };
      const caps = (p, add0, add1, fill) => { const e = ends(p); return `<circle cx="${e[0]}" cy="${e[1]}" r="${((p[1] + add0) / 2).toFixed(2)}" style="fill:${fill};"/><circle cx="${e[2]}" cy="${e[3]}" r="${((p[2] + add1) / 2).toFixed(2)}" style="fill:${fill};"/>`; };
      if (shape.seam) inner += shape.paths.map(p => `<path d="${taperPath(p[0], p[1] + 3, p[2] + 2)}" style="fill:${o.seam};"/>` + (shape.joints ? caps(p, 3, 2, o.seam) : '')).join('');
      inner += shape.paths.map(p => `<path d="${taperPath(p[0], p[1], p[2])}" style="fill:${color};"/>` + caps(p, 0, 0, color)).join('');
    } else if (shape.kind === 'fill') {
      inner += shape.paths.map(p => `<path d="${p}" style="fill:${color};stroke:${o.seam};paint-order:stroke;" stroke-width="2.5" stroke-linejoin="round"/>`).join('');
      if (shape.grain) inner += shape.grain.map(p => `<path d="${p}" style="stroke:${o.seam};" stroke-width="1.3" stroke-linecap="round" fill="none" opacity="0.8"/>`).join('');
      if (!hero && key === 'trunk') inner += `<g stroke="#000" stroke-opacity="0.12" stroke-width="1.2" stroke-linecap="round" fill="none"><path d="M191 286 C191 250 191.5 200 191.5 104M215 286 C215 250 215 200 215 150"/></g>`;
    } else if (shape.kind === 'marks') {
      // the dark marks on the white bark, short and rounded, as in the mark
      inner += shape.marks.map(m => `<path d="M${(m[0] - m[2] / 2).toFixed(1)} ${m[1]}h${m[2]}" style="stroke:${color};" stroke-width="3" stroke-linecap="round"/>`).join('');
    } else if (shape.kind === 'blobs') {
      // the airy crown: shade, body, and light layers of round clusters in one color
      const op = [1, 0.86, 0.72];
      if (!hero) inner += shape.blobs.filter(c => c[3] === 0).map(c => `<circle cx="${c[0]}" cy="${c[1] + 3}" r="${c[2]}" style="fill:${o.seam};" opacity="0.35"/>`).join('');
      inner += shape.blobs.map(c => `<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" style="fill:${color};" opacity="${op[c[3]]}"/>`).join('');
      if (!hero) inner += shape.blobs.filter(c => c[3] === 2).map(c => `<circle cx="${(c[0] - c[2] * 0.25).toFixed(1)}" cy="${(c[1] - c[2] * 0.25).toFixed(1)}" r="${(c[2] * 0.55).toFixed(1)}" fill="#FFFFFF" opacity="0.18"/>`).join('');
      inner += shape.tips.map((t, i) => `<path d="M${t[0]} ${t[1]}Q${t[0] + (i % 2 ? 5 : -5)} ${((t[1] + t[2]) / 2).toFixed(1)} ${t[0] + (i % 2 ? 1.6 : -1.6)} ${t[2]}" style="stroke:${color};" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('');
    } else if (shape.kind === 'catkins') {
      inner += shape.cats.map(([x, y]) => `<g transform="translate(${x} ${y})">
        <path d="M0 0 V16" style="stroke:${o.seam};" stroke-width="8" stroke-linecap="round"/>
        <path d="M0 0 V16" style="stroke:${color};" stroke-width="5.4" stroke-linecap="round"/>
        ${hero ? '' : '<path d="M-1.6 4H1.6M-1.6 8H1.6M-1.6 12H1.6" stroke="#000" stroke-opacity="0.3" stroke-width="1"/>'}</g>`).join('');
    }
    const label = `${d.part}, ${d.name}${o.scores ? ', ' + o.scores[key] + ' of 10' : ''}`;
    const attrs = o.interactive ? `tabindex="0" role="button" aria-label="${label}"` : '';
    const anim = o.assemble ? `style="--dx:${shape.dx}px;--dy:${shape.dy}px;--delay:${shape.delay}s;"` : '';
    const sway = (o.assemble && (key === 'leaves' || key === 'fruit')) ? ' sway' : '';
    pieces += `<g class="piece-wrap${sway}" ${anim}><g class="piece${o.interactive ? ' interactive' : ''}" data-key="${key}" ${attrs} opacity="${pieceOpacity.toFixed(2)}"><title>${label}</title>${inner}</g></g>`;
  });
  return `<svg class="${o.cls}${o.assemble ? ' assemble' : ''}" viewBox="40 2 320 424" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Birch with six parts">${ground}${pieces}</svg>`;
}
function mountTree(slotId, opts, onPiece) {
  const slot = document.getElementById(slotId);
  if (!slot) return;
  slot.innerHTML = puzzleTreeSvg(opts);
  if (onPiece) {
    slot.querySelectorAll('.piece.interactive').forEach(el => {
      const key = el.getAttribute('data-key');
      el.addEventListener('click', () => onPiece(key));
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPiece(key); } });
    });
  }
}

// =====================================================================
// ABOUT PAGE
// =====================================================================
function renderAboutParts() {
  document.getElementById('about-part-cards').innerHTML = ALL_DOMAINS.map(d => `
    <div class="part-card" id="about-part-${d.key}" style="--domain-color:${d.color};">
      <div class="part-card-icon">${partIcon(d, 34)}</div>
      <div>
        <div class="part-card-name">${d.part}</div>
        <div class="part-card-domain">${d.name}</div>
        <p>${escapeHtml(partLine(d.key))}. ${escapeHtml(isPlain() && PARTS[d.key].plainYou ? PARTS[d.key].plainYou : PARTS[d.key].you)}</p>
      </div>
    </div>`).join('');
  mountTree('about-tree-slot', { variant: 'color', interactive: true, seam: 'var(--bg)' }, key => {
    const card = document.getElementById('about-part-' + key);
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('flash');
    setTimeout(() => card.classList.remove('flash'), 1400);
  });
}

// =====================================================================
// THE PERSON'S SETTINGS: My Season, Faith or Plain, the optional question,
// Steady or Hardy, and an optional birthday (kept in the profile, GGP.moveOn). Saved in the profile under "birch";
// before a profile exists they live in memory for this visit only.
// =====================================================================
const LOCAL = { wording: null, seasons: [], askOpt: false };
function rec() { if (PROF && window.GGP && GGP.isOpen(PROF.id)) { const d = GGP.data(PROF.id, 'birch'); if (!Array.isArray(d.history)) d.history = []; return d; } return LOCAL; }
function isPlain() { try { return rec().wording === 'plain'; } catch (e) { return false; } }
const SEASONS = CKB.mySeason || CKB.MY_SEASON || [];
function seasonsNow() { const v = rec().seasons; return Array.isArray(v) ? v.filter(id => SEASONS.some(x => x.id === id)) : []; }
function seasonName(id) { const x = SEASONS.find(y => y.id === id); return x ? x.name : ''; }
function seasonText() { const n = seasonsNow().map(seasonName).filter(Boolean); return n.length ? n.join(', ') : 'none chosen'; }
function sensOn() { return !!rec().askOpt; }
function ageNow() { const r = rec(); return PROF && window.GGP && GGP.moveOn ? GGP.moveOn.age(PROF.id, r.age) : null; }   // the birthday first (GWG BLD 758), else an older optional age
function persistRec() { return (PROF && window.GGP) ? GGP.save(PROF.id) : Promise.resolve(); }
// Groundwork's words (birch/groundwork.js), read here so the game layer can count skills.
const GW = window.BIRCH_GROUNDWORK || { chapters: [], intro: [], skills: {} };

// =====================================================================
// CHECKIN: one question on the screen at a time
// The bank is /birch/checkin.js, read by Birch and, later, Birch Guide: 8 per
// part in one bank, a tip and a "why" line on each, two or three reverse
// questions per part, My Season examples, flags, help notes, the optional
// betting question, and the safety step.
// Question 1 of each part is the quick check-in question. Each answer moves
// on by itself after a moment; Back and Skip always work. In "With someone I
// trust" the tip shows after each answer as a conversation prompt, and the
// screen waits for Next.
// =====================================================================
const ST_STD = CKB.version || 1;
const Q_OPTS = CKB.answers || [['rarely', 'Rarely', 0], ['sometimes', 'Sometimes', 1], ['often', 'Often', 2], ['always', 'Almost always', 3], ['unsure', 'Not sure', null]];
const SAFETY = CKB.safety || {};
const ST_FLAGS = CKB.flags || {};
const ALERT_KINDS = CKB.ALERT_KINDS || CKB.alertKinds || ['safety', 'alone', 'hope'];
const SAFE_ON = SAFETY.on || { safe: ['yes', 'unsure'], self: ['yes', 'unsure'], now: ['yes', 'unsure'] };
const SAFE_ANS = SAFETY.answers || [['yes', 'Yes'], ['no', 'No'], ['unsure', 'Not sure'], ['skip', "I'd rather not say"]];
const LINES = (function () { const L = SAFETY.lines || {}; return Array.isArray(L) ? { calm: L, hurt: L.filter(x => x.first === 'hurt'), topic: [] } : { calm: L.calm || [], hurt: L.hurt || [], topic: L.topic || [] }; })();
// One bank (decision 6): My Season adds only examples and tips, never questions or scores.
function bankFor(seasons, wording) {
  if (typeof CKB.getBank === 'function') return CKB.getBank(seasons, wording);
  const out = {}; Object.keys(CKB.questions || {}).forEach(k => { out[k] = (CKB.questions[k] || []).map(q => Object.assign({}, q, wording === 'plain' ? (q.plain || {}) : {})); });
  return out;
}
function sensList() { return typeof CKB.optionalList === 'function' ? CKB.optionalList() : (CKB.OPTIONAL || CKB.optional || []); }
// Who is answering (Sequoia's model): 'self', or 'tapped' (the person answers, a helper taps).
let CK = { by: 'self', forId: null, name: '' };
let QUESTIONS = {};
// A helper tapping for someone asks in that person's own wording and seasons.
function loadBank() {
  const r = CK && CK.forId && window.GGP && GGP.isOpen(CK.forId) ? GGP.data(CK.forId, 'birch') : rec();
  QUESTIONS = bankFor(Array.isArray(r.seasons) ? r.seasons : [], r.wording === 'plain' ? 'plain' : 'faith');
}
loadBank();
const Q_STEM = (CKB.stems || {}).standard || 'In the past two weeks, how often have you...';
const quickQ = key => ((QUESTIONS[key] || [])[0] || {}).t || '';
const stLevel = sc => sc == null ? 'Not sure yet' : sc >= 8 ? 'Strong' : sc >= 5 ? 'Steady' : 'Growing Edge';
const stLevelLine = sc => sc == null ? 'Not sure yet' : `${stLevel(sc)}, ${sc} of 10`;
let ST_ANS = {}, ST_SAFE = {}, ST_SENS = {}, ST_QUICK = false, CK_MODE = 'self', CK_SENS = false;

function partScore(key, answers) {
  const qs = QUESTIONS[key] || []; let sum = 0, n = 0;
  qs.forEach((q, i) => {
    const a = answers[i]; if (a == null) return;
    const opt = Q_OPTS.find(o => o[0] === a); if (!opt || opt[2] === null) return;
    sum += q.r ? 3 - opt[2] : opt[2]; n++;
  });
  return n ? Math.max(1, Math.min(10, Math.round(1 + 9 * (sum / n) / 3))) : null;
}
function stQ(key, i) {
  if (QUESTIONS[key]) return QUESTIONS[key][i] || null;
  if (key.indexOf('quick_') === 0 && QUESTIONS[key.slice(6)]) return QUESTIONS[key.slice(6)][0];
  if (key.indexOf('sens_') === 0) return sensList().find(x => x.id === key.slice(5)) || null;
  return null;
}
function srcSmall(list) { return list && list.length && window.GGSources ? GGSources.line(list, { tag: 'small' }) : ''; }
// Health and Ability notes (GWG BLD 756) add an example and a tip, like My Season, only when the person answers for themselves.
function lifeNote(q) { return CK.by === 'self' && window.GGLifeKit ? GGLifeKit.notes(q, 'birch') : { ex: [], tip: '' }; }
function tipHtml(q) { const t = q ? [q.tip, lifeNote(q).tip].filter(Boolean).join(' ') : ''; return CK_MODE === 'trust' && t ? `<div class="pn-follow" role="note"><b>To talk about together</b>${escapeHtml(t)}</div>` : ''; }
function questionHtml(key, i, text) {
  const cur = key.indexOf('sens_') === 0 ? ST_SENS[key.slice(5)] : (ST_ANS[key] || {})[i];
  const q = stQ(key, i);
  return `<div class="q-card sq-one${cur ? ' answered' : ''}" data-q="${key}-${i}" role="radiogroup" aria-label="${escapeHtml(text)}">
    <p class="q-text sq-qtext">${escapeHtml(text)}</p>
    <div class="q-opts sq-opts">${Q_OPTS.map(o => `<button type="button" data-v="${o[0]}" aria-pressed="${cur === o[0]}" onclick="answerQ('${key}', ${i}, '${o[0]}')"><span class="sq-dot" aria-hidden="true"></span>${o[1]}</button>`).join('')}</div>
    ${q && q.ex && q.ex.length ? `<ul class="bc-ex" aria-label="For your season">${q.ex.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>` : ''}
    ${q && lifeNote(q).ex.length ? `<ul class="bc-ex" aria-label="Examples that fit you">${lifeNote(q).ex.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>` : ''}
    <div class="pn-tipbox">${cur ? tipHtml(q) : ''}</div>
    ${q && q.why ? `<details class="q-why"><summary>Why this question?</summary><p>${escapeHtml(q.why)}</p>${srcSmall(q.src)}</details>` : ''}
  </div>`;
}
let ADV = null;
function moveOn() {
  if (CK_MODE === 'trust') return;   // with someone you trust, the screen waits so you can talk
  const here = currentStep; clearTimeout(ADV);
  ADV = setTimeout(() => { if (currentStep === here && SCREENS[here + 1]) goToStep(here + 1); }, 650);
}
function answerQ(key, i, val) {
  if (key.indexOf('sens_') === 0) ST_SENS[key.slice(5)] = val;
  else { ST_ANS[key] = ST_ANS[key] || {}; ST_ANS[key][i] = val; }
  document.querySelectorAll(`[data-q="${key}-${i}"] button`).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === val)));
  const card = document.querySelector(`[data-q="${key}-${i}"]`);
  if (card) { card.classList.add('answered'); const tb = card.querySelector('.pn-tipbox'); if (tb) tb.innerHTML = tipHtml(stQ(key, i)); }
  syncNextLabel(currentStep);
  const q = stQ(key, i), f = q && q.flag && ST_FLAGS[q.flag];
  if (f && (f.calm || []).includes(val)) { showCalm('flag', q.flag); return; }
  moveOn();
}

// ---------- safety (Pine's two questions in adult words, with "I'd rather not say") ----------
const SAFE_Q = { safe: ((SAFETY.questions || []).find(x => x[1] === 'safe') || [])[0] || 'Is anyone hurting you, threatening you, or making you feel unsafe?',
  self: ((SAFETY.questions || []).find(x => x[1] === 'self') || [])[0] || 'Over the past few weeks, have you had thoughts of ending your life, or of not wanting to be alive?',
  now: SAFETY.now || 'Right now, today, are those thoughts with you?' };
const safeOn = (which, v) => !!v && (SAFE_ON[which] || []).includes(v);
function safetyScreenHtml(which) {
  const cur = ST_SAFE[which] || '';
  const lead = which === 'safe' ? (SAFETY.intro || '') : which === 'self' ? (SAFETY.selfLead || '') : '';
  return `${lead ? `<p class="safe-lead">${escapeHtml(lead)}</p>` : ''}
    <div class="q-card sq-one${cur ? ' answered' : ''}" data-s="${which}" role="radiogroup" aria-label="${escapeHtml(SAFE_Q[which])}"><p class="q-text sq-qtext">${escapeHtml(SAFE_Q[which])}</p>
    <div class="q-opts sq-opts">${SAFE_ANS.map(x => `<button type="button" data-v="${x[0]}" aria-pressed="${cur === x[0]}" onclick="answerSafe('${which}','${x[0]}')"><span class="sq-dot" aria-hidden="true"></span>${x[1]}</button>`).join('')}</div></div>`;
}
function answerSafe(which, val) {
  ST_SAFE[which] = val;
  if (which === 'self' && !safeOn('self', val)) delete ST_SAFE.now;
  document.querySelectorAll(`[data-s="${which}"] button`).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === val)));
  const c = document.querySelector(`[data-s="${which}"]`); if (c) c.classList.add('answered');
  syncNextLabel(currentStep);
  if (safeOn(which, val)) { showCalm(which === 'safe' ? 'hurt' : which); return; }
  const here = currentStep; clearTimeout(ADV);
  ADV = setTimeout(() => { if (currentStep === here && SCREENS[here + 1]) goToStep(here + 1); }, 650);
}

// ---------- help lines (birch/checkin.js safety.lines: calm, hurt, and topic) ----------
function lineById(id) { return LINES.calm.find(x => x.id === id) || LINES.hurt.find(x => x.id === id) || LINES.topic.find(x => x.id === id) || null; }
function lineHtml(x, first) {
  const sms = x.sms ? 'sms:' + x.sms + (x.smsBody ? '?&body=' + encodeURIComponent(x.smsBody) : '') : '';
  const href = x.tel ? 'tel:' + x.tel : sms || x.url || '';
  const main = href ? `<a href="${escapeHtml(href)}"${!x.tel && !sms ? ' target="_blank" rel="noopener"' : ''}>${escapeHtml(x.show || x.tel || '')}</a>` : `<span class="pn-show">${escapeHtml(x.show || '')}</span>`;
  const extra = [];
  if (x.tel && sms) extra.push(`<a href="${escapeHtml(sms)}">${x.smsBody ? 'Text ' + escapeHtml(x.smsBody) + ' to ' + escapeHtml(x.sms) : 'Text ' + escapeHtml(x.sms)}</a>`);
  if (x.url && (x.tel || sms)) extra.push(`<a href="${escapeHtml(x.url)}" target="_blank" rel="noopener">Open the website</a>`);
  return `<li${first ? ' class="calm-first"' : ''}><b>${escapeHtml(x.name)}</b>${main}${extra.length ? ' <span class="pn-or">' + extra.join(' &middot; ') + '</span>' : ''}${x.note ? `<span class="sq-linenote">${escapeHtml(x.note)}</span>` : ''}</li>`;
}
function linesHtml(list, compact, firstIds) {
  const first = firstIds || [];
  const L = (list || LINES.calm).slice().sort((a, b) => (first.includes(b.id) ? 1 : 0) - (first.includes(a.id) ? 1 : 0));
  return `<ul class="calm-list${compact ? ' sq-lines' : ''}">${L.map(x => lineHtml(x, first.includes(x.id))).join('')}</ul>`;
}
function linesFor(ids) { return (ids || []).map(lineById).filter(Boolean); }
function showCalm(why, flagKey) {
  const old = document.getElementById('calm-card'); if (old) old.remove();
  let title = SAFETY.title || 'You matter, and you don\'t have to carry this alone.', lead, list = LINES.calm, first = [];
  if (why === 'hurt') { title = SAFETY.hurtTitle || 'No one has the right to hurt you.'; lead = `<p>${escapeHtml(SAFETY.hurtIntro || '')}</p>`; list = LINES.hurt; }
  else if (why === 'self' || why === 'now') { lead = `<p><b>${escapeHtml(SAFETY.yes || '')}</b></p>${SAFETY.burden ? `<p>${escapeHtml(SAFETY.burden)}</p>` : ''}${SAFETY.means ? `<p>${escapeHtml(SAFETY.means)}</p>` : ''}`; if (why === 'now') first = ['988', '911']; }
  else if (why === 'flag' && ST_FLAGS[flagKey]) { const f = ST_FLAGS[flagKey]; if (flagKey === 'hurt') title = SAFETY.hurtTitle || title; lead = `<p>${escapeHtml(f.note || '')}</p>`; list = linesFor(f.lines).length ? linesFor(f.lines) : LINES.calm; }
  else lead = `<p>${escapeHtml(SAFETY.calmIntro || 'These people want to help, any time. You can also tell someone you trust.')}</p>`;
  const wrap = document.createElement('div');
  wrap.id = 'calm-card'; wrap.className = 'calm-back';
  wrap.innerHTML = `<div class="calm-box" role="dialog" aria-modal="true" aria-labelledby="calm-title">
    <h2 id="calm-title">${escapeHtml(title)}</h2>
    ${lead}
    ${linesHtml(list, false, first)}
    ${why !== 'hurt' && why !== 'self' && why !== 'now' ? lifeLinesHtml() : ''}
    ${why !== 'hurt' && LINES.hurt.length ? '<p class="gt-small"><button type="button" class="text-btn" onclick="showCalm(\'hurt\')">Someone hurting or threatening you? Help any time</button></p>' : ''}
    <div class="calm-row"><button type="button" class="btn btn-primary" onclick="closeCalm()">Close and keep going</button></div>
  </div>`;
  document.body.appendChild(wrap);
  wrap.addEventListener('click', e => { if (e.target === wrap) closeCalm(); });
  document.addEventListener('keydown', calmKey);
  const b = wrap.querySelector('.calm-row button'); if (b) b.focus();
}
function calmKey(e) { if (e.key === 'Escape') closeCalm(); }
function closeCalm() { const c = document.getElementById('calm-card'); if (c) c.remove(); document.removeEventListener('keydown', calmKey); }

// ---------- the screens ----------
let SCREENS = [], currentStep = 0;
function buildScreens(quick) {
  const out = [], sens = CK_SENS ? sensList() : [];
  ALL_DOMAINS.forEach((d, pi) => {
    if (quick) { out.push({ kind: 'q', key: 'quick_' + d.key, part: d.key, pi, i: 0, n: 1 }); return; }
    const n = (QUESTIONS[d.key] || []).length;
    out.push({ kind: 'intro', part: d.key, pi });
    for (let i = 0; i < n; i++) out.push({ kind: 'q', key: d.key, part: d.key, pi, i, n });
    sens.filter(x => x.part === d.key).forEach(x => out.push({ kind: 'q', key: 'sens_' + x.id, part: d.key, pi, i: 0, n: 1, sens: true }));
    out.push({ kind: 'sit', part: d.key, pi });
  });
  // A helper tapping never sees the safety step: the person answers it on their own.
  if (CK.by === 'self') { out.push({ kind: 'safe', which: 'safe' }); out.push({ kind: 'safe', which: 'self' }); out.push({ kind: 'safe', which: 'now' }); }
  out.push({ kind: 'finish' });
  return out;
}
// The "right now" question is asked only after Yes or Not sure to the self question.
const skipScreen = i => { const sc = SCREENS[i]; return !!sc && sc.kind === 'safe' && sc.which === 'now' && !safeOn('self', ST_SAFE.self); };
function signsHtml(d) {
  const p = PARTS[d.key], stress = isPlain() && p.plainStress ? p.plainStress : p.stress;
  return `<details class="signs-details"><summary>Signs of health and signs of stress</summary><div class="signs">
      <div class="signs-col"><div class="step-label">Signs of health</div><ul>${p.health.map(s => `<li>${s}</li>`).join('')}</ul></div>
      <div class="signs-col stress"><div class="step-label">Signs of stress</div><ul>${stress.map(s => `<li>${s}</li>`).join('')}</ul></div>
    </div></details>`;
}
function screenHtml(sc, idx) {
  const d = sc.part ? DOMAIN_BY_KEY[sc.part] : null, p = d ? PARTS[d.key] : null;
  const head = d ? `<div class="step-head"><div class="step-icon">${partIcon(d, 40)}</div><div><div class="step-count">Part ${sc.pi + 1} of ${ALL_DOMAINS.length}</div><h2 class="step-title">${d.part}</h2><div class="step-domain">${d.name}</div></div></div>` : '';
  const back = idx > 0 ? `<button class="btn btn-secondary" onclick="goBack(${idx})">Back</button>` : '<span></span>';
  const nextLabel = nextLabelFor(idx);
  if (sc.kind === 'intro') return `<section class="step-panel" id="step-${idx}" style="--domain-color:${d.color};">${head}
      <div class="step-grid">
        <div class="step-block"><div class="step-label">${p.treeLabel}</div><p>${p.tree}</p></div>
        <div class="step-block"><div class="step-label">${p.youLabel}</div><p>${isPlain() && p.plainYou ? p.plainYou : p.you}</p></div>
      </div>
      ${signsHtml(d)}
      <div class="btn-row step-nav">${back}<button class="btn btn-primary" onclick="goToStep(${idx + 1})">Begin ${d.part}</button></div></section>`;
  if (sc.kind === 'q') {
    const q = stQ(sc.key, sc.i), text = sc.key.indexOf('quick_') === 0 ? quickQ(sc.part) : (q || {}).t || '';
    const answered = sc.sens ? ST_SENS[sc.key.slice(5)] : (ST_ANS[sc.key] || {})[sc.i];
    const count = ST_QUICK ? `Question ${sc.pi + 1} of 6` : sc.sens ? 'Optional question' : `Question ${sc.i + 1} of ${sc.n}`;
    return `<section class="step-panel" id="step-${idx}" style="--domain-color:${d.color};">${ST_QUICK ? `<div class="step-head"><div class="step-icon">${partIcon(d, 40)}</div><div><div class="step-count">Quick Check-in</div><h2 class="step-title">${d.part}</h2><div class="step-domain">${d.name}</div></div></div>` : head}
      <p class="sq-count">${count}</p>
      ${sc.sens ? '<p class="sq-who">You turned this question on. It never counts toward a score, and it is never shared.</p>' : ''}${CK.by === 'tapped' && sc.i === 0 ? `<p class="sq-who">${escapeHtml(CK.name)} answers, and you tap.</p>` : ''}
      <p class="q-stem">${escapeHtml(Q_STEM)}</p>
      ${questionHtml(sc.key, sc.i, text)}
      <div class="btn-row step-nav">${back}<button class="btn btn-secondary pn-next" onclick="goToStep(${idx + 1})">${answered ? nextLabel : 'Skip this one'}</button></div></section>`;
  }
  if (sc.kind === 'sit') return `<section class="step-panel" id="step-${idx}" style="--domain-color:${d.color};">${head}
      <div class="sit-with"><div class="step-label">Sit with this <span class="opt">(optional)</span></div><p class="domain-prompt">${partDef(d).prompt || 'What is true for you in this part of your life right now?'}</p>
      <textarea class="reflection-area" id="client-${d.key}-notes" aria-label="${d.part} reflection" placeholder="Write here if you want, or use your phone's microphone key to speak it. It stays on this device." style="--domain-color:${d.color};"></textarea></div>
      <div class="btn-row step-nav">${back}<button class="btn btn-primary" onclick="goToStep(${idx + 1})">${nextLabel}</button></div></section>`;
  if (sc.kind === 'safe') return `<section class="step-panel" id="step-${idx}"><div class="step-head"><div><div class="step-count">Almost done</div><h2 class="step-title">${sc.which === 'now' ? 'One more' : 'Before you see your tree'}</h2></div></div>
      <div class="safe-wrap" id="pn-safe-${sc.which}">${safetyScreenHtml(sc.which)}</div>
      <p class="safe-help"><button type="button" class="text-btn" onclick="showCalm()">Need to talk to someone now?</button></p>
      <div class="btn-row step-nav">${back}<button class="btn btn-secondary pn-next" onclick="goToStep(${idx + 1})">${ST_SAFE[sc.which] ? 'Next' : 'Skip this one'}</button></div></section>`;
  if (sc.kind === 'finish') return `<section class="step-panel" id="step-${idx}"><div class="step-head"><div><div class="step-count">All done</div><h2 class="step-title">Nice work</h2></div></div>
      <p class="lead">${CK.by === 'tapped' ? 'This check-in saves to ' + escapeHtml(CK.name) + '\'s tree, marked as taken together. The safety questions stay with ' + escapeHtml(CK.name) + ', for their own check-ins.' : 'Your answers stay on this device, locked in your profile. Tap below to see your tree.'}</p>
      ${CK.by === 'tapped' ? '<p class="safe-help"><button type="button" class="text-btn" onclick="showCalm()">Need to talk to someone now? Help lines</button></p>' : ''}
      <div class="btn-row step-nav">${back}<button class="btn btn-primary" onclick="calculateResults('client')">${CK.by === 'tapped' ? 'See the Tree' : 'See My Tree'}</button></div></section>`;
  return '';
}
function nextLabelFor(idx) {
  let j = idx + 1; while (skipScreen(j)) j++;
  const nxt = SCREENS[j];
  return !nxt ? '' : nxt.kind === 'finish' ? 'Almost done' : nxt.kind === 'intro' ? 'Next: ' + DOMAIN_BY_KEY[nxt.part].part : 'Next';
}
function syncNextLabel(i) {
  const sc = SCREENS[i], panel = document.getElementById('step-' + i); if (!sc || !panel) return;
  const b = panel.querySelector('.pn-next'); if (!b) return;
  const has = sc.kind === 'safe' ? !!ST_SAFE[sc.which] : sc.sens ? !!ST_SENS[sc.key.slice(5)] : !!(ST_ANS[sc.key] || {})[sc.i];
  b.textContent = has ? (sc.kind === 'safe' ? 'Next' : nextLabelFor(i)) : 'Skip this one';
}
function renderCheckin() {
  SCREENS = buildScreens(ST_QUICK);
  document.getElementById('step-container').innerHTML = SCREENS.map(screenHtml).join('');
  const m = document.getElementById('pn-mode'); if (m) m.innerHTML = modeHtml();
  goToStep(0, true);
}
function modeHtml() {
  const M = CKB.modes || [['self', 'On my own'], ['trust', 'With someone I trust']];
  return `<div class="pn-seg" role="group" aria-label="How you are checking in">${M.map(x => `<button type="button" aria-pressed="${CK_MODE === x[0]}" onclick="setCkMode('${x[0]}')">${escapeHtml(x[1])}</button>`).join('')}</div>
    <p class="gt-small">${CK_MODE === 'trust' ? 'After each answer, a short note gives you something to talk about together, with a friend, mentor, partner, or counselor you chose. You decide what to share.' : 'Read each question and pick what fits best. Each answer moves you on by itself.'} ${CK.by === 'tapped' ? '' : `My Season: ${escapeHtml(seasonText())}. <button type="button" class="text-btn" onclick="GGTend.openSettings('bc-set-season')">Change</button>`}</p>`;
}
function setCkMode(m) { CK_MODE = m; const el = document.getElementById('pn-mode'); if (el) el.innerHTML = modeHtml(); document.querySelectorAll('#step-container .q-card').forEach(c => { const tb = c.querySelector('.pn-tipbox'), k = c.getAttribute('data-q'); if (!tb || !k) return; const at = k.lastIndexOf('-'), key = k.slice(0, at), i = +k.slice(at + 1); const cur = key.indexOf('sens_') === 0 ? ST_SENS[key.slice(5)] : (ST_ANS[key] || {})[i]; tb.innerHTML = cur ? tipHtml(stQ(key, i)) : ''; }); }
function renderStepProgress() {
  const sc = SCREENS[currentStep] || {}, at = sc.part ? sc.pi : (sc.kind ? ALL_DOMAINS.length : 0);
  const firstOf = pi => SCREENS.findIndex(s => s.pi === pi);
  document.getElementById('step-progress').innerHTML = ALL_DOMAINS.map((d, i) => `
    <button class="step-dot${i === at ? ' current' : ''}${i < at ? ' done' : ''}" style="--domain-color:${d.color};" onclick="goToStep(${firstOf(i)})" aria-label="Part ${i + 1}: ${d.part}${i < at ? ', done' : ''}">
      ${partIcon(d, 24)}<span class="lbl">${d.part}</span>
    </button>`).join('');
}
function goBack(idx) { let j = idx - 1; while (j > 0 && skipScreen(j)) j--; goToStep(j); }
function goToStep(i, noScroll) {
  if (i < 0 || i >= SCREENS.length) return;
  while (skipScreen(i) && i < SCREENS.length - 1) i++;
  clearTimeout(ADV);
  currentStep = i;
  document.querySelectorAll('#step-container .step-panel').forEach((el, n) => el.classList.toggle('active', n === i));
  syncNextLabel(i);
  renderStepProgress();
  const panel = document.getElementById('step-' + i);
  if (!noScroll) scrollToViewTop('step-progress', true, true);
  const f = panel && panel.querySelector('.step-title'); if (f && !noScroll) { f.setAttribute('tabindex', '-1'); f.focus({ preventScroll: true }); }
}
// Scroll so the top of a view sits just under the sticky tab bar.
function scrollToViewTop(id, smooth, always) {
  const el = document.getElementById(id);
  if (!el) return;
  const nav = Array.from(document.querySelectorAll('.nav')).find(n => n.offsetParent !== null && getComputedStyle(n).position === 'sticky');
  const navH = nav ? nav.getBoundingClientRect().height : 0;
  const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - navH - 10);
  if (always || window.scrollY > y) window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
}
function setMode(by, forId) {
  const p = forId && window.GGP ? GGP.get(forId) : null;
  CK = { by: by === 'tapped' && p ? 'tapped' : 'self', forId: p ? forId : null, name: p ? p.name : '' };
  if (CK.by === 'tapped') CK_MODE = 'self';
}
function beginCheck(quick) {
  loadBank(); CK_SENS = !quick && CK.by === 'self' && sensOn();
  ST_QUICK = !!quick; ST_ANS = {}; ST_SAFE = {}; ST_SENS = {};
  renderCheckin();
  showView('client-assess');
  goToStep(0);
}
function startCheckin(by, forId) { setMode(typeof by === 'string' ? by : 'self', forId); beginCheck(false); }
function startQuick(by, forId) { setMode(typeof by === 'string' ? by : 'self', forId); beginCheck(true); }

// =====================================================================
// GROWTH PLAN
// =====================================================================
function renderGrowthPlanBuilder(mode) {
  const scores = window.lastClientScores;
  if (!scores) return;
  document.getElementById('client-growthplan-builder').innerHTML = ALL_DOMAINS.map(d => `
    <div class="domain-card" id="cp-card-${mode}-${d.key}" style="--domain-color:${d.color};border-left-color:${d.color};">
      <div class="domain-header">
        <div class="card-head">${partIcon(d, 30)}<div><div class="domain-name" style="color:${d.color};">${d.part}</div><div class="card-sub">${d.name}</div></div></div>
        <div class="domain-score-display" style="color:${d.color};">${(window.lastClientUnsure || []).includes(d.key) ? 'Not sure' : scores[d.key] + '/10'}</div>
      </div>
      <div class="practice-picker">
        <div class="practice-picker-label">Suggested: about ${oakSuggest(scores[d.key])} practices</div>
        <div class="practice-list" id="cp-list-${mode}-${d.key}">${lifeOrder(d.key, seasonOrder(d.key, d.restore)).map((r, i) => `
          <div class="practice-item" data-i="${i}">
            <label class="practice-option">
              <input type="checkbox" class="sq-pick-box" name="cp-${mode}-${d.key}" value="${escapeHtml(r[0])}" onchange="enforcePracticeLimit(this,'${mode}','${d.key}')">
              <span class="practice-option-text"><strong>${escapeHtml(shownName(d.key, r[0]))}.</strong> ${shownLine(d.key, r[0], r[1])}${practiceMeta(d.key, r[0])}${fitsSeason(d.key, r[0]) ? '<span class="pm-tags"><span class="pm-tag pm-fit">Fits your season</span></span>' : ''}${lifeFitHtml(d.key, r[0])}</span>
            </label>
            <button type="button" class="guide-toggle" aria-expanded="false" onclick="toggleGuide(this)">How to do this &darr;</button>
            <div class="guide">${guideHtml(d.key, r[0])}</div>
          </div>`).join('')}</div>
        <button type="button" class="btn btn-secondary btn-sm practice-more" id="cp-more-${mode}-${d.key}" onclick="oakRotNext('${mode}','${d.key}')" hidden></button>
        <div class="practice-limit-note">${oakSuggestNote(scores[d.key])} Choose as many as you like, or write your own below. Tap "How to do this" on any practice to learn more.</div>
        <input type="text" class="practice-custom" id="cp-${mode}-${d.key}-custom" aria-label="${d.part} custom practice" placeholder="Your own practice or next step...">
        ${shelfHtml(d.key)}
      </div>
    </div>`).join('');
  ALL_DOMAINS.forEach(d => oakRotApply(mode, d.key));
  document.getElementById('client-growthplan-generate-row').style.display = 'flex';
  document.getElementById('client-growthplan-doc').innerHTML = '';
}
// No limits on practices, only suggestions: about 3 for a Strong part, 4 for Steady,
// 5 for a Growing Edge. Choosing one now only refreshes that part's list.
// My Season (decision 6) only orders the practices: ones that fit the person's seasons
// come first. It never changes scores, and every practice stays on the list.
// Health and Ability (GWG BLD 756): practices that fit the person's choice come first with a
// "Fits You" tag and their adapt line. Nothing is hidden, and the plan never shows the choice.
function lifeTags(key, name) { const f = FLAGS_P[key + '|' + name] || {}, g = GUIDES[key + '|' + name] || {}; return { life: f.life || [], adapt: f.adapt || g.adapt || '' }; }
function lifeFits(key, name) { return !!window.GGLifeKit && GGLifeKit.fits(lifeTags(key, name)); }
function lifeFitHtml(key, name) { return lifeFits(key, name) ? GGLifeKit.fitHtml(lifeTags(key, name).adapt) : ''; }
function lifeOrder(key, rows) { return window.GGLife ? GGLife.order(rows, r => lifeTags(key, r[0])) : rows; }
function fitsSeason(key, name) { const m = seasonsNow(); return !!m.length && ((SP.SEASON || {})[key + '|' + name] || []).some(id => m.includes(id)); }
function seasonOrder(key, rows) { return rows.filter(r => fitsSeason(key, r[0])).concat(rows.filter(r => !fitsSeason(key, r[0]))); }
function enforcePracticeLimit(el, mode, key) { oakRotApply(mode, key, el && !el.checked ? el : null); }
// Six at a time: chosen practices first, then up to 6 unchosen. Show Me Others brings the next 6.
const OAK_ROT = {}, OAK_ROT_N = 6;
function oakRotApply(mode, key, unchose) {
  const list = document.getElementById(`cp-list-${mode}-${key}`), more = document.getElementById(`cp-more-${mode}-${key}`);
  if (!list) return;
  const id = mode + '-' + key, focus = document.activeElement;
  const items = Array.from(list.querySelectorAll('.practice-item')).sort((a, b) => a.dataset.i - b.dataset.i);
  const isOn = it => { const c = it.querySelector('input[type=checkbox]'); return !!(c && c.checked); };
  const chosen = items.filter(isOn), open = items.filter(it => !isOn(it));
  const pages = Math.max(1, Math.ceil(open.length / OAK_ROT_N));
  let page = OAK_ROT[id] || 0;
  if (unchose) { const at = open.findIndex(it => it.contains(unchose)); if (at >= 0) page = Math.floor(at / OAK_ROT_N); }
  page = Math.min(page, pages - 1); OAK_ROT[id] = page;
  const shown = open.slice(page * OAK_ROT_N, page * OAK_ROT_N + OAK_ROT_N);
  chosen.concat(open).forEach(it => { list.appendChild(it); it.hidden = !(isOn(it) || shown.includes(it)); });
  if (focus && list.contains(focus) && document.activeElement !== focus) focus.focus({ preventScroll: true });
  if (more) { more.hidden = pages < 2; more.textContent = `Show Me Others (${page + 1} of ${pages})`; }
}
function oakRotNext(mode, key) {
  const id = mode + '-' + key; OAK_ROT[id] = (OAK_ROT[id] || 0) + 1;
  const list = document.getElementById(`cp-list-${mode}-${key}`), open = list ? list.querySelectorAll('.practice-item input[type=checkbox]:not(:checked)').length : 0;
  if (OAK_ROT[id] >= Math.ceil(open / OAK_ROT_N)) OAK_ROT[id] = 0;
  oakRotApply(mode, key);
}
const oakLevelKey = sc => sc == null ? null : sc >= 8 ? 'strong' : sc >= 5 ? 'steady' : 'edge';
function oakSuggest(sc) { return window.GGTend && GGTend.suggest ? GGTend.suggest(oakLevelKey(sc)) : ({ edge: 5, steady: 4 }[oakLevelKey(sc)] || 3); }
function oakSuggestNote(sc) {
  const lv = oakLevelKey(sc);
  return lv === 'edge' ? 'This is a growing edge, so about 5 practices is a good start.' : lv === 'steady' ? 'This part is steady, so about 4 practices is a good start.' : lv === 'strong' ? 'This part is strong, so about 3 practices will keep it growing.' : 'About 3 practices is a good start.';
}
function collectGrowthPlan(mode) {
  const plan = {};
  ALL_DOMAINS.forEach(d => {
    const selected = Array.from(document.querySelectorAll(`input[name="cp-${mode}-${d.key}"]:checked`)).map(c => c.value);
    const customEl = document.getElementById(`cp-${mode}-${d.key}-custom`);
    plan[d.key] = { selected, custom: customEl ? customEl.value.trim() : '' };
  });
  return plan;
}
function generateGrowthPlanDoc(mode) {
  const scores = window.lastClientScores;
  if (!scores) return;
  const plan = collectGrowthPlan('client'), unsure = window.lastClientUnsure || [];
  const domainsHtml = ALL_DOMAINS.map(d => {
    const { selected, custom } = plan[d.key];
    return `
      <div class="growth-plan-domain">
        <div class="growth-plan-domain-header">
          <div class="growth-plan-domain-name" style="color:${d.color};">${d.part} <span style="font-size:15px;color:var(--ink-soft);font-style:italic;">${d.name}</span></div>
          <div class="growth-plan-domain-score">${stLevelLine(unsure.includes(d.key) ? null : scores[d.key])}</div>
        </div>
        <div class="growth-plan-practices">
          ${selected.length === 0 && !custom ? '<p style="font-size:14px;color:var(--ink-soft);font-style:italic;">No practices chosen yet for this part.</p>' : ''}
          ${selected.map(s => `<div class="growth-plan-practice-item" style="--domain-color:${d.color};"><strong>${escapeHtml(shownName(d.key, s))}</strong></div><div class="growth-plan-guide" style="--domain-color:${d.color};">${guideHtml(d.key, s)}</div>`).join('')}
          ${custom ? `<div class="growth-plan-practice-item" style="--domain-color:${d.color};">${escapeHtml(custom)}</div>` : ''}
        </div>
      </div>`;
  }).join('');
  const nameField = escapeHtml(document.getElementById('client-save-name').value.trim());
  const sheetId = 'client-growthplan-doc-sheet';
  document.getElementById('client-growthplan-doc').innerHTML = `
    <div class="growth-plan-doc" id="${sheetId}" style="margin-top:24px;">
      <div class="growth-plan-header">
        <div class="growth-plan-header-logo"><img src="/shared/marks/birch.svg" alt="" width="64" height="64" style="display:block;margin:0 auto 10px;border-radius:14px"></div>
        <div class="growth-plan-title">Birch Growth Plan</div>
        <div class="growth-plan-meta">${nameField ? nameField + ' &middot; ' : ''}${formatDate(null)}</div>
      </div>
      ${domainsHtml}
      ${planHelpHtml()}
      <div class="growth-plan-next">
        <div class="growth-plan-next-label">Keep growing</div>
        <p><strong>Tend it every day.</strong> Your practices wait in the Today tab in Birch, ready to check off. A short check-in each week and a full check-in every twelve weeks show how your tree is growing. Open Birch at growwithgrounded.com/birch</p>
      </div>
      <div class="growth-plan-footer">
        <p class="growth-plan-footer-link">growwithgrounded.com/birch</p>
        <p>&copy; ${new Date().getFullYear()} Grow With Grounded LLC. All rights reserved. This growth plan was made with Grow With Grounded Birch. Grow With Grounded&trade; is a trademark of Grow With Grounded LLC. Content and framework may not be copied, reproduced, or redistributed without permission.</p>
      </div>
    </div>
    <div class="btn-row no-print">
      <button class="btn btn-secondary" onclick="printGrowthPlan('${sheetId}')">Save or Print My Plan</button>
      <button class="btn btn-secondary" onclick="savePersonalFile()">Save My Results</button>
    </div>
    <div class="grove-next no-print"><div><strong>Ready to put this plan into practice?</strong> ${PROF ? 'Your practices are waiting in Today, ready to check off.' : 'Open or create your profile, and your practices show up in Today, ready to check off.'}</div><button class="btn btn-primary" onclick="${PROF ? "showView('client-today')" : 'profCreateDialog()'}">${PROF ? 'Go to Today' : 'Create a profile'}</button></div>`;
  document.getElementById(sheetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast('Growth plan made below.');
}
// Help lines on every plan: the short adult list, the lines for the person's seasons,
// and the full lines for anything the latest check-in flagged (never lost).
const PLAN_LINES = ['988', 'veterans', 'ctl', '911'];
function planHelpHtml() {
  const e = oakLatestEntry(), f = (e && e.flags) || [];
  const ids = PLAN_LINES.slice();
  const add = id => { if (!ids.includes(id)) ids.push(id); };
  f.forEach(k => ((ST_FLAGS[k] || {}).lines || []).forEach(add));
  if (e && safeOn('safe', (e.safety || {}).safe)) LINES.hurt.forEach(x => add(x.id));
  seasonsNow().forEach(id => ((SEASONS.find(x => x.id === id) || {}).lines || []).forEach(add));
  return `<div class="growth-plan-next sq-planhelp"><div class="growth-plan-next-label">Help Any Time</div>${linesHtml(linesFor(ids), true)}</div>`;
}

// =====================================================================
// RESULTS
// =====================================================================
function interpretResults(scores, unsure) {
  const known = ALL_DOMAINS.filter(d => !unsure.includes(d.key));
  if (known.length < 2) return 'You chose "Not sure" for most parts, and that is okay. Your next check-in can fill in more of your tree.';
  const entries = known.map(d => ({ d, score: scores[d.key] })).sort((a, b) => b.score - a.score);
  const strongest = entries[0].d, weakest = entries[entries.length - 1].d;
  const care = entries.filter(e => e.score < 5).length, strong = entries.filter(e => e.score >= 8).length;
  const verb = d => ['trunk', 'bark', 'fruit'].includes(d.key) ? 'is' : 'are';
  let overall;
  if (!care && strong >= 4) overall = 'Your tree is strong across most parts. The work now is keeping it growing, not fixing it.';
  else if (care < 3) overall = 'Some parts of your tree are carrying more weight than others right now. That is normal, and you can work with it. Tending your growing edges takes pressure off the parts holding the most.';
  else overall = 'Several parts of your tree are running low right now, so the healthy parts have less to draw on. This is a good moment to be honest about where you need support, and to talk with someone you trust, a doctor, or a counselor alongside Birch.';
  return `Your <strong>${strongest.part.toLowerCase()}</strong> (${strongest.name}) ${verb(strongest)} the healthiest part of your tree right now, a real strength to lean on. Your biggest growing edge is your <strong>${weakest.part.toLowerCase()}</strong> (${weakest.name}), where your next growth begins. ${overall}`;
}
function buildPersonalSections(scores, unsure) {
  const entries = ALL_DOMAINS.filter(d => !unsure.includes(d.key)).map(d => ({ ...d, score: scores[d.key] })).sort((a, b) => b.score - a.score);
  if (entries.length < 2) return '';
  const block = (d, cls, body) => `
      <div class="${cls}" style="--domain-color:${d.color};border-left-color:${d.color};">
        <div class="${cls}-title" style="color:${d.color};display:flex;align-items:center;gap:8px;">${partIcon(d, 22)} ${d.part} &middot; ${d.name} &middot; ${stLevelLine(d.score)}</div>
        ${body}
      </div>`;
  let html = `<div class="personal-section"><div class="personal-section-title">Your strongest parts, and how to lean on them</div>`;
  entries.slice(0, 2).map(partDef).forEach(d => { if (d.strength_msg) html += block(d, 'strength-block', `<p>${d.strength_msg}</p>`); });
  html += `</div><div class="personal-section"><div class="personal-section-title">Where your tree needs tending</div>`;
  entries.slice(-2).reverse().map(partDef).forEach(d => { const extra = d.score < 5 && window.GGLifeKit ? GGLifeKit.stepsHtml('birch', d.key) : ''; html += block(d, 'growth-block', d.growth_steps.length || extra ? `<ul>${d.growth_steps.map(s => `<li>${s}</li>`).join('')}${extra}</ul>` : '<p>Your growth plan has practices for this part.</p>'); });
  return html + `</div>`;
}
// Flagged answers from this check-in: alone, hope, bully from the questions, and hurt
// from the safety step. Quick check-ins ask question 1 of each part, which is never a flag.
function stFlagsNow() {
  const out = [];
  if (!ST_QUICK) Object.keys(QUESTIONS).forEach(k => (QUESTIONS[k] || []).forEach((q, i) => {
    const a = (ST_ANS[k] || {})[i];
    if (q.flag && a && ST_FLAGS[q.flag] && (ST_FLAGS[q.flag].on || []).includes(a) && !out.includes(q.flag)) out.push(q.flag);
  }));
  if (safeOn('safe', ST_SAFE.safe)) out.push('hurt');
  return out;
}
// Birch has no alert to anyone (decision 11): flagged answers show help lines to
// the person, right here, and are never sent or shown to a helper.
function flagBoxHtml(flags, entry) {
  let html = '';
  const shown = flags.filter(f => f !== 'hurt' && ST_FLAGS[f]);
  if (shown.length) html += `<div class="flag-box" role="note"><h3>Worth tending</h3>${shown.map(f => `<p><strong>${escapeHtml(ST_FLAGS[f].title)}.</strong> ${escapeHtml(ST_FLAGS[f].note)}</p>${linesHtml(linesFor(ST_FLAGS[f].lines), true)}`).join('')}
    <p><button type="button" class="text-btn" onclick="showCalm()">See all help lines</button></p></div>`;
  if (flags.includes('hurt')) html += `<div class="flag-box pn-hurt" role="note"><h3>${escapeHtml(SAFETY.hurtTitle || 'No one has the right to hurt you.')}</h3><p>${escapeHtml((ST_FLAGS.hurt || {}).note || SAFETY.hurtIntro || '')}</p>${linesHtml(linesFor((ST_FLAGS.hurt || {}).lines).length ? linesFor((ST_FLAGS.hurt || {}).lines) : LINES.hurt, true)}<p class="gt-small">This answer stays with you. It is never sent to anyone, and never shown to a helper.</p></div>`;
  if (entry && (safeOn('self', (entry.safety || {}).self))) html += `<div class="flag-box" role="note"><h3>${escapeHtml(SAFETY.title || 'You matter.')}</h3><p>${escapeHtml(SAFETY.yes || '')}</p>${SAFETY.burden ? `<p>${escapeHtml(SAFETY.burden)}</p>` : ''}${linesHtml(linesFor(['988', 'veterans', 'ctl', 'mncrisis', '911']), true, safeOn('now', (entry.safety || {}).now) ? ['988', '911'] : [])}</div>`;
  // help notes on single questions (Bark and Leaves): a quiet note with topic lines, never a flag
  if (!ST_QUICK) Object.keys(QUESTIONS).forEach(k => (QUESTIONS[k] || []).forEach((q, i) => { const a = (ST_ANS[k] || {})[i]; if (q.help && a && (q.help.on || []).includes(a)) html += `<div class="flag-box pn-private" role="note"><h3>Just for you</h3><p>${escapeHtml(q.help.note || '')}</p>${linesHtml(linesFor(q.help.lines), true)}</div>`; }));
  // the optional question: a private note, never shared, never a score
  sensList().forEach(x => { const a = ST_SENS[x.id]; if (a && (x.on || []).includes(a)) html += `<div class="flag-box pn-private" role="note"><h3>Just for you</h3><p>${escapeHtml(x.note || '')}</p>${linesHtml(linesFor(x.lines), true)}</div>`; });
  return html;
}
function calculateResults() {
  const scores = {}, reflections = {}, unsure = [];
  ALL_DOMAINS.forEach(d => {
    let sc;
    if (ST_QUICK) { const o = Q_OPTS.find(x => x[0] === (ST_ANS['quick_' + d.key] || {})[0]); sc = o && o[2] !== null ? Math.round(1 + 9 * o[2] / 3) : null; }
    else sc = partScore(d.key, ST_ANS[d.key] || {});
    if (sc == null) { unsure.push(d.key); sc = 5; }   // drawn as a middle shade, shown as "Not sure yet"
    scores[d.key] = sc;
    const notes = document.getElementById(`client-${d.key}-notes`);
    reflections[d.key] = notes ? notes.value : '';
  });
  const shown = k => unsure.includes(k) ? null : scores[k];
  const flags = stFlagsNow(), tapped = CK.by === 'tapped';
  const safety = tapped ? { asked: 'not with a helper' } : { safe: ST_SAFE.safe || 'skipped', self: ST_SAFE.self || 'skipped' };
  if (!tapped && safeOn('self', ST_SAFE.self)) safety.now = ST_SAFE.now || 'skipped';
  const sens = {}; if (CK_SENS) sensList().forEach(x => { if (ST_SENS[x.id]) sens[x.id] = ST_SENS[x.id]; });
  const helperName = tapped ? (((window.GGP && GGP.active()) || {}).name || '') : '';
  const forRec = tapped && window.GGP && GGP.isOpen(CK.forId) ? GGP.data(CK.forId, 'birch') : rec();
  const entry = { id: Date.now().toString(36), date: todayKey(), std: ST_STD, bank: CKB.bank || 1, band: 'birch', seasons: Array.isArray(forRec.seasons) ? forRec.seasons.slice() : [], wording: forRec.wording === 'plain' ? 'plain' : 'faith',
    scores, unsure, reflections, flags, safety, sens, mode: CK_MODE, growthPlan: {}, type: ST_QUICK ? 'quick' : 'full', answers: ST_QUICK ? null : JSON.parse(JSON.stringify(ST_ANS)), by: CK.by, helper: helperName };
  const html = `
    <div class="results-summary">
      ${tapped ? `<p class="sq-who">${escapeHtml(CK.name)} answered, and ${escapeHtml(helperName)} tapped.</p>` : ''}
      <div class="tree-result-wrap"><div id="client-results-tree" style="width:100%;max-width:320px;"></div></div>
      <p class="tree-caption">Each part of the tree is shaded by its score. The fuller the color, the healthier that part.${tapped ? '' : ' Tap a part to work on it in your growth plan.'}</p>
      <div class="lvl-list">
        ${ALL_DOMAINS.map(d => `<div class="lvl-row" style="--domain-color:${d.color};">${partIcon(d, 20)}<b style="color:${d.color};">${d.part} <span style="font-weight:500;color:var(--ink-soft);">${d.name}</span></b><span class="lvl-pill">${stLevelLine(shown(d.key))}</span>${shown(d.key) != null && shown(d.key) < 5 ? '<p class="lvl-tend">This growing edge is where the next growth begins.</p>' : ''}</div>`).join('')}
      </div>
      ${ST_QUICK ? '<p class="tree-caption">A quick check-in asks one question for each part. Quick check-ins are compared only with other quick check-ins.</p>' : ''}
      <div class="interpretation">${interpretResults(scores, unsure)}</div>
      ${tapped ? `<p class="gt-small">Help any time: call or text 988, or text HOME to 741741. In danger right now, call 911. <button type="button" class="text-btn" onclick="showCalm()">See all help lines</button></p>` : flagBoxHtml(flags, entry)}
    </div>
    ${tapped ? '' : buildPersonalSections(scores, unsure) + lcSuggestHtml(scores, unsure)}
    <div class="reminder-banner"><p>${tapped ? 'Saved to ' + escapeHtml(CK.name) + '\'s tree, marked as taken together.' : 'Check in again in a few weeks. Trees grow slowly, and growth is easiest to see over time.'}</p></div>
    <div class="btn-row">${tapped ? `<button class="btn btn-primary" onclick="showView('client-today')">Back to ${escapeHtml(CK.name)}'s Tree</button>` : `<button class="btn btn-primary" onclick="showView('client-growthplan')">Build My Growth Plan</button>`}</div>
    ${tapped ? '' : '<div id="client-save-box"></div>'}`;
  document.getElementById('client-results-content').innerHTML = html;
  if (tapped) {
    showView('client-results');
    if (window.GGP && GGP.isOpen(CK.forId)) { const d = GGP.data(CK.forId, 'birch'); if (!Array.isArray(d.history)) d.history = []; d.history.push(entry); sortEntries(d.history); GGP.save(CK.forId).then(() => showToast('Saved to ' + CK.name + '\'s tree.')); }
    mountTree('client-results-tree', { variant: 'score', scores, interactive: false, seam: '#2C1810', assemble: true });
    return;
  }
  window.lastClientScores = scores;
  window.lastClientUnsure = unsure;
  window.currentClientEntry = entry;
  showView('client-results');
  renderGrowthPlanBuilder('client');
  if (PROF) {
    personalHistory.push(JSON.parse(JSON.stringify(entry))); sortEntries(personalHistory); profPersist();
    if (!ST_QUICK && window.GGTend) { const msg = GGTend.onFullCheckin(entry); if (msg) setTimeout(() => showToast(msg), 900); }
  }
  // Health and Ability (GWG BLD 756): one quiet card after a full check-in, at most once per profile.
  if (!ST_QUICK && CK.by === 'self' && !HELP && window.GGLife) { const host = document.querySelector('#client-results-content .results-summary'); if (host) GGLife.offerCard(host, 'birch', { onChoose: () => reopenSettings('bc-set-life') }); }
  oakPrefillPlan();
  renderSaveBox();
  renderProgress();
  const goToGrowthPlanPart = key => { showView('client-growthplan'); const card = document.getElementById(`cp-card-client-${key}`); if (card) setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60); };
  mountTree('client-results-tree', { variant: 'score', scores, interactive: true, seam: '#2C1810', assemble: true }, goToGrowthPlanPart);
}
// =====================================================================
// WHEN LIFE CHANGES (GWG BLD 743): Birch's own guides, ported from Pine's (BLD 740).
// The words live in birch/guides.js (window.BIRCH_GUIDES = {rings, links, topics});
// the site-wide search reads the same file. A ring with no guides yet stays
// hidden, and a small note names the rings still to come. Two views: For You
// (the young adult) and For the Helper (a parent, partner, friend, or mentor).
// Help lines are Birch's adult lines from birch/checkin.js (safety.lines): the
// calm list, plus topic lines where a guide's topic matches. Faith lines show as
// written, since the guides are written to the adult faith rules. Oak's guides
// stay one quiet tap away.
// =====================================================================
const LC_RINGS = (window.BIRCH_GUIDES || {}).rings || [];
const LC_TOPICS = (window.BIRCH_GUIDES || {}).topics || [];
const LCS = { client: { q: '', ring: 'all', open: null, persp: 'self', find: '' } };
// Health and Ability guides (GWG BLD 757) sit in ring 'life', drawn from GGLifeKit.RING (not in LC_RINGS).
const lcRing = k => LC_RINGS.find(r => r.key === k) || (k === 'life' && window.GGLifeKit ? GGLifeKit.RING : null) || { key: k, name: '', color: 'var(--gold)', blurb: '' };
const lcPart = k => DOMAIN_BY_KEY[k];
const lcEsc = s => escapeHtml(s == null ? '' : String(s));
const lcFilled = () => LC_RINGS.filter(r => LC_TOPICS.some(t => t.ring === r.key));
const lcHas = id => LC_TOPICS.some(t => t.id === id);
function lcMatches(t, q) {
  if (!q) return true;
  const words = (t.title + ' ' + (t.keys || '') + ' ' + (t.quick || []).join(' ')).toLowerCase().replace(/[’']/g, '').split(/[^a-z0-9]+/);
  return q.toLowerCase().replace(/[’']/g, '').split(/[^a-z0-9]+/).filter(Boolean).every(w => words.some(x => x.startsWith(w)));
}
function lcList(a) { return '<ul>' + (a || []).map(x => '<li>' + lcEsc(x) + '</li>').join('') + '</ul>'; }
function lcPartsText(t) { return (t.parts || []).map(k => lcPart(k) ? lcPart(k).part : k).join(', '); }
// Topic lines (birch/checkin.js safety.lines topic and hurt) shown with a guide whose topic matches.
// A guide may also carry its own lines: [ids].
const LC_TOPIC_LINES = {
  'pressure-burnout': ['nami'], 'adhd': ['nami'], 'what-now': ['mn211'],
  'job-loss': ['mn211'], 'money-basics': ['mn211'], 'debt': ['mn211'], 'gambling': ['mngambling', 'ncpg'],
  'moving-back': ['mn211'], 'housing': ['mn211'],
  'controlling': ['thehotline'],
  'unplanned-pregnancy': ['tlcmama'], 'young-parent': ['tlcmama'], 'after-baby': ['tlcmama'], 'pregnancy-loss': ['tlcmama'],
  'anxiety': ['nami'], 'depression': ['nami'], 'first-signs': ['nami'], 'substances': ['samhsa', 'poison'], 'eating': ['anad'], 'health-26': ['mn211'],
  'selfharm': ['nami'], 'sexual-assault': ['rainn'], 'images': ['takeitdown'],
  'military': ['milonesource'], 'coming-home': ['milonesource']
};
function lcHelpHtml(t) {
  const calm = LINES.calm.filter(x => x.id !== '911'), end = LINES.calm.filter(x => x.id === '911');
  const ids = t ? (Array.isArray(t.lines) ? t.lines : LC_TOPIC_LINES[t.id] || []) : [];
  const topic = linesFor(ids).filter(x => !calm.some(y => y.id === x.id));
  const L = calm.concat(topic, end);
  return `<div class="lc-help"><h3>Help any time</h3>${L.length ? linesHtml(L, true) : ''}${lifeLinesHtml()}<p class="no-print"><button type="button" class="text-btn" onclick="showCalm()">See all help lines</button></p></div>`;
}
// Health and Ability lines (shared/gg-life.js): information and support, always below the crisis lines.
function lifeLinesHtml() { return window.GGLifeKit ? GGLifeKit.linesHtml('birch', x => lineHtml(x)) : ''; }
const LC_OAK = '<p class="lc-oak no-print"><a class="text-link" href="/oak/#life">More guides in Oak</a></p>';
function renderLC(mode) {
  mode = 'client';
  const st = LCS[mode], el = document.getElementById(mode + '-life');
  if (!el) return;
  if (st.open) { el.innerHTML = lcDetail(mode, LC_TOPICS.find(t => t.id === st.open)); if (st.open) return; }
  const filled = lcFilled(), waiting = LC_RINGS.filter(r => !filled.includes(r));
  if (st.ring !== 'all' && st.ring !== 'life' && !filled.some(r => r.key === st.ring)) st.ring = 'all';
  el.innerHTML = `<div class="lc-head">
      <p class="eyebrow">When Life Changes</p>
      <h2 class="section-title" style="margin-top:4px">Guides for the years of new ground</h2>
      <p class="lead"><b>How to show up.</b> Quick references and full guides for the changes these years can bring. Each guide has two views: For You, when you are the one going through it, and For the Helper, for a parent, partner, friend, mentor, or anyone walking beside you. Most guides have two short videos too.</p>
    </div>
    ${LC_TOPICS.length ? `<input class="lc-search no-print" type="search" placeholder="Search: roommates, a first job, debt, a breakup..." aria-label="Search the guides" value="${lcEsc(st.find || '')}" oninput="lcFind(this,'${mode}')" enterkeyhint="search">
    <div class="lc-chips no-print" role="group" aria-label="Filter by topic">
      <button class="lc-chip" style="--rc:var(--ink-soft)" data-ring="all" onclick="LCS['${mode}'].ring='all';lcRenderList('${mode}')">All Topics</button>
      ${filled.map(r => `<button class="lc-chip" style="--rc:${r.color}" data-ring="${r.key}" onclick="LCS['${mode}'].ring='${r.key}';lcRenderList('${mode}')">${lcEsc(r.name)}</button>`).join('')}${lcLifeChip(mode)}
    </div>` : ''}
    <div id="${mode}-lc-list"></div>
    ${waiting.length ? `<p class="lc-soon"><b>More guides coming.</b> Guides for ${lcEsc(lcJoin(waiting.map(r => r.name)))} are on the way.</p>` : ''}
    ${LC_OAK}
    ${lcHelpHtml()}
    <p class="lc-note">These guides offer general spiritual and emotional guidance and support, drawn from chaplaincy and trusted mental health, health, and family organizations. For therapy, medical care, or legal advice, they point you to the right people. In danger right now, call 911. For a crisis, call or text 988.</p>`;
  lcRenderList(mode);
  if (st.find) { const i = el.querySelector('.lc-search'); if (i) lcFind(i, mode); }
}
function lcJoin(a) { return a.length < 2 ? a.join('') : a.length === 2 ? a.join(' and ') : a.slice(0, -1).join('; ') + '; and ' + a[a.length - 1]; }
function lcRenderList(mode) {
  const st = LCS[mode];
  const box = document.getElementById(mode + '-lc-list');
  if (!box) return;
  document.querySelectorAll('#' + mode + '-life .lc-chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.ring === st.ring));
  let html = st.ring === 'all' && !st.q ? lcPickedHtml(mode) : '', n = 0;
  LC_RINGS.concat(LC_LIFE && st.ring === 'life' ? [LC_LIFE] : []).filter(r => st.ring === 'all' || r.key === st.ring).forEach(r => {
    const ts = (r.key === 'life' ? LC_LIFE_FIRST : LC_TOPICS).filter(t => (r.key === 'life' ? (t.life || []).length : t.ring === r.key) && lcMatches(t, st.q));
    if (!ts.length) return;
    n += ts.length;
    html += `<div class="lc-ring" style="--rc:${r.color}"><h3><i></i>${lcEsc(r.name)}</h3><p>${lcEsc(r.blurb)}</p><div class="lc-grid">${ts.map(t => `
      <article class="lc-card" style="--rc:${r.color}">
        <span class="lc-label">Hard season</span>
        <h4>${lcEsc(t.title)}</h4>
        ${lcList(t.quick)}
        <p class="lc-meta">Parts of the tree often affected: ${lcEsc(lcPartsText(t))}.</p>
        <button class="btn btn-secondary" onclick="lcOpen('${mode}','${t.id}')">Talking It Through</button>
      </article>`).join('')}</div></div>`;
  });
  if (st.ring === 'all' && n) html += lcLifeRingHtml(mode);
  box.innerHTML = n ? html : LC_TOPICS.length ? `<div class="lc-none"><p>No guides match “${lcEsc(st.q)}.” Try another word, or browse all topics.</p></div>` : '';
}
/* Health and Ability (GWG BLD 756): a ring open to everyone that lists the guides tagged life in
   birch/guides.js, and Picked for You at the top when the person has made a choice. */
const LC_LIFE = window.GGLifeKit && GGLifeKit.tagged(LC_TOPICS).length ? GGLifeKit.RING : null;
const LC_LIFE_FIRST = LC_TOPICS.filter(t => t.ring === 'life').concat(LC_TOPICS.filter(t => t.ring !== 'life'));
function lcLifeChip(mode) { return LC_LIFE ? `<button class="lc-chip" style="--rc:${LC_LIFE.color}" data-ring="life" onclick="LCS['${mode}'].ring='life';lcRenderList('${mode}')">${lcEsc(LC_LIFE.name)}</button>` : ''; }
function lcPickedHtml(mode) {
  const ts = window.GGLifeKit ? GGLifeKit.picked('birch', LC_LIFE_FIRST) : [];
  return ts.length ? `<div class="glk-picks no-print"><h3>Picked for You</h3><p>Guides that fit what you chose in Health and Ability. Every guide stays open to you below.</p><div class="lc-links">${ts.map(t => `<button type="button" onclick="lcOpen('${mode}','${t.id}')">${lcEsc(t.title)}</button>`).join('')}</div></div>` : '';
}
function lcLifeRingHtml(mode) {
  const ts = LC_LIFE ? GGLifeKit.tagged(LC_LIFE_FIRST) : [];
  return ts.length ? `<div class="lc-ring" style="--rc:${LC_LIFE.color}"><h3><i></i>${lcEsc(LC_LIFE.name)}</h3><p>${lcEsc(LC_LIFE.blurb)}</p><div class="lc-links lc-life-links">${ts.map(t => `<button type="button" onclick="lcOpen('${mode}','${t.id}')">${lcEsc(t.title)}</button>`).join('')}</div></div>` : '';
}
if (window.GGLifeKit) GGLifeKit.on(() => { const v = document.getElementById('client-life'); if (v && v.classList.contains('active') && !LCS.client.open) lcRenderList('client'); });
/* Search: the same engine as the header search. Birch's guides first, then the rest of Grow With Grounded.
   Birch is an adult app, so nothing is held back. */
function lcFind(el, mode) {
  LCS[mode].q = ''; LCS[mode].find = el.value;
  if (!window.GGFind) return;
  GGFind(el, { here: 'birch', localType: 'talk', open: id => lcOpen(mode, id), openLabel: 'Talking It Through',
    hide: ['#' + mode + '-lc-list', '#' + mode + '-life .lc-chips', '#' + mode + '-life .lc-soon'], accent: 'var(--gold)' });
}
function lcOpen(mode, id) {
  mode = 'client';
  LCS[mode].open = id || null;
  showView(mode + '-life');
}
function lcClose(mode) { mode = 'client'; LCS[mode].open = null; renderLC(mode); scrollToViewTop(mode + '-life', true, false); }
function lcPersp(mode, p) { mode = 'client'; LCS[mode].persp = p; renderLC(mode); }
/* Practice links open Birch's own practice guide right under the name. */
function lcPrac(btn) {
  const g = btn.nextElementSibling; if (!g) return;
  const open = g.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}
function lcPracHtml(t) {
  return '<div class="lc-pracs">' + (t.practices || []).map(k => {
    const [part, name] = String(k).split('|'), d = lcPart(part), g = guideHtml(part, name), col = d ? d.color : 'var(--line)', shown = shownName(part, name);
    if (!g) return `<div class="lc-prac"><span class="lc-practice" style="border-color:${col}">${lcEsc(shown)}</span></div>`;
    return `<div class="lc-prac" style="--domain-color:${col}"><button type="button" class="lc-practice lc-prac-btn" style="border-color:${col}" aria-expanded="false" onclick="lcPrac(this)">${lcEsc(shown)}<span class="lc-prac-part">${lcEsc(d ? d.part : '')}</span></button><div class="guide">${g}</div></div>`;
  }).join('') + '</div>';
}
function lcSourcesHtml(t) {
  if (!window.GGSources) return '';
  if (Array.isArray(t.sources) && t.sources.length) return GGSources.line(t.sources);
  return GGSources.html('birch:' + t.id);
}
function lcDetail(mode, t) {
  if (!t) { LCS[mode].open = null; return ''; }
  const r = lcRing(t.ring), st = LCS[mode], self = st.persp !== 'helper', sf = t.self || {}, hp = t.helper || {};
  const view = self ? `
      <h3>What this can feel like</h3><p>${lcEsc(t.feel)}</p>
      <h3>First steps</h3>${lcList(sf.first)}
      <h3>What helps</h3>${lcList(sf.helps)}
      <h3>What to tell yourself</h3><div class="lc-say">${(sf.tell || []).map(x => `<p>${lcEsc(x)}</p>`).join('')}</div>
      <h3>Telling your people</h3><p>${lcEsc(sf.people)}</p>`
    : `
      <h3>What they may be carrying</h3><p>${lcEsc(t.feel)} ${lcEsc(hp.feel)}</p>
      <h3>What to say</h3><div class="lc-say">${(hp.say || []).map(x => `<p>${lcEsc(x)}</p>`).join('')}</div>
      <div class="lc-two"><div><b>What not to say or do</b>${lcList(hp.avoid)}</div><div><b>Practical ways to help</b>${lcList(hp.help)}</div></div>
      <h3>Looking after yourself as the helper</h3><p>${lcEsc(hp.you)}</p>`;
  return `<article class="lc-article" id="${mode}-lc-article" style="--rc:${r.color}">
    <div class="btn-row no-print" style="justify-content:space-between;align-items:center;margin:0 0 12px">
      <button class="lc-back" onclick="lcClose('${mode}')">Back to all guides</button>
      <button class="btn btn-secondary" onclick="printGrowthPlan('${mode}-lc-article')">Save or Print This Guide</button>
    </div>
    <span class="lc-tag">${lcEsc(r.name)}</span>
    <h2>${lcEsc(t.title)}</h2>
    <div class="lc-quick"><b>Quick Reference</b>${lcList(t.quick)}</div>
    ${lcVids(t.id, self)}
    <div class="lc-toggle no-print" role="group" aria-label="Choose a view">
      <button aria-pressed="${self}" onclick="lcPersp('${mode}','self')">For You</button>
      <button aria-pressed="${!self}" onclick="lcPersp('${mode}','helper')">For the Helper</button>
    </div>
    ${view}
    ${t.faith ? `<h3>Faith and meaning</h3><p>${lcEsc(t.faith)}</p>` : ''}
    <h3>Using Birch</h3><p>Parts of the tree this often touches: <b>${lcEsc(lcPartsText(t))}</b>. Practices that can help (tap one to see how):</p>${lcPracHtml(t)}<p>A check-in in a few weeks can show how ${self ? 'you are' : 'they are'} doing.</p>
    <h3>When to reach out for more help</h3><div class="lc-reach">${lcList(t.reach)}</div>
    ${(t.more || []).length ? `<h3>Learn more</h3><ul>${t.more.map(([n, u]) => `<li><a class="text-link" href="${lcEsc(u)}" target="_blank" rel="noopener">${lcEsc(n)}</a></li>`).join('')}</ul>` : ''}
    ${window.GGShelf ? GGShelf.html('birch', t.id) : ''}
    ${lcSourcesHtml(t)}
    ${lcHelpHtml(t)}
    <p class="lc-note">From When Life Changes in Birch&trade; by Grow With Grounded. General spiritual and emotional guidance and support; for therapy, medical care, or legal advice, it points you to the right people. In danger right now: 911. Crisis: call or text 988, or text HOME to 741741. &copy; ${new Date().getFullYear()} Grow With Grounded LLC. You are welcome to print this guide for personal use.</p>
  </article>`;
}
/* When Life Changes videos (GWG BLD 743): two per guide, For You and For the Helper, played by shared/gg-learn.js
   from birch/guide-videos.js. BR_VIDS lists the guides that have them so far (written by the build's generator).
   A quiet check shows once a video has been watched (kept inside the unlocked profile's vault by gg-learn.js, BLD 756). */
/* BR_VIDS start */const BR_VIDS = ["first-year", "not-college", "changing-plans", "pressure-burnout", "adhd", "what-now", "first-job", "job-loss", "career-change", "money-basics", "debt", "gambling", "moving-out", "roommates", "first-apartment", "moving-back", "new-city", "housing", "friends", "loneliness", "dating", "breakup", "controlling", "engaged", "parents-adult", "estrangement", "unplanned-pregnancy", "young-parent", "after-baby", "pregnancy-loss", "anxiety", "depression", "first-signs", "substances", "eating", "health-26", "suicide-thoughts", "friend-suicide", "selfharm", "sexual-assault", "images", "porn", "military", "coming-home", "grief-young", "faith-own", "faith-hurt", "purpose", "college-disability", "work-disability", "pain-fatigue", "living-well-mi", "autistic-adult", "deaf-hoh", "blind-low-vision", "dating-disability", "young-carer", "faith-disability"];/* BR_VIDS end */
function lcVidWatched(id) { try { return !!(window.GGLearn && GGLearn.watched && GGLearn.watched('birch', id)); } catch (e) { return false; } }
function lcVids(gid, self) {
  if (!BR_VIDS.includes(gid)) return '';
  const b = (side, name, pri) => { const id = 'br-g-' + gid + '-' + side, w = lcVidWatched(id);
    return `<button type="button" class="btn ${pri ? 'btn-primary' : 'btn-secondary'}" onclick="lcWatch('${gid}','${side}')">${w ? '&#10003;' : '&#9654;'} Watch: ${name}${w ? ' <span class="lc-gv-w">Watched</span>' : ''}</button>`; };
  return `<div class="lc-gv no-print"><div class="btn-row">${b('you', 'For You', self)}${b('helper', 'For the Helper', !self)}</div>
    <p class="lc-gv-note">For You, if this is what you're facing. For the Helper, if you're walking beside someone who is. A few minutes each, narrated aloud.</p></div>`;
}
function lcWatch(gid, side) { if (window.GGLearn) GGLearn.open('birch', 'br-g-' + gid + '-' + side, { from: 'guide' }); }
// gg-learn's Open the Full Guide button lands here.
window.GG_GUIDE_OPEN = window.GG_GUIDE_OPEN || {};
window.GG_GUIDE_OPEN.birch = id => { if (lcHas(id)) lcOpen('client', id); };
['gg-learn-close', 'gg-learn-marks'].forEach(ev => window.addEventListener(ev, () => { if (LCS.client.open && document.getElementById('client-life')) { const y = window.scrollY; renderLC('client'); window.scrollTo(0, y); } }));
/* After a check-in: guides that touch the parts carrying the most (each Growing Edge part), two per part,
   lowest part first. A part marked Not sure yet is left out. My Season may move its own guides
   (birch/checkin.js mySeason guides) to the front of each part's list; it never hides any. */
function lcSeasonGuides() { const out = []; seasonsNow().forEach(id => ((SEASONS.find(x => x.id === id) || {}).guides || []).forEach(g => { if (!out.includes(g)) out.push(g); })); return out; }
function lcSuggestHtml(scores, unsure) {
  const skip = unsure || [];
  const low = PART_ORDER.filter(k => !skip.includes(k) && scores[k] != null && scores[k] < 5).sort((a, b) => scores[a] - scores[b]);
  if (!low.length || !LC_TOPICS.length) return '';
  const fav = lcSeasonGuides(), rank = t => { const i = fav.indexOf(t.id); return i < 0 ? fav.length : i; };
  const picks = [];
  low.forEach(k => LC_TOPICS.filter(t => (t.parts || []).includes(k) && !picks.includes(t)).map((t, i) => [t, i]).sort((a, b) => rank(a[0]) - rank(b[0]) || a[1] - b[1]).slice(0, 2).forEach(x => picks.push(x[0])));
  if (!picks.length) return '';
  const crisis = scores.fruit <= 2 && !skip.includes('fruit') ? `<p><b>If you are having thoughts of ending your life, call or text 988 now, or text HOME to 741741. In danger right now, call 911.</b></p>` : '';
  return `<div class="lc-suggest no-print"><h3>When Life Changes</h3>
    <p>Some parts of your tree are carrying a lot right now. These guides may help you find words and next steps.</p>
    ${crisis}<div class="lc-links">${picks.map(t => `<button type="button" onclick="lcOpen('client','${t.id}')">${lcEsc(t.title)}</button>`).join('')}<button type="button" onclick="lcOpen('client',null)">Browse all guides</button></div>
    <p class="lc-oak"><a class="text-link" href="/oak/#life">More guides in Oak</a></p></div>`;
}

// =====================================================================
// NAVIGATION: seven tabs. Each view belongs to one tab.
// =====================================================================
const VIEW_TAB = { 'client-today': 'today', 'client-intro': 'today', 'client-week': 'week', 'client-season': 'season', 'client-assess': 'season', 'client-results': 'season', 'client-progress': 'season', 'client-growthplan': 'plan', 'client-ground': 'ground', 'client-life': 'guides' };
function showView(id) {
  if (!document.getElementById(id)) return;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const tab = VIEW_TAB[id];
  document.querySelectorAll('#client-nav .nav-btn').forEach(b => { const on = b.getAttribute('data-tab') === tab; b.classList.toggle('active', on); if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
  if (id === 'client-ground') renderGround();
  if (id === 'client-life') renderLC('client');
  if (id === 'client-growthplan') { if (HELP) renderHelpPlan(); else oakPlanOpen(); }
  if (id === 'client-today' || id === 'client-week' || id === 'client-season') { if (HELP) renderHelpTabs(); else if (window.GGTend) GGTend.render(); }
  scrollToViewTop(id, false, false);
}
function goHome() { showView('client-today'); }

// App-ready: a real PDF for the share sheet, with Print as a backup.
function printGrowthPlan(sheetId) {
  const sheet = document.getElementById(sheetId);
  if (!sheet) return;
  if (!window.GGApp || !window.ggPdfFromEl) { printGrowthPlanNow(sheetId); return; }
  const guide = /lc-article/.test(sheetId), h = sheet.querySelector('h2,h1,.growth-plan-title');
  GGApp.sheet({ title: guide ? (h ? h.textContent : 'This guide') : 'Birch growth plan', file: guide ? 'birch-guide.pdf' : 'birch-growth-plan.pdf', print: () => printGrowthPlanNow(sheetId),
    blocks: () => ggPdfFromEl(sheet, { rows: '.growth-plan-domain-header', eyebrow: 'Birch by Grow With Grounded', foot: 'Birch(TM) by Grow With Grounded. growwithgrounded.com/birch' }) });
}
function printGrowthPlanNow(sheetId) {
  document.querySelectorAll('.print-target').forEach(el => el.classList.remove('print-target'));
  const sheet = document.getElementById(sheetId);
  if (!sheet) return;
  sheet.classList.add('print-target');
  window.print();
}

// =====================================================================
// THE GAME LAYER (decision 13, Pine's): mastery, tree levels, milestones (Skills
// I've Got among them), the balance bonus, Steady or Hardy, and the 14-day pause.
// Never streaks, never shame, never random rewards, never anything taken away.
// Saved in tend.bc.
// =====================================================================
const KIND_WORDS = [
  'Nice. Small and steady is how a birch grows.',
  'That counts. You showed up for yourself today.',
  'Done. Your tree is better for it.',
  'Good work. A little each day adds up.',
  'Checked off. That was for you.',
  'Well tended. Rest is part of the work too.',
  'Roots grow where no one can see them. Keep going.',
  'Solid. Some days one practice is the whole job.',
  'Every ring on a tree started as an ordinary day.',
  'That is one more good thing in today.'
];
function kindWord(n) { const day = Math.floor(Date.now() / 86400000); return KIND_WORDS[(day * 7 + (n || 0)) % KIND_WORDS.length]; }
function pnCheer(text, sub) {
  let el = document.getElementById('sq-cheer');
  if (!el) { el = document.createElement('div'); el.id = 'sq-cheer'; el.className = 'sq-cheer'; el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite'); document.body.appendChild(el); }
  el.innerHTML = `<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="var(--gold)"/><path d="M18 33l9 9 19-20" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg><p>${escapeHtml(text)}</p>${sub ? `<p class="pn-cheer-sub">${escapeHtml(sub)}</p>` : ''}`;
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
  clearTimeout(pnCheer.t); pnCheer.t = setTimeout(() => el.classList.remove('show'), 3800);
}
const MASTERY = [[15, 'Mine'], [5, 'Building'], [1, 'Tried']];
const TREE_LEVELS = [[0, 'Seed'], [1, 'Sprout'], [7, 'Seedling'], [21, 'Sapling'], [45, 'Young Birch'], [90, 'Tall Birch'], [180, 'Birch Grove']];
const HARDY_DAYS = 10;
const MILES = [
  ['day1', 'First Day Tended', 'You tended your tree for the first time.'],
  ['six', 'All Six in a Day', 'You tended every part of your tree in one day.'],
  ['week', 'First Full Week', 'You tended your tree all seven days of a week.'],
  ['balance', 'First Balanced Week', 'You tended all six parts in one week.'],
  ['mine', 'First Practice That\'s Yours', 'A practice moved all the way to Mine.'],
  ['ring', 'First Ring', 'You finished a whole season and added a ring.']
].concat((((window.BIRCH_GROUNDWORK || {}).game || {}).miles) || [['skill1', 'First Skill I\'ve Got', 'You marked your first skill in Groundwork.'], ['skill10', 'Ten Skills I\'ve Got', 'Ten practical skills, marked in Groundwork.'], ['skillset', 'A Full Set of Skills', 'Every skill in one Groundwork chapter, marked.']]);
const pd = s => String(s).split('-').map(Number);
const dOf = s => { const p = pd(s); return new Date(p[0], p[1] - 1, p[2]); };
const keyOf = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const addD = (s, n) => { const d = dOf(s); d.setDate(d.getDate() + n); return keyOf(d); };
const mondayOf = s => { const d = dOf(s); return addD(s, -((d.getDay() + 6) % 7)); };
function sTended(s, k) { const x = (s.days || {})[k]; return !!(x && ((x.d && x.d.length) || (x.a && x.a.length))); }
function pnRec(s) { if (!s.bc || typeof s.bc !== 'object') s.bc = { miles: {}, bal: {} }; s.bc.miles = s.bc.miles || {}; s.bc.bal = s.bc.bal || {}; return s.bc; }
function daysTended(s) { return Object.keys(s.days || {}).filter(k => sTended(s, k)).length; }
function treeLevel(n) { let i = 0; TREE_LEVELS.forEach((L, j) => { if (n >= L[0]) i = j; }); return { name: TREE_LEVELS[i][1], next: TREE_LEVELS[i + 1] || null }; }
function masteryCount(s, key, name) { const id = key + '|' + name; return Object.keys(s.days || {}).filter(k => ((s.days[k] || {}).d || []).includes(id)).length; }
function masteryOf(n) { const m = MASTERY.find(x => n >= x[0]); return m ? m[1] : ''; }
function weekPartsSet(s, mon) { const set = {}; for (let i = 0; i < 7; i++) { const x = (s.days || {})[addD(mon, i)]; if (x) (x.d || []).forEach(id => { set[id.split('|')[0]] = 1; }); } return set; }
function weeksOf(s) { const w = {}; Object.keys(s.days || {}).forEach(k => { if (sTended(s, k)) { const m = mondayOf(k); (w[m] = w[m] || []).push(k); } }); return w; }
function balancedWeeks(s) { return Object.keys(weeksOf(s)).filter(m => Object.keys(weekPartsSet(s, m)).length >= 6); }
function fullWeeks(s) { const w = weeksOf(s); return Object.keys(w).filter(m => w[m].length >= 7); }
function partLastTended(s, key) { let last = null; Object.keys(s.days || {}).forEach(k => { if (((s.days[k] || {}).d || []).some(id => id.split('|')[0] === key) && (!last || k > last)) last = k; }); return last; }
function planParts(s) { const p = s.plan || {}; return PART_ORDER.filter(k => { const x = p[k] || {}; return (x.selected || []).length || x.custom || (x.own || []).length || (x.lib || []).length; }); }
function pnMode(s) { return (s && s.bc && s.bc.mode) === 'hardy' ? 'hardy' : 'steady'; }
// The pause: for 14 days after a check-in flags losing hope or feeling alone, or the
// safety step asks for support, the tree holds as it is and Hardy rests.
function pnPause() {
  const cut = addD(todayKey(), -14);
  return (personalHistory || []).some(e => e && !e.from && e.date >= cut && ((e.flags || []).some(f => f === 'hope' || f === 'alone') || safeOn('self', (e.safety || {}).self)));
}
// Hardy: a part with practices in the plan, left untended for HARDY_DAYS or more, shows
// trouble. One practice in that part heals it. Steady never shows trouble.
function hardyDays(s, key) {
  if (pnMode(s) !== 'hardy' || pnPause() || !planParts(s).includes(key)) return 0;
  const since = partLastTended(s, key) || pnRec(s).hardyFrom || s.start; if (!since) return 0;
  const n = Math.round((dOf(todayKey()) - dOf(since)) / 86400000);
  return n >= HARDY_DAYS ? n : 0;
}
function milesNow(s) {
  const n = daysTended(s), out = {};
  if (n >= 1) out.day1 = 1;
  if (Object.keys(s.days || {}).some(k => { const set = {}; ((s.days[k] || {}).d || []).forEach(id => { set[id.split('|')[0]] = 1; }); return Object.keys(set).length >= 6; })) out.six = 1;
  if (fullWeeks(s).length) out.week = 1;
  if (balancedWeeks(s).length) out.balance = 1;
  if (items(s).some(it => masteryCount(s, it.key, it.name) >= 15)) out.mine = 1;
  (s.rings || []).forEach((r, i) => { out[i ? 'season' + (i + 1) : 'ring'] = 1; });
  // Skills I've Got in Groundwork: the first one, ten, and every skill in one chapter
  const sk = skillsDone(), SK = GW.skills || {};
  if (sk.length >= 1) out.skill1 = 1;
  if (sk.length >= 10) out.skill10 = 1;
  if (Object.keys(SK).some(ch => (SK[ch] || []).length && SK[ch].every(x => sk.includes(x.id)))) out.skillset = 1;
  return out;
}
function items(s) { const out = []; const p = s.plan || {}; PART_ORDER.forEach(k => { const x = p[k] || {}; (x.selected || []).forEach(n => out.push({ key: k, name: n })); }); return out; }
function mileName(id) { const m = MILES.find(x => x[0] === id); return m ? m[1] : id.indexOf('season') === 0 ? 'Season ' + id.slice(6) + ' Finished' : id; }
// Records any milestone reached for the first time, and says so once.
// quiet (while Today draws): only ring and season milestones, which come from a
// check-in. Practice milestones and the balanced-week bonus wait for onCheckGame,
// so the cheer fires the moment one is first reached (GWG BLD 745).
function checkMiles(s, quiet) {
  const R = pnRec(s), now = milesNow(s), fresh = [];
  Object.keys(now).forEach(id => { if (quiet && !/^(ring|season)/.test(id)) return; if (!R.miles[id]) { R.miles[id] = todayKey(); fresh.push(id); } });
  if (quiet) return fresh;
  balancedWeeks(s).forEach(m => { if (!R.bal[m]) { R.bal[m] = todayKey(); if (m === mondayOf(todayKey())) fresh.push('bonus'); } });
  return fresh;
}
function todayKindHtml(s) {
  const n = window.GGTend ? GGTend.partsOn(todayKey()) : 0, paused = pnPause();
  const lineA = paused ? 'Your tree is holding still with you right now. Tend it when you can. Nothing will be lost.' : n ? kindWord(n) : 'One practice is enough to start. Your checkmark is waiting.';
  const days = daysTended(s), L = treeLevel(days), wk = weekPartsSet(s, mondayOf(todayKey())), wn = Object.keys(wk).length;
  const trouble = PART_ORDER.filter(k => hardyDays(s, k));
  checkMiles(s, true);
  return `<div class="gt-card sq-kind"><p class="sq-kind-line">${escapeHtml(lineA)}</p>${n ? `<p class="gt-small">${n} of 6 parts tended today.</p>` : ''}</div>
    <div class="gt-card pn-game"><div class="pn-level"><span class="pn-level-k">Your tree</span><b>${escapeHtml(L.name)}</b><span class="gt-small">${days} day${days === 1 ? '' : 's'} tended${L.next ? `. ${L.next[0] - days} more to ${escapeHtml(L.next[1])}.` : '. The oldest stage of all.'}</span></div>
    <div class="pn-bal"><span class="pn-level-k">This week</span><div class="pn-dots" role="img" aria-label="${wn} of 6 parts tended this week">${ALL_DOMAINS.map(d => `<span class="pn-dot${wk[d.key] ? ' on' : ''}" style="--pc:${d.color}" title="${d.part}"></span>`).join('')}</div><span class="gt-small">${wn >= 6 ? 'Balanced week. All six parts tended.' : wn + ' of 6 parts tended. All six makes a balanced week.'}</span></div>
    <p class="gt-small pn-mode-line">${pnMode(s) === 'hardy' ? (paused ? 'Hardy is resting for now, and nothing shows trouble.' : 'Hardy is on: a part left untended for ' + HARDY_DAYS + ' days shows trouble until you tend it.') : 'Steady tree: gentle, and nothing is ever lost.'} <button type="button" class="text-btn" onclick="GGTend.openSettings('pn-set-game')">Change</button></p>
    ${trouble.length ? `<p class="pn-trouble">${trouble.map(k => escapeHtml(DOMAIN_BY_KEY[k].part)).join(', ')} ${trouble.length === 1 ? 'needs' : 'need'} water. One practice heals it.</p>` : ''}</div>`
    + setupCardHtml() + bringHtml() + moveOakHtml(true);
}
function itemTagHtml(key, name, s) { const m = masteryOf(masteryCount(s, key, name)); return m ? ` <span class="pn-mastery pn-m-${m.toLowerCase()}">${m}</span>` : ''; }
function partNoteHtml(key, s) { const n = hardyDays(s, key); return n ? `<p class="pn-trouble">Leaves yellowing: ${n} days since this part was tended. One practice today heals it.</p>` : ''; }
function milestonesHtml(s) {
  const R = pnRec(s), got = Object.keys(R.miles).sort((a, b) => String(R.miles[a]).localeCompare(String(R.miles[b])));
  const nb = balancedWeeks(s).length;
  return `<div class="gt-card pn-miles"><h3>Milestones</h3>${got.length ? `<ul class="pn-mile-list">${got.map(id => `<li><b>${escapeHtml(mileName(id))}</b><span>${escapeHtml(formatDate(R.miles[id]))}</span></li>`).join('')}</ul>` : '<p class="gt-small">Your first milestone comes with your first day of tending.</p>'}
    ${nb ? `<p class="gt-small">${nb} balanced week${nb === 1 ? '' : 's'} so far.</p>` : ''}
    <p class="gt-small">Still ahead: ${MILES.filter(m => !R.miles[m[0]]).map(m => escapeHtml(m[1])).join(', ') || 'a new ring every season'}.</p></div>`;
}
function onCheckGame(done, key, s, parts) {
  if (!done) return;
  const fresh = checkMiles(s);
  if (fresh.length) { persistTend(); pnCheer(fresh.includes('bonus') ? 'Balanced week. All six parts tended this week.' : 'New milestone: ' + mileName(fresh.filter(x => x !== 'bonus')[0] || fresh[0]), kindWord(parts)); return; }
  pnCheer(parts >= 6 ? 'All six parts tended today. That is a full day.' : kindWord(parts));
}
function persistTend() { return PROF && window.GGP ? GGP.save(PROF.id) : Promise.resolve(); }
function setPnMode(m) {
  const s = window.GGTend && GGTend.state(); if (!s) { showToast('Open your profile first.'); return; }
  const R = pnRec(s); R.mode = m === 'hardy' ? 'hardy' : 'steady'; if (R.mode === 'hardy') R.hardyFrom = todayKey();
  persistTend().then(() => { showToast(R.mode === 'hardy' ? 'Hardy is on. Untended parts show trouble after ' + HARDY_DAYS + ' days.' : 'Steady tree. Gentle, and nothing is lost.'); GGTend.render(); reopenSettings('pn-set-game'); });
}

// The simple graph: days tended each week, and each part's level at each check-in.
function weeksTended(n) {
  const out = [], now = new Date(), back = (now.getDay() + 6) % 7, mon = new Date(now.getFullYear(), now.getMonth(), now.getDate() - back);
  for (let w = n - 1; w >= 0; w--) {
    let c = 0; const start = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() - w * 7);
    for (let i = 0; i < 7; i++) { const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i); if (window.GGTend && GGTend.tended(keyOf(d))) c++; }
    out.push({ start, n: c });
  }
  return out;
}
function daysGraphHtml() {
  const W = weeksTended(12), bw = 30, gap = 10, H = 120, x0 = 34;
  const total = W.reduce((t, w) => t + w.n, 0);
  let svg = `<svg class="sq-graph" viewBox="0 0 ${x0 + W.length * (bw + gap) + 4} ${H + 46}" role="img" aria-label="Days tended in each of the last 12 weeks: ${W.map(w => w.n).join(', ')}">`;
  [0, 7].forEach(v => { const y = 10 + H - v / 7 * H; svg += `<line x1="${x0 - 4}" x2="${x0 + W.length * (bw + gap)}" y1="${y}" y2="${y}" stroke="var(--line)" stroke-width="1"/><text x="${x0 - 8}" y="${y + 5}" text-anchor="end" class="sq-ax">${v}</text>`; });
  W.forEach((w, i) => {
    const h = Math.max(w.n ? 4 : 0, w.n / 7 * H), x = x0 + i * (bw + gap), y = 10 + H - h;
    svg += `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="4" fill="var(--gold)" opacity="${i === W.length - 1 ? 1 : .78}"/>`;
    svg += `<text x="${x + bw / 2}" y="${(w.n ? y - 5 : 10 + H - 5)}" text-anchor="middle" class="sq-val">${w.n}</text>`;
    if (i % 2 === 1 || i === W.length - 1) svg += `<text x="${x + bw / 2}" y="${H + 30}" text-anchor="middle" class="sq-ax">${i === W.length - 1 ? 'This week' : w.start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</text>`;
  });
  svg += '</svg>';
  return `<div class="sq-graph-box"><h4>Days Tended, Week by Week</h4>${svg}<p class="gt-small">${total} day${total === 1 ? '' : 's'} tended in the last twelve weeks. Every bar counts, short ones too.</p></div>`;
}
function levelsGraphHtml(list) {
  const full = (list || []).filter(e => e && e.scores && !e.from && e.type !== 'quick').slice(-8);
  if (!full.length) return `<div class="sq-graph-box"><h4>Your Parts Over Time</h4><p class="gt-small">After your first full check-in, each part of your tree shows here, one point for each check-in.</p></div>`;
  const W = 220, H = 56, n = full.length, xs = i => n === 1 ? W / 2 : 10 + i * (W - 20) / (n - 1), ys = v => 6 + (10 - v) / 9 * (H - 12);
  const rows = ALL_DOMAINS.map(d => {
    const pts = full.map((e, i) => ({ i, v: stShown(e, d.key) })).filter(p => p.v != null);
    const last = pts.length ? pts[pts.length - 1].v : null;
    let svg = `<svg viewBox="0 0 ${W} ${H}" class="sq-spark" role="img" aria-label="${d.part}: ${pts.map(p => stLevel(p.v)).join(', ') || 'not sure yet'}">`;
    svg += `<line x1="0" x2="${W}" y1="${ys(8)}" y2="${ys(8)}" stroke="var(--line)" stroke-dasharray="3 4"/><line x1="0" x2="${W}" y1="${ys(5)}" y2="${ys(5)}" stroke="var(--line)" stroke-dasharray="3 4"/>`;
    if (pts.length > 1) svg += `<polyline points="${pts.map(p => xs(p.i).toFixed(1) + ',' + ys(p.v).toFixed(1)).join(' ')}" fill="none" stroke="${d.color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
    pts.forEach(p => { svg += `<circle cx="${xs(p.i).toFixed(1)}" cy="${ys(p.v).toFixed(1)}" r="5" fill="${d.color}" stroke="var(--card)" stroke-width="2"/>`; });
    svg += '</svg>';
    return `<div class="sq-row" style="--domain-color:${d.color}"><b>${d.part}</b>${svg}<span>${last == null ? 'Not sure yet' : stLevel(last)}</span></div>`;
  }).join('');
  return `<div class="sq-graph-box"><h4>Your Parts Over Time</h4><p class="gt-small">One point for each full Birch check-in, oldest on the left. The dashed lines mark Steady and Strong.</p>${rows}</div>`;
}
function graphCardHtml() { return `<div class="gt-card sq-graphs"><h3>Your Growth Over Time</h3>${daysGraphHtml()}${levelsGraphHtml(personalHistory)}</div>`; }
function seasonExtraHtml(s) { return graphCardHtml() + (s ? milestonesHtml(s) : ''); }

// =====================================================================
// TENDING: Today, Week, and Season (/shared/gg-tend.js)
// =====================================================================
function oakLatestEntry() {
  const list = (personalHistory || []).filter(e => e && e.scores && !e.from);
  const full = list.filter(e => e.type !== 'quick');
  return full[full.length - 1] || list[list.length - 1] || null;
}
function oakPrefillPlan() {
  const box = document.getElementById('client-growthplan-builder'), first = box && box.querySelector('.domain-card');
  if (!first || first.dataset.filled) return;
  first.dataset.filled = '1';
  const plan = (window.GGTend && GGTend.plan()) || (window.currentClientEntry && currentClientEntry.growthPlan) || null;
  if (!plan) return;
  ALL_DOMAINS.forEach(d => {
    const p = plan[d.key] || {}, chosen = new Set(p.selected || []);
    document.querySelectorAll(`input[name="cp-client-${d.key}"]`).forEach(c => { c.checked = chosen.has(c.value); });
    oakRotApply('client', d.key);
    const custom = document.getElementById(`cp-client-${d.key}-custom`); if (custom) custom.value = p.custom || '';
  });
}
function oakPlanOpen() {
  if (!window.lastClientScores) {
    const e = oakLatestEntry();
    if (e) { window.lastClientScores = e.scores; window.lastClientUnsure = e.unsure || []; renderGrowthPlanBuilder('client'); }
  }
  oakPrefillPlan();
}
function oakSavePlan() {
  const plan = collectGrowthPlan('client');
  const n = ALL_DOMAINS.reduce((t, d) => t + plan[d.key].selected.length + (plan[d.key].custom ? 1 : 0), 0);
  if (!n) { showToast('Choose at least one practice first.'); return; }
  generateGrowthPlanDoc('client');
  if (PROF && window.GGTend) {
    GGTend.setPlan(plan);
    if (window.currentClientEntry) savePersonalFile();
    setTimeout(() => showToast('Saved. Your practices are in Today.'), 700);
  }
}
// =====================================================================
// A CARD FROM A Birch GUIDE VISIT (GWG BLD 746)
// A Guide's QR code or link (GGApp.visit, /shared/gg-app.js) carries only a first
// name, the date, the strong parts, and what the person chose to try. Never levels,
// notes, safety answers, the optional question, or anyone else's name. It asks
// before saving, then lives in the person's own locked profile, as visitCards in
// the birch record, shows on Today, and can be removed any time.
// =====================================================================
let VC_ASKED = null;   // whose tree the waiting card last asked about ('' for no one), so it asks once per person
function vcHelping() { return !!HELP; }
function vcRec() { return PROF && window.GGP && GGP.isOpen(PROF.id) ? GGP.data(PROF.id, 'birch') : null; }
function vcList() { const r = vcRec(); return r && Array.isArray(r.visitCards) ? r.visitCards : []; }
function vcPart(k) { const d0 = DOMAIN_BY_KEY[k]; if (!d0) return null; return typeof partDef === 'function' ? partDef(d0) : d0; }
function vcPartName(k) { const d = vcPart(k); return d ? d.part + (d.name ? ' (' + String(d.name).toLowerCase() + ')' : '') : ''; }
// A practice the tree already knows goes in by its own name, so How to do this works; any other goes in as the person's own.
function vcKnown(k, name) {
  const d = DOMAIN_BY_KEY[k], n = String(name || '').toLowerCase();
  const r = d && (d.restore || []).find(x => String(x[0]).toLowerCase() === n || (typeof shownName === 'function' && String(shownName(k, x[0])).toLowerCase() === n));
  return r ? r[0] : null;
}
function vcPlanHas(plan, k, name) {
  const x = (plan || {})[k] || {}, n = String(name || '').toLowerCase(), known = vcKnown(k, name);
  return (x.selected || []).some(y => y === known || String(y).toLowerCase() === n) || (x.own || []).some(y => String(y).toLowerCase() === n)
    || String(x.custom || '').toLowerCase() === n || (x.lib || []).some(l => l && String(l.n || '').toLowerCase() === n);
}
function vcAllIn(v) { const plan = window.GGTend && GGTend.plan(); return !!plan && (v.t || []).every(t => vcPlanHas(plan, t[0], t[1])); }
function vcCardHtml(v, i, dated) {
  const strong = (v.s || []).map(vcPartName).filter(Boolean), tries = (v.t || []).filter(t => DOMAIN_BY_KEY[t[0]]);
  return `${dated ? `<p class="gt-small" style="margin:0 0 6px">${escapeHtml(formatDate(v.d))}</p>` : ''}
    ${strong.length ? `<p><b>Strong parts:</b> ${strong.map(escapeHtml).join(', ')}</p>` : ''}
    ${tries.length ? `<p style="margin-top:8px"><b>What you chose to try:</b></p><ul style="margin:4px 0 0;padding-left:20px">${tries.map(t => `<li><b>${escapeHtml(t[1])}</b> <span class="gt-small">(${escapeHtml(vcPart(t[0]).part)})</span>${t[2] ? ': ' + escapeHtml(t[2]) : ''}</li>`).join('')}</ul>` : ''}
    <div class="btn-row" style="margin-top:10px">${tries.length && window.GGTend && !vcHelping() ? (vcAllIn(v) ? '<span class="gt-small">These practices are in your growth plan.</span>' : `<button type="button" class="btn btn-primary btn-sm" onclick="vcAddPlan(${i})">Add to my growth plan</button>`) : ''}<button type="button" class="btn btn-secondary btn-sm" onclick="vcRemove(${i})">Remove this card</button></div>`;
}
function vcTodayHtml() {
  if (vcHelping()) return '';
  const list = vcList(); if (!list.length) return '';
  const last = list.length - 1, v = list[last];
  return `<div class="gt-card vc-card" style="border-left:5px solid var(--gold,#8B5E1A)"><h3>From your visit on ${escapeHtml(formatDate(v.d))}</h3>${vcCardHtml(v, last)}
    ${list.length > 1 ? `<details style="margin-top:12px"><summary>Earlier visits (${list.length - 1})</summary>${list.slice(0, -1).map((x, i) => `<div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--line,#ddd)">${vcCardHtml(x, i, true)}</div>`).reverse().join('')}</details>` : ''}
    <p class="gt-small" style="margin-top:10px">Kept in your own locked profile on this device.</p></div>`;
}
function vcAddPlan(i) {
  const v = vcList()[i]; if (!v || !window.GGTend || vcHelping()) return;
  if (!GGTend.state()) { showToast('Open your profile to add practices.'); return; }
  const plan = JSON.parse(JSON.stringify(GGTend.plan() || {})); let n = 0;
  (v.t || []).forEach(t => {
    const k = t[0]; if (!DOMAIN_BY_KEY[k] || vcPlanHas(plan, k, t[1])) return;
    const x = plan[k] || (plan[k] = { selected: [], custom: '', own: [] }); if (!Array.isArray(x.selected)) x.selected = [];
    const known = vcKnown(k, t[1]); if (known) x.selected.push(known); else (x.own || (x.own = [])).push(String(t[1]));
    n++;
  });
  if (!n) { showToast('These practices are already in your growth plan.'); return; }
  GGTend.setPlan(plan);
  showToast(n === 1 ? 'Added to your growth plan. It shows here on Today.' : n + ' practices added to your growth plan. They show here on Today.');
}
function vcRemove(i) {
  const r = vcRec(); if (!r || !Array.isArray(r.visitCards) || !r.visitCards[i]) return;
  if (!confirm('Remove this card from your tree? Any practices you added stay in your growth plan.')) return;
  r.visitCards.splice(i, 1); if (!r.visitCards.length) delete r.visitCards;
  GGP.save(PROF.id).then(() => showToast('Card removed.'), () => showToast('That did not save. Open your profile and try again.'));
  if (window.GGTend) GGTend.render();
}
function vcAdd() {
  const v = window.GGApp && GGApp.visit.pending(), r = vcRec();
  if (!v) return;
  if (!r) { VC_ASKED = null; showToast('Open your profile first, then the card will ask again.'); return; }
  const card = { d: v.d, s: v.s, t: v.t }, same = JSON.stringify(card);
  if (!Array.isArray(r.visitCards)) r.visitCards = [];
  if (!r.visitCards.some(x => JSON.stringify({ d: x.d, s: x.s, t: x.t }) === same)) r.visitCards.push(Object.assign({ added: todayKey() }, card));
  if (r.visitCards.length > 12) r.visitCards = r.visitCards.slice(-12);
  GGApp.visit.clear();
  GGP.save(PROF.id).then(() => showToast('Added to your tree. You will find it on Today.'), () => showToast('That did not save. Open your profile and try again.'));
  goHome(); if (window.GGTend) GGTend.render();
}
function vcCheck(force) {
  if (!window.GGApp || !GGApp.visit || !GGApp.dialog) return;
  const v = GGApp.visit.pending(); if (!v) return;
  const who = PROF ? PROF.id : '';
  if (!force && VC_ASKED === who) return;
  VC_ASKED = who;
  const intro = `<p>${v.n ? escapeHtml(v.n) + ', here' : 'Here'} is a card from your Birch Guide visit on ${escapeHtml(formatDate(v.d))}: your strong parts and what you chose to try. It goes on your own tree, kept in your own locked profile.</p>
    <p class="ggx-small">You can remove it any time.</p>`;
  const drop = { t: "Don't Add It", kind: 'quiet', fn: () => { GGApp.visit.clear(); showToast('The card was not added.'); } };
  const later = { t: 'Not Now', kind: 'line', fn: () => {} };
  if (!PROF) {
    GGApp.dialog({ title: 'A card from your visit', html: intro + '<p>Open your profile first, and this card will ask again.</p>',
      buttons: [{ t: 'Open My Profile', kind: 'main', fn: () => { if (window.GGP) bcOpenAny(); } }, later, drop] });
    return;
  }
  const first = String(PROF.name || '').trim().split(/\s+/)[0].toLowerCase(), other = !!(v.n && first && first !== v.n.toLowerCase());
  GGApp.dialog({ title: 'A card from your visit', html: intro + `<p>Add it to ${escapeHtml(PROF.name)}'s tree?</p>` + (other ? `<p class="ggx-small">This card is for ${escapeHtml(v.n)}. If ${escapeHtml(v.n)} has a profile on this device, choose Switch Person.</p>` : ''),
    buttons: [{ t: 'Add to My Tree', kind: 'main', fn: vcAdd }].concat(other ? [{ t: 'Switch Person', kind: 'line', fn: () => { VC_ASKED = null; bcSwitch(); } }] : [], [later, drop]) });
}
window.addEventListener('gg-visit', () => vcCheck(true));

const TEND_CFG = {
  libAge: () => 'birch',
  profileId: () => PROF ? PROF.id : null,
  tool: 'birch', toolName: 'Birch',
  els: { today: 'client-today', week: 'client-week', season: 'client-season' },
  parts: ALL_DOMAINS.map(d => ({ key: d.key, part: d.part, name: d.name, color: d.color })),
  moveKey: 'leaves',
  journey: ((window.GGJourney || {}).AGES || {}).birch,
  showStory: false,
  // Reflections stay private. A helper sees notes only when the person shares them (Settings).
  shareRefl: false,
  plain: () => isPlain(),
  // the Birch mark's tree: two white trunks, an airy crown, catkins in Catkin Gold
  tree: { shape: 'birch', fruit: 'catkin', fruitColor: '#7F6610', trunk: '#F4F1EA', trunkBare: '#E6E2D8', trunkEdge: '#8A8A84', limb: '#5A4A3C',
    pal: [['#4C7A36', '#79A84E', '#A9CF78'], ['#6E7A3C', '#9AA85A', '#C2CC86'], ['#7A6E3A', '#A08F4E', '#C2B070']] },
  partIcon: key => partIcon(DOMAIN_BY_KEY[key], 22),
  questions: () => QUESTIONS,
  answers: Q_OPTS,
  weekStem: 'This past week, how often have you...',
  practiceInfo: (key, name) => {
    const d = DOMAIN_BY_KEY[key], r = d && d.restore.find(x => x[0] === name), g = GUIDES[key + '|' + name], pl = plainOf(key, name), gg = Object.assign({}, g || {}, (pl && pl.g) || {});
    return { desc: r ? shownLine(key, name, r[1]) : '', guide: guideHtml(key, name), hard: g ? (gg.adapt || gg.hard) : '' };
  },
  history: () => (personalHistory || []).filter(e => e && !e.from),
  hasResults: () => !!window.currentClientEntry,
  toast: m => showToast(m),
  profileHtml: () => bcProfileHtml(),
  extraSettings: () => bcSettingsHtml(),
  lockedHtml: () => birchWho().length ? `<div class="gt-card gt-empty"><h2>Your tree grows in your profile</h2><p>${birchWho().length > 1 ? 'Choose your picture above, then enter your passcode.' : 'Open your profile above to see your tree and today\'s practices.'} Each person's tree stays locked in their own profile on this device.</p></div>` : `<div class="gt-card gt-empty"><h2>Your tree grows in your profile</h2><p>Daily tending is saved inside a private Grounded profile on this device, locked with a passcode only you know. Only your passcode opens it.</p><div class="btn-row"><button class="btn btn-primary" onclick="profCreateDialog()">Create my profile</button><button class="btn btn-secondary" onclick="startCheckin()">Try a check-in first</button></div></div>`,
  todayExtra: s => vcTodayHtml() + todayKindHtml(s),
  seasonExtra: s => seasonExtraHtml(s),
  itemTag: (key, name, s) => itemTagHtml(key, name, s),
  partNote: (key, s) => partNoteHtml(key, s),
  pause: () => pnPause(),
  pauseLine: 'Your tree is holding still with you while you get support. Nothing is lost.',
  onCheck: (done, key, s, parts) => onCheckGame(done, key, s, parts),
  store: {
    get: () => { if (!PROF || HELP || !window.GGP || !GGP.isOpen(PROF.id)) return null; const d = GGP.data(PROF.id, 'birch'); if (!d.tend || typeof d.tend !== 'object') d.tend = {}; return d.tend; },
    save: () => (PROF && window.GGP) ? GGP.save(PROF.id) : Promise.resolve()
  },
  actions: {
    fullCheckin: () => startCheckin(), quickCheckin: () => startQuick(),
    results: () => showView('client-results'), progress: () => showView('client-progress'),
    plan: () => showView('client-growthplan'), about: () => showView('client-intro'),
    createProfile: () => profCreateDialog(), openProfile: () => bcOpenAny(),
    lock: () => profLock(), textSize: () => cycleTextSize()
  }
};
if (window.GGTend) GGTend.init(TEND_CFG);
setTimeout(() => { if (window.GGTend) GGTend.render(); }, 0);

window.personalHistory = [];
window.personalFileLoaded = false;
window.currentClientEntry = null;
setTimeout(() => { if (typeof profResume === 'function') profResume(); }, 0);
function sortEntries(list) {
  list.sort((a, b) => String(a.date).localeCompare(String(b.date)) || String(a.id).localeCompare(String(b.id)));
  return list;
}
function openPersonalFilePicker() { document.getElementById('personal-file-input').click(); }

// =====================================================================
// EARLIER RINGS: from Oak and from Pine, copied once on the person's tap
// Kept, labeled From Oak or From Pine, and never compared with Birch rings.
// The source record always stays whole (copy, never move).
// =====================================================================
const FROM_NAME = { oak: 'From Oak', pine: 'From Pine', aspen: 'From Aspen', birch: 'From Birch' };
function ringCopy(e, from) {
  const c = JSON.parse(JSON.stringify(e)), f = e.from || from;
  c.id = f + '-' + String(e.id || e.date).replace(/^(oak|pine)-/, ''); c.from = f;
  delete c.answers; delete c.safety; delete c.sens; delete c.flags; delete c.reflections;
  return c;
}
function oakRings() { return PROF && window.GGP ? (((GGP.data(PROF.id, 'oak') || {}).history) || []).filter(e => e && e.scores && e.from !== 'birch') : []; }
function pineRings() { return PROF && window.GGP ? (((GGP.data(PROF.id, 'pine') || {}).history) || []).filter(e => e && e.scores && !e.from) : []; }
function bringHtml() {
  if (!PROF || HELP || !window.GGP) return '';
  const r = rec(), o = oakRings().length, p = pineRings().length;
  let h = '';
  if (o && !r.oakBrought) h += `<div class="gt-card sq-bring"><h3>Bring My Oak Check-ins</h3><p>You have ${o} check-in${o === 1 ? '' : 's'} saved in Oak. Copy them here so Birch shows your whole story, labeled From Oak. Oak keeps its own copy.</p><div class="btn-row"><button class="btn btn-primary btn-sm" onclick="bringOak()">Bring Them Here</button><button class="btn btn-secondary btn-sm" onclick="bringOak(true)">Not Now</button></div></div>`;
  if (p && !r.pineBrought) h += `<div class="gt-card sq-bring"><h3>Bring My Pine Check-ins</h3><p>You have ${p} check-in${p === 1 ? '' : 's'} saved in Pine. Copy them here, labeled From Pine. Pine keeps its own copy.</p><div class="btn-row"><button class="btn btn-primary btn-sm" onclick="bringPine()">Bring Them Here</button><button class="btn btn-secondary btn-sm" onclick="bringPine(true)">Not Now</button></div></div>`;
  return h;
}
function bringList(list, from) {
  const ids = new Set(personalHistory.map(e => e.id)); let n = 0;
  list.forEach(e => { const c = ringCopy(e, from); if (!ids.has(c.id) && !ids.has(e.id)) { personalHistory.push(c); ids.add(c.id); n++; } });
  sortEntries(personalHistory);
  return n;
}
// A Pine notebook that came along with a Start My Oak becomes Groundwork's From Pine chapter.
function takePineNotebook(ns) {
  const L = gwRec(); if (!L || L.fromPine || !ns || !ns.answers || !Object.keys(ns.answers).length) return false;
  L.fromPine = { answers: JSON.parse(JSON.stringify(ns.answers)), opened: JSON.parse(JSON.stringify(ns.opened || {})), from: 'pine', copied: todayKey() };
  return true;
}
function bringOak(skip) {
  if (!PROF || !window.GGP) return;
  const r = rec(); let n = 0, nb = false;
  if (!skip) { n = bringList(oakRings(), 'oak'); nb = takePineNotebook((GGP.data(PROF.id, 'oak') || {}).nextsteps); }
  r.oakBrought = todayKey();
  profPersist().then(() => { showToast(skip ? 'You can bring them any time from Settings.' : n ? 'Your Oak check-ins are here now, labeled.' + (nb ? ' Your Pine notebook is in Groundwork.' : '') : 'Nothing new to bring.'); if (window.GGTend) GGTend.render(); renderProgress(); });
}
function bringPine(skip) {
  if (!PROF || !window.GGP) return;
  const r = rec(); let n = 0, nb = false;
  if (!skip) { n = bringList(pineRings(), 'pine'); nb = takePineNotebook((GGP.data(PROF.id, 'pine') || {}).nextsteps); }
  r.pineBrought = todayKey();
  profPersist().then(() => { showToast(skip ? 'You can bring them any time from Settings.' : n ? 'Your Pine check-ins are here now, labeled From Pine.' + (nb ? ' Your Next Steps notebook is in Groundwork.' : '') : 'Nothing new to bring.'); if (window.GGTend) GGTend.render(); renderProgress(); });
}

// =====================================================================
// PROFILES: Grounded profiles, shared by every page (/shared/gg-profiles.js)
// A Birch profile is an adult profile whose tree is Birch (GGP.tree). Any adult
// profile opened here tends a Birch tree, the way Sequoia works; one whose tree
// is Oak or Sequoia sees a gentle note, never a block. Kids, middle schoolers,
// and high schoolers are pointed to their own trees.
// =====================================================================
function profSync() {
  const a = window.GGP && GGP.active();
  if (a && a.age === 'adult') {
    PROF = { id: a.id, name: a.name, avatar: a.avatar, age: a.age };
    const d = rec();
    window.personalHistory = d.history.slice(); personalHistory = window.personalHistory;
    window.personalFileLoaded = true;
    if (HELP && !helpedWithBirch().some(p => p.id === HELP)) { HELP = null; if (window.GGLife) GGLife.use(null); }
  } else if (PROF || HELP) {
    PROF = null; HELP = null; if (window.GGLife) GGLife.use(null);
    window.personalHistory = []; personalHistory = window.personalHistory;
    window.personalFileLoaded = false; window.currentClientEntry = null; window.lastClientScores = null;
  }
  loadBank();
  renderProfileBar(); renderSaveBox(); renderProgress(); renderAboutParts(); renderHelpBanner();
  if (HELP) renderHelpTabs(); else if (window.GGTend) GGTend.render();
  if (document.getElementById('client-growthplan').classList.contains('active')) { if (HELP) renderHelpPlan(); else oakPlanOpen(); }
  if (document.getElementById('client-ground').classList.contains('active')) renderGround();
  helpFromHash();
}
async function profPersist() {
  if (!PROF || !window.GGP) return;
  rec().history = JSON.parse(JSON.stringify(personalHistory));
  await GGP.save(PROF.id);
}
function profLock() { if (window.GGP) GGP.lock().then(() => showToast('Locked. Your profile is safe on this device.')); }
const OTHER_TREE = { maple: '<a href="/maple/">Maple</a> is made for kids.', aspen: '<a href="/aspen/">Aspen</a> is made for middle schoolers.', pine: '<a href="/pine/">Pine</a> is made for high schoolers.' };
const TREE_NAME = { birch: 'Birch', oak: 'Oak', sequoia: 'Sequoia' };
function treeNow(id) { return window.GGP && GGP.tree ? GGP.tree(id) : 'birch'; }
function renderProfileBar() {
  const bar = document.getElementById('st-profile-bar'); if (!bar) return;
  const a = window.GGP && GGP.active();
  if (a && a.age !== 'adult') {
    bar.innerHTML = `<div class="pbar"><div class="pbar-who"><strong>${escapeHtml(a.name)}</strong><span>Birch is built for young adults, 18 to 26. ${OTHER_TREE[a.age] || ''}</span></div><div class="pbar-act"><button type="button" class="btn btn-secondary btn-sm" onclick="bcSwitch()">Switch person</button></div></div>`;
    return;
  }
  if (PROF) {
    const t = new Date(a.until).toLocaleString(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit' });
    const tree = treeNow(a.id);
    const nudge = tree !== 'birch' && !HELP ? `<p class="pbar-kids">Your profile's tree is ${TREE_NAME[tree] || 'Oak'}${tree === 'sequoia' ? ', built for 60 and up' : ', built for adults 26 to 60'}. If you are 26 or younger, you can make Birch your tree, so My tree opens here. <button type="button" class="text-btn" onclick="makeBirchMine()">Make Birch My Tree</button></p>` : '';
    const helps = helpedWithBirch();
    const helpRow = helps.length ? `<div class="sq-helprow"><span>You help:</span>${helps.map(p => `<button type="button" class="btn ${HELP === p.id ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="helpOpen('${p.id}')">${escapeHtml(p.name)}</button>`).join('')}${HELP ? '<button type="button" class="btn btn-secondary btn-sm" onclick="helpBack()">My Own Birch</button>' : ''}</div>` : '';
    bar.innerHTML = `<div class="pbar"><button type="button" class="pbar-pic" onclick="GGTend.openSettings()" aria-label="Profile and Settings">${GGAv.html(a.avatar, a.name, 44)}</button>
      <div class="pbar-who"><strong>${escapeHtml(a.name)}</strong><span>Saving to your own profile on this device. Unlocked until ${t}.</span></div>
      <div class="pbar-act"><button type="button" class="btn btn-secondary btn-sm" onclick="GGTend.openSettings()">Settings</button><button type="button" class="btn btn-secondary btn-sm" onclick="profLock()">Lock</button></div>${nudge}${helpRow}</div>`;
  } else {
    bar.innerHTML = `<div class="pbar pbar-off">${birchWhoHtml()}</div>`;
  }
}
function makeBirchMine() { if (PROF && window.GGP && GGP.setTree) { GGP.setTree(PROF.id, 'birch'); showToast('Birch is your tree now. You can change it in Picture, passcode, and more.'); renderProfileBar(); } }
/* Who's tending today? Every young adult on this device keeps their own tree in their
   own locked profile. One skips the list and goes straight to their passcode. */
function birchWho() { return window.GGP ? GGP.list().filter(p => p.age === 'adult' && p.tree === 'birch').sort((a, b) => String(a.name).localeCompare(String(b.name))) : []; }
function birchOthers() { return window.GGP ? GGP.list().filter(p => !(p.age === 'adult' && p.tree === 'birch')) : []; }
function birchWhoHtml() {
  const mine = birchWho(), others = birchOthers(), adults = others.filter(p => p.age === 'adult').length;
  const otherLine = others.length ? `<p class="pbar-kids">Other trees on this device: kids, middle schoolers, and high schoolers tend theirs in <a href="/maple/">Maple</a>, <a href="/aspen/">Aspen</a>, and <a href="/pine/">Pine</a>; adults in <a href="/oak/">Oak</a> (built for 26 to 60) and <a href="/sequoia/">Sequoia</a> (60 and up).${adults ? ' <button type="button" class="text-btn" onclick="GGP.openDialog()">Open another profile here</button>' : ''}</p>` : '';
  if (!mine.length) return `<div class="pbar-who"><strong>Save your progress on this device</strong><span>Create your own private profile, locked with a passcode only you know. Only your passcode opens it.</span></div>
      <div class="pbar-act"><button type="button" class="btn btn-primary btn-sm" onclick="profCreateDialog()">Create my profile</button><button type="button" class="btn btn-secondary btn-sm" onclick="GGTend.openSettings()">Settings</button></div>${otherLine}`;
  if (mine.length === 1) { const a = mine[0];
    return `<div class="pbar-who"><strong>Welcome back${a.name ? ', ' + escapeHtml(a.name) : ''}</strong><span>Open your profile to see your tree and today's practices.</span></div>
      <div class="pbar-act"><button type="button" class="btn btn-primary btn-sm" onclick="bcOpenWho(0)">Open my profile</button><button type="button" class="btn btn-secondary btn-sm" onclick="profCreateDialog()">Add a person</button></div>${otherLine}`; }
  return `<div class="pbar-who"><strong>Who's tending today?</strong><span>Tap your picture, then enter your passcode. Each person's tree stays locked in their own profile.</span></div>
    <div class="oak-people">${mine.map((a, i) => `<button type="button" class="oak-person" onclick="bcOpenWho(${i})">${GGAv.html(a.avatar, a.name, 56)}<b>${escapeHtml(a.name)}</b></button>`).join('')}
      <button type="button" class="oak-person oak-add" onclick="profCreateDialog()"><span class="oak-plus" aria-hidden="true">+</span><b>Add a person</b></button></div>${otherLine}`;
}
function bcOpenWho(i) {
  const a = birchWho()[i]; if (!a || !window.GGP) return;
  GGP.openDialog({ id: a.id }).then(ok => { if (ok && window.currentClientEntry) setTimeout(savePersonalFile, 50); });
}
function bcOpenAny() {
  const n = birchWho().length;
  if (n === 1) { bcOpenWho(0); return; }
  if (!n) { profCreateDialog(); return; }
  const b = document.getElementById('st-profile-bar'); if (b) b.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function bcSwitch() {
  if (!window.GGP) return;
  if (window.GGTend) GGTend.closeSettings();
  HELP = null; if (window.GGLife) GGLife.use(null);
  GGP.lock().then(() => { showToast('Locked. Choose who is tending.'); const b = document.getElementById('st-profile-bar'); if (b) b.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
}
function profCreateDialog() {
  if (!window.GGP) return;
  const carry = {};
  if (LOCAL.wording || LOCAL.seasons.length) carry.birch = { wording: LOCAL.wording || undefined, seasons: LOCAL.seasons.slice() };
  GGP.createDialog({ age: 'adult', tree: 'birch', carry: Object.keys(carry).length ? carry : null, reason: window.currentClientEntry ? 'Your check-in and growth plan will save to your own profile, locked with a passcode only you know.' : 'Your own profile keeps your tree, practices, check-ins, and Groundwork on this device, locked with a passcode only you know.' })
    .then(ok => { if (ok && window.currentClientEntry) setTimeout(savePersonalFile, 50); });
}
function profBackup() { if (window.GGP) GGP.backup(); }
async function profResume() {
  if (!window.GGP) { renderProfileBar(); return; }
  GGP.on(type => { if (type === 'change' || type === 'data' || type === 'ready') { profSync(); vcCheck(); } });
  await GGP.ready; profSync(); vcCheck();
}

// =====================================================================
// SETTINGS, behind the profile picture
// =====================================================================
const BC_SEE = `<p><b>Just yours</b>Every answer, your levels, your notes, your faith answers, the optional question, your reflections, and your Groundwork notebook stay in your profile on this device. Only your passcode opens it. Nothing is ever sent to anyone, and no one gets an alert.</p>
  <p><b>Helpers, only if you choose</b>You can let someone you trust open your Birch with their own passcode. They see only what you share, and never your safety answers, flags, or Groundwork. This stays off unless you turn it on.</p>
  <p><b>Share to Family, only by your hand</b>A link with the shape of your tree: days tended and parts tended. Never answers or notes.</p>`;
function bcProfileHtml() {
  const a = window.GGP && GGP.active();
  if (!a || a.age !== 'adult') return `<section><h3>Your Profile</h3><p>Open your profile, or create one, to keep your tree, practices, check-ins, and Groundwork on this device.</p><div class="btn-row"><button class="btn btn-primary btn-sm" onclick="GGTend.closeSettings();bcOpenAny()">Open my profile</button><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();profCreateDialog()">Create my profile</button></div></section>`;
  const r = rec(), o = oakRings().length, p = pineRings().length, tree = treeNow(a.id);
  return `<section><h3>Your Profile</h3><p class="gt-who">${GGAv.html(a.avatar, a.name, 44)}<b>${escapeHtml(a.name)}</b></p>
    <p class="gt-small">Your tree: <b>${TREE_NAME[tree] || 'Oak'}</b>. Change it in Picture, passcode, and more.${tree !== 'birch' ? ' <button type="button" class="text-btn" onclick="makeBirchMine();reopenSettings()">Make Birch My Tree</button>' : ''}</p>
    <div class="btn-row"><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();GGP.manage()">Picture, passcode, and more</button><button class="btn btn-secondary btn-sm" onclick="bcSwitch()">Switch person</button><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();profLock()">Lock</button></div>
    ${o && !r.oakBrought ? `<p class="gt-small">You have ${o} check-in${o === 1 ? '' : 's'} in Oak. <button type="button" class="text-btn" onclick="GGTend.closeSettings();bringOak()">Bring them into Birch</button></p>` : ''}
    ${p && !r.pineBrought ? `<p class="gt-small">You have ${p} check-in${p === 1 ? '' : 's'} in Pine. <button type="button" class="text-btn" onclick="GGTend.closeSettings();bringPine()">Bring them into Birch</button></p>` : ''}
    <p class="gt-small">Everyone on this device can have their own tree. Switching locks yours first, so no one sees anyone else's.</p></section>`;
}
function bcSettingsHtml() {
  const s = window.GGTend && GGTend.state(), open = !!PROF && !HELP, plain = isPlain(), mode = pnMode(s), mine = seasonsNow();
  if (HELP) return helperSettingsHtml();
  return `<section id="bc-set-season"><h3>My Season</h3><p class="gt-small">Choose any that fit your life right now, or none. My Season changes only the examples, tips, and help lines you see. The questions and your scores stay the same.</p>
      ${SEASONS.map(x => `<label class="gt-switch"><input type="checkbox"${mine.includes(x.id) ? ' checked' : ''} onchange="setSeason('${x.id}',this.checked)"> <span><b>${escapeHtml(x.name)}</b><br><small>${escapeHtml(x.line || '')}</small></span></label>`).join('')}</section>
    ${window.GGLifeKit ? GGLifeKit.settingsHtml('birch', 'bc-set-life') : ''}
    <section id="pn-set-wording"><h3>Faith or Plain Wording</h3><p class="gt-small">Faith wording names God, prayer, and faith as one door among several. Plain wording asks the same things without religious words. Your scores never change between the two.</p>
      <label class="gt-radio"><input type="radio" name="pn-word" value="faith"${!plain ? ' checked' : ''} onchange="setWording('faith')"><span><b>Faith</b>Prayer, worship, quiet, nature, and traditions.</span></label>
      <label class="gt-radio"><input type="radio" name="pn-word" value="plain"${plain ? ' checked' : ''} onchange="setWording('plain')"><span><b>Plain</b>Peace, values, quiet, nature, and traditions.</span></label></section>
    <section id="pn-set-sens"><h3>Optional Question</h3><p class="gt-small">One extra question about betting and gambling, on sports, online games, or anything else for money. It never counts toward a score, is never shared, and is never shown to a helper. Only you can turn it on.</p>
      <label class="gt-switch"><input type="checkbox"${sensOn() ? ' checked' : ''}${open ? '' : ' disabled'} onchange="setSens(this.checked)"> Ask me the optional question</label></section>
    <section id="pn-set-game"><h3>Your Tree: Steady or Hardy</h3>
      <label class="gt-radio"><input type="radio" name="pn-mode" value="steady"${mode === 'steady' ? ' checked' : ''}${s ? '' : ' disabled'} onchange="setPnMode('steady')"><span><b>Steady</b>The gentle tree. Missed days rest in soft mist, and nothing is ever lost.<span class="steady-fit">${steadyFits() ? ' Steady fits you best right now.' : ''}</span></span></label>
      <label class="gt-radio"><input type="radio" name="pn-mode" value="hardy"${mode === 'hardy' ? ' checked' : ''}${s ? '' : ' disabled'} onchange="setPnMode('hardy')"><span><b>Hardy</b><span class="hardy-pitch">${steadyFits() ? '' : 'A little more challenge. '}</span>A part of your plan left untended for ${HARDY_DAYS} days shows trouble, and one practice in that part heals it.</span></label>
      <p class="gt-small">No streaks to lose and no leaderboards. After a hard check-in, the tree holds still for two weeks either way.</p></section>
    ${helperSettingsHtml()}
    ${PROF && !HELP && window.GGP && GGP.moveOn ? GGP.moveOn.birthdayHtml(PROF.id, { section: 'bc-set-birthday', why: 'Only used to offer the step into Oak, built for adults 26 to 60, on your 26th birthday.' }) : ''}
    <section class="asp-see" id="bc-see"><h3>What Stays Private</h3>${BC_SEE}</section>
    ${moveOakHtml(false)}`;
}
// Health and Ability (GWG BLD 756): with pain, a serious illness, or a mental health condition chosen,
// Birch never suggests Hardy. Steady is named as the fit; Hardy stays the person's own choice.
function steadyFits() { return !!window.GGLife && GGLife.chosen('birch').some(id => id === 'pain' || id === 'serious' || id === 'mind'); }
if (window.GGLifeKit) GGLifeKit.on(() => { const on = steadyFits(); document.querySelectorAll('.steady-fit').forEach(x => { x.textContent = on ? ' Steady fits you best right now.' : ''; }); document.querySelectorAll('.hardy-pitch').forEach(x => { x.textContent = on ? '' : 'A little more challenge. '; }); });
function reopenSettings(focus) { if (window.GGTend) { GGTend.openSettings(); const f = document.getElementById(focus || 'gt-set-helpers'); if (f) f.scrollIntoView({ block: 'start' }); } }
function setWording(w) {
  rec().wording = w === 'plain' ? 'plain' : 'faith';
  persistRec().then(() => {
    loadBank(); renderAboutParts();
    if (window.lastClientScores) { renderGrowthPlanBuilder('client'); const b = document.querySelector('#client-growthplan-builder .domain-card'); if (b) delete b.dataset.filled; oakPrefillPlan(); }
    if (window.GGTend) GGTend.render();
    if (document.getElementById('client-ground').classList.contains('active')) renderGround();
    showToast(w === 'plain' ? 'Plain wording is on. Your scores stay the same.' : 'Faith wording is on. Your scores stay the same.');
  });
}
function setSeason(id, on) {
  const r = rec(); let list = Array.isArray(r.seasons) ? r.seasons.slice() : [];
  list = list.filter(x => x !== id); if (on) list.push(id);
  r.seasons = SEASONS.map(x => x.id).filter(x => list.includes(x));
  persistRec().then(() => { loadBank(); if (window.GGTend) GGTend.render(); const c = document.getElementById('pn-setup'); if (c) c.scrollIntoView({ block: 'nearest' }); showToast(r.seasons.length ? 'My Season: ' + seasonText() + '. The questions stay the same.' : 'No season chosen. The questions stay the same.'); });
}
function setSens(on) {
  if (!PROF) return;
  rec().askOpt = !!on;
  persistRec().then(() => showToast(on ? 'The optional question will be in your next full check-in.' : 'The optional question is off.'));
}
// First open: set Birch up. My Season, the wording, and an optional age. Change any time in Settings.
function setupCardHtml() {
  if (!PROF || HELP) return '';
  const r = rec(); if (r.setup) return '';
  const plain = isPlain(), mine = seasonsNow();
  return `<div class="gt-card pn-setup" id="pn-setup"><h2>Set Up Birch</h2><p>Welcome to Birch. A few choices make it fit your life. You can change them any time in Settings.</p>
    <h4 class="sq-h4">My Season</h4><p class="gt-small">Pick any that fit, or none. It changes only examples and tips, never the questions or your scores.</p><div class="pn-grades">${SEASONS.map(x => `<button type="button" class="btn btn-sm ${mine.includes(x.id) ? 'btn-primary' : 'btn-secondary'}" aria-pressed="${mine.includes(x.id)}" onclick="setSeason('${x.id}',${!mine.includes(x.id)})">${escapeHtml(x.name)}</button>`).join('')}</div>
    <h4 class="sq-h4">Wording</h4><div class="pn-grades"><button type="button" class="btn btn-sm ${!plain ? 'btn-primary' : 'btn-secondary'}" aria-pressed="${!plain}" onclick="setupPick('wording','faith')">Faith</button><button type="button" class="btn btn-sm ${plain ? 'btn-primary' : 'btn-secondary'}" aria-pressed="${plain}" onclick="setupPick('wording','plain')">Plain</button></div>
    <p class="gt-small">Faith wording names God, prayer, and faith as one door among several. Plain wording asks the same things without religious words. Scores are the same either way.</p>
    <details class="pn-see-d"><summary>What stays private</summary>${BC_SEE}</details>
    <div class="btn-row"><button class="btn btn-primary btn-sm" onclick="setupDone()">All Set</button></div></div>`;
}
function setupPick(what, v) {
  const r = rec(); if (what === 'wording') r.wording = v === 'plain' ? 'plain' : 'faith';
  persistRec().then(() => { loadBank(); renderAboutParts(); if (window.GGTend) GGTend.render(); const c = document.getElementById('pn-setup'); if (c) c.scrollIntoView({ block: 'nearest' }); });
}
function setupDone() {
  const r = rec(); if (!r.wording) r.wording = 'faith';
  r.setup = todayKey();
  persistRec().then(() => { if (window.GGTend) GGTend.render(); showToast('Birch is ready. Start with a check-in.'); });
}
// Moving on (decision 15; move-on offers, GWG BLD 758). MOVE-ON OFFER START. On the 26th
// birthday (the optional birthday in Settings, kept in the profile and shared by its trees,
// GGP.moveOn), a gentle card on Today, and any time in Settings: Move My Tree to Oak. The
// same profile switches its tree, so the Health and Ability choices stay; Oak gets a
// one-time copy of Birch's rings, labeled From Birch. Birch's record and Groundwork stay
// whole, and Groundwork prints whole. Never forced. Stay in Birch (stayBirch) means Today
// never asks again; Settings keeps the way back.
function moveOakHtml(onToday) {
  if (!PROF || HELP) return '';
  const r = rec(), age = ageNow();
  if (onToday && (age == null || age < 26 || r.stayBirch || r.movedToOak || treeNow(PROF.id) !== 'birch')) return '';
  const lead = onToday ? (age === 26 && GGP.moveOn && GGP.moveOn.isBirthday(PROF.id) ? 'Happy 26th birthday! ' : '') + 'Birch is built for 18 to 26, and Oak for adults 26 to 60. ' : '';
  return `<${onToday ? 'div class="gt-card pn-moving"' : 'section id="bc-set-moving"'}><h3>Ready for Oak?</h3>
    <p class="gt-small">${lead}You choose when. Stay in Birch as long as it fits, or move your tree to Oak. Move My Tree to Oak keeps this same profile: Oak gets a copy of your Birch check-ins, labeled From Birch, and Birch keeps everything, Groundwork included. You can print your whole Groundwork notebook first, and come back to it here any time.</p>
    <div class="btn-row"><button class="btn btn-secondary btn-sm" onclick="${onToday ? '' : 'GGTend.closeSettings();'}moveToOak()">Move My Tree to Oak</button><button class="btn btn-secondary btn-sm" onclick="${onToday ? '' : 'GGTend.closeSettings();'}gwPrintAll()">Print My Groundwork</button>${onToday ? '<button class="btn btn-secondary btn-sm" onclick="stayInBirch()">Stay in Birch</button>' : ''}</div>
    ${!onToday && r.stayBirch ? GGP.moveOn.stayNote(r.stayBirch, 'Birch', 'Move My Tree to Oak') : ''}</${onToday ? 'div' : 'section'}>`;
}
function stayInBirch() { rec().stayBirch = todayKey(); persistRec().then(() => { showToast('Birch stays your tree. Move My Tree to Oak is in Settings whenever you want it.'); if (window.GGTend) GGTend.render(); }); }
// MOVE-ON OFFER END
function moveToOak() {
  if (!PROF || !window.GGP) return;
  if (!confirm('Move your tree to Oak? This same profile opens in Oak from now on. Oak gets a copy of your Birch check-ins, labeled From Birch, and Birch keeps everything, Groundwork included. You can switch back any time in Picture, passcode, and more.')) return;
  const r = rec(), oak = GGP.data(PROF.id, 'oak');
  if (!Array.isArray(oak.history)) oak.history = [];
  if (!r.movedToOak) {
    const have = new Set(oak.history.map(e => e.id));
    (r.history || []).filter(e => e && e.scores && !e.from && e.by !== 'tapped').forEach(e => { const c = ringCopy(e, 'birch'); c.from = 'birch'; c.id = 'birch-' + e.id; if (!have.has(c.id)) oak.history.push(c); });
    oak.history.sort((a, b) => String(a.date).localeCompare(String(b.date)));
  }
  r.movedToOak = todayKey();
  GGP.save(PROF.id).then(() => { if (GGP.setTree) GGP.setTree(PROF.id, 'oak'); showToast('Your tree is Oak now. Birch keeps everything.'); setTimeout(() => { location.href = '/oak/'; }, 900); });
}

// =====================================================================
// HELPERS (Sequoia's model). Off unless the person turns on Add a Helper.
// A helper opens the person's Birch with their own passcode and sees only
// what the person shares. Roots and notes start private. Never the safety
// step, flags, help notes, the optional question, or Groundwork
// (BIRCH_CHECKIN.NEVER_SHARE).
// =====================================================================
const SHARE_DEF = { tree: true, plan: true, faith: false, notes: false };
const SHARE_ROWS = [
  ['tree', 'How my tree is doing', 'The level of each part and the dates of check-ins. Never your answers.'],
  ['plan', 'My growth plan', 'The practices you chose, so a helper can do them with you.'],
  ['faith', 'My Roots part', 'Your Roots level, and Roots practices in your plan. Off unless you turn it on.'],
  ['notes', 'My notes', 'Anything you wrote in "Sit with this" during a check-in.']
];
const BY_LABEL = { self: 'They answered', tapped: 'They answered, a helper tapped' };
function shareOf(id) { const d = GGP.data(id, 'birch'); return Object.assign({}, SHARE_DEF, d.share || {}); }
function helpedWithBirch() {
  if (!PROF || !window.GGP || !GGP.helping) return [];
  return GGP.helping().filter(id => GGP.isOpen(id) && GGP.data(id, 'birch').helpersOn).map(id => GGP.get(id)).filter(Boolean);
}
function helperSettingsHtml() {
  if (!PROF || !window.GGP) return '';
  if (HELP) {
    const n = escapeHtml((GGP.get(HELP) || {}).name || 'They');
    return `<section id="gt-set-helpers"><h3>Helping ${n}</h3><p class="gt-small">${n} chooses what helpers see, in their own Birch settings. Their safety answers are never shared.</p><div class="btn-row"><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();helpBack()">Back to My Own Birch</button></div></section>`;
  }
  const d = rec(), on = !!d.helpersOn, sh = shareOf(PROF.id);
  const hs = (GGP.helpers(PROF.id) || []).map(id => GGP.get(id)).filter(Boolean);
  const can = GGP.list().filter(p => p.age === 'adult' && p.id !== PROF.id && !hs.some(x => x.id === p.id));
  return `<section id="gt-set-helpers"><h3>Add a Helper</h3>
    <p class="gt-small">A helper is someone you trust, like a parent, a partner, a mentor, or a friend. They open your Birch with their own passcode, and they can sit with you for a check-in. This stays off unless you turn it on, and only you can turn it on.</p>
    <label class="gt-switch"><input type="checkbox" id="bc-helpers-on"${on ? ' checked' : ''} onchange="bcHelpersOn(this.checked)"> Let helpers open my Birch</label>
    ${on ? `<h4 class="sq-h4">What Helpers See</h4>${SHARE_ROWS.map(x => `<label class="gt-switch"><input type="checkbox"${sh[x[0]] ? ' checked' : ''} onchange="bcShare('${x[0]}',this.checked)"> <span><b>${escapeHtml(x[1])}</b><br><small>${escapeHtml(x[2])}</small></span></label>`).join('')}
      <p class="gt-small"><b>Never shared:</b> your safety answers, flags and their notes, the optional question, and your Groundwork notebook.</p>
      <h4 class="sq-h4">Your Helpers</h4>
      ${hs.length ? hs.map(x => `<p class="sq-helper">${GGAv.html(x.avatar, x.name, 32)}<b>${escapeHtml(x.name)}</b><button type="button" class="text-btn" onclick="dropHelper('${x.id}')">Remove</button></p>`).join('') : '<p class="gt-small">No helpers yet.</p>'}
      ${can.length ? `<label class="gt-small" for="bc-hid">Add a helper</label><select id="bc-hid" class="sq-select">${can.map(p => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('')}</select>
        <label class="gt-small" for="bc-hpass">Their own passcode (they type it)</label><input type="password" id="bc-hpass" class="sq-select" autocomplete="off">
        <div class="btn-row"><button type="button" class="btn btn-primary btn-sm" onclick="addHelperNow()">Add as a Helper</button></div>`
        : '<p class="gt-small">A helper first creates their own Grounded profile on this device (the profile button at the top of the page), then comes back here with you to be added.</p>'}` : ''}
  </section>`;
}
function bcHelpersOn(on) {
  if (!PROF) return;
  const d = rec(); d.helpersOn = !!on; if (on && !d.share) d.share = Object.assign({}, SHARE_DEF);
  GGP.save(PROF.id).then(() => { showToast(on ? 'Helpers can be added now. Choose what they see.' : 'Your Birch is closed to helpers.'); reopenSettings(); });
}
function bcShare(k, v) { if (!PROF) return; const d = rec(); d.share = Object.assign({}, SHARE_DEF, d.share || {}); d.share[k] = !!v; GGP.save(PROF.id); }
function addHelperNow() {
  const hid = (document.getElementById('bc-hid') || {}).value, pass = (document.getElementById('bc-hpass') || {}).value;
  if (!pass) { showToast('Your helper types their own passcode.'); return; }
  GGP.addHelper(PROF.id, hid, pass).then(() => { showToast(((GGP.get(hid) || {}).name || 'They') + ' is now a helper.'); reopenSettings(); }).catch(e => showToast(e && e.message ? e.message : 'That did not work. Try again.'));
}
function dropHelper(id) {
  const n = (GGP.get(id) || {}).name || 'this helper';
  if (!confirm('Remove ' + n + ' as a helper? They will no longer open your profile.')) return;
  GGP.removeHelper(PROF.id, id); showToast(n + ' is no longer a helper.'); reopenSettings();
}
// Helper view
function helpOpen(id) {
  if (!helpedWithBirch().some(p => p.id === id)) return;
  HELP = id; if (window.GGLife) GGLife.use(id); window.currentClientEntry = null; renderProfileBar(); renderHelpBanner(); showView('client-today');
}
function helpBack() { HELP = null; if (window.GGLife) GGLife.use(null); setMode('self'); loadBank(); renderProfileBar(); renderHelpBanner(); showView('client-today'); }
function helpFromHash() {
  const m = /^#for=([A-Za-z0-9_-]+)/.exec(location.hash || ''); if (!m || !PROF) return;
  if (helpedWithBirch().some(p => p.id === m[1])) { try { history.replaceState(null, '', location.pathname); } catch (e) {} helpOpen(m[1]); }
}
function renderHelpBanner() {
  const b = document.getElementById('sq-help-banner'); if (!b) return;
  if (!HELP) { b.innerHTML = ''; b.hidden = true; return; }
  const n = escapeHtml((GGP.get(HELP) || {}).name || 'them');
  b.hidden = false;
  b.innerHTML = `<p><b>You are helping ${n}.</b> You see only what ${n} chooses to share.</p><button type="button" class="btn btn-secondary btn-sm" onclick="helpBack()">Back to My Own Birch</button>`;
}
function helpLevels(e, sh) {
  return `<div class="lvl-list">${ALL_DOMAINS.filter(d => d.key !== 'roots' || sh.faith).map(d => `<div class="lvl-row" style="--domain-color:${d.color};">${partIcon(d, 20)}<b style="color:${d.color};">${d.part}</b><span class="lvl-pill">${stLevel(stShown(e, d.key))}</span></div>`).join('')}</div>`;
}
function renderHelpTabs() {
  if (!HELP || !window.GGP) return;
  const p = GGP.get(HELP) || {}, n = escapeHtml(p.name || 'them'), d = GGP.data(HELP, 'birch'), sh = shareOf(HELP);
  const own = (d.history || []).filter(e => e && e.scores && !e.from), last = own[own.length - 1];
  const acts = `<div class="gt-card"><h3>Check In Together</h3><p>Sit with ${n} and tap the answers they give. The check-in saves to ${n}'s tree, marked as taken together. The safety questions stay with ${n}, for their own check-ins.</p>
    <div class="btn-row"><button class="btn btn-primary" onclick="startCheckin('tapped','${HELP}')">${n} Answers, I Tap</button><button class="btn btn-secondary" onclick="startQuick('tapped','${HELP}')">Quick Check-in Together</button></div></div>`;
  const tree = sh.tree ? `<div class="gt-card"><h3>${n}'s Tree</h3>${last ? `<p class="gt-small">From the check-in on ${escapeHtml(formatDate(last.date))}${last.by === 'tapped' ? ', taken together' : ''}.</p>${helpLevels(last, sh)}` : '<p>No check-ins yet.</p>'}
    ${own.length ? `<h4 class="sq-h4">Check-ins</h4><ul class="gt-hist">${own.slice().reverse().slice(0, 8).map(e => `<li><b>${escapeHtml(formatDate(e.date))}</b><span>${e.type === 'quick' ? 'Quick' : 'Full'}${e.by === 'tapped' ? ', ' + escapeHtml(BY_LABEL.tapped) + (e.helper ? ' (' + escapeHtml(e.helper) + ')' : '') : ''}</span></li>`).join('')}</ul>` : ''}
    ${sh.notes && last && last.reflections ? ALL_DOMAINS.filter(dd => (dd.key !== 'roots' || sh.faith) && String(last.reflections[dd.key] || '').trim()).map(dd => `<p class="gt-small"><b>${dd.part}:</b> ${escapeHtml(last.reflections[dd.key])}</p>`).join('') : ''}</div>` : `<div class="gt-card"><p>${n} keeps their tree private. You can still check in together.</p></div>`;
  const todayEl = document.getElementById('client-today'), weekEl = document.getElementById('client-week'), seasonEl = document.getElementById('client-season');
  if (todayEl) todayEl.innerHTML = tree + acts;
  const rest = `<div class="gt-card"><p>${n}'s weeks and seasons stay on ${n}'s own screen. Here you can check in together and see what ${n} shares.</p><div class="btn-row"><button class="btn btn-secondary" onclick="showView('client-today')">Back to Today</button></div></div>`;
  if (weekEl) weekEl.innerHTML = rest;
  if (seasonEl) seasonEl.innerHTML = rest;
}
function renderHelpPlan() {
  const box = document.getElementById('client-growthplan-builder'); if (!box || !HELP) return;
  const n = escapeHtml((GGP.get(HELP) || {}).name || 'them'), d = GGP.data(HELP, 'birch'), sh = shareOf(HELP), plan = (d.tend && d.tend.plan) || null;
  document.getElementById('client-growthplan-generate-row').style.display = 'none';
  document.getElementById('client-growthplan-doc').innerHTML = '';
  if (!sh.plan) { box.innerHTML = `<p class="lead">${n} keeps their growth plan private.</p>`; return; }
  if (!plan) { box.innerHTML = `<p class="lead">${n} has not chosen practices yet.</p>`; return; }
  box.innerHTML = `<p class="lead">${n}'s practices. You can do them together.</p>` + ALL_DOMAINS.filter(dd => dd.key !== 'roots' || sh.faith).map(dd => {
    const x = plan[dd.key] || {}, names = (x.selected || []).map(nm => shownName(dd.key, nm)).concat(x.custom ? [x.custom] : [], (x.lib || []).map(l => l.n));
    if (!names.length) return '';
    return `<div class="domain-card" style="--domain-color:${dd.color};border-left-color:${dd.color};"><div class="card-head">${partIcon(dd, 26)}<div><div class="domain-name" style="color:${dd.color};">${dd.part}</div><div class="card-sub">${dd.name}</div></div></div><ul class="sq-planlist">${names.map(nm => `<li>${escapeHtml(nm)}</li>`).join('')}</ul></div>`;
  }).join('');
}

// =====================================================================
// GROUNDWORK (decision 10): a private notebook for who you are becoming and
// the life you are building, plus Skills I've Got. Chapters, prompts, and
// skills come from /birch/groundwork.js. Saved locked in the profile under
// birch.groundwork; every prompt and skill can be skipped; the faith and
// meaning chapter stays closed until the person opens it; the From Pine
// chapter holds Pine's Next Steps as written; printed or shared only by
// choice. Never in Share to Family, never shown to a helper.
// =====================================================================
const GX = { ch: null, edit: null, pick: false, how: null };
function gwRec() {
  if (!PROF || HELP || !window.GGP || !GGP.isOpen(PROF.id)) return null;
  const d = rec(); if (!d.groundwork || typeof d.groundwork !== 'object') d.groundwork = {};
  const g = d.groundwork; if (!g.answers) g.answers = {}; if (!g.opened) g.opened = {}; if (!g.skills) g.skills = {};
  return g;
}
const gwChapter = id => (GW.chapters || []).find(c => c.id === id);
const gwT = (c, k) => (isPlain() && c['plain' + k[0].toUpperCase() + k.slice(1)]) || c[k] || '';
const gwP = p => (isPlain() && p.plain) || p.t;
const gwHelp = p => (isPlain() && p.plainHelp) || p.help || '';
function gwWritten(c, L) { return (c.prompts || []).filter(p => L.answers[p.id] && String(L.answers[p.id].text || '').trim()).length + (c.fromPine && L.fromPine ? Object.keys(L.fromPine.answers || {}).length : 0); }
function gwChapters(L) { const all = (GW.chapters || []).filter(c => !c.fromPine || (L && L.fromPine)); return all.filter(c => c.fromPine).concat(all.filter(c => !c.fromPine)); }
function gwSkillsAll() { const out = []; Object.keys(GW.skills || {}).forEach(ch => (GW.skills[ch] || []).forEach(x => out.push(Object.assign({ ch }, x)))); return out; }
function renderGround() {
  const el = document.getElementById('client-ground'); if (!el) return;
  if (HELP) { el.innerHTML = `<div class="section-title">${escapeHtml(GW.title || 'Groundwork')}</div><div class="gt-card"><p>Groundwork is a private notebook. It stays with the person who writes it, and helpers never see it.</p></div>`; return; }
  const L = gwRec();
  if (!L) {
    el.innerHTML = `<div class="section-title">${escapeHtml(GW.title || 'Groundwork')}</div>${(GW.intro || []).slice(0, 3).map(t => `<p class="lead">${escapeHtml(t)}</p>`).join('')}
      <div class="gt-card gt-empty"><h2>Your notebook is kept in your profile</h2><p>Groundwork is saved inside your own profile on this device, locked with a passcode only you know, so no one else can read it.</p><div class="btn-row"><button class="btn btn-primary" onclick="${birchWho().length ? 'bcOpenAny()' : 'profCreateDialog()'}">${birchWho().length ? 'Open my profile' : 'Create my profile'}</button></div></div>`;
    return;
  }
  if (GX.ch === 'skills') { el.innerHTML = gwSkillsPage(L); return; }
  const c = GX.ch && gwChapter(GX.ch);
  if (c) { el.innerHTML = gwChapterHtml(c, L); return; }
  const chs = gwChapters(L), total = chs.reduce((t, ch) => t + gwWritten(ch, L), 0), sk = gwSkillsAll(), done = skillsDone().length;
  el.innerHTML = `<div class="section-title">${escapeHtml(GW.title || 'Groundwork')}</div>
    ${(GW.intro || []).filter((t, i) => i < 4 || L.fromPine).map(t => `<p class="lead">${escapeHtml(t)}</p>`).join('')}
    <p class="sq-legcount">${total ? `${total} ${total === 1 ? 'page' : 'pages'} written so far.` : 'Nothing written yet. One prompt is enough to start.'}</p>
    <div class="sq-chapters">${chs.map(ch => { const n = gwWritten(ch, L), closed = ch.optIn && !L.opened[ch.id], np = (ch.prompts || []).length;
      return `<button type="button" class="sq-chapter${closed ? ' closed' : ''}" onclick="gwOpen('${ch.id}')"><b>${escapeHtml(gwT(ch, 'title'))}</b><span>${closed ? 'Opens only when you choose' : ch.fromPine ? 'Written in Pine, and room to keep going' : n ? n + ' of ' + np + ' written' : np + ' prompts'}${(GW.skills || {})[ch.id] ? '. Skills too' : ''}</span></button>`; }).join('')}
      ${sk.length ? `<button type="button" class="sq-chapter bc-skills-btn" onclick="gwOpen('skills')"><b>${escapeHtml(GW.skillsTitle || 'Skills I\'ve Got')}</b><span>${done} of ${sk.length} marked, at your own pace.</span></button>` : ''}</div>
    <div class="btn-row"><button class="btn btn-primary" onclick="gwPickBook()">Save or Print My Notebook</button></div>
    ${GX.pick ? gwPickHtml(L) : ''}
    <div id="bc-gwsheet" class="sq-legsheet" aria-hidden="true"></div>
    <p class="gt-small sq-legfoot">Your notebook stays on this device, locked in your profile. You decide what to print or share, and with whom. It is never part of Share to Family, and helpers never see it.</p>
    ${window.GGSources ? GGSources.html('birch:groundwork') : ''}`;
}
// Skills whose Oak guide (birch/groundwork.js link.guide) has a Birch guide that fits better.
// A skill links to the Birch guide once it exists; otherwise its Oak link stays.
const GW_BIRCH_GUIDE = { 'sk-jobends': 'job-loss', 'sk-debts': 'debt', 'sk-lease': 'first-apartment', 'sk-safetyplan': 'suicide-thoughts', 'sk-signs': 'controlling', 'sk-friendhelp': 'friend-suicide', 'sk-newpeople': 'friends' };
function gwSkillHtml(x, L) {
  const s = L.skills[x.id], on = !!(s && s.done), ln = x.link || {};
  let more = '';
  const prac = ln.practice || ((SP.BY_SKILL || {})[x.id] || [])[0];
  if (prac) { const [part, name] = String(prac).split('|'), g = guideHtml(part, name); if (g) more += `<button type="button" class="text-btn" aria-expanded="${GX.how === x.id}" onclick="GX.how=GX.how==='${x.id}'?null:'${x.id}';renderGround()">A practice for this: ${escapeHtml(shownName(part, name))}</button>${GX.how === x.id ? `<div class="guide open bc-skill-guide">${g}</div>` : ''}`; }
  const bg = GW_BIRCH_GUIDE[x.id];
  if (bg && lcHas(bg)) more += `<button type="button" class="text-btn" onclick="lcOpen('client','${bg}')">A guide for this: ${escapeHtml(LC_TOPICS.find(t => t.id === bg).title)}</button> `;
  else if (ln.guide && /^oak:/.test(ln.guide)) more += `<a class="text-link" href="/oak/#life=${encodeURIComponent(ln.guide.slice(4))}">A guide for this, in Oak</a> `;
  if (Array.isArray(x.site) && x.site[1]) more += ` <a class="text-link" href="${escapeHtml(x.site[1])}" target="_blank" rel="noopener">${escapeHtml(x.site[0] || 'Start here')}</a>`;
  return `<li class="bc-skill${on ? ' done' : ''}"><label class="bc-skill-row"><input type="checkbox"${on ? ' checked' : ''} onchange="gwSkill('${x.id}',this.checked)"> <span><b>${escapeHtml(x.t)}</b>${x.help ? `<small>${escapeHtml(x.help)}</small>` : ''}${on && s.done ? `<small class="bc-skill-when">Marked ${escapeHtml(formatDate(s.done))}</small>` : ''}</span></label>${more ? `<div class="bc-skill-more">${more}</div>` : ''}</li>`;
}
function gwSkillsList(ch, L) { const list = (GW.skills || {})[ch] || []; return list.length ? `<ul class="bc-skills">${list.map(x => gwSkillHtml(x, L)).join('')}</ul>` : ''; }
function gwSkillsPage(L) {
  const SK = GW.skills || {};
  return `<button type="button" class="lc-back" onclick="gwOpen(null)">Back to all chapters</button>
    <h2 class="section-title" style="margin-top:10px">${escapeHtml(GW.skillsTitle || 'Skills I\'ve Got')}</h2>
    <p class="lead">Practical skills for the life you are building. Mark what you can do already, and come back for the rest when life asks for it. Nothing here is graded, and unmarking takes nothing away.</p>
    ${Object.keys(SK).map(ch => { const c = gwChapter(ch); return `<h3 class="bc-skills-h">${escapeHtml(c ? gwT(c, 'title') : ch)}</h3>${gwSkillsList(ch, L)}`; }).join('')}
    <div class="btn-row"><button class="btn btn-primary" onclick="gwPrint(['skills'])">Save or Print My Skills</button><button class="btn btn-secondary" onclick="gwOpen(null)">Back to All Chapters</button></div>
    <div id="bc-gwsheet" class="sq-legsheet" aria-hidden="true"></div>`;
}
function skillsDone() { try { const g = PROF && !HELP && window.GGP && GGP.isOpen(PROF.id) ? (rec().groundwork || {}) : {}; return Object.keys(g.skills || {}).filter(k => g.skills[k] && g.skills[k].done); } catch (e) { return []; } }
function gwSkill(id, on) {
  const L = gwRec(); if (!L) return;
  const x = gwSkillsAll().find(y => y.id === id);
  if (on) L.skills[id] = { done: todayKey(), t: x ? x.t : '' }; else delete L.skills[id];
  // Marking a skill done is a milestone in the game layer; reached once, kept for good.
  const st = window.GGTend && GGTend.state(), fresh = on && st ? checkMiles(st).filter(m => m !== 'bonus') : [];
  persistRec().then(() => { renderGround(); if (fresh.length) pnCheer('New milestone: ' + mileName(fresh[0]), 'Skills I\'ve Got'); else showToast(on ? 'Marked. That is one more thing you can do.' : 'Unmarked. Nothing is lost.'); });
}
function gwPineHtml(L) {
  const F = L.fromPine || {}, A = F.answers || {}, PC = GW.pineChapters || {}, groups = {};
  Object.keys(A).forEach(pid => { const k = pid.split('-')[0]; (groups[k] = groups[k] || []).push([pid, A[pid]]); });
  const title = k => { const t = PC[k]; return typeof t === 'string' ? t : t ? ((isPlain() && t.plain) || t.t) : k; };
  if (!Object.keys(groups).length) return '<p class="gt-small">Nothing was written in Pine\'s Next Steps.</p>';
  return `<div class="bc-frompine">${Object.keys(groups).map(k => `<h3 class="bc-skills-h">${escapeHtml(title(k))}</h3>${groups[k].map(([pid, a]) => `<article class="sq-prompt has"><h3>${escapeHtml(a.q || '')}</h3><div class="sq-legans">${escapeHtml(a.text || '').replace(/\n/g, '<br>')}</div><p class="gt-small">Written in Pine${a.date ? ', ' + escapeHtml(formatDate(a.date)) : ''}${a.when ? '. By ' + escapeHtml(formatDate(a.when)) : ''}</p></article>`).join('')}`).join('')}</div>`;
}
function gwChapterHtml(c, L) {
  const closed = c.optIn && !L.opened[c.id];
  let h = `<button type="button" class="lc-back" onclick="gwOpen(null)">Back to all chapters</button>
    <h2 class="section-title" style="margin-top:10px">${escapeHtml(gwT(c, 'title'))}</h2>${gwT(c, 'lead') ? `<p class="lead">${escapeHtml(gwT(c, 'lead'))}</p>` : ''}`;
  if (closed) return h + `<div class="sq-optin"><p>${escapeHtml(gwT(c, 'note') || GW.careLine || '')}</p>
      <div class="btn-row"><button class="btn btn-primary" onclick="gwOptIn('${c.id}', true)">Open This Chapter</button><button class="btn btn-secondary" onclick="gwOpen(null)">Not Now</button></div></div>`;
  if (c.fromPine) h += gwPineHtml(L) + '<h3 class="bc-skills-h">Keep Writing</h3>';
  h += `<p class="gt-small">Skip any prompt. Write a little or a lot. The microphone key on your phone's keyboard lets you speak instead of type.</p>`;
  h += (c.prompts || []).map(p => {
    const a = L.answers[p.id] || null, editing = GX.edit === p.id, has = a && String(a.text || '').trim();
    return `<article class="sq-prompt${has ? ' has' : ''}" id="gp-${p.id}">
      <h3>${escapeHtml(gwP(p))}</h3>${gwHelp(p) ? `<p class="sq-help">${escapeHtml(gwHelp(p))}</p>` : ''}
      ${p.care ? `<p class="sq-care">${escapeHtml(GW.careLine || '')} <button type="button" class="text-btn" onclick="showCalm()">Help lines</button></p>` : ''}
      ${editing ? `<label class="gt-small" for="gt-${p.id}">Your words</label><textarea id="gt-${p.id}" class="reflection-area sq-legtext" rows="6" maxlength="20000">${escapeHtml(a ? a.text : '')}</textarea>
        ${p.when ? `<label class="gt-small" for="gw-${p.id}">${escapeHtml(c.whenLabel || 'By when (optional)')}</label><input type="date" id="gw-${p.id}" class="sq-select pn-date" value="${escapeHtml(a && a.when ? a.when : '')}">` : ''}
        <div class="btn-row"><button class="btn btn-primary" onclick="gwSave('${p.id}')">Save</button><button class="btn btn-secondary" onclick="GX.edit=null;renderGround()">Cancel</button>${has ? `<button class="btn btn-secondary" onclick="gwDelete('${p.id}')">Remove</button>` : ''}</div>`
      : has ? `<div class="sq-legans">${escapeHtml(a.text).replace(/\n/g, '<br>')}</div><p class="gt-small">${escapeHtml(a.date ? formatDate(a.date) : '')}${a.when ? '. ' + escapeHtml((c.whenLabel || 'By when').replace(/ \(optional\)$/, '')) + ' ' + escapeHtml(formatDate(a.when)) : ''}</p><div class="btn-row"><button class="btn btn-secondary btn-sm" onclick="gwEdit('${p.id}')">Edit</button></div>`
      : `<div class="btn-row"><button class="btn btn-secondary btn-sm" onclick="gwEdit('${p.id}')">Write This One</button></div>`}
    </article>`;
  }).join('');
  if ((GW.skills || {})[c.id]) h += `<h3 class="bc-skills-h">${escapeHtml(GW.skillsTitle || 'Skills I\'ve Got')}</h3>${gwSkillsList(c.id, L)}`;
  h += `<div class="btn-row"><button class="btn btn-primary" onclick="gwPrint(['${c.id}'])">Save or Print This Chapter</button>${c.optIn ? `<button class="btn btn-secondary" onclick="gwOptIn('${c.id}', false)">Close This Chapter</button>` : ''}<button class="btn btn-secondary" onclick="gwOpen(null)">Back to All Chapters</button></div>
    <div id="bc-gwsheet" class="sq-legsheet" aria-hidden="true"></div>`;
  return h;
}
function gwOpen(id) { GX.ch = id; GX.edit = null; GX.pick = false; GX.how = null; renderGround(); scrollToViewTop('client-ground', true, false); }
function gwEdit(pid) { GX.edit = pid; renderGround(); const t = document.getElementById('gt-' + pid); if (t) { t.focus(); t.scrollIntoView({ block: 'center' }); } }
function gwSave(pid) {
  const L = gwRec(); if (!L) return;
  const text = (document.getElementById('gt-' + pid) || {}).value || '', when = ((document.getElementById('gw-' + pid) || {}).value || '').trim();
  const c = gwChapter(GX.ch), p = c && (c.prompts || []).find(x => x.id === pid);
  if (!text.trim()) delete L.answers[pid];
  else { L.answers[pid] = { text: text.slice(0, 20000), date: todayKey(), q: p ? gwP(p) : '' }; if (when) L.answers[pid].when = when; }
  GX.edit = null;
  persistRec().then(() => { renderGround(); showToast(text.trim() ? 'Saved in your notebook.' : 'Left blank. Come back any time.'); const a = document.getElementById('gp-' + pid); if (a) a.scrollIntoView({ block: 'center' }); });
}
function gwDelete(pid) {
  if (!confirm('Remove what is written here? This cannot be undone unless you have a backup.')) return;
  const L = gwRec(); if (!L) return; delete L.answers[pid]; GX.edit = null; persistRec().then(renderGround);
}
function gwOptIn(id, on) {
  const L = gwRec(); if (!L) return;
  if (on) L.opened[id] = todayKey(); else delete L.opened[id];
  persistRec().then(() => { if (!on) GX.ch = null; renderGround(); showToast(on ? 'Open. Stop any time.' : 'Closed. What you wrote stays in your notebook.'); });
}
function gwPickBook() { GX.pick = !GX.pick; renderGround(); }
function gwPickHtml(L) {
  const ready = gwChapters(L).filter(c => gwWritten(c, L)).map(c => [c.id, gwT(c, 'title')]);
  if (skillsDone().length) ready.push(['skills', GW.skillsTitle || 'Skills I\'ve Got']);
  if (!ready.length) return '<p class="gt-small">Write in a chapter or mark a skill first, and it can be saved or printed here.</p>';
  return `<div class="gt-card sq-pick"><h3>Choose the Chapters</h3><p class="gt-small">Choose what goes in. Share the pages only if you want to, and only with people you choose.</p>${ready.map(c => `<label class="gt-switch"><input type="checkbox" name="bc-pick" value="${c[0]}" checked> ${escapeHtml(c[1])}</label>`).join('')}
    <div class="btn-row"><button class="btn btn-primary btn-sm" onclick="gwPrint(Array.from(document.querySelectorAll('input[name=bc-pick]:checked')).map(x=>x.value))">Save or Print</button></div></div>`;
}
// The whole notebook, every chapter written and every skill marked (for Moving to Oak).
function gwPrintAll() {
  const L = gwRec(); if (!L) { showToast('Open your profile first.'); return; }
  if (!document.getElementById('client-ground').classList.contains('active')) { GX.ch = null; GX.pick = false; showView('client-ground'); }
  gwPrint(gwChapters(L).map(c => c.id).concat(['skills']));
}
function gwPrint(ids) {
  const L = gwRec(); if (!L || !ids.length) { showToast('Choose a chapter first.'); return; }
  const chs = ids.map(gwChapter).filter(c => c && gwWritten(c, L)), sk = ids.includes('skills') ? gwSkillsAll().filter(x => L.skills[x.id] && L.skills[x.id].done) : [];
  if (!chs.length && !sk.length) { showToast('Write in this chapter or mark a skill first, then save or print it.'); return; }
  const box = document.getElementById('bc-gwsheet'); if (!box) return;
  const pine = c => { if (!c.fromPine || !L.fromPine) return ''; const A = L.fromPine.answers || {}; return Object.keys(A).map(pid => `<h3 class="sq-legq">${escapeHtml(A[pid].q || '')}</h3><p class="sq-lega">${escapeHtml(A[pid].text || '').replace(/\n/g, '<br>')}</p><p class="sq-legby">Written in Pine${A[pid].date ? ', ' + escapeHtml(formatDate(A[pid].date)) : ''}</p>`).join(''); };
  box.innerHTML = `<div class="growth-plan-doc sq-legdoc" id="bc-gwdoc"><div class="growth-plan-header"><div class="growth-plan-title">${escapeHtml(PROF ? PROF.name + '\'s Groundwork' : 'My Groundwork')}</div><div class="growth-plan-meta">${formatDate(null)}</div></div>
    ${chs.map(c => `<div class="growth-plan-domain"><div class="growth-plan-domain-header"><div class="growth-plan-domain-name">${escapeHtml(gwT(c, 'title'))}</div></div>${pine(c)}${(c.prompts || []).filter(p => L.answers[p.id] && String(L.answers[p.id].text || '').trim()).map(p => { const a = L.answers[p.id]; return `<h3 class="sq-legq">${escapeHtml(gwP(p))}</h3><p class="sq-lega">${escapeHtml(a.text).replace(/\n/g, '<br>')}</p>${a.when ? `<p class="sq-legby">${escapeHtml((c.whenLabel || 'By when').replace(/ \(optional\)$/, ''))} ${escapeHtml(formatDate(a.when))}</p>` : ''}`; }).join('')}</div>`).join('')}
    ${sk.length ? `<div class="growth-plan-domain"><div class="growth-plan-domain-header"><div class="growth-plan-domain-name">${escapeHtml(GW.skillsTitle || 'Skills I\'ve Got')}</div></div><ul class="sq-planlist">${sk.map(x => `<li>${escapeHtml(x.t)} <span class="sq-legby">${escapeHtml(formatDate(L.skills[x.id].done))}</span></li>`).join('')}</ul></div>` : ''}
    <div class="growth-plan-footer"><p>Kept with Birch by Grow With Grounded. These words belong to the person who wrote them.</p></div></div>`;
  box.removeAttribute('aria-hidden');
  const sheet = document.getElementById('bc-gwdoc');
  if (window.GGApp && window.ggPdfFromEl) GGApp.sheet({ title: 'Groundwork', file: 'groundwork.pdf', print: () => printGrowthPlanNow('bc-gwdoc'),
    blocks: () => ggPdfFromEl(sheet, { rows: '.growth-plan-domain-header', eyebrow: 'Groundwork', foot: 'Birch(TM) by Grow With Grounded. growwithgrounded.com/birch' }) });
  else printGrowthPlanNow('bc-gwdoc');
}

// ---------- SAVE TO A FILE: locked with a passcode (shared/gg-filelock.js) ----------
function savePersonalFile() {
  if (!window.currentClientEntry && personalHistory.length === 0) { showToast('Take the check-in first, then save your results.'); return; }
  if (window.currentClientEntry) {
    currentClientEntry.growthPlan = collectGrowthPlan('client');
    const copy = JSON.parse(JSON.stringify(currentClientEntry));
    const i = personalHistory.findIndex(e => e.id === copy.id);
    if (i >= 0) personalHistory[i] = copy; else personalHistory.push(copy);
    sortEntries(personalHistory);
  }
  if (PROF) { profPersist().then(() => { showToast('Saved to your profile.'); renderSaveBox(); renderProgress(); }); return; }
  const data = { app: 'birch', type: 'personal', version: 1, savedAt: new Date().toISOString(), entries: personalHistory };
  if (!window.GGFileLock) { showToast('Saving to a file needs a newer browser.'); return; }
  GGFileLock.save({ app: 'birch', filename: `birch-my-results-${todayKey()}.json`, data, what: 'your Birch results' }).then(ok => {
    if (ok) { showToast('Saved to a locked file. Keep it, and its passcode, somewhere safe.'); renderSaveBox(); renderProgress(); }
  });
}
function loadPersonalFile(input) {
  const file = input.files && input.files[0];
  input.value = '';
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const take = data => {
      if (!data || !['birch', 'pine', 'oak'].includes(data.app) || data.type !== 'personal' || !Array.isArray(data.entries)) throw new Error('Not a Birch results file');
      const valid = data.entries.filter(e => e && e.scores && typeof e.scores === 'object');
      const ids = new Set(personalHistory.map(e => e.id));
      valid.forEach((e, i) => {
        if (!e.id) e.id = 'saved-' + i + '-' + String(e.date);
        if (data.app !== 'birch' && !e.from) { e.from = data.app; e.id = data.app + '-' + e.id; }
        if (!ids.has(e.id)) { personalHistory.push(e); ids.add(e.id); }
      });
      sortEntries(personalHistory);
      window.personalFileLoaded = true;
      if (PROF) profPersist();
      renderSaveBox(); renderProgress();
      showToast(`Loaded ${valid.length} saved result${valid.length !== 1 ? 's' : ''}.`);
    };
    const fail = () => showToast('That file is not a Birch, Pine, or Oak results file.');
    if (window.GGFileLock) GGFileLock.read(reader.result, { app: 'birch', what: 'your results' }).then(d => { if (d) { try { take(d); } catch (e) { fail(); } } }).catch(fail);
    else { try { take(JSON.parse(reader.result)); } catch (e) { fail(); } }
  };
  reader.readAsText(file);
}
function renderSaveBox() {
  const box = document.getElementById('client-save-box');
  if (!box) return;
  const n = personalHistory.filter(e => !currentClientEntry || e.id !== currentClientEntry.id).length;
  const saved = currentClientEntry && personalHistory.some(e => e.id === currentClientEntry.id);
  if (PROF) {
    box.innerHTML = `<div class="save-box"><div class="save-box-title">Saved to your profile</div><p>This result is saved to ${escapeHtml(PROF.name)}'s profile on this device. After you choose your growth plan, tap Save to keep your choices too.</p><div class="btn-row"><button class="btn btn-primary" onclick="savePersonalFile()">Save</button><button class="btn btn-secondary" onclick="profBackup()">Download a Locked Backup</button></div></div>`;
    return;
  }
  let status;
  if (saved) status = 'Saved. If you change your growth plan, save again to update this result in your file.';
  else if (personalFileLoaded) status = `Your file is loaded with ${n} earlier result${n !== 1 ? 's' : ''}. Saving adds this one to it.`;
  else status = 'Have a file from before? Load it first, and this result will be added to it.';
  box.innerHTML = `
    <div class="save-box">
      <div class="save-box-title">Save your results</div>
      <p>Nothing is stored until you choose to save. Your own profile keeps your check-ins on this device, locked with your passcode, so you can watch your tree grow. Or save them to a file locked with a passcode you choose.</p>
      <p style="margin-top:8px;"><strong>${status}</strong></p>
      <div class="btn-row">
        <button class="btn btn-primary" onclick="profCreateDialog()">Save to my own profile</button>
        <button class="btn btn-secondary" onclick="savePersonalFile()">Save to a locked file instead</button>
        ${personalFileLoaded ? '' : '<button class="btn btn-secondary" onclick="openPersonalFilePicker()">Load My File</button>'}
      </div>
    </div>`;
}
function renderProgress() {
  const container = document.getElementById('client-progress-content');
  if (!container) return;
  const list = personalHistory.filter(e => e && e.scores);
  const pending = window.currentClientEntry && !list.some(e => e.id === currentClientEntry.id);
  if (pending) list.push(currentClientEntry);
  sortEntries(list);
  document.getElementById('progress-save-btn').style.display = (window.currentClientEntry || list.length) ? '' : 'none';
  if (!list.length) { container.innerHTML = '<p style="color:var(--ink-soft);">Load your file to see your progress, or take the check-in to start.</p>'; return; }
  renderHistoryChartAndTable(container, list);
  container.insertAdjacentHTML('afterbegin', graphCardHtml());
  if (pending) container.insertAdjacentHTML('afterbegin', '<div class="privacy-note"><strong>Your latest result is not saved yet.</strong> Use Save My Results to add it.</div>');
}

// ---------- CHART + TABLE ----------
// Rings compare only within the same standard, bank, and kind (full with full, quick with
// quick). Rings from Pine or Oak are labeled and never compared. A check-in taken
// together with a helper is marked, and compares like any Birch ring.
function stShown(entry, k) { return (entry.unsure || []).includes(k) ? null : (entry.scores || {})[k]; }
function earlierLabel(e) { return e.from ? (FROM_NAME[e.from] || 'Earlier') : !e.std ? 'Earlier' : ''; }
function renderHistoryChartAndTable(container, history) {
  const own = history.filter(e => !e.from && e.std);
  const last = own[own.length - 1] || null;
  const kind = e => e.type === 'quick' ? 'quick' : 'full';
  const same = (a, b) => a.std === b.std && (a.bank || 1) === (b.bank || 1) && kind(a) === kind(b);
  const prev = last ? own.slice(0, -1).reverse().find(e => same(e, last)) : null;
  let cmp = '';
  if (!last) cmp = '<p class="muted" style="font-size:15px;">Your rings from before Birch are kept below, labeled. Your first Birch check-in starts your Birch rings.</p>';
  else if (!prev) cmp = `<p class="muted" style="font-size:15px;">Your next ${kind(last) === 'quick' ? 'quick ' : ''}check-in will show how each part has grown.</p>`;
  else cmp = `<p style="font-size:15px;margin:0 0 6px;">Compared with your ${kind(last) === 'quick' ? 'quick ' : ''}check-in on ${escapeHtml(formatDate(prev.date))}:</p><div class="ring-cmp">` + ALL_DOMAINS.map(d => {
    const a = stShown(prev, d.key), b = stShown(last, d.key);
    let word = '<span>Not sure yet</span>';
    if (a != null && b != null) { const diff = b - a; word = diff >= 2 ? '<span class="up">Grew</span>' : diff <= -2 ? '<span class="down">Dipped</span>' : '<span>Same</span>'; }
    return `<div class="lvl-row" style="--domain-color:${d.color};"><b style="color:${d.color};">${d.part}</b>${word}</div>`;
  }).join('') + '</div>';
  let tableHtml = `<div class="table-scroll"><table class="history-table"><thead><tr><th>Date</th>`;
  ALL_DOMAINS.forEach(d => tableHtml += `<th>${d.part}</th>`);
  tableHtml += `</tr></thead><tbody>`;
  history.slice().reverse().forEach(s => {
    const lab = earlierLabel(s);
    tableHtml += `<tr><td>${escapeHtml(formatDate(s.date))}${s.type === 'quick' ? ' <span class="quick-tag">Quick</span>' : ''}${lab ? ` <span class="earlier-tag">${escapeHtml(lab)}</span>` : s.by === 'tapped' ? ' <span class="quick-tag">Taken Together</span>' : ''}</td>`;
    ALL_DOMAINS.forEach(d => { const v = stShown(s, d.key); tableHtml += `<td>${v == null ? 'Not sure yet' : `${stLevel(v)}<br><small>${v} of 10</small>`}</td>`; });
    tableHtml += `</tr>`;
  });
  tableHtml += `</tbody></table></div>`;
  container.innerHTML = `
    ${last ? `<div class="chart-container"><div class="section-title" style="margin-top:0;">Most Recent Tree</div><div style="max-width:260px;margin:0 auto;">${puzzleTreeSvg({ variant: 'score', scores: last.scores, seam: '#2C1810' })}</div>${cmp}</div>` : `<div class="chart-container">${cmp}</div>`}
    <div class="chart-container">
      <div class="section-title" style="margin-top:0;">Full History</div>
      ${tableHtml}
      ${history.some(e => earlierLabel(e)) ? '<p class="muted" style="font-size:14px;margin-top:8px;">Rings marked From Pine, From Oak, or Earlier used other questions. They stay here as part of your story, and they are never compared with Birch rings.</p>' : ''}
    </div>`;
}

// =====================================================================
// START
// =====================================================================
document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.querySelectorAll('.nav-btn[data-icon]').forEach(b => {
  b.insertAdjacentHTML('afterbegin', `<span class="nav-ico">${icon(b.getAttribute('data-icon'), 24)}</span>`);
});
function toggleSiteMenu(btn) {
  const open = document.getElementById('site-menu').classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}
// Text size: Birch starts at the normal size; larger text stays a setting.
const TEXT_SIZES = ['', 'ts-1', 'ts-2'];
const TEXT_LABELS = ['A+', 'A++', 'A'];
let textSize = 0;
try { const v = localStorage.getItem('birch:text-size'); if (v !== null) textSize = parseInt(v, 10) || 0; } catch (e) {}
function applyTextSize() {
  document.documentElement.classList.remove('ts-1', 'ts-2');
  if (TEXT_SIZES[textSize]) document.documentElement.classList.add(TEXT_SIZES[textSize]);
  const b = document.getElementById('size-btn');
  if (b) { b.textContent = TEXT_LABELS[textSize]; b.setAttribute('aria-label', 'Text size: ' + ['normal', 'larger', 'largest'][textSize] + '. Tap to change.'); }
}
function cycleTextSize() {
  textSize = (textSize + 1) % TEXT_SIZES.length;
  try { localStorage.setItem('birch:text-size', String(textSize)); } catch (e) {}
  applyTextSize();
}
applyTextSize();
renderAboutParts();
renderProgress();
renderProfileBar();

/* Deep links: #quick, #checkin, #groundwork, #skills, #plan, #about, #life (guides), #life=<id> or #talk=<id> (one guide), #for=<id> (a helper) */
function fromHash() {
  const h = decodeURIComponent(location.hash || '');
  if (h.startsWith('#life') || h.startsWith('#talk=')) { const id = h.startsWith('#life=') ? h.slice(6) : h.startsWith('#talk=') ? h.slice(6) : null; LCS.client.open = id && lcHas(id) ? id : null; showView('client-life'); }
  else if (h === '#groundwork' || h === '#ground') { GX.ch = null; showView('client-ground'); }
  else if (h === '#skills') { GX.ch = 'skills'; showView('client-ground'); }
  else if (h === '#plan') showView('client-growthplan');
  else if (h === '#quick') startQuick();
  else if (h === '#checkin' || h === '#check' + 'up') startCheckin();
  else if (h === '#about') showView('client-intro');
  else if (h.startsWith('#for=')) helpFromHash();
}
window.addEventListener('hashchange', fromHash);
setTimeout(fromHash, 60);
