/* =====================================================================
   GROUNDED . THE PAINTED FAMILY GROVE (shared, GWG BLD 756)
   Each person's tree as its painted mark (shared/marks/<tree>.svg), set in
   a row over The Grove's painting like a family standing together. Tiles
   are sized by life stage (smaller for kids). A tree tended today has a
   soft warm glow; small markers show the parts tended, in the six parts'
   colors. A tree that has rested a few days sits a little misty, never
   wilted or bare. A remembered willow stays, softer, with a small star.
   Used by The Grove (Our Grove) and the Grove Guide in the Field Guide.
   shared/grove-scene.js still gives the stage (GGScene.stageOf) and the
   small visitors (GGScene.critterSVG).

   For tools
     GGGroveRow.html(o)  the markup. o = {
       trees: [{ stage, kind, label, id, on, today: [parts], week: [parts],
                 tended (today), misty, private, remembered, g (0 to 1) }],
       scenery: forest|lake|autumn|winter|dusk, sky: dawn|day|dusk|night,
       visitors: [ids], label, solo, mini, pick (tiles become buttons
       with data-act="sel" data-id) }
     GGGroveRow.markOf(tree)  the mark's file name for a tree
   Nothing here reads or saves anything about a person.
   ===================================================================== */
(function () {
  if (window.GGGroveRow) return;
  var me = document.currentScript && document.currentScript.src || '/shared/gg-grove-row.js';
  var BASE = me.replace(/gg-grove-row\.js.*$/, '');
  var PARTS = [['roots', 'Roots', '#8E5A2B'], ['trunk', 'Trunk', '#C27A1E'], ['bark', 'Bark', '#6E5BB5'], ['branches', 'Branches', '#1F8A8F'], ['leaves', 'Leaves', '#3A9B58'], ['fruit', 'Fruit', '#D9483F']];
  var SCALE = { maple: .6, aspen: .72, pine: .84, birch: .92, adult: 1, sequoia: 1.06, willow: 1 };
  var TREE_NAME = { maple: 'Maple', aspen: 'Aspen', pine: 'Pine', birch: 'Birch', oak: 'Oak', sequoia: 'Sequoia', willow: 'Willow' };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function markOf(t) {
    var st = t.stage;
    if (st === 'willow' || t.remembered) return 'willow';
    // A kind of tree chosen in The Grove (Birch, Maple, Pine) shows for grown-ups and Aspen, as before.
    if ((st === 'adult' || st === 'aspen') && (t.kind === 'birch' || t.kind === 'maple' || t.kind === 'pine')) return t.kind;
    if (st === 'adult' || !TREE_NAME[st]) return 'oak';
    return st;
  }

  var CSS = ''
    + '.gp-grove{position:relative;overflow:hidden;container-type:inline-size;isolation:isolate;display:flex;flex-direction:column;justify-content:flex-end;aspect-ratio:2.5/1;min-height:300px;min-width:0;width:100%;box-sizing:border-box;background:#CFD9E2;-webkit-print-color-adjust:exact;print-color-adjust:exact;--gp-dim:1;--gp-scf:saturate(1);}'
    + '.gp-grove.gp-mini{aspect-ratio:auto;min-height:220px;}'
    + '@media (max-width:600px){.gp-grove{aspect-ratio:4/3;min-height:280px;}.gp-grove.gp-mini{aspect-ratio:auto;min-height:220px;}}'
    + '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .gp-grove{--gp-dim:.84;background:#2A3036;}}'
    + ':root[data-theme="dark"] .gp-grove{--gp-dim:.84;background:#2A3036;}'
    + '.gp-back{position:absolute;inset:-8px;width:calc(100% + 16px);height:calc(100% + 16px);max-width:none;object-fit:cover;object-position:50% 78%;filter:var(--gp-scf) brightness(var(--gp-dim)) blur(2.5px);z-index:-3;}'
    + '.gp-veil{position:absolute;inset:0;z-index:-2;pointer-events:none;background:linear-gradient(180deg,rgba(250,246,236,.18),rgba(250,246,236,0) 45%,rgba(40,30,18,.18));}'
    + '.gp-sky-dawn .gp-veil{background:linear-gradient(180deg,rgba(247,212,150,.32),rgba(247,212,150,0) 60%,rgba(40,30,18,.16));}'
    + '.gp-sky-dusk .gp-veil,.gp-sc-dusk .gp-veil{background:linear-gradient(180deg,rgba(150,110,160,.38),rgba(230,150,100,.22) 55%,rgba(40,30,18,.22));}'
    + '.gp-sky-night .gp-veil{background:linear-gradient(180deg,rgba(18,28,56,.62),rgba(24,36,60,.42) 60%,rgba(10,14,24,.5));}'
    + '.gp-sc-autumn{--gp-scf:sepia(.35) saturate(1.3) hue-rotate(-14deg);}'
    + '.gp-sc-winter{--gp-scf:saturate(.3) brightness(1.12);}'
    + '.gp-sc-winter .gp-veil{background:linear-gradient(180deg,rgba(236,242,246,.35),rgba(255,255,255,.18) 60%,rgba(240,244,248,.5));}'
    + '.gp-lake{position:absolute;left:-5%;right:-5%;bottom:14%;height:15%;z-index:-2;border-radius:50%;background:linear-gradient(180deg,rgba(134,184,203,.0),rgba(134,184,203,.85) 35%,rgba(110,165,190,.9) 70%,rgba(134,184,203,0));filter:blur(3px);}'
    + '.gp-row{list-style:none;margin:0;padding:18px 16px 14px;display:flex;align-items:flex-end;gap:12px;overflow-x:auto;overflow-y:hidden;scrollbar-width:thin;overscroll-behavior-x:contain;'
    + '--gp-base:clamp(50px,calc((100cqi - 32px - (var(--gp-n) - 1) * 12px) / var(--gp-sum)),168px);}'
    + '.gp-solo .gp-row{--gp-base:clamp(120px,34cqi,210px);}'
    + '.gp-mini.gp-solo .gp-row{--gp-base:clamp(96px,26cqi,150px);}'
    + '.gp-row>li:first-child{margin-left:auto;}.gp-row>li:last-child{margin-right:auto;}'
    + '@container (max-width:600px){.gp-row{flex-wrap:wrap;justify-content:center;row-gap:14px;gap:10px;padding:16px 10px 12px;--gp-base:clamp(62px,calc((100cqi - 20px - (var(--gp-n) - 1) * 10px) / var(--gp-sum)),104px);}.gp-row>li:first-child,.gp-row>li:last-child{margin:0;}.gp-tag{font-size:12px;padding:3px 7px 4px;}}'
    + '.gp-tree{flex:0 0 auto;position:relative;display:flex;justify-content:center;}'
    + '.gp-pick{all:unset;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:6px;position:relative;cursor:default;border-radius:14px;}'
    + 'button.gp-pick{cursor:pointer;}'
    + 'button.gp-pick:focus-visible{outline:3px solid #F2C94C;outline-offset:4px;}'
    + '.gp-tile{position:relative;display:block;width:calc(var(--gp-base) * var(--s,1));aspect-ratio:1/1;border-radius:22%;}'
    + '.gp-tile img{display:block;width:100%;height:100%;border-radius:22%;box-shadow:0 6px 16px rgba(30,20,10,.32);transition:filter 1.2s ease,box-shadow 1.2s ease;}'
    + '.gp-tile::before{content:"";position:absolute;inset:-26%;border-radius:50%;z-index:-1;opacity:0;background:radial-gradient(circle,rgba(255,226,160,.85),rgba(255,206,120,.35) 45%,rgba(255,200,120,0) 70%);transition:opacity 1.2s ease;}'
    + '.gp-glow .gp-tile::before{opacity:1;animation:gpBreathe 5s ease-in-out infinite alternate;}'
    + '.gp-glow .gp-tile img{box-shadow:0 0 0 2px rgba(255,228,170,.95),0 0 22px 4px rgba(255,204,120,.7),0 6px 16px rgba(30,20,10,.28);}'
    + '@keyframes gpBreathe{from{transform:scale(.94);opacity:.8}to{transform:scale(1.04);opacity:1}}'
    + '.gp-tile::after{content:"";position:absolute;inset:0;border-radius:22%;pointer-events:none;opacity:0;transition:opacity 1.4s ease;background:linear-gradient(180deg,rgba(240,244,248,.34),rgba(232,237,242,.14) 50%,rgba(240,244,248,.38));}'
    + '.gp-misty .gp-tile::after{opacity:1;}'
    + '.gp-misty .gp-tile img{filter:saturate(.85) brightness(1.02);}'
    + '.gp-gone .gp-tile img{filter:saturate(.7) brightness(1.04);opacity:.9;}'
    + '.gp-star{position:absolute;top:-16px;left:50%;width:14px;height:14px;margin-left:-7px;color:#F7E3A6;filter:drop-shadow(0 0 4px rgba(255,236,180,.9));}'
    + '.gp-on .gp-tile img{box-shadow:0 0 0 3px #F2C94C,0 6px 16px rgba(30,20,10,.32);}'
    + '.gp-tag{display:flex;flex-direction:column;align-items:center;gap:3px;max-width:max(84px,calc(var(--gp-base) * var(--s,1) + 20px));padding:4px 9px 5px;border-radius:12px;background:rgba(28,22,16,.66);color:#F7F1E6;font:600 13px/1.2 Barlow,Arial,sans-serif;}'
    + '.gp-tag b{font-weight:600;max-width:100%;text-align:center;overflow-wrap:anywhere;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;}'
    + '.gp-dots{display:flex;gap:3px;}'
    + '.gp-dots i{width:7px;height:7px;border-radius:50%;border:1.5px solid rgba(247,241,230,.55);box-sizing:border-box;}'
    + '.gp-dots i.wk{background:var(--pc);border-color:var(--pc);opacity:.6;}'
    + '.gp-dots i.td{background:var(--pc);border-color:#FFF3D6;box-shadow:0 0 6px var(--pc);}'
    + '.gp-vis{position:absolute;inset:0;pointer-events:none;z-index:1;}'
    + '.gp-vis svg,.gp-critter{position:absolute;overflow:visible;}'
    + '.gp-ladybug{width:16px;height:16px;left:-6px;top:calc(var(--gp-base) * var(--s,1) - 14px);}'
    + '.gp-bird{width:38px;height:24px;right:-14px;top:-18px;}'
    + '.gp-bunny{width:34px;height:42px;right:4%;bottom:10px;}'
    + '.gp-fly{width:22px;height:22px;animation:gpFly 9s ease-in-out infinite alternate;}'
    + '.gp-fly .w{transform-box:fill-box;transform-origin:100% 50%;animation:gpFlap .35s ease-in-out infinite alternate;}'
    + '.gp-fly .w.r{transform-origin:0% 50%;}'
    + '@keyframes gpFlap{to{transform:scaleX(.35)}}'
    + '@keyframes gpFly{0%{transform:translate(0,0)}33%{transform:translate(40px,-16px)}66%{transform:translate(80px,6px)}100%{transform:translate(120px,-10px)}}'
    + '@media (prefers-reduced-motion:reduce){.gp-glow .gp-tile::before,.gp-fly,.gp-fly .w{animation:none;}.gp-tile img,.gp-tile::before,.gp-tile::after{transition:none;}}'
    + 'html.gg-reduce-motion .gp-glow .gp-tile::before,html.gg-reduce-motion .gp-fly,html.gg-reduce-motion .gp-fly .w,html[data-motion="reduce"] .gp-glow .gp-tile::before,html[data-motion="reduce"] .gp-fly,html[data-motion="reduce"] .gp-fly .w{animation:none;}'
    + '@media print{.gp-grove{aspect-ratio:auto;min-height:0;}.gp-glow .gp-tile::before{animation:none;}.gp-fly{animation:none;}.gp-row{overflow:visible;flex-wrap:wrap;justify-content:center;}}';
  function addCss() {
    if (document.getElementById('gp-css')) return;
    var s = document.createElement('style'); s.id = 'gp-css'; s.textContent = CSS; (document.head || document.documentElement).appendChild(s);
  }

  function crit(id, cls, vb, x, y) {
    if (!window.GGScene || !GGScene.critterSVG) return '';
    return '<svg class="gp-critter ' + cls + '" viewBox="' + vb + '" aria-hidden="true" focusable="false">' + GGScene.critterSVG(id, x, y) + '</svg>';
  }
  function fly(i) {
    var pos = [[8, 18], [62, 10], [34, 30]][i % 3];
    return '<svg class="gp-critter gp-fly" style="left:' + pos[0] + '%;top:' + pos[1] + '%;animation-delay:' + (-i * 3) + 's" viewBox="-12 -12 24 24" aria-hidden="true" focusable="false">'
      + '<ellipse class="w" cx="-5" cy="-1" rx="6" ry="8" fill="#E9B949"/><ellipse class="w r" cx="5" cy="-1" rx="6" ry="8" fill="#F2C94C"/>'
      + '<ellipse class="w" cx="-4" cy="6" rx="3.5" ry="4.5" fill="#D9674C"/><ellipse class="w r" cx="4" cy="6" rx="3.5" ry="4.5" fill="#D9674C"/>'
      + '<path d="M0 -8v16" stroke="#3A2A1E" stroke-width="2" stroke-linecap="round"/></svg>';
  }
  var STAR = '<svg class="gp-star" viewBox="-10 -10 20 20" aria-hidden="true" focusable="false"><path d="M0 -9L2.2 -2.2L9 0L2.2 2.2L0 9L-2.2 2.2L-9 0L-2.2 -2.2Z" fill="currentColor"/></svg>';

  function treeHtml(t, i, o) {
    var mk = markOf(t), td = t.today || [], wk = t.week || [];
    var s = (SCALE[t.remembered ? 'willow' : t.stage] || 1);
    if (o.solo && typeof t.g === 'number') s = .72 + .28 * Math.max(0, Math.min(1, t.g));
    var cls = 'gp-tree' + (t.tended && !t.remembered ? ' gp-glow' : '') + (t.misty && !t.tended && !t.remembered ? ' gp-misty' : '') + (t.remembered ? ' gp-gone' : '') + (t.on ? ' gp-on' : '');
    var dots = '', said = [];
    if (!t.private && !t.remembered) {
      dots = '<span class="gp-dots" aria-hidden="true">' + PARTS.map(function (p) {
        var c = td.indexOf(p[0]) >= 0 ? 'td' : wk.indexOf(p[0]) >= 0 ? 'wk' : '';
        if (c) said.push(p[1]);
        return '<i class="' + c + '" style="--pc:' + p[2] + '"></i>';
      }).join('') + '</span>';
    }
    var desc = (t.label ? t.label + ', ' : '') + (t.remembered ? 'a remembered willow' : TREE_NAME[mk] + ' tree')
      + (t.private || t.remembered ? '' : t.tended ? ', tended today' : t.misty ? ', resting in the mist' : '')
      + (said.length ? (t.tended && td.length ? ', parts tended: ' : ', tended this week: ') + said.join(', ') : '');
    var vis = '';
    if (i === 0 && o.visitors) {
      if (o.visitors.indexOf('ladybug') >= 0) vis += crit('ladybug', 'gp-ladybug', '-6 -6 12 12', 0, 0);
      if (o.visitors.indexOf('bird') >= 0) vis += crit('bird', 'gp-bird', '-22 -12 40 24', 0, 0);
    }
    var inner = '<span class="gp-tile"><img src="' + BASE + 'marks/' + mk + '.svg" alt="" draggable="false"></span>' + (t.remembered ? STAR : '') + vis
      + ((t.label || dots) ? '<span class="gp-tag">' + dots + (t.label ? '<b>' + esc(t.label) + '</b>' : '') + '</span>' : '');
    var body = o.pick && t.id
      ? '<button type="button" class="gp-pick" data-act="sel" data-id="' + esc(t.id) + '" aria-pressed="' + (!!t.on) + '" aria-label="' + esc(desc) + '">' + inner + '</button>'
      : '<span class="gp-pick" role="img" aria-label="' + esc(desc) + '">' + inner + '</span>';
    return '<li class="' + cls + '" style="--s:' + s + '">' + body + '</li>';
  }

  function html(o) {
    o = o || {}; addCss();
    var trees = (o.trees || []).slice(), sum = 0;
    trees.forEach(function (t) { sum += o.solo && typeof t.g === 'number' ? .72 + .28 * t.g : (SCALE[t.remembered ? 'willow' : t.stage] || 1); });
    var sc = o.scenery || 'forest', sky = o.sky || 'day', V = o.visitors || [];
    var vis = '';
    if (V.indexOf('bunny') >= 0) vis += crit('bunny', 'gp-bunny', '-18 -48 40 50', 0, 0);
    V.filter(function (v) { return v.indexOf('butterfly') === 0; }).forEach(function (v, k) { vis += fly(k); });
    return '<div class="gp-grove gp-sc-' + esc(sc) + ' gp-sky-' + esc(sky) + (o.solo ? ' gp-solo' : '') + (o.mini ? ' gp-mini' : '') + '" style="--gp-n:' + Math.max(1, trees.length) + ';--gp-sum:' + Math.max(1, sum).toFixed(2) + '">'
      + '<picture><source media="(max-width:600px)" srcset="' + BASE + 'heroes/grove-phone.webp"><img class="gp-back" src="' + BASE + 'heroes/grove-wide.webp" alt="" aria-hidden="true" draggable="false"></picture>'
      + '<div class="gp-veil" aria-hidden="true"></div>' + (sc === 'lake' ? '<div class="gp-lake" aria-hidden="true"></div>' : '')
      + (vis ? '<div class="gp-vis" aria-hidden="true">' + vis + '</div>' : '')
      + '<ul class="gp-row" role="list" aria-label="' + esc(o.label || 'The family grove') + '">' + trees.map(function (t, i) { return treeHtml(t, i, o); }).join('') + '</ul></div>';
  }

  window.GGGroveRow = { html: html, markOf: markOf, PARTS: PARTS };
})();
