/* =====================================================================
   HOME . FOR GROWN-UPS (shared/home/grownup.js), GWG BLD 912 Round 2
   GGScreen.guide: the kids' trees' For Grown-ups screen, right here in Home's window, for the kid whose profile is open.
   Maple: The Grown-up Guide (maple/index.html renderGuide 3022 to 3114, '#guide'), with Save or Print This Guide
     (printGuide 3115: maple-grown-up-guide.pdf). Its parts' words come from PARTS (983), carried in shared/home/kidsdata.js.
   Aspen: For grown-ups (aspen/index.html renderGrown 2044 to 2096, '#grown'): the student on this device, Save to a file
     (exportFile 2156, the same locked file), How Aspen works, What you can see, Open Questions and Quiet Help with the
     help list (calmList 1784, shown in place), Why each part matters, Stories, and When Life Changes. The student's card
     opens their grown-up page (renderGStudent 2100): rings, each ring's levels and Worth a conversation notes
     (ringDetail 1990), Faith or Plain, Their Health and Ability, the optional question, this week, and shared reflections.
   Same records as the tree: GGP.data(id,'aspen').student (the optional question, setSens 2146, is the one thing saved here).
   ===================================================================== */
(function () {
  window.GGScreen = window.GGScreen || {};
  var V = 'b912';
  var CSS = '.ggg{line-height:1.55;}.ggg h2{font-family:\'Cormorant Garamond\',Georgia,serif;font-size:30px;line-height:1.15;margin:4px 0 10px;}' +
    '.ggg h3{font-family:\'Cormorant Garamond\',Georgia,serif;font-size:22px;margin:20px 0 6px;}.ggg h4{font-size:17px;margin:14px 0 6px;display:flex;flex-wrap:wrap;align-items:center;gap:6px;}' +
    '.ggg p{margin:0 0 8px;}.ggg ul{margin:0 0 8px;padding-left:20px;}.ggg li{margin:3px 0;}.ggg a{color:var(--gold);overflow-wrap:anywhere;}' +
    '.ggg-band{display:block;width:100%;height:130px;object-fit:cover;border-radius:18px;margin:0 0 12px;}' +
    '.ggg .lead,.ggg .lede{font-size:17.5px;}.ggg .muted{color:var(--ink-soft);}.ggg .small{font-size:14px;}' +
    '.ggg-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:8px 0 12px;}' +
    '.ggg-toc{display:flex;flex-wrap:wrap;gap:6px 14px;margin:6px 0 14px;}.ggg-toc button{background:none;border:0;padding:4px 0;color:var(--gold);font:inherit;font-weight:600;cursor:pointer;text-align:left;}' +
    '.ggg .guide-part{padding:12px 14px;border-radius:16px;background:var(--card-2);border:1px solid var(--line);margin:0 0 12px;}' +
    '.ggg-dot{display:inline-block;width:14px;height:14px;border-radius:50%;flex:0 0 auto;}' +
    '.ggg .why{color:var(--ink-soft);}.ggg .sel{font-size:14px;color:var(--ink-soft);}' +
    '.ggg .made-by{margin-top:22px;padding-top:14px;border-top:1px solid var(--line);text-align:center;}.ggg .serif{font-family:\'Cormorant Garamond\',Georgia,serif;font-size:22px;}' +
    '.ggg .panel{padding:14px 16px;border-radius:18px;background:var(--card);border:1px solid var(--line);margin:0 0 12px;min-width:0;}.ggg .panel h3{margin-top:0;}' +
    '.ggg-person{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:10px 12px;border-radius:16px;border:1px solid var(--line);background:var(--card-2);color:inherit;font:inherit;cursor:pointer;margin:0 0 10px;}' +
    '.ggg-person img{width:56px;height:56px;border-radius:14px;object-fit:cover;flex:0 0 auto;}.ggg-person span{display:block;}' +
    '.ggg .flagged,.ggg .marker{display:inline-block;font-size:12.5px;font-weight:700;color:var(--gold-deep);background:var(--today-s);border-radius:999px;padding:1px 8px;margin-left:4px;}' +
    '.ggg-calm ul{list-style:none;padding:0;}.ggg-calm li{margin:0 0 10px;}.ggg-calm li b{display:block;}' +
    '.ggg .as-life-lines small{display:block;color:var(--ink-soft);}' +
    '.ggg-me{display:flex;align-items:center;gap:12px;margin:0 0 10px;}.ggg-me img{width:64px;height:64px;border-radius:16px;object-fit:cover;}' +
    '.ggg .rings-wrap{display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);gap:16px;align-items:start;}' +
    '@media (max-width:720px){.ggg .rings-wrap{grid-template-columns:minmax(0,1fr);}}' +
    '.ggg .rings-svg{width:100%;max-width:300px;height:auto;display:block;margin:0 auto;}' +
    '.ggg .ringlist{display:flex;flex-direction:column;gap:6px;margin-top:8px;}.ggg .ringbtn{text-align:left;padding:8px 12px;border-radius:12px;border:1px solid var(--line);background:var(--card-2);color:inherit;font:inherit;cursor:pointer;}' +
    '.ggg .ringbtn[aria-pressed="true"]{border-color:var(--gold);box-shadow:inset 0 0 0 1px var(--gold);}' +
    '.ggg .status-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,150px),1fr));gap:8px;margin:8px 0;}' +
    '.ggg .status{padding:8px 10px;border-radius:12px;background:var(--card-2);min-width:0;}.ggg .status b{margin-right:6px;}.ggg .status .tend{display:block;margin-top:4px;}' +
    '.ggg .s{font-weight:700;}.ggg .s-up{color:var(--strong);}.ggg .s-steady{color:var(--steady);}.ggg .s-care{color:var(--leaves);}' +
    '.ggg .note{padding:12px 14px;border-radius:14px;background:var(--today-s);margin:10px 0;}.ggg .note b{display:block;margin-bottom:4px;}' +
    '.ggg details.panel summary{cursor:pointer;}.ggg .answers-list{list-style:none;padding:0;}.ggg .answers-list li{padding:6px 0;border-bottom:1px solid var(--line);}' +
    '.ggg .answers-list li span{display:block;}.ggg .answers-list li.hard{font-weight:700;}' +
    '.ggg .gt-radio{display:flex;gap:10px;align-items:flex-start;margin:6px 0;}.ggg .gt-radio b{display:block;}' +
    '.ggg .switch-row{display:flex;gap:10px;align-items:flex-start;margin-top:8px;}';

  /* ======================= Maple: The Grown-up Guide ======================= */
  function mapleGuide(ctx, plain) {
    var K = GGKidKit, esc = K.esc, D = window.GGKidData.maple, GW = window.GGParts && GGParts.label ? GGParts : null;
    var isPlain = function () { return plain; };
    // mpLabel and mpMeaning (maple/index.html 1440 and 1441).
    var label = function (p) { return GW ? GW.label(p.key, { plain: isPlain }) : p.key; };
    var meaning = function (p) {
      if (GW ? !GW.tend(p.key) : ['trunk', 'fruit'].indexOf(p.key) >= 0) return 'Grows from your tending';
      if (p.key === 'roots' && plain) return 'Calm, values, wonder, and gratitude';
      var m = GW ? GW.meaning(p.key) : ''; return m.charAt(0).toUpperCase() + m.slice(1);
    };
    // In Plain, a part's lines use its Plain words where the tree wrote them (partW 1462).
    var w = function (p, k, fb) { return plain && p.plain && p.plain[k] ? p.plain[k] : fb; };
    var toc = [['g-what', 'What Maple is'], ['g-how', 'How it works'], ['g-talk', 'Talking about answers'], ['g-parts', 'Tend Four, Grow Two'], ['g-parents', 'For parents and guardians'], ['g-teachers', 'For teachers'], ['g-changes', 'When Life Changes'], ['g-reach', 'When to reach out'], ['g-sources', 'Sources']];
    return '<div class="ggg guide">' +
      '<h2 class="grown">The Grown-up Guide</h2>' +
      '<p class="lead">Maple&trade; is a gentle check-in for kids in grades K to 5. It helps children notice how they are growing inside and gives them small, doable ways to grow stronger. This guide is for parents, guardians, and teachers.</p>' +
      '<div class="ggg-row no-print" style="margin-top:0"><button type="button" class="hm-btn sm line hm-pill" data-ggg="print">Save or Print This Guide</button></div>' +
      '<nav class="ggg-toc guide-toc no-print" aria-label="Guide sections">' + toc.map(function (x) { return '<button type="button" data-ggg-jump="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</nav>' +

      '<h3 class="grown" id="ggg-g-what">What Maple is</h3>' +
      '<p>Maple builds spiritual and emotional resilience: a child\'s sense of being loved, knowing who they are, handling big feelings, belonging, caring for their body, and hope. It isn\'t a test, a screening, or a diagnosis, and every answer is welcome. Grown-ups see a simple level for each part (Strong, Steady, or Growing Edge) so they know where to lean in. Kids see their tree and its weather.</p>' +
      '<p>Maple uses the same tree as every Grounded tree, from Aspen for middle schoolers to Oak for adults and Sequoia for 60 and up, in words kids understand: tend four parts (Spirit, or in Plain wording what grounds you; Mind; Body; and Relationships), and meaning and hope grow from that tending. The Grounded Way works when you tend all four parts. Rain is part of how every tree grows, and the check-in quietly teaches that hard days are part of growing too.</p>' +
      '<p>Inside Maple: the check-in, a growth plan of small practices to tend each day, When Life Changes guides with two short videos each, Learn videos with tabs and search on top, Read Aloud, and Save or Print. In Settings, Their Health and Ability lets you choose guides and practices that fit a disability, illness, or difference, and Someone in Our Family Drinks or Uses opens gentle guides for that season too, all kept private on this device. A child\'s profile also opens in The Grounded Way, Grounded\'s private app for whole person living, with its own Today and My Tree, and the Get Grounded leaf at the top of the page opens Get Grounded Now, with calm breathing and practices made for kids.</p>' +

      '<h3 class="grown" id="ggg-g-how">How a check-in works</h3><ul>' +
      '<li>Pick <b>On my own</b> or <b>With a grown-up</b>, then the child\'s grade. Kindergarten and each grade from 1 to 5 has its own questions, written for that age. Kindergarten through grade 2 starts with read aloud on. With a grown-up adds a short tip under every question.</li>' +
      '<li>For each part of the tree, the child learns what that part does for a tree and for them, then answers four short questions: Yes, a lot; Sometimes; Not really; or I don\'t know. A calm recorded voice guides them one question at a time, and Read It All shows every question on one page. They can skip any part. Their answers decide the weather for that part of the tree.</li>' +
      '<li>Every question is open and curious, and every answer is welcome. A quiet line under the questions reminds the child to tell a trusted grown-up right away whenever they feel unsafe, with 988 and 911 for an emergency.</li>' +
      '<li>Their tree grows one piece at a time. At the end they see the whole tree with a kind word for each part.</li>' +
      '<li>Then their tree is ready to tend right here in Maple: a few small things a day for each of the four parts they tend, done together. Their tree also stands in The Grove beside the rest of the family\'s trees.</li>' +
      '<li>Every check-in adds a ring to their tree here. Maple invites a new check-in every four weeks, and every check-in stays on their tree page, so you can see how they have grown over time.</li></ul>' +
      '<p>A check-in takes about 10 to 15 minutes, and daily tending in Maple takes just a few minutes. Everything saves locked and private.</p>' +

      '<h3 class="grown" id="ggg-g-talk">Talking about answers</h3><p>The most important part of Maple happens after the screen. A few things help:</p><ul>' +
      '<li><b>Be curious, not worried.</b> "Tell me about that rain cloud" opens more doors than "What\'s wrong?"</li>' +
      '<li><b>Listen more than you fix.</b> Kids often just need to be heard.</li>' +
      '<li><b>Take their weather seriously,</b> even if it seems small to you.</li>' +
      '<li><b>Share a little of your own weather.</b> It shows them everyone has rainy days.</li>' +
      '<li><b>Keep it light.</b> Maple works best when it feels like a gift.</li></ul>' +

      '<h3 class="grown" id="ggg-g-parts">Tend Four, Grow Two</h3>' +
      D.parts.map(function (p) {
        return '<div class="guide-part"><h4><span class="ggg-dot" style="background:' + esc(p.hex) + '" aria-hidden="true"></span>' + esc(label(p)) + ' <span style="font-size:15px;font-weight:500;color:var(--ink-soft)">(' + esc(meaning(p)) + ')</span></h4>' +
          '<p>' + esc(w(p, 'you', p.you)) + '</p><p style="margin-bottom:2px"><b>Conversation starters</b></p><ul>' + (p.guide.starters || []).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' +
          '<p class="why"><b>Why this works:</b> ' + esc(w(p, 'why', p.guide.why)) + '</p><p><b>If it\'s rainy:</b> ' + esc(w(p, 'rainy', p.guide.rainy)) + '</p><p class="sel">' + esc(p.guide.sel) + '</p></div>';
      }).join('') +

      '<h3 class="grown" id="ggg-g-parents">For parents and guardians</h3><ul>' +
      '<li><b>Pick an unhurried moment,</b> like a quiet afternoon, before bed, or a slow weekend morning.</li>' +
      '<li><b>Stay close,</b> even if your child picks On my own. Sit nearby and be ready to talk.</li>' +
      '<li><b>Weave in your family\'s faith.</b> Roots, what grounds you, leaves room for every family to fill it in with their own tradition: prayer, scripture, worship, blessings, or quiet. Share what holds you.</li>' +
      '<li><b>Choose Faith or Plain wording.</b> Faith wording names God, prayer, and faith as one door among several. Plain wording asks the same things without religious words, and scores are the same either way. You choose it when you set up your child\'s tree, and you can change it any time in Settings.</li>' +
      '<li><b>Make the growth plan a family project.</b> Check in on their tree together each day, cheer when a tree friend comes to visit, and celebrate each new level and milestone. A tree that misses a few days only rests in a light morning mist, and one practice brings the light back.</li>' +
      '<li><b>Each child gets their own check-in.</b> Brothers and sisters save separately by first name.</li>' +
      '<li><b>Grandparents, foster parents, and other caregivers</b> can use Maple just the same.</li></ul>' +

      '<h3 class="grown" id="ggg-g-teachers">For teachers</h3><ul>' +
      '<li><b>One child at a time.</b> Maple is made for one child on a shared device. Choose With a grown-up to see a short tip on each page.</li>' +
      '<li><b>My Kids.</b> Each child\'s tree saves on the device by first name, with every check-in, so you can see growth over time. When a child finishes a check-in, tap Start with the next child to clear the screen.</li>' +
      '<li><b>Save a file now and then.</b> Clearing the browser or switching devices erases saved check-ins. Use Save everyone to a file under My Kids and keep it somewhere safe. Each file is locked with a passcode you choose.</li>' +
      '<li><b>It fits the SEL skills you already teach.</b> Each part connects to CASEL\'s five competencies, noted under Tend Four, Grow Two.</li>' +
      '<li><b>If a child\'s answers worry you,</b> follow your school\'s usual process, like talking with your school counselor, and let the family know.</li>' +
      '<li><b>About faith.</b> Roots, what grounds you, leaves room for children of all faith traditions and everything in-between to answer from their own family\'s tradition. Plain wording asks the same things without religious words, and a Maple Guide can set Plain for a whole school or group. Check with your school about how it fits your classroom.</li></ul>' +

      '<h3 class="grown" id="ggg-g-changes">When Life Changes</h3>' +
      '<p>Big changes shake a child\'s whole tree: loss, illness, divorce, moves, scary news, and more. Maple has a full section called <b>When Life Changes</b> with 73 guides for parents, guardians, and teachers, in group cards with tabs and search on top, including Health and Ability. Each has a quick reference, a full <b>Talking It Through</b> guide with what to say, questions kids ask, and when to get more help, and two short videos: For You, for the child, and For the Grown-up.</p>' +
      '<p class="no-print"><button type="button" class="hm-btn sm line hm-pill" data-ggg="life">Open When Life Changes</button></p>' +

      '<h3 class="grown" id="ggg-g-reach">When to reach out</h3>' +
      '<p>Most rainy days pass with time, closeness, and patience. Reach out to someone you trust, like a pastor, teacher, school counselor, or your child\'s doctor, if:</p><ul>' +
      '<li>rainy weather lasts more than a couple of weeks,</li><li>a child stops enjoying things they used to love,</li><li>sleep, eating, or schoolwork changes a lot, or</li><li>a child says someone is hurting them or being mean to them.</li></ul>' +
      '<p><b>If a child ever talks about hurting themselves, take it seriously and stay close.</b> Call their doctor right away, or call or text 988 any time. If someone is in danger right now, call 911.</p>' +

      '<h3 class="grown" id="ggg-g-sources">Sources</h3><p>Maple\'s activities come from research on how children grow resilient. For anyone who wants to read more:</p><ul class="sources">' +
      '<li>CASEL. The CASEL 5: self-awareness, self-management, social awareness, relationship skills, and responsible decision-making. casel.org</li>' +
      '<li>Lieberman, M. D., et al. (2007). Putting feelings into words: Affect labeling disrupts amygdala activity in response to affective stimuli. <i>Psychological Science.</i></li>' +
      '<li>Siegel, D. J., and Bryson, T. P. (2011). <i>The Whole-Brain Child.</i></li>' +
      '<li>Froh, J. J., Kashdan, T. B., Ozimkowski, K. M., and Miller, N. (2009). Who benefits the most from a gratitude intervention in children and adolescents? <i>The Journal of Positive Psychology.</i></li>' +
      '<li>Froh, J. J., et al. (2014). Nice thinking! An educational intervention that teaches children to think gratefully. <i>School Psychology Review.</i></li>' +
      '<li>Layous, K., et al. (2012). Kindness counts: Prompting prosocial behavior in preadolescents boosts peer acceptance and well-being. <i>PLoS ONE.</i></li>' +
      '<li>Park, N., and Peterson, C. (2008). Positive psychology and character strengths: Its application for strength-based school counseling. <i>Professional School Counseling.</i></li>' +
      '<li>Snyder, C. R. (2002). Hope theory: Rainbows in the mind. <i>Psychological Inquiry.</i></li>' +
      '<li>Miller, L. (2015). <i>The Spiritual Child.</i> St. Martin\'s Press.</li>' +
      '<li>Friel, C. P., et al. (2020). U.S. children meeting physical activity, screen time, and sleep guidelines. <i>American Journal of Preventive Medicine.</i></li></ul>' +

      '<div class="made-by"><p class="serif">Your tree matters too.</p>\n' +
      '<p>Maple grew out of <a class="text-link" href="https://growwithgrounded.com/home/?tree=oak">Oak</a>, a check-in for grown-ups from root to fruit. Every age has its own tree, and <a class="text-link" href="https://growwithgrounded.com/grove/">The Grove</a> holds the whole family\'s trees side by side.</p>\n' +
      '<p><a class="text-link" href="https://growwithgrounded.com/stories.html">Grounded Stories</a>, real stories, narrated or to read.</p>\n' +
      '<p>Have a fix or an idea to make Maple better? <a class="text-link" href="mailto:hello@growwithgrounded.com?subject=Maple%20feedback">Send feedback</a></p>\n' +
      '<p style="font-family:\'Barlow Condensed\',sans-serif;font-weight:700;letter-spacing:2px;color:var(--gold);margin-top:16px">MADE BY GROUNDED.</p>\n' +
      '<p style="font-size:14px;color:var(--ink-soft);max-width:560px;margin:10px auto 0">Families and teachers may print this guide for their own children and classrooms. Please don\'t sell, republish, or adapt Grow With Grounded Maple without written permission. Grow With Grounded&trade; is a trademark of ' + K.OWNER + '. &copy; ' + new Date().getFullYear() + ' ' + K.OWNER + '.</p>' +
      '</div></div>';
  }

  /* ======================= Aspen: For grown-ups ======================= */
  // The student as the tree reads them (aspen/index.html load 1213 to 1229, blankStudent 1212): the open kid only.
  function aspStudent(id) {
    var p = (window.GGP && GGP.get && GGP.get(id)) || (GGP.active && GGP.active()) || {}, d = GGP.data(id, 'aspen') || {};
    var st = Object.assign({ rings: [], draft: null, plan: null, log: {}, leaves: 0, style: 'aspen', theme: 'lake', grade: 6 }, JSON.parse(JSON.stringify(d.student || {})));
    st.id = id; st.name = p.name || ''; st.avatar = p.avatar || ''; st._pid = id;
    var fr = (st.rings || []).filter(function (r) { return r && r.from; });
    if (fr.length) { st.rings = st.rings.filter(function (r) { return !(r && r.from); }); st.earlier = (st.earlier || []).concat(fr); }
    return st;
  }
  function aspKit(ctx) {
    var CK = window.ASPEN_CHECKIN, K = GGKidKit, esc = K.esc, D = window.GGKidData.aspen, GW = window.GGParts && GGParts.word ? GGParts : null;
    var rec = function () { try { return GGP.data(ctx.id, 'aspen') || null; } catch (e) { return null; } };
    var plainLocked = function (s) { var r = rec(); return s.plainLock === true || !!(r && r.plainLock === true); };           // 1166
    var isPlain = function (s) { if (plainLocked(s)) return true; var r = rec(), w = s.wording || (r && r.wording); return w === 'plain'; };   // 1167
    var ANS = {}; CK.answers.forEach(function (a) { ANS[a[0]] = a; });
    var PART = {}; D.parts.forEach(function (p) { PART[p.key] = p; });
    // Each part's small word follows the parts model (1191).
    var sub = function (s, k) { if (!GW) return PART[k].sub; var w = GW.word(k, { plain: isPlain(s) }); return w.charAt(0).toUpperCase() + w.slice(1); };
    var isStd = function (r) { return !!r && r.std === CK.version; }, bankOf = function (r) { return (r && r.bank) || 1; };
    var isNow = function (r) { return isStd(r) && bankOf(r) === CK.bank; };
    var sameStd = function (a, b) { return !!a && !!b && (a.std || 0) === (b.std || 0) && (!isStd(a) || bankOf(a) === bankOf(b)); };
    var qsFor = function (grade, key, sens, wording) { return (CK.getBank(grade, wording || 'faith', sens)[key] || []).filter(Boolean); };
    // Rings from before the tree standard keep their own questions in the tree (QUESTIONS_V0); none exist on any device yet.
    var ringQs = function (r, key) { return isStd(r) ? qsFor(r.grade, key, r.sens, r.wording).slice(0, (CK.bankSizes || {})[bankOf(r)] || CK.perPart) : []; };
    var ringQa = function (r, key) { var a = (r.answers || {})[key]; return Array.isArray(a) ? a : ((a && a.qa) || []); };
    var legacyScore = function (r, key) { var v = ringQa(r, key).map(function (a) { return a && ANS[a] ? ANS[a][2] : null; }).filter(function (x) { return x != null; }); return v.length ? Math.round(1 + 9 * ((v.reduce(function (a, b) { return a + b; }, 0) / v.length) - 1) / 2) : null; };
    var ringScore = function (r, key) { if (!r) return null; if (isStd(r)) { var x = ((r.answers || {})[key] || {}).score; return x == null ? null : x; } return legacyScore(r, key); };
    var LEVEL_CLS = { strong: 's-up', steady: 's-steady', edge: 's-care' };
    var level = function (sc) { if (sc == null) return ['Not sure yet', 's-steady', 'none']; var l = CK.levels.filter(function (x) { return sc >= x[2]; })[0] || CK.levels[CK.levels.length - 1]; return [l[1], LEVEL_CLS[l[0]], l[0]]; };
    var trend = function (r, prev, key) {
      if (!sameStd(r, prev) || !isStd(r)) return null; var a = ringScore(r, key), b = ringScore(prev, key); if (a == null || b == null) return null;
      if (a - b >= 2) return ['Grew', 's-up', '▲']; if (b - a >= 2) return ['Dipped', 's-care', '▼']; return ['Same', 's-steady', '●'];
    };
    var talkOf = function (key, i) { return ((CK.talk || {})[key] || {})[i] || ''; };   // asTalk 1157
    var hard = function (q, a) { var an = ANS[a]; return !!an && an[2] != null && (q[2] === 'r' ? an[2] >= 2 : an[2] === 1); };   // asHard 1422
    var ringTalks = function (r) {   // 1423
      if (!isStd(r)) return []; var out = [];
      D.parts.forEach(function (p) { ringQs(r, p.key).forEach(function (q, i) { var a = ringQa(r, p.key)[i], t = talkOf(p.key, i); if (t && hard(q, a)) out.push({ part: p.key, i: i, type: t, q: q[0], ans: ANS[a][1] }); }); });
      return out;
    };
    var fmtDate = function (iso) { try { return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }); } catch (e) { return iso; } };
    var canSetSens = function (s) { if (!s._pid || !window.GGP) return true; var a = GGP.active(); return !!(a && a.age === 'adult'); };   // 2135
    return { CK: CK, esc: esc, D: D, PART: PART, sub: sub, isPlain: isPlain, plainLocked: plainLocked, isStd: isStd, isNow: isNow, sameStd: sameStd, ringQs: ringQs, ringQa: ringQa, ringScore: ringScore, level: level, trend: trend, talkOf: talkOf, hard: hard, ringTalks: ringTalks, fmtDate: fmtDate, ANS: ANS, canSetSens: canSetSens };
  }
  // calmList (1784): the help list, type only, opened only by a tap.
  function calmHtml(ctx) {
    return '<div class="panel ggg-calm" id="ggg-calm"><h3>You have people with you.</h3><p>These people want to help, any time. You can also tell a grown-up you trust, like a parent, teacher, school counselor, or another family member.</p><ul>' +
      '<li><b>Call or text 988</b>The Suicide and Crisis Lifeline. Private, all day and night. You can also chat at <a href="https://988lifeline.org/chat/" target="_blank" rel="noopener">988lifeline.org</a>.</li>' +
      '<li><b>Text HOME to 741741</b>Crisis Text Line. In Minnesota, you can text MN to 741741.</li>' +
      '<li><b>Someone hurting you? Call or text Childhelp: <a href="tel:18004224453">1-800-422-4453</a></b>All day and night, in many languages.</li>' +
      '<li><b>Want to talk to another teen? Teen Line</b>Call <a href="tel:18008528336">800-852-8336</a> or text TEEN to 839863, evenings. Other times, 988 answers.</li>' +
      '<li><b>Someone threatening you with a picture?</b>Go to <a href="https://takeitdown.ncmec.org" target="_blank" rel="noopener">takeitdown.ncmec.org</a> or call <a href="tel:18008435678">1-800-843-5678</a>. You are not in trouble.</li>' +
      '<li><b>In Minnesota</b>Call **CRISIS (274747) from a cell phone to reach your county crisis team. Central Minnesota: <a href="https://cmmhc.org/crisis/" target="_blank" rel="noopener">cmmhc.org/crisis</a>.</li>' +
      '<li><b>In danger right now? Call 911.</b></li></ul>' +
      GGKidKit.lifeLines('aspen', ctx.id, 'as-life-lines', 'muted small', 'For information and support. In danger right now, call 911. In a crisis, call or text 988.') +
      '<div class="ggg-row"><button type="button" class="hm-btn sm hm-pill" data-ggg="calm-close">Close</button></div></div>';
  }
  function aspenGrown(ctx) {
    var A = aspKit(ctx), esc = A.esc, s = aspStudent(ctx.id), l = s.rings[s.rings.length - 1];
    var act = GGP.active(), locked = (GGP.list ? GGP.list() : []).filter(function (p) { return p.age === 'aspen' && !GGP.isOpen(p.id); });
    var who = act && act.age === 'adult' ? (locked.length ? '<p class="muted">' + locked.length + ' more student profile' + (locked.length === 1 ? '' : 's') + ' on this device ' + (locked.length === 1 ? 'is' : 'are') + ' locked. Only the grown-ups who agreed for a student can open them.</p>' : '')
      : '<p class="muted">Open your own grown-up profile (the button at the top of the page) to see every student you agreed for.</p>';
    var card = '<button type="button" class="ggg-person person" data-ggg="student"><img src="/shared/heroes/aspen-phone.webp" alt=""><span><b>' + esc(s.name) + '</b><span class="muted">Grade ' + s.grade + ', ' + s.rings.length + ' ' + (s.rings.length === 1 ? 'ring' : 'rings') + (l ? ', last ' + A.fmtDate(l.date) : '') + '</span>' + (l && A.ringTalks(l).length ? '<span class="flagged">Worth a conversation</span>' : '') + '</span></button>';
    return '<div class="ggg as-grown"><h2>For Grown-ups</h2>' +
      '<p class="lede">Parents, guardians, and teachers are equal partners in Aspen. Here is what students see, what you can see, and how to help.</p>' +
      '<div class="panel"><h3>Students on this device</h3>' + who + '<div class="people">' + card + '</div>' +
      '<div class="ggg-row"><button type="button" class="hm-btn sm line hm-pill" data-ggg="export">Save to a file</button></div>' +
      '<p class="muted small">Everything is locked in each student\'s own profile. Save to a file now and then, since clearing the browser or resetting a device erases what is saved here. Each file is locked with a passcode you choose.</p></div>' +
      '<div class="panel"><h3>How Aspen works</h3>' +
      '<p>Each check-in has 36 questions, six for each part of the tree, written for the student\'s grade. Students choose "On my own" or "With a grown-up." A calm recorded voice guides them one question at a time, and Read It All shows every question on one page. In grown-up mode, a gold note after each answer gives you a question to take the conversation deeper. Afterward, Aspen suggests two parts to tend, and the student builds a growth plan of small daily practices. Each day they tend their tree, each week brings a theme and a short check-in, and a full check-in at the end of a twelve-week season adds a growth ring.</p>' +
      '<p>Each part gets a score from 1 to 10 and a level: Strong (8 to 10), Steady (5 to 7), or Growing Edge (1 to 4). Students see the levels too, with a reminder that a growing edge is where the next growth begins. "Not sure" never counts against a part. Some questions are worded the other way around, like "Do you feel lonely or left out?", so for those a "Not really" is the strong answer. Rings show whether each part grew, dipped, or stayed the same since the last ring. Rings saved before the questions were updated in 2026 are kept and labeled as earlier, and they are never compared with newer rings.</p>' +
      '<p>Roots questions and a few practices come in two wordings, and a grown-up chooses when a student is added. Faith wording, the starting choice, names God, prayer, and faith as one door among several. Plain wording asks the same things without religious words. Scores are the same either way, so rings compare across both. You can change it any time from the student\'s page here.</p>' +
      '<p>Aspen follows the Grounded tree standard, the same one behind Maple, Pine, Birch, Oak, and Sequoia, so every check-in measures every part of the tree the same way, written for each grade. Students tend four parts (Spirit, or what grounds you in Plain wording; Mind; Body; and Relationships), and meaning and hope grow from that tending.</p>' +
      '<p>Inside Aspen: the check-in, the growth plan and daily tending, When Life Changes guides with two short videos each, Learn videos with tabs and search on top, Read Aloud, and Save or Print. Their Health and Ability, chosen together with a grown-up who agreed, opens guides and practices that fit a disability, illness, or difference, and Someone in Our Family Drinks or Uses opens gentle guides for that season too. Everything stays locked and private. A student\'s profile also opens in The Grounded Way, Grounded\'s private app for whole person living, with its own Today and My Tree, and the Get Grounded leaf at the top of the page opens Get Grounded Now, with calm breathing and practices made for kids.</p></div>' +
      '<div class="panel"><h3>What you can see</h3>' +
      '<p>Aspen gives students some privacy, in three layers, and tells them so plainly before they start. Kids answer more honestly when they know up front.</p>' +
      '<p><b>Always shown to you.</b> The questions about feeling lonely or left out, how people treat them, and feeling hopeful. When an answer leans hard, you see exactly what they said and a gentle idea for a conversation.</p>' +
      '<p><b>The big picture.</b> How each part of the tree is doing (Strong, Steady, or Growing Edge), how the tree looks today, how many days they tended it, and which parts they\'re tending.</p>' +
      '<p><b>Just theirs.</b> The rest of their answers, the practices they check off each day, their notes, and their weekly reflections, unless they choose to share a reflection with you.</p></div>' +
      '<div class="panel"><h3>Open Questions and Quiet Help</h3>' +
      '<p>Every Aspen question is open and curious, and every answer is welcome. Every grade asks about feeling lonely or left out, how people treat them, and feeling hopeful. When one of those answers leans hard, you see a "Worth a conversation" marker on that ring, with what they said and a gentle way to start talking.</p>' +
      '<p>Aspen is for reflection and growth, and it stays locked and private. A quiet line under every check-in reminds students to tell a trusted grown-up right away whenever they feel unsafe, with 988 and 911 for an emergency, and a help list is always one tap away.</p>' +
      '<button type="button" class="hm-btn sm line hm-pill" data-ggg="calm">See the help list</button><div id="ggg-calm-slot"></div></div>' +
      '<div class="panel"><h3>Why each part matters</h3>' +
      '<p><b>Roots (What grounds you).</b> Research from Lisa Miller at Columbia University finds that a sense of being held by something greater is one of the strongest protections young people have in hard seasons, and early adolescence is when that spiritual life often wakes up. <a class="src" href="https://www.tc.columbia.edu/faculty/lfm14/" target="_blank" rel="noopener">Teachers College</a></p>' +
      '<p>Faith can also hurt. A 2023 review of studies on young people found that spiritual well-being protects against depression, while spiritual struggle, like feeling abandoned or punished by God, adds to it. So Roots asks whether the sacred is a comfort or a weight. It asks about a student\'s experience, and students of all faith traditions and everything in-between can be strong here. <a class="src" href="https://link.springer.com/article/10.1186/s12888-023-05091-2" target="_blank" rel="noopener">BMC Psychiatry</a></p>' +
      '<p><b>Friends, crushes, and being offered things.</b> Aspen never asks a student to say whether they date, who they like, or whether they have used anything. It asks whether they would know what to do and who to tell. CDC\'s Dating Matters program teaches 11 to 14 year olds healthy relationship skills before dating starts, beginning with friendships in sixth grade. <a class="src" href="https://www.cdc.gov/intimate-partner-violence/php/datingmatters" target="_blank" rel="noopener">CDC</a></p>' +
      '<p><b>Branches (Relationships).</b> Search Institute in Minneapolis finds that relationships where adults express care, challenge growth, provide support, share power, and expand possibilities help young people thrive. Middle school is when "share power" starts to matter most. <a class="src" href="https://searchinstitute.org/developmental-relationships" target="_blank" rel="noopener">Search Institute</a></p>' +
      '<p><b>Leaves (Body).</b> Sleep experts endorsed by the American Academy of Pediatrics recommend 9 to 12 hours a night for ages 6 to 12 and 8 to 10 hours for ages 13 to 18, and keeping phones out of the bedroom at night. <a class="src" href="https://www.healthychildren.org/English/healthy-living/sleep/Pages/healthy-sleep-habits-how-many-hours-does-your-child-need.aspx" target="_blank" rel="noopener">HealthyChildren.org</a></p>' +
      '<p><b>Bark (Mind and feelings).</b> The American Psychological Association advises that social media not crowd out sleep or activity, and that kids limit comparison, especially around looks. <a class="src" href="https://www.apa.org/topics/social-media-internet/health-advisory-adolescent-social-media-use" target="_blank" rel="noopener">APA health advisory</a></p>' +
      '<p><b>Fruit (Hope) and Trunk (Purpose).</b> Simple gratitude practices like writing down three good things are linked with more well-being in students. <a class="src" href="https://ggie.berkeley.edu/practice/three-good-things-for-students/" target="_blank" rel="noopener">Greater Good in Education</a></p></div>' +
      '<div class="panel"><h3>Stories from Grounded</h3><p class="muted">Real stories from chaplain Chris Joy, for the grown-ups.</p><ul>' +
      '<li><a href="https://chri5j0y.substack.com/p/the-recovery" target="_blank" rel="noopener">The Recovery</a>: what happens after a mistake matters most.</li>' +
      '<li><a href="https://chri5j0y.substack.com/p/grounded-in-coffee" target="_blank" rel="noopener">Grounded in Coffee</a>: finding your way back to center when things spill over.</li>' +
      '<li><a href="https://chri5j0y.substack.com/p/my-boundaries-have-gates" target="_blank" rel="noopener">My Boundaries Have Gates</a>: caring for others without losing yourself.</li>' +
      '<li><a href="https://chri5j0y.substack.com/p/if-she-is-still-here" target="_blank" rel="noopener">If She Is Still Here</a>: on not waiting for tomorrow.</li>' +
      '<li><a href="https://chri5j0y.substack.com/p/welcome-home" target="_blank" rel="noopener">Welcome Home</a>: a quiet moment at the end of a life.</li></ul>' +
      '<div class="ggg-row"><a class="hm-btn sm hm-pill" href="https://growwithgrounded.com/stories.html">Open Grounded Stories</a><a class="hm-btn sm line hm-pill" href="https://chri5j0y.substack.com/subscribe" target="_blank" rel="noopener">Subscribe to Grounded</a></div></div>' +
      '<div class="panel"><h3>When Life Changes</h3><p>64 guides for talking with a middle schooler about hard things, from grief and divorce to group chats, AI chatbots, scary news, and health and ability, in group cards with tabs and search on top. Each has a quick card, a full "Talking It Through" guide with trusted sources, and two short videos: For You, for the student, and For the Grown-up.</p><button type="button" class="hm-btn sm hm-pill" data-ggg="life">Open When Life Changes</button></div>' +
      '</div>';
  }
  // ringsSVG (2015): the cross section, one ring for each check-in; a ring opens its check-in.
  function ringsSvg(A, s, sel) {
    var n = s.rings.length, R = 150, step = Math.max(6, Math.min(22, (R - 26) / Math.max(1, n)));
    var g = '<circle cx="160" cy="160" r="' + (Math.min(R, 18 + n * step) + 6) + '" fill="#B98A55"/>';
    for (var i = n - 1; i >= 0; i--) {
      var r = 18 + (i + 1) * step, ring = s.rings[i], prev = s.rings[i - 1], ny = prev && prev.grade !== ring.grade;
      g += '<circle cx="160" cy="160" r="' + r + '" fill="' + (i % 2 ? '#E9CB9A' : '#E2BD84') + '" stroke="' + (ny ? '#5A3414' : '#A77B45') + '" stroke-width="' + (ny ? 3 : 1.2) + '"/>';
    }
    g += '<circle cx="160" cy="160" r="18" fill="#D2A266" stroke="#A77B45"/>';
    if (sel != null && s.rings[sel]) { var rs = 18 + (sel + 1) * step; g += '<circle cx="160" cy="160" r="' + (rs - step / 2) + '" fill="none" style="stroke:var(--gold)" stroke-width="' + Math.max(3, step - 2) + '" opacity=".55"/>'; }
    for (var j = 0; j < n; j++) { var rj = 18 + (j + 1) * step; g += '<circle cx="160" cy="160" r="' + (rj - step / 2) + '" fill="none" stroke="transparent" stroke-width="' + step + '" style="cursor:pointer" data-ggg-ring="' + j + '"><title>Ring ' + (j + 1) + ', ' + A.fmtDate(s.rings[j].date) + '</title></circle>'; }
    return '<svg class="rings-svg" viewBox="0 0 320 320" role="img" aria-label="Tree rings, ' + n + ' check-ins">' + g + '</svg>';
  }
  function statusCell(A, s, ring, prev, key, grown) {   // 1413
    var p = A.PART[key], sc = A.ringScore(ring, key), l = A.level(sc), t = A.trend(ring, prev, key);
    return '<div class="status" style="border-left:5px solid var(--' + key + ')"><b>' + p.name + '</b><span class="muted small">' + A.sub(s, key) + '</span><br><span class="s ' + l[1] + '">' + l[0] + '</span>' + (grown && sc != null ? ' <span class="muted small">' + sc + ' of 10</span>' : '') + (t ? ' <span class="s ' + t[1] + ' small">' + t[2] + ' ' + t[0] + '</span>' : '') + (l[2] === 'edge' ? '<span class="tend muted small">Your growing edge is where your next growth begins.</span>' : '') + '</div>';
  }
  function ringDetail(A, s, i) {   // ringDetail 1990, with grown true
    var esc = A.esc, ring = s.rings[i], prev = s.rings[i - 1], cmp = A.sameStd(ring, prev) ? prev : null; if (!ring) return '';
    var std = A.isStd(ring), name = esc(s.name), talks = A.ringTalks(ring);
    var guide = function (id, txt) { return '<a href="#" data-ggg-guide="' + id + '">' + txt + '</a>'; };
    var h = '<h3>Ring ' + (i + 1) + ': grade ' + ring.grade + ', ' + A.fmtDate(ring.date) + '</h3>' +
      '<p class="muted small">' + (ring.mode === 'grown' ? 'Done with a grown-up' : 'Done on their own') + (talks.length ? ' <span class="marker">Worth a conversation</span>' : '') + '</p>' +
      (A.isNow(ring) ? '' : '<p class="earlier muted small">' + (std ? 'An earlier check-in, with four questions for each part.' : 'An earlier check-in, from before Aspen\'s questions were updated.') + ' Its levels are shown for this ring only and are not compared with newer rings.</p>') +
      '<div class="status-grid">' + A.D.parts.map(function (p) { return statusCell(A, s, ring, cmp, p.key, true); }).join('') + '</div>';
    if (std && talks.length) {
      h += '<div class="note"><b>Worth a conversation with ' + name + '.</b>';
      talks.forEach(function (f) {
        var said = name + ' answered "' + esc(f.ans) + '" to "' + esc(f.q) + '"';
        if (f.type === 'kind') h += '<p>' + said + '. Ask how things are going with friends and other kids, and listen first. If something hard is happening, save any messages and work with the school. ' + guide('bullying', 'Read the guide on bullying') + '</p>';
        if (f.type === 'alone') h += '<p>' + said + '. Extra closeness this week, like one-on-one time, a walk, or a drive together, can make a real difference. ' + guide('leftout', 'Read the Being Left Out guide') + '</p>';
        if (f.type === 'hope') h += '<p>' + said + '. Spend some unhurried time together, ask gently how they are feeling, and plan one good thing to look forward to.</p>';
      });
      h += '</div>';
    }
    var together = ring.mode === 'grown';
    h += together ? '<details class="panel"><summary><b>See every answer</b></summary><p class="muted small">You did this check-in together, so every answer is here. Answers worth a gentle conversation are in bold.</p><ul class="answers-list">'
      : '<details class="panel"><summary><b>Answers always shown to you</b></summary><p class="muted small">The questions about feeling lonely or left out, how people treat them, and feeling hopeful. The rest of ' + name + '\'s answers are theirs.</p><ul class="answers-list">';
    A.D.parts.forEach(function (p) {
      A.ringQs(ring, p.key).forEach(function (q, qi) {
        var talk = std && A.talkOf(p.key, qi); if (!together && !talk) return;
        var a = A.ringQa(ring, p.key)[qi], an = A.ANS[a], hd = std ? A.hard(q, a) : (an && an[2] === 1);
        h += '<li' + (hd ? ' class="hard"' : '') + '><span>' + esc(q[0]) + '</span>' + (an ? an[1] : 'No answer') + (talk && hd ? ' <span class="marker">Worth a conversation</span>' : '') + '</li>';
      });
    });
    h += '</ul></details>';
    if (talks.length) h += '<div class="note"><b>How to start the conversation.</b> Pick a calm, private moment. Say what you noticed without alarm: "I saw some of your answers and I care about how you\'re doing." Listen more than you talk, and thank them for being honest.</div>';
    return h;
  }
  var WORDING_LINE = 'Faith wording names God, prayer, and faith as one door among several. Plain wording asks the same things without religious words. Scores are the same either way.';
  var LOCK_LINE = 'Your Aspen Guide set Plain wording for your school, so Aspen uses Plain here.';
  function aspenStudent(ctx, sel0) {
    var A = aspKit(ctx), esc = A.esc, s = aspStudent(ctx.id), n = s.rings.length, sel = sel0 != null ? sel0 : n - 1;
    var t = s.tend || {}, wk = t.start ? Math.floor(Math.max(0, Math.round((new Date(today() + 'T12:00') - new Date(t.start + 'T12:00')) / 864e5)) / 7) + 1 : 0;
    var J = window.GGJourney || {}, W = wk ? (J.WEEKS || [])[Math.min(12, wk) - 1] : null, kidQ = wk ? ((((J.AGES || {}).aspen || {}).WEEKS) || [])[Math.min(12, wk) - 1] : null, kq = kidQ && kidQ.q;
    var shared = Object.keys(t.weeks || {}).map(function (k) { return t.weeks[k]; }).filter(function (x) { return x && x.share && x.refl; }).sort(function (x, y) { return String(y.date).localeCompare(String(x.date)); });
    // wordingPanel (2410): who may change it follows canSetWording (2400); Faith or Plain also lives in Tree Settings.
    var plain = A.isPlain(s), canW = !A.plainLocked(s) && A.canSetSens(s), dis = ' disabled';
    var wording = '<div class="panel" id="as-wording"><h3>Faith or Plain Wording</h3><p>' + WORDING_LINE + ' It changes the Roots questions, a few practices, and the tips you see. Rings compare across both.</p>' +
      '<label class="gt-radio"><input type="radio" name="ggg-word" value="faith"' + (!plain ? ' checked' : '') + dis + '><span><b>Faith</b>Prayer, worship, quiet, nature, and family traditions.</span></label>' +
      '<label class="gt-radio"><input type="radio" name="ggg-word" value="plain"' + (plain ? ' checked' : '') + dis + '><span><b>Plain</b>Peace, values, quiet, nature, and family traditions.</span></label>' +
      (A.plainLocked(s) ? '<p class="muted small as-lock">' + LOCK_LINE + '</p>' : canW ? '<p class="muted small"><button type="button" class="hm-linkbtn" data-ggg="settings">Change it in Tree Settings</button></p>' : '<p class="muted small">A grown-up who agreed for ' + esc(s.name) + ' can change this from their own grown-up profile.</p>') + '</div>';
    // asLifePanel (2221): the chooser opens for a grown-up who agreed; otherwise its line.
    var life = window.GGLife ? '<div class="panel" id="as-life-g"><div id="ggg-life-host"><h3>Their Health and Ability</h3>' + (A.canSetSens(s) ? '' : '<p class="muted small">Only a grown-up who agreed for ' + esc(s.name) + ' can choose this, together with them. Open your own grown-up profile first.</p>') + '</div></div>' : '';
    // sensPanel (2136).
    var on = !!s.askSens, can = A.canSetSens(s), g7 = A.CK.sensitive['7'][2][0], g8 = A.CK.sensitive['8'][2][0];
    var sens = '<div class="panel"><h3>Optional question</h3>' +
      '<p>In grades 7 and 8, Aspen can ask one more question about being offered a vape or other substances. It is off unless you turn it on. When it is on, it takes the place of the question about knowing how to get out of it, so every part still has six questions. It never asks whether a student has used anything, and the answer stays inside Aspen, locked and private.</p>' +
      '<p class="muted small">Grade 7: "' + esc(g7) + '"<br>Grade 8: "' + esc(g8) + '"</p>' +
      '<p class="muted small">At school, questions like this can need a parent\'s written permission first. If you are a teacher or counselor, follow your school\'s rules before turning it on.</p>' +
      '<label class="switch-row"><input type="checkbox" data-ggg-sens="1"' + (on ? ' checked' : '') + (can ? '' : ' disabled') + '><span><b>Ask the optional question</b><br><span class="muted small">' + (on ? (s.grade === 6 ? 'On. Grade 6 never gets it, so it starts in grade 7.' : 'On. It starts with the next check-in.') : 'Off.') + '</span></span></label>' +
      (can ? '' : '<p class="muted small">Only a grown-up who agreed for ' + esc(s.name) + ' can change this. Open your own grown-up profile first.</p>') + '</div>';
    return '<div class="ggg as-gstudent"><div class="ggg-row no-print"><button type="button" class="hm-linkbtn" data-ggg="back">&larr; All students</button></div>' +
      '<div class="ggg-me"><img src="/shared/heroes/aspen-phone.webp" alt=""><div><h2 style="margin:0">' + esc(s.name) + '</h2><p class="muted" style="margin:0">Grade ' + s.grade + '</p></div></div>' +
      '<p class="muted small">What you see here: the answers about friends and hope always, and the big picture of ' + esc(s.name) + '\'s tree. The rest of their answers, the practices they check off, and their reflections are theirs unless they share them.</p>' +
      (n ? '<div class="rings-wrap"><div>' + ringsSvg(A, s, sel) + '<div class="ringlist">' + s.rings.map(function (r, i) { return '<button type="button" class="ringbtn" aria-pressed="' + (i === sel) + '" data-ggg-ring="' + i + '">Ring ' + (i + 1) + ': grade ' + r.grade + ', ' + A.fmtDate(r.date) + (A.ringTalks(r).length ? ' <span class="marker">Worth a conversation</span>' : '') + '</button>'; }).join('') + '</div></div><div>' + ringDetail(A, s, sel) + '</div></div>' : '<p class="muted">No check-ins yet.</p>') +
      wording + life + sens +
      (W ? '<div class="panel"><h3>This week in Aspen: ' + esc(W.theme || '') + '</h3>' + (kq ? '<p>' + esc(s.name) + '\'s reflection question this week: "' + esc(kq) + '"</p>' : '') + (W.story ? '<p class="muted">For you, a story from Grounded: <a href="' + esc(W.story.url) + '" target="_blank" rel="noopener">' + esc(W.story.title) + '</a>. <i>' + esc(W.story.line) + '</i> Read it first, and share what fits in your own words.</p>' : '') + '</div>' : '') +
      '<div class="panel"><h3>Reflections ' + esc(s.name) + ' shared</h3>' + (shared.length ? shared.map(function (x) { return '<p style="margin:8px 0 0"><b>' + A.fmtDate(x.date + 'T12:00') + '</b><br>' + esc(x.refl) + '</p>'; }).join('') : '<p class="muted">Shared reflections show here. Weekly reflections are ' + esc(s.name) + '\'s own to share with you when they choose.</p>') + '</div>' +
      '</div>';
  }
  function today() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  // exportFile (2156): the same locked file, with this device's student the way the tree's list holds them.
  function aspenExport(ctx) {
    if (!window.GGFileLock) { ctx.toast('Saving a file needs a moment to get ready. Please try again.'); return; }
    var s = aspStudent(ctx.id);
    GGFileLock.save({ app: 'aspen', filename: 'aspen-backup-' + today() + '.json', data: { app: 'aspen', v: 1, saved: new Date().toISOString(), data: { students: [s] } } }).then(function (ok) { if (ok) ctx.toast('Saved to a locked file.'); });
  }
  // setSens (2146): only a grown-up who agreed (canSetSens), saved in the student's record.
  function aspenSens(ctx, on) {
    var A = aspKit(ctx), s = aspStudent(ctx.id); if (!A.canSetSens(s)) return false;
    var rec = GGP.data(ctx.id, 'aspen'), c = JSON.parse(JSON.stringify(s)); delete c._pid; delete c.avatar; delete c.id;
    c.askSens = !!on; if (rec) rec.student = c; else GGP.setData(ctx.id, 'aspen', { student: c }); GGP.save(ctx.id); ctx.changed();
    ctx.toast(on ? 'The optional question is on for the next check-in.' : 'The optional question is off.');
    return true;
  }

  GGScreen.guide = {
    trees: ['maple', 'aspen'],
    title: function (tree) { return tree === 'maple' ? 'The Grown-up Guide' : 'For Grown-ups'; },
    files: function (tree) {
      var f = ['/shared/gg-parts.js?v=b929', '/shared/gg-life.js?v=b907', '/shared/gg-pdf.js?v=b803', '/shared/home/kidsdata.js?v=' + V, '/shared/home/kidkit.js?v=' + V];
      if (tree === 'aspen') f.splice(3, 0, '/aspen/checkin.js?v=b907', '/shared/gg-journey.js?v=b929', '/shared/gg-filelock.js?v=b766');
      return f;
    },
    open: function (ctx) {
      var K = window.GGKidKit, tree = ctx.tree, host = ctx.host, view = 'main', sel = null;
      if (!K || !window.GGKidData) { host.innerHTML = '<p class="hm-sub">This screen is on its way.</p>'; return null; }
      K.css('ggscr-guide-css', CSS);
      var plainM = function () { var r = {}; try { r = GGP.data(ctx.id, 'maple') || {}; } catch (e) {} var k = r.kid || {}; return k.plainLock === true || r.plainLock === true || k.wording === 'plain'; };   // kidWording 1460
      var band = '<img class="ggg-band no-print" src="/shared/heroes/' + tree + '-wide.webp" alt="">';
      var draw = function () {
        if (tree === 'maple') host.innerHTML = band + mapleGuide(ctx, plainM());
        else host.innerHTML = view === 'student' ? aspenStudent(ctx, sel) : band + aspenGrown(ctx);
      };
      draw();
      var onClick = function (e) {
        var b = e.target.closest && e.target.closest('[data-ggg],[data-ggg-jump],[data-ggg-ring],[data-ggg-guide]'); if (!b || !host.contains(b)) return;
        if (b.hasAttribute('data-ggg-jump')) { var to = host.querySelector('#ggg-' + b.getAttribute('data-ggg-jump')); if (to) to.scrollIntoView({ block: 'start' }); return; }
        if (b.hasAttribute('data-ggg-ring')) { sel = +b.getAttribute('data-ggg-ring'); draw(); return; }
        if (b.hasAttribute('data-ggg-guide')) { e.preventDefault(); e.stopPropagation(); ctx.openHome('guide:' + b.getAttribute('data-ggg-guide')); return; }
        var k = b.getAttribute('data-ggg');
        if (k === 'print') { var el = host.querySelector('.guide'); K.sheet(ctx, b.parentNode, { title: 'The Grown-up Guide', file: 'maple-grown-up-guide.pdf', el: el, blocks: function () { return ggPdfFromEl(el, { eyebrow: 'Maple by Grow With Grounded', foot: 'Maple(TM) by Grow With Grounded. growwithgrounded.com' }); } }); return; }
        if (k === 'life') { ctx.openHome('life'); return; }
        if (k === 'settings') { ctx.openHome('settings'); return; }
        if (k === 'export') { aspenExport(ctx); return; }
        if (k === 'student') { view = 'student'; sel = null; draw(); host.scrollTop = 0; return; }
        if (k === 'back') { view = 'main'; draw(); host.scrollTop = 0; return; }
        if (k === 'calm') { var slot = host.querySelector('#ggg-calm-slot'); if (slot) { slot.innerHTML = slot.innerHTML ? '' : calmHtml(ctx); var c = slot.querySelector('[data-ggg="calm-close"]'); if (c) c.focus(); } return; }
        if (k === 'calm-close') { var sl = host.querySelector('#ggg-calm-slot'); if (sl) sl.innerHTML = ''; var cb = host.querySelector('[data-ggg="calm"]'); if (cb) cb.focus(); return; }
      };
      var onChange = function (e) { if (e.target && e.target.hasAttribute && e.target.hasAttribute('data-ggg-sens')) { aspenSens(ctx, e.target.checked); draw(); } };
      host.addEventListener('click', onClick); host.addEventListener('change', onChange);
      return { close: function () { host.removeEventListener('click', onClick); host.removeEventListener('change', onChange); } };
    }
  };
})();
