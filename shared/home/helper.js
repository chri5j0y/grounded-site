/* =====================================================================
   GROW WITH GROUNDED . HELPING SOMEONE, IN HOME (shared/home/helper.js), GWG BLD 912 Round 2
   (c) 2026 Grow With Grounded LLC.
   The helper view of Oak, Birch, and Sequoia (/<tree>/#for=<id>), run in Home's own window: no tree page, no iframe,
   nothing from a tree page's DOM or globals. Contract: grounded-workshop patches/bld912/CONTRACT-R2.md.
   A helper is a grown-up the person added in their own Tree Settings (Add a Helper). The helper opens the person's tree
   with their own passcode and sees only what the person shares (<tree>.share, set in What Helpers See).
   Ported from the trees (line numbers as of BLD 911):
     oak       oak/index.html   SHARE_DEF 2978, shareOf 2986, helpedWithOak 2987, helpFromHash 3035,
                                renderHelpBanner 3039, helpLevels 3046, renderHelpTabs 3049, renderHelpPlan 3064
     birch     birch/app.js     SHARE_DEF 1928, shareOf 1936, helpedWithBirch 1937, helpFromHash 1985,
                                renderHelpBanner 1989, helpLevels 1996, renderHelpTabs 1999, renderHelpPlan 2014
     sequoia   sequoia/app.js   SHARE_DEF 1879, shareOf 1887, helpedWithSequoia 1788, sqRec 1761 (sqNamesForward 1747),
                                helpFromHash 1933, renderHelpBanner 1937, helpLevels 1944, renderHelpTabs 1947,
                                renderHelpPlan 1966, the Legacy Book 1983 (legRec 1993, legWritten 2000)
   What it shows, by share setting, exactly as the trees do:
     tree    the person's tree: each part's level from the latest check-in (stLevel 1513: Strong 8 and up, Steady 5 and
             up, Growing Edge below 5, Not sure yet), and the eight newest check-ins with who answered.
             Off: "<name> keeps their tree private."
     faith   Roots shows in the levels, the notes, and the plan only when this is on.
     notes   the "Sit with this" notes from the latest check-in (with tree on).
     plan    the practices in tend.plan, by part. Off: "<name> keeps their growth plan private."
     legacy  (Sequoia) the written pages of the Legacy Book.
   Read only: this module saves nothing and changes nothing, in either profile.
   API: GGScreen.helper.open(ctx) with ctx.forId (the person helped); GGScreen.helper.treesFor(forId) the trees this
   helper may open for that person (sequoia, birch, oak, in the order gg-profiles.js checks them, 1247 to 1250);
   GGScreen.helper.can(helperId, forId, tree) true when this helper may open that tree.
   Differences from the tree, on purpose: Check In Together (startCheckin 'tapped' and startQuick 'tapped'), Sequoia's
   I'm Answering From What I See and A Check-in for You, and writing in the Legacy Book while the person tells, stay with
   the tree page for now (Home's check-in modules run the person's own check-in only, shared/checkin/oak.js 17); the
   Legacy Book shows its written pages here instead of a button into the book. The plan lists the person's own
   practices too (tend.plan[part].own, such as a visit card's), which the tree's list leaves out, and Birch's Plain
   practice names follow the person's wording (the tree used the helper's own). The lines that point to a check-in
   together say what the helper sees instead.
   ===================================================================== */
