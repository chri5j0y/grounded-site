/* =====================================================================
   GROUNDED . TREE ART POSITIONS: MAPLE, ASPEN, WILLOW, THE GROVE (GWG BLD 780)
   Where the six glowing markers sit on each of these paintings, for
   shared/gg-treeart.js (load this file right after it). Every number is a
   percent of the whole painting. crop is the part each view shows. On The
   Grove's painting the markers sit on the great oak in the middle of the
   grove. Spots were read off a 5 percent grid and checked by eye
   (workshop patches/bld780/tests/art-kids/dots-*.png).

   GGTreeArtKids.stickers(el, html)  lays a small row (Maple's critters)
     in a corner of each painting inside el, and lays it again when a view
     redraws (the wide and phone paintings switch at 600 wide).
   Nothing here reads or saves anything about a person.
   ===================================================================== */
(function () {
  if (!window.GGTreeArt) return;
  var W = [2000, 800], P = [900, 720], PT = [900, 1600];
  GGTreeArt.add('maple', {
    wide: { size: W, crop: [20, 22, 34, 74], at: { roots: [36.5, 89], trunk: [36.6, 81], bark: [36.9, 73.5], branches: [40.5, 61], leaves: [33, 50], fruit: [37.5, 34] } },
    phone: { size: P, crop: [16, 22, 62, 74], at: { roots: [45, 90.5], trunk: [45, 81.5], bark: [45.3, 72.5], branches: [52, 64], leaves: [35, 53], fruit: [46, 34] } }
  });
  GGTreeArt.add('aspen', {
    wide: { size: W, crop: [20, 18, 34, 78], at: { roots: [36, 89], trunk: [36, 81], bark: [36.2, 73], branches: [41, 58], leaves: [30, 45], fruit: [36, 29] } },
    phone: { size: P, crop: [14, 18, 62, 78], at: { roots: [43.5, 90.5], trunk: [43.5, 80.5], bark: [43.6, 70.5], branches: [51, 62], leaves: [31, 47], fruit: [44, 28] } }
  });
  GGTreeArt.add('willow', {
    wide: { size: W, crop: [4, 16, 42, 70], at: { roots: [20.6, 77], trunk: [21.8, 68.5], bark: [24.2, 59.5], branches: [28, 48], leaves: [15, 42], fruit: [31, 30] } },
    phone: { size: P, crop: [6, 18, 70, 66], at: { roots: [33, 77], trunk: [34.6, 68.5], bark: [37.5, 58], branches: [47, 49], leaves: [19, 47], fruit: [52, 29] } }
  });
  GGTreeArt.add('grove', {
    wide: { size: W, crop: [30, 24, 44, 66], at: { roots: [52, 83.5], trunk: [51.6, 77], bark: [53.6, 70.5], branches: [59, 57], leaves: [44, 50], fruit: [55, 39] } },
    phone: { size: PT, crop: [24, 42, 66, 34], at: { roots: [58.5, 72.3], trunk: [56.5, 67.8], bark: [59.2, 63.2], branches: [66.5, 57], leaves: [50.5, 55.5], fruit: [58, 49] } }
  });

  // A small row laid in the bottom left corner of each painting inside el.
  var ROWS = [];
  function lay(el, html) {
    if (!el || !html) return;
    el.querySelectorAll('.gta-art').forEach(function (a) {
      if (a.classList.contains('gta-then') || a.querySelector('.gtk-stickers')) return;
      a.insertAdjacentHTML('beforeend', '<span class="gtk-stickers" aria-hidden="true">' + html + '</span>');
    });
  }
  function stickers(el, html) {
    if (!document.getElementById('gtk-style')) {
      var st = document.createElement('style'); st.id = 'gtk-style';
      st.textContent = '.gtk-stickers{position:absolute;left:8px;bottom:8px;z-index:2;display:flex;gap:4px;padding:4px 6px;border-radius:999px;background:rgba(255,252,246,.86);box-shadow:0 2px 8px rgba(46,33,24,.18);pointer-events:none;}'
        + '.gtk-stickers svg{width:26px;height:26px;display:block;}'
        + '@media (max-width:600px){.gtk-stickers svg{width:22px;height:22px;}}';
      document.head.appendChild(st);
    }
    ROWS = ROWS.filter(function (r) { return r.el.isConnected && r.el !== el; });
    ROWS.push({ el: el, html: html });
    lay(el, html);
  }
  if (window.matchMedia) {
    var mq = matchMedia('(max-width:600px)'), fn = function () { setTimeout(function () { ROWS.forEach(function (r) { if (r.el.isConnected) lay(r.el, r.html); }); }, 0); };
    if (mq.addEventListener) mq.addEventListener('change', fn); else if (mq.addListener) mq.addListener(fn);
  }
  // A ring tap redraws the growth view: lay the row again after it.
  document.addEventListener('click', function (e) { if (e.target && e.target.closest && e.target.closest('[data-gta]')) setTimeout(function () { ROWS.forEach(function (r) { if (r.el.isConnected) lay(r.el, r.html); }); }, 0); });
  window.GGTreeArtKids = { stickers: stickers };
})();
