/* Grow With Grounded: passcode-locked files (GWG BLD 732).
   Maple's and Aspen's "Save to a file" used to write the kids' or students' check-ins as a plain file anyone
   could read. Now the person chooses a passcode, and the file is locked the same way profiles are:
   PBKDF2 (250,000 rounds, SHA-256) turns the passcode into a key, then AES-GCM locks the data.
   The passcode never leaves the device and is never stored. Older plain files still load.

   GGFileLock.save({app, filename, data, what})  asks for a passcode twice, then saves the locked file.
   GGFileLock.read(text, {app, what})            returns a Promise of the data: asks for the passcode when the
                                                 file is locked; plain older files come back as they are.
   File shape: {app: 'grounded-locked-file', v: 1, for: <app>, saved, salt, iv, ct} (base64). */
(function () {
  if (window.GGFileLock) return;
  var KIND = 'grounded-locked-file', ROUNDS = 250000, subtle = window.crypto && crypto.subtle;
  var enc = new TextEncoder(), dec = new TextDecoder();
  function b64(u) { var s = ''; for (var i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); }
  function unb64(s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function key(pass, salt) {
    return subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveKey']).then(function (base) {
      return subtle.deriveKey({ name: 'PBKDF2', salt: salt, iterations: ROUNDS, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    });
  }
  function css() {
    if (document.getElementById('gfl-css')) return;
    var s = document.createElement('style'); s.id = 'gfl-css';
    s.textContent = '.gfl-back{position:fixed;inset:0;background:rgba(20,14,8,.55);display:grid;place-items:center;z-index:9999;padding:16px;}' +
      '.gfl{background:#FFFCF6;color:#2C1810;border-radius:18px;max-width:420px;width:100%;padding:22px;box-shadow:0 10px 40px rgba(0,0,0,.3);font:16px/1.5 system-ui,sans-serif;}' +
      '.gfl h3{margin:0 0 6px;font-size:21px;}.gfl p{margin:0 0 12px;color:#6B5A4D;font-size:15px;}' +
      '.gfl label{display:block;font-weight:600;font-size:14px;margin:10px 0 4px;}.gfl input{width:100%;box-sizing:border-box;font:inherit;padding:10px 12px;border:1px solid #DDD0B8;border-radius:10px;background:#fff;color:#2C1810;}' +
      '.gfl .gfl-err{color:#A33;font-size:14px;min-height:20px;margin:8px 0 0;}.gfl .gfl-row{display:flex;gap:10px;justify-content:flex-end;margin-top:14px;flex-wrap:wrap;}' +
      '.gfl button{font:inherit;font-weight:600;border-radius:999px;padding:9px 18px;cursor:pointer;border:1px solid #8B5E1A;background:transparent;color:#8B5E1A;}.gfl button.pri{background:#8B5E1A;color:#FFF8EC;}' +
      // Passcode boxes follow the page theme, the switch included, so the box and the typed dots stay readable (GWG BLD 743).
      '.gfl{color-scheme:light;}.gfl input{-webkit-text-fill-color:#2C1810;caret-color:#2C1810;}.gfl input:-webkit-autofill{-webkit-box-shadow:0 0 0 40px #fff inset;box-shadow:0 0 0 40px #fff inset;}' +
      '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .gfl{background:#241A12;color:#F3E9DA;color-scheme:dark;}:root:not([data-theme="light"]) .gfl p{color:#C9B8A2;}:root:not([data-theme="light"]) .gfl .gfl-err{color:#F09A86;}:root:not([data-theme="light"]) .gfl input{background:#1A130D;color:#F3E9DA;-webkit-text-fill-color:#F3E9DA;caret-color:#F3E9DA;border-color:#4A3A2A;}:root:not([data-theme="light"]) .gfl input:-webkit-autofill{-webkit-box-shadow:0 0 0 40px #1A130D inset;box-shadow:0 0 0 40px #1A130D inset;}:root:not([data-theme="light"]) .gfl button{color:#E2B868;border-color:#E2B868;}:root:not([data-theme="light"]) .gfl button.pri{background:#E2B868;color:#241A12;}}' +
      ':root[data-theme="dark"] .gfl{background:#241A12;color:#F3E9DA;color-scheme:dark;}:root[data-theme="dark"] .gfl p{color:#C9B8A2;}:root[data-theme="dark"] .gfl .gfl-err{color:#F09A86;}:root[data-theme="dark"] .gfl input{background:#1A130D;color:#F3E9DA;-webkit-text-fill-color:#F3E9DA;caret-color:#F3E9DA;border-color:#4A3A2A;}:root[data-theme="dark"] .gfl input:-webkit-autofill{-webkit-box-shadow:0 0 0 40px #1A130D inset;box-shadow:0 0 0 40px #1A130D inset;}:root[data-theme="dark"] .gfl button{color:#E2B868;border-color:#E2B868;}:root[data-theme="dark"] .gfl button.pri{background:#E2B868;color:#241A12;}';
    document.head.appendChild(s);
  }
  // A small dialog. fields: [{id, label}]. Resolves with the values, or null when the person cancels.
  function ask(title, lead, fields, okLabel, check) {
    css();
    return new Promise(function (resolve) {
      var back = document.createElement('div'); back.className = 'gfl-back';
      back.innerHTML = '<div class="gfl" role="dialog" aria-modal="true" aria-labelledby="gfl-h"><h3 id="gfl-h">' + esc(title) + '</h3><p>' + esc(lead) + '</p>' +
        fields.map(function (f) { return '<label for="gfl-' + f.id + '">' + esc(f.label) + '</label><input type="password" id="gfl-' + f.id + '" autocomplete="new-password">'; }).join('') +
        '<p class="gfl-err" role="alert"></p><div class="gfl-row"><button type="button" data-g="no">Cancel</button><button type="button" class="pri" data-g="ok">' + esc(okLabel) + '</button></div></div>';
      document.body.appendChild(back);
      var err = back.querySelector('.gfl-err'), first = back.querySelector('input');
      function close(v) { back.remove(); resolve(v); }
      function go() {
        var vals = {}; fields.forEach(function (f) { vals[f.id] = back.querySelector('#gfl-' + f.id).value; });
        var m = check ? check(vals) : ''; if (m) { err.textContent = m; return; }
        close(vals);
      }
      back.addEventListener('click', function (e) { var g = e.target.getAttribute && e.target.getAttribute('data-g'); if (g === 'no') close(null); else if (g === 'ok') go(); });
      back.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); else if (e.key === 'Escape') close(null); });
      setTimeout(function () { first && first.focus(); }, 30);
      ask.err = function (m) { err.textContent = m; };
    });
  }
  function download(filename, text) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' })); a.download = filename;
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function save(o) {
    if (!subtle) { alert('This browser cannot lock a file. Try another browser, or use Back Up Everything.'); return Promise.resolve(false); }
    return ask('Lock this file', 'Choose a passcode for this file. You will need it to load the file again. Grow With Grounded never sees it and cannot recover it.',
      [{ id: 'p1', label: 'Passcode' }, { id: 'p2', label: 'Passcode again' }], 'Save Locked File',
      function (v) { return v.p1.length < 6 ? 'Use at least 6 characters.' : v.p1 !== v.p2 ? 'The two passcodes are different.' : ''; })
      .then(function (v) {
        if (!v) return false;
        var salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
        return key(v.p1, salt).then(function (k) { return subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, enc.encode(JSON.stringify(o.data))); })
          .then(function (ct) {
            download(o.filename, JSON.stringify({ app: KIND, v: 1, for: o.app, saved: new Date().toISOString(), salt: b64(salt), iv: b64(iv), ct: b64(new Uint8Array(ct)) }));
            return true;
          });
      });
  }
  function read(text, o) {
    o = o || {};
    var j; try { j = JSON.parse(text); } catch (e) { return Promise.reject(new Error('bad')); }
    if (!j || j.app !== KIND) return Promise.resolve(j); // an older plain file
    if (o.app && j.for !== o.app) return Promise.reject(new Error('bad'));
    if (!subtle) return Promise.reject(new Error('bad'));
    var salt = unb64(j.salt), iv = unb64(j.iv), ct = unb64(j.ct);
    function attempt(msg) {
      var p = ask('Open a locked file', 'Enter the passcode chosen when this file was saved.', [{ id: 'p', label: 'Passcode' }], 'Open File');
      if (msg) setTimeout(function () { ask.err(msg); }, 0);
      return p.then(function (v) {
        if (!v) return Promise.reject(new Error('cancel'));
        return key(v.p, salt).then(function (k) { return subtle.decrypt({ name: 'AES-GCM', iv: iv }, k, ct); })
          .then(function (pt) { return JSON.parse(dec.decode(pt)); }, function () { return attempt('That passcode does not open this file. Try again.'); });
      });
    }
    return attempt('');
  }
  window.GGFileLock = { save: save, read: read, KIND: KIND };
})();
