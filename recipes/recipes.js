/* =====================================================================
   GROUNDED RECIPES (GWG BLD 875, one recipe view in BLD 877): the public Recipes page, /recipes/.
   Reads window.GGTendPublic.recipes (shared/tending-public.js, public on purpose).
   A list with meal, goal, and fit chips and a search box; each recipe opens a detail view at /recipes/#<recipe id>
   (deep links work on load, Back returns to the list). BLD 877: a gold Guide Me, Step by Step button opens a full screen
   guided mode right on this page: one step at a time in the recorded kitchen voice (field-guide/coach.js, GGVoice, with the
   public clip key GGTendPublic.audio), Back and Next, timers for steps with minutes, the kitchen scene (field-guide/stage.js),
   Voice, Music, and Beeps toggles, and a finish screen. No sign-in. The spoken lines are the ones field-guide/health.js
   speaks in its kitchen guide (LN.cIntro, each step, LN.tset, LN.tdone, LN.cOut), so every line has a recorded clip;
   with no clip, coach.js speaks with the device voice. The Grounded Way (/home/) opens this page in its frame for public
   recipes, so there is one recipe design. Plain JS, no library.
   ===================================================================== */
(function () {
  'use strict';
  var T = window.GGTendPublic || {};
  var ALL = (T.recipes || []).slice();
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  var MEALS = [['all', 'All'], ['breakfast', 'Breakfast'], ['lunch', 'Lunch'], ['dinner', 'Dinner'], ['snack', 'Snack']];
  var GOALS = [['heart', 'Heart', 'Heart and Cholesterol'], ['energy', 'Energy', 'Steady Energy'], ['strength', 'Strength', 'Strength'], ['weight', 'Weight', 'A Healthy Weight'], ['well', 'Well', 'Simply Eating Well']];
  var FITS = [['vegan', 'Vegan'], ['vegetarian', 'Vegetarian'], ['dairyFree', 'Dairy Free'], ['glutenFree', 'Gluten Free'], ['nutFree', 'Nut Free'], ['kidFriendly', 'Kid Friendly']];
  var MEAL_NAME = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snack: 'Snack' };
  // Small drawn meal icons (no photos exist): a sunrise bowl, a leafy bowl, a plate with a fork, an apple.
  var ICON = {
    breakfast: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 17h24a12 12 0 0 1-24 0z"/><path d="M11 28h10"/><path d="M10 12a6 6 0 0 1 12 0"/><path d="M16 3v3M7.5 6.5l2 2M24.5 6.5l-2 2"/></svg>',
    lunch: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 16h24a12 12 0 0 1-24 0z"/><path d="M11 28h10"/><path d="M12 16c-1-4 1-8 5-10 1 4 0 8-3 10"/><path d="M18 16c1-3 4-5 7-5-.5 2.5-2 4.5-4 5"/></svg>',
    dinner: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="16" r="10"/><circle cx="18" cy="16" r="5.5"/><path d="M4 4v7a2 2 0 0 0 2 2v15M4 4v5M8 4v7a2 2 0 0 1-2 2"/></svg>',
    snack: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 10c-3-2.5-10-2-10 6 0 6 4 12 7 12 1.5 0 2-1 3-1s1.5 1 3 1c3 0 7-6 7-12 0-8-7-8.5-10-6z"/><path d="M16 10c0-3 1-5 3-6"/><path d="M17 7c2-2 5-2 6-1-1 2-4 3-6 1z"/></svg>'
  };

  var PLAY = '<svg class="rc-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';
  var st = { meal: 'all', goal: '', fits: [], q: '' };
  var fromList = false, lastId = '', listY = 0;

  function n1(v) { var x = Math.round(Number(v) * 10) / 10; return String(x); }
  function n0(v) { return String(Math.round(Number(v))); }
  function nutLine(r) {
    var n = r.nut || {};
    return n0(n.cal) + ' calories, ' + n1(n.pro) + ' g protein, ' + n1(n.fib) + ' g fiber, ' + n1(n.sf) + ' g saturated fat, ' + n0(n.na) + ' mg sodium';
  }
  function timeLine(r) { return r.mins + ' min, serves ' + r.serves; }
  function hay(r) { return (r.name + ' ' + (r.ingredients || []).join(' ') + ' ' + (r.protein || '')).toLowerCase(); }
  ALL.forEach(function (r) { r._h = hay(r); });

  function matches(r) {
    if (st.meal !== 'all' && r.meal !== st.meal) return false;
    if (st.goal && (r.goals || []).indexOf(st.goal) < 0) return false;
    for (var i = 0; i < st.fits.length; i++) if ((r.fits || []).indexOf(st.fits[i]) < 0) return false;
    var words = st.q.toLowerCase().split(/\s+/).filter(Boolean);
    for (var j = 0; j < words.length; j++) if (r._h.indexOf(words[j]) < 0) return false;
    return true;
  }

  function chip(group, key, label, on, title) {
    return '<button type="button" class="rc-chip" data-g="' + group + '" data-k="' + key + '" aria-pressed="' + (on ? 'true' : 'false') + '"' + (title && title !== label ? ' title="' + esc(title) + '"' : '') + '>' + esc(label) + '</button>';
  }
  function drawChips() {
    $('rc-meal').innerHTML = MEALS.map(function (m) { return chip('meal', m[0], m[1], st.meal === m[0]); }).join('');
    $('rc-goal').innerHTML = GOALS.map(function (g) { return chip('goal', g[0], g[1], st.goal === g[0], g[2]); }).join('');
    $('rc-fit').innerHTML = FITS.map(function (f) { return chip('fit', f[0], f[1], st.fits.indexOf(f[0]) >= 0); }).join('');
  }

  function card(r) {
    return '<button type="button" class="rc-card rc-k-' + esc(r.meal) + '" data-id="' + esc(r.id) + '">' +
      '<span class="rc-ic">' + (ICON[r.meal] || ICON.dinner) + '</span>' +
      '<span class="rc-cb"><span class="rc-m">' + esc(MEAL_NAME[r.meal] || r.meal) + '</span><b>' + esc(r.name) + '</b>' +
      '<span class="rc-t">' + esc(timeLine(r)) + '</span><span class="rc-n">' + esc(nutLine(r)) + '</span></span></button>';
  }

  function drawList() {
    var list = ALL.filter(matches);
    $('rc-grid').innerHTML = list.map(card).join('');
    $('rc-count').textContent = list.length === 1 ? '1 recipe' : list.length + ' recipes';
    $('rc-empty').hidden = list.length > 0;
    $('rc-clear').hidden = !(st.meal !== 'all' || st.goal || st.fits.length || st.q);
  }

  function byId(id) { for (var i = 0; i < ALL.length; i++) if (ALL[i].id === id) return ALL[i]; return null; }

  function note(title, body) { return body ? '<div class="card"><h3>' + esc(title) + '</h3><p>' + esc(body) + '</p></div>' : ''; }

  function detailHTML(r) {
    var n = r.nut || {};
    var goals = GOALS.filter(function (g) { return (r.goals || []).indexOf(g[0]) >= 0; }).map(function (g) { return '<span class="rc-tag rc-g">' + esc(g[2]) + '</span>'; }).join('');
    var fits = FITS.filter(function (f) { return (r.fits || []).indexOf(f[0]) >= 0; }).map(function (f) { return '<span class="rc-tag">' + esc(f[1]) + '</span>'; }).join('');
    var swaps = r.swaps ? Object.keys(r.swaps).map(function (k) { return r.swaps[k]; }).filter(Boolean) : [];
    var rows = [['Calories', n0(n.cal), ''], ['Protein', n1(n.pro), ' g'], ['Carbohydrate', n1(n.carb), ' g'], ['Fiber', n1(n.fib), ' g'], ['Soluble fiber', n1(n.sol), ' g'],
      ['Added sugar', n1(n.sug), ' g'], ['Saturated fat', n1(n.sf), ' g'], ['Sodium', n0(n.na), ' mg'], ['Iron', n1(n.iron), ' mg'], ['Calcium', n0(n.ca), ' mg']]
      .filter(function (x) { return x[1] !== 'NaN'; });
    var steps = (r.steps || []).map(function (s) {
      return '<li>' + esc(s.t) + (s.min ? '<span class="rc-min">About ' + s.min + (s.min === 1 ? ' minute' : ' minutes') + '</span>' : '') + '</li>';
    }).join('');
    return '<button type="button" class="rc-back" id="rc-back"><span aria-hidden="true">&larr;</span> All Recipes</button>' +
      '<article class="rc-k-' + esc(r.meal) + '" aria-labelledby="rc-dname">' +
      '<div class="rc-dh"><span class="rc-ic">' + (ICON[r.meal] || ICON.dinner) + '</span><div><div class="eyebrow">' + esc(MEAL_NAME[r.meal] || r.meal) + '</div>' +
      '<h2 id="rc-dname" tabindex="-1">' + esc(r.name) + '</h2></div></div>' +
      '<div class="rc-meta"><span class="rc-tag">' + r.mins + ' min total</span>' + (r.active && r.active !== r.mins ? '<span class="rc-tag">' + r.active + ' min hands on</span>' : '') +
      '<span class="rc-tag">Serves ' + r.serves + '</span>' + fits + goals + '</div>' +
      '<div class="rc-go"><button type="button" class="btn btn-primary rc-guide-btn" data-rc-guide>' + PLAY + 'Guide Me, Step by Step</button><span>A calm voice guides every step, with timers.</span></div>' +
      '<div class="rc-cols"><div class="card"><h3>Ingredients</h3><ul class="rc-ing">' + (r.ingredients || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="card"><h3>Steps</h3><ol class="rc-steps">' + steps + '</ol></div></div>' +
      '<div class="rc-notes">' + note('To Serve', r.serve) + note('Tip', r.tip) + note('Keeps', r.keeps) + note('For Kids', r.kid) +
      (swaps.length ? '<div class="card"><h3>Swaps</h3>' + swaps.map(function (s) { return '<p>' + esc(s) + '</p>'; }).join('') + '</div>' : '') + '</div>' +
      '<div class="rc-low"><div class="card"><h3>Nutrition per Serving</h3><table class="rc-nut"><caption>Estimates from USDA FoodData Central.</caption><tbody>' +
      rows.map(function (x) { return '<tr><th scope="row">' + x[0] + '</th><td>' + x[1] + x[2] + '</td></tr>'; }).join('') + '</tbody></table></div>' +
      '<div class="card rc-cook"><h3>Guide Me, Step by Step</h3><p>Your kitchen guide, right here: one step at a time, read aloud by a calm voice, with a timer for every step that takes minutes. Cook at your own pace, with Back and Next.</p>' +
      '<button type="button" class="btn btn-primary rc-guide-btn" id="rc-cook" data-rc-guide>' + PLAY + 'Guide Me, Step by Step</button>' +
      '<p class="rc-doc" style="margin-top:18px">' + esc(T.doctor || '') + '</p></div></div>' +
      '</article>';
  }

  var baseTitle = document.title;
  function show() {
    var id = decodeURIComponent((location.hash || '').replace(/^#/, ''));
    var r = id ? byId(id) : null;
    var list = $('rc-list'), det = $('rc-detail');
    if (G.on() && (!r || r.id !== G.id())) G.close(true);
    if (r) {
      if (!list.hidden) listY = window.scrollY;
      det.innerHTML = detailHTML(r);
      list.hidden = true; det.hidden = false;
      document.title = r.name + ' | Grounded Recipes | Grow With Grounded';
      lastId = r.id;
      var top = $('recipes').getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo(0, Math.max(0, top));
      var h = $('rc-dname'); if (h) h.focus({ preventScroll: true });
    } else {
      var wasDetail = !det.hidden;
      det.hidden = true; det.innerHTML = ''; list.hidden = false;
      document.title = baseTitle;
      if (wasDetail && lastId) {
        window.scrollTo(0, listY);
        var c = document.querySelector('.rc-card[data-id="' + (window.CSS && CSS.escape ? CSS.escape(lastId) : lastId) + '"]');
        if (c) c.focus({ preventScroll: true });
      }
    }
  }

  function goBack() {
    if (fromList) { fromList = false; history.back(); return; }
    history.pushState(null, '', location.pathname + location.search);
    show();
  }

  /* ---------- BLD 877: Guide Me, Step by Step, built into the page ----------
     The same flow as the kitchen guide in field-guide/health.js (vGuide, kEnter, kStartTimer): the voice says
     'We are making <name>.', then each step as it opens; a step with minutes offers a timer ('Timer set for N minutes.'),
     and a finished timer chimes and says 'That timer is done.'; the finish says 'All done. Enjoy the table together.'
     Voice id 'andrew' is the recorded kitchen voice's clip id (never shown). */
  var G = (function () {
    var VOICE = 'andrew';
    var LN = {
      cIntro: function (n) { return 'We are making ' + n + '.'; },
      tset: function (m) { return 'Timer set for ' + m + ' minute' + (m === 1 ? '' : 's') + '.'; },
      tdone: 'That timer is done.',
      cOut: 'All done. Enjoy the table together.'
    };
    var o = null, el = null, tick = 0, wl = null, keyed = false;
    var V = function () { return window.GGVoice || null; };
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var clock = function (ms) { var s = Math.ceil(Math.max(0, ms) / 1000); return Math.floor(s / 60) + ':' + pad(s % 60); };
    var steps = function () { return (o.r.steps || []).map(function (x) { return typeof x === 'string' ? { t: x } : x; }); };
    function setKey() { var v = V(); if (v && !keyed && T.audio) { v.setKey(T.audio); keyed = true; } }
    function say(text) { var v = V(); if (!v || !o) return Promise.resolve(); var me = o; return v.say(VOICE, text).then(function () { return me === o; }); }
    function enter() { var s = steps()[o.gi]; if (!s) return; say(s.t); var nx = steps()[o.gi + 1], v = V(); if (nx && v) v.prefetch(VOICE, nx.t); }
    function chime() {
      var v = V(); if (v && !v.chimeOn()) return;
      try { var A = window.AudioContext || window.webkitAudioContext; if (A) { var c = chime.c = chime.c || new A(); [0, 0.35, 0.7].forEach(function (t) { var g = c.createGain(), os = c.createOscillator(); os.frequency.value = 660; g.gain.setValueAtTime(0.0001, c.currentTime + t); g.gain.exponentialRampToValueAtTime(0.25, c.currentTime + t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + t + 0.3); os.connect(g); g.connect(c.destination); os.start(c.currentTime + t); os.stop(c.currentTime + t + 0.32); }); } } catch (e) {}
      try { if (navigator.vibrate) navigator.vibrate([200, 100, 200]); } catch (e) {}
    }
    function wake(on) { try { if (on && navigator.wakeLock && !wl) navigator.wakeLock.request('screen').then(function (l) { wl = l; }).catch(function () {}); if (!on && wl) { wl.release(); wl = null; } } catch (e) {} }
    var MUSIC = '/audio/music/calm-' + (1 + new Date().getDay() % 7) + '.mp3';
    function music() { var v = V(); if (!v) return; if (o && !o.fin && v.musicOn()) v.music(MUSIC); else v.music(null); }
    function first() { var ts = o.timers.slice().sort(function (a, b) { return a.end - b.end; }); return ts[0] || null; }
    function stage(state) {
      var op = { hour: new Date().getHours() }, ft = first(), S = steps();
      if (ft && state === 'cook') { var tot = (+(S[ft.i] || {}).min || 1) * 60000; op.pct = Math.max(0, Math.min(1, (ft.end - Date.now()) / tot)); op.secs = Math.ceil(Math.max(0, ft.end - Date.now()) / 1000); }
      var inner = '';
      if (window.GGStage && GGStage.scene) { try { inner = GGStage.scene(state, op) || ''; } catch (e) { inner = ''; } }
      return '<div class="rg-stage' + (inner ? '' : ' fb') + '" aria-hidden="true">' + (inner || '<div data-ggstage></div>') + '</div>';
    }
    function colors(state) { try { if (window.GGStage && GGStage.colors) return GGStage.colors(state, new Date().getHours()) || {}; } catch (e) {} return {}; }
    function toggles() {
      var v = V(), on = v ? v.on() : false, mu = v ? v.musicOn() : false, ch = v ? v.chimeOn() : true;
      var b = function (a, p, yes, no) { return '<button type="button" class="rg-chip" aria-pressed="' + p + '" data-rg="' + a + '">' + (p ? yes : no) + '</button>'; };
      return '<div class="rg-tg" role="group" aria-label="Sound">' + (v ? b('voice', on, 'Voice On', 'Voice Off') + b('music', mu, 'Music On', 'Music Off') : '') + (v ? b('beeps', ch, 'Beeps On', 'Beeps Off') : '') + '</div>';
    }
    function timersHtml(canStop) {
      if (!o.timers.length) return '';
      return '<div class="rg-timers">' + o.timers.map(function (t) {
        return '<div><span class="rg-tclock" data-rgt="' + t.i + '">' + clock(t.end - Date.now()) + '</span><small>Step ' + (t.i + 1) + ': ' + esc(t.label) + '</small>' + (canStop ? '<button type="button" class="rg-link" data-rg="tstop" data-v="' + t.i + '">Stop</button>' : '') + '</div>';
      }).join('') + '</div>';
    }
    function rangHtml() { return o.rang ? '<div class="rg-rang" role="status"><b>Timer done:</b> <span>Step ' + (o.rang.i + 1) + ', ' + esc(o.rang.label) + '</span><button type="button" class="rg-link" data-rg="ok">Got It</button></div>' : ''; }
    function html() {
      var S = steps(), n = S.length, s = S[o.gi], fin = !s, pct = Math.round(100 * Math.min(o.gi, n) / Math.max(1, n));
      var state = fin ? 'done' : 'cook', c = colors(state);
      el.style.setProperty('--rg-ac', c.accent || '#C9772B');
      var top = '<div class="rg-top"><div class="rg-tt"><div class="rg-kick">' + (fin ? 'Ready' : 'Step ' + (o.gi + 1) + ' of ' + n) + '</div><b id="rg-title">' + esc(o.r.name) + '</b></div>' +
        '<button type="button" class="rg-x" data-rg="close" aria-label="Close the guide and return to the recipe">&times;</button></div>' +
        '<div class="rg-prog" role="progressbar" aria-label="Progress" aria-valuemin="0" aria-valuemax="' + n + '" aria-valuenow="' + Math.min(o.gi, n) + '"><span style="width:' + pct + '%"></span></div>';
      if (fin) {
        return top + stage('done') + rangHtml() + timersHtml(true) +
          '<div class="rg-body rg-fin"><div class="rg-big">Ready to enjoy.</div>' +
          '<p class="rg-sub">' + esc(o.r.serve || ('Serves ' + o.r.serves + '.')) + '</p>' +
          (o.r.keeps ? '<p class="rg-note"><b>Keeps:</b> ' + esc(o.r.keeps) + '</p>' : '') +
          '<div class="rg-btns"><button type="button" class="btn btn-primary" data-rg="close">All Done</button><button type="button" class="btn btn-line rg-line" data-rg="again">Cook It Again</button></div>' +
          '<button type="button" class="rg-link rg-under" data-rg="back">Back to the Last Step</button>' + toggles() + '</div>';
      }
      var mine = o.timers.some(function (t) { return t.i === o.gi; });
      return top + stage('cook') + rangHtml() + timersHtml(true) +
        '<div class="rg-body" aria-live="polite">' + (s.at ? '<div class="rg-at">' + esc(s.at) + '</div>' : '') + '<p class="rg-step" id="rg-step">' + esc(s.t) + '</p>' +
        (+s.min ? (mine ? '<p class="rg-sub">Timer running.</p>' : '<button type="button" class="btn btn-line rg-line rg-tbtn" data-rg="timer" data-v="' + o.gi + '">Start ' + (+s.min) + ' min Timer</button>') : '') +
        '<div class="rg-btns"><button type="button" class="btn btn-line rg-line" data-rg="back"' + (o.gi ? '' : ' disabled') + '>Back</button><button type="button" class="btn btn-primary" data-rg="next">' + (o.gi === n - 1 ? 'Finish' : 'Next Step') + '</button></div>' +
        '<button type="button" class="rg-link rg-under" data-rg="again1">Say It Again</button>' + toggles() + '</div>';
    }
    function draw(focusSel) {
      if (!el || !o) return;
      el.querySelector('.rg-in').innerHTML = html();
      var f = focusSel && el.querySelector(focusSel); if (f) f.focus({ preventScroll: true });
    }
    function startTimer(i) {
      var s = steps()[i]; if (!s || !+s.min) return;
      o.timers = o.timers.filter(function (t) { return t.i !== i; });
      o.timers.push({ i: i, end: Date.now() + s.min * 60000, label: s.t.length > 70 ? s.t.slice(0, 68).replace(/\s+\S*$/, '') + '...' : s.t });
      say(LN.tset(+s.min)); draw('[data-rg="next"]');
    }
    function onTick() {
      if (!o || !o.timers.length) return;
      var now = Date.now();
      o.timers.forEach(function (t) { var e = el.querySelector('[data-rgt="' + t.i + '"]'); if (e) e.textContent = clock(t.end - now); });
      var ft = first(), S = steps();
      if (ft && window.GGStage && GGStage.update) { var box = el.querySelector('[data-ggstage]'); if (box) { try { GGStage.update(box, { pct: Math.max(0, Math.min(1, (ft.end - now) / ((+(S[ft.i] || {}).min || 1) * 60000))), secs: Math.ceil(Math.max(0, ft.end - now) / 1000) }); } catch (e) {} } }
      var done = o.timers.filter(function (t) { return t.end <= now; }); if (!done.length) return;
      o.timers = o.timers.filter(function (t) { return t.end > now; }); o.rang = done[done.length - 1];
      chime(); say(LN.tdone); draw();
    }
    function act(a, v) {
      var vo = V(), n = steps().length;
      switch (a) {
        case 'close': close(); return;
        case 'next': if (vo) vo.stop(); o.gi = Math.min(n, o.gi + 1); if (o.gi < n) { draw('[data-rg="next"]'); enter(); } else { o.fin = true; music(); draw('[data-rg="close"]'); say(LN.cOut); } return;
        case 'back': if (o.gi > 0) { if (vo) vo.stop(); o.gi--; o.fin = false; music(); draw(o.gi ? '[data-rg="back"]' : '[data-rg="next"]'); enter(); } return;
        case 'again1': if (vo) vo.stop(); enter(); return;
        case 'again': if (vo) vo.stop(); o.gi = 0; o.fin = false; o.timers = []; o.rang = null; music(); draw('[data-rg="next"]'); say(LN.cIntro(o.r.name)).then(function (still) { if (still && o.gi === 0 && !o.fin) enter(); }); return;
        case 'timer': startTimer(+v); return;
        case 'tstop': o.timers = o.timers.filter(function (t) { return t.i !== +v; }); draw(); return;
        case 'ok': o.rang = null; draw(); return;
        case 'voice': if (vo) vo.setOn(!vo.on()); draw('[data-rg="voice"]'); return;
        case 'music': if (vo) { vo.setMusic(!vo.musicOn()); music(); } draw('[data-rg="music"]'); return;
        case 'beeps': if (vo) vo.setChime(!vo.chimeOn()); draw('[data-rg="beeps"]'); return;
      }
    }
    function trap(e) {
      if (!el) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      var f = Array.prototype.filter.call(el.querySelectorAll('button:not([disabled]),a[href]'), function (x) { return x.offsetParent !== null; });
      if (!f.length) return; var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
    function open(r, btn) {
      if (o) close(true);
      setKey();
      var vo = V(); if (vo) vo.unlock();
      o = { r: r, gi: 0, timers: [], rang: null, fin: false, btn: btn || null };
      el = document.createElement('div'); el.className = 'rg-ov'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-labelledby', 'rg-title');
      el.innerHTML = '<div class="rg-in"></div>';
      el.addEventListener('click', function (e) { var b = e.target.closest('[data-rg]'); if (b && !b.disabled) act(b.getAttribute('data-rg'), b.getAttribute('data-v')); });
      document.body.appendChild(el); document.documentElement.classList.add('rg-lock');
      document.addEventListener('keydown', trap);
      try { history.pushState({ rcGuide: 1 }, '', location.href); } catch (e) {}
      draw('[data-rg="next"]'); music(); wake(true);
      tick = setInterval(onTick, 500);
      say(LN.cIntro(r.name)).then(function (still) { if (still && o.gi === 0 && !o.fin) enter(); });
      var S = steps(); if (vo && S[0]) vo.prefetch(VOICE, S[0].t);
    }
    function close(fromHistory) {
      if (!o) return;
      var vo = V(), btn = o.btn; if (vo) { vo.stop(); vo.music(null); }
      clearInterval(tick); wake(false); document.removeEventListener('keydown', trap);
      if (el) el.remove(); el = null; o = null; document.documentElement.classList.remove('rg-lock');
      if (!fromHistory && history.state && history.state.rcGuide) { try { history.back(); } catch (e) {} }
      if (btn && document.body.contains(btn)) btn.focus({ preventScroll: true });
    }
    return { open: open, close: close, on: function () { return !!o; }, id: function () { return o ? o.r.id : ''; }, LN: LN };
  })();
  window.GGRecipes = { guide: G };

  function init() {
    var d = document.querySelector('[data-rc-doctor]'); if (d && T.doctor) d.textContent = T.doctor;
    if (!ALL.length) { $('rc-empty').hidden = false; $('rc-empty').textContent = 'The recipes are on their way. Refresh the page in a moment.'; return; }
    $('rc-tools').hidden = false;
    drawChips(); drawList();
    $('rc-tools').addEventListener('click', function (e) {
      var b = e.target.closest('.rc-chip'); if (!b) return;
      var g = b.getAttribute('data-g'), k = b.getAttribute('data-k');
      if (g === 'meal') st.meal = k;
      else if (g === 'goal') st.goal = st.goal === k ? '' : k;
      else { var i = st.fits.indexOf(k); if (i >= 0) st.fits.splice(i, 1); else st.fits.push(k); }
      drawChips(); drawList();
      var again = document.querySelector('.rc-chip[data-g="' + g + '"][data-k="' + k + '"]'); if (again) again.focus();
    });
    $('rc-q').addEventListener('input', function () { st.q = this.value.trim(); drawList(); });
    $('rc-clear').addEventListener('click', function () { st = { meal: 'all', goal: '', fits: [], q: '' }; $('rc-q').value = ''; drawChips(); drawList(); $('rc-q').focus(); });
    $('rc-grid').addEventListener('click', function (e) {
      var c = e.target.closest('.rc-card'); if (!c) return;
      fromList = true;
      location.hash = c.getAttribute('data-id');
    });
    $('rc-detail').addEventListener('click', function (e) {
      if (e.target.closest('#rc-back')) goBack();
      else if (e.target.closest('[data-rc-guide]')) { var r = byId(lastId); if (r) G.open(r, e.target.closest('[data-rc-guide]')); }
    });
    window.addEventListener('hashchange', function () { if (!location.hash) fromList = false; show(); });
    window.addEventListener('popstate', function () { if (G.on() && !(history.state && history.state.rcGuide)) G.close(true); if (!location.hash) fromList = false; });
    if (location.hash) show();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
