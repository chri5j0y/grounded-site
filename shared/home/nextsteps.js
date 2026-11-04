/* =====================================================================
   GROW WITH GROUNDED . PINE NEXT STEPS IN HOME (shared/home/nextsteps.js), GWG BLD 912 Round 2
   (c) 2026 Grow With Grounded LLC.
   Pine's Next Steps notebook (#next), run in Home's own window: no tree page, no iframe, nothing from the
   tree page's DOM or globals. Contract: grounded-workshop patches/bld912/CONTRACT-R2.md.
   Ported from pine/app.js (line numbers as of BLD 911): NEXT STEPS 1874 to 1985, nsRec 1883, nsT, nsP,
   nsHelp 1890 to 1892, nsWritten 1893, renderNext 1894, nsChapterHtml 1916, nsSave 1941, nsDelete 1950,
   nsOptIn 1954, nsPickHtml 1960, nsPrint 1966; the help lines card showCalm('hurt') and lineHtml 436.
   Loaded as they are: /pine/nextsteps.js (window.PINE_NEXTSTEPS, the chapters and prompts), /pine/checkin.js
   (its help lines), shared/gg-sources.js (the Sources line), shared/gg-pdf.js (the PDF), and
   shared/home/notebook.js (the notebook screen the three notebooks share).
   Saved exactly as the tree saves: GGP.data(id, 'pine').nextsteps = { answers: { [promptId]: { text, date, q,
   when? } }, opened: { [chapterId]: 'YYYY-MM-DD' } }, then GGP.save(id).
   Differences from the tree, on purpose: Remove asks in place (two buttons) instead of the browser's
   confirm box; the help lines open in place under the prompt instead of a card over the page; the tree's
   painting sits at the top.
   ===================================================================== */
