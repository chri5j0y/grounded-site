/* =====================================================================
   GIFT LISTS AND THE GIFT CIRCLE (shared/gg-gifts.js), GWG BLD 1072
   Chris (November 27, 2026): "every person has a wish list ... what shoe size, maybe what size pants, shirts and hoodie,
   shoes ... so your friends and family can go on here, know how to buy you gifts that fit, gifts that you want, and do it
   secretly as a surprise." Plan: grounded-workshop patches/bld1072/PLAN.md.

   Each Grounded Account may keep one Gift List: wishes by occasion, What Fits Me (clothing sizes with the date updated,
   colors, things I love, things I have plenty of), a first name, a birthday, and a picture. It is shared with the person's
   own Gift Circle: their Household, plus family and friends they invite (a Grounded Account at no cost, no Membership).
   Two locked spaces per circle (the Worker, worker/src/gifts.js; this device syncs them with shared/gg-sync.js GGSync.gift):
     list    {me: {name, pic, bday, u}, fits: {shirt: {v, at}, ...}, wishes: [{id, t, k, o, n, l, u}], occs: [{id, n}],
              names: {'i:<invite>' or account: the name the owner gave}}
     picks   {dk: the drop key's private half, picks: [{id: wish id, t: wish words, by, n: giver's first name, at, u, g, note,
              make}]}. Made by a giver, never by the owner: the owner's device never holds this key or these boxes.
   Kids (Maple and Aspen, and kid accounts) see the lists, never picks, and may say I'm Making This One on Handmade and Time
   Together wishes: a small note sealed to the picks space's public key (the drop), folded in by the givers' devices.
   The invitation link (/grove/#gift=<code>~<card key>) carries the card key after the #, so the Worker never reads who
   invited whom; the card holds the inviter's first name, the list names, and the list keys, locked with that key.
   This device keeps the lists and picks it has read, locked with the account key (localStorage gg-gifts:<account>), and
   the person's own Gifts I Have Received and I'm Making This One marks in the account doc acct:gifts (a kid's tree opened
   on a grown-up's phone keeps them in the kid's own vault). Nothing sends an alert or a count.

   For a host page
     GGGifts.live()            Promise of true once the Worker answers the Gift Lists routes (GIFTS_LIVE below, too)
     GGGifts.mount(el, o)      draws Gift Lists into el; o.who: 'me', a circle id, or ''; o.onBack()
     GGGifts.invite(code, key) the invitation card (from #gift=)
     GGGifts.index()           Promise of {me, names} for links (the Family Planner's See Maya's Gift List)
     GGGifts.linkFor(name, me) {href, label} or null, from the last index
   No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGGifts) return;
  var V = 'c232';
  // GIFTS_LIVE: Gift Lists show only once this is true AND the Worker answers its routes (the Worker c201, BLD 1072). Until
  // the Worker is deployed the probe answers false, so nothing shows. Tests may set window.GG_GIFTS_OFF to hide it.
  var GIFTS_LIVE = true;
  var ART = '/shared/heroes/lib/278.webp';
  var subtle = window.crypto && crypto.subtle, enc = new TextEncoder(), dec = new TextDecoder();
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var KINDS = [['have', 'Something to Have'], ['do', 'Something to Do'], ['time', 'Time Together'], ['hand', 'Handmade']];
  var KIND = {}; KINDS.forEach(function (k) { KIND[k[0]] = k[1]; });
  var OCCS = [['bday', 'Birthday'], ['xmas', 'Christmas'], ['hol', 'Holidays'], ['any', 'Any Time']];
  var IDEAS = ['A picnic day together', 'A day on a hiking trail', 'A cooking night together', 'A new book', 'Art supplies', 'A garden kit', 'A handwritten letter', 'A camping night', 'A museum day', 'A cozy blanket', 'Help with a project', 'Music lessons'];
  var FITS = [['shirt', 'Shirt', 'Medium, or Youth 10 to 12'], ['pants', 'Pants', 'Waist 32, length 30, or Kids 8'], ['hoodie', 'Hoodie or Sweatshirt', 'Large'], ['shoes', 'Shoes', 'US 9, wide'], ['jacket', 'Jacket', 'Medium'], ['hat', 'Hat and Gloves', 'Adult, or Kids small'],
    ['colors', 'Favorite Colors', 'Green, soft blue'], ['love', 'Things I Love', 'Birds, puzzles, the lake'], ['plenty', 'Things I Have Plenty Of', 'Mugs, stuffed animals']];
  var SIZE_KEYS = ['shirt', 'pants', 'hoodie', 'shoes', 'jacket', 'hat'];
  var MAX_WISHES = 60, OLD_SIZES = 90 * 864e5, GIVEN_REST = 60 * 864e5;

  /* ---------- plain helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function arr(x) { return Array.isArray(x) ? x : []; }
  function obj(x) { return x && typeof x === 'object' && !Array.isArray(x) ? x : {}; }
  function clip(s, n) { return String(s == null ? '' : s).replace(/[\u0000-\u001f]/g, ' ').replace(/[\u2012-\u2015]/g, ', ').trim().slice(0, n); }
  function b64u(u8) { var s = ''; for (var i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function unb64u(t) { t = String(t || '').replace(/-/g, '+').replace(/_/g, '/'); while (t.length % 4) t += '='; var s = atob(t), u = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; }
  function rand(n) { return crypto.getRandomValues(new Uint8Array(n)); }
  function rid() { return b64u(rand(9)); }
  function now() { return +window.GG_TEST_NOW || Date.now(); }
  function clone(v) { return v === undefined ? undefined : JSON.parse(JSON.stringify(v)); }
  function first(n) { return clip(String(n || '').split(/\s+/)[0], 24); }
  function poss(n) { n = String(n || ''); return n ? n + '’s' : ''; }   // Chicago: Chris’s, Kayti’s
  function monthYear(t) { var d = new Date(+t || 0); return +t ? MONTHS[d.getMonth()] + ' ' + d.getFullYear() : ''; }
  function okLink(s) { try { var u = new URL(String(s || '').trim()); return u.protocol === 'https:' ? u.href : ''; } catch (e) { return ''; } }
  var ICON = {
    gift: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8c-2-4-6-3-6 0h6zM12 8c2-4 6-3 6 0h-6z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>', back: '<path d="M15 18l-6-6 6-6"/>', link: '<path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
    check: '<path d="M5 12l5 5 9-10"/>', people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.2c3 .2 5.5 2.4 5.5 5.8"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>', heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
    shirt: '<path d="M8 4l-5 3 2 4 3-1v10h8V10l3 1 2-4-5-3c-1 2-3 2-4 2s-3 0-4-2z"/>', x: '<path d="M6 6l12 12M18 6L6 18"/>'
  };
  function I(n) { return '<svg class="gf-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICON[n] || '') + '</svg>'; }

  /* ---------- the account and the Worker ---------- */
  function A() { return window.GGAccount; }
  function X() { return A() && A()._; }
  function signedIn() { return !!(A() && A().state && A().state() !== 'out' && A().info && A().info() && X() && X().keys()); }
  function api(m, p, b, o) { return X().api(m, p, b, o); }
  function ready() {
    var g = window.GGP;
    return Promise.resolve(g && g.ready).then(function () { return g && g.account && g.account.ready; }).then(function () { return A() && A().ready; }).catch(function () {});
  }
  var liveP = null;
  function live() {
    if (GIFTS_LIVE !== true || window.GG_GIFTS_OFF) return Promise.resolve(false);
    if (liveP) return liveP;
    try { if (sessionStorage.getItem('gg-gifts-on') === V) return (liveP = Promise.resolve(true)); } catch (e) {}
    liveP = ready().then(function () {
      if (!X()) return false;
      // the routes answer once the Worker c201 is deployed: signed out, GET /gifts asks to sign in (401) instead of 404
      return api('GET', '/gifts', null, { quiet401: true, tries: 1 }).then(function () { return true; }, function (e) { return !!(e && e.why === 'signin' && e.status === 401); });
    }).then(function (ok) { if (ok) { try { sessionStorage.setItem('gg-gifts-on', V); } catch (e) {} } else liveP = null; return ok; });
    return liveP;
  }

  /* ---------- state ---------- */
  var S = { el: null, o: {}, me: null, circles: [], raw: {}, sp: {}, mem: {}, pend: {}, live: {}, personal: {}, bootP: null, loaded: false, err: '', view: { at: 'home', cid: '' }, sheet: null, inv: null, cardKeys: {}, idx: null, sure: '', note: '', acct: '' };
  function viewer() {
    var i = A() && A().info && A().info(); if (!i) return null;
    var g = window.GGP, a = g && g.active ? g.active() : null, p = a && g.get ? g.get(a.id) : null;
    var kidAcct = p && p.kidAcct && p.kidAcct !== i.accountId ? p.kidAcct : '';
    var young = !!(a && (a.age === 'maple' || a.age === 'aspen'));
    var band = (S.me && S.me.account === i.accountId && S.me.band) || i.band || 'adult';   // the Worker's answer leads (a fresh sign in reads band later)
    var kid = band === 'kid' || !!kidAcct || young;
    return { acct: kidAcct || i.accountId, session: i.accountId, band: band, kid: kid, guarded: !!kidAcct, kidLocal: young && !kidAcct && band !== 'kid',
      treeId: a ? a.id : '', name: a ? first(a.name) : '', pic: a ? a.avatar || '' : '' };
  }
  function circle(id) { return S.circles.filter(function (c) { return c.id === id; })[0] || null; }
  function spaceOf(c, kind) { return c ? arr(c.spaces).filter(function (s) { return s.kind === kind; })[0] || null : null; }
  function listDoc(c) { var s = spaceOf(c, 'list'); return s && S.raw[s.id] ? obj(S.mem[s.id]) : null; }
  function picksDoc(c) { var s = spaceOf(c, 'picks'); return s && S.raw[s.id] ? obj(S.mem[s.id]) : null; }
  function myCircle(v) { v = v || viewer(); return v ? S.circles.filter(function (c) { return c.owner === v.acct; })[0] || null : null; }
  function canEdit(c, v) { v = v || viewer(); return !!(c && v && (c.owner === v.acct ? (c.role === 'owner' || c.role === 'manager') : (c.role === 'manager' && !v.kid))); }
  function showPicks(c, v) { v = v || viewer(); return !!(c && v && !v.kid && c.owner !== v.acct && c.role !== 'owner'); }
  function myName(v) {
    v = v || viewer(); if (!v) return '';
    if (v.name) return v.name;
    var c = myCircle(v), d = c && listDoc(c);
    return first((d && obj(d.me).name) || S.personal.name || guessName());
  }
  // With no tree open here, a first guess from the email or sign in name (maya.joy reads Maya); the person can change it
  function guessName() { var i = A() && A().info && A().info(), m = i && /^([a-z]{2,24})(?=[._0-9]|@)/i.exec(String(i.email || '')); return m ? m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase() : ''; }

  /* ---------- this device's locked copy (the account key locks it) ---------- */
  function localKey() { var i = A() && A().info && A().info(); return i ? 'gg-gifts:' + i.accountId : ''; }
  function localLoad() {
    var k = localKey(), K = X() && X().keys(); if (!k || !K) return Promise.resolve();
    if (S.acct === k) return Promise.resolve();
    S.acct = k; S.mem = {}; S.pend = {}; S.live = {}; S.raw = {}; S.sp = {}; S.personal = {}; S.circles = []; S.loaded = false;
    var t = null; try { t = localStorage.getItem(k); } catch (e) {}
    if (!t) return Promise.resolve();
    return X().open(K.DK, unb64u(t), 'gg1|gifts-local|' + K.accountId).then(function (u8) { var j = JSON.parse(dec.decode(u8)); S.mem = obj(j.mem); S.pend = obj(j.pend); S.personal = obj(j.personal); }).catch(function () {});
  }
  var saveT = null;
  function localSave(now0) {
    clearTimeout(saveT);
    saveT = setTimeout(function () {
      var k = localKey(), K = X() && X().keys(); if (!k || !K) return;
      var keep = {}; Object.keys(S.mem).forEach(function (sid) { if (S.raw[sid]) keep[sid] = S.mem[sid]; });
      X().seal(K.DK, enc.encode(JSON.stringify({ v: 1, mem: keep, pend: S.pend, personal: S.personal })), 'gg1|gifts-local|' + K.accountId).then(function (u8) { try { localStorage.setItem(k, b64u(u8)); } catch (e) {} });
    }, now0 ? 0 : 120);
  }

  /* ---------- the person's own notes: Gifts I Have Received, I'm Making This One ---------- */
  var personalOn = false;
  function personalReg() {
    if (personalOn || !window.GGSync) return; personalOn = true;
    GGSync.doc('acct:gifts', { get: function () { return signedIn() ? S.personal : null; }, put: function (d) { S.personal = obj(d); localSave(); soon(); } });
  }
  function pStore(v) {
    v = v || viewer();
    if (v && v.guarded && v.treeId && window.GGP && GGP.isOpen(v.treeId)) return GGP.data(v.treeId, 'gifts');
    return S.personal;
  }
  function pChanged(v) {
    v = v || viewer();
    if (v && v.guarded && v.treeId && window.GGP && GGP.save) { try { GGP.save(v.treeId); } catch (e) {} return; }
    localSave(); if (window.GGSync) GGSync.changed('acct:gifts');
  }

  /* ---------- the spaces: keys, docs, renewing ---------- */
  function adapter(sid) {
    // The copy kept on this device speaks for it only while it holds a change still to send (pend); otherwise, until this
    // space has synced once here, the doc reads as empty, so the account's copy leads and an older copy never undoes a newer one.
    return { get: function () { if (!signedIn() || !S.raw[sid]) return null; return S.live[sid] || S.pend[sid] ? (S.mem[sid] || {}) : {}; }, put: function (d) { if (!S.raw[sid]) return; S.mem[sid] = obj(d); S.live[sid] = 1; localSave(); soon(); } };
  }
  function hold(sid, raw, info) {
    S.sp[sid] = info;
    if (S.raw[sid]) return Promise.resolve();
    S.raw[sid] = raw;
    return GGSync.gift(sid, raw, adapter(sid));
  }
  function mutate(sid, fn) {
    if (!S.raw[sid]) return false;
    var d = obj(S.mem[sid]); S.mem[sid] = d;
    fn(d); S.pend[sid] = now(); localSave(true); GGSync.changed('q:' + sid); paint();
    return true;
  }
  function wrapFor(pub, raw, sid, acct) { return GGSync.giftKeys.wrapTo(pub, raw, sid, acct); }
  function newSpace(c, kind, content, replace) {
    var K = X().keys(), raw = rand(32), id0 = b64u(rand(16)), sid = 'q' + id0, pubP = Promise.resolve(null);
    if (kind === 'picks') {
      pubP = subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']).then(function (kp) {
        return Promise.all([subtle.exportKey('jwk', kp.publicKey), subtle.exportKey('jwk', kp.privateKey)]);
      }).then(function (j) { content.dk = { kty: 'EC', crv: 'P-256', x: j[1].x, y: j[1].y, d: j[1].d }; return { kty: 'EC', crv: 'P-256', x: j[0].x, y: j[0].y }; });
    }
    return pubP.then(function (pub) {
      return wrapFor(K.pub, raw, sid, K.accountId).then(function (w) {
        var b = { circle: c.id, kind: kind, id: id0, key: w }; if (pub) b.pub = pub; if (replace) b.replace = replace;
        return api('POST', '/gifts/spaces', b);
      });
    }).then(function () {
      S.mem[sid] = content; S.live[sid] = 1; S.pend[sid] = now();
      return hold(sid, raw, { cid: c.id, kind: kind });
    }).then(function () {
      if (replace) { delete S.raw[replace]; delete S.mem[replace]; delete S.sp[replace]; delete S.pend[replace]; GGSync.ungift(replace); }
      GGSync.changed('q:' + sid); localSave();
      return sid;
    }, function (e) { if (e && (e.why === 'exists' || e.why === 'key')) return null; throw e; });
  }
  function blankList(v) { return { me: { name: myName(v) || '', pic: (v && v.pic) || '', bday: '', u: now() }, fits: {}, wishes: [], occs: [], names: {} }; }

  // GET /gifts, then: open each key held here, hand keys on, renew a key after someone left, make a picks space as a giver
  function boot(o) {
    o = o || {};
    if (S.bootP) return S.bootP;
    S.bootP = ready().then(function () { return live(); }).then(function (on) {
      hook();
      if (!on || !signedIn() || !window.GGSync || !GGSync.gift) { S.loaded = true; return; }
      personalReg();
      return localLoad().then(function () { return api('GET', '/gifts'); }).then(function (r) {
        S.me = r.me; S.circles = arr(r.circles);
        var v = viewer();
        // my own circle (or, on a grown-up's phone with a kid's tree open, the kid's)
        if (o.own && v && !v.kidLocal && !myCircle(v)) return api('POST', '/gifts/circles', v.guarded ? { for: v.acct } : {}).then(function () { return api('GET', '/gifts'); }).then(function (r2) { S.circles = arr(r2.circles); });
      }).then(function () { return keysUp(o); }).then(function (again) {
        if (again) return api('GET', '/gifts').then(function (r) { S.circles = arr(r.circles); return keysUp(o); });
      }).then(function () { S.loaded = true; S.err = ''; return GGSync.sync(); }).then(function (r) { synced(r); return afterSync(); });
    }).catch(function (e) { S.loaded = true; S.err = (e && e.why) || 'server'; }).then(function () { S.bootP = null; index(); paint(); });
    return S.bootP;
  }
  function keysUp(o) {
    var v = viewer(), K = X().keys(), jobs = [], again = false, live0 = {};
    // a space renewed or left elsewhere: its old copy leaves this device
    S.circles.forEach(function (c) { arr(c.spaces).forEach(function (s) { live0[s.id] = 1; }); });
    Object.keys(S.raw).forEach(function (sid) { if (!live0[sid]) { delete S.raw[sid]; delete S.mem[sid]; delete S.sp[sid]; GGSync.ungift(sid); } });
    localSave();
    S.circles.forEach(function (c) {
      arr(c.spaces).forEach(function (s) {
        if (s.key) {
          jobs.push(GGSync.giftKeys.unwrap(s.key, s.id).then(function (raw) { return hold(s.id, raw, { cid: c.id, kind: s.kind }).then(function () { return raw; }); }).then(function (raw) {
            var hand = arr(s.missing).filter(function (m) { return m.pub && m.account; });
            var job = hand.length ? Promise.all(hand.map(function (m) { return wrapFor(m.pub, raw, s.id, m.account).then(function (w) { return { account: m.account, key: w }; }); })).then(function (items) { return api('POST', '/gifts/spaces/' + s.id + '/keys', { items: items }); }).catch(function () {}) : Promise.resolve();
            return job.then(function () { if (s.rekey) return renew(c, s).then(function () { again = true; }); });
          }).catch(function () {}));
        } else if (S.cardKeys[s.id] && (s.kind === 'list' || (v && !v.kid && c.owner !== v.session))) {
          var raw = unb64u(S.cardKeys[s.id]);
          jobs.push(wrapFor(K.pub, raw, s.id, K.accountId).then(function (w) { return api('POST', '/gifts/spaces/' + s.id + '/keys', { items: [{ account: K.accountId, key: w }] }); }).then(function () { delete S.cardKeys[s.id]; again = true; }).catch(function () {}));
        }
      });
    });
    return Promise.all(jobs).then(function () {
      var more = [];
      // a giver makes the picks space once the list is open here; the owner (or a kid's grown-up) makes the list space
      S.circles.forEach(function (c) {
        if (c.needPicks && v && !v.kid && listDoc(c) && c.owner !== v.session) more.push(newSpace(c, 'picks', { picks: [] }).then(function () { again = true; }));
        if (o.own && v && c.owner === v.acct && !spaceOf(c, 'list') && (c.role === 'owner' || c.role === 'manager')) more.push(newSpace(c, 'list', blankList(v)).then(function () { again = true; }));
      });
      return Promise.all(more.map(function (p) { return p.catch(function () {}); }));
    }).then(function () { return again; });
  }
  // After someone leaves: a new key, the same content, and for picks only the current givers' picks and a new drop key
  function renew(c, s) {
    var d = clone(obj(S.mem[s.id]));
    if (s.kind === 'picks') { var keep = arr(c.members); d.picks = arr(d.picks).filter(function (p) { return keep.indexOf(p.by) >= 0; }); delete d.dk; }
    return newSpace(c, s.kind, d, s.id);
  }

  // After a sync that reached the server: every space here has its account copy, and changes sent leave the waiting list
  function synced(r) {
    if (!r || r.state === 'waiting' || r.state === 'error' || r.state === 'out') return;
    Object.keys(S.raw).forEach(function (sid) { S.live[sid] = 1; });
    if (!(GGSync.status().waiting > 0)) { S.pend = {}; localSave(); }
  }

  /* ---------- after a sync: fold kids' drops in, clear picks for wishes that left, rest picks given long ago ---------- */
  function afterSync() {
    var v = viewer(), jobs = [];
    S.circles.forEach(function (c) {
      var ps = spaceOf(c, 'picks'), pd = picksDoc(c), ld = listDoc(c);
      if (!ps || !pd || !ld || !v || v.session === c.owner) return;
      var ids = {}; arr(ld.wishes).forEach(function (w) { ids[w.id] = w; });
      var t = now(), gone = arr(pd.picks).filter(function (p) { return !ids[p.id] || (p.g && t - p.g > GIVEN_REST); });
      if (gone.length) {
        gone.forEach(function (p) { if (p.by === v.acct && !ids[p.id] && !p.g) { var st = pStore(v); st.cleared = arr(st.cleared).concat([{ t: p.t || '', n: obj(ld.me).name || '', at: t }]).slice(-20); pChanged(v); } });
        mutate(ps.id, function (d) { d.picks = arr(d.picks).filter(function (p) { return gone.indexOf(p) < 0 && ids[p.id] && !(p.g && t - p.g > GIVEN_REST); }); });
      }
      if (pd.dk) jobs.push(api('GET', '/gifts/spaces/' + ps.id + '/drops').then(function (r) {
        return Promise.all(arr(r.items).map(function (it) {
          return dropOpen(pd.dk, ps.id, it.data).then(function (j) {
            if (j && j.w && ids[j.w]) mutate(ps.id, function (d) { d.picks = arr(d.picks); if (!d.picks.some(function (p) { return p.id === j.w; })) d.picks.push({ id: j.w, t: ids[j.w].t, by: String(j.by || ''), n: first(j.n), at: +j.at || now(), u: now(), make: 1 }); });
            return api('DELETE', '/gifts/spaces/' + ps.id + '/drops/' + it.id);
          }).catch(function () {});
        }));
      }).catch(function () {}));
    });
    return Promise.all(jobs);
  }

  /* ---------- the drop: I'm Making This One, sealed to the picks space's public key ---------- */
  function hkAes(bits, use) {
    return subtle.importKey('raw', bits, 'HKDF', false, ['deriveKey']).then(function (b) { return subtle.deriveKey({ name: 'HKDF', hash: 'SHA-256', salt: new Uint8Array(0), info: enc.encode('gg-gift-v1 drop') }, b, { name: 'AES-GCM', length: 256 }, false, [use]); });
  }
  function dropSeal(pub, sid, o) {
    var iv = rand(12);
    return Promise.all([subtle.importKey('jwk', { kty: 'EC', crv: 'P-256', x: pub.x, y: pub.y, ext: true }, { name: 'ECDH', namedCurve: 'P-256' }, false, []), subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits'])]).then(function (r) {
      return Promise.all([subtle.deriveBits({ name: 'ECDH', public: r[0] }, r[1].privateKey, 256).then(function (b) { return hkAes(b, 'encrypt'); }), subtle.exportKey('raw', r[1].publicKey)]);
    }).then(function (r) {
      return subtle.encrypt({ name: 'AES-GCM', iv: iv, additionalData: enc.encode('gg1|gdrop|' + sid) }, r[0], enc.encode(JSON.stringify(o))).then(function (ct) {
        var e = new Uint8Array(r[1]), c = new Uint8Array(ct), u = new Uint8Array(1 + e.length + 12 + c.length);
        u[0] = 1; u.set(e, 1); u.set(iv, 1 + e.length); u.set(c, 1 + e.length + 12);
        return b64u(u);
      });
    });
  }
  function dropOpen(dk, sid, data) {
    var u = unb64u(data); if (u[0] !== 1 || u.length < 1 + 65 + 12 + 16) return Promise.reject(new Error('drop'));
    return Promise.all([subtle.importKey('jwk', { kty: 'EC', crv: 'P-256', x: dk.x, y: dk.y, d: dk.d, ext: true }, { name: 'ECDH', namedCurve: 'P-256' }, false, ['deriveBits']), subtle.importKey('raw', u.subarray(1, 66), { name: 'ECDH', namedCurve: 'P-256' }, false, [])]).then(function (r) {
      return subtle.deriveBits({ name: 'ECDH', public: r[1] }, r[0], 256);
    }).then(function (b) { return hkAes(b, 'decrypt'); }).then(function (k) {
      return subtle.decrypt({ name: 'AES-GCM', iv: u.subarray(66, 78), additionalData: enc.encode('gg1|gdrop|' + sid) }, k, u.subarray(78));
    }).then(function (pt) { return JSON.parse(dec.decode(pt)); });
  }

  /* ---------- the invitation card: locked with a key that lives only after the # in the link ---------- */
  function cardKey(raw, use) { return subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, [use]); }
  function cardSeal(card) {
    var k = rand(16), iv = rand(12);
    return cardKey(k, 'encrypt').then(function (ck) { return subtle.encrypt({ name: 'AES-GCM', iv: iv, additionalData: enc.encode('gg1|giftcard') }, ck, enc.encode(JSON.stringify(card))); }).then(function (ct) {
      var c = new Uint8Array(ct), u = new Uint8Array(13 + c.length); u[0] = 1; u.set(iv, 1); u.set(c, 13);
      return { card: b64u(u), key: b64u(k) };
    });
  }
  function cardOpen(data, key) {
    var u = unb64u(data);
    return cardKey(unb64u(key), 'decrypt').then(function (ck) { return subtle.decrypt({ name: 'AES-GCM', iv: u.subarray(1, 13), additionalData: enc.encode('gg1|giftcard') }, ck, u.subarray(13)); }).then(function (pt) { return JSON.parse(dec.decode(pt)); });
  }

  /* ---------- occasions and dates ---------- */
  function occName(d, id) { var o = OCCS.filter(function (x) { return x[0] === id; })[0]; if (o) return o[1]; var c = arr(obj(d).occs).filter(function (x) { return x.id === id; })[0]; return c ? c.n : 'Any Time'; }
  function nextDate(mmdd) {
    var m = /^(\d{2})-(\d{2})$/.exec(mmdd || ''); if (!m) return null;
    var t = new Date(now()), y = t.getFullYear(), d = new Date(y, +m[1] - 1, +m[2], 12);
    var today = new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0);
    if (d < today) d = new Date(y + 1, +m[1] - 1, +m[2], 12);
    return d;
  }
  function nextOcc(d) {
    d = obj(d); var opts = [], ws = arr(d.wishes), has = function (o) { return ws.some(function (w) { return w.o === o; }); };
    if (obj(d.me).bday) opts.push(['Birthday', nextDate(d.me.bday)]);
    if (has('xmas')) opts.push(['Christmas', nextDate('12-25')]);
    opts = opts.filter(function (x) { return x[1]; }).sort(function (a, b) { return a[1] - b[1]; });
    return opts.length ? opts[0][0] + ', ' + MONTHS[opts[0][1].getMonth()] + ' ' + opts[0][1].getDate() : '';
  }
  function sizesAt(d) { var t = 0; SIZE_KEYS.forEach(function (k) { var f = obj(obj(d).fits)[k]; if (f && f.v && +f.at > t) t = +f.at; }); return t; }
  function sizesOld(d) { var t = sizesAt(d); return !!t && now() - t > OLD_SIZES; }

  /* ---------- the planner's link: See Maya's Gift List ---------- */
  function index() {
    var v = viewer(), out = { me: '', names: {} };
    if (!v) { S.idx = out; return out; }
    S.circles.forEach(function (c) {
      var d = listDoc(c); if (!d) return;
      if (c.owner === v.acct) out.me = c.id;
      var n = first(obj(d.me).name).toLowerCase(); if (n && !out.names[n]) out.names[n] = c.id;
    });
    S.idx = out; return out;
  }
  function linkFor(name, me) {
    var x = S.idx;
    if (!x || !S.loaded) { if (!S.idxP) S.idxP = window.GGGifts.index().then(function () { if (window.GGPlanner && GGPlanner.repaint) GGPlanner.repaint(); }); if (!x) return null; }
    if (me) return x.me ? { href: '/grove/#gifts=me', label: 'See My Gift List' } : null;
    var n = first(name).toLowerCase(), cid = n && x.names[n];
    return cid ? { href: '/grove/#gifts=' + cid, label: 'See ' + poss(first(name)) + ' Gift List' } : null;
  }

  /* ---------- drawing ---------- */
  var soonT = null;
  function soon() { clearTimeout(soonT); soonT = setTimeout(function () { index(); paint(); }, 60); }
  function css() {
    if (document.getElementById('gf-css')) return;
    var st = document.createElement('style'); st.id = 'gf-css';
    st.textContent = [
      '.gf{--gf-c:var(--card,#FFFDF9);--gf-l:var(--line,#E3D9C6);--gf-i:var(--ink,#2C1810);--gf-s:var(--ink-soft,#66564A);--gf-g:var(--gold,#2F5A3F);max-width:860px;margin:0 auto;overflow-wrap:anywhere}',
      '.gf .gf-i{width:1.1em;height:1.1em;flex:none;vertical-align:-.15em}',
      '.gf-art{margin:0 0 18px;border-radius:16px;overflow:hidden;border:1px solid var(--gf-l);aspect-ratio:16/6;background:var(--gf-l)}.gf-art img{width:100%;height:100%;object-fit:cover;object-position:50% 45%;display:block}',
      '.gf-people{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px;margin:14px 0}',
      '.gf-pc{display:flex;gap:14px;align-items:flex-start;text-align:left;background:var(--gf-c);border:1px solid var(--gf-l);border-radius:16px;padding:16px;color:var(--gf-i);font:inherit;cursor:pointer;width:100%}',
      '.gf-pc:hover{border-color:var(--gf-g)}.gf-pc b{display:block;font-size:1.05em}.gf-pc small{display:block;color:var(--gf-s);line-height:1.4}',
      '.gf-av{width:56px;height:56px;border-radius:50%;flex:none;overflow:hidden;display:grid;place-items:center;background:var(--gf-l);color:var(--gf-g)}.gf-av svg,.gf-av img{width:100%;height:100%}',
      '.gf-row{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:10px 0}',
      '.gf-w{border-top:1px solid var(--gf-l);padding:14px 0}.gf-w:first-of-type{border-top:0}.gf-w b{font-size:1.05em}.gf-w p{margin:4px 0}',
      '.gf-kind{display:inline-block;font-size:.8em;border:1px solid var(--gf-l);border-radius:999px;padding:1px 10px;color:var(--gf-s);margin-left:6px}',
      '.gf-pick{display:flex;align-items:center;gap:8px;color:var(--gf-g);font-weight:600;margin:6px 0}',
      '.gf-fits{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:4px 18px;margin:8px 0}.gf-fits div{padding:6px 0;border-bottom:1px dashed var(--gf-l)}.gf-fits dt{font-size:.85em;color:var(--gf-s)}.gf-fits dd{margin:0}.gf-fits dd small{display:block}',
      '.gf-quiet{color:var(--gf-s);font-size:.92em;display:flex;gap:8px;align-items:flex-start}',
      '.gf-occ{margin:22px 0 4px;font-family:inherit}',
      '.gf .btn{max-width:100%;white-space:normal;text-align:center}',
      '.gf-chips{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0}.gf-chip{border:1px solid var(--gf-l);background:var(--gf-c);color:var(--gf-i);border-radius:999px;padding:7px 14px;font:inherit;font-size:.92em;cursor:pointer}.gf-chip[aria-pressed="true"]{border-color:var(--gf-g);background:var(--gf-g);color:var(--on-gold,#fff)}',
      '.gf-dlg{position:fixed;inset:0;z-index:300;display:flex;align-items:flex-end;justify-content:center}.gf-scrim{position:absolute;inset:0;background:rgba(20,16,10,.45)}',
      '.gf-panel{position:relative;background:var(--card,#FFFDF9);color:var(--ink,#2C1810);border-radius:20px 20px 0 0;max-width:620px;width:100%;max-height:92vh;overflow:auto;padding:22px 20px calc(22px + env(safe-area-inset-bottom,0px));box-sizing:border-box}',
      '@media (min-width:700px){.gf-dlg{align-items:center}.gf-panel{border-radius:20px}}',
      '.gf-panel h2{margin:0 36px 8px 0;font-size:1.35em}.gf-x{position:absolute;right:12px;top:12px;width:44px;height:44px;border-radius:50%;border:1px solid var(--line,#E3D9C6);background:transparent;color:inherit;cursor:pointer;display:grid;place-items:center}',
      '.gf-panel label.lbl{margin-top:12px}.gf-panel input,.gf-panel textarea,.gf-panel select{box-sizing:border-box;max-width:100%}',
      '.gf-msg{color:#9a3b2a;min-height:1.2em;margin:8px 0}.gf-ok{color:var(--gold,#2F5A3F)}',
      '.gf-linkbox{display:block;word-break:break-all;background:var(--bg,#FAF7F2);border:1px solid var(--line,#E3D9C6);border-radius:12px;padding:10px 12px;font-size:.85em;margin:8px 0}',
      '.gf-two{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
      '.gf-card{margin-bottom:18px}.gf-h3{margin:0 0 6px}.gf-sub{margin:0 0 8px}',
      '.gf-txt{background:none;border:0;padding:6px 2px;color:var(--gf-g);font:inherit;text-decoration:underline;cursor:pointer;min-height:44px}',
      '.gf-inv .gf-art{aspect-ratio:16/8}'
    ].join('\n');
    document.head.appendChild(st);
  }
  function av(pic, name) {
    if (window.GGAv && GGAv.html && pic) { try { return '<span class="gf-av">' + GGAv.html(pic, name, 56) + '</span>'; } catch (e) {} }
    return '<span class="gf-av">' + I('gift') + '</span>';
  }
  function btn(act, label, cls, extra) { return '<button type="button" class="btn ' + (cls || 'btn-line') + ' btn-sm" data-gf="' + esc(act) + '"' + (extra || '') + '>' + label + '</button>'; }
  function paint() {
    if (!S.el || !S.el.isConnected) return;
    css();
    // a fresh mount (the host page just drew this box) reads no layout, so the page keeps its place
    var fresh = !S.el.firstChild, y = fresh ? 0 : window.scrollY;
    S.el.innerHTML = '<section class="gf" aria-label="Gift Lists">' + body() + '</section>';
    if (!fresh && Math.abs(window.scrollY - y) > 2) window.scrollTo(0, y);
  }
  function head(sub) {
    return '<div class="section-head"><h2>Gift Lists</h2><p>' + esc(sub || 'Gift Lists help the people you love give gifts that fit and gifts you love, as a surprise.') + '</p></div>';
  }
  function body() {
    if (S.inv) return invHtml();
    var v = viewer();
    if (!signedIn() || !v) return head() + art() + '<div class="card gf-card"><h3 class="gf-h3">Sign in to see your Gift Lists</h3><p class="gf-sub">Your Grounded Account opens your own Gift List and the lists of everyone in your Gift Circle. An account comes at no cost and needs no Membership.</p><div class="gf-row">' + btn('signin', 'Sign In', 'btn-gold') + btn('signup', 'Create My Account') + '</div></div>';
    if (!S.loaded) return head() + art() + '<div class="card gf-card"><p class="gf-sub">Opening your Gift Lists.</p></div>';
    if (S.err) return head() + '<div class="card gf-card"><p class="gf-sub">Your Gift Lists open again once the connection is back.</p>' + btn('retry', 'Try Again') + '</div>';
    if (S.view.at === 'me') return mineHtml(v);
    if (S.view.at === 'person') { var c = circle(S.view.cid); if (c && c.owner === v.acct) return mineHtml(v); if (c) return personHtml(c, v); }
    return homeHtml(v);
  }
  function art() { return '<figure class="gf-art"><img src="' + ART + '" alt="Two friends at a market, one handing the other a wrapped gift" loading="lazy" width="1600" height="900"></figure>'; }
  function cleared(v) {
    var st = pStore(v), L = arr(st.cleared); if (!L.length) return '';
    return '<div class="card gf-card"><p class="gf-sub">' + L.map(function (x) { return esc((x.n ? poss(x.n) + ' list changed' : 'A list changed') + ': ' + (x.t ? '“' + x.t + '”' : 'a wish') + ' moved off it, so your pick is clear for something new.'); }).join('<br>') + '</p>' + btn('cleared-ok', 'Got It') + '</div>';
  }
  function homeHtml(v) {
    var mine = myCircle(v), md = mine && listDoc(mine), h = head() + art() + cleared(v);
    if (!v.kidLocal) {
      h += '<div class="card gf-card"><div class="gf-row" style="margin:0">' + av(v.pic || obj(md && md.me).pic, myName(v)) + '<div style="flex:1;min-width:180px"><h3 class="gf-h3">My Gift List</h3><p class="gf-sub muted">' +
        (md ? esc(arr(md.wishes).length === 1 ? 'One wish' : arr(md.wishes).length + ' wishes') + (sizesAt(md) ? ', Sizes Updated ' + esc(monthYear(sizesAt(md))) : '') : 'Add wishes and the sizes that fit you.') + '</p></div></div>' +
        '<div class="gf-row">' + btn('open-me', I('gift') + 'Open My Gift List', 'btn-gold') + (v.kid ? '' : btn('invite', I('people') + 'Invite Someone')) + '</div></div>';
    }
    var others = S.circles.filter(function (c) { return c.owner !== v.acct; });
    var named = others.map(function (c) { var d = listDoc(c); return { c: c, d: d, n: d ? first(obj(d.me).name) : '' }; });
    named.sort(function (a, b) { var ha = a.c.via === 'household' || a.c.role === 'manager' || a.c.role === 'owner' ? 0 : 1, hb = b.c.via === 'household' || b.c.role === 'manager' || b.c.role === 'owner' ? 0 : 1; return ha - hb || a.n.localeCompare(b.n); });
    var withList = named.filter(function (x) { return x.d && (x.n || arr(x.d.wishes).length); }), waiting = named.filter(function (x) { return !x.d; });
    if (withList.length) {
      h += '<h3>' + (v.kid ? 'Your Family’s Gift Lists' : 'Gift Lists You Can Open') + '</h3><div class="gf-people">' + withList.map(function (x) {
        var d = x.d, n = x.n || 'Someone in Your Circle', occ = nextOcc(d), sa = sizesAt(d);
        var check = x.c.manage && sizesOld(d) && !v.kid ? '<small><b>Check Sizes</b></small>' : '';
        return '<button type="button" class="gf-pc" data-gf="open:' + esc(x.c.id) + '">' + av(obj(d.me).pic, n) + '<span><b>' + esc(n) + '</b>' + (occ ? '<small>' + esc(occ) + '</small>' : '') + '<small>' + esc(arr(d.wishes).length === 1 ? 'One wish' : arr(d.wishes).length + ' wishes') + '</small>' + (sa ? '<small>Sizes Updated ' + esc(monthYear(sa)) + '</small>' : '') + check + '</span></button>';
      }).join('') + '</div>';
    }
    if (waiting.length) h += '<p class="gf-quiet">' + I('lock') + '<span>' + (waiting.length === 1 ? 'One more Gift List opens' : waiting.length + ' more Gift Lists open') + ' here the next time someone in that circle opens Grounded.</span></p>';
    if (!withList.length && !waiting.length) h += '<div class="card gf-card"><p class="gf-sub">When your Household or the people who invite you keep Gift Lists, they show here.</p></div>';
    var invited = S.circles.filter(function (c) { return c.via === 'invite'; });
    if (invited.length && !v.kid) h += '<div class="card gf-card"><h3 class="gf-h3">Gift Circles You Are In</h3><p class="gf-sub muted">You joined these by invitation. Leave any of them anytime.</p>' + invited.map(function (c) { var d = listDoc(c), n = d ? first(obj(d.me).name) : 'A Gift List'; return '<div class="gf-row"><span style="flex:1">' + esc(n) + '</span>' + btn('leave:' + c.id, S.sure === 'leave:' + c.id ? 'Tap Again to Leave' : 'Leave') + '</div>'; }).join('') + '</div>';
    return h;
  }
  function fitsHtml(d, edit, who) {
    var f = obj(d.fits), rows = FITS.filter(function (x) { return obj(f[x[0]]).v; });
    var h = '<div class="card gf-card"><h3 class="gf-h3">' + I('shirt') + ' What Fits ' + esc(who === 'me' ? 'Me' : first(who)) + '</h3>';
    if (rows.length) h += '<dl class="gf-fits">' + rows.map(function (x) { var r = f[x[0]]; return '<div><dt>' + esc(x[1]) + '</dt><dd>' + esc(r.v) + (r.at ? ' <small class="muted">Updated ' + esc(monthYear(r.at)) + '</small>' : '') + '</dd></div>'; }).join('') + '</dl>';
    else h += '<p class="gf-sub muted">' + (edit ? 'Add your clothing sizes, favorite colors, and things you love, so gifts fit and feel just right.' : 'Sizes show here once they are added.') + '</p>';
    if (edit) h += '<div class="gf-row">' + btn('fits', who === 'me' ? 'Update My Sizes' : 'Update ' + esc(poss(first(who))) + ' Sizes', 'btn-line') + (sizesOld(d) && who !== 'me' ? '<span class="muted">Kids grow fast: these sizes are a few months old.</span>' : '') + '</div>';
    return h + '</div>';
  }
  function groups(d) {
    var ws = arr(d.wishes), order = OCCS.map(function (o) { return o[0]; }).concat(arr(d.occs).map(function (o) { return o.id; })), out = [];
    order.forEach(function (o) { var L = ws.filter(function (w) { return (w.o || 'any') === o; }); if (L.length) out.push([o, L]); });
    var known = {}; order.forEach(function (o) { known[o] = 1; });
    var rest = ws.filter(function (w) { return !known[w.o || 'any']; }); if (rest.length) out.push(['any', rest]);
    return out;
  }
  function wishTop(w) {
    var l = okLink(w.l);
    return '<b>' + esc(w.t) + '</b><span class="gf-kind">' + esc(KIND[w.k] || KIND.have) + '</span>' + (w.n ? '<p class="muted">' + esc(w.n) + '</p>' : '') +
      (l ? '<p><a class="gf-txt" href="' + esc(l) + '" target="_blank" rel="noopener noreferrer">' + I('link') + ' Open Link</a></p>' : '');
  }
  function personHtml(c, v) {
    var d = listDoc(c), n = d ? first(obj(d.me).name) || 'Someone in Your Circle' : '', h = '<div class="gf-row">' + btn('home', I('back') + 'All Gift Lists') + '</div>';
    if (!d) return h + '<div class="card gf-card"><p class="gf-sub">This Gift List opens here the next time someone in its circle opens Grounded.</p></div>';
    var pd = picksDoc(c), picks = {}, sp = showPicks(c, v), edit = canEdit(c, v);
    arr(pd && pd.picks).forEach(function (p) { picks[p.id] = p; });
    var made = obj(obj(pStore(v).made)[c.id]);
    h += '<div class="gf-row">' + av(obj(d.me).pic, n) + '<div><h2 style="margin:0">' + esc(poss(n)) + ' Gift List</h2>' + (nextOcc(d) ? '<p class="muted" style="margin:0">' + esc(nextOcc(d)) + '</p>' : '') + '</div></div>';
    h += fitsHtml(d, edit, n);
    if (edit) h += '<div class="gf-row">' + btn('add', I('plus') + 'Add a Wish', 'btn-gold') + btn('invite:' + c.id, I('people') + 'Invite Someone to ' + esc(poss(n)) + ' List') + '</div>';
    var gs = groups(d);
    if (!gs.length) h += '<div class="card gf-card"><p class="gf-sub">' + esc(n) + ' has room for wishes here. They show as soon as they are added.</p></div>';
    gs.forEach(function (g) {
      h += '<h3 class="gf-occ">' + esc(occName(d, g[0])) + '</h3><div class="card gf-card">' + g[1].map(function (w) {
        var p = picks[w.id], line = '';
        if (sp) {
          if (!pd) line = '<p class="gf-quiet">Picks open here in a moment.</p>';
          else if (!p) line = '<div class="gf-row">' + btn('pick:' + w.id, I('gift') + 'I’ve Got This One', 'btn-gold') + '</div>';
          else if (p.by === v.acct) line = '<p class="gf-pick">' + I('check') + (p.g ? 'You gave this one' : 'You have this one') + '</p>' + (p.note ? '<p class="muted">Your note for givers: ' + esc(p.note) + '</p>' : '') +
            '<div class="gf-row">' + (p.g ? '' : btn('given:' + w.id, 'Mark as Given')) + btn('back:' + w.id, 'Hand It Back') + (p.g ? '' : btn('note:' + w.id, 'Add a Note for Givers')) + '</div>';
          else line = '<p class="gf-pick">' + I('check') + esc(first(p.n) || 'Someone') + (p.make ? ' is making this one' : p.g ? ' gave this one' : ' has this one') + '</p>' + (p.note ? '<p class="muted">' + esc(first(p.n)) + '’s note: ' + esc(p.note) + '</p>' : '');
        } else if (v.kid && c.owner !== v.acct && (w.k === 'hand' || w.k === 'time')) {
          line = made[w.id] ? '<p class="gf-pick">' + I('heart') + 'You’re making this one</p>' : '<div class="gf-row">' + btn('make:' + w.id, I('heart') + 'I’m Making This One', 'btn-gold') + '</div>';
        }
        if (edit) line += '<div class="gf-row">' + btn('edit:' + w.id, 'Edit') + btn('rm:' + w.id, S.sure === 'rm:' + w.id ? 'Tap Again to Remove' : 'Remove') + '</div>';
        return '<div class="gf-w">' + wishTop(w) + line + '</div>';
      }).join('') + '</div>';
    });
    if (sp) h += '<p class="gf-quiet">' + I('lock') + '<span>Your picks stay a surprise. ' + esc(n) + ' sees this list just as it was made.</span></p>';
    else if (v.kid) h += '<p class="gf-quiet">' + I('heart') + '<span>Handmade and Time Together wishes are the ones you can make or plan yourself.</span></p>';
    if (edit) h += circleHtml(c, v, n);
    return h;
  }
  function mineHtml(v) {
    var c = myCircle(v), d = c && listDoc(c), h = '<div class="gf-row">' + btn('home', I('back') + 'All Gift Lists') + '</div>';
    if (v.kidLocal) return h + '<div class="card gf-card"><p class="gf-sub">Your grown-up can give you a Grounded Account of your own, and then your Gift List grows here.</p></div>';
    if (!c || !d) return h + '<div class="card gf-card"><p class="gf-sub">Your Gift List is getting ready.</p></div>';
    var name = first(obj(d.me).name) || myName(v), edit = canEdit(c, v), kid = v.kid;
    h += '<div class="gf-row">' + av(obj(d.me).pic || v.pic, name) + '<div><h2 style="margin:0">My Gift List</h2><p class="muted" style="margin:0">' + esc(name || 'Add your first name') + (obj(d.me).bday ? ', Birthday ' + esc(bdayText(d.me.bday)) : '') + '</p></div></div>';
    h += '<p class="gf-quiet">' + I('lock') + '<span>The people in your Gift Circle keep their picks a surprise, so your list stays just as you made it.</span></p>';
    h += '<div class="gf-row">' + btn('add', I('plus') + 'Add a Wish', 'btn-gold') + btn('me', 'Name and Birthday') + '</div>';
    h += fitsHtml(d, edit && !kid, 'me');
    var gs = groups(d);
    if (!gs.length) h += '<div class="card gf-card"><h3 class="gf-h3">Ideas to Get Started</h3><div class="gf-chips">' + IDEAS.map(function (x, i) { return '<button type="button" class="gf-chip" data-gf="idea:' + i + '">' + esc(x) + '</button>'; }).join('') + '</div></div>';
    gs.forEach(function (g) {
      h += '<h3 class="gf-occ">' + esc(occName(d, g[0])) + '</h3><div class="card gf-card">' + g[1].map(function (w) {
        return '<div class="gf-w">' + wishTop(w) + '<div class="gf-row">' + btn('edit:' + w.id, 'Edit') + btn('have:' + w.id, 'I Have This Now') + btn('rm:' + w.id, S.sure === 'rm:' + w.id ? 'Tap Again to Remove' : 'Remove') + '</div></div>';
      }).join('') + '</div>';
    });
    if (!kid) h += circleHtml(c, v, '');
    var got = arr(pStore(v).got);
    if (got.length) h += '<div class="card gf-card"><h3 class="gf-h3">Gifts I Have Received</h3><p class="gf-sub muted">Kept only for you, handy for thank you notes.</p><ul>' + got.slice().reverse().map(function (g) { return '<li>' + esc(g.t) + (g.at ? ' <small class="muted">' + esc(monthYear(g.at)) + '</small>' : '') + '</li>'; }).join('') + '</ul></div>';
    return h;
  }
  function bdayText(md) { var m = /^(\d{2})-(\d{2})$/.exec(md || ''); return m ? MONTHS[+m[1] - 1] + ' ' + (+m[2]) : ''; }
  function circleHtml(c, v, who) {
    var d = listDoc(c) || {}, names = obj(d.names), hh = window.GGSync && GGSync.household ? GGSync.household() : null;
    var nameOf = function (p) {
      if (names[p.account]) return names[p.account];
      if (p.invite && names['i:' + p.invite]) return names['i:' + p.invite];
      var other = S.circles.filter(function (x) { return x.owner === p.account; })[0], od = other && listDoc(other);
      if (od && obj(od.me).name) return first(od.me.name);
      var hp = hh && arr(hh.people).filter(function (x) { return x.account === p.account; })[0];
      if (hp) return hp.kid || String(hp.email || '').split('@')[0];
      return p.via === 'household' ? 'Someone in Your Household' : 'Someone You Invited';
    };
    var ppl = arr(c.people), house = ppl.filter(function (p) { return p.via === 'household'; }), inv = ppl.filter(function (p) { return p.via === 'invite'; });
    var h = '<div class="card gf-card"><h3 class="gf-h3">' + (who ? esc(poss(first(who))) + ' Gift Circle' : 'My Gift Circle') + '</h3>';
    h += '<p class="gf-sub">' + (house.length ? 'Your Household is here already: ' + esc(house.map(nameOf).join(', ')) + '.' : 'Your Household joins here on its own once you share one.') + '</p>';
    if (inv.length) h += inv.map(function (p) { return '<div class="gf-row"><span style="flex:1">' + esc(nameOf(p)) + '</span>' + btn('remove:' + c.id + ':' + p.account, S.sure === 'remove:' + c.id + ':' + p.account ? 'Tap Again to Remove' : 'Remove') + '</div>'; }).join('');
    var waits = arr(c.invites);
    if (waits.length) h += '<p class="gf-sub muted" style="margin-top:12px">Waiting invitations</p>' + waits.map(function (w) { var nm = names['i:' + w.id] || obj(obj(S.personal.inv)[w.id]).n || 'An invitation'; return '<div class="gf-row"><span style="flex:1">' + esc(nm) + ' <small class="muted">until ' + esc(MONTHS[new Date(w.until).getMonth()] + ' ' + new Date(w.until).getDate()) + '</small></span>' + btn('relink:' + w.id, 'Make a New Link') + btn('withdraw:' + w.id, 'Withdraw') + '</div>'; }).join('');
    h += '<div class="gf-row">' + btn('invite:' + c.id, I('people') + 'Invite Someone', 'btn-gold') + '</div></div>';
    return h;
  }
  function invHtml() {
    var x = S.inv, v = viewer();
    if (x.done) return head() + '<div class="card gf-card gf-inv">' + art() + '<h3 class="gf-h3">You’re in. Here are their Gift Lists.</h3><div class="gf-row">' + btn('inv-close', 'Open the Gift Lists', 'btn-gold') + '</div></div>';
    if (x.bad) return head() + '<div class="card gf-card gf-inv"><h3 class="gf-h3">This invitation has finished its time</h3><p class="gf-sub">Each invitation opens for one person and lasts 14 days. Ask for a new link, and it opens right up.</p>' + btn('inv-close', 'Open Gift Lists') + '</div>';
    if (!x.card && !x.peeked) return head() + '<div class="card gf-card"><p class="gf-sub">Opening your invitation.</p></div>';
    var c = obj(x.card), lists = arr(c.lists), from = first(c.from);
    var t = from && lists.length ? from + ' invited you to see ' + (lists.length === 1 ? poss(first(lists[0].n)) + ' Gift List.' : 'the Gift Lists of ' + listWords(lists.map(function (l) { return first(l.n); })) + '.') : 'Someone in your family invited you to their Gift List.';
    var h = head() + '<div class="card gf-card gf-inv">' + art() + '<h3 class="gf-h3">' + esc(t) + '</h3><p class="gf-sub">A Grounded Account lets you see their lists and pick a gift as a surprise. It comes at no cost and needs no Membership.</p>';
    if (!signedIn() || !v) h += '<div class="gf-row">' + btn('signup', 'Create My Account', 'btn-gold') + btn('signin', 'Sign In') + '</div>';
    else if (v.band !== 'adult') h += '<p class="gf-sub">Gift Lists in your own Household open for you on their own. This invitation is for a grown-up’s account.</p>' + btn('inv-close', 'Open Gift Lists');
    else h += '<label class="lbl" for="gf-jn">Your first name, for your picks</label><input type="text" id="gf-jn" maxlength="24" autocomplete="given-name" value="' + esc(myName(v)) + '"><p class="gf-msg" id="gf-jm" role="alert"></p><div class="gf-row">' + btn('join', 'Join', 'btn-gold') + '</div>';
    return h + '</div>';
  }
  function listWords(L) { L = L.filter(Boolean); if (L.length < 2) return L.join(''); return L.slice(0, -1).join(', ') + (L.length > 2 ? ',' : '') + ' and ' + L[L.length - 1]; }

  /* ---------- sheets ---------- */
  var dlg = null, lastFocus = null;
  function openSheet(title, html, wire) {
    closeSheet(); lastFocus = document.activeElement; css();
    dlg = document.createElement('div'); dlg.className = 'gf-dlg'; dlg.setAttribute('role', 'dialog'); dlg.setAttribute('aria-modal', 'true'); dlg.setAttribute('aria-labelledby', 'gf-dt');
    dlg.innerHTML = '<div class="gf-scrim" data-gfd="x"></div><div class="gf-panel"><button type="button" class="gf-x" data-gfd="x" aria-label="Close">' + I('x') + '</button><h2 id="gf-dt">' + esc(title) + '</h2>' + html + '</div>';
    document.body.appendChild(dlg);
    dlg.addEventListener('click', function (e) { if (e.target.closest('[data-gfd="x"]')) closeSheet(); });
    dlg.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSheet(); });
    if (wire) wire(dlg);
    var f = dlg.querySelector('input,textarea,button.btn'); if (f) setTimeout(function () { try { f.focus(); } catch (e) {} }, 30);
    return dlg;
  }
  function closeSheet() { if (dlg) { dlg.remove(); dlg = null; if (lastFocus && lastFocus.focus && document.body.contains(lastFocus)) lastFocus.focus(); } }
  function chips(name, list, cur) { return '<div class="gf-chips" role="group">' + list.map(function (x) { return '<button type="button" class="gf-chip" data-ch="' + name + ':' + esc(x[0]) + '" aria-pressed="' + (x[0] === cur) + '">' + esc(x[1]) + '</button>'; }).join('') + '</div>'; }
  function chipWire(d, st) {
    d.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ch]'); if (!b) return;
      var a = b.getAttribute('data-ch'), i = a.indexOf(':'), k = a.slice(0, i), val = a.slice(i + 1); st[k] = val;
      d.querySelectorAll('[data-ch^="' + k + ':"]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      if (k === 'o') { var nw = d.querySelector('#gf-ow'); if (nw) nw.hidden = val !== '+'; }
    });
  }
  function wishSheet(c, w, preset) {
    var v = viewer(), d = listDoc(c), ed = !!w; w = w || { id: '', t: preset || '', k: 'have', o: 'bday', n: '', l: '' };
    var st = { k: w.k || 'have', o: w.o || 'bday' }, occs = OCCS.concat(arr(d.occs).map(function (o) { return [o.id, o.n]; })).concat([['+', 'Add Our Own Occasion']]);
    var html = '<form novalidate><label class="lbl" for="gf-wt">What would you love?</label><input type="text" id="gf-wt" maxlength="120" value="' + esc(w.t) + '" placeholder="A day on a hiking trail">' +
      '<span class="lbl">Kind</span>' + chips('k', KINDS, st.k) + '<span class="lbl">For</span>' + chips('o', occs, st.o) +
      '<div id="gf-ow" hidden><label class="lbl" for="gf-on">Our Own Occasion</label><input type="text" id="gf-on" maxlength="40" placeholder="Graduation"></div>' +
      '<label class="lbl" for="gf-wn">A Note <small>(optional)</small></label><textarea id="gf-wn" maxlength="200" rows="2" placeholder="Soft colors, like blue or green">' + esc(w.n || '') + '</textarea>' +
      (v.kid ? '' : '<label class="lbl" for="gf-wl">A Link <small>(optional)</small></label><input type="text" id="gf-wl" maxlength="500" inputmode="url" autocapitalize="off" spellcheck="false" value="' + esc(w.l || '') + '" placeholder="https://">') +
      (ed ? '' : '<span class="lbl">Ideas to Get Started</span><div class="gf-chips">' + IDEAS.map(function (x, i) { return '<button type="button" class="gf-chip" data-idea="' + i + '">' + esc(x) + '</button>'; }).join('') + '</div>') +
      '<p class="gf-msg" id="gf-wm" role="alert"></p><div class="gf-row"><button type="submit" class="btn btn-gold btn-sm">Save</button><button type="button" class="btn btn-line btn-sm" data-gfd="x">Cancel</button></div></form>';
    openSheet(ed ? 'Edit a Wish' : 'Add a Wish', html, function (dl) {
      chipWire(dl, st);
      dl.addEventListener('click', function (e) { var b = e.target.closest('[data-idea]'); if (b) dl.querySelector('#gf-wt').value = IDEAS[+b.getAttribute('data-idea')]; });
      dl.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        var t = clip(dl.querySelector('#gf-wt').value, 120), n = clip(dl.querySelector('#gf-wn').value, 200), le = dl.querySelector('#gf-wl'), l = le ? String(le.value || '').trim() : '', m = dl.querySelector('#gf-wm');
        if (!t) { m.textContent = 'Write what you would love, like a day on a hiking trail.'; return; }
        if (l && !okLink(l)) { m.textContent = 'A link starts with https://, copied from the page.'; return; }
        if (!ed && arr(d.wishes).length >= MAX_WISHES) { m.textContent = 'A Gift List holds up to 60 wishes. I Have This Now makes room.'; return; }
        var o = st.o, sid = spaceOf(c, 'list').id;
        if (o === '+') { var on = clip(dl.querySelector('#gf-on').value, 40); if (!on) { m.textContent = 'Name your occasion, like Graduation.'; return; } o = 'o' + rid().slice(0, 8); var oid = o; mutate(sid, function (x) { x.occs = arr(x.occs).concat([{ id: oid, n: on }]); }); }
        var nw = { id: w.id || rid(), t: t, k: st.k, o: o, n: n, l: l ? okLink(l) : '', u: now() };
        mutate(sid, function (x) { x.wishes = arr(x.wishes); var at = -1; x.wishes.forEach(function (y, i) { if (y.id === nw.id) at = i; }); if (at >= 0) x.wishes[at] = nw; else x.wishes.push(nw); });
        closeSheet(); toast(ed ? 'Saved.' : 'On your list.');
      });
    });
  }
  function fitsSheet(c) {
    var d = listDoc(c), f = obj(d.fits);
    var html = '<p class="gf-sub muted">Clothing sizes only. Each one shows the month it was updated.</p><form novalidate>' + FITS.map(function (x) { return '<label class="lbl" for="gf-f-' + x[0] + '">' + esc(x[1]) + '</label><input type="text" id="gf-f-' + x[0] + '" maxlength="' + (SIZE_KEYS.indexOf(x[0]) >= 0 ? 60 : 160) + '" value="' + esc(obj(f[x[0]]).v || '') + '" placeholder="' + esc(x[2]) + '">'; }).join('') +
      '<div class="gf-row"><button type="submit" class="btn btn-gold btn-sm">Save</button><button type="button" class="btn btn-line btn-sm" data-gfd="x">Cancel</button></div></form>';
    openSheet('What Fits ' + (c.owner === viewer().acct ? 'Me' : first(obj(d.me).name)), html, function (dl) {
      dl.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        mutate(spaceOf(c, 'list').id, function (x) {
          x.fits = obj(x.fits);
          FITS.forEach(function (y) { var val = clip(dl.querySelector('#gf-f-' + y[0]).value, SIZE_KEYS.indexOf(y[0]) >= 0 ? 60 : 160), cur = obj(x.fits[y[0]]); if (val !== (cur.v || '')) { if (val) x.fits[y[0]] = { v: val, at: now() }; else delete x.fits[y[0]]; } });
        });
        closeSheet(); toast('Sizes saved.');
      });
    });
  }
  function meSheet(c) {
    var v = viewer(), d = listDoc(c), me = obj(d.me), m = /^(\d{2})-(\d{2})$/.exec(me.bday || '') || [0, '', ''];
    var st = { pic: me.pic || v.pic || '' };
    var html = '<form novalidate><label class="lbl" for="gf-mn">First Name</label><input type="text" id="gf-mn" maxlength="24" value="' + esc(me.name || myName(v)) + '">' +
      '<span class="lbl">Birthday</span><div class="gf-two"><select id="gf-mm" aria-label="Month"><option value="">Month</option>' + MONTHS.map(function (x, i) { var vv = (i < 9 ? '0' : '') + (i + 1); return '<option value="' + vv + '"' + (vv === m[1] ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select>' +
      '<select id="gf-md" aria-label="Day"><option value="">Day</option>' + Array.apply(null, Array(31)).map(function (_, i) { var vv = (i < 9 ? '0' : '') + (i + 1); return '<option value="' + vv + '"' + (vv === m[2] ? ' selected' : '') + '>' + (i + 1) + '</option>'; }).join('') + '</select></div>' +
      (window.GGAv && GGAv.pick ? '<div class="gf-row">' + btn('pic', 'Choose a Picture') + '</div>' : '') +
      '<div class="gf-row"><button type="submit" class="btn btn-gold btn-sm">Save</button><button type="button" class="btn btn-line btn-sm" data-gfd="x">Cancel</button></div></form>';
    openSheet('Name and Birthday', html, function (dl) {
      var pb = dl.querySelector('[data-gf="pic"]'); if (pb) pb.addEventListener('click', function () { GGAv.pick({ value: st.pic, name: me.name || '', photo: false, onPick: function (val) { st.pic = val || ''; } }); });
      dl.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        var mm = dl.querySelector('#gf-mm').value, dd = dl.querySelector('#gf-md').value;
        mutate(spaceOf(c, 'list').id, function (x) { x.me = { name: first(dl.querySelector('#gf-mn').value), pic: st.pic, bday: mm && dd ? mm + '-' + dd : '', u: now() }; });
        closeSheet(); toast('Saved.');
      });
    });
  }
  function noteSheet(c, wid) {
    var pd = picksDoc(c), p = arr(pd && pd.picks).filter(function (x) { return x.id === wid; })[0]; if (!p) return;
    openSheet('Add a Note for Givers', '<p class="gf-sub muted">Other givers see it. The list’s owner never does.</p><form novalidate><label class="lbl" for="gf-nt">Your Note</label><textarea id="gf-nt" maxlength="200" rows="3" placeholder="Want to go in on this together?">' + esc(p.note || '') + '</textarea><div class="gf-row"><button type="submit" class="btn btn-gold btn-sm">Save</button><button type="button" class="btn btn-line btn-sm" data-gfd="x">Cancel</button></div></form>', function (dl) {
      dl.querySelector('form').addEventListener('submit', function (e) { e.preventDefault(); var t = clip(dl.querySelector('#gf-nt').value, 200); mutate(spaceOf(c, 'picks').id, function (x) { arr(x.picks).forEach(function (q) { if (q.id === wid) { q.note = t; q.u = now(); } }); }); closeSheet(); toast('Saved for the other givers.'); });
    });
  }
  function inviteSheet(cid, again) {
    var v = viewer(), lists = S.circles.filter(function (c) { return (c.owner === v.acct && c.role === 'owner' && !v.kid) || c.role === 'manager'; }).filter(function (c) { return listDoc(c); });
    if (!lists.length) { toast('Your Gift List is getting ready. Try again in a moment.'); return; }
    var st = { pick: {} }; lists.forEach(function (c) { st.pick[c.id] = cid ? c.id === cid : c.owner === v.acct; });
    if (again) { st.pick = {}; arr(again.circles).forEach(function (id) { st.pick[id] = true; }); }
    var nm = function (c) { return c.owner === v.acct ? 'My Gift List' : poss(first(obj(listDoc(c).me).name) || 'A Child') + ' Gift List'; };
    var html = '<p class="gf-sub">Your invitation opens for one person and lasts 14 days.</p><form novalidate><label class="lbl" for="gf-in">Their Name <small>(what you call them)</small></label><input type="text" id="gf-in" maxlength="40" value="' + esc(again ? again.n : '') + '" placeholder="Grandma Sue">' +
      '<span class="lbl">Which Lists</span><div class="gf-chips">' + lists.map(function (c) { return '<button type="button" class="gf-chip" data-lc="' + esc(c.id) + '" aria-pressed="' + !!st.pick[c.id] + '">' + esc(nm(c)) + '</button>'; }).join('') + '</div>' +
      '<label class="lbl" for="gf-ie">Their Email <small>(only for Send by Email)</small></label><input type="email" id="gf-ie" maxlength="254" autocomplete="off" inputmode="email" autocapitalize="off" spellcheck="false">' +
      '<p class="gf-msg" id="gf-im" role="alert"></p><div class="gf-row"><button type="submit" class="btn btn-gold btn-sm">Make the Invitation</button><button type="button" class="btn btn-line btn-sm" data-gf-email="1">Send by Email</button></div><div id="gf-iout"></div></form>';
    openSheet('Invite Someone', html, function (dl) {
      dl.addEventListener('click', function (e) { var b = e.target.closest('[data-lc]'); if (!b) return; var id = b.getAttribute('data-lc'); st.pick[id] = !st.pick[id]; b.setAttribute('aria-pressed', String(st.pick[id])); });
      var go = function (email) {
        var who = clip(dl.querySelector('#gf-in').value, 40), m = dl.querySelector('#gf-im'), ids = Object.keys(st.pick).filter(function (k) { return st.pick[k]; });
        if (!who) { m.textContent = 'Write the name you call them, like Grandma Sue.'; return; }
        if (!ids.length) { m.textContent = 'Choose at least one list.'; return; }
        if (email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { m.textContent = 'Write their email to send it by email.'; return; }
        m.textContent = ''; dl.querySelectorAll('button[type=submit],[data-gf-email]').forEach(function (b) { b.disabled = true; });
        makeInvite(ids, who, email).then(function (r) {
          if (again) api('DELETE', '/gifts/invites/' + again.id).catch(function () {});
          var out = dl.querySelector('#gf-iout');
          if (email !== undefined) { out.innerHTML = '<p class="gf-ok">Sent to ' + esc(email) + '. The email names no one, so your list stays private.</p>'; return; }
          var txt = poss(myName(v) || 'Your family') + ' Gift List on Grow With Grounded: a Grounded Account lets you pick a gift as a surprise.';
          out.innerHTML = '<p class="gf-ok">Your invitation for ' + esc(who) + ' is ready.</p><code class="gf-linkbox">' + esc(r.link) + '</code><div class="gf-row">' +
            (navigator.share ? '<button type="button" class="btn btn-gold btn-sm" data-sh="share">Share the Invitation</button>' : '') +
            '<a class="btn btn-line btn-sm" href="sms:?&body=' + encodeURIComponent(txt + ' ' + r.link) + '">Text the Invitation</a><button type="button" class="btn btn-line btn-sm" data-sh="copy">Copy the Link</button></div>';
          out.addEventListener('click', function (e) {
            var b = e.target.closest('[data-sh]'); if (!b) return;
            if (b.getAttribute('data-sh') === 'share') navigator.share({ title: 'A Gift List Invitation', text: txt, url: r.link }).catch(function () {});
            else { try { navigator.clipboard.writeText(r.link).then(function () { toast('The link is copied.'); }, function () {}); } catch (x) {} }
          });
        }, function (e) { dl.querySelectorAll('button[type=submit],[data-gf-email]').forEach(function (b) { b.disabled = false; }); m.textContent = (e && e.message) || 'Try again in a moment.'; });
      };
      dl.querySelector('form').addEventListener('submit', function (e) { e.preventDefault(); go(); });
      dl.querySelector('[data-gf-email]').addEventListener('click', function () { go(String(dl.querySelector('#gf-ie').value || '').trim()); });
    });
  }
  function makeInvite(ids, who, email) {
    var v = viewer(), lists = ids.map(circle).filter(Boolean), keys = {};
    lists.forEach(function (c) { ['list', 'picks'].forEach(function (k) { var s = spaceOf(c, k); if (s && S.raw[s.id]) keys[s.id] = b64u(S.raw[s.id]); }); });
    var card = { v: 1, from: myName(v) || '', lists: lists.map(function (c) { return { c: c.id, n: first(obj(listDoc(c).me).name) || '' }; }), keys: keys };
    var sealed = email !== undefined ? Promise.resolve(null) : cardSeal(card);
    return sealed.then(function (sc) {
      return api('POST', '/gifts/invites', email !== undefined ? { circles: ids, email: email } : { circles: ids, card: sc.card }).then(function (r) {
        lists.forEach(function (c) { mutate(spaceOf(c, 'list').id, function (x) { x.names = obj(x.names); x.names['i:' + r.id] = who; }); });
        S.personal.inv = obj(S.personal.inv); S.personal.inv[r.id] = { n: who, circles: ids, at: now() }; localSave(); GGSync.changed('acct:gifts');
        return api('GET', '/gifts').then(function (g) { S.circles = arr(g.circles); paint(); return { id: r.id, link: location.origin + '/grove/#gift=' + r.code + (sc ? '~' + sc.key : '') }; });
      });
    });
  }

  /* ---------- the invitation: #gift=<code>~<key> ---------- */
  function invite(code, key) {
    S.inv = { code: String(code || ''), key: String(key || ''), card: null, peeked: false };
    try { sessionStorage.setItem('gg-gift-inv', JSON.stringify({ code: S.inv.code, key: S.inv.key })); } catch (e) {}
    paint();
    return ready().then(function () { return api('POST', '/gifts/peek', { code: S.inv.code }); }).then(function (r) {
      S.inv.peeked = true;
      if (r.card && S.inv.key) return cardOpen(r.card, S.inv.key).then(function (c) { S.inv.card = c; }, function () {});
    }, function () { S.inv.bad = true; }).then(paint);
  }
  function invResume() { try { var j = JSON.parse(sessionStorage.getItem('gg-gift-inv')); if (j && j.code && !S.inv) invite(j.code, j.key); } catch (e) {} }
  function join() {
    var v = viewer(), inp = document.getElementById('gf-jn'), m = document.getElementById('gf-jm'), nm = first(inp ? inp.value : '');
    if (!nm) { if (m) m.textContent = 'Write your first name, so the other givers know who picked.'; return; }
    S.personal.name = nm; localSave(); if (window.GGSync) GGSync.changed('acct:gifts');
    var x = S.inv;
    api('POST', '/gifts/join', { code: x.code }).then(function () {
      Object.keys(obj(obj(x.card).keys)).forEach(function (sid) { S.cardKeys[sid] = x.card.keys[sid]; });
      try { sessionStorage.removeItem('gg-gift-inv'); } catch (e) {}
      x.done = true; S.loaded = false; paint();
      return reload();
    }).then(function () {
      var c = myCircle(v), d = c && listDoc(c);
      if (d && !obj(d.me).name) mutate(spaceOf(c, 'list').id, function (y) { y.me = Object.assign(obj(y.me), { name: nm, u: now() }); });
    }).catch(function (e) { if (m) m.textContent = e && e.why === 'expired' ? 'This invitation has finished its time. Ask for a new link.' : (e && e.message) || 'Try again in a moment.'; });
  }
  var uiP = null;
  function acctSheet(view) {
    if (!uiP) uiP = new Promise(function (ok) {
      if (window.GGAccountUI) return ok(window.GGAccountUI);
      var s = document.createElement('script'); s.src = '/shared/gg-account-ui.js?v=c228'; s.onload = function () { ok(window.GGAccountUI || null); }; s.onerror = function () { uiP = null; ok(null); }; document.head.appendChild(s);
    });
    return uiP.then(function (U) {
      if (!U) { toast('Check the connection, then try again.'); return; }
      var then = function () { try { U.close(); } catch (e) {} return Promise.resolve(); };
      var o = view === 'signup' ? { title: 'Create My Account', lead: 'A Grounded Account opens Gift Lists for you: see the lists of the people who invite you, and pick gifts as a surprise. It comes at no cost and needs no Membership.', then: then } : { then: then };
      return U.open(view, o);
    }).then(function () { S.acct = ''; S.loaded = false; paint(); return reload(); });
  }

  /* ---------- taps ---------- */
  function toast(m) { if (window.GGP && GGP.toast) GGP.toast(m); }
  function onTap(e) {
    var b = e.target.closest('[data-gf]'); if (!b || !S.el || !S.el.contains(b)) return;
    var a = b.getAttribute('data-gf'), i = a.indexOf(':'), k = i < 0 ? a : a.slice(0, i), val = i < 0 ? '' : a.slice(i + 1), v = viewer();
    if (k !== 'rm' && k !== 'leave' && k !== 'remove') S.sure = '';
    var cur = S.view.at === 'me' ? myCircle(v) : circle(S.view.cid);
    if (k === 'signin' || k === 'signup') return acctSheet(k);
    if (k === 'retry') { S.err = ''; S.loaded = false; paint(); return reload(); }
    if (k === 'home') { S.view = { at: 'home', cid: '' }; paint(); hashSet(''); return; }
    if (k === 'open-me') { S.view = { at: 'me', cid: '' }; paint(); hashSet('me'); return; }
    if (k === 'open') { S.view = { at: 'person', cid: val }; paint(); hashSet(val); return; }
    if (k === 'inv-close') { S.inv = null; try { sessionStorage.removeItem('gg-gift-inv'); } catch (x) {} S.view = { at: 'home', cid: '' }; paint(); return; }
    if (k === 'join') return join();
    if (k === 'cleared-ok') { var st = pStore(v); st.cleared = []; pChanged(v); paint(); return; }
    if (k === 'invite') return inviteSheet(val || (myCircle(v) || {}).id);
    if (k === 'relink') { var iv = obj(obj(S.personal.inv)[val]); return inviteSheet('', { id: val, n: iv.n || '', circles: iv.circles || [] }); }
    if (k === 'withdraw') { api('DELETE', '/gifts/invites/' + val).then(function () { return api('GET', '/gifts'); }).then(function (g) { S.circles = arr(g.circles); paint(); toast('Withdrawn.'); }, function () { toast('Try again in a moment.'); }); return; }
    if (k === 'leave' || k === 'remove') {
      if (S.sure !== a) { S.sure = a; paint(); return; }
      S.sure = '';
      var parts = val.split(':'), cid = parts[0], who = k === 'leave' ? (v && v.session) : parts[1];
      api('DELETE', '/gifts/circles/' + cid + '/people/' + who).then(function () { S.view = { at: 'home', cid: '' }; return reload(); }).then(function () { toast(k === 'leave' ? 'You left that Gift Circle.' : 'Removed. The list has a new key now.'); }, function () { toast('Try again in a moment.'); });
      return;
    }
    if (!cur) return;
    var ls = spaceOf(cur, 'list'), ps = spaceOf(cur, 'picks'), ld = listDoc(cur);
    if (k === 'add') return wishSheet(cur, null);
    if (k === 'idea') return wishSheet(cur, null, IDEAS[+val]);
    if (k === 'fits') return fitsSheet(cur);
    if (k === 'me') return meSheet(cur);
    var w = arr(ld && ld.wishes).filter(function (x) { return x.id === val; })[0];
    if (k === 'edit' && w) return wishSheet(cur, w);
    if (k === 'rm' && w) { if (S.sure !== a) { S.sure = a; paint(); return; } S.sure = ''; mutate(ls.id, function (x) { x.wishes = arr(x.wishes).filter(function (y) { return y.id !== val; }); }); toast('Removed from the list.'); return; }
    if (k === 'have' && w) { var st2 = pStore(v); st2.got = arr(st2.got).concat([{ t: w.t, at: now() }]).slice(-200); pChanged(v); mutate(ls.id, function (x) { x.wishes = arr(x.wishes).filter(function (y) { return y.id !== val; }); }); toast('Moved to Gifts I Have Received.'); return; }
    if (k === 'make' && w) {
      var pk = spaceOf(cur, 'picks');
      if (!pk || !pk.pub) { toast('This list opens for that in a moment. Try again soon.'); return; }
      b.disabled = true;
      dropSeal(pk.pub, pk.id, { w: w.id, by: v.acct, n: myName(v), at: now() }).then(function (data) { return api('POST', '/gifts/spaces/' + pk.id + '/drop', { data: data }); }).then(function () {
        var st3 = pStore(v); st3.made = obj(st3.made); st3.made[cur.id] = obj(st3.made[cur.id]); st3.made[cur.id][w.id] = now(); pChanged(v); paint(); toast('Your plan is a surprise. Have fun making it.');
      }, function () { b.disabled = false; toast('Try again in a moment.'); });
      return;
    }
    if (!ps || !showPicks(cur, v)) return;
    if (k === 'pick' && w) { mutate(ps.id, function (x) { x.picks = arr(x.picks); if (!x.picks.some(function (p) { return p.id === val; })) x.picks.push({ id: val, t: w.t, by: v.acct, n: myName(v), at: now(), u: now() }); }); toast('It is yours to give. Only the other givers see it.'); return; }
    if (k === 'back') { mutate(ps.id, function (x) { x.picks = arr(x.picks).filter(function (p) { return !(p.id === val && p.by === v.acct); }); }); toast('Handed back. It is open for someone else.'); return; }
    if (k === 'given') { mutate(ps.id, function (x) { arr(x.picks).forEach(function (p) { if (p.id === val && p.by === v.acct) { p.g = now(); p.u = now(); } }); }); toast('Marked as given.'); return; }
    if (k === 'note') return noteSheet(cur, val);
  }
  function hashSet(x) {
    if (!/^\/grove\//.test(location.pathname)) return;
    var h = '#gifts' + (x ? '=' + x : '');
    if (location.hash !== h) { try { history.pushState(null, '', h); } catch (e) {} }
  }
  function mount(el, o) {
    o = o || {};
    if (S.el && S.el !== el) S.el.removeEventListener('click', onTap);
    if (S.el !== el) el.addEventListener('click', onTap);
    S.el = el; S.o = o;
    if (o.who === 'me') S.view = { at: 'me', cid: '' }; else if (o.who) S.view = { at: 'person', cid: o.who }; else if (o.who === '') S.view = { at: 'home', cid: '' };
    invResume();
    paint();
    if ((!S.loaded && !S.bootP) || o.fresh) reload();
  }
  // Signing in or out, a list renewed elsewhere, and a sync that brought something new
  function hook() {
    if (S.hooked || !window.GGSync || !window.GGAccount || !GGAccount.on) return;
    S.hooked = true;
    GGAccount.on(function (t) {
      if (t === 'erase') { try { Object.keys(localStorage).filter(function (k) { return k.indexOf('gg-gifts:') === 0; }).forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {} }
      if (t === 'erase' || t === 'state') { S.acct = ''; S.loaded = false; if (S.el && S.el.isConnected) reload(); }
    });
    GGSync.on(function (t, d) {
      if (t === 'applied' && d && /^q/.test(d.scope || '')) soon();
      if (t === 'status' && d && d.state === 'idle' && !d.error && !d.waiting && Object.keys(S.pend).length && S.loaded) { Object.keys(S.raw).forEach(function (sid) { S.live[sid] = 1; }); S.pend = {}; localSave(); }
      // a space that is gone (renewed after someone left, or this person left): read the circles again, once at a time
      if (t === 'giftgone' && d && S.raw[d.id]) { delete S.raw[d.id]; delete S.mem[d.id]; GGSync.ungift(d.id); if (!S.bootP) reload(); }
    });
  }
  function reload() { return Promise.resolve(S.bootP).then(function () { return boot({ own: !!S.el }); }); }

  window.GGGifts = {
    v: V, live: live, mount: mount, invite: invite, refresh: function () { S.loaded = false; return reload(); },
    index: function () { return (S.loaded ? Promise.resolve() : Promise.resolve(S.bootP).then(function () { return boot({}); })).then(function () { return index(); }); }, linkFor: linkFor,
    _: { S: S, nextOcc: nextOcc, sizesOld: sizesOld, okLink: okLink, dropSeal: dropSeal, dropOpen: dropOpen, cardSeal: cardSeal, cardOpen: cardOpen, viewer: viewer }
  };
})();
