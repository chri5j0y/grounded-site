/* =====================================================================
   GET GROUNDED NOW (shared/ggn.js)   GWG BLD 809, October 2026
   The calm page behind the Get Grounded Now button in every page's menu bar (nav.js).
   Breathe With Me starts the Physiological Sigh at once. Four doors (Slow My Body Down, Quiet My Thoughts,
   Cool Down, Come Back to Now) and Rest in Prayer (opened only by choice, many traditions, each labeled)
   each play one short video, then offer Try Another, The Longer Version, or I Feel Steadier.
   See Every Practice lists every video: each practice in a Right Now (about 2 minutes) and an Afterward
   (about 5 minutes) version, the prayers by tradition, the kids' versions, and the Support for Right Now
   videos already in the apps. For Kids (the #kids address, used by Maple and Aspen) shows the kids' versions.
   Videos play in shared/gg-learn.js with recorded Brian or Jenny clips (the viewer's choice, shown as Male Voice and Female Voice).
   Crisis lines are never spoken (BLD 808); this page carries one quiet line of type at the bottom.
   Data: shared/ggn-videos.js (window.GG_NOW), generated from patches/bld809 in grounded-workshop.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGNow) return;
  var V = 'b894';
  var READ = '/read.js?v=b813', LEARN = '/shared/gg-learn.js?v=' + V, DATA = '/shared/ggn-videos.js?v=' + V, LESSONS = '/shared/learn-lessons.js?v=' + V;
  var DOORS = [
    { id: 'slow', h: 'Slow My Body Down', sub: 'Racing heart, shaky, panicky', kh: 'Calm My Body', ksub: 'Heart going fast, wiggly, scared' },
    { id: 'quiet', h: 'Quiet My Thoughts', sub: 'Spinning, worried, racing', kh: 'Quiet My Busy Mind', ksub: 'Lots of worries, thoughts zooming' },
    { id: 'cool', h: 'Cool Down', sub: 'Hot, angry, ready to snap', kh: 'Cool My Mad', ksub: 'Hot, stompy, ready to yell' },
    { id: 'now', h: 'Come Back to Now', sub: 'Far away, numb, foggy', kh: 'Feel Safe and Here', ksub: 'Far away, mixed up, unsure' }
  ];
  var TRAD = [['christian', 'Christian'], ['jewish', 'Jewish'], ['muslim', 'Muslim'], ['buddhist', 'Buddhist'], ['hindu', 'Hindu'], ['spiritual', 'Spiritual, Not Religious'], ['kids', 'For Kids']];
  var QUIET = 'Support any time: 988, call or text · 911, emergency';
  var esc = function (x) { return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  function need(src, test) { return new Promise(function (ok) { if (test()) return ok(); var s = document.createElement('script'); s.src = src; s.onload = s.onerror = function () { ok(); }; document.head.appendChild(s); }); }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  var S = { kids: /(^|#)kids$/.test(location.hash), voice: null, open: null, appSupport: null };
  function voice() { var v = S.voice || lsGet('ggn-voice'); return v === 'brian' || v === 'jenny' ? v : (S.kids ? 'jenny' : 'brian'); }
  function data() { return (window.GG_NOW && window.GG_NOW.lessons) || []; }
  function byId(id) { return data().filter(function (l) { return l.id === id; })[0] || null; }
  function aud() { return S.kids ? 'kids' : 'adult'; }
  function doorList(d) { return data().filter(function (l) { return l.door === d && l.length === 'now' && l.audience === aud() && d !== 'prayer'; }); }
  function prayerList() { return data().filter(function (l) { return l.door === 'prayer' && (S.kids ? l.tradition === 'kids' || l.audience === 'kids' : l.audience !== 'kids'); }); }
  function pairOf(l) { if (!l) return null; var want = l.length === 'now' ? 'after' : 'now'; return data().filter(function (x) { return x.practice === l.practice && x.audience === l.audience && x.length === want; })[0] || null; }
  function sighId() { var k = byId(S.kids ? 'gg-k-candle-sigh-now' : 'gg-sigh-now'); if (k) return k.id; var f = doorList('slow')[0]; return f ? f.id : ''; }
  function mins(l) { return l && l.mins ? Math.max(1, Math.round(l.mins)) : 2; }

  function css() {
    if (document.getElementById('ggn-css')) return;
    var s = document.createElement('style'); s.id = 'ggn-css';
    s.textContent = [
      '.ggn-root{--ggn-calm:#EEF2E8;padding-block:28px 56px;}',
      '.ggn-band+.ggn-root{padding-top:0;}.ggn-band+.ggn-root .ggn-calm{margin-top:-44px;position:relative;box-shadow:0 10px 30px rgba(40,30,10,.12);}',
      '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .ggn-root{--ggn-calm:#232A20;}}:root[data-theme="dark"] .ggn-root{--ggn-calm:#232A20;}',
      '.ggn-wrap{max-width:860px;margin:0 auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));display:grid;gap:22px;}',
      '.ggn-calm{background:var(--ggn-calm);border:1px solid var(--line);border-radius:28px;padding:28px 20px 22px;display:grid;gap:18px;}',
      '.ggn-eb{font-family:"Barlow Condensed",sans-serif;font-weight:700;font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:var(--sage);text-align:center;margin:0;}',
      '.ggn-hello{font-family:"Cormorant Garamond",Georgia,serif;font-weight:500;font-size:clamp(26px,4.4vw,34px);line-height:1.2;text-align:center;margin:0;text-wrap:balance;}',
      '.ggn-orbwrap{display:grid;justify-items:center;gap:8px;}',
      '.ggn-orb{width:168px;height:168px;max-width:100%;border-radius:50%;border:2px solid var(--sage);background:radial-gradient(circle at 50% 45%,var(--card),var(--ggn-calm) 72%);color:var(--sage);font-family:"Barlow Condensed",sans-serif;font-weight:700;font-size:17px;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;animation:ggn-breathe 11s ease-in-out infinite;}',
      '@keyframes ggn-breathe{0%,100%{transform:scale(.94);}36%{transform:scale(1.06);}}',
      '@media (prefers-reduced-motion:reduce){.ggn-orb{animation:none;}}',
      '.ggn-what{color:var(--ink-soft);font-size:17px;line-height:1.5;margin:0 auto;text-align:center;max-width:46ch;text-wrap:pretty;}',
      '.ggn-orbnote{color:var(--ink-soft);font-size:16px;margin:0;text-align:center;}',
      '.ggn-doors{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;}',
      '@media (max-width:520px){.ggn-doors{grid-template-columns:minmax(0,1fr);}}',
      '.ggn-door{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:16px 16px 14px;text-align:left;cursor:pointer;color:var(--ink);font:inherit;display:grid;gap:3px;min-height:76px;}',
      '.ggn-door b{font-family:"Barlow Condensed",sans-serif;font-weight:700;font-size:17px;letter-spacing:.06em;text-transform:uppercase;color:var(--gold);}',
      '.ggn-door span{font-size:16px;color:var(--ink-soft);line-height:1.35;}',
      '.ggn-door.wide{grid-column:1/-1;}',
      '.ggn-row{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;}',
      '.ggn-pill{background:none;border:1px solid var(--sage);color:var(--sage);border-radius:999px;padding:9px 18px;font-family:"Barlow Condensed",sans-serif;font-weight:700;font-size:15px;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;min-height:44px;}',
      '.ggn-pill[aria-pressed="true"]{background:var(--sage);color:var(--card);}',
      '.ggn-seg{display:inline-flex;border:1px solid var(--line);border-radius:999px;overflow:hidden;}',
      '.ggn-seg button{background:none;border:0;padding:8px 14px;font:inherit;font-size:15px;color:var(--ink-soft);cursor:pointer;min-height:44px;}',
      '.ggn-seg button[aria-pressed="true"]{background:var(--sage);color:var(--card);}',
      '.ggn-root button:focus-visible{outline:3px solid var(--gold);outline-offset:3px;}',
      '.ggn-quiet{font-size:14px;color:var(--ink-soft);opacity:.85;text-align:center;margin:4px 0 0;}',
      '.ggn-all{display:grid;gap:26px;}',
      '.ggn-all h2{font-family:"Cormorant Garamond",Georgia,serif;font-weight:600;font-size:clamp(26px,4vw,32px);margin:0;}',
      '.ggn-all h3{font-family:"Barlow Condensed",sans-serif;font-weight:700;font-size:17px;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);margin:0 0 8px;}',
      '.ggn-list{display:grid;gap:8px;margin:0;padding:0;list-style:none;}',
      '.ggn-item{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;justify-content:space-between;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:10px 14px;}',
      '.ggn-item .t{min-width:0;flex:1 1 220px;}',
      '.ggn-item .t b{display:block;font-weight:600;}',
      '.ggn-item .t small{color:var(--ink-soft);font-size:15px;}',
      '.ggn-item .b{display:flex;gap:8px;flex-wrap:wrap;}',
      '.ggn-play{background:var(--sage);color:var(--card);border:0;border-radius:999px;padding:8px 14px;font:inherit;font-size:15px;cursor:pointer;min-height:40px;}',
      '.ggn-play.alt{background:none;color:var(--sage);border:1px solid var(--sage);}',
      '.ggn-muted{color:var(--ink-soft);margin:0;}',
      '.ggl-app.ggn-pv .ggl-top img{background:#FFF8EC;}'
    ].join('');
    document.head.appendChild(s);
  }

  function itemHtml(l) {
    var p = pairOf(l), now = l.length === 'now' ? l : p, aft = l.length === 'after' ? l : p;
    var b = (now ? '<button type="button" class="ggn-play" data-ggn-play="' + esc(now.id) + '">Right Now, ' + mins(now) + ' min</button>' : '')
      + (aft ? '<button type="button" class="ggn-play alt" data-ggn-play="' + esc(aft.id) + '">Afterward, ' + mins(aft) + ' min</button>' : '');
    return '<li class="ggn-item"><div class="t"><b>' + esc(l.practice || l.title) + '</b><small>' + esc(l.blurb || '') + '</small></div><div class="b">' + b + '</div></li>';
  }
  function prayerItem(l) {
    return '<li class="ggn-item"><div class="t"><b>' + esc(l.title) + '</b><small>' + esc(l.blurb || '') + '</small></div><div class="b"><button type="button" class="ggn-play" data-ggn-play="' + esc(l.id) + '">Pray Along, ' + mins(l) + ' min</button></div></li>';
  }
  function allHtml() {
    var h = '<div class="ggn-all" id="every" role="region" aria-labelledby="ggn-every-h"><div><h2 id="ggn-every-h">Every Practice</h2><p class="ggn-muted">' + (S.kids ? 'The kids\' versions, for a child and a grown-up together.' : 'Each one comes in a Right Now version, about 2 minutes, and an Afterward version, about 5 minutes.') + '</p></div>';
    DOORS.forEach(function (d) {
      var seen = {}, L = data().filter(function (l) { return l.door === d.id && l.audience === aud() && l.door !== 'prayer'; }).filter(function (l) { if (seen[l.practice]) return false; seen[l.practice] = 1; return true; });
      if (!L.length) return;
      h += '<div><h3>' + esc(S.kids ? d.kh : d.h) + '</h3><ul class="ggn-list">' + L.map(itemHtml).join('') + '</ul></div>';
    });
    var P = prayerList();
    if (P.length) {
      h += '<div id="pray"><h3>Rest in Prayer</h3><p class="ggn-muted">Prayers and stillness from many faith traditions. Choose the words that help you.</p></div>';
      TRAD.forEach(function (t) { var L = P.filter(function (l) { return (l.tradition || '') === t[0]; }); if (L.length) h += '<div><h3>' + esc(t[1]) + '</h3><ul class="ggn-list">' + L.map(prayerItem).join('') + '</ul></div>'; });
    }
    h += '<div id="apps"><h3>Support for Right Now, from Every Tree</h3><p class="ggn-muted">The short support videos from the eight Grounded tools, gathered here too.</p><div class="ggn-row" style="justify-content:flex-start;margin-top:10px"><button type="button" class="ggn-pill" data-ggn-act="apps">Show Them</button></div><div id="ggn-apps"></div></div>';
    return h + '</div>';
  }
  function render() {
    var root = document.getElementById('ggn-root'); if (!root) return;
    css();
    var kids = S.kids, v = voice();
    root.innerHTML = '<div class="ggn-wrap">'
      + '<div class="ggn-calm" role="region" aria-labelledby="ggn-h">'
      + '<p class="ggn-eb">Get Grounded Now</p>'
      + '<h1 class="ggn-hello" id="ggn-h">' + (kids ? 'You\'re safe here. Let\'s breathe together.' : 'You\'re here. Let\'s take this one breath at a time.') + '</h1>'
      + '<p class="ggn-what">' + (kids ? 'Calm-down practices for you and a grown-up. Tap the circle to breathe with us, or pick how you feel. Each one is a short video, about 2 minutes.' : 'Short calming practices for a hard moment: a racing heart, spinning thoughts, a hot temper, or feeling far away. Tap the circle to breathe with us, or choose what fits right now. Each one is a short video, about 2 minutes.') + '</p>'
      + '<div class="ggn-orbwrap"><button type="button" class="ggn-orb" data-ggn-act="breathe">Breathe<br>With Me</button><p class="ggn-orbnote">About one minute, with a calm voice.</p></div>'
      + '<div class="ggn-doors">' + DOORS.map(function (d) { return '<button type="button" class="ggn-door" data-ggn-door="' + d.id + '"><b>' + esc(kids ? d.kh : d.h) + '</b><span>' + esc(kids ? d.ksub : d.sub) + '</span></button>'; }).join('')
      + '<button type="button" class="ggn-door wide" data-ggn-door="prayer"><b>Rest in Prayer</b><span>' + (kids ? 'A quiet prayer or a kind blessing' : 'Prayers and stillness from many faith traditions') + '</span></button></div>'
      + '<div class="ggn-row"><button type="button" class="ggn-pill" data-ggn-act="every">See Every Practice</button>'
      + '<button type="button" class="ggn-pill" data-ggn-act="kids" aria-pressed="' + kids + '">For Kids</button>'
      + '<span class="ggn-seg" role="group" aria-label="Voice"><button type="button" data-ggn-voice="brian" aria-pressed="' + (v === 'brian') + '">Male Voice</button><button type="button" data-ggn-voice="jenny" aria-pressed="' + (v === 'jenny') + '">Female Voice</button></span></div>'
      + '<p class="ggn-quiet">' + esc(QUIET) + '</p>'
      + '</div>' + allHtml() + '</div>';
  }

  // ---------- the player overlay (the page video style, shared/page-videos.js) ----------
  function close() {
    var o = S.open; if (!o) return; S.open = null;
    try { if (o.ctl) o.ctl.stop(); } catch (e) {}
    document.removeEventListener('keydown', onKey, true);
    o.root.remove(); document.body.style.overflow = o.overflow || '';
    if (o.from && o.from.focus) try { o.from.focus(); } catch (e) {}
  }
  function onKey(e) { if (S.open && e.key === 'Escape') { e.preventDefault(); close(); } }
  function play(id, queue, from) {
    var l = byId(id); if (!l) return;
    Promise.resolve().then(function () { return need(READ, function () { return !!window.GGRead; }); }).then(function () { return need(LEARN, function () { return !!window.GGLearn; }); }).then(function () {
      if (!window.GGLearn) return;
      var keepFrom = S.open ? S.open.from : (from || document.activeElement);
      if (S.open) { try { S.open.ctl.stop(); } catch (e) {} S.open.root.remove(); document.removeEventListener('keydown', onKey, true); }
      GGLearn.css();
      var root = document.createElement('div');
      root.className = 'ggl ggl-app ggn-pv'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'Video: ' + l.title);
      root.style.setProperty('--ggl-acc', '#5F7D48'); root.style.setProperty('--ggl-bar', '#24301F'); root.style.setProperty('--ggl-lite', '#CFE0BF');
      root.innerHTML = '<div class="ggl-top"><img src="/favicon.svg" alt=""><b>Get Grounded Now</b><button type="button" class="ggl-x" data-ggn-x="1">Back to Get Grounded Now</button></div>'
        + '<div class="ggl-in"><div class="ggl-eb">' + esc(l.door === 'prayer' ? 'Rest in Prayer' : 'Get Grounded Now') + '</div><h1 tabindex="-1">' + esc(l.title) + '</h1><p class="ggl-muted">' + esc(l.blurb || '') + ' About ' + mins(l) + ' minutes.</p><div class="ggn-host"></div><p class="ggn-quiet" style="margin-top:12px">' + esc(QUIET) + '</p></div>';
      document.body.appendChild(root);
      S.open = { root: root, from: keepFrom, overflow: S.open ? S.open.overflow : document.body.style.overflow, queue: queue || [id], id: id };
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey, true);
      root.addEventListener('click', function (e) { if (e.target.closest('[data-ggn-x]')) close(); });
      var q = S.open.queue, at = q.indexOf(id), nx = q.length > 1 ? byId(q[(at + 1) % q.length]) : null, pr = pairOf(l);
      var btns = [];
      if (nx && nx.id !== id) btns.push(['another', 'Try Another', 'pri']);
      if (pr && pr.length === 'after') btns.push(['longer', 'The Longer Version', btns.length ? '' : 'pri']);
      btns.push(['again', 'Again', '']);
      btns.push(['steady', 'I Feel Steadier', 'quiet']);
      var track = { id: 'ggn', kind: 'support', title: 'Get Grounded Now', lessons: [l] };
      S.open.ctl = GGLearn.player(root.querySelector('.ggn-host'), {
        app: 'site', lesson: l, track: track, tracks: [track], done: {}, at: 0, accent: '#5F7D48', mood: 'calm', voice: voice(),
        mark: { name: 'Get Grounded Now' },
        ending: { eyebrow: 'Get Grounded Now', h: 'How do you feel now?', sub: nx && nx.id !== id ? 'Another, if it helps: ' + nx.title : 'Come back any time.', say: 'Take all the time you need.', ok: true, buttons: btns },
        onEnd: function (b) {
          if (b === 'another' && nx) play(nx.id, q);
          else if (b === 'longer' && pr) play(pr.id, [pr.id]);
          else if (b === 'again') play(id, q);
          else if (b === 'steady') close();
        },
        open: function () {}, home: close
      });
      var h1 = root.querySelector('h1'); if (h1) try { h1.focus(); } catch (e) {}
    });
  }
  function door(d, from) {
    var L = d === 'prayer' ? null : doorList(d);
    if (d === 'prayer') { var el = document.getElementById('pray'); if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); var b = el.parentNode.querySelector('#pray ~ div .ggn-play'); if (b) setTimeout(function () { try { b.focus({ preventScroll: true }); } catch (e) {} }, 400); } return; }
    if (!L.length) return;
    play(L[0].id, L.map(function (l) { return l.id; }), from);
  }
  // Support for Right Now videos from the apps (shared/learn-lessons.js), played in the app's own recorded voice.
  function apps() {
    var host = document.getElementById('ggn-apps'); if (!host) return;
    host.innerHTML = '<p class="ggn-muted" style="margin-top:10px">Loading...</p>';
    need(READ, function () { return !!window.GGRead; }).then(function () { return need(LEARN, function () { return !!window.GGLearn; }); }).then(function () { return need(LESSONS, function () { return !!window.GG_LEARN; }); }).then(function () {
      var G = window.GG_LEARN || {}, names = { willow: 'Willow', oak: 'Oak', aspen: 'Aspen', maple: 'Maple', sequoia: 'Sequoia', pine: 'Pine', birch: 'Birch', grove: 'The Grove' }, h = '';
      Object.keys(names).forEach(function (app) {
        var L = []; ((G[app] || {}).tracks || []).forEach(function (t) { if (t.kind === 'support') (t.lessons || []).forEach(function (l) { L.push({ app: app, t: t, l: l }); }); });
        if (!L.length) return;
        h += '<div style="margin-top:14px"><h3>' + esc(names[app]) + '</h3><ul class="ggn-list">' + L.map(function (x) { return '<li class="ggn-item"><div class="t"><b>' + esc(x.l.title) + '</b><small>' + esc(x.l.blurb || '') + '</small></div><div class="b"><button type="button" class="ggn-play" data-ggn-app="' + esc(app) + '" data-ggn-lid="' + esc(x.l.id) + '">Watch, ' + esc(String(x.l.mins || 3)) + ' min</button></div></li>'; }).join('') + '</ul></div>';
      });
      host.innerHTML = h || '<p class="ggn-muted">These open inside each Grounded tool.</p>';
    });
  }
  function playApp(app, lid, from) {
    var G = window.GG_LEARN || {}, hit = null;
    ((G[app] || {}).tracks || []).forEach(function (t) { (t.lessons || []).forEach(function (l) { if (l.id === lid) hit = { t: t, l: l }; }); });
    if (!hit || !window.GGLearn) return;
    var vo = GGLearn.recVoice({ app: app, lesson: hit.l, track: hit.t }, true) || voice();
    if (!byId(lid)) { window.GG_NOW = window.GG_NOW || { lessons: [] }; window.GG_NOW.lessons.push(Object.assign({}, hit.l, { door: 'app', length: 'now', audience: 'app', voice: vo })); }
    var save = S.voice; S.voice = vo; play(lid, [lid], from); S.voice = save;
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-ggn-act],[data-ggn-door],[data-ggn-play],[data-ggn-voice],[data-ggn-app]'); if (!t) return;
    var a = t.getAttribute('data-ggn-act');
    if (a === 'breathe') { var id = sighId(); if (id) play(id, [id].concat(doorList('slow').map(function (l) { return l.id; }).filter(function (x) { return x !== id; })), t); }
    else if (a === 'every') { var ev = document.getElementById('every'); if (ev) ev.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    else if (a === 'kids') { S.kids = !S.kids; try { history.replaceState(history.state, '', S.kids ? '#kids' : location.pathname); } catch (x) {} render(); }
    else if (a === 'apps') apps();
    else if (t.hasAttribute('data-ggn-door')) door(t.getAttribute('data-ggn-door'), t);
    else if (t.hasAttribute('data-ggn-voice')) { S.voice = t.getAttribute('data-ggn-voice'); lsSet('ggn-voice', S.voice); render(); }
    else if (t.hasAttribute('data-ggn-app')) playApp(t.getAttribute('data-ggn-app'), t.getAttribute('data-ggn-lid'), t);
    else if (t.hasAttribute('data-ggn-play')) {
      var pid = t.getAttribute('data-ggn-play'), pl = byId(pid);
      var q = pl && pl.door === 'prayer' ? prayerList().map(function (x) { return x.id; }) : pl ? data().filter(function (x) { return x.door === pl.door && x.audience === pl.audience && x.length === pl.length; }).map(function (x) { return x.id; }) : [pid];
      play(pid, q, t);
    }
  });
  window.addEventListener('hashchange', function () { var k = /(^|#)kids$/.test(location.hash); if (k !== S.kids) { S.kids = k; render(); } });

  window.GGNow = { play: play, door: door, render: render };
  function boot() { need(DATA, function () { return !!window.GG_NOW; }).then(render); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
