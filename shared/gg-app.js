/* =====================================================================
   GROUNDED APP FOUNDATION (gg-app.js)
   One shared layer so every Grounded tool works the same way on the
   website today and inside its own phone app later (Capacitor).
   Load it first, before the tool's own scripts. On the website nothing
   about saved records changes: same keys, same browser storage.

   Storage
     GGStore.get(key) / set(key, text) / remove(key)
     GGStore.json(key, fallback) / setJSON(key, value)
     On the website: asks the browser to keep this site's storage
     (navigator.storage.persist) so it isn't cleared to save space.
     In an app: every write is also copied into the phone's own
     permanent storage (Capacitor Preferences). If the phone ever
     clears the web storage, the app puts everything back on start.

   Links
     In an app, outside links open the phone's own browser, and tel:,
     sms:, and mailto: open the dialer, messages, and mail. Links to a
     Grounded tool that isn't inside this app open the website instead.

   Files
     GGApp.share(blob, name, title)  the share sheet (text, email, save,
                                     print); downloads on a desktop
     GGApp.sheet({ title, file, blocks, print })
                                     asks "Save or share PDF" or "Print".
                                     In an app it goes straight to the PDF.

   Sending a check-in to The Grove (separate apps, or another phone)
     GGApp.handoff.code(entry)       entry {from, name, age, answers}
     GGApp.handoff.url(entry)        a link to The Grove with the answers
                                     after the #, the part of a link a
                                     browser never sends to any server
     GGApp.handoff.send(entry)       one tap: opens The Grove app on this
                                     phone when it's there, otherwise
                                     shows a QR code for another phone
     GGApp.handoff.pending()         The Grove: a check-in waiting, or null
     GGApp.handoff.clear()

   A card from an Aspen Guide (or Pine Guide) visit, into the student's own tree
     GGApp.visit.url(card, tree)     card {n first name, d date, s strong parts, t tries}
                                     tree 'aspen' (default) or 'pine': a link to that
                                     tree with the card after the #
     GGApp.visit.pending()           Aspen or Pine: a card waiting, or null
     GGApp.visit.clear()

   Share to Family: a person's tree, sent by hand to family on other phones
     GGApp.family.url(o)             o {v, i, n, t, g, p, d, w, m}, see SHARE TO FAMILY
                                     a link to The Grove with the tree after the #
     GGApp.family.pending()          The Grove: a tree waiting, or null
     GGApp.family.bad()              true once if a link arrived that could not be read
     GGApp.family.clear()

   Inside an app, the website's menus are hidden: no site menu, Tools
   panel, or footer links except Privacy and Terms (they open in the
   phone's browser). Lock now stays in the Field Guide.

   Daily reminders (scheduled on the phone, nothing sent to a server)
     GGApp.remind.can()              true inside an app
     GGApp.remind.get(id)            {on, time}
     GGApp.remind.set(id, {on, time, title, body})
   ===================================================================== */
