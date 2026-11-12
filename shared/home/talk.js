/* =====================================================================
   HOME . THE KIDS' WHEN LIFE CHANGES TALKS (shared/home/talk.js), GWG BLD 912 Round 2
   GGScreen.talk: one Maple or Aspen guide (#talk=<id>), read right here in Home's window, in the tree's own order
   and words. Home opens it with ctx.talk (the guide id).
   Maple: maple/index.html openTalk 3238 to 3279, guides from maple/guides.js (MAPLE_GUIDES), activity titles from
   ACTIVITIES (1181, carried in shared/home/kidsdata.js) plus maple/life.js additions (1391), the videos list MV_VIDS (3299).
   Aspen: aspen/index.html renderGuide 2333 to 2358, guides from aspen/guides.js (ASPEN_GUIDES), AV_VIDS (2380).
   The two videos play in Home's own player (data-hm-gside, home/home.js playGuide). Read Aloud uses read.js, and
   Save or Print makes the same PDF the tree makes (shared/home/kidkit.js). Nothing here is saved.
   ===================================================================== */
(function () {
  window.GGScreen = window.GGScreen || {};
  var V = 'b912';
  var CSS = '.ggt{line-height:1.55;}.ggt h2{font-family:\'Cormorant Garamond\',Georgia,serif;font-size:30px;line-height:1.15;margin:4px 0 10px;}' +
    '.ggt h3{font-family:\'Cormorant Garamond\',Georgia,serif;font-size:22px;margin:20px 0 6px;}.ggt h4{font-size:16px;margin:12px 0 6px;}' +
    '.ggt p{margin:0 0 8px;}.ggt ul{margin:0 0 8px;padding-left:20px;}.ggt li{margin:3px 0;}' +
    '.ggt-band{display:block;width:100%;height:120px;object-fit:cover;border-radius:18px;margin:0 0 12px;}' +
    '.ggt-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:0 0 12px;}.ggt-row .ggt-end{margin-left:auto;}' +
    '.ggt-tag{display:inline-block;font-size:13px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--rc,var(--gold));}' +
    '.ggt-vids p{font-size:14px;color:var(--ink-soft);margin:6px 0 12px;}.ggt-w{font-size:12px;opacity:.8;margin-left:4px;}' +
    '.ggt .quick-box,.ggt .quick{padding:14px 16px;border-radius:16px;background:var(--card-2);border-left:5px solid var(--rc,var(--gold));margin:0 0 12px;}' +
    '.ggt .quick-box>b{display:block;margin-bottom:6px;}.ggt .quick h3{margin-top:0;}' +
    '.ggt .two-col{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:14px;}.ggt .two-col>div>b{display:block;margin-bottom:4px;}' +
    '.ggt .say-lines p{padding-left:12px;border-left:3px solid var(--gold);font-style:italic;}' +
    '.ggt .qa{margin:0 0 10px;}.ggt .qa b{display:block;}' +
    '.ggt .reach-box{padding:12px 14px;border-radius:14px;background:var(--card-2);}' +
    '.ggt .talk-note{font-size:13px;color:var(--ink-soft);margin-top:16px;}.ggt .muted{color:var(--ink-soft);}.ggt .small{font-size:14px;}' +
    '.ggt a{color:var(--gold);overflow-wrap:anywhere;}.ggt .mp-life-lines,.ggt .as-life-lines{margin-top:16px;}.ggt .mp-life-lines small,.ggt .as-life-lines small{display:block;color:var(--ink-soft);}';
  var SRC = { maple: ['/maple/guides.js?v=b934', 'MAPLE_GUIDES'], aspen: ['/aspen/guides.js?v=b934', 'ASPEN_GUIDES'] };

  function topicOf(tree, id) {
    if (tree === 'maple') { var T = (window.MAPLE_GUIDES || {}).topics || []; for (var i = 0; i < T.length; i++) if (T[i].id === id) return { t: T[i] }; return null; }
    var out = null; ((window.ASPEN_GUIDES || {}).groups || []).forEach(function (g) { (g.topics || []).forEach(function (x) { if (x.id === id) out = { t: x, grp: g }; }); });
    return out;
  }
  function plainOf(ctx) {
    // maple/index.html kidWording 1460 and plainLocked 1454; aspen/index.html wordingOf 1167.
    var all = {}; try { all = GGP.data(ctx.id) || {}; } catch (e) {}
    var r = all[ctx.tree] || {}, s = (ctx.tree === 'maple' ? r.kid : r.student) || {};
    if (s.plainLock === true || r.plainLock === true) return true;
    if (ctx.tree === 'maple') return s.wording === 'plain';
    return (s.wording || r.wording) === 'plain';
  }

  /* ---------- Maple (maple/index.html openTalk 3238) ---------- */
  function mapleHtml(ctx, id, plain) {
    var K = GGKidKit, esc = K.esc, D = window.GGKidData.maple, G = window.MAPLE_GUIDES || {};
    var t0 = topicOf('maple', id).t, plainT = !!(t0.plain && plain), t = plainT ? Object.assign({}, t0, t0.plain) : t0;
    // ringBy (1157): the guide's ring, or Living Sober's from shared/gg-life.js.
    var r = (G.rings || []).filter(function (x) { return x.key === t.ring; })[0] || (t.ring === 'sober' && window.GGLife && GGLife.ring ? GGLife.ring('maple') : null) || { name: '', color: 'var(--gold)' };
    // actTitle (1158), in the wording in use (actW 1468: Bedtime Blessing reads Bedtime Kind Words in Plain).
    var actTitle = function (a) { var x = D.acts[a] || (D.lifeActs || {})[a]; return x ? (plain && x[1] ? x[1] : x[0]) : a; };
    var list = function (a) { return '<ul>' + (a || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; };
    var vids = '';
    if (D.vids.indexOf(id) >= 0) {
      var b = function (side, name) { var w = K.watched('maple', 'mp-g-' + id + '-' + side);
        return '<button type="button" class="hm-btn sm ' + (side === 'helper' ? '' : 'line ') + 'hm-pill" data-hm-gside="' + esc(id) + '|' + side + '|maple">' + (w ? '&#10003;' : '&#9654;') + ' Watch: ' + name + (w ? ' <span class="ggt-w">Watched</span>' : '') + '</button>'; };
      vids = '<div class="ggt-vids no-print"><div class="ggt-row">' + b('you', 'For You') + b('helper', 'For the Grown-up') + '</div>' +
        '<p>For You, for the child going through it. For the Grown-up, for the parent or helper beside them. A few minutes each, narrated aloud.</p></div>';
    }
    return '<article class="ggt talk" style="--rc:' + esc(r.color) + '">' +
      '<div class="ggt-row no-print"><button type="button" class="hm-linkbtn" data-ggt="back">Back to all guides</button>' +
      '<button type="button" class="hm-btn sm line hm-pill ggt-end" data-ggt="print">Save or Print This Guide</button></div>' +
      '<span class="ggt-tag ring-tag">' + esc(r.name) + '</span>' +
      '<h2>' + esc(t.title) + '</h2>' + vids +
      '<div class="quick-box"><b>Quick Reference</b>' + list(t.quick) + '</div>' +
      '<h3>Talking It Through</h3><h4>What this can look like</h4>' +
      '<div class="two-col"><div><b>Grades K to 2</b><p>' + esc(t.k2) + '</p></div><div><b>Grades 3 to 5</b><p>' + esc(t.g35) + '</p></div></div>' +
      '<h3>Before you talk</h3>' + list(t.before) +
      '<h3>How to start</h3><div class="say-lines">' + (t.start || []).map(function (s) { return '<p>' + esc(s) + '</p>'; }).join('') + '</div>' +
      '<h3>Questions kids often ask</h3>' + (t.asks || []).map(function (qa) { return '<div class="qa"><b>“' + esc(qa[0]) + '”</b>' + esc(qa[1]) + '</div>'; }).join('') +
      '<div class="two-col" style="margin-top:14px"><div><b>What helps</b>' + list(t.helps) + '</div><div><b>What to leave out</b>' + list(t.avoid) + '</div></div>' +
      '<h3>' + (plainT ? 'What steadies a family' : 'Faith and the holy') + '</h3><p>' + esc(t.faith) + '</p>' +
      '<h3>Using Maple</h3><p>Parts of the tree that often get rainy: <b>' + esc(t.rainy) + '</b>. Activities that can help: ' + (t.acts || []).map(actTitle).map(esc).join(', ') + '. A new check-in in a few weeks can show how your child is doing.</p>' +
      '<h3>The days and weeks after</h3>' + list(t.after) +
      '<h3>For teachers</h3>' + list(t.teach) +
      '<h3>When to reach out for more help</h3><div class="reach-box">' + list(t.reach) + '</div>' +
      '<h3>Learn more</h3><ul>' + (t.more || []).map(function (m) { return '<li><a class="text-link" href="' + m[1] + '" target="_blank" rel="noopener">' + esc(m[0]) + '</a></li>'; }).join('') + '</ul>' +
      (window.GGShelf ? GGShelf.html('maple', t.id) : '') +
      (window.GGSources ? GGSources.html('maple:' + t.id) : '') +
      '<p class="talk-note">From When Life Changes in Maple&trade; by Grow With Grounded. General guidance that works alongside professional care. &copy; ' + new Date().getFullYear() + ' ' + K.OWNER + '. Yours to print for families and classrooms.</p>' +
      K.lifeLines('maple', ctx.id, 'mp-life-lines', 'gt-small', 'For information and support. In an emergency, call 911. In a crisis, call or text 988.') +
      '</article>';
  }

  /* ---------- Aspen (aspen/index.html renderGuide 2333) ---------- */
  function aspenHtml(ctx, id) {
    var K = GGKidKit, esc = K.esc, D = window.GGKidData.aspen, f = topicOf('aspen', id), t = f.t, grp = f.grp;
    // Aspen's guide words carry their own links, so its lists are written as they are (list 2346).
    var list = function (a) { return a && a.length ? '<ul>' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' : ''; };
    var vids = '';
    if (D.vids.indexOf(id) >= 0) {
      var b = function (side, name) { var w = K.watched('aspen', 'as-g-' + id + '-' + side);
        return '<button type="button" class="hm-btn sm ' + (side === 'helper' ? '' : 'line ') + 'hm-pill" data-hm-gside="' + esc(id) + '|' + side + '|aspen">' + (w ? '&#10003;' : '&#9654;') + ' Watch: ' + name + (w ? ' <span class="ggt-w">Watched</span>' : '') + '</button>'; };
      vids = '<div class="ggt-vids no-print"><div class="ggt-row">' + b('you', 'For You') + b('helper', 'For the Grown-up') + '</div>' +
        '<p>For You, for the student going through it. For the Grown-up, for the parent or helper beside them. A few minutes each, narrated aloud.</p></div>';
    }
    var src = window.GGSources ? GGSources.line((t.sources || []).concat((GGSources.C['aspen:' + t.id]) || [])) :
      (t.sources ? '<h3>Sources</h3><ul class="src">' + t.sources.map(function (s) { return '<li><a href="' + s[1] + '" target="_blank" rel="noopener">' + esc(s[0]) + '</a></li>'; }).join('') + '</ul>' : '');
    return '<div class="ggt as-guide">' +
      '<div class="ggt-row no-print"><button type="button" class="hm-linkbtn" data-ggt="back">&larr; All topics</button></div>' +
      '<p class="muted small" style="margin:0">' + esc(grp.name) + '</p><h2>' + esc(t.title) + '</h2>' + vids +
      (t.quick || t.talk ? '<div class="ggt-row no-print"><button type="button" class="hm-btn sm line hm-pill" data-ggt="print">Save or Print This Guide</button></div>' : '') +
      '<div class="guide">' +
      (t.quick ? '<div class="quick"><h3 style="margin-top:0">Quick Card</h3>' + list(t.quick) + '</div>' : '') +
      (t.talk ? '<h3>Talking It Through</h3>' + t.talk.map(function (p) { return '<p>' + p + '</p>'; }).join('') : '') +
      (t.say ? '<h3>Words you can use</h3>' + list(t.say) : '') +
      (t.avoid ? '<h3>Leave these out</h3>' + list(t.avoid) : '') +
      (t.help ? '<h3>Where to get help</h3>' + list(t.help) : '') +
      (!t.quick && !t.talk ? '<p class="muted">This guide is being written.</p>' : '') +
      (window.GGShelf ? GGShelf.html('aspen', t.id) : '') + src +
      '</div></div>';
  }

  GGScreen.talk = {
    trees: ['maple', 'aspen'],
    title: function (tree, extra) {
      var id = extra && extra.talk, f = id && topicOf(tree, id);
      return f ? f.t.title : 'When Life Changes';
    },
    files: function (tree) {
      return ['/shared/gg-parts.js?v=b929', '/shared/gg-life.js?v=b907', '/shared/gg-shelf.js?v=b934', '/shared/gg-sources.js?v=b940', '/shared/gg-pdf.js?v=b803',
        '/read.js?v=b813', '/shared/gg-learn.js?v=c007', '/' + tree + '/life.js?v=b907', SRC[tree][0], '/shared/home/kidsdata.js?v=' + V, '/shared/home/kidkit.js?v=' + V];
    },
    open: function (ctx) {
      var K = window.GGKidKit, tree = ctx.tree, id = ctx.talk, host = ctx.host;
      if (!K || !window.GGKidData || !SRC[tree]) { host.innerHTML = '<p class="hm-sub">This guide is on its way.</p>'; return null; }
      K.css('ggscr-talk-css', CSS);
      // maple/life.js adds activities (maple/index.html 1391): their titles join the ones carried in kidsdata.js.
      if (tree === 'maple' && window.MAPLE_LIFE && !window.GGKidData.maple.lifeActs) { var la = {}; (window.MAPLE_LIFE.add || []).forEach(function (a) { la[a.id] = [a.title, (a.plain && a.plain.title) || '']; }); window.GGKidData.maple.lifeActs = la; }
      var draw = function () {
        if (!topicOf(tree, id)) { host.innerHTML = '<p class="hm-sub">This guide waits in When Life Changes.</p><p><button type="button" class="hm-btn sm hm-pill" data-ggt="back">Open When Life Changes</button></p>'; return; }
        var plain = plainOf(ctx), band = '<img class="ggt-band no-print" src="/shared/heroes/' + tree + '-wide.webp" alt="">';
        host.innerHTML = band + (tree === 'maple' ? mapleHtml(ctx, id, plain) : aspenHtml(ctx, id));
        // Read Aloud sits right under the title, as in the tree.
        var root = host.querySelector(tree === 'maple' ? '.talk' : '.as-guide'); K.readBar(root, root && root.querySelector('h2'), tree);
      };
      draw();
      var onClick = function (e) {
        var b = e.target.closest && e.target.closest('[data-ggt],[data-hm-gside]'); if (!b || !host.contains(b)) return;
        if (b.hasAttribute('data-hm-gside')) { K.stopRead(); return; }   // Home plays the video in its own window
        var k = b.getAttribute('data-ggt');
        if (k === 'back') { K.stopRead(); ctx.openHome('life'); return; }
        if (k === 'print') {
          var f = topicOf(tree, id), title = f ? f.t.title : 'Guide';
          if (tree === 'maple') {
            // printTalk (3285): the file is named from the guide's title.
            var el = host.querySelector('.talk');
            K.sheet(ctx, b.parentNode, { title: title, file: 'maple-' + title.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.pdf', el: el,
              blocks: function () { return ggPdfFromEl(el, { eyebrow: 'Maple by Grow With Grounded', foot: 'Maple(TM) by Grow With Grounded. growwithgrounded.com' }); } });
          } else {
            // asPrintGuide (2367): the guide's words, with its title placed after the eyebrow.
            var g = host.querySelector('.as-guide .guide');
            K.sheet(ctx, b.parentNode, { title: title, file: 'aspen-' + id + '.pdf', el: host.querySelector('.as-guide'),
              blocks: function () { var bl = ggPdfFromEl(g, { eyebrow: 'Aspen by Grow With Grounded', foot: 'Aspen(TM) by Grow With Grounded. growwithgrounded.com/aspen' }); bl.splice(1, 0, { k: 'h1', t: title }); return bl; } });
          }
        }
      };
      host.addEventListener('click', onClick);
      // A video watched in Home's player marks its button (maple 3302, aspen 2381).
      var onMarks = function () { if (host.isConnected) { var y = host.scrollTop; draw(); host.scrollTop = y; } };
      window.addEventListener('gg-learn-marks', onMarks);
      return { close: function () { K.stopRead(); host.removeEventListener('click', onClick); window.removeEventListener('gg-learn-marks', onMarks); } };
    }
  };
})();
