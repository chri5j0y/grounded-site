/* =====================================================================
   GROUNDED . SITE-WIDE SEARCH (Tools page)
   One box that finds Hard Talks, Grove practices, tools, and stories.
   Everything runs in the browser. Nothing typed here is sent anywhere.

   Where the words come from (edit them there, not here):
     Hard Talks   maple/guides.js, aspen/guides.js, oak/guides.js
     Practices    grove/data.js and grove/library.js
     Stories      stories.html (read as the page is today)
     Tools        TOOLS below

   EVERYDAY WORDS (below) teaches search the words people really type,
   like "vape" or "blow up", so they find the right guides. Add a line
   any time a search comes up empty that shouldn't.
   ===================================================================== */
(function () {
  var box = document.getElementById('site-search');
  if (!box) return;
  var input = document.getElementById('ss-q');
  var out = document.getElementById('ss-results');
  var status = document.getElementById('ss-status');

  /* ---------- tools ---------- */
  var TOOLS = [
    { title: 'Maple', sub: 'Check-in for kids, grades K to 5, with guides for 60 hard talks', href: '/maple/', keys: 'sprout kids children elementary kindergarten k 5 check-in check in checkup feelings tree critters' }, // GG-RENAME-KEEP: old names still find the tool
    { title: 'Aspen', sub: 'Check-in for grades 6 to 8, with 49 guides for hard talks', href: '/aspen/', keys: 'sapling middle school middle schooler preteen tween teen 6th 7th 8th grade check-in check in checkup' }, // GG-RENAME-KEEP: old names still find the tool
    { title: 'Oak', sub: 'Check-in for adults, from root to fruit, with guides for 60+ hard seasons', href: '/oak/', keys: 'soul tree soultree adult grown up spiritual health wellbeing check-in check in checkup assessment growth plan' }, // GG-RENAME-KEEP: old names still find the tool
    { title: 'The Grove', sub: 'Daily practice for every tree, all ages, and whole families', href: '/grove/', keys: 'practice daily habits family grove garden tending tend routine' },
    { title: 'Grounded Field Guide', sub: 'For chaplains, pastors, teachers, counselors, and parents', href: '/field-guide/', keys: 'professional chaplain pastor teacher counselor school staff organization training guide caregiver practitioner nurse hospice Oak guide grove guide' },
    { title: 'Pine', sub: 'Check-in for high school, grades 9 to 12. Coming soon.', href: '', keys: 'heartwood high school teen teenager 9th 10th 11th 12th grade' }, // GG-RENAME-KEEP: old names still find the tool
    { title: 'Sequoia', sub: 'Check-in for seniors. Coming soon.', href: '', keys: 'elder tree eldertree seniors elders older adults retirement aging grandparents' }, // GG-RENAME-KEEP: old names still find the tool
    { title: 'Willow', sub: 'For hospice. Coming soon.', href: '', keys: 'old growth oldgrowth end of life dying hospice' } // GG-RENAME-KEEP: old names still find the tool
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
    [/calm(ing)? (them |him |her |me )?down/g, 'calmdown'], [/de[\s-]?escalat\w*/g, 'deescalate'], [/picked on|picking on/g, 'pickedon'], [/end of life/g, 'endoflife'],
    [/two homes/g, 'twohomes'], [/screen time/g, 'screentime'], [/can'?t sleep|trouble sleeping/g, 'cantsleep'], [/laid off|lay ?off/g, 'laidoff'],
    [/new school/g, 'newschool'], [/e[\s-]?cig\w*/g, 'ecig'], [/alzheimer'?s/g, 'alzheimers'], [/school shooting/g, 'shooting'], [/self[\s-]?harm\w*|cutting|cut (my|him|her|them)sel\w*/g, 'selfharm'], [/panic attacks?/g, 'panicattack'], [/self[\s-]?esteem/g, 'esteem'],
    [/self[\s-]?injur\w*/g, 'selfinjury'], [/burn(ing|ed|s)? (my|him|her|them)sel\w*/g, 'selfharm'],
    [/learning (disabilit|difference)\w*/g, 'learningdisability'], [/sports ?betting|sports ?bets?/g, 'sportsbetting'], [/loot ?box(es)?/g, 'lootbox'], [/wet(s|ting)? the bed|pee(s|ing)? (in )?the bed|bed ?wetting/g, 'bedwetting'], [/pull[\s-]?ups/g, 'pullups'], [/leaving home|leave home|leaves home/g, 'leavinghome'], [/moving out|moves out|moved out/g, 'movingout'], [/eating disorders?/g, 'eatingdisorder'], [/not eating|won'?t eat|stopped eating|refus\w* to eat/g, 'noteating'], [/car (accident|crash|wreck)s?/g, 'caraccident'], [/head injur\w*/g, 'concussion']
  ];
  var STOP = ' a an and are about as at be but by can do does for from get how i if in into is it its me my of on or our should so some that the their them they this to up we what when where who why will with you your talk talking tell telling help helping deal dealing handle handling kid kids child children son daughter student students teen teens teenager adult adults someone somebody person people keeps keep always cant wont just really ';
  var AGE_HINT = [[/\b(kid|kids|child|children|little|elementary|kindergarten|preschool)\b/, 'k5'], [/\b(teen|teens|teenager|middle|preteen|tween|6th|7th|8th)\b/, 'ms'], [/\b(adult|adults|husband|wife|spouse|partner|mom|dad|parent|coworker|patient|myself)\b/, 'ad']];

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
  function add(o) {   // titles also match with hyphens joined, so "Self-harm" matches "selfharm"
    o.nTitle = norm(o.title + ' ' + String(o.title).replace(/(\w)-(\w)/g, '$1$2')); o.nKeys = norm(o.keys || ''); o.nLead = norm((o.lead || []).join(' ') + ' ' + (o.sub || '')); o.nBody = norm(o.body || '');
    ITEMS.push(o);
  }
  function build() {
    if (loading) return loading;
    ITEMS = [];
    status.textContent = 'Getting the guides ready...';
    loading = Promise.all([
      load('/maple/guides.js'), load('/aspen/guides.js'), load('/oak/guides.js'), load('/grove/data.js'), load('/grove/library.js')
    ]).then(function () {
      TOOLS.forEach(function (t) { add({ type: 'tool', title: t.title, sub: t.sub, keys: t.keys, href: t.href }); });

      var sp = window.MAPLE_GUIDES;
      if (sp) sp.topics.forEach(function (t) {
        var ring = (sp.rings.find(function (r) { return r.key === t.ring; }) || {}).name || '';
        add({ type: 'talk', age: 'k5', ageLabel: 'Kids, K to 5', title: t.title, sub: ring, keys: t.keys, lead: t.quick, quick: t.quick,
          body: [t.k2, t.g35].concat(t.helps || [], t.before || [], t.after || [], t.teach || []).join(' '),
          href: '/maple/#talk=' + encodeURIComponent(t.id), from: 'Maple' });
      });
      var sa = window.ASPEN_GUIDES;
      if (sa) sa.groups.forEach(function (g) { g.topics.forEach(function (t) {
        if (!t.quick) return;
        add({ type: 'talk', age: 'ms', ageLabel: 'Grades 6 to 8', title: t.title, sub: g.name, keys: t.keys || '', lead: t.quick, quick: t.quick,
          body: (t.talk || []).concat(t.say || []).join(' '), href: '/aspen/#talk=' + encodeURIComponent(t.id), from: 'Aspen' });
      }); });
      var so = window.OAK_GUIDES;
      if (so) so.topics.forEach(function (t) {
        var ring = (so.rings.find(function (r) { return r.key === t.ring; }) || {}).name || '';
        add({ type: 'talk', age: 'ad', ageLabel: 'Adults', title: t.title, sub: ring, keys: t.keys, lead: t.quick, quick: t.quick,
          body: [t.feel].concat((t.self && t.self.first) || [], (t.helper && t.helper.help) || []).join(' '),
          href: '/oak/#life=' + encodeURIComponent(t.id), from: 'Oak' });
      });

      var gl = window.GroveLibrary;
      if (gl) gl.items.forEach(function (it) {
        var how = it.how || [], part = (typeof PART !== 'undefined' && PART[it.part]) || {};
        add({ type: 'practice', title: it.name, sub: (part.name ? part.name + ' (' + part.sub + ')' : ''), keys: it.kidName || '', lead: [it.text],
          text: it.text, why: how[0], steps: how[1] ? String(how[1]).split('|') : [], hard: how[2],
          ages: it.ages, body: how.slice(0, 3).join(' '), href: '/grove/#library=' + encodeURIComponent(it.name) });
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
    }).then(function () { status.textContent = ''; });
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
  var TYPE_ORDER = { talk: 0, practice: 1, tool: 2, story: 3 };
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
          if (it.type === 'tool' && it.nTitle.trim() === p.words.map(function (a) { return a[0]; }).join(' ')) total += 10;
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
      // Hard Talks lead unless another kind is clearly the better answer (like a tool's name)
      var ta = a.top + (a.type === 'talk' ? 3 : 0), tb = b.top + (b.type === 'talk' ? 3 : 0);
      return tb - ta || TYPE_ORDER[a.type] - TYPE_ORDER[b.type];
    });
    return { p: p, groups: groups, partial: partial };
  }

  /* ---------- showing results ---------- */
  var NAMES = { talk: 'Hard Talks', practice: 'Practices', tool: 'Tools', story: 'Stories' };
  var AGES = { teen: 'Teens and up', teenOnly: 'Teens only' };
  var SHOW = 5, openAll = {}, uid = 0;

  function crisisHTML(raw) {
    var c = CRISIS.test(raw), a = ABUSE.test(raw);
    if (!c && !a) return '';
    return '<div class="ss-crisis" role="note"><b>If someone is in danger right now, call 911.</b>' +
      '<p>For thoughts of suicide or any mental health crisis, call or text <a href="tel:988">988</a>, any time, day or night.</p>' +
      (a ? '<p>For child abuse: Childhelp, <a href="tel:18004224453">1-800-422-4453</a>. For abuse at home: the National Domestic Violence Hotline, <a href="tel:18007997233">1-800-799-7233</a>.</p>' : '') +
      '</div>';
  }
  function rowHTML(it) {
    var id = 'ss-x' + (++uid);
    if (it.type === 'tool' || it.type === 'story') {
      var inner = '<span class="ss-title">' + esc(it.title) + '</span><span class="ss-sub">' + esc(it.sub) + '</span>';
      return '<li class="ss-item">' + (it.href ? '<a class="ss-row" href="' + esc(it.href) + '">' + inner + '</a>' : '<div class="ss-row ss-soon">' + inner + '</div>') + '</li>';
    }
    var tag = it.type === 'talk' ? it.ageLabel : (AGES[it.ages] || '');
    var head = '<button type="button" class="ss-row" aria-expanded="false" aria-controls="' + id + '">' +
      '<span class="ss-title">' + esc(it.title) + (tag ? ' <span class="ss-tag ss-' + (it.age || it.ages) + '">' + esc(tag) + '</span>' : '') + '</span>' +
      '<span class="ss-sub">' + esc(it.type === 'talk' ? it.sub : it.text) + '</span></button>';
    var card;
    if (it.type === 'talk') {
      card = '<p class="ss-card-h">Quick card</p>' + list(it.quick) +
        '<a class="btn btn-primary ss-go" href="' + esc(it.href) + '">Full guide in ' + esc(it.from) + '</a>';
    } else {
      card = (it.why ? '<p>' + esc(it.why) + '</p>' : '') +
        (it.steps.length ? '<p class="ss-card-h">How to do it</p><ol>' + it.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>' : '<p>' + esc(it.text) + '</p>') +
        (it.hard ? '<p class="ss-hard">' + esc(it.hard) + '</p>' : '') +
        '<a class="btn btn-secondary ss-go" href="' + esc(it.href) + '">Find it in The Grove</a>';
    }
    return '<li class="ss-item">' + head + '<div class="ss-card" id="' + id + '" hidden>' + card + '</div></li>';
  }
  function render(q) {
    uid = 0;
    var r = search(q);
    if (!r.p.words.length && !r.p.raw.trim()) { out.innerHTML = ''; status.textContent = ''; box.classList.remove('has-results'); return; }
    var n = r.groups.reduce(function (s, g) { return s + g.items.length; }, 0);
    var html = crisisHTML(r.p.raw);
    if (!n) {
      html += '<div class="ss-empty"><p><b>Nothing matches &ldquo;' + esc(q.trim()) + '.&rdquo;</b> Try one simple word, like grief, bullying, sleep, or worry. Or browse every Hard Talk: ' +
        '<a class="text-link" href="/maple/#life">for kids, K to 5</a>, <a class="text-link" href="/aspen/#life">for grades 6 to 8</a>, or <a class="text-link" href="/oak/#life">for adults</a>.</p></div>';
    } else {
      if (r.partial) html += '<p class="ss-note">Nothing matched every word, so here is what matched some of them.</p>';
      r.groups.forEach(function (g) {
        var all = openAll[g.type], items = all ? g.items : g.items.slice(0, SHOW);
        html += '<div class="ss-group" role="group" aria-label="' + NAMES[g.type] + '"><h4>' + NAMES[g.type] + ' <span>' + g.items.length + '</span></h4><ul class="ss-list">' +
          items.map(rowHTML).join('') + '</ul>' +
          (g.items.length > SHOW ? '<button type="button" class="ss-more" data-type="' + g.type + '">' + (all ? 'Show fewer' : 'Show all ' + g.items.length + ' ' + NAMES[g.type].toLowerCase()) + '</button>' : '') +
          '</div>';
      });
    }
    out.innerHTML = html;
    box.classList.add('has-results');
    status.textContent = n ? n + (n === 1 ? ' result' : ' results') : 'No results';
  }

  /* ---------- wiring ---------- */
  var timer = null;
  function go() {
    var q = input.value;
    clearTimeout(timer);
    timer = setTimeout(function () { build().then(function () { openAll = {}; render(q); }); }, 140);
  }
  input.addEventListener('focus', function () { build(); }, { once: true });
  input.addEventListener('input', go);
  box.addEventListener('submit', function (e) { e.preventDefault(); go(); input.blur(); });
  box.addEventListener('click', function (e) {
    var chip = e.target.closest('[data-try]');
    if (chip) { input.value = chip.getAttribute('data-try'); go(); return; }
    var more = e.target.closest('.ss-more');
    if (more) { var t = more.getAttribute('data-type'); openAll[t] = !openAll[t]; render(input.value); return; }
    var row = e.target.closest('button.ss-row');
    if (row) {
      var card = document.getElementById(row.getAttribute('aria-controls'));
      var open = row.getAttribute('aria-expanded') !== 'true';
      row.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) card.removeAttribute('hidden'); else card.setAttribute('hidden', '');
    }
  });
  // tools.html?q=vaping opens with that search
  var start = new URLSearchParams(location.search).get('q');
  if (start) { input.value = start; go(); }

  // For testing: window.GGSearch.run('vaping') returns what the box would show.
  window.GGSearch = { run: function (q) { return build().then(function () { return search(q); }); } };
})();