(function () {
  'use strict';
  window.GGScreen = window.GGScreen || {};
  if (window.GGScreen.helper) return;
  var TREES = ['oak', 'birch', 'sequoia'];
  var NAME = { oak: 'Oak', birch: 'Birch', sequoia: 'Sequoia' };
  var ORDER = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];   // PART_ORDER, each tree
  var PART = { roots: 'Roots', trunk: 'Trunk', bark: 'Bark', branches: 'Branches', leaves: 'Leaves', fruit: 'Fruit' };   // PARTS part
  var WORD = { roots: 'What grounds you', trunk: 'Purpose', bark: 'Mind and feelings', branches: 'Relationships', leaves: 'Body', fruit: 'Hope' };   // DOMAIN_DEFS name
  var SHARE_DEF = {
    oak: { tree: true, plan: true, faith: false, notes: false },
    birch: { tree: true, plan: true, faith: false, notes: false },
    sequoia: { tree: true, plan: true, legacy: false, faith: false, notes: false }
  };
  var SQ_RENAMED = { 'Peace With the Past': 'Peace with the Past', 'Read With a Child': 'Read with a Child' };   // sequoia/app.js 1746

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function clone(o) { return o == null ? o : JSON.parse(JSON.stringify(o)); }
  function arr(x) { return Array.isArray(x) ? x : []; }
  function css(id, text) { if (document.getElementById(id)) return; var st = document.createElement('style'); st.id = id; st.textContent = text; document.head.appendChild(st); }
  // formatDate (birch/app.js 113, sequoia/app.js 132)
  function formatDate(iso) { if (!iso) return ''; var d = new Date(String(iso).slice(0, 10) + 'T00:00:00'); return isNaN(d) ? String(iso) : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); }
  var stLevel = function (sc) { return sc == null ? 'Not sure yet' : sc >= 8 ? 'Strong' : sc >= 5 ? 'Steady' : 'Growing Edge'; };   // 1513
  function stShown(e, k) { return (e.unsure || []).indexOf(k) >= 0 ? null : (e.scores || {})[k]; }   // 3184

  /* ---------- who may open what ---------- */
  function helping(helperId) {
    if (!window.GGP || !GGP.helping) return [];
    var a = GGP.active && GGP.active(); if (!a || a.id !== helperId || a.age !== 'adult') return [];
    return GGP.helping() || [];
  }
  // helpedWithOak 2987, helpedWithBirch 1937, helpedWithSequoia 1788
  function can(helperId, forId, tree) {
    if (TREES.indexOf(tree) < 0 || !forId || forId === helperId) return false;
    if (helping(helperId).indexOf(forId) < 0 || !GGP.isOpen(forId)) return false;
    var all = GGP.data(forId) || {}; return !!(all[tree] && all[tree].helpersOn);
  }
  function treesFor(forId) {
    var a = window.GGP && GGP.active && GGP.active(); if (!a) return [];
    return ['sequoia', 'birch', 'oak'].filter(function (t) { return can(a.id, forId, t); });
  }
  function shareOf(forId, tree) { var d = GGP.data(forId, tree) || {}; return Object.assign({}, SHARE_DEF[tree], d.share || {}); }

  /* ---------- the person's record, read without changing it ---------- */
  // sqNamesForward 1747, on a copy: Sequoia reads two renamed practice names forward
  function namesForward(d) {
    var fix = function (x, depth) {
      if (!x || typeof x !== 'object' || depth > 30) return;
      Object.keys(x).forEach(function (k) {
        var v = x[k];
        if (typeof v === 'string') { var i = v.indexOf('|'), n = i >= 0 ? v.slice(i + 1) : v; if (SQ_RENAMED[n]) x[k] = (i >= 0 ? v.slice(0, i + 1) : '') + SQ_RENAMED[n]; }
        else fix(v, depth + 1);
        var j = k.indexOf('|'), kn = j >= 0 ? k.slice(j + 1) : k;
        if (SQ_RENAMED[kn]) { var nk = (j >= 0 ? k.slice(0, j + 1) : '') + SQ_RENAMED[kn]; if (x[nk] == null) x[nk] = x[k]; delete x[k]; }
      });
    };
    if (!d.nm745) fix(d, 0);
    return d;
  }
  function recOf(forId, tree) {
    var d = clone(GGP.data(forId, tree) || {});
    if (tree === 'sequoia') namesForward(d);
    if (!Array.isArray(d.history)) d.history = [];
    return d;
  }
  // Birch Plain practice names (plainOf 97, shownName 102), in the person's own wording
  function shownName(forId, tree, k, n) {
    if (tree !== 'birch' || (GGP.data(forId, 'birch') || {}).wording !== 'plain') return n;
    var SP = window.BIRCH_PRACTICES || {}, G = Object.assign({}, SP.GUIDES || SP.guides || {}, SP.G || {}), PL = SP.PLAIN || SP.plain || {};
    var p = PL[k + '|' + n] || (G[k + '|' + n] || {}).plain || null; return (p && (p.n || p.name)) || n;
  }
  function byLabel(tree, by) {
    if (tree === 'sequoia') { var L = ((window.SEQUOIA_CHECKIN || {}).answeredBy) || [['self', 'They answered'], ['tapped', 'They answered, I tapped'], ['observed', 'I\'m answering from what I see']]; for (var i = 0; i < L.length; i++) if (L[i][0] === by) return L[i][1]; return ''; }   // BY_LABEL 361
    return { self: 'They answered', tapped: 'They answered, a helper tapped' }[by] || '';   // BY_LABEL oak 2984, birch 1935
  }

  /* ---------- the sections ---------- */
  // d.part and d.name as the trees set them from shared/gg-parts.js (oak/index.html 1354, birch/app.js 211, sequoia/app.js
  // 212): "Bark: Mind" and its meaning. In the helper view Oak and Sequoia show the faith words (Oak's birchRec is empty
  // while helping, 2898); Birch follows the Plain wording (here the person's own, birch/app.js isPlain 329).
  function wordOpt(forId, tree) { var pl = tree === 'birch' && (GGP.data(forId, 'birch') || {}).wording === 'plain'; return { plain: function () { return pl; } }; }
  function label(forId, tree, k) { var G = window.GGParts; return G && G.label ? G.label(k, wordOpt(forId, tree)) : PART[k]; }
  function meaning(forId, tree, k) { var G = window.GGParts, m = G && G.meaning ? G.meaning(k, wordOpt(forId, tree)) : WORD[k]; return m.charAt(0).toUpperCase() + m.slice(1); }
  function partsShown(sh) { return ORDER.filter(function (k) { return k !== 'roots' || sh.faith; }); }
  function treeHtml(forId, tree, d, sh, n) {
    if (!sh.tree) return '<section class="gghp-card" data-gghp="tree-private"><p>' + n + ' keeps their tree private.</p></section>';
    var own = d.history.filter(function (e) { return e && e.scores && !e.from && (tree !== 'sequoia' || e.kind !== 'observed'); }), last = own[own.length - 1];
    var h = '<section class="gghp-card" data-gghp="tree"><h3>' + n + '\'s Tree</h3>';
    if (last) {
      var how = tree === 'sequoia' ? (last.by && last.by !== 'self' ? ', ' + esc(byLabel(tree, last.by).toLowerCase()) : '') : (last.by === 'tapped' ? ', taken together' : '');
      h += '<p class="gghp-small">From the check-in on ' + esc(formatDate(last.date)) + how + '.</p>';
      h += '<ul class="gghp-lvls" data-gghp="levels">' + partsShown(sh).map(function (k) { return '<li data-part="' + k + '"><span class="gghp-dot" style="background:var(--' + k + ')" aria-hidden="true"></span><b>' + esc(label(forId, tree, k)) + '</b><span class="gghp-pill">' + stLevel(stShown(last, k)) + '</span></li>'; }).join('') + '</ul>';
    } else h += '<p>' + n + '\'s first check-in will show here.</p>';
    if (own.length) h += '<h4>Check-ins</h4><ul class="gghp-hist" data-gghp="checkins">' + own.slice().reverse().slice(0, 8).map(function (e) {
      var who = tree === 'sequoia' ? (e.by && e.by !== 'self' ? ', ' + esc(byLabel(tree, e.by)) + (e.helper ? ' (' + esc(e.helper) + ')' : '') : '') : (e.by === 'tapped' ? ', ' + esc(byLabel(tree, 'tapped')) + (e.helper ? ' (' + esc(e.helper) + ')' : '') : '');
      return '<li><b>' + esc(formatDate(e.date)) + '</b><span>' + (e.type === 'quick' ? 'Quick' : 'Full') + who + '</span></li>';
    }).join('') + '</ul>';
    if (sh.notes && last && last.reflections) {
      var notes = partsShown(sh).filter(function (k) { return String(last.reflections[k] || '').trim(); });
      if (notes.length) h += '<div data-gghp="notes">' + notes.map(function (k) { return '<p class="gghp-small"><b>' + esc(label(forId, tree, k)) + ':</b> ' + esc(last.reflections[k]) + '</p>'; }).join('') + '</div>';
    }
    if (tree === 'sequoia') { var seen = d.history.filter(function (e) { return e && e.kind === 'observed'; }); if (seen.length) h += '<p class="gghp-small">' + seen.length + ' check-in' + (seen.length === 1 ? '' : 's') + ' answered from what a helper sees, kept apart.</p>'; }
    return h + '</section>';
  }
  function planHtml(forId, tree, d, sh, n) {
    if (!sh.plan) return '<section class="gghp-card" data-gghp="plan-private"><h3>' + n + '\'s Growth Plan</h3><p>' + n + ' keeps their growth plan private.</p></section>';
    var plan = (d.tend && d.tend.plan) || null;
    if (!plan) return '<section class="gghp-card" data-gghp="plan-empty"><h3>' + n + '\'s Growth Plan</h3><p>' + n + '\'s practices show here once ' + n + ' chooses them.</p></section>';
    var parts = partsShown(sh).map(function (k) {
      var x = plan[k] || {}, names = arr(x.selected).map(function (nm) { return shownName(forId, tree, k, nm); }).concat(x.custom ? [x.custom] : [], arr(x.own), arr(x.lib).map(function (l) { return l && l.n; }).filter(Boolean));
      if (!names.length) return '';
      return '<div class="gghp-part" data-part="' + k + '" style="border-left-color:var(--' + k + ')"><div class="gghp-ph"><b style="color:var(--' + k + ')">' + esc(label(forId, tree, k)) + '</b><span>' + esc(meaning(forId, tree, k)) + '</span></div><ul>' + names.map(function (nm) { return '<li>' + esc(nm) + '</li>'; }).join('') + '</ul></div>';
    }).join('');
    return '<section class="gghp-card" data-gghp="plan"><h3>' + n + '\'s Growth Plan</h3><p>' + n + '\'s practices. You can do them together.</p>' + (parts || '<p class="gghp-small">' + n + '\'s practices show here once ' + n + ' chooses them.</p>') + '</section>';
  }
  // Sequoia's Legacy Book (legRec 1993, legWritten 2000): the written pages, read only
  function legacyHtml(forId, d, sh, n) {
    if (!sh.legacy) return '';
    var LEG = window.SEQUOIA_LEGACY || { chapters: [] }, L = d.legacy || {}, A = L.answers || {};
    var written = function (c) { return (c.prompts || []).filter(function (p) { return A[p.id] && String(A[p.id].text || '').trim(); }); };
    var chs = (LEG.chapters || []).map(function (c) { return { c: c, ps: written(c) }; }).filter(function (x) { return x.ps.length; });
    var total = chs.reduce(function (t, x) { return t + x.ps.length; }, 0);
    var h = '<section class="gghp-card" data-gghp="legacy"><h3>' + n + '\'s Legacy Book</h3><p class="gghp-small">' + (total ? total + ' ' + (total === 1 ? 'page' : 'pages') + ' written so far.' : 'Ready when ' + n + ' is. One story is enough to start.') + '</p>';
    h += chs.map(function (x) {
      return '<details class="gghp-ch"><summary>' + esc(x.c.title) + ' <span class="gghp-small">(' + x.ps.length + ' of ' + (x.c.prompts || []).length + ' written)</span></summary>' + x.ps.map(function (p) {
        var a = A[p.id]; return '<article class="gghp-page"><h4>' + esc(p.t) + '</h4><div class="gghp-ans">' + esc(a.text).replace(/\n/g, '<br>') + '</div><p class="gghp-small">' + esc(a.date ? formatDate(a.date) : '') + (a.told ? ', told to ' + esc(a.told) : '') + '</p></article>';
      }).join('') + '</details>';
    }).join('');
    return h + '</section>';
  }

  var CSS = '.gghp{color:var(--ink);line-height:1.55;font-size:16.5px;max-width:760px;margin:0 auto;overflow-wrap:anywhere}.gghp *{box-sizing:border-box}' +
    '.gghp-art{position:relative;margin:0 0 14px;border-radius:var(--r,22px);overflow:hidden;background:var(--bg-deep);aspect-ratio:16/6}.gghp-art img{display:block;width:100%;height:100%;object-fit:cover}' +
    '.gghp-art figcaption{position:absolute;left:0;right:0;bottom:0;padding:26px 18px 12px;background:linear-gradient(transparent,rgba(20,14,8,.72));color:#fff}' +
    '.gghp-art figcaption small{display:block;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;opacity:.92}.gghp-art figcaption b{display:block;font-family:"Barlow Condensed",sans-serif;font-size:28px;line-height:1.1}' +
    '@media (max-width:560px){.gghp-art{aspect-ratio:16/9}.gghp-art figcaption b{font-size:23px}}' +
    '.gghp-banner{padding:12px 16px;border-radius:16px;background:var(--today-s,var(--card-2));border:1px solid var(--gold-soft);margin:0 0 14px}.gghp-banner p{margin:0}' +
    '.gghp-card{padding:14px 16px;border-radius:18px;background:var(--card);border:1px solid var(--line);box-shadow:var(--shadow);margin:0 0 14px}.gghp-card h3{margin:0 0 8px;font-size:19px}.gghp-card h4{margin:14px 0 6px;font-size:16px}.gghp-card p{margin:0 0 8px}' +
    '.gghp-small{font-size:14.5px;color:var(--ink-soft)}' +
    '.gghp-lvls,.gghp-hist{list-style:none;margin:0;padding:0}.gghp-lvls li{display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid var(--line)}.gghp-lvls li:first-child{border-top:0}' +
    '.gghp-dot{width:14px;height:14px;border-radius:50%;flex:0 0 auto}.gghp-pill{margin-left:auto;font-size:14px;font-weight:700;padding:2px 10px;border-radius:999px;background:var(--card-2);border:1px solid var(--line)}' +
    '.gghp-hist li{display:flex;flex-wrap:wrap;gap:4px 14px;padding:7px 0;border-top:1px solid var(--line);font-size:15px}.gghp-hist li span{color:var(--ink-soft)}' +
    '.gghp-part{border-left:5px solid var(--line);padding:6px 0 6px 12px;margin:10px 0}.gghp-ph{display:flex;flex-wrap:wrap;gap:4px 10px;align-items:baseline}.gghp-ph span{font-size:14px;color:var(--ink-soft)}.gghp-part ul{margin:4px 0 0;padding-left:20px}' +
    '.gghp-ch{margin:8px 0;padding:8px 0;border-top:1px solid var(--line)}.gghp-ch summary{cursor:pointer;font-weight:600}.gghp-page{margin:10px 0 0}.gghp-page h4{margin:0 0 4px}.gghp-ans{padding:10px 12px;border-radius:12px;background:var(--card-2);margin:0 0 4px}';

  function open(ctx) {
    var tree = ctx.tree, forId = ctx.forId, root = document.createElement('div');
    css('ggscr-helper-css', CSS);
    root.className = 'gghp'; ctx.host.appendChild(root);
    var p = (forId && GGP.get && GGP.get(forId)) || {}, n = esc(p.name || 'them'), nm = NAME[tree] || 'tree';
    var h = '<figure class="gghp-art"><img src="/shared/heroes/p/helper-figure-wide.webp" alt="" loading="lazy"><figcaption><small>Helping ' + esc(p.name || '') + '</small><b>' + esc(p.name || 'Their') + '\'s ' + esc(nm) + '</b></figcaption></figure>';
    if (!can(ctx.id, forId, tree)) {
      root.innerHTML = h + '<section class="gghp-card" data-gghp="closed"><p>' + n + ' chooses who helps, in their own ' + esc(nm) + ' settings. When ' + n + ' adds you as a helper and turns on Let Helpers Open My ' + esc(nm) + ', ' + n + '\'s tree opens here with your own passcode.</p></section>';
      return { close: function () { root.remove(); } };
    }
    var d = recOf(forId, tree), sh = shareOf(forId, tree);
    h += '<div class="gghp-banner" role="note"><p><b>You are helping ' + n + '.</b> You see only what ' + n + ' chooses to share.</p></div>';
    h += treeHtml(forId, tree, d, sh, n) + planHtml(forId, tree, d, sh, n) + (tree === 'sequoia' ? legacyHtml(forId, d, sh, n) : '');
    h += '<section class="gghp-card gghp-rest" data-gghp="rest"><p class="gghp-small">' + n + '\'s weeks and seasons stay on ' + n + '\'s own screen. Here you see what ' + n + ' shares.</p></section>';
    root.innerHTML = h;
    return { close: function () { root.remove(); } };
  }

  GGScreen.helper = {
    trees: TREES.slice(),
    title: function (tree, extra) { var p = extra && extra.forId && window.GGP && GGP.get ? GGP.get(extra.forId) : null; return p && p.name ? 'Helping ' + p.name : 'Helping'; },
    files: function (tree) { return tree === 'birch' ? ['/birch/practices.js?v=b949'] : tree === 'sequoia' ? ['/sequoia/checkin.js?v=b929', '/sequoia/legacy.js?v=b949'] : []; },
    treesFor: treesFor, can: can, shareOf: shareOf,
    open: open
  };
})();
