/* =====================================================================
   GROUNDED LIVE IN THE FIELD GUIDE (field-guide/live-fg.js), GWG BLD 1036.
   (c) 2026 Grow With Grounded LLC.
   Present tab (Staff and Founders): Grounded Live, quick polls for a seminar, a talk, or a training. The host builds a
   short poll set, starts it, and the room joins on their own phones with the same join page as a Class Check-in
   (growwithgrounded.com/live/, shared/gg-live.js). The results show live as bars, and are saved here, in this person's
   locked Field Guide records (DATA.live), with Save as a Spreadsheet.
   Grounded Insights (off by default, one switch on each poll set): with 10 or more in the room, the Grounded server keeps
   only the totals for each question under the poll set's label, with the month and the state. Rooms under 10 keep nothing.
   Founder tab (Founders only): Grounded Insights, those totals read from the server with this device's Founder signing
   key (the same key Membership on the Account makes, IndexedDB gg-founder), signed "gg-founder|GET|/live/insights|<seconds>".
   Hooks in field-guide/index.html: GGLiveFG.init, GGLiveFG.card, GGLiveFG.view, GGLiveFG.founderCard, GGLiveFG.founderView,
   and the lv- actions. Everything rests until GGLive.on() (LIVE_ON in shared/gg-live.js). No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGLiveFG) return;
  var C = null, enc = new TextEncoder(), subtle = window.crypto && crypto.subtle;
  var site = /(^|\.)growwithgrounded\.com$/.test(location.hostname);
  var API = function () { return window.GG_LIVE_API || window.GG_ACCOUNT_API || (site ? 'https://api.growwithgrounded.com/v1' : ''); };
  var S = { edit: null, open: '', ins: null, insErr: '', busy: false };
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // Starter questions Chris named (November 21, 2026), neutral and open, for adults
  var STARTERS = [
    { q: 'What is the hardest part for you right now?', many: false, c: ['Time', 'Money', 'Rest', 'Relationships', 'Health', 'Work', 'Something else'] },
    { q: 'Where do you find peace?', many: false, c: ['Prayer', 'Quiet or meditation', 'Time outside', 'Music', 'Movement', 'People I love', 'Something else'] }
  ];
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function on() { return !!(window.GGLive && GGLive.on()); }
  function D() { var d = C && C.data ? C.data() : null; if (!d) return null; if (!d.live || typeof d.live !== 'object') d.live = { sets: [], results: [] }; d.live.sets = d.live.sets || []; d.live.results = d.live.results || []; return d.live; }
  function save() { if (C && C.save) C.save(); }
  function paint() { if (C && C.render) C.render(); }
  function toast(m) { if (C && C.toast) C.toast(m); }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function today() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function longDay(s) { var p = String(s || '').split('-'); return p.length === 3 ? MONTHS[+p[1] - 1] + ' ' + (+p[2]) + ', ' + p[0] : ''; }
  function monthName(s) { var p = String(s || '').split('-'); return p.length === 2 ? MONTHS[+p[1] - 1] + ' ' + p[0] : s; }
  function bars(choices, counts, total) {
    var max = Math.max(1, total || 0);
    return '<div class="lvf-bars">' + choices.map(function (c, i) { var n = (counts || [])[i] || 0; return '<div class="lvf-bar"><span>' + esc(c) + '</span><span class="lvf-bt"><i style="width:' + Math.round(100 * n / max) + '%"></i></span><b>' + n + '</b></div>'; }).join('') + '</div>';
  }
  function css() {
    return '<style>.lvf-bars{display:grid;gap:6px;margin:8px 0}.lvf-bar{display:grid;grid-template-columns:minmax(80px,34%) minmax(0,1fr) 2.6em;gap:8px;align-items:center}.lvf-bar span:first-child{overflow-wrap:anywhere}.lvf-bt{display:block;height:14px;border-radius:7px;background:var(--line);overflow:hidden}.lvf-bt i{display:block;height:100%;background:var(--gold)}.lvf-bar b{text-align:right}.lvf-q{border-top:1px solid var(--line);padding-top:12px;margin-top:12px}.lvf-q textarea,.lvf-q input,.lvf-label{width:100%}</style>';
  }

  /* ---------- poll sets ---------- */
  function blankQ() { return { q: '', many: false, c: '' }; }
  function setOf(id) { var L = D(); return L ? L.sets.find(function (x) { return x.id === id; }) : null; }
  function cleanSet(e) {
    var qs = (e.qs || []).map(function (x) {
      var c = String(x.c || '').split('\n').map(function (t) { return t.trim().slice(0, 80); }).filter(Boolean).slice(0, 12);
      return { q: String(x.q || '').trim().slice(0, 200), many: !!x.many, c: c };
    }).filter(function (x) { return x.q && x.c.length >= 2; });
    return { id: e.id || uid(), label: String(e.label || '').trim().slice(0, 60) || 'Seminar Poll', insights: !!e.insights, qs: qs, u: Date.now() };
  }
  function editH() {
    var e = S.edit;
    return '<button class="linkbtn" data-act="lv-cancel">Back to Grounded Live</button><div class="page-head" style="margin-top:10px"><div class="eyebrow">Grounded Live</div><h1>' + (e.id ? 'Change a Poll Set' : 'New Poll Set') + '</h1><p>A few short questions for the room. Each one is Pick One or Pick Many, with two to twelve answers.</p></div>' +
      '<div class="card"><label class="f" for="lvf-label">Poll set label</label><input type="text" id="lvf-label" class="lvf-label" data-lvf="label" maxlength="60" value="' + esc(e.label) + '" placeholder="Living Sober Talk, Spring">' +
      '<div class="spread" style="margin-top:14px;align-items:flex-start"><div><b>Grounded Insights</b><p class="muted" style="font-size:15px">Off unless you turn it on. With it on and 10 or more in the room, the Grounded server keeps only the totals for each question, under this label, with the month and the state. No names, no devices, no exact times. A room under 10 keeps nothing. The join screen tells everyone: “Your answers are anonymous and count toward Grounded’s overall totals.”</p></div>' +
      '<button type="button" class="chip" role="switch" aria-checked="' + !!e.insights + '" aria-pressed="' + !!e.insights + '" data-act="lv-ins">' + (e.insights ? 'On' : 'Off') + '</button></div>' +
      e.qs.map(function (x, i) {
        return '<div class="lvf-q"><label class="f" for="lvf-q' + i + '">Question ' + (i + 1) + '</label><input type="text" id="lvf-q' + i + '" data-lvf="q" data-i="' + i + '" maxlength="200" value="' + esc(x.q) + '">' +
          '<div class="row" style="margin-top:8px"><button type="button" class="chip" aria-pressed="' + !x.many + '" data-act="lv-many" data-v="' + i + '|0">Pick One</button><button type="button" class="chip" aria-pressed="' + !!x.many + '" data-act="lv-many" data-v="' + i + '|1">Pick Many</button></div>' +
          '<label class="f" for="lvf-c' + i + '">Answers, one per line</label><textarea id="lvf-c' + i + '" rows="5" data-lvf="c" data-i="' + i + '">' + esc(x.c) + '</textarea>' +
          '<div class="row" style="margin-top:6px"><button type="button" class="btn btn-line btn-sm" data-act="lv-rmq" data-v="' + i + '">Remove This Question</button></div></div>';
      }).join('') +
      '<div class="row" style="margin-top:14px"><button type="button" class="btn btn-line btn-sm" data-act="lv-addq">Add a Question</button>' + STARTERS.map(function (x, i) { return '<button type="button" class="btn btn-line btn-sm" data-act="lv-starter" data-v="' + i + '">Add: ' + esc(x.q) + '</button>'; }).join('') + '</div>' +
      '<div class="row" style="margin-top:16px"><button type="button" class="btn btn-gold" data-act="lv-save">Save Poll Set</button><button type="button" class="btn btn-line" data-act="lv-cancel">Cancel</button></div></div>';
  }

  /* ---------- results ---------- */
  function resultOf(id) { var L = D(); return L ? L.results.find(function (x) { return x.id === id; }) : null; }
  function resultH(r) {
    return '<button class="linkbtn" data-act="lv-close">Back to Grounded Live</button><div class="page-head" style="margin-top:10px"><div class="eyebrow">Grounded Live Results</div><h1>' + esc(r.label) + '</h1><p>' + esc(longDay(r.day)) + ', ' + r.people + (r.people === 1 ? ' person' : ' people') + ' joined.' + (r.kept ? ' The totals counted toward Grounded Insights.' : '') + '</p></div>' +
      '<div class="card">' + r.qs.map(function (q, i) { return '<div class="' + (i ? 'lvf-q' : '') + '"><p><b>' + esc(q.q) + '</b></p><p class="muted" style="font-size:15px">' + q.n + ' answered' + (q.many ? ', pick many' : '') + '</p>' + bars(q.c, q.counts, Math.max(1, q.n)) + '</div>'; }).join('') +
      '<div class="row" style="margin-top:14px"><button type="button" class="btn btn-gold btn-sm" data-act="lv-csv" data-v="' + esc(r.id) + '">Save as a Spreadsheet</button><button type="button" class="btn btn-line btn-sm" data-act="lv-rmres" data-v="' + esc(r.id) + '">Remove These Results</button></div>' +
      '<p class="muted" style="font-size:14px;margin-top:8px">The results are saved on this device, locked in your Field Guide records. The spreadsheet is a CSV file that opens in Excel, Numbers, or Google Sheets.</p></div>';
  }
  function csvOf(r) {
    var q = function (s) { s = String(s == null ? '' : s); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
    var rows = [['Poll', 'Date', 'People', 'Question', 'Answer', 'Count', 'Answered'].join(',')];
    r.qs.forEach(function (x) { x.c.forEach(function (t, k) { rows.push([q(r.label), r.day, r.people, q(x.q), q(t), x.counts[k] || 0, x.n].join(',')); }); });
    return rows.join('\r\n') + '\r\n';
  }
  function dl(name, text) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv' })); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 800);
  }
  function start(id) {
    var s = setOf(id); if (!s || !s.qs.length || !on()) return;
    GGLive.host({ kind: 'poll', mode: 'devices', title: s.label, word: 'LIVE', insights: !!s.insights, label: s.label,
      questions: s.qs.map(function (x) { return { text: x.q, say: x.q, choices: x.c.slice(), many: !!x.many }; }) })
      .then(function (r) {
        if (!r) return;
        var L = D(); if (!L) return;
        var rec = { id: uid(), set: s.id, label: s.label, day: today(), people: r.joined || 0, kept: !!r.kept,
          qs: s.qs.map(function (x, i) { var t = r.results[i] || { counts: [], answered: 0 }; return { q: x.q, many: !!x.many, c: x.c.slice(), counts: x.c.map(function (c, k) { return t.counts[k] || 0; }), n: t.answered || 0 }; }) };
        L.results.unshift(rec); L.results = L.results.slice(0, 200); save(); S.open = rec.id; paint(); toast('Results saved on this device.');
      });
  }

  function view() {
    var L = D();
    var head = '<div class="page-head"><div class="eyebrow">Present &middot; Staff and Founders</div><h1>Grounded Live</h1><p>Quick polls for a seminar, a talk, or a training. The room joins on their own phones with a QR code or a short code, with no sign-in and no names, and the results show live as bars.</p></div>';
    if (!on()) return css() + head + '<div class="card"><h3>Grounded Live Opens Soon</h3><p class="muted">Poll sets, live results, and Grounded Insights open here once Grounded Live goes live.</p></div>';
    if (!L) return css() + head;
    if (S.edit) return css() + editH();
    var r = S.open && resultOf(S.open); if (r) return css() + resultH(r);
    var sets = L.sets.slice().sort(function (a, b) { return (b.u || 0) - (a.u || 0); });
    return css() + head +
      '<div class="card"><h3>Poll Sets</h3>' + (sets.length ? sets.map(function (x) {
        return '<div class="list-row"><div class="lr-main"><b>' + esc(x.label) + '</b><br><small class="muted">' + x.qs.length + (x.qs.length === 1 ? ' question' : ' questions') + (x.insights ? ' &middot; Grounded Insights on' : '') + '</small></div><div class="row"><button class="btn btn-gold btn-sm" data-act="lv-start" data-v="' + esc(x.id) + '"' + (x.qs.length ? '' : ' disabled') + '>Start</button><button class="btn btn-line btn-sm" data-act="lv-edit" data-v="' + esc(x.id) + '">Change</button><button class="btn btn-line btn-sm" data-act="lv-rmset" data-v="' + esc(x.id) + '">Remove</button></div></div>';
      }).join('') : '<p class="muted">Your poll sets show here. Start with the two starter questions, or write your own.</p>') +
      '<div class="row" style="margin-top:12px"><button class="btn btn-gold btn-sm" data-act="lv-new">New Poll Set</button></div></div>' +
      '<div class="card"><h3>Saved Results</h3>' + (L.results.length ? L.results.map(function (x) {
        return '<div class="list-row"><div class="lr-main"><b>' + esc(x.label) + '</b><br><small class="muted">' + esc(longDay(x.day)) + ', ' + x.people + (x.people === 1 ? ' person' : ' people') + '</small></div><div class="row"><button class="btn btn-line btn-sm" data-act="lv-open" data-v="' + esc(x.id) + '">Open</button></div></div>';
      }).join('') : '<p class="muted">Results from each poll show here, saved on this device.</p>') + '</div>' +
      '<div class="card"><h3>How It Stays Private</h3><p class="muted">Each room has its own key, made on this device and carried in the QR code. Every question and answer is sealed on the devices, so the Grounded server holds only sealed text and how many joined and answered. The room is deleted when you end it, and within 2 hours at most. Grounded Insights, when you turn it on, keeps only the totals.</p></div>';
  }

  /* ---------- the Founder view: Grounded Insights ---------- */
  function signKey() {
    return new Promise(function (ok) {
      try {
        var r = indexedDB.open('gg-founder', 1);
        r.onupgradeneeded = function () { r.result.createObjectStore('k'); };
        r.onerror = function () { ok(null); };
        r.onsuccess = function () { var d = r.result; try { var g = d.transaction('k', 'readonly').objectStore('k').get('sign'); g.onsuccess = function () { d.close(); ok(g.result || null); }; g.onerror = function () { d.close(); ok(null); }; } catch (e) { ok(null); } };
      } catch (e) { ok(null); }
    });
  }
  function b64u(u8) { var s = ''; u8 = new Uint8Array(u8); for (var i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function loadIns() {
    S.busy = true; S.insErr = ''; paint();
    signKey().then(function (k) {
      if (!k || !k.priv) throw new Error('nokey');
      var t = String(Math.floor(Date.now() / 1000));
      return subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, k.priv, enc.encode('gg-founder|GET|/live/insights|' + t)).then(function (sig) {
        return fetch(API() + '/live/insights', { headers: { 'X-GG-Client': '1', 'X-GG-Founder': t + '.' + b64u(sig) }, credentials: 'omit', cache: 'no-store' });
      });
    }).then(function (r) { return r.json().then(function (j) { if (!r.ok || !j.ok) throw new Error(j && j.why || 'server'); S.ins = j.rows || []; }); })
      .catch(function (e) {
        var w = e && e.message;
        S.insErr = w === 'nokey' ? 'Make this device’s Founder key first, in Membership on the Account.' : w === 'founder' ? 'The server is ready for this device’s Founder key. Send the key from Membership on the Account to Claude, and Claude adds it.' : 'The Grounded server is out of reach right now. Try again in a little while.';
      }).then(function () { S.busy = false; paint(); });
  }
  // The same question under the same label adds up across rooms.
  function groupIns(rows) {
    var by = {};
    rows.forEach(function (r) {
      var g = by[r.label] = by[r.label] || { label: r.label, rooms: 0, people: 0, months: {}, regions: {}, qs: {} };
      g.rooms++; g.people += r.people || 0; g.months[r.month] = 1; if (r.region) g.regions[r.region] = 1;
      (r.totals || []).forEach(function (q) {
        var key = q.q + '|' + (q.many ? 1 : 0) + '|' + q.c.map(function (x) { return x.t; }).join('|');
        var x = g.qs[key] = g.qs[key] || { q: q.q, many: !!q.many, c: q.c.map(function (y) { return y.t; }), counts: q.c.map(function () { return 0; }), n: 0 };
        q.c.forEach(function (y, k) { x.counts[k] += y.n || 0; }); x.n += q.n || 0;
      });
    });
    return Object.keys(by).map(function (k) { return by[k]; });
  }
  function founderView() {
    var head = '<div class="page-head"><div class="eyebrow">Founder &middot; Chris and Kayti only</div><h1>Grounded Insights</h1><p>The totals from seminar polls that turned on Grounded Insights, with 10 or more in the room. Totals only: no names, no devices, no exact times, no place closer than a state.</p></div>';
    if (!on()) return css() + head + '<div class="card"><p class="muted">Grounded Insights fills in once Grounded Live goes live.</p></div>';
    var h = css() + head + '<div class="card"><div class="row"><button class="btn btn-gold btn-sm" data-act="lv-insload"' + (S.busy ? ' disabled' : '') + '>' + (S.ins ? 'Refresh' : 'See Insights') + '</button></div>' +
      (S.insErr ? '<p class="tipbox" style="border-left:3px solid var(--gold);margin-top:10px">' + esc(S.insErr) + '</p>' : '') + '</div>';
    if (S.ins) {
      var G = groupIns(S.ins);
      h += G.length ? G.map(function (g) {
        var months = Object.keys(g.months).sort(), regions = Object.keys(g.regions).sort();
        return '<div class="card"><h3>' + esc(g.label) + '</h3><p class="muted" style="font-size:15px">' + g.rooms + (g.rooms === 1 ? ' room' : ' rooms') + ', ' + g.people + ' people, ' + esc(months.map(monthName).join(', ')) + (regions.length ? ' &middot; ' + esc(regions.join(', ')) : '') + '</p>' +
          Object.keys(g.qs).map(function (k, i) { var q = g.qs[k]; return '<div class="' + (i ? 'lvf-q' : '') + '"><p><b>' + esc(q.q) + '</b></p><p class="muted" style="font-size:15px">' + q.n + ' answered' + (q.many ? ', pick many' : '') + '</p>' + bars(q.c, q.counts, Math.max(1, q.n)) + '</div>'; }).join('') + '</div>';
      }).join('') : '<div class="card"><p class="muted">Insights from polls show here once a room of 10 or more finishes with Grounded Insights on.</p></div>';
    }
    return h;
  }

  function act(a, v) {
    if (a === 'lv-new') { S.edit = { id: '', label: '', insights: false, qs: [blankQ()] }; paint(); return true; }
    if (a === 'lv-edit') { var s = setOf(v); if (s) { S.edit = { id: s.id, label: s.label, insights: !!s.insights, qs: s.qs.map(function (x) { return { q: x.q, many: !!x.many, c: x.c.join('\n') }; }) }; paint(); } return true; }
    if (a === 'lv-cancel') { S.edit = null; paint(); return true; }
    if (a === 'lv-ins') { if (S.edit) { S.edit.insights = !S.edit.insights; paint(); } return true; }
    if (a === 'lv-many') { var p = String(v).split('|'), q = S.edit && S.edit.qs[+p[0]]; if (q) { q.many = p[1] === '1'; paint(); } return true; }
    if (a === 'lv-addq') { if (S.edit && S.edit.qs.length < 20) { S.edit.qs.push(blankQ()); paint(); } return true; }
    if (a === 'lv-rmq') { if (S.edit) { S.edit.qs.splice(+v, 1); if (!S.edit.qs.length) S.edit.qs.push(blankQ()); paint(); } return true; }
    if (a === 'lv-starter') { var x = STARTERS[+v]; if (S.edit && x) { var e0 = S.edit.qs.findIndex(function (y) { return !y.q && !y.c; }); var nq = { q: x.q, many: x.many, c: x.c.join('\n') }; if (e0 >= 0) S.edit.qs[e0] = nq; else S.edit.qs.push(nq); paint(); } return true; }
    if (a === 'lv-save') {
      var L = D(); if (!L || !S.edit) return true;
      var c = cleanSet(S.edit);
      if (!c.qs.length) { toast('Add a question with at least two answers.'); return true; }
      var i = L.sets.findIndex(function (y) { return y.id === c.id; }); if (i >= 0) L.sets[i] = c; else L.sets.push(c);
      S.edit = null; save(); paint(); toast('Poll set saved.'); return true;
    }
    if (a === 'lv-rmset') { var L2 = D(); if (L2 && window.confirm('Remove this poll set? Saved results stay.')) { L2.sets = L2.sets.filter(function (y) { return y.id !== v; }); save(); paint(); } return true; }
    if (a === 'lv-start') { start(v); return true; }
    if (a === 'lv-open') { S.open = v; paint(); return true; }
    if (a === 'lv-close') { S.open = ''; paint(); return true; }
    if (a === 'lv-csv') { var r = resultOf(v); if (r) dl('grounded-live-' + r.day + '.csv', csvOf(r)); return true; }
    if (a === 'lv-rmres') { var L3 = D(); if (L3 && window.confirm('Remove these results from this device?')) { L3.results = L3.results.filter(function (y) { return y.id !== v; }); S.open = ''; save(); paint(); } return true; }
    if (a === 'lv-insload') { loadIns(); return true; }
    return false;
  }
  document.addEventListener('input', function (e) {
    var t = e.target; if (!S.edit || !t || !t.dataset || !t.dataset.lvf) return;
    var f = t.dataset.lvf, i = +t.dataset.i;
    if (f === 'label') S.edit.label = t.value; else if (S.edit.qs[i]) S.edit.qs[i][f] = t.value;
  });

  window.GGLiveFG = {
    init: function (ctx) { C = ctx || {}; },
    card: function () { return { k: 'live', title: 'Grounded Live', desc: 'Quick polls for a seminar or a talk. The room joins on their own phones, and the results show live as bars.', n: on() ? '' : 'Opens soon' }; },
    view: view,
    founderCard: function () { return { k: 'liveins', title: 'Grounded Insights', desc: 'Totals from seminar polls that turned on Grounded Insights, read from the Grounded server.' }; },
    founderView: founderView,
    act: act,
    _state: S, _csv: csvOf
  };
})();
