/* =====================================================================
   THE IMAGE LIBRARY (shared/gg-image-library.js)   GWG BLD 1027
   Every Grounded painting in one place, for Founders: share cards and promo pieces. Read by image-library.html.
   The list of paintings, shared/imglib/library.js, is GG_IMGLIB = {v, k: {round, folder}, z: 'gzip', iv, ct}: AES-GCM
   256 (base64) of the gzip of JSON {v, made, items: [...]}, locked with the Founder image key. That key is
   HMAC SHA-256(the Founder library's clip key, data.audio.key, 'gg-image-library|v1'), so only the Founder library
   opens it. Two ways in:
     1. The Founder tab in the Field Guide: Image Library opens this page with the key in the address fragment
        (#k=...), which never reaches a server; the page keeps it for this tab only (sessionStorage) and clears the
        fragment at once.
     2. A Founder code: codes.js (shared/lib, then field-guide) gives the Founder library key, lib-founder.js opens,
        and its clip key makes the image key. Staff, Guide, and Supporter codes open the Field Guide and the stories;
        this page asks them kindly for a Founder code.
   Items: site paintings {t, c, r, k, u, v: [[path, w, h], ...]} (largest first; '~/' is shared/heroes/), already
   public, so the page shows them from the site. In the End paintings {t, c: 'book', s, o, k, sz, b: {th, w, f}}:
   each file is at https://audio.growwithgrounded.com/<round>/<folder>/<id>.bin, a 12-byte IV and then the AES-GCM
   ciphertext of the JPEG, unlocked here in the browser.
   Downloads are made here with a canvas: Square 1080 (a center crop), Wide 1600 by 900, and Full Size, all JPEG.
   ===================================================================== */
