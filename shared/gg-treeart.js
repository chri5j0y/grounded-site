/* =====================================================================
   GROUNDED . THE TREE ART (shared, GWG BLD 780)
   The app's own painting (shared/heroes/<app>-wide.webp, and -phone.webp
   on screens 600 wide or less, the same paintings Today shows) with six
   glowing markers on Roots, Trunk, Bark, Branches, Leaves, and Fruit.
   It replaces the old drawn tree in How it works, Results, and Season.

   Three views
     GGTreeArt.howItWorks(el, o)  the painting with six glowing, tappable
                                  markers, a card for the chosen part, and
                                  a row of chips (one per part).
     GGTreeArt.results(el, o)     each part's marker by result: Strong a full
                                  warm glow, Steady a soft glow, Growing Edge
                                  a new green light, Not sure yet a faint
                                  light. A list in words beside it. Never
                                  numbers, never wilted or bare.
     GGTreeArt.growth(el, o)      Then and Now: an earlier check-in, softly
                                  misty, beside the latest, one kind line
                                  naming what grew, a growth ring for each
                                  check-in (tap one to compare that season),
                                  and the level as a small badge on the
                                  painting. With no check-ins yet: a kind
                                  line and the painting, no made-up history.

   el: an element to draw into, or null to get the markup back as a string
   (for templates such as GGTend's seasonExtra). Either way every button
   works: clicks are handled once for the whole page, and each view redraws
   itself when the screen crosses 600 wide (wide painting to phone painting).
   Every function returns the markup.

   Options (o)
     app       'oak', 'pine', 'birch', 'sequoia', or any app in POS
     parts     [{key, name, tag, text}] in the order to show (key is one of
               roots, trunk, bark, branches, leaves, fruit; name 'Roots';
               tag the meaning, 'What grounds you'; text the card's words).
               Defaults to the six parts with Oak's meanings and no text.
     gentle    true: softer, larger markers (the kids' apps)
     label     the painting's description for screen readers
   howItWorks
     selected  the part shown first (default the first part)
     onPick    (key) called when a part is chosen
     card      false hides the card and chips (markers only)
   results
     levels    {roots: 's' | 't' | 'g' | 'u', ...}  s Strong, t Steady,
               g Growing Edge, u Not sure yet. GGTreeArt.level(score, unsure)
               turns a 1 to 10 score into one of these (8+ s, 5+ t, else g).
     onPick    (key) makes markers and rows buttons (for example, open that
               part in the growth plan); without it they are pictures only
     words     {s, t, g, u} to rename the levels (default Strong, Steady,
               Growing Edge, Not sure yet)
     legend    false hides the three legend lines
   growth
     history   [{date: 'YYYY-MM-DD', levels: {...}}] the check-ins, oldest
               first (the app passes full check-ins only). The last one is Now.
     levelName the game layer level now, shown as a badge ('Young Oak')
     ladder    ['Acorn', 'Sprout', ...] every level, for the level card
     ladderLine the sentence after the ladder (default: Your level grows
               with the days you tend.)
     then      which check-in to compare first (index; default the oldest)

   Positions (POS): for each app, a 'wide' and a 'phone' entry:
     { src: 'oak-wide.webp', size: [2000, 800], crop: [x, y, w, h],
       at: { roots: [x, y], trunk: [x, y], bark: [x, y], branches: [x, y],
             leaves: [x, y], fruit: [x, y] } }
   Every number is a percent of the whole painting (0 to 100), so it scales.
   crop is the part of the painting the view shows (left, top, width,
   height); at is where each marker sits, in the whole painting. Add an app
   with GGTreeArt.add('maple', {wide: {...}, phone: {...}}), or add it to
   POS below. GGTreeArt.pos(app) reads one back.

   Reduce Motion (the device setting, html.gg-reduce-motion, or
   html[data-motion="reduce"]) stops the markers' slow glow. Nothing here
   reads or saves anything about a person.
   ===================================================================== */
