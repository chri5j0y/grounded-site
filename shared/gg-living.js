/* =====================================================================
   GROUNDED . THE LIVING TODAY SCENE (shared, GWG BLD 756)
   The app's own painting (shared/heroes/<app>-wide.webp, and -phone.webp
   on narrow screens) with light that grows as the day is tended: soft
   morning mist lifts, warmth comes in, and after three parts the sun
   sends rays. A missed day rests in soft mist. It never wilts, droops,
   or goes bare. A few living touches drift through as the day is tended
   (Oak birds, Birch fresh green leaves, Maple red leaves, Aspen golden
   leaves, Pine a soaring bird, Sequoia drifting seeds, Willow fireflies
   at dusk, The Grove butterflies). Reduced motion turns the touches and
   the rays off.

   gg-tend.js loads this file for the tree apps. Willow and The Grove can
   load it on their own Today too.

   For tools
     GGLiving.html(o)   the scene's markup. o = { app, light: 0 to 1,
                        still: true holds it still (Rest Week), label }
     GGLiving.mount()   starts the living touches on the scene showing
                        (call after the markup is in the page; safe to
                        call on every redraw, touches carry over)
     GGLiving.burst(n)  a few touches after a practice is tended
     GGLiving.svg(app, light, label)  a small still picture of the scene
                        (for a grown-up's view of a child's tree)
     GGLiving.reduced() true when motion is turned down (the device's
                        setting, or html.gg-reduce-motion, or
                        html[data-motion="reduce"])
   Nothing here reads or saves anything about a person.
   ===================================================================== */
