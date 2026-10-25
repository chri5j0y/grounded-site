/* =====================================================================
   HEALTH AND ABILITY (shared/gg-life.js), GWG BLD 756, HA 1
   A person chooses what is part of their life right now (a condition, a
   disability, more than one, none, or "I'd rather not say"), changeable any
   time. The choice only adds and reorders: guides, practices, and videos
   that fit show first, with a few examples and help lines. Questions,
   scores, flags, alerts, and crisis lines never change because of it.

   Where it is kept
   - Inside the person's locked vault (gg-profiles.js), at the top beside
     email, as vault.life, shared by every tree. The offer card's "shown"
     date is vault.lifeOffer (it holds nothing about health).
   - Guests: in memory for this page visit only. Nothing is ever written to
     browser storage outside the lock, and nothing here ever travels: not in
     a Grove handoff, a Visit card, Share to Family, a Willow card, or a plan.
   - Helpers (Birch, Sequoia): private unless the person turns on
     "Share My Health and Ability with my helpers".

   The full API is in the header comments below each section, and in the
   build notes (P/L/API.md). In short:
     GGLife.CATS, cats(tree), get(id), set(obj, id), clear(id), has(),
     chosen(tree), gentle(), fits(tags, adapt), order(rows, tagOf),
     lines(tree), picks(tree, guides), addGuides(tree, guides),
     label(tree, grownView), chooser(host, opt), dialog(tree, opt),
     offerCard(host, tree, opt), use(id), who(), on(fn)
   Living Sober (GWG BLD 789, patches/bld789/C/API.md in grounded-workshop):
     STAGES, stages(tree), sober(tree), soberStage(tree), ring(tree),
     ringShows(tree, key), soberSteps(tree, part). The category 'sober'
     keeps its stage in vault.life.sober; ring 'sober' is low-key (shown
     only when chosen); picks() and order() put Living Sober rows first,
     in stage order (a row's sober: [stage ids], [] fits every stage).
   Living Sober, declared (GWG BLD 837): in Birch, Oak, and Sequoia (DECLARED) the ring shows
     for everyone (ringShows, declared(tree)); choosing a stage stays private. The vault's life
     object also keeps soberDate ('YYYY-MM-DD', only while Living Sober is chosen; only the count
     ever shows) and soberSeen ({at: soberDate, k: [milestone keys shown]}). soberDate(tree),
     soberLines(tree) (the stage's help lines), okDate(d), and My Anchor Plan: anchor(id),
     setAnchor(obj | null, id), kept in vault.soberAnchor. The card, milestones, the plan, and the
     ?sober= link live in shared/gg-sober.js.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGLife) return;

  var TREES = ['maple', 'aspen', 'pine', 'birch', 'oak', 'sequoia'];
  var KIDS = ['maple', 'aspen'];
  var HELPER_TREES = ['birch', 'sequoia'];
  // Living Sober is declared, open to everyone, in the adult trees (GWG BLD 837): its ring and card show whether or not it is chosen.
  var DECLARED = ['birch', 'oak', 'sequoia'];

  /* ---------- the categories (conditions-plan.md, Section 2, decided October 7, 2026) ----------
     words and line per tree. A tree is offered a category only when it is in trees. */
  function same(name) { var o = {}; TREES.forEach(function (t) { o[t] = name; }); return o; }
  function over(base, o) { var r = {}; TREES.forEach(function (t) { r[t] = o[t] != null ? o[t] : base[t]; }); return r; }
  var CATS = [
    { id: 'health', trees: TREES,
      words: over(same('A Long-Term Health Condition'), { maple: 'A Health Condition', aspen: 'A Health Condition' }),
      line: over(same('Like asthma, diabetes, epilepsy, allergies, or heart or lung disease.'), {
        maple: 'Like asthma, allergies, diabetes, or seizures, or a body that hurts or gets sick a lot.',
        aspen: 'Like asthma, allergies, diabetes, or epilepsy, something you take care of every day.' }) },
    { id: 'pain', trees: ['aspen', 'pine', 'birch', 'oak', 'sequoia'],
      words: over(same('Chronic Pain or Fatigue'), { aspen: 'Pain or Headaches That Keep Coming Back' }),
      line: over(same('Pain or tiredness that stays, or keeps coming back.'), {
        aspen: 'Headaches, stomachaches, or other pain or tiredness that keeps coming back.' }) },
    { id: 'moving', trees: TREES,
      words: same('Moving Differently'),
      line: over(same('A wheelchair, crutches, braces, a cane, or a body that moves its own way.'), {
        maple: 'A wheelchair, braces, crutches, or a body that moves its own way.' }) },
    { id: 'hearing', trees: TREES,
      words: over(same('Deaf or Hard of Hearing'), { maple: 'Hearing Differently' }),
      line: over(same('Hearing a little, a lot, or not at all, with or without hearing aids or sign language.'), {
        maple: 'Hearing aids, sign language, or hearing a little or not at all.' }) },
    { id: 'seeing', trees: TREES,
      words: over(same('Blind or Low Vision'), { maple: 'Seeing Differently' }),
      line: over(same('Seeing a little or not at all, with or without a cane, a guide dog, or a screen reader.'), {
        maple: 'Seeing a little or not at all, even with glasses.' }) },
    { id: 'learning', trees: ['maple', 'aspen', 'pine', 'birch', 'oak'],
      words: same('Learning and Attention'),
      line: over(same('ADHD, dyslexia, and other ways a brain learns and focuses.'), {
        maple: 'ADHD, dyslexia, or a brain that learns and focuses its own way.' }) },
    { id: 'autism', trees: TREES,
      words: over(same('Autism or a Developmental Disability'), { maple: 'Autism and Different Ways of Thinking', sequoia: 'A Lifelong or Developmental Disability' }),
      line: over(same('Autism, an intellectual disability, or another lifelong difference in how a person grows and thinks.'), {
        maple: 'Autism, or a brain that thinks and feels the world its own way.',
        sequoia: 'A disability lived with since early in life, like autism or an intellectual disability.' }) },
    { id: 'mind', trees: ['aspen', 'pine', 'birch', 'oak', 'sequoia'],
      words: over(same('A Mental Health Condition'), { aspen: 'Mental Health, With a Counselor\'s or Doctor\'s Help', pine: 'Mental Health, With a Counselor\'s or Doctor\'s Help' }),
      line: over(same('Like depression, anxiety, bipolar disorder, or PTSD, often with help from a counselor or doctor.'), {
        aspen: 'Like anxiety or depression, with a counselor or doctor helping.',
        pine: 'Like anxiety, depression, or OCD, with a counselor or doctor helping.' }) },
    { id: 'serious', trees: ['pine', 'birch', 'oak', 'sequoia'],
      words: same('A Serious Illness or Treatment Right Now'),
      line: same('Like cancer, a transplant, or long hospital stays.') },
    { id: 'memory', trees: ['oak', 'sequoia'],
      words: same('Memory, Thinking, or a Brain Injury'),
      line: same('Memory changes, a stroke, a brain injury, or thinking that works differently than it did.') },
    { id: 'close', trees: TREES,
      words: over(same('Someone Close to Me Lives with One'), { maple: 'Someone in Our Family' }),
      line: over(same('A parent, child, partner, brother or sister, or friend living with any of these.'), {
        maple: 'A brother, sister, parent, or grandparent who lives with any of these.',
        aspen: 'A parent, brother, sister, or grandparent living with any of these.',
        pine: 'A parent, brother, sister, grandparent, or friend living with any of these.' }) },
    { id: 'sober', trees: TREES,
      words: over(same('Living Sober'), { maple: 'Someone in Our Family Drinks or Uses', aspen: 'Someone in Our Family Drinks or Uses' }),
      line: over(same('Growing sober, thinking about a change, or loving someone who drinks or uses.'), {
        maple: 'A parent, grandparent, brother, or sister whose drinking or drug use is hard for the family.',
        aspen: 'A parent, grandparent, brother, or sister whose drinking or drug use is hard for the family.',
        pine: 'Your own drinking, vaping, or using, or someone you love who drinks or uses.' }) },
    { id: 'none', special: true, trees: TREES, words: same('None Right Now'), line: same('Nothing to choose today. Come back any time.') },
    { id: 'rather', special: true, trees: TREES, words: same('I\'d Rather Not Say'), line: same('Gentler ways show first, without naming anything.') }
  ];
  var CAT = {}; CATS.forEach(function (c) { CAT[c.id] = c; });
  var IDS = CATS.filter(function (c) { return !c.special; }).map(function (c) { return c.id; });

  /* ---------- Living Sober (GWG BLD 789) ----------
     The category 'sober' opens one short follow-up, the stage, kept in the same locked
     vault object (vault.life.sober). Maple and Aspen offer only 'love', set automatically.
     Guides for it sit in ring 'sober', which is low-key: a tree's ring list shows it only
     when Living Sober is chosen. Search and Picked for You always find its guides.
     A topic's sober: [stage ids] names the stages it fits most ([] fits every stage). */
  var STAGES = [
    { id: 'change', name: 'Thinking About a Change', line: 'Curious about drinking or using less, or stopping.' },
    { id: 'early', name: 'Early Days', line: 'The first 90 days.' },
    { id: 'growing', name: 'Growing Sober', line: 'The first years.' },
    { id: 'long', name: 'Long-Term Sober', line: 'Years along the path, still growing.' },
    { id: 'love', name: 'Someone I Love', line: 'A parent, partner, child, or friend who drinks or uses.' }
  ];
  var STAGE_IDS = STAGES.map(function (x) { return x.id; });
  var KID_STAGES = ['love'];
  function stagesFor(tree) { return KIDS.indexOf(tree) >= 0 ? KID_STAGES.slice() : STAGE_IDS.slice(); }
  var SOBER_RING = {
    adult: { key: 'sober', name: 'Living Sober', color: '#4E7D6A',
      blurb: 'Guides for growing sober, thinking about a change, and loving someone who drinks or uses. Honest talk, real healing, and every kind of help, one small step at a time.' },
    pine: { key: 'sober', name: 'Living Sober', color: '#4E7D6A',
      blurb: 'Guides for your own choices about drinking, vaping, and using, and for loving someone who drinks or uses. It is safe and normal to talk about.' },
    kid: { key: 'sober', name: 'When Someone Drinks or Uses', color: '#4E7D6A',
      blurb: 'For a child whose parent, grandparent, brother, or sister drinks or uses. It is never the child\'s fault, and it is safe to talk about.' }
  };
  function ring(tree) { var r = KIDS.indexOf(tree) >= 0 ? SOBER_RING.kid : tree === 'pine' ? SOBER_RING.pine : SOBER_RING.adult; return Object.assign({}, r); }

  /* ---------- help lines: information and support, always BELOW the crisis lines ----------
     From conditions-research.md, Section 4: Minnesota first, then national. Numbers marked
     confirmed there on October 7, 2026; recheck before each release. Lines and links whose
     source could not be confirmed are left out. */
  var LINES = {
    asl988: { name: '988 Lifeline in ASL', how: 'Videophone in ASL, or text 988', sms: '988', url: 'https://988lifeline.org/', note: 'For Deaf and hard of hearing callers: tap ASL Now on the 988 website to reach a counselor who signs. Call or text 988 any time.' },
    dhub: { name: 'Disability Hub MN', how: '1-866-333-2466', tel: '18663332466', url: 'https://disabilityhubmn.org/', note: 'Help finding health, housing, independent living, and money resources in Minnesota.' },
    pacer: { name: 'PACER Center', how: '952-838-9000', tel: '9528389000', url: 'https://www.pacer.org/', note: 'For families of children and young adults with any disability, birth to 21: school plans, mental health, and what comes next.', grownup: true },
    nami: { name: 'NAMI HelpLine', how: '1-800-950-6264', tel: '18009506264', sms: '62640', smsBody: 'helpline', url: 'https://www.nami.org/talktous', note: 'Information and peer support for people with mental health conditions and their families, weekdays 10 a.m. to 10 p.m. Eastern. Not a crisis line.' },
    aging: { name: 'Minnesota Aging Pathways', how: '1-800-333-2433', tel: '18003332433', note: 'Minnesota\'s line for older adults and family caregivers: help at home, caregiving, and planning ahead.' },
    smrc: { name: 'Self-Management Resource Center', how: 'Find a workshop', url: 'https://selfmanagementresource.com/', note: 'Six-week workshops for living well with a long-term condition or pain, led by people who live with one.' },
    transition: { name: 'Got Transition', how: 'Open the website', url: 'https://gottransition.org/six-core-elements', note: 'Help for teens and young adults moving from children\'s health care to adult health care.' },
    sibs: { name: 'Sibling Support Project', how: 'Open the website', url: 'https://siblingsupport.org/', note: 'Sibshops and support for brothers and sisters of people with disabilities or health needs.', grownup: true },
    aacy: { name: 'American Association of Caregiving Youth', how: 'Open the website', url: 'https://aacy.org/', note: 'Support for kids and teens who help care for someone in their family.' },
    // Living Sober (GWG BLD 789). SAMHSA and Poison Control numbers confirmed in the BLD 789 spec; the rest link to each group's own site.
    samhsa: { name: 'SAMHSA National Helpline', how: '1-800-662-4357', tel: '18006624357', url: 'https://www.samhsa.gov/find-help/helplines/national-helpline', note: 'Treatment referral and information for drinking and drug use, any time, day or night, in English and Spanish. Confidential.' },
    findtx: { name: 'FindTreatment.gov', how: 'Open the website', url: 'https://findtreatment.gov/', note: 'SAMHSA\'s national directory of treatment for drinking and drug use, including medication, by place.' },
    smart: { name: 'SMART Recovery', how: 'Find a meeting', url: 'https://smartrecovery.org/', note: 'Peer groups for growing sober, and Family and Friends meetings, in person and online.' },
    poison: { name: 'Poison Control', how: '1-800-222-1222', tel: '18002221222', url: 'https://www.poison.org/', note: 'Any time, day or night, for questions about a medicine, a drug, or a possible poisoning. If someone is hard to wake or breathing slowly, call 911 first.' },
    nacoa: { name: 'NACoA', how: 'Open the website', url: 'https://nacoa.org/', note: 'The National Association for Children of Addiction: help for kids whose family member drinks or uses, and for the grown-ups who love them.', grownup: true },
    cpn: { name: 'Courageous Parents Network', how: 'Open the website', url: 'https://courageousparentsnetwork.org/', note: 'Videos, guides, and community for parents caring for a child with a serious medical condition.' }
  };
  Object.keys(LINES).forEach(function (k) { LINES[k].id = 'life-' + k; LINES[k].show = LINES[k].how; });
  var KIDLINES = { health: ['pacer'], pain: ['pacer'], moving: ['pacer'], hearing: ['asl988', 'pacer'], seeing: ['pacer'], learning: ['pacer'], autism: ['pacer'], mind: ['nami', 'pacer'], close: ['sibs', 'nami'] };
  var LINEMAP = {
    maple: Object.assign({}, KIDLINES, { sober: ['nacoa'] }),
    aspen: Object.assign({}, KIDLINES, { sober: ['nacoa'] }),
    pine: { sober: ['samhsa', 'nacoa', 'poison'], soberLove: ['nacoa', 'samhsa'], health: ['transition', 'pacer'], pain: ['transition', 'pacer'], moving: ['pacer'], hearing: ['asl988', 'pacer'], seeing: ['pacer'], learning: ['pacer'], autism: ['pacer'], mind: ['nami'], serious: ['transition'], close: ['aacy', 'sibs', 'nami'] },
    birch: { sober: ['samhsa', 'findtx', 'smart', 'poison'], soberLove: ['smart', 'samhsa', 'poison'], health: ['transition', 'smrc'], pain: ['smrc'], moving: ['dhub'], hearing: ['asl988', 'dhub'], seeing: ['dhub'], learning: ['dhub', 'pacer'], autism: ['dhub', 'pacer'], mind: ['nami'], serious: ['dhub'], close: ['nami', 'dhub'] },
    oak: { sober: ['samhsa', 'findtx', 'smart', 'poison'], soberLove: ['smart', 'samhsa', 'poison'], health: ['smrc'], pain: ['smrc'], moving: ['dhub'], hearing: ['asl988', 'dhub'], seeing: ['dhub'], learning: ['dhub'], autism: ['dhub'], mind: ['nami'], serious: ['smrc', 'dhub'], memory: ['dhub', 'aging'], close: ['nami', 'pacer', 'cpn', 'aging'] },
    sequoia: { sober: ['samhsa', 'findtx', 'smart', 'poison'], soberLove: ['smart', 'samhsa', 'poison'], health: ['smrc', 'aging'], pain: ['smrc'], moving: ['aging', 'dhub'], hearing: ['asl988', 'aging'], seeing: ['aging', 'dhub'], autism: ['dhub'], mind: ['nami'], serious: ['aging'], memory: ['aging'], close: ['aging', 'nami'] }
  };

  /* ---------- Living Sober growth plan ideas (GWG BLD 789) ----------
     One idea per part of the tree for each stage, said the forward way. A tree's growth plan
     shows the idea for a Growing Edge part (soberSteps); safe is the safety line for the stages
     where stopping may need a doctor, shown with the Leaves idea. Kids trees have their own words. */
  var SOBER_STEPS = {
    change: {
      leaves: 'Notice how your body feels after a sober evening, and write one word for it in the morning.',
      bark: 'When the pull to drink or use comes, wait ten minutes first: drink a glass of water, take a slow walk, then decide.',
      branches: 'Tell one person you trust that you are thinking about a change.',
      roots: 'Take one quiet minute each morning to ask what you want more of today.',
      trunk: 'Write down what you want more of in your life, and one reason this change matters to you.',
      fruit: 'Plan one good evening this week that is sober from start to finish: a meal, a walk, a friend.'
    },
    early: {
      leaves: 'Keep the basics close: water within reach, three real meals, and a steady bedtime. Early days run on rest.',
      bark: 'Plan your hard hour ahead of time: a walk, a shower, a call, a cup of tea, then bed.',
      branches: 'Choose one person you can text when a craving comes, and tell them today that you might.',
      roots: 'Begin and end each day with one quiet minute, a prayer, or three slow breaths.',
      trunk: 'Count every sober day as a win, and write down one thing you handled well today.',
      fruit: 'Plan one small sober joy for each weekend: a hike, a new recipe, coffee with a friend.'
    },
    growing: {
      leaves: 'Build on the healing in your body: add one kind of movement you enjoy, like walking, lifting, or swimming.',
      bark: 'Name the feeling under a craving, and tend that feeling with a practice, like writing it out or a walk among trees.',
      branches: 'Repair one relationship with a small, steady act, and let trust grow at its own pace.',
      roots: 'Keep one practice that steadies you each day: a quiet minute, gratitude, or time outdoors.',
      trunk: 'Write a sentence or two about who you are becoming, and read it on hard mornings.',
      fruit: 'Try one new thing your sober life has room for now: a class, a trail, a team, or a project.'
    },
    long: {
      leaves: 'Keep tending the habits that carried you here: sleep, whole food, water, and movement.',
      bark: 'Notice when an old habit tries a new shape, like work, food, spending, or screens, and tend the feeling underneath.',
      branches: 'Offer your story or your time to someone newer on the path, in whatever way fits you.',
      roots: 'Return to the practice that first steadied you, and let it grow with you.',
      trunk: 'Mark your sober anniversary in a way that honors how far you have come.',
      fruit: 'Set one goal your sober years make possible, and take its first step this week.'
    },
    love: {
      leaves: 'Keep your own sleep, meals, and movement steady. Tending yourself helps the person you love.',
      bark: 'When worry rises, take three slow breaths and come back to what is yours to tend today.',
      branches: 'Find one place where people understand, like SMART Recovery Family and Friends, a family group, or a trusted friend.',
      roots: 'Give yourself a few quiet minutes each day that are only for you.',
      trunk: 'Name what gives your own life meaning in this season, and give it a little time each week.',
      fruit: 'Plan one good thing for yourself this week, whatever choices the person you love makes.'
    },
    safe: 'If you have been drinking every day or taking sedatives or opioids, talk with a doctor before you stop, so your body stays safe.',
    maple: {
      leaves: 'Keep bedtime, meals, and water steady at home. Steady days help a child feel safe.',
      bark: 'Practice balloon breaths together for the times home feels big or loud.',
      branches: 'Name two safe grown-ups your child can talk to any time, and tell them together.',
      roots: 'Share a calm, cozy minute together before bed each night.',
      trunk: 'Say it often: it is never your fault, and your feelings make sense.',
      fruit: 'Plan one fun, calm thing to do together each week.'
    },
    aspen: {
      leaves: 'Keep your own sleep and meals steady, whatever the day brings at home.',
      bark: 'When feelings get big, try slow breathing, a walk, or writing it out.',
      branches: 'Pick one safe grown-up to talk to, like a relative, a coach, or your school counselor.',
      roots: 'Find one quiet spot that feels calm, and spend a few minutes there each day.',
      trunk: 'Remember: it is never your fault. You can love someone and still feel upset with them.',
      fruit: 'Do one thing each week that is just for you and makes you glad.'
    },
    pineLove: {
      leaves: 'Keep your own sleep, meals, and movement steady, whatever the day brings at home.',
      bark: 'When worry or anger rises, move it out: a run, a walk, music, or writing it down.',
      branches: 'Talk with one safe adult, like a relative, a coach, or your school counselor, and look into NACoA for teens.',
      roots: 'Give yourself a few quiet minutes each day that are only for you.',
      trunk: 'It is never your fault, and their choices are theirs. Your own path is yours to grow.',
      fruit: 'Plan one thing each week that is just for you and makes you glad.'
    }
  };
  function soberSteps(tree, part) {
    if (!sober(tree)) return [];
    var st = soberStage(tree), set;
    if (tree === 'maple' || tree === 'aspen') set = SOBER_STEPS[tree];
    else if (tree === 'pine' && st === 'love') set = SOBER_STEPS.pineLove;
    else set = SOBER_STEPS[st || 'change'];
    var out = [];
    if (set && set[part]) out.push(set[part]);
    if ((st === 'change' || st === 'early' || !st) && part === 'leaves' && KIDS.indexOf(tree) < 0) out.push(SOBER_STEPS.safe);
    return out;
  }

  /* ---------- small helpers ---------- */
  function today() { var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); }; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function blank() { return { ids: [], none: false, rather: false, gentle: false, shareHelpers: false, sober: '', soberDate: '', soberSeen: null, set: '' }; }
  // A sober date (GWG BLD 837): a real day, never after today. Only the count ever shows; the date itself stays in the vault.
  function okDate(d) {
    var m = /^(\d{4})-(\d\d)-(\d\d)$/.exec(String(d || '')); if (!m) return false;
    var x = new Date(+m[1], +m[2] - 1, +m[3]);
    return x.getFullYear() === +m[1] && x.getMonth() === +m[2] - 1 && x.getDate() === +m[3] && +m[1] >= 1900 && d <= today();
  }
  function clean(o) {
    var r = blank(); if (!o || typeof o !== 'object') return r;
    (Array.isArray(o.ids) ? o.ids : []).forEach(function (id) { if (IDS.indexOf(id) >= 0 && r.ids.indexOf(id) < 0) r.ids.push(id); });
    r.none = !!o.none && !r.ids.length; r.rather = !!o.rather && !r.ids.length && !r.none;
    r.gentle = !!o.gentle; r.shareHelpers = !!o.shareHelpers;
    r.sober = r.ids.indexOf('sober') >= 0 && STAGE_IDS.indexOf(o.sober) >= 0 ? o.sober : '';
    // Living Sober details (GWG BLD 837) live and leave with the choice: the sober date, and which milestones have shown.
    r.soberDate = r.ids.indexOf('sober') >= 0 && okDate(o.soberDate) ? o.soberDate : '';
    var sn = o.soberSeen;
    r.soberSeen = r.soberDate && sn && typeof sn === 'object' && sn.at === r.soberDate && Array.isArray(sn.k) ? { at: r.soberDate, k: sn.k.filter(function (k) { return /^(d|m|y)\d{1,3}$/.test(k); }).slice(0, 200) } : null;
    r.set = /^\d{4}-\d\d-\d\d$/.test(String(o.set || '')) ? o.set : '';
    return r;
  }
  function copy(o) { return clean(o); }
  function isEmpty(c) { return !c.ids.length && !c.none && !c.rather && !c.gentle && !c.shareHelpers; }
  function treeOk(t) { return TREES.indexOf(t) >= 0; }

  /* ---------- whose choice ---------- */
  var ctx = null;            // an app's chosen profile id (GGLife.use)
  var MEM = blank();         // guests: this page visit only
  var MEMOFFER = {};         // guests: the offer card shown this visit
  function P() { return window.GGP || null; }
  function activeId() { var g = P(), a = g && g.active && g.active(); return a ? a.id : null; }
  function who() { var g = P(); if (ctx && g && g.isOpen && g.isOpen(ctx)) return ctx; return activeId(); }
  // A helper looking at another grown-up's profile: they see the choice only if the person shares it.
  function helperView(id) {
    var g = P(), a = activeId(); if (!g || !id || !a || id === a) return false;
    var me = g.get(a), them = g.get(id);
    return !!(me && them && me.age === 'adult' && them.age === 'adult');
  }
  function vault(id) { var g = P(); return g && id && g.data ? g.data(id) : null; }
  function get(id) {
    id = id || who();
    if (!id) return copy(MEM);
    var v = vault(id); if (!v) return blank();
    var c = copy(v.life);
    if (helperView(id) && !c.shareHelpers) return blank();
    return c;
  }
  function fire(id) { try { window.dispatchEvent(new CustomEvent('gglife:change', { detail: { id: id || null, choice: get(id) } })); } catch (e) {} }
  function set(obj, id) {
    id = id || who();
    if (id && helperView(id)) return Promise.reject(new Error('Only the person can change this.'));
    var cur = id ? (function () { var v = vault(id); return v ? copy(v.life) : null; })() : copy(MEM);
    if (id && !cur) return Promise.reject(new Error('Open the profile first.'));
    if (obj === null) return clear(id);
    var next = clean(Object.assign({}, cur, obj || {}));
    next.set = today();
    if (!id) { MEM = next; fire(null); return Promise.resolve(copy(next)); }
    var v = vault(id);
    if (isEmpty(next)) delete v.life; else v.life = next;
    return Promise.resolve(P().save(id)).then(function () { fire(id); return copy(next); });
  }
  function clear(id) {
    id = id || who();
    if (id && helperView(id)) return Promise.reject(new Error('Only the person can change this.'));
    if (!id) { MEM = blank(); fire(null); return Promise.resolve(blank()); }
    var v = vault(id); if (!v) return Promise.reject(new Error('Open the profile first.'));
    delete v.life;
    return Promise.resolve(P().save(id)).then(function () { fire(id); return blank(); });
  }

  /* ---------- My Anchor Plan (GWG BLD 837) ----------
     A plan for hard moments, filled out ahead of time. Kept in the locked vault beside the choice (vault.soberAnchor),
     so it stays even if Living Sober is turned off; guests keep it for this visit only. Its own Clear erases it.
     {people: [{name, num}], do: [idea ids], own, go, remind, set} */
  var MEMANCHOR = null;
  function str(x, n) { return String(x == null ? '' : x).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n || 200); }
  function cleanAnchor(o) {
    if (!o || typeof o !== 'object') return null;
    var r = { people: [], do: [], own: str(o.own, 300), go: str(o.go, 300), remind: str(o.remind, 200), set: /^\d{4}-\d\d-\d\d$/.test(String(o.set || '')) ? o.set : '' };
    (Array.isArray(o.people) ? o.people : []).slice(0, 6).forEach(function (p) { if (!p) return; var x = { name: str(p.name, 80), num: str(p.num, 40).replace(/[^0-9+()\-. ]/g, '') }; if (x.name || x.num) r.people.push(x); });
    (Array.isArray(o.do) ? o.do : []).forEach(function (d) { d = str(d, 40); if (/^[a-z0-9]+$/.test(d) && r.do.indexOf(d) < 0) r.do.push(d); });
    return r.people.length || r.do.length || r.own || r.go || r.remind ? r : null;
  }
  function anchor(id) {
    id = id || who();
    if (!id) return MEMANCHOR ? cleanAnchor(MEMANCHOR) : null;
    if (helperView(id)) return null;
    var v = vault(id); return v ? cleanAnchor(v.soberAnchor) : null;
  }
  function setAnchor(obj, id) {
    id = id || who();
    if (id && helperView(id)) return Promise.reject(new Error('Only the person can change this.'));
    var a = obj === null ? null : cleanAnchor(Object.assign({}, obj || {}, { set: today() }));
    if (!id) { MEMANCHOR = a; return Promise.resolve(a); }
    var v = vault(id); if (!v) return Promise.reject(new Error('Open the profile first.'));
    if (a) v.soberAnchor = a; else delete v.soberAnchor;
    return Promise.resolve(P().save(id)).then(function () { return a; });
  }

  /* ---------- Living Sober Every Day (GWG BLD 850) ----------
     The daily companion: a morning intention and an evening look back for each day, waves ridden, and what a week
     of drinking used to cost (for Money Kept). Kept in the locked vault beside the plan (vault.soberDays), so it stays
     even if Living Sober is turned off; guests keep it for this visit only. The newest 400 days are kept.
     {log: {'YYYY-MM-DD': {i: intention, u: urge 0 to 10, m: mood 1 to 5, s: sleep 1 to 5, h: [helped ids], ho: own words,
     w: waves ridden}}, cost: dollars a week} */
  var MEMDAYS = null;
  function cleanDay(d) {
    if (!d || typeof d !== 'object') return null;
    var r = {}, n = function (x, lo, hi) { x = Math.round(+x); return isFinite(x) && x >= lo && x <= hi ? x : null; };
    var i = str(d.i, 160); if (i) r.i = i;
    var u = n(d.u, 0, 10); if (u !== null && d.u !== '' && d.u != null) r.u = u;
    var m = n(d.m, 1, 5); if (m !== null) r.m = m;
    var sl = n(d.s, 1, 5); if (sl !== null) r.s = sl;
    var h = (Array.isArray(d.h) ? d.h : []).map(function (x) { return str(x, 30); }).filter(function (x) { return /^[a-z0-9]+$/.test(x); }).slice(0, 12); if (h.length) r.h = h;
    var ho = str(d.ho, 200); if (ho) r.ho = ho;
    var w = n(d.w, 0, 99); if (w) r.w = w;
    return Object.keys(r).length ? r : null;
  }
  function cleanDays(o) {
    var r = { log: {}, cost: 0 }; if (!o || typeof o !== 'object') return r;
    var c = +o.cost; r.cost = isFinite(c) && c > 0 ? Math.min(10000, Math.round(c * 100) / 100) : 0;
    Object.keys(o.log && typeof o.log === 'object' ? o.log : {}).filter(okDate).sort().slice(-400).forEach(function (k) { var d = cleanDay(o.log[k]); if (d) r.log[k] = d; });
    return r;
  }
  function days(id) {
    id = id || who();
    if (!id) return cleanDays(MEMDAYS);
    if (helperView(id)) return cleanDays(null);
    var v = vault(id); return cleanDays(v && v.soberDays);
  }
  function putDays(next, id) {
    if (!id) { MEMDAYS = next; return Promise.resolve(next); }
    var v = vault(id); if (!v) return Promise.reject(new Error('Open the profile first.'));
    if (Object.keys(next.log).length || next.cost) v.soberDays = next; else delete v.soberDays;
    return Promise.resolve(P().save(id)).then(function () { return next; });
  }
  // setDay(date, patch): merges into that day's entry (null clears a field); setDays(null) erases them all.
  function setDay(date, patch, id) {
    id = id || who();
    if (id && helperView(id)) return Promise.reject(new Error('Only the person can change this.'));
    if (!okDate(date)) return Promise.reject(new Error('Choose a day up to today.'));
    var all = days(id), cur = Object.assign({}, all.log[date] || {}, patch || {});
    Object.keys(cur).forEach(function (k) { if (cur[k] === null) delete cur[k]; });
    var d = cleanDay(cur); if (d) all.log[date] = d; else delete all.log[date];
    return putDays(cleanDays(all), id);
  }
  function setCost(n, id) {
    id = id || who();
    if (id && helperView(id)) return Promise.reject(new Error('Only the person can change this.'));
    var all = days(id); all.cost = +n || 0; return putDays(cleanDays(all), id);
  }
  function clearDays(id) {
    id = id || who();
    if (id && helperView(id)) return Promise.reject(new Error('Only the person can change this.'));
    return putDays(cleanDays(null), id);
  }

  /* ---------- reading the choice ---------- */
  function cats(tree) { return CATS.filter(function (c) { return !c.special && c.trees.indexOf(tree) >= 0; }).map(function (c) { return { id: c.id, name: c.words[tree], line: c.line[tree] }; }); }
  function has() { return get().ids.length > 0; }
  function chosen(tree) { var c = get(); return cats(tree).filter(function (x) { return c.ids.indexOf(x.id) >= 0; }).map(function (x) { return x.id; }); }
  function gentle() { var c = get(); return !!(c.gentle || c.rather); }
  /* Living Sober readers. stage(tree): Maple and Aspen are always 'love' once chosen. */
  function sober(tree) { var c = get(); return c.ids.indexOf('sober') >= 0 && (!tree || cats(tree).some(function (x) { return x.id === 'sober'; })); }
  function soberStage(tree) { if (!sober(tree)) return ''; if (tree && KIDS.indexOf(tree) >= 0) return 'love'; var st = get().sober; return tree && stagesFor(tree).indexOf(st) < 0 ? '' : st; }
  function ringShows(tree, key) { return key !== 'sober' || sober(tree) || DECLARED.indexOf(tree) >= 0; }
  function soberDate(tree) { return sober(tree) && KIDS.indexOf(tree) < 0 ? get().soberDate : ''; }
  // The help lines for Living Sober in a tree, for its stage (My Anchor Plan shows them whether or not other choices are made).
  function soberLines(tree) {
    var map = LINEMAP[tree]; if (!map) return [];
    var keys = soberStage(tree) === 'love' && map.soberLove ? map.soberLove : map.sober || [];
    return keys.filter(function (k) { return LINES[k]; }).map(function (k) { return Object.assign({}, LINES[k]); });
  }
  // How well a row fits the stage: 2 its sober list holds the stage, 1 it fits every stage ([] or none given), 0 another stage.
  function stageRank(row, st) {
    var l = row && Array.isArray(row.sober) ? row.sober : [];
    if (!l.length) return 1;
    return st && l.indexOf(st) >= 0 ? 2 : 0;
  }
  function isSober(row) { return !!row && (row.ring === 'sober' || (Array.isArray(row.life) && row.life.indexOf('sober') >= 0)); }
  function byStage(list, st) {
    var a = [], b = [], c = [];
    list.forEach(function (r) { var k = stageRank(r, st); (k === 2 ? a : k === 1 ? b : c).push(r); });
    return a.concat(b, c);
  }
  function fits(tags, adapt) {
    var life = tags, ad = adapt;
    if (tags && !Array.isArray(tags) && typeof tags === 'object') { life = tags.life; ad = ad || tags.adapt; }
    life = Array.isArray(life) ? life : [];
    var c = get();
    if (life.some(function (t) { return c.ids.indexOf(t) >= 0; })) return true;
    return !!((c.gentle || c.rather) && (life.indexOf('gentle') >= 0 || !!ad));
  }
  function order(rows, tagOf, tree) {
    var list = Array.isArray(rows) ? rows.slice() : [];
    var f = typeof tagOf === 'function' ? tagOf : function (r) { return r && (r.life || r.adapt) ? { life: r.life, adapt: r.adapt, sober: r.sober } : []; };
    var yes = [], no = [];
    list.forEach(function (r) { (fits(f(r)) ? yes : no).push(r); });
    // Living Sober chosen: within the rows that fit, Living Sober rows come first, in stage order.
    if (get().ids.indexOf('sober') >= 0) {
      var st = tree ? soberStage(tree) : get().sober, tg = function (r) { var t = f(r); return Array.isArray(t) ? { life: t } : (t || {}); };
      var sy = yes.filter(function (r) { return isSober(tg(r)); }), so = yes.filter(function (r) { return !isSober(tg(r)); });
      var ranked = sy.map(function (r) { return { r: r, k: stageRank(tg(r), st) }; });
      yes = ranked.filter(function (x) { return x.k === 2; }).concat(ranked.filter(function (x) { return x.k === 1; }), ranked.filter(function (x) { return x.k === 0; })).map(function (x) { return x.r; }).concat(so);
    }
    return yes.concat(no);
  }
  function lines(tree) {
    var map = LINEMAP[tree]; if (!map) return [];
    var out = [], seen = {};
    var st = soberStage(tree);
    chosen(tree).forEach(function (id) { (id === 'sober' && st === 'love' && map.soberLove ? map.soberLove : map[id] || []).forEach(function (k) { if (!seen[k] && LINES[k]) { seen[k] = 1; out.push(Object.assign({}, LINES[k])); } }); });
    return out;
  }
  var GUIDES = {};
  function addGuides(tree, list) { if (treeOk(tree) || tree === 'grove') GUIDES[tree] = Array.isArray(list) ? list : []; }
  function picks(tree, list) {
    var ids = chosen(tree); if (!ids.length) return [];
    var src = Array.isArray(list) ? list : (GUIDES[tree] || []);
    var hit = src.filter(function (g) { return g && Array.isArray(g.life) && g.life.some(function (t) { return ids.indexOf(t) >= 0; }); });
    // Living Sober guides first, in stage order (GWG BLD 789); then the Health and Ability picks.
    if (ids.indexOf('sober') >= 0) {
      var sy = hit.filter(function (g) { return isSober(g); });
      hit = byStage(sy, soberStage(tree)).concat(hit.filter(function (g) { return !isSober(g); }));
    }
    return hit.map(function (g) { return g.id; });
  }
  function label(tree, grownView) { return grownView ? 'Their Health and Ability' : 'Health and Ability'; }

  /* ---------- look and feel ---------- */
  var CSS = '' +
    '.gglife{--gl-bg:#FAF7F2;--gl-card:#FFFFFF;--gl-ink:#2C1810;--gl-soft:#6B5A48;--gl-line:#E6D9C2;--gl-gold:#8B5E1A;--gl-gold-soft:#F4EAD6;--gl-on-gold:#FFFFFF;--gl-ok:#4E6A3B;}' +
    '.gglife,.gglife *{box-sizing:border-box;}' +
    '.gglife{color:var(--gl-ink);font:16px/1.5 Barlow,system-ui,sans-serif;text-align:left;}' +
    '.gglife h2,.gglife h3{font:600 26px/1.15 "Cormorant Garamond",Georgia,serif;margin:0 0 6px;color:var(--gl-ink);}' +
    '.gglife p{margin:0 0 10px;}' +
    '.gglife .gl-intro{color:var(--gl-soft);font-size:15px;}' +
    '.gglife .gl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px;margin:12px 0;}' +
    '.gglife .gl-box{display:flex;gap:10px;align-items:flex-start;width:100%;min-height:48px;padding:10px 12px;border:1.5px solid var(--gl-line);border-radius:12px;background:var(--gl-card);color:var(--gl-ink);cursor:pointer;font:15px/1.35 Barlow,system-ui,sans-serif;text-align:left;text-transform:none;letter-spacing:0;}' +
    '.gglife .gl-box:hover{border-color:var(--gl-gold);}' +
    '.gglife .gl-box:focus-visible,.gglife .gl-b:focus-visible,.gglife .gl-link:focus-visible,.gglife .gl-sw:focus-visible{outline:3px solid var(--gl-gold);outline-offset:2px;}' +
    '.gglife .gl-box[aria-pressed=true]{border-color:var(--gl-gold);background:var(--gl-gold-soft);}' +
    '.gglife .gl-tick{flex:none;width:22px;height:22px;border-radius:6px;border:2px solid var(--gl-gold);display:grid;place-items:center;margin-top:1px;color:var(--gl-on-gold);}' +
    '.gglife .gl-box[aria-pressed=true] .gl-tick{background:var(--gl-gold);}' +
    '.gglife .gl-box b{display:block;font-weight:600;}' +
    '.gglife .gl-box small{display:block;color:var(--gl-soft);font-size:13.5px;margin-top:2px;}' +
    '.gglife .gl-stage{margin:0 0 12px;padding:12px;border:1.5px solid var(--gl-line);border-radius:12px;background:var(--gl-card);}' +
    '.gglife .gl-st-h{margin:0 0 8px;font-size:15px;}.gglife .gl-st-h small{color:var(--gl-soft);font-size:13.5px;}' +
    '.gglife .gl-st-row{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:6px;}' +
    '.gglife .gl-st{display:block;width:100%;min-height:44px;padding:8px 10px;border:1.5px solid var(--gl-line);border-radius:10px;background:transparent;color:var(--gl-ink);cursor:pointer;font:14.5px/1.3 Barlow,system-ui,sans-serif;text-align:left;text-transform:none;letter-spacing:0;}' +
    '.gglife .gl-st b{display:block;font-weight:600;}.gglife .gl-st small{display:block;color:var(--gl-soft);font-size:13px;}' +
    '.gglife .gl-st[aria-checked=true]{border-color:var(--gl-gold);background:var(--gl-gold-soft);}.gglife .gl-st:hover{border-color:var(--gl-gold);}' +
    '.gglife .gl-st:focus-visible{outline:3px solid var(--gl-gold);outline-offset:2px;}' +
    '.gglife .gl-date{display:block;margin:12px 0 0;font-size:15px;}.gglife .gl-date small{display:block;color:var(--gl-soft);font-size:13.5px;}' +
    '.gglife .gl-date-row{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;margin-top:6px;}' +
    '.gglife .gl-date input{min-height:44px;padding:8px 10px;border:1.5px solid var(--gl-line);border-radius:10px;background:var(--gl-card);color:var(--gl-ink);font:15px Barlow,system-ui,sans-serif;color-scheme:light dark;}' +
    '.gglife .gl-date input:focus-visible{outline:3px solid var(--gl-gold);outline-offset:2px;}' +
    '.gglife .gl-specials{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px;margin:0 0 6px;}' +
    '.gglife .gl-sw{display:flex;gap:12px;align-items:flex-start;width:100%;padding:12px 2px;border:0;border-top:1px solid var(--gl-line);background:none;color:var(--gl-ink);cursor:pointer;font:15px/1.4 Barlow,system-ui,sans-serif;text-align:left;text-transform:none;letter-spacing:0;}' +
    '.gglife .gl-sw b{display:block;font-weight:600;}.gglife .gl-sw small{display:block;color:var(--gl-soft);font-size:13.5px;}' +
    '.gglife .gl-track{flex:none;width:46px;height:28px;border-radius:999px;background:var(--gl-line);position:relative;margin-top:1px;transition:background .2s;}' +
    '.gglife .gl-track:after{content:"";position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:#FFFFFF;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:left .2s;}' +
    '.gglife .gl-sw[aria-checked=true] .gl-track{background:var(--gl-gold);}.gglife .gl-sw[aria-checked=true] .gl-track:after{left:21px;}' +
    '.gglife .gl-foot{display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;justify-content:space-between;margin-top:10px;}' +
    '.gglife .gl-link{background:none;border:0;padding:6px 0;color:var(--gl-gold);font:inherit;font-size:15px;text-decoration:underline;cursor:pointer;text-transform:none;letter-spacing:0;}' +
    '.gglife .gl-status{color:var(--gl-ok);font-size:14px;min-height:1.3em;margin:6px 0 0;}' +
    '.gglife .gl-b{font:600 15px Barlow,system-ui,sans-serif;border-radius:999px;padding:11px 20px;min-height:44px;cursor:pointer;border:1px solid var(--gl-gold);background:transparent;color:var(--gl-gold);text-transform:none;letter-spacing:0;}' +
    '.gglife .gl-b.gl-go{background:var(--gl-gold);color:var(--gl-on-gold);}' +
    '.gglife.gl-card{background:var(--gl-card);border:1px solid var(--gl-line);border-left:5px solid var(--gl-gold);border-radius:14px;padding:14px 16px;margin:14px 0;box-shadow:0 4px 14px rgba(44,24,16,.05);}' +
    '.gglife.gl-card p{margin:0 0 10px;font-size:16px;}' +
    '.gglife.gl-card .gl-row{display:flex;flex-wrap:wrap;gap:8px;}' +
    '.gglife-back{position:fixed;inset:0;z-index:9995;background:rgba(20,16,12,.55);display:flex;align-items:flex-start;justify-content:center;padding:4vh 14px;overflow-y:auto;}' +
    '.gglife-back .gl-dlg{width:min(640px,100%);background:var(--gl-bg);border-radius:20px;box-shadow:0 24px 60px rgba(0,0,0,.3);padding:24px 22px 20px;margin:auto 0;}' +
    '@media (max-width:520px){.gglife .gl-grid,.gglife .gl-specials{grid-template-columns:1fr;}.gglife-back .gl-dlg{padding:20px 16px 16px;}}' +
    '@media (prefers-reduced-motion: reduce){.gglife .gl-track,.gglife .gl-track:after{transition:none;}}';
  var DARK = '.gglife{--gl-bg:#1E1A15;--gl-card:#28221B;--gl-ink:#F3EDE3;--gl-soft:#C2B6A4;--gl-line:#4A4034;--gl-gold:#D9A847;--gl-gold-soft:#342A1D;--gl-on-gold:#1E1A15;--gl-ok:#A9C79A;}';
  function addCSS() {
    if (document.getElementById('gglife-css')) return;
    var s = document.createElement('style'); s.id = 'gglife-css';
    s.textContent = CSS + '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) ' + DARK + '}:root[data-theme="dark"] ' + DARK;
    document.head.appendChild(s);
  }
  var TICK = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
  var uidN = 0;

  /* ---------- the chooser: one short screen ---------- */
  function chooser(host, opt) {
    opt = opt || {}; addCSS();
    var tree = treeOk(opt.tree) ? opt.tree : 'oak', kid = !!opt.forChild, pid = opt.id || null, n = ++uidN;
    var wrap = document.createElement('div'); wrap.className = 'gglife'; host.innerHTML = ''; host.appendChild(wrap);
    var helperOn = HELPER_TREES.indexOf(tree) >= 0;
    function paint(msg) {
      var c = get(pid), list = cats(tree), guest = !(pid || who());
      var intro = kid
        ? 'Choose together anything that\'s part of their life right now, or none. It changes only which guides, practices, and videos show first, and adds a few examples and help lines. Their questions and scores stay the same. It stays locked on this device, and you can change it any time.'
        : 'Choose anything that\'s part of your life right now, or none. It changes only which guides, practices, and videos show first, and adds a few examples and help lines. Your questions and scores stay the same. It stays locked on this device, and you can change it any time.';
      var box = function (id, name, line, on, kind) {
        return '<button type="button" class="gl-box" data-gl="' + kind + '" data-id="' + id + '" aria-pressed="' + on + '"><span class="gl-tick">' + (on ? TICK : '') + '</span><span><b>' + esc(name) + '</b><small>' + esc(line) + '</small></span></button>';
      };
      // Living Sober: one short follow-up for the stage (Pine and the adult trees). Maple and Aspen are always Someone I Love.
      var stageHtml = function (c) {
        if (c.ids.indexOf('sober') < 0 || KIDS.indexOf(tree) >= 0) return '';
        var own = kid ? 'Where are they right now?' : 'Where are you right now?';
        return '<div class="gl-stage" role="radiogroup" aria-labelledby="gl-st-' + n + '"><p class="gl-st-h" id="gl-st-' + n + '"><b>Living Sober.</b> ' + esc(own) + ' <small>Optional. Guides for this stage show first.</small></p>' +
          '<div class="gl-st-row">' + STAGES.filter(function (x) { return stagesFor(tree).indexOf(x.id) >= 0; }).map(function (x) {
            var on = c.sober === x.id;
            return '<button type="button" class="gl-st" role="radio" data-gl="stage" data-id="' + x.id + '" aria-checked="' + on + '"><b>' + esc(x.name) + '</b><small>' + esc(x.line) + '</small></button>';
          }).join('') + '</div>' +
          // The sober date (GWG BLD 837), once and optional, in the adult trees. Only the count ever shows.
          (DECLARED.indexOf(tree) >= 0 && !kid ? '<label class="gl-date"><b>My Sober Date</b> <small>Optional. Locked on this device; only the count shows, as a star on the Living Sober card.</small>' +
            '<span class="gl-date-row"><input type="date" data-gl="date" max="' + today() + '" min="1900-01-01" value="' + esc(c.soberDate) + '">' + (c.soberDate ? '<button type="button" class="gl-link" data-gl="nodate">Clear the Date</button>' : '') + '</span></label>' : '') +
          '</div>';
      };
      var sw = function (key, name, line, on) {
        return '<button type="button" class="gl-sw" role="switch" data-gl="sw" data-id="' + key + '" aria-checked="' + on + '"><span class="gl-track" aria-hidden="true"></span><span><b>' + esc(name) + '</b><small>' + esc(line) + '</small></span></button>';
      };
      wrap.innerHTML = '<h3 id="gl-h-' + n + '">' + esc(label(tree, kid)) + '</h3>' +
        '<p class="gl-intro">' + esc(intro) + '</p>' +
        '<div class="gl-grid" role="group" aria-labelledby="gl-h-' + n + '">' + list.map(function (x) { return box(x.id, x.name, x.line, c.ids.indexOf(x.id) >= 0, 'id'); }).join('') + '</div>' +
        stageHtml(c) +
        '<div class="gl-specials">' + box('none', CAT.none.words[tree], CAT.none.line[tree], c.none, 'sp') + box('rather', CAT.rather.words[tree], CAT.rather.line[tree], c.rather, 'sp') + '</div>' +
        sw('gentle', 'Show Gentler Ways First', 'Practices with a seated, lying down, short, or low-energy way come first, and show that way.' + (c.rather ? ' On while I\'d Rather Not Say is chosen.' : ''), c.gentle || c.rather) +
        (helperOn ? sw('shareHelpers', 'Share My Health and Ability with my helpers', c.shareHelpers ? 'On. Helpers you added can see these choices, so they can help in ways that fit.' : 'Off. These choices stay private to you until you turn this on.', c.shareHelpers) : '') +
        '<div class="gl-foot"><button type="button" class="gl-link" data-gl="clear">Clear My Choices</button>' +
        (opt.onDone ? '<button type="button" class="gl-b gl-go" data-gl="done">Done</button>' : '') + '</div>' +
        '<p class="gl-status" role="status" aria-live="polite">' + esc(msg || (guest ? 'Kept for this visit only. Open a profile to keep it, locked on this device.' : (c.set ? 'Saved, locked on this device.' : ''))) + '</p>';
    }
    function save(patch, msg) {
      var go = patch === null ? clear(pid) : set(patch, pid);
      return go.then(function () { paint(msg); }, function (e) { paint(e && e.message ? e.message : 'That did not save. Try again.'); });
    }
    wrap.addEventListener('change', function (e) {
      var d = e.target.closest('[data-gl="date"]'); if (!d || !wrap.contains(d)) return;
      if (d.value && !okDate(d.value)) { paint('Choose a day up to today.'); return; }
      save({ soberDate: d.value || '' }, d.value ? 'Saved, locked on this device.' : '').then(function () { var f = wrap.querySelector('[data-gl="date"]'); if (f) f.focus(); });
    });
    wrap.addEventListener('click', function (e) {
      var b = e.target.closest('[data-gl]'); if (!b || !wrap.contains(b)) return;
      var k = b.getAttribute('data-gl'), id = b.getAttribute('data-id'), c = get(pid), focusSel = '[data-gl="' + k + '"]' + (id ? '[data-id="' + id + '"]' : '');
      var after = function () { var f = wrap.querySelector(focusSel); if (f) f.focus(); };
      if (k === 'id') { var ids = c.ids.slice(), i = ids.indexOf(id); if (i >= 0) ids.splice(i, 1); else ids.push(id); var pt = { ids: ids, none: false, rather: false }; if (id === 'sober' && i < 0 && KIDS.indexOf(tree) >= 0) pt.sober = 'love'; save(pt).then(after); }
      else if (k === 'stage') { save({ sober: c.sober === id ? '' : id }).then(after); }
      else if (k === 'sp') {
        if (id === 'none') save({ ids: [], none: !c.none, rather: false }).then(after);
        else save({ ids: [], none: false, rather: !c.rather }).then(after);
      }
      else if (k === 'sw') { var p = {}; if (id === 'gentle' && c.rather) { save({}, 'Gentler ways stay first while I\'d Rather Not Say is chosen.').then(after); return; } p[id] = !c[id]; save(p).then(after); }
      else if (k === 'clear') { if (!confirm(kid ? 'Clear these choices? They are erased from this profile.' : 'Clear your choices? They are erased from your profile.')) return; save(null, 'Cleared. Nothing is kept.').then(function () { var f = wrap.querySelector('.gl-box'); if (f) f.focus(); }); }
      else if (k === 'nodate') { save({ soberDate: '' }).then(function () { var f = wrap.querySelector('[data-gl="date"]'); if (f) f.focus(); }); }
      else if (k === 'done') { if (opt.onDone) opt.onDone(get(pid)); }
    });
    paint();
    return { el: wrap, refresh: function () { paint(); } };
  }

  /* ---------- the chooser in a dialog (Manage My Profile, the offer card) ---------- */
  function dialog(tree, opt) {
    opt = opt || {}; addCSS();
    return new Promise(function (resolve) {
      var back = document.createElement('div'); back.className = 'gglife-back gglife';
      back.innerHTML = '<div class="gl-dlg" role="dialog" aria-modal="true" aria-label="' + esc(label(tree, opt.forChild)) + '"></div>';
      document.body.appendChild(back);
      var box = back.firstChild, last = document.activeElement, done = false;
      function close() {
        if (done) return; done = true; back.remove(); document.removeEventListener('keydown', key, true);
        if (last && last.focus) try { last.focus(); } catch (e) {}
        var c = get(opt.id); if (opt.onDone) opt.onDone(c); resolve(c);
      }
      function key(e) {
        if (e.key === 'Escape') { e.stopPropagation(); close(); return; }
        if (e.key === 'Tab') {
          var f = box.querySelectorAll('button,a[href],input,select'); if (!f.length) return;
          var a = f[0], z = f[f.length - 1];
          if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
          else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
        }
      }
      document.addEventListener('keydown', key, true);
      back.addEventListener('click', function (e) { if (e.target === back) close(); });
      chooser(box, { tree: tree, forChild: opt.forChild, id: opt.id, onDone: close });
      var first = box.querySelector('.gl-box'); if (first) setTimeout(function () { first.focus(); }, 30);
    });
  }

  /* ---------- the quiet card after a first full check-in ---------- */
  function offerCard(host, tree, opt) {
    opt = opt || {};
    if (!host || !treeOk(tree)) return null;
    var id = who(), c = get(id);
    if (c.ids.length || c.none || c.rather) return null;
    if (id) {
      if (helperView(id)) return null;
      var v = vault(id); if (!v) return null;
      v.lifeOffer = v.lifeOffer && typeof v.lifeOffer === 'object' ? v.lifeOffer : {};
      if (v.lifeOffer[tree]) return null;
      v.lifeOffer[tree] = today(); P().save(id);
    } else {
      if (MEMOFFER[tree]) return null;
      MEMOFFER[tree] = 1;
    }
    addCSS();
    var card = document.createElement('div'); card.className = 'gglife gl-card'; card.setAttribute('role', 'note');
    card.innerHTML = '<p>' + esc(opt.forChild ? 'Want Grounded to fit their body and health? You can choose together in Settings.' : 'Want Grounded to fit your body and health? You can choose in Settings.') + '</p>' +
      '<div class="gl-row"><button type="button" class="gl-b gl-go" data-gl="choose">Choose Now</button><button type="button" class="gl-b" data-gl="later">Maybe Later</button></div>';
    card.addEventListener('click', function (e) {
      var b = e.target.closest('[data-gl]'); if (!b) return;
      if (b.getAttribute('data-gl') === 'later') { card.remove(); return; }
      card.remove();
      if (typeof opt.onChoose === 'function') opt.onChoose(); else dialog(tree, { forChild: opt.forChild });
    });
    host.appendChild(card);
    return card;
  }

  /* ---------- profile changes: unlock, lock, switch ---------- */
  var hooked = false;
  function hook() {
    if (hooked || !window.GGP || !GGP.on) return; hooked = true;
    GGP.on(function (type) { if (type === 'change' || type === 'ready') fire(who()); });
  }
  hook();
  if (!hooked) { var tries = 0, t = setInterval(function () { hook(); if (hooked || ++tries > 40) clearInterval(t); }, 250); }

  window.GGLife = {
    version: 'lf3', CATS: CATS, TREES: TREES.slice(), FITS: 'Fits You', LINES_TITLE: 'Information and Support',
    cats: cats, get: get, set: set, clear: clear, has: has, chosen: chosen, gentle: gentle, fits: fits, order: order,
    lines: lines, picks: picks, addGuides: addGuides, label: label, chooser: chooser, dialog: dialog, offerCard: offerCard,
    STAGES: STAGES, stages: stagesFor, sober: sober, soberStage: soberStage, ring: ring, ringShows: ringShows, soberSteps: soberSteps,
    DECLARED: DECLARED.slice(), declared: function (tree) { return DECLARED.indexOf(tree) >= 0; }, soberDate: soberDate, soberLines: soberLines, okDate: okDate,
    anchor: anchor, setAnchor: setAnchor, days: days, setDay: setDay, setCost: setCost, clearDays: clearDays, helperView: function (id) { return helperView(id || who()); },
    use: function (id) { ctx = id || null; fire(who()); }, who: who,
    on: function (fn) { window.addEventListener('gglife:change', function (e) { try { fn(e.detail); } catch (x) { console.error(x); } }); }
  };
})();
