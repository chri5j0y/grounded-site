/* =====================================================================
   GROW WITH GROUNDED: Breathing Rings (shared/gg-breath-ring.js)   GWG BLD 928, November 2026; Breath Shapes BLD 989
   (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
   The one breath guide for the whole site (Chris, November 6, 2026: rings everywhere a breath guide shows; Design A,
   Bloom, from patches/bld928/mock/breathing-rings.html in grounded-workshop). A soft ring swells on the in breath and
   settles on the out breath with a slow ease in and out (smootherstep), a glow trails just behind it like a pulse, and its
   color blends through hue from Sage (#8DB38A, the in breath) to Honey (#DDA45A, the out breath), turning at the top and
   bottom of each breath. Growth Rings Inside, A Living Edge (very slight), and Brighter on Dark.

   A player writes a host and this file draws into it, every frame, on the player's own clock:
     <svg class="ggbr" viewBox="0 0 240 240" data-ph="in:4 out:6" data-opt="c w h" data-tone="auto"> ... </svg>
       data-ph    the breath, one part after another: in, out, hold, rest, or sip (one more sip on top), each with its seconds.
       data-opt   c: counts go up (1, 2, 3) in each part (breathing practices); w: the word under the ring (Breathe In,
                  Breathe Out, Hold, Rest; give the viewBox 290 tall); h: a soft chime at each turn of the breath (breathing
                  exercises only, and only once a tap has happened on the page).
       data-tone  dark, light, or auto (the site theme).
     The clock, in this order:
       data-dur   the svg's own SMIL timeline, which the workout player's one clock (field-guide/health.js clkSync) seeks and
                  pauses, so the ring, the figure, and Ava's count land together; data-loop is the same with no seeking.
       data-anim  a CSS selector, read inside the ring's parent: the element whose CSS animation is the breath clock (the
                  lesson player's circle, shared/gg-learn.js), so the ring follows exactly what the narration follows.
       otherwise  the ring's own clock from when it first shows.
   Reduced motion: the ring moves only a little, with no living edge or trailing pulse; the color and the words lead.
   Breath Shapes (BLD 989, Chris, November 14, 2026: "why not create box graphic for the box breathing? a box that traces along
   to follow"): data-shape box (in, hold, out, rest), tri (in, hold, out: 4-7-8), or sigh (in, sip, out: a rise, a small
   step up, a long slow descent) draws that shape in place of the ring. A dot traces it on the same clock, one side for
   each part, and the path fills in behind it, blending Sage to Honey like the ring. Box: clockwise from the top left, the
   top on the in breath, down the right on the hold, the bottom on the out breath, up the left on the rest. Triangle: up the
   left side on the in breath, across the top on the hold, down the right on the out breath. data-sw names each side, live
   text ('Breathe in|Hold softly|Breathe out|Rest'), and the word under the shape uses it too; otherwise the ring's words.
   A shape whose parts do not match its sides keeps the ring. data-at (a part number) steps instead of looping: the dot
   traces that one side at its own pace, then rests at the corner; -1 waits at the start. Reduced motion: the dot moves
   one count at a time, with no glow trail.
   GGBreathRing.chimeOn(), .setChime(on), .unlock() (call it inside a tap), .chime(kind), .phases(str), .stateAt(P, t).
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGBreathRing) return;
  var NS = 'http://www.w3.org/2000/svg', IN = '#8DB38A', OUT = '#DDA45A', N = 0;
  var WORD = { 'in': 'Breathe In', out: 'Breathe Out', hold: 'Hold', rest: 'Rest', sip: 'A Little More' };
  // the breath curve: a slow start and a slow finish
  function ease(x) { x = Math.max(0, Math.min(1, x)); return x * x * x * (x * (x * 6 - 15) + 10); }
  function hex(h) { return [1, 3, 5].map(function (i) { return parseInt(h.substr(i, 2), 16) / 255; }); }
  function hsl(h) {
    var c = hex(h), mx = Math.max.apply(0, c), mn = Math.min.apply(0, c), l = (mx + mn) / 2, d = mx - mn, hh = 0, ss = 0;
    if (d) { ss = d / (1 - Math.abs(2 * l - 1)); hh = mx === c[0] ? ((c[1] - c[2]) / d) % 6 : mx === c[1] ? (c[2] - c[0]) / d + 2 : (c[0] - c[1]) / d + 4; hh *= 60; if (hh < 0) hh += 360; }
    return [hh, ss, l];
  }
  var HA = hsl(IN), HB = hsl(OUT);
  // Blend through hue, saturation, and lightness, so the middle stays bright and clean (a straight mix turns olive).
  function blend(t, dl) {
    var dh = HB[0] - HA[0]; if (dh > 180) dh -= 360; if (dh < -180) dh += 360;
    var h = (HA[0] + dh * t + 360) % 360, s = Math.min(1, HA[1] + (HB[1] - HA[1]) * t + 0.12 * Math.sin(Math.PI * t)), l = HA[2] + (HB[2] - HA[2]) * t;
    l = Math.max(0.12, Math.min(0.8, l + (dl || 0)));
    return 'hsl(' + h.toFixed(1) + ',' + (s * 100).toFixed(1) + '%,' + (l * 100).toFixed(1) + '%)';
  }
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
  // Where the breath is at t seconds into the loop: the part, how far through it, the ring's size (0 to 1), and its warmth
  // (0 the in breath color, 1 the out breath color). Each part starts where the last one ended.
  function stateAt(P, t) {
    var T = 0, i; for (i = 0; i < P.length; i++) T += P[i].d;
    if (!P.length || !(T > 0)) return { i: 0, k: 'in', p: 0, el: 0, size: 0, warm: 1 };
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
    return { i: 0, k: k0, p: 0, el: 0, size: lv, warm: wm };
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
  function el(tag, a, p) { var e = document.createElementNS(NS, tag); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  /* ---------- Breath Shapes (BLD 989) ---------- */
  // Each shape is one path per part (a side and the corner after it), in the ring's 240 by 240 box, with a place for each side's
  // word ([x, y, rotate, anchor]) and the count.
  function pt(a, b, d) { var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.sqrt(dx * dx + dy * dy); return [a[0] + dx * d / L, a[1] + dy * d / L]; }
  function f(p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }
  var SHAPE = {
    box: { k: ['in', 'hold', 'out', 'rest'], segs: ['M48 30 H192 A18 18 0 0 1 210 48', 'M210 48 V192 A18 18 0 0 1 192 210', 'M192 210 H48 A18 18 0 0 1 30 192', 'M30 192 V48 A18 18 0 0 1 48 30'],
      lab: [[120, 17, 0, 'middle'], [229, 120, 90, 'middle'], [120, 236, 0, 'middle'], [11, 120, -90, 'middle']], num: [120, 136] },
    tri: (function () {
      var L = [40, 54], R = [200, 54], B = [120, 202], r = 15, a = pt(B, L, r), b = pt(L, B, r), c = pt(L, R, r), d = pt(R, L, r), e = pt(R, B, r), g = pt(B, R, r);
      return { k: ['in', 'hold', 'out'], segs: ['M' + f(a) + ' L' + f(b) + ' Q' + f(L) + ' ' + f(c), 'M' + f(c) + ' L' + f(d) + ' Q' + f(R) + ' ' + f(e), 'M' + f(e) + ' L' + f(g) + ' Q' + f(B) + ' ' + f(a)],
        lab: [[63, 136, 61.6, 'middle'], [120, 38, 0, 'middle'], [177, 136, -61.6, 'middle']], num: [120, 112] };
    })(),
    sigh: { k: ['in', 'sip', 'out'], segs: ['M22 196 C58 196 80 100 106 86', 'M106 86 C116 80 122 66 138 66', 'M138 66 C176 66 190 196 222 196'],
      lab: [[56, 226, 0, 'middle'], [122, 50, 0, 'middle'], [190, 226, 0, 'middle']], num: [126, 172], open: true }
  };
  function shapeOf(svg, P) {
    var n = svg.getAttribute('data-shape'), S = SHAPE[n]; if (!S || P.length !== S.k.length) return null;
    for (var i = 0; i < P.length; i++) { var k = P[i].k; if (k !== S.k[i] && !(S.k[i] === 'rest' && k === 'hold') && !(S.k[i] === 'hold' && k === 'sip' && n !== 'sigh')) return null; }
    return n;
  }
  function buildShape(svg, S, nm) {
    var G = SHAPE[nm], dk = S.dk, opt = ' ' + (svg.getAttribute('data-opt') || '') + ' ', sw = String(svg.getAttribute('data-sw') || '').split('|');
    S.shape = nm; S.sw = sw; S.segs = []; S.cum = [0];
    var all = G.segs.map(function (d, i) { return i ? d.replace(/^M[^A-Za-z]+/, '') : d; }).join(' ');
    el('path', { d: all, fill: 'none', stroke: dk ? 'rgba(243,237,227,.2)' : '#EADFCB', 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    S.trail = el('path', { d: all, fill: 'none', 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'class': 'ggbr-trail' }, svg);
    G.segs.forEach(function (d) { var p = el('path', { d: d, fill: 'none', stroke: 'none' }, svg); S.segs.push(p); });
    var tot = 0; S.segs.forEach(function (p) { tot += p.getTotalLength(); S.cum.push(tot); }); S.len = S.trail.getTotalLength() || tot;
    S.trail.setAttribute('stroke-dasharray', S.len.toFixed(1) + ' ' + (S.len + 20).toFixed(1));
    S.ghosts = [];
    if (!S.red) for (var g = 0; g < 4; g++) S.ghosts.push(el('circle', { r: 7 - g, opacity: 0, 'class': 'ggbr-ghost' }, svg));
    S.halo = el('circle', { r: 17, opacity: S.red ? 0 : 0.28, 'class': 'ggbr-glow' }, svg);
    S.dot = el('circle', { r: 9, 'class': 'ggbr-dot', 'data-ggbr-dot': '' }, svg);
    S.labs = G.lab.map(function (L, i) {
      var w = sw[i] || WORD[G.k[i] === 'rest' && S.P[i] && S.P[i].k === 'hold' ? 'hold' : G.k[i]] || '';
      var a = { x: L[0], y: L[1], 'text-anchor': L[3], 'dominant-baseline': 'middle', 'font-size': 15, 'font-family': "'Barlow Condensed', 'Arial Narrow', sans-serif", 'font-weight': 600, 'letter-spacing': '1.5', fill: dk ? 'rgba(243,237,227,.82)' : '#6B5A4D', 'class': 'ggbr-lab' };
      if (L[2]) a.transform = 'rotate(' + L[2] + ' ' + L[0] + ' ' + L[1] + ')';
      var t = el('text', a, svg); t.textContent = String(w).toUpperCase(); return t;
    });
    S.num = el('text', { x: G.num[0], y: G.num[1], 'text-anchor': 'middle', 'font-size': 44, 'font-family': 'Barlow, system-ui, sans-serif', 'font-weight': 300, fill: dk ? '#F3EDE3' : '#2C1810', 'class': 'ggbr-n' }, svg);
    if (opt.indexOf(' w ') >= 0) S.say = el('text', { x: 120, y: 278, 'text-anchor': 'middle', 'font-size': 30, 'font-family': "'Barlow Condensed', 'Arial Narrow', sans-serif", 'font-weight': 700, 'letter-spacing': '3', 'class': 'ggbr-say' }, svg);
    svg.setAttribute('data-drawn', nm);
    return S;
  }
  // The dot's place along the shape for a part and how far through it (a soft start and finish on each side).
  function drawShape(svg, S, ph, t) {
    var lift = S.dk ? 0.09 : 0, c = blend(ph.warm, lift), i = Math.max(0, Math.min(S.segs.length - 1, ph.i)), p = t == null ? 0 : ph.p;
    if (S.red && t != null) p = Math.min(1, Math.floor(ph.el + 1e-6) / Math.max(1, Math.ceil(ph.d - 1e-6)));
    var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2, seg = S.segs[i], sl = S.cum[i + 1] - S.cum[i];
    var q = seg.getPointAtLength(e * sl), at = S.cum[i] + e * sl;
    S.dot.setAttribute('cx', q.x.toFixed(2)); S.dot.setAttribute('cy', q.y.toFixed(2)); S.dot.setAttribute('fill', c);
    S.halo.setAttribute('cx', q.x.toFixed(2)); S.halo.setAttribute('cy', q.y.toFixed(2)); S.halo.setAttribute('fill', c);
    S.trail.setAttribute('stroke', c); S.trail.setAttribute('stroke-dashoffset', (S.len - at * S.len / S.cum[S.cum.length - 1]).toFixed(2));
    S.trail.setAttribute('opacity', at > 0.5 ? 1 : 0);
    // the glow trail: a few soft dots just behind the moving one
    S.ghosts.forEach(function (g, k) { var b = Math.max(0, e * sl - (k + 1) * 7), r = seg.getPointAtLength(b); g.setAttribute('cx', r.x.toFixed(2)); g.setAttribute('cy', r.y.toFixed(2)); g.setAttribute('fill', c); g.setAttribute('opacity', (e * sl > (k + 1) * 7 && p < 0.995 ? 0.32 - k * 0.07 : 0).toFixed(2)); });
    S.labs.forEach(function (L, k) { L.setAttribute('opacity', k === i && t != null ? 1 : 0.62); L.setAttribute('fill', k === i && t != null ? (S.dk ? c : blend(ph.warm, -0.24)) : S.dk ? 'rgba(243,237,227,.72)' : '#6B5A4D'); });
    svg.setAttribute('data-x', q.x.toFixed(1)); svg.setAttribute('data-y', q.y.toFixed(1)); svg.setAttribute('data-i', String(i));
  }
  function build(svg) {
    var id = 'ggbr' + (++N), dk = tone(svg), defs = el('defs', {}, svg), opt = ' ' + (svg.getAttribute('data-opt') || '') + ' ';
    var halo = el('radialGradient', { id: id + 'h' }, defs), fill = el('radialGradient', { id: id + 'f', cx: '50%', cy: '42%', r: '60%' }, defs);
    var S = {
      dk: dk, red: reduced(), w: opt.indexOf(' w ') >= 0, c: opt.indexOf(' c ') >= 0, h: opt.indexOf(' h ') >= 0, lag: 0, clock: 0, last: 0, pi: null, pk: '', P: phases(svg.getAttribute('data-ph')),
      stops: [el('stop', { offset: '40%', 'stop-opacity': 0 }, halo), el('stop', { offset: '72%', 'stop-opacity': 0.38 }, halo), el('stop', { offset: '100%', 'stop-opacity': 0 }, halo),
        el('stop', { offset: '0%', 'stop-opacity': dk ? 0.1 : 0.06 }, fill), el('stop', { offset: '100%', 'stop-opacity': dk ? 0.38 : 0.26 }, fill)]
    };
    var nm = shapeOf(svg, S.P); if (nm) return buildShape(svg, S, nm);
    el('circle', { cx: 120, cy: 120, r: 104, fill: 'none', 'stroke-width': 1, 'stroke-dasharray': '2 6', stroke: dk ? 'rgba(243,237,227,.22)' : 'rgba(107,90,77,.3)' }, svg);
    S.gl = el('circle', { cx: 120, cy: 120, r: 80, fill: 'url(#' + id + 'h)', 'class': 'ggbr-glow' }, svg);
    S.body = el('circle', { cx: 120, cy: 120, r: 60, fill: 'url(#' + id + 'f)' }, svg);
    S.g1 = el('circle', { cx: 120, cy: 120, r: 30, fill: 'none', 'stroke-width': 1.2 }, svg);
    S.g2 = el('circle', { cx: 120, cy: 120, r: 45, fill: 'none', 'stroke-width': 1.2 }, svg);
    S.ring = el('circle', { cx: 120, cy: 120, r: 60, fill: 'none', 'stroke-width': dk ? 7 : 8, 'stroke-linecap': 'round', 'class': 'ggbr-ring', 'data-ggbr-r': '' }, svg);
    S.edge = el('path', { fill: 'none', 'stroke-width': dk ? 7 : 8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0 }, svg);
    S.num = el('text', { x: 120, y: 136, 'text-anchor': 'middle', 'font-size': 46, 'font-family': 'Barlow, system-ui, sans-serif', 'font-weight': 300, fill: dk ? '#F3EDE3' : '#2C1810', 'class': 'ggbr-n' }, svg);
    if (S.w) S.say = el('text', { x: 120, y: 278, 'text-anchor': 'middle', 'font-size': 30, 'font-family': "'Barlow Condensed', 'Arial Narrow', sans-serif", 'font-weight': 700, 'letter-spacing': '3', 'class': 'ggbr-say' }, svg);
    return S;
  }
  function tone(svg) { var t = svg.getAttribute('data-tone'); return t === 'dark' ? true : t === 'light' ? false : dark(); }
  // The clock for this ring, in seconds into its loop, or null while it waits.
  function timeOf(svg, S, now) {
    // BLD 989: data-at steps one part at a time (the plan's own pace for scenes with no breath clock)
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
  function draw(svg, now) {
    var S = svg.__ggbr; if (!S) { svg.__ggbr = S = build(svg); S.last = now; }
    var dt = Math.min(0.1, Math.max(0, (now - S.last) / 1000)); S.last = now; S.clock += dt;
    var t = timeOf(svg, S, now), ph = t == null ? stateAt(S.P, 0) : stateAt(S.P, t), red = S.red;
    if (S.shape) return drawRest(svg, S, ph, t, function () { drawShape(svg, S, ph, t); });
    var size = red ? 0.78 + 0.22 * ph.size : ph.size, lift = S.dk ? 0.09 : 0, c = blend(ph.warm, lift);
    S.lag += (size - S.lag) * Math.min(1, dt * 3.2);
    var r = 44 + 52 * size;
    S.ring.setAttribute('r', r.toFixed(2)); S.ring.setAttribute('stroke', c); S.body.setAttribute('r', r.toFixed(2));
    S.ring.setAttribute('data-k', ph.k); S.ring.setAttribute('data-size', size.toFixed(3));
    [S.g1, S.g2].forEach(function (g, i) { g.setAttribute('r', (r * (i ? 0.78 : 0.55)).toFixed(2)); g.setAttribute('stroke', c); g.setAttribute('opacity', ((0.18 + 0.14 * size) * (i ? 1 : 0.8)).toFixed(3)); });
    if (!red) {
      var d = ''; for (var a = 0; a <= 72; a++) { var th = a / 72 * Math.PI * 2, rr = r * (1 + 0.007 * Math.sin(3 * th + S.clock * 0.9) + 0.004 * Math.sin(5 * th - S.clock * 1.3));
        d += (a ? 'L' : 'M') + (120 + rr * Math.cos(th)).toFixed(2) + ' ' + (120 + rr * Math.sin(th)).toFixed(2); }
      S.edge.setAttribute('d', d + 'Z'); S.edge.setAttribute('stroke', c); S.edge.setAttribute('opacity', 1); S.ring.setAttribute('opacity', 0);
      S.gl.setAttribute('r', (r + 14 + 18 * S.lag).toFixed(2)); S.gl.setAttribute('opacity', (0.35 + 0.65 * S.lag).toFixed(3));
    } else { S.edge.setAttribute('opacity', 0); S.ring.setAttribute('opacity', 1); S.gl.setAttribute('r', (r + 20).toFixed(2)); S.gl.setAttribute('opacity', 0.5); }
    S.stops.forEach(function (s) { s.setAttribute('stop-color', c); });
    drawRest(svg, S, ph, t);
  }
  // Counts, the word under the ring or shape, and the chime (every look).
  function drawRest(svg, S, ph, t, shape) {
    if (shape) shape();
    var c = blend(ph.warm, S.dk ? 0.09 : 0);
    // Counts go up in each part: 1, 2, 3, each number fading in softly. Workout reps show the words only.
    if (S.c && t != null && ph.d >= 1.5) { var n = String(Math.min(Math.ceil(ph.d - 1e-6), Math.floor(ph.el) + 1)); if (S.num.textContent !== n) S.num.textContent = n; S.num.setAttribute('opacity', (Math.min(1, (ph.el % 1) * 4) * 0.9).toFixed(3)); }
    else if (S.num.textContent) S.num.textContent = '';
    if (S.say) { var wd = (S.sw && S.sw[ph.i]) || WORD[ph.k] || ''; if (S.say.textContent !== wd) S.say.textContent = wd; S.say.setAttribute('fill', S.dk ? c : blend(ph.warm, -0.24)); svg.setAttribute('data-word', wd); }
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
  // New rings start the loop on their own (the players redraw often); a quiet check catches any drawn while it rested.
  try {
    var mo = new MutationObserver(function () { if (!RAF && document.querySelector('svg.ggbr')) kick(); });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) { setInterval(function () { if (!RAF && document.querySelector('svg.ggbr')) kick(); }, 500); }
  try { document.addEventListener('visibilitychange', function () { if (!document.hidden) kick(); }); } catch (e) {}
  kick();
  window.GGBreathRing = { chimeOn: chimeOn, setChime: setChime, unlock: unlock, chime: chime, phases: phases, stateAt: stateAt, kick: kick, colors: { 'in': IN, out: OUT }, shapes: Object.keys(SHAPE), v: 'b989' };
})();
