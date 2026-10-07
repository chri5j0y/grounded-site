/* =====================================================================
   GROUNDED PROFILES
   One private profile per person, shared by every page on
   growwithgrounded.com. Everything stays in this browser.

   How it is locked
   - Each profile's saved data (its "vault") is encrypted with its own
     random key. That key is locked with the person's passcode
     (PBKDF2, 250,000 rounds, then AES-GCM). We never see either.
   - Kids and Middle school: the key is also kept inside the vault of
     each grown-up who agreed for them, so a grown-up can open it with
     the grown-up's own passcode.
   - High school: only the teen's passcode opens it. A grown-up can
     clear it (erased, never read) if the teen forgets.
   - Name, picture, age, and a small "shared" record (progress and
     safety alerts, never answers) are not encrypted, so a family
     view can show them.

   For tools
     GGP.ready                     promise, resolves once a saved unlock is resumed
     GGP.active()                  the unlocked profile, or null
     GGP.openIds()                 ids you can read now (the active one, plus
                                   kids a grown-up can open)
     GGP.data(id, 'grove')         that tool's saved object (edit it, then save)
     GGP.save(id)                  lock and store it again
     GGP.shared(id) / setShared(id, obj)
     GGP.require({ reason, age })  promise: true once someone is unlocked
     GGP.on(fn)                    fn(type) on 'ready', 'change', 'data'
     GGP.lock(), GGP.openDialog(), GGP.createDialog(), GGP.manage(id)

   Willow helpers (Willow Build Session 2)
   - A grown-up can be a helper for another grown-up in Willow. The
     person's key is kept inside the helper's vault, the same way a kid's
     key is kept for a grown-up, so the helper opens it with their own
     passcode. The person's record lists its helpers; a helper who is
     removed loses the key the next time they unlock.
   - A helper never switches into being the person. Willow shows the
     helper only what the person chose to share.
     GGP.helpers(id)                  helper ids for a person
     GGP.helping()                    people the active helper can open
     GGP.addHelper(id, helperId, pass)  pass: the helper's own passcode
                                      (not needed when the helper is the
                                      one unlocked)
     GGP.removeHelper(id, helperId)
     GGP.createDialog({ forOther: true, keepMe: true })
                                      set up a profile for someone you
                                      love; you stay unlocked as their helper

   Sequoia, the tree for older adults (GWG BLD 733)
   - A grown-up's profile keeps the age "adult". Anyone who says they are
     55 or older may choose their tree: Oak, or Sequoia (built for 60 and
     up). The choice sits beside the name and picture (p.tree), changeable
     any time in Manage my profile, and sets where "My tree" goes.
   - Helpers work in Sequoia the Willow way, only when the person turns on
     Add a Helper in their own Sequoia settings.
     GGP.tree(id)                    'sequoia', 'birch', or 'oak' for a grown-up
     GGP.setTree(id, tree)           'sequoia', 'birch', or 'oak'

   Birch, the tree for young adults (GWG BLD 742)
   - The same pattern as Sequoia: the age stays "adult" and p.tree is
     'birch'. Anyone who says they are 26 or younger may choose Birch
     (built for 18 to 26) or Oak (built for 26 to 60), and switch any
     time. Saying yes opens the tree pick with Birch chosen.
   - Helpers work in Birch the Sequoia way, only when the person turns on
     Add a Helper in their own Birch settings (birch.helpersOn).

   Health and Ability (GWG BLD 756, shared/gg-life.js)
   - The choice is kept inside the vault, at the top beside email
     (vault.life), shared by every tree; never in the open list or shared.
     Manage my profile has a Health and Ability row (Maple and Aspen: Their
     Health and Ability, set by a grown-up with the child). A new profile made
     with carry (Start My Birch, Start My Oak) asks "Bring your Health and
     Ability choices?" and copies it only on a yes. Move My Tree keeps it,
     since it is the same profile. Clear My Choices erases it.
   - Learn watched marks are kept in the vault too (vault.learn, gg-learn.js).

   Pine, the tree for high schoolers (GWG BLD 739)
   - A High school profile (age "pine") tends its tree in Pine. The
     privacy model above stays the same: only the teen's passcode opens
     answers and journal, and a grown-up sees only the shared record.
   ===================================================================== */
