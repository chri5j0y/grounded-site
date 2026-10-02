/* =====================================================================
   GROUNDED BRIDGE (gg-bridge.js) . Willow Build Session 3
   Carries a small, sealed card between a family's Willow and a chaplain's
   or doula's Willow Guide, in person, by QR code or link. Both ways:

     Willow Guide to Willow   #gg-wl=   "From your visit": what matters,
                                        a practice or two, the vigil plan
     Willow to Willow Guide   #gg-wg=   "Share with my chaplain or doula":
                                        check-ins and only what the person
                                        already chose to share

   How it stays private
   - The card is sealed (AES-GCM) with a short spoken code, like
     "cedar lantern 47". The code is never in the link or the QR code.
     The person showing the code reads it aloud. Without it, the link
     opens nothing.
   - The sealed card rides after the # in the link, the part a browser
     never sends to any server. Nothing is uploaded. Grounded never sees it.
   - The receiving page wipes the link from the address bar right away and
     holds the card only until the page closes.

   GGBridge.code()                   a new spoken code
   GGBridge.seal(kind, obj, code)    Promise of a sealed token
   GGBridge.open(token, code, kind)  Promise of the card, or null
   GGBridge.url(dest, token)         'willow' or 'guide'
   GGBridge.find(text)               a token from a pasted link, or ''
   GGBridge.pending(dest) / clear(dest)
   GGBridge.show(o)                  the QR and code dialog
   ===================================================================== */
