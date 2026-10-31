/* Grounded profiles: load the shared profile button on every page that uses this menu */
(function () {
  if (window.GGP || document.querySelector('script[src*="gg-profiles.js"]')) return;
  var home = /(^|\.)growwithgrounded\.com$|^localhost$|^127\.0\.0\.1$/.test(location.hostname) ? '' : 'https://growwithgrounded.com';
  var s = document.createElement('script'); s.src = home + '/shared/gg-profiles.js?v=b888'; s.defer = true;
  (document.head || document.documentElement).appendChild(s);
})();

/* Grounded shared Tools menu
   One file, loaded by every Grounded site. To add a tool, add it to GN_GROUPS below.
   If this file ever fails to load, each site's plain Tools link still works. */
(function () {
  // the live site, or this same copy when testing on this computer (the same check as the profiles loader above)
  var HOME = /(^|\.)growwithgrounded\.com$|^localhost$|^127\.0\.0\.1$/.test(location.hostname) ? '' : 'https://growwithgrounded.com';
  var mk = function (k, v) { return '<img class="gn-mark" src="' + HOME + '/shared/marks/' + k + '-small.svg' + (v ? '?v=' + v : '') + '" alt="" width="42" height="42">'; };
  var ic = {
    maple: mk('maple'), aspen: mk('aspen'), pine: mk('pine'), birch: mk('birch'), oak: mk('oak'), sequoia: mk('sequoia'), willow: mk('willow'), grove: mk('grove'), fieldguide: mk('fieldguide'), library: mk('library'), marriage: mk('marriage'), heartwood: mk('heartwood'), gm: mk('grounded-marriage'), farewell: mk('farewell'), obituary: mk('obituary'), eulogy: mk('eulogy'),
    tree: '<svg viewBox="0 0 24 24" fill="none" stroke="#8B5E1A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.5" r="5.5"/><path d="M12 14v7"/><path d="M8 21h8"/><path d="M12 17l-3 2M12 16.5l3 2"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="#4A5D3A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c0-8.5 5.5-14 15-14 0 9.5-6 14-15 14z"/><path d="M5 19l8.5-8.5"/></svg>',
    door: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21"/><path d="M3 21h18"/><circle cx="14.5" cy="12.5" r="1"/></svg>',
    shelf: '<svg viewBox="0 0 24 24" fill="none" stroke="#6E4A14" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4v16M9 4v16M14 5l4 15M3 20h18"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="#6E4A14" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/></svg>',
    candle: '<svg viewBox="0 0 24 24" fill="none" stroke="#6E4A14" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1.6 1.8 2.4 3.2 2.4 4.4a2.4 2.4 0 0 1-4.8 0c0-1.2.8-2.6 2.4-4.4z"/><path d="M9 11h6v10H9z"/><path d="M6 21h12"/></svg>',
    speak: '<svg viewBox="0 0 24 24" fill="none" stroke="#6E4A14" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/></svg>',
    lock: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>'
  };
  var GN_GROUPS = [
    { name: 'The Trees', items: [
      { id: 'maple', title: 'Maple', desc: 'For grades K to 5', href: HOME + '/maple/', icon: ic.maple, bg: '#FBE1D4' },
      { id: 'aspen', title: 'Aspen', desc: 'For grades 6 to 8', href: HOME + '/aspen/', icon: ic.aspen, bg: '#DDF0EC' },
      { id: 'pine', title: 'Pine', desc: 'For grades 9 to 12', href: HOME + '/pine/', icon: ic.pine, bg: '#E2EEDB' },
      { id: 'birch', title: 'Birch', desc: 'For ages 18 to 26', href: HOME + '/birch/', icon: ic.birch, bg: '#F3EED9' },
      { id: 'oak', title: 'Oak', desc: 'For ages 26 to 60', href: HOME + '/oak/', icon: ic.oak, bg: '#F1E6CC' },
      { id: 'sequoia', title: 'Sequoia', desc: 'For 60 and up', href: HOME + '/sequoia/', icon: ic.sequoia, bg: '#F3DED6' },
      { id: 'willow', title: 'Willow', desc: 'For hospice, and the people who love them', href: HOME + '/willow/', icon: ic.willow, bg: '#E8ECDD' }
    ] },
    { name: 'Together', items: [
      { id: 'grove', title: 'The Grove', desc: 'For families, faith communities, groups, and teams, side by side', href: HOME + '/grove/', icon: ic.grove, bg: '#E3EFD6' },
      { id: 'heartwood', title: 'Heartwood', desc: 'The couples app in The Grounded Marriage. Preview it, then open yours with your code', href: HOME + '/heartwood/', icon: ic.heartwood, bg: '#E3EAF2' }
    ] },
    // Healthy Living (BLD 868): The Grounded Way (with Tending) and Living Sober, matching the Tools page. Grounded Recipes joins in BLD 875.
    { name: 'Healthy Living', items: [
      { id: 'way', title: 'The Grounded Way', desc: 'The app: Today, Week, Grow, and Library, with your plan, your tree, and Tending in one private place', href: HOME + '/the-grounded-way.html', icon: '<img class="gn-mark" src="' + HOME + '/shared/cards/way-grounded.webp?v=b895" alt="" width="42" height="42">', bg: '#E2EEDB' },
      { id: 'recipes', title: 'Grounded Recipes', desc: 'Every meal and the big days, sized for your table, with ingredients, steps, and a calm voice to guide you', href: HOME + '/recipes/', icon: '<img class="gn-mark" src="' + HOME + '/shared/cards/way-recipes.webp?v=b875" alt="" width="42" height="42">', bg: '#F3E5CC' },
      { id: 'sober', title: 'Living Sober', desc: 'For anyone growing sober and the people who love them: words for every day, short videos, and 90 days to begin', href: HOME + '/living-sober.html', icon: '<img class="gn-mark" src="' + HOME + '/shared/cards/way-sober.webp?v=b870" alt="" width="42" height="42">', bg: '#DCE8E1' }
    ] },
    { name: 'When Someone Dies', items: [
      { id: 'farewell', title: 'Planning a Farewell', desc: 'One thing at a time, when a death is near or has happened', href: HOME + '/planning-a-farewell.html', icon: ic.farewell, bg: '#F1E6CC' },
      { id: 'obituary', title: 'Obituary Helper', desc: 'Their life, in your words', href: HOME + '/obituary-helper.html', icon: ic.obituary, bg: '#F1E6CC' },
      { id: 'eulogy', title: 'Eulogy Helper', desc: 'For the one who will speak', href: HOME + '/eulogy-helper.html', icon: ic.eulogy, bg: '#F1E6CC' }
    ] },
    { name: 'Libraries', items: [
      { id: 'library', title: 'Book Library', desc: 'The books behind Grounded, twenty years of study', href: HOME + '/library/', icon: ic.library, bg: '#F1E6CC' },
      { id: 'readings', title: 'Readings Library', desc: 'Prayers, poems, blessings, songs, and stories for all faith traditions and everything in-between, with Listen', href: HOME + '/readings.html', icon: mk('readings'), bg: '#F1E6CC' }
    ] },
    { name: 'For Professionals', items: [
      { id: 'field', title: 'Field Guide', desc: 'For chaplains, pastors, teachers, coaches, and anyone who walks with others: a Guide for every tree, For Guides training, and the Certified Grounded Guide', href: HOME + '/the-field-guide.html', icon: ic.fieldguide, bg: '#EDE7DA' }
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
    if (p.indexOf('/the-field-guide') === 0) return 'field'; // the Field Guide's own page (GWG BLD 838)
    if (p.indexOf('/heartwood') === 0) return 'heartwood';
    if (p.indexOf('/library') === 0) return 'library';
    if (p.indexOf('/planning-a-farewell') === 0) return 'farewell';
    if (p.indexOf('/obituary-helper') === 0) return 'obituary';
    if (p.indexOf('/eulogy-helper') === 0) return 'eulogy';
    if (p.indexOf('/readings') === 0) return 'readings';
    if (p.indexOf('/living-sober') === 0) return 'sober';
    if (p.indexOf('/the-grounded-way') === 0) return 'way'; // GWG BLD 866
    if (p.indexOf('/recipes') === 0) return 'recipes'; // GWG BLD 875
    if (p.indexOf('/home/') === 0 || p === '/home') return 'home';
    return '';
  }

  var css = '' +
    '.gn-tools-btn{font:inherit;background:none;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:4px;}' +
    '.gn-tools-btn svg{width:12px;height:12px;transition:transform .2s ease;}' +
    '.gn-tools-btn[aria-expanded="true"] svg{transform:rotate(180deg);}' +
    '.gn-panel{position:fixed;z-index:9999;max-height:calc(100vh - 90px);overflow-y:auto;background:#fff;color:#2A2A2A;border:1px solid #EADFC6;border-radius:16px;box-shadow:0 18px 40px rgba(0,0,0,.16);padding:18px 18px 16px;width:min(760px,calc(100vw - 24px));display:none;font-family:Barlow,system-ui,sans-serif;text-align:left;}' +
    '.gn-panel.gn-show{display:block;}' +
    '.gn-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 18px;}' +
    '.gn-group .gn-h{line-height:1.3;font-family:"Barlow Condensed",Barlow,sans-serif;font-weight:700;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#8B5E1A;margin:0 0 6px;}' +
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
    '.gn-sub-mode .gn-grid,.gn-sub-mode.gn-svc .gn-grid{grid-template-columns:1fr;}' +
    '.gn-menu-sub > *:not(.gn-panel){display:none !important;}' +
    'a.gn-tool.gn-row{padding:6px 8px !important;}' +
    '.gn-svc .gn-grid{grid-template-columns:minmax(0,1fr) minmax(0,1fr);}' +
    '@media (max-width:600px){.gn-grid,.gn-svc .gn-grid{grid-template-columns:1fr;}}' +
    '';
  var GN_DARK = ''+

      '.gn-panel{background:#241F19;color:#F3EDE3;border-color:#3A322A;}' +
      'a.gn-tool{color:#F3EDE3 !important;}' +
      'a.gn-tool:hover,a.gn-tool:focus-visible,a.gn-tool.gn-here{background:#332A20;}' +
      '.gn-tool small{color:#C2B6A4;}' +
      '.gn-group .gn-h,a.gn-all,.gn-back,.gn-lock{color:#D9A847 !important;}' +
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

  /* The Services menu (GWG BLD 772): The Grounded Marriage one tap away, then the six families of services.
     Each family is a picture card that opens its own page (BLD 817, services-<family>.html); See all services stays at the foot.
     It opens like Tools: a panel under the button on a computer, the menu's own sub-page on a phone. */
  var SVC_FEATURED = { title: 'The Grounded Marriage', desc: 'Premarital sessions with Chris and Kayti, with Heartwood', href: HOME + '/the-grounded-marriage.html', bg: '#E3EAF2',
    icon: ic.gm };
  var SVC_FAMILIES = [
    ['Marriage', 'Weddings and The Grounded Marriage', 'marriage'],
    ['Celebrations', 'Blessings and milestones', 'celebrations'],
    ['Farewells', 'Funerals, memorials, and celebrations of life', 'farewells'],
    ['Hard Seasons', 'Sudden loss, recovery, big changes, and grief', 'hard-seasons'],
    ['Growth', 'Spiritual guidance, meditation, and rest', 'growth'],
    ['For Teams', 'Speaking and training', 'for-teams']
  ];
  function onPage(href) {
    var a = (href.replace(HOME, '') || '/').replace(/\.html$/, ''), b = location.pathname.replace(/\.html$/, '');
    return a === b;
  }
  function toolsBody() {
    var cur = here();
    return GN_GROUPS.map(function (g) {
      return '<div class="gn-group">' + '<div class="gn-h">' + g.name + '</div>' +
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
    }).join('');
  }
  function svcBody() {
    var f = SVC_FEATURED, fh = onPage(f.href);
    return '<div class="gn-group"><div class="gn-h">Featured Program</div>' +
      '<a class="gn-tool' + (fh ? ' gn-here' : '') + '" href="' + f.href + '"' + (fh ? ' aria-current="page"' : '') + '><span class="gn-ic" style="background:' + f.bg + '">' + f.icon + '</span>' +
      '<span><b>' + f.title + (fh ? ' <span class="gn-tag">You are here</span>' : '') + '</b><small>' + f.desc + '</small></span></a></div>' +
      '<div class="gn-group"><div class="gn-h">Services</div>' +
      SVC_FAMILIES.map(function (x) {
        var href = HOME + '/services-' + x[2] + '.html', h = onPage(href);
        return '<a class="gn-tool' + (h ? ' gn-here' : '') + '" href="' + href + '"' + (h ? ' aria-current="page"' : '') + '><span class="gn-ic"><img class="gn-mark" src="' + HOME + '/shared/cards/fam-' + x[2] + '.webp" alt="" width="42" height="42"></span>' +
          '<span><b>' + x[0] + (h ? ' <span class="gn-tag">You are here</span>' : '') + '</b><small>' + x[1] + '</small></span></a>';
      }).join('') +
      '</div>';
  }

  var DROPS = [];
  function dropdown(menu, link, o) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = link.className + ' gn-tools-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', o.id);
    btn.innerHTML = o.label + ' <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    link.parentNode.replaceChild(btn, link);
    // keep the site's own menu link styling
    var ls = getComputedStyle(menu.querySelector('a:not(.gg-way-link)') || btn);
    ['fontFamily', 'fontWeight', 'fontSize', 'letterSpacing', 'textTransform', 'padding'].forEach(function (k) { btn.style[k] = ls[k]; });
    if (link.getAttribute('aria-current')) btn.setAttribute('aria-current', link.getAttribute('aria-current'));
    // Color: match a plain menu link (or a current one when this button marks the current section), and repaint when the theme changes.
    var isCur = /(^|\s)current(\s|$)/.test(link.className) || !!link.getAttribute('aria-current');
    function paint() {
      btn.style.color = '';
      var as = Array.prototype.slice.call(menu.querySelectorAll('a')).filter(function (a) { return !/(^|\s)gg-way-link(\s|$)/.test(a.className); }); // BLD 873: the gold Grounded Way pill is never the color to match
      var ref = isCur ? as.filter(function (a) { return /(^|\s)current(\s|$)/.test(a.className) || a.getAttribute('aria-current'); })[0] : as.filter(function (a) { return !/(^|\s)current(\s|$)/.test(a.className) && !a.getAttribute('aria-current'); })[0];
      if (!ref && isCur){ var probe = document.createElement('a'); probe.className = 'current'; probe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none'; probe.textContent = '.'; menu.appendChild(probe); btn.style.color = getComputedStyle(probe).color; probe.remove(); return; }
      if (ref) btn.style.color = getComputedStyle(ref).color;
    }
    paint();
    new MutationObserver(function () { setTimeout(paint, 0); }).observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] });
    if (document.body) new MutationObserver(function () { setTimeout(paint, 0); }).observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    try { window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { setTimeout(paint, 0); }); } catch (e) {}

    var panel = document.createElement('div');
    panel.className = 'gn-panel' + (o.cls ? ' ' + o.cls : '');
    panel.id = o.id;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', o.aria);
    function render() {
      panel.innerHTML = '<button type="button" class="gn-back">&#8592; Menu</button><div class="gn-grid">' + o.body() +
        '</div><div class="gn-foot"><a class="gn-all" href="' + o.all[1] + '">' + o.all[0] + '</a></div>';
      panel.querySelector('.gn-back').onclick = function () { closePanel(); btn.focus(); };
    }
    render();
    window.addEventListener('hashchange', render);

    var menuBtn = document.querySelector('.menu-btn');
    function isMobile() { return !!menuBtn && getComputedStyle(menuBtn).display !== 'none'; }
    function place() {
      var r = btn.getBoundingClientRect();
      var w = Math.min(o.width || 760, window.innerWidth - 24);
      var left = Math.max(12, Math.min(r.right - w, window.innerWidth - w - 12));
      if (o.width) panel.style.width = w + 'px';
      panel.style.top = (r.bottom + 10) + 'px';
      panel.style.left = left + 'px';
    }
    // Phones: the open menu fits the screen under the top bar and scrolls inside itself,
    // so every item can be reached (the bar is pinned, so the page can't scroll it into view).
    function fit() {
      if (isMobile() && (menu.classList.contains('open') || menu.classList.contains('gn-menu-sub'))) {
        var top = Math.max(0, menu.getBoundingClientRect().top);
        var vh = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
        menu.style.maxHeight = Math.max(160, vh - top) + 'px';
        menu.style.overflowY = 'auto'; menu.style.overscrollBehavior = 'contain'; menu.style.webkitOverflowScrolling = 'touch';
      } else { menu.style.maxHeight = ''; menu.style.overflowY = ''; menu.style.overscrollBehavior = ''; }
    }
    function openPanel() {
      DROPS.forEach(function (d) { if (d.panel !== panel && d.isOpen()) d.close(); });
      if (isMobile()) {
        panel.style.width = '';
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
      try { document.dispatchEvent(new CustomEvent('gg:menu-open', { detail: { from: o.id } })); } catch (e) {}
    }
    function closePanel() {
      panel.classList.remove('gn-show');
      menu.classList.remove('gn-menu-sub');
      btn.setAttribute('aria-expanded', 'false');
      fit();
    }
    DROPS.push({ panel: panel, close: closePanel, isOpen: function () { return panel.classList.contains('gn-show'); } });
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (panel.classList.contains('gn-show')) closePanel(); else {
        openPanel();
        // opened from the keyboard (Enter or Space): move focus into the panel so Tab walks its links
        if (e.detail === 0) { var f = panel.querySelector('a.gn-tool, a'); if (f) setTimeout(function () { f.focus(); }, 0); }
      }
    });
    // another menu opened (the profile menu, the other panel): close this one
    document.addEventListener('gg:menu-open', function (e) { if (e.detail && e.detail.from !== o.id && panel.classList.contains('gn-show') && !isMobile()) closePanel(); });
    // keyboard focus leaving the panel and its button closes it (desktop)
    panel.addEventListener('focusout', function (e) {
      if (isMobile() || !panel.classList.contains('gn-show')) return;
      var t = e.relatedTarget; if (t && !panel.contains(t) && t !== btn) closePanel();
    });
    window.addEventListener('scroll', function () { if (panel.classList.contains('gn-show') && !isMobile()) place(); }, { passive: true });
    document.addEventListener('click', function (e) {
      if (!panel.classList.contains('gn-show')) return;
      if (panel.contains(e.target) && !e.target.closest('a')) return;
      if (e.target === btn) return;
      // a link chosen in the panel (even one on this same page) also closes the phone menu
      if (panel.contains(e.target) && menu.classList.contains('open')) { menu.classList.remove('open'); if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false'); }
      closePanel();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('gn-show')) { closePanel(); btn.focus(); } });
    window.addEventListener('resize', function () { if (panel.classList.contains('gn-show') && !isMobile()) { closePanel(); } fit(); });
    if (window.visualViewport) window.visualViewport.addEventListener('resize', fit);
    if (menuBtn) menuBtn.addEventListener('click', function () { closePanel(); setTimeout(fit, 0); });
    if (window.MutationObserver) new MutationObserver(fit).observe(menu, { attributes: true, attributeFilter: ['class'] });
  }

  function build() {
    var menu = document.getElementById('site-menu');
    if (!menu) return;
    var links = Array.prototype.slice.call(menu.querySelectorAll('a'));
    var link = links.filter(function (a) { return /#tools$/.test(a.getAttribute('href') || '') || /^\s*tools\s*$/i.test(a.textContent); })[0];
    var svc = links.filter(function (a) { return /^\s*services\s*$/i.test(a.textContent); })[0];
    if (!link && !svc) return;
    var st = document.createElement('style'); st.textContent = css + themed(GN_DARK); document.head.appendChild(st);
    if (svc) dropdown(menu, svc, { id: 'gn-svc-panel', label: 'Services', aria: 'Grounded services', body: svcBody, all: ['See all services', HOME + '/services.html'], width: 640, cls: 'gn-svc' });
    if (link) dropdown(menu, link, { id: 'gn-panel', label: 'Tools', aria: 'Grounded tools', body: toolsBody, all: ['See all tools', HOME + '/tools.html'] });
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
      var s = document.createElement('script'); s.src = base + '/search.js?v=b901';
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

/* ===== Get Grounded Now (GWG BLD 809, quieter in BLD 812): a small header button beside the light and dark toggle ===== */
/* It opens /get-grounded-now.html, short calming practices for a hard moment. In Maple and Aspen it opens the kids'
   versions (#kids). A quiet outlined button with a leaf: "Get Grounded" beside the leaf on wider screens, the leaf
   alone (the same round size as the light and dark toggle) on phones, so it always fits the header. */
(function () {
  if (document.querySelector('.gg-now')) return;
  function mount() {
    if (document.querySelector('.gg-now')) return;
    var here = /\/get-grounded-now(\.html)?$/.test(location.pathname);
    var kids = /^\/(maple|aspen)\//.test(location.pathname);
    var a = document.createElement('a');
    a.className = 'gg-now'; a.href = '/get-grounded-now.html' + (kids ? '#kids' : '');
    if (here) a.setAttribute('aria-current', 'page');
    a.title = 'Get Grounded Now: short calming practices for right now';
    a.setAttribute('aria-label', 'Get Grounded Now: short calming practices for right now');
    a.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19c3-4 6-7 10-9"/></svg><span class="gg-now-l" aria-hidden="true">Get Grounded</span>';
    // In the menu it reads in full.
    var full = function () { var l = a.querySelector('.gg-now-l'); if (l) l.textContent = a.classList.contains('gg-now-mi') ? 'Get Grounded Now' : 'Get Grounded'; };
    var st = document.createElement('style');
    st.textContent = '.gg-now{flex:none;display:inline-flex;align-items:center;justify-content:center;gap:7px;height:42px;min-width:42px;padding:0 14px;margin:0 2px;border-radius:999px;border:1px solid rgba(95,125,72,.6);background:transparent;color:#5F7D48 !important;text-decoration:none !important;font-family:"Barlow Condensed",sans-serif;font-weight:700;font-size:14px;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;transition:background .2s ease;}'
      + '.gg-now:hover{background:rgba(95,125,72,.12);}.gg-now:focus-visible{outline:3px solid #D9A847;outline-offset:2px;}.gg-now svg{display:block;flex:none;}'
      + '[data-theme="dark"] .gg-now{color:#9DB883 !important;border-color:rgba(157,184,131,.55);}'
      + '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .gg-now{color:#9DB883 !important;border-color:rgba(157,184,131,.55);}}'
      + '@media (max-width:900px){.gg-now{padding:0;width:42px;}.gg-now-l{display:none;}}'
      + '@media (max-width:440px){.gg-now{width:36px;height:36px;min-width:36px;}.topbar-inner{gap:8px !important;}}'
      + '@media (min-width:961px) and (max-width:1240px){.site-menu a{padding:10px 7px;letter-spacing:.5px;font-size:14px;}.ggs-btn{padding:8px 10px;}.ggs-btn span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}}'
      + '.gg-now.gg-now-ic{padding:0;width:42px;}.gg-now.gg-now-ic .gg-now-l{display:none;}'
      + '.site-menu .gg-now.gg-now-mi{width:auto;height:auto;min-width:0;padding:inherit;margin:0;border:0;border-radius:0;justify-content:flex-start;font:inherit;letter-spacing:inherit;text-transform:inherit;}'
      + '.site-menu .gg-now.gg-now-mi .gg-now-l{display:inline !important;}';
    document.head.appendChild(st);
    var theme = document.querySelector('.gg-theme'), size = document.querySelector('.size-btn'), menuBtn = document.querySelector('.menu-btn');
    var anchor = theme || size || menuBtn, menu = document.getElementById('site-menu');
    // Steps down to what fits: the leaf and "Get Grounded", then the leaf alone, then (the tree apps on phones, where
    // the header is full) the first link in the menu. The page never scrolls sideways.
    // BLD 889: the header's own edges count too, since a guided player open (html and body overflow hidden) hides the scroll width
    function wide() {
      var r = document.documentElement.clientWidth + 1, inner = document.querySelector('.topbar-inner'), kids = inner ? inner.querySelectorAll('.topbar-inner > *, .site-menu > *') : [];
      for (var i = 0; i < kids.length; i++) { var b = kids[i].getBoundingClientRect(); if (b.width && b.right > r) return true; }
      return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
    }
    function place() {
      if (a.parentNode) a.parentNode.removeChild(a);
      a.classList.remove('gg-now-ic', 'gg-now-mi');
      if (!anchor || !anchor.parentNode) { if (menu) { a.classList.add('gg-now-mi'); menu.insertBefore(a, menu.firstChild); } return; }
      if (a.parentNode !== anchor.parentNode || a.nextSibling !== anchor) anchor.parentNode.insertBefore(a, anchor);
      if (!wide()) return;
      a.classList.add('gg-now-ic'); if (!wide()) return;
      // Into the menu only where the menu is folded behind its button (phones); on wider screens the leaf stays.
      if (menu && menuBtn && menuBtn.offsetParent) { a.classList.remove('gg-now-ic'); a.classList.add('gg-now-mi'); menu.insertBefore(a, menu.firstChild); }
    }
    place(); full();
    // Again once the fonts and the rest of the header have settled.
    var again = function () { place(); full(); };
    window.addEventListener('load', again); if (document.fonts && document.fonts.ready) document.fonts.ready.then(again);
    var t = 0; window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(function () { place(); full(); }, 150); });
  }
  // After the light and dark toggle mounts (same file, earlier), so it can sit just before it.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(mount, 0); }); else setTimeout(mount, 0);
})();

/* BLD 867: inside The Grounded Way's frame (a tree or tool opened from /home/), the site's own top bar, menu, and footer step
   aside so The Grounded Way's bar leads; links back to /home/ close the frame. */
(function () {
  var inHome = false;
  try { inHome = window.self !== window.top && /^\/home\//.test(window.top.location.pathname); } catch (e) {}
  if (!inHome) return;
  document.documentElement.classList.add('gg-inhome');
  var st = document.createElement('style');
  st.textContent = 'html.gg-inhome .topbar,html.gg-inhome .site-menu,html.gg-inhome .site-footer{display:none!important;}';
  (document.head || document.documentElement).appendChild(st);
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]'); if (!a) return;
    var u; try { u = new URL(a.getAttribute('href'), location.href); } catch (x) { return; }
    if (u.origin === location.origin && /^\/home\//.test(u.pathname)) { e.preventDefault(); window.top.postMessage('gg-home-close', location.origin); }
  }, true);
})();

