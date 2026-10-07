/* Grounded profiles: load the shared profile button on every page that uses this menu */
(function () {
  if (window.GGP || document.querySelector('script[src*="gg-profiles.js"]')) return;
  var home = /(^|\.)growwithgrounded\.com$|^localhost$|^127\.0\.0\.1$/.test(location.hostname) ? '' : 'https://growwithgrounded.com';
  var s = document.createElement('script'); s.src = home + '/shared/gg-profiles.js?v=lb6'; s.defer = true;
  (document.head || document.documentElement).appendChild(s);
})();

/* Grounded shared Tools menu
   One file, loaded by every Grounded site. To add a tool, add it to GN_GROUPS below.
   If this file ever fails to load, each site's plain Tools link still works. */
(function () {
  var HOME = 'https://growwithgrounded.com';
  var mk = function (k) { return '<img class="gn-mark" src="' + HOME + '/shared/marks/' + k + '-small.svg" alt="" width="42" height="42">'; };
  var ic = {
    maple: mk('maple'), aspen: mk('aspen'), pine: mk('pine'), birch: mk('birch'), oak: mk('oak'), sequoia: mk('sequoia'), willow: mk('willow'), grove: mk('grove'),
    tree: '<svg viewBox="0 0 24 24" fill="none" stroke="#8B5E1A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.5" r="5.5"/><path d="M12 14v7"/><path d="M8 21h8"/><path d="M12 17l-3 2M12 16.5l3 2"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="#4A5D3A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c0-8.5 5.5-14 15-14 0 9.5-6 14-15 14z"/><path d="M5 19l8.5-8.5"/></svg>',
    door: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21"/><path d="M3 21h18"/><circle cx="14.5" cy="12.5" r="1"/></svg>',
    shelf: '<svg viewBox="0 0 24 24" fill="none" stroke="#6E4A14" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4v16M9 4v16M14 5l4 15M3 20h18"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="#6E4A14" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/></svg>',
    lock: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>'
  };
  var GN_GROUPS = [
    { name: 'The Trees', items: [
      { id: 'maple', title: 'Maple', desc: 'For grades K to 5', href: HOME + '/maple/', icon: ic.maple, bg: '#FBE1D4' },
      { id: 'aspen', title: 'Aspen', desc: 'For grades 6 to 8', href: HOME + '/aspen/', icon: ic.aspen, bg: '#DDF0EC' },
      { id: 'pine', title: 'Pine', desc: 'For grades 9 to 12', href: HOME + '/pine/', icon: ic.pine, bg: '#E2EEDB' },
      { id: 'birch', title: 'Birch', desc: 'For ages 18 to 26', href: HOME + '/birch/', icon: ic.birch, bg: '#F3EED9' },
      { id: 'oak', title: 'Oak', desc: 'For ages 25 to 60', href: HOME + '/oak/', icon: ic.oak, bg: '#F1E6CC' },
      { id: 'sequoia', title: 'Sequoia', desc: 'For 60 and up', href: HOME + '/sequoia/', icon: ic.sequoia, bg: '#F3DED6' },
      { id: 'willow', title: 'Willow', desc: 'For hospice, and the people who love them', href: HOME + '/willow/', icon: ic.willow, bg: '#E8ECDD' }
    ] },
    { name: 'Together', items: [
      { id: 'grove', title: 'The Grove', desc: 'A shared space to grow side by side', href: HOME + '/grove/', icon: ic.grove, bg: '#E3EFD6' }
    ] },
    { name: 'Further Reading', items: [
      { id: 'library', title: 'The Grounded Library', desc: 'The books behind Grounded, twenty years of study', href: HOME + '/library/', icon: ic.shelf, bg: '#F1E6CC' }
    ] },
    { name: 'For Professionals', items: [
      { id: 'field', title: 'Grounded Field Guide', desc: 'For chaplains, pastors, teachers, and counselors. Access code required', href: HOME + '/field-guide/', icon: ic.book, bg: '#EDE7DA', locked: true }
    ] }
  ];


  function here() {
    var h = location.hostname, p = location.pathname;
    if (p.indexOf('/oak') === 0 || h.indexOf('oak.') === 0) return 'oak';
    if (p.indexOf('/maple') === 0 || h.indexOf('maple.') === 0) return 'maple';
    if (p.indexOf('/aspen') === 0 || h.indexOf('aspen.') === 0) return 'aspen';
    if (p.indexOf('/pine') === 0) return 'pine';
    if (p.indexOf('/birch') === 0) return 'birch';
    if (p.indexOf('/sequoia') === 0) return 'sequoia';
    if (p.indexOf('/willow') === 0) return 'willow';
    if (p.indexOf('/grove') === 0 || p.indexOf('/garden') === 0 || h.indexOf('garden.') === 0) return 'grove';
    if (p.indexOf('/field-guide') === 0) return 'field';
    if (p.indexOf('/library') === 0) return 'library';
    return '';
  }

  var css = '' +
    '.gn-tools-btn{font:inherit;background:none;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:4px;}' +
    '.gn-tools-btn svg{width:12px;height:12px;transition:transform .2s ease;}' +
    '.gn-tools-btn[aria-expanded="true"] svg{transform:rotate(180deg);}' +
    '.gn-panel{position:absolute;z-index:9999;background:#fff;color:#2A2A2A;border:1px solid #EADFC6;border-radius:16px;box-shadow:0 18px 40px rgba(0,0,0,.16);padding:18px 18px 16px;width:min(760px,calc(100vw - 24px));display:none;font-family:Barlow,system-ui,sans-serif;text-align:left;}' +
    '.gn-panel.gn-show{display:block;}' +
    '.gn-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 18px;}' +
    '.gn-group h4{font-family:"Barlow Condensed",Barlow,sans-serif;font-weight:700;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#8B5E1A;margin:0 0 6px;}' +
    'a.gn-tool{display:flex;gap:12px;align-items:center;padding:8px !important;border-radius:12px !important;white-space:normal !important;font-size:15px !important;text-decoration:none !important;color:#2A2A2A !important;border:none !important;text-transform:none !important;letter-spacing:0 !important;font-family:Barlow,system-ui,sans-serif !important;}' +
    'a.gn-tool:hover,a.gn-tool:focus-visible,a.gn-tool.gn-here{background:#F6EEDB;}' +
    'a.gn-tool > span:last-child{min-width:0;flex:1;}' +
    '.gn-ic{width:42px;height:42px;border-radius:11px;flex:none;display:grid;place-items:center;}' +
    '.gn-ic svg{width:24px;height:24px;}' +
    '.gn-ic .gn-mark{width:42px;height:42px;border-radius:11px;display:block;}' +
    '.gn-tool b{display:flex;align-items:center;gap:6px;font-weight:600;font-size:15.5px;line-height:1.25;}' +
    '.gn-tool small{display:block;font-size:13px;line-height:1.35;color:#5B6A73;margin-top:1px;}' +
    '.gn-tag{font-size:11px;font-weight:600;color:#fff;background:#8B5E1A;border-radius:999px;padding:1px 8px;white-space:nowrap;}' +
    '.gn-soon{display:flex;gap:12px;align-items:center;padding:8px;border-radius:12px;opacity:.72;cursor:default;font-size:15px;}' +
    '.gn-tag-soon{background:#6B2E22;}' +
    '.gn-lock{display:inline-flex;color:#8B5E1A;}' +
    '.gn-foot{display:flex;justify-content:space-between;align-items:center;gap:10px;border-top:1px solid #EADFC6;margin-top:12px;padding-top:10px;}' +
    'a.gn-all{font-family:Barlow,system-ui,sans-serif !important;font-weight:600 !important;font-size:14px !important;color:#8B5E1A !important;text-transform:none !important;letter-spacing:0 !important;padding:0 !important;border:none !important;border-bottom:1px solid currentColor !important;border-radius:0 !important;text-decoration:none !important;}' +
    '.gn-back{display:none;font-family:Barlow,system-ui,sans-serif;font-size:15px;font-weight:600;color:#8B5E1A;background:none;border:none;padding:6px 0 12px;cursor:pointer;text-align:left;}' +
    '.gn-sub-mode .gn-back{display:block;}' +
    '.gn-sub-mode.gn-panel{position:static;width:100%;box-sizing:border-box;box-shadow:none;border:none;border-radius:0;padding:6px 0 4px;background:transparent;}' +
    '.gn-sub-mode .gn-grid{grid-template-columns:1fr;}' +
    '.gn-menu-sub > *:not(.gn-panel){display:none !important;}' +
    '@media (max-width:600px){.gn-grid{grid-template-columns:1fr;}}' +
    '';
  var GN_DARK = ''+

      '.gn-panel{background:#241F19;color:#F3EDE3;border-color:#3A322A;}' +
      'a.gn-tool{color:#F3EDE3 !important;}' +
      'a.gn-tool:hover,a.gn-tool:focus-visible,a.gn-tool.gn-here{background:#332A20;}' +
      '.gn-tool small{color:#C2B6A4;}' +
      '.gn-group h4,a.gn-all,.gn-back,.gn-lock{color:#D9A847 !important;}' +
      '.gn-foot{border-color:#3A322A;}' +
      '.gn-sub-mode.gn-panel{background:transparent;}';

  /* Scope dark-only rules so they follow the phone setting unless the visitor picks a theme */
  function themed(rules) {
    var parts = rules.split('}').filter(function (r) { return r.indexOf('{') > -1; });
    function scope(prefix) {
      return parts.map(function (r) {
        var i = r.indexOf('{'), sel = r.slice(0, i), body = r.slice(i);
        return sel.split(',').map(function (x) { return prefix + ' ' + x.trim(); }).join(',') + body + '}';
      }).join('');
    }
    return '@media (prefers-color-scheme: dark){' + scope(':root:not([data-theme="light"])') + '}' + scope(':root[data-theme="dark"]');
  }

  function build() {
    var menu = document.getElementById('site-menu');
    if (!menu) return;
    var link = Array.prototype.slice.call(menu.querySelectorAll('a')).filter(function (a) { return /#tools$/.test(a.getAttribute('href') || '') || /^\s*tools\s*$/i.test(a.textContent); })[0];
    if (!link) return;
    var st = document.createElement('style'); st.textContent = css + themed(GN_DARK); document.head.appendChild(st);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = link.className + ' gn-tools-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'gn-panel');
    btn.innerHTML = 'Tools <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    link.parentNode.replaceChild(btn, link);
    // keep the site's own menu link styling
    var ls = getComputedStyle(menu.querySelector('a') || btn);
    ['fontFamily', 'fontWeight', 'fontSize', 'letterSpacing', 'textTransform', 'color', 'padding'].forEach(function (k) { btn.style[k] = ls[k]; });

    var panel = document.createElement('div');
    panel.className = 'gn-panel';
    panel.id = 'gn-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Grounded tools');
    function render() {
      var cur = here();
      panel.innerHTML = '<button type="button" class="gn-back">&#8592; Menu</button><div class="gn-grid">' +
        GN_GROUPS.map(function (g) {
          return '<div class="gn-group">' + '<h4>' + g.name + '</h4>' +
            g.items.map(function (t) {
            var row;
            if (t.soon) row = '<div class="gn-tool gn-soon" aria-disabled="true"><span class="gn-ic" style="background:' + t.bg + '">' + t.icon + '</span><span><b>' + t.title + ' <span class="gn-tag gn-tag-soon">Coming soon</span></b><small>' + t.desc + '</small></span></div>';
            else {
              var isHere = t.id === cur;
              row = '<a class="gn-tool' + (isHere ? ' gn-here' : '') + '" href="' + t.href + '"' + (isHere ? ' aria-current="page"' : '') + '>' +
                '<span class="gn-ic" style="background:' + t.bg + ';color:' + (t.color || '#8B5E1A') + '">' + t.icon + '</span>' +
                '<span><b>' + t.title + (t.locked ? ' <span class="gn-lock" title="Access code required">' + ic.lock + '</span>' : '') + (isHere ? ' <span class="gn-tag">You are here</span>' : '') + '</b><small>' + t.desc + '</small></span></a>';
            }
            return row;
          }).join('') + '</div>';
        }).join('') +
        '</div><div class="gn-foot"><a class="gn-all" href="' + HOME + '/tools.html">See all tools</a></div>';
      panel.querySelector('.gn-back').onclick = function () { closePanel(); btn.focus(); };
    }
    render();
    window.addEventListener('hashchange', render);

    var menuBtn = document.querySelector('.menu-btn');
    function isMobile() { return !!menuBtn && getComputedStyle(menuBtn).display !== 'none'; }
    function place() {
      var r = btn.getBoundingClientRect();
      var w = Math.min(760, window.innerWidth - 24);
      var left = Math.max(12, Math.min(r.right - w, window.innerWidth - w - 12));
      panel.style.top = (r.bottom + window.scrollY + 10) + 'px';
      panel.style.left = (left + window.scrollX) + 'px';
    }
    // Phones: the open menu fits the screen under the top bar and scrolls inside itself,
    // so every tool can be reached (the bar is pinned, so the page can't scroll it into view).
    function fit() {
      if (isMobile() && (menu.classList.contains('open') || menu.classList.contains('gn-menu-sub'))) {
        var top = Math.max(0, menu.getBoundingClientRect().top);
        var vh = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
        menu.style.maxHeight = Math.max(160, vh - top) + 'px';
        menu.style.overflowY = 'auto'; menu.style.overscrollBehavior = 'contain'; menu.style.webkitOverflowScrolling = 'touch';
      } else { menu.style.maxHeight = ''; menu.style.overflowY = ''; menu.style.overscrollBehavior = ''; }
    }
    function openPanel() {
      if (isMobile()) {
        panel.classList.add('gn-sub-mode');
        if (panel.parentNode !== menu) menu.appendChild(panel);
        menu.classList.add('gn-menu-sub');
        menu.scrollTop = 0; fit();
      } else {
        panel.classList.remove('gn-sub-mode');
        if (panel.parentNode !== document.body) document.body.appendChild(panel);
        place();
      }
      panel.classList.add('gn-show');
      btn.setAttribute('aria-expanded', 'true');
    }
    function closePanel() {
      panel.classList.remove('gn-show');
      menu.classList.remove('gn-menu-sub');
      btn.setAttribute('aria-expanded', 'false');
      fit();
    }
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (panel.classList.contains('gn-show')) closePanel(); else openPanel();
    });
    document.addEventListener('click', function (e) {
      if (!panel.classList.contains('gn-show')) return;
      if (panel.contains(e.target) && !e.target.closest('a')) return;
      if (e.target === btn) return;
      closePanel();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('gn-show')) { closePanel(); btn.focus(); } });
    window.addEventListener('resize', function () { if (panel.classList.contains('gn-show') && !isMobile()) { closePanel(); } fit(); });
    if (window.visualViewport) window.visualViewport.addEventListener('resize', fit);
    if (menuBtn) menuBtn.addEventListener('click', function () { closePanel(); setTimeout(fit, 0); });
    if (window.MutationObserver) new MutationObserver(fit).observe(menu, { attributes: true, attributeFilter: ['class'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();

/* ===== Light and dark toggle (shared across every Grounded site) ===== */
(function () {
  var KEY = 'gg_theme';
  var root = document.documentElement;
  function saved() {
    try { var m = document.cookie.match(/(?:^|; )gg_theme=(light|dark)/); if (m) return m[1]; return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(t) {
    try { localStorage.setItem(KEY, t); } catch (e) {}
    var dom = /(^|\.)growwithgrounded\.com$/.test(location.hostname) ? '; Domain=.growwithgrounded.com' : '';
    document.cookie = KEY + '=' + t + '; Path=/; Max-Age=31536000; SameSite=Lax' + dom;
  }
  function effective() {
    var a = root.getAttribute('data-theme');
    if (a === 'light' || a === 'dark') return a;
    return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function apply(t) { root.setAttribute('data-theme', t); root.style.colorScheme = t; }
  var s = saved(); if (s === 'light' || s === 'dark') apply(s);
  var MOON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
  var SUN = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>';
  function mount() {
    if (document.querySelector('.gg-theme')) return;
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'gg-theme';
    function paint() {
      var d = effective() === 'dark';
      btn.innerHTML = d ? SUN : MOON;
      btn.setAttribute('aria-label', d ? 'Switch to light mode' : 'Switch to dark mode');
      btn.title = d ? 'Light mode' : 'Dark mode';
    }
    paint();
    btn.addEventListener('click', function () { var t = effective() === 'dark' ? 'light' : 'dark'; apply(t); save(t); paint(); window.dispatchEvent(new CustomEvent('gg-theme', { detail: t })); });
    if (window.matchMedia) { try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', paint); } catch (e) {} }
    var st = document.createElement('style');
    st.textContent = '.gg-theme{flex:none;display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:50%;border:1px solid rgba(128,112,90,.45);background:transparent;color:inherit;cursor:pointer;margin:0 6px;padding:0;transition:background .2s ease;}.gg-theme:hover{background:rgba(160,120,60,.14);}.gg-theme svg{display:block;}';
    document.head.appendChild(st);
    var size = document.querySelector('.size-btn'), menuBtn = document.querySelector('.menu-btn'), menu = document.getElementById('site-menu');
    var anchor = size || menuBtn;
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(btn, anchor);
    else if (menu && menu.parentNode) menu.parentNode.appendChild(btn);
    else { btn.style.cssText += 'position:fixed;top:12px;right:12px;z-index:95;background:rgba(255,248,236,.9);'; document.body.appendChild(btn); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();

/* ===== Site search in the header (Rebrand Session 2) =====
   A Search button sits top left, next to the logo, on every page that loads this file.
   It opens a search panel over the page. search.js loads on first open.
   Nothing typed is ever sent anywhere. Press / to open, Escape to close. */
(function () {
  if (window.GGSearchUI) return; window.GGSearchUI = true;
  var base = /(^|\.)growwithgrounded\.com$|^localhost$|^127\.0\.0\.1$/.test(location.hostname) ? '' : 'https://growwithgrounded.com';
  var css = '' +
    '.ggs-btn{display:inline-flex;align-items:center;gap:7px;font:600 15px/1 Barlow,system-ui,sans-serif;color:inherit;background:transparent;border:1.5px solid rgba(139,94,26,.35);border-radius:999px;padding:8px 14px;cursor:pointer;margin-left:14px;white-space:nowrap;flex:none;}' +
    '.ggs-btn:hover,.ggs-btn:focus-visible{border-color:#8B5E1A;}' +
    '.ggs-btn svg{width:17px;height:17px;flex:none;}' +
    '@media (max-width:640px){.ggs-btn{padding:8px 10px;margin-left:8px;}.ggs-btn span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}}' +
    '.ggs{--bg:#FAF7F2;--bg-deep:#F2ECE0;--ink:#2C1810;--ink-soft:#6B5A4D;--line:#E2D8C3;--card:#FFFFFF;--gold:#8B5E1A;position:fixed;inset:0;z-index:10000;background:rgba(28,20,12,.55);display:flex;justify-content:center;align-items:flex-start;padding:max(16px,env(safe-area-inset-top,0px)) 12px 16px;overflow-y:auto;font-family:Barlow,system-ui,sans-serif;color:var(--ink);}' +
    '.ggs[hidden]{display:none;}' +
    '.ggs-panel{position:relative;width:min(820px,100%);margin-top:6vh;}' +
    '.ggs-close{position:absolute;right:12px;top:12px;width:40px;height:40px;border-radius:20px;border:1px solid var(--line);background:var(--card);color:var(--ink);font-size:24px;line-height:1;cursor:pointer;z-index:2;}' +
    '.ggs .site-search{margin:0;padding:26px 26px 22px;background:var(--card);border:1px solid var(--line);border-top:4px solid var(--gold);border-radius:16px;max-width:none;box-shadow:0 24px 60px rgba(0,0,0,.25);}' +
    '.ggs .ss-label{display:block;font-family:"Cormorant Garamond",Georgia,serif;font-weight:700;font-size:31px;line-height:1.15;padding-right:44px;}' +
    '.ggs .ss-hint{color:var(--ink-soft);font-size:16px;margin:4px 0 16px;}' +
    '.ggs .ss-field{display:flex;align-items:center;gap:10px;border:1.5px solid var(--line);background:var(--bg);border-radius:999px;padding:0 18px;color:var(--ink-soft);}' +
    '.ggs .ss-field:focus-within{border-color:var(--gold);}' +
    '.ggs .ss-field svg{width:22px;height:22px;flex:none;}' +
    '.ggs .ss-field input{flex:1;min-width:0;font:inherit;font-size:19px;color:var(--ink);background:transparent;border:none;padding:13px 0;outline:none;}' +
    '.ggs .ss-try{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;}' +
    '.ggs .ss-try button{font:inherit;font-size:15px;border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:999px;padding:6px 14px;cursor:pointer;}' +
    '.ggs .site-search.has-results .ss-try{display:none;}' +
    '.ggs .ss-status{font-size:15px;color:var(--ink-soft);margin:10px 0 0;min-height:1em;}' +
    '.ggs .ss-group{margin-top:18px;}' +
    '.ggs .ss-group h4{font-family:"Barlow Condensed",Barlow,sans-serif;font-weight:700;font-size:15px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin:0 0 4px;}' +
    '.ggs .ss-group h4 span{color:var(--ink-soft);margin-left:4px;}' +
    '.ggs .ss-list{list-style:none;margin:0;padding:0;border-top:1px solid var(--line);}' +
    '.ggs .ss-item{border-bottom:1px solid var(--line);}' +
    '.ggs .ss-row{display:block;width:100%;text-align:left;font:inherit;color:var(--ink);background:none;border:none;padding:11px 34px 11px 4px;cursor:pointer;text-decoration:none;position:relative;border-radius:6px;}' +
    '.ggs .ss-row:hover{background:var(--bg-deep);}' +
    '.ggs .ss-title{display:block;font-weight:600;font-size:18px;line-height:1.35;}' +
    '.ggs .ss-sub{display:block;font-size:15.5px;color:var(--ink-soft);line-height:1.45;margin-top:2px;}' +
    '.ggs .ss-tag{display:inline-block;font-weight:600;font-size:12.5px;line-height:1;padding:4px 9px;border-radius:999px;color:var(--gold);background:var(--bg-deep);}' +
    '.ggs .ss-card{background:var(--bg-deep);border-radius:10px;padding:14px 18px 18px;margin:0 0 12px;font-size:17px;line-height:1.55;}' +
    '.ggs .ss-card ul,.ggs .ss-card ol{padding-left:22px;}' +
    '.ggs .ss-card-h{font-weight:700;font-size:14px;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink-soft);margin:4px 0 6px;}' +
    '.ggs .ss-go{display:inline-block;margin-top:10px;font-weight:600;font-size:15px;padding:10px 20px;border-radius:999px;background:var(--gold);color:var(--card);text-decoration:none;}' +
    '.ggs .ss-more{font:inherit;font-size:15.5px;font-weight:600;color:var(--gold);background:none;border:none;border-bottom:1px solid currentColor;padding:0;margin-top:10px;cursor:pointer;}' +
    '.ggs .ss-note,.ggs .ss-empty{margin-top:12px;font-size:16px;}' +
    '.ggs .ss-crisis{margin-top:14px;padding:14px 18px;border-left:4px solid #9C2F2F;background:rgba(156,47,47,.09);border-radius:0 10px 10px 0;font-size:17px;}' +
    '.ggs .ss-crisis a{color:inherit;font-weight:700;}' +
    '@media (max-width:600px){.ggs-panel{margin-top:0}.ggs .site-search{padding:20px 16px 16px;}.ggs .ss-label{font-size:26px;}.ggs .ss-field input{font-size:17px;}}';
  var dark = '.ggs{--bg:#1F1A14;--bg-deep:#171310;--ink:#F3EDE3;--ink-soft:#C2B6A4;--line:#3A322A;--card:#2A241D;--gold:#D9A847;}.ggs-btn{border-color:rgba(217,168,71,.45);}';
  var icon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
  var ov, opener = null, loading = null;
  // One loader for search.js, shared by the header search and every in-app search box.
  window.GGSearchLoad = function () {
    if (window.GGSearch && window.GGSearch.attach) return Promise.resolve(window.GGSearch);
    if (loading) return loading;
    loading = new Promise(function (ok) {
      var s = document.createElement('script'); s.src = base + '/search.js?v=w12';
      s.onload = function () { ok(window.GGSearch); }; s.onerror = function () { loading = null; ok(null); };
      document.body.appendChild(s);
    });
    return loading;
  };
  // In-app boxes call GGFind(this, {...}) on every keystroke (see GGSearch.attach in search.js).
  window.GGFind = function (input, opts) { return window.GGSearchLoad().then(function (G) { return G ? G.attach(input, opts) : 0; }); };
  function build() {
    var head = document.querySelector('header.topbar, header.site-header, header');
    if (!head) return;
    var st = document.createElement('style');
    st.textContent = css + '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) ' + dark.replace(/\}\./g, '} :root:not([data-theme="light"]) .') + '}' + ':root[data-theme="dark"] ' + dark.replace(/\}\./g, '} :root[data-theme="dark"] .');
    document.head.appendChild(st);
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'ggs-btn'; btn.setAttribute('aria-haspopup', 'dialog');
    btn.innerHTML = icon + '<span>Search</span>';
    var anchor = head.querySelector('.brand-sub, .brand-tool') || head.querySelector('.brand');
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(btn, anchor.nextSibling);
    else (head.firstElementChild || head).insertBefore(btn, (head.firstElementChild || head).firstChild);
    var onTools = !!document.getElementById('site-search');
    ov = document.createElement('div');
    ov.className = 'ggs'; ov.hidden = true; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Search');
    ov.innerHTML = '<div class="ggs-panel"><button type="button" class="ggs-close" aria-label="Close search">&times;</button>' +
      (onTools ? '' : '<form class="site-search" id="site-search" role="search" autocomplete="off">' +
      '<label class="ss-label" for="ss-q">Search Grow With Grounded</label>' +
      '<p class="ss-hint">Services, When Life Changes guides, daily practices, tools, books, and stories, for every age. Your search stays on your device.</p>' +
      '<div class="ss-field">' + icon + '<input id="ss-q" type="search" placeholder="Try: vaping, bullying, funeral, wedding cost" enterkeyhint="search"></div>' +
      '<div class="ss-try" role="group" aria-label="Try a search"><button type="button" data-try="vaping">Vaping</button><button type="button" data-try="bullying">Bullying</button><button type="button" data-try="someone died">Someone died</button><button type="button" data-try="wedding">Weddings</button><button type="button" data-try="rates">Rates</button></div>' +
      '<p class="ss-status" id="ss-status" aria-live="polite"></p><div id="ss-results"></div></form>') + '</div>';
    document.body.appendChild(ov);
    function open() {
      if (onTools) { var f = document.getElementById('ss-q'); if (f) { f.scrollIntoView({ block: 'center' }); f.focus(); } return; }
      opener = document.activeElement;
      ov.hidden = false; document.documentElement.style.overflow = 'hidden';
      window.GGSearchLoad().then(function (G) { if (G) G.mountSite(); });
      setTimeout(function () { var i = document.getElementById('ss-q'); if (i) i.focus(); }, 30);
    }
    function close() { ov.hidden = true; document.documentElement.style.overflow = ''; if (opener && opener.focus) opener.focus(); }
    btn.addEventListener('click', open);
    ov.querySelector('.ggs-close').addEventListener('click', close);
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !ov.hidden) { close(); return; }
      var t = e.target, typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable || t.tagName === 'SELECT');
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) { e.preventDefault(); open(); }
    });
    if (!onTools && new URLSearchParams(location.search).get('q')) open();
    window.GGOpenSearch = open;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
