/* =====================================================================
   GROUNDED . SITE-WIDE SEARCH (opened from the Search button in every header, nav.js)
   One engine for every search box on the site: the header search, the Tools
   page, each app's When Life Changes tab, and every practice library.
   It finds When Life Changes guides, practices, books, pages, tools, and stories.
   Everything runs in the browser. Nothing typed here is sent anywhere.

   Where the words come from (edit them there, not here):
     Guides       maple/guides.js, aspen/guides.js, pine/guides.js, birch/guides.js, oak/guides.js, sequoia/guides.js, willow/guides.js
     Practices    grove/data.js and grove/library.js
     Stories      stories.html (read as the page is today)
     Tools        TOOLS below

   EVERYDAY WORDS (below) teaches search the words people really type,
   like "vape" or "blow up", so they find the right guides. Add a line
   any time a search comes up empty that shouldn't.
   ===================================================================== */
(function () {
  // Loaded once per page. A second load just mounts any new site search box.
  if (window.GGSearch && window.GGSearch.attach) { window.GGSearch.mountSite(); return; }
  var WAIT = [];   // status lines waiting on the index

  /* ---------- tools ---------- */
  var TOOLS = [
    { title: 'Maple', sub: 'Check-in for kids, grades K to 5, with 60 When Life Changes guides for grown-ups', href: '/maple/', keys: 'when life changes guides hard talks kids children elementary kindergarten k 5 check-in check in checkup feelings tree critters' },
    { title: 'Aspen', sub: 'Check-in for grades 6 to 8, with 49 When Life Changes guides for grown-ups', href: '/aspen/', keys: 'when life changes guides hard talks middle school middle schooler preteen tween teen 6th 7th 8th grade check-in check in checkup' },
    { title: 'Oak', sub: 'Check-in for adults, 25 to 60, from root to fruit, with 67 When Life Changes guides for hard seasons', href: '/oak/', keys: 'when life changes guides hard talks adult grown up spiritual health wellbeing check-in check in checkup assessment growth plan' },
    { title: 'The Grove', sub: 'Daily practice for every tree, all ages, and whole families', href: '/grove/', keys: 'practice daily habits family grove tending tend routine' },
    { title: 'Grounded Field Guide', sub: 'For chaplains, pastors, teachers, counselors, and parents', href: '/field-guide/', keys: 'professional chaplain pastor teacher counselor school staff organization training guide caregiver practitioner nurse hospice Oak guide grove guide' },
    { title: 'Pine', sub: 'Check-in for high schoolers, grades 9 to 12, with a growth plan, daily practices, Next Steps for life after high school, and 48 When Life Changes guides', href: '/pine/', keys: 'when life changes guides hard talks pine high school high schooler teen teens teenager 9th 10th 11th 12th grade freshman sophomore junior graduation college career check-in check in checkup growth plan next steps goals' },
    { title: 'Birch', sub: 'Check-in for young adults, 18 to 26, with a growth plan, daily practices, Groundwork, a private notebook for building your own life, and 48 When Life Changes guides', href: '/birch/', keys: 'when life changes guides birch young adult young adults 18 19 20 21 22 23 24 25 26 twenties 20s college university trade school apprenticeship first job work career military service moving out first apartment roommates money budget groundwork skills check-in check in checkup growth plan' },
    { title: 'Sequoia', sub: 'Check-in for older adults, 60 and up, with a growth plan, a Legacy Book, and 48 When Life Changes guides', href: '/sequoia/', keys: 'when life changes guides hard talks sequoia older adults older adult elders senior seniors 55 60 65 70 80 retirement retired aging grandparents grandparent grandkids legacy book life story memoir check-in check in checkup growth plan' },
    { title: 'Willow', sub: 'For hospice: the person, and the people who love them. Faith cards, 22 When Life Changes guides, readings', href: '/willow/', keys: 'when life changes guides hard talks end of life dying hospice palliative caregiver family vigil doula chaplain last days readings prayers faith' },
    { title: 'Obituary Helper', sub: 'For families: guided questions and three drafts, a Death Notice, a Newspaper Obituary, and an Online Obituary', href: '/obituary-helper.html', keys: 'obituary obituaries obit death notice newspaper online memorial write writing died death funeral family survived by preceded in death' },
    { title: 'Planning a Farewell', sub: 'For families: a checklist for the first hours, the first days, the service, and after', href: '/planning-a-farewell.html', keys: 'funeral planning plan checklist what to do after death who to call someone died death certificate certificates funeral home arrangements burial cremation memorial service hospice after a death' },
    { title: 'The Grounded Marriage App', sub: 'For couples: Before the Vows and After the Vows, on one device or two, with your answers on your own devices', href: '/marriage/', keys: 'grounded marriage app couple couples engaged engagement fiance fiancee newlywed newly married marriage married wedding premarital premarital questions marriage prep relationship check-in check in talk about money in-laws conflict communication faith children kids expectations compatibility quiz questionnaire inventory workbook couple workbook' },
    { title: 'Before the Vows', sub: 'In The Grounded Marriage app: each of you answers privately, then Strengths and Growing Edges and Talk About This show where you stand together', href: '/marriage/', keys: 'before the vows engaged engagement premarital questions inventory strengths growing edges talk about this couple workbook card' },
    { title: 'After the Vows', sub: 'In The Grounded Marriage app, after your wedding: Practices for Two, the Monthly Check-in for Two, and the First-Year Check-in', href: '/marriage/', keys: 'after the vows newlywed newlyweds newly married married couple first year anniversary monthly check-in check in' },
    { title: 'Practices for Two', sub: 'Quiet, simple practices for closeness, in The Grounded Marriage app', href: '/marriage/', keys: 'practices for two couple couples closeness connection breathing together eye contact hug walk evening check-in marriage' },
    { title: 'The Money Map', sub: 'A budget worksheet for two, in The Grounded Marriage app, kept on your device', href: '/marriage/', keys: 'money map budget budgeting worksheet couple couples finances money debt saving giving goals marriage' },
    { title: 'Eulogy Helper', sub: 'For the one who will speak: prompts, an outline, a reading time, and tips for speaking through tears', href: '/eulogy-helper.html', keys: 'eulogy eulogies speech speaking funeral memorial tribute remarks words celebration of life life story stories crying tears' }
  ];


  /* ---------- site pages (Rebrand Session 2: search covers the whole site) ---------- */
  var PAGES = [
    { title: 'For Organizations', sub: 'Grounded Field Guide licenses for churches, schools, hospices, and practitioners, from $240 a year', href: '/organizations.html', keys: 'organizations organization license licensing pricing price prices church churches school schools hospice hospices practitioner team staff founding partner grace fund field guide seats' },
    { title: 'Services', sub: 'Marriage, celebrations, farewells, hard seasons, growth, and teams', href: '/services.html', keys: 'services thresholds ceremonies ceremony officiant help book hire support' },
    { title: 'The Grounded Marriage', sub: '12 hours of premarital sessions with Chris and Kayti, interfaith and built to your faith, from $950; with your ceremony and rehearsal, from $1,650', href: '/the-grounded-marriage.html', keys: 'marriage married wedding package premarital premarital counseling premarital education engaged couple grounded marriage license discount educator statement prepare enrich' },
    { title: 'Weddings', sub: 'Custom ceremonies, from $650', href: '/weddings.html', keys: 'wedding weddings officiant marry married ceremony vows' },
    { title: 'Elopements', sub: 'Just the two of you, anywhere, from $350', href: '/elopements.html', keys: 'elope elopement courthouse small simple legal ceremony' },
    { title: 'Vow Renewals', sub: 'For couples who would say it all again, from $500', href: '/vow-renewals.html', keys: 'vow renewal renew vows anniversary' },
    { title: 'Premarital Sessions', sub: 'The Grounded Marriage with Chris and Kayti, from $950', href: '/premarital-counseling.html', keys: 'premarital counseling premarital education premarital sessions prepare enrich engaged license discount' },
    { title: 'Funerals and Memorials', sub: 'Honest, personal services, from $500', href: '/funerals-memorials.html', keys: 'funeral funerals memorial service died death officiant eulogy' },
    { title: 'Celebrations of Life', sub: 'Stories, music, laughter, and room for tears', href: '/celebrations-of-life.html', keys: 'celebration of life memorial death died' },
    { title: 'Bedside Blessings', sub: 'Prayers and rituals for the last days', href: '/bedside-blessings.html', keys: 'bedside blessing dying last rites prayer hospice' },
    { title: 'Pregnancy and Infant Loss', sub: 'Gentle support and ceremony after losing a baby, by donation', href: '/pregnancy-infant-loss.html', keys: 'miscarriage stillbirth infant loss baby died pregnancy loss nicu' },
    { title: 'Child Blessings', sub: 'Welcoming a new life into a family', href: '/child-blessings.html', keys: 'baby blessing naming child dedication new baby' },
    { title: 'House Blessings', sub: 'A new home, or a new beginning', href: '/house-blessings.html', keys: 'house blessing new home move' },
    { title: 'Milestones', sub: 'Graduations, retirements, recovery, and more', href: '/milestones.html', keys: 'milestone graduation retirement recovery anniversary' },
    { title: 'End-of-Life Support', sub: 'Presence at the bedside, planning, and vigil, from $125 an hour', href: '/end-of-life-support.html', keys: 'end of life dying vigil doula bedside hospice planning family support legacy' },
    { title: 'Grief and Caregiver Support', sub: 'One-on-one support after a loss or while caregiving, $125 a session', href: '/grief-caregiver-support.html', keys: 'grief griefwork bereavement loss caregiver caregiving burnout widow widower' },
    { title: 'Growth and Renewal', sub: 'Grow deeper. Rest well. Spiritual guidance, meditation, and retreats', href: '/services.html#growth', keys: 'growth renewal grow deeper rest retreat retreats workshop workshops seminar seminars faith spiritual practice' },
    { title: 'Spiritual Guidance', sub: 'One-on-one guidance for your inner life, $125 a session', href: '/spiritual-guidance.html', keys: 'spiritual guidance direction director faith doubt questions discernment religious hurt prayer meaning' },
    { title: 'Meditation, Sound and Movement', sub: 'Sound bowls, body scans, yoga, and breathwork', href: '/meditation-sound-movement.html', keys: 'meditation sound bowl bowls yoga breathwork body scan mindfulness rest relax' },
    { title: 'Speaking and Training', sub: 'Talks and trainings for teams, from $750', href: '/speaking-training.html', keys: 'speaking speaker talk keynote training conference in-service workshop hospice team staff' },
    { title: 'Rates', sub: 'What it costs, plainly', href: '/rates.html', keys: 'rates price prices cost costs fee fees how much pay payment deposit' },
    { title: 'About', sub: 'Who we are and how we work', href: '/about.html', keys: 'about who chris kayti joy founders our story' },
    { title: 'Contact', sub: 'Reach out, we reply within two days', href: '/contact.html', keys: 'contact email call reach out question' },
    { title: 'Voice Setup', sub: 'Set up a good voice for videos and Read Aloud', href: '/voice-setup.html', keys: 'voice voices read aloud premium enhanced natural siri robotic sound audio video setup speech' },
    { title: 'The Grounded Library', sub: 'The books behind Grounded, twenty years of study', href: '/library/', keys: 'library books reading bookshelf shelf reading list resources authors' },
    { title: 'Privacy', sub: 'Your answers stay on your device', href: '/privacy.html', keys: 'privacy data private' },
    { title: 'Terms', sub: 'Terms of use', href: '/terms.html', keys: 'terms legal' }
  ];

  /* ---------- everyday words ---------- */
  // "word people type": "words that appear in our guides"
  var SYN = {
    vape: 'vaping nicotine', vapes: 'vaping nicotine', vaping: 'vaping nicotine', juul: 'vaping nicotine', zyn: 'vaping nicotine pouches',
    pouch: 'vaping nicotine pouches', pouches: 'vaping nicotine pouches', nicotine: 'vaping nicotine', ecig: 'vaping nicotine', cigarette: 'vaping nicotine smoking', smoking: 'vaping nicotine',
    weed: 'drug alcohol substance vaping', marijuana: 'drug alcohol substance vaping', thc: 'drug alcohol substance vaping', edibles: 'drug alcohol substance',
    drugs: 'drug alcohol substance addiction', drinking: 'drinking alcohol substance addiction', drunk: 'drinking alcohol substance addiction', alcohol: 'alcohol drinking substance addiction',
    meltdown: 'meltdown blowup escalating', tantrum: 'meltdown tantrum', outburst: 'meltdown blowup outburst anger', blowup: 'blowup meltdown escalating',
    freakout: 'meltdown blowup escalating', losingit: 'meltdown blowup escalating', outofcontrol: 'meltdown blowup escalating',
    deescalate: 'meltdown blowup escalating', deescalation: 'meltdown blowup escalating', escalating: 'escalating meltdown blowup', escalation: 'escalating meltdown blowup',
    agitated: 'escalating meltdown blowup', rage: 'anger blowup escalating', yelling: 'anger meltdown blowup escalating', screaming: 'meltdown blowup escalating',
    calmdown: 'meltdown blowup escalating breath calm', fight: 'anger bullying blowup meltdown', fighting: 'anger bullying blowup meltdown', hitting: 'anger meltdown hitting', punching: 'anger meltdown blowup',
    bully: 'bullying bullied', bullied: 'bullying bullied', teasing: 'bullying teased', pickedon: 'bullying bullied', cyberbullying: 'bullying online', mean: 'bullying unkind mean',
    lockdown: 'lockdown violence shooting', shooting: 'lockdown violence shooting', shooter: 'lockdown violence shooting',
    died: 'death died grief', dead: 'death died grief', dying: 'dying death hospice', passed: 'death died grief', funeral: 'death funeral grief', grieving: 'grief death loss', grief: 'grief death loss', loss: 'loss grief death',
    endoflife: 'dying hospice death', hospice: 'hospice dying', terminal: 'dying diagnosis hospice',
    divorce: 'divorce homes', divorced: 'divorce', separated: 'divorce separation', custody: 'divorce homes', twohomes: 'divorce homes',
    anxious: 'anxiety worry', anxiety: 'anxiety worry', worried: 'worry anxiety', worry: 'worry anxiety', panic: 'anxiety panic worry', nervous: 'worry anxiety nervous', scared: 'worry fear scared',
    depressed: 'sadness depressed', depression: 'sadness depressed depression', sad: 'sadness sad', lonely: 'loneliness lonely alone',
    nudes: 'pictures secrets', sexting: 'pictures secrets', sextortion: 'pictures secrets', porn: 'pornography pictures secrets', pornography: 'pornography pictures secrets', explicit: 'pornography pictures',
    tiktok: 'phone screens', instagram: 'phone screens', snapchat: 'phone chats', gaming: 'gaming screens', screentime: 'screen screens phone',
    chatbot: 'ai chatbot', chatgpt: 'ai chatbot', ai: 'ai chatbot',
    dementia: 'dementia alzheimer memory', alzheimers: 'dementia alzheimer memory', cancer: 'cancer diagnosis illness sick', diagnosis: 'diagnosis illness sick', sick: 'sick illness',
    military: 'deployed military', deployment: 'deployed military', ice: 'immigration', deported: 'immigration deported', deportation: 'immigration',
    widow: 'spouse partner died grief', widowed: 'spouse partner died grief', widower: 'spouse partner died grief',
    nursinghome: 'aging dementia caregiving moving', assistedliving: 'aging moving caregiving', memorycare: 'dementia memory caregiving', medicare: 'money diagnosis chronic',
    retirement: 'retirement', retired: 'retirement', retiring: 'retirement', grandkids: 'family grandchildren', grandchildren: 'family grandchildren', grandchild: 'family grandchildren',
    scam: 'money scam fraud', scammed: 'money scam fraud', fraud: 'money scam fraud', elderabuse: 'home safe abuse', aging: 'aging retirement', elderly: 'aging older',
    dog: 'pet', cat: 'pet', insomnia: 'sleep', cantsleep: 'sleep', pray: 'prayer pray', breathing: 'breath breathe', breathe: 'breath breathe',
    jail: 'incarcerated prison jail', prison: 'incarcerated prison jail', fired: 'job', laidoff: 'job',
    moving: 'moving move', newschool: 'starting changing', puberty: 'changing', esteem: 'comparing confidence different',
    anorexia: 'eating disorder', anorexic: 'eating disorder', bulimia: 'eating disorder', bulimic: 'eating disorder', binge: 'eating disorder binge', bingeing: 'eating disorder binge', binging: 'eating disorder binge',
    purging: 'eating disorder purging', arfid: 'eating arfid', picky: 'eating picky food', diet: 'eating dieting weight', dieting: 'eating dieting weight', weight: 'eating weight', noteating: 'eating disorder food', eatingdisorder: 'eating disorder', food: 'food eating',
    crash: 'accident crash', wreck: 'accident crash wreck', collision: 'accident crash', caraccident: 'accident crash', concussion: 'concussion accident', injured: 'injury injured accident', injury: 'injury accident', er: 'accident injury hospital', icu: 'accident injury hospital',
    adhd: 'adhd attention', focus: 'attention focus adhd', distracted: 'attention distracted adhd', hyperactive: 'attention hyperactive adhd', impulsive: 'attention impulsive adhd',
    dyslexia: 'dyslexia learning', learningdisability: 'learning dyslexia attention', iep: 'iep 504 learning', '504': 'iep 504 learning', homework: 'homework grades learning attention',
    lie: 'lying lies', lies: 'lying lies', lied: 'lying lies', liar: 'lying liar', steal: 'stealing taking', stealing: 'stealing taking', stole: 'stealing taking', steals: 'stealing taking', shoplifting: 'stealing shoplifting', sneaking: 'sneaking lying',
    gamble: 'gambling', gambling: 'gambling', betting: 'gambling betting', bet: 'gambling betting', bets: 'gambling betting', sportsbetting: 'gambling betting sports', lootbox: 'gambling loot', casino: 'gambling casino', lottery: 'gambling lottery', parlay: 'gambling betting', draftkings: 'gambling betting', fanduel: 'gambling betting',
    bedwetting: 'bedwetting', enuresis: 'bedwetting', pullups: 'bedwetting',
    college: 'college graduation', graduation: 'graduation college leaving', dorm: 'college dorm', homesick: 'college leaving homesick', leavinghome: 'college sibling graduation', movingout: 'college sibling moving',
    angry: 'anger angry blowup meltdown escalating', mad: 'anger mad meltdown', selfharm: 'harm hurting suicide wanting cutting', selfinjury: 'harm hurting cutting', panicattack: 'panic anxiety', stepmom: 'stepfamily', stepdad: 'stepfamily', stepparent: 'stepfamily'
  };
  var PHRASES = [
    [/blow(ing|s)? up|blew up/g, 'blowup'], [/freak(ing|ed|s)? out/g, 'freakout'], [/losing it|lost it/g, 'losingit'], [/out of control/g, 'outofcontrol'],
    [/calm(ing)? (them |him |her |me )?down/g, 'calmdown'], [/de[\s-]?escalat\w*/g, 'deescalate'], [/picked on|picking on/g, 'pickedon'], [/end of life/g, 'endoflife'], [/nursing homes?/g, 'nursinghome'], [/assisted living/g, 'assistedliving'], [/memory care/g, 'memorycare'], [/elder abuse/g, 'elderabuse'],
    [/two homes/g, 'twohomes'], [/screen time/g, 'screentime'], [/can'?t sleep|trouble sleeping/g, 'cantsleep'], [/laid off|lay ?off/g, 'laidoff'],
    [/new school/g, 'newschool'], [/e[\s-]?cig\w*/g, 'ecig'], [/alzheimer'?s/g, 'alzheimers'], [/school shooting/g, 'shooting'], [/self[\s-]?harm\w*|cutting|cut (my|him|her|them)sel\w*/g, 'selfharm'], [/panic attacks?/g, 'panicattack'], [/self[\s-]?esteem/g, 'esteem'],
    [/self[\s-]?injur\w*/g, 'selfinjury'], [/burn(ing|ed|s)? (my|him|her|them)sel\w*/g, 'selfharm'],
    [/learning (disabilit|difference)\w*/g, 'learningdisability'], [/sports ?betting|sports ?bets?/g, 'sportsbetting'], [/loot ?box(es)?/g, 'lootbox'], [/wet(s|ting)? the bed|pee(s|ing)? (in )?the bed|bed ?wetting/g, 'bedwetting'], [/pull[\s-]?ups/g, 'pullups'], [/leaving home|leave home|leaves home/g, 'leavinghome'], [/moving out|moves out|moved out/g, 'movingout'], [/eating disorders?/g, 'eatingdisorder'], [/not eating|won'?t eat|stopped eating|refus\w* to eat/g, 'noteating'], [/car (accident|crash|wreck)s?/g, 'caraccident'], [/head injur\w*/g, 'concussion']
  ];
  var STOP = ' a an and are about as at be but by can do does for from get how i if in into is it its me my of on or our should so some that the their them they this to up we what when where who why will with you your talk talking tell telling help helping deal dealing handle handling kid kids child children son daughter student students teen teens teenager adult adults someone somebody person people keeps keep always cant wont just really ';
  // 'hs' (grades 9 to 12) leads Pine's guides (GWG BLD 740); teen, high school, and 9th to 12th go there.
  // Middle school words still lead Aspen's. Young adult words (Birch, GWG BLD 742) give 'ya', which
  // leads Birch's guides (GWG BLD 743) and still lifts the adult guides a little.
  var AGE_HINT = [[/\b(kid|kids|child|children|little|elementary|kindergarten|preschool)\b/, 'k5'], [/\b(high ?schools?|high ?schoolers?|teen|teens|teenagers?|9th|10th|11th|12th|freshman|freshmen|sophomores?)\b/, 'hs'], [/\b(middle|middle ?schoolers?|preteen|tween|6th|7th|8th)\b/, 'ms'], [/\b(young ?adults?|college|university|twenties|20s|18 to 26|emerging ?adults?)\b/, 'ya'], [/\b(adult|adults|husband|wife|spouse|partner|mom|dad|parent|coworker|patient|myself)\b/, 'ad']];

  /* ---------- crisis words ---------- */
  var CRISIS = /suicid|kill (my|him|her|them)sel|killing (my|him|her|them)sel|want(s|ed)? to die|end (my|his|her|their) life|self[\s-]?harm|cutting|hurt(ing)? (my|him|her|them)sel|burn(ing|s)? (my|him|her|them)sel|overdos|not safe|unsafe|weapon|\bgun\b|shooter/;
  var ABUSE = /abuse|abused|molest|rape|assault|touched me|hits me|hitting me|beat(s|ing)? me|domestic/;

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function plain(s) { return String(s == null ? '' : s).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' '); }
  function norm(s) { return ' ' + plain(s).toLowerCase().replace(/[\u2018\u2019']/g, '').replace(/[^a-z0-9]+/g, ' ').trim() + ' '; }
  function stem(w) {
    var e = ['ing', 'ed', 'es', 's', 'e'];
    for (var i = 0; i < e.length; i++) { if (w.length > 4 && w.slice(-e[i].length) === e[i] && w.length - e[i].length >= 4) return w.slice(0, -e[i].length); }
    return w;
  }
  function list(a) { return '<ul>' + (a || []).map(function (x) { return '<li>' + esc(plain(x).replace(/\s+/g, ' ').trim()) + '</li>'; }).join('') + '</ul>'; }

  /* ---------- building the index ---------- */
  var ITEMS = null, loading = null;
  function load(src) {
    return new Promise(function (ok) {
      var s = document.createElement('script'); s.src = src; s.async = false;
      s.onload = ok; s.onerror = ok; document.head.appendChild(s);
    });
  }
  // The Grove data runs in its own scope, so it never clashes with a tool page that already
  // has its own copies loaded (searching from inside Maple, Aspen, Oak, or The Grove).
  var GPART = null;
  function loadGrove() {
    return Promise.all(['/grove/data.js', '/grove/library.js'].map(function (u) {
      return fetch(u).then(function (r) { return r.ok ? r.text() : ''; }).catch(function () { return ''; });
    })).then(function (t) {
      try {
        var keep = window.GroveLibrary;
        var got = new Function(t[0] + '\n;' + t[1] + '\n;return { lib: window.GroveLibrary, part: (typeof PART !== "undefined") ? PART : null };')();
        GPART = got.part; window.GGSGroveLibrary = got.lib;
        if (keep) window.GroveLibrary = keep;
      } catch (e) {}
    });
  }
  // The Grounded library (Library session): read as text, so a page that already loaded books.js isn't disturbed.
  var BOOKS = [];
  function loadBooks() {
    return fetch('/library/books.js').then(function (r) { return r.ok ? r.text() : ''; }).then(function (txt) {
      var sec = {}, m = /const SECTIONS = \{([\s\S]*?)\};/.exec(txt);
      if (m) m[1].replace(/([A-Z]{2}):\s*\['([^']+)'/g, function (a, k, n) { sec[k] = n; });
      var d = /const BOOK_DATA = `([\s\S]*?)`/.exec(txt);
      BOOKS = d ? d[1].trim().split('\n').map(function (l) { var f = l.split('|'); return f.length > 6 ? { no: f[0], title: f[1], author: f[2], summary: f[6], tags: f[7] || '', parts: f[5], sec: sec[f[0].slice(0, 2)] || '' } : null; }).filter(Boolean) : [];
    }).catch(function () { BOOKS = []; });
  }
  function add(o) {   // titles also match with hyphens joined, so "Self-harm" matches "selfharm"
    o.nTitle = norm(o.title + ' ' + String(o.title).replace(/(\w)-(\w)/g, '$1$2')); o.nKeys = norm(o.keys || ''); o.nLead = norm((o.lead || []).join(' ') + ' ' + (o.sub || '')); o.nBody = norm(o.body || '');
    ITEMS.push(o);
  }
  function build() {
    if (loading) return loading;
    ITEMS = [];
    WAIT.forEach(function (el) { el.textContent = 'Getting everything ready...'; });
    loading = Promise.all([
      load('/maple/guides.js'), load('/aspen/guides.js'), load('/pine/guides.js?v=pg2'), load('/birch/guides.js?v=bg3'), load('/oak/guides.js?v=ps3'), load('/sequoia/guides.js?v=sg3'), load('/willow/guides.js?v=cn2'), loadGrove(), loadBooks()
    ]).then(function () {
      TOOLS.forEach(function (t) { add({ type: 'tool', title: t.title, sub: t.sub, keys: t.keys, href: t.href }); });
      PAGES.forEach(function (t) { add({ type: 'page', title: t.title, sub: t.sub, keys: t.keys, href: t.href }); });

      var sp = window.MAPLE_GUIDES;
      if (sp) sp.topics.forEach(function (t) {
        var ring = (sp.rings.find(function (r) { return r.key === t.ring; }) || {}).name || '';
        add({ type: 'talk', age: 'k5', ageLabel: 'Kids, K to 5', title: t.title, sub: ring, keys: t.keys, lead: t.quick, quick: t.quick,
          body: [t.k2, t.g35].concat(t.helps || [], t.before || [], t.after || [], t.teach || []).join(' '),
          href: '/maple/#talk=' + encodeURIComponent(t.id), from: 'Maple', id: t.id, app: 'maple' });
      });
      var sa = window.ASPEN_GUIDES;
      if (sa) sa.groups.forEach(function (g) { g.topics.forEach(function (t) {
        if (!t.quick) return;
        add({ type: 'talk', age: 'ms', ageLabel: 'Grades 6 to 8', title: t.title, sub: g.name, keys: t.keys || '', lead: t.quick, quick: t.quick,
          body: (t.talk || []).concat(t.say || []).join(' '), href: '/aspen/#talk=' + encodeURIComponent(t.id), from: 'Aspen', id: t.id, app: 'aspen' });
      }); });
      // Pine guides (GWG BLD 740), the same shape as Oak's and Sequoia's
      var spn = window.PINE_GUIDES;
      if (spn) spn.topics.forEach(function (t) {
        var ring = (spn.rings.find(function (r) { return r.key === t.ring; }) || {}).name || '';
        add({ type: 'talk', age: 'hs', ageLabel: 'Grades 9 to 12', title: t.title, sub: ring, keys: t.keys, lead: t.quick, quick: t.quick,
          body: [t.feel].concat((t.self && t.self.first) || [], (t.helper && t.helper.help) || []).join(' '),
          href: '/pine/#life=' + encodeURIComponent(t.id), from: 'Pine', id: t.id, app: 'pine' });
      });
      // Birch guides (GWG BLD 743), the same shape as Pine's, for young adults, 18 to 26
      var sbr = window.BIRCH_GUIDES;
      if (sbr) sbr.topics.forEach(function (t) {
        var ring = (sbr.rings.find(function (r) { return r.key === t.ring; }) || {}).name || '';
        add({ type: 'talk', age: 'ya', ageLabel: 'Ages 18 to 26', title: t.title, sub: ring, keys: t.keys, lead: t.quick, quick: t.quick,
          body: [t.feel].concat((t.self && t.self.first) || [], (t.helper && t.helper.help) || []).join(' '),
          href: '/birch/#life=' + encodeURIComponent(t.id), from: 'Birch', id: t.id, app: 'birch' });
      });
      var so = window.OAK_GUIDES;
      if (so) so.topics.forEach(function (t) {
        var ring = (so.rings.find(function (r) { return r.key === t.ring; }) || {}).name || '';
        add({ type: 'talk', age: 'ad', ageLabel: 'Adults', title: t.title, sub: ring, keys: t.keys, lead: t.quick, quick: t.quick,
          body: [t.feel].concat((t.self && t.self.first) || [], (t.helper && t.helper.help) || []).join(' '),
          href: '/oak/#life=' + encodeURIComponent(t.id), from: 'Oak', id: t.id, app: 'oak' });
      });
      // Sequoia guides (GWG BLD 734), the same shape as Oak's
      var sq = window.SEQUOIA_GUIDES;
      if (sq) sq.topics.forEach(function (t) {
        var ring = (sq.rings.find(function (r) { return r.key === t.ring; }) || {}).name || '';
        add({ type: 'talk', age: 'ad', ageLabel: 'Older adults', title: t.title, sub: ring, keys: t.keys, lead: t.quick, quick: t.quick,
          body: [t.feel].concat((t.self && t.self.first) || [], (t.helper && t.helper.help) || []).join(' '),
          href: '/sequoia/#life=' + encodeURIComponent(t.id), from: 'Sequoia', id: t.id, app: 'sequoia' });
      });
      // Willow guides (Willow Build Session 2)
      var sw = window.WILLOW_GUIDES;
      if (sw) sw.guides.forEach(function (t) {
        var ring = (sw.rings.find(function (r) { return r[0] === t.ring; }) || [])[1] || '';
        var part = function (k) { var x = t.parts.find(function (p) { return p[0] === k; }); return x ? x[1] : ''; };
        var quick = [part('what') || part('know'), part('helps')].filter(Boolean);
        add({ type: 'talk', age: 'ad', ageLabel: 'Hospice', title: t.title.replace(/^"|"$/g, ''), sub: ring, keys: t.keys, lead: quick, quick: quick,
          body: t.parts.map(function (p) { return p[1]; }).join(' '), href: '/willow/#guide=' + encodeURIComponent(t.id), from: 'Willow', id: t.id, app: 'willow' });
      });

      var gl = window.GGSGroveLibrary || window.GroveLibrary;
      if (gl) gl.items.forEach(function (it) {
        var how = it.how || [], part = (GPART && GPART[it.part]) || {};
        add({ type: 'practice', title: it.name, sub: (part.name ? part.name + ' (' + part.sub + ')' : ''), keys: it.kidName || '', lead: [it.text],
          text: it.text, why: how[0], steps: how[1] ? String(how[1]).split('|') : [], hard: how[2],
          ages: it.ages, key: it.key, part: it.part, body: how.slice(0, 3).join(' '), href: '/grove/#library=' + encodeURIComponent(it.name) });
      });

      BOOKS.forEach(function (b) {
        add({ type: 'book', title: b.title, sub: b.author + (b.sec ? '. ' + b.sec : ''), keys: b.tags + ' ' + b.author + ' ' + b.sec + ' ' + b.parts + ' book books reading library', lead: [b.summary], href: '/library/#book=' + b.no });
      });

      return fetch('/stories.html').then(function (r) { return r.ok ? r.text() : ''; }).then(function (html) {
        if (!html) return;
        var doc = new DOMParser().parseFromString(html, 'text/html');
        doc.querySelectorAll('article.story, article.preview').forEach(function (a) {
          var h = a.querySelector('h3'); if (!h) return;
          var sub = a.querySelector('.story-sub'), quote = a.querySelector('.story-quote'), pv = a.querySelector('.preview-body');
          var page = a.querySelector('.card-actions a.btn-primary[href$=".html"]');
          var href = page ? '/' + page.getAttribute('href') : (a.id ? '/stories.html#' + a.id : '/stories.html');
          add({ type: 'story', title: h.textContent.trim(), sub: sub ? sub.textContent.trim() : (quote ? quote.textContent.trim() : ''),
            keys: a.getAttribute('data-themes') || '', lead: [quote ? quote.textContent : ''], body: pv ? pv.textContent : '', href: href });
        });
      }).catch(function () {});
    }).then(function () { WAIT.forEach(function (el) { if (/ready/.test(el.textContent)) el.textContent = ''; }); });
    return loading;
  }

  /* ---------- matching ---------- */
  function parse(q) {
    var n = ' ' + String(q).toLowerCase().replace(/[\u2018\u2019]/g, "'") + ' ';
    PHRASES.forEach(function (p) { n = n.replace(p[0], ' ' + p[1] + ' '); });
    var ageHint = null;
    AGE_HINT.forEach(function (a) { if (!ageHint && a[0].test(n)) ageHint = a[1]; });
    var words = n.replace(/'/g, '').replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(function (w) { return w && STOP.indexOf(' ' + w + ' ') < 0; });
    return { raw: n, ageHint: ageHint, words: words.map(function (w) {
      var alts = [stem(w)]; if (SYN[w]) SYN[w].split(' ').forEach(function (s) { if (alts.indexOf(s) < 0) alts.push(s); });
      return alts;
    }) };
  }
  function own0(i) { return i === 0; }
  function scoreWord(it, alts) {
    var best = 0;
    alts.forEach(function (a, i) {
      if (!own0(i) && a.length < 3) return;
      var own = i === 0, pre = a.length <= 3 ? ' ' + a + ' ' : ' ' + a;   // short words match whole words only; longer ones match word starts, so "art" won't match "heart"
      var s = it.nTitle.indexOf(pre) >= 0 ? 6 : it.nKeys.indexOf(pre) >= 0 ? 4 : it.nLead.indexOf(pre) >= 0 ? 3 : it.nBody.indexOf(pre) >= 0 ? 1 : 0;
      if (s && !own) s -= 0.5;           // an everyday-word match counts a little less than the word itself
      if (s > best) best = s;
    });
    return best;
  }
  var TYPE_ORDER = { talk: 0, practice: 1, book: 2, page: 3, tool: 4, story: 5 };
  function search(q) {
    var p = parse(q);
    if (!p.words.length) return { p: p, groups: [] };
    function run(all) {
      var hits = [];
      ITEMS.forEach(function (it) {
        var total = 0, matched = 0;
        p.words.forEach(function (alts) { var s = scoreWord(it, alts); if (s) { matched++; total += s; } });
        if (all ? matched === p.words.length : matched > 0) {
          if (p.ageHint && it.age === p.ageHint) total += 2;
          else if (p.ageHint === 'ya' && it.age === 'ad') total += 1;
          if ((it.type === 'tool' || it.type === 'page') && it.nTitle.trim() === p.words.map(function (a) { return a[0]; }).join(' ')) total += 10;
          hits.push([it, total + matched * 2]);
        }
      });
      return hits;
    }
    var hits = run(true), partial = false;
    if (!hits.length && p.words.length > 1) { hits = run(false); partial = hits.length > 0; }
    var by = {};
    hits.forEach(function (h) { (by[h[0].type] = by[h[0].type] || []).push(h); });
    var groups = Object.keys(by).map(function (k) {
      var list = by[k].sort(function (a, b) { return b[1] - a[1]; });
      return { type: k, items: list.map(function (h) { return h[0]; }), top: list[0][1] };
    }).sort(function (a, b) {
      // Guides lead unless another kind is clearly the better answer (like a tool's name)
      var svc = /\b(wedding|weddings|marriage|married|premarital|elope|elopement|vow|vows|officiant|ceremony|funeral|funerals|memorial|blessing|cost|costs|price|prices|rate|rates|fee|fees|book|hire|service|services|organization|organizations|license|licenses|licensing|pricing)\b/.test(p.raw);
      var bonus = function (g) { return g.type === 'talk' ? (svc ? 0 : 3) : g.type === 'book' ? -2 : (g.type === 'page' && svc ? 8 : 0); };
      var ta = a.top + bonus(a), tb = b.top + bonus(b);
      return tb - ta || TYPE_ORDER[a.type] - TYPE_ORDER[b.type];
    });
    return { p: p, groups: groups, partial: partial };
  }

  /* ---------- kid-safe results (Maple, Aspen, and Pine) ----------
     Inside Maple, Aspen, and Pine, "More from Grow With Grounded" skips anything
     written only for adults. Pine keeps teen and teen-only practices.
     Add a word here if something slips through. */
  var ADULT = /\b(affair|infidel|cheat\w*|sex|sexual\w*|intimacy|porn\w*|alcohol\w*|drinking|drunk|drugs?|addict\w*|overdos\w*|gambl\w*|abortion|suicid\w*|assisted|euthanas\w*|maid|erotic|hookup)\b/;
  function adultOnly(it) {
    var hay = (it.title + ' ' + (it.keys || '') + ' ' + (it.sub || '')).toLowerCase();
    if (it.type === 'talk') return (it.app === 'birch' || it.app === 'oak' || it.app === 'sequoia' || it.app === 'willow') && ADULT.test(hay);
    if (it.type === 'story' || it.type === 'book') return ADULT.test(hay);
    return false;
  }
  function kidOk(it, kid) {
    if (!kid) return true;
    if (adultOnly(it)) return false;
    if (it.type === 'practice' && kid === 'maple' && (it.ages === 'teen' || it.ages === 'teenOnly')) return false;
    if (it.type === 'practice' && it.ages === 'sequoia') return false;
    // Pine's guides are written for high schoolers and their grown-ups: kept out of Maple's "More", and in
    // Aspen's only when they hold no adult-only words
    // Birch's guides (young adults) follow the same rule: never in Maple's "More", and in Aspen's and Pine's
    // only when they hold no adult-only words (adultOnly above)
    if (it.type === 'talk' && (it.app === 'pine' || it.app === 'birch') && (kid === 'maple' || (kid === 'aspen' && ADULT.test((it.title + ' ' + (it.keys || '') + ' ' + (it.sub || '')).toLowerCase())))) return false;
    return true;
  }

  /* ---------- showing results ---------- */
  var NAMES = { talk: 'When Life Changes', practice: 'Practices', book: 'Books', page: 'Pages', tool: 'Tools', story: 'Stories' };
  var AGES = { teen: 'Teens and up', teenOnly: 'Teens only' };
  var APPNAME = { maple: 'Maple', aspen: 'Aspen', pine: 'Pine', birch: 'Birch', oak: 'Oak', sequoia: 'Sequoia', willow: 'Willow', grove: 'The Grove' };
  var SHOW = 5, uid = 0;

  function crisisHTML(raw) {
    var c = CRISIS.test(raw), a = ABUSE.test(raw);
    if (!c && !a) return '';
    return '<div class="ss-crisis" role="note"><b>If someone is in danger right now, call 911.</b>' +
      '<p>For thoughts of suicide or any mental health crisis, call or text <a href="tel:988">988</a>, any time, day or night.</p>' +
      (a ? '<p>For child abuse: Childhelp, <a href="tel:18004224453">1-800-422-4453</a>. For abuse at home: the National Domestic Violence Hotline, <a href="tel:18007997233">1-800-799-7233</a>.</p>' : '') +
      '</div>';
  }
  function rowHTML(it, opts) {
    var id = 'ss-x' + (++uid);
    var local = opts && opts.here && it.type === 'talk' && it.app === opts.here && opts.open;
    if (it.type === 'tool' || it.type === 'story' || it.type === 'page' || it.type === 'book') {
      var inner = '<span class="ss-title">' + esc(it.title) + '</span><span class="ss-sub">' + esc(it.sub) + '</span>';
      return '<li class="ss-item">' + (it.href ? '<a class="ss-row" href="' + esc(it.href) + '">' + inner + '</a>' : '<div class="ss-row ss-soon">' + inner + '</div>') + '</li>';
    }
    var tag = it.type === 'talk' ? (local ? '' : it.ageLabel) : (AGES[it.ages] || '');
    var head = '<button type="button" class="ss-row" aria-expanded="false" aria-controls="' + id + '">' +
      '<span class="ss-title">' + esc(it.title) + (tag ? ' <span class="ss-tag ss-' + (it.age || it.ages) + '">' + esc(tag) + '</span>' : '') + '</span>' +
      '<span class="ss-sub">' + esc(it.type === 'talk' ? it.sub : it.text) + '</span></button>';
    var card;
    if (it.type === 'talk') {
      card = '<p class="ss-card-h">Quick Card</p>' + list(it.quick) +
        (local ? '<button type="button" class="btn btn-primary ss-go" data-open="' + esc(it.id) + '">' + esc(opts.openLabel || 'Talking It Through') + '</button>'
               : '<a class="btn btn-primary ss-go" href="' + esc(it.href) + '">Full guide in ' + esc(it.from) + '</a>');
    } else {
      card = (it.why ? '<p>' + esc(it.why) + '</p>' : '') +
        (it.steps.length ? '<p class="ss-card-h">How to do it</p><ol>' + it.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>' : '<p>' + esc(it.text) + '</p>') +
        (it.hard ? '<p class="ss-hard">' + esc(it.hard) + '</p>' : '') +
        '<a class="btn btn-secondary ss-go" href="' + esc(it.href) + '">Find it in The Grove</a>';
    }
    return '<li class="ss-item">' + head + '<div class="ss-card" id="' + id + '" hidden>' + card + '</div></li>';
  }
  function groupHTML(type, items, label, state, opts) {
    var all = state[type], shown = all ? items : items.slice(0, SHOW);
    return '<div class="ss-group" role="group" aria-label="' + esc(label) + '"><h4>' + esc(label) + ' <span>' + items.length + '</span></h4><ul class="ss-list">' +
      shown.map(function (it) { return rowHTML(it, opts); }).join('') + '</ul>' +
      (items.length > SHOW ? '<button type="button" class="ss-more" data-type="' + type + '">' + (all ? 'Show fewer' : 'Show all ' + items.length) + '</button>' : '') + '</div>';
  }

  /* One function draws results for every box.
     opts.here       the app this box lives in (maple, aspen, pine, birch, oak, sequoia, willow, grove)
     opts.localType  'talk' (a When Life Changes tab) or 'practice' (a practice library)
     opts.localHTML  for practice libraries: draws the app's own list (with its Add buttons)
     opts.localKeep  filter for the app's own items (age, part)
     opts.kid        'maple', 'aspen', or 'pine' keeps adult-only results out of "More"
     opts.open       opens one of this app's own guides inside the app */
  function draw(panel, q, opts, statusEl) {
    opts = opts || {}; uid = 0;
    var state = panel._ggOpen || (panel._ggOpen = {});
    var r = search(q);
    if (!r.p.words.length && !r.p.raw.trim()) { panel.innerHTML = ''; if (statusEl) statusEl.textContent = ''; return 0; }
    var here = opts.here, lt = opts.localType, local = [], groups = [];
    r.groups.forEach(function (g) {
      var rest = [];
      g.items.forEach(function (it) {
        var mine = here && lt === g.type && (lt === 'practice' ? (!opts.localKeep || opts.localKeep(it)) : it.app === here);
        if (mine) local.push(it);
        else if (kidOk(it, opts.kid)) rest.push(it);
      });
      if (rest.length) groups.push({ type: g.type, items: rest });
    });
    var n = local.length + groups.reduce(function (s, g) { return s + g.items.length; }, 0);
    var html = crisisHTML(r.p.raw);
    if (r.partial && n) html += '<p class="ss-note">Nothing matched every word, so here is what matched some of them.</p>';
    if (here && local.length) {
      var lab = opts.localLabel || 'In ' + (APPNAME[here] || here);
      html += opts.localHTML ? '<div class="ss-group ss-local"><h4>' + esc(lab) + ' <span>' + local.length + '</span></h4>' + opts.localHTML(local) + '</div>'
                             : groupHTML('local', local, lab, state, opts);
    } else if (here) {
      html += '<p class="ss-note">' + (opts.localNone ? esc(opts.localNone) : 'Nothing in ' + esc(APPNAME[here] || here)) + ' for &ldquo;' + esc(q.trim()) + '.&rdquo;' + (groups.length ? ' Here is what the rest of Grow With Grounded has.' : '') + '</p>';
    }
    if (groups.length) {
      if (here) html += '<h3 class="ss-more-h">More from Grow With Grounded</h3>';
      groups.forEach(function (g) { html += groupHTML(g.type, g.items, NAMES[g.type], state, opts); });
    }
    if (!n) {
      html += '<div class="ss-empty"><p><b>Nothing matches &ldquo;' + esc(q.trim()) + '.&rdquo;</b> Try one simple word, like grief, bullying, sleep, or worry. Or browse When Life Changes: ' +
        '<a class="text-link" href="/maple/#life">for kids, K to 5</a>, <a class="text-link" href="/aspen/#life">for grades 6 to 8</a>, <a class="text-link" href="/pine/#life">for grades 9 to 12</a>, <a class="text-link" href="/birch/#life">for ages 18 to 26</a>, <a class="text-link" href="/oak/#life">for adults</a>, <a class="text-link" href="/sequoia/#life">for older adults</a>, or <a class="text-link" href="/willow/#guides">at the end of life</a>.</p></div>';
    }
    panel.innerHTML = html;
    if (statusEl) statusEl.textContent = n ? n + (n === 1 ? ' result' : ' results') : 'No results';
    return n;
  }
  function wire(panel, again) {
    if (panel._ggWired) return; panel._ggWired = true;
    panel.addEventListener('click', function (e) {
      var more = e.target.closest('.ss-more');
      if (more && panel.contains(more)) { var t = more.getAttribute('data-type'); panel._ggOpen[t] = !panel._ggOpen[t]; again(); return; }
      var op = e.target.closest('[data-open]');
      if (op && panel._ggOpts && panel._ggOpts.open) { panel._ggOpts.open(op.getAttribute('data-open')); return; }
      var row = e.target.closest('button.ss-row');
      if (row && panel.contains(row)) {
        var card = document.getElementById(row.getAttribute('aria-controls'));
        var open = row.getAttribute('aria-expanded') !== 'true';
        row.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) card.removeAttribute('hidden'); else card.setAttribute('hidden', '');
      }
    });
  }

  /* ---------- the header and Tools page box ---------- */
  function mountSite() {
    var box = document.getElementById('site-search');
    if (!box || box._ggMounted) return; box._ggMounted = true;
    var input = document.getElementById('ss-q'), out = document.getElementById('ss-results'), status = document.getElementById('ss-status');
    WAIT.push(status);
    var timer = null;
    function render() { var q = input.value; out._ggOpts = {}; draw(out, q, {}, status) ; box.classList.toggle('has-results', !!q.trim()); }
    function go() { clearTimeout(timer); timer = setTimeout(function () { build().then(function () { out._ggOpen = {}; render(); }); }, 140); }
    wire(out, render);
    input.addEventListener('focus', function () { build(); }, { once: true });
    input.addEventListener('input', go);
    box.addEventListener('submit', function (e) { e.preventDefault(); go(); input.blur(); });
    box.addEventListener('click', function (e) { var chip = e.target.closest('[data-try]'); if (chip) { input.value = chip.getAttribute('data-try'); go(); } });
    // any page?q=vaping opens search with that query (nav.js opens the panel)
    var start = new URLSearchParams(location.search).get('q');
    if (start) { input.value = start; go(); }
  }

  /* ---------- a search box inside an app ----------
     GGSearch.attach(input, opts): call it on every input event (nav.js's GGFind does).
     While there are words in the box, the app's own list hides (opts.hide, CSS
     selectors) and the results show right under opts.after (or the input). */
  var CSS_DONE = false;
  function css() {
    if (CSS_DONE) return; CSS_DONE = true;
    var st = document.createElement('style');
    st.textContent = '' +
      '.ggf{--ggf-line:rgba(128,112,90,.32);--ggf-soft:rgba(128,112,90,.10);margin:14px 0 20px;font-family:Barlow,system-ui,sans-serif;color:inherit;}' +
      '.ggf .ss-status{font-size:15px;opacity:.8;margin:0 0 4px;min-height:1em;}' +
      '.ggf .ss-group{margin-top:16px;}' +
      '.ggf .ss-group h4{font-family:"Barlow Condensed",Barlow,sans-serif;font-weight:700;font-size:15px;letter-spacing:1.5px;text-transform:uppercase;color:var(--ggf-acc,#8B5E1A);margin:0 0 4px;}' +
      '.ggf .ss-group h4 span{opacity:.7;margin-left:4px;}' +
      '.ggf .ss-more-h{font-family:"Cormorant Garamond",Georgia,serif;font-weight:700;font-size:24px;line-height:1.2;margin:26px 0 0;padding-top:16px;border-top:2px solid var(--ggf-line);}' +
      '.ggf .ss-list,.ggf .gt-lib-ul{list-style:none;margin:0;padding:0;border-top:1px solid var(--ggf-line);}' +
      '.ggf .ss-item{border-bottom:1px solid var(--ggf-line);}' +
      '.ggf .ss-row{display:block;width:100%;text-align:left;font:inherit;color:inherit;background:none;border:none;padding:12px 6px;cursor:pointer;text-decoration:none;border-radius:8px;min-height:44px;}' +
      '.ggf .ss-row:hover,.ggf .ss-row:focus-visible{background:var(--ggf-soft);}' +
      '.ggf .ss-soon{opacity:.7;cursor:default;}' +
      '.ggf .ss-title{display:block;font-weight:600;font-size:17.5px;line-height:1.35;}' +
      '.ggf .ss-sub{display:block;font-size:15px;opacity:.8;line-height:1.45;margin-top:2px;}' +
      '.ggf .ss-tag{display:inline-block;font-weight:600;font-size:12.5px;line-height:1;padding:4px 9px;border-radius:999px;background:var(--ggf-soft);vertical-align:2px;}' +
      '.ggf .ss-card{background:var(--ggf-soft);border-radius:10px;padding:12px 16px 16px;margin:0 0 12px;font-size:16.5px;line-height:1.55;}' +
      '.ggf .ss-card ul,.ggf .ss-card ol{padding-left:22px;}' +
      '.ggf .ss-card-h{font-weight:700;font-size:13px;letter-spacing:1.3px;text-transform:uppercase;opacity:.8;margin:4px 0 6px;}' +
      '.ggf .ss-go{display:inline-block;margin-top:8px;font:600 15px/1.2 Barlow,system-ui,sans-serif;padding:11px 20px;border-radius:999px;border:none;background:var(--ggf-acc,#8B5E1A);color:#fff;text-decoration:none;cursor:pointer;}' +
      '.ggf .ss-more{font:inherit;font-size:15px;font-weight:600;color:var(--ggf-acc,#8B5E1A);background:none;border:none;border-bottom:1px solid currentColor;padding:0;margin-top:10px;cursor:pointer;}' +
      '.ggf .ss-note,.ggf .ss-empty{margin-top:10px;font-size:16px;}' +
      '.ggf .ss-crisis{margin-top:6px;padding:14px 18px;border-left:4px solid #9C2F2F;background:rgba(156,47,47,.10);border-radius:0 10px 10px 0;font-size:16.5px;}' +
      '.ggf .ss-crisis p{margin:6px 0 0;}.ggf .ss-crisis a{color:inherit;font-weight:700;}' +
      '.ggf a.text-link{color:inherit;font-weight:600;}';
    document.head.appendChild(st);
  }
  function attach(input, opts) {
    if (!input) return;
    opts = opts || {}; css();
    var panel = input._ggPanel;
    if (!panel || !panel.isConnected) {
      panel = document.createElement('div'); panel.className = 'ggf'; panel.setAttribute('aria-live', 'polite');
      if (opts.accent) panel.style.setProperty('--ggf-acc', opts.accent);
      panel.innerHTML = '<p class="ss-status"></p><div class="ggf-out"></div>';
      var after = (opts.after && document.querySelector(opts.after)) || input;
      after.parentNode.insertBefore(panel, after.nextSibling);
      input._ggPanel = panel;
    }
    var out = panel.querySelector('.ggf-out'), status = panel.querySelector('.ss-status');
    out._ggOpts = opts;
    var hide = function (on) { (opts.hide || []).forEach(function (sel) { document.querySelectorAll(sel).forEach(function (el) { el.hidden = on; }); }); };
    var q = input.value || '';
    if (!q.trim()) { hide(false); panel.hidden = true; out.innerHTML = ''; return Promise.resolve(0); }
    hide(true); panel.hidden = false;
    clearTimeout(input._ggT);
    return new Promise(function (ok) {
      input._ggT = setTimeout(function () {
        if (WAIT.indexOf(status) < 0) WAIT.push(status);
        build().then(function () {
          if (input.value !== q) return ok(0);
          out._ggOpen = {};
          var again = function () { draw(out, input.value, out._ggOpts, status); };
          wire(out, again);
          ok(draw(out, q, opts, status));
        });
      }, 140);
    });
  }

  /* For practice libraries that draw their own list: ranked practice keys for a search. */
  function practices(q) { return build().then(function () { var r = search(q), g = r.groups.filter(function (x) { return x.type === 'practice'; })[0]; return g ? g.items.map(function (it) { return it.key; }) : []; }); }

  window.GGSearch = {
    run: function (q) { return build().then(function () { return search(q); }); },   // for testing
    ready: function () { return build(); },
    mountSite: mountSite, attach: attach, draw: function (panel, q, opts) { css(); panel.classList.add('ggf'); panel._ggOpts = opts; panel._ggQ = q; panel._ggOpen = panel._ggOpen || {}; wire(panel, function () { draw(panel, panel._ggQ, panel._ggOpts); }); return build().then(function () { return draw(panel, q, opts); }); },
    practices: practices, adultOnly: adultOnly
  };
  mountSite();
})();
