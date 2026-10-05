/* Grow With Grounded Backup (one file for everything on this device).
   Made in the Labels, Learn, and Backup build (October 2026).

   GGBackup.make(opts)   saves one file with every Grounded record kept in this browser:
                         every profile (still locked with its own passcode or picture code),
                         The Grove, kids and students saved without a profile, settings, and
                         the Field Guide (still locked with its passcode, Founder and Staff data included).
   GGBackup.load(opts)   opens a file, shows what is inside, lets the person choose, and merges:
                         nothing on this device is erased, and new things are added.
   GGBackup.pick(opts)   asks for a file, then load.

   Files it reads: this backup, older single-profile backups (grounded-profile), and older Field
   Guide backups (grounded-field-guide). Older Maple, Aspen, and Oak practitioner files still load
   through those tools' own buttons.

   The Field Guide is never opened here. If this device has no Field Guide yet, the backup's locked
   Field Guide is put in place. If it already has one, the backup's copy waits (gg-fg-import) and the
   Field Guide asks for that backup's passcode to merge it, the next time it is unlocked. */
(function () {
  if (window.GGBackup) return;
  var APP = 'grow-with-grounded-backup', PENDING = 'gg-fg-import', FG = 'gfg-vault-v1';
  var PLIST = 'gg-profiles-v1', PBOX = 'gg-p:';
  var SKIP = /^(gg-lock-ping|gg-open-ping)$/;
  var SETTINGS = /^(gg_theme|gg_voice.*|gg_read_.*|oak:text-size|sequoia:text-size|willow:text-size|gg-text-size.*)$/;
  var LOOSE = /^(maple:kids|aspen_v1|oak:client.*|oak:profiles|oak:p:.*)$/;

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function today() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function toast(t) { try { if (window.GGP && GGP.toast) return GGP.toast(t); if (window.GGApp && GGApp.toast) return GGApp.toast(t); } catch (e) {} alert(t); }
  function allKeys() { var o = {}; try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (!SKIP.test(k)) o[k] = localStorage.getItem(k); } } catch (e) {} return o; }
  function parse(v) { try { return JSON.parse(v); } catch (e) { return undefined; } }

  /* ---------- make ---------- */
  function make(opts) {
    opts = opts || {};
    return Promise.resolve(opts.before ? opts.before() : null).then(function () {
      var keys = allKeys();
      var file = { app: APP, v: 1, saved: new Date().toISOString(), keys: keys };
      var blob = new Blob([JSON.stringify(file)], { type: 'application/json' }), name = 'grow-with-grounded-backup-' + today() + '.json';
      var done = function () { toast('Backup saved. Profiles and the Field Guide stay locked inside it. Keep the file somewhere private.'); try { localStorage.setItem('gg-last-backup', String(Date.now())); } catch (e) {} if (opts.after) opts.after(); };
      if (window.GGApp && GGApp.share) { return Promise.resolve(GGApp.share(blob, name, 'Grow With Grounded Backup')).then(done, done); }
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 800); done();
    });
  }

  /* ---------- read any supported file into {keys, saved} ---------- */
  function normalize(j) {
    if (!j || typeof j !== 'object') return null;
    if (j.app === APP && j.keys) return { keys: j.keys, saved: j.saved };
    if (j.app === 'grounded-profile' && j.profile && j.profile.id) {
      var k = {}; k[PLIST] = JSON.stringify({ v: 1, list: [j.profile] }); if (j.box) k[PBOX + j.profile.id] = JSON.stringify(j.box);
      return { keys: k, saved: j.saved };
    }
    if (j.app === 'grounded-field-guide' && j.salt) { var f = {}; f[FG] = JSON.stringify(j); return { keys: f, saved: null }; }
    return null;
  }

  /* ---------- merging ---------- */
  function idOf(x) { return x && typeof x === 'object' && (x.id != null) ? 'id:' + x.id : 'j:' + JSON.stringify(x); }
  function deep(cur, inc) {
    if (cur === undefined || cur === null) return inc;
    if (inc === undefined || inc === null) return cur;
    if (Array.isArray(cur) && Array.isArray(inc)) {
      var seen = {}, out = [];
      cur.forEach(function (x) { var k = idOf(x); seen[k] = out.length; out.push(x); });
      inc.forEach(function (x) { var k = idOf(x); if (seen[k] === undefined) { seen[k] = out.length; out.push(x); } else if (x && typeof x === 'object' && (x.u || 0) > ((out[seen[k]] || {}).u || 0)) out[seen[k]] = x; });
      return out;
    }
    if (typeof cur === 'object' && typeof inc === 'object' && !Array.isArray(cur) && !Array.isArray(inc)) {
      var o = {}; Object.keys(cur).forEach(function (k) { o[k] = cur[k]; });
      Object.keys(inc).forEach(function (k) { o[k] = deep(cur[k], inc[k]); });
      return o;
    }
    return cur;
  }
  function mergeGrove(curS, incS) {
    var c = parse(curS), n = parse(incS); if (!c) return incS; if (!n) return curS;
    var m = deep(c, n), gone = Object.assign({}, c.gone || {}, n.gone || {});
    m.gone = gone; m.wall = (m.wall || []).filter(function (p) { return !gone[p.id]; });
    Object.keys(gone).forEach(function (id) { if (m.reacts) delete m.reacts[id]; });
    m.wall.sort(function (a, b) { return String(b.at || b.d || '').localeCompare(String(a.at || a.d || '')); });
    return JSON.stringify(m);
  }
  function mergeJSON(curS, incS) { var c = parse(curS), n = parse(incS); if (c === undefined || n === undefined) return curS; return JSON.stringify(deep(c, n)); }

  /* ---------- what is inside ---------- */
  function survey(keys) {
    var here = allKeys(), plan = { profiles: [], fg: null, grove: null, loose: [], settings: [], other: [] };
    var incList = (parse(keys[PLIST]) || {}).list || [], curList = (parse(here[PLIST]) || {}).list || [];
    incList.forEach(function (p) {
      var mine = curList.filter(function (q) { return q.id === p.id; })[0], box = keys[PBOX + p.id];
      var same = mine && here[PBOX + p.id] === box;
      plan.profiles.push({ p: p, state: !mine ? 'new' : (same ? 'same' : 'differs') });
    });
    Object.keys(keys).forEach(function (k) {
      if (k === PLIST || k.indexOf(PBOX) === 0 || k === 'gg-last-backup') return;
      if (k === FG) { plan.fg = { state: !here[FG] ? 'new' : (here[FG] === keys[FG] ? 'same' : 'differs') }; return; }
      if (k === 'gg-grove-family-v1') { plan.grove = { state: !here[k] ? 'new' : (here[k] === keys[k] ? 'same' : 'differs') }; return; }
      if (LOOSE.test(k)) { if (here[k] !== keys[k]) plan.loose.push(k); return; }
      if (SETTINGS.test(k)) { if (here[k] == null) plan.settings.push(k); return; }
      if (here[k] !== keys[k]) plan.other.push(k);
    });
    return plan;
  }

  /* ---------- dialog ---------- */
  var CSS = '.ggb-wrap{position:fixed;inset:0;z-index:100000;background:rgba(20,14,8,.55);display:flex;align-items:center;justify-content:center;padding:16px;}' +
    '.ggb{background:var(--card,#FFFBF3);color:var(--ink,#2C1810);border:1px solid var(--line,#E2D8C3);border-radius:18px;max-width:520px;width:100%;max-height:calc(100% - 32px);overflow:auto;padding:22px 22px 18px;font-family:Barlow,system-ui,sans-serif;box-shadow:0 20px 50px rgba(0,0,0,.25);}' +
    '.ggb h2{font-family:"Cormorant Garamond",Georgia,serif;font-size:26px;margin:0 0 4px;}' +
    '.ggb p{margin:6px 0;font-size:15px;line-height:1.5;color:var(--ink-soft,#6B5A4D);}' +
    '.ggb h3{font-family:"Barlow Condensed",Barlow,sans-serif;text-transform:uppercase;letter-spacing:1.4px;font-size:13px;color:var(--gold,#8B5E1A);margin:16px 0 6px;}' +
    '.ggb label{display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid var(--line,#E2D8C3);font-size:15px;cursor:pointer;}' +
    '.ggb label input{width:20px;height:20px;margin-top:1px;flex:none;}' +
    '.ggb label small{display:block;color:var(--ink-soft,#6B5A4D);font-size:13px;margin-top:2px;}' +
    '.ggb .row{display:flex;gap:10px;justify-content:flex-end;margin-top:16px;flex-wrap:wrap;}' +
    '.ggb button{font:inherit;font-weight:600;border-radius:999px;padding:10px 18px;min-height:44px;cursor:pointer;border:1px solid var(--gold,#8B5E1A);background:transparent;color:var(--gold,#8B5E1A);}' +
    '.ggb button.pri{background:#8B5E1A;border-color:#8B5E1A;color:#FFF8EC;}' +
    '.ggb .same{opacity:.65;}';
  function dialog(html) {
    if (!document.getElementById('ggb-css')) { var st = document.createElement('style'); st.id = 'ggb-css'; st.textContent = CSS; document.head.appendChild(st); }
    var w = document.createElement('div'); w.className = 'ggb-wrap'; w.innerHTML = '<div class="ggb" role="dialog" aria-modal="true" aria-labelledby="ggb-t">' + html + '</div>';
    document.body.appendChild(w); var f = w.querySelector('button,input'); if (f) f.focus();
    return w;
  }

  function load(file, opts) {
    opts = opts || {};
    return file.text().then(function (txt) {
      var got = normalize(parse(txt));
      if (!got) { alert('That file is not a Grow With Grounded backup. Older Maple, Aspen, Oak, and Sequoia files load from those tools\' own Load buttons.'); return; }
      var plan = survey(got.keys), when = got.saved ? new Date(got.saved).toLocaleDateString() : 'an earlier day';
      var rows = '', any = false;
      function box(id, on, title, sub, dis) { any = any || !dis; return '<label class="' + (dis ? 'same' : '') + '"><input type="checkbox" data-k="' + esc(id) + '"' + (on ? ' checked' : '') + (dis ? ' disabled' : '') + '><span>' + title + (sub ? '<small>' + sub + '</small>' : '') + '</span></label>'; }
      if (plan.profiles.length) {
        rows += '<h3>Profiles</h3>' + plan.profiles.map(function (r) {
          var n = esc(r.p.name || 'A profile');
          if (r.state === 'new') return box('p:' + r.p.id, true, n, 'Added, still locked with its own code.');
          if (r.state === 'same') return box('p:' + r.p.id, false, n, 'Already the same on this device.', true);
          return box('p:' + r.p.id, false, n, 'Also on this device, with different saves. Check this to use the backup\'s copy instead of this device\'s.');
        }).join('');
      }
      if (plan.fg) rows += '<h3>Field Guide</h3>' + (plan.fg.state === 'same' ? box('fg', false, 'Field Guide records', 'Already the same on this device.', true) :
        box('fg', true, 'Field Guide records', plan.fg.state === 'new' ? 'Added, locked with the passcode it was made with.' : 'Merged: nothing on this device is lost. The Field Guide asks for this backup\'s passcode to finish.'));
      if (plan.grove) rows += '<h3>The Grove</h3>' + (plan.grove.state === 'same' ? box('grove', false, 'Your family grove', 'Already the same on this device.', true) : box('grove', true, 'Your family grove', 'Posts, reactions, and family practices are combined.'));
      if (plan.loose.length) rows += '<h3>Saved without a profile</h3>' + box('loose', true, 'Kids, students, and sessions saved on this device without a profile', 'Combined with what is here.');
      if (plan.settings.length || plan.other.length) rows += '<h3>Settings</h3>' + box('rest', true, 'Light or dark, voice, text size, and other settings', 'Only fills in what this device doesn\'t have yet.');
      if (!any) rows += '<p>Everything in this backup is already on this device.</p>';
      var w = dialog('<h2 id="ggb-t">Load a backup</h2><p>From ' + esc(when) + '. Choose what to bring in. Nothing on this device is erased.</p>' + rows +
        '<div class="row"><button type="button" data-x>Cancel</button>' + (any ? '<button type="button" class="pri" data-go>Bring It In</button>' : '') + '</div>');
      w.querySelector('[data-x]').onclick = function () { w.remove(); };
      var go = w.querySelector('[data-go]'); if (!go) return;
      go.onclick = function () {
        var on = {}; w.querySelectorAll('input[data-k]').forEach(function (i) { if (i.checked && !i.disabled) on[i.getAttribute('data-k')] = 1; });
        w.remove(); apply(got.keys, plan, on, opts);
      };
    }).catch(function () { alert('That file could not be read.'); });
  }

  function apply(keys, plan, on, opts) {
    var here = allKeys(), n = 0, fgWaiting = false;
    try {
      var curList = (parse(here[PLIST]) || {}).list || [], incList = (parse(keys[PLIST]) || {}).list || [];
      plan.profiles.forEach(function (r) {
        if (!on['p:' + r.p.id]) return;
        var i = curList.findIndex(function (q) { return q.id === r.p.id; });
        if (i < 0) curList.push(r.p); else curList[i] = r.p;
        if (keys[PBOX + r.p.id]) localStorage.setItem(PBOX + r.p.id, keys[PBOX + r.p.id]); n++;
      });
      if (incList.length) localStorage.setItem(PLIST, JSON.stringify({ v: 1, list: curList }));
      if (plan.fg && on.fg) {
        if (plan.fg.state === 'new') { localStorage.setItem(FG, keys[FG]); n++; }
        else { localStorage.setItem(PENDING, keys[FG]); fgWaiting = true; n++; }
      }
      if (plan.grove && on.grove) { localStorage.setItem('gg-grove-family-v1', here['gg-grove-family-v1'] ? mergeGrove(here['gg-grove-family-v1'], keys['gg-grove-family-v1']) : keys['gg-grove-family-v1']); n++; }
      if (on.loose) plan.loose.forEach(function (k) { localStorage.setItem(k, here[k] == null ? keys[k] : mergeJSON(here[k], keys[k])); n++; });
      if (on.rest) plan.settings.concat(plan.other).forEach(function (k) { if (here[k] == null) { localStorage.setItem(k, keys[k]); n++; } else if (!SETTINGS.test(k)) { var m = mergeJSON(here[k], keys[k]); if (m !== here[k]) { localStorage.setItem(k, m); n++; } } });
    } catch (e) { alert('Something went wrong while loading. This device may be out of space.'); return; }
    var msg = n ? 'Backup loaded.' : 'Nothing new to bring in.';
    if (fgWaiting) msg += ' Open the Field Guide to finish adding its records.';
    if (opts.onFieldGuide && fgWaiting) { opts.onFieldGuide(); }
    toast(msg);
    if (opts.after) opts.after(n); else if (n) setTimeout(function () { location.reload(); }, 1200);
  }

  function pick(opts) {
    var inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.json,application/json';
    inp.onchange = function () { if (inp.files && inp.files[0]) load(inp.files[0], opts); };
    inp.click();
  }

  window.GGBackup = { make: make, load: load, pick: pick, PENDING: PENDING, deep: deep };
})();
