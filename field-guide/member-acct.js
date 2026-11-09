/* =====================================================================
   MEMBERSHIP ON THE ACCOUNT, FOUNDER VIEW (field-guide/member-acct.js), GWG BLD 949.
   (c) 2026 Grow With Grounded LLC.
   In the Founder tab: Members, organization seats used, and renewals, read from the Grounded server
   (api.growwithgrounded.com, GET /v1/founder/view), and the steps to give the server the current Member key.
   How the Founder view stays private: each Founder device makes its own signing key here (ECDSA P-256). The private
   half stays in this browser as a non extractable key (IndexedDB gg-founder): scripts can use it, no script can read it.
   Only the public half ("ggf1.<x>.<y>") leaves, and it goes into the Worker setting FOUNDER_KEYS. A public key opens
   nothing, so it is safe to send in a chat. Each request is signed with the time, good for 5 minutes.
   The Member key: Membership on the Account hands the Member lock key to Member accounts from the Worker secret
   MEMBER_KEY. After each Rotate Member (once the new lib-member.js is uploaded), Copy the Member Key here and paste it
   into Cloudflare. The fingerprints below show when the server and this device hold the same key.
   Hooks in field-guide/index.html: GGMa.init, GGMa.card, GGMa.view, and the ma- actions. No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGMa) return;
  var subtle = window.crypto && crypto.subtle, enc = new TextEncoder();
  var site = /(^|\.)growwithgrounded\.com$/.test(location.hostname);
  var API = window.GG_ACCOUNT_API || (site ? 'https://api.growwithgrounded.com/v1' : '');
  var C = null, S = { pub: '', fp: '', data: null, err: '', busy: false, copied: '' };
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var KIND = { member: 'Member', household: 'Household', org: 'Organization', staff: 'Staff', founder: 'Founder', orgpack: 'Organization Pack', giftpack: 'Gift', unknown: 'Needs a Kind' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function b64u(u8) { var s = ''; u8 = new Uint8Array(u8); for (var i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function unb64(s) { s = String(s || '').replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function day(ms) { if (ms == null) return 'No end date'; var d = new Date(ms); return MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear(); }

  /* ---------- this device's Founder signing key ---------- */
  function idb(mode, fn) {
    return new Promise(function (ok) {
      try {
        var r = indexedDB.open('gg-founder', 1);
        r.onupgradeneeded = function () { r.result.createObjectStore('k'); };
        r.onerror = function () { ok(null); };
        r.onsuccess = function () {
          var d = r.result;
          try { var t = d.transaction('k', mode), out = fn(t.objectStore('k')); t.oncomplete = function () { d.close(); ok(out && 'result' in out ? out.result : true); }; t.onerror = function () { d.close(); ok(null); }; } catch (e) { ok(null); }
        };
      } catch (e) { ok(null); }
    });
  }
  function signKey() { return idb('readonly', function (s) { return s.get('sign'); }); }
  function makeKey() {
    return subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign', 'verify']).then(function (k) {
      return subtle.exportKey('jwk', k.publicKey).then(function (j) {
        var rec = { priv: k.privateKey, pub: 'ggf1.' + j.x + '.' + j.y, at: Date.now() };
        return idb('readwrite', function (s) { s.put(rec, 'sign'); }).then(function () { return rec; });
      });
    });
  }
  function signed(path) {
    return signKey().then(function (k) {
      if (!k || !k.priv) throw new Error('nokey');
      var t = String(Math.floor(Date.now() / 1000));
      return subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, k.priv, enc.encode('gg-founder|GET|' + path + '|' + t)).then(function (sig) { return t + '.' + b64u(sig); });
    });
  }
  function load() {
    if (!API) { S.err = 'The Grounded server address is missing on this page.'; return Promise.resolve(); }
    S.busy = true; S.err = ''; paint();
    return signed('/founder/view').then(function (h) {
      return fetch(API + '/founder/view', { headers: { 'X-GG-Client': '1', 'X-GG-Founder': h }, credentials: 'omit', cache: 'no-store' });
    }).then(function (r) { return r.json().then(function (j) { if (!r.ok || !j.ok) throw new Error(j && j.why || 'server'); S.data = j; }); })
      .catch(function (e) {
        var w = e && e.message;
        S.err = w === 'nokey' ? 'Make this device\'s Founder key first.' : w === 'founder' ? 'The server is ready for this device\'s Founder key. Send the key above to Claude, and Claude adds it.' : 'The server is out of reach right now. Try again in a little while.';
      }).then(function () { S.busy = false; paint(); });
  }
  // This device's Member key fingerprint, the same way the Worker makes it (the first 12 characters of SHA-256)
  function printOf(key) {
    if (!key || !subtle) return Promise.resolve('');
    return subtle.digest('SHA-256', unb64(key)).then(function (h) { return b64u(new Uint8Array(h)).slice(0, 12); }).catch(function () { return ''; });
  }
  function paint() { if (C && C.render) C.render(); }
  function copy(text, what) {
    var done = function () { S.copied = what; if (C && C.toast) C.toast(what === 'key' ? 'Member key copied. Paste it into Cloudflare now.' : 'Founder key copied.'); paint(); };
    try { return navigator.clipboard.writeText(text).then(done, function () { window.prompt('Copy this:', text); done(); }); } catch (e) { window.prompt('Copy this:', text); done(); return Promise.resolve(); }
  }

  /* ---------- the view ---------- */
  function rowH(x) {
    var st = x.on ? (x.waiting ? 'Waiting on an account' : 'Open') : x.status === 'waiting' ? 'Waiting' : 'Ended';
    var end = x.on ? (x.auto ? 'Renews ' + day(x.ends) : 'Through ' + day(x.ends)) : x.ends ? 'Ended ' + day(x.ends) : '';
    return '<div class="list-row"><div class="lr-main"><b>' + esc(x.email || 'No email yet') + '</b> <span class="pill">' + esc(KIND[x.kind] || x.kind) + '</span><br><small class="muted">' + esc(st) + (end ? ' &middot; ' + esc(end) : '') + (x.source === 'code' ? ' &middot; by code' : '') + (x.why === 'failed' ? ' &middot; payment waiting' : '') + '</small></div></div>';
  }
  function view() {
    var D = S.data, key = C && C.mKey ? C.mKey() : '';
    if (key && !S.fp) printOf(key).then(function (f) { if (f) { S.fp = f; paint(); } });
    var keyH = '<div class="card" id="ma-founder"><h3>This Device\'s Founder Key</h3>' + (S.pub
      ? '<p class="muted">The server shows Members only to the Founder devices it knows. This is this device\'s public key. It opens nothing on its own, so it is safe to send in a chat.</p><p class="codeshow" style="word-break:break-all;font-size:14px">' + esc(S.pub) + '</p>' +
        '<ol class="acc-steps"><li>Tap Copy the Founder Key.</li><li>Send it to Claude in chat. Claude adds it to the Grounded server (FOUNDER_KEYS).</li><li>Make one on each Founder device, Kayti\'s too.</li></ol>' +
        '<div class="row" style="margin-top:10px"><button class="btn btn-gold btn-sm" data-act="ma-copypub">Copy the Founder Key</button></div>'
      : '<p class="muted">One time on each Founder device. This browser keeps its own private signing key, and only the public half is shared.</p><div class="row" style="margin-top:10px"><button class="btn btn-gold btn-sm" data-act="ma-mkkey">Make This Device\'s Founder Key</button></div>') + '</div>';
    var mH = '<div class="card" id="ma-members"><h3>Members</h3><p class="muted">Who has Membership on their Grounded Account, organization seats used, and renewals, read fresh from the Grounded server.</p>' +
      '<div class="row" style="margin-top:10px"><button class="btn btn-gold btn-sm" data-act="ma-load"' + (S.busy ? ' disabled' : '') + '>' + (D ? 'Refresh' : 'See Members') + '</button></div>' +
      (S.err ? '<p class="tipbox" style="border-left:3px solid var(--gold);margin-top:10px">' + esc(S.err) + '</p>' : '');
    if (D) {
      var n = D.counts || {}, setup = D.setup || {};
      mH += '<p style="margin-top:12px"><b>' + ((n.member || 0) + (n.household || 0) + (n.org || 0)) + '</b> Members open: ' + (n.member || 0) + ' Member, ' + (n.household || 0) + ' Household (covering ' + (n.covered || 0) + ' accounts), ' + (n.org || 0) + ' through organizations' + (n.staff || n.founder ? ', ' + ((n.staff || 0) + (n.founder || 0)) + ' Staff and Founder' : '') + '.</p>' +
        (n.waiting ? '<p class="muted">' + n.waiting + (n.waiting === 1 ? ' payment waits' : ' payments wait') + ' for an account with its email.</p>' : '') +
        (n.unknown ? '<p class="tipbox" style="border-left:3px solid var(--gold)">' + n.unknown + (n.unknown === 1 ? ' payment needs' : ' payments need') + ' a kind. Tell Claude: a Stripe price is missing from STRIPE_KINDS.</p>' : '') +
        '<details class="proof-sec" style="margin-top:10px"><summary>Every Membership<span>' + (D.members || []).length + '</span></summary>' + ((D.members || []).map(rowH).join('') || '<p class="muted">Memberships show here.</p>') + '</details>' +
        '<details class="proof-sec"><summary>Organization Packs and Gifts<span>' + (D.packs || []).length + '</span></summary>' + ((D.packs || []).map(function (x) {
          return '<div class="list-row"><div class="lr-main"><b>' + esc(x.email || 'No email yet') + '</b> <span class="pill">' + esc(KIND[x.kind]) + '</span><br><small class="muted">' + (x.code ? (x.used || 0) + ' of ' + (x.seats || 0) + ' seats used' : 'Its code goes out once Membership on the Account is live') + ' &middot; ' + esc(x.on ? 'Through ' + day(x.ends) : 'Ended') + '</small></div></div>';
        }).join('') || '<p class="muted">Packs show here.</p>') + '</details>' +
        '<details class="proof-sec"><summary>Renewals in the Next 30 Days<span>' + ((D.renewals && D.renewals.soon) || []).length + '</span></summary>' + (((D.renewals && D.renewals.soon) || []).map(function (x) { return '<div class="list-row"><div class="lr-main"><b>' + esc(x.email) + '</b> <span class="pill">' + esc(KIND[x.kind] || x.kind) + '</span><br><small class="muted">' + esc((x.auto ? 'Renews ' : 'Ends ') + day(x.ends)) + '</small></div></div>'; }).join('') || '<p class="muted">None in the next 30 days.</p>') + '</details>' +
        '<details class="proof-sec"><summary>Ended in the Last 30 Days<span>' + ((D.renewals && D.renewals.ended) || []).length + '</span></summary>' + (((D.renewals && D.renewals.ended) || []).map(function (x) { return '<div class="list-row"><div class="lr-main"><b>' + esc(x.email) + '</b> <span class="pill">' + esc(KIND[x.kind] || x.kind) + '</span><br><small class="muted">' + esc('Ended ' + day(x.ends)) + (x.why === 'failed' ? ' &middot; payment waiting' : '') + '</small></div></div>'; }).join('') || '<p class="muted">None in the last 30 days.</p>') + '</details>' +
        ((D.sealed || []).length ? '<details class="proof-sec"><summary>Member Codes on Accounts<span>' + D.sealed.length + '</span></summary>' + D.sealed.map(function (x) { return '<div class="list-row"><div class="lr-main"><b>Code ' + esc(x.tag) + '</b><br><small class="muted">' + x.accounts + (x.accounts === 1 ? ' account' : ' accounts') + '</small></div></div>'; }).join('') + '</details>' : '') +
        '<p class="muted" style="font-size:14px;margin-top:10px">Stripe: ' + (setup.webhook ? 'connected' : 'waiting for the webhook secret') + ', ' + (setup.stripeKey ? 'key ready' : 'waiting for the key') + ', ' + (setup.kinds || 0) + ' prices named, ' + (setup.events || 0) + ' events so far. Membership emails: ' + (setup.live ? 'on' : 'waiting for go live') + '.</p>';
    }
    mH += '</div>';
    var sfp = D && D.key ? D.key.fp : '', match = !!(sfp && S.fp && sfp === S.fp);
    var kH = key ? '<div class="card" id="ma-key" style="border-left:4px solid ' + (D ? (match ? 'var(--sage)' : 'var(--gold)') : 'var(--line)') + '"><h3>The Member Key on the Server</h3>' +
      '<p class="muted">Membership on the Account opens Membership from the server\'s copy of the Member key. After each Rotate Member, once the new lib-member.js is uploaded, give the server the new key.</p>' +
      '<p style="margin-top:8px">This device: <b>' + esc(S.fp || '...') + '</b>' + (D ? '<br>The server: <b>' + esc(sfp || 'no key yet') + '</b>' : '') + '</p>' +
      (D ? '<p style="margin-top:6px"><b>' + (match ? 'They match. Membership on the Account opens with this key.' : 'The server needs this device\'s Member key. Follow the steps below.') + '</b></p>' : '<p class="muted">Tap See Members to compare.</p>') +
      '<ol class="acc-steps"><li>Tap Copy the Member Key.</li><li>In Cloudflare: Workers and Pages, gg-accounts, Settings, Variables and Secrets.</li><li>Find MEMBER_KEY and tap Edit (the first time: Add, type Secret, name MEMBER_KEY). Paste, then Deploy.</li><li>Copy any other word, so the key leaves your clipboard.</li><li>Come back and tap Refresh: the two lines above match.</li></ol>' +
      '<p class="muted" style="font-size:14px">The Member key is a secret: paste it only into Cloudflare, never in a chat or an email.</p>' +
      '<div class="row" style="margin-top:10px"><button class="btn btn-gold btn-sm" data-act="ma-copykey">Copy the Member Key</button></div></div>'
      : '<div class="card"><h3>The Member Key on the Server</h3><p class="muted">This device opens the Member key once the Founder update with the Member key is applied.</p></div>';
    return '<div class="page-head"><div class="eyebrow">Founder &middot; Chris and Kayti only</div><h1>Membership on the Account</h1><p>Members, seats, and renewals, and the Member key for the server.</p></div>' + keyH + mH + kH;
  }

  function act(a) {
    if (a === 'ma-mkkey') { makeKey().then(function (r) { S.pub = r.pub; paint(); }, function () { S.err = 'This browser could not make a key. Try Safari or Chrome, up to date.'; paint(); }); return true; }
    if (a === 'ma-copypub') { if (S.pub) copy(S.pub, 'pub'); return true; }
    if (a === 'ma-load') { load(); return true; }
    if (a === 'ma-copykey') {
      var k = C && C.mKey ? C.mKey() : '';
      if (k && window.confirm('Copy the Member key? Paste it only into Cloudflare, as the secret MEMBER_KEY.')) copy(k, 'key');
      return true;
    }
    return false;
  }

  window.GGMa = {
    init: function (ctx) { C = ctx || {}; if (subtle) signKey().then(function (k) { if (k && k.pub) { S.pub = k.pub; paint(); } }); },
    card: function () { return { k: 'macct', title: 'Membership on the Account', desc: 'Members, organization seats, and renewals from the Grounded server, and the Member key for Cloudflare.' }; },
    view: view,
    act: act,
    _state: S
  };
})();