(function () {
  if (window.GGApp) return;

  var CAP = window.Capacitor;
  var NATIVE = !!(CAP && CAP.isNativePlatform && CAP.isNativePlatform());
  var PLATFORM = NATIVE && CAP.getPlatform ? CAP.getPlatform() : 'web';
  var CFG = window.GG_APP_CONFIG || {};          // written by the app build: {app, tools:[...], pages:[...]}
  var P = function (name) { return NATIVE && CAP.Plugins ? CAP.Plugins[name] : null; };
  var SITE = 'https://growwithgrounded.com';
  var TOOLS = ['maple', 'aspen', 'pine', 'oak', 'sequoia', 'grove', 'field-guide'];
  var SCHEMES = { 'maple': 'grounded-maple', 'aspen': 'grounded-aspen', 'pine': 'grounded-pine', 'oak': 'grounded-oak', 'sequoia': 'grounded-sequoia', 'grove': 'grounded-grove', 'field-guide': 'grounded-fieldguide' };

  document.documentElement.classList.add(NATIVE ? 'gg-native' : 'gg-web');
  if (NATIVE) document.documentElement.classList.add('gg-' + PLATFORM);

  // Phone-first: on touch screens, small header buttons and footer links get a full 44px tap area.
  (function () {
    var st = document.createElement('style'); st.id = 'ggx-touch';
    st.textContent = '@media (pointer:coarse){.ggp-btn,.gg-theme{min-width:44px;min-height:44px}' +
      '.site-footer a{display:inline-block;padding-top:8px;padding-bottom:8px}' +
      '.link-btn,.text-btn{min-height:44px}.btn,.gg-rbtn,.gg-rvoice select,select{min-height:44px}}';
    (document.head || document.documentElement).appendChild(st);
  })();

  // Inside an app: hide the website's menus. Privacy and Terms stay, and open in the phone's browser.
  if (NATIVE) (function () {
    var st = document.createElement('style'); st.id = 'ggx-app';
    st.textContent = '.menu-btn,.site-menu,.gn-tools-btn,.gn-panel,.gn-menu-sub,.lock-home[href*="index"],.foot-links a:not([href*="privacy"]):not([href*="terms"]),.gg-sitenav a:not([href*="privacy"]):not([href*="terms"]){display:none!important}' +
      '.topbar .brand,.site-footer .foot-brand{pointer-events:none}';
    (document.head || document.documentElement).appendChild(st);
  })();

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---------------- STORAGE ---------------- */
  var LS = null; try { LS = window.localStorage; LS.getItem('gg-probe'); } catch (e) { LS = null; }
  var MIRROR = 'ls:';
  var PREFS = P('Preferences');

  if (NATIVE && LS && PREFS) {
    // Copy every write into the phone's permanent storage too.
    var sp = Storage.prototype, setI = sp.setItem, remI = sp.removeItem, clr = sp.clear;
    sp.setItem = function (k, v) { setI.call(this, k, v); if (this === LS) { try { PREFS.set({ key: MIRROR + k, value: String(v) }); } catch (e) {} } };
    sp.removeItem = function (k) { remI.call(this, k); if (this === LS) { try { PREFS.remove({ key: MIRROR + k }); } catch (e) {} } };
    sp.clear = function () { var keys = []; if (this === LS) for (var i = 0; i < LS.length; i++) keys.push(LS.key(i)); clr.call(this); if (this === LS) keys.forEach(function (k) { try { PREFS.remove({ key: MIRROR + k }); } catch (e) {} }); };
    // On start: put back anything the phone cleared, then mirror anything not yet copied.
    var restoring = false;
    try { restoring = sessionStorage.getItem('gg-restored') === '1'; } catch (e) {}
    PREFS.keys().then(function (r) {
      var keys = (r && r.keys) || [], missing = 0, jobs = [];
      keys.forEach(function (pk) {
        if (pk.indexOf(MIRROR) !== 0) return;
        var k = pk.slice(MIRROR.length);
        if (LS.getItem(k) !== null) return;
        jobs.push(PREFS.get({ key: pk }).then(function (g) { if (g && g.value != null) { setI.call(LS, k, g.value); missing++; } }));
      });
      return Promise.all(jobs).then(function () {
        for (var i = 0; i < LS.length; i++) { var k = LS.key(i); if (keys.indexOf(MIRROR + k) < 0) { try { PREFS.set({ key: MIRROR + k, value: LS.getItem(k) }); } catch (e) {} } }
        if (missing && !restoring) { try { sessionStorage.setItem('gg-restored', '1'); } catch (e) {} location.reload(); }
      });
    }).catch(function () {});
  } else if (LS && navigator.storage && navigator.storage.persist) {
    // Website: ask the browser to keep this site's saved records.
    try { navigator.storage.persisted().then(function (on) { if (!on) navigator.storage.persist().catch(function () {}); }).catch(function () {}); } catch (e) {}
  }

  window.GGStore = {
    get: function (k) { try { return LS ? LS.getItem(k) : null; } catch (e) { return null; } },
    set: function (k, v) { try { if (LS) { LS.setItem(k, String(v)); return true; } } catch (e) {} return false; },
    remove: function (k) { try { if (LS) LS.removeItem(k); } catch (e) {} },
    json: function (k, fb) { try { var v = JSON.parse(LS.getItem(k)); return v == null ? fb : v; } catch (e) { return fb; } },
    setJSON: function (k, v) { return this.set(k, JSON.stringify(v)); },
    keys: function () { var o = []; try { for (var i = 0; i < LS.length; i++) o.push(LS.key(i)); } catch (e) {} return o; }
  };

  /* ---------------- THE SIX PARTS RENAME (Oct 2026, Rebrand Session 4) ----------------
     The six parts are named the same way everywhere, on screen and behind the scenes:
     Roots (What grounds you), Trunk (Purpose), Bark (Mind and feelings),
     Branches (Relationships), Leaves (Body), Fruit (Hope). Code names match the tree
     part: roots, trunk, bark, branches, leaves, fruit. Records saved before used the old
     code names. GGParts.fix brings a tree app's own records forward, on this device only.
     Never run it on The Grove's records: The Grove's practice strands (mind, body, hope)
     are not parts. Lines marked GG-PARTS-KEEP hold the old names on purpose. */
  var PK = { holy: 'roots', meaning: 'trunk', mind: 'bark', community: 'branches', body: 'leaves', hope: 'fruit' }; // GG-PARTS-KEEP
  var PK_VAL = { key: 1, part: 1, k: 1 };                 // fields that hold one part name
  var PK_LIST = { unsure: 1, parts: 1, done: 1, s: 1, strong: 1, order: 1 }; // fields that hold a list of part names
  var PK_NAME = { Holy: 'What grounds you', Meaning: 'Purpose', Mind: 'Mind and feelings', Community: 'Relationships' }; // GG-PARTS-KEEP
  function pkHas(k) { return typeof k === 'string' && Object.prototype.hasOwnProperty.call(PK, k); }
  function pkId(s) { return pkHas(s) ? PK[s] : s; }
  function pkTag(s) {
    // "holy|Prayer" (a practice id) and "p:holy" (a visit step) carry a part name in front.
    if (typeof s !== 'string') return s;
    var i = s.indexOf('|'); if (i > 0 && pkHas(s.slice(0, i))) return PK[s.slice(0, i)] + s.slice(i);
    if (s.indexOf('p:') === 0 && pkHas(s.slice(2))) return 'p:' + PK[s.slice(2)];
    return s;
  }
  function pkFix(x, depth) {
    depth = depth || 0; if (!x || typeof x !== 'object' || depth > 40) return x;
    if (Array.isArray(x)) { for (var i = 0; i < x.length; i++) { if (typeof x[i] === 'string') x[i] = pkTag(x[i]); else pkFix(x[i], depth + 1); } return x; }
    var keys = Object.keys(x), allParts = keys.length > 0 && keys.every(pkHas);
    keys.forEach(function (k) {
      var v = x[k];
      if (typeof v === 'string') v = x[k] = PK_VAL[k] ? pkId(pkTag(v)) : pkTag(v);
      else if (Array.isArray(v) && PK_LIST[k]) v = x[k] = v.map(function (e) { return typeof e === 'string' ? pkId(e) : pkFix(e, depth + 1); });
      else pkFix(v, depth + 1);
      var nk = allParts ? PK[k] : pkTag(k);
      if (nk !== k) { if (x[nk] == null) x[nk] = v; delete x[k]; }
    });
    return x;
  }
  window.GGParts = { id: pkId, tag: pkTag, fix: pkFix, name: function (n) { return Object.prototype.hasOwnProperty.call(PK_NAME, n) ? PK_NAME[n] : n; } };

  /* ---------------- LINKS ---------------- */
  function toolOf(url) {
    var m = /^\/([a-z-]+)\//.exec(url.pathname || '');
    return m && TOOLS.indexOf(m[1]) >= 0 ? m[1] : null;
  }
  function openOutside(href) {
    var B = P('Browser'), L = P('AppLauncher');
    if (/^(tel|sms|mailto):/i.test(href)) {             // the phone's own dialer, messages, or mail
      if (L) { L.openUrl({ url: href }).catch(function () { location.href = href; }); return; }
      location.href = href; return;
    }
    if (B && /^https?:/i.test(href)) { B.open({ url: href }).catch(function () { window.open(href, '_blank'); }); return; }
    window.open(href, '_system');
  }
  // Another Grounded tool: its own app when it's on this phone, otherwise the website.
  function openTool(t, web) {
    var L = P('AppLauncher'), sc = SCHEMES[t];
    if (!L || !sc) { openOutside(web); return; }
    L.canOpenUrl({ url: sc + '://' }).then(function (r) { if (r && r.value) return L.openUrl({ url: sc + '://open' }); openOutside(web); }).catch(function () { openOutside(web); });
  }
  if (NATIVE) {
    document.addEventListener('click', function (ev) {
      var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
      if (!a || ev.defaultPrevented) return;
      var href = a.getAttribute('href') || '';
      if (/^(tel|sms|mailto):/i.test(href)) { ev.preventDefault(); openOutside(href); return; }
      if (!/^https?:/i.test(a.href)) return;
      var u; try { u = new URL(a.href); } catch (e) { return; }
      var ours = u.host === location.host || /(^|\.)growwithgrounded\.com$/.test(u.hostname);
      if (ours) {
        var t = toolOf(u), mine = (CFG.tools || []);
        if (t && mine.indexOf(t) >= 0) {           // part of this app: stay inside it
          if (u.host !== location.host) { ev.preventDefault(); location.href = u.pathname + u.search + u.hash; }
          return;
        }
        if (u.host === location.host && !t) {        // a page in the app bundle stays; a website page opens the browser
          var pages = CFG.pages || null, path = u.pathname.replace(/\/index\.html$/, '/');
          if (!pages || pages.indexOf(path) >= 0 || /\.(pdf|png|jpe?g|svg|json|js|css)$/i.test(path)) return;
          ev.preventDefault(); openOutside(SITE + u.pathname + u.search); return;
        }
        ev.preventDefault();
        if (t) openTool(t, SITE + u.pathname + u.search); else openOutside(SITE + u.pathname + u.search);
        return;
      }
      ev.preventDefault(); openOutside(a.href);
    }, true);
  }

  /* ---------------- SMALL DIALOG ---------------- */
  var CSS = '.ggx-back{position:fixed;inset:0;z-index:2147483000;background:rgba(28,18,10,.55);display:flex;align-items:flex-end;justify-content:center;padding:16px;padding-bottom:calc(16px + env(safe-area-inset-bottom,0px))}' +
    '@media(min-width:600px){.ggx-back{align-items:center}}' +
    '.ggx{background:#FAF7F2;color:#2C1810;border-radius:20px;max-width:440px;width:100%;padding:24px 22px 18px;font-family:Barlow,system-ui,sans-serif;font-size:17px;line-height:1.45;box-shadow:0 20px 50px rgba(0,0,0,.3);max-height:calc(100vh - 32px);overflow:auto}' +
    '.ggx h2{font-family:"Cormorant Garamond",Georgia,serif;font-size:26px;font-weight:600;margin:0 0 6px;line-height:1.15}' +
    '.ggx p{margin:0 0 12px;color:#4A3B30}.ggx .ggx-btns{display:flex;flex-direction:column;gap:10px;margin-top:16px}' +
    '.ggx button{min-height:50px;border-radius:14px;font:600 17px Barlow,system-ui,sans-serif;cursor:pointer;border:2px solid #8B5E1A;padding:10px 16px}' +
    '.ggx .ggx-main{background:#8B5E1A;color:#fff}.ggx .ggx-line{background:transparent;color:#8B5E1A}.ggx .ggx-quiet{border-color:transparent;background:transparent;color:#66564A;min-height:44px}' +
    '.ggx button:focus-visible{outline:3px solid #2C6E8F;outline-offset:2px}.ggx .ggx-qr{background:#fff;border-radius:14px;padding:14px;margin:6px auto 12px;max-width:260px}.ggx .ggx-qr svg{display:block;width:100%;height:auto}' +
    '.ggx .ggx-small{font-size:14px;color:#66564A}' +
    '[data-theme=dark] .ggx{background:#241A13;color:#F3EADB}[data-theme=dark] .ggx p{color:#D9CBB5}[data-theme=dark] .ggx .ggx-small,[data-theme=dark] .ggx .ggx-quiet{color:#BFAF98}[data-theme=dark] .ggx .ggx-line{color:#E2B66E;border-color:#E2B66E}' +
    '@media(prefers-color-scheme:dark){:root:not([data-theme=light]) .ggx{background:#241A13;color:#F3EADB}:root:not([data-theme=light]) .ggx p{color:#D9CBB5}:root:not([data-theme=light]) .ggx .ggx-small,:root:not([data-theme=light]) .ggx .ggx-quiet{color:#BFAF98}:root:not([data-theme=light]) .ggx .ggx-line{color:#E2B66E;border-color:#E2B66E}}';
  function styleOnce() { if (document.getElementById('ggx-css')) return; var s = document.createElement('style'); s.id = 'ggx-css'; s.textContent = CSS; document.head.appendChild(s); }
  // dialog({title, html, buttons:[{t, kind:'main'|'line'|'quiet', fn}]}) returns a close function.
  function dialog(o) {
    styleOnce();
    var back = document.createElement('div'); back.className = 'ggx-back';
    var prev = document.activeElement;
    back.innerHTML = '<div class="ggx" role="dialog" aria-modal="true" aria-labelledby="ggx-t"><h2 id="ggx-t">' + esc(o.title) + '</h2>' + (o.html || '') +
      '<div class="ggx-btns">' + (o.buttons || []).map(function (b, i) { return '<button type="button" class="ggx-' + (b.kind || 'line') + '" data-i="' + i + '">' + esc(b.t) + '</button>'; }).join('') + '</div></div>';
    function close() { back.remove(); document.removeEventListener('keydown', key); if (prev && prev.focus) try { prev.focus(); } catch (e) {} }
    function key(e) { if (e.key === 'Escape') close(); }
    back.addEventListener('click', function (e) {
      if (e.target === back) { close(); return; }
      var b = e.target.closest('button[data-i]'); if (!b) return;
      var f = o.buttons[+b.dataset.i]; close(); if (f && f.fn) f.fn();
    });
    document.addEventListener('keydown', key);
    document.body.appendChild(back);
    var first = back.querySelector('button'); if (first) first.focus();
    return close;
  }
  function toast(msg) {
    if (typeof window.toast === 'function') { try { window.toast(msg); return; } catch (e) {} }
    if (typeof window.showToast === 'function') { try { window.showToast(msg); return; } catch (e) {} }
    styleOnce();
    var t = document.createElement('div');
    t.setAttribute('role', 'status');
    t.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);bottom:calc(24px + env(safe-area-inset-bottom,0px));background:#2C1810;color:#fff;padding:12px 18px;border-radius:12px;font:500 16px Barlow,system-ui,sans-serif;z-index:2147483001;max-width:90vw';
    t.textContent = msg; document.body.appendChild(t); setTimeout(function () { t.remove(); }, 3200);
  }

  /* ---------------- FILES ---------------- */
  function b64(blob) { return new Promise(function (res, rej) { var r = new FileReader(); r.onload = function () { res(String(r.result).split(',')[1]); }; r.onerror = rej; r.readAsDataURL(blob); }); }
  function share(blob, name, title) {
    var FS = P('Filesystem'), SH = P('Share');
    if (FS && SH) {
      return b64(blob).then(function (data) { return FS.writeFile({ path: name, data: data, directory: 'CACHE' }); })
        .then(function (w) { return SH.share({ title: title || name, files: [w.uri], dialogTitle: title || name }); })
        .catch(function (e) { if (e && /cancel/i.test(String(e.message || e))) return; toast('That file could not be shared. Try again.'); });
    }
    try {
      var f = new File([blob], name, { type: blob.type || 'application/pdf' });
      if (navigator.canShare && navigator.canShare({ files: [f] }) && (navigator.maxTouchPoints > 0)) {
        return navigator.share({ files: [f], title: title || name }).catch(function (e) { if (e && e.name !== 'AbortError') download(blob, name); });
      }
    } catch (e) {}
    download(blob, name); return Promise.resolve();
  }
  function download(blob, name) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500); toast('Saved as ' + name + '.');
  }
  // sheet({title, file, blocks: () => [...] , print: () => {}}): PDF for the share sheet, Print as a backup.
  function sheet(o) {
    function pdf() {
      if (!window.ggPdf) { if (o.print) o.print(); return; }
      var bl; try { bl = typeof o.blocks === 'function' ? o.blocks() : o.blocks; } catch (e) { bl = null; }
      if (!bl || !bl.length) { if (o.print) o.print(); return; }
      share(window.ggPdf(bl), o.file || 'grounded.pdf', o.title);
    }
    if (NATIVE || !o.print) { pdf(); return; }
    dialog({ title: o.title || 'Save or Print', html: '<p>Save it as a PDF to keep, text, or email, or print it now.</p>' + (o.note ? '<p class="ggx-small">' + esc(o.note) + '</p>' : ''),
      buttons: [{ t: 'Save or Share PDF', kind: 'main', fn: pdf }, { t: 'Print', kind: 'line', fn: o.print }, { t: 'Cancel', kind: 'quiet' }] });
  }

  /* ---------------- HANDOFF TO THE GROVE ---------------- */
  var FROM = { 'maple': 'Maple', 'aspen': 'Aspen', 'pine': 'Pine', 'oak': 'Oak', 'sequoia': 'Sequoia' };
  var AGES = ['maple', 'aspen', 'pine', 'adult'];
  function enc64(s) { return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function dec64(s) { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return decodeURIComponent(escape(atob(s))); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function today() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  // Only these fields travel, and only in this shape.
  function clean(e) {
    if (!e || !FROM[e.from]) return null;
    var ans = {}, n = 0;
    Object.keys(e.answers || e.a || {}).forEach(function (k) {
      var v = +(e.answers || e.a)[k];
      if (/^[a-z]{2,12}\.\d{1,2}$/.test(k) && v >= 1 && v <= 5 && n < 60) { ans[k] = Math.round(v); n++; }
    });
    if (!n) return null;
    var age = AGES.indexOf(e.age) >= 0 ? e.age : 'adult';
    var dd = String(e.date || e.d || ''), date = today();
    if (/^\d{4}-\d\d-\d\d$/.test(dd)) date = dd;
    else if (/^\d{4}-\d\d-\d\dT/.test(dd)) { var x = new Date(dd); if (!isNaN(x)) date = x.getFullYear() + '-' + pad(x.getMonth() + 1) + '-' + pad(x.getDate()); }
    return { from: e.from, name: String(e.name || e.n || '').replace(/[<>]/g, '').slice(0, 40), age: age, date: date, answers: ans };
  }
  function code(entry) {
    var c = clean(entry); if (!c) return '';
    return 'g1.' + enc64(JSON.stringify({ f: c.from, n: c.name, g: c.age, d: c.date, a: c.answers }));
  }
  function unpack(s) {
    try {
      if (!/^g1\./.test(s)) return null;
      var j = JSON.parse(dec64(s.slice(3)));
      return clean({ from: j.f, name: j.n, age: j.g, date: j.d, answers: j.a });
    } catch (e) { return null; }
  }
  var PEND = 'gg-handoff-in', VPEND = 'gg-visit-in';
  function takeHash(h) {
    var m = /[#&]gg-in=([A-Za-z0-9._-]+)/.exec(h || ''); if (!m) return false;
    var c = unpack(m[1]);
    if (c) { try { sessionStorage.setItem(PEND, JSON.stringify(c)); } catch (e) {} }
    return true;
  }

  /* ---------------- A CARD FROM AN ASPEN GUIDE VISIT ----------------
     Only a first name, the date, strong part names, and what the student chose to try. Never levels,
     notes, safety answers, the optional question, or a guide's or grown-up's name. */
  var VPARTS = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];
  function vclean(v) {
    if (!v || typeof v !== 'object') return null;
    var name = String(v.n || '').replace(/[<>]/g, '').trim().split(/\s+/)[0] || '';
    var d = String(v.d || ''); if (!/^\d{4}-\d\d-\d\d$/.test(d)) return null;
    var strong = []; (Array.isArray(v.s) ? v.s : []).forEach(function (k) { k = pkId(k); if (VPARTS.indexOf(k) >= 0 && strong.indexOf(k) < 0) strong.push(k); });
    var tries = []; (Array.isArray(v.t) ? v.t : []).forEach(function (t) {
      if (!Array.isArray(t) || tries.length >= 4 || VPARTS.indexOf(pkId(t[0])) < 0) return;
      var a = String(t[1] || '').replace(/[<>]/g, '').slice(0, 60), b = String(t[2] || '').replace(/[<>]/g, '').slice(0, 240);
      if (a) tries.push([pkId(t[0]), a, b]);
    });
    if (!strong.length && !tries.length) return null;
    return { n: name.slice(0, 30), d: d, s: strong, t: tries };
  }
  function vcode(v) { var c = vclean(v); return c ? 'v1.' + enc64(JSON.stringify(c)) : ''; }
  function vunpack(s) { try { if (!/^v1\./.test(s)) return null; return vclean(JSON.parse(dec64(s.slice(3)))); } catch (e) { return null; } }
  // tree: 'aspen' (the default) or 'pine', so a Pine Guide can send a card into the teen's own Pine.
  var VTREES = { aspen: '/aspen/', pine: '/pine/' };
  function vurl(v, tree) { var c = vcode(v); return c ? SITE + (VTREES[tree] || VTREES.aspen) + '#gg-visit=' + c : ''; }
  function takeVisit(h) {
    var m = /[#&]gg-visit=([A-Za-z0-9._-]+)/.exec(h || ''); if (!m) return false;
    var c = vunpack(m[1]);
    if (c) { try { sessionStorage.setItem(VPEND, JSON.stringify(c)); } catch (e) {} }
    return true;
  }

  /* ---------------- SHARE TO FAMILY (BLD 732) ----------------
     A person's tree, sent by hand from their own tree app to family on other phones.
     No server: the tree rides after the # in a link to The Grove, and The Grove asks
     before adding it. Only these fields travel, and only in this exact shape:
       v  1 (the format)
       i  a random share id that stays the same for that person (12 letters and digits)
       n  first name
       t  which tree: maple, aspen, pine, oak, or sequoia
       g  days tended (how grown the tree is drawn)
       p  parts tended in the 7 days before it was made, as digits 0 to 5 in PART order
       d  1 if they tended on the day it was made, otherwise 0
       w  days tended that week (Monday to Sunday), 0 to 7
       m  when it was made, in seconds (a newer code replaces an older one)
     Never answers, scores, levels, notes, journals, safety or faith answers, or the growth plan.
     Anything else in a code, or anything out of shape, and the whole code is ignored. */
  var FPARTS = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'], FTREES = ['maple', 'aspen', 'pine', 'oak', 'sequoia'];
  var FKEYS = ['v', 'i', 'n', 't', 'g', 'p', 'd', 'w', 'm'], FPEND = 'gg-fam-in', FBAD = 'gg-fam-bad';
  var F_EARLIEST = 1767225600;   // January 1, 2026
  function fname(s) {
    s = String(s == null ? '' : s).trim().split(/\s+/)[0] || '';
    return s.length >= 1 && s.length <= 24 && !/[<>&"`\\\u0000-\u001F\u007F]/.test(s) ? s : '';
  }
  function fint(x, lo, hi) { return typeof x === 'number' && Math.floor(x) === x && x >= lo && x <= hi; }
  function fclean(o) {
    if (!o || typeof o !== 'object' || Array.isArray(o)) return null;
    var ks = Object.keys(o);
    if (ks.length !== FKEYS.length || ks.some(function (k) { return FKEYS.indexOf(k) < 0; })) return null;
    if (o.v !== 1) return null;
    if (typeof o.i !== 'string' || !/^[A-Za-z0-9_-]{12}$/.test(o.i)) return null;
    if (typeof o.n !== 'string' || fname(o.n) !== o.n) return null;
    if (FTREES.indexOf(o.t) < 0) return null;
    if (!fint(o.g, 0, 36500) || !fint(o.d, 0, 1) || !fint(o.w, 0, 7)) return null;
    if ((o.d && !o.w) || o.w > o.g) return null;
    if (typeof o.p !== 'string' || !/^0?1?2?3?4?5?$/.test(o.p)) return null;
    if (!fint(o.m, F_EARLIEST, Math.floor(Date.now() / 1000) + 2 * 86400)) return null;
    return { v: 1, i: o.i, n: o.n, t: o.t, g: o.g, p: o.p, d: o.d, w: o.w, m: o.m };
  }
  function fcode(o) { var c = fclean(o); return c ? 'f1.' + enc64(JSON.stringify(c)) : ''; }
  function funpack(s) { try { if (typeof s !== 'string' || s.length > 400 || !/^f1\.[A-Za-z0-9_-]+$/.test(s)) return null; return fclean(JSON.parse(dec64(s.slice(3)))); } catch (e) { return null; } }
  function furl(o) { var c = fcode(o); return c ? SITE + '/grove/#gg-fam=' + c : ''; }
  function fid() {
    var b = new Uint8Array(9);
    try { crypto.getRandomValues(b); } catch (e) { for (var i = 0; i < 9; i++) b[i] = Math.floor(Math.random() * 256); }
    return btoa(String.fromCharCode.apply(null, b)).replace(/\+/g, '-').replace(/\//g, '_');
  }
  function takeFam(h) {
    var m = /[#&]gg-fam=([^&]*)/.exec(h || ''); if (!m) return false;
    var c = funpack(m[1]);
    try { if (c) { sessionStorage.setItem(FPEND, JSON.stringify(c)); sessionStorage.removeItem(FBAD); } else sessionStorage.setItem(FBAD, '1'); } catch (e) {}
    return true;
  }

  // The Grove (or Aspen, or Pine) reads what arrived in its own link, then wipes it from the address bar right away.
  if (takeHash(location.hash) | takeVisit(location.hash) | takeFam(location.hash)) { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} }
  // A link opened while the page is already open (same tab) only changes the part after the #.
  window.addEventListener('hashchange', function () {
    var h = location.hash, a = takeHash(h), v = takeVisit(h), f = takeFam(h);
    if (!a && !v && !f) return;
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    try { if (a) window.dispatchEvent(new CustomEvent('gg-handoff')); if (v) window.dispatchEvent(new CustomEvent('gg-visit')); if (f) window.dispatchEvent(new CustomEvent('gg-fam')); } catch (e) {}
  });
  var APP = P('App');
  if (APP && APP.addListener) {
    APP.addListener('appUrlOpen', function (d) {
      var u = (d && d.url) || '', h = u.slice(u.indexOf('#'));
      if (takeHash(h)) { try { window.dispatchEvent(new CustomEvent('gg-handoff')); } catch (e) {} }
      if (takeVisit(h)) { try { window.dispatchEvent(new CustomEvent('gg-visit')); } catch (e) {} }
      if (takeFam(h)) { try { window.dispatchEvent(new CustomEvent('gg-fam')); } catch (e) {} }
    });
  }
  function url(entry) { var c = code(entry); return c ? SITE + '/grove/#gg-in=' + c : ''; }
  function qrDialog(entry, why) {
    var link = url(entry); if (!link) { toast('There is nothing to send yet.'); return; }
    var svg = '';
    try { if (window.GGQR) svg = window.GGQR.svg(link); } catch (e) { svg = ''; }
    var who = entry.name ? esc(entry.name) + "'s" : 'These';
    dialog({
      title: 'Send to The Grove',
      html: (why ? '<p>' + esc(why) + '</p>' : '') +
        (svg ? '<div class="ggx-qr" aria-label="QR code for The Grove">' + svg + '</div><p>Scan this with the phone or tablet that has The Grove. ' + who + ' answers travel inside the code, phone to phone.</p>' : '<p>Copy the link and open it on the phone or tablet that has The Grove.</p>') +
        '<p class="ggx-small">Nothing is uploaded. The answers ride after the # in the link, the part a browser never sends to any server, and The Grove asks before adding them to anyone\'s tree.</p>',
      buttons: [{ t: 'Copy the Link', kind: svg ? 'line' : 'main', fn: function () {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(link).then(function () { toast('Link copied.'); }, function () { toast('Copy did not work on this device.'); });
        else toast('Copy did not work on this device.');
      } }, { t: 'Done', kind: 'quiet' }]
    });
  }
  // One tap: The Grove app on this phone if it's there, otherwise a QR code.
  function send(entry) {
    var c = code(entry); if (!c) { toast('There is nothing to send yet.'); return Promise.resolve(false); }
    var L = P('AppLauncher');
    if (NATIVE && L && CFG.app !== 'grove') {
      var target = SCHEMES.grove + '://in#gg-in=' + c;
      return L.canOpenUrl({ url: SCHEMES.grove + '://' }).then(function (r) {
        if (r && r.value) return L.openUrl({ url: target }).then(function () { return true; });
        qrDialog(entry, 'The Grove app isn\'t on this phone. Get The Grove, or send these answers to another phone.'); return false;
      }).catch(function () { qrDialog(entry); return false; });
    }
    qrDialog(entry); return Promise.resolve(false);
  }

  /* ---------------- DAILY REMINDERS ---------------- */
  var RKEY = 'gg-reminders-v1', RID = { grove: 1001, maple: 1002, aspen: 1003, 'oak': 1004, sequoia: 1005, pine: 1006 };
  var remind = {
    can: function () { return !!P('LocalNotifications'); },
    get: function (id) { var all = GGStore.json(RKEY, {}); return all[id] || { on: false, time: '07:00' }; },
    set: function (id, o) {
      var all = GGStore.json(RKEY, {}), cur = all[id] || {};
      var r = { on: !!o.on, time: /^\d\d:\d\d$/.test(o.time || '') ? o.time : (cur.time || '07:00'), title: String(o.title || cur.title || 'Grounded'), body: String(o.body || cur.body || '') };
      all[id] = r; GGStore.setJSON(RKEY, all);
      var LN = P('LocalNotifications'); if (!LN) return Promise.resolve(false);
      var nid = RID[id] || 1099;
      return LN.cancel({ notifications: [{ id: nid }] }).catch(function () {}).then(function () {
        if (!r.on) return false;
        return LN.requestPermissions().then(function (p) {
          if (!p || p.display !== 'granted') { toast('Reminders are off for this app in your phone\'s settings.'); return false; }
          var hm = r.time.split(':');
          return LN.schedule({ notifications: [{ id: nid, title: r.title, body: r.body, schedule: { on: { hour: +hm[0], minute: +hm[1] }, allowWhileIdle: true } }] }).then(function () { return true; });
        });
      });
    }
  };

  window.GGApp = {
    native: NATIVE, platform: PLATFORM, app: CFG.app || null, config: CFG,
    store: window.GGStore, share: share, download: download, sheet: sheet, dialog: dialog, toast: toast, esc: esc, open: openOutside,
    handoff: {
      code: code, url: url, send: send, qr: qrDialog, unpack: unpack,
      pending: function () { try { return clean(JSON.parse(sessionStorage.getItem(PEND))); } catch (e) { return null; } },
      clear: function () { try { sessionStorage.removeItem(PEND); } catch (e) {} },
      fromName: function (f) { return FROM[f] || 'another Grounded tool'; }
    },
    family: {
      code: fcode, url: furl, unpack: funpack, clean: fclean, newId: fid, firstName: fname, parts: FPARTS.slice(),
      pending: function () { try { return fclean(JSON.parse(sessionStorage.getItem(FPEND))); } catch (e) { return null; } },
      bad: function () { try { var b = sessionStorage.getItem(FBAD) === '1'; sessionStorage.removeItem(FBAD); return b; } catch (e) { return false; } },
      clear: function () { try { sessionStorage.removeItem(FPEND); } catch (e) {} }
    },
    visit: {
      code: vcode, url: vurl, unpack: vunpack,
      pending: function () { try { return vclean(JSON.parse(sessionStorage.getItem(VPEND))); } catch (e) { return null; } },
      clear: function () { try { sessionStorage.removeItem(VPEND); } catch (e) {} }
    },
    remind: remind
  };
})();
