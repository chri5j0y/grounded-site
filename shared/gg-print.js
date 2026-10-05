/* =====================================================================
   GROW WITH GROUNDED PRINTS (shared/gg-print.js)
   Certificates, guide posters, and flyers, made on this device (Learn build, October 2026).
   Each one opens as a print-ready page with a Print or Save as PDF button. Nothing is sent anywhere.
   - GGPrint.certificate(o)     Certificate of Completion, landscape Letter.
                                o: {tree, name, title, body, date, renew, version, id, kind}
                                tree is maple, aspen, oak, sequoia, willow, grove, or house (Grow With Grounded).
   - GGPrint.poster(tree, kind) a guide poster, Letter or 11 by 17 (chosen on the page).
                                kind 'tree': the tree's poster, "A trained Maple Guide serves here."
                                kind 'parts': the six parts teaching poster, in that tree's voice.
   - GGPrint.flyer(tree)        a one-page flyer for anyone to print. tree 'overview' shows every tree.
   Every print carries a small QR code with only a page address on it, never a person's name.
   Wording rule: Certificate of Completion, never "certified." Grow With Grounded is not an accrediting body.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGPrint) return;
  var ROOT = (function () { try { var s = document.currentScript && document.currentScript.src; if (s) return new URL('..', s).href.replace(/\/$/, ''); } catch (e) {} return location.origin; })();
  var SITE = 'https://growwithgrounded.com';
  var esc = function (x) { return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var A = function (p) { return ROOT + p; };
  var PARTS = [['Roots', 'What grounds you', '#5B3A22'], ['Trunk', 'Purpose', '#8B5E1A'], ['Bark', 'Mind and feelings', '#7D6B57'], ['Branches', 'Relationships', '#9A5B34'], ['Leaves', 'Body', '#5F7D48'], ['Fruit', 'Hope', '#C07A26']];

  var T = {
    house: { name: 'Grow With Grounded', color: '#8B5E1A', path: '/', scan: 'Scan to visit Grow With Grounded' },
    maple: { name: 'Maple', color: '#C4501E', ink: '#A14219', path: '/maple/', tag: 'Bright leaves, strong roots.', sub: 'Six parts make a kid whole. Learn to tend them together.', who: 'Built for grades K to 5.', guide: 'Maple Guide',
      points: ['A gentle check-in for kids in grades K to 5, made to do together at home or at school.', 'Kids grow their own tree, practice a little each day, and watch critters come to visit.', 'Grown-ups get When Life Changes: guides for hard talks with kids, from a pet dying to scary news.'],
      parts: { title: 'The Six Parts of My Tree', lead: 'Every kid is growing like a tree. A whole tree needs all six parts.', words: ['Feeling safe, loved, and calm inside. Family, faith, prayer, quiet time, and time outside can help.', 'Knowing you matter, and finding things you love to do and are good at.', 'Naming your feelings and finding ways to calm down.', 'Friends, family, and grown-ups you can count on.', 'Moving, resting, and eating foods that help you grow.', 'Looking forward to good things, and being kind to others.'], close: 'Which part of your tree needs a little care today?' } },
    aspen: { name: 'Aspen', color: '#1F6F74', ink: '#1F6F74', path: '/aspen/', tag: 'Rooted together.', sub: 'Six parts make you whole. Learn to tend them all.', who: 'Built for grades 6 to 8.', guide: 'Aspen Guide',
      points: ['A check-in for grades 6 to 8, with questions written for each grade.', 'Every check-in adds a growth ring and leaves to their tree, and daily tending happens right in Aspen.', 'Done on their own or with a grown-up.', 'Grown-ups get When Life Changes: guides for hard talks with middle schoolers, from group chats to grief.'],
      parts: { title: 'Six Parts Make You Whole', lead: 'Every middle schooler is like an aspen: growing fast and putting down roots.', words: ['What keeps you steady: faith, family traditions, quiet, or time outside.', 'Goals, things you care about, and trying new things.', 'Naming what you feel, calming down, and asking for help.', 'Friends, family, and belonging somewhere.', 'Sleep, movement, real meals, and screen breaks.', "Hope for what's ahead, and the kindness that grows it."], close: 'Notice all six. Tend the one that needs it.' } },
    oak: { name: 'Oak', color: '#3D5A73', ink: '#3D5A73', path: '/oak/', tag: 'Shelter for others. Strength for you.', sub: 'Six parts make you whole. Learn to tend them all.', who: 'Built for adults.', guide: 'Oak Guide',
      points: ['A check-in for the whole person, from root to fruit.', 'A personal growth plan with step-by-step practices.', "When Life Changes: 67 guides for life's hardest seasons."],
      parts: { title: 'Six Parts Make You Whole', lead: 'Being whole means noticing and tending all six.', words: ['Faith, the Sacred, and the practices that steady you.', 'Meaning, calling, and what your life is for.', 'Thoughts and feelings, stress and resilience.', 'Family, friends, and community.', 'Movement, rest, and nourishment.', "Hope, gratitude, and what you're growing toward."], close: 'Shelter for others. Strength for you.' } },
    sequoia: { name: 'Sequoia', color: '#7A2E1C', ink: '#7A2E1C', path: '/sequoia/', tag: 'A long life, still growing.', sub: 'Six parts make you whole. Learn to tend them all.', who: 'Built for older adults, 60 and up.', guide: 'Sequoia Guide',
      points: ['A check-in for the whole person in later life, one question at a time, in larger text.', 'A growth plan with practices that work seated, standing, or in bed.', 'A Legacy Book for the stories and lessons you want to pass on, private until you share a page.', 'When Life Changes: 48 guides for later life, with short videos for you and your helper.'],
      parts: { title: 'Six Parts Make You Whole', lead: 'A long life is still growing in all six parts.', words: ['Faith, the Sacred, and the practices that have carried you.', 'Meaning, legacy, and what your life is for now.', 'Thoughts and feelings, worry and peace.', 'Family, friends, neighbors, and community.', 'Movement, rest, balance, and nourishment.', "Hope, gratitude, and what you're still looking forward to."], close: 'A long life, still growing.' } },
    willow: { name: 'Willow', color: '#5D5A6E', ink: '#5D5A6E', path: '/willow/', tag: 'Held gently, all the way home.', sub: 'A tree for the last part of the path.', who: 'For the person in hospice, and the people who love them.', guide: 'Willow Guide',
      points: ['Built for two: the person in hospice, and the people who love them.', 'Gentle check-ins that ask about faith first, with faith cards for 29 traditions.', 'A page for what matters most, and Cuttings for the stories and letters they want to leave.', 'Helpers open it with their own passcode and see only what the person chooses to share.'],
      parts: { title: 'Six Parts, All the Way Home', lead: 'At the end of life, every part of a person still matters.', words: ['Faith, tradition, and what gives peace.', 'Meaning, legacy, and the story of a life.', 'Feelings, fears, and finding calm.', 'The people who love them, and saying what matters.', 'Comfort, rest, and ease in the body.', 'Hope that changes shape: for comfort, for time together, for peace.'], close: 'Held gently, all the way home.' } },
    grove: { name: 'The Grove', color: '#223829', ink: '#2F5A3C', path: '/grove/', tag: 'Where our trees grow together.', sub: 'Your tree is yours. The grove is ours.', who: 'Built for families, side by side.',
      points: ["The family's shared ground, on one device.", 'Everyone tends their own tree in their own app, and the trees stand side by side here.', 'A family wall to cheer each other on, and practices to do together.'] }
  };
  var ROW = [['maple', 'Maple', 'Grades K to 5'], ['aspen', 'Aspen', 'Grades 6 to 8'], ['pine', 'Pine', 'Grades 9 to 12, coming soon'], ['oak', 'Oak', 'Adults'], ['sequoia', 'Sequoia', '60 and up'], ['willow', 'Willow', 'Hospice'], ['grove', 'The Grove', 'Every age, together']];

  function qr(u, label) {
    try { if (window.GGQR && GGQR.svg) return GGQR.svg(u, { label: label || 'QR code', border: 2 }); } catch (e) {}
    return '';
  }
  function needQR() {
    return new Promise(function (ok) {
      if (window.GGQR && GGQR.svg) return ok();
      var s = document.createElement('script'); s.src = A('/shared/gg-qr.js'); s.onload = s.onerror = function () { ok(); }; document.head.appendChild(s);
    });
  }
  // The new tab opens right away, while the tap still counts, so pop-up blockers let it through.
  function pre() {
    var w = null; try { w = window.open('', '_blank'); } catch (e) { w = null; }
    try { if (w && w.document) w.document.write('<!DOCTYPE html><title>Getting it ready</title><p style="font:16px Georgia,serif;padding:24px;color:#2C1810">Getting it ready...</p>'); } catch (e) {}
    return w;
  }
  function nice(d) { var m = /^(\d{4})-(\d\d)-(\d\d)/.exec(d || ''); if (!m) return ''; var x = new Date(+m[1], +m[2] - 1, +m[3]); return x.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); }
  function short(u) { return u.replace(/^https?:\/\//, '').replace(/\/$/, ''); }

  var BASE = [
    '*{box-sizing:border-box;}html,body{margin:0;}body{background:#E6DFD2;font-family:Barlow,Helvetica,Arial,sans-serif;color:#2C1810;-webkit-print-color-adjust:exact;print-color-adjust:exact;}',
    '.bar{position:sticky;top:0;z-index:5;display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:10px 14px;background:#2E2118;color:#F6EFE2;font-size:15px;}',
    '.bar b{font-family:"Cormorant Garamond",Georgia,serif;font-size:20px;font-weight:600;margin-right:auto;}',
    '.bar button{min-height:44px;padding:8px 16px;border-radius:10px;border:1.5px solid #D9A847;background:transparent;color:#F6EFE2;font:inherit;font-weight:600;cursor:pointer;}',
    '.bar button.pri{background:#D9A847;color:#2E2118;}.bar button[aria-pressed="true"]{background:#F6EFE2;color:#2E2118;border-color:#F6EFE2;}',
    '.tip{padding:8px 14px;font-size:14px;color:#5A4B3F;text-align:center;}',
    '.fit{margin:14px auto 40px;transform-origin:top left;}',
    '.sheet{background:#FFFCF6;position:relative;overflow:hidden;box-shadow:0 2px 14px rgba(44,24,16,.18);}',
    '.serif{font-family:"Cormorant Garamond",Georgia,serif;}.cond{font-family:"Barlow Condensed","Arial Narrow",sans-serif;}',
    '@media print{.bar,.tip{display:none !important;}body{background:none;}.fit{margin:0;transform:none !important;width:auto !important;height:auto !important;}.sheet{box-shadow:none;}}'
  ].join('\n');

  // Opens the print page in a new tab, so there is a preview to check before printing.
  function page(o) {
    var sizes = o.sizes || [o.size], cur = sizes[0];
    var html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + esc(o.title) + '</title>'
      + '<link rel="stylesheet" href="' + A('/fonts/fonts.css') + '"><style id="pg">@page{size:' + cur.page + ';margin:0;}</style><style>' + BASE + '\n' + o.css + '</style></head><body>'
      + '<div class="bar"><b>' + esc(o.title) + '</b>' + (sizes.length > 1 ? sizes.map(function (s, i) { return '<button data-size="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(s.label) + '</button>'; }).join('') : '') + '<button class="pri" id="go">Print or Save as PDF</button></div>'
      + '<div class="tip">To keep a copy, choose Save as PDF in the print window. ' + esc(o.tip || '') + '</div>'
      + '<div class="fit" id="fit"><div class="sheet ' + (cur.cls || '') + '" id="sheet" style="width:' + cur.w + 'in;height:' + cur.h + 'in">' + o.body + '</div></div>'
      + '<script>(function(){var S=' + JSON.stringify(sizes) + ',sh=document.getElementById("sheet"),fit=document.getElementById("fit");'
      + 'function scale(){var w=sh.offsetWidth,h=sh.offsetHeight,k=Math.min(1,(window.innerWidth-28)/w);fit.style.width=w+"px";fit.style.height=(h*k)+"px";fit.style.transform="scale("+k+")";fit.style.marginLeft=Math.max(14,(window.innerWidth-w*k)/2)+"px";}'
      + 'document.querySelectorAll("[data-size]").forEach(function(b){b.onclick=function(){var s=S[+b.getAttribute("data-size")];document.getElementById("pg").textContent="@page{size:"+s.page+";margin:0;}";sh.style.width=s.w+"in";sh.style.height=s.h+"in";sh.className="sheet "+(s.cls||"");document.querySelectorAll("[data-size]").forEach(function(x){x.setAttribute("aria-pressed",x===b?"true":"false");});scale();};});'
      + 'document.getElementById("go").onclick=function(){window.print();};window.addEventListener("resize",scale);scale();'
      + 'if(document.fonts&&document.fonts.ready)document.fonts.ready.then(scale);'
      + 'var n=document.querySelector("[data-fitname]");if(n){var f=parseFloat(getComputedStyle(n).fontSize);while(n.scrollWidth>n.clientWidth&&f>14){f-=1;n.style.fontSize=f+"px";}}'
      + '})();<\/script></body></html>';
    var w = o.win && !o.win.closed ? o.win : null;
    if (!w) { try { w = window.open('', '_blank'); } catch (e) { w = null; } }
    if (w && w.document) { w.document.open(); w.document.write(html); w.document.close(); try { w.focus(); } catch (e) {} return w; }
    // A blocked pop-up: print from a hidden frame instead.
    var f = document.createElement('iframe'); f.setAttribute('aria-hidden', 'true'); f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
    document.body.appendChild(f); f.contentDocument.open(); f.contentDocument.write(html); f.contentDocument.close();
    setTimeout(function () { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) {} setTimeout(function () { f.remove(); }, 60000); }, 900);
    return null;
  }
  var LETTER = { label: 'Letter', page: '8.5in 11in', w: 8.5, h: 11, cls: 'k1' };
  var TABLOID = { label: '11 by 17', page: '11in 17in', w: 11, h: 17, cls: 'k2' };

  /* ---------------- certificate ---------------- */
  function certificate(o) {
    var win = pre();
    return needQR().then(function () {
      var t = T[o.tree] || T.house, house = !T[o.tree] || o.tree === 'house', u = SITE + t.path;
      var mark = house ? '<img class="c-logo-big" src="' + A('/favicon.svg') + '" alt="">' : '<img class="c-mark" src="' + A('/shared/marks/' + o.tree + '.svg') + '" alt="">';
      var meta = [o.date ? 'Completed ' + nice(o.date) : '', o.renew ? 'Renew by ' + nice(o.renew) : '', o.version ? 'Version ' + o.version : '', o.id ? 'Certificate ' + o.id : ''].filter(Boolean);
      var body = '<div class="c-frame" style="--c:' + t.color + '"><div class="c-in">'
        + (house ? '' : '<div class="c-house"><img src="' + A('/favicon.svg') + '" alt=""><span class="cond">GROW WITH GROUNDED</span></div>')
        + '<div style="flex:.5"></div>' + mark
        + '<div class="c-title serif">Certificate of Completion</div>'
        + '<div class="c-small">This recognizes that</div>'
        + '<div class="c-name serif" data-fitname>' + esc(o.name) + '</div>'
        + '<div class="c-small">has completed</div>'
        + '<div class="c-what serif">' + esc(o.title) + '</div>'
        + (o.body ? '<div class="c-body">' + esc(o.body) + '</div>' : '')
        + (meta.length ? '<div class="c-meta">' + meta.map(function (m) { return '<span>' + esc(m) + '</span>'; }).join('') + '</div>' : '')
        + '<div class="c-foot"><div class="c-signs"><div><i></i><span>Kayti Joy, Co-Founder</span></div><div><i></i><span>Chris Joy, Co-Founder</span></div></div>'
        + '<div class="c-qr">' + qr(u, t.scan || ('Scan to learn about ' + t.name)) + '<div><b>' + esc(t.scan || ('Scan to learn about ' + t.name)) + '</b><span>' + esc(short(u)) + '</span></div></div></div>'
        + '<div class="c-tm">' + (house ? 'Grow With Grounded&trade;' : esc(t.name) + '&trade; by Grow With Grounded&trade;') + '. A record of completed Grow With Grounded training, separate from any license or professional credential.</div>'
        + '</div></div>';
      var css = [
        '.c-frame{position:absolute;inset:0.32in;border:3pt double var(--c);}',
        '.c-in{position:absolute;inset:0.12in;border:0.75pt solid var(--c);display:flex;flex-direction:column;align-items:center;text-align:center;padding:0.32in 0.6in 0.2in;}',
        '.c-house{display:flex;align-items:center;gap:8px;}.c-house img{width:0.32in;height:auto;}.c-house span{letter-spacing:3px;font-weight:600;font-size:11pt;color:#8B5E1A;}',
        '.c-mark{width:0.95in;height:0.95in;border-radius:0.2in;}.c-logo-big{width:0.95in;height:auto;}',
        '.c-title{font-size:38pt;font-weight:600;color:var(--c);line-height:1;margin-top:0.12in;}',
        '.c-small{font-size:11.5pt;color:#6B5A4D;margin-top:0.1in;letter-spacing:.3px;}',
        '.c-name{font-size:40pt;font-style:italic;font-weight:600;line-height:1.05;margin-top:0.04in;padding:0 0.3in 0.04in;border-bottom:0.75pt solid var(--c);max-width:7.6in;white-space:nowrap;overflow:hidden;}',
        '.c-what{font-size:24pt;font-weight:600;line-height:1.1;margin-top:0.04in;max-width:8.4in;}',
        '.c-body{font-size:11.5pt;line-height:1.4;color:#4A3B30;max-width:7.2in;margin-top:0.08in;}',
        '.c-meta{display:flex;gap:0.3in;justify-content:center;flex-wrap:wrap;font-size:10.5pt;color:#6B5A4D;margin-top:0.1in;}',
        '.c-foot{margin-top:auto;width:100%;display:flex;align-items:flex-end;justify-content:space-between;gap:0.4in;}',
        '.c-signs{display:flex;gap:0.4in;}.c-signs div{display:flex;flex-direction:column;align-items:flex-start;width:2.5in;}.c-signs i{display:block;width:100%;border-bottom:0.75pt solid #2C1810;height:0.42in;}.c-signs span{font-size:9.5pt;color:#4A3B30;margin-top:4px;text-align:left;}',
        '.c-qr{display:flex;align-items:center;gap:0.1in;text-align:left;}.c-qr svg{width:0.85in;height:0.85in;}.c-qr b{display:block;font-size:9.5pt;max-width:1.4in;line-height:1.25;}.c-qr span{display:block;font-size:8.5pt;color:#6B5A4D;margin-top:2px;}',
        '.c-tm{font-size:7.5pt;color:#7A6A5D;margin-top:0.1in;}'
      ].join('\n');
      return page({ win: win, title: 'Certificate of Completion', size: { label: 'Letter', page: '11in 8.5in', w: 11, h: 8.5 }, body: body, css: css, tip: 'Print in landscape on card stock to frame it.' });
    });
  }

  /* ---------------- posters and flyers (shared pieces, sized for Letter, scaled for 11 by 17) ---------------- */
  var SCALE = [
    '.k1{--k:1;}.k2{--k:1.294;}',
    '.top{position:relative;}.top img.hero{display:block;width:100%;height:auto;}',
    '.pad{padding:calc(0.5in * var(--k)) calc(0.6in * var(--k)) 0;}',
    '.id{display:flex;align-items:center;gap:calc(14px * var(--k));}.id img{width:calc(0.9in * var(--k));height:calc(0.9in * var(--k));border-radius:calc(0.18in * var(--k));}',
    '.nm{font-size:calc(52pt * var(--k));font-weight:600;line-height:.95;color:var(--c);}.nm sup{font-size:.32em;vertical-align:top;position:relative;top:.25em;}',
    '.by{font-size:calc(10.5pt * var(--k));letter-spacing:3px;font-weight:600;color:#6B5A4D;margin-top:calc(4px * var(--k));}',
    '.tag{font-size:calc(27pt * var(--k));font-style:italic;font-weight:500;line-height:1.1;margin-top:calc(0.2in * var(--k));}',
    '.sub{font-size:calc(13pt * var(--k));line-height:1.4;color:#4A3B30;margin-top:calc(0.08in * var(--k));}',
    '.parts{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(8px * var(--k)) calc(14px * var(--k));margin-top:calc(0.22in * var(--k));}',
    '.parts div{border-top:calc(4px * var(--k)) solid var(--p);padding-top:calc(5px * var(--k));}.parts b{display:block;font-size:calc(15pt * var(--k));font-family:"Cormorant Garamond",Georgia,serif;color:var(--p);}.parts span{font-size:calc(10pt * var(--k));color:#4A3B30;}',
    '.grow{flex:0;}.pad{flex:1;display:flex;flex-direction:column;justify-content:space-evenly;padding-bottom:calc(0.2in * var(--k));}.pad>*{margin-top:0 !important;}',
    '.k2 .top img.hero{height:6.2in;object-fit:cover;}',
    '.foot{display:flex;align-items:center;justify-content:space-between;gap:calc(0.3in * var(--k));padding:calc(0.25in * var(--k)) calc(0.6in * var(--k));border-top:1px solid #E3D8C4;margin-top:calc(0.2in * var(--k));}',
    '.qr{display:flex;align-items:center;gap:calc(0.14in * var(--k));}.qr svg{width:calc(1.15in * var(--k));height:calc(1.15in * var(--k));}.qr b{display:block;font-size:calc(13pt * var(--k));}.qr span{display:block;font-size:calc(10pt * var(--k));color:#6B5A4D;margin-top:2px;}',
    '.house{display:flex;align-items:center;gap:8px;text-align:right;}.house img{width:calc(0.4in * var(--k));height:auto;}.house span{font-size:calc(9pt * var(--k));color:#6B5A4D;line-height:1.35;}.house b{display:block;font-size:calc(10pt * var(--k));letter-spacing:2px;color:#8B5E1A;font-family:"Barlow Condensed","Arial Narrow",sans-serif;}',
    '.sheet{display:flex;flex-direction:column;}'
  ].join('\n');
  function partsStrip() { return '<div class="parts">' + PARTS.map(function (p) { return '<div style="--p:' + p[2] + '"><b>' + p[0] + '</b><span>' + p[1] + '</span></div>'; }).join('') + '</div>'; }
  function footer(t, label, extra, to) {
    var u = to || SITE + t.path;
    return '<div class="foot"><div class="qr">' + qr(u, label) + '<div><b>' + esc(label) + '</b><span>' + esc(short(u)) + '</span></div></div>'
      + '<div class="house"><span><b>GROW WITH GROUNDED</b>' + (extra || 'growwithgrounded.com') + '</span><img src="' + A('/favicon.svg') + '" alt=""></div></div>';
  }
  function head(tr, t) {
    return '<div class="id"><img src="' + A('/shared/marks/' + tr + '.svg') + '" alt=""><div><div class="nm serif" style="--c:' + t.color + '">' + esc(t.name) + '<sup>&trade;</sup></div><div class="by cond">BY GROW WITH GROUNDED</div></div></div>';
  }

  function poster(tr, kind) {
    var t = T[tr]; if (!t || !t.guide) return Promise.resolve(null);
    var win = pre();
    return needQR().then(function () {
      var body, css;
      if (kind === 'parts') {
        var P = t.parts;
        body = '<div class="band" style="background:' + t.color + '"><div class="id"><img src="' + A('/shared/marks/' + tr + '.svg') + '" alt=""><div><div class="pt serif">' + esc(P.title) + '</div><div class="by cond" style="color:rgba(255,248,236,.85)">' + esc(t.name.toUpperCase()) + ' BY GROW WITH GROUNDED</div></div></div><p class="lead">' + esc(P.lead) + '</p></div>'
          + '<div class="six">' + PARTS.map(function (p, i) { return '<div class="sx" style="--p:' + p[2] + '"><b class="serif">' + p[0] + '</b><span>' + p[1] + '</span><p>' + esc(P.words[i]) + '</p></div>'; }).join('') + '</div>'
          + '<div class="grow"></div><p class="close serif">' + esc(P.close) + '</p>'
          + footer(t, 'Scan to learn about ' + t.name);
        css = SCALE + '\n.band{padding:calc(0.5in * var(--k)) calc(0.6in * var(--k)) calc(0.4in * var(--k));color:#FFF8EC;}.band .id img{background:#fff;}'
          + '.pt{font-size:calc(34pt * var(--k));font-weight:600;line-height:1.02;}.lead{font-size:calc(14pt * var(--k));line-height:1.4;margin:calc(0.2in * var(--k)) 0 0;color:#FFF8EC;}'
          + '.six{flex:1;display:grid;grid-template-columns:1fr 1fr;align-content:space-evenly;gap:calc(0.18in * var(--k)) calc(0.3in * var(--k));padding:calc(0.3in * var(--k)) calc(0.6in * var(--k));}'
          + '.sx{border-left:calc(6px * var(--k)) solid var(--p);padding:calc(2px * var(--k)) 0 calc(2px * var(--k)) calc(0.16in * var(--k));}'
          + '.sx b{display:block;font-size:calc(26pt * var(--k));font-weight:600;color:var(--p);line-height:1;}.sx span{display:block;font-size:calc(11.5pt * var(--k));font-weight:600;margin-top:calc(3px * var(--k));}'
          + '.sx p{font-size:calc(12pt * var(--k));line-height:1.4;color:#4A3B30;margin:calc(5px * var(--k)) 0 0;}'
          + '.close{text-align:center;font-size:calc(22pt * var(--k));font-style:italic;font-weight:500;color:' + t.ink + ';margin:0 calc(0.6in * var(--k)) calc(0.1in * var(--k));}';
        return page({ win: win, title: t.name + ' Six Parts Poster', sizes: [LETTER, TABLOID], body: body, css: css, tip: 'Pick Letter or 11 by 17 above.' });
      }
      body = '<div class="top"><img class="hero" src="' + A('/shared/heroes/' + tr + '-narrow.svg') + '" alt=""></div>'
        + '<div class="pad"><div>' + head(tr, t) + '<div class="tag serif">' + esc(t.tag) + '</div><div class="sub">' + esc(t.sub) + '<br>' + esc(t.who) + '</div></div>'
        + '<div class="here" style="--c:' + t.color + '"><span class="serif">A trained ' + esc(t.guide) + ' serves here.</span><small>Ask about ' + esc(t.name) + ', and how the six parts of a tree can help.</small></div>'
        + partsStrip() + '</div><div class="grow"></div>' + footer(t, 'Scan to learn about ' + t.name);
      css = SCALE + '\n.here{margin-top:calc(0.26in * var(--k));background:#F6EEDB;border-left:calc(7px * var(--k)) solid var(--c);padding:calc(0.16in * var(--k)) calc(0.2in * var(--k));}'
        + '.here span{display:block;font-size:calc(22pt * var(--k));font-weight:600;color:var(--c);line-height:1.1;}.here small{display:block;font-size:calc(11pt * var(--k));color:#4A3B30;margin-top:calc(4px * var(--k));}';
      return page({ win: win, title: t.name + ' Poster', sizes: [LETTER, TABLOID], body: body, css: css, tip: 'Pick Letter or 11 by 17 above.' });
    });
  }

  function flyer(tr) {
    var win = pre();
    return needQR().then(function () {
      var body, css;
      if (tr === 'overview' || !T[tr]) {
        var t = T.house;
        body = '<div class="ov-top"><img src="' + A('/favicon.svg') + '" alt=""><div><div class="ov-nm serif">Grow With Grounded<sup>&trade;</sup></div><div class="ov-tag serif">Tending the whole person, every age and stage, through every threshold.</div></div></div>'
          + '<div class="pad"><p class="ov-lead">Every person is like a tree, made of six parts that make a whole. Our tools help people notice all six and tend the ones that need it, from first breath to last.</p>'
          + '<div class="ov-row">' + ROW.map(function (x) { return '<div><img src="' + A('/shared/marks/' + x[0] + '.svg') + '" alt=""><b class="serif">' + x[1] + '</b><span>' + x[2] + '</span></div>'; }).join('') + '</div>'
          + partsStrip()
          + '<ul class="ov-pts"><li><b>Check-ins</b> for every age, with a growth plan and daily practices.</li><li><b>When Life Changes:</b> guides for the conversations nobody plans for, written for every age.</li><li><b>Private by design:</b> no account, and answers stay on your device.</li><li><b>For professionals:</b> the Grounded Field Guide, with training for chaplains, teachers, and caregivers.</li></ul></div>'
          + '<div class="grow"></div>' + footer(t, 'Scan to see every tree', 'In crisis? Call or text 988, any time.', SITE + '/tools.html');
        css = SCALE + '\n.ov-top{display:flex;align-items:center;gap:0.25in;background:#8B5E1A;color:#FFF8EC;padding:0.45in 0.6in;}.ov-top img{width:0.9in;height:auto;filter:brightness(0) invert(1);}'
          + '.ov-nm{font-size:38pt;font-weight:600;line-height:1;}.ov-nm sup{font-size:.35em;vertical-align:top;position:relative;top:.3em;}.ov-tag{font-size:16pt;font-style:italic;margin-top:6px;color:#FBEBD0;}'
          + '.ov-lead{font-size:13pt;line-height:1.45;margin:0;}'
          + '.ov-row{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-top:0.25in;text-align:center;}.ov-row img{width:100%;max-width:0.85in;border-radius:0.16in;}.ov-row b{display:block;font-size:14pt;font-weight:600;margin-top:3px;}.ov-row span{display:block;font-size:8.5pt;color:#6B5A4D;line-height:1.2;}'
          + '.ov-pts{margin:0.25in 0 0;padding-left:1.1em;font-size:12pt;line-height:1.45;}.ov-pts li{margin-bottom:6px;}';
        return page({ win: win, title: 'Grow With Grounded Flyer', size: LETTER, body: body, css: css, tip: 'Letter size, ready for any bulletin board.' });
      }
      var x = T[tr];
      body = '<div class="top"><img class="hero" src="' + A('/shared/heroes/' + tr + '-narrow.svg') + '" alt=""></div>'
        + '<div class="pad"><div>' + head(tr, x) + '<div class="tag serif">' + esc(x.tag) + '</div><div class="sub">' + esc(x.sub) + '<br>' + esc(x.who) + '</div></div>'
        + '<ul class="pts">' + x.points.map(function (p) { return '<li style="--c:' + x.color + '">' + esc(p) + '</li>'; }).join('') + '<li style="--c:' + x.color + '">Private by design: no account, and answers stay on your device.</li></ul>'
        + partsStrip() + '</div><div class="grow"></div>' + footer(x, 'Scan to begin with ' + x.name, 'In crisis? Call or text 988, any time.');
      css = SCALE + '\n.pts{list-style:none;margin:calc(0.2in * var(--k)) 0 0;padding:0;}.pts li{position:relative;padding-left:0.24in;font-size:12.5pt;line-height:1.4;margin-bottom:6px;}'
        + '.pts li:before{content:"";position:absolute;left:0;top:0.42em;width:9px;height:9px;border-radius:50%;background:var(--c);}';
      return page({ win: win, title: x.name + ' Flyer', size: LETTER, body: body, css: css, tip: 'Letter size, ready for any bulletin board.' });
    });
  }

  window.GGPrint = { certificate: certificate, poster: poster, flyer: flyer, trees: T };
})();
