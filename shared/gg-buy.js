/* Grounded buy buttons (GWG BLD 951, Household Gift BLD 952): the Stripe payment links for Organization Membership packs and Gift Membership,
   kept in one place. Each link is the buy.stripe.com address Stripe gives a payment link (public, safe to share).
   Until a link is filled in, its buttons keep their own href (the contact form), so every button always works.

   On a page:
     <a data-gg-buy="org25" href="contact.html#...">          a buy button: its href becomes the payment link once filled in
     <a data-gg-buy-jump="org" data-gg-to="#packs" href="..."> a main button: it moves to the choices once any link of the group is filled in
     <div data-gg-buy-show="org" hidden>                       shown once any link of the group is filled in
     <div data-gg-buy-wait="org">                              shown until then
   Groups: "org" is org25, org50, and org100; "gift" is gift and giftHousehold (BLD 952).
   Every buy button gets data-gg-buy-ready="1" (payment link) or "0" (contact form).
   With Grounded Accounts live, gg-account.js adds the signed in account (client_reference_id, prefilled_email) to every
   buy.stripe.com link by itself, as it does for the Member and Household buttons. */
(function () {
  var LINKS = {
    org25: '',    // Organization Membership, 25 People ($1,200)
    org50: '',    // Organization Membership, 50 People ($2,100)
    org100: '',   // Organization Membership, 100 People ($3,600)
    gift: '',     // Gift Membership, 12 months ($64)
    giftHousehold: ''   // Household Gift, 12 months for a whole home, up to six people ($128) (BLD 952)
  };
  var GROUPS = { org: ['org25', 'org50', 'org100'], gift: ['gift', 'giftHousehold'] };
  var OK = /^https:\/\/buy\.stripe\.com\/[A-Za-z0-9_]+(\?[A-Za-z0-9_=&%.\-]*)?$/;
  function link(k) { var v = LINKS[k]; return typeof v === 'string' && OK.test(v) ? v : ''; }
  function any(g) { return (GROUPS[g] || [g]).some(function (k) { return !!link(k); }); }
  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }
  function paint() {
    each('[data-gg-buy]', function (a) {
      var k = a.getAttribute('data-gg-buy'), u = link(k);
      if (!a.hasAttribute('data-gg-fallback')) a.setAttribute('data-gg-fallback', a.getAttribute('href') || '');
      a.setAttribute('href', u || a.getAttribute('data-gg-fallback'));
      a.setAttribute('data-gg-buy-ready', u ? '1' : '0');
    });
    each('[data-gg-buy-jump]', function (a) {
      if (!a.hasAttribute('data-gg-fallback')) a.setAttribute('data-gg-fallback', a.getAttribute('href') || '');
      var on = any(a.getAttribute('data-gg-buy-jump'));
      a.setAttribute('href', on ? (a.getAttribute('data-gg-to') || '#choices') : a.getAttribute('data-gg-fallback'));
      a.setAttribute('data-gg-buy-ready', on ? '1' : '0');
    });
    each('[data-gg-buy-show]', function (el) { el.hidden = !any(el.getAttribute('data-gg-buy-show')); });
    each('[data-gg-buy-wait]', function (el) { el.hidden = any(el.getAttribute('data-gg-buy-wait')); });
  }
  window.GGBuy = { link: link, any: any, paint: paint };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', paint); else paint();
})();
