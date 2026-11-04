/* =====================================================================
   HOME . KIDS' SCREENS KIT (shared/home/kidkit.js), GWG BLD 912 Round 2
   Small helpers the For Grown-ups screen (shared/home/grownup.js) and the kids' When Life Changes talks
   (shared/home/talk.js) share inside Home's window: escaping, one style block, Read Aloud, and
   Save or Print. Save or Print works the way the trees' share sheet does (shared/gg-app.js sheet 292,
   share 271): a real PDF from the page's own words (shared/gg-pdf.js ggPdfFromEl), shared or saved,
   with Print as the other choice. Print shows only the screen's own words (a copy laid on the page
   while it prints), the way the trees' print classes do (maple/index.html 651, 734).
   ===================================================================== */
(function () {
  if (window.GGKidKit) return;
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  function css(id, text) { if (document.getElementById(id)) return; var st = document.createElement('style'); st.id = id; st.textContent = text; document.head.appendChild(st); }
  css('ggscr-kidkit-css',
    '#ggk-print{display:none;}' +
    '@media print{html.ggk-printing,html.ggk-printing body{overflow:visible!important;height:auto!important;background:#fff!important;}' +
    'html.ggk-printing body>*:not(#ggk-print){display:none!important;}' +
    'html.ggk-printing #ggk-print{display:block!important;color:#2C1810;font:16px/1.5 Georgia,serif;padding:0 8px;}' +
    '#ggk-print .no-print,#ggk-print button,#ggk-print .gg-rbar{display:none!important;}#ggk-print a{color:inherit;}}' +
    '.ggk-sheet{margin:10px 0 14px;padding:14px 16px;border-radius:16px;background:var(--card-2,#FBF5EA);border:1px solid var(--line,#E6DAC4);}' +
    '.ggk-sheet p{margin:0 0 10px;}.ggk-sheet .ggk-row{display:flex;flex-wrap:wrap;gap:8px;}');

  function toastOf(ctx, m) { if (ctx && ctx.toast) ctx.toast(m); else if (window.GGP && GGP.toast) GGP.toast(m); }
  function download(ctx, blob, name) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500); toastOf(ctx, 'Saved as ' + name + '.');
  }
  // gg-app.js share (271): the phone's share sheet when it can take a file, else a download.
  function share(ctx, blob, name, title) {
    try {
      var f = new File([blob], name, { type: blob.type || 'application/pdf' });
      if (navigator.canShare && navigator.canShare({ files: [f] }) && (navigator.maxTouchPoints > 0)) {
        return navigator.share({ files: [f], title: title || name }).catch(function (e) { if (e && e.name !== 'AbortError') download(ctx, blob, name); });
      }
    } catch (e) {}
    download(ctx, blob, name); return Promise.resolve();
  }
  function printEl(el) {
    var old = document.getElementById('ggk-print'); if (old) old.remove();
    var box = document.createElement('div'); box.id = 'ggk-print'; box.innerHTML = el.innerHTML;
    document.body.appendChild(box); document.documentElement.classList.add('ggk-printing');
    try { window.print(); } catch (e) {}
    setTimeout(function () { document.documentElement.classList.remove('ggk-printing'); box.remove(); }, 800);
  }
  // sheet(ctx, after, {title, file, el, blocks}): the trees' "Save or Print" choice, shown right under the button.
  function sheet(ctx, after, o) {
    var host = after && after.parentNode; if (!host) return;
    var open = host.querySelector('.ggk-sheet'); if (open) { open.remove(); return; }
    var s = document.createElement('div'); s.className = 'ggk-sheet no-print'; s.setAttribute('role', 'group'); s.setAttribute('aria-label', o.title || 'Save or Print');
    s.innerHTML = '<p>Save it as a PDF to keep, text, or email, or print it now.</p><div class="ggk-row">' +
      '<button type="button" class="hm-btn sm hm-pill" data-ggk="pdf">Save or Share PDF</button><button type="button" class="hm-btn sm line hm-pill" data-ggk="print">Print</button><button type="button" class="hm-btn sm line hm-pill" data-ggk="cancel">Cancel</button></div>';
    after.insertAdjacentElement('afterend', s);
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-ggk]'); if (!b) return;
      var k = b.getAttribute('data-ggk'); s.remove();
      if (k === 'print') { printEl(o.el); return; }
      if (k !== 'pdf') return;
      var bl = null; try { bl = window.ggPdf && window.ggPdfFromEl ? o.blocks() : null; } catch (er) { bl = null; }
      if (!bl || !bl.length) { printEl(o.el); return; }
      share(ctx, window.ggPdf(bl), o.file || 'grounded.pdf', o.title);
    });
  }
  // Read Aloud for a guide in the Grounded voice (read.js control, as maple/index.html 3301 and aspen/index.html 2363).
  function readBar(root, h, tree) {
    if (!root || !h || !window.GGRead || !GGRead.control || root.querySelector('.gg-rbar')) return;
    h.parentNode.insertBefore(GGRead.control({ root: root, label: 'Read this guide aloud', recorded: tree }), h.nextSibling);
  }
  function stopRead() { try { if (window.GGRead && GGRead.stop) GGRead.stop(); } catch (e) {} }
  // The Health and Ability lines (maple/index.html mpLifeLinesHtml 2372, aspen/index.html asLifeLinesHtml 2196), for the open kid.
  function lifeLines(tree, id, cls, smallCls, crisis) {
    if (!window.GGLife || !GGLife.lines) return '';
    var ok = !!(window.GGP && GGP.isOpen && GGP.isOpen(id)); if (!ok) return '';
    try { if (GGLife.use) GGLife.use(id); } catch (e) {}
    var L = []; try { L = GGLife.lines(tree) || []; } catch (e) { L = []; } if (!L.length) return '';
    var href = function (x) { return x.tel ? 'tel:' + x.tel : x.url || ''; };
    var a = tree === 'maple' ? ' class="text-link"' : '';
    return '<div class="' + cls + ' no-print"><h3>' + esc(GGLife.LINES_TITLE || 'Information and Support') + '</h3><p class="' + smallCls + '">' + crisis + '</p><ul>' + L.map(function (x) {
      return '<li><b>' + esc(x.name) + '</b> ' + (href(x) ? '<a' + a + ' href="' + esc(href(x)) + '"' + (x.tel ? '' : ' target="_blank" rel="noopener"') + '>' + esc(x.how) + '</a>' : esc(x.how)) + (x.tel && x.url ? ' <a' + a + ' href="' + esc(x.url) + '" target="_blank" rel="noopener">Website</a>' : '') + '<small>' + esc(x.note || '') + '</small></li>';
    }).join('') + '</ul></div>';
  }
  // A guide's watched mark (gg-learn.js keeps it in the open profile's vault).
  function watched(tree, id) { try { return !!(window.GGLearn && GGLearn.watched && GGLearn.watched(tree, id)); } catch (e) { return false; } }
  window.GGKidKit = { esc: esc, css: css, sheet: sheet, printEl: printEl, readBar: readBar, stopRead: stopRead, lifeLines: lifeLines, watched: watched,
    OWNER: 'Grow With Grounded LLC', V: 'b912' };
})();