(function (root) {
  'use strict';
  var R2 = 'https://audio.growwithgrounded.com/', SS = 'gg_imglib_k', PER = 60, ITER = 250000;
  var COLL = [['book', 'In the End'], ['tv', 'Tree Videos'], ['pv', 'Page Videos'], ['gg', 'Get Grounded Now'], ['ls', 'Living Sober'], ['rec', 'Recipes'], ['prac', 'Practice Cards'], ['fit', 'Grounded Fitness'], ['story', 'Grounded Stories'], ['hw', 'Heartwood'], ['app', 'The Grounded Way App'], ['site', 'Site Pages']];
  var CN = {}; COLL.forEach(function (c) { CN[c[0]] = c[1]; });
  var TREES = [['oak', 'Oak'], ['maple', 'Maple'], ['aspen', 'Aspen'], ['pine', 'Pine'], ['birch', 'Birch'], ['sequoia', 'Sequoia'], ['willow', 'Willow'], ['grove', 'The Grove']];
  var TN = {}; TREES.forEach(function (t) { TN[t[0]] = t[1]; });
  var enc = new TextEncoder(), dec = new TextDecoder();
  var S = { key: null, items: [], list: [], shown: 0, c: 'all', r: '', q: '', open: -1, urls: {}, busy: {} };
  var $ = function (q) { return document.querySelector(q); };
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var b64 = function (buf) { var s = ''; new Uint8Array(buf).forEach(function (b) { s += String.fromCharCode(b); }); return btoa(s); };
  var unb64 = function (s) { return Uint8Array.from(atob(s), function (c) { return c.charCodeAt(0); }); };
  var subtle = root.crypto && root.crypto.subtle;
  var ssGet = function () { try { return sessionStorage.getItem(SS) || ''; } catch (e) { return ''; } };
  var ssSet = function (v) { try { if (v) sessionStorage.setItem(SS, v); else sessionStorage.removeItem(SS); } catch (e) {} };
  var today = function () { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  var src = function (p) { return '/' + (p.indexOf('~/') === 0 ? 'shared/heroes/' + p.slice(2) : p); };
  var fmt = function (n) { return Number(n).toLocaleString('en-US'); };

  // ---------------- keys ----------------
  function imageKeyFrom(audioKeyB64) {
    return subtle.importKey('raw', unb64(audioKeyB64), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
      .then(function (k) { return subtle.sign('HMAC', k, enc.encode('gg-image-library|v1')); })
      .then(function (raw) { return b64(raw); });
  }
  function aes(raw) { return subtle.importKey('raw', unb64(raw), { name: 'AES-GCM' }, false, ['decrypt']); }
  function openBox(key, box) { return subtle.decrypt({ name: 'AES-GCM', iv: unb64(box.iv) }, key, unb64(box.ct)); }
  function gunzip(buf) {
    if (!root.DecompressionStream) return Promise.reject(new Error('nogzip'));
    return new Response(new Blob([buf]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  }
  function loadScript(url) { return new Promise(function (ok) { var s = document.createElement('script'); s.src = url; s.onload = function () { ok(true); }; s.onerror = function () { ok(false); }; document.head.appendChild(s); }); }
  function loadLib(name, global) {
    var t = Date.now();
    return loadScript('/shared/lib/' + name + '.js?t=' + t).then(function () { return root[global] ? true : loadScript('/field-guide/' + name + '.js?t=' + t); }).then(function () { return root[global] || null; });
  }
  var tierOf = function (t) { return t === 'own' + 'er' ? 'founder' : t; };
  // A typed code: the same reading as the Field Guide (trimmed, lowercase, NFKC), one PBKDF2, then each sealed entry.
  function fromCode(code) {
    code = String(code || '').trim().toLowerCase();
    if (!code) return Promise.reject(new Error('nomatch'));
    return loadLib('codes', 'GFG_CODES').then(function (C) {
      if (!C || !C.salt || !(C.codes || []).length) throw new Error('nomatch');
      return subtle.importKey('raw', enc.encode(code.normalize('NFKC')), 'PBKDF2', false, ['deriveKey'])
        .then(function (base) { return subtle.deriveKey({ name: 'PBKDF2', salt: unb64(C.salt), iterations: ITER, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']); })
        .then(function (dk) {
          var i = 0, hit = null;
          function next() {
            if (hit || i >= C.codes.length) return Promise.resolve(hit);
            var e = C.codes[i++];
            return openBox(dk, e).then(function (pt) { hit = { r: JSON.parse(dec.decode(pt)), e: e }; return hit; }, next);
          }
          return next();
        });
    }).then(function (hit) {
      if (!hit) throw new Error('nomatch');
      if (hit.e.ends && hit.e.ends < today()) throw new Error('ended');
      if (tierOf(hit.r.tier) !== 'founder') throw new Error('notfounder');
      return loadLib('lib-founder', 'GFG_FOUNDER').then(function (box) {
        if (!box) throw new Error('nolib');
        return aes(hit.r.k).then(function (k) { return openBox(k, box); });
      });
    }).then(function (pt) {
      var lib = JSON.parse(dec.decode(pt));
      if (!lib.audio || typeof lib.audio.key !== 'string') throw new Error('nolib');
      return imageKeyFrom(lib.audio.key);
    });
  }
  function openList(raw) {
    var box = root.GG_IMGLIB; if (!box) return Promise.reject(new Error('nolist'));
    return aes(raw).then(function (k) { S.key = k; return openBox(k, box); })
      .then(function (z) { return box.z === 'gzip' ? gunzip(z) : z; })
      .then(function (buf) { var d = JSON.parse(dec.decode(buf)); S.items = d.items || []; S.made = d.made; ssSet(raw); return d; });
  }

  // ---------------- locked book files ----------------
  function bookUrl(id) {
    if (S.urls[id]) return Promise.resolve(S.urls[id]);
    if (S.busy[id]) return S.busy[id];
    var k = (root.GG_IMGLIB || {}).k || { round: 's1', folder: 'i' };
    S.busy[id] = fetch(R2 + k.round + '/' + k.folder + '/' + id + '.bin', { mode: 'cors' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.arrayBuffer(); })
      .then(function (buf) { var b = new Uint8Array(buf); return subtle.decrypt({ name: 'AES-GCM', iv: b.slice(0, 12) }, S.key, b.slice(12)); })
      .then(function (pt) { var u = URL.createObjectURL(new Blob([pt], { type: 'image/jpeg' })); S.urls[id] = u; delete S.busy[id]; return u; },
        function (e) { delete S.busy[id]; throw e; });
    return S.busy[id];
  }
  var io = root.IntersectionObserver ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return; var img = e.target; io.unobserve(img);
      bookUrl(img.getAttribute('data-bid')).then(function (u) { img.src = u; img.removeAttribute('data-bid'); }, function () { img.alt = 'This painting is resting. Try again soon.'; });
    });
  }, { rootMargin: '400px' }) : null;

  // ---------------- the list ----------------
  function thumbOf(it) {
    var vs = it.v, best = vs[0];
    for (var i = 0; i < vs.length; i++) { var v = vs[i]; if (Math.min(v[1], v[2]) >= 300 && v[1] * v[2] < best[1] * best[2]) best = v; }
    return src(best[0]);
  }
  function hay(it) {
    if (!it._h) it._h = [it.t, CN[it.c], it.r ? TN[it.r] : '', it.s || '', it.k || '', it.u || '', it.v ? it.v.map(function (v) { return v[0]; }).join(' ') : ''].join(' ').toLowerCase();
    return it._h;
  }
  function filter() {
    var words = S.q.toLowerCase().split(/\s+/).filter(Boolean);
    S.list = [];
    for (var i = 0; i < S.items.length; i++) {
      var it = S.items[i];
      if (S.c !== 'all' && it.c !== S.c) continue;
      if (S.r && it.r !== S.r) continue;
      if (words.length) { var h = hay(it), ok = true; for (var j = 0; j < words.length; j++) if (h.indexOf(words[j]) < 0) { ok = false; break; } if (!ok) continue; }
      S.list.push(i);
    }
    S.shown = 0;
  }
  function counts() { var n = { all: S.items.length }; S.items.forEach(function (it) { n[it.c] = (n[it.c] || 0) + 1; }); return n; }
  function tile(i) {
    var it = S.items[i], meta = CN[it.c] + (it.r ? ', ' + TN[it.r] : '');
    var img = it.c === 'book'
      ? '<img alt="" data-bid="' + esc(it.b.th[0]) + '" width="480" height="480">'
      : '<img alt="" loading="lazy" decoding="async" src="' + esc(thumbOf(it)) + '">';
    return '<li><button class="il-tile" data-i="' + i + '" type="button"><span class="il-img">' + img + (it.c === 'book' ? '<span class="il-tag">Private</span>' : '') + '</span><span class="il-t">' + esc(it.t) + '</span><span class="il-m">' + esc(meta) + '</span></button></li>';
  }
  function more() {
    var g = $('#il-grid'); if (!g) return;
    var end = Math.min(S.list.length, S.shown + PER), html = '';
    for (var k = S.shown; k < end; k++) html += tile(S.list[k]);
    g.insertAdjacentHTML('beforeend', html); S.shown = end;
    if (io) g.querySelectorAll('img[data-bid]').forEach(function (img) { if (!img.__o) { img.__o = 1; io.observe(img); } });
    var m = $('#il-more'); if (m) m.hidden = S.shown >= S.list.length;
    var c = $('#il-count'); if (c) c.textContent = S.list.length ? 'Showing ' + fmt(S.shown) + ' of ' + fmt(S.list.length) + (S.list.length === 1 ? ' painting' : ' paintings') : 'No paintings match yet. Try another word or collection.';
  }
  function draw() {
    var trees = {}; S.items.forEach(function (it) { if (it.r && (S.c === 'all' || it.c === S.c)) trees[it.r] = (trees[it.r] || 0) + 1; });
    if (S.r && !trees[S.r]) S.r = '';
    filter();
    var g = $('#il-grid'); g.innerHTML = ''; more();
    document.querySelectorAll('.il-chip').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-c') === S.c)); });
    var sel = $('#il-tree');
    sel.innerHTML = '<option value="">Every Tree</option>' + TREES.filter(function (t) { return trees[t[0]]; }).map(function (t) { return '<option value="' + t[0] + '"' + (S.r === t[0] ? ' selected' : '') + '>' + t[1] + ' (' + fmt(trees[t[0]]) + ')</option>'; }).join('');
    sel.disabled = !Object.keys(trees).length;
  }
  function mountApp() {
    var n = counts(), app = $('#il-app');
    app.innerHTML = '<div class="il-bar">' +
      '<p class="il-intro">Every Grounded painting in one place, ready for share cards and promo pieces. Tap a painting to see it large and download it.</p>' +
      '<div class="il-chips" role="group" aria-label="Collections"><button class="il-chip" type="button" data-c="all">Everything <span>' + fmt(n.all) + '</span></button>' +
      COLL.filter(function (c) { return n[c[0]]; }).map(function (c) { return '<button class="il-chip" type="button" data-c="' + c[0] + '">' + esc(c[1]) + ' <span>' + fmt(n[c[0]]) + '</span></button>'; }).join('') + '</div>' +
      '<div class="il-find"><label class="sr-only" for="il-q">Search</label><input id="il-q" type="search" placeholder="Search by story, tree, topic, or file name" autocomplete="off" spellcheck="false">' +
      '<label class="sr-only" for="il-tree">Tree</label><select id="il-tree"></select></div>' +
      '<p id="il-count" class="il-count" aria-live="polite"></p></div>' +
      '<ul id="il-grid" class="il-grid"></ul><div class="il-more-w"><button id="il-more" class="btn btn-secondary" type="button">Show More</button></div>' +
      '<p class="il-foot">In the End paintings stay private until the book is out. <button class="il-link" type="button" id="il-close">Close the Library on This Device</button></p>';
    $('#il-lock').hidden = true; app.hidden = false;
    var t = null;
    $('#il-q').addEventListener('input', function (e) { clearTimeout(t); var v = e.target.value; t = setTimeout(function () { S.q = v; draw(); }, 180); });
    $('#il-tree').addEventListener('change', function (e) { S.r = e.target.value; draw(); });
    app.addEventListener('click', function (e) {
      var ch = e.target.closest('.il-chip'); if (ch) { S.c = ch.getAttribute('data-c'); draw(); return; }
      var tl = e.target.closest('.il-tile'); if (tl) { preview(+tl.getAttribute('data-i')); return; }
      if (e.target.id === 'il-more') { more(); return; }
      if (e.target.id === 'il-close') { ssSet(''); location.replace(location.pathname); }
    });
    if (io && root.IntersectionObserver) {
      var sent = new IntersectionObserver(function (es) { if (es[0].isIntersecting && S.shown < S.list.length && S.shown >= PER) more(); }, { rootMargin: '600px' });
      sent.observe($('.il-more-w'));
    }
    draw();
  }

  // ---------------- preview and downloads ----------------
  function slug(t) { return String(t).toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'painting'; }
  function fullSrc(it) { return it.c === 'book' ? bookUrl(it.b.f[0]) : Promise.resolve(src(it.v[0][0])); }
  function webSrc(it) { return it.c === 'book' ? bookUrl(it.b.w[0]) : Promise.resolve(src(it.v[0][0])); }
  function loadImg(u) { return new Promise(function (ok, no) { var im = new Image(); im.decoding = 'async'; im.onload = function () { ok(im); }; im.onerror = no; im.src = u; }); }
  // kind: 'sq' Square 1080 (center crop), 'wide' 1600 by 900 (center crop to 16:9), 'full' the painting's own size.
  function render(im, kind) {
    var w = im.naturalWidth, h = im.naturalHeight, sx = 0, sy = 0, sw = w, sh = h, ow = w, oh = h;
    if (kind === 'sq') { var s = Math.min(w, h); sx = (w - s) / 2; sy = (h - s) / 2; sw = sh = s; ow = oh = 1080; }
    if (kind === 'wide') { if (w / h > 16 / 9) { sw = h * 16 / 9; sx = (w - sw) / 2; } else { sh = w * 9 / 16; sy = (h - sh) / 2; } ow = 1600; oh = 900; }
    var c = document.createElement('canvas'); c.width = ow; c.height = oh;
    var x = c.getContext('2d'); x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high';
    x.fillStyle = '#ffffff'; x.fillRect(0, 0, ow, oh);
    x.drawImage(im, sx, sy, sw, sh, 0, 0, ow, oh);
    return new Promise(function (ok) { c.toBlob(function (b) { ok({ blob: b, w: ow, h: oh }); }, 'image/jpeg', 0.92); });
  }
  function download(kind) {
    var it = S.items[S.open]; if (!it) return;
    var msg = $('#il-dl-msg'); msg.textContent = 'Making your file...';
    return fullSrc(it).then(loadImg).then(function (im) { return render(im, kind); }).then(function (r) {
      var name = 'grounded-' + slug(it.t) + (kind === 'sq' ? '-square-1080' : kind === 'wide' ? '-wide-1600x900' : '-full-' + r.w + 'x' + r.h) + '.jpg';
      var a = document.createElement('a'), u = URL.createObjectURL(r.blob); a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(u); }, 60000);
      msg.textContent = 'Saved ' + name + '.';
      S.last = { name: name, w: r.w, h: r.h, bytes: r.blob.size };
    }, function () { msg.textContent = 'This painting is resting. Try again in a moment.'; });
  }
  function preview(i) {
    var it = S.items[i]; if (!it) return; S.open = i; S.back = document.activeElement;
    var d = $('#il-view'), sz = it.c === 'book' ? it.sz : [it.v[0][1], it.v[0][2]];
    var where = it.c === 'book' ? '<p class="il-v-m">' + esc(it.s || '') + '. Kept private until <i>In the End</i> is out.</p>'
      : '<p class="il-v-m">On the site: ' + it.v.map(function (v) { return '<a class="il-path" href="' + esc(src(v[0])) + '" target="_blank" rel="noopener">' + esc(src(v[0]).slice(1)) + '</a> <span>' + v[1] + ' by ' + v[2] + '</span>'; }).join('<br>') + '</p>';
    d.innerHTML = '<div class="il-v-card" role="document"><button class="il-x" type="button" aria-label="Close" data-x>&times;</button>' +
      '<div class="il-v-img"><img id="il-v-im" alt="' + esc(it.t) + '"></div>' +
      '<div class="il-v-txt"><p class="il-v-c">' + esc(CN[it.c]) + (it.r ? ', ' + esc(TN[it.r]) : '') + '</p><h2 id="il-v-t">' + esc(it.t) + '</h2>' +
      '<p class="il-v-m">Full size ' + sz[0] + ' by ' + sz[1] + '.' + (it.u ? ' ' + esc(it.u) + '.' : '') + '</p>' + where +
      '<div class="il-dl" role="group" aria-label="Download"><button class="btn btn-primary" type="button" data-dl="sq">Square 1080</button><button class="btn btn-secondary" type="button" data-dl="wide">Wide 1600 by 900</button><button class="btn btn-secondary" type="button" data-dl="full">Full Size</button></div>' +
      '<p id="il-dl-msg" class="il-dl-msg" aria-live="polite"></p>' +
      '<div class="il-nav"><button class="il-link" type="button" data-step="-1">Previous</button><button class="il-link" type="button" data-step="1">Next</button></div></div></div>';
    d.hidden = false; document.documentElement.classList.add('il-noscroll');
    webSrc(it).then(function (u) { var im = $('#il-v-im'); if (im && S.open === i) im.src = u; });
    var x = d.querySelector('[data-x]'); if (x) x.focus();
  }
  function closeView() { var d = $('#il-view'); d.hidden = true; d.innerHTML = ''; S.open = -1; document.documentElement.classList.remove('il-noscroll'); if (S.back && S.back.focus) S.back.focus(); }
  function step(n) { var at = S.list.indexOf(S.open); if (at < 0) return; var j = S.list[(at + n + S.list.length) % S.list.length]; preview(j); }
  function wireView() {
    var d = $('#il-view');
    d.addEventListener('click', function (e) {
      if (e.target === d || e.target.closest('[data-x]')) return closeView();
      var b = e.target.closest('[data-dl]'); if (b) return download(b.getAttribute('data-dl'));
      var s = e.target.closest('[data-step]'); if (s) return step(+s.getAttribute('data-step'));
    });
    document.addEventListener('keydown', function (e) {
      if (d.hidden) return;
      if (e.key === 'Escape') closeView(); else if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1);
    });
  }

  // ---------------- the lock ----------------
  var MSG = { nomatch: "Let's try that once more.", ended: 'This code has finished its time. A new Founder code opens the library.', notfounder: 'The Image Library opens with a Founder code.', nolib: 'The Founder library is still on its way. Try again in a moment.', nolist: 'The library list is still on its way. Try again in a moment.', nogzip: 'This browser is a little old for the library. The newest Safari, Chrome, or Edge opens it.' };
  function say(t, cls) { var m = $('#il-msg'); if (m) { m.textContent = t; m.className = 'il-msg' + (cls ? ' ' + cls : ''); } }
  function start(raw) { return openList(raw).then(mountApp); }
  function mount() {
    if (!subtle) { say(MSG.nogzip); return; }
    wireView();
    var h = /[#&]k=([A-Za-z0-9+/=_-]+)/.exec(location.hash || ''), raw = h ? decodeURIComponent(h[1]).replace(/-/g, '+').replace(/_/g, '/') : ssGet();
    if (h) try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    if (raw) start(raw).catch(function () { ssSet(''); say('Enter your Founder code to open the library.'); });
    $('#il-form').addEventListener('submit', function (e) {
      e.preventDefault(); var v = $('#il-code').value, b = $('#il-form button'); b.disabled = true; say('Opening...', 'il-try');
      fromCode(v).then(start).then(function () { $('#il-code').value = ''; }, function (err) { say(MSG[err && err.message] || MSG.nomatch); }).then(function () { b.disabled = false; });
    });
  }
  root.GGImageLibrary = { mount: mount, imageKeyFrom: imageKeyFrom, _state: function () { return S; }, _render: render };
})(typeof window !== 'undefined' ? window : this);
