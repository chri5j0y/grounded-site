/* =====================================================================
   GROW WITH GROUNDED . GROUNDWORK IN HOME (shared/home/groundwork.js), GWG BLD 912 Round 2
   (c) 2026 Grow With Grounded LLC.
   Birch's Groundwork notebook and Skills I've Got (#groundwork), and Oak's read and print view of the same
   notebook (Groundwork From Birch), run in Home's own window: no tree page, no iframe, nothing from the
   tree page's DOM or globals. Contract: grounded-workshop patches/bld912/CONTRACT-R2.md.

   ctx.tree 'birch': the notebook to write in. Ported from birch/app.js (line numbers as of BLD 911):
     GROUNDWORK 2028 to 2199: gwRec 2038, gwT, gwP, gwHelp 2044 to 2047, gwWritten 2048, gwChapters 2049,
     gwSkillsAll 2050, renderGround 2052, GW_BIRCH_GUIDE 2078, gwSkillHtml 2079, gwSkillsPage 2091,
     skillsDone 2100, gwSkill 2101, gwPineHtml 2109, gwChapterHtml 2116, gwSave 2144, gwDelete 2153,
     gwOptIn 2157, gwPickHtml 2163, gwPrint 2176.
     rec() 328 (the Birch record, with a history list), isPlain 329, guideHtml 245 and plainOf 97 (a
     practice for a skill), showCalm 441 and lineHtml 426 (the help lines, shown in place).
     The game layer a skill touches (Skills I've Got milestones, kept in tend.bc): MILES 1316, pnRec 1330,
     daysTended 1331, masteryCount 1333, weekPartsSet 1335, weeksOf, balancedWeeks, fullWeeks 1336 to 1338,
     milesNow 1347, items 1365, mileName 1366, checkMiles 1371; the tend record as GGTend.state() makes it
     ready (shared/gg-tend.js ensure 111, with Birch's TEND_CFG.store 1628 and history 1617).
   ctx.tree 'oak': read and print only. Ported from oak/index.html: birchRec 2898, gwData 2899, gwPlain 2905,
     gwT 2920, gwSections 2922, renderGround 2944, gwPrintAll 2957.
   Loaded as they are: /birch/groundwork.js (window.BIRCH_GROUNDWORK), and for Birch /birch/practices.js
   (a skill's practice), /birch/guides.js (a skill's Birch guide), /birch/checkin.js (the help lines),
   shared/gg-parts.js (the four tended parts); shared/gg-sources.js, shared/gg-pdf.js, shared/home/notebook.js.
   Saved exactly as the tree saves: GGP.data(id, 'birch').groundwork = { answers: { [promptId]: { text, date,
   q, when? } }, opened: { [chapterId]: date }, skills: { [skillId]: { done, t } }, fromPine? }, the
   milestones in GGP.data(id, 'birch').tend.bc, then GGP.save(id). Oak never writes.
   Differences from the tree, on purpose: Remove asks in place; the help lines open in place under the
   prompt (the tree's card also adds the Health and Ability lines, which stay with the tree's own help card);
   a milestone is said in Home's toast instead of the tree's cheer card; a skill's Birch guide opens in Home
   (ctx.openHome('guide:<id>')); the one skill whose guide is Oak's only (sk-repairfriend, oak:forgiveness)
   shows no guide link in Home, since a guide from another tree opens only on that tree. Oak's "open
   Groundwork in Birch" link is left out: in Home the Oak profile reads and prints its notebook here.
   ===================================================================== */
