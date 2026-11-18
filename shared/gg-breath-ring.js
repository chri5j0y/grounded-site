/* =====================================================================
   GROW WITH GROUNDED: Sunset Tide Breath (shared/gg-breath-ring.js)   GWG BLD 928 rings, BLD 989 shapes, BLD 1019 Sunset Tide
   (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
   The one breath guide for the whole site. BLD 1019 (Chris, November 17, 2026: "Yes the sunset glow traced path combo works
   nice also to notice holds on both ends like box breaths"; option 1, Sunset Tide With a Path, from
   patches/bld1019/breath-options.html in grounded-workshop): a round window fills with sunset colored water on the breath in
   and empties on the breath out, and a bright dot travels the rim so the next turn shows before it comes. The rim is split into
   one arc for each part of the breath: up the left side on the breath in, across the top on a hold, down the right side on the
   breath out, and along the bottom on a rest (the hold at the other end, like box breathing). A plain in and out takes the left
   half and the right half; every other breath sizes its arcs by its counts (box: four equal arcs; 4-7-8: 4, 7, and 8). Even
   easing: a slow sine ease in and out on the breath in and out, a steady glide on a hold. The water's color follows how full the
   breath is: blue when empty, through purple and red, to coral pink when full, so the in breath warms and the out breath cools.
   Plain shapes and gradients only (no blur filters), so it stays smooth on an iPad and a phone; light and dark.

   A player writes a host and this file draws into it, every frame, on the player's own clock:
     <svg class="ggbr" viewBox="0 0 240 240" data-ph="in:4 out:6" data-opt="c w h" data-tone="auto"> ... </svg>
       data-ph    the breath, one part after another: in, out, hold, rest, or sip (one more sip on top), each with its seconds.
       data-opt   c: the count goes up (1, 2, 3, with "of 4" under it) in the middle of the window (breathing practices);
                  w: the large phase word under the window (Breathe In, Hold, Breathe Out, Rest; give the viewBox 290 tall);
                  h: a soft chime at each turn of the breath (breathing exercises only, once a tap has happened on the page).
       data-tone  dark, light, or auto (the site theme).
     The clock, in this order:
       data-at    a part number: step instead of looping (the dot travels that one arc at its own pace, then rests); -1 waits.
       data-anim  a CSS selector, read inside the host's parent: the element whose CSS animation is the breath clock (the
                  lesson player's circle, shared/gg-learn.js), so the window follows exactly what the narration follows.
       data-dur   the svg's own SMIL timeline, which the workout player's one clock (shared/tend/health.js clkSync) seeks and
                  pauses, so the window, the figure, and Ava's count land together; data-loop is the same with no seeking.
       otherwise  its own clock from when it first shows.
   Breath Shapes (BLD 989): data-shape box, tri, or sigh still names the breath's shape; since BLD 1019 each shape is drawn on the
   rim (box four equal arcs, the 4-7-8 triangle three arcs sized 4, 7, 8, the sigh in, a little more, and the long out). data-sw
   gives each part its own word under the window ('Breathe in|Hold softly|Breathe out|Rest').
   Reduced motion: the water lies flat, the dot and the level move one count at a time, and the color and words lead.
   For tests and other graphics: the host carries data-drawn (the shape, or ring), data-k (the part), data-i, data-x and data-y
   (the dot), data-word; the window circle carries data-ggbr-r with data-size (0 empty to 1 full) and data-k.
   GGBreathRing.chimeOn(), .setChime(on), .unlock() (call it inside a tap), .chime(kind), .phases(str), .stateAt(P, t), .kick().
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGBreathRing) return;
  var NS = 'http://www.w3.org/2000/svg', N = 0, TAU = Math.PI * 2;
  var WORD = { 'in': 'Breathe In', out: 'Breathe Out', hold: 'Hold', rest: 'Rest', sip: 'A Little More' };
  var LAB = { 'in': 'IN', out: 'OUT', hold: 'HOLD', rest: 'REST', sip: 'MORE' };
  // ease in out sine: the same steady curve on every breath in and out
  function ease(x) { x = Math.max(0, Math.min(1, x)); return 0.5 - 0.5 * Math.cos(Math.PI * x); }
  function mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
  function rgb(c, a) { return 'rgba(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ',' + (a == null ? 1 : +a.toFixed(3)) + ')'; }
  // The sunset: blue when empty, through purple and red, to coral pink when full.
  var SUN = [[0, [72, 112, 184]], [0.36, [128, 88, 168]], [0.68, [214, 84, 104]], [1, [246, 156, 136]]];
  function sun(v) {
    v = Math.max(0, Math.min(1, v));
    for (var i = 1; i < SUN.length; i++) if (v <= SUN[i][0]) { var a = SUN[i - 1], b = SUN[i]; return mix(a[1], b[1], (v - a[0]) / (b[0] - a[0])); }
    return SUN[SUN.length - 1][1];
  }
  var LIGHT = { trace: [194, 96, 63], faint: [217, 200, 182], soft: [107, 90, 77], ink: [44, 24, 16], win: [255, 252, 246], winA: 0.62 };
  var DARK = { trace: [242, 154, 120], faint: [74, 62, 54], soft: [194, 182, 164], ink: [243, 237, 227], win: [255, 255, 255], winA: 0.07 };
  function dark() {
    try {
      var t = document.documentElement.getAttribute('data-theme');
      if (t === 'dark') return true; if (t === 'light') return false;
      return !!(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
    } catch (e) { return false; }
  }
  function reduced() { try { return !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } }
  function phases(s) {
    return String(s || '').split(/\s+/).filter(Boolean).map(function (x) { var a = x.split(':'); return { k: a[0], d: +a[1] }; })
      .filter(function (p) { return WORD[p.k] && p.d > 0; });
  }
  // Where the breath is at t seconds into the loop: the part, how far through it, how full the breath is (size, 0 to 1), and its
  // warmth (warm, 0 the in breath, 1 the out breath; kept for older callers). Each part starts where the last one ended.
  function stateAt(P, t) {
    var T = 0, i; for (i = 0; i < P.length; i++) T += P[i].d;
    if (!P.length || !(T > 0)) return { i: 0, k: 'in', p: 0, el: 0, d: 1, size: 0, warm: 1 };
    t = ((t % T) + T) % T;
    var k0 = P[0].k, lv = k0 === 'out' || k0 === 'hold' ? 1 : 0, wm = k0 === 'in' || k0 === 'sip' ? 1 : 0, acc = 0;
    for (i = 0; i < P.length; i++) {
      var ph = P[i], end = acc + ph.d, nx = P[(i + 1) % P.length];
      var top = ph.k === 'in' && nx && nx.k === 'sip' && P.length > 1 ? 0.8 : 1;
      var tl = ph.k === 'in' ? top : ph.k === 'sip' ? 1 : ph.k === 'out' ? 0 : lv;
      var tw = ph.k === 'out' || ph.k === 'rest' ? 1 : ph.k === 'hold' ? wm : 0;
      if (t < end || i === P.length - 1) {
        var el = Math.min(ph.d, t - acc), p = el / ph.d;
        return { i: i, k: ph.k, p: p, el: el, d: ph.d, size: lv + (tl - lv) * ease(p), warm: wm + (tw - wm) * ease(Math.min(1, p * 2.6)) };
      }
      lv = tl; wm = tw; acc = end;
    }
    return { i: 0, k: k0, p: 0, el: 0, d: P[0].d, size: lv, warm: wm };
  }

  // ---------- the chime: Web Audio, made in the browser (no recording, no file) ----------
  var AC = null;
  function chimeOn() { try { return localStorage.getItem('gg-breath-chime') !== 'off'; } catch (e) { return true; } }
  function setChime(on) { try { localStorage.setItem('gg-breath-chime', on ? 'on' : 'off'); } catch (e) {} }
  function unlock() {
    try {
      var C = window.AudioContext || window.webkitAudioContext; if (!C) return;
      if (!AC) AC = new C();
      if (AC.state === 'suspended' && AC.resume) AC.resume();
    } catch (e) {}
  }
  var CH = { 'in': 523.25, sip: 587.33, out: 392, hold: 440, rest: 440 };
  // A soft, warm bell: a sine with two quiet partials, a gentle start, and a long easy fade.
  function chime(kind) {
    if (!AC || AC.state !== 'running' || !chimeOn()) return false;
    try {
      var f = CH[kind] || 440, t = AC.currentTime + 0.01, g = AC.createGain(), lp = AC.createBiquadFilter(), soft = kind === 'hold' || kind === 'rest' ? 0.7 : 1;
      lp.type = 'lowpass'; lp.frequency.value = 2400; g.connect(lp); lp.connect(AC.destination);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.07 * soft, t + 0.025); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.9);
      [[1, 1], [2.003, 0.22], [3.01, 0.06]].forEach(function (pt) {
        var o = AC.createOscillator(), og = AC.createGain(); o.type = 'sine'; o.frequency.value = f * pt[0]; og.gain.value = pt[1];
        o.connect(og); og.connect(g); o.start(t); o.stop(t + 2);
      });
      window.GG_CHIMES = (window.GG_CHIMES || 0) + 1;
      return true;
    } catch (e) { return false; }
  }
  try {
    ['pointerdown', 'keydown', 'touchend'].forEach(function (ev) {
      document.addEventListener(ev, function () { if (document.querySelector('svg.ggbr[data-opt~="h"]')) unlock(); }, { capture: true, passive: true });
    });
  } catch (e) {}

  // ---------- drawing ----------
  var CX = 120, CY = 120, R = 78;
  var SHAPES = { box: ['in', 'hold', 'out', 'rest'], tri: ['in', 'hold', 'out'], sigh: ['in', 'sip', 'out'] };
  function el(tag, a, p) { var e = document.createElementNS(NS, tag); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function f1(n) { return n.toFixed(1); }
  function px(a, r) { return f1(CX + Math.cos(a) * r) + ' ' + f1(CY + Math.sin(a) * r); }
  // An arc along the rim from angle a to angle b (b after a), in pieces of a half turn or less so any length draws.
  function arcD(a, b, r) {
    if (!(b - a > 0.002)) return '';
    var d = 'M' + px(a, r), s = a;
    while (s < b - 1e-6) { var e = Math.min(b, s + Math.PI * 0.98); d += ' A' + r + ' ' + r + ' 0 0 1 ' + px(e, r); s = e; }
    return d;
  }
  // The rim's arcs, one per part: a plain in and out is the left half and the right half; any other breath is sized by its
  // counts. The breath in arc is centered on the left side, so the dot climbs on the breath in and comes down the right side.
  // A workout loop can hold the same breath more than once (one breath a rep, two reps a loop) or start on the breath out (out on
  // the effort): the rim shows one breath, starting from its breath in, and each part finds its own arc (S.ix).
  function arcsOf(P) {
    var L = P.length, i, j;
    for (j = 1; j < P.length; j++) {
      if (P.length % j) continue;
      for (i = j; i < P.length && P[i].k === P[i % j].k; i++);
      if (i === P.length) { L = j; break; }
    }
    var r = 0; for (i = 0; i < L; i++) if (P[i].k === 'in') { r = i; break; }
    var Q = [], T = 0; for (i = 0; i < L; i++) { Q.push(P[(i + r) % L]); T += Q[i].d; }
    var two = L === 2 && Q[0].k === 'in' && Q[1].k === 'out', sz = Q.map(function (q) { return two ? Math.PI : TAU * q.d / T; });
    var a = Math.PI - sz[0] / 2, arcs = [], ix = [];
    for (i = 0; i < L; i++) { arcs.push([a, a + sz[i]]); a += sz[i]; }
    for (i = 0; i < P.length; i++) ix.push(((i % L) - r + L) % L);
    return { arcs: arcs, ix: ix, Q: Q };
  }
  function shapeOf(svg, P) {
    var n = svg.getAttribute('data-shape'), S = SHAPES[n]; if (!S || P.length !== S.length) return '';
    for (var i = 0; i < P.length; i++) { var k = P[i].k; if (k !== S[i] && !(S[i] === 'rest' && k === 'hold') && !(S[i] === 'hold' && k === 'sip' && n !== 'sigh')) return ''; }
    return n;
  }
  function build(svg) {
    var id = 'ggbr' + (++N), dk = tone(svg), opt = ' ' + (svg.getAttribute('data-opt') || '') + ' ', P = phases(svg.getAttribute('data-ph'));
    if (!P.length) P = [{ k: 'in', d: 4 }, { k: 'out', d: 6 }];
    var S = {
      dk: dk, C: dk ? DARK : LIGHT, red: reduced(), w: opt.indexOf(' w ') >= 0, c: opt.indexOf(' c ') >= 0, h: opt.indexOf(' h ') >= 0,
      clock: 0, last: 0, pi: null, pk: '', P: P, sw: String(svg.getAttribute('data-sw') || '').split('|'), shape: shapeOf(svg, P)
    };
    // shapes before BLD 1019 drew into a cleared host; start clean so a redrawn host never stacks two looks
    while (svg.firstChild && svg.firstChild.nodeName !== 'animate') svg.removeChild(svg.firstChild);
    var C = S.C, defs = el('defs', {}, svg), AR = arcsOf(P); S.arcs = AR.arcs; S.ix = AR.ix;
    var halo = el('radialGradient', { id: id + 'h', gradientUnits: 'userSpaceOnUse', cx: CX, cy: CY, r: R + 30 }, defs);
    S.hs = [el('stop', { offset: '62%', 'stop-opacity': 0.3 }, halo), el('stop', { offset: '100%', 'stop-opacity': 0 }, halo)];
    var wg = el('linearGradient', { id: id + 'w', gradientUnits: 'userSpaceOnUse', x1: 0, x2: 0, y1: CY, y2: CY + R }, defs);
    S.wg = wg; S.ws = [el('stop', { offset: '0%' }, wg), el('stop', { offset: '100%' }, wg)];
    var dg = el('radialGradient', { id: id + 'd' }, defs);
    el('stop', { offset: '0%', 'stop-color': rgb(C.trace), 'stop-opacity': 0.55 }, dg); el('stop', { offset: '100%', 'stop-color': rgb(C.trace), 'stop-opacity': 0 }, dg);
    var cp = el('clipPath', { id: id + 'c' }, defs); el('circle', { cx: CX, cy: CY, r: R }, cp);
    S.halo = el('circle', { cx: CX, cy: CY, r: R + 30, fill: 'url(#' + id + 'h)', 'class': 'ggbr-glow' }, svg);
    S.win = el('circle', { cx: CX, cy: CY, r: R, fill: rgb(C.win, C.winA), 'class': 'ggbr-ring', 'data-ggbr-r': '' }, svg);
    var wat = el('g', { 'clip-path': 'url(#' + id + 'c)' }, svg);
    S.back = el('path', {}, wat); S.front = el('path', { fill: 'url(#' + id + 'w)' }, wat);
    // the whole rim, faint; the coming part a little brighter; the part traced this round glows
    el('circle', { cx: CX, cy: CY, r: R, fill: 'none', stroke: rgb(C.faint, 0.95), 'stroke-width': 9 }, svg);
    S.next = el('path', { fill: 'none', stroke: rgb(C.trace, 0.3), 'stroke-width': 9 }, svg);
    S.left = el('path', { fill: 'none', stroke: rgb(C.trace, 0.3), 'stroke-width': 9 }, svg);
    S.glow = el('path', { fill: 'none', stroke: rgb(C.trace, 0.22), 'stroke-width': 20, 'stroke-linecap': 'round', 'class': 'ggbr-trail' }, svg);
    S.done = el('path', { fill: 'none', stroke: rgb(C.trace, 0.95), 'stroke-width': 6, 'stroke-linecap': 'round' }, svg);
    // a small notch where each part begins, and each part's word outside the rim (In, Hold, Out, Rest)
    S.labs = S.arcs.map(function (a, i) {
      el('circle', { cx: f1(CX + Math.cos(a[0]) * (R + 12)), cy: f1(CY + Math.sin(a[0]) * (R + 12)), r: 2.6, fill: rgb(C.soft, 0.7) }, svg);
      var m = (a[0] + a[1]) / 2, t = el('text', { x: f1(CX + Math.cos(m) * (R + 24)), y: f1(CY + Math.sin(m) * (R + 22)), 'text-anchor': 'middle', 'dominant-baseline': 'middle',
        'font-size': 14, 'font-family': "'Barlow Condensed', 'Arial Narrow', sans-serif", 'font-weight': 600, 'letter-spacing': '1.2', 'class': 'ggbr-lab' }, svg);
      t.textContent = LAB[AR.Q[i].k] || ''; return t;
    });
    S.dh = el('circle', { r: 24, fill: 'url(#' + id + 'd)', opacity: S.red ? 0 : 1, 'class': 'ggbr-halo' }, svg);
    S.dot = el('circle', { r: 8.5, fill: 'rgb(255,250,242)', stroke: rgb(C.trace), 'stroke-width': 3, 'class': 'ggbr-dot', 'data-ggbr-dot': '' }, svg);
    // the count in the middle of the window: the number, with "of 4" small under it
    var cnt = { 'text-anchor': 'middle', 'font-family': "'Barlow Condensed', 'Barlow', system-ui, sans-serif", fill: rgb(C.ink), stroke: dk ? 'rgba(20,14,10,.55)' : 'rgba(255,252,246,.8)', 'stroke-width': 4, 'paint-order': 'stroke', 'stroke-linejoin': 'round' };
    S.num = el('text', Object.assign({ x: CX, y: CY + 12, 'font-size': 42, 'font-weight': 600, 'class': 'ggbr-n' }, cnt), svg);
    S.of = el('text', Object.assign({ x: CX, y: CY + 34, 'font-size': 15, 'font-weight': 600, 'letter-spacing': '1', 'class': 'ggbr-of' }, cnt), svg);
    if (S.w) S.say = el('text', { x: CX, y: 270, 'text-anchor': 'middle', 'font-size': 36, 'font-family': "'Cormorant Garamond', Georgia, serif", 'font-weight': 600, fill: rgb(C.ink), 'class': 'ggbr-say' }, svg);
    svg.setAttribute('data-drawn', S.shape || 'ring');
    return S;
  }
  function tone(svg) { var t = svg.getAttribute('data-tone'); return t === 'dark' ? true : t === 'light' ? false : dark(); }
  // The clock for this host, in seconds into its loop, or null while it waits.
  function timeOf(svg, S, now) {
    if (svg.hasAttribute('data-at')) {
      var av = svg.getAttribute('data-at'); if (av !== S.atv) { S.atv = av; S.att = now; }
      var n = parseInt(av, 10); if (!(n >= 0) || !S.P.length) return null; n = Math.min(n, S.P.length - 1);
      var st = 0; for (var j = 0; j < n; j++) st += S.P[j].d;
      return st + Math.min(S.P[n].d - 0.001, (now - S.att) / 1000);
    }
    var sel = svg.getAttribute('data-anim');
    if (sel) {
      try {
        var host = svg.parentNode, a = host && host.querySelector(sel), an = a && a.getAnimations ? a.getAnimations()[0] : null, tm = an && an.effect ? an.effect.getTiming() : null;
        if (!tm || an.currentTime == null || !(+tm.duration > 0)) return null;
        return ((+an.currentTime - (+tm.delay || 0)) % +tm.duration + +tm.duration) % +tm.duration / 1000;
      } catch (e) { return null; }
    }
    if ((svg.hasAttribute('data-dur') || svg.hasAttribute('data-loop')) && svg.getCurrentTime) { try { return svg.getCurrentTime(); } catch (e) {} }
    if (!S.t0) S.t0 = now; return (now - S.t0) / 1000;
  }
  // The water's surface across the window at height y, with a gentle drift.
  function wave(y, amp, ph, fq) {
    var d = 'M' + (CX - R - 4) + ' ' + (CY + R + 4), n = 18;
    for (var i = 0; i <= n; i++) { var x = CX - R - 4 + (2 * R + 8) * i / n; d += ' L' + f1(x) + ' ' + f1(y + Math.sin(ph + i / n * TAU * fq) * amp); }
    return d + ' L' + (CX + R + 4) + ' ' + (CY + R + 4) + 'Z';
  }
  function draw(svg, now) {
    var S = svg.__ggbr; if (!S) { svg.__ggbr = S = build(svg); S.last = now; }
    var dt = Math.min(0.1, Math.max(0, (now - S.last) / 1000)); S.last = now; S.clock += dt;
    var t = timeOf(svg, S, now), ph = stateAt(S.P, t == null ? 0 : t), red = S.red, C = S.C;
    if (red && t != null) {
      // one count at a time: the level and the dot rest on each whole second
      var steps = Math.max(1, Math.round(ph.d)), q = Math.min(steps, Math.floor(ph.el / ph.d * steps + 1e-6)) / steps;
      ph = stateAt(S.P, t - ph.el + q * ph.d - (q >= 1 ? 1e-4 : 0));
    }
    var lv = ph.size, col = sun(lv), y = CY + R * 0.92 - R * 1.84 * lv, dr = red ? 0 : S.clock;
    S.hs.forEach(function (s) { s.setAttribute('stop-color', rgb(col)); });
    S.hs[0].setAttribute('stop-opacity', (0.18 + 0.24 * lv).toFixed(3));
    S.back.setAttribute('d', wave(y - 4, red ? 0 : 4, dr * 0.5 + 1.3, 1.4)); S.back.setAttribute('fill', rgb(mix(col, [255, 255, 255], 0.35), 0.5));
    S.front.setAttribute('d', wave(y, red ? 0 : 3.5, -dr * 0.35, 1.1));
    S.wg.setAttribute('y1', f1(y)); S.ws[0].setAttribute('stop-color', rgb(mix(col, [255, 240, 225], 0.2), 0.96)); S.ws[1].setAttribute('stop-color', rgb(mix(col, [40, 30, 70], 0.3)));
    S.win.setAttribute('data-k', ph.k); S.win.setAttribute('data-size', lv.toFixed(3));
    // the dot on the rim: a sine ease on the breath in and out, a steady glide on a hold or rest
    var i = S.ix[Math.max(0, Math.min(S.ix.length - 1, ph.i))] || 0, cur = S.arcs[i], nx = S.arcs[(i + 1) % S.arcs.length];
    var fr = t == null ? 0 : ph.k === 'hold' || ph.k === 'rest' ? ph.p : ease(ph.p), ang = cur[0] + (cur[1] - cur[0]) * fr;
    S.next.setAttribute('d', S.arcs.length > 1 ? arcD(nx[0], nx[1], R) : '');
    S.left.setAttribute('d', arcD(ang, cur[1], R));
    var dd = arcD(S.arcs[0][0], ang, R); S.glow.setAttribute('d', dd); S.done.setAttribute('d', dd);
    var x = CX + Math.cos(ang) * R, yy = CY + Math.sin(ang) * R;
    S.dot.setAttribute('cx', f1(x)); S.dot.setAttribute('cy', f1(yy)); S.dh.setAttribute('cx', f1(x)); S.dh.setAttribute('cy', f1(yy));
    S.labs.forEach(function (L, k) { var on = k === i && t != null; L.setAttribute('fill', rgb(on ? C.ink : C.soft, on ? 0.95 : 0.7)); });
    svg.setAttribute('data-x', f1(x)); svg.setAttribute('data-y', f1(yy)); svg.setAttribute('data-i', String(ph.i));
    // The count goes up in each part (1, 2, 3, with "of 4" under it), each number fading in softly. Workout moves show the word only.
    if (S.c && t != null && ph.d >= 1.5) {
      var tot = Math.ceil(ph.d - 1e-6), n = String(Math.min(tot, Math.floor(ph.el) + 1)), of = 'of ' + tot;
      if (S.num.textContent !== n) S.num.textContent = n; if (S.of.textContent !== of) S.of.textContent = of;
      S.num.setAttribute('opacity', (red ? 1 : 0.35 + 0.65 * Math.min(1, (ph.el % 1) * 4)).toFixed(3));
    } else { if (S.num.textContent) S.num.textContent = ''; if (S.of.textContent) S.of.textContent = ''; }
    if (S.say) { var wd = (S.sw && S.sw[ph.i]) || WORD[ph.k] || ''; if (S.say.textContent !== wd) { S.say.textContent = wd; S.say.setAttribute('font-size', 36); try { var wl = S.say.getComputedTextLength(); if (wl > 230) S.say.setAttribute('font-size', (36 * 230 / wl).toFixed(1)); } catch (e) {} } svg.setAttribute('data-word', wd); }
    svg.setAttribute('data-k', ph.k);
    // A soft chime at each turn of the breath (a breathing exercise only), never on the first look or while the clock waits.
    if (t != null) {
      var key = ph.i + ':' + ph.k;
      if (S.pi != null && key !== S.pk && S.h && !document.hidden) chime(ph.k);
      S.pi = ph.i; S.pk = key;
    }
  }
  var RAF = 0;
  function tick(now) {
    RAF = 0; var list = document.querySelectorAll('svg.ggbr');
    for (var i = 0; i < list.length; i++) { try { draw(list[i], now); } catch (e) {} }
    if (list.length) RAF = requestAnimationFrame(tick);
  }
  function kick() { if (!RAF) RAF = requestAnimationFrame(tick); }
  // New hosts start the loop on their own (the players redraw often); a quiet check catches any drawn while it rested.
  try {
    var mo = new MutationObserver(function () { if (!RAF && document.querySelector('svg.ggbr')) kick(); });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) { setInterval(function () { if (!RAF && document.querySelector('svg.ggbr')) kick(); }, 500); }
  try { document.addEventListener('visibilitychange', function () { if (!document.hidden) kick(); }); } catch (e) {}
  kick();
  window.GGBreathRing = { chimeOn: chimeOn, setChime: setChime, unlock: unlock, chime: chime, phases: phases, stateAt: stateAt, kick: kick, sun: sun,
    colors: { 'in': '#F69C88', out: '#4870B8' }, shapes: Object.keys(SHAPES), v: 'c148' };
})();
