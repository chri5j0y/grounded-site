/* Grounded Books (GWG BLD 1031): the one place for how to get In the End.
   Paste each link between the quotes when it is ready. While a value is empty, its button stays hidden:
   BOOK_PREORDER_URL  the Stripe Payment Link for a signed hardcover from Chris
   BOOK_MEMBER_CODE   the Stripe promotion code for the Member price on signed copies (BLD 1033), letters, numbers, or _
                      only. It shows only inside an open Membership (shared/gg-member.js, the Membership card on /home/),
                      never on the Books page. Anyone who reads this file can see it, like any checkout code.
   BOOKSHOP_URL, AMAZON_URL, BN_URL  the store listings, once they are live
   COOKBOOK_ON, COOKBOOK_BUY_URL      BLD 1050: the cookbook download page (cookbook.html) and its $19.99 Stripe link
   COOKBOOK_SIGNED_URL                BLD 1059: the Stripe Payment Link for a signed Grounded Cookbook hardcover ($44.99 plus $7 shipping)
   COOKBOOK_AMAZON_URL, COOKBOOK_BOOKSHOP_URL, COOKBOOK_BN_URL  BLD 1059: The Grounded Cookbook store listings, once they are live
   Every page with [data-gg-book] or [data-gg-cook] parts reads this file (books.html), and /home/ reads BOOK_MEMBER_CODE. Bump ?v= wherever it loads after a change. */
window.GG_BOOKS = {
  // BLD 1050: The Complete Grounded Cookbook download at /cookbook. COOKBOOK_ON true opens it (with the Worker's COOKBOOK_ON "1",
  // grounded-workshop patches/bld1050/DEPLOY1050.md); COOKBOOK_BUY_URL is the Stripe Payment Link for the $19.99 ebook.
  COOKBOOK_ON: true,
  COOKBOOK_BUY_URL: 'https://buy.stripe.com/fZucN427y8Uc1SU7z07kc04',
  COOKBOOK_PRICE: '$19.99',
  // BLD 1059: The Grounded Cookbook on the Books page. Each button and card stays hidden while its link is empty.
  COOKBOOK_SIGNED_URL: '',
  COOKBOOK_SIGNED_PRICE: '$44.99',
  COOKBOOK_AMAZON_URL: '',
  COOKBOOK_BOOKSHOP_URL: '',
  COOKBOOK_BN_URL: '',
  BOOK_PREORDER_URL: '',
  BOOK_PRICE: '$39.99',
  BOOK_MEMBER_CODE: '',
  BOOKSHOP_URL: '',
  AMAZON_URL: '',
  BN_URL: ''
};

(function () {
  var C = window.GG_BOOKS || {};
  function ok(u) { return typeof u === 'string' && /^https:\/\/[^\s"'<>]+$/.test(u.trim()); }
  function show(el, on) { if (!el) return; if (on) el.removeAttribute('hidden'); else el.setAttribute('hidden', ''); }
  function run() {
    var pre = ok(C.BOOK_PREORDER_URL);
    Array.prototype.forEach.call(document.querySelectorAll('[data-gg-book="preorder"]'), function (a) {
      if (pre) { a.href = C.BOOK_PREORDER_URL.trim(); a.target = '_blank'; a.rel = 'noopener'; }
      show(a, pre);
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-gg-book="preorder-card"]'), function (el) { show(el, pre); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-gg-book="arrives"]'), function (el) { show(el, !pre); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-gg-book="price"]'), function (el) { if (C.BOOK_PRICE) el.textContent = C.BOOK_PRICE; });
    var any = false;
    [['bookshop', 'BOOKSHOP_URL'], ['amazon', 'AMAZON_URL'], ['bn', 'BN_URL']].forEach(function (s) {
      var on = ok(C[s[1]]); if (on) any = true;
      Array.prototype.forEach.call(document.querySelectorAll('[data-gg-store="' + s[0] + '"]'), function (a) {
        if (on) { a.href = C[s[1]].trim(); a.target = '_blank'; a.rel = 'noopener'; }
        show(a, on);
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-gg-book="stores-soon"]'), function (el) { show(el, !any); });
    document.documentElement.setAttribute('data-gg-books', (pre ? 'pre' : 'wait') + (any ? ' stores' : ''));
    // BLD 1059: The Grounded Cookbook ([data-gg-cook] parts on books.html). The ebook button opens the Stripe link the same way
    // cookbook.html does (COOKBOOK_ON true and a link); until then a quiet line shows instead.
    function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }
    var buy = C.COOKBOOK_ON === true && ok(C.COOKBOOK_BUY_URL);
    each('[data-gg-cook="buy"]', function (a) { if (buy) a.href = C.COOKBOOK_BUY_URL.trim(); show(a, buy); });
    each('[data-gg-cook="buy-soon"]', function (el) { show(el, !buy); });
    each('[data-gg-cook="ebook-price"]', function (el) { if (C.COOKBOOK_PRICE) el.textContent = C.COOKBOOK_PRICE; });
    var signed = ok(C.COOKBOOK_SIGNED_URL);
    each('[data-gg-cook="signed"]', function (a) {
      if (signed) { a.href = C.COOKBOOK_SIGNED_URL.trim(); a.target = '_blank'; a.rel = 'noopener'; }
      show(a, signed);
    });
    each('[data-gg-cook="signed-card"]', function (el) { show(el, signed); });
    each('[data-gg-cook="signed-price"]', function (el) { if (C.COOKBOOK_SIGNED_PRICE) el.textContent = C.COOKBOOK_SIGNED_PRICE; });
    var cAny = false;
    [['bookshop', 'COOKBOOK_BOOKSHOP_URL'], ['amazon', 'COOKBOOK_AMAZON_URL'], ['bn', 'COOKBOOK_BN_URL']].forEach(function (s) {
      var on = ok(C[s[1]]); if (on) cAny = true;
      each('[data-gg-cook-store="' + s[0] + '"]', function (a) {
        if (on) { a.href = C[s[1]].trim(); a.target = '_blank'; a.rel = 'noopener'; }
        show(a, on);
      });
    });
    each('[data-gg-cook="stores-soon"]', function (el) { show(el, !cAny); });
    document.documentElement.setAttribute('data-gg-cook', (buy ? 'ebook' : 'wait') + (signed ? ' signed' : '') + (cAny ? ' stores' : ''));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
