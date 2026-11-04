/* =====================================================================
   GROW WITH GROUNDED . SEQUOIA LEGACY BOOK IN HOME (shared/home/legacy.js), GWG BLD 912 Round 2
   (c) 2026 Grow With Grounded LLC.
   Sequoia's Legacy Book (#legacy), run in Home's own window: no tree page, no iframe, nothing from the
   tree page's DOM or globals. Contract: grounded-workshop patches/bld912/CONTRACT-R2.md.
   Ported from sequoia/app.js (line numbers as of BLD 911): THE LEGACY BOOK 1980 to 2101, legRec 1992,
   veteranLine 2001, renderLegacy 2002, legChapterHtml 2026, legSave 2058, legDelete 2066, legOptIn 2070,
   legPickHtml 2076, legPrint 2083.
   Loaded as they are: /sequoia/legacy.js (window.SEQUOIA_LEGACY, the chapters and prompts),
   shared/gg-sources.js (a chapter's Sources line), shared/gg-pdf.js (the PDF), and shared/home/notebook.js.
   Saved exactly as the tree saves: GGP.data(id, 'sequoia').legacy = { answers: { [promptId]: { text, told,
   date, q } }, opened: { [chapterId]: 'YYYY-MM-DD' } }, then GGP.save(id). The tree writes these dates
   with new Date().toISOString().slice(0, 10), and so does this.
   In Home the open profile is the writer: the tree's helper view (HELP, writing while someone tells,
   shareOf(HELP).legacy) stays with the tree's helper screens. "Written down by" stays for anyone who
   writes while the person tells.
   Differences from the tree, on purpose: Remove asks in place instead of the browser's confirm box; the
   tree's painting sits at the top. The help lines stay type only, as the tree has them.
   ===================================================================== */
