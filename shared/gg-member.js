/* =====================================================================
   GROUNDED MEMBERSHIP (shared/gg-member.js), GWG BLD 908.
   (c) 2026 Grow With Grounded LLC.
   Membership opens with a code, the way the Field Guide does. The Member content lives in one sealed file,
   field-guide/lib-member.js, which Chris seals in the Field Guide (Founder tab) and uploads beside the other libraries:
     window.GFG_MEMBER = {v: 1, made, rev,
       ws: <the shared wrap salt, base64 of 16 bytes>,
       wraps: [{c, iv, ct}],   the Member lock key, locked by each code that opens Membership (PBKDF2 SHA-256,
                               250,000 rounds with ws, then AES-GCM 256); inside each wrap: {k, kind, ends}
       lock: {iv, ct}}         AES-GCM 256 of the Member library JSON:
                               {_gfg: 'member', _rev, tend, meditation, spirit, relationships, growth, seasons,
                                storiesKey: {key}, audio: {v, round, folder: 'm', key}}
     Before the first seal it holds {v: 1, pending: true}, and everyone sees Start.
   Codes: Member, Household, Organization (Member seats), Staff, and Founder codes carry a Member wrap. Guide and Supporter
   codes carry none (Chris: "guide is different from member."). A code is never carried in a link.
   On this device: once a code opens it, the lock key is kept in IndexedDB (gg-member) as a non-extractable CryptoKey,
   like Heartwood: scripts can use it, no script can read it, and nothing is sent anywhere. Beside it a small record
   {c (the wrap tag), kind, ends, at}. Membership belongs to the device, so every profile on it has the full suite;
   answers stay in each person's own locked profile. Where IndexedDB is closed (some private windows), the key lives
   for this visit only and the sheet asks again next time.
   Each visit: lib-member.js is read fresh; when the device's wrap tag is gone from wraps (Chris ended the code), its end
   date has passed, or the lock no longer opens with the kept key (a rotation), the device quietly returns to Start and
   the Membership card says Renew Membership.
   Open Membership on This Browser (Staff and Founders, from the Field Guide): /home/#mk=<lock key, base64url>&mt=<staff|
   founder>. The fragment never reaches a server; it is taken at once and cleared from the address bar. The key is kept
   the same way as a typed code's, with kind staff or founder and no wrap tag; a rotation ends it.

   The contract (APP codes against it):
     GGMember.ready                 Promise, settles once this device's Member state is known (never rejects)
     GGMember.has()                 true while Membership is open on this device
     GGMember.get(section)          the decrypted section ('tend', 'meditation', 'spirit', 'relationships', 'growth',
                                    'seasons', or any other top key) or null
     GGMember.clip(voice, text[, o]) Promise of a playable URL, or null: the public v1 clip for the same voice and sentence
                                    when one exists, otherwise the Member clip in folder m (a blob URL); o.pub true or false
                                    skips the public check; GGMember.clip(name) with a 32 hex Member clip name works too
     GGMember.open()                shows the "I Have a Code" sheet
     GGMember.on(fn)                fn(state) runs whenever the state changes; returns a function that stops it
   Also:
     GGMember.state()               {status: 'start'|'member'|'ended'|'renew', kind, ends, rev}
     GGMember.unlock(code)          Promise<{ok, kind?, why?}>; why: 'empty', 'nomatch', 'ended', 'none' (no Member library
                                    on the site yet), 'offline', 'crypto'
     GGMember.forget()              Forget Membership on This Device (Promise)
     GGMember.audio()               the Member clip key object {v, round, folder, key} for GGVoice.setKey, or null
     GGMember.tend(base)            base (window.GGTendPublic, the Start file) with the Member Tending folded in, or base
     GGMember.card(opts)            HTML for a Membership card (the Me sheet); its buttons work on any page
     GGMember.invite(o)             HTML for a quiet invitation card {title, line, eyebrow}; See Membership and I Have a Code
     GGMember.normCode(code)        how a typed code is read (spaces, dashes, and capitals do not matter)
     GGMember.lib()                 the whole decrypted library or null
     GGMember.carry()               Promise of {k, kind, ends, c, hand} for Move to Another Device, or null (GWG BLD 922)
     GGMember.adopt(o)              Promise<{ok, why?}>: opens Membership from a carried record when this device has none
   Move to Another Device (GWG BLD 922): when a code (or the Field Guide handoff) opens Membership, the lock key is also
   kept sealed for moving: AES-GCM 256 under a second non-extractable device key (IndexedDB, 'dev'), stored as 'carry'.
   carry() opens it only when someone asks to move a profile, and gg-profiles.js puts it inside that profile's locked move
   file (the profile's own key, behind the passcode). It never sits anywhere in clear text, never in a link or a QR code.
   On the other device adopt() checks it against lib-member.js (wrap tag, end date, the lock) and keeps it the same way.
   Membership opened before BLD 922 moves once the code is typed again on this device.
   Membership on the Account (GWG BLD 949, only while Accounts are live: shared/gg-profiles.js ACCOUNTS_LIVE): when this
   browser is signed in to a Grounded Account with Membership (paid through Stripe, a Household Membership in its
   Household, or a code entered while signed in), Membership opens here with no code. The account hands the Member lock
   key over locked to its own public key (GGAccount.memberKey); it is imported at once as a non extractable key and kept
   the same way as a typed code's, with rec.acct (the account id) and no wrap tag. Each visit (and on return after half an
   hour) the account is asked again: active keeps it open, ended returns this device to Start with Renew Membership, and
   signing out closes it here. A code typed while signed in attaches to the account (Worker checked, once per account; an
   organization code takes a seat); without an account, a code opens Membership on this device as before.
   Words: forward and plain. No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGMember && window.GGMember.__v) return;
  var V = 'b950', ROUNDS = 250000, DBN = 'gg-member', STORE = 'k', CLIP_BASE = 'https://audio.growwithgrounded.com/';
  var me = document.currentScript;
  var LIB = (me && me.getAttribute('data-lib')) || '/field-guide/lib-member.js';
  var SEE = (me && me.getAttribute('data-see')) || '/the-grounded-way.html#ways';
  var subtle = window.crypto && crypto.subtle, enc = new TextEncoder(), dec = new TextDecoder();
  var SECTIONS = ['tend', 'meditation', 'spirit', 'relationships', 'growth', 'seasons'];
  var KINDS = { member: 'Member', household: 'Household', org: 'Organization', staff: 'Staff', founder: 'Founder' };

  /* ---------- small helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function b64(u) { var s = ''; u = new Uint8Array(u); for (var i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); }
  function unb64(s) { s = String(s || '').replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function pad(n) { return String(n).padStart(2, '0'); }
  function today() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function nice(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || '')); return m ? MONTHS[+m[2] - 1] + ' ' + (+m[3]) + ', ' + m[1] : ''; }
  function normCode(code) { return String(code || '').normalize('NFKC').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean).join('-'); }

  /* ---------- the key on this device (IndexedDB, non-extractable) ---------- */
  var MEM = { key: null, rec: null }; // for this visit when IndexedDB is closed
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
        try {
          var t = d.transaction(STORE, mode), s = t.objectStore(STORE), out = fn(s);
          t.oncomplete = function () { try { d.close(); } catch (e) {} ok(out && 'result' in out ? out.result : true); };
          t.onerror = t.onabort = function () { try { d.close(); } catch (e) {} ok(null); };
        } catch (e) { ok(null); }
      });
    });
  }
  function keep(key, rec) {
    MEM.key = key; MEM.rec = rec;
    return idb('readwrite', function (s) { s.put(key, 'key'); s.put(rec, 'rec'); }).then(function (r) { return !!r; }, function () { return false; });
  }
  function kept() {
    return Promise.all([idb('readonly', function (s) { return s.get('key'); }), idb('readonly', function (s) { return s.get('rec'); })])
      .then(function (r) { return { key: r[0] || MEM.key, rec: r[1] || MEM.rec }; }, function () { return { key: MEM.key, rec: MEM.rec }; });
  }
  function keepRec(rec) { MEM.rec = rec; MEM.carry = null; return idb('readwrite', function (s) { s.put(rec, 'rec'); s.delete('key'); s.delete('carry'); }); }
  function wipe() { MEM.key = null; MEM.rec = null; MEM.carry = null; return idb('readwrite', function (s) { s.delete('key'); s.delete('rec'); s.delete('carry'); }); }

  /* ---------- the sealed copy for Move to Another Device (GWG BLD 922) ---------- */
  function devKey() {
    return idb('readonly', function (s) { return s.get('dev'); }).then(function (k) {
      if (k) return k;
      if (MEM.dev) return MEM.dev;
      return subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']).then(function (nk) {
        MEM.dev = nk; return idb('readwrite', function (s) { s.put(nk, 'dev'); }).then(function () { return nk; });
      });
    });
  }
  function keepCarry(raw, rec) {
    if (!subtle || typeof raw !== 'string' || !raw) return Promise.resolve(false);
    var o = { k: raw, kind: rec.kind || 'member', ends: rec.ends || '', c: rec.c || '', hand: rec.hand ? 1 : 0 };
    return devKey().then(function (dk) {
      var iv = crypto.getRandomValues(new Uint8Array(12));
      return subtle.encrypt({ name: 'AES-GCM', iv: iv }, dk, enc.encode(JSON.stringify(o))).then(function (ct) {
        var box = { iv: b64(iv), ct: b64(ct) }; MEM.carry = box;
        return idb('readwrite', function (s) { s.put(box, 'carry'); });
      });
    }).then(function () { return true; }, function () { return false; });
  }
  function carry() {
    if (!subtle || ST.status !== 'member' || !LIBR || (REC && REC.acct)) return Promise.resolve(null);
    return idb('readonly', function (s) { return s.get('carry'); }).then(function (box) {
      box = box || MEM.carry; if (!box || !box.ct) return null;
      return devKey().then(function (dk) { return subtle.decrypt({ name: 'AES-GCM', iv: unb64(box.iv) }, dk, unb64(box.ct)); })
        .then(function (pt) { var o = JSON.parse(dec.decode(pt)); return o && typeof o.k === 'string' && o.k ? o : null; });
    }).catch(function () { return null; });
  }
  function adopt(o) {
    if (!subtle) return Promise.resolve({ ok: false, why: 'crypto' });
    if (!o || typeof o.k !== 'string' || !o.k) return Promise.resolve({ ok: false, why: 'empty' });
    return ready.then(function () {
      if (ST.status === 'member' && LIBR) return { ok: true, already: true, kind: ST.kind };
      return loadLib(true).then(function (got) {
        var g = box();
        if (!g) return { ok: false, why: got === 'offline' ? 'offline' : 'none' };
        var rec = { c: String(o.c || ''), kind: KINDS[o.kind] ? o.kind : 'member', ends: String(o.ends || ''), at: Date.now() };
        if (o.hand) rec.hand = 1;
        if (ended(rec)) return { ok: false, why: 'ended' };
        if (!rec.hand && rec.c && !(g.wraps || []).some(function (w) { return w && w.c === rec.c; })) return { ok: false, why: 'ended' };
        return lockKey(o.k).then(function (key) {
          return openLock(key).then(function (lib) {
            KEYC = key; setOpen(lib, rec);
            return keep(key, rec).then(function () { return keepCarry(o.k, rec); }).then(function () { emit(); return { ok: true, kind: rec.kind }; });
          });
        }, function () { return { ok: false, why: 'nomatch' }; });
      });
    }).catch(function () { return { ok: false, why: 'renew' }; });
  }

  /* ---------- the Member library file ---------- */
  var libP = null;
  function box() { var g = window.GFG_MEMBER; return g && g.lock && g.lock.ct ? g : null; }
  function loadLib(fresh) {
    if (libP && !fresh) return libP;
    libP = new Promise(function (ok) {
      try {
        var s = document.createElement('script');
        s.src = LIB + (LIB.indexOf('?') < 0 ? '?' : '&') + 't=' + Date.now();
        s.onload = function () { ok(window.GFG_MEMBER ? 'ok' : 'missing'); };
        s.onerror = function () { ok(navigator.onLine === false ? 'offline' : 'missing'); };
        (document.head || document.documentElement).appendChild(s);
      } catch (e) { ok('missing'); }
    });
    return libP;
  }
  function openLock(key) {
    var g = box(); if (!g) return Promise.reject(new Error('none'));
    return subtle.decrypt({ name: 'AES-GCM', iv: unb64(g.lock.iv) }, key, unb64(g.lock.ct)).then(function (pt) { return JSON.parse(dec.decode(pt)); });
  }
  function codeKey(code, salt) {
    return subtle.importKey('raw', enc.encode(normCode(code)), 'PBKDF2', false, ['deriveKey']).then(function (base) {
      return subtle.deriveKey({ name: 'PBKDF2', salt: salt, iterations: ROUNDS, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    });
  }
  function lockKey(raw) { return subtle.importKey('raw', typeof raw === 'string' ? unb64(raw) : raw, { name: 'AES-GCM' }, false, ['decrypt']); }

  /* ---------- state ---------- */
  var ST = { status: 'start', kind: '', ends: '', rev: 0 }, LIBR = null, KEYC = null, FNS = [], REC = null;
  function state() { return { status: ST.status, kind: ST.kind, ends: ST.ends, rev: ST.rev }; }
  function emit() { var s = state(); FNS.slice().forEach(function (f) { try { f(s); } catch (e) {} }); try { document.dispatchEvent(new CustomEvent('gg-member', { detail: s })); } catch (e) {} paintCards(); }
  function setOpen(lib, rec) {
    LIBR = lib; TENDC = null; REC = rec || null;
    ST = { status: 'member', kind: rec.kind || 'member', ends: rec.ends || '', rev: +(lib && lib._rev) || 0 };
    try { var k = lib && lib.storiesKey && (lib.storiesKey.key || lib.storiesKey); if (k && typeof k === 'string') { if (window.GGStories && GGStories.remember) GGStories.remember(k); else localStorage.setItem('gg_stories_key', k); } } catch (e) {}
  }
  function setClosed(status, rec) { LIBR = null; KEYC = null; TENDC = null; REC = rec || null; ST = { status: status, kind: (rec && rec.kind) || '', ends: (rec && rec.ends) || '', rev: 0 }; }
  function ended(rec) { return !!(rec && rec.ends && rec.ends < today()); }

  // The Open Membership on This Browser handoff from the Field Guide: #mk=<key>&mt=<staff|founder>.
  function takeHandoff() {
    try {
      var h = location.hash || '', m = /(?:^|[#&])mk=([A-Za-z0-9_-]{40,46})(?:&|$)/.exec(h);
      if (!m) return null;
      var t = /(?:^|[#&])mt=(staff|founder)(?:&|$)/.exec(h);
      var rest = h.replace(/^#/, '').split('&').filter(function (p) { return p && p.indexOf('mk=') !== 0 && p.indexOf('mt=') !== 0; }).join('&');
      history.replaceState(history.state, '', location.pathname + location.search + (rest ? '#' + rest : ''));
      return { raw: m[1], kind: t ? t[1] : 'staff' };
    } catch (e) { return null; }
  }

  function boot() {
    if (!subtle) return Promise.resolve();
    var hand = takeHandoff();
    return kept().then(function (k) {
      if (hand) {
        return loadLib().then(function () {
          return lockKey(hand.raw).then(function (key) {
            return openLock(key).then(function (lib) {
              var rec = { c: '', kind: hand.kind, ends: '', at: Date.now(), hand: 1 };
              KEYC = key; setOpen(lib, rec); return keep(key, rec).then(function () { return keepCarry(hand.raw, rec); });
            });
          });
        }).catch(function () { return settle(k); });
      }
      return settle(k);
    }).catch(function () {});
  }
  // Decide from what this device kept.
  function settle(k) {
    var rec = k && k.rec;
    if (!rec) { setClosed('start'); return; }
    if (!k.key) { setClosed(rec.lapsed || 'ended', rec); return; }
    if (ended(rec)) { setClosed('ended', rec); return keepRec(Object.assign({}, rec, { lapsed: 'ended' })); }
    return loadLib().then(function (got) {
      var g = box();
      if (!g) {
        // The file could not be read this visit (offline, or no Member library yet): nothing changes on the device.
        setClosed('start', rec); return;
      }
      if (!rec.hand && rec.c && !(g.wraps || []).some(function (w) { return w && w.c === rec.c; })) { setClosed('ended', rec); return keepRec(Object.assign({}, rec, { lapsed: 'ended' })); }
      return openLock(k.key).then(function (lib) { KEYC = k.key; setOpen(lib, rec); }, function () { setClosed('renew', rec); return keepRec(Object.assign({}, rec, { lapsed: 'renew' })); });
    });
  }

  // The sealed wraps: which one this code opens (with the code key's bytes, so a signed in account can show the Worker)
  function codeBits(code, salt) {
    return subtle.importKey('raw', enc.encode(normCode(code)), 'PBKDF2', false, ['deriveBits']).then(function (base) {
      return subtle.deriveBits({ name: 'PBKDF2', salt: salt, iterations: ROUNDS, hash: 'SHA-256' }, base, 256);
    }).then(function (b) { return new Uint8Array(b); });
  }
  function matchWrap(code) {
    var g = box(); if (!g) return Promise.resolve(null);
    var W = (g.wraps || []).filter(function (w) { return w && w.iv && w.ct; });
    return codeBits(code, unb64(g.ws)).then(function (bits) {
      return subtle.importKey('raw', bits, { name: 'AES-GCM' }, false, ['decrypt']).then(function (ck) {
        return Promise.all(W.map(function (w) {
          return subtle.decrypt({ name: 'AES-GCM', iv: unb64(w.iv) }, ck, unb64(w.ct)).then(function (pt) { return { w: w, o: JSON.parse(dec.decode(pt)) }; }, function () { return null; });
        }));
      }).then(function (r) {
        var hit = r.filter(Boolean)[0];
        if (!hit || !hit.o || !hit.o.k) return null;
        hit.ck = b64(bits).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        return hit;
      });
    });
  }
  // Opens Membership on this device from a matched wrap (the path without an account, as before)
  function openHit(hit) {
    var rec = { c: hit.w.c, kind: KINDS[hit.o.kind] ? hit.o.kind : 'member', ends: hit.o.ends || '', at: Date.now() };
    if (ended(rec)) return Promise.resolve({ ok: false, why: 'ended' });
    return lockKey(hit.o.k).then(function (key) {
      return openLock(key).then(function (lib) {
        KEYC = key; setOpen(lib, rec);
        return keep(key, rec).then(function (saved) { return keepCarry(hit.o.k, rec).then(function () { emit(); return { ok: true, kind: rec.kind, kept: saved }; }); });
      });
    });
  }
  function unlock(code) {
    if (!subtle) return Promise.resolve({ ok: false, why: 'crypto' });
    if (!normCode(code)) return Promise.resolve({ ok: false, why: 'empty' });
    return loadLib(true).then(function (got) {
      return acctNow().then(function (G) {
        var g = box();
        if (!G) {
          if (!g) return { ok: false, why: got === 'offline' ? 'offline' : 'none' };
          return matchWrap(code).then(function (hit) { return hit ? openHit(hit) : { ok: false, why: acctOn() ? 'acct' : 'nomatch' }; });
        }
        // Signed in: the code attaches to the account (checked by the Worker), and Membership opens from the account.
        return (g ? matchWrap(code) : Promise.resolve(null)).then(function (hit) {
          return G.memberCode(hit ? { code: code, c: hit.w.c, ck: hit.ck } : { code: code }).then(function () {
            return acctSync(true).then(function () {
              if (ST.status === 'member' && LIBR) return { ok: true, kind: ST.kind, kept: true, acct: true };
              return hit ? openHit(hit) : { ok: false, why: 'none' };
            });
          }, function (e) {
            var w = e && e.why;
            if (w === 'offline' || w === 'setup' || w === 'server') return hit ? openHit(hit) : { ok: false, why: 'offline' };
            if (w === 'full' || w === 'ended' || w === 'wait') return { ok: false, why: w };
            return { ok: false, why: 'nomatch' };
          });
        });
      });
    }).catch(function () { return { ok: false, why: 'nomatch' }; });
  }
  function forget() {
    setClosed('start'); return wipe().then(function () { emit(); return true; }, function () { emit(); return true; });
  }

  /* ---------- Membership on the Account (GWG BLD 949) ---------- */
  function acctOn() { return !!(window.GGP && GGP.account && GGP.account.live); }
  // The signed in account on this page, or null (Accounts hidden, signed out, or the account files missing)
  function acctNow() {
    if (!acctOn()) return Promise.resolve(null);
    return Promise.resolve(GGP.account.ready).then(function (ok) {
      if (!ok || !window.GGAccount) return null;
      return GGAccount.ready.then(function () { return GGAccount.state() === 'out' ? null : GGAccount; });
    }).catch(function () { return null; });
  }
  function pad2(n) { return String(n).padStart(2, '0'); }
  function dayOf(ms) { var d = new Date(ms); return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
  var ACH = 0, ASYNC = null;
  function acctSync(force) {
    if (!subtle) return Promise.resolve();
    if (ASYNC && !force) return ASYNC;
    var p = acctNow().then(function (G) {
      if (!G) {
        // signed out here: Membership that came from the account closes on this device
        if (REC && REC.acct) { setClosed('start'); return wipe().then(emit); }
        return;
      }
      var me = (G.info() || {}).accountId || '';
      return G.memberRefresh().then(function (m) {
        ACH = Date.now();
        var mine = REC && REC.acct === me;
        if (m && m.status === 'active') {
          var rec = { c: '', kind: KINDS[m.kind] ? m.kind : 'member', ends: m.ends ? dayOf(m.ends) : '', at: Date.now(), acct: me, auto: m.auto ? 1 : 0, hh: m.household ? 1 : 0, org: m.org ? 1 : 0 };
          if (ST.status === 'member' && LIBR && mine) {
            var was = JSON.stringify([REC.kind, REC.ends, REC.auto, REC.hh, REC.org]);
            REC = rec; ST.kind = rec.kind; ST.ends = rec.ends;
            if (was !== JSON.stringify([rec.kind, rec.ends, rec.auto, rec.hh, rec.org])) { keepRec2(rec); emit(); }
            return;
          }
          if (ST.status === 'member' && LIBR && REC && !REC.acct) return;   // a code already opened it on this device
          return loadLib().then(function () {
            if (!box()) return;
            return G.memberKey().then(function (raw) {
              return lockKey(raw).then(function (key) {
                try { raw.fill(0); } catch (e) {}
                return openLock(key).then(function (lib) {
                  KEYC = key; setOpen(lib, rec);
                  MEM.carry = null;
                  return keep(key, rec).then(function () { return idb('readwrite', function (s) { s.delete('carry'); }); }).then(emit);
                });
              });
            }).catch(function () {
              // the account is a Member, but its key opens nothing here yet (a fresh lock waiting on the server)
              if (ST.status !== 'member') { setClosed('renew', Object.assign({}, rec, { lapsed: 'renew' })); emit(); }
            });
          });
        }
        if (m && m.status === 'ended' && (mine || ST.status !== 'member')) {
          var r2 = { c: '', kind: KINDS[m.kind] ? m.kind : 'member', ends: m.ends ? dayOf(m.ends) : '', at: Date.now(), acct: me, lapsed: 'ended' };
          setClosed('ended', r2); return keepRec(r2).then(emit);
        }
        if (!m && mine) { setClosed('start'); return wipe().then(emit); }
      }, function () { /* out of reach: this device keeps what it has */ });
    });
    ASYNC = p.then(function () { ASYNC = null; later(); }, function () { ASYNC = null; later(); });
    return ASYNC;
  }
  // While a page stays open: ask again when the paid time ends, and at least every 6 hours
  var LT = null;
  function later() {
    if (LT) { clearTimeout(LT); LT = null; }
    if (!REC || !REC.acct || ST.status !== 'member') return;
    var at = Date.now() + 6 * 3600000, e = window.GGAccount && GGAccount.member && GGAccount.member();
    if (e && e.ends && e.ends > Date.now() && e.ends < at) at = e.ends + 1000;
    LT = setTimeout(function () { LT = null; acctSync(); }, Math.max(1000, at - Date.now()));
  }
  function keepRec2(rec) { MEM.rec = rec; return idb('readwrite', function (s) { s.put(rec, 'rec'); }); }
  function acctHook() {
    if (!acctOn()) return;
    Promise.resolve(GGP.account.ready).then(function (ok) {
      if (!ok || !window.GGAccount) return;
      GGAccount.on(function (t, d) { if (t === 'state' && d !== 'offline') acctSync(true); });
    }).catch(function () {});
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible' && Date.now() - ACH > 30 * 60000) acctSync(); });
  }
  // The first visit: wait (a few seconds at most) for the account, so Home opens on Membership with no Start flash
  function acctFirst() {
    if (!acctOn()) return Promise.resolve();
    acctHook();
    var t = new Promise(function (ok) { setTimeout(ok, 6000); });
    return Promise.race([acctSync(), t]);
  }

  /* ---------- content ---------- */
  function get(sec) { if (!LIBR || sec == null) return null; var v = LIBR[sec]; return v === undefined ? null : v; }
  function audio() { var a = LIBR && LIBR.audio; return a && typeof a.key === 'string' && a.key ? a : null; }
  // Member Tending folded into the Start file (shared/tending-public.js). The Member part is shaped by the workshop
  // splitter (patches/bld908/member/split.mjs): whole keys that replace or add, plus foodMore (more food sections) and
  // practiceMore (more Flow sessions) that join the Start lists, and app keys that join base.app.
  var TENDC = null;
  function tend(base) {
    var m = get('tend');
    if (!base || !m || typeof m !== 'object') return base || null;
    if (TENDC && TENDC.base === base && TENDC.m === m) return TENDC.out;
    var out = Object.assign({}, base), app = Object.assign({}, base.app || {});
    Object.keys(m).forEach(function (k) { if (k !== 'app' && k !== 'foodMore' && k !== 'practiceMore' && k !== 'audioFolder') out[k] = m[k]; });
    Object.keys(m.app || {}).forEach(function (k) { app[k] = m.app[k]; });
    if (Array.isArray(m.practiceMore) && app.practice) app.practice = Object.assign({}, app.practice, { sessions: (app.practice.sessions || []).concat(m.practiceMore) });
    if (Array.isArray(m.foodMore)) out.food = (base.food || []).concat(m.foodMore);
    out.app = app; out.start = false; out.member = true;
    TENDC = { base: base, m: m, out: out };
    return out;
  }
  // A Member clip: name = hex of the first 16 bytes of HMAC SHA-256(clip key, voice + '|' + sentence); file = 12-byte IV
  // plus AES-GCM of the mp3 at <round>/<folder>/<name>.bin. Resolves a blob URL, or null when it is missing.
  var CK = null, CACHE = {};
  // BLD 983 (folder m and the public check alike): the female voice ('jenny' in code) plays Ashley's clips; FEMALE = 'jenny' plays the kept Jenny clips (shared/gg-learn.js, patches/bld983/JENNY-KEPT.md).
  var FEMALE = 'ashley';
  function clipKeys() {
    var a = audio(); if (!a || !subtle) return Promise.resolve(null);
    if (CK && CK.raw === a.key) return CK.p;
    var raw = unb64(a.key);
    CK = { raw: a.key, p: Promise.all([subtle.importKey('raw', raw, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']), subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['decrypt'])]).then(function (r) { return { h: r[0], k: r[1], a: a }; }) };
    return CK.p;
  }
  function clipName(voice, text) {
    return clipKeys().then(function (ks) {
      if (!ks) return null;
      return subtle.sign('HMAC', ks.h, enc.encode((voice === 'jenny' ? FEMALE : voice) + '|' + text)).then(function (sig) { return Array.prototype.map.call(new Uint8Array(sig).slice(0, 16), function (b) { return pad(b.toString(16)); }).join(''); });
    });
  }
  // Public first (lead, BLD 908): many Member sentences are already recorded as public v1 clips (the Readings Library, Willow,
  // Rest in Prayer, the stories), named like shared/gg-learn.js clipName(voice, text) at <base>v1/<voice>/<name>.mp3. A
  // Member line plays that public clip when one exists for the same voice and sentence, and folder m only for sentences
  // recorded nowhere public, so nothing public is ever recorded twice. o.pub: true skips the check (known public), false
  // goes straight to folder m. Known answers are kept for this visit.
  function pubName(voice, text) {
    if (window.GGLearn && typeof GGLearn.clipName === 'function') return GGLearn.clipName(voice, text);
    if (voice === 'jenny') voice = FEMALE;
    var h1 = 0xdeadbeef, h2 = 0x41c6ce57, s = voice + '\n' + String(text).replace(/\s+/g, ' ').trim();
    for (var i = 0, c; i < s.length; i++) { c = s.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507); h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507); h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return voice + '/' + (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  }
  function pubUrl(voice, text) { var r = (window.GGLearn && GGLearn.rec) || {}; return (r.base || CLIP_BASE) + (r.round || 'v1') + '/' + pubName(voice, text) + '.mp3'; }
  var PUBK = {};
  function pubClip(voice, text, o) {
    if (text == null || !voice || (o && o.pub === false)) return Promise.resolve(null);
    var u = pubUrl(voice, text);
    if (o && o.pub === true) return Promise.resolve(u);
    if (PUBK[u] === undefined) PUBK[u] = fetch(u, { method: 'HEAD' }).then(function (r) { return r.ok ? u : null; }, function () { return null; });
    return PUBK[u];
  }
  function clip(voice, text, o) {
    return pubClip(voice, text, o).then(function (u) { return u || sealedClip(voice, text); });
  }
  function sealedClip(voice, text) {
    var nameP = text == null && /^[0-9a-f]{32}$/.test(String(voice || '')) ? Promise.resolve(String(voice)) : clipName(voice, text);
    return nameP.then(function (n) {
      if (!n) return null;
      if (CACHE[n]) return CACHE[n];
      var p = clipKeys().then(function (ks) {
        if (!ks) return null;
        return fetch(CLIP_BASE + (ks.a.round || 's1') + '/' + (ks.a.folder || 'm') + '/' + n + '.bin').then(function (r) {
          if (!r.ok) return null;
          return r.arrayBuffer().then(function (ab) { var b = new Uint8Array(ab); return subtle.decrypt({ name: 'AES-GCM', iv: b.slice(0, 12) }, ks.k, b.slice(12)); })
            .then(function (mp3) { return URL.createObjectURL(new Blob([mp3], { type: 'audio/mpeg' })); });
        });
      }).catch(function () { return null; });
      CACHE[n] = p; p.then(function (u) { if (!u) delete CACHE[n]; });
      return p;
    }, function () { return null; });
  }

  /* ---------- the sheet and the cards ---------- */
  var CSS = '.ggm-ov{position:fixed;inset:0;z-index:2147483000;background:rgba(20,14,8,.55);display:flex;align-items:flex-end;justify-content:center;padding:0}' +
    '@media (min-width:640px){.ggm-ov{align-items:center;padding:24px}}' +
    '.ggm-sh{background:var(--card,#fff);color:var(--ink,#2C1810);width:100%;max-width:480px;border-radius:18px 18px 0 0;padding:22px 20px 26px;box-shadow:0 10px 40px rgba(0,0,0,.3);max-height:92vh;overflow:auto;box-sizing:border-box}' +
    '@media (min-width:640px){.ggm-sh{border-radius:18px}}' +
    '.ggm-sh h2{font-family:inherit;font-size:1.35rem;margin:0 0 6px;line-height:1.25}.ggm-sh p{margin:6px 0;color:var(--ink-soft,#6B5A4D);line-height:1.5}' +
    '.ggm-ey{font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:var(--gold,#8B5E1A);font-weight:700}' +
    '.ggm-sh label{display:block;font-weight:600;margin:14px 0 6px;color:var(--ink,#2C1810)}' +
    '.ggm-sh input{width:100%;box-sizing:border-box;font-size:17px;padding:12px 14px;border-radius:12px;border:1px solid var(--line,#E2D8C3);background:var(--bg,#FAF7F2);color:var(--ink,#2C1810)}' +
    '.ggm-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}' +
    '.ggm-b{appearance:none;border:1px solid var(--gold,#8B5E1A);background:var(--gold,#8B5E1A);color:#fff;font:inherit;font-weight:700;padding:11px 18px;border-radius:999px;cursor:pointer;min-height:44px}' +
    '.ggm-b.l{background:transparent;color:var(--gold,#8B5E1A)}.ggm-b[disabled]{opacity:.6;cursor:wait}' +
    '.ggm-msg{min-height:1.4em;font-weight:600;color:var(--ink,#2C1810)}' +
    '.ggm-card{border:1px solid var(--line,#E2D8C3);border-left:4px solid var(--gold,#8B5E1A);border-radius:14px;padding:14px 16px;background:var(--card,#fff);color:var(--ink,#2C1810);box-sizing:border-box;max-width:100%}' +
    '.ggm-card b{display:block;font-size:1.05rem;margin:2px 0}.ggm-card small{display:block;color:var(--ink-soft,#6B5A4D);line-height:1.45}' +
    '.ggm-card .ggm-row{margin-top:10px}.ggm-card .ggm-b{padding:8px 14px;min-height:40px;font-size:.95rem}' +
    '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .ggm-b:not(.l){color:#1F1A14}}:root[data-theme="dark"] .ggm-b:not(.l){color:#1F1A14}';
  function css() { if (document.getElementById('ggm-css')) return; var s = document.createElement('style'); s.id = 'ggm-css'; s.textContent = CSS; (document.head || document.documentElement).appendChild(s); }
  function kindName(k) { return KINDS[k] || 'Member'; }
  function statusLine() {
    var s = ST, R0 = REC || {};
    if (s.status === 'member' && R0.acct) return 'Membership is open on your Grounded Account' + (R0.hh ? ' through your Household' : R0.org ? ' through your organization' : s.kind && s.kind !== 'member' && s.kind !== 'household' ? ' as ' + kindName(s.kind) : '') +
      (s.ends && !R0.auto ? ', through ' + nice(s.ends) : s.ends && R0.auto ? ', renewing ' + nice(s.ends) : '') + '. Every device you sign in on has the full suite.';
    if (s.status === 'renew' && R0.acct) return 'Membership has a fresh lock, and it opens again by itself on your Grounded Account in a little while.';
    if (s.status === 'ended' && R0.acct) return 'Your Membership time has ended. Everything you made stays right here. Renew Membership, and the full suite opens again on every device.';
    if (s.status === 'member') return 'Membership is open on this device' + (s.kind && s.kind !== 'member' ? ' with a ' + kindName(s.kind) + ' code' : '') + (s.ends ? ', through ' + nice(s.ends) : '') + '. Every profile here has the full suite.';
    if (s.status === 'ended') return 'Your Membership code has ended. Renew Membership with a new code, and everything here keeps going.';
    if (s.status === 'renew') return 'Membership has a fresh lock. Enter your code once more to keep going.';
    return 'Join Membership, or add your code here.';
  }
  function card(o) {
    css(); o = o || {};
    var on = ST.status === 'member', t = on ? 'Membership' : ST.status === 'start' ? 'Membership' : 'Renew Membership';
    return '<div class="ggm-card" data-ggm-card="1"><span class="ggm-ey">Grounded</span><b>' + esc(t) + '</b><small data-ggm-line="1">' + esc(statusLine()) + '</small>' +
      '<div class="ggm-row">' + (on ? '<button type="button" class="ggm-b l" data-ggm="open">Membership on This Device</button>'
        : ST.status === 'ended' && REC && REC.acct ? '<a class="ggm-b" href="' + esc(SEE) + '" data-ggm-see="1">Renew Membership</a><button type="button" class="ggm-b l" data-ggm="open">I Have a Code</button>'
        : '<button type="button" class="ggm-b" data-ggm="open">I Have a Code</button>' + (o.see === false ? '' : '<a class="ggm-b l" href="' + esc(SEE) + '" data-ggm-see="1">See Membership</a>')) + '</div></div>';
  }
  function invite(o) {
    css(); o = o || {};
    return '<div class="ggm-card ggm-inv"><span class="ggm-ey">' + esc(o.eyebrow || 'Membership') + '</span><b>' + esc(o.title || 'Grow Deeper') + '</b><small>' + esc(o.line || 'Part of Membership.') + '</small>' +
      '<div class="ggm-row"><a class="ggm-b l" href="' + esc(SEE) + '">See Membership</a><button type="button" class="ggm-b" data-ggm="open">I Have a Code</button></div></div>';
  }
  function paintCards() {
    try { Array.prototype.forEach.call(document.querySelectorAll('[data-ggm-card]'), function (el) { var w = document.createElement('div'); w.innerHTML = card({}); el.replaceWith(w.firstChild); }); } catch (e) {}
  }
  var OV = null, LAST = null;
  function close() { if (!OV) return; OV.remove(); OV = null; document.removeEventListener('keydown', onKey, true); if (LAST && LAST.focus) try { LAST.focus(); } catch (e) {} }
  function onKey(e) { if (e.key === 'Escape') { e.preventDefault(); close(); } }
  function sheetHtml() {
    var on = ST.status === 'member';
    if (on && REC && REC.acct) return '<span class="ggm-ey">Membership</span><h2 id="ggm-t">Membership on Your Account</h2><p>' + esc(statusLine()) + '</p>' +
      '<p>Your answers and plans stay in each person\'s own locked profile. Signing out of your Grounded Account closes Membership on this device.</p>' +
      '<div class="ggm-row"><button type="button" class="ggm-b" data-ggm="close">Done</button></div><p class="ggm-msg" role="status" aria-live="polite"></p>';
    if (on) return '<span class="ggm-ey">Membership</span><h2 id="ggm-t">Membership on This Device</h2><p>' + esc(statusLine()) + '</p>' +
      '<p>Your answers and plans stay in each person\'s own locked profile.</p>' +
      '<div class="ggm-row"><button type="button" class="ggm-b" data-ggm="close">Done</button><button type="button" class="ggm-b l" data-ggm="forget">Forget Membership on This Device</button></div><p class="ggm-msg" role="status" aria-live="polite"></p>';
    return '<span class="ggm-ey">Membership</span><h2 id="ggm-t">' + (ST.status === 'start' ? 'I Have a Code' : 'Renew Membership') + '</h2><p>' + esc(statusLine()) + '</p>' +
      '<p>' + (acctIn() ? 'Enter your code once. It joins your Grounded Account, and Membership opens on every device you sign in on.' : 'Enter your code once. Membership then stays open on this device for every profile here.') + '</p>' +
      '<form data-ggm-form="1" autocomplete="off"><label for="ggm-code">Your Membership code</label><input id="ggm-code" name="code" type="text" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="four words and a number" inputmode="text">' +
      '<div class="ggm-row"><button type="submit" class="ggm-b">Open Membership</button><button type="button" class="ggm-b l" data-ggm="close">Later</button></div></form>' +
      '<p class="ggm-msg" role="status" aria-live="polite"></p>';
  }
  function open() {
    if (!document.body) return;
    css(); close(); LAST = document.activeElement;
    OV = document.createElement('div'); OV.className = 'ggm-ov'; OV.setAttribute('data-ggm-ov', '1');
    OV.innerHTML = '<div class="ggm-sh" role="dialog" aria-modal="true" aria-labelledby="ggm-t">' + sheetHtml() + '</div>';
    document.body.appendChild(OV);
    document.addEventListener('keydown', onKey, true);
    var f = OV.querySelector('#ggm-code') || OV.querySelector('.ggm-b'); if (f) try { f.focus(); } catch (e) {}
  }
  function acctIn() { return acctOn() && window.GGAccount && GGAccount.state && GGAccount.state() !== 'out'; }
  var WHY = {
    empty: 'Enter your code, then tap Open Membership.',
    nomatch: 'That code opens a different part of Grounded. Check each word and the number, and try again. Guide codes open the Field Guide.',
    ended: 'That code reached its end date. A new code renews Membership.',
    none: 'Membership is still loading on this device. Refresh the page and try again.',
    offline: 'Membership needs a connection the first time. Try again once you are online.',
    crypto: 'This browser needs a newer version to open Membership.',
    acct: 'That code opens a different part of Grounded. Organization and gift codes open on a Grounded Account: sign in from Settings, My Account, then enter the code here.',
    full: 'Every seat on that organization code is in use. The organization can ask us for more seats.',
    wait: 'Let us pause a moment. Try again in a little while.'
  };
  document.addEventListener('submit', function (e) {
    var f = e.target && e.target.closest && e.target.closest('[data-ggm-form]'); if (!f) return;
    e.preventDefault();
    var inp = f.querySelector('input'), btn = f.querySelector('button[type="submit"]'), msg = OV && OV.querySelector('.ggm-msg');
    if (btn) btn.disabled = true; if (msg) msg.textContent = 'Opening...';
    unlock(inp ? inp.value : '').then(function (r) {
      if (btn) btn.disabled = false;
      if (r.ok) { if (OV) { OV.querySelector('.ggm-sh').innerHTML = '<span class="ggm-ey">Membership</span><h2 id="ggm-t">Welcome to Membership</h2><p>' + esc(statusLine()) + '</p>' + (r.kept === false ? '<p>This browser keeps Membership for this visit. Enter your code again next time.</p>' : '') + '<div class="ggm-row"><button type="button" class="ggm-b" data-ggm="close">Begin</button></div>'; var b = OV.querySelector('.ggm-b'); if (b) try { b.focus(); } catch (x) {} } return; }
      if (msg) msg.textContent = WHY[r.why] || WHY.nomatch;
    });
  }, true);
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest && e.target.closest('[data-ggm]');
    if (!t) { if (OV && e.target === OV) close(); return; }
    var a = t.getAttribute('data-ggm');
    if (a === 'open') { e.preventDefault(); open(); }
    else if (a === 'close') { e.preventDefault(); close(); }
    else if (a === 'forget') {
      e.preventDefault();
      if (!window.confirm('Forget Membership on this device? Every profile here returns to Start. Your answers and plans stay in each profile, and your code opens Membership again anytime.')) return;
      forget().then(function () { close(); });
    }
  });

  /* ---------- the API ---------- */
  var ready = boot().then(acctFirst).then(function () { emit(); return state(); }, function () { return state(); });
  window.GGMember = {
    __v: V,
    ready: ready,
    has: function () { return ST.status === 'member' && !!LIBR; },
    get: get,
    clip: clip,
    sealedClip: sealedClip,
    pubUrl: pubUrl,
    open: open,
    close: close,
    on: function (fn) { if (typeof fn !== 'function') return function () {}; FNS.push(fn); return function () { FNS = FNS.filter(function (f) { return f !== fn; }); }; },
    state: state,
    unlock: unlock,
    forget: forget,
    audio: audio,
    tend: tend,
    card: card,
    invite: invite,
    normCode: normCode,
    lib: function () { return LIBR; },
    carry: carry,
    adopt: adopt,
    sync: function () { return acctSync(true).then(state); },
    sections: SECTIONS.slice()
  };
})();
