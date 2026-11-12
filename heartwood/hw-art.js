/* =====================================================================
   HEARTWOOD PAINTINGS (heartwood/hw-art.js, BLD 974). (c) 2026 Grow With Grounded LLC.
   A painting on every Heartwood card, with couples of many backgrounds. This file only decorates: it watches #gm-app
   and #gm-learn, finds each card's heading, and places the matching painting at the top of the card. It never reads or
   changes anything a couple writes, and it never touches the questions, codes, or locked answers.
   Cards are matched by their heading (the wording lives in the sealed library, so the match is by key words), and the
   twelve areas of the check-in are matched the same way on the area page.
   ===================================================================== */
(function () {
  'use strict';
  var V = 'b996', BASE = '/heartwood/art/';
  // [key words in the heading, painting]
  var CARDS = [
    [/talk about this/i, 'talk'], [/strengths|growing edge/i, 'strengths'], [/couple workbook|workbook/i, 'workbook'],
    [/money map/i, 'moneymap'], [/practices for two/i, 'practices'], [/monthly check-in/i, 'monthly'],
    [/first-year|first year/i, 'firstyear'], [/your tree|your grove/i, 'grove'], [/week card/i, 'week'],
    [/after the vows/i, 'after'], [/read together|learn/i, 'learn'], [/your check-in|check-in for two/i, 'before'],
    [/welcome|heartwood opens|sample/i, 'hero'], [/thank you/i, 'firstyear']
  ];
  var AREAS = [
    [/communicat|talking|listen/i, 'communication'], [/conflict|repair|disagree/i, 'conflict'], [/money|financ/i, 'money'],
    [/famil|in-law|in law/i, 'families'], [/home|roles|chores/i, 'home'], [/expect/i, 'expectations'],
    [/affection|closeness|intima|touch/i, 'closeness'], [/child|parent/i, 'children'], [/faith|meaning|spirit|plain/i, 'faith'],
    [/friend|fun|play/i, 'fun'], [/health|stress/i, 'health'], [/dream|commit|future/i, 'dreams']
  ];
  function pick(list, text) { for (var i = 0; i < list.length; i++) if (list[i][0].test(text)) return list[i][1]; return ''; }
  function art(card) {
    if (!card || card.querySelector(':scope > .hw-art') || card.closest('.hw-noart')) return;
    var h = card.querySelector(':scope > h2'); if (!h) return;
    var t = h.textContent || '', k = '';
    // the area page: a card whose heading is one of the twelve areas, with the answer scale inside
    if (card.querySelector('.btv-scale, .btv-q')) k = pick(AREAS, t);
    if (!k) k = pick(CARDS, t);
    if (!k) return;
    var f = document.createElement('div'); f.className = 'hw-art'; f.setAttribute('aria-hidden', 'true');
    f.innerHTML = '<img src="' + BASE + k + '.webp?v=' + V + '" alt="" loading="lazy" decoding="async" width="1200" height="480">';
    card.insertBefore(f, card.firstChild); card.classList.add('hw-has-art');
  }
  function sweep(root) { (root || document).querySelectorAll('#gm-app .ff-card, #gm-learn .ff-card').forEach(art); }
  function watch(id) {
    var el = document.getElementById(id); if (!el || !window.MutationObserver) return;
    new MutationObserver(function () { sweep(el); }).observe(el, { childList: true, subtree: true });
    sweep(el);
  }
  function go() { watch('gm-app'); watch('gm-learn'); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
