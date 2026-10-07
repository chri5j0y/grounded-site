/* =====================================================================
   PINE . the app (GWG BLD 739)
   The Grow With Grounded tree for high schoolers, grades 9 to 12, between
   Aspen (grades 6 to 8) and Oak (adults). Built from Sequoia's newest
   structures and Aspen's teen pieces. Where they differ, Aspen wins on
   safety and privacy, and Sequoia wins on depth and structure.

   Where the words live (edit them there, not here)
     pine/checkin.js     the question bank, grade bands, Faith or Plain wording,
                         flags, safety step, help lines, optional questions (PINE_CHECKIN)
     pine/practices.js   the practice library: parts, practices, how-to guides (PINE_PRACTICES)
     pine/nextsteps.js   the Next Steps notebook chapters and prompts (PINE_NEXTSTEPS)
     shared/gg-journey.js  the twelve weeks, anchors, and movement levels (AGES.pine)

   What is saved, and where
   - Everything stays on this device, locked in the teen's own Grounded profile
     (age "pine", High school) under "pine": history (check-ins), tend (daily
     tending and the game layer), nextsteps (the notebook), grade, wording
     ('faith' or 'plain'), askSens (the optional questions), setup, and oakBrought.
   - Only the teen's own passcode opens it. A grown-up agreed when the profile
     was made, and can only clear a forgotten passcode, never read.
   - Save to a file writes a passcode-locked file (shared/gg-filelock.js).

   What a grown-up sees (decision 4)
   - Only a quiet "Please check in" alert in The Grove, written by pineTeenAlert
     with oakTeenAlert's exact shape: GGP.setShared(pid, {safety: {flag: date, kinds}}).
     kinds come only from PINE_CHECKIN.ALERT_KINDS (the safety step, feeling alone,
     losing hope). Never answers, levels, notes, faith answers, or Next Steps.
   - When a teen says someone is hurting them, it never goes to the alert. The teen
     sees outside help instead (PINE_CHECKIN.safety.lines.hurt).
   - The big picture of tending (days tended, rings, parts tended) shows in The Grove
     only while the teen's own switch is on, the same as every tree.

   The game layer (decision 14), through the gg-tend.js hooks
   - Mastery: a practice moves Tried, Building, Mine as it is checked off.
   - Tree levels: named stages as days tended grow. Days tended never go down.
   - Milestones: first day, first ring, first full week, all six in a day, each season.
   - Balance bonus: all six parts tended in one week (Monday to Sunday).
   - Steady by default (the gentle tree). Hardy, which the teen can choose, shows
     trouble on a part left untended a long while, and one practice heals it.
   - No leaderboards, no random rewards, no streak shame. Everything pauses its
     penalties for 14 days after a check-in flags losing hope or feeling alone.

   When Life Changes (GWG BLD 740): Pine's own guides, built like Sequoia's.
   The words live in pine/guides.js (PINE_GUIDES = {rings, links, topics}); the
   videos in pine/guide-videos.js, played by shared/gg-learn.js. Two views: For
   You (the teen) and For the Grown-up. Faith lines show the same in Faith and
   Plain wording, since the guides are written to the kids' faith rules.
   ===================================================================== */
let PROF = null;      // the open Pine profile: { id, name, avatar, age }

/* ---------- the practice library (pine/practices.js) ----------
   Sequoia's shapes: DOMAIN_DEFS (key, name, color, group, prompt, restore,
   strength_msg, growth_steps), GUIDES ("part|Name": {why, today, build, hard, vary,
   adapt}), META, NEW, EV, DISC, SHELF, FLAGS, plus Plain variants for spiritual
   practices (PLAIN "part|Name": {name, line, why, today, build, hard}, or a
   guide's own plain: {...}). */
const SP = window.PINE_PRACTICES || {};
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
// PINE: THE SIX PARTS, in words for high school
// =====================================================================
const CKB = window.PINE_CHECKIN || {};
const DOMAIN_BY_KEY = {};
DOMAIN_DEFS.forEach(d => { DOMAIN_BY_KEY[d.key] = d; });
const CK_PART = {}; (CKB.parts || []).forEach(p => { CK_PART[p.key] = p; });

const PARTS = {
  roots: {
    part: 'Roots', icon: 'roots',
    treeLabel: 'What roots do for a pine', youLabel: 'What your roots do for you',
    tree: 'A pine sends one root deep and many roots wide. They hold it up through wind and storms that no one sees coming.',
    you: 'Your roots are what holds you steady: peace inside, the people and traditions you come from, and faith, if faith is part of your life. Strong roots let you bend without breaking.',
    plainYou: 'Your roots are what holds you steady: peace inside, the people and traditions you come from, and the values you live by. Strong roots let you bend without breaking.',
    health: ['You have something steady to come back to when life gets loud.', 'You can take quiet time and know yourself a little better.', 'You can bring your honest questions without fear.'],
    stress: ['Nothing feels solid when life shakes.', 'Something about faith, rules, or a community makes you feel scared or not good enough.', 'You feel empty, like something is missing.'],
    plainStress: ['Nothing feels solid when life shakes.', 'Rules or beliefs around you make you feel scared or not good enough.', 'You feel empty, like something is missing.']
  },
  trunk: {
    part: 'Trunk', icon: 'trunk',
    treeLabel: 'What the trunk does for a pine', youLabel: 'What your trunk does for you',
    tree: 'A pine grows straight toward the light, adding a ring every year. The trunk carries everything the tree is becoming.',
    you: 'Your trunk is purpose: what you care about, what you are good at, and where you might be headed. You do not need it all figured out. A direction is enough.',
    health: ['You know what you care about enough to stand up for.', 'You can name something you are good at, or getting better at.', 'You have a next step, even a small one.'],
    stress: ['Days feel like going through the motions.', 'Other people\'s plans for you feel louder than your own.', 'The future feels like pressure instead of possibility.']
  },
  bark: {
    part: 'Bark', icon: 'bark',
    treeLabel: 'What bark does for a pine', youLabel: 'What your bark does for you',
    tree: 'Pine bark is thick and plated. It takes the hits, seals its wounds with sap, and keeps growing around old scars.',
    you: 'Your bark is your mind and feelings: how you handle stress, mistakes, and big feelings. Strong bark is not about never getting hurt. It is about healing well.',
    health: ['You have real ways to calm down when stress climbs.', 'You can make a mistake and keep going.', 'You can name what you are feeling.'],
    stress: ['Worry or sadness has settled in and stayed.', 'You are hard on yourself most of the time.', 'Stress shows up as headaches, snapping at people, or shutting down.']
  },
  branches: {
    part: 'Branches', icon: 'branches',
    treeLabel: 'What branches do for a pine', youLabel: 'What your branches do for you',
    tree: 'Branches reach out and hold the needles up to the light. Pines grow in stands, sheltering each other from the wind.',
    you: 'Your branches are your people: friends, family by blood or by choice, teammates, and the adults in your corner. Who shows up for you, and who you show up for.',
    health: ['You have at least one person you can be real with.', 'You can say no to pressure and still belong.', 'There is an adult you could go to if something went wrong.'],
    stress: ['You feel left out, or alone in a crowd.', 'A friendship or relationship leaves you feeling worse about yourself.', 'Someone is bullying, threatening, or controlling you.']
  },
  leaves: {
    part: 'Leaves', icon: 'leaf',
    treeLabel: 'What needles do for a pine', youLabel: 'What your leaves do for you',
    tree: 'A pine\'s needles stay green all winter. They turn light into energy for the whole tree, and they are the first place stress shows.',
    you: 'Your leaves are your body: Move, Rest, and Nourish. Sleep, movement, food, and your phone all live here. This part asks about what your body allows, never about looking a certain way.',
    health: ['You get enough sleep most nights.', 'You move in ways you enjoy.', 'You eat real meals that give you energy.'],
    stress: ['You run on too little sleep.', 'Your phone keeps you up or keeps you scrolling.', 'You skip meals or feel bad about your body.']
  },
  fruit: {
    part: 'Fruit', icon: 'fruit',
    treeLabel: 'What cones do for a pine', youLabel: 'What your fruit does for you',
    tree: 'Pine cones hold the seeds of the next forest. Some wait for the right season, then open all at once.',
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
  const fit = (lifeFits(key, name) ? `<span class="pm-tag pm-fit pm-you">${(window.GGLife && GGLife.FITS) || 'Fits You'}</span>` : '') + (f.seated ? '<span class="pm-tag pm-fit">Seated or low energy</span>' : '');
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
  else { const ad = (FLAGS_P[key + '|' + name] || {}).adapt; if (ad) s += '<p><strong>Another way.</strong> ' + escapeHtml(ad) + '</p>'; }
  if (window.GGSources) s += GGSources.line(GGSources.practiceList(name, 'pine'), { practice: true });
  return s;
}
function toggleGuide(btn) {
  const g = btn.nextElementSibling;
  const open = g.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  btn.innerHTML = open ? 'Hide guide &uarr;' : 'How to do this &darr;';
}

// =====================================================================
// HEALTH AND ABILITY (GWG BLD 756, HA 1). The teen's choice lives in shared/gg-life.js, locked in
// their own vault (only their passcode opens it; a grown-up never sees it, and alerts never mention
// it). It only reorders and adds lines: practices that fit show first with Fits You and their adapt
// line, a few check-in questions get an example or tip, growth ideas add one line per choice for a
// Growing Edge part, guides get Picked for You, and information lines sit below the crisis lines.
// Questions, scores, flags, alerts, and crisis lines never change. pine/life.js holds the data.
// =====================================================================
const PL = window.PINE_LIFE || { notes: [], steps: {} };
const lifeOn = () => !!window.GGLife;
function lifeTags(key, name) { const f = FLAGS_P[key + '|' + name] || {}, g = GUIDES[key + '|' + name] || {}; return { life: f.life || [], adapt: f.adapt || g.adapt || '' }; }
function lifeFits(key, name) { return lifeOn() && GGLife.fits(lifeTags(key, name)); }
function lifeIds() { return lifeOn() ? GGLife.chosen('pine') : []; }
const lifeUniq = a => a.filter((x, i) => x && a.indexOf(x) === i);
// Check-in notes for one question: { ex: [], tip: [] }. Never on a flagged question.
function lifeNote(q) {
  const out = { ex: [], tip: [] }; if (!q || q.flag || q._k == null) return out;
  const ids = lifeIds(); if (!ids.length) return out;
  (PL.notes || []).forEach(n => { if (n.part !== q._k || n.i !== q._i) return; ids.forEach(id => { const x = (n.n || {})[id]; if (x) { if (x.ex) out.ex.push(x.ex); if (x.tip) out.tip.push(x.tip); } }); });
  out.ex = lifeUniq(out.ex); out.tip = lifeUniq(out.tip); return out;
}
// One growth idea line per chosen id, for a Growing Edge part.
function lifeSteps(key) { const S = PL.steps || {}; return lifeUniq(lifeIds().map(id => ((S[key] || {})[id]) || ((S.any || {})[id]) || '')); }
// Information and support lines for the choice, always shown BELOW the crisis lines.
function lifeLinesHtml(collapsed) {
  const L = lifeOn() ? GGLife.lines('pine') : []; if (!L.length) return '';
  const title = (window.GGLife && GGLife.LINES_TITLE) || 'Information and Support';
  const body = `<p class="gt-small">For information and support. In a crisis, use the lines above.</p><ul class="calm-list sq-lines">${L.map(x => lineHtml(x)).join('')}</ul>`;
  return collapsed ? `<details class="pn-life-lines"><summary>${escapeHtml(title)}</summary>${body}</details>` : `<div class="pn-life-lines"><h3>${escapeHtml(title)}</h3>${body}</div>`;
}
// Steady or Hardy: Hardy is never suggested while pain, a serious illness, or mental health is chosen.
function hardyRests() { return lifeIds().some(id => id === 'pain' || id === 'serious' || id === 'mind'); }
function mountLifeChooser() {
  const host = document.getElementById('pn-life-host'); if (!host || !lifeOn()) return;
  if (GGLife.who() !== (window.GGP && GGP.active() ? GGP.active().id : null)) GGLife.use(null);
  GGLife.chooser(host, { tree: 'pine' });
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
// THE SIX-PIECE PUZZLE TREE, drawn as a pine
// variant: 'color' (part colors), 'score' (shaded by score), 'hero'
// Roots: one deep root and wide laterals (pattern r3). Trunk: tall and straight.
// Branches: the shaded underside of each tier (kind 'under'). Leaves: the tiers
// of the Pine logo (kind 'tiers'). Fruit: cones (kind 'cones').
// =====================================================================
const TREE_SHAPES = {
  roots: {
    kind: 'taper', dx: 0, dy: 16, delay: 0,
    paths: [
      ['M200 299 C199 322 202 342 199 368', 10, 2],
      ['M194 298 C176 310 150 318 108 324', 9, 1.8],
      ['M206 298 C224 310 250 318 292 324', 9, 1.8],
      ['M191 298 C178 316 164 332 146 350', 7, 1.4],
      ['M209 298 C222 316 236 332 254 350', 7, 1.4],
      ['M110 323 C96 328 84 334 70 342', 3.2, 1],
      ['M290 323 C304 328 316 334 330 342', 3.2, 1],
      ['M148 348 C142 356 138 362 134 370', 2.6, .8],
      ['M252 348 C258 356 262 362 266 370', 2.6, .8],
      ['M199 352 C192 358 186 362 178 366', 2.6, .8],
      ['M200 356 C207 362 214 366 222 370', 2.6, .8],
      ['M150 316 C140 322 130 324 118 330', 2, .6],
      ['M250 316 C260 322 270 324 282 330', 2, .6]
    ]
  },
  // a tall, straight trunk with a little flare at the ground
  trunk: { kind: 'fill', dx: 0, dy: 12, delay: 0.25, paths: ['M180 292 C190 288 192 276 193 258 L196 70 L204 70 L207 258 C208 276 210 288 220 292 Z'] },
  bark: {
    kind: 'fill', dx: 0, dy: 0, delay: 0.45,
    paths: ['M168 292 C178 287 184 276 186 258 L189 120 L192 120 L191 258 C190 276 186 288 178 292 Z', 'M232 292 C222 287 216 276 214 258 L211 120 L208 120 L209 258 C210 276 214 288 222 292 Z'],
    grain: ['M176 288 C182 280 186 266 187 246', 'M224 288 C218 280 214 266 213 246', 'M189 220 C189 200 190 180 190 150', 'M211 220 C211 200 210 180 210 150']
  },
  // the shaded underside of each tier, as in the Pine logo
  branches: { kind: 'under', dx: 0, dy: -8, delay: 0.65 },
  // the tiers of the Pine mark: [y of the lower edge, height, reach left, reach right]
  leaves: { kind: 'tiers', dx: 0, dy: -12, delay: 0.85, tiers: [[240, 73, 86, 86], [204, 73, 73, 73], [161, 67, 58, 58], [118, 61, 43, 43], [75, 49, 28, 28]] },
  fruit: { kind: 'cones', dx: 0, dy: -18, delay: 1.1, cones: [[146, 252], [256, 252], [156, 216], [246, 216], [168, 173], [234, 173], [182, 130]] }
};
const PIECE_FOR = { roots: 'roots', trunk: 'trunk', bark: 'bark', branches: 'branches', leaves: 'leaves', fruit: 'fruit' };
const DRAW_ORDER = ['bark', 'trunk', 'branches', 'leaves', 'fruit', 'roots'];
// Results: the Pine logo's own colors, each part shaded by its score
const LOGO_COLORS = { roots: '#9A7A55', trunk: '#6E4524', bark: '#4A2C14', branches: '#2C5527', leaves: '#4A8040', fruit: '#8A5A2B' };
const HERO_COLORS = { roots: '#E8D6B6', trunk: '#F3E7D1', bark: '#DECAA9', branches: '#EEE0C6', leaves: '#FAF6EE', fruit: '#FFFFFF' };

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
// One tier of the Pine mark: apex on the trunk, straight sides, a toothed lower edge.
function boughPoints(t, cx) {
  const [yb, hh, L, R] = t, top = yb - hh, tooth = hh * 0.2, pts = [[cx, top]];
  for (let j = 0; j <= 6; j++) pts.push([cx + R - j * (L + R) / 6, j % 2 ? yb - tooth : yb]);
  return pts;
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
      if (!hero && key === 'trunk') inner += `<g stroke="#000" stroke-opacity="0.25" stroke-width="1.2" stroke-linecap="round" fill="none"><path d="M197 286 C198 250 199 200 199 90M203 286 C202 250 201 200 201 90"/></g>`;
    } else if (shape.kind === 'under') {
      // the shaded underside of each tier, as in the Pine logo, peeking just below its toothed edge
      TREE_SHAPES.leaves.tiers.slice().reverse().forEach(t => {
        const pts = boughPoints(t, 200).map(p => p[0].toFixed(1) + ',' + (p[1] + 5).toFixed(1)).join(' ');
        inner += `<polygon points="${pts}" style="fill:${color};stroke:${o.seam};" stroke-width="1.5" stroke-linejoin="round"/>`;
      });
    } else if (shape.kind === 'tiers') {
      // the tiers of the Pine logo, top tier first, each with a lit left face and a shaded right face
      TREE_SHAPES.leaves.tiers.slice().reverse().forEach(t => {
        const [yb, hh, L, R] = t, top = yb - hh;
        const pts = boughPoints(t, 200).map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
        inner += `<polygon points="${pts}" style="fill:${color};stroke:${o.seam};" stroke-width="1.5" stroke-linejoin="round"/>`;
        if (!hero) {
          inner += `<polygon points="200,${top + 3} ${(200 - L * 0.76).toFixed(1)},${yb - 3} ${(200 - L * 0.34).toFixed(1)},${(yb - hh * 0.15).toFixed(1)}" fill="#FFFFFF" opacity="0.22"/>`;
          inner += `<polygon points="200,${top + 8} ${(200 + R * 0.84).toFixed(1)},${yb - 1.5} ${(200 + R * 0.44).toFixed(1)},${(yb - hh * 0.12).toFixed(1)}" fill="#000000" opacity="0.16"/>`;
        }
      });
    } else if (shape.kind === 'cones') {
      inner += shape.cones.map(([x, y]) => `<g transform="translate(${x} ${y})">
        <ellipse rx="4.4" ry="7" style="fill:${color};stroke:${o.seam};" stroke-width="2"/>
        ${hero ? '' : '<path d="M-3.6 -2.6H3.6M-4.2 0.6H4.2M-3.4 3.6H3.4" stroke="#000" stroke-opacity="0.3" stroke-width="1"/>'}
        <path d="M0 -7 V-10" style="stroke:${o.seam};" stroke-width="2" stroke-linecap="round"/></g>`).join('');
    }
    const label = `${d.part}, ${d.name}${o.scores ? ', ' + o.scores[key] + ' of 10' : ''}`;
    const attrs = o.interactive ? `tabindex="0" role="button" aria-label="${label}"` : '';
    const anim = o.assemble ? `style="--dx:${shape.dx}px;--dy:${shape.dy}px;--delay:${shape.delay}s;"` : '';
    const sway = (o.assemble && (key === 'leaves' || key === 'fruit')) ? ' sway' : '';
    pieces += `<g class="piece-wrap${sway}" ${anim}><g class="piece${o.interactive ? ' interactive' : ''}" data-key="${key}" ${attrs} opacity="${pieceOpacity.toFixed(2)}"><title>${label}</title>${inner}</g></g>`;
  });
  return `<svg class="${o.cls}${o.assemble ? ' assemble' : ''}" viewBox="40 2 320 424" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pine with six parts">${ground}${pieces}</svg>`;
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
// THE TEEN'S SETTINGS: grade, Faith or Plain, the optional questions,
// Steady or Hardy. Saved in the profile under "pine"; before a profile
// exists they live in memory for this visit only.
// =====================================================================
const LOCAL = { grade: null, wording: null, askSens: false };
function rec() { if (PROF && window.GGP && GGP.isOpen(PROF.id)) { const d = GGP.data(PROF.id, 'pine'); if (!Array.isArray(d.history)) d.history = []; return d; } return LOCAL; }
function isPlain() { try { return rec().wording === 'plain'; } catch (e) { return false; } }
function gradeNow() { const g = rec().grade; return g ? String(g) : null; }
function bandNow() { const g = gradeNow(); return CKB.bandOf ? CKB.bandOf(g || '9') : (g === '11' || g === '12' ? '11-12' : '9-10'); }
function bandName(b) { const x = (CKB.bands || []).find(y => y[0] === b); return x ? x[1] : b === '11-12' ? 'Grades 11 and 12' : 'Grades 9 and 10'; }
function sensOn() { return !!rec().askSens; }
function persistRec() { return (PROF && window.GGP) ? GGP.save(PROF.id) : Promise.resolve(); }