(function () {
  'use strict';
  window.GGScreen = window.GGScreen || {};
  if (window.GGScreen.ground) return;
  var GW_JS = '/birch/groundwork.js?v=b788';
  var COMMON = ['/shared/gg-sources.js?v=b911r', '/shared/gg-pdf.js?v=b803', '/shared/home/notebook.js?v=b912'];
  var BIRCH = ['/shared/gg-parts.js?v=b907', '/birch/practices.js?v=b914a', '/birch/guides.js?v=b907', '/birch/checkin.js?v=b907'];
  var PART_ORDER = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];
  // birch/app.js 2078: skills whose Oak guide has a Birch guide that fits better.
  var GW_BIRCH_GUIDE = { 'sk-jobends': 'job-loss', 'sk-debts': 'debt', 'sk-lease': 'first-apartment', 'sk-safetyplan': 'suicide-thoughts', 'sk-signs': 'controlling', 'sk-friendhelp': 'friend-suicide', 'sk-newpeople': 'friends' };

  /* ---------- the game layer a skill touches (birch/app.js 1316 to 1377) ---------- */
  var MILES0 = [
    ['day1', 'First Day Tended'], ['six', 'All Four in a Day'], ['week', 'First Full Week'], ['balance', 'First Balanced Week'],
    ['mine', 'First Practice That\'s Yours'], ['ring', 'First Ring']
  ];
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var keyOf = function (d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  var dOf = function (s) { var p = String(s).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); };
  var addD = function (s, n) { var d = dOf(s); d.setDate(d.getDate() + n); return keyOf(d); };
  var mondayOf = function (s) { var d = dOf(s); return addD(s, -((d.getDay() + 6) % 7)); };
  function tendKeys() { return window.GGParts && GGParts.TEND ? GGParts.TEND.slice() : ['roots', 'bark', 'leaves', 'branches']; }
  function tendCountOf(set) { if (window.GGParts && GGParts.countTend) return GGParts.countTend(set); var k = tendKeys(); return k.filter(function (x) { return set[x]; }).length; }
  function sTended(s, k) { var x = (s.days || {})[k]; return !!(x && ((x.d && x.d.length) || (x.a && x.a.length))); }
  function pnRec(s) { if (!s.bc || typeof s.bc !== 'object') s.bc = { miles: {}, bal: {} }; s.bc.miles = s.bc.miles || {}; s.bc.bal = s.bc.bal || {}; return s.bc; }
  function daysTended(s) { return Object.keys(s.days || {}).filter(function (k) { return sTended(s, k); }).length; }
  function masteryCount(s, key, name) { var id = key + '|' + name; return Object.keys(s.days || {}).filter(function (k) { return ((s.days[k] || {}).d || []).indexOf(id) >= 0; }).length; }
  function weekPartsSet(s, mon) { var set = {}; for (var i = 0; i < 7; i++) { var x = (s.days || {})[addD(mon, i)]; if (x) (x.d || []).forEach(function (id) { set[id.split('|')[0]] = 1; }); } return set; }
  function weeksOf(s) { var w = {}; Object.keys(s.days || {}).forEach(function (k) { if (sTended(s, k)) { var m = mondayOf(k); (w[m] = w[m] || []).push(k); } }); return w; }
  function balancedWeeks(s) { return Object.keys(weeksOf(s)).filter(function (m) { return tendCountOf(weekPartsSet(s, m)) >= tendKeys().length; }); }
  function fullWeeks(s) { var w = weeksOf(s); return Object.keys(w).filter(function (m) { return w[m].length >= 7; }); }
  function items(s) { var out = [], p = s.plan || {}; PART_ORDER.forEach(function (k) { var x = p[k] || {}; (x.selected || []).forEach(function (n) { out.push({ key: k, name: n }); }); }); return out; }
  // shared/gg-tend.js ensure 111 and countPlan 126, with Birch's store (TEND_CFG.store, birch/app.js 1628) and history (1617).
  function countPlan(p) { var n = 0; Object.keys(p || {}).forEach(function (k) { var x = p[k] || {}; n += (x.selected || []).length + (x.custom ? 1 : 0) + (x.own || []).length + (x.lib || []).length; }); return n; }
  function tendState(d) {
    if (!d.tend || typeof d.tend !== 'object') d.tend = {};
    var s = d.tend, b = { v: 1, start: null, season: 1, rings: [], plan: null, level: null, days: {}, weeks: {} };
    Object.keys(b).forEach(function (k) { if (s[k] === undefined) s[k] = b[k]; });
    if (!s.start || !s.plan) {
      var hist = (d.history || []).filter(function (e) { return e && !e.from; });
      var full = hist.filter(function (e) { return e && e.type !== 'quick' && e.date; }), last = full[full.length - 1];
      if (!s.start && last) s.start = last.date;
      if (!s.plan) { var wp = hist.filter(function (e) { return e && e.growthPlan && countPlan(e.growthPlan); }), lp = wp[wp.length - 1]; if (lp) s.plan = JSON.parse(JSON.stringify(lp.growthPlan)); }
    }
    return s;
  }

  function openBirch(ctx) {
    var N = window.GGScrNotebook, esc = N.esc, GW = window.BIRCH_GROUNDWORK || { chapters: [], intro: [], skills: {} };
    var SP = window.BIRCH_PRACTICES || {}, CKB = window.BIRCH_CHECKIN || {}, HELPTXT = CKB.help || {};
    var spGet = function () { for (var i = 0; i < arguments.length; i++) if (SP[arguments[i]] != null) return SP[arguments[i]]; return null; };
    var GUIDES = Object.assign({}, spGet('GUIDES', 'guides') || {}, spGet('G') || {}), META = spGet('META', 'meta') || {}, PLAIN_P = spGet('PLAIN', 'plain') || {};
    var LINES = (function () { var L = HELPTXT.lines || {}; return Array.isArray(L) ? { calm: L, hurt: L.filter(function (x) { return x.first === 'hurt'; }) } : { calm: L.calm || [], hurt: L.hurt || [] }; })();
    var TOPICS = (window.BIRCH_GUIDES || {}).topics || [];
    var MILES = MILES0.concat(((GW.game || {}).miles) || [['skill1', 'First Skill I\'ve Got'], ['skill10', 'Ten Skills I\'ve Got'], ['skillset', 'A Full Set of Skills']]);
    var mileName = function (id) { var m = MILES.filter(function (x) { return x[0] === id; })[0]; return m ? m[1] : id.indexOf('season') === 0 ? 'Season ' + id.slice(6) + ' Finished' : id; };
    // rec(), birch/app.js 328
    var data = function () { var d = GGP.data(ctx.id, 'birch'); if (!Array.isArray(d.history)) d.history = []; return d; };
    var plain = typeof ctx.plain === 'boolean' ? ctx.plain : data().wording === 'plain';
    var who = (GGP.get && GGP.get(ctx.id)) || {};
    // gwRec 2038
    function rec() {
      if (!window.GGP || !GGP.isOpen(ctx.id)) return null;
      var d = data(); if (!d.groundwork || typeof d.groundwork !== 'object') d.groundwork = {};
      var g = d.groundwork; if (!g.answers) g.answers = {}; if (!g.opened) g.opened = {}; if (!g.skills) g.skills = {};
      return g;
    }
    var chapter = function (id) { return (GW.chapters || []).filter(function (c) { return c.id === id; })[0] || null; };
    var T = function (c, k) { return (plain && c['plain' + k[0].toUpperCase() + k.slice(1)]) || c[k] || ''; };
    var P = function (p) { return (plain && p.plain) || p.t; };
    var H = function (p) { return (plain && p.plainHelp) || p.help || ''; };
    var written = function (c, L) { return (c.prompts || []).filter(function (p) { return L.answers[p.id] && String(L.answers[p.id].text || '').trim(); }).length + (c.fromPine && L.fromPine ? Object.keys(L.fromPine.answers || {}).length : 0); };
    var chapters = function (L) { var all = (GW.chapters || []).filter(function (c) { return !c.fromPine || (L && L.fromPine); }); return all.filter(function (c) { return c.fromPine; }).concat(all.filter(function (c) { return !c.fromPine; })); };
    var skillsAll = function () { var out = []; Object.keys(GW.skills || {}).forEach(function (ch) { (GW.skills[ch] || []).forEach(function (x) { out.push(Object.assign({ ch: ch }, x)); }); }); return out; };
    var skillsDone = function () { var L = rec() || {}; return Object.keys(L.skills || {}).filter(function (k) { return L.skills[k] && L.skills[k].done; }); };
    // milesNow 1347 and checkMiles 1371 (not quiet: every milestone reached is recorded, as the tree does)
    function milesNow(s) {
      var n = daysTended(s), out = {};
      if (n >= 1) out.day1 = 1;
      if (Object.keys(s.days || {}).some(function (k) { var set = {}; ((s.days[k] || {}).d || []).forEach(function (id) { set[id.split('|')[0]] = 1; }); return tendCountOf(set) >= tendKeys().length; })) out.six = 1;
      if (fullWeeks(s).length) out.week = 1;
      if (balancedWeeks(s).length) out.balance = 1;
      if (items(s).some(function (it) { return masteryCount(s, it.key, it.name) >= 15; })) out.mine = 1;
      (s.rings || []).forEach(function (r, i) { out[i ? 'season' + (i + 1) : 'ring'] = 1; });
      var sk = skillsDone(), SK = GW.skills || {};
      if (sk.length >= 1) out.skill1 = 1;
      if (sk.length >= 10) out.skill10 = 1;
      if (Object.keys(SK).some(function (ch) { return (SK[ch] || []).length && SK[ch].every(function (x) { return sk.indexOf(x.id) >= 0; }); })) out.skillset = 1;
      return out;
    }
    function checkMiles(s) {
      var R = pnRec(s), now = milesNow(s), fresh = [], t = N.todayKey();
      Object.keys(now).forEach(function (id) { if (!R.miles[id]) { R.miles[id] = t; fresh.push(id); } });
      balancedWeeks(s).forEach(function (m) { if (!R.bal[m]) { R.bal[m] = t; if (m === mondayOf(t)) fresh.push('bonus'); } });
      return fresh;
    }
    // plainOf 97, shownName 102, guideHtml 245: the practice a skill points to.
    var plainOf = function (key, name) { if (!plain) return null; var k = key + '|' + name, g = GUIDES[k] || {}; return PLAIN_P[k] || g.plain || null; };
    var shownName = function (key, name) { var p = plainOf(key, name); return (p && (p.n || p.name)) || name; };
    function guideHtml(key, name) {
      var g0 = GUIDES[key + '|' + name]; if (!g0) return '';
      var pl = plainOf(key, name), g = Object.assign({}, g0, (pl && (pl.g || pl)) || {});
      var s = '<p><strong>Why it helps.</strong> ' + (g.why || '') + '</p><p><strong>Try it today.</strong> ' + (g.today || '') + '</p><p><strong>Build it.</strong> ' + (g.build || '') + '</p><p><strong>If it\'s hard.</strong> ' + (g.hard || '') + '</p>';
      if (g.vary && !plain) s += '<p><strong>For different beliefs.</strong> ' + g.vary + '</p>';
      var m = (META[key] || {})[name];
      if (m && m[3]) s += '<p><a href="' + m[3] + '" target="_blank" rel="noopener">Learn more at the source</a></p>';
      if (g.adapt) s += '<p><strong>Seated or low energy.</strong> ' + g.adapt + '</p>';
      if (window.GGSources) s += GGSources.line(GGSources.practiceList(name, 'birch'), { practice: true });
      return s;
    }
    // gwSkillHtml 2079
    function skillHtml(x, L, NB) {
      var s = L.skills[x.id], on = !!(s && s.done), ln = x.link || {}, more = '';
      var prac = ln.practice || ((SP.BY_SKILL || {})[x.id] || [])[0];
      if (prac) { var pn = String(prac).split('|'), g = guideHtml(pn[0], pn[1]); if (g) more += '<button type="button" class="ggnb-tbtn" data-nb="how" data-id="' + esc(x.id) + '" aria-expanded="' + (NB.how === x.id) + '">A practice for this: ' + esc(shownName(pn[0], pn[1])) + '</button>'; if (g && NB.how === x.id) more += '<div class="ggnb-guide">' + g + '</div>'; }
      var bg = GW_BIRCH_GUIDE[x.id], top = bg && TOPICS.filter(function (t) { return t.id === bg; })[0];
      if (top) more += '<button type="button" class="ggnb-tbtn" data-nb="guide" data-id="' + esc(bg) + '">A guide for this: ' + esc(top.title) + '</button> ';
      if (Array.isArray(x.site) && x.site[1]) more += ' <a href="' + esc(x.site[1]) + '" target="_blank" rel="noopener">' + esc(x.site[0] || 'Start here') + '</a>';
      return '<li class="ggnb-skill' + (on ? ' done' : '') + '"><label><input type="checkbox" data-nbc="skill" value="' + esc(x.id) + '"' + (on ? ' checked' : '') + '> <span><b>' + esc(x.t) + '</b>' + (x.help ? '<small>' + esc(x.help) + '</small>' : '') + (on && s.done ? '<small>Marked ' + esc(N.fmtDate(s.done)) + '</small>' : '') + '</span></label>' + (more ? '<div class="more">' + more + '</div>' : '') + '</li>';
    }
    var skillsList = function (ch, L, NB) { var list = (GW.skills || {})[ch] || []; return list.length ? '<ul class="ggnb-skills">' + list.map(function (x) { return skillHtml(x, L, NB); }).join('') + '</ul>' : ''; };
    // gwPineHtml 2109
    function pineHtml(L) {
      var F = L.fromPine || {}, A = F.answers || {}, PC = GW.pineChapters || {}, groups = {};
      Object.keys(A).forEach(function (pid) { var k = pid.split('-')[0]; (groups[k] = groups[k] || []).push([pid, A[pid]]); });
      var title = function (k) { var t = PC[k]; return typeof t === 'string' ? t : t ? ((plain && t.plain) || t.t) : k; };
      if (!Object.keys(groups).length) return '<p class="ggnb-small">Nothing was written in Pine\'s Next Steps.</p>';
      return Object.keys(groups).map(function (k) { return '<h3 class="ggnb-h3">' + esc(title(k)) + '</h3>' + groups[k].map(function (r) { var a = r[1]; return '<article class="ggnb-p has"><h3>' + esc(a.q || '') + '</h3><div class="ggnb-ans">' + N.nl(a.text || '') + '</div><p class="ggnb-small">Written in Pine' + (a.date ? ', ' + esc(N.fmtDate(a.date)) : '') + (a.when ? '. By ' + esc(N.fmtDate(a.when)) : '') + '</p></article>'; }).join(''); }).join('');
    }
    // showCalm 441, in place: the calm list, then More help lines (the hurt list).
    function linesHtml(which) {
      if (which === 'hurt') return '<div class="ggnb-optin"><h3>' + esc(HELPTXT.hurtTitle || 'Help any time, privately') + '</h3><p class="ggnb-small">' + esc(HELPTXT.hurtIntro || '') + '</p><ul class="ggnb-lines">' + LINES.hurt.map(N.lineHtml).join('') + '</ul></div>';
      return '<div class="ggnb-optin"><h3>' + esc(HELPTXT.title || 'You have people with you.') + '</h3><p class="ggnb-small">' + esc(HELPTXT.calmIntro || 'These people want to help, any time. You can also tell someone you trust.') + '</p><ul class="ggnb-lines">' + LINES.calm.map(N.lineHtml).join('') + '</ul>' +
        (LINES.hurt.length ? '<p class="ggnb-small"><button type="button" class="ggnb-tbtn" data-nb="morelines">More help lines, any time</button></p>' : '') + '</div>';
    }
    var linesWhich = 'calm';
    var h = N.mount(ctx, {
      key: 'gw', book: GW, rec: rec, save: function () { return GGP.save(ctx.id); },
      art: { src: '/shared/heroes/birch-wide.webp', alt: '', title: GW.title || 'Groundwork', sub: 'Your private notebook for the life you are building' },
      T: T, P: P, H: H, written: written, chapters: chapters,
      home: function (L) {
        return { title: GW.title || 'Groundwork', intro: (GW.intro || []).filter(function (t, i) { return i < 4 || L.fromPine; }),
          count: function (n) { return n ? n + ' ' + (n === 1 ? 'page' : 'pages') + ' written so far.' : 'Ready when you are. One prompt is enough to start.'; },
          foot: '<p class="ggnb-foot">Your notebook stays on this device, locked in your profile. You decide what to print or share, and with whom. It is never part of Share to Family, and helpers never see it.</p>' + (window.GGSources ? GGSources.html('birch:groundwork') : '') };
      },
      chSub: function (c, L, n, closed) { return (closed ? 'Opens only when you choose' : c.fromPine ? 'Written in Pine, and room to keep going' : n ? n + ' of ' + (c.prompts || []).length + ' written' : (c.prompts || []).length + ' prompts') + ((GW.skills || {})[c.id] ? '. Skills too' : ''); },
      homeMore: function () { var sk = skillsAll(); return sk.length ? '<button type="button" class="ggnb-ch skills" data-nb="open" data-id="skills"><b>' + esc(GW.skillsTitle || 'Skills I\'ve Got') + '</b><span>' + skillsDone().length + ' of ' + sk.length + ' marked, at your own pace.</span></button>' : ''; },
      top: function (c, L) { return c.fromPine ? pineHtml(L) + '<h3 class="ggnb-h3">Keep Writing</h3>' : ''; },
      promptMore: function (c, p, NB) {
        if (!p.care) return '';
        return '<p class="ggnb-care">' + esc(GW.careLine || '') + ' <button type="button" class="ggnb-tbtn" data-nb="lines" data-id="' + esc(p.id) + '" aria-expanded="' + (NB.lines === p.id) + '">Help lines</button></p>' + (NB.lines === p.id ? linesHtml(linesWhich) : '');
      },
      fields: function (c, p, a) {
        if (!p || !p.when) return null;
        return { html: '<label class="ggnb-lab" for="ggnb-w-' + esc(p.id) + '">' + esc(c.whenLabel || 'By when (optional)') + '</label><input type="date" id="ggnb-w-' + esc(p.id) + '" value="' + esc(a && a.when ? a.when : '') + '">',
          read: function (box) { return { when: ((box.querySelector('input[type=date]') || {}).value || '').trim() }; } };
      },
      // gwSave 2144
      answer: function (c, p, text, more) { var a = { text: text.slice(0, 20000), date: N.todayKey(), q: p ? P(p) : '' }; if (more && more.when) a.when = more.when; return a; },
      meta: function (c, a) { return (a.date ? N.fmtDate(a.date) : '') + (a.when ? '. ' + (c.whenLabel || 'By when').replace(/ \(optional\)$/, '') + ' ' + N.fmtDate(a.when) : ''); },
      after: function (c, L, NB) { return (GW.skills || {})[c.id] ? '<h3 class="ggnb-h3">' + esc(GW.skillsTitle || 'Skills I\'ve Got') + '</h3>' + skillsList(c.id, L, NB) : ''; },
      // gwSkillsPage 2091
      pages: { skills: function (L, NB, back) {
        var SK = GW.skills || {};
        return back + '<h2>' + esc(GW.skillsTitle || 'Skills I\'ve Got') + '</h2><p class="ggnb-lead">Practical skills for the life you are building. Mark what you can do already, and come back for the rest when life asks for it. Nothing here is graded, and unmarking takes nothing away.</p>' +
          Object.keys(SK).map(function (ch) { var c = chapter(ch); return '<h3 class="ggnb-h3">' + esc(c ? T(c, 'title') : ch) + '</h3>' + skillsList(ch, L, NB); }).join('') +
          '<div class="ggnb-acts"><button type="button" class="hm-btn sm" data-nb="print" data-id="skills">Save or Print My Skills</button><button type="button" class="hm-btn sm line" data-nb="open" data-id="">Back to All Chapters</button></div>';
      } },
      // gwPickHtml 2163
      ready: function (L) { var r = chapters(L).filter(function (c) { return written(c, L); }).map(function (c) { return [c.id, T(c, 'title')]; }); if (skillsDone().length) r.push(['skills', GW.skillsTitle || 'Skills I\'ve Got']); return r; },
      pickNote: 'Choose what goes in. Share the pages only if you want to, and only with people you choose.',
      // gwPrint 2176
      printDoc: function (ids, L) {
        var chs = ids.map(chapter).filter(function (c) { return c && written(c, L); }), sk = ids.indexOf('skills') >= 0 ? skillsAll().filter(function (x) { return L.skills[x.id] && L.skills[x.id].done; }) : [];
        if (!chs.length && !sk.length) return 'Write in this chapter or mark a skill first, then save or print it.';
        var pine = function (c) { if (!c.fromPine || !L.fromPine) return ''; var A = L.fromPine.answers || {}; return Object.keys(A).map(function (pid) { return '<h3 class="sq-legq">' + esc(A[pid].q || '') + '</h3><p class="sq-lega">' + N.nl(A[pid].text || '') + '</p><p class="sq-legby">Written in Pine' + (A[pid].date ? ', ' + esc(N.fmtDate(A[pid].date)) : '') + '</p>'; }).join(''); };
        var sections = chs.map(function (c) { return { title: T(c, 'title'), html: pine(c) + (c.prompts || []).filter(function (p) { return L.answers[p.id] && String(L.answers[p.id].text || '').trim(); }).map(function (p) { var a = L.answers[p.id]; return '<h3 class="sq-legq">' + esc(P(p)) + '</h3><p class="sq-lega">' + N.nl(a.text) + '</p>' + (a.when ? '<p class="sq-legby">' + esc((c.whenLabel || 'By when').replace(/ \(optional\)$/, '')) + ' ' + esc(N.fmtDate(a.when)) + '</p>' : ''); }).join('') }; });
        if (sk.length) sections.push({ title: GW.skillsTitle || 'Skills I\'ve Got', html: '<ul class="sq-planlist">' + sk.map(function (x) { return '<li>' + esc(x.t) + ' <span class="sq-legby">' + esc(N.fmtDate(L.skills[x.id].done)) + '</span></li>'; }).join('') + '</ul>' });
        return { title: 'Groundwork', file: 'groundwork.pdf', eyebrow: 'Groundwork', pdfFoot: 'Birch(TM) by Grow With Grounded. growwithgrounded.com/birch',
          docTitle: who.name ? who.name + '\'s Groundwork' : 'My Groundwork', foot: 'Kept with Birch by Grow With Grounded. These words belong to the person who wrote them.', sections: sections };
      },
      say: { saved: 'Saved in your notebook.', blank: 'Left blank. Come back any time.', opened: 'Open. Pause any time.', closed: 'Closed. What you wrote stays in your notebook.',
        pickEmpty: 'Write in a chapter or mark a skill first, and it can be saved or printed here.', removeAsk: 'Remove what is written here? This cannot be undone unless you have a backup.' },
      onAct: function (act, b, api) {
        var id = b.getAttribute('data-id') || '';
        if (act === 'how') { api.NB.how = api.NB.how === id ? null : id; api.render(); return; }
        if (act === 'guide') { ctx.openHome('guide:' + id); return; }
        if (act === 'morelines') { linesWhich = 'hurt'; api.render(); return; }
      },
      // gwSkill 2101
      onChange: function (b, api, L) {
        if (!L || b.getAttribute('data-nbc') !== 'skill') return;
        var id = b.value, on = b.checked, x = skillsAll().filter(function (y) { return y.id === id; })[0];
        if (on) L.skills[id] = { done: N.todayKey(), t: x ? x.t : '' }; else delete L.skills[id];
        var fresh = on ? checkMiles(tendState(data())).filter(function (m) { return m !== 'bonus'; }) : [];
        api.persist().then(function () { api.render(); ctx.toast(fresh.length ? 'New milestone: ' + mileName(fresh[0]) : on ? 'Marked. That is one more thing you can do.' : 'Unmarked. Everything is kept.'); });
      }
    });
    // A Help lines tap starts on the calm list each time (showCalm opens with it).
    h.api.root.addEventListener('click', function (e) { var b = e.target.closest('[data-nb="lines"]'); if (b) linesWhich = 'calm'; }, true);
    return h;
  }

  /* ---------- Oak: Groundwork From Birch, read and print (oak/index.html 2889 to 2975) ---------- */
  function openOak(ctx) {
    var N = window.GGScrNotebook, esc = N.esc, GW = window.BIRCH_GROUNDWORK || null;
    N.css();
    var who = (GGP.get && GGP.get(ctx.id)) || {};
    var birchRec = function () { if (!window.GGP || !GGP.isOpen(ctx.id)) return null; var all = GGP.data(ctx.id); return all && all.birch && typeof all.birch === 'object' ? all.birch : null; };
    function gwData() {
      var b = birchRec(), g = b && b.groundwork; if (!g || typeof g !== 'object') return null;
      var A = g.answers || {}, F = (g.fromPine || {}).answers || {}, K = g.skills || {};
      var n = Object.keys(A).filter(function (k) { return String((A[k] || {}).text || '').trim(); }).length + Object.keys(F).length + Object.keys(K).filter(function (k) { return K[k] && K[k].done; }).length;
      return n ? g : null;
    }
    var gwPlain = function () { var b = birchRec(); return !!(b && b.wording === 'plain'); };
    var T = function (c, k) { return (gwPlain() && c['plain' + k[0].toUpperCase() + k.slice(1)]) || c[k] || ''; };
    // gwSections 2922
    function sections(g) {
      var A = g.answers || {}, out = [], used = {}, has = function (id) { return A[id] && String(A[id].text || '').trim(); };
      var F = (g.fromPine || {}).answers || {};
      if (Object.keys(F).length) out.push({ title: 'From Pine', items: Object.keys(F).map(function (pid) { return { q: F[pid].q || '', text: F[pid].text || '', by: 'Written in Pine' + (F[pid].date ? ', ' + N.fmtDate(F[pid].date) : '') }; }) });
      ((GW && GW.chapters) || []).filter(function (c) { return !c.fromPine; }).forEach(function (c) {
        var its = (c.prompts || []).filter(function (p) { return has(p.id); }).map(function (p) { used[p.id] = 1; var a = A[p.id]; return { q: (gwPlain() && p.plain) || p.t || a.q || '', text: a.text, by: (a.date ? N.fmtDate(a.date) : '') + (a.when ? '. ' + (c.whenLabel || 'By when').replace(/ \(optional\)$/, '') + ' ' + N.fmtDate(a.when) : '') }; });
        if (its.length) out.push({ title: T(c, 'title'), items: its });
      });
      var rest = Object.keys(A).filter(function (k) { return has(k) && !used[k]; });
      if (rest.length) out.push({ title: GW ? 'More From My Notebook' : 'My Notebook', items: rest.map(function (k) { return { q: A[k].q || '', text: A[k].text, by: A[k].date ? N.fmtDate(A[k].date) : '' }; }) });
      var K = g.skills || {}, all = [];
      if (GW && GW.skills) Object.keys(GW.skills).forEach(function (ch) { (GW.skills[ch] || []).forEach(function (x) { if (K[x.id] && K[x.id].done) all.push({ t: x.t, d: K[x.id].done }); }); });
      else Object.keys(K).forEach(function (id) { if (K[id] && K[id].done) all.push({ t: K[id].t || id, d: K[id].done }); });
      return { out: out, skills: all, skillsTitle: (GW && GW.skillsTitle) || 'Skills I\'ve Got' };
    }
    var root = document.createElement('div'); root.className = 'ggnb ggscr-gwoak'; ctx.host.appendChild(root);
    var art = '<figure class="ggnb-art"><img src="/shared/heroes/birch-wide.webp" alt="" loading="lazy"><figcaption>Your Groundwork Notebook<small>Written in Birch, kept in your profile</small></figcaption></figure>';
    // renderGround 2944
    function render() {
      var g = gwData();
      if (!g) { root.innerHTML = art + '<p class="ggnb-lead">Your Groundwork notebook from Birch shows here, ready to read and print, once something is written in it.</p>'; return; }
      var S = sections(g);
      root.innerHTML = art + '<h2>Your Groundwork Notebook</h2><p class="ggnb-lead">Written in Birch, and kept there in your profile. Here you can read it and print it.</p>' +
        S.out.map(function (x) { return '<h3 class="ggnb-h3">' + esc(x.title) + '</h3>' + x.items.map(function (a) { return '<article class="ggnb-p has"><h3>' + esc(a.q) + '</h3><div class="ggnb-ans">' + N.nl(a.text) + '</div>' + (a.by ? '<p class="ggnb-small">' + esc(a.by) + '</p>' : '') + '</article>'; }).join(''); }).join('') +
        (S.skills.length ? '<h3 class="ggnb-h3">' + esc(S.skillsTitle) + '</h3><ul class="ggnb-planlist">' + S.skills.map(function (x) { return '<li>' + esc(x.t) + ' <span class="ggnb-small">' + esc(N.fmtDate(x.d)) + '</span></li>'; }).join('') + '</ul>' : '') +
        '<div class="ggnb-acts"><button type="button" class="hm-btn sm" data-nb="printall">Save or Print My Groundwork</button></div>';
    }
    // gwPrintAll 2957
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-nb="printall"]'); if (!b) return;
      var g = gwData(); if (!g) { ctx.toast('Open your profile first.'); return; }
      var S = sections(g), secs = S.out.map(function (x) { return { title: x.title, html: x.items.map(function (a) { return '<h3 class="sq-legq">' + esc(a.q) + '</h3><p class="sq-lega">' + N.nl(a.text) + '</p>' + (a.by ? '<p class="sq-legby">' + esc(a.by) + '</p>' : ''); }).join('') }; });
      if (S.skills.length) secs.push({ title: S.skillsTitle, html: '<ul class="sq-planlist">' + S.skills.map(function (x) { return '<li>' + esc(x.t) + ' <span class="sq-legby">' + esc(N.fmtDate(x.d)) + '</span></li>'; }).join('') + '</ul>' });
      N.sheet(ctx, { title: 'Groundwork', file: 'groundwork.pdf', eyebrow: 'Groundwork', foot: 'Birch(TM) by Grow With Grounded. growwithgrounded.com/birch',
        html: N.docHtml({ title: who.name ? who.name + '\'s Groundwork' : 'My Groundwork', sections: secs, foot: 'Kept with Birch by Grow With Grounded, and printed from Oak. These words belong to the person who wrote them.' }) }, root);
    });
    render();
    return { close: function () { root.remove(); } };
  }

  window.GGScreen.ground = {
    files: function (tree) { return [GW_JS].concat(tree === 'oak' ? [] : BIRCH, COMMON); },
    title: function (tree) { return tree === 'oak' ? 'Groundwork From Birch' : 'Groundwork'; },
    trees: ['birch', 'oak'],
    open: function (ctx) { return ctx.tree === 'oak' ? openOak(ctx) : openBirch(ctx); }
  };
})();