/* BLD 869: on a tree or tool page, when a profile is open on this device, a slim line leads into The Grounded Way app,
   where the tree lives as a tab beside Today and Tending. Hidden inside the app's own frame. */
(function () {
  try { if (window.self !== window.top) return; } catch (e) { return; }
  var p = location.pathname;
  var tree = (/^\/(maple|aspen|pine|birch|oak|sequoia|willow|grove|heartwood)\//.exec(p) || [])[1];
  if (!tree && !/^\/(living-sober|get-grounded-now|readings)\.html/.test(p)) return;
  var css = '.gg-wayline{display:flex;justify-content:center;align-items:center;gap:10px;flex-wrap:wrap;padding:8px max(16px,env(safe-area-inset-left,0px));font:500 14px/1.3 Barlow,system-ui,sans-serif;background:#F4EAD6;color:#3A2A1C;border-bottom:1px solid #E6D9C2;}' +
    '.gg-wayline a{color:#8B5E1A;font-weight:700;text-decoration:none;border-bottom:1px solid currentColor;}' +
    '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .gg-wayline{background:#2E2118;color:#EFE5D3;border-color:#4A3626;}:root:not([data-theme="light"]) .gg-wayline a{color:#D9A847;}}' +
    ':root[data-theme="dark"] .gg-wayline{background:#2E2118;color:#EFE5D3;border-color:#4A3626;}:root[data-theme="dark"] .gg-wayline a{color:#D9A847;}';
  function show() {
    if (document.querySelector('.gg-wayline') || !(window.GGP && GGP.active && GGP.active())) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var bar = document.createElement('div'); bar.className = 'gg-wayline';
    bar.innerHTML = '<span>Your profile is open.</span><a href="/home/' + (tree ? '#tree' : '') + '">Open The Grounded Way</a>';
    var top = document.querySelector('.topbar');
    if (top && top.parentNode) top.parentNode.insertBefore(bar, top.nextSibling); else document.body.insertBefore(bar, document.body.firstChild);
  }
  function wait(n) { if (window.GGP && GGP.ready) { GGP.ready.then(show); if (GGP.on) GGP.on(function (t) { if (t === 'change') { if (GGP.active && GGP.active()) show(); else { var b = document.querySelector('.gg-wayline'); if (b) b.remove(); } } }); } else if (n < 40) setTimeout(function () { wait(n + 1); }, 250); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { wait(0); }); else wait(0);
})();

/* BLD 870: The Grounded Way in the main menu bar on every page, right after Home, as a gold pill (a plain row in the phone menu). */
(function () {
  function add() {
    var menu = document.getElementById('site-menu') || document.querySelector('.site-menu');
    if (!menu || menu.querySelector('.gg-way-link')) return;
    var p = location.pathname, here = /^\/home\//.test(p) || /^\/the-grounded-way/.test(p);
    var a = document.createElement('a'); a.href = '/home/'; a.className = 'gg-way-link' + (here ? ' current' : ''); a.textContent = 'The Grounded Way';
    if (here) a.setAttribute('aria-current', 'page');
    var first = menu.querySelector('a'); if (first && /index\.html$|\/$/.test(first.getAttribute('href') || '') && /home/i.test(first.textContent)) { first.classList.add('gg-home-link'); first.after(a); } else menu.insertBefore(a, menu.firstChild);
    if (here) menu.querySelectorAll('a.current').forEach(function (x) { if (x !== a) { x.classList.remove('current'); x.removeAttribute('aria-current'); } });
    // BLD 879: Grounded Recipes lives in the Healthy Living menu group, The Grounded Way, and the front page (Chris: off the top bar).
    var st = document.createElement('style');
    st.textContent = '@media (min-width:981px){.site-menu a.gg-home-link{display:none;}}@media (min-width:981px) and (max-width:1380px){.site-menu a,.site-menu .gn-tools-btn{padding-left:8px!important;padding-right:8px!important;letter-spacing:.6px!important;}}' + '@media (min-width:981px) and (max-width:1120px){.site-menu a,.site-menu .gn-tools-btn{padding-left:5px!important;padding-right:5px!important;font-size:13.5px!important;letter-spacing:.2px!important;}.site-menu a.gg-way-link{padding:7px 10px!important;margin:0 2px;}}' + '@media (min-width:981px){.site-menu a.gg-way-link{background:#8B5E1A;color:#FFF8EA;border-radius:999px;padding:8px 14px!important;margin:0 4px;}.site-menu a.gg-way-link:hover,.site-menu a.gg-way-link.current{background:#6E4A14;color:#FFF8EA;}}' +
      '@media (max-width:980px){.site-menu a.gg-way-link{color:#8B5E1A;}}' +
      '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .site-menu a.gg-way-link{background:#D9A847;color:#2E2118;}}:root[data-theme="dark"] .site-menu a.gg-way-link{background:#D9A847;color:#2E2118;}' +
      '@media (max-width:980px){:root .site-menu a.gg-way-link{background:transparent!important;color:#C9952F!important;}}' +
      // BLD 877: a little less space between the header's parts from 981 px up, so every header fits on one line.
      '@media (min-width:981px) and (max-width:1180px){.topbar-inner{gap:8px!important;}.topbar-inner .brand-name{font-size:.92em;}.topbar-inner > .gg-now{padding:0;width:42px;}.topbar-inner > .gg-now .gg-now-l{display:none;}}' +
      '@media (min-width:1181px) and (max-width:1560px){.topbar-inner{gap:8px!important;}.site-menu a,.site-menu .gn-tools-btn{padding-left:7px!important;padding-right:7px!important;letter-spacing:.6px!important;}.site-menu a.gg-way-link{padding:8px 13px!important;}}' +
      '@media (min-width:1181px) and (max-width:1340px){.site-menu a,.site-menu .gn-tools-btn{padding-left:5px!important;padding-right:5px!important;}}' +
      '@media (min-width:1181px) and (max-width:1300px){.ggs-btn{padding:8px 10px;}.ggs-btn span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}}' +
      '@media (min-width:981px) and (max-width:1060px){.topbar-inner{gap:5px!important;}.site-menu a,.site-menu .gn-tools-btn{padding-left:5px!important;padding-right:5px!important;letter-spacing:.2px!important;}.site-menu a.gg-way-link{padding:7px 10px!important;margin:0 2px;}}';
    document.head.appendChild(st);
    fitSoon();
  }
  // BLD 877: where a header carries more (a tree page's name and text size button), it steps down until the bar fits on one
  // line with no sideways scroll: first the search word and tighter links, then the tightest spacing.
  var FIT = '@media (min-width:981px){html.gg-fit1 .topbar-inner{gap:6px!important;}html.gg-fit1 .ggs-btn{padding:8px 10px;}html.gg-fit1 .ggs-btn span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}' +
    'html.gg-fit1 .site-menu a,html.gg-fit1 .site-menu .gn-tools-btn{padding-left:5px!important;padding-right:5px!important;letter-spacing:.4px!important;}' +
    'html.gg-fit2 .topbar-inner{gap:4px!important;}html.gg-fit2 .site-menu a,html.gg-fit2 .site-menu .gn-tools-btn{padding-left:3px!important;padding-right:3px!important;letter-spacing:0!important;}html.gg-fit2 .site-menu a.gg-way-link{padding:7px 9px!important;margin:0 1px;}}';
  function over() {
    var inner = document.querySelector('.topbar-inner'); if (!inner) return false;
    var r = document.documentElement.clientWidth + 1, kids = inner.querySelectorAll('.site-menu > *, .topbar-inner > *');
    for (var i = 0; i < kids.length; i++) { var b = kids[i].getBoundingClientRect(); if (b.width && b.right > r) return true; }
    return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
  }
  function fit() {
    var h = document.documentElement, btn = document.querySelector('.menu-btn');
    h.classList.remove('gg-fit1', 'gg-fit2');
    if (window.innerWidth < 981 || (btn && btn.offsetParent)) return;
    if (!document.getElementById('gg-fit-css')) { var c = document.createElement('style'); c.id = 'gg-fit-css'; c.textContent = FIT; document.head.appendChild(c); }
    if (!over()) return;
    var now = document.querySelector('.topbar-inner > .gg-now:not(.gg-now-ic)'); if (now) { now.classList.add('gg-now-ic'); if (!over()) return; }
    h.classList.add('gg-fit1'); if (over()) h.classList.add('gg-fit2');
  }
  var ft = 0; function fitSoon() { clearTimeout(ft); ft = setTimeout(fit, 60); }
  window.addEventListener('load', fitSoon); window.addEventListener('resize', fitSoon);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitSoon);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', add); else add();
})();