(function () {
  'use strict';
  window.GGScreen = window.GGScreen || {};
  if (window.GGScreen.legacy) return;
  var FILES = ['/sequoia/legacy.js?v=b787', '/shared/gg-sources.js?v=b916', '/shared/gg-pdf.js?v=b803', '/shared/home/notebook.js?v=b912'];

  function open(ctx) {
    var N = window.GGScrNotebook, esc = N.esc, LEG = window.SEQUOIA_LEGACY || { chapters: [], intro: [] };
    var who = (GGP.get && GGP.get(ctx.id)) || {};
    var iso = function () { return new Date().toISOString().slice(0, 10); };   // legSave 2062, legOptIn 2072
    // legRec, sequoia/app.js 1992
    function rec() {
      if (!window.GGP || !GGP.isOpen(ctx.id)) return null;
      var d = GGP.data(ctx.id, 'sequoia'); if (!d.legacy || typeof d.legacy !== 'object') d.legacy = {};
      if (!d.legacy.answers) d.legacy.answers = {}; if (!d.legacy.opened) d.legacy.opened = {};
      return d.legacy;
    }
    var written = function (c, L) { return (c.prompts || []).filter(function (p) { return L.answers[p.id] && String(L.answers[p.id].text || '').trim(); }).length; };
    var chapter = function (id) { return (LEG.chapters || []).filter(function (c) { return c.id === id; })[0]; };
    // veteranLine, sequoia/app.js 2001 (type only)
    var veteran = function (c, p) { return c.id === 'memories' || /military|served|service/i.test(p.t) ? '<p class="ggnb-care">Veterans: call 988 and press 1, or text 838255, any time.</p>' : ''; };
    return N.mount(ctx, {
      key: 'lg', book: LEG, rec: rec, save: function () { return GGP.save(ctx.id); }, rows: 7, openedDate: iso,
      art: { src: '/shared/heroes/sequoia-wide.webp', alt: '', title: 'Your Legacy Book', sub: 'Your stories, kept for the people you love' },
      T: function (c, k) { return c[k] || ''; }, P: function (p) { return p.t; }, H: function (p) { return p.help || ''; }, written: written,
      chapters: function () { return LEG.chapters || []; },
      home: function () {
        return { title: 'Your Legacy Book', intro: LEG.intro || [], pickLabel: 'Save or Print My Book',
          count: function (n) { return n ? n + ' ' + (n === 1 ? 'page' : 'pages') + ' written so far.' : 'Ready when you are. One story is enough to start.'; },
          foot: '<p class="ggnb-foot">Your book stays on this device, locked in your profile. You decide what to print or share, and with whom. If you later use Willow, what you write here comes along into Willow\'s Cuttings.</p>' +
            '<p class="ggnb-foot">One day, your stories here can help your family write about you. They can use the <a href="/obituary-helper.html">Obituary Helper</a>, the <a href="/eulogy-helper.html">Eulogy Helper</a>, and <a href="/planning-a-farewell.html">Planning a Farewell</a>.</p>' };
      },
      chSub: function (c, L, n, closed) { return closed ? 'Opens only when you choose' : n ? n + ' of ' + (c.prompts || []).length + ' written' : (c.prompts || []).length + ' prompts'; },
      // legChapterHtml 2029: the 988 line in a closed chapter, as type
      optinMore: function () { return '<ul class="ggnb-lines"><li><b>988 Suicide and Crisis Lifeline</b><span><a href="tel:988">Call 988</a> or <a href="sms:988">text 988</a>, any time. Veterans, call 988 and press 1.</span></li></ul>'; },
      promptMore: function (c, p) { return (p.care ? '<p class="ggnb-care">' + esc(LEG.careLine || '') + '</p>' : '') + veteran(c, p); },
      // "Written down by" (legChapterHtml 2040)
      fields: function (c, p, a) {
        return { html: '<label class="ggnb-lab" for="ggnb-w-' + esc(p.id) + '">Written down by (optional, if someone wrote while you told)</label><input type="text" id="ggnb-w-' + esc(p.id) + '" maxlength="60" value="' + esc(a ? a.told || '' : '') + '">',
          read: function (box) { return { told: ((box.querySelector('input[type=text]') || {}).value || '').trim() }; } };
      },
      // legSave 2058
      answer: function (c, p, text, more) { return { text: text.slice(0, 20000), told: String((more && more.told) || '').slice(0, 60), date: iso(), q: p ? p.t : '' }; },
      meta: function (c, a) { return (a.date ? N.fmtDate(a.date) : '') + (a.told ? ', told to ' + a.told : ''); },
      // A chapter drawn from a book carries its Sources line (legChapterHtml 2048).
      after: function (c) { return Array.isArray(c.sources) && c.sources.length && window.GGSources ? GGSources.line(c.sources) : ''; },
      ready: function (L) { return (LEG.chapters || []).filter(function (c) { return written(c, L); }).map(function (c) { return [c.id, c.title]; }); },
      pickNote: 'Choose what goes in. Share the pages with family by hand, by email, or on paper.',
      // legPrint 2083
      printDoc: function (ids, L) {
        var chs = ids.map(chapter).filter(function (c) { return c && written(c, L); });
        if (!chs.length) return 'Write in this chapter first, then save or print it.';
        return { title: 'Legacy Book', file: 'legacy-book.pdf', eyebrow: 'Legacy Book', pdfFoot: 'Sequoia(TM) by Grow With Grounded. growwithgrounded.com',
          docTitle: who.name ? who.name + '\'s Legacy Book' : 'My Legacy Book', foot: 'Kept with Sequoia by Grow With Grounded. These words belong to the person who wrote them.',
          sections: chs.map(function (c) { return { title: c.title, html: (c.prompts || []).filter(function (p) { return L.answers[p.id] && String(L.answers[p.id].text || '').trim(); }).map(function (p) { var a = L.answers[p.id]; return '<h3 class="sq-legq">' + esc(p.t) + '</h3><p class="sq-lega">' + N.nl(a.text) + '</p>' + (a.told ? '<p class="sq-legby">Told to ' + esc(a.told) + '</p>' : ''); }).join('') }; }) };
      },
      say: { saved: 'Kept in your Legacy Book.', blank: 'Left blank. You can come back any time.', opened: 'Open. Pause any time.', closed: 'Closed. What you wrote stays in your book.',
        removeAsk: 'Remove what is written here? This cannot be undone unless you have a backup.' }
    });
  }

  window.GGScreen.legacy = {
    files: function () { return FILES.slice(); },
    title: function () { return 'Legacy Book'; },
    trees: ['sequoia'],
    open: open
  };
})();
