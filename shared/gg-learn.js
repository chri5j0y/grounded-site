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
     Progress is kept on this device under gg-learn:<app> and travels in the one backup file.
   - A series earns a certificate when every lesson in it is finished and it has three or more
     lessons (or says cert: true). Certificates, posters, and flyers come from shared/gg-print.js.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGLearn) return;
  var V = 'ln3';
  var ROOT = (function () { try { var s = document.currentScript && document.currentScript.src; if (s) return new URL('..', s).href.replace(/\/$/, ''); } catch (e) {} return location.origin; })();
  var url = function (p) { return ROOT + p; };
  var esc = function (x) { return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var today = function () { var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); }; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); };

  var MARK = function (m) { return url('/shared/marks/' + m + '.svg'); };
  var HERO = function (h) { return url('/shared/heroes/' + h + '-wide.svg'); };
  var COL = { maple: '#C4501E', aspen: '#1F6F74', pine: '#3A6B35', oak: '#3D5A73', sequoia: '#7A2E1C', willow: '#5D5A6E', grove: '#223829', field: '#2E2118', site: '#8B5E1A' };
  var APPS = {
    maple: { name: 'Maple', color: '#C4501E', btn: '#A14219', back: 'Back to Maple' },
    aspen: { name: 'Aspen', color: '#1F6F74', btn: '#1F6F74', back: 'Back to Aspen' },
    oak: { name: 'Oak', color: '#3D5A73', btn: '#3D5A73', back: 'Back to Oak' },
    willow: { name: 'Willow', color: '#5D5A6E', btn: '#5D5A6E', back: 'Back to Willow' },
    grove: { name: 'The Grove', color: '#223829', btn: '#2F5A3C', back: 'Back to The Grove' }
  };
  var PART = [['roots', 'Roots', 'What grounds you', '#5B3A22'], ['trunk', 'Trunk', 'Purpose', '#8B5E1A'], ['bark', 'Bark', 'Mind and feelings', '#7D6B57'], ['branches', 'Branches', 'Relationships', '#9A5B34'], ['leaves', 'Leaves', 'Body', '#5F7D48'], ['fruit', 'Fruit', 'Hope', '#C07A26']];
  var IC = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    award: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5"/></svg>',
    print: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 9V3.5h10V9M7 17.5H4.5v-7A1.5 1.5 0 0 1 6 9h12a1.5 1.5 0 0 1 1.5 1.5v7H17"/><path d="M7 14h10v6.5H7z"/></svg>'
  };
  var HAND = '<svg class="ln-ptr" viewBox="0 0 40 48" aria-hidden="true"><path d="M14 3c2.2 0 4 1.8 4 4v13l2-.4c1.6-.3 3.2.6 3.7 2.1l.2.6 2-.3c1.7-.2 3.3.8 3.8 2.4l.2.6 1.6-.2c2-.2 3.8 1.3 4 3.3L36 38c.3 4.5-3 8.5-7.5 9H18.6c-2.6 0-5-1.2-6.5-3.3L4.3 32.8c-1.2-1.7-.8-4 .9-5.1 1.5-1 3.5-.8 4.8.5L10 30V7c0-2.2 1.8-4 4-4z" fill="#FFF8EC" stroke="#2C1810" stroke-width="2"/></svg><span class="ln-ring"></span>';
  var A = function (d, extra, sty) { return ' class="a' + (extra ? ' ' + extra : '') + '" style="transition-delay:' + d + 's' + (sty ? ';' + sty : '') + '"'; };

  /* ---------------- scenes ---------------- */
  function scene(sc, acc) {
    var h = function (x) { return esc(x == null ? '' : x); };
    acc = acc || '#8B5E1A';
    switch (sc.k) {
      case 'title': return '<img class="ln-hero" src="' + HERO(sc.hero || 'oak') + '" alt=""><div class="ln-tt"><div' + A(.5, 'ln-eb') + '>' + h(sc.eyebrow || '') + '</div><h2' + A(.9) + '>' + h(sc.h) + '</h2>' + (sc.sub ? '<p' + A(1.5) + '>' + h(sc.sub) + '</p>' : '') + '<div' + A(1.9, 'ln-by') + '>GROW WITH GROUNDED</div></div>';
      case 'parts': {
        var L = [[1.0, 2122, 440, 1960, 470, 1950, 466, 'end', 0], [1.8, 2132, 380, 2300, 420, 2310, 416, 'start', 1], [2.6, 2124, 360, 1960, 370, 1950, 366, 'end', 2], [3.4, 2210, 250, 2330, 260, 2340, 256, 'start', 3], [4.2, 2030, 230, 1910, 220, 1900, 216, 'end', 4], [5.0, 2150, 195, 2320, 130, 2330, 126, 'start', 5]];
        return '<svg viewBox="1660 30 940 529" preserveAspectRatio="xMidYMid slice" width="960" height="540" style="position:absolute;inset:0"><image href="' + HERO('oak') + '" x="0" y="0" width="3600" height="560"/>' + L.map(function (r) { var P = PART[r[8]]; return '<g' + A(r[0]) + '><line x1="' + r[1] + '" y1="' + r[2] + '" x2="' + r[3] + '" y2="' + r[4] + '" stroke="#F6EFE2" stroke-width="2.4"/><circle cx="' + r[1] + '" cy="' + r[2] + '" r="6" fill="#F6EFE2"/><circle cx="' + r[1] + '" cy="' + r[2] + '" r="3.5" fill="' + P[3] + '"/><text x="' + r[5] + '" y="' + r[6] + '" text-anchor="' + r[7] + '" font-family="Cormorant Garamond,serif" font-weight="600" font-size="34" fill="#FFF8EC">' + P[1] + '</text><text x="' + r[5] + '" y="' + (r[6] + 26) + '" text-anchor="' + r[7] + '" font-family="Barlow,sans-serif" font-weight="500" font-size="20" fill="#F2DDB5">' + P[2] + '</text></g>'; }).join('') + '</svg>';
      }
      case 'six': // the six parts as cards, with this tree's own words under each one
        return '<div class="ln-six">' + (sc.h ? '<h3' + A(.2) + '>' + h(sc.h) + '</h3>' : '') + '<div class="ln-sixg">' + PART.map(function (P, j) { var t = (sc.words || [])[j] || ''; return '<div' + A(.7 + j * (sc.gap || .7), 'ln-sx', '--k:' + P[3]) + '><b>' + P[1] + '</b><span>' + P[2] + '</span>' + (t ? '<small>' + h(t) + '</small>' : '') + '</div>'; }).join('') + '</div></div>';
      case 'big': return '<div class="ln-big"><p' + A(.3) + '>' + h(sc.h) + '</p>' + (sc.sub ? '<small' + A(1.8) + '>' + h(sc.sub) + '</small>' : '') + '</div>';
      case 'points': return '<div class="ln-pts' + ((sc.items || []).length >= 5 ? ' ln-pts5' : '') + '"><h3' + A(.2) + '>' + h(sc.h) + '</h3>' + (sc.items || []).map(function (it, j) { var a = Array.isArray(it) ? it : [it]; return '<div' + A(.9 + j * (sc.gap || 1.1), 'ln-pt') + '><span class="ln-dot" style="background:' + (a[2] || acc) + '"></span><span><b>' + h(a[0]) + '</b>' + (a[1] ? '<small>' + h(a[1]) + '</small>' : '') + '</span></div>'; }).join('') + '</div>';
      case 'trees': {
        var T = [['maple', 'Maple', 'Grades K to 5'], ['aspen', 'Aspen', 'Grades 6 to 8'], ['pine', 'Pine', 'Grades 9 to 12'], ['oak', 'Oak', 'Adults'], ['sequoia', 'Sequoia', 'Seniors'], ['willow', 'Willow', 'Hospice']].concat(sc.grove ? [['grove', 'The Grove', 'Every age, together']] : []);
        return '<div class="ln-trees"><h3' + A(.2) + '>' + h(sc.h || 'Six trees. The same six parts.') + '</h3><div class="ln-trow">' + T.map(function (x, j) { return '<div' + A(.6 + j * .4, 'ln-tr') + '><img src="' + MARK(x[0] + '-tab') + '" alt=""><b style="color:' + COL[x[0]] + '">' + x[1] + '</b><small>' + x[2] + '</small></div>'; }).join('') + '</div></div>';
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
      case 'tabs': return '<div class="ln-fg"><div class="ln-fgtop"' + (sc.app && COL[sc.app] && sc.app !== 'field' ? ' style="background:' + COL[sc.app] + ';color:#FFF8EC"' : '') + '><b>' + h(sc.app_name || 'Grounded Field Guide') + '</b></div><div class="ln-fgtabs">' + (sc.tabs || []).map(function (x, j) { return '<span class="' + (j === sc.tap ? 'ln-tgt' : '') + '"' + (j === sc.tap ? ' data-tap' : '') + '>' + h(x) + '</span>'; }).join('') + '</div>'
        + (sc.note ? '<div class="ln-note"><h4>' + h(sc.note.h) + '</h4><p>' + h(sc.note.p || '') + '</p></div>' : '') + '</div>' + (sc.tap != null ? HAND : '');
      case 'card': return '<div class="ln-card"><h4>' + h(sc.title) + '</h4>' + (sc.body ? '<p>' + h(sc.body) + '</p>' : '') + (sc.fields || []).map(function (f) { return '<label>' + h(f[0]) + '</label><div class="ln-in">' + h(f[1] || '') + '</div>'; }).join('') + '<div class="ln-btns">' + (sc.btns || []).map(function (b, j) { return '<span class="ln-b' + (j === 0 ? ' pri' : '') + (j === sc.tap ? ' ln-tgt' : '') + '"' + (j === sc.tap ? ' data-tap' : '') + '>' + h(b) + '</span>'; }).join('') + '</div></div>'
        + (sc.result ? '<div class="ln-res">' + h(sc.result) + '</div>' : '') + (sc.tap != null ? HAND : '');
      case 'story': return '<div class="ln-story" style="--k:' + acc + '"><div' + A(.2, 'ln-eb', 'color:' + acc) + '>' + h(sc.eyebrow || 'From the Bedside') + '</div><h3' + A(.5) + '>' + h(sc.title) + '</h3><div class="ln-st-b">' + (sc.lines || []).map(function (x, j) { return '<p' + A(1.1 + j * (sc.gap || 1.6)) + '>' + h(x) + '</p>'; }).join('') + '</div>' + (sc.lesson ? '<div' + A(1.4 + (sc.lines || []).length * (sc.gap || 1.6), 'ln-st-l') + '>' + h(sc.lesson) + '</div>' : '') + (sc.note ? '<small' + A(2, 'ln-st-n') + '>' + h(sc.note) + '</small>' : '') + '</div>';
      case 'breathe': return '<div class="ln-br" style="--k:' + acc + '"><h3' + A(.2) + '>' + h(sc.h || 'Breathe with me') + '</h3><div class="ln-brw"><div class="ln-brc"></div><div class="ln-brt"><i>Breathe in</i><i>Breathe out</i></div></div>' + (sc.sub ? '<small' + A(.8) + '>' + h(sc.sub) + '</small>' : '') + '</div>';
      case 'words': return '<div class="ln-wd"><h3' + A(.2) + '>' + h(sc.h) + '</h3>' + (sc.items || []).map(function (x, j) { return '<p' + A(.9 + j * (sc.gap || 1.2), '', 'border-color:' + acc) + '>' + h(x) + '</p>'; }).join('') + (sc.sub ? '<small' + A(1.2 + (sc.items || []).length * (sc.gap || 1.2)) + '>' + h(sc.sub) + '</small>' : '') + '</div>';
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
      '.ggl{--ggl-acc:var(--gold,#8B5E1A);--ggl-line:var(--line,#DDD0B8);--ggl-card:var(--card,#FFFCF6);--ggl-ink:var(--ink,#2C1810);--ggl-soft:var(--ink-soft,#6B5A4D);--ggl-deep:var(--bg-deep,#F2ECE0);--ggl-scale:var(--scale,1);}',
      '.ln-list{display:grid;gap:8px;margin-top:10px;}',
      '.ln-item{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:10px 12px;border:1px solid var(--ggl-line);border-radius:12px;background:var(--ggl-card);color:var(--ggl-ink);font:inherit;cursor:pointer;min-height:56px;}',
      '.ln-item:hover{border-color:var(--ggl-acc);}.ln-item>svg{width:22px;height:22px;color:var(--ggl-acc);flex:none;}',
      '.ln-n{width:34px;height:34px;border-radius:50%;background:var(--ggl-deep);color:var(--ggl-acc);display:grid;place-items:center;font-weight:700;flex:none;}',
      '.ln-item.done .ln-n{background:#5F7D48;color:#fff;}.ln-n svg{width:18px;height:18px;}',
      '.ln-t{flex:1;min-width:0;}.ln-t b{display:block;}.ln-t small{color:var(--ggl-soft);}',
      '.ggl-player{margin-top:6px;}',
      '.ln-stage{position:relative;aspect-ratio:16/9;border-radius:18px;overflow:hidden;background:#F2ECE0;border:1px solid var(--ggl-line);}',
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
      '.ggl-btn svg{width:20px;height:20px;flex:none;}.ggl-btn:focus-visible,.ln-item:focus-visible{outline:3px solid var(--ggl-acc);outline-offset:2px;}',
      '.ln-ctl{display:flex;gap:8px;align-items:center;flex-wrap:wrap;}.ln-ctl .ggl-cn{margin-left:auto;color:var(--ggl-soft);font-size:15px;}',
      '.ln-opts{display:grid;gap:8px;margin:8px 0;}.ln-opts .ggl-btn{justify-content:flex-start;text-align:left;white-space:normal;min-height:52px;border-color:var(--ggl-line);color:var(--ggl-ink);font-weight:500;}',
      '.ln-opts .ln-right{border-color:#5F7D48 !important;background:rgba(95,125,72,.14) !important;}.ln-opts .ln-wrong{border-color:#B8612F !important;}',
      '.ln-yes b{color:#5F7D48;}.ln-no b{color:#B8612F;}.ln-yes,.ln-no{color:var(--ggl-ink);}',
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
      '.ln-six{padding:40px 50px;}.ln-six h3{font-family:\'Cormorant Garamond\',serif;font-weight:600;font-size:42px;margin:0 0 22px;}',
      '.ln-sixg{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}',
      '.ln-sx{background:#FFFCF6;border:1px solid #DDD0B8;border-top:7px solid var(--k);border-radius:16px;padding:16px 18px;min-height:168px;}',
      '.ln-sx b{display:block;font-family:\'Cormorant Garamond\',serif;font-size:32px;color:var(--k);line-height:1;}.ln-sx span{display:block;font-size:19px;font-weight:600;margin-top:4px;}.ln-sx small{display:block;font-size:17px;color:#6B5A4D;margin-top:6px;line-height:1.3;}',
      /* the Learn tab inside a tree app */
      '.ggl-app{position:fixed;inset:0;z-index:2147483000;overflow-y:auto;-webkit-overflow-scrolling:touch;background:#F7F2E8;--ggl-line:#DDD0B8;--ggl-card:#FFFCF6;--ggl-ink:#2C1810;--ggl-soft:#6B5A4D;--ggl-deep:#EFE6D4;color:var(--ggl-ink);font-family:Barlow,system-ui,sans-serif;}',
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
      '.ln-link{margin:0 0 8px;}.ln-link:empty{display:none;}.ln-link a{display:inline-flex;align-items:center;min-height:44px;font-weight:600;color:var(--ggl-acc);}',
      ':root[data-theme="dark"] .ggl-app .ln-link a{color:var(--ggl-lite);}@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .ggl-app .ln-link a{color:var(--ggl-lite);}}',
      '.ggl-sup{margin-top:22px;}.ggl-sup>p{margin:4px 0 0;}.ggl-sup .ggl-card{border-left:6px solid var(--ggl-bar,var(--ggl-acc));}',
      '@media (prefers-reduced-motion:reduce){.go .ln-brc,.go .ln-brt i{animation:none !important;}.ln-brc{transform:scale(.8);}.ln-brt i:first-child{opacity:1;top:-22px;}.ln-brt i:last-child{opacity:1;top:22px;}}',
      '@media (prefers-reduced-motion:reduce){.ln-canvas .a,.ln-ptr,.ln-ring,.ln-panel,.ln-note,.ln-res,.ln-tgt{transition:none !important;}}',
      ".ln-canvas{position:absolute;left:0;top:0;width:960px;height:540px;transform-origin:0 0;font-family:Barlow,system-ui,sans-serif;color:#2C1810;--ln-gold:#8B5E1A;}\n.ln-canvas .a{opacity:0;transform:translateY(14px);transition:opacity .7s ease,transform .7s ease;}.go .ln-canvas .a{opacity:1;transform:none;}\n.ln-hero{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:59% 50%;}\n.ln-tt{position:absolute;left:56px;top:48px;color:#F6EFE2;max-width:520px;}.ln-tt h2{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:60px;line-height:1.02;margin:6px 0 0;text-shadow:0 2px 12px rgba(0,0,0,.3);}\n.ln-tt p{font-size:24px;margin:12px 0 0;color:#F2DDB5;}.ln-eb{font-family:'Barlow Condensed',sans-serif;font-weight:600;letter-spacing:2px;text-transform:uppercase;font-size:20px;color:#F2C46A;}\n.ln-by{font-family:'Barlow Condensed',sans-serif;letter-spacing:2.4px;font-size:16px;margin-top:14px;opacity:.9;}\n.ln-big{position:absolute;inset:0;display:grid;place-content:center;text-align:center;padding:0 90px;}.ln-big p{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:52px;line-height:1.15;margin:0;}.ln-big small{display:block;font-size:26px;color:#6B5A4D;margin-top:20px;}\n.ln-pts{padding:48px 70px;}.ln-pts h3{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:46px;margin:0 0 22px;}\n.ln-pt{display:flex;gap:16px;align-items:flex-start;margin:0 0 18px;font-size:28px;line-height:1.25;}.ln-pt small{display:block;font-size:21px;color:#6B5A4D;margin-top:2px;}\n.ln-dot{width:16px;height:16px;border-radius:50%;flex:none;margin-top:10px;}\n.ln-trees h3{position:absolute;top:56px;left:0;right:0;text-align:center;font-family:'Cormorant Garamond',serif;font-weight:600;font-size:44px;margin:0;}\n.ln-trow{position:absolute;left:30px;right:30px;bottom:90px;display:flex;justify-content:center;gap:18px;}\n.ln-tr{flex:1;display:flex;flex-direction:column;align-items:center;text-align:center;max-width:130px;}.ln-tr img{width:110px;height:110px;border-radius:24px;}\n.ln-tr b{font-family:'Cormorant Garamond',serif;font-size:30px;margin-top:8px;}.ln-tr small{font-size:17px;color:#6B5A4D;}\n.ln-lv{position:absolute;inset:0;display:flex;gap:36px;align-items:center;justify-content:center;padding:0 60px;}\n.ln-lc{flex:1;background:#FFFCF6;border:1px solid #DDD0B8;border-top:8px solid var(--k);border-radius:20px;padding:44px 20px;text-align:center;}\n.ln-lc b{display:block;font-family:'Cormorant Garamond',serif;font-size:46px;color:var(--k);}.ln-lc small{font-size:22px;color:#6B5A4D;}\n.ln-flow{padding:50px 50px;}.ln-flow h3{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:44px;margin:0 0 40px;}\n.ln-frow{display:flex;align-items:center;gap:14px;}.ln-step{flex:1;background:#FFFCF6;border:1px solid #DDD0B8;border-radius:18px;padding:22px 18px;min-height:200px;}\n.ln-step b{display:block;font-size:26px;line-height:1.2;margin-top:10px;}.ln-step small{display:block;font-size:19px;color:#6B5A4D;margin-top:8px;line-height:1.3;}\n.ln-sn{display:inline-grid;place-items:center;width:40px;height:40px;border-radius:50%;background:#8B5E1A;color:#FFF8EC;font-weight:700;font-size:20px;}\n.ln-arr{font-size:36px;color:#8B5E1A;flex:none;}\n.ln-phone{position:absolute;left:56px;top:34px;width:380px;height:472px;background:#FFFCF6;border:1px solid #DDD0B8;border-radius:30px;overflow:hidden;font-size:21px;}\n.ln-ptop{display:flex;align-items:center;gap:10px;padding:14px 16px;color:#F6EFE2;}.ln-ptop img{width:36px;height:36px;border-radius:9px;}.ln-ptop b{font-family:'Cormorant Garamond',serif;font-size:28px;}.ln-ptop span{margin-left:auto;font-size:17px;opacity:.9;}\n.ln-prow{display:flex;justify-content:space-between;padding:13px 18px;border-top:1px solid #EFE6D4;}\n.ln-tgt{transition:background .3s ease 2.6s,box-shadow .3s ease 2.6s;}.go .ln-tgt{background:#F6EEDB;box-shadow:inset 0 0 0 2px #8B5E1A;}\n.ln-panel{position:absolute;right:56px;top:70px;width:400px;background:#FFFCF6;border:1px solid #DDD0B8;border-left:8px solid #8B5E1A;padding:22px 24px;transform:translateX(560px);transition:transform .7s ease 3s;}\n.go .ln-panel{transform:none;}.ln-panel h4{font-family:'Cormorant Garamond',serif;font-size:32px;margin:0;}.ln-panel p{font-size:19px;color:#6B5A4D;margin:6px 0 10px;}.ln-panel li{font-size:22px;line-height:1.6;}\n.ln-ptr{position:absolute;left:820px;top:520px;width:56px;z-index:5;transition:left 1.3s ease 1.1s,top 1.3s ease 1.1s;filter:drop-shadow(0 2px 3px rgba(0,0,0,.25));}\n.go .ln-ptr{left:var(--px,600px);top:var(--py,300px);}\n.ln-ring{position:absolute;width:48px;height:48px;border-radius:50%;border:4px solid #8B5E1A;opacity:0;transform:scale(.3);transition:all .5s ease 2.5s;z-index:4;}.go .ln-ring{opacity:.85;transform:scale(1.5);}\n.ln-fg{position:absolute;inset:30px 40px;background:#F6F0E4;border:1px solid #DDD0B8;border-radius:22px;overflow:hidden;}\n.ln-fgtop{background:#2E2118;color:#D9A847;padding:16px 22px;font-family:'Cormorant Garamond',serif;font-size:28px;}\n.ln-fgtabs{display:flex;gap:6px;padding:12px 16px;border-bottom:1px solid #DDD0B8;flex-wrap:wrap;}.ln-fgtabs span{padding:10px 14px;border-radius:12px;font-size:20px;font-weight:600;color:#6B5A4D;}\n.ln-note{margin:26px 26px;background:#FFFCF6;border:1px solid #DDD0B8;border-radius:18px;padding:22px 24px;opacity:0;transform:translateY(16px);transition:all .7s ease 3s;}.go .ln-note{opacity:1;transform:none;}\n.ln-note h4{font-family:'Cormorant Garamond',serif;font-size:34px;margin:0 0 6px;}.ln-note p{font-size:22px;color:#6B5A4D;margin:0;line-height:1.35;}\n.ln-card{position:absolute;left:70px;top:40px;width:540px;background:#FFFCF6;border:1px solid #DDD0B8;border-radius:22px;padding:24px 28px;}\n.ln-card h4{font-family:'Cormorant Garamond',serif;font-size:34px;margin:0 0 6px;}.ln-card p{font-size:19px;color:#6B5A4D;margin:0 0 10px;line-height:1.35;}\n.ln-card label{display:block;font-size:17px;font-weight:600;margin-top:10px;}.ln-in{border:1px solid #DDD0B8;border-radius:10px;padding:9px 12px;font-size:19px;margin-top:4px;background:#fff;min-height:42px;}\n.ln-btns{display:flex;gap:10px;margin-top:18px;flex-wrap:wrap;}.ln-b{border:1px solid #8B5E1A;color:#8B5E1A;border-radius:999px;padding:10px 18px;font-weight:600;font-size:18px;}.ln-b.pri{background:#8B5E1A;color:#FFF8EC;}\n.ln-res{position:absolute;right:60px;bottom:60px;max-width:300px;background:#2E2118;color:#FFF8EC;border-radius:18px;padding:16px 20px;font-size:20px;line-height:1.3;opacity:0;transform:translateY(14px);transition:all .6s ease 3.1s;}.go .ln-res{opacity:1;transform:none;}\n.ln-qz{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 80px;}.ln-qz .ln-eb{color:#8B5E1A;}.ln-qz h3{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:48px;line-height:1.1;margin:10px 0 0;}\n"
    ].join('\n');
    document.head.appendChild(s);
  }

  /* ---------------- the player ---------------- */
  var CUR = null; // the player on screen
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
  var REV = { points: '.ln-pt', flow: '.ln-step', six: '.ln-sx', trees: '.ln-tr', levels: '.ln-lc', words: '.ln-wd p', parts: 'svg g.a', story: '.ln-st-b p' };
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
  function certable(t) { return !!t && t.kind !== 'support' && t.cert !== false && (t.cert === true || (t.lessons || []).length >= 3); }
  function trackDone(t, done) { return !!t && (t.lessons || []).length > 0 && t.lessons.every(function (l) { return done[l.id]; }); }

  // What the closing scene says, worked out from what is finished on this device.
  function ending(cfg) {
    var done = cfg.done || {}, flat = allLessons(cfg.tracks), i = -1;
    flat.forEach(function (x, j) { if (x.l.id === cfg.lesson.id) i = j; });
    var fin = flat.filter(function (x) { return done[x.l.id]; }).length, count = fin + ' of ' + flat.length + ' finished';
    var nx = null; for (var j = i + 1; j < flat.length; j++) if (!done[flat[j].l.id]) { nx = flat[j]; break; }
    if (!nx) for (var k = 0; k < flat.length; k++) if (!done[flat[k].l.id]) { nx = flat[k]; break; }
    var tr = cfg.track, tdone = trackDone(tr, done), cert = !!cfg.cert && tdone && certable(tr);
    if (tr && tr.kind === 'support') return { ok: true, support: true, eyebrow: 'Here Whenever You Need It', h: 'Take all the time you need.', sub: nx ? 'Another one, if it helps: ' + nx.l.title : 'Come back anytime.', count: '', say: 'Take all the time you need. This is here whenever you need it.', next: nx, cert: false };
    var upnext = nx ? 'Up next: ' + (nx.t !== tr ? nx.t.title + ', ' : '') + 'Lesson ' + (nx.l.n || '') + ', ' + nx.l.title : '';
    var certLine = cert ? ' Your certificate is ready whenever you want it.' : '';
    if (!nx) return { ok: true, eyebrow: 'Every Lesson Complete', h: "You've finished every lesson. Well done.", sub: cert ? 'Your certificate for ' + tr.title + ' is ready.' : 'Come back anytime to watch one again.', count: count, say: "That's it. You've finished every lesson. Well done." + certLine, next: null, cert: cert };
    if (tdone && (tr.lessons || []).length > 1) return { ok: true, eyebrow: 'Series Complete', h: "That's the whole series. Well done.", sub: 'You finished every lesson in ' + tr.title + '. ' + upnext, count: count, say: "That's it for this series. Well done." + certLine + ' Ready for the next one?', next: nx, cert: cert };
    return { ok: true, eyebrow: 'Lesson ' + (cfg.lesson.n || '') + ' Complete', h: "That's it for this lesson. Nice work.", sub: upnext, count: count, say: "That's it for this lesson. Nice work. Ready for the next one?", next: nx, cert: cert };
  }

  function player(host, cfg) {
    css();
    if (CUR) CUR.stop();
    var l = cfg.lesson, acc = cfg.accent || '#8B5E1A', hasQuiz = (l.scenes || []).some(function (s) { return s.k === 'quiz'; });
    var answered = false, P = { i: -1, playing: false, tok: 0, hl: 0, tick: 0, nx: 0 };
    var N = (l.scenes || []).length + 1; // the closing scene is the last one
    host.innerHTML = '<div class="ggl-player"><div class="ln-stage"><div class="ln-canvas"></div><div class="ggl-endbar" role="group" aria-label="What next"></div></div>'
      + '<div class="ln-prog" aria-hidden="true">' + new Array(N + 1).join('<span></span>') + '</div>'
      + '<p class="ln-cap" aria-live="polite"></p><p class="ln-link"></p><div class="ggl-quiz"></div>'
      + '<div class="ln-ctl"><button class="ggl-btn pri" data-g="play">Play</button><button class="ggl-btn" data-g="back" aria-label="Back one scene">Back</button><button class="ggl-btn" data-g="next" aria-label="Next scene">Next</button><button class="ggl-btn quiet" data-g="restart">Start Over</button><span class="ggl-cn"></span></div>'
      + '<div class="ln-vs"></div></div>';
    var st = $('.ln-stage', host), cv = $('.ln-canvas', host), bar = $('.ggl-endbar', host);
    try { if (window.GGRead && GGRead.settings) $('.ln-vs', host).appendChild(GGRead.settings()); } catch (e) {}
    function fit() { if (!st.isConnected) return; var w = st.clientWidth; cv.style.transform = 'scale(' + (w / 960) + ')'; st.classList.toggle('ggl-small', w < 560); if (bar.classList.contains('on')) place(); }
    function place() { var over = st.clientWidth >= 560; bar.classList.toggle('over', over); if (over) st.appendChild(bar); else st.after(bar); }
    function stopTimers() { P.tok++; clearInterval(P.hl); clearInterval(P.tick); clearTimeout(P.nx); if (P.audio) { try { P.audio.onended = P.audio.onerror = null; P.audio.pause(); } catch (e) {} P.audio = null; } var r = st && st.querySelector('.ln-wait'); if (r) r.remove(); }
    function setPlay(p) { P.playing = p; var b = $('[data-g="play"]', host); if (b) b.textContent = p ? 'Pause' : 'Play'; if (!p) { stopTimers(); hush(); } }
    function finish() { if (!answered && hasQuiz) return; if (cfg.onDone) cfg.onDone(l.id); }
    function endScene() {
      if (hasQuiz && !answered && !(cfg.done || {})[l.id]) return { ok: false, eyebrow: 'Almost There', h: 'One question left.', sub: 'Answer it to finish this lesson.', say: 'One question left. Answer it to finish this lesson.', unfinished: true };
      finish(); return ending(cfg);
    }
    function endButtons(e) {
      var b = [];
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
      bar.classList.remove('on', 'over'); bar.innerHTML = ''; if (bar.parentNode !== st) st.appendChild(bar);
      if (last) endButtons(sc._e);
      $('.ln-link', host).innerHTML = sc.link && sc.link.href ? '<a href="' + esc(sc.link.href) + '" target="_blank" rel="noopener">' + esc(sc.link.label || 'Read the Full Story') + '</a>' : '';
      if (last) $('.ln-link', host).innerHTML = '<small class="ln-copyline">&copy; ' + new Date().getFullYear() + ' Grow With Grounded. All rights reserved. To share or reuse these videos, words, or stories, ask us first.</small>';
      var B = beatsOf(sc); P.B = B; P.sc = sc; P.last = last; P.b = 0; P.ph = 'say'; P.t0 = Date.now();
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
      requestAnimationFrame(function () { requestAnimationFrame(function () { st.classList.add('go'); }); });
      // The closing scene always speaks once, even when the lesson was stepped through by hand.
      if (!P.playing && !last) return;
      run(t);
    }
    function reveal(i) {
      (P.items || []).forEach(function (el, j) { if (P.map[j] <= i && el.classList.contains('hold')) { el.style.transitionDelay = '0s'; el.classList.remove('hold'); var pv = el.previousElementSibling; if (pv && pv.classList.contains('ln-arr')) { pv.style.transitionDelay = '0s'; pv.classList.remove('hold'); } } });
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
    var GAP = 650;
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
      // A recorded clip for this sentence, when a lesson has them (audio: true). Falls back to the device voice.
      function clip(i, fin) {
        if (!l.audio || !window.Audio) return false;
        var a = new Audio(url('/audio/learn/' + (typeof l.audio === 'string' ? l.audio + '/' : '') + l.id + '-' + P.i + '-' + i + '.mp3')), ok = false;
        P.audio = a;
        a.onended = function () { fin(); };
        a.onerror = function () { if (!ok && t === P.tok) { ok = true; speak(B[i].t, fin); } };
        a.play().then(function () { ok = true; }).catch(function () { if (!ok && t === P.tok) { ok = true; speak(B[i].t, fin); } });
        return true;
      }
      if (P.ph === 'wait' && B[P.b] && B[P.b].w) { var i0 = P.b; reveal(i0); return waitRing(B[i0].w, t, function () { P.ph = 'say'; P.b = i0 + 1; step(); }); }
      step();
    }
    function answer(v) {
      var sc = l.scenes[P.i], ok = +v === sc.right, fb = $('.ggl-fb', host);
      host.querySelectorAll('.ln-opts .ggl-btn').forEach(function (b, j) { b.classList.toggle('ln-right', ok && j === +v); b.classList.toggle('ln-wrong', !ok && j === +v); });
      if (!ok) { fb.innerHTML = '<p class="ln-no"><b>Not quite.</b> Try another answer.</p>'; return; }
      answered = true; finish();
      fb.innerHTML = '<p class="ln-yes"><b>That\'s it.</b> ' + esc(sc.why || '') + '</p>';
      stopTimers(); var t = P.tok, spoke = speak("That's it. " + (sc.why || '')), start = Date.now();
      // Then roll on into the closing scene, so the lesson always ends with what comes next.
      P.tick = setInterval(function () {
        if (t !== P.tok) return clearInterval(P.tick);
        var busy = spoke && window.speechSynthesis && speechSynthesis.speaking;
        if (!busy && Date.now() - start > (spoke ? 1500 : 4000)) { clearInterval(P.tick); P.nx = setTimeout(function () { if (t === P.tok) show(N - 1); }, 1100); }
      }, 200);
    }
    function onClick(ev) {
      var b = ev.target.closest('[data-g]'); if (!b || !host.contains(b)) return;
      var g = b.getAttribute('data-g');
      if (g === 'play') {
        if (P.playing) setPlay(false);
        else {
          var go = function () { setPlay(true); if (P.i < N - 1 && P.B && (P.b > 0 || P.ph === 'wait')) { stopTimers(); run(P.tok); } else show(P.i >= N - 1 ? 0 : P.i); };
          if (window.GGRead && GGRead.ensure) GGRead.ensure(go); else go();
        }
      }
      else if (g === 'back') show(P.i - 1);
      else if (g === 'next') show(P.i + 1);
      else if (g === 'restart') { setPlay(false); show(0); }
      else if (g === 'e-again') { setPlay(true); show(0); }
      else if (g === 'ans') answer(b.getAttribute('data-v'));
      else if (g === 'e-answer') { var q = -1; l.scenes.forEach(function (s, j) { if (s.k === 'quiz') q = j; }); show(q); }
      else if (g === 'e-open') { var nx = bar._next; ctl.stop(); if (nx && cfg.open) cfg.open(nx.l.id); }
      else if (g === 'e-home') { ctl.stop(); if (cfg.home) cfg.home(); }
      else if (g === 'e-cert') { if (cfg.cert) cfg.cert(cfg.track); }
    }
    function onKey(e) {
      if (CUR !== ctl || !host.isConnected || /input|textarea|select/i.test((e.target && e.target.tagName) || '')) return;
      if (e.key === ' ' && !(e.target && e.target.closest && e.target.closest('button'))) { e.preventDefault(); $('[data-g="play"]', host).click(); }
      else if (e.key === 'ArrowRight') show(P.i + 1); else if (e.key === 'ArrowLeft') show(P.i - 1);
    }
    host.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', fit);
    var ctl = { stop: function () { setPlay(false); stopTimers(); hush(); host.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey); window.removeEventListener('resize', fit); if (CUR === ctl) CUR = null; }, show: show };
    CUR = ctl;
    fit();
    var at = Math.max(0, Math.min((cfg.at || 0), N - 2));
    if ((cfg.done || {})[l.id]) answered = true;
    show(at);
    return ctl;
  }

  /* ---------------- Get Set Up: a good voice (first in every Learn tab and the Field Guide) ---------------- */
  var SETUP = { id: 'gg-setup-voice', n: 1, title: 'Get Set Up: A Good Voice', mins: 4, blurb: 'Make every lesson sound warm and clear on this device.', scenes: [
    { k: 'title', hero: 'grove', eyebrow: 'Get Set Up', h: 'A Good Voice', sub: 'A few minutes now, and every lesson sounds better.', say: 'Before you watch, let us make sure lessons sound good on this device. It takes a few minutes, and you only do it once.' },
    { k: 'big', h: 'Every lesson is read by your device\u2019s own voice.', sub: 'The voice lives on your phone or computer.', say: 'Every lesson, and every Read Aloud button, uses your device\u2019s own voice. Some devices start with a basic voice that sounds robotic. Most have free, natural voices waiting to be downloaded.' },
    { k: 'levels', levels: [['Premium', 'Sounds like a person', '#5F7D48'], ['Enhanced', 'Clear and warm', '#8B5E1A'], ['Basic', 'Robotic', '#B8612F']], say: 'Look for a voice marked Premium. Enhanced is good too, and on Windows, Natural. A basic voice works, but it can make a lesson hard to enjoy.' },
    { k: 'screen', app: 'site', app_name: 'Settings', title: 'iPhone or iPad', rows: [['Accessibility', ''], ['Read & Speak', ''], ['Voices, then English', ''], ['Ava (Premium)', 'Download', '#5F7D48']], tap: 3, panel: { h: 'Siri voices are kept for Siri', sub: 'Websites can use Premium and Enhanced voices.' }, say: 'On an iPhone or iPad, open Settings, then Accessibility. Tap Read and Speak, then Voices, then English. Pick a voice marked Premium or Enhanced, and tap download. Siri voices are kept for Siri, so choose a Premium or Enhanced voice.' },
    { k: 'flow', h: 'On a Mac', steps: [['System Settings', 'Then Accessibility'], ['Read & Speak', 'Then Manage Voices'], ['Download', 'Premium or Enhanced']], say: 'On a Mac, open System Settings, then Accessibility. Open Read and Speak, then Manage Voices. Download a voice marked Premium or Enhanced.' },
    { k: 'points', h: 'On Windows', items: [['Open it in Microsoft Edge', 'Its natural voices sound the most like a person'], ['Pick a natural voice yourself', 'They read through the internet, so you choose them'], ['Or add a Windows voice', 'Settings, Time and language, Speech']], say: 'On Windows, open this page in Microsoft Edge. Its natural voices sound the most like a person. They read the words through the internet, so you pick one yourself in the Voice menu. Or, add a voice in Windows settings, under Time and language, then Speech.' },
    { k: 'flow', h: 'On Android', steps: [['Settings', 'Search Text-to-speech'], ['Google engine', 'Speech Services by Google'], ['Install voice data', 'English, then download']], say: 'On Android, open Settings and search for Text to speech. Choose Speech Services by Google. Then tap Install voice data, choose English, and download a voice you like.' },
    { k: 'points', h: 'Then, once', items: [['Fully close your browser', 'Swipe it away, or quit it'], ['Open the page again', 'New voices load when the browser starts'], ['Pick your voice', 'In the Voice menu, under the video']], say: 'Then, one more step that matters. Fully close your browser. Open the page again. And pick your new voice in the Voice menu, under the video.' },
    { k: 'big', h: 'Pause here and set it up.', sub: 'Then come back and tap Voice Check.', cue: { p: { 0: 2 } }, say: 'If you would like, pause this video now and set up your voice. Then come back and tap Voice Check to hear how it sounds.' },
    { k: 'quiz', q: 'Which voice should you look for?', opts: ['A Siri voice', 'A voice marked Premium or Enhanced', 'The first voice in the list'], right: 1, why: 'Premium and Enhanced voices sound the most natural, and every Grow With Grounded tool can use them.', say: 'Quick question. Which voice should you look for?' }
  ] };
  var SETUP_TRACK = { id: 'gg-setup', title: 'Get Set Up', who: 'Watch this first, once on each device', kind: 'setup', lessons: [SETUP] };
  // The voice card at the top of every Learn tab: what voice is in use, and how it sounds.
  function voiceCard() {
    var I = window.GGRead && GGRead.voiceInfo ? GGRead.voiceInfo() : null;
    var col = I ? ({ great: '#5F7D48', okay: '#C07A26', basic: '#B8612F', none: '#B8612F' })[I.grade] : '#C07A26';
    var said = !I ? 'Open Voice Setup to get a good voice on this device.' : ({ great: 'Sounds great. You\u2019re all set.', okay: 'Sounds okay. A Premium, Enhanced, or Natural voice sounds much more like a person.', basic: 'Sounds basic. Set up a better voice first; it\u2019s free and makes every lesson more enjoyable.', none: 'No voice found yet. If you just added one, fully close your browser and open this page again.' })[I.grade];
    return '<div class="ggl-card ggl-voice" style="border-left:6px solid ' + col + '"><h3>Before You Watch: Set Up a Good Voice</h3>'
      + '<p class="ggl-muted" style="margin:6px 0 0">Lessons and videos are read aloud by your device\u2019s own voice. A Premium, Enhanced, or Natural voice makes them sound like a person instead of a robot.</p>'
      + '<p style="margin:10px 0 0"><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:' + col + ';margin-right:8px;vertical-align:-1px"></span><b>' + (I && I.name ? 'Your voice: ' + esc(I.name) + '.' : 'Your voice') + '</b> ' + esc(said) + '</p>'
      + '<div class="ggl-row"><button class="ggl-btn' + (I && I.grade === 'great' ? '' : ' pri') + '" data-l="vcheck" data-act="ln-vcheck">Voice Check</button><a class="ggl-btn quiet" href="' + url('/voice-setup.html') + '" target="_blank" rel="noopener">Voice Setup Guide</a></div></div>';
  }

  /* ---------------- the Learn tab in a tree app ---------------- */
  var KEY = function (app) { return 'gg-learn:' + app; };
  function load(app) { try { var d = JSON.parse(localStorage.getItem(KEY(app)) || '{}'); return { done: d.done || {}, at: d.at || {} }; } catch (e) { return { done: {}, at: {} }; } }
  function keep(app, d) { try { localStorage.setItem(KEY(app), JSON.stringify({ done: d.done, at: d.at })); } catch (e) {} }
  function script(src, test) { return new Promise(function (ok) { if (test()) return ok(); var s = document.createElement('script'); s.src = src; s.onload = function () { ok(); }; s.onerror = function () { ok(); }; document.head.appendChild(s); }); }
  function needPrint() { return script(url('/shared/gg-print.js?v=pr1'), function () { return !!window.GGPrint; }); }

  var APP = null; // {app, root, view, lesson}
  function open(app, lessonId) {
    var meta = APPS[app]; if (!meta) return;
    css();
    script(url('/shared/learn-lessons.js?v=' + V), function () { return !!window.GG_LEARN; }).then(function () {
      if (APP) close(true);
      needPrint(); // ready ahead of time, so a certificate or flyer opens on the first tap
      var root = document.createElement('div');
      root.className = 'ggl ggl-app'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'Learn ' + meta.name);
      root.style.setProperty('--ggl-acc', meta.btn); root.style.setProperty('--ggl-bar', meta.color);
      root.style.setProperty('--ggl-lite', ({ maple: '#F2A06E', aspen: '#7FC8CC', oak: '#9DB8D0', willow: '#C9C3DA', grove: '#9FCB9F' })[app]);
      root.innerHTML = '<div class="ggl-top"><img src="' + MARK(app + '-tab') + '" alt=""><b>Learn ' + esc(meta.name) + '</b><button class="ggl-x" data-l="close">' + esc(meta.back) + '</button></div><div class="ggl-in" id="ggl-in"></div>';
      document.body.appendChild(root);
      APP = { app: app, root: root, prevFocus: document.activeElement, overflow: document.body.style.overflow };
      document.body.style.overflow = 'hidden';
      root.addEventListener('click', appClick);
      document.addEventListener('keydown', appKey);
      if (lessonId) lesson(lessonId); else list();
    });
  }
  function close(quiet) {
    if (!APP) return;
    if (CUR) CUR.stop();
    document.removeEventListener('keydown', appKey);
    APP.root.remove(); document.body.style.overflow = APP.overflow || '';
    var f = APP.prevFocus; APP = null;
    if (!quiet && f && f.focus) try { f.focus(); } catch (e) {}
  }
  function appKey(e) { if (e.key === 'Escape' && APP) { e.preventDefault(); close(); } }
  function tracksFor(app) { var L = (window.GG_LEARN || {})[app] || {}; return [SETUP_TRACK].concat((L.tracks || []).filter(function (t) { return t && Array.isArray(t.lessons) && t.lessons.length; })); }
  function find(app, id) { var r = null; tracksFor(app).forEach(function (t) { t.lessons.forEach(function (l) { if (l.id === id) r = { t: t, l: l }; }); }); return r; }
  function list() {
    if (CUR) CUR.stop();
    var app = APP.app, meta = APPS[app], L = (window.GG_LEARN || {})[app] || {}, every = tracksFor(app), D = load(app);
    var tr = every.filter(function (t) { return t.kind !== 'support'; }), sup = every.filter(function (t) { return t.kind === 'support'; }), counted = tr.filter(function (t) { return t.kind !== 'setup'; });
    var all = counted.reduce(function (n, t) { return n + t.lessons.length; }, 0), fin = counted.reduce(function (n, t) { return n + t.lessons.filter(function (l) { return D.done[l.id]; }).length; }, 0);
    var el = $('#ggl-in', APP.root);
    var card = function (t) {
      var isSup = t.kind === 'support', n = t.lessons.filter(function (l) { return D.done[l.id]; }).length, ok = n === t.lessons.length && certable(t);
      return '<div class="ggl-card"><div class="ggl-spread"><div><h3>' + esc(t.title) + '</h3>' + (t.who ? '<p class="ggl-muted">' + esc(t.who) + '</p>' : '') + '</div>' + (isSup ? '' : '<span class="ggl-muted">' + n + ' of ' + t.lessons.length + '</span>') + '</div>'
        + '<div class="ln-list">' + t.lessons.map(function (l) { var d = D.done[l.id] && !isSup; return '<button class="ln-item' + (d ? ' done' : '') + '" data-l="open" data-v="' + esc(l.id) + '"><span class="ln-n">' + (d ? IC.check : isSup ? IC.play : esc(String(l.n || ''))) + '</span><span class="ln-t"><b>' + esc(l.title) + '</b><small>' + (l.blurb ? esc(l.blurb) + ' ' : '') + 'About ' + esc(String(l.mins || 2)) + ' minutes' + (D.at[l.id] && !D.done[l.id] && !isSup ? '. Pick up where you left off.' : '') + '</small></span>' + IC.play + '</button>'; }).join('') + '</div>'
        + (ok ? '<div class="ggl-row"><button class="ggl-btn pri" data-l="cert" data-v="' + esc(t.id) + '">' + IC.award + 'Get Your Certificate</button></div>' : certable(t) ? '<p class="ggl-muted" style="margin-top:10px;font-size:15px">Finish every lesson in this series for a Certificate of Completion.</p>' : '') + '</div>';
    };
    var S = L.support || {};
    var supHtml = sup.length ? '<section class="ggl-sup"><div class="ggl-eb">' + esc(S.eyebrow || 'Support') + '</div><h2 style="font-family:\'Cormorant Garamond\',serif;font-weight:600;font-size:30px;margin:2px 0 0">' + esc(S.title || 'Support for Right Now') + '</h2>' + (S.intro ? '<p class="ggl-muted">' + esc(S.intro) + '</p>' : '') + sup.map(card).join('') + '</section>' : '';
    var lesHtml = (tr.length ? (sup.length ? '<section class="ggl-sup"><div class="ggl-eb">Lessons</div><h2 style="font-family:\'Cormorant Garamond\',serif;font-weight:600;font-size:30px;margin:2px 0 0">' + esc(L.lessonsTitle || 'Learn Step by Step') + '</h2>' + (all ? '<p style="margin-top:6px"><b>' + fin + ' of ' + all + '</b> lessons finished on this device.</p>' : '') : (all ? '<p style="margin-top:6px"><b>' + fin + ' of ' + all + '</b> lessons finished on this device.</p>' : '')) + tr.map(card).join('') + (sup.length ? '</section>' : '') : (sup.length ? '' : '<div class="ggl-card"><p>New lessons are on the way. Check back soon.</p></div>'));
    el.innerHTML = '<div class="ggl-eb">Learn</div><h1>' + esc(L.title || ('Learn ' + meta.name)) + '</h1><p class="ggl-muted">' + esc(L.intro || 'Short animated lessons, narrated aloud. Watch them in any order, as often as you like.') + '</p>'
      + voiceCard()
      + (L.supportFirst ? supHtml + lesHtml : lesHtml + supHtml)
      + '<div class="ggl-card"><h3>Share ' + esc(meta.name) + '</h3><p class="ggl-muted">Print a one-page flyer for a bulletin board at school, church, or work. Its QR code opens ' + esc(meta.name) + '.</p><div class="ggl-row"><button class="ggl-btn" data-l="flyer">' + IC.print + 'Print the ' + esc(meta.name === 'The Grove' ? 'Grove' : meta.name) + ' Flyer</button></div></div>'
      + '<p class="ggl-muted" style="font-size:14px;margin-top:16px">Lessons are optional. Your progress stays on this device and goes along in your Grow With Grounded backup.</p>';
    APP.root.scrollTop = 0; var h = $('h1', el); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
  }
  function lesson(id) {
    var app = APP.app, f = find(app, id); if (!f) return list();
    var D = load(app), el = $('#ggl-in', APP.root), meta = APPS[app];
    var sup = f.t.kind === 'support';
    el.innerHTML = '<button class="ggl-link" data-l="home">&larr; ' + (sup ? 'Back to Learn' : 'All lessons') + '</button><div class="ggl-eb" style="margin-top:6px">' + esc(f.t.title) + (sup ? '' : ', Lesson ' + esc(String(f.l.n || ''))) + '</div><h1>' + esc(f.l.title) + '</h1><div id="ggl-host"></div>';
    APP.root.scrollTop = 0;
    player($('#ggl-host', el), {
      lesson: f.l, track: f.t, tracks: tracksFor(app).filter(function (t) { return (t.kind === 'support') === sup; }), done: D.done, at: D.at[f.l.id] || 0, accent: meta.btn,
      onAt: function (i) { var d = load(app); d.at[f.l.id] = i; keep(app, d); },
      onDone: function (lid) { var d = load(app); if (!d.done[lid]) { d.done[lid] = today(); keep(app, d); } D.done[lid] = d.done[lid]; },
      open: function (nid) { lesson(nid); },
      home: function () { list(); },
      cert: function (t) { cert(app, t); }
    });
  }
  function cert(app, t) {
    var D = load(app), when = t.lessons.map(function (l) { return D.done[l.id]; }).filter(Boolean).sort().pop() || today();
    var name = prompt('Name to print on the certificate:', ''); if (name === null) return; name = name.trim(); if (!name) return;
    needPrint().then(function () { if (window.GGPrint) GGPrint.certificate({ tree: app, name: name, title: t.certTitle || (APPS[app].name + ': ' + t.title), body: t.certLine || ('For finishing every lesson in the ' + t.title + ' series.'), date: when, kind: 'series' }); });
  }
  function appClick(e) {
    var b = e.target.closest('[data-l]'); if (!b || !APP) return;
    var a = b.getAttribute('data-l'), v = b.getAttribute('data-v');
    if (a === 'close') close();
    else if (a === 'home') list();
    else if (a === 'open') lesson(v);
    else if (a === 'cert') { var t = tracksFor(APP.app).filter(function (x) { return x.id === v; })[0]; if (t) cert(APP.app, t); }
    else if (a === 'vcheck') { if (window.GGRead && GGRead.check) GGRead.check(function () { if (APP) list(); }); }
    else if (a === 'flyer') { var app = APP.app; needPrint().then(function () { if (window.GGPrint) GGPrint.flyer(app); }); }
  }

  window.GGLearn = { setup: SETUP, setupTrack: SETUP_TRACK, voiceCard: voiceCard, beatsOf: beatsOf, scene: scene, player: player, open: open, close: close, ending: ending, certable: certable, trackDone: trackDone, css: css, apps: APPS, version: V };
})();