(function () {
  'use strict';
  window.GGScreen = window.GGScreen || {};
  if (window.GGScreen.next) return;
  var FILES = ['/pine/nextsteps.js?v=b788', '/pine/checkin.js?v=b907', '/shared/gg-sources.js?v=b911r', '/shared/gg-pdf.js?v=b803', '/shared/home/notebook.js?v=b912'];

  function open(ctx) {
    var N = window.GGScrNotebook, esc = N.esc, NS = window.PINE_NEXTSTEPS || { chapters: [], intro: [] };
    var CKB = window.PINE_CHECKIN || {}, HELP = CKB.help || {};
    // LINES, pine/app.js 374
    var LINES = (function () { var L = HELP.lines || {}; return Array.isArray(L) ? { calm: L, hurt: L.filter(function (x) { return x.first === 'hurt'; }) } : { calm: L.calm || [], hurt: L.hurt || [] }; })();
    var d0 = GGP.data(ctx.id, 'pine');
    // isPlain, pine/app.js 354: Home's choice for this profile, else the record's own wording.
    var plain = typeof ctx.plain === 'boolean' ? ctx.plain : d0.wording === 'plain';
    var who = (GGP.get && GGP.get(ctx.id)) || {};
    // nsRec, pine/app.js 1883
    function rec() {
      if (!window.GGP || !GGP.isOpen(ctx.id)) return null;
      var d = GGP.data(ctx.id, 'pine'); if (!d.nextsteps || typeof d.nextsteps !== 'object') d.nextsteps = {};
      if (!d.nextsteps.answers) d.nextsteps.answers = {}; if (!d.nextsteps.opened) d.nextsteps.opened = {};
      return d.nextsteps;
    }
    var T = function (c, k) { return (plain && c['plain' + k[0].toUpperCase() + k.slice(1)]) || c[k] || ''; };
    var P = function (p) { return (plain && p.plain) || p.t; };
    var H = function (p) { return (plain && p.plainHelp) || p.help || ''; };
    var written = function (c, L) { return (c.prompts || []).filter(function (p) { return L.answers[p.id] && String(L.answers[p.id].text || '').trim(); }).length; };
    var chapter = function (id) { return (NS.chapters || []).filter(function (c) { return c.id === id; })[0]; };
    return N.mount(ctx, {
      key: 'ns', book: NS, rec: rec, save: function () { return GGP.save(ctx.id); },
      art: { src: '/shared/heroes/pine-wide.webp', alt: '', title: 'Next Steps', sub: 'Your private notebook for what comes next' },
      T: T, P: P, H: H, written: written,
      chapters: function () { return NS.chapters || []; },
      home: function () {
        return { title: 'Next Steps', intro: NS.intro || [], count: function (n) { return n ? n + ' ' + (n === 1 ? 'page' : 'pages') + ' written so far.' : 'One prompt is enough to start.'; },
          foot: '<p class="ggnb-foot">Your notebook stays on this device, locked in your profile. You decide what to print or share, and with whom. When you move on from Pine, it comes with you.</p>' + (window.GGSources ? GGSources.html('pine:nextsteps') : '') };
      },
      chSub: function (c, L, n, closed) { return closed ? 'Opens only when you choose' : n ? n + ' of ' + (c.prompts || []).length + ' written' : (c.prompts || []).length + ' prompts'; },
      // The care line with "Help from outside your home" (nsChapterHtml 1925; showCalm('hurt'), shown in place).
      promptMore: function (c, p, NB) {
        if (!p.care) return '';
        var h = '<p class="ggnb-care">' + esc(NS.careLine || '') + ' <button type="button" class="ggnb-tbtn" data-nb="lines" data-id="' + esc(p.id) + '" aria-expanded="' + (NB.lines === p.id) + '">Help from outside your home</button></p>';
        if (NB.lines === p.id) h += '<div class="ggnb-optin"><h3>' + esc(HELP.hurtTitle || 'Help from outside your home') + '</h3><p class="ggnb-small">' + esc(HELP.hurtIntro || '') + '</p><ul class="ggnb-lines">' + LINES.hurt.map(N.lineHtml).join('') + '</ul></div>';
        return h;
      },
      // "By when (optional)" (nsChapterHtml 1929)
      fields: function (c, p, a) {
        if (!p || !p.when) return null;
        return { html: '<label class="ggnb-lab" for="ggnb-w-' + esc(p.id) + '">By when (optional)</label><input type="date" id="ggnb-w-' + esc(p.id) + '" value="' + esc(a && a.when ? a.when : '') + '">',
          read: function (box) { return { when: ((box.querySelector('input[type=date]') || {}).value || '').trim() }; } };
      },
      // nsSave 1941
      answer: function (c, p, text, more) { var a = { text: text.slice(0, 20000), date: N.todayKey(), q: p ? P(p) : '' }; if (more && more.when) a.when = more.when; return a; },
      meta: function (c, a) { return (a.date ? N.fmtDate(a.date) : '') + (a.when ? '. By ' + N.fmtDate(a.when) : ''); },
      ready: function (L) { return (NS.chapters || []).filter(function (c) { return written(c, L); }).map(function (c) { return [c.id, T(c, 'title')]; }); },
      pickNote: 'Choose what goes in. Share the pages only if you want to, and only with people you choose.',
      // nsPrint 1966
      printDoc: function (ids, L) {
        var chs = ids.map(chapter).filter(function (c) { return c && written(c, L); });
        if (!chs.length) return 'Write in this chapter first, then save or print it.';
        return { title: 'Next Steps', file: 'next-steps.pdf', eyebrow: 'Next Steps', pdfFoot: 'Pine(TM) by Grow With Grounded. growwithgrounded.com/pine',
          docTitle: who.name ? who.name + '\'s Next Steps' : 'My Next Steps', foot: 'Kept with Pine by Grow With Grounded. These words belong to the person who wrote them.',
          sections: chs.map(function (c) { return { title: T(c, 'title'), html: (c.prompts || []).filter(function (p) { return L.answers[p.id] && String(L.answers[p.id].text || '').trim(); }).map(function (p) { var a = L.answers[p.id]; return '<h3 class="sq-legq">' + esc(P(p)) + '</h3><p class="sq-lega">' + N.nl(a.text) + '</p>' + (a.when ? '<p class="sq-legby">By ' + esc(N.fmtDate(a.when)) + '</p>' : ''); }).join('') }; }) };
      },
      say: { saved: 'Saved in your notebook.', blank: 'Left blank. Come back any time.', opened: 'Open. Stop any time.', closed: 'Closed. What you wrote stays in your notebook.',
        removeAsk: 'Remove what is written here? This cannot be undone unless you have a backup.' }
    });
  }

  window.GGScreen.next = {
    files: function () { return FILES.slice(); },
    title: function () { return 'Next Steps'; },
    trees: ['pine'],
    open: open
  };
})();
