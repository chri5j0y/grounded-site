/* =====================================================================
   SEQUOIA . the app (GWG BLD 733)
   The Grow With Grounded tree for older adults: built for 60 and up, and
   anyone 55 or older may choose it. Built from Oak, with every Oak feature,
   fitted to later life.

   Where the words live (edit them there, not here)
     sequoia/checkin.js    the question bank, safety step, and help lines (SEQUOIA_CHECKIN)
     sequoia/practices.js  the practice library: parts, practices, how-to guides (SEQUOIA_PRACTICES)
     sequoia/legacy.js     the Legacy Book chapters and prompts (SEQUOIA_LEGACY)
     shared/gg-journey.js  the twelve weeks, anchors, and movement levels (AGES.sequoia)

   What is saved, and where
   - Everything stays on this device, locked in the person's own Grounded profile
     under "sequoia": history (check-ins), tend (daily tending), legacy (the Legacy
     Book), helpersOn and share (helpers), and a few settings.
   - A grown-up profile keeps the age "adult". Its tree choice (GGP.tree) sets where
     "My tree" opens; any adult profile opened here tends a Sequoia tree.
   - Save to a file writes a passcode-locked file (shared/gg-filelock.js).

   Helpers (the Willow model, only when the person turns it on)
   - Add a Helper is off by default. Only the person can turn it on, in Settings.
   - A helper opens the person's Sequoia with their own passcode (GGP.addHelper)
     and sees only what the person shares. Faith answers and notes start private.
     Safety answers are never shown to a helper.
   - Check-ins a helper takes with the person are marked (answeredBy). A helper
     answering from what they see is kept apart and never adds to the tree.
     A helper's own check-in uses the helper set and is kept in the helper's
     own profile.

   The game layer (Sequoia's own)
   - Big checkmarks and a short line of kind words when a practice is done.
   - A simple graph of days tended and part levels over time.
   - The legacy thread: the Legacy Book, its own tab.
   - The gentle tree from Oak (dry, droop, rest). It never dies or loses rings,
     and it holds still for two weeks after a check-in flags losing hope or
     feeling alone.
   ===================================================================== */

/* ---------- the practice library (sequoia/practices.js) ----------
   Same shapes as Oak's: DOMAIN_DEFS (key, name, color, group, prompt, restore,
   strength_msg, growth_steps), GUIDES ("part|Name": {why, today, build, hard, vary,
   story}), META ({part: {Name: [discipline, time, evidence, source url, sources]}}),
   NEW ({part: [[Name, line]]}), plus optional G, EV, DISC, SHELF. */
const SP = window.SEQUOIA_PRACTICES || {};
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
    d.key = k; d.name = d.name || PART_NAMES[k]; d.color = PART_COLORS[k]; d.group = d.group || PART_GROUP[k];
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
DOMAIN_DEFS.forEach(d => {
  const have = new Set(d.restore.map(r => r[0]));
  (NEW[d.key] || []).forEach(r => { const row = Array.isArray(r) ? r : [r.name || r.n, r.text || r.t || '']; if (row[0] && !have.has(row[0])) { d.restore.push(row); have.add(row[0]); } });
});

// =====================================================================
// GROUNDED LINKS AND STORIES (Chris's published stories, told in his own words)
// The first story in each part is the featured one on results.
// =====================================================================
const GROUNDED_URL = "https://chri5j0y.substack.com";
const SUBSCRIBE_URL = GROUNDED_URL + "/subscribe";
const STORIES = {
  roots: [
    { title: "Prayer.", url: "https://chri5j0y.substack.com/p/thank-god-for-sending-you", snippet: "The prayer stayed whole long after everything else had come apart." },
    { title: "Love.", url: "https://chri5j0y.substack.com/p/love", snippet: "Love between us, right here, right now, is God loving us through each other." },
    { title: "The Atypical Atheist", url: "https://chri5j0y.substack.com/p/the-atypical-atheist", snippet: "I believe in God, or something. I just cannot stand the church crap." }
  ],
  bark: [
    { title: "The Recovery", url: "https://chri5j0y.substack.com/p/the-recovery", snippet: "Not the mistake. The recovery." },
    { title: "Grief Debt", url: "https://chri5j0y.substack.com/p/grief-debt", snippet: "Turns out my heart was keeping better count than my head was." },
    { title: "My Boundaries Have Gates", url: "https://chri5j0y.substack.com/p/my-boundaries-have-gates", snippet: "It's okay to care deeply. The harder part is caring for yourself just as deeply afterward." }
  ],
  trunk: [
    { title: "Enlightenment", url: "https://chri5j0y.substack.com/p/enlightenment", snippet: "I have spent my whole life learning how to hold on well. Perhaps I only have one more thing left to learn." },
    { title: "Birth Plan", url: "https://chri5j0y.substack.com/p/birth-plan", snippet: "You don't just have to get ready to die. No one can, really. But you get a say in how it goes." },
    { title: "The Impossible Dance of Particles", url: "https://chri5j0y.substack.com/p/the-impossible-dance-of-particles", snippet: "Finally naming the God you have known all along in your own sacred language." }
  ],
  fruit: [
    { title: "Total Bliss", url: "https://chri5j0y.substack.com/p/total-bliss", snippet: "Peace wasn't a big enough word for what she had. She needed bliss." },
    { title: "He Was Praying Too", url: "https://chri5j0y.substack.com/p/he-was-praying-too", snippet: "When you were praying for me&hellip; I was praying too." },
    { title: "Welcome Home", url: "https://chri5j0y.substack.com/p/welcome-home", snippet: "His arms stayed open the whole time, reaching for someone neither of us could see." }
  ],
  leaves: [
    { title: "Drift Away", url: "https://chri5j0y.substack.com/p/drift-away", snippet: "Some people don't say goodbye. They sing it." },
    { title: "Grounded in Coffee", url: "https://chri5j0y.substack.com/p/grounded-in-coffee", snippet: "Sometimes the mess itself becomes part of the medicine." }
  ],
  branches: [
    { title: "If She Is Still Here", url: "https://chri5j0y.substack.com/p/if-she-is-still-here", snippet: "I almost said tomorrow. She didn't have a tomorrow." },
    { title: "He Came to Collect", url: "https://chri5j0y.substack.com/p/he-came-to-collect", snippet: "You cannot save the whole field if the fence is broken in one spot." },
    { title: "Please Help My Dad Die", url: "https://chri5j0y.substack.com/p/please-help-my-dad-die", snippet: "Sometimes the hardest part of dying is finding permission to leave." }
  ]
};
const ROTATION_TITLES = ["Drift Away", "Total Bliss", "Prayer.", "Enlightenment", "Love."];

// ---------- HELPERS ----------

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
  if (!isoDate) return new Date().toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'});
  const d = new Date(isoDate + 'T00:00:00');
  if (isNaN(d)) return isoDate;
  return d.toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'});
}

// =====================================================================
// SEQUOIA: THE SIX PARTS, in words for later life
// =====================================================================
const DOMAIN_BY_KEY = {};
DOMAIN_DEFS.forEach(d => { DOMAIN_BY_KEY[d.key] = d; });

const PARTS = {
  roots: {
    part: 'Roots', icon: 'roots',
    treeLabel: 'What roots do for a sequoia', youLabel: 'What your roots do for you',
    tree: 'A sequoia\'s roots run shallow and very wide, out among the roots of the trees around it. Roots that are not deep can still hold up the biggest tree on earth.',
    you: 'Your roots are what you are anchored in: God, the sacred, or whatever you hold above everything else. In a long life they often change shape, and they still hold.',
    health: ['You have something steady to return to when life is not.', 'Your practices still feed you, even if they look different now.', 'You can bring your honest questions without fear.'],
    stress: ['Faith has gone quiet, or feels far away.', 'Old hurts from a faith community still sting.', 'Nothing feels solid when life shakes.']
  },
  trunk: {
    part: 'Trunk', icon: 'trunk',
    treeLabel: 'What the trunk does for a sequoia', youLabel: 'What your trunk does for you',
    tree: 'A sequoia\'s trunk carries everything, and its rings hold every year it has lived: the wet years, the dry years, and the fires it survived.',
    you: 'Your trunk is meaning: knowing your life matters, now and still. Later life brings new roles, like mentor, grandparent, neighbor, or volunteer, and they count fully.',
    health: ['You can say what your life is about, at least in part.', 'Hard seasons feel like chapters, not the whole book.', 'You have something you are still moving toward.'],
    stress: ['Days blur together without direction.', 'You wonder if you still matter to anyone.', 'Retirement or loss took the role that gave your days shape.']
  },
  bark: {
    part: 'Bark', icon: 'bark',
    treeLabel: 'What bark does for a sequoia', youLabel: 'What your bark does for you',
    tree: 'Sequoia bark grows up to two feet thick. It shields the tree from fire, and the scars it heals over become part of its strength.',
    you: 'Your bark is your mind and feelings: how you calm down, carry worry, and heal. Healthy bark is not about never getting hurt. It is about healing over well.',
    health: ['You have real ways to settle yourself when worry climbs.', 'You can name what you are feeling.', 'Old wounds are closing, even if scars remain.'],
    stress: ['Worry or sadness has settled in and stayed.', 'You feel numb, or short with people.', 'The same old wound keeps getting reopened.']
  },
  branches: {
    part: 'Branches', icon: 'branches',
    treeLabel: 'What branches do for a sequoia', youLabel: 'What your branches do for you',
    tree: 'Branches reach out and hold the leaves up to the light. Sequoias grow in groves, and the grove helps each tree stand.',
    you: 'Your branches are your people: family by blood or by choice, friends, neighbors, and community. Who shows up for you, and who you show up for.',
    health: ['You have someone you could call any time.', 'Care flows both ways.', 'You belong somewhere without having to earn it.'],
    stress: ['Days go by without a real conversation.', 'Friends have moved, died, or drifted away.', 'You feel like a burden to the people you love.']
  },
  leaves: {
    part: 'Leaves', icon: 'leaf',
    treeLabel: 'What leaves do for a sequoia', youLabel: 'What your leaves do for you',
    tree: 'Leaves breathe. They turn sunlight into energy for the whole tree, and they are the first place stress shows.',
    you: 'Your leaves are your body: movement and balance, rest, food, and the care you get. This part asks about what your body allows, never about being perfectly healthy.',
    health: ['You move in the ways your body allows, most days.', 'You sleep and eat in ways that help you.', 'You get care when you need it, without shame.'],
    stress: ['Pain or tiredness decides your days.', 'A fall, or the fear of one, keeps you still.', 'Sleep and eating have gone sideways.']
  },
  fruit: {
    part: 'Fruit', icon: 'fruit',
    treeLabel: 'What fruit does for a sequoia', youLabel: 'What your fruit does for you',
    tree: 'A sequoia\'s cones can wait for years and open after a fire. Its seeds carry the forest forward, long after this season.',
    you: 'Your fruit is hope: something still worth looking forward to, and the good your life passes on. In later life, hope is often quieter and steadier.',
    health: ['You can name something you are looking forward to.', 'You notice good moments and keep them.', 'You can find light even in hard seasons.'],
    stress: ['The future feels closed.', 'Your hope depends on one thing going right.', 'You have stopped expecting anything good.']
  }
};
const PART_ORDER = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];
PART_ORDER.forEach(k => Object.assign(DOMAIN_BY_KEY[k], { part: PARTS[k].part, icon: PARTS[k].icon }));
const ALL_DOMAINS = PART_ORDER.map(k => DOMAIN_BY_KEY[k]);

const ABOUT_TEXT = {
  roots: 'What grounds you, and what you hold above everything else. Your connection to the sacred, however you understand it.',
  trunk: 'What gives your life purpose now. The story you are living, and the roles that still give your days shape.',
  bark: 'How you calm down and carry worry, grief, and change. Your tools for settling and healing.',
  branches: 'Who shows up for you, and who you show up for. Family, friends, neighbors, and community.',
  leaves: 'Your body: movement and balance, rest, food, and care, in the ways your body allows.',
  fruit: 'What you are still looking forward to, and the good your life passes on.'
};


// PRACTICE GUIDES, ICONS
const FLAGS = spGet('FLAGS') || {};
function practiceMeta(key, name) {
  const m = (META[key] || {})[name], f = FLAGS[key + '|' + name] || {};
  const fit = (f.seated ? '<span class="pm-tag pm-fit">Seated</span>' : '') + (f.bed ? '<span class="pm-tag pm-fit">In bed</span>' : '');
  if (!m) return fit ? `<span class="pm-tags">${fit}</span>` : '';
  return `<span class="pm-tags"><span class="pm-tag">${DISC[m[0]] || ''}</span><span class="pm-tag">${m[1]}</span><span class="pm-tag pm-ev pm-ev-${m[2]}">${EV[m[2]] || ''}</span>${fit}</span>`;
}
function shelfHtml(key) {
  const list = SHELF[key] || []; if (!list.length) return '';
  return `<details class="shelf"><summary>Resource shelf</summary><ul>${list.map(r => `<li>${r[1] ? `<a class="text-link" href="${r[1]}" target="_blank" rel="noopener">${r[0]}</a>` : `<strong>${r[0]}</strong>`}<span>${r[2]}</span></li>`).join('')}</ul></details>`;
}

