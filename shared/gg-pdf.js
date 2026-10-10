/* =====================================================================
   GROUNDED PDF FILES (gg-pdf.js)
   Real PDF files made on the device, offline, with no library. Plain
   Helvetica text, so they open anywhere. Started in the Field Guide
   (session 18) and shared with every tool in session 19.

   ggPdf(blocks)          returns a PDF Blob. A block is {k, t, c}
                          k: eyebrow, h1, sub, h2, p, li, b, i, foot
                             grid  {head:[...], rows:[[label, cell, ...]], colors:[hex per row]}
                             lines {n}        lines to write on
                             box   {h}        an empty box to draw in
                             sign  {t}        a signature line with a label
                          page             start a new page
                          qr    {url, t}   a QR code (needs gg-qr.js) with a label and the address
                          cards {cards:[{head, sub, kind, t, left, right, color}], backs, foot}
                                           playing-card size cards, nine to a page, with dashed
                                           cut lines; backs adds a mirrored backs page after each
                                           (for printing two sided, flip on the long edge)
                          c: an optional text color, like '#8B5E1A'
   ggSheetBlocks(model)   a sheet model {eyebrow, title, sub, sec:[{h, p:[], li:[]}],
                          after:[], close, foot} as blocks
   ggSheetHTML(model)     the same model as print HTML
   ggPdfFromEl(el, opts)  reads a sheet already on the page into blocks
   ggPdfFromHTML(html, opts)   the same, from an HTML string. Marks it understands:
                          data-pdf-k="h1" (or any block kind) on an element, data-pdf-page,
                          data-pdf-qr="https://..." with its label as the element's text
                          opts {eyebrow, foot}
   ===================================================================== */
