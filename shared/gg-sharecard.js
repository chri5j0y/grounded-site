/* =====================================================================
   LIVING SOBER SHARE CARDS (shared/gg-sharecard.js)   GWG BLD 837, October 2026
   One branded picture for every Living Sober share: a mantra, today's encouragement, a weekly or monthly
   reflection, a milestone star, a word for Someone I Love, or a video.

   GGShareCard.share({kind, head, text, star, count, url, name})
     kind   'mantra' | 'daily' | 'weekly' | 'monthly' | 'milestone' | 'video' | 'love'
     head   a short title (optional)
     text   the words
     star   'gold' | 'silver' | 'bronze' | null   (milestones)
     count  '18 years' | '4 months' | '12 days' | null   (milestones; the date itself never shows)
     url    the link to share (defaults to growwithgrounded.com/living-sober; videos pass the page link with an anchor)
     name   optional; a milestone can carry a name the person adds in the window
   It opens a small window with the card. Share sends the picture with the phone's share sheet (navigator.share with
   files) when the device supports it; otherwise Save Image and Copy Link. A milestone offers "Add a Name".
   GGShareCard.render(opts) resolves to the 1080 by 1350 canvas; GGShareCard.blob(opts) to a PNG Blob.

   Branding on every card: the Grounded logo (shared/marks/grounded-logo.svg), Grow With Grounded, a Living Sober tag,
   growwithgrounded.com/living-sober, Living Sober green #4E7D6A with gold, the site fonts, and Living Sober's own
   painting (the tree by the stream, cut 4:5 from the tall version, shared/heroes/living-sober-card.webp, BLD 839) as the texture. Nothing personal leaves the device unless the person shares it.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGShareCard) return;
  var HOME = /(^|\.)growwithgrounded\.com$|^localhost$|^127\.0\.0\.1$/.test(location.hostname) ? '' : 'https://growwithgrounded.com';
  var PAGE = 'https://growwithgrounded.com/living-sober';
  var W = 1080, H = 1350;
  var GREEN = '#4E7D6A', GOLD = '#D9A847', CREAM = '#F6EEDB';
  var LABEL = { mantra: 'Mantra', daily: 'Today’s Encouragement', weekly: 'This Week', monthly: 'Monthly Check-in', milestone: 'A Milestone', love: 'For Someone I Love', video: 'Watch' };
  var STARS = {
    gold: ['#FFF4C4', '#EBC05A', '#A8741A', '#7A5212'],
    silver: ['#FFFFFF', '#D3DADF', '#8A979F', '#5E6A72'],
    bronze: ['#FFE0BE', '#CB8749', '#86501F', '#5E3612']
  };
  var esc = function (x) { return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  /* ---------- assets: fonts, logo, painting (loaded once) ---------- */
  var FONTS = [
    ['GGS Serif', 'cormorant-garamond-latin-700-normal', '700', 'normal'],
    ['GGS Serif', 'cormorant-garamond-latin-600-normal', '600', 'normal'],
    ['GGS Serif', 'cormorant-garamond-latin-600-italic', '600', 'italic'],
    ['GGS Sans', 'barlow-latin-500-normal', '500', 'normal'],
    ['GGS Sans', 'barlow-latin-600-normal', '600', 'normal'],
    ['GGS Cond', 'barlow-condensed-latin-600-normal', '600', 'normal'],
    ['GGS Cond', 'barlow-condensed-latin-700-normal', '700', 'normal']
  ];
  var ASSETS = null;
  function img(src) { return new Promise(function (ok) { var i = new Image(); i.decoding = 'async'; i.onload = function () { ok(i); }; i.onerror = function () { ok(null); }; i.src = src; }); }
  function assets() {
    if (ASSETS) return ASSETS;
    var fonts = Promise.all(FONTS.map(function (f) {
      try {
        var ff = new FontFace(f[0], 'url(' + HOME + '/fonts/' + f[1] + '.woff2)', { weight: f[2], style: f[3] });
        return ff.load().then(function (x) { document.fonts.add(x); }, function () {});
      } catch (e) { return Promise.resolve(); }
    }));
    var logo = fetch(HOME + '/shared/marks/grounded-logo.svg?v=b788').then(function (r) { return r.ok ? r.text() : ''; }).then(function (t) {
      var m = /<symbol id="icon" viewBox="([^"]+)"[^>]*>([\s\S]*?)<\/symbol>/.exec(t || ''); if (!m) return null;
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + m[1] + '" width="640" height="707" color="' + CREAM + '">' + m[2] + '</svg>';
      return img('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg));
    }).catch(function () { return null; });
    var paint = img(HOME + '/shared/heroes/living-sober-card.webp?v=b839');
    ASSETS = Promise.all([fonts, logo, paint]).then(function (r) { return { logo: r[1], paint: r[2] }; });
    return ASSETS;
  }

  /* ---------- drawing helpers ---------- */
  function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function spaced(c, s, x, y, sp) { // centered text with letter spacing
    if ('letterSpacing' in c) { c.letterSpacing = sp + 'px'; var w0 = c.measureText(s).width - sp; c.textAlign = 'left'; c.fillText(s, x - w0 / 2, y); c.letterSpacing = '0px'; c.textAlign = 'center'; return w0; }
    var chars = s.split(''), w = chars.reduce(function (a, ch) { return a + c.measureText(ch).width; }, 0) + sp * (chars.length - 1), at = x - w / 2;
    c.textAlign = 'left'; chars.forEach(function (ch) { c.fillText(ch, at, y); at += c.measureText(ch).width + sp; }); c.textAlign = 'center'; return w;
  }
  function wrap(c, text, maxW) {
    var out = [];
    String(text || '').split(/\n/).forEach(function (para) {
      var words = para.split(/\s+/).filter(Boolean), line = '';
      words.forEach(function (w) {
        var t = line ? line + ' ' + w : w;
        if (c.measureText(t).width <= maxW || !line) line = t; else { out.push(line); line = w; }
      });
      if (line) out.push(line);
    });
    return out;
  }
  // Fit text in a box: the largest size from start down to min where the wrapped lines fit maxW and maxH.
  function fit(c, text, font, start, min, maxW, maxH, lh) {
    for (var s = start; s >= min; s -= 2) {
      c.font = font(s); var L = wrap(c, text, maxW);
      var tooWide = L.some(function (x) { return c.measureText(x).width > maxW; });
      if (!tooWide && L.length * s * lh <= maxH) {
        // balance the lines (like text-wrap: balance): the narrowest width that keeps the same number of lines
        if (L.length > 1) { var lo = maxW * .5, hi = maxW; while (hi - lo > 4) { var mid = (lo + hi) / 2, M = wrap(c, text, mid); if (M.length === L.length && !M.some(function (x) { return c.measureText(x).width > mid; })) hi = mid; else lo = mid; } L = wrap(c, text, hi); }
        return { size: s, lines: L, h: L.length * s * lh, lh: s * lh, font: font(s) };
      }
    }
    c.font = font(min); var L2 = wrap(c, text, maxW), max = Math.max(1, Math.floor(maxH / (min * lh)));
    if (L2.length > max) { L2 = L2.slice(0, max); L2[max - 1] = L2[max - 1].replace(/[\s,.;:]*\S*$/, '') + '…'; }
    return { size: min, lines: L2, h: L2.length * min * lh, lh: min * lh, font: font(min) };
  }
  function drawLines(c, f, y, color) { c.font = f.font; c.fillStyle = color; f.lines.forEach(function (l, i) { c.fillText(l, W / 2, y + f.lh * (i + .78)); }); }
  function starPath(c, cx, cy, r, ri) {
    c.beginPath();
    for (var i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? ri : r; c[i ? 'lineTo' : 'moveTo'](cx + q * Math.cos(a), cy + q * Math.sin(a)); }
    c.closePath();
  }
  function bigStar(c, cx, cy, r, tier) {
    var T = STARS[tier] || STARS.gold;
    // glow
    var g = c.createRadialGradient(cx, cy, r * .2, cx, cy, r * 1.9); g.addColorStop(0, 'rgba(255,236,170,.42)'); g.addColorStop(1, 'rgba(255,236,170,0)');
    c.fillStyle = g; c.beginPath(); c.arc(cx, cy, r * 1.9, 0, Math.PI * 2); c.fill();
    // ribbon tails
    c.save();
    [[-1, T[2]], [1, T[3]]].forEach(function (s) {
      c.beginPath(); var bx = cx + s[0] * r * .28, by = cy + r * .35;
      c.moveTo(bx - r * .2, by); c.lineTo(bx + r * .2, by); c.lineTo(bx + s[0] * r * .42 + r * .2, cy + r * 1.55); c.lineTo(bx + s[0] * r * .42, cy + r * 1.36); c.lineTo(bx + s[0] * r * .42 - r * .2, cy + r * 1.55); c.closePath();
      var rg = c.createLinearGradient(bx, by, bx, cy + r * 1.55); rg.addColorStop(0, GREEN); rg.addColorStop(1, '#2F5244');
      c.fillStyle = rg; c.fill(); c.lineWidth = 3; c.strokeStyle = s[1]; c.stroke();
    });
    c.restore();
    // star
    starPath(c, cx, cy, r, r * .43);
    var sg = c.createRadialGradient(cx - r * .2, cy - r * .3, r * .05, cx, cy, r * 1.05);
    sg.addColorStop(0, T[0]); sg.addColorStop(.5, T[1]); sg.addColorStop(1, T[2]);
    c.save(); c.shadowColor = 'rgba(0,0,0,.45)'; c.shadowBlur = 24; c.shadowOffsetY = 8; c.fillStyle = sg; c.fill(); c.restore();
    c.lineWidth = 4; c.lineJoin = 'round'; c.strokeStyle = T[3]; c.stroke();
    // facets
    c.save(); c.globalAlpha = .28; c.strokeStyle = '#FFFFFF'; c.lineWidth = 2;
    for (var i = 0; i < 5; i++) { var a = -Math.PI / 2 + i * 2 * Math.PI / 5; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + r * .92 * Math.cos(a), cy + r * .92 * Math.sin(a)); c.stroke(); }
    c.restore();
  }
  function smallStar(c, cx, cy, r) {
    starPath(c, cx, cy, r, r * .43);
    var g = c.createLinearGradient(cx, cy - r, cx, cy + r); g.addColorStop(0, '#FFE9A8'); g.addColorStop(1, '#C8923A');
    c.fillStyle = g; c.fill();
  }
  function playMark(c, cx, cy, r) {
    c.save(); c.shadowColor = 'rgba(0,0,0,.4)'; c.shadowBlur = 20;
    c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.fillStyle = 'rgba(246,238,219,.14)'; c.fill(); c.restore();
    c.lineWidth = 5; c.strokeStyle = GOLD; c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.stroke();
    c.beginPath(); c.moveTo(cx - r * .3, cy - r * .42); c.lineTo(cx + r * .45, cy); c.lineTo(cx - r * .3, cy + r * .42); c.closePath(); c.fillStyle = GOLD; c.fill();
  }
  function titleCount(s) { return String(s || '').replace(/\b([a-z])/g, function (m) { return m.toUpperCase(); }); }

  /* ---------- the card ---------- */
  function draw(c, A, o) {
    var kind = LABEL[o.kind] ? o.kind : 'daily';
    // the painting, cover fit, then the Living Sober green
    c.fillStyle = '#1F3A30'; c.fillRect(0, 0, W, H);
    if (A.paint) {
      var p = A.paint, s = Math.max(W / p.width, H / p.height), pw = p.width * s, ph = p.height * s;
      c.drawImage(p, (W - pw) * .62, (H - ph) / 2, pw, ph);
    }
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, 'rgba(22,40,33,.40)'); g.addColorStop(.28, 'rgba(36,66,55,.30)'); g.addColorStop(.62, 'rgba(30,56,46,.48)'); g.addColorStop(1, 'rgba(16,30,24,.85)');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    c.save(); c.globalCompositeOperation = 'soft-light'; c.fillStyle = GREEN; c.globalAlpha = .22; c.fillRect(0, 0, W, H); c.restore();
    var vg = c.createRadialGradient(W / 2, H * .5, H * .25, W / 2, H * .5, H * .78); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.28)');
    c.fillStyle = vg; c.fillRect(0, 0, W, H);
    // the gold frame
    c.lineWidth = 2.5; c.strokeStyle = 'rgba(217,168,71,.85)'; rr(c, 38, 38, W - 76, H - 76, 30); c.stroke();
    c.lineWidth = 1; c.strokeStyle = 'rgba(217,168,71,.38)'; rr(c, 50, 50, W - 100, H - 100, 22); c.stroke();
    c.textAlign = 'center'; c.textBaseline = 'alphabetic';
    // the logo and the name
    if (A.logo) { var lh = 96, lw = lh * (A.logo.width / A.logo.height || .905); c.save(); c.shadowColor = 'rgba(0,0,0,.35)'; c.shadowBlur = 12; c.drawImage(A.logo, W / 2 - lw / 2, 92, lw, lh); c.restore(); }
    c.fillStyle = CREAM; c.font = '600 30px "GGS Cond", "Barlow Condensed", sans-serif'; spaced(c, 'GROW WITH GROUNDED', W / 2, 238, 7);
    // the Living Sober tag
    c.font = '700 25px "GGS Cond", "Barlow Condensed", sans-serif';
    var tagW = (('letterSpacing' in c) ? (c.letterSpacing = '5px', c.measureText('LIVING SOBER').width) : c.measureText('LIVING SOBER').width + 55) + 78;
    if ('letterSpacing' in c) c.letterSpacing = '0px';
    var tx = W / 2 - tagW / 2, ty = 266;
    rr(c, tx, ty, tagW, 48, 24); c.fillStyle = 'rgba(217,168,71,.95)'; c.fill();
    smallStar(c, tx + 30, ty + 24, 12); c.fillStyle = '#1F3A30';
    c.font = '700 25px "GGS Cond", "Barlow Condensed", sans-serif'; spaced(c, 'LIVING SOBER', W / 2 + 14, ty + 33, 5);
    // the content, centered in its zone
    var Z0 = 360, Z1 = 1130, MW = 820, blocks = [];
    var serif = function (w, it) { return function (s) { return (it ? 'italic ' : '') + w + ' ' + s + 'px "GGS Serif", "Cormorant Garamond", Georgia, serif'; }; };
    var label = (LABEL[kind] || '').toUpperCase();
    blocks.push({ h: 44, draw: function (y) { c.fillStyle = GOLD; c.font = '700 32px "GGS Cond", "Barlow Condensed", sans-serif'; spaced(c, label, W / 2, y + 32, 6); } });
    blocks.push({ h: 34, draw: function (y) { c.fillStyle = 'rgba(217,168,71,.8)'; c.fillRect(W / 2 - 40, y + 14, 80, 2.5); } });
    if (kind === 'milestone') {
      var SB = { h: 330, draw: function (y) { var r = Math.min(112, SB.h * .34); bigStar(c, W / 2, y + SB.h * .42, r, o.star || 'gold'); } };
      blocks.push(SB);
      if (o.count) {
        // The number in Barlow Condensed (lining figures read clearly), the word in the serif: "18 Years".
        var cm = /^\s*(\d[\d,]*)\s*(.*)$/.exec(String(o.count)), num = cm ? cm[1] : '', unit = titleCount(cm ? cm[2] : o.count);
        blocks.push({ h: 150, draw: function (y) {
          var nfnt = '700 150px "GGS Cond", "Barlow Condensed", sans-serif', ufnt = '700 104px "GGS Serif", "Cormorant Garamond", Georgia, serif';
          c.font = nfnt; var nw = num ? c.measureText(num).width : 0; c.font = ufnt; var uw = c.measureText(unit).width, gap = num ? 26 : 0, x0 = W / 2 - (nw + gap + uw) / 2;
          c.save(); c.shadowColor = 'rgba(0,0,0,.45)'; c.shadowBlur = 16; c.fillStyle = '#FFFFFF'; c.textAlign = 'left';
          if (num) { c.font = nfnt; c.fillText(num, x0, y + 128); }
          c.font = ufnt; c.fillText(unit, x0 + nw + gap, y + 128); c.restore(); c.textAlign = 'center';
        } });
      }
      if (o.name) { var nf = fit(c, o.name, serif('600', true), 54, 36, MW, 70, 1.1); blocks.push({ h: nf.h + 10, draw: function (y) { drawLines(c, nf, y + 4, '#F3D58C'); } }); }
      if (o.head) { var hf = fit(c, o.head, serif('700'), 56, 38, MW, 140, 1.16); blocks.push({ h: hf.h + 18, draw: function (y) { drawLines(c, hf, y + 14, CREAM); } }); }
      if (o.text) { var mf = fit(c, o.text, serif('600'), 40, 28, MW, 150, 1.3); blocks.push({ h: mf.h + 14, draw: function (y) { drawLines(c, mf, y + 12, 'rgba(246,238,219,.92)'); } }); }
    } else if (kind === 'mantra') {
      var qf = fit(c, o.text || o.head || '', serif('600', true), 104, 54, MW - 40, 470, 1.12);
      blocks.push({ h: 96, draw: function (y) { c.fillStyle = GOLD; c.font = '700 150px "GGS Serif", Georgia, serif'; c.fillText('“', W / 2, y + 120); } });
      blocks.push({ h: qf.h + 10, draw: function (y) { c.save(); c.shadowColor = 'rgba(0,0,0,.45)'; c.shadowBlur = 18; drawLines(c, qf, y, '#FFFFFF'); c.restore(); } });
      if (o.head && o.text) { var mh = fit(c, o.head, serif('600'), 40, 30, MW, 100, 1.2); blocks.push({ h: mh.h + 24, draw: function (y) { drawLines(c, mh, y + 22, 'rgba(246,238,219,.85)'); } }); }
    } else {
      if (kind === 'video') blocks.push({ h: 190, draw: function (y) { playMark(c, W / 2, y + 90, 70); } });
      var room = kind === 'video' ? 520 : 690;
      if (o.head) { var vh = fit(c, o.head, serif('700'), 76, 46, MW, 220, 1.08); room -= vh.h + 26; blocks.push({ h: vh.h + 26, draw: function (y) { c.save(); c.shadowColor = 'rgba(0,0,0,.4)'; c.shadowBlur = 14; drawLines(c, vh, y, '#FFFFFF'); c.restore(); } }); }
      if (o.text) {
        var big = !o.head && kind !== 'video';
        var tf = fit(c, o.text, serif(big ? '600' : '600'), big ? 70 : 50, 32, MW, Math.max(160, room), big ? 1.2 : 1.3);
        blocks.push({ h: tf.h, draw: function (y) { c.save(); c.shadowColor = 'rgba(0,0,0,.4)'; c.shadowBlur = 12; drawLines(c, tf, y, big ? '#FFFFFF' : 'rgba(246,238,219,.95)'); c.restore(); } });
      }
    }
    var total = blocks.reduce(function (a, b) { return a + b.h; }, 0);
    if (kind === 'milestone' && total > Z1 - Z0) { var cut = Math.min(SB.h - 210, total - (Z1 - Z0)); SB.h -= cut; total -= cut; }
    var y = Z0 + Math.max(0, (Z1 - Z0 - total) / 2);
    blocks.forEach(function (b) { b.draw(y); y += b.h; });
    // the address
    c.fillStyle = 'rgba(217,168,71,.8)'; c.fillRect(W / 2 - 150, 1190, 300, 2);
    c.fillStyle = CREAM; c.font = '600 31px "GGS Cond", "Barlow Condensed", sans-serif'; spaced(c, 'GROWWITHGROUNDED.COM/LIVING-SOBER', W / 2, 1246, 3.2);
    c.fillStyle = 'rgba(246,238,219,.7)'; c.font = '500 22px "GGS Sans", Barlow, sans-serif'; c.fillText('Grow With Grounded™', W / 2, 1284);
  }
  function render(o) {
    o = o || {};
    return assets().then(function (A) {
      var cv = document.createElement('canvas'); cv.width = W; cv.height = H;
      draw(cv.getContext('2d'), A, o);
      return cv;
    });
  }
  function blob(o) { return render(o).then(function (cv) { return new Promise(function (ok, no) { try { cv.toBlob(function (b) { b ? ok(b) : no(new Error('no image')); }, 'image/png'); } catch (e) { no(e); } }); }); }

  /* ---------- the share window ---------- */
  function css() {
    if (document.getElementById('ggsc-css')) return;
    var s = document.createElement('style'); s.id = 'ggsc-css';
    var dark = '.ggsc-box{background:#241F19;color:#F3EDE3;border-color:#3A322A}.ggsc-msg,.ggsc-hint{color:#C2B6A4}.ggsc-btn{background:#2E2820;color:#F3EDE3;border-color:#4A4036}.ggsc-btn.pri{background:#D9A847;color:#1F1A14;border-color:#D9A847}.ggsc-name input{background:#1F1A14;color:#F3EDE3;border-color:#4A4036}.ggsc-link{color:#D9A847}';
    var scope = function (pre) { return dark.split('}').filter(function (r) { return r.indexOf('{') > 0; }).map(function (r) { var i = r.indexOf('{'); return r.slice(0, i).split(',').map(function (x) { return pre + ' ' + x; }).join(',') + r.slice(i) + '}'; }).join(''); };
    s.textContent = '.ggsc{position:fixed;inset:0;z-index:10050;background:rgba(18,24,20,.62);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:max(16px,env(safe-area-inset-top,0px)) 12px 24px;font-family:Barlow,system-ui,sans-serif}'
      + '.ggsc-box{background:#FAF7F2;color:#2C1810;border:1px solid #E2D8C3;border-radius:18px;box-shadow:0 20px 50px rgba(0,0,0,.3);width:min(460px,100%);padding:18px 18px 16px;margin:auto 0;box-sizing:border-box}'
      + '.ggsc-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 0 10px}.ggsc-top b{font-family:"Cormorant Garamond",Georgia,serif;font-size:24px;line-height:1.15}'
      + '.ggsc-x{font:inherit;font-size:15px;font-weight:600;background:none;border:none;color:inherit;cursor:pointer;padding:8px 4px;min-height:44px}'
      + '.ggsc-pic{display:block;width:100%;max-height:min(58vh,560px);object-fit:contain;border-radius:12px;background:#1F3A30;aspect-ratio:4/5}'
      + '.ggsc-wait{display:grid;place-items:center;color:#F6EEDB;font-size:15px}'
      + '.ggsc-name{display:flex;flex-direction:column;gap:4px;margin:12px 0 0;font-size:15px;font-weight:600}.ggsc-name input{font:inherit;font-weight:400;font-size:17px;padding:10px 12px;border:1px solid #E2D8C3;border-radius:10px;background:#fff;color:#2C1810;min-height:44px;box-sizing:border-box}'
      + '.ggsc-acts{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 0}.ggsc-btn{flex:1 1 auto;font:inherit;font-weight:600;font-size:16px;min-height:46px;padding:10px 16px;border-radius:999px;border:1px solid #E2D8C3;background:#fff;color:#2C1810;cursor:pointer;text-align:center;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box}'
      + '.ggsc-btn.pri{background:#4E7D6A;border-color:#4E7D6A;color:#fff}.ggsc-btn:focus-visible,.ggsc-x:focus-visible{outline:3px solid #D9A847;outline-offset:2px}'
      + '.ggsc-msg{min-height:1.4em;margin:10px 0 0;font-size:15px;color:#6B5A4D;overflow-wrap:anywhere}.ggsc-hint{margin:6px 0 0;font-size:14px;color:#6B5A4D}.ggsc-link{color:#8B5E1A;font-weight:600}'
      + '@media (prefers-color-scheme: dark){' + scope(':root:not([data-theme="light"])') + '}' + scope(':root[data-theme="dark"]');
    document.head.appendChild(s);
  }
  var OPEN = null;
  function close() {
    if (!OPEN) return; var o = OPEN; OPEN = null;
    document.removeEventListener('keydown', o.key, true);
    if (o.url) try { URL.revokeObjectURL(o.url); } catch (e) {}
    o.root.remove(); document.body.style.overflow = o.overflow || '';
    if (o.from && o.from.focus) try { o.from.focus({ preventScroll: true }); } catch (e) {}
  }
  function fileName(o) { return 'grounded-living-sober-' + (o.kind || 'card') + '.png'; }
  function shareText(o) {
    var t = o.kind === 'milestone' ? [o.count ? titleCount(o.count) + ' Living Sober.' : '', o.head || ''].filter(Boolean).join(' ')
      : o.kind === 'video' ? (o.head ? 'Watch: ' + o.head : 'Watch this.') : (o.text || o.head || '');
    return (t ? t + '\n' : '') + (o.url || PAGE);
  }
  function canFiles(f) { try { return !!(navigator.share && navigator.canShare && navigator.canShare({ files: [f] })); } catch (e) { return false; } }
  function share(opts) {
    css(); close();
    var o = {}; for (var k in (opts || {})) o[k] = opts[k]; o.url = o.url || PAGE;
    var from = document.activeElement;
    var root = document.createElement('div'); root.className = 'ggsc'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'Share a picture');
    root.innerHTML = '<div class="ggsc-box"><div class="ggsc-top"><b>Share This</b><button type="button" class="ggsc-x" data-sc="close">Close</button></div>'
      + '<div class="ggsc-pic ggsc-wait" aria-hidden="true">Making your picture…</div>'
      + (o.kind === 'milestone' ? '<label class="ggsc-name">Add a Name (optional)<input type="text" maxlength="40" autocomplete="off" data-sc="name" value="' + esc(o.name || '') + '" placeholder="Your first name"></label><p class="ggsc-hint">Only the star and the count show. Your date stays private.</p>' : '')
      + '<div class="ggsc-acts"></div><p class="ggsc-msg" role="status" aria-live="polite"></p></div>';
    document.body.appendChild(root);
    OPEN = { root: root, from: from, overflow: document.body.style.overflow, o: o, file: null, url: '' };
    document.body.style.overflow = 'hidden';
    var me = OPEN, msg = root.querySelector('.ggsc-msg'), acts = root.querySelector('.ggsc-acts');
    me.key = function (e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key === 'Tab') { var f = Array.prototype.filter.call(root.querySelectorAll('button,a[href],input'), function (x) { return x.offsetParent !== null; }); if (!f.length) return; var a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
    };
    document.addEventListener('keydown', me.key, true);
    function paint() {
      return blob(o).then(function (b) {
        if (OPEN !== me) return;
        me.file = null; try { me.file = new File([b], fileName(o), { type: 'image/png' }); } catch (e) { me.file = null; }
        if (me.url) try { URL.revokeObjectURL(me.url); } catch (e) {}
        me.url = URL.createObjectURL(b);
        var old = root.querySelector('.ggsc-pic'), pic = document.createElement('img');
        pic.className = 'ggsc-pic'; pic.src = me.url; pic.alt = 'A Living Sober picture from Grow With Grounded' + (o.kind === 'milestone' && o.count ? ': ' + titleCount(o.count) : o.text ? ': ' + o.text : '');
        old.replaceWith(pic);
        var files = me.file && canFiles(me.file);
        acts.innerHTML = (files ? '<button type="button" class="ggsc-btn pri" data-sc="share">Share</button>' : '')
          + '<a class="ggsc-btn' + (files ? '' : ' pri') + '" data-sc="save" href="' + me.url + '" download="' + fileName(o) + '">Save Image</a>'
          + '<button type="button" class="ggsc-btn" data-sc="copy">Copy Link</button>'
          + (!files && navigator.share ? '<button type="button" class="ggsc-btn" data-sc="link">Share Link</button>' : '');
        if (!files) msg.innerHTML = 'Save the picture, then add it to any message or post. On a phone, you can also press and hold the picture to save it.';
      }, function () {
        if (OPEN !== me) return;
        var old = root.querySelector('.ggsc-pic'); if (old) old.textContent = 'The picture could not be made here.';
        acts.innerHTML = '<button type="button" class="ggsc-btn pri" data-sc="copy">Copy Link</button>' + (navigator.share ? '<button type="button" class="ggsc-btn" data-sc="link">Share Link</button>' : '');
      });
    }
    var tmr = 0;
    root.addEventListener('input', function (e) { if (e.target.getAttribute('data-sc') === 'name') { o.name = e.target.value.trim(); clearTimeout(tmr); tmr = setTimeout(paint, 350); } });
    root.addEventListener('click', function (e) {
      if (e.target === root) { close(); return; }
      var b = e.target.closest('[data-sc]'); if (!b) return;
      var a = b.getAttribute('data-sc');
      if (a === 'close') close();
      else if (a === 'share' && me.file) {
        navigator.share({ files: [me.file], title: 'Living Sober | Grow With Grounded', text: shareText(o) }).then(function () { msg.textContent = 'Shared. Thank you for passing it on.'; }, function (err) { if (!err || err.name !== 'AbortError') msg.textContent = 'Sharing did not open. Save Image works too.'; });
      } else if (a === 'link') {
        navigator.share({ title: 'Living Sober | Grow With Grounded', text: shareText(o).replace(/\n?[^\n]*$/, ''), url: o.url }).then(function () { msg.textContent = 'Shared. Thank you for passing it on.'; }, function () {});
      } else if (a === 'copy') {
        var shown = function () { msg.innerHTML = 'Copy this link to share it: <span class="ggsc-link">' + esc(o.url) + '</span>'; };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(o.url).then(function () { msg.textContent = 'Link copied. Paste it anywhere to share it.'; }, shown); else shown();
      } else if (a === 'save') { setTimeout(function () { msg.textContent = 'Saved. Add it to any message or post.'; }, 300); }
    });
    paint();
    var x = root.querySelector('[data-sc="close"]'); if (x) try { x.focus({ preventScroll: true }); } catch (e) {}
    return me;
  }
  window.GGShareCard = { share: share, render: render, blob: blob, close: close, page: PAGE, version: 'b837' };
})();
