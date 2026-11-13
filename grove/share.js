/* =====================================================================
   THE GROVE ACROSS PHONES (grove/share.js)   GWG BLD 982 Round 1, Chris's decision 5, the safe design
   A grove on this device can be shared with a group's phones through Grounded Accounts (the Worker's /groves routes,
   worker/src/groves.js in grounded-workshop). Shared: the group's week plan (practice ids), a checkmark for who did
   today's practice, group totals, and cheers picked from a set list (no typing). Never shared: check-in answers, the
   growth plan's words, journals, notes, or anything personal; they stay locked on each device.
   Grown up accounts only: kids never get accounts here. A classroom grove lives on the teacher's account (the smartboard
   and the teacher's phone), so it shares only the teacher's checkmarks and the class totals. People join with a group code
   the leader shares in person. Which shared grove a grove on this device follows is kept on this device (gg-grove-share).
   The Grove app calls GGGroveShare.cardHtml(grove) in Our Grove; this file fills the card and keeps it fresh.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGGroveShare) return;
  var KEY = 'gg-grove-share', esc = function (x) { return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var CHEERS = (window.GG_CLASS && GG_CLASS.cheers) || ['Nice work!', 'We did it together!', 'Proud of our grove!', 'Thank you for showing up!', 'Keep growing!', 'Way to go!', 'Glad you are here!', 'One day at a time!'];
  var S = { local: null, kind: '', name: '', data: null, err: '', busy: false, view: '', code: '', when: 0, timer: 0 };
  function links() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } }
  function setLink(local, id) { try { var L = links(); if (id) L[local] = id; else delete L[local]; localStorage.setItem(KEY, JSON.stringify(L)); } catch (e) {} }
  function today() { var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); }; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); }
  function weekOf(day) { var d = new Date(day + 'T12:00:00Z'), w = (d.getUTCDay() + 6) % 7; return new Date(d.getTime() - w * 86400000).toISOString().slice(0, 10); }
  function acct() { return window.GGAccount && GGAccount._ && GGAccount._.api ? GGAccount : null; }
  function signedIn() { var A = acct(); return !!(A && A.info && A.info()); }
  function api(m, p, b) { return acct()._.api(m, p, b == null ? null : b); }
  var WORDS = { grown: 'Sharing a grove is for grown up accounts. Kids and teens join in on the grove device.', code: 'That code opens no grove. Check the letters with your leader.', leader: 'Only the grove\'s leader can do that.',
    name: 'Use letters only for a name, up to 24 for yours and 40 for the grove.', full: 'That grove is full, or you are in as many groves as an account can hold.', confirm: 'Confirm your email first, from the message Grounded sent.',
    none: 'That grove has ended, or you are no longer in it.', wait: 'That is a lot of tries. Give it a little while, then try again.', offline: 'You look offline. The grove is saved here and shares again once you are back online.' };
  function say(e) { var w = e && e.why;
    if (w === 'none' && !links()[S.local]) return 'Sharing across phones is getting ready. Your grove keeps working right here on this device.';
    return WORDS[w] || (acct() && acct().words && w ? acct().words(w) : 'That did not go through. Try again in a moment.'); }
  function pr(id) { return window.GGClass ? GGClass.practice(id) : null; }
  function kindList(kind) {
    if (!window.GGClass) return [];
    var A = GGClass.allPractices(), out = [];
    Object.keys(A).forEach(function (id) { if ((A[id].kinds || []).indexOf(kind) >= 0) { var p = pr(id); if (p) out.push({ id: id, name: p.name }); } });
    return out.sort(function (a, b) { return a.name.localeCompare(b.name); });
  }
  var isClass = function () { return S.kind === 'classroom'; };

  function cardHtml(G) {
    if (!G) return '';
    S.local = G.id; S.kind = G.kind; S.name = G.name || '';
    var id = links()[G.id];
    if (!id || !S.data || S.data.id !== id) { S.data = null; }
    setTimeout(fill, 0);
    return '<div class="card gs-card" id="gs-card" aria-live="polite"><p class="muted">Loading Our Grove Across Phones...</p></div>';
  }
  function intro() {
    return isClass()
      ? '<p>Keep the class grove on your teacher account, so the smartboard and your phone show the same week plan and class totals. A co-teacher can join with a code you share in person.</p><p class="muted">Shared: the week plan, a checkmark when the class did today\'s practice, class totals, and cheers from a set list. Students simply join in on the class screen; their names and every check-in answer stay in the room and on this device.</p>'
      : '<p>Share this grove with your group\'s phones. Everyone sees the week plan, checks off the day\'s practice, and cheers each other on.</p><p class="muted">Shared: the week plan, a checkmark for who did today\'s practice, group totals, and cheers from a set list. Check-ins, answers, and journals stay locked on each device. Grown ups join with a code you share in person.</p>';
  }
  function fill() {
    var el = document.getElementById('gs-card'); if (!el) return;
    var A = acct(), id = links()[S.local];
    var h = '<h3>Our Grove Across Phones</h3>';
    if (!A) { el.innerHTML = h + intro() + '<p class="muted">Grounded Accounts open this. They are getting ready on this device.</p>'; return; }
    if (!signedIn()) { el.innerHTML = h + intro() + '<p>Sign in to your Grounded Account at Home first, then come back here.</p><a class="btn btn-gold btn-sm" href="/home/#me=account">Sign In at Home</a>'; return; }
    if (!id) {
      el.innerHTML = h + intro() + '<label class="lbl" for="gs-me">The name you go by in the grove</label><input id="gs-me" class="gv-input" maxlength="24" autocomplete="given-name" placeholder="' + (isClass() ? 'Ms. Rivera' : 'Your first name') + '">'
        + '<div class="tools-row" style="justify-content:flex-start;margin-top:10px"><button type="button" class="btn btn-gold btn-sm" data-gs="start">Start Sharing This Grove</button></div>'
        + '<label class="lbl" for="gs-code" style="margin-top:16px">Or join a grove with its code</label><input id="gs-code" class="gv-input" maxlength="12" autocapitalize="characters" autocomplete="off" placeholder="ABCD 2345">'
        + '<div class="tools-row" style="justify-content:flex-start;margin-top:10px"><button type="button" class="btn btn-line btn-sm" data-gs="join">Join With a Code</button></div><p class="gv-err" role="alert">' + esc(S.err) + '</p>';
      return;
    }
    if (!S.data) { el.innerHTML = h + '<p class="muted">Opening the shared grove...</p>'; load(); return; }
    el.innerHTML = h + panel(S.data);
  }
  function load() {
    var id = links()[S.local]; if (!id || S.busy) return;
    S.busy = true;
    api('GET', '/groves/' + id + '?day=' + today()).then(function (r) { S.data = r.grove; S.err = ''; S.when = Date.now(); }, function (e) {
      if (e && (e.why === 'none')) { setLink(S.local, null); S.data = null; S.err = WORDS.none; }
      else S.err = say(e);
    }).then(function () { S.busy = false; var el = document.getElementById('gs-card'); if (el) { if (S.data) el.innerHTML = '<h3>Our Grove Across Phones</h3>' + panel(S.data); else fill(); } });
  }
  function panel(g) {
    var me = g.people.filter(function (p) { return p.me; })[0] || {}, items = (g.plan && g.plan.week === g.week ? g.plan.items : []).map(function (x) { var p = pr(x); return p ? { id: x, name: p.name } : null; }).filter(Boolean);
    var mine = (g.mine || []).filter(function (m) { return m.day === g.day; })[0], T = g.totals || {};
    var h = '<p class="muted">' + esc(g.name) + ' · ' + g.people.length + (g.people.length === 1 ? ' person' : ' people') + (g.leader ? ' · You lead this grove' : '') + '</p>';
    h += '<dl class="gs-totals"><div><dt>Today</dt><dd>' + (T.today || 0) + '</dd></div><div><dt>This Week</dt><dd>' + (T.week || 0) + '</dd></div><div><dt>Days in a Row</dt><dd>' + (T.streak || 0) + '</dd></div><div><dt>All Together</dt><dd>' + (T.all || 0) + '</dd></div></dl>';
    h += '<h4 class="gs-h">This Week\'s Practices</h4>' + (items.length ? '<ul class="gs-plan">' + items.map(function (x) { return '<li><b>' + esc(x.name) + '</b>' + (window.GGClass && isClass() && GGClass.has(x.id) ? ' <button type="button" class="text-btn" data-gc-screen="' + esc(x.id) + '">Open on the Class Screen</button>' : '') + '</li>'; }).join('') + '</ul>'
      : '<p class="muted">' + (g.leader ? 'Choose a few practices for the week, and everyone sees them.' : 'Your leader chooses the week\'s practices.') + '</p>');
    if (g.leader) h += '<button type="button" class="btn btn-line btn-sm" data-gs="plan">' + (items.length ? 'Change the Week\'s Practices' : 'Choose the Week\'s Practices') + '</button>';
    if (S.view === 'plan' && g.leader) {
      var L = kindList(g.kind), on = {}; items.forEach(function (x) { on[x.id] = 1; });
      h += '<fieldset class="gs-pick"><legend>Up to 7 practices for this week</legend><div class="gs-picklist">' + L.map(function (x) { return '<label><input type="checkbox" name="gs-p" value="' + esc(x.id) + '"' + (on[x.id] ? ' checked' : '') + '> ' + esc(x.name) + '</label>'; }).join('') + '</div><div class="tools-row" style="justify-content:flex-start"><button type="button" class="btn btn-gold btn-sm" data-gs="saveplan">Save the Week</button><button type="button" class="btn btn-line btn-sm" data-gs="view" data-v="">Cancel</button></div></fieldset>';
    }
    var did = isClass() ? 'Our class did today\'s practice' : 'I did today\'s practice';
    h += '<h4 class="gs-h">Today</h4>' + (mine ? '<p>' + (isClass() ? 'Checked off for the class: ' : 'You checked off: ') + '<b>' + esc((pr(mine.practice) || { name: 'Today\'s practice' }).name) + '</b>. <button type="button" class="text-btn" data-gs="unmark">Undo</button></p>'
      : '<div class="tools-row" style="justify-content:flex-start">' + (items.length ? items.map(function (x, i) { return '<button type="button" class="btn ' + (i ? 'btn-line' : 'btn-gold') + ' btn-sm" data-gs="mark" data-p="' + esc(x.id) + '">' + esc(did) + ': ' + esc(x.name) + '</button>'; }).join('') : '<button type="button" class="btn btn-gold btn-sm" data-gs="mark" data-p="grove-practice">' + esc(did) + '</button>') + '</div>');
    h += '<ul class="gs-people">' + g.people.map(function (p) { return '<li><span class="gs-dot' + (p.today ? ' on' : '') + '" aria-hidden="true"></span><b>' + esc(p.name) + '</b>' + (p.leader ? ' <small>Leader</small>' : '') + '<span>' + (p.today ? 'Done today' : 'Still to come today') + ', ' + p.week + (p.week === 1 ? ' day' : ' days') + ' this week</span>'
      + (g.leader && !p.me ? '<button type="button" class="text-btn" data-gs="remove" data-a="' + esc(p.account) + '" data-n="' + esc(p.name) + '">Remove</button>' : '') + '</li>'; }).join('') + '</ul>';
    h += '<h4 class="gs-h">Cheers</h4><div class="gs-cheer"><label class="sr-only" for="gs-to">Cheer for</label><select id="gs-to" class="gv-input"><option value="grove">The whole grove</option>' + g.people.filter(function (p) { return !p.me; }).map(function (p) { return '<option value="' + esc(p.account) + '">' + esc(p.name) + '</option>'; }).join('') + '</select>'
      + '<div class="gs-cheers">' + CHEERS.map(function (c, i) { return '<button type="button" class="chip" data-gs="cheer" data-c="' + i + '">' + esc(c) + '</button>'; }).join('') + '</div></div>';
    if ((g.cheers || []).length) h += '<ul class="gs-got">' + g.cheers.slice(0, 8).map(function (c) { return '<li><b>' + esc(c.mine ? 'You' : c.from) + '</b> to ' + esc(c.to === 'you' ? 'you' : c.to === 'grove' ? 'the grove' : c.to) + ': ' + esc(CHEERS[c.cheer] || '') + '</li>'; }).join('') + '</ul>';
    h += '<details class="gs-more"><summary>Grove Settings</summary>';
    h += '<label class="lbl" for="gs-rename">The name you go by here</label><input id="gs-rename" class="gv-input" maxlength="24" value="' + esc(me.name || '') + '"><button type="button" class="btn btn-line btn-sm" data-gs="rename">Save My Name</button>';
    if (g.leader) h += '<p style="margin-top:14px"><b>Invite with a code.</b> Share it in person or read it aloud. A new code replaces the old one.</p>' + (S.code ? '<p class="gs-code" aria-label="Code ' + esc(S.code.split('').join(' ')) + '">' + esc(S.code.slice(0, 4) + ' ' + S.code.slice(4)) + '</p>' : '')
      + '<div class="tools-row" style="justify-content:flex-start"><button type="button" class="btn btn-line btn-sm" data-gs="code">Make a New Code</button><button type="button" class="btn btn-line btn-sm" data-gs="close">Close Joining</button></div>'
      + '<p style="margin-top:14px"><button type="button" class="btn btn-line btn-sm" data-gs="end">End Sharing for Everyone</button></p>';
    else h += '<p style="margin-top:14px"><button type="button" class="btn btn-line btn-sm" data-gs="leave">Leave This Grove</button></p>';
    h += '<p class="muted">This device keeps its own grove, check-ins, and plan just as before.</p></details>';
    h += '<p class="gv-err" role="alert">' + esc(S.err) + '</p><p class="muted gs-sync">' + (S.when ? 'Updated ' + new Date(S.when).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) + '. ' : '') + '<button type="button" class="text-btn" data-gs="refresh">Refresh</button></p>';
    return h;
  }
  function act(a, t) {
    var id = links()[S.local], v = function (sel) { var e = document.querySelector(sel); return e ? e.value : ''; };
    var then = function (p) { S.busy = true; return p.then(function (r) { S.err = ''; return r; }, function (e) { S.err = say(e); }).then(function (r) { S.busy = false; return r; }); };
    if (a === 'start') return then(api('POST', '/groves', { kind: S.kind, name: (S.name || 'Our Grove').replace(/[^\p{L}\p{N} .'&]/gu, '').trim().slice(0, 40) || 'Our Grove', me: v('#gs-me') })).then(function (r) { if (r && r.id) { setLink(S.local, r.id); S.code = r.code; S.view = ''; } S.data = null; fill(); });
    if (a === 'join') return then(api('POST', '/groves/join', { code: v('#gs-code'), me: v('#gs-me') || 'Friend' })).then(function (r) { if (r && r.id) setLink(S.local, r.id); S.data = null; fill(); });
    if (!id) return;
    var refresh = function () { S.data = null; load(); };
    if (a === 'refresh') return refresh();
    if (a === 'view') { S.view = t.getAttribute('data-v') || ''; return fill2(); }
    if (a === 'plan') { S.view = S.view === 'plan' ? '' : 'plan'; return fill2(); }
    if (a === 'saveplan') {
      var picks = Array.prototype.map.call(document.querySelectorAll('input[name="gs-p"]:checked'), function (x) { return x.value; }).slice(0, 7);
      return then(api('PUT', '/groves/' + id + '/plan', { week: weekOf(today()), items: picks })).then(function () { S.view = ''; refresh(); });
    }
    if (a === 'mark') return then(api('POST', '/groves/' + id + '/mark', { day: today(), practice: t.getAttribute('data-p') })).then(refresh);
    if (a === 'unmark') return then(api('DELETE', '/groves/' + id + '/mark/' + today())).then(refresh);
    if (a === 'cheer') return then(api('POST', '/groves/' + id + '/cheer', { to: v('#gs-to') || 'grove', cheer: +t.getAttribute('data-c') })).then(refresh);
    if (a === 'rename') return then(api('PUT', '/groves/' + id + '/me', { name: v('#gs-rename') })).then(refresh);
    if (a === 'code') return then(api('POST', '/groves/' + id + '/code')).then(function (r) { if (r && r.code) S.code = r.code; fill2(); });
    if (a === 'close') return then(api('DELETE', '/groves/' + id + '/code')).then(function () { S.code = ''; fill2(); });
    if (a === 'remove') { if (!confirm('Remove ' + (t.getAttribute('data-n') || 'this person') + ' from the shared grove?')) return; return then(api('DELETE', '/groves/' + id + '/people/' + encodeURIComponent(t.getAttribute('data-a')))).then(refresh); }
    if (a === 'leave' || a === 'end') {
      if (!confirm(a === 'end' ? 'End sharing for everyone? The shared plan, checkmarks, and cheers are erased. Every device keeps its own grove.' : 'Leave this shared grove? This device keeps its own grove.')) return;
      var me = (S.data && S.data.people.filter(function (p) { return p.me; })[0]) || {};
      return then(a === 'end' ? api('DELETE', '/groves/' + id) : api('DELETE', '/groves/' + id + '/people/' + encodeURIComponent(me.account || ''))).then(function () { setLink(S.local, null); S.data = null; S.code = ''; fill(); });
    }
  }
  function fill2() { var el = document.getElementById('gs-card'); if (el && S.data) el.innerHTML = '<h3>Our Grove Across Phones</h3>' + panel(S.data); else fill(); }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-gs]'); if (!t || !document.getElementById('gs-card') || S.busy) return;
    e.preventDefault(); act(t.getAttribute('data-gs'), t);
  });
  // Fresh every minute while the card is on screen
  setInterval(function () { if (document.getElementById('gs-card') && S.data && !document.hidden && !S.busy && S.view !== 'plan') load(); }, 60000);
  var st = document.createElement('style');
  st.textContent = '.gs-card{border-left:6px solid var(--sage,#5C7A52)}.gs-totals{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:10px 0}.gs-totals div{background:var(--bg,#FAF7F2);border-radius:12px;padding:8px;text-align:center}'
    + '.gs-totals dt{font-family:"Barlow Condensed",sans-serif;letter-spacing:.5px;font-size:calc(13px * var(--scale,1));color:var(--ink-soft,#66564A)}.gs-totals dd{margin:0;font-family:"Cormorant Garamond",serif;font-size:calc(30px * var(--scale,1));font-weight:700;line-height:1.1}'
    + '.gs-h{font-family:"Barlow Condensed",sans-serif;letter-spacing:1px;text-transform:uppercase;color:var(--gold,#2F5A3F);margin:16px 0 6px}.gs-plan,.gs-people,.gs-got{list-style:none;margin:0 0 8px;padding:0;display:grid;gap:6px}'
    + '.gs-people li{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px}.gs-people li span:not(.gs-dot){color:var(--ink-soft,#66564A);font-size:calc(14px * var(--scale,1))}.gs-dot{width:14px;height:14px;border-radius:50%;border:2px solid var(--sage,#5C7A52);flex:none}.gs-dot.on{background:var(--sage,#5C7A52)}'
    + '.gs-cheer{display:grid;gap:8px}.gs-cheers{display:flex;flex-wrap:wrap;gap:6px}.gs-got li{font-size:calc(15px * var(--scale,1))}.gs-code{font:700 34px/1.1 "Barlow Condensed",sans-serif;letter-spacing:4px;margin:6px 0}'
    + '.gs-pick{border:1px solid var(--line,#E3D9C6);border-radius:12px;padding:10px 12px;margin:10px 0}.gs-picklist{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:4px 12px;max-height:320px;overflow:auto;margin-bottom:10px}.gs-picklist label{display:flex;gap:8px;align-items:center;min-height:36px}'
    + '.gs-more{margin-top:14px}.gs-more summary{cursor:pointer;font-weight:600;min-height:40px}@media (max-width:560px){.gs-totals{grid-template-columns:repeat(2,minmax(0,1fr))}}';
  document.head.appendChild(st);
  window.GGGroveShare = { cardHtml: cardHtml, refresh: function () { S.data = null; load(); }, _: S };
})();