// =====================================================================
// CHECKIN: one question on the screen at a time
// The bank is /pine/checkin.js, read by Pine and, later, Pine Guide: 7 per
// part in two grade bands, a tip and a "why" line on each, two reverse
// questions per part, flags, the optional questions, and the safety step.
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
const LINES = (function () { const L = SAFETY.lines || {}; return Array.isArray(L) ? { calm: L, hurt: L.filter(x => x.first === 'hurt') } : { calm: L.calm || [], hurt: L.hurt || [] }; })();
function bankFor(band, wording) {
  if (typeof CKB.getBank === 'function') return CKB.getBank(band, wording);
  const out = {}; Object.keys(CKB.questions || {}).forEach(k => { out[k] = (CKB.questions[k] || []).map(q => Object.assign({}, q, (q.v || {})[band] || {}, wording === 'plain' ? (q.plain || {}) : {})); });
  return out;
}
function sensList() { return typeof CKB.sensitiveList === 'function' ? CKB.sensitiveList() : (CKB.SENSITIVE || CKB.sensitive || []); }
let QUESTIONS = {};
function loadBank() { QUESTIONS = bankFor(bandNow(), isPlain() ? 'plain' : 'faith'); Object.keys(QUESTIONS).forEach(k => (QUESTIONS[k] || []).forEach((q, i) => { if (q && typeof q === 'object') { q._k = k; q._i = i; } })); }
loadBank();
const Q_STEM = (CKB.stems || {}).standard || 'In the past two weeks, how often have you...';
const quickQ = key => ((QUESTIONS[key] || [])[0] || {}).t || '';
const stLevel = sc => sc == null ? 'Not sure yet' : sc >= 8 ? 'Strong' : sc >= 5 ? 'Steady' : 'Growing Edge';
const stLevelLine = sc => sc == null ? 'Not sure yet' : `${stLevel(sc)}, ${sc} of 10`;
let ST_ANS = {}, ST_SAFE = {}, ST_SENS = {}, ST_QUICK = false, CK_MODE = 'self', CK_BAND = '9-10', CK_SENS = false;

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
function tipHtml(q) { const lt = lifeNote(q).tip; return CK_MODE === 'trust' && q && (q.tip || lt.length) ? `<div class="pn-follow" role="note"><b>To talk about together</b>${escapeHtml(q.tip || '')}${lt.map(x => ' ' + escapeHtml(x)).join('')}</div>` : ''; }
function questionHtml(key, i, text) {
  const cur = key.indexOf('sens_') === 0 ? ST_SENS[key.slice(5)] : (ST_ANS[key] || {})[i];
  const q = stQ(key, i);
  return `<div class="q-card sq-one${cur ? ' answered' : ''}" data-q="${key}-${i}" role="radiogroup" aria-label="${escapeHtml(text)}">
    <p class="q-text sq-qtext">${escapeHtml(text)}</p>
    <div class="q-opts sq-opts">${Q_OPTS.map(o => `<button type="button" data-v="${o[0]}" aria-pressed="${cur === o[0]}" onclick="answerQ('${key}', ${i}, '${o[0]}')"><span class="sq-dot" aria-hidden="true"></span>${o[1]}</button>`).join('')}</div>
    ${(ex => ex.length ? `<ul class="bc-ex" aria-label="An example">${ex.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>` : '')(lifeNote(q).ex)}
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

// ---------- safety (Aspen's two questions, fitted to grades 9 to 12) ----------
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

// ---------- help lines (pine/checkin.js safety.lines: calm and hurt) ----------
function lineById(id) { return LINES.calm.find(x => x.id === id) || LINES.hurt.find(x => x.id === id) || null; }
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
  else if (why === 'self' || why === 'now') { lead = `<p><b>${escapeHtml(SAFETY.yes || '')}</b></p>${SAFETY.means ? `<p>${escapeHtml(SAFETY.means)}</p>` : ''}`; if (why === 'now') first = ['988', '911']; }
  else if (why === 'flag' && ST_FLAGS[flagKey]) { const f = ST_FLAGS[flagKey]; lead = `<p>${escapeHtml(f.note || '')}</p>`; list = linesFor(f.lines).length ? linesFor(f.lines) : LINES.calm; }
  else lead = `<p>${escapeHtml(SAFETY.calmIntro || 'These people want to help, any time. You can also tell a grown-up you trust.')}</p>`;
  const wrap = document.createElement('div');
  wrap.id = 'calm-card'; wrap.className = 'calm-back';
  wrap.innerHTML = `<div class="calm-box" role="dialog" aria-modal="true" aria-labelledby="calm-title">
    <h2 id="calm-title">${escapeHtml(title)}</h2>
    ${lead}
    ${linesHtml(list, false, first)}
    ${why === 'hurt' || why === 'self' || why === 'now' ? '' : lifeLinesHtml(true)}
    ${why !== 'hurt' && LINES.hurt.length ? '<p class="gt-small"><button type="button" class="text-btn" onclick="showCalm(\'hurt\')">Someone hurting you? Help from outside your home</button></p>' : ''}
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
  out.push({ kind: 'safe', which: 'safe' }); out.push({ kind: 'safe', which: 'self' }); out.push({ kind: 'safe', which: 'now' });
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
      ${sc.sens ? '<p class="sq-who">You turned this question on. It never counts toward a score, and it is never shared.</p>' : ''}
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
      <p class="lead">Your answers stay on this device, locked in your profile. Tap below to see your tree.</p>
      <div class="btn-row step-nav">${back}<button class="btn btn-primary" onclick="calculateResults('client')">See My Tree</button></div></section>`;
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
    <p class="gt-small">${CK_MODE === 'trust' ? 'After each answer, a short note gives you something to talk about together, like with a parent, mentor, coach, or counselor you chose. You decide what to share.' : 'Read each question and pick what fits best. Each answer moves you on by itself.'} ${escapeHtml(bandName(CK_BAND))}. <button type="button" class="text-btn" onclick="askGrade(true)">Change grade</button></p>`;
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
// The grade is asked once, then kept in the profile. It sets the band.
function askGrade(change, then) {
  const old = document.getElementById('pn-grade'); if (old) old.remove();
  const G = CKB.grades || [['9', 'Grade 9'], ['10', 'Grade 10'], ['11', 'Grade 11'], ['12', 'Grade 12']], cur = gradeNow();
  const wrap = document.createElement('div');
  wrap.id = 'pn-grade'; wrap.className = 'calm-back';
  wrap.innerHTML = `<div class="calm-box pn-box" role="dialog" aria-modal="true" aria-labelledby="pn-grade-title"><h2 id="pn-grade-title">${change ? 'Change your grade' : 'Which grade are you in?'}</h2>
    <p>Pine asks a few questions differently for grades 9 and 10 and for grades 11 and 12. ${change ? 'Your earlier check-ins stay, and compare only with check-ins from the same grades.' : 'You only need to answer this once. You can change it in Settings.'}</p>
    <div class="pn-grades">${G.map(g => `<button type="button" class="btn ${cur === g[0] ? 'btn-primary' : 'btn-secondary'}" onclick="setGrade('${g[0]}')">${escapeHtml(g[1])}</button>`).join('')}</div>
    <div class="calm-row"><button type="button" class="btn btn-secondary" onclick="document.getElementById('pn-grade').remove()">Not now</button></div></div>`;
  document.body.appendChild(wrap);
  askGrade.then = then || null;
  const b = wrap.querySelector('.pn-grades button'); if (b) b.focus();
}
function setGrade(g) {
  rec().grade = g; const box = document.getElementById('pn-grade'); if (box) box.remove();
  persistRec().then(() => {
    loadBank(); CK_BAND = bandNow();
    showToast('Grade ' + g + ' saved.');
    const t = askGrade.then; askGrade.then = null;
    if (t) t(); else if (document.getElementById('client-assess').classList.contains('active')) { ST_ANS = {}; renderCheckin(); }
    if (window.GGTend) GGTend.render();
  });
}
function beginCheck(quick) {
  loadBank(); CK_BAND = bandNow(); CK_SENS = !quick && sensOn();
  ST_QUICK = !!quick; ST_ANS = {}; ST_SAFE = {}; ST_SENS = {};
  renderCheckin();
  showView('client-assess');
  goToStep(0);
}
function startCheckin() { if (!gradeNow()) { askGrade(false, () => beginCheck(false)); return; } beginCheck(false); }
function startQuick() { if (!gradeNow()) { askGrade(false, () => beginCheck(true)); return; } beginCheck(true); }

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
        <div class="practice-list" id="cp-list-${mode}-${d.key}">${(lifeOn() ? GGLife.order(d.restore, r => lifeTags(d.key, r[0])) : d.restore).map((r, i) => `
          <div class="practice-item" data-i="${i}">
            <label class="practice-option">
              <input type="checkbox" class="sq-pick-box" name="cp-${mode}-${d.key}" value="${escapeHtml(r[0])}" onchange="enforcePracticeLimit(this,'${mode}','${d.key}')">
              <span class="practice-option-text"><strong>${escapeHtml(shownName(d.key, r[0]))}.</strong> ${shownLine(d.key, r[0], r[1])}${lifeFits(d.key, r[0]) && lifeTags(d.key, r[0]).adapt ? `<span class="pn-adapt">${escapeHtml(lifeTags(d.key, r[0]).adapt)}</span>` : ''}${practiceMeta(d.key, r[0])}</span>
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
        <div class="growth-plan-header-logo"><img src="/shared/marks/pine.svg" alt="" width="64" height="64" style="display:block;margin:0 auto 10px;border-radius:14px"></div>
        <div class="growth-plan-title">Pine Growth Plan</div>
        <div class="growth-plan-meta">${nameField ? nameField + ' &middot; ' : ''}${formatDate(null)}</div>
      </div>
      ${domainsHtml}
      ${planHelpHtml()}
      <div class="growth-plan-next">
        <div class="growth-plan-next-label">Keep growing</div>
        <p><strong>Tend it every day.</strong> Your practices wait in the Today tab in Pine, ready to check off. A short check-in each week and a full check-in every twelve weeks show how your tree is growing. Open Pine at growwithgrounded.com/pine</p>
      </div>
      <div class="growth-plan-footer">
        <p class="growth-plan-footer-link">growwithgrounded.com/pine</p>
        <p>&copy; ${new Date().getFullYear()} Grow With Grounded LLC. All rights reserved. This growth plan was made with Grow With Grounded Pine. Grow With Grounded&trade; is a trademark of Grow With Grounded LLC. Content and framework may not be copied, reproduced, or redistributed without permission.</p>
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
// Help lines on every plan: the short teen list, and the full lines for anything the
// latest check-in flagged (never lost).
function planHelpHtml() {
  const e = oakLatestEntry(), f = (e && e.flags) || [];
  const ids = ['988', 'ctl', 'mncrisis', '911'];
  f.forEach(k => ((ST_FLAGS[k] || {}).lines || []).forEach(id => { if (!ids.includes(id)) ids.push(id); }));
  if (e && safeOn('safe', (e.safety || {}).safe)) LINES.hurt.forEach(x => { if (!ids.includes(x.id)) ids.push(x.id); });
  // The plan's page keeps the choice private: the help lines only, never the Health and Ability lines.
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
  else overall = 'Several parts of your tree are running low right now, so the healthy parts have less to draw on. This is a good moment to be honest about where you need support, and to talk with a trusted adult, a school counselor, or a counselor alongside Pine.';
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
  entries.slice(-2).reverse().map(partDef).forEach(d => { const steps = d.growth_steps.concat(d.score < 5 ? lifeSteps(d.key).map(escapeHtml) : []); html += block(d, 'growth-block', steps.length ? `<ul>${steps.map(s => `<li>${s}</li>`).join('')}</ul>` : '<p>Your growth plan has practices for this part.</p>'); });
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
function alertKinds(e) {
  const kinds = [];
  if (ALERT_KINDS.includes('safety') && (safeOn('self', (e.safety || {}).self) || safeOn('now', (e.safety || {}).now))) kinds.push('safety');
  (e.flags || []).forEach(f => { if (ALERT_KINDS.includes(f) && f !== 'safety' && !kinds.includes(f)) kinds.push(f); });
  return kinds;
}
// The quiet "Please check in" alert for the grown-ups who agreed (decision 4 and 5).
// The same shape as oakTeenAlert, so The Grove reads it with no change. Only
// ALERT_KINDS raise it. Someone hurting the teen never does (decision 6).
function pineTeenAlert(e) {
  if (!PROF || !window.GGP || !e || !GGP.isOpen(PROF.id)) return [];
  const kinds = alertKinds(e);
  if (kinds.length) GGP.setShared(PROF.id, { safety: { flag: e.date, kinds } });
  return kinds;
}
function flagBoxHtml(flags, entry) {
  let html = '';
  const shown = flags.filter(f => f !== 'hurt' && ST_FLAGS[f]);
  if (shown.length) html += `<div class="flag-box" role="note"><h3>Worth tending</h3>${shown.map(f => `<p><strong>${escapeHtml(ST_FLAGS[f].title)}.</strong> ${escapeHtml(ST_FLAGS[f].note)}</p>${linesHtml(linesFor(ST_FLAGS[f].lines), true)}`).join('')}
    <p><button type="button" class="text-btn" onclick="showCalm()">See all help lines</button></p></div>`;
  if (flags.includes('hurt')) html += `<div class="flag-box pn-hurt" role="note"><h3>${escapeHtml(SAFETY.hurtTitle || 'No one has the right to hurt you.')}</h3><p>${escapeHtml((ST_FLAGS.hurt || {}).note || SAFETY.hurtIntro || '')}</p>${linesHtml(LINES.hurt, true)}<p class="gt-small">This answer stays with you. It is never part of the note to your grown-up.</p></div>`;
  if (entry && (safeOn('self', (entry.safety || {}).self))) html += `<div class="flag-box" role="note"><h3>${escapeHtml(SAFETY.title || 'You matter.')}</h3><p>${escapeHtml(SAFETY.yes || '')}</p>${linesHtml(linesFor(['988', 'ctl', 'mncrisis', '911']), true, safeOn('now', (entry.safety || {}).now) ? ['988', '911'] : [])}</div>`;
  // the optional questions: a private note, never shared, never a score
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
  const flags = stFlagsNow();
  const safety = { safe: ST_SAFE.safe || 'skipped', self: ST_SAFE.self || 'skipped' };
  if (safeOn('self', ST_SAFE.self)) safety.now = ST_SAFE.now || 'skipped';
  const sens = {}; if (CK_SENS) sensList().forEach(x => { if (ST_SENS[x.id]) sens[x.id] = ST_SENS[x.id]; });
  const entry = { id: Date.now().toString(36), date: todayKey(), std: ST_STD, bank: CKB.bank || 1, band: CK_BAND, grade: gradeNow(), wording: isPlain() ? 'plain' : 'faith',
    scores, unsure, reflections, flags, safety, sens, mode: CK_MODE, growthPlan: {}, type: ST_QUICK ? 'quick' : 'full', answers: ST_QUICK ? null : JSON.parse(JSON.stringify(ST_ANS)) };
  const kinds = alertKinds(entry), grown = PROF && window.GGP ? ((GGP.get(PROF.id) || {}).grown || []) : [];
  const told = kinds.length && grown.length ? `<p class="sq-flagnote">${escapeHtml(CKB.alertTold || 'A grown-up you chose will get a quiet note to check in with you. They won\'t see your answers.')}</p>` : '';
  const html = `
    <div class="results-summary">
      <div class="tree-result-wrap"><div id="client-results-tree" style="width:100%;max-width:320px;"></div></div>
      <p class="tree-caption">Each part of the tree is shaded by its score. The fuller the color, the healthier that part. Tap a part to work on it in your growth plan.</p>
      <div class="lvl-list">
        ${ALL_DOMAINS.map(d => `<div class="lvl-row" style="--domain-color:${d.color};">${partIcon(d, 20)}<b style="color:${d.color};">${d.part} <span style="font-weight:500;color:var(--ink-soft);">${d.name}</span></b><span class="lvl-pill">${stLevelLine(shown(d.key))}</span>${shown(d.key) != null && shown(d.key) < 5 ? '<p class="lvl-tend">This growing edge is where your next growth begins.</p>' : ''}</div>`).join('')}
      </div>
      ${ST_QUICK ? '<p class="tree-caption">A quick check-in asks one question for each part. Quick check-ins are compared only with other quick check-ins.</p>' : ''}
      <div class="interpretation">${interpretResults(scores, unsure)}</div>
      ${flagBoxHtml(flags, entry)}
      ${told}
      <div id="pn-life-offer" class="no-print"></div>
    </div>
    ${buildPersonalSections(scores, unsure)}
    ${lcSuggestHtml(scores, unsure)}
    <div class="reminder-banner"><p>Check in again in a few weeks. Trees grow slowly, and growth is easiest to see over time.</p></div>
    <div class="btn-row"><button class="btn btn-primary" onclick="showView('client-growthplan')">Build My Growth Plan</button></div>
    <div id="client-save-box"></div>`;
  document.getElementById('client-results-content').innerHTML = html;
  window.lastClientScores = scores;
  window.lastClientUnsure = unsure;
  window.currentClientEntry = entry;
  showView('client-results');
  renderGrowthPlanBuilder('client');
  if (PROF) {
    personalHistory.push(JSON.parse(JSON.stringify(entry))); sortEntries(personalHistory); profPersist();
    pineTeenAlert(entry);
    if (!ST_QUICK && window.GGTend) { const msg = GGTend.onFullCheckin(entry); if (msg) setTimeout(() => showToast(msg), 900); }
  }
  // Health and Ability: one quiet card after the first full check-in, at most once (gg-life.js keeps the flag in the vault).
  if (!ST_QUICK && lifeOn() && (!PROF || personalHistory.filter(e => e && !e.from && e.type !== 'quick').length === 1)) GGLife.offerCard(document.getElementById('pn-life-offer'), 'pine', { onChoose: () => reopenSettings('pn-set-life') });
  oakPrefillPlan();
  renderSaveBox();
  renderProgress();
  const goToGrowthPlanPart = key => { showView('client-growthplan'); const card = document.getElementById(`cp-card-client-${key}`); if (card) setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60); };
  mountTree('client-results-tree', { variant: 'score', scores, interactive: true, seam: '#2C1810', assemble: true }, goToGrowthPlanPart);
}

// =====================================================================
// NAVIGATION: six tabs. Each view belongs to one tab.
// =====================================================================
const VIEW_TAB = { 'client-today': 'today', 'client-intro': 'today', 'client-week': 'week', 'client-season': 'season', 'client-assess': 'season', 'client-results': 'season', 'client-progress': 'season', 'client-growthplan': 'plan', 'client-next': 'next', 'client-life': 'guides' };
function showView(id) {
  if (!document.getElementById(id)) return;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const tab = VIEW_TAB[id];
  document.querySelectorAll('#client-nav .nav-btn').forEach(b => { const on = b.getAttribute('data-tab') === tab; b.classList.toggle('active', on); if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
  if (id === 'client-next') renderNext();
  if (id === 'client-life') renderLC('client');
  if (id === 'client-growthplan') oakPlanOpen();
  if (id === 'client-today' || id === 'client-week' || id === 'client-season') { if (window.GGTend) GGTend.render(); }
  scrollToViewTop(id, false, false);
}
function goHome() { showView('client-today'); }

// App-ready: a real PDF for the share sheet, with Print as a backup.
function printGrowthPlan(sheetId) {
  const sheet = document.getElementById(sheetId);
  if (!sheet) return;
  if (!window.GGApp || !window.ggPdfFromEl) { printGrowthPlanNow(sheetId); return; }
  const guide = /lc-article/.test(sheetId), h = sheet.querySelector('h2,h1,.growth-plan-title');
  GGApp.sheet({ title: guide ? (h ? h.textContent : 'This guide') : 'Pine growth plan', file: guide ? 'pine-guide.pdf' : 'pine-growth-plan.pdf', print: () => printGrowthPlanNow(sheetId),
    blocks: () => ggPdfFromEl(sheet, { rows: '.growth-plan-domain-header', eyebrow: 'Pine by Grow With Grounded', foot: 'Pine(TM) by Grow With Grounded. growwithgrounded.com/pine' }) });
}
function printGrowthPlanNow(sheetId) {
  document.querySelectorAll('.print-target').forEach(el => el.classList.remove('print-target'));
  const sheet = document.getElementById(sheetId);
  if (!sheet) return;
  sheet.classList.add('print-target');
  window.print();
}

// =====================================================================
// WHEN LIFE CHANGES (GWG BLD 740): Pine's own guides, ported from Sequoia.
// The words live in pine/guides.js (window.PINE_GUIDES = {rings, links, topics});
// the site-wide search reads the same file. A ring with no guides yet stays
// hidden, and a small note names the rings still to come. Two views: For You
// (the teen) and For the Grown-up. Help lines are Pine's teen lines from
// pine/checkin.js (safety.lines), never another tree's.
// =====================================================================
const LC_RINGS = (window.PINE_GUIDES || {}).rings || [];
const LC_TOPICS = (window.PINE_GUIDES || {}).topics || [];
const LCS = { client: { q: '', ring: 'all', open: null, persp: 'self', find: '' } };
const lcRing = k => LC_RINGS.find(r => r.key === k) || { key: k, name: '', color: 'var(--gold)', blurb: '' };
const lcPart = k => DOMAIN_BY_KEY[k];
const lcEsc = s => escapeHtml(s == null ? '' : String(s));
const lcFilled = () => LC_RINGS.filter(r => LC_TOPICS.some(t => t.ring === r.key));
function lcMatches(t, q) {
  if (!q) return true;
  const words = (t.title + ' ' + (t.keys || '') + ' ' + (t.quick || []).join(' ')).toLowerCase().replace(/[’']/g, '').split(/[^a-z0-9]+/);
  return q.toLowerCase().replace(/[’']/g, '').split(/[^a-z0-9]+/).filter(Boolean).every(w => words.some(x => x.startsWith(w)));
}
function lcList(a) { return '<ul>' + (a || []).map(x => '<li>' + lcEsc(x) + '</li>').join('') + '</ul>'; }
function lcPartsText(t) { return (t.parts || []).map(k => lcPart(k) ? lcPart(k).part : k).join(', '); }
// The teen help lines (pine/checkin.js), shown under the guide list and at the end of every guide.
const LC_HELP_IDS = ['988', 'ctl', 'teenline', 'childhelp', 'mncrisis', '911'];
function lcHelpHtml() {
  const L = linesFor(LC_HELP_IDS);
  return `<div class="lc-help"><h3>Help any time</h3>${L.length ? linesHtml(L, true) : ''}<p class="no-print"><button type="button" class="text-btn" onclick="showCalm()">See all help lines</button></p></div><div class="no-print">${lifeLinesHtml(false)}</div>`;
}
function renderLC(mode) {
  mode = 'client';
  const st = LCS[mode], el = document.getElementById(mode + '-life');
  if (!el) return;
  if (st.open) { el.innerHTML = lcDetail(mode, LC_TOPICS.find(t => t.id === st.open)); if (st.open) return; }
  const filled = lcFilled(), waiting = LC_RINGS.filter(r => !filled.includes(r));
  if (st.ring !== 'all' && st.ring !== 'life' && !filled.some(r => r.key === st.ring)) st.ring = 'all';
  if (st.ring === 'life' && !lcLifeTopics().length) st.ring = 'all';
  el.innerHTML = `<div class="lc-head">
      <p class="eyebrow">When Life Changes</p>
      <h2 class="section-title" style="margin-top:4px">Guides for the seasons of high school</h2>
      <p class="lead"><b>How to show up.</b> Quick references and full guides for the changes high school can bring. Each guide has two views: For You, when you are the one going through it, and For the Grown-up, for a parent, guardian, coach, or other adult walking beside you. Most guides have two short videos too.</p>
    </div>
    ${LC_TOPICS.length ? `<input class="lc-search no-print" type="search" placeholder="Search: breakup, grades, sleep, a move..." aria-label="Search the guides" value="${lcEsc(st.find || '')}" oninput="lcFind(this,'${mode}')" enterkeyhint="search">
    <div class="lc-chips no-print" role="group" aria-label="Filter by topic">
      <button class="lc-chip" style="--rc:var(--ink-soft)" data-ring="all" onclick="LCS['${mode}'].ring='all';lcRenderList('${mode}')">All Topics</button>
      ${filled.map(r => `<button class="lc-chip" style="--rc:${r.color}" data-ring="${r.key}" onclick="LCS['${mode}'].ring='${r.key}';lcRenderList('${mode}')">${lcEsc(r.name)}</button>`).join('')}
      ${lcLifeTopics().length ? `<button class="lc-chip" style="--rc:${LC_LIFE.color}" data-ring="life" onclick="LCS['${mode}'].ring='life';lcRenderList('${mode}')">${lcEsc(LC_LIFE.name)}</button>` : ''}
    </div>` : ''}
    <div id="${mode}-lc-list"></div>
    ${waiting.length ? `<p class="lc-soon"><b>More guides coming.</b> Guides for ${lcEsc(lcJoin(waiting.map(r => r.name)))} are on the way.</p>` : ''}
    ${lcHelpHtml()}
    <p class="lc-note">These guides offer general spiritual and emotional guidance and support, drawn from chaplaincy and trusted youth, family, and mental health organizations. For therapy, medical care, or legal advice, they point you to the right people. In danger right now, call 911. For a crisis, call or text 988.</p>`;
  lcRenderList(mode);
  if (st.find) { const i = el.querySelector('.lc-search'); if (i) lcFind(i, mode); }
}
const LC_LIFE = { key: 'life', name: 'Health and Ability', color: '#3F6E8C', blurb: 'Living with a health condition, pain, a disability, or mental health, or caring about someone who is. Open to everyone. More guides are coming.' };
function lcLifeTopics() { return LC_TOPICS.filter(t => Array.isArray(t.life) && t.life.length); }
function lcJoin(a) { return a.length < 2 ? a.join('') : a.length === 2 ? a.join(' and ') : a.slice(0, -1).join('; ') + '; and ' + a[a.length - 1]; }
function lcRenderList(mode) {
  const st = LCS[mode];
  const box = document.getElementById(mode + '-lc-list');
  if (!box) return;
  document.querySelectorAll('#' + mode + '-life .lc-chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.ring === st.ring));
  let html = '', n = 0;
  const card = (t, col, label) => `
      <article class="lc-card" style="--rc:${col}">
        <span class="lc-label">${label || 'Hard season'}</span>
        <h4>${lcEsc(t.title)}</h4>
        ${lcList(t.quick)}
        <p class="lc-meta">Parts of the tree often affected: ${lcEsc(lcPartsText(t))}.</p>
        <button class="btn btn-secondary" onclick="lcOpen('${mode}','${t.id}')">Talking It Through</button>
      </article>`;
  const ringBlock = (r, ts, label) => `<div class="lc-ring" style="--rc:${r.color}"><h3><i></i>${lcEsc(r.name)}</h3><p>${lcEsc(r.blurb)}</p><div class="lc-grid">${ts.map(t => card(t, (lcRing(t.ring) || r).color || r.color, label)).join('')}</div></div>`;
  // Picked for You: guides tagged for the teen's Health and Ability choice, first.
  const picks = st.ring === 'all' && !st.q && lifeOn() ? GGLife.picks('pine', LC_TOPICS).map(id => LC_TOPICS.find(t => t.id === id)).filter(Boolean) : [];
  if (picks.length) html += ringBlock({ name: 'Picked for You', color: LC_LIFE.color, blurb: 'Guides that fit what you chose in Health and Ability. Every guide stays open to you.' }, picks, 'Picked for You');
  LC_RINGS.filter(r => st.ring === 'all' || r.key === st.ring).forEach(r => {
    const ts = LC_TOPICS.filter(t => t.ring === r.key && lcMatches(t, st.q));
    if (!ts.length) return;
    n += ts.length;
    html += ringBlock(r, ts);
  });
  // The Health and Ability ring: every guide tagged for any choice, open to everyone.
  if (st.ring === 'all' || st.ring === 'life') { const ts = lcLifeTopics().filter(t => lcMatches(t, st.q)); if (ts.length) { n += ts.length; html += ringBlock(LC_LIFE, ts, 'Health and Ability'); } }
  box.innerHTML = n ? html : LC_TOPICS.length ? `<div class="lc-none"><p>No guides match “${lcEsc(st.q)}.” Try another word, or browse all topics.</p></div>` : '';
}
/* Search: the same engine as the header search. Pine's guides first, then the rest of Grow With Grounded
   (kid: 'pine' keeps results written only for adults out). */
function lcFind(el, mode) {
  LCS[mode].q = ''; LCS[mode].find = el.value;
  if (!window.GGFind) return;
  GGFind(el, { here: 'pine', kid: 'pine', localType: 'talk', open: id => lcOpen(mode, id), openLabel: 'Talking It Through',
    hide: ['#' + mode + '-lc-list', '#' + mode + '-life .lc-chips', '#' + mode + '-life .lc-soon'], accent: 'var(--gold)' });
}
function lcOpen(mode, id) {
  mode = 'client';
  LCS[mode].open = id || null;
  showView(mode + '-life');
}
function lcClose(mode) { mode = 'client'; LCS[mode].open = null; renderLC(mode); scrollToViewTop(mode + '-life', true, false); }
function lcPersp(mode, p) { mode = 'client'; LCS[mode].persp = p; renderLC(mode); }
/* Practice links open Pine's own practice guide right under the name. */
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
  return GGSources.html('pine:' + t.id);
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
      <h3>Looking after yourself as the grown-up</h3><p>${lcEsc(hp.you)}</p>`;
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
      <button aria-pressed="${!self}" onclick="lcPersp('${mode}','helper')">For the Grown-up</button>
    </div>
    ${view}
    ${t.faith ? `<h3>Faith and meaning</h3><p>${lcEsc(t.faith)}</p>` : ''}
    <h3>Using Pine</h3><p>Parts of the tree this often touches: <b>${lcEsc(lcPartsText(t))}</b>. Practices that can help (tap one to see how):</p>${lcPracHtml(t)}<p>A check-in in a few weeks can show how ${self ? 'you are' : 'they are'} doing.</p>
    <h3>When to reach out for more help</h3><div class="lc-reach">${lcList(t.reach)}</div>
    ${(t.more || []).length ? `<h3>Learn more</h3><ul>${t.more.map(([n, u]) => `<li><a class="text-link" href="${lcEsc(u)}" target="_blank" rel="noopener">${lcEsc(n)}</a></li>`).join('')}</ul>` : ''}
    ${window.GGShelf ? GGShelf.html('pine', t.id) : ''}
    ${lcSourcesHtml(t)}
    ${lcHelpHtml()}
    <p class="lc-note">From When Life Changes in Pine&trade; by Grow With Grounded. General spiritual and emotional guidance and support; for therapy, medical care, or legal advice, it points you to the right people. In danger right now: 911. Crisis: call or text 988, or text HOME to 741741. &copy; ${new Date().getFullYear()} Grow With Grounded LLC. You are welcome to print this guide for personal use.</p>
  </article>`;
}
/* When Life Changes videos (GWG BLD 740): two per guide, For You and For the Grown-up, played by shared/gg-learn.js
   from pine/guide-videos.js. PN_VIDS lists the guides that have them so far (written by the build's generator).
   A quiet check shows once a video has been watched on this device (gg-learn:pine). */
/* PN_VIDS start */const PN_VIDS = ["start-hs", "grades-pressure", "adhd", "sports-cut", "path-after", "graduation", "friend-changes", "left-out", "bullying", "first-relationship", "breakup", "dating-abuse", "divorce", "stepfamily", "moving", "deployed", "family-substance", "parent-jail", "blowup", "lying", "parent-death", "friend-death", "grandparent-death", "car-crash", "loved-one-ill", "sleep", "body-image", "eating", "concussion", "chronic-illness", "substances", "anxiety", "depression", "selfharm", "suicide-thoughts", "counseling", "sextortion", "porn", "social-media", "ai-companions", "gambling", "sexual-assault", "school-threats", "first-job", "money", "faith-doubt", "faith-hurt", "purpose-service"];/* PN_VIDS end */
// Watched marks live in the unlocked profile's vault now (gg-learn.js, BLD 756), never in open storage.
function lcVidWatched(id) { try { return !!(window.GGLearn && GGLearn.watched && GGLearn.watched('pine', id)); } catch (e) { return false; } }
window.addEventListener('gg-learn-marks', () => { if (LCS.client.open && document.getElementById('client-life') && document.getElementById('client-life').classList.contains('active')) { const y = window.scrollY; renderLC('client'); window.scrollTo(0, y); } });
function lcVids(gid, self) {
  if (!PN_VIDS.includes(gid)) return '';
  const b = (side, name, pri) => { const id = 'pn-g-' + gid + '-' + side, w = lcVidWatched(id);
    return `<button type="button" class="btn ${pri ? 'btn-primary' : 'btn-secondary'}" onclick="lcWatch('${gid}','${side}')">${w ? '&#10003;' : '&#9654;'} Watch: ${name}${w ? ' <span class="lc-gv-w">Watched</span>' : ''}</button>`; };
  return `<div class="lc-gv no-print"><div class="btn-row">${b('you', 'For You', self)}${b('helper', 'For the Grown-up', !self)}</div>
    <p class="lc-gv-note">For You, if this is what you're facing. For the Grown-up, if you're walking beside a teen who is. A few minutes each, narrated aloud.</p></div>`;
}
function lcWatch(gid, side) { if (window.GGLearn) GGLearn.open('pine', 'pn-g-' + gid + '-' + side, { from: 'guide' }); }
// gg-learn's Open the Full Guide button lands here.
window.GG_GUIDE_OPEN = window.GG_GUIDE_OPEN || {};
window.GG_GUIDE_OPEN.pine = id => { if (LC_TOPICS.some(t => t.id === id)) lcOpen('client', id); };
window.addEventListener('gg-learn-close', () => { if (LCS.client.open && document.getElementById('client-life')) { const y = window.scrollY; renderLC('client'); window.scrollTo(0, y); } });
/* After a check-in: guides that touch the parts carrying the most (each Growing Edge part), two per part,
   lowest part first. A part marked Not sure yet is left out. */
function lcSuggestHtml(scores, unsure) {
  const skip = unsure || [];
  const low = PART_ORDER.filter(k => !skip.includes(k) && scores[k] != null && scores[k] < 5).sort((a, b) => scores[a] - scores[b]);
  if (!low.length || !LC_TOPICS.length) return '';
  const picks = [];
  low.forEach(k => LC_TOPICS.filter(t => (t.parts || []).includes(k) && !picks.includes(t)).slice(0, 2).forEach(t => picks.push(t)));
  if (!picks.length) return '';
  const crisis = scores.fruit <= 2 && !skip.includes('fruit') ? `<p><b>If you are having thoughts of ending your life, call or text 988 now, or text HOME to 741741. In danger right now, call 911.</b></p>` : '';
  return `<div class="lc-suggest no-print"><h3>When Life Changes</h3>
    <p>Some parts of your tree are carrying a lot right now. These guides may help you find words and next steps.</p>
    ${crisis}<div class="lc-links">${picks.map(t => `<button type="button" onclick="lcOpen('client','${t.id}')">${lcEsc(t.title)}</button>`).join('')}<button type="button" onclick="lcOpen('client',null)">Browse all guides</button></div></div>`;
}

// =====================================================================
// THE GAME LAYER (decision 14): mastery, tree levels, milestones, the balance
// bonus, Steady or Hardy, and the 14-day pause. Never streaks, never shame,
// never random rewards, never anything taken away. Saved in tend.pn.
// =====================================================================
const KIND_WORDS = [
  'Nice. Small and steady is how a pine grows.',
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
const TREE_LEVELS = [[0, 'Seed'], [1, 'Sprout'], [7, 'Seedling'], [21, 'Sapling'], [45, 'Young Pine'], [90, 'Tall Pine'], [180, 'Old Growth']];
const HARDY_DAYS = 10;
const MILES = [
  ['day1', 'First Day Tended', 'You tended your tree for the first time.'],
  ['six', 'All Six in a Day', 'You tended every part of your tree in one day.'],
  ['week', 'First Full Week', 'You tended your tree all seven days of a week.'],
  ['balance', 'First Balanced Week', 'You tended all six parts in one week.'],
  ['mine', 'First Practice That\'s Yours', 'A practice moved all the way to Mine.'],
  ['ring', 'First Ring', 'You finished a whole season and added a ring.']
];
const pd = s => String(s).split('-').map(Number);
const dOf = s => { const p = pd(s); return new Date(p[0], p[1] - 1, p[2]); };
const keyOf = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const addD = (s, n) => { const d = dOf(s); d.setDate(d.getDate() + n); return keyOf(d); };
const mondayOf = s => { const d = dOf(s); return addD(s, -((d.getDay() + 6) % 7)); };
function sTended(s, k) { const x = (s.days || {})[k]; return !!(x && ((x.d && x.d.length) || (x.a && x.a.length))); }
function pnRec(s) { if (!s.pn || typeof s.pn !== 'object') s.pn = { miles: {}, bal: {} }; s.pn.miles = s.pn.miles || {}; s.pn.bal = s.pn.bal || {}; return s.pn; }
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
function pnMode(s) { return (s && s.pn && s.pn.mode) === 'hardy' ? 'hardy' : 'steady'; }
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
    + setupCardHtml() + bringOakHtml() + movingOnHtml(true);
}
function itemTagHtml(key, name, s) { const m = masteryOf(masteryCount(s, key, name)); return m ? ` <span class="pn-mastery pn-m-${m.toLowerCase()}">${m}</span>` : ''; }
function partNoteHtml(key, s) { const n = hardyDays(s, key); return n ? `<p class="pn-trouble">Needles browning: ${n} days since this part was tended. One practice today heals it.</p>` : ''; }
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
  const full = (list || []).filter(e => e && e.scores && !e.from && e.type !== 'quick' && e.band === bandNow()).slice(-8);
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
  return `<div class="sq-graph-box"><h4>Your Parts Over Time</h4><p class="gt-small">One point for each full Pine check-in in ${escapeHtml(bandName(bandNow()).toLowerCase())}, oldest on the left. The dashed lines mark Steady and Strong.</p>${rows}</div>`;
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
// A CARD FROM A Pine GUIDE VISIT (GWG BLD 746)
// A Guide's QR code or link (GGApp.visit, /shared/gg-app.js) carries only a first
// name, the date, the strong parts, and what the person chose to try. Never levels,
// notes, safety answers, the optional question, or anyone else's name. It asks
// before saving, then lives in the person's own locked profile, as visitCards in
// the pine record, shows on Today, and can be removed any time.
// =====================================================================
let VC_ASKED = null;   // whose tree the waiting card last asked about ('' for no one), so it asks once per person
function vcHelping() { return false; }
function vcRec() { return PROF && window.GGP && GGP.isOpen(PROF.id) ? GGP.data(PROF.id, 'pine') : null; }
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
  const intro = `<p>${v.n ? escapeHtml(v.n) + ', here' : 'Here'} is a card from your Pine Guide visit on ${escapeHtml(formatDate(v.d))}: your strong parts and what you chose to try. It goes on your own tree, kept in your own locked profile.</p>
    <p class="ggx-small">You can remove it any time.</p>`;
  const drop = { t: "Don't Add It", kind: 'quiet', fn: () => { GGApp.visit.clear(); showToast('The card was not added.'); } };
  const later = { t: 'Not Now', kind: 'line', fn: () => {} };
  if (!PROF) {
    GGApp.dialog({ title: 'A card from your visit', html: intro + '<p>Open your profile first, and this card will ask again.</p>',
      buttons: [{ t: 'Open My Profile', kind: 'main', fn: () => { if (window.GGP) pnOpenAny(); } }, later, drop] });
    return;
  }
  const first = String(PROF.name || '').trim().split(/\s+/)[0].toLowerCase(), other = !!(v.n && first && first !== v.n.toLowerCase());
  GGApp.dialog({ title: 'A card from your visit', html: intro + `<p>Add it to ${escapeHtml(PROF.name)}'s tree?</p>` + (other ? `<p class="ggx-small">This card is for ${escapeHtml(v.n)}. If ${escapeHtml(v.n)} has a profile on this device, choose Switch Person.</p>` : ''),
    buttons: [{ t: 'Add to My Tree', kind: 'main', fn: vcAdd }].concat(other ? [{ t: 'Switch Person', kind: 'line', fn: () => { VC_ASKED = null; pnSwitch(); } }] : [], [later, drop]) });
}
window.addEventListener('gg-visit', () => vcCheck(true));

const TEND_CFG = {
  libAge: () => 'pine',
  profileId: () => PROF ? PROF.id : null,
  tool: 'pine', toolName: 'Pine',
  els: { today: 'client-today', week: 'client-week', season: 'client-season' },
  parts: ALL_DOMAINS.map(d => ({ key: d.key, part: d.part, name: d.name, color: d.color })),
  moveKey: 'leaves',
  journey: ((window.GGJourney || {}).AGES || {}).pine,
  showStory: false,
  // Reflections stay private: in Pine a grown-up never opens the teen's profile (decision 4).
  shareRefl: false,
  plain: () => isPlain(),
  tree: { shape: 'layered', fruit: 'cone', fruitColor: '#8A5A2B', trunk: '#6E4524', trunkBare: '#5A4636',
    pal: [['#2C5527', '#4A8040', '#78AB64'], ['#4E5A33', '#6E7A48', '#A3AC78'], ['#4F4A30', '#6E6644', '#958B62']] },
  partIcon: key => partIcon(DOMAIN_BY_KEY[key], 22),
  questions: () => QUESTIONS,
  answers: Q_OPTS,
  weekStem: 'This past week, how often have you...',
  practiceInfo: (key, name) => {
    const d = DOMAIN_BY_KEY[key], r = d && d.restore.find(x => x[0] === name), g = GUIDES[key + '|' + name], pl = plainOf(key, name), gg = Object.assign({}, g || {}, (pl && pl.g) || {});
    const ad = lifeFits(key, name) ? lifeTags(key, name).adapt : '';
    return { desc: r ? shownLine(key, name, r[1]) : '', guide: guideHtml(key, name), hard: ad || (g ? (gg.adapt || gg.hard) : '') };
  },
  history: () => (personalHistory || []).filter(e => e && !e.from),
  hasResults: () => !!window.currentClientEntry,
  toast: m => showToast(m),
  profileHtml: () => pnProfileHtml(),
  extraSettings: () => pnSettingsHtml(),
  lockedHtml: () => pineWho().length ? `<div class="gt-card gt-empty"><h2>Your tree grows in your profile</h2><p>${pineWho().length > 1 ? 'Choose your picture above, then enter your passcode.' : 'Open your profile above to see your tree and today\'s practices.'} Each person's tree stays locked in their own profile on this device.</p></div>` : `<div class="gt-card gt-empty"><h2>Your tree grows in your profile</h2><p>Daily tending is saved inside a private Grounded profile on this device, locked with a passcode only you know. A grown-up agrees when it is made, and only your passcode opens it.</p><div class="btn-row"><button class="btn btn-primary" onclick="profCreateDialog()">Create my profile</button><button class="btn btn-secondary" onclick="startCheckin()">Try a check-in first</button></div></div>`,
  todayExtra: s => vcTodayHtml() + todayKindHtml(s),
  seasonExtra: s => seasonExtraHtml(s),
  itemTag: (key, name, s) => itemTagHtml(key, name, s),
  partNote: (key, s) => partNoteHtml(key, s),
  pause: () => pnPause(),
  pauseLine: 'Your tree is holding still with you. It stays in the light while you get support.',
  onCheck: (done, key, s, parts) => onCheckGame(done, key, s, parts),
  store: {
    get: () => { if (!PROF || !window.GGP || !GGP.isOpen(PROF.id)) return null; const d = GGP.data(PROF.id, 'pine'); if (!d.tend || typeof d.tend !== 'object') d.tend = {}; return d.tend; },
    save: () => (PROF && window.GGP) ? GGP.save(PROF.id) : Promise.resolve()
  },
  actions: {
    fullCheckin: () => startCheckin(), quickCheckin: () => startQuick(),
    results: () => showView('client-results'), progress: () => showView('client-progress'),
    plan: () => showView('client-growthplan'), about: () => showView('client-intro'),
    createProfile: () => profCreateDialog(), openProfile: () => pnOpenAny(),
    lock: () => profLock(), textSize: () => cycleTextSize()
  }
};
if (window.GGTend) GGTend.init(TEND_CFG);
// Health and Ability changed (or the profile did): re-order the plan builder (keeping what is checked),
// the guides, and Today. Nothing about the choice is ever written outside the vault.
function lifeRefresh() {
  const doc = document.getElementById('client-growthplan-doc');
  if (window.lastClientScores && document.querySelector('#client-growthplan-builder .domain-card') && !(doc && doc.innerHTML.trim())) {
    const keep = collectGrowthPlan('client'); renderGrowthPlanBuilder('client');
    ALL_DOMAINS.forEach(d => { const p = keep[d.key] || {}, on = new Set(p.selected || []); document.querySelectorAll(`input[name="cp-client-${d.key}"]`).forEach(c => { c.checked = on.has(c.value); }); const cu = document.getElementById(`cp-client-${d.key}-custom`); if (cu) cu.value = p.custom || ''; oakRotApply('client', d.key); });
    const b = document.querySelector('#client-growthplan-builder .domain-card'); if (b) b.dataset.filled = '1';
  }
  const lc = document.getElementById('client-life'); if (lc && lc.classList.contains('active')) renderLC('client');
}
if (window.GGLife) GGLife.on(() => lifeRefresh());
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
// EARLIER RINGS: from Oak (a one-time copy) and from Aspen (read in place)
// Kept, labeled earlier, and never compared with Pine rings.
// =====================================================================
function bringOakHtml() {
  if (!PROF || !window.GGP) return '';
  const oak = GGP.data(PROF.id, 'oak'), r = rec();
  const n = ((oak && oak.history) || []).filter(e => e && e.scores).length;
  if (!n || r.oakBrought) return '';
  return `<div class="gt-card sq-bring"><h3>Bring My Oak Check-ins</h3><p>You have ${n} check-in${n === 1 ? '' : 's'} saved in Oak. Copy them here so Pine shows your whole story, labeled From Oak. Oak keeps its own copy.</p><div class="btn-row"><button class="btn btn-primary btn-sm" onclick="bringOak()">Bring Them Here</button><button class="btn btn-secondary btn-sm" onclick="bringOak(true)">Not Now</button></div></div>`;
}
function bringOak(skip) {
  if (!PROF || !window.GGP) return;
  const oak = GGP.data(PROF.id, 'oak'), r = rec();
  let n = 0;
  if (!skip) {
    const ids = new Set(personalHistory.map(e => e.id));
    ((oak && oak.history) || []).forEach(e => { if (e && e.scores && !ids.has('oak-' + e.id) && !ids.has(e.id)) { const c = JSON.parse(JSON.stringify(e)); c.id = 'oak-' + (e.id || e.date); c.from = 'oak'; personalHistory.push(c); n++; } });
    sortEntries(personalHistory);
  }
  r.oakBrought = todayKey();
  profPersist().then(() => { showToast(skip ? 'You can bring them any time from Settings.' : n ? 'Your Oak check-ins are here now, labeled From Oak.' : 'Nothing new to bring.'); if (window.GGTend) GGTend.render(); renderProgress(); });
}
// A teen who moved up from Aspen keeps Aspen's rings in the same profile. Pine shows
// the ones on the standard as earlier rings, labeled From Aspen. Nothing is copied.
function aspenRings() {
  if (!PROF || !window.GGP || !GGP.isOpen(PROF.id)) return [];
  const a = GGP.data(PROF.id, 'aspen'), st = a && a.student;
  return ((st && st.rings) || []).filter(r => r && r.answers && r.std).map(r => {
    const scores = {}, unsure = [];
    PART_ORDER.forEach(k => { const v = ((r.answers || {})[k] || {}).score; if (typeof v === 'number') scores[k] = v; else { scores[k] = 5; unsure.push(k); } });
    return { id: 'aspen-' + r.id, date: String(r.date || '').slice(0, 10), from: 'aspen', grade: r.grade, scores, unsure, type: 'full' };
  });
}
const FROM_NAME = { oak: 'From Oak', aspen: 'From Aspen' };

// =====================================================================
// PROFILES: Grounded profiles, shared by every page (/shared/gg-profiles.js)
// Pine opens High school profiles (age "pine") only. Kids, middle schoolers,
// and adults are pointed to their own trees.
// =====================================================================
function profSync() {
  const a = window.GGP && GGP.active();
  if (a && a.age === 'pine') {
    const d = (PROF = { id: a.id, name: a.name, avatar: a.avatar, age: a.age }, rec());
    window.personalHistory = d.history.slice(); personalHistory = window.personalHistory;
    window.personalFileLoaded = true;
  } else if (PROF) {
    PROF = null;
    window.personalHistory = []; personalHistory = window.personalHistory;
    window.personalFileLoaded = false; window.currentClientEntry = null; window.lastClientScores = null;
  }
  loadBank();
  renderProfileBar(); renderSaveBox(); renderProgress(); renderAboutParts();
  if (window.GGTend) GGTend.render();
  if (document.getElementById('client-growthplan').classList.contains('active')) oakPlanOpen();
  if (document.getElementById('client-next').classList.contains('active')) renderNext();
}
async function profPersist() {
  if (!PROF || !window.GGP) return;
  rec().history = JSON.parse(JSON.stringify(personalHistory));
  await GGP.save(PROF.id);
}
function profLock() { if (window.GGP) GGP.lock().then(() => showToast('Locked. Your profile is safe on this device.')); }
const OTHER_TREE = { maple: '<a href="/maple/">Maple</a> is made for kids.', aspen: '<a href="/aspen/">Aspen</a> is made for middle schoolers.', adult: '<a href="/birch/">Birch</a> is made for young adults, 18 to 26, <a href="/oak/">Oak</a> for adults, 25 to 60, and <a href="/sequoia/">Sequoia</a> for older adults, 60 and up.' };
function renderProfileBar() {
  const bar = document.getElementById('st-profile-bar'); if (!bar) return;
  const a = window.GGP && GGP.active();
  if (a && a.age !== 'pine') {
    bar.innerHTML = `<div class="pbar"><div class="pbar-who"><strong>${escapeHtml(a.name)}</strong><span>Pine is made for high schoolers. ${OTHER_TREE[a.age] || OTHER_TREE.adult}</span></div><div class="pbar-act"><button type="button" class="btn btn-secondary btn-sm" onclick="pnSwitch()">Switch person</button></div></div>`;
    return;
  }
  if (PROF) {
    const t = new Date(a.until).toLocaleString(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit' });
    bar.innerHTML = `<div class="pbar"><button type="button" class="pbar-pic" onclick="GGTend.openSettings()" aria-label="Profile and Settings">${GGAv.html(a.avatar, a.name, 44)}</button>
      <div class="pbar-who"><strong>${escapeHtml(a.name)}</strong><span>${gradeNow() ? 'Grade ' + escapeHtml(gradeNow()) + '. ' : ''}Saving to your own profile on this device. Unlocked until ${t}.</span></div>
      <div class="pbar-act"><button type="button" class="btn btn-secondary btn-sm" onclick="GGTend.openSettings()">Settings</button><button type="button" class="btn btn-secondary btn-sm" onclick="profLock()">Lock</button></div></div>`;
  } else {
    bar.innerHTML = `<div class="pbar pbar-off">${pineWhoHtml()}</div>`;
  }
}
/* Who's tending today? Every high schooler on this device keeps their own tree in their
   own locked profile. One skips the list and goes straight to their passcode. */
function pineWho() { return window.GGP ? GGP.list().filter(p => p.age === 'pine').sort((a, b) => String(a.name).localeCompare(String(b.name))) : []; }
function pineOthers() { return window.GGP ? GGP.list().filter(p => p.age !== 'pine') : []; }
function pineWhoHtml() {
  const teens = pineWho(), others = pineOthers();
  const otherLine = others.length ? `<p class="pbar-kids">Kids, middle schoolers, and adults tend their trees in <a href="/maple/">Maple</a>, <a href="/aspen/">Aspen</a>, <a href="/oak/">Oak</a>, and <a href="/sequoia/">Sequoia</a>.</p>` : '';
  if (!teens.length) return `<div class="pbar-who"><strong>Save your progress on this device</strong><span>Create your own private profile, locked with a passcode only you know. A grown-up agrees when it is made, and only your passcode opens it.</span></div>
      <div class="pbar-act"><button type="button" class="btn btn-primary btn-sm" onclick="profCreateDialog()">Create my profile</button><button type="button" class="btn btn-secondary btn-sm" onclick="GGTend.openSettings()">Settings</button></div>${otherLine}`;
  if (teens.length === 1) { const a = teens[0];
    return `<div class="pbar-who"><strong>Welcome back${a.name ? ', ' + escapeHtml(a.name) : ''}</strong><span>Open your profile to see your tree and today's practices.</span></div>
      <div class="pbar-act"><button type="button" class="btn btn-primary btn-sm" onclick="pnOpenWho(0)">Open my profile</button><button type="button" class="btn btn-secondary btn-sm" onclick="profCreateDialog()">Add a person</button></div>${otherLine}`; }
  return `<div class="pbar-who"><strong>Who's tending today?</strong><span>Tap your picture, then enter your passcode. Each person's tree stays locked in their own profile.</span></div>
    <div class="oak-people">${teens.map((a, i) => `<button type="button" class="oak-person" onclick="pnOpenWho(${i})">${GGAv.html(a.avatar, a.name, 56)}<b>${escapeHtml(a.name)}</b></button>`).join('')}
      <button type="button" class="oak-person oak-add" onclick="profCreateDialog()"><span class="oak-plus" aria-hidden="true">+</span><b>Add a person</b></button></div>${otherLine}`;
}
function pnOpenWho(i) {
  const a = pineWho()[i]; if (!a || !window.GGP) return;
  GGP.openDialog({ id: a.id }).then(ok => { if (ok && window.currentClientEntry) setTimeout(savePersonalFile, 50); });
}
function pnOpenAny() {
  const n = pineWho().length;
  if (n === 1) { pnOpenWho(0); return; }
  if (!n) { profCreateDialog(); return; }
  const b = document.getElementById('st-profile-bar'); if (b) b.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function pnSwitch() {
  if (!window.GGP) return;
  if (window.GGTend) GGTend.closeSettings();
  GGP.lock().then(() => { showToast('Locked. Choose who is tending.'); const b = document.getElementById('st-profile-bar'); if (b) b.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
}
function profCreateDialog() {
  if (!window.GGP) return;
  const carry = {};
  if (LOCAL.grade || LOCAL.wording) carry.pine = { grade: LOCAL.grade, wording: LOCAL.wording };
  GGP.createDialog({ age: 'pine', carry: Object.keys(carry).length ? carry : null, reason: window.currentClientEntry ? 'Your check-in and growth plan will save to your own profile, locked with a passcode only you know. A grown-up agrees when it is made.' : 'Your own profile keeps your tree, practices, check-ins, and Next Steps on this device, locked with a passcode only you know. A grown-up agrees when it is made, and only your passcode opens it.' })
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
// What a grown-up can see (decision 4), Aspen's promise rewritten for high school.
const PN_SEE = `<p><b>A quiet note, only when it matters</b>If a check-in shows you might be thinking about not wanting to be alive, feeling alone, or losing hope, a grown-up who agreed to your profile gets a quiet note in The Grove to check in with you. The note never says what you answered.</p>
  <p><b>The big picture, only while you leave it on</b>Days tended, rings, and which parts you tended, through The Grove. You can turn this off any time with Show my growth on The Grove.</p>
  <p><b>Just yours</b>Every answer, your levels, your notes, your faith answers, your optional questions, your reflections, and your Next Steps notebook. If you say someone is hurting you, that stays with you too, and Pine shows you help from outside your home. Only your passcode opens your profile. A grown-up can help reset a forgotten passcode, but can never read what is inside.</p>`;
function pnProfileHtml() {
  const a = window.GGP && GGP.active();
  if (!a || a.age !== 'pine') return `<section><h3>Your Profile</h3><p>Open your profile, or create one, to keep your tree, practices, check-ins, and Next Steps on this device.</p><div class="btn-row"><button class="btn btn-primary btn-sm" onclick="GGTend.closeSettings();pnOpenAny()">Open my profile</button><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();profCreateDialog()">Create my profile</button></div></section>`;
  const oakN = (((GGP.data(a.id, 'oak') || {}).history) || []).length;
  return `<section><h3>Your Profile</h3><p class="gt-who">${GGAv.html(a.avatar, a.name, 44)}<b>${escapeHtml(a.name)}</b> <span class="gt-small">${gradeNow() ? 'Grade ' + escapeHtml(gradeNow()) : 'Grade not set'}</span></p>
    <div class="btn-row"><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();askGrade(true)">Change grade</button><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();GGP.manage()">Picture, passcode, and more</button><button class="btn btn-secondary btn-sm" onclick="pnSwitch()">Switch person</button><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();profLock()">Lock</button></div>
    ${oakN && !rec().oakBrought ? `<p class="gt-small">You have ${oakN} check-in${oakN === 1 ? '' : 's'} in Oak. <button type="button" class="text-btn" onclick="GGTend.closeSettings();bringOak()">Bring them into Pine</button></p>` : ''}
    <p class="gt-small">Everyone on this device can have their own tree. Switching locks yours first, so no one sees anyone else's.</p></section>`;
}
function pnSettingsHtml() {
  const s = window.GGTend && GGTend.state(), open = !!PROF, plain = isPlain(), mode = pnMode(s);
  Promise.resolve().then(mountLifeChooser);
  return `<section id="pn-set-wording"><h3>Faith or Plain Wording</h3><p class="gt-small">Faith wording names God, prayer, and faith as one door among several. Plain wording asks the same things without religious words. Your scores never change between the two.</p>
      <label class="gt-radio"><input type="radio" name="pn-word" value="faith"${!plain ? ' checked' : ''} onchange="setWording('faith')"><span><b>Faith</b>Prayer, worship, quiet, nature, and family traditions.</span></label>
      <label class="gt-radio"><input type="radio" name="pn-word" value="plain"${plain ? ' checked' : ''} onchange="setWording('plain')"><span><b>Plain</b>Peace, values, quiet, nature, and family traditions.</span></label></section>
    <section id="pn-set-sens"><h3>Optional Questions</h3><p class="gt-small">Two extra questions: one about pressure to vape, drink, or use drugs to cope, and one about pressure or control from someone you are close to. They never count toward a score, never send a note to anyone, and are never shared. Only you can turn them on.</p>
      <label class="gt-switch"><input type="checkbox"${sensOn() ? ' checked' : ''}${open ? '' : ' disabled'} onchange="setSens(this.checked)"> Ask me the optional questions</label></section>
    <section id="pn-set-life"><div id="pn-life-host"><h3>Health and Ability</h3></div></section>
    <section id="pn-set-game"><h3>Your Tree: Steady or Hardy</h3>${hardyRests() ? '<p class="gt-small"><b>Steady fits best right now.</b> It stays gentle on hard weeks, and nothing is ever lost. Rest Week on Today holds your tree still any time.</p>' : ''}
      <label class="gt-radio"><input type="radio" name="pn-mode" value="steady"${mode === 'steady' ? ' checked' : ''}${s ? '' : ' disabled'} onchange="setPnMode('steady')"><span><b>Steady</b>The gentle tree. It may rest in a soft mist when you miss days, and nothing is ever lost.</span></label>
      <label class="gt-radio"><input type="radio" name="pn-mode" value="hardy"${mode === 'hardy' ? ' checked' : ''}${s ? '' : ' disabled'} onchange="setPnMode('hardy')"><span><b>Hardy</b>${hardyRests() ? `Here whenever you want it. A part of your plan left untended for ${HARDY_DAYS} days shows trouble, and one practice in that part heals it.` : `A little more challenge. A part of your plan left untended for ${HARDY_DAYS} days shows trouble, and one practice in that part heals it.`}</span></label>
      <p class="gt-small">No streaks to lose and no leaderboards. After a hard check-in, the tree holds still for two weeks either way.</p></section>
    <section class="asp-see" id="pn-see"><h3>What Your Grown-up Can See</h3>${PN_SEE}</section>
    ${movingOnHtml(false)}`;
}
function reopenSettings(focus) { if (window.GGTend) { GGTend.openSettings(); const f = document.getElementById(focus); if (f) f.scrollIntoView({ block: 'start' }); } }
function setWording(w) {
  rec().wording = w === 'plain' ? 'plain' : 'faith';
  persistRec().then(() => {
    loadBank(); renderAboutParts();
    if (window.lastClientScores) { renderGrowthPlanBuilder('client'); const b = document.querySelector('#client-growthplan-builder .domain-card'); if (b) delete b.dataset.filled; oakPrefillPlan(); }
    if (window.GGTend) GGTend.render();
    if (document.getElementById('client-next').classList.contains('active')) renderNext();
    showToast(w === 'plain' ? 'Plain wording is on. Your scores stay the same.' : 'Faith wording is on. Your scores stay the same.');
  });
}
function setSens(on) {
  if (!PROF) return;
  rec().askSens = !!on;
  persistRec().then(() => showToast(on ? 'The optional questions will be in your next full check-in.' : 'The optional questions are off.'));
}
// First open: set Pine up together (decision 8). The grown-up who agreed and the teen
// choose the wording, the teen chooses the grade, and both read what stays private.
function setupCardHtml() {
  if (!PROF) return '';
  const r = rec(); if (r.setup) return '';
  const G = CKB.grades || [['9', 'Grade 9'], ['10', 'Grade 10'], ['11', 'Grade 11'], ['12', 'Grade 12']], plain = isPlain();
  return `<div class="gt-card pn-setup" id="pn-setup"><h2>Set Up Pine Together</h2><p>Welcome to Pine. If the grown-up who agreed to your profile is with you, choose these together. You can change them any time in Settings.</p>
    <h4 class="sq-h4">Your Grade</h4><div class="pn-grades">${G.map(g => `<button type="button" class="btn btn-sm ${gradeNow() === g[0] ? 'btn-primary' : 'btn-secondary'}" aria-pressed="${gradeNow() === g[0]}" onclick="setupPick('grade','${g[0]}')">${escapeHtml(g[1])}</button>`).join('')}</div>
    <h4 class="sq-h4">Wording</h4><div class="pn-grades"><button type="button" class="btn btn-sm ${!plain ? 'btn-primary' : 'btn-secondary'}" aria-pressed="${!plain}" onclick="setupPick('wording','faith')">Faith</button><button type="button" class="btn btn-sm ${plain ? 'btn-primary' : 'btn-secondary'}" aria-pressed="${plain}" onclick="setupPick('wording','plain')">Plain</button></div>
    <p class="gt-small">Faith wording names God, prayer, and faith as one door among several. Plain wording asks the same things without religious words. Scores are the same either way.</p>
    <details class="pn-see-d"><summary>What your grown-up can see</summary>${PN_SEE}</details>
    <div class="btn-row"><button class="btn btn-primary btn-sm" onclick="setupDone()">All Set</button></div></div>`;
}
function setupPick(what, v) {
  const r = rec(); if (what === 'grade') r.grade = v; else r.wording = v === 'plain' ? 'plain' : 'faith';
  persistRec().then(() => { loadBank(); renderAboutParts(); renderProfileBar(); if (window.GGTend) GGTend.render(); const c = document.getElementById('pn-setup'); if (c) c.scrollIntoView({ block: 'nearest' }); });
}
function setupDone() {
  const r = rec(); if (!r.wording) r.wording = 'faith';
  r.setup = todayKey();
  persistRec().then(() => { if (window.GGTend) GGTend.render(); showToast(gradeNow() ? 'Pine is ready. Start with a check-in.' : 'Pine is ready. Pine will ask your grade at your first check-in.'); });
}
// Moving on (decision 10; Start My Birch, GWG BLD 742). In grade 12, or any time from
// Settings: stay in Pine, or Start My Birch, which makes a new adult profile with Birch,
// built for ages 18 to 26, as its tree, and copies Pine's rings (labeled From Pine), the
// Next Steps notebook (into Groundwork's From Pine chapter), and the Faith or Plain choice.
// Pine's own record stays whole. Never forced. Start My Oak stays as a smaller second
// choice for anyone who prefers Oak.
function movingOnHtml(onToday) {
  if (!PROF) return '';
  const r = rec();
  if (onToday && (gradeNow() !== '12' || r.stayPine)) return '';
  return `<${onToday ? 'div class="gt-card pn-moving"' : 'section id="pn-set-moving"'}><h3>Turning 18, or Finishing High School?</h3>
    <p class="gt-small">${onToday ? 'You are in grade 12. ' : ''}You choose what comes next. Stay in Pine as long as it fits, or start your own adult tree in Birch, built for ages 18 to 26. Start My Birch makes a new profile for you as an adult, and brings your Pine check-ins (labeled From Pine), your Next Steps notebook, and your Faith or Plain choice with you. Pine keeps its own copy.</p>
    <div class="btn-row"><button class="btn btn-primary btn-sm" onclick="${onToday ? '' : 'GGTend.closeSettings();'}startMyBirch()">Start My Birch</button>${onToday ? '<button class="btn btn-secondary btn-sm" onclick="stayInPine()">Stay in Pine</button>' : ''}</div>
    <p class="gt-small">Prefer Oak, built for adults 25 to 60? <button type="button" class="text-btn" onclick="${onToday ? '' : 'GGTend.closeSettings();'}startMyOak()">Start My Oak instead</button></p></${onToday ? 'div' : 'section'}>`;
}
function stayInPine() { rec().stayPine = todayKey(); persistRec().then(() => { showToast('Pine stays your tree. Start My Birch is in Settings whenever you want it.'); if (window.GGTend) GGTend.render(); }); }
function pineCarry() {
  const r = rec();
  const rings = (r.history || []).filter(e => e && e.scores && !e.from).map(e => { const c = JSON.parse(JSON.stringify(e)); c.id = 'pine-' + e.id; c.from = 'pine'; delete c.std; delete c.answers; delete c.safety; delete c.sens; delete c.flags; delete c.reflections; return c; });
  const ns = r.nextsteps && r.nextsteps.answers && Object.keys(r.nextsteps.answers).length ? JSON.parse(JSON.stringify(r.nextsteps)) : null;
  return { rings, ns, wording: r.wording === 'plain' ? 'plain' : 'faith' };
}
function startMyBirch() {
  if (!PROF || !window.GGP) return;
  if (!confirm('Start My Birch makes a new adult profile for you, with Birch as your tree. You agree to the terms yourself, so you need to be 18 or older. Your Pine profile stays as it is. Continue?')) return;
  const name = PROF.name, c = pineCarry();
  const birch = { history: c.rings, wording: c.wording, pineCopied: todayKey() };
  if (c.ns) birch.groundwork = { answers: {}, opened: {}, skills: {}, fromPine: { answers: c.ns.answers || {}, opened: c.ns.opened || {}, from: 'pine', copied: todayKey() } };
  GGP.createDialog({ age: 'adult', tree: 'birch', name: '', carry: { birch }, reason: 'Your new adult profile, ' + name + '. Pick a name that is different from your Pine profile, like your name with a last initial. Your Pine check-ins, Next Steps notebook, and wording come along into Birch.',
    onCreated: id => { try { if (id && GGP.setTree && GGP.tree(id) !== 'birch') GGP.setTree(id, 'birch'); } catch (e) {} setTimeout(() => { location.href = '/birch/'; }, 600); } });
}
function startMyOak() {
  if (!PROF || !window.GGP) return;
  if (!confirm('Start My Oak makes a new adult profile for you in Oak, built for adults 25 to 60. You agree to the terms yourself, so you need to be 18 or older. Your Pine profile stays as it is. Continue?')) return;
  const name = PROF.name, c = pineCarry();
  const oak = { history: c.rings }; if (c.ns) oak.nextsteps = Object.assign(c.ns, { from: 'pine', copied: todayKey() });
  GGP.createDialog({ age: 'adult', name: '', carry: { oak }, reason: 'Your new adult profile, ' + name + '. Pick a name that is different from your Pine profile, like your name with a last initial. Your Pine check-ins and Next Steps notebook come along.', onCreated: () => { setTimeout(() => { location.href = '/oak/'; }, 600); } });
}

// =====================================================================
// NEXT STEPS (decision 13): a private notebook for goals, values, and plans
// after high school. Chapters and prompts come from /pine/nextsteps.js. Saved
// locked in the teen's profile under pine.nextsteps; every prompt can be
// skipped; the faith and meaning chapter stays closed until the teen opens it;
// printed or shared only when the teen chooses. Never in Share to Family.
// =====================================================================
const NS = window.PINE_NEXTSTEPS || { chapters: [], intro: [] };
const NX = { ch: null, edit: null, pick: false };
function nsRec() {
  if (!PROF || !window.GGP || !GGP.isOpen(PROF.id)) return null;
  const d = rec(); if (!d.nextsteps || typeof d.nextsteps !== 'object') d.nextsteps = {};
  if (!d.nextsteps.answers) d.nextsteps.answers = {}; if (!d.nextsteps.opened) d.nextsteps.opened = {};
  return d.nextsteps;
}
const nsChapter = id => (NS.chapters || []).find(c => c.id === id);
const nsT = (c, k) => (isPlain() && c['plain' + k[0].toUpperCase() + k.slice(1)]) || c[k] || '';
const nsP = p => (isPlain() && p.plain) || p.t;
const nsHelp = p => (isPlain() && p.plainHelp) || p.help || '';
function nsWritten(c, L) { return (c.prompts || []).filter(p => L.answers[p.id] && String(L.answers[p.id].text || '').trim()).length; }
function renderNext() {
  const el = document.getElementById('client-next'); if (!el) return;
  const L = nsRec();
  if (!L) {
    el.innerHTML = `<div class="section-title">Next Steps</div>${(NS.intro || []).slice(0, 3).map(t => `<p class="lead">${escapeHtml(t)}</p>`).join('')}
      <div class="gt-card gt-empty"><h2>Your notebook is kept in your profile</h2><p>Next Steps is saved inside your own profile on this device, locked with a passcode only you know, so no one else can read it.</p><div class="btn-row"><button class="btn btn-primary" onclick="${pineWho().length ? 'pnOpenAny()' : 'profCreateDialog()'}">${pineWho().length ? 'Open my profile' : 'Create my profile'}</button></div></div>`;
    return;
  }
  const c = NX.ch && nsChapter(NX.ch);
  if (c) { el.innerHTML = nsChapterHtml(c, L); return; }
  const total = (NS.chapters || []).reduce((t, ch) => t + nsWritten(ch, L), 0);
  el.innerHTML = `<div class="section-title">Next Steps</div>
    ${(NS.intro || []).map(t => `<p class="lead">${escapeHtml(t)}</p>`).join('')}
    <p class="sq-legcount">${total ? `${total} ${total === 1 ? 'page' : 'pages'} written so far.` : 'Nothing written yet. One prompt is enough to start.'}</p>
    <div class="sq-chapters">${(NS.chapters || []).map(ch => { const n = nsWritten(ch, L), closed = ch.optIn && !L.opened[ch.id];
      return `<button type="button" class="sq-chapter${closed ? ' closed' : ''}" onclick="nsOpen('${ch.id}')"><b>${escapeHtml(nsT(ch, 'title'))}</b><span>${closed ? 'Opens only when you choose' : n ? n + ' of ' + (ch.prompts || []).length + ' written' : (ch.prompts || []).length + ' prompts'}</span></button>`; }).join('')}</div>
    <div class="btn-row"><button class="btn btn-primary" onclick="nsPickBook()">Save or Print My Notebook</button></div>
    ${NX.pick ? nsPickHtml(L) : ''}
    <div id="pn-nssheet" class="sq-legsheet" aria-hidden="true"></div>
    <p class="gt-small sq-legfoot">Your notebook stays on this device, locked in your profile. You decide what to print or share, and with whom. When you move on from Pine, it comes with you.</p>
    ${window.GGSources ? GGSources.html('pine:nextsteps') : ''}`;
}
function nsChapterHtml(c, L) {
  const closed = c.optIn && !L.opened[c.id];
  let h = `<button type="button" class="lc-back" onclick="nsOpen(null)">Back to all chapters</button>
    <h2 class="section-title" style="margin-top:10px">${escapeHtml(nsT(c, 'title'))}</h2>${nsT(c, 'lead') ? `<p class="lead">${escapeHtml(nsT(c, 'lead'))}</p>` : ''}`;
  if (closed) return h + `<div class="sq-optin"><p>${escapeHtml(nsT(c, 'note') || NS.careLine || '')}</p>
      <div class="btn-row"><button class="btn btn-primary" onclick="nsOptIn('${c.id}', true)">Open This Chapter</button><button class="btn btn-secondary" onclick="nsOpen(null)">Not Now</button></div></div>`;
  h += `<p class="gt-small">Skip any prompt. Write a little or a lot. The microphone key on your phone's keyboard lets you speak instead of type.</p>`;
  h += (c.prompts || []).map(p => {
    const a = L.answers[p.id] || null, editing = NX.edit === p.id, has = a && String(a.text || '').trim();
    return `<article class="sq-prompt${has ? ' has' : ''}" id="np-${p.id}">
      <h3>${escapeHtml(nsP(p))}</h3>${nsHelp(p) ? `<p class="sq-help">${escapeHtml(nsHelp(p))}</p>` : ''}
      ${p.care ? `<p class="sq-care">${escapeHtml(NS.careLine || '')} <button type="button" class="text-btn" onclick="showCalm('hurt')">Help from outside your home</button></p>` : ''}
      ${editing ? `<label class="gt-small" for="nt-${p.id}">Your words</label><textarea id="nt-${p.id}" class="reflection-area sq-legtext" rows="6" maxlength="20000">${escapeHtml(a ? a.text : '')}</textarea>
        ${p.when ? `<label class="gt-small" for="nw-${p.id}">By when (optional)</label><input type="date" id="nw-${p.id}" class="sq-select pn-date" value="${escapeHtml(a && a.when ? a.when : '')}">` : ''}
        <div class="btn-row"><button class="btn btn-primary" onclick="nsSave('${p.id}')">Save</button><button class="btn btn-secondary" onclick="NX.edit=null;renderNext()">Cancel</button>${has ? `<button class="btn btn-secondary" onclick="nsDelete('${p.id}')">Remove</button>` : ''}</div>`
      : has ? `<div class="sq-legans">${escapeHtml(a.text).replace(/\n/g, '<br>')}</div><p class="gt-small">${escapeHtml(a.date ? formatDate(a.date) : '')}${a.when ? '. By ' + escapeHtml(formatDate(a.when)) : ''}</p><div class="btn-row"><button class="btn btn-secondary btn-sm" onclick="nsEdit('${p.id}')">Edit</button></div>`
      : `<div class="btn-row"><button class="btn btn-secondary btn-sm" onclick="nsEdit('${p.id}')">Write This One</button></div>`}
    </article>`;
  }).join('');
  h += `<div class="btn-row"><button class="btn btn-primary" onclick="nsPrint(['${c.id}'])">Save or Print This Chapter</button>${c.optIn ? `<button class="btn btn-secondary" onclick="nsOptIn('${c.id}', false)">Close This Chapter</button>` : ''}<button class="btn btn-secondary" onclick="nsOpen(null)">Back to All Chapters</button></div>
    <div id="pn-nssheet" class="sq-legsheet" aria-hidden="true"></div>`;
  return h;
}
function nsOpen(id) { NX.ch = id; NX.edit = null; NX.pick = false; renderNext(); scrollToViewTop('client-next', true, false); }
function nsEdit(pid) { NX.edit = pid; renderNext(); const t = document.getElementById('nt-' + pid); if (t) { t.focus(); t.scrollIntoView({ block: 'center' }); } }
function nsSave(pid) {
  const L = nsRec(); if (!L) return;
  const text = (document.getElementById('nt-' + pid) || {}).value || '', when = ((document.getElementById('nw-' + pid) || {}).value || '').trim();
  const c = nsChapter(NX.ch), p = c && (c.prompts || []).find(x => x.id === pid);
  if (!text.trim()) delete L.answers[pid];
  else { L.answers[pid] = { text: text.slice(0, 20000), date: todayKey(), q: p ? nsP(p) : '' }; if (when) L.answers[pid].when = when; }
  NX.edit = null;
  persistRec().then(() => { renderNext(); showToast(text.trim() ? 'Saved in your notebook.' : 'Left blank. Come back any time.'); const a = document.getElementById('np-' + pid); if (a) a.scrollIntoView({ block: 'center' }); });
}
function nsDelete(pid) {
  if (!confirm('Remove what is written here? This cannot be undone unless you have a backup.')) return;
  const L = nsRec(); if (!L) return; delete L.answers[pid]; NX.edit = null; persistRec().then(renderNext);
}
function nsOptIn(id, on) {
  const L = nsRec(); if (!L) return;
  if (on) L.opened[id] = todayKey(); else delete L.opened[id];
  persistRec().then(() => { if (!on) NX.ch = null; renderNext(); showToast(on ? 'Open. Stop any time.' : 'Closed. What you wrote stays in your notebook.'); });
}
function nsPickBook() { NX.pick = !NX.pick; renderNext(); }
function nsPickHtml(L) {
  const ready = (NS.chapters || []).filter(c => nsWritten(c, L));
  if (!ready.length) return '<p class="gt-small">Write in a chapter first, and it can be saved or printed here.</p>';
  return `<div class="gt-card sq-pick"><h3>Choose the Chapters</h3><p class="gt-small">Choose what goes in. Share the pages only if you want to, and only with people you choose.</p>${ready.map(c => `<label class="gt-switch"><input type="checkbox" name="pn-pick" value="${c.id}" checked> ${escapeHtml(nsT(c, 'title'))}</label>`).join('')}
    <div class="btn-row"><button class="btn btn-primary btn-sm" onclick="nsPrint(Array.from(document.querySelectorAll('input[name=pn-pick]:checked')).map(x=>x.value))">Save or Print</button></div></div>`;
}
function nsPrint(ids) {
  const L = nsRec(); if (!L || !ids.length) { showToast('Choose a chapter first.'); return; }
  const chs = ids.map(nsChapter).filter(c => c && nsWritten(c, L));
  if (!chs.length) { showToast('Write in this chapter first, then save or print it.'); return; }
  const box = document.getElementById('pn-nssheet'); if (!box) return;
  box.innerHTML = `<div class="growth-plan-doc sq-legdoc" id="pn-nsdoc"><div class="growth-plan-header"><div class="growth-plan-title">${escapeHtml(PROF ? PROF.name + '\'s Next Steps' : 'My Next Steps')}</div><div class="growth-plan-meta">${formatDate(null)}</div></div>
    ${chs.map(c => `<div class="growth-plan-domain"><div class="growth-plan-domain-header"><div class="growth-plan-domain-name">${escapeHtml(nsT(c, 'title'))}</div></div>${(c.prompts || []).filter(p => L.answers[p.id] && String(L.answers[p.id].text || '').trim()).map(p => { const a = L.answers[p.id]; return `<h3 class="sq-legq">${escapeHtml(nsP(p))}</h3><p class="sq-lega">${escapeHtml(a.text).replace(/\n/g, '<br>')}</p>${a.when ? `<p class="sq-legby">By ${escapeHtml(formatDate(a.when))}</p>` : ''}`; }).join('')}</div>`).join('')}
    <div class="growth-plan-footer"><p>Kept with Pine by Grow With Grounded. These words belong to the person who wrote them.</p></div></div>`;
  box.removeAttribute('aria-hidden');
  const sheet = document.getElementById('pn-nsdoc');
  if (window.GGApp && window.ggPdfFromEl) GGApp.sheet({ title: 'Next Steps', file: 'next-steps.pdf', print: () => printGrowthPlanNow('pn-nsdoc'),
    blocks: () => ggPdfFromEl(sheet, { rows: '.growth-plan-domain-header', eyebrow: 'Next Steps', foot: 'Pine(TM) by Grow With Grounded. growwithgrounded.com/pine' }) });
  else printGrowthPlanNow('pn-nsdoc');
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
  const data = { app: 'pine', type: 'personal', version: 1, savedAt: new Date().toISOString(), entries: personalHistory };
  if (!window.GGFileLock) { showToast('Saving to a file needs a newer browser.'); return; }
  GGFileLock.save({ app: 'pine', filename: `pine-my-results-${todayKey()}.json`, data, what: 'your Pine results' }).then(ok => {
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
      if (!data || !['pine', 'oak'].includes(data.app) || data.type !== 'personal' || !Array.isArray(data.entries)) throw new Error('Not a Pine results file');
      const valid = data.entries.filter(e => e && e.scores && typeof e.scores === 'object');
      const ids = new Set(personalHistory.map(e => e.id));
      valid.forEach((e, i) => {
        if (!e.id) e.id = 'saved-' + i + '-' + String(e.date);
        if (data.app === 'oak') { e.from = 'oak'; e.id = 'oak-' + e.id; }
        if (!ids.has(e.id)) { personalHistory.push(e); ids.add(e.id); }
      });
      sortEntries(personalHistory);
      window.personalFileLoaded = true;
      if (PROF) profPersist();
      renderSaveBox(); renderProgress();
      showToast(`Loaded ${valid.length} saved result${valid.length !== 1 ? 's' : ''}.`);
    };
    const fail = () => showToast('That file is not a Pine results file.');
    if (window.GGFileLock) GGFileLock.read(reader.result, { app: 'pine', what: 'your Pine results' }).then(d => { if (d) { try { take(d); } catch (e) { fail(); } } }).catch(fail);
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
  const list = personalHistory.filter(e => e && e.scores).concat(aspenRings());
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
// Rings compare only within the same standard, bank, grade band, and kind (full with full,
// quick with quick). Rings from Oak or Aspen are labeled and never compared.
function stShown(entry, k) { return (entry.unsure || []).includes(k) ? null : (entry.scores || {})[k]; }
function earlierLabel(e) { return e.from ? (FROM_NAME[e.from] || 'Earlier') : !e.std ? 'Earlier' : ''; }
function renderHistoryChartAndTable(container, history) {
  const pine = history.filter(e => !e.from && e.std);
  const last = pine[pine.length - 1] || null;
  const kind = e => e.type === 'quick' ? 'quick' : 'full';
  const same = (a, b) => a.std === b.std && (a.bank || 1) === (b.bank || 1) && (a.band || '9-10') === (b.band || '9-10') && kind(a) === kind(b);
  const prev = last ? pine.slice(0, -1).reverse().find(e => same(e, last)) : null;
  let cmp = '';
  if (!last) cmp = '<p class="muted" style="font-size:15px;">Your rings from before Pine are kept below, labeled. Your first Pine check-in starts your Pine rings.</p>';
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
    tableHtml += `<tr><td>${escapeHtml(formatDate(s.date))}${s.type === 'quick' ? ' <span class="quick-tag">Quick</span>' : ''}${lab ? ` <span class="earlier-tag">${escapeHtml(lab)}</span>` : s.band ? ` <span class="quick-tag">${escapeHtml(s.band === '11-12' ? 'Grades 11 to 12' : 'Grades 9 to 10')}</span>` : ''}</td>`;
    ALL_DOMAINS.forEach(d => { const v = stShown(s, d.key); tableHtml += `<td>${v == null ? 'Not sure yet' : `${stLevel(v)}<br><small>${v} of 10</small>`}</td>`; });
    tableHtml += `</tr>`;
  });
  tableHtml += `</tbody></table></div>`;
  container.innerHTML = `
    ${last ? `<div class="chart-container"><div class="section-title" style="margin-top:0;">Most Recent Tree</div><div style="max-width:260px;margin:0 auto;">${puzzleTreeSvg({ variant: 'score', scores: last.scores, seam: '#2C1810' })}</div>${cmp}</div>` : `<div class="chart-container">${cmp}</div>`}
    <div class="chart-container">
      <div class="section-title" style="margin-top:0;">Full History</div>
      ${tableHtml}
      ${history.some(e => earlierLabel(e)) ? '<p class="muted" style="font-size:14px;margin-top:8px;">Rings marked From Oak, From Aspen, or Earlier used other questions. They stay here as part of your story, and they are never compared with Pine rings. Pine rings compare only with rings from the same grades.</p>' : ''}
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
// Text size: Pine starts at the normal size; larger text stays a setting.
const TEXT_SIZES = ['', 'ts-1', 'ts-2'];
const TEXT_LABELS = ['A+', 'A++', 'A'];
let textSize = 0;
try { const v = localStorage.getItem('pine:text-size'); if (v !== null) textSize = parseInt(v, 10) || 0; } catch (e) {}
function applyTextSize() {
  document.documentElement.classList.remove('ts-1', 'ts-2');
  if (TEXT_SIZES[textSize]) document.documentElement.classList.add(TEXT_SIZES[textSize]);
  const b = document.getElementById('size-btn');
  if (b) { b.textContent = TEXT_LABELS[textSize]; b.setAttribute('aria-label', 'Text size: ' + ['normal', 'larger', 'largest'][textSize] + '. Tap to change.'); }
}
function cycleTextSize() {
  textSize = (textSize + 1) % TEXT_SIZES.length;
  try { localStorage.setItem('pine:text-size', String(textSize)); } catch (e) {}
  applyTextSize();
}
applyTextSize();
renderAboutParts();
renderProgress();
renderProfileBar();

/* Deep links: #quick, #checkin, #nextsteps, #plan, #life (guides), #life=<id> or #talk=<id> (one guide) */
function fromHash() {
  const h = decodeURIComponent(location.hash || '');
  if (h.startsWith('#life') || h.startsWith('#talk=')) { const id = h.startsWith('#life=') ? h.slice(6) : h.startsWith('#talk=') ? h.slice(6) : null; LCS.client.open = id && LC_TOPICS.some(t => t.id === id) ? id : null; showView('client-life'); }
  else if (h === '#nextsteps' || h === '#next') showView('client-next');
  else if (h === '#plan') showView('client-growthplan');
  else if (h === '#quick') startQuick();
  else if (h === '#checkin' || h === '#check' + 'up') startCheckin();
  else if (h === '#about') showView('client-intro');
}
window.addEventListener('hashchange', fromHash);
setTimeout(fromHash, 60);
