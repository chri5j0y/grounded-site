/* =====================================================================
   SOURCES AND CREDITS (shared/gg-sources.js)   Sources and Credits build, GWG BLD 713, October 2026
   One quiet line at the end of every video (under the closing scene, above the copyright line),
   every written guide, and every practice. The narration never names a source; this line does.

   The rules (decided in BLD 712 and 713):
   - Credit only what is certain. Anything traceable to a named person, program, or study, every
     "research shows" line, and every one of Chris's stories.
   - Where a reader would expect a source and none can be confirmed, the line says "Source unknown."
   - Common practices with no clear originator (5-4-3-2-1, slow breathing, box breathing) get no line.
   - Practices say "Adapted from" for the method they come from. Research behind a "why" line is "Sources".
   - Books on Chris's shelf link to their card in the Library (the card carries the Amazon link).
     Off-shelf books and studies link to their own home page or DOI.
   - Stories: published, "Story: Chris Joy, <title> · Read it on Grounded" (the Substack link).
     Unpublished, "Story: Chris Joy, from my notebook. Names and details changed."

   For tools
     GGSources.html(key)              the line for one item, e.g. 'willow:forgive', 'oak:anxiety'
     GGSources.practice(name, app, b) the line for a practice by its name (b: bedside story, optional)
     GGSources.lesson(app, lesson)    the line for a video: lesson.sources, or this file's list for its
                                      id, plus a Story line for every story scene in it
     GGSources.line(list, opts)       draw any list of source ids or {label, href} objects
   Sealed lessons (Field library) carry their own sources: ['id', ...] or [{label, href}].
   Edit sources here. Proofreading lines are in the Founder library (p9k-sources).
   ===================================================================== */
