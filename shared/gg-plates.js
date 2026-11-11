/* =====================================================================
   SHARE MY PLATE (shared/gg-plates.js)   GWG BLD 967, November 2026
   Chris (November 11, 2026): "if i like a meal i made i can share the guide, and a personal pic personal review", then "1yes!"
   (keep them with the recipe) and "1" (family notes in the Family Kitchen).
   After cooking, a person adds a photo from their phone and a few words (and, if they like, 1 to 5 stars). Grounded makes one
   picture card (the photo, the recipe's name, their words, a small Grounded mark) and opens the phone's share sheet with the card
   and the recipe's link. The photo is never sent to Grounded.
   Each note stays with the recipe in the person's own locked profile (GGP.data(id, 'plates')): the words in the profile, the photo
   (made small) in this browser's own database, locked with a key that lives in the profile. A note marked For the Family travels
   to the Household through the locked shared space "plates" (shared/gg-sync.js; Home registers GGPlates.space), with the person's
   first name, and shows on the recipe for everyone there.
   GGPlates.compose(recipe)          recipe {id, name, url}: opens Share My Plate
   GGPlates.share(recipe)            the share sheet with the recipe's link
   GGPlates.section(el, recipe)      draws the recipe's plates (mine and the family's) into el
   GGPlates.space                    {get, put} for GGSync.space('plates', ...)
   GGPlates.config({poke})           poke(): called after a family note changes, so Home can sync
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGPlates) return;
  var CFG = { poke: null }, DB = null, PHOTO_W = 480, CARD_W = 1080, CARD_H = 1350, MAX_WORDS = 280;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function arr(x) { return Array.isArray(x) ? x : []; }
  function P() { return window.GGP && GGP.active ? GGP.active() : null; }
  function first(n) { return String(n || '').trim().split(/\s+/)[0] || ''; }
  function today() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function rid() { var a = new Uint8Array(9); crypto.getRandomValues(a); return 'pl' + Array.prototype.map.call(a, function (b) { return ('0' + b.toString(16)).slice(-2); }).join(''); }
  function abs(u) { try { return new URL(u || '/recipes/', location.href).href; } catch (e) { return String(u || ''); } }
  function store() { var p = P(); if (!p) return null; var d = GGP.data(p.id, 'plates'); if (!d) return null; if (!Array.isArray(d.mine)) d.mine = []; if (!Array.isArray(d.fam)) d.fam = []; return d; }
  function save() { var p = P(); return p && GGP.save ? Promise.resolve(GGP.save(p.id)) : Promise.resolve(); }

  /* ---------- the photos: this browser's database, locked with the profile's plates key ---------- */
  function db() {
    if (DB) return DB;
    DB = new Promise(function (ok, no) { try { var r = indexedDB.open('gg-plates', 1); r.onupgradeneeded = function () { r.result.createObjectStore('img'); }; r.onsuccess = function () { ok(r.result); }; r.onerror = function () { no(r.error); }; } catch (e) { no(e); } });
    return DB;
  }
  function idb(mode, fn) { return db().then(function (d) { return new Promise(function (ok, no) { var t = d.transaction('img', mode), s = t.objectStore('img'), r = fn(s); t.oncomplete = function () { ok(r && r.result); }; t.onerror = function () { no(t.error); }; }); }); }
  function b64(u8) { var s = ''; for (var i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]); return btoa(s); }
  function unb64(s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function key() {
    var d = store(); if (!d) return Promise.reject(new Error('profile'));
    if (!d.k) { var r = new Uint8Array(32); crypto.getRandomValues(r); d.k = b64(r); }
    return crypto.subtle.importKey('raw', unb64(d.k), 'AES-GCM', false, ['encrypt', 'decrypt']);
  }
  function putImg(id, dataUrl) {
    if (!dataUrl) return Promise.resolve();
    return key().then(function (k) { var iv = crypto.getRandomValues(new Uint8Array(12)); return crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, new TextEncoder().encode(dataUrl)).then(function (ct) {
      return idb('readwrite', function (s) { return s.put({ iv: iv, ct: new Uint8Array(ct) }, (P() || {}).id + '|' + id); }); }); });
  }
  function getImg(id) {
    return idb('readonly', function (s) { return s.get((P() || {}).id + '|' + id); }).then(function (r) { if (!r) return '';
      return key().then(function (k) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: r.iv }, k, r.ct); }).then(function (pt) { return new TextDecoder().decode(pt); }); }).catch(function () { return ''; });
  }
  function dropImg(id) { return idb('readwrite', function (s) { return s.delete((P() || {}).id + '|' + id); }).catch(function () {}); }

  /* ---------- a photo, made small, and the share card ---------- */
  function loadFile(f) { return new Promise(function (ok, no) { var u = URL.createObjectURL(f), im = new Image(); im.onload = function () { ok(im); }; im.onerror = function () { URL.revokeObjectURL(u); no(new Error('photo')); }; im.src = u; }); }
  function small(im, w, q) { var s = Math.min(1, w / (im.naturalWidth || im.width)), c = document.createElement('canvas'); c.width = Math.round((im.naturalWidth || im.width) * s); c.height = Math.round((im.naturalHeight || im.height) * s); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); return c.toDataURL('image/jpeg', q || 0.72); }
  function wrap(ctx, text, maxW) { var words = String(text || '').split(/\s+/), lines = [], line = ''; words.forEach(function (w) { var t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; }); if (line) lines.push(line); return lines; }
  function card(im, recipe, note) {
    var c = document.createElement('canvas'); c.width = CARD_W; c.height = CARD_H; var x = c.getContext('2d');
    x.fillStyle = '#FBF6EC'; x.fillRect(0, 0, CARD_W, CARD_H);
    var ph = 860;
    if (im) { var iw = im.naturalWidth || im.width, ih = im.naturalHeight || im.height, s = Math.max(CARD_W / iw, ph / ih), dw = iw * s, dh = ih * s; x.drawImage(im, (CARD_W - dw) / 2, (ph - dh) / 2, dw, dh); }
    else { x.fillStyle = '#E8DCC4'; x.fillRect(0, 0, CARD_W, ph); }
    x.fillStyle = '#8B5E1A'; x.fillRect(0, ph, CARD_W, 8);
    var y = ph + 78; x.fillStyle = '#2C1810'; x.textBaseline = 'alphabetic';
    x.font = '600 54px "Cormorant Garamond", Georgia, serif'; wrap(x, recipe.name, CARD_W - 120).slice(0, 2).forEach(function (l) { x.fillText(l, 60, y); y += 62; });
    if (note.stars) { x.font = '44px Georgia, serif'; x.fillStyle = '#C9902F'; x.fillText('★'.repeat(note.stars) + '☆'.repeat(5 - note.stars), 60, y + 6); y += 62; }
    if (note.text) { x.fillStyle = '#4A3A2C'; x.font = 'italic 36px Georgia, serif'; wrap(x, '“' + note.text + '”', CARD_W - 120).slice(0, 4).forEach(function (l) { x.fillText(l, 60, y); y += 46; }); }
    x.fillStyle = '#8B5E1A'; x.font = '700 30px "Barlow Condensed", Arial, sans-serif'; x.fillText((note.who ? note.who + ' made this. ' : '') + 'Grounded Recipes', 60, CARD_H - 54);
    x.textAlign = 'right'; x.fillText('Grow With Grounded', CARD_W - 60, CARD_H - 54);
    return new Promise(function (ok) { c.toBlob(function (b) { ok(b); }, 'image/jpeg', 0.86); });
  }
  function shareOut(recipe, blob) {
    var url = abs(recipe.url), text = recipe.name + ': the recipe and its step by step guide, from Grounded Recipes.';
    var files = blob ? [new File([blob], 'my-plate.jpg', { type: 'image/jpeg' })] : null;
    try { if (files && navigator.canShare && navigator.canShare({ files: files })) return navigator.share({ files: files, title: recipe.name, text: text + ' ' + url }).then(function () { return 'shared'; }, function () { return 'closed'; }); } catch (e) {}
    try { if (navigator.share) return navigator.share({ title: recipe.name, text: text, url: url }).then(function () { if (blob) saveBlob(blob); return 'shared'; }, function () { return 'closed'; }); } catch (e) {}
    if (blob) saveBlob(blob);
    try { navigator.clipboard.writeText(url); } catch (e) {}
    return Promise.resolve('copied');
  }
  function saveBlob(b) { try { var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'my-plate.jpg'; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500); } catch (e) {} }

  /* ---------- Share My Plate ---------- */
  var ST = null;
  function css() {
    if (document.getElementById('gg-plates-css')) return;
    var s = document.createElement('style'); s.id = 'gg-plates-css';
    s.textContent = '.gpl-bg{position:fixed;inset:0;z-index:2147483000;background:rgba(20,14,8,.55);display:flex;align-items:flex-end;justify-content:center}' +
      '@media (min-width:700px){.gpl-bg{align-items:center}}' +
      '.gpl{background:var(--card,#FFFCF6);color:var(--ink,#2C1810);width:100%;max-width:520px;max-height:92vh;overflow:auto;border-radius:22px 22px 0 0;padding:22px 20px 26px;box-shadow:0 18px 50px rgba(0,0,0,.3);box-sizing:border-box;font-family:Barlow,system-ui,sans-serif}' +
      '@media (min-width:700px){.gpl{border-radius:22px}}' +
      '.gpl h2{font-family:"Cormorant Garamond",Georgia,serif;font-size:30px;margin:0 0 4px;line-height:1.1}.gpl .sub{margin:0 0 14px;color:var(--ink-soft,#6B5A48);font-size:16px}' +
      '.gpl .ph{display:flex;align-items:center;justify-content:center;width:100%;aspect-ratio:4/3;border:2px dashed var(--line,#D9CBB0);border-radius:16px;background:var(--bg,#F6EFE2);cursor:pointer;overflow:hidden;font-weight:700;font-size:17px;color:var(--ink-soft,#6B5A48)}' +
      '.gpl .ph img{width:100%;height:100%;object-fit:cover}.gpl label.f{display:block;margin:14px 0 6px;font-weight:700;font-size:15px}' +
      '.gpl textarea{width:100%;box-sizing:border-box;min-height:84px;border:1px solid var(--line,#D9CBB0);border-radius:12px;padding:10px 12px;font:inherit;font-size:17px;background:var(--bg,#FFF);color:inherit}' +
      '.gpl .stars{display:flex;gap:6px}.gpl .stars button{font-size:32px;line-height:1;background:none;border:0;cursor:pointer;color:#C9902F;padding:2px}' +
      '.gpl .who{display:flex;gap:8px;flex-wrap:wrap}.gpl .who button{border:1.5px solid var(--line,#D9CBB0);background:var(--card,#FFF);color:inherit;border-radius:999px;padding:8px 14px;font:inherit;font-weight:700;font-size:15px;cursor:pointer}.gpl .who button[aria-pressed="true"]{background:#5F7D48;border-color:#5F7D48;color:#fff}' +
      '.gpl .acts{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}.gpl .acts button{flex:1 1 140px;border-radius:999px;padding:12px 16px;font-family:"Barlow Condensed",Arial,sans-serif;font-weight:700;font-size:17px;letter-spacing:.6px;text-transform:uppercase;cursor:pointer;border:2px solid #8B5E1A}' +
      '.gpl .acts .pri{background:#8B5E1A;color:#fff}.gpl .acts .sec{background:transparent;color:#8B5E1A}.gpl .note{font-size:14px;color:var(--ink-soft,#6B5A48);margin:12px 0 0}' +
      '.gpl-list{display:grid;gap:12px;margin:12px 0}.gpl-it{display:flex;gap:12px;align-items:flex-start;background:var(--card,#FFFCF6);border:1px solid var(--line,#E2D8C3);border-radius:16px;padding:10px}' +
      '.gpl-it img{width:92px;height:92px;object-fit:cover;border-radius:12px;flex:none}.gpl-it .t{min-width:0;font-size:16px;line-height:1.45}.gpl-it b{display:block;font-size:15px}.gpl-it .s{color:#C9902F;letter-spacing:1px}' +
      '.gpl-it .x{margin-left:auto;background:none;border:0;color:var(--ink-soft,#6B5A48);font-size:13px;text-decoration:underline;cursor:pointer;flex:none}' +
      '.gpl-head{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-top:18px}.gpl-head h3{margin:0;font-family:"Cormorant Garamond",Georgia,serif;font-size:26px}';
    document.head.appendChild(s);
  }
  function close() { if (ST && ST.el) ST.el.remove(); if (ST && ST.url) try { URL.revokeObjectURL(ST.url); } catch (e) {} ST = null; document.removeEventListener('keydown', onKey, true); }
  function onKey(e) { if (e.key === 'Escape') { e.preventDefault(); close(); } }
  function compose(recipe, opts) {
    if (!recipe || !recipe.id) return; css(); close(); opts = opts || {};
    var p = P(), d = store(), hh = !!(window.GGSync && GGSync.household && GGSync.household());
    ST = { recipe: recipe, im: null, file: null, stars: 0, fam: true, url: '' };
    var el = document.createElement('div'); el.className = 'gpl-bg'; el.setAttribute('data-gpl', '');
    el.innerHTML = '<section class="gpl" role="dialog" aria-modal="true" aria-labelledby="gpl-t"><h2 id="gpl-t">Share My Plate</h2><p class="sub">' + esc(recipe.name) + '</p>' +
      '<button type="button" class="ph" data-gpl="pick" aria-label="Add a photo of your plate">Add a Photo of Your Plate</button><input type="file" accept="image/*" data-gpl="file" hidden>' +
      '<label class="f" for="gpl-w">A few words</label><textarea id="gpl-w" maxlength="' + MAX_WORDS + '" placeholder="We loved this. Next time, a little more garlic."></textarea>' +
      '<label class="f" id="gpl-sl">How was it?</label><div class="stars" role="group" aria-labelledby="gpl-sl">' + [1, 2, 3, 4, 5].map(function (n) { return '<button type="button" data-gpl-star="' + n + '" aria-label="' + n + ' of 5" aria-pressed="false">☆</button>'; }).join('') + '</div>' +
      (p ? '<label class="f" id="gpl-wl">Keep it</label><div class="who" role="group" aria-labelledby="gpl-wl"><button type="button" data-gpl-fam="1" aria-pressed="true">For the Family</button><button type="button" data-gpl-fam="0" aria-pressed="false">Just for Me</button></div>' +
        '<p class="note">' + (hh ? 'For the Family shows it on this recipe for everyone in your Household, locked between your devices.' : 'Kept with this recipe in your locked profile. With a Household on Grounded Accounts, For the Family shows it to your family too.') + '</p>'
        : '<p class="note">Open your profile to keep your plates with the recipe. You can still share this one.</p>') +
      '<div class="acts"><button type="button" class="pri" data-gpl="share">Share My Plate</button>' + (p ? '<button type="button" class="sec" data-gpl="save">Save</button>' : '') + '<button type="button" class="sec" data-gpl="close">Close</button></div>' +
      '<p class="note">Your photo goes straight from your phone to the people you share it with, and stays locked on your devices.</p></section>';
    document.body.appendChild(el); ST.el = el; document.addEventListener('keydown', onKey, true);
    var f = el.querySelector('[data-gpl="file"]');
    el.addEventListener('click', function (e) {
      if (e.target === el) { close(); return; }
      var b = e.target.closest('button'); if (!b) return;
      var a = b.getAttribute('data-gpl');
      if (a === 'pick') f.click();
      else if (a === 'close') close();
      else if (b.hasAttribute('data-gpl-star')) { var n = +b.getAttribute('data-gpl-star'); ST.stars = ST.stars === n ? 0 : n; el.querySelectorAll('[data-gpl-star]').forEach(function (s) { var k = +s.getAttribute('data-gpl-star'); s.textContent = k <= ST.stars ? '★' : '☆'; s.setAttribute('aria-pressed', String(k <= ST.stars)); }); }
      else if (b.hasAttribute('data-gpl-fam')) { ST.fam = b.getAttribute('data-gpl-fam') === '1'; el.querySelectorAll('[data-gpl-fam]').forEach(function (s) { s.setAttribute('aria-pressed', String(s === b)); }); }
      else if (a === 'save' || a === 'share') go(a, b);
    });
    f.addEventListener('change', function () { var file = f.files && f.files[0]; if (!file) return; loadFile(file).then(function (im) { ST.im = im; ST.url = im.src; var ph = el.querySelector('.ph'); ph.innerHTML = '<img alt="Your plate" src="' + im.src + '">'; }, function () { toast('Pick another photo and try again.'); }); });
    setTimeout(function () { var t = el.querySelector('.ph'); if (t) t.focus(); }, 30);
    if (opts.photo) loadFile(opts.photo).then(function (im) { ST.im = im; ST.url = im.src; el.querySelector('.ph').innerHTML = '<img alt="Your plate" src="' + im.src + '">'; });
  }
  function toast(m) { var t = document.createElement('div'); t.setAttribute('role', 'status'); t.textContent = m; t.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:2147483001;background:#2C1810;color:#FFF8EC;padding:12px 18px;border-radius:12px;font:600 16px Barlow,system-ui,sans-serif;max-width:90vw'; document.body.appendChild(t); setTimeout(function () { t.remove(); }, 3200); }
  function noteNow() {
    var p = P(), txt = String((ST.el.querySelector('#gpl-w') || {}).value || '').trim().slice(0, MAX_WORDS), d = today();
    return { id: rid(), rid: ST.recipe.id, rname: ST.recipe.name, url: ST.recipe.url || '', d: d, at: Date.now(), u: Date.now(), text: txt, stars: ST.stars || 0, fam: !!ST.fam, who: p ? first(p.name) : '', by: p ? p.id : '' };
  }
  function keep(note, im) {
    var d = store(); if (!d) return Promise.resolve(false);
    var img = im ? small(im, PHOTO_W, 0.72) : '';
    note.img = !!img; d.mine.unshift(note);
    return putImg(note.id, img).then(save).then(function () { if (note.fam && typeof CFG.poke === 'function') CFG.poke(); emit(note.rid); return true; });
  }
  function go(a, btn) {
    if (!ST) return; var note = noteNow(), im = ST.im, recipe = ST.recipe;
    if (a === 'save' && !im && !note.text && !note.stars) { toast('Add a photo, a few words, or stars first.'); return; }
    btn.disabled = true;
    var kept = (P() && (im || note.text || note.stars)) ? keep(note, im) : Promise.resolve(false);
    kept.then(function (k) {
      if (a === 'save') { close(); toast(k ? (note.fam ? 'Saved with the recipe, for the family.' : 'Saved with the recipe, just for you.') : 'Open your profile to keep your plates.'); return; }
      var made = !!(im || note.text || note.stars);
      return (made ? card(im, recipe, note) : Promise.resolve(null)).then(function (blob) { return shareOut(recipe, blob); }).then(function (r) { close(); if (r === 'copied') toast(made ? 'The card is saved to your device and the recipe link is copied.' : 'The recipe link is copied. Paste it anywhere to share.'); else if (k) toast('Saved with the recipe.'); });
    }).catch(function () { btn.disabled = false; toast('One moment, then tap again to save.'); });
  }

  /* ---------- the recipe's plates ---------- */
  var subs = [];
  function emit(r) { subs.forEach(function (fn) { try { fn(r); } catch (e) {} }); }
  function notesFor(r) { var d = store(); if (!d) return []; var gone = {}; arr(d.gone).forEach(function (g) { gone[g] = 1; }); return d.mine.concat(d.fam).filter(function (n) { return n && n.rid === r && !gone[n.id] && !n.x; }).sort(function (a, b) { return (b.at || 0) - (a.at || 0); }); }
  function section(el, recipe) {
    if (!el || !recipe) return; css();
    var me = (P() || {}).id, L = notesFor(recipe.id);
    el.innerHTML = '<div class="gpl-head"><h3>Our Plates</h3><button type="button" class="btn btn-secondary" data-gpl-open>Share My Plate</button></div>' +
      (L.length ? '<div class="gpl-list">' + L.map(function (n) { return '<div class="gpl-it" data-gpl-note="' + esc(n.id) + '">' + (n.img ? '<img alt="" data-gpl-img="' + esc(n.id) + '">' : '') + '<div class="t"><b>' + esc(n.by === me ? 'You' : (n.who || 'Family')) + ', ' + esc(nice(n.d)) + '</b>' + (n.stars ? '<span class="s" aria-label="' + n.stars + ' of 5">' + '★'.repeat(n.stars) + '</span><br>' : '') + esc(n.text || '') + '</div>' + (n.by === me ? '<button type="button" class="x" data-gpl-del="' + esc(n.id) + '">Remove</button>' : '') + '</div>'; }).join('') + '</div>'
        : '<p class="note" style="margin:8px 0 0">Made this one? Add a photo and a few words, keep them here, and share them.</p>');
    L.forEach(function (n) { if (n.img) getImg(n.id).then(function (u) { var i = el.querySelector('[data-gpl-img="' + n.id + '"]'); if (i && u) i.src = u; else if (i) i.remove(); }); });
    el.onclick = function (e) {
      if (e.target.closest('[data-gpl-open]')) compose(recipe);
      var del = e.target.closest('[data-gpl-del]'); if (del) remove(del.getAttribute('data-gpl-del')).then(function () { section(el, recipe); });
    };
    if (!el.__gpl) { el.__gpl = 1; subs.push(function (r) { if (r === recipe.id && el.isConnected) section(el, recipe); }); }
  }
  function nice(d) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d || ''); if (!m) return ''; return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][+m[2] - 1] + ' ' + (+m[3]); }
  function remove(id) { var d = store(); if (!d) return Promise.resolve(); var n = d.mine.find(function (x) { return x.id === id; }); if (!n) return Promise.resolve(); n.x = true; n.u = Date.now(); n.text = ''; n.img = false; return dropImg(id).then(save).then(function () { if (n.fam && typeof CFG.poke === 'function') CFG.poke(); emit(n.rid); }); }

  /* ---------- the Household space: every family note, each with its photo ---------- */
  var space = {
    get: function () {
      var d = store(), p = P(); if (!d || !p) return null;
      var L = d.mine.filter(function (n) { return n.fam; }).concat(d.fam);
      return Promise.all(L.map(function (n) { return (n.img && !n.x ? getImg(n.id) : Promise.resolve('')).then(function (u) { var o = {}; Object.keys(n).forEach(function (k) { if (k !== 'img') o[k] = n[k]; }); o.img = u || ''; return o; }); }))
        .then(function (notes) { return { notes: notes }; });
    },
    put: function (o) {
      var d = store(), p = P(); if (!d || !p || !o || !Array.isArray(o.notes)) return;
      var mine = {}; d.mine.forEach(function (n) { mine[n.id] = n; });
      var jobs = [], fam = [], touched = {};
      o.notes.forEach(function (n) {
        if (!n || typeof n.id !== 'string' || typeof n.rid !== 'string') return;
        if (n.by === p.id && mine[n.id]) { if (n.x && !mine[n.id].x) { mine[n.id].x = true; touched[n.rid] = 1; } return; }
        if (n.by === p.id) return;
        var m = {}; Object.keys(n).forEach(function (k) { if (k !== 'img') m[k] = n[k]; }); m.img = !!n.img && !n.x; fam.push(m); touched[n.rid] = 1;
        if (n.img && !n.x) jobs.push(putImg(n.id, String(n.img).slice(0, 400000)));
      });
      d.fam = fam;
      return Promise.all(jobs).then(save).then(function () { Object.keys(touched).forEach(emit); });
    }
  };
  window.GGPlates = { v: 'b979', compose: compose, share: function (r) { return shareOut(r, null); }, section: section, notes: notesFor, space: space, config: function (o) { Object.keys(o || {}).forEach(function (k) { CFG[k] = o[k]; }); }, on: function (fn) { subs.push(fn); }, _: { card: card, small: small, getImg: getImg } };
})();
