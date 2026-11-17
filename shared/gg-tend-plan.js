// =====================================================================
// GROUNDED . TENDING PLANNER (GWG BLD 866): the food plan, the shopping list, the workouts, and the targets for public Tending.
// (c) 2026 Grow With Grounded LLC.
// Pure functions with no page and no storage: the same code runs in the browser (window.GGTendPlan) and in Node (require).
// Every choice is steady for the same inputs (a seeded order), so a plan stays put until the person asks for a new one.
//
//   needOk(recipe, need), fitsAll(recipe, set)      food needs and typed allergies
//   planWeeks(recipes, set) -> {weeks: {A..D: {dinners: [dinner items]}}, ids: {A..D: [ids by day]}, stats: {A..D}}
//       set: {needs: [], allergies: 'sesame, shrimp', goals: [], kids: true, seed: 1, leftovers: true}
//       Weekly rules (the Grounded Nutritional Standards): fish dinners 2 or more, red meat 1 at most, no repeats in a week,
//       every dinner used before one comes back, four rotating weeks, seven dinners a week (Saturday a Leftovers Night
//       unless leftovers is false; Sunday a cook-once night that makes extra).
//   weeksFromIds(recipes, ids)                      the same weeks from saved ids (what Tending stores)
//   planMeals(recipes, set) -> {breakfasts: [ids], lunches: [ids], snacks: [ids]}
//   planDay(recipes, set, dayIndex) -> {breakfast, lunch, snack} recipes for one day (a steady rotation)
//   swapDinner(recipes, set, ids, wk, day, n)       a new ids object with one dinner swapped, rules kept
//   swapMeal(recipes, set, list, type, i, n)        a new id list with one breakfast, lunch, or snack swapped
//   shopList(weeks, week, extras) -> [{name, amt, sec, for}]   ingredients merged by name, grouped by section
//   buildSessions(moves, templates, opts) -> {sessions: {A..D}, warmup, cooldown}
//       opts: {level: 'root'|'rise'|'thrive', place: 'home'|'light'|'gym', mins: 20|40|60, warmup: [], cooldown: []}
//       Sessions use the Field Guide item shape the player already plays; rests never over 60 seconds; the time estimate is
//       the same honest clock as field-guide/health.js (planSecs), fitted close to the chosen minutes.
//   estimate(session, warmup, cooldown, phase, light)  seconds, the player's own model
//   targets(goalIds, goals, {weightKg, teen})       the strictest of each target across the chosen goals
//   kidAims(band, sex)                              a child's daily aims from an age band (no weight, no calories)
//   ldlRange(base, levers, picks, opts)             the LDL Path range for the levers a person chose
// =====================================================================
(function(root){
'use strict';
const arr = x => Array.isArray(x) ? x : [];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WEEKS = ['A', 'B', 'C', 'D'];

// ---------- a seeded order ----------
function rng(seed){ let s = (Math.abs(Math.floor(+seed || 1)) % 2147483646) + 1; return () => { s = s * 16807 % 2147483647; return (s - 1) / 2147483646; }; }
function shuffle(list, rand){ const a = list.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

// ---------- food needs and allergies ----------
const FISH_RE = /\b(fish|salmon|tuna|cod|halibut|tilapia|trout|sardines?|anchov(y|ies)|mackerel|shrimp|prawns?|scallops?|crab|lobster|clams?|mussels?|oysters?|pollock|haddock|catfish|mahi)\b/i;
const EGG_RE = /\beggs?\b|\bmayonnaise\b|\bmayo\b/i;
const MEAT_RE = /\b(chicken|turkey|beef|pork|lamb|bison|venison|steak|sirloin)\b/i;
// Common allergy words cover their family: shellfish covers shrimp, and so on.
const ALLERGY = {
  shellfish: /\b(shrimp|prawns?|crab|lobster|scallops?|clams?|mussels?|oysters?|shellfish)\b/i,
  'tree nut': /\b(almonds?|walnuts?|pecans?|cashews?|pistachios?|hazelnuts?|macadamias?|brazil nuts?|pine nuts?)\b/i,
  nut: /\b(almonds?|walnuts?|pecans?|cashews?|pistachios?|hazelnuts?|macadamias?|peanuts?|pine nuts?|nut butter)\b/i,
  peanut: /\bpeanuts?\b/i, sesame: /\b(sesame|tahini)\b/i, soy: /\b(soy|tofu|edamame|tempeh|miso|tamari)\b/i,
  dairy: /\b(milk|cheese|yogurt|parmesan|feta|ricotta|kefir|whey)\b/i, milk: /\b(milk|cheese|yogurt|parmesan|feta|ricotta|kefir|whey)\b/i,
  gluten: /\b(wheat|barley|rye|farro|bulgur|couscous|pasta|bread|tortillas?|pita|flour|panko)\b/i, wheat: /\b(wheat|farro|bulgur|couscous|pasta|bread|tortillas?|pita|flour|panko)\b/i,
  egg: EGG_RE, fish: FISH_RE
};
const recText = r => [r.name].concat(arr(r.ingredients), arr(r.shop).map(s => s && s.name)).join(' \n ');
function needOk(r, need){
  const f = arr(r.fits);
  if (f.includes(need)) return true;
  if (need === 'vegetarian') return f.includes('vegan');
  if (need === 'fishFree') return r.protein !== 'fish' && !FISH_RE.test(recText(r));
  if (need === 'eggFree') return r.protein !== 'eggs' && !EGG_RE.test(recText(r));
  return false;
}
function allergyWords(a){ return (Array.isArray(a) ? a : String(a || '').split(/[,;\n]+/)).map(x => String(x).trim().toLowerCase()).filter(x => x.length > 1); }
function allergyOk(r, words){
  const t = recText(r).toLowerCase();
  return words.every(w => {
    const key = w.replace(/\s*allerg(y|ies)\s*/g, '').replace(/s$/, '').trim(); if (!key) return true;
    if (ALLERGY[key] && ALLERGY[key].test(t)) return false;
    const esc = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return !new RegExp('\\b' + esc + '(e?s)?\\b', 'i').test(t);
  });
}
function fitsAll(r, set){ set = set || {}; return arr(set.needs).every(n => needOk(r, n)) && allergyOk(r, allergyWords(set.allergies)); }
const goalScore = (r, set) => arr(r.goals).filter(g => arr(set.goals).includes(g)).length * 2 + (set.kids && arr(r.fits).includes('kidFriendly') ? 1 : 0);
// The pool for a meal: what fits, the best match for the person's goals first, a steady shuffle inside each score.
function pool(recipes, set, meal){
  const rand = rng((+set.seed || 1) * 31 + meal.length);
  const ok = shuffle(arr(recipes).filter(r => r && r.id && r.meal === meal && fitsAll(r, set)), rand);
  const out = ok.map((r, i) => ({r, s: goalScore(r, set), i})).sort((a, b) => b.s - a.s || a.i - b.i).map(x => x.r);
  // BLD 1016: every meal a plan picks meets the Grounded Standards (saturated fat, added sugar, sodium per serving). The rest
  // wait at the end, used only when food needs leave too few to fill a week.
  const T = MT(); if (!T) return out; const kind = meal === 'snack' ? 'snack' : 'meal', yes = out.filter(r => T.meets(r, kind));
  return yes.length >= (MIN_POOL[meal] || 1) ? yes : yes.concat(out.filter(r => !T.meets(r, kind)));
}
// ---------- BLD 1016: variety (shared/gg-meal-tags.js, GGMealTags) ----------
// Chris, November 17, 2026: "make sure we do not have similar meals like this, salmon back to back, or mexican style dinners
// two nights in a row". A meal's tag is {p: main protein, c: cuisine style, m: method}.
let MTX = null;
function MT(){ if (root && root.GGMealTags) return root.GGMealTags; if (MTX === null){ MTX = false; try { if (typeof require === 'function') MTX = require('./gg-meal-tags.js'); } catch(e){ MTX = false; } } return MTX || null; }
const MIN_POOL = {dinner: 10, lunch: 4, breakfast: 4, snack: 5};
const tg = r => { const T = MT(); return T ? T.tagOf(r) : {p: (r && r.protein) || 'mixed', c: 'american', m: 'skillet'}; };
// The cost of a run of dinners in date order: the same protein or the same style on back to back nights, and fish two nights running.
function runCost(list){ const T = MT(); let c = 0; for (let i = 1; i < list.length; i++){ const a = list[i - 1], b = list[i]; if (!a || !b) continue;
  const x = tg(a), y = tg(b); if (T ? T.sameP(x, y) : x.p === y.p) c += 10; if (T && T.sameC(x, y)) c += 10; if (isFish(a) && isFish(b)) c += 1; } return c; }
function perms(a){ if (a.length <= 1) return [a.slice()]; const out = []; a.forEach((x, i) => perms(a.slice(0, i).concat(a.slice(i + 1))).forEach(p => out.push([x].concat(p)))); return out; }

// ---------- dinners ----------
const isFish = r => r && r.protein === 'fish';
const isRed = r => r && r.protein === 'redmeat';
const LEFT = {id: 'leftovers', name: 'Leftovers Night', meal: 'dinner', leftover: true, mins: 15, active: 15, protein: 'mixed',
  ingredients: [], serve: 'Set out the week\'s leftovers with a big bowl of raw vegetables or a quick salad, so half the plate stays vegetables.',
  steps: [{t: 'Take out the lidded containers from this week, and check that each is within 3 to 4 days.', min: 0},
    {t: 'Warm each one until it steams, 165 F in the center, about 2 to 3 minutes in the microwave or 10 minutes in a covered skillet.', min: 0},
    {t: 'Fill half of each plate with vegetables or fruit, then add the leftovers.', min: 0}],
  tip: 'A Leftovers Night keeps the week simple and lets nothing go to waste.', keeps: 'Leftovers keep 3 to 4 days in the fridge in lidded containers.'};
function dinnerItem(r, day){
  if (!r) return null;
  if (r.leftover) return Object.assign({}, r, {day});
  const nut = r.nut && typeof r.nut === 'object' ? Object.assign({per: '1 serving'}, r.nut) : null;
  return {id: r.id, day, name: r.name, mins: r.mins, active: r.active, serves: r.serves, protein: r.protein, fits: arr(r.fits), goals: arr(r.goals),
    nut, ingredients: arr(r.ingredients), steps: arr(r.steps), serve: r.serve || '', tip: r.tip || '', keeps: r.keeps || '', kid: r.kid || '',
    swaps: r.swaps || null, shop: r.shop || null, cost: r.cost != null ? r.cost : undefined, batch: day === 'Sun' ? true : undefined};
}
// Order a week's cooked dinners: quickest on weeknights, the longest cook on Sunday, fish apart, no protein two nights running.
function arrange(list, days, edge){
  const sun = days.includes('Sun') ? list.slice().sort((a, b) => (+b.mins || 0) - (+a.mins || 0) || (+b.serves || 0) - (+a.serves || 0))[0] : null;
  let rest = list.filter(r => r !== sun), out = [];
  const wd = days.filter(d => d !== 'Sun');
  for (let i = 0; i < wd.length; i++){
    const prev = out[out.length - 1];
    const pick = rest.find(r => !prev || r.protein !== prev.protein) || rest[0];
    out.push(pick); rest = rest.filter(r => r !== pick);
  }
  // Fish apart: if two fish dinners sit next to each other, move one later when a spot allows.
  for (let i = 1; i < out.length; i++) if (isFish(out[i]) && isFish(out[i - 1])){ const j = out.findIndex((r, k) => k > i + 1 && !isFish(r) && !isFish(out[k - 1]) && !(out[k + 1] && isFish(out[k + 1]))); if (j > 0){ [out[i], out[j]] = [out[j], out[i]]; } }
  // BLD 1016: the nights in date order are the week before's last dinner, Sunday, then Monday on (a Leftovers Night is neutral).
  // When that order puts one protein or one style on back to back nights, the weeknights take the order with the fewest.
  edge = edge || {}; const seq = o => [edge.before || null, sun].concat(o, wd.length < 6 ? [LEFT] : [], [edge.after || null]).filter(x => x !== undefined);
  if (out.length > 1 && runCost(seq(out)) >= 10){ let best = out, bc = runCost(seq(out)); for (const p of perms(out)){ const c = runCost(seq(p)); if (c < bc){ best = p; bc = c; if (!c) break; } } out = best; }
  const map = {}; wd.forEach((d, i) => { map[d] = out[i]; }); if (sun) map.Sun = sun; return map;
}
function planWeeks(recipes, set){
  set = Object.assign({needs: [], goals: [], allergies: '', seed: 1, leftovers: true}, set || {});
  const P = pool(recipes, set, 'dinner'), fishP = P.filter(isFish), otherP = P.filter(r => !isFish(r));
  const ids = {}, stats = {}, lists = {};
  const cookDays = set.leftovers === false ? DAYS.slice() : DAYS.filter(d => d !== 'Sat');
  const need = cookDays.length;
  let fq = 0, oq = 0;
  // Fish fills two nights first (or more when the pool is mostly fish); then the rest rotates through every other dinner.
  WEEKS.forEach(w => {
    const week = [], has = r => week.some(x => x.id === r.id);
    const fishWant = fishP.length ? Math.min(need, Math.max(2, Math.round(need * fishP.length / Math.max(1, P.length)))) : 0;
    for (let k = 0, guard = 0; week.filter(isFish).length < Math.min(fishWant, 2) && guard < fishP.length * 3 + 2; guard++, k++){
      const r = fishP[fq++ % fishP.length]; if (!has(r) || fishP.length < 2) week.push(r); }
    for (let guard = 0; week.length < need && guard < otherP.length * 3 + 4; guard++){
      if (!otherP.length) break;
      const r = otherP[oq++ % otherP.length];
      if (has(r) && otherP.length + fishP.length >= need) continue;
      if (isRed(r) && week.some(isRed)) continue;
      // BLD 1016: a week holds each protein twice at most and each style twice at most, while the pool allows it.
      if (guard < otherP.length * 2 && crowd(week, r, guard < otherP.length)) continue;
      week.push(r);
    }
    // A small pool: fill with more fish, then allow repeats (never a second red meat).
    for (let guard = 0; week.length < need && guard < 40 && P.length; guard++){ const r = P[(fq + oq + guard) % P.length]; if (isRed(r) && week.some(isRed)) continue; if (has(r) && P.filter(x => !(isRed(x) && week.some(isRed))).some(x => !has(x))) continue; week.push(r); }
    lists[w] = week;
  });
  // BLD 1016: each week's Sunday is its longest cook; the weeks are then arranged in date order, each one knowing the night
  // before it (last week's Saturday) and the night after it (next week's Sunday, Week A's after Week D).
  const m = byId(recipes), suns = {}; WEEKS.forEach(w => { suns[w] = cookDays.includes('Sun') ? lists[w].slice().sort((a, b) => (+b.mins || 0) - (+a.mins || 0) || (+b.serves || 0) - (+a.serves || 0))[0] : null; });
  WEEKS.forEach((w, k) => {
    const prevW = WEEKS[k - 1], before = prevW && ids[prevW] ? m[ids[prevW][5]] : null, after = suns[WEEKS[(k + 1) % 4]];
    const map = arrange(lists[w], cookDays, {before, after});
    ids[w] = DAYS.map(d => map[d] ? map[d].id : (d === 'Sat' && set.leftovers !== false ? 'leftovers' : ''));
  });
  const weeks = weeksFromIds(recipes, ids);
  WEEKS.forEach(w => { stats[w] = weekStats(weeks[w].dinners); });
  return {weeks, ids, stats};
}
// A week already holds this protein (twice, once the pool runs thin), this style twice (American home cooking is a neutral style), or this method twice.
function crowd(week, r, tight){ const t = tg(r), T = MT(), n = k => week.filter(x => tg(x)[k] === t[k]).length; return n('p') >= (tight ? 1 : 2) || (!!T && T.sameC(t, t) && n('c') >= 2) || (t.c === 'american' && n('c') >= 3) || n('m') >= 2; }
function weekStats(dinners){
  const cooked = arr(dinners).filter(x => x && !x.leftover);
  const costs = cooked.map(x => x.cost).filter(x => x != null && isFinite(+x));
  return {fish: cooked.filter(isFish).length, red: cooked.filter(isRed).length, mins: cooked.reduce((a, x) => a + (+x.mins || 0), 0),
    active: cooked.reduce((a, x) => a + (+x.active || +x.mins || 0), 0), cost: costs.length === cooked.length && cooked.length ? Math.round(costs.reduce((a, b) => a + +b, 0) * 100) / 100 : null, nights: arr(dinners).length};
}
function byId(recipes){ const m = {}; arr(recipes).forEach(r => { if (r && r.id) m[r.id] = r; }); m.leftovers = LEFT; return m; }
function weeksFromIds(recipes, ids){
  const m = byId(recipes), out = {};
  WEEKS.forEach(w => { out[w] = {dinners: arr(ids && ids[w]).map((id, i) => dinnerItem(m[id], DAYS[i])).filter(Boolean)}; });
  return out;
}
// Swap one dinner: the next dinner in the rotation that keeps fish at 2 or more and red meat at 1 at most.
function swapDinner(recipes, set, ids, wk, day, n){
  set = set || {}; const m = byId(recipes), list = arr(ids && ids[wk]).slice(), di = DAYS.indexOf(day); if (di < 0) return ids;
  const cur = m[list[di]], others = list.filter((x, i) => i !== di).map(x => m[x]).filter(Boolean);
  const fishLeft = others.filter(isFish).length, redLeft = others.filter(isRed).length;
  const P = pool(recipes, set, 'dinner').filter(r => !list.includes(r.id) && (!isRed(r) || redLeft < 1));
  const fishOk = P.some(isFish);
  const cands = fishLeft < 2 && fishOk ? P.filter(isFish) : P;
  if (!cands.length && !(cur && cur.leftover)) return ids;
  // BLD 1016: the swap keeps the nights around it varied (no protein or style shared with the night before or after).
  const order = [6, 0, 1, 2, 3, 4, 5], k = order.indexOf(di), nb = [order[k - 1], order[k + 1]].filter(x => x != null).map(x => m[list[x]]).filter(Boolean), T = MT();
  const fine = cands.filter(r => !nb.some(x => T ? T.sameP(tg(x), tg(r)) || T.sameC(tg(x), tg(r)) : x.protein === r.protein)), from = fine.length ? fine : cands;
  const pick = from.length ? from[Math.abs(+n || 0) % from.length] : null;
  if (!pick) return ids;
  list[di] = pick.id; return Object.assign({}, ids, {[wk]: list});
}

// ---------- breakfasts, lunches, snacks ----------
const MEALS = {breakfasts: 'breakfast', lunches: 'lunch', snacks: 'snack'}, MCOUNT = {breakfasts: 4, lunches: 5, snacks: 5}; // BLD 1016: five lunches, each its own protein, so every day has one that fits
// BLD 1016: the lunches each bring their own main protein, so a day's lunch can always step aside from the dinners around it.
function distinct(list, n){ const out = [], seen = new Set(); list.forEach(r => { if (out.length < n && !seen.has(tg(r).p)){ out.push(r); seen.add(tg(r).p); } }); list.forEach(r => { if (out.length < n && !out.includes(r)) out.push(r); }); return out; }
function planMeals(recipes, set){ set = set || {}; const out = {}; Object.keys(MEALS).forEach(k => { const P = pool(recipes, set, MEALS[k]); const L = k === 'lunches' ? lunchPool(recipes, set, P) : P; out[k] = (k === 'lunches' ? distinct(L, MCOUNT[k]) : P.slice(0, MCOUNT[k])).map(r => r.id); }); return out; }
// When food needs leave fewer than five lunch proteins, a dinner that brings a missing protein joins the lunches (it packs well).
function lunchPool(recipes, set, P){ const have = new Set(P.map(r => tg(r).p)); if (have.size >= MCOUNT.lunches) return P;
  const extra = pool(recipes, set, 'dinner').filter(r => { const p = tg(r).p; if (have.has(p)) return false; have.add(p); return true; }); return P.concat(extra); }
function planDay(recipes, set, dayIndex){
  const m = planMeals(recipes, set), b = byId(recipes), at = (list, k) => list.length ? b[list[((+dayIndex || 0) + k) % list.length]] : null;
  return {breakfast: at(m.breakfasts, 0), lunch: at(m.lunches, 1), snack: at(m.snacks, 2)};
}
function swapMeal(recipes, set, list, type, i, n){
  const meal = MEALS[type]; if (!meal) return arr(list); const L = arr(list).slice(), P = pool(recipes, set || {}, meal).filter(r => !L.includes(r.id));
  if (!P.length) return L; L[i] = P[Math.abs(+n || 0) % P.length].id; return L;
}

// ---------- the shopping list ----------
const SECTIONS = ['Produce', 'Proteins', 'Grains and Beans', 'Dairy and Eggs', 'Frozen', 'Pantry', 'Spices'];
const SEC_RE = [
  ['Frozen', /\bfrozen\b/i],
  ['Spices', /\b(salt|pepper|cumin|paprika|oregano|basil, dried|dried (basil|thyme|oregano|dill|rosemary)|thyme, dried|chili powder|chile powder|cinnamon|turmeric|coriander|curry powder|garam masala|nutmeg|ginger, ground|ground ginger|red pepper flakes|bay leaf|bay leaves|italian seasoning|smoked paprika|cayenne|seasoning|garlic powder|onion powder|za'atar|sumac|cloves, ground|allspice|cardamom|mustard seed|fennel seed|chili flakes)\b/i],
  ['Proteins', /\b(salmon|tuna|cod|halibut|tilapia|trout|sardines?|shrimp|fish|chicken|turkey|beef|sirloin|pork|tofu|tempeh|lamb|bison)\b/i],
  ['Dairy and Eggs', /\b(eggs?|milk|yogurt|cheese|parmesan|feta|ricotta|kefir|cottage)\b/i],
  ['Grains and Beans', /\b(rice|quinoa|oats|oatmeal|farro|barley|bulgur|couscous|pasta|spaghetti|penne|noodles|bread|tortillas?|pita|beans?|chickpeas|lentils|split peas|edamame|wheat|flour|crackers|cereal|granola)\b/i],
  ['Produce', /\b(lettuce|spinach|kale|arugula|greens|cabbage|broccoli|cauliflower|carrots?|celery|onions?|shallots?|garlic|ginger|peppers?|tomato(es)?|cucumbers?|zucchini|squash|potato(es)?|sweet potato(es)?|mushrooms?|green beans|asparagus|brussels|beets?|corn|peas|avocados?|lemons?|limes?|oranges?|apples?|bananas?|berries|blueberries|strawberries|raspberries|grapes|pears?|peaches|mango|pineapple|melon|cilantro|parsley|basil|dill|mint|thyme|rosemary|scallions?|green onions?|herbs|radish(es)?|jalape[nñ]os?|chiles?|fruit|vegetables|salad|clementines?|kiwi|cherries|dates|raisins)\b/i],
  ['Pantry', /./]
];
const secOf = name => (SEC_RE.find(([, re]) => re.test(name)) || ['Pantry'])[0];
const NUMW = {a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, twelve: 12, half: 0.5};
const UNIT_RE = '(?:(?:\\d+(?:\\.\\d+)?|\\d+/\\d+)\\s*(?:oz|ounce|ounces|lb|lbs|pound|pounds|g|quart|quarts?)\\s+)?(?:cans?|cups?|tbsp|tablespoons?|tsp|teaspoons?|lbs?|pounds?|oz|ounces?|g|grams?|cloves?|bunch(?:es)?|heads?|packages?|pkgs?|bags?|jars?|cartons?|pints?|quarts?|slices?|stalks?|sprigs?|handfuls?|pinch(?:es)?|dash(?:es)?|containers?|blocks?|fillets?|boxes?|bottles?|ears?|loaf|loaves|links?|pieces?|large|medium|small|whole)';
const AMT_RE = new RegExp('^((?:about\\s+)?(?:\\d+\\s+\\d+/\\d+|\\d+/\\d+|\\d+(?:\\.\\d+)?|a|an|one|two|three|four|five|six|seven|eight|nine|ten|twelve|half)(?:\\s*(?:to|or|-)\\s*(?:\\d+/\\d+|\\d+(?:\\.\\d+)?))?(?:\\s+' + UNIT_RE + '\\b\\.?(?:\\s+' + UNIT_RE + '\\b)?)?)\\s+(?:of\\s+)?(.+)$', 'i');
const toNum = s => { s = String(s).trim().toLowerCase(); if (NUMW[s] != null) return NUMW[s]; let m = /^(\d+)\s+(\d+)\/(\d+)$/.exec(s); if (m) return +m[1] + m[2] / m[3]; m = /^(\d+)\/(\d+)$/.exec(s); if (m) return m[1] / m[2]; return isFinite(+s) ? +s : null; };
const fmtN = n => { const w = Math.floor(n + 1e-9), f = n - w, fr = [[0.25, '1/4'], [1 / 3, '1/3'], [0.5, '1/2'], [2 / 3, '2/3'], [0.75, '3/4']].find(([v]) => Math.abs(f - v) < 0.04); return f < 0.04 ? String(w) : fr ? (w ? w + ' ' : '') + fr[1] : String(Math.round(n * 10) / 10); };
function parseIng(line){
  let t = String(line || '').replace(/\([^)]*\)/g, '').replace(/\s+/g, ' ').trim(); if (!t) return null;
  const m = AMT_RE.exec(t); let amt = '', name = t;
  if (m){ amt = m[1].trim(); name = m[2]; }
  name = name.split(/,| for | plus /)[0].replace(/^(?:of|fresh|plain)\s+/i, '').trim();
  if (!name) return null;
  const um = /^((?:about\s+)?\S+)\s*(.*)$/.exec(amt || ''), q = um ? toNum(um[1].replace(/^about\s+/i, '')) : null;
  return {name: name.replace(/^./, c => c.toUpperCase()), amt, q, unit: um ? um[2].toLowerCase().replace(/s$/, '') : ''};
}
const keyOf = n => String(n).toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean).map(w => w.length > 3 && /ies$/.test(w) ? w.slice(0, -3) + 'y' : w.length > 3 && /oes$/.test(w) ? w.slice(0, -2) : w.length > 3 && /[^s]s$/.test(w) ? w.slice(0, -1) : w).join(' ');
// weeks: the planWeeks weeks object (or one week's {dinners}); week: 'A' to 'D'; extras: more recipes (breakfasts, lunches, snacks) to add.
function shopList(weeks, week, extras){
  const w = weeks && weeks.dinners ? weeks : (weeks || {})[week] || {}, recs = arr(w.dinners).filter(x => x && !x.leftover).concat(arr(extras).filter(Boolean));
  const map = new Map();
  recs.forEach(r => {
    const lines = arr(r.shop).length ? arr(r.shop).map(s => ({name: s.name, amt: s.amt || '', sec: s.sec, q: null, unit: ''})) : arr(r.ingredients).map(parseIng).filter(Boolean);
    lines.forEach(x => {
      if (/^(water|ice|hot water|cold water)$/i.test(x.name)) return;
      const k = keyOf(x.name), sec = SECTIONS.includes(x.sec) ? x.sec : secOf(x.name), cur = map.get(k);
      if (!cur){ map.set(k, {name: x.name, amts: [x], sec, for: [r.name]}); return; }
      cur.amts.push(x); if (!cur.for.includes(r.name)) cur.for.push(r.name);
    });
  });
  const out = [];
  map.forEach(v => {
    const units = new Set(v.amts.map(a => a.unit)), allQ = v.amts.every(a => a.q != null);
    let amt;
    if (allQ && units.size === 1){ const u = [...units][0], tot = v.amts.reduce((s, a) => s + a.q, 0); amt = fmtN(tot) + (u ? ' ' + u + (tot > 1 && !/s$|oz|tbsp|tsp|lb|g$/.test(u) ? 's' : '') : ''); }
    else amt = v.amts.map(a => a.amt).filter(Boolean).join(' + ');
    out.push({name: v.name, amt, sec: v.sec, for: v.for.join(', ')});
  });
  return out.sort((a, b) => SECTIONS.indexOf(a.sec) - SECTIONS.indexOf(b.sec) || a.name.localeCompare(b.name));
}

// ---------- the honest clock, the same model as field-guide/health.js (planSecs and sessSecs) ----------
const lineSecs = t => 1.4 + String(t).split(/\s+/).length / 2.4;
const REPS_RE = /^\s*(\d+)(\s*to\s*\d+)?\s*(reps?|seconds?|per side|each side|total|each)?\s*$/i;
const repWords = st => !REPS_RE.test(String(st.reps));
const repTxt = st => String(st.reps).replace(/\s*(per side|each side)\s*$/i, '').trim();
const unitOf = st => repWords(st) ? '' : st.kind === 'time' ? ' seconds' : st.kind === 'distance' ? '' : (/total$/i.test(repTxt(st)) ? '' : ' reps');
const secsOf = st => parseInt(String(st.reps), 10) || 30;
// BLD 891: the same as field-guide/health.js: alternating moves (Dead Bug, Bird Dog, Plank Pull-Through, Seated Knee Lift) run as one
// flow and count both sides together; every rep runs at the move's tempo (seconds per rep), and reps written as words run about 8.
const ALT_IDS = ['m-dead-bug', 'm-bird-dog', 'm-plank-pull-through', 'g-seated-knee-lift'], ALT_RE = /^\s*(dead bugs?|bird dogs?|plank pull-throughs?|seated knee lifts?)\b/i;
const altMove = x => !!x && (x.alt === true || ALT_IDS.includes(x.id) || ALT_IDS.includes(x.move) || ALT_RE.test(x.name || ''));
const repN = st => { if (repWords(st)) return 0; const n = parseInt(String(st.reps), 10) * (st.alt && st.per && !/total/i.test(String(st.reps)) ? 2 : 1); return n > 0 && n <= 20 ? n : 0; };
const tempoOf = st => Math.max(1, +st.tempo || REP_SECS), WORD_REPS = 8;
const REST_MAX = 60, GET_READY = 30, SWITCH = 5, REP_SECS = 3, TAP_EST = 35;
const capRest = v => Math.max(0, Math.min(REST_MAX, Math.round(v)));
const halfSide = x => !altMove(x) && /per side|each side|switch sides/i.test((x.name || '') + ' ' + (x.how || ''));
const LN = {ses: (t, m) => t + '. About ' + m + ' minutes. We begin with the warm-up.', time: st => (st.name + '. ' + (st.how || '')).trim(),
  ex: st => st.name + '. ' + st.sets + ' set' + (st.sets === 1 ? '' : 's') + ' of ' + repTxt(st) + unitOf(st) + (st.side || st.per ? ' each side' : '') + '.', alt: 'Alternate sides, left then right, back and forth.',
  set: (n, m) => n === m ? 'Last set.' : 'Set ' + n + ' of ' + m + '.', go: 'Go.', next: n => 'Next up: ' + n + '.', cool: 'Cooldown time. Nice work.',
  out: 'That is the session. Strong work today.', left: 'Left side.', sw: 'Switch sides.'};
function steps(ses, warmup, cooldown, ph, light){
  const out = [];
  arr(warmup).forEach(x => out.push({t: 'time', name: x.name, how: x.how, secs: +x.secs || 45, part: 'Warm-up', half: halfSide(x)}));
  arr(ses.blocks).forEach(b => arr(b.items).forEach(x => { const sets = +((x.sets || {})[ph] || (x.sets || {})['1'] || 1), reps = String((x.reps || {})[ph] || (x.reps || {})['1'] || ''), per = !!x.side || /per side|each side/i.test(reps), alt = altMove(x);
    out.push({t: 'ex', name: x.name, cue: x.cue, sets: sets, reps, kind: x.kind || 'reps', part: b.title || 'Main', tempo: x.tempo,
      rest: capRest(+x.rest || REST_MAX), restAfter: x.restAfter != null ? capRest(+x.restAfter || 0) : REST_MAX, side: per && !alt, alt, per}); }));
  for (let i = out.length - 1; i >= 0; i--) if (out[i].t === 'ex'){ out[i].restAfter = 0; break; }
  arr(cooldown).forEach(x => out.push({t: 'time', name: x.name, how: x.how, secs: +x.secs || 45, part: 'Cooldown', half: halfSide(x)}));
  return out;
}
function planSecs(S){
  let s = 0;
  S.forEach((st, i) => { const nx = S[i + 1];
    if (st.t === 'time'){ s += st.secs + lineSecs(LN.time(st)) + (st.half ? lineSecs(LN.sw) : 0);
      if (st.part === 'Cooldown' && S[i - 1] && S[i - 1].part !== 'Cooldown') s += lineSecs(LN.cool);
      if (nx && nx.t === 'ex') s += GET_READY; return; }
    const left = Math.max(0, st.sets), sides = st.side ? 2 : 1, work = st.kind === 'time' ? secsOf(st) * (st.alt && st.per ? 2 : 1) : (repN(st) || WORD_REPS) * tempoOf(st);
    const perSet = lineSecs(LN.go) + sides * work + (st.side ? 2 * lineSecs(LN.left) + lineSecs(LN.sw) + SWITCH : 0) + (repN(st) || st.kind === 'time' ? 0 : 2);
    s += lineSecs(LN.ex(st)) + (st.alt ? lineSecs(LN.alt) : 0) + (st.cue ? lineSecs(st.cue) : 0) + left * perSet + Math.max(0, left - 1) * (st.rest + lineSecs(LN.set(2, 3)));
    if (nx && nx.t === 'ex') s += st.restAfter || lineSecs(LN.next(nx.name)); });
  return s;
}
// BLD 979 follow-up: the player hands the builder its own clock (field-guide/health.js builderClock, the model the engine
// plays), so a session is fitted to the chosen minutes by the time it really runs; the lighter weeks keep every set.
let CLOCK = null;
function setClock(fn){ CLOCK = typeof fn === 'function' ? fn : null; API.clock = CLOCK; }
function estimate(ses, warmup, cooldown, ph, light){
  return planSecs(steps(ses, warmup, cooldown, String(ph || '1'), !!light)) + lineSecs(LN.ses(ses.title || '', 50)) + lineSecs('') + lineSecs(LN.out) + lineSecs('');
}

// ---------- workouts ----------
// Follows the workshop's reference (patches/bld866/content/move.py build_session): moves come from templates.order[place][level][pattern]
// (the first not yet used in the session), the Main block from templates.slots[day] with sets held inside lengths[n].sets[level],
// then the finisher, cardio, and mobility blocks; warm-up and cooldown by id from lengths[n]. The player's own clock then
// trims or adds a set (or a finisher move) until the estimate lands close to the chosen minutes.
const FALL = {squat: ['lunge', 'hinge'], lunge: ['squat', 'balance'], hinge: ['squat', 'core'], push: ['core', 'carry'], pull: ['hinge', 'core'], core: ['balance', 'mobility'],
  carry: ['core', 'cardio'], cardio: ['lunge', 'core'], mobility: ['core', 'balance'], balance: ['core', 'mobility'], agility: ['cardio', 'balance']};
const LEVELS = ['root', 'rise', 'thrive'];
const placeOk = (m, place) => !arr(m.places).length || arr(m.places).includes(place);
function lv(m, level){ const L = m.levels || {}; return L[level] || L[LEVELS[Math.max(0, LEVELS.indexOf(level) - 1)]] || L.root || null; }
// BLD 892: the equipment checklist. Gear ids (nothing checked: body weight plus a chair, a wall, and a mat). A move lists the gear it
// needs (needs: [], or needsAny: [[...], [...]] when either set works). An old saved place maps forward: home to nothing,
// light to dumbbells and bands, gym to everything.
const GEAR = ['dumbbells', 'bands', 'bar', 'dip', 'step', 'bench', 'machines', 'cardio'];
const PLACE_GEAR = {home: [], light: ['dumbbells', 'bands'], gym: GEAR.slice()};
const gearPlace = g => { g = arr(g); return g.includes('machines') || g.includes('cardio') ? 'gym' : g.includes('dumbbells') || g.includes('bands') ? 'light' : 'home'; };
const hasNeeds = m => !!m && (Array.isArray(m.needs) || Array.isArray(m.needsAny));
function gearOk(m, gear){ const g = arr(gear), has = x => g.includes(x);
  if (Array.isArray(m.needsAny) && m.needsAny.length) return m.needsAny.some(l => arr(l).every(has));
  return arr(m.needs).every(has); }
// BLD 892: the 12-week program. Weeks 1 to 4 Foundation, 5 to 8 Build, 9 to 12 Peak (and Peak after 12, until the person starts again).
const PHASES = ['foundation', 'build', 'peak'], TRACKS = ['strength', 'cardio'];
const phaseOfWeek = w => { w = Math.max(1, Math.floor(+w || 1)); return w <= 4 ? 'foundation' : w <= 8 ? 'build' : 'peak'; };
// A Mixed week: which of the workout days (by position, 0 based) are cardio days, spread through the week; at least one strength day.
function cardioSlots(nDays, cardioDays){
  const n = Math.max(1, Math.floor(+nDays || 1)), c = Math.max(1, Math.min(n > 1 ? n - 1 : 1, Math.floor(+cardioDays || 1))), out = [];
  for (let j = 0; j < c; j++){ let k = Math.min(n - 1, Math.floor((j + 0.5) * n / c)); while (out.includes(k) && k < n - 1) k++; if (!out.includes(k)) out.push(k); }
  return out;
}
function itemFor(m, level, place, sets, rest, restAfter, prefix, work){
  const L = lv(m, level) || {}, time = m.kind === 'time' || (L.secs != null && L.reps == null);
  const secs = time && +work > 0 ? Math.round(+work) : +L.secs || 30;
  const reps = time ? String(secs) : String(L.reps || '10');
  const E = m.equip || {}, LA = m.loadAt || {}, alt = arr(m.places).find(p => p in E);
  const n = Math.max(1, Math.min(6, sets)), eq = (place in E ? E[place] : alt ? E[alt] : '') || '';
  const it = {id: (prefix ? prefix + '-' : '') + String(m.id).replace(/^m-/, ''), move: m.id, name: m.name, how: m.how || '', cue: m.cue || '', swap: m.swap || '', tips: arr(m.tips).filter(Boolean).slice(0, 2),
    sets: {'1': n, '2': n, '3': n}, reps: {'1': reps, '2': reps, '3': reps}, rest: capRest(rest), restAfter: capRest(restAfter), kind: time ? 'time' : 'reps',
    load: LA[place] || (alt && LA[alt]) || m.load || '', equip: eq, fig: m.fig || '', pattern: m.pattern};
  if (time) it.secs = secs;
  if (m.unilateral) it.side = true;
  // BLD 891: numbered steps, an easier and a harder version, and the move's tempo ride along to the player.
  if (arr(m.steps).length) it.steps = arr(m.steps).filter(Boolean);
  // BLD 896: the move's spoken form line and breath line ride along too (said after Go and on rep 1 of set 1).
  ['easier', 'harder', 'tempo', 'form', 'breath'].forEach(k => { if (m[k]) it[k] = m[k]; });
  if (m.alt === true) it.alt = true;
  return it;
}
// BLD 1018 (Chris, November 17, 2026: "You can raise foot too for difficulty", then "Go"): the side plank grows through the
// 12 weeks. Foundation keeps the Side Plank; Build plays Side Plank Thread the Needle (the top arm threads slowly under the
// body and back up through the whole hold); Peak plays the Star Side Plank (the top leg raised and held). Each keeps the side
// plank's levels, sets, and seconds, so the minutes stay the same.
const SP_MOVES = {
  build: {id: 'm-side-plank-thread', name: 'Side Plank Thread the Needle', fig: 'reach-through',
    how: 'In a forearm side plank, feet stacked and hips lifted, reach the top arm to the ceiling, then slowly thread it under your body and back up. Keep threading for the whole hold, then switch sides.',
    cue: 'Breathe out as you thread under, hips stay high.',
    tips: ['Hips stay lifted as you thread through.', 'Slow and smooth, eyes following your hand.'],
    swap: 'Easier: bottom knee down, or a still side plank. Shoulder: forearm on a cushion.',
    steps: ['Lie on your left side, left forearm on the floor, elbow under your shoulder, feet stacked.', 'Lift your hips into one long line and reach your right arm to the ceiling.',
      'Slowly thread your right hand under your body, turning your chest toward the floor.', 'Reach it back up to the ceiling. Keep threading, slow and smooth, for the whole hold, then switch to the right side.'],
    easier: 'Bottom knee down, or hold a still side plank.', harder: 'Pause for a breath each time you reach through.',
    form: 'Elbow under your shoulder, hips high, turn from your ribs.', breath: 'Breathe out as you thread under, breathe in as you reach up.'},
  peak: {id: 'm-star-side-plank', name: 'Star Side Plank', fig: 'star-side-plank',
    how: 'In a forearm side plank, feet stacked and hips lifted, raise the top leg and hold it there, top arm reaching to the ceiling. Hold, then switch sides.',
    cue: 'Keep the breath moving, top leg long and steady.',
    tips: ['Hips stay lifted, body in one long line.', 'Lift the top leg only as high as your hips stay steady.'],
    swap: 'Easier: a side plank with the top foot resting down, or the bottom knee down. Shoulder: forearm on a cushion.',
    steps: ['Lie on your left side, left forearm on the floor, elbow under your shoulder, feet stacked.', 'Lift your hips so your body makes one straight line, and reach your right arm to the ceiling.',
      'Raise your right leg a little above your hips and hold it there, breathing steadily.', 'Lower the leg, then your hips, slowly. Hold on the left side, then switch to the right.'],
    easier: 'Rest the top foot down for part of the hold.', harder: 'Hold a little longer, or lift the top leg a little higher.',
    form: 'Elbow under your shoulder, hips lifted, top leg long and level.', breath: 'Stay braced and keep breathing, slow and steady.'}
};
const phaseMove = (m, phase) => m && m.id === 'm-side-plank' && SP_MOVES[phase] ? Object.assign({}, m, SP_MOVES[phase]) : m;
// BLD 1018 (Chris, November 17, 2026: "We can get rid of extra stretch for tight spots. Let's do something better here."): the
// Finish Stretch. In place of the cooldown's general stretches, two or three guided, timed stretches matched to the day's work
// (lower body and cardio days: hip flexor, hamstring, calf; upper body days: chest, child's pose side reach, thread the needle;
// core and total body days: sphinx, supine twist, child's pose), each with its own figure, hold, and sides. The moving part of
// the cooldown (the walk, Cat-Cow, Hip Switches, Open Book) and Slow Breathing stay. The same words play in the Guide plan.
const BR_SOFT = 'Breathe slowly, and let each breath out soften the stretch.';
const FINISH = {
  'fs-hip-flexor': {name: 'Hip Flexor Lunge Stretch', how: 'Back knee down on a cushion, front foot forward in a low lunge. Tuck your hips under and shift forward a little, staying tall. Thirty seconds each side.', secs: 60,
    steps: ['Kneel on your left knee on a cushion, right foot forward in a low lunge.', 'Tuck your hips under and squeeze your left glute.', 'Shift forward a little and stay tall, five slow breaths.', 'Switch sides for five breaths.'],
    feel: 'A long stretch across the front of the hip of the down knee.', easier: 'Stand in a split stance and hold a chair.', reps: 5, tempo: 6, side: true, unit: 'breaths', form: 'Hips tucked under, ribs down, stay tall.', breath: BR_SOFT},
  'fs-hamstring': {name: 'Seated Hamstring Stretch', how: 'Sit tall on the floor, one leg long and the other knee bent, foot resting against the inner thigh. Hinge forward from your hips over the long leg. Thirty seconds each side.', secs: 60,
    steps: ['Sit on the floor with your left leg long, right knee bent, and the right foot resting against your inner thigh.', 'Sit tall, then hinge forward from your hips over the long leg, back long.', 'Rest your hands on your shin and hold for five slow breaths.', 'Switch legs for five breaths.'],
    feel: 'A stretch down the back of the long leg.', easier: 'Sit on a folded towel, or bend the long knee a little.', reps: 5, tempo: 6, side: true, unit: 'breaths', form: 'Hinge from your hips, back long, chest toward the knee.', breath: BR_SOFT},
  'fs-calf': {name: 'Wall Calf Stretch', how: 'Hands on a wall, one foot stepped back with the heel down and the leg long, front knee bent. Lean in gently. Thirty seconds each side.', secs: 60,
    steps: ['Stand facing a wall, hands on it at shoulder height.', 'Step your right foot back, heel down and leg long, and bend your left knee.', 'Lean in gently until you feel the calf, and hold for five slow breaths.', 'Switch legs for five breaths.'],
    feel: 'A stretch down the calf of the back leg.', easier: 'Take a shorter step back.', reps: 5, tempo: 6, side: true, unit: 'breaths', form: 'Back heel down, leg long, hips square to the wall.', breath: BR_SOFT},
  'fs-chest': {name: 'Doorway Chest Stretch', how: 'Stand in a doorway, forearms on the frame at shoulder height. Step one foot through and let your chest open forward.', secs: 48,
    steps: ['Stand in a doorway and rest your forearms on the frame, elbows at shoulder height.', 'Step one foot through, and let your chest move gently forward.', 'Shoulders soft, hold for eight slow breaths.'],
    feel: 'A stretch across your chest and the front of your shoulders.', easier: 'Use one arm at a time, or take a smaller step.', reps: 8, tempo: 6, unit: 'breaths', form: 'Shoulders low and soft, ribs down, chest opening forward.', breath: BR_SOFT},
  'fs-child-reach': {name: 'Child\'s Pose Side Reach', how: 'From Child\'s Pose, walk both hands over to one side and rest there, then walk them to the other side. Thirty seconds each side.', secs: 60,
    steps: ['Kneel with your knees wide and big toes touching, and sit back toward your heels.', 'Walk both hands over to the right and rest your forehead down.', 'Breathe into the long left side of your body, five slow breaths.', 'Walk your hands over to the left for five breaths.'],
    feel: 'A long stretch down the side of your back and under your arm.', easier: 'Set a cushion between your heels and hips.', reps: 5, tempo: 6, side: true, unit: 'breaths', form: 'Hips sink back toward your heels, arms long, neck easy.', breath: BR_SOFT},
  'fs-thread': {name: 'Thread the Needle', how: 'On hands and knees, slide one arm under your body along the floor and rest that shoulder down, then reach the arm up to the ceiling. Three slow rounds each side.', secs: 60,
    steps: ['Start on hands and knees, hands under your shoulders, knees under your hips.', 'Breathe out and slide your right arm under your body, resting your right shoulder down.', 'Breathe in and reach your right arm up to the ceiling, chest opening.', 'Three slow rounds, then switch to the left arm.'],
    feel: 'Your upper back turning and the back of your shoulder opening.', easier: 'Keep the reach small, or rest longer with the shoulder down.', reps: 3, tempo: 10, side: true, unit: 'breaths', form: 'Hips stay over your knees, turn from your upper back.', breath: 'Breathe out as you thread under, breathe in as you reach up.'},
  'fs-sphinx': {name: 'Sphinx Pose', how: 'Lie face down and prop yourself up on your forearms, elbows under your shoulders. Let your low back rest long, and breathe.', secs: 48,
    steps: ['Lie on your stomach, legs long, the tops of your feet down.', 'Set your forearms on the floor, elbows under your shoulders, and lift your chest.', 'Shoulders down, neck long, rest here for eight slow breaths.'],
    feel: 'A gentle stretch along the front of your body and an easy arch in your back.', easier: 'Slide your elbows a little forward, so the lift is smaller.', reps: 8, tempo: 6, unit: 'breaths', form: 'Elbows under your shoulders, shoulders down, neck long.', breath: BR_SOFT},
  'fs-twist': {name: 'Supine Twist', how: 'Lie on your back, arms out wide, knees bent together. Let both knees rest over to one side, then the other. Thirty seconds each side.', secs: 60,
    steps: ['Lie on your back, knees bent, feet on the floor, arms out wide.', 'Let both knees fall slowly to the right and rest there, shoulders on the floor.', 'Turn your head gently to the left, five slow breaths.', 'Bring your knees through the middle and rest them to the left for five breaths.'],
    feel: 'A gentle turn through your low back and the side of your hip.', easier: 'Set a cushion under your knees.', reps: 5, tempo: 6, side: true, unit: 'breaths', form: 'Shoulders rest on the floor, knees together, turn easy.', breath: BR_SOFT},
  'fs-child': {name: 'Child\'s Pose', how: 'Knees wide, big toes together. Sit back toward your heels, arms long on the floor, and breathe into your back.', secs: 48,
    steps: ['Kneel with your knees wide and big toes touching.', 'Sit back toward your heels and reach your arms long on the floor.', 'Rest your forehead down and breathe into your back.'],
    feel: 'Your back and hips lengthening.', easier: 'Set a cushion between your heels and hips.', reps: 8, tempo: 6, unit: 'breaths', form: 'Sink your hips back, and let your back widen and soften.', breath: BR_SOFT}
};
const FINISH_SETS = {lower: ['fs-hip-flexor', 'fs-hamstring', 'fs-calf'], upper: ['fs-chest', 'fs-child-reach', 'fs-thread'], core: ['fs-sphinx', 'fs-twist', 'fs-child']};
// The day's kind from its title: upper body and pulling days, core, posture, and total body days, and the rest (lower body, full
// body, and every cardio day).
const finishKind = (title, track) => track === 'cardio' ? 'lower' : /upper|push|pull/i.test(title || '') ? 'upper' : /core|posture|total body/i.test(title || '') && !/\blegs?\b/i.test(title || '') ? 'core' : 'lower';
const finishItems = (kind, n) => arr(FINISH_SETS[kind] || FINISH_SETS.lower).slice(0, n || 3).map(id => Object.assign({id}, FINISH[id]));
// The moving cooldown items stay in their order; the general stretches give way to the day's Finish Stretch, just before Slow Breathing.
const FINISH_KEEP = ['c-walk', 'c-cat-cow', 'c-hip-switch', 'c-open-book', 'c-breathing'];
function finishCool(cooldown, kind, n){
  const keep = arr(cooldown).filter(x => x && FINISH_KEEP.includes(x.id)), fs = finishItems(kind, n), bi = keep.findIndex(x => x.id === 'c-breathing');
  return bi >= 0 ? keep.slice(0, bi).concat(fs, keep.slice(bi)) : keep.concat(fs);
}
const byIdList = (list, ids) => { const L = arr(list); if (!Array.isArray(ids)) return null; return ids.map(id => L.find(x => x && x.id === id)).filter(Boolean); };
// opts: {level, place, mins, warmup, cooldown} as before, plus (BLD 892) track 'strength'|'cardio', phase 'foundation'|'build'|'peak',
// gear [ids], program (else templates.program). With no track the day templates are the original four (A to D); with no gear the
// old place filter and order run exactly as before. A template: {title, lead, main: [slot], finisher: [slot], finisherLabel,
// rest: {level: seconds between moves}, work: {level: seconds for timed cardio and agility moves}, warm: a day letter or warm-up ids}; a slot is a
// pattern or {p, prefer: [move ids]} (the first preferred move that fits the level and the gear, else the pattern's pool).
// BLD 965 (Chris, November 10, 2026: "use all 5, combine w workout, cardio, strength etc.."): the finish matched to the day.
// strength days: One Last Best Set of the day's first main lift; full body and power days: Squat to Press; core and posture days:
// Mountain Climbers; steady cardio days: a 30 Second Sprint; interval and power cardio days: Burpee Walk-Outs. A template may name
// its own (strong: 'best' or a kind below). A kind's moves are tried in order (the first that fits the level and the gear).
const STRONG = {sprint: ['m-sprint', 'm-c-knee-drive', 'm-march'], burpee: ['m-c-burpee-walkout', 'm-sprint', 'm-c-knee-drive'],
  climbers: ['m-mountain-climbers', 'm-c-incline-climber', 'm-c-knee-drive'], press: ['m-squat-press', 'm-sprint', 'm-c-knee-drive']};
const STRONG_SECS = {sprint: 30, climbers: 30};
function strongKind(tp, track){
  const t = String((tp && tp.title) || '');
  if (tp && tp.strong) return tp.strong;
  if (track === 'cardio') return /steady|long|climb/i.test(t) ? 'sprint' : /\bcore\b/i.test(t) ? 'climbers' : 'burpee';
  if (/core|posture/i.test(t)) return 'climbers';
  if (/power|tempo|circuit|total|conditioning|cardio/i.test(t)) return 'press';
  return 'best';
}
function finishStrong(tp, track, blocks, MB, used, mk1, pre){
  const kind = strongKind(tp, track), first = blocks[0] && blocks[0].items[0];
  const best = () => { if (!first) return null; const it = JSON.parse(JSON.stringify(first));
    it.id = 'best-' + String(first.id); it.sets = {'1': 1, '2': 1, '3': 1}; it.rest = 0; it.restAfter = 0;
    it.cue = 'One last best set: your strongest, cleanest reps of the day.'; return it; };
  let it = null;
  if (kind !== 'best') for (const id of (STRONG[kind] || [])){ const m = MB[id]; if (m && !used.has(id)){ used.add(id); it = mk1(m); if (STRONG_SECS[kind] && it.kind === 'time'){ const n = String(STRONG_SECS[kind]); it.secs = STRONG_SECS[kind]; it.reps = {'1': n, '2': n, '3': n}; } break; } }
  if (!it) it = best();
  if (!it) return null;
  it.rest = 0; it.sets = {'1': 1, '2': 1, '3': 1}; it.strong = kind;
  return {title: 'Finish Strong', items: [it]};
}
function buildSessions(moves, templates, opts){
  opts = Object.assign({level: 'rise', place: 'home', mins: 40}, opts || {});
  const T = templates || {}, level = LEVELS.includes(opts.level) ? opts.level : 'rise', place0 = ['home', 'light', 'gym'].includes(opts.place) ? opts.place : 'home', mins = +opts.mins || 40;
  const gearOn = Array.isArray(opts.gear), gear = gearOn ? opts.gear.filter(g => GEAR.includes(g)) : PLACE_GEAR[place0], place = gearOn ? gearPlace(gear) : place0;
  const len = (T.lengths || {})[String(mins)] || (T.lengths || {})[mins] || {main: mins <= 20 ? 4 : mins <= 40 ? 5 : 6, sets: null, finisher: mins <= 20 ? 0 : 2, finisherSets: 2, cardio: mins >= 60 ? 1 : 0, mobility: mins >= 60 ? 1 : 0, restAfter: 45};
  const restCap = Math.min(REST_MAX, +((T.rest || {})[level]) || REST_MAX), restAfter0 = Math.min(REST_MAX, len.restAfter != null ? +len.restAfter : REST_MAX);
  const days = Object.assign({A: 'Full Body Strength', B: 'Lower Body and Core', C: 'Upper Body and Conditioning', D: 'Full Body and Cardio'}, T.days || {});
  const warmup = byIdList(opts.warmup, len.warmup) || arr(opts.warmup).slice(0, mins <= 20 ? 4 : mins <= 40 ? 6 : 9);
  const cooldown = byIdList(opts.cooldown, len.cooldown) || arr(opts.cooldown).slice(0, mins <= 20 ? 3 : mins <= 40 ? 4 : 6);
  const fitsLv = m => !Array.isArray(m.fits) || !m.fits.length || m.fits.includes(level);
  const M = arr(moves).filter(m => m && m.id && m.name && (gearOn && hasNeeds(m) ? gearOk(m, gear) : placeOk(m, place)) && lv(m, level)), MB = {}; M.forEach(m => { MB[m.id] = m; });
  const ord = gearOn ? null : ((T.order || {})[place] || {})[level] || null, li = LEVELS.indexOf(level);
  // With the checklist: the moves that fit the level, closest in ease first, a place's first choices next, and moves that use the checked gear a little ahead.
  const rank = m => Math.abs((+m.ease || 2) - (li + 1)) - (arr(m.main).includes(place) ? 1.5 : 0) - (gearOn && hasNeeds(m) && !gearOk(m, []) ? 1 : 0);
  // Foundation and the original four days pick only from the moves they had before BLD 892 (baseOnly; new moves carry since).
  const pools = {}, listFor = (pat, base) => pools[pat + (base ? '|b' : '')] || (pools[pat + (base ? '|b' : '')] = ord && Array.isArray(ord[pat]) ? ord[pat].map(id => MB[id]).filter(Boolean)
    : gearOn ? M.map((m, i) => [m, i]).filter(([m]) => m.pattern === pat && fitsLv(m) && !(base && m.since)).sort((a, b) => (rank(a[0]) - rank(b[0])) || (a[1] - b[1])).map(x => x[0]) : M.filter(m => m.pattern === pat && !(base && m.since)));
  const [sLo, sHi] = Array.isArray(((len.sets || {})[level])) ? len.sets[level] : [1, 6];
  // The program's templates for this track and phase, when asked for; otherwise the original four days.
  const prog = opts.program || T.program || null, track = TRACKS.includes(opts.track) ? opts.track : null, phase = PHASES.includes(opts.phase) ? opts.phase : 'foundation';
  const tset = track && prog && prog.tracks && prog.tracks[track] && prog.tracks[track][phase] && typeof prog.tracks[track][phase] === 'object' ? prog.tracks[track][phase] : null;
  const legacy = d => ({title: days[d], lead: (T.leads || {})[d] || '', main: arr((T.slots || {})[d]).length ? T.slots[d] : ['squat', 'push', 'hinge', 'pull', 'core'],
    finisher: arr((T.finisher || {})[d]).length ? T.finisher[d] : null, finisherLabel: (T.finisherTitle || {})[d] || 'Finisher'});
  const target = mins * 60, sessions = {};
  ['A', 'B', 'C', 'D'].forEach(d => {
    const tp = tset && tset[d] ? tset[d] : legacy(d), used = new Set(), pre = d.toLowerCase(), baseOnly = !(tset && tset[d]) || !!tp.baseOnly;
    const ra = tp.rest && tp.rest[level] != null && isFinite(+tp.rest[level]) ? Math.min(REST_MAX, +tp.rest[level]) : restAfter0, wk = tp.work && +tp.work[level] > 0 ? +tp.work[level] : 0;
    // A template's work seconds time only its cardio and agility moves (program.workPatterns); core and balance holds keep their own.
    const wpat = arr(tp.workPatterns || (prog && prog.workPatterns)).length ? arr(tp.workPatterns || prog.workPatterns) : ['cardio', 'agility'];
    const take = m => { used.add(m.id); return m; };
    const pick = slot => { const pat = slot && typeof slot === 'object' ? slot.p : slot;
      if (slot && typeof slot === 'object') for (const id of arr(slot.prefer)){ const m = MB[id]; if (m && !used.has(id) && fitsLv(m)) return take(m); }
      for (const p of [pat].concat(FALL[pat] || [])){ const m = listFor(p, baseOnly).find(x => !used.has(x.id)); if (m) return take(m); } return null; };
    const mk = (m0, sets) => { const m = tset ? phaseMove(m0, phase) : m0; return itemFor(m, level, place, sets, Math.min(+m.rest || REST_MAX, restCap), ra, pre, wpat.includes(m.pattern) ? wk : 0); };
    const blocks = [], add = (title, pats, setsf) => { const items = []; pats.forEach(p => { const m = pick(p); if (m) items.push(mk(m, setsf(m))); }); if (items.length) blocks.push({title, items}); };
    const base = m => +((lv(m, level) || {}).sets) || 3;
    const slots = arr(tp.main).length ? tp.main : ['squat', 'push', 'hinge', 'pull', 'core'];
    add((T.blockTitles || {}).main || 'Main', slots.slice(0, +len.main || slots.length), m => Math.max(sLo, Math.min(base(m), sHi)));
    if (+len.finisher) add(tp.finisherLabel || 'Finisher', arr(tp.finisher).length ? tp.finisher.slice(0, +len.finisher) : Array(+len.finisher).fill('core'), m => Math.min(base(m), +len.finisherSets || 2));
    if (+len.cardio) add((T.blockTitles || {}).cardio || 'Cardio', Array(+len.cardio).fill('cardio'), base);
    // BLD 965 (Chris's 11/10 notes: "finish strong, not 2 min stretch right before cooldown, ALL VIDS"): no Mobility block; every
    // session ends on a Finish Strong block, added after the timing below so it is never trimmed away.
    const ses = {title: tp.title || days[d], lead: tp.lead || '', blocks};
    if (tset){ ses.letter = d; ses.track = track; ses.phase = phase; }
    // BLD 891: each day warms up for its own focus (templates.lengths[n].warmByDay), all moving mobility. BLD 892: a program
    // template may name its warm-up (a day letter or ids); a cardio day warms up like Day D (full body and cardio).
    const wd = tset ? (Array.isArray(tp.warm) ? null : tp.warm || (track === 'cardio' ? 'D' : d)) : d;
    const wu = (tset && Array.isArray(tp.warm) ? byIdList(opts.warmup, tp.warm) : byIdList(opts.warmup, (len.warmByDay || {})[wd])) || warmup; if (wu !== warmup) ses.warmup = wu;
    const phn = tset ? String(PHASES.indexOf(phase) + 1) : '1';
    // BLD 1018: the day's own cooldown, its Finish Stretch matched to the work (two stretches in a 20 minute session, three longer).
    const cd = finishCool(cooldown, finishKind(ses.title, tset ? track : null), mins <= 20 ? 2 : 3); ses.cooldown = cd;
    const items = () => blocks.flatMap(b => b.items), est = () => CLOCK ? CLOCK(ses, wu, cd, phn) : estimate(ses, wu, cd, phn, false);
    const setAll = (it, n) => { it.sets = {'1': n, '2': n, '3': n}; };
    // Too long: one set less on the move with the most sets (never under 1, Main keeps 2 while it can), then the last finisher move.
    // BLD 979 follow-up: with the player's clock the fit aims at the chosen minutes (90 to 100 percent of them, the Finish Strong
    // added after), so a 60 minute choice plays about 55 to 61 minutes; the builder's own estimate keeps its old 95 to 105 window.
    const hiT = target * (CLOCK ? 1 : 1.05), loT = target * (CLOCK ? 0.9 : 0.95);
    for (let g = 0; g < 60 && est() > hiT; g++){
      const all = items(), big = all.slice().sort((a, b) => b.sets['1'] - a.sets['1'])[0];
      if (big && big.sets['1'] > 2){ setAll(big, big.sets['1'] - 1); continue; }
      const tail = blocks.length > 1 ? blocks[blocks.length - 1] : null;
      if (tail){ tail.items.pop(); if (!tail.items.length) blocks.pop(); continue; }
      if (big && big.sets['1'] > 1){ setAll(big, big.sets['1'] - 1); continue; }
      if (blocks[0].items.length > 2){ blocks[0].items.pop(); continue; } break;
    }
    // Too short: one more set where there are fewest (up to 5), then another move.
    for (let g = 0; g < 60 && est() < loT; g++){
      const all = items(), small = all.slice().sort((a, b) => a.sets['1'] - b.sets['1'])[0];
      if (small && small.sets['1'] < Math.max(4, sHi + 1)){ setAll(small, small.sets['1'] + 1); if (est() <= hiT) continue; setAll(small, small.sets['1'] - 1); }
      const m = pick(slots[all.length % slots.length]) || pick('core') || pick('cardio'); if (!m) break;
      const it = mk(m, 2); blocks[0].items.push(it);
      if (est() > hiT){ setAll(it, 1); if (est() > hiT){ blocks[0].items.pop(); break; } }
    }
    const fs = finishStrong(tp, track, blocks, MB, used, m => mk(m, 1), pre); if (fs) blocks.push(fs);
    items().forEach(it => { it.restAfter = ra; }); const all = items(); if (all.length) all[all.length - 1].restAfter = 0;
    ses.est = Math.round(est()); ses.mins = Math.round(ses.est / 60);
    sessions[d] = ses;
  });
  return {sessions, warmup, cooldown};
}

// ---------- targets ----------
// Each goal's targets: {sf, sug, na, fib, sol, proPerKg: [lo, hi]}; na may be [aim, ceiling]; null is ignored.
const TDEF = {sf: 13, sug: 25, na: 2300, fib: 30, sol: null, proPerKg: [0.8, 1]};
function targets(goalIds, goals, o){
  o = o || {}; const G = arr(goals).filter(g => g && arr(goalIds).includes(g.id)).map(g => g.targets || {});
  const vals = (k, i) => G.map(t => t[k]).filter(x => x != null).map(x => Array.isArray(x) ? +x[i == null ? 0 : Math.min(i, x.length - 1)] : +x).filter(isFinite);
  const pick = (k, f, i) => { const v = vals(k, i); return v.length ? f(...v) : null; };
  const sf = pick('sf', Math.min) || TDEF.sf, sug = pick('sug', Math.min) || TDEF.sug, fib = pick('fib', Math.max) || TDEF.fib, sol = pick('sol', Math.max);
  const naAim = pick('na', Math.min, 0) || TDEF.na, naCeil = pick('na', Math.min, 1) || TDEF.na, na = naAim < naCeil ? [naAim, naCeil] : naCeil;
  const pk = G.map(t => t.proPerKg).filter(Array.isArray);
  const lo = pk.length ? Math.max(...pk.map(p => +p[0] || 0.8)) : TDEF.proPerKg[0], hi = pk.length ? Math.max(...pk.map(p => +p[p.length - 1] || +p[0] || 1)) : TDEF.proPerKg[1];
  let pro;
  if (o.teen) pro = Array.isArray(o.teenPro) ? o.teenPro : [46, 52];
  else if (+o.weightKg > 25) pro = [Math.round(lo * o.weightKg), Math.round(Math.max(lo, hi) * o.weightKg)];
  else pro = [Math.round(lo * 70), Math.round(Math.max(lo, hi) * 70)];
  return {sf, sug, na, fib, sol, pro, cal: null, proPerKg: [lo, hi], est: !o.teen && !(+o.weightKg > 25)};
}

// ---------- kids ----------
// An age band holds amounts as a number, a [lo, hi] range, or by sex {f, m} (each a number or a range). Aims come back as
// {lo, hi} for the food groups (cups or oz), numbers for nutrients; with no sex chosen, the higher of the two.
const nOf = v => { if (v == null) return null; if (typeof v === 'number') return v; if (Array.isArray(v)) return +v[0]; const m = /([\d.]+)/.exec(String(v)); return m ? +m[1] : null; };
const rangeOf = v => Array.isArray(v) ? {lo: +v[0], hi: +v[v.length - 1]} : v == null ? null : {lo: nOf(v), hi: nOf(v)};
function bySex(v, sex){
  if (!v || typeof v !== 'object' || Array.isArray(v)) return v;
  if (sex === 'f' || sex === 'm') return v[sex] != null ? v[sex] : (v.f != null ? v.f : v.m);
  const f = rangeOf(v.f), m = rangeOf(v.m); if (!f) return v.m; if (!m) return v.f;
  return [Math.max(f.lo, m.lo), Math.max(f.hi, m.hi)];
}
function kidAims(band, sex){
  band = band || {}; const R = k => { const r = rangeOf(bySex(band[k], sex)); return r && isFinite(r.lo) ? r : null; }, V = k => { const r = R(k); return r ? r.hi : null; };
  return {fruit: R('fruit'), veg: R('veg'), protein: R('protein'), grains: R('grains'), dairy: R('dairy'), water: R('water'),
    fiber: V('fiber'), proteinG: V('proteinG'), iron: V('iron'), ca: V('ca'), sugarMax: V('sugarMax')};
}

// ---------- the LDL Path range ----------
// Each chosen lever lowers what remains: LDL x (1 - e1) x (1 - e2) and so on, for lo, mid, and hi separately. When a bundle lever
// (Portfolio) is chosen, its parts count inside it once. Food, supplement, movement, and weight levers together are capped
// (30 percent mid, 35 percent hi unless the library says otherwise); a medicine then works on top of what remains.
function ldlRange(base, levers, picks, opts){
  opts = opts || {}; const B = +base; if (!isFinite(B) || B <= 0) return null;
  const capHi = (+opts.foodCapPct || 35) / 100, capMid = (+opts.foodCapMidPct || +opts.foodCapPct || 30) / 100;
  let on = arr(levers).filter(l => l && (picks || {})[l.id] === 'do');
  const inside = new Set(on.flatMap(l => arr(l.bundle))); on = on.filter(l => !inside.has(l.id));
  const food = on.filter(l => l.kind !== 'med'), med = on.filter(l => l.kind === 'med');
  const eff = (l, k) => { const v = l[k] != null ? +l[k] : k === 'mid' ? ((+l.lo || 0) + (+l.hi || 0)) / 2 : 0; return Math.max(0, Math.min(90, v || 0)) / 100; };
  const comb = (L, k) => 1 - L.reduce((p, l) => p * (1 - eff(l, k)), 1);
  const f = {lo: comb(food, 'lo'), mid: Math.min(capMid, comb(food, 'mid')), hi: Math.min(capHi, comb(food, 'hi'))}; f.lo = Math.min(f.lo, f.mid);
  const tot = k => 1 - (1 - f[k]) * (1 - comb(med, k));
  const lo = tot('lo'), mid = tot('mid'), hi = tot('hi');
  return {base: B, pctLo: Math.round(lo * 100), pctMid: Math.round(mid * 100), pctHi: Math.round(hi * 100),
    high: Math.round(B * (1 - lo)), mid: Math.round(B * (1 - mid)), low: Math.round(B * (1 - hi)), capped: comb(food, 'hi') > capHi || comb(food, 'mid') > capMid, count: on.length, bundled: [...inside],
    at: (weeks, which) => { const r = 1 - Math.exp(-Math.max(0, weeks) / 2.5), p = which === 'lo' ? lo : which === 'hi' ? hi : mid; return B * (1 - p * r); }};
}

const API = {needOk, fitsAll, tagOf: tg, runCost, allergyOk, allergyWords, planWeeks, weeksFromIds, weekStats, swapDinner, planMeals, planDay, swapMeal, shopList, parseIng, SECTIONS,
  buildSessions, estimate, setClock, clock: null, FINISH, FINISH_SETS, SP_MOVES, finishKind, finishItems, steps, lineSecs, LN, targets, kidAims, ldlRange, DAYS, WEEKS, LEFT, REST_MAX,
  GEAR, PLACE_GEAR, gearOk, gearPlace, PHASES, phaseOfWeek, cardioSlots};
if (typeof module === 'object' && module.exports) module.exports = API;
if (root) root.GGTendPlan = API;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null));
