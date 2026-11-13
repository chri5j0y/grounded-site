/* =====================================================================
   HOUSEHOLD ON ONE DEVICE (shared/gg-house.js), GWG BLD 980
   Chris (November 13, 2026): "when adding a profile to a device you should be able to add them to your household,
   before or after setup.. i have a profile for everyone in my fam on this pc". Decision 1: either side can add, and
   the other says yes.

   What it is
   - The local version of the Grounded Account Household (up to 6, shared/gg-sync.js). Profiles on this device form
     a household that shares what a Household already shares: the Family Kitchen (and with it the table count),
     Grounded Money's plan and logs (debts, goals, and tool answers stay each person's own), and the Family Planner.
     Each person's check-ins, journal, and growth plan stay locked in their own profile and never come here.
   - After setup: the Household sheet (/home/, GGHouse.card) lists every other profile on this device with Add to
     Our Household, and Leave Household for a member. The profile added sees Join This Household? the next time it
     opens (Join or Not Now). Nothing is shared until it says Join.
   - During setup: a new profile meets one step, Join a Household on This Device? (GGHouse.setup). A household
     grown-up beside it can type their passcode to say yes right there, or the new profile asks, and a grown-up in
     the household says yes the next time they open.
   - Kids (Maple and Aspen) join with the grown-up who holds their key, the way an added family member does today:
     that grown-up's yes is theirs. Teens and grown-ups say yes for themselves.

   Where it lives (everything stays on this device)
   - gg-house-v1 (open, like the profile list): each household's id, its members, invites, asks, and each key
     passed to a new member (locked to that member's public key, so only they can open it). No answers, no names.
   - gg-house:<id>: the shared box, AES-GCM with the household key (AAD gg-house-v1|<id>). Each part (kitchen,
     money, planner) is {v, by, at, d}: the newest version wins, and each profile remembers the version it last took.
   - Inside each member's own locked vault: vault.house[<this device>] = {id, k, seen, sent}. The household key is
     only ever in a member's vault or passed locked to a member's public key (shared/gg-profiles.js, p.pub and
     vault.hkey), so no passcode is shared and no profile ever reads another profile's private data.

   For a host page (home/home.js)
     GGHouse.host({kinds: {kitchen: {get, put}, money: {get, put}}, leave(), refresh(), toast(m)})
     GGHouse.card(o)       the Household sheet card (o: {pic, I}); '' for a kid
     GGHouse.sync()        share and take now (also runs on a profile switch and soon after each save)
     GGHouse.setup(id)     the setup step for a new profile (gg-profiles.js calls it)
     GGHouse.houses(), of(id), add(id), accept(hid), notNow(hid), ask(hid), welcome(hid, id), takeBack(hid, id),
     leave(), forget(id), status()
   No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGHouse) return;
  var V = 'c026', REG = 'gg-house-v1', BOXK = 'gg-house:', DEVK = 'gg-house-dev', PLANK = 'gg-plan:';
  var subtle = window.crypto && crypto.subtle, enc = new TextEncoder(), dec = new TextDecoder();
  var EC = { name: 'ECDH', namedCurve: 'P-256' };

  /* ---------- small helpers ---------- */
  function arr(x) { return Array.isArray(x) ? x : []; }
  function obj(x) { return x && typeof x === 'object' && !Array.isArray(x) ? x : {}; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function b64(u8) { var s = ''; for (var i = 0; i < u8.length; i += 8192) s += String.fromCharCode.apply(null, u8.subarray(i, i + 8192)); return btoa(s); }
  function unb64(s) { var b = atob(String(s)), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function b64u(u8) { return b64(u8).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function unb64u(t) { t = String(t).replace(/-/g, '+').replace(/_/g, '/'); while (t.length % 4) t += '='; return unb64(t); }
  function rnd(n) { return crypto.getRandomValues(new Uint8Array(n)); }
  function rid() { return b64u(rnd(9)); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function today() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function stable(v) {
    if (v === undefined) return 'u';
    if (v === null || typeof v !== 'object') return JSON.stringify(v);
    if (Array.isArray(v)) return '[' + v.map(stable).join(',') + ']';
    return '{' + Object.keys(v).sort().filter(function (k) { return v[k] !== undefined; }).map(function (k) { return JSON.stringify(k) + ':' + stable(v[k]); }).join(',') + '}';
  }
  function hash(v) { var t = stable(v), h = 5381; for (var i = 0; i < t.length; i++) h = ((h * 33) ^ t.charCodeAt(i)) >>> 0; return t.length + '.' + h.toString(36); }
  function P(x) { return Promise.resolve(x); }
  function seq(list, fn) { return list.reduce(function (pr, x) { return pr.then(function () { return fn(x); }); }, P()); }
  function G() { return window.GGP || null; }
  function first(n) { return String(n || '').trim().split(/\s+/)[0] || 'Someone'; }
  function nameOf(id) { var q = G() && G().get(id); return q ? q.name : 'Someone'; }
  function andList(a) { a = a.filter(Boolean); return a.length < 2 ? (a[0] || '') : a.length === 2 ? a[0] + ' and ' + a[1] : a.slice(0, -1).join(', ') + ', and ' + a[a.length - 1]; }
  function isKid(q) { return !!q && (q.age === 'maple' || q.age === 'aspen'); }
  function isTeen(q) { return !!q && q.age === 'pine'; }
  function isAdult(q) { return !!q && q.age === 'adult'; }
  function toast(m) { if (HOST.toast) HOST.toast(m); else if (G() && G().toast) G().toast(m); }

  /* ---------- this device and the open record ---------- */
  function dev() { var d = ''; try { d = localStorage.getItem(DEVK) || ''; if (!d) { d = rid(); localStorage.setItem(DEVK, d); } } catch (e) { d = d || 'here'; } return d; }
  function norm(h) { h.members = arr(h.members); h.need = arr(h.need); h.invites = arr(h.invites); h.asks = arr(h.asks); h.wraps = obj(h.wraps); return h; }
  function reg() { var j = null; try { j = JSON.parse(localStorage.getItem(REG)); } catch (e) {} if (!j || !Array.isArray(j.list)) j = { v: 1, list: [] }; j.list.forEach(norm); return j; }
  function clean(r) {
    var ids = {}; (G() ? G().list() : []).forEach(function (q) { ids[q.id] = 1; });
    r.list.forEach(function (h) {
      h.members = h.members.filter(function (x, i, a) { return ids[x] && a.indexOf(x) === i; });
      h.need = h.need.filter(function (x) { return h.members.indexOf(x) >= 0; });
      h.invites = h.invites.filter(function (i) { return ids[i.to] && h.members.indexOf(i.to) < 0; });
      h.asks = h.asks.filter(function (a) { return ids[a.from] && h.members.indexOf(a.from) < 0; });
      Object.keys(h.wraps).forEach(function (k) { if (!ids[k] || (h.members.indexOf(k) >= 0 && h.need.indexOf(k) < 0) || (h.members.indexOf(k) < 0 && !h.invites.some(function (i) { return i.to === k; }))) delete h.wraps[k]; });
    });
    r.list = r.list.filter(function (h) { if (h.members.length) return true; try { localStorage.removeItem(BOXK + h.id); } catch (e) {} return false; });
  }
  function edit(fn) { var r = reg(), out = fn(r); clean(r); try { if (r.list.length) localStorage.setItem(REG, JSON.stringify(r)); else localStorage.removeItem(REG); } catch (e) {} return out; }
  function houses() { var r = reg(); clean(r); return r.list; }
  function byId(r, hid) { return r.list.filter(function (h) { return h.id === hid; })[0] || null; }
  function houseById(hid) { return houses().filter(function (h) { return h.id === hid; })[0] || null; }
  function houseOf(pid) { return houses().filter(function (h) { return h.members.indexOf(pid) >= 0; })[0] || null; }
  function invitesTo(pid) { var out = []; houses().forEach(function (h) { h.invites.forEach(function (i) { if (i.to === pid) out.push({ h: h, i: i }); }); }); return out; }
  function asksOf(pid) { var out = []; houses().forEach(function (h) { h.asks.forEach(function (a) { if (a.from === pid) out.push({ h: h, a: a }); }); }); return out; }
  function hhName(h, skip) { var n = h.members.filter(function (x) { return x !== skip; }).map(function (x) { return first(nameOf(x)); }); return n.length ? 'Household of ' + andList(n) : 'Household'; }

  /* ---------- each member's own record, inside their locked vault ---------- */
  function vault(pid) { var g = G(); return g && g.isOpen(pid) ? g.data(pid) : null; }
  function ent(pid) { var d = vault(pid), m = d && obj(d.house)[dev()]; return m && m.id ? m : null; }
  function setEnt(pid, e) {
    var d = vault(pid); if (!d) return;
    if (!d.house || typeof d.house !== 'object' || Array.isArray(d.house)) d.house = {};
    if (e) d.house[dev()] = e; else delete d.house[dev()];
    if (!Object.keys(d.house).length) delete d.house;
  }
  function mkEnt(hid, k) { return { id: hid, k: k || null, at: today(), seen: {}, sent: {} }; }

  /* ---------- crypto ---------- */
  function aes(raw) { return subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']); }
  function readBox(hid, k) {
    var box = null; try { box = JSON.parse(localStorage.getItem(BOXK + hid)); } catch (e) {}
    if (!box || !box.iv || !box.ct) return P({});
    return aes(unb64(k)).then(function (key) { return subtle.decrypt({ name: 'AES-GCM', iv: unb64(box.iv), additionalData: enc.encode('gg-house-v1|' + hid) }, key, unb64(box.ct)); })
      .then(function (b) { return obj(JSON.parse(dec.decode(b))); }).catch(function () { return null; });
  }
  function writeBox(hid, k, o) {
    var iv = rnd(12);
    return aes(unb64(k)).then(function (key) { return subtle.encrypt({ name: 'AES-GCM', iv: iv, additionalData: enc.encode('gg-house-v1|' + hid) }, key, enc.encode(JSON.stringify(o))); }).then(function (ct) {
      try { localStorage.setItem(BOXK + hid, JSON.stringify({ v: 1, iv: b64(iv), ct: b64(new Uint8Array(ct)) })); return true; }
      catch (e) {
        // a full device: the kitchen travels without its recipe library (each phone keeps its own)
        if (o.kitchen && o.kitchen.d && o.kitchen.d.lib) { o.kitchen.d = { c: o.kitchen.d.c, t: o.kitchen.d.t }; return writeBox(hid, k, o); }
        toast('This device is full, so the household could not save just now.'); return false;
      }
    });
  }
  function pubKey(j) { return subtle.importKey('jwk', { kty: 'EC', crv: 'P-256', x: j.x, y: j.y, ext: true }, EC, false, []); }
  function privKey(j) { return subtle.importKey('jwk', { kty: 'EC', crv: 'P-256', x: j.x, y: j.y, d: j.d, ext: true }, EC, false, ['deriveBits']); }
  function kdf(bits) { return subtle.digest('SHA-256', bits).then(aes); }
  // The household key, locked so only pid opens it (with the private key inside pid's own vault)
  function wrapFor(hid, pid, k) {
    var q = G().get(pid); if (!q || !q.pub || !k || !subtle) return P(null);
    var eph = null, iv = rnd(12);
    return subtle.generateKey(EC, true, ['deriveBits']).then(function (kp) { eph = kp; return pubKey(q.pub); })
      .then(function (pk) { return subtle.deriveBits({ name: 'ECDH', public: pk }, eph.privateKey, 256); }).then(kdf)
      .then(function (key) { return subtle.encrypt({ name: 'AES-GCM', iv: iv, additionalData: enc.encode('gg-house-wrap|' + hid + '|' + pid) }, key, unb64(k)); })
      .then(function (ct) { return subtle.exportKey('jwk', eph.publicKey).then(function (e) { return { e: { x: e.x, y: e.y }, iv: b64(iv), ct: b64(new Uint8Array(ct)), to: q.pub.x.slice(0, 12), at: Date.now() }; }); })
      .catch(function () { return null; });
  }
  function unwrap(hid, pid, w) {
    var d = vault(pid), hk = d && d.hkey;
    if (!hk || !w || !w.e) return Promise.reject(new Error('no key'));
    return Promise.all([privKey(hk), pubKey(w.e)]).then(function (k) { return subtle.deriveBits({ name: 'ECDH', public: k[1] }, k[0], 256); }).then(kdf)
      .then(function (key) { return subtle.decrypt({ name: 'AES-GCM', iv: unb64(w.iv), additionalData: enc.encode('gg-house-wrap|' + hid + '|' + pid) }, key, unb64(w.ct)); })
      .then(function (raw) { return b64(new Uint8Array(raw)); });
  }
  function wrapFresh(w, pid) { var q = G().get(pid); return !!(w && q && q.pub && w.to === q.pub.x.slice(0, 12)); }
  // A Family Planner copy under a new key, so a person who leaves keeps their own planner and the household keeps its own
  function plannerCopy(rec, by) {
    var box = null; try { box = JSON.parse(localStorage.getItem(PLANK + rec.fid)); } catch (e) {}
    var nf = rid(), nk = b64u(rnd(32)), out = { fid: nf, k: nk, at: today(), by: by };
    if (!box || !box.iv || !box.ct) return P(out);
    var imp = function (k) { return subtle.importKey('raw', unb64u(k), { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']); };
    return imp(rec.k).then(function (key) { return subtle.decrypt({ name: 'AES-GCM', iv: unb64u(box.iv), additionalData: enc.encode('gg-plan-v1|' + rec.fid) }, key, unb64u(box.ct)); }).then(function (b) {
      var plan = JSON.parse(dec.decode(b)); plan.fid = nf; plan.u = Date.now();
      var iv = rnd(12);
      return imp(nk).then(function (key) { return subtle.encrypt({ name: 'AES-GCM', iv: iv, additionalData: enc.encode('gg-plan-v1|' + nf) }, key, enc.encode(JSON.stringify(plan))); }).then(function (ct) {
        try { localStorage.setItem(PLANK + nf, JSON.stringify({ v: 1, iv: b64u(iv), ct: b64u(new Uint8Array(ct)) })); } catch (e) {}
        return out;
      });
    }).catch(function () { return out; });
  }

  /* ---------- who is here ---------- */
  function me() { var g = G(), a = g && g.active(); return a ? g.get(a.id) : null; }
  function myKey(pid) { var e = ent(pid); return e && e.k ? e.k : null; }
  // Kids a grown-up holds the key for, on this device
  function kidsOf(gid) { var g = G(); return g.list().filter(function (q) { return isKid(q) && arr(q.grown).indexOf(gid) >= 0 && g.isOpen(q.id); }); }

  /* ---------- joining, adding, leaving ---------- */
  // Put pid in hid with key k, for a profile open here (a kid a grown-up holds, or a new profile with a grown-up beside it)
  function joinNow(pid, hid, k) {
    var g = G(), old = houseOf(pid);
    var step = old && old.id !== hid ? leaveCore(pid) : P();
    return step.then(function () {
      setEnt(pid, mkEnt(hid, k));
      edit(function (r) { var h = byId(r, hid); if (!h) return; if (h.members.indexOf(pid) < 0) h.members.push(pid); h.need = h.need.filter(function (x) { return x !== pid; }); h.invites = h.invites.filter(function (i) { return i.to !== pid; }); h.asks = h.asks.filter(function (a) { return a.from !== pid; }); delete h.wraps[pid]; });
      var d = vault(pid); if (d) delete d.houseLeft;
      return g.save(pid);
    });
  }
  // The open grown-up adds pid: a kid they hold joins now; anyone else gets an invite and says yes themselves
  function add(pid) {
    var g = G(), m = me(), t = g && g.get(pid);
    if (!m || !isAdult(m) || !g.isOpen(m.id)) return Promise.reject(new Error('A grown-up adds people to the household.'));
    if (!t || t.id === m.id) return Promise.reject(new Error('Choose someone on this device.'));
    if (isKid(t) && !g.isOpen(t.id)) return Promise.reject(new Error(first(t.name) + ' joins with the grown-up who set them up.'));
    var h = houseOf(m.id), k = myKey(m.id), make = P();
    if (h && !k) return Promise.reject(new Error('Your household key is still on its way. It comes in the next time a household grown-up opens here.'));
    if (!h) {
      var hid = rid(); k = b64(rnd(32));
      edit(function (r) { r.list.push({ id: hid, at: Date.now(), by: m.id, members: [m.id], need: [], invites: [], asks: [], wraps: {} }); });
      setEnt(m.id, mkEnt(hid, k));
      make = g.save(m.id).then(function () { h = houseById(hid); });
    }
    return make.then(function () {
      if (h.members.indexOf(pid) >= 0) return 'in';
      if (h.asks.some(function (a) { return a.from === pid; })) return welcome(h.id, pid).then(function () { return 'joined'; });
      if (isKid(t)) return joinNow(pid, h.id, k).then(function () { return 'joined'; });
      return wrapFor(h.id, pid, k).then(function (w) {
        edit(function (r) { var x = byId(r, h.id); if (!x) return; x.invites = x.invites.filter(function (i) { return i.to !== pid; }).concat({ to: pid, from: m.id, at: Date.now() }); if (w) x.wraps[pid] = w; });
        return 'invited';
      });
    }).then(function (r) { soon(); return r; });
  }
  // The open profile says Join to an invite (kids: the grown-up's own kids come along when chosen)
  function accept(hid, bring) {
    var g = G(), m = me(), h = houseById(hid);
    if (!m || !h || !g.isOpen(m.id)) return Promise.reject(new Error('Open your own profile first.'));
    var w = h.wraps[m.id], old = houseOf(m.id);
    return (old && old.id !== hid ? leaveCore(m.id) : P()).then(function () {
      return w ? unwrap(hid, m.id, w).catch(function () { return null; }) : null;
    }).then(function (k) {
      var e = mkEnt(hid, k); if (!k && bring && bring.length) e.bring = bring.slice();
      setEnt(m.id, e);
      var d = vault(m.id); if (d) delete d.houseLeft;
      edit(function (r) { var x = byId(r, hid); if (!x) return; if (x.members.indexOf(m.id) < 0) x.members.push(m.id); x.invites = x.invites.filter(function (i) { return i.to !== m.id; }); x.asks = x.asks.filter(function (a) { return a.from !== m.id; }); delete x.wraps[m.id]; if (!k && x.need.indexOf(m.id) < 0) x.need.push(m.id); if (k) x.need = x.need.filter(function (y) { return y !== m.id; }); });
      return g.save(m.id).then(function () { return k ? seq(arr(bring), function (kid) { return g.isOpen(kid) ? joinNow(kid, hid, k) : null; }) : null; }).then(function () { soon(); return !!k; });
    });
  }
  function notNow(hid) {
    var m = me(); if (!m) return;
    edit(function (r) { var h = byId(r, hid); if (!h) return; h.invites.forEach(function (i) { if (i.to === m.id) i.not = Date.now(); }); });
  }
  function notNowAsk(hid, pid) { edit(function (r) { var h = byId(r, hid); if (!h) return; h.asks.forEach(function (a) { if (a.from === pid) a.not = Date.now(); }); }); }
  function takeBack(hid, pid) { edit(function (r) { var h = byId(r, hid); if (!h) return; h.invites = h.invites.filter(function (i) { return i.to !== pid; }); delete h.wraps[pid]; }); }
  // The open grown-up or teen asks to join (a household grown-up says yes the next time they open)
  function ask(hid, who) {
    var g = G(), m = who ? g.get(who) : me(), h = houseById(hid);
    if (!m || !h || isKid(m)) return Promise.reject(new Error('Choose a household.'));
    edit(function (r) { r.list.forEach(function (x) { x.asks = x.asks.filter(function (a) { return a.from !== m.id; }); }); var x = byId(r, hid); if (x) x.asks.push({ from: m.id, at: Date.now() }); });
    return P(true);
  }
  // A household grown-up says yes to someone who asked: the key goes to them locked to their own public key
  function welcome(hid, pid) {
    var m = me(), k = m && myKey(m.id), h = houseById(hid);
    if (!m || !k || !h || h.members.indexOf(m.id) < 0) return Promise.reject(new Error('Open a household grown-up first.'));
    return wrapFor(hid, pid, k).then(function (w) {
      edit(function (r) { var x = byId(r, hid); if (!x) return; x.asks = x.asks.filter(function (a) { return a.from !== pid; }); if (x.members.indexOf(pid) < 0) x.members.push(pid); if (x.need.indexOf(pid) < 0) x.need.push(pid); if (w) x.wraps[pid] = w; });
      soon(); return true;
    });
  }
  // pid leaves: their own copy of the planner stays with them, and the kitchen and money go back to their own the next
  // time they open (vault.houseLeft). The household and its box stay for everyone else.
  function leaveCore(pid) {
    var g = G(), h = houseOf(pid), e = ent(pid), d = vault(pid);
    var job = P();
    if (d && e && e.k && h) {
      job = readBox(h.id, e.k).then(function (box) {
        var hr = box && box.planner && box.planner.d, mine = d.planner;
        if (!hr || !mine || mine.fid !== hr.fid) return;
        if (e.plOwn && e.plOwn.fid) { d.planner = e.plOwn; return; }
        return plannerCopy(mine, pid).then(function (nr) { d.planner = nr; });
      });
    }
    return job.then(function () {
      edit(function (r) { r.list.forEach(function (x) { x.members = x.members.filter(function (y) { return y !== pid; }); x.need = x.need.filter(function (y) { return y !== pid; }); delete x.wraps[pid]; }); });
      if (d) { setEnt(pid, null); d.houseLeft = d.houseLeft || {}; d.houseLeft[dev()] = Date.now(); return g.save(pid); }
    });
  }
  function leave() {
    var g = G(), m = me(), h = m && houseOf(m.id);
    if (!m || !h) return P(false);
    // a grown-up's kids leave with them when no other grown-up of theirs stays
    var kids = kidsOf(m.id).filter(function (q) { return h.members.indexOf(q.id) >= 0 && !arr(q.grown).some(function (x) { return x !== m.id && h.members.indexOf(x) >= 0; }); });
    return seq(kids.map(function (q) { return q.id; }).concat(m.id), leaveCore).then(function () { return sync(); }).then(function () { return true; });
  }
  function forget(pid) { edit(function () {}); }

  /* ---------- keeping each member up to date (runs when a profile opens) ---------- */
  function maintain(m) {
    var g = G(), d = vault(m.id); if (!d) return P(false);
    var e = ent(m.id), h = houseOf(m.id), ch = false, jobs = P();
    // left, or the household is gone: the entry goes, and Home puts the kitchen and money back
    if (e && (!h || h.id !== e.id)) { setEnt(m.id, null); d.houseLeft = d.houseLeft || {}; d.houseLeft[dev()] = Date.now(); e = null; ch = true; }
    if (h && (!e || !e.k)) {
      var w = h.wraps[m.id];
      if (w) jobs = unwrap(h.id, m.id, w).then(function (k) {
        var bring = e && e.bring; setEnt(m.id, mkEnt(h.id, k)); ch = true; delete d.houseLeft;
        edit(function (r) { var x = byId(r, h.id); if (!x) return; x.need = x.need.filter(function (y) { return y !== m.id; }); delete x.wraps[m.id]; });
        return seq(arr(bring), function (kid) { return g.isOpen(kid) ? joinNow(kid, h.id, k) : null; });
      }, function () {});
      else if (!e) { setEnt(m.id, mkEnt(h.id, null)); ch = true; edit(function (r) { var x = byId(r, h.id); if (x && x.need.indexOf(m.id) < 0) x.need.push(m.id); }); }
    }
    return jobs.then(function () {
      var k = myKey(m.id), hh = h && houseById(h.id);
      if (!k || !hh) return;
      // pass the key on to anyone waiting for it (an invite, or a member whose key has not come yet)
      var want = hh.need.concat(hh.invites.map(function (i) { return i.to; })).filter(function (x, i, a) { return x !== m.id && a.indexOf(x) === i && !wrapFresh(hh.wraps[x], x); });
      var made = {};
      return seq(want, function (pid) { return wrapFor(hh.id, pid, k).then(function (w2) { if (w2) made[pid] = w2; }); }).then(function () {
        if (Object.keys(made).length) edit(function (r) { var x = byId(r, hh.id); if (x) Object.keys(made).forEach(function (pid) { x.wraps[pid] = made[pid]; }); });
        // kids this grown-up holds, in the household, with no key yet: given now
        if (!isAdult(m)) return;
        return seq(kidsOf(m.id).filter(function (q) { return hh.members.indexOf(q.id) >= 0 && !myKey(q.id); }), function (q) { return joinNow(q.id, hh.id, k); });
      });
    }).then(function () {
      var left = obj(d.houseLeft)[dev()];
      if (left && HOST.leave) { return P(HOST.leave()).then(function () { if (d.houseLeft) { delete d.houseLeft[dev()]; if (!Object.keys(d.houseLeft).length) delete d.houseLeft; } ch = true; }); }
    }).then(function () { return ch ? g.save(m.id) : null; });
  }

  /* ---------- share and take ---------- */
  var HOST = { kinds: {}, leave: null, refresh: null, toast: null };
  var SY = { busy: null, again: false, last: null, t: 0, quiet: 0 };
  function host(h) { Object.keys(h || {}).forEach(function (k) { if (h[k] != null) HOST[k] = h[k]; }); soon(); }
  function sync() {
    if (SY.busy) { SY.again = true; return SY.busy; }
    SY.quiet++;
    SY.busy = run().catch(function (e) { if (window.console) console.error(e); }).then(function () {
      SY.busy = null; setTimeout(function () { SY.quiet--; }, 0);
      if (SY.again) { SY.again = false; setTimeout(sync, 60); }
    });
    return SY.busy;
  }
  function soon(ms) { clearTimeout(SY.t); SY.t = setTimeout(sync, ms == null ? 400 : ms); }
  function run() {
    var g = G(), m = me(); if (!g || !m || !g.isOpen(m.id) || !subtle) return P();
    return maintain(m).then(function () {
      var h = houseOf(m.id), e = ent(m.id);
      if (!h || !e || !e.k) { SY.last = null; return; }
      return readBox(h.id, e.k).then(function (box) {
        if (!box) return;
        var dirty = false, vch = false, got = [];
        e.seen = obj(e.seen); e.sent = obj(e.sent);
        return seq(Object.keys(HOST.kinds), function (kind) {
          var ad = HOST.kinds[kind], rec = box[kind], seen = +e.seen[kind] || 0;
          if (!ad) return;
          if (rec && rec.v > seen && rec.by !== m.id) {
            return P(ad.put(rec.d, { by: rec.by })).then(function () { return ad.get(); }).then(function (cur) {
              e.seen[kind] = rec.v; e.sent[kind] = cur == null ? '' : hash(cur); vch = true; got.push(kind);
            });
          }
          return P(ad.get()).then(function (cur) {
            if (cur == null) return;
            var hh = hash(cur);
            if (rec && hash(rec.d) === hh) { if (e.seen[kind] !== rec.v || e.sent[kind] !== hh) { e.seen[kind] = rec.v; e.sent[kind] = hh; vch = true; } return; }
            if (rec && e.sent[kind] === hh) return;
            box[kind] = { v: (rec ? +rec.v || 0 : 0) + 1, by: m.id, at: Date.now(), d: cur }; e.seen[kind] = box[kind].v; e.sent[kind] = hh; dirty = vch = true;
          });
        }).then(function () {
          // the Family Planner: the household's planner key goes into each member's own vault
          var d = vault(m.id), hr = box.planner && box.planner.d, mine = d && d.planner && d.planner.fid ? d.planner : null;
          if (hr && hr.fid && hr.k) {
            if (!mine || mine.fid !== hr.fid) { if (mine && !e.plOwn) e.plOwn = mine; d.planner = { fid: hr.fid, k: hr.k, at: today(), by: hr.by || '' }; vch = true; got.push('planner'); }
          } else if (mine && !isKid(m)) { box.planner = { v: 1, by: m.id, at: Date.now(), d: { fid: mine.fid, k: mine.k, by: mine.by || m.id } }; dirty = vch = true; }
        }).then(function () { return dirty ? writeBox(h.id, e.k, box) : null; })
          .then(function () { return vch ? g.save(m.id) : null; })
          .then(function () {
            SY.last = { at: Date.now(), kitchen: !!box.kitchen, money: !!box.money, planner: !!box.planner, table: box.kitchen && box.kitchen.d ? +box.kitchen.d.t || 0 : 0 };
            if (got.length && HOST.refresh) HOST.refresh(got);
          });
      });
    });
  }
  function status() { return SY.last; }

  /* ---------- the look (only what home.css lacks) ---------- */
  function css() {
    if (document.getElementById('gh-css')) return;
    var s = document.createElement('style'); s.id = 'gh-css';
    s.textContent = '.hm-dhh .hm-row{flex-wrap:wrap;row-gap:8px;}.hm-dhh .hm-row .tx{flex:1 1 160px;min-width:0;}.hm-dhh .hm-row .gh-act{display:flex;gap:6px;flex-wrap:wrap;margin-left:auto;}' +
      '.hm-dhh .gh-tag{font-size:13px;opacity:.8;}.hm-dhh .gh-lead{margin:6px 0 10px;}.hm-dhh .gh-h{margin:14px 0 4px;}' +
      '.ggp-dlg .gh-pick{display:grid;gap:8px;margin:10px 0;}.ggp-dlg .gh-opt{display:flex;gap:10px;align-items:flex-start;text-align:left;border:1.5px solid var(--ggp-line);background:var(--ggp-card);color:var(--ggp-ink);border-radius:12px;padding:10px 12px;cursor:pointer;font:15px Barlow,system-ui,sans-serif;}' +
      '.ggp-dlg .gh-opt[aria-pressed=true]{border-color:var(--ggp-gold);background:var(--ggp-gold-soft);}.ggp-dlg .gh-opt b{display:block;font-weight:600;}.ggp-dlg .gh-opt span{font-size:13px;color:var(--ggp-soft);}';
    document.head.appendChild(s);
  }

  /* ---------- dialogs (the profile window's own look) ---------- */
  function dlg(html, wire) {
    css();
    var back = document.createElement('div'); back.className = 'ggp-back ggp-root';
    back.innerHTML = '<div class="ggp-dlg gh-dlg" role="dialog" aria-modal="true" aria-labelledby="gh-title">' + html + '<p class="ggp-msg" role="alert" data-gh-msg></p></div>';
    document.body.appendChild(back);
    var box = back.firstChild, done = null, pr = new Promise(function (r) { done = r; });
    var api = {
      el: box, msg: function (t) { var m = box.querySelector('[data-gh-msg]'); if (m) m.textContent = t || ''; },
      show: function (h) { box.innerHTML = h + '<p class="ggp-msg" role="alert" data-gh-msg></p>'; wire(api); var f = box.querySelector('input,button.ggp-go'); if (f) setTimeout(function () { try { f.focus(); } catch (e) {} }, 30); },
      close: function (v) { if (!back.isConnected) return; back.remove(); document.removeEventListener('keydown', key); done(v); }
    };
    function key(ev) { if (ev.key === 'Escape') api.close(false); }
    document.addEventListener('keydown', key);
    wire(api);
    var f = box.querySelector('button.ggp-go'); if (f) setTimeout(function () { try { f.focus(); } catch (e) {} }, 30);
    return pr;
  }
  var NOTE = '<div class="ggp-note">Together you share the Family Kitchen, Grounded Money, and the Family Planner. Each person\'s check-ins, journal, and growth plan stay private to them.</div>';
  // A household grown-up types their passcode here to say yes now (their household key, read from their own vault only)
  function grownBlock(h, skip) {
    var g = G(), ads = h.members.filter(function (x) { var q = g.get(x); return x !== skip && isAdult(q); });
    if (!ads.length) return '';
    return '<label class="ggp-l" for="gh-gid">A grown-up in this household</label><select id="gh-gid">' + ads.map(function (x) { return '<option value="' + esc(x) + '">' + esc(nameOf(x)) + '</option>'; }).join('') + '</select>' +
      '<label class="ggp-l" for="gh-gpass">Their passcode</label><input type="password" id="gh-gpass" autocomplete="off">';
  }
  function keyFrom(api, hid) {
    var gid = api.el.querySelector('#gh-gid'), gp = api.el.querySelector('#gh-gpass');
    if (!gid) return Promise.reject(new Error('A household grown-up says yes first.'));
    if (!gp.value) return Promise.reject(new Error('Type the grown-up\'s passcode.'));
    return G().house.from(gid.value, gp.value).then(function (hs) { var x = obj(hs)[dev()]; if (!x || x.id !== hid || !x.k) throw new Error(nameOf(gid.value) + ' holds no key for this household yet.'); return x.k; });
  }

  // Setup: one step for a new profile, when a household is on this device
  function setupDlg(pid) {
    var g = G(), q = g && g.get(pid), made = g && g.house.made ? g.house.made(pid) : null;
    if (!q || !subtle) return P(false);
    var list = houses().filter(function (h) { return h.members.indexOf(pid) < 0; });
    var kOf = function (h) {
      var by = made && made.by, eb = by && h.members.indexOf(by) >= 0 ? ent(by) : null;
      if (eb && eb.id === h.id && eb.k) return eb.k;
      var gh = made && made.gHouse && obj(made.gHouse)[dev()];
      if (gh && gh.id === h.id && gh.k && made.grownId && h.members.indexOf(made.grownId) >= 0) return gh.k;
      return null;
    };
    if (isKid(q)) list = list.filter(function (h) { return arr(q.grown).some(function (x) { return h.members.indexOf(x) >= 0; }) && kOf(h); });
    if (!list.length) return P(false);
    var st = { pick: list[0].id, view: 'pick' };
    var nm = esc(first(q.name));
    function hOf() { return list.filter(function (h) { return h.id === st.pick; })[0]; }
    function html() {
      if (st.view === 'pick') return '<h2 id="gh-title">Join a household on this device?</h2>' +
        '<p>' + (isKid(q) ? nm + ' can join the household of the grown-up who set them up.' : 'Households already growing here:') + '</p>' +
        '<div class="gh-pick">' + list.map(function (h) { return '<button type="button" class="gh-opt" data-gh="pick:' + esc(h.id) + '" aria-pressed="' + (st.pick === h.id) + '"><span style="font-size:inherit;color:inherit"><b>' + esc(hhName(h)) + '</b><span>' + h.members.length + (h.members.length === 1 ? ' person' : ' people') + ' on this device</span></span></button>'; }).join('') + '</div>' + NOTE +
        '<div class="ggp-row"><button type="button" class="ggp-b" data-gh="later">Not Now</button><button type="button" class="ggp-b ggp-go" data-gh="join">Join</button></div>';
      var h = hOf();
      return '<h2 id="gh-title">A grown-up says yes</h2><p>A grown-up in the ' + esc(hhName(h)) + ' can type their passcode here to welcome ' + nm + ' now. Or ask, and they say yes the next time they open The Grounded Way.</p>' + grownBlock(h, pid) +
        '<div class="ggp-row"><button type="button" class="ggp-b" data-gh="back">Back</button><button type="button" class="ggp-b" data-gh="ask">Ask to Join</button><button type="button" class="ggp-b ggp-go" data-gh="now">Join Now</button></div>';
    }
    return dlg(html(), function wire(api) {
      api.el.querySelectorAll('[data-gh]').forEach(function (b) {
        b.onclick = function () {
          var a = b.getAttribute('data-gh');
          if (/^pick:/.test(a)) { st.pick = a.slice(5); api.show(html()); return; }
          if (a === 'later') { api.close(false); return; }
          if (a === 'back') { st.view = 'pick'; api.show(html()); return; }
          var h = hOf();
          if (a === 'join') {
            var k = kOf(h);
            if (k) { api.msg('One moment...'); joinNow(pid, h.id, k).then(function () { api.close(true); toast(first(q.name) + ' is in the household.'); soon(); }, function (er) { api.msg(er.message); }); return; }
            st.view = 'yes'; api.show(html()); return;
          }
          if (a === 'ask') { ask(h.id, pid).then(function () { api.close(true); toast('Asked. A grown-up in the household says yes the next time they open.'); }); return; }
          if (a === 'now') {
            api.msg('One moment...');
            keyFrom(api, h.id).then(function (k2) { return joinNow(pid, h.id, k2); }).then(function () { api.close(true); toast(first(q.name) + ' is in the household.'); soon(); }, function (er) { api.msg(er.message || 'That passcode did not work. Try again.'); });
          }
        };
      });
    });
  }

  // On open: Join This Household? for an invite, and a grown-up's yes for someone who asked
  var SEEN = {};
  function seenKey(a, b) { var k = 'gh-seen:' + a + ':' + b; try { return sessionStorage.getItem(k) || SEEN[k]; } catch (e) { return SEEN[k]; } }
  function seenSet(a, b) { var k = 'gh-seen:' + a + ':' + b; SEEN[k] = 1; try { sessionStorage.setItem(k, '1'); } catch (e) {} }
  var ASKING = false;
  function check() {
    var g = G(), m = me(); if (!g || !m || ASKING || !g.isOpen(m.id)) return;
    if (document.querySelector('.ggp-back, .ggr, .ga-sheet')) { setTimeout(check, 900); return; }
    var inv = invitesTo(m.id).filter(function (x) { return !x.i.not && !seenKey(m.id, x.h.id + x.i.at); })[0];
    if (inv) { seenSet(m.id, inv.h.id + inv.i.at); ASKING = true; joinDlg(inv.h.id).then(function () { ASKING = false; setTimeout(check, 300); }); return; }
    var h = houseOf(m.id);
    if (!h || isKid(m) || !myKey(m.id)) return;
    var ak = h.asks.filter(function (a) { return !a.not && !seenKey(m.id, h.id + a.from + a.at); })[0];
    if (ak && isAdult(m)) { seenSet(m.id, h.id + ak.from + ak.at); ASKING = true; welcomeDlg(h.id, ak.from).then(function () { ASKING = false; setTimeout(check, 300); }); }
  }
  function joinDlg(hid) {
    var g = G(), m = me(), h = houseById(hid); if (!m || !h) return P(false);
    var inv = h.invites.filter(function (i) { return i.to === m.id; })[0], from = inv ? first(nameOf(inv.from)) : 'A grown-up';
    var others = h.members.map(function (x) { return first(nameOf(x)); });
    var kids = isAdult(m) ? kidsOf(m.id).filter(function (q) { return h.members.indexOf(q.id) < 0; }) : [];
    var html = '<h2 id="gh-title">Join this household?</h2><p>' + esc(from) + ' would love to have you in Our Household on this device, with ' + esc(andList(others)) + '.</p>' + NOTE +
      (kids.length ? '<p style="margin:12px 0 4px"><b>Bring your kids along?</b></p>' + kids.map(function (q) { return '<label class="ggp-check" style="margin-top:6px"><input type="checkbox" data-gh-kid="' + esc(q.id) + '" checked> <span>' + esc(q.name) + '</span></label>'; }).join('') : '') +
      (houseOf(m.id) ? '<p class="ggp-small">Joining moves you from the ' + esc(hhName(houseOf(m.id), m.id)) + '.</p>' : '') +
      '<div class="ggp-row"><button type="button" class="ggp-b" data-gh="later">Not Now</button><button type="button" class="ggp-b ggp-go" data-gh="join">Join</button></div>';
    return dlg(html, function (api) {
      api.el.querySelectorAll('[data-gh]').forEach(function (b) {
        b.onclick = function () {
          var a = b.getAttribute('data-gh');
          if (a === 'later') { notNow(hid); api.close(false); toast('Your invite waits in Settings, Household.'); if (HOST.refresh) HOST.refresh(['invite']); return; }
          var bring = [].map.call(api.el.querySelectorAll('[data-gh-kid]:checked'), function (x) { return x.getAttribute('data-gh-kid'); });
          api.msg('One moment...');
          accept(hid, bring).then(function (k) {
            api.close(true);
            toast(k ? 'Welcome to Our Household. The Family Kitchen, Grounded Money, and the Family Planner are shared now.' : 'Welcome to Our Household. What you share comes in the next time ' + from + ' opens here.');
            if (HOST.refresh) HOST.refresh(['join']);
          }, function (er) { api.msg(er.message); });
        };
      });
    });
  }
  function welcomeDlg(hid, pid) {
    var nm = first(nameOf(pid));
    var html = '<h2 id="gh-title">Welcome ' + esc(nm) + ' to Our Household?</h2><p>' + esc(nm) + ' asked to join Our Household on this device.</p>' + NOTE +
      '<div class="ggp-row"><button type="button" class="ggp-b" data-gh="later">Not Now</button><button type="button" class="ggp-b ggp-go" data-gh="yes">Welcome ' + esc(nm) + '</button></div>';
    return dlg(html, function (api) {
      api.el.querySelectorAll('[data-gh]').forEach(function (b) {
        b.onclick = function () {
          if (b.getAttribute('data-gh') === 'later') { notNowAsk(hid, pid); api.close(false); return; }
          welcome(hid, pid).then(function () { api.close(true); toast(nm + ' is in Our Household. What you share reaches ' + nm + ' the next time they open.'); if (HOST.refresh) HOST.refresh(['welcome']); }, function (er) { api.msg(er.message); });
        };
      });
    });
  }
  // A member whose key has not come yet: a household grown-up types their passcode here to finish now
  function finishDlg() {
    var m = me(), h = m && houseOf(m.id); if (!h) return P(false);
    var html = '<h2 id="gh-title">Finish joining now</h2><p>A grown-up in the household types their passcode here, and what you share comes in right away.</p>' + grownBlock(h, m.id) +
      '<div class="ggp-row"><button type="button" class="ggp-b" data-gh="later">Not Now</button><button type="button" class="ggp-b ggp-go" data-gh="now">Finish</button></div>';
    return dlg(html, function (api) {
      api.el.querySelectorAll('[data-gh]').forEach(function (b) {
        b.onclick = function () {
          if (b.getAttribute('data-gh') === 'later') { api.close(false); return; }
          api.msg('One moment...');
          keyFrom(api, h.id).then(function (k) {
            var e = ent(m.id), bring = e && e.bring;
            setEnt(m.id, mkEnt(h.id, k));
            edit(function (r) { var x = byId(r, h.id); if (!x) return; x.need = x.need.filter(function (y) { return y !== m.id; }); delete x.wraps[m.id]; });
            return G().save(m.id).then(function () { return seq(arr(bring), function (kid) { return G().isOpen(kid) ? joinNow(kid, h.id, k) : null; }); });
          }).then(function () { api.close(true); toast('You are all set. What you share is here now.'); sync(); if (HOST.refresh) HOST.refresh(['join']); }, function (er) { api.msg(er.message || 'That passcode did not work. Try again.'); });
        };
      });
    });
  }

  /* ---------- the Household sheet card ---------- */
  function card(o) {
    o = o || {}; css();
    var g = G(), m = me(); if (!g || !m || isKid(m) || !subtle) return '';
    var I = typeof o.I === 'function' ? o.I : function () { return ''; };
    var h = houseOf(m.id), k = myKey(m.id), all = g.list().filter(function (q) { return q.id !== m.id; });
    var row = function (icon, b, small, act) { return '<div class="hm-row hm-p-branches"><span class="ic2">' + I(icon) + '</span><div class="tx"><b>' + b + '</b><small>' + small + '</small></div>' + (act ? '<div class="gh-act">' + act + '</div>' : '') + '</div>'; };
    var pill = function (a, t, line) { return '<button type="button" class="hm-pill hm-p-branches' + (line ? ' line' : '') + '" data-hh="' + esc(a) + '">' + esc(t) + '</button>'; };
    var who = function (q) { return isKid(q) ? 'Kid' : isTeen(q) ? 'Teen' : 'Grown-up'; };
    var out = '', st = SY.last;
    if (h) {
      var mem = h.members.map(function (x) { return g.get(x); }).filter(Boolean);
      out += '<p class="hm-sub gh-lead">Shared on this device: the Family Kitchen' + (st && st.table ? ' (a table of ' + st.table + ')' : '') + ', Grounded Money, and the Family Planner. Each person\'s check-ins, journal, and growth plan stay private to them.</p>';
      if (!k) out += '<div class="hm-note hm-p-branches" style="margin:0 0 10px">' + I('key') + '<span>What you share comes in the next time a household grown-up opens here. <button type="button" class="hm-linkbtn" data-hh="finish">Finish Now</button></span></div>';
      out += '<div class="hm-set">' + mem.map(function (q) {
        var you = q.id === m.id, wait = h.need.indexOf(q.id) >= 0;
        return row(isKid(q) || isTeen(q) ? 'sprout' : 'user', esc(q.name) + (you ? ' <span class="gh-tag">(you)</span>' : ''), who(q) + (wait ? ', joining soon' : ', in Our Household'), '');
      }).join('');
      h.asks.forEach(function (a) { var q = g.get(a.from); if (!q) return; out += row('love', esc(q.name) + ' would like to join', 'Asked from this device', isAdult(m) && k ? pill('welcome:' + q.id, 'Welcome ' + first(q.name)) : ''); });
      h.invites.forEach(function (i) { var q = g.get(i.to); if (!q) return; out += row('people', esc(q.name), 'Added by ' + esc(first(nameOf(i.from))) + '. Joins once ' + esc(first(q.name)) + ' says yes.', isAdult(m) ? pill('takeback:' + q.id, 'Take Back', 1) : ''); });
      out += '</div>';
      var rest = all.filter(function (q) { return h.members.indexOf(q.id) < 0 && !h.invites.some(function (i) { return i.to === q.id; }) && !h.asks.some(function (a) { return a.from === q.id; }); });
      if (isAdult(m) && rest.length) {
        out += '<h4 class="hm-label gh-h">Add to Our Household</h4><div class="hm-set">' + rest.map(function (q) {
          var oh = houseOf(q.id), kidNo = isKid(q) && !g.isOpen(q.id), gn = arr(q.grown).map(function (x) { return first(nameOf(x)); });
          return row(isKid(q) || isTeen(q) ? 'sprout' : 'user', esc(q.name), who(q) + (oh ? ', in another household here' : ', on this device'),
            kidNo ? '<span class="gh-tag">Joins with ' + esc(andList(gn) || 'their grown-up') + '</span>' : k ? pill('add:' + q.id, 'Add to Our Household') : '');
        }).join('') + '</div>';
      }
      out += '<div class="hm-quiet" style="margin-top:12px"><button type="button" data-hh="leave">Leave Household</button></div>';
    } else {
      var inv = invitesTo(m.id), mine = asksOf(m.id);
      out += '<p class="hm-sub gh-lead">Share the Family Kitchen, Grounded Money, and the Family Planner with the people on this device. Each person\'s check-ins, journal, and growth plan stay private to them.</p><div class="hm-set">';
      inv.forEach(function (x) { out += row('love', esc(first(nameOf(x.i.from))) + ' added you to the ' + esc(hhName(x.h)), 'Say yes, and you share right away.', pill('join:' + x.h.id, 'Join')); });
      houses().filter(function (x) { return !inv.some(function (y) { return y.h.id === x.id; }); }).forEach(function (x) {
        var asked = mine.some(function (y) { return y.h.id === x.id; });
        out += row('people', esc(hhName(x)), x.members.length + (x.members.length === 1 ? ' person' : ' people') + ' on this device', asked ? '<span class="gh-tag">Asked</span>' : pill('ask:' + x.id, 'Ask to Join', 1));
      });
      if (isAdult(m)) all.filter(function (q) { return !houseOf(q.id); }).forEach(function (q) {
        var kidNo = isKid(q) && !g.isOpen(q.id), gn = arr(q.grown).map(function (x) { return first(nameOf(x)); });
        out += row(isKid(q) || isTeen(q) ? 'sprout' : 'user', esc(q.name), who(q) + ', on this device', kidNo ? '<span class="gh-tag">Joins with ' + esc(andList(gn) || 'their grown-up') + '</span>' : pill('add:' + q.id, 'Add to Our Household'));
      });
      out += '</div>';
      if (!all.length) out += '<p class="hm-sub">Add a family member below, and they can join Our Household here.</p>';
    }
    return '<article class="hm-card hm-p-branches hm-dhh" id="hm-dhh"><div class="hm-hd">' + (o.pic || '') + '<div><div class="hm-k">On This Device</div><h3 class="hm-h3">Our Household</h3></div></div>' + out + '</article>';
  }
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest && ev.target.closest('[data-hh]'); if (!t) return;
    var a = t.getAttribute('data-hh'), i = a.indexOf(':'), verb = i < 0 ? a : a.slice(0, i), arg = i < 0 ? '' : a.slice(i + 1), h = me() && houseOf(me().id);
    var redo = function (m) { if (m) toast(m); if (HOST.refresh) HOST.refresh(['card']); };
    var fail = function (er) { t.disabled = false; toast((er && er.message) || 'Try again in a moment.'); };
    if (verb === 'add') { t.disabled = true; add(arg).then(function (r) { redo(r === 'joined' ? first(nameOf(arg)) + ' is in Our Household.' : r === 'in' ? '' : first(nameOf(arg)) + ' sees Join This Household? the next time they open.'); }, fail); return; }
    if (verb === 'join') { joinDlg(arg).then(function () { redo(); }); return; }
    if (verb === 'ask') { t.disabled = true; ask(arg).then(function () { redo('Asked. A grown-up in the household says yes the next time they open.'); }, fail); return; }
    if (verb === 'welcome' && h) { t.disabled = true; welcome(h.id, arg).then(function () { redo(first(nameOf(arg)) + ' is in Our Household.'); }, fail); return; }
    if (verb === 'takeback' && h) { takeBack(h.id, arg); redo(); return; }
    if (verb === 'finish') { finishDlg().then(function () { redo(); }); return; }
    if (verb === 'leave') {
      if (!t.hasAttribute('data-sure')) { t.setAttribute('data-sure', '1'); t.textContent = 'Tap Again to Leave'; return; }
      t.disabled = true; leave().then(function () { redo('You left the household. Your own copy of the Family Planner stays with you.'); }, fail);
    }
  });

  /* ---------- wiring ---------- */
  function onProfiles(type) { if (type === 'change' || type === 'ready') { setTimeout(check, 700); soon(500); } }
  function boot() {
    var g = G(); if (!g) return;
    g.on(onProfiles);
    if (g.onSave) g.onSave(function () { if (!SY.quiet) soon(1500); });
    window.addEventListener('storage', function (ev) { if (ev.key === REG || (ev.key && ev.key.indexOf(BOXK) === 0)) { soon(300); if (HOST.refresh) HOST.refresh(['card']); } });
    P(g.ready).then(function () { setTimeout(check, 700); soon(500); });
  }

  window.GGHouse = {
    v: V, host: host, card: card, sync: sync, status: status, setup: setupDlg,
    houses: houses, of: houseOf, add: add, accept: accept, notNow: notNow, ask: ask, welcome: welcome, takeBack: takeBack, leave: leave, forget: forget,
    check: check, _dev: dev
  };
  boot();
})();
