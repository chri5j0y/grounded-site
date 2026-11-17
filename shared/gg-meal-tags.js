// =====================================================================
// GROUNDED . MEAL TAGS (GWG BLD 1016, Today's Meals, Variety and Standards). (c) 2026 Grow With Grounded LLC.
// Chris, November 17, 2026: "make sure we do not have similar meals like this, salmon back to back, or mexican style dinners
// two nights in a row. make sure our menu has good variety and diversity as well as meeting grounded standards".
// Pure data and pure functions, the same in the browser (window.GGMealTags) and in Node (require).
//
//   tag:   'protein cuisine method' for every lunch and dinner in Grounded Recipes (by recipe id) and in the Guide plan (by
//          dinner id). protein is the main protein (salmon, cod, shrimp, chicken, turkey, beef, pork, beans, chickpeas,
//          lentils, tofu, eggs, and so on; mixed for a use-it-up night). cuisine is the style (mexican for Mexican and Tex-Mex
//          style, italian, asian, indian, mediterranean, african, latin, southern, european, american). method is how it
//          cooks (sheetpan, skillet, soup, slow, bake, roast, grill, bowl).
//   tagOf(meal)          {p, c, m}: the tag from the data, or one read from the name and ingredients for a new recipe.
//   lunchTag(lunch)      {p, c, m, left}: a Guide plan lunch idea, read from its name (Dinner leftovers is left: true).
//   meets(meal, kind)    true when the meal's nut is within the Grounded Standards for a meal or a snack.
//   clashes(days)        every rule a run of days breaks: days = [{date, lunch: tag, dinner: tag}] in date order.
//   ok(prev, cur, next, lunch)   true when a lunch keeps every rule for its day.
//   pickLunch(tags, i0, ctx)     the lunch for a day: the planned one when it keeps the rules, else the next one that does.
// The rules: a lunch never shares its day's dinner protein; no main protein twice on back to back days, lunch or dinner;
// no cuisine style twice on back to back dinners. American home cooking and a use-it-up night count as neutral styles.
// =====================================================================
(function(root){
'use strict';
const REC = {
 // BLD 1014's new recipes (November 17, 2026)
 "d-ginger-scallion-cod": "cod asian skillet", "d-halibut-barley-beets": "cod american skillet", "d-gigantes-plaki": "beans mediterranean bake",
 "d-red-beans-and-rice": "beans southern slow", "d-red-lentil-kofte": "lentils mediterranean bowl", "d-turkey-wild-rice-squash": "turkey american roast",
 "d-navy-bean-rutabaga-soup": "beans european soup",
 "d-sheet-pan-lemon-salmon": "salmon american sheetpan", "d-honey-ginger-salmon-bowls": "salmon asian bake",
 "d-herb-salmon-lentils": "salmon european bake", "d-cod-fish-tacos": "cod mexican bake", "d-oven-fish-and-chips": "cod european bake",
 "d-greek-shrimp-farro": "shrimp mediterranean skillet", "d-tuna-cakes": "tuna american bake", "d-maple-dijon-trout": "trout american roast",
 "d-sardine-pasta": "sardine italian skillet", "d-chicken-fajitas": "chicken mexican sheetpan", "d-chicken-stir-fry": "chicken asian skillet",
 "d-slow-cooker-turkey-chili": "turkey mexican slow", "d-lemon-chicken-soup": "chicken mediterranean soup",
 "d-turkey-burgers": "turkey american bake", "d-yogurt-spiced-chicken": "chicken indian sheetpan",
 "d-chicken-marinara-penne": "chicken italian skillet", "d-beef-lentil-shepherds-pie": "beef european bake",
 "d-sirloin-kebabs": "beef mediterranean grill", "d-p-red-lentil-curry": "lentils indian soup", "d-p-tofu-broccoli-stir-fry": "tofu asian skillet",
 "d-p-burrito-bowls": "beans mexican roast", "d-p-tempeh-tacos": "tempeh mexican skillet", "d-p-lentil-bolognese": "lentils italian skillet",
 "d-p-moroccan-stew": "chickpeas african soup", "d-p-black-bean-burgers": "beans american bake", "d-p-sesame-noodle-bowls": "tofu asian bowl",
 "d-p-lentil-stuffed-peppers": "lentils mexican bake", "d-p-white-bean-shakshuka": "eggs mediterranean skillet",
 "d-p-egg-edamame-rice": "eggs asian skillet", "d-p-roasted-chickpea-bowls": "chickpeas mediterranean roast",
 "d-p-stuffed-sweet-potatoes": "lentils american roast", "d-p-yogurt-pasta-primavera": "chickpeas italian skillet",
 "d-p-cod-chickpea-stew": "cod mediterranean soup", "d-p-turkey-bean-chili": "turkey mexican soup",
 "l-chickpea-edamame-quinoa-bowl": "chickpeas mediterranean bowl", "l-lemony-lentil-white-bean-soup": "lentils mediterranean soup",
 "l-tuna-white-bean-salad": "tuna mediterranean bowl", "l-chicken-white-bean-wraps": "chicken american bowl",
 "l-rainbow-pasta-salad": "chickpeas italian bowl", "l-turkey-veggie-meatballs": "turkey italian bake",
 "l-tofu-broccoli-rice-bowl": "tofu asian bake", "d-lentil-bolognese": "beef italian skillet",
 "d-shrimp-tacos-slaw-black-beans": "shrimp mexican bake", "d-whole-wheat-pizza-night": "chicken italian bake",
 "d-rotisserie-chicken-roasted-vegetables": "chicken american roast", "d-sheet-pan-chicken-chickpeas": "chicken mediterranean sheetpan",
 "d-lemon-garlic-cod-brown-rice": "cod american bake", "d-salmon-patties": "salmon american bake",
 "d-chicken-burrito-bowls": "chicken mexican skillet", "d-chicken-wild-rice-hotdish": "chicken american bake",
 "d-white-bean-minestrone": "beans italian soup", "d-salmon-quinoa-bowls": "salmon mediterranean bowl",
 "d-shrimp-broccoli-stir-fry": "shrimp asian skillet", "d-blackened-shrimp-salsa": "shrimp southern skillet",
 "d-cookout-burgers": "beef american grill", "d-white-chicken-chili": "chicken mexican soup", "d-beef-black-bean-tacos": "beef mexican skillet",
 "d-sheet-pan-salmon-sweet-potatoes": "salmon american sheetpan", "d-chicken-barley-vegetable-soup": "chicken american soup",
 "d-pecan-crusted-cod": "cod southern bake", "d-breakfast-for-dinner": "eggs american skillet", "d-pork-carnitas-bowls": "pork mexican slow",
 "l-bento-box": "chicken american bowl", "l-chicken-hummus-pinwheels": "chicken mediterranean bowl",
 "l-mason-jar-chopped-salad": "chickpeas mediterranean bowl", "l-mujaddara": "lentils mediterranean skillet",
 "l-tabbouleh-bowls": "chickpeas mediterranean bowl", "d-misir-wat": "lentils african soup", "d-three-sisters-stew": "beans american soup",
 "d-split-pea-soup": "lentils american soup", "d-pasta-e-fagioli": "beans italian soup", "d-lemongrass-ginger-chicken-soup": "chicken asian soup",
 "d-oven-baked-walleye": "cod american bake", "d-chana-masala": "chickpeas indian skillet", "d-chicken-tinga-tacos": "chicken mexican slow",
 "d-sheet-pan-chicken-shawarma": "chicken mediterranean sheetpan", "d-arroz-con-pollo": "chicken latin skillet",
 "d-unstuffed-cabbage-roll-skillet": "turkey european skillet", "d-jerk-chicken-black-beans": "chicken latin bake",
 "d-bibimbap-bowls": "tofu asian bowl", "d-garlic-shrimp-zucchini-spaghetti": "shrimp italian skillet",
 "d-slow-cooker-pulled-chicken": "chicken american slow", "d-turkey-black-bean-enchilada-bake": "turkey mexican bake",
 "d-lentil-sloppy-joes": "lentils american skillet", "d-italian-wedding-soup": "turkey italian soup", "d-black-bean-soup": "beans latin soup",
 "d-west-african-peanut-stew": "chicken african soup", "d-shrimp-coconut-curry": "shrimp asian skillet",
 "d-mediterranean-baked-cod": "cod mediterranean bake", "d-slow-cooker-beef-barley-stew": "beef american slow",
 "d-sheet-pan-chicken-apples-brussels": "chicken american sheetpan", "d-lemon-garlic-chicken-quinoa": "chicken american skillet",
 "d-chicken-pot-pie": "chicken american bake", "d-chicken-suqaar": "chicken african skillet", "d-chicken-larb": "chicken asian skillet",
 "l-banh-mi-bowls": "chicken asian bowl", "l-egg-salad-sandwiches": "eggs american bowl", "l-black-bean-quesadillas": "beans mexican skillet",
 "l-salmon-onigiri": "salmon asian bowl", "d-chicken-tortilla-soup": "chicken mexican soup", "d-beet-cabbage-borscht": "beef european soup",
 "d-chicken-adobo": "chicken asian slow", "d-minnesota-hotdish": "beef american bake", "d-swedish-turkey-meatballs": "turkey european skillet",
 "d-shrimp-and-grits": "shrimp southern skillet", "d-jollof-rice-chicken": "chicken african skillet", "d-cod-piccata": "cod italian skillet",
 "d-brazilian-moqueca": "cod latin soup", "d-kung-pao-tofu": "tofu asian skillet", "l-chicken-noodle-soup": "chicken american soup",
 "l-smashed-chickpea-sandwiches": "chickpeas american bowl", "l-baked-chicken-taquitos": "chicken mexican bake",
 "l-chicken-cobb-salad": "chicken american bowl", "l-rajma": "beans indian soup", "l-egg-roll-bowls": "turkey asian skillet",
 "l-butternut-red-lentil-soup": "lentils american soup", "l-goi-ga": "chicken asian bowl", "d-walleye-wild-rice-chowder": "cod american soup",
 "d-hot-sour-soup": "tofu asian soup", "d-chicken-tikka-masala": "chicken indian skillet", "d-chicken-paprikash": "chicken european skillet",
 "d-lomo-saltado": "beef latin skillet"
};
const GUIDE = {
 "a-mon": "turkey mexican slow", "a-tue": "salmon american sheetpan", "a-wed": "beef italian skillet", "a-thu": "mixed none bowl",
 "a-fri": "shrimp mexican bake", "a-sat": "dairy italian bake", "a-sun": "chicken american roast", "b-mon": "chicken mediterranean sheetpan",
 "b-tue": "cod american bake", "b-wed": "beef european bake", "b-thu": "mixed none bowl", "b-fri": "salmon american bake",
 "b-sat": "chicken mexican skillet", "b-sun": "chicken american bake", "c-mon": "beans italian soup", "c-tue": "salmon mediterranean bowl",
 "c-wed": "shrimp asian skillet", "c-thu": "mixed none bowl", "c-fri": "shrimp southern skillet", "c-sat": "beef american grill",
 "c-sun": "chicken mexican soup", "d-mon": "beef mexican skillet", "d-tue": "salmon american sheetpan", "d-wed": "chicken american soup",
 "d-thu": "mixed none bowl", "d-fri": "cod southern bake", "d-sat": "eggs american skillet", "d-sun": "pork mexican slow"
};
// The Grounded Nutritional Standards, per serving (the cookbook lines).
const STD = {meal: {sf: 4, sug: 6, na: 600}, snack: {sf: 2, sug: 4, na: 250}};
const NEUTRAL_P = new Set(['mixed', 'none', '']), NEUTRAL_C = new Set(['american', 'none', '']);
const arr = x => Array.isArray(x) ? x : [];
const split = s => { const [p, c, m] = String(s || '').split(' '); return {p: p || 'mixed', c: c || 'american', m: m || 'skillet'}; };
const P_RE = [['salmon', /\bsalmon\b/i], ['trout', /\btrout\b/i], ['tuna', /\btuna\b/i], ['sardine', /\bsardines?\b/i], ['shrimp', /\b(shrimp|prawns?)\b/i],
  ['cod', /\b(cod|walleye|halibut|tilapia|pollock|haddock|white ?fish|fish)\b/i], ['chicken', /\bchicken\b/i], ['turkey', /\bturkey\b/i],
  ['beef', /\b(beef|sirloin|steak|bison)\b/i], ['pork', /\b(pork|carnitas|ham)\b/i], ['lamb', /\blamb\b/i], ['tofu', /\btofu\b/i], ['tempeh', /\btempeh\b/i],
  ['lentils', /\b(lentils?|split peas?|dal)\b/i], ['chickpeas', /\b(chickpeas?|garbanzos?|hummus|falafel)\b/i], ['beans', /\bbeans?\b/i], ['eggs', /\beggs?\b/i]];
const C_RE = [['mexican', /\b(tacos?|burritos?|fajitas?|enchiladas?|quesadillas?|tinga|carnitas|chili|salsa|mexican|tortilla soup|taquitos?|tex.mex)\b/i],
  ['italian', /\b(pasta|penne|spaghetti|lasagna|pizza|italian|marinara|minestrone|risotto|orzo|bolognese|piccata|fagioli|parmesan crusted)\b/i],
  ['indian', /\b(tikka|masala|dal|chana|rajma|biryani|tandoori|korma|saag)\b/i],
  ['asian', /\b(stir fry|teriyaki|sesame|thai|bibimbap|banh mi|pho|ramen|kung pao|adobo|larb|onigiri|miso|lo mein|fried rice|hot and sour|egg roll|ginger)\b/i],
  ['mediterranean', /\b(greek|shawarma|falafel|hummus|tabbouleh|tzatziki|mediterranean|mujaddara|kebabs?|shakshuka|lemon herb)\b/i],
  ['african', /\b(moroccan|ethiopian|misir|west african|jollof|suqaar|tagine)\b/i],
  ['latin', /\b(jerk|cuban|arroz|moqueca|lomo|caribbean|brazilian|peruvian|plantains?)\b/i],
  ['southern', /\b(grits|blackened|cajun|gumbo|jambalaya|pecan crusted)\b/i],
  ['european', /\b(borscht|paprikash|swedish|schnitzel|pierogi|goulash|shepherd'?s pie)\b/i]];
const M_RE = [['sheetpan', /\bsheet pan\b/i], ['slow', /\b(slow cooker|instant pot|braised?)\b/i], ['soup', /\b(soup|stew|chili|chowder|borscht)\b/i],
  ['grill', /\b(grill(ed)?|kebabs?|burgers?|cookout)\b/i], ['bowl', /\b(bowls?|salad|wraps?|sandwich(es)?|pinwheels|bento)\b/i],
  ['bake', /\b(bake[ds]?|casserole|hotdish|pie|patties|cakes|pizza)\b/i], ['roast', /\broast(ed)?\b/i], ['skillet', /\b(stir fry|skillet|saute|seared?)\b/i]];
const PROT_OF = {fish: 'cod', poultry: 'chicken', redmeat: 'beef', beans: 'beans', lentils: 'lentils', tofu: 'tofu', eggs: 'eggs', yogurt: 'dairy', mixed: 'mixed'};
function readName(name, ing, protein){
  const n = String(name || ''), all = n + ' \n ' + arr(ing).join(' \n ');
  const p = (P_RE.find(([, re]) => re.test(n)) || P_RE.find(([, re]) => re.test(all)) || [PROT_OF[protein] || 'mixed'])[0];
  const c = (C_RE.find(([, re]) => re.test(n)) || ['american'])[0];
  const m = (M_RE.find(([, re]) => re.test(n)) || M_RE.find(([, re]) => re.test(all)) || ['skillet'])[0];
  return {p, c, m};
}
function tagOf(r){
  if (!r) return {p: 'mixed', c: 'none', m: 'bowl'};
  if (r.leftover || r.id === 'leftovers') return {p: 'mixed', c: 'none', m: 'bowl', left: true};
  if (r.id && REC[r.id]) return split(REC[r.id]);
  if (r.id && GUIDE[r.id]) return split(GUIDE[r.id]);
  if (r.plan && GUIDE[r.plan]) return split(GUIDE[r.plan]);
  if (/use.it.up/i.test(r.name || '')) return {p: 'mixed', c: 'none', m: 'bowl'};
  return readName(r.name, r.ingredients, r.protein);
}
// A Guide plan lunch idea has no id: read it from its name (and the dinner leftovers lunch carries the dinner before it).
const LUNCH_RE = [[/leftover/i, 'left'], [/salmon/i, 'salmon'], [/tuna/i, 'tuna'], [/chili|bean bowl/i, 'beans'], [/grain bowl/i, 'chicken'], [/chicken/i, 'chicken'],
  [/soup/i, 'chicken'], [/pasta salad/i, 'chickpeas'], [/egg/i, 'eggs'], [/peanut|almond/i, 'nuts'], [/snack.plate|big salad/i, 'mixed']];
function lunchTag(x){
  if (!x) return {p: 'mixed', c: 'none', m: 'bowl'};
  if (x.id && (REC[x.id] || GUIDE[x.id])) return tagOf(x);
  const n = String(x.name || ''), hit = LUNCH_RE.find(([re]) => re.test(n));
  if (hit && hit[1] === 'left') return {p: 'mixed', c: 'none', m: 'bowl', left: true};
  return hit ? {p: hit[1], c: 'american', m: 'bowl'} : readName(n, [x.how || ''], x.protein);
}
function meets(x, kind){
  const n = x && x.nut, L = STD[kind === 'snack' ? 'snack' : 'meal'];
  if (!n || typeof n !== 'object' || n.sf == null) return false;
  return +n.sf <= L.sf && (+n.sug || 0) <= L.sug && (n.na == null || +n.na <= L.na);
}
const sameP = (a, b) => !!(a && b && a.p && a.p === b.p && !NEUTRAL_P.has(a.p));
const sameC = (a, b) => !!(a && b && a.c && a.c === b.c && !NEUTRAL_C.has(a.c));
// A lunch for a day, against that day's dinner, the day before (its lunch and dinner), and the day after (its dinner).
// strict false keeps only the same day rule and the lunch before (the fallback when a short list leaves no lunch).
function ok(prev, cur, next, lunch, strict){
  prev = prev || {}; cur = cur || {}; next = next || {};
  if (!lunch) return true;
  if (sameP(lunch, cur.dinner)) return false;
  if (sameP(lunch, prev.lunch)) return false;
  if (strict === false) return true;
  if (!lunch.left && sameP(lunch, prev.dinner)) return false;
  if (sameP(lunch, next.dinner)) return false;
  return true;
}
function clashes(days){
  const out = [], D = arr(days);
  D.forEach((d, i) => {
    const a = D[i - 1], L = d.lunch, N = d.dinner, at = d.date || i;
    if (L && N && sameP(L, N)) out.push({at, rule: 'lunch and dinner share ' + L.p});
    if (!a) return;
    if (sameP(a.dinner, N)) out.push({at, rule: 'dinner ' + N.p + ' two days running'});
    if (sameC(a.dinner, N)) out.push({at, rule: 'dinner style ' + N.c + ' two days running'});
    if (L && sameP(a.lunch, L)) out.push({at, rule: 'lunch ' + L.p + ' two days running'});
    if (L && !L.left && sameP(a.dinner, L)) out.push({at, rule: 'lunch ' + L.p + ' after a ' + L.p + ' dinner'});
    if (a.lunch && sameP(a.lunch, N)) out.push({at, rule: 'dinner ' + N.p + ' after a ' + N.p + ' lunch'});
  });
  return out;
}
// The lunch for a day: the planned one (i0, the weekday's place in the list) when it keeps every rule, else the next one in
// the list that does, else the next that keeps the same day rule. tags: each lunch's tag; ctx: {prev, cur, next} as in ok().
function pickLunch(tags, i0, ctx){
  const L = arr(tags), n = L.length; if (!n) return -1; ctx = ctx || {}; i0 = ((+i0 || 0) % n + n) % n;
  const lt = i => L[i] && L[i].left && ctx.prev && ctx.prev.dinner ? Object.assign({}, ctx.prev.dinner, {left: true}) : L[i];
  for (const strict of [true, false]) for (let k = 0; k < n; k++){ const i = (i0 + k) % n; if (ok(ctx.prev, ctx.cur, ctx.next, lt(i), strict)) return i; }
  return i0;
}
// A week's spread: how many proteins, styles, and methods its cooked dinners hold.
function spread(tags){ const T = arr(tags).filter(t => t && !NEUTRAL_P.has(t.p)), u = k => new Set(T.map(t => t[k])).size; return {n: T.length, p: u('p'), c: new Set(T.map(t => t.c).filter(c => !NEUTRAL_C.has(c))).size + (T.some(t => t.c === 'american') ? 1 : 0), m: u('m')}; }
const API = {v: 1, REC, GUIDE, STD, tagOf, lunchTag, meets, ok, pickLunch, clashes, spread, sameP, sameC, readName};
if (typeof module === 'object' && module.exports) module.exports = API;
if (root) root.GGMealTags = API;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null));