(function () {
  if (window.GGSources) return;
  var SHELF = '/library/#book=';

  // id: [label, link, kind]. kind 'a' = a method or tradition (Adapted from, on a practice); otherwise research or a book.
  var SRC = {
    byock4: ['Ira Byock, The Four Things That Matter Most', SHELF + 'DY-002'],
    hansen: ['Hansen, Enright, Baskin, and Klatt, a forgiveness program for terminally ill elders (2009)', 'https://doi.org/10.1177/082585970902500106'],
    blundon: ['Blundon, Gallagher, and Ward, preserved hearing at the end of life (2020)', 'https://doi.org/10.1038/s41598-020-67234-9'],
    amen: ['Cooper, Ferguson, Bodurtha, and Smith, AMEN in Challenging Conversations (Johns Hopkins, 2014)', 'https://doi.org/10.1200/JOP.2014.001375', 'a'],
    chochinov: ['Chochinov and colleagues, Burden to Others and the Terminally Ill (2007)', 'https://doi.org/10.1016/j.jpainsymman.2006.12.012'],
    tang: ['Tang and colleagues, self-perceived burden as death approaches (2017)', 'https://doi.org/10.1002/pon.4107'],
    kerr: ['Kerr and colleagues, end-of-life dreams and visions (2014)', 'https://researchconnect.buffalo.edu/en/publications/end-of-life-dreams-and-visions-a-longitudinal-study-of-hospice-pa/'],
    dazzi: ['Dazzi, Gribble, Wessely, and Fear, does asking about suicide induce suicidal ideation? (2014)', 'https://doi.org/10.1017/S0033291714001299'],
    borkovec: ['Borkovec and colleagues, scheduled worry time (1983)', 'https://doi.org/10.1016/0005-7967(83)90206-1', 'a'],
    lieberman: ['Lieberman and colleagues, putting feelings into words (2007)', 'https://doi.org/10.1111/j.1467-9280.2007.01916.x'],
    siegel: ['Daniel J. Siegel and Tina Payne Bryson, The Whole-Brain Child ("name it to tame it")', 'https://drdansiegel.com/', 'a'],
    holt: ['Holt-Lunstad, Smith, and Layton, social relationships and mortality risk (2010)', 'https://doi.org/10.1371/journal.pmed.1000316'],
    koenig: ['Harold G. Koenig, religion, spirituality, and health (2012)', 'https://doi.org/10.5402/2012/278730'],
    snyder: ['C. R. Snyder, hope theory (2002)', 'https://doi.org/10.1207/S15327965PLI1304_01', 'a'],
    seligman: ['Seligman and colleagues, the gratitude visit and three good things (2005)', 'https://doi.org/10.1037/0003-066X.60.5.410', 'a'],
    froh: ['Froh, Sefick, and Emmons, counting blessings in early adolescents (2008)', 'https://pubmed.ncbi.nlm.nih.gov/?term=Counting+blessings+in+early+adolescents+Froh', 'a'],
    king: ['Laura A. King, the health benefits of writing about life goals (2001)', 'https://doi.org/10.1177/0146167201277003', 'a'],
    pennebaker: ['Pennebaker and Beall, expressive writing (1986)', 'https://doi.org/10.1037/0021-843X.95.3.274', 'a'],
    white: ['White and colleagues, two hours a week in nature (2019)', 'https://www.nature.com/articles/s41598-019-44097-3'],
    sturm: ['Sturm and colleagues, awe walks (2020)', 'https://pubmed.ncbi.nlm.nih.gov/?term=Big+smile+small+self+awe+walks+Sturm'],
    ggsc: ['Greater Good Science Center, Awe Walk', 'https://ggia.berkeley.edu/practice/awe_walk', 'a'],
    noetel: ['Noetel and colleagues, exercise for depression (BMJ, 2024)', 'https://bmj.com/content/384/bmj-2023-075847'],
    fredrickson: ['Fredrickson and colleagues, loving-kindness meditation and positive emotions (2008)', 'https://doi.org/10.1037/a0013262'],
    neff: ['Kristin Neff, Self-Compassion', SHELF + 'CM-001', 'a'],
    act: ['Hayes, Strosahl, and Wilson, Acceptance and Commitment Therapy', 'https://contextualscience.org/', 'a'],
    examen: ['Ignatius of Loyola, the Daily Examen', 'https://www.jesuits.org/spirituality/the-ignatian-examen/', 'a'],
    centering: ['Thomas Keating and Contemplative Outreach, Centering Prayer', 'https://www.contemplativeoutreach.org/centering-prayer-method/', 'a'],
    lectio: ['lectio divina, the monastic practice of sacred reading', 'https://www.contemplativeoutreach.org/lectio-divina-contemplation/', 'a'],
    metta: ['metta, the Buddhist practice of loving-kindness', '', 'a'],
    quaker: ['the Quaker practice of holding someone in the Light', '', 'a'],
    wrz: ['Wrzesniewski and Dutton, job crafting (2001)', 'https://doi.org/10.5465/amr.2001.4378011', 'a'],
    litz: ['Litz and colleagues, moral injury and moral repair (2009)', 'https://doi.org/10.1016/j.cpr.2009.07.003'],
    boss: ['Pauline Boss, Ambiguous Loss', 'https://www.ambiguousloss.com', 'a'],
    exline: ['Exline, Pargament, Grubbs, and Yali, religious and spiritual struggles (2014)', 'https://doi.org/10.1037/a0036465'],
    hope: ['Anandarajah and Hight, the HOPE questions for a spiritual history (2001)', 'https://www.aafp.org/pubs/afp/issues/2001/0101/p81.html', 'a'],
    fica: ['Puchalski and Romer, the FICA spiritual history (2000)', 'https://doi.org/10.1089/jpm.2000.3.129', 'a'],
    sicg: ['Ariadne Labs, Serious Illness Conversation Guide', 'https://www.ariadnelabs.org/serious-illness-care/', 'a']
  };

  // Written guides, videos, and lessons. 'unknown' adds "Source unknown" for a line that needs one.
  var C = {
    'willow:miracle': ['amen'],
    'willow:forgive': ['byock4', 'hansen'],
    'willow:burden': ['chochinov', 'tang'],
    'willow:end': ['dazzi'],
    'willow:hear': ['blundon'],
    'willow:visions': ['kerr'],
    'willow:hanging': ['byock4'],
    'oak:anxiety': ['borkovec'],
    'oak:ambiguous-loss': ['boss'],
    'oak:moral-injury': ['litz'],
    'oak:bedside': ['blundon'],
    'maple:sadness': ['dazzi'],
    'maple:wanting-die': ['dazzi'],
    'aspen:drinking': ['unknown'],
    // When Life Changes videos (Willow)
    'video:wl-g-forgive-you': ['byock4'],
    'video:wl-g-forgive-helper': ['byock4', 'hansen'],
    'video:wl-g-end-helper': ['dazzi'],
    'video:wl-g-signs-helper': ['blundon'],
    'video:wl-g-hear-you': ['blundon'],
    'video:wl-g-hear-helper': ['blundon'],
    'video:wl-g-visions-you': ['kerr'],
    'video:wl-g-visions-helper': ['kerr'],
    'video:wl-g-hanging-you': ['byock4'],
    'video:wl-g-hanging-helper': ['byock4'],
    // Learn lessons and Support for Right Now
    'video:ok-6-roots': ['koenig'],
    'video:ok-6-trunk': ['unknown'],
    'video:ok-6-bark': ['lieberman', 'siegel'],
    'video:ok-6-branches': ['holt'],
    'video:ok-6-leaves': ['unknown'],
    'video:ok-6-fruit': ['snyder'],
    'video:ok-s-struggle': ['dazzi'],
    'video:wl-s-say': ['byock4', 'blundon'],
    'video:wl-s-hear': ['blundon'],
    'video:wl-h-weeks': ['kerr'],
    'video:wl-h-words': ['blundon']
  };

  // Practices by name, everywhere they appear. P_RE is matched against the name (Aspen names are sentences).
  var P = {
    'examen': ['examen'], 'awe walk': ['ggsc', 'sturm'], 'hold someone in light': ['quaker'], 'slow sacred reading': ['lectio'],
    'scripture': ['lectio'], 'centering prayer': ['centering'], 'values sort': ['act'], 'leaves on a stream': ['act'],
    'worry window': ['borkovec'], 'expressive writing': ['pennebaker'], 'name it': ['lieberman'], 'say it out loud': ['lieberman'],
    'self-compassion break': ['neff'], 'kind voice letter': ['neff'], 'loving-kindness': ['metta'], 'gratitude letter': ['seligman'],
    'three good things': ['seligman'], 'best possible self': ['king'], 'hope map': ['snyder'], 'two hours outdoors': ['white'],
    'job crafting': ['wrz'], 'one of the four things': ['byock4'], 'talk about dying, once': ['dazzi']
  };
  var P_RE = [[/three good things/i, ['seligman']]];
  // Extra credits where one app's own words make a research claim (Oak's "Why it helps").
  var PX = {
    'oak:awe walk': ['ggsc', 'sturm'], 'oak:loving-kindness': ['metta', 'fredrickson'], 'oak:expressive writing': ['pennebaker', 'unknown'],
    'oak:walk or jog': ['noetel'], 'oak:yoga': ['noetel'], 'oak:purpose statement': ['unknown'], 'oak:moral repair letter': ['litz'],
    'maple:three good things': ['froh'], 'aspen:three good things': ['froh'], 'grove-kid:three good things': ['froh']
  };

  // Chris's stories. Published: the Substack link ('' while the link is still to come). Anything not listed is from the notebook.
  var PUB = {
    'he was praying too': 'https://chri5j0y.substack.com/p/he-was-praying-too',
    'the atypical atheist': 'https://chri5j0y.substack.com/p/the-atypical-atheist',
    'he came to collect': 'https://chri5j0y.substack.com/p/he-came-to-collect',
    'total bliss': 'https://chri5j0y.substack.com/p/total-bliss',
    'the recovery': 'https://chri5j0y.substack.com/p/the-recovery',
    'drift away': 'https://chri5j0y.substack.com/p/drift-away',
    'welcome home': 'https://chri5j0y.substack.com/p/welcome-home',
    'please help my dad die': 'https://chri5j0y.substack.com/p/please-help-my-dad-die',
    'if she is still here': 'https://chri5j0y.substack.com/p/if-she-is-still-here',
    'grief debt': 'https://chri5j0y.substack.com/p/grief-debt',
    'birth plan': 'https://chri5j0y.substack.com/p/birth-plan',
    'my boundaries have gates': 'https://chri5j0y.substack.com/p/my-boundaries-have-gates',
    'grounded in coffee': 'https://chri5j0y.substack.com/p/grounded-in-coffee',
    'prayer': 'https://chri5j0y.substack.com/p/thank-god-for-sending-you',
    'enlightenment': 'https://chri5j0y.substack.com/p/enlightenment',
    'love': 'https://chri5j0y.substack.com/p/love',
    'the impossible dance of particles': 'https://chri5j0y.substack.com/p/the-impossible-dance-of-particles',
    'why is god doing this to me?': '', 'a presence that cannot be boxed': '', 'the beautiful hodgepodge': '',
    'divine sign': '', 'he deserves that': '', 'i know that one, silly': ''
  };
  var NOTEBOOK = 'Story: Chris Joy, from my notebook. Names and details changed.';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function norm(t) { return String(t || '').replace(/[\u2018\u2019]/g, "'").replace(/\.$/, '').trim().toLowerCase(); }
  function item(x) {
    if (!x) return null;
    if (typeof x === 'string') { if (x === 'unknown') return { unknown: true }; var s = SRC[x]; return s ? { label: s[0], href: s[1], a: s[2] === 'a' } : null; }
    if (Array.isArray(x)) return { label: x[0], href: x[1] || '' };
    if (x.label) return { label: x.label, href: x.href || '', a: !!x.adapted };
    return null;
  }
  function link(x) { return x.href ? '<a href="' + esc(x.href) + '" target="_blank" rel="noopener">' + esc(x.label) + '</a>' : esc(x.label); }
  function storyOf(title) {
    var k = norm(title); if (!k) return null;
    if (Object.prototype.hasOwnProperty.call(PUB, k)) return { title: String(title).replace(/\.$/, ''), href: PUB[k] };
    return { notebook: true };
  }
  // list: source ids or objects. opts: {practice: true, stories: [titles], tag: 'p' or 'small'}
  function line(list, opts) {
    opts = opts || {};
    var seen = {}, adapted = [], src = [], unknown = false;
    (list || []).forEach(function (x) {
      var k = typeof x === 'string' ? x : JSON.stringify(x); if (seen[k]) return; seen[k] = 1;
      var it = item(x); if (!it) return;
      if (it.unknown) { unknown = true; return; }
      (opts.practice && it.a ? adapted : src).push(it);
    });
    var rows = [];
    if (adapted.length) rows.push('<span class="gg-src-k">Adapted from:</span> ' + adapted.map(link).join('; ') + '.');
    if (src.length) rows.push('<span class="gg-src-k">' + (src.length > 1 ? 'Sources:' : 'Source:') + '</span> ' + src.map(link).join('; ') + '.' + (unknown ? ' Other details: source unknown.' : ''));
    else if (unknown) rows.push(adapted.length ? 'Other details: source unknown.' : 'Source unknown.');
    var nb = false, st = {};
    (opts.stories || []).forEach(function (t) {
      var s = storyOf(t); if (!s) return;
      if (s.notebook) { nb = true; return; }
      if (st[s.title]) return; st[s.title] = 1;
      rows.push('<span class="gg-src-k">Story:</span> Chris Joy, ' + esc(s.title) + (s.href ? ' &middot; <a href="' + esc(s.href) + '" target="_blank" rel="noopener">Read it on Grounded</a>' : ''));
    });
    if (nb) rows.push(esc(NOTEBOOK));
    if (!rows.length) return '';
    css();
    if (opts.tag === 'small') return rows.map(function (r) { return '<small class="gg-src-line">' + r + '</small>'; }).join('');
    return '<div class="gg-src">' + rows.map(function (r) { return '<p>' + r + '</p>'; }).join('') + '</div>';
  }
  function html(key, opts) { return line(C[key] || [], opts); }
  function practiceList(name, app) {
    var k = norm(name), out = (P[k] || []).slice();
    if (!out.length) P_RE.forEach(function (r) { if (r[0].test(name)) out = out.concat(r[1]); });
    var x = PX[(app || '') + ':' + k]; if (!x && /three good things/i.test(name)) x = PX[(app || '') + ':three good things'];
    if (x) { out = out.filter(function (id) { return !(x.indexOf('froh') >= 0 && id === 'seligman'); }).concat(x); }
    return out;
  }
  function practice(name, app, bedside) {
    return line(practiceList(name, app), { practice: true, stories: bedside && bedside.story ? [bedside.story] : [] });
  }
  function lesson(app, l, opts) {
    if (!l) return '';
    var list = Array.isArray(l.sources) ? l.sources : (C['video:' + l.id] || []);
    var stories = (l.scenes || []).filter(function (s) { return s && s.k === 'story' && s.title; }).map(function (s) { return s.title; });
    return line(list, Object.assign({ stories: stories }, opts || {}));
  }
  var done = false;
  function css() {
    if (done || typeof document === 'undefined' || !document.head) return; done = true;
    var st = document.createElement('style'); st.id = 'gg-src-css';
    st.textContent = '.gg-src{margin:16px 0 0;font-size:13.5px;line-height:1.45;opacity:.85;}.gg-src p{margin:3px 0;}'
      + '.gg-src a,.gg-src-line a{color:inherit;text-decoration:underline;text-underline-offset:2px;}'
      + '.gg-src-k{font-weight:600;}.gg-src-line{display:block;font-size:13px;line-height:1.4;opacity:.9;margin-top:4px;}'
      + '@media print{.gg-src{opacity:1;font-size:10pt;}.gg-src a{text-decoration:none;}}';
    document.head.appendChild(st);
  }
  window.GGSources = { html: html, practice: practice, practiceList: practiceList, lesson: lesson, line: line, story: storyOf, SRC: SRC, C: C };
})();
