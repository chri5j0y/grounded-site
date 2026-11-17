/* =====================================================================
   START MEMBERSHIP BUTTONS (shared/gg-join.js), GWG BLD 1017.
   (c) 2026 Grow With Grounded LLC.
   Every Start Membership button on a page opens one flow, right where it is: Create My Account (or I Have an Account),
   then the choice, Begin My 14 Days or Join Now at a Founding price (GGAccountUI.open('membership'),
   shared/gg-account-ui.js). The account files come from shared/gg-profiles.js (nav.js loads it on every page).
     <a data-gg-join href="/home/#membership">Start Membership</a>
                                        its href is the fallback: The Grounded Way opens the same choice there
     <span data-gg-trial hidden>...</span>
                                        trial words, shown only once the Membership Trial is live (GGAccount.trialLive)
     <span data-gg-notrial>...</span>   words shown until then
   No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGJoin) return;
  var UI = '/shared/gg-account-ui.js?v=c143';
  var uiP = null;
  function load(src) {
    return new Promise(function (ok) {
      var s = document.createElement('script'); s.src = src; s.async = true;
      s.onload = function () { ok(true); }; s.onerror = function () { ok(false); };
      document.head.appendChild(s);
    });
  }
  // The signed in account files, or null when Accounts are off on this page (the button then follows its href)
  // nav.js (deferred) brings gg-profiles.js: wait for it a few seconds
  function profiles() {
    return new Promise(function (ok) {
      var n = 0;
      (function look() { if (window.GGP && GGP.account) return ok(true); if (++n > 50) return ok(false); setTimeout(look, 100); })();
    });
  }
  function account() {
    return profiles().then(acct);
  }
  function acct() {
    var G = window.GGP && GGP.account;
    if (!G || !G.live) return Promise.resolve(null);
    return Promise.resolve(G.ready).then(function (ok) { return ok && window.GGAccount ? window.GGAccount : null; }, function () { return null; });
  }
  function ui() { return uiP || (uiP = window.GGAccountUI ? Promise.resolve(true) : load(UI)).then(function (ok) { return ok && window.GGAccountUI ? window.GGAccountUI : null; }); }
  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }
  function paint() {
    account().then(function (A) {
      var on = !!(A && A.trialLive && A.trialLive());
      each('[data-gg-trial]', function (el) { el.hidden = !on; });
      each('[data-gg-notrial]', function (el) { el.hidden = on; });
    });
  }
  function start(a) {
    var href = a && a.getAttribute('href') || '/home/#membership', gone = false;
    // Accounts take a moment on a first visit; if they are still away after 8 seconds, The Grounded Way opens the choice.
    var t = setTimeout(function () { gone = true; location.href = href; }, 8000);
    return account().then(function (A) {
      if (!A) { clearTimeout(t); if (!gone) location.href = href; return; }
      return ui().then(function (U) {
        clearTimeout(t);
        if (gone) return;
        if (!U) { location.href = href; return; }
        return U.open('membership');
      });
    }).catch(function () { clearTimeout(t); if (!gone) location.href = href; });
  }
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('[data-gg-join]');
    if (!a || e.defaultPrevented || e.button > 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (window.GGP && GGP.account && !GGP.account.live) return;   // Accounts off: the link opens The Grounded Way
    e.preventDefault();
    start(a);
  });
  window.GGJoin = { start: start, paint: paint };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', paint); else paint();
})();
