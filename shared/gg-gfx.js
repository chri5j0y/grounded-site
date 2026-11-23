/* =====================================================================
   GROW WITH GROUNDED: Video Graphics (shared/gg-gfx.js)   GWG BLD 989, November 2026
   (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
   Chris, November 14, 2026: "lets look for more of these opportunities.. polish refine and make cool graphics".
   Simple moving graphics drawn by code beside a video scene's words, loaded on demand by the one video player
   (shared/gg-learn.js). The graphics plan (shared/learn-gfx.js, window.GG_GFX) names one per scene; the words, cues, and
   recordings never change. Every word on a graphic is live text; nothing is baked into a picture.
     tree    a small drawn tree (roots, trunk, bark, branches, leaves, fruit) with the named part glowing and its name
             under it. Roots shows the word only, never a faith symbol. Several parts light in turn as their sentences start.
     body    a calm seated outline, clothed, full size, the named part glowing softly in honey (never red); a part with !
             tightens to a deeper amber (squeeze and release), then softens back when the next step names it plainly.
     wave    one wave that rises, peaks, and settles, with a dot riding it: rise, peak, settle, ride (the whole wave once),
             loop (a slow loop), or breath (it follows the scene's breathing ring). No objects or substances.
     senses  5-4-3-2-1: five rows with simple line icons and dots, the current row lit and the done rows filled.
     tap     left and right tapping: two soft dots pulsing in turn, seconds per side (L or R lights one side, 0 rests).
     rail    the letters of STOP or RAIN down the side, the current one lit with its word (from each video's own script).
     box, tri, sigh   a Breath Shape (shared/gg-breath-ring.js) on its own clock, for a scene with no breath of its own.
   BLD 990 Video Graphics Round 2 (Chris, November 14, 2026: "can we make them better?", then "1", the painted tree, look A):
     tree    now the painted tree of the video's own app (oak, maple, aspen, pine, birch, sequoia, willow; the Grove a grove of
             three; anything else the Oak), the lit part glowing gold.
     body    adds handheart, handbelly (a hand resting there, rising with the breath), and roots (roots growing from the feet).
     circle  the talking circle; kind  widening kind wishes; rings  growth rings and the season; support  the circle of support
             (one ring of dots drawing). day  the day arc; bridge  the repair bridge (one path drawing). cup  a plain water glass,
             battery, dial  the Name It dial (one fill level drawing). weather  Maple's weather; branch  good things on a branch;
             talk  the conversation turn. People are always plain dots, never figures.
   BLD 992 Video Graphics Round 3 (Chris, November 15, 2026: the mockup, "build as shown"):
     forest  three trees linked underground: roots, threads, share (water travels to the little tree), shelter (wind), grow.
     hope    the hope path: a goal flag, a path (two with def.two), and a warm dot that walks it.
     pulse   a heartbeat line in honey that slows and settles; no numbers, no grid, no red.
     note    the set it down notebook: blank marks, one gold step for tomorrow, and the cover closes.
     stones  stepping stones across a stream, lit one at a time, a warm dot hopping onto each.
             These five are named by a def's x on a plain panel kind, and each keeps its own clock (timed, below).
     wx      a def flag: weather icons take the place of the dots beside Sunny, Partly cloudy, and Rainy in the points.
     box     a def's own place for the panel, off a person in the painting.
   GGGfx.draw(el) draws into a player's panel (el.__gfx = {g, def, steps: [{b, v}], dk}); GGGfx.at(el, beat) moves it to
   the step for that sentence (-1 before the first, Infinity shows everything, as stepping by hand does).
   Reduced motion: no pulsing, glowing, or riding; each step lands at once, and the color and the words lead.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGGfx) return;
  var NS = 'http://www.w3.org/2000/svg', N = 0;
  var SELF = (function () { try { return document.currentScript && document.currentScript.src; } catch (e) { return ''; } })();
  function reduced() { try { return !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } }
  function el(tag, a, p) { var e = document.createElementNS(NS, tag); for (var k in a) if (a[k] != null) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function svgOf(host, vb, label) { var s = el('svg', { viewBox: vb, 'class': 'gx-svg', preserveAspectRatio: 'xMidYMid meet', 'aria-hidden': 'true', focusable: 'false' }); host.appendChild(s); return s; }
  function txt(p, x, y, s, a) { var t = el('text', Object.assign({ x: x, y: y }, a || {}), p); t.textContent = s; return t; }
  var DISP = "'Cormorant Garamond', Georgia, serif", BODY = "Barlow, system-ui, sans-serif", COND = "'Barlow Condensed', 'Arial Narrow', sans-serif";
  // Ink by tone: dk is a scene on a painting (light ink), otherwise the warm paper (dark ink).
  function ink(dk) {
    return dk ? { ink: '#FFF8EC', soft: '#EBD9B6', dim: 'rgba(255,248,236,.34)', line: 'rgba(255,248,236,.62)', fill: 'rgba(255,248,236,.12)', glow: '#F2C46A', deep: '#E39A4C', on: '#F7E2B4' }
      : { ink: '#2C1810', soft: '#6B5A4D', dim: '#D9CCB6', line: '#A8957C', fill: '#F3EBDD', glow: '#E7B65A', deep: '#C9772F', on: '#F6DDA8' };
  }
  // The six parts (shared/gg-learn.js PART), each with a lighter color for paintings.
  var PART = { roots: ['Roots', 'Spirit', '#5B3A22', '#D8B48C'], trunk: ['Trunk', 'Meaning', '#8B5E1A', '#E9BE6E'], bark: ['Bark', 'Mind', '#7D6B57', '#D9C6AC'],
    branches: ['Branches', 'Relationships', '#9A5B34', '#E8AA7E'], leaves: ['Leaves', 'Body', '#5F7D48', '#B3D293'], fruit: ['Fruit', 'Hope', '#C07A26', '#F5BC62'] };
  var ORDER = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];
  function and(list) { return list.length < 2 ? list.join('') : list.length === 2 ? list[0] + ' and ' + list[1] : list.slice(0, -1).join(', ') + ', and ' + list[list.length - 1]; }
  function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
  function glowFilter(svg, id, sd) {
    var d = el('defs', {}, svg), f = el('filter', { id: id, x: '-60%', y: '-60%', width: '220%', height: '220%' }, d);
    el('feGaussianBlur', { stdDeviation: sd || 5, result: 'b' }, f); var m = el('feMerge', {}, f); el('feMergeNode', { 'in': 'b' }, m); el('feMergeNode', { 'in': 'SourceGraphic' }, m);
    return d;
  }
  // The step that holds at sentence i: the last step at or before it.
  function stepAt(G, i) {
    var v = null; (G.steps || []).forEach(function (s) { if (s.b <= i) v = s.v; });
    return v;
  }
  function allSteps(G) { return (G.steps || []).map(function (s) { return s.v; }); }

  /* ---------------- tree (BLD 990: the painted tree, look A) ----------------
     Each tree drawn as itself, chosen by the video's app (G.app): Oak broad and round, Maple round in autumn reds and
     oranges, Aspen slender with a pale trunk and golden leaves, Pine a tall cone of layered boughs with cones for fruit,
     Birch a white trunk with dark marks and spring green, Sequoia tall and columnar with a thick red trunk, Willow with
     drooping strands. The Grove draws a small grove of three; Get Grounded Now, pages, and anything else draw the Oak.
     Soft shaded leaves, a tapered trunk with bark on it, branches behind the canopy, roots under a soil line, fruit on the
     canopy edge. The lit part glows gold (its name and meaning are live text under the tree); the other parts rest softly
     dimmed. A def may name its own tree (def.tree). Ground is y 0; the tree grows up into negative y. */
  var TREES = {
    oak: { bark: ['#5A3D26', '#7C5A3C', '#4A3220'], leaf: [['#6E9446', '#4C7030', '#93B862'], ['#5F8A3C', '#41632A', '#86AE56']], fruit: 'acorn', fc: '#A8783A',
      h: 92, wb: 17, wt: 11, fl: 10,
      can: [[-96, -106, 30], [96, -104, 30], [-62, -130, 44], [62, -128, 46], [0, -146, 58], [-74, -166, 32], [76, -164, 32], [-34, -184, 44], [36, -182, 44], [0, -206, 34]],
      br: [[-2, -80, -60, -88, -104, -100, 6], [2, -82, 62, -90, 106, -98, 6], [-3, -92, -30, -126, -64, -140, 6], [3, -92, 34, -126, 66, -138, 6], [0, -94, -10, -150, -34, -182, 5], [0, -94, 12, -150, 36, -180, 5], [0, -94, 0, -150, 0, -200, 5]],
      fr: [[3, 200], [1, 330], [4, 210], [2, 335], [8, 250], [7, 290], [5, 200], [6, 340], [9, 270]] },
    maple: { bark: ['#5E4230', '#82604A', '#4C3424'], leaf: [['#D66A30', '#A8461F', '#F09A4C'], ['#C2402A', '#902C1E', '#E2683E'], ['#E3A23C', '#B8742A', '#F4C766']], fruit: 'samara', fc: '#8E4A24',
      h: 86, wb: 13, wt: 9, fl: 8,
      can: [[-68, -110, 28], [68, -110, 28], [0, -112, 38], [-50, -138, 42], [50, -138, 42], [0, -156, 54], [-30, -192, 40], [30, -192, 40], [0, -214, 30]],
      br: [[-2, -78, -40, -92, -66, -110, 5], [2, -78, 40, -92, 68, -108, 5], [-2, -86, -26, -130, -48, -150, 5], [2, -86, 28, -130, 50, -150, 5], [0, -88, -8, -150, -26, -190, 4], [0, -88, 8, -150, 28, -190, 4], [0, -88, 0, -160, 0, -206, 4]],
      fr: [[0, 200], [1, 340], [3, 205], [4, 330], [6, 220], [7, 320], [8, 270]] },
    aspen: { bark: ['#D7CFBC', '#F1EBDD', '#B9AE98'], mark: '#4E463B', leaf: [['#E8BE3E', '#BF8E22', '#F7DB70'], ['#DDAA2E', '#B07E1C', '#F2CE5A']], fruit: 'catkin', fc: '#8E6E28',
      h: 150, wb: 8, wt: 5, fl: 6,
      can: [[0, -160, 28], [-26, -178, 26], [26, -180, 26], [-32, -206, 20], [32, -208, 20], [0, -198, 34], [-14, -228, 26], [14, -228, 26], [0, -250, 20]],
      br: [[-1, -150, -14, -164, -30, -176, 3.5], [1, -152, 14, -166, 30, -178, 3.5], [-1, -160, -10, -196, -24, -214, 3], [1, -160, 10, -196, 24, -216, 3], [0, -160, 0, -210, 0, -244, 3]],
      fr: [[1, 160], [2, 20], [3, 170], [4, 10], [7, 200], [8, 330], [0, 90]] },
    pine: { bark: ['#5A3E2C', '#7A5840', '#46301F'], leaf: [['#3E6E4A', '#24472F', '#5E8F62'], ['#356245', '#1F3F2A', '#55865A']], fruit: 'cone', fc: '#8A5A2E',
      h: 266, wb: 10, wt: 2, fl: 7, pine: true,
      tiers: [[-36, 92, 46], [-82, 78, 44], [-126, 64, 42], [-168, 50, 40], [-208, 36, 38], [-244, 22, 36]],
      br: [[0, -40, -40, -46, -80, -40, 3.5], [0, -40, 40, -46, 82, -40, 3.5], [0, -86, -36, -90, -70, -86, 3], [0, -86, 36, -90, 70, -86, 3], [0, -130, -30, -134, -58, -130, 3], [0, -130, 30, -134, 58, -130, 3], [0, -172, -24, -176, -44, -172, 2.5], [0, -172, 24, -176, 44, -172, 2.5]] },
    birch: { bark: ['#E9E3D5', '#FBF8F0', '#C8BFAE'], mark: '#3A332C', leaf: [['#93BC52', '#6A9336', '#B6D878'], ['#86B048', '#5E8430', '#A8CC6A']], fruit: 'catkin', fc: '#7A6A34',
      h: 140, wb: 9, wt: 6, fl: 6,
      can: [[-48, -148, 22], [48, -150, 22], [-30, -168, 30], [30, -170, 30], [0, -186, 36], [-40, -196, 22], [40, -196, 22], [-16, -212, 28], [18, -212, 28], [0, -234, 20]],
      br: [[-1, -136, -24, -146, -46, -150, 3.5], [1, -138, 24, -148, 48, -152, 3.5], [-1, -140, -18, -178, -38, -196, 3], [1, -140, 18, -178, 40, -196, 3], [0, -142, 0, -200, 0, -228, 3]],
      fr: [[0, 120], [1, 60], [2, 150], [3, 40], [5, 190], [6, 350], [9, 280]] },
    sequoia: { bark: ['#8E4528', '#B25E38', '#6E321C'], leaf: [['#3F6E46', '#284C30', '#5E8E60'], ['#4A7A4E', '#2E5434', '#6A9A66']], fruit: 'cone', fc: '#8E5E34',
      h: 220, wb: 22, wt: 9, fl: 13, tall: true,
      can: [[-30, -132, 18], [30, -130, 18], [-28, -158, 22], [28, -156, 22], [0, -170, 24], [-26, -188, 24], [26, -186, 24], [0, -200, 26], [-22, -218, 24], [22, -216, 24], [0, -232, 26], [-16, -248, 22], [16, -246, 22], [0, -270, 22]],
      br: [[-6, -128, -24, -126, -42, -120, 4], [6, -126, 24, -124, 42, -118, 4], [-5, -160, -22, -160, -40, -154, 3.5], [5, -158, 22, -158, 40, -152, 3.5], [-4, -192, -20, -192, -36, -186, 3], [4, -190, 20, -190, 36, -184, 3], [-3, -222, -16, -222, -30, -216, 3], [3, -220, 16, -220, 30, -214, 3]],
      fr: [[0, 140], [1, 40], [3, 30], [2, 150], [5, 160], [6, 20], [9, 30], [8, 160]] },
    willow: { bark: ['#5E4834', '#806448', '#4A3826'], leaf: [['#9CBA62', '#6F8F3E', '#BCD584'], ['#8EAE56', '#64843A', '#AECB76']], fruit: 'catkin', fc: '#B8A040',
      h: 96, wb: 15, wt: 10, fl: 10, willow: true,
      can: [[-46, -136, 40], [46, -136, 40], [0, -150, 52], [-26, -174, 32], [28, -172, 32], [0, -188, 38]],
      br: [[-2, -86, -40, -110, -74, -128, 5], [2, -86, 40, -110, 76, -128, 5], [-2, -94, -20, -150, -34, -178, 4], [2, -94, 22, -150, 36, -176, 4], [0, -96, 0, -160, 0, -196, 4]],
      fr: [[0, 180], [1, 0], [3, 200], [4, 340], [5, 270], [2, 210], [2, 330]] }
  };
  var TREE_OF = { maple: 'maple', aspen: 'aspen', pine: 'pine', birch: 'birch', oak: 'oak', sequoia: 'sequoia', willow: 'willow', grove: 'grove' };
  function treeOf(G) { var t = G.def && G.def.tree; return TREES[t] || t === 'grove' ? t : TREE_OF[G.app] || 'oak'; }
  // a shaded fill: a radial gradient lighter at the upper left
  function radial(d, id, c0, c1, cx, cy) { var g = el('radialGradient', { id: id, cx: cx || '36%', cy: cy || '30%', r: '72%' }, d); el('stop', { offset: '0%', 'stop-color': c0 }, g); el('stop', { offset: '100%', 'stop-color': c1 }, g); return 'url(#' + id + ')'; }
  function linear(d, id, stops, x2, y2) { var g = el('linearGradient', { id: id, x1: 0, y1: 0, x2: x2 == null ? 1 : x2, y2: y2 || 0 }, d); stops.forEach(function (s) { el('stop', { offset: s[0], 'stop-color': s[1], 'stop-opacity': s[2] == null ? 1 : s[2] }, g); }); return 'url(#' + id + ')'; }
  // One tree, drawn into g at its own place: returns its six part groups, each {nat, gold} (gold shows when the part is lit).
  function paintTree(g, type, id, d, C) {
    var T = TREES[type], P = {}, h = T.h, wb = T.wb, wt = T.wt, fl = T.fl;
    function part(k) { var q = el('g', { 'class': 'gx-part', 'data-p': k }, g); P[k] = { g: q, nat: el('g', {}, q), gold: el('g', { 'class': 'gx-gold', opacity: 0 }, q) }; return P[k]; }
    var GOLD = '#F2C46A', GOLD2 = '#FFE3A0';
    // roots, spreading under the soil line
    var R = part('roots'), RT = [['M-6 0 C-16 16 -40 24 -74 30', 6.5], ['M6 0 C16 18 42 26 78 32', 6.5], ['M-2 1 C-6 18 -14 30 -26 44', 5], ['M3 1 C7 18 16 30 28 44', 5], ['M-9 0 C-30 6 -64 7 -102 12', 4], ['M9 0 C30 7 64 8 104 13', 4],
      ['M-40 22 C-50 30 -56 38 -60 46', 2.6], ['M44 24 C54 32 58 40 62 47', 2.6], ['M-70 9 C-80 16 -88 22 -96 30', 2.2], ['M72 10 C82 17 90 23 98 31', 2.2], ['M0 2 C1 16 -1 32 2 48', 3.6]];
    RT.forEach(function (a) { el('path', { d: a[0], stroke: T.bark[0], 'stroke-width': a[1], 'stroke-linecap': 'round', fill: 'none' }, R.nat); el('path', { d: a[0], stroke: GOLD, 'stroke-width': a[1] + 0.6, 'stroke-linecap': 'round', fill: 'none' }, R.gold); });
    // branches, behind the canopy (they show through when lit)
    var B = part('branches');
    (T.br || []).forEach(function (b) { var p = 'M' + b[0] + ' ' + b[1] + ' Q' + b[2] + ' ' + b[3] + ' ' + b[4] + ' ' + b[5]; el('path', { d: p, stroke: T.bark[0], 'stroke-width': b[6], 'stroke-linecap': 'round', fill: 'none' }, B.nat); el('path', { d: p, stroke: GOLD, 'stroke-width': b[6] + 0.8, 'stroke-linecap': 'round', fill: 'none' }, B.gold); });
    // the trunk, tapered, with a root flare and round shading
    var TR = part('trunk'), tf = linear(d, id + 't', [['0%', T.bark[2]], ['38%', T.bark[1]], ['70%', T.bark[0]], ['100%', T.bark[2]]]);
    var tp = T.pine ? 'M' + (-wb - fl) + ' 2 C' + (-wb) + ' -10 ' + (-wb * 0.7) + ' -90 ' + (-wt) + ' ' + (-h) + ' L' + wt + ' ' + (-h) + ' C' + (wb * 0.7) + ' -90 ' + wb + ' -10 ' + (wb + fl) + ' 2 Z'
      : 'M' + (-wb - fl) + ' 2 C' + (-wb) + ' -6 ' + (-wb) + ' ' + (-h * 0.25) + ' ' + (-wb + 1) + ' ' + (-h * 0.45) + ' C' + (-wb + 2) + ' ' + (-h * 0.7) + ' ' + (-wt) + ' ' + (-h * 0.85) + ' ' + (-wt) + ' ' + (-h) + ' L' + wt + ' ' + (-h) + ' C' + wt + ' ' + (-h * 0.85) + ' ' + (wb - 2) + ' ' + (-h * 0.7) + ' ' + (wb - 1) + ' ' + (-h * 0.45) + ' C' + wb + ' ' + (-h * 0.25) + ' ' + wb + ' -6 ' + (wb + fl) + ' 2 Z';
    el('path', { d: tp, fill: tf }, TR.nat);
    el('path', { d: tp, fill: T.mark ? '#E3A83E' : GOLD, 'fill-opacity': T.mark ? 0.72 : 0.55, stroke: GOLD2, 'stroke-width': 2.2, 'stroke-linejoin': 'round' }, TR.gold);
    // bark on the trunk: fissures, or the dark marks of a pale trunk
    var BK = part('bark'), mk = T.mark || 'rgba(34,20,10,.5)', BL = [];
    if (T.mark) { for (var i = 0; i < 9; i++) { var y = -10 - i * (h / 10), w0 = wb - (wb - wt) * (i / 9); if (-y > h - 4) break; var x0 = (i % 2 ? -0.1 : -0.85) * w0, ln = w0 * (i % 3 === 0 ? 1.1 : 0.7);
      BL.push(['M' + x0.toFixed(1) + ' ' + y.toFixed(1) + ' q' + (ln / 2).toFixed(1) + ' -1.6 ' + ln.toFixed(1) + ' 0', i % 3 === 0 ? 2.6 : 1.8]); } }
    else { var n = Math.max(4, Math.round(h / 22)); for (var j = 0; j < n; j++) { var yy = -6 - j * (h * 0.9 / n), ww = wb - (wb - wt) * (j / n), xx = ((j * 37) % 7 - 3) / 3 * ww * 0.5, l2 = Math.min(26, h * 0.9 / n + 8);
      BL.push(['M' + xx.toFixed(1) + ' ' + yy.toFixed(1) + ' q' + (j % 2 ? 2.4 : -2.4) + ' ' + (-l2 / 2).toFixed(1) + ' 0 ' + (-l2).toFixed(1), 2]); } }
    BL.forEach(function (a) { el('path', { d: a[0], stroke: mk, 'stroke-width': a[1], 'stroke-linecap': 'round', fill: 'none' }, BK.nat); el('path', { d: a[0], stroke: T.mark ? '#D9962E' : GOLD2, 'stroke-width': a[1] + (T.mark ? 2.4 : 1), 'stroke-linecap': 'round', fill: 'none' }, BK.gold); });
    // leaves: soft shaded clusters (a shadow layer, the shaded blobs, lighter touches)
    var LV = part('leaves'), fills = T.leaf.map(function (c, k) { return radial(d, id + 'l' + k, c[2], c[1]); });
    var edge = [];
    if (T.pine) {
      T.tiers.forEach(function (t, k) {
        var y = t[0], w = t[1], hh = t[2], top = y - hh, fc = fills[k % fills.length];
        var bough = 'M0 ' + top + ' C' + (-w * 0.35) + ' ' + (top + hh * 0.45) + ' ' + (-w * 0.8) + ' ' + (y - 6) + ' ' + (-w) + ' ' + (y + 4) + ' Q' + (-w * 0.72) + ' ' + (y - 4) + ' ' + (-w * 0.5) + ' ' + (y + 2) + ' Q' + (-w * 0.26) + ' ' + (y - 6) + ' 0 ' + (y + 1) + ' Q' + (w * 0.26) + ' ' + (y - 6) + ' ' + (w * 0.5) + ' ' + (y + 2) + ' Q' + (w * 0.72) + ' ' + (y - 4) + ' ' + w + ' ' + (y + 4) + ' C' + (w * 0.8) + ' ' + (y - 6) + ' ' + (w * 0.35) + ' ' + (top + hh * 0.45) + ' 0 ' + top + ' Z';
        el('path', { d: bough, fill: T.leaf[0][1], transform: 'translate(2 4)', opacity: 0.55 }, LV.nat);
        el('path', { d: bough, fill: fc }, LV.nat);
        el('path', { d: 'M' + (-w * 0.1) + ' ' + (top + hh * 0.3) + ' C' + (-w * 0.3) + ' ' + (top + hh * 0.6) + ' ' + (-w * 0.6) + ' ' + (y - 8) + ' ' + (-w * 0.78) + ' ' + (y - 2), stroke: T.leaf[k % 2][2], 'stroke-width': 3, 'stroke-linecap': 'round', fill: 'none', opacity: 0.6 }, LV.nat);
        el('path', { d: bough, fill: GOLD, 'fill-opacity': 0.4 }, LV.gold);
        edge.push([-w * 0.86, y + 3], [w * 0.9, y + 3], [-w * 0.48, y + 1], [w * 0.52, y + 1]);
      });
    } else {
      // one shaded mass for the whole canopy, soft lumps of light and shade on it, so it reads as leaves, never bubbles
      var bx = [1e9, 1e9, -1e9, -1e9]; T.can.forEach(function (c) { bx[0] = Math.min(bx[0], c[0] - c[2]); bx[1] = Math.min(bx[1], c[1] - c[2]); bx[2] = Math.max(bx[2], c[0] + c[2]); bx[3] = Math.max(bx[3], c[1] + c[2]); });
      var cg = el('radialGradient', { id: id + 'c', gradientUnits: 'userSpaceOnUse', cx: bx[0] + (bx[2] - bx[0]) * 0.38, cy: bx[1] + (bx[3] - bx[1]) * 0.3, r: Math.max(bx[2] - bx[0], bx[3] - bx[1]) * 0.75 }, d);
      el('stop', { offset: '0%', 'stop-color': T.leaf[0][2] }, cg); el('stop', { offset: '55%', 'stop-color': T.leaf[0][0] }, cg); el('stop', { offset: '100%', 'stop-color': T.leaf[0][1] }, cg);
      var sf = el('filter', { id: id + 'b', x: '-30%', y: '-30%', width: '160%', height: '160%' }, d); el('feGaussianBlur', { stdDeviation: 3.2 }, sf);
      var sh = el('g', { opacity: 0.45 }, LV.nat); T.can.forEach(function (c) { el('circle', { cx: c[0] + c[2] * 0.1, cy: c[1] + c[2] * 0.16, r: c[2], fill: T.leaf[0][1] }, sh); });
      var base = el('g', {}, LV.nat); T.can.forEach(function (c) { el('circle', { cx: c[0], cy: c[1], r: c[2], fill: 'url(#' + id + 'c)' }, base); });
      var lumps = el('g', { filter: 'url(#' + id + 'b)' }, LV.nat);
      T.can.forEach(function (c, k) { var L = T.leaf[k % T.leaf.length];
        el('circle', { cx: c[0] + c[2] * 0.18, cy: c[1] + c[2] * 0.42, r: c[2] * 0.5, fill: L[1], opacity: 0.4 }, lumps);
        el('circle', { cx: c[0] - c[2] * 0.22, cy: c[1] - c[2] * 0.28, r: c[2] * 0.55, fill: L[k % 3 === 2 ? 0 : 2], opacity: 0.55 }, lumps);
        el('circle', { cx: c[0] + c[2] * 0.3, cy: c[1] - c[2] * 0.12, r: c[2] * 0.22, fill: L[2], opacity: 0.4 }, lumps); });
      var gl = el('g', { opacity: 0.4 }, LV.gold); T.can.forEach(function (c) { el('circle', { cx: c[0], cy: c[1], r: c[2], fill: GOLD }, gl); });
      if (T.willow) {
        // the drooping strands: a back layer, the dome, then a front layer that falls over it
        var S = [], lf = linear(d, id + 'w', [['0%', T.leaf[0][2]], ['55%', T.leaf[0][0]], ['100%', T.leaf[0][1]]], 0, 1), lf2 = linear(d, id + 'v', [['0%', T.leaf[1][0]], ['100%', T.leaf[1][1], 0.9]], 0, 1);
        for (var x = -100; x <= 100; x += 5) {
          var ax = Math.abs(x), r0 = ((x * 29) % 23 + 23) % 23, y0 = ax < 48 ? -150 - Math.sqrt(Math.max(0, 48 * 48 - x * x)) * 0.6 + r0 * 0.8 : -140 + (ax - 48) * 0.55, y1 = -14 - (ax > 78 ? (ax - 78) * 1.4 : 0) - r0 * 2.2, out = x * 0.07, sw = (r0 % 4) - 1.5;
          S.push({ d: 'M' + x + ' ' + y0.toFixed(1) + ' C' + (x + out * 0.4 + sw).toFixed(1) + ' ' + ((y0 * 0.6 + y1 * 0.4)).toFixed(1) + ' ' + (x + out * 1.2 - sw).toFixed(1) + ' ' + (y1 - 26).toFixed(1) + ' ' + (x + out * 1.5).toFixed(1) + ' ' + y1.toFixed(1), w: 1.7 + (r0 % 3) * 0.45 });
        }
        var back = el('g', { opacity: 0.8 }, LV.nat); LV.nat.insertBefore(back, LV.nat.firstChild);
        S.forEach(function (s, k) { if (k % 2) { el('path', { d: s.d, stroke: lf2, 'stroke-width': s.w, 'stroke-linecap': 'round', fill: 'none' }, back); el('path', { d: s.d, stroke: T.leaf[1][1], 'stroke-width': s.w + 1.4, 'stroke-dasharray': '5 3.5', 'stroke-linecap': 'butt', fill: 'none', opacity: 0.55 }, back); } });
        var front = el('g', {}, LV.nat), gs = el('g', { opacity: 0.6 }, LV.gold);
        S.forEach(function (s, k) { if (!(k % 2)) { el('path', { d: s.d, stroke: lf, 'stroke-width': s.w, 'stroke-linecap': 'round', fill: 'none' }, front);
          el('path', { d: s.d, stroke: T.leaf[0][2], 'stroke-width': s.w + 1.6, 'stroke-dasharray': '6 3', 'stroke-dashoffset': k * 1.7, 'stroke-linecap': 'butt', fill: 'none', opacity: 0.6 }, front); }
          el('path', { d: s.d, stroke: GOLD, 'stroke-width': s.w + 1, 'stroke-linecap': 'round', fill: 'none' }, gs); });
      }
      edge = null;
    }
    // fruit, on the canopy edge
    var FR = part('fruit'), FP = [];
    if (T.pine) FP = [edge[0], edge[5], edge[8], edge[13], edge[2], edge[11], edge[16]].filter(Boolean).map(function (q) { return [q[0], q[1] + 8]; });
    else T.fr.forEach(function (f) { var c = T.can[f[0]], a = f[1] * Math.PI / 180; if (c) FP.push([c[0] + Math.cos(a) * c[2] * 0.86, c[1] + Math.sin(a) * c[2] * 0.86]); });
    FP.forEach(function (q) { fruitAt(FR.nat, T.fruit, q[0], q[1], T.fc, false); fruitAt(FR.gold, T.fruit, q[0], q[1], GOLD, true); });
    P.pine = !!T.pine;
    return P;
  }
  function fruitAt(g, kind, x, y, c, gold) {
    var a = { fill: c, stroke: gold ? '#FFF1CC' : 'rgba(255,243,222,.75)', 'stroke-width': gold ? 1.6 : 1 };
    var q = el('g', { transform: 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')' }, g);
    if (kind === 'acorn') { el('ellipse', Object.assign({ cx: 0, cy: 2, rx: 5, ry: 6.4 }, a), q); el('path', { d: 'M-6 -1 Q0 -7 6 -1 Z', fill: gold ? '#FFE3A0' : '#6B4A28' }, q); }
    else if (kind === 'samara') { el('path', Object.assign({ d: 'M0 0 C-4 -3 -12 -2 -14 3 C-10 4 -4 3 0 0 Z' }, a), q); el('path', Object.assign({ d: 'M0 0 C4 -3 12 -2 14 3 C10 4 4 3 0 0 Z' }, a), q); el('circle', { cx: 0, cy: 0, r: 2.6, fill: gold ? '#FFE3A0' : '#6B3018' }, q); }
    else if (kind === 'cone') { el('ellipse', Object.assign({ cx: 0, cy: 4, rx: 4.6, ry: 8 }, a), q); el('path', { d: 'M-4 1 H4 M-4.4 5 H4.4 M-3.4 9 H3.4', stroke: gold ? '#FFF1CC' : 'rgba(40,24,12,.45)', 'stroke-width': 1.2 }, q); }
    else if (kind === 'catkin') { el('path', Object.assign({ d: 'M0 -2 C3 2 3 10 0 14 C-3 10 -3 2 0 -2 Z' }, a), q); }
    else el('circle', Object.assign({ cx: 0, cy: 0, r: 6 }, a), q);
  }
  var TREE = {
    draw: function (host, G) {
      var C = ink(G.dk), id = 'gx' + (++N), type = treeOf(G), grove = type === 'grove';
      var s = svgOf(host, grove ? '-135 -250 270 372' : '-130 -296 260 412');
      var d = el('defs', {}, s);
      // the gold glow under a lit part, and a soft rest for the others
      var f = el('filter', { id: id + 'g', x: '-40%', y: '-40%', width: '180%', height: '180%' }, d);
      el('feGaussianBlur', { 'in': 'SourceAlpha', stdDeviation: 5, result: 'b' }, f); el('feFlood', { 'flood-color': '#F2C46A', 'flood-opacity': G.dk ? 0.85 : 0.7, result: 'c' }, f);
      el('feComposite', { 'in': 'c', in2: 'b', operator: 'in', result: 'h' }, f); var m = el('feMerge', {}, f); el('feMergeNode', { 'in': 'h' }, m); el('feMergeNode', { 'in': 'SourceGraphic' }, m);
      var fd = el('filter', { id: id + 'd', x: '-5%', y: '-5%', width: '110%', height: '110%' }, d);
      el('feColorMatrix', { type: 'saturate', values: G.dk ? 0.78 : 0.42 }, fd);
      // the soil under the ground line
      var gy = 0, soil = linear(d, id + 's', [['0%', G.dk ? '#6B4A30' : '#8A6A48', G.dk ? 0.55 : 0.42], ['100%', G.dk ? '#6B4A30' : '#8A6A48', 0]], 0, 1);
      el('path', { d: 'M-128 ' + gy + ' Q0 -8 128 ' + gy + ' L128 54 L-128 54 Z', fill: soil }, s);
      el('path', { d: 'M-124 ' + gy + ' Q0 -8 124 ' + gy, stroke: G.dk ? 'rgba(235,217,182,.55)' : '#9A7A56', 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round', opacity: 0.8 }, s);
      var trees = [];
      if (grove) [['maple', -80, 0.66], ['pine', 84, 0.66], ['oak', 0, 0.76]].forEach(function (t, k) { var g = el('g', { transform: 'translate(' + t[1] + ' 0) scale(' + t[2] + ')' }, s); trees.push(paintTree(g, t[0], id + 'k' + k, d, C)); });
      else trees.push(paintTree(el('g', {}, s), type, id, d, C));
      var ly = grove ? 82 : 82;
      var L1 = txt(s, 0, ly, '', { 'text-anchor': 'middle', 'font-family': DISP, 'font-weight': 600, 'font-size': 34, fill: C.ink, 'class': 'gx-lab' });
      var L2 = txt(s, 0, ly + 26, '', { 'text-anchor': 'middle', 'font-family': BODY, 'font-weight': 600, 'font-size': 18, fill: C.soft, 'class': 'gx-lab2' });
      host.setAttribute('data-tree', type);
      G.$ = { trees: trees, L1: L1, L2: L2, C: C, id: id };
    },
    at: function (host, G, i) {
      var $ = G.$, cur = [], seen = [];
      if (i === Infinity) { allSteps(G).forEach(function (v) { parts(v).forEach(function (p) { if (cur.indexOf(p) < 0) cur.push(p); }); }); seen = cur.slice(); }
      else {
        (G.steps || []).forEach(function (s) { if (s.b <= i) { parts(s.v).forEach(function (p) { if (seen.indexOf(p) < 0) seen.push(p); }); cur = parts(s.v); } });
        if (G.def.one) seen = cur.slice();
      }
      var any = cur.length > 0, all6 = cur.length >= 6;
      $.trees.forEach(function (P) {
        ORDER.forEach(function (k) {
          var on = cur.indexOf(k) >= 0 && !all6, was = !on && seen.indexOf(k) >= 0, q = P[k];
          // leaves step back while the branches inside them glow
          var rest = any && !on && !all6, thin = k === 'leaves' && !all6 && (cur.indexOf('branches') >= 0 || (P.pine && (cur.indexOf('trunk') >= 0 || cur.indexOf('bark') >= 0)));
          q.g.setAttribute('class', 'gx-part' + (on ? ' gx-on' : was ? ' gx-was' : ''));
          q.g.setAttribute('filter', on && !G.red ? 'url(#' + $.id + 'g)' : rest && !was ? 'url(#' + $.id + 'd)' : '');
          q.g.setAttribute('opacity', thin ? 0.34 : on ? 1 : was ? 0.9 : rest ? (G.dk ? 0.74 : 0.72) : 1);
          q.gold.setAttribute('opacity', on ? 1 : all6 ? 0.45 : 0);
        });
      });
      var show = cur.length ? cur : [];
      label($.L1, show.map(function (k) { return PART[k][0]; }), show.length > 1 ? 30 : 34);
      $.L2.textContent = show.length && show.length < 3 ? and(show.map(function (k) { return PART[k][1]; })) : '';
      host.setAttribute('data-on', cur.join(' '));
    }
  };
  function parts(v) { if (!v || v === '-') return []; if (v === 'all') return ORDER.slice(); return String(v).split('+').filter(function (k) { return PART[k]; }); }

  /* ---------------- body ---------------- */
  // A calm seated outline, front view, in a chair: a soft sweater and trousers, no detail. Regions glow; words map onto them.
  var REGION = { feet: 'feet', toes: 'feet', ankles: 'feet', legs: 'legs', knees: 'legs', calves: 'legs', thighs: 'legs', hips: 'hips', belly: 'belly', tummy: 'belly',
    chest: 'chest', heart: 'chest', back: 'back', hands: 'hands', fists: 'hands', fingers: 'hands', arms: 'arms', elbows: 'arms', shoulders: 'shoulders', neck: 'neck',
    jaw: 'jaw', face: 'face', eyes: 'face', forehead: 'face', head: 'head', handheart: 'chest', handbelly: 'belly', roots: 'feet' };
  // BLD 990: a hand resting on the heart or the belly (it rises and falls with the breath), and roots growing down from the feet.
  var BODYNAME = { handheart: 'Hand on Heart', handbelly: 'Hand on Belly', roots: 'Roots' };
  var ALLR = ['feet', 'legs', 'hips', 'belly', 'chest', 'back', 'hands', 'arms', 'shoulders', 'neck', 'jaw', 'face', 'head'];
  var BODY = {
    draw: function (host, G) {
      var C = ink(G.dk), id = 'gx' + (++N), RO = allSteps(G).some(function (v) { return /(^|\+)roots(\+|$)/.test(String(v)); }), s = svgOf(host, RO ? '0 0 260 446' : '0 0 260 400');
      var d = glowFilter(s, id + 'g', 6);
      var rg = el('radialGradient', { id: id + 'r' }, d); el('stop', { offset: '0%', 'stop-color': C.glow, 'stop-opacity': 0.8 }, rg); el('stop', { offset: '100%', 'stop-color': C.glow, 'stop-opacity': 0 }, rg);
      var MIR = 'matrix(-1 0 0 1 260 0)';
      var SH = {
        torso: 'M84 128 C84 108 100 100 118 97 L142 97 C160 100 176 108 176 128 L178 236 C178 244 172 248 164 248 L96 248 C88 248 82 244 82 236 Z',
        arm: 'M86 110 C72 114 64 128 64 150 L62 222 C62 234 70 240 80 240 L92 238 C88 210 88 160 92 126 Z',
        lap: 'M82 234 L178 234 L182 266 C182 273 176 278 168 278 L92 278 C84 278 78 273 78 266 Z',
        shin: 'M88 272 L124 272 L120 350 C120 355 117 358 112 358 L98 358 C93 358 90 355 90 350 Z',
        foot: 'M94 352 L120 352 C126 354 129 360 127 366 C126 371 121 374 114 374 L86 374 C79 374 76 368 80 362 C83 356 88 352 94 352 Z',
        neck: 'M121 74 L139 74 L141 99 L119 99 Z'
      };
      // a clip for each band of the head and the sweater, so a region lights inside the outline
      function clip(nm, shape, y0, y1, mir) { var c = el('clipPath', { id: id + nm }, d); el('rect', { x: 0, y: y0, width: 260, height: y1 - y0 }, c); return 'url(#' + id + nm + ')'; }
      var halo = el('g', {}, s), base = el('g', {}, s), lit = el('g', {}, s), R = {};
      // the chair, then the person on it
      var chair = el('path', { d: 'M72 84 Q72 66 90 66 H170 Q188 66 188 84 V250 H72 Z', fill: 'none', stroke: C.dim, 'stroke-width': 2.4, 'stroke-linejoin': 'round' }, base);
      el('path', { d: 'M58 252 H202 Q209 252 209 259 Q209 266 202 266 H58 Q51 266 51 259 Q51 252 58 252 Z', fill: 'none', stroke: C.dim, 'stroke-width': 2.2 }, base);
      el('path', { d: 'M64 266 V386 M196 266 V386', fill: 'none', stroke: C.dim, 'stroke-width': 3, 'stroke-linecap': 'round' }, base);
      var ln = { fill: C.fill, stroke: C.line, 'stroke-width': 2.2, 'stroke-linejoin': 'round' };
      function both(dd, p, a) { el('path', Object.assign({ d: dd }, a), p); el('path', Object.assign({ d: dd, transform: MIR }, a), p); }
      both(SH.shin, base, ln); both(SH.foot, base, ln);
      el('path', Object.assign({ d: SH.lap }, ln), base);
      both(SH.arm, base, ln);
      el('path', Object.assign({ d: SH.torso }, ln), base);
      el('path', Object.assign({ d: SH.neck }, ln), base);
      el('ellipse', Object.assign({ cx: 130, cy: 48, rx: 25, ry: 29 }, ln), base);
      both('M80 236 C76 246 84 254 96 254 C106 254 112 248 110 240 C108 234 100 232 92 232 C86 232 82 233 80 236 Z', base, ln);
      // the lit regions, laid over the outline
      function reg(k, make) { var g = el('g', { 'data-r': k, 'class': 'gx-r', opacity: 0 }, lit); make(g); (R[k] = R[k] || []).push(g); }
      var lf = { stroke: 'none' };
      reg('feet', function (g) { both(SH.foot, g, lf); });
      reg('legs', function (g) { both(SH.shin, g, lf); });
      reg('hips', function (g) { el('path', Object.assign({ d: SH.lap }, lf), g); });
      reg('belly', function (g) { el('path', Object.assign({ d: SH.torso, 'clip-path': clip('b', 0, 186, 250) }, lf), g); });
      reg('chest', function (g) { el('path', Object.assign({ d: SH.torso, 'clip-path': clip('c', 0, 126, 186) }, lf), g); });
      reg('shoulders', function (g) { var c = clip('s', 0, 92, 128); el('path', Object.assign({ d: SH.torso, 'clip-path': c }, lf), g); both(SH.arm, el('g', { 'clip-path': c }, g), lf); });
      reg('arms', function (g) { both(SH.arm, g, lf); });
      reg('hands', function (g) { both('M80 236 C76 246 84 254 96 254 C106 254 112 248 110 240 C108 234 100 232 92 232 C86 232 82 233 80 236 Z', g, lf); });
      reg('neck', function (g) { el('path', Object.assign({ d: SH.neck }, lf), g); });
      reg('head', function (g) { el('ellipse', Object.assign({ cx: 130, cy: 48, rx: 25, ry: 29, 'clip-path': clip('h', 0, 16, 34) }, lf), g); });
      reg('face', function (g) { el('ellipse', Object.assign({ cx: 130, cy: 48, rx: 25, ry: 29, 'clip-path': clip('f', 0, 32, 66) }, lf), g); });
      reg('jaw', function (g) { el('ellipse', Object.assign({ cx: 130, cy: 48, rx: 25, ry: 29, 'clip-path': clip('j', 0, 64, 80) }, lf), g); });
      reg('back', function (g) { el('path', { d: 'M72 84 Q72 66 90 66 H170 Q188 66 188 84 V250 H72 Z', fill: 'none', 'stroke-width': 6, 'stroke-linejoin': 'round', 'data-stroke': 1 }, g); });
      // a soft outline over everything, so the lit regions keep the figure's shape
      var top = el('g', { fill: 'none', stroke: C.line, 'stroke-width': 2, 'stroke-linejoin': 'round', opacity: 0.85 }, s);
      both(SH.shin, top, {}); both(SH.foot, top, {}); el('path', { d: SH.lap }, top); both(SH.arm, top, {}); el('path', { d: SH.torso }, top);
      el('ellipse', { cx: 130, cy: 48, rx: 25, ry: 29 }, top); both('M80 236 C76 246 84 254 96 254 C106 254 112 248 110 240 C108 234 100 232 92 232 C86 232 82 233 80 236 Z', top, {});
      var CEN = { feet: [130, 364, 62, 20], legs: [130, 314, 56, 46], hips: [130, 256, 58, 24], belly: [130, 216, 52, 32], chest: [130, 156, 52, 30], back: [130, 160, 72, 100],
        hands: [130, 244, 70, 18], arms: [130, 176, 80, 62], shoulders: [130, 112, 60, 18], neck: [130, 88, 20, 12], jaw: [130, 72, 26, 12], face: [130, 50, 30, 20], head: [130, 28, 30, 16] };
      var H = {}; ALLR.forEach(function (k) { var c = CEN[k]; H[k] = el('ellipse', { cx: c[0], cy: c[1], rx: c[2] + 18, ry: c[3] + 16, fill: 'url(#' + id + 'r)', opacity: 0, 'class': 'gx-glow' }, halo); });
      // roots under the feet, drawn in as they show
      var roots = el('g', { opacity: 0 }, s);
      ['M100 374 C96 392 82 404 64 414', 'M106 374 C108 396 104 412 98 426', 'M112 374 C120 390 126 398 134 408', 'M160 374 C164 392 178 404 196 414', 'M154 374 C152 396 156 412 162 426', 'M148 374 C140 390 134 398 128 410', 'M96 376 C80 382 62 384 44 392', 'M164 376 C180 382 198 384 216 392']
        .forEach(function (p) { var q = el('path', { d: p, fill: 'none', stroke: '#8A6238', 'stroke-width': 4, 'stroke-linecap': 'round', 'class': 'gx-root' }, roots); q.setAttribute('stroke-dasharray', '80 90'); q.setAttribute('stroke-dashoffset', '80'); });
      if (RO) el('path', { d: 'M30 376 Q130 370 230 376', stroke: C.dim, 'stroke-width': 2, fill: 'none' }, s);
      // a hand resting flat (palm and fingers), clothed sleeve to the wrist; it sits on the heart or the belly
      var hand = el('g', { opacity: 0, 'class': 'gx-hand' }, s);
      el('path', { d: 'M186 196 C176 178 160 168 146 166', fill: 'none', stroke: C.line, 'stroke-width': 16, 'stroke-linecap': 'round' }, hand);
      el('path', { d: 'M186 196 C176 178 160 168 146 166', fill: 'none', stroke: C.fill, 'stroke-width': 12, 'stroke-linecap': 'round' }, hand);
      el('path', { d: 'M150 152 C138 150 118 150 108 154 C102 156 102 162 108 164 L112 165 C104 167 104 173 110 174 C104 176 106 182 112 182 C108 186 112 190 118 189 L140 186 C150 184 156 176 156 166 C156 158 154 154 150 152 Z', fill: C.on, stroke: C.line, 'stroke-width': 2, 'stroke-linejoin': 'round' }, hand);
      var L1 = txt(s, 130, RO ? 442 : 397, '', { 'text-anchor': 'middle', 'font-family': DISP, 'font-weight': 600, 'font-size': 26, fill: C.ink, 'class': 'gx-lab' });
      G.$ = { R: R, H: H, L1: L1, C: C, id: id, roots: roots, hand: hand, hy: 0 };
    },
    at: function (host, G, i) {
      var $ = G.$, C = $.C, v;
      if (i === Infinity) { var u = []; allSteps(G).forEach(function (x) { bparse(x).forEach(function (p) { if (!u.some(function (q) { return q.w === p.w; })) u.push({ w: p.w, r: p.r, sq: false }); }); }); v = u; }
      else v = bparse(stepAt(G, i));
      var on = {}; v.forEach(function (p) { if (p.r === 'all') ALLR.forEach(function (k) { on[k] = p.sq ? 2 : 1; }); else on[p.r] = p.sq ? 2 : 1; });
      Object.keys($.R).forEach(function (k) {
        var st = on[k] || 0, col = st === 2 ? C.deep : C.on;
        $.R[k].forEach(function (g) {
          g.setAttribute('opacity', st ? (st === 2 ? 0.95 : 0.85) : 0);
          Array.prototype.forEach.call(g.querySelectorAll('path,ellipse'), function (p) { if (p.getAttribute('data-stroke')) p.setAttribute('stroke', st === 2 ? C.deep : C.glow); else p.setAttribute('fill', col); });
          g.setAttribute('filter', st && !G.red ? 'url(#' + $.id + 'g)' : '');
          g.setAttribute('class', 'gx-r' + (st === 2 ? ' gx-sq' : st ? ' gx-on' : ''));
        });
        if ($.H[k]) { $.H[k].setAttribute('opacity', st === 2 ? 0.9 : st ? 0.7 : 0); $.H[k].setAttribute('class', 'gx-glow' + (st ? ' gx-on' : '')); }
      });
      var hs = v.filter(function (p) { return p.w === 'handheart' || p.w === 'handbelly'; })[0], ro = v.some(function (p) { return p.w === 'roots'; });
      $.hy = hs ? (hs.w === 'handbelly' ? 58 : 0) : 0; $.hand.setAttribute('opacity', hs ? 1 : 0); $.hand.style.transform = 'translate(0px,' + $.hy + 'px)';
      $.roots.setAttribute('opacity', ro ? 1 : 0); Array.prototype.forEach.call($.roots.childNodes, function (q) { q.setAttribute('stroke', C.deep); q.setAttribute('stroke-dashoffset', ro ? '0' : '80'); });
      if (hs || ro) loop(host, G);
      var words = []; v.forEach(function (p) { var nm = BODYNAME[p.w] || cap(p.w); if (p.w && p.w !== 'all' && words.indexOf(nm) < 0) words.push(nm); });
      if (v.some(function (p) { return p.r === 'all'; })) words = [G.def.all || 'Whole Body'];
      label($.L1, words, 26);
      host.setAttribute('data-on', Object.keys(on).filter(function (k) { return on[k]; }).join(' '));
      host.setAttribute('data-sq', Object.keys(on).filter(function (k) { return on[k] === 2; }).join(' '));
      host.setAttribute('data-x', (hs ? hs.w : '') + (ro ? ' roots' : ''));
    },
    // the hand rises and falls with the breath; the roots glow a little deeper on each breath out
    frame: function (host, G, now) {
      var $ = G.$, on = +$.hand.getAttribute('opacity') > 0, ro = +$.roots.getAttribute('opacity') > 0; if (!on && !ro) return false;
      var z = G.red ? 0.5 : brSize(host, G, now);
      if (on) $.hand.style.transform = 'translate(' + (0).toFixed(1) + 'px,' + ($.hy - 5 * z).toFixed(2) + 'px)';
      if (ro) $.roots.setAttribute('opacity', (0.7 + 0.3 * (1 - z)).toFixed(2));
      return !G.red;
    }
  };
  // A label of one to six names: one line when it fits, two lines (and smaller) when it is long.
  function label(t, words, size) {
    while (t.firstChild) t.removeChild(t.firstChild);
    var s = and(words);
    if (s.length <= 22 || words.length < 3) { t.textContent = s; t.setAttribute('font-size', s.length > 26 ? Math.round(size * 0.8) : size); return; }
    var h = Math.ceil(words.length / 2), a = words.slice(0, h).join(', ') + ',', b = and(words.slice(h)), x = t.getAttribute('x');
    if (words.length - h === 1) b = 'and ' + b;
    t.setAttribute('font-size', Math.round(size * 0.76));
    var t1 = el('tspan', { x: x, dy: '-0.55em' }, t); t1.textContent = a; var t2 = el('tspan', { x: x, dy: '1.1em' }, t); t2.textContent = b;
  }
  function bparse(v) {
    if (!v || v === '-') return [];
    return String(v).split('+').map(function (x) { var sq = /!$/.test(x); x = x.replace(/!$/, ''); return { w: x, r: x === 'all' ? 'all' : REGION[x] || '', sq: sq }; }).filter(function (p) { return p.r; });
  }

  /* ---------------- wave ---------------- */
  var WAVE = {
    draw: function (host, G) {
      var C = ink(G.dk), id = 'gx' + (++N), s = svgOf(host, '0 0 280 300');
      var d = glowFilter(s, id + 'g', 5);
      var lg = el('linearGradient', { id: id + 'f', x1: 0, x2: 1, y1: 0, y2: 0 }, d);
      el('stop', { offset: '0%', 'stop-color': '#8DB38A', 'stop-opacity': G.dk ? 0.5 : 0.42 }, lg); el('stop', { offset: '50%', 'stop-color': '#C9B26A', 'stop-opacity': G.dk ? 0.5 : 0.42 }, lg); el('stop', { offset: '100%', 'stop-color': '#DDA45A', 'stop-opacity': G.dk ? 0.42 : 0.34 }, lg);
      var D = 'M14 214 C70 214 92 70 140 70 C188 70 210 214 266 214';
      // a few calm lines of water under the wave
      [228, 242, 256].forEach(function (y, k) { el('path', { d: 'M' + (22 + k * 14) + ' ' + y + ' Q80 ' + (y - 6) + ' 140 ' + y + ' T' + (258 - k * 14) + ' ' + y, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-linecap': 'round', opacity: 0.9 - k * 0.22 }, s); });
      el('path', { d: D + ' Z', fill: 'url(#' + id + 'f)', stroke: 'none' }, s);
      var track = el('path', { d: D, fill: 'none', stroke: C.dim, 'stroke-width': 6, 'stroke-linecap': 'round' }, s);
      var trail = el('path', { d: D, fill: 'none', stroke: C.glow, 'stroke-width': 6, 'stroke-linecap': 'round' }, s);
      var len = track.getTotalLength(); trail.setAttribute('stroke-dasharray', len.toFixed(1) + ' ' + (len + 20).toFixed(1)); trail.setAttribute('stroke-dashoffset', len.toFixed(1));
      var halo = el('circle', { r: 17, fill: C.glow, opacity: G.red ? 0 : 0.3 }, s), dot = el('circle', { r: 10, fill: C.glow, filter: G.red ? '' : 'url(#' + id + 'g)', 'class': 'gx-dot' }, s);
      var W = G.def.w || ['Rises', 'Peaks', 'Settles'];
      var labs = [[54, 286, W[0]], [140, 48, W[1]], [226, 286, W[2]]].map(function (L) { return txt(s, L[0], L[1], L[2] || '', { 'text-anchor': 'middle', 'font-family': COND, 'font-weight': 600, 'font-size': 25, 'letter-spacing': 1.5, fill: C.soft, 'class': 'gx-lab' }); });
      G.$ = { track: track, trail: trail, len: len, dot: dot, halo: halo, labs: labs, C: C, u: 0, from: 0, to: 0, t0: 0, dur: 1, mode: '' };
      place(G, 0);
    },
    at: function (host, G, i) {
      var lv = lastIdx(G), v = i === Infinity ? (lv === 'loop' || lv === 'breath' ? lv : 'settle') : stepAt(G, i), $ = G.$;
      if (v == null) v = i < 0 ? 'start' : 'start';
      var T = { start: 0, rise: 0.4, peak: 0.5, settle: 1, ride: 1 }[v];
      $.mode = v === 'loop' || v === 'breath' ? v : '';
      if (v === 'ride' && $.u > 0.9) $.u = 0;
      if (T != null) { $.from = $.u; $.to = T; $.t0 = performance.now(); $.dur = Math.max(0.6, Math.abs(T - $.u) * (v === 'ride' ? 6.5 : 6)) * 1000; }
      if (G.red || i === Infinity) { if (T != null) { $.u = T; $.from = T; } }
      if (v === 'loop') $.t0 = performance.now();
      host.setAttribute('data-v', v);
      loop(host, G);
    },
    frame: function (host, G, now) {
      var $ = G.$, u = $.u;
      if ($.mode === 'loop') { var ph = (((now - $.t0) / 10000) % 1 + 1) % 1; u = G.red ? 0.5 : 0.5 - 0.5 * Math.cos(Math.PI * ph); }
      else if ($.mode === 'breath') {
        // the scene's own breath clock: the player's circle (or a candle's glow), read the way the ring reads it
        var cv = host.closest && host.closest('.ln-canvas'), a = cv && (cv.querySelector('.ln-brc') || cv.querySelector('.ln-cd-glow, .ln-cd-all')), an = a && a.getAnimations ? a.getAnimations()[0] : null, tm = an && an.effect ? an.effect.getTiming() : null;
        if (G.br && tm && +tm.duration > 0 && an.currentTime != null) u = breathU(G.br, ((+an.currentTime - (+tm.delay || 0)) % +tm.duration + +tm.duration) % +tm.duration / 1000);
        else {
          var ring = cv && cv.querySelector('svg.ggbr'), sz = ring && ring.querySelector('[data-ggbr-r]'), k = ring && ring.getAttribute('data-k'), z = sz ? +sz.getAttribute('data-size') || 0 : 0;
          u = k === 'in' || k === 'sip' || k === 'hold' ? 0.5 * z : 1 - 0.5 * z;
        }
      } else { var p = Math.min(1, (now - $.t0) / $.dur), e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; u = $.from + ($.to - $.from) * e; }
      $.u = u; place(G, u);
      return $.mode || Math.abs(u - $.to) > 0.001;
    }
  };
  // Where the dot rides for a breath ('in:5 out:5') t seconds into its loop: up the wave on the breath in, over and down on the out.
  function breathU(br, t) {
    var P = String(br).split(' ').map(function (x) { var a = x.split(':'); return { k: a[0], d: +a[1] }; }).filter(function (p) { return p.d > 0; }), T = 0, acc = 0;
    P.forEach(function (p) { T += p.d; }); if (!T) return 0; t = ((t % T) + T) % T;
    for (var i = 0; i < P.length; i++) { var p = P[i], f = Math.min(1, (t - acc) / p.d), e = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
      if (t < acc + p.d || i === P.length - 1) return p.k === 'in' ? 0.45 * e : p.k === 'sip' || p.k === 'hold' ? 0.45 + 0.05 * e : p.k === 'out' ? 0.5 + 0.5 * e : 1;
      acc += p.d; }
    return 0;
  }
  function place(G, u) {
    var $ = G.$, q = $.track.getPointAtLength(Math.max(0, Math.min(1, u)) * $.len);
    $.dot.setAttribute('cx', q.x.toFixed(2)); $.dot.setAttribute('cy', q.y.toFixed(2)); $.halo.setAttribute('cx', q.x.toFixed(2)); $.halo.setAttribute('cy', q.y.toFixed(2));
    $.trail.setAttribute('stroke-dashoffset', ($.len * (1 - u)).toFixed(2));
    var st = u < 0.44 ? 0 : u < 0.58 ? 1 : 2;
    $.labs.forEach(function (L, k) { L.setAttribute('fill', k === st ? $.C.ink : $.C.soft); L.setAttribute('opacity', k === st ? 1 : 0.6); L.setAttribute('font-weight', k === st ? 700 : 600); });
    var h = $.dot.ownerSVGElement && $.dot.ownerSVGElement.parentNode; if (h && h.setAttribute) h.setAttribute('data-u', u.toFixed(3));
  }

  /* ---------------- senses ---------------- */
  var ICON = {
    see: function (g, c) { el('path', { d: 'M2 18 Q20 2 38 18 Q20 34 2 18 Z', fill: 'none', stroke: c, 'stroke-width': 2.6, 'stroke-linejoin': 'round' }, g); el('circle', { cx: 20, cy: 18, r: 6, fill: 'none', stroke: c, 'stroke-width': 2.6 }, g); },
    touch: function (g, c) { el('path', { d: 'M12 34 Q6 26 6 18 L6 12 Q6 9 9 9 Q12 9 12 12 L12 6 Q12 3 15 3 Q18 3 18 6 L18 4 Q18 1 21 1 Q24 1 24 4 L24 7 Q24 4 27 4 Q30 4 30 7 L30 22 Q30 30 24 34 Z', fill: 'none', stroke: c, 'stroke-width': 2.4, 'stroke-linejoin': 'round' }, g); },
    hear: function (g, c) { el('path', { d: 'M12 12 Q12 2 22 2 Q32 2 32 13 Q32 20 25 24 Q21 27 21 32 Q21 36 16 36', fill: 'none', stroke: c, 'stroke-width': 2.6, 'stroke-linecap': 'round' }, g); el('path', { d: 'M18 13 Q18 8 22 8 Q26 8 26 13', fill: 'none', stroke: c, 'stroke-width': 2.4, 'stroke-linecap': 'round' }, g); },
    smell: function (g, c) { el('path', { d: 'M20 2 Q19 16 12 26 Q10 30 14 31 Q18 32 20 29 Q22 32 26 31 Q30 30 28 26', fill: 'none', stroke: c, 'stroke-width': 2.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g); },
    taste: function (g, c) { el('path', { d: 'M4 16 Q20 10 36 16 Q30 30 20 30 Q10 30 4 16 Z', fill: 'none', stroke: c, 'stroke-width': 2.6, 'stroke-linejoin': 'round' }, g); el('path', { d: 'M8 17 Q20 21 32 17', fill: 'none', stroke: c, 'stroke-width': 2.2, 'stroke-linecap': 'round' }, g); }
  };
  var SENSES = {
    draw: function (host, G) {
      var C = ink(G.dk), id = 'gx' + (++N), s = svgOf(host, '0 0 270 400'), rows = G.def.rows || [['see', 'See', 5], ['touch', 'Feel', 4], ['hear', 'Hear', 3], ['smell', 'Smell', 2], ['taste', 'Taste', 1]];
      glowFilter(s, id + 'g', 4);
      var R = rows.map(function (r, k) {
        var y = 14 + k * 76, g = el('g', { 'class': 'gx-row', 'data-k': k }, s);
        var bg = el('rect', { x: 2, y: y, width: 266, height: 64, rx: 18, fill: G.dk ? 'rgba(255,248,236,.1)' : '#FFFCF6', stroke: C.dim, 'stroke-width': 1.5 }, g);
        var ic = el('g', { transform: 'translate(14 ' + (y + 13) + ')' }, g); ICON[r[0]](ic, C.soft);
        var n = txt(g, 70, y + 42, String(r[2]), { 'font-family': BODY, 'font-weight': 700, 'font-size': 26, fill: C.soft });
        var w = txt(g, 92, y + 41, r[1], { 'font-family': DISP, 'font-weight': 600, 'font-size': 28, fill: C.soft, 'class': 'gx-lab' });
        var dots = []; for (var j = 0; j < r[2]; j++) dots.push(el('circle', { cx: 252 - j * 19, cy: y + 32, r: 6.5, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'class': 'gx-sd' }, g));
        dots.reverse();
        return { g: g, bg: bg, ic: ic, n: n, w: w, dots: dots };
      });
      G.$ = { R: R, C: C, id: id };
    },
    at: function (host, G, i) {
      var $ = G.$, C = $.C, v = i === Infinity ? 'done' : stepAt(G, i), cur = v == null || v === '-' ? -1 : v === 'done' ? $.R.length : +v;
      $.R.forEach(function (r, k) {
        var st = k < cur ? 'done' : k === cur ? 'on' : 'todo', col = st === 'todo' ? C.soft : st === 'on' ? C.ink : C.soft;
        r.bg.setAttribute('fill', st === 'on' ? (G.dk ? 'rgba(242,196,106,.26)' : '#F6E6C4') : G.dk ? 'rgba(255,248,236,.1)' : '#FFFCF6');
        r.bg.setAttribute('stroke', st === 'on' ? C.glow : C.dim); r.bg.setAttribute('stroke-width', st === 'on' ? 2.5 : 1.5);
        r.g.setAttribute('opacity', st === 'todo' ? 0.62 : 1);
        Array.prototype.forEach.call(r.ic.querySelectorAll('path,circle'), function (p) { p.setAttribute('stroke', st === 'on' ? C.deep : col); });
        r.n.setAttribute('fill', st === 'on' ? C.deep : col); r.w.setAttribute('fill', col);
        r.dots.forEach(function (d, j) {
          d.setAttribute('class', 'gx-sd' + (st === 'on' && !G.red ? ' gx-fill' : ''));
          d.style.animationDelay = st === 'on' ? (0.6 + j * 1.3) + 's' : '';
          d.setAttribute('fill', st === 'done' || (st === 'on' && G.red) ? C.glow : st === 'on' ? C.glow : 'none');
          d.setAttribute('stroke', st === 'todo' ? C.dim : C.glow);
          d.style.fillOpacity = st === 'on' && !G.red ? '' : st === 'done' || st === 'on' ? '1' : '';
        });
      });
      host.setAttribute('data-cur', String(cur));
    }
  };

  /* ---------------- tap ---------------- */
  var TAP = {
    draw: function (host, G) {
      var C = ink(G.dk), id = 'gx' + (++N), s = svgOf(host, '0 0 270 260');
      glowFilter(s, id + 'g', 7);
      var W = G.def.w || ['Left', 'Right'];
      var D = [[74, 'l'], [196, 'r']].map(function (q, k) {
        var g = el('g', { 'class': 'gx-tap gx-tap-' + q[1], style: 'transform-origin:' + q[0] + 'px 112px' }, s);
        el('circle', { cx: q[0], cy: 112, r: 52, fill: 'none', stroke: C.dim, 'stroke-width': 2 }, g);
        var c = el('circle', { cx: q[0], cy: 112, r: 34, fill: C.glow, filter: G.red ? '' : 'url(#' + id + 'g)', 'class': 'gx-tc' }, g);
        var t = txt(s, q[0], 212, W[k], { 'text-anchor': 'middle', 'font-family': DISP, 'font-weight': 600, 'font-size': 32, fill: C.ink, 'class': 'gx-lab' });
        return { g: g, c: c, t: t };
      });
      G.$ = { D: D, C: C };
    },
    at: function (host, G, i) {
      var $ = G.$, v = i === Infinity ? (lastNum(G) || '1.2') : stepAt(G, i), C = $.C;
      if (v == null) v = '0';
      var sec = parseFloat(v), side = v === 'L' ? 0 : v === 'R' ? 1 : -1, run = !(side >= 0) && sec > 0;
      $.D.forEach(function (d, k) {
        d.g.setAttribute('class', 'gx-tap gx-tap-' + (k ? 'r' : 'l') + (run && !G.red ? ' gx-run' : ''));
        d.g.style.animationDuration = run ? (2 * sec).toFixed(2) + 's' : ''; d.g.style.animationDelay = run && k ? (-sec).toFixed(2) + 's' : '';
        var lit = side === k || (run && G.red);
        d.c.setAttribute('opacity', side >= 0 ? (lit ? 1 : 0.22) : run ? (G.red ? 0.7 : 1) : 0.3);
        d.t.setAttribute('fill', lit || run ? C.ink : C.soft);
      });
      host.setAttribute('data-v', String(v));
    }
  };
  function lastNum(G) { var x = ''; (G.steps || []).forEach(function (s) { if (+s.v > 0) x = s.v; }); return x; }

  /* ---------------- rail ---------------- */
  var RAIL = {
    draw: function (host, G) {
      var C = ink(G.dk), id = 'gx' + (++N), L = G.def.L || ['S', 'T', 'O', 'P'], W = G.def.w || [], s = svgOf(host, '0 0 270 ' + (L.length * 92 + 8));
      glowFilter(s, id + 'g', 4);
      var R = L.map(function (ch, k) {
        var y = 50 + k * 92, g = el('g', { 'class': 'gx-rl' }, s);
        if (k) el('path', { d: 'M44 ' + (y - 58) + ' V' + (y - 34), stroke: C.dim, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
        var c = el('circle', { cx: 44, cy: y, r: 32, fill: 'none', stroke: C.dim, 'stroke-width': 2.5 }, g);
        var t = txt(g, 44, y + 13, ch, { 'text-anchor': 'middle', 'font-family': DISP, 'font-weight': 700, 'font-size': 40, fill: C.soft });
        var w = txt(g, 90, y + 9, W[k] || '', { 'font-family': DISP, 'font-weight': 600, 'font-size': 29, fill: C.ink, 'class': 'gx-lab', opacity: 0 });
        return { c: c, t: t, w: w };
      });
      G.$ = { R: R, C: C, id: id };
    },
    at: function (host, G, i) {
      var $ = G.$, C = $.C, v = i === Infinity ? lastIdx(G) : stepAt(G, i), all = v === 'all', cur = all ? $.R.length : v == null || v === '-' ? -1 : +v;
      $.R.forEach(function (r, k) {
        var st = all ? 'all' : k < cur ? 'done' : k === cur ? 'on' : 'todo';
        r.c.setAttribute('fill', st === 'on' ? C.glow : st === 'done' || st === 'all' ? (G.dk ? 'rgba(242,196,106,.3)' : '#F3DFB6') : 'none');
        r.c.setAttribute('stroke', st === 'todo' ? C.dim : C.glow);
        r.c.setAttribute('filter', st === 'on' && !G.red ? 'url(#' + $.id + 'g)' : '');
        r.t.setAttribute('fill', st === 'on' ? '#2C1810' : st === 'todo' ? C.soft : C.ink);
        r.w.setAttribute('opacity', st === 'on' ? 1 : st === 'all' ? 0.9 : 0);
        r.w.setAttribute('font-size', st === 'all' ? 24 : 29);
      });
      host.setAttribute('data-cur', String(cur));
    }
  };
  function lastIdx(G) { var x = null; (G.steps || []).forEach(function (s) { x = s.v; }); return x; }

  /* ---------------- Breath Shapes on their own clock ---------------- */
  var PH = { box: 'in:4 hold:4 out:4 rest:4', tri: 'in:4 hold:7 out:8', sigh: 'in:3 sip:1.5 out:6' };
  function ringNeed() {
    if (window.GGBreathRing || ringNeed.on) return; ringNeed.on = 1;
    try { var u = new URL('gg-breath-ring.js', SELF || location.href); u.search = '?v=c202'; var e = document.createElement('script'); e.src = u.href; e.async = true; document.head.appendChild(e); } catch (e) {}
  }
  var SHAPE = {
    draw: function (host, G) {
      ringNeed();
      var s = el('svg', { 'class': 'ggbr gx-br', viewBox: '0 0 240 290', 'aria-hidden': 'true', 'data-ph': G.def.ph || PH[G.g], 'data-shape': G.g, 'data-opt': 'c w', 'data-tone': G.dk ? 'dark' : 'light', 'data-sw': (G.def.w || []).join('|') }, host);
      if (G.steps && G.steps.length) s.setAttribute('data-at', '-1');
      G.$ = { s: s };
    },
    at: function (host, G, i) {
      if (!G.steps || !G.steps.length) return;
      var v = i === Infinity ? null : stepAt(G, i), s = G.$.s;
      if (i === Infinity) { s.removeAttribute('data-at'); return; }
      s.setAttribute('data-at', v == null || v === '-' ? '-1' : String(v));
    }
  };

  /* ---------------- BLD 990: shared pieces for the new graphics ---------------- */
  // How full the breath is (0 out, 1 in) right now: the scene's own breath clock when it has one, otherwise a slow 10 second rise and fall.
  function brSize(host, G, now) {
    try {
      var cv = host.closest && host.closest('.ln-canvas'), a = cv && (cv.querySelector('.ln-brc') || cv.querySelector('.ln-cd-glow, .ln-cd-all')), an = a && a.getAnimations ? a.getAnimations()[0] : null, tm = an && an.effect ? an.effect.getTiming() : null;
      if (G.br && tm && +tm.duration > 0 && an.currentTime != null) { var u = breathU(G.br, ((+an.currentTime - (+tm.delay || 0)) % +tm.duration + +tm.duration) % +tm.duration / 1000); return u <= 0.5 ? Math.min(1, u / 0.45) : Math.max(0, 1 - (u - 0.5) / 0.5); }
    } catch (e) {}
    return 0.5 - 0.5 * Math.cos(2 * Math.PI * ((now / 10000) % 1));
  }
  function glowF(d, id, col, sd, op) {
    var f = el('filter', { id: id, x: '-60%', y: '-60%', width: '220%', height: '220%' }, d);
    el('feGaussianBlur', { 'in': 'SourceAlpha', stdDeviation: sd || 5, result: 'b' }, f); el('feFlood', { 'flood-color': col, 'flood-opacity': op == null ? 0.8 : op, result: 'c' }, f);
    el('feComposite', { 'in': 'c', in2: 'b', operator: 'in', result: 'h' }, f); var m = el('feMerge', {}, f); el('feMergeNode', { 'in': 'h' }, m); el('feMergeNode', { 'in': 'SourceGraphic' }, m);
    return 'url(#' + id + ')';
  }
  function soft(dk) { return dk ? { seat: 'rgba(255,248,236,.22)', wood: '#D9B88A', panel: 'rgba(255,248,236,.07)' } : { seat: '#E8DAC0', wood: '#EBD3AA', panel: '#FBF5EA' }; }
  function lab(s, x, y, size, C, a) { return txt(s, x, y, '', Object.assign({ 'text-anchor': 'middle', 'font-family': DISP, 'font-weight': 600, 'font-size': size, fill: C.ink, 'class': 'gx-lab' }, a || {})); }
  function sub(s, x, y, size, C) { return txt(s, x, y, '', { 'text-anchor': 'middle', 'font-family': BODY, 'font-weight': 600, 'font-size': size, fill: C.soft, 'class': 'gx-lab2' }); }
  // a one line label, made smaller (or split in two lines) until it fits the panel's width
  function setT(t, s, size, maxW) {
    size = size || +t.getAttribute('font-size'); maxW = maxW || 252; label(t, s ? [s] : [], size);
    try { var w = t.getComputedTextLength(); if (w > maxW && s) { var f = Math.max(18, Math.floor(size * maxW / w)); t.setAttribute('font-size', f);
      if (t.getComputedTextLength() > maxW + 2) wrap2(t, s, Math.max(16, Math.round(size * 0.74))); } } catch (e) {}
  }
  function wrap2(t, s, f) {
    var w = String(s).split(' '), best = 1, gap = 1e9; for (var k = 1; k < w.length; k++) { var d = Math.abs(w.slice(0, k).join(' ').length - w.slice(k).join(' ').length); if (d < gap) { gap = d; best = k; } }
    while (t.firstChild) t.removeChild(t.firstChild); var x = t.getAttribute('x'); t.setAttribute('font-size', f);
    var a = el('tspan', { x: x, dy: '-0.55em' }, t); a.textContent = w.slice(0, best).join(' '); var b = el('tspan', { x: x, dy: '1.1em' }, t); b.textContent = w.slice(best).join(' ');
  }
  function tr(e, x, y, sc) { e.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)' + (sc != null ? ' scale(' + sc + ')' : ''); }
  function num(v, d) { var n = parseFloat(v); return isNaN(n) ? d : n; }

  /* ---------------- circle: the talking circle (a ring of dots) ----------------
     Plain seat dots around a soft center (never figures); a small talking piece moves seat to seat and each seat glows
     warm after its turn. A seat that waits stays soft, never empty. Values: a seat number, go (the piece goes around on its
     own), all (every seat warm), - (the piece rests in the middle). def.n seats (6), def.w its line under the circle. */
  var CIRCLE = {
    draw: function (host, G) {
      var C = ink(G.dk), S = soft(G.dk), id = 'gx' + (++N), s = svgOf(host, '0 0 270 400'), d = el('defs', {}, s), n = G.def.n || 6, cx = 135, cy = 170, R = 98;
      var gf = glowF(d, id + 'g', C.glow, 5, 0.85);
      el('circle', { cx: cx, cy: cy, r: R + 26, fill: S.panel, stroke: C.dim, 'stroke-width': 1.5 }, s);
      el('circle', { cx: cx, cy: cy, r: R, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '3 7', 'stroke-linecap': 'round' }, s);
      var seats = [], pos = [];
      for (var k = 0; k < n; k++) { var a = -Math.PI / 2 + 2 * Math.PI * k / n, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a); pos.push([x, y, a]);
        seats.push(el('circle', { cx: x, cy: y, r: 17, fill: S.seat, stroke: C.line, 'stroke-width': 1.6, 'class': 'gx-seat' }, s)); }
      var pc = el('g', { 'class': 'gx-piece' }, s); el('circle', { cx: 0, cy: 0, r: 16, fill: C.glow, opacity: 0.25 }, pc); el('circle', { cx: 0, cy: 0, r: 9, fill: C.glow, filter: G.red ? '' : gf }, pc);
      tr(pc, cx, cy);
      var L = lab(s, 135, 346, 27, C); setT(L, (G.def.w || [])[0] || 'Each one gets a turn', 27);
      G.$ = { seats: seats, pos: pos, pc: pc, C: C, S: S, gf: gf, n: n, cx: cx, cy: cy, mode: '', t0: 0 };
    },
    at: function (host, G, i) {
      var $ = G.$, v = i === Infinity ? (lastIdx(G) === 'go' ? 'go' : 'all') : stepAt(G, i);
      $.mode = v === 'go' && !G.red ? 'go' : '';
      if (v === 'go') { $.t0 = performance.now(); if (G.red) seatAll($, 'all'); else loop(host, G); }
      else if (v === 'all') { seatAll($, 'all'); tr($.pc, $.cx, $.cy); }
      else if (v == null || v === '-') { seatAll($, -1); tr($.pc, $.cx, $.cy); }
      else { var k = +v % $.n; seatAll($, k); var p = $.pos[k]; tr($.pc, $.cx + ($.pos[k][0] - $.cx) * 0.66, $.cy + ($.pos[k][1] - $.cy) * 0.66); }
      host.setAttribute('data-v', String(v));
    },
    frame: function (host, G, now) {
      var $ = G.$; if ($.mode !== 'go') return false;
      var per = 2600, t = (now - $.t0) / per, k = Math.floor(t) % $.n, f = t - Math.floor(t), e = Math.min(1, f / 0.45);
      e = e < 0.5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2;
      var a = $.pos[(k + $.n - 1) % $.n], b = $.pos[k], q = function (p) { return [$.cx + (p[0] - $.cx) * 0.66, $.cy + (p[1] - $.cy) * 0.66]; }, A = q(a), B = q(b);
      if (t < 1) A = [$.cx, $.cy];
      $.pc.style.transition = 'none'; tr($.pc, A[0] + (B[0] - A[0]) * e, A[1] + (B[1] - A[1]) * e);
      seatAll($, Math.floor(t) % $.n, Math.floor(t / $.n) > 0);
      return true;
    }
  };
  function seatAll($, k, round) {
    var C = $.C;
    $.seats.forEach(function (c, j) {
      var st = k === 'all' || round || (k >= 0 && j < k) ? 'done' : j === k ? 'on' : 'wait';
      c.setAttribute('fill', st === 'on' ? C.glow : st === 'done' ? C.on : $.S.seat);
      c.setAttribute('stroke', st === 'wait' ? C.line : C.glow);
      c.setAttribute('r', st === 'on' ? 20 : 17);
      c.setAttribute('filter', st === 'on' ? $.gf : '');
    });
  }

  /* ---------------- kind: widening kind wishes (rings) ----------------
     A small warm center and soft rings that widen one at a time as the wishes go out. Values: the ring reached (0 the
     center only, 1 to def.n), all. def.w the words under it for each ring (from the scene's own heading), def.calm no pulse. */
  var KIND = {
    draw: function (host, G) {
      var C = ink(G.dk), id = 'gx' + (++N), s = svgOf(host, '0 0 270 400'), d = el('defs', {}, s), n = G.def.n || 5, cx = 135, cy = 170;
      var gf = glowF(d, id + 'g', C.glow, 6, 0.8);
      var rings = []; for (var k = n; k >= 1; k--) rings[k] = el('circle', { cx: cx, cy: cy, r: 22 + k * (110 / n), fill: C.glow, 'fill-opacity': 0, stroke: C.dim, 'stroke-width': 2, 'class': 'gx-ring' }, s);
      var c0 = el('circle', { cx: cx, cy: cy, r: 15, fill: C.glow, filter: G.red ? '' : gf, 'class': 'gx-core' }, s);
      var L = lab(s, 135, 344, 26, C);
      G.$ = { rings: rings, c0: c0, L: L, C: C, n: n, gf: gf };
    },
    at: function (host, G, i) {
      var $ = G.$, C = $.C, v = i === Infinity ? lastIdx(G) || 'all' : stepAt(G, i), r = v === 'all' ? $.n : v == null || v === '-' ? -1 : Math.min($.n, +v);
      for (var k = 1; k <= $.n; k++) { var q = $.rings[k], on = k <= r;
        q.setAttribute('fill-opacity', on ? (0.26 - 0.03 * k).toFixed(2) : 0); q.setAttribute('stroke', on ? C.glow : C.dim); q.setAttribute('stroke-width', k === r ? 4 : on ? 2.4 : 1.6);
        q.setAttribute('class', 'gx-ring' + (k === r && !G.def.calm ? ' gx-on' : '')); q.setAttribute('filter', k === r && !G.red ? $.gf : ''); }
      $.c0.setAttribute('opacity', r >= 0 ? 1 : 0.55);
      var W = G.def.w || []; setT($.L, r >= 0 ? W[Math.min(r, W.length - 1)] || '' : '', 26);
      host.setAttribute('data-v', String(r));
    }
  };

  /* ---------------- rings: growth rings and the season ----------------
     A tree's cross section: a ring grows in for each value (a number of rings, add for one more), and with def.w (Planting,
     Rooting, Blooming) a season row under it lights each stop (s0, s1, s2). def.lab is its line. */
  function wobble(cx, cy, r, k) { var p = []; for (var j = 0; j <= 36; j++) { var a = j / 36 * 2 * Math.PI, rr = r * (1 + 0.035 * Math.sin(a * 3 + k) + 0.02 * Math.cos(a * 5 + k * 2)); p.push((cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a) * 0.96).toFixed(1)); } return 'M' + p.join(' L') + ' Z'; }
  var RINGS = {
    draw: function (host, G) {
      var C = ink(G.dk), id = 'gx' + (++N), s = svgOf(host, '0 0 270 400'), d = el('defs', {}, s), n = G.def.n || 7, cx = 135, cy = 150, W = G.def.w || [];
      var gf = glowF(d, id + 'g', C.glow, 4, 0.9), wood = radial(d, id + 'w', '#F3DDB4', '#D9B07A', '50%', '50%');
      el('path', { d: wobble(cx, cy, 118, 1), fill: '#7A5638' }, s);
      el('path', { d: wobble(cx, cy, 106, 1), fill: wood }, s);
      el('circle', { cx: cx, cy: cy, r: 5, fill: '#B88A58' }, s);
      var R = []; for (var k = 0; k < n; k++) { var p = el('path', { d: wobble(cx, cy, 14 + k * (88 / n), k), fill: 'none', stroke: '#A97A4A', 'stroke-width': 2.4, 'stroke-linecap': 'round', 'class': 'gx-gr' }, s); var L = p.getTotalLength ? p.getTotalLength() : 600; p.setAttribute('stroke-dasharray', L.toFixed(0) + ' ' + (L + 10).toFixed(0)); p.setAttribute('stroke-dashoffset', L.toFixed(0)); p.__L = L; R.push(p); }
      var stops = [];
      if (W.length) W.forEach(function (w, k) { var x = W.length === 1 ? 135 : 40 + k * (190 / (W.length - 1));
        if (k) el('path', { d: 'M' + (x - 190 / (W.length - 1) + 12) + ' 300 H' + (x - 12), stroke: C.dim, 'stroke-width': 2.4, 'stroke-linecap': 'round' }, s);
        stops.push({ c: el('circle', { cx: x, cy: 300, r: 9, fill: 'none', stroke: C.dim, 'stroke-width': 2.4 }, s), t: txt(s, x, 334, w, { 'text-anchor': 'middle', 'font-family': BODY, 'font-weight': 600, 'font-size': 19, fill: C.soft }) }); });
      var L1 = lab(s, 135, W.length ? 384 : 330, 26, C); setT(L1, G.def.lab || '', 26);
      G.$ = { R: R, stops: stops, C: C, n: n, gf: gf, cnt: 0 };
    },
    at: function (host, G, i) {
      var $ = G.$, C = $.C, cnt = G.def.start || 0, stop = -1;
      var walk = i === Infinity ? (G.steps || []) : (G.steps || []).filter(function (s) { return s.b <= i; });
      walk.forEach(function (s) { var v = s.v; if (v === 'add') cnt++; else if (/^s\d$/.test(v)) { stop = +v.slice(1); cnt = Math.max(cnt, (G.def.start || 0) + stop + 1); } else if (v === 'all') { cnt = $.n; stop = $.stops.length - 1; } else if (/^\d+$/.test(v)) cnt = +v; });
      if (i === Infinity && !walk.length) cnt = $.n;
      cnt = Math.min($.n, cnt);
      $.R.forEach(function (p, k) { var on = k < cnt, nw = k === cnt - 1;
        p.setAttribute('stroke-dashoffset', on ? 0 : p.__L.toFixed(0)); p.setAttribute('stroke', nw ? C.deep : '#A97A4A'); p.setAttribute('stroke-width', nw ? 3.6 : 2.4); p.setAttribute('filter', nw && !G.red ? $.gf : ''); });
      $.stops.forEach(function (q, k) { var st = k < stop ? 'done' : k === stop ? 'on' : 'todo';
        q.c.setAttribute('fill', st === 'todo' ? 'none' : C.glow); q.c.setAttribute('stroke', st === 'todo' ? C.dim : C.glow); q.c.setAttribute('r', st === 'on' ? 12 : 9); q.c.setAttribute('filter', st === 'on' && !G.red ? $.gf : '');
        q.t.setAttribute('fill', st === 'on' ? C.ink : C.soft); });
      host.setAttribute('data-v', cnt + (stop >= 0 ? ' s' + stop : ''));
    }
  };

  /* ---------------- support: the circle of support (a ring of dots) ----------------
     You in the middle, and a plain dot appears for each person named (never figures, names, or family shapes). Values: the
     number of dots shown, all. def.n dots (5), def.c the middle word (You), def.lab the line under it. */
  var SUPPORT = {
    draw: function (host, G) {
      var C = ink(G.dk), S = soft(G.dk), id = 'gx' + (++N), s = svgOf(host, '0 0 270 400'), d = el('defs', {}, s), n = G.def.n || 5, cx = 135, cy = 168;
      var gf = glowF(d, id + 'g', C.glow, 5, 0.8);
      [66, 112].forEach(function (r) { el('circle', { cx: cx, cy: cy, r: r, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round' }, s); });
      el('circle', { cx: cx, cy: cy, r: 34, fill: C.glow, opacity: 0.22 }, s);
      el('circle', { cx: cx, cy: cy, r: 26, fill: C.glow, filter: G.red ? '' : gf }, s);
      txt(s, cx, cy + 7, G.def.c || 'You', { 'text-anchor': 'middle', 'font-family': DISP, 'font-weight': 700, 'font-size': 21, fill: '#2C1810' });
      var D = []; for (var k = 0; k < n; k++) { var inner = k < 3 || n <= 4, r = inner ? 66 : 112, m = inner ? Math.min(n, 3) : n - 3, j = inner ? k : k - 3, a = -Math.PI / 2 + (inner ? 0.4 : 0.9) + 2 * Math.PI * j / Math.max(1, m);
        var g = el('g', { 'class': 'gx-pop' }, s); el('circle', { cx: cx + r * Math.cos(a), cy: cy + r * Math.sin(a), r: 14, fill: C.on, stroke: C.glow, 'stroke-width': 2 }, g); D.push(g); }
      var L = lab(s, 135, 340, 27, C); setT(L, G.def.lab || '', 27);
      G.$ = { D: D, n: n };
    },
    at: function (host, G, i) {
      var $ = G.$, v = i === Infinity ? lastIdx(G) || 'all' : stepAt(G, i), c = v === 'all' ? $.n : v == null || v === '-' ? 0 : Math.min($.n, +v);
      $.D.forEach(function (g, k) { g.setAttribute('class', 'gx-pop' + (k < c ? ' gx-in' : '')); });
      host.setAttribute('data-v', String(c));
    }
  };

  /* ---------------- day: the day arc (a path) ----------------
     A gentle arc from morning to night with a stop lighting for each step of the rhythm; a small sun moves to the stop.
     def.stops the stop words (from the script), def.span am (sunrise to midday), pm (afternoon to night), or full.
     Values: a stop number, all. */
  var DAY = {
    draw: function (host, G) {
      var C = ink(G.dk), id = 'gx' + (++N), s = svgOf(host, '0 0 270 400'), d = el('defs', {}, s), sp = G.def.span || 'full', ST = G.def.stops || [];
      var gf = glowF(d, id + 'g', '#F2C46A', 5, 0.85);
      var D = sp === 'am' ? 'M22 236 C50 120 140 84 248 82' : sp === 'pm' ? 'M22 82 C130 84 220 120 248 236' : 'M22 236 C40 60 230 60 248 236';
      var sky = linear(d, id + 'k', [['0%', sp === 'pm' ? '#F6D9A6' : '#F7D9B0', G.dk ? 0.14 : 0.5], ['100%', sp === 'am' ? '#F6E3B4' : G.dk ? '#E9D2B0' : '#C9CCD8', G.dk ? 0.1 : 0.5]]);
      el('path', { d: 'M10 240 H260', stroke: C.line, 'stroke-width': 2, 'stroke-linecap': 'round' }, s);
      var track = el('path', { d: D, fill: 'none', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '2 7', 'stroke-linecap': 'round' }, s), len = track.getTotalLength();
      // the two ends: the sun rising, the sun high, or the moon
      function sun(x, y, r, half) { var g = el('g', {}, s); for (var j = 0; j < 8; j++) { var a = j * Math.PI / 4; if (half && Math.sin(a) > 0.1) continue; el('path', { d: 'M' + (x + Math.cos(a) * (r + 5)).toFixed(1) + ' ' + (y + Math.sin(a) * (r + 5)).toFixed(1) + ' L' + (x + Math.cos(a) * (r + 11)).toFixed(1) + ' ' + (y + Math.sin(a) * (r + 11)).toFixed(1), stroke: '#E0A43A', 'stroke-width': 2.4, 'stroke-linecap': 'round' }, g); }
        el(half ? 'path' : 'circle', half ? { d: 'M' + (x - r) + ' ' + y + ' A' + r + ' ' + r + ' 0 0 1 ' + (x + r) + ' ' + y + ' Z', fill: '#F2C14E' } : { cx: x, cy: y, r: r, fill: '#F2C14E' }, g); }
      function moon(x, y) { el('path', { d: 'M' + (x + 4) + ' ' + (y - 15) + ' A15 15 0 1 0 ' + (x + 6) + ' ' + (y + 14) + ' A11 11 0 1 1 ' + (x + 4) + ' ' + (y - 15) + ' Z', fill: G.dk ? '#E9E1CC' : '#B7B3A4' }, s); }
      if (sp === 'am') { sun(28, 238, 14, true); sun(240, 60, 12); } else if (sp === 'pm') { sun(28, 62, 12); moon(244, 210); } else { sun(28, 238, 14, true); moon(244, 210); }
      var P = ST.map(function (w, k) { var q = track.getPointAtLength(len * (ST.length === 1 ? 0.5 : 0.2 + 0.6 * k / (ST.length - 1))); return { x: q.x, y: q.y, c: el('circle', { cx: q.x, cy: q.y, r: 9, fill: G.dk ? '#3A2C20' : '#FFFCF6', stroke: C.line, 'stroke-width': 2.2 }, s) }; });
      var trav = el('g', { 'class': 'gx-trav' }, s); el('circle', { cx: 0, cy: 0, r: 13, fill: '#F2C14E', filter: G.red ? '' : gf }, trav); trav.setAttribute('opacity', 0);
      var L = lab(s, 135, 300, 32, C), L2 = sub(s, 135, 334, 18, C);
      G.$ = { P: P, trav: trav, L: L, L2: L2, C: C, ST: ST, gf: gf };
    },
    at: function (host, G, i) {
      var $ = G.$, C = $.C, v = i === Infinity ? lastIdx(G) || 'all' : stepAt(G, i), all = v === 'all', k = all ? $.ST.length - 1 : v == null || v === '-' ? -1 : +v;
      $.P.forEach(function (p, j) { var st = all || j < k ? 'done' : j === k ? 'on' : 'todo';
        p.c.setAttribute('fill', st === 'todo' ? (G.dk ? '#3A2C20' : '#FFFCF6') : st === 'on' ? '#F2C14E' : C.on); p.c.setAttribute('stroke', st === 'todo' ? C.line : C.glow); p.c.setAttribute('r', st === 'on' ? 11 : 9); });
      if (k >= 0 && !all) { $.trav.setAttribute('opacity', 1); tr($.trav, $.P[k].x, $.P[k].y); } else $.trav.setAttribute('opacity', 0);
      if (all) { setT($.L, G.def.lab || '', 30); $.L2.textContent = ''; }
      else { setT($.L, k >= 0 ? $.ST[k] : '', 32); $.L2.textContent = k >= 0 && $.ST.length > 1 ? (k + 1) + ' of ' + $.ST.length : ''; }
      host.setAttribute('data-v', String(v));
    }
  };

  /* ---------------- bridge: the repair bridge (a path) ----------------
     Two banks with a gap; a plank lays down for each repair step, and the bridge joins. No figures on either bank. Values: the
     plank laid (0, 1, 2), all (joined), set (the last plank set gently aside: some things are set down). def.w the step words. */
  var BRIDGE = {
    draw: function (host, G) {
      var C = ink(G.dk), id = 'gx' + (++N), s = svgOf(host, '0 0 270 400'), d = el('defs', {}, s), W = G.def.w || ['Name it', 'Own it', 'Make it right'], n = W.length;
      var gf = glowF(d, id + 'g', C.glow, 4, 0.85), earth = linear(d, id + 'e', [['0%', '#A98260'], ['100%', '#7A5A40']], 0, 1);
      [228, 244, 260].forEach(function (y, k) { el('path', { d: 'M' + (74 + k * 6) + ' ' + y + ' q12 -5 24 0 t24 0 t24 0 t24 0', fill: 'none', stroke: G.dk ? 'rgba(160,200,214,.6)' : '#9CC3CF', 'stroke-width': 2.2, 'stroke-linecap': 'round', opacity: 1 - k * 0.25 }, s); });
      el('path', { d: 'M0 168 H64 Q72 168 74 178 L84 290 H0 Z', fill: earth }, s); el('path', { d: 'M270 168 H206 Q198 168 196 178 L186 290 H270 Z', fill: earth }, s);
      el('path', { d: 'M0 166 H66 M204 166 H270', stroke: '#7FA05A', 'stroke-width': 7, 'stroke-linecap': 'round' }, s);
      var gap0 = 66, gap1 = 204, w = (gap1 - gap0) / n, PL = [];
      for (var k = 0; k < n; k++) { var g = el('g', { 'class': 'gx-plank' }, s); el('rect', { x: gap0 + k * w + 1.5, y: 158, width: w - 3, height: 12, rx: 3, fill: '#C69A64', stroke: '#8A6238', 'stroke-width': 1.5 }, g); PL.push(g); }
      var rail = el('path', { d: 'M66 150 Q135 128 204 150', fill: 'none', stroke: C.glow, 'stroke-width': 3, 'stroke-linecap': 'round', opacity: 0 }, s);
      var L = lab(s, 135, 330, 30, C), L2 = sub(s, 135, 362, 18, C);
      G.$ = { PL: PL, rail: rail, L: L, L2: L2, W: W, n: n, gf: gf, w: w };
    },
    at: function (host, G, i) {
      var $ = G.$, v = i === Infinity ? (lastIdx(G) === 'set' ? 'set' : 'all') : stepAt(G, i), all = v === 'all', set = v === 'set', k = all || set ? $.n - 1 : v == null || v === '-' ? -1 : +v;
      $.PL.forEach(function (g, j) { var on = j <= k, lift = set && j === $.n - 1;
        g.setAttribute('class', 'gx-plank' + (on ? ' gx-in' : ''));
        g.style.transform = lift ? 'translate(' + (214 - 66 - j * $.w) + 'px,-4px) rotate(-8deg)' : on ? 'none' : 'translate(0,-46px)';
        g.setAttribute('filter', (j === k && !all && !set) || (all && !G.red) ? $.gf : ''); });
      $.rail.setAttribute('opacity', all ? 1 : 0);
      if (all) { label($.L, $.W, 24); $.L2.textContent = ''; } else if (set) { setT($.L, G.def.setw || $.W[$.n - 1] || 'Set down gently', 28); $.L2.textContent = ''; }
      else { setT($.L, k >= 0 ? $.W[k] : '', 30); $.L2.textContent = ''; }
      host.setAttribute('data-v', String(v));
    }
  };

  /* ---------------- talk: the conversation turn ----------------
     Two plain speech shapes facing each other (no faces, ages, or genders); a breath dot rests in the space between, and the
     reply fills with the script's own words. Values: a (the first speaks), pause (one breath), b (the reply), all.
     def.p the pause words (One breath), def.r the reply words, def.lab a line under it. */
  var TALK = {
    draw: function (host, G) {
      var C = ink(G.dk), S = soft(G.dk), id = 'gx' + (++N), s = svgOf(host, '0 0 270 400'), d = el('defs', {}, s);
      var gf = glowF(d, id + 'g', C.glow, 5, 0.85);
      var A = el('path', { d: 'M28 40 H210 Q232 40 232 62 V122 Q232 144 210 144 H70 L40 170 L46 144 H28 Q8 144 8 122 V62 Q8 40 28 40 Z', fill: S.panel, stroke: C.line, 'stroke-width': 2.2, 'stroke-linejoin': 'round' }, s);
      var lines = el('g', {}, s); [[36, 76, 150], [36, 98, 170], [36, 120, 110]].forEach(function (q) { el('path', { d: 'M' + q[0] + ' ' + q[1] + ' H' + (q[0] + q[2]), stroke: C.dim, 'stroke-width': 7, 'stroke-linecap': 'round' }, lines); });
      var B = el('path', { d: 'M60 236 H242 Q262 236 262 258 V318 Q262 340 242 340 H224 L230 366 L200 340 H60 Q38 340 38 318 V258 Q38 236 60 236 Z', fill: S.panel, stroke: C.line, 'stroke-width': 2.2, 'stroke-linejoin': 'round' }, s);
      var R = txt(s, 150, 296, '', { 'text-anchor': 'middle', 'font-family': DISP, 'font-weight': 600, 'font-size': 26, fill: C.ink, 'class': 'gx-lab' });
      var dot = el('g', { 'class': 'gx-breath' }, s); el('circle', { cx: 96, cy: 194, r: 18, fill: C.glow, opacity: 0.25 }, dot); el('circle', { cx: 96, cy: 194, r: 10, fill: C.glow, filter: G.red ? '' : gf }, dot);
      var P = txt(s, 124, 201, G.def.p || 'One breath', { 'font-family': DISP, 'font-weight': 600, 'font-size': 24, fill: C.soft, 'class': 'gx-lab' });
      var L = lab(s, 135, 396, 20, C, { 'font-family': BODY, 'font-size': 18, fill: C.soft });
      G.$ = { A: A, B: B, lines: lines, R: R, dot: dot, P: P, L: L, C: C, S: S };
    },
    at: function (host, G, i) {
      var $ = G.$, C = $.C, v = i === Infinity ? lastIdx(G) || 'all' : stepAt(G, i), o = { a: 1, pause: 2, b: 3, all: 3 }[v] || 0;
      $.A.setAttribute('fill', o >= 1 ? (G.dk ? 'rgba(242,196,106,.24)' : '#F6E6C4') : $.S.panel); $.A.setAttribute('stroke', o === 1 ? C.glow : C.line);
      $.lines.setAttribute('opacity', o >= 1 ? 1 : 0.5);
      $.dot.setAttribute('class', 'gx-breath' + (o === 2 && !G.red ? ' gx-on' : '')); $.dot.setAttribute('opacity', o >= 2 ? 1 : 0.35);
      $.P.setAttribute('fill', o === 2 ? C.ink : C.soft);
      $.B.setAttribute('fill', o >= 3 ? (G.dk ? 'rgba(242,196,106,.24)' : '#F6E6C4') : $.S.panel); $.B.setAttribute('stroke', o === 3 ? C.glow : C.line);
      setT($.R, o >= 3 ? G.def.r || '' : '', 26, 196); $.L.textContent = G.def.lab || '';
      host.setAttribute('data-v', String(v));
    }
  };

  /* ---------------- fill: the water glass, the battery, and the Name It dial (a fill level) ----------------
     cup     a plain water glass (never a stemmed glass, can, or bottle) that fills a step at a time: values 0 to 100.
     battery a phone style battery, honey when low and sage when full (never red): values 0 to 100.
     dial    a soft sound wave and a dial: busy (big and quick), name (the word lands, it calms), calm, or 0 to 100.
     def.lab the line under it (Refill, Recharge); for the dial def.w [the word for name, the word for calm]. */
  var FILL = {
    draw: function (host, G) {
      var C = ink(G.dk), S = soft(G.dk), id = 'gx' + (++N), s = svgOf(host, '0 0 270 400'), d = el('defs', {}, s), g = G.g, $ = { C: C, g: g, lv: num(G.def.start, g === 'dial' ? 100 : 20) / 100, to: 0, t0: 0, ph: 0 };
      $.to = $.lv;
      if (g === 'cup') {
        var gl = 'M70 56 L84 298 Q86 314 102 314 H168 Q184 314 186 298 L200 56 Z';
        var cp = el('clipPath', { id: id + 'c' }, d); el('path', { d: 'M74 58 L87 296 Q89 308 102 308 H168 Q181 308 183 296 L196 58 Z' }, cp);
        el('path', { d: gl, fill: G.dk ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.65)' }, s);
        $.w = el('path', { d: '', fill: linear(d, id + 'q', [['0%', '#A8D4E2', 0.85], ['100%', '#6FAFC6', 0.9]], 0, 1), 'clip-path': 'url(#' + id + 'c)' }, s);
        el('path', { d: gl, fill: 'none', stroke: G.dk ? 'rgba(255,248,236,.75)' : '#8FA8B0', 'stroke-width': 3, 'stroke-linejoin': 'round' }, s);
        el('path', { d: 'M88 80 L98 280', stroke: '#FFFFFF', 'stroke-width': 5, 'stroke-linecap': 'round', opacity: 0.45 }, s);
        $.top = 58; $.bot = 308; $.x0 = 74; $.x1 = 196;
      } else if (g === 'battery') {
        el('rect', { x: 112, y: 46, width: 46, height: 18, rx: 6, fill: C.line }, s);
        el('rect', { x: 82, y: 62, width: 106, height: 252, rx: 22, fill: S.panel, stroke: C.line, 'stroke-width': 3.5 }, s);
        var cb = el('clipPath', { id: id + 'c' }, d); el('rect', { x: 92, y: 72, width: 86, height: 232, rx: 14 }, cb);
        $.w = el('rect', { x: 92, y: 304, width: 86, height: 0, fill: '#E3B35C', 'clip-path': 'url(#' + id + 'c)' }, s);
        for (var j = 1; j < 5; j++) el('path', { d: 'M92 ' + (72 + j * 46.4).toFixed(1) + ' H178', stroke: G.dk ? 'rgba(20,13,7,.35)' : 'rgba(255,252,246,.85)', 'stroke-width': 3 }, s);
        $.top = 72; $.bot = 304;
      } else {
        el('rect', { x: 14, y: 66, width: 242, height: 136, rx: 26, fill: S.panel, stroke: C.dim, 'stroke-width': 1.5 }, s);
        $.ws = [0, 1, 2].map(function (k) { return el('path', { d: '', fill: 'none', stroke: k ? C.glow : C.deep, 'stroke-width': k ? 2 : 3.5, 'stroke-linecap': 'round', opacity: k ? 0.5 : 1 }, s); });
        el('path', { d: 'M55 290 A80 80 0 0 1 215 290', fill: 'none', stroke: C.dim, 'stroke-width': 10, 'stroke-linecap': 'round' }, s);
        $.arc = el('path', { d: 'M55 290 A80 80 0 0 1 215 290', fill: 'none', stroke: C.glow, 'stroke-width': 10, 'stroke-linecap': 'round' }, s);
        $.al = $.arc.getTotalLength(); $.arc.setAttribute('stroke-dasharray', $.al.toFixed(1) + ' ' + ($.al + 10).toFixed(1));
        $.ndl = el('path', { d: 'M135 290 L135 226', stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' }, s); el('circle', { cx: 135, cy: 290, r: 8, fill: C.ink }, s);
        $.word = lab(s, 135, 50, 36, C);
      }
      $.L = lab(s, 135, g === 'dial' ? 346 : 362, 30, C); setT($.L, G.def.lab || (g === 'cup' ? 'Refill' : g === 'battery' ? 'Recharge' : ''), 30);
      G.$ = $; FILL.paint(host, G, $.lv, performance.now());
    },
    at: function (host, G, i) {
      var $ = G.$, v = i === Infinity ? lastIdx(G) : stepAt(G, i), W = G.def.w || [];
      var lv = v == null || v === '-' ? num(G.def.start, $.g === 'dial' ? 100 : 20) : v === 'busy' ? 100 : v === 'name' ? 45 : v === 'calm' ? 16 : v === 'full' ? 94 : num(v, 20);
      $.from = $.lv; $.to = lv / 100; $.t0 = performance.now();
      if (G.red) { $.lv = $.to; $.from = $.to; }
      if ($.g === 'dial') { setT($.word, v === 'name' || v === 'calm' ? W[0] || '' : '', 36); setT($.L, v === 'calm' ? W[1] || 'Settles' : v === 'name' ? G.def.lab || 'Name it' : G.def.lab || '', 30); }
      host.setAttribute('data-v', String(v)); loop(host, G);
    },
    frame: function (host, G, now) {
      var $ = G.$, p = Math.min(1, (now - $.t0) / 1800), e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      $.lv = $.from == null ? $.to : $.from + ($.to - $.from) * e;
      FILL.paint(host, G, $.lv, now);
      host.setAttribute('data-lv', $.lv.toFixed(2));
      return !G.red && ($.g !== 'battery' || p < 1);
    },
    paint: function (host, G, lv, now) {
      var $ = G.$, t = G.red ? 0 : now / 1000;
      if ($.g === 'cup') {
        var y = $.bot - lv * ($.bot - $.top - 14), a = G.red ? 0 : 3, pts = 'M' + ($.x0 - 4) + ' ' + y.toFixed(1);
        for (var x = $.x0; x <= $.x1 + 4; x += 8) pts += ' L' + x + ' ' + (y + a * Math.sin(x / 18 + t * 2)).toFixed(1);
        $.w.setAttribute('d', pts + ' L' + ($.x1 + 4) + ' ' + ($.bot + 4) + ' L' + ($.x0 - 4) + ' ' + ($.bot + 4) + ' Z');
      } else if ($.g === 'battery') {
        var h = lv * ($.bot - $.top); $.w.setAttribute('y', ($.bot - h).toFixed(1)); $.w.setAttribute('height', h.toFixed(1));
        $.w.setAttribute('fill', lv > 0.6 ? '#8DB36A' : lv > 0.35 ? '#C2B55C' : '#E3B35C');
      } else {
        var A = 6 + lv * 46, f = 0.035 + lv * 0.05;
        $.ws.forEach(function (w, k) { var dd = ''; for (var x = 30; x <= 240; x += 3) { var env = Math.sin(Math.PI * (x - 30) / 210), yy = 134 + env * A * Math.sin(x * f * (1 + k * 0.17) + t * (1.5 + lv * 5) + k) * (k ? 0.7 : 1) + (lv > 0.6 ? env * lv * 6 * Math.sin(x * 0.31 + t * 9) : 0); dd += (dd ? ' L' : 'M') + x + ' ' + yy.toFixed(1); } w.setAttribute('d', dd); });
        $.arc.setAttribute('stroke-dashoffset', ($.al * (1 - lv)).toFixed(1));
        var ang = Math.PI * (1 - lv); $.ndl.setAttribute('d', 'M135 290 L' + (135 + Math.cos(ang) * 62).toFixed(1) + ' ' + (290 - Math.sin(ang) * 62).toFixed(1));
      }
    }
  };

  /* ---------------- weather: Maple's weather icons ----------------
     Sunny, partly cloudy, rainy, and stormy, drawn simply and with the same weight (rain is welcome, a stormy cloud is just a
     deeper gray, no lightning). Values: sun, part, rain, storm, pass (a storm cloud drifts away and the sun returns), all
     (the four together). def.w names [sun, part, rain, storm], def.rain the rain line, def.pass the line for pass. */
  function cloud(g, x, y, s, fill, stroke) { el('path', { d: 'M' + (x - 50 * s) + ' ' + (y + 22 * s) + ' a' + (22 * s) + ' ' + (22 * s) + ' 0 0 1 ' + (8 * s) + ' ' + (-40 * s) + ' a' + (30 * s) + ' ' + (30 * s) + ' 0 0 1 ' + (52 * s) + ' ' + (-14 * s) + ' a' + (24 * s) + ' ' + (24 * s) + ' 0 0 1 ' + (40 * s) + ' ' + (22 * s) + ' a' + (17 * s) + ' ' + (17 * s) + ' 0 0 1 ' + (0 * s) + ' ' + (32 * s) + ' Z', fill: fill, stroke: stroke || 'none', 'stroke-width': 2 }, g); }
  function sunI(g, x, y, s) { for (var j = 0; j < 10; j++) { var a = j * Math.PI / 5; el('path', { d: 'M' + (x + Math.cos(a) * 40 * s).toFixed(1) + ' ' + (y + Math.sin(a) * 40 * s).toFixed(1) + ' L' + (x + Math.cos(a) * 54 * s).toFixed(1) + ' ' + (y + Math.sin(a) * 54 * s).toFixed(1), stroke: '#E8A93A', 'stroke-width': 5 * s, 'stroke-linecap': 'round' }, g); } el('circle', { cx: x, cy: y, r: 32 * s, fill: '#F4C64E' }, g); }
  function rainI(g, x, y, s, heavy) { for (var j = 0; j < (heavy ? 6 : 4); j++) { var xx = x - 34 * s + j * (heavy ? 14 : 22) * s; el('path', { d: 'M' + xx.toFixed(1) + ' ' + (y + 34 * s).toFixed(1) + ' l' + (-5 * s).toFixed(1) + ' ' + (18 * s).toFixed(1), stroke: '#6FA7D0', 'stroke-width': 4.5 * s, 'stroke-linecap': 'round', 'class': 'gx-drop', style: 'animation-delay:' + (j * 0.23) + 's' }, g); } }
  function wIcon(g, k, x, y, s, dk) {
    var lc = dk ? '#F1EDE4' : '#FFFFFF', st = dk ? 'none' : '#C9CED6';
    if (k === 'sun') sunI(g, x, y, s);
    else if (k === 'part') { sunI(g, x - 18 * s, y - 18 * s, s * 0.8); cloud(g, x + 6 * s, y + 6 * s, s * 0.95, lc, st); }
    else if (k === 'rain') { cloud(g, x, y - 8 * s, s, dk ? '#C9D2DC' : '#DCE3EA', dk ? 'none' : '#B3BECA'); rainI(g, x, y - 4 * s, s); }
    else { cloud(g, x, y - 8 * s, s, dk ? '#8E97A3' : '#9AA4B1', 'none'); rainI(g, x, y - 4 * s, s, true); }
  }
  var WEATHER = {
    draw: function (host, G) {
      var C = ink(G.dk), s = svgOf(host, '0 0 270 400'), W = G.def.w || ['Sunny', 'Partly Cloudy', 'Rainy', 'Stormy'];
      var big = el('g', {}, s), L = lab(s, 135, 318, 34, C), L2 = sub(s, 135, 352, 19, C);
      G.$ = { big: big, L: L, L2: L2, W: W, C: C, s: s, cur: '' };
    },
    at: function (host, G, i) {
      var $ = G.$, v = i === Infinity ? lastIdx(G) || 'all' : stepAt(G, i); if (v == null || v === '-') v = '';
      if (v === $.cur) return; $.cur = v;
      var g = $.big; while (g.firstChild) g.removeChild(g.firstChild);
      var K = ['sun', 'part', 'rain', 'storm'], q = el('g', { 'class': 'gx-fade' }, g);
      if (v === 'all') { var KK = G.def.k || K; KK.forEach(function (k, n) { var j = K.indexOf(k), x = KK.length === 3 && n === 2 ? 135 : n % 2 ? 196 : 74, y = n < 2 ? 92 : 236; wIcon(q, k, x, y, 0.62, G.dk); txt(q, x, y + 66, $.W[j], { 'text-anchor': 'middle', 'font-family': BODY, 'font-weight': 600, 'font-size': 19, fill: $.C.ink }); }); setT($.L, '', 30); $.L2.textContent = ''; }
      else if (v === 'pass') {
        sunI(q, 135, 150, 1.05); var cl = el('g', { 'class': 'gx-pass' + (G.red ? ' gx-done' : '') }, q); cloud(cl, 135, 160, 1.15, G.dk ? '#8E97A3' : '#9AA4B1'); rainI(cl, 135, 164, 1.15, true);
        setT($.L, G.def.pass || 'The sun returns', 32); $.L2.textContent = G.def.pass2 || 'The tree keeps growing';
      } else if (v) { var j = K.indexOf(v); wIcon(q, v, 135, 150, 1.25, G.dk); setT($.L, $.W[j] || '', 34); $.L2.textContent = v === 'rain' ? G.def.rain || 'Rain helps trees grow' : v === 'storm' ? G.def.storm || 'Storms pass' : ''; }
      else { setT($.L, '', 30); $.L2.textContent = ''; }
      host.setAttribute('data-v', v);
    }
  };

  /* ---------------- branch: good things on a branch ----------------
     A branch where a small fruit appears for each good thing named; Rose and Thorn puts a bloom for the best part and a
     soft leaf bud for the hardest (no sharp or hurt images). Values: the number of fruit, rose, thorn, both. def.n fruit (3),
     def.w [rose word, thorn word], def.lab the line under it. The branch counts the fruit, never grades them. */
  var BRANCH = {
    draw: function (host, G) {
      var C = ink(G.dk), id = 'gx' + (++N), s = svgOf(host, '0 0 270 400'), d = el('defs', {}, s), n = G.def.n || 3;
      var gf = glowF(d, id + 'g', C.glow, 4, 0.7), fr = radial(d, id + 'f', '#F7C76A', '#D9822E');
      var bp = el('path', { d: 'M4 262 C70 250 120 214 160 170 C190 138 222 118 266 110', fill: 'none', stroke: '#7A5638', 'stroke-width': 10, 'stroke-linecap': 'round' }, s);
      el('path', { d: 'M120 214 C126 236 140 248 150 252', fill: 'none', stroke: '#7A5638', 'stroke-width': 5, 'stroke-linecap': 'round' }, s);
      el('path', { d: 'M196 136 C200 112 214 98 226 92', fill: 'none', stroke: '#7A5638', 'stroke-width': 4.5, 'stroke-linecap': 'round' }, s);
      [[40, 252, -30], [96, 230, 20], [176, 150, -40], [240, 112, 30], [150, 252, 60], [226, 92, -20]].forEach(function (q) { el('ellipse', { cx: q[0], cy: q[1] - 12, rx: 8, ry: 17, fill: '#7FA05A', transform: 'rotate(' + q[2] + ' ' + q[0] + ' ' + q[1] + ')', opacity: 0.9 }, s); });
      var len = bp.getTotalLength(), F = [];
      for (var k = 0; k < n; k++) { var q = bp.getPointAtLength(len * (0.22 + 0.62 * k / Math.max(1, n - 1))), g = el('g', { 'class': 'gx-pop', style: 'transform-origin:' + q.x.toFixed(1) + 'px ' + (q.y + 14).toFixed(1) + 'px' }, s);
        el('path', { d: 'M' + q.x.toFixed(1) + ' ' + (q.y + 2).toFixed(1) + ' v8', stroke: '#7A5638', 'stroke-width': 3 }, g);
        el('circle', { cx: q.x, cy: q.y + 22, r: 14, fill: fr, filter: G.red ? '' : gf }, g); el('circle', { cx: q.x - 4, cy: q.y + 17, r: 4, fill: '#FFF1CC', opacity: 0.7 }, g); F.push(g); }
      // rose and thorn: a bloom and a soft leaf bud
      var q1 = bp.getPointAtLength(len * 0.35), q2 = bp.getPointAtLength(len * 0.78), W = G.def.w || ['Rose', 'Thorn'];
      var rose = el('g', { 'class': 'gx-pop' }, s);
      for (var j = 0; j < 5; j++) { var a = j * 2 * Math.PI / 5 - Math.PI / 2; el('circle', { cx: q1.x + Math.cos(a) * 12, cy: q1.y - 18 + Math.sin(a) * 12, r: 11, fill: '#E9958A' }, rose); }
      el('circle', { cx: q1.x, cy: q1.y - 18, r: 8, fill: '#F6C66A' }, rose);
      txt(rose, q1.x, q1.y + 40, W[0], { 'text-anchor': 'middle', 'font-family': DISP, 'font-weight': 600, 'font-size': 26, fill: C.ink });
      var th = el('g', { 'class': 'gx-pop' }, s);
      el('path', { d: 'M' + q2.x + ' ' + (q2.y + 4) + ' c-12 10 -12 30 0 40 c12 -10 12 -30 0 -40 Z', fill: '#9DBE78', stroke: '#6E8F4C', 'stroke-width': 1.5 }, th);
      txt(th, q2.x + 26, q2.y + 74, W[1], { 'text-anchor': 'middle', 'font-family': DISP, 'font-weight': 600, 'font-size': 26, fill: C.ink });
      var L = lab(s, 135, 340, 28, C); setT(L, G.def.lab || '', 28);
      G.$ = { F: F, rose: rose, th: th, n: n };
    },
    at: function (host, G, i) {
      var $ = G.$, v = i === Infinity ? lastIdx(G) || String($.n) : stepAt(G, i); if (v === 'all') v = String($.n);
      var c = /^\d+$/.test(v || '') ? +v : 0, ro = v === 'rose' || v === 'both', tn = v === 'thorn' || v === 'both';
      if (v === 'thorn') ro = (G.steps || []).some(function (s) { return s.v === 'rose' && (i === Infinity || s.b <= i); });
      $.F.forEach(function (g, k) { g.setAttribute('class', 'gx-pop' + (k < c ? ' gx-in' : '')); });
      $.rose.setAttribute('class', 'gx-pop' + (ro ? ' gx-in' : '')); $.th.setAttribute('class', 'gx-pop' + (tn ? ' gx-in' : ''));
      host.setAttribute('data-v', String(v));
    }
  };

  /* ---------------- BLD 992 Video Graphics Round 3: five drawings on their own clock ----------------
     Each one keeps the states its sentences have reached (a value is one state, or several joined by +), and each state
     moves in from the moment its sentence starts; several new at once follow each other a moment apart. Under the drawing,
     def.w gives the line for each step of the token in order ([line, smaller line]). A def names its drawing with x (forest,
     hope, pulse, note, stones) on top of a plain panel kind, so the player needs no new name for it. Stepping by hand shows
     each state landed; reduced motion lands each state at once and holds still. */
  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function ease(u) { u = clamp01(u); return u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2; }
  var TSTATES = { forest: ['roots', 'threads', 'share', 'shelter', 'grow'], hope: ['goal', 'path', 'path2', 'walk'], pulse: ['beat', 'slow', 'calm'],
    note: ['write', 'step', 'close'], stones: ['s1', 'h1', 's2', 'h2', 's3', 'h3'] };
  function timed(x, make) {
    return {
      draw: function (host, G) {
        var C = ink(G.dk), s = svgOf(host, '0 0 270 400');
        var L = lab(s, 135, 340, 30, C), L2 = sub(s, 135, 372, 18, C);
        G.$ = { C: C, on: {}, t0: performance.now(), L: L, L2: L2, lw: null };
        G.$.fn = make(s, C, G.dk, G);
        host.setAttribute('data-x', x);
      },
      at: function (host, G, i) {
        var $ = G.$, now = performance.now(), on = {}, order = [], k = -1, ALL = TSTATES[x];
        (G.steps || []).forEach(function (s, j) {
          if (i !== Infinity && s.b > i) return; k = j;
          String(s.v).split('+').forEach(function (v) { (v === 'all' ? ALL : [v]).forEach(function (w) { if (ALL.indexOf(w) >= 0 && !on[w]) { on[w] = 1; order.push(w); } }); });
        });
        var fresh = 0, land = i === Infinity || G.red;
        order.forEach(function (v) { if ($.on[v] == null) $.on[v] = land ? -1e9 : now + 1400 * (fresh++); });
        Object.keys($.on).forEach(function (v) { if (!on[v]) delete $.on[v]; });
        var W = (G.def.w || [])[k] || ['', ''];
        if ($.lw !== W) { $.lw = W; setT($.L, W[0] || '', 30, 246); setT($.L2, W[1] || '', 18, 250); }
        host.setAttribute('data-v', order.join(' ') || '-');
        if (G.red) paintT(G, now); else loop(host, G);
      },
      frame: function (host, G, now) { paintT(G, now); return true; }
    };
  }
  function paintT(G, now) {
    var $ = G.$;
    $.fn((now - $.t0) / 1000, function (v) { var a = $.on[v]; return a == null || now < a ? -1 : (now - a) / 1000; });
  }

  // forest: three trees above a soil line; roots reach, fine threads link them, drops of water travel from the big tree to
  // the little one (share), soft wind lines pass over (shelter), and the little tree grows (grow). No symbols.
  var FOREST = timed('forest', function (s, C, dk, G) {
    var RED = G.red, d = el('defs', {}, s), id = 'gx' + (++N), gf = glowF(d, id + 'g', C.glow, 3, 0.8);
    var lf = radial(d, id + 'a', '#A9C97F', '#56743F'), lf2 = radial(d, id + 'b', '#C3DD98', '#6E8F50'), bk = radial(d, id + 'c', '#A07650', '#6A4A2E');
    el('rect', { x: 6, y: 212, width: 258, height: 96, rx: 18, fill: dk ? 'rgba(150,108,66,.26)' : '#E6D6BB' }, s);
    el('path', { d: 'M6 213 Q135 205 264 213', stroke: C.line, 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round' }, s);
    var T = [{ x: 62, h: 104, r: 44, w: 16 }, { x: 150, h: 82, r: 34, w: 12 }, { x: 224, h: 50, r: 22, w: 8 }], RC = dk ? '#D8B48C' : '#8A6238', roots = [];
    T.forEach(function (q) {
      var f = q.r / 44, x = q.x, b = 212;
      [['M' + x + ' ' + b + ' C' + (x - 8 * f) + ' ' + (b + 18 * f) + ' ' + (x - 26 * f) + ' ' + (b + 26 * f) + ' ' + (x - 46 * f) + ' ' + (b + 40 * f), 3.6],
       ['M' + x + ' ' + b + ' C' + (x + 2) + ' ' + (b + 26 * f) + ' ' + (x - 4) + ' ' + (b + 44 * f) + ' ' + x + ' ' + (b + 58 * f), 4],
       ['M' + x + ' ' + b + ' C' + (x + 8 * f) + ' ' + (b + 18 * f) + ' ' + (x + 26 * f) + ' ' + (b + 26 * f) + ' ' + (x + 46 * f) + ' ' + (b + 40 * f), 3.6]].forEach(function (a) {
        roots.push(el('path', { d: a[0], stroke: RC, 'stroke-width': a[1] * Math.max(0.6, f), 'stroke-linecap': 'round', fill: 'none' }, s)); });
    });
    var TH = ['M62 270 Q106 288 150 257', 'M150 257 Q188 264 224 241', 'M108 252 Q113 250 114 243', 'M185 243 Q193 241 201 236', 'M16 252 Q40 280 62 270', 'M247 236 Q258 248 262 262', 'M84 262 Q92 276 104 280', 'M196 252 Q200 262 210 262'];
    var th = el('g', {}, s), threads = TH.map(function (p) { return el('path', { d: p, stroke: C.glow, 'stroke-width': 1.6, fill: 'none', 'stroke-linecap': 'round' }, th); });
    [roots, threads].forEach(function (A) { A.forEach(function (p) { var L = p.getTotalLength ? p.getTotalLength() : 80; p.__L = L; p.setAttribute('stroke-dasharray', L.toFixed(1) + ' ' + (L + 10).toFixed(1)); p.setAttribute('stroke-dashoffset', L.toFixed(1)); }); });
    var trees = T.map(function (q, k) {
      var g = el('g', {}, s), x = q.x, b = 212, top = b - q.h + q.r * 0.4, w = q.w;
      el('path', { d: 'M' + (x - w / 2) + ' ' + b + ' Q' + (x - w * 0.3) + ' ' + (b - q.h * 0.5) + ' ' + (x - w * 0.16) + ' ' + top + ' L' + (x + w * 0.16) + ' ' + top + ' Q' + (x + w * 0.3) + ' ' + (b - q.h * 0.5) + ' ' + (x + w / 2) + ' ' + b + ' Z', fill: bk }, g);
      var cy = b - q.h, r = q.r, can = el('g', {}, g);
      [[0, 0, 1], [-0.62, 0.28, 0.66], [0.62, 0.28, 0.66], [0, -0.42, 0.7]].forEach(function (c) { el('circle', { cx: x + c[0] * r, cy: cy + c[1] * r, r: c[2] * r, fill: k === 2 ? lf2 : lf }, can); });
      el('circle', { cx: x - 0.28 * r, cy: cy - 0.32 * r, r: 0.34 * r, fill: '#FFFFFF', opacity: 0.13 }, can);
      return { g: g, hi: el('circle', { cx: x, cy: cy, r: r * 1.15, fill: C.glow, opacity: 0 }, g) };
    });
    var wind = [0, 1, 2].map(function (k) { return el('path', { d: 'M4 ' + (128 - k * 12) + ' C20 ' + (118 - k * 12) + ' 24 ' + (62 - k * 12) + ' 70 ' + (46 - k * 12) + ' C120 ' + (30 - k * 12) + ' 200 ' + (36 - k * 12) + ' 264 ' + (70 - k * 10), stroke: C.line, 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '22 12', opacity: 0 }, s); });
    var WP = el('path', { d: 'M62 214 C64 242 58 256 62 270 Q106 288 150 257 Q188 264 224 241 C226 232 224 222 224 214', fill: 'none', stroke: 'none' }, s), WL = WP.getTotalLength ? WP.getTotalLength() : 300;
    var drops = [0, 1, 2, 3].map(function () { return el('circle', { r: 3.8, fill: '#7FB8DE', stroke: dk ? 'rgba(255,255,255,.7)' : '#FFFFFF', 'stroke-width': 1.2, opacity: 0 }, s); });
    return function (t, since) {
      var r = since('roots'); roots.forEach(function (p) { p.setAttribute('stroke-dashoffset', (p.__L * (1 - (r < 0 ? 0 : ease(r / 2)))).toFixed(1)); });
      var h = since('threads'); threads.forEach(function (p, i) { p.setAttribute('stroke-dashoffset', (p.__L * (1 - (h < 0 ? 0 : ease((h - i * 0.15) / 1.8)))).toFixed(1)); });
      var sh = since('share'), on = sh >= 0 ? ease(sh / 1.2) : 0;
      th.setAttribute('filter', sh >= 0 && !RED ? gf : '');
      drops.forEach(function (c, i) {
        var u = RED ? (i + 0.5) / 4 : ((t * 0.14 + i / 4) % 1), q = WP.getPointAtLength(u * WL), fade = Math.min(1, u * 8, (1 - u) * 8);
        c.setAttribute('cx', q.x.toFixed(1)); c.setAttribute('cy', q.y.toFixed(1)); c.setAttribute('opacity', (on * fade).toFixed(2));
      });
      trees[2].hi.setAttribute('opacity', (on * 0.2).toFixed(2));
      var w = since('shelter'), wo = w >= 0 ? ease(w / 1.2) : 0;
      wind.forEach(function (p, k) { p.setAttribute('opacity', (wo * (0.75 - k * 0.18)).toFixed(2)); p.setAttribute('stroke-dashoffset', RED ? 0 : (-t * 40 - k * 9).toFixed(1)); });
      var gr = since('grow'), gs = 1 + 0.24 * (gr >= 0 ? ease(gr / 3) : 0);
      trees[2].g.setAttribute('transform', 'translate(224 212) scale(' + gs.toFixed(3) + ') translate(-224 -212)');
    };
  });

  // hope: a flag on a rise is the goal, a path draws toward it (def.two: a second path), and a warm dot walks the path.
  var HOPE = timed('hope', function (s, C, dk, G) {
    var RED = G.red, two = !!G.def.two, d = el('defs', {}, s), id = 'gx' + (++N), gf = glowF(d, id + 'g', C.glow, 5, 0.85);
    el('path', { d: 'M0 300 L0 270 C60 264 96 238 130 198 C160 162 186 114 214 106 C236 100 256 112 270 120 L270 300 Z', fill: dk ? 'rgba(255,248,236,.08)' : '#E7DCC6' }, s);
    var P = ['M40 280 C120 276 70 222 128 206 C184 190 156 138 214 106', 'M40 280 C150 286 236 236 232 176 C230 140 204 130 214 106'], tracks = [], trails = [];
    P.forEach(function (p, k) {
      if (k && !two) return;
      tracks.push(el('path', { d: p, fill: 'none', stroke: C.dim, 'stroke-width': 3.5, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round', opacity: 0 }, s));
      var q = el('path', { d: p, fill: 'none', stroke: C.glow, 'stroke-width': 4, 'stroke-linecap': 'round' }, s), L = q.getTotalLength ? q.getTotalLength() : 260;
      q.__L = L; q.setAttribute('stroke-dasharray', L.toFixed(1) + ' ' + (L + 10).toFixed(1)); q.setAttribute('stroke-dashoffset', L.toFixed(1)); trails.push(q);
    });
    el('circle', { cx: 40, cy: 280, r: 8, fill: soft(dk).panel, stroke: C.line, 'stroke-width': 2 }, s);
    var halo = el('circle', { cx: 214, cy: 106, r: 24, fill: C.glow, opacity: 0 }, s), flag = el('g', {}, s);
    el('path', { d: 'M214 106 V52', stroke: C.line, 'stroke-width': 3, 'stroke-linecap': 'round' }, flag);
    var pen = el('path', { fill: C.glow }, flag);
    el('ellipse', { cx: 214, cy: 107, rx: 10, ry: 3, fill: C.line, opacity: 0.6 }, flag);
    var wk = el('g', { opacity: 0 }, s); el('circle', { r: 16, fill: C.glow, opacity: 0.3 }, wk); el('circle', { r: 9, fill: C.glow, filter: RED ? '' : gf }, wk);
    return function (t, since) {
      var g = since('goal'), gu = g < 0 ? 0 : ease(g / 1.2);
      flag.setAttribute('transform', 'translate(214 106) scale(1 ' + Math.max(0.001, gu).toFixed(3) + ') translate(-214 -106)');
      var w = RED ? 0 : 3 * Math.sin(t * 2.4);
      pen.setAttribute('d', 'M214 54 Q230 ' + (55 + w).toFixed(1) + ' 248 ' + (63 + w * 0.5).toFixed(1) + ' Q230 ' + (70 - w * 0.5).toFixed(1) + ' 214 78 Z');
      var pa = [since('path'), since('path2')], wv = since('walk');
      trails.forEach(function (q, k) { var v = pa[k], u = v < 0 ? 0 : ease(v / 2); q.setAttribute('stroke-dashoffset', (q.__L * (1 - u)).toFixed(1)); q.setAttribute('opacity', wv >= 0 && k ? 0.45 : 1); tracks[k].setAttribute('opacity', g >= 0 || v >= 0 ? 1 : 0); });
      var wu = wv < 0 ? 0 : ease(wv / 4.2), pt = trails[0].getPointAtLength(trails[0].__L * wu);
      wk.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1) + ')'); wk.setAttribute('opacity', g >= 0 || wv >= 0 || pa[0] >= 0 ? 1 : 0);
      halo.setAttribute('opacity', (wu >= 1 ? 0.28 : g >= 0 ? 0.1 * gu : 0).toFixed(2));
    };
  });

  // pulse: a soft honey line with gentle rounded beats that spread farther apart as it settles, and a small heart beating
  // along. No numbers, no grid, no red. beat (a steady beat), slow (the beats ease apart over def.T seconds), calm (slow and
  // steady). def.I0 and def.I1 are the seconds between beats at the start and once settled.
  var PULSE = timed('pulse', function (s, C, dk, G) {
    var RED = G.red, D = { I0: num(G.def.I0, 0.62), I1: num(G.def.I1, 1.25), T: num(G.def.T, 10) }, d = el('defs', {}, s), id = 'gx' + (++N), gf = glowF(d, id + 'g', C.glow, 4, 0.8);
    var lg = el('linearGradient', { id: id + 'l', gradientUnits: 'userSpaceOnUse', x1: 34, y1: 0, x2: 236, y2: 0 }, d);
    el('stop', { offset: '0%', 'stop-color': C.glow, 'stop-opacity': 0 }, lg); el('stop', { offset: '45%', 'stop-color': C.glow, 'stop-opacity': 0.85 }, lg); el('stop', { offset: '100%', 'stop-color': C.glow, 'stop-opacity': 1 }, lg);
    el('rect', { x: 14, y: 66, width: 242, height: 150, rx: 26, fill: soft(dk).panel, stroke: C.dim, 'stroke-width': 1.5 }, s);
    el('path', { d: 'M34 172 H236', stroke: C.dim, 'stroke-width': 1.5, 'stroke-linecap': 'round' }, s);
    var line = el('path', { fill: 'none', stroke: 'url(#' + id + 'l)', 'stroke-width': 3.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, s);
    var head = el('circle', { r: 6, cx: 236, cy: 172, fill: C.glow, filter: RED ? '' : gf }, s), hg = el('g', {}, s);
    el('path', { d: 'M0 14 C-20 2 -26 -14 -14 -21 C-6 -25 0 -18 0 -13 C0 -18 6 -25 14 -21 C26 -14 20 2 0 14 Z', fill: C.on, stroke: C.glow, 'stroke-width': 2, 'stroke-linejoin': 'round' }, hg);
    function bump(ds) { return Math.exp(-Math.pow((ds - 0.15) / 0.1, 2)) + 0.5 * Math.exp(-Math.pow((ds - 0.42) / 0.11, 2)); }
    return function (t, since) {
      var sl = since('slow'), ca = since('calm'), t0 = sl >= 0 ? t - sl : ca >= 0 ? -1e9 : 1e9, I0 = ca >= 0 && sl < 0 ? D.I1 : D.I0, I1 = D.I1, T = D.T;
      function I(x) { return I0 + (I1 - I0) * clamp01((x - t0) / T); }
      function phi(x) {
        if (x <= t0) return x / I0;
        var k = (I1 - I0) / T, xx = Math.min(x, t0 + T), p = t0 / I0 + (k ? Math.log(I(xx) / I0) / k : (xx - t0) / I0);
        return x > t0 + T ? p + (x - t0 - T) / I1 : p;
      }
      function yAt(x) { var f = phi(x), fr = ((f % 1) + 1) % 1; return 172 - 46 * bump(fr * I(x)); }
      var now = RED ? t0 + T + 2.3 : t, dd = '';
      if (RED && t0 > 1e8) now = 2.3;
      for (var x = 34; x <= 236; x += 2) dd += (dd ? ' L' : 'M') + x + ' ' + yAt(now - (236 - x) / 202 * 2.8).toFixed(1);
      line.setAttribute('d', dd); head.setAttribute('cy', yAt(now).toFixed(1));
      var f = phi(now), b = RED ? 0 : bump((((f % 1) + 1) % 1) * I(now));
      hg.setAttribute('transform', 'translate(135 266) scale(' + (1.5 * (1 + 0.08 * b)).toFixed(3) + ')');
    };
  });

  // note: an open notebook; blank marks appear for what is spinning (write, never words), one gold mark glows as the
  // step for tomorrow (step), and the cover closes and rests (close).
  var NOTE = timed('note', function (s, C, dk, G) {
    var RED = G.red, d = el('defs', {}, s), id = 'gx' + (++N), gf = glowF(d, id + 'g', C.glow, 3, 0.9);
    var paper = dk ? '#F6EEDF' : '#FFFCF6', edge = dk ? 'rgba(255,248,236,.75)' : '#A8957C', rule = '#EADFCB', mark = '#B09C82', gold = '#E3A83E';
    var book = el('g', {}, s);
    el('ellipse', { cx: 135, cy: 248, rx: 118, ry: 8, fill: '#000', opacity: dk ? 0.25 : 0.08 }, book);
    function page(g, x) { el('rect', { x: x, y: 70, width: 113, height: 170, rx: 8, fill: paper, stroke: edge, 'stroke-width': 2 }, g); for (var y = 100; y <= 220; y += 26) el('path', { d: 'M' + (x + 10) + ' ' + (y + 8) + ' H' + (x + 103), stroke: rule, 'stroke-width': 1.2 }, g); }
    var left = el('g', {}, book); page(left, 22);
    var W = [72, 58, 80, 50], marks = W.map(function (w, i) { return el('rect', { x: 34, y: 100 + i * 26, width: 0, height: 7, rx: 3.5, fill: mark }, left); });
    var flap = el('g', {}, book), front = el('g', {}, flap); page(front, 135);
    var steps = [[0, 58], [2, 44]].map(function (q) { var g = el('g', { opacity: 0 }, front); el('circle', { cx: 150, cy: 103.5 + q[0] * 26, r: 4.5, fill: gold }, g); el('rect', { x: 160, y: 100 + q[0] * 26, width: q[1], height: 7, rx: 3.5, fill: gold }, g); return g; });
    var cover = el('g', { opacity: 0 }, flap);
    el('rect', { x: 135, y: 68, width: 115, height: 174, rx: 9, fill: '#7A5638', stroke: dk ? 'rgba(255,248,236,.5)' : '#5E4128', 'stroke-width': 2 }, cover);
    el('rect', { x: 145, y: 80, width: 95, height: 150, rx: 6, fill: 'none', stroke: '#A07650', 'stroke-width': 1.5 }, cover);
    var ribbon = el('path', { d: 'M226 240 V266 L231 260 L236 266 V240 Z', fill: C.glow, opacity: 0 }, flap);
    el('path', { d: 'M135 72 V238', stroke: edge, 'stroke-width': 1.5, opacity: 0.6 }, book);
    return function (t, since) {
      var w = since('write'); marks.forEach(function (m, i) { var u = w < 0 ? 0 : RED ? 1 : ease((w - i * 0.7) / 0.6); m.setAttribute('width', (W[i] * u).toFixed(1)); });
      var sp = since('step'); steps.forEach(function (g, i) { var u = sp < 0 ? 0 : RED ? 1 : ease((sp - i * 0.8) / 0.6); g.setAttribute('opacity', u.toFixed(2)); g.setAttribute('filter', u > 0.9 && i === 0 && !RED ? gf : ''); });
      var c = since('close'), cu = c < 0 ? 0 : RED ? 1 : ease(c / 1.6), sx = Math.cos(Math.PI * cu);
      flap.setAttribute('transform', 'translate(135 0) scale(' + (Math.abs(sx) < 0.01 ? 0.01 : sx).toFixed(3) + ' 1) translate(-135 0)');
      front.setAttribute('opacity', sx >= 0 ? 1 : 0); cover.setAttribute('opacity', sx < 0 ? 1 : 0); ribbon.setAttribute('opacity', sx < 0 ? 1 : 0);
      var mv = c < 0 ? 0 : RED ? 1 : ease((c - 1.7) / 1.1);
      book.setAttribute('transform', 'translate(' + (56.5 * mv).toFixed(1) + ' 0)');
    };
  });

  // stones: three stones across a stream; sN lights a stone, hN brings the warm dot onto it in a small hop.
  var STONES = timed('stones', function (s, C, dk, G) {
    var RED = G.red, d = el('defs', {}, s), id = 'gx' + (++N), gf = glowF(d, id + 'g', C.glow, 5, 0.85);
    var bank = dk ? '#8DB36A' : '#8DAE68', water = dk ? 'rgba(127,184,222,.26)' : '#CFE2E8', rip = dk ? 'rgba(170,210,226,.6)' : '#9CC3CF', rest = dk ? '#CFC4B4' : '#BDB2A3', rim = dk ? 'rgba(255,248,236,.5)' : '#9A8E7E';
    var cp = el('clipPath', { id: id + 'c' }, d); el('rect', { x: 8, y: 70, width: 254, height: 232, rx: 26 }, cp);
    var inner = el('g', { 'clip-path': 'url(#' + id + 'c)' }, s);
    el('rect', { x: 0, y: 112, width: 270, height: 160, fill: water }, inner);
    var rips = [150, 196, 240].map(function (y, k) { var p = el('path', { fill: 'none', stroke: rip, 'stroke-width': 2, 'stroke-linecap': 'round', opacity: 0.9 - k * 0.2 }, inner); p.__y = y; return p; });
    el('path', { d: 'M0 60 L270 60 V122 Q135 112 0 124 Z', fill: bank, opacity: 0.9 }, inner);
    el('path', { d: 'M0 262 Q135 254 270 262 V300 H0 Z', fill: bank, opacity: 0.9 }, inner);
    var SP = [[76, 232], [135, 196], [194, 160]], ST = SP.map(function (p) {
      el('ellipse', { cx: p[0] + 2, cy: p[1] + 6, rx: 30, ry: 11, fill: '#000', opacity: dk ? 0.25 : 0.12 }, inner);
      var e = el('ellipse', { cx: p[0], cy: p[1], rx: 30, ry: 13, fill: rest, stroke: rim, 'stroke-width': 1.5 }, inner);
      el('ellipse', { cx: p[0] - 6, cy: p[1] - 4, rx: 14, ry: 4, fill: '#FFFFFF', opacity: 0.28 }, inner);
      return e;
    });
    var ring = el('ellipse', { fill: 'none', stroke: C.line, 'stroke-width': 2, opacity: 0 }, inner);
    el('rect', { x: 8, y: 70, width: 254, height: 232, rx: 26, fill: 'none', stroke: C.dim, 'stroke-width': 1.5 }, s);
    var wk = el('g', {}, s); el('circle', { r: 15, fill: C.glow, opacity: 0.3 }, wk); el('circle', { r: 8.5, fill: C.glow, filter: RED ? '' : gf }, wk);
    return function (t, since) {
      rips.forEach(function (p, k) { var o = RED ? 0 : (t * 14 + k * 20) % 48, dd = 'M' + (-48 + o).toFixed(1) + ' ' + p.__y; for (var x = -48 + o; x < 280; x += 24) dd += ' q6 -4 12 0 t12 0'; p.setAttribute('d', dd); });
      ST.forEach(function (e, k) { var on = since('s' + (k + 1)) >= 0 || since('h' + (k + 1)) >= 0; e.setAttribute('fill', on ? C.on : rest); e.setAttribute('stroke', on ? C.glow : rim); e.setAttribute('stroke-width', on ? 2.6 : 1.5); e.setAttribute('filter', on && !RED ? gf : ''); });
      var at = [44, 280], land = -1, cur = -1;
      for (var k = 0; k < 3; k++) { var h = since('h' + (k + 1)); if (h < 0) break; cur = k; var from = k ? [SP[k - 1][0], SP[k - 1][1] - 6] : [44, 280], to = [SP[k][0], SP[k][1] - 6], u = RED ? 1 : ease(h / 0.9); at = [from[0] + (to[0] - from[0]) * u, from[1] + (to[1] - from[1]) * u - Math.sin(Math.PI * u) * 34]; land = h - 0.9; }
      wk.setAttribute('transform', 'translate(' + at[0].toFixed(1) + ' ' + at[1].toFixed(1) + ')');
      if (land >= 0 && !RED && land < 1.4) { var r = land / 1.4; ring.setAttribute('cx', SP[cur][0]); ring.setAttribute('cy', SP[cur][1] + 2); ring.setAttribute('rx', 30 + 26 * r); ring.setAttribute('ry', 13 + 10 * r); ring.setAttribute('opacity', (0.7 * (1 - r)).toFixed(2)); } else ring.setAttribute('opacity', 0);
    };
  });

  /* BLD 992: weather icons in place of the dots. A def with wx (on any graphic but the weather icons themselves) gives the
     scene's points a small sun, a sun with a cloud, or a soft rain cloud beside each line whose first word is Sunny, Partly
     cloudy, or Rainy. The words stay live text; a line with any other word keeps its dot. Rain is soft and blue. */
  var WXW = { sunny: 'sun', 'partly cloudy': 'part', rainy: 'rain' };
  function wxIcon(kind, dk) {
    var s = el('svg', { viewBox: '0 0 120 120', 'class': 'gx-wx', 'aria-hidden': 'true', focusable: 'false' });
    if (kind === 'sun') { var r = el('g', { 'class': 'gx-sunr' }, s); sunI(r, 60, 60, 0.95); }
    else if (kind === 'part') { sunI(el('g', {}, s), 44, 44, 0.72); cloud(el('g', { 'class': 'gx-drift' }, s), 66, 68, 0.78, '#FFFFFF', dk ? 'none' : '#C9CED6'); }
    else { for (var j = 0; j < 4; j++) el('path', { d: 'M' + (34 + j * 17) + ' 82 l-4 14', stroke: '#6FA7D0', 'stroke-width': 5, 'stroke-linecap': 'round', 'class': 'gx-drop', style: 'animation-delay:' + (j * 0.3) + 's' }, s); cloud(el('g', { 'class': 'gx-drift' }, s), 60, 50, 0.85, dk ? '#D6DEE6' : '#DCE3EA', dk ? 'none' : '#B3BECA'); }
    return s;
  }
  function wxDots(host, G) {
    var cv = host.parentNode; if (!cv || !cv.querySelectorAll) return;
    Array.prototype.forEach.call(cv.querySelectorAll('.ln-pt'), function (it) {
      var b = it.querySelector('b'), dot = it.querySelector('.ln-dot'), k = b && WXW[String(b.textContent || '').trim().toLowerCase()];
      if (!k || !dot || dot.querySelector('svg')) return;
      dot.className = 'ln-dot gx-wxd'; dot.setAttribute('data-wx', k); dot.style.background = 'none'; dot.appendChild(wxIcon(k, G.dk));
    });
  }

  /* BLD 992: a def's own place (def.box: {l or r, t, w, h} in the scene's 960 by 540 frame) moves the panel off a person
     in the painting, into open sky, wall, or field; the drawing scales to fit. */
  function placeBox(host, G) {
    var b = G.def && G.def.box; if (!b) return;
    var st = host.style; st.top = b.t + 'px'; st.width = b.w + 'px'; st.height = b.h + 'px';
    if (b.l != null) { st.left = b.l + 'px'; st.right = 'auto'; } else { st.right = (b.r || 0) + 'px'; st.left = 'auto'; }
    if (b.w < 240) st.padding = '10px 8px';
    host.setAttribute('data-box', '1');
    // the words come first: the panel ends a little above any line of the scene's words under it (the phone's words are larger)
    try {
      var cv = host.parentNode, cr = cv.getBoundingClientRect(), k = cr.width / 960; if (!k) return;
      var x0 = b.l != null ? b.l : 960 - (b.r || 0) - b.w, x1 = x0 + b.w, top = 540;
      Array.prototype.forEach.call(cv.querySelectorAll('h2,h3,h4,p,small,b,label'), function (e) {
        if (host.contains(e)) return; var q = e.getBoundingClientRect(); if (!q.width || !q.height) return;
        var a = (q.left - cr.left) / k, z = (q.right - cr.left) / k, y = (q.top - cr.top) / k;
        if (z > x0 && a < x1 && y > b.t) top = Math.min(top, y - 26);
      });
      if (top < b.t + b.h) st.height = Math.max(120, Math.round(top - b.t)) + 'px';
    } catch (e) {}
  }

  var KINDS = { tree: TREE, body: BODY, wave: WAVE, senses: SENSES, tap: TAP, rail: RAIL, box: SHAPE, tri: SHAPE, sigh: SHAPE,
    circle: CIRCLE, kind: KIND, rings: RINGS, support: SUPPORT, day: DAY, bridge: BRIDGE, talk: TALK, cup: FILL, battery: FILL, dial: FILL, weather: WEATHER, branch: BRANCH,
    forest: FOREST, hope: HOPE, pulse: PULSE, note: NOTE, stones: STONES };
  // BLD 992: a def's x names its drawing (one of the Round 3 drawings) on top of the panel kind the player knows (def.g).
  function kindOf(G) { return G && ((G.def && G.def.x && KINDS[G.def.x]) || KINDS[G.g]); }

  // One animation loop for the graphics that move by code (the wave); everything else moves with CSS.
  var LIVE = [];
  function loop(host, G) { if (LIVE.indexOf(host) < 0) LIVE.push(host); if (!loop.raf) loop.raf = requestAnimationFrame(tick); }
  function tick(now) {
    loop.raf = 0;
    LIVE = LIVE.filter(function (h) { if (!h.isConnected || !h.__gfx || !h.__gfx.$) return false; var K = kindOf(h.__gfx); try { return K.frame ? K.frame(h, h.__gfx, now) : false; } catch (e) { return false; } });
    if (LIVE.length) loop.raf = requestAnimationFrame(tick);
  }

  function css() {
    if (document.getElementById('gx-css')) return;
    var st = document.createElement('style'); st.id = 'gx-css';
    st.textContent = [
      '.ln-gfx .gx-svg{display:block;width:100%;height:100%;overflow:visible;}',
      '.ln-gfx .gx-part,.ln-gfx .gx-r,.ln-gfx .gx-row,.ln-gfx rect,.ln-gfx circle{transition:fill .6s ease,stroke .6s ease,opacity .6s ease;}',
      '.ln-gfx .gx-part.gx-on{animation:gxPulse 3.2s ease-in-out infinite;}',
      '.ln-gfx .gx-glow{transition:opacity .8s ease;}.ln-gfx .gx-glow.gx-on{animation:gxPulse 3.6s ease-in-out infinite;}',
      '.ln-gfx .gx-r.gx-sq{transform-box:fill-box;transform-origin:center;animation:gxSq 1.6s ease-in-out infinite;}',
      '.ln-gfx .gx-sd.gx-fill{fill-opacity:0;animation:gxDot .5s ease forwards;}',
      '.ln-gfx .gx-tap.gx-run{animation:gxTap 2.4s ease-in-out infinite;}',
      '.ln-gfx .gx-piece,.ln-gfx .gx-trav{transition:transform 1.1s ease;}.ln-gfx .gx-plank{transition:transform 1s ease,opacity .6s ease;opacity:0;transform-box:fill-box;transform-origin:center;}.ln-gfx .gx-plank.gx-in{opacity:1;}',
      '.ln-gfx .gx-pop{transform-box:fill-box;transform-origin:center;transform:scale(.2);opacity:0;transition:transform .8s cubic-bezier(.3,1.4,.5,1),opacity .6s ease;}.ln-gfx .gx-pop.gx-in{transform:none;opacity:1;}',
      '.ln-gfx .gx-ring.gx-on{animation:gxPulse 3.4s ease-in-out infinite;}.ln-gfx .gx-breath{transform-box:fill-box;transform-origin:center;}.ln-gfx .gx-breath.gx-on{animation:gxBr 8s ease-in-out infinite;}',
      '.ln-gfx .gx-gr{transition:stroke-dashoffset 1.6s ease,stroke .6s ease;}.ln-gfx .gx-root{transition:stroke-dashoffset 2.4s ease;}',
      '.ln-gfx .gx-fade{animation:gxFade .8s ease both;}.ln-gfx .gx-drop{animation:gxDrop 1.4s ease-in infinite;}.ln-gfx .gx-pass{animation:gxPass 6s ease 1s forwards;}.ln-gfx .gx-pass.gx-done{animation:none;opacity:0;}',
      '@keyframes gxBr{0%,100%{transform:scale(.8)}45%{transform:scale(1.25)}}',
      '@keyframes gxFade{from{opacity:0}to{opacity:1}}',
      '@keyframes gxDrop{0%{transform:translateY(-4px);opacity:0}30%{opacity:1}100%{transform:translateY(10px);opacity:0}}',
      '@keyframes gxPass{to{transform:translateX(170px);opacity:0}}',
      '@keyframes gxPulse{0%,100%{opacity:1}50%{opacity:.78}}',
      '@keyframes gxSq{0%,100%{transform:scale(1)}50%{transform:scale(.95)}}',
      '@keyframes gxDot{to{fill-opacity:1}}',
      '@keyframes gxTap{0%,100%{transform:scale(1.1);opacity:1}50%{transform:scale(.86);opacity:.3}}',
      '.ln-dot.gx-wxd{width:40px;height:40px;margin:-2px -4px 0 -8px;background:none !important;box-shadow:none !important;border-radius:0;}.gx-wx{display:block;width:100%;height:100%;overflow:visible;}',
      '.gx-wx .gx-sunr{transform-box:fill-box;transform-origin:center;animation:gxSpin 28s linear infinite;}.gx-wx .gx-drift{animation:gxDrift 6s ease-in-out infinite alternate;}.gx-wx .gx-drop{animation:gxDrop2 1.5s ease-in infinite;}',
      '@keyframes gxSpin{to{transform:rotate(360deg)}}@keyframes gxDrift{from{transform:translateX(-3px)}to{transform:translateX(3px)}}@keyframes gxDrop2{0%{transform:translateY(-3px);opacity:0}25%{opacity:1}100%{transform:translateY(9px);opacity:0}}',
      '@media (prefers-reduced-motion:reduce){.ln-gfx *,.gx-wx *{animation:none !important;transition:none !important;}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function draw(host) {
    var G = host && host.__gfx, K = kindOf(G); if (!K || G.$) return;
    css(); G.red = reduced();
    try { placeBox(host, G); if (G.def && G.def.wx && G.g !== 'weather') wxDots(host, G); } catch (e) {}
    try { K.draw(host, G); host.setAttribute('data-drawn', G.g); } catch (e) { host.setAttribute('data-err', String(e && e.message || e)); return; }
    at(host, host.__gfxAt == null ? -1 : host.__gfxAt);
  }
  function at(host, i) {
    var G = host && host.__gfx, K = kindOf(G); if (!host) return; host.__gfxAt = i; if (!K || !G.$) return;
    try { K.at(host, G, i); } catch (e) { host.setAttribute('data-err', String(e && e.message || e)); }
  }

  window.GGGfx = { draw: draw, at: at, kinds: Object.keys(KINDS), v: 'g992' };
  // any panel drawn before this file arrived
  try { Array.prototype.forEach.call(document.querySelectorAll('.ln-gfx'), function (h) { if (h.__gfx && !h.__gfx.$) draw(h); }); } catch (e) {}
})();
