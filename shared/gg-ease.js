/* GROUNDED . EASE OF USE (shared, GWG BLD 756 accessibility pass)
   One small panel that opens from the A+ button in every tree app (and from Settings, under Reading and
   Display): Text Size, Reduce Motion, and Higher Contrast.
   - Reduce Motion sets html.gg-reduce-motion and html[data-motion="reduce"] (the Today scene, the Learn
     player, and every CSS motion rest). The device's own reduce motion setting still works as before.
   - Higher Contrast sets html.gg-contrast: deeper soft words, clearer lines and edges, stronger focus rings,
     underlined links, and a deeper shade behind words on the painted heroes.
   These are device display settings (like light or dark), kept in this browser only as gg-ease. They hold
   nothing about a person. Load this file in the head so the settings apply before the page paints. */
(function () {
  'use strict';
  if (window.GGEase) return;
  var KEY = 'gg-ease', root = document.documentElement;
  function read() { try { var o = JSON.parse(localStorage.getItem(KEY) || '{}'); return o && typeof o === 'object' ? o : {}; } catch (e) { return {}; } }
  function write(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  var S = read();
  function apply() {
    root.classList.toggle('gg-reduce-motion', !!S.motion);
    if (S.motion) root.setAttribute('data-motion', 'reduce'); else if (root.getAttribute('data-motion') === 'reduce') root.removeAttribute('data-motion');
    root.classList.toggle('gg-contrast', !!S.contrast);
  }
  apply();

  /* ---------- styles: the settings themselves, then the panel ---------- */
  var CSS = [
    /* Reduce Motion: every CSS animation and transition finishes at once */
    'html.gg-reduce-motion *,html.gg-reduce-motion *::before,html.gg-reduce-motion *::after{animation-duration:.01ms !important;animation-delay:0s !important;animation-iteration-count:1 !important;transition-duration:.01ms !important;transition-delay:0s !important;scroll-behavior:auto !important;}',
    /* Higher Contrast: the shared color names every app uses */
    ':root.gg-contrast:not(.gg-x){--ink-soft:color-mix(in srgb,var(--ink) 88%,var(--bg));--line:color-mix(in srgb,var(--ink) 48%,var(--bg));--soft:#FFFFFF;}',
    ':root.gg-contrast:not(.gg-x) .site-footer{--fsoft:var(--fink);--fline:var(--fink);}',
    ':root.gg-contrast:not(.gg-x) .gg-hero.gg-photo{--shade:linear-gradient(180deg,rgba(18,11,6,.74) 0%,rgba(18,11,6,.62) 45%,rgba(18,11,6,.4) 70%,rgba(18,11,6,.12) 100%);}',
    'html.gg-contrast p a,html.gg-contrast li a,html.gg-contrast .text-link{text-decoration:underline !important;text-underline-offset:3px;}',
    'html.gg-contrast :focus-visible{outline:3px solid var(--ink,#2C1810) !important;outline-offset:2px !important;}',
    'html.gg-contrast .gg-src,html.gg-contrast .gg-src-line,html.gg-contrast .footer-copyright,html.gg-contrast .muted{opacity:1 !important;}',
    /* the tree app header keeps every button on screen at tablet widths and high zoom (the tree still links home) */
    '@media (max-width:900px){.topbar .brand .brand-name{display:none;}}',
    '@media (max-width:360px){.topbar .brand-sep{display:none;}.topbar .topbar-inner,.topbar .topbar-in{gap:6px !important;padding-left:10px !important;padding-right:10px !important;}.topbar .size-btn,.topbar .menu-btn{min-width:36px !important;padding:0 5px !important;}.topbar .brand-sub{font-size:18px !important;}.topbar .brand-tool{font-size:18px !important;}.topbar .brand-tree{width:28px !important;height:auto !important;}}',
    /* skip link (first stop on every tree app page) */
    '.gg-skip{position:absolute;left:-9999px;top:8px;z-index:2147483001;background:var(--card,#FFFFFF);color:var(--ink,#2C1810);padding:10px 16px;border-radius:10px;border:2px solid var(--ink,#2C1810);font:600 16px/1.2 Barlow,system-ui,sans-serif;text-decoration:none;}',
    '.gg-skip:focus{left:12px;outline:3px solid var(--ink,#2C1810);outline-offset:2px;}',
    /* the panel */
    '.gge{position:fixed;z-index:2147483000;width:min(340px,calc(100vw - 32px));max-height:calc(100vh - 32px);overflow:auto;background:var(--card,#FFFFFF);color:var(--ink,#2C1810);border:1px solid var(--line,#E2D8C3);border-radius:16px;box-shadow:0 14px 40px rgba(20,12,4,.28);padding:16px 16px 14px;font-family:Barlow,system-ui,sans-serif;font-size:16px;line-height:1.4;text-align:left;}',
    '.gge[hidden]{display:none;}',
    '.gge h2{font-family:"Cormorant Garamond",Georgia,serif;font-size:26px;line-height:1.1;font-weight:600;margin:0 0 10px;color:inherit;}',
    '.gge-row{padding:10px 0;border-top:1px solid var(--line,#E2D8C3);}',
    '.gge-k{display:block;font-weight:600;margin:0 0 6px;}',
    '.gge-sz{display:flex;gap:8px;}',
    '.gge-sz button{flex:1;min-height:44px;font:inherit;font-weight:600;border:1px solid var(--line,#E2D8C3);background:transparent;color:inherit;border-radius:10px;cursor:pointer;}',
    '.gge-sz button[aria-pressed="true"]{border:2px solid var(--ink,#2C1810);background:color-mix(in srgb,var(--ink,#2C1810) 10%,transparent);}',
    '.gge-sw{display:flex;align-items:flex-start;gap:12px;cursor:pointer;}',
    '.gge-sw input{appearance:none;-webkit-appearance:none;flex:none;width:46px;height:28px;margin:0;border-radius:999px;border:2px solid var(--ink,#2C1810);background:transparent;position:relative;cursor:pointer;}',
    '.gge-sw input::after{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:var(--ink,#2C1810);transition:left .15s;}',
    '.gge-sw input:checked{background:var(--ink,#2C1810);}.gge-sw input:checked::after{left:21px;background:var(--card,#FFFFFF);}',
    '.gge-sw span b{display:block;}.gge-sw span small{display:block;color:var(--ink-soft,#6B5A4D);font-size:14px;}',
    '.gge-note{font-size:14px;color:var(--ink-soft,#6B5A4D);margin:8px 0 0;}.gge-note a{color:inherit;text-decoration:underline;}',
    '.gge-done{display:block;margin:12px 0 0 auto;min-height:44px;padding:0 20px;font:inherit;font-weight:600;border-radius:999px;border:1px solid var(--ink,#2C1810);background:var(--ink,#2C1810);color:var(--card,#FFFFFF);cursor:pointer;}',
    '.gge :focus-visible{outline:3px solid var(--ink,#2C1810);outline-offset:2px;}'
  ].join('\n');
  function css() { if (document.getElementById('gge-css')) return; var s = document.createElement('style'); s.id = 'gge-css'; s.textContent = CSS; (document.head || root).appendChild(s); }
  css();

  /* ---------- the A+ button: tapping it opens the panel ---------- */
  var btn = null, mine = '', word = 'normal', pass = false, panel = null, from = null;
  function sizeNow() {
    if (!btn) return 0;
    var t = (btn.textContent || '').trim();
    if (t === 'A++') return 1;
    if (t === 'A') return 2;
    return word === 'larger' ? 1 : word === 'largest' ? 2 : 0;
  }
  var NAMES = ['normal', 'larger', 'largest'];
  function relabel() {
    if (!btn) return;
    var al = btn.getAttribute('aria-label') || '';
    if (al !== mine) { var m = al.match(/largest|larger|normal/i); if (m) word = m[0].toLowerCase(); }
    mine = 'Text Size and Ease of Use, text now ' + NAMES[sizeNow()];
    if (al !== mine) btn.setAttribute('aria-label', mine);
  }
  // tap the app's own text size step (it saves the size its own way) until the size matches
  function setSize(k) {
    if (!btn) return;
    for (var i = 0; i < 3 && sizeNow() !== k; i++) { pass = true; try { btn.click(); } finally { pass = false; } relabel(); }
    paint();
  }
  function hook() {
    var b = document.getElementById('size-btn');
    if (!b || b === btn) return;
    btn = b;
    btn.setAttribute('aria-haspopup', 'dialog'); btn.setAttribute('aria-expanded', 'false');
    relabel();
    try { new MutationObserver(relabel).observe(btn, { attributes: true, attributeFilter: ['aria-label'], childList: true, characterData: true, subtree: true }); } catch (e) {}
  }
  // capture phase: the app's own one-tap step runs only when this panel asks for it
  document.addEventListener('click', function (e) {
    if (pass) return;
    var b = e.target && e.target.closest && e.target.closest('#size-btn');
    if (!b) return;
    e.preventDefault(); e.stopPropagation(); if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    hook();
    if (panel && !panel.hidden) close(); else open(b);
  }, true);

  /* ---------- the panel ---------- */
  function build() {
    css();
    panel = document.createElement('div');
    panel.className = 'gge'; panel.id = 'gge'; panel.hidden = true;
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'false'); panel.setAttribute('aria-labelledby', 'gge-h');
    panel.innerHTML = '<h2 id="gge-h">Ease of Use</h2>'
      + '<div class="gge-row" data-gge="size"><span class="gge-k" id="gge-szk">Text Size</span><div class="gge-sz" role="group" aria-labelledby="gge-szk">'
      + '<button type="button" data-sz="0" aria-label="Normal text">A</button><button type="button" data-sz="1" aria-label="Larger text">A+</button><button type="button" data-sz="2" aria-label="Largest text">A++</button></div></div>'
      + '<div class="gge-row"><label class="gge-sw"><input type="checkbox" role="switch" data-ease="motion"><span><b>Reduce Motion</b><small>Calms the moving touches, light, and slides.</small></span></label></div>'
      + '<div class="gge-row"><label class="gge-sw"><input type="checkbox" role="switch" data-ease="contrast"><span><b>Higher Contrast</b><small>Darker words, clearer edges, and underlined links.</small></span></label></div>'
      + '<p class="gge-note">Every video also has Read Instead, with the whole script as text. <a href="https://growwithgrounded.com/accessibility.html" target="_blank" rel="noopener">Accessibility</a></p>'
      + '<button type="button" class="gge-done" data-gge="done">Done</button>';
    document.body.appendChild(panel);
    panel.addEventListener('click', function (e) {
      var s = e.target.closest('[data-sz]'); if (s) return setSize(+s.getAttribute('data-sz'));
      if (e.target.closest('[data-gge="done"]')) close();
    });
    panel.addEventListener('change', function (e) {
      var k = e.target.getAttribute && e.target.getAttribute('data-ease'); if (!k) return;
      S[k] = !!e.target.checked; write(S); apply();
      try { window.dispatchEvent(new CustomEvent('gg-ease', { detail: { motion: !!S.motion, contrast: !!S.contrast } })); } catch (x) {}
    });
    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      var f = panel.querySelectorAll('button:not([disabled]),input,a[href]'); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    document.addEventListener('pointerdown', function (e) { if (panel && !panel.hidden && !panel.contains(e.target) && !(btn && btn.contains(e.target))) close(true); }, true);
    window.addEventListener('resize', function () { if (panel && !panel.hidden) place(); });
  }
  function paint() {
    if (!panel) return;
    var k = sizeNow(), row = panel.querySelector('[data-gge="size"]');
    row.hidden = !btn;
    panel.querySelectorAll('[data-sz]').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-sz') === k)); });
    panel.querySelectorAll('[data-ease]').forEach(function (i) { i.checked = !!S[i.getAttribute('data-ease')]; });
  }
  function place() {
    var r = from && from.isConnected ? from.getBoundingClientRect() : null, w = panel.offsetWidth, vw = document.documentElement.clientWidth;
    if (r && r.bottom > 0 && r.top < innerHeight) {
      panel.style.top = Math.round(r.bottom + 8) + 'px';
      panel.style.left = Math.round(Math.max(16, Math.min(vw - w - 16, r.right - w))) + 'px';
    } else {
      panel.style.top = Math.round(Math.max(16, (innerHeight - panel.offsetHeight) / 2)) + 'px';
      panel.style.left = Math.round((vw - w) / 2) + 'px';
    }
  }
  function open(anchor) {
    hook();
    if (!panel) build();
    from = anchor || null;
    paint(); panel.hidden = false; place();
    if (btn) btn.setAttribute('aria-expanded', String(from === btn));
    var f = panel.querySelector('[data-sz][aria-pressed="true"]') || panel.querySelector('input'); try { f.focus(); } catch (e) {}
  }
  function close(outside) {
    if (!panel || panel.hidden) return;
    panel.hidden = true; if (btn) btn.setAttribute('aria-expanded', 'false');
    if (!outside && from && from.isConnected) { try { from.focus(); } catch (e) {} }
  }

  window.GGEase = {
    open: function (anchor) { open(anchor && anchor.nodeType === 1 ? anchor : null); },
    close: function () { close(); },
    get: function () { return { motion: !!S.motion, contrast: !!S.contrast }; },
    set: function (o) { o = o || {}; if ('motion' in o) S.motion = !!o.motion; if ('contrast' in o) S.contrast = !!o.contrast; write(S); apply(); paint(); },
    reduced: function () { return !!S.motion || !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hook); else hook();
  window.addEventListener('load', hook);
})();
