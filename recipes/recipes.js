/* =====================================================================
   GROUNDED RECIPES (GWG BLD 875): the public Recipes page, /recipes/.
   Reads window.GGTendPublic.recipes (shared/tending-public.js, public on purpose).
   A list with meal, goal, and fit chips and a search box; each recipe opens a detail
   view at /recipes/#<recipe id> (deep links work on load, Back returns to the list),
   with a gold Cook It With Andrew button to /home/#recipe-<id>. Plain JS, no library.
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
    var href = '../home/#recipe-' + encodeURIComponent(r.id);
    return '<button type="button" class="rc-back" id="rc-back"><span aria-hidden="true">&larr;</span> All Recipes</button>' +
      '<article class="rc-k-' + esc(r.meal) + '" aria-labelledby="rc-dname">' +
      '<div class="rc-dh"><span class="rc-ic">' + (ICON[r.meal] || ICON.dinner) + '</span><div><div class="eyebrow">' + esc(MEAL_NAME[r.meal] || r.meal) + '</div>' +
      '<h2 id="rc-dname" tabindex="-1">' + esc(r.name) + '</h2></div></div>' +
      '<div class="rc-meta"><span class="rc-tag">' + r.mins + ' min total</span>' + (r.active && r.active !== r.mins ? '<span class="rc-tag">' + r.active + ' min hands on</span>' : '') +
      '<span class="rc-tag">Serves ' + r.serves + '</span>' + fits + goals + '</div>' +
      '<div class="rc-cols"><div class="card"><h3>Ingredients</h3><ul class="rc-ing">' + (r.ingredients || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="card"><h3>Steps</h3><ol class="rc-steps">' + steps + '</ol></div></div>' +
      '<div class="rc-notes">' + note('To Serve', r.serve) + note('Tip', r.tip) + note('Keeps', r.keeps) + note('For Kids', r.kid) +
      (swaps.length ? '<div class="card"><h3>Swaps</h3>' + swaps.map(function (s) { return '<p>' + esc(s) + '</p>'; }).join('') + '</div>' : '') + '</div>' +
      '<div class="rc-low"><div class="card"><h3>Nutrition per Serving</h3><table class="rc-nut"><caption>Estimates from USDA FoodData Central.</caption><tbody>' +
      rows.map(function (x) { return '<tr><th scope="row">' + x[0] + '</th><td>' + x[1] + x[2] + '</td></tr>'; }).join('') + '</tbody></table></div>' +
      '<div class="card rc-cook"><h3>Cook It With Andrew</h3><p>Andrew guides every step, with timers, in The Grounded Way, private on your device.</p>' +
      '<a class="btn btn-primary" id="rc-cook" href="' + href + '">Cook It With Andrew <span aria-hidden="true">&rarr;</span></a>' +
      '<p class="rc-doc" style="margin-top:18px">' + esc(T.doctor || '') + '</p></div></div>' +
      '</article>';
  }

  var baseTitle = document.title;
  function show() {
    var id = decodeURIComponent((location.hash || '').replace(/^#/, ''));
    var r = id ? byId(id) : null;
    var list = $('rc-list'), det = $('rc-detail');
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
    $('rc-detail').addEventListener('click', function (e) { if (e.target.closest('#rc-back')) goBack(); });
    window.addEventListener('hashchange', function () { if (!location.hash) fromList = false; show(); });
    window.addEventListener('popstate', function () { if (!location.hash) fromList = false; });
    if (location.hash) show();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