(function () {
  if (window.GGP) return;

  var TERMS_V = '2026-10-01', PRIVACY_V = '2026-10-01';
  var LIST = 'gg-profiles-v1', BOX = 'gg-p:', PING_LOCK = 'gg-lock-ping', PING_OPEN = 'gg-open-ping';
  var HOME = /(^|\.)growwithgrounded\.com$|^localhost$|^127\.0\.0\.1$/.test(location.hostname) ? '' : 'https://growwithgrounded.com';
  var AGES = [
    { id: 'adult', name: 'Adult', who: 'Grown-ups', tool: 'Oak', href: '/oak/' },
    { id: 'pine', name: 'High school', who: 'Grades 9 to 12', tool: 'Pine', href: '/pine/' },   // Pine, built for grades 9 to 12 (GWG BLD 739)
    { id: 'aspen', name: 'Middle school', who: 'Grades 6 to 8', tool: 'Aspen', href: '/aspen/' },
    { id: 'maple', name: 'Kids', who: 'Kindergarten to grade 5', tool: 'Maple', href: '/maple/' }
  ];
  var AGE = {}; AGES.forEach(function (a) { AGE[a.id] = a; });
  // A grown-up's own tree (Sequoia, GWG BLD 733). The age stays "adult" either way.
  // Birch (GWG BLD 742) joins the same way: p.tree 'birch', the age still "adult".
  var TREE = { oak: { id: 'oak', tool: 'Oak', href: '/oak/', who: 'Built for adults, 26 to 60' }, birch: { id: 'birch', tool: 'Birch', href: '/birch/', who: 'Built for young adults, 18 to 26' }, sequoia: { id: 'sequoia', tool: 'Sequoia', href: '/sequoia/', who: 'Built for older adults, 60 and up' } };
  // Which trees each age question offers: 26 or younger (Birch first), 55 or older.
  var BAND = { young: ['birch', 'oak'], older: ['oak', 'sequoia'] };
  function treeOf(p) { return p && p.age === 'adult' && (p.tree === 'sequoia' || p.tree === 'birch') ? p.tree : 'oak'; }
  function toolOf(p) { var a = AGE[(p && p.age)] || AGE.adult, t = treeOf(p); if (p && p.age === 'adult' && t !== 'oak') return { id: a.id, name: a.name, who: a.who, tool: TREE[t].tool, href: TREE[t].href }; return a; }
  var PICS = ['fox', 'owl', 'bunny', 'turtle', 'bee', 'frog', 'ladybug', 'sunflower', 'butterfly'];
  var isMinor = function (age) { return age && age !== 'adult'; };
  var grownOpens = function (age) { return age === 'maple' || age === 'aspen'; };

  /* ---------- small helpers ---------- */
  var enc = new TextEncoder(), dec = new TextDecoder();
  function b64(u8) { var s = ''; for (var i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]); return btoa(s); }
  function unb64(s) { return Uint8Array.from(atob(s), function (c) { return c.charCodeAt(0); }); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function todayStr() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function slug(s) { return String(s || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }

  function readList() { try { var j = JSON.parse(localStorage.getItem(LIST)); return (j && j.list) || []; } catch (e) { return []; } }
  function writeList(l) { localStorage.setItem(LIST, JSON.stringify({ v: 1, list: l })); }
  function getP(id) { return readList().filter(function (p) { return p.id === id; })[0] || null; }
  function putP(p) { var l = readList(), i = -1; l.forEach(function (x, j) { if (x.id === p.id) i = j; }); if (i >= 0) l[i] = p; else l.push(p); writeList(l); }
  function dropP(id) { writeList(readList().filter(function (p) { return p.id !== id; })); localStorage.removeItem(BOX + id); }

  /* ---------- crypto ---------- */
  var subtle = window.crypto && crypto.subtle;
  function passKey(pass, salt) {
    return subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveKey']).then(function (base) {
      return subtle.deriveKey({ name: 'PBKDF2', salt: salt, iterations: 250000, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    });
  }
  function rawKey(raw) { return subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']); }
  function seal(key, bytes) {
    var iv = crypto.getRandomValues(new Uint8Array(12));
    return subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, bytes).then(function (ct) { return { iv: b64(iv), ct: b64(new Uint8Array(ct)) }; });
  }
  function unseal(key, box) { return subtle.decrypt({ name: 'AES-GCM', iv: unb64(box.iv) }, key, unb64(box.ct)).then(function (pt) { return new Uint8Array(pt); }); }
  // passcode opens the profile's own key
  function rawFromPass(p, pass) {
    return passKey(pass, unb64(p.salt)).then(function (k) { return unseal(k, p.wrap); }).catch(function () { throw new Error(p.code === 'pics' ? 'Those pictures did not match. Try again.' : 'That passcode did not work. Try again.'); });
  }
  function wrapRaw(pass, raw) {
    var salt = crypto.getRandomValues(new Uint8Array(16));
    return passKey(pass, salt).then(function (k) { return seal(k, raw); }).then(function (w) { return { salt: b64(salt), wrap: w }; });
  }
  function readVault(id, raw) {
    var box = null; try { box = JSON.parse(localStorage.getItem(BOX + id)); } catch (e) {}
    if (!box) return Promise.resolve(blankVault());
    return rawKey(raw).then(function (k) { return unseal(k, box); }).then(function (b) { return renameParts(Object.assign(blankVault(), JSON.parse(dec.decode(b)))); });
  }
  // The six parts rename (Rebrand Session 4): each tree app's record moves to the new part names.
  // gg-app.js holds the rule (GGParts). The Grove's record is never touched, since its strands are not parts.
  function renameParts(v) { var P = window.GGParts; if (P && v && typeof v === 'object') ['maple', 'aspen', 'oak'].forEach(function (t) { if (v[t] && typeof v[t] === 'object') P.fix(v[t]); }); return v; }
  function writeVault(id, raw, data) {
    return rawKey(raw).then(function (k) { return seal(k, enc.encode(JSON.stringify(data))); }).then(function (box) { localStorage.setItem(BOX + id, JSON.stringify(box)); });
  }
  function blankVault() { return { v: 1, keys: {}, email: '', stories: { saved: {}, read: {} } }; }

  /* ---------- session (survives page loads for 1, 8, or 24 hours) ---------- */
  function idb() { return new Promise(function (res, rej) { var r = indexedDB.open('gg-session', 1); r.onupgradeneeded = function () { r.result.createObjectStore('s'); }; r.onsuccess = function () { res(r.result); }; r.onerror = function () { rej(r.error); }; }); }
  function sessPut(v) { return idb().then(function (db) { return new Promise(function (res) { var t = db.transaction('s', 'readwrite'); t.objectStore('s').put(v, 'cur'); t.oncomplete = res; t.onerror = res; }); }).catch(function () {}); }
  function sessGet() { return idb().then(function (db) { return new Promise(function (res) { var q = db.transaction('s', 'readonly').objectStore('s').get('cur'); q.onsuccess = function () { res(q.result || null); }; q.onerror = function () { res(null); }; }); }).catch(function () { return null; }); }
  function sessClear() { return idb().then(function (db) { return new Promise(function (res) { var t = db.transaction('s', 'readwrite'); t.objectStore('s').delete('cur'); t.oncomplete = res; t.onerror = res; }); }).catch(function () {}); }

  /* ---------- state ---------- */
  var cur = null;   // { id, until }
  var open = {};    // id -> { raw, data }
  var subs = [];
  function emit(type) { subs.slice().forEach(function (fn) { try { fn(type); } catch (e) { console.error(e); } }); paintAll(); }

  function openWithRaw(id, raw, until, silent) {
    return readVault(id, raw).then(function (data) {
      open = {}; open[id] = { raw: raw, data: data };
      cur = { id: id, until: until };
      var p = getP(id), jobs = [];
      var dropped = false;
      if (p && p.age === 'adult') Object.keys(data.keys || {}).forEach(function (kid) {
        var kp = getP(kid);
        if (!kp) { delete data.keys[kid]; dropped = true; return; }
        // Willow: a grown-up's key stays only while this helper is still on their list
        if (kp.age === 'adult' && (kp.helpers || []).indexOf(id) < 0) { delete data.keys[kid]; dropped = true; return; }
        var kr = unb64(data.keys[kid]);
        jobs.push(readVault(kid, kr).then(function (kd) { open[kid] = { raw: kr, data: kd }; }).catch(function () {}));
      });
      return Promise.all(jobs).then(function () {
        if (dropped) return writeVault(id, raw, data);
      }).then(function () {
        return sessPut({ id: id, raw: raw, until: until });
      }).then(function () {
        if (!silent) { try { localStorage.setItem(PING_OPEN, String(Date.now())); } catch (e) {} }
        emit('change');
      });
    });
  }
  function lock(silent) {
    open = {}; cur = null;
    return sessClear().then(function () {
      if (!silent) { try { localStorage.setItem(PING_LOCK, String(Date.now())); } catch (e) {} }
      emit('change');
    });
  }
  function resume() {
    return sessGet().then(function (s) {
      if (!s || !(s.until > Date.now()) || !getP(s.id)) { if (s) return sessClear(); return; }
      return openWithRaw(s.id, s.raw, s.until, true).catch(function () { return sessClear(); });
    });
  }
  setInterval(function () { if (cur && Date.now() > cur.until) lock(); }, 15000);
  window.addEventListener('storage', function (e) {
    if (e.key === PING_LOCK) { if (cur) lock(true); }
    else if (e.key === PING_OPEN) { resume(); }
    else if (e.key === LIST) { paintAll(); }
    else if (e.key && e.key.indexOf(BOX) === 0) {
      var id = e.key.slice(BOX.length);
      if (open[id]) readVault(id, open[id].raw).then(function (d) { open[id].data = d; emit('data'); }).catch(function () {});
    }
  });

  function save(id) {
    var ids = id ? [id] : Object.keys(open);
    return Promise.all(ids.map(function (i) { return open[i] ? writeVault(i, open[i].raw, open[i].data) : null; }));
  }

  /* ---------- creating a profile ---------- */
  // o: { name, avatar, age, pass, code, hours, grownId, grownPass }
  function createProfile(o) {
    var raw = crypto.getRandomValues(new Uint8Array(32)), id = uid(), grown = null;
    var grownStep = Promise.resolve();
    // Willow: set up for someone you love, with the unlocked grown-up as their helper
    var helperOf = (!isMinor(o.age) && o.helperOf && cur && cur.id === o.helperOf && open[o.helperOf]) ? o.helperOf : null;
    if (isMinor(o.age)) {
      if (!o.grownId) return Promise.reject(new Error('A grown-up needs to agree first.'));
      grown = getP(o.grownId);
      if (open[o.grownId] && cur && cur.id === o.grownId) grownStep = Promise.resolve(open[o.grownId]);
      else grownStep = rawFromPass(grown, o.grownPass).then(function (gr) { return readVault(grown.id, gr).then(function (gd) { return { raw: gr, data: gd }; }); });
    }
    return grownStep.then(function (g) {
      return wrapRaw(o.pass, raw).then(function (w) {
        var p = {
          id: id, name: o.name, avatar: o.avatar || '', age: o.age, code: o.code || 'text',
          salt: w.salt, wrap: w.wrap, created: todayStr(),
          agreed: { date: todayStr(), terms: TERMS_V, privacy: PRIVACY_V, by: grown ? 'grownup' : 'self', grownup: grown ? grown.name : '' },
          grown: grown ? [grown.id] : [], shared: {}, helpers: helperOf ? [helperOf] : []
        };
        if (o.age === 'adult' && (o.tree === 'sequoia' || o.tree === 'birch')) p.tree = o.tree;
        putP(p);
        var vault = blankVault();
        if (o.carry) Object.keys(o.carry).forEach(function (k) { vault[k] = o.carry[k]; });
        return writeVault(id, raw, vault).then(function () {
          if (g && grownOpens(o.age)) { g.data.keys = g.data.keys || {}; g.data.keys[id] = b64(raw); return writeVault(grown.id, g.raw, g.data); }
          if (helperOf) { var h = open[helperOf]; h.data.keys = h.data.keys || {}; h.data.keys[id] = b64(raw); return writeVault(helperOf, h.raw, h.data); }
        }).then(function () {
          if (helperOf) { open[id] = { raw: raw, data: vault }; emit('change'); return id; }
          var until = Date.now() + (o.hours || 8) * 3600000;
          // a grown-up who was already unlocked stays unlocked and can open the child
          if (grown && cur && cur.id === grown.id && grownOpens(o.age)) { open[id] = { raw: raw, data: vault }; emit('change'); return id; }
          return openWithRaw(id, raw, until).then(function () { return id; });
        });
      });
    });
  }

  /* ---------- Oak profiles made before Grounded profiles ---------- */
  function legacyOak() { try { return JSON.parse(localStorage.getItem('oak:profiles')) || []; } catch (e) { return []; } }
  function openLegacyOak(lp, pass) {
    return passKey(pass, unb64(lp.salt)).then(function (k) {
      var box = JSON.parse(localStorage.getItem('oak:p:' + lp.id) || 'null');
      if (!box) return { avatar: '', history: [] };
      return unseal(k, box).then(function (b) { var o = JSON.parse(dec.decode(b)); return window.GGParts ? window.GGParts.fix(o) : o; });
    }).catch(function () { throw new Error('That passcode did not work. Try again.'); });
  }
  function retireLegacyOak(lp) {
    localStorage.removeItem('oak:p:' + lp.id);
    var l = legacyOak().filter(function (x) { return x.id !== lp.id; });
    if (l.length) localStorage.setItem('oak:profiles', JSON.stringify(l)); else localStorage.removeItem('oak:profiles');
  }

  /* =====================================================================
     LOOK AND FEEL
     ===================================================================== */
  var CSS = '' +
    '.ggp-root{--ggp-bg:#FAF7F2;--ggp-card:#FFFFFF;--ggp-ink:#2C1810;--ggp-soft:#6B5A48;--ggp-line:#E6D9C2;--ggp-gold:#8B5E1A;--ggp-gold-soft:#F4EAD6;--ggp-on-gold:#FFFFFF;--ggp-warn:#9B3B2B;}' +
    '.ggp-root,.ggp-root *{box-sizing:border-box;}' +
    '.ggp-btn{flex:none;display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:50%;border:1px solid rgba(128,112,90,.45);background:transparent;color:inherit;cursor:pointer;margin:0 2px 0 6px;padding:0;position:relative;overflow:visible;}' +
    '.ggp-btn:hover{background:rgba(160,120,60,.14);}' +
    '@media (max-width:600px){.ggp-btn{width:36px;height:36px;margin:0 2px;}.gg-theme{width:36px !important;height:36px !important;margin:0 2px !important;}.topbar-inner:has(.brand-sep) .brand-word,.topbar-in:has(.brand-sep) .brand-word{display:none !important;}}' +
    '@media (max-width:350px){.topbar-inner .brand-word{display:none !important;}}' +
    '@media (max-width:380px){.topbar-inner:has(.brand-sep),.topbar-in:has(.brand-sep){gap:4px !important;padding-left:8px !important;padding-right:8px !important;}.topbar .size-btn{min-width:38px !important;}.ggp-btn,.gg-theme{margin:0 1px !important;}}' +
    '.ggp-btn .gga,.ggp-btn img,.ggp-btn svg.gga-svg{border-radius:50%;}' +
    '.ggp-btn .ggp-dot{position:absolute;right:-1px;bottom:-1px;width:12px;height:12px;border-radius:50%;background:#4E8A4A;border:2px solid #FAF7F2;}' +
    '.ggp-pop{position:absolute;z-index:9998;width:min(340px,calc(100vw - 20px));background:var(--ggp-card);color:var(--ggp-ink);border:1px solid var(--ggp-line);border-radius:16px;box-shadow:0 18px 40px rgba(0,0,0,.18);padding:14px;font:15px/1.4 Barlow,system-ui,sans-serif;text-align:left;}' +
    '.ggp-pop[hidden]{display:none;}' +
    '.ggp-who{display:flex;gap:12px;align-items:center;padding:4px 4px 12px;border-bottom:1px solid var(--ggp-line);margin-bottom:8px;}' +
    '.ggp-who b{display:block;font-size:17px;font-weight:600;}' +
    '.ggp-who small,.ggp-small{display:block;color:var(--ggp-soft);font-size:13px;line-height:1.35;}' +
    '.ggp-item{display:flex;width:100%;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;border:0;background:none;color:var(--ggp-ink) !important;font:15px Barlow,system-ui,sans-serif !important;text-align:left;cursor:pointer;text-decoration:none !important;text-transform:none !important;letter-spacing:0 !important;}' +
    '.ggp-item:hover,.ggp-item:focus-visible{background:var(--ggp-gold-soft);}' +
    '.ggp-item .gga{flex:none;}' +
    '.ggp-h{font:700 12px "Barlow Condensed",Barlow,sans-serif;letter-spacing:1.4px;text-transform:uppercase;color:var(--ggp-gold);margin:10px 10px 4px;}' +
    '.ggp-back{position:fixed;inset:0;z-index:9990;background:rgba(20,16,12,.55);display:flex;align-items:flex-start;justify-content:center;padding:4vh 14px;overflow-y:auto;}' +
    '.ggp-dlg{width:min(520px,100%);background:var(--ggp-bg);color:var(--ggp-ink);border-radius:20px;box-shadow:0 24px 60px rgba(0,0,0,.3);padding:24px 22px 20px;font:16px/1.5 Barlow,system-ui,sans-serif;text-align:left;margin:auto 0;}' +
    '.ggp-dlg h2{font:600 28px/1.15 "Cormorant Garamond",Georgia,serif;margin:0 0 6px;color:var(--ggp-ink);}' +
    '.ggp-dlg p{margin:0 0 12px;}' +
    '.ggp-dlg label.ggp-l{display:block;font-weight:600;font-size:14px;margin:14px 0 5px;}' +
    '.ggp-dlg input[type=text],.ggp-dlg input[type=email],.ggp-dlg input[type=password],.ggp-dlg select{width:100%;font:16px Barlow,system-ui,sans-serif;padding:11px 12px;border:1px solid var(--ggp-line);border-radius:10px;background:var(--ggp-card);color:var(--ggp-ink);}' +
    // Passcode and name boxes keep the dialog's own ink and paper, even with a browser's saved-passcode fill (GWG BLD 743).
    '.ggp-root{color-scheme:light;}.ggp-dlg input[type=text],.ggp-dlg input[type=email],.ggp-dlg input[type=password]{-webkit-text-fill-color:var(--ggp-ink);caret-color:var(--ggp-ink);opacity:1;}' +
    '.ggp-dlg input:-webkit-autofill{-webkit-box-shadow:0 0 0 40px var(--ggp-card) inset;box-shadow:0 0 0 40px var(--ggp-card) inset;}' +
    '.ggp-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;margin-top:18px;}' +
    '.ggp-b{font:600 15px Barlow,system-ui,sans-serif;border-radius:999px;padding:11px 20px;cursor:pointer;border:1px solid var(--ggp-gold);background:transparent;color:var(--ggp-gold);text-transform:none;letter-spacing:0;}' +
    '.ggp-b.ggp-go{background:var(--ggp-gold);color:var(--ggp-on-gold);}' +
    '.ggp-b[disabled]{opacity:.55;cursor:default;}' +
    '.ggp-link{background:none;border:0;padding:0;color:var(--ggp-gold);font:inherit;font-size:14px;text-decoration:underline;cursor:pointer;}' +
    '.ggp-msg{color:var(--ggp-warn);font-size:14px;min-height:1.2em;margin-top:10px !important;}' +
    '.ggp-note{background:var(--ggp-gold-soft);border-radius:12px;padding:12px 14px;font-size:14.5px;margin:12px 0 !important;}' +
    '.ggp-ages{display:grid;grid-template-columns:1fr 1fr;gap:8px;}' +
    '.ggp-age{border:1.5px solid var(--ggp-line);background:var(--ggp-card);color:var(--ggp-ink);border-radius:12px;padding:10px 12px;text-align:left;cursor:pointer;font:15px Barlow,system-ui,sans-serif;}' +
    '.ggp-age b{display:block;font-weight:600;}.ggp-age span{font-size:13px;color:var(--ggp-soft);}' +
    '.ggp-age[aria-pressed=true]{border-color:var(--ggp-gold);background:var(--ggp-gold-soft);}' +
    '.ggp-people{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;margin-top:8px;}' +
    '.ggp-person{display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 8px;border:1.5px solid var(--ggp-line);border-radius:14px;background:var(--ggp-card);color:var(--ggp-ink);cursor:pointer;font:15px Barlow,system-ui,sans-serif;text-align:center;}' +
    '.ggp-person:hover,.ggp-person[aria-pressed=true]{border-color:var(--ggp-gold);}' +
    '.ggp-person b{font-weight:600;}.ggp-person span{font-size:12.5px;color:var(--ggp-soft);}' +
    '.ggp-pics{display:grid;grid-template-columns:repeat(3,72px);gap:10px;justify-content:center;margin:8px 0;}' +
    '.ggp-pic{width:72px;height:72px;border-radius:50%;border:2px solid transparent;background:none;padding:2px;cursor:pointer;}' +
    '.ggp-pic:hover,.ggp-pic:focus-visible{border-color:var(--ggp-gold);}' +
    '.ggp-slots{display:flex;gap:10px;justify-content:center;margin:6px 0 2px;}' +
    '.ggp-slot{width:48px;height:48px;border-radius:50%;border:2px dashed var(--ggp-line);display:grid;place-items:center;}' +
    '.ggp-check{display:flex;gap:10px;align-items:flex-start;margin-top:14px;font-size:15px;}' +
    '.ggp-check input{margin-top:4px;width:18px;height:18px;flex:none;accent-color:#8B5E1A;}' +
    '.ggp-dlg a{color:var(--ggp-gold);}' +
    '.ggp-picrow{display:flex;gap:14px;align-items:center;margin-top:10px;}' +
    '.ggp-sep{border:0;border-top:1px solid var(--ggp-line);margin:18px 0 6px;}' +
    '.ggp-toast{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:10001;background:#2C1810;color:#FAF7F2;padding:11px 18px;border-radius:999px;font:15px Barlow,system-ui,sans-serif;box-shadow:0 10px 26px rgba(0,0,0,.25);max-width:calc(100vw - 30px);text-align:center;}' +
    /* page features */
    '.ggp-story-save{display:inline-flex;align-items:center;gap:6px;font:600 14px Barlow,system-ui,sans-serif;background:none;border:1px solid currentColor;border-radius:999px;padding:6px 12px;color:#8B5E1A;cursor:pointer;margin-top:10px;}' +
    '.ggp-story-save[aria-pressed=true]{background:#8B5E1A;color:#fff;border-color:#8B5E1A;}' +
    '.ggp-read-tag{display:inline-block;font:600 12px Barlow,system-ui,sans-serif;color:#4E6A3B;background:#E3EADB;border-radius:999px;padding:2px 10px;margin-left:8px;vertical-align:middle;}' +
    '.ggp-welcome{max-width:1100px;margin:22px auto 0;padding:0 20px;}' +
    '.ggp-welcome > div{display:flex;flex-wrap:wrap;gap:14px 20px;align-items:center;background:#FFFFFF;border:1px solid #E6D9C2;border-radius:18px;padding:16px 20px;box-shadow:0 6px 18px rgba(44,24,16,.06);}' +
    '.ggp-welcome h2{font:600 26px/1.1 "Cormorant Garamond",Georgia,serif;margin:0;color:#2C1810;}' +
    '.ggp-welcome .ggp-chips{display:flex;flex-wrap:wrap;gap:8px;flex:1;}' +
    '.ggp-welcome a.ggp-chip{font:15px Barlow,system-ui,sans-serif;color:#2C1810;background:#F4EAD6;border-radius:999px;padding:7px 14px;text-decoration:none;}' +
    '.ggp-welcome a.ggp-chip:hover{background:#EADBBE;}';
  var DARK = '' +
    '.ggp-root{--ggp-bg:#1E1A15;--ggp-card:#28221B;--ggp-ink:#F3EDE3;--ggp-soft:#C2B6A4;--ggp-line:#3E352B;--ggp-gold:#D9A847;--ggp-gold-soft:#342A1D;--ggp-on-gold:#1E1A15;--ggp-warn:#F09A86;}' +
    '.ggp-root{color-scheme:dark;}' +
    '.ggp-btn .ggp-dot{border-color:#1E1A15;}' +
    '.ggp-welcome > div{background:#28221B;border-color:#3E352B;}' +
    '.ggp-welcome h2{color:#F3EDE3;}' +
    '.ggp-welcome a.ggp-chip{color:#F3EDE3;background:#342A1D;}' +
    '.ggp-story-save{color:#D9A847;}' +
    '.ggp-story-save[aria-pressed=true]{background:#D9A847;color:#1E1A15;border-color:#D9A847;}';
  function themed(rules) {
    var parts = rules.split('}').filter(function (r) { return r.indexOf('{') > -1; });
    function scope(prefix) { return parts.map(function (r) { var i = r.indexOf('{'); return r.slice(0, i).split(',').map(function (x) { return prefix + ' ' + x.trim(); }).join(',') + r.slice(i) + '}'; }).join(''); }
    return '@media (prefers-color-scheme: dark){' + scope(':root:not([data-theme="light"])') + '}' + scope(':root[data-theme="dark"]');
  }
  function addCSS() { if (document.getElementById('ggp-css')) return; var s = document.createElement('style'); s.id = 'ggp-css'; s.textContent = CSS + themed(DARK); document.head.appendChild(s); }

  function av(value, name, size) {
    if (window.GGAv) return GGAv.html(value || '', name || '', size || 40);
    var i = String(name || '?').trim().charAt(0).toUpperCase() || '?';
    return '<span style="display:inline-grid;place-items:center;width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:#F4EAD6;color:#8B5E1A;font:600 ' + Math.round(size * .45) + 'px Barlow,sans-serif">' + esc(i) + '</span>';
  }
  var PERSON_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20.5c0-4.1 3.4-7 7.5-7s7.5 2.9 7.5 7"/></svg>';
  function loadAvatars(cb) {
    if (window.GGAv) { cb && cb(); return; }
    var s = document.querySelector('script[data-ggav]');
    if (!s) { s = document.createElement('script'); s.src = HOME + '/shared/gg-avatars.js'; s.setAttribute('data-ggav', '1'); document.head.appendChild(s); }
    s.addEventListener('load', function () { paintAll(); cb && cb(); });
  }
  function toast(msg) {
    var t = document.createElement('div'); t.className = 'ggp-toast'; t.setAttribute('role', 'status'); t.textContent = msg;
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 3400);
  }
  function ageName(a) { return (AGE[a] || AGE.adult).name; }
  function untilText(u) { return new Date(u).toLocaleString(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit' }); }
  var HOURS = function (id) { return '<label class="ggp-l" for="' + id + '">Stay unlocked on this device for</label><select id="' + id + '"><option value="1">1 hour</option><option value="8" selected>8 hours</option><option value="24">24 hours</option></select>'; };
  var TERMS_LINKS = '<a href="' + HOME + '/terms.html" target="_blank" rel="noopener">Terms of Use</a> and <a href="' + HOME + '/privacy.html" target="_blank" rel="noopener">Privacy Policy</a>';

  /* ---------- dialog shell ---------- */
  var dlgOpen = null;
  function dialog(render, onClose) {
    closeDialog(true);
    addCSS();
    var back = document.createElement('div'); back.className = 'ggp-back ggp-root';
    back.innerHTML = '<div class="ggp-dlg" role="dialog" aria-modal="true" aria-labelledby="ggp-title"></div>';
    document.body.appendChild(back);
    var box = back.firstChild, lastFocus = document.activeElement;
    var d = {
      el: box,
      show: function (html) { box.innerHTML = html + '<p class="ggp-msg" role="alert" id="ggp-msg"></p>'; var f = box.querySelector('[autofocus],input,select,button'); if (f) setTimeout(function () { f.focus(); }, 30); },
      msg: function (m) { var e = box.querySelector('#ggp-msg'); if (e) e.textContent = m || ''; },
      busy: function (on) { box.querySelectorAll('.ggp-go').forEach(function (b) { b.disabled = !!on; }); if (on) d.msg('One moment...'); },
      close: function (result) { back.remove(); dlgOpen = null; document.removeEventListener('keydown', key); if (lastFocus && lastFocus.focus) lastFocus.focus(); if (onClose) onClose(result); }
    };
    function key(e) { if (e.key === 'Escape' && !document.querySelector('.gga-back')) d.close(false); }
    document.addEventListener('keydown', key);
    back.addEventListener('click', function (e) { if (e.target === back) d.close(false); });
    dlgOpen = d; render(d);
    return d;
  }
  function closeDialog(silent) { if (dlgOpen) { var d = dlgOpen; dlgOpen = null; d.close(silent ? undefined : false); } }
  function $(d, sel) { return d.el.querySelector(sel); }
  function run(d, fn) { d.busy(true); return Promise.resolve().then(fn).then(function (r) { d.busy(false); d.msg(''); return r; }, function (err) { d.busy(false); d.msg(err && err.message ? err.message : 'Something went wrong.'); throw err; }); }

  /* ---------- picture code (Kids) ---------- */
  function picPad(d, holder, onDone) {
    var seq = [];
    function paint() {
      holder.innerHTML = '<div class="ggp-slots" aria-live="polite">' + [0, 1, 2].map(function (i) { return '<span class="ggp-slot">' + (seq[i] ? av('av:' + seq[i], seq[i], 40) : '') + '</span>'; }).join('') + '</div>' +
        '<div class="ggp-pics">' + PICS.map(function (p) { return '<button type="button" class="ggp-pic" data-pic="' + p + '" aria-label="' + p + '">' + av('av:' + p, p, 64) + '</button>'; }).join('') + '</div>' +
        '<p style="text-align:center"><button type="button" class="ggp-link" data-clear>Start over</button></p>';
      holder.querySelectorAll('[data-pic]').forEach(function (b) { b.onclick = function () { if (seq.length < 3) { seq.push(b.dataset.pic); paint(); if (seq.length === 3) onDone('pics:' + seq.join('-')); } }; });
      holder.querySelector('[data-clear]').onclick = function () { seq = []; paint(); onDone(null); };
    }
    paint();
    return { reset: function () { seq = []; paint(); } };
  }

  /* ---------- grown-up agreement block ---------- */
  function adults() { return readList().filter(function (p) { return p.age === 'adult'; }); }
  function grownBlock(kidName, age) {
    var act = cur && getP(cur.id);
    var who = (act && act.age === 'adult')
      ? '<input type="hidden" id="ggp-gid" value="' + act.id + '"><p class="ggp-small">Agreeing as ' + esc(act.name) + '.</p>'
      : (adults().length
        ? '<label class="ggp-l" for="ggp-gid">Grown-up</label><select id="ggp-gid">' + adults().map(function (a) { return '<option value="' + a.id + '">' + esc(a.name) + '</option>'; }).join('') + '</select><label class="ggp-l" for="ggp-gpass">Grown-up\'s passcode</label><input type="password" id="ggp-gpass" autocomplete="current-password">'
        : '');
    var what = age === 'pine'
      ? '<div class="ggp-note"><b>For both of you:</b> the grown-up will see progress, like which parts are growing and days tended, and will be alerted if a safety answer needs attention. The grown-up will never see answers or journal entries. Those are locked with the teen\'s own passcode.</div>'
      : '<div class="ggp-note">Grown-ups who agree can open ' + esc(kidName || 'this') + ' profile with their own passcode, so no child is ever alone with something hard.</div>';
    return '<hr class="ggp-sep"><p><b>A grown-up needs to agree.</b></p>' + what + who +
      '<label class="ggp-check"><input type="checkbox" id="ggp-agree"> <span>I am ' + esc(kidName || 'this child') + '\'s parent, guardian, or another responsible grown-up. I have read and agree to the ' + TERMS_LINKS + ' on their behalf.</span></label>';
  }
  function readGrown(d) {
    var gid = $(d, '#ggp-gid'), gp = $(d, '#ggp-gpass');
    if (!gid) throw new Error('A grown-up needs their own profile first.');
    if (!$(d, '#ggp-agree').checked) throw new Error('The grown-up needs to check the box to agree.');
    if (gp && !gp.value) throw new Error('Type the grown-up\'s passcode.');
    return { grownId: gid.value, grownPass: gp ? gp.value : null };
  }

  /* =====================================================================
     CREATE
     ===================================================================== */
  /* Sequoia (GWG BLD 733): anyone who says they are 55 or older may choose their tree.
     Birch (GWG BLD 742): anyone who says they are 26 or younger may choose Birch or Oak; a yes picks Birch. */
  function treeBtns(st) {
    var list = BAND[st.band] || [];
    return list.map(function (t) { return '<button type="button" class="ggp-age" data-tree="' + t + '" aria-pressed="' + (st.tree === t) + '"><b>' + TREE[t].tool + '</b><span>' + TREE[t].who + '</span></button>'; }).join('');
  }
  function treeBlock(st, other) {
    return '<div id="ggp-treebox"' + (st.age === 'adult' ? '' : ' hidden') + '>' +
      '<label class="ggp-check"><input type="checkbox" id="ggp-young"' + (st.band === 'young' ? ' checked' : '') + '> <span>' + (other ? 'They are' : 'I am') + ' 26 or younger</span></label>' +
      '<label class="ggp-check"><input type="checkbox" id="ggp-older"' + (st.band === 'older' ? ' checked' : '') + '> <span>' + (other ? 'They are' : 'I am') + ' 55 or older</span></label>' +
      '<div id="ggp-treepick"' + (st.band ? '' : ' hidden') + '><label class="ggp-l">' + (other ? 'Their tree' : 'My tree') + '</label><div class="ggp-ages" id="ggp-trees">' + treeBtns(st) + '</div>' +
      '<span class="ggp-small">Change it any time in Manage My Profile.</span></div></div>';
  }
  function treeWire(d, st) {
    var yk = $(d, '#ggp-young'), ok = $(d, '#ggp-older'); if (!yk || !ok) return;
    function paint() {
      $(d, '#ggp-treepick').hidden = !st.band;
      $(d, '#ggp-trees').innerHTML = treeBtns(st);
      d.el.querySelectorAll('[data-tree]').forEach(function (b) { b.onclick = function () { st.tree = b.dataset.tree; d.el.querySelectorAll('[data-tree]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); }; });
    }
    // The two questions never both apply, so checking one clears the other.
    yk.onchange = function () { if (yk.checked) { ok.checked = false; st.band = 'young'; st.tree = 'birch'; } else { st.band = ''; st.tree = 'oak'; } paint(); };
    ok.onchange = function () { if (ok.checked) { yk.checked = false; st.band = 'older'; st.tree = 'oak'; } else { st.band = ''; st.tree = 'oak'; } paint(); };
    paint();
  }
  function createDialog(opt) {
    opt = opt || {};
    return new Promise(function (resolve) {
      var st = { name: opt.name || '', avatar: opt.avatar || '', age: opt.forOther ? 'adult' : (opt.age || (cur ? '' : 'adult')), pass: null, band: opt.tree === 'sequoia' ? 'older' : opt.tree === 'birch' ? 'young' : '', tree: opt.tree === 'sequoia' || opt.tree === 'birch' ? opt.tree : 'oak' };
      var other = !!opt.forOther, keep = other && opt.keepMe && cur && getP(cur.id) && getP(cur.id).age === 'adult' ? cur.id : null;
      if (!st.age) { var a = cur && getP(cur.id); st.age = a && a.age === 'adult' ? '' : 'adult'; }
      dialog(function (d) { step1(d); }, function (r) { resolve(!!r); });
      function step1(d) {
        d.show('<h2 id="ggp-title">' + (other ? 'A profile for someone you love' : 'Create a Grounded profile') + '</h2>' +
          (opt.reason ? '<p>' + esc(opt.reason) + '</p>' : '<p>Your profile keeps what you save across every Grounded tool, locked with a passcode, on this device only.</p>') +
          '<label class="ggp-l" for="ggp-name">' + (other ? 'Their first name, or what you call them' : 'First name or a nickname') + '</label><input type="text" id="ggp-name" maxlength="30" autocomplete="off" value="' + esc(st.name) + '">' +
          (other ? '' : '<label class="ggp-l">Who is this profile for?</label><div class="ggp-ages">' + AGES.map(function (a) { return '<button type="button" class="ggp-age" data-age="' + a.id + '" aria-pressed="' + (st.age === a.id) + '"><b>' + a.name + '</b><span>' + a.who + '</span></button>'; }).join('') + '</div>') +
          treeBlock(st, other) +
          '<div class="ggp-picrow"><span id="ggp-av">' + av(st.avatar, st.name || '?', 56) + '</span><button type="button" class="ggp-link" id="ggp-pick">Choose a picture</button></div>' +
          '<div class="ggp-row"><button type="button" class="ggp-b" data-x>Cancel</button><button type="button" class="ggp-b ggp-go" data-next>Next</button></div>');
        $(d, '[data-x]').onclick = function () { d.close(false); };
        d.el.querySelectorAll('[data-age]').forEach(function (b) { b.onclick = function () { st.age = b.dataset.age; d.el.querySelectorAll('[data-age]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); var tb = $(d, '#ggp-treebox'); if (tb) tb.hidden = st.age !== 'adult'; }; });
        treeWire(d, st);
        $(d, '#ggp-pick').onclick = function () {
          st.name = $(d, '#ggp-name').value.trim();
          loadAvatars(function () { GGAv.pick({ value: st.avatar, name: st.name || '?', photo: true, prefer: st.age === 'adult' ? 'bold' : 'friendly', onPick: function (v) { st.avatar = v; $(d, '#ggp-av').innerHTML = av(v, st.name, 56); } }); });
        };
        $(d, '[data-next]').onclick = function () {
          st.name = $(d, '#ggp-name').value.trim();
          if (!st.name) return d.msg('Add a name first.');
          if (!st.age) return d.msg('Choose who this profile is for.');
          if (readList().some(function (p) { return p.name.toLowerCase() === st.name.toLowerCase(); })) return d.msg('There is already a profile with that name on this device. Add a last initial to tell them apart.');
          if (isMinor(st.age) && !adults().length) return noGrown(d);
          step2(d);
        };
      }
      function noGrown(d) {
        d.show('<h2 id="ggp-title">A grown-up comes first</h2><p>Profiles for kids and teens need a grown-up to agree to our terms. Please create the grown-up\'s own profile first, then add ' + esc(st.name) + '.</p>' +
          '<div class="ggp-row"><button type="button" class="ggp-b" data-back>Back</button><button type="button" class="ggp-b ggp-go" data-adult>Create the grown-up\'s profile</button></div>');
        $(d, '[data-back]').onclick = function () { step1(d); };
        $(d, '[data-adult]').onclick = function () { st.name = ''; st.avatar = ''; st.age = 'adult'; step1(d); };
      }
      function step2(d) {
        var kid = st.age === 'maple', min = st.age === 'adult' || st.age === 'pine' ? 6 : 4;
        d.show('<h2 id="ggp-title">' + (kid ? 'Pick a secret picture code' : 'Choose a passcode') + '</h2>' +
          (kid ? '<p>' + esc(st.name) + ', tap three pictures in an order you will remember. That is your secret code.</p><div id="ggp-pad"></div><p class="ggp-small" id="ggp-again" style="text-align:center"></p>'
            : other ? '<p>At least ' + min + ' characters. Choose it together with ' + esc(st.name) + ' if you can, so it opens their own tree. ' + (keep ? 'You will still open it with your own passcode, as their helper.' : '') + '</p><label class="ggp-l" for="ggp-p1">Passcode</label><input type="password" id="ggp-p1" autocomplete="new-password"><label class="ggp-l" for="ggp-p2">Type it again</label><input type="password" id="ggp-p2" autocomplete="new-password">'
            : '<p>At least ' + min + ' characters. Only you will know it.</p><label class="ggp-l" for="ggp-p1">Passcode</label><input type="password" id="ggp-p1" autocomplete="new-password"><label class="ggp-l" for="ggp-p2">Type it again</label><input type="password" id="ggp-p2" autocomplete="new-password">') +
          HOURS('ggp-h') +
          (st.age === 'adult' || st.age === 'pine' ? '<p class="ggp-note"><b>Please remember your passcode.</b> It never leaves this device, so no one, including us, can recover it. You can download a locked backup from your profile any time.</p>' : '') +
          '<div class="ggp-row"><button type="button" class="ggp-b" data-back>Back</button><button type="button" class="ggp-b ggp-go" data-next' + (kid ? ' disabled' : '') + '>Next</button></div>');
        $(d, '[data-back]').onclick = function () { step1(d); };
        var first = null, pad;
        if (kid) pad = picPad(d, $(d, '#ggp-pad'), function (v) {
          if (!v) { $(d, '[data-next]').disabled = true; return; }
          if (!first) { first = v; $(d, '#ggp-again').textContent = 'Now tap the same three again to be sure.'; setTimeout(function () { pad.reset(); }, 350); }
          else if (v === first) { st.pass = v; $(d, '#ggp-again').textContent = 'Matched! Tap Next.'; $(d, '[data-next]').disabled = false; }
          else { first = null; d.msg('Those did not match. Let\'s start again.'); $(d, '#ggp-again').textContent = ''; setTimeout(function () { pad.reset(); }, 350); }
        });
        $(d, '[data-next]').onclick = function () {
          st.hours = +$(d, '#ggp-h').value;
          if (!kid) {
            var p1 = $(d, '#ggp-p1').value, p2 = $(d, '#ggp-p2').value;
            if (p1.length < min) return d.msg('Your passcode needs at least ' + min + ' characters.');
            if (p1 !== p2) return d.msg('The two passcodes do not match.');
            st.pass = p1;
          }
          if (!st.pass) return d.msg('Pick your picture code first.');
          step3(d);
        };
      }
      // Start My Birch and Start My Oak (Pine): bring the Health and Ability choice only on a yes.
      var lifeFrom = (function () { var v = opt.carry && cur && open[cur.id] && open[cur.id].data, l = v && v.life; return l && ((l.ids || []).length || l.none || l.rather || l.gentle) ? l : null; })();
      function step3(d) {
        var minor = isMinor(st.age);
        d.show('<h2 id="ggp-title">One last step</h2>' +
          '<p>Grounded tools are for reflection and growth. They are not therapy, medical care, or a crisis service. If you or someone you love is in crisis, call or text 988 any time.</p>' +
          '<p class="ggp-small">Everything saved in this profile stays on this device, locked with ' + (st.age === 'maple' ? 'the picture code' : 'the passcode') + '. We never see it.</p>' +
          (minor ? grownBlock(st.name, st.age)
            : other ? '<label class="ggp-check"><input type="checkbox" id="ggp-agree"> <span>I am 18 or older. I am setting this up with ' + esc(st.name) + ', or for them with their permission or as someone who cares for them, and I have read and agree to the ' + TERMS_LINKS + '.</span></label>'
            : '<label class="ggp-check"><input type="checkbox" id="ggp-agree"> <span>I am 18 or older, and I have read and agree to the ' + TERMS_LINKS + '.</span></label>') +
          (lifeFrom && !minor ? '<hr class="ggp-sep"><p style="margin:0"><b>Bring your Health and Ability choices?</b></p><label class="ggp-check" style="margin-top:6px"><input type="checkbox" id="ggp-life"> <span>Yes, copy them into the new profile, locked there too. You can change them any time.</span></label>' : '') +
          '<div class="ggp-row"><button type="button" class="ggp-b" data-back>Back</button><button type="button" class="ggp-b ggp-go" data-go>Create profile</button></div>');
        $(d, '[data-back]').onclick = function () { st.pass = null; step2(d); };
        $(d, '[data-go]').onclick = function () {
          var o = { name: st.name, avatar: st.avatar, age: st.age, pass: st.pass, code: st.age === 'maple' ? 'pics' : 'text', hours: st.hours, carry: opt.carry || null, helperOf: keep, tree: st.age === 'adult' && st.band && BAND[st.band].indexOf(st.tree) >= 0 ? st.tree : 'oak' };
          try { if (minor) Object.assign(o, readGrown(d)); else if (!$(d, '#ggp-agree').checked) throw new Error('Please check the box to agree.'); }
          catch (e) { return d.msg(e.message); }
          var lb = $(d, '#ggp-life');
          if (lifeFrom && lb && lb.checked) { o.carry = Object.assign({}, o.carry || {}); o.carry.life = { ids: (lifeFrom.ids || []).slice(), none: !!lifeFrom.none, rather: !!lifeFrom.rather, gentle: !!lifeFrom.gentle, shareHelpers: false, set: todayStr() }; }
          else if (o.carry && o.carry.life) { o.carry = Object.assign({}, o.carry); delete o.carry.life; }
          run(d, function () { return createProfile(o); }).then(function (id) {
            d.close(true); toast(st.name + '\'s profile is ready.');
            if (opt.onCreated) opt.onCreated(id);
            try { window.dispatchEvent(new CustomEvent('ggp-created', { detail: { id: id, name: st.name } })); } catch (e) {}
          }).catch(function () {});
        };
      }
    });
  }

  /* =====================================================================
     OPEN (unlock, switch person, forgot passcode)
     ===================================================================== */
  function openDialog(opt) {
    opt = opt || {};
    return new Promise(function (resolve) {
      dialog(function (d) { var one = opt.id && getP(opt.id); if (one) askCode(d, one); else pickPerson(d); }, function (r) { resolve(!!r); });
      function pickPerson(d) {
        var list = readList(), legacy = legacyOak(), act = cur && getP(cur.id);
        if (!list.length && !legacy.length) { d.close(); createDialog(opt).then(resolve); return; }
        d.show('<h2 id="ggp-title">' + (act ? 'Switch person' : 'Open your profile') + '</h2>' +
          (opt.reason ? '<p>' + esc(opt.reason) + '</p>' : '<p>Profiles on this device.</p>') +
          '<div class="ggp-people">' + list.map(function (p) {
            var here = act && act.id === p.id;
            return '<button type="button" class="ggp-person" data-id="' + p.id + '"' + (here ? ' aria-pressed="true"' : '') + '>' + av(p.avatar, p.name, 56) + '<b>' + esc(p.name) + '</b><span>' + (here ? 'Open now' : ageName(p.age)) + '</span></button>';
          }).join('') + legacy.map(function (lp) {
            return '<button type="button" class="ggp-person" data-legacy="' + lp.id + '">' + av('', lp.name, 56) + '<b>' + esc(lp.name) + '</b><span>From Oak</span></button>';
          }).join('') + '</div>' +
          '<div class="ggp-row" style="justify-content:space-between"><button type="button" class="ggp-link" data-restore>Load a backup</button><span style="display:flex;gap:8px"><button type="button" class="ggp-b" data-x>Cancel</button><button type="button" class="ggp-b ggp-go" data-new>New profile</button></span></div>');
        $(d, '[data-x]').onclick = function () { d.close(false); };
        $(d, '[data-new]').onclick = function () { d.close(); createDialog(opt).then(resolve); };
        $(d, '[data-restore]').onclick = function () { d.close(false); backupGo('pick'); };
        d.el.querySelectorAll('[data-id]').forEach(function (b) { b.onclick = function () { askCode(d, getP(b.dataset.id)); }; });
        d.el.querySelectorAll('[data-legacy]').forEach(function (b) { b.onclick = function () { legacyOpen(d, legacy.filter(function (x) { return x.id === b.dataset.legacy; })[0]); }; });
      }
      function finish(d, p) { d.close(true); toast('Welcome, ' + p.name + '.'); if (needsTerms(p)) setTimeout(function () { termsUpdate(p); }, 200); }
      function askCode(d, p) {
        var act = cur && getP(cur.id);
        if (act && act.id === p.id) { d.close(true); return; }
        // a grown-up who is open can switch to a child they care for without a code
        if (act && act.age === 'adult' && open[p.id] && p.age !== 'adult') {
          var kr = open[p.id].raw;
          run(d, function () { return openWithRaw(p.id, kr, cur.until); }).then(function () { finish(d, p); }).catch(function () {});
          return;
        }
        var kid = p.code === 'pics', code = null;
        d.show('<div style="display:flex;gap:12px;align-items:center;margin-bottom:6px">' + av(p.avatar, p.name, 56) + '<h2 id="ggp-title" style="margin:0">Hi, ' + esc(p.name) + '</h2></div>' +
          (kid ? '<p>Tap your three secret pictures.</p><div id="ggp-pad"></div>' : '<label class="ggp-l" for="ggp-pass">Passcode</label><input type="password" id="ggp-pass" autocomplete="current-password">') +
          HOURS('ggp-h') +
          '<div class="ggp-row" style="justify-content:space-between"><button type="button" class="ggp-link" data-forgot>Forgot ' + (kid ? 'the pictures' : 'the passcode') + '?</button><span style="display:flex;gap:8px"><button type="button" class="ggp-b" data-back>Back</button><button type="button" class="ggp-b ggp-go" data-go>Open</button></span></div>');
        $(d, '[data-back]').onclick = function () { pickPerson(d); };
        $(d, '[data-forgot]').onclick = function () { forgot(d, p); };
        function go() {
          var pass = kid ? code : $(d, '#ggp-pass').value; if (!pass) return d.msg(kid ? 'Tap three pictures.' : 'Type the passcode.');
          var hours = +$(d, '#ggp-h').value;
          run(d, function () { return rawFromPass(p, pass).then(function (raw) { return openWithRaw(p.id, raw, Date.now() + hours * 3600000); }); })
            .then(function () { finish(d, p); }).catch(function () { if (kid && pad) pad.reset(); });
        }
        var pad = kid ? picPad(d, $(d, '#ggp-pad'), function (v) { code = v; if (v) go(); }) : null;
        $(d, '[data-go]').onclick = go;
        var pi = $(d, '#ggp-pass'); if (pi) pi.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
      }
      function forgot(d, p) {
        if (p.age === 'adult') {
          d.show('<h2 id="ggp-title">Forgot your passcode</h2><p>Your profile is locked with a passcode only you know. It never leaves this device, so no one, including us, can open it without it.</p><p>If you have a backup file from before, restore it and use the passcode you had then. Otherwise you can remove this profile and start a new one.</p>' +
            '<div class="ggp-row"><button type="button" class="ggp-b" data-back>Back</button><button type="button" class="ggp-b" data-rm>Remove this profile</button></div>');
          $(d, '[data-back]').onclick = function () { askCode(d, p); };
          $(d, '[data-rm]').onclick = function () {
            if (!confirm('Remove ' + p.name + '\'s profile and everything saved in it from this device? This cannot be undone.')) return;
            removeProfile(p.id).then(function () { toast('Profile removed.'); pickPerson(d); });
          };
          return;
        }
        var teen = p.age === 'pine', ok = adults();
        d.show('<h2 id="ggp-title">' + (teen ? 'Forgot your passcode' : 'A grown-up can help') + '</h2>' +
          (teen ? '<p>Your answers and journal are locked with your passcode, so nobody, not even a grown-up, can open them. A grown-up can clear them so you can start fresh with a new passcode. Your beds, days tended, and butterflies stay.</p>'
            : '<p>A grown-up who cares for ' + esc(p.name) + ' can open this profile with their own passcode, then set a new ' + (p.code === 'pics' ? 'picture code' : 'passcode') + '.</p>') +
          (ok.length ? '<label class="ggp-l" for="ggp-gid">Grown-up</label><select id="ggp-gid">' + ok.map(function (a) { return '<option value="' + a.id + '">' + esc(a.name) + '</option>'; }).join('') + '</select><label class="ggp-l" for="ggp-gpass">Grown-up\'s passcode</label><input type="password" id="ggp-gpass">' : '<p class="ggp-note">There is no grown-up profile on this device yet.</p>') +
          '<div class="ggp-row"><button type="button" class="ggp-b" data-back>Back</button>' + (ok.length ? '<button type="button" class="ggp-b ggp-go" data-go>' + (teen ? 'Clear and start fresh' : 'Open') + '</button>' : '') + '</div>');
        $(d, '[data-back]').onclick = function () { askCode(d, p); };
        if (!ok.length) return;
        $(d, '[data-go]').onclick = function () {
          var g = getP($(d, '#ggp-gid').value), gp = $(d, '#ggp-gpass').value;
          if (!gp) return d.msg('Type the grown-up\'s passcode.');
          run(d, function () {
            return rawFromPass(g, gp).then(function (gr) { return readVault(g.id, gr).then(function (gd) { return { raw: gr, data: gd }; }); });
          }).then(function (G) {
            if (teen) {
              if (!confirm('Clear ' + p.name + '\'s answers and journal? They will be erased, never read. Beds, days tended, and butterflies stay.')) return;
              newCode(d, p, null, G);
            } else {
              var k = G.data.keys && G.data.keys[p.id];
              if (!k) return d.msg(g.name + ' is not one of ' + p.name + '\'s grown-ups on this device. Try another grown-up.');
              newCode(d, p, unb64(k), G);
            }
          }).catch(function () {});
        };
      }
      // set a new code; raw given = keep data, raw null = clear private data (teens)
      function newCode(d, p, raw, G) {
        var kid = p.code === 'pics', min = p.age === 'pine' ? 6 : 4, val = null, first = null;
        d.show('<h2 id="ggp-title">' + (kid ? 'A new picture code for ' : 'A new passcode for ') + esc(p.name) + '</h2>' +
          (raw ? '' : '<p class="ggp-note">' + esc(p.name) + ', choose your new passcode yourself, so it stays private to you.</p>') +
          (kid ? '<div id="ggp-pad"></div><p class="ggp-small" id="ggp-again" style="text-align:center">Tap three pictures.</p>'
            : '<label class="ggp-l" for="ggp-p1">New passcode, at least ' + min + ' characters</label><input type="password" id="ggp-p1" autocomplete="new-password"><label class="ggp-l" for="ggp-p2">Type it again</label><input type="password" id="ggp-p2" autocomplete="new-password">') +
          HOURS('ggp-h') +
          '<div class="ggp-row"><button type="button" class="ggp-b ggp-go" data-go>Save and open</button></div>');
        var pad = kid ? picPad(d, $(d, '#ggp-pad'), function (v) {
          if (!v) return; if (!first) { first = v; $(d, '#ggp-again').textContent = 'Now the same three again.'; setTimeout(function () { pad.reset(); }, 350); }
          else if (v === first) { val = v; $(d, '#ggp-again').textContent = 'Matched.'; } else { first = null; val = null; d.msg('Those did not match. Start again.'); setTimeout(function () { pad.reset(); }, 350); }
        }) : null;
        $(d, '[data-go]').onclick = function () {
          if (!kid) { var a = $(d, '#ggp-p1').value, b = $(d, '#ggp-p2').value; if (a.length < min) return d.msg('At least ' + min + ' characters.'); if (a !== b) return d.msg('The two do not match.'); val = a; }
          if (!val) return d.msg('Tap your three pictures twice.');
          var hours = +$(d, '#ggp-h').value;
          run(d, function () {
            var r = raw || crypto.getRandomValues(new Uint8Array(32));
            return wrapRaw(val, r).then(function (w) {
              var q = getP(p.id); q.salt = w.salt; q.wrap = w.wrap; if (!raw) q.cleared = todayStr(); putP(q);
              var step = raw ? Promise.resolve() : writeVault(p.id, r, blankVault());
              return step.then(function () { return openWithRaw(p.id, r, Date.now() + hours * 3600000); });
            });
          }).then(function () { d.close(true); toast(raw ? 'New code saved.' : 'A fresh start. Your beds and butterflies are still here.'); }).catch(function () {});
        };
      }
      function legacyOpen(d, lp) {
        d.show('<h2 id="ggp-title">Welcome back, ' + esc(lp.name) + '</h2><p>Your Oak profile is moving into Grounded profiles, so it works across every Grounded tool. Your check-ins come with you, still locked with the same passcode.</p>' +
          '<label class="ggp-l" for="ggp-pass">Your Oak passcode</label><input type="password" id="ggp-pass" autocomplete="current-password">' + HOURS('ggp-h') +
          '<label class="ggp-check"><input type="checkbox" id="ggp-agree"> <span>I am 18 or older, and I have read and agree to the ' + TERMS_LINKS + '.</span></label>' +
          '<div class="ggp-row"><button type="button" class="ggp-b" data-back>Back</button><button type="button" class="ggp-b ggp-go" data-go>Move my profile</button></div>');
        $(d, '[data-back]').onclick = function () { pickPerson(d); };
        $(d, '[data-go]').onclick = function () {
          var pass = $(d, '#ggp-pass').value, hours = +$(d, '#ggp-h').value;
          if (!pass) return d.msg('Type your passcode.');
          if (!$(d, '#ggp-agree').checked) return d.msg('Please check the box to agree.');
          run(d, function () {
            return openLegacyOak(lp, pass).then(function (data) {
              var name = lp.name; if (readList().some(function (p) { return p.name.toLowerCase() === name.toLowerCase(); })) name = name + ' (Oak)';
              return createProfile({ name: name, avatar: data.avatar || '', age: 'adult', pass: pass, code: 'text', hours: hours, carry: { oak: { history: data.history || [] } } });
            }).then(function () { retireLegacyOak(lp); });
          }).then(function () { d.close(true); toast('Your profile moved in. Welcome, ' + lp.name + '.'); }).catch(function () {});
        };
      }
    });
  }

  function needsTerms(p) { return p && p.agreed && (p.agreed.terms !== TERMS_V || p.agreed.privacy !== PRIVACY_V); }
  function termsUpdate(p) {
    dialog(function (d) {
      var minor = isMinor(p.age);
      d.show('<h2 id="ggp-title">We updated our terms</h2><p>Please take a look at the updated ' + TERMS_LINKS + ' before saving anything new.</p>' +
        (minor ? grownBlock(p.name, p.age) : '<label class="ggp-check"><input type="checkbox" id="ggp-agree"> <span>I have read and agree to the updated ' + TERMS_LINKS + '.</span></label>') +
        '<div class="ggp-row"><button type="button" class="ggp-b" data-x>Not now</button><button type="button" class="ggp-b ggp-go" data-go>Agree</button></div>');
      $(d, '[data-x]').onclick = function () { d.close(false); lock(); toast('Locked. Agree to the updated terms to keep saving.'); };
      $(d, '[data-go]').onclick = function () {
        var g = null;
        try { if (minor) g = readGrown(d); else if (!$(d, '#ggp-agree').checked) throw new Error('Please check the box to agree.'); } catch (e) { return d.msg(e.message); }
        run(d, function () { return g && g.grownPass ? rawFromPass(getP(g.grownId), g.grownPass) : null; }).then(function () {
          var q = getP(p.id); q.agreed = { date: todayStr(), terms: TERMS_V, privacy: PRIVACY_V, by: minor ? 'grownup' : 'self', grownup: minor ? getP(g.grownId).name : '' }; putP(q);
          d.close(true); toast('Thank you.');
        }).catch(function () {});
      };
    });
  }

  /* =====================================================================
     MANAGE
     ===================================================================== */
  function removeProfile(id) {
    readList().forEach(function (q) { if (q.grown && q.grown.indexOf(id) > -1) { q.grown = q.grown.filter(function (g) { return g !== id; }); putP(q); } if (q.helpers && q.helpers.indexOf(id) > -1) { q.helpers = q.helpers.filter(function (g) { return g !== id; }); putP(q); } });
    Object.keys(open).forEach(function (o) { if (open[o].data.keys && open[o].data.keys[id]) { delete open[o].data.keys[id]; writeVault(o, open[o].raw, open[o].data); } });
    var wasActive = cur && cur.id === id;
    dropP(id); delete open[id];
    if (window.GGGrowth && GGGrowth.forget) GGGrowth.forget(id);
    return wasActive ? lock() : Promise.resolve(emit('change'));
  }
  function manage(id) {
    id = id || (cur && cur.id); var p = getP(id);
    if (!p || !open[id]) return openDialog();
    dialog(function (d) { view(d); });
    function view(d) {
      p = getP(id); var v = open[id].data, isAdult = p.age === 'adult', act = getP(cur.id);
      var kids = isAdult ? Object.keys(v.keys || {}).map(getP).filter(Boolean) : [];
      var grown = (p.grown || []).map(getP).filter(Boolean);
      d.show('<div style="display:flex;gap:14px;align-items:center"><button type="button" class="ggp-pic" style="width:76px;height:76px" id="ggp-pick" aria-label="Change picture">' + av(p.avatar, p.name, 68) + '</button><div><h2 id="ggp-title" style="margin:0">' + esc(p.name) + '</h2><span class="ggp-small">' + ageName(p.age) + ' profile' + (cur.id === id ? ', unlocked until ' + untilText(cur.until) : ', opened by ' + esc(act.name)) + '</span></div></div>' +
        '<label class="ggp-l" for="ggp-name">Name</label><input type="text" id="ggp-name" maxlength="30" value="' + esc(p.name) + '">' +
        '<label class="ggp-l">Age</label><select id="ggp-age">' + AGES.map(function (a) { return '<option value="' + a.id + '"' + (a.id === p.age ? ' selected' : '') + '>' + a.name + ' (' + a.who + ')</option>'; }).join('') + '</select>' +
        (isAdult ? (function () { var t = treeOf(p), band = t === 'birch' ? 'young' : t === 'sequoia' ? 'older' : '', me = cur.id === id ? 'I am' : 'They are';
          return '<label class="ggp-check"><input type="checkbox" id="ggp-young"' + (band === 'young' ? ' checked' : '') + '> <span>' + me + ' 26 or younger</span></label>' +
            '<label class="ggp-check"><input type="checkbox" id="ggp-older"' + (band === 'older' ? ' checked' : '') + '> <span>' + me + ' 55 or older</span></label>' +
            '<div id="ggp-treepick"' + (band ? '' : ' hidden') + '><label class="ggp-l" for="ggp-tree">Tree</label><select id="ggp-tree">' + (BAND[band] || []).map(function (x) { return '<option value="' + x + '"' + (t === x ? ' selected' : '') + '>' + TREE[x].tool + ' (' + TREE[x].who + ')</option>'; }).join('') + '</select><span class="ggp-small">Sets where My tree opens. Check-ins already saved stay where they are.</span></div>'; })() : '') +
        (isAdult ? '<label class="ggp-l" for="ggp-email">Email, optional</label><input type="email" id="ggp-email" value="' + esc(v.email || '') + '" placeholder="Fills in contact forms on this site"><span class="ggp-small">It stays in your locked profile and is only sent if you send a form.</span>' : '') +
        '<div class="ggp-row"><button type="button" class="ggp-b ggp-go" data-save>Save changes</button></div>' +
        (cur.id === id || grownOpens(p.age) ? '<hr class="ggp-sep"><p style="margin:0 0 4px"><b>' + (grownOpens(p.age) ? 'Their Health and Ability' : 'Health and Ability') + '</b></p><p class="ggp-small">' + (grownOpens(p.age) ? 'Set it together with ' + esc(p.name) + ', so guides and practices that fit show first. It stays locked in this profile, and changes nothing about questions or scores.' : 'Choose what is part of your life right now, so guides and practices that fit show first. It stays locked in your profile, and changes nothing about questions or scores.') + '</p><button type="button" class="ggp-link" data-life>' + (grownOpens(p.age) ? 'Open Their Health and Ability' : 'Open Health and Ability') + '</button>' : '') +
        (kids.filter(function (k) { return k.age !== 'adult'; }).length ? '<hr class="ggp-sep"><p><b>Kids you can open</b></p><p class="ggp-small">' + kids.filter(function (k) { return k.age !== 'adult'; }).map(function (k) { return esc(k.name); }).join(', ') + '</p>' : '') +
        (kids.filter(function (k) { return k.age === 'adult'; }).length ? '<hr class="ggp-sep"><p><b>People you help</b></p><p class="ggp-small">' + kids.filter(function (k) { return k.age === 'adult'; }).map(function (k) { return esc(k.name); }).join(', ') + '</p>' : '') +
        (isAdult && (p.helpers || []).length ? '<hr class="ggp-sep"><p><b>Helpers</b></p><p class="ggp-small">They open this profile in Willow, Birch, or Sequoia with their own passcode, and see only what you choose to share there.</p>' + (p.helpers || []).map(getP).filter(Boolean).map(function (h) { return '<p class="ggp-small" style="display:flex;justify-content:space-between;gap:10px;align-items:center"><span>' + esc(h.name) + '</span>' + (cur.id === id ? '<button type="button" class="ggp-link" data-rmhelper="' + h.id + '">Remove</button>' : '') + '</p>'; }).join('') : '') +
        (grownOpens(p.age) ? '<hr class="ggp-sep"><p><b>Grown-ups who can open this profile</b></p><p class="ggp-small">' + (grown.length ? grown.map(function (g) { return esc(g.name); }).join(', ') : 'None yet') + '</p><button type="button" class="ggp-link" data-addgrown>Add another grown-up</button>' : '') +
        '<hr class="ggp-sep"><div style="display:flex;flex-direction:column;align-items:flex-start;gap:10px">' +
        '<button type="button" class="ggp-link" data-code>Change ' + (p.code === 'pics' ? 'picture code' : 'passcode') + '</button>' +
        '<button type="button" class="ggp-link" data-backup>Download a locked backup</button>' +
        '<button type="button" class="ggp-link" data-rm style="color:var(--ggp-warn)">Remove this profile from this device</button></div>' +
        '<div class="ggp-row"><button type="button" class="ggp-b" data-x>Done</button></div>');
      $(d, '[data-x]').onclick = function () { d.close(true); };
      var olderBox = $(d, '#ggp-older'), youngBox = $(d, '#ggp-young');
      function bandPaint(band, pick) { $(d, '#ggp-treepick').hidden = !band; $(d, '#ggp-tree').innerHTML = (BAND[band] || []).map(function (x) { return '<option value="' + x + '"' + (x === pick ? ' selected' : '') + '>' + TREE[x].tool + ' (' + TREE[x].who + ')</option>'; }).join(''); }
      if (olderBox && youngBox) {
        youngBox.onchange = function () { if (youngBox.checked) olderBox.checked = false; bandPaint(youngBox.checked ? 'young' : '', 'birch'); };
        olderBox.onchange = function () { if (olderBox.checked) youngBox.checked = false; bandPaint(olderBox.checked ? 'older' : '', treeOf(p) === 'sequoia' ? 'sequoia' : 'oak'); };
      }
      $(d, '#ggp-pick').onclick = function () { loadAvatars(function () { GGAv.pick({ value: p.avatar, name: p.name, photo: true, prefer: isAdult ? 'bold' : 'friendly', onPick: function (val) { var q = getP(id); q.avatar = val; putP(q); emit('change'); view(d); } }); }); };
      $(d, '[data-save]').onclick = function () {
        var name = $(d, '#ggp-name').value.trim(), age = $(d, '#ggp-age').value;
        if (!name) return d.msg('Add a name.');
        if (readList().some(function (x) { return x.id !== id && x.name.toLowerCase() === name.toLowerCase(); })) return d.msg('Another profile already has that name.');
        if ((p.age === 'adult') !== (age === 'adult')) return d.msg('A profile can move between school ages, but not between Adult and kids or teens. Create a new profile instead.');
        if (grownOpens(p.age) && age === 'pine') {
          if (!confirm('Moving to High school makes answers and journal private to ' + name + '. Grown-ups will no longer be able to open this profile. Continue?')) return;
          Object.keys(open).forEach(function (o) { if (open[o].data.keys && open[o].data.keys[id]) { delete open[o].data.keys[id]; writeVault(o, open[o].raw, open[o].data); } });
          
        }
        var q = getP(id); q.name = name; q.age = age;
        if (isAdult) { var ob = $(d, '#ggp-older'), yb = $(d, '#ggp-young'), ts = $(d, '#ggp-tree'); if (ob && ob.checked && ts && ts.value === 'sequoia') q.tree = 'sequoia'; else if (yb && yb.checked && ts && ts.value === 'birch') q.tree = 'birch'; else delete q.tree; }
        putP(q);
        if (isAdult) { v.email = ($(d, '#ggp-email').value || '').trim(); }
        save(id).then(function () { emit('change'); toast('Saved.'); view(d); });
      };
      var ag = $(d, '[data-addgrown]'); if (ag) ag.onclick = function () { addGrown(d); };
      var lf = $(d, '[data-life]'); if (lf) lf.onclick = function () { lifeGo(function () { GGLife.dialog(lifeTree(p), { id: id, forChild: grownOpens(p.age) }); }); };
      d.el.querySelectorAll('[data-rmhelper]').forEach(function (b) { b.onclick = function () { var h = getP(b.dataset.rmhelper); if (!h || !confirm('Remove ' + h.name + ' as a helper? They will no longer open ' + p.name + '\'s profile.')) return; removeHelper(id, h.id); toast(h.name + ' is no longer a helper.'); view(d); }; });
      $(d, '[data-code]').onclick = function () { changeCode(d); };
      $(d, '[data-backup]').onclick = function () { backup(id); };
      $(d, '[data-rm]').onclick = function () {
        if (!confirm('Remove ' + p.name + '\'s profile and everything saved in it from this device? This cannot be undone unless you have a backup.')) return;
        removeProfile(id).then(function () { d.close(true); toast('Profile removed.'); });
      };
    }
    function addGrown(d) {
      var others = adults().filter(function (a) { return (p.grown || []).indexOf(a.id) < 0; });
      d.show('<h2 id="ggp-title">Add a grown-up</h2>' + (others.length ? '<p>The grown-up types their own passcode to confirm.</p><label class="ggp-l" for="ggp-gid">Grown-up</label><select id="ggp-gid">' + others.map(function (a) { return '<option value="' + a.id + '">' + esc(a.name) + '</option>'; }).join('') + '</select><label class="ggp-l" for="ggp-gpass">Their passcode</label><input type="password" id="ggp-gpass">' : '<p>Every grown-up on this device can already open this profile. Another grown-up can create their own profile first.</p>') +
        '<div class="ggp-row"><button type="button" class="ggp-b" data-back>Back</button>' + (others.length ? '<button type="button" class="ggp-b ggp-go" data-go>Add</button>' : '') + '</div>');
      $(d, '[data-back]').onclick = function () { view(d); };
      if (!others.length) return;
      $(d, '[data-go]').onclick = function () {
        var g = getP($(d, '#ggp-gid').value), gp = $(d, '#ggp-gpass').value;
        run(d, function () {
          return rawFromPass(g, gp).then(function (gr) { return readVault(g.id, gr).then(function (gd) { gd.keys = gd.keys || {}; gd.keys[id] = b64(open[id].raw); return writeVault(g.id, gr, gd); }); });
        }).then(function () { var q = getP(id); q.grown = (q.grown || []).concat(g.id); putP(q); toast(g.name + ' can now open ' + p.name + '\'s profile.'); view(d); }).catch(function () {});
      };
    }
    function changeCode(d) {
      var kid = p.code === 'pics', min = p.age === 'adult' || p.age === 'pine' ? 6 : 4, val = null, first = null;
      d.show('<h2 id="ggp-title">' + (kid ? 'New picture code' : 'New passcode') + '</h2>' +
        (kid ? '<div id="ggp-pad"></div><p class="ggp-small" id="ggp-again" style="text-align:center">Tap three pictures.</p>' : '<label class="ggp-l" for="ggp-p1">New passcode, at least ' + min + ' characters</label><input type="password" id="ggp-p1" autocomplete="new-password"><label class="ggp-l" for="ggp-p2">Type it again</label><input type="password" id="ggp-p2" autocomplete="new-password">') +
        '<div class="ggp-row"><button type="button" class="ggp-b" data-back>Back</button><button type="button" class="ggp-b ggp-go" data-go>Save</button></div>');
      $(d, '[data-back]').onclick = function () { view(d); };
      var pad = kid ? picPad(d, $(d, '#ggp-pad'), function (v2) {
        if (!v2) return; if (!first) { first = v2; $(d, '#ggp-again').textContent = 'Now the same three again.'; setTimeout(function () { pad.reset(); }, 350); }
        else if (v2 === first) { val = v2; $(d, '#ggp-again').textContent = 'Matched.'; } else { first = null; val = null; d.msg('Those did not match.'); setTimeout(function () { pad.reset(); }, 350); }
      }) : null;
      $(d, '[data-go]').onclick = function () {
        if (!kid) { var a = $(d, '#ggp-p1').value, b = $(d, '#ggp-p2').value; if (a.length < min) return d.msg('At least ' + min + ' characters.'); if (a !== b) return d.msg('The two do not match.'); val = a; }
        if (!val) return d.msg('Tap three pictures twice.');
        run(d, function () { return wrapRaw(val, open[id].raw).then(function (w) { var q = getP(id); q.salt = w.salt; q.wrap = w.wrap; putP(q); }); })
          .then(function () { toast('Saved. Old backups still open with the old code.'); view(d); }).catch(function () {});
      };
    }
  }

  /* ---------- backups (still locked) ---------- */
  function backup(id) {
    id = id || (cur && cur.id); var p = getP(id); if (!p) return;
    var run2 = open[id] ? save(id) : Promise.resolve();
    run2.then(function () {
      var file = { app: 'grounded-profile', v: 1, saved: new Date().toISOString(), profile: p, box: JSON.parse(localStorage.getItem(BOX + id) || 'null') };
      var blob = new Blob([JSON.stringify(file)], { type: 'application/json' }), a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'grounded-profile-' + slug(p.name) + '-' + todayStr() + '.json';
      document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 800);
      toast('Backup downloaded. It stays locked with ' + (p.code === 'pics' ? 'the picture code' : 'the passcode') + '.');
    });
  }
  function restore(done) {
    var inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.json,application/json';
    inp.onchange = function () {
      var f = inp.files[0]; if (!f) return; var r = new FileReader();
      r.onload = function () {
        try {
          var j = JSON.parse(r.result); if (j.app !== 'grounded-profile' || !j.profile || !j.profile.wrap) throw 0;
          var ex = getP(j.profile.id);
          if (ex && !confirm('This replaces ' + ex.name + '\'s profile on this device with the backup from ' + new Date(j.saved).toLocaleDateString() + '. Continue?')) return;
          putP(j.profile); if (j.box) localStorage.setItem(BOX + j.profile.id, JSON.stringify(j.box));
          if (cur && cur.id === j.profile.id) lock(true);
          toast(j.profile.name + '\'s profile is restored. Open it with its passcode.'); done && done();
        } catch (e) { alert('That file is not a Grounded profile backup.'); }
      };
      r.readAsText(f);
    };
    inp.click();
  }

  /* One Grow With Grounded Backup (shared/gg-backup.js), loaded only when someone asks for it. */
  function backupGo(act, opts) {
    var run = function () { if (window.GGBackup) GGBackup[act](opts); };
    if (window.GGBackup) return run();
    var s = document.createElement('script'); s.src = HOME + '/shared/gg-backup.js?v=bk4'; s.onload = run;
    s.onerror = function () { toast('The backup tool could not load. Check the connection and try again.'); };
    document.head.appendChild(s);
  }
  window.GGBackupGo = backupGo;

  /* Health and Ability (shared/gg-life.js), loaded when Manage my profile opens it, if the page has not already. */
  function lifeGo(fn) {
    if (window.GGLife) return fn();
    var s = document.querySelector('script[data-gglife]');
    if (!s) { s = document.createElement('script'); s.src = HOME + '/shared/gg-life.js?v=lf1'; s.setAttribute('data-gglife', '1'); document.head.appendChild(s); }
    s.addEventListener('load', function () { if (window.GGLife) fn(); });
    s.addEventListener('error', function () { toast('That could not load. Check the connection and try again.'); });
  }
  function lifeTree(p) { return !p ? 'oak' : p.age === 'adult' ? treeOf(p) : p.age; }

  /* =====================================================================
     NAVIGATION BUTTON
     ===================================================================== */
  var navBtn = null, pop = null;
  function mountNav() {
    if (navBtn || document.body.hasAttribute('data-no-profiles')) return;
    var menu = document.getElementById('site-menu') || document.querySelector('.site-menu');
    if (!menu) return;
    addCSS();
    navBtn = document.createElement('button'); navBtn.type = 'button'; navBtn.className = 'ggp-btn ggp-root'; navBtn.setAttribute('aria-haspopup', 'true'); navBtn.setAttribute('aria-expanded', 'false');
    var anchor = document.querySelector('.gg-theme') || document.querySelector('.size-btn') || document.getElementById('size-btn') || document.querySelector('.menu-btn');
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(navBtn, anchor);
    else if (menu.parentNode) menu.parentNode.appendChild(navBtn);
    pop = document.createElement('div'); pop.className = 'ggp-pop ggp-root'; pop.hidden = true; pop.setAttribute('role', 'menu'); document.body.appendChild(pop);
    navBtn.addEventListener('click', function (e) { e.stopPropagation(); if (pop.hidden) showPop(); else hidePop(); });
    document.addEventListener('click', function (e) { if (!pop.hidden && !pop.contains(e.target)) hidePop(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) { hidePop(); navBtn.focus(); } });
    window.addEventListener('resize', hidePop);
    paintNav();
  }
  function paintNav() {
    if (!navBtn) return;
    var p = cur && getP(cur.id);
    if (p) { navBtn.innerHTML = av(p.avatar, p.name, 36) + '<span class="ggp-dot" aria-hidden="true"></span>'; navBtn.setAttribute('aria-label', p.name + '\'s profile is open. Profile menu'); navBtn.title = p.name; navBtn.style.borderColor = 'transparent'; }
    else { navBtn.innerHTML = PERSON_SVG; navBtn.setAttribute('aria-label', 'Profiles on this device'); navBtn.title = 'Profiles'; navBtn.style.borderColor = ''; }
  }
  function hidePop() { if (pop && !pop.hidden) { pop.hidden = true; navBtn.setAttribute('aria-expanded', 'false'); } }
  function showPop() {
    var p = cur && getP(cur.id), html = '';
    function item(act, label, extra) { return '<button type="button" class="ggp-item" role="menuitem" data-a="' + act + '"' + (extra || '') + '>' + label + '</button>'; }
    function link(href, label) { return '<a class="ggp-item" role="menuitem" href="' + HOME + href + '">' + label + '</a>'; }
    if (p) {
      var a = AGE[p.age] || AGE.adult, v = open[p.id].data, nSaved = Object.keys((v.stories || {}).saved || {}).length;
      html += '<div class="ggp-who">' + av(p.avatar, p.name, 48) + '<div><b>' + esc(p.name) + '</b><small>' + a.name + '. Unlocked on this device until ' + untilText(cur.until) + '.</small></div></div>';
      html += link('/grove/', 'The Grove');
      var ta = toolOf(p);
      html += link(ta.href, 'My tree in ' + ta.tool);
      if (v.willow && v.willow.started) html += link('/willow/', 'My tree in Willow');
      helping().map(getP).filter(Boolean).forEach(function (q) { var sq = seqHelp(q.id), bh = birchHelp(q.id), oh = oakHelp(q.id); if (sq) html += link('/sequoia/#for=' + q.id, 'Helping ' + esc(q.name) + ' in Sequoia'); if (bh) html += link('/birch/#for=' + q.id, 'Helping ' + esc(q.name) + ' in Birch'); if (oh) html += link('/oak/#for=' + q.id, 'Helping ' + esc(q.name) + ' in Oak'); if ((!sq && !bh && !oh) || (open[q.id].data.willow && open[q.id].data.willow.started)) html += link('/willow/#for=' + q.id, (q.shared && q.shared.remembered ? 'Remembering ' : 'Caring for ') + esc(q.name) + ' in Willow'); });
      html += link('/stories.html#saved', 'Saved stories' + (nSaved ? ' (' + nSaved + ')' : ''));
      html += item('manage', 'Manage My Profile');
      var kids = Object.keys(open).filter(function (k) { return k !== p.id; }).map(getP).filter(function (k) { return k && k.age !== 'adult'; });
      if (kids.length) { html += '<div class="ggp-h">Kids you care for</div>' + kids.map(function (k) { return item('as', av(k.avatar, k.name, 28) + '<span>Switch to ' + esc(k.name) + '</span>', ' data-id="' + k.id + '"'); }).join(''); }
      html += '<div class="ggp-h">This device</div>' + item('switch', 'Switch person') + item('bk', 'Back up everything') + item('ld', 'Load a backup') + item('lock', 'Lock');
    } else {
      var n = readList().length + legacyOak().length;
      html += '<div class="ggp-who">' + '<span style="display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--ggp-gold-soft);color:var(--ggp-gold)">' + PERSON_SVG + '</span><div><b>Profiles on this device</b><small>Save your check-ins, your tree, and stories, locked with your own passcode. Nothing leaves this device.</small></div></div>';
      if (n) html += item('open', 'Open a profile');
      html += item('create', 'Create a profile') + item('ld', 'Load a backup') + item('bk', 'Back up everything') + link('/privacy.html#profiles', 'How profiles work');
    }
    pop.innerHTML = html;
    pop.querySelectorAll('[data-a]').forEach(function (b) {
      b.onclick = function () {
        hidePop(); var act = b.dataset.a;
        if (act === 'manage') manage();
        else if (act === 'switch' || act === 'open') openDialog();
        else if (act === 'create') createDialog();
        else if (act === 'restore') restore(function () { openDialog(); });
        else if (act === 'bk') backupGo('make');
        else if (act === 'ld') backupGo('pick');
        else if (act === 'lock') lock().then(function () { toast('Locked. Everything is safe on this device.'); });
        else if (act === 'as') { var k = getP(b.dataset.id); openWithRaw(k.id, open[k.id].raw, cur.until).then(function () { toast('Now in ' + k.name + '\'s profile.'); }); }
      };
    });
    pop.hidden = false; navBtn.setAttribute('aria-expanded', 'true');
    var r = navBtn.getBoundingClientRect(), w = pop.offsetWidth;
    pop.style.top = (r.bottom + window.scrollY + 8) + 'px';
    pop.style.left = (Math.max(10, Math.min(r.right - w, window.innerWidth - w - 10)) + window.scrollX) + 'px';
    var f = pop.querySelector('button,a'); if (f) f.focus();
  }

  /* =====================================================================
     PAGE FEATURES: stories, contact forms, home welcome
     ===================================================================== */
  function vaultNow() { return cur && open[cur.id] ? open[cur.id].data : null; }
  function storyInfo(el) {
    if (el._ggp) return el._ggp;
    var h = el.querySelector('h1,h2,h3'); if (!h) return null;
    var sub = el.querySelector('a[href*="substack.com/p/"]'), prev = el.querySelector('a[href$=".html"]');
    return (el._ggp = { t: h.textContent.trim(), s: slug(h.textContent), u: (prev && prev.getAttribute('href')) || (sub && sub.href) || location.pathname });
  }
  function markRead(s) { var v = vaultNow(); if (!v) return; v.stories = v.stories || { saved: {}, read: {} }; v.stories.read = v.stories.read || {}; if (!v.stories.read[s]) { v.stories.read[s] = todayStr(); save(cur.id); } }
  function paintStories() {
    var cards = document.querySelectorAll('article.card.story');
    var storyPage = !document.querySelector('.theme-filter') && document.querySelector('script[src*="read.js"]') && document.querySelector('main h1');
    var v = vaultNow(), st = v ? (v.stories || { saved: {}, read: {} }) : null;
    cards.forEach(function (c) {
      var info = storyInfo(c); if (!info) return;
      var btn = c.querySelector('.ggp-story-save:not(#ggp-page-save)'), tag = c.querySelector('.ggp-read-tag');
      if (!v) { if (btn) btn.remove(); if (tag) tag.remove(); return; }
      if (!btn) {
        btn = document.createElement('button'); btn.type = 'button'; btn.className = 'ggp-story-save';
        (c.querySelector('.card-actions') || c).appendChild(btn);
        btn.onclick = function () { var vv = vaultNow(); if (!vv) return; var s2 = vv.stories.saved; if (s2[info.s]) delete s2[info.s]; else s2[info.s] = { t: info.t, u: info.u, d: todayStr() }; save(cur.id); paintStories(); };
        c.querySelectorAll('a[href*="substack.com/p/"],a[href$=".html"]').forEach(function (l) { l.addEventListener('click', function () { markRead(info.s); }); });
      }
      var on = !!(st.saved || {})[info.s];
      btn.setAttribute('aria-pressed', String(on)); btn.textContent = on ? 'Saved' : 'Save for later';
      var h = c.querySelector('h3');
      if ((st.read || {})[info.s]) { if (!tag && h) { tag = document.createElement('span'); tag.className = 'ggp-read-tag'; tag.textContent = 'Read'; h.appendChild(tag); } }
      else if (tag) tag.remove();
    });
    // a "Saved" filter on the Stories page
    var filter = document.querySelector('.theme-filter');
    if (filter && cards.length) {
      var sb = filter.querySelector('.ggp-saved-filter');
      if (!v) { if (sb) { if (sb.getAttribute('aria-pressed') === 'true') filter.querySelector('button').click(); sb.remove(); } }
      else {
        if (!sb) {
          sb = document.createElement('button'); sb.type = 'button'; sb.className = 'ggp-saved-filter'; filter.appendChild(sb);
          sb.onclick = function () {
            filter.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === sb)); });
            var saved = (vaultNow().stories || {}).saved || {};
            document.querySelectorAll('article.card.story').forEach(function (c) { var i = storyInfo(c); c.hidden = !(i && saved[i.s]); });
          };
          if (location.hash === '#saved') setTimeout(function () { sb.click(); filter.scrollIntoView({ block: 'start' }); }, 50);
        }
        var n = Object.keys(st.saved || {}).length; sb.textContent = 'Saved' + (n ? ' (' + n + ')' : '');
        if (sb.getAttribute('aria-pressed') === 'true') sb.onclick();
      }
    }
    // a story preview page
    if (storyPage && v) {
      var h1 = document.querySelector('main h1'), s = h1._ggs || (h1._ggs = slug(h1.textContent));
      markRead(s);
      var b = document.getElementById('ggp-page-save');
      if (!b) { b = document.createElement('button'); b.type = 'button'; b.id = 'ggp-page-save'; b.className = 'ggp-story-save'; h1.insertAdjacentElement('afterend', b);
        b.onclick = function () { var vv = vaultNow(); if (!vv) return; var s2 = vv.stories.saved; if (s2[s]) delete s2[s]; else s2[s] = { t: h1.textContent.trim(), u: location.pathname.split('/').pop(), d: todayStr() }; save(cur.id); paintStories(); }; }
      var on2 = !!((vaultNow().stories || {}).saved || {})[s]; b.setAttribute('aria-pressed', String(on2)); b.textContent = on2 ? 'Saved' : 'Save for later';
    } else if (storyPage) { var old = document.getElementById('ggp-page-save'); if (old) old.remove(); }
  }
  function fillForms() {
    var p = cur && getP(cur.id), v = vaultNow(); if (!p || p.age !== 'adult') return;
    document.querySelectorAll('form#inquiry, form.inquiry').forEach(function (f) {
      var n = f.querySelector('input[name="name"]'), e = f.querySelector('input[name="email"]');
      if (n && !n.value) n.value = p.name;
      if (e && !e.value && v.email) e.value = v.email;
    });
  }
  function welcome() {
    var isHome = /(^\/$|\/index\.html$)/.test(location.pathname) && document.querySelector('.hero');
    var box = document.getElementById('ggp-welcome');
    var p = cur && getP(cur.id);
    if (!isHome) return;
    if (!p) { if (box) box.remove(); return; }
    // Your tree is yours. The grove is ours. (Rebrand Session 5)
    var v = vaultNow(), chips = [], ta = toolOf(p), sq = ta.tool === 'Sequoia', pn = ta.tool === 'Pine', bc = ta.tool === 'Birch';
    chips.push([ta.href, 'Tend my tree in ' + ta.tool]);
    chips.push(['/grove/', 'Visit The Grove']);
    var h = ((sq ? v.sequoia : pn ? v.pine : bc ? v.birch : v.oak) || {}).history || [];
    if (h.length) { var last = h[h.length - 1]; chips.push([ta.href, 'Last ' + ta.tool + ' check-in: ' + new Date(last.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })]); }
    else { chips.push([ta.href, 'Take ' + (/^[AEIOU]/.test(ta.tool) ? 'an ' : 'a ') + ta.tool + ' check-in']); }
    if (v.willow && v.willow.started) chips.push(['/willow/', 'My tree in Willow']);
    helping().map(getP).filter(Boolean).forEach(function (q) { if (seqHelp(q.id)) chips.push(['/sequoia/#for=' + q.id, 'Helping ' + q.name]); else if (birchHelp(q.id)) chips.push(['/birch/#for=' + q.id, 'Helping ' + q.name]); else if (oakHelp(q.id)) chips.push(['/oak/#for=' + q.id, 'Helping ' + q.name]); else chips.push(['/willow/#for=' + q.id, (q.shared && q.shared.remembered ? 'Remembering ' : 'Caring for ') + q.name]); });
    var ns = Object.keys((v.stories || {}).saved || {}).length; if (ns) chips.push(['/stories.html#saved', ns + ' saved ' + (ns === 1 ? 'story' : 'stories')]);
    var html = '<div><h2>Welcome back, ' + esc(p.name) + '.</h2><div class="ggp-chips">' + chips.map(function (c) { return '<a class="ggp-chip" href="' + HOME + c[0] + '">' + esc(c[1]) + '</a>'; }).join('') + '</div></div>';
    if (!box) { box = document.createElement('section'); box.id = 'ggp-welcome'; box.className = 'ggp-welcome'; box.setAttribute('aria-label', 'Welcome back'); document.querySelector('.hero').insertAdjacentElement('afterend', box); }
    box.innerHTML = html;
  }
  function paintAll() { try { paintNav(); paintStories(); fillForms(); welcome(); } catch (e) { console.error(e); } }

  /* ---------- Willow helpers ---------- */
  function addHelper(id, helperId, helperPass) {
    var p = getP(id), h = getP(helperId);
    if (!p || !h || !open[id]) return Promise.reject(new Error('Open their profile first.'));
    if (p.age !== 'adult' || h.age !== 'adult') return Promise.reject(new Error('Helpers are for grown-ups.'));
    if (id === helperId) return Promise.reject(new Error('Choose someone else as a helper.'));
    var step = open[helperId] && cur && cur.id === helperId ? Promise.resolve(open[helperId])
      : rawFromPass(h, helperPass || '').then(function (hr) { return readVault(helperId, hr).then(function (hd) { return { raw: hr, data: hd }; }); });
    return step.then(function (H) {
      H.data.keys = H.data.keys || {}; H.data.keys[id] = b64(open[id].raw);
      return writeVault(helperId, H.raw, H.data);
    }).then(function () {
      var q = getP(id); q.helpers = (q.helpers || []).filter(function (x) { return x !== helperId; }).concat(helperId); putP(q); emit('change'); return true;
    });
  }
  function removeHelper(id, helperId) {
    var q = getP(id); if (!q) return false;
    q.helpers = (q.helpers || []).filter(function (x) { return x !== helperId; }); putP(q);
    if (open[helperId] && open[helperId].data.keys && open[helperId].data.keys[id]) { delete open[helperId].data.keys[id]; writeVault(helperId, open[helperId].raw, open[helperId].data); }
    emit('change'); return true;
  }
  // Sequoia (GWG BLD 733): a person you help who turned on Add a Helper in Sequoia.
  function seqHelp(id) { var o = open[id], s = o && o.data && o.data.sequoia; return !!(s && s.helpersOn); }
  // Birch (GWG BLD 742): a person you help who turned on Add a Helper in Birch.
  function birchHelp(id) { var o = open[id], s = o && o.data && o.data.birch; return !!(s && s.helpersOn); }
  function oakHelp(id) { var o = open[id], s = o && o.data && o.data.oak; return !!(s && s.helpersOn); }
  function helping() {
    var a = cur && getP(cur.id); if (!a || a.age !== 'adult') return [];
    return Object.keys(open).filter(function (k) { var q = getP(k); return k !== a.id && q && q.age === 'adult' && (q.helpers || []).indexOf(a.id) > -1; });
  }

  /* =====================================================================
     PUBLIC
     ===================================================================== */
  var readyP = null;
  window.GGP = {
    TERMS_V: TERMS_V, PRIVACY_V: PRIVACY_V, AGES: AGES, ageName: ageName,
    list: function () { return readList().map(function (p) { return { id: p.id, name: p.name, avatar: p.avatar, age: p.age, tree: treeOf(p), grown: p.grown || [], helpers: p.helpers || [], shared: p.shared || {} }; }); },
    get: function (id) { var p = getP(id); return p ? { id: p.id, name: p.name, avatar: p.avatar, age: p.age, tree: treeOf(p), grown: p.grown || [], helpers: p.helpers || [], shared: p.shared || {} } : null; },
    tree: function (id) { return treeOf(getP(id)); },
    setTree: function (id, t) { var p = getP(id); if (!p || p.age !== 'adult' || !open[id]) return false; if (t === 'sequoia' || t === 'birch') p.tree = t; else delete p.tree; putP(p); emit('change'); return true; },
    helpers: function (id) { var p = getP(id); return p ? (p.helpers || []).slice() : []; },
    helping: helping, addHelper: addHelper, removeHelper: removeHelper,
    active: function () { var p = cur && getP(cur.id); return p ? { id: p.id, name: p.name, avatar: p.avatar, age: p.age, until: cur.until } : null; },
    openIds: function () { return Object.keys(open); },
    isOpen: function (id) { return !!open[id]; },
    data: function (id, tool) { id = id || (cur && cur.id); if (!open[id]) return null; var d = open[id].data; if (!tool) return d; if (!d[tool] || typeof d[tool] !== 'object') d[tool] = {}; return d[tool]; },
    setData: function (id, tool, obj) { id = id || (cur && cur.id); if (!open[id]) return false; open[id].data[tool] = obj; return true; },
    save: save,
    shared: function (id) { var p = getP(id); if (!p) return {}; return p.shared || {}; },
    setAvatar: function (id, v) { var p = getP(id); if (!p || !open[id]) return false; p.avatar = v || ''; putP(p); paintAll(); return true; },
    setShared: function (id, obj) { var p = getP(id); if (!p || !open[id]) return false; p.shared = Object.assign(p.shared || {}, obj); putP(p); return true; },
    on: function (fn) { subs.push(fn); }, off: function (fn) { subs = subs.filter(function (x) { return x !== fn; }); },
    lock: lock, openDialog: openDialog, createDialog: createDialog, manage: manage, backup: backup, restore: restore, toast: toast,
    require: function (opt) {
      opt = opt || {};
      if (cur) return Promise.resolve(true);
      var has = readList().length + legacyOak().length;
      return (has ? openDialog(opt) : createDialog(opt)).then(function () { return !!cur; });
    },
    ready: null
  };
  readyP = (subtle ? resume() : Promise.resolve()).then(function () { emit('ready'); });
  window.GGP.ready = readyP;

  function boot() { addCSS(); loadAvatars(); mountNav(); paintAll(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
