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
   BLD 880: every recipe is written for six. A Serves picker on each recipe (2 to 12) scales the ingredients with
   shared/gg-scale.js (GGScale); the steps fit every size and nutrition stays per serving. The choice is remembered on this
   device (localStorage gg-serves), and The Grounded Way opens a recipe at the household's size with /recipes/?serves=N#id.
   BLD 899 (Chris: "clean it up w cards to organize better add some color and energy"): painted meal cards near the top
   (Breakfast, Lunch, Dinner, Snacks, Holidays and Gatherings, each with a count) filter the list; the list groups by meal
   with a heading and count when no filter or search is on, and shows one flat grid while filtering or searching; Goals and
   Fits share one row of chips; each recipe card carries its meal's color band, a bigger icon, time and serves as pills, and
   a short nutrition line. Holidays and Gatherings is its own section inside the page (soonest first), reached by its meal
   card or /recipes/#holidays (The Grounded Way Library keeps holidays inside its Grounded Recipes shelf).
   BLD 900: Add to My Menu on every recipe and every holiday recipe (see menuGo).
   BLD 902 (Chris: "a great guac recipe", "a party drink menu w non alcoholic beverage ideas recipes guides etc"): Party Food
   (meal 'party') and Drinks (meal 'drink') meal cards. Party Food groups in the list like the other meals; the Drinks card opens
   Celebration Drinks, its own section inside the page (/recipes/#drinks): the drink menu in its sections, Build Your Own
   Sparkler, and the Party Drink Station guide (GGTendPublic.party). A holiday set's page lists the recipes that name it in
   their holidays field under More for This Day (by reference; the sets stay as they are).
   BLD 903 (Chris, November 1, 2026: a small "Sauces and Dressings" group): meal 'sauce', a Sauces and Dressings meal card and
   a grouped section like Party Food. A sauce may carry pairs: [recipe ids]; the sauce shows a Pairs With card linking those
   recipes, and each of those recipes shows a Pairs With card linking the sauce.
   ===================================================================== */
(function () {
  'use strict';
  var T = window.GGTendPublic || {};
  var ALL = (T.recipes || []).slice();
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  // BLD 899: the painted meal cards. The painting names live in /shared/heroes/way/.
  var W = '/shared/heroes/way/';
  var CATS = [['breakfast', 'Breakfast', 'weekly-batch-sq'], ['lunch', 'Lunch', 'meal-lunch-sq'], ['dinner', 'Dinner', 'dinner-fish-sq'], ['snack', 'Snacks', 'snack-fruit-sq'], ['party', 'Party Food', 'kitchen-headstart-sq'], ['sauce', 'Sauces and Dressings', 'prep-together-sq'], ['drink', 'Drinks', 'drinks-sq'], ['holidays', 'Holidays and Gatherings', 'dinner-chili-sq']];
  var BAND = { breakfast: ['weekly-batch', 'weekly-batch-sq'], lunch: ['meal-lunch', 'meal-lunch-sq'], dinner: ['todays-plate', 'todays-plate-sq'], snack: ['snack-fruit', 'snack-fruit-sq'], party: ['kitchen-headstart', 'kitchen-headstart-sq'], sauce: ['prep-together', 'prep-together-sq'], drink: ['drinks', 'drinks-sq'] };
  // BLD 902: the Drinks card, like Holidays and Gatherings, opens its own section (Celebration Drinks) instead of filtering the list.
  var SHELF = { holidays: 1, drink: 1 };
  var PARTY = T.party || null;
  var CLOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  var PEOPLE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4.5a3 3 0 0 1 0 6M18 14c2 .8 3 3 3 6"/></svg>';
  var GOALS = [['heart', 'Heart', 'Heart and Cholesterol'], ['energy', 'Energy', 'Steady Energy'], ['strength', 'Strength', 'Strength'], ['weight', 'Weight', 'A Healthy Weight'], ['well', 'Well', 'Simply Eating Well']];
  var FITS = [['vegan', 'Vegan'], ['vegetarian', 'Vegetarian'], ['dairyFree', 'Dairy Free'], ['glutenFree', 'Gluten Free'], ['nutFree', 'Nut Free'], ['kidFriendly', 'Kid Friendly']];
  var MEAL_NAME = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snack: 'Snack', party: 'Party Food', sauce: 'Sauce and Dressing', drink: 'Drink' };
  // Small drawn meal icons (no photos exist): a sunrise bowl, a leafy bowl, a plate with a fork, an apple.
  var ICON = {
    breakfast: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 17h24a12 12 0 0 1-24 0z"/><path d="M11 28h10"/><path d="M10 12a6 6 0 0 1 12 0"/><path d="M16 3v3M7.5 6.5l2 2M24.5 6.5l-2 2"/></svg>',
    lunch: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 16h24a12 12 0 0 1-24 0z"/><path d="M11 28h10"/><path d="M12 16c-1-4 1-8 5-10 1 4 0 8-3 10"/><path d="M18 16c1-3 4-5 7-5-.5 2.5-2 4.5-4 5"/></svg>',
    dinner: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="16" r="10"/><circle cx="18" cy="16" r="5.5"/><path d="M4 4v7a2 2 0 0 0 2 2v15M4 4v5M8 4v7a2 2 0 0 1-2 2"/></svg>',
    snack: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 10c-3-2.5-10-2-10 6 0 6 4 12 7 12 1.5 0 2-1 3-1s1.5 1 3 1c3 0 7-6 7-12 0-8-7-8.5-10-6z"/><path d="M16 10c0-3 1-5 3-6"/><path d="M17 7c2-2 5-2 6-1-1 2-4 3-6 1z"/></svg>',
    // BLD 902: a dip bowl with a chip (Party Food) and a tall glass with a citrus wheel and a straw (Drinks).
    party: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 17h24a12 9 0 0 1-24 0z"/><path d="M12 28h8"/><path d="M14 13l4-9 4 9"/><path d="M9 14c2-1.5 4-1.5 5 0"/></svg>',
    // BLD 903: a small cruet with a stopper and a leaf (Sauces and Dressings).
    sauce: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3h6v3h-6z"/><path d="M14 6v4c-4 1.5-6 5-6 9v6a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-6c0-4-2-7.5-6-9V6"/><path d="M9 20h14"/><path d="M19 23c0-2 1.5-3.5 3.5-3.5 0 2-1.5 3.5-3.5 3.5z"/></svg>',
    drink: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 9h14l-2 19h-10z"/><path d="M9 15h12"/><path d="M17 9l4-6h4"/><circle cx="23" cy="9" r="4"/></svg>'
  };

  var PLAY = '<svg class="rc-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';
  var st = { meal: 'all', goal: '', fits: [], q: '' };
  // BLD 880: the table size. ?serves=N (from The Grounded Way) is read once on load; a choice on the picker is remembered.
  var SIZES = [2, 3, 4, 5, 6, 7, 8, 10, 12];
  var okSize = function (v) { v = Math.round(+v); return v >= 1 && v <= 30 ? v : 0; };
  var serves = (function () {
    var q = 0; try { q = okSize(new URLSearchParams(location.search).get('serves')); } catch (e) {}
    if (q) return q;
    try { var m = okSize(localStorage.getItem('gg-serves')); if (m) return m; } catch (e) {}
    return 6;
  })();
  // Chris (November 1, 2026): pitcher drinks open at their full batch (12, or 8 for infused waters); the Serves chips still
  // make a smaller batch, for this drink only, and the table size for meals stays as it is.
  var batchSize = {};
  function isBatch(r) { return !!(r && r.meal === 'drink' && +r.serves > 6); }
  function sv(r) { return isBatch(r) ? (batchSize[r.id] || +r.serves) : serves; }
  function sized(r) { return window.GGScale && r ? GGScale.recipe(r, sv(r)) : r; }
  function sizeChips(cur) {
    cur = cur || serves;
    var list = SIZES.indexOf(cur) < 0 ? SIZES.concat(cur).sort(function (a, b) { return a - b; }) : SIZES;
    return list.map(function (n) { return '<button type="button" class="rc-chip rc-sz" data-sz="' + n + '" aria-pressed="' + (n === cur ? 'true' : 'false') + '" aria-label="Serves ' + n + '">' + n + '</button>'; }).join('');
  }
  function ingHTML(r) { return (sized(r).ingredients || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join(''); }
  var fromList = false, lastId = '', listY = 0;

  function n1(v) { var x = Math.round(Number(v) * 10) / 10; return String(x); }
  function n0(v) { return String(Math.round(Number(v))); }
  function nutLine(r) {
    var n = r.nut || {};
    return n0(n.cal) + ' calories, ' + n1(n.pro) + ' g protein, ' + n1(n.fib) + ' g fiber, ' + n1(n.sf) + ' g saturated fat, ' + n0(n.na) + ' mg sodium';
  }
  function timeLine(r) { return r.mins + ' min, serves ' + (window.GGScale ? sv(r) : r.serves); }
  function shortNut(r) { var n = r.nut || {}; return n0(n.cal) + ' calories, ' + n1(n.pro) + ' g protein, ' + n1(n.fib) + ' g fiber per serving'; }
  function filtering() { return st.meal !== 'all' || !!st.goal || st.fits.length > 0 || !!st.q; }
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
    $('rc-goal').innerHTML = GOALS.map(function (g) { return chip('goal', g[0], g[1], st.goal === g[0], g[2]); }).join('');
    $('rc-fit').innerHTML = FITS.map(function (f) { return chip('fit', f[0], f[1], st.fits.indexOf(f[0]) >= 0).replace('class="rc-chip"', 'class="rc-chip rc-fitc"'); }).join('');
    drawCats();
  }
  function mealCount(m) { return ALL.filter(function (r) { return r.meal === m; }).length; }
  function drawCats() {
    var box = $('rc-cats'); if (!box) return;
    box.innerHTML = CATS.map(function (c) {
      var hol = c[0] === 'holidays', shelf = !!SHELF[c[0]];
      if (hol && !(HOL && (HOL.sets || []).length)) return '';
      if (c[0] === 'drink' && !mealCount('drink')) return '';
      var n = hol ? HOL.sets.length : mealCount(c[0]), nx = hol ? holOrder()[0] : null;
      var cnt = n + (hol ? (n === 1 ? ' set' : ' sets') : (n === 1 ? ' recipe' : ' recipes'));
      var extra = hol && nx && nx.date ? '<span class="rc-cx">Next: ' + esc(HOL.get(nx.id).name) + ', ' + esc(soonText(nx.date)) + '</span>' : c[0] === 'drink' ? '<span class="rc-cx">Sparkling, cozy, creamy, and pitchers for a crowd</span>' : '';
      return '<button type="button" class="rc-cat rc-k-' + c[0] + '" data-cat="' + c[0] + '"' + (shelf ? '' : ' aria-pressed="' + (st.meal === c[0] ? 'true' : 'false') + '"') +
        ' aria-label="' + esc(c[1] + ', ' + cnt + (shelf ? '' : (st.meal === c[0] ? ', showing now' : ''))) + '"><img src="' + W + c[2] + '.webp" alt="" decoding="async">' +
        '<span class="rc-cat-in"><b>' + esc(c[1]) + '</b><span class="rc-cn">' + esc(cnt) + '</span>' + extra + '</span></button>';
    }).join('');
  }

  function card(r) {
    return '<button type="button" class="rc-card rc-k-' + esc(r.meal) + '" data-id="' + esc(r.id) + '">' +
      '<span class="rc-band"><span class="rc-ic">' + (ICON[r.meal] || ICON.dinner) + '</span><span class="rc-m">' + esc(MEAL_NAME[r.meal] || r.meal) + '</span></span>' +
      '<span class="rc-cb"><b>' + esc(r.name) + '</b>' +
      '<span class="rc-pills"><span class="rc-pill">' + CLOCK + esc(r.mins + ' min') + '</span><span class="rc-pill">' + PEOPLE + esc('Serves ' + (window.GGScale ? sv(r) : r.serves)) + '</span></span>' +
      '<span class="rc-n" title="' + esc(nutLine(r)) + '">' + esc(shortNut(r)) + '</span></span></button>';
  }
  function section(c, list) {
    if (!list.length) return '';
    return '<section class="rc-sec rc-k-' + c[0] + '" data-meal="' + c[0] + '" aria-labelledby="rc-s-' + c[0] + '"><div class="rc-sh"><img src="' + W + c[2] + '.webp" alt="" loading="lazy" decoding="async">' +
      '<h2 id="rc-s-' + c[0] + '">' + esc(c[1]) + '</h2><span class="rc-shn">' + list.length + (list.length === 1 ? ' recipe' : ' recipes') + '</span></div>' +
      '<div class="rc-grid">' + list.map(card).join('') + '</div></section>';
  }

  function drawList() {
    var list = ALL.filter(matches);
    if (filtering()) $('rc-grid').innerHTML = list.length ? '<div class="rc-grid">' + list.map(card).join('') + '</div>' : '';
    else $('rc-grid').innerHTML = CATS.filter(function (c) { return !SHELF[c[0]]; }).map(function (c) { return section(c, list.filter(function (r) { return r.meal === c[0]; })); }).join('');
    var cn = list.length === 1 ? '1 recipe' : list.length + ' recipes';
    $('rc-count').innerHTML = st.meal !== 'all' ? '<b>' + esc(CATS.filter(function (c) { return c[0] === st.meal; })[0][1]) + ':</b> ' + cn : cn;
    $('rc-empty').hidden = list.length > 0;
    $('rc-clear').hidden = !(st.meal !== 'all' || st.goal || st.fits.length || st.q);
  }

  function byId(id) { for (var i = 0; i < ALL.length; i++) if (ALL[i].id === id) return ALL[i]; return null; }

  // BLD 903: Pairs With. A sauce lists the recipes in its pairs field; a recipe lists every sauce that names it.
  function pairsOf(r) {
    var out = r.meal === 'sauce' ? (r.pairs || []).map(byId) : ALL.filter(function (x) { return x.meal === 'sauce' && (x.pairs || []).indexOf(r.id) >= 0; });
    return out.filter(Boolean);
  }
  function pairsHTML(r) {
    var L = pairsOf(r); if (!L.length) return '';
    return '<div class="card rc-pairs"><h3>Pairs With</h3><ul>' + L.map(function (x) { return '<li><a href="#' + esc(x.id) + '">' + esc(x.name) + '</a></li>'; }).join('') + '</ul></div>';
  }
  function note(title, body) { return body ? '<div class="card"><h3>' + esc(title) + '</h3><p>' + esc(body) + '</p></div>' : ''; }

  // BLD 899: the recipe opens on its meal's painting (a dinner by its main: fish, chili and stews, or Today's Plate).
  function bandHTML(r) {
    var b = BAND[r.meal] || BAND.dinner, wide = b[0], sq = b[1];
    if (r.meal === 'dinner') { var t = String(r.name || ''); if (/salmon|\bcod\b|fish|shrimp|tuna|trout|sardine|halibut|tilapia/i.test(t)) { wide = 'dinner-fish'; sq = 'dinner-fish-sq'; } else if (/chili|soup|stew/i.test(t)) { wide = 'dinner-chili'; sq = 'dinner-chili-sq'; } }
    return '<div class="rc-dhero" aria-hidden="true"><picture><source media="(max-width:699px)" srcset="' + W + sq + '.webp"><img src="' + W + wide + '.webp" alt="" decoding="async"></picture></div>';
  }
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
      '<article class="rc-k-' + esc(r.meal) + '" aria-labelledby="rc-dname">' + bandHTML(r) +
      '<div class="rc-dh"><span class="rc-ic">' + (ICON[r.meal] || ICON.dinner) + '</span><div><div class="eyebrow">' + esc(MEAL_NAME[r.meal] || r.meal) + '</div>' +
      '<h2 id="rc-dname" tabindex="-1">' + esc(r.name) + '</h2></div></div>' +
      '<div class="rc-meta"><span class="rc-tag">' + r.mins + ' min total</span>' + (r.active && r.active !== r.mins ? '<span class="rc-tag">' + r.active + ' min hands on</span>' : '') +
      '<span class="rc-tag" id="rc-serves">Serves ' + (window.GGScale ? sv(r) : r.serves) + '</span>' + fits + goals + '</div>' +
      '<div class="rc-go"><button type="button" class="btn btn-primary rc-guide-btn" data-rc-guide>' + PLAY + 'Guide Me, Step by Step</button>' + menuBtn('r:' + r.id) + '<span>A calm voice guides every step, with timers.</span></div><div class="rc-mnote" data-rc-mnote="r:' + esc(r.id) + '" hidden></div>' +
      '<div class="rc-cols"><div class="card"><h3>Ingredients</h3>' +
      (window.GGScale ? '<div class="rc-size"><div class="rc-row" role="group" aria-labelledby="rc-l-size"><span class="rc-lab" id="rc-l-size">Serves</span>' + sizeChips(sv(r)) + '</div>' +
        '<p class="rc-size-note">' + (isBatch(r) ? 'A full pitcher. Choose a smaller batch any time; the steps fit every size.' : 'Amounts scale to your table. The steps fit every size.') + '</p></div>' : '') +
      '<ul class="rc-ing" id="rc-ing" aria-live="polite">' + ingHTML(r) + '</ul></div>' +
      '<div class="card"><h3>Steps</h3><ol class="rc-steps">' + steps + '</ol></div></div>' +
      '<div class="rc-notes">' + note('To Serve', r.serve) + note('Tip', r.tip) + note('Keeps', r.keeps) + note('For Kids', r.kid) + pairsHTML(r) +
      (swaps.length ? '<div class="card"><h3>Swaps</h3>' + swaps.map(function (s) { return '<p>' + esc(s) + '</p>'; }).join('') + '</div>' : '') + '</div>' +
      '<div class="rc-low"><div class="card"><h3>Nutrition per Serving</h3><table class="rc-nut"><caption>Estimates from USDA FoodData Central.</caption><tbody>' +
      rows.map(function (x) { return '<tr><th scope="row">' + x[0] + '</th><td>' + x[1] + x[2] + '</td></tr>'; }).join('') + '</tbody></table></div>' +
      '<div class="card rc-cook"><h3>Guide Me, Step by Step</h3><p>Your kitchen guide, right here: one step at a time, read aloud by a calm voice, with a timer for every step that takes minutes. Cook at your own pace, with Back and Next.</p>' +
      '<button type="button" class="btn btn-primary rc-guide-btn" id="rc-cook" data-rc-guide>' + PLAY + 'Guide Me, Step by Step</button>' +
      '<p class="rc-doc" style="margin-top:18px">' + esc(T.doctor || '') + '</p></div></div>' +
      '</article>';
  }


  /* ---------- BLD 896: Holidays and Gatherings (shared/gg-holidays.js, GGHolidays) ----------
     A shelf above the recipe tools: every set opens at /recipes/#hol-<set id> with its menu, each recipe sized by the
     Serves picker, its steps, and Guide Me, Step by Step in the same kitchen guide (the guide speaks 'We are making <name>.'
     and each step's line, the lines field-guide/health.js speaks for a holiday recipe). Setting a set up on the calendar
     lives in The Grounded Way; this page is open to anyone. */
  var HOL = window.GGHolidays || null;
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function today() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() < 9 ? '0' : '') + (d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate(); }
  function daysTo(ymd) { return Math.round((new Date(ymd + 'T12:00') - new Date(today() + 'T12:00')) / 86400000); }
  function soonText(ymd) {
    var d = daysTo(ymd);
    if (d <= 0) return 'today'; if (d === 1) return 'tomorrow'; if (d <= 60) return 'in ' + d + ' days';
    return new Date(ymd + 'T12:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  }
  // Soonest first; the sets for a day you choose follow in their own order.
  function holOrder() {
    if (!HOL) return [];
    return HOL.sets.map(function (x, i) { return { id: x.id, i: i, date: HOL.next(x.id) || '' }; })
      .sort(function (a, b) { return a.date && b.date ? (a.date < b.date ? -1 : a.date > b.date ? 1 : a.i - b.i) : a.date ? -1 : b.date ? 1 : a.i - b.i; });
  }
  function holShelf() {
    if (!HOL || !(HOL.sets || []).length) return '';
    return '<div class="rc-sh"><img src="' + W + 'dinner-chili-sq.webp" alt="" loading="lazy" decoding="async"><h2 id="rc-s-holidays">Holidays and Gatherings</h2><span class="rc-shn">' + HOL.sets.length + ' sets</span></div>' +
      '<p class="rc-hl">Whole food menus for the big days, with sober drinks and better-choice sweets. Open a set to play any recipe step by step.</p>' +
      '<div class="rc-hgrid">' + holOrder().map(function (o, k) {
        var x = HOL.get(o.id), d = o.date ? new Date(o.date + 'T12:00') : null;
        var tile = d ? '<span class="rc-date" aria-hidden="true"><i>' + MON[d.getMonth()] + '</i><span>' + d.getDate() + '</span></span>' : '<span class="rc-date" aria-hidden="true"><i>Your</i><span class="rc-yd">Day</span></span>';
        var when = d ? (daysTo(o.date) <= 60 ? soonText(o.date).charAt(0).toUpperCase() + soonText(o.date).slice(1) + ', ' : '') + d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : HOL.whenText(x.id);
        return '<button type="button" class="rc-hcard rc-hk' + (k % 5) + '" data-hol="' + esc(x.id) + '">' + tile + '<span class="rc-cb"><span class="rc-m">' + esc(when) + '</span><b>' + esc(x.name) + '</b><span class="rc-t">' + esc(x.menu.length + ' recipes') + '</span><span class="rc-n">' + esc(x.lead) + '</span></span></button>';
      }).join('') + '</div>';
  }
  function toHolidays(smooth) {
    var h = $('rc-hol'); if (!h || h.hidden) return;
    var y = h.getBoundingClientRect().top + window.scrollY - 70;
    try { window.scrollTo({ top: Math.max(0, y), behavior: smooth ? 'smooth' : 'instant' }); } catch (e) { window.scrollTo(0, Math.max(0, y)); }
  }
  // On a /recipes/#holidays load, aim again once the fonts and paintings settle (the page above can change height as they arrive).
  function settleHolidays() {
    var again = function () { if ($('rc-list').hidden) return; if (location.hash === '#holidays') toHolidays(false); else if (location.hash === '#drinks') toShelf('rc-drinks', false); };
    try { if (document.fonts && document.fonts.ready) document.fonts.ready.then(again); } catch (e) {}
    if (document.readyState === 'complete') setTimeout(again, 60); else window.addEventListener('load', function () { setTimeout(again, 60); }, { once: true });
  }
  function holRecipe(id, mid) {
    var r = HOL && HOL.recipe(id, mid, serves); if (!r) return null;
    return { id: 'hol-' + id, name: r.name, meal: 'holiday', steps: r.steps, serves: r.serves, serve: 'Serves ' + r.serves + '.', keeps: '' };
  }
  function holDetail(id) {
    var x = HOL && HOL.get(id); if (!x) return '';
    var menu = x.menu.map(function (m) {
      var r = HOL.recipe(id, m.id, serves);
      return '<div class="card rc-hrec"><h3>' + esc(m.name) + '</h3><p class="rc-t">' + esc([m.course ? m.course.charAt(0).toUpperCase() + m.course.slice(1) : '', m.mins ? m.mins + ' min' : '', 'serves ' + r.serves].filter(Boolean).join(' · ')) + '</p>' +
        '<div class="rc-go"><button type="button" class="btn btn-primary rc-guide-btn" data-rc-hguide="' + esc(id + '|' + m.id) + '">' + PLAY + 'Guide Me, Step by Step</button>' + menuBtn('h:' + id + ':' + m.id) + '</div><div class="rc-mnote" data-rc-mnote="' + esc('h:' + id + ':' + m.id) + '" hidden></div>' +
        (m.makeAhead ? '<p><b>Make ahead:</b> ' + esc(m.makeAhead) + '</p>' : '') + (m.note ? '<p>' + esc(m.note) + '</p>' : '') +
        '<ul class="rc-ing">' + r.ingredients.map(function (g) { return '<li>' + esc(g) + '</li>'; }).join('') + '</ul>' +
        '<ol class="rc-steps">' + r.steps.map(function (s) { return '<li>' + esc(s.t) + (s.min ? '<span class="rc-min">About ' + s.min + (s.min === 1 ? ' minute' : ' minutes') + '</span>' : '') + '</li>'; }).join('') + '</ol>' +
        (m.card ? '<div class="rc-hcardtxt"><b>Reheat Card</b><p>' + esc(m.card) + '</p></div>' : '') + '</div>';
    }).join('');
    var src = (x.sources || []).filter(function (s) { return s && typeof s === 'object' && s.url; });
    return '<button type="button" class="rc-back" id="rc-back"><span aria-hidden="true">&larr;</span> All Recipes</button>' +
      '<article aria-labelledby="rc-dname"><div class="rc-dh"><div><div class="eyebrow">' + esc(HOL.whenText(id)) + '</div><h2 id="rc-dname" tabindex="-1">' + esc(x.name) + '</h2></div></div>' +
      '<p class="rc-hl">' + esc(x.lead) + '</p>' + (x.note ? '<p class="rc-hl">' + esc(x.note) + '</p>' : '') +
      '<div class="rc-size"><div class="rc-row" role="group" aria-labelledby="rc-l-size"><span class="rc-lab" id="rc-l-size">Serves</span>' + sizeChips() + '</div><p class="rc-size-note">Amounts scale to your table. The steps name the amounts for ' + esc(x.serves) + '.</p></div>' +
      '<div class="rc-hmenu">' + menu + '</div>' + alsoFor(id) +
      ((x.tips || []).length ? '<div class="card"><h3>For a Calm, Healthy Day</h3><ul>' + x.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>' : '') +
      '<div class="card rc-cook"><h3>Put It on Your Calendar</h3><p>In The Grounded Way, Tending sets this up for your date and guests: the shopping on your list, the prep on the days before, and every recipe guided step by step, private on your device.</p><a class="btn btn-primary" href="/home/#week">Open The Grounded Way</a></div>' +
      (src.length ? '<p class="rc-src">Sources: ' + src.map(function (s) { return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.t || s.title || s.url) + '</a>'; }).join('; ') + '</p>' : '') +
      '</article>';
  }
  // BLD 902: More for This Day, the Party Food and Celebration Drinks that name this set (recipe field holidays).
  function alsoFor(id) {
    var L = ALL.filter(function (r) { return (r.holidays || []).indexOf(id) >= 0; });
    if (!L.length) return '';
    return '<div class="rc-also"><h3 class="rc-hh">More for This Day</h3><p class="rc-hl">Party food and celebration drinks that suit this day, each with its own recipe and Guide Me.</p><div class="rc-grid">' + L.map(card).join('') + '</div></div>';
  }
  /* ---------- BLD 902: Celebration Drinks (GGTendPublic.party) ----------
     The drink menu in its sections, Build Your Own Sparkler, and the Party Drink Station guide. Reached by the Drinks card or
     /recipes/#drinks; each drink opens its own recipe like any other. */
  function drinkShelf() {
    var D = PARTY && PARTY.drinks, all = ALL.filter(function (r) { return r.meal === 'drink'; });
    if (!all.length) return '';
    var secs = D && (D.sections || []).length ? D.sections : [{ id: 'all', name: 'Drinks', ids: all.map(function (r) { return r.id; }) }];
    var sp = PARTY && PARTY.sparkler, stn = PARTY && PARTY.station;
    return '<div class="rc-sh"><img src="' + W + 'drinks-sq.webp" alt="" loading="lazy" decoding="async"><h2 id="rc-s-drinks">' + esc((D && D.title) || 'Celebration Drinks') + '</h2><span class="rc-shn">' + all.length + ' recipes</span></div>' +
      (D && D.lead ? '<p class="rc-hl">' + esc(D.lead) + '</p>' : '') +
      '<nav class="rc-drnav" aria-label="Drink menu">' + secs.map(function (x) { return '<a href="#drinks-' + esc(x.id) + '" data-drjump="' + esc(x.id) + '">' + esc(x.name) + '</a>'; }).join('') +
      (sp ? '<a href="#drinks-sparkler" data-drjump="sparkler">' + esc(sp.title) + '</a>' : '') + (stn ? '<a href="#drinks-station" data-drjump="station">' + esc(stn.title) + '</a>' : '') + '</nav>' +
      secs.map(function (x) {
        var L = (x.ids || []).map(byId).filter(Boolean); if (!L.length) return '';
        return '<section class="rc-drs" id="rc-dr-' + esc(x.id) + '" aria-labelledby="rc-drh-' + esc(x.id) + '"><h3 class="rc-hh" id="rc-drh-' + esc(x.id) + '">' + esc(x.name) + '</h3>' + (x.lead ? '<p class="rc-drl">' + esc(x.lead) + '</p>' : '') + '<div class="rc-grid">' + L.map(card).join('') + '</div></section>';
      }).join('') +
      (sp ? '<section class="rc-drs card rc-spark" id="rc-dr-sparkler" aria-labelledby="rc-drh-sparkler"><h3 class="rc-hh" id="rc-drh-sparkler">' + esc(sp.title) + '</h3><p class="rc-drl">' + esc(sp.lead) + '</p><ol class="rc-sprows">' +
        (sp.rows || []).map(function (r) { return '<li><b>' + esc(r[0]) + '</b><span>' + esc(r[1]) + '</span></li>'; }).join('') + '</ol>' +
        ((sp.ideas || []).length ? '<p class="rc-drl"><b>Try:</b> ' + sp.ideas.map(esc).join(' · ') + '</p>' : '') + '</section>' : '') +
      (stn ? '<section class="rc-drs" id="rc-dr-station" aria-labelledby="rc-drh-station"><h3 class="rc-hh" id="rc-drh-station">' + esc(stn.title) + '</h3><p class="rc-drl">' + esc(stn.lead) + '</p><div class="rc-stgrid">' +
        (stn.parts || []).map(function (pt) { return '<div class="card rc-stp"><h4>' + esc(pt.h) + '</h4><ul>' + (pt.items || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>'; }).join('') + '</div></section>' : '');
  }
  function toShelf(id, smooth) {
    var h = $(id); if (!h || h.hidden) return;
    var y = h.getBoundingClientRect().top + window.scrollY - 70;
    try { window.scrollTo({ top: Math.max(0, y), behavior: smooth ? 'smooth' : 'instant' }); } catch (e) { window.scrollTo(0, Math.max(0, y)); }
  }
  /* ---------- BLD 900: Add to My Menu ----------
     Inside The Grounded Way's frame, the add goes to the Home itself (GGHealth.menuOpen in the parent page, same site): a sheet to
     choose the day, the meal, and the servings, and the ingredients join the Shopping List. Everything stays on this device. On its
     own, the page shows a gentle line and opens this recipe inside The Grounded Way (/home/#recipe-<id>), where the menu lives. */
  var MENU_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M4 10h16M12 13v5M9.5 15.5h5"/></svg>';
  function menuBtn(ref) { return '<button type="button" class="btn btn-secondary rc-menu-btn" data-rc-menu="' + esc(ref) + '">' + MENU_ICON + 'Add to My Menu</button>'; }
  function homeHealth() { try { var P = window.parent; if (P && P !== window && P.GGHealth && typeof P.GGHealth.menuOpen === 'function') return P.GGHealth; } catch (e) {} return null; }
  function hasProfile() { try { var j = JSON.parse(localStorage.getItem('gg-profiles-v1') || 'null'); return !!(j && Array.isArray(j.list) && j.list.length); } catch (e) { return false; } }
  function menuGo(ref) {
    var P = homeHealth(), r = P ? P.menuOpen(ref, { serves: sv(byId(String(ref).replace(/^r:/, ''))) }) : null;
    if (r === true) return;
    var box = null; document.querySelectorAll('[data-rc-mnote]').forEach(function (b) { if (b.getAttribute('data-rc-mnote') === ref) box = b; }); if (!box) return;
    var deep = '/home/#recipe-' + encodeURIComponent(/^h:/.test(ref) ? 'hol-' + ref.split(':')[1] : ref.slice(2));
    box.innerHTML = P ? '<p>Start Tending in The Grounded Way, and My Menu holds this recipe for any day you choose, with its ingredients on your Shopping List.</p><a class="btn btn-primary" href="/home/#today=tending" target="_top">Start Tending</a>'
      : '<p>My Menu lives in The Grounded Way, private on this device: choose a day and a meal, the ingredients join your Shopping List, and Guide Me waits on Today.</p><a class="btn btn-primary" href="' + (hasProfile() ? deep : '/home/') + '">' + (hasProfile() ? 'Open It in The Grounded Way' : 'Open The Grounded Way') + '</a>';
    box.hidden = false;
  }
  var baseTitle = document.title;
  function show() {
    var id = decodeURIComponent((location.hash || '').replace(/^#/, ''));
    if (/^hol-/.test(id) && HOL && HOL.get(id.slice(4))) {
      var hl = $('rc-list'), hd = $('rc-detail');
      if (G.on() && G.id() !== id) G.close(true);
      if (!hl.hidden) listY = window.scrollY;
      hd.innerHTML = holDetail(id.slice(4)); hl.hidden = true; hd.hidden = false; lastId = id;
      document.title = HOL.get(id.slice(4)).name + ' | Grounded Recipes | Grow With Grounded';
      window.scrollTo(0, Math.max(0, $('recipes').getBoundingClientRect().top + window.scrollY - 70));
      var hh = $('rc-dname'); if (hh) hh.focus({ preventScroll: true }); return;
    }
    var r = id && id !== 'holidays' && id !== 'drinks' ? byId(id) : null;
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
        var ek = window.CSS && CSS.escape ? CSS.escape : function (x) { return x; };
        var c = /^hol-/.test(lastId) ? document.querySelector('.rc-hcard[data-hol="' + ek(lastId.slice(4)) + '"]') : document.querySelector('.rc-card[data-id="' + ek(lastId) + '"]');
        if (c) c.focus({ preventScroll: true });
      } else if (id === 'holidays') toHolidays(false);
      else if (id === 'drinks') toShelf('rc-drinks', false);
    }
  }

  function setServes(n) {
    n = okSize(n); if (!n) return;
    var rb = byId(lastId), dt0 = $('rc-detail');
    if (isBatch(rb) && dt0 && !dt0.hidden) { batchSize[rb.id] = n; }
    else { serves = n; try { localStorage.setItem('gg-serves', String(n)); } catch (e) {} }
    if (/^hol-/.test(lastId) && HOL) { var hd0 = $('rc-detail'); if (hd0 && !hd0.hidden) { hd0.innerHTML = holDetail(lastId.slice(4)); var b0 = hd0.querySelector('[data-sz="' + n + '"]'); if (b0) b0.focus({ preventScroll: true }); } drawList(); return; }
    var r = byId(lastId), ing = $('rc-ing'), tag = $('rc-serves'), row = document.querySelector('.rc-size .rc-row');
    if (r && ing) ing.innerHTML = ingHTML(r);
    if (tag) tag.textContent = 'Serves ' + n;
    if (row) { row.innerHTML = '<span class="rc-lab" id="rc-l-size">Serves</span>' + sizeChips(sv(r)); var b = row.querySelector('[data-sz="' + n + '"]'); if (b) b.focus({ preventScroll: true }); }
    drawList();
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
    /* BLD 895 (Chris: "food pics ride w guides too!"): the guide plays over a food painting, softened under a scrim in the page's
       own colors. Dinners by night (install895.py in the workshop rewrites DINNER_ART with the paintings present); other dinners
       show Today's Plate. Breakfasts and snacks show the Weekly Batch table, lunches the lunch painting. */
    var DINNER_ART = ['fish', 'chili'];
    var DIN_RE = [['fish', /salmon|\bcod\b|fish|shrimp|tuna|trout|sardine|halibut|tilapia/i], ['chili', /chili|soup|stew/i], ['curry', /lentil|bean|chickpea|curry|dal\b/i], ['stirfry', /stir fry|bowl|noodle/i]];
    var MEAL_ART = { breakfast: 'weekly-batch', snack: 'weekly-batch', lunch: 'meal-lunch', dinner: 'todays-plate', party: 'kitchen-headstart', sauce: 'prep-together', drink: 'drinks' };
    var ONE_ART = { 'tend-people': 1 }; // one square painting serves both sizes
    function artName(r) {
      var m = String(r.meal || 'dinner').toLowerCase();
      if (m === 'dinner') { var t = String(r.name || ''), hit = DIN_RE.filter(function (x) { return x[1].test(t); })[0]; if (hit && DINNER_ART.indexOf(hit[0]) >= 0) return 'dinner-' + hit[0]; }
      return MEAL_ART[m] || MEAL_ART.dinner;
    }
    function paint(r) {
      var n = artName(r), W = '/shared/heroes/way/';
      return '<div class="rg-paint" aria-hidden="true"><picture><source media="(max-width:699px)" srcset="' + W + n + (ONE_ART[n] ? '' : '-sq') + '.webp"><img src="' + W + n + '.webp" alt="" decoding="async"></picture></div>';
    }
    function open(r, btn) {
      if (o) close(true);
      setKey();
      var vo = V(); if (vo) vo.unlock();
      o = { r: r, gi: 0, timers: [], rang: null, fin: false, btn: btn || null };
      el = document.createElement('div'); el.className = 'rg-ov'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-labelledby', 'rg-title');
      el.classList.add('rg-hasart'); el.innerHTML = paint(r) + '<div class="rg-in"></div>';
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
    $('rc-tools').hidden = false; $('rc-cats').hidden = false; $('rc-l-cats').hidden = false;
    drawChips(); drawList();
    var ds = drinkShelf(), db = $('rc-drinks');
    if (ds && db) { db.innerHTML = ds; db.hidden = false; db.setAttribute('aria-labelledby', 'rc-s-drinks'); db.setAttribute('role', 'region');
      db.addEventListener('click', function (e) {
        var j = e.target.closest('[data-drjump]'); if (j) { e.preventDefault(); toShelf('rc-dr-' + j.getAttribute('data-drjump'), true); return; }
        var c = e.target.closest('.rc-card'); if (!c) return; fromList = true; location.hash = c.getAttribute('data-id'); }); }
    var hs = holShelf(), hb = $('rc-hol'); if (hs && hb) { hb.innerHTML = hs; hb.hidden = false; hb.setAttribute('aria-labelledby', 'rc-s-holidays'); hb.setAttribute('role', 'region');
      hb.addEventListener('click', function (e) { var c = e.target.closest('[data-hol]'); if (!c) return; fromList = true; location.hash = 'hol-' + c.getAttribute('data-hol'); }); }
    $('rc-cats').addEventListener('click', function (e) {
      var c = e.target.closest('[data-cat]'); if (!c) return;
      var k = c.getAttribute('data-cat');
      if (k === 'holidays') { if (location.hash === '#holidays') toHolidays(true); else { try { history.pushState(null, '', location.pathname + location.search + '#holidays'); } catch (x) {} toHolidays(true); } return; }
      if (k === 'drink') { if (location.hash !== '#drinks') { try { history.pushState(null, '', location.pathname + location.search + '#drinks'); } catch (x) {} } toShelf('rc-drinks', true); return; }
      st.meal = st.meal === k ? 'all' : k;
      drawChips(); drawList();
      var again = document.querySelector('.rc-cat[data-cat="' + k + '"]'); if (again) again.focus({ preventScroll: true });
      var tl = $('rc-tools'), y = tl.getBoundingClientRect().top + window.scrollY - 80;
      if (st.meal !== 'all' && tl.getBoundingClientRect().top > 160) { try { window.scrollTo({ top: y, behavior: 'smooth' }); } catch (x) { window.scrollTo(0, y); } }
    });
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
      var sz = e.target.closest('[data-sz]');
      if (sz) { setServes(+sz.getAttribute('data-sz')); return; }
      if (e.target.closest('#rc-back')) goBack();
      else if (e.target.closest('.rc-also .rc-card')) { fromList = true; location.hash = e.target.closest('.rc-card').getAttribute('data-id'); }
      else if (e.target.closest('[data-rc-menu]')) menuGo(e.target.closest('[data-rc-menu]').getAttribute('data-rc-menu'));
      else if (e.target.closest('[data-rc-hguide]')) { var hv = e.target.closest('[data-rc-hguide]').getAttribute('data-rc-hguide').split('|'), hr = holRecipe(hv[0], hv[1]); if (hr) G.open(hr, e.target.closest('[data-rc-hguide]')); }
      else if (e.target.closest('[data-rc-guide]')) { var r = byId(lastId); if (r) G.open(sized(r), e.target.closest('[data-rc-guide]')); }
    });
    window.addEventListener('hashchange', function () { if (!location.hash) fromList = false; show(); });
    window.addEventListener('popstate', function () { if (G.on() && !(history.state && history.state.rcGuide)) G.close(true); if (!location.hash) fromList = false; });
    if (location.hash) show();
    if (location.hash === '#holidays' || location.hash === '#drinks') settleHolidays();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
