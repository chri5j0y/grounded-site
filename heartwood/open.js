/* Heartwood: opening the app (heartwood/open.js), GWG BLD 772.
   Heartwood is the private app for the two of you that comes with The Grounded Marriage. Its content (the questions,
   The Couple Workbook, The Money Map, the results words, Practices for Two, After the Vows, the faith backgrounds,
   Your Tree, Then Your Grove, and the Learn videos) is sealed in heartwood/lib-heartwood.js:
     window.GFG_HEARTWOOD = {v: 1, made, iv, ct}  AES-GCM (256) of {_gfg: 'heartwood', v: 1, data: {BTV_Q, GM_FAITH, ...}}
   under the Heartwood key, sealed by Chris in the Field Guide (Founder tab, Seal Heartwood). Before that it holds
   {pending: true}, and Heartwood shows the open sample.
   The invite: Staff and Founders make it in the Field Guide from the couple's client file. The link carries
   #hw=<salt>.<iv>.<ct> (base64url): the Heartwood key, sealed under the couple's short code with PBKDF2 (250,000
   rounds, SHA-256, the same as the Field Guide) and AES-GCM. The code is given separately and never travels in the link.
   On this device: the invite is kept in localStorage (gg_hw_inv; it opens only with the code), and once the code
   opens it, the key is kept in IndexedDB (gg-hw) as a non-extractable CryptoKey: the browser can use it to open
   Heartwood, but no script can read the key itself, and nothing is sent anywhere. Where IndexedDB is not available
   (some private windows), the key lives only for this visit and Heartwood asks for the code again next time.
   Clear Everything (app.js) calls HWOpen.forget(), which removes the key and the invite from this device.
   Without an invite, or before Chris seals: the open sample (heartwood/sample.js, window.HW_SAMPLE_DATA).
   Open Heartwood (GWG BLD 773): Staff and Founders open Heartwood from the Field Guide with no code typed. The Field
   Guide makes a throwaway invite on the spot, sealed under 'open:<code>:<time>' (a pass a couple's code can never be:
   theirs are letters and numbers only), and opens #hw=<invite>&hc=<code>&ht=<time>. It is taken once (its salt is
   remembered in gg_hw_once), only within 15 minutes of being made, never saved as the device's invite, and taken out
   of the address bar right away. A link without hc asks for the code, exactly as before.
   Then app.js loads, reading the same globals (BTV_Q, GM_FAITH, GM_RESULTS, GM_WB, GM_MONEY, GM_PR, GM_AFTER,
   GG_LEARN_GM, GM_TOGETHER); window.HW_SAMPLE is true in the sample. */
