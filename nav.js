/* Grounded shared Tools menu
   One file, loaded by every Grounded site. To add a tool, add it to GN_GROUPS below.
   If this file ever fails to load, each site's plain Tools link still works. */
(function () {
  var HOME = 'https://growwithgrounded.com';
  var ic = {
    tree: '<svg viewBox="0 0 24 24" fill="none" stroke="#8B5E1A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.5" r="5.5"/><path d="M12 14v7"/><path d="M8 21h8"/><path d="M12 17l-3 2M12 16.5l3 2"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="#4A5D3A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c0-8.5 5.5-14 15-14 0 9.5-6 14-15 14z"/><path d="M5 19l8.5-8.5"/></svg>',
    sapling: '<svg viewBox="4 6 102 70"><defs><clipPath id="gn-sun"><path d="M0 0H110V72H100Q55 62 10 72H0Z"/></clipPath></defs><circle cx="55" cy="72" r="33" fill="#FFD23F" clip-path="url(#gn-sun)"/><path d="M10 72Q55 62 100 72" stroke="#5A3414" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M55 67Q52 52 55 36" stroke="#5A3414" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M55 56C41 56 34 46 37 36C48 36 55 44 55 56Z" fill="#6CCB3A" stroke="#1F5C0E" stroke-width="2"/><path d="M55 46C68 45 74 35 72 24C61 24 55 33 55 46Z" fill="#A5E072" stroke="#1F5C0E" stroke-width="2"/><circle cx="55" cy="36" r="5" fill="#FF6B6B"/></svg>',
    door: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21"/><path d="M3 21h18"/><circle cx="14.5" cy="12.5" r="1"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="#6E4A14" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/></svg>',
    lock: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>'
  };
  var GN_GROUPS = [
    { name: 'For you', items: [
      { id: 'soultree', title: 'Soul Tree', desc: 'A six-part checkup for the health of your soul', href: 'https://soultree.growwithgrounded.com/', icon: ic.tree, bg: '#F1E6CC' },
      { id: 'garden', title: 'Tending the Garden', desc: 'A 12-week practice for whole health', href: 'https://garden.growwithgrounded.com/', icon: ic.leaf, bg: '#E3EFD6' }
    ] },
    { name: 'For kids and families', items: [
      { id: 'sapling', title: 'Sapling', desc: 'A gentle checkup for kids, grades K to 5', href: 'https://sapling.growwithgrounded.com/', icon: ic.sapling, bg: '#D8F3FF' }
    ] },
    { name: 'When Life Changes', items: [
      { id: 'lc-adult', title: 'For your own life', desc: 'Guides for 50+ hard seasons, for you or someone you help', href: 'https://soultree.growwithgrounded.com/#life', icon: ic.door, bg: '#EFE3D0', color: '#6E4A14' },
      { id: 'lc-kids', title: 'Talking with kids', desc: 'Guides for 50+ hard talks with children', href: 'https://sapling.growwithgrounded.com/#life', icon: ic.door, bg: '#E3DAF7', color: '#6B3FBF' }
    ] },
    { name: 'For practitioners', items: [
      { id: 'field', title: 'Grounded Field Guide', desc: 'Private training and resources, access code required', href: HOME + '/field-guide/', icon: ic.book, bg: '#EDE7DA', locked: true }
    ] }
  ];

  function here() {
    var h = location.hostname, p = location.pathname, hash = location.hash || '';
    if (h.indexOf('soultree.') === 0) return /^#life/.test(hash) ? 'lc-adult' : 'soultree';
    if (h.indexOf('sapling.') === 0) return /^#(life|talk)/.test(hash) ? 'lc-kids' : 'sapling';
    if (h.indexOf('garden.') === 0) return 'garden';
    if (p.indexOf('/field-guide') === 0) return 'field';
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
    '.gn-tool b{display:flex;align-items:center;gap:6px;font-weight:600;font-size:15.5px;line-height:1.25;}' +
    '.gn-tool small{display:block;font-size:13px;line-height:1.35;color:#5B6A73;margin-top:1px;}' +
    '.gn-tag{font-size:11px;font-weight:600;color:#fff;background:#8B5E1A;border-radius:999px;padding:1px 8px;white-space:nowrap;}' +
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
      '.gn-sub-mode.gn-panel{background:transparent;}' ;



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
          return '<div class="gn-group"><h4>' + g.name + '</h4>' + g.items.map(function (t) {
            var isHere = t.id === cur;
            return '<a class="gn-tool' + (isHere ? ' gn-here' : '') + '" href="' + t.href + '"' + (isHere ? ' aria-current="page"' : '') + '>' +
              '<span class="gn-ic" style="background:' + t.bg + ';color:' + (t.color || '#8B5E1A') + '">' + t.icon + '</span>' +
              '<span><b>' + t.title + (t.locked ? ' <span class="gn-lock" title="Access code required">' + ic.lock + '</span>' : '') + (isHere ? ' <span class="gn-tag">You are here</span>' : '') + '</b><small>' + t.desc + '</small></span></a>';
          }).join('') + '</div>';
        }).join('') +
        '</div><div class="gn-foot"><a class="gn-all" href="' + HOME + '/#tools">See all tools</a></div>';
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
    function openPanel() {
      if (isMobile()) {
        panel.classList.add('gn-sub-mode');
        if (panel.parentNode !== menu) menu.appendChild(panel);
        menu.classList.add('gn-menu-sub');
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
    window.addEventListener('resize', function () { if (panel.classList.contains('gn-show')) { closePanel(); } });
    if (menuBtn) menuBtn.addEventListener('click', function () { closePanel(); });
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
