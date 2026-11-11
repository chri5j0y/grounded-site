/* =====================================================================
   GROUNDED RECIPES (GWG BLD 875, one recipe view in BLD 877): the public Recipes page, /recipes/.
   Reads window.GGTendPublic.recipes (shared/tending-public.js, public on purpose).
   A list with meal, goal, and fit chips and a search box; each recipe opens a detail view at /recipes/#<recipe id>
   (deep links work on load, Back returns to the list). BLD 877: a gold Guide Me, Step by Step button (BLD 907: named Grounded Cooking) opens a full screen
   guided mode right on this page: one step at a time in the recorded kitchen voice (field-guide/coach.js, GGVoice, with the
   public clip key GGTendPublic.audio), Back and Next, timers for steps with minutes, the kitchen scene (field-guide/stage.js),
   Voice, Music, and Beeps toggles, and a finish screen. No sign-in. The spoken lines are the ones field-guide/health.js
   speaks in its kitchen guide (LN.cIntro, each step, LN.tset, LN.tdone, LN.cOut), so every line has a recorded clip;
   with no clip, coach.js speaks with the device voice. Plain JS, no library.
   BLD 880: every recipe is written for six. A Serves picker on each recipe (2 to 12) scales the ingredients with
   shared/gg-scale.js (GGScale); the steps fit every size and nutrition stays per serving. The choice is remembered on this
   device (localStorage gg-serves), and a link can open a recipe at the household's size with /recipes/?serves=N#id.
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
   BLD 905 (Chris, November 1, 2026: "add to a section on processing bulk.. just some guides on how to deal w bulk foods"):
   Bulk Foods, its own section inside the page like Holidays and Gatherings (/recipes/#bulk), reached by a wide Bulk Foods
   card. Ten short guides (shared/gg-bulk.js, GGBulk), each at /recipes/#bulk-<id>: How to Store It, How to Put It Up, and
   Recipes That Use the Most (public recipes as cards, holiday recipes by their set). The search box also finds the guides.
   BLD 912 (Chris: "truly build 1 app"): Grounded Recipes runs natively inside Home's own window as well as on its page,
   with one recipe design. Every view lives in one instance (App below). The page runs one instance on its own markup with
   hash routing and deep links, exactly as before. GGRecipes.mount(el, opts) runs another inside any element: the same list,
   meal cards, chips, search, recipe, Holidays and Gatherings, Celebration Drinks, Bulk Foods, Serves picker, Add to My Menu,
   and Grounded Cooking (played inside the element), with its own back stack, and it never reads or writes location.hash or
   history. The look lives in recipes/recipes.css (the page links it; a mount adds it once). GGRecipes.files lists the
   scripts the page loads, in order, so Home can load them before it mounts.
   BLD 916 (Living Sober Path): the Drinks card reads Sober Drinks, the Celebration Drinks section opens with a Sober Drinks
   line, and a search for sober finds every drink. GGRecipes.mount(el, {open: 'drinks'}) opens them straight away.
   BLD 917 (Recipe Search and Sharing): a wider search (KEYS, stems, the Holidays and Gatherings recipes as cards, words to try
   when nothing matches), /recipes/#hol-<set>:<recipe> opens a set with that recipe in view, and a Share button on every recipe
   (the share sheet, or Link copied) that shares the recipe's own small page, recipes/r/<id>.html.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGRecipes && window.GGRecipes.mount) return; // a second copy of this file: the first one serves
  var VER = 'b981';   // BLD 966: On Your Week; BLD 967: Share My Plate
  // What the page loads for Grounded Recipes, in order (recipes/index.html), with the global each one sets.
  var FILES = [
    ['/shared/tending-public.js?v=b978', 'GGTendPublic'],
    ['/field-guide/stage.js?v=b931', 'GGStage'],
    ['/field-guide/coach.js?v=b931', 'GGVoice'],
    ['/shared/gg-scale.js?v=b934', 'GGScale'],
    ['/shared/gg-holidays.js?v=b919b', 'GGHolidays'],
    ['/shared/gg-bulk.js?v=b906', 'GGBulk'],
    ['/recipes/recipes.js?v=' + VER, 'GGRecipes']
  ];
  var CSS_HREF = '/recipes/recipes.css?v=' + VER;
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  // BLD 899: the painted meal cards. The painting names live in /shared/heroes/way/.
  var W = '/shared/heroes/way/';
  var CATS = [['breakfast', 'Breakfast', 'weekly-batch-sq'], ['lunch', 'Lunch', 'meal-lunch-sq'], ['dinner', 'Dinner', 'dinner-fish-sq'], ['snack', 'Snacks', 'snack-fruit-sq'], ['party', 'Party Food', 'kitchen-headstart-sq'], ['sauce', 'Sauces and Dressings', 'prep-together-sq'], ['drink', 'Sober Drinks', 'drinks-sq'], ['bulk', 'Bulk Foods', 'shop-sq'], ['holidays', 'Holidays and Gatherings', 'dinner-chili-sq']];
  var BAND = { breakfast: ['weekly-batch', 'weekly-batch-sq'], lunch: ['meal-lunch', 'meal-lunch-sq'], dinner: ['todays-plate', 'todays-plate-sq'], snack: ['snack-fruit', 'snack-fruit-sq'], party: ['kitchen-headstart', 'kitchen-headstart-sq'], sauce: ['prep-together', 'prep-together-sq'], drink: ['drinks', 'drinks-sq'] };
  // BLD 902: the Drinks card, like Holidays and Gatherings, opens its own section (Celebration Drinks) instead of filtering the list.
  var SHELF = { holidays: 1, drink: 1, bulk: 1 };
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
    drink: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 9h14l-2 19h-10z"/><path d="M9 15h12"/><path d="M17 9l4-6h4"/><circle cx="23" cy="9" r="4"/></svg>',
    // BLD 905: a harvest crate with three rounds of produce (Bulk Foods).
    bulk: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15h24l-2 13H6z"/><path d="M5 21h22"/><path d="M12 15v13M20 15v13"/><circle cx="10" cy="11" r="4"/><circle cx="18" cy="9" r="4"/><circle cx="24" cy="12" r="3"/></svg>'
  };
  var PLAY = '<svg class="rc-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';
  var MENU_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M4 10h16M12 13v5M9.5 15.5h5"/></svg>';
  // BLD 880: the table sizes on the Serves picker.
  var SIZES = [2, 3, 4, 5, 6, 7, 8, 10, 12];
  var okSize = function (v) { v = Math.round(+v); return v >= 1 && v <= 30 ? v : 0; };
  // BLD 910 (Chris, November 3, 2026: "all cards get high quality images"): each recipe card shows one of Grounded's own
  // paintings: for lunch and dinner, the main of the dish when its name says (fish, chili and stews, beans and lentils, stir fry and bowls), and
  // otherwise its meal's set in turn, so cards side by side wear different paintings.
  var CARD_ART = { breakfast: ['weekly-batch-sq', 'snack-fruit-sq', 'kitchen-headstart-sq', 'prep-together-sq'], lunch: ['meal-lunch-sq', 'todays-plate-sq', 'prep-together-sq', 'weekly-batch-sq'],
    dinner: ['todays-plate-sq', 'kitchen-headstart-sq', 'dinner-stirfry-sq', 'meal-lunch-sq'], snack: ['snack-fruit-sq', 'meal-lunch-sq', 'supplements-sq', 'prep-together-sq'],
    party: ['kitchen-headstart-sq', 'todays-plate-sq', 'snack-fruit-sq'], sauce: ['prep-together-sq', 'kitchen-headstart-sq', 'weekly-batch-sq'], drink: ['drinks-sq', 'snack-fruit-sq'] };
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function n1(v) { var x = Math.round(Number(v) * 10) / 10; return String(x); }
  function n0(v) { return String(Math.round(Number(v))); }
  function today() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() < 9 ? '0' : '') + (d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate(); }
  function daysTo(ymd) { return Math.round((new Date(ymd + 'T12:00') - new Date(today() + 'T12:00')) / 86400000); }
  function soonText(ymd) {
    var d = daysTo(ymd);
    if (d <= 0) return 'today'; if (d === 1) return 'tomorrow'; if (d <= 60) return 'in ' + d + ' days';
    return new Date(ymd + 'T12:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  }
  function cardArt(r, i, prev) {
    var t = String(r.name || ''), L = CARD_ART[r.meal] || CARD_ART.dinner, k = '';
    if (r.meal === 'dinner' || r.meal === 'lunch') k = /salmon|\bcod\b|fish|shrimp|tuna|trout|sardine|halibut|tilapia/i.test(t) ? 'dinner-fish-sq' : /chili|soup|stew/i.test(t) ? 'dinner-chili-sq' : /lentil|bean|chickpea|curry|dal\b/i.test(t) ? 'dinner-curry-sq' : /stir fry|noodle/i.test(t) ? 'dinner-stirfry-sq' : '';
    if (!k || k === prev) { k = L[(i || 0) % L.length]; if (k === prev) k = L[((i || 0) + 1) % L.length]; }
    return k;
  }
  // BLD 916, Living Sober Path: every drink is a Sober Drink (Grounded's word for alcohol-free), so a search for sober finds them all.
  /* BLD 917 (Chris: "tried to search pizza and I get nothing but I know we have a pizza recipe"): a wider search. Each recipe's
     haystack holds its name, ingredients, protein, description or lead when it has one, its meal and course names, the words of
     its fits, its holiday sets, and the words of every KEYS group it calls up, so flatbread finds the pita pizzas and noodles
     finds the pasta. Every word also keeps its singular (stem), so tacos and taco, berries and berry, dishes and dish all meet.
     KEYS: [what in the recipe calls the group up, the words the group adds]. */
  var KEYS = [
    [/pizza|flatbread/, 'pizza pizzas flatbread'],
    [/taco|fajita|burrito|tortilla|quesadilla|enchilada/, 'taco tacos burrito tortilla fajita mexican'],
    [/soup|stew|chili|chowder|bisque/, 'soup soups stew stews chili warm cozy'],
    [/salad|slaw/, 'salad salads greens'],
    [/bowl/, 'bowl bowls grain bowl'],
    [/pasta|penne|spaghetti|noodle|lasagna|bolognese|macaroni|orzo|primavera|rotini|fusilli|linguine/, 'pasta noodle noodles spaghetti'],
    [/smoothie|shake|\blassi\b|slush/, 'smoothie smoothies shake blend'],
    [/\boats?\b|oatmeal|granola|overnight oat/, 'oats oatmeal porridge'],
    [/pancake|waffle/, 'pancake pancakes waffle'],
    [/muffin|cornbread|soda bread|\brolls?\b|biscuit|scone/, 'muffin muffins bread baking'],
    [/burger|patty|patties/, 'burger burgers patty'],
    [/wrap|sandwich|panini|lettuce cup/, 'wrap wraps sandwich sandwiches handheld'],
    [/curry|\bdal\b|masala|tikka/, 'curry spiced'],
    [/stir fry|stir-fry|teriyaki|sesame|edamame|tofu/, 'stir fry stirfry wok'],
    [/sheet pan|one pan|roast|bake/, 'sheet pan oven roasted baked'],
    [/slow cooker|crockpot/, 'slow cooker crockpot'],
    [/kebab|skewer|grill|bbq|burger/, 'grill grilled bbq cookout'],
    [/dip\b|dip,|hummus|salsa|guacamole|tzatziki|pesto|queso|ranch/, 'dip dips spread guac'],
    [/\bcake\b|cupcake|\bpie\b|\bcrisp\b|cobbler|bark|cookie|pudding|brownie|\bbars?\b|parfait|baked apple|energy bite/, 'dessert desserts sweet treat'],
    [/salmon|\bcod\b|fish|shrimp|tuna|trout|sardine|halibut|tilapia/, 'fish seafood'],
    [/chicken|turkey/, 'poultry'],
    [/\beggs?\b|omelet|frittata|shakshuka/, 'egg eggs'],
    [/\bkid\b|kids/, 'kid kids family']
  ];
  var MEAL_WORDS = { breakfast: 'breakfast morning brunch', lunch: 'lunch midday', dinner: 'dinner supper main', snack: 'snack snacks', party: 'party food snack snacks appetizer', sauce: 'sauce sauces dressing dressings', drink: 'drink drinks beverage' };
  var COURSE_WORDS = { main: 'main dinner entree', side: 'side sides', dessert: 'dessert desserts sweet treat', snack: 'snack snacks appetizer', drink: 'drink drinks sober beverage', bread: 'bread', breakfast: 'breakfast brunch' };
  var FIT_WORDS = { vegan: 'vegan plant based', vegetarian: 'vegetarian veggie meatless plant based', dairyFree: 'dairy free', glutenFree: 'gluten free', nutFree: 'nut free', eggFree: 'egg free', kidFriendly: 'kid kids kid friendly family' };
  // The singular of one word: tacos to taco, berries to berry, dishes to dish, tomatoes to tomato; hummus and grass stay.
  function stem(w) {
    if (w.length > 4 && /ies$/.test(w)) return w.slice(0, -3) + 'y';
    if (w.length > 4 && /(ches|shes|xes|sses|zes|oes)$/.test(w)) return w.slice(0, -2);
    if (w.length > 3 && /s$/.test(w) && !/(ss|us|is)$/.test(w)) return w.slice(0, -1);
    return w;
  }
  // A full haystack from plain text: the text, the words of each KEYS group the name calls up (the name only, so chili powder
  // in a taco never reads as chili), and the singular of every word.
  function hayOf(text, name) {
    var t = String(text || '').toLowerCase(), n = String(name == null ? t : name).toLowerCase().replace(/shepherd.s pie|pot pie/g, ''), add = [];
    KEYS.forEach(function (k) { if (k[0].test(n)) add.push(k[1]); });
    t = t + ' ' + add.join(' ');
    var st = t.split(/[^a-z0-9]+/).filter(function (w) { return w && stem(w) !== w; }).map(stem);
    return ' ' + t + ' ' + st.join(' ') + ' ';
  }
  // BLD 916, Living Sober Path: every drink is a Sober Drink (Grounded's word for alcohol-free), so a search for sober finds them all.
  function hay(r) {
    var hol = (r.holidays || []).map(function (id) { var x = window.GGHolidays && GGHolidays.get && GGHolidays.get(id); return x ? x.name + ' holiday' : ''; }).join(' ');
    var fits = (r.fits || []).map(function (f) { return FIT_WORDS[f] || ''; }).join(' ');
    return hayOf(r.name + ' ' + (r.ingredients || []).join(' ') + ' ' + (r.protein || '') + ' ' + (r.lead || r.desc || r.description || '') + ' ' +
      (MEAL_WORDS[r.meal] || r.meal || '') + ' ' + (r.course || '') + ' ' + fits + ' ' + hol + (+r.mins && +r.mins <= 20 ? ' quick fast easy' : '') + (r.meal === 'drink' ? ' sober drinks drink' : ''), r.name);
  }
  // One typed word is found when the haystack holds it or its singular.
  function hit(h, w) { return h.indexOf(w) >= 0 || h.indexOf(stem(w)) >= 0; }
  function qWords(q) { return String(q || '').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean); }
  // BLD 917: the share link. Each public recipe and each Holidays and Gatherings recipe has its own small page for link previews
  // (recipes/r/<id>.html, made by the workshop's patches/bld917/gen-recipe-pages.py); every other recipe shares the Recipes page.
  var SITE = 'https://growwithgrounded.com';
  var SHARE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3M7.5 7.5L12 3l4.5 4.5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>';

  // BLD 912: the list markup for a mount, the same as the page's #rc-list in recipes/index.html (the page keeps its own).
  function mountHTML() {
    return '<div class="rc-mview"><div id="rc-list">' +
      '<div class="rc-intro"><p>Whole food, sized for your table, for every meal, every party, the big days, and the harvest.</p>' +
      '<p>Every recipe meets the Grounded Nutritional Standards: a Mediterranean base with plenty of vegetables, fiber, and protein. Open one and tap <b>Grounded Cooking</b>, and a calm voice reads each step aloud, with timers, right here.</p></div>' +
      '<p class="rc-doc" data-rc-doctor>Grounded offers research-informed guidance for healthy living. Talk it over with your doctor, who knows your body and your story best.</p>' +
      '<div class="rc-tools" id="rc-tools" hidden><div class="rc-find">' +
      '<label for="rc-q"><span class="sr-only">Search recipes by name or ingredient</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4.2-4.2"/></svg><input type="search" id="rc-q" placeholder="Search by name or ingredient" autocomplete="off" spellcheck="false"></label>' +
      '<p class="rc-count" id="rc-count" aria-live="polite"></p><button type="button" class="rc-clear" id="rc-clear" hidden>Show All Recipes</button></div>' +
      '<div class="rc-gf" role="group" aria-labelledby="rc-l-gf"><span class="rc-lab" id="rc-l-gf">Goals and Fits</span><span id="rc-goal" style="display:contents"></span><span class="rc-sep" aria-hidden="true"></span><span id="rc-fit" style="display:contents"></span></div></div>' +
      '<span class="rc-lab rc-cats-lab" id="rc-l-cats" hidden>Browse by Meal</span>' +
      '<div class="rc-cats" id="rc-cats" role="group" aria-labelledby="rc-l-cats" hidden></div>' +
      '<div class="rc-results" id="rc-grid"></div>' +
      '<p class="rc-empty" id="rc-empty" hidden>Try a different word or fewer choices, and more recipes appear.</p>' +
      '<div class="rc-drsec rc-k-drink" id="rc-drinks" hidden></div><div class="rc-holsec rc-k-holidays" id="rc-hol" hidden></div><div class="rc-bksec rc-k-bulk" id="rc-bulk" hidden></div>' +
      '<p class="rc-src rc-msrc">Nutrition per serving is estimated from FoodData Central. Sources: <a href="https://fdc.nal.usda.gov/" target="_blank" rel="noopener">FoodData Central, U.S. Department of Agriculture</a>; <a href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart" target="_blank" rel="noopener">Safe Minimum Internal Temperature Chart, U.S. Department of Agriculture, Food Safety and Inspection Service</a>.</p>' +
      '</div><div id="rc-detail" class="rc-d" hidden></div></div>';
  }

  /* ---------- One Grounded Recipes instance ----------
     cfg.page: the page's own markup and hash routing. cfg.root: a mount's root element (div.rc.rc-mnt), with cfg.opts. */
  function App(cfg) {
    var MNT = !!cfg.root, opts = cfg.opts || {}, root = MNT ? cfg.root : document;
    var T = window.GGTendPublic || {};
    var ALL = (T.recipes || []).slice();
    var ek = function (x) { return window.CSS && CSS.escape ? CSS.escape(x) : x; };
    var $ = MNT ? function (id) { return root.querySelector('#' + ek(id)); } : function (id) { return document.getElementById(id); };
    var q1 = function (sel) { return root.querySelector(sel); };
    // BLD 905: the Bulk Foods guides (shared/gg-bulk.js).
    var BK = window.GGBulk && (window.GGBulk.guides || []).length ? window.GGBulk : null;
    var PARTY = T.party || null;
    var HOL = window.GGHolidays || null;
    var st = { meal: 'all', goal: '', fits: [], q: '' };
    // BLD 880: the table size. On the page, ?serves=N is read once on load; in a mount, opts.serves; a choice on the picker is remembered.
    var serves = (function () {
      var q = 0;
      if (MNT) q = okSize(opts.serves); else { try { q = okSize(new URLSearchParams(location.search).get('serves')); } catch (e) {} }
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

    /* BLD 912: scrolling and routing. The page scrolls the window and routes by location.hash; a mount scrolls the window it
       sits in (its nearest scrolling parent) and routes by its own back stack. */
    function scroller() {
      if (!MNT) return null;
      for (var n = root.parentElement; n && n !== document.body && n !== document.documentElement; n = n.parentElement) { var o = getComputedStyle(n).overflowY; if (o === 'auto' || o === 'scroll') return n; }
      return null;
    }
    function getY() { var s = scroller(); return s ? s.scrollTop : window.scrollY; }
    function relTop(e) { var s = scroller(), t = e.getBoundingClientRect().top; return s ? t - s.getBoundingClientRect().top : t; }
    // smooth: true scrolls smoothly, false jumps ('instant'), left out scrolls the plain way (as the page always has).
    function goY(y, smooth) {
      y = Math.max(0, y); var s = scroller() || window;
      if (smooth == null) { if (s === window) window.scrollTo(0, y); else s.scrollTop = y; return; }
      try { s.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'instant' }); } catch (e) { if (s === window) window.scrollTo(0, y); else s.scrollTop = y; }
    }
    var OFF = MNT ? 10 : 70;
    function aim(e, smooth, off) { if (e && !e.hidden) goY(relTop(e) + getY() - (off == null ? OFF : off), !!smooth); }
    function aimPlain(e) { if (e) goY(relTop(e) + getY() - OFF); }
    function toTop() { if (MNT) goY(0); else aimPlain($('recipes')); }
    var stack = [], cur = '';
    function nav(id) {
      if (!MNT) { fromList = true; location.hash = id; return; }
      stack.push(cur); cur = id; show(id);
    }
    function hashId() { return decodeURIComponent((location.hash || '').replace(/^#/, '')); }
    function setTitle(t) { if (!MNT) document.title = t; }

    function nutLine(r) {
      var n = r.nut || {};
      return n0(n.cal) + ' calories, ' + n1(n.pro) + ' g protein, ' + n1(n.fib) + ' g fiber, ' + n1(n.sf) + ' g saturated fat, ' + n0(n.na) + ' mg sodium';
    }
    function shortNut(r) { var n = r.nut || {}; return n0(n.cal) + ' calories, ' + n1(n.pro) + ' g protein, ' + n1(n.fib) + ' g fiber per serving'; }
    function filtering() { return st.meal !== 'all' || !!st.goal || st.fits.length > 0 || !!st.q; }
    ALL.forEach(function (r) { r._h = hay(r); });

    function matches(r) {
      if (st.meal !== 'all' && r.meal !== st.meal) return false;
      if (st.goal && (r.goals || []).indexOf(st.goal) < 0) return false;
      for (var i = 0; i < st.fits.length; i++) if ((r.fits || []).indexOf(st.fits[i]) < 0) return false;
      var words = qWords(st.q);
      for (var j = 0; j < words.length; j++) if (!hit(r._h, words[j])) return false;
      return true;
    }
    /* BLD 917: the search also finds each recipe inside a Holidays and Gatherings menu (Chris's pizza: Build Your Own Mini Pita
       Pizzas, in the Birthday (Kid) set). A hit shows as a card among the results and opens that recipe in its menu
       (/recipes/#hol-<set>:<recipe>). They join a search with no meal, goal, or fit chosen. */
    var COURSE_MEAL = { main: 'dinner', side: 'lunch', dessert: 'snack', snack: 'snack', drink: 'drink', bread: 'breakfast', breakfast: 'breakfast' };
    var HD = HOL ? [].concat.apply([], (HOL.sets || []).map(function (x) {
      return (x.menu || []).map(function (m) {
        var ing = (m.ingredients || []).map(function (g) { return g && typeof g === 'object' ? g.item : g; }).join(' ');
        return { hd: 1, id: 'hol-' + x.id + ':' + m.id, set: x, m: m, name: m.name,
          _h: hayOf(m.name + ' ' + ing + ' ' + (COURSE_WORDS[m.course] || m.course || '') + ' ' + x.name + ' holiday holidays gathering' + (m.course === 'drink' ? ' sober drinks' : '') + (+m.mins && +m.mins <= 20 ? ' quick fast easy' : ''), m.name + ' ' + (m.course || '')) };
      });
    })) : [];
    function holHits() {
      var words = qWords(st.q); if (!words.length || st.meal !== 'all' || st.goal || st.fits.length) return [];
      return HD.filter(function (d) { return words.every(function (w) { return hit(d._h, w); }); });
    }
    function hdCard(d, i) {
      var art = cardArt({ name: d.name, meal: COURSE_MEAL[d.m.course] || 'dinner' }, i, i > 0 ? lastArt : ''); lastArt = art;
      var sv0 = HOL.recipe ? (HOL.recipe(d.set.id, d.m.id, serves) || {}).serves : d.m.serves;
      return '<button type="button" class="rc-card rc-k-holidays rc-hdc" data-hd="' + esc(d.id) + '">' +
        '<span class="rc-band"><span class="rc-ic rc-pic" aria-hidden="true"><img src="' + W + art + '.webp" alt="" loading="lazy" decoding="async" width="600" height="600"></span><span class="rc-m">Holidays and Gatherings</span></span>' +
        '<span class="rc-cb"><b>' + esc(d.name) + '</b>' +
        '<span class="rc-pills">' + (d.m.mins ? '<span class="rc-pill">' + CLOCK + esc(d.m.mins + ' min') + '</span>' : '') + (sv0 ? '<span class="rc-pill">' + PEOPLE + esc('Serves ' + sv0) + '</span>' : '') + '</span>' +
        '<span class="rc-n">' + esc('On the ' + d.set.name + ' menu') + '</span></span></button>';
    }
    // When a search finds nothing: a short line and three words to try, chosen from words that always find recipes.
    var TRY = ['soup', 'tacos', 'pasta', 'salad', 'smoothie', 'oatmeal', 'pizza', 'chicken', 'salmon', 'dip', 'bowl', 'dessert'];
    function emptyHTML() {
      var typed = qWords(st.q), k = typed.join('').length;
      var pick = TRY.filter(function (w) { return typed.indexOf(w) < 0; }), out = [];
      for (var i = 0; i < pick.length && out.length < 3; i++) out.push(pick[(i + k) % pick.length]);
      var chosen = st.meal !== 'all' || st.goal || st.fits.length;
      return (typed.length ? 'Try a simpler word' + (chosen ? ' or fewer choices' : '') + ', or one of these: ' : 'Try fewer choices, or one of these: ') +
        out.map(function (w) { return '<button type="button" class="rc-chip rc-try" data-rc-try="' + esc(w) + '">' + esc(w.charAt(0).toUpperCase() + w.slice(1)) + '</button>'; }).join(' ');
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
        var bk = c[0] === 'bulk'; if (bk && !BK) return '';
        var n = hol ? HOL.sets.length : bk ? BK.guides.length : mealCount(c[0]), nx = hol ? holOrder()[0] : null;
        var cnt = n + (hol ? (n === 1 ? ' set' : ' sets') : bk ? (n === 1 ? ' guide' : ' guides') : (n === 1 ? ' recipe' : ' recipes'));
        var extra = hol && nx && nx.date ? '<span class="rc-cx">Next: ' + esc(HOL.get(nx.id).name) + ', ' + esc(soonText(nx.date)) + '</span>' : c[0] === 'drink' ? '<span class="rc-cx">Sparkling, cozy, creamy, and pitchers for a crowd</span>' : bk ? '<span class="rc-cx">' + esc(BK.sub || '') + ': store it, put it up, and cook it</span>' : '';
        return '<button type="button" class="rc-cat rc-k-' + c[0] + '" data-cat="' + c[0] + '"' + (shelf ? '' : ' aria-pressed="' + (st.meal === c[0] ? 'true' : 'false') + '"') +
          ' aria-label="' + esc(c[1] + ', ' + cnt + (shelf ? '' : (st.meal === c[0] ? ', showing now' : ''))) + '"><img src="' + W + c[2] + '.webp" alt="" decoding="async">' +
          '<span class="rc-cat-in"><b>' + esc(c[1]) + '</b><span class="rc-cn">' + esc(cnt) + '</span>' + extra + '</span></button>';
      }).join('');
    }

    var lastArt = '';
    // BLD 966 (Chris: "several menu items are not in recipe book"): a dinner on this week's Week carries On Your Week (matched by
    // the dinner's id, the plan dinner a book recipe was written from (r.plan), or the same name), read from this window's GGHealth.
    var WK = null, WKAT = 0;
    function wkNorm(t) { return String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
    function onWk(r) {
      if (!WK || Date.now() - WKAT > 5000) { WK = { ids: {}, names: {} }; WKAT = Date.now();
        try { var H = window.GGHealth, w = H && typeof H.week === 'function' ? H.week(0) : null; ((w && w.days) || []).forEach(function (d) { var dn = d && d.dinner; if (!dn) return; WK.ids[String(dn.key || '').split(':').pop()] = 1; WK.names[wkNorm(dn.title)] = 1; }); } catch (e) {} }
      return r.meal === 'dinner' && !!(WK.ids[r.id] || (r.plan && WK.ids[r.plan]) || WK.names[wkNorm(r.name)]);
    }
    function card(r, i) {
      var art = cardArt(r, typeof i === 'number' ? i : 0, typeof i === 'number' && i > 0 ? lastArt : ''); lastArt = art;
      return '<button type="button" class="rc-card rc-k-' + esc(r.meal) + '" data-id="' + esc(r.id) + '">' +
        '<span class="rc-band"><span class="rc-ic rc-pic" aria-hidden="true"><img src="' + W + art + '.webp" alt="" loading="lazy" decoding="async" width="600" height="600"></span><span class="rc-m">' + esc(MEAL_NAME[r.meal] || r.meal) + '</span></span>' +
        '<span class="rc-cb"><b>' + esc(r.name) + '</b>' +
        '<span class="rc-pills">' + (onWk(r) ? '<span class="rc-pill rc-onwk" data-rc-onwk>On Your Week</span>' : '') + '<span class="rc-pill">' + CLOCK + esc(r.mins + ' min') + '</span><span class="rc-pill">' + PEOPLE + esc('Serves ' + (window.GGScale ? sv(r) : r.serves)) + '</span></span>' +
        '<span class="rc-n" title="' + esc(nutLine(r)) + '">' + esc(shortNut(r)) + '</span></span></button>';
    }
    function section(c, list) {
      if (!list.length) return '';
      return '<section class="rc-sec rc-k-' + c[0] + '" data-meal="' + c[0] + '" aria-labelledby="rc-s-' + c[0] + '"><div class="rc-sh"><img src="' + W + c[2] + '.webp" alt="" loading="lazy" decoding="async">' +
        '<h2 id="rc-s-' + c[0] + '">' + esc(c[1]) + '</h2><span class="rc-shn">' + list.length + (list.length === 1 ? ' recipe' : ' recipes') + '</span></div>' +
        '<div class="rc-grid">' + list.map(card).join('') + '</div></section>';
    }

    // BLD 905: a search also finds the Bulk Foods guides (by name and their keys), shown above the matching recipes.
    function bulkHits() {
      var words = qWords(st.q); if (!BK || !words.length || st.meal !== 'all') return [];
      return BK.guides.filter(function (g) { var h = g._h || (g._h = ' ' + (g.name + ' ' + (g.keys || '')).toLowerCase() + ' ' + qWords(g.name + ' ' + (g.keys || '')).map(stem).join(' ') + ' '); return words.every(function (w) { return hit(h, w); }); });
    }
    function drawList() {
      var list = ALL.filter(matches), bh = bulkHits(), hh = holHits();
      var bhHTML = bh.length ? '<div class="rc-bkhits"><span class="rc-lab">Bulk Foods Guides</span>' + bh.map(function (g) { return '<a href="#bulk-' + esc(g.id) + '" data-bulk="' + esc(g.id) + '">' + esc(g.name) + '</a>'; }).join('') + '</div>' : '';
      if (filtering()) $('rc-grid').innerHTML = bhHTML + (list.length || hh.length ? '<div class="rc-grid">' + list.map(card).join('') + hh.map(function (d, i) { return hdCard(d, list.length + i); }).join('') + '</div>' : '');
      else $('rc-grid').innerHTML = CATS.filter(function (c) { return !SHELF[c[0]]; }).map(function (c) { return section(c, list.filter(function (r) { return r.meal === c[0]; })); }).join('');
      var nAll = list.length + hh.length, cn = nAll === 1 ? '1 recipe' : nAll + ' recipes';
      $('rc-count').innerHTML = st.meal !== 'all' ? '<b>' + esc(CATS.filter(function (c) { return c[0] === st.meal; })[0][1]) + ':</b> ' + cn : cn;
      var em = $('rc-empty'), none = !nAll && !bh.length;
      if (none) em.innerHTML = emptyHTML();
      em.hidden = !none;
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
      if (r.meal === 'dinner') { var t = String(r.name || ''); if (/salmon|\bcod\b|fish|shrimp|tuna|trout|sardine|halibut|tilapia/i.test(t)) { wide = 'dinner-fish'; sq = 'dinner-fish-sq'; } else if (/chili|soup|stew/i.test(t)) { wide = 'dinner-chili'; sq = 'dinner-chili-sq'; } else if (/lentil|bean|chickpea|curry|dal\b/i.test(t)) { wide = 'dinner-curry'; sq = 'dinner-curry-sq'; } else if (/stir fry|bowl|noodle/i.test(t)) { wide = 'dinner-stirfry'; sq = 'dinner-stirfry-sq'; } }
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
        '<div class="rc-go"><button type="button" class="btn btn-primary rc-guide-btn" data-rc-guide>' + PLAY + 'Grounded Cooking</button>' + menuBtn('r:' + r.id) + shareBtn('r:' + r.id) + plateBtn(r.id) + '<span>Step by step, with a voice to guide you.</span></div><p class="rc-shnote" data-rc-shnote="' + esc('r:' + r.id) + '" role="status" hidden></p><div class="rc-mnote" data-rc-mnote="r:' + esc(r.id) + '" hidden></div>' +
        '<div class="rc-cols"><div class="card"><h3>Ingredients</h3>' +
        (window.GGScale ? '<div class="rc-size"><div class="rc-row" role="group" aria-labelledby="rc-l-size"><span class="rc-lab" id="rc-l-size">Serves</span>' + sizeChips(sv(r)) + '</div>' +
          '<p class="rc-size-note">' + (isBatch(r) ? 'A full pitcher. Choose a smaller batch any time; the steps fit every size.' : 'Amounts scale to your table. The steps fit every size.') + '</p></div>' : '') +
        '<ul class="rc-ing" id="rc-ing" aria-live="polite">' + ingHTML(r) + '</ul></div>' +
        '<div class="card"><h3>Steps</h3><ol class="rc-steps">' + steps + '</ol></div></div>' +
        '<div class="rc-notes">' + note('To Serve', r.serve) + note('Tip', r.tip) + note('Keeps', r.keeps) + note('For Kids', r.kid) + pairsHTML(r) +
        (swaps.length ? '<div class="card"><h3>Swaps</h3>' + swaps.map(function (s) { return '<p>' + esc(s) + '</p>'; }).join('') + '</div>' : '') + '</div>' +
        '<div class="rc-plates" id="rc-plates" data-rc-plates="' + esc(r.id) + '"></div>' +
        '<div class="rc-low"><div class="card"><h3>Nutrition per Serving</h3><table class="rc-nut"><caption>Estimates from USDA FoodData Central.</caption><tbody>' +
        rows.map(function (x) { return '<tr><th scope="row">' + x[0] + '</th><td>' + x[1] + x[2] + '</td></tr>'; }).join('') + '</tbody></table></div>' +
        '<div class="card rc-cook"><h3>Grounded Cooking</h3><p>Your kitchen guide, right here: one step at a time, read aloud by a calm voice, with a timer for every step that takes minutes. Cook at your own pace, with Back and Next.</p>' +
        '<button type="button" class="btn btn-primary rc-guide-btn" id="rc-cook" data-rc-guide>' + PLAY + 'Grounded Cooking</button>' +
        '<p class="rc-doc" style="margin-top:18px">' + esc(T.doctor || '') + '</p></div></div>' +
        '</article>';
    }

    /* ---------- BLD 896: Holidays and Gatherings (shared/gg-holidays.js, GGHolidays) ----------
       A shelf above the recipe tools: every set opens at /recipes/#hol-<set id> with its menu, each recipe sized by the
       Serves picker, its steps, and Guide Me, Step by Step in the same kitchen guide (the guide speaks 'We are making <name>.'
       and each step's line, the lines field-guide/health.js speaks for a holiday recipe). Setting a set up on the calendar
       lives in The Grounded Way; this page is open to anyone. */
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
    function toShelf(id, smooth) { aim($(id), smooth); }
    // A recipe inside a set, opened from a link on load: aim again once the fonts and paintings settle above it.
    function settleDish(dc) {
      var again = function () { if (dc.isConnected && !$('rc-detail').hidden) aim(dc, false, MNT ? OFF : 90); };
      try { if (document.fonts && document.fonts.ready) document.fonts.ready.then(again); } catch (e) {}
      if (document.readyState !== 'complete') window.addEventListener('load', function () { setTimeout(again, 60); }, { once: true });
    }
    function toHolidays(smooth) { toShelf('rc-hol', smooth); }
    // On a /recipes/#holidays load (or a mount opened at a shelf), aim again once the fonts and paintings settle (the list
    // above can change height as they arrive).
    function settleShelf(id) {
      var again = function () { if ($('rc-list').hidden) return; if (MNT ? (cur === id && !stack.length) : location.hash === '#' + id) toShelf(id === 'holidays' ? 'rc-hol' : id === 'drinks' ? 'rc-drinks' : 'rc-bulk', false); };
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
        return '<div class="card rc-hrec" id="rc-hd-' + esc(m.id) + '" tabindex="-1"><h3>' + esc(m.name) + '</h3><p class="rc-t">' + esc([m.course ? m.course.charAt(0).toUpperCase() + m.course.slice(1) : '', m.mins ? m.mins + ' min' : '', 'serves ' + r.serves].filter(Boolean).join(' · ')) + '</p>' +
          '<div class="rc-go"><button type="button" class="btn btn-primary rc-guide-btn" data-rc-hguide="' + esc(id + '|' + m.id) + '">' + PLAY + 'Grounded Cooking</button>' + menuBtn('h:' + id + ':' + m.id) + shareBtn('h:' + id + ':' + m.id) + '</div><p class="rc-shnote" data-rc-shnote="' + esc('h:' + id + ':' + m.id) + '" role="status" hidden></p><div class="rc-mnote" data-rc-mnote="' + esc('h:' + id + ':' + m.id) + '" hidden></div>' +
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
      return '<div class="rc-also"><h3 class="rc-hh">More for This Day</h3><p class="rc-hl">Party food and celebration drinks that suit this day, each with its own recipe and Grounded Cooking.</p><div class="rc-grid">' + L.map(card).join('') + '</div></div>';
    }
    /* ---------- BLD 902: Celebration Drinks (GGTendPublic.party) ----------
       The drink menu in its sections, Build Your Own Sparkler, and the Party Drink Station guide. Reached by the Drinks card or
       /recipes/#drinks; each drink opens its own recipe like any other. */
    function drinkShelf() {
      var D = PARTY && PARTY.drinks, all = ALL.filter(function (r) { return r.meal === 'drink'; });
      if (!all.length) return '';
      var secs = D && (D.sections || []).length ? D.sections : [{ id: 'all', name: 'Drinks', ids: all.map(function (r) { return r.id; }) }];
      var sp = PARTY && PARTY.sparkler, stn = PARTY && PARTY.station;
      return '<div class="rc-sh"><img src="' + W + 'drinks-sq.webp" alt="" loading="lazy" decoding="async"><h2 id="rc-s-drinks">Sober Drinks</h2><span class="rc-shn">' + all.length + ' recipes</span></div>' +
        '<p class="rc-hl">Every drink here is sober: whole fruit, fresh herbs, sparkle, and warmth, made to share and to raise a glass.</p>' +   // BLD 929 (L7): one name, the tile's
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
    /* ---------- BLD 905: Bulk Foods (shared/gg-bulk.js, GGBulk) ----------
       A section like Holidays and Gatherings: a tile for each guide, and each guide opens at /recipes/#bulk-<id> with
       How to Store It, How to Put It Up, and Recipes That Use the Most (public recipes as cards; holiday recipes link to their
       set). The Sources line sits at the end of each guide. */
    function bulkShelf() {
      if (!BK) return '';
      return '<div class="rc-sh"><img src="' + W + 'shop-sq.webp" alt="" loading="lazy" decoding="async"><h2 id="rc-s-bulk">' + esc(BK.title || 'Bulk Foods') + '</h2><span class="rc-shn">' + BK.guides.length + ' guides</span></div>' +
        '<p class="rc-hl">' + esc(BK.lead || '') + '</p>' +
        '<div class="rc-hgrid">' + BK.guides.map(function (g, k) {
          return '<button type="button" class="rc-hcard rc-bkcard rc-hk' + (k % 5) + '" data-bulk="' + esc(g.id) + '"><span class="rc-bki" aria-hidden="true">' + ICON.bulk + '</span><span class="rc-cb"><b>' + esc(g.name) + '</b>' +
            '<span class="rc-t">' + esc('Store, put up, and ' + g.recipes.length + ' recipes') + '</span><span class="rc-n">' + esc(g.lead) + '</span></span></button>';
        }).join('') + '</div>' +
        (BK.note ? '<p class="rc-hl rc-bknote">' + esc(BK.note) + '</p>' : '');
    }
    // A guide's recipe link: {r: id} is a public recipe; {h: 'set:menu id'} is a recipe inside a holiday set.
    function bulkLink(x) {
      if (x.r) { var r = byId(x.r); return r ? { kind: 'r', r: r, note: x.note || '' } : null; }
      var p = String(x.h || '').split(':'), set = HOL && HOL.get(p[0]), m = set ? (set.menu || []).filter(function (y) { return y.id === p[1]; })[0] : null;
      return m ? { kind: 'h', set: set, m: m, note: x.note || '' } : null;
    }
    function bulkDetail(id) {
      var g = BK && BK.get(id); if (!g) return '';
      var L = g.recipes.map(bulkLink).filter(Boolean), pub = L.filter(function (x) { return x.kind === 'r'; }), hol = L.filter(function (x) { return x.kind === 'h'; });
      var src = (g.sources || []).map(function (k) { return (BK.sources || {})[k]; }).filter(Boolean);
      var list = function (a) { return '<ul class="rc-bkul">' + a.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>'; };
      return '<button type="button" class="rc-back" id="rc-back"><span aria-hidden="true">&larr;</span> All Recipes</button>' +
        '<article class="rc-k-bulk rc-bk" aria-labelledby="rc-dname"><div class="rc-dhero" aria-hidden="true"><picture><source media="(max-width:699px)" srcset="' + W + 'shop-sq.webp"><img src="' + W + 'shop-wide.webp" alt="" decoding="async"></picture></div>' +
        '<div class="rc-dh"><span class="rc-ic">' + ICON.bulk + '</span><div><div class="eyebrow">' + esc(BK.title || 'Bulk Foods') + '</div><h2 id="rc-dname" tabindex="-1">' + esc(g.name) + '</h2></div></div>' +
        '<p class="rc-hl">' + esc(g.lead) + '</p>' +
        '<div class="rc-bkcols"><div class="card rc-bkc"><h3>How to Store It</h3>' + list(g.store) + '</div>' +
        '<div class="card rc-bkc"><h3>How to Put It Up</h3>' + list(g.putUp) + '</div></div>' +
        '<div class="rc-also rc-bkrec"><h3 class="rc-hh">Recipes That Use the Most</h3>' +
        (pub.length ? '<div class="rc-grid">' + pub.map(function (x) { return x.note ? card(x.r).replace('</b>', '</b><span class="rc-bkn">' + esc(x.note.charAt(0).toUpperCase() + x.note.slice(1)) + '</span>') : card(x.r); }).join('') + '</div>' : '') +
        (hol.length ? '<div class="card rc-pairs rc-bkhol"><h3>From Holidays and Gatherings</h3><ul>' + hol.map(function (x) { return '<li><a href="#hol-' + esc(x.set.id) + '">' + esc(x.m.name) + '</a> <span class="rc-bkset">' + esc(x.set.name) + '</span></li>'; }).join('') + '</ul></div>' : '') + '</div>' +
        (BK.note ? '<p class="rc-hl rc-bknote">' + esc(BK.note) + '</p>' : '') +
        (src.length ? '<p class="rc-src">Sources: ' + src.map(function (s) { return '<a href="' + esc(s[1]) + '" target="_blank" rel="noopener">' + esc(s[0]) + '</a>'; }).join('; ') + '</p>' : '') +
        '</article>';
    }
    /* ---------- BLD 900: Add to My Menu ----------
       The add goes to Tending (GGHealth.menuOpen): a sheet to choose the day, the meal, and the servings, and the ingredients join
       the Shopping List. Everything stays on this device. On the page inside a frame of The Grounded Way, that is the parent
       page's GGHealth (same site); in a mount (BLD 912), opts.menuOpen when given, or this window's GGHealth. With no Tending,
       the recipe shows a gentle line and a way into The Grounded Way (/home/#recipe-<id>), where the menu lives. */
    /* ---------- BLD 917: Share ----------
       A Share button on each recipe and each Holidays and Gatherings recipe. The phone's own share sheet when it has one (the
       name, one line, and the link); otherwise the link is copied and the button's line says Link copied. A public recipe shares
       its own page (recipes/r/<id>.html, with its painting in the link preview); any recipe outside the public file shares the
       Recipes page, and never its content. */
    // BLD 967 Share My Plate (shared/gg-plates.js): a photo and a few words after cooking, kept with the recipe and shared as a card.
    var PLATES_JS = '/shared/gg-plates.js?v=b981';
    function plateBtn(id) { return '<button type="button" class="btn btn-secondary rc-plate-btn" data-rc-plate="' + esc(id) + '">' + SHARE_ICON + 'Share My Plate</button>'; }
    function platesLoad() { if (window.GGPlates) return Promise.resolve(true); if (platesLoad.p) return platesLoad.p;
      return (platesLoad.p = new Promise(function (ok) { var s = document.createElement('script'); s.src = PLATES_JS; s.onload = function () { ok(!!window.GGPlates); }; s.onerror = function () { platesLoad.p = null; ok(false); }; document.head.appendChild(s); })); }
    function plateOf(id) { var r = byId(id); return r ? { id: r.id, name: r.name, url: '/recipes/r/' + r.id + '.html' } : null; }
    function fillPlates(r) { var el = $('rc-plates'); if (!el || !r) return; platesLoad().then(function (ok) { if (ok && el.isConnected) GGPlates.section(el, plateOf(r.id)); }); }
    function shareBtn(ref) { return '<button type="button" class="btn btn-secondary rc-share-btn" data-rc-share="' + esc(ref) + '">' + SHARE_ICON + 'Share</button>'; }
    var PUB = {}; ((window.GGTendPublic || {}).recipes || []).forEach(function (r) { if (r && r.id && !r.member) PUB[r.id] = 1; });
    // BLD 934: two Sober Drinks are Sparklers; their share pages use the new names (patches/bld917/gen-recipe-pages.py FILE_NAME).
    var FILE_NAME = { 'dr-apple-ginger-spritz': 'dr-apple-ginger-sparkler', 'dr-cranberry-rosemary-spritz': 'dr-cranberry-rosemary-sparkler' };
    var OPENPUB = !!(window.GGTendPublic && window.GGTendPublic.public !== false && !window.GGTendPublic.member);
    function shareOf(ref) {
      var p = String(ref).split(':');
      if (p[0] === 'h') {
        var x = HOL && HOL.get(p[1]), m = x ? (x.menu || []).filter(function (y) { return y.id === p[2]; })[0] : null;
        if (m) return { title: m.name, text: m.name + ', from the ' + x.name + ' menu in Grounded Recipes: whole food for the big days, guided step by step.', url: SITE + '/recipes/r/hol-' + x.id + '-' + m.id + '.html' };
      } else {
        var r = byId(p.slice(1).join(':'));
        if (r && OPENPUB && PUB[r.id]) return { title: r.name, text: r.name + ', a Grounded Recipe: whole food, ready in ' + r.mins + ' minutes, guided step by step.', url: SITE + '/recipes/r/' + (FILE_NAME[r.id] || r.id) + '.html' };
      }
      return { title: 'Grounded Recipes', text: 'Grounded Recipes: whole food, built to thrive, for every meal of the day.', url: SITE + '/recipes/' };
    }
    function copyText(t) {
      try { if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) return navigator.clipboard.writeText(t).then(function () { return true; }, function () { return oldCopy(t); }); } catch (e) {}
      return Promise.resolve(oldCopy(t));
    }
    function oldCopy(t) {
      var a = document.createElement('textarea'); a.value = t; a.setAttribute('readonly', ''); a.style.cssText = 'position:fixed;top:0;left:0;opacity:0;width:1px;height:1px;';
      document.body.appendChild(a); a.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (e) {} a.remove(); return ok;
    }
    function shareGo(ref, btn) {
      var d = shareOf(ref), box = null;
      root.querySelectorAll('[data-rc-shnote]').forEach(function (b) { if (b.getAttribute('data-rc-shnote') === ref) box = b; });
      var say = function (html) { if (!box) return; box.innerHTML = html; box.hidden = false; clearTimeout(box._t); box._t = setTimeout(function () { box.hidden = true; }, 6000); };
      var copy = function () { copyText(d.url).then(function (ok) { say(ok ? 'Link copied. Paste it anywhere to share.' : 'Copy this link to share: <a class="text-link" href="' + esc(d.url) + '">' + esc(d.url) + '</a>'); }); };
      if (navigator.share) {
        try { navigator.share({ title: d.title, text: d.text, url: d.url }).catch(function (e) { if (!e || e.name !== 'AbortError') copy(); }); } catch (e) { copy(); }
        return;
      }
      copy();
    }
    function menuBtn(ref) { return '<button type="button" class="btn btn-secondary rc-menu-btn" data-rc-menu="' + esc(ref) + '">' + MENU_ICON + 'Add to My Menu</button>'; }
    function homeHealth() {
      if (MNT) { if (typeof opts.menuOpen === 'function') return { menuOpen: opts.menuOpen }; var H = window.GGHealth; return H && typeof H.menuOpen === 'function' ? H : null; }
      try { var P = window.parent; if (P && P !== window && P.GGHealth && typeof P.GGHealth.menuOpen === 'function') return P.GGHealth; } catch (e) {} return null;
    }
    function hasProfile() { try { var j = JSON.parse(localStorage.getItem('gg-profiles-v1') || 'null'); return !!(j && Array.isArray(j.list) && j.list.length); } catch (e) { return false; } }
    function menuGo(ref) {
      var P = homeHealth(), r = P ? P.menuOpen(ref, { serves: sv(byId(String(ref).replace(/^r:/, ''))) }) : null;
      if (r === true) return;
      var box = null; root.querySelectorAll('[data-rc-mnote]').forEach(function (b) { if (b.getAttribute('data-rc-mnote') === ref) box = b; }); if (!box) return;
      var deep = '/home/#recipe-' + encodeURIComponent(/^h:/.test(ref) ? 'hol-' + ref.split(':')[1] : ref.slice(2));
      box.innerHTML = P ? '<p>Start Tending in The Grounded Way, and My Menu holds this recipe for any day you choose, with its ingredients on your Shopping List.</p><a class="btn btn-primary" href="/home/#today=tending" target="_top">Start Tending</a>'
        : '<p>My Menu lives in The Grounded Way, private on this device: choose a day and a meal, the ingredients join your Shopping List, and Grounded Cooking waits on Today.</p><a class="btn btn-primary" href="' + (hasProfile() ? deep : '/home/') + '">' + (hasProfile() ? 'Open It in The Grounded Way' : 'Open The Grounded Way') + '</a>';
      box.hidden = false;
    }
    var baseTitle = document.title;
    // Shows one view: a recipe id, hol-<set>, bulk-<guide>, or the list ('' or a shelf name: holidays, drinks, bulk).
    function show(id) {
      id = id || '';
      // BLD 917: hol-<set>:<recipe> opens the set with that recipe in view (a search hit, a shared recipe page).
      var dish = '';
      if (/^hol-[^:]+:./.test(id)) { dish = id.slice(id.indexOf(':') + 1); id = id.slice(0, id.indexOf(':')); }
      if (/^hol-/.test(id) && HOL && HOL.get(id.slice(4))) {
        var hl = $('rc-list'), hd = $('rc-detail');
        if (G.on() && G.id() !== id) G.close(true);
        if (!hl.hidden) listY = getY();
        hd.innerHTML = holDetail(id.slice(4)); hl.hidden = true; hd.hidden = false; lastId = id;
        var dc = dish ? $('rc-hd-' + dish) : null;
        setTitle((dc ? dc.querySelector('h3').textContent + ' | ' : '') + HOL.get(id.slice(4)).name + ' | Grounded Recipes | Grow With Grounded');
        toTop();
        if (dc) { dc.classList.add('rc-hd-on'); aim(dc, false, MNT ? OFF : 90); dc.focus({ preventScroll: true }); settleDish(dc); return; }
        var hh = $('rc-dname'); if (hh) hh.focus({ preventScroll: true }); return;
      }
      if (/^bulk-/.test(id) && BK && BK.get(id.slice(5))) {
        var bl = $('rc-list'), bd = $('rc-detail');
        if (G.on()) G.close(true);
        if (!bl.hidden) listY = getY();
        bd.innerHTML = bulkDetail(id.slice(5)); bl.hidden = true; bd.hidden = false; lastId = id;
        setTitle(BK.get(id.slice(5)).name + ' | Bulk Foods | Grounded Recipes | Grow With Grounded');
        toTop();
        var bh = $('rc-dname'); if (bh) bh.focus({ preventScroll: true }); return;
      }
      var r = id && id !== 'holidays' && id !== 'drinks' && id !== 'bulk' ? byId(id) : null;
      var list = $('rc-list'), det = $('rc-detail');
      if (G.on() && (!r || r.id !== G.id())) G.close(true);
      if (r) {
        if (!list.hidden) listY = getY();
        det.innerHTML = detailHTML(r); fillPlates(r);
        list.hidden = true; det.hidden = false;
        setTitle(r.name + ' | Grounded Recipes | Grow With Grounded');
        lastId = r.id;
        toTop();
        var h = $('rc-dname'); if (h) h.focus({ preventScroll: true });
      } else {
        var wasDetail = !det.hidden;
        det.hidden = true; det.innerHTML = ''; list.hidden = false;
        setTitle(baseTitle);
        if (wasDetail && lastId) {
          goY(listY);
          var c = /^hol-/.test(lastId) ? q1('.rc-hcard[data-hol="' + ek(lastId.slice(4)) + '"]') : /^bulk-/.test(lastId) ? q1('.rc-hcard[data-bulk="' + ek(lastId.slice(5)) + '"]') : q1('.rc-card[data-id="' + ek(lastId) + '"]');
          if (c) c.focus({ preventScroll: true });
        } else if (id === 'holidays') toHolidays(false);
        else if (id === 'drinks') toShelf('rc-drinks', false);
        else if (id === 'bulk') toShelf('rc-bulk', false);
      }
    }

    function setServes(n) {
      n = okSize(n); if (!n) return;
      var rb = byId(lastId), dt0 = $('rc-detail');
      if (isBatch(rb) && dt0 && !dt0.hidden) { batchSize[rb.id] = n; }
      else { serves = n; try { localStorage.setItem('gg-serves', String(n)); } catch (e) {} }
      if (/^hol-/.test(lastId) && HOL) { var hd0 = $('rc-detail'); if (hd0 && !hd0.hidden) { hd0.innerHTML = holDetail(lastId.slice(4)); var b0 = hd0.querySelector('[data-sz="' + n + '"]'); if (b0) b0.focus({ preventScroll: true }); } drawList(); return; }
      var r = byId(lastId), ing = $('rc-ing'), tag = $('rc-serves'), row = q1('.rc-size .rc-row');
      if (r && ing) ing.innerHTML = ingHTML(r);
      if (tag) tag.textContent = 'Serves ' + n;
      if (row) { row.innerHTML = '<span class="rc-lab" id="rc-l-size">Serves</span>' + sizeChips(sv(r)); var b = row.querySelector('[data-sz="' + n + '"]'); if (b) b.focus({ preventScroll: true }); }
      drawList();
    }

    function goBack() {
      if (MNT) { cur = stack.length ? stack.pop() : ''; show(cur); return; }
      if (fromList) { fromList = false; history.back(); return; }
      history.pushState(null, '', location.pathname + location.search);
      show(hashId());
    }

    /* ---------- BLD 877: Guide Me, Step by Step, built into the page ----------
       The same flow as the kitchen guide in field-guide/health.js (vGuide, kEnter, kStartTimer): the voice says
       'We are making <name>.', then each step as it opens; a step with minutes offers a timer ('Timer set for N minutes.'),
       and a finished timer chimes and says 'That timer is done.'; the finish says 'All done. Enjoy the table together.'
       Voice id 'andrew' is the recorded kitchen voice's clip id (never shown).
       BLD 912: on the page it covers the screen (with a history entry, so the phone's Back closes it); in a mount it plays
       inside the mount, in place of the list or the recipe, and Close returns to where it began. */
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
      // In a mount, Escape closes the guide only (Home's window stays open).
      function mEsc(e) { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); } }
      /* BLD 895 (Chris: "food pics ride w guides too!"): the guide plays over a food painting, softened under a scrim in the page's
         own colors. Dinners by night (install895.py in the workshop rewrites DINNER_ART with the paintings present); other dinners
         show Today's Plate. Breakfasts and snacks show the Weekly Batch table, lunches the lunch painting. */
      var DINNER_ART = ['fish', 'chili', 'curry', 'stirfry'];
      var DIN_RE = [['fish', /salmon|\bcod\b|fish|shrimp|tuna|trout|sardine|halibut|tilapia/i], ['chili', /chili|soup|stew/i], ['curry', /lentil|bean|chickpea|curry|dal\b/i], ['stirfry', /stir fry|bowl|noodle/i]];
      var MEAL_ART = { breakfast: 'weekly-batch', snack: 'weekly-batch', lunch: 'meal-lunch', dinner: 'todays-plate', party: 'kitchen-headstart', sauce: 'prep-together', drink: 'drinks' };
      var ONE_ART = { 'tend-people': 1 }; // one square painting serves both sizes
      function artName(r) {
        var m = String(r.meal || 'dinner').toLowerCase();
        if (m === 'dinner') { var t = String(r.name || ''), hit = DIN_RE.filter(function (x) { return x[1].test(t); })[0]; if (hit && DINNER_ART.indexOf(hit[0]) >= 0) return 'dinner-' + hit[0]; }
        return MEAL_ART[m] || MEAL_ART.dinner;
      }
      function paint(r) {
        var n = artName(r);
        return '<div class="rg-paint" aria-hidden="true"><picture><source media="(max-width:699px)" srcset="' + W + n + (ONE_ART[n] ? '' : '-sq') + '.webp"><img src="' + W + n + '.webp" alt="" decoding="async"></picture></div>';
      }
      function open(r, btn) {
        if (o) close(true);
        setKey();
        var vo = V(); if (vo) vo.unlock();
        o = { r: r, gi: 0, timers: [], rang: null, fin: false, btn: btn || null, y: getY() };
        el = document.createElement('div'); el.className = 'rg-ov';
        if (MNT) { el.setAttribute('role', 'region'); el.setAttribute('aria-labelledby', 'rg-title'); }
        else { el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-labelledby', 'rg-title'); }
        el.classList.add('rg-hasart'); el.innerHTML = paint(r) + '<div class="rg-in"></div>';
        el.addEventListener('click', function (e) { var b = e.target.closest('[data-rg]'); if (b && !b.disabled) act(b.getAttribute('data-rg'), b.getAttribute('data-v')); });
        if (MNT) {
          var mv = q1('.rc-mview'); if (mv) mv.hidden = true;
          root.appendChild(el); el.addEventListener('keydown', mEsc); goY(0);
        } else {
          document.body.appendChild(el); document.documentElement.classList.add('rg-lock');
          document.addEventListener('keydown', trap);
          try { history.pushState({ rcGuide: 1 }, '', location.href); } catch (e) {}
        }
        draw('[data-rg="next"]'); music(); wake(true);
        tick = setInterval(onTick, 500);
        say(LN.cIntro(r.name)).then(function (still) { if (still && o.gi === 0 && !o.fin) enter(); });
        var S = steps(); if (vo && S[0]) vo.prefetch(VOICE, S[0].t);
      }
      function close(fromHistory) {
        if (!o) return;
        var vo = V(), btn = o.btn, y = o.y; if (vo) { vo.stop(); vo.music(null); }
        clearInterval(tick); wake(false);
        if (MNT) {
          if (el) { el.removeEventListener('keydown', mEsc); el.remove(); } el = null; o = null;
          var mv = q1('.rc-mview'); if (mv) mv.hidden = false;
          if (!fromHistory) goY(y);
        } else {
          document.removeEventListener('keydown', trap);
          if (el) el.remove(); el = null; o = null; document.documentElement.classList.remove('rg-lock');
          if (!fromHistory && history.state && history.state.rcGuide) { try { history.back(); } catch (e) {} }
        }
        if (MNT ? !fromHistory && btn && root.contains(btn) : btn && document.body.contains(btn)) btn.focus({ preventScroll: true });
      }
      return { open: open, close: close, on: function () { return !!o; }, id: function () { return o ? o.r.id : ''; }, LN: LN };
    })();

    function shelfClick(k) {
      var id = k === 'holidays' ? 'rc-hol' : k === 'drink' ? 'rc-drinks' : 'rc-bulk', h = k === 'drink' ? 'drinks' : k;
      if (!MNT && location.hash !== '#' + h) { try { history.pushState(null, '', location.pathname + location.search + '#' + h); } catch (x) {} }
      toShelf(id, true);
    }
    function init() {
      var d = q1('[data-rc-doctor]'); if (d && T.doctor) d.textContent = String(T.doctor).replace(/^Tending offers/, 'Grounded offers');   // BLD 929 (L15)
      if (!ALL.length) { $('rc-empty').hidden = false; $('rc-empty').textContent = 'The recipes are on their way. Refresh the page in a moment.'; return false; }
      $('rc-tools').hidden = false; $('rc-cats').hidden = false; $('rc-l-cats').hidden = false;
      drawChips(); drawList();
      var ds = drinkShelf(), db = $('rc-drinks');
      if (ds && db) { db.innerHTML = ds; db.hidden = false; db.setAttribute('aria-labelledby', 'rc-s-drinks'); db.setAttribute('role', 'region');
        db.addEventListener('click', function (e) {
          var j = e.target.closest('[data-drjump]'); if (j) { e.preventDefault(); toShelf('rc-dr-' + j.getAttribute('data-drjump'), true); return; }
          var c = e.target.closest('.rc-card'); if (!c) return; nav(c.getAttribute('data-id')); }); }
      var hs = holShelf(), hb = $('rc-hol'); if (hs && hb) { hb.innerHTML = hs; hb.hidden = false; hb.setAttribute('aria-labelledby', 'rc-s-holidays'); hb.setAttribute('role', 'region');
        hb.addEventListener('click', function (e) { var c = e.target.closest('[data-hol]'); if (!c) return; nav('hol-' + c.getAttribute('data-hol')); }); }
      var ks = bulkShelf(), kb = $('rc-bulk'); if (ks && kb) { kb.innerHTML = ks; kb.hidden = false; kb.setAttribute('aria-labelledby', 'rc-s-bulk'); kb.setAttribute('role', 'region');
        kb.addEventListener('click', function (e) { var c = e.target.closest('[data-bulk]'); if (!c) return; nav('bulk-' + c.getAttribute('data-bulk')); }); }
      $('rc-cats').addEventListener('click', function (e) {
        var c = e.target.closest('[data-cat]'); if (!c) return;
        var k = c.getAttribute('data-cat');
        if (SHELF[k]) { shelfClick(k); return; }
        st.meal = st.meal === k ? 'all' : k;
        drawChips(); drawList();
        var again = q1('.rc-cat[data-cat="' + k + '"]'); if (again) again.focus({ preventScroll: true });
        var tl = $('rc-grid');   // BLD 929 (M23): Browse by Meal sits under the search, so a meal tap brings its recipes into view
        if (st.meal !== 'all' && relTop(tl) > 160) aim(tl, true, MNT ? OFF : 80);
      });
      $('rc-tools').addEventListener('click', function (e) {
        var b = e.target.closest('.rc-chip'); if (!b) return;
        var g = b.getAttribute('data-g'), k = b.getAttribute('data-k');
        if (g === 'meal') st.meal = k;
        else if (g === 'goal') st.goal = st.goal === k ? '' : k;
        else { var i = st.fits.indexOf(k); if (i >= 0) st.fits.splice(i, 1); else st.fits.push(k); }
        drawChips(); drawList();
        var again = q1('.rc-chip[data-g="' + g + '"][data-k="' + k + '"]'); if (again) again.focus();
      });
      $('rc-q').addEventListener('input', function () { st.q = this.value.trim(); drawList(); });
      $('rc-clear').addEventListener('click', function () { st = { meal: 'all', goal: '', fits: [], q: '' }; $('rc-q').value = ''; drawChips(); drawList(); $('rc-q').focus(); });
      $('rc-grid').addEventListener('click', function (e) {
        var bk = e.target.closest('[data-bulk]'); if (bk) { e.preventDefault(); nav('bulk-' + bk.getAttribute('data-bulk')); return; }
        var hd = e.target.closest('[data-hd]'); if (hd) { nav(hd.getAttribute('data-hd')); return; }
        var c = e.target.closest('.rc-card'); if (!c) return;
        nav(c.getAttribute('data-id'));
      });
      $('rc-empty').addEventListener('click', function (e) {
        var t = e.target.closest('[data-rc-try]'); if (!t) return;
        st.q = t.getAttribute('data-rc-try'); $('rc-q').value = st.q; drawList(); $('rc-q').focus();
      });
      $('rc-detail').addEventListener('click', function (e) {
        var sz = e.target.closest('[data-sz]');
        if (sz) { setServes(+sz.getAttribute('data-sz')); return; }
        if (e.target.closest('#rc-back')) goBack();
        else if (e.target.closest('.rc-bkhol a')) { if (!MNT) fromList = true; }
        else if (e.target.closest('.rc-also .rc-card')) nav(e.target.closest('.rc-card').getAttribute('data-id'));
        else if (e.target.closest('[data-rc-plate]')) { var pid = e.target.closest('[data-rc-plate]').getAttribute('data-rc-plate'); platesLoad().then(function (ok) { if (ok) GGPlates.compose(plateOf(pid)); }); }
        else if (e.target.closest('[data-rc-share]')) shareGo(e.target.closest('[data-rc-share]').getAttribute('data-rc-share'), e.target.closest('[data-rc-share]'));
        else if (e.target.closest('[data-rc-menu]')) menuGo(e.target.closest('[data-rc-menu]').getAttribute('data-rc-menu'));
        else if (e.target.closest('[data-rc-hguide]')) { var hv = e.target.closest('[data-rc-hguide]').getAttribute('data-rc-hguide').split('|'), hr = holRecipe(hv[0], hv[1]); if (hr) G.open(hr, e.target.closest('[data-rc-hguide]')); }
        else if (e.target.closest('[data-rc-guide]')) { var r = byId(lastId); if (r) G.open(sized(r), e.target.closest('[data-rc-guide]')); }
      });
      if (MNT) {
        // In a mount, links inside the recipes (#<recipe id>, #hol-<set>, #bulk-<guide>) open in place; links into The Grounded
        // Way (/home/...) go to opts.onLink when Home gives one.
        root.addEventListener('click', function (e) {
          if (e.defaultPrevented) return;
          var a = e.target.closest('a[href]'); if (!a || !root.contains(a)) return;
          var href = a.getAttribute('href') || '';
          if (href.charAt(0) === '#') { e.preventDefault(); if (!a.closest('.rg-ov')) nav(decodeURIComponent(href.slice(1))); return; }
          if (/^\/home\//.test(href) && typeof opts.onLink === 'function') { e.preventDefault(); opts.onLink(href.replace(/^\/home\/#?/, ''), href); }
        });
      } else {
        window.addEventListener('hashchange', function () { if (!location.hash) fromList = false; show(hashId()); });
        window.addEventListener('popstate', function () { if (G.on() && !(history.state && history.state.rcGuide)) G.close(true); if (!location.hash) fromList = false; });
        if (location.hash) show(hashId());
        if (location.hash === '#holidays' || location.hash === '#drinks' || location.hash === '#bulk') settleShelf(location.hash.slice(1));
      }
      return true;
    }
    var ready = init();

    // A mount's controls: open a view, step back, close, and which view shows.
    function openWhat(what) {
      what = String(what || '');
      if (what === 'list' || what === 'recipes') what = '';
      if (G.on()) G.close(true);
      stack = []; lastId = '';
      var det = $('rc-detail'); if (det && !det.hidden) { det.hidden = true; det.innerHTML = ''; $('rc-list').hidden = false; }
      cur = what;
      if (what === 'holidays' || what === 'drinks' || what === 'bulk') {
        goY(0); show(what);
        try { requestAnimationFrame(function () { if (cur === what && !stack.length) show(what); }); } catch (e) {}
        settleShelf(what);
      } else if (what) { show(what); if ($('rc-detail').hidden) { cur = ''; goY(0); } }
      else { show(''); goY(0); }
    }
    return {
      ready: ready, guide: G, openWhat: openWhat,
      back: function () { if (G.on()) { G.close(); return true; } if (!$('rc-detail').hidden) { goBack(); return true; } return false; },
      view: function () { return G.on() ? 'guide' : $('rc-detail').hidden ? (cur === 'holidays' || cur === 'drinks' || cur === 'bulk' ? cur : 'list') : lastId; },
      stop: function () { if (G.on()) G.close(true); }
    };
  }

  // BLD 912: recipes/recipes.css, added once for a mount (the page links it in its head).
  function ensureCss(done) {
    var l = document.querySelector('link[href^="/recipes/recipes.css"]');
    if (l && l.sheet) { done(); return; }
    if (!l) { l = document.createElement('link'); l.rel = 'stylesheet'; l.href = CSS_HREF; document.head.appendChild(l); }
    var fin = false, go = function () { if (!fin) { fin = true; done(); } };
    l.addEventListener('load', go, { once: true }); l.addEventListener('error', go, { once: true }); setTimeout(go, 3000);
  }

  /* GGRecipes.mount(el, opts): Grounded Recipes inside el (Home gives #hm-mdlg-b, the body of its own window).
     opts.serves   the household's table size (as the page's ?serves=N); otherwise the remembered size, or 6
     opts.open     '' or 'list' (the list), a recipe id, 'holidays', 'drinks', 'bulk', 'hol-<set id>', or 'bulk-<guide id>'
     opts.onClose  called once when the mount closes (ctl.close())
     opts.menuOpen optional Add to My Menu handler (ref, {serves}); otherwise window.GGHealth.menuOpen, the same call the page
                   makes to the Home from its frame
     opts.onLink   optional (route, href) for links into The Grounded Way (/home/#week, /home/#today=tending), so Home can open
                   its own screen; without it the link works as a link
     Returns ctl: open(what), back() (true when it stepped back; false at the list), view(), close(). */
  function mount(el, opts) {
    if (!el) return null;
    opts = opts || {};
    if (el.__ggRecipes) { try { el.__ggRecipes.close(true); } catch (e) {} }
    var root = document.createElement('div'); root.className = 'rc rc-mnt';
    root.style.visibility = 'hidden';
    root.innerHTML = mountHTML();
    el.innerHTML = ''; el.appendChild(root);
    var app = App({ root: root, opts: opts }), closed = false;
    app.openWhat(opts.open);
    ensureCss(function () { if (closed) return; root.style.visibility = ''; var w = app.view(); if (w === 'holidays' || w === 'drinks' || w === 'bulk') app.openWhat(w); });
    var ctl = {
      open: function (what) { if (!closed) app.openWhat(what); },
      back: function () { return closed ? false : app.back(); },
      view: function () { return closed ? '' : app.view(); },
      ready: app.ready,
      close: function (quiet) {
        if (closed) return; closed = true;
        app.stop(); if (root.parentNode) root.parentNode.removeChild(root);
        if (el.__ggRecipes === ctl) el.__ggRecipes = null;
        if (typeof opts.onClose === 'function') { try { opts.onClose(quiet ? 'replaced' : 'closed'); } catch (e) {} }
      }
    };
    el.__ggRecipes = ctl;
    return ctl;
  }

  var G0 = { files: FILES.map(function (f) { return f[0]; }), css: CSS_HREF, v: VER, mount: mount,
    // The files a window still needs before a mount (their globals are missing), in load order.
    need: function () { return FILES.filter(function (f) { return !window[f[1]]; }).map(function (f) { return f[0]; }); } };
  window.GGRecipes = G0;

  // The page itself: one instance on its own markup.
  function pageInit() { if (!document.getElementById('rc-list') || !document.getElementById('recipes')) return; var app = App({ page: true }); G0.guide = app.guide; }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', pageInit); else pageInit();
})();