(function () {
  if (window.GGBridge) return;
  var SITE = 'https://growwithgrounded.com';
  var KEYS = { willow: 'gg-wl', guide: 'gg-wg' };
  var PATH = { willow: '/willow/', guide: '/field-guide/' };
  var ITER = 200000;
  var WORDS = ['acorn', 'amber', 'anchor', 'apple', 'aspen', 'autumn', 'basin', 'beacon', 'birch', 'blossom', 'branch', 'breeze', 'brook', 'candle', 'canoe',
    'cardinal', 'cedar', 'chapel', 'clover', 'comet', 'cove', 'crane', 'creek', 'dawn', 'dove', 'dune', 'eagle', 'elm', 'ember', 'fern', 'field', 'finch',
    'fox', 'garden', 'glade', 'glen', 'harbor', 'harvest', 'haven', 'hawk', 'hazel', 'hearth', 'heron', 'hill', 'hollow', 'honey', 'island', 'ivy',
    'juniper', 'kestrel', 'lake', 'lantern', 'larch', 'lark', 'laurel', 'leaf', 'lilac', 'linden', 'lodge', 'loon', 'lupine', 'maple', 'marsh', 'meadow',
    'mint', 'moon', 'moss', 'nest', 'north', 'oak', 'orchard', 'osprey', 'otter', 'owl', 'pasture', 'pearl', 'pebble', 'pine', 'plum', 'pond', 'poplar',
    'prairie', 'quill', 'rain', 'raven', 'reed', 'ridge', 'river', 'robin', 'rowan', 'sage', 'sparrow', 'spring', 'spruce', 'star', 'stone', 'summit',
    'sunrise', 'swan', 'tamarack', 'thrush', 'tide', 'timber', 'trail', 'tulip', 'valley', 'violet', 'walnut', 'willow', 'wren', 'yarrow'];
  var enc = new TextEncoder(), dec = new TextDecoder();

  function rnd(n) { var a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }
  function code() { return WORDS[rnd(WORDS.length)] + ' ' + WORDS[rnd(WORDS.length)] + ' ' + (10 + rnd(90)); }
  function norm(c) { return String(c || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
  function b64u(bytes) { var s = ''; for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function unb64u(s) { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; var b = atob(s), out = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) out[i] = b.charCodeAt(i); return out; }
  function key(c, salt) {
    return crypto.subtle.importKey('raw', enc.encode(norm(c)), 'PBKDF2', false, ['deriveKey']).then(function (base) {
      return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: salt, iterations: ITER, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    });
  }
  // Squeezing the card first keeps the QR code easy to scan. Browsers without it send it as is.
  function squeeze(bytes) {
    if (!window.CompressionStream) return Promise.resolve({ z: 0, b: bytes });
    var s = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate-raw'));
    return new Response(s).arrayBuffer().then(function (buf) { return { z: 1, b: new Uint8Array(buf) }; }).catch(function () { return { z: 0, b: bytes }; });
  }
  function unsqueeze(z, bytes) {
    if (!z) return Promise.resolve(bytes);
    if (!window.DecompressionStream) return Promise.reject(new Error('old'));
    var s = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return new Response(s).arrayBuffer().then(function (buf) { return new Uint8Array(buf); });
  }
  function seal(kind, obj, c) {
    var body = enc.encode(JSON.stringify({ k: kind, v: 1, d: obj }));
    var salt = crypto.getRandomValues(new Uint8Array(12)), iv = crypto.getRandomValues(new Uint8Array(12));
    return squeeze(body).then(function (sq) {
      var plain = new Uint8Array(sq.b.length + 1); plain[0] = sq.z; plain.set(sq.b, 1);
      return key(c, salt).then(function (k) { return crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, plain); }).then(function (ct) {
        var ctb = new Uint8Array(ct), all = new Uint8Array(24 + ctb.length); all.set(salt, 0); all.set(iv, 12); all.set(ctb, 24);
        return 'b1.' + b64u(all);
      });
    });
  }
  // Resolves to the card, or null when the code is wrong. Rejects with 'old' when this browser can't unsqueeze it.
  function open(token, c, kind) {
    try {
      if (!/^b1\./.test(token || '')) return Promise.resolve(null);
      var all = unb64u(token.slice(3)); if (all.length < 40) return Promise.resolve(null);
      var salt = all.slice(0, 12), iv = all.slice(12, 24), ct = all.slice(24);
      return key(c, salt).then(function (k) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, k, ct); })
        .then(function (pt) { pt = new Uint8Array(pt); return unsqueeze(pt[0], pt.slice(1)); }, function () { return null; })
        .then(function (b) {
          if (!b) return null;
          var o = JSON.parse(dec.decode(b));
          return o && (!kind || o.k === kind) ? o.d : null;
        });
    } catch (e) { return Promise.resolve(null); }
  }
  function url(dest, token) { return SITE + PATH[dest] + '#' + KEYS[dest] + '=' + token; }
  function find(text) { var m = /(?:^|[#&\s])gg-w[lg]=(b1\.[A-Za-z0-9_-]+)/.exec(String(text || '')) || /(b1\.[A-Za-z0-9_-]{40,})/.exec(String(text || '')); return m ? m[1] : ''; }
  function pending(dest) { try { return sessionStorage.getItem('gg-bridge-' + dest) || ''; } catch (e) { return ''; } }
  function clear(dest) { try { sessionStorage.removeItem('gg-bridge-' + dest); } catch (e) {} }

  // Take a card from the link, hold it for this page, and wipe it from the address bar.
  function take() {
    var h = location.hash || '', got = '';
    Object.keys(KEYS).forEach(function (dest) {
      var m = new RegExp('[#&]' + KEYS[dest] + '=(b1\\.[A-Za-z0-9_-]+)').exec(h);
      if (m) { try { sessionStorage.setItem('gg-bridge-' + dest, m[1]); } catch (e) {} got = dest; }
    });
    if (got) {
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
      try { window.dispatchEvent(new CustomEvent('gg-bridge', { detail: { dest: got } })); } catch (e) {}
    }
    return got;
  }
  take();
  window.addEventListener('hashchange', take);

  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  // o = {title, link, code, say, small}
  function show(o) {
    var svg = '';
    try { if (window.GGQR) svg = window.GGQR.svg(o.link, { label: 'QR code: ' + o.title }); } catch (e) { svg = ''; }
    var html = (svg ? '<div class="ggx-qr">' + svg + '</div>' : '') +
      '<p>' + esc(o.say) + '</p>' +
      '<p style="text-align:center;margin:12px 0"><span style="display:inline-block;font:700 24px/1.3 Barlow,system-ui,sans-serif;letter-spacing:.5px;padding:8px 16px;border:2px dashed currentColor;border-radius:12px">' + esc(o.code) + '</span></p>' +
      '<p class="ggx-small">' + esc(o.small) + '</p>';
    var copyLink = function () {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(o.link).then(function () { note('Link copied. Say the code out loud, or by phone. Never send it with the link.'); }, function () { note('Copy did not work on this device.'); });
      else note('Copy did not work on this device.');
    };
    var note = function (m) { if (window.GGApp && GGApp.toast) GGApp.toast(m); };
    if (window.GGApp && GGApp.dialog) return GGApp.dialog({ title: o.title, html: html, buttons: [{ t: 'Copy the Link', kind: 'line', fn: copyLink }, { t: 'Done', kind: 'main' }] });
    alert(o.say + '\n\nCode: ' + o.code);
  }

  window.GGBridge = { code: code, norm: norm, seal: seal, open: open, url: url, find: find, pending: pending, clear: clear, show: show, take: take };
})();