(function () {
  if (window.GGLiving) return;
  var HERO = '/shared/heroes/';
  // Image sizes: wide 2000x800; phone 900x720 (Birch and The Grove 900x1600).
  // sun and tree are where they sit in each image, as shares of its width and height.
  // wx: how the wide image is placed side to side; px, py: the phone image.
  var APPS = {
    oak:     { w: { sun: [.50, .06], tree: [.70, .42], x: .72 }, p: { sun: [.16, .06], tree: [.58, .45], x: .55, y: 1, r: 1.25 }, touch: 'birds' },
    birch:   { w: { sun: [.38, .27], tree: [.18, .30], x: .14 }, p: { sun: [.34, .23], tree: [.52, .52], x: .5, y: .78, r: .5625 }, touch: 'leaves', leaf: ['#9BD14A', '#C7E77A', '#7DB83A'] },
    maple:   { w: { sun: [.10, .30], tree: [.37, .45], x: .38 }, p: { sun: [.10, .20], tree: [.45, .45], x: .45, y: 1, r: 1.25 }, touch: 'leaves', leaf: ['#D2421E', '#E8742B', '#C7321A'] },
    aspen:   { w: { sun: [.18, .14], tree: [.36, .40], x: .38 }, p: { sun: [.15, .12], tree: [.45, .38], x: .45, y: 1, r: 1.25 }, touch: 'leaves', leaf: ['#E8B931', '#F2CD52', '#D9A21E'], flutter: 1 },
    pine:    { w: { sun: [.23, .25], tree: [.37, .55], x: .36 }, p: { sun: [.20, .25], tree: [.45, .55], x: .4, y: 1, r: 1.25 }, touch: 'soar' },
    sequoia: { w: { sun: [.875, .42], tree: [.25, .35], x: .3 }, p: { sun: [.85, .20], tree: [.5, .3], x: .5, y: 1, r: 1.25 }, touch: 'seeds' },
    willow:  { w: { sun: [.83, .72], tree: [.25, .45], x: .3 }, p: { sun: [.92, .55], tree: [.4, .45], x: .4, y: 1, r: 1.25 }, touch: 'fireflies', ray: .45 },
    grove:   { w: { sun: [.51, .20], tree: [.5, .7], x: .5 }, p: { sun: [.51, .18], tree: [.5, .75], x: .5, y: .62, r: .5625 }, touch: 'butterflies' }
  };
  var CAP = { birds: 4, leaves: 8, soar: 1, seeds: 10, fireflies: 9, butterflies: 5 };
  function app(a) { return APPS[a] ? a : 'oak'; }
  function clamp(n) { return Math.max(0, Math.min(1, +n || 0)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function reduced() {
    var r = document.documentElement;
    if (r.classList.contains('gg-reduce-motion') || r.getAttribute('data-motion') === 'reduce') return true;
    return !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  /* ---------- styles, added once ---------- */
  var CSS = ''
    + '.gl-scene{position:relative;overflow:hidden;aspect-ratio:2.2/1;background:#CFD9E2;border-radius:14px 14px 0 0;isolation:isolate;--gl-dim:1;}'
    + '.gl-scene[data-app="grove"]{aspect-ratio:2.5/1;}'   // The Grove shows its whole painting, all seven trees, never cropped at the sides
    + '@media (max-width:600px){.gl-scene,.gl-scene[data-app="grove"]{aspect-ratio:1/1;}}'
    + '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .gl-scene{--gl-dim:.86;background:#2A3036;}}'
    + ':root[data-theme="dark"] .gl-scene{--gl-dim:.86;background:#2A3036;}'
    + '.gl-paint{position:absolute;inset:0;background-image:var(--gl-wide);background-size:cover;background-repeat:no-repeat;background-position:var(--gl-wx,50%) 100%;transition:filter 1.6s ease;}'
    + '@media (max-width:600px){.gl-paint{background-image:var(--gl-phone);background-position:var(--gl-px,50%) var(--gl-py,100%);}}'
    + '.gl-mist,.gl-warm,.gl-rays{position:absolute;pointer-events:none;}'
    + '.gl-mist{inset:0;transition:opacity 1.8s ease;background:linear-gradient(180deg,rgba(236,240,244,.6),rgba(226,232,238,.38) 55%,rgba(230,234,238,.62));}'
    + '.gl-mist::before,.gl-mist::after{content:"";position:absolute;left:-30%;width:160%;height:40%;background:radial-gradient(ellipse at center,rgba(245,247,250,.75),rgba(245,247,250,0) 65%);animation:glDrift 26s ease-in-out infinite alternate;}'
    + '.gl-mist::before{top:45%;}.gl-mist::after{top:62%;animation-duration:34s;animation-direction:alternate-reverse;}'
    + '@keyframes glDrift{from{transform:translateX(-6%)}to{transform:translateX(6%)}}'
    + '.gl-warm{inset:0;transition:opacity 1.6s ease;background:radial-gradient(ellipse at var(--gl-sx,30%) var(--gl-sy,25%),rgba(255,214,140,.75),rgba(255,200,120,.25) 30%,rgba(255,190,110,0) 60%);mix-blend-mode:soft-light;}'
    + '.gl-rays{inset:-20%;transition:opacity 1.6s ease;background:repeating-conic-gradient(from 200deg at var(--gl-rx,30%) var(--gl-ry,25%),rgba(255,240,200,.16) 0deg 3deg,rgba(255,240,200,0) 3deg 11deg);'
    + '-webkit-mask-image:radial-gradient(circle at var(--gl-rx,30%) var(--gl-ry,25%),#000 0,transparent 55%);mask-image:radial-gradient(circle at var(--gl-rx,30%) var(--gl-ry,25%),#000 0,transparent 55%);animation:glTurn 60s linear infinite alternate;}'
    + '@keyframes glTurn{to{transform:rotate(6deg)}}'
    + '.gl-scene.gl-still .gl-rays,.gl-scene.gl-still .gl-mist::before,.gl-scene.gl-still .gl-mist::after{animation:none;}'
    + '.gl-fx{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}'
    + '.gl-glow{position:absolute;inset:0;pointer-events:none;opacity:0;background:radial-gradient(ellipse at var(--gl-sx,30%) var(--gl-sy,25%),rgba(255,236,190,.55),rgba(255,236,190,0) 55%);}'
    + '.gl-scene.gl-perk .gl-glow{animation:glPerk 1.4s ease-out;}'
    + '@keyframes glPerk{0%{opacity:0}30%{opacity:1}100%{opacity:0}}'
    + '@media (prefers-reduced-motion:reduce){.gl-rays,.gl-fx{display:none;}.gl-mist::before,.gl-mist::after,.gl-scene.gl-perk .gl-glow{animation:none;}.gl-paint,.gl-mist,.gl-warm{transition:none;}}'
    + 'html.gg-reduce-motion .gl-rays,html.gg-reduce-motion .gl-fx,html[data-motion="reduce"] .gl-rays,html[data-motion="reduce"] .gl-fx{display:none;}'
    + 'html.gg-reduce-motion .gl-mist::before,html.gg-reduce-motion .gl-mist::after,html[data-motion="reduce"] .gl-mist::before,html[data-motion="reduce"] .gl-mist::after{animation:none;}'
    + '.gl-mini{width:100%;height:auto;display:block;border-radius:12px;}';
  function style() {
    if (document.getElementById('gl-style')) return;
    var st = document.createElement('style'); st.id = 'gl-style'; st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  /* ---------- the scene ---------- */
  var NOW = { app: 'oak', light: .55, still: false };
  function html(o) {
    style();
    o = o || {}; var a = app(o.app), L = clamp(o.light == null ? .55 : o.light), still = !!o.still;
    NOW = { app: a, light: L, still: still };
    var A = APPS[a];
    var paint = 'saturate(' + (0.62 + 0.5 * L).toFixed(2) + ') brightness(calc(' + (0.88 + 0.16 * L).toFixed(2) + ' * var(--gl-dim)))';
    var mist = still ? 0 : Math.max(0, 1 - L * 1.6), warm = L * 0.9, rays = still ? 0 : Math.max(0, (L - 0.5) * 2) * (A.ray || 1);
    return '<div class="gl-scene' + (still ? ' gl-still' : '') + '" id="gl-scene" data-app="' + a + '" role="img" aria-label="' + esc(o.label || '') + '"'
      + ' style="--gl-wide:url(' + HERO + a + '-wide.webp);--gl-phone:url(' + HERO + a + '-phone.webp);--gl-wx:' + Math.round(A.w.x * 100) + '%;--gl-px:' + Math.round(A.p.x * 100) + '%;--gl-py:' + Math.round(A.p.y * 100) + '%">'
      + '<div class="gl-paint" style="filter:' + paint + '"></div>'
      + '<div class="gl-mist" style="opacity:' + mist.toFixed(2) + '"></div>'
      + '<div class="gl-warm" style="opacity:' + warm.toFixed(2) + '"></div>'
      + '<div class="gl-rays" style="opacity:' + rays.toFixed(2) + '"></div>'
      + '<div class="gl-glow"></div>'
      + '<canvas class="gl-fx" aria-hidden="true"></canvas></div>';
  }
  // Where a spot in the image lands in the scene, for background-size: cover.
  function place(sc, pt) {
    var W = sc.clientWidth, H = sc.clientHeight; if (!W || !H) return null;
    var A = APPS[sc.getAttribute('data-app')] || APPS.oak, phone = window.matchMedia && matchMedia('(max-width:600px)').matches;
    var r = phone ? A.p.r : 2.5, k = phone ? A.p : A.w;
    var s = Math.max(W / r, H), iw = s * r, ih = s;               // the image's drawn size
    var ox = (W - iw) * (phone ? A.p.x : A.w.x), oy = (H - ih) * (phone ? A.p.y : 1);
    var p = pt === 'tree' ? k.tree : k.sun;
    return { x: ox + p[0] * iw, y: oy + p[1] * ih, W: W, H: H };
  }
  function aim(sc) {
    var p = place(sc, 'sun'); if (!p) return;
    sc.style.setProperty('--gl-sx', Math.round(p.x) + 'px'); sc.style.setProperty('--gl-sy', Math.round(p.y) + 'px');
    // the rays layer is 140 percent of the scene, offset by 20 percent
    sc.style.setProperty('--gl-rx', Math.round(p.x + p.W * .2) + 'px'); sc.style.setProperty('--gl-ry', Math.round(p.y + p.H * .2) + 'px');
  }

  /* ---------- living touches ---------- */
  var items = [], running = false, last = 0, want = 0;
  function scene() { var sc = document.getElementById('gl-scene'); return sc && sc.isConnected ? sc : null; }
  function spawn(sc) {
    var A = APPS[sc.getAttribute('data-app')] || APPS.oak, W = sc.clientWidth, H = sc.clientHeight, R = Math.random, t = A.touch;
    if (items.filter(function (o) { return o.t === t; }).length >= CAP[t]) return;
    var tree = place(sc, 'tree') || { x: W / 2, y: H / 2 };
    if (t === 'birds') items.push({ t: t, x: -20, y: H * (.1 + R() * .22), v: .5 + R() * .4, p: R() * 6, s: .8 + R() * .4 });
    else if (t === 'soar') items.push({ t: t, x: -40, y: H * (.12 + R() * .12), v: .35, p: R() * 6, s: 1.2 });
    else if (t === 'leaves') items.push({ t: t, x: tree.x + (R() - .5) * W * .16, y: tree.y - H * .08 + R() * H * .12, v: .35 + R() * .35, p: R() * 6, r: R() * 6, c: A.leaf[Math.floor(R() * A.leaf.length)], f: A.flutter ? 1 : 0, gy: H * (.86 + R() * .1) });
    else if (t === 'seeds') items.push({ t: t, x: R() * W, y: H * (.25 + R() * .5), v: .15 + R() * .2, p: R() * 6, life: 0 });
    else if (t === 'fireflies') items.push({ t: t, x: W * (.08 + R() * .84), y: H * (.45 + R() * .45), v: .2, p: R() * 6, life: 0 });
    else items.push({ t: 'butterflies', x: W * (.15 + R() * .7), y: H * (.6 + R() * .3), v: .4, p: R() * 6, life: 0, c: ['#F2C14E', '#F7F2E8', '#E9A3B8', '#9EC9F0'][Math.floor(R() * 4)] });
  }
  function draw(cx, o, W, H) {
    o.p += 0.04;
    if (o.t === 'birds') { o.x += o.v * 1.3; o.y += Math.sin(o.p) * .25; var w = Math.sin(o.p * 3) * 4 * o.s; cx.strokeStyle = 'rgba(40,40,45,.72)'; cx.lineWidth = 1.5; cx.beginPath(); cx.moveTo(o.x - 7 * o.s, o.y - w); cx.quadraticCurveTo(o.x - 3 * o.s, o.y - 2, o.x, o.y); cx.quadraticCurveTo(o.x + 3 * o.s, o.y - 2, o.x + 7 * o.s, o.y - w); cx.stroke(); return o.x < W + 40; }
    if (o.t === 'soar') { o.x += o.v; o.y += Math.sin(o.p * .5) * .18; var g = Math.sin(o.p * .7) * 1.6; cx.strokeStyle = 'rgba(52,44,38,.7)'; cx.lineWidth = 1.8; cx.beginPath(); cx.moveTo(o.x - 13, o.y - 2 - g); cx.quadraticCurveTo(o.x - 6, o.y - 4, o.x, o.y); cx.quadraticCurveTo(o.x + 6, o.y - 4, o.x + 13, o.y - 2 - g); cx.stroke(); return o.x < W + 60; }
    if (o.t === 'leaves') {
      if (o.y < o.gy) { o.y += o.v; o.x += Math.sin(o.p) * .7; o.r += o.f ? .09 : .03; } else o.rest = (o.rest || 0) + 1;
      cx.save(); cx.globalAlpha = o.rest ? Math.max(0, 1 - o.rest / 90) : 1; cx.translate(o.x, o.y); cx.rotate(o.r); if (o.f) cx.scale(1, Math.abs(Math.sin(o.p * 2)) * .6 + .4);
      cx.fillStyle = o.c; cx.strokeStyle = 'rgba(40,30,10,.25)'; cx.lineWidth = .6; cx.beginPath(); cx.ellipse(0, 0, 6, 3, 0, 0, 7); cx.fill(); cx.stroke(); cx.restore(); return !o.rest || o.rest < 90;
    }
    o.life++;
    var fade = Math.min(1, o.life / 40, Math.max(0, (900 - o.life) / 60));
    if (o.t === 'seeds') { o.x += o.v + Math.sin(o.p) * .2; o.y += Math.cos(o.p * .8) * .15 - .03; cx.fillStyle = 'rgba(255,246,220,' + (.75 * fade).toFixed(2) + ')'; cx.beginPath(); cx.arc(o.x, o.y, 1.6, 0, 7); cx.fill(); cx.strokeStyle = 'rgba(255,246,220,' + (.4 * fade).toFixed(2) + ')'; cx.lineWidth = .8; cx.beginPath(); cx.moveTo(o.x, o.y); cx.lineTo(o.x - 3, o.y - 3); cx.moveTo(o.x, o.y); cx.lineTo(o.x + 3, o.y - 3); cx.stroke(); return o.x < W + 10 && o.life < 900; }
    if (o.t === 'fireflies') { o.x += Math.cos(o.p * .6) * .35; o.y += Math.sin(o.p * .9) * .25; var b = (Math.sin(o.p * 1.3) * .5 + .5) * fade; var gr = cx.createRadialGradient(o.x, o.y, 0, o.x, o.y, 7); gr.addColorStop(0, 'rgba(255,240,150,' + (.9 * b).toFixed(2) + ')'); gr.addColorStop(1, 'rgba(255,240,150,0)'); cx.fillStyle = gr; cx.beginPath(); cx.arc(o.x, o.y, 7, 0, 7); cx.fill(); return o.life < 900; }
    o.x += Math.cos(o.p * .7) * .8; o.y += Math.sin(o.p) * .6 - .12; var s = Math.abs(Math.sin(o.p * 5)) * 4 + 1; cx.globalAlpha = fade; cx.fillStyle = o.c; cx.beginPath(); cx.ellipse(o.x - s / 2, o.y, s, 3.6, 0, 0, 7); cx.ellipse(o.x + s / 2, o.y, s, 3.6, 0, 0, 7); cx.fill(); cx.globalAlpha = 1; return o.y > -20 && o.life < 900;
  }
  function frame(t) {
    var sc = scene();
    if (!sc || reduced() || sc.classList.contains('gl-still')) { running = false; items = []; if (sc) { var c0 = sc.querySelector('.gl-fx'); if (c0) c0.getContext('2d').clearRect(0, 0, c0.width, c0.height); } return; }
    var cv = sc.querySelector('.gl-fx'), W = sc.clientWidth, H = sc.clientHeight;
    if (!cv || !W || document.hidden) { requestAnimationFrame(frame); return; }
    var dpr = window.devicePixelRatio || 1;
    if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
    var cx = cv.getContext('2d'); cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.clearRect(0, 0, W, H);
    // a gentle, sparse stream while the day is tended: more often with more parts, never crowded
    if (want > 0 && t - last > 3200 / Math.min(want, 4)) { last = t; spawn(sc); }
    items = items.filter(function (o) { return draw(cx, o, W, H); });
    requestAnimationFrame(frame);
  }
  function mount(o) {
    var sc = scene(); if (!sc) return;
    want = o && o.done != null ? +o.done : want;
    aim(sc);
    if (!running && !reduced() && !sc.classList.contains('gl-still')) { running = true; requestAnimationFrame(frame); }
  }
  function burst(n) {
    var sc = scene(); if (!sc) return;
    sc.classList.remove('gl-perk'); void sc.offsetWidth; sc.classList.add('gl-perk');
    if (reduced() || sc.classList.contains('gl-still')) return;
    for (var i = 0; i < (n || 2); i++) setTimeout(function () { var s2 = scene(); if (s2) spawn(s2); }, i * 380);
    mount();
  }
  window.addEventListener('resize', function () { var sc = scene(); if (sc) aim(sc); });

  /* ---------- a small still picture ---------- */
  function svg(a, light, label) {
    a = app(a); var L = clamp(light), mist = Math.max(0, 1 - L * 1.6);
    return '<svg class="gt-tree-svg gl-mini" viewBox="0 0 320 256" role="img" aria-label="' + esc(label || '') + '" xmlns="http://www.w3.org/2000/svg">'
      + '<image href="' + HERO + a + '-phone.webp" x="0" y="0" width="320" height="256" preserveAspectRatio="xMidYMax slice"/>'
      + '<rect width="320" height="256" fill="#ECF0F4" opacity="' + (mist * .55).toFixed(2) + '"/>'
      + '<rect width="320" height="256" fill="#FFD68C" opacity="' + (L * .12).toFixed(2) + '"/></svg>';
  }

  window.GGLiving = { html: html, mount: mount, burst: burst, svg: svg, reduced: reduced, apps: Object.keys(APPS) };
})();
