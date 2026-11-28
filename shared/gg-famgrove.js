/* =====================================================================
   THE FAMILY GROVE FOR ACCOUNTS (shared/gg-famgrove.js), GWG BLD 1079
   Chris (November 28, 2026): "now that all the family has their own account... how do we begin to use the grove?"
   Plan: grounded-workshop patches/bld1079/PLAN.md. The Worker: worker/src/famgrove.js (GET /famgrove and friends).

   The Household is the Family grove. Everyone in it sees the same grove on their own phone: the trees, the Wall,
   reactions, practices done together, and cheers from the set list. Grandma and friends join with a code a grown-up gives
   them in person, and a grown-up taps Welcome first (decision 1). The Family Check-in and Growth Plan are locked in their
   own space for the grown-ups of the Household (decision 2); teens, kids, and guests see the plan's practices only. Kids
   write short notes with Post Starters, and any grown-up can take one down (decision 3).

   Two locked spaces, each with its own key made on a family device and handed to each person locked to their account's
   public key (the same ECDH P-256 key handing as Household spaces, shared/gg-sync.js):
     grove   one part per person, each written only by that person (the Worker stamps every box with its writer):
               <account>|me        {u, name, avatar, age, tree, kind, reacts: {item: {k, u}}, hide: {post: at}, set: {u, name,
                                   scenery, plan: [practice ids]}, grew: [days]}  (hide and set count only from a grown-up)
               <account>|YYYY-MM   {posts: [{id, day, at, text, gone, before}], done: {day: {practice: at or 0}},
                                   cheers: [{id, to, c, day, at}]}
     grown   <account>|vault      the Family Check-ins, the Growth Plan, Who's in Our Circle (grown-ups only)
   Each phone shows a part only when the writer the Worker reports matches the part's owner, so a guest can never post as
   Mom. This device keeps what it has read locked with the account key (localStorage gg-fg:<account>); a change made with no
   connection waits there and sends when the connection returns. Nothing here sends an alert, an email, or a count, and
   nothing here reads anyone's check-in words, scores, or journals.

   For a host page (grove/app.js, home/home.js)
     GGFamilyGrove.live()          Promise of true once the Worker answers GET /famgrove (until then The Grove works as before)
     GGFamilyGrove.load(force)     Promise of the state; GGFamilyGrove.st() the state now; on(fn) after each change
     people(), me(kidAcct), wall(), reacts(), done(), grew(), set(), vault(), planPids()
     post(text, kid), unpost(id), hide(id), react(item, k, kid), did(practice, kid), cheer(to, c, kid), setGrove(o), myKind(k)
     plant(name), bring(local grove, vault), join(code, name), code(), closeCode(), welcome(account, ok), removeGuest(account)
     saveVault(v), publishTree(profile id), cardHtml(), settingsHtml(), and the CHEERS and STARTERS lists
   No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGFamilyGrove) return;
  var V = 'c235';
  var CHEERS = ['Nice work!', 'We did it together!', 'Proud of you!', 'Thank you for showing up!', 'Keep growing!', 'Way to go!', 'Glad you are here!', 'One day at a time!'];
  var STARTERS = ['Thank you for', 'Today I', 'I love it when we', 'I am proud of', 'My favorite part of today was'];
  var POST_MAX = 280, KID_MAX = 140, DAY_POSTS = 40;
  var enc = new TextEncoder(), dec = new TextDecoder();

  /* ---------- plain helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function obj(x) { return x && typeof x === 'object' && !Array.isArray(x) ? x : {}; }
  function arr(x) { return Array.isArray(x) ? x : []; }
  function clone(v) { return v === undefined ? undefined : JSON.parse(JSON.stringify(v)); }
  function clip(s, n) { return String(s == null ? '' : s).replace(/[\u0000-\u001f]/g, ' ').replace(/[\u2012-\u2015]/g, ', ').trim().slice(0, n); }
  function now() { return +window.GG_TEST_NOW || Date.now(); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function dstr(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function today() { return dstr(new Date(now())); }
  function uid() { return now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function A() { return window.GGAccount; }
  function X() { return A() && A()._; }
  function K() { var x = X(); return x && x.keys ? x.keys() : null; }
  function signedIn() { return !!(A() && A().state && A().state() !== 'out' && A().info && A().info() && K()); }
  function api(m, p, b, o) { return X().api(m, p, b, o); }
  function emit() { subs.slice().forEach(function (fn) { try { fn(S); } catch (e) { console.error(e); } }); }
  var subs = [];

  /* ---------- state ---------- */
  // S.g: the grove as GET /famgrove answers it; S.sp: kind -> {id, DK, NK, raw}; S.box: kind -> {boxId: {n, by, ver, data}};
  // S.cur: kind -> list cursor; S.dirty: {kind|name: 1} parts of mine waiting to send
  var S = { on: false, loaded: false, me: null, house: null, g: null, guests: [], sp: {}, box: { grove: {}, grown: {} }, cur: {}, dirty: {}, err: '', busy: null, at: 0, cachedFor: '' };
  function role() { return S.g ? S.g.role : ''; }
  function grown() { return role() === 'grown'; }

  var liveP = null, liveNo = 0;
  function ready() {
    var g = window.GGP;
    return Promise.resolve(g && g.ready).then(function () { return g && g.account && g.account.ready; }).then(function () { return A() && A().ready; }).catch(function () {});
  }
  // The Family grove shows only once the Worker answers its routes (Worker c202, BLD 1079). Before the deploy GET /famgrove
  // answers 404, so this answers false and The Grove keeps working exactly as before. Tests may set window.GG_FAMGROVE_OFF.
  function live() {
    if (window.GG_FAMGROVE_OFF) return Promise.resolve(false);
    if (liveP) return liveP;
    if (now() - liveNo < 600000 || now() - (+window.GG_FAMGROVE_NONE || 0) < 600000) return Promise.resolve(false);   // asked a moment ago (here or by the sync): not live yet
    try { if (sessionStorage.getItem('gg-famgrove-on') === V) { S.on = true; return (liveP = Promise.resolve(true)); } } catch (e) {}
    liveP = ready().then(function () {
      if (!X()) return false;
      return api('GET', '/famgrove', null, { quiet401: true, tries: 1 }).then(function () { return true; }, function (e) { return !!(e && e.why === 'signin' && e.status === 401); });
    }).then(function (ok) { if (ok) { try { sessionStorage.setItem('gg-famgrove-on', V); } catch (e) {} } else { liveP = null; liveNo = now(); window.GG_FAMGROVE_NONE = liveNo; } S.on = ok; return ok; });
    return liveP;
  }

  /* ---------- keys ---------- */
  function spKeys(raw) {
    var x = X();
    return x.hkdfBase(raw).then(function (b) { return Promise.all([x.hkAes(b, 'gg-space-v1 data'), x.hkMac(b, 'gg-space-v1 names')]); }).then(function (r) { return { DK: r[0], NK: r[1] }; });
  }
  function GK() { return window.GGSync && GGSync.giftKeys; }   // wrapTo(pub, raw, sid, account), unwrap(w, sid)
  function handKeys(sp, ctx) {
    if (!ctx || !sp.missing || !sp.missing.length || !GK()) return Promise.resolve();
    return Promise.all(sp.missing.map(function (m) { return GK().wrapTo(m.pub, ctx.raw, sp.id, m.account).then(function (w) { return { account: m.account, key: w }; }); }))
      .then(function (items) { return api('POST', '/famgrove/spaces/' + sp.id + '/keys', { items: items }); }).catch(function () {});
  }
  function makeSpace(kind, replace) {
    var x = X(), k = K(), raw = x.rand(32), id0 = x.b64u(x.rand(16)), sid = 'v' + id0;
    return GK().wrapTo(k.pub, raw, sid, k.accountId).then(function (w) {
      return api('POST', '/famgrove/' + S.g.id + '/spaces', { kind: kind, id: id0, key: w, replace: replace || undefined });
    }).then(function (r) {
      return spKeys(raw).then(function (kk) {
        S.sp[kind] = { id: r.id, DK: kk.DK, NK: kk.NK, raw: raw };
        S.cacheIds = S.cacheIds || {}; S.cacheIds[kind] = r.id;
        // hand the new key to everyone who may hold it, right away
        var to = arr(S.g && S.g.people).filter(function (p) { return p.account !== k.accountId && p.pub && (kind === 'grove' || p.role === 'grown'); }).map(function (p) { return { account: p.account, pub: p.pub }; });
        handKeys({ id: r.id, missing: to }, S.sp[kind]);
        // a new space starts empty: every part of mine (and of the kids I write for) goes up again
        var keep = S.box[kind]; S.box[kind] = {}; S.cur[kind] = 0;
        Object.keys(keep || {}).forEach(function (b) { var x2 = keep[b]; if (mayWrite(x2.by)) { S.box[kind]['n:' + x2.n] = { n: x2.n, by: x2.by, ver: 0, data: x2.data }; S.dirty[kind + '|' + x2.n] = 1; } });
        return r.id;
      });
    });
  }

  /* ---------- the cache on this device (locked with the account key) ---------- */
  function cacheKey() { var k = K(); return k ? 'gg-fg:' + k.accountId : ''; }
  function saveCache() {
    var k = K(), key = cacheKey(); if (!k || !key || !S.g) return Promise.resolve();
    var body = { v: 1, myName: S.myName || '', role: S.g.role, gid: S.g.id, ids: { grove: S.sp.grove && S.sp.grove.id, grown: S.sp.grown && S.sp.grown.id }, box: S.box, cur: S.cur, dirty: S.dirty };
    return X().seal(k.DK, enc.encode(JSON.stringify(body)), 'gg1|fg|' + k.accountId).then(function (u8) { try { localStorage.setItem(key, X().b64u(u8)); } catch (e) {} }).catch(function () {});
  }
  function readCache() {
    var k = K(), key = cacheKey(), s = null; if (!k || !key) return Promise.resolve(null);
    try { s = localStorage.getItem(key); } catch (e) {}
    if (!s) return Promise.resolve(null);
    return X().open(k.DK, s, 'gg1|fg|' + k.accountId).then(function (u8) { return JSON.parse(dec.decode(u8)); }).catch(function () { return null; });
  }
  function dropCache() { var key = cacheKey(); try { if (key) localStorage.removeItem(key); } catch (e) {} }

  /* ---------- who may write which part ---------- */
  function myId() { var k = K(); return k ? k.accountId : ''; }
  // the profiles on this device, with the account each belongs to (GGP.get carries kidAcct; GGP.account.trees the account trees)
  function localAll() {
    var g = window.GGP; if (!g || !g.list) return [];
    var trees = {}; try { (g.account && g.account.trees ? g.account.trees() : []).forEach(function (t) { trees[t.id] = t.account; }); } catch (e) {}
    return g.list().map(function (p) { var q = g.get ? g.get(p.id) : p; return q ? Object.assign({}, q, { account: (q && q.kidAcct) || trees[p.id] || '' }) : null; }).filter(Boolean);
  }
  // the kids whose trees this grown-up's phone holds through the guardian key (Riley Is Here)
  function kidsHere() {
    var out = [];
    if (!S.g || !S.g.people || role() !== 'grown') return out;
    localAll().forEach(function (p) { if (p.kidAcct && p.kidAcct !== myId() && S.g.people.some(function (q) { return q.account === p.kidAcct && q.role === 'kid'; })) out.push({ account: p.kidAcct, profile: p }); });
    return out;
  }
  function mayWrite(by) { return by === myId() || kidsHere().some(function (k) { return k.account === by; }); }
  function hdr(by) { return by && by !== myId() ? { headers: { 'X-GG-For': by } } : undefined; }

  /* ---------- the boxes ---------- */
  function sc(kind) { var s = S.sp[kind]; return s ? { pre: '/famgrove/spaces/' + s.id, sid: s.id, DK: s.DK, NK: s.NK } : null; }
  function idOf(c, name) { return X().boxId(c.NK, 'v|' + name); }
  function pull(kind) {
    var c = sc(kind), x = X(); if (!c) return Promise.resolve();
    var B = S.box[kind] || (S.box[kind] = {}), want = [], cur = +S.cur[kind] || 0;
    var page = function () {
      return api('GET', c.pre + '/boxes?since=' + cur).then(function (r) {
        r.items.forEach(function (it) {
          var have = B[it.id];
          if (it.gone) { if (have) delete B[it.id]; return; }
          if (have && have.ver >= it.ver) return;
          want.push(it);
        });
        cur = r.seq;
        if (r.more) return page();
      });
    };
    return page().then(function () {
      var jobs = [];
      for (var i = 0; i < want.length; i += 50) {
        (function (chunk) {
          jobs.push(api('POST', c.pre + '/boxes/batch', { items: chunk.map(function (it) { return { op: 'get', id: it.id }; }) }).then(function (r) {
            return Promise.all(r.items.map(function (it) {
              if (!it.ok) return null;
              return x.open(c.DK, x.unb64u(it.data), x.AAD.sbox(c.sid, it.id, it.ver)).then(x.unpack).then(function (j) {
                var owner = String(j.t || '').split('|')[0];
                // the writer check: a part shows only when its owner is the account the Worker says wrote it
                if (!it.by || owner !== it.by) return;
                return idOf(c, j.t).then(function (bid) {
                  if (bid !== it.id) return;
                  var mine = B['n:' + j.t];
                  B[it.id] = { n: j.t, by: it.by, ver: it.ver, data: mine && S.dirty[kind + '|' + j.t] ? merge(j.t, mine.data, j.data) : j.data };
                  delete B['n:' + j.t];
                });
              }).catch(function () {});
            }));
          }));
        })(want.slice(i, i + 50));
      }
      return Promise.all(jobs);
    }).then(function () { S.cur[kind] = cur; });
  }
  function findBox(kind, name) { var B = S.box[kind] || {}; for (var id in B) if (B[id].n === name) return { id: id, b: B[id] }; return null; }
  function partOf(kind, name, mk) {
    var f = findBox(kind, name);
    if (f) return f.b.data;
    if (!mk) return null;
    var B = S.box[kind] || (S.box[kind] = {});
    B['n:' + name] = { n: name, by: name.split('|')[0], ver: 0, data: mk() };
    return B['n:' + name].data;
  }
  function touch(kind, name) { S.dirty[kind + '|' + name] = 1; }
  // two of my own devices changed the same part: keep both
  function merge(name, a, b) {
    a = obj(a); b = obj(b);
    if (/\|me$/.test(name) || /\|vault$/.test(name)) {
      var o = (+a.u || 0) >= (+b.u || 0) ? clone(a) : clone(b);
      if (/\|me$/.test(name)) {
        var ra = obj(a.reacts), rb = obj(b.reacts); o.reacts = {};
        Object.keys(ra).concat(Object.keys(rb)).forEach(function (k) { var x1 = ra[k], y1 = rb[k]; o.reacts[k] = !x1 ? y1 : !y1 ? x1 : ((+x1.u || 0) >= (+y1.u || 0) ? x1 : y1); });
        o.hide = Object.assign({}, obj(a.hide), obj(b.hide));
        var sa = obj(a.set), sb = obj(b.set); o.set = (+sa.u || 0) >= (+sb.u || 0) ? sa : sb;
        o.grew = Array.from(new Set(arr(a.grew).concat(arr(b.grew)))).sort();
      }
      return o;
    }
    var out = { posts: [], done: {}, cheers: [] }, seen = {};
    arr(a.posts).concat(arr(b.posts)).forEach(function (p) { if (!p || !p.id) return; var h = seen[p.id]; if (!h) { seen[p.id] = p; out.posts.push(p); } else if (p.gone && !h.gone) { h.gone = p.gone; } });
    [a.done, b.done].forEach(function (d) { Object.keys(obj(d)).forEach(function (day) { var x1 = out.done[day] || (out.done[day] = {}); Object.keys(obj(d[day])).forEach(function (pid) { var v = d[day][pid]; if (!(pid in x1) || Math.abs(+v || 0) > Math.abs(+x1[pid] || 0)) x1[pid] = v; }); }); });
    var cs = {}; arr(a.cheers).concat(arr(b.cheers)).forEach(function (c) { if (c && c.id && !cs[c.id]) { cs[c.id] = 1; out.cheers.push(c); } });
    return out;
  }
  function flush() {
    var x = X(), names = Object.keys(S.dirty);
    if (!names.length) return Promise.resolve();
    return Promise.all(names.map(function (key) {
      var kind = key.split('|')[0], name = key.slice(kind.length + 1), c = sc(kind);
      if (!c) return null;
      var by = name.split('|')[0];
      if (!mayWrite(by)) { delete S.dirty[key]; return null; }
      var tries = 0;
      var go = function () {
        var f = findBox(kind, name); if (!f) { delete S.dirty[key]; return null; }
        var ver = f.b.ver || 0;
        return idOf(c, name).then(function (bid) {
          return x.pack({ t: name, at: now(), data: f.b.data }).then(function (p) { return x.seal(c.DK, p, x.AAD.sbox(c.sid, bid, ver + 1)); }).then(function (u8) {
            return api('POST', c.pre + '/boxes/batch', { items: [{ op: 'put', id: bid, ver: ver, data: x.b64u(u8) }] }, hdr(by)).then(function (r) {
              var it = r.items[0];
              if (it.ok) { var B = S.box[kind]; delete B[f.id]; B[bid] = { n: name, by: by, ver: it.ver, data: f.b.data }; delete S.dirty[key]; return; }
              if (it.why === 'conflict' && tries++ < 3) {
                // another of my devices wrote first: bring its copy, keep both, and send again
                return api('POST', c.pre + '/boxes/batch', { items: [{ op: 'get', id: bid }] }, hdr(by)).then(function (g) {
                  var gi = g.items[0];
                  if (!gi.ok) { f.b.ver = it.ver || 0; return go(); }
                  return x.open(c.DK, x.unb64u(gi.data), x.AAD.sbox(c.sid, bid, gi.ver)).then(x.unpack).then(function (j) {
                    var B = S.box[kind]; delete B[f.id]; B[bid] = { n: name, by: by, ver: gi.ver, data: merge(name, f.b.data, j.data) }; return go();
                  });
                });
              }
              if (it.why === 'owner') delete S.dirty[key];   // someone else holds that box: this part waits
            });
          });
        });
      };
      return go();
    })).catch(function (e) { if (e && e.why === 'offline') return; throw e; });
  }

  /* ---------- load: the grove, the keys, the boxes ---------- */
  function load(force) {
    if (S.busy) return S.busy;
    if (!signedIn()) { S.loaded = true; S.g = null; S.sp = {}; S.box = { grove: {}, grown: {} }; S.cur = {}; S.dirty = {}; S.cachedFor = ''; return Promise.resolve(S); }
    if (!force && S.loaded && now() - S.at < 20000) return Promise.resolve(S);
    var k = K();
    S.busy = live().then(function (on) {
      if (!on) return null;
      // another account on this device: start clean, then read that account's own locked copy
      if (S.cachedFor !== k.accountId) { S.hh = null; S.g = null; S.sp = {}; S.box = { grove: {}, grown: {} }; S.cur = {}; S.dirty = {}; S.cacheIds = {}; S.cacheGid = ''; S.lastView = null; S.code = null; }
      return (S.cachedFor === k.accountId ? Promise.resolve(null) : readCache()).then(function (c) {
        if (c && !S.g) { S.myName = c.myName || ''; S.cacheRole = c.role || ''; S.box = c.box || S.box; S.cur = c.cur || {}; S.dirty = c.dirty || {}; S.cacheIds = c.ids || {}; S.cacheGid = c.gid; }
        S.cachedFor = k.accountId;
        return api('GET', '/famgrove');
      });
    }).then(function (r) {
      if (!r) return;
      S.me = r.me; S.house = r.house; S.err = '';
      var gs = arr(r.groves), g = gs.find(function (x) { return x.mine; }) || gs.find(function (x) { return x.role === 'guest'; }) || gs[0] || null;
      S.waitingFor = gs.filter(function (x) { return x.role === 'waiting'; }).map(function (x) { return x.id; });
      var was = S.g; S.g = g;
      // the Family grove ended, or this person left it: this phone keeps what it showed as a grove on this device
      // (a grown-up of the Household only: a guest, a teen, or a kid who leaves keeps no copy of the family's posts)
      if (!g) { if (was || S.cacheGid) { S.ended = true; var wasRole = was ? was.role : S.cacheRole; S.lastView = wasRole === 'grown' && Object.keys(S.box.grove || {}).length ? { wall: wall(), reacts: reacts(), done: done(), grew: grew() } : null; } S.sp = {}; S.box = { grove: {}, grown: {} }; S.cur = {}; S.dirty = {}; dropCache(); return; }
      if (S.cacheGid && S.cacheGid !== g.id) { S.box = { grove: {}, grown: {} }; S.cur = {}; S.dirty = {}; }
      S.cacheGid = g.id; S.ended = false;
      if (g.role === 'waiting') return;
      // a space this phone holds no key for yet (a new key after someone left, handed along soon): it rests here until then
      Object.keys(S.sp).forEach(function (kind) { var now0 = arr(g.spaces).find(function (x) { return x.kind === kind; }); if (!now0 || now0.id !== S.sp[kind].id && !now0.key) delete S.sp[kind]; });
      var jobs = arr(g.spaces).map(function (sp) {
        var have = S.sp[sp.kind];
        if (!sp.key) return Promise.resolve();
        var ready0 = have && have.id === sp.id ? Promise.resolve(have) : GK().unwrap(sp.key, sp.id).then(function (raw) {
          return spKeys(raw).then(function (kk) {
            var old = S.cacheIds && S.cacheIds[sp.kind];
            if (old && old !== sp.id) {
              // a new key after someone left: my own parts go up again into the new space
              var keep = S.box[sp.kind] || {}; S.box[sp.kind] = {}; S.cur[sp.kind] = 0;
              Object.keys(keep).forEach(function (b) { var x2 = keep[b]; if (mayWrite(x2.by)) { S.box[sp.kind]['n:' + x2.n] = { n: x2.n, by: x2.by, ver: 0, data: x2.data }; S.dirty[sp.kind + '|' + x2.n] = 1; } });
            }
            S.cacheIds = S.cacheIds || {}; S.cacheIds[sp.kind] = sp.id;
            S.sp[sp.kind] = { id: sp.id, DK: kk.DK, NK: kk.NK, raw: raw }; return S.sp[sp.kind];
          });
        }).catch(function () { return null; });
        return ready0.then(function (ctx) {
          if (!ctx) return;
          // someone left: this phone makes the new key (a kid's phone never does)
          if (sp.rekey && g.role !== 'kid') return makeSpace(sp.kind, sp.id).catch(function () {});
          return handKeys(sp, ctx);
        });
      });
      return Promise.all(jobs).then(function () {
        // the first grown-up phone makes the spaces
        var need = [];
        if (g.role === 'grown' && !arr(g.spaces).some(function (s) { return s.kind === 'grove'; })) need.push('grove');
        if (g.role === 'grown' && !arr(g.spaces).some(function (s) { return s.kind === 'grown'; })) need.push('grown');
        var ch = Promise.resolve();
        need.forEach(function (kind) { ch = ch.then(function () { return makeSpace(kind).catch(function (e) { if (e && e.why === 'exists') return null; throw e; }); }); });
        return ch;
      }).then(function () {
        return Promise.all(['grove', 'grown'].map(function (kind) { return pull(kind).catch(function (e) { if (e && e.why === 'offline') throw e; }); }));
      }).then(function () {
        // the Household's own list (family members only), for a teen's or kid's sign in name when their tree is on no phone here
        if (g.mine && !S.hh) return api('GET', '/household', null, { tries: 1 }).then(function (h) { S.hh = h && h.household; }, function () {});
      }).then(function () { return publishMine(); }).then(flush);
    }).then(function () { S.loaded = true; S.at = now(); return saveCache(); }, function (e) {
      S.loaded = true; S.err = (e && e.why) || 'server';
      return saveCache();
    }).then(function () { S.busy = null; emit(); return S; });
    return S.busy;
  }

  /* ---------- reading the shared doc ---------- */
  function parts(kind, suffix) {
    var out = [], B = S.box[kind] || {};
    Object.keys(B).forEach(function (id) { var b = B[id]; if (!suffix || (suffix === 'month' ? /\|\d{4}-\d{2}$/.test(b.n) : b.n.slice(-suffix.length - 1) === '|' + suffix)) out.push(b); });
    return out;
  }
  function person(account) { return S.g && arr(S.g.people).find(function (p) { return p.account === account; }) || null; }
  function grownBy(by) { var p = person(by); return !!(p && p.role === 'grown'); }
  function meOf(account) { var b = findBox('grove', account + '|me'); return b ? obj(b.b.data) : {}; }
  function localProfile(account) { return localAll().find(function (p) { return p.account === account; }) || null; }
  // a teen's or kid's sign in name, from the Household this phone knows ("caleb.joy" shows as Caleb)
  function signinName(account) {
    var h = (window.GGSync && GGSync.household ? GGSync.household() : null) || S.hh, p = h && arr(h.people).find(function (x) { return x.account === account; });
    var k = p && p.kid ? String(p.kid).split('.')[0] : '';
    return k ? k.charAt(0).toUpperCase() + k.slice(1) : '';
  }
  var AGE = { grown: 'adult', teen: 'pine', kid: 'maple', guest: 'adult' };
  // the people of the grove, shaped like a Grounded profile so The Grove draws them the same way
  function people() {
    if (!S.g || !S.g.people) return [];
    return S.g.people.map(function (p) {
      var m = meOf(p.account), lp = localProfile(p.account);
      var name = clip(m.name || (lp && lp.name) || p.name || signinName(p.account) || (p.account === myId() ? 'You' : p.role === 'guest' ? 'A Guest' : 'Family Member'), 40);
      var tree = m.tree && typeof m.tree === 'object' ? m.tree : (lp && lp.shared && lp.shared.tree) || { show: false };
      return { id: p.account, name: name, avatar: m.avatar || (lp && lp.avatar) || '', age: m.age || (lp && lp.age) || AGE[p.role] || 'adult', role: p.role, guest: p.role === 'guest', me: p.account === myId(), shared: { tree: tree } };
    });
  }
  function me(kid) { var ps = people(), id = kid || myId(); return ps.find(function (p) { return p.id === id; }) || null; }
  function hidden() {
    var h = {};
    parts('grove', 'me').forEach(function (b) { if (grownBy(b.by)) Object.keys(obj(b.data.hide)).forEach(function (id) { h[id] = 1; }); });
    return h;
  }
  function wall() {
    var out = [], h = hidden();
    parts('grove', 'month').forEach(function (b) {
      arr(b.data.posts).forEach(function (p) {
        if (!p || !p.id || p.gone || h[p.id]) return;
        out.push({ id: p.id, by: b.by, text: clip(p.text, POST_MAX), day: p.day, at: p.at, before: p.before ? clip(p.before, 40) : '' });
      });
      arr(b.data.cheers).forEach(function (c) { if (c && c.id && CHEERS[+c.c] != null) out.push({ id: c.id, cheer: true, by: b.by, to: c.to || '', c: +c.c, day: c.day, at: c.at }); });
    });
    return out;
  }
  function reacts() {
    var out = {};
    parts('grove', 'me').forEach(function (b) { Object.keys(obj(b.data.reacts)).forEach(function (item) { var r = b.data.reacts[item]; if (r && r.k) (out[item] = out[item] || {})[b.by] = r.k; }); });
    return out;
  }
  function done() {
    var out = {};
    parts('grove', 'month').forEach(function (b) {
      Object.keys(obj(b.data.done)).forEach(function (day) { Object.keys(obj(b.data.done[day])).forEach(function (pid) { var at = b.data.done[day][pid]; if (!(+at > 0)) return; var d = out[day] || (out[day] = {}); if (!d[pid] || d[pid].at > new Date(+at).toISOString()) d[pid] = { by: b.by, at: new Date(+at).toISOString() }; }); });
    });
    return out;
  }
  function grew() {
    var g = {};
    parts('grove', 'me').forEach(function (b) { arr(b.data.grew).forEach(function (d) { g[d] = 1; }); });
    var dn = done(); Object.keys(dn).forEach(function (d) { g[d] = 1; });
    return g;
  }
  // the grove's name, scenery, and the plan's practices: the newest from a grown-up
  function set() {
    var best = {};
    parts('grove', 'me').forEach(function (b) { var s = obj(b.data.set); if (grownBy(b.by) && (+s.u || 0) > (+best.u || 0)) best = s; });
    return best;
  }
  function kinds() { var o = {}; parts('grove', 'me').forEach(function (b) { if (b.data.kind) o[b.by] = b.data.kind; }); return o; }
  function planPids() { return arr(set().plan).filter(function (x) { return typeof x === 'string'; }).slice(0, 6); }
  // the Family Check-in and Growth Plan: every grown-up's copy, the newest first, folded together
  function vault() {
    if (!grown()) return null;
    var list = parts('grown', 'vault').filter(function (b) { return grownBy(b.by); }).map(function (b) { return b.data; }).sort(function (a, b) { return (+b.u || 0) - (+a.u || 0); });
    if (!list.length) return null;
    var v = clone(list[0]);
    list.slice(1).forEach(function (o) {
      var ids = {}; arr(v.checkins).forEach(function (c) { ids[c.id] = 1; });
      arr(o.checkins).forEach(function (c) { if (c && c.id && !ids[c.id]) { v.checkins = arr(v.checkins).concat([c]); ids[c.id] = 1; } });
      var pl = {}; arr(v.plans).forEach(function (p) { pl[p.id || JSON.stringify(p)] = 1; });
      arr(o.plans).forEach(function (p) { var k2 = p && (p.id || JSON.stringify(p)); if (k2 && !pl[k2]) { v.plans = arr(v.plans).concat([p]); pl[k2] = 1; } });
    });
    return v;
  }

  /* ---------- writing my own part ---------- */
  function month(day) { return String(day || today()).slice(0, 7); }
  function myMonth(by, day) { var n = by + '|' + month(day); return { n: n, d: partOf('grove', n, function () { return { posts: [], done: {}, cheers: [] }; }) }; }
  function myMe(by) { var n = by + '|me'; return { n: n, d: partOf('grove', n, function () { return { u: 0, reacts: {}, hide: {}, set: {}, grew: [] }; }) }; }
  function commit() { emit(); saveCache(); clearTimeout(commit.t); commit.t = setTimeout(function () { flush().then(saveCache).then(emit).catch(function () {}); }, 400); return Promise.resolve(true); }
  function who(kid) { return kid && mayWrite(kid) ? kid : myId(); }
  function need() { if (!S.g || !S.sp.grove || S.g.role === 'waiting') { var e = new Error('The Family grove is getting ready. Try again in a moment.'); e.why = 'ready'; return e; } return null; }
  function post(text, kid) {
    var e = need(); if (e) return Promise.reject(e);
    var by = who(kid), p = person(by), max = p && p.role === 'kid' ? KID_MAX : POST_MAX;
    text = clip(text, max); if (!text) return Promise.resolve(false);
    var m = myMonth(by, today());
    if (arr(m.d.posts).filter(function (x) { return x.day === today(); }).length >= DAY_POSTS) { var e2 = new Error('That is a lot of posts for one day. The Wall will be here tomorrow.'); e2.why = 'many'; return Promise.reject(e2); }
    m.d.posts = arr(m.d.posts).concat([{ id: uid(), day: today(), at: new Date(now()).toISOString(), text: text }]);
    touch('grove', m.n); return commit();
  }
  function findPost(id) { var r = null; parts('grove', 'month').forEach(function (b) { arr(b.data.posts).forEach(function (p) { if (p.id === id) r = { b: b, p: p }; }); }); return r; }
  // the writer takes down their own post; a grown-up takes down any post (a hide mark in the grown-up's own part)
  function unpost(id, kid) {
    var f = findPost(id); if (!f) return Promise.resolve(false);
    var by = who(kid);
    if (f.b.by === by && mayWrite(by)) { f.p.gone = now(); touch('grove', f.b.n); return commit(); }
    if (grown()) { var m = myMe(myId()); m.d.hide = Object.assign({}, obj(m.d.hide)); m.d.hide[id] = now(); m.d.u = now(); touch('grove', m.n); return commit(); }
    return Promise.resolve(false);
  }
  function react(item, k, kid) {
    var e = need(); if (e) return Promise.reject(e);
    var by = who(kid), m = myMe(by), r = obj(m.d.reacts), cur = r[item];
    r[item] = cur && cur.k === k ? { k: '', u: now() } : { k: String(k).slice(0, 12), u: now() };
    // reactions older than about two months rest
    var keep = {}; Object.keys(r).forEach(function (x) { if ((+r[x].u || 0) > now() - 70 * 864e5) keep[x] = r[x]; });
    m.d.reacts = keep; m.d.u = now(); touch('grove', m.n); return commit();
  }
  function did(pid, kid) {
    var e = need(); if (e) return Promise.reject(e);
    var by = who(kid), d = today(), all = done(), on = !!(all[d] && all[d][pid]);
    if (on) {
      // take it back: every part I may write that marked it today steps back
      parts('grove', 'month').forEach(function (b) { var x = obj(b.data.done)[d]; if (x && +x[pid] > 0 && mayWrite(b.by)) { x[pid] = -now(); touch('grove', b.n); } });
      if (all[d][pid] && !mayWrite(all[d][pid].by)) return Promise.resolve('theirs');
      return commit().then(function () { return 'off'; });
    }
    var m = myMonth(by, d); m.d.done = obj(m.d.done); (m.d.done[d] = obj(m.d.done[d]))[pid] = now(); touch('grove', m.n);
    return commit().then(function () { return 'on'; });
  }
  function cheer(to, c, kid) {
    var e = need(); if (e) return Promise.reject(e);
    c = +c; if (!(c >= 0 && c < CHEERS.length)) return Promise.resolve(false);
    if (to && !person(to)) to = '';
    var by = who(kid), m = myMonth(by, today());
    if (arr(m.d.cheers).filter(function (x) { return x.day === today(); }).length >= DAY_POSTS) return Promise.resolve(false);
    m.d.cheers = arr(m.d.cheers).concat([{ id: uid(), to: to || '', c: c, day: today(), at: new Date(now()).toISOString() }]);
    touch('grove', m.n); return commit();
  }
  function setGrove(o) {
    if (!grown()) return Promise.resolve(false);
    var m = myMe(myId()), s = Object.assign({}, set());
    if (o.name != null) s.name = clip(o.name, 40);
    if (o.scenery != null) s.scenery = clip(o.scenery, 20);
    if (o.plan != null) s.plan = arr(o.plan).filter(function (x) { return typeof x === 'string'; }).slice(0, 6);
    s.u = now(); m.d.set = s; m.d.u = now(); touch('grove', m.n); return commit();
  }
  function myKind(k, kid) { var by = who(kid), m = myMe(by); m.d.kind = clip(k, 20); m.d.u = now(); touch('grove', m.n); return commit(); }
  // my line in the grove: name, picture, age, and the tree line (days tended, season, rings, recent parts) when the switch is on
  function meLine(p, show) {
    var t = obj(obj(p && p.shared).tree), on = show !== false && t.show !== false && !!t.tool;
    return { name: clip(p && p.name, 40), avatar: p && typeof p.avatar === 'string' ? p.avatar.slice(0, 80) : '', age: p && p.age || 'adult',
      tree: on ? { tool: t.tool, show: true, days: +t.days || 0, rings: +t.rings || 0, season: +t.season || 1, updated: t.updated || '', recent: arr(t.recent).slice(0, 14).map(function (r) { return { d: String(r.d || '').slice(0, 10), parts: arr(r.parts).map(String).slice(0, 6) }; }), willow: t.tool === 'willow' } : { show: false } };
  }
  function myProfile() {
    var id = myId(), all = localAll(), a = window.GGP && GGP.active ? GGP.active() : null;
    var hit = all.find(function (p) { return p.account === id; });
    if (hit) return hit;
    if (a) { var q = all.find(function (p) { return p.id === a.id; }); if (q && !q.kidAcct && !q.account) return q; }
    return all.length === 1 && !all[0].kidAcct && !all[0].account ? all[0] : null;
  }
  function showMine() { var m = meOf(myId()); return m.show !== false; }
  function setShow(on) { var m = myMe(myId()); m.d.show = !!on; m.d.u = now(); touch('grove', m.n); publishMine(); return commit(); }
  // my line, and the line of each kid I write for, kept fresh (only when something changed)
  function publishMine() {
    if (!S.g || !S.sp.grove || S.g.role === 'waiting') return Promise.resolve();
    var list = [{ by: myId(), p: myProfile() }].concat(kidsHere().map(function (k) { return { by: k.account, p: k.profile }; }));
    var nm0 = S.myName || signinName(myId());
    if (!list[0].p && nm0) list[0].p = { name: nm0, age: role() === 'kid' ? 'maple' : role() === 'teen' ? 'pine' : 'adult', shared: {} };   // a guest with no tree on this phone: the name they joined with
    list.forEach(function (x) {
      if (!x.p) return;
      var m = myMe(x.by), line = meLine(x.p, m.d.show);
      var cur = { name: m.d.name, avatar: m.d.avatar, age: m.d.age, tree: m.d.tree };
      if (JSON.stringify(cur) === JSON.stringify(line)) return;
      Object.assign(m.d, line); m.d.u = now(); touch('grove', m.n);
    });
    return Promise.resolve();
  }
  // home/home.js: a tree changed (publishTree): the grove line follows, when a Family grove is here
  function publishTree() { if (!S.g || !S.sp.grove) return Promise.resolve(); return publishMine().then(function () { if (Object.keys(S.dirty).length) return commit(); }); }
  function saveVault(v) {
    if (!grown() || !S.sp.grown) return Promise.resolve(false);
    var n = myId() + '|vault', d = clone(v) || {}; d.u = now();
    var f = findBox('grown', n);
    if (f) f.b.data = d; else partOf('grown', n, function () { return d; });
    touch('grown', n);
    // the plan's practices go to the grove space for the whole family (ids only)
    var pids = d.plan && arr(d.plan.items).map(function (x) { return x && x.pid; }).filter(Boolean);
    var s = set();
    if (JSON.stringify(arr(s.plan)) !== JSON.stringify(pids || [])) return setGrove({ plan: pids || [] });
    return commit();
  }

  /* ---------- planting, bringing the grove along, guests ---------- */
  function plant(name, from) {
    return api('POST', '/famgrove', {}).then(function () { S.at = 0; return load(true); }).then(function () {
      if (!S.g || !S.sp.grove) return S;
      return setGrove({ name: name || 'Our Family Grove' }).then(function () { return from ? bring(from.grove, from.vault) : null; }).then(function () { return flush(); }).then(saveCache)
        .then(function () { S.at = 0; return load(true); }).then(function () { emit(); return S; });
    });
  }
  // Bring Our Grove Along: the Family grove from before (this device) comes into the shared grove. Posts by this account's
  // profile become mine; posts by a kid whose tree this phone holds become the kid's; any other post shows as "From before"
  // with its name, in my part. Reactions and practices this account made come along; the name, scenery, and grew days too.
  function bring(g, v) {
    if (!g || !S.g || !S.sp.grove) return Promise.resolve(false);
    var mine = myProfile(), P = localAll();
    var acctOf = function (pid) { if (mine && pid === mine.id) return myId(); var p = P.find(function (q) { return q.id === pid; }); if (p && p.kidAcct && mayWrite(p.kidAcct)) return p.kidAcct; if (p && p.account === myId()) return myId(); return null; };
    var nameOf = function (pid) { var p = P.find(function (q) { return q.id === pid; }); return p ? p.name : 'Someone'; };
    var gone = obj(g.gone), have = {};
    parts('grove', 'month').forEach(function (b) { arr(b.data.posts).forEach(function (p) { have[p.id] = 1; }); });
    arr(g.wall).forEach(function (x) {
      if (!x || !x.id || gone[x.id] || have[x.id] || !x.text) return;
      var by = acctOf(x.by) || myId(), m = myMonth(by, x.day);
      m.d.posts = arr(m.d.posts).concat([{ id: String(x.id).slice(0, 40), day: String(x.day).slice(0, 10), at: x.at || x.day + 'T12:00', text: clip(x.text, POST_MAX), before: acctOf(x.by) ? '' : clip(nameOf(x.by), 40) }]);
      touch('grove', m.n);
    });
    Object.keys(obj(g.done)).forEach(function (d) {
      Object.keys(obj(g.done[d])).forEach(function (pid) { var x = g.done[d][pid], by = acctOf(x && x.by) || myId(), m = myMonth(by, d); m.d.done = obj(m.d.done); (m.d.done[d] = obj(m.d.done[d]))[pid] = Date.parse(x && x.at) || now(); touch('grove', m.n); });
    });
    Object.keys(obj(g.reacts)).forEach(function (item) { Object.keys(obj(g.reacts[item])).forEach(function (pid) { var by = acctOf(pid); if (!by) return; var m = myMe(by); m.d.reacts = obj(m.d.reacts); m.d.reacts[item] = { k: g.reacts[item][pid], u: now() }; touch('grove', m.n); }); });
    var me0 = myMe(myId()); me0.d.grew = Array.from(new Set(arr(me0.d.grew).concat(Object.keys(obj(g.grew))))).sort().slice(-400); touch('grove', me0.n);
    Object.keys(obj(g.kinds)).forEach(function (pid) { var by = acctOf(pid); if (by) { var m = myMe(by); m.d.kind = clip(g.kinds[pid], 20); touch('grove', m.n); } });
    var jobs = setGrove({ name: g.name || set().name || 'Our Family Grove', scenery: g.scenery || 'forest' });
    return jobs.then(function () { return v ? saveVault(v) : null; }).then(function () { return commit(); });
  }
  function join(code, name) { S.myName = clip(name, 24); return api('POST', '/famgrove/join', { code: String(code || ''), me: clip(name, 24) }).then(function (r) { S.at = 0; return load(true).then(function () { return r; }); }); }
  function code() { return api('POST', '/famgrove/' + S.g.id + '/code', {}).then(function (r) { S.code = { code: r.code, until: r.until }; S.at = 0; return load(true).then(function () { return r; }); }); }
  function closeCode() { return api('DELETE', '/famgrove/' + S.g.id + '/code').then(function () { S.code = null; S.at = 0; return load(true); }); }
  function welcome(account, ok) { return api('POST', '/famgrove/' + S.g.id + '/guests/' + account, { ok: !!ok }).then(function () { S.at = 0; return load(true); }); }
  function removeGuest(account) { return api('DELETE', '/famgrove/' + S.g.id + '/guests/' + account).then(function () { S.at = 0; return load(true); }); }
  function leaveAsGuest() { var id = myId(); return removeGuest(id); }

  /* ---------- the cards (drawn by The Grove; taps handled here) ---------- */
  var WORDS = { code: 'That code opens no Family grove. Check the letters with the family.', grown: 'Joining a Family grove with a code is for grown-up accounts. Teens and kids grow together in their own Family grove.',
    confirm: 'Confirm your email first, from the message Grounded sent.', name: 'Use letters only for your name, up to 24.', full: 'That Family grove has all the guests it can hold, or you are in as many as an account can join.',
    many: 'You are in as many Family groves as an account can join.', wait: 'That is a lot of tries. Give it a little while, then try again.', household: 'A Family grove grows from a Household. Start one in Your Grounded Account first.',
    offline: 'You look offline. Everything here is kept, and it shares again once you are back online.' };
  function say(e) { var w = e && e.why; return WORDS[w] || (e && e.why === 'ready' ? e.message : (A() && A().words && w ? A().words(w) : 'That did not go through. Try again in a moment.')); }
  function toast(m) { if (window.GGP && GGP.toast) GGP.toast(m); }
  function rerender() { if (typeof window.render === 'function') window.render(); }
  var UI = { name: '', joinCode: '', joinName: '', msg: '' };
  // The card in Our Grove: plant, waiting, joining by code, or nothing (the grove itself shows)
  function cardHtml(o) {
    o = o || {};
    if (!S.on || !signedIn()) return '';
    var h = '';
    if (S.g && S.g.role === 'waiting') return '<div class="card gv-fg"><h3>Your Family Welcomes You In</h3><p>Once a grown-up in the family taps Welcome, the grove opens here.</p><div class="tools-row" style="justify-content:flex-start"><button type="button" class="btn btn-line btn-sm" data-fg="check">Look Again</button></div></div>';
    if (S.g && S.g.role !== 'waiting' && !S.sp.grove) return '<div class="card gv-fg"><h3>Your Family Grove</h3><p>Your Family grove arrives once someone in your Household opens Grounded.</p><div class="tools-row" style="justify-content:flex-start"><button type="button" class="btn btn-line btn-sm" data-fg="check">Look Again</button></div></div>';
    if (S.g) return '';
    if (S.house && S.house.canPlant) {
      h += '<div class="card gv-fg"><h3>Your Family Grove</h3><p>Everyone in your Household grows together here, each on their own phone. Posts, cheers, and the practices you do together stay locked so only your family can read them.</p>';
      h += '<label class="lbl" for="gv-fgname">The grove\'s name</label><input id="gv-fgname" class="gv-input" maxlength="40" value="' + esc(UI.name || o.name || 'Our Family Grove') + '">';
      h += '<div class="tools-row" style="justify-content:flex-start"><button type="button" class="btn btn-gold btn-sm" data-fg="plant">Plant Our Family Grove</button>' + (o.bring ? '<button type="button" class="btn btn-line btn-sm" data-fg="bring">Bring Our Grove Along</button>' : '') + '</div>';
      if (o.bring) h += '<p class="muted">Bring Our Grove Along plants the Family grove and brings the posts, reactions, and practices from this device with it.</p>';
      h += '</div>';
    } else if (S.house && !S.house.planted) {
      h += '<div class="card gv-fg"><h3>Your Family Grove</h3><p>A grown-up in your Household plants your Family grove. Once it is planted, it opens here on your own phone.</p></div>';
    }
    if (S.me && S.me.band === 'adult') h += joinHtml();
    return h;
  }
  function joinHtml() {
    return '<div class="card gv-fg"><h3>Join a Family Grove With a Code</h3><p>A grown-up in the family gives you an 8 letter code in person. Type it here with the name you go by.</p>'
      + '<label class="lbl" for="gv-fgcode">Code</label><input id="gv-fgcode" class="gv-input" maxlength="12" autocomplete="off" value="' + esc(UI.joinCode) + '">'
      + '<label class="lbl" for="gv-fgme">The name you go by</label><input id="gv-fgme" class="gv-input" maxlength="24" placeholder="Grandma Jo" value="' + esc(UI.joinName) + '">'
      + '<p class="gv-err" role="alert">' + esc(UI.msg) + '</p><div class="tools-row" style="justify-content:flex-start"><button type="button" class="btn btn-gold btn-sm" data-fg="join">Join With a Code</button></div></div>';
  }
  function fmtDay(t) { try { return new Date(+t).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }); } catch (e) { return ''; } }
  // Grove Settings: the name, guests and the code (grown-ups), Show My Growth, and Leave (guests)
  function settingsHtml() {
    if (!S.g || S.g.role === 'waiting') return '';
    var h = '<div class="card gv-fg"><h3>Our Family Grove</h3><p class="muted">Your Household is your Family grove. Everyone in it sees the same grove on their own phone, and everything here stays locked so only your family and welcomed guests can read it.</p>';
    h += '<div class="gv-joinrow"><button type="button" class="gv-switch" role="switch" aria-checked="' + showMine() + '" data-fg="show"><span class="gv-track" aria-hidden="true"></span><span><b>Show My Growth on The Grove</b><small>' + (showMine() ? 'On. Your days tended, season, and rings show here. Never answers or journals.' : 'Off. Your tree still stands in the grove, growing quietly.') + '</small></span></button></div>';
    if (grown()) {
      var c = S.code && S.code.until > now() ? S.code : null, open = S.g.code;
      h += '<h3>Family and Friends</h3><p>Grandma, cousins, and friends outside your Household join with a code you give them in person, and a grown-up welcomes each one. Guests post, react, and cheer like family. They see nothing of the Family Check-in, the Growth Plan, the kitchen, or the planner.</p>';
      if (c) h += '<p class="gv-fgcode" style="font-size:1.8em;letter-spacing:.1em;margin:12px 0 4px"><b>' + esc(c.code.slice(0, 4) + ' ' + c.code.slice(4)) + '</b></p><p class="muted">Read it aloud or show it in person. It works until ' + esc(fmtDay(c.until)) + '.</p>';
      else if (open) h += '<p class="muted">Joining is open until ' + esc(fmtDay(open.until)) + '. Make a new code to see one here.</p>';
      h += '<div class="tools-row" style="justify-content:flex-start"><button type="button" class="btn btn-gold btn-sm" data-fg="code">Invite Family and Friends</button>' + (c || open ? '<button type="button" class="btn btn-line btn-sm" data-fg="close">Close Joining</button>' : '') + '</div>';
      arr(S.g.waiting).forEach(function (w) {
        h += '<div class="gv-fgwait"><p><b>' + esc(w.name) + '</b> is waiting to join, with the email ' + esc(w.email) + '.</p><div class="tools-row" style="justify-content:flex-start"><button type="button" class="btn btn-gold btn-sm" data-fg="welcome" data-id="' + esc(w.account) + '">Welcome</button><button type="button" class="btn btn-line btn-sm" data-fg="notnow" data-id="' + esc(w.account) + '">Not Now</button></div></div>';
      });
      var gs = people().filter(function (p) { return p.guest; });
      if (gs.length) h += '<ul class="gv-fam-list">' + gs.map(function (p) { return '<li><div><b>' + esc(p.name) + '</b><span>Welcomed guest</span></div><button type="button" class="btn btn-line btn-sm" data-fg="remove" data-id="' + esc(p.id) + '">Remove</button></li>'; }).join('') + '</ul>';
    }
    if (role() === 'guest') h += '<div class="tools-row" style="justify-content:flex-start"><button type="button" class="btn btn-line btn-sm" data-fg="leave">Leave This Family Grove</button></div>';
    return h + '</div>';
  }
  function busyDo(p, ok) { return p.then(function (r) { UI.msg = ''; if (ok) toast(ok); rerender(); return r; }, function (e) { UI.msg = say(e); toast(UI.msg); rerender(); }); }
  document.addEventListener('input', function (e) {
    var t = e.target; if (!t || !t.id) return;
    if (t.id === 'gv-fgname') UI.name = t.value; else if (t.id === 'gv-fgcode') UI.joinCode = t.value; else if (t.id === 'gv-fgme') UI.joinName = t.value;
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-fg]'); if (!b) return;
    var a = b.getAttribute('data-fg'), id = b.getAttribute('data-id');
    if (a === 'check') busyDo(load(true));
    else if (a === 'plant') busyDo(plant(clip(UI.name, 40) || 'Our Family Grove'), 'Your Family grove is planted.');
    else if (a === 'bring') { if (typeof window.GGFamilyGroveBring === 'function') busyDo(Promise.resolve(window.GGFamilyGroveBring(clip(UI.name, 40))), 'Your grove came along.'); }
    else if (a === 'join') {
      var cd = String(UI.joinCode || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (cd.length !== 8) { UI.msg = 'A code is 8 letters and numbers.'; rerender(); return; }
      if (!clip(UI.joinName, 24)) { UI.msg = 'Add the name you go by.'; rerender(); return; }
      busyDo(join(cd, UI.joinName).then(function (r) { UI.joinCode = ''; return r; }));
    }
    else if (a === 'code') busyDo(code(), 'Here is the code. Read it aloud or show it in person.');
    else if (a === 'close') busyDo(closeCode(), 'Joining is closed.');
    else if (a === 'welcome') busyDo(welcome(id, true), 'Welcomed. The grove opens on their phone.');
    else if (a === 'notnow') busyDo(welcome(id, false));
    else if (a === 'remove') { if (!confirm('Remove this guest from the Family grove? Their posts leave with them.')) return; busyDo(removeGuest(id), 'Removed.'); }
    else if (a === 'leave') { if (!confirm('Leave this Family grove? Your posts leave with you.')) return; busyDo(leaveAsGuest(), 'You left the Family grove.'); }
    else if (a === 'show') busyDo(setShow(!showMine()));
  });
  // a new post or cheer from someone else shows the next time The Grove opens or comes back into view (no alerts, no counts)
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible' && S.g && now() - S.at > 30000) load(true).catch(function () {}); });
  window.addEventListener('online', function () { if (S.g) load(true).catch(function () {}); });

  window.GGFamilyGrove = {
    v: V, live: live, load: load, st: function () { return S; }, on: function (fn) { subs.push(fn); return function () { subs = subs.filter(function (f) { return f !== fn; }); }; },
    ready: function () { return !!(S.g && S.g.role !== 'waiting' && S.sp.grove); }, role: role, grown: grown, id: function () { return S.g ? S.g.id : ''; },
    people: people, me: me, kidsHere: kidsHere, wall: wall, reacts: reacts, done: done, grew: grew, set: set, kinds: kinds, vault: vault, planPids: planPids, mayWrite: mayWrite,
    post: post, unpost: unpost, react: react, did: did, cheer: cheer, setGrove: setGrove, myKind: myKind, setShow: setShow, showMine: showMine,
    plant: plant, bring: bring, join: join, code: code, closeCode: closeCode, welcome: welcome, removeGuest: removeGuest, leave: leaveAsGuest,
    saveVault: saveVault, publishTree: publishTree, cardHtml: cardHtml, settingsHtml: settingsHtml, say: say,
    CHEERS: CHEERS, STARTERS: STARTERS, POST_MAX: POST_MAX, KID_MAX: KID_MAX, _: { S: S, flush: flush, merge: merge }
  };
})();