(function () {
  if (window.GGTreeArt) return;
  var BASE = '/shared/heroes/';
  var W = [2000, 800], P = [900, 720], PT = [900, 1600];
  var POS = {
    oak: {
      wide: { size: W, crop: [54, 30, 35, 56], at: { fruit: [74.5, 41.5], leaves: [62.5, 53], branches: [77, 61], trunk: [71, 66], bark: [72.7, 72], roots: [71.3, 77.5] } },
      phone: { size: P, crop: [33, 30, 52, 55], at: { fruit: [68, 40.5], leaves: [42, 54], branches: [68, 59], trunk: [60, 65], bark: [58.6, 71.5], roots: [63.5, 76.5] } }
    },
    pine: {
      wide: { size: W, crop: [22, 16, 30, 72], at: { fruit: [39.8, 56.5], leaves: [32, 58], branches: [44, 46], trunk: [37.4, 70], bark: [37.4, 77], roots: [37.6, 84] } },
      phone: { size: P, crop: [16, 14, 68, 80], at: { fruit: [56, 61], leaves: [38, 45], branches: [62, 47], trunk: [46.6, 68], bark: [46.6, 76], roots: [46.6, 84] } }
    },
    birch: {
      wide: { size: W, crop: [2, 1, 36, 88], at: { fruit: [24, 13], leaves: [11, 34], branches: [27, 40], trunk: [18.6, 52], bark: [18, 67], roots: [17.3, 81] } },
      phone: { size: PT, crop: [20, 30, 62, 52], at: { fruit: [56, 38], leaves: [37, 52], branches: [66, 54], trunk: [51.4, 62], bark: [51.4, 70], roots: [51, 77.5] } }
    },
    sequoia: {
      wide: { size: W, crop: [2, 0, 44, 90], at: { fruit: [27, 7], leaves: [9, 26], branches: [33.5, 31], trunk: [25, 48], bark: [30, 66], roots: [20, 82] } },
      phone: { size: P, crop: [2, 0, 80, 92], at: { fruit: [40, 6], leaves: [12, 26], branches: [64, 22], trunk: [42, 48], bark: [53, 65], roots: [30, 82] } }
    }
  };
  var PART_KEYS = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];
  var DEF_PARTS = [
    { key: 'roots', name: 'Roots', tag: 'What grounds you' }, { key: 'trunk', name: 'Trunk', tag: 'Purpose' },
    { key: 'bark', name: 'Bark', tag: 'Mind and feelings' }, { key: 'branches', name: 'Branches', tag: 'Relationships' },
    { key: 'leaves', name: 'Leaves', tag: 'Body' }, { key: 'fruit', name: 'Fruit', tag: 'Hope' }
  ];
  var WORDS = { s: 'Strong', t: 'Steady', g: 'Growing Edge', u: 'Not sure yet' };
  var RANK = { g: 0, t: 1, s: 2 };
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function phone() { return !!(window.matchMedia && matchMedia('(max-width:600px)').matches); }
  function posFor(app) {
    var a = POS[app]; if (!a) { if (window.console) console.warn('GGTreeArt: no positions for ' + app + ', showing Oak'); a = POS.oak; app = 'oak'; }
    var v = phone() ? 'phone' : 'wide', p = a[v] || a.wide;
    return { app: app, v: v, size: p.size, crop: p.crop, at: p.at, src: p.src || (app + '-' + (a[v] ? v : 'wide') + '.webp') };
  }
  function parts(o) {
    var list = o.parts && o.parts.length ? o.parts : DEF_PARTS;
    return list.map(function (p) { var d = DEF_PARTS.filter(function (x) { return x.key === p.key; })[0] || {}; return { key: p.key, name: p.name || d.name || p.key, tag: p.tag || d.tag || '', text: p.text || '' }; });
  }
  function nice(k) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(k || '')); if (!m) return String(k || '');
    var s = MONTHS[+m[2] - 1] + ' ' + (+m[3]);
    return +m[1] === new Date().getFullYear() ? s : s + ', ' + m[1];
  }
  function joinAnd(a) { return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]; }

  /* ---------- styles, added once ---------- */
  var CSS = ''
    + '.gta{container-type:inline-size;color:var(--ink,#2E2118);text-align:left;}'
    + '.gta *{box-sizing:border-box;}'
    + '.gta-grid{display:grid;gap:18px;align-items:start;}'
    + '@container (min-width:700px){.gta-grid{grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:26px;}}'
    + '.gta-art{position:relative;overflow:hidden;border-radius:16px;margin:0 auto;background:#CFD9E2;box-shadow:0 10px 26px rgba(46,33,24,.16);isolation:isolate;width:100%;}'
    + '.gta-art img{position:absolute;max-width:none;display:block;pointer-events:none;user-select:none;-webkit-user-select:none;}'
    + '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .gta-art img{filter:brightness(.88);}:root:not([data-theme="light"]) .gta-art{background:#2A3036;box-shadow:0 10px 26px rgba(0,0,0,.35);}}'
    + ':root[data-theme="dark"] .gta-art img{filter:brightness(.88);}:root[data-theme="dark"] .gta-art{background:#2A3036;box-shadow:0 10px 26px rgba(0,0,0,.35);}'
    + '.gta-mk{position:absolute;width:44px;height:44px;margin:-22px 0 0 -22px;padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent;z-index:1;}'
    + 'span.gta-mk{cursor:default;}'
    + '.gta-mk::before{content:"";flex:none;width:var(--d,28px);height:var(--d,28px);border-radius:50%;border:2px solid #FFF6DC;background:rgba(201,155,69,.62);box-shadow:0 0 0 5px rgba(255,214,120,.28),0 0 18px 7px rgba(255,214,120,.55);}'
    + '.gta-mk.on::before{background:#F4C35A;box-shadow:0 0 0 7px rgba(255,214,120,.48),0 0 30px 12px rgba(255,214,120,.85);}'
    + '.gta-mk:focus{outline:none;}'
    + '.gta-mk:focus-visible{outline:3px solid #FFF6DC;outline-offset:-3px;box-shadow:0 0 0 3px #1B140E;}'
    + '.gta-tag{position:absolute;left:50%;top:calc(50% + var(--d,28px) / 2 + 6px);transform:translateX(-50%);white-space:nowrap;background:rgba(27,20,14,.84);color:#FFF6DC;font:600 12px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;padding:4px 9px;border-radius:999px;opacity:0;pointer-events:none;transition:opacity .2s;}'
    + '.gta-mk:hover .gta-tag,.gta-mk:focus-visible .gta-tag,.gta-mk.on .gta-tag{opacity:1;}'
    + '@media (prefers-reduced-motion:no-preference){.gta-glow .gta-mk:not(.on)::before{animation:gtaGlow 3.4s ease-in-out infinite;}}'
    + '@keyframes gtaGlow{0%,100%{box-shadow:0 0 0 5px rgba(255,214,120,.24),0 0 16px 6px rgba(255,214,120,.5);}50%{box-shadow:0 0 0 7px rgba(255,214,120,.4),0 0 26px 11px rgba(255,214,120,.78);}}'
    + 'html.gg-reduce-motion .gta-mk::before,html[data-motion="reduce"] .gta-mk::before{animation:none !important;}'
    + 'html.gg-reduce-motion .gta-tag,html[data-motion="reduce"] .gta-tag{transition:none;}'
    /* results: light by level */
    + '.gta-lv-s{--d:34px;}.gta-lv-s::before{background:#F4C35A;box-shadow:0 0 0 7px rgba(255,214,120,.45),0 0 36px 15px rgba(255,214,120,.85);}'
    + '.gta-lv-t{--d:26px;}.gta-lv-t::before{background:rgba(244,195,90,.72);box-shadow:0 0 14px 6px rgba(255,214,120,.5);}'
    + '.gta-lv-g{--d:22px;}.gta-lv-g::before{background:#B8D98A;border-color:#F4FBEA;box-shadow:0 0 12px 5px rgba(190,230,150,.7);}'
    + '.gta-lv-u{--d:18px;}.gta-lv-u::before{background:rgba(255,255,255,.55);border-color:rgba(255,255,255,.9);box-shadow:0 0 10px 4px rgba(255,255,255,.4);}'
    + '.gta-gentle .gta-mk{--d:34px;}.gta-gentle .gta-mk::before{border-width:3px;}'
    + '.gta-gentle .gta-lv-s{--d:38px;}.gta-gentle .gta-lv-t{--d:32px;}.gta-gentle .gta-lv-g{--d:28px;}.gta-gentle .gta-lv-u{--d:24px;}'
    + '@media (max-width:600px){.gta-mk{--d:24px;}.gta-lv-s{--d:30px;}.gta-lv-t{--d:23px;}.gta-lv-g{--d:19px;}.gta-lv-u{--d:16px;}.gta-gentle .gta-mk{--d:30px;}}'
    /* card, chips, list */
    + '.gta-side{display:flex;flex-direction:column;gap:14px;min-width:0;}'
    + '.gta-card{background:var(--card,#FFFCF6);border:1px solid var(--line,#DDD0B8);border-radius:16px;padding:18px 20px;}'
    + '.gta-k{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-soft,#6B5A4D);margin:0 0 4px;}'
    + '.gta-name{font-family:"Cormorant Garamond",Georgia,serif;font-weight:700;font-size:28px;line-height:1.15;margin:0 0 6px;color:var(--ink,#2E2118);}'
    + '.gta-card p{margin:0;line-height:1.55;}'
    + '.gta-chips{display:flex;flex-wrap:wrap;gap:8px;}'
    + '.gta-chip{border:1px solid var(--line,#DDD0B8);background:var(--card,#FFFCF6);color:var(--ink,#2E2118);border-radius:999px;padding:8px 14px;font:inherit;font-size:15px;font-weight:600;line-height:1.2;min-height:40px;cursor:pointer;}'
    + '.gta-chip.on{background:var(--ink,#2E2118);color:var(--bg,#FFF6DC);border-color:var(--ink,#2E2118);}'
    + '.gta-chip:focus-visible,.gta-row:focus-visible,.gta-ring:focus-visible{outline:3px solid var(--ink,#2E2118);outline-offset:3px;}'
    + '.gta-hint{font-size:14px;color:var(--ink-soft,#6B5A4D);margin:0;}'
    + '.gta-list{list-style:none;margin:0;padding:6px 18px;}'
    + '.gta-list li{border-bottom:1px solid var(--line,#E6DAC3);}.gta-list li:last-child{border-bottom:0;}'
    + '.gta-row{display:flex;align-items:center;gap:12px;width:100%;padding:10px 0;background:none;border:0;color:inherit;font:inherit;text-align:left;}'
    + 'button.gta-row{cursor:pointer;}'
    + '.gta-nm{flex:1 1 auto;min-width:0;display:flex;flex-wrap:wrap;align-items:baseline;gap:0 10px;line-height:1.3;}.gta-nm b{min-width:76px;}.gta-mean{color:var(--ink-soft,#6B5A4D);font-size:14px;}.gta-row .gta-word{font-weight:600;white-space:nowrap;line-height:1.3;}'
    + '.gta-dot{flex:none;border-radius:50%;width:11px;height:11px;}'
    + '.gta-dot-s{width:16px;height:16px;background:#F4C35A;box-shadow:0 0 10px 3px rgba(255,214,120,.8);}'
    + '.gta-dot-t{width:13px;height:13px;background:rgba(244,195,90,.72);}'
    + '.gta-dot-g{background:#8FBF5A;box-shadow:0 0 6px 2px rgba(190,230,150,.6);}'
    + '.gta-dot-u{background:transparent;border:2px solid var(--ink-soft,#6B5A4D);}'
    + '.gta-legend{display:flex;flex-direction:column;gap:4px;font-size:14px;line-height:1.45;color:var(--ink-soft,#4A3B2E);margin:0;}'
    /* growth */
    + '.gta-line{font-family:"Cormorant Garamond",Georgia,serif;font-weight:700;font-size:26px;line-height:1.2;margin:0 0 12px;color:var(--ink,#2E2118);}'
    + '.gta-tn{display:grid;gap:14px;}'
    + '@container (min-width:620px){.gta-tn.two{grid-template-columns:1fr 1fr;}}'
    + '.gta-col{display:flex;flex-direction:column;gap:6px;min-width:0;}'
    + '.gta-then img{filter:saturate(.72) brightness(.97);}'
    + '.gta-mist{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(240,244,248,.55),rgba(240,244,248,.18) 60%,rgba(240,244,248,.38));}'
    + '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .gta-then img{filter:saturate(.72) brightness(.8);}:root:not([data-theme="light"]) .gta-mist{background:linear-gradient(180deg,rgba(200,210,220,.35),rgba(200,210,220,.1) 60%,rgba(200,210,220,.24));}}'
    + ':root[data-theme="dark"] .gta-then img{filter:saturate(.72) brightness(.8);}:root[data-theme="dark"] .gta-mist{background:linear-gradient(180deg,rgba(200,210,220,.35),rgba(200,210,220,.1) 60%,rgba(200,210,220,.24));}'
    + '.gta-badge{position:absolute;right:10px;top:10px;z-index:2;background:rgba(27,20,14,.84);color:#FFF6DC;border-radius:999px;padding:6px 12px;font:600 13px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;max-width:calc(100% - 20px);}'
    + '.gta-rings{display:flex;flex-wrap:wrap;gap:14px 16px;align-items:flex-start;margin:4px 0 0;padding:0;list-style:none;}'
    + '.gta-rings li{display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;text-align:center;font-size:13px;font-weight:600;line-height:1.25;color:var(--ink-soft,#4A3B2E);}'
    + '.gta-ring{width:60px;height:60px;border-radius:50%;border:2px solid #C9A877;background:var(--card,#FFFCF6);display:flex;align-items:center;justify-content:center;padding:0;cursor:pointer;}'
    + 'span.gta-ring{cursor:default;border-style:dashed;}'
    + '.gta-ring.on{border-color:#8B5E1A;background:#F1E6CC;}'
    + '.gta-ring i{display:block;width:6px;height:6px;border-radius:50%;background:#8B5E1A;}'
    + '.gta-sub{font-size:15px;line-height:1.5;color:var(--ink-soft,#4A3B2E);margin:0;}'
    + '.gta-h{font-family:"Cormorant Garamond",Georgia,serif;font-weight:700;font-size:22px;margin:0 0 4px;color:var(--ink,#2E2118);}'
    + '.gta-sec{margin-top:18px;}';
  function style() {
    if (document.getElementById('gta-style')) return;
    var st = document.createElement('style'); st.id = 'gta-style'; st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  /* ---------- the painting ---------- */
  // inner: the markers and anything else laid over the painting.
  function art(o, inner, cls, label) {
    var p = posFor(o.app), c = p.crop;
    var ratio = (c[2] * p.size[0]) / (c[3] * p.size[1]);
    var img = 'left:' + (-c[0] / c[2] * 100).toFixed(3) + '%;top:' + (-c[1] / c[3] * 100).toFixed(3) + '%;width:' + (10000 / c[2]).toFixed(3) + '%;height:' + (10000 / c[3]).toFixed(3) + '%';
    return '<div class="gta-art' + (cls ? ' ' + cls : '') + '" style="aspect-ratio:' + ratio.toFixed(4) + ';max-width:' + Math.round((o.maxH || 540) * ratio) + 'px" data-v="' + p.v + '"' + (label ? ' role="img" aria-label="' + esc(label) + '"' : '') + '>'
      + '<img src="' + BASE + p.src + '" alt="" draggable="false" decoding="async" style="' + img + '">' + (inner || '') + '</div>';
  }
  function at(o, key) {
    var p = posFor(o.app), c = p.crop, pt = p.at[key] || [c[0] + c[2] / 2, c[1] + c[3] / 2];
    return 'left:' + ((pt[0] - c[0]) / c[2] * 100).toFixed(2) + '%;top:' + ((pt[1] - c[1]) / c[3] * 100).toFixed(2) + '%';
  }
  function marker(o, id, p, cls, label, live) {
    var tag = '<span class="gta-tag" aria-hidden="true">' + esc(p.name) + '</span>';
    if (live) return '<button type="button" class="gta-mk ' + cls + '" style="' + at(o, p.key) + '" data-gta="' + id + '" data-pick="' + p.key + '" aria-label="' + esc(label) + '">' + tag + '</button>';
    return '<span class="gta-mk ' + cls + '" style="' + at(o, p.key) + '" aria-hidden="true"></span>';
  }

  /* ---------- registry: each view keeps its options to redraw ---------- */
  var REG = {}, N = 0;
  function reg(kind, el, o) {
    var id = o._id || ('gta' + (++N)); o._id = id; o._kind = kind; REG[id] = o;
    var ids = Object.keys(REG);
    if (ids.length > 40) ids.forEach(function (k) { if (k !== id && !document.querySelector('[data-gta-root="' + k + '"]')) delete REG[k]; });
    return id;
  }
  function root(id, o, body) {
    return '<div class="gta' + (o.gentle ? ' gta-gentle' : '') + '" data-gta-root="' + id + '">' + body + '</div>';
  }
  function out(el, html) {
    if (el && el.nodeType === 1) {
      // el may be the old root of this same view (a redraw): swap it in place
      if (el.hasAttribute('data-gta-root')) el.outerHTML = html; else el.innerHTML = html;
    }
    return html;
  }

  /* ---------- How it works ---------- */
  function howItWorks(el, o) {
    style(); o = o || {};
    var id = reg('how', el, o), ps = parts(o);
    if (!o.sel || !ps.some(function (p) { return p.key === o.sel; })) o.sel = o.selected && ps.some(function (p) { return p.key === o.selected; }) ? o.selected : ps[0].key;
    var cur = ps.filter(function (p) { return p.key === o.sel; })[0];
    var mk = ps.map(function (p) { return marker(o, id, p, p.key === o.sel ? 'on' : '', p.name + ', ' + p.tag, true); }).join('');
    var label = o.label || ('The ' + cap(o.app) + ' painting with six glowing parts to tap');
    var body = art(o, mk, 'gta-glow', null);
    if (o.card !== false) {
      body = '<div class="gta-grid"><div>' + body.replace('class="gta-art gta-glow"', 'class="gta-art gta-glow" role="group" aria-label="' + esc(label) + '"') + '</div><div class="gta-side">'
        + '<div class="gta-card" aria-live="polite"><p class="gta-k">' + esc(cur.tag) + '</p><h3 class="gta-name">' + esc(cur.name) + '</h3>' + (cur.text ? '<p>' + esc(cur.text) + '</p>' : '') + '</div>'
        + '<div class="gta-chips" role="group" aria-label="The six parts">' + ps.map(function (p) { return '<button type="button" class="gta-chip' + (p.key === o.sel ? ' on' : '') + '" data-gta="' + id + '" data-pick="' + p.key + '" aria-pressed="' + (p.key === o.sel) + '">' + esc(p.name) + '</button>'; }).join('') + '</div>'
        + '<p class="gta-hint">' + esc(o.hint || 'Tap a glowing part of the tree to learn what it holds.') + '</p></div></div>';
    } else body = body.replace('class="gta-art gta-glow"', 'class="gta-art gta-glow" role="group" aria-label="' + esc(label) + '"');
    return out(el, root(id, o, body));
  }
  function cap(s) { s = String(s || ''); return s === 'grove' ? 'Grove' : s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- Results ---------- */
  function level(score, unsure) {
    if (unsure || score == null || isNaN(score)) return 'u';
    return score >= 8 ? 's' : score >= 5 ? 't' : 'g';
  }
  function lvOf(levels, k) { var v = (levels || {})[k]; return v === 's' || v === 't' || v === 'g' ? v : 'u'; }
  function words(o) { var w = {}; Object.keys(WORDS).forEach(function (k) { w[k] = (o.words && o.words[k]) || WORDS[k]; }); return w; }
  function describe(ps, levels, w) { return ps.map(function (p) { return p.name + ' ' + w[lvOf(levels, p.key)]; }).join(', '); }
  function results(el, o) {
    style(); o = o || {};
    var id = reg('results', el, o), ps = parts(o), w = words(o), live = typeof o.onPick === 'function';
    var mk = ps.map(function (p) { var L = lvOf(o.levels, p.key); return marker(o, id, p, 'gta-lv-' + L, p.name + ', ' + w[L] + (o.pickLabel ? '. ' + o.pickLabel : ''), live); }).join('');
    var pic = art(o, mk, '', live ? null : (o.label || 'Your tree: ' + describe(ps, o.levels, w)));
    if (live) pic = pic.replace('class="gta-art"', 'class="gta-art" role="group" aria-label="' + esc(o.label || 'Your tree: ' + describe(ps, o.levels, w)) + '"');
    var rows = ps.map(function (p) {
      var L = lvOf(o.levels, p.key), inner = '<span class="gta-dot gta-dot-' + L + '" aria-hidden="true"></span><span class="gta-nm"><b>' + esc(p.name) + '</b><span class="gta-mean">' + esc(p.tag) + '</span></span><span class="gta-word">' + esc(w[L]) + '</span>';
      return '<li>' + (live ? '<button type="button" class="gta-row" data-gta="' + id + '" data-pick="' + p.key + '">' + inner + '</button>' : '<div class="gta-row">' + inner + '</div>') + '</li>';
    }).join('');
    var legend = o.legend === false ? '' : '<p class="gta-legend"><span><b>' + esc(w.s) + '</b>: a full warm glow.</span><span><b>' + esc(w.t) + '</b>: a soft glow.</span><span><b>' + esc(w.g) + '</b>: a new green light, where growth is starting.</span></p>';
    var body = '<div class="gta-grid"><div>' + pic + '</div><div class="gta-side"><ul class="gta-list gta-card" aria-label="Your six parts">' + rows + '</ul>' + legend + (o.note ? '<p class="gta-hint">' + esc(o.note) + '</p>' : '') + '</div></div>';
    return out(el, root(id, o, body));
  }

  /* ---------- Growth: Then and Now, rings, the level badge ---------- */
  function growth(el, o) {
    style(); o = o || {};
    var id = reg('growth', el, o), ps = parts(o), w = words(o);
    var H = (o.history || []).filter(function (e) { return e && e.levels; });
    var badge = o.levelName ? '<span class="gta-badge">Your level: ' + esc(o.levelName) + '</span>' : '';
    var ladder = o.ladder && o.ladder.length ? '<div class="gta-card gta-sec"><p class="gta-k">Your Level</p><h3 class="gta-name">' + esc(o.levelName || o.ladder[0]) + '</h3><p class="gta-sub">' + esc(o.ladder.join(', ')) + '. ' + esc(o.ladderLine || 'Your level grows with the days you tend, shown as a small badge on your painting.') + '</p></div>' : '';
    var body;
    if (!H.length) {
      body = '<h3 class="gta-line">' + esc(o.emptyLine || 'Your first check-in plants your first growth ring.') + '</h3>'
        + '<div class="gta-tn"><div class="gta-col">' + art(o, badge, '', 'Your ' + cap(o.app) + ' painting' + (o.levelName ? ', level ' + o.levelName : '')) + '</div></div>'
        + '<p class="gta-sub gta-sec">' + esc(o.emptySub || 'After each full check-in, your tree shows how each part is doing, and Then and Now shows what grew.') + '</p>' + ladder;
      return out(el, root(id, o, body));
    }
    var nowI = H.length - 1, now = H[nowI];
    var nowPic = art(o, ps.map(function (p) { return marker(o, id, p, 'gta-lv-' + lvOf(now.levels, p.key), '', false); }).join('') + badge, '', 'Your tree now, ' + nice(now.date) + ': ' + describe(ps, now.levels, w) + (o.levelName ? '. Level ' + o.levelName : ''));
    if (H.length === 1) {
      body = '<h3 class="gta-line">' + esc(o.oneLine || 'Your first ring is here. Your next check-in will show Then and Now.') + '</h3>'
        + '<div class="gta-tn"><div class="gta-col"><p class="gta-k">Now, ' + esc(nice(now.date)) + '</p>' + nowPic + '</div></div>';
    } else {
      var t = typeof o.then === 'number' && o.then >= 0 && o.then < nowI ? o.then : 0; o.then = t;
      var then = H[t];
      var grew = ps.filter(function (p) { var a = then.levels[p.key], b = now.levels[p.key]; return RANK[a] != null && RANK[b] != null && RANK[b] > RANK[a]; }).map(function (p) { return p.name; });
      // grewLine and steadyLine (optional) change the kind line: {parts} and {date} are filled in (Willow, BLD 780).
      var line = grew.length ? (o.grewLine || 'Your {parts} grew since {date}.').replace('{parts}', joinAnd(grew)).replace('{date}', nice(then.date)) : (o.steadyLine || 'Your tree is holding steady since {date}.').replace('{date}', nice(then.date));
      var thenPic = art(o, ps.map(function (p) { return marker(o, id, p, 'gta-lv-' + lvOf(then.levels, p.key), '', false); }).join('') + '<div class="gta-mist" aria-hidden="true"></div>', 'gta-then', 'Your tree then, ' + nice(then.date) + ': ' + describe(ps, then.levels, w));
      body = '<h3 class="gta-line" aria-live="polite">' + esc(line) + '</h3>'
        + '<div class="gta-tn two"><div class="gta-col"><p class="gta-k">Then, ' + esc(nice(then.date)) + '</p>' + thenPic + '</div>'
        + '<div class="gta-col"><p class="gta-k">Now, ' + esc(nice(now.date)) + '</p>' + nowPic + '</div></div>'
        + '<p class="gta-sub gta-sec">Parts that grew shine brighter. A Growing Edge shows as new green light, where growth is starting.</p>';
    }
    var rings = '<div class="gta-sec"><p class="gta-k">Your Growth Rings</p><h3 class="gta-h">One ring for every full check-in</h3><p class="gta-sub">' + (H.length > 1 ? 'Like the rings inside a real tree, each check-in adds one. Tap a ring to compare that season with now.' : 'Like the rings inside a real tree, each check-in adds one.') + '</p>'
      + '<ul class="gta-rings">' + H.map(function (e, i) {
        var n = Math.min(i + 1, 8), sh = [];
        for (var j = 1; j <= n; j++) sh.push('0 0 0 ' + (j * 3) + 'px ' + (j % 2 ? '#C9A877' : '#F1E6CC'));
        var dot = '<i style="box-shadow:' + sh.join(',') + '"></i>', name = nice(e.date);
        if (i === nowI) return '<li><span class="gta-ring" role="img" aria-label="Now, ' + esc(name) + '">' + dot + '</span><span>Now</span></li>';
        return '<li><button type="button" class="gta-ring' + (i === o.then ? ' on' : '') + '" data-gta="' + id + '" data-ring="' + i + '" aria-pressed="' + (i === o.then) + '" aria-label="Compare ' + esc(name) + ' with now">' + dot + '</button><span>' + esc(name) + '</span></li>';
      }).join('') + '</ul></div>';
    return out(el, root(id, o, body + rings + ladder));
  }

  /* ---------- clicks, once for the page ---------- */
  var DRAW = { how: howItWorks, results: results, growth: growth };
  function redraw(id, focus) {
    var o = REG[id], el = document.querySelector('[data-gta-root="' + id + '"]'); if (!o || !el) return;
    DRAW[o._kind](el, o);
    if (focus) { var f = document.querySelector('[data-gta-root="' + id + '"] ' + focus); if (f) f.focus({ preventScroll: true }); }
  }
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('[data-gta]'); if (!b) return;
    var id = b.getAttribute('data-gta'), o = REG[id]; if (!o) return;
    var key = b.getAttribute('data-pick'), ring = b.getAttribute('data-ring');
    if (o._kind === 'how' && key) {
      var sel = '.' + b.className.split(' ')[0] + '[data-pick="' + key + '"]';
      o.sel = key; redraw(id, sel);
      if (typeof o.onPick === 'function') o.onPick(key);
    } else if (o._kind === 'results' && key) {
      if (typeof o.onPick === 'function') o.onPick(key);
    } else if (o._kind === 'growth' && ring != null) {
      o.then = +ring; redraw(id, '[data-ring="' + ring + '"]');
    }
  });
  // The wide painting on wide screens and the phone painting on phones: redraw when it switches.
  if (window.matchMedia) {
    var mq = matchMedia('(max-width:600px)'), fn = function () { Object.keys(REG).forEach(function (id) { redraw(id); }); };
    if (mq.addEventListener) mq.addEventListener('change', fn); else if (mq.addListener) mq.addListener(fn);
  }

  window.GGTreeArt = {
    howItWorks: howItWorks, results: results, growth: growth,
    level: level, nice: nice,
    add: function (app, table) { POS[app] = table; },
    pos: function (app) { return POS[app] || null; },
    POS: POS, PARTS: PART_KEYS
  };
})();
