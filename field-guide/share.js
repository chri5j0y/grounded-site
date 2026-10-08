// =====================================================================
// GROUNDED FIELD GUIDE (TM): the Share Card Builder (GWG BLD 746; Painting look,
// The Grounded Marriage, and named bios, GWG BLD 757; print sizes, QR codes, the Services, the
// Field Guide mark, and TM on every name, GWG BLD 758; every word, mark, and code held inside the safe line on
// every print size, and Your Own Words, GWG BLD 760; flyers for the six new audiences, GWG BLD 762).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// A Staff and Founder tab. Pick a subject, a message, a platform, a format,
// and a look (Light, Dark, Tree Color, or Painting, which sets the words over the
// subject's own painting with a soft shade); it draws the card or banner at the platform's exact size and
// saves it as a PNG. Print makes a 4 by 6 card, 5 by 7, 8.5 by 11 flyer, 11 by 17 poster, or 2 by 3.5
// business card at 300 dpi with an eighth inch of bleed, saved as a PNG or a one page PDF, with the
// trim and safe lines shown in the preview only. An optional QR code leads to the subject's page.
// Your Own Words adds a headline and a short message (an event, a date, a time, a place) in place of or
// along with the tagline, fitted to every format and size.
// Bios for each platform sit below with a Copy button.
// Data: the Staff library's brand.share, with a small built-in fallback so
// the tab works before that library update is applied. Everything is drawn
// on this device; nothing is sent anywhere.
// =====================================================================
(function(){
'use strict';

const TREES = ['maple', 'aspen', 'pine', 'birch', 'oak', 'sequoia', 'willow', 'grove'];
const CREAM = '#FAF7F2', INK = '#2C1810', GOLD = '#8B5E1A', SOFT = '#6B5A4D';

// The built-in fallback. Colors match shared/gg-learn.js; taglines and lines match each tool's page.
const FB = {
  subjects: [
    {id: 'gwg', name: 'Grow With Grounded', mark: 'favicon.svg', color: GOLD, tagline: 'For every threshold, from first breath to last.', line: 'Spiritual guidance, ceremonies, and tools for every age. All faith traditions and everything in-between.', url: 'growwithgrounded.com'},
    {id: 'maple', name: 'Maple', color: '#C4501E', tagline: 'Bright leaves, strong roots.', line: 'Built for grades K to 5, their families, and their teachers.'},
    {id: 'aspen', name: 'Aspen', color: '#1F6F74', tagline: 'Rooted together.', line: 'Built for grades 6 to 8, their families, and their teachers.'},
    {id: 'pine', name: 'Pine', color: '#3A6B35', tagline: 'Stand tall through every season.', line: 'Built for grades 9 to 12.'},
    {id: 'birch', name: 'Birch', color: '#7F6610', tagline: 'New ground, deep roots.', line: 'Built for young adults, 18 to 26.'},
    {id: 'oak', name: 'Oak', color: '#3D5A73', tagline: 'Shelter for others. Strength for you.', line: 'Built for adults, 26 to 60.'},
    {id: 'sequoia', name: 'Sequoia', color: '#7A2E1C', tagline: 'A long life, still growing.', line: 'Built for older adults, 60 and up.'},
    {id: 'willow', name: 'Willow', color: '#5D5A6E', tagline: 'Held gently, all the way home.', line: 'For the person in hospice and the people who love them.'},
    {id: 'grove', name: 'The Grove', color: '#223829', tagline: 'All ages. All stages. Growing together.', line: 'Built for families, classrooms, churches, and groups.'},
    {id: 'marriage', name: 'The Grounded Marriage', mark: 'marriage/mark.svg', color: '#3F5F86', tagline: 'Before the Vows and After the Vows: a private place for the two of you to talk, grow, and keep growing.', line: 'For couples. Everything stays on your device.', url: 'growwithgrounded.com/marriage', always: true},
    {id: 'field', name: 'Grounded Field Guide', mark: 'shared/marks/fieldguide.svg', color: '#2E2118', tagline: 'Every Grounded tool and guide, in one place.', line: 'For chaplains, pastors, teachers, school counselors, and parents.', url: 'growwithgrounded.com/field-guide'}
  ],
  messages: [],
  bios: [],
  platforms: [
    {id: 'facebook', name: 'Facebook', card: [1200, 630], square: [1080, 1080], banner: [1640, 624], safe: 'Words stay in the center. Your profile photo sits at the lower left.'},
    {id: 'instagram', name: 'Instagram', card: [1080, 1350], square: [1080, 1080], safe: 'The grid shows the middle square of a tall card, so the words stay centered.'},
    {id: 'linkedin', name: 'LinkedIn', card: [1200, 627], square: [1080, 1080], banner: [1584, 396], safe: 'Your profile photo sits at the lower left, so the words sit to the right of it.'},
    {id: 'x', name: 'X', card: [1600, 900], square: [1080, 1080], banner: [1500, 500], safe: 'Your profile photo sits at the lower left, so the words sit to the right of it.'},
    {id: 'substack', name: 'Substack', card: [1200, 630], square: [1080, 1080], banner: [1100, 220], safe: 'Words stay in the center.'}
  ]
};
const KINDS = [['tagline', 'Tagline'], ['intro', 'Intro'], ['what', 'What We Do'], ['pitch', 'Pitch'], ['slogan', 'Slogan']];
const LOOKS = [['light', 'Light'], ['dark', 'Dark'], ['tree', 'Tree Color'], ['painting', 'Painting']];
const FORMATS = [['card', 'Card'], ['square', 'Square'], ['banner', 'Banner']];
// Print: sizes in inches (short side, long side), drawn at 300 dpi with an eighth inch of bleed on every edge.
// Safe: how far inside the trim the words, marks, and QR code stay.
const DPI = 300, BLEED = .125;
const PRINT = {id: 'print', name: 'Print'};
const PSIZES = [
  {id: 'p4x6', name: '4 by 6 Card', a: 4, b: 6, safe: .1875},
  {id: 'p5x7', name: '5 by 7', a: 5, b: 7, safe: .1875},
  {id: 'p85x11', name: '8.5 by 11 Flyer', a: 8.5, b: 11, safe: .25},
  {id: 'p11x17', name: '11 by 17 Poster', a: 11, b: 17, safe: .375},
  {id: 'pbiz', name: '2 by 3.5 Business Card', a: 2, b: 3.5, safe: .125}
];
const ORIENTS = [['tall', 'Tall'], ['wide', 'Wide']];
// The Services as subjects: each family on the Services page and each service page, with its own painting.
const SVC_FAM = [
  {id: 'fam-marriage', name: 'Marriage', hero: 'page-marriage', tagline: 'Your vows, your way.', line: 'Weddings, elopements, vow renewals, and The Grounded Marriage\u2122.', url: 'growwithgrounded.com/services.html#marriage'},
  {id: 'fam-celebrations', name: 'Celebrations', hero: 'page-celebrations', tagline: 'Days to remember.', line: 'Child blessings, house blessings, and milestone celebrations.', url: 'growwithgrounded.com/services.html#celebrations'},
  {id: 'fam-farewells', name: 'Farewells', hero: 'page-farewells', tagline: 'Honoring a life.', line: 'Funerals, memorials, celebrations of life, bedside blessings, and pregnancy and infant loss.', url: 'growwithgrounded.com/services.html#farewells'},
  {id: 'fam-hard-seasons', name: 'Hard Seasons', hero: 'page-hard-seasons', tagline: 'You\'re not alone.', line: 'End-of-life support, and grief and caregiver support.', url: 'growwithgrounded.com/services.html#hard-seasons'},
  {id: 'fam-growth', name: 'Growth', hero: 'page-growth', tagline: 'Grow deeper. Rest well.', line: 'Spiritual guidance, and meditation, sound, and movement.', url: 'growwithgrounded.com/services.html#growth'},
  {id: 'fam-teams', name: 'For Teams', hero: 'page-teams', tagline: 'Talks, conferences, and trainings for the people who do this work.', line: 'Speaking, training, and the Grounded Field Guide\u2122 for organizations.', url: 'growwithgrounded.com/services.html#for-teams'}
];
const SVC_PAGES = [
  ['weddings', 'Weddings', 'page-marriage', 'Your story, your vows, and a ceremony that sounds like the two of you.', 'Marriage'],
  ['elopements', 'Elopements', 'page-marriage', 'Just the two of you, or a handful of people you love, anywhere that matters to you.', 'Marriage'],
  ['vow-renewals', 'Vow Renewals', 'page-marriage', 'For couples who would say it all again, and want the people they love to hear it.', 'Marriage'],
  ['premarital-counseling', 'Premarital Sessions', 'page-marriage', 'The Grounded Marriage\u2122: build a strong foundation before the wedding day, with a couple who has been married 22 years.', 'Marriage'],
  ['child-blessings', 'Child Blessings', 'page-celebrations', 'Welcoming a new life into a family and a circle of people who will love them.', 'Celebrations'],
  ['house-blessings', 'House Blessings', 'page-celebrations', 'A new home, or a new beginning in an old one.', 'Celebrations'],
  ['milestones', 'Milestone Celebrations', 'page-celebrations', 'Graduations, retirements, recovery anniversaries, and other thresholds worth honoring.', 'Celebrations'],
  ['funerals-memorials', 'Funerals and Memorials', 'page-farewells', 'Honest, personal services that sound like the person you love.', 'Farewells'],
  ['celebrations-of-life', 'Celebrations of Life', 'page-farewells', 'Stories, music, laughter, and room for tears.', 'Farewells'],
  ['bedside-blessings', 'Bedside Blessings', 'page-farewells', 'Prayers, blessings, and quiet rituals for the last days, at home, in hospice, or in the hospital.', 'Farewells'],
  ['pregnancy-infant-loss', 'Pregnancy and Infant Loss', 'page-farewells', 'Gentle support and ceremony for parents and families after miscarriage, stillbirth, or the death of a baby.', 'Farewells'],
  ['end-of-life-support', 'End-of-Life Support', 'page-hard-seasons', 'Presence for the last chapter, for the person dying and the people who love them.', 'Hard Seasons'],
  ['grief-caregiver-support', 'Grief and Caregiver Support', 'page-hard-seasons', 'For the ones carrying more than they can say.', 'Hard Seasons'],
  ['spiritual-guidance', 'Spiritual Guidance', 'page-growth', 'One-on-one guidance for your inner life, whatever shape it is in.', 'Growth'],
  ['meditation-sound-movement', 'Meditation, Sound, and Movement', 'page-growth', 'A quiet place for your body to settle and breathe again.', 'Growth'],
  ['speaking-training', 'Speaking and Training', 'page-speaking', 'Real stories and practical tools for the people who do this work.', 'For Teams'],
  ['organizations', 'For Organizations', 'page-teams', 'For churches, schools, and hospices: trained Guides, safety built in, and support for your people.', 'For Teams']
];
const SERVICES = SVC_FAM.map(f => Object.assign({svc: 'family', mark: 'favicon.svg', color: GOLD, focus: .5}, f, {hero: 'shared/heroes/' + f.hero + '-wide.webp'})).concat(
  SVC_PAGES.map(([pg, name, hero, tagline, fam]) => ({id: 'svc-' + pg, svc: 'page', name, mark: 'favicon.svg', color: GOLD, hero: 'shared/heroes/' + hero + '-wide.webp', focus: .5, tagline, line: fam + ', with Grow With Grounded\u2122.', url: 'growwithgrounded.com/' + pg + '.html'})));
// FLYERS FOR THE NEW AUDIENCES (GWG BLD 762): the six audiences in For Organizations' "Walking with illness and disability"
// section, each a flyer subject with its own headline, a one-line promise, and short lines of what Grounded offers them.
// The lines print on the 8.5 by 11 flyer and 11 by 17 poster (and the 4 by 6 and 5 by 7 when they read cleanly);
// the social sizes and the business card use the headline and the promise.
const ORG_URL = 'growwithgrounded.com/organizations.html#illness-disability', ORG_LINE = 'Grow With Grounded™ for organizations. Tell us about yours and we\'ll send a clear quote.';
const ORG_AUD = [
  {id: 'org-disability-ministries', name: 'Disability Ministries', hero: 'grove', focus: .5,
    headline: 'A welcome for every member.', tagline: 'Guides that welcome every member and family, with words for the questions people bring.',
    lines: ['Health and Ability in every tree, Maple™ to Sequoia™', 'Guides, practices, and videos that fit each person, shown first', 'Words for the faith questions, when people ask them', 'Every visit starts with the person\'s own words and their own yes', 'Trained Guides with a Certificate of Completion']},
  {id: 'org-special-education', name: 'Special Education Teams', hero: 'maple', focus: .37,
    headline: 'Support for every student.', tagline: 'Maple™, Aspen™, and Pine™ guides for a health condition at school, used with the family\'s yes.',
    lines: ['Maple™ for grades K to 5, Aspen™ for 6 to 8, Pine™ for 9 to 12', 'Guides for a 504 plan, an IEP, and planning what comes next', 'A private choice, kept locked on the student\'s own device', 'Guide training with scenarios and a Certificate of Completion']},
  {id: 'org-hospitals', name: 'Pediatric and Rehabilitation Hospitals', hero: 'page-hard-seasons', focus: .5,
    headline: 'For the long road back.', tagline: 'Guides for a serious illness or long treatment, and for the whole family beside it.',
    lines: ['Health and Ability guides at every age, Maple\u2122 to Sequoia\u2122', 'Life after a brain injury or stroke', 'Guides for the brothers and sisters at home', 'Gentler ways of every practice for the hard days', 'Kept private on each person\'s own device']},
  {id: 'org-independent-living', name: 'Centers for Independent Living', hero: 'oak', focus: .72,
    headline: 'Start from what a person can do.', tagline: 'Tools that start from what a person can do and what the world around them can change.',
    lines: ['Each person chooses their own words', 'Guides, practices, and videos that fit each person, shown first', 'A private choice, kept locked on the person\'s own device', 'Every visit starts with the person\'s own yes']},
  {id: 'org-chronic-illness', name: 'Chronic Illness Support Groups', hero: 'page-growth', focus: .5,
    headline: 'Rest without guilt.', tagline: 'Pacing, flare days, and rest, with gentler ways of every practice.',
    lines: ['Pacing and flare days, in plain words', 'Gentler ways of every practice', 'A Rest Week whenever it\'s needed', 'Guides for living with several conditions at once', 'Kept private on each person\'s own device']},
  {id: 'org-parish-nurses', name: 'Parish Nurses', hero: 'sequoia', focus: .22,
    headline: 'Ready for every visit.', tagline: 'Sequoia™ Guide and Oak™ Guide for home visits and congregation visits.',
    lines: ['Sequoia™ Guide for anyone who serves older adults', 'Oak™ Guide for walking with adults 26 to 60', 'Guides for living with several conditions at once', 'Crisis steps and reporting guidance in every visit', 'A Certificate of Completion for each person']}
];
const ORGS = ORG_AUD.map(a => Object.assign({svc: 'org', mark: 'favicon.svg', color: GOLD, line: ORG_LINE, url: ORG_URL, eyebrow: 'For ' + a.name}, a, {hero: 'shared/heroes/' + a.hero + '-wide.webp'}));
// The Painting look: each subject's wide painting, and where its main tree stands (a fraction of the image width).
const FOCUS = {maple: .37, aspen: .36, pine: .38, birch: .18, oak: .72, sequoia: .22, willow: .21, grove: .5, home: .74, marriage: .64};
// People named in the bios (bios may name a person who is not a card subject).
const PEOPLE = {chris: 'Chris Joy', kayti: 'Kayti Joy'};
// Banner safe areas as fractions [left, top, right, bottom]: profile photos sit at the lower left on X, LinkedIn, and Facebook.
const SAFE = {facebook: [.12, .1, .92, .9], x: [.22, .12, .92, .88], linkedin: [.25, .1, .94, .9], substack: [.06, .1, .94, .9]};

let LIB = null;
// The Share tab's choices, kept while the Field Guide is open. head, note, and with are Your Own Words.
const S = {subject: 'gwg', msg: 'tag', own: '', platform: 'facebook', format: 'card', look: 'light', marks: true, bios: 'all', orient: 'tall', qr: false, head: '', note: '', with: 'place'};
// Your Own Words, trimmed to the character guide, or null when both are empty.
function ownWords(){
  const cut = (t, n) => Array.from(String(t || '')).slice(0, n).join('');
  const head = cut(S.head, HEAD_MAX).replace(/\s+/g, ' ').trim();
  // The message keeps up to four of its own line breaks (a date, a time, and a place can each have a line).
  const note = cut(S.note, NOTE_MAX).split(/\r?\n/).map(l => l.replace(/\s+/g, ' ').trim()).filter(Boolean).slice(0, 5).join('\n');
  return head || note ? {head, note} : null;
}

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const slug = s => String(s).replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const chars = s => Array.from(String(s || '')).length;

// ---------- data ----------
function data(){
  const d = (LIB && LIB.brand && LIB.brand.share) || {};
  const fbS = id => FB.subjects.find(x => x.id === id) || {};
  const subjects = (Array.isArray(d.subjects) && d.subjects.length ? d.subjects : FB.subjects).map(s => Object.assign({}, fbS(treeKey(s) || s.id), s));
  // Built-in subjects a library may not list yet (The Grounded Marriage) join before the Field Guide.
  FB.subjects.filter(f => f.always && !subjects.some(s => s.id === f.id || (isMarriage(f) && isMarriage(s)))).forEach(f => {
    const at = subjects.findIndex(s => isLogo(s) && !isGWG(s)); subjects.splice(at < 0 ? subjects.length : at, 0, Object.assign({}, f));
  });
  // The Services join after every Grounded subject (built in; a library may add more).
  SERVICES.forEach(v => { if (!subjects.some(s => s.id === v.id)) subjects.push(Object.assign({}, v)); });
  // The new audiences' flyers join last (built in, GWG BLD 762).
  ORGS.forEach(v => { if (!subjects.some(s => s.id === v.id)) subjects.push(Object.assign({}, v)); });
  return {
    subjects,
    messages: Array.isArray(d.messages) ? d.messages : FB.messages,
    bios: Array.isArray(d.bios) ? d.bios : FB.bios,
    platforms: (Array.isArray(d.platforms) && d.platforms.length ? d.platforms : FB.platforms)
  };
}
// The tree a subject belongs to, if any (by id, mark, or name).
function treeKey(s){
  const id = String(s.id || '').toLowerCase().replace(/^the-?/, '');
  if (TREES.includes(id)) return id;
  const m = String(s.mark || '').match(/marks\/([a-z]+)/); if (m && TREES.includes(m[1])) return m[1];
  const n = String(s.name || '').toLowerCase().replace(/^the /, '');
  return TREES.includes(n) ? n : null;
}
function markUrl(s){
  const t = treeKey(s), m = s.mark;
  if (isField(s)) return '../shared/marks/fieldguide.svg';
  if (m && /^(https?:|\/)/.test(m)) return m;
  if (m && /[\/.]/.test(m)) return '../' + m.replace(/^(\.\.\/|\.\/)+/, '');
  if (t) return '../shared/marks/' + t + '.svg';
  return '../favicon.svg';
}
const isLogo = s => /favicon\.svg$/.test(markUrl(s));
const siteOf = s => s.url || (treeKey(s) ? 'growwithgrounded.com/' + treeKey(s) : 'growwithgrounded.com');
const isGWG = s => s.id === 'gwg' || /^grow with grounded$/i.test(s.name || '');
const isMarriage = s => !s.svc && (s.id === 'marriage' || /grounded marriage/i.test(s.name || '') || /marriage\/mark/.test(s.mark || ''));
const isField = s => !s.svc && (s.id === 'field' || s.id === 'fieldguide' || /field guide/i.test(s.name || ''));
// The name as the card prints it, with TM on every Grounded name (Grow With Grounded, each tree, The Grove, The Grounded Marriage, Grounded Field Guide).
function cardName(s){
  let n = String(s.name || '').trim();
  if (isField(s) && /^(the )?(grounded )?field guide$/i.test(n)) n = 'Grounded Field Guide';
  const tm = !s.svc && (isGWG(s) || isMarriage(s) || isField(s) || !!treeKey(s));
  return tm && n && !/\u2122$/.test(n) ? n + '\u2122' : n;
}
// The subject's painting: a tree's own wide painting, The Grounded Marriage's, or the home painting for Grow With Grounded and the Field Guide.
function heroOf(s){
  const fx = +s.focus;
  if (s.hero) return {url: /^(https?:|\/)/.test(s.hero) ? s.hero : '../' + String(s.hero).replace(/^(\.\.\/|\.\/)+/, ''), fx: fx >= 0 && fx <= 1 ? fx : .5};
  const t = treeKey(s);
  if (t) return {url: '../shared/heroes/' + t + '-wide.webp', fx: FOCUS[t]};
  if (isField(s)) return {url: '../shared/heroes/fieldguide-wide.webp', fx: .47};
  if (isMarriage(s)) return {url: '../marriage/hero-wide.webp', fx: FOCUS.marriage};
  return {url: '../shared/heroes/home-wide.webp', fx: FOCUS.home};
}

function messagesFor(D, sub){
  const list = D.messages.filter(m => m && m.text && (m.subject === 'all' || m.subject === sub.id || (treeKey(sub) && m.subject === treeKey(sub))));
  return list.filter(m => String(m.text).trim() !== String(sub.tagline || '').trim());
}
function current(){
  const D = data();
  const sub = D.subjects.find(x => x.id === S.subject) || D.subjects[0];
  const msgs = messagesFor(D, sub);
  let text = sub.tagline || '';
  if (S.msg === 'own') text = S.own;
  else if (S.msg.startsWith('m:')){ const m = msgs[+S.msg.slice(2)]; if (m) text = m.text; else S.msg = 'tag'; }
  if (S.platform === 'print'){
    const fmts = PSIZES.map(p => [p.id, p.name]);
    if (!fmts.some(([k]) => k === S.format)) S.format = fmts[0][0];
    const ps = PSIZES.find(p => p.id === S.format), wide = S.orient === 'wide';
    const inW = wide ? ps.b : ps.a, inH = wide ? ps.a : ps.b;
    const print = {size: ps, inW, inH, bleed: BLEED * DPI, safe: ps.safe * DPI, dpi: DPI};
    return {D, sub, msgs, text, plat: PRINT, fmts, print, W: Math.round((inW + 2 * BLEED) * DPI), H: Math.round((inH + 2 * BLEED) * DPI)};
  }
  const plat = D.platforms.find(p => p.id === S.platform) || D.platforms[0];
  const fmts = FORMATS.filter(([k]) => k === 'square' ? true : Array.isArray(plat[k]));
  if (!fmts.some(([k]) => k === S.format)) S.format = fmts[0][0];
  const size = S.format === 'square' ? (plat.square || [1080, 1080]) : plat[S.format];
  return {D, sub, msgs, text, plat, fmts, W: +size[0], H: +size[1]};
}

// ---------- color ----------
const hex = c => { const m = String(c).replace('#', ''); const f = m.length === 3 ? m.split('').map(x => x + x).join('') : m; return [0, 2, 4].map(i => parseInt(f.slice(i, i + 2), 16) || 0); };
const mix = (a, b, t) => { const A = hex(a), B = hex(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
function palette(sub, look){
  const c = sub.color || GOLD, logo = isLogo(sub);
  if (look === 'dark') return {bg: '#1E1510', glow: '#2E2118', band: '#2A1E15', ink: '#F2EADC', soft: '#BFB09A', acc: logo ? '#D9A847' : mix(c, '#F6E7CF', .5), logo: '#D9A847'};
  if (look === 'tree') return {bg: c, glow: mix(c, '#FFFFFF', .14), band: mix(c, '#000000', .22), ink: '#FFF8EC', soft: mix(c, '#FFF8EC', .82), acc: mix(c, '#FFE9B8', .8), logo: '#FFF8EC'};
  if (look === 'painting') return {bg: '#2A1E15', glow: '#2A1E15', band: 'rgba(12,8,5,.52)', ink: '#FFF8EC', soft: '#F1E7D6', acc: logo ? '#F2D08E' : mix(c, '#FFF1DA', .66), logo: '#FFF8EC'};
  return {bg: CREAM, glow: '#F0E8D8', band: '#E9DFCB', ink: INK, soft: SOFT, acc: logo ? GOLD : c, logo: GOLD};
}

// ---------- images and fonts ----------
const IMG = {};
function loadImg(url){
  if (IMG[url]) return IMG[url];
  IMG[url] = fetch(url).then(r => { if (!r.ok) throw new Error('mark ' + r.status); return r.text(); }).then(txt => {
    // The tab icon wraps the house tree in a light tile; the cards use the tree itself, so it can take each look's color.
    const tree = txt.slice(1).match(/<svg\b[^>]*viewBox="0 0 3200 3536"[^>]*>[\s\S]*?<\/svg>/);
    if (tree) txt = tree[0].replace(/^<svg\b/, '<svg xmlns="http://www.w3.org/2000/svg"').replace(/\s(x|y)="[^"]*"/g, '');
    // Give the SVG a large size so it draws crisp at any scale.
    const vb = (txt.match(/viewBox="([^"]+)"/) || [])[1]; const p = vb ? vb.trim().split(/[\s,]+/).map(Number) : [0, 0, 100, 100];
    const k = 1200 / Math.max(p[2], p[3]); const w = Math.round(p[2] * k), h = Math.round(p[3] * k);
    txt = txt.replace(/<svg\b([^>]*)>/, (all, attrs) => '<svg' + attrs.replace(/\s(width|height)="[^"]*"/g, '') + ' width="' + w + '" height="' + h + '">');
    const img = new Image(); img.src = URL.createObjectURL(new Blob([txt], {type: 'image/svg+xml'}));
    return img.decode().then(() => img);
  });
  IMG[url].catch(() => { delete IMG[url]; });
  return IMG[url];
}
// A painting (same-origin WebP), kept once loaded.
function loadPhoto(url){
  const key = 'photo:' + url;
  if (IMG[key]) return IMG[key];
  IMG[key] = new Promise((ok, no) => { const img = new Image(); img.onload = () => ok(img); img.onerror = () => no(new Error('painting ' + url)); img.src = url; });
  IMG[key].catch(() => { delete IMG[key]; });
  return IMG[key];
}
// Draw the painting to cover the canvas with its main tree near x = place (a fraction of W); returns where the tree landed.
function cover(ctx, img, W, H, fx, place){
  const iw = img.naturalWidth || 2000, ih = img.naturalHeight || 800, k = Math.max(W / iw, H / ih), dw = iw * k, dh = ih * k;
  const dx = Math.min(0, Math.max(W - dw, W * place - fx * dw));
  const dy = (H - dh) * .56;
  ctx.drawImage(img, dx, dy, dw, dh);
  return (dx + fx * dw) / W;
}
// The house logo drawn in one color (for the Dark and Tree Color looks).
function tint(img, color){
  const c = document.createElement('canvas'); c.width = img.naturalWidth || 1200; c.height = img.naturalHeight || 1200;
  const x = c.getContext('2d'); x.drawImage(img, 0, 0, c.width, c.height); x.globalCompositeOperation = 'source-in'; x.fillStyle = color; x.fillRect(0, 0, c.width, c.height);
  return c;
}
let FONTS = null;
function fonts(){
  if (!FONTS) FONTS = Promise.all(['600 40px "Cormorant Garamond"', 'italic 500 40px "Cormorant Garamond"', '500 20px Barlow', '600 20px Barlow'].map(f => document.fonts.load(f).catch(() => null))).then(() => document.fonts.ready);
  return FONTS;
}

// ---------- layout ----------
const F_NAME = u => `600 ${u * 4.4}px "Cormorant Garamond", Georgia, serif`;
const F_MSG = u => `italic 500 ${u * 2.5}px "Cormorant Garamond", Georgia, serif`;
const F_LINE = u => `500 ${u * 1.25}px Barlow, system-ui, sans-serif`;
// Your Own Words: a headline and a short message (an event, a date, a time, a place).
const F_HEAD = u => `600 ${u * 3.1}px "Cormorant Garamond", Georgia, serif`;
const F_NOTE = u => `500 ${u * 1.75}px Barlow, system-ui, sans-serif`;
// The character guide for Your Own Words.
const HEAD_MAX = 60, HEAD_BEST = 40, NOTE_MAX = 180, NOTE_BEST = 120;
// The audience flyers (GWG BLD 762): a small line naming the audience above the headline, and the list of what Grounded offers them.
const F_EYE = u => `600 ${u * 1.4}px Barlow, system-ui, sans-serif`;
const F_LIST = u => `500 ${u * 1.6}px Barlow, system-ui, sans-serif`;
function greedy(ctx, words, maxW){
  const lines = []; let cur = '';
  // A single word longer than the line (a long address, for example) breaks into pieces that fit.
  words = words.flatMap(w => { if (ctx.measureText(w).width <= maxW) return [w]; const out = []; let p = '';
    for (const ch of Array.from(w)){ if (p && ctx.measureText(p + ch).width > maxW){ out.push(p); p = ch; } else p += ch; } if (p) out.push(p); return out; });
  for (const w of words){ const t = cur ? cur + ' ' + w : w; if (!cur || ctx.measureText(t).width <= maxW) cur = t; else { lines.push(cur); cur = w; } }
  if (cur) lines.push(cur);
  return lines;
}
// Wrap to fit maxW, then balance the lines so the last line is not left alone.
function wrap(ctx, text, font, maxW, spacing){
  ctx.font = font; ctx.letterSpacing = spacing || '0px';
  const words = String(text || '').trim().split(/\s+/).filter(Boolean);
  let lines = greedy(ctx, words, maxW);
  if (lines.length > 1){
    let lo = 0, hi = maxW;
    for (let i = 0; i < 10; i++){ const mid = (lo + hi) / 2; if (greedy(ctx, words, mid).length === lines.length) hi = mid; else lo = mid; }
    lines = greedy(ctx, words, hi);
  }
  // Each line's inked width: italic letters can lean past their advance width on either side.
  const widths = lines.map(l => { const m = ctx.measureText(l); return m.width + 2 * Math.max(0, m.actualBoundingBoxLeft || 0, (m.actualBoundingBoxRight || 0) - m.width); }); ctx.letterSpacing = '0px';
  return {lines, widths, w: Math.max(0, ...widths)};
}
// Wrap each of the message's own lines in turn.
function wrapP(ctx, text, font, maxW){
  const out = {lines: [], widths: [], w: 0};
  String(text || '').split('\n').forEach(p => { const b = wrap(ctx, p, font, maxW); out.lines.push(...b.lines); out.widths.push(...b.widths); out.w = Math.max(out.w, b.w); });
  return out;
}
// Measure the whole block at unit u. Returns null when it does not fit the region.
function measure(ctx, o, u, R, parts, lv){
  lv = lv || {h: 3, n: 6};
  const horiz = o.horiz, gapM = u * 2.2;
  const markH = horiz ? u * (o.logo ? 7.6 : 6.6) : u * (o.logo ? 8.6 : 7.4);
  const markW = o.logo ? markH * 3200 / 3536 : markH;
  const colW = horiz ? R.w - markW - gapM : R.w;
  if (colW < u * 8) return null;
  const name = wrap(ctx, o.name, F_NAME(u), colW); if (name.lines.length > 2 || name.w > colW) return null;
  // A TM sits small and raised after the name; the name is measured with it at full size, so it always fits.
  const msgLimit = o.msg.length > 120 ? 6 : 4;
  const msg = o.msg ? wrap(ctx, o.msg, F_MSG(u), colW) : {lines: [], widths: [], w: 0}; if (msg.lines.length > msgLimit || msg.w > colW) return null;
  const line = parts.line && o.line ? wrap(ctx, o.line, F_LINE(u), colW, (u * 0.025) + 'px') : {lines: [], widths: [], w: 0}; if (line.lines.length > 3 || line.w > colW) return null;
  const none = {lines: [], widths: [], w: 0};
  const head = o.head ? wrap(ctx, o.head, F_HEAD(u), colW) : none; if (head.lines.length > lv.h || head.w > colW) return null;
  const note = o.note ? wrapP(ctx, o.note, F_NOTE(u), colW) : none; if (note.lines.length > lv.n || note.w > colW) return null;
  const rowH = parts.marks ? u * 3 : 0, rowW = parts.marks ? 8 * rowH + 7 * u * .55 : 0; if (rowW > colW) return null;
  // The audience flyers: the line above the headline, and each offer with a bullet and a hanging indent.
  const eye = o.eyebrow ? wrap(ctx, o.eyebrow, F_EYE(u), colW, (u * .06) + 'px') : none; if (eye.lines.length > 2 || eye.w > colW) return null;
  const bi = u * 1.7, list = parts.list && o.list ? o.list.map(t => wrap(ctx, t, F_LIST(u), colW - bi)) : [];
  if (list.some(b => b.lines.length > 3 || b.w > colW - bi)) return null;
  const listW = list.length ? bi + Math.max(...list.map(b => b.w)) : 0;
  const listH = list.length ? u * 1.4 + list.reduce((a, b) => a + b.lines.length * u * 1.6 * 1.3, 0) + (list.length - 1) * u * .55 : 0;
  let h = name.lines.length * u * 4.4 * 1.08;
  if (eye.lines.length) h += eye.lines.length * u * 1.4 * 1.3 + u * .5;
  h += listH;
  if (head.lines.length) h += u * 1.1 + head.lines.length * u * 3.1 * 1.12;
  if (msg.lines.length) h += u * .7 + msg.lines.length * u * 2.5 * 1.22;
  if (note.lines.length) h += u * .9 + note.lines.length * u * 1.75 * 1.32;
  if (line.lines.length) h += u * .8 + line.lines.length * u * 1.25 * 1.4;
  if (rowH) h += u * 1.3 + rowH;
  const textW = Math.max(name.w, head.w, msg.w, note.w, line.w, rowW, eye.w, listW);
  const W = horiz ? markW + gapM + textW : Math.max(markW, textW);
  const H = horiz ? Math.max(h, markH) : markH + u * 1.6 + h;
  if (W > R.w || H > R.h) return null;
  return {u, name, head, msg, note, line, rowH, rowW, eye, list, listW, bi, textH: h, textW, markW, markH, gapM, W, H, parts};
}
function fit(ctx, o, R, cap){
  // Full content first; drop the tree marks row, then the small line, only when the words would get too small.
  let tries = [{line: true, marks: o.marks}, {line: true, marks: false}, {line: false, marks: false}].filter((p, i) => i !== 1 || o.marks);
  // An audience flyer keeps its list first (dropping the small line before it), and lets the list go only when it would print too small.
  if (o.list) tries = [{line: true, marks: false, list: true}, {line: false, marks: false, list: true}].concat(tries);
  // Your Own Words shrink first, then wrap: a headline on one line and the message on two while the words stay a good size,
  // then more lines only when they would get small.
  const nb = o.note ? o.note.split('\n').length : 0;
  const levels = o.head || o.note ? [{h: 1, n: Math.max(2, nb)}, {h: 2, n: Math.max(4, nb + 1)}, {h: 3, n: Math.max(7, nb + 3)}] : [{h: 3, n: 6}];
  let got = null;
  for (const parts of tries) for (let li = 0; li < levels.length; li++){
    let lo = 0, hi = cap; got = null;
    for (let i = 0; i < 24; i++){ const mid = (lo + hi) / 2; const m = measure(ctx, o, mid, R, parts, levels[li]); if (m){ got = m; lo = mid; } else hi = mid; }
    // With the list (print only), its words stay at 9 points or larger on paper (300 dpi).
    const least = parts.list ? 9 / 72 * DPI / 1.6 : o.minU;
    if (got && got.u >= (li < levels.length - 1 ? Math.max(least, cap * .55) : least)) return got;
  }
  return got;
}

// Every drawn word and picture is recorded as a box (canvas.boxes), so a check can hold each one to the safe area.
function txt(ctx, B, t, x, y, k){
  ctx.fillText(t, x, y); if (!B) return;
  const m = ctx.measureText(t), l = m.actualBoundingBoxLeft || 0, r = m.actualBoundingBoxRight || 0, a = m.actualBoundingBoxAscent || 0, d = m.actualBoundingBoxDescent || 0;
  B.push({k, t, x: x - l, y: y - a, w: l + r, h: a + d});
}
function pic(ctx, B, im, x, y, w, h, k){ ctx.drawImage(im, x, y, w, h); if (B) B.push({k, x, y, w, h}); }
// The site line: its inked width at size us, letter spacing included.
const F_SITE = us => `600 ${us}px Barlow, system-ui, sans-serif`;
function siteWidth(ctx, t, us){
  ctx.font = F_SITE(us); ctx.letterSpacing = (us * .08) + 'px';
  const m = ctx.measureText(t); ctx.letterSpacing = '0px';
  return m.width + 2 * Math.max(0, m.actualBoundingBoxLeft || 0, (m.actualBoundingBoxRight || 0) - m.width);
}
// Print: the site line at its best size inside the safe width. A long address that would print too small breaks after a slash
// onto two lines. Returns the size, the lines, each line's baseline, and the top of the words.
function siteLayout(ctx, t, W, H, pr){
  const k = pr.bleed + pr.safe, room = (W - 2 * k) * .97, best = Math.max(.1 * DPI, Math.min(H * .026, .3 * DPI)), least = 7 / 72 * DPI;
  const sizeFor = ls => Math.min(best, 100 * room / Math.max(...ls.map(l => siteWidth(ctx, l, 100))));
  let lines = [t], us = sizeFor(lines);
  if (us < least && t.indexOf('/') > 0){
    const at = t.indexOf('/') + 1, two = [t.slice(0, at), t.slice(at)];
    if (sizeFor(two) > us){ lines = two; us = sizeFor(two); }
  }
  ctx.font = F_SITE(us); ctx.letterSpacing = (us * .08) + 'px';
  const ms = lines.map(l => ctx.measureText(l)); ctx.letterSpacing = '0px';
  const desc = Math.max(...ms.map(m => m.actualBoundingBoxDescent || 0)), asc = Math.max(...ms.map(m => m.actualBoundingBoxAscent || us * .72)), lh = us * 1.25;
  const last = H - k - desc - 1, base = lines.map((l, i) => last - (lines.length - 1 - i) * lh);
  return {us, lines, base, top: base[0] - asc};
}
// The name, line by line; a closing TM is drawn small and raised.
function nameLines(ctx, blk, font, size, tx, ty, align, color, B){
  ctx.font = font; ctx.fillStyle = color; ctx.textAlign = 'left';
  const small = font.replace(/([\d.]+)px/, (a, n) => (+n * .4) + 'px');
  blk.lines.forEach((l, i) => {
    ty += size * 1.08; const y = ty - size * .04 - size * .2;
    const tm = /\u2122$/.test(l), base = tm ? l.slice(0, -1) : l;
    ctx.font = font; const w1 = ctx.measureText(base).width; ctx.font = small; const w2 = tm ? ctx.measureText('\u2122').width + size * .03 : 0;
    const x = align === 'center' ? tx - (w1 + w2) / 2 : tx;
    ctx.font = font; txt(ctx, B, base, x, y, 'name');
    if (tm){ ctx.font = small; txt(ctx, B, '\u2122', x + w1 + size * .03, y - size * .38, 'tm'); }
  });
  ctx.font = font; ctx.textAlign = align;
}
// A QR code in a white tile with its quiet zone, crisp at whole pixels.
function drawQR(ctx, M, x, y, s, pnt, B){
  const n = M.length, q = 2, ms = Math.max(1, Math.floor(s / (n + 2 * q))), real = ms * (n + 2 * q);
  const ox = Math.round(x + (s - real) / 2), oy = Math.round(y + (s - real) / 2), r = ms * 1.5;
  ctx.save();
  if (pnt){ ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = ms * 2; }
  ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(ox, oy, real, real, r) : ctx.rect(ox, oy, real, real); ctx.fill();
  ctx.restore(); if (B) B.push({k: 'qr', x: ox, y: oy, w: real, h: real});
  ctx.fillStyle = '#1E1510';
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) if (M[j][i]) ctx.fillRect(ox + (i + q) * ms, oy + (j + q) * ms, ms, ms);
}
// Draw one card or banner on a canvas of exactly W by H pixels.
async function draw(canvas, cur, look){
  const {sub, text, plat, W, H} = cur, pr = cur.print || null;
  await fonts();
  const logo = isLogo(sub), P = palette(sub, look), pnt = look === 'painting', hero = pnt ? heroOf(sub) : null;
  const showMarks = S.marks && isGWG(sub);
  const imgs = await Promise.all([loadImg(markUrl(sub)), ...(showMarks ? TREES.map(t => loadImg('../shared/marks/' + t + '.svg')) : [])]);
  const photo = pnt ? await loadPhoto(hero.url) : null;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d'), B = canvas.boxes = [];
  const banner = S.format === 'banner', horiz = banner || W / H >= 1.3;
  // Print: the site line sits inside the safe area, so the ground band grows past the bleed to hold it.
  const site = pr ? siteLayout(ctx, siteOf(sub), W, H, pr) : null;
  const orgList = sub.svc === 'org' && !!pr && pr.size.id !== 'pbiz' && Array.isArray(sub.lines) && sub.lines.length > 0;
  const band = pr ? Math.round(Math.max(H * .07, H - site.top + site.us * .9)) : Math.round(H * (banner ? .07 : .075)); const bandTop = H - band;
  // The Painting look: the main tree stays in view, and the words sit on the open side of the painting.
  let side = 'center', place = .5;
  if (pnt && horiz && Math.abs(hero.fx - .5) > .08){ side = hero.fx < .5 ? 'right' : 'left'; place = side === 'right' ? (banner ? .2 : .25) : (banner ? .8 : .75); }
  // The region the words and marks stay inside.
  let R;
  if (banner){ const f = plat.safeBox || SAFE[plat.id] || [.1, .12, .9, .88]; R = {x: W * f[0], y: H * f[1], w: W * (f[2] - f[0]), h: Math.min(H * f[3], bandTop - H * .04) - H * f[1]}; }
  else if (pnt && side !== 'center'){ const cw = orgList ? .56 : .48; R = side === 'right' ? {x: W * (.94 - cw), y: H * .07, w: W * cw, h: bandTop - H * .05 - H * .07} : {x: W * .06, y: H * .07, w: W * cw, h: bandTop - H * .05 - H * .07}; }
  // An audience flyer with its list keeps nearly the full height on a tall painting, under a deeper shade (GWG BLD 762).
  else if (pnt && !horiz) R = {x: W * .07, y: H * .06, w: W * .86, h: (bandTop - H * .05) * (orgList ? .97 : .62) - H * .06};
  else R = {x: W * .07, y: H * .07, w: W * .86, h: bandTop - H * .05 - H * .07};
  // Print: everything stays inside the safe area (trim, then the safe margin).
  if (pr){
    // A sixteenth of an inch of air inside the safe line, so nothing sits right on it.
    const k = pr.bleed + pr.safe + DPI / 16, x0 = Math.max(R.x, k), y0 = Math.max(R.y, k), x1 = Math.min(R.x + R.w, W - k), y1 = Math.min(R.y + R.h, bandTop - pr.safe * .5);
    R = {x: x0, y: y0, w: x1 - x0, h: y1 - y0};
  }
  const RS = Object.assign({}, R);
  // A banner's words stop short of its painting's tree.
  if (pnt && banner && side !== 'center'){
    const edge = W * (hero.fx + (side === 'right' ? .1 : -.1));
    if (side === 'right' && edge > R.x && edge < R.x + R.w * .6){ R.w -= edge - R.x; R.x = edge; }
    if (side === 'left' && edge < R.x + R.w && edge > R.x + R.w * .4) R.w = edge - R.x;
  }
  // The QR code to the subject's page: a white tile beside the words (wide) or under them (tall).
  const qrUrl = 'https://' + String(siteOf(sub)).replace(/^https?:\/\//, '');
  const qrM = S.qr && window.GGQR ? (() => { try { return window.GGQR.matrix(qrUrl); } catch (e){ return null; } })() : null;
  let qs = 0, qgap = 0; const R0 = Object.assign({}, R);
  // Beside the words on wide cards; under them on tall cards and where the words share a painting with its tree.
  const qrSide = horiz && !(pnt && !banner && side !== 'center');
  if (qrM){
    qs = Math.round(Math.min(Math.min(R.w, R.h) * .42, Math.max(Math.min(W, H) * .2, pr ? (pr.size.id === 'pbiz' ? .6 : .8) * DPI : 0)));
    qgap = Math.round(Math.min(W, H) * .035);
    if (qrSide) R.w -= qs + qgap; else R.h -= qs + qgap;
  }
  const own = ownWords(), msgText = own && S.with === 'place' ? '' : String(text || '').trim();
  const o ={horiz, logo, name: cardName(sub), msg: msgText, head: own ? own.head : '', note: own ? own.note : '', line: sub.line || '', marks: showMarks, minU: Math.min(W, H) * (banner ? .028 : .018)};
  // An audience flyer: its headline in the name's place, the audience above it, and its list on the print sizes (not the business card).
  if (sub.svc === 'org'){ o.name = sub.headline || o.name; o.eyebrow = sub.eyebrow || ''; if (orgList) o.list = sub.lines.slice(0, 5); }
  // On a wide painting with its tree to one side, the flyer's words stack in the open column (mark above), so the list has room.
  if (orgList && pnt && !banner && side !== 'center') o.horiz = false;
  const cap = banner ? H * (W / H >= 3.9 ? .045 : .03) : horiz ? Math.min(H * .036, W * .022) : W * .03;
  const m = fit(ctx, o, R, pnt && side !== 'center' && !banner ? cap * .92 : cap);
  // Where the block sits: centered in the region, or toward the open side of a banner's painting.
  let bx = m ? R.x + (R.w - m.W) / 2 : 0; let by = m ? R.y + (R.h - m.H) / 2 : 0;
  if (m && pnt && banner && side !== 'center'){ bx = side === 'right' ? R.x + R.w - m.W : R.x; }
  // With a QR code, the block and the code are centered together in the whole region.
  let qx = 0, qy = 0;
  if (qrM && m){
    if (qrSide){ if (!(pnt && banner && side !== 'center')) bx = R0.x + (R0.w - (m.W + qgap + qs)) / 2; qx = bx + m.W + qgap; qy = by + (m.H - qs) / 2; qy = Math.max(R0.y, Math.min(qy, R0.y + R0.h - qs)); }
    else { by = R0.y + (R0.h - (m.H + qgap + qs)) / 2; qx = R0.x + (R0.w - qs) / 2; qy = by + m.H + qgap; }
  }
  if (pnt){
    // The painting, a light all-over shade, then a soft deeper shade behind the words so they read.
    ctx.fillStyle = P.bg; ctx.fillRect(0, 0, W, H);
    cover(ctx, photo, W, H, hero.fx, place);
    ctx.fillStyle = 'rgba(14,10,6,.2)'; ctx.fillRect(0, 0, W, H);
    if (horiz && !banner && side !== 'center'){
      const g = ctx.createLinearGradient(side === 'right' ? W : 0, 0, side === 'right' ? W * .3 : W * .7, 0);
      g.addColorStop(0, 'rgba(14,10,6,.66)'); g.addColorStop(.55, 'rgba(14,10,6,.5)'); g.addColorStop(1, 'rgba(14,10,6,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    } else if (!horiz){
      const g = ctx.createLinearGradient(0, 0, 0, H);
      if (orgList){ g.addColorStop(0, 'rgba(14,10,6,.64)'); g.addColorStop(.6, 'rgba(14,10,6,.56)'); g.addColorStop(1, 'rgba(14,10,6,.4)'); }
      else { g.addColorStop(0, 'rgba(14,10,6,.62)'); g.addColorStop(.5, 'rgba(14,10,6,.44)'); g.addColorStop(.8, 'rgba(14,10,6,.08)'); g.addColorStop(1, 'rgba(14,10,6,0)'); }
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }
    if (m){
      // An oval of shade under the block itself, in every format.
      const cx = bx + m.W / 2, cy = by + m.H / 2, rx = m.W * .62 + m.u * 6, ry = m.H * .62 + m.u * 5;
      ctx.save(); ctx.translate(cx, cy); ctx.scale(rx / ry, 1);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, ry); g.addColorStop(0, 'rgba(14,10,6,.5)'); g.addColorStop(.6, 'rgba(14,10,6,.36)'); g.addColorStop(1, 'rgba(14,10,6,0)');
      ctx.fillStyle = g; ctx.fillRect(-ry, -ry, 2 * ry, 2 * ry); ctx.restore();
    }
  } else {
    // Background: a soft warm glow from below.
    ctx.fillStyle = P.bg; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.translate(W / 2, H * 1.2); ctx.scale(W / H * .9, 1);
    const r = H * 1.25, g = ctx.createRadialGradient(0, 0, 0, 0, 0, r); g.addColorStop(0, P.glow); g.addColorStop(.6, P.bg); g.addColorStop(1, P.bg);
    ctx.fillStyle = g; ctx.fillRect(-r, -r, 2 * r, 2 * r); ctx.restore();
  }
  // A thin ground band.
  ctx.fillStyle = P.band; ctx.fillRect(0, bandTop, W, band);
  if (m){
    const u = m.u;
    const markImg = logo && P.logo !== GOLD ? tint(imgs[0], P.logo) : imgs[0];
    if (pnt){ ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = u * .9; ctx.shadowOffsetY = u * .08; }
    let tx, ty, align;
    if (o.horiz){
      pic(ctx, B, markImg, bx, by + (m.H - m.markH) / 2, m.markW, m.markH, 'mark');
      tx = bx + m.markW + m.gapM; ty = by + (m.H - m.textH) / 2; align = 'left';
    } else {
      pic(ctx, B, markImg, R.x + (R.w - m.markW) / 2, by, m.markW, m.markH, 'mark');
      tx = R.x + R.w / 2; ty = by + m.markH + u * 1.6; align = 'center';
    }
    ctx.textAlign = align; ctx.textBaseline = 'alphabetic';
    const lines = (blk, font, size, lh, color, spacing, k) => { ctx.font = font; ctx.fillStyle = color; ctx.letterSpacing = spacing || '0px'; blk.lines.forEach(l => { ty += size * lh; txt(ctx, B, l, tx, ty - size * (lh - 1) / 2 - size * .2, k); }); ctx.letterSpacing = '0px'; };
    if (m.eye.lines.length){ lines(m.eye, F_EYE(u), u * 1.4, 1.3, P.acc, (u * .06) + 'px', 'eyebrow'); ty += u * .5; }
    nameLines(ctx, m.name, F_NAME(u), u * 4.4, tx, ty, align, P.ink, B); ty += m.name.lines.length * u * 4.4 * 1.08;
    if (m.head.lines.length){ ty += u * 1.1; lines(m.head, F_HEAD(u), u * 3.1, 1.12, P.ink, '0px', 'head'); }
    if (m.msg.lines.length){ ty += u * .7; lines(m.msg, F_MSG(u), u * 2.5, 1.22, P.acc, '0px', 'msg'); }
    if (m.note.lines.length){ ty += u * .9; lines(m.note, F_NOTE(u), u * 1.75, 1.32, P.ink, '0px', 'note'); }
    if (m.list.length){
      // The list as one left-aligned block, centered under the words on tall cards; a small round bullet before each offer.
      ty += u * 1.4; const lx = o.horiz ? tx : tx - m.listW / 2, sz = u * 1.6, r = u * .26;
      ctx.textAlign = 'left'; ctx.font = F_LIST(u);
      m.list.forEach((b, i) => {
        if (i) ty += u * .55;
        const by0 = ty + sz * 1.3 - sz * .15 - sz * .2 - sz * .34;
        ctx.fillStyle = P.acc; ctx.beginPath(); ctx.arc(lx + r, by0, r, 0, Math.PI * 2); ctx.fill(); B.push({k: 'bullet', x: lx, y: by0 - r, w: 2 * r, h: 2 * r});
        ctx.fillStyle = P.ink; b.lines.forEach(l => { ty += sz * 1.3; txt(ctx, B, l, lx + m.bi, ty - sz * .15 - sz * .2, 'list'); });
      });
      ctx.textAlign = align;
    }
    if (m.line.lines.length){ ty += u * .8; lines(m.line, F_LINE(u), u * 1.25, 1.4, P.soft, (u * .025) + 'px', 'line'); }
    if (m.rowH){
      ty += u * 1.3; let x = horiz ? tx : tx - m.rowW / 2;
      imgs.slice(1).forEach(im => { pic(ctx, B, im, x, ty, m.rowH, m.rowH, 'marks'); x += m.rowH + u * .55; });
    }
    ctx.shadowColor = 'rgba(0,0,0,0)'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
    if (qrM) drawQR(ctx, qrM, qx, qy, qs, pnt, B);
  }
  canvas.fit = m ? {x: bx, y: by, w: m.W, h: m.H, u: m.u, R, parts: m.parts, side, qr: qrM ? {x: qx, y: qy, s: qs, url: qrUrl} : null} : null;
  // The site, small at the bottom, in the ground band.
  // Print: the line (or two, broken after a slash) is sized to the safe width and set on the safe line's inside.
  const fill = look === 'light' ? SOFT : P.soft;
  if (pr){
    ctx.font = F_SITE(site.us); ctx.letterSpacing = (site.us * .08) + 'px'; ctx.fillStyle = fill; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    site.lines.forEach((l, i) => txt(ctx, B, l, W / 2, site.base[i], 'site'));
    ctx.letterSpacing = '0px';
  } else {
    // On screen: the line shrinks, when it must, to the width it has.
    const room = banner ? RS.w : W * .9, s0 = Math.max(band * .4, 9), us = Math.min(s0, s0 * room / Math.max(1, siteWidth(ctx, siteOf(sub), s0)));
    if (us >= 9){
      ctx.font = F_SITE(us); ctx.letterSpacing = (us * .08) + 'px'; ctx.fillStyle = fill; ctx.textBaseline = 'middle';
      if (banner){ ctx.textAlign = 'right'; txt(ctx, B, siteOf(sub), RS.x + RS.w, bandTop + band / 2, 'site'); }
      else { ctx.textAlign = 'center'; txt(ctx, B, siteOf(sub), W / 2, bandTop + band / 2, 'site'); }
      ctx.letterSpacing = '0px';
    }
  }
  return canvas;
}

// ---------- view ----------
const CSS = `
.sc-wrap{display:grid;grid-template-columns:minmax(0,380px) minmax(0,1fr);gap:18px;align-items:start;}
@media (max-width:900px){.sc-wrap{grid-template-columns:minmax(0,1fr);}.sc-prev{position:static;}}
.sc-wrap .card{min-width:0;}
.sc-chips{display:flex;flex-wrap:wrap;gap:8px;}
.sc-prev{position:sticky;top:12px;}
.sc-stage{background:var(--bg-deep);border:1px solid var(--line);border-radius:12px;padding:12px;display:flex;justify-content:center;align-items:center;min-height:160px;}
.sc-stage canvas{display:block;max-width:100%;max-height:66vh;width:auto;height:auto;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.16);}
.sc-meta{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-top:12px;}
.sc-cb{display:flex;align-items:center;gap:8px;margin-top:12px;font-weight:600;color:var(--ink-soft);}
.sc-cb{overflow-wrap:anywhere;min-width:0;}
.sc-bio{border-top:1px solid var(--line);padding:14px 0;}
.sc-bio:first-of-type{border-top:0;}
.sc-bio p{white-space:pre-wrap;margin:6px 0;overflow-wrap:anywhere;}
.sc-count{font-weight:600;font-size:14px;color:var(--ink-soft);}
.sc-count.over{color:var(--danger);}
.sc-wrap select,.sc-bios select{max-width:100%;}
.sc-guide{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:8px;font-size:14px;color:var(--ink-soft);}
.sc-guide i{display:inline-block;width:18px;height:0;border-top:2px dashed;vertical-align:middle;margin-right:6px;}
.sc-guide .tr i{color:#C0392B;} .sc-guide .sf i{color:#1F78C8;}
.sc-guide .bl i{border:0;height:10px;width:14px;background:rgba(255,255,255,.55);outline:1px solid var(--line);}
.sc-saves{display:flex;flex-wrap:wrap;gap:8px;}
.sc-ownw{border:1px solid var(--line);border-radius:10px;padding:12px;margin-top:14px;}
.sc-ownw input[type=text],.sc-ownw textarea{width:100%;max-width:100%;box-sizing:border-box;}
.sc-ownw .sc-count{margin-top:4px;font-weight:500;}
`;
function chips(key, list, val){ return `<div class="sc-chips" role="group">${list.map(([k, l]) => `<button type="button" class="chip" data-sc="${key}" data-v="${esc(k)}" aria-pressed="${val === k}">${esc(l)}</button>`).join('')}</div>`; }
const fmtIn = n => String(n);
const clip = (t, n) => { t = String(t); return t.length > n ? t.slice(0, n - 3).replace(/\s+\S*$/, '') + '...' : t; };

function biosHtml(D){
  // A bio's subject is a card subject (Grow With Grounded) or a person (Chris Joy, Kayti Joy); a person's name comes from PEOPLE or the start of the bio's label.
  const subName = id => { const s = D.subjects.find(x => x.id === id || (id === 'grounded' && isGWG(x))); if (s) return s.name; if (PEOPLE[id]) return PEOPLE[id]; if (id === 'all') return 'Every Subject';
    const b = D.bios.find(x => x.subject === id && x.label); return b ? String(b.label).split(',')[0] : id; };
  const platName = id => (D.platforms.find(p => p.id === id) || {}).name || id;
  const subs = [...new Set(D.bios.map(b => b.subject))];
  const list = D.bios.map((b, i) => [b, i]).filter(([b]) => S.bios === 'all' || b.subject === S.bios);
  const order = D.platforms.map(p => p.id).concat([...new Set(D.bios.map(b => b.platform))]);
  const plats = [...new Set(order)].filter(p => list.some(([b]) => b.platform === p));
  return `<div class="card sc-bios" style="margin-top:18px"><h2 style="margin-bottom:4px">Bios</h2><p class="muted">A bio for each platform, written to its length. Tap Copy and paste it into the profile.</p>
  ${subs.length > 1 ? `<label class="f" for="sc-biosub">Show</label><select id="sc-biosub" data-sc="bios"><option value="all">Every Bio</option>${subs.map(s => `<option value="${esc(s)}"${S.bios === s ? ' selected' : ''}>${esc(subName(s))}</option>`).join('')}</select>` : ''}
  ${plats.length ? plats.map(p => `<h3 style="margin-top:16px">${esc(platName(p))}</h3>${list.filter(([b]) => b.platform === p).map(([b, i]) => { const n = chars(b.text), lim = +b.limit || 0; const aim = +b.aim || 0, nm = subName(b.subject), head = b.label ? (String(b.label).indexOf(nm) === 0 ? b.label : nm + ', ' + b.label) : nm + ', ' + platName(b.platform) + (b.part ? ' ' + b.part : '');
      return `<div class="sc-bio"><div class="spread"><b>${esc(head)}</b><span class="sc-count${lim && n > lim ? ' over' : ''}">${n}${aim ? ' characters, aiming for ' + aim + (lim ? ' (' + platName(b.platform) + ' allows ' + lim + ')' : '') : (lim ? ' of ' + lim : '') + ' characters'}</span></div><p>${esc(b.text)}</p><button type="button" class="btn btn-line btn-sm" data-sc="copy-bio" data-v="${i}">Copy</button></div>`; }).join('')}`).join('') : `<p class="muted" style="margin-top:10px">The bios arrive with the next Staff library update.</p>`}</div>`;
}
const WITH = [['place', 'In Place of the Tagline'], ['along', 'Along With the Tagline']];
const countOf = (n, max, best) => `${n} of ${max} characters${n > best ? ', shorter reads best' : ''}`;
// Your Own Words: a headline and a short message for an event, a date, a time, or a place.
function ownHtml(){
  return `<div class="sc-ownw"><h3 style="margin:0 0 2px">Your Own Words</h3><p class="muted" style="margin:0;font-size:15px">Add an event, a date, a time, or a place. The words fit themselves to every format and print size.</p>
    <label class="f" for="sc-head">Headline</label><input type="text" id="sc-head" data-sc="head" maxlength="${HEAD_MAX}" value="${esc(S.head)}" placeholder="An Evening of Remembrance" autocomplete="off">
    <div class="sc-count" id="sc-head-n">${countOf(chars(S.head), HEAD_MAX, HEAD_BEST)}</div>
    <label class="f" for="sc-note">Short Message</label><textarea id="sc-note" data-sc="note" rows="3" maxlength="${NOTE_MAX}" placeholder="Thursday, November 12, 7 PM&#10;The Community Room">${esc(S.note)}</textarea>
    <div class="sc-count" id="sc-note-n">${countOf(chars(S.note), NOTE_MAX, NOTE_BEST)}, up to five lines</div>
    <label class="f">Show Your Words</label>${chips('with', WITH, S.with)}
    <div style="margin-top:10px"><button type="button" class="btn btn-line btn-sm" data-sc="clear-own">Clear</button> <span class="muted" style="font-size:14px">Returns the card to the subject's own words.</span></div></div>`;
}
function inner(){
  const c = current(), {D, sub, msgs, plat, fmts, W, H} = c, pr = c.print;
  const groups = KINDS.map(([k, l]) => [l, msgs.map((m, i) => [m, i]).filter(([m]) => (m.kind || 'slogan') === k)]).filter(g => g[1].length);
  const msgSel = `<select id="sc-msg" data-sc="msg"><optgroup label="Tagline"><option value="tag"${S.msg === 'tag' ? ' selected' : ''}>${esc(clip(sub.tagline || 'The tagline', 80))}</option></optgroup>
    ${groups.map(([l, list]) => `<optgroup label="${esc(l)}">${list.map(([m, i]) => `<option value="m:${i}"${S.msg === 'm:' + i ? ' selected' : ''}>${esc(clip(m.text, 80))}</option>`).join('')}</optgroup>`).join('')}
    <optgroup label="Your Words"><option value="own"${S.msg === 'own' ? ' selected' : ''}>Write My Own</option></optgroup></select>`;
  return `<div class="page-head"><div class="eyebrow">Grow With Grounded</div><h1>Share Card Builder</h1><p>Make a card or banner for any platform, sized and ready to post.</p></div>
  <div class="sc-wrap">
    <div class="card">
      <label class="f" for="sc-sub">Subject</label>
      <select id="sc-sub" data-sc="subject">${[['Grow With Grounded', D.subjects.filter(s => !s.svc)], ['Services: Families', D.subjects.filter(s => s.svc === 'family')], ['Services: Pages', D.subjects.filter(s => s.svc === 'page')], ['For Organizations', D.subjects.filter(s => s.svc === 'org')]].filter(g => g[1].length).map(([l, list]) => `<optgroup label="${esc(l)}">${list.map(s => `<option value="${esc(s.id)}"${s.id === sub.id ? ' selected' : ''}>${esc(s.name)}</option>`).join('')}</optgroup>`).join('')}</select>
      <label class="f" for="sc-msg">Message</label>${msgSel}
      ${S.msg === 'own' ? `<label class="f" for="sc-own">Your Message</label><textarea id="sc-own" data-sc="own" rows="3" placeholder="Type the words for the card.">${esc(S.own)}</textarea>` : ''}
      ${ownHtml()}
      <label class="f">Platform</label>${chips('platform', D.platforms.map(p => [p.id, p.name]).concat([[PRINT.id, PRINT.name]]), plat.id)}
      <label class="f">${c.print ? 'Size' : 'Format'}</label>${chips('format', fmts, S.format)}
      ${c.print ? `<label class="f">Orientation</label>${chips('orient', ORIENTS, S.orient)}` : ''}
      <label class="f">Look</label>${chips('look', LOOKS, S.look)}
      ${isGWG(sub) ? `<label class="sc-cb"><input type="checkbox" data-sc="marks"${S.marks ? ' checked' : ''}> Show the eight tree marks</label>` : ''}
      <label class="sc-cb"><input type="checkbox" data-sc="qr"${S.qr ? ' checked' : ''}> Add a QR Code to ${esc(siteOf(sub))}</label>
    </div>
    <div class="card sc-prev">
      <div class="sc-stage"><canvas id="sc-canvas" width="${W}" height="${H}" role="img" aria-label="${esc(sub.name)} ${esc(plat.name)} ${esc(pr ? pr.size.name : S.format)} preview"></canvas></div>
      ${pr ? `<div class="sc-guide"><span class="tr"><i></i>Trim</span><span class="sf"><i></i>Safe area: words and codes stay inside</span><span class="bl"><i></i>Bleed: the picture runs past the trim</span></div>` : ''}
      <div class="sc-meta"><span class="muted">${pr ? `<b>${esc(pr.size.name)}, ${esc(S.orient === 'wide' ? 'Wide' : 'Tall')}</b>, ${fmtIn(pr.inW)} by ${fmtIn(pr.inH)} inches plus bleed, ${W} by ${H} pixels at ${DPI} dpi` : `<b>${esc(plat.name)} ${esc((FORMATS.find(f => f[0] === S.format) || [])[1] || '')}</b>, ${W} by ${H} pixels`}</span>
        <span class="sc-saves"><button type="button" class="btn btn-gold" data-sc="save">Save Image</button>${pr ? '<button type="button" class="btn btn-line" data-sc="save-pdf">Save PDF</button>' : ''}</span></div>
      ${pr ? `<p class="muted" style="margin-top:8px;font-size:15px">Print ready at ${DPI} dpi with an eighth inch of bleed on every edge. The trim and safe lines show here only; the saved file is clean.</p>` : ''}
      ${(plat.safe || plat.safeNote) && S.format === 'banner' ? `<p class="muted" style="margin-top:8px;font-size:15px">${esc(plat.safe || plat.safeNote)}</p>` : ''}
    </div>
  </div>
  ${biosHtml(D)}`;
}
let TOKEN = 0;
function paint(){
  const cv = document.getElementById('sc-canvas'); if (!cv) return;
  const t = ++TOKEN, c = current();
  const off = document.createElement('canvas');
  draw(off, c, S.look).then(() => { if (t !== TOKEN || !document.body.contains(cv)) return; cv.width = off.width; cv.height = off.height; const x = cv.getContext('2d'); x.drawImage(off, 0, 0); if (c.print) guides(x, c); cv.dataset.ready = '1'; }).catch(e => { console.warn('Share card', e); });
}
// The preview's print guides: the bleed lightened, the trim line, and the safe line.
function guides(x, c){
  const {W, H} = c, b = c.print.bleed, k = b + c.print.safe, lw = Math.max(2, Math.round(Math.min(W, H) / 320));
  x.save();
  x.fillStyle = 'rgba(255,255,255,.5)';
  x.fillRect(0, 0, W, b); x.fillRect(0, H - b, W, b); x.fillRect(0, b, b, H - 2 * b); x.fillRect(W - b, b, b, H - 2 * b);
  x.lineWidth = lw; x.setLineDash([lw * 5, lw * 3]);
  x.strokeStyle = '#C0392B'; x.strokeRect(b, b, W - 2 * b, H - 2 * b);
  x.strokeStyle = '#1F78C8'; x.strokeRect(k, k, W - 2 * k, H - 2 * k);
  x.restore();
}
function rerender(){ const r = document.getElementById('sc-root'); if (!r) return; r.innerHTML = inner(); paint(); }
function toast(t){ const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 2200); }
async function copyText(t){
  try { await navigator.clipboard.writeText(t); }
  catch (e){ const a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (x){} a.remove(); }
  toast('Copied.');
}
function fileName(c, ext){
  const parts = c.print ? [slug(c.sub.name), 'Print', slug(c.print.size.name), S.orient === 'wide' ? 'Wide' : 'Tall', c.W + 'x' + c.H, DPI + 'dpi'] : [slug(c.sub.name), slug(c.plat.name), (FORMATS.find(f => f[0] === S.format) || ['', 'Card'])[1], c.W + 'x' + c.H];
  return parts.join('-') + '.' + ext;
}
function download(blob, name){ const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); toast('Saved ' + name); }
const blobOf = (cv, type, q) => new Promise(ok => cv.toBlob(ok, type, q));
// CRC32 for PNG chunks.
let CRC = null;
function crc32(bytes){
  if (!CRC){ CRC = new Uint32Array(256); for (let n = 0; n < 256; n++){ let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; CRC[n] = c >>> 0; } }
  let c = 0xFFFFFFFF; for (let i = 0; i < bytes.length; i++) c = CRC[(c ^ bytes[i]) & 255] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
// Mark a PNG as 300 dpi (a pHYs chunk after the header), so print shops and editors read its true size.
async function withDpi(blob, dpi){
  const src = new Uint8Array(await blob.arrayBuffer()), ppm = Math.round(dpi / .0254);
  const ch = new Uint8Array(21), dv = new DataView(ch.buffer);
  dv.setUint32(0, 9); ch.set([112, 72, 89, 115], 4); dv.setUint32(8, ppm); dv.setUint32(12, ppm); ch[16] = 1;
  dv.setUint32(17, crc32(ch.subarray(4, 17)));
  const at = 33; // signature (8) and IHDR (25)
  return new Blob([src.subarray(0, at), ch, src.subarray(at)], {type: 'image/png'});
}
// A one page PDF holding the card as a high quality JPEG: the page is the full bleed size, with the TrimBox at the finished size.
async function pdfOf(cv, c){
  const jpg = new Uint8Array(await (await blobOf(cv, 'image/jpeg', .95)).arrayBuffer());
  const pw = c.W / DPI * 72, ph = c.H / DPI * 72, bp = BLEED * 72, f = n => (Math.round(n * 1000) / 1000).toString();
  const content = 'q ' + f(pw) + ' 0 0 ' + f(ph) + ' 0 0 cm /Im0 Do Q';
  const enc = new TextEncoder(), parts = [], offs = []; let len = 0;
  const push = x => { const b = typeof x === 'string' ? enc.encode(x) : x; parts.push(b); len += b.length; };
  push('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  const obj = (n, body, stream) => { offs[n] = len; push(n + ' 0 obj\n' + body); if (stream){ push('\nstream\n'); push(stream); push('\nendstream'); } push('\nendobj\n'); };
  obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
  obj(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  obj(3, '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + f(pw) + ' ' + f(ph) + '] /BleedBox [0 0 ' + f(pw) + ' ' + f(ph) + '] /TrimBox [' + f(bp) + ' ' + f(bp) + ' ' + f(pw - bp) + ' ' + f(ph - bp) + '] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>');
  obj(4, '<< /Length ' + enc.encode(content).length + ' >>', content);
  obj(5, '<< /Type /XObject /Subtype /Image /Width ' + c.W + ' /Height ' + c.H + ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + jpg.length + ' >>', jpg);
  obj(6, '<< /Title (' + String(cardName(c.sub)).replace(/\u2122/g, '').replace(/[()\\]/g, '') + ' ' + c.print.size.name + ') /Producer (Grounded Field Guide) >>');
  const xref = len; let x = 'xref\n0 7\n0000000000 65535 f \n';
  for (let i = 1; i <= 6; i++) x += String(offs[i]).padStart(10, '0') + ' 00000 n \n';
  push(x + 'trailer\n<< /Size 7 /Root 1 0 R /Info 6 0 R >>\nstartxref\n' + xref + '\n%%EOF\n');
  return new Blob(parts, {type: 'application/pdf'});
}
async function save(pdf){
  const c = current(); const cv = await draw(document.createElement('canvas'), c, S.look);
  if (c.print && pdf){ download(await pdfOf(cv, c), fileName(c, 'pdf')); return; }
  let b = await blobOf(cv, 'image/png'); if (!b) return;
  if (c.print){ try { b = await withDpi(b, DPI); } catch (e){} }
  download(b, fileName(c, 'png'));
}

document.addEventListener('click', e => {
  const t = e.target.closest && e.target.closest('#sc-root [data-sc]'); if (!t || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA' || t.tagName === 'INPUT') return;
  const k = t.dataset.sc, v = t.dataset.v;
  if (k === 'save'){ save(false); return; }
  if (k === 'save-pdf'){ save(true); return; }
  if (k === 'copy-bio'){ const b = data().bios[+v]; if (b) copyText(b.text); return; }
  if (k === 'clear-own'){ S.head = ''; S.note = ''; S.with = 'place'; if (S.msg === 'own'){ S.msg = 'tag'; S.own = ''; } rerender(); return; }
  if (k === 'with'){ S.with = v === 'along' ? 'along' : 'place'; rerender(); return; }
  if (k === 'platform' || k === 'format' || k === 'look' || k === 'orient'){
    // A business card prints wide; the other print sizes start tall.
    if (k === 'format' && S.platform === 'print' && v !== S.format) S.orient = v === 'pbiz' ? 'wide' : (S.format === 'pbiz' ? 'tall' : S.orient);
    S[k] = v; rerender();
  }
});
document.addEventListener('change', e => {
  const t = e.target; if (!t.closest || !t.closest('#sc-root') || !t.dataset.sc) return;
  const k = t.dataset.sc;
  if (k === 'subject'){ S.subject = t.value; S.msg = 'tag'; rerender(); }
  else if (k === 'msg'){ S.msg = t.value; rerender(); if (S.msg === 'own'){ const o = document.getElementById('sc-own'); if (o) o.focus(); } }
  else if (k === 'marks'){ S.marks = t.checked; paint(); }
  else if (k === 'qr'){ S.qr = t.checked; paint(); }
  else if (k === 'bios'){ S.bios = t.value; rerender(); }
});
let ownT = null;
document.addEventListener('input', e => {
  const t = e.target; if (!t.closest || !t.closest('#sc-root')) return;
  const k = t.dataset.sc; if (k !== 'own' && k !== 'head' && k !== 'note') return;
  S[k] = t.value;
  if (k === 'head'){ const n = document.getElementById('sc-head-n'); if (n) n.textContent = countOf(chars(S.head), HEAD_MAX, HEAD_BEST); }
  if (k === 'note'){ const n = document.getElementById('sc-note-n'); if (n) n.textContent = countOf(chars(S.note), NOTE_MAX, NOTE_BEST) + ', up to five lines'; }
  clearTimeout(ownT); ownT = setTimeout(paint, 180);
});

(function(){ const s = document.createElement('style'); s.id = 'sc-css'; s.textContent = CSS; document.head.appendChild(s); })();

window.GGShare = {
  view(lib){ LIB = lib || null; setTimeout(paint, 0); return `<div id="sc-root">${inner()}</div>`; },
  // For tests and the lead: draw any card off screen. o = {subject, msg, own, platform, format, look, marks, orient, qr, head, note, with}.
  // The canvas carries boxes: every drawn word, mark, and code, for the safe line check.
  render(o){ Object.assign(S, o || {}); return draw(document.createElement('canvas'), current(), S.look); },
  // For tests: the saved files as Blobs (PNG with its dpi, and the print PDF).
  async files(o){ Object.assign(S, o || {}); const c = current(), cv = await draw(document.createElement('canvas'), c, S.look); const png = await blobOf(cv, 'image/png'); return {png: c.print ? await withDpi(png, DPI) : png, pdf: c.print ? await pdfOf(cv, c) : null, name: fileName(c, 'png'), W: c.W, H: c.H}; },
  state: S, data, cardName
};
})();
