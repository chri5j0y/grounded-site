/* =====================================================================
   GROW WITH GROUNDED LEARN (shared/gg-learn.js)
   One lesson player for the whole site (Learn build, October 2026).
   - The Field Guide's Learn tab and the Learn tab in every tree app play lessons here, so the
     closing scene, narration, and quiz work the same everywhere.
   - A lesson is {id, n, title, mins, scenes:[...]} and each scene is {k, say, ...}. Kinds: title, parts,
     six, big, points, trees, levels, flow, screen, tabs, card, quiz, plus (Willow Learn, October 2026):
       story    From the Bedside: {title, lines:[...], lesson, note, link:{href, label}}. A link shows
                under the caption as Read the Full Story.
       breathe  a slow breathing circle (in 4, out 6): {h, sub}. Give it hold (seconds) so it stays on
                screen after the narration ends.
       words    words to say, one per line: {h, items:[...], sub}.
       tale     Grounded Stories (BLD 784): {eyebrow, title, paras: [[sentence, ...], ...], beats, cue: {at}}, a page of a
                story with each sentence showing as it is read (shared/gg-stories.js builds these). Stories also use
                cfg.voice (the public voice, outside the trees), cfg.ending (the caller's own closing card, with
                cfg.onEnd(id, ctl) for its buttons), and lesson.srcHtml (a ready Sources line).
     Any scene can carry hold (extra seconds on screen before the next one).
   - Support videos: a track with kind: 'support' shows under its own heading (support.title in the app's
     Learn data, shown first when supportFirst is true). Support videos have no quiz, no certificate, and
     a gentler closing ("Take all the time you need."). GGLearn.open(app, id) opens one straight away. The player adds a closing scene
     ("That's it for this lesson. Nice work.") with Next Lesson, Back to Lessons, and Watch Again,
     and Get Your Certificate when a whole series is finished.
   - Scenes are drawn on a 960 by 540 canvas that scales to the screen. Narration uses read.js.
   - GGLearn.player(host, cfg)  plays one lesson (the Field Guide uses this with its own records).
   - GGLearn.open(app)          the Learn tab in a tree app: series list, player, certificates, flyer.
     App lessons live in shared/learn-lessons.js (window.GG_LEARN), loaded the first time Learn opens.
     Progress (watched marks) is kept inside the unlocked profile's locked vault (vault.learn[app], GWG BLD 756),
     or in memory for this visit only when nobody is unlocked, so it travels in the one backup file, still locked.
     Old open gg-learn:<app> marks are moved into the vault once, on the first unlock, then removed.
     GGLearn.watched(app, id) and GGLearn.marks(app) read them; the window event gg-learn-marks says they changed.
   - Health and Ability (GWG BLD 756): shared/learn-life.js (window.GG_LEARN_LIFE[app].tracks, group 'life')
     loads only when the Support group opens, and adds its Health and Ability videos there, first when the person
     has a Health and Ability choice (shared/gg-life.js). Willow has none.
   - A series earns a certificate when every lesson in it is finished and it has three or more
     lessons (or says cert: true). Certificates, posters, and flyers come from shared/gg-print.js.
   - When Life Changes videos (Build B1, October 2026): two per guide, For You and For the Helper.
     They live in each app's own file (GUIDE_SRC below, window.GG_LEARN_GUIDES[app]), loaded the first
     time Learn opens, and show in the Learn tab as tracks with kind: 'guide', one per ring. No quiz, no
     count, no certificate: a quiet check marks the ones watched. The closing scene offers Open the Full
     Guide (window.GG_GUIDE_OPEN[app](id), or #guide=id), the other video, and Back.
     GGLearn.open(app, id, {from: 'guide'}) opens one straight from a guide page.
     One home, two doors (GWG BLD 790): where the tree shows its When Life Changes cards in the page, Learn's When Life
     Changes card and tab close Learn and open them there (window.GG_LC_OPEN[app]() when a tree names its own opener,
     otherwise the tree's own tab opener, see lcDoor). The videos still open by #learn= links, from each guide, and from
     Learn's search. A tree without the view keeps them in Learn, one card per ring, as before.
   - The Learn top (GWG BLD 790): a search bar (title, blurb, and track name; listed tracks only, so low-key tracks follow
     their rules) and a tab for each category, All first. The category cards stay below as the All view.
   - For Guides videos (W1, GWG BLD 714): a track with kind: 'forguides' (sealed in the Field library, one track per
     ring, played by the Field Guide). The closing scene offers Open the Full Section (cfg.section), Watch Again,
     Next Video (the next guide in the ring), and Back to the Series, plus Get Your Certificate (cfg.cert) when the
     whole ring is counted.
   - From Chris's Shelf (GWG BLD 787): a track with unlisted: true stays out of the Learn list but opens by its id (Willow's
     All Shall Be Well video, opened from its reading). A track may list written pages, pages: [ids], shown under its videos
     as "A page to read". Pages live in shared/learn-pages.js (window.GG_LEARN_PAGES[app], loaded when first needed):
     {id, title, blurb, mins, lead, sections: [{h, b: blocks}], sources, print}, blocks as in the For Guides parts
     (['p', text], ['lab', text], ['ul', [line or [bold, rest], ...]], plus ['link', label, https url, note])). GGLearn.page(app, id) opens one inside Learn.
     Links: #learn=<lesson id> and #page=<page id> on any tree app page open that video or page in the app's Learn,
     waiting on Play before any sound (like #watch); the hash comes off the address once read.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGLearn) return;
  var V = 'b894';
  var ROOT = (function () { try { var s = document.currentScript && document.currentScript.src; if (s) return new URL('..', s).href.replace(/\/$/, ''); } catch (e) {} return location.origin; })();
  var url = function (p) { return ROOT + p; };
  var esc = function (x) { return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var today = function () { var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); }; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); };

  var MARK = function (m) { return url('/shared/marks/' + m + '.svg'); };
  // Title scenes use the paintings (GWG BLD 760): shared/heroes/<id>-wide.webp, Heartwood's own (heartwood/hero-wide.webp, GWG BLD 772)
  // painting for 'marriage', and the home painting for any other id. FRAME places each one in the 16 by 9 stage:
  // x is the side to side crop (object-position, percent), s the side the words sit on (l, r, or t for top),
  // w the widest the words go, so the words stay clear of the tree where the painting allows.
  var HEROES = ['maple', 'aspen', 'pine', 'birch', 'oak', 'sequoia', 'willow', 'grove', 'fieldguide', 'library', 'home', 'page-about', 'page-celebrations', 'page-contact', 'page-farewells', 'page-growth', 'page-hard-seasons', 'page-marriage', 'page-services', 'page-speaking', 'page-stories', 'page-teams', 'page-tools', 'living-sober'];
  var FRAME = {
    maple: { x: 100, s: 'r', w: 440 }, aspen: { x: 100, s: 'r', w: 440 }, pine: { x: 100, s: 'r', w: 440 }, birch: { x: 10, s: 'r', w: 420 },
    oak: { x: 40, s: 'l', w: 520 }, sequoia: { x: 0, s: 'r', w: 360 }, willow: { x: 0, s: 'r', w: 410 }, grove: { x: 50, s: 't', w: 640 },
    fieldguide: { x: 50, s: 'l', w: 500 }, library: { x: 100, s: 'r', w: 440 }, home: { x: 0, s: 'l', w: 500 }, marriage: { x: 50, s: 'l', w: 440 },
    'page-celebrations': { x: 100, s: 'r', w: 380 }, 'page-farewells': { x: 100, s: 'r', w: 440 }, 'page-growth': { x: 0, s: 'l', w: 520 },
    'page-hard-seasons': { x: 0, s: 'l', w: 520 }, 'page-marriage': { x: 100, s: 'r', w: 420 }, 'page-teams': { x: 50, s: 't', w: 640 },
    'living-sober': { x: 0, s: 'l', w: 520 } // BLD 839: Living Sober's own painting, the tree to the right of the words
  };
  var heroId = function (h) { return h === 'marriage' || HEROES.indexOf(h) >= 0 || /^(svc|page)-[a-z0-9-]+$/.test(h || '') ? h : 'home'; }; // BLD 823: any page or service painting
  var HERO = function (h) { h = heroId(h); return h === 'marriage' ? url('/heartwood/hero-wide.webp') : url('/shared/heroes/' + h + '-wide.webp'); };
  var COL = { maple: '#C4501E', aspen: '#1F6F74', pine: '#3A6B35', birch: '#7F6610', oak: '#3D5A73', sequoia: '#7A2E1C', willow: '#5D5A6E', grove: '#223829', field: '#2E2118', site: '#8B5E1A' };
  var APPS = {
    maple: { name: 'Maple', color: '#C4501E', btn: '#A14219', back: 'Back to Maple' },
    aspen: { name: 'Aspen', color: '#1F6F74', btn: '#1F6F74', back: 'Back to Aspen' },
    pine: { name: 'Pine', color: '#3A6B35', btn: '#3A6B35', back: 'Back to Pine' },
    birch: { name: 'Birch', color: '#7F6610', btn: '#7F6610', back: 'Back to Birch' },
    oak: { name: 'Oak', color: '#3D5A73', btn: '#3D5A73', back: 'Back to Oak' },
    sequoia: { name: 'Sequoia', color: '#7A2E1C', btn: '#7A2E1C', back: 'Back to Sequoia' },
    willow: { name: 'Willow', color: '#5D5A6E', btn: '#5D5A6E', back: 'Back to Willow' },
    grove: { name: 'The Grove', color: '#223829', btn: '#2F5A3C', back: 'Back to The Grove' }
  };
  var PART = [['roots', 'Roots', 'What grounds you', '#5B3A22'], ['trunk', 'Trunk', 'Purpose', '#8B5E1A'], ['bark', 'Bark', 'Mind and feelings', '#7D6B57'], ['branches', 'Branches', 'Relationships', '#9A5B34'], ['leaves', 'Leaves', 'Body', '#5F7D48'], ['fruit', 'Fruit', 'Hope', '#C07A26']];
  var IC = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    award: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5"/></svg>',
    print: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 9V3.5h10V9M7 17.5H4.5v-7A1.5 1.5 0 0 1 6 9h12a1.5 1.5 0 0 1 1.5 1.5v7H17"/><path d="M7 14h10v6.5H7z"/></svg>',
    go: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 12h7M12.5 8.5L16 12l-3.5 3.5"/></svg>',
    page: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 3.5h7.5l4 4v13h-11.5z"/><path d="M14 3.5v4h4M9.5 12h5M9.5 15.5h5"/></svg>'
  };
  var HAND = '<svg class="ln-ptr" viewBox="0 0 40 48" aria-hidden="true"><path d="M14 3c2.2 0 4 1.8 4 4v13l2-.4c1.6-.3 3.2.6 3.7 2.1l.2.6 2-.3c1.7-.2 3.3.8 3.8 2.4l.2.6 1.6-.2c2-.2 3.8 1.3 4 3.3L36 38c.3 4.5-3 8.5-7.5 9H18.6c-2.6 0-5-1.2-6.5-3.3L4.3 32.8c-1.2-1.7-.8-4 .9-5.1 1.5-1 3.5-.8 4.8.5L10 30V7c0-2.2 1.8-4 4-4z" fill="#FFF8EC" stroke="#2C1810" stroke-width="2"/></svg><span class="ln-ring"></span>';
  var A = function (d, extra, sty) { return ' class="a' + (extra ? ' ' + extra : '') + '" style="transition-delay:' + d + 's' + (sty ? ';' + sty : '') + '"'; };

  // The demo camera (GWG BLD 824): z = [x, y, zoom] in the phone screen's own pixels (390 by 844) is placed in the
  // middle of the part of the screen that shows (280 by 494 in the stage), and the screen never slides past its edges.
  function demoCam(z) {
    if (!z) return 'translate(0px,0px) scale(1)';
    var k = 280 / 390, s = +z[2] || 1, W = 280, H = 606, V = 494, tx = 140 - z[0] * k * s, ty = V / 2 - z[1] * k * s;
    tx = Math.min(0, Math.max(W - W * s, tx)); ty = Math.min(0, Math.max(Math.min(0, V - H * s), ty));
    return 'translate(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px) scale(' + s + ')';
  }
  /* ---------------- scenes ---------------- */
  function scene(sc, acc) {
    var h = function (x) { return esc(x == null ? '' : x); };
    acc = acc || '#8B5E1A';
    switch (sc.k) {
      case 'title': {
        var hid = heroId(sc.hero || 'oak'), F = FRAME[hid] || { x: 50, s: 'l', w: 520 }, tl = String(sc.h || '').length;
        // sc.heroNarrow (BLD 788): a narrow painting for phones, so a phone skips the wide one (Grounded Stories uses it).
        var hsrc = sc.heroNarrow && typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 600px)').matches ? url('/shared/heroes/' + sc.heroNarrow + '.webp') : HERO(hid);
        return '<img class="ln-hero" src="' + hsrc + '" alt="" style="object-position:' + F.x + '% 50%"><div class="ln-shade ln-sh-' + F.s + '"></div><div class="ln-tt ln-tt-' + F.s + '" style="max-width:' + F.w + 'px"><div' + A(.5, 'ln-eb') + '>' + h(sc.eyebrow || '') + '</div><h2' + A(.9, tl > 52 ? 'ln-h4' : tl > 38 ? 'ln-h3' : tl > 24 ? 'ln-h2' : '') + '>' + h(sc.h) + '</h2>' + (sc.sub ? '<p' + A(1.5) + '>' + h(sc.sub) + '</p>' : '') + '<div' + A(1.9, 'ln-by') + '>GROW WITH GROUNDED</div></div>';
      }
      case 'parts': {
        // The six parts labeled on the painted Oak (GWG BLD 760), in the painting's own pixels (2000 by 800):
        // [delay, anchor x, y, elbow x, y, label x, y, anchor, part]. Acorns are not shown, so Fruit points to the outer crown.
        var L = [[1.0, 1405, 612, 1250, 642, 1240, 640, 'end', 0], [1.8, 1446, 566, 1590, 592, 1600, 590, 'start', 1], [2.6, 1416, 532, 1190, 532, 1180, 530, 'end', 2], [3.4, 1492, 505, 1680, 478, 1690, 476, 'start', 3], [4.2, 1268, 392, 1160, 360, 1150, 358, 'end', 4], [5.0, 1572, 340, 1690, 300, 1700, 298, 'start', 5]];
        var HALO = ' stroke="#1C1209" stroke-opacity=".62" stroke-width="7" stroke-linejoin="round" paint-order="stroke"';
        return '<svg viewBox="932 200 996 560" preserveAspectRatio="xMidYMid slice" width="960" height="540" style="position:absolute;inset:0"><defs><linearGradient id="ln-pt-l" x1="0" x2="1"><stop offset="0" stop-color="#140D07" stop-opacity=".5"/><stop offset="1" stop-color="#140D07" stop-opacity="0"/></linearGradient><linearGradient id="ln-pt-r" x1="1" x2="0"><stop offset="0" stop-color="#140D07" stop-opacity=".5"/><stop offset="1" stop-color="#140D07" stop-opacity="0"/></linearGradient><linearGradient id="ln-pt-v" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#140D07" stop-opacity=".34"/><stop offset=".2" stop-color="#140D07" stop-opacity="0"/><stop offset=".8" stop-color="#140D07" stop-opacity="0"/><stop offset="1" stop-color="#140D07" stop-opacity=".4"/></linearGradient></defs>'
          + '<image href="' + HERO('oak') + '" x="0" y="0" width="2000" height="800"/><rect x="932" y="200" width="300" height="560" fill="url(#ln-pt-l)"/><rect x="1628" y="200" width="300" height="560" fill="url(#ln-pt-r)"/><rect x="932" y="200" width="996" height="560" fill="url(#ln-pt-v)"/>'
          + L.map(function (r) { var P = PART[r[8]]; return '<g' + A(r[0]) + '><polyline points="' + r[1] + ',' + r[2] + ' ' + r[3] + ',' + r[4] + '" fill="none" stroke="#1C1209" stroke-opacity=".5" stroke-width="5"/><polyline points="' + r[1] + ',' + r[2] + ' ' + r[3] + ',' + r[4] + '" fill="none" stroke="#F6EFE2" stroke-width="2.4"/><circle cx="' + r[1] + '" cy="' + r[2] + '" r="7" fill="#F6EFE2" stroke="#1C1209" stroke-opacity=".5" stroke-width="2"/><circle cx="' + r[1] + '" cy="' + r[2] + '" r="4" fill="' + P[3] + '"/><text x="' + r[5] + '" y="' + r[6] + '" text-anchor="' + r[7] + '" font-family="Cormorant Garamond,serif" font-weight="600" font-size="36" fill="#FFF8EC"' + HALO + '>' + P[1] + '</text><text x="' + r[5] + '" y="' + (r[6] + 27) + '" text-anchor="' + r[7] + '" font-family="Barlow,sans-serif" font-weight="600" font-size="20" fill="#F7E6C4"' + HALO + '>' + P[2] + '</text></g>'; }).join('') + '</svg>';
      }
      case 'six': // the six parts as cards, with this tree's own words under each one
        return '<div class="ln-six">' + (sc.h ? '<h3' + A(.2) + '>' + h(sc.h) + '</h3>' : '') + '<div class="ln-sixg">' + PART.map(function (P, j) { var t = (sc.words || [])[j] || ''; return '<div' + A(.7 + j * (sc.gap || .7), 'ln-sx', '--k:' + P[3]) + '><b>' + P[1] + '</b><span>' + P[2] + '</span>' + (t ? '<small>' + h(t) + '</small>' : '') + '</div>'; }).join('') + '</div></div>';
      case 'big': return (sc.bg ? '<img class="ln-dm-bg" src="' + HERO(sc.bg) + '" alt=""><div class="ln-dm-shade ln-big-sh"></div>' : '') + '<div class="ln-big' + (sc.bg ? ' ln-big-on' : '') + '"><p' + A(.3) + '>' + h(sc.h) + '</p>' + (sc.sub ? '<small' + A(1.8) + '>' + h(sc.sub) + '</small>' : '') + '</div>';
      case 'points': return '<div class="ln-pts' + ((sc.items || []).length >= 5 ? ' ln-pts5' : '') + '"><h3' + A(.2) + '>' + h(sc.h) + '</h3>' + (sc.items || []).map(function (it, j) { var a = Array.isArray(it) ? it : [it]; return '<div' + A(.9 + j * (sc.gap || 1.1), 'ln-pt') + '><span class="ln-dot" style="background:' + (a[2] || acc) + '"></span><span><b>' + h(a[0]) + '</b>' + (a[1] ? '<small>' + h(a[1]) + '</small>' : '') + '</span></div>'; }).join('') + '</div>';
      case 'trees': {
        var T = [['maple', 'Maple', 'Grades K to 5'], ['aspen', 'Aspen', 'Grades 6 to 8'], ['pine', 'Pine', 'Grades 9 to 12'], ['birch', 'Birch', '18 to 26'], ['oak', 'Oak', '26 to 60'], ['sequoia', 'Sequoia', '60 and up'], ['willow', 'Willow', 'Hospice']].concat(sc.grove ? [['grove', 'The Grove', 'Every age, together']] : []);
        return '<div class="ln-trees"><h3' + A(.2) + '>' + h(sc.h || 'Seven trees. The same six parts.') + '</h3><div class="ln-trow' + (T.length > 7 ? ' ln-t8' : '') + '">' + T.map(function (x, j) { return '<div' + A(.6 + j * .4, 'ln-tr') + '><img src="' + MARK(x[0] + '-tab') + '" alt=""><b style="color:' + COL[x[0]] + '">' + x[1] + '</b><small>' + x[2] + '</small></div>'; }).join('') + '</div></div>';
      }
      case 'levels': return '<div class="ln-lv">' + (sc.levels || [['Strong', '8 to 10', '#5F7D48'], ['Steady', '5 to 7', '#8B5E1A'], ['Growing Edge', '1 to 4', '#B8612F']]).map(function (c, j) { return '<div' + A(.8 + j, 'ln-lc', '--k:' + c[2]) + '><b>' + h(c[0]) + '</b><small>' + h(c[1]) + '</small></div>'; }).join('') + '</div>';
      case 'flow': {
        var n = (sc.steps || []).length;
        return '<div class="ln-flow"><h3' + A(.2) + '>' + h(sc.h) + '</h3><div class="ln-frow" style="--n:' + n + '">' + (sc.steps || []).map(function (s, j) { return (j ? '<span' + A(.6 + j * 1.1, 'ln-arr') + '>&rarr;</span>' : '') + '<div' + A(.8 + j * 1.1, 'ln-step') + '><span class="ln-sn" style="background:' + acc + '">' + (j + 1) + '</span><b>' + h(s[0]) + '</b>' + (s[1] ? '<small>' + h(s[1]) + '</small>' : '') + '</div>'; }).join('') + '</div></div>';
      }
      case 'screen': {
        var c = COL[sc.app] || sc.color || '#3D5A73';
        return '<div class="ln-phone"><div class="ln-ptop" style="background:' + c + '">' + (sc.app && sc.app !== 'field' && sc.app !== 'site' ? '<img src="' + MARK(sc.app + '-tab') + '" alt="">' : '') + '<b>' + h(sc.app_name || '') + '</b><span>' + h(sc.title || '') + '</span></div>' + (sc.rows || []).map(function (r, j) { return '<div class="ln-prow' + (j === sc.tap ? ' ln-tgt' : '') + '"' + (j === sc.tap ? ' data-tap' : '') + '><span>' + h(r[0]) + '</span><span' + (r[2] ? ' style="color:' + r[2] + ';font-weight:600"' : '') + '>' + h(r[1] || '') + '</span></div>'; }).join('') + '</div>'
          + (sc.panel ? '<div class="ln-panel" style="border-left-color:' + (sc.panel.c || c) + '"><h4>' + h(sc.panel.h) + '</h4>' + (sc.panel.sub ? '<p>' + h(sc.panel.sub) + '</p>' : '') + ((sc.panel.items || []).length ? '<ul>' + sc.panel.items.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>' : '') + '</div>' : '') + (sc.tap != null ? HAND : '');
      }
      case 'tabs': return '<div class="ln-fg"><div class="ln-fgtop"' + (sc.app && COL[sc.app] && sc.app !== 'field' ? ' style="background:' + COL[sc.app] + ';color:#FFF8EC"' : '') + '><b>' + h(sc.app_name || 'Field Guide') + '</b></div><div class="ln-fgtabs">' + (sc.tabs || []).map(function (x, j) { return '<span class="' + (j === sc.tap ? 'ln-tgt' : '') + '"' + (j === sc.tap ? ' data-tap' : '') + '>' + h(x) + '</span>'; }).join('') + '</div>'
        + (sc.note ? '<div class="ln-note"><h4>' + h(sc.note.h) + '</h4><p>' + h(sc.note.p || '') + '</p></div>' : '') + '</div>' + (sc.tap != null ? HAND : '');
      case 'card': return '<div class="ln-card"><h4>' + h(sc.title) + '</h4>' + (sc.body ? '<p>' + h(sc.body) + '</p>' : '') + (sc.fields || []).map(function (f) { return '<label>' + h(f[0]) + '</label><div class="ln-in">' + h(f[1] || '') + '</div>'; }).join('') + '<div class="ln-btns">' + (sc.btns || []).map(function (b, j) { return '<span class="ln-b' + (j === 0 ? ' pri' : '') + (j === sc.tap ? ' ln-tgt' : '') + '"' + (j === sc.tap ? ' data-tap' : '') + '>' + h(b) + '</span>'; }).join('') + '</div></div>'
        + (sc.result ? '<div class="ln-res">' + h(sc.result) + '</div>' : '') + (sc.tap != null ? HAND : '');
      // Grounded Stories (BLD 784): a calm page of the story, each sentence showing as it is read. paras: [[sentence, ...], ...].
      case 'tale': {
        var tn = 0; (sc.paras || []).forEach(function (p) { p.forEach(function (x) { tn += String(x).length + 1; }); });
        var tf = tn > 800 ? 18 : tn > 520 ? 21 : tn > 380 ? 23 : tn > 240 ? 26 : tn > 120 ? 30 : 34;
        return '<div class="ln-tale" style="--k:' + acc + ';--tf:' + tf + 'px"><div' + A(.15, 'ln-eb', 'color:' + acc) + '>' + h(sc.eyebrow || 'Grounded Stories') + '</div>' + (sc.title ? '<h3' + A(.25) + '>' + h(sc.title) + '</h3>' : '')
          + '<div class="ln-tl">' + (sc.paras || []).map(function (p) { return p.map(function (x) { return '<span' + A(.4, 'ln-tl-s') + '>' + h(x) + '</span>'; }).join(' '); }).join('<b class="ln-tl-br"></b>') + '</div></div>';
      }
      case 'story': return '<div class="ln-story" style="--k:' + acc + '"><div' + A(.2, 'ln-eb', 'color:' + acc) + '>' + h(sc.eyebrow || 'From the Bedside') + '</div><h3' + A(.5) + '>' + h(sc.title) + '</h3><div class="ln-st-b">' + (sc.lines || []).map(function (x, j) { return '<p' + A(1.1 + j * (sc.gap || 1.6)) + '>' + h(x) + '</p>'; }).join('') + '</div>' + (sc.lesson ? '<div' + A(1.4 + (sc.lines || []).length * (sc.gap || 1.6), 'ln-st-l') + '>' + h(sc.lesson) + '</div>' : '') + (sc.note ? '<small' + A(2, 'ln-st-n') + '>' + h(sc.note) + '</small>' : '') + '</div>';
      case 'breathe': return '<div class="ln-br" style="--k:' + acc + '"><h3' + A(.2) + '>' + h(sc.h || 'Breathe with me') + '</h3><div class="ln-brw"><div class="ln-brc"></div><div class="ln-brt"><i>Breathe in</i><i>Breathe out</i></div></div>' + (sc.sub ? '<small' + A(.8) + '>' + h(sc.sub) + '</small>' : '') + '</div>';
      case 'words': return '<div class="ln-wd"><h3' + A(.2) + '>' + h(sc.h) + '</h3>' + (sc.items || []).map(function (x, j) { return '<p' + A(.9 + j * (sc.gap || 1.2), '', 'border-color:' + acc) + '>' + h(x) + '</p>'; }).join('') + (sc.sub ? '<small' + A(1.2 + (sc.items || []).length * (sc.gap || 1.2)) + '>' + h(sc.sub) + '</small>' : '') + '</div>';
      case 'demo': {
        // A product demo (GWG BLD 824): a real screen from the app in a phone, over the page's painting, with the words beside it.
        // sc.shot is shared/demo/<shot>.webp (a 390 by 844 phone screen). Each item is {b, s, at, z:[x, y, zoom], m:[x, y, w, h], shot}:
        // as its sentence starts, the camera glides to z, a soft ring lights m, and shot swaps the screen. An item with no b is a camera move only.
        var it = sc.items || [], DK = 280 / 390, shots = [sc.shot];
        it.forEach(function (x) { if (x.shot && shots.indexOf(x.shot) < 0) shots.push(x.shot); });
        var dimg = function (x) { return url('/shared/demo/' + x + '.webp'); };
        return '<img class="ln-dm-bg" src="' + HERO(sc.hero || 'home') + '" alt=""><div class="ln-dm-shade"></div>'
          + '<div class="ln-dm-tx' + (sc.side === 'l' ? ' ln-dm-r' : '') + '">' + (sc.eyebrow ? '<div' + A(.3, 'ln-eb') + '>' + h(sc.eyebrow) + '</div>' : '') + '<h3' + A(.6) + '>' + h(sc.h) + '</h3>'
          + '<div class="ln-dm-list">' + it.map(function (x, j) { return '<div' + A(1.2 + j * .9, 'ln-dm-pt' + (x.b ? '' : ' ln-dm-cue')) + ' data-j="' + j + '"' + (x.z ? ' data-z="' + x.z.join(',') + '"' : '') + (x.shot ? ' data-shot="' + h(x.shot) + '"' : '') + '><span class="ln-dot" style="background:' + acc + '"></span><span><b>' + h(x.b || '') + '</b>' + (x.s ? '<small>' + h(x.s) + '</small>' : '') + '</span></div>'; }).join('') + '</div></div>'
          + (sc.shot2 ? '<div' + A(.5, 'ln-dm-ph ln-dm-ph2' + (sc.side === 'l' ? ' ln-dm-l' : '')) + '><div class="ln-dm-sc"><img src="' + dimg(sc.shot2) + '" alt=""></div></div>' : '')
          + '<div' + A(.2, 'ln-dm-ph' + (sc.side === 'l' ? ' ln-dm-l' : '')) + '><div class="ln-dm-sc"><div class="ln-dm-cam" style="transform:' + demoCam(sc.z) + '">'
          + shots.map(function (x, j) { return '<img src="' + dimg(x) + '" alt="" data-shot="' + h(x) + '"' + (j ? '' : ' class="on"') + '>'; }).join('')
          + it.map(function (x, j) { return x.m ? '<span class="ln-dm-mk" data-j="' + j + '" style="left:' + (x.m[0] * DK) + 'px;top:' + (x.m[1] * DK) + 'px;width:' + (x.m[2] * DK) + 'px;height:' + (x.m[3] * DK) + 'px"></span>' : ''; }).join('')
          + '</div></div></div>';
      }
      case 'quiz': return '<div class="ln-qz"><div' + A(.2, 'ln-eb', 'color:' + acc) + '>You\'ve Got It</div><h3' + A(.5) + '>' + h(sc.q) + '</h3></div>';
      case 'end': return '<div class="ln-end"><div' + A(.15, 'ln-endck', 'background:' + (sc.ok ? '#5F7D48' : acc)) + '>' + (sc.ok ? IC.check : IC.play) + '</div><div' + A(.5, 'ln-eb', 'color:' + acc) + '>' + h(sc.eyebrow) + '</div><h2' + A(.8) + '>' + h(sc.h) + '</h2>' + (sc.sub ? '<p' + A(1.3) + '>' + h(sc.sub) + '</p>' : '') + (sc.count ? '<small' + A(1.6) + '>' + h(sc.count) + '</small>' : '') + '</div>';
    }
    return '';
  }

  /* ---------------- styles ---------------- */
  function css() {
    if ($('#ggl-css')) return;
    var s = document.createElement('style'); s.id = 'ggl-css';
    s.textContent = [
      // a player placed outside a .ggl wrapper (Heartwood) gets the same tokens, so its Play button keeps its color (GWG BLD 797).
      '.ggl,.ggl-player:not(.ggl .ggl-player){--ggl-acc:var(--gold,#8B5E1A);--ggl-line:var(--line,#DDD0B8);--ggl-card:var(--card,#FFFCF6);--ggl-ink:var(--ink,#2C1810);--ggl-soft:var(--ink-soft,#6B5A4D);--ggl-deep:var(--bg-deep,#F2ECE0);--ggl-scale:var(--scale,1);}',
      '.ln-list{display:grid;gap:8px;margin-top:10px;}',
      '.ln-item{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:10px 12px;border:1px solid var(--ggl-line);border-radius:12px;background:var(--ggl-card);color:var(--ggl-ink);font:inherit;cursor:pointer;min-height:56px;}',
      '.ln-item:hover{border-color:var(--ggl-acc);}.ln-item>svg{width:22px;height:22px;color:var(--ggl-acc);flex:none;}',
      '.ln-n{width:34px;height:34px;border-radius:50%;background:var(--ggl-deep);color:var(--ggl-acc);display:grid;place-items:center;font-weight:700;flex:none;}',
      '.ln-item.done .ln-n{background:#5F7D48;color:#fff;}.ln-n svg{width:18px;height:18px;}',
      '.ln-t{flex:1;min-width:0;}.ln-t b{display:block;}.ln-t small{color:var(--ggl-soft);}',
      '.ln-for,.ggl-for{display:inline-block;font-size:13px;line-height:1.3;font-weight:600;letter-spacing:.2px;color:var(--ggl-soft);border:1px solid var(--ggl-line);border-radius:999px;padding:1px 9px;margin:3px 0 2px;}.ln-t .ln-for{display:table;margin:4px 0 3px;}.ggl-for{margin:0 0 10px;}',
      '.ggl-player{margin-top:6px;}',
      '.ln-stage{position:relative;aspect-ratio:16/9;border-radius:18px;overflow:hidden;background:#F2ECE0;border:1px solid var(--ggl-line);}',
      '.ln-wm{position:absolute;z-index:6;display:flex;align-items:center;gap:6px;color:#5B4636;font:600 12px/1.1 Barlow,system-ui,sans-serif;pointer-events:none;user-select:none;-webkit-user-select:none;opacity:.92;white-space:nowrap;}.ln-wm img{width:24px;height:24px;border-radius:6px;}.ln-wm i{font-style:normal;}.ln-wm-tl{left:12px;top:12px;}.ln-wm-br{right:12px;bottom:12px;}',
      '.ln-on-cover .ln-wm{color:#FFFFFF;}.ln-on-end .ln-wm-br{display:none;}.ln-on-demo .ln-wm-br{display:none;}',
      '.ggl-small .ln-wm span{display:none;}.ggl-small .ln-wm img{width:15px;height:15px;border-radius:4px;}.ggl-small .ln-wm-tl{left:5px;top:5px;}.ggl-small .ln-wm-br{right:5px;bottom:5px;}.ggl-small .ln-tt{top:86px;}.ggl-small .ln-six{padding-top:84px;}',
      '.ln-prog{display:flex;gap:5px;margin:10px 0;}.ln-prog span{flex:1;height:5px;border-radius:3px;background:var(--ggl-line);}.ln-prog span.on{background:var(--ggl-acc);}',
      '.ln-cap{font-size:calc(19px * var(--ggl-scale));line-height:1.5;min-height:3em;margin:6px 0;color:var(--ggl-ink);}.ln-cap .w.on{color:var(--ggl-acc);}',
      /* beats: items wait for their sentence; a pause-and-do ring */
      '.go .ln-canvas .a.hold{opacity:0;transform:translateY(14px);}',
      '.ln-cap .w{transition:color .3s ease;}',
      '.ln-wait{position:absolute;right:3%;bottom:5%;display:flex;align-items:center;gap:10px;background:rgba(255,252,246,.94);border:1px solid #DDD0B8;border-radius:999px;padding:6px 16px 6px 6px;color:#2C1810;font-size:clamp(13px,2.2vw,17px);font-weight:600;box-shadow:0 4px 14px rgba(44,24,16,.12);z-index:3;}',
      '.ln-wait svg{width:clamp(30px,6vw,44px);height:clamp(30px,6vw,44px);transform:rotate(-90deg);}',
      '.ln-wt0{fill:none;stroke:#E8DCC6;stroke-width:4;}.ln-wt1{fill:none;stroke:var(--ggl-acc,#8B5E1A);stroke-width:4;stroke-linecap:round;stroke-dasharray:119.4;stroke-dashoffset:0;transition-property:stroke-dashoffset;transition-timing-function:linear;}',
      '.ln-wait.run .ln-wt1{stroke-dashoffset:119.4;}',
      '@media (prefers-reduced-motion:reduce){.ln-wt1{transition:none !important;}}',
      '.ln-pts5{padding-top:34px;}.ln-pts5 h3{margin-bottom:14px;}.ln-pts5 .ln-pt{margin-bottom:11px;}',
      '.ln-copyline{display:block;font-size:13px;line-height:1.4;color:var(--ggl-soft,#6B5A4D);margin-top:6px;}',
      '.ggl-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:10px 18px;border-radius:12px;border:1.5px solid var(--ggl-acc);background:transparent;color:var(--ggl-acc);font:inherit;font-weight:600;cursor:pointer;text-align:center;line-height:1.2;}',
      '.ggl-btn.pri{background:var(--ggl-acc);color:#FFF8EC;}.ggl-btn.quiet{border-color:var(--ggl-line);color:var(--ggl-soft);}',
      // dark mode accents are light, so the filled Play button takes dark text there, like .btn-primary in style.css (GWG BLD 788)
      '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .ggl-btn.pri{color:#1F1A14;}}:root[data-theme="dark"] .ggl-btn.pri{color:#1F1A14;}',
      '.ggl-btn svg{width:20px;height:20px;flex:none;}.ggl-btn:focus-visible,.ln-item:focus-visible{outline:3px solid var(--ggl-acc);outline-offset:2px;}',
      /* Read Instead (BLD 756): the whole script as text, one tap away */
      '.ln-read{margin:12px 0 4px;padding:16px 18px;border:1px solid var(--ggl-line);border-radius:14px;background:var(--ggl-card);color:var(--ggl-ink);font-size:calc(18px * var(--ggl-scale));line-height:1.6;}.ln-read[hidden]{display:none;}',
      '.ln-read h3{font-family:Cormorant Garamond,Georgia,serif;font-size:1.45em;line-height:1.2;margin:0 0 4px;}.ln-read h4{font-size:1em;margin:16px 0 4px;color:var(--ggl-ink);}.ln-read p{margin:0 0 8px;}.ln-read .ln-rd-do{display:block;font-style:italic;color:var(--ggl-soft);margin:2px 0 8px;}',
      '.ln-read a{color:inherit;text-decoration:underline;text-underline-offset:3px;}.ln-read ol{margin:4px 0 8px;padding-left:1.4em;}.ln-read .ln-rd-q{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0;}.ln-read .ln-rd-end{margin-top:14px;padding-top:10px;border-top:1px solid var(--ggl-line);}.ln-read .gg-src-line,.ln-read small{display:block;color:var(--ggl-soft);font-size:.8em;margin-top:6px;}',
      '.ln-ctl{display:flex;gap:8px;align-items:center;flex-wrap:wrap;}.ln-ctl .ggl-cn{margin-left:auto;color:var(--ggl-soft);font-size:15px;}',
      '.ln-opts{display:grid;gap:8px;margin:8px 0;}.ln-opts .ggl-btn{justify-content:flex-start;text-align:left;white-space:normal;min-height:52px;border-color:var(--ggl-line);color:var(--ggl-ink);font-weight:500;}',
      '.ln-opts .ln-right,.ln-rd-q .ln-right{border-color:#5F7D48 !important;background:rgba(95,125,72,.14) !important;}.ln-opts .ln-wrong,.ln-rd-q .ln-wrong{border-color:#B8612F !important;}',
      '.ln-yes b{color:#5F7D48;}.ln-no b{color:#A0532A;}.ln-yes,.ln-no{color:var(--ggl-ink);}@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .ln-yes b{color:#A9C98F;}:root:not([data-theme="light"]) .ln-no b{color:#EBA27E;}}:root[data-theme="dark"] .ln-yes b{color:#A9C98F;}:root[data-theme="dark"] .ln-no b{color:#EBA27E;}',
      /* the closing scene: buttons sit on the screen when there is room, under it on small phones */
      '.ggl-endbar{display:none;flex-wrap:wrap;gap:8px;justify-content:center;margin:12px 0 4px;}.ggl-endbar.on{display:flex;}',
      '.ggl-endbar.over{position:absolute;left:0;right:0;bottom:6%;margin:0;padding:0 16px;}',
      '.ggl-endbar.over .ggl-btn.quiet{background:#FFFCF6;border-color:#DDD0B8;color:#6B5A4D;}.ggl-endbar.over .ggl-btn:not(.pri){background:#FFFCF6;}',
      '.ggl-endbar .ggl-btn{min-width:150px;}',
      '.ln-end{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:58px 70px 0;text-align:center;}',
      '.ln-endck{width:84px;height:84px;border-radius:50%;display:grid;place-items:center;color:#fff;}.ln-endck svg{width:46px;height:46px;}',
      '.ln-end .ln-eb{margin-top:18px;}.ln-end h2{font-family:\'Cormorant Garamond\',serif;font-weight:600;font-size:50px;line-height:1.08;margin:8px 0 0;max-width:780px;text-wrap:balance;}',
      '.ln-end p{font-size:25px;color:#6B5A4D;margin:14px 0 0;}.ln-end small{display:block;font-size:19px;color:#6B5A4D;margin-top:10px;}',
      '.ggl-small .ln-end{padding-top:86px;}.ggl-small .ln-end h2{font-size:60px;}.ggl-small .ln-end p{font-size:30px;}',
      '.ln-six{padding:64px 50px 40px;}.ln-six h3{font-family:\'Cormorant Garamond\',serif;font-weight:600;font-size:42px;margin:0 0 22px;}',
      '.ln-sixg{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}',
      '.ln-sx{background:#FFFCF6;border:1px solid #DDD0B8;border-top:7px solid var(--k);border-radius:16px;padding:16px 18px;min-height:168px;}',
      '.ln-sx b{display:block;font-family:\'Cormorant Garamond\',serif;font-size:32px;color:var(--k);line-height:1;}.ln-sx span{display:block;font-size:19px;font-weight:600;margin-top:4px;}.ln-sx small{display:block;font-size:17px;color:#6B5A4D;margin-top:6px;line-height:1.3;}',
      /* the Learn tab inside a tree app */
      '.ggl-app{position:fixed;inset:0;z-index:2147483000;overflow-y:auto;-webkit-overflow-scrolling:touch;background:#F7F2E8;--ggl-line:#DDD0B8;--ggl-card:#FFFCF6;--ggl-ink:#2C1810;--ggl-soft:#6B5A4D;--ggl-deep:#EFE6D4;color:var(--ggl-ink);font-family:Barlow,system-ui,sans-serif;}',
      // shared/gg-listen.js styles its own Listen bar as .ggl (display:flex); two classes here keep the Learn overlay a plain block (GWG BLD 787).
      '.ggl.ggl-app{display:block;flex-wrap:nowrap;gap:0;margin:0;align-items:normal;min-width:0;}',
      ':root[data-theme="dark"] .ggl-app{background:#1B1714;--ggl-line:#3D352D;--ggl-card:#26211C;--ggl-ink:#F2EADC;--ggl-soft:#C4B8A6;--ggl-deep:#332B24;}',
      '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .ggl-app{background:#1B1714;--ggl-line:#3D352D;--ggl-card:#26211C;--ggl-ink:#F2EADC;--ggl-soft:#C4B8A6;--ggl-deep:#332B24;}}',
      '.ggl-top{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:10px 14px;padding-top:calc(10px + env(safe-area-inset-top,0px));background:var(--ggl-bar);color:#FFF8EC;}',
      '.ggl-top img{width:36px;height:36px;border-radius:9px;}.ggl-top b{font-family:\'Cormorant Garamond\',serif;font-size:24px;font-weight:600;flex:1;min-width:0;}',
      '.ggl-x{min-height:44px;padding:8px 14px;border-radius:10px;border:1.5px solid rgba(255,248,236,.7);background:transparent;color:#FFF8EC;font:inherit;font-weight:600;cursor:pointer;}',
      '.ggl-in{max-width:880px;margin:0 auto;padding:22px 16px calc(60px + env(safe-area-inset-bottom,0px));}',
      '.ggl-in h1{font-family:\'Cormorant Garamond\',serif;font-weight:600;font-size:36px;line-height:1.1;margin:6px 0 8px;}.ggl-in h3{font-family:\'Cormorant Garamond\',serif;font-weight:600;font-size:26px;margin:0;}',
      '.ggl-eb{font-family:\'Barlow Condensed\',sans-serif;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;font-size:15px;color:var(--ggl-acc);}',
      ':root[data-theme="dark"] .ggl-app .ggl-eb,:root[data-theme="dark"] .ggl-app .ln-n{color:var(--ggl-lite);}',
      '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .ggl-app .ggl-eb,:root:not([data-theme="light"]) .ggl-app .ln-n{color:var(--ggl-lite);}}',
      '.ggl-in h1:focus{outline:none;}.ggl-muted{color:var(--ggl-soft);}.ggl-card{background:var(--ggl-card);border:1px solid var(--ggl-line);border-radius:16px;padding:16px 18px;margin-top:14px;}',
      '.ggl-spread{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap;}.ggl-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;}',
      '.ggl-link{background:none;border:0;padding:8px 0;font:inherit;font-weight:600;color:var(--ggl-acc);cursor:pointer;min-height:44px;}',
      ':root[data-theme="dark"] .ggl-app .ggl-link,:root[data-theme="dark"] .ggl-app .ln-item>svg{color:var(--ggl-lite);}',
      '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .ggl-app .ggl-link,:root:not([data-theme="light"]) .ggl-app .ln-item>svg{color:var(--ggl-lite);}}',
      ':root[data-theme="dark"] .ggl-app .ggl-btn:not(.pri):not(.quiet){color:var(--ggl-lite);border-color:var(--ggl-lite);}',
      '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .ggl-app .ggl-btn:not(.pri):not(.quiet){color:var(--ggl-lite);border-color:var(--ggl-lite);}}',
      '.ggl-endbar.over .ggl-btn:not(.pri):not(.quiet){color:var(--ggl-acc) !important;border-color:var(--ggl-acc) !important;}',
      '.ggl-app .ln-cap .w.on{color:var(--ggl-lite,var(--ggl-acc));}',
      /* Willow Learn: From the Bedside, breathing, words to say, the story link, and support videos */
      '.ln-story{position:absolute;inset:34px 60px;background:#FFFCF6;border:1px solid #DDD0B8;border-left:10px solid var(--k);border-radius:20px;padding:30px 40px;}',
      '.ln-story h3{font-family:\'Cormorant Garamond\',serif;font-weight:600;font-size:42px;line-height:1.05;margin:6px 0 14px;}',
      '.ln-st-b p{font-size:23px;line-height:1.38;margin:0 0 10px;color:#3A2A1E;}',
      '.ln-st-l{font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:30px;line-height:1.2;color:var(--k);margin-top:14px;}',
      /* Grounded Stories (BLD 784): the tale scene. On a phone the stage shows the sentence being read, large. */
      '.ln-tale{position:absolute;inset:30px 56px;background:#FFFCF6;border:1px solid #DDD0B8;border-top:8px solid var(--k);border-radius:20px;padding:24px 40px;overflow:hidden;}',
      '.ln-tale .ln-eb{font-size:15px;}.ln-tale h3{font-family:\'Cormorant Garamond\',serif;font-weight:600;font-size:26px;line-height:1.1;margin:2px 0 14px;color:#6B5A4D;}',
      '.ln-tl{font-family:\'Cormorant Garamond\',Georgia,serif;font-size:var(--tf,24px);line-height:1.42;color:#2C1810;}.ln-tl-br{display:block;height:.55em;}',
      '.ggl-small .ln-tale{padding:40px 50px;}.ggl-small .ln-tale .ln-eb{font-size:30px;}.ggl-small .ln-tale h3{font-size:44px;}.ggl-small .ln-tl{font-size:52px;line-height:1.25;}.ggl-small .ln-tl-br{display:none;}',
      '.ggl-small .ln-tl-s.hold{display:none;}', '.ggl-small .ln-tl-s:has(~ .ln-tl-s:not(.hold)){display:none;}',
      '.ln-st-n{position:absolute;right:30px;bottom:16px;font-size:16px;color:#6B5A4D;}',
      '.ln-br{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;padding-top:40px;text-align:center;}',
      '.ln-br h3{font-family:\'Cormorant Garamond\',serif;font-weight:600;font-size:44px;margin:0;}.ln-br small{font-size:22px;color:#6B5A4D;margin-top:14px;max-width:700px;}',
      '.ln-brw{position:relative;width:300px;height:300px;margin-top:22px;display:grid;place-items:center;}',
      '.ln-brc{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle,var(--k) 0%,rgba(255,252,246,0) 72%);opacity:.55;transform:scale(.45);}',
      '.go .ln-brc{animation:lnBr 10s ease-in-out infinite;}',
      '.ln-brt{position:relative;font-family:\'Cormorant Garamond\',serif;font-size:36px;font-weight:600;height:44px;width:300px;}',
      '.ln-brt i{position:absolute;left:0;right:0;font-style:normal;opacity:0;}',
      '.go .ln-brt i:first-child{animation:lnIn 10s linear infinite;}.go .ln-brt i:last-child{animation:lnOut 10s linear infinite;}',
      '@keyframes lnBr{0%{transform:scale(.45)}40%{transform:scale(1)}100%{transform:scale(.45)}}',
      '@keyframes lnIn{0%,36%{opacity:1}40%,100%{opacity:0}}@keyframes lnOut{0%,38%{opacity:0}42%,96%{opacity:1}100%{opacity:0}}',
      '.ln-wd{position:absolute;inset:0;padding:44px 80px;}.ln-wd h3{font-family:\'Cormorant Garamond\',serif;font-weight:600;font-size:44px;margin:0 0 20px;}',
      '.ln-wd p{font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:36px;line-height:1.15;margin:0 0 14px;padding-left:20px;border-left:5px solid #8B5E1A;}.ln-wd small{display:block;font-size:21px;color:#6B5A4D;margin-top:8px;}',
      '.ggl-small .ln-st-b{display:none;}.ggl-small .ln-story{padding:44px 54px;}.ggl-small .ln-story h3{font-size:66px;margin-top:14px;}.ggl-small .ln-st-l{font-size:52px;margin-top:26px;}.ggl-small .ln-st-n{font-size:26px;}.ggl-small .ln-st-l{transition-delay:1.2s !important;}.ggl-small .ln-story .ln-eb{font-size:28px;}',
      '.ln-link{margin:0 0 8px;}.ln-link:empty{display:none;}.ln-link a{display:inline-flex;align-items:center;min-height:44px;font-weight:600;color:var(--ggl-acc);}.ln-link .gg-src a,.ln-link .gg-src-line a{display:inline;min-height:0;font-weight:inherit;}',
      ':root[data-theme="dark"] .ggl-app .ln-link a{color:var(--ggl-lite);}@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .ggl-app .ln-link a{color:var(--ggl-lite);}}',
      '.ln-mu{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;font-size:14px;margin:8px 0 0;}.ln-mu-k{font-weight:600;}.ln-mu select{font:inherit;font-size:14px;padding:4px 6px;border-radius:8px;background:transparent;color:inherit;border:1px solid currentColor;}.ln-mu select option{color:#2C1810;background:#FFFCF6;}.ln-mu-b{font:inherit;font-size:14px;padding:5px 10px;border-radius:999px;border:1px solid currentColor;background:transparent;color:inherit;cursor:pointer;}.ggl-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}',
      '.ln-crisis{margin:8px 2px 0;padding:0;font-size:13px;line-height:1.5;opacity:.75;}.ln-crisis b{font-weight:600;margin-right:6px;}',
      '.ggl-sup{margin-top:22px;}.ggl-sup>p{margin:4px 0 0;}.ggl-sup .ggl-card{border-left:6px solid var(--ggl-bar,var(--ggl-acc));}',
      // Written pages (GWG BLD 787)
      '.ggl-pg-eb{margin:14px 0 0;}.ggl-page{margin-top:2px;}.ggl-pg{font-size:calc(17px * var(--ggl-scale,1));line-height:1.65;margin-top:12px;}.ggl-pg h2{font-family:\'Cormorant Garamond\',serif;font-weight:600;font-size:26px;line-height:1.15;margin:22px 0 6px;}',
      '.ggl-pg-link a{font-weight:600;color:var(--ggl-acc);}.ggl-pg p{margin:0 0 10px;}.ggl-pg ul{margin:0 0 12px;padding-left:22px;}.ggl-pg li{margin:5px 0;}.ggl-pg-lead{font-size:1.08em;}.ggl-pg-lab{margin:12px 0 4px !important;}.ggl-pg-src{margin-top:8px;color:var(--ggl-soft);}.ggl-pg-src a{color:inherit;}',
      ':root[data-theme="dark"] .ggl-app .ggl-pg-link a{color:var(--ggl-lite);}@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .ggl-app .ggl-pg-link a{color:var(--ggl-lite);}}',
      // Learn opens to category cards (BLD 725); each opens to its videos.
      // The top (GWG BLD 790): a search bar and category tabs, like the tree pages' When Life Changes.
      '.ggl-find{margin-top:14px;}.ggl-q{display:block;width:100%;box-sizing:border-box;min-height:48px;padding:10px 14px;border:1.5px solid var(--ggl-line);border-radius:12px;background:var(--ggl-card);color:var(--ggl-ink);font:inherit;font-size:17px;}.ggl-q::placeholder{color:var(--ggl-soft);opacity:1;}.ggl-q:focus-visible{outline:3px solid var(--ggl-acc);outline-offset:2px;border-color:var(--ggl-acc);}',
      '.ggl-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;}.ggl-chip{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:8px 16px;border-radius:999px;border:1.5px solid var(--ggl-line);background:var(--ggl-card);color:var(--ggl-ink);font:inherit;font-weight:600;font-size:16px;cursor:pointer;line-height:1.2;text-align:left;}.ggl-chip:hover{border-color:var(--ggl-acc);}.ggl-chip.on{background:var(--ggl-acc);border-color:var(--ggl-acc);color:#FFF8EC;}.ggl-chip svg{width:18px;height:18px;flex:none;}',
      ':root[data-theme="dark"] .ggl-app .ggl-chip.on{background:var(--ggl-lite);border-color:var(--ggl-lite);color:#1F1A14;}@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .ggl-app .ggl-chip.on{background:var(--ggl-lite);border-color:var(--ggl-lite);color:#1F1A14;}}',
      '.ggl-chip:focus-visible,.ggl-cat:focus-visible{outline:3px solid var(--ggl-acc);outline-offset:2px;}:root[data-theme="dark"] .ggl-app .ggl-chip:focus-visible,:root[data-theme="dark"] .ggl-app .ggl-cat:focus-visible{outline-color:var(--ggl-lite);}@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .ggl-app .ggl-chip:focus-visible,:root:not([data-theme="light"]) .ggl-app .ggl-cat:focus-visible{outline-color:var(--ggl-lite);}}',
      '.ggl-res{margin-top:14px;}.ggl-res .ln-list{display:grid;gap:8px;}.ggl-res .ln-t small{display:block;}.ggl-res-k{display:block;font-size:14px;font-weight:600;color:var(--ggl-soft);margin-top:1px;}',
      '.ggl-cats{display:grid;gap:12px;margin-top:14px;}@media(min-width:720px){.ggl-cats{grid-template-columns:1fr 1fr;}}.ggl-cat{display:block;width:100%;text-align:left;font:inherit;color:inherit;cursor:pointer;margin-top:0;border-left:6px solid var(--ggl-bar,var(--ggl-acc));}.ggl-cat:hover{border-color:var(--ggl-acc);}.ggl-cat h3{margin:2px 0 4px;}.ggl-cat .ggl-cat-n{margin:8px 0 0;font-weight:600;font-size:15px;}.ggl-cat .ggl-cat-go{float:right;opacity:.7;}',
      /* the demo scene (GWG BLD 824): a real app screen in a phone, over the painting */
      '.ln-dm-bg{position:absolute;inset:-20px;width:calc(100% + 40px);height:calc(100% + 40px);object-fit:cover;filter:blur(10px) saturate(1.05);transform:scale(1.02);}',
      '.go .ln-dm-bg{animation:lnDmKb 24s ease-out both;}@keyframes lnDmKb{from{transform:scale(1.02)}to{transform:scale(1.12) translateX(-12px)}}',
      '.ln-dm-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(20,13,7,.78) 0%,rgba(20,13,7,.6) 46%,rgba(20,13,7,.28) 100%);}',
      '.ln-big-sh{background:rgba(20,13,7,.62);}.ln-big-on{color:#F6EFE2;}.ln-big-on p{text-shadow:0 2px 14px rgba(0,0,0,.45);}.ln-big-on small{color:#E9D7B4 !important;}',
      '.ln-dm-tx{position:absolute;left:56px;top:56px;width:470px;color:#F6EFE2;}.ln-dm-tx.ln-dm-r{left:auto;right:52px;}',
      '.ln-dm-tx h3{font-family:\'Cormorant Garamond\',serif;font-weight:600;font-size:46px;line-height:1.04;margin:6px 0 22px;text-wrap:balance;text-shadow:0 2px 12px rgba(0,0,0,.4);}',
      '.ln-dm-pt{display:flex;gap:14px;align-items:flex-start;margin:0 0 16px;font-size:25px;line-height:1.22;}.ln-dm-pt b{font-weight:600;}.ln-dm-pt small{display:block;font-size:19px;color:#E9D7B4;margin-top:3px;line-height:1.3;}',
      '.ln-dm-pt .ln-dot{width:13px;height:13px;margin-top:9px;box-shadow:0 0 0 3px rgba(246,239,226,.25);}.ln-dm-cue{display:none;}',
      '.ln-dm-ph{position:absolute;left:600px;top:36px;width:300px;height:626px;padding:10px;box-sizing:border-box;border-radius:46px;background:linear-gradient(145deg,#3A2C22,#14100C);box-shadow:0 34px 70px rgba(0,0,0,.5),inset 0 0 0 1.5px rgba(255,240,210,.18);}',
      '.ln-dm-ph.ln-dm-l{left:64px;}.ln-dm-ph2{left:470px;top:84px;transform:scale(.82) rotate(-5deg) !important;transform-origin:50% 0;opacity:.0;filter:brightness(.82);}.go .ln-dm-ph2{opacity:.92;}.ln-dm-ph2.ln-dm-l{left:200px;transform:scale(.82) rotate(5deg) !important;}',
      '.ln-dm-sc{position:relative;width:280px;height:606px;border-radius:36px;overflow:hidden;background:#F6EFE2;}.ln-dm-ph2 .ln-dm-sc img{width:100%;display:block;}',
      '.ln-dm-cam{position:absolute;left:0;top:0;width:280px;height:606px;transform-origin:0 0;transition:transform 1.9s cubic-bezier(.45,.05,.25,1);}',
      '.ln-dm-cam img{position:absolute;left:0;top:0;width:280px;height:606px;opacity:0;transition:opacity .8s ease;}.ln-dm-cam img.on{opacity:1;}',
      '.ln-dm-mk{position:absolute;border-radius:10px;box-shadow:0 0 0 2.5px #E7A93B,0 0 0 9px rgba(231,169,59,.28),0 0 28px rgba(231,169,59,.55);opacity:0;transform:scale(1.12);transition:opacity .6s ease,transform .6s ease;pointer-events:none;}',
      '.ln-dm-mk.on{opacity:1;transform:none;animation:lnDmPulse 2.4s ease-in-out .6s infinite;}@keyframes lnDmPulse{50%{box-shadow:0 0 0 2.5px #E7A93B,0 0 0 13px rgba(231,169,59,.16),0 0 34px rgba(231,169,59,.4)}}',
      '.ggl-small .ln-dm-list{display:none;}.ggl-small .ln-dm-tx{top:80px;width:440px;}.ggl-small .ln-dm-tx h3{font-size:58px;}.ggl-small .ln-dm-tx .ln-eb{font-size:28px;}.ggl-small .ln-dm-ph2{display:none;}',
      '@media (prefers-reduced-motion:reduce){.go .ln-dm-bg,.ln-dm-mk.on{animation:none !important;}.ln-dm-cam,.ln-dm-cam img,.ln-dm-mk{transition:none !important;}}',
      '@media (prefers-reduced-motion:reduce){.go .ln-brc,.go .ln-brt i{animation:none !important;}.ln-brc{transform:scale(.8);}.ln-brt i:first-child{opacity:1;top:-22px;}.ln-brt i:last-child{opacity:1;top:22px;}}',
      '@media (prefers-reduced-motion:reduce){.ln-canvas .a,.ln-ptr,.ln-ring,.ln-panel,.ln-note,.ln-res,.ln-tgt{transition:none !important;}}',
      ".ln-canvas{position:absolute;left:0;top:0;width:960px;height:540px;transform-origin:0 0;font-family:Barlow,system-ui,sans-serif;color:#2C1810;--ln-gold:#8B5E1A;}\n.ln-canvas .a{opacity:0;transform:translateY(14px);transition:opacity .7s ease,transform .7s ease;}.go .ln-canvas .a{opacity:1;transform:none;}\n.ln-hero{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 50%;}\n.ln-shade{position:absolute;inset:0;pointer-events:none;}\n.ln-sh-l{background:linear-gradient(180deg,rgba(20,13,7,.34) 0%,rgba(20,13,7,0) 24%,rgba(20,13,7,0) 80%,rgba(20,13,7,.3) 100%),linear-gradient(90deg,rgba(20,13,7,.66) 0%,rgba(20,13,7,.48) 34%,rgba(20,13,7,.14) 58%,rgba(20,13,7,0) 72%);}\n.ln-sh-r{background:linear-gradient(180deg,rgba(20,13,7,.34) 0%,rgba(20,13,7,0) 24%,rgba(20,13,7,0) 80%,rgba(20,13,7,.3) 100%),linear-gradient(270deg,rgba(20,13,7,.66) 0%,rgba(20,13,7,.48) 34%,rgba(20,13,7,.14) 58%,rgba(20,13,7,0) 72%);}\n.ln-sh-t{background:linear-gradient(180deg,rgba(20,13,7,.7) 0%,rgba(20,13,7,.52) 32%,rgba(20,13,7,.14) 56%,rgba(20,13,7,0) 66%,rgba(20,13,7,0) 82%,rgba(20,13,7,.3) 100%);}\n.ln-tt.ln-tt-r{left:auto;right:48px;}.ggl-small .ln-tt.ln-tt-t{top:48px;}.ln-tt .ln-eb,.ln-tt p,.ln-tt .ln-by{text-shadow:0 1px 8px rgba(0,0,0,.45);}\n.ln-tt h2.ln-h2{font-size:52px;}.ln-tt h2.ln-h3{font-size:46px;}.ln-tt h2.ln-h4{font-size:40px;}\n.ln-tt{position:absolute;left:56px;top:48px;color:#F6EFE2;max-width:520px;}.ln-tt h2{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:60px;line-height:1.02;margin:6px 0 0;text-shadow:0 2px 14px rgba(0,0,0,.45);}\n.ln-tt p{font-size:24px;margin:12px 0 0;color:#F2DDB5;}.ln-eb{font-family:'Barlow Condensed',sans-serif;font-weight:600;letter-spacing:2px;text-transform:uppercase;font-size:20px;color:#F2C46A;}\n.ln-by{font-family:'Barlow Condensed',sans-serif;letter-spacing:2.4px;font-size:16px;margin-top:14px;opacity:.9;}\n.ln-big{position:absolute;inset:0;display:grid;place-content:center;text-align:center;padding:0 90px;}.ln-big p{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:52px;line-height:1.15;margin:0;}.ln-big small{display:block;font-size:26px;color:#6B5A4D;margin-top:20px;}\n.ln-pts{padding:48px 70px;}.ln-pts h3{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:46px;margin:0 0 22px;}\n.ln-pt{display:flex;gap:16px;align-items:flex-start;margin:0 0 18px;font-size:28px;line-height:1.25;}.ln-pt small{display:block;font-size:21px;color:#6B5A4D;margin-top:2px;}\n.ln-dot{width:16px;height:16px;border-radius:50%;flex:none;margin-top:10px;}\n.ln-trees h3{position:absolute;top:56px;left:0;right:0;text-align:center;font-family:'Cormorant Garamond',serif;font-weight:600;font-size:44px;margin:0;}\n.ln-trow{position:absolute;left:30px;right:30px;bottom:90px;display:flex;justify-content:center;gap:18px;}\n.ln-tr{flex:1;display:flex;flex-direction:column;align-items:center;text-align:center;max-width:130px;}.ln-tr img{width:110px;height:110px;border-radius:24px;}\n.ln-tr b{font-family:'Cormorant Garamond',serif;font-size:30px;margin-top:8px;}.ln-tr small{font-size:17px;color:#6B5A4D;}\n.ln-trow.ln-t8{gap:12px;left:20px;right:20px;}.ln-t8 .ln-tr img{width:92px;height:92px;border-radius:20px;}.ln-t8 .ln-tr b{font-size:26px;}.ln-t8 .ln-tr small{font-size:15px;}\n.ln-lv{position:absolute;inset:0;display:flex;gap:36px;align-items:center;justify-content:center;padding:0 60px;}\n.ln-lc{flex:1;background:#FFFCF6;border:1px solid #DDD0B8;border-top:8px solid var(--k);border-radius:20px;padding:44px 20px;text-align:center;}\n.ln-lc b{display:block;font-family:'Cormorant Garamond',serif;font-size:46px;color:var(--k);}.ln-lc small{font-size:22px;color:#6B5A4D;}\n.ln-flow{padding:50px 50px;}.ln-flow h3{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:44px;margin:0 0 40px;}\n.ln-frow{display:flex;align-items:center;gap:14px;}.ln-step{flex:1;background:#FFFCF6;border:1px solid #DDD0B8;border-radius:18px;padding:22px 18px;min-height:200px;}\n.ln-step b{display:block;font-size:26px;line-height:1.2;margin-top:10px;}.ln-step small{display:block;font-size:19px;color:#6B5A4D;margin-top:8px;line-height:1.3;}\n.ln-sn{display:inline-grid;place-items:center;width:40px;height:40px;border-radius:50%;background:#8B5E1A;color:#FFF8EC;font-weight:700;font-size:20px;}\n.ln-arr{font-size:36px;color:#8B5E1A;flex:none;}\n.ln-phone{position:absolute;left:56px;top:34px;width:380px;height:472px;background:#FFFCF6;border:1px solid #DDD0B8;border-radius:30px;overflow:hidden;font-size:21px;}\n.ln-ptop{display:flex;align-items:center;gap:10px;padding:14px 16px;color:#F6EFE2;}.ln-ptop img{width:36px;height:36px;border-radius:9px;}.ln-ptop b{font-family:'Cormorant Garamond',serif;font-size:28px;}.ln-ptop span{margin-left:auto;font-size:17px;opacity:.9;}\n.ln-prow{display:flex;justify-content:space-between;padding:13px 18px;border-top:1px solid #EFE6D4;}\n.ln-tgt{transition:background .3s ease 2.6s,box-shadow .3s ease 2.6s;}.go .ln-tgt{background:#F6EEDB;box-shadow:inset 0 0 0 2px #8B5E1A;}\n.ln-panel{position:absolute;right:56px;top:70px;width:400px;background:#FFFCF6;border:1px solid #DDD0B8;border-left:8px solid #8B5E1A;padding:22px 24px;transform:translateX(560px);transition:transform .7s ease 3s;}\n.go .ln-panel{transform:none;}.ln-panel h4{font-family:'Cormorant Garamond',serif;font-size:32px;margin:0;}.ln-panel p{font-size:19px;color:#6B5A4D;margin:6px 0 10px;}.ln-panel li{font-size:22px;line-height:1.6;}\n.ln-ptr{position:absolute;left:820px;top:520px;width:56px;z-index:5;transition:left 1.3s ease 1.1s,top 1.3s ease 1.1s;filter:drop-shadow(0 2px 3px rgba(0,0,0,.25));}\n.go .ln-ptr{left:var(--px,600px);top:var(--py,300px);}\n.ln-ring{position:absolute;width:48px;height:48px;border-radius:50%;border:4px solid #8B5E1A;opacity:0;transform:scale(.3);transition:all .5s ease 2.5s;z-index:4;}.go .ln-ring{opacity:.85;transform:scale(1.5);}\n.ln-fg{position:absolute;inset:30px 40px;background:#F6F0E4;border:1px solid #DDD0B8;border-radius:22px;overflow:hidden;}\n.ln-fgtop{background:#2E2118;color:#D9A847;padding:16px 22px;font-family:'Cormorant Garamond',serif;font-size:28px;}\n.ln-fgtabs{display:flex;gap:6px;padding:12px 16px;border-bottom:1px solid #DDD0B8;flex-wrap:wrap;}.ln-fgtabs span{padding:10px 14px;border-radius:12px;font-size:20px;font-weight:600;color:#6B5A4D;}\n.ln-note{margin:26px 26px;background:#FFFCF6;border:1px solid #DDD0B8;border-radius:18px;padding:22px 24px;opacity:0;transform:translateY(16px);transition:all .7s ease 3s;}.go .ln-note{opacity:1;transform:none;}\n.ln-note h4{font-family:'Cormorant Garamond',serif;font-size:34px;margin:0 0 6px;}.ln-note p{font-size:22px;color:#6B5A4D;margin:0;line-height:1.35;}\n.ln-card{position:absolute;left:70px;top:40px;width:540px;background:#FFFCF6;border:1px solid #DDD0B8;border-radius:22px;padding:24px 28px;}\n.ln-card h4{font-family:'Cormorant Garamond',serif;font-size:34px;margin:0 0 6px;}.ln-card p{font-size:19px;color:#6B5A4D;margin:0 0 10px;line-height:1.35;}\n.ln-card label{display:block;font-size:17px;font-weight:600;margin-top:10px;}.ln-in{border:1px solid #DDD0B8;border-radius:10px;padding:9px 12px;font-size:19px;margin-top:4px;background:#fff;min-height:42px;}\n.ln-btns{display:flex;gap:10px;margin-top:18px;flex-wrap:wrap;}.ln-b{border:1px solid #8B5E1A;color:#8B5E1A;border-radius:999px;padding:10px 18px;font-weight:600;font-size:18px;}.ln-b.pri{background:#8B5E1A;color:#FFF8EC;}\n.ln-res{position:absolute;right:60px;bottom:60px;max-width:300px;background:#2E2118;color:#FFF8EC;border-radius:18px;padding:16px 20px;font-size:20px;line-height:1.3;opacity:0;transform:translateY(14px);transition:all .6s ease 3.1s;}.go .ln-res{opacity:1;transform:none;}\n.ln-qz{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 80px;}.ln-qz .ln-eb{color:#8B5E1A;}.ln-qz h3{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:48px;line-height:1.1;margin:10px 0 0;}\n"
    ].join('\n');
    document.head.appendChild(s);
  }

  /* ---------------- the player ---------------- */
  var CUR = null; // the player on screen
  /* ---------------- recorded voices for every public video (BLD 778) ----------------
     Lessons opened from an app's Learn (the eight trees) play recorded clips from Azure neural voices, stored on
     Cloudflare R2 and served at audio.growwithgrounded.com/<round>/<voice>/<name>.mp3. Brian stands in for Chris,
     Jenny for Kayti (Chris, BLD 778; Emma in BLD 777); a video keeps one voice from start to finish. A clip's name comes from its voice
     and its sentence (clipName), so a wording change asks for a new clip, and the closing lines and quiz replies are
     shared by every video in that voice. REC.round names the recording round that plays; empty plays device voices.
     A missing clip falls back to the device voice for that sentence. Page videos keep their own clips (audio: 'pv').
     Sealed videos play locked clips instead (cfg.sealed, BLD 781, below).
     VOICES: each app's voice, with the tracks and the guide side (helper: For the Grown-up, For the Helper, For the
     Leader) that take the other voice. A lesson can name its own (voice: 'brian' or 'jenny'). */
  var REC = { base: 'https://audio.growwithgrounded.com/', round: 'v1' };
  var VOICES = {
    maple: { all: 'jenny', helper: 'brian', tracks: { 'maple-grownups': 'brian' } },
    aspen: { all: 'jenny', helper: 'brian', tracks: { 'aspen-grownups': 'brian' } },
    pine: { all: 'jenny', helper: 'brian', tracks: { 'pine-grownup': 'brian' } },
    birch: { all: 'brian' }, oak: { all: 'brian' }, sequoia: { all: 'brian' }, willow: { all: 'brian' },
    grove: { all: 'jenny', helper: 'brian', tracks: { 'grove-lead': 'brian' } }
  };
  function recVoice(cfg, any) {
    var l = (cfg && cfg.lesson) || {}, t = (cfg && cfg.track) || {}, V = VOICES[cfg && cfg.app];
    // A caller outside the trees can name the public voice itself (cfg.voice; Grounded Stories, BLD 784).
    if (cfg && (cfg.voice === 'brian' || cfg.voice === 'jenny') && !cfg.sealed && (REC.round || any) && l.id) return cfg.voice;
    if ((!REC.round && !any) || !V || !l.id || t.kind === 'forguides' || t.kind === 'setup') return '';
    if (l.voice) return l.voice;
    if (V.helper && /-helper$/.test(l.id)) return V.helper;
    return (V.tracks || {})[t.id] || V.all;
  }
  // cyrb53 (a public domain 53-bit string hash, by bryc): the same sentence always gets the same name.
  function clipName(voice, text) {
    var h1 = 0xdeadbeef, h2 = 0x41c6ce57, s = voice + '\n' + String(text).replace(/\s+/g, ' ').trim();
    for (var i = 0, c; i < s.length; i++) { c = s.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507); h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507); h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return voice + '/' + (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  }
  function clipUrl(voice, text) { return REC.base + REC.round + '/' + clipName(voice, text) + '.mp3'; }
  /* ---------------- locked clips for the sealed videos (BLD 781) ----------------
     Sealed videos (the Field Guide's For Guides videos, Guide trainings, and Learn, and Heartwood's Learn) play recorded
     clips that are locked: each one is encrypted (AES-GCM 256) with the audio key kept inside the sealed library the
     lesson came from, so anyone without a code gets only unreadable files. The caller passes cfg.sealed = {key: the
     library's audio object {v, round, folder, key}, voice: 'brian' or 'jenny'}. The 32 key bytes are used twice: to
     unlock (AES-GCM) and to name (HMAC SHA-256). A clip's name is the lowercase hex of the first 16 bytes of
     HMAC(key, voice + '|' + sentence), the exact sentence the player speaks, at <REC.base><round>/<folder>/<name>.bin;
     the file is a 12-byte IV, then the AES-GCM ciphertext (with its tag) of the mp3. A library without audio, a missing
     or locked clip, or a browser without WebCrypto plays the device voice (for that sentence only). */
  var SKEYS = {};
  function sealedOk(s) {
    var k = s && s.key;
    return !!(k && typeof k.key === 'string' && /^[a-z0-9]+$/i.test(String(k.round || '')) && /^[a-z0-9]+$/i.test(String(k.folder || '')) && (s.voice === 'brian' || s.voice === 'jenny')
      && window.crypto && crypto.subtle && window.TextEncoder && window.fetch && window.Blob && window.URL && URL.createObjectURL);
  }
  function sealedKeys(k) {
    if (!SKEYS[k.key]) SKEYS[k.key] = Promise.resolve().then(function () {
      var raw = Uint8Array.from(atob(k.key), function (c) { return c.charCodeAt(0); });
      if (raw.length !== 32) throw new Error('key');
      return Promise.all([crypto.subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['decrypt']), crypto.subtle.importKey('raw', raw, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])]);
    });
    return SKEYS[k.key];
  }
  function sealedName(k, voice, text) {
    return sealedKeys(k).then(function (ks) { return crypto.subtle.sign('HMAC', ks[1], new TextEncoder().encode(voice + '|' + text)); }).then(function (sig) {
      return Array.prototype.map.call(new Uint8Array(sig).slice(0, 16), function (b) { return (b < 16 ? '0' : '') + b.toString(16); }).join('');
    });
  }
  // Resolves a Blob URL of the unlocked mp3, or rejects (no clip, wrong key, no WebCrypto).
  function sealedClip(k, voice, text) {
    return sealedName(k, voice, text).then(function (n) { return fetch(REC.base + k.round + '/' + k.folder + '/' + n + '.bin'); })
      .then(function (r) { if (!r.ok) throw new Error('clip ' + r.status); return r.arrayBuffer(); })
      .then(function (buf) { if (buf.byteLength < 29) throw new Error('clip'); return sealedKeys(k).then(function (ks) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: buf.slice(0, 12) }, ks[0], buf.slice(12)); }); })
      .then(function (mp3) { return URL.createObjectURL(new Blob([mp3], { type: 'audio/mpeg' })); });
  }
  // A moment of silence, played on the first tap, so Safari lets the one audio element play the locked clips that
  // arrive after the tap (a clip that is fetched and unlocked first misses the tap itself).
  var SILENT = null;
  function silent() {
    if (SILENT) return SILENT;
    var n = 400, b = new Uint8Array(44 + n), d = new DataView(b.buffer), w = function (o, t) { for (var i = 0; i < t.length; i++) b[o + i] = t.charCodeAt(i); };
    w(0, 'RIFF'); d.setUint32(4, 36 + n, true); w(8, 'WAVEfmt '); d.setUint32(16, 16, true); d.setUint16(20, 1, true); d.setUint16(22, 1, true);
    d.setUint32(24, 8000, true); d.setUint32(28, 8000, true); d.setUint16(32, 1, true); d.setUint16(34, 8, true); w(36, 'data'); d.setUint32(40, n, true);
    for (var i = 44; i < b.length; i++) b[i] = 128;
    return (SILENT = 'data:audio/wav;base64,' + btoa(String.fromCharCode.apply(null, b)));
  }
  function speak(t, onend) { try { if (window.GGRead && GGRead.available) { GGRead.say(t, onend ? { onend: onend } : undefined); return true; } } catch (e) {} return false; }
  /* ---------------- beats (Learn Voice build, October 2026) ----------------
     Narration is spoken one sentence at a time with a real pause between, and each bullet, step, or card
     shows as its sentence starts. A scene can tune this with cue (the words never change):
       cue.w  {beatIndex: seconds}  a pause-and-do: wait this long after that sentence, with a countdown ring
       cue.p  {beatIndex: seconds}  a longer plain pause after that sentence, no ring
       cue.at [beatIndex, ...]      which sentence shows each item (otherwise matched by its words)
     A scene can also give beats: ['sentence', {t:'sentence', w:8}] instead of splitting say. */
  var ABBR = /\b(Mr|Mrs|Ms|Dr|St|Rev|Fr|Sr|Jr|vs|etc|No)\.$/i;
  function beatsOf(sc) {
    var cue = sc.cue || {};
    if (Array.isArray(sc.beats)) return sc.beats.map(function (b, i) { return typeof b === 'string' ? { t: b, w: +(cue.w || {})[i] || 0, p: +(cue.p || {})[i] || 0 } : { t: b.t || '', w: +b.w || 0, p: +b.p || 0 }; });
    var txt = String(sc.say || '').replace(/\s+/g, ' ').trim(); if (!txt) return [];
    var parts = txt.match(/[^.!?]+(?:[.!?]+["'\u201d\u2019)]*|$)/g) || [txt], out = [];
    parts.forEach(function (x) {
      x = x.trim(); if (!x) return;
      var prev = out[out.length - 1];
      if (prev && (ABBR.test(prev) || (/\d\.$/.test(prev) && /^\d/.test(x)) || x.length < 3)) out[out.length - 1] = prev + (/^\d/.test(x) && /\d\.$/.test(prev) ? '' : ' ') + x;
      else out.push(x);
    });
    return out.map(function (t, i) { return { t: t, w: +(cue.w || {})[i] || 0, p: +(cue.p || {})[i] || 0 }; });
  }
  var REV = { demo: '.ln-dm-pt', points: '.ln-pt', flow: '.ln-step', six: '.ln-sx', trees: '.ln-tr', levels: '.ln-lc', words: '.ln-wd p', parts: 'svg g.a', story: '.ln-st-b p', tale: '.ln-tl-s' };
  var NUMW = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  var STOPW = /^(the|and|for|you|your|are|but|not|all|can|with|that|this|them|they|what|when|have|has|will|from|more|like|about|just|into|than|then|there|their|who|how|its|our|out|one's|things|thing|way|get|let|use|was|were|been|being|each|every|some|any|also|very|much|most|make|made|feel)$/;
  function words(t) { return String(t || '').toLowerCase().replace(/\b(\d{1,2})\b/g, function (m) { return NUMW[+m] || m; }).replace(/[^a-z' ]+/g, ' ').split(/\s+/).filter(function (w) { return w.length >= 3 && !STOPW.test(w); }); }
  // Which sentence shows each item: by hand (cue.at), by its words, or spread evenly.
  function revealMap(sc, items, beats) {
    var n = items.length, m = beats.length, at = (sc.cue || {}).at, map = [], prev = 0;
    if (!n || !m) return map;
    if (Array.isArray(at)) return items.map(function (x, j) { return Math.max(0, Math.min(m - 1, at[j] == null ? m - 1 : at[j])); });
    var bw = beats.map(function (b) { return ' ' + words(b.t).join(' ') + ' '; });
    var even = sc.k === 'story';
    items.forEach(function (el, j) {
      var k = -1;
      if (!even) {
        var key = el.querySelector('b'), kw = words((key || el).textContent);
        for (var i = prev; i < m && k < 0; i++) for (var q = 0; q < kw.length; q++) if (bw[i].indexOf(' ' + kw[q] + ' ') >= 0) { k = i; break; }
      }
      if (k < 0) k = Math.max(prev, Math.min(m - 1, Math.round(j * m / n)));
      map.push(k); prev = k;
    });
    return map;
  }
  function hush() { try { if (window.GGRead) GGRead.stop(); else if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {} }
  function allLessons(tracks) { var f = []; (tracks || []).forEach(function (t) { (t.lessons || []).forEach(function (l) { f.push({ t: t, l: l }); }); }); return f; }
  function certable(t) { return !!t && t.kind !== 'support' && t.kind !== 'guide' && t.kind !== 'forguides' && t.cert !== false && (t.cert === true || (t.lessons || []).length >= 3); }
  function trackDone(t, done) { return !!t && (t.lessons || []).length > 0 && t.lessons.every(function (l) { return done[l.id]; }); }

  // What the closing scene says, worked out from what is finished on this device.
  function ending(cfg) {
    var done = cfg.done || {}, flat = allLessons(cfg.tracks), i = -1;
    flat.forEach(function (x, j) { if (x.l.id === cfg.lesson.id) i = j; });
    var fin = flat.filter(function (x) { return done[x.l.id]; }).length, count = fin + ' of ' + flat.length + ' finished';
    var nx = null; for (var j = i + 1; j < flat.length; j++) if (!done[flat[j].l.id]) { nx = flat[j]; break; }
    if (!nx) for (var k = 0; k < flat.length; k++) if (!done[flat[k].l.id]) { nx = flat[k]; break; }
    var tr = cfg.track, tdone = trackDone(tr, done), cert = !!cfg.cert && tdone && certable(tr);
    // A caller's own closing card (Grounded Stories, BLD 784): cfg.ending {eyebrow, h, sub, say, ok, buttons: [[id, label, class, href]]}.
    if (cfg.ending) { var ce = { ok: true, custom: true, count: '', next: null, cert: false }; for (var ck in cfg.ending) ce[ck] = cfg.ending[ck]; return ce; }
    // A guide video's own last line already points to the full guide, so the closing only says the gentle line (Chris, October 17, 2026: it repeated). GWG BLD 828
    if (tr && tr.kind === 'guide') { var pr = cfg.pair || null; return { ok: true, guide: true, eyebrow: 'Here Whenever You Need It', h: 'Take all the time you need.', sub: pr ? 'There is a video ' + pr.sideName.replace(/^For/, 'for') + ' too.' : '', count: '', say: 'Take all the time you need.', next: null, pair: pr, cert: false }; }
    if (tr && tr.kind === 'forguides') {
      // For Guides (W1): Open the Full Section, Watch Again, Next Video, Back to the Series. Next is the next guide in order.
      var L = tr.lessons || [], at = -1; L.forEach(function (x, j) { if (x.id === cfg.lesson.id) at = j; });
      var nl = L[at + 1] || null; if (!nl) for (var q = 0; q < L.length; q++) if (!done[L[q].id] && L[q].id !== cfg.lesson.id) { nl = L[q]; break; }
      var fdone = trackDone(tr, done), fc = !!cfg.cert && fdone;
      return { ok: true, fg: true, eyebrow: fdone ? 'Ring Complete' : 'For Guides', h: fdone ? 'That\'s every video in ' + (tr.ring || 'this ring') + '.' : 'That\'s the video. Well done.', sub: fc ? 'Your Certificate of Completion is ready.' : nl ? 'Up next: ' + nl.title : 'The full section is here whenever you want it.', count: '', say: fdone ? 'That\'s every video in this ring. Well done. Your certificate is ready whenever you want it.' : 'That\'s the video. Well done. The full section is here whenever you want it.', next: nl ? { l: nl, t: tr } : null, cert: fc };
    }
    // Promo page videos (shared/page-videos.js sets promo: true; Chris, October 10, 2026): a warm thank you to close.
    if (tr && tr.promo) return { ok: true, support: true, eyebrow: 'Grow With Grounded', h: 'Thank you for watching.', sub: 'We would be glad to walk with you.', count: '', say: 'Thank you for watching. We would be glad to walk with you.', next: null, cert: false };
    if (tr && tr.kind === 'support') return { ok: true, support: true, eyebrow: 'Here Whenever You Need It', h: 'Take all the time you need.', sub: nx ? 'Another one, if it helps: ' + nx.l.title : 'Come back anytime.', count: '', say: 'Take all the time you need. This is here whenever you need it.', next: nx, cert: false };
    var upnext = nx ? 'Up next: ' + (nx.t !== tr ? nx.t.title + ', ' : '') + 'Lesson ' + (nx.l.n || '') + ', ' + nx.l.title : '';
    var certLine = cert ? ' Your certificate is ready whenever you want it.' : '';
    if (!nx) return { ok: true, eyebrow: 'Every Lesson Complete', h: "You've finished every lesson. Well done.", sub: cert ? 'Your certificate for ' + tr.title + ' is ready.' : 'Come back anytime to watch one again.', count: count, say: "That's it. You've finished every lesson. Well done." + certLine, next: null, cert: cert };
    if (tdone && (tr.lessons || []).length > 1) return { ok: true, eyebrow: 'Series Complete', h: "That's the whole series. Well done.", sub: 'You finished every lesson in ' + tr.title + '. ' + upnext, count: count, say: "That's it for this series. Well done." + certLine + ' Ready for the next one?', next: nx, cert: cert };
    return { ok: true, eyebrow: 'Lesson ' + (cfg.lesson.n || '') + ' Complete', h: "That's it for this lesson. Nice work.", sub: upnext, count: count, say: "That's it for this lesson. Nice work. Ready for the next one?", next: nx, cert: cert };
  }

  // Sources and Credits (GWG BLD 713): one quiet line under the closing scene, above the copyright line.
  // Lessons carry their own sources (sealed lessons), or shared/gg-sources.js lists them by id; story scenes credit Chris.
  /* ---------------- background music (GWG BLD 720) ----------------
     Soft music under the voice in every video. It fades in when Play is tapped, follows Pause, and fades out
     at the closing scene. Four moods, seven tracks each: learning (lessons, When Life Changes, For Guides), calm (Support for
     Right Now and Support for Guides), kids (Maple and Aspen), willow (Willow and Willow Guide). A video picks
     its mood from the lesson's music key, the listener's chosen mood, cfg.mood, its track kind, then its app, and
     one track from that mood by its lesson id. Safety videos (music: 'safety') always use the two softest Calm
     tracks, lower. Tracks live in /audio/music/<mood>-<n>.mp3 (96k, loudness evened), licensed for apps and
     websites; each carries its credit for the Sources line. With no tracks at all the Music settings stay
     hidden. Beside Voice and Speed, listeners choose Volume (Off, Soft, Medium), Mood (Automatic or one mood),
     and Another Track; all kept on this device. Volume runs through Web Audio where it can, because phones
     ignore an audio element's volume setting. A lesson with crisis: [lines] shows them in one quiet line of type under the video
     from the first scene to the last (Oak Safety, BLD 721). Since BLD 808 the voice never speaks crisis lines or helplines,
     except in videos about suicide or self-harm (Chris, October 15, 2026): this line carries the numbers instead. */
  // Seven licensed tracks per mood (Pixabay Content License, chosen by Chris, GWG BLD 721). Each video always gets the same one.
  var MUSIC = {
    learning: [
      { src: '/audio/music/learning-1.mp3', credit: "\"Fresh Acoustic Guitar and Felt Piano Harmony\" by juraganvisi, Pixabay" },
      { src: '/audio/music/learning-2.mp3', credit: "\"Guitar Music\" by andriig, Pixabay" },
      { src: '/audio/music/learning-3.mp3', credit: "\"Checkmate Chills\" by turning_pages, Pixabay" },
      { src: '/audio/music/learning-4.mp3', credit: "\"Sleepy Lofi Music\" by absolutesound, Pixabay" },
      { src: '/audio/music/learning-5.mp3', credit: "\"Lo-Fi Hip Hop\" by zephiramusic, Pixabay" },
      { src: '/audio/music/learning-6.mp3', credit: "\"Effortless Piano and Guitar Harmony\" by juraganvisi, Pixabay" },
      { src: '/audio/music/learning-7.mp3', credit: "\"Effortless Piano and Guitar Harmony\" by juraganvisi, Pixabay" }
    ],
    calm: [
      { src: '/audio/music/calm-1.mp3', credit: "\"Acoustic Music\" by andriig, Pixabay" },
      { src: '/audio/music/calm-2.mp3', credit: "\"Gentle Ambient Nature Music for Relaxation\" by desifreemusic, Pixabay" },
      { src: '/audio/music/calm-3.mp3', credit: "\"Angelic Vocalise, Nature Ambient\" by moonpetalmedia, Pixabay" },
      { src: '/audio/music/calm-4.mp3', credit: "\"Soft Ambient Textures with Subtle Bird Chirps\" by desifreemusic, Pixabay" },
      { src: '/audio/music/calm-5.mp3', credit: "\"Slow Morning Ritual\" by alex-morgan, Pixabay" },
      { src: '/audio/music/calm-6.mp3', credit: "\"Acoustic Music\" by andriig, Pixabay" },
      { src: '/audio/music/calm-7.mp3', credit: "\"Acoustic Music\" by andriih, Pixabay" }
    ],
    kids: [
      { src: '/audio/music/kids-1.mp3', credit: "\"Cheerful Joyful Playful Music\" by viacheslavstarostin, Pixabay" },
      { src: '/audio/music/kids-2.mp3', credit: "\"Indie Folk\" by octosound, Pixabay" },
      { src: '/audio/music/kids-3.mp3', credit: "\"Playful Lo-Fi Piano with Mellow Focus Pads\" by juraganvisi, Pixabay" },
      { src: '/audio/music/kids-4.mp3', credit: "\"Happy Cute Love Gentle Piano Solo\" by art_roseman, Pixabay" },
      { src: '/audio/music/kids-5.mp3', credit: "\"Happy Piano\" by leberch, Pixabay" },
      { src: '/audio/music/kids-6.mp3', credit: "\"Ukulele\" by atlasaudio, Pixabay" },
      { src: '/audio/music/kids-7.mp3', credit: "\"Ukulele Music\" by tatamusic, Pixabay" }
    ],
    willow: [
      { src: '/audio/music/willow-1.mp3', credit: "\"Tender\" by alexgrohl, Pixabay" },
      { src: '/audio/music/willow-2.mp3', credit: "\"Beautiful Piano and Cello\" by denis-pavlov-music, Pixabay" },
      { src: '/audio/music/willow-3.mp3', credit: "\"Piano and Cello, Beautiful Poetic Music\" by denis-pavlov-music, Pixabay" },
      { src: '/audio/music/willow-4.mp3', credit: "\"Whispered Memories, Piano and Cello\" by icsilviu, Pixabay" },
      { src: '/audio/music/willow-5.mp3', credit: "\"Sad Piano Instrumental\" by trtasfiq, Pixabay" },
      { src: '/audio/music/willow-6.mp3', credit: "\"Piano Music\" by paulyudin, Pixabay" },
      { src: '/audio/music/willow-7.mp3', credit: "\"Piano Music\" by arpmedia, Pixabay" }
    ],
    // Safety videos (GWG BLD 721, Chris): only the two softest Calm tracks, played lower (SAFETY_SCALE).
    safety: [
      { src: '/audio/music/calm-2.mp3', credit: "\"Gentle Ambient Nature Music for Relaxation\" by desifreemusic, Pixabay" },
      { src: '/audio/music/calm-4.mp3', credit: "\"Soft Ambient Textures with Subtle Bird Chirps\" by desifreemusic, Pixabay" }
    ]
  };
  var MUSIC_V = 'mu2', LEVELS = { soft: 0.11, medium: 0.18 }, SAFETY_SCALE = 0.65;
  var MOODS = [['', 'Automatic'], ['learning', 'Learning'], ['calm', 'Calm'], ['kids', 'Kids'], ['willow', 'Willow']];
  var BG = { el: null, ctx: null, gain: null, src: '', fade: 0 };
  function musicHas() { for (var k in MUSIC) if (MUSIC[k] && MUSIC[k].length) return true; return false; }
  // Settings kept on this device (GWG BLD 721): gg-music is 'off', 'soft' (the default; the old 'on' reads as soft)
  // or 'medium'; gg-music-mood is '' (Automatic) or one mood; gg-music-pick holds Another Track turns per video.
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function musicVol() { var v = lsGet('gg-music'); return v === 'off' ? 'off' : v === 'medium' ? 'medium' : 'soft'; }
  function musicOn() { return musicVol() !== 'off'; }
  function musicMood() { var m = lsGet('gg-music-mood') || ''; return m && MUSIC.hasOwnProperty(m) && m !== 'safety' ? m : ''; }
  function musicTurns(id) { try { return +(JSON.parse(lsGet('gg-music-pick') || '{}')[id] || 0); } catch (e) { return 0; } }
  function musicTurn(id) { var o = {}; try { o = JSON.parse(lsGet('gg-music-pick') || '{}') || {}; } catch (e) {} o[id] = (+(o[id] || 0)) + 1; lsSet('gg-music-pick', JSON.stringify(o)); }
  function musicLevel(cfg) { return (LEVELS[musicVol()] || 0) * (moodOf(cfg) === 'safety' ? SAFETY_SCALE : 1); }
  // The track for one video: the same one every time (spread across the mood's list by the lesson id), moved
  // along by Another Track.
  function musicPick(cfg) { var list = MUSIC[moodOf(cfg)] || [], id = String((cfg.lesson || {}).id || ''), h = 0; if (!list.length) return null; for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0; return list[(h + musicTurns(id)) % list.length]; }
  function moodOf(cfg) {
    if (cfg.lesson && cfg.lesson.music === 'safety') return 'safety'; // Safety videos always keep their softest tracks
    if (musicMood()) return musicMood();
    if (cfg.lesson && cfg.lesson.music && MUSIC.hasOwnProperty(cfg.lesson.music)) return cfg.lesson.music;
    if (cfg.mood && MUSIC.hasOwnProperty(cfg.mood)) return cfg.mood;
    if (cfg.track && cfg.track.kind === 'support') return 'calm';
    if (cfg.app === 'maple' || cfg.app === 'aspen') return 'kids';
    if (cfg.app === 'pine' || cfg.app === 'birch') return 'learning'; // high schoolers and young adults get the learning tracks, not the kids' tracks
    if (cfg.app === 'willow') return 'willow';
    return 'learning';
  }
  function bgVol(v) { if (BG.gain) BG.gain.gain.value = v; else if (BG.el) BG.el.volume = v; }
  function bgFade(to, ms, done) {
    clearInterval(BG.fade); var from = BG.gain ? BG.gain.gain.value : (BG.el ? BG.el.volume : 0), t0 = Date.now();
    BG.fade = setInterval(function () { var k = Math.min(1, (Date.now() - t0) / ms); bgVol(from + (to - from) * k); if (k >= 1) { clearInterval(BG.fade); if (done) done(); } }, 50);
  }
  function bgPlay(cfg) {
    var m = musicPick(cfg); if (!m || !m.src || !musicOn()) return;
    try {
      var src = url(m.src + '?v=' + MUSIC_V);
      if (!BG.el) {
        BG.el = new Audio(); BG.el.loop = true; BG.el.preload = 'auto'; BG.el.crossOrigin = 'anonymous';
        var AC = window.AudioContext || window.webkitAudioContext;
        if (AC) { try { BG.ctx = new AC(); BG.gain = BG.ctx.createGain(); BG.gain.gain.value = 0; BG.ctx.createMediaElementSource(BG.el).connect(BG.gain); BG.gain.connect(BG.ctx.destination); } catch (e) { BG.ctx = BG.gain = null; } }
      }
      var go = function () {
        if (BG.src !== src) { BG.el.src = src; BG.src = src; bgVol(0); }
        if (BG.ctx && BG.ctx.state === 'suspended') BG.ctx.resume();
        var pr = BG.el.play(); if (pr && pr.catch) pr.catch(function () {});
        bgFade(musicLevel(cfg), 1800);
      };
      if (BG.src && BG.src !== src && !BG.el.paused) bgFade(0, 400, go); else go(); // a new track fades the old one out first
    } catch (e) {}
  }
  function bgStop(ms) { if (!BG.el) return; bgFade(0, ms || 700, function () { try { BG.el.pause(); } catch (e) {} }); }
  function musicCredit(cfg) { var m = musicPick(cfg); return m && m.src && m.credit && musicOn() ? '<small class="gg-src-line"><span class="gg-src-k">Music:</span> ' + esc(m.credit) + '</small>' : ''; }
  // Music settings beside Voice and Speed: Volume (Off, Soft, Medium), Mood (Automatic or one mood), Another Track.
  function musicSwitch(host, cfg, P) {
    if (!musicHas()) return;
    var w = document.createElement('div'); w.className = 'ln-mu'; w.setAttribute('role', 'group'); w.setAttribute('aria-label', 'Music');
    var safe = moodOf(cfg) === 'safety';
    w.innerHTML = '<span class="ln-mu-k">Music</span>'
      + '<label><span class="ggl-sr">Music volume</span><select data-mu="vol">' + [['off', 'Off'], ['soft', 'Soft'], ['medium', 'Medium']].map(function (o) { return '<option value="' + o[0] + '"' + (musicVol() === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select></label>'
      + (safe ? '' : '<label><span class="ggl-sr">Music mood</span><select data-mu="mood">' + MOODS.map(function (o) { return '<option value="' + o[0] + '"' + (musicMood() === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select></label>')
      + '<button type="button" class="ln-mu-b" data-mu="next"' + (musicOn() ? '' : ' hidden') + '>Another Track</button>'; // shows while music plays (BLD 788)
    var replay = function () { if (P.playing && !P.last && musicOn()) bgPlay(cfg); };
    w.addEventListener('change', function (e) {
      var k = e.target.getAttribute('data-mu');
      if (k === 'vol') { lsSet('gg-music', e.target.value); var nb = w.querySelector('[data-mu="next"]'); if (nb) nb.hidden = !musicOn(); if (!musicOn()) bgStop(300); else if (BG.el && !BG.el.paused) bgFade(musicLevel(cfg), 400); else replay(); }
      if (k === 'mood') { lsSet('gg-music-mood', e.target.value); replay(); }
    });
    w.addEventListener('click', function (e) { if (e.target.getAttribute('data-mu') !== 'next') return; musicTurn(String((cfg.lesson || {}).id || '')); if (musicOn()) { if (P.playing && !P.last) bgPlay(cfg); } });
    var vs = host.querySelector('.ln-vs'); if (vs) vs.appendChild(w);
  }

  function srcLine(l) { if (l && typeof l.srcHtml === 'string') return l.srcHtml; /* a ready Sources line (Grounded Stories, BLD 784) */ try { return window.GGSources ? GGSources.lesson('', l, { tag: 'small' }) : ''; } catch (e) { return ''; } }
  function needSources() {
    if (window.GGSources || document.getElementById('gg-src-js')) return;
    var s = document.createElement('script'); s.id = 'gg-src-js'; s.src = url('/shared/gg-sources.js?v=b888'); document.head.appendChild(s);
  }
  // The watermark (GWG BLD 728): Grow With Grounded top left, the app's own mark bottom right, on every frame,
  // so a screen recording always shows where it came from. White on the colored cover, brown elsewhere (on a phone, the two marks without words);
  // the closing scene keeps only the top-left mark so its buttons stay clear. cfg.mark {tree, name} sets the
  // bottom-right mark (the Field Guide passes its series); otherwise it follows cfg.app.
  function wmark(cfg) {
    var m = cfg.mark || {}, tree = m.tree || (APPS[cfg.app] ? cfg.app : ''), name = m.name || (APPS[cfg.app] ? APPS[cfg.app].name : 'Field Guide');
    return '<div class="ln-wm ln-wm-tl" aria-hidden="true"><img src="' + url('/favicon.svg') + '" alt=""><span>Grow With Grounded</span></div>'
      + '<div class="ln-wm ln-wm-br" aria-hidden="true">' + (tree ? '<img src="' + url('/shared/marks/' + tree + '-small.svg') + '" alt="">' : '') + '<span>' + esc(name) + '<i> &middot; growwithgrounded.com</i></span></div>';
  }
  function player(host, cfg) {
    css(); needSources();
    if (CUR) CUR.stop();
    var l = cfg.lesson, acc = cfg.accent || '#8B5E1A', hasQuiz = (l.scenes || []).some(function (s) { return s.k === 'quiz'; });
    var answered = false, P = { i: -1, playing: false, tok: 0, hl: 0, tick: 0, nx: 0 };
    var N = (l.scenes || []).length + 1; // the closing scene is the last one
    host.innerHTML = '<div class="ggl-player"><div class="ln-stage"><div class="ln-canvas"></div>' + wmark(cfg) + '<div class="ggl-endbar" role="group" aria-label="What next"></div></div>'
      + '<div class="ln-prog" aria-hidden="true">' + new Array(N + 1).join('<span></span>') + '</div>'
      + (Array.isArray(l.crisis) && l.crisis.length ? '<p class="ln-crisis" role="note"><b>Support any time:</b>' + l.crisis.map(esc).join(' &middot; ') + '</p>' : '')
      + '<p class="ln-cap" aria-live="polite"></p><p class="ln-link"></p><div class="ggl-quiz"></div>'
      + '<div class="ln-ctl"><button class="ggl-btn pri" data-g="play">Play</button><button class="ggl-btn" data-g="back" aria-label="Back one scene">Back</button><button class="ggl-btn" data-g="next" aria-label="Next scene">Next</button><button class="ggl-btn quiet" data-g="restart">Start Over</button><button class="ggl-btn quiet" data-g="read" aria-expanded="false">Read Instead</button><span class="ggl-cn"></span></div>'
      + '<section class="ln-read" hidden tabindex="-1" aria-label="Read Instead"></section>'
      + '<div class="ln-vs"></div></div>';
    var st = $('.ln-stage', host), cv = $('.ln-canvas', host), bar = $('.ggl-endbar', host);
    try { if (window.GGRead && GGRead.settings) $('.ln-vs', host).appendChild(GGRead.settings()); } catch (e) {}
    // A lesson with recorded voices keeps only the Speed choice: the device voice menu steps aside.
    var rec = l.audio ? '' : recVoice(cfg);
    // Locked clips (BLD 781) when the lesson has no public recording and the caller gave its library's audio key.
    var SK = l.audio || rec || !sealedOk(cfg.sealed) ? null : cfg.sealed, recd = !!(l.audio || rec || SK);
    if (recd) { var vsel = host.querySelector('.ln-vs .gg-vsel'); if (vsel && vsel.closest('label')) vsel.closest('label').style.display = 'none'; }
    musicSwitch(host, cfg, P);
    function fit() { if (!st.isConnected) return; var w = st.clientWidth; cv.style.transform = 'scale(' + (w / 960) + ')'; st.classList.toggle('ggl-small', w < 560); if (bar.classList.contains('on')) place(); }
    function place() { var over = st.clientWidth >= 560; bar.classList.toggle('over', over); if (over) st.appendChild(bar); else st.after(bar); }
    function stopTimers() { P.tok++; clearInterval(P.hl); clearInterval(P.tick); clearTimeout(P.nx); clearTimeout(P.cw); clearInterval(P.tl); if (P.audio) { try { P.audio.onended = P.audio.onerror = P.audio.onloadedmetadata = P.audio.onplaying = P.audio.onratechange = P.audio.onseeked = null; P.audio.pause(); } catch (e) {} P.audio = null; } var r = st && st.querySelector('.ln-wait'); if (r) r.remove(); }
    function setPlay(p) { P.playing = p; var b = $('[data-g="play"]', host); if (b) b.textContent = p ? 'Pause' : 'Play'; if (!p) { stopTimers(); hush(); bgStop(); } else if (!P.last) bgPlay(cfg); }
    function finish() { if (!answered && hasQuiz) return; if (cfg.onDone) cfg.onDone(l.id); }
    function endScene() {
      if (hasQuiz && !answered && !(cfg.done || {})[l.id]) return { ok: false, eyebrow: 'Almost There', h: 'One question left.', sub: 'Answer it to finish this lesson.', say: 'One question left. Answer it to finish this lesson.', unfinished: true };
      finish(); return ending(cfg);
    }
    function endButtons(e) {
      var b = [];
      if (e.guide) {
        b.push(['guide', 'Open the Full Guide', 'pri']);
        if (e.pair) b.push(['pair', 'Watch: ' + esc(e.pair.sideName), '']);
        b.push(['home', cfg.fromGuide ? 'Back to the Guide' : 'Back to Learn', '']);
        b.push(['again', 'Watch Again', 'quiet']);
        bar.innerHTML = b.map(function (x) { return '<button class="ggl-btn ' + x[2] + '" data-g="e-' + x[0] + '">' + x[1] + '</button>'; }).join('');
        bar.classList.add('on'); place(); bar._next = null; return;
      }
      if (e.custom) { // the caller's own buttons (cfg.ending); a button with an href opens that page, the rest call cfg.onEnd(id, ctl)
        bar.innerHTML = (e.buttons || []).map(function (x) { return x[3] ? '<a class="ggl-btn ' + esc(x[2] || '') + '" href="' + esc(x[3]) + '" target="_blank" rel="noopener">' + esc(x[1]) + '</a>' : '<button class="ggl-btn ' + esc(x[2] || '') + '" data-g="' + (x[0] === 'again' ? 'e-again' : 'e-x-' + esc(x[0])) + '">' + esc(x[1]) + '</button>'; }).join('');
        bar.classList.add('on'); place(); bar._next = null; return;
      }
      if (e.fg) {
        b.push(['section', 'Open the Full Section', e.cert ? '' : 'pri']);
        if (e.cert) b.push(['cert', IC.award + 'Get Your Certificate', 'pri']);
        b.push(['again', 'Watch Again', '']);
        if (e.next) b.push(['open', 'Next Video', '']);
        b.push(['home', 'Back to the Series', 'quiet']);
        bar.innerHTML = b.map(function (x) { return '<button class="ggl-btn ' + x[2] + '" data-g="e-' + x[0] + '">' + x[1] + '</button>'; }).join('');
        bar.classList.add('on'); place(); bar._next = e.next; return;
      }
      if (e.unfinished) b.push(['answer', 'Answer the Question', 'pri']);
      if (e.cert) b.push(['cert', IC.award + 'Get Your Certificate', e.next ? '' : 'pri']);
      if (e.next) b.push(['open', e.support ? 'Play Another' : 'Next Lesson', e.support ? '' : 'pri']);
      b.push(['home', e.support ? 'Back to Learn' : 'Back to Lessons', (e.next && !e.support) || e.cert || e.unfinished ? '' : 'pri']);
      if (!e.unfinished) b.push(['again', 'Watch Again', 'quiet']);
      bar.innerHTML = b.map(function (x) { return '<button class="ggl-btn ' + x[2] + '" data-g="e-' + x[0] + '">' + x[1] + '</button>'; }).join('');
      bar.classList.add('on'); place();
      bar._next = e.next;
    }
    function show(n) {
      P.i = Math.max(0, Math.min(N - 1, n)); var last = P.i === N - 1, sc, t;
      stopTimers(); t = P.tok; hush();
      if (cfg.onAt) cfg.onAt(last ? 0 : P.i);
      if (last) { var e = endScene(); sc = { k: 'end', ok: e.ok, eyebrow: e.eyebrow, h: e.h, sub: e.sub, count: e.count, say: e.say }; sc._e = e; }
      else sc = l.scenes[P.i];
      st.classList.remove('go'); cv.innerHTML = scene(sc, acc); cv.className = 'ln-canvas ln-k-' + sc.k;
      st.classList.toggle('ln-on-cover', sc.k === 'title' || sc.k === 'parts' || sc.k === 'demo' || (sc.k === 'big' && !!sc.bg)); st.classList.toggle('ln-on-demo', sc.k === 'demo'); st.classList.toggle('ln-on-end', last);
      bar.classList.remove('on', 'over'); bar.innerHTML = ''; if (bar.parentNode !== st) st.appendChild(bar);
      if (last) endButtons(sc._e);
      $('.ln-link', host).innerHTML = sc.link && sc.link.href ? '<a href="' + esc(sc.link.href) + '" target="_blank" rel="noopener">' + esc(sc.link.label || 'Read the Full Story') + '</a>' : '';
      if (last) bgStop(2500);
      else if (P.playing) bgPlay(cfg);
      if (last) $('.ln-link', host).innerHTML = srcLine(l) + musicCredit(cfg) + '<small class="ln-copyline">&copy; ' + new Date().getFullYear() + ' Grow With Grounded LLC. All rights reserved. To share or reuse these videos, words, or stories, ask us first.</small>';
      var B = beatsOf(sc); P.B = B; P.sc = sc; P.last = last; P.b = 0; P.ph = 'say'; P.t0 = Date.now(); P.brLock = false; P.brDone = -1; P.brT0 = Date.now();
      $('.ln-cap', host).innerHTML = B.map(function (x) { return '<span class="w">' + esc(x.t) + '</span>'; }).join(' ');
      Array.prototype.forEach.call($('.ln-prog', host).children, function (b, k) { b.classList.toggle('on', k <= P.i); });
      $('.ggl-cn', host).textContent = last ? 'Finished' : 'Scene ' + (P.i + 1) + ' of ' + (N - 1);
      var qz = $('.ggl-quiz', host);
      qz.innerHTML = sc.k === 'quiz' ? '<div class="ln-opts">' + sc.opts.map(function (o, j) { return '<button class="ggl-btn" data-g="ans" data-v="' + j + '">' + esc(o) + '</button>'; }).join('') + '</div><div class="ggl-fb" aria-live="polite"></div>' : '';
      var tg = cv.querySelector('[data-tap]'), ptr = cv.querySelector('.ln-ptr'), ring = cv.querySelector('.ln-ring');
      if (tg && ptr) { var cr = cv.getBoundingClientRect(), r = tg.getBoundingClientRect(), k = cr.width / 960, x = (r.left - cr.left + r.width * .6) / k, y = (r.top - cr.top + r.height * .5) / k; cv.style.setProperty('--px', (x - 14) + 'px'); cv.style.setProperty('--py', (y - 4) + 'px'); if (ring) { ring.style.left = (x - 24) + 'px'; ring.style.top = (y - 24) + 'px'; } }
      P.tg = !!tg;
      // While playing, items wait for their sentence. Stepping by hand shows everything.
      var sel = REV[sc.k], items = sel ? Array.prototype.slice.call(cv.querySelectorAll(sel)) : [];
      P.items = items; P.map = revealMap(sc, items, B);
      if (P.playing || last) items.forEach(function (el) { el.classList.add('hold'); var pv = el.previousElementSibling; if (sc.k === 'flow' && pv && pv.classList.contains('ln-arr')) pv.classList.add('hold'); });
      requestAnimationFrame(function () { requestAnimationFrame(function () { st.classList.add('go'); P.brT0 = Date.now(); }); });
      // The closing scene always speaks once, even when the lesson was stepped through by hand.
      if (!P.playing && !last) return;
      run(t);
    }
    // The demo camera follows the newest item that has a move, ring, or screen (GWG BLD 824).
    function demoGo(el) {
      var cam = cv.querySelector('.ln-dm-cam'); if (!cam || !el) return;
      if (el.getAttribute('data-z')) cam.style.transform = demoCam(el.getAttribute('data-z').split(','));
      var sh = el.getAttribute('data-shot'); if (sh) Array.prototype.forEach.call(cam.querySelectorAll('img'), function (im) { im.classList.toggle('on', im.getAttribute('data-shot') === sh); });
      var mk = cam.querySelector('.ln-dm-mk[data-j="' + el.getAttribute('data-j') + '"]');
      Array.prototype.forEach.call(cam.querySelectorAll('.ln-dm-mk'), function (m) { m.classList.toggle('on', m === mk); });
    }
    function reveal(i) {
      (P.items || []).forEach(function (el, j) { if (P.map[j] <= i && el.classList.contains('hold')) { if (P.sc && P.sc.k === 'demo') demoGo(el); el.style.transitionDelay = '0s'; el.classList.remove('hold'); var pv = el.previousElementSibling; if (pv && pv.classList.contains('ln-arr')) { pv.style.transitionDelay = '0s'; pv.classList.remove('hold'); } } });
    }
    function capOn(i) { host.querySelectorAll('.ln-cap .w').forEach(function (w, j) { w.classList.toggle('on', j === i); }); }
    function ringOff() { var r = $('.ln-wait', st); if (r) r.remove(); }
    // A pause-and-do: a soft countdown ring, so people know it's their turn.
    function waitRing(sec, t, go) {
      ringOff();
      var w = document.createElement('div'); w.className = 'ln-wait'; w.setAttribute('aria-hidden', 'true');
      w.innerHTML = '<svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" class="ln-wt0"/><circle cx="22" cy="22" r="19" class="ln-wt1" style="transition-duration:' + sec + 's"/></svg><span>Take your time</span>';
      st.appendChild(w);
      requestAnimationFrame(function () { requestAnimationFrame(function () { w.classList.add('run'); }); });
      P.nx = setTimeout(function () { if (t !== P.tok) return; ringOff(); go(); }, sec * 1000);
    }
    // The rest between sentences (Chris, October 13, 2026, after listening to samples): 0.45 seconds, and 0.65 in Sequoia and Willow.
    var GAP = cfg.app === 'sequoia' || cfg.app === 'willow' ? 650 : 450;
    // Speak the scene's sentences from P.b on, one at a time, then hold and move on.
    function run(t) {
      var sc = P.sc, B = P.B, last = P.last, sp = window.GGRead && GGRead.speed ? GGRead.speed() : 1;
      function after(i) {
        var b = B[i], gap = GAP + (P.map.indexOf(i) >= 0 ? (sc.k === 'words' ? 950 : 250) : 0) + (/\?["'\u201d\u2019)]*$/.test(b.t) ? 350 : 0);
        gap = gap / sp + (b.p || 0) * 1000;
        if (b.w) { P.ph = 'wait'; capOn(-1); return waitRing(b.w, t, function () { P.ph = 'say'; P.b = i + 1; step(); }); }
        P.nx = setTimeout(function () { if (t !== P.tok) return; P.b = i + 1; step(); }, gap);
      }
      function step() {
        if (t !== P.tok) return;
        var i = P.b;
        if (i >= B.length) return done();
        var bw = brWait(i); if (bw > 0) { P.nx = setTimeout(function () { if (t === P.tok) step(); }, bw); return; }
        reveal(i); capOn(i); P.ph = 'say';
        var b = B[i], ended = false, began = Date.now(), seen = false;
        var fin = function () { if (ended || t !== P.tok) return; ended = true; clearInterval(P.tick); after(i); };
        var est = Math.max(1400, b.t.split(/\s+/).length * 60000 / (165 * sp));
        if (clip(i, fin)) return;
        var spoke = speak(b.t, fin);
        clearInterval(P.tick);
        P.tick = setInterval(function () {
          if (t !== P.tok) return clearInterval(P.tick);
          var ss = window.speechSynthesis, el = Date.now() - began;
          if (!spoke) { if (el >= est) fin(); return; }
          if (ss && ss.speaking) seen = true;
          // Some browsers drop the end of a line; never get stuck waiting for it.
          if ((seen && ss && !ss.speaking && el > 500) || el > est * 2.4 + 2500) fin();
        }, 250);
      }
      function done() {
        capOn(-1); reveal(B.length);
        if (sc.k === 'quiz' || last) { setPlay(false); return; }
        // hold counts from when the scene started, so a breathing scene keeps its full time on screen
        var hold = (P.tg ? 2600 : 0) + 900 + (+sc.hold || 0) * 1000, rem = Math.max(900, hold - (Date.now() - P.t0)), go = function () { if (t === P.tok && P.playing) show(P.i + 1); };
        if (sc.k !== 'breathe' && +sc.hold >= 6 && rem >= 5000) return waitRing(Math.round(rem / 1000), t, go);
        P.nx = setTimeout(go, rem);
      }
      // A recorded clip for this sentence, when a lesson has them: a page video's own folder (audio: 'pv', BLD 777),
      // or the recording round in this lesson's voice (BLD 778).
      function clipSrc(si, bi) {
        if (l.audio) return url('/audio/learn/' + (typeof l.audio === 'string' ? l.audio + '/' : '') + l.id + '-' + si + '-' + bi + '.mp3');
        var bb = si === P.i ? B[bi] : (beatsOf(l.scenes[si] || {})[bi]);
        return rec && bb ? clipUrl(rec, bb.t) : '';
      }
      // While one sentence plays, the next one downloads, so the rest between sentences stays even.
      function ahead(i) {
        var u = B[i + 1] ? clipSrc(P.i, i + 1) : P.i + 1 < N - 1 ? clipSrc(P.i + 1, 0) : '';
        if (!u || !window.Audio) return;
        try { var a = P.pre || (P.pre = new Audio()); a.preload = 'auto'; if (a.src !== u) { a.src = u; a.load(); } } catch (e) {}
      }
      function clip(i, fin) {
        if (SK) { sealedPlay(B[i].t, t, fin); sealedAhead(i); return true; }
        var src = clipSrc(P.i, i);
        ahead(i);
        return play(src, B[i].t, t, fin, l.audio ? '' : rec);
      }
      if (P.ph === 'wait' && B[P.b] && B[P.b].w) { var i0 = P.b; reveal(i0); return waitRing(B[i0].w, t, function () { P.ph = 'say'; P.b = i0 + 1; step(); }); }
      step();
    }
    // GWG BLD 898 (Chris: "we just need to ensure all these things sync in all vids"): in a breathe scene, a sentence that
    // says breathe in starts as the circle begins to grow, and one that says breathe out as it begins to shrink. The first
    // such sentence sets the circle's cycle (in 4 seconds, out 6); each later one waits for its turn in the cycle.
    var BR_CYC = 10000, BR_OUT = 4000;
    function brKind(x) {
      var s = String(x || '').toLowerCase(), a = s.search(/\b(breathe in|breath in|inhale|in through|smell the flower|fill (it|the|your))|^(and |once more, |again, )?in\b/),
        b = s.search(/\b(breathe out|breath out|breathe all the way out|exhale|and out|out through|blow|whoosh|float down|let it float)\b/);
      if (a < 0 && b < 0) return ''; if (a < 0) return 'out'; if (b < 0) return 'in'; return a < b ? 'in' : 'out';
    }
    function brReduced() { try { return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
    function brWait(i) {
      var sc = P.sc; if (!sc || sc.k !== 'breathe' || P.brDone === i || brReduced()) return 0;
      var k = brKind(P.B[i] && P.B[i].t); if (!k) { P.brDone = i; return 0; }
      if (!st.classList.contains('go')) return 40;
      P.brDone = i;
      if (!P.brLock) {
        P.brLock = true; var off = k === 'out' ? BR_OUT : 0;
        Array.prototype.forEach.call(cv.querySelectorAll('.ln-brc, .ln-brt i'), function (e) { e.style.animationName = 'none'; void e.offsetWidth; e.style.animationName = ''; e.style.animationDelay = (-off / 1000) + 's'; });
        P.brT0 = Date.now() - off; return 0;
      }
      var el = (Date.now() - P.brT0) % BR_CYC, d = ((k === 'in' ? 0 : BR_OUT) - el + BR_CYC) % BR_CYC;
      return d > BR_CYC - 120 ? 0 : d;
    }
    // One audio element per player, unlocked by the Play tap and reused for every sentence, so Safari and iPhone keep
    // playing without a tap per sentence (BLD 777). A guard moves on if a clip or the device voice fallback never ends.
    // Silence each voice's recordings carry before and after the words (measured October 13, 2026: Brian about 0.14 and 0.36
    // seconds, Jenny about 0.21 and 0.87). The player skips most of it, so the rest between sentences is the rest we choose.
    // Page video clips (audio: 'pv') were trimmed in the files themselves, so they play whole.
    var TRIM = { brian: [0.10, 0.28], jenny: [0.15, 0.78] };
    function play(src, text, t, fin, who) {
      var cut = TRIM[who] || [0, 0], LEAD = cut[0], TAIL = cut[1];
      if (!src || !window.Audio) return false;
      var a = P.el || (P.el = new Audio()), sp = window.GGRead && GGRead.speed ? GGRead.speed() : 1, ok = false;
      var est = Math.max(1400, text.split(/\s+/).length * 60000 / (165 * sp));
      function guard(ms) { clearTimeout(P.cw); P.cw = setTimeout(function () { if (t === P.tok) fin(); }, ms); }
      function voice() { if (ok || t !== P.tok) return; ok = true; clearInterval(P.tl); a.onended = a.onerror = a.onloadedmetadata = a.onplaying = a.onratechange = a.onseeked = null; speak(text, fin); guard(est * 2.4 + 2500); }
      P.audio = a;
      // Each recording carries about 0.2 seconds of silence before the voice and 0.9 after; skip most of both.
      var once = false, done1 = function () { if (once) return; once = true; clearTimeout(P.cw); clearInterval(P.tl); fin(); };
      a.onplaying = function () {
        clearInterval(P.tl);
        if (!TAIL || !isFinite(a.duration) || a.duration < LEAD + TAIL + 0.4) return;
        var end = a.duration - TAIL;
        // watch the play position itself, so the finish lands just after the last word on every device
        P.tl = setInterval(function () { if (t !== P.tok) return clearInterval(P.tl); if (!a.paused && a.currentTime >= end) { clearInterval(P.tl); try { a.pause(); } catch (e) {} done1(); } }, 25);
      };
      a.onended = done1;
      a.onerror = voice;
      a.onloadedmetadata = function () { if (isFinite(a.duration) && a.duration > 0) { guard(a.duration * 1000 / sp + 3000); } };
      a.src = LEAD ? src + '#t=' + LEAD : src; // start just before the first word
      // Clips follow the listener's Slower, Normal, or Faster choice, like the device voice (BLD 777).
      try { a.defaultPlaybackRate = sp; a.playbackRate = sp; } catch (e) {}
      guard(est * 2.4 + 6000);
      var pr = a.play(); if (pr && pr.then) pr.then(function () { ok = true; }).catch(function (e) { if (!e || e.name !== 'AbortError') voice(); });
      return true;
    }
    // A quiz's "That's it." and its why, sentence by sentence in the lesson's recorded voice.
    function recSay(text, t, fin) {
      var L = beatsOf({ say: text }), k = 0;
      (function next() { if (t !== P.tok) return; if (k >= L.length) return fin(); var x = L[k++].t, f = function () { setTimeout(next, GAP); }; if (SK) sealedPlay(x, t, f); else play(clipUrl(rec, x), x, t, f, rec); })();
    }
    // Locked clips (BLD 781): each sentence is fetched and unlocked once per player, kept as a Blob URL until the player stops.
    P.clips = {};
    function sealedGet(text) { if (!P.clips[text]) P.clips[text] = sealedClip(SK.key, SK.voice, text).then(null, function () { return null; }); return P.clips[text]; }
    // While one sentence plays, the next one (or the next scene's first, or a question's reply) is fetched and unlocked.
    function sealedAhead(i) {
      var nx = P.B[i + 1];
      if (nx) sealedGet(nx.t);
      else if (P.i + 1 < N - 1) { var b0 = beatsOf(l.scenes[P.i + 1])[0]; if (b0) sealedGet(b0.t); }
      if (P.sc && P.sc.k === 'quiz') beatsOf({ say: "That's it. " + (P.sc.why || '') }).slice(0, 2).forEach(function (b) { sealedGet(b.t); });
    }
    function sealedPlay(text, t, fin) {
      var sp = window.GGRead && GGRead.speed ? GGRead.speed() : 1, est = Math.max(1400, text.split(/\s+/).length * 60000 / (165 * sp)), gone = false;
      function voice() {
        if (gone || t !== P.tok) return; gone = true; clearTimeout(P.cw);
        var spoke = speak(text, fin);
        P.cw = setTimeout(function () { if (t === P.tok) fin(); }, spoke ? est * 2.4 + 2500 : est);
      }
      // A clip that has not arrived in 8 seconds gives way to the device voice for this sentence.
      clearTimeout(P.cw); P.cw = setTimeout(voice, 8000);
      sealedGet(text).then(function (u) {
        if (gone || t !== P.tok) return;
        if (!u) return voice();
        gone = true; clearTimeout(P.cw);
        if (!play(u, text, t, fin, SK.voice)) { gone = false; voice(); }
      });
      return true;
    }
    function sealedFree() { var C = P.clips; P.clips = {}; Object.keys(C).forEach(function (k) { C[k].then(function (u) { if (u) try { URL.revokeObjectURL(u); } catch (e) {} }); }); }
    // The first tap plays a moment of silence on the one audio element, so it may play the clips that follow.
    function unlock() {
      if (!SK || P.unl || !window.Audio) return; P.unl = true;
      try { var a = P.el || (P.el = new Audio()); a.onended = a.onerror = a.onloadedmetadata = a.onplaying = a.onratechange = a.onseeked = null; a.src = silent(); var pr = a.play(); if (pr && pr.catch) pr.catch(function () {}); } catch (e) {}
    }
    function answer(v) {
      var sc = l.scenes[P.i], ok = +v === sc.right, fb = $('.ggl-fb', host);
      host.querySelectorAll('.ln-opts .ggl-btn').forEach(function (b, j) { b.classList.toggle('ln-right', ok && j === +v); b.classList.toggle('ln-wrong', !ok && j === +v); });
      if (!ok) { fb.innerHTML = '<p class="ln-no"><b>Not quite.</b> Try another answer.</p>'; return; }
      answered = true; finish();
      fb.innerHTML = '<p class="ln-yes"><b>That\'s it.</b> ' + esc(sc.why || '') + '</p>';
      stopTimers(); var t = P.tok, said = false, spoke = (rec || SK) && window.Audio ? (recSay("That's it. " + (sc.why || ''), t, function () { said = true; }), 'rec') : speak("That's it. " + (sc.why || '')), start = Date.now();
      // Then roll on to the next scene (the closing breath, then the closing scene), so the lesson always ends with what comes next.
      P.tick = setInterval(function () {
        if (t !== P.tok) return clearInterval(P.tick);
        var busy = spoke === 'rec' ? !said : spoke && window.speechSynthesis && speechSynthesis.speaking;
        if (!busy && Date.now() - start > (spoke ? 1500 : 4000)) { clearInterval(P.tick); P.nx = setTimeout(function () { if (t === P.tok) { setPlay(true); show(Math.min(P.i + 1, N - 1)); } }, 1100); }
      }, 200);
    }
    /* Read Instead: the full script as text (every sentence, the pause-and-do moments, the question, and the sources) */
    function readHtml() {
      var h = '<h3>' + esc(l.title || '') + '</h3>' + (l.blurb ? '<p>' + esc(l.blurb) + '</p>' : '');
      (l.scenes || []).forEach(function (sc, j) {
        var hd = sc.k === 'quiz' ? (sc.q || 'Quick question') : (sc.h || sc.title || sc.eyebrow || '');
        if (hd && j) h += '<h4>' + esc(hd) + '</h4>';
        var B = beatsOf(sc);
        if (sc.k === 'quiz') {
          h += '<div class="ln-rd-q" role="group" aria-label="Answer">' + (sc.opts || []).map(function (o, k) { return '<button type="button" class="ggl-btn" data-g="rans" data-s="' + j + '" data-v="' + k + '">' + esc(o) + '</button>'; }).join('') + '</div><div class="ggl-fb" aria-live="polite"></div>';
          return;
        }
        var para = [];
        B.forEach(function (b) { para.push(esc(b.t)); if (b.w) { h += '<p>' + para.join(' ') + '</p><span class="ln-rd-do">Pause here and try it, about ' + Math.round(b.w) + ' seconds.</span>'; para = []; } });
        if (para.length) h += '<p>' + para.join(' ') + '</p>';
        if (sc.link && sc.link.href) h += '<p><a href="' + esc(sc.link.href) + '" target="_blank" rel="noopener">' + esc(sc.link.label || 'Read the Full Story') + '</a></p>';
      });
      return h + '<div class="ln-rd-end">' + srcLine(l) + '<p><button type="button" class="ggl-btn" data-g="read">Back to the Video</button></p></div>';
    }
    function readToggle(on) {
      var r = $('.ln-read', host), b = $('.ln-ctl [data-g="read"]', host);
      if (on) { setPlay(false); r.innerHTML = readHtml(); r.hidden = false; b.setAttribute('aria-expanded', 'true'); b.textContent = 'Back to the Video'; try { r.focus({ preventScroll: false }); } catch (e) {} watchRead(r); }
      else { r.hidden = true; r.innerHTML = ''; b.setAttribute('aria-expanded', 'false'); b.textContent = 'Read Instead'; try { b.focus(); } catch (e) {} }
    }
    // reading to the end counts the same as watching (once any question is answered)
    function watchRead(r) {
      var end = $('.ln-rd-end', r); if (!end) return;
      var go = function () { if (!hasQuiz || answered) finish(); };
      if (!('IntersectionObserver' in window)) return go();
      var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); go(); } }); io.observe(end);
    }
    function readAnswer(b) {
      var sc = l.scenes[+b.getAttribute('data-s')] || {}, v = +b.getAttribute('data-v'), ok = v === sc.right, wrap = b.parentNode, fb = wrap.nextElementSibling;
      wrap.querySelectorAll('.ggl-btn').forEach(function (x, j) { x.classList.toggle('ln-right', ok && j === v); x.classList.toggle('ln-wrong', !ok && j === v); });
      if (!ok) { fb.innerHTML = '<p class="ln-no"><b>Not quite.</b> Try another answer.</p>'; return; }
      answered = true; finish(); fb.innerHTML = '<p class="ln-yes"><b>That\'s it.</b> ' + esc(sc.why || '') + '</p>';
    }
    function onClick(ev) {
      var b = ev.target.closest('[data-g]'); if (!b || !host.contains(b)) return;
      var g = b.getAttribute('data-g');
      unlock();
      if (g === 'play') {
        if (P.playing) setPlay(false);
        else {
          var go = function () { setPlay(true); if (P.i < N - 1 && P.B && (P.b > 0 || P.ph === 'wait')) { stopTimers(); run(P.tok); } else show(P.i >= N - 1 ? 0 : P.i); };
          go();
        }
      }
      else if (g === 'read') readToggle($('.ln-read', host).hidden);
      else if (g === 'rans') readAnswer(b);
      else if (g === 'back') show(P.i - 1);
      else if (g === 'next') show(P.i + 1);
      else if (g === 'restart') { setPlay(false); show(0); }
      else if (g === 'e-again') { setPlay(true); show(0); }
      else if (g === 'ans') answer(b.getAttribute('data-v'));
      else if (g === 'e-answer') { var q = -1; l.scenes.forEach(function (s, j) { if (s.k === 'quiz') q = j; }); show(q); }
      else if (g === 'e-open') { var nx = bar._next; ctl.stop(); if (nx && cfg.open) cfg.open(nx.l.id); }
      else if (g === 'e-home') { ctl.stop(); if (cfg.home) cfg.home(); }
      else if (g === 'e-cert') { if (cfg.cert) cfg.cert(cfg.track); }
      else if (g === 'e-section') { ctl.stop(); if (cfg.section) cfg.section(l.id); }
      else if (g === 'e-guide') { ctl.stop(); if (cfg.guide) cfg.guide(l.guide); }
      else if (g === 'e-pair') { ctl.stop(); if (cfg.pair && cfg.open) cfg.open(cfg.pair.id); }
      else if (g.indexOf('e-x-') === 0) { if (cfg.onEnd) cfg.onEnd(g.slice(4), ctl); }
    }
    function onKey(e) {
      if (CUR !== ctl || !host.isConnected || /input|textarea|select/i.test((e.target && e.target.tagName) || '')) return;
      if (e.key === ' ' && !(e.target && e.target.closest && e.target.closest('button'))) { e.preventDefault(); $('[data-g="play"]', host).click(); }
      else if (e.key === 'ArrowRight') { unlock(); show(P.i + 1); } else if (e.key === 'ArrowLeft') { unlock(); show(P.i - 1); }
    }
    host.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', fit);
    var ctl = { stop: function () { setPlay(false); stopTimers(); hush(); bgStop(300); sealedFree(); host.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey); window.removeEventListener('resize', fit); if (CUR === ctl) CUR = null; }, show: show };
    CUR = ctl;
    fit();
    var at = Math.max(0, Math.min((cfg.at || 0), N - 2));
    if ((cfg.done || {})[l.id]) answered = true;
    show(at);
    return ctl;
  }

  function voiceCard() { return ''; } // the Before You Watch card is retired (recorded voices everywhere), Chris, October 10, 2026

  /* ---------------- the Learn tab in a tree app ---------------- */
  /* Watched marks live inside the unlocked profile's vault (GWG BLD 756), never open in browser storage.
     Nobody unlocked: kept in memory for this visit only. */
  var KEY = function (app) { return 'gg-learn:' + app; };
  var MEM = {}, MOVED = {};
  function who() { var G = window.GGP, a = G && G.active && G.active(); return a && G.data && G.data(a.id) ? a.id : null; }
  function box(id) { var v = window.GGP.data(id); if (!v.learn || typeof v.learn !== 'object' || Array.isArray(v.learn)) v.learn = {}; return v.learn; }
  function marksEvent(app) { try { window.dispatchEvent(new CustomEvent('gg-learn-marks', { detail: { app: app || null } })); } catch (e) {} }
  // The old open marks (gg-learn:<app>) move into the vault once, then leave browser storage.
  function migrate(id) {
    if (!id || MOVED[id]) return; MOVED[id] = 1;
    var moved = false;
    Object.keys(APPS).forEach(function (app) {
      var raw = null; try { raw = localStorage.getItem(KEY(app)); } catch (e) {}
      if (raw == null) return;
      var old = {}; try { old = JSON.parse(raw) || {}; } catch (e) {}
      var B = box(id), r = B[app] = B[app] && typeof B[app] === 'object' ? B[app] : { done: {}, at: {} };
      r.done = r.done || {}; r.at = r.at || {};
      Object.keys(old.done || {}).forEach(function (k) { var d = old.done[k]; if (!r.done[k] || (d && d < r.done[k])) r.done[k] = d; });
      Object.keys(old.at || {}).forEach(function (k) { if (r.at[k] == null) r.at[k] = old.at[k]; });
      moved = true;
    });
    if (!moved) return;
    Promise.resolve(window.GGP.save(id)).then(function () {
      Object.keys(APPS).forEach(function (app) { try { localStorage.removeItem(KEY(app)); } catch (e) {} });
      marksEvent(null);
    });
  }
  function load(app) {
    var id = who(), r;
    if (id) { migrate(id); r = box(id)[app] || {}; } else r = MEM[app] || {};
    return { done: Object.assign({}, r.done || {}), at: Object.assign({}, r.at || {}) };
  }
  function keep(app, d) {
    var id = who(), rec = { done: Object.assign({}, d.done || {}), at: Object.assign({}, d.at || {}) };
    if (id) { box(id)[app] = rec; window.GGP.save(id); } else MEM[app] = rec;
    marksEvent(app);
  }
  function watched(app, lid) { return !!load(app).done[lid]; }
  (function hook(n) {
    if (window.GGP && GGP.on) { GGP.on(function (type) { if (type === 'change' || type === 'ready' || type === 'data') { migrate(who()); marksEvent(null); } }); if (GGP.ready && GGP.ready.then) GGP.ready.then(function () { migrate(who()); marksEvent(null); }); return; }
    if (n < 40) setTimeout(function () { hook(n + 1); }, 250);
  })(0);
  function script(src, test) { return new Promise(function (ok) { if (test()) return ok(); var s = document.createElement('script'); s.src = src; s.onload = function () { ok(); }; s.onerror = function () { ok(); }; document.head.appendChild(s); }); }
  var GUIDE_SRC = { willow: '/willow/guide-videos.js?v=b808', oak: '/oak/guide-videos.js?v=b888', aspen: '/aspen/guide-videos.js?v=b888', maple: '/maple/guide-videos.js?v=b888', sequoia: '/sequoia/guide-videos.js?v=b888', pine: '/pine/guide-videos.js?v=b888', birch: '/birch/guide-videos.js?v=b888', grove: '/grove/guide-videos.js?v=b888' };
  function needGuides(app) { return GUIDE_SRC[app] ? script(url(GUIDE_SRC[app]), function () { return !!(window.GG_LEARN_GUIDES && window.GG_LEARN_GUIDES[app]); }) : Promise.resolve(); }
  // One track per ring: kind 'guide'. Each lesson knows its guide, its side, and its pair.
  function guideTracks(app) {
    var D = (window.GG_LEARN_GUIDES || {})[app]; if (!D || !D.guides) return [];
    return (D.rings || []).map(function (r) {
      var ls = [];
      D.guides.filter(function (g) { return g.ring === r[0]; }).forEach(function (g) {
        ['you', 'helper'].forEach(function (k) { var l = g[k]; if (!l) return; l.guide = g.id; l.guideTitle = g.title; l.pairId = (g[k === 'you' ? 'helper' : 'you'] || {}).id; ls.push(l); });
      });
      return { id: 'wlc-' + app + '-' + r[0], kind: 'guide', title: r[1], lessons: ls, lowkey: r[0] === 'sober' ? 'sober' : undefined };
    }).filter(function (t) { return t.lessons.length; });
  }
  // Health and Ability videos (GWG BLD 756): one support track per app, loaded when the Support group opens.
  var LIFE_SRC = '/shared/learn-life.js?v=b888', LIFE_APPS = ['maple', 'aspen', 'pine', 'birch', 'oak', 'sequoia', 'grove'], LIFE_ID = /^(mp|as|pn|br|ok|sq|gr)-ha-/;
  function needLife(app) {
    if (LIFE_APPS.indexOf(app) < 0) return Promise.resolve();
    return script(url(LIFE_SRC), function () { return !!window.GG_LEARN_LIFE; }).then(function () {
      return script(url('/shared/gg-life.js?v=b888'), function () { return !!window.GGLife; });
    });
  }
  // The tracks of shared/learn-life.js (group: 'life'), with the videos that fit the person's choice first
  // (GGLife.order, nothing removed); with no choice, the how-to on the setting comes first.
  function lifeTracks(app) {
    var X = (window.GG_LEARN_LIFE || {})[app], fit = lifeFirst();
    return ((X && X.tracks) || []).filter(function (t) { return t && Array.isArray(t.lessons) && t.lessons.length; }).map(function (t) {
      var ls = t.lessons.slice();
      if (fit && window.GGLife) ls = GGLife.order(ls, function (l) { return l.life || []; });
      else ls.sort(function (a, b) { return (b.howto ? 1 : 0) - (a.howto ? 1 : 0); });
      return Object.assign({}, t, { kind: 'support', group: 'life', title: t.title || X.title || 'Health and Ability', lessons: ls });
    });
  }
  function lifeFirst() { try { return !!(window.GGLife && (GGLife.has() || GGLife.gentle())); } catch (e) { return false; } }
  function needPrint() { return script(url('/shared/gg-print.js?v=b887'), function () { return !!window.GGPrint; }); }
  // Written pages (GWG BLD 787): shared/learn-pages.js, loaded the first time a page or a track with pages shows.
  function needPages() { return script(url('/shared/learn-pages.js?v=' + V), function () { return !!window.GG_LEARN_PAGES; }); }
  function pageOf(app, id) { var P = ((window.GG_LEARN_PAGES || {})[app]) || []; for (var i = 0; i < P.length; i++) if (P[i] && P[i].id === id) return P[i]; return null; }
  // A page's sections: ['p', text], ['lab', text], ['ul', [line or [bold, rest], ...]] (the For Guides part blocks).
  function blocksHtml(bl) {
    return (bl || []).map(function (b) {
      if (!Array.isArray(b)) return '';
      if (b[0] === 'p') return '<p>' + esc(b[1]) + '</p>';
      if (b[0] === 'lab') return '<p class="ggl-pg-lab"><b>' + esc(b[1]) + '</b></p>';
      if (b[0] === 'link' && /^(https:\/\/|\/)/.test(String(b[2] || ''))) return '<p class="ggl-pg-link"><a href="' + esc(b[2]) + '" target="_blank" rel="noopener">' + esc(b[1]) + '</a>' + (b[3] ? ' ' + esc(b[3]) : '') + '</p>';
      if (b[0] === 'ul') return '<ul>' + (b[1] || []).map(function (x) { return '<li>' + (Array.isArray(x) ? '<b>' + esc(x[0]) + '</b> ' + esc(x[1] || '') : esc(x)) + '</li>'; }).join('') + '</ul>';
      return '';
    }).join('');
  }
  function pageBody(p) {
    return (p.lead ? '<p class="ggl-pg-lead">' + esc(p.lead) + '</p>' : '') + (p.sections || []).map(function (sc) { return (sc.h ? '<h2>' + esc(sc.h) + '</h2>' : '') + blocksHtml(sc.b); }).join('');
  }
  // Print a page (a new tab with the page alone and a Print button; a hidden frame when pop-ups are blocked).
  function printPage(app, p) {
    var meta = APPS[app] || { name: 'Grow With Grounded', color: '#8B5E1A' }, src = window.GGSources ? GGSources.line(p.sources || []) : '';
    var html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + esc(p.title) + '</title>'
      + '<link rel="stylesheet" href="' + url('/fonts/fonts.css') + '"><style>body{margin:0;background:#FFFCF6;color:#2C1810;font-family:Barlow,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;}'
      + '.bar{position:sticky;top:0;display:flex;gap:10px;align-items:center;padding:10px 14px;background:#2E2118;color:#F6EFE2;}.bar b{font-family:"Cormorant Garamond",Georgia,serif;font-size:20px;margin-right:auto;}'
      + '.bar button{min-height:44px;padding:8px 16px;border-radius:10px;border:1.5px solid #D9A847;background:#D9A847;color:#2E2118;font:inherit;font-weight:600;cursor:pointer;}'
      + 'main{max-width:7in;margin:0 auto;padding:28px 18px 40px;}.eb{font-family:"Barlow Condensed",sans-serif;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;color:' + meta.color + ';}'
      + 'h1{font-family:"Cormorant Garamond",Georgia,serif;font-weight:600;font-size:34px;line-height:1.1;margin:4px 0 10px;}h2{font-family:"Cormorant Garamond",Georgia,serif;font-weight:600;font-size:23px;margin:20px 0 6px;}'
      + '.ggl-pg-lead{font-size:18px;}ul{padding-left:22px;}li{margin:4px 0;}.gg-src{font-size:12.5px;margin-top:18px;}.gg-src p{margin:2px 0;}.foot{font-size:12px;color:#6B5A4D;border-top:1px solid #DDD0B8;margin-top:18px;padding-top:8px;}'
      + 'a{color:inherit;}@media print{.bar{display:none;}main{padding:0;max-width:none;}@page{margin:.7in;}}</style></head><body>'
      + '<div class="bar"><b>' + esc(p.title) + '</b><button type="button" onclick="window.print()">Print or Save as PDF</button></div>'
      + '<main><div class="eb">' + esc(meta.name) + ', a page to read</div><h1>' + esc(p.title) + '</h1>' + pageBody(p) + src
      + '<p class="foot">From ' + esc(meta.name) + ' by Grow With Grounded, growwithgrounded.com. General spiritual and emotional support. Emergency: 911. Crisis: call or text 988. &copy; ' + new Date().getFullYear() + ' Grow With Grounded LLC. Yours to print for personal use.</p></main></body></html>';
    var w = null; try { w = window.open('', '_blank'); } catch (e) { w = null; }
    if (w && w.document) { w.document.open(); w.document.write(html); w.document.close(); try { w.focus(); } catch (e) {} return; }
    var f = document.createElement('iframe'); f.setAttribute('aria-hidden', 'true'); f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
    document.body.appendChild(f); f.contentDocument.open(); f.contentDocument.write(html); f.contentDocument.close();
    setTimeout(function () { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) {} setTimeout(function () { f.remove(); }, 60000); }, 900);
  }

  var APP = null; // {app, root, view, lesson, depth}
  // Browser Back inside Learn (GWG BLD 780). Opening Learn adds one history entry (same address, so the apps' hash
  // routing never sees a change) and opening a video from the Learn list adds a second. Back steps from the video to
  // the list, then closes Learn. Each entry's state says what it shows: {ggLearn: 1 or 2, ggLesson: id or null}.
  // Closing with the X (or Escape, or a guide link) goes back over these entries, so none is left behind.
  // A popstate that belongs to Learn or a page video stops here when this listener runs first; the apps' own popstate
  // handlers also ask GGHistOwn(e) first and step aside (a browser may run their listener before this one).
  var HIST = { skip: false, after: null, t: 0 };
  window.GGHistOwn = window.GGHistOwn || function (e) { if (!e || e.type !== 'popstate') return false; var st = e.state; return !!(window.GG_HIST_SKIP || (st && (st.ggLearn || st.ggPageVideo)) || document.querySelector('.ggl-app')); };
  function hSkip() { HIST.skip = true; window.GG_HIST_SKIP = true; clearTimeout(HIST.t); HIST.t = setTimeout(hDone, 800); }
  function hState(level, id) { var s = {}, h = history.state; if (h && typeof h === 'object') for (var k in h) if (k !== 'ggPageVideo') s[k] = h[k]; s.ggLearn = level; s.ggLesson = id || null; return s; }
  function hPush(level, id) { try { history.pushState(hState(level, id), '', location.href); if (APP) APP.depth = level; } catch (e) {} }
  function hSet(id) { if (!APP || !APP.depth) return; try { history.replaceState(hState(APP.depth, id), '', location.href); } catch (e) {} }
  function hDone() { clearTimeout(HIST.t); HIST.skip = false; window.GG_HIST_SKIP = false; var f = HIST.after; HIST.after = null; if (f) f(); }
  function onPop(e) {
    var st = e.state || {}, lv = st.ggLearn || 0;
    if (HIST.skip) { e.stopImmediatePropagation(); hDone(); return; }
    if (!APP) { if (lv) { e.stopImmediatePropagation(); hSkip(); try { history.back(); } catch (x) { hDone(); } } return; } // Forward onto an old Learn entry: step off it
    e.stopImmediatePropagation();
    APP.depth = lv;
    if (!lv) { close(false, true); return; }
    if (st.ggLesson && /^page:/.test(st.ggLesson)) showPage(st.ggLesson.slice(5), true); else if (st.ggLesson) lesson(st.ggLesson, true); else list(true);
  }
  window.addEventListener('popstate', onPop, true);
  // Closes Learn, then runs then() once the browser has stepped back over Learn's entries.
  function closeThen(then) { if (APP && APP.depth) { HIST.after = then; close(); } else { close(); if (then) then(); } }
  // Back to the Learn list from a video: one step back in history when the video was opened from the list.
  function goList() {
    if (!APP) return;
    if (APP.depth === 2) { try { history.back(); return; } catch (e) {} }
    list();
  }
  function open(app, lessonId, opts) {
    var meta = APPS[app]; if (!meta) return;
    css();
    var pg = opts && opts.page;
    script(url('/shared/learn-lessons.js?v=' + V), function () { return !!window.GG_LEARN; }).then(function () { return needGuides(app); }).then(function () { return need30(app); }).then(function () { return lessonId && LIFE_ID.test(lessonId) ? needLife(app) : null; }).then(function () { return pg || hasPages(app) ? needPages() : null; }).then(function () {
      var keep = APP ? APP.depth : 0;
      if (APP) close(true, true);
      needPrint(); // ready ahead of time, so a certificate or flyer opens on the first tap
      var root = document.createElement('div');
      root.className = 'ggl ggl-app'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'Learn ' + meta.name);
      root.style.setProperty('--ggl-acc', meta.btn); root.style.setProperty('--ggl-bar', meta.color);
      root.style.setProperty('--ggl-lite', ({ maple: '#F2A06E', aspen: '#7FC8CC', pine: '#9CC795', birch: '#D9BE5C', oak: '#9DB8D0', sequoia: '#E8A48E', willow: '#C9C3DA', grove: '#9FCB9F' })[app]);
      root.innerHTML = '<div class="ggl-top"><img src="' + MARK(app + '-tab') + '" alt=""><b>Learn ' + esc(meta.name) + '</b><button class="ggl-x" data-l="close">' + esc(meta.back) + '</button></div><div class="ggl-in" id="ggl-in"></div>';
      document.body.appendChild(root);
      APP = { app: app, root: root, prevFocus: document.activeElement, overflow: document.body.style.overflow, fromGuide: !!(opts && opts.from === 'guide'), depth: keep };
      document.body.style.overflow = 'hidden';
      root.addEventListener('click', appClick); root.addEventListener('input', appInput);
      document.addEventListener('keydown', appKey);
      if (!keep) hPush(1, lessonId || (pg ? 'page:' + pg : null));
      if (lessonId) lesson(lessonId); else if (pg) showPage(pg); else list();
    });
  }
  // close(quiet, keepHistory): keepHistory when the browser already stepped back (Back), or Learn reopens in place.
  function close(quiet, keepHistory) {
    if (!APP) return;
    if (CUR) CUR.stop();
    document.removeEventListener('keydown', appKey);
    APP.root.remove(); document.body.style.overflow = APP.overflow || '';
    var f = APP.prevFocus, d = APP.depth; APP = null;
    if (!keepHistory && d) { hSkip(); try { history.go(-d); } catch (e) { hDone(); } }
    if (!quiet && f && f.focus) try { f.focus(); } catch (e) {}
    try { window.dispatchEvent(new CustomEvent('gg-learn-close')); } catch (e) {} // pages can refresh watched marks
  }
  // Escape steps back one level: a video to the Learn list (or back to the guide it came from), the list to closed.
  function appKey(e) {
    if (e.key !== 'Escape' || !APP) return;
    e.preventDefault();
    var qi = e.target && e.target.id === 'ggl-q' ? e.target : null;
    if (qi && qi.value) { qi.value = ''; APP.q = ''; if (APP.paint) APP.paint(); return; }
    if (APP.view === 'lesson') { if (APP.gv && APP.fromGuide) close(); else goList(); } else close();
  }
  function tracksFor(app) {
    var L = (window.GG_LEARN || {})[app] || {}, base = (L.tracks || []).filter(function (t) { return t && Array.isArray(t.lessons) && t.lessons.length; });
    var lt = lifeTracks(app), sup = base.filter(function (t) { return t.kind === 'support'; }), rest = base.filter(function (t) { return t.kind !== 'support'; });
    if (lt.length) sup = lifeFirst() ? lt.concat(sup) : sup.concat(lt);
    return lowkey(app, rest.concat(sup, sober30(app), guideTracks(app))); // Get Set Up (the device voice video) retired, Chris, October 10, 2026
  }
  // Early Days: 30 Days (GWG BLD 837, shared/sober-30.js): a Learn track in Birch, Oak, and Sequoia, listed for anyone who chose
  // Living Sober (lowkey 'sober30'). It still opens by a lesson id, so the Living Sober card can start any day.
  var DECLARED = ['birch', 'oak', 'sequoia'];
  function need30(app) { return DECLARED.indexOf(app) >= 0 ? script(url('/shared/sober-30.js?v=b898'), function () { return !!window.GGSober30; }) : Promise.resolve(); }
  function sober30(app) {
    var S = window.GGSober30; if (DECLARED.indexOf(app) < 0 || !S || !S.track || !Array.isArray(S.track.lessons) || !S.track.lessons.length) return [];
    return [Object.assign({}, S.track, { lowkey: 'sober30' })];
  }
  // Living Sober (GWG BLD 789): a track with lowkey: 'sober' is listed only when Living Sober is chosen (shared/gg-life.js),
  // and then first among its kind. Otherwise it stays unlisted: it still opens by its id or a lesson id.
  // Declared in Birch, Oak, and Sequoia (GWG BLD 837): there its 'sober' tracks are listed for everyone, first once chosen;
  // 'sober30' (Early Days: 30 Days) is listed once Living Sober is chosen.
  function soberOn(app) { try { return app === 'grove' ? !!(window.GROVE_SOBER_ON && GROVE_SOBER_ON()) : !!(window.GGLife && GGLife.sober && GGLife.sober(app)); } catch (e) { return false; } }
  function lowkey(app, ts) {
    if (!ts.some(function (t) { return t.lowkey; })) return ts;
    var on = soberOn(app), open = on || DECLARED.indexOf(app) >= 0, lk = [], other = [];
    ts.forEach(function (t) { if (t.lowkey === 'sober' || t.lowkey === 'sober30') lk.push(on || (open && t.lowkey === 'sober') ? t : Object.assign({}, t, { unlisted: true })); else other.push(t); });
    if (!on) return other.concat(lk);
    var out = other.slice();
    lk.forEach(function (t) { var i = -1; out.some(function (x, j) { if (x.kind === t.kind) { i = j; return true; } return false; }); if (i < 0) out.push(t); else out.splice(i, 0, t); });
    return out;
  }
  function find(app, id) { var r = null; tracksFor(app).forEach(function (t) { t.lessons.forEach(function (l) { if (l.id === id) r = { t: t, l: l }; }); }); return r; }
  // Who each video is for (GWG BLD 743): a small, quiet label from the lesson's 'for' key (shared/learn-lessons.js).
  var FOR_LABEL = { person: 'For the person in hospice', family: 'For family and caregivers', both: 'For both', you: 'For you', helper: 'For the helper', grownup: 'For the grown-up', kids: 'For kids' };
  function forTag(l, cls) { var t = l && FOR_LABEL[l['for']]; return t ? '<span class="' + cls + '">' + esc(t) + '</span>' : ''; }
  function list(fromPop) {
    if (CUR) CUR.stop();
    APP.view = 'list'; if (!fromPop) hSet(null);
    var app = APP.app, meta = APPS[app], L = (window.GG_LEARN || {})[app] || {}, every = tracksFor(app).filter(function (t) { return !t.unlisted; }), D = load(app);
    var gd = every.filter(function (t) { return t.kind === 'guide'; }), tr = every.filter(function (t) { return t.kind !== 'support' && t.kind !== 'guide'; }), sup = every.filter(function (t) { return t.kind === 'support'; }), counted = tr.filter(function (t) { return t.kind !== 'setup'; });
    var all = counted.reduce(function (n, t) { return n + t.lessons.length; }, 0), fin = counted.reduce(function (n, t) { return n + t.lessons.filter(function (l) { return D.done[l.id]; }).length; }, 0);
    var el = $('#ggl-in', APP.root);
    var card = function (t) {
      var isSup = t.kind === 'support', n = t.lessons.filter(function (l) { return D.done[l.id]; }).length, ok = n === t.lessons.length && certable(t);
      return '<div class="ggl-card"><div class="ggl-spread"><div><h3>' + esc(t.title) + '</h3>' + (t.who ? '<p class="ggl-muted">' + esc(t.who) + '</p>' : '') + '</div>' + (isSup ? '' : '<span class="ggl-muted">' + n + ' of ' + t.lessons.length + '</span>') + '</div>'
        + '<div class="ln-list">' + t.lessons.map(function (l) { var d = D.done[l.id] && !isSup; return '<button class="ln-item' + (d ? ' done' : '') + '" data-l="open" data-v="' + esc(l.id) + '"><span class="ln-n">' + (d ? IC.check : isSup ? IC.play : esc(String(l.n || ''))) + '</span><span class="ln-t"><b>' + esc(l.title) + '</b>' + forTag(l, 'ln-for') + '<small>' + (l.blurb ? esc(l.blurb) + ' ' : '') + 'About ' + esc(String(l.mins || 2)) + ' minutes' + (D.at[l.id] && !D.done[l.id] && !isSup ? '. Pick up where you left off.' : '') + '</small></span>' + IC.play + '</button>'; }).join('') + '</div>'
        + pagesHtml(t)
        + (ok ? '<div class="ggl-row"><button class="ggl-btn pri" data-l="cert" data-v="' + esc(t.id) + '">' + IC.award + 'Get Your Certificate</button></div>' : certable(t) ? '<p class="ggl-muted" style="margin-top:10px;font-size:15px">Finish every lesson in this series for a Certificate of Completion.</p>' : '') + '</div>';
    };
    // A track's written pages (GWG BLD 787), after its videos.
    var pagesHtml = function (t) {
      var ps = (t.pages || []).map(function (id) { return pageOf(app, id); }).filter(Boolean); if (!ps.length) return '';
      return '<p class="ggl-eb ggl-pg-eb">A page to read</p><div class="ln-list">' + ps.map(function (p) { return '<button class="ln-item" data-l="page" data-v="' + esc(p.id) + '"><span class="ln-n">' + IC.page + '</span><span class="ln-t"><b>' + esc(p.title) + '</b><small>' + (p.blurb ? esc(p.blurb) + ' ' : '') + 'About ' + esc(String(p.mins || 3)) + ' minutes to read.</small></span>' + IC.page + '</button>'; }).join('') + '</div>';
    };
    // When Life Changes: a quiet check for each video watched, no counts.
    var gcard = function (t) {
      return '<div class="ggl-card"><h3>' + esc(t.title) + '</h3><div class="ln-list">' + t.lessons.map(function (l) { var d = !!D.done[l.id]; return '<button class="ln-item' + (d ? ' done' : '') + '" data-l="open" data-v="' + esc(l.id) + '"><span class="ln-n">' + (d ? IC.check : IC.play) + '</span><span class="ln-t"><b>' + esc(l.guideTitle || l.title) + '</b><small>' + esc(l.sideName || '') + '. About ' + esc(String(l.mins || 3)) + ' minutes' + (d ? '. Watched.' : '') + '</small></span>' + IC.play + '</button>'; }).join('') + '</div></div>';
    };
    var GD = (window.GG_LEARN_GUIDES || {})[app] || {}, S = L.support || {};
    var H2 = function (t) { return '<h2 style="font-family:\'Cormorant Garamond\',serif;font-weight:600;font-size:30px;margin:2px 0 0">' + esc(t) + '</h2>'; };
    var back = function (to, label) { return '<button class="ggl-link" data-l="' + to[0] + '"' + (to[1] ? ' data-v="' + esc(to[1]) + '"' : '') + '>&larr; ' + esc(label) + '</button>'; };
    var watched = function (ts) { var n = 0; ts.forEach(function (t) { t.lessons.forEach(function (l) { if (D.done[l.id]) n++; }); }); return n; };
    var size = function (ts) { return ts.reduce(function (n, t) { return n + t.lessons.length; }, 0); };
    var cats = [];
    if (tr.length) cats.push({ k: 'les', eb: 'Lessons', title: L.lessonsTitle || 'Learn Step by Step', intro: L.lessonsIntro || 'Short lessons on how ' + meta.name + ' works, in order. Start with Get Set Up.', n: all ? fin + ' of ' + all + ' lessons finished' : size(tr) + ' lessons' });
    if (gd.length) cats.push({ k: 'gd', eb: 'How to Show Up', title: GD.title || 'When Life Changes', intro: GD.intro || '', n: size(gd) + ' videos in ' + gd.length + (gd.length === 1 ? ' group' : ' groups') + ', ' + watched(gd) + ' watched' });
    if (sup.length) cats.push({ k: 'sup', eb: S.eyebrow || 'Support', title: S.title || 'Support for Right Now', intro: S.intro || '', n: size(sup) + ' short videos' });
    if (L.supportFirst) cats.sort(function (a, b) { return ['sup', 'gd', 'les'].indexOf(a.k) - ['sup', 'gd', 'les'].indexOf(b.k); });
    var catCard = function (c) { return '<button class="ggl-card ggl-cat" data-l="' + (c.door ? 'door' : 'cat') + '" data-v="' + c.k + '"><span class="ggl-eb">' + esc(c.eb) + '</span><h3>' + esc(c.title) + '</h3>' + (c.intro ? '<p class="ggl-muted" style="margin:0">' + esc(c.intro) + '</p>' : '') + '<p class="ggl-cat-n">' + esc(c.n) + '<span class="ggl-cat-go">' + (c.door ? IC.go : IC.play) + '</span></p></button>'; };
    // When Life Changes is one door (GWG BLD 790): where the tree shows its When Life Changes cards in the page, the card
    // and its tab close Learn and open them there. Elsewhere the videos stay in Learn as before.
    var door = lcDoor(app), guides = {};
    gd.forEach(function (t) { t.lessons.forEach(function (l) { guides[l.guide || l.id] = 1; }); });
    var nGuides = Object.keys(guides).length, gw = watched(gd);
    cats.forEach(function (c) { if (c.k === 'gd' && door) { c.door = true; c.n = nGuides + (nGuides === 1 ? ' guide' : ' guides') + ', each with two short videos' + (gw ? ', ' + gw + ' watched' : ''); } });
    var cat = APP.cat && cats.some(function (c) { return c.k === APP.cat && !c.door; }) ? APP.cat : null, q = String(APP.q || '');
    // The top: the search bar and a tab for each category (All first). Search looks across every listed track.
    var chip = function (k, label, on, isDoor) { return '<button type="button" class="ggl-chip' + (on ? ' on' : '') + '" aria-pressed="' + (on ? 'true' : 'false') + '" data-l="' + (isDoor ? 'door' : k ? 'cat' : 'cats') + '"' + (k ? ' data-v="' + k + '"' : '') + (isDoor ? ' aria-label="' + esc(label) + ', opens the guides in ' + esc(meta.name) + '"' : '') + '>' + esc(label) + (isDoor ? IC.go : '') + '</button>'; };
    var top = cats.length ? '<div class="ggl-find" role="search"><input class="ggl-q" id="ggl-q" type="search" placeholder="Search the lessons and videos" aria-label="Search Learn ' + esc(meta.name) + '" value="' + esc(q) + '" enterkeyhint="search" autocomplete="off">'
      + '<div class="ggl-chips" role="group" aria-label="Learn categories">' + chip('', 'All', !cat) + cats.map(function (c) { return chip(c.k, c.title, cat === c.k, c.door); }).join('') + '</div></div><p class="ggl-sr" id="ggl-qn" aria-live="polite"></p>' : '';
    var head = '<div class="ggl-eb">Learn</div><h1>' + esc(L.title || ('Learn ' + meta.name)) + '</h1>' + (cat ? '' : '<p class="ggl-muted">' + esc(L.intro || 'Short animated lessons, narrated aloud. Watch them in any order, as often as you like.') + '</p>');
    var catHtml = function () {
      if (cat === 'les') return '<div class="ggl-eb" style="margin-top:18px">Lessons</div>' + H2(L.lessonsTitle || 'Learn Step by Step') + (all ? '<p style="margin-top:6px"><b>' + fin + ' of ' + all + '</b> lessons finished on this device.</p>' : '') + tr.map(card).join('');
      if (cat === 'sup') return '<div class="ggl-eb" style="margin-top:18px">' + esc(S.eyebrow || 'Support') + '</div>' + H2(S.title || 'Support for Right Now') + (S.intro ? '<p class="ggl-muted">' + esc(S.intro) + '</p>' : '') + sup.map(card).join('');
      if (cat === 'gd') {
        var ring = APP.ring ? gd.filter(function (t) { return t.id === APP.ring; })[0] : null;
        return ring ? '<div style="margin-top:12px">' + back(['cat', 'gd'], 'Back to ' + (GD.title || 'When Life Changes')) + '</div><div class="ggl-eb" style="margin-top:6px">' + esc(GD.title || 'When Life Changes') + '</div>' + H2(ring.title) + gcard(ring)
          : '<div class="ggl-eb" style="margin-top:18px">How to Show Up</div>' + H2(GD.title || 'When Life Changes') + (GD.intro ? '<p class="ggl-muted">' + esc(GD.intro) + '</p>' : '')
            + '<div class="ggl-cats">' + gd.map(function (t) { var w = watched([t]); return '<button class="ggl-card ggl-cat" data-l="ring" data-v="' + esc(t.id) + '"><h3>' + esc(t.title) + '</h3><p class="ggl-cat-n">' + t.lessons.length + ' videos' + (w ? ', ' + w + ' watched' : '') + '<span class="ggl-cat-go">' + IC.play + '</span></p></button>'; }).join('') + '</div>';
      }
      return '<h2 class="ggl-sr">Videos</h2>' + voiceCard()
        + (cats.length ? '<div class="ggl-cats">' + cats.map(catCard).join('') + '</div>' : '<div class="ggl-card"><p>New lessons are on the way. Check back soon.</p></div>')
        + '<div class="ggl-card"><h3>Share ' + esc(meta.name) + '</h3><p class="ggl-muted">Print a one-page flyer for a bulletin board at school, church, or work. Its QR code opens ' + esc(meta.name) + '.</p><div class="ggl-row"><button class="ggl-btn" data-l="flyer">' + IC.print + 'Print the ' + esc(meta.name === 'The Grove' ? 'Grove' : meta.name) + ' Flyer</button></div></div>'
        + '<p class="ggl-muted" style="font-size:14px;margin-top:16px">Lessons are optional. Your progress stays on this device and goes along in your Grow With Grounded backup.</p>';
    };
    // Search results: every word typed appears in the title, the blurb, or the track's name. The listed tracks only, so
    // a low-key track (Living Sober) is found once it is chosen, like the list.
    var results = function (qq) {
      var ws = qq.toLowerCase().split(/\s+/).filter(Boolean), out = [], hit = function (t) { t = t.toLowerCase(); return ws.every(function (w) { return t.indexOf(w) >= 0; }); };
      tracksFor(app).filter(function (t) { return !t.unlisted; }).forEach(function (t) {
        var gv = t.kind === 'guide', where = gv ? (GD.title || 'When Life Changes') + ', ' + t.title : t.kind === 'support' ? (S.title || 'Support for Right Now') + ', ' + t.title : t.title;
        t.lessons.forEach(function (l) { if (hit([l.title, l.guideTitle, l.blurb, l.sideName, t.title, where].join(' '))) out.push({ l: l, t: t, gv: gv, where: where }); });
        (t.pages || []).map(function (id) { return pageOf(app, id); }).filter(Boolean).forEach(function (p) { if (hit([p.title, p.blurb, t.title].join(' '))) out.push({ p: p, where: t.title }); });
      });
      var n = out.length;
      var body = n ? '<div class="ggl-card ggl-res"><h3>' + n + (n === 1 ? ' match' : ' matches') + '</h3><div class="ln-list">' + out.map(function (x) {
        if (x.p) return '<button class="ln-item" data-l="page" data-v="' + esc(x.p.id) + '"><span class="ln-n">' + IC.page + '</span><span class="ln-t"><b>' + esc(x.p.title) + '</b><span class="ggl-res-k">' + esc(x.where) + ', A Page to Read</span><small>About ' + esc(String(x.p.mins || 3)) + ' minutes to read.</small></span>' + IC.page + '</button>';
        var l = x.l, sp = x.t.kind === 'support', d = !!D.done[l.id] && !sp;
        return '<button class="ln-item' + (d ? ' done' : '') + '" data-l="open" data-v="' + esc(l.id) + '"><span class="ln-n">' + (d ? IC.check : IC.play) + '</span><span class="ln-t"><b>' + esc(x.gv ? (l.guideTitle || l.title) : l.title) + '</b><span class="ggl-res-k">' + esc(x.where) + (x.gv && l.sideName ? ', ' + esc(l.sideName) : '') + '</span><small>' + (l.blurb && !x.gv ? esc(l.blurb) + ' ' : '') + 'About ' + esc(String(l.mins || 2)) + ' minutes' + (d ? '. Watched.' : '') + '</small></span>' + IC.play + '</button>';
      }).join('') + '</div></div>'
        : '<div class="ggl-card ggl-res"><p style="margin:0">Try another word for \u201c' + esc(qq) + '\u201d, or tap a category above to browse.</p></div>';
      return { n: n, html: body };
    };
    var paint = function () {
      var qq = String(APP.q || '').trim(), box = $('#ggl-body', el), live = $('#ggl-qn', el); if (!box) return;
      if (qq) { var r = results(qq); box.innerHTML = r.html; if (live) live.textContent = r.n + (r.n === 1 ? ' match' : ' matches'); }
      else { box.innerHTML = catHtml(); if (live) live.textContent = ''; }
    };
    APP.paint = paint;
    el.innerHTML = head + top + '<div id="ggl-body"></div>';
    paint();
    APP.root.scrollTop = 0; var h = $('h1', el); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
  }
  // The tree's own When Life Changes view, when it has one in the page (GWG BLD 790). A tree can name its own opener as
  // window.GG_LC_OPEN[app]() (it opens the All cards); otherwise Learn uses the tree's own tab opener. Null keeps the videos in Learn.
  // The browser puts the page back where it was when Learn opened, so Learn then brings the guides into view itself.
  function lcDoor(app) {
    var W = window, own = (W.GG_LC_OPEN || {})[app], fn = null, at = null;
    if (typeof own === 'function') fn = function () { own(); };
    else if ((app === 'maple' || app === 'aspen') && typeof W.go === 'function' && document.getElementById('view-life')) { fn = function () { W.go('life'); }; at = '#view-life'; }
    else if (/^(pine|birch|oak|sequoia)$/.test(app) && typeof W.lcOpen === 'function' && document.getElementById('client-life')) { fn = function () { W.lcOpen('client', null); }; at = '#client-life'; }
    else if (app === 'willow' && W.W && typeof W.W.go === 'function' && document.getElementById('w-view')) { fn = function () { try { if (W.W.S && W.W.S.guide) W.W.S.guide.open = null; } catch (e) {} W.W.go('guides'); }; at = '#w-view'; }
    else if (app === 'grove' && document.querySelector('#tabs [data-tab="life"]')) { fn = function () { var t = document.querySelector('#tabs [data-tab="life"]'); if (t) t.click(); else location.hash = '#life'; }; at = '#app'; }
    if (!fn) return null;
    return function () {
      fn();
      if (at) setTimeout(function () {
        var v = document.querySelector(at); if (!v) return;
        try {
          var to = function (y) { window.scrollTo({ top: Math.max(0, y), behavior: 'instant' }); }, y = v.getBoundingClientRect().top + window.scrollY;
          to(y);
          // A sticky bar across the top (a tree's tab bar) keeps the heading in view below it.
          for (var n = document.elementFromPoint(innerWidth / 2, 2); n && n !== document.body; n = n.parentElement) {
            var ps = getComputedStyle(n).position; if (ps === 'fixed' || ps === 'sticky') { var bt = n.getBoundingClientRect().bottom; if (bt > 0 && bt < innerHeight / 2) to(y - bt - 8); break; }
          }
        } catch (e) {}
      }, 140);
    };
  }
  function lesson(id, fromPop) {
    var app = APP.app, f = find(app, id); if (!f) return list(fromPop);
    if (!fromPop) { if (APP.view === 'list' && APP.depth === 1) hPush(2, id); else hSet(id); }
    APP.view = 'lesson'; APP.gv = f.t.kind === 'guide';
    var D = load(app), el = $('#ggl-in', APP.root), meta = APPS[app];
    var sup = f.t.kind === 'support', gv = f.t.kind === 'guide', pair = gv && f.l.pairId ? (find(app, f.l.pairId) || {}).l : null;
    el.innerHTML = '<button class="ggl-link" data-l="' + (gv && APP.fromGuide ? 'close' : 'home') + '">&larr; ' + (gv ? (APP.fromGuide ? 'Back to the Guide' : 'Back to Learn') : sup ? 'Back to Learn' : 'All lessons') + '</button><div class="ggl-eb" style="margin-top:6px">' + (gv ? esc(((window.GG_LEARN_GUIDES || {})[app] || {}).title || 'When Life Changes') + ', ' + esc(f.l.sideName || '') : esc(f.t.title) + (sup ? '' : ', Lesson ' + esc(String(f.l.n || '')))) + '</div><h1>' + esc(gv ? (f.l.guideTitle || f.l.title) : f.l.title) + '</h1>' + (gv ? '' : forTag(f.l, 'ggl-for')) + '<div id="ggl-host"></div>';
    APP.root.scrollTop = 0;
    player($('#ggl-host', el), {
      app: app, lesson: f.l, track: f.t, tracks: f.t.unlisted ? [f.t] : tracksFor(app).filter(function (t) { return !t.unlisted && (t.kind === 'support') === sup && (t.kind === 'guide') === gv; }), done: D.done, at: D.at[f.l.id] || 0, accent: meta.btn,
      pair: pair, fromGuide: gv && APP.fromGuide,
      guide: function (gid) { closeThen(function () { var go = (window.GG_GUIDE_OPEN || {})[app]; if (typeof go === 'function') go(gid); else location.hash = '#guide=' + encodeURIComponent(gid); }); },
      onAt: function (i) { var d = load(app); d.at[f.l.id] = i; keep(app, d); },
      onDone: function (lid) { var d = load(app); if (!d.done[lid]) { d.done[lid] = today(); keep(app, d); } D.done[lid] = d.done[lid]; },
      open: function (nid) { lesson(nid); },
      home: function () { if (gv && APP && APP.fromGuide) close(); else goList(); },
      cert: function (t) { cert(app, t); }
    });
  }
  function cert(app, t) {
    var D = load(app), when = t.lessons.map(function (l) { return D.done[l.id]; }).filter(Boolean).sort().pop() || today();
    var name = prompt('Name to print on the certificate:', ''); if (name === null) return; name = name.trim(); if (!name) return;
    needPrint().then(function () { if (window.GGPrint) GGPrint.certificate({ tree: app, name: name, title: t.certTitle || (APPS[app].name + ': ' + t.title), body: t.certLine || ('For finishing every lesson in the ' + t.title + ' series.'), date: when, kind: 'series' }); });
  }
  function hasPages(app) { return ((window.GG_LEARN || {})[app] || { tracks: [] }).tracks.some(function (t) { return t && t.pages && t.pages.length; }); }
  // A written page inside Learn (GWG BLD 787): the page, its Sources line, Print, and Back.
  function showPage(id, fromPop) {
    if (!APP) return;
    var app = APP.app, p = pageOf(app, id); if (!p) return list(fromPop);
    if (CUR) CUR.stop();
    if (!fromPop) { if (APP.view === 'list' && APP.depth === 1) hPush(2, 'page:' + id); else hSet('page:' + id); }
    APP.view = 'page';
    var tr = ((window.GG_LEARN || {})[app] || { tracks: [] }).tracks.filter(function (t) { return (t.pages || []).indexOf(id) >= 0; })[0];
    var el = $('#ggl-in', APP.root);
    el.innerHTML = '<button class="ggl-link" data-l="home">&larr; ' + (tr ? 'Back to ' + esc(tr.title) : 'Back to Learn') + '</button>'
      + '<article class="ggl-page"><div class="ggl-eb" style="margin-top:6px">' + (tr ? esc(tr.title) + ', ' : '') + 'A Page to Read</div><h1>' + esc(p.title) + '</h1>'
      + '<p class="ggl-muted" style="margin:0">About ' + esc(String(p.mins || 3)) + ' minutes to read.</p>'
      + (p.print !== false ? '<div class="ggl-row"><button class="ggl-btn" data-l="pprint" data-v="' + esc(p.id) + '">' + IC.print + 'Print This Page</button></div>' : '')
      + '<div class="ggl-pg">' + pageBody(p) + '</div><div class="ggl-pg-src"></div></article>'
      + '<div class="ggl-row"><button class="ggl-btn" data-l="home">' + (tr ? 'Back to ' + esc(tr.title) : 'Back to Learn') + '</button></div>';
    APP.root.scrollTop = 0; var h = $('h1', el); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
    needSources();
    (function src(n) { var box = $('.ggl-pg-src', el); if (!box || !box.isConnected) return; if (window.GGSources) { box.innerHTML = GGSources.line(p.sources || []); return; } if (n < 40) setTimeout(function () { src(n + 1); }, 100); })(0);
  }
  // GGLearn.page(app, id): open a written page in the app's Learn.
  function page(app, id) { open(app, null, { page: id }); }
  // After a tab is tapped, focus stays on that tab (the list redraws under it).
  function chipFocus(b) {
    if (!APP || !b || !b.classList || !b.classList.contains('ggl-chip')) return;
    var v = b.getAttribute('data-v'), n = APP.root.querySelector('.ggl-chip[data-l="' + b.getAttribute('data-l') + '"]' + (v ? '[data-v="' + v + '"]' : ':not([data-v])'));
    if (n) try { n.focus({ preventScroll: true }); } catch (e) {}
  }
  // Typing in the search bar redraws the results only, so the cursor stays put. Health and Ability videos load on the first word.
  function appInput(e) {
    var t = e.target; if (!APP || !t || t.id !== 'ggl-q') return;
    APP.q = t.value; if (APP.paint) APP.paint();
    if (t.value && !APP.lifeAsked) { APP.lifeAsked = true; var at = APP.app; needLife(at).then(function () { if (APP && APP.app === at && APP.view === 'list' && APP.q && APP.paint) APP.paint(); }); }
  }
  function appClick(e) {
    var b = e.target.closest('[data-l]'); if (!b || !APP) return;
    var a = b.getAttribute('data-l'), v = b.getAttribute('data-v');
    if (a === 'close') close();
    else if (a === 'home') goList();
    else if (a === 'cats') { APP.cat = null; APP.ring = null; APP.q = ''; list(); chipFocus(b); }
    else if (a === 'cat') { APP.cat = v; APP.ring = null; APP.q = ''; if (v === 'sup') { var at = APP.app; needLife(at).then(function () { if (APP && APP.app === at && APP.cat === 'sup') { list(); chipFocus(b); } }); } else { list(); chipFocus(b); } }
    else if (a === 'door') { var dr = lcDoor(APP.app); if (dr) closeThen(dr); else { APP.cat = 'gd'; APP.ring = null; APP.q = ''; list(); } }
    else if (a === 'ring') { APP.cat = 'gd'; APP.ring = v; list(); }
    else if (a === 'open') lesson(v);
    else if (a === 'page') showPage(v);
    else if (a === 'pprint') { var pp = pageOf(APP.app, v); if (pp) printPage(APP.app, pp); }
    else if (a === 'cert') { var t = tracksFor(APP.app).filter(function (x) { return x.id === v; })[0]; if (t) cert(APP.app, t); }
    else if (a === 'flyer') { var app = APP.app; needPrint().then(function () { if (window.GGPrint) GGPrint.flyer(app); }); }
  }

  // Links (GWG BLD 787): #learn=<lesson id> or #page=<page id> on a tree app's page (/oak/, /maple/, ...) opens that video or
  // page in the app's Learn. The video waits on its Play button, so sound starts only after a tap (like #watch). The hash
  // comes off the address first, so Back and closing Learn land on the app itself.
  function fromLink() {
    var m = /^#(learn|page)=([A-Za-z0-9_-]+)$/.exec(location.hash || ''); if (!m) return;
    var app = String(location.pathname.split('/')[1] || ''); if (!APPS[app]) return;
    try { history.replaceState(history.state, '', location.pathname + location.search); } catch (e) {}
    if (m[1] === 'learn') open(app, m[2]); else open(app, null, { page: m[2] });
  }
  window.addEventListener('hashchange', fromLink);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fromLink); else setTimeout(fromLink, 0);

  window.GGLearn = { music: MUSIC, musicState: function () { return { playing: !!BG.el && !BG.el.paused, src: BG.src, vol: Math.round((BG.gain ? BG.gain.gain.value : (BG.el ? BG.el.volume : 0)) * 100) / 100 }; }, guideTracks: guideTracks, watched: watched, marks: function (app) { return load(app); }, needLife: needLife, voiceCard: voiceCard, beatsOf: beatsOf, rec: REC, recVoice: recVoice, clipName: clipName, sealedName: sealedName, sealedClip: sealedClip, sealedOk: sealedOk, silent: silent, clipUrl: clipUrl, scene: scene, player: player, open: open, page: page, close: close, ending: ending, certable: certable, trackDone: trackDone, css: css, apps: APPS, version: V };
})();