function guideHtml(key, name, withStory) {
  const g = GUIDES[key + '|' + name];
  if (!g) return '';
  let s = `<p><strong>Why it helps.</strong> ${g.why}</p>
    <p><strong>Try it today.</strong> ${g.today}</p>
    <p><strong>Build it.</strong> ${g.build}</p>
    <p><strong>If it's hard.</strong> ${g.hard}</p>`;
  if (g.vary) s += `<p><strong>For different beliefs.</strong> ${g.vary}</p>`;
  const m = (META[key] || {})[name];
  if (m && m[3]) s += `<p class="guide-src"><a class="text-link" href="${m[3]}" target="_blank" rel="noopener">Learn more at the source</a></p>`;
  if (g.adapt) s += '<p><strong>Seated or in bed.</strong> ' + g.adapt + '</p>';
  if (window.GGSources) s += GGSources.line(GGSources.practiceList(name, 'sequoia'), { practice: true });
  if (false && withStory && g.story) {
    const st = findStory(g.story);
    if (st) s += `<p><strong>From Grounded.</strong> <a class="text-link" href="${st.url || GROUNDED_URL}" target="_blank" rel="noopener">${st.title}</a></p>`;
  }
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
  tree: '<circle cx="12" cy="8" r="5.5"/><path d="M12 13.5V18"/><path d="M4 18h16"/><path d="M12 18l-3 3.5M12 18l3 3.5"/>',
  results: '<rect x="4.5" y="3.5" width="15" height="18" rx="2.5"/><path d="M9 3.5V2h6v1.5"/><path d="M8.5 13l2.5 2.5 4.5-5"/>',
  can: '<path d="M4 10h11v8.5a2.5 2.5 0 0 1-2.5 2.5h-6A2.5 2.5 0 0 1 4 18.5z"/><path d="M15 12.5l5.5-4.5"/><path d="M20.5 8l1-1.5"/><path d="M7 10V7.5a2.5 2.5 0 0 1 5 0V10"/>',
  maple: '<path d="M12 21v-9"/><path d="M12 12c0-4.5-3.2-7-8-7 0 4.5 3.2 7 8 7z"/><path d="M12 14.5c0-3.5 2.4-6 7-6 0 3.5-2.4 6-7 6z"/><path d="M6.5 21h11"/>',
  people: '<circle cx="9" cy="8" r="3.2"/><circle cx="17" cy="9" r="2.6"/><path d="M2.5 20.5c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5"/><path d="M15.5 15c3.2 0 6 1.6 6 5"/>',
  plus: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v9M7.5 12h9"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/>',
  door: '<path d="M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21"/><path d="M3 21h18"/><circle cx="14.5" cy="12.5" r="1"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle cx="12" cy="15" r="1.2"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/><path d="M9 7.5h7"/>',
  rings: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.8"/><circle cx="12" cy="12" r="2.6"/>'
};
function icon(name, size) {
  return `<svg class="icon" width="${size || 22}" height="${size || 22}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}
function partIcon(d, size) { return icon(d.icon, size); }

// =====================================================================
// THE SIX-PIECE PUZZLE TREE
// variant: 'hero' (cream, on gold), 'color' (part colors), 'score' (shaded by score)
// =====================================================================
const TREE_SHAPES = {
  roots: {
    kind: 'taper', dx: 0, dy: 16, delay: 0,
    paths: [
      // Sequoia roots run shallow and very wide
      ['M200 299 C199 318 201 334 198 352', 10, 2],
      ['M194 298 C170 312 130 320 74 326', 11, 2],
      ['M206 298 C230 312 270 320 326 326', 11, 2],
      ['M190 297 C160 300 110 302 52 306', 8, 1.6],
      ['M210 297 C240 300 290 302 348 306', 8, 1.6],
      ['M150 316 C140 328 130 334 116 344', 4.4, 1.2],
      ['M250 316 C260 328 270 334 284 344', 4.4, 1.2],
      ['M112 322 C98 330 88 334 72 340', 3.2, 1],
      ['M288 322 C302 330 312 334 328 340', 3.2, 1],
      ['M198 340 C190 348 184 354 176 360', 3.6, 1],
      ['M199 344 C207 352 214 358 222 362', 3.6, 1],
      ['M90 304 C78 310 66 312 54 318', 2.4, .6],
      ['M310 304 C322 310 334 312 346 318', 2.4, .6],
      ['M118 344 C112 350 108 356 104 362', 1.6, .5],
      ['M282 344 C288 350 292 356 296 362', 1.6, .5],
      ['M74 326 C64 330 58 334 50 340', 1.6, .5],
      ['M326 326 C336 330 342 334 350 340', 1.6, .5]
    ]
  },
  // a massive trunk that flares wide at the ground
  trunk: { kind: 'fill', dx: 0, dy: 12, delay: 0.25, paths: ['M168 292 C184 286 188 268 189 244 L191 150 L209 150 L211 244 C212 268 216 286 232 292 Z'] },
  bark: {
    kind: 'fill', dx: 0, dy: 0, delay: 0.45,
    paths: ['M146 292 C164 286 174 270 178 244 L182 168 L188 168 L187 244 C186 268 180 284 166 292 Z', 'M254 292 C236 286 226 270 222 244 L218 168 L212 168 L213 244 C214 268 220 284 234 292 Z'],
    grain: ['M158 288 C170 280 177 262 180 236', 'M242 288 C230 280 223 262 220 236', 'M181 220 C182 205 183 190 184 176', 'M219 220 C218 205 217 190 216 176']
  },
  branches: {
    kind: 'taper', dx: 0, dy: -8, delay: 0.65, seam: true, joints: true,
    paths: [
      ['M200 176 C201 140 199 100 200 34', 11, 3],
      ['M197 168 C186 162 174 160 160 156', 6, 2.2],
      ['M203 150 C214 144 226 142 240 138', 6, 2.2],
      ['M197 128 C188 122 178 120 166 118', 5, 1.8],
      ['M203 108 C212 102 222 100 234 98', 5, 1.8],
      ['M198 86 C191 82 184 80 176 79', 4, 1.4],
      ['M202 68 C208 64 214 62 222 61', 4, 1.4]
    ]
  },
  // a narrow, high crown
  leaves: { kind: 'canopy', dx: 0, dy: -12, delay: 0.85, circles: [[200,40,22],[188,62,22],[212,64,22],[200,84,28],[178,100,24],[222,100,24],[200,120,30],[172,136,26],[228,136,26],[200,156,30],[176,170,24],[224,170,24],[200,186,22]] },
  fruit: { kind: 'fruit', dx: 0, dy: -18, delay: 1.1, circles: [[186,70],[216,96],[178,124],[222,148],[196,172],[206,44],[180,154]] }
};
const PIECE_FOR = { roots: 'roots', trunk: 'trunk', bark: 'bark', branches: 'branches', leaves: 'leaves', fruit: 'fruit' };
const DRAW_ORDER = ['leaves', 'branches', 'fruit', 'bark', 'trunk', 'roots'];
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

// Leafy, scalloped canopy edge built around the outer circles
function canopyCircles(circles) {
  const out = circles.map(c => [c[0], c[1], c[2]]);
  circles.forEach(([cx, cy, r]) => {
    for (let a = 0; a < 360; a += 20) {
      const rad = a * Math.PI / 180, px = cx + Math.cos(rad) * (r - 3), py = cy + Math.sin(rad) * (r - 3);
      const covered = circles.some(o => o !== undefined && !(o[0] === cx && o[1] === cy) && Math.hypot(px - o[0], py - o[1]) < o[2] - 4);
      if (!covered) out.push([px, py, 7 + r * 0.1]);
    }
  });
  return out;
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
    const color = hero ? HERO_COLORS[key] : d.color;
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
      if (!hero && key === 'bark') inner += `<path d="M164 284 C170 276 175 262 177 248M236 284 C230 276 225 262 223 248" stroke="#000" stroke-opacity="0.22" stroke-width="1.1" stroke-linecap="round" fill="none"/>`;
      if (!hero && key === 'trunk') inner += `<g stroke="#000" stroke-opacity="0.25" stroke-width="1.2" stroke-linecap="round" fill="none"><path d="M194 286 C196 260 197 220 197 160M206 286 C204 260 203 220 203 160M200 288 V170"/></g>`;
    } else if (shape.kind === 'canopy') {
      const cc = canopyCircles(shape.circles);
      inner += cc.map(c => `<circle cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" r="${(c[2] + 1.8).toFixed(1)}" style="fill:${o.seam};"/>`).join('');
      inner += cc.map(c => `<circle cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" r="${c[2].toFixed(1)}" style="fill:${color};"/>`).join('');
      if (!hero && o.variant !== 'score') inner += `<circle cx="192" cy="80" r="14" fill="#8FB070" opacity="0.35"/><circle cx="184" cy="132" r="12" fill="#8FB070" opacity="0.3"/><circle cx="212" cy="58" r="9" fill="#8FB070" opacity="0.22"/>`;
    } else if (shape.kind === 'fruit') {
      const gid = 'stf' + (++TREE_UID);
      inner += `<defs><radialGradient id="${gid}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#FFF3D6" stop-opacity="0.55"/><stop offset="0.5" stop-color="${color}" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.3"/></radialGradient></defs>`;
      inner += shape.circles.map(([x, y]) => `
        <path d="M${x} ${y - 7} C${x + 1} ${y - 11} ${x + 3} ${y - 13} ${x + 6} ${y - 14}" style="stroke:${o.seam};" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="M${x} ${y - 7} C${x + 1} ${y - 11} ${x + 3} ${y - 13} ${x + 6} ${y - 14}" style="stroke:${hero ? color : '#6B4226'};" stroke-width="1.8" stroke-linecap="round" fill="none"/>
        ${hero ? '' : `<path d="M${x + 5} ${y - 13.5} C${x + 8} ${y - 18} ${x + 13} ${y - 18} ${x + 15} ${y - 15} C${x + 12} ${y - 12} ${x + 8} ${y - 12} ${x + 5} ${y - 13.5} Z" style="fill:var(--leaf-accent, #4E6A3B);stroke:${o.seam};" stroke-width="1"/>`}
        <circle cx="${x}" cy="${y}" r="8" style="fill:${color};stroke:${o.seam};" stroke-width="3.5"/>
        ${hero ? '' : `<circle cx="${x}" cy="${y}" r="8" fill="url(#${gid})"/><circle cx="${x - 2.6}" cy="${y - 2.6}" r="2" fill="#FFF3DD" opacity="0.85"/>`}`).join('');
    }
    const label = `${d.part}, ${d.name}${o.scores ? ', ' + o.scores[key] + ' of 10' : ''}`;
    const attrs = o.interactive ? `tabindex="0" role="button" aria-label="${label}"` : '';
    const anim = o.assemble ? `style="--dx:${shape.dx}px;--dy:${shape.dy}px;--delay:${shape.delay}s;"` : '';
    const sway = (o.assemble && (key === 'leaves' || key === 'fruit')) ? ' sway' : '';
    pieces += `<g class="piece-wrap${sway}" ${anim}><g class="piece${o.interactive ? ' interactive' : ''}" data-key="${key}" ${attrs} opacity="${pieceOpacity.toFixed(2)}"><title>${label}</title>${inner}</g></g>`;
  });
  return `<svg class="${o.cls}${o.assemble ? ' assemble' : ''}" viewBox="40 2 320 424" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sequoia with six parts">${ground}${pieces}</svg>`;
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

// Kept for the history chart and older code paths
function treeSvgMarkup(scores) {
  return puzzleTreeSvg({ variant: 'score', scores, seam: '#2C1810' }).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
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
        <p>${ABOUT_TEXT[d.key]}</p>
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
// CHECKIN: one question on the screen at a time (GWG BLD 733)
// The bank is /sequoia/checkin.js, read by Sequoia and Sequoia Guide,
// on the Grounded tree standard, version 1: 8 per part, a guide tip and a
// "why" line on each, two reverse questions per part, flags, and the
// safety step. Question 1 of each part is the quick check-in question.
// Screens: for each part, a short intro, one screen per question, and an
// optional "Sit with this". Then the two safety questions, one per screen.
// Big answer rows, a clear Back, and progress in words.
// =====================================================================
const CKB = window.SEQUOIA_CHECKIN || {};
const ST_STD = 1;
const Q_OPTS = CKB.answers || [];
const MAIN_Q = CKB.questions || {};
const SAFETY = CKB.safety || {};
const ST_FLAGS = CKB.flags || {};
let QUESTIONS = MAIN_Q;                                   // the helper set for a helper's own check-in
let Q_STEM = (CKB.stems || {}).standard || 'In the past two weeks, how often have you...';
const quickQ = key => ((QUESTIONS[key] || [])[0] || {}).t || '';
const stLevel = sc => sc == null ? 'Not sure yet' : sc >= 8 ? 'Strong' : sc >= 5 ? 'Steady' : 'Growing Edge';
const stLevelLine = sc => sc == null ? 'Not sure yet' : `${stLevel(sc)}, ${sc} of 10`;
let ST_ANS = {}, ST_SAFE = {}, ST_QUICK = false;
// Who is answering (Willow model). by: 'self', 'tapped' (they answered, a helper tapped),
// 'observed' (a helper answering from what they see), or 'helper' (a helper's own check-in).
let CK = { by: 'self', forId: null, name: '' };
const BY_LABEL = Object.fromEntries((CKB.answeredBy || [['self', 'They answered'], ['tapped', 'They answered, I tapped'], ['observed', 'I\'m answering from what I see']]).map(x => [x[0], x[1]]));

function partScore(key, answers) {
  const qs = QUESTIONS[key] || []; let sum = 0, n = 0;
  qs.forEach((q, i) => {
    const a = answers[i]; if (q.c || a == null) return;
    const opt = Q_OPTS.find(o => o[0] === a); if (!opt || opt[2] === null) return;
    sum += q.r ? 3 - opt[2] : opt[2]; n++;
  });
  return n ? Math.max(1, Math.min(10, Math.round(1 + 9 * (sum / n) / 3))) : null;
}
// The question object behind a card. Quick check-in cards use question 1 of the part.
function stQ(key, i) {
  if (QUESTIONS[key]) return QUESTIONS[key][i] || null;
  if (key.indexOf('quick_') === 0 && QUESTIONS[key.slice(6)]) return QUESTIONS[key.slice(6)][0];
  return null;
}
function stemNow() {
  const n = CK.name || 'them';
  if (CK.by === 'observed') return ((CKB.stems || {}).observed || 'In the past two weeks, from what you have seen, how often has {name}...').replace('{name}', n);
  if (CK.by === 'helper') return ((CKB.stems || {}).helper || 'In the past two weeks, as you help {name}, how often have you...').replace('{name}', n);
  return Q_STEM;
}
function srcSmall(list) { return list && list.length && window.GGSources ? GGSources.line(list, { tag: 'small' }) : ''; }
function questionHtml(key, i, text) {
  const cur = (ST_ANS[key] || {})[i];
  const q = stQ(key, i);
  return `<div class="q-card sq-one${cur ? ' answered' : ''}" data-q="${key}-${i}" role="radiogroup" aria-label="${escapeHtml(text)}">
    <p class="q-text sq-qtext">${escapeHtml(text)}</p>
    <div class="q-opts sq-opts">${Q_OPTS.map(o => `<button type="button" data-v="${o[0]}" aria-pressed="${cur === o[0]}" onclick="answerQ('${key}', ${i}, '${o[0]}')"><span class="sq-dot" aria-hidden="true"></span>${o[1]}</button>`).join('')}</div>
    ${q && q.why ? `<details class="q-why"><summary>Why this question?</summary><p>${escapeHtml(q.why)}</p>${srcSmall(q.src)}</details>` : ''}
  </div>`;
}
let ADV = null;
function answerQ(key, i, val) {
  ST_ANS[key] = ST_ANS[key] || {};
  ST_ANS[key][i] = val;
  document.querySelectorAll(`[data-q="${key}-${i}"] button`).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === val)));
  const card = document.querySelector(`[data-q="${key}-${i}"]`);
  if (card) card.classList.add('answered');
  const q = stQ(key, i), f = q && q.flag && ST_FLAGS[q.flag];
  if (q && q.flag === 'home' && CK.by !== 'helper') ST_SAFE.home = (f ? f.on : ['rarely', 'sometimes', 'unsure']).includes(val);
  if (f && (f.calm || []).includes(val) && CK.by !== 'observed') { showCalm(q.flag === 'home' ? 'home' : ''); return; }
  // Move on after a moment, so the choice can be seen. Back always returns.
  const here = currentStep; clearTimeout(ADV);
  ADV = setTimeout(() => { if (currentStep === here && SCREENS[here + 1]) goToStep(here + 1); }, 650);
}

