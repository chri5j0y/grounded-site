/* =====================================================================
   GROW WITH GROUNDED . A NOTEBOOK IN HOME (shared/home/notebook.js), GWG BLD 912 Round 2
   (c) 2026 Grow With Grounded LLC.
   The one notebook screen that Birch's Groundwork (shared/home/groundwork.js), Pine's Next Steps
   (shared/home/nextsteps.js), and Sequoia's Legacy Book (shared/home/legacy.js) run in Home's own window.
   The three tree pages draw the same notebook with the same parts (sq-chapters, sq-prompt, sq-optin,
   sq-pick, the printed growth-plan-doc): birch/app.js renderGround 2052, pine/app.js renderNext 1894,
   sequoia/app.js renderLegacy 2002. Each module hands this file its words and its record; this file
   draws, saves through the module, and prints.
   Contract: grounded-workshop patches/bld912/CONTRACT-R2.md. No tree page, no iframe, no navigation.

   window.GGScrNotebook
     mount(ctx, cfg)          draws the notebook into ctx.host; returns {close(), state(), go(id)}
     esc(s), fmtDate(iso), todayKey(), lineHtml(x)     small helpers the modules share
     docHtml(o)               the printed sheet (growth-plan-doc), o {title, sections: [{title, html}], foot}
     sheet(ctx, o)            Save or Share PDF, or Print, in Home's own page (GGApp.sheet's two choices,
                              shared/gg-app.js 292): o {title, file, html, eyebrow, foot}
   Print happens in Home's page: the sheet is placed in a print only box on the body for the moment of
   window.print(), and taken away after. The PDF is made on this device by shared/gg-pdf.js (ggPdfFromHTML,
   ggPdf), the same reader the trees use (ggPdfFromEl with rows '.growth-plan-domain-header').
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGScrNotebook) return;

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  // formatDate, birch/app.js 126 and pine/app.js (the same): a long US date, today with no date given.
  function fmtDate(iso) {
    var o = { year: 'numeric', month: 'long', day: 'numeric' };
    if (!iso) return new Date().toLocaleDateString('en-US', o);
    var d = new Date(String(iso).slice(0, 10) + 'T00:00:00');
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('en-US', o);
  }
  // todayKey, birch/app.js 132: the local date.
  function todayKey() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  // lineHtml, birch/app.js 426 (pine/app.js 436 the same): one help line, as type with its links.
  function lineHtml(x) {
    var sms = x.sms ? 'sms:' + x.sms + (x.smsBody ? '?&body=' + encodeURIComponent(x.smsBody) : '') : '';
    var href = x.tel ? 'tel:' + x.tel : sms || x.url || '';
    var main = href ? '<a href="' + esc(href) + '"' + (!x.tel && !sms ? ' target="_blank" rel="noopener"' : '') + '>' + esc(x.show || x.tel || '') + '</a>' : '<span>' + esc(x.show || '') + '</span>';
    var extra = [];
    if (x.tel && sms) extra.push('<a href="' + esc(sms) + '">' + (x.smsBody ? 'Text ' + esc(x.smsBody) + ' to ' + esc(x.sms) : 'Text ' + esc(x.sms)) + '</a>');
    if (x.url && (x.tel || sms)) extra.push('<a href="' + esc(x.url) + '" target="_blank" rel="noopener">Open the website</a>');
    return '<li><b>' + esc(x.name) + '</b>' + main + (extra.length ? ' <span>' + extra.join(' &middot; ') + '</span>' : '') + (x.note ? '<small>' + esc(x.note) + '</small>' : '') + '</li>';
  }
  function nl(t) { return esc(t).replace(/\n/g, '<br>'); }

  /* ---------- look: Home's tokens (home/home.css .hm), light and dark ---------- */
  var STYLE = [
    '.ggnb{color:var(--ink);font-size:16.5px;line-height:1.55;max-width:760px;margin:0 auto;overflow-wrap:anywhere}',
    '.ggnb *{box-sizing:border-box}',
    '.ggnb-art{position:relative;margin:0 0 16px;border-radius:var(--r,22px);overflow:hidden;background:var(--bg-deep);aspect-ratio:16/6}',
    '.ggnb-art img{display:block;width:100%;height:100%;object-fit:cover}',
    '.ggnb-art figcaption{position:absolute;left:0;right:0;bottom:0;padding:28px 18px 14px;background:linear-gradient(transparent,rgba(20,14,8,.72));color:#fff;font-family:"Barlow Condensed",sans-serif;font-weight:700;font-size:26px;letter-spacing:.4px;line-height:1.1}',
    '.ggnb-art figcaption small{display:block;font-family:Barlow,system-ui,sans-serif;font-weight:500;font-size:14.5px;letter-spacing:0;opacity:.92;margin-top:4px}',
    '@media (max-width:560px){.ggnb-art{aspect-ratio:16/9}.ggnb-art figcaption{font-size:22px}}',
    '.ggnb h2{font-family:"Barlow Condensed",sans-serif;font-weight:700;font-size:26px;line-height:1.15;margin:6px 0 8px;color:var(--ink)}',
    '.ggnb h3{font-size:17.5px;line-height:1.35;margin:0 0 6px;color:var(--ink)}',
    '.ggnb-lead{margin:0 0 10px;color:var(--ink)}',
    '.ggnb-small{font-size:14.5px;color:var(--ink-soft);margin:6px 0}',
    '.ggnb-count{font-weight:700;color:var(--gold);margin:12px 0}',
    '.ggnb-chs{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;margin:12px 0 16px}',
    '.ggnb-ch{display:flex;flex-direction:column;gap:3px;text-align:left;padding:14px 16px;border-radius:16px;border:1.5px solid var(--line);background:var(--card);color:var(--ink);font:inherit;cursor:pointer;min-height:76px;box-shadow:var(--shadow)}',
    '.ggnb-ch:hover{border-color:var(--gold-soft)}',
    '.ggnb-ch b{font-size:16.5px}',
    '.ggnb-ch span{font-size:14px;color:var(--ink-soft)}',
    '.ggnb-ch.closed{background:var(--card-2);border-style:dashed}',
    '.ggnb-ch.skills{border-color:var(--gold-soft)}',
    '.ggnb-acts{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}',
    '.ggnb-acts .hm-btn{min-height:44px}',
    '.ggnb-back{background:none;border:0;padding:6px 0;color:var(--gold);font:inherit;font-weight:700;cursor:pointer;text-decoration:underline;text-underline-offset:3px}',
    '.ggnb-p{padding:14px 16px;border-radius:16px;background:var(--card);border:1px solid var(--line);margin:0 0 12px;box-shadow:var(--shadow)}',
    '.ggnb-p.has{border-left:5px solid var(--gold-soft)}',
    '.ggnb-help{font-size:14.5px;color:var(--ink-soft);margin:0 0 8px}',
    '.ggnb-care{font-size:14.5px;color:var(--ink);background:var(--card-2);border-radius:12px;padding:8px 12px;margin:6px 0 10px}',
    '.ggnb-ans{white-space:normal;margin:6px 0;color:var(--ink)}',
    '.ggnb label.ggnb-lab{display:block;font-size:14.5px;color:var(--ink-soft);margin:8px 0 4px}',
    '.ggnb textarea,.ggnb input[type=text],.ggnb input[type=date]{width:100%;max-width:100%;font:inherit;color:var(--ink);background:var(--bg);border:1.5px solid var(--line);border-radius:12px;padding:10px 12px}',
    '.ggnb input[type=date]{max-width:240px}',
    '.ggnb textarea:focus,.ggnb input:focus{outline:2px solid var(--gold-soft);outline-offset:1px}',
    '.ggnb-optin{padding:16px;border-radius:16px;background:var(--card-2);border:1.5px dashed var(--gold-soft);margin:10px 0}',
    '.ggnb-lines{list-style:none;margin:8px 0;padding:0;display:grid;gap:8px}',
    '.ggnb-lines li{display:flex;flex-wrap:wrap;gap:4px 10px;align-items:baseline;padding:10px 12px;border-radius:12px;background:var(--card);border:1px solid var(--line)}',
    '.ggnb-lines li small{flex-basis:100%;color:var(--ink-soft)}',
    '.ggnb a{color:var(--gold)}',
    '.ggnb-pick{padding:14px 16px;border-radius:16px;background:var(--card);border:1px solid var(--line);margin:8px 0 14px}',
    '.ggnb-sw{display:flex;gap:10px;align-items:center;min-height:40px;font-size:16px}',
    '.ggnb-sw input{width:20px;height:20px;accent-color:var(--gold)}',
    '.ggnb-sheet{padding:16px;border-radius:16px;background:var(--card);border:2px solid var(--gold-soft);margin:12px 0;box-shadow:var(--shadow-up)}',
    '.ggnb-ask{padding:12px 14px;border-radius:12px;background:var(--card-2);margin:8px 0}',
    '.ggnb-foot{font-size:14px;color:var(--ink-soft);margin:14px 0 4px}',
    '.ggnb-skills{list-style:none;margin:6px 0 14px;padding:0;display:grid;gap:8px}',
    '.ggnb-skill{padding:10px 12px;border-radius:14px;background:var(--card);border:1px solid var(--line)}',
    '.ggnb-skill.done{border-left:5px solid var(--leaves)}',
    '.ggnb-skill label{display:flex;gap:10px;align-items:flex-start;cursor:pointer}',
    '.ggnb-skill input{width:22px;height:22px;margin-top:2px;flex:none;accent-color:var(--leaves)}',
    '.ggnb-skill small{display:block;color:var(--ink-soft);font-size:14px}',
    '.ggnb-skill .more{display:flex;flex-wrap:wrap;gap:6px 14px;margin:6px 0 0 32px}',
    '.ggnb-tbtn{background:none;border:0;padding:4px 0;color:var(--gold);font:inherit;font-size:14.5px;font-weight:700;cursor:pointer;text-decoration:underline;text-underline-offset:3px;text-align:left}',
    '.ggnb-guide{margin:6px 0 0 32px;padding:10px 12px;border-radius:12px;background:var(--card-2);font-size:15px}',
    '.ggnb-guide p{margin:0 0 6px}',
    '.ggnb-h3{font-family:"Barlow Condensed",sans-serif;font-size:20px;margin:18px 0 8px}',
    '.ggnb-planlist{margin:6px 0 14px;padding-left:22px}',
    '.ggnb .gg-sources,.ggnb .gg-src{font-size:13.5px;color:var(--ink-soft)}',
    '#ggscr-print{display:none}',
    '@media print{html.ggscr-printing body>*:not(#ggscr-print){display:none!important}html.ggscr-printing #ggscr-print{display:block!important;color:#2C1810;background:#fff}}',
    '#ggscr-print .gpd{font-family:Georgia,serif;font-size:12pt;line-height:1.5;padding:0 6mm}',
    '#ggscr-print .gpd-h{border-bottom:2px solid #8B5E1A;margin:0 0 14pt;padding:0 0 6pt}',
    '#ggscr-print .growth-plan-title{font-size:22pt;font-weight:700;color:#2C1810}',
    '#ggscr-print .growth-plan-meta{color:#6B5A4D}',
    '#ggscr-print .growth-plan-domain{break-inside:auto;margin:0 0 14pt}',
    '#ggscr-print .growth-plan-domain-name{font-size:15pt;font-weight:700;color:#8B5E1A;margin:8pt 0 4pt}',
    '#ggscr-print .sq-legq{font-size:12pt;margin:8pt 0 2pt}',
    '#ggscr-print .sq-lega{margin:0 0 4pt}',
    '#ggscr-print .sq-legby{color:#6B5A4D;font-size:10.5pt;margin:0 0 6pt}',
    '#ggscr-print .growth-plan-footer{border-top:1px solid #E6DAC4;margin-top:16pt;padding-top:6pt;color:#6B5A4D;font-size:10pt}'
  ].join('\n');
  function css() {
    if (document.getElementById('ggscr-notebook-css')) return;
    var s = document.createElement('style'); s.id = 'ggscr-notebook-css'; s.textContent = STYLE; document.head.appendChild(s);
  }

  /* ---------- the printed sheet, as each tree builds it (birch/app.js gwPrint 2189, pine nsPrint 1966, sequoia legPrint 2085) ---------- */
  function docHtml(o) {
    return '<div class="growth-plan-doc gpd"><div class="growth-plan-header gpd-h"><div class="growth-plan-title">' + esc(o.title) + '</div><div class="growth-plan-meta">' + esc(fmtDate(null)) + '</div></div>' +
      (o.sections || []).map(function (x) { return '<div class="growth-plan-domain"><div class="growth-plan-domain-header"><div class="growth-plan-domain-name">' + esc(x.title) + '</div></div>' + x.html + '</div>'; }).join('') +
      '<div class="growth-plan-footer"><p>' + esc(o.foot || '') + '</p></div></div>';
  }
  function printNow(html) {
    css();
    var box = document.getElementById('ggscr-print'); if (box) box.remove();
    box = document.createElement('div'); box.id = 'ggscr-print'; box.innerHTML = html; document.body.appendChild(box);
    var root = document.documentElement; root.classList.add('ggscr-printing');
    var done = function () { root.classList.remove('ggscr-printing'); var b = document.getElementById('ggscr-print'); if (b) b.remove(); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    try { window.print(); } catch (e) {}
    setTimeout(done, 1500);
  }
  // GGApp.share without gg-app.js (shared/gg-app.js 272): the share sheet on a phone, a download on a desktop.
  function savePdf(ctx, blob, name, title) {
    try {
      var f = new File([blob], name, { type: 'application/pdf' });
      if (navigator.canShare && navigator.canShare({ files: [f] }) && navigator.maxTouchPoints > 0) {
        navigator.share({ files: [f], title: title || name }).catch(function (e) { if (e && e.name !== 'AbortError') download(ctx, blob, name); });
        return;
      }
    } catch (e) {}
    download(ctx, blob, name);
  }
  function download(ctx, blob, name) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    if (ctx && ctx.toast) ctx.toast('Saved as ' + name + '.');
  }
  // The two choices of GGApp.sheet (shared/gg-app.js 292 to 302): Save or Share PDF, Print, Cancel. Drawn in place.
  function sheet(ctx, o, at) {
    var host = at || ctx.host;
    var old = host.querySelector('.ggnb-sheet'); if (old) old.remove();
    var el = document.createElement('div'); el.className = 'ggnb-sheet'; el.setAttribute('role', 'group'); el.setAttribute('aria-label', o.title || 'Save or Print');
    el.innerHTML = '<h3>' + esc(o.title || 'Save or Print') + '</h3><p class="ggnb-small">Save it as a PDF to keep, text, or email, or print it now.</p>' +
      '<div class="ggnb-acts"><button type="button" class="hm-btn sm" data-nbs="pdf">Save or Share PDF</button><button type="button" class="hm-btn sm line" data-nbs="print">Print</button><button type="button" class="hm-btn sm line" data-nbs="cancel">Cancel</button></div>';
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-nbs]'); if (!b) return;
      var k = b.getAttribute('data-nbs');
      if (k === 'pdf') {
        var bl = null;
        try { bl = window.ggPdfFromHTML ? ggPdfFromHTML(o.html, { rows: '.growth-plan-domain-header', eyebrow: o.eyebrow, foot: o.foot }) : null; } catch (x) { bl = null; }
        if (bl && bl.length && window.ggPdf) savePdf(ctx, ggPdf(bl), o.file || 'grounded.pdf', o.title); else printNow(o.html);
      } else if (k === 'print') printNow(o.html);
      el.remove();
    });
    host.appendChild(el);
    try { el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (x) {}
    var f = el.querySelector('button'); if (f) try { f.focus({ preventScroll: true }); } catch (x) {}
    return el;
  }

  /* ---------- the notebook ----------
     cfg (from the module):
       key            'gw' | 'ns' | 'lg' (element ids)
       art            {src, alt, title, sub}: the tree's painting at the top
       book           the data file's object (BIRCH_GROUNDWORK, PINE_NEXTSTEPS, SEQUOIA_LEGACY)
       rec()          the saved record, made ready (gwRec, nsRec, legRec), or null
       save()         a Promise: GGP.save(ctx.id)
       T(c, k), P(p), H(p)   the chapter, prompt, and help words in the wording in use
       chapters(L)    the chapters in the order the tree shows them
       written(c, L)  how many prompts in a chapter are written
       home(L)        {title, intro: [lines], count(total), foot: html} for the chapter list
       chSub(c, L, n, closed)  the small line on a chapter button
       homeMore(L)    html after the chapter buttons (Skills I've Got)
       top(c, L)      html above the prompts in a chapter (From Pine)
       promptMore(c, p)  html under a prompt's help (care line, help lines, the veterans line)
       optinMore(c)   html in a closed chapter's card
       fields(c, p, a)   the extra fields while writing ({html, read(box)})
       answer(c, p, text, more)   the saved answer, or null to clear
       meta(c, a)     the small line under a written answer
       after(c, L)    html after the prompts (skills, sources)
       pages          {id: (L) => html} for extra pages (skills)
       ready(L)       [[id, title]] for Choose the Chapters
       pickNote       the line in Choose the Chapters
       printDoc(ids, L)  {title, sections, foot, file, eyebrow, pdfFoot, docTitle} or a toast string
       say            {saved, blank, opened, closed, removeAsk}
       onAct(act, el, api)   any other data-nb action (skills)
  */
  function mount(ctx, cfg) {
    css();
    var host = ctx.host, NB = { ch: null, edit: null, pick: false, del: null, how: null, lines: null };
    var root = document.createElement('div'); root.className = 'ggnb ggscr-' + cfg.key; host.appendChild(root);
    var book = cfg.book || { chapters: [] };
    var chapter = function (id) { return (book.chapters || []).filter(function (c) { return c.id === id; })[0] || null; };
    var btn = function (act, label, o) { o = o || {}; return '<button type="button" class="hm-btn sm' + (o.line ? ' line' : '') + '" data-nb="' + act + '"' + (o.id ? ' data-id="' + esc(o.id) + '"' : '') + '>' + esc(label) + '</button>'; };
    var back = '<button type="button" class="ggnb-back" data-nb="open" data-id="">Back to all chapters</button>';
    var artHtml = function () { var a = cfg.art; return a && a.src ? '<figure class="ggnb-art"><img src="' + esc(a.src) + '" alt="' + esc(a.alt || '') + '" loading="lazy"><figcaption>' + esc(a.title || '') + (a.sub ? '<small>' + esc(a.sub) + '</small>' : '') + '</figcaption></figure>' : ''; };

    function homeHtml(L) {
      var H = cfg.home(L), chs = cfg.chapters(L), total = chs.reduce(function (t, c) { return t + cfg.written(c, L); }, 0);
      return artHtml() + '<h2>' + esc(H.title) + '</h2>' + (H.intro || []).map(function (t) { return '<p class="ggnb-lead">' + esc(t) + '</p>'; }).join('') +
        '<p class="ggnb-count">' + esc(H.count(total)) + '</p>' +
        '<div class="ggnb-chs">' + chs.map(function (c) { var n = cfg.written(c, L), closed = c.optIn && !L.opened[c.id];
          return '<button type="button" class="ggnb-ch' + (closed ? ' closed' : '') + '" data-nb="open" data-id="' + esc(c.id) + '"><b>' + esc(cfg.T(c, 'title')) + '</b><span>' + esc(cfg.chSub(c, L, n, closed)) + '</span></button>'; }).join('') +
        (cfg.homeMore ? cfg.homeMore(L) : '') + '</div>' +
        '<div class="ggnb-acts">' + btn('pick', H.pickLabel || 'Save or Print My Notebook') + '</div>' +
        (NB.pick ? pickHtml(L) : '') + (H.foot || '');
    }
    function pickHtml(L) {
      var ready = cfg.ready(L);
      if (!ready.length) return '<p class="ggnb-small">' + esc(cfg.say.pickEmpty || 'Write in a chapter first, and it can be saved or printed here.') + '</p>';
      return '<div class="ggnb-pick"><h3>Choose the Chapters</h3><p class="ggnb-small">' + esc(cfg.pickNote) + '</p>' +
        ready.map(function (c) { return '<label class="ggnb-sw"><input type="checkbox" name="ggnb-pick-' + cfg.key + '" value="' + esc(c[0]) + '" checked> ' + esc(c[1]) + '</label>'; }).join('') +
        '<div class="ggnb-acts">' + btn('printpick', 'Save or Print') + '</div></div>';
    }
    function chapterHtml(c, L) {
      var closed = c.optIn && !L.opened[c.id];
      var h = back + '<h2>' + esc(cfg.T(c, 'title')) + '</h2>' + (cfg.T(c, 'lead') ? '<p class="ggnb-lead">' + esc(cfg.T(c, 'lead')) + '</p>' : '');
      if (closed) return h + '<div class="ggnb-optin"><p>' + esc(cfg.T(c, 'note') || book.careLine || '') + '</p>' + (cfg.optinMore ? cfg.optinMore(c) : '') +
        '<div class="ggnb-acts">' + btn('optin', 'Open This Chapter', { id: c.id }) + btn('open', 'Maybe Later', { id: '', line: true }) + '</div></div>';
      if (cfg.top) h += cfg.top(c, L);
      h += '<p class="ggnb-small">Skip any prompt. Write a little or a lot. The microphone key on your phone\'s keyboard lets you speak instead of type.</p>';
      h += (c.prompts || []).map(function (p) {
        var a = L.answers[p.id] || null, editing = NB.edit === p.id, has = a && String(a.text || '').trim(), F = cfg.fields ? cfg.fields(c, p, a) : null;
        var body;
        if (editing) body = '<label class="ggnb-lab" for="ggnb-t-' + esc(p.id) + '">Your words</label><textarea id="ggnb-t-' + esc(p.id) + '" rows="' + (cfg.rows || 6) + '" maxlength="20000">' + esc(a ? a.text : '') + '</textarea>' + (F ? F.html : '') +
          '<div class="ggnb-acts">' + btn('save', 'Save', { id: p.id }) + btn('cancel', 'Cancel', { line: true }) + (has ? btn('del', 'Remove', { id: p.id, line: true }) : '') + '</div>' +
          (NB.del === p.id ? '<div class="ggnb-ask" role="alert"><p>' + esc(cfg.say.removeAsk) + '</p><div class="ggnb-acts">' + btn('delyes', 'Remove', { id: p.id }) + btn('delno', 'Keep It', { line: true }) + '</div></div>' : '');
        else if (has) body = '<div class="ggnb-ans">' + nl(a.text) + '</div><p class="ggnb-small">' + esc(cfg.meta(c, a)) + '</p><div class="ggnb-acts">' + btn('edit', 'Edit', { id: p.id, line: true }) + '</div>';
        else body = '<div class="ggnb-acts">' + btn('edit', 'Write This One', { id: p.id, line: true }) + '</div>';
        return '<article class="ggnb-p' + (has ? ' has' : '') + '" id="ggnb-p-' + esc(p.id) + '"><h3>' + esc(cfg.P(p)) + '</h3>' + (cfg.H(p) ? '<p class="ggnb-help">' + esc(cfg.H(p)) + '</p>' : '') +
          (cfg.promptMore ? cfg.promptMore(c, p, NB) : '') + body + '</article>';
      }).join('');
      if (cfg.after) h += cfg.after(c, L, NB);
      h += '<div class="ggnb-acts">' + btn('print', cfg.say.printChapter || 'Save or Print This Chapter', { id: c.id }) + (c.optIn ? btn('optout', 'Close This Chapter', { id: c.id, line: true }) : '') + btn('open', 'Back to All Chapters', { id: '', line: true }) + '</div>';
      return h;
    }
    function render() {
      var L = cfg.rec();
      if (!L) { root.innerHTML = artHtml() + '<p class="ggnb-lead">' + esc(cfg.say.noRec || 'Open your profile to write in your notebook.') + '</p>'; return; }
      if (NB.ch && cfg.pages && cfg.pages[NB.ch]) { root.innerHTML = cfg.pages[NB.ch](L, NB, back); return; }
      var c = NB.ch && chapter(NB.ch);
      root.innerHTML = c ? chapterHtml(c, L) : homeHtml(L);
    }
    function top() { try { var sc = host.closest('.hm-sheet-body') || host; sc.scrollTop = 0; root.scrollIntoView({ block: 'start' }); } catch (e) {} }
    function persist() { return Promise.resolve(cfg.save()).then(function () { if (ctx.changed) ctx.changed(); }); }
    var api = { render: render, persist: persist, NB: NB, root: root, top: top };
    function print(ids) {
      var L = cfg.rec(); if (!L || !ids.length) { ctx.toast('Choose a chapter first.'); return; }
      var d = cfg.printDoc(ids, L);
      if (typeof d === 'string') { ctx.toast(d); return; }
      sheet(ctx, { title: d.title, file: d.file, eyebrow: d.eyebrow, foot: d.pdfFoot, html: docHtml({ title: d.docTitle, sections: d.sections, foot: d.foot }) }, root);
    }
    api.print = print;
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-nb]'); if (!b || !root.contains(b)) return;
      var act = b.getAttribute('data-nb'), id = b.getAttribute('data-id') || '', L = cfg.rec();
      if (act === 'open') { NB.ch = id || null; NB.edit = null; NB.pick = false; NB.del = null; NB.how = null; NB.lines = null; render(); top(); return; }
      if (!L) return;
      if (act === 'edit') { NB.edit = id; NB.del = null; render(); var t = root.querySelector('#ggnb-t-' + CSS_ID(id)); if (t) { t.focus(); try { t.scrollIntoView({ block: 'center' }); } catch (x) {} } return; }
      if (act === 'cancel') { NB.edit = null; NB.del = null; render(); return; }
      if (act === 'save') {
        var c = chapter(NB.ch), p = c && (c.prompts || []).filter(function (x) { return x.id === id; })[0];
        var box = root.querySelector('#ggnb-p-' + CSS_ID(id)), text = ((box && box.querySelector('textarea')) || {}).value || '';
        var F = cfg.fields ? cfg.fields(c, p, L.answers[id] || null) : null, more = F && F.read ? F.read(box) : {};
        if (!text.trim()) delete L.answers[id];
        else L.answers[id] = cfg.answer(c, p, text, more);
        NB.edit = null;
        persist().then(function () { render(); ctx.toast(text.trim() ? cfg.say.saved : cfg.say.blank); var a = root.querySelector('#ggnb-p-' + CSS_ID(id)); if (a) try { a.scrollIntoView({ block: 'center' }); } catch (x) {} });
        return;
      }
      if (act === 'del') { NB.del = id; render(); return; }
      if (act === 'delno') { NB.del = null; render(); return; }
      if (act === 'delyes') { delete L.answers[id]; NB.edit = null; NB.del = null; persist().then(render); return; }
      if (act === 'optin' || act === 'optout') {
        var on = act === 'optin';
        if (on) L.opened[id] = cfg.openedDate ? cfg.openedDate() : todayKey(); else delete L.opened[id];
        persist().then(function () { if (!on) NB.ch = null; render(); ctx.toast(on ? cfg.say.opened : cfg.say.closed); });
        return;
      }
      if (act === 'pick') { NB.pick = !NB.pick; render(); return; }
      if (act === 'printpick') { print(Array.prototype.map.call(root.querySelectorAll('input[name="ggnb-pick-' + cfg.key + '"]:checked'), function (x) { return x.value; })); return; }
      if (act === 'print') { print([id]); return; }
      if (act === 'lines') { NB.lines = NB.lines === id ? null : id; render(); return; }
      if (cfg.onAct) cfg.onAct(act, b, api, L);
    });
    root.addEventListener('change', function (e) { var b = e.target.closest('[data-nbc]'); if (b && cfg.onChange) cfg.onChange(b, api, cfg.rec()); });
    render();
    return { close: function () { root.remove(); }, state: function () { return { ch: NB.ch, edit: NB.edit }; }, go: function (id) { NB.ch = id; render(); }, api: api };
  }
  function CSS_ID(s) { return window.CSS && CSS.escape ? CSS.escape(s) : String(s).replace(/[^\w-]/g, '\\$&'); }

  window.GGScrNotebook = { mount: mount, esc: esc, fmtDate: fmtDate, todayKey: todayKey, lineHtml: lineHtml, nl: nl, docHtml: docHtml, sheet: sheet, printNow: printNow, css: css };
})();
