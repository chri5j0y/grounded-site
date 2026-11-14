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

  /* ---------------- tree ---------------- */
  var TREE = {
    draw: function (host, G) {
      var C = ink(G.dk), id = 'gx' + (++N), s = svgOf(host, '0 0 260 400');
      glowFilter(s, id + 'g', 4.5);
      var g = {}, P = function (k) { return g[k] = el('g', { 'class': 'gx-part', 'data-p': k }, s); };
      // the ground
      el('path', { d: 'M28 268 Q130 258 232 268', fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-linecap': 'round' }, s);
      var r = P('roots');
      ['M126 266 C118 290 96 300 70 318', 'M130 268 C128 296 122 318 112 340', 'M134 266 C142 292 164 302 190 316', 'M131 268 C138 300 146 320 150 342', 'M124 266 C110 280 84 282 58 288', 'M136 266 C150 280 176 284 204 290']
        .forEach(function (d) { el('path', { d: d, fill: 'none', 'stroke-width': 5, 'stroke-linecap': 'round' }, r); });
      var t = P('trunk'); el('path', { d: 'M114 268 C120 230 120 196 122 160 L140 160 C142 196 142 230 148 268 Z', 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, t);
      var b = P('bark'); ['M126 250 q4 -8 0 -16', 'M136 238 q-4 -9 0 -18', 'M127 214 q4 -8 0 -16', 'M135 196 q-3 -8 0 -15', 'M129 180 q3 -6 0 -12'].forEach(function (d) { el('path', { d: d, fill: 'none', 'stroke-width': 3, 'stroke-linecap': 'round' }, b); });
      var br = P('branches'); ['M126 168 C110 150 92 140 66 132', 'M136 166 C152 148 172 140 198 128', 'M130 162 C124 138 112 118 96 100', 'M132 162 C140 136 152 116 168 98', 'M131 160 L131 92']
        .forEach(function (d) { el('path', { d: d, fill: 'none', 'stroke-width': 6, 'stroke-linecap': 'round' }, br); });
      var lv = P('leaves'); [[78, 118, 30], [182, 112, 32], [104, 82, 32], [158, 80, 32], [131, 60, 30], [131, 108, 28], [56, 140, 18], [208, 136, 18]]
        .forEach(function (c) { el('circle', { cx: c[0], cy: c[1], r: c[2], 'stroke-width': 2 }, lv); });
      var fr = P('fruit'); [[90, 112], [168, 106], [120, 70], [150, 124], [190, 132], [70, 132], [140, 52]].forEach(function (c) { el('circle', { cx: c[0], cy: c[1], r: 7.5, 'stroke-width': 2 }, fr); });
      var L1 = txt(s, 130, 362, '', { 'text-anchor': 'middle', 'font-family': DISP, 'font-weight': 600, 'font-size': 34, fill: C.ink, 'class': 'gx-lab' });
      var L2 = txt(s, 130, 388, '', { 'text-anchor': 'middle', 'font-family': BODY, 'font-weight': 600, 'font-size': 18, fill: C.soft, 'class': 'gx-lab2' });
      G.$ = { g: g, L1: L1, L2: L2, C: C, id: id };
    },
    at: function (host, G, i) {
      var $ = G.$, C = $.C, cur = [], seen = [];
      if (i === Infinity) { allSteps(G).forEach(function (v) { parts(v).forEach(function (p) { if (cur.indexOf(p) < 0) cur.push(p); }); }); }
      else {
        (G.steps || []).forEach(function (s) { if (s.b <= i) { parts(s.v).forEach(function (p) { if (seen.indexOf(p) < 0) seen.push(p); }); cur = parts(s.v); } });
        if (G.def.one) seen = cur.slice();
      }
      if (i === Infinity) seen = cur.slice();
      ORDER.forEach(function (k) {
        var on = cur.indexOf(k) >= 0, was = seen.indexOf(k) >= 0, col = PART[k][G.dk ? 3 : 2], q = $.g[k];
        var stroke = on || was ? col : C.dim, fillc = k === 'trunk' || k === 'leaves' || k === 'fruit' ? (on || was ? col : C.fill) : 'none';
        q.setAttribute('stroke', stroke); q.setAttribute('class', 'gx-part' + (on ? ' gx-on' : was ? ' gx-was' : ''));
        Array.prototype.forEach.call(q.children, function (c) { c.setAttribute('stroke', stroke); if (c.tagName !== 'path' || k === 'trunk') c.setAttribute('fill', k === 'leaves' ? (on ? col : was ? col : C.fill) : fillc); });
        q.setAttribute('fill-opacity', k === 'leaves' ? (on ? 0.55 : was ? 0.32 : 1) : 1);
        q.setAttribute('opacity', on ? 1 : was ? 0.72 : G.dk ? 0.75 : 1);
        q.setAttribute('filter', on ? 'url(#' + $.id + 'g)' : '');
      });
      // the bark lines sit on the trunk, so they show over its fill
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
    jaw: 'jaw', face: 'face', eyes: 'face', forehead: 'face', head: 'head' };
  var ALLR = ['feet', 'legs', 'hips', 'belly', 'chest', 'back', 'hands', 'arms', 'shoulders', 'neck', 'jaw', 'face', 'head'];
  var BODY = {
    draw: function (host, G) {
      var C = ink(G.dk), id = 'gx' + (++N), s = svgOf(host, '0 0 260 400');
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
      var L1 = txt(s, 130, 397, '', { 'text-anchor': 'middle', 'font-family': DISP, 'font-weight': 600, 'font-size': 26, fill: C.ink, 'class': 'gx-lab' });
      G.$ = { R: R, H: H, L1: L1, C: C, id: id };
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
      var words = []; v.forEach(function (p) { if (p.w && p.w !== 'all' && words.indexOf(cap(p.w)) < 0) words.push(cap(p.w)); });
      if (v.some(function (p) { return p.r === 'all'; })) words = [G.def.all || 'Whole Body'];
      label($.L1, words, 26);
      host.setAttribute('data-on', Object.keys(on).filter(function (k) { return on[k]; }).join(' '));
      host.setAttribute('data-sq', Object.keys(on).filter(function (k) { return on[k] === 2; }).join(' '));
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
    try { var u = new URL('gg-breath-ring.js', SELF || location.href); u.search = '?v=b989'; var e = document.createElement('script'); e.src = u.href; e.async = true; document.head.appendChild(e); } catch (e) {}
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

  var KINDS = { tree: TREE, body: BODY, wave: WAVE, senses: SENSES, tap: TAP, rail: RAIL, box: SHAPE, tri: SHAPE, sigh: SHAPE };

  // One animation loop for the graphics that move by code (the wave); everything else moves with CSS.
  var LIVE = [];
  function loop(host, G) { if (LIVE.indexOf(host) < 0) LIVE.push(host); if (!loop.raf) loop.raf = requestAnimationFrame(tick); }
  function tick(now) {
    loop.raf = 0;
    LIVE = LIVE.filter(function (h) { if (!h.isConnected || !h.__gfx || !h.__gfx.$) return false; var K = KINDS[h.__gfx.g]; try { return K.frame ? K.frame(h, h.__gfx, now) : false; } catch (e) { return false; } });
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
      '@keyframes gxPulse{0%,100%{opacity:1}50%{opacity:.78}}',
      '@keyframes gxSq{0%,100%{transform:scale(1)}50%{transform:scale(.95)}}',
      '@keyframes gxDot{to{fill-opacity:1}}',
      '@keyframes gxTap{0%,100%{transform:scale(1.1);opacity:1}50%{transform:scale(.86);opacity:.3}}',
      '@media (prefers-reduced-motion:reduce){.ln-gfx *{animation:none !important;transition:none !important;}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function draw(host) {
    var G = host && host.__gfx, K = G && KINDS[G.g]; if (!K || G.$) return;
    css(); G.red = reduced();
    try { K.draw(host, G); host.setAttribute('data-drawn', G.g); } catch (e) { host.setAttribute('data-err', String(e && e.message || e)); return; }
    at(host, host.__gfxAt == null ? -1 : host.__gfxAt);
  }
  function at(host, i) {
    var G = host && host.__gfx, K = G && KINDS[G.g]; if (!host) return; host.__gfxAt = i; if (!K || !G.$) return;
    try { K.at(host, G, i); } catch (e) { host.setAttribute('data-err', String(e && e.message || e)); }
  }

  window.GGGfx = { draw: draw, at: at, kinds: Object.keys(KINDS), v: 'c113' };
  // any panel drawn before this file arrived
  try { Array.prototype.forEach.call(document.querySelectorAll('.ln-gfx'), function (h) { if (h.__gfx && !h.__gfx.$) draw(h); }); } catch (e) {}
})();