// ---------- safety ----------
const SAFE_OPTS = SAFETY.directOpts || [['no', 'No'], ['sometimes', 'Sometimes'], ['often', 'Often'], ['skip', "I'd rather not say"]];
const YN_OPTS = [['yes', 'Yes'], ['no', 'No'], ['skip', "I'd rather not say"]];
function optRow(which, opts, cur) {
  return `<div class="q-opts sq-opts">${opts.map(x => `<button type="button" data-v="${x[0]}" aria-pressed="${cur === x[0]}" onclick="answerSafe('${which}','${x[0]}')"><span class="sq-dot" aria-hidden="true"></span>${x[1]}</button>`).join('')}</div>`;
}
function safetyScreenHtml(which) {
  const cur = ST_SAFE[which] || '', n = escapeHtml(CK.name || 'them');
  if (which === 'opener') return `<p class="safe-lead">${escapeHtml(SAFETY.lead || 'Two last questions. They\'re here because we care, and your answers stay on this device.')}</p>
    <div class="q-card sq-one${cur ? ' answered' : ''}" data-s="opener" role="radiogroup" aria-label="Hopeless or a burden"><p class="q-text sq-qtext">${escapeHtml(SAFETY.opener || '')}</p>${optRow('opener', Q_OPTS, cur)}</div>`;
  if (which === 'direct') return `<p class="safe-lead">${escapeHtml(SAFETY.directLead || '')}</p>
    <div class="q-card sq-one${cur ? ' answered' : ''}" data-s="direct" role="radiogroup" aria-label="Thoughts of ending your life"><p class="q-text sq-qtext">${escapeHtml(SAFETY.direct || '')}</p>${optRow('direct', SAFE_OPTS, cur)}</div>`;
  if (which === 'observed') { const O = SAFETY.observed || {};
    return `<div class="q-card sq-one${cur ? ' answered' : ''}" data-s="observed" role="radiogroup" aria-label="What they have said"><p class="q-text sq-qtext">${escapeHtml((O.ask || '').replace('{name}', CK.name || 'they'))}</p>${optRow('observed', YN_OPTS, cur)}</div>
    ${cur === 'yes' ? `<p class="sq-flagnote">${escapeHtml((O.help || '').replace(/\{name\}/g, CK.name || 'them'))}</p>${linesHtml(false, true)}` : ''}`; }
  if (which === 'helper') { const H = SAFETY.helper || {};
    return `<div class="q-card sq-one${cur ? ' answered' : ''}" data-s="helper" role="radiogroup" aria-label="Your own safety"><p class="q-text sq-qtext">${escapeHtml(H.ask || '')}</p>${optRow('helper', YN_OPTS, cur)}</div>
    ${cur === 'yes' ? `<p class="sq-flagnote">${escapeHtml(H.yes || '')}</p>${linesHtml(false, true)}` : cur === 'no' ? `<p class="sq-flagnote">${escapeHtml(H.no || '')}</p>` : ''}`; }
  return '';
}
function answerSafe(which, val) {
  ST_SAFE[which] = val;
  document.querySelectorAll(`[data-s="${which}"] button`).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === val)));
  const c = document.querySelector(`[data-s="${which}"]`); if (c) c.classList.add('answered');
  if (which === 'direct' && val !== 'no' && val !== 'skip') { showCalm('direct'); return; }
  if (which === 'opener' && (val === 'often' || val === 'always')) { showCalm('burden'); return; }
  if (which === 'observed' || which === 'helper') { const box = document.getElementById('sq-safe-' + which); if (box) box.innerHTML = safetyScreenHtml(which); if (val === 'yes') return; }
  const here = currentStep; clearTimeout(ADV);
  ADV = setTimeout(() => { if (currentStep === here && SCREENS[here + 1]) goToStep(here + 1); }, 650);
}
// The help lines, from SEQUOIA_CHECKIN.safety.lines. MAARC and the fraud line come first when the home flag shows.
function linesHtml(home, compact) {
  const L = (SAFETY.lines && SAFETY.lines.length) ? SAFETY.lines : [
    { id: '988', name: '988 Suicide and Crisis Lifeline', show: 'Call or text 988', tel: '988', sms: '988', note: 'Any time, day or night.' },
    { id: '911', name: 'In immediate danger?', show: 'Call 911', tel: '911' }];
  const list = home ? L.filter(x => x.first === 'home').concat(L.filter(x => x.first !== 'home')) : L;
  return `<ul class="calm-list${compact ? ' sq-lines' : ''}">${list.map(x => `<li${home && x.first === 'home' ? ' class="calm-first"' : ''}><b>${escapeHtml(x.name)}</b><a href="tel:${escapeHtml(x.tel || '')}">${escapeHtml(x.show || x.tel || '')}</a>${x.sms && x.id === '988' ? ` or <a href="sms:${escapeHtml(x.sms)}">text ${escapeHtml(x.sms)}</a>` : ''}${x.note ? `<span class="sq-linenote">${escapeHtml(x.note)}</span>` : ''}</li>`).join('')}</ul>`;
}
function showCalm(why) {
  const old = document.getElementById('calm-card'); if (old) old.remove();
  const home = why === 'home' || !!ST_SAFE.home;
  const lead = why === 'direct' ? `<p><b>${escapeHtml(SAFETY.yes || '')}</b></p>${SAFETY.means ? `<p>${escapeHtml(SAFETY.means)}</p>` : ''}`
    : why === 'burden' ? `<p>${escapeHtml(SAFETY.burden || '')}</p>` : `<p>${escapeHtml(SAFETY.intro || 'If you\'re thinking about suicide or feel unsafe, reach out now. Someone will listen.')}</p>`;
  const wrap = document.createElement('div');
  wrap.id = 'calm-card'; wrap.className = 'calm-back';
  wrap.innerHTML = `<div class="calm-box" role="dialog" aria-modal="true" aria-labelledby="calm-title">
    <h2 id="calm-title">${escapeHtml(SAFETY.title || 'You matter, and you don\'t have to carry this alone.')}</h2>
    ${lead}
    ${linesHtml(home)}
    <div class="calm-row"><button type="button" class="btn btn-primary" onclick="closeCalm()">Close and keep going</button></div>
  </div>`;
  document.body.appendChild(wrap);
  wrap.addEventListener('click', e => { if (e.target === wrap) closeCalm(); });
  document.addEventListener('keydown', calmKey);
  const b = wrap.querySelector('button'); if (b) b.focus();
}
function calmKey(e) { if (e.key === 'Escape') closeCalm(); }
function closeCalm() { const c = document.getElementById('calm-card'); if (c) c.remove(); document.removeEventListener('keydown', calmKey); }

// ---------- the screens ----------
let SCREENS = [], currentStep = 0;
const visitedSteps = new Set([0]);
function buildScreens(quick) {
  const out = [];
  ALL_DOMAINS.forEach((d, pi) => {
    if (quick) { out.push({ kind: 'q', key: 'quick_' + d.key, part: d.key, pi, i: 0, n: 1 }); return; }
    const n = (QUESTIONS[d.key] || []).length;
    out.push({ kind: 'intro', part: d.key, pi });
    for (let i = 0; i < n; i++) out.push({ kind: 'q', key: d.key, part: d.key, pi, i, n });
    if (CK.by === 'self' || CK.by === 'tapped') out.push({ kind: 'sit', part: d.key, pi });
  });
  if (CK.by === 'observed') out.push({ kind: 'safe', which: 'observed' });
  else if (CK.by === 'helper') out.push({ kind: 'safe', which: 'helper' });
  else { out.push({ kind: 'safe', which: 'opener' }); out.push({ kind: 'safe', which: 'direct' }); }
  out.push({ kind: 'finish' });
  return out;
}
function whoLine() {
  if (CK.by === 'tapped') return `<p class="sq-who">${escapeHtml(CK.name)} answers. You tap. ${escapeHtml(BY_LABEL.tapped || '')}.</p>`;
  if (CK.by === 'observed') return `<p class="sq-who">You are answering from what you see in ${escapeHtml(CK.name)}. This is kept apart, and never adds to their tree.</p>`;
  if (CK.by === 'helper') return `<p class="sq-who">A check-in for you, as you help ${escapeHtml(CK.name)}. It stays in your own profile.</p>`;
  return '';
}
function screenHtml(sc, idx) {
  const d = sc.part ? DOMAIN_BY_KEY[sc.part] : null, p = d ? PARTS[d.key] : null;
  const head = d ? `<div class="step-head"><div class="step-icon">${partIcon(d, 40)}</div><div><div class="step-count">Part ${sc.pi + 1} of ${ALL_DOMAINS.length}</div><h2 class="step-title">${d.part}</h2><div class="step-domain">${d.name}</div></div></div>` : '';
  const back = idx > 0 ? `<button class="btn btn-secondary" onclick="goToStep(${idx - 1})">Back</button>` : '<span></span>';
  const nextLabel = nextLabelFor(idx);
  if (sc.kind === 'intro') return `<section class="step-panel" id="step-${idx}" style="--domain-color:${d.color};">${head}${whoLine()}
      <div class="step-grid">
        <div class="step-block"><div class="step-label">${p.treeLabel}</div><p>${p.tree}</p></div>
        <div class="step-block"><div class="step-label">${p.youLabel}</div><p>${p.you}</p></div>
      </div>
      ${signsHtml(d)}
      <div class="btn-row step-nav">${back}<button class="btn btn-primary" onclick="goToStep(${idx + 1})">Begin ${d.part}</button></div></section>`;
  if (sc.kind === 'q') {
    const text = sc.key.indexOf('quick_') === 0 ? quickQ(sc.part) : ((QUESTIONS[sc.key] || [])[sc.i] || {}).t || '';
    const count = ST_QUICK ? `Question ${sc.pi + 1} of 6` : `Question ${sc.i + 1} of ${sc.n}`;
    return `<section class="step-panel" id="step-${idx}" style="--domain-color:${d.color};">${ST_QUICK ? `<div class="step-head"><div class="step-icon">${partIcon(d, 40)}</div><div><div class="step-count">Quick Check-in</div><h2 class="step-title">${d.part}</h2><div class="step-domain">${d.name}</div></div></div>` : head}
      <p class="sq-count">${count}</p>
      <p class="q-stem">${escapeHtml(stemNow())}</p>
      ${questionHtml(sc.key, sc.i, text)}
      <div class="btn-row step-nav">${back}<button class="btn btn-secondary" onclick="goToStep(${idx + 1})">${(ST_ANS[sc.key] || {})[sc.i] ? nextLabel : 'Skip this one'}</button></div></section>`;
  }
  if (sc.kind === 'sit') return `<section class="step-panel" id="step-${idx}" style="--domain-color:${d.color};">${head}
      <div class="sit-with"><div class="step-label">Sit with this <span class="opt">(optional)</span></div><p class="domain-prompt">${d.prompt || 'What is true for you in this part of your life right now?'}</p>
      <textarea class="reflection-area" id="client-${d.key}-notes" aria-label="${d.part} reflection" placeholder="Write here if you'd like, or use your phone's microphone key to speak it. It stays on this device." style="--domain-color:${d.color};"></textarea></div>
      <div class="btn-row step-nav">${back}<button class="btn btn-primary" onclick="goToStep(${idx + 1})">${nextLabel}</button></div></section>`;
  if (sc.kind === 'safe') return `<section class="step-panel" id="step-${idx}"><div class="step-head"><div><div class="step-count">Almost done</div><h2 class="step-title">${sc.which === 'helper' ? 'For you' : 'Before you see your tree'}</h2></div></div>
      <div class="safe-wrap" id="sq-safe-${sc.which}">${safetyScreenHtml(sc.which)}</div>
      <p class="safe-help"><button type="button" class="text-btn" onclick="showCalm()">Need to talk to someone now?</button></p>
      <div class="btn-row step-nav">${back}<button class="btn btn-secondary" onclick="goToStep(${idx + 1})">Next</button></div></section>`;
  if (sc.kind === 'finish') return `<section class="step-panel" id="step-${idx}"><div class="step-head"><div><div class="step-count">All done</div><h2 class="step-title">Thank you</h2></div></div>
      <p class="lead">${CK.by === 'observed' ? 'These answers are kept apart from ' + escapeHtml(CK.name) + '\'s own, and help the people who care for them notice what is changing.' : CK.by === 'helper' ? 'Your answers stay in your own profile.' : 'Your answers stay on this device. Tap below to see your tree.'}</p>
      <div class="btn-row step-nav">${back}<button class="btn btn-primary" onclick="calculateResults('client')">${CK.by === 'self' ? 'See My Tree' : 'See the Results'}</button></div></section>`;
  return '';
}
function nextLabelFor(idx) {
  const nxt = SCREENS[idx + 1];
  return !nxt ? '' : nxt.kind === 'finish' ? 'Almost done' : nxt.kind === 'intro' ? 'Next: ' + DOMAIN_BY_KEY[nxt.part].part : 'Next';
}
function renderCheckin() {
  SCREENS = buildScreens(ST_QUICK);
  document.getElementById('step-container').innerHTML = SCREENS.map(screenHtml).join('');
  visitedSteps.clear(); visitedSteps.add(0);
  goToStep(0, true);
}
function renderStepProgress() {
  const sc = SCREENS[currentStep] || {}, at = sc.part ? sc.pi : (sc.kind ? ALL_DOMAINS.length : 0);
  const firstOf = pi => SCREENS.findIndex(s => s.pi === pi);
  document.getElementById('step-progress').innerHTML = ALL_DOMAINS.map((d, i) => `
    <button class="step-dot${i === at ? ' current' : ''}${i < at ? ' done' : ''}" style="--domain-color:${d.color};" onclick="goToStep(${firstOf(i)})" aria-label="Part ${i + 1}: ${d.part}${i < at ? ', done' : ''}">
      ${partIcon(d, 24)}<span class="lbl">${d.part}</span>
    </button>`).join('');
}
function goToStep(i, noScroll) {
  if (i < 0 || i >= SCREENS.length) return;
  clearTimeout(ADV);
  currentStep = i;
  visitedSteps.add(i);
  document.querySelectorAll('#step-container .step-panel').forEach((el, n) => el.classList.toggle('active', n === i));
  // Keep the Next or Skip label in step with an answer given on this screen
  const sc = SCREENS[i], panel = document.getElementById('step-' + i);
  if (sc && sc.kind === 'q' && panel) { const b = panel.querySelector('.step-nav .btn-secondary:last-child'); if (b) b.textContent = (ST_ANS[sc.key] || {})[sc.i] ? nextLabelFor(i) : 'Skip this one'; }
  renderStepProgress();
  if (!noScroll) scrollToViewTop('client-assess', true, true);
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
  CK = { by: by || 'self', forId: forId || null, name: p ? p.name : '' };
  QUESTIONS = CK.by === 'helper' && CKB.helper ? CKB.helper : MAIN_Q;
}
function startCheckin(by, forId) {
  setMode(typeof by === 'string' ? by : 'self', forId);
  ST_QUICK = false; ST_ANS = {}; ST_SAFE = {};
  renderCheckin();
  showView('client-assess');
  goToStep(0);
}
function startQuick(by, forId) {
  setMode(typeof by === 'string' ? by : 'self', forId);
  ST_QUICK = true; ST_ANS = {}; ST_SAFE = {};
  renderCheckin();
  showView('client-assess');
  goToStep(0);
}
function signsHtml(d) {
  const p = PARTS[d.key];
  return `<details class="signs-details"><summary>Signs of health and signs of stress</summary><div class="signs">
      <div class="signs-col"><div class="step-label">Signs of health</div><ul>${p.health.map(s => `<li>${s}</li>`).join('')}</ul></div>
      <div class="signs-col stress"><div class="step-label">Signs of stress</div><ul>${p.stress.map(s => `<li>${s}</li>`).join('')}</ul></div>
    </div></details>`;
}


// =====================================================================
// GROWTH PLAN
// =====================================================================
function renderGrowthPlanBuilder(mode) {
  const containerId = mode === 'client' ? 'client-growthplan-builder' : 'prac-growthplan-builder';
  const generateRowId = mode === 'client' ? 'client-growthplan-generate-row' : 'prac-growthplan-generate-row';
  const scores = mode === 'client' ? window.lastClientScores : window.lastSessionScores;
  if (!scores) return;
  document.getElementById(containerId).innerHTML = ALL_DOMAINS.map(d => `
    <div class="domain-card" id="cp-card-${mode}-${d.key}" style="--domain-color:${d.color};border-left-color:${d.color};">
      <div class="domain-header">
        <div class="card-head">${partIcon(d, 30)}<div><div class="domain-name" style="color:${d.color};">${d.part}</div><div class="card-sub">${d.name}</div></div></div>
        <div class="domain-score-display" style="color:${d.color};">${scores[d.key]}/10</div>
      </div>
      <div class="practice-picker">
        <div class="practice-picker-label">${(n => `Suggested: about ${n} practices`)(oakSuggest(scores[d.key]))}</div>
        <div class="practice-list" id="cp-list-${mode}-${d.key}">${d.restore.map((r, i) => `
          <div class="practice-item" data-i="${i}">
            <label class="practice-option">
              <input type="checkbox" class="sq-pick-box" name="cp-${mode}-${d.key}" value="${r[0]}" onchange="enforcePracticeLimit(this,'${mode}','${d.key}')">
              <span class="practice-option-text"><strong>${r[0]}.</strong> ${r[1]}${practiceMeta(d.key, r[0])}</span>
            </label>
            <button type="button" class="guide-toggle" aria-expanded="false" onclick="toggleGuide(this)">How to do this &darr;</button>
            <div class="guide">${guideHtml(d.key, r[0], mode === 'client')}</div>
          </div>`).join('')}</div>
        <button type="button" class="btn btn-secondary btn-sm practice-more" id="cp-more-${mode}-${d.key}" onclick="oakRotNext('${mode}','${d.key}')" hidden></button>
        <div class="practice-limit-note">${oakSuggestNote(scores[d.key])} Choose as many as you like, or write your own below. Tap "How to do this" on any practice to learn more.</div>
        <input type="text" class="practice-custom" id="cp-${mode}-${d.key}-custom" aria-label="${d.part} custom practice" placeholder="Your own practice or next step...">
        ${shelfHtml(d.key)}
      </div>
    </div>`).join('');
  ALL_DOMAINS.forEach(d => oakRotApply(mode, d.key));
  document.getElementById(generateRowId).style.display = 'flex';
  document.getElementById(mode === 'client' ? 'client-growthplan-doc' : 'prac-growthplan-doc').innerHTML = '';
}