(function () {
  var W = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];
  function text(s) {
    s = String(s == null ? '' : s).replace(/[\u2018\u2019\u02BC]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/\u2026/g, '...').replace(/[\u2010-\u2015\u2212]/g, '-').replace(/\u2122/g, '\x99').replace(/\u2022/g, '\x95').replace(/\u00A0/g, ' ').replace(/\u2713|\u2714/g, 'x').replace(/\u2611|\u2612/g, '[x]').replace(/\u2610/g, '[  ]');
    return Array.from(s.normalize('NFC')).map(function (ch) { var c = ch.charCodeAt(0); return c <= 255 ? ch : (ch.normalize('NFKD').replace(/[^\x00-\xFF]/g, '')[0] || ''); }).join('');
  }
  function width(s, size, bold) { var w = 0; for (var i = 0; i < s.length; i++) { var c = s.charCodeAt(i); w += (c >= 32 && c <= 126 ? W[c - 32] : c === 0x99 ? 1000 : 556); } return w * size / 1000 * (bold ? 1.07 : 1); }
  function escp(s) { var o = ''; for (var i = 0; i < s.length; i++) { var ch = s[i], c = s.charCodeAt(i); o += ch === '\\' || ch === '(' || ch === ')' ? '\\' + ch : c > 126 || c < 32 ? '\\' + c.toString(8).padStart(3, '0') : ch; } return o; }
  function rgb(hex, fb) {
    var m = /^#?([0-9a-f]{6})$/i.exec(String(hex || '').trim()); if (!m) return fb;
    var n = parseInt(m[1], 16); return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255].map(function (v) { return +v.toFixed(3); });
  }
  function wrap(s, size, bold, max) {
    var lines = [], cur = '';
    String(s).split(/\s+/).filter(Boolean).forEach(function (w) { var tr = cur ? cur + ' ' + w : w; if (width(tr, size, bold) <= max || !cur) cur = tr; else { lines.push(cur); cur = w; } });
    if (cur) lines.push(cur);
    return lines;
  }
  function fit(s, size, bold, max) { if (width(s, size, bold) <= max) return s; while (s.length > 1 && width(s + '...', size, bold) > max) s = s.slice(0, -1); return s + '...'; }

  function ggPdf(blocks) {
    var PW = 612, PH = 792, M = 60, TW = PW - 2 * M;
    var INK = [0.173, 0.094, 0.063], SOFT = [0.35, 0.3, 0.27], GOLD = [0.545, 0.369, 0.102], RULE = [0.81, 0.765, 0.678];
    var ST = { eyebrow: [9, 'F2', GOLD, 6], h1: [21, 'F2', GOLD, 8], sub: [11, 'F1', SOFT, 14], h2: [13, 'F2', INK, 4], p: [11, 'F1', INK, 8], li: [11, 'F1', INK, 3], b: [11, 'F2', INK, 6], i: [10, 'F3', SOFT, 8], foot: [8, 'F1', [0.45, 0.42, 0.4], 0] };
    var pages = [], ops = [], y = PH - M, foot = '';
    function newPage() { if (ops.length) pages.push(ops); ops = []; y = PH - M; }
    function room(h) { if (y - h < M + 20) newPage(); }
    function line(txt, x, f, size, col) { ops.push('BT ' + col.join(' ') + ' rg /' + f + ' ' + size + ' Tf ' + x.toFixed(1) + ' ' + y.toFixed(1) + ' Td (' + escp(txt) + ') Tj ET'); }
    function rect(x, yy, w, h, stroke, fill) { ops.push((fill ? fill.join(' ') + ' rg ' : '') + (stroke ? stroke.join(' ') + ' RG 0.6 w ' : '') + x.toFixed(1) + ' ' + yy.toFixed(1) + ' ' + w.toFixed(1) + ' ' + h.toFixed(1) + ' re ' + (fill && stroke ? 'B' : fill ? 'f' : 'S')); }
    function hline(x1, x2, yy, col) { ops.push(col.join(' ') + ' RG 0.6 w ' + x1.toFixed(1) + ' ' + yy.toFixed(1) + ' m ' + x2.toFixed(1) + ' ' + yy.toFixed(1) + ' l S'); }

    function at(txt, x, yy, f, size, col) { var k = y; y = yy; line(txt, x, f, size, col); y = k; }
    // Nine playing-card size cards to a page (2.44 by 3.4 inches), dashed cut lines, optional mirrored backs.
    function cards(bk) {
      var list = bk.cards || [], CW = 176, CH = 245, X0 = (PW - 3 * CW) / 2, YT = PH - 18, cfoot = text(bk.foot || '');
      function cuts() {
        ops.push('0.7 0.7 0.7 RG 0.5 w [3 3] 0 d');
        for (var i = 0; i <= 3; i++) { var x = X0 + i * CW; ops.push(x.toFixed(1) + ' ' + (YT - 3 * CH - 10).toFixed(1) + ' m ' + x.toFixed(1) + ' ' + (YT + 10).toFixed(1) + ' l S'); }
        for (var j = 0; j <= 3; j++) { var yy = YT - j * CH; ops.push((X0 - 10).toFixed(1) + ' ' + yy.toFixed(1) + ' m ' + (X0 + 3 * CW + 10).toFixed(1) + ' ' + yy.toFixed(1) + ' l S'); }
        ops.push('[] 0 d');
      }
      function face(c, x, top) {
        var col = rgb(c.color, GOLD), head = text(c.head), sub = text(c.sub), kind = text(c.kind), t = text(c.t);
        rect(x + 8, top - 42, CW - 16, 34, null, col);
        at(fit(head, 12, true, CW - 32), x + 16, top - 24, 'F2', 12, [1, 1, 1]);
        if (sub) at(fit(sub, 8, false, CW - 32), x + 16, top - 36, 'F1', 8, [1, 1, 1]);
        if (kind) at(fit(kind, 8, true, CW - 32), x + 16, top - 58, 'F2', 8, SOFT);
        var size = t.length > 95 ? 11 : 12.5, ls;
        while (true) { ls = wrap(t, size, false, CW - 32); if (ls.length * size * 1.3 <= CH - 108 || size <= 8) break; size -= 0.5; }
        ls.forEach(function (l, i) { at(fit(l, size, false, CW - 32), x + 16, top - 76 - i * size * 1.3, 'F1', size, INK); });
        var lf = fit(text(c.left || ''), 7.5, false, (CW - 32) / 2), rt = fit(text(c.right || ''), 7.5, false, (CW - 32) / 2);
        if (lf) at(lf, x + 16, top - CH + 16, 'F1', 7.5, SOFT);
        if (rt) at(rt, x + CW - 16 - width(rt, 7.5, false), top - CH + 16, 'F1', 7.5, SOFT);
      }
      function back(c, x, top) {
        var col = rgb(c.color, GOLD), head = text(c.head), sub = text(c.sub), bl = text(c.backLine || '');
        ops.push(col.join(' ') + ' RG 3 w ' + (x + 12).toFixed(1) + ' ' + (top - CH + 12).toFixed(1) + ' ' + (CW - 24).toFixed(1) + ' ' + (CH - 24).toFixed(1) + ' re S');
        var hw = width(head, 18, true); at(head, x + (CW - hw) / 2, top - CH / 2 + 8, 'F2', 18, col);
        if (sub) { var sw = width(sub, 10, false); at(sub, x + (CW - sw) / 2, top - CH / 2 - 10, 'F1', 10, SOFT); }
        if (bl) { bl = fit(bl, 7.5, false, CW - 36); at(bl, x + (CW - width(bl, 7.5, false)) / 2, top - CH + 24, 'F1', 7.5, SOFT); }
      }
      if (ops.length) newPage();
      for (var p = 0; p < list.length; p += 9) {
        var nine = list.slice(p, p + 9);
        cuts();
        nine.forEach(function (c, i) { face(c, X0 + (i % 3) * CW, YT - Math.floor(i / 3) * CH); });
        ops.cardFoot = cfoot; newPage();
        if (bk.backs) {
          cuts();
          nine.forEach(function (c, i) { var row = Math.floor(i / 3), colm = 2 - (i % 3); back(c, X0 + colm * CW, YT - row * CH); });
          ops.cardFoot = ''; newPage();
        }
      }
    }
    function qr(bk) {
      var mx = null; try { if (window.GGQR && window.GGQR.matrix && bk.url) mx = window.GGQR.matrix(bk.url); } catch (e) { mx = null; }
      // Dense codes (long links) print bigger so a phone camera can read them. A link that carries data after the #
      // shows only its address part as text; the code itself has the whole link.
      var sz = Math.max(60, Math.min(170, bk.size || (mx ? Math.max(96, mx.length * 2.3) : 96))), lbl = text(bk.t || ''), u = text(String(bk.url || '').replace(/^https?:\/\//, '').replace(/#.*$/, ''));
      var tw = mx ? TW - sz - 18 : TW, tx = mx ? M + sz + 18 : M, ll = wrap(lbl, 10, false, tw), ul = wrap(u.replace(/\//g, '/ '), 8, false, tw).map(function (s) { return s.replace(/\/ /g, '/'); });
      var need = Math.max(mx ? sz : 0, ll.length * 14 + ul.length * 11) + 16;
      room(need); y -= 8; var top = y;
      if (mx) {
        var n = mx.length, cell = sz / n;
        for (var r = 0; r < n; r++) {
          var run = -1;
          for (var c = 0; c <= n; c++) {
            var on = c < n && mx[r][c];
            if (on && run < 0) run = c;
            if (!on && run >= 0) { ops.push('0 0 0 rg ' + (M + run * cell).toFixed(2) + ' ' + (top - (r + 1) * cell).toFixed(2) + ' ' + ((c - run) * cell + 0.05).toFixed(2) + ' ' + (cell + 0.05).toFixed(2) + ' re f'); run = -1; }
          }
        }
      }
      var yy = top - 10;
      ll.forEach(function (l) { at(l, tx, yy, 'F1', 10, INK); yy -= 14; });
      ul.forEach(function (l) { at(l, tx, yy, 'F1', 8, SOFT); yy -= 11; });
      y = Math.min(top - (mx ? sz : 0), yy) - 12;
    }

    (blocks || []).forEach(function (bk) {
      if (!bk) return;
      if (bk.k === 'foot') { foot = text(bk.t); return; }
      if (bk.k === 'page') { if (ops.length) newPage(); return; }
      if (bk.k === 'cards') { cards(bk); return; }
      if (bk.k === 'qr') { qr(bk); return; }
      if (bk.k === 'grid') {
        var head = (bk.head || []).map(text), rows = bk.rows || [], n = Math.max(head.length, rows.reduce(function (a, r) { return Math.max(a, r.length); }, 0));
        if (!n) return;
        var first = n > 1 ? Math.min(170, TW * 0.34) : TW, cw = n > 1 ? (TW - first) / (n - 1) : 0, rh = rows.length > 12 ? 17 : 20, fs = 8;
        var row = function (cells, bold, color) {
          room(rh);
          var top = y; y -= rh;
          for (var i = 0; i < n; i++) {
            var x = i ? M + first + (i - 1) * cw : M, w = i ? cw : first, t = text(cells[i] == null ? '' : cells[i]);
            rect(x, y, w, rh, RULE, bold ? [0.96, 0.93, 0.88] : null);
            var tx = i ? x + Math.max(2, (w - width(fit(t, fs, bold, w - 4), fs, bold)) / 2) : x + (color ? 16 : 5);
            if (t) { var keep = y; y = y + rh / 2 - fs * 0.35; line(fit(t, fs, bold, w - (i ? 4 : (color ? 20 : 9))), tx, bold ? 'F2' : 'F1', fs, INK); y = keep; }
            if (!i && color) rect(x + 5, y + rh / 2 - 3.5, 7, 7, null, color);
          }
          void top;
        };
        y -= 4;
        if (head.length) row(head, true, null);
        rows.forEach(function (r, j) { row(r, false, bk.colors && bk.colors[j] ? rgb(bk.colors[j], null) : null); });
        y -= 12; return;
      }
      if (bk.k === 'lines') { var ln = Math.max(1, Math.min(12, bk.n || 3)); for (var q = 0; q < ln; q++) { room(26); y -= 26; hline(M, M + TW, y, RULE); } y -= 10; return; }
      if (bk.k === 'box') { var h = Math.max(60, Math.min(400, bk.h || 140)); room(h + 4); y -= h; rect(M, y, TW, h, RULE, null); y -= 12; return; }
      if (bk.k === 'sign') { room(40); y -= 30; hline(M, M + 240, y, RULE); y -= 11; line(text(bk.t || ''), M, 'F1', 9, SOFT); y -= 10; return; }
      var s = ST[bk.k] || ST.p, t = text(bk.t), col = rgb(bk.c, s[2]);
      if (!t.trim()) return;
      var size = s[0], lh = size * 1.38, ind = bk.k === 'li' ? 16 : 0, bold = s[1] === 'F2';
      if (bk.k === 'h2') y -= 8;
      var words = t.split(/\s+/).filter(Boolean), lines = [], cur = '';
      words.forEach(function (w) { var tr = cur ? cur + ' ' + w : w; if (width(tr, size, bold) <= TW - ind || !cur) cur = tr; else { lines.push(cur); cur = w; } });
      if (cur) lines.push(cur);
      if (bk.k === 'h2' && y - lh * 3 < M + 20) newPage();
      lines.forEach(function (l, j) {
        room(lh);
        y -= lh;
        if (bk.k === 'li' && j === 0) line('\x95', M + 4, 'F1', size, col);
        line(fit(l, size, bold, TW - ind), M + ind, s[1], size, col);
      });
      y -= s[3];
    });
    newPage();
    if (!pages.length) pages.push([]);
    var objs = [], add = function (o) { objs.push(o); return objs.length; };
    var cat = add(''), pgs = add(''), f1 = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'),
      f2 = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'), f3 = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>');
    var kids = pages.map(function (o, n) {
      var ft = (foot ? foot + '   ' : '') + 'Page ' + (n + 1) + ' of ' + pages.length;
      if (o.cardFoot != null) ft = (o.cardFoot ? o.cardFoot + '   ' : '') + 'Page ' + (n + 1) + ' of ' + pages.length;
      var body = o.concat(['BT 0.45 0.42 0.4 rg /F1 8 Tf ' + (o.cardFoot != null ? 42 : M) + ' ' + (o.cardFoot != null ? 22 : M - 24) + ' Td (' + escp(fit(ft, 8, false, o.cardFoot != null ? PW - 84 : TW)) + ') Tj ET']).join('\n');
      var c = add('<< /Length ' + body.length + ' >>\nstream\n' + body + '\nendstream');
      return add('<< /Type /Page /Parent ' + pgs + ' 0 R /MediaBox [0 0 ' + PW + ' ' + PH + '] /Resources << /Font << /F1 ' + f1 + ' 0 R /F2 ' + f2 + ' 0 R /F3 ' + f3 + ' 0 R >> >> /Contents ' + c + ' 0 R >>');
    });
    objs[cat - 1] = '<< /Type /Catalog /Pages ' + pgs + ' 0 R >>';
    objs[pgs - 1] = '<< /Type /Pages /Kids [' + kids.map(function (k) { return k + ' 0 R'; }).join(' ') + '] /Count ' + kids.length + ' >>';
    var out = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n', offs = [];
    objs.forEach(function (o, i) { offs.push(out.length); out += (i + 1) + ' 0 obj\n' + o + '\nendobj\n'; });
    var xr = out.length;
    out += 'xref\n0 ' + (objs.length + 1) + '\n0000000000 65535 f \n' + offs.map(function (n) { return String(n).padStart(10, '0') + ' 00000 n \n'; }).join('') + 'trailer\n<< /Size ' + (objs.length + 1) + ' /Root ' + cat + ' 0 R >>\nstartxref\n' + xr + '\n%%EOF';
    var bytes = new Uint8Array(out.length); for (var i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 255;
    return new Blob([bytes], { type: 'application/pdf' });
  }

  function escH(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function sheetBlocks(m) {
    var b = [{ k: 'eyebrow', t: m.eyebrow || 'Grow With Grounded' }, { k: 'h1', t: m.title }];
    if (m.sub) b.push({ k: 'sub', t: m.sub });
    (m.sec || []).forEach(function (s) { b.push({ k: 'h2', t: s.h }); (s.p || []).forEach(function (t) { b.push({ k: 'p', t: t }); }); (s.li || []).forEach(function (t) { b.push({ k: 'li', t: t }); }); });
    (m.after || []).forEach(function (t) { b.push({ k: 'b', t: t }); });
    if (m.close) b.push({ k: 'i', t: m.close });
    if (m.foot) b.push({ k: 'foot', t: m.foot });
    return b;
  }
  function sheetHTML(m) {
    return '<h1>' + escH(m.title) + '</h1>' + (m.sub ? '<p>' + escH(m.sub) + '</p>' : '') + (m.sec || []).map(function (s) {
      return '<h2>' + escH(s.h) + '</h2>' + (s.p || []).map(function (t) { return '<p>' + escH(t) + '</p>'; }).join('') + ((s.li || []).length ? '<ul>' + s.li.map(function (t) { return '<li>' + escH(t) + '</li>'; }).join('') + '</ul>' : '');
    }).join('') + (m.after || []).map(function (t) { return '<p><b>' + escH(t) + '</b></p>'; }).join('') + (m.close ? '<p style="margin-top:4mm"><i>' + escH(m.close) + '</i></p>' : '') + (m.foot ? '<div class="pr-foot">' + escH(m.foot) + '</div>' : '');
  }

  /* ---------- reading a sheet that's already on the page ---------- */
  var INLINE = /^(A|B|STRONG|I|EM|SPAN|SMALL|SUP|SUB|BR|ABBR|CODE|MARK|U|S|LABEL|TIME|Q|CITE)$/;
  var SKIP = /^(SVG|SCRIPT|STYLE|BUTTON|INPUT|SELECT|TEXTAREA|IMG|CANVAS|VIDEO|AUDIO|IFRAME|NOSCRIPT|TEMPLATE|DIALOG)$/;
  var SMALL = '.sm,.muted,.sheet-sub,.growth-plan-meta,.meta,.tracker-label,.next-date,.sub';
  var FOOT = '.tm-line,.ft,.growth-plan-footer,.talk-note,.sheet-brand,.pr-foot,.made-by';
  function clean(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
  function txtOf(el) {
    var out = '';
    (function walk(n) {
      n.childNodes.forEach(function (c) {
        if (c.nodeType === 3) out += c.nodeValue;
        else if (c.nodeType === 1) {
          if (SKIP.test(c.nodeName.toUpperCase()) || c.hidden || c.getAttribute('aria-hidden') === 'true' || (c.classList && c.classList.contains('no-print'))) return;
          if (c.nodeName === 'BR') out += ' '; else walk(c);
        }
      });
    })(el);
    return clean(out);
  }
  function colorOf(el) {
    var c = el.style && el.style.color; if (!c) return null;
    if (/^#/.test(c)) return c;
    var m = /rgb\((\d+),\s*(\d+),\s*(\d+)/.exec(c); if (!m) return null;
    return '#' + [m[1], m[2], m[3]].map(function (v) { return (+v).toString(16).padStart(2, '0'); }).join('');
  }
  function fromEl(root, opts) {
    opts = opts || {};
    var out = [], hadH1 = false;
    if (opts.eyebrow) out.push({ k: 'eyebrow', t: opts.eyebrow });
    function inlineOnly(el) { for (var i = 0; i < el.children.length; i++) { var c = el.children[i]; if (SKIP.test(c.nodeName.toUpperCase())) continue; if (!INLINE.test(c.nodeName.toUpperCase())) return false; } return true; }
    function push(k, el, t) { t = t == null ? txtOf(el) : clean(t); if (t) out.push({ k: k, t: t, c: el ? colorOf(el) : null }); }
    function walk(el) {
      var tag = el.nodeName.toUpperCase();
      if (SKIP.test(tag) || el.hidden || el.getAttribute('aria-hidden') === 'true' || (el.classList && el.classList.contains('no-print'))) return;
      if (el.hasAttribute && el.hasAttribute('data-pdf-page')) { out.push({ k: 'page' }); return; }
      if (el.hasAttribute && el.hasAttribute('data-pdf-k')) { var tk = txtOf(el); if (tk) out.push({ k: el.getAttribute('data-pdf-k'), t: tk, c: colorOf(el) }); return; }
      if (el.hasAttribute && el.hasAttribute('data-pdf-qr')) { out.push({ k: 'qr', url: el.getAttribute('data-pdf-qr'), t: txtOf(el) }); return; }
      if (opts.rows && el.matches && el.matches(opts.rows)) { var parts = Array.prototype.map.call(el.children, txtOf).filter(Boolean); if (parts.length) out.push({ k: 'h2', t: parts.join('   '), c: colorOf(el.querySelector('[style*="color"]') || el) }); return; }
      if (el.matches && el.matches(FOOT)) { var ft = txtOf(el); if (ft) out.push({ k: 'i', t: ft }); return; }
      if (tag === 'H1' || (el.matches && el.matches('.sheet-title,.growth-plan-title'))) { push(hadH1 ? 'h2' : 'h1', el); hadH1 = true; return; }
      if (tag === 'H2' || tag === 'H3') { push('h2', el); return; }
      if (/^H[4-6]$/.test(tag)) { push('b', el); return; }
      if (tag === 'TABLE') {
        var trs = el.querySelectorAll('tr'), head = [], rows = [], colors = [];
        trs.forEach(function (tr, i) {
          var cells = Array.prototype.map.call(tr.children, function (c) { return txtOf(c); });
          if (i === 0 && tr.querySelectorAll('td').length === 0) head = cells;
          else { rows.push(cells); var dot = tr.querySelector('i[style*="background"]'); colors.push(dot ? colorOf({ style: { color: dot.style.background || dot.style.backgroundColor } }) : null); }
        });
        out.push({ k: 'grid', head: head, rows: rows, colors: colors }); return;
      }
      if (tag === 'UL' || tag === 'OL') { el.querySelectorAll('li').forEach(function (li) { var c = li.cloneNode(true); c.querySelectorAll('ul,ol').forEach(function (x) { x.remove(); }); push('li', li, txtOf(c)); }); return; }
      if (el.matches && el.matches('.lines,.write-lines')) { out.push({ k: 'lines', n: el.children.length || 3 }); return; }
      if (el.matches && el.matches('.draw-box')) { out.push({ k: 'box', h: 150 }); return; }
      if (el.matches && el.matches('.sign-line')) { out.push({ k: 'sign', t: txtOf(el) }); return; }
      if (INLINE.test(tag)) { push(tag === 'B' || tag === 'STRONG' ? 'b' : 'p', el); return; }
      if (inlineOnly(el)) {
        var k = el.matches && el.matches(SMALL) ? 'sub' : 'p';
        var only = el.children.length === 1 && /^(B|STRONG)$/.test(el.children[0].nodeName) && clean(el.textContent) === clean(el.children[0].textContent);
        push(only ? 'b' : k, el); return;
      }
      el.childNodes.forEach(function (c) {
        if (c.nodeType === 3) { var t = clean(c.nodeValue); if (t) out.push({ k: 'p', t: t }); }
        else if (c.nodeType === 1) walk(c);
      });
    }
    walk(root);
    if (opts.foot) out.push({ k: 'foot', t: opts.foot });
    return out;
  }
  function fromHTML(html, opts) {
    var d = new DOMParser().parseFromString('<!DOCTYPE html><body>' + html + '</body>', 'text/html');
    return fromEl(d.body, opts);
  }

  /* ---------- the Take-Home Sheet as a designed one-page PDF (GWG BLD 782) ----------
     ggTakeHomePdf(n, art) returns a PDF Blob: the app's painting across the top (baked into a JPEG with its mark and a
     soft shade, art.hero), the visit in words and light, the plan, Bring It Home and Meet the app QR codes, help lines,
     and Who We Are with Chris and Kayti's photos (art.pics). n is the model from GGPrint.takeHomeModel. Text shrinks a
     little at a time until everything fits on one page. ggPdfImage(url, w, h, o) makes the JPEGs it needs. */
  function jpegFrom(canvas, q) {
    var b64 = canvas.toDataURL('image/jpeg', q || 0.86).split(',')[1], bin = atob(b64);
    return { data: bin, w: canvas.width, h: canvas.height };
  }
  function ggPdfImage(url, w, h, o) {
    o = o || {};
    return new Promise(function (ok) {
      var im = new Image(); im.decoding = 'async';
      im.onload = function () {
        try {
          var c = document.createElement('canvas'); c.width = w; c.height = h;
          var g = c.getContext('2d'), iw = im.naturalWidth || im.width, ih = im.naturalHeight || im.height;
          g.fillStyle = o.bg || '#FFFCF6'; g.fillRect(0, 0, w, h);
          var k = Math.max(w / iw, h / ih), sw = w / k, sh = h / k, px = o.x == null ? 0.5 : o.x, py = o.y == null ? 0.5 : o.y;
          g.drawImage(im, Math.max(0, (iw - sw) * px), Math.max(0, (ih - sh) * py), sw, sh, 0, 0, w, h);
          if (o.paint) o.paint(g, w, h);
          ok(jpegFrom(c, o.q));
        } catch (e) { ok(null); }
      };
      im.onerror = function () { ok(null); };
      im.src = url;
    });
  }
  function ggTakeHomePdf(n, art) {
    art = art || {};
    var PW = 612, PH = 792, X0 = 40, XR = PW - 40, GAP = 18, SIDE = 186, MW = XR - X0 - SIDE - GAP, SX = XR - SIDE;
    var C = rgb(n.color, [0.545, 0.369, 0.102]), INK = [0.173, 0.094, 0.063], SOFT = [0.36, 0.3, 0.26], WHITE = [1, 1, 1];
    var CREAM = [0.965, 0.933, 0.859], DEEP = [0.949, 0.925, 0.878], GOLD = [0.545, 0.369, 0.102], RULE = [0.89, 0.85, 0.77];
    var HERO = 150, WHO_T = 150, WHO_B = 58, TOP = PH - HERO - 16, BOT = WHO_T + 12;
    function mix(a, b, t) { return [0, 1, 2].map(function (i) { return +(a[i] + (b[i] - a[i]) * t).toFixed(3); }); }
    function circ(cx, cy, r) {
      var k = r * 0.5523;
      return (cx + r).toFixed(2) + ' ' + cy.toFixed(2) + ' m ' + (cx + r).toFixed(2) + ' ' + (cy + k).toFixed(2) + ' ' + (cx + k).toFixed(2) + ' ' + (cy + r).toFixed(2) + ' ' + cx.toFixed(2) + ' ' + (cy + r).toFixed(2) + ' c '
        + (cx - k).toFixed(2) + ' ' + (cy + r).toFixed(2) + ' ' + (cx - r).toFixed(2) + ' ' + (cy + k).toFixed(2) + ' ' + (cx - r).toFixed(2) + ' ' + cy.toFixed(2) + ' c '
        + (cx - r).toFixed(2) + ' ' + (cy - k).toFixed(2) + ' ' + (cx - k).toFixed(2) + ' ' + (cy - r).toFixed(2) + ' ' + cx.toFixed(2) + ' ' + (cy - r).toFixed(2) + ' c '
        + (cx + k).toFixed(2) + ' ' + (cy - r).toFixed(2) + ' ' + (cx + r).toFixed(2) + ' ' + (cy - k).toFixed(2) + ' ' + (cx + r).toFixed(2) + ' ' + cy.toFixed(2) + ' c';
    }
    // Light, as on the painting (BLD 780): a Strength glows full and warm, Steady glows softly, a Growing Edge is new green light.
    var LIGHT = { strong: [[1, 0.953, 0.769], [0.949, 0.765, 0.353], [0.851, 0.604, 0.169], 1.9], steady: [[1, 0.973, 0.902], [0.953, 0.867, 0.651], [0.886, 0.761, 0.494], 1.45],
      edge: [[0.949, 0.984, 0.894], [0.725, 0.871, 0.541], [0.498, 0.698, 0.306], 1.7], soft: [[1, 0.992, 0.965], [0.937, 0.902, 0.824], [0.88, 0.84, 0.76], 1.25] };
    function glow(ops, cx, cy, r, lv, ring) {
      var L = LIGHT[lv] || LIGHT.soft, bg = [1, 0.988, 0.965], outer = r * L[3], steps = 9, i;
      for (i = steps; i >= 1; i--) { var rr = r + (outer - r) * i / steps; ops.push(mix(bg, L[1], 0.55 * (1 - i / steps)).join(' ') + ' rg ' + circ(cx, cy, rr) + ' f'); }
      for (i = 0; i <= 6; i++) { var t = i / 6; ops.push(mix(L[2], L[0], t).join(' ') + ' rg ' + circ(cx + r * 0.12 * t, cy + r * 0.12 * t, r * (1 - 0.72 * t)) + ' f'); }
      if (ring) ops.push(ring.join(' ') + ' RG 1.2 w ' + circ(cx, cy, r) + ' S');
    }
    function lay(z) {
      var ops = [], fits = true;
      function T(t, x, yy, f, size, col, tc) { t = text(t); if (!t) return; ops.push('BT ' + col.join(' ') + ' rg /' + f + ' ' + size.toFixed(2) + ' Tf ' + (tc ? tc + ' Tc ' : '') + x.toFixed(1) + ' ' + yy.toFixed(1) + ' Td (' + escp(t) + ') Tj ET'); }
      function R(x, yy, w, h, fill) { ops.push(fill.join(' ') + ' rg ' + x.toFixed(1) + ' ' + yy.toFixed(1) + ' ' + w.toFixed(1) + ' ' + h.toFixed(1) + ' re f'); }
      function para(t, x, yy, w, f, size, col, lh, bold) { var ls = wrap(text(t), size, bold, w); ls.forEach(function (l, i) { T(l, x, yy - i * size * lh, f, size, col); }); return ls.length * size * lh; }
      function qrAt(url, x, top, size) {
        var mx = null; try { mx = window.GGQR && GGQR.matrix ? GGQR.matrix(url, { ecc: url.length > 700 ? 'L' : '' }) : null; } catch (e) { mx = null; }
        if (!mx) return 0;
        var cnt = mx.length, cell = size / cnt;
        R(x - 4, top - size - 4, size + 8, size + 8, WHITE);
        for (var r = 0; r < cnt; r++) { var run = -1; for (var c = 0; c <= cnt; c++) { var on = c < cnt && mx[r][c]; if (on && run < 0) run = c; if (!on && run >= 0) { ops.push('0 0 0 rg ' + (x + run * cell).toFixed(2) + ' ' + (top - (r + 1) * cell).toFixed(2) + ' ' + ((c - run) * cell + 0.04).toFixed(2) + ' ' + (cell + 0.04).toFixed(2) + ' re f'); run = -1; } } }
        return size;
      }
      // the painting, with its mark and shade baked in
      if (art.hero) ops.push('q ' + PW + ' 0 0 ' + HERO + ' 0 ' + (PH - HERO) + ' cm /Im1 Do Q'); else R(0, PH - HERO, PW, HERO, C);
      var hx = art.hero ? 118 : X0;
      T(n.eyebrow.toUpperCase(), hx, PH - 58, 'F2', 8.5, [1, 0.94, 0.82], 1.6);
      var ts = 30; while (ts > 18 && width(text(n.title), ts, true) > PW - hx - 40) ts -= 1;
      T(n.title, hx, PH - 90, 'F4', ts, WHITE);
      if (n.sub) T(fit(text(n.sub), 11.5, false, PW - hx - 40), hx, PH - 110, 'F1', 11.5, [1, 0.97, 0.9]);
      // the main column
      var y = TOP, s = function (v) { return v * z; };
      // flow: the next lines of text, gap points below the last baseline; y ends on the last line's baseline.
      function flow(t, x, w, f, size, col, lh, gap, bold) { var ls = wrap(text(t), size, bold, w); y -= gap + size; ls.forEach(function (l, i) { T(l, x, y - i * size * lh, f, size, col); }); y -= (ls.length - 1) * size * lh; return ls.length; }
      if (n.lead) flow(n.lead, X0, MW, 'F5', s(13), INK, 1.3, 0);
      if (n.kid) { var k0 = y; flow(n.kid, X0 + 12, MW - 14, 'F2', s(11), INK, 1.35, s(10), true); R(X0, y - s(4), 3, k0 - y - s(6), C); }
      if (n.treeLights && n.treeLights.lights.length) {
        y -= s(26); T(n.treeLights.title, X0, y, 'F4', s(15), C);
        var cw = MW / 3, rr = s(10.5), rowH = s(38);
        n.treeLights.lights.forEach(function (L, i) {
          var cx = X0 + (i % 3) * cw, cy = y - s(10) - rr - Math.floor(i / 3) * rowH;
          glow(ops, cx + rr + 4, cy, rr, L.lv, rgb(L.color, null));
          T(fit(text(L.part), s(10.5), true, cw - rr * 2 - 16), cx + rr * 2 + 14, cy + (L.word ? s(2) : -s(3.5)), 'F2', s(10.5), INK);
          if (L.word) T(fit(text(L.word), s(9), false, cw - rr * 2 - 16), cx + rr * 2 + 14, cy - s(9.5), 'F1', s(9), SOFT);
        });
        y -= s(10) + Math.ceil(n.treeLights.lights.length / 3) * rowH - s(6);
        if (n.treeLights.key) flow(n.treeLights.key, X0, MW, 'F3', s(8.5), SOFT, 1.3, s(2));
      }
      (n.sec || []).forEach(function (sc) {
        if (sc.h) { y -= s(24); T(sc.h, X0, y, 'F4', s(13.5), C); }
        (sc.p || []).forEach(function (t, i) { flow(t, X0, MW, 'F1', s(10), INK, 1.35, s(i ? 5 : 4)); });
        (sc.items || []).forEach(function (it) {
          y -= s(8); var top = y;
          var tagW = it.tag ? width(text(it.tag).toUpperCase(), s(7.5), true) + 10 : 0, nm = fit(text(it.t), s(10.5), true, MW - 14 - tagW);
          y -= s(10.5); T(nm, X0 + 10, y, 'F2', s(10.5), INK);
          if (it.tag) T(text(it.tag).toUpperCase(), X0 + 10 + width(nm, s(10.5), true) + 8, y + s(0.5), 'F2', s(7.5), rgb(it.color, C), 0.8);
          if (it.how) flow(it.how, X0 + 10, MW - 12, 'F1', s(9.5), SOFT, 1.32, s(3));
          if (it.when) flow(it.when, X0 + 10, MW - 12, 'F3', s(9.5), SOFT, 1.32, s(3));
          R(X0, y - s(4), 3, top - y + s(2), rgb(it.color, C));
          y -= s(2);
        });
        (sc.li || []).forEach(function (t) { var t0 = y; flow(t, X0 + 12, MW - 12, 'F1', s(10), INK, 1.35, s(4)); T('\x95', X0 + 2, y + (t0 - y > s(14) ? 0 : 0) + (wrap(text(t), s(10), false, MW - 12).length - 1) * s(10) * 1.35, 'F1', s(10), C); });
      });
      (n.after || []).forEach(function (t) { flow(t, X0, MW, 'F2', s(9.5), INK, 1.32, s(10), true); });
      if (n.close) flow(n.close, X0, MW, 'F5', s(12.5), C, 1.3, s(16));
      if (y < BOT) fits = false;
      // the side column
      var sy = TOP;
      function card(h) { R(SX, sy - h, SIDE, h, CREAM); R(SX, sy - 3, SIDE, 3, C); }
      if (n.home) {
        var H = n.home, qs = Math.min(SIDE - 36, Math.max(118, 132)), lines = [];
        var hh = 16 + 16 + 8 + qs + 10 + (H.code ? 26 : 0) + 6;
        (H.how || []).forEach(function (t, i) { var ls = wrap(text((i + 1) + '. ' + t), 8.5, false, SIDE - 24); lines = lines.concat(ls); });
        var nl = H.note ? wrap(text(H.note), 7.5, false, SIDE - 24) : [];
        hh += lines.length * 11 + (nl.length ? nl.length * 9.5 + 6 : 0) + 8;
        card(hh); var cy0 = sy - 22;
        T(H.title, SX + 12, cy0, 'F4', 14, C); cy0 -= 8;
        qrAt(H.url, SX + (SIDE - qs) / 2, cy0 - 6, qs); cy0 -= qs + 20;
        if (H.code) { var cl = text(H.codeLabel || 'Your code'); T(cl, SX + 12, cy0, 'F1', 8.5, SOFT); T(H.code, SX + 14 + width(cl, 8.5, false), cy0 - 1, 'F2', 15, INK, 1.5); cy0 -= 22; }
        lines.forEach(function (l) { T(l, SX + 12, cy0, 'F1', 8.5, INK); cy0 -= 11; });
        if (nl.length) { cy0 -= 3; nl.forEach(function (l) { T(l, SX + 12, cy0, 'F3', 7.5, SOFT); cy0 -= 9.5; }); }
        sy -= hh + 12;
      } else if (n.homeNote) {
        var hn = wrap(text(n.homeNote.p), 8.5, false, SIDE - 24), hnh = 34 + hn.length * 11 + 6;
        card(hnh); T(n.homeNote.h, SX + 12, sy - 22, 'F4', 14, C); hn.forEach(function (l, i) { T(l, SX + 12, sy - 38 - i * 11, 'F1', 8.5, INK); });
        sy -= hnh + 12;
      }
      if (n.watch) {
        var W = n.watch, wq = 66, wl = wrap(text(W.line), 8.5, false, SIDE - wq - 34), wh = Math.max(wq + 26, 30 + wl.length * 11 + 14);
        card(wh); qrAt(W.url, SX + 14, sy - 14, wq);
        T(W.title, SX + wq + 28, sy - 24, 'F4', 13, C);
        wl.forEach(function (l, i) { T(l, SX + wq + 28, sy - 38 - i * 11, 'F1', 8.5, INK); });
        T(fit(text(W.short), 7.5, false, SIDE - wq - 34), SX + wq + 28, sy - 42 - wl.length * 11, 'F1', 7.5, SOFT);
        sy -= wh + 12;
      }
      if (n.help) {
        var hl = []; (n.help.li || []).forEach(function (t) { hl.push(wrap(text(t), s(8), false, SIDE - 30)); });
        var hh2 = 32 + hl.reduce(function (a, l) { return a + l.length * s(8) * 1.3 + s(3); }, 0) + 6;
        card(hh2); T(n.help.h, SX + 12, sy - 22, 'F4', 13, C);
        var hy = sy - 36; hl.forEach(function (ls) { T('\x95', SX + 12, hy, 'F1', s(8), C); ls.forEach(function (l) { T(l, SX + 20, hy, 'F1', s(8), INK); hy -= s(8) * 1.3; }); hy -= s(3); });
        sy -= hh2;
      }
      if (sy < BOT) fits = false;
      // Who We Are
      R(0, WHO_B, PW, WHO_T - WHO_B, DEEP); R(0, WHO_T - 1, PW, 1, RULE);
      var wx = X0;
      if (art.pics) { ops.push('q ' + circ(X0 + 22, (WHO_T + WHO_B) / 2 + 6, 22) + ' W n 44 0 0 44 ' + X0 + ' ' + ((WHO_T + WHO_B) / 2 - 16) + ' cm /Im2 Do Q'); ops.push('q ' + circ(X0 + 56, (WHO_T + WHO_B) / 2 - 10, 22) + ' W n 44 0 0 44 ' + (X0 + 34) + ' ' + ((WHO_T + WHO_B) / 2 - 32) + ' cm /Im3 Do Q'); ops.push('1 0.988 0.965 RG 2 w ' + circ(X0 + 56, (WHO_T + WHO_B) / 2 - 10, 22) + ' S'); wx = X0 + 96; }
      var who = n.who, wy = WHO_T - 24;
      T(who.h, wx, wy, 'F4', 14, GOLD); wy -= 14;
      wrap(text(who.p), 9, false, XR - wx).forEach(function (l) { T(l, wx, wy, 'F1', 9, INK); wy -= 11.6; });
      T(who.contact, wx, wy - 2, 'F2', 9, GOLD);
      // the footer
      T(fit(text(n.foot || ''), 7.5, false, PW - 80), X0, 36, 'F1', 7.5, [0.45, 0.42, 0.4]);
      return { ops: ops, fits: fits };
    }
    var z = 1, out = lay(z);
    while (!out.fits && z > 0.66) { z -= 0.04; out = lay(z); }
    var body = out.ops.join('\n');
    var objs = [], add = function (o) { objs.push(o); return objs.length; };
    var cat = add(''), pgs = add('');
    var fonts = [['F1', 'Helvetica'], ['F2', 'Helvetica-Bold'], ['F3', 'Helvetica-Oblique'], ['F4', 'Times-Bold'], ['F5', 'Times-Italic']].map(function (f) { return '/' + f[0] + ' ' + add('<< /Type /Font /Subtype /Type1 /BaseFont /' + f[1] + ' /Encoding /WinAnsiEncoding >>') + ' 0 R'; }).join(' ');
    var xo = [];
    [['Im1', art.hero], ['Im2', art.pics && art.pics[0]], ['Im3', art.pics && art.pics[1]]].forEach(function (x) {
      if (!x[1]) return;
      var id = add('<< /Type /XObject /Subtype /Image /Width ' + x[1].w + ' /Height ' + x[1].h + ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + x[1].data.length + ' >>\nstream\n' + x[1].data + '\nendstream');
      xo.push('/' + x[0] + ' ' + id + ' 0 R');
    });
    var cs = add('<< /Length ' + body.length + ' >>\nstream\n' + body + '\nendstream');
    var pg = add('<< /Type /Page /Parent ' + pgs + ' 0 R /MediaBox [0 0 ' + PW + ' ' + PH + '] /Resources << /Font << ' + fonts + ' >>' + (xo.length ? ' /XObject << ' + xo.join(' ') + ' >>' : '') + ' >> /Contents ' + cs + ' 0 R >>');
    objs[cat - 1] = '<< /Type /Catalog /Pages ' + pgs + ' 0 R >>';
    objs[pgs - 1] = '<< /Type /Pages /Kids [' + pg + ' 0 R] /Count 1 >>';
    var info = add('<< /Title (' + escp(text(n.title || 'Take-Home Sheet')) + ') /Creator (Grow With Grounded) >>');
    var pdf = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n', offs = [];
    objs.forEach(function (o, i) { offs.push(pdf.length); pdf += (i + 1) + ' 0 obj\n' + o + '\nendobj\n'; });
    var xr = pdf.length;
    pdf += 'xref\n0 ' + (objs.length + 1) + '\n0000000000 65535 f \n' + offs.map(function (v) { return String(v).padStart(10, '0') + ' 00000 n \n'; }).join('') + 'trailer\n<< /Size ' + (objs.length + 1) + ' /Root ' + cat + ' 0 R /Info ' + info + ' 0 R >>\nstartxref\n' + xr + '\n%%EOF';
    var bytes = new Uint8Array(pdf.length); for (var i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 255;
    var blob = new Blob([bytes], { type: 'application/pdf' }); blob.fitScale = z;
    return blob;
  }

  window.ggPdf = ggPdf;
  window.ggTakeHomePdf = ggTakeHomePdf;
  window.ggPdfImage = ggPdfImage;
  window.ggPdfText = text;
  window.ggSheetBlocks = sheetBlocks;
  window.ggSheetHTML = sheetHTML;
  window.ggPdfFromEl = fromEl;
  window.ggPdfFromHTML = fromHTML;
})();