(function () {
  'use strict';
  var ROUNDS = 250000, INV = 'gg_hw_inv', DBN = 'gg-hw', STORE = 'k', SLOT = 'key';
  var GLOBALS = ['BTV_Q', 'GM_FAITH', 'GM_RESULTS', 'GM_WB', 'GM_MONEY', 'GM_PR', 'GM_AFTER', 'GG_LEARN_GM', 'GM_TOGETHER'];
  var ASK = '/contact.html#plan=Premarital%20Sessions', PROGRAM = '/the-grounded-marriage.html';
  var me = document.currentScript, APP = (me && me.getAttribute('data-app')) || '/heartwood/app.js', SAMPLE = (me && me.getAttribute('data-sample')) || '/heartwood/sample.js';
  var LIB = (me && me.getAttribute('data-lib')) || '/heartwood/lib-heartwood.js';
  var subtle = window.crypto && crypto.subtle, enc = new TextEncoder(), dec = new TextDecoder();
  var $ = function (id) { return document.getElementById(id); };
  var LOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function unb64(s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function unb64u(s) { s = String(s).replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return unb64(s); }
  // The couple's code: letters and numbers only; spaces, dashes, and capitals do not matter.
  function normCode(s) { return String(s || '').normalize('NFKC').toUpperCase().replace(/[^A-Z0-9]/g, ''); }
  var RX = /(?:^|[#&?])hw=([A-Za-z0-9_-]{16,40}\.[A-Za-z0-9_-]{12,24}\.[A-Za-z0-9_-]{40,400})/;
  function inviteOf(s) { var m = RX.exec(String(s || '')); return m ? m[1] : ''; }
  var RXC = /(?:^|[#&])hc=([A-Z0-9]{12,40})(?:&|$)/, RXT = /(?:^|[#&])ht=(\d{12,15})(?:&|$)/, ONCE = 'gg_hw_once', FRESH = 15 * 60 * 1000;
  var STAFF = null; // {inv, hc, ht}: an Open Heartwood link from the Field Guide, taken once

  /* ---------- the invite in the link ---------- */
  function takeInvite() {
    var h = location.hash || '', inv = inviteOf(h), hc = RXC.exec(h), ht = RXT.exec(h);
    if (!inv && !hc && !ht) return '';
    // Open Heartwood (Staff and Founders): kept only for this visit, never as this device's invite.
    if (inv && hc && ht) STAFF = { inv: inv, hc: hc[1], ht: ht[1] };
    else if (inv) { try { localStorage.setItem(INV, inv); } catch (e) {} }
    // Take the invite (and any Open Heartwood code) out of the address; anything else after the # (a partner's card) stays for app.js.
    var rest = h.replace(/^#/, '').split('&').filter(function (p) { return p && p.indexOf('hw=') !== 0 && p.indexOf('hc=') !== 0 && p.indexOf('ht=') !== 0; }).join('&');
    try { history.replaceState(null, '', location.pathname + location.search + (rest ? '#' + rest : '')); } catch (e) {}
    return STAFF ? '' : inv;
  }
  function savedInvite() { try { return localStorage.getItem(INV) || ''; } catch (e) { return ''; } }

  /* ---------- the key on this device (IndexedDB, non-extractable) ---------- */
  function db() {
    return new Promise(function (ok) {
      try {
        var r = indexedDB.open(DBN, 1);
        r.onupgradeneeded = function () { r.result.createObjectStore(STORE); };
        r.onsuccess = function () { ok(r.result); }; r.onerror = r.onblocked = function () { ok(null); };
      } catch (e) { ok(null); }
    });
  }
  function idb(mode, fn) {
    return db().then(function (d) {
      if (!d) return null;
      return new Promise(function (ok) {
        try { var t = d.transaction(STORE, mode), q = fn(t.objectStore(STORE)); t.oncomplete = function () { d.close(); ok(q && q.result !== undefined ? q.result : true); }; t.onerror = t.onabort = function () { d.close(); ok(null); }; }
        catch (e) { d.close(); ok(null); }
      });
    });
  }
  var MEMKEY = null;
  function getKey() { if (MEMKEY) return Promise.resolve(MEMKEY); return idb('readonly', function (s) { return s.get(SLOT); }).then(function (k) { return k && k.type === 'secret' ? k : null; }); }
  function putKey(k) { MEMKEY = k; return idb('readwrite', function (s) { return s.put(k, SLOT); }); }
  function dropKey() { MEMKEY = null; return idb('readwrite', function (s) { return s.delete(SLOT); }); }

  /* ---------- opening ---------- */
  function unwrap(inv, code, pass) {
    var p = String(inv).split('.'); if (p.length !== 3) return Promise.reject(new Error('invite'));
    var salt = unb64u(p[0]), iv = unb64u(p[1]), ct = unb64u(p[2]);
    return subtle.importKey('raw', enc.encode(pass || normCode(code)), 'PBKDF2', false, ['deriveKey'])
      .then(function (base) { return subtle.deriveKey({ name: 'PBKDF2', salt: salt, iterations: ROUNDS, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']); })
      .then(function (k) { return subtle.decrypt({ name: 'AES-GCM', iv: iv }, k, ct); })
      .then(function (raw) { if (raw.byteLength !== 32) throw new Error('invite'); return subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['decrypt']); });
  }
  // lib-heartwood.js is read as data (never run), fresh from the site each time so a new upload shows right away.
  function getLib() {
    return fetch(LIB, { cache: 'no-cache' }).then(function (r) { return r.ok ? r.text() : ''; }).then(function (t) {
      var at = t.indexOf('GFG_HEARTWOOD'), a = at < 0 ? -1 : t.indexOf('{', at), b = t.lastIndexOf('}'); if (a < 0 || b < a) return null;
      try { var o = JSON.parse(t.slice(a, b + 1)); return o && typeof o === 'object' ? o : null; } catch (e) { return null; }
    }, function () { return null; });
  }
  function sealed(lib) { return !!(lib && !lib.pending && typeof lib.iv === 'string' && typeof lib.ct === 'string'); }
  function openLib(key, lib) {
    return subtle.decrypt({ name: 'AES-GCM', iv: unb64(lib.iv) }, key, unb64(lib.ct)).then(function (pt) {
      var o = JSON.parse(dec.decode(pt)); if (!o || o._gfg !== 'heartwood' || !o.data || !o.data.BTV_Q) throw new Error('content'); return o.data;
    });
  }

  /* ---------- Open Heartwood (Staff and Founders, GWG BLD 773) ---------- */
  function onceList() { try { var a = JSON.parse(localStorage.getItem(ONCE) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  // Resolves the content when the link opens Heartwood, or null (used before, too old, or not this Heartwood).
  function staffOpen(o, lib) {
    var age = Date.now() - (+o.ht), salt = String(o.inv).split('.')[0], used = onceList();
    if (!(age >= -120000 && age <= FRESH) || used.indexOf(salt) >= 0) return Promise.resolve(null);
    try { localStorage.setItem(ONCE, JSON.stringify(used.concat([salt]).slice(-30))); } catch (e) {}
    return unwrap(o.inv, '', 'open:' + o.hc + ':' + o.ht).then(function (key) {
      return openLib(key, lib).then(function (data) { return putKey(key).then(function () { return data; }); });
    }).then(null, function () { return null; });
  }

  /* ---------- starting the app ---------- */
  var started = false;
  function start(data, sample) {
    if (started) return; started = true;
    GLOBALS.forEach(function (g) { window[g] = data && data[g] ? data[g] : undefined; });
    window.HW_SAMPLE = !!sample;
    note(sample ? sampleNote() : '');
    var s = document.createElement('script'); s.src = APP; s.onerror = function () { msg('<p>Heartwood could not load. Check the connection and try again.</p>'); };
    document.body.appendChild(s);
  }
  function sample() {
    if (window.HW_SAMPLE_DATA) return start(window.HW_SAMPLE_DATA, true);
    var s = document.createElement('script'); s.src = SAMPLE;
    s.onload = function () { if (window.HW_SAMPLE_DATA) start(window.HW_SAMPLE_DATA, true); else msg('<p>Heartwood could not load. Check the connection and try again.</p>'); };
    s.onerror = function () { msg('<p>Heartwood could not load. Check the connection and try again.</p>'); };
    document.body.appendChild(s);
  }
  function msg(h) { var el = $('gm-app'); if (el) el.innerHTML = '<div class="ff-card">' + h + '</div>'; }
  function note(h) { var el = $('hw-note'); if (!el) return; el.innerHTML = h; el.hidden = !h; }
  var LIBNOW = null, WHY = '';
  function sampleNote() {
    var inv = savedInvite(), ready = sealed(LIBNOW);
    return '<div class="ff-card gold hw-note"><div class="eyebrow">A Sample of Heartwood</div><h2>Heartwood opens with the code from your first session</h2>' +
      (WHY ? '<p class="hw-why">' + esc(WHY) + '</p>' : '') +
      '<p>The Grounded Marriage comes with Heartwood, your private app for the two of you. Here you can try ten of its questions, one of its Practices for Two, and two of its videos. Anything you write here stays on this device.</p>' +
      (inv && ready ? '' : '<p class="btv-small">Have your invite? Open the link Chris and Kayti sent you on each of your phones, then type your code.</p>') +
      '<div class="ff-row"><a class="btn btn-primary" href="' + ASK + '">Ask About The Grounded Marriage</a>' +
      (inv && ready ? '<button type="button" class="btn btn-secondary" data-hw="gate">I Have My Code</button>' : '<a class="btn btn-secondary" href="' + PROGRAM + '">About The Grounded Marriage</a>') + '</div></div>';
  }
  function gate(err) {
    note('');
    var el = $('gm-app'); if (!el) return;
    el.innerHTML = '<div class="ff-card gold hw-gate"><h2>Open Heartwood</h2>' +
      '<p>Type the code Chris and Kayti gave you. Each of you opens this same link on your own phone, and types the same code.</p>' +
      '<form id="hw-form" novalidate><label class="ff-f"><span class="l">Your Heartwood code</span><input id="hw-code" name="hw-code" autocomplete="off" autocapitalize="characters" autocorrect="off" spellcheck="false" maxlength="24" aria-describedby="hw-err"></label>' +
      '<p class="hw-err" id="hw-err" role="alert">' + esc(err || '') + '</p>' +
      '<div class="ff-row"><button type="submit" class="btn btn-primary" id="hw-go">Open Heartwood</button><button type="button" class="btn btn-secondary ff-sm" data-hw="sample">See the Sample</button></div></form>' +
      '<p class="ff-private">' + LOCK + '<span>Your code opens Heartwood on this device only. Grow With Grounded never sees your answers, and nothing is sent anywhere.</span></p></div>';
    var f = $('hw-code'); if (f) setTimeout(function () { try { f.focus(); } catch (e) {} }, 30);
  }
  var busy = false;
  function tryCode() {
    if (busy) return; var f = $('hw-code'), err = $('hw-err'), go = $('hw-go'), code = f ? f.value : '';
    if (normCode(code).length < 6) { if (err) err.textContent = 'Type the whole code, letters and numbers. Spaces and dashes do not matter.'; return; }
    busy = true; if (go) { go.disabled = true; go.textContent = 'Opening...'; } if (err) err.textContent = '';
    var done = function (m) { busy = false; if (go) { go.disabled = false; go.textContent = 'Open Heartwood'; } if (m && err) err.textContent = m; if (m && f) { f.focus(); f.select(); } };
    unwrap(savedInvite(), code).then(function (key) {
      return openLib(key, LIBNOW).then(function (data) { return putKey(key).then(function () { done(''); start(data, false); }); },
        function () { done('This invite is from an earlier Heartwood. Ask Chris and Kayti for a new invite link and code.'); });
    }, function () { done('That code does not open this invite. Check the code from Chris and Kayti, and try again.'); });
  }
  document.addEventListener('submit', function (e) { if (e.target && e.target.id === 'hw-form') { e.preventDefault(); tryCode(); } });
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-hw]'); if (!b) return;
    var a = b.getAttribute('data-hw');
    if (a === 'sample') sample();
    else if (a === 'gate' && !started) gate('');
    else if (a === 'gate' && started) { try { sessionStorage.setItem('gg-hw-gate', '1'); } catch (er) {} location.reload(); }
  });

  window.HWOpen = {
    // Clear Everything: the key and the invite leave this device.
    forget: function () { try { localStorage.removeItem(INV); } catch (e) {} return dropKey(); },
    sample: function () { return !!window.HW_SAMPLE; },
    normCode: normCode, inviteOf: inviteOf
  };

  // An invite link opened while Heartwood is already on screen (only the part after the # changes): start again with it.
  window.addEventListener('hashchange', function () {
    if (!inviteOf(location.hash)) return;
    if (RXC.test(location.hash)) { location.reload(); return; } // Open Heartwood: boot takes it
    takeInvite(); try { sessionStorage.setItem('gg-hw-gate', '1'); } catch (e) {} location.reload();
  });

  function boot() {
    if (!subtle || !window.fetch) { msg('<p>This browser cannot open Heartwood. Try a current version of Safari, Chrome, Edge, or Firefox.</p>'); return; }
    var fresh = takeInvite(), wantGate = false;
    try { wantGate = sessionStorage.getItem('gg-hw-gate') === '1'; sessionStorage.removeItem('gg-hw-gate'); } catch (e) {}
    getLib().then(function (lib) {
      LIBNOW = lib;
      if (!sealed(lib)) return sample();
      var so = STAFF; STAFF = null;
      return (so ? staffOpen(so, lib) : Promise.resolve(null)).then(function (sd) {
        if (sd) return start(sd, false);
        if (so) WHY = 'That Open Heartwood link was already used or is more than 15 minutes old. Open Heartwood again from the Field Guide.';
        return getKey().then(function (key) {
        // A new invite in the link always asks for its code, so a couple can move to a fresh Heartwood.
        if (key && !fresh) return openLib(key, lib).then(function (data) { start(data, false); }, function () {
          return dropKey().then(function () { if (savedInvite()) { WHY = 'Heartwood has a new lock. Type your code again, or ask Chris and Kayti for a new invite.'; gate(WHY); WHY = ''; } else { WHY = 'Heartwood has a new lock. Ask Chris and Kayti for a new invite link and code.'; sample(); } });
        });
        if (savedInvite() && (fresh || wantGate || !key)) return gate(WHY);
        return sample();
        });
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
