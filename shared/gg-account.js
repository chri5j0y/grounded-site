/* =====================================================================
   GROUNDED ACCOUNT (shared/gg-account.js), GWG BLD 938 Accounts and Sync, stage 1
   One email and password opens Grounded on every device. Everything is locked on this device before it leaves,
   so the server (api.growwithgrounded.com, grounded-workshop worker/) only ever holds locked boxes.
   Plan: grounded-workshop patches/plan/accounts-plan.md and patches/plan/accounts/server-spec.md.
   Stage 2 wiring: grounded-workshop patches/bld938/STAGE2.md.

   The keys (all made here, with WebCrypto; PBKDF2 SHA-256 250,000 rounds and AES-GCM 256, as profiles today)
     password -> PBKDF2(pw_salt) -> M;  M -> HKDF "gg-acct-v1 lock" -> LK (never sent);  "gg-acct-v1 proof" -> P (sent)
     Root Words -> PBKDF2(root_salt) -> R;  R -> HKDF "gg-acct-v1 root lock" -> RK;  "gg-acct-v1 root proof" -> RP
     AK, the account key: 32 random bytes made once at sign up, kept on the server only inside pw_box (LK) and root_box (RK)
     AK -> HKDF "gg-acct-v1 data" -> DK (locks every box);  "gg-acct-v1 names" -> NK (names every box)
     An ECDH P-256 key pair: the public key sits on the server in the open, the private key inside priv_box (DK).
     It lets a household member hand a shared space key to this account, locked so only this account opens it.
   On this device the account keeps DK, NK, and the private key as non extractable keys in IndexedDB (gg-account):
   scripts can use them, and no script can read them. AK lives only in memory during sign up, a new password,
   and Root Words. Signing out (or a sign out from another device) forgets them here.

   For tools and stage 2
     GGAccount.config({api, turnstile})   where the server is (default https://api.growwithgrounded.com/v1 on the site)
     GGAccount.ready                     promise, resolves once a saved sign in is loaded
     GGAccount.state()                   'out', 'in', or 'offline' (signed in here, server out of reach)
     GGAccount.info()                    {accountId, email, confirmed} or null
     GGAccount.on(fn)                    fn(type, detail): 'state', 'confirmed', 'erase', 'household'
     GGAccount.signUp({email, password, agree}) -> {words}  (show the 12 Root Words once)
     GGAccount.signIn({email, password})
     GGAccount.signOut({erase})          erase: Erase This Device Too (GGAccount emits 'erase' with the carried docs)
     GGAccount.confirm(token), resend(), forgot(email)
     GGAccount.recover({token, words, password}), startFresh(token), keep(token)
     GGAccount.changePassword({old, password, keepDevices})
     GGAccount.rootWords({password}) -> words;  newRootWords({password}) -> words
     GGAccount.changeEmail({email, password})
     GGAccount.account(), devices(), signOutDevice(id, password)
     GGAccount.exportData(password) -> the export object (every box still locked; GGAccount.openExport opens it here)
     GGAccount.deleteAccount({password, confirm: 'DELETE', erase})
     GGAccount.household.get(), create(), invite(email), join(token), remove(accountId), leave(), cancelInvite(email), end()
     GGAccount.readHash()                #confirm=, #recover=, #keep=, #join= from the address, cleared at once
     GGAccount.member()                  Build 3 seam: Membership on the account (null until then)
   No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGAccount) return;
  var V = 'b938', ROUNDS = 250000, KDF = 'pbkdf2-sha256-250000';
  var TERMS_V = '2026-10-28', PRIVACY_V = '2026-10-28';   // stage 2 moves these to the launch date with gg-profiles.js
  var subtle = window.crypto && crypto.subtle, enc = new TextEncoder(), dec = new TextDecoder();
  var site = /(^|\.)growwithgrounded\.com$/.test(location.hostname);
  var CFG = { api: window.GG_ACCOUNT_API || (site ? 'https://api.growwithgrounded.com/v1' : ''), turnstile: null };

  /* ---------- bytes ---------- */
  function b64u(u8) { u8 = u8 instanceof Uint8Array ? u8 : new Uint8Array(u8); var s = ''; for (var i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function unb64u(s) { s = String(s || '').replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function rand(n) { return crypto.getRandomValues(new Uint8Array(n)); }
  function cat() { var n = 0, i, a = arguments; for (i = 0; i < a.length; i++) n += a[i].length; var o = new Uint8Array(n), p = 0; for (i = 0; i < a.length; i++) { o.set(a[i], p); p += a[i].length; } return o; }
  function wipe(u8) { try { if (u8 && u8.fill) u8.fill(0); } catch (e) {} }

  /* ---------- the key steps (Section 2 of the server spec) ---------- */
  function normPass(p) { return String(p == null ? '' : p).normalize('NFKC'); }
  function pbkdf(secret, salt) {
    return subtle.importKey('raw', enc.encode(secret), 'PBKDF2', false, ['deriveBits']).then(function (k) {
      return subtle.deriveBits({ name: 'PBKDF2', salt: salt, iterations: ROUNDS, hash: 'SHA-256' }, k, 256);
    }).then(function (b) { return new Uint8Array(b); });
  }
  function hkdfBase(m) { return subtle.importKey('raw', m, 'HKDF', false, ['deriveBits', 'deriveKey']); }
  function hk(info) { return { name: 'HKDF', hash: 'SHA-256', salt: new Uint8Array(0), info: enc.encode(info) }; }
  function hkBits(base, info) { return subtle.deriveBits(hk(info), base, 256).then(function (b) { return new Uint8Array(b); }); }
  function hkAes(base, info) { return subtle.deriveKey(hk(info), base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']); }
  function hkMac(base, info) { return subtle.deriveKey(hk(info), base, { name: 'HMAC', hash: 'SHA-256', length: 256 }, false, ['sign']); }
  // password + salt -> {lock: LK, proof: P (base64url)}
  function passKeys(password, salt) {
    return pbkdf(normPass(password), salt).then(function (m) {
      return hkdfBase(m).then(function (b) { wipe(m); return Promise.all([hkAes(b, 'gg-acct-v1 lock'), hkBits(b, 'gg-acct-v1 proof')]); });
    }).then(function (r) { return { lock: r[0], proof: b64u(r[1]) }; });
  }
  // Root Words: the full words, lowercase, one space between (typing is forgiving through GGRoot.parse)
  function phraseOf(words) {
    var list = Array.isArray(words) ? words : String(words || '').trim().split(/\s+/);
    if (window.GGRoot && !Array.isArray(words)) { var p = window.GGRoot.parse(words); if (p.bad && p.bad.length) throw kind('words', 'Look again at word ' + p.bad.join(', ') + ', then try again.'); list = p.words; }
    if (list.length !== 12) throw kind('words', 'Your Root Words are 12 words. Type all 12, in order.');
    return list.map(function (w) { return String(w).toLowerCase(); }).join(' ');
  }
  function rootKeys(words, salt) {
    return pbkdf(phraseOf(words), salt).then(function (m) {
      return hkdfBase(m).then(function (b) { wipe(m); return Promise.all([hkAes(b, 'gg-acct-v1 root lock'), hkBits(b, 'gg-acct-v1 root proof')]); });
    }).then(function (r) { return { lock: r[0], proof: b64u(r[1]) }; });
  }
  function akKeys(ak) {
    return hkdfBase(ak).then(function (b) { return Promise.all([hkAes(b, 'gg-acct-v1 data'), hkMac(b, 'gg-acct-v1 names')]); })
      .then(function (r) { return { DK: r[0], NK: r[1] }; });
  }
  // A lock: byte 1, then the 12 byte IV, then the ciphertext and tag. aad binds it to its place.
  function seal(key, bytes, aad) {
    var iv = rand(12);
    return subtle.encrypt({ name: 'AES-GCM', iv: iv, additionalData: enc.encode(aad) }, key, bytes).then(function (ct) { return cat(new Uint8Array([1]), iv, new Uint8Array(ct)); });
  }
  function open(key, u8, aad) {
    u8 = typeof u8 === 'string' ? unb64u(u8) : u8;
    if (!u8 || u8.length < 29 || u8[0] !== 1) return Promise.reject(kind('box'));
    return subtle.decrypt({ name: 'AES-GCM', iv: u8.subarray(1, 13), additionalData: enc.encode(aad) }, key, u8.subarray(13))
      .then(function (pt) { return new Uint8Array(pt); }, function () { throw kind('box'); });
  }
  function boxId(nk, name) { return subtle.sign('HMAC', nk, enc.encode(name)).then(function (s) { return b64u(new Uint8Array(s)).slice(0, 22); }); }
  var AAD = {
    pw: function (id) { return 'gg1|pw|' + id; }, root: function (id) { return 'gg1|root|' + id; }, priv: function (id) { return 'gg1|priv|' + id; },
    box: function (id, bid, ver) { return 'gg1|box|' + id + '|' + bid + '|' + ver; },
    sbox: function (sid, bid, ver) { return 'gg1|sbox|' + sid + '|' + bid + '|' + ver; },
    space: function (sid, acct) { return 'gg1|space|' + sid + '|' + acct; }
  };

  /* ---------- what goes inside a box: gzip of JSON {t, at, dev, data}, padded to the next 1 KB ---------- */
  function gz(u8, mode) {
    if (typeof CompressionStream === 'undefined') return Promise.resolve(null);
    var s = new Blob([u8]).stream().pipeThrough(mode ? new CompressionStream('gzip') : new DecompressionStream('gzip'));
    return new Response(s).arrayBuffer().then(function (b) { return new Uint8Array(b); });
  }
  function pack(obj) {
    var js = enc.encode(JSON.stringify(obj));
    return gz(js, true).then(function (z) {
      var body = z || js, flag = z ? 1 : 0, n = body.length, head = new Uint8Array(5);
      head[0] = flag; head[1] = n >>> 24 & 255; head[2] = n >>> 16 & 255; head[3] = n >>> 8 & 255; head[4] = n & 255;
      var total = Math.ceil((5 + n) / 1024) * 1024, out = new Uint8Array(total);
      out.set(head, 0); out.set(body, 5);
      return out;
    });
  }
  function unpack(u8) {
    if (u8.length < 5) return Promise.reject(kind('box'));
    var n = (u8[1] << 24 | u8[2] << 16 | u8[3] << 8 | u8[4]) >>> 0, body = u8.subarray(5, 5 + n);
    return (u8[0] === 1 ? gz(body, false) : Promise.resolve(body)).then(function (b) { return JSON.parse(dec.decode(b)); });
  }

  /* ---------- the server ---------- */
  function kind(why, msg, extra) { var e = new Error(msg || words(why)); e.why = why; if (extra) Object.keys(extra).forEach(function (k) { e[k] = extra[k]; }); return e; }
  // Kind words for each short answer from the server
  function words(why, sec) {
    return ({
      wait: 'Let us pause a moment. Try again ' + (sec ? 'in ' + (sec > 90 ? Math.ceil(sec / 60) + ' minutes' : sec + ' seconds') : 'in a little while') + '.',
      nomatch: 'Check the email and password, then try again, or choose Forgot My Password.',
      confirm: 'Confirm your email first. The link is in your inbox; Resend brings a new one.',
      expired: 'That link has finished its time. Ask for a new one and try again.',
      conflict: 'Another device saved first. Grounded is bringing both together.',
      big: 'That is larger than one box holds.',
      full: 'Your account is full. Remove something you no longer need, then try again.',
      offline: 'Grounded keeps working on this device, and your changes send when the connection returns.',
      taken: 'This email already has a Grounded Account. Sign in, or choose Forgot My Password.',
      email: 'Check the email address and try again.',
      recent: 'Type your password once more to keep going.',
      signin: 'Sign in again to keep going.',
      human: 'Please try that once more.',
      words: 'Check each of your Root Words and try again.',
      box: 'One locked box looked changed on the way here, so this device keeps its own copy, safe and whole.',
      setup: 'Accounts are getting ready. Grounded keeps working on this device.',
      owner: 'The person who started the Household can do that.',
      household: 'Join or start a Household first.',
      member: 'A Household opens with Household Membership.',
      other: 'This invite is for another email. Sign in with the invited email to join.',
      exists: 'That is already set up.',
      joined: 'That person is already in your Household.',
      server: 'Something went wrong on our side. Try again in a little while.'
    })[why] || 'Something went wrong. Try again in a little while.';
  }
  function api(method, path, body, opt) {
    opt = opt || {};
    if (!CFG.api) return Promise.reject(kind('setup'));
    var h = { 'X-GG-Client': '1' };
    if (body != null && !(body instanceof Uint8Array)) h['Content-Type'] = 'application/json';
    if (body instanceof Uint8Array) h['Content-Type'] = 'application/octet-stream';
    if (opt.headers) Object.keys(opt.headers).forEach(function (k) { h[k] = opt.headers[k]; });
    var tries = opt.tries || (method === 'GET' ? 3 : 1), n = 0;
    function go() {
      n++;
      return fetch(CFG.api + path, { method: method, credentials: 'include', headers: h, body: body == null ? undefined : body instanceof Uint8Array ? body : JSON.stringify(body), cache: 'no-store' })
        .then(function (r) {
          setNet(true);
          if (opt.raw && r.ok) return r;
          return r.text().then(function (t) {
            var j = null; try { j = t ? JSON.parse(t) : {}; } catch (e) { j = { ok: false, why: 'server' }; }
            if (!r.ok || (j && j.ok === false)) {
              var w = (j && j.why) || 'server', e = kind(w, words(w, j && j.seconds), { status: r.status, seconds: j && j.seconds, ver: j && j.ver, gone: j && j.gone, body: j });
              if (r.status === 401 && w === 'signin' && !opt.quiet401) lost();
              throw e;
            }
            return j;
          });
        }, function () {
          setNet(false);
          if (n < tries) return new Promise(function (ok) { setTimeout(ok, 400 * n * n); }).then(go);
          throw kind('offline');
        });
    }
    return go();
  }

  /* ---------- this device's store (IndexedDB gg-account) ---------- */
  function idb() { return new Promise(function (res, rej) { var r = indexedDB.open('gg-account', 1); r.onupgradeneeded = function () { r.result.createObjectStore('k'); }; r.onsuccess = function () { res(r.result); }; r.onerror = function () { rej(r.error); }; }); }
  function kv(mode, fn) { return idb().then(function (db) { return new Promise(function (res, rej) { var t = db.transaction('k', mode), s = t.objectStore('k'), out = fn(s); t.oncomplete = function () { db.close(); res(out && out.result); }; t.onerror = function () { db.close(); rej(t.error); }; }); }); }
  function kGet() { return kv('readonly', function (s) { return s.get('acct'); }).catch(function () { return null; }); }
  function kPut(v) { return kv('readwrite', function (s) { s.put(v, 'acct'); }); }
  function kDel() { return kv('readwrite', function (s) { s.delete('acct'); }).catch(function () {}); }

  /* ---------- state ---------- */
  var A = null, net = true, subs = [];
  function emit(type, detail) { subs.slice().forEach(function (fn) { try { fn(type, detail); } catch (e) { console.error(e); } }); }
  function state() { return !A ? 'out' : net ? 'in' : 'offline'; }
  function setNet(v) { if (v !== net) { net = v; emit('state', state()); } }
  function info() { return A ? { accountId: A.accountId, email: A.email, confirmed: !!A.confirmed } : null; }
  // signed out from somewhere else (Sign Out That Device, a new password, Delete My Account on another device)
  function lost() { if (!A) return; A = null; kDel().then(function () { if (window.GGSync && GGSync.forget) return GGSync.forget(); }).then(function () { emit('state', 'out'); }); }
  function deviceTag() { try { var t = localStorage.getItem('gg-device-tag'); if (!t) { t = b64u(rand(18)); localStorage.setItem('gg-device-tag', t); } return t; } catch (e) { return ''; } }
  function deviceName() {
    var u = navigator.userAgent || '', p = /iPhone/.test(u) ? 'iPhone' : /iPad/.test(u) || (/Macintosh/.test(u) && navigator.maxTouchPoints > 1) ? 'iPad' : /Android/.test(u) ? 'Android' : /Macintosh|Mac OS X/.test(u) ? 'Mac' : /Windows/.test(u) ? 'Windows' : /CrOS/.test(u) ? 'Chromebook' : /Linux/.test(u) ? 'Linux' : 'A device';
    var b = /Edg\//.test(u) ? 'Edge' : /Firefox\//.test(u) ? 'Firefox' : /CriOS|Chrome\//.test(u) ? 'Chrome' : /Safari\//.test(u) ? 'Safari' : 'Browser';
    return p + ', ' + b;
  }
  function dev() { return { name: deviceName(), tag: deviceTag() }; }

  // AK in hand: make DK and NK, open the private key, and keep them here, non extractable
  function keep(ak, o) {
    return akKeys(ak).then(function (k) {
      return open(k.DK, o.priv_box, AAD.priv(o.accountId)).then(function (pj) {
        var jwk = JSON.parse(dec.decode(pj)); wipe(pj);
        return subtle.importKey('jwk', jwk, { name: 'ECDH', namedCurve: 'P-256' }, false, ['deriveBits']);
      }).then(function (priv) {
        A = { v: 1, accountId: o.accountId, email: o.email, confirmed: !!o.confirmed, DK: k.DK, NK: k.NK, priv: priv, pub: o.pub, at: Date.now() };
        return kPut(A);
      });
    }).then(function () { net = true; emit('state', 'in'); return info(); });
  }

  function okPassword(p) {
    p = normPass(p);
    if (p.length < 10) throw kind('weak', 'Choose a password of at least 10 characters. A short phrase of four or more words is strong and easy to remember.');
    return p;
  }
  function needRoot() {
    if (window.GGRoot) return Promise.resolve(window.GGRoot);
    return new Promise(function (ok, no) {
      var s = document.createElement('script'); s.src = (site ? '' : (CFG.home || '')) + '/shared/gg-rootwords.js?v=b788';
      s.onload = function () { window.GGRoot ? ok(window.GGRoot) : no(kind('setup')); }; s.onerror = function () { no(kind('offline')); };
      document.head.appendChild(s);
    });
  }

  /* ---------- sign up, sign in, sign out ---------- */
  function signUp(o) {
    o = o || {};
    var email = String(o.email || '').trim(), pw;
    try { pw = okPassword(o.password); } catch (e) { return Promise.reject(e); }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Promise.reject(kind('email'));
    if (o.agree === false) return Promise.reject(kind('agree', 'Check the box to agree to the Terms of Use and the Privacy Policy.'));
    var id = b64u(rand(16)), ak = rand(32), pwSalt = rand(16), rootSalt = rand(16), words, P, R, K, pair;
    return needRoot().then(function (G) {
      words = G.make();
      return Promise.all([passKeys(pw, pwSalt), rootKeys(words, rootSalt), akKeys(ak), subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits'])]);
    }).then(function (r) {
      P = r[0]; R = r[1]; K = r[2]; pair = r[3];
      return Promise.all([subtle.exportKey('jwk', pair.privateKey), subtle.exportKey('jwk', pair.publicKey)]);
    }).then(function (j) {
      var pub = { kty: 'EC', crv: 'P-256', x: j[1].x, y: j[1].y };
      return Promise.all([seal(P.lock, ak, AAD.pw(id)), seal(R.lock, ak, AAD.root(id)), seal(K.DK, enc.encode(JSON.stringify(j[0])), AAD.priv(id))]).then(function (b) {
        return api('POST', '/auth/signup', { accountId: id, email: email, pw_salt: b64u(pwSalt), proof: P.proof, pw_box: b64u(b[0]), root_salt: b64u(rootSalt), root_proof: R.proof, root_box: b64u(b[1]), pub: pub, priv_box: b64u(b[2]), device: dev(), terms_v: TERMS_V, privacy_v: PRIVACY_V, turnstile: o.turnstile }).then(function () {
          return keep(ak, { accountId: id, email: email, confirmed: false, priv_box: b[2], pub: pub });
        });
      });
    }).then(function () {
      return putSmall('acct:rootwords', { words: words.join(' ') });
    }).then(function () { wipe(ak); return { words: words.slice() }; });
  }
  function signIn(o) {
    o = o || {};
    var email = String(o.email || '').trim(), pw = normPass(o.password), P;
    return api('POST', '/auth/start', { email: email }).then(function (s) {
      return passKeys(pw, unb64u(s.salt));
    }).then(function (p) {
      P = p;
      return api('POST', '/auth/finish', { email: email, proof: P.proof, device: dev() });
    }).then(function (r) {
      return open(P.lock, r.pw_box, AAD.pw(r.accountId)).then(function (ak) {
        return keep(ak, { accountId: r.accountId, email: r.email || email, confirmed: r.confirmed, priv_box: r.priv_box, pub: r.pub }).then(function (i) { wipe(ak); return i; });
      });
    });
  }
  // Sign out here. erase: Erase This Device Too (the carried docs go to 'erase' listeners, which remove them here).
  function signOut(o) {
    o = o || {};
    var carried = window.GGSync && GGSync.carried ? GGSync.carried() : [];
    return api('POST', '/auth/signout', {}, { quiet401: true }).catch(function () {}).then(function () { return forgetHere(o.erase, carried); });
  }
  function forgetHere(erase, carried) {
    A = null;
    return kDel().then(function () { if (window.GGSync && GGSync.forget) return GGSync.forget(); }).then(function () {
      if (erase) emit('erase', { docs: carried || [] });
      emit('state', 'out');
    });
  }

  /* ---------- email ---------- */
  function confirm(token) { return api('POST', '/email/confirm', { token: token }).then(function (r) { if (A) { A.confirmed = true; kPut(A); } emit('confirmed', true); return r; }); }
  function resend(o) { return api('POST', '/email/resend', { turnstile: o && o.turnstile }); }
  function account() {
    return api('GET', '/account').then(function (r) {
      if (A && (r.confirmed !== A.confirmed || r.email !== A.email)) { A.confirmed = r.confirmed; A.email = r.email; kPut(A); if (r.confirmed) emit('confirmed', true); }
      return r;
    });
  }

  /* ---------- Forgot My Password, Root Words, Start Fresh ---------- */
  function forgot(email, o) { return api('POST', '/recover/start', { email: String(email || '').trim(), turnstile: o && o.turnstile }); }
  function recover(o) {
    var pw, R, ak;
    try { pw = okPassword(o.password); } catch (e) { return Promise.reject(e); }
    return needRoot().then(function () { return api('POST', '/recover/open', { token: o.token }); }).then(function (r) {
      return rootKeys(o.words, unb64u(r.root_salt)).then(function (rk) {
        R = rk;
        return open(R.lock, r.root_box, AAD.root(r.accountId)).catch(function () { throw kind('words'); });
      }).then(function (a) {
        ak = a;
        var salt = rand(16);
        return passKeys(pw, salt).then(function (P) {
          return seal(P.lock, ak, AAD.pw(r.accountId)).then(function (box) {
            return api('POST', '/recover/finish', { token: o.token, root_proof: R.proof, pw_salt: b64u(salt), proof: P.proof, pw_box: b64u(box), device: dev() });
          });
        });
      }).then(function (f) {
        return keep(ak, { accountId: f.accountId, email: f.email, confirmed: true, priv_box: f.priv_box, pub: f.pub });
      }).then(function (i) { wipe(ak); return i; });
    });
  }
  function startFresh(token) { return api('POST', '/recover/fresh', { token: token, confirm: 'START FRESH' }); }
  function keepAcct(token) { return api('POST', '/recover/keep', { token: token }); }

  /* ---------- the password and Root Words ---------- */
  // Opens AK with the password, on this device (the server only answers with locked boxes)
  function akFromPassword(password) {
    if (!A) return Promise.reject(kind('signin'));
    var P;
    return api('POST', '/auth/start', { email: A.email }).then(function (s) { return passKeys(password, unb64u(s.salt)); }).then(function (p) {
      P = p; return api('GET', '/keys');
    }).then(function (k) {
      return open(P.lock, k.pw_box, AAD.pw(A.accountId)).then(function (ak) { return { ak: ak, proof: P.proof }; }, function () { throw kind('nomatch', 'Check your password and try again.'); });
    });
  }
  function changePassword(o) {
    var pw; try { pw = okPassword(o.password); } catch (e) { return Promise.reject(e); }
    return akFromPassword(o.old).then(function (x) {
      var salt = rand(16);
      return passKeys(pw, salt).then(function (P) {
        return seal(P.lock, x.ak, AAD.pw(A.accountId)).then(function (box) {
          wipe(x.ak);
          return api('POST', '/account/password', { proof_old: x.proof, pw_salt: b64u(salt), proof: P.proof, pw_box: b64u(box), keep_devices: !!o.keepDevices });
        });
      });
    });
  }
  function rootWords(o) {
    return akFromPassword(o.password).then(function (x) { wipe(x.ak); return getSmall('acct:rootwords'); }).then(function (v) { return v && v.words ? v.words.split(' ') : null; });
  }
  function newRootWords(o) {
    var words;
    return needRoot().then(function (G) { words = G.make(); return akFromPassword(o.password); }).then(function (x) {
      var salt = rand(16);
      return rootKeys(words, salt).then(function (R) {
        return seal(R.lock, x.ak, AAD.root(A.accountId)).then(function (box) {
          wipe(x.ak);
          return api('POST', '/account/root', { proof: x.proof, root_salt: b64u(salt), root_proof: R.proof, root_box: b64u(box) });
        });
      });
    }).then(function () { return putSmall('acct:rootwords', { words: words.join(' ') }, true); }).then(function () { return words.slice(); });
  }
  function proofOf(password) {
    if (!A) return Promise.reject(kind('signin'));
    return api('POST', '/auth/start', { email: A.email }).then(function (s) { return passKeys(password, unb64u(s.salt)); }).then(function (P) { return P.proof; });
  }
  function changeEmail(o) { return proofOf(o.password).then(function (p) { return api('POST', '/account/email', { email: o.email, proof: p }); }); }

  /* ---------- small account boxes (acct:rootwords, acct:settings): one box, newest wins ---------- */
  function putSmall(name, data, replace) {
    if (!A) return Promise.reject(kind('signin'));
    return boxId(A.NK, 'a|' + name).then(function (id) {
      var tryPut = function (ver) {
        return pack({ t: name, at: Date.now(), dev: deviceTag().slice(0, 8), data: data }).then(function (p) { return seal(A.DK, p, AAD.box(A.accountId, id, ver + 1)); }).then(function (u8) {
          return api('PUT', '/boxes/' + id, u8, { headers: ver ? { 'If-Match': '"' + ver + '"' } : { 'If-None-Match': '*' } });
        });
      };
      // a box already there (or its delete marker): write the next version over it
      return tryPut(0).catch(function (e) { if (e.why === 'conflict') return tryPut(e.ver || 0); throw e; });
    });
  }
  function getSmall(name) {
    if (!A) return Promise.reject(kind('signin'));
    return boxId(A.NK, 'a|' + name).then(function (id) {
      return api('GET', '/boxes/' + id, null, { raw: true }).then(function (r) {
        var ver = +r.headers.get('X-GG-Ver');
        return r.arrayBuffer().then(function (b) { return open(A.DK, new Uint8Array(b), AAD.box(A.accountId, id, ver)); }).then(unpack).then(function (j) {
          if (j.t !== name) throw kind('box');
          return j.data;
        });
      });
    });
  }

  /* ---------- devices, export, delete ---------- */
  function devices() { return api('GET', '/devices').then(function (r) { return r.devices; }); }
  function withRecent(password, fn) {
    return fn().catch(function (e) {
      if (e.why !== 'recent' || !password) throw e;
      return proofOf(password).then(function (p) { return api('POST', '/auth/recent', { proof: p }); }).then(fn);
    });
  }
  // Sign Out That Device. Signing out this very device here forgets the keys here too.
  function signOutDevice(id, password) {
    return withRecent(password, function () { return api('DELETE', '/devices/' + encodeURIComponent(id)); }).then(function (r) {
      return devices().then(function () { return r; }, function () { return r; });
    });
  }
  function exportData(password) { return withRecent(password, function () { return api('GET', '/export'); }); }
  // Opens an export on this device: every box this account can name, with its contents
  function openExport(x) {
    if (!A) return Promise.reject(kind('signin'));
    return Promise.all((x.boxes || []).map(function (b) {
      return open(A.DK, b.data, AAD.box(A.accountId, b.id, b.ver)).then(unpack).then(function (j) { return { id: b.id, name: j.t, at: j.at, data: j.data }; }, function () { return { id: b.id, locked: true }; });
    }));
  }
  function deleteAccount(o) {
    o = o || {};
    if (o.confirm !== 'DELETE') return Promise.reject(kind('confirm', 'Type DELETE to confirm.'));
    var carried = window.GGSync && GGSync.carried ? GGSync.carried() : [];
    return proofOf(o.password).then(function (p) {
      return api('DELETE', '/account', { proof: p, confirm: 'DELETE' }).catch(function (e) { if (e.why === 'nomatch') throw kind('nomatch', 'Check your password and try again.'); throw e; });
    }).then(function () { return forgetHere(!!o.erase, carried); }).then(function () { return { ok: true }; });
  }

  /* ---------- Household ---------- */
  var household = {
    get: function () { return api('GET', '/household').then(function (r) { return r.household; }); },
    create: function () { return api('POST', '/household', {}).then(function (r) { emit('household', 'create'); return r; }); },
    invite: function (email, o) { return api('POST', '/household/invite', { email: email, turnstile: o && o.turnstile }); },
    join: function (token) { return api('POST', '/household/join', { token: token }).then(function (r) { emit('household', 'join'); if (window.GGSync) GGSync.sync().catch(function () {}); return r; }); },
    // The payer removes someone: each shared space gets a new key, so only the people still in the Household hold it.
    remove: function (accountId) {
      return api('DELETE', '/household/people/' + encodeURIComponent(accountId)).then(function (r) {
        emit('household', 'remove');
        return (window.GGSync && GGSync.rekeyAll ? GGSync.rekeyAll() : Promise.resolve()).then(function () { return r; });
      });
    },
    leave: function () { if (!A) return Promise.reject(kind('signin')); return api('DELETE', '/household/people/' + encodeURIComponent(A.accountId)).then(function (r) { emit('household', 'leave'); if (window.GGSync) GGSync.leftHousehold(); return r; }); },
    cancelInvite: function (email) { return api('DELETE', '/household/invites/' + encodeURIComponent(email)); },
    end: function () { return api('DELETE', '/household').then(function (r) { emit('household', 'end'); if (window.GGSync) GGSync.leftHousehold(); return r; }); }
  };

  /* ---------- the address: #confirm=, #recover=, #keep=, #join= ---------- */
  function readHash() {
    var m = /#(confirm|recover|keep|join)=([A-Za-z0-9_-]{43})/.exec(location.hash || '');
    if (!m) return null;
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { location.hash = ''; }
    return { kind: m[1], token: m[2] };
  }

  /* ---------- for GGSync (same page only) ---------- */
  var inner = {
    keys: function () { return A ? { accountId: A.accountId, DK: A.DK, NK: A.NK, priv: A.priv, pub: A.pub } : null; },
    api: api, seal: seal, open: open, pack: pack, unpack: unpack, boxId: boxId, AAD: AAD, b64u: b64u, unb64u: unb64u, rand: rand, hkdfBase: hkdfBase, hkAes: hkAes, hkMac: hkMac, kind: kind, words: words, deviceTag: deviceTag
  };

  var readyP = kGet().then(function (v) { if (v && v.DK && v.accountId) { A = v; emit('state', 'in'); } }).catch(function () {}).then(function () { return info(); });

  window.GGAccount = {
    v: V, KDF: KDF, ready: readyP, state: state, info: info, on: function (fn) { subs.push(fn); return function () { subs = subs.filter(function (f) { return f !== fn; }); }; },
    config: function (o) { Object.keys(o || {}).forEach(function (k) { CFG[k] = o[k]; }); return CFG; },
    signUp: signUp, signIn: signIn, signOut: signOut, confirm: confirm, resend: resend, account: account,
    forgot: forgot, recover: recover, startFresh: startFresh, keep: keepAcct,
    changePassword: changePassword, rootWords: rootWords, newRootWords: newRootWords, changeEmail: changeEmail,
    devices: devices, signOutDevice: signOutDevice, exportData: exportData, openExport: openExport, deleteAccount: deleteAccount,
    household: household, readHash: readHash, words: words, health: function () { return api('GET', '/health', null, { tries: 1 }); },
    member: function () { return null; },   // Build 3: Membership on the account (GET /account answers member)
    _: inner
  };
})();
