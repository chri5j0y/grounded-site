/* =====================================================================
   GROUNDED SYNC (shared/gg-sync.js), GWG BLD 938 Accounts and Sync, stage 1
   Sync Everywhere: each saved record is split into small pieces with versions, each device sends only what
   changed, already locked, and brings down what changed elsewhere. Needs shared/gg-account.js (GGAccount).
   Plan: grounded-workshop patches/plan/accounts-plan.md. Stage 2 wiring: patches/bld938/STAGE2.md.

   Pieces
   - A doc is one saved object (a profile's vault, the profile list, a shared Family Kitchen or Grounded Money plan).
   - Each top level part of a doc is one piece. Inside it, any map keyed by dates (2026-11-07, 2026-11, 2026-W45)
     is split into one piece per month (or per year for month and week keys), and arrays named in a doc's rules
     (Grounded Money's logs) split by the month of each item's date. Each piece is one locked box on the server.
   Merge rules (when two devices changed the same piece)
   - Lists add together: records with an id join by id; plain lists keep every addition from both devices.
   - A record with a time (u) that both devices changed keeps the newer whole record (the Grounded Money way).
   - Settings and other single values take the newest change.
   - Something removed stays removed: a removed piece leaves a marker on the server, and a removed list item
     stays out after the merge.
   - An opaque doc (a teen's sealed Pine vault) keeps the newest whole copy.
   Offline: every change stays on this device; the next sync compares what is here with what was last sent and
   sends the difference, so changes made with no connection wait and send when it returns.
   On this device the last synced copy of each piece is kept in IndexedDB (gg-sync), locked with the account key.
   A shared family computer stays private (BLD 938, the safer default): a doc syncs only while it is open on this
   device (its adapter answers null while closed, as a locked profile does), and pieces of a doc that is closed here
   are never kept here: only a small note of each one (its opaque id and version) waits, and the pieces come down the
   next time that doc opens with its own passcode. Only the account's own docs (names starting acct:) are carried.

   For stage 2
     GGSync.doc(name, adapter, opts)     an account doc. adapter: {get() -> object or null (null: closed for now),
                                         put(object, info) -> Promise}. opts: {rules: [{path, field}], opaque}
     GGSync.space(kind, adapter, opts)   a household shared doc: kind 'kitchen' or 'money'
     GGSync.drop(name)                   stop syncing a doc here (its pieces stay on the server)
     GGSync.changed(name)                a doc changed: sync in a few seconds
     GGSync.sync()                       sync now: Promise of {pushed, pulled, merged, applied, bad, old}
     GGSync.status(), GGSync.on(fn)      fn(type, detail): 'status', 'applied', 'bad', 'old', 'spaces'
     GGSync.remoteDocs(), fetchDoc(name) docs the account holds that this device has not opened yet
     GGSync.removeDoc(name)              remove a doc from the account (every piece leaves a marker)
     GGSync.spaces(), shareSpace(kind), rekey(kind), rekeyAll(), leftHousehold()
     GGSync.carried()                    every doc name this device holds for the account
     GGSync.forget()                     forget everything here (sign out)
     GGSync.RULES                        the default split rules for known docs
   No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGSync) return;
  var V = 'b938', enc = new TextEncoder(), dec = new TextDecoder(), subtle = window.crypto && crypto.subtle;
  function X() { if (!window.GGAccount || !GGAccount._) throw new Error('GGSync needs shared/gg-account.js'); return GGAccount._; }

  /* ---------- plain helpers ---------- */
  function isObj(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); }
  function stable(v) {
    if (v === undefined) return 'u';
    if (v === null || typeof v !== 'object') return JSON.stringify(v);
    if (Array.isArray(v)) return '[' + v.map(stable).join(',') + ']';
    return '{' + Object.keys(v).sort().filter(function (k) { return v[k] !== undefined; }).map(function (k) { return JSON.stringify(k) + ':' + stable(v[k]); }).join(',') + '}';
  }
  function eq(a, b) { return stable(a) === stable(b); }
  function clone(v) { return v === undefined ? undefined : JSON.parse(JSON.stringify(v)); }

  /* ---------- the merge ---------- */
  function newer(m, t, tm, tt) { return (+tm || 0) > (+tt || 0) ? m : t; }
  function hasId(x) { return isObj(x) && (typeof x.id === 'string' || typeof x.id === 'number'); }
  // b: the last copy both devices shared (undefined when unknown), m: this device, t: the other device
  function merge3(b, m, t, tm, tt) {
    if (eq(m, t)) return clone(m);
    if (eq(b, m)) return clone(t);
    if (eq(b, t)) return clone(m);
    if (m === undefined || t === undefined) return undefined;   // removed on one device, changed on the other: removed stays removed
    if (isObj(m) && isObj(t)) {
      var out = {}, bb = isObj(b) ? b : undefined, ks = Object.keys(m);
      Object.keys(t).forEach(function (k) { if (ks.indexOf(k) < 0) ks.push(k); });
      ks.forEach(function (k) { var r = merge3(bb ? bb[k] : undefined, m[k], t[k], tm, tt); if (r !== undefined) out[k] = r; });
      return out;
    }
    if (Array.isArray(m) && Array.isArray(t)) return mergeList(Array.isArray(b) ? b : [], m, t, tm, tt, b === undefined);
    return clone(newer(m, t, tm, tt));
  }
  function mergeList(b, m, t, tm, tt, noBase) {
    if (m.length && t.length && m.concat(t, b).every(hasId)) {
      var B = {}, M = {}, T = {}, ids = [];
      b.forEach(function (x) { B[x.id] = x; });
      m.forEach(function (x) { M[x.id] = x; ids.push(x.id); });
      t.forEach(function (x) { T[x.id] = x; if (!(x.id in M)) ids.push(x.id); });
      var out = [];
      ids.forEach(function (id) {
        var bi = B[id], mi = M[id], ti = T[id];
        if (mi && ti) {
          if (!eq(bi, mi) && !eq(bi, ti) && typeof mi.u === 'number' && typeof ti.u === 'number' && mi.u !== ti.u) out.push(clone(mi.u > ti.u ? mi : ti));
          else { var r = merge3(bi, mi, ti, tm, tt); if (r !== undefined) out.push(r); }
        } else if (mi) { if (!bi || noBase) out.push(clone(mi)); }   // only here: new here, or removed there (stays removed)
        else if (ti) { if (!bi || noBase) out.push(clone(ti)); }
      });
      return out;
    }
    // Plain lists add together: each item counts as often as it shows, so two additions are both kept,
    // and an item one device removed stays removed.
    var cnt = function (a) { var c = {}; a.forEach(function (x) { var k = stable(x); c[k] = (c[k] || 0) + 1; }); return c; };
    var cb = cnt(b), cm = cnt(m), ct = cnt(t), seen = {}, res = [];
    m.concat(t).forEach(function (x) {
      var k = stable(x); if (seen[k]) return; seen[k] = 1;
      var n = noBase ? Math.max(cm[k] || 0, ct[k] || 0) : Math.max(0, (cm[k] || 0) + (ct[k] || 0) - (cb[k] || 0));
      for (var i = 0; i < n; i++) res.push(clone(x));
    });
    return res;
  }

  /* ---------- pieces ---------- */
  var DAYK = /^\d{4}-\d{2}-\d{2}$/, MONK = /^\d{4}-\d{2}$/, WEEKK = /^\d{4}-W\d{2}$/;
  function groupOf(k) { return DAYK.test(k) ? k.slice(0, 7) : (MONK.test(k) || WEEKK.test(k)) ? k.slice(0, 4) : null; }
  function isDateMap(v) { if (!isObj(v)) return false; var ks = Object.keys(v); return ks.length > 0 && ks.every(function (k) { return groupOf(k) && v[k] !== undefined; }); }
  function seg(k) { return encodeURIComponent(k).replace(/~/g, '%7E').replace(/!/g, '%21').replace(/\*/g, '%2A'); }
  function unseg(s) { return decodeURIComponent(s); }
  function ruleFor(rules, path) { for (var i = 0; i < (rules || []).length; i++) if (rules[i].path === path) return rules[i]; return null; }
  function rulePath(path) { return path.split('/').map(unseg).join('/'); }
  // Returns the copy of v that stays in its piece, and adds split off pieces to out.
  function strip(v, path, depth, out, rules) {
    if (Array.isArray(v)) {
      var r = ruleFor(rules, rulePath(path));
      if (!r) return clone(v);
      var rest = [], g = {};
      v.forEach(function (x) { var d = isObj(x) ? String(x[r.field || 'd'] || '').slice(0, 10) : ''; if (DAYK.test(d)) (g[d.slice(0, 7)] = g[d.slice(0, 7)] || []).push(clone(x)); else rest.push(clone(x)); });
      Object.keys(g).forEach(function (m) { out[path + '@' + m] = g[m]; });
      return rest;
    }
    if (!isObj(v)) return clone(v);
    if (isDateMap(v)) {
      Object.keys(v).forEach(function (k) { var m = groupOf(k), p = path + '~' + m; (out[p] = out[p] || {})[k] = clone(v[k]); });
      return {};
    }
    var o = {};
    Object.keys(v).forEach(function (k) { if (v[k] !== undefined) o[k] = depth < 6 ? strip(v[k], path + '/' + seg(k), depth + 1, out, rules) : clone(v[k]); });
    return o;
  }
  function split(doc, rules) {
    var out = {};
    if (!isObj(doc)) { out[''] = clone(doc); return out; }
    Object.keys(doc).forEach(function (k) { if (doc[k] !== undefined) { var p = seg(k), v = strip(doc[k], p, 1, out, rules); out[p] = v; } });
    return out;
  }
  function segs(path) { return path === '' ? [] : path.split('/').map(unseg); }
  function setAt(root, ks, v) { var o = root; for (var i = 0; i < ks.length - 1; i++) { if (!isObj(o[ks[i]]) && !Array.isArray(o[ks[i]])) o[ks[i]] = {}; o = o[ks[i]]; } o[ks[ks.length - 1]] = v; }
  function getAt(root, ks, mk) { var o = root; for (var i = 0; i < ks.length; i++) { if (o[ks[i]] == null) { if (!mk) return undefined; o[ks[i]] = i === ks.length - 1 ? mk() : {}; } o = o[ks[i]]; } return o; }
  var GRP = /^(.*)([~@])([0-9W-]+)$/;
  function assemble(pieces) {
    var ps = Object.keys(pieces);
    if (ps.length === 1 && ps[0] === '' ) return clone(pieces['']);
    var root = isObj(pieces['']) ? clone(pieces['']) : {};
    ps.filter(function (p) { return p !== '' && !GRP.test(p); })
      .sort(function (a, b) { return a.split('/').length - b.split('/').length || (a < b ? -1 : 1); })
      .forEach(function (p) { setAt(root, segs(p), clone(pieces[p])); });
    ps.filter(function (p) { return GRP.test(p); }).sort().forEach(function (p) {
      var m = GRP.exec(p), ks = segs(m[1]);
      var tgt = getAt(root, ks, m[2] === '@' ? function () { return []; } : function () { return {}; });
      if (m[2] === '@' && Array.isArray(tgt)) Array.prototype.push.apply(tgt, clone(pieces[p]));
      else if (isObj(tgt)) Object.assign(tgt, clone(pieces[p]));
    });
    return root;
  }

  /* ---------- this device's store (IndexedDB gg-sync) ---------- */
  function idb() { return new Promise(function (res, rej) { var r = indexedDB.open('gg-sync', 1); r.onupgradeneeded = function () { r.result.createObjectStore('base'); r.result.createObjectStore('meta'); }; r.onsuccess = function () { res(r.result); }; r.onerror = function () { rej(r.error); }; }); }
  function tx(store, mode, fn) { return idb().then(function (db) { return new Promise(function (res, rej) { var t = db.transaction(store, mode), s = t.objectStore(store), out = fn(s); t.oncomplete = function () { db.close(); res(out && out.result); }; t.onerror = function () { db.close(); rej(t.error); }; }); }); }
  function all(store) { return idb().then(function (db) { return new Promise(function (res) { var out = {}, q = db.transaction(store, 'readonly').objectStore(store).openCursor(); q.onsuccess = function () { var c = q.result; if (c) { out[c.key] = c.value; c.continue(); } else { db.close(); res(out); } }; q.onerror = function () { db.close(); res(out); }; }); }); }
  function metaGet(k) { return tx('meta', 'readonly', function (s) { return s.get(k); }).catch(function () { return undefined; }); }
  function metaPut(k, v) { return tx('meta', 'readwrite', function (s) { if (v === undefined) s.delete(k); else s.put(v, k); }).catch(function () {}); }

  /* ---------- state ---------- */
  var docs = {}, subs = [], S = { state: 'idle', waiting: 0, last: 0, error: '' }, running = null, again = false, timer = null, retry = 0, retryT = null;
  var CFG = { debounce: 5000, every: 60000, carry: ['acct:'] };
  function carries(name) { return CFG.carry.some(function (p) { return name.indexOf(p) === 0; }); }
  var spaceCtx = {};      // kind -> {id, kind, DK, NK, raw}
  var lastHousehold = undefined;
  function emit(type, d) { subs.slice().forEach(function (fn) { try { fn(type, d); } catch (e) { console.error(e); } }); }
  function setS(o) { Object.keys(o).forEach(function (k) { S[k] = o[k]; }); emit('status', status()); }
  function status() { return { state: S.state, waiting: Object.keys(docs).filter(function (n) { return docs[n].dirtyAt; }).length, last: S.last, error: S.error }; }

  // the scope context: the account, or one shared space
  function acctCtx(K) { var x = X(); return { scope: 'a', pre: '', idp: 'a|', DK: K.DK, NK: K.NK, aad: function (id, v) { return x.AAD.box(K.accountId, id, v); } }; }
  function spCtx(sp) { var x = X(); return { scope: sp.id, pre: '/spaces/' + sp.id, idp: 's|', DK: sp.DK, NK: sp.NK, kind: sp.kind, aad: function (id, v) { return x.AAD.sbox(sp.id, id, v); } }; }
  function idOf(sc, name) { return X().boxId(sc.NK, sc.idp + name); }

  // bases: the last synced copy of each piece, locked with the account key at rest
  function loadBases(K) {
    return all('base').then(function (raw) {
      var out = {}, jobs = [];
      Object.keys(raw).forEach(function (key) {
        var r = raw[key];
        if (r.gone || r.stub || !r.sealed) { out[key] = r; return; }
        jobs.push(X().open(K.DK, r.sealed, 'gg1|base|' + key).then(function (u8) { r.data = JSON.parse(dec.decode(u8)); out[key] = r; }, function () {}));
      });
      return Promise.all(jobs).then(function () { return out; });
    }).catch(function () { return {}; });
  }
  function saveBases(K, list) {
    if (!list.length) return Promise.resolve();
    return Promise.all(list.map(function (r) {
      var key = r.scope + '|' + r.name, rec = { scope: r.scope, name: r.name, id: r.id, ver: r.ver, gone: !!r.gone, seen: !!r.seen, at: r.at || 0 };
      if (r.gone || r.stub) { if (r.stub) rec.stub = true; return { key: key, rec: rec }; }
      return X().seal(K.DK, enc.encode(JSON.stringify(r.data === undefined ? null : r.data)), 'gg1|base|' + key).then(function (s) { rec.sealed = s; return { key: key, rec: rec }; });
    })).then(function (rows) { return tx('base', 'readwrite', function (s) { rows.forEach(function (x) { if (x.rec.drop) s.delete(x.key); else s.put(x.rec, x.key); }); }); });
  }
  function dropBases(pred) { return tx('base', 'readwrite', function (s) { var q = s.openCursor(); q.onsuccess = function () { var c = q.result; if (!c) return; if (pred(c.key, c.value)) c.delete(); c.continue(); }; }).catch(function () {}); }

  /* ---------- the server, for one scope ---------- */
  function pull(sc, B, res) {
    var api = X().api, remote = {}, fetch = [], byId = {};
    Object.keys(B).forEach(function (k) { var r = B[k]; if (r.scope === sc.scope && r.id) byId[r.id] = r; });
    var cursorKey = 'cursor|' + sc.scope;
    return metaGet(cursorKey).then(function (cur) {
      cur = +cur || 0;
      var page = function () {
        return api('GET', sc.pre + '/boxes?since=' + cur).then(function (r) {
          r.items.forEach(function (it) {
            var b = byId[it.id];
            if (b && it.ver < b.ver) { res.old++; emit('old', { id: it.id }); return; }   // an older copy served again: keep ours
            if (b && it.ver === b.ver && !!b.gone === !!it.gone) return;
            if (it.gone) { if (b) remote[b.name] = { gone: true, ver: it.ver, id: it.id }; return; }
            fetch.push(it);
          });
          cur = r.seq;
          if (r.more) return page();
        });
      };
      return page().then(function () { return getBoxes(sc, fetch, remote, res); }).then(function () { return { remote: remote, cursor: cur, cursorKey: cursorKey }; });
    });
  }
  function getBoxes(sc, items, remote, res) {
    var x = X(), small = items.filter(function (i) { return i.size <= 49152; }), big = items.filter(function (i) { return i.size > 49152; }), jobs = [];
    var take = function (id, ver, u8) {
      return x.open(sc.DK, u8, sc.aad(id, ver)).then(x.unpack).then(function (j) {
        return idOf(sc, j.t).then(function (want) {
          if (want !== id) throw new Error('name');
          remote[j.t] = { ver: ver, data: j.data, at: +j.at || 0, id: id };
        });
      }).catch(function () { res.bad++; emit('bad', { id: id, scope: sc.scope }); });
    };
    for (var i = 0; i < small.length; i += 50) {
      (function (chunk) {
        jobs.push(x.api('POST', sc.pre + '/boxes/batch', { items: chunk.map(function (c) { return { op: 'get', id: c.id }; }) }).then(function (r) {
          return Promise.all(r.items.map(function (it) { return it.ok ? take(it.id, it.ver, x.unb64u(it.data)) : null; }));
        }));
      })(small.slice(i, i + 50));
    }
    big.forEach(function (it) {
      jobs.push(x.api('GET', sc.pre + '/boxes/' + it.id, null, { raw: true }).then(function (r) {
        var ver = +r.headers.get('X-GG-Ver'); return r.arrayBuffer().then(function (b) { return take(it.id, ver, new Uint8Array(b)); });
      }).catch(function (e) { if (e.why === 'offline') throw e; }));
    });
    return Promise.all(jobs);
  }
  function getOne(sc, name) {
    var x = X();
    return idOf(sc, name).then(function (id) {
      return x.api('GET', sc.pre + '/boxes/' + id, null, { raw: true }).then(function (r) {
        var ver = +r.headers.get('X-GG-Ver');
        return r.arrayBuffer().then(function (b) { return x.open(sc.DK, new Uint8Array(b), sc.aad(id, ver)); }).then(x.unpack).then(function (j) {
          if (j.t !== name) throw x.kind('box');
          return { ver: ver, data: j.data, at: +j.at || 0, id: id };
        });
      }, function (e) { if (e.why === 'gone') return { gone: true, ver: e.ver, id: id }; if (e.why === 'none') return null; throw e; });
    });
  }
  // ops: [{name, data, del, ver}] -> results [{ok, ver, why, cur}]
  function push(sc, ops, at) {
    var x = X(), dev = x.deviceTag().slice(0, 8);
    return Promise.all(ops.map(function (op) {
      return idOf(sc, op.name).then(function (id) {
        op.id = id;
        if (op.del) return { op: 'del', id: id, ver: op.ver };
        return x.pack({ t: op.name, at: at, dev: dev, data: op.data }).then(function (p) { return x.seal(sc.DK, p, sc.aad(id, op.ver + 1)); }).then(function (u8) { return { op: 'put', id: id, ver: op.ver, u8: u8 }; });
      });
    })).then(function (items) {
      var results = new Array(items.length), jobs = [], small = [];
      items.forEach(function (it, i) { if (it.u8 && it.u8.length > 60000) jobs.push(x.api('PUT', sc.pre + '/boxes/' + it.id, it.u8, { headers: it.ver ? { 'If-Match': '"' + it.ver + '"' } : { 'If-None-Match': '*' } }).then(function (r) { results[i] = { ok: true, ver: r.ver }; }, function (e) { if (e.why === 'offline') throw e; results[i] = { ok: false, why: e.why, cur: e.ver }; })); else small.push(i); });
      for (var k = 0; k < small.length; k += 50) {
        (function (idx) {
          jobs.push(x.api('POST', sc.pre + '/boxes/batch', { items: idx.map(function (i) { var it = items[i]; return it.op === 'del' ? { op: 'del', id: it.id, ver: it.ver } : { op: 'put', id: it.id, ver: it.ver, data: x.b64u(it.u8) }; }) }).then(function (r) {
            r.items.forEach(function (res, j) { results[idx[j]] = res.ok ? { ok: true, ver: res.ver } : { ok: false, why: res.why, cur: res.ver }; });
          }));
        })(small.slice(k, k + 50));
      }
      return Promise.all(jobs).then(function () { return results; });
    });
  }

  /* ---------- one doc ---------- */
  function syncDoc(sc, d, B, remote, res, K) {
    return Promise.resolve().then(function () { return d.adapter.get(); }).then(function (local) {
      if (local == null) {
        // closed for now (a locked profile, the safer shared computer default): note each changed piece so it
        // comes down the next time this doc opens, and never lose it when the cursor moves past.
        var upd = [];
        Object.keys(remote).forEach(function (n) {
          if (n.indexOf(d.name + '#') !== 0) return;
          var key = sc.scope + '|' + n, b = B[key], r = remote[n];
          if (b && b.ver >= r.ver) { delete remote[n]; return; }
          upd.push(r.gone ? { scope: sc.scope, name: n, id: r.id, ver: r.ver, gone: true, seen: false } : carries(n) ? { scope: sc.scope, name: n, id: r.id, ver: r.ver, data: r.data, at: r.at, seen: false } : { scope: sc.scope, name: n, id: r.id, ver: r.ver, stub: true, seen: false });
          delete remote[n];
        });
        return saveBases(K, upd).then(function () { upd.forEach(function (u) { B[u.scope + '|' + u.name] = u; }); });
      }
      // pieces noted while this doc was closed here: bring them down now
      var pre0 = d.name + '#', stubs = Object.keys(B).map(function (k) { return B[k]; }).filter(function (r) { return r.scope === sc.scope && r.stub && r.name.indexOf(pre0) === 0 && !remote[r.name]; });
      if (!stubs.length) return local;
      return getBoxes(sc, stubs.map(function (r) { return { id: r.id, ver: r.ver, size: 0 }; }), remote, res).then(function () { stubs.forEach(function (r) { delete B[r.scope + '|' + r.name]; }); return local; });
    }).then(function (local) {
      if (local == null) return;
      var L = d.opaque ? { '': clone(local) } : split(local, d.rules), pre = d.name + '#', names = {}, at = d.dirtyAt || Date.now();
      Object.keys(L).forEach(function (p) { names[pre + p] = 1; });
      Object.keys(B).forEach(function (k) { var r = B[k]; if (r.scope === sc.scope && r.name.indexOf(pre) === 0) names[r.name] = 1; });
      Object.keys(remote).forEach(function (n) { if (n.indexOf(pre) === 0) names[n] = 1; });
      var out = {}, ops = [], upd = [];
      var base = function (n) { return B[sc.scope + '|' + n]; };
      var plan = function (n, r) {
        var path = n.slice(pre.length), l = L[path], b = base(n);
        if (r && r.gone) { upd.push({ scope: sc.scope, name: n, id: r.id, ver: r.ver, gone: true, seen: true }); return; }
        if (!r && b && b.gone) { if (l !== undefined) { ops.push({ name: n, path: path, data: l, ver: b.ver, l: l }); out[path] = l; } return; }
        var unseen = b && !b.gone && !b.seen;
        var th = r || (b && !b.gone ? b : null);
        if (!th) { if (l !== undefined) { ops.push({ name: n, path: path, data: l, ver: 0, l: l }); out[path] = l; } return; }
        var bseen = b && b.seen && !b.gone ? b.data : undefined;
        // With a seen base, "mine" is a real difference from it. With only a stub (a profile reopened on a shared
        // computer), the local copy is last synced unless an edit marked the doc dirty, so a clean doc yields to the
        // newer server version instead of asserting itself.
        var mine = b && b.seen && !b.gone ? !eq(l, b.data) : (d.dirtyAt ? l !== undefined : false);
        var theirs = !!r || unseen;
        if (!mine && !theirs) { if (l !== undefined) out[path] = l; return; }
        if (!mine) { if (th.data !== undefined) out[path] = clone(th.data); upd.push({ scope: sc.scope, name: n, id: th.id, ver: th.ver, data: th.data, at: th.at, seen: true }); res.pulled++; return; }
        if (!theirs) { if (l === undefined) ops.push({ name: n, path: path, del: true, ver: th.ver }); else { ops.push({ name: n, path: path, data: l, ver: th.ver, l: l }); out[path] = l; } return; }
        if (l === undefined) { ops.push({ name: n, path: path, del: true, ver: th.ver }); return; }   // removed here stays removed
        var merged = d.opaque ? clone(at >= (th.at || 0) ? l : th.data) : merge3(bseen, l, th.data, at, th.at);
        res.merged++;
        if (merged === undefined) { ops.push({ name: n, path: path, del: true, ver: th.ver }); return; }
        if (eq(merged, th.data)) { out[path] = clone(th.data); upd.push({ scope: sc.scope, name: n, id: th.id, ver: th.ver, data: th.data, at: th.at, seen: true }); return; }
        ops.push({ name: n, path: path, data: merged, ver: th.ver, l: l, b: bseen }); out[path] = merged;
      };
      // A doc that reads as empty here never erases the account's copy (only removeDoc does): it takes what the account holds.
      if (!Object.keys(L).length && Object.keys(names).length) { Object.keys(names).forEach(function (n) { var b = base(n); if (b && b.seen && !b.gone && !remote[n]) { b.seen = false; } }); }
      Object.keys(names).forEach(function (n) { plan(n, remote[n]); });
      var round = function (list, tries) {
        if (!list.length) return Promise.resolve();
        return push(sc, list, at).then(function (rs) {
          var redo = [];
          rs.forEach(function (r, i) {
            var op = list[i];
            if (r && r.ok) { res.pushed++; upd.push(op.del ? { scope: sc.scope, name: op.name, id: op.id, ver: r.ver, gone: true, seen: true } : { scope: sc.scope, name: op.name, id: op.id, ver: r.ver, data: op.data, at: at, seen: true }); }
            else if (r && (r.why === 'conflict' || r.why === 'none')) redo.push(op);
            else if (r && (r.why === 'big' || r.why === 'full')) { S.error = r.why; }
          });
          if (!redo.length || tries >= 4) return;
          // another device wrote first: bring its copy, merge again, and send
          return Promise.all(redo.map(function (op) { return getOne(sc, op.name).then(function (cur) { return { op: op, cur: cur }; }); })).then(function (got) {
            var next = [];
            got.forEach(function (g) {
              var op = g.op, cur = g.cur, path = op.path;
              if (!cur) { if (!op.del) next.push({ name: op.name, path: path, data: op.data, ver: 0, l: op.l }); return; }
              if (cur.gone) { delete out[path]; upd.push({ scope: sc.scope, name: op.name, id: cur.id, ver: cur.ver, gone: true, seen: true }); return; }
              if (op.del) { next.push({ name: op.name, path: path, del: true, ver: cur.ver }); return; }
              var b = base(op.name), bseen = op.b !== undefined ? op.b : (b && b.seen && !b.gone ? b.data : undefined);
              var m = d.opaque ? clone(at >= cur.at ? op.l : cur.data) : merge3(bseen, op.l, cur.data, at, cur.at);
              res.merged++;
              if (m === undefined) { delete out[path]; next.push({ name: op.name, path: path, del: true, ver: cur.ver }); return; }
              out[path] = m;
              if (eq(m, cur.data)) { upd.push({ scope: sc.scope, name: op.name, id: cur.id, ver: cur.ver, data: cur.data, at: cur.at, seen: true }); return; }
              next.push({ name: op.name, path: path, data: m, ver: cur.ver, l: op.l, b: bseen });
            });
            return round(next, tries + 1);
          });
        });
      };
      return round(ops, 0).then(function () {
        return saveBases(K, upd);
      }).then(function () {
        upd.forEach(function (u) { B[u.scope + '|' + u.name] = u; });
        var now = d.opaque ? out[''] : assemble(out);
        if (!eq(now, local)) { res.applied++; return Promise.resolve(d.adapter.put(now, { from: 'sync' })).then(function () { emit('applied', { doc: d.name, scope: sc.scope }); }); }
      }).then(function () {
        if (d.dirtyAt && d.dirtyAt <= at) { d.dirtyAt = 0; metaPut('dirty|' + d.name, undefined); }
      });
    });
  }

  function syncScope(sc, K, B, res) {
    return pull(sc, B, res).then(function (p) {
      var mine = Object.keys(docs).map(function (n) { return docs[n]; }).filter(function (d) { return sc.scope === 'a' ? !d.space : d.space === sc.kind; });
      var chain = Promise.resolve();
      mine.forEach(function (d) { chain = chain.then(function () { return syncDoc(sc, d, B, p.remote, res, K); }); });
      return chain.then(function () {
        // pieces of docs this device has not opened yet: kept here, locked, for fetchDoc and a later doc()
        var upd = [];
        Object.keys(p.remote).forEach(function (n) {
          var key = sc.scope + '|' + n, b = B[key], r = p.remote[n];
          if (b && b.ver >= r.ver) return;
          var owned = mine.some(function (d) { return n.indexOf(d.name + '#') === 0; });
          if (owned) return;
          upd.push(r.gone ? { scope: sc.scope, name: n, id: r.id, ver: r.ver, gone: true, seen: false } : carries(n) ? { scope: sc.scope, name: n, id: r.id, ver: r.ver, data: r.data, at: r.at, seen: false } : { scope: sc.scope, name: n, id: r.id, ver: r.ver, stub: true, seen: false });
        });
        return saveBases(K, upd).then(function () { upd.forEach(function (u) { B[u.scope + '|' + u.name] = u; }); return metaPut(p.cursorKey, p.cursor); });
      });
    });
  }

  /* ---------- shared spaces ---------- */
  function spKeys(raw) {
    var x = X();
    return x.hkdfBase(raw).then(function (b) { return Promise.all([x.hkAes(b, 'gg-space-v1 data'), x.hkMac(b, 'gg-space-v1 names')]); }).then(function (r) { return { DK: r[0], NK: r[1] }; });
  }
  function ecdhKey(pub, priv) {
    var x = X();
    return subtle.importKey('jwk', { kty: 'EC', crv: 'P-256', x: pub.x, y: pub.y, ext: true }, { name: 'ECDH', namedCurve: 'P-256' }, false, []).then(function (pk) {
      return subtle.deriveBits({ name: 'ECDH', public: pk }, priv, 256);
    }).then(function (bits) { return x.hkdfBase(new Uint8Array(bits)); }).then(function (b) { return x.hkAes(b, 'gg-acct-v1 space'); });
  }
  // lock the space key to one account's public key (a fresh key pair each time)
  function wrapTo(pub, raw, sid, acct) {
    var x = X(), iv = x.rand(12);
    return subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']).then(function (eph) {
      return Promise.all([ecdhKey(pub, eph.privateKey), subtle.exportKey('jwk', eph.publicKey)]).then(function (r) {
        return subtle.encrypt({ name: 'AES-GCM', iv: iv, additionalData: enc.encode(x.AAD.space(sid, acct)) }, r[0], raw).then(function (ct) {
          return { epk: { kty: 'EC', crv: 'P-256', x: r[1].x, y: r[1].y }, iv: x.b64u(iv), ct: x.b64u(new Uint8Array(ct)) };
        });
      });
    });
  }
  function unwrap(w, sid, K) {
    var x = X();
    return ecdhKey(w.epk, K.priv).then(function (k) {
      return subtle.decrypt({ name: 'AES-GCM', iv: x.unb64u(w.iv), additionalData: enc.encode(x.AAD.space(sid, K.accountId)) }, k, x.unb64u(w.ct));
    }).then(function (b) { return new Uint8Array(b); });
  }
  var hhCache = null;
  function refreshSpaces(K) {
    var x = X();
    return x.api('GET', '/household').then(function (r) {
      var h = r.household; hhCache = h;
      var live = {}, jobs = [];
      (h ? h.spaces : []).forEach(function (sp) {
        live[sp.kind] = sp.id;
        if (!sp.key) return;
        var have = spaceCtx[sp.kind];
        var ready = have && have.id === sp.id ? Promise.resolve(have) : unwrap(sp.key, sp.id, K).then(function (raw) {
          return spKeys(raw).then(function (k) {
            var old = spaceCtx[sp.kind];
            spaceCtx[sp.kind] = { id: sp.id, kind: sp.kind, DK: k.DK, NK: k.NK, raw: raw };
            if (old && old.id !== sp.id) return dropBases(function (key) { return key.indexOf(old.id + '|') === 0; }).then(function () { return metaPut('cursor|' + old.id, undefined); }).then(function () { return spaceCtx[sp.kind]; });
            return spaceCtx[sp.kind];
          });
        }).catch(function () { return null; });
        // hand the key to each member who still needs it
        jobs.push(ready.then(function (ctx) {
          if (!ctx || !sp.missing || !sp.missing.length) return;
          return Promise.all(sp.missing.map(function (m) { return wrapTo(m.pub, ctx.raw, sp.id, m.account).then(function (w) { return { account: m.account, key: w }; }); }))
            .then(function (items) { return x.api('POST', '/spaces/' + sp.id + '/keys', { items: items }); });
        }));
      });
      Object.keys(spaceCtx).forEach(function (kind) {
        if (live[kind] !== spaceCtx[kind].id) { var gone = spaceCtx[kind].id; delete spaceCtx[kind]; jobs.push(dropBases(function (key) { return key.indexOf(gone + '|') === 0; })); }
      });
      return Promise.all(jobs).then(function () { emit('spaces', spaces()); });
    }, function (e) { if (e.why === 'offline') throw e; });
  }
  function spaces() { return Object.keys(spaceCtx).map(function (k) { return { kind: k, id: spaceCtx[k].id }; }); }
  // Share a doc kind with the Household: a new space key, locked to this account first; the others get theirs on sync.
  function makeSpace(kind, replace) {
    var x = X(), K = x.keys();
    if (!K) return Promise.reject(x.kind('signin'));
    var raw = x.rand(32), sid0 = x.b64u(x.rand(16)), sid = 's' + sid0;
    return wrapTo(K.pub, raw, sid, K.accountId).then(function (w) {
      return x.api('POST', '/spaces', { id: sid0, kind: kind, key: w, replace: replace || undefined });
    }).then(function (r) {
      return spKeys(raw).then(function (k) {
        var old = spaceCtx[kind];
        spaceCtx[kind] = { id: r.id, kind: kind, DK: k.DK, NK: k.NK, raw: raw };
        if (old && old.id !== r.id) return dropBases(function (key) { return key.indexOf(old.id + '|') === 0; });
      });
    }).then(function () { return sync(); }).then(function () { return { kind: kind, id: spaceCtx[kind].id }; });
  }
  function shareSpace(kind) { return makeSpace(kind).catch(function (e) { if (e.why === 'exists') return sync().then(function () { return { kind: kind, id: spaceCtx[kind] && spaceCtx[kind].id }; }); throw e; }); }
  function rekey(kind) { var c = spaceCtx[kind]; return c ? makeSpace(kind, c.id) : Promise.resolve(null); }
  function rekeyAll() { var ks = Object.keys(spaceCtx), ch = Promise.resolve(); ks.forEach(function (k) { ch = ch.then(function () { return rekey(k); }); }); return ch; }
  function leftHousehold() { var ids = Object.keys(spaceCtx).map(function (k) { return spaceCtx[k].id; }); spaceCtx = {}; return dropBases(function (key) { return ids.some(function (id) { return key.indexOf(id + '|') === 0; }); }); }

  /* ---------- sync ---------- */
  function sync() {
    if (running) { again = true; return running; }
    var x; try { x = X(); } catch (e) { return Promise.resolve({ state: 'out' }); }
    var K = x.keys();
    if (!K) return Promise.resolve({ state: 'out' });
    var res = { pushed: 0, pulled: 0, merged: 0, applied: 0, bad: 0, old: 0 };
    setS({ state: 'syncing', error: '' });
    var job = function () {
      return loadBases(K).then(function (B) {
        var needSpaces = Object.keys(docs).some(function (n) { return docs[n].space; }) || Object.keys(spaceCtx).length;
        return (needSpaces ? refreshSpaces(K) : Promise.resolve()).then(function () {
          var chain = syncScope(acctCtx(K), K, B, res);
          Object.keys(spaceCtx).forEach(function (kind) { if (Object.keys(docs).some(function (n) { return docs[n].space === kind; })) chain = chain.then(function () { return syncScope(spCtx(spaceCtx[kind]), K, B, res); }); });
          return chain;
        });
      });
    };
    var locked = navigator.locks && navigator.locks.request ? function (fn) { return navigator.locks.request('gg-sync', fn); } : function (fn) { return fn(); };
    running = locked(job).then(function () {
      retry = 0; setS({ state: 'idle', last: Date.now() });
      if (Date.now() - (S.told || 0) > 300000) { S.told = Date.now(); X().api('POST', '/devices/synced', {}).catch(function () {}); }
      return res;
    }, function (e) {
      if (e && e.why === 'offline') { setS({ state: 'waiting' }); later(); return Object.assign(res, { state: 'waiting' }); }
      if (e && e.why === 'signin') { setS({ state: 'idle' }); return Object.assign(res, { state: 'out' }); }
      setS({ state: 'idle', error: (e && e.why) || 'server' }); later();
      return Object.assign(res, { state: 'error', why: e && e.why });
    }).then(function (r) {
      running = null;
      if (again) { again = false; return sync(); }
      return r;
    });
    return running;
  }
  function later() { clearTimeout(retryT); var waits = [5000, 15000, 45000, 120000, 300000]; retryT = setTimeout(sync, waits[Math.min(retry++, waits.length - 1)]); }
  function changed(name) {
    var now = Date.now();
    (name ? [name] : Object.keys(docs)).forEach(function (n) { if (docs[n] && !docs[n].dirtyAt) { docs[n].dirtyAt = now; metaPut('dirty|' + n, now); } });
    emit('status', status());
    clearTimeout(timer); timer = setTimeout(sync, CFG.debounce);
  }

  function register(name, adapter, o, space) {
    o = o || {};
    if (!adapter || typeof adapter.get !== 'function' || typeof adapter.put !== 'function') throw new Error('GGSync: an adapter needs get() and put()');
    var d = docs[name] = { name: name, adapter: adapter, rules: o.rules || RULES[space || name.split(':')[0]] || [], opaque: !!o.opaque, space: space || null, dirtyAt: 0 };
    metaGet('dirty|' + name).then(function (t) { if (t && docs[name] === d && !d.dirtyAt) d.dirtyAt = +t; });
    return d;
  }
  // Remove a whole doc from the account: every piece leaves a marker, so other devices remove it too.
  function removeDoc(name) {
    var x = X(), K = x.keys(); if (!K) return Promise.reject(x.kind('signin'));
    var d = docs[name], sc = acctCtx(K);
    delete docs[name];
    return loadBases(K).then(function (B) {
      var ops = Object.keys(B).filter(function (k) { var r = B[k]; return r.scope === 'a' && r.name.indexOf(name + '#') === 0 && !r.gone; }).map(function (k) { return { name: B[k].name, del: true, ver: B[k].ver }; });
      return push(sc, ops, Date.now()).then(function (rs) {
        var upd = []; rs.forEach(function (r, i) { if (r && r.ok) upd.push({ scope: 'a', name: ops[i].name, id: ops[i].id, ver: r.ver, gone: true, seen: true }); });
        return saveBases(K, upd).then(function () { return metaPut('dirty|' + name, undefined); }).then(function () { return { removed: upd.length }; });
      });
    });
  }
  function docNames(B, scope) { var n = {}; Object.keys(B).forEach(function (k) { var r = B[k]; if (r.scope === scope && !r.gone) n[r.name.split('#')[0]] = 1; }); return Object.keys(n); }
  var lastNames = [];
  function remoteDocs() { var x = X(), K = x.keys(); if (!K) return Promise.resolve([]); return loadBases(K).then(function (B) { lastNames = docNames(B, 'a'); return lastNames.filter(function (n) { return !docs[n]; }); }); }
  function fetchDoc(name) {
    var x = X(), K = x.keys(); if (!K) return Promise.resolve(null);
    return loadBases(K).then(function (B) {
      var pieces = {}, any = false;
      Object.keys(B).forEach(function (k) { var r = B[k]; if (r.scope === 'a' && !r.gone && !r.stub && r.name.indexOf(name + '#') === 0) { pieces[r.name.slice(name.length + 1)] = r.data; any = true; } });
      return any ? assemble(pieces) : null;
    });
  }
  function carried() { return Object.keys(docs).filter(function (n) { return !docs[n].space; }).concat(lastNames.filter(function (n) { return !docs[n]; })); }
  function forget() {
    clearTimeout(timer); clearTimeout(retryT); spaceCtx = {}; hhCache = null; lastNames = [];
    Object.keys(docs).forEach(function (n) { docs[n].dirtyAt = 0; });
    return new Promise(function (res) { var r = indexedDB.deleteDatabase('gg-sync'); r.onsuccess = r.onerror = r.onblocked = function () { res(); }; }).then(function () { setS({ state: 'idle', last: 0 }); });
  }

  // Default split rules for known docs (paths are inside the doc)
  var RULES = { money: [{ path: 'logs', field: 'd' }], p: [{ path: 'money/logs', field: 'd' }] };

  // pull now and then while the page is open and signed in; and when the connection returns
  window.addEventListener('online', function () { sync(); });
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible' && Date.now() - S.last > 30000) sync(); });
  setInterval(function () { if (document.visibilityState === 'visible' && window.GGAccount && GGAccount.state() !== 'out' && Object.keys(docs).length) sync(); }, CFG.every);

  window.GGSync = {
    v: V, doc: function (name, adapter, o) { return register(name, adapter, o, null) && name; },
    space: function (kind, adapter, o) { if (['kitchen', 'money'].indexOf(kind) < 0) throw new Error('GGSync: kind'); return register(kind, adapter, o, kind) && kind; },
    drop: function (name) { delete docs[name]; }, changed: changed, sync: sync, status: status,
    on: function (fn) { subs.push(fn); return function () { subs = subs.filter(function (f) { return f !== fn; }); }; },
    config: function (o) { Object.keys(o || {}).forEach(function (k) { CFG[k] = o[k]; }); return CFG; },
    remoteDocs: remoteDocs, fetchDoc: fetchDoc, removeDoc: removeDoc, carried: carried, forget: forget,
    spaces: spaces, household: function () { return hhCache; }, shareSpace: shareSpace, rekey: rekey, rekeyAll: rekeyAll, leftHousehold: leftHousehold,
    RULES: RULES,
    _: { merge3: merge3, split: split, assemble: assemble, stable: stable, eq: eq }
  };
})();