function generateGrowthPlanDoc(mode) {
  const docId = mode === 'client' ? 'client-growthplan-doc' : 'prac-growthplan-doc';
  const scores = mode === 'client' ? window.lastClientScores : window.lastSessionScores;
  if (!scores) return;
  const isClient = mode === 'client';
  const dateStr = isClient ? formatDate(null) : formatDate(document.getElementById('prac-date').value);
  const plan = collectGrowthPlan(mode);
  const unsure = (isClient && window.lastClientUnsure) || [];

  const domainsHtml = ALL_DOMAINS.map(d => {
    const { selected, custom } = plan[d.key];
    const story = featuredStory(d.key);
    const storyLine = '';
    return `
      <div class="growth-plan-domain">
        <div class="growth-plan-domain-header">
          <div class="growth-plan-domain-name" style="color:${d.color};">${d.part} <span style="font-size:15px;color:var(--ink-soft);font-style:italic;">${d.name}</span></div>
          <div class="growth-plan-domain-score">${stLevelLine(unsure.includes(d.key) ? null : scores[d.key])}</div>
        </div>
        <div class="growth-plan-practices">
          ${selected.length === 0 && !custom ? '<p style="font-size:14px;color:var(--ink-soft);font-style:italic;">No practices selected yet for this part.</p>' : ''}
          ${selected.map(s => `<div class="growth-plan-practice-item" style="--domain-color:${d.color};"><strong>${escapeHtml(s)}</strong></div><div class="growth-plan-guide" style="--domain-color:${d.color};">${guideHtml(d.key, s, isClient)}</div>`).join('')}
          ${custom ? `<div class="growth-plan-practice-item" style="--domain-color:${d.color};">${escapeHtml(custom)}</div>` : ''}
        </div>
        ${storyLine}
      </div>`;
  }).join('');

  const rawName = isClient ? document.getElementById('client-save-name').value.trim() : document.getElementById('prac-client-code').value.trim();
  const nameField = escapeHtml(rawName);
  const sheetId = docId + '-sheet';
  const groundedShort = 'growwithgrounded.com';

  document.getElementById(docId).innerHTML = `
    <div class="growth-plan-doc" id="${sheetId}" style="margin-top:24px;">
      <div class="growth-plan-header">
        <div class="growth-plan-header-logo">${document.querySelector('.foot-tree').outerHTML}</div>
        <div class="growth-plan-title">Sequoia Growth Plan</div>
        <div class="growth-plan-meta">${nameField ? nameField + ' &middot; ' : ''}${dateStr}</div>
      </div>
      ${domainsHtml}
      ${planHelpHtml()}
      <div class="growth-plan-next">
        <div class="growth-plan-next-label">Keep growing</div>
        <p><strong>Tend it every day.</strong> Your practices wait in the Today tab in Sequoia, ready to check off with a big checkmark. A short check-in each week and a full check-in every twelve weeks show how your tree is growing. Open Sequoia at growwithgrounded.com/sequoia</p>
      </div>
      <div class="growth-plan-footer">
        <p class="growth-plan-footer-link">More stories from the edge of life at ${groundedShort}</p>
        <p>&copy; ${new Date().getFullYear()} Chris Joy. All rights reserved. This growth plan was created with Sequoia by Grow With Grounded. Sequoia&trade; is a trademark of Chris Joy. Content and framework may not be copied, reproduced, or redistributed without permission.</p>
      </div>
    </div>
    <div class="btn-row no-print">
      <button class="btn btn-secondary" onclick="printGrowthPlan('${sheetId}')">Save or Print My Plan</button>
      ${isClient ? '<button class="btn btn-secondary" onclick="savePersonalFile()">Save My Results</button>' : ''}
    </div>
    ${isClient ? `<p class="soft-invite no-print">Want company while you keep this plan? <a class="text-link" href="${SUBSCRIBE_URL}" target="_blank" rel="noopener">Grounded.</a> sends a new story every Wednesday.</p>
    <div class="grove-next no-print"><div><strong>Ready to put this plan into practice?</strong> ${PROF ? 'Your practices are waiting in Today, ready to check off.' : 'Open or create your profile, and your practices show up in Today, ready to check off.'}</div><button class="btn btn-primary" onclick="${PROF ? "showView('client-today')" : 'profCreateDialog()'}">${PROF ? 'Go to Today' : 'Create a profile'}</button></div>` : ''}`;
  document.getElementById(sheetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast('Growth plan created below.');
}


// Help lines on the growth plan when the latest check-in flagged something (never lost).
function planHelpHtml() {
  const e = oakLatestEntry(), f = (e && e.flags) || [];
  if (!f.length && !(e && ['sometimes', 'often'].includes((e.safety || {}).direct))) return '';
  return `<div class="growth-plan-next sq-planhelp"><div class="growth-plan-next-label">Help Is Close</div>${linesHtml(f.includes('home'), true)}</div>`;
}

// =====================================================================
// RESULTS
// =====================================================================
function interpretResults(scores) {
  const entries = ALL_DOMAINS.map(d => ({ d, score: scores[d.key] })).sort((a, b) => b.score - a.score);
  const strongest = entries[0].d, weakest = entries[entries.length - 1].d;
  const care = entries.filter(e => e.score < 5).length, strong = entries.filter(e => e.score >= 8).length;
  const inner = ['roots', 'trunk', 'bark'].reduce((s, k) => s + scores[k], 0);
  const outer = ['branches', 'leaves', 'fruit'].reduce((s, k) => s + scores[k], 0);
  let balance;
  if (Math.abs(inner - outer) <= 3) balance = 'Your inner tree (roots, trunk, and bark) and your outer tree (branches, leaves, and fruit) are fairly well matched right now.';
  else if (inner > outer) balance = 'Your inner tree (roots, trunk, and bark) is stronger than your outer tree (branches, leaves, and fruit). You have real depth, but it may not be reaching the visible parts of your life yet.';
  else balance = 'Your outer tree (branches, leaves, and fruit) is stronger than your inner tree (roots, trunk, and bark). Life above ground looks full, but what holds and carries you may need tending.';
  let overall;
  if (!care && strong >= 4) overall = 'Your tree is strong and healthy across most parts. The work now is maintenance and depth, not rescue.';
  else if (care < 3) overall = 'Some parts of your tree are carrying more weight than others right now. This is common and workable. Tending your growing edges will relieve pressure on the parts holding the most.';
  else overall = 'Several parts of your tree are depleted right now, which means the healthy parts have less to draw on when one gets injured. This is a meaningful moment to be honest about where you need support, and to consider working with a counselor, chaplain, or trusted guide alongside this tool.';
  return `Your <strong>${strongest.part.toLowerCase()}</strong> (${strongest.name}) are the healthiest part of your tree right now, a real resource to draw on. Your biggest growing edge right now is your <strong>${weakest.part.toLowerCase()}</strong> (${weakest.name}), where your next growth begins. ${balance} ${overall}`
    .replace('Your <strong>trunk</strong> (Purpose) are', 'Your <strong>trunk</strong> (Purpose) is')
    .replace('Your <strong>bark</strong> (Mind and feelings) are', 'Your <strong>bark</strong> (Mind and feelings) is')
    .replace('Your <strong>fruit</strong> (Hope) are', 'Your <strong>fruit</strong> (Hope) is')
    .replace('Your <strong>trunk</strong> (Purpose) need ', 'Your <strong>trunk</strong> (Purpose) needs ')
    .replace('Your <strong>bark</strong> (Mind and feelings) need ', 'Your <strong>bark</strong> (Mind and feelings) needs ')
    .replace('Your <strong>fruit</strong> (Hope) need ', 'Your <strong>fruit</strong> (Hope) needs ');
}

function buildPersonalSections(scores, includeStories) {
  const entries = ALL_DOMAINS.map(d => ({ ...d, score: scores[d.key] })).sort((a, b) => b.score - a.score);
  const block = (d, cls, body) => `
      <div class="${cls}" style="--domain-color:${d.color};border-left-color:${d.color};">
        <div class="${cls}-title" style="color:${d.color};display:flex;align-items:center;gap:8px;">${partIcon(d, 22)} ${d.part} &middot; ${d.name} &middot; ${stLevelLine(d.score)}</div>
        ${body}
      </div>`;
  let html = `<div class="personal-section"><div class="personal-section-title">Your strongest parts, and how to lean on them</div>`;
  entries.slice(0, 2).forEach(d => { html += block(d, 'strength-block', `<p>${d.strength_msg}</p>`); });
  html += `</div><div class="personal-section"><div class="personal-section-title">Where your tree needs tending</div>`;
  entries.slice(-2).reverse().forEach((d, gi) => {
    html += block(d, 'growth-block', `<ul>${d.growth_steps.map(s => `<li>${s}</li>`).join('')}</ul>${includeStories && gi === 0 ? storyCardHtml(d) : ''}`);
  });
  return html + `</div>`;
}

function inviteHtml() {
  return `<p class="quiet-sub">New stories from the bedside arrive free every Wednesday. <a class="text-link" href="${SUBSCRIBE_URL}" target="_blank" rel="noopener">Subscribe to Grounded.</a></p>`;
}

// Flagged answers from this check-in: alone, hope, home. Quick check-ins have none
// (question 1 of each part is never a flag question).

// Flagged answers from this check-in: alone, hope, home. Quick check-ins have none
// (question 1 of each part is never a flag question).
function stFlagsNow() {
  if (ST_QUICK) return [];
  const out = [];
  Object.keys(QUESTIONS).forEach(k => (QUESTIONS[k] || []).forEach((q, i) => {
    const a = (ST_ANS[k] || {})[i];
    if (q.flag && a && ST_FLAGS[q.flag] && ST_FLAGS[q.flag].on.includes(a) && !out.includes(q.flag)) out.push(q.flag);
  }));
  return out;
}
function flagBoxHtml(flags, helperSet) {
  if (!flags.length) return '';
  return `<div class="flag-box" role="note"><h3>Worth tending</h3>${flags.map(f => `<p><strong>${escapeHtml(ST_FLAGS[f].title)}.</strong> ${escapeHtml(helperSet && ST_FLAGS[f].helperNote ? ST_FLAGS[f].helperNote : ST_FLAGS[f].note)}</p>`).join('')}
    ${linesHtml(flags.includes('home'), true)}
    <p><button type="button" class="text-btn" onclick="showCalm('${flags.includes('home') ? 'home' : ''}')">See all help lines</button></p></div>`;
}

function calculateResults(mode) {
  const prefix = 'client';
  const scores = {}, reflections = {}, unsure = [];
  ALL_DOMAINS.forEach(d => {
    let sc;
    if (ST_QUICK) { const o = Q_OPTS.find(x => x[0] === (ST_ANS['quick_' + d.key] || {})[0]); sc = o && o[2] !== null ? Math.round(1 + 9 * o[2] / 3) : null; }
    else sc = partScore(d.key, ST_ANS[d.key] || {});
    if (sc == null) { unsure.push(d.key); sc = 5; }   // drawn as a middle shade, shown as "Not sure yet"
    scores[d.key] = sc;
    const notes = document.getElementById(`${prefix}-${d.key}-notes`);
    reflections[d.key] = notes ? notes.value : '';
  });
  const shown = k => unsure.includes(k) ? null : scores[k];
  const flags = stFlagsNow();
  const by = CK.by, helperName = by === 'self' ? '' : ((window.GGP && GGP.active()) || {}).name || '';
  const self = by === 'self';
  const reminder = self ? 'Come back and take this check-in again in a few weeks. Trees grow slowly, and growth is easiest to see over time.'
    : by === 'helper' ? 'Your own check-in is kept in your profile. Caring for yourself helps the person you help.'
    : by === 'observed' ? 'Kept apart from ' + CK.name + '\'s own check-ins. It never adds to their tree.'
    : 'Saved to ' + CK.name + '\'s tree, marked as taken with you.';
  const whoNote = by === 'tapped' ? `<p class="sq-who">${escapeHtml(CK.name)} answered, and ${escapeHtml(helperName)} tapped.</p>` : by === 'observed' ? `<p class="sq-who">${escapeHtml(helperName)}, answering from what you see in ${escapeHtml(CK.name)}.</p>` : by === 'helper' ? `<p class="sq-who">Your own check-in, as ${escapeHtml(CK.name)}'s helper.</p>` : '';

  const html = `
    <div class="results-summary">
      ${whoNote}
      <div class="tree-result-wrap"><div id="${prefix}-results-tree" style="width:100%;max-width:320px;"></div></div>
      <p class="tree-caption">Each part of the tree is shaded by its score. The fuller the color, the healthier that part.${self ? ' Tap a part to work on it in your growth plan.' : ''}</p>
      <div class="lvl-list">
        ${ALL_DOMAINS.map(d => `<div class="lvl-row" style="--domain-color:${d.color};">${partIcon(d, 20)}<b style="color:${d.color};">${d.part} <span style="font-weight:500;color:var(--ink-soft);">${d.name}</span></b><span class="lvl-pill">${stLevelLine(shown(d.key))}</span>${shown(d.key) != null && shown(d.key) < 5 ? '<p class="lvl-tend">This growing edge is where the next growth begins.</p>' : ''}</div>`).join('')}
      </div>
      ${ST_QUICK ? '<p class="tree-caption">A quick check-in asks one question for each part. Quick check-ins are compared only with other quick check-ins.</p>' : ''}
      ${by === 'observed' ? '' : `<div class="interpretation">${interpretResults(scores)}</div>`}
      ${flagBoxHtml(flags, by === 'helper')}
    </div>
    ${self ? buildPersonalSections(Object.fromEntries(ALL_DOMAINS.map(d => [d.key, scores[d.key]])), true) + lcSuggestHtml(scores, mode) : ''}
    <div class="reminder-banner"><p>${escapeHtml(reminder)}</p></div>
    <div class="btn-row">
      ${self ? `<button class="btn btn-primary" onclick="showView('client-growthplan')">Build My Growth Plan</button>` : `<button class="btn btn-primary" onclick="${by === 'helper' ? "helpBack()" : "showView('client-today')"}">${by === 'helper' ? 'Back to My Own Sequoia' : 'Back to ' + escapeHtml(CK.name) + '\'s Tree'}</button>`}
    </div>
    ${self ? '<div id="client-save-box"></div>' + inviteHtml() : ''}`;

  const goToGrowthPlanPart = key => {
    showView('client-growthplan');
    const card = document.getElementById(`cp-card-client-${key}`);
    if (card) setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  };

  document.getElementById('client-results-content').innerHTML = html;
  const safety = by === 'observed' ? { observed: ST_SAFE.observed || 'skipped' } : by === 'helper' ? { helper: ST_SAFE.helper || 'skipped' } : { opener: ST_SAFE.opener || 'skipped', direct: ST_SAFE.direct || 'skipped' };
  const entry = { id: Date.now().toString(36), date: new Date().toISOString().split('T')[0], std: ST_STD, scores, unsure, reflections, flags, safety, growthPlan: {}, type: ST_QUICK ? 'quick' : 'full', answers: ST_QUICK ? null : JSON.parse(JSON.stringify(ST_ANS)), by, helper: helperName };
  if (by === 'observed') entry.kind = 'observed';
  if (self) {
    window.lastClientScores = scores;
    window.lastClientUnsure = unsure;
    window.lastClientReflections = reflections;
    window.currentClientEntry = entry;
    showView('client-results');
    renderGrowthPlanBuilder('client');
    if (PROF) { const c = JSON.parse(JSON.stringify(entry)); personalHistory.push(c); sortEntries(personalHistory); profPersist(); }
    if (PROF && !ST_QUICK && window.GGTend) { const msg = GGTend.onFullCheckin(entry); if (msg) setTimeout(() => showToast(msg), 900); }
    oakPrefillPlan();
    renderSaveBox();
    renderProgress();
  } else if (by === 'helper') {
    showView('client-results');
    if (PROF && window.GGP) { const d = GGP.data(PROF.id, 'sequoia'); d.helperCheckins = (d.helperCheckins || []).concat([Object.assign({ for: CK.forId }, entry)]); GGP.save(PROF.id); }
  } else {
    showView('client-results');
    if (CK.forId && window.GGP && GGP.isOpen(CK.forId)) { const d = GGP.data(CK.forId, 'sequoia'); if (!Array.isArray(d.history)) d.history = []; d.history.push(entry); sortEntries(d.history); GGP.save(CK.forId).then(() => showToast(by === 'observed' ? 'Saved, kept apart from their own check-ins.' : 'Saved to ' + CK.name + '\'s tree.')); }
  }
  mountTree(`${prefix}-results-tree`, { variant: 'score', scores, interactive: self, seam: '#2C1810', assemble: true }, self ? goToGrowthPlanPart : null);
}


// =====================================================================
// NAVIGATION: seven tabs. Each view belongs to one tab.
// =====================================================================
const VIEW_TAB = { 'client-today': 'today', 'client-intro': 'today', 'client-week': 'week', 'client-season': 'season', 'client-assess': 'season', 'client-results': 'season', 'client-progress': 'season', 'client-growthplan': 'plan', 'client-legacy': 'legacy', 'client-life': 'guides' };
function showView(id, btn) {
  const navId = id.startsWith('client') ? 'client-nav' : null;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (navId) {
    const tab = VIEW_TAB[id];
    document.querySelectorAll(`#${navId} .nav-btn`).forEach(b => { const on = b.getAttribute('data-tab') === tab; b.classList.toggle('active', on); if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
  }
  if (id === 'client-life') renderLC('client');
  if (id === 'client-legacy') renderLegacy();
  if (id === 'client-growthplan') { if (HELP) renderHelpPlan(); else oakPlanOpen(); }
  if (id === 'client-today' || id === 'client-week' || id === 'client-season') { if (HELP) renderHelpTabs(); else if (window.GGTend) GGTend.render(); }
  renderHelpBanner();
  if (navId) scrollToViewTop(id, false, false);
}
function goHome() { showView('client-today'); }
function toggleRestore(id, btn) {
  const open = document.getElementById(id + '-restore').classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

// =====================================================================
// THE GAME LAYER: big checkmarks, kind words, the simple graph, and a
// gentle pause. Never streaks, never anything taken away.
// =====================================================================
const KIND_WORDS = [
  'Well done. Small and steady is how a sequoia grows.',
  'That counts. Thank you for tending yourself today.',
  'Done. Your tree is better for it.',
  'Good work. A little each day adds up over a long life.',
  'Checked off. You showed up for yourself today.',
  'Well tended. Rest is part of the work too.',
  'That is one more good thing in today.',
  'Nicely done. Roots grow where no one can see them.',
  'Done. Be as kind to yourself as you are to others.',
  'Good. Some days, one practice is the whole job.',
  'Well done. Every ring on a tree started as an ordinary day.',
  'Thank you for taking this time. It matters.'
];
function kindWord(n) { const day = Math.floor(Date.now() / 86400000); return KIND_WORDS[(day * 7 + (n || 0)) % KIND_WORDS.length]; }
function sqCheer(text) {
  let el = document.getElementById('sq-cheer');
  if (!el) { el = document.createElement('div'); el.id = 'sq-cheer'; el.className = 'sq-cheer'; el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite'); document.body.appendChild(el); }
  el.innerHTML = `<svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="var(--gold)"/><path d="M18 33l9 9 19-20" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg><p>${escapeHtml(text)}</p>`;
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
  clearTimeout(sqCheer.t); sqCheer.t = setTimeout(() => el.classList.remove('show'), 3600);
}
// The pause: while a check-in in the last two weeks flagged losing hope or feeling alone
// (or the safety step asked for care), the tree holds as it is. Nothing dries or droops.
function sqPause() {
  const cut = new Date(Date.now() - 14 * 86400000).toISOString().slice(0, 10);
  return (personalHistory || []).some(e => e && e.date >= cut && e.kind !== 'observed' && (
    (e.flags || []).some(f => f === 'hope' || f === 'alone') ||
    ['sometimes', 'often'].includes((e.safety || {}).direct) || ['often', 'always'].includes((e.safety || {}).opener)));
}
function todayKindHtml(s) {
  const n = window.GGTend ? GGTend.partsOn(new Date().toISOString().slice(0, 10)) : 0;
  const lineA = sqPause() ? 'Your tree is holding still with you this season. Tend it when you can. Nothing will be lost.' : n ? kindWord(n) : 'One practice is enough to start. A big checkmark is waiting.';
  return `<div class="gt-card sq-kind"><p class="sq-kind-line">${escapeHtml(lineA)}</p>${n ? `<p class="gt-small">${n} of 6 parts tended today.</p>` : ''}</div>` + bringOakHtml();
}
// The simple graph: days tended each week, and each part's level at each check-in.
function pad2(n) { return String(n).padStart(2, '0'); }
function dkey(d) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
function weeksTended(n) {
  const out = [], now = new Date(), back = (now.getDay() + 6) % 7, mon = new Date(now.getFullYear(), now.getMonth(), now.getDate() - back);
  for (let w = n - 1; w >= 0; w--) {
    let c = 0; const start = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() - w * 7);
    for (let i = 0; i < 7; i++) { const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i); if (window.GGTend && GGTend.tended(dkey(d))) c++; }
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
  const full = (list || []).filter(e => e && e.scores && e.kind !== 'observed' && e.type !== 'quick').slice(-8);
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
  return `<div class="sq-graph-box"><h4>Your Parts Over Time</h4><p class="gt-small">One point for each full check-in, oldest on the left. The dashed lines mark Steady and Strong.</p>${rows}</div>`;
}
function graphCardHtml() {
  return `<div class="gt-card sq-graphs"><h3>Your Growth Over Time</h3>${daysGraphHtml()}${levelsGraphHtml(personalHistory)}</div>`;
}
// Bring my Oak check-ins: a one-time copy. The Oak record stays whole.
function bringOakHtml() {
  if (!PROF || !window.GGP || HELP) return '';
  const oak = GGP.data(PROF.id, 'oak'), sq = GGP.data(PROF.id, 'sequoia');
  const n = ((oak && oak.history) || []).filter(e => e && e.scores).length;
  if (!n || sq.oakBrought) return '';
  return `<div class="gt-card sq-bring"><h3>Bring My Oak Check-ins</h3><p>You have ${n} check-in${n === 1 ? '' : 's'} saved in Oak. Copy them here so your Sequoia tree shows your whole story. Oak keeps its own copy.</p><div class="btn-row"><button class="btn btn-primary btn-sm" onclick="bringOak()">Bring Them Here</button><button class="btn btn-secondary btn-sm" onclick="bringOak(true)">Not Now</button></div></div>`;
}
function bringOak(skip) {
  if (!PROF || !window.GGP) return;
  const oak = GGP.data(PROF.id, 'oak'), sq = GGP.data(PROF.id, 'sequoia');
  if (!skip) {
    const ids = new Set(personalHistory.map(e => e.id));
    ((oak && oak.history) || []).forEach(e => { if (e && e.scores && !ids.has(e.id)) { const c = JSON.parse(JSON.stringify(e)); c.from = 'oak'; personalHistory.push(c); } });
    sortEntries(personalHistory);
  }
  sq.oakBrought = new Date().toISOString().slice(0, 10);
  profPersist().then(() => { showToast(skip ? 'You can bring them any time from Settings.' : 'Your Oak check-ins are here now.'); if (window.GGTend) GGTend.render(); renderProgress(); });
}


// No limits on practices (Rebrand Session 4), only suggestions: about 3 for a Strong part,
// 4 for Steady, 5 for a Growing Edge. Choosing one now only refreshes that part's list.
function enforcePracticeLimit(el, mode, key) { oakRotApply(mode, key, el && !el.checked ? el : null); }

// Six at a time (BLD 725): each part shows every chosen practice first, then up to 6
// unchosen ones in the usual order. Show Me Others brings the next 6, around to the
// first set after the last. The place in the rotation lives in memory only.
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
  // Taking one out keeps it in view: the list turns to the set it now belongs to.
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

// App-ready: a real PDF for the share sheet (text, email, save), with Print as a backup.
function printGrowthPlan(sheetId) {
  const sheet = document.getElementById(sheetId);
  if (!sheet) return;
  if (!window.GGApp) { printGrowthPlanNow(sheetId); return; }
  const guide = /lc-article/.test(sheetId), h = sheet.querySelector('h2,h1,.growth-plan-title');
  GGApp.sheet({ title: guide ? (h ? h.textContent : 'This guide') : 'Sequoia growth plan', file: guide ? 'sequoia-guide.pdf' : 'sequoia-growth-plan.pdf', print: () => printGrowthPlanNow(sheetId),
    blocks: () => ggPdfFromEl(sheet, { rows: '.growth-plan-domain-header', eyebrow: 'Sequoia by Grow With Grounded', foot: 'Sequoia(TM) by Grow With Grounded. growwithgrounded.com' }) });
}
function printGrowthPlanNow(sheetId) {
  document.querySelectorAll('.print-target').forEach(el => el.classList.remove('print-target'));
  const sheet = document.getElementById(sheetId);
  if (!sheet) return;
  sheet.classList.add('print-target');
  window.print();
}

// ---------- GROUNDED STORIES ----------
function featuredStory(key) {
  const list = STORIES[key] || [];
  return list.length ? list[0] : null;
}

function findStory(title) {
  for (const key in STORIES) {
    const s = STORIES[key].find(x => x.title === title);
    if (s) return s;
  }
  return null;
}

function storyLinkHtml(s) {
  return `<a href="${s.url || GROUNDED_URL}" target="_blank" rel="noopener">${s.url ? 'Read the full story' : 'Read more on Grounded'}</a>`;
}

function storyCardHtml(d) {
  const s = featuredStory(d.key);
  if (!s) return '';
  return `
    <div class="story-card" style="--domain-color:${d.color};border-left-color:${d.color};">
      <div class="story-card-label">From Grounded</div>
      <div class="story-card-title">${s.title}</div>
      <div class="story-card-snippet">&ldquo;${s.snippet}&rdquo;</div>
      ${storyLinkHtml(s)}
    </div>`;
}

function storyLinksHtml(d) {
  const list = STORIES[d.key] || [];
  if (!list.length) return '';
  return `<div class="story-links" style="--domain-color:${d.color};">
    <div class="story-links-label">Stories from Grounded</div>
    ${list.map(s => `<a href="${s.url || GROUNDED_URL}" target="_blank" rel="noopener">${s.title}</a>`).join('')}
  </div>`;
}

function quoteCardHtml(s) {
  return `<p class="quote-card-text">&ldquo;${s.snippet}&rdquo;</p>
    <p class="quote-card-source">From the story <em>${s.title}</em></p>
    <p class="quote-card-source">${storyLinkHtml(s)}</p>`;
}

function renderQuotes() {
  const pool = ROTATION_TITLES.map(findStory).filter(Boolean);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const about = document.getElementById('about-quote');
  const assess = document.getElementById('assess-quote');
  if (about && pool[0]) about.innerHTML = quoteCardHtml(pool[0]);
  if (assess && (pool[1] || pool[0])) assess.innerHTML = quoteCardHtml(pool[1] || pool[0]);
}



// =====================================================================
// WHEN LIFE CHANGES: Sequoia's own guides come next (BLD 734 to 735).
// Until then, the guides area offers Oak's guides that fit later life.
// =====================================================================
const OAK_FIT = ['retirement', 'spouse-death', 'loneliness', 'diagnosis', 'chronic', 'disability', 'caregiving', 'dementia-care', 'dying-loved', 'own-death', 'eol-plan', 'grief-days', 'moving', 'money-crisis', 'aging-parents', 'empty-nest', 'faith-crisis', 'spiritual-dryness', 'forgiveness', 'estrangement'];
const LC_SUGGEST = { roots: ['faith-crisis', 'spiritual-dryness', 'church-hurt'], trunk: ['retirement', 'lost', 'empty-nest'], bark: ['anxiety', 'sadness', 'grief-days'], branches: ['loneliness', 'spouse-death', 'estrangement'], leaves: ['chronic', 'diagnosis', 'disability'], fruit: ['sadness', 'lost', 'diagnosis'] };
const oakTopic = id => ((window.OAK_GUIDES || {}).topics || []).find(t => t.id === id);
const LCS = { client: { open: null } };
function renderLC() {
  const el = document.getElementById('client-life'); if (!el) return;
  const fit = OAK_FIT.map(oakTopic).filter(Boolean);
  el.innerHTML = `<div class="lc-head">
      <p class="eyebrow">When Life Changes</p>
      <h2 class="section-title" style="margin-top:4px">Guides for this season of life</h2>
    </div>
    <div class="invite sq-coming"><div class="invite-title">Guides for this season of life are coming next</div>
      <p>Guides written for later life, each with a view for when you are going through it and one for when you are helping someone else. Until they are ready, these guides in Oak fit many of the changes a long life brings.</p></div>
    <div class="lc-grid">${fit.map(t => `<article class="lc-card" style="--rc:var(--gold)">
        <span class="lc-label">Guide in Oak</span>
        <h4>${escapeHtml(t.title)}</h4>
        <ul>${(t.quick || []).slice(0, 2).map(x => '<li>' + escapeHtml(x) + '</li>').join('')}</ul>
        <a class="btn btn-secondary" href="/oak/#life=${encodeURIComponent(t.id)}">Open in Oak</a>
      </article>`).join('')}</div>
    <p class="lc-note">These guides offer general spiritual and emotional support drawn from chaplaincy and trusted grief, mental health, and caregiving organizations. They are not therapy, medical care, or legal advice. In an emergency, call 911. For a mental health crisis, call or text 988. Veterans, call 988 and press 1.</p>`;
}
function lcSuggestHtml(scores) {
  const low = PART_ORDER.filter(k => scores[k] <= 4).sort((a, b) => scores[a] - scores[b]);
  if (!low.length) return '';
  const ids = [];
  low.forEach(k => (LC_SUGGEST[k] || []).forEach(id => { if (!ids.includes(id)) ids.push(id); }));
  const picks = ids.slice(0, 5).map(oakTopic).filter(Boolean);
  if (!picks.length) return '';
  const crisis = scores.fruit <= 2 ? `<p><b>If you are having thoughts of ending your life, call or text 988 now. Veterans, call 988 and press 1.</b></p>` : '';
  return `<div class="lc-suggest no-print"><h3>When Life Changes</h3>
    <p>Some parts of your tree are carrying a lot right now. These guides may help you find words and next steps. They open in Oak for now.</p>
    ${crisis}<div class="lc-links">${picks.map(t => `<a class="sq-chip" href="/oak/#life=${encodeURIComponent(t.id)}">${escapeHtml(t.title)}</a>`).join('')}<button type="button" class="sq-chip" onclick="showView('client-life')">More guides</button></div></div>`;
}


// =====================================================================
// TENDING: Today, Week, and Season (/shared/gg-tend.js)
// =====================================================================
function oakLatestEntry() {
  const list = (personalHistory || []).filter(e => e && e.scores && e.kind !== 'observed');
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
  if (HELP) { renderHelpPlan(); return; }
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
const TEND_CFG = {
  libAge: () => 'sequoia',
  profileId: () => PROF ? PROF.id : null,
  tool: 'sequoia', toolName: 'Sequoia',
  els: { today: 'client-today', week: 'client-week', season: 'client-season' },
  parts: ALL_DOMAINS.map(d => ({ key: d.key, part: d.part, name: d.name, color: d.color })),
  moveKey: 'leaves',
  journey: ((window.GGJourney || {}).AGES || {}).sequoia,
  tree: { shape: 'tall', fruit: 'cone', fruitColor: '#8A5A2B', trunk: '#7A3420', trunkBare: '#6B4A3A',
    pal: [['#2F5232', '#46703F', '#6E9455'], ['#5E6A3E', '#87915C', '#ABB180'], ['#5C5236', '#7E7048', '#9C8C5E']] },
  partIcon: key => partIcon(DOMAIN_BY_KEY[key], 22),
  questions: () => MAIN_Q,
  answers: Q_OPTS,
  weekStem: 'This past week, how often have you...',
  practiceInfo: (key, name) => {
    const d = DOMAIN_BY_KEY[key], r = d && d.restore.find(x => x[0] === name), g = GUIDES[key + '|' + name];
    return { desc: r ? r[1] : '', guide: guideHtml(key, name, true), hard: g ? (g.adapt || g.hard) : '' };
  },
  history: () => (personalHistory || []).filter(e => e && e.kind !== 'observed'),
  hasResults: () => !!window.currentClientEntry,
  toast: m => showToast(m),
  profileHtml: () => oakProfileHtml(),
  extraSettings: () => helperSettingsHtml(),
  lockedHtml: () => oakAdults().length ? `<div class="gt-card gt-empty"><h3>Your tree grows in your profile</h3><p>${oakAdults().length > 1 ? 'Choose your picture above, then enter your passcode.' : 'Open your profile above to see your tree and today\'s practices.'} Each person's tree stays locked in their own profile on this device.</p></div>` : `<div class="gt-card gt-empty"><h3>Your tree grows in your profile</h3><p>Daily tending is saved inside a private Grounded profile on this device, locked with a passcode only you know. Nothing is sent anywhere.</p><div class="btn-row"><button class="btn btn-primary" onclick="profCreateDialog()">Create a profile</button><button class="btn btn-secondary" onclick="startCheckin()">Begin a check-in first</button></div></div>`,
  todayExtra: s => todayKindHtml(s),
  seasonExtra: () => graphCardHtml(),
  pause: () => sqPause(),
  pauseLine: 'Your tree is holding still with you. It will not dry out while you get support.',
  onCheck: (done, key, s, parts, before) => {
    if (!done) return;
    sqCheer(parts >= 6 ? 'All six parts tended today. That is a full day.' : kindWord(parts));
  },
  store: {
    get: () => { if (!PROF || !window.GGP) return null; const d = GGP.data(PROF.id, 'sequoia'); if (!d.tend || typeof d.tend !== 'object') d.tend = {}; return d.tend; },
    save: () => (PROF && window.GGP) ? GGP.save(PROF.id) : Promise.resolve()
  },
  actions: {
    fullCheckin: () => startCheckin(), quickCheckin: () => startQuick(),
    results: () => showView('client-results'), progress: () => showView('client-progress'),
    plan: () => showView('client-growthplan'), about: () => showView('client-intro'),
    createProfile: () => profCreateDialog(), openProfile: () => oakOpenAny(),
    lock: () => profLock(), textSize: () => cycleTextSize()
  }
};
if (window.GGTend) GGTend.init(TEND_CFG);
setTimeout(() => { if (window.GGTend && !HELP) GGTend.render(); }, 0);


window.personalHistory = [];
window.personalFileLoaded = false;
setTimeout(() => { if (typeof profResume === 'function') profResume(); }, 0);
window.currentClientEntry = null;

function collectGrowthPlan(mode) {
  const plan = {};
  ALL_DOMAINS.forEach(d => {
    const selected = Array.from(document.querySelectorAll(`input[name="cp-${mode}-${d.key}"]:checked`)).map(c => c.value);
    const customEl = document.getElementById(`cp-${mode}-${d.key}-custom`);
    plan[d.key] = { selected, custom: customEl ? customEl.value.trim() : '' };
  });
  return plan;
}

function sortEntries(list) {
  list.sort((a, b) => String(a.date).localeCompare(String(b.date)) || String(a.id).localeCompare(String(b.id)));
  return list;
}

function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function openPersonalFilePicker() {
  document.getElementById('personal-file-input').click();
}



// =====================================================================
// PROFILES: Grounded profiles, shared by every page (/shared/gg-profiles.js)
// Sequoia keeps its record in the profile's locked vault under "sequoia".
// Any grown-up profile opened here tends a Sequoia tree. The profile's tree
// choice (Oak or Sequoia, for anyone 55 or older) sets where "My tree" opens.
// =====================================================================
let PROF = null; // { id, name, avatar, age }
let HELP = null; // the id of the person a helper is helping, while in helper view
function sqRec(id) { const d = GGP.data(id, 'sequoia'); if (!Array.isArray(d.history)) d.history = []; return d; }
function profSync() {
  const a = window.GGP && GGP.active();
  if (a && a.age === 'adult') {
    const d = sqRec(a.id);
    PROF = { id: a.id, name: a.name, avatar: a.avatar, age: a.age };
    window.personalHistory = d.history.slice(); personalHistory = window.personalHistory;
    window.personalFileLoaded = true;
    if (HELP && !(GGP.helping() || []).includes(HELP)) HELP = null;
  } else if (PROF || HELP) {
    PROF = null; HELP = null;
    window.personalHistory = []; personalHistory = window.personalHistory;
    window.personalFileLoaded = false; window.currentClientEntry = null;
  }
  renderProfileBar(); renderSaveBox(); renderProgress();
  if (HELP) renderHelpTabs(); else if (window.GGTend) GGTend.render();
  renderHelpBanner();
  if (document.getElementById('client-growthplan').classList.contains('active')) { if (HELP) renderHelpPlan(); else oakPlanOpen(); }
  if (document.getElementById('client-legacy').classList.contains('active')) renderLegacy();
  helpFromHash();
}
async function profPersist() {
  if (!PROF || !window.GGP) return;
  sqRec(PROF.id).history = JSON.parse(JSON.stringify(personalHistory));
  await GGP.save(PROF.id);
}
function profLock() { if (window.GGP) GGP.lock().then(() => showToast('Locked. Your profile is safe on this device.')); }
function helpedWithSequoia() {
  if (!PROF || !window.GGP || !GGP.helping) return [];
  return GGP.helping().filter(id => GGP.isOpen(id) && GGP.data(id, 'sequoia').helpersOn).map(id => GGP.get(id)).filter(Boolean);
}
function renderProfileBar() {
  const bar = document.getElementById('st-profile-bar'); if (!bar) return;
  const a = window.GGP && GGP.active();
  if (a && a.age !== 'adult') {
    bar.innerHTML = `<div class="pbar"><div class="pbar-who"><strong>${escapeHtml(a.name)}</strong><span>Sequoia is written for older adults. ${a.age === 'maple' ? '<a href="/maple/">Maple</a> is made for kids.' : a.age === 'aspen' ? '<a href="/aspen/">Aspen</a> is made for middle schoolers.' : '<a href="/oak/">Oak</a> is where high schoolers tend their tree for now.'}</span></div><div class="pbar-act"><button type="button" class="btn btn-secondary btn-sm" onclick="oakSwitch()">Switch person</button></div></div>`;
    return;
  }
  if (PROF) {
    const t = new Date(a.until).toLocaleString(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit' });
    const tree = GGP.tree ? GGP.tree(a.id) : 'sequoia';
    const nudge = tree !== 'sequoia' ? `<p class="pbar-kids">Your profile's tree is Oak. If you are 55 or older, you can make Sequoia your tree, so My tree opens here. <button type="button" class="text-btn" onclick="makeSequoiaMine()">Make Sequoia my tree</button></p>` : '';
    const helps = helpedWithSequoia();
    const helpRow = helps.length ? `<div class="sq-helprow"><span>You help:</span>${helps.map(p => `<button type="button" class="btn ${HELP === p.id ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="helpOpen('${p.id}')">${escapeHtml(p.name)}</button>`).join('')}${HELP ? '<button type="button" class="btn btn-secondary btn-sm" onclick="helpBack()">My own Sequoia</button>' : ''}</div>` : '';
    bar.innerHTML = `<div class="pbar"><button type="button" class="pbar-pic" onclick="GGTend.openSettings()" aria-label="Profile and Settings">${GGAv.html(a.avatar, a.name, 44)}</button>
      <div class="pbar-who"><strong>${escapeHtml(a.name)}</strong><span>Saving to your Grounded profile on this device. Unlocked until ${t}.</span></div>
      <div class="pbar-act"><button type="button" class="btn btn-secondary btn-sm" onclick="GGTend.openSettings()">Settings</button><button type="button" class="btn btn-secondary btn-sm" onclick="profLock()">Lock</button></div>${nudge}${helpRow}</div>`;
  } else {
    bar.innerHTML = `<div class="pbar pbar-off">${oakWhoHtml('bar')}</div>`;
  }
}
function makeSequoiaMine() { if (PROF && window.GGP && GGP.setTree) { GGP.setTree(PROF.id, 'sequoia'); showToast('Sequoia is your tree now. You can change it in Manage my profile.'); renderProfileBar(); } }
/* Who's tending today? Every grown-up on this device keeps their own tree in their own locked
   profile. People who chose Sequoia come first. One grown-up skips the list and goes straight to their passcode. */
function oakAdults() {
  const list = window.GGP ? GGP.list().filter(p => p.age === 'adult').map(p => ({ id: p.id, name: p.name, avatar: p.avatar, tree: p.tree })) : [];
  return list.sort((a, b) => (a.tree === 'sequoia' ? 0 : 1) - (b.tree === 'sequoia' ? 0 : 1) || String(a.name).localeCompare(String(b.name)));
}
function oakYoung() { return window.GGP ? GGP.list().filter(p => p.age !== 'adult') : []; }
function oakWhoHtml(where) {
  const adults = oakAdults(), young = oakYoung();
  const kidsLine = young.length ? `<p class="pbar-kids">Kids, middle schoolers, and high schoolers tend their trees in <a href="/maple/">Maple</a>, <a href="/aspen/">Aspen</a>, and <a href="/oak/">Oak</a>.</p>` : '';
  if (!adults.length) {
    return `<div class="pbar-who"><strong>Save your progress on this device</strong><span>Create a private Grounded profile, locked with your own passcode. It works across every Grounded tool, and everyone on this device can have their own.</span></div>
      <div class="pbar-act"><button type="button" class="btn btn-primary btn-sm" onclick="profCreateDialog()">Create a profile</button><button type="button" class="btn btn-secondary btn-sm" onclick="GGTend.openSettings()">Settings</button></div>${kidsLine}`;
  }
  if (adults.length === 1) {
    const a = adults[0];
    return `<div class="pbar-who"><strong>Welcome back${a.name ? ', ' + escapeHtml(a.name) : ''}</strong><span>Open your profile to see your tree and today's practices.</span></div>
      <div class="pbar-act"><button type="button" class="btn btn-primary btn-sm" onclick="oakOpenWho(0)">Open my profile</button><button type="button" class="btn btn-secondary btn-sm" onclick="profCreateDialog()">Add a person</button></div>${kidsLine}`;
  }
  return `<div class="pbar-who"><strong>Who's tending today?</strong><span>Tap your picture, then enter your passcode. Each person's tree stays locked in their own profile.</span></div>
    <div class="oak-people">${adults.map((a, i) => `<button type="button" class="oak-person" onclick="oakOpenWho(${i})">${GGAv.html(a.avatar, a.name, 56)}<b>${escapeHtml(a.name)}</b></button>`).join('')}
      <button type="button" class="oak-person oak-add" onclick="profCreateDialog()"><span class="oak-plus" aria-hidden="true">+</span><b>Add a person</b></button></div>${kidsLine}`;
}
function oakOpenWho(i) {
  const a = oakAdults()[i]; if (!a || !window.GGP) return;
  GGP.openDialog({ id: a.id }).then(ok => { if (ok && window.currentClientEntry) setTimeout(savePersonalFile, 50); });
}
function oakOpenAny() {
  const n = oakAdults().length;
  if (n === 1) { oakOpenWho(0); return; }
  if (!n) { profCreateDialog(); return; }
  const b = document.getElementById('st-profile-bar'); if (b) b.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
// Switch person: lock this person first, then show who's tending.
function oakSwitch() {
  if (!window.GGP) return;
  if (window.GGTend) GGTend.closeSettings();
  GGP.lock().then(() => { showToast('Locked. Choose who is tending.'); const b = document.getElementById('st-profile-bar'); if (b) b.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
}
function oakProfileHtml() {
  const a = window.GGP && GGP.active();
  if (!a) return `<section><h3>Your Profile</h3><p>Open your profile, or create one, to keep your tree, practices, check-ins, and Legacy Book on this device.</p><div class="btn-row"><button class="btn btn-primary btn-sm" onclick="GGTend.closeSettings();oakOpenAny()">Open a profile</button><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();profCreateDialog()">Add a person</button></div></section>`;
  const tree = GGP.tree ? GGP.tree(a.id) : 'sequoia', oakN = PROF ? (((GGP.data(PROF.id, 'oak') || {}).history) || []).length : 0;
  return `<section><h3>Your Profile</h3><p class="gt-who">${GGAv.html(a.avatar, a.name, 44)}<b>${escapeHtml(a.name)}</b></p>
    <p class="gt-small">Your tree: <b>${tree === 'sequoia' ? 'Sequoia' : 'Oak'}</b>. Change it in Picture, passcode, and more.</p>
    <div class="btn-row"><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();GGP.manage()">Picture, passcode, and more</button><button class="btn btn-secondary btn-sm" onclick="oakSwitch()">Switch person</button><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();profLock()">Lock</button></div>
    ${oakN ? `<p class="gt-small">You have ${oakN} check-in${oakN === 1 ? '' : 's'} in Oak. <button type="button" class="text-btn" onclick="GGTend.closeSettings();bringOak()">Bring them into Sequoia</button></p>` : ''}
    <p class="gt-small">Everyone on this device can have their own tree. Switching locks yours first, so no one sees anyone else's.</p></section>`;
}
function profCreateDialog() {
  if (!window.GGP) return;
  GGP.createDialog({ age: 'adult', tree: 'sequoia', reason: window.currentClientEntry ? 'Your check-in, growth plan, and reflections will save to your profile, locked with a passcode only you know.' : '' }).then(ok => { if (ok && window.currentClientEntry) setTimeout(savePersonalFile, 50); });
}
function profBackup() { if (window.GGP) GGP.backup(); }
async function profResume() {
  if (!window.GGP) { renderProfileBar(); return; }
  GGP.on(type => { if (type === 'change' || type === 'data' || type === 'ready') profSync(); });
  await GGP.ready; profSync();
}


// =====================================================================
// HELPERS (the Willow model). Off unless the person turns on Add a Helper.
// A helper opens the person's Sequoia with their own passcode and sees only
// what the person shares. Faith answers and notes start private. Safety
// answers are never shown to a helper.
// =====================================================================
const SHARE_DEF = { tree: true, plan: true, legacy: false, faith: false, notes: false };
const SHARE_ROWS = [
  ['tree', 'How my tree is doing', 'The level of each part and the dates of check-ins. Never your answers.'],
  ['plan', 'My growth plan', 'The practices you chose, so a helper can do them with you.'],
  ['legacy', 'My Legacy Book', 'Your stories and letters. A helper can also write while you tell.'],
  ['faith', 'My Roots part', 'Your Roots level, and Roots practices in your plan. Off unless you turn it on.'],
  ['notes', 'My notes', 'Anything you wrote in "Sit with this" during a check-in.']
];
function shareOf(id) { const d = GGP.data(id, 'sequoia'); return Object.assign({}, SHARE_DEF, d.share || {}); }
function sees(what) { return !HELP || !!shareOf(HELP)[what]; }
function helperSettingsHtml() {
  if (!PROF || !window.GGP) return '';
  if (HELP) {
    const n = escapeHtml((GGP.get(HELP) || {}).name || 'They');
    return `<section id="gt-set-helpers"><h3>Helping ${n}</h3><p class="gt-small">${n} chooses what helpers see, in their own Sequoia settings. Their safety answers are never shared.</p><div class="btn-row"><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();helpBack()">Back to My Own Sequoia</button></div></section>`;
  }
  const d = GGP.data(PROF.id, 'sequoia'), on = !!d.helpersOn, sh = shareOf(PROF.id);
  const hs = (GGP.helpers(PROF.id) || []).map(id => GGP.get(id)).filter(Boolean);
  const can = GGP.list().filter(p => p.age === 'adult' && p.id !== PROF.id && !hs.some(x => x.id === p.id));
  return `<section id="gt-set-helpers"><h3>Add a Helper</h3>
    <p class="gt-small">A helper is someone you trust, like a grown child, a spouse, or a friend. They open your Sequoia with their own passcode, and they can sit with you for a check-in or write in your Legacy Book while you tell. This stays off unless you turn it on, and only you can turn it on.</p>
    <label class="gt-switch"><input type="checkbox" id="sq-helpers-on"${on ? ' checked' : ''} onchange="sqHelpersOn(this.checked)"> Let helpers open my Sequoia</label>
    ${on ? `<h4 class="sq-h4">What Helpers See</h4>${SHARE_ROWS.map(x => `<label class="gt-switch"><input type="checkbox"${sh[x[0]] ? ' checked' : ''} onchange="sqShare('${x[0]}',this.checked)"> <span><b>${escapeHtml(x[1])}</b><br><small>${escapeHtml(x[2])}</small></span></label>`).join('')}
      <p class="gt-small"><b>Your safety answers are never shared.</b></p>
      <h4 class="sq-h4">Your Helpers</h4>
      ${hs.length ? hs.map(x => `<p class="sq-helper">${GGAv.html(x.avatar, x.name, 32)}<b>${escapeHtml(x.name)}</b><button type="button" class="text-btn" onclick="dropHelper('${x.id}')">Remove</button></p>`).join('') : '<p class="gt-small">No helpers yet.</p>'}
      ${can.length ? `<label class="gt-small" for="sq-hid">Add a helper</label><select id="sq-hid" class="sq-select">${can.map(p => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('')}</select>
        <label class="gt-small" for="sq-hpass">Their own passcode (they type it)</label><input type="password" id="sq-hpass" class="sq-select" autocomplete="off">
        <div class="btn-row"><button type="button" class="btn btn-primary btn-sm" onclick="addHelperNow()">Add as a Helper</button></div>`
        : '<p class="gt-small">A helper first creates their own Grounded profile on this device (the profile button at the top of the page), then comes back here with you to be added.</p>'}` : ''}
  </section>`;
}
function reopenSettings(focus) { if (window.GGTend) { GGTend.openSettings(); const f = document.getElementById(focus || 'gt-set-helpers'); if (f) f.scrollIntoView({ block: 'start' }); } }
function sqHelpersOn(on) {
  if (!PROF) return;
  const d = GGP.data(PROF.id, 'sequoia'); d.helpersOn = !!on; if (on && !d.share) d.share = Object.assign({}, SHARE_DEF);
  GGP.save(PROF.id).then(() => { showToast(on ? 'Helpers can be added now. Choose what they see.' : 'Your Sequoia is closed to helpers.'); reopenSettings(); });
}
function sqShare(k, v) { if (!PROF) return; const d = GGP.data(PROF.id, 'sequoia'); d.share = Object.assign({}, SHARE_DEF, d.share || {}); d.share[k] = !!v; GGP.save(PROF.id); }
function addHelperNow() {
  const hid = (document.getElementById('sq-hid') || {}).value, pass = (document.getElementById('sq-hpass') || {}).value;
  if (!pass) { showToast('Your helper types their own passcode.'); return; }
  GGP.addHelper(PROF.id, hid, pass).then(() => { showToast(((GGP.get(hid) || {}).name || 'They') + ' is now a helper.'); reopenSettings(); }).catch(e => showToast(e && e.message ? e.message : 'That did not work. Try again.'));
}
function dropHelper(id) {
  const n = (GGP.get(id) || {}).name || 'this helper';
  if (!confirm('Remove ' + n + ' as a helper? They will no longer open your profile in Sequoia or Willow.')) return;
  GGP.removeHelper(PROF.id, id); showToast(n + ' is no longer a helper.'); reopenSettings();
}
// Helper view
function helpOpen(id) {
  if (!helpedWithSequoia().some(p => p.id === id)) return;
  HELP = id; window.currentClientEntry = null; renderProfileBar(); showView('client-today');
}
function helpBack() { HELP = null; setMode('self'); renderProfileBar(); showView('client-today'); }
function helpFromHash() {
  const m = /^#for=([A-Za-z0-9_-]+)/.exec(location.hash || ''); if (!m || !PROF) return;
  if (helpedWithSequoia().some(p => p.id === m[1])) { try { history.replaceState(null, '', location.pathname); } catch (e) {} helpOpen(m[1]); }
}
function renderHelpBanner() {
  const b = document.getElementById('sq-help-banner'); if (!b) return;
  if (!HELP) { b.innerHTML = ''; b.hidden = true; return; }
  const n = escapeHtml((GGP.get(HELP) || {}).name || 'them');
  b.hidden = false;
  b.innerHTML = `<p><b>You are helping ${n}.</b> You see only what ${n} chooses to share.</p><button type="button" class="btn btn-secondary btn-sm" onclick="helpBack()">Back to My Own Sequoia</button>`;
}
function helpLevels(e, sh) {
  return `<div class="lvl-list">${ALL_DOMAINS.filter(d => d.key !== 'roots' || sh.faith).map(d => `<div class="lvl-row" style="--domain-color:${d.color};">${partIcon(d, 20)}<b style="color:${d.color};">${d.part}</b><span class="lvl-pill">${stLevel(stShown(e, d.key))}</span></div>`).join('')}</div>`;
}
function renderHelpTabs() {
  if (!HELP) return;
  const p = GGP.get(HELP) || {}, n = escapeHtml(p.name || 'them'), d = sqRec(HELP), sh = shareOf(HELP);
  const own = d.history.filter(e => e && e.scores && e.kind !== 'observed'), last = own[own.length - 1];
  const seen = d.history.filter(e => e && e.kind === 'observed');
  const acts = `<div class="gt-card"><h3>Check In Together</h3><p>Sit with ${n} and tap the answers they give, or answer from what you see if they can no longer say. Every check-in is marked with who answered.</p>
    <div class="btn-row"><button class="btn btn-primary" onclick="startCheckin('tapped','${HELP}')">${n} Answers, I Tap</button><button class="btn btn-secondary" onclick="startQuick('tapped','${HELP}')">Quick Check-in Together</button><button class="btn btn-secondary" onclick="startCheckin('observed','${HELP}')">I'm Answering From What I See</button></div></div>
    <div class="gt-card"><h3>A Check-in for You</h3><p>Helping someone you love is a lot to carry. This one is about you, and it stays in your own profile.</p><div class="btn-row"><button class="btn btn-secondary" onclick="startCheckin('helper','${HELP}')">My Own Check-in as a Helper</button></div></div>`;
  const tree = sh.tree ? `<div class="gt-card"><h3>${n}'s Tree</h3>${last ? `<p class="gt-small">From the check-in on ${escapeHtml(last.date)}${last.by && last.by !== 'self' ? ', ' + escapeHtml((BY_LABEL[last.by] || '').toLowerCase()) : ''}.</p>${helpLevels(last, sh)}` : '<p>No check-ins yet.</p>'}
    ${own.length ? `<h4 class="sq-h4">Check-ins</h4><ul class="gt-hist">${own.slice().reverse().slice(0, 8).map(e => `<li><b>${escapeHtml(e.date)}</b><span>${e.type === 'quick' ? 'Quick' : 'Full'}${e.by && e.by !== 'self' ? ', ' + escapeHtml(BY_LABEL[e.by] || '') + (e.helper ? ' (' + escapeHtml(e.helper) + ')' : '') : ''}</span></li>`).join('')}</ul>` : ''}
    ${seen.length ? `<p class="gt-small">${seen.length} check-in${seen.length === 1 ? '' : 's'} answered from what a helper sees, kept apart.</p>` : ''}</div>` : `<div class="gt-card"><p>${n} keeps their tree private. You can still check in together.</p></div>`;
  const legacy = sh.legacy ? `<div class="gt-card"><h3>${n}'s Legacy Book</h3><p>Write while ${n} tells. Use their words, not yours.</p><div class="btn-row"><button class="btn btn-secondary" onclick="showView('client-legacy')">Open the Legacy Book</button></div></div>` : '';
  const todayEl = document.getElementById('client-today'), weekEl = document.getElementById('client-week'), seasonEl = document.getElementById('client-season');
  if (todayEl) todayEl.innerHTML = tree + acts + legacy;
  const rest = `<div class="gt-card"><p>${n}'s weeks and seasons stay on ${n}'s own screen. Here you can check in together, see what ${n} shares, and look after yourself.</p><div class="btn-row"><button class="btn btn-secondary" onclick="showView('client-today')">Back to Today</button></div></div>`;
  if (weekEl) weekEl.innerHTML = rest;
  if (seasonEl) seasonEl.innerHTML = rest;
}
function renderHelpPlan() {
  const box = document.getElementById('client-growthplan-builder'); if (!box || !HELP) return;
  const n = escapeHtml((GGP.get(HELP) || {}).name || 'them'), d = sqRec(HELP), sh = shareOf(HELP), plan = (d.tend && d.tend.plan) || null;
  document.getElementById('client-growthplan-generate-row').style.display = 'none';
  document.getElementById('client-growthplan-doc').innerHTML = '';
  if (!sh.plan) { box.innerHTML = `<p class="lead">${n} keeps their growth plan private.</p>`; return; }
  if (!plan) { box.innerHTML = `<p class="lead">${n} has not chosen practices yet.</p>`; return; }
  box.innerHTML = `<p class="lead">${n}'s practices. You can do them together.</p>` + ALL_DOMAINS.filter(dd => dd.key !== 'roots' || sh.faith).map(dd => {
    const x = plan[dd.key] || {}, names = (x.selected || []).concat(x.custom ? [x.custom] : [], (x.lib || []).map(l => l.n));
    if (!names.length) return '';
    return `<div class="domain-card" style="--domain-color:${dd.color};border-left-color:${dd.color};"><div class="card-head">${partIcon(dd, 26)}<div><div class="domain-name" style="color:${dd.color};">${dd.part}</div><div class="card-sub">${dd.name}</div></div></div><ul class="sq-planlist">${names.map(nm => `<li>${escapeHtml(nm)}</li>`).join('')}</ul></div>`;
  }).join('');
}


// =====================================================================
// THE LEGACY BOOK (built on the pattern of Willow's Cuttings)
// Chapters and prompts come from /sequoia/legacy.js. Answers are typed (the
// phone's own microphone key works in the box), saved locked in the person's
// profile, and every prompt can be skipped. Opt-in chapters stay closed until
// the person chooses to open them. Print or save a chapter as a PDF, and share
// chosen pages with family by hand. Nothing here is prefilled or rewritten.
// If the person later opens Willow, their written answers carry into Cuttings.
// =====================================================================
const LEG = window.SEQUOIA_LEGACY || { chapters: [], intro: [] };
const LG = { ch: null, edit: null, pick: false };
function legacyOwner() { return HELP || (PROF && PROF.id) || null; }
function legRec() {
  const id = legacyOwner(); if (!id || !window.GGP || !GGP.isOpen(id)) return null;
  const d = GGP.data(id, 'sequoia'); if (!d.legacy || typeof d.legacy !== 'object') d.legacy = {};
  if (!d.legacy.answers) d.legacy.answers = {}; if (!d.legacy.opened) d.legacy.opened = {};
  return d.legacy;
}
const legChapter = id => (LEG.chapters || []).find(c => c.id === id);
function legWritten(c, L) { return (c.prompts || []).filter(p => L.answers[p.id] && String(L.answers[p.id].text || '').trim()).length; }
function veteranLine(c, p) { return c.id === 'memories' || /military|served|service/i.test(p.t) ? '<p class="sq-care">Veterans: call 988 and press 1, or text 838255, any time.</p>' : ''; }
function renderLegacy() {
  const el = document.getElementById('client-legacy'); if (!el) return;
  const L = legRec(), who = HELP ? escapeHtml((GGP.get(HELP) || {}).name || 'them') : '';
  if (HELP && !shareOf(HELP).legacy) { el.innerHTML = `<div class="section-title">Legacy Book</div><p class="lead">${who} keeps their Legacy Book private.</p>`; return; }
  if (!L) {
    el.innerHTML = `<div class="section-title">Your Legacy Book</div>${(LEG.intro || []).slice(0, 2).map(t => `<p class="lead">${escapeHtml(t)}</p>`).join('')}
      <div class="gt-card gt-empty"><h3>Your book is kept in your profile</h3><p>The Legacy Book is saved inside a private Grounded profile on this device, locked with a passcode only you know, so no one else can read it. Nothing is sent anywhere.</p><div class="btn-row"><button class="btn btn-primary" onclick="${oakAdults().length ? 'oakOpenAny()' : 'profCreateDialog()'}">${oakAdults().length ? 'Open my profile' : 'Create a profile'}</button></div></div>`;
    return;
  }
  const c = LG.ch && legChapter(LG.ch);
  if (c) { el.innerHTML = legChapterHtml(c, L, who); return; }
  const total = (LEG.chapters || []).reduce((t, ch) => t + legWritten(ch, L), 0);
  el.innerHTML = `<div class="section-title">${HELP ? who + '\'s Legacy Book' : 'Your Legacy Book'}</div>
    ${HELP ? `<p class="lead">Write while ${who} tells. Use their words, not yours. What you write is marked as told to you.</p>` : (LEG.intro || []).map(t => `<p class="lead">${escapeHtml(t)}</p>`).join('')}
    <p class="sq-legcount">${total ? `${total} ${total === 1 ? 'page' : 'pages'} written so far.` : 'Nothing written yet. One story is enough to start.'}</p>
    <div class="sq-chapters">${(LEG.chapters || []).map(ch => { const n = legWritten(ch, L), closed = ch.optIn && !L.opened[ch.id];
      return `<button type="button" class="sq-chapter${closed ? ' closed' : ''}" onclick="legOpen('${ch.id}')"><b>${escapeHtml(ch.title)}</b><span>${closed ? 'Opens only when you choose' : n ? n + ' of ' + (ch.prompts || []).length + ' written' : (ch.prompts || []).length + ' prompts'}</span></button>`; }).join('')}</div>
    <div class="btn-row"><button class="btn btn-primary" onclick="legPickBook()">Save or Print My Book</button></div>
    ${LG.pick ? legPickHtml(L) : ''}
    <div id="sq-legsheet" class="sq-legsheet" aria-hidden="true"></div>
    <p class="gt-small sq-legfoot">Your book stays on this device, locked in your profile. You decide what to print or share, and with whom. If you later use Willow, what you write here comes along into Willow's Cuttings.</p>`;
}
function legChapterHtml(c, L, who) {
  const closed = c.optIn && !L.opened[c.id];
  let h = `<button type="button" class="lc-back" onclick="legOpen(null)">Back to all chapters</button>
    <h2 class="section-title" style="margin-top:10px">${escapeHtml(c.title)}</h2>${c.lead ? `<p class="lead">${escapeHtml(c.lead)}</p>` : ''}`;
  if (closed) return h + `<div class="sq-optin"><p>${escapeHtml(c.note || LEG.careLine || '')}</p>
      <ul class="calm-list sq-lines"><li><b>988 Suicide and Crisis Lifeline</b><a href="tel:988">Call 988</a> or <a href="sms:988">text 988</a>, any time. Veterans, call 988 and press 1.</li></ul>
      <div class="btn-row"><button class="btn btn-primary" onclick="legOptIn('${c.id}', true)">Open This Chapter</button><button class="btn btn-secondary" onclick="legOpen(null)">Not Now</button></div></div>`;
  h += `<p class="gt-small">Skip any prompt. Write a little or a lot. The microphone key on your phone's keyboard lets you speak instead of type.</p>`;
  h += (c.prompts || []).map(p => {
    const a = L.answers[p.id] || null, editing = LG.edit === p.id, has = a && String(a.text || '').trim();
    return `<article class="sq-prompt${has ? ' has' : ''}" id="lp-${p.id}">
      <h3>${escapeHtml(p.t)}</h3>${p.help ? `<p class="sq-help">${escapeHtml(p.help)}</p>` : ''}
      ${p.care ? `<p class="sq-care">${escapeHtml(LEG.careLine || '')}</p>` : ''}${veteranLine(c, p)}
      ${editing ? `<label class="gt-small" for="lt-${p.id}">Your words</label><textarea id="lt-${p.id}" class="reflection-area sq-legtext" rows="7" maxlength="20000">${escapeHtml(a ? a.text : '')}</textarea>
        <label class="gt-small" for="lw-${p.id}">Written down by (optional, if someone wrote while you told)</label><input type="text" id="lw-${p.id}" class="sq-select" maxlength="60" value="${escapeHtml(a ? a.told || '' : (HELP ? (PROF || {}).name || '' : ''))}">
        <div class="btn-row"><button class="btn btn-primary" onclick="legSave('${p.id}')">Save</button><button class="btn btn-secondary" onclick="LG.edit=null;renderLegacy()">Cancel</button>${has ? `<button class="btn btn-secondary" onclick="legDelete('${p.id}')">Remove</button>` : ''}</div>`
      : has ? `<div class="sq-legans">${escapeHtml(a.text).replace(/\n/g, '<br>')}</div><p class="gt-small">${escapeHtml(a.date || '')}${a.told ? ', told to ' + escapeHtml(a.told) : ''}</p><div class="btn-row"><button class="btn btn-secondary btn-sm" onclick="legEdit('${p.id}')">Edit</button></div>`
      : `<div class="btn-row"><button class="btn btn-secondary btn-sm" onclick="legEdit('${p.id}')">Write This One</button></div>`}
    </article>`;
  }).join('');
  h += `<div class="btn-row"><button class="btn btn-primary" onclick="legPrint(['${c.id}'])">Save or Print This Chapter</button>${c.optIn ? `<button class="btn btn-secondary" onclick="legOptIn('${c.id}', false)">Close This Chapter</button>` : ''}<button class="btn btn-secondary" onclick="legOpen(null)">Back to All Chapters</button></div>
    <div id="sq-legsheet" class="sq-legsheet" aria-hidden="true"></div>`;
  return h;
}
function legOpen(id) { LG.ch = id; LG.edit = null; LG.pick = false; renderLegacy(); scrollToViewTop('client-legacy', true, false); }
function legEdit(pid) { LG.edit = pid; renderLegacy(); const t = document.getElementById('lt-' + pid); if (t) { t.focus(); t.scrollIntoView({ block: 'center' }); } }
function legPersist() { const id = legacyOwner(); return id ? GGP.save(id) : Promise.resolve(); }
function legSave(pid) {
  const L = legRec(); if (!L) return;
  const text = (document.getElementById('lt-' + pid) || {}).value || '', told = ((document.getElementById('lw-' + pid) || {}).value || '').trim();
  const c = legChapter(LG.ch), p = c && (c.prompts || []).find(x => x.id === pid);
  if (!text.trim()) { delete L.answers[pid]; } else L.answers[pid] = { text: text.slice(0, 20000), told: told.slice(0, 60), date: new Date().toISOString().slice(0, 10), q: p ? p.t : '' };
  LG.edit = null;
  legPersist().then(() => { renderLegacy(); showToast(text.trim() ? 'Kept in your Legacy Book.' : 'Left blank. You can come back any time.'); const a = document.getElementById('lp-' + pid); if (a) a.scrollIntoView({ block: 'center' }); });
}
function legDelete(pid) {
  if (!confirm('Remove what is written here? This cannot be undone unless you have a backup.')) return;
  const L = legRec(); if (!L) return; delete L.answers[pid]; LG.edit = null; legPersist().then(renderLegacy);
}
function legOptIn(id, on) {
  const L = legRec(); if (!L) return;
  if (on) L.opened[id] = new Date().toISOString().slice(0, 10); else delete L.opened[id];
  legPersist().then(() => { if (!on) LG.ch = null; renderLegacy(); showToast(on ? 'Open. Stop any time.' : 'Closed. What you wrote stays in your book.'); });
}
function legPickBook() { LG.pick = !LG.pick; renderLegacy(); }
function legPickHtml(L) {
  const ready = (LEG.chapters || []).filter(c => legWritten(c, L));
  if (!ready.length) return '<p class="gt-small">Write in a chapter first, and it can be saved or printed here.</p>';
  return `<div class="gt-card sq-pick"><h3>Choose the Chapters</h3><p class="gt-small">Choose what goes in. Share the pages with family by hand, by email, or on paper.</p>${ready.map(c => `<label class="gt-switch"><input type="checkbox" name="sq-pick" value="${c.id}" checked> ${escapeHtml(c.title)}</label>`).join('')}
    <div class="btn-row"><button class="btn btn-primary btn-sm" onclick="legPrint(Array.from(document.querySelectorAll('input[name=sq-pick]:checked')).map(x=>x.value))">Save or Print</button></div></div>`;
}
function legPrint(ids) {
  const L = legRec(); if (!L || !ids.length) { showToast('Choose a chapter first.'); return; }
  const owner = window.GGP ? (GGP.get(legacyOwner()) || {}).name || '' : '';
  const chs = ids.map(legChapter).filter(c => c && legWritten(c, L));
  if (!chs.length) { showToast('Write in this chapter first, then save or print it.'); return; }
  const box = document.getElementById('sq-legsheet'); if (!box) return;
  box.innerHTML = `<div class="growth-plan-doc sq-legdoc" id="sq-legdoc"><div class="growth-plan-header"><div class="growth-plan-title">${escapeHtml(owner ? owner + '\'s Legacy Book' : 'My Legacy Book')}</div><div class="growth-plan-meta">${formatDate(null)}</div></div>
    ${chs.map(c => `<div class="growth-plan-domain"><div class="growth-plan-domain-header"><div class="growth-plan-domain-name">${escapeHtml(c.title)}</div></div>${(c.prompts || []).filter(p => L.answers[p.id] && String(L.answers[p.id].text || '').trim()).map(p => { const a = L.answers[p.id]; return `<h3 class="sq-legq">${escapeHtml(p.t)}</h3><p class="sq-lega">${escapeHtml(a.text).replace(/\n/g, '<br>')}</p>${a.told ? `<p class="sq-legby">Told to ${escapeHtml(a.told)}</p>` : ''}`; }).join('')}</div>`).join('')}
    <div class="growth-plan-footer"><p>Kept with Sequoia by Grow With Grounded. These words belong to the person who wrote them.</p></div></div>`;
  box.removeAttribute('aria-hidden');
  const sheet = document.getElementById('sq-legdoc');
  if (window.GGApp && window.ggPdfFromEl) GGApp.sheet({ title: 'Legacy Book', file: 'legacy-book.pdf', print: () => printGrowthPlanNow('sq-legdoc'),
    blocks: () => ggPdfFromEl(sheet, { rows: '.growth-plan-domain-header', eyebrow: 'Legacy Book', foot: 'Sequoia(TM) by Grow With Grounded. growwithgrounded.com' }) });
  else printGrowthPlanNow('sq-legdoc');
}


// ---------- SAVE TO A FILE: locked with a passcode (shared/gg-filelock.js) ----------
function savePersonalFile() {
  if (HELP) return;
  if (!window.currentClientEntry && personalHistory.length === 0) {
    showToast('Take the check-in first, then save your results.');
    return;
  }
  if (window.currentClientEntry) {
    currentClientEntry.growthPlan = collectGrowthPlan('client');
    const copy = JSON.parse(JSON.stringify(currentClientEntry));
    const i = personalHistory.findIndex(e => e.id === copy.id);
    if (i >= 0) personalHistory[i] = copy; else personalHistory.push(copy);
    sortEntries(personalHistory);
  }
  if (PROF) { profPersist().then(() => { showToast('Saved to your profile.'); renderSaveBox(); renderProgress(); }); return; }
  const today = new Date().toISOString().split('T')[0];
  const data = { app: 'sequoia', type: 'personal', version: 1, savedAt: new Date().toISOString(), entries: personalHistory };
  if (!window.GGFileLock) { showToast('Saving to a file needs a newer browser.'); return; }
  GGFileLock.save({ app: 'sequoia', filename: `sequoia-my-results-${today}.json`, data, what: 'your Sequoia results' }).then(ok => {
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
      if (window.GGParts) GGParts.fix(data);
      if (!data || !['sequoia', 'oak'].includes(data.app) || data.type !== 'personal' || !Array.isArray(data.entries)) throw new Error('Not a Sequoia results file');
      const valid = data.entries.filter(e => e && e.scores && typeof e.scores === 'object');
      const ids = new Set(personalHistory.map(e => e.id));
      valid.forEach((e, i) => {
        if (!e.id) e.id = 'saved-' + i + '-' + String(e.date);
        if (data.app === 'oak') e.from = 'oak';
        if (!ids.has(e.id)) { personalHistory.push(e); ids.add(e.id); }
      });
      sortEntries(personalHistory);
      window.personalFileLoaded = true;
      if (PROF) profPersist();
      renderSaveBox(); renderProgress();
      showToast(`Loaded ${valid.length} saved result${valid.length !== 1 ? 's' : ''}.`);
    };
    const fail = () => showToast('That file is not a Sequoia results file.');
    if (window.GGFileLock) GGFileLock.read(reader.result, { app: 'sequoia', what: 'your Sequoia results' }).then(d => { if (d) { try { take(d); } catch (e) { fail(); } } }).catch(fail);
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
      <p>Nothing is stored until you choose to save. A Grounded profile keeps your check-ins on this device, locked with your own passcode, so you can see your tree grow over time. Or save them to a file locked with a passcode you choose.</p>
      <p style="margin-top:8px;"><strong>${status}</strong></p>
      <div class="btn-row">
        <button class="btn btn-primary" onclick="profCreateDialog()">Save to a private profile</button>
        <button class="btn btn-secondary" onclick="savePersonalFile()">Save to a locked file instead</button>
        ${personalFileLoaded ? '' : '<button class="btn btn-secondary" onclick="openPersonalFilePicker()">Load My File</button>'}
      </div>
    </div>`;
}

function renderProgress() {
  const container = document.getElementById('client-progress-content');
  if (!container) return;
  const list = personalHistory.filter(e => e && e.kind !== 'observed');
  const pending = window.currentClientEntry && !list.some(e => e.id === currentClientEntry.id);
  if (pending) list.push(currentClientEntry);
  sortEntries(list);
  document.getElementById('progress-save-btn').style.display = (window.currentClientEntry || list.length) ? '' : 'none';
  if (!list.length) {
    container.innerHTML = '<p style="font-size:17px;color:var(--ink-soft);">Load your file to see your progress, or take the check-in to start a new one.</p>';
    return;
  }
  renderHistoryChartAndTable(container, list, true);
  container.insertAdjacentHTML('afterbegin', graphCardHtml());
  if (pending) {
    container.insertAdjacentHTML('afterbegin', '<div class="privacy-note"><strong>Your latest result is not saved yet.</strong> Use Save My Results to add it to your file.</div>');
  }
}


// ---------- CHART + TABLE RENDERING ----------
// Rings compare only within the same standard and the same kind (full with full,
// quick with quick). Check-ins from before the standard are labeled earlier and never compared.
function stShown(entry, k) { return (entry.unsure || []).includes(k) ? null : (entry.scores || {})[k]; }
function renderHistoryChartAndTable(container, history, personal) {
  if (history.length === 0) {
    container.innerHTML = '<p style="font-size:13px;color:var(--ink-soft);">No results saved yet.</p>';
    return;
  }
  const last = history[history.length - 1];
  const treeSvg = `<div style="max-width:260px;margin:0 auto;">${puzzleTreeSvg({ variant: 'score', scores: last.scores, seam: '#2C1810' })}</div>`;
  const kind = e => e.type === 'quick' ? 'quick' : 'full';
  const prev = last.std ? history.slice(0, -1).reverse().find(e => e.std === last.std && kind(e) === kind(last)) : null;

  let cmp = '';
  if (!last.std) cmp = '<p class="muted" style="font-size:14px;">This is an earlier check-in, from before the questions were updated. Your next check-in starts a new set of rings.</p>';
  else if (!prev) cmp = `<p class="muted" style="font-size:14px;">Your next ${kind(last) === 'quick' ? 'quick ' : ''}check-in will show how each part has grown.</p>`;
  else {
    cmp = `<p style="font-size:14px;margin:0 0 6px;">Compared with your ${kind(last) === 'quick' ? 'quick ' : ''}check-in on ${escapeHtml(String(prev.date || ''))}:</p><div class="ring-cmp">` + ALL_DOMAINS.map(d => {
      const a = stShown(prev, d.key), b = stShown(last, d.key);
      let word = '<span>Not sure yet</span>';
      if (a != null && b != null) { const diff = b - a; word = diff >= 2 ? '<span class="up">Grew</span>' : diff <= -2 ? '<span class="down">Dipped</span>' : '<span>Same</span>'; }
      return `<div class="lvl-row" style="--domain-color:${d.color};"><b style="color:${d.color};">${d.part}</b>${word}</div>`;
    }).join('') + '</div>';
  }

  let tableHtml = `<div class="table-scroll"><table class="history-table"><thead><tr><th>Date</th>`;
  ALL_DOMAINS.forEach(d => tableHtml += `<th>${d.part}</th>`);
  tableHtml += `</tr></thead><tbody>`;
  history.slice().reverse().forEach(s => {
    tableHtml += `<tr><td>${escapeHtml(String(s.date || ''))}${s.type === 'quick' ? ' <span class="quick-tag">Quick</span>' : ''}${!s.std ? ' <span class="earlier-tag">Earlier</span>' : ''}</td>`;
    ALL_DOMAINS.forEach(d => { const v = stShown(s, d.key); tableHtml += `<td>${v == null ? 'Not sure yet' : `${stLevel(v)}<br><small>${v} of 10</small>`}</td>`; });
    tableHtml += `</tr>`;
  });
  tableHtml += `</tbody></table></div>`;

  container.innerHTML = `
    <div class="chart-container">
      <div class="section-title" style="margin-top:0;">Most Recent Tree</div>
      ${treeSvg}
      ${cmp}
    </div>
    <div class="chart-container">
      <div class="section-title" style="margin-top:0;">Full History</div>
      ${tableHtml}
      ${history.some(e => !e.std) ? '<p class="muted" style="font-size:13px;margin-top:8px;">Check-ins marked Earlier used the questions from before the update. They stay here, but they are not compared with newer ones.</p>' : ''}
    </div>
  `;
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
// Text size: Sequoia starts one step larger than Oak (A+), and can go larger still.
const TEXT_SIZES = ['', 'ts-1', 'ts-2'];
const TEXT_LABELS = ['A+', 'A++', 'A'];
let textSize = 1;
try { const v = localStorage.getItem('sequoia:text-size'); if (v !== null) textSize = parseInt(v, 10) || 0; } catch (e) {}
function applyTextSize() {
  document.documentElement.classList.remove('ts-1', 'ts-2');
  if (TEXT_SIZES[textSize]) document.documentElement.classList.add(TEXT_SIZES[textSize]);
  const b = document.getElementById('size-btn');
  if (b) { b.textContent = TEXT_LABELS[textSize]; b.setAttribute('aria-label', 'Text size: ' + ['normal', 'larger', 'largest'][textSize] + '. Tap to change.'); }
}
function cycleTextSize() {
  textSize = (textSize + 1) % TEXT_SIZES.length;
  try { localStorage.setItem('sequoia:text-size', String(textSize)); } catch (e) {}
  applyTextSize();
}
applyTextSize();
mountTree('hero-tree-slot', { variant: 'color', seam: 'var(--hero-seam)', assemble: true, cls: 'hero-tree' });
renderAboutParts();
renderProgress();

/* Deep links: #life (guides), #legacy, #plan, #quick, #checkin, #for=<id> (a helper) */
function fromHash() {
  const h = decodeURIComponent(location.hash || '');
  if (h.startsWith('#life')) showView('client-life');
  else if (h === '#legacy') showView('client-legacy');
  else if (h === '#plan') showView('client-growthplan');
  else if (h === '#quick') startQuick();
  else if (h === '#checkin' || h === '#check' + 'up') startCheckin();
  else if (h.startsWith('#for=')) helpFromHash();
}
window.addEventListener('hashchange', fromHash);
setTimeout(fromHash, 60);
