/* =====================================================================
   GROW WITH GROUNDED . TREE SETTINGS IN HOME (shared/home/settings.js), GWG BLD 912 Round 2
   (c) 2026 Grow With Grounded LLC.
   The Tree Settings window for all six trees, run by Home in its own window: no iframe, no tree page, nothing from a
   tree page's DOM or globals. It replaces Home framing the whole tree page and clicking its openSettings button
   (home/home.js openTool 'settings'). Contract: grounded-workshop patches/bld912/CONTRACT-R2.md; the screen list is
   patches/bld912/research/season-settings-fg.md, section B.

   GGScreen.settings = {files(tree), title(tree), trees, open(ctx)}; open renders into ctx.host and returns {close()}.

   What it ports, with the same keys, shapes, and saves as the tree pages (GGP.save(id) after each change):
     Your Profile       GGTend.openSettings (shared/gg-tend.js 491) and each tree's profileHtml: oakProfileHtml
                        (oak/index.html 2795), bcProfileHtml (birch/app.js 1811), pnProfileHtml (pine/app.js 1759),
                        Sequoia's oakProfileHtml (sequoia/app.js 1852), mpProfileHtml (maple/index.html 2428),
                        aspProfileHtml (aspen/index.html 1588). Picture, Switch, and Lock call GGP as the trees do.
     Movement Level     tend.level (GGTend.setLevel, gg-tend.js 779), the levels from shared/gg-journey.js (AGES per tree)
     The Grove          tend.groveShow and the shared line GGP.setShared(id, {tree}) (setGroveShow 728, publish 521)
     Tree extras        Health and Ability (GGLife.chooser, vault.life), Steady or Hardy (tend.ok, tend.bc, tend.pn),
                        helpers and What Helpers See (<tree>.helpersOn, <tree>.share), the birthday (vault.birth through
                        GGP.moveOn.setBirthday), Faith or Plain (<tree>.wording, kid.wording, student.wording, with the
                        Plain lock), the optional questions (birch.askOpt, pine.askSens), My Season (birch.seasons),
                        Bring My Oak or Pine Check-ins, the grade (pine.grade, student.grade), and every move on:
                        Move My Tree to Sequoia, Move My Tree to Oak, Start My Birch, Start My Oak, Start My Aspen,
                        Start My Pine (rule 3: the data changes as the tree does, GGP.setTree where the tree calls it,
                        then ctx.changed() and ctx.close(); never a new address)
     Daily Reminder     only with GGApp.remind.can() (the phone app): GGApp.remind.set(tree, {on, time, title, body}),
                        kept by gg-app.js in localStorage gg-reminders-v1 (shared/gg-app.js 486)
     Reading and Display  Text Size in the tree's own key (oak:text-size, birch:text-size, pine:text-size,
                        sequoia:text-size; 0, 1, 2), Light or dark (the site's .gg-theme button, else gg_theme as nav.js
                        saves it), Ease of Use (GGEase.open), Read Aloud Voice only when GGRead is already on the page
     Your Records       Back up everything, Load a backup (GGBackupGo), Save or load a results file (Home's Season and
                        Rings, ctx.openHome('history')), Root Words (GGP.rootWords). Maple and Aspen keep none (noRecords).
     About              Privacy, Terms, and Accessibility, each opened beside Home
   Groundwork From Birch in Oak opens Home's own Groundwork screen (ctx.openHome('ground')).
   Home's own Settings sheet (fillSheet('settings')) is separate and stays as it is.
   No dashes in any words here; Title Case for names; check-in with a lowercase i; Grown-up with a lowercase u.
   ===================================================================== */
