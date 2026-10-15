/* Grow With Grounded: a print sheet as a Word file (GWG BLD 810).
   GGDocx.make(html, {title}) turns any print sheet's HTML into a .docx Blob, made on the device with nothing uploaded.
   Word, Pages, and Google Docs (drop it into Drive) open it as an editable document. Headings stay headings, the
   officiant script keeps its spoken paragraphs, cues, and // pause marks, and each printed page starts a new page.
   The layout is compact (14 point spoken words, small cues) so a service fits fewer pages. */
(function () {
  'use strict';
  if (window.GGDocx) return;
  var BLOCK = /^(H[1-6]|P|LI|BLOCKQUOTE|TR|PRE|DIV|SECTION|ARTICLE|UL|OL|TABLE|TBODY|THEAD|HEADER|FOOTER|FIGURE|DL|DT|DD)$/;
  var LEAF = /^(H[1-6]|P|LI|BLOCKQUOTE|TR|PRE|DT|DD)$/;
  var PAGE = /(^|\s)(fw-pg|ht-page|cd-sheet|pl-print)(\s|$)/;
  var x = function (t) { return String(t).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  var has = function (el, c) { return !!(el.classList && el.classList.contains(c)); };
  function isBlockEl(n) { return n.nodeType === 1 && BLOCK.test(n.tagName); }
  function hasBlock(el) { for (var c = el.firstElementChild; c; c = c.nextElementSibling) { if (isBlockEl(c) || hasBlock(c)) return true; } return false; }

  // How each kind of line looks: [size in points, bold, italic, color, align, left indent in inches, space after in points, style id]
  function look(el, tag) {
    var L = { sz: 12, b: false, i: false, c: '', al: '', ind: 0, af: 6, st: '', line: 276 };
    if (tag === 'H1') { L.sz = 20; L.b = true; L.af = 4; L.st = 'Heading1'; }
    else if (tag === 'H2') { L.sz = 15; L.b = true; L.af = 4; L.st = 'Heading2'; }
    else if (/^H[3-6]$/.test(tag)) { L.sz = 13; L.b = true; L.af = 3; L.st = 'Heading3'; }
    else if (tag === 'LI') { L.ind = 0.3; L.af = 3; }
    if (has(el, 'ms-s')) { L.sz = 14; L.af = 7; L.line = 300; }
    if (has(el, 'ms-a')) { L.sz = 14; L.i = true; L.ind = 0.4; L.af = 6; L.line = 300; }
    if (has(el, 'ms-c') || has(el, 'ms-n')) { L.sz = 10; L.i = true; L.c = '6B6155'; L.af = 3; }
    if (has(el, 'ms-part') || has(el, 'eyebrow') || has(el, 'pr-head') || has(el, 'ht-head')) { L.sz = 9; L.c = '6B6155'; L.af = 4; }
    if (has(el, 'pr-foot') || has(el, 'ht-tm') || has(el, 'muted') || has(el, 'fw-sub')) { L.sz = 9; L.i = has(el, 'pr-foot'); L.c = '6B6155'; }
    for (var a = el; a && a.nodeType === 1; a = a.parentNode) {
      var ta = a.style && a.style.textAlign; if (ta) { L.al = ta === 'center' ? 'center' : ta === 'right' ? 'right' : ''; break; }
      if (has(a, 'mso') || has(a, 'pr-cert')) { L.al = 'center'; break; }
    }
    return L;
  }
  // Inline runs inside one line: bold, italic, small, line breaks, and the gold // pause mark.
  function runs(node, f, out) {
    for (var c = node.firstChild; c; c = c.nextSibling) {
      if (c.nodeType === 3) { var t = c.nodeValue.replace(/\s+/g, ' '); if (t) out.push({ t: t, b: f.b, i: f.i, c: f.c, sz: f.sz }); continue; }
      if (c.nodeType !== 1) continue;
      var tg = c.tagName;
      if (/^(SCRIPT|STYLE|SVG|IMG|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(tg)) continue;
      if (tg === 'BR') { out.push({ br: true }); continue; }
      var g = { b: f.b || tg === 'B' || tg === 'STRONG' || has(c, 'ms-pz'), i: f.i || tg === 'I' || tg === 'EM', c: has(c, 'ms-pz') ? 'A8823A' : f.c, sz: has(c, 'ms-pz') ? Math.max(9, f.sz - 2) : tg === 'SMALL' ? Math.max(8, f.sz - 2) : f.sz };
      if (tg === 'TD' || tg === 'TH') { if (out.length && !out[out.length - 1].br) out.push({ t: '   ', b: false, i: false, c: '', sz: f.sz }); }
      runs(c, g, out);
    }
    return out;
  }
  function trim(R) {
    while (R.length && (R[0].br || !R[0].t.trim())) { if (R[0].br) R.shift(); else if (!R[0].t.trim()) R.shift(); else break; }
    if (R.length && R[0].t) R[0].t = R[0].t.replace(/^\s+/, '');
    while (R.length && (R[R.length - 1].br || !String(R[R.length - 1].t).trim())) R.pop();
    if (R.length && R[R.length - 1].t) R[R.length - 1].t = R[R.length - 1].t.replace(/\s+$/, '');
    return R;
  }
  function para(L, R, brk) {
    R = trim(R); if (!R.length && !brk) return '';
    var pp = '<w:pPr>' + (L.st ? '<w:pStyle w:val="' + L.st + '"/>' : '') + (L.st ? '<w:keepNext/>' : '') + (brk ? '<w:pageBreakBefore/>' : '')
      + '<w:spacing w:before="' + (L.st ? (L.st === 'Heading1' ? 0 : 200) : 0) + '" w:after="' + Math.round(L.af * 20) + '" w:line="' + L.line + '" w:lineRule="auto"/>'
      + (L.ind ? '<w:ind w:left="' + Math.round(L.ind * 1440) + '"' + (L.li ? ' w:hanging="216"' : '') + '/>' : '') + (L.al ? '<w:jc w:val="' + L.al + '"/>' : '') + '</w:pPr>';
    return '<w:p>' + pp + R.map(function (r) {
      if (r.br) return '<w:r><w:br/></w:r>';
      return '<w:r><w:rPr>' + (r.b ? '<w:b/>' : '') + (r.i ? '<w:i/>' : '') + (r.c ? '<w:color w:val="' + r.c + '"/>' : '') + '<w:sz w:val="' + Math.round(r.sz * 2) + '"/><w:szCs w:val="' + Math.round(r.sz * 2) + '"/></w:rPr><w:t xml:space="preserve">' + x(r.t) + '</w:t></w:r>';
    }).join('') + '</w:p>';
  }
  function body(root) {
    var out = [], st = { pages: 0, brk: false };
    function line(el, tag) {
      var L = look(el, tag), R = runs(el, { b: L.b, i: L.i, c: L.c, sz: L.sz }, []);
      if (tag === 'LI') { L.li = true; R.unshift({ t: '•  ', b: false, i: false, c: L.c, sz: L.sz }); }
      var p = para(L, R, st.brk); if (p) { out.push(p); st.brk = false; }
    }
    function walk(el) {
      var pend = [];
      var flush = function () { if (!pend.length) return; var L = look(el, 'P'); var R = []; pend.forEach(function (n) { var w = el.ownerDocument.createElement('span'); w.appendChild(n.cloneNode(true)); runs(w, { b: L.b, i: L.i, c: L.c, sz: L.sz }, R); }); var p = para(L, R, st.brk); if (p) { out.push(p); st.brk = false; } pend = []; };
      for (var c = el.firstChild; c; c = c.nextSibling) {
        if (c.nodeType === 1 && /^(SCRIPT|STYLE|SVG|IMG|BUTTON|INPUT|SELECT|TEXTAREA|HR)$/.test(c.tagName)) continue;
        if (!isBlockEl(c)) { if (c.nodeType === 3 || c.nodeType === 1) pend.push(c); continue; }
        flush();
        if (PAGE.test(c.className || '') || /break-before:\s*page/.test(c.getAttribute('style') || '')) { if (st.pages++ || out.length) st.brk = true; }
        if (has(c, 'pr-head') || has(c, 'ht-head')) { var r = c.querySelector('.r'); var L0 = look(c, 'P'); var tx = r ? Array.prototype.map.call(r.childNodes, function (n) { return n.nodeType === 3 ? n.nodeValue.trim() : ''; }).filter(Boolean).join(': ') : c.textContent.trim(); var p0 = para(L0, [{ t: tx, sz: L0.sz, c: L0.c }], st.brk); if (p0) { out.push(p0); st.brk = false; } continue; }
        if (LEAF.test(c.tagName) || !hasBlock(c)) line(c, c.tagName === 'DIV' || c.tagName === 'SECTION' ? 'P' : c.tagName);
        else walk(c);
      }
      flush();
    }
    walk(root);
    return out.join('');
  }
  var STYLES = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
    + '<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Georgia" w:hAnsi="Georgia" w:cs="Georgia" w:eastAsia="Georgia"/><w:color w:val="2C1810"/><w:sz w:val="24"/><w:szCs w:val="24"/><w:lang w:val="en-US"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>'
    + '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>'
    + [['Heading1', 'heading 1', 40], ['Heading2', 'heading 2', 30], ['Heading3', 'heading 3', 26]].map(function (h, i) { return '<w:style w:type="paragraph" w:styleId="' + h[0] + '"><w:name w:val="' + h[1] + '"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:outlineLvl w:val="' + i + '"/></w:pPr><w:rPr><w:b/><w:sz w:val="' + h[2] + '"/><w:szCs w:val="' + h[2] + '"/></w:rPr></w:style>'; }).join('')
    + '</w:styles>';
  function docXml(inner) {
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>'
      + (inner || '<w:p/>') + '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1080" w:right="1080" w:bottom="1080" w:left="1080" w:header="576" w:footer="576" w:gutter="0"/></w:sectPr></w:body></w:document>';
  }
  // A plain (stored) zip, which is all a .docx needs.
  var CRC = (function () { var t = [], c, n, k; for (n = 0; n < 256; n++) { c = n; for (k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  function crc(b) { var c = 0xFFFFFFFF; for (var i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
  function zip(files) {
    var enc = new TextEncoder(), parts = [], cen = [], off = 0;
    var u16 = function (v) { return [v & 255, (v >>> 8) & 255]; }, u32 = function (v) { return [v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255]; };
    files.forEach(function (f) {
      var name = enc.encode(f[0]), data = enc.encode(f[1]), c = crc(data);
      var head = [].concat(u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(0), u16(0x21), u32(c), u32(data.length), u32(data.length), u16(name.length), u16(0));
      parts.push(new Uint8Array(head), name, data);
      cen.push(new Uint8Array([].concat(u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(0), u16(0x21), u32(c), u32(data.length), u32(data.length), u16(name.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(off))), name);
      off += head.length + name.length + data.length;
    });
    var size = cen.reduce(function (a, b) { return a + b.length; }, 0);
    var end = new Uint8Array([].concat(u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length), u32(size), u32(off), u16(0)));
    return new Blob(parts.concat(cen, [end]), { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  }
  function make(html, o) {
    o = o || {};
    var d = new DOMParser().parseFromString('<!DOCTYPE html><body>' + html + '</body>', 'text/html');
    Array.prototype.forEach.call(d.querySelectorAll('style,script,svg,img,button,input,select,textarea,.no-print'), function (n) { n.remove(); });
    var inner = body(d.body);
    var now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
    return zip([
      ['[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>'],
      ['_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>'],
      ['docProps/core.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>' + x(o.title || 'Grow With Grounded') + '</dc:title><dc:creator>Grow With Grounded</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">' + now + '</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">' + now + '</dcterms:modified></cp:coreProperties>'],
      ['word/_rels/document.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'],
      ['word/styles.xml', STYLES],
      ['word/document.xml', docXml(inner)]
    ]);
  }
  window.GGDocx = { make: make, version: 'b810' };
})();
