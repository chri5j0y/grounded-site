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

  window.ggPdf = ggPdf;
  window.ggPdfText = text;
  window.ggSheetBlocks = sheetBlocks;
  window.ggSheetHTML = sheetHTML;
  window.ggPdfFromEl = fromEl;
  window.ggPdfFromHTML = fromHTML;
})();
