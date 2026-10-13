// GROUNDED FIELD GUIDE (TM): working with no signal, installing on a Mac, and a steady Back button (GWG BLD 797), window.GFGNav.
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
//  1. Registers sw.js (scope /field-guide/), which keeps the Field Guide, its scripts, fonts, icons, and the sealed
//     libraries on this device. The registration address carries a short tag made from every ?v= on this page, so a
//     build that bumps any ?v= installs a fresh copy and clears the old one.
//  2. Back inside a session steps to the previous step and stays in the session; outside a session it returns to the
//     previous screen. Leaving the page during a session asks first (beforeunload).
//  3. A small Offline badge while there is no connection, and the Install on This Mac card in Settings.
(function () {
  'use strict';
  var CTX = null;          // {v, go, open, toast} from the Field Guide
  var STACK = [];          // earlier screens, newest last
  var QUIET = false;       // true while Back itself changes the screen
  var ARMED = false;       // true while our guard entry sits on top of the page's own entry
  var PROMPT = null;       // Chrome and Edge install prompt, when offered

  // A session is open while one of these shows: the session runner, or a step bar in a full session tool
  // (Farewell, Wedding, Session Plans, the Intake Session, The Grove visit).
  var SESS = ['#runner:not(.hide)', '[data-fwa="nav"]', '[data-wda="nav"]', '[data-rka="nav"]', '[data-cla="nav"]', '[data-gva="nav"]'];
  var PREV = ['#runner:not(.hide) [data-act$="-prev"]', '[data-fwa="nav"][data-fwv="-1"]', '[data-wda="nav"][data-wdv="-1"]', '[data-rka="nav"][data-rkv="-1"]', '[data-cla="nav"][data-clv="-1"]', '[data-gva="nav"][data-gvv="-1"]'];

  function shown(el) { return !!(el && el.getClientRects && el.getClientRects().length); }
  function first(sel) { var L = document.querySelectorAll(sel.join(',')); for (var i = 0; i < L.length; i++) if (shown(L[i]) && (L[i].id !== 'runner' || L[i].children.length)) return L[i]; return null; }
  function isOpen() { try { return !!(CTX && CTX.open()); } catch (e) { return false; } }
  function inSession() { return isOpen() && !!first(SESS); }

  // ---------- Back ----------
  function arm() {
    if (ARMED || !isOpen()) return;
    try {
      var st = history.state && typeof history.state === 'object' ? history.state : {};
      if (st.gfgGuard) { ARMED = true; return; }
      var base = {}; for (var k in st) base[k] = st[k]; base.gfgBase = 1;
      history.replaceState(base, '', location.href);
      history.pushState({ gfgGuard: 1 }, '', location.href);
      ARMED = true;
    } catch (e) {}
  }
  // The guard goes on with a tap or a key, so the browser counts it as the person's own step.
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) { document.addEventListener(ev, arm, { capture: true, passive: true }); });

  function note(t) { if (CTX && CTX.toast) CTX.toast(t); }
  function stepBack() {
    var b = first(PREV);
    if (b && !b.disabled) { b.click(); return; }
    note('Your session stays open here. Close it with its own button when you are ready.');
  }
  function screenBack() {
    var cur = CTX.v() || {};
    while (STACK.length) {
      var p = STACK.pop();
      if (p && (p.tab !== cur.tab || JSON.stringify(p) !== JSON.stringify(cur))) { show(p); return true; }
    }
    if (cur.tab && cur.tab !== 'home') { show({ tab: 'home' }); return true; }
    return false;
  }
  function show(p) {
    var x = {}; for (var k in p) if (k !== 'tab') x[k] = p[k];
    QUIET = true; try { CTX.go(p.tab, x); } catch (e) {} QUIET = false;
  }
  window.addEventListener('popstate', function (e) {
    var st = e.state;
    if (!(st && st.gfgBase)) return;                       // only a step off our guard entry
    if (window.GG_HIST_SKIP || (window.GGHistOwn && window.GGHistOwn(e))) return; // Learn and page videos keep their own
    if (document.querySelector('.ggl-app')) return;
    ARMED = false;
    if (!isOpen()) { STACK.length = 0; try { history.back(); } catch (x) {} return; }
    if (inSession()) { stepBack(); return; }               // the guard goes back on with the next tap
    if (screenBack()) return;
    try { history.back(); } catch (x) {}                   // Home with nothing behind it: the browser goes where it came from
  });
  window.addEventListener('beforeunload', function (e) {
    if (!inSession()) return;
    e.preventDefault(); e.returnValue = ''; return '';
  });

  // ---------- the Offline badge ----------
  function badge() {
    var el = document.getElementById('gfg-off');
    if (!el) {
      if (!document.body) return;
      var css = document.createElement('style');
      css.textContent = '.gfg-off{position:fixed;left:50%;top:calc(8px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:130;display:flex;align-items:center;gap:8px;max-width:calc(100vw - 32px);box-sizing:border-box;background:var(--umber,#2E2118);color:#FFF8EC;border:1px solid var(--gold-soft,#C89B45);padding:5px 12px;border-radius:30px;font:600 13px/1.3 Barlow,system-ui,sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.25);pointer-events:none;}'
        + '.gfg-off[hidden]{display:none;}.gfg-off b{font-family:"Barlow Condensed",Barlow,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:var(--gold-soft,#C89B45);font-size:12px;}'
        + '.gfg-off span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}@media print{.gfg-off{display:none!important;}}'
        + '.gfg-steps{margin:8px 0 0;padding-left:22px;}.gfg-steps li{margin:6px 0;}';
      document.head.appendChild(css);
      el = document.createElement('div'); el.id = 'gfg-off'; el.className = 'gfg-off'; el.setAttribute('role', 'status'); el.hidden = true;
      el.innerHTML = '<b>Offline</b><span>Your work is saving on this Mac.</span>';
      document.body.appendChild(el);
    }
    el.hidden = navigator.onLine !== false;
  }
  window.addEventListener('online', badge); window.addEventListener('offline', badge);

  // ---------- installing ----------
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); PROMPT = e; });
  window.addEventListener('appinstalled', function () { PROMPT = null; });
  function standalone() { try { return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; } catch (e) { return false; } }
  function installCard() {
    var ready = !!(navigator.serviceWorker && navigator.serviceWorker.controller);
    return '<div class="card" id="gfg-install"><h3>Install on This Mac</h3>'
      + '<p class="muted">Installed, the Field Guide opens in its own window, like an app, with the browser\'s Back button out of the way. Open it here once at home with a good connection, and it keeps working with no signal.</p>'
      + (standalone() ? '<p style="margin-top:8px"><b>The Field Guide is installed and open in its own window.</b></p>' : '')
      + (ready ? '<p style="margin-top:8px">Ready to open with no signal on this device.</p>' : '')
      + (PROMPT && !standalone() ? '<div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold" data-gfgnav="install">Install the Field Guide</button></div>' : '')
      + '<ol class="gfg-steps"><li><b>Safari:</b> open the File menu, then choose Add to Dock.</li>'
      + '<li><b>Chrome:</b> click the Install icon at the right end of the address bar, or open the menu (three dots), then Cast, Save, and Share, then Install Page as App.</li>'
      + '<li><b>Edge:</b> open the menu (three dots), then Apps, then Install This Site as an App.</li></ol>'
      + '<p class="muted" style="margin-top:8px;font-size:15px">The Field Guide then opens from the Dock or Launchpad, and your records stay on this Mac, sealed with your passcode.</p></div>';
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-gfgnav="install"]'); if (!t || !PROMPT) return;
    var p = PROMPT; PROMPT = null; try { p.prompt(); } catch (x) {}
  });

  // ---------- the offline copy ----------
  function tag() {
    var L = [], h = 5381;
    document.querySelectorAll('script[src],link[href]').forEach(function (el) {
      var u = el.getAttribute('src') || el.getAttribute('href') || '', m = /[?&]v=([^&#]+)/.exec(u);
      if (m) L.push(u.split('?')[0].split('/').pop() + '=' + m[1]);
    });
    var s = L.sort().join('|');
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return h.toString(36);
  }
  function register() {
    if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol) || window.Capacitor) return;
    try { navigator.serviceWorker.register('sw.js?b=' + tag(), { scope: './' }).catch(function () {}); } catch (e) {}
  }

  window.GFGNav = {
    init: function (ctx) { CTX = ctx; },
    // go() calls this before it changes the screen.
    from: function (v, tab, extra) {
      if (QUIET || !v || !v.tab) return;
      var nx = {}; nx.tab = tab; if (extra) for (var k in extra) nx[k] = extra[k];
      try { if (JSON.stringify(nx) === JSON.stringify(v)) return; } catch (e) {}
      var c = {}; for (var j in v) c[j] = v[j];
      STACK.push(c); if (STACK.length > 40) STACK.shift();
    },
    clear: function () { STACK.length = 0; },
    installCard: installCard,
    inSession: inSession, tag: tag, stack: STACK
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', badge); else badge();
  if (document.readyState === 'complete') register(); else window.addEventListener('load', register);
})();
