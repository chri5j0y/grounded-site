/* =====================================================================
   GROUNDED . THE LIVING TODAY SCENE (shared, GWG BLD 756)
   The app's own painting (shared/heroes/<app>-wide.webp, and -phone.webp
   on narrow screens) with light that grows as the day is tended: soft
   morning mist lifts, warmth comes in, and after three parts the sun
   sends rays. A missed day rests in soft mist. It never wilts, droops,
   or goes bare. A few living touches drift through as the day is tended
   (Oak birds and its own oak leaves, and Birch, Maple, and Aspen each
   drift their own leaf shape (GWG BLD 758), Pine a soaring bird, Sequoia drifting seeds, Willow fireflies
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
    oak:     { w: { sun: [.50, .06], tree: [.70, .42], x: .72 }, p: { sun: [.16, .06], tree: [.58, .45], x: .55, y: 1, r: 1.25 }, touch: 'birds', touch2: 'leaves', leaf: ['#7E9B3C', '#97AE4C', '#6A8A32'] },
    birch:   { w: { sun: [.38, .27], tree: [.18, .30], x: .14 }, p: { sun: [.34, .23], tree: [.52, .52], x: .5, y: .78, r: .5625 }, touch: 'leaves', leaf: ['#9BD14A', '#C7E77A', '#7DB83A'] },
    maple:   { w: { sun: [.10, .30], tree: [.37, .45], x: .38 }, p: { sun: [.10, .20], tree: [.45, .45], x: .45, y: 1, r: 1.25 }, touch: 'leaves', leaf: ['#D2421E', '#E8742B', '#C7321A'] },
    aspen:   { w: { sun: [.18, .14], tree: [.36, .40], x: .38 }, p: { sun: [.15, .12], tree: [.45, .38], x: .45, y: 1, r: 1.25 }, touch: 'leaves', leaf: ['#E8B931', '#F2CD52', '#D9A21E'], flutter: 1 },
    pine:    { w: { sun: [.23, .25], tree: [.37, .55], x: .36 }, p: { sun: [.20, .25], tree: [.45, .55], x: .4, y: 1, r: 1.25 }, touch: 'soar' },
    sequoia: { w: { sun: [.875, .42], tree: [.25, .35], x: .3 }, p: { sun: [.85, .20], tree: [.5, .3], x: .5, y: 1, r: 1.25 }, touch: 'seeds' },
    willow:  { w: { sun: [.83, .72], tree: [.25, .45], x: .3 }, p: { sun: [.92, .55], tree: [.4, .45], x: .4, y: 1, r: 1.25 }, touch: 'fireflies', ray: .45 },
    grove:   { w: { sun: [.51, .20], tree: [.5, .7], x: .5 }, p: { sun: [.51, .18], tree: [.5, .75], x: .5, y: .62, r: .5625 }, touch: 'butterflies' }
  };
  var CAP = { birds: 4, leaves: 8, soar: 1, seeds: 10, fireflies: 9, butterflies: 5 };
  // Each leafy tree drifts its own leaf (GWG BLD 758): the outlines of shared/leaves/<tree>.svg,
  // centred, in the same 64 unit box, with each leaf's deeper edge color.
  var LEAF = {
    maple: { d: 'M9.9 -17.2L8.3 -10 10.8 -10.2 7.9 -4.9 5.9 0.3 12 -1.3 12 0 19.3 -0.6 15.8 3.3 17.1 4.9 12 6.9 6.5 9.3 9.8 12.8 8.9 13.4 10.8 17.2 6.2 16.6 3.5 15.3 -0.1 14.2 -2.7 11.5 -4.9 15.1 -8.8 13.1 -6.9 9.2 -10.7 8.6 -13.6 6.2 -16.2 4.7 -19.3 1.3 -15 0.7 -15 -0.4 -10.3 0.4 -11.3 -5.6 -12.5 -10.9 -10.5 -10.7 -9.2 -15.7 -5.6 -9.4 -4.6 -10 -2.4 -4.2 0.7 -8.7 3.5 -14.1 4.7 -11.9Z', e: 'rgba(143,42,16,.7)' },
    aspen: { d: 'M-11.6 14.2C-9.1 16.3 -4.5 17.6 -2.2 18.3C0.2 19.1 1.1 18.6 2.5 18.6C3.9 18.5 5.1 18.2 6.2 17.9C7.4 17.6 8.3 17.2 9.3 16.8C10.2 16.3 11 15.7 11.8 15.1C12.5 14.5 13.2 13.9 13.8 13.1C14.5 12.4 15 11.6 15.5 10.8C16 9.9 16.4 9 16.7 8.1C17.1 7.2 17.4 6.2 17.6 5.1C17.9 4.1 18.1 3 18.2 1.9C18.3 0.7 18.4 -0.5 18.4 -1.7C18.4 -3 18.3 -4.2 18.2 -5.6C18 -7 17.9 -8.3 17.3 -10C16.7 -11.8 16.2 -14.8 14.5 -16.2C12.8 -17.6 9.2 -18.1 7.2 -18.5C5.3 -18.9 4.2 -18.6 2.8 -18.6C1.4 -18.5 0.1 -18.3 -1.1 -18.1C-2.4 -17.9 -3.5 -17.6 -4.6 -17.3C-5.7 -17 -6.8 -16.6 -7.8 -16.2C-8.7 -15.8 -9.7 -15.3 -10.5 -14.8C-11.4 -14.3 -12.2 -13.7 -12.9 -13.1C-13.7 -12.4 -14.4 -11.8 -15 -11C-15.6 -10.3 -16.1 -9.5 -16.6 -8.7C-17.1 -7.8 -17.5 -6.9 -17.7 -5.9C-18 -4.9 -18.3 -3.9 -18.4 -2.7C-18.5 -1.6 -18.5 -0.4 -18.3 1C-18.2 2.4 -18.4 3.5 -17.3 5.6C-16.2 7.8 -14.1 12.1 -11.6 14.2Z', e: 'rgba(138,100,16,.7)' },
    birch: { d: 'M-11.6 15.4C-9.7 17 -6.2 17.3 -4 17.7C-1.8 18.2 -0.1 18.3 1.5 18.3C3.1 18.2 4.4 17.9 5.5 17.5C6.6 17.1 7.5 16.4 8.2 15.7C9 15 9.6 14.1 10.1 13.1C10.5 12.2 10.9 11.1 11.2 9.9C11.5 8.8 11.7 7.6 11.8 6.4C12 5.2 12.1 3.9 12.2 2.6C12.3 1.4 12.4 0.1 12.5 -1.2C12.6 -2.5 12.7 -3.8 12.8 -5.1C13 -6.3 13.1 -7.6 13.3 -8.8C13.5 -10 13.7 -11.1 14 -12.3C14.3 -13.4 14.7 -14.5 15.1 -15.5C15.5 -16.5 16.8 -18.1 16.7 -18.3C16.5 -18.4 15.1 -16.8 14.2 -16.2C13.3 -15.6 12.3 -15.1 11.2 -14.6C10.2 -14.1 9 -13.7 7.9 -13.3C6.8 -12.9 5.5 -12.6 4.3 -12.2C3.1 -11.9 1.9 -11.5 0.6 -11.2C-0.6 -10.9 -1.9 -10.6 -3.1 -10.3C-4.4 -9.9 -5.6 -9.6 -6.8 -9.2C-8 -8.8 -9.1 -8.4 -10.2 -8C-11.2 -7.5 -12.2 -6.9 -13.1 -6.3C-13.9 -5.6 -14.7 -4.9 -15.3 -4.1C-15.9 -3.2 -16.4 -2.2 -16.6 -1C-16.8 0.1 -16.9 1.4 -16.7 3C-16.4 4.6 -16 6.3 -15.2 8.3C-14.4 10.4 -13.5 13.9 -11.6 15.4Z', e: 'rgba(79,122,30,.7)' },
    oak: { d: 'M-12.9 16.1C-12.6 16.3 -12 15.9 -11.5 15.8C-11 15.8 -10.5 15.7 -10 15.7C-9.5 15.6 -8.9 15.6 -8.4 15.6C-7.9 15.5 -7.7 15.2 -6.8 15.5C-5.9 15.7 -4.1 16.8 -3.1 17.2C-2 17.5 -1.4 17.6 -0.7 17.7C0 17.8 0.7 17.9 1.3 17.9C1.9 17.9 2.4 17.9 2.8 17.8C3.2 17.7 3.6 17.5 3.9 17.3C4.1 17 4.3 16.7 4.4 16.3C4.5 15.8 4.5 15.4 4.3 14.8C4.2 14.1 3.5 13.1 3.4 12.5C3.2 11.9 3 11.2 3.5 11.2C4.1 11.2 5.8 12.1 6.6 12.4C7.5 12.6 8.2 12.7 8.8 12.7C9.4 12.8 9.9 12.7 10.3 12.6C10.7 12.5 11 12.3 11.3 12C11.5 11.7 11.7 11.3 11.7 10.9C11.8 10.5 11.7 10 11.6 9.4C11.5 8.8 11.3 8.2 10.9 7.4C10.5 6.6 9.4 5.1 9.3 4.6C9.2 4 9.8 4 10.3 4C10.9 4 12.1 4.5 12.8 4.6C13.4 4.7 13.9 4.6 14.3 4.5C14.8 4.4 15.1 4.2 15.3 3.9C15.6 3.6 15.7 3.3 15.8 2.9C15.9 2.5 15.9 2 15.9 1.5C15.8 0.9 15.7 0.3 15.5 -0.3C15.3 -0.9 15.1 -1.6 14.7 -2.4C14.3 -3.2 13.1 -4.7 13.1 -5.1C13.1 -5.6 14.2 -5.2 14.7 -5.3C15.2 -5.4 15.7 -5.4 16.1 -5.5C16.4 -5.7 16.7 -6 16.9 -6.3C17 -6.6 17.1 -7 17.2 -7.5C17.3 -7.9 17.3 -8.4 17.2 -8.9C17.2 -9.4 17.1 -9.9 17 -10.5C16.9 -11.1 16.8 -11.7 16.6 -12.3C16.5 -12.9 16.3 -13.5 16.1 -14.1C15.9 -14.7 15.6 -15.5 15.5 -16.1C15.4 -16.6 15.7 -17.4 15.4 -17.6C15.1 -17.8 14.5 -17.4 13.9 -17.4C13.3 -17.4 12.5 -17.6 11.9 -17.7C11.2 -17.8 10.6 -17.8 10 -17.9C9.3 -17.9 8.7 -17.9 8.1 -17.9C7.6 -17.9 7 -17.9 6.5 -17.9C6 -17.8 5.5 -17.7 5.1 -17.6C4.7 -17.5 4.3 -17.3 4.1 -17C3.8 -16.8 3.5 -16.5 3.4 -16.1C3.3 -15.7 3.4 -15.2 3.4 -14.7C3.5 -14.2 4 -13.3 3.6 -13.2C3.1 -13.1 1.5 -14 0.6 -14.2C-0.3 -14.5 -1 -14.6 -1.6 -14.6C-2.3 -14.7 -2.9 -14.7 -3.4 -14.7C-3.9 -14.7 -4.4 -14.6 -4.8 -14.4C-5.2 -14.3 -5.5 -14.1 -5.7 -13.8C-6 -13.5 -6.1 -13.1 -6.2 -12.7C-6.2 -12.3 -6.2 -11.8 -6 -11.1C-5.8 -10.5 -5.1 -9.4 -5 -8.8C-4.9 -8.3 -4.8 -7.7 -5.3 -7.7C-5.9 -7.7 -7.5 -8.6 -8.4 -8.8C-9.2 -9.1 -9.9 -9.1 -10.5 -9.2C-11.1 -9.2 -11.6 -9.1 -12 -9C-12.4 -8.9 -12.7 -8.7 -13 -8.4C-13.2 -8.1 -13.4 -7.7 -13.4 -7.3C-13.5 -6.9 -13.4 -6.4 -13.3 -5.8C-13.2 -5.2 -13 -4.5 -12.6 -3.7C-12.2 -2.9 -11 -1.4 -10.9 -0.9C-10.8 -0.3 -11.5 -0.5 -12.1 -0.5C-12.7 -0.5 -13.9 -1 -14.5 -1.1C-15.2 -1.1 -15.6 -1 -16 -0.9C-16.4 -0.7 -16.7 -0.5 -16.9 -0.2C-17.1 0.1 -17.2 0.5 -17.2 1C-17.3 1.4 -17.2 1.9 -17.1 2.5C-17 3.1 -16.8 3.7 -16.6 4.4C-16.3 5.1 -16.2 5.7 -15.6 6.6C-15.1 7.6 -13.7 9.2 -13.3 10C-12.9 10.9 -13.2 11.1 -13.1 11.6C-13 12.2 -13 12.7 -12.9 13.2C-12.9 13.7 -12.8 14.2 -12.8 14.7C-12.8 15.2 -13.1 15.9 -12.9 16.1Z', e: 'rgba(63,85,32,.7)' }
  };
  var PATHS = {};
  function leafPath(a) {
    if (!LEAF[a] || typeof Path2D === 'undefined') return null;
    if (!PATHS[a]) { try { PATHS[a] = new Path2D(LEAF[a].d); } catch (e) { PATHS[a] = null; } }
    return PATHS[a];
  }
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
    + '.gl-paint{position:absolute;inset:-2px;background-image:var(--gl-wide);background-size:cover;background-repeat:no-repeat;background-position:var(--gl-wx,50%) 100%;transition:filter 1.6s ease;}'
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
    var a = sc.getAttribute('data-app'), A = APPS[a] || APPS.oak, W = sc.clientWidth, H = sc.clientHeight, R = Math.random, t = A.touch2 && R() < .5 ? A.touch2 : A.touch;
    if (items.filter(function (o) { return o.t === t; }).length >= CAP[t]) return;
    var tree = place(sc, 'tree') || { x: W / 2, y: H / 2 };
    if (t === 'birds') items.push({ t: t, x: -20, y: H * (.1 + R() * .22), v: .5 + R() * .4, p: R() * 6, s: .8 + R() * .4 });
    else if (t === 'soar') items.push({ t: t, x: -40, y: H * (.12 + R() * .12), v: .35, p: R() * 6, s: 1.2 });
    else if (t === 'leaves') items.push({ t: t, x: tree.x + (R() - .5) * W * .16, y: tree.y - H * .08 + R() * H * .12, v: .35 + R() * .35, p: R() * 6, r: R() * 6, c: A.leaf[Math.floor(R() * A.leaf.length)], f: A.flutter ? 1 : 0, gy: H * (.86 + R() * .1), sh: a, k: .2 + R() * .08 });
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
      var lp = leafPath(o.sh);
      if (lp) { cx.scale(o.k, o.k); cx.fillStyle = o.c; cx.strokeStyle = LEAF[o.sh].e; cx.lineWidth = 1.6; cx.lineJoin = 'round'; cx.fill(lp); cx.stroke(lp); }
      else { cx.fillStyle = o.c; cx.strokeStyle = 'rgba(40,30,10,.25)'; cx.lineWidth = .6; cx.beginPath(); cx.ellipse(0, 0, 6, 3, 0, 0, 7); cx.fill(); cx.stroke(); }
      cx.restore(); return !o.rest || o.rest < 90;
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

  /* ---------- the leaves stylesheet (GWG BLD 758) ---------- */
  // Willow and The Grove load this file on their own, so it adds shared/gg-leaves.css
  // (next to this file, same version) and names the app's tree for it.
  (function () {
    var r = document.documentElement, seg = (location.pathname.split('/').filter(Boolean)[0] || '').toLowerCase();
    if (!r.getAttribute('data-gg-tree') && APPS[seg]) r.setAttribute('data-gg-tree', seg);
    if (document.getElementById('gg-leaves-css')) return;
    var c = document.currentScript, src = c && c.src ? c.src : '/shared/gg-living.js';
    var l = document.createElement('link'); l.id = 'gg-leaves-css'; l.rel = 'stylesheet'; l.href = src.replace(/gg-living\.js/, 'gg-leaves.css');
    (document.head || document.documentElement).appendChild(l);
  })();

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