(function () {
  'use strict';
  window.GGScreen = window.GGScreen || {};
  if (window.GGScreen.settings) return;

  var TREES = ['oak', 'sequoia', 'birch', 'pine', 'maple', 'aspen'];
  var NAME = { oak: 'Oak', sequoia: 'Sequoia', birch: 'Birch', pine: 'Pine', maple: 'Maple', aspen: 'Aspen' };
  var TREE_NAME = { birch: 'Birch', oak: 'Oak', sequoia: 'Sequoia' };   // oak/index.html 2825, birch/app.js 1735
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var isObj = function (x) { return !!x && typeof x === 'object' && !Array.isArray(x); };
  var clone = function (x) { return JSON.parse(JSON.stringify(x)); };
  var pad = function (n) { return String(n).padStart(2, '0'); };
  function todayKey() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }   // todayKey, oak 2353; today, aspen 1282; dkey, maple
  function addDays(s, n) { var p = String(s).split('-'); var d = new Date(+p[0], +p[1] - 1, +p[2]); d.setDate(d.getDate() + n); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function dayKey(t) { var d = new Date(t); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }   // aspen 1905

  function files(tree) {
    var f = ['/shared/gg-journey.js?v=b782', '/shared/gg-avatars.js?v=b782', '/shared/gg-ease.js?v=ez1'];
    f.push('/shared/gg-life.js?v=b907');                                  // Health and Ability (Aspen reads it for Steady or Hardy)
    if (tree === 'birch') f.push('/birch/checkin.js?v=b907');              // My Season (BIRCH_CHECKIN.mySeason)
    if (tree === 'pine') f.push('/pine/checkin.js?v=b907');                // the grades (PINE_CHECKIN.grades)
    if (tree === 'aspen') f.push('/aspen/checkin.js?v=b907');              // the ring standard (ASPEN_CHECKIN.version), for Start My Pine
    return f;
  }

  /* ---------- tree words that ride with the data (copied from the tree pages, checked by the test) ---------- */
  // Maple practice titles that change with the wording (maple/index.html ACTIVITIES with a plain title, 1213). setMpWording
  // runs mpTendGet, whose mpNormTend (2312) shows each saved name in the wording now in use; these are the names it moves.
  var MP_ACT_PLAIN = [['roots', 'Bedtime Blessing', 'Bedtime Kind Words']];
  // Aspen practice names, Faith to Plain (aspWordMap(true), aspen/index.html 2436, from PLAIN_PR and aspen/life.js).
  var AS_TO_PLAIN = {
    'roots|Before bed, pray or sit in stillness, in whatever way fits you and your family.': 'roots|Before bed, sit in stillness for a few quiet minutes, in whatever way fits you and your family.',
    'roots|Ask someone in your family about a tradition or prayer that means a lot to them.': 'roots|Ask someone in your family about a tradition that means a lot to them.',
    'roots|Write a short prayer, wish, or blessing for your day.': 'roots|Write a short wish or hope for your day.',
    'roots|Join in a family, faith, or cultural tradition this week and notice how it feels.': 'roots|Join in a family or cultural tradition this week and notice how it feels.',
    "roots|Write down a question about faith or life you've never said out loud.": "roots|Write down a big question about life you've never said out loud.",
    'roots|Read a short sacred text, poem, or prayer slowly, twice. Notice what stays with you.': 'roots|Read a short poem or a favorite passage slowly, twice. Notice what stays with you.',
    "roots|Talk with a trusted grown-up about one belief you're still figuring out.": "roots|Talk with a trusted grown-up about one big question you're still figuring out.",
    'roots|Ask an elder or someone in your faith community what helps them trust when life is hard.': 'roots|Ask an elder or someone you look up to what helps them keep going when life is hard.',
    "branches|Pray for, or think kindly about, someone you don't get along with.": "branches|Think kindly about someone you don't get along with, and wish them well.",
    'branches|Help with a project in your neighborhood, school, or faith community.': 'branches|Help with a project in your neighborhood, school, or community.'
  };
  var PARTS6 = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];

  // What stays private, word for word from each tree.
  var OK_SEE = '<p><b>Just yours</b>Every answer, your levels, your notes, and your reflections stay in your profile on this device. Only your passcode opens it. Nothing is ever sent to anyone.</p>'
    + '<p><b>Helpers, only if you choose</b>You can let someone you trust open your Oak with their own passcode. They see only what you share. This stays off unless you turn it on.</p>'
    + '<p><b>Share to Family, only by your hand</b>A link with the shape of your tree: days tended and parts tended. Never answers or notes.</p>';   // oak 2831
  var BC_SEE = '<p><b>Just yours</b>Every answer, your levels, your notes, your faith answers, the optional question, your reflections, and your Groundwork notebook stay in your profile on this device. Only your passcode opens it. Nothing is ever sent to anyone, and no one gets an alert.</p>'
    + '<p><b>Helpers, only if you choose</b>You can let someone you trust open your Birch with their own passcode. They see only what you share, and never your optional question or Groundwork. This stays off unless you turn it on.</p>'
    + '<p><b>Share to Family, only by your hand</b>A link with the shape of your tree: days tended and parts tended. Never answers or notes.</p>';   // birch 1807
  var PN_SEE = '<p><b>The big picture, only while you leave it on</b>Days tended, rings, and which parts you tended, through The Grove. You can turn this off any time with Show my growth on The Grove.</p>'
    + '<p><b>Just yours</b>Every answer, your levels, your notes, your faith answers, your optional questions, your reflections, and your Next Steps notebook. Only your passcode opens your profile. A grown-up can help reset a forgotten passcode, but can never read what is inside.</p>';   // pine 1756
  var MP_SEE = '<p><b>Talked about together</b>A few answers about friends, feeling close to your people, and looking forward show to your grown-up as an idea for a good talk together. Nothing is sent anywhere.</p>'
    + '<p><b>The big picture</b>Maple is made to do together, so your grown-up can see your check-ins, your tree, how many days you tended it, and which parts you\'re tending.</p>'
    + '<p><b>Just yours</b>The weekly thoughts you write. You can share one with your grown-up anytime.</p>';   // maple 2425
  var ASP_SEE = '<p><b>Always shown to your grown-up</b>If you answer the questions about feeling lonely or left out, how people treat you, or feeling hopeful, your grown-up sees that answer so they can cheer you on and help.</p>'
    + '<p><b>The big picture</b>How each part of your tree is doing (Strong, Steady, or Growing Edge), how your tree looks today, how many days you tended it, and which parts you\'re tending.</p>'
    + '<p><b>Just yours</b>The rest of your answers, the practices you check off each day, your notes, and your weekly reflections. You can share a reflection with your grown-up anytime.</p>';   // aspen 1585

  // Helpers: the share defaults and rows (oak 2978, birch 1923, sequoia 1879).
  var SHARE = {
    oak: { def: { tree: true, plan: true, faith: false, notes: false }, rows: ['tree', 'plan', 'faith', 'notes'],
      who: 'like a spouse, a grown child, a friend, or a mentor', can: 'they can sit with you for a check-in', off: 'Your Oak is closed to helpers.', drop: 'They will no longer open your profile.' },
    birch: { def: { tree: true, plan: true, faith: false, notes: false }, rows: ['tree', 'plan', 'faith', 'notes'],
      who: 'like a parent, a partner, a mentor, or a friend', can: 'they can sit with you for a check-in', off: 'Your Birch is closed to helpers.', drop: 'They will no longer open your profile.',
      never: '<p class="gt-small"><b>Never shared:</b> private help notes, the optional question, and your Groundwork notebook.</p>' },
    sequoia: { def: { tree: true, plan: true, legacy: false, faith: false, notes: false }, rows: ['tree', 'plan', 'legacy', 'faith', 'notes'],
      who: 'like a grown child, a spouse, or a friend', can: 'they can sit with you for a check-in or write in your Legacy Book while you tell', off: 'Your Sequoia is closed to helpers.', drop: 'They will no longer open your profile in Sequoia or Willow.' }
  };
  var SHARE_ROW = {
    tree: ['How my tree is doing', 'The level of each part and the dates of check-ins. Your answers stay yours.'],
    plan: ['My growth plan', 'The practices you chose, so a helper can do them with you.'],
    legacy: ['My Legacy Book', 'Your stories and letters. A helper can also write while you tell.'],
    faith: ['My Roots part', 'Your Roots level, and Roots practices in your plan. Off unless you turn it on.'],
    notes: ['My notes', 'Anything you wrote in "Sit with this" during a check-in.']
  };
  var HARDY_DAYS = 10;   // oak 2376, birch 1315, pine 1282, AS_HARDY_DAYS aspen 2471

  /* ---------- CSS: once, scoped to .gss, on Home's tokens ---------- */
  var CSS = [
    '.gss{display:grid;gap:0;color:var(--ink,#2C1810);font-size:16px;line-height:1.5;min-width:0}',
    '.gss *{box-sizing:border-box}',
    '.gss section.gss-sec,.gss section.gss-sec:nth-of-type(even){padding:14px 0;margin:0;border-top:1px solid var(--line,#E6DAC4);min-width:0;background:none}',   // the site band on even sections (style.css 233) stays off here
    '.gss section.gss-sec:first-child{border-top:0;padding-top:4px}',
    '.gss h3{font-family:"Barlow Condensed",system-ui,sans-serif;font-size:15px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;margin:0 0 6px;color:var(--gold,#8B5E1A)}',
    '.gss h4{font-size:15px;margin:12px 0 6px;color:var(--ink,#2C1810)}',
    '.gss p{margin:0 0 8px}',
    '.gss .gt-small,.gss-small{font-size:14.5px;color:var(--ink-soft,#6B5A4D)}',
    '.gss .gt-small b{color:var(--ink,#2C1810)}',
    '.gss-see p{font-size:14.5px;color:var(--ink-soft,#6B5A4D)}.gss-see b{display:block;color:var(--ink,#2C1810)}',
    '.gss-who{display:flex;align-items:center;gap:12px;margin:0 0 10px}.gss-who b{font-size:17px}',
    '.gss-row{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 4px}',
    '.gss-b{font:inherit;font-size:15px;font-weight:600;min-height:44px;padding:8px 16px;border-radius:999px;border:1px solid var(--line,#D8CBB3);background:var(--card-2,#FBF5EA);color:var(--ink,#2C1810);cursor:pointer;text-align:center;max-width:100%}',
    '.gss-b:hover,.gss-b:focus-visible{border-color:var(--gold,#8B5E1A)}',
    '.gss-b.main{background:var(--gold,#8B5E1A);border-color:var(--gold,#8B5E1A);color:var(--on,#fff)}',
    '.gss-b[aria-pressed="true"]{background:var(--gold,#8B5E1A);border-color:var(--gold,#8B5E1A);color:var(--on,#fff)}',
    '.gss-b:disabled{opacity:.55;cursor:default}',
    '.gss-link{font:inherit;background:none;border:0;padding:0;min-height:32px;color:var(--gold,#8B5E1A);font-weight:600;text-decoration:underline;cursor:pointer}',
    '.gss-opt{display:flex;gap:10px;align-items:flex-start;padding:8px 0;cursor:pointer}',
    '.gss-opt input{margin-top:4px;width:20px;height:20px;flex:none;accent-color:var(--gold,#8B5E1A)}',
    '.gss-opt span{min-width:0}.gss-opt b{display:block}',
    '.gss-opt small{display:block;font-size:14px;color:var(--ink-soft,#6B5A4D)}',
    '.gss-field{display:block;margin:8px 0 4px;font-size:14.5px;color:var(--ink-soft,#6B5A4D)}',
    '.gss select,.gss input[type="password"],.gss input[type="date"],.gss input[type="time"]{font:inherit;min-height:44px;padding:6px 10px;border-radius:10px;border:1px solid var(--line,#D8CBB3);background:var(--card,#fff);color:var(--ink,#2C1810);max-width:100%;width:100%}',
    '@media (min-width:560px){.gss select,.gss input[type="password"],.gss input[type="date"],.gss input[type="time"]{width:auto;min-width:240px}}',
    '.gss-helper{display:flex;align-items:center;gap:10px;margin:6px 0}',
    '.gss-lock{font-size:14.5px;padding:8px 12px;border-radius:10px;background:var(--card-2,#FBF5EA);border:1px solid var(--line,#E6DAC4)}',
    '.gss-links{display:flex;flex-wrap:wrap;gap:6px 18px}.gss-links a{color:var(--gold,#8B5E1A);font-weight:600;min-height:32px;display:inline-flex;align-items:center}',
    '.gss .gglife{max-width:100%}',
    '.gss .gg-rbar{margin-top:8px;flex-wrap:wrap}'
  ].join('');
  function addCSS() {
    if (document.getElementById('ggscr-settings-css')) return;
    var s = document.createElement('style'); s.id = 'ggscr-settings-css'; s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  /* ---------- open ---------- */
  function open(ctx) {
    addCSS();
    var id = ctx.id, tree = ctx.tree, host = ctx.host, gone = false;
    var toast = function (m) { if (ctx.toast) ctx.toast(m); };
    var P = function () { return window.GGP || null; };
    var isOpen = function () { var g = P(); return !!(g && id && (!g.isOpen || g.isOpen(id))); };
    var prof = function () { var g = P(); return g && g.get ? g.get(id) : null; };
    var save = function () { var g = P(); return Promise.resolve(g && g.save ? g.save(id) : true).then(function (r) { if (ctx.changed) try { ctx.changed(); } catch (e) {} return r; }); };
    var persist = function () { return save().catch(function () { toast('That did not save. Open your profile and try again.'); }); };   // gg-tend.js persist 712

    /* ----- the tree's records ----- */
    function vault() { return P().data(id); }
    // rec(): the tree's own section. Oak (okRec 2827), Birch, Pine, and Sequoia make sure history is an array, as rec() does.
    function rec() { var d = P().data(id, tree); if ((tree === 'oak' || tree === 'birch' || tree === 'pine' || tree === 'sequoia') && !Array.isArray(d.history)) d.history = []; return d; }
    // The kid (maple loadKids 1531: GGP.data(pid, 'maple').kid) and the student (aspen load 1213: GGP.data(pid, 'aspen').student).
    function kid() { var m = P().data(id, 'maple'); if (!isObj(m.kid)) m.kid = { checkins: [] }; if (!Array.isArray(m.kid.checkins)) m.kid.checkins = []; return m.kid; }
    function student() { var a = P().data(id, 'aspen'); if (!isObj(a.student)) a.student = { rings: [], draft: null, plan: null, log: {}, leaves: 0, style: 'aspen', theme: 'lake', grade: 6 }; if (!Array.isArray(a.student.rings)) a.student.rings = []; return a.student; }
    function tendHost() { return tree === 'maple' ? kid() : tree === 'aspen' ? student() : P().data(id, tree); }
    // The tending record as each tree's store.get makes it (oak 2648, birch 1628, pine 1590, sequoia 1683, mpTendGet 2292,
    // aspTendGet 1559), with the blanks GGTend's ensure() fills (gg-tend.js 112).
    function tend() {
      if (!isOpen()) return null;
      var h = tendHost(); if (!isObj(h.tend)) h.tend = {};
      var s = h.tend, b = { v: 1, start: null, season: 1, rings: [], plan: null, level: null, days: {}, weeks: {} };
      Object.keys(b).forEach(function (k) { if (s[k] === undefined) s[k] = b[k]; });
      return s;
    }
    function tended(s, d) { var x = s.days[d]; return !!(x && ((x.d && x.d.length) || (x.a && x.a.length))); }   // gg-tend.js 140
    function ringN(s) {   // gg-tend.js 142, with Maple's and Aspen's ringCount
      if (tree === 'maple') return kid().checkins.length;
      if (tree === 'aspen') return student().rings.filter(function (r) { return !(r && r.from); }).length;
      return (s.rings || []).length;
    }
    // The Grove's shared line (publish, gg-tend.js 521 to 529).
    function publish(s) {
      if (!isOpen() || !s) return;
      if (s.groveShow === false) { P().setShared(id, { tree: { tool: tree, show: false, updated: todayKey() } }); return; }
      var recent = [], d = todayKey();
      for (var i = 0; i < 14; i++) { var k = addDays(d, -i), x = s.days[k]; if (!x || !tended(s, k)) continue;
        var set = {}; (x.d || []).forEach(function (pk) { set[pk.split('|')[0]] = 1; }); recent.push({ d: k, parts: Object.keys(set) }); }
      var days = Object.keys(s.days).filter(function (k) { return tended(s, k); }).length;
      P().setShared(id, { tree: { tool: tree, show: true, days: days, rings: ringN(s), season: s.season || 1, recent: recent, updated: d } });
    }

    /* ----- wording ----- */
    function mpPlainLocked() { var k = kid(); if (k.plainLock === true) return true; try { return P().data(id, 'maple').plainLock === true; } catch (e) { return false; } }   // maple 1454
    function mpWording() { var k = kid(); return mpPlainLocked() || k.wording === 'plain' ? 'plain' : 'faith'; }   // kidWording 1459
    function asPlainLocked() { var s = student(), r = P().data(id, 'aspen'); return s.plainLock === true || r.plainLock === true; }   // aspen 1166
    function asWording() { if (asPlainLocked()) return 'plain'; var s = student(), r = P().data(id, 'aspen'), w = s.wording || r.wording; return w === 'plain' ? 'plain' : 'faith'; }   // wordingOf 1167
    function asCanSet() { if (asPlainLocked()) return false; var a = P().active && P().active(); return !!(a && a.age === 'adult'); }   // canSetWording 2408, canSetSens 2135 (a saved student)

    /* ----- Health and Ability ----- */
    function lifeIds() { var L = window.GGLife; if (!L || !L.chosen) return []; try { if (L.who && L.who() !== id && L.use) L.use(id); return L.chosen(tree) || []; } catch (e) { return []; } }
    function steadyFits() { return lifeIds().some(function (x) { return x === 'pain' || x === 'serious' || x === 'mind'; }); }   // oak 2478, birch steadyFits, pine hardyRests 285
    function asHardyRests() { return lifeIds().some(function (x) { return x === 'pain' || x === 'mind'; }); }   // aspen 2202

    /* ----- Steady or Hardy ----- */
    var GAME_KEY = { oak: 'ok', birch: 'bc', pine: 'pn', aspen: 'pn' };   // pnRec oak 2391, birch 1330, pine 1297, asRec aspen 2492
    function gameRec(s) { var k = GAME_KEY[tree]; if (!isObj(s[k])) s[k] = { miles: {}, bal: {} }; s[k].miles = s[k].miles || {}; s[k].bal = s[k].bal || {}; return s[k]; }
    function mode(s) { var k = GAME_KEY[tree]; return (s && s[k] && s[k].mode) === 'hardy' ? 'hardy' : 'steady'; }
    function setMode(m) {   // setPnMode oak 2472, birch 1410, pine 1372; setAsMode aspen 2565
      var s = tend(); if (!s) { toast(tree === 'aspen' ? 'Open your tree first.' : 'Open your profile first.'); return; }
      var R = gameRec(s); R.mode = m === 'hardy' ? 'hardy' : 'steady'; if (R.mode === 'hardy') R.hardyFrom = todayKey();
      var on = R.mode === 'hardy';
      var msg = tree === 'oak' ? (on ? 'Hardy is on. Untended parts show trouble after ' + HARDY_DAYS + ' days, grace days not counted.' : 'Steady tree. Gentle, and everything is kept.')
        : tree === 'birch' ? (on ? 'Hardy is on. Untended parts show trouble after ' + HARDY_DAYS + ' days.' : 'Steady tree. Gentle, and everything is kept.')
        : (on ? 'Hardy is on. Untended parts show trouble after ' + HARDY_DAYS + ' days.' : 'Steady tree. Gentle, and everything you grew stays.');
      persist().then(function () { toast(msg); paint('gss-game'); });
    }

    /* ----- render ----- */
    var avatar = function (a, n, size) { return window.GGAv && GGAv.html ? GGAv.html(a, n, size) : ''; };
    var btn = function (act, label, o) { o = o || {}; return '<button type="button" class="gss-b' + (o.main ? ' main' : '') + '" data-gs="' + act + '"' + (o.val != null ? ' data-v="' + esc(o.val) + '"' : '') + (o.pressed != null ? ' aria-pressed="' + !!o.pressed + '"' : '') + (o.dis ? ' disabled' : '') + '>' + esc(label) + '</button>'; };
    var linkBtn = function (act, label, val) { return '<button type="button" class="gss-link" data-gs="' + act + '"' + (val != null ? ' data-v="' + esc(val) + '"' : '') + '>' + esc(label) + '</button>'; };
    var radio = function (name, act, val, on, title, line, dis) { return '<label class="gss-opt"><input type="radio" name="' + name + '" value="' + esc(val) + '" data-gs="' + act + '"' + (on ? ' checked' : '') + (dis ? ' disabled' : '') + '><span><b>' + esc(title) + '</b>' + line + '</span></label>'; };
    var check = function (act, on, title, line, o) { o = o || {}; return '<label class="gss-opt"><input type="checkbox" data-gs="' + act + '"' + (o.val != null ? ' data-v="' + esc(o.val) + '"' : '') + (o.id ? ' id="' + o.id + '"' : '') + (on ? ' checked' : '') + (o.dis ? ' disabled' : '') + '><span>' + (line == null ? esc(title) : '<b>' + esc(title) + '</b><small>' + esc(line) + '</small>') + '</span></label>'; };
    var sec = function (sid, title, body) { return '<section class="gss-sec" id="' + sid + '">' + (title ? '<h3>' + esc(title) + '</h3>' : '') + body + '</section>'; };

    function profileHtml() {
      var p = prof() || {}, a = (P().active && P().active()) || p;
      if (tree === 'maple') {   // mpProfileHtml 2428: in Home the profile is the kid, so Whose tree? and Save Tree stay on the tree page
        var k = kid(), g = String(k.grade || '');
        var gl = g === 'k2' ? 'Grades K to 2' : g === '35' ? 'Grades 3 to 5' : g ? (g === 'K' ? 'Kindergarten' : 'Grade ' + g) : '';
        return sec('gss-profile', p.name + '\'s profile', '<p class="gss-who">' + avatar(p.avatar, p.name, 44) + '<b>' + esc(p.name) + '</b> <span class="gt-small">' + esc(gl) + '</span></p>'
          + '<div class="gss-row">' + btn('pic', 'Change picture') + btn('manage', 'Picture code and more') + '</div>'
          + '<p class="gt-small">' + esc(p.name) + ' can open this tree with their own secret picture code, and the grown-ups who agreed can always open it too.</p>');
      }
      if (tree === 'aspen') {   // aspProfileHtml 1588
        var s = student(), gr = +s.grade || 6;
        return sec('gss-profile', 'Your Profile', '<p class="gss-who">' + avatar(p.avatar, p.name, 44) + '<b>' + esc(p.name) + '</b> <span class="gt-small">Grade ' + esc(s.grade) + '</span></p>'
          + '<div class="gss-row">' + btn('pic', 'Change picture') + '</div>'
          + '<h4>Change grade</h4><div class="gss-row" role="group" aria-label="Grade">' + [6, 7, 8].map(function (n) { return btn('asgrade', 'Grade ' + n, { val: n, pressed: gr === n }); }).join('') + '</div>');
      }
      var acts = '<div class="gss-row">' + btn('manage', 'Picture, passcode, and more') + btn('switch', 'Switch person') + btn('lock', 'Lock') + '</div>';
      var foot = '<p class="gt-small">Everyone on this device can have their own tree. Switching locks yours first, so ' + (tree === 'pine' ? 'each tree stays private' : 'no one sees anyone else\'s') + '.</p>';
      var who = '<p class="gss-who">' + avatar(a.avatar, a.name, 44) + '<b>' + esc(a.name) + '</b>';
      if (tree === 'pine') {   // pnProfileHtml 1759
        var r = rec(), gn = r.grade ? String(r.grade) : null, oakN = (((P().data(id, 'oak') || {}).history) || []).length;
        var G = ((window.PINE_CHECKIN || {}).grades) || [['9', 'Grade 9'], ['10', 'Grade 10'], ['11', 'Grade 11'], ['12', 'Grade 12']];
        return sec('gss-profile', 'Your Profile', who + ' <span class="gt-small">' + (gn ? 'Grade ' + esc(gn) : 'Grade not set') + '</span></p>' + acts
          + '<h4>Change grade</h4><p class="gt-small">Pine asks a few questions differently for grades 9 and 10 and for grades 11 and 12. Your earlier check-ins stay, and compare only with check-ins from the same grades.</p>'
          + '<div class="gss-row" role="group" aria-label="Grade">' + G.map(function (x) { return btn('pngrade', x[1], { val: x[0], pressed: gn === x[0] }); }).join('') + '</div>'
          + (oakN && !r.oakBrought ? '<p class="gt-small">You have ' + oakN + ' check-in' + (oakN === 1 ? '' : 's') + ' in Oak. ' + linkBtn('bring', 'Bring them into Pine', 'oak') + '</p>' : '') + foot);
      }
      var tn = P().tree ? P().tree(id) : tree;
      if (tree === 'birch') {   // bcProfileHtml 1811
        var br = rec(), o = oakRingsFor().length, pr = pineRingsFor().length;
        return sec('gss-profile', 'Your Profile', who + '</p><p class="gt-small">Your tree: <b>' + esc(TREE_NAME[tn] || 'Oak') + '</b>. Change it in Picture, passcode, and more.' + (tn !== 'birch' ? ' ' + linkBtn('mine', 'Make Birch My Tree') : '') + '</p>' + acts
          + (o && !br.oakBrought ? '<p class="gt-small">You have ' + o + ' check-in' + (o === 1 ? '' : 's') + ' in Oak. ' + linkBtn('bring', 'Bring them into Birch', 'oak') + '</p>' : '')
          + (pr && !br.pineBrought ? '<p class="gt-small">You have ' + pr + ' check-in' + (pr === 1 ? '' : 's') + ' in Pine. ' + linkBtn('bring', 'Bring them into Birch', 'pine') + '</p>' : '') + foot);
      }
      if (tree === 'sequoia') {   // oakProfileHtml, sequoia/app.js 1852
        var sn = (((P().data(id, 'oak') || {}).history) || []).length;
        return sec('gss-profile', 'Your Profile', who + '</p><p class="gt-small">Your tree: <b>' + (tn === 'sequoia' ? 'Sequoia' : 'Oak') + '</b>. Change it in Picture, passcode, and more.</p>' + acts
          + (sn ? '<p class="gt-small">You have ' + sn + ' check-in' + (sn === 1 ? '' : 's') + ' in Oak. ' + linkBtn('bring', 'Bring them into Sequoia', 'oak') + '</p>' : '') + foot);
      }
      // Oak (oakProfileHtml 2795)
      return sec('gss-profile', 'Your Profile', who + '</p>' + (a.age === 'adult' ? '<p class="gt-small">Your tree: <b>' + esc(TREE_NAME[tn] || 'Oak') + '</b>. Change it in Picture, passcode, and more.</p>' : '') + acts + foot);
    }

    function levelsHtml() {   // gg-tend.js 489 and 501, the levels of this tree's journey (mergeJourney 83)
      var J = window.GGJourney || {}, A = J.AGES || {}, key = tree === 'maple' ? 'maple_' + (/^(k2|K|1|2)$/.test(String(kid().grade || '')) ? 'k2' : '35') : tree;
      var L = ((A[key] && A[key].LEVELS) || J.LEVELS || []), s = tend();
      return sec('gss-level', 'Movement Level', '<p class="gt-small">Shapes the movement shown with your Leaves practices. Change it anytime.</p>'
        + L.map(function (x) { return radio('gss-level', 'level', x.id, !!(s && s.level === x.id), x.name, esc(x.desc), !s); }).join(''));
    }
    function groveHtml() {   // groveSettingsHtml, gg-tend.js 530
      var s = tend(), on = !s || s.groveShow !== false;
      return sec('gss-grove', 'The Grove', '<p class="gt-small"><b>Your tree is yours. The grove is ours.</b> You tend your tree here. The Grove is where your family\'s trees grow together.</p>'
        + check('grove', on, 'Show my growth on The Grove', null, { dis: !s })
        + '<p class="gt-small">Only the big picture shows: days tended, rings, and which parts you tended. Never your answers, levels, or notes. Turn it off anytime.</p>');
    }
    function lifeHtml(sid, title) { return window.GGLife ? '<section class="gss-sec" id="' + sid + '"><div class="gss-life" data-life="1">' + (title ? '<h3>' + esc(title) + '</h3>' : '') + '</div></section>' : ''; }
    function wordingHtml(sid, plain, dis, faithLine, plainLine, lead, lockLine) {
      return sec(sid, 'Faith or Plain Wording', '<p class="gt-small">' + lead + '</p>' + (lockLine || '')
        + radio(sid + '-w', 'word', 'faith', !plain, 'Faith', esc(faithLine), dis) + radio(sid + '-w', 'word', 'plain', plain, 'Plain', esc(plainLine), dis));
    }
    var WORD_LEAD = 'Faith wording names God, prayer, and faith as one door among several. Plain wording asks the same things without religious words. Your scores never change between the two.';
    function gameHtml() {
      var s = tend(), m = mode(s), dis = !s;
      if (tree === 'oak' || tree === 'birch') {   // oakSettingsHtml 2840, bcSettingsHtml 1830
        var fit = steadyFits();
        return sec('gss-game', 'Your Tree: Steady or Hardy',
          radio('gss-mode', 'mode', 'steady', m === 'steady', 'Steady', (tree === 'oak' ? 'The gentle tree. Missed days rest in soft mist, and nothing is ever lost.' : 'The gentle tree. Missed days rest in soft mist, and everything you grew stays.') + '<span class="steady-fit">' + (fit ? ' Steady fits you best right now.' : '') + '</span>', dis)
          + radio('gss-mode', 'mode', 'hardy', m === 'hardy', 'Hardy', '<span class="hardy-pitch">' + (fit ? '' : 'A little more challenge. ') + '</span>' + (tree === 'oak' ? 'A part of your plan left untended for ' + HARDY_DAYS + ' days, grace days not counted, shows trouble, and one practice in that part heals it.' : 'A part of your plan left untended for ' + HARDY_DAYS + ' days shows trouble, and one practice in that part heals it.'), dis)
          + (tree === 'oak' ? '<p class="gt-small"><b>Grace days.</b> Two days a week are yours to rest. Five days tended makes a full week, and Hardy never counts grace days.</p><p class="gt-small">No streaks to lose and no leaderboards. After a hard check-in, the tree holds still for two weeks either way.</p>'
            : '<p class="gt-small">Your tree grows at your own pace, just for you. After a hard check-in, the tree holds still for two weeks either way.</p>'));
      }
      var rests = tree === 'aspen' ? asHardyRests() : steadyFits();   // pnSettingsHtml 1779, asGameSettings 2571
      return sec('gss-game', 'Your Tree: Steady or Hardy', (rests ? '<p class="gt-small"><b>Steady fits best right now.</b> It stays gentle on hard weeks, and everything you grew stays. Rest Week on Today holds your tree still any time.</p>' : '')
        + radio('gss-mode', 'mode', 'steady', m === 'steady', 'Steady', 'The gentle tree. It may rest in a soft mist when you miss days, and everything you grew stays.', dis)
        + radio('gss-mode', 'mode', 'hardy', m === 'hardy', 'Hardy', tree === 'aspen' ? (rests ? 'Here whenever you want it.' : 'A little more challenge.') + ' A part of your plan left untended for ' + HARDY_DAYS + ' days shows trouble, and one practice in that part heals it.'
          : (rests ? 'Here whenever you want it. ' : 'A little more challenge. ') + 'A part of your plan left untended for ' + HARDY_DAYS + ' days shows trouble, and one practice in that part heals it.', dis)
        + '<p class="gt-small">Your tree grows at your own pace, just for you.' + (tree === 'pine' ? ' After a hard check-in, the tree holds still for two weeks either way.' : '') + '</p>');
    }
    function helpersHtml() {   // helperSettingsHtml oak 2991, birch 1937, sequoia 1889
      var p = prof(); if (!p || p.age !== 'adult') return '';
      var H = SHARE[tree], d = rec(), on = !!d.helpersOn, sh = Object.assign({}, H.def, d.share || {});
      var hs = ((P().helpers && P().helpers(id)) || []).map(function (x) { return P().get(x); }).filter(Boolean);
      var can = ((P().list && P().list()) || []).filter(function (x) { return x.age === 'adult' && x.id !== id && !hs.some(function (y) { return y.id === x.id; }); });
      var body = '<p class="gt-small">A helper is someone you trust, ' + H.who + '. They open your ' + NAME[tree] + ' with their own passcode, and ' + H.can + '. This stays off unless you turn it on, and only you can turn it on.</p>'
        + check('helpersOn', on, 'Let helpers open my ' + NAME[tree], null, { id: 'gss-helpers-on' });
      if (on) {
        body += '<h4>What Helpers See</h4>' + H.rows.map(function (k) { return check('share', !!sh[k], SHARE_ROW[k][0], SHARE_ROW[k][1], { val: k }); }).join('') + (H.never || '')
          + '<h4>Your Helpers</h4>' + (hs.length ? hs.map(function (x) { return '<p class="gss-helper">' + avatar(x.avatar, x.name, 32) + '<b>' + esc(x.name) + '</b>' + linkBtn('dropHelper', 'Remove', x.id) + '</p>'; }).join('') : '<p class="gt-small">No helpers yet.</p>')
          + (can.length ? '<label class="gss-field" for="gss-hid">Add a helper</label><select id="gss-hid">' + can.map(function (x) { return '<option value="' + esc(x.id) + '">' + esc(x.name) + '</option>'; }).join('') + '</select>'
            + '<label class="gss-field" for="gss-hpass">Their own passcode (they type it)</label><input type="password" id="gss-hpass" autocomplete="off"><div class="gss-row">' + btn('addHelper', 'Add as a Helper', { main: true }) + '</div>'
            : '<p class="gt-small">A helper first creates their own Grounded profile on this device, then comes back here with you to be added.</p>');
      }
      return sec('gss-helpers', 'Add a Helper', body);
    }
    function birthdayHtml(why) {   // GGP.moveOn.birthdayHtml, shared/gg-profiles.js 1303
      var M = P().moveOn; if (!M) return '';
      var b = M.birthday(id);
      return sec('gss-birthday', 'Your Birthday (Optional)', '<p class="gt-small">' + esc(why) + ' It stays locked in your profile.</p>'
        + '<input type="date" aria-label="Your birthday" id="gss-birth" data-gs="birth" min="1900-01-01" max="' + todayKey() + '" value="' + esc(b || '') + '">'
        + (b ? ' ' + linkBtn('nobirth', 'Clear') : ''));
    }
    function seeHtml(sid, title, html) { return '<section class="gss-sec gss-see" id="' + sid + '"><h3>' + esc(title) + '</h3>' + html + '</section>'; }
    function stayNote(date, tr, start, whose) { return P().moveOn && P().moveOn.stayNote ? P().moveOn.stayNote(date, tr, start, whose) : ''; }

    /* Oak: Groundwork From Birch (gwSettingsHtml 2911, gwData 2899) and Move My Tree to Sequoia (moveSeqHtml 2871) */
    function gwHas() {
      var all = vault(), b = all && isObj(all.birch) ? all.birch : null, g = b && b.groundwork; if (!isObj(g)) return false;
      var A = g.answers || {}, F = (g.fromPine || {}).answers || {}, K = g.skills || {};
      return Object.keys(A).filter(function (k) { return String((A[k] || {}).text || '').trim(); }).length + Object.keys(F).length + Object.keys(K).filter(function (k) { return K[k] && K[k].done; }).length > 0;
    }
    function oakExtras() {
      var p = prof(); if (!p || p.age !== 'adult') return '';
      var r = rec();
      return lifeHtml('gss-life') + gameHtml() + helpersHtml()
        + birthdayHtml('Only used to offer the step into Sequoia, built for 60 and up, on your 60th birthday.')
        + seeHtml('gss-see', 'What Stays Private', OK_SEE)
        + (gwHas() ? sec('gss-gw', 'Groundwork From Birch', '<p class="gt-small">Your Groundwork notebook stays in Birch. Read it or print it here any time.</p><div class="gss-row">' + btn('ground', 'Open My Groundwork') + '</div>') : '')
        + sec('gss-moving', 'Ready for Sequoia?', '<p class="gt-small">Sequoia is built for 60 and up, with a gentler pace and a Legacy Book for the stories you want to keep. You choose when. Stay in Oak as long as it fits, or move your tree to Sequoia. Move My Tree to Sequoia keeps this same profile: Sequoia gets a copy of your Oak check-ins, labeled From Oak, and Oak keeps everything.</p>'
          + '<div class="gss-row">' + btn('moveSeq', 'Move My Tree to Sequoia') + '</div>' + (r.staySeq ? stayNote(r.staySeq, 'Oak', 'Move My Tree to Sequoia') : ''));
    }
    /* Birch: bcSettingsHtml 1821 */
    function birchSeasons() { return ((window.BIRCH_CHECKIN || {}).mySeason) || ((window.BIRCH_CHECKIN || {}).MY_SEASON) || []; }
    function seasonsNow() { var v = rec().seasons, S = birchSeasons(); return Array.isArray(v) ? v.filter(function (x) { return S.some(function (y) { return y.id === x; }); }) : []; }   // 331
    function birchExtras() {
      var r = rec(), plain = r.wording === 'plain', mine = seasonsNow();
      return sec('gss-season', 'My Season', '<p class="gt-small">Choose any that fit your life right now, or none. My Season changes only the examples, tips, and help lines you see. The questions and your scores stay the same.</p>'
          + birchSeasons().map(function (x) { return check('season', mine.indexOf(x.id) >= 0, x.name, x.line || '', { val: x.id }); }).join(''))
        + lifeHtml('gss-life')
        + wordingHtml('gss-wording', plain, false, 'Prayer, worship, quiet, nature, and traditions.', 'Peace, values, quiet, nature, and traditions.', WORD_LEAD)
        + sec('gss-sens', 'Optional Question', '<p class="gt-small">One extra question about betting and gambling, on sports, online games, or anything else for money. It never counts toward a score, is never shared, and is never shown to a helper. Only you can turn it on.</p>'
          + check('sens', !!r.askOpt, 'Ask me the optional question', null))
        + gameHtml() + helpersHtml()
        + birthdayHtml('Only used to offer the step into Oak, built for adults 26 to 60, on your 26th birthday.')
        + seeHtml('gss-see', 'What Stays Private', BC_SEE)
        + sec('gss-moving', 'Ready for Oak?', '<p class="gt-small">You choose when. Stay in Birch as long as it fits, or move your tree to Oak. Move My Tree to Oak keeps this same profile: Oak gets a copy of your Birch check-ins, labeled From Birch, and Birch keeps everything, Groundwork included. You can print your whole Groundwork notebook first, and come back to it here any time.</p>'
          + '<div class="gss-row">' + btn('moveOak', 'Move My Tree to Oak') + btn('ground', 'Print My Groundwork') + '</div>' + (r.stayBirch ? stayNote(r.stayBirch, 'Birch', 'Move My Tree to Oak') : ''));
    }
    /* Pine: pnSettingsHtml 1767 */
    function pineExtras() {
      var r = rec(), plain = r.wording === 'plain', M = P().moveOn, age = M ? M.age(id) : null, gn = r.grade ? String(r.grade) : null;
      var lead = age != null && age >= 18 ? (M.isBirthday(id) && age === 18 ? 'Happy 18th birthday! ' : 'You are 18 now. ') : (gn === '12' ? 'You are in grade 12. ' : '');
      return wordingHtml('gss-wording', plain, false, 'Prayer, worship, quiet, nature, and family traditions.', 'Peace, values, quiet, nature, and family traditions.', WORD_LEAD)
        + sec('gss-sens', 'Optional Questions', '<p class="gt-small">Two extra questions: one about pressure to vape, drink, or use drugs to cope, and one about pressure or control from someone you are close to. They never count toward a score, never send a note to anyone, and are never shared. Only you can turn them on.</p>'
          + check('sens', !!r.askSens, 'Ask me the optional questions', null))
        + lifeHtml('gss-life', 'Health and Ability') + gameHtml()
        + seeHtml('gss-see', 'What Your Grown-up Can See', PN_SEE)
        + birthdayHtml('Only used to offer the step into Birch, built for 18 to 26, on your 18th birthday. Without it, Pine offers the step in grade 12.')
        + sec('gss-moving', 'Turning 18, or Finishing High School?', '<p class="gt-small">' + lead + 'You choose what comes next. Stay in Pine as long as it fits, or start your own adult tree in Birch, built for ages 18 to 26. Start My Birch makes a new profile for you as an adult, and brings your Pine check-ins (labeled From Pine), your Next Steps notebook, and your Faith or Plain choice with you. Pine keeps its own copy.</p>'
          + '<div class="gss-row">' + btn('startBirch', 'Start My Birch', { main: true }) + '</div>'
          + '<p class="gt-small">Prefer Oak, built for adults 26 to 60? ' + linkBtn('startOak', 'Start My Oak instead') + '</p>' + (r.stayPine ? stayNote(r.stayPine, 'Pine', 'Start My Birch') : ''));
    }
    /* Maple: mpExtraSettings 2434 */
    function mpMoveDue(k) { var M = P().moveOn; return !!(M && M.gradeDue && M.gradeDue('5', k.checkins || [], k.done5)); }   // 2673
    function mapleExtras() {
      var k = kid(), lock = mpPlainLocked(), plain = mpWording() === 'plain', nm = esc((prof() || {}).name || '');
      var out = sec('gss-wording', 'Faith or Plain Wording', '<p class="gt-small">For the grown-up. Faith wording names God, prayer, and faith as one door among several, next to quiet, nature, and family traditions. Plain wording asks the same things without religious words. Scores are the same either way.</p>'
          + (lock ? '<p class="gss-lock">Plain is locked on. A Maple Guide set Plain wording for a school or group, so the questions stay the same for every child there.</p>' : '')
          + radio('gss-mpw', 'word', 'faith', !plain, 'Faith', 'Prayer, quiet, wonder, nature, and family traditions.', lock) + radio('gss-mpw', 'word', 'plain', plain, 'Plain', 'Quiet, wonder, nature, and family traditions.', lock))
        + lifeHtml('gss-life', 'Their Health and Ability')
        + seeHtml('gss-see', 'What your grown-up can see', MP_SEE);
      var due = mpMoveDue(k);   // mpMovingHtml 2674 (Settings)
      if (P().moveOn && (due || String(k.grade) === '5' || k.stayMaple)) {
        var lead = due ? (k.done5 ? nm + ' finished grade 5. ' : 'A new school year is here, and ' + nm + ' finished grade 5. ') : nm + ' is in grade 5. ';
        out += sec('gss-moving', 'Ready for Middle School?', '<p class="gt-small">' + lead + 'Take all the time you need. ' + nm + ' can stay in Maple as long as it fits, or start a new tree in Aspen, built for grades 6 to 8. Start My Aspen makes a new Middle school profile with a grown-up, and brings ' + nm + '\'s Maple rings (labeled From Maple) and the Faith or Plain choice along. Maple keeps its own copy.</p>'
          + '<div class="gss-row">' + btn('startAspen', 'Start My Aspen', { main: true }) + (!due ? btn('done5', 'Grade 5 Is Done') : '') + '</div>'
          + (!due ? '<p class="gt-small">Today offers Start My Aspen at the start of the next school year, or as soon as you tap Grade 5 Is Done.</p>' : '')
          + (k.stayMaple ? stayNote(k.stayMaple, 'Maple', 'Start My Aspen', (prof() || {}).name) : ''));
      }
      return out;
    }
    /* Aspen: aspExtraSettings 1594 */
    function asMoveDue(s) { var M = P().moveOn; return !!(M && M.gradeDue && M.gradeDue('8', s.rings || [], s.done8)); }   // 2610
    function aspenExtras() {
      var s = student(), plain = asWording() === 'plain', can = asCanSet(), lock = asPlainLocked();
      var out = sec('gss-wording', 'Faith or Plain Wording', '<p class="gt-small">Faith wording names God, prayer, and faith as one door among several. Plain wording asks the same things without religious words. Scores are the same either way.</p>'
          + radio('gss-asw', 'word', 'faith', !plain, 'Faith', 'Prayer, worship, quiet, nature, and family traditions.', !can) + radio('gss-asw', 'word', 'plain', plain, 'Plain', 'Peace, values, quiet, nature, and family traditions.', !can)
          + (lock ? '<p class="gss-lock">Your Aspen Guide set Plain wording for your school, so Aspen uses Plain here.</p>' : can ? '' : '<p class="gt-small">A grown-up who agreed for ' + esc((prof() || {}).name || '') + ' can change this from their own grown-up profile.</p>'))
        + gameHtml()
        + seeHtml('gss-see', 'What your grown-up can see', ASP_SEE);
      var due = asMoveDue(s);   // movingOnHtml 2611 (Settings)
      if (P().moveOn && (due || +s.grade === 8 || s.stayAspen)) {
        var lead = due ? (s.done8 ? 'You finished grade 8. ' : 'A new school year is here, and you finished grade 8. ') : 'You are in grade 8. ';
        out += sec('gss-moving', 'Heading to High School?', '<p class="gt-small">' + lead + 'You choose what comes next. Stay in Aspen as long as it fits, or start your own tree in Pine, built for grades 9 to 12. Start My Pine makes a new High school profile for you, with a grown-up agreeing, and brings your Aspen check-ins (labeled From Aspen) and your Faith or Plain wording with you. Aspen keeps its own copy.</p>'
          + '<div class="gss-row">' + btn('startPine', 'Start My Pine', { main: true }) + (!due ? btn('done8', 'Grade 8 Is Done') : '') + '</div>'
          + (!due ? '<p class="gt-small">Today offers Start My Pine at the start of the next school year, or as soon as you tap Grade 8 Is Done.</p>' : '')
          + (s.stayAspen ? stayNote(s.stayAspen, 'Aspen', 'Start My Pine') : ''));
      }
      return out;
    }
    function extrasHtml() {
      if (tree === 'oak') return oakExtras();
      if (tree === 'birch') return birchExtras();
      if (tree === 'pine') return pineExtras();
      if (tree === 'sequoia') return lifeHtml('gss-life') + helpersHtml();   // sequoia/app.js 1677
      if (tree === 'maple') return mapleExtras();
      return aspenExtras();
    }

    var TS_KEY = { oak: 'oak:text-size', birch: 'birch:text-size', pine: 'pine:text-size', sequoia: 'sequoia:text-size' };
    // Sequoia starts one step larger when nothing is saved (sequoia/app.js 2266); the others start at 0.
    function textSize() { var k = TS_KEY[tree], v = tree === 'sequoia' ? 1 : 0; if (!k) return null; try { var x = localStorage.getItem(k); if (x !== null) v = parseInt(x, 10) || 0; } catch (e) {} return v >= 0 && v <= 2 ? v : 0; }
    function remindHtml() {   // gg-tend.js 504: only in the phone app
      var R = window.GGApp && GGApp.remind; if (!(R && R.can && R.can())) return '';
      var r = R.get(tree);
      return sec('gss-remind', 'Daily Reminder', check('remind', !!(r && r.on), 'Remind me to tend my tree', null)
        + '<label class="gss-field" for="gss-rtime">Time</label><input type="time" id="gss-rtime" data-gs="rtime" value="' + esc((r && r.time) || '08:00') + '">');
    }
    function displayHtml() {   // gg-tend.js 505
      var ts = textSize();
      return sec('gss-display', 'Reading and Display', (window.GGRead && GGRead.settings ? '<h4>Read Aloud Voice</h4><div class="gss-read"></div>' : '')
        + (ts != null ? '<h4>Text Size</h4><p class="gt-small">The size of the words in ' + NAME[tree] + '.</p><div class="gss-row" role="group" aria-label="Text Size">' + [['A', 'Normal'], ['A+', 'Larger'], ['A++', 'Largest']].map(function (x, i) { return '<button type="button" class="gss-b" data-gs="ts" data-v="' + i + '" aria-pressed="' + (ts === i) + '" aria-label="' + x[1] + ' text">' + x[0] + '</button>'; }).join('') + '</div>' : '')
        + '<div class="gss-row">' + btn('theme', 'Light or dark') + (window.GGEase ? btn('ease', 'Ease of Use') : '') + '</div>');
    }
    function recordsHtml() {   // gg-tend.js 506, rootBtn 516
      if (tree === 'maple' || tree === 'aspen') return '';
      var st = P().rootState ? P().rootState(id) : '';
      return sec('gss-records', 'Your Records', '<div class="gss-row">' + btn('backup', 'Back up everything') + btn('restore', 'Load a backup') + btn('progress', 'Save or load a results file')
        + (st ? btn('rootWords', st === 'has' ? 'See My Root Words' : 'Make My Root Words') : '') + '</div>'
        + '<p class="gt-small">Back up everything saves one file with every profile on this device (each still locked), The Grove, and settings, for a lost or broken phone: keep it on this device, iCloud Drive, or another drive. Load it on any device to bring it all back. Everything stays on this device.' + (st ? ' Your Root Words open your profile if your passcode is ever forgotten.' : '') + ' To delete a profile and everything in it, open Picture, passcode, and more.</p>');
    }
    function aboutHtml() {
      return sec('gss-about', 'About', '<p class="gss-links"><a href="https://growwithgrounded.com/privacy.html" target="_blank" rel="noopener">Privacy</a><a href="https://growwithgrounded.com/terms.html" target="_blank" rel="noopener">Terms</a><a href="https://growwithgrounded.com/accessibility.html" target="_blank" rel="noopener">Accessibility</a></p>');
    }

    function html() {
      if (!isOpen()) return '<div class="gss">' + sec('gss-profile', 'Your Profile', '<p>Open your profile to see your tree settings.</p>') + '</div>';
      return '<div class="gss">' + profileHtml() + levelsHtml() + groveHtml() + extrasHtml() + remindHtml() + displayHtml() + recordsHtml() + aboutHtml() + '</div>';
    }
    function mountLife() {
      var h = host.querySelector('.gss-life[data-life]'); if (!h || !window.GGLife || !GGLife.chooser) return;
      h.removeAttribute('data-life');
      try { if (GGLife.who && GGLife.who() !== id && GGLife.use) GGLife.use(id); } catch (e) {}
      // Pine mounts the chooser over its heading (mountLifeChooser 286); the others give it a host of its own.
      var box = document.createElement('div'); h.appendChild(box);
      var head = h.querySelector('h3'); if (head) head.remove();
      GGLife.chooser(box, tree === 'maple' ? { tree: 'maple', forChild: true, id: id } : { tree: tree, id: id });   // mpLifeMount 2382
    }
    function mountRead() { var r = host.querySelector('.gss-read'); if (r && window.GGRead && GGRead.settings) { try { r.appendChild(GGRead.settings()); } catch (e) {} } }
    function render(focusSel) {
      if (gone) return;
      var sc = host.closest ? host.closest('.hm-sheet') : null, top = sc ? sc.scrollTop : 0;
      host.innerHTML = html(); mountLife(); mountRead();
      if (sc) sc.scrollTop = top;
      if (focusSel) { var f = host.querySelector(focusSel); if (f) try { f.focus({ preventScroll: true }); } catch (e) {} }
    }
    // Repaint one section in place (so the Health and Ability chooser keeps its place while Steady or Hardy changes).
    function paint(sid) {
      if (gone) return;
      var old = host.querySelector('#' + sid); if (!old) { render(); return; }
      var tmp = document.createElement('div'); tmp.innerHTML = html();
      var nu = tmp.querySelector('#' + sid); if (nu) old.replaceWith(nu); else old.remove();
    }

    /* ---------- the changes, each as its tree makes it ---------- */
    function oakRingsFor() { return (((P().data(id, 'oak') || {}).history) || []).filter(function (e) { return e && e.scores && e.from !== 'birch'; }); }   // birch oakRings 1664
    function pineRingsFor() { return (((P().data(id, 'pine') || {}).history) || []).filter(function (e) { return e && e.scores && !e.from; }); }   // birch pineRings 1665
    function sortEntries(list) { list.sort(function (a, b) { return String(a.date).localeCompare(String(b.date)) || String(a.id).localeCompare(String(b.id)); }); return list; }   // 1646
    function birchRingCopy(e, from) {   // birch ringCopy 1658
      var c = clone(e), f = e.from || from;
      c.id = f + '-' + String(e.id || e.date).replace(/^(oak|pine)-/, ''); c.from = f;
      delete c.answers; delete c.safety; delete c.sens; delete c.flags; delete c.reflections;
      return c;
    }
    function bring(from) {
      var r = rec(), H = r.history, n = 0, nb = false;
      if (tree === 'birch') {   // bringOak 1686, bringPine 1693, bringList 1676, takePineNotebook 1681
        var list = from === 'oak' ? oakRingsFor() : pineRingsFor(), ids = {};
        H.forEach(function (e) { ids[e.id] = 1; });
        list.forEach(function (e) { var c = birchRingCopy(e, from); if (!ids[c.id] && !ids[e.id]) { H.push(c); ids[c.id] = 1; n++; } });
        sortEntries(H);
        var ns = (P().data(id, from) || {}).nextsteps;
        if (!isObj(r.groundwork)) r.groundwork = {};
        var g = r.groundwork; if (!g.answers) g.answers = {}; if (!g.opened) g.opened = {}; if (!g.skills) g.skills = {};
        if (!g.fromPine && ns && ns.answers && Object.keys(ns.answers).length) { g.fromPine = { answers: clone(ns.answers), opened: clone(ns.opened || {}), from: 'pine', copied: todayKey() }; nb = true; }
        r[from === 'oak' ? 'oakBrought' : 'pineBrought'] = todayKey();
        persist().then(function () { toast(n ? (from === 'oak' ? 'Your Oak check-ins are here now, labeled.' : 'Your Pine check-ins are here now, labeled From Pine.') + (nb ? (from === 'oak' ? ' Your Pine notebook is in Groundwork.' : ' Your Next Steps notebook is in Groundwork.') : '') : 'Everything is already here.'); render(); });
        return;
      }
      var oak = P().data(id, 'oak'), have = {};
      H.forEach(function (e) { have[e.id] = 1; });
      if (tree === 'pine') {   // bringOak, pine/app.js 1637
        ((oak && oak.history) || []).forEach(function (e) { if (e && e.scores && !have['oak-' + e.id] && !have[e.id]) { var c = clone(e); c.id = 'oak-' + (e.id || e.date); c.from = 'oak'; H.push(c); n++; } });
        sortEntries(H); r.oakBrought = todayKey();
        persist().then(function () { toast(n ? 'Your Oak check-ins are here now, labeled From Oak.' : 'Nothing new to bring.'); render(); });
        return;
      }
      // Sequoia, bringOak 1139: Move My Tree to Sequoia saves its copies as 'oak-' + id; either way, one copy only.
      ((oak && oak.history) || []).forEach(function (e) { if (e && e.scores && !e.from && e.by !== 'tapped' && !have[e.id] && !have['oak-' + e.id]) { var c = clone(e); c.from = 'oak'; H.push(c); } });
      sortEntries(H); r.oakBrought = new Date().toISOString().slice(0, 10);
      persist().then(function () { toast('Your Oak check-ins are here now, labeled From Oak.'); render(); });
    }
    function setWord(w) {
      w = w === 'plain' ? 'plain' : 'faith';
      if (tree === 'maple') {   // setMpWording 2463, with mpTendGet's names in the new wording (mpNormTend 2312)
        if (mpPlainLocked()) return;
        var k = kid(); k.wording = w;
        var t = k.tend; if (isObj(t)) mpRename(t, mpWording() === 'plain');
        persist().then(function () { toast(mpWording() === 'plain' ? 'Plain wording is on. Scores stay the same.' : 'Faith wording is on. Scores stay the same.'); render('#gss-wording input:checked'); });
        return;
      }
      if (tree === 'aspen') {   // setWording 2419
        if (!asCanSet()) { toast(asPlainLocked() ? 'Your Aspen Guide set Plain wording for your school, so Aspen uses Plain here.' : 'Only a grown-up who agreed can change this.'); render(); return; }
        var s = student(), before = asWording() === 'plain'; s.wording = w;
        if (before !== (asWording() === 'plain')) asRemap(s, asWording() === 'plain');
        persist().then(function () { toast(asWording() === 'plain' ? 'Plain wording is on. Scores stay the same.' : 'Faith wording is on. Scores stay the same.'); render('#gss-wording input:checked'); });
        return;
      }
      rec().wording = w;   // birch setWording 1846, pine setWording 1787
      persist().then(function () { toast(w === 'plain' ? 'Plain wording is on. Your scores stay the same.' : 'Faith wording is on. Your scores stay the same.'); render('#gss-wording input:checked'); });
    }
    function mpRename(t, plain) {
      var nm = function (part, name) { var low = String(name || '').toLowerCase(), hit = null; MP_ACT_PLAIN.forEach(function (a) { if (a[0] === part && (a[1].toLowerCase() === low || a[2].toLowerCase() === low)) hit = a; }); return hit ? (plain ? hit[2] : hit[1]) : name; };
      var nid = function (x) { var i = String(x).indexOf('|'); if (i < 0) return x; var p = x.slice(0, i); return p + '|' + nm(p, x.slice(i + 1)); };
      var uniq = function (v, i, a) { return a.indexOf(v) === i; };
      Object.keys(t.plan || {}).forEach(function (k) { var x = t.plan[k]; if (x && Array.isArray(x.selected)) x.selected = x.selected.map(function (n) { return nm(k, n); }).filter(uniq); });
      Object.keys(t.days || {}).forEach(function (d) {
        var x = t.days[d]; if (!isObj(x)) return;
        ['d', 'e'].forEach(function (f) { if (Array.isArray(x[f])) x[f] = x[f].map(nid).filter(uniq); });
        if (isObj(x.n)) { var n = {}; Object.keys(x.n).forEach(function (k) { n[nid(k)] = x.n[k]; }); x.n = n; }
      });
    }
    function asRemap(s, toPlain) {   // aspRemapTend 2442
      var t = s && s.tend; if (!isObj(t)) return;
      var M = {}; Object.keys(AS_TO_PLAIN).forEach(function (f) { if (toPlain) M[f] = AS_TO_PLAIN[f]; else M[AS_TO_PLAIN[f]] = f; });
      var mid = function (x) { return M[x] || x; };
      if (t.plan) Object.keys(t.plan).forEach(function (k) { var x = t.plan[k]; if (x && Array.isArray(x.selected)) x.selected = x.selected.map(function (n) { return mid(k + '|' + n).slice(k.length + 1); }); });
      Object.keys(t.days || {}).forEach(function (d) { var x = t.days[d]; if (!x) return;
        if (Array.isArray(x.d)) x.d = x.d.map(mid); if (Array.isArray(x.e)) x.e = x.e.map(mid);
        if (isObj(x.n)) { var n = {}; Object.keys(x.n).forEach(function (k) { n[mid(k)] = x.n[k]; }); x.n = n; } });
    }
    function setSeason(sid, on) {   // birch setSeason 1856
      var r = rec(), list = Array.isArray(r.seasons) ? r.seasons.slice() : [];
      list = list.filter(function (x) { return x !== sid; }); if (on) list.push(sid);
      r.seasons = birchSeasons().map(function (x) { return x.id; }).filter(function (x) { return list.indexOf(x) >= 0; });
      persist().then(function () { var n = seasonsNow().map(function (x) { var y = birchSeasons().find(function (z) { return z.id === x; }); return y ? y.name : ''; }).filter(Boolean); toast(r.seasons.length ? 'My Season: ' + (n.length ? n.join(', ') : 'none chosen') + '. The questions stay the same.' : 'Any season works. The questions stay the same.'); });
    }
    function setSens(on) {   // birch setSens 1861 (askOpt), pine setSens 1797 (askSens)
      var r = rec(); if (tree === 'birch') r.askOpt = !!on; else r.askSens = !!on;
      persist().then(function () { toast(tree === 'birch' ? (on ? 'The optional question will be in your next full check-in.' : 'The optional question is off.') : (on ? 'The optional questions will be in your next full check-in.' : 'The optional questions are off.')); });
    }
    function helpersOn(on) {   // okHelpersOn 3013, bcHelpersOn 1966, sqHelpersOn 1911
      var d = rec(); d.helpersOn = !!on; if (on && !d.share) d.share = Object.assign({}, SHARE[tree].def);
      persist().then(function () { toast(on ? 'Helpers can be added now. Choose what they see.' : SHARE[tree].off); render('#gss-helpers-on'); });
    }
    function share(k, v) { var d = rec(); d.share = Object.assign({}, SHARE[tree].def, d.share || {}); d.share[k] = !!v; persist(); }   // okShare 3018
    function addHelper() {   // addHelperNow 3019
      var hid = (host.querySelector('#gss-hid') || {}).value, pass = (host.querySelector('#gss-hpass') || {}).value;
      if (!pass) { toast('Your helper types their own passcode.'); return; }
      P().addHelper(id, hid, pass).then(function () { toast(((P().get(hid) || {}).name || 'They') + ' is now a helper.'); if (ctx.changed) ctx.changed(); render(); }).catch(function (e) { toast(e && e.message ? e.message : 'Let\'s try that again.'); });
    }
    function dropHelper(hid) {   // dropHelper 3024
      var n = (P().get(hid) || {}).name || 'this helper';
      if (!confirm('Remove ' + n + ' as a helper? ' + SHARE[tree].drop)) return;
      P().removeHelper(id, hid); toast(n + ' is no longer a helper.'); if (ctx.changed) ctx.changed(); render();
    }
    function setBirth(v) {   // GGP.moveOn.pick, gg-profiles.js 1309
      P().moveOn.setBirthday(id, v).then(function (r) { toast(r ? 'Birthday saved.' : 'Birthday cleared.'); if (ctx.changed) ctx.changed(); render(); }).catch(function (e) { toast(e.message); render(); });
    }
    function moveToSequoia() {   // oak moveToSequoia 2875
      if (!confirm('Move your tree to Sequoia? This same profile opens in Sequoia from now on. Sequoia gets a copy of your Oak check-ins, labeled From Oak, and Oak keeps everything. You can switch back any time in Picture, passcode, and more.')) return;
      var r = rec(), sq = P().data(id, 'sequoia');
      if (!Array.isArray(sq.history)) sq.history = [];
      if (!r.movedToSequoia) {
        var have = {}; sq.history.forEach(function (e) { have[e.id] = 1; });
        (r.history || []).filter(function (e) { return e && e.scores && !e.from && e.by !== 'tapped'; }).forEach(function (e) {
          var c = clone(e); c.id = 'oak-' + String(e.id || e.date); c.from = 'oak';   // ringCopy 2869
          delete c.answers; delete c.safety; delete c.sens; delete c.flags; delete c.reflections;
          if (!have[c.id] && !have[e.id]) sq.history.push(c);
        });
        sq.history.sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); });
      }
      r.movedToSequoia = todayKey();
      moveDone('sequoia', 'Your tree is Sequoia now. Oak keeps everything.');
    }
    function moveToOak() {   // birch moveToOak 1878
      if (!confirm('Move your tree to Oak? This same profile opens in Oak from now on. Oak gets a copy of your Birch check-ins, labeled From Birch, and Birch keeps everything, Groundwork included. You can switch back any time in Picture, passcode, and more.')) return;
      var r = rec(), oak = P().data(id, 'oak');
      if (!Array.isArray(oak.history)) oak.history = [];
      if (!r.movedToOak) {
        var have = {}; oak.history.forEach(function (e) { have[e.id] = 1; });
        (r.history || []).filter(function (e) { return e && e.scores && !e.from && e.by !== 'tapped'; }).forEach(function (e) { var c = birchRingCopy(e, 'birch'); c.from = 'birch'; c.id = 'birch-' + e.id; if (!have[c.id]) oak.history.push(c); });
        oak.history.sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); });
      }
      r.movedToOak = todayKey();
      moveDone('oak', 'Your tree is Oak now. Birch keeps everything.');
    }
    // Rule 3: save, GGP.setTree as the tree does, then Home shows the new tree (no new address).
    function moveDone(to, msg) {
      Promise.resolve(P().save(id)).then(function () { if (P().setTree) P().setTree(id, to); toast(msg); if (ctx.changed) ctx.changed(); if (ctx.close) ctx.close(); });
    }
    function afterCreate() { if (ctx.changed) try { ctx.changed(); } catch (e) {} if (ctx.close) ctx.close(); }
    function pineCarry() {   // pine pineCarry 1830
      var r = rec();
      var rings = (r.history || []).filter(function (e) { return e && e.scores && !e.from; }).map(function (e) { var c = clone(e); c.id = 'pine-' + e.id; c.from = 'pine'; delete c.std; delete c.answers; delete c.safety; delete c.sens; delete c.flags; delete c.reflections; return c; });
      var ns = r.nextsteps && r.nextsteps.answers && Object.keys(r.nextsteps.answers).length ? clone(r.nextsteps) : null;
      return { rings: rings, ns: ns, wording: r.wording === 'plain' ? 'plain' : 'faith' };
    }
    function startMyBirch() {   // pine startMyBirch 1836
      if (!confirm('Start My Birch makes a new adult profile for you, with Birch as your tree. You agree to the terms yourself, so you need to be 18 or older. Your Pine profile stays as it is. Continue?')) return;
      var name = (prof() || {}).name, c = pineCarry();
      var birch = { history: c.rings, wording: c.wording, pineCopied: todayKey() };
      if (c.ns) birch.groundwork = { answers: {}, opened: {}, skills: {}, fromPine: { answers: c.ns.answers || {}, opened: c.ns.opened || {}, from: 'pine', copied: todayKey() } };
      var birth = P().moveOn && P().moveOn.birthday(id);
      P().createDialog({ age: 'adult', tree: 'birch', name: '', carry: Object.assign({ birch: birch }, birth ? { birth: birth } : {}), reason: 'Your new adult profile, ' + name + '. Pick a name that is different from your Pine profile, like your name with a last initial. Your Pine check-ins, Next Steps notebook, and wording come along into Birch.',
        onCreated: function (nid) { try { if (nid && P().setTree && P().tree(nid) !== 'birch') P().setTree(nid, 'birch'); } catch (e) {} afterCreate(); } });
    }
    function startMyOak() {   // pine startMyOak 1846
      if (!confirm('Start My Oak makes a new adult profile for you in Oak, built for adults 26 to 60. You agree to the terms yourself, so you need to be 18 or older. Your Pine profile stays as it is. Continue?')) return;
      var name = (prof() || {}).name, c = pineCarry();
      var oak = { history: c.rings }; if (c.ns) oak.nextsteps = Object.assign(c.ns, { from: 'pine', copied: todayKey() });
      var birth = P().moveOn && P().moveOn.birthday(id);
      P().createDialog({ age: 'adult', name: '', carry: Object.assign({ oak: oak }, birth ? { birth: birth } : {}), reason: 'Your new adult profile, ' + name + '. Pick a name that is different from your Pine profile, like your name with a last initial. Your Pine check-ins and Next Steps notebook come along.', onCreated: afterCreate });
    }
    function startMyAspen() {   // maple startMyAspen 2706, mapleCarry 2699
      var k = kid(), p = prof() || {}, nm = p.name;
      if (!confirm('Start My Aspen makes a new Middle school profile for ' + nm + ', with Aspen as their tree. A grown-up agrees when it is made. ' + nm + '\'s Maple tree stays as it is. Continue?')) return;
      var rings = (k.checkins || []).filter(function (c) { return c && c.answers && c.std; }).map(function (c) {
        var scores = {}, unsure = [];
        PARTS6.forEach(function (key) { var v = ((c.answers || {})[key] || {}).score; if (typeof v === 'number') scores[key] = v; else unsure.push(key); });
        return { id: 'maple-' + c.id, date: c.date, from: 'maple', grade: c.grade, scores: scores, unsure: unsure };
      });
      var st = { rings: [], draft: null, plan: null, log: {}, leaves: 0, style: 'aspen', theme: 'lake', grade: 6, earlier: rings, mapleCopied: todayKey() };
      P().createDialog({ age: 'aspen', name: '', avatar: p.avatar || '', carry: { aspen: { student: st, wording: mpWording() } }, lifeFrom: id, lifeWho: nm,
        reason: nm + '\'s new Middle school profile. Pick a name that is different from the Maple profile, like the first name with a last initial. ' + nm + '\'s Maple rings and wording come along into Aspen.',
        onCreated: function () { if (isOpen()) { kid().movedAspen = todayKey(); Promise.resolve(P().save(id)).then(afterCreate); } else afterCreate(); } });
    }
    function startMyPine() {   // aspen startMyPine 2635, aspenCarry 2627
      var s = student(), p = prof() || {}, CKv = (window.ASPEN_CHECKIN || {}).version;
      if (!confirm('Start My Pine makes a new High school profile for you, with Pine as your tree. A grown-up agrees when it is made, the same as Aspen. Your Aspen tree stays as it is. Continue?')) return;
      var hist = (s.rings || []).filter(function (r) { return r && !r.from && r.std === CKv && r.answers; }).map(function (r) {
        var scores = {}, unsure = [];
        PARTS6.forEach(function (key) { var v = ((r.answers || {})[key] || {}).score; if (typeof v === 'number') scores[key] = v; else { scores[key] = 5; unsure.push(key); } });
        return { id: 'aspen-' + r.id, date: dayKey(r.date), from: 'aspen', grade: r.grade, scores: scores, unsure: unsure, type: 'full' };
      });
      var pine = { history: hist, wording: asWording(), aspenCopied: todayKey() }, act = P().active && P().active();
      P().createDialog({ age: 'pine', name: '', carry: { pine: pine }, lifeFrom: id, lifeWho: act && act.id !== id ? p.name : null, reason: 'Your new High school profile, ' + p.name + '. Pick a name that is different from your Aspen profile, like your name with a last initial. Your Aspen check-ins and your wording come along into Pine.',
        onCreated: function () { if (isOpen()) { student().movedPine = todayKey(); Promise.resolve(P().save(id)).then(afterCreate); } else afterCreate(); } });
    }
    function pickPicture() {   // changeKidPic maple 1517, changePic aspen 1502: the picture lives on the profile (GGP.setAvatar)
      var p = prof() || {}; if (!window.GGAv || !GGAv.pick) { if (P().manage) P().manage(id); return; }
      GGAv.pick({ value: p.avatar, name: p.name, photo: true, prefer: 'friendly', onPick: function (v) { if ((v || '') !== (p.avatar || '')) P().setAvatar(id, v); Promise.resolve(P().save(id)).then(function () { toast(v ? 'Picture saved.' : (tree === 'maple' ? 'Using initials.' : 'Using your initials.')); if (ctx.changed) ctx.changed(); render(); }); } });
    }
    function setTheme() {   // GGTend.theme, gg-tend.js 784: the site's own light and dark button, else its saved choice (nav.js 369)
      var b = document.querySelector('.gg-theme'); if (b && !host.contains(b)) { b.click(); return; }
      var root = document.documentElement, a = root.getAttribute('data-theme');
      var cur = a === 'light' || a === 'dark' ? a : (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'), t = cur === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', t); root.style.colorScheme = t;
      try { localStorage.setItem('gg_theme', t); } catch (e) {}
      var dom = /(^|\.)growwithgrounded\.com$/.test(location.hostname) ? '; Domain=.growwithgrounded.com' : '';
      document.cookie = 'gg_theme=' + t + '; Path=/; Max-Age=31536000; SameSite=Lax' + dom;
      try { window.dispatchEvent(new CustomEvent('gg-theme', { detail: t })); } catch (e) {}
    }

    var ACT = {
      manage: function () { if (ctx.close) ctx.close(); P().manage(id); },
      switch: function () { if (ctx.close) ctx.close(); Promise.resolve(P().lock()).then(function () { toast('Locked. Choose who is tending.'); }); },   // oakSwitch 2789
      lock: function () { if (ctx.close) ctx.close(); Promise.resolve(P().lock()).then(function () { toast('Locked. Your profile is safe on this device.'); }); },   // profLock
      pic: pickPicture,
      mine: function () { if (P().setTree) { P().setTree(id, 'birch'); toast('Birch is your tree now. You can change it in Picture, passcode, and more.'); if (ctx.changed) ctx.changed(); render(); } },   // makeBirchMine 1754
      bring: function (b) { bring(b.getAttribute('data-v')); },
      pngrade: function (b) { var g = b.getAttribute('data-v'); rec().grade = g; persist().then(function () { toast('Grade ' + g + ' saved.'); render('[data-gs="pngrade"][data-v="' + g + '"]'); }); },   // setGrade 599
      asgrade: function (b) { var n = parseInt(b.getAttribute('data-v'), 10); if ([6, 7, 8].indexOf(n) < 0) return; student().grade = n; persist().then(function () { toast('Grade ' + n + ' saved.'); render('[data-gs="asgrade"][data-v="' + n + '"]'); }); },   // changeGrade 1673
      addHelper: addHelper, dropHelper: function (b) { dropHelper(b.getAttribute('data-v')); },
      nobirth: function () { setBirth(''); },
      ground: function () { if (ctx.openHome) ctx.openHome('ground'); },
      moveSeq: moveToSequoia, moveOak: moveToOak, startBirch: startMyBirch, startOak: startMyOak, startAspen: startMyAspen, startPine: startMyPine,
      done5: function () { kid().done5 = todayKey(); persist().then(function () { toast('Grade 5 is done. Start My Aspen is ready on Today.'); render(); }); },   // mpDone5 2688
      done8: function () { student().done8 = todayKey(); persist().then(function () { toast('Grade 8 is done. Start My Pine is ready on Today.'); render(); }); },   // asDone8 2624
      ts: function (b) { var v = +b.getAttribute('data-v'); try { localStorage.setItem(TS_KEY[tree], String(v)); } catch (e) {} paint('gss-display'); var f = host.querySelector('[data-gs="ts"][data-v="' + v + '"]'); if (f) f.focus(); toast('Text size saved for ' + NAME[tree] + '.'); },   // cycleTextSize oak 3255
      theme: setTheme,
      ease: function (b) { if (window.GGEase) GGEase.open(b); },
      backup: function () { if (window.GGBackupGo) GGBackupGo('make'); else if (P().saveBackup) P().saveBackup(); },
      restore: function () { if (window.GGBackupGo) GGBackupGo('pick'); else if (P().restore) P().restore(); },
      progress: function () { if (ctx.openHome) ctx.openHome('history'); },
      rootWords: function () { if (ctx.close) ctx.close(); P().rootWords(id); }
    };
    function onClick(e) {
      var b = e.target.closest('button[data-gs]'); if (!b || !host.contains(b) || b.disabled) return;
      var f = ACT[b.getAttribute('data-gs')]; if (f) { e.preventDefault(); f(b); }
    }
    function onChange(e) {
      var t = e.target, a = t && t.getAttribute && t.getAttribute('data-gs'); if (!a || !host.contains(t) || t.disabled) return;
      if (a === 'level') { var s = tend(); if (!s) return; s.level = t.value; persist().then(function () { toast('Movement level saved.'); }); }   // setLevel 779
      else if (a === 'grove') { var g = tend(); if (!g) return; g.groveShow = !!t.checked; persist(); publish(g); toast(t.checked ? 'Your growth will show on The Grove.' : 'Your growth stays off The Grove.'); }   // setGroveShow 728
      else if (a === 'mode') setMode(t.value);
      else if (a === 'word') setWord(t.value);
      else if (a === 'season') setSeason(t.getAttribute('data-v'), t.checked);
      else if (a === 'sens') setSens(t.checked);
      else if (a === 'helpersOn') helpersOn(t.checked);
      else if (a === 'share') share(t.getAttribute('data-v'), t.checked);
      else if (a === 'birth') setBirth(t.value || '');
      else if (a === 'remind' || a === 'rtime') {   // GGTend.remind 780
        var R = window.GGApp && GGApp.remind; if (!R) return;
        var cur = R.get(tree) || {}, tm = (host.querySelector('#gss-rtime') || {}).value || cur.time || '08:00';
        R.set(tree, { on: a === 'rtime' ? !!cur.on : t.checked, time: tm, title: NAME[tree], body: 'Your tree is ready for today.' });
      }
    }
    function onLife() { if (gone) return; var on = steadyFits();
      host.querySelectorAll('.steady-fit').forEach(function (x) { x.textContent = on ? ' Steady fits you best right now.' : ''; });
      host.querySelectorAll('.hardy-pitch').forEach(function (x) { x.textContent = on ? '' : 'A little more challenge. '; });
      if (tree === 'pine') paint('gss-game');
      if (ctx.changed) try { ctx.changed(); } catch (e) {}
    }
    host.addEventListener('click', onClick);
    host.addEventListener('change', onChange);
    window.addEventListener('gglife:change', onLife);
    render();
    return {
      close: function () { gone = true; host.removeEventListener('click', onClick); host.removeEventListener('change', onChange); window.removeEventListener('gglife:change', onLife); },
      refresh: function () { render(); }
    };
  }

  window.GGScreen.settings = {
    files: files,
    title: function () { return 'Tree Settings'; },
    trees: TREES.slice(),
    open: open
  };
})();
