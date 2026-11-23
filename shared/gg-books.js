/* Grounded Books (GWG BLD 1031): the one place for how to get In the End.
   Paste each link between the quotes when it is ready. While a value is empty, its button stays hidden:
   BOOK_PREORDER_URL  the Stripe Payment Link for a signed hardcover from Chris
   BOOK_MEMBER_CODE   the Stripe promotion code for the Member price on signed copies (BLD 1033), letters, numbers, or _
                      only. It shows only inside an open Membership (shared/gg-member.js, the Membership card on /home/),
                      never on the Books page. Anyone who reads this file can see it, like any checkout code.
   BOOKSHOP_URL, AMAZON_URL, BN_URL  the store listings, once they are live
   COOKBOOK_ON, COOKBOOK_BUY_URL      BLD 1050: the cookbook download page (cookbook.html) and its $19.99 Stripe link
   Every page with [data-gg-book] parts reads this file (books.html), and /home/ reads BOOK_MEMBER_CODE. Bump ?v= wherever it loads after a change. */
window.GG_BOOKS = {
  // BLD 1050: The Complete Grounded Cookbook download at /cookbook. COOKBOOK_ON true opens it (with the Worker's COOKBOOK_ON "1",
  // grounded-workshop patches/bld1050/DEPLOY1050.md); COOKBOOK_BUY_URL is the Stripe Payment Link for the $19.99 ebook.
  COOKBOOK_ON: false,
  COOKBOOK_BUY_URL: '',
  COOKBOOK_PRICE: '$19.99',
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
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
