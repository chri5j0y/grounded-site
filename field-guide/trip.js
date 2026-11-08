// =====================================================================
// GROUNDED: Log This Trip (GWG BLD 948). (c) 2026 Grow With Grounded LLC.
// Chris (November 8, 2026): "thought it could be helpful to start logging the receipt from shopping trips.. week 1 and 2
// went over a lot but today week 3 was good", "any way we can upload receipts into app? the app scans receipt and loads
// real data", then "1": the receipt is read on the phone (nothing is uploaded), a review screen, and a shorthand memory.
//
// Loaded by field-guide/health.js the first time a shopping list shows (tripCard). health.js hands over a bridge B:
//   {H, save, shopList, keepShop, rerender, toast, esc, PUB, TEEN, STORES, aisleOf, asset, week, fwl, shopDate, age}
// Data, in the same health data as the shopping list (DATA.health, locked with the rest):
//   h.trips:   [{id, n week, d YYYY-MM-DD, store costco|grocer|other, total, food, household, tax, how type|est|scan,
//               lines: [{raw, name, itemId, price, kind food|household}], photo (JPEG data URL, optional), m [money log ids], u}]
//   h.rcptMap: {u, costco: {KEY: {i item name, k food|household|skip, u}}, grocer: {...}, other: {...}}
// The receipt reader is Tesseract.js, kept on this site (shared/vendor/tesseract/) and loaded only when Scan a Receipt is
// tapped. The image is read inside this browser; it never leaves the device.
// GGTrip.parse(text), GGTrip.match(raw, items, store, map), GGTrip.key(raw) are open for tests.
// =====================================================================
(function(){
'use strict';
if (window.GGTrip) return;
const V = 'b948';
const arr = x => Array.isArray(x) ? x : [];
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const pad = n => String(n).padStart(2, '0');
const ymd = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const r2 = n => Math.round((+n || 0) * 100) / 100;
const usd = n => '$' + r2(n).toFixed(2);
const usd0 = n => '$' + Math.round(+n || 0).toLocaleString('en-US');
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const niceD = s => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || '')); return m ? MON[+m[2] - 1] + ' ' + (+m[3]) : ''; };
const ROOTS = '#hj-root,#hj-bare,#hj-ov0';
const PHOTOS_KEPT = 12;   // the newest trips keep their photos; older photos step aside so the device stays light

let B = null;   // the bridge from health.js
// R: the open receipt (stage read or review). T: typed totals waiting. MSG: the last saved note.
const S = {R: null, T: {}, MSG: '', keep: true, pick: -1, q: '', hist: false};

/* ---------- stores ---------- */
function stores(){ const pub = B && B.PUB(); return pub ? [['grocer', 'Grocery Store'], ['costco', 'Costco'], ['other', 'Other']] : [['costco', 'Costco'], ['grocer', (B && B.STORES && B.STORES.grocer) || 'Coborn\'s'], ['other', 'Other']]; }
const storeName = k => (stores().find(s => s[0] === k) || ['', 'Other'])[1];

/* ---------- data ---------- */
function data(){
  const h = B.H(); if (!h) return null;
  h.trips = arr(h.trips).filter(t => t && t.id);
  h.rcptMap = h.rcptMap && typeof h.rcptMap === 'object' && !Array.isArray(h.rcptMap) ? h.rcptMap : {u: 0};
  return h;
}
function tripsOf(n){ const h = data(); return h ? h.trips.filter(t => +t.n === +n && !t.x) : []; }
// The list's estimate for one store (a public list has no stores, so its whole list counts).
function estimate(n, store){
  const L = B.shopList(n); if (!L) return 0; const pub = B.PUB();
  return r2(arr(L.items).filter(x => pub ? store === 'grocer' : x.store === store).reduce((a, x) => a + (+x.price || 0), 0));
}
function estAll(n){ const L = B.shopList(n); return L ? r2(arr(L.items).reduce((a, x) => a + (+x.price || 0), 0)) : 0; }

/* =====================================================================
   READING A RECEIPT: text to lines
   ===================================================================== */
// A price at the end of a line, with OCR's usual mix ups inside the number (O for 0, l or I for 1, S for 5, a comma for
// the point), an optional trailing minus (Costco coupons), and a tax flag or two (F, A, E, T, N, X).
// A speck or two after it (a stray letter or mark the camera picked up at the edge) is let go.
const PRICE_END = /(-)?\s*\$?\s*([0-9OoIlS]{1,4})\s?[.,:]\s?([0-9OoIlS]{2})(?![0-9])\s*(-)?\s*(?:\b[A-Za-z]{1,2}\b)?(?:\s+(?:[A-Za-z]{1,2}[^\w\s]{0,2}|[^\w\s]{1,3}|\d))*\s*[*|'"`.]*\s*$/;
const fixDigits = s => s.replace(/[Oo]/g, '0').replace(/[Il]/g, '1').replace(/S/g, '5');
function endPrice(t){
  const m = PRICE_END.exec(t); if (!m) return null;
  const whole = fixDigits(m[2]), cents = fixDigits(m[3]); if (!/^\d+$/.test(whole) || !/^\d\d$/.test(cents)) return null;
  // A number glued to letters before it (like "LB4.99") is still a price; a slash before it is a unit price ($2.49/lb style is caught by the end anchor).
  const v = +(whole + '.' + cents); if (!isFinite(v)) return null;
  return {v, neg: !!(m[1] || m[4]), at: m.index};
}
const STOP_AFTER = /\bTOTAL\b/;
const SKIP = /\b(CHANGE|CREDIT|DEBIT|VISA|MASTERCARD|MASTER ?CARD|AMEX|DISCOVER|CASH|BALANCE|POINTS?|SAVINGS|FUEL|MEMBER|PHONE|APPROV\w*|AUTH\w*|REFERENCE|SPEND|ITEMS? SOLD|INSTANT|TENDER|ACCOUNT|SEQ|AID|TRANSACTION|CASHIER|REWARDS?|COUPONS? TOTAL|YOU SAVED)\b/;
const SECTION = /^(FROZEN|GROCERY|PRODUCE|DELI|MEAT|MEATS|DAIRY|BAKERY|SEAFOOD|GENERAL MERCHANDISE|HEALTH|BEAUTY|HBC|FLORAL|LIQUOR|PHARMACY|HOUSEHOLD|PAPER|CLEANING|BULK|NATURAL|ORGANIC|PET|BABY|SNACKS|BEVERAGES?)$/;
const letters = s => (String(s).match(/[A-Za-z]/g) || []).length;
function parseDate(text){
  const m = /\b(\d{1,2})\s?\/\s?(\d{1,2})\s?\/\s?(\d{4}|\d{2})\b/.exec(text); if (!m) return '';
  let y = +m[3]; if (y < 100) y += 2000; const mo = +m[1], d = +m[2];
  if (mo < 1 || mo > 12 || d < 1 || d > 31 || y < 2020 || y > 2100) return '';
  return y + '-' + pad(mo) + '-' + pad(d);
}
// parse(text): {store, date, subtotal, tax, total, lines: [{raw, num, price, disc, qty}]}. raw is the item's own words
// (for Coborn's, the name line above the price line); price is what the line charged, coupons already taken off.
function parse(text){
  const out = {store: '', date: parseDate(String(text || '')), subtotal: null, tax: null, total: null, amount: null, lines: []};
  const all = String(text || '').replace(/[‐-―−]/g, '-').split(/\r?\n/);
  const up0 = all.join(' ').toUpperCase();
  out.store = /COSTCO|WHOLESALE|KIRKLAND/.test(up0) ? 'costco' : /COBORN|C0BORN|COB0RN/.test(up0) ? 'grocer' : '';
  let pending = null, after = false;
  for (const line of all){
    const t = line.replace(/\s+/g, ' ').trim(); if (!t) continue;
    const up = t.toUpperCase(), p = /\d{1,2}\/\d{1,2}\/\d{2,4}/.test(t) && !/TOTAL|TAX/.test(up) ? null : endPrice(t);   // a date and time line carries no price
    if (/SUB\s?-?\s?TOTAL/.test(up)){ if (p && out.subtotal == null) out.subtotal = p.v; pending = null; continue; }
    if (/\bTAX\b/.test(up) && !/TAXABLE/.test(up)){ if (p && out.tax == null && !/%/.test(t.slice(Math.max(0, p.at - 1)))) out.tax = p.v; pending = null; continue; }
    if (STOP_AFTER.test(up) && !/NUMBER|ITEMS|SAVINGS|TAX/.test(up)){ if (p && out.total == null) out.total = p.v; after = true; pending = null; continue; }
    if (/AMOUNT/.test(up)){ if (p && out.amount == null) out.amount = p.v; continue; }
    if (after) continue;
    if (SKIP.test(up)){ pending = null; continue; }
    if (!p){
      // A line of words with no price: a name waiting for its price line below (Coborn's), unless it is an aisle heading.
      if (letters(t) >= 3 && !/\/\s?LB\b|@/.test(up) && !SECTION.test(up.replace(/[^A-Z ]/g, '').trim())) pending = t; else if (SECTION.test(up.replace(/[^A-Z ]/g, '').trim())) pending = null;
      continue;
    }
    let body = t.slice(0, p.at).trim();
    // A coupon: Costco prints "0000393870 /1975773 13.00-", taken off the line above (the item number after the slash).
    const cp = /^\W*[E£€]?\s*0{3,}\d*\s*\/\s*(\d{3,8})?/.exec(body);
    if (p.neg || cp){
      const num = cp && cp[1] ? cp[1] : (/\/\s*(\d{3,8})/.exec(body) || [])[1];
      let tgt = null; for (let i = out.lines.length - 1; i >= 0; i--){ if (!num || out.lines[i].num === num || (num.length > 3 && String(out.lines[i].num).endsWith(num.slice(-4)))){ tgt = out.lines[i]; break; } }
      if (!tgt && out.lines.length) tgt = out.lines[out.lines.length - 1];
      if (tgt && p.v <= tgt.price + 0.001){ tgt.disc = r2((tgt.disc || 0) + p.v); tgt.price = r2(tgt.price - p.v); }
      pending = null; continue;
    }
    // The leading tax flag (E on Costco) and the item number.
    body = body.replace(/^[E£€]\s+(?=\d)/, '').replace(/^[^A-Za-z0-9]+/, '');
    let num = ''; const nm = /^(\d{3,14})\s+/.exec(body); if (nm){ num = nm[1]; body = body.slice(nm[0].length); }
    // Quantity and weight: "2 @ $1.99", "1 @ 2/$7.00", "0.44 lb @ $4.99/lb", "4 @ $2.99".
    let qty = 1; const qm = /(\d+(?:\.\d+)?)\s*(LB|LBS|KG|EA)?\s*@.*$/i.exec(body); if (qm){ qty = +qm[1] || 1; body = body.slice(0, qm.index).trim(); }
    body = body.replace(/\b\d{8,14}\b/g, '').replace(/\s+/g, ' ').trim();
    let raw = body;
    if (letters(body) < 3){ if (!pending) continue; raw = pending; }
    else if (pending && /^\d{6,}/.test(t.replace(/^[E£€]\s+/, '')) && out.store === 'grocer') raw = pending;
    pending = null;
    if (p.v <= 0 || p.v > 2000) continue;
    out.lines.push({raw: raw.replace(/\s+/g, ' ').trim(), num, price: p.v, qty});
  }
  // A tax the camera blurred: what the total adds to the subtotal.
  if (out.tax == null && out.total != null && out.subtotal != null && out.total >= out.subtotal && out.total - out.subtotal < out.subtotal * 0.2) out.tax = r2(out.total - out.subtotal);
  if (out.total == null) out.total = out.amount != null ? out.amount : out.subtotal != null ? r2(out.subtotal + (out.tax || 0)) : null;
  return out;
}

/* =====================================================================
   MATCHING: a receipt line to this week's list
   ===================================================================== */
// Store shorthand, spelled out. The shorthand memory (h.rcptMap) wins over all of this once a line is confirmed.
const SH = {ks: 'kirkland signature', kirk: 'kirkland', ksig: 'kirkland signature', org: 'organic', og: 'organic', orgnc: 'organic', grd: 'ground', grnd: 'ground', gr: 'ground',
  chdr: 'cheddar', chedr: 'cheddar', shrp: 'sharp', crakr: 'crackers', crkr: 'crackers', crkrs: 'crackers', strwbrry: 'strawberries', strwbry: 'strawberries', strawb: 'strawberries',
  brd: 'bread', hvy: 'heavy', crm: 'cream', gar: 'garlic', grlc: 'garlic', tom: 'tomatoes', toms: 'tomatoes', tmto: 'tomatoes', fz: 'frozen', frz: 'frozen', frzn: 'frozen',
  ww: 'whole wheat', whw: 'whole wheat', sft: 'soft', grn: 'green', bns: 'beans', bn: 'beans', blk: 'black', mshrm: 'mushrooms', mush: 'mushrooms', cukes: 'cucumbers', cuke: 'cucumbers',
  shrmp: 'shrimp', chkn: 'chicken', ckn: 'chicken', brst: 'breast', ygrt: 'yogurt', yog: 'yogurt', yogrt: 'yogurt', pb: 'peanut butter', pnt: 'peanut', btr: 'butter', alm: 'almond', almd: 'almond',
  mlk: 'milk', spnch: 'spinach', spin: 'spinach', pot: 'potatoes', pots: 'potatoes', ptato: 'potatoes', yel: 'yellow', ylw: 'yellow', wht: 'white', veg: 'vegetables', vegs: 'vegetables',
  brcli: 'broccoli', broc: 'broccoli', brocc: 'broccoli', blueb: 'blueberries', bluebry: 'blueberries', rasp: 'raspberries', avoc: 'avocados', avo: 'avocados', avos: 'avocados', clem: 'clementines',
  salm: 'salmon', sock: 'sockeye', tky: 'turkey', trky: 'turkey', bf: 'beef', chs: 'cheese', mozz: 'mozzarella', parm: 'parmesan', tort: 'tortillas', torts: 'tortillas', ssng: 'seasoning',
  pwdr: 'powder', pwd: 'powder', sce: 'sauce', crshd: 'crushed', crsh: 'crushed', dcd: 'diced', pst: 'paste', lntl: 'lentils', brly: 'barley', flr: 'flour', flx: 'flaxseed', snflwr: 'sunflower',
  sds: 'seeds', sd: 'seed', lmn: 'lemons', cbg: 'cabbage', cbbg: 'cabbage', pepr: 'peppers', ppr: 'peppers', bnna: 'bananas', bnns: 'bananas', ban: 'bananas', appl: 'apples', aple: 'apples',
  oat: 'oats', otml: 'oatmeal', rce: 'rice', brn: 'brown', brwn: 'brown', pcn: 'pecans', pecn: 'pecans', rsn: 'raisins', rsns: 'raisins', tuna: 'tuna', pnut: 'peanuts', pnuts: 'peanuts',
  egg: 'eggs', dz: 'dozen', lrg: 'large', lg: 'large', xl: 'large', spr: 'spring', mx: 'mix', mxd: 'mixed', bry: 'berries', brs: 'berries', swt: 'sweet', crn: 'corn', grbnzo: 'garbanzo', grbz: 'garbanzo',
  cnlni: 'cannellini', kdny: 'kidney', pnto: 'pinto', thn: 'tahini', yst: 'yeast', clntr: 'cilantro', dll: 'dill', clry: 'celery', lim: 'limes', zuc: 'zucchini', zucc: 'zucchini',
  rom: 'romaine', hmb: 'hamburger', bun: 'buns', tp: 'paper', twl: 'towels', twls: 'towels', ppr_twl: 'paper towels', dsh: 'dish', dtrgnt: 'detergent', det: 'detergent', lndry: 'laundry',
  sp: 'soap', tsu: 'tissue', tissu: 'tissue', bath: 'bath', tlt: 'toilet', ziplc: 'ziploc', bgs: 'bags', fl: 'foil', alum: 'aluminum', wrp: 'wrap'};
const STOPW = new Set(['and', 'or', 'the', 'with', 'of', 'in', 'a', 'an', 'for', 'to', 'lb', 'lbs', 'oz', 'ct', 'pk', 'pack', 'each', 'ea', 'bag', 'box', 'can', 'cans', 'jar', 'count', 'keep', 'it', 'only', 'short', 'list', 'ingredient', 'inch', 'size']);
const OPTIONAL = new Set(['kirkland', 'signature', 'organic', 'fresh', 'natural', 'brand', 'value', 'pack', 'large', 'family', 'herb', 'red', 'green', 'yellow', 'orange', 'white', 'bell', 'baby', 'raw', 'plain']);
const sing = w => w.length > 4 && /ies$/.test(w) ? w.slice(0, -3) + 'y' : w.length > 4 && /(oes|ches|shes)$/.test(w) ? w.slice(0, -2) : w.length > 3 && /s$/.test(w) && !/ss$/.test(w) ? w.slice(0, -1) : w;
const skel = w => w[0] + w.slice(1).replace(/[aeiouy]/g, '');
function words(s, expand){
  const out = [];
  String(s || '').toLowerCase().replace(/\([^)]*\)/g, ' ').replace(/[^a-z0-9% ]+/g, ' ').split(/\s+/).forEach(w => {
    if (!w || /\d/.test(w) && !/[a-z]{3,}/.test(w)) return;
    w = w.replace(/\d+/g, ''); if (!w) return;
    const e = expand && SH[w]; (e ? e.split(' ') : [w]).forEach(x => { if (x.length >= 2 && !STOPW.has(x)) out.push(x); });
  });
  return out;
}
function wsim(r, w){
  if (r === w) return 1; const a = sing(r), b = sing(w); if (a === b) return 1;
  if (a.length >= 3 && b.startsWith(a)) return 0.9; if (b.length >= 4 && a.startsWith(b)) return 0.85;
  const sa = skel(a), sb = skel(b); if (sa.length >= 3 && sb.startsWith(sa)) return 0.8; if (sb.length >= 3 && sa.startsWith(sb)) return 0.7;
  if (a.length >= 5 && b.length >= 5 && lev(a, b) <= 1) return 0.75;
  return 0;
}
function lev(a, b){ if (Math.abs(a.length - b.length) > 2) return 3; const d = []; for (let i = 0; i <= a.length; i++){ d[i] = [i]; } for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[a.length][b.length]; }
function score(raw, item, store){
  const R = words(raw, true), W = words(item.name, false); if (!R.length || !W.length) return 0;
  // Brand words (Kirkland Signature, organic) and two-letter store codes help when they match and cost nothing when they
  // do not; a match needs at least one real word of the item.
  let got = 0, den = 0, core = 0; const usedW = new Set();
  R.forEach(r => { let best = 0, bi = -1; W.forEach((w, i) => { const s = wsim(r, w); if (s > best){ best = s; bi = i; } });
    const opt = OPTIONAL.has(r) || r.length <= 2;
    if (best > 0){ got += best; den += 1; usedW.add(bi); if (!opt && best >= 0.7 && !OPTIONAL.has(W[bi])) core++; } else if (!opt) den += 1; });
  if (!den || !got || !core) return 0;
  const Wc = W.filter(w => !OPTIONAL.has(w)).length || W.length, usedC = [...usedW].filter(i => !OPTIONAL.has(W[i])).length;
  const s = got / den + 0.15 * Math.min(1, usedC / Wc) + (store && item.store === store ? 0.04 : 0);
  return s;
}
// The key a line is remembered by: its words, upper case, no item numbers or prices.
const key = raw => String(raw || '').toUpperCase().replace(/\b\d+(\.\d+)?(LBS?|OZ|CT|PK|G|KG|L)?\b/g, ' ').replace(/[^A-Z0-9% ]+/g, ' ').replace(/\s+/g, ' ').trim();
// match(raw, items, store, map): {item, how: 'memory'|'guess'|'', kind, skip}
function match(raw, items, store, map){
  const k = key(raw), mem = map && map[store] && map[store][k];
  if (mem){
    if (mem.k === 'skip') return {item: null, how: 'memory', kind: 'food', skip: true};
    const it = mem.i ? items.find(x => String(x.name).toLowerCase() === String(mem.i).toLowerCase()) : null;
    return {item: it || null, name: mem.i || '', how: 'memory', kind: mem.k === 'household' ? 'household' : 'food'};
  }
  // The store only breaks a tie; the threshold reads the words alone.
  let best = null, bs = 0, bk = 0; items.forEach(x => { const s = score(raw, x, ''), k2 = s + (store && x.store === store ? 0.04 : 0); if (k2 > bk){ bk = k2; bs = s; best = x; } });
  if (best && bs >= 0.6) return {item: best, how: 'guess', kind: houseOf(best.name) ? 'household' : 'food', s: bs};
  return {item: null, how: '', kind: houseOf(raw) ? 'household' : 'food'};
}
const HOUSE = /\b(paper|towel|towels|tissue|toilet|napkins?|plates?|cups?|foil|wrap|ziploc|bags?|detergent|laundry|soap|dish|dishwasher|cleaner|cleaning|bleach|sponges?|trash|batteries|bulbs?|shampoo|toothpaste|razors?|vitamins?|diapers?|wipes|popcorn mker|popcorn maker|led|feit|light|charger|kleenex|bounty|charmin|tide|cascade|dawn|lysol|clorox)\b/i;
const houseOf = s => HOUSE.test(String(s || ''));

/* =====================================================================
   THE READER (Tesseract.js, self-hosted, loaded on the first scan)
   ===================================================================== */
const VEN = 'shared/vendor/tesseract/';
const abs = p => { try { return new URL(B.asset(p), location.href).href; } catch(e){ return p; } };
let TW = null, TL = null;
function loadScript(src){ return new Promise((ok, no) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = () => no(new Error('load')); document.head.appendChild(s); }); }
function simdOk(){ try { return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11])); } catch(e){ return false; } }
async function reader(progress){
  if (TW) return TW;
  if (!TL) TL = (async () => {
    if (!simdOk()) throw new Error('simd');
    if (!window.Tesseract) await loadScript(abs(VEN + 'tesseract.min.js?v=7.0.0'));
    const w = await window.Tesseract.createWorker('eng', 1, {
      workerPath: abs(VEN + 'worker.min.js?v=7.0.0'), corePath: abs(VEN + 'tesseract-core-simd-lstm.js'), langPath: abs(VEN).replace(/\/$/, ''),
      workerBlobURL: false, gzip: true, cacheMethod: 'write',
      logger: m => { if (progress && m && typeof m.progress === 'number') progress(m.status || '', m.progress); }});
    await w.setParameters({tessedit_pageseg_mode: '6', preserve_interword_spaces: '1', user_defined_dpi: '300'});
    TW = w; return w;
  })();
  try { return await TL; } catch(e){ TL = null; throw e; }
}
function imgOf(file){ return new Promise((ok, no) => { const u = URL.createObjectURL(file), im = new Image(); im.onload = () => ok({im, u}); im.onerror = () => { URL.revokeObjectURL(u); no(new Error('image')); }; im.src = u; }); }
// The paper itself: the widest run of bright columns (and then rows), so a table or carpet around the receipt is left out.
function paperBox(im){
  const w0 = im.naturalWidth || im.width, h0 = im.naturalHeight || im.height, k = Math.min(1, 400 / Math.max(w0, h0)), w = Math.max(1, Math.round(w0 * k)), h = Math.max(1, Math.round(h0 * k));
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d', {willReadFrequently: true}); x.drawImage(im, 0, 0, w, h);
  const p = x.getImageData(0, 0, w, h).data, g = new Uint8Array(w * h), hist = new Uint32Array(256);
  for (let i = 0, j = 0; i < p.length; i += 4, j++){ g[j] = (0.299 * p[i] + 0.587 * p[i + 1] + 0.114 * p[i + 2]) | 0; hist[g[j]]++; }
  // Otsu's threshold between paper and the rest.
  let sum = 0; for (let i = 0; i < 256; i++) sum += i * hist[i]; let sb = 0, wb = 0, best = 0, th = 128;
  for (let i = 0; i < 256; i++){ wb += hist[i]; if (!wb) continue; const wf = w * h - wb; if (!wf) break; sb += i * hist[i]; const mb = sb / wb, mf = (sum - sb) / wf, v = wb * wf * (mb - mf) * (mb - mf); if (v > best){ best = v; th = i; } }
  const run = (n, frac) => { let bs = 0, be = n, cs = -1; for (let i = 0; i <= n; i++){ const on = i < n && frac(i) > 0.45; if (on && cs < 0) cs = i; if (!on && cs >= 0){ if (i - cs > be - bs || be - bs === n) { bs = cs; be = i; } cs = -1; } } return [bs, be]; };
  const [x0, x1] = run(w, i => { let n = 0; for (let y = 0; y < h; y++) if (g[y * w + i] > th) n++; return n / h; });
  if (x1 - x0 < w * 0.15) return null;
  const [y0, y1] = run(h, i => { let n = 0; for (let xx = x0; xx < x1; xx++) if (g[i * w + xx] > th) n++; return n / (x1 - x0); });
  if (y1 - y0 < h * 0.15) return null;
  const pad = 0.01; return {x: Math.max(0, (x0 / w - pad)) * w0, y: Math.max(0, (y0 / h - pad)) * h0, w: Math.min(1, (x1 - x0) / w + 2 * pad) * w0, h: Math.min(1, (y1 - y0) / h + 2 * pad) * h0};
}
// Grayscale, cropped to the paper, sized for reading (small pictures grow, very large ones shrink), and the contrast stretched.
// mode 'bin' adds a gentle local threshold (kept for trials; the reader does its own).
function prep(im, mode){
  const bx = mode === 'nocrop' ? null : paperBox(im), W0 = im.naturalWidth || im.width, H0 = im.naturalHeight || im.height;
  const sx = bx ? bx.x : 0, sy = bx ? bx.y : 0, w0 = bx ? Math.min(bx.w, W0 - sx) : W0, h0 = bx ? Math.min(bx.h, H0 - sy) : H0;
  let k = 1; const long = Math.max(w0, h0);
  if (w0 < 1000) k = Math.min(3, 1000 / w0); if (long * k > 3600) k = 3600 / long;
  const w = Math.max(1, Math.round(w0 * k)), h = Math.max(1, Math.round(h0 * k));
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d', {willReadFrequently: true});
  x.imageSmoothingQuality = 'high'; x.drawImage(im, sx, sy, w0, h0, 0, 0, w, h);
  const id = x.getImageData(0, 0, w, h), p = id.data, g = new Float32Array(w * h), hist = new Uint32Array(256);
  for (let i = 0, j = 0; i < p.length; i += 4, j++){ const v = 0.299 * p[i] + 0.587 * p[i + 1] + 0.114 * p[i + 2]; g[j] = v; hist[v | 0]++; }
  const pct = q => { let s = 0, t = q * w * h; for (let i = 0; i < 256; i++){ s += hist[i]; if (s >= t) return i; } return 255; };
  const lo = pct(0.01), hi = Math.max(lo + 1, pct(0.9));
  for (let j = 0; j < g.length; j++) g[j] = Math.max(0, Math.min(255, (g[j] - lo) * 255 / (hi - lo)));
  if (mode === 'bin'){
    const I = new Float64Array((w + 1) * (h + 1));
    for (let y = 0; y < h; y++){ let row = 0; for (let x2 = 0; x2 < w; x2++){ row += g[y * w + x2]; I[(y + 1) * (w + 1) + x2 + 1] = I[y * (w + 1) + x2 + 1] + row; } }
    const r = Math.max(8, Math.round(Math.min(w, h) / 40));
    for (let y = 0; y < h; y++){ const y0 = Math.max(0, y - r), y1 = Math.min(h, y + r + 1);
      for (let x2 = 0; x2 < w; x2++){ const x0 = Math.max(0, x2 - r), x1 = Math.min(w, x2 + r + 1);
        const sum = I[y1 * (w + 1) + x1] - I[y0 * (w + 1) + x1] - I[y1 * (w + 1) + x0] + I[y0 * (w + 1) + x0], n = (x1 - x0) * (y1 - y0);
        g[y * w + x2] = g[y * w + x2] < (sum / n) * 0.85 ? 0 : 255; } }
  }
  for (let j = 0, o = 0; j < g.length; j++, o += 4){ p[o] = p[o + 1] = p[o + 2] = g[j]; p[o + 3] = 255; }
  x.putImageData(id, 0, 0); return c;
}
// The kept photo: a JPEG about 1200 pixels on its long side.
function photoOf(im){
  const w0 = im.naturalWidth || im.width, h0 = im.naturalHeight || im.height, k = Math.min(1, 1200 / Math.max(w0, h0));
  const c = document.createElement('canvas'); c.width = Math.round(w0 * k); c.height = Math.round(h0 * k); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
  try { return c.toDataURL('image/jpeg', 0.6); } catch(e){ return ''; }
}
async function readFile(file, store){
  const n = B.week(), R = S.R = {stage: 'read', store, n, note: TW ? 'Reading the receipt' : 'Getting the reader ready (one time)', pct: 0};
  B.rerender();
  try {
    const {im, u} = await imgOf(file);
    R.photo = photoOf(im); const can = prep(im); URL.revokeObjectURL(u);
    const w = await reader((st, v) => { if (S.R !== R) return; const reading = /recogniz/i.test(st); R.note = reading ? 'Reading the receipt' : 'Getting the reader ready (one time)'; R.pct = reading ? Math.round(v * 100) : 0; paintRead(); });
    R.note = 'Reading the receipt'; paintRead();
    const res = await w.recognize(can);
    if (S.R !== R) return;
    review(res && res.data ? res.data.text : '', R);
  } catch(e){
    if (S.R !== R) return;
    S.R = null; S.MSG = e && e.message === 'simd' ? 'This browser is a little older than the receipt reader needs. Type the total, or tap Use the List\'s Estimate.' : 'That picture was hard to read. Try again in good light with the receipt flat, or type the total.';
    B.rerender();
  }
}
function paintRead(){ const R = S.R, el = document.querySelector('[data-gtread]'); if (!R || !el) return; el.querySelector('b').textContent = R.note; const bar = el.querySelector('.gt-prog span'); if (bar) bar.style.width = (R.pct || 4) + '%'; }
// Text to the review screen (also the way tests hand in text).
function review(text, R0){
  const P = parse(text), h = data(), n = (R0 && R0.n) || B.week(), L = B.shopList(n), items = arr(L && L.items);
  const store = P.store || (R0 && R0.store) || 'other';
  const R = S.R = Object.assign(R0 || {}, {stage: 'review', n, store, date: P.date || ymd(new Date()), total: P.total, tax: P.tax, subtotal: P.subtotal, text,
    lines: P.lines.map(l => { const m = match(l.raw, items, store, h.rcptMap); return {raw: l.raw, price: l.price, disc: l.disc || 0, itemId: m.item ? m.item.id : '', name: m.item ? m.item.name : (m.name || ''), how: m.how, kind: m.kind, skip: !!m.skip}; })});
  if (R.keep == null) R.keep = S.keep;
  S.pick = -1; S.q = ''; B.rerender();
  return R;
}

/* =====================================================================
   SAVING
   ===================================================================== */
function sumLines(R){ return r2(R.lines.filter(l => !l.skip).reduce((a, l) => a + (+l.price || 0), 0)); }
function split(total, food, house){
  const s = food + house; if (!s) return {food: r2(total), household: 0};
  const f = r2(total * food / s); return {food: f, household: r2(total - f)};
}
function photos(h){ const w = h.trips.filter(t => t.photo).sort((a, b) => (b.u || 0) - (a.u || 0)); w.slice(PHOTOS_KEPT).forEach(t => { delete t.photo; t.u = Date.now(); }); }
function addTrip(t){ const h = data(); t.id = t.id || uid(); t.u = Date.now(); h.trips.push(t); photos(h); return t; }
// Grounded Money: Groceries and Household for this trip, matched to the plan's own lines by name.
function young(){ try { if (B.TEEN && B.TEEN()) return true; } catch(e){} return /^(pine|teen|aspen|maple|seed|sprout|kid)$/i.test(B.age ? B.age() : ''); }
function moneyStore(){ const M = window.GGMoney; if (!M || !M.stores || !window.GGP) return null; const st = M.stores.ggp(); if (!st.ok()) return null; const d = st.get(); return d && arr(d.lines).some(l => l && !l.x) ? {M, st, d} : null; }
function moneyReady(){ if (window.GGMoney || !window.GGP || !window.GGP.active || !window.GGP.active()) return Promise.resolve(); return loadScript(abs('shared/gg-money.js?v=b942')).catch(() => {}); }
function toMoney(t){
  if (young()) return 'Saved here. Grounded Money is for grown-ups, so this trip stays with the list.';
  const g = moneyStore(); if (!g) return 'Saved here. When Grounded Money is set up in Home, trips you log add to it.';
  const {M, st, d} = g, live = arr(d.lines).filter(l => l && !l.x);
  const food = live.find(l => /grocer|grocery|groceries|food/i.test(l.n || '')), house = live.find(l => /household|house|home goods|supplies/i.test(l.n || '') && l !== food);
  t.m = [];
  if (t.food > 0) t.m.push(M.model.logAdd(d, t.food, food ? food.id : 'Groceries', t.d).id);
  if (t.household > 0) t.m.push(M.model.logAdd(d, t.household, house ? house.id : 'Household', t.d).id);
  try { st.put(); } catch(e){}
  return 'Added to Grounded Money: Groceries ' + usd(t.food) + (t.household > 0 ? ', Household ' + usd(t.household) : '') + '.';
}
function unMoney(t){ const g = moneyStore(); if (!g || !arr(t.m).length) return; arr(t.m).forEach(id => { const x = arr(g.d.logs).find(y => y && y.id === id); if (x) g.M.model.remove(x, g.d); }); try { g.st.put(); } catch(e){} }
function saveTyped(store, how){
  const n = B.week(), raw = how === 'est' ? estimate(n, store) : parseFloat(String(S.T[store] || '').replace(/[^0-9.]/g, ''));
  if (!(raw > 0)){ B.toast(how === 'est' ? 'This list has no estimate for that store yet.' : 'Type the total first.'); return; }
  const t = addTrip({n, d: ymd(new Date()), store, total: r2(raw), food: r2(raw), household: 0, tax: 0, how, lines: []});
  delete S.T[store];
  return moneyReady().then(() => { S.MSG = storeName(store) + ' ' + usd(t.total) + ' saved for Week ' + n + '. ' + toMoney(t); B.save(); B.rerender(); });
}
function saveReview(){
  const R = S.R; if (!R || R.stage !== 'review') return;
  const h = data(), L = B.shopList(R.n), items = arr(L && L.items), now = Date.now();
  const use = R.lines.filter(l => !l.skip), food = r2(use.filter(l => l.kind !== 'household').reduce((a, l) => a + (+l.price || 0), 0)), house = r2(use.filter(l => l.kind === 'household').reduce((a, l) => a + (+l.price || 0), 0));
  const total = r2(R.total > 0 ? R.total : food + house + (R.tax || 0)), sp = split(total, food, house);
  // The shorthand memory: every line confirmed here, by store.
  const map = h.rcptMap, mm = map[R.store] = map[R.store] && typeof map[R.store] === 'object' ? map[R.store] : {};
  R.lines.forEach(l => { const k = key(l.raw); if (!k || k.length < 2) return; mm[k] = l.skip ? {k: 'skip', u: now} : {i: l.name || '', k: l.kind === 'household' ? 'household' : 'food', u: now}; });
  map.u = now;
  // The list's prices become what was paid (name, amount, and check stay as they are).
  const paid = {}; use.forEach(l => { if (l.itemId) paid[l.itemId] = r2((paid[l.itemId] || 0) + (+l.price || 0)); });
  let moved = 0; if (L) { items.forEach(x => { if (paid[x.id] != null && !x.own && !x.mm && !/^(own-|mm:|h:)/.test(String(x.id))){ x.price = paid[x.id]; moved++; } }); if (moved) B.keepShop(R.n, L); }
  const t = addTrip({n: R.n, d: R.date || ymd(new Date()), store: R.store, total, food: sp.food, household: sp.household, tax: R.tax || 0, how: 'scan',
    lines: R.lines.filter(l => !l.skip).map(l => ({raw: String(l.raw).slice(0, 80), name: l.name || '', itemId: l.itemId || '', price: r2(l.price), kind: l.kind === 'household' ? 'household' : 'food'})),
    photo: R.keep && R.photo ? R.photo : undefined});
  if (!t.photo) delete t.photo;
  S.R = null;
  return moneyReady().then(() => { S.MSG = storeName(t.store) + ' ' + usd(t.total) + ' saved for Week ' + t.n + (moved ? ', and ' + moved + ' list price' + (moved === 1 ? '' : 's') + ' now match what you paid' : '') + '. ' + toMoney(t); B.save(); B.rerender(); return t; });
}

/* =====================================================================
   DRAWING
   ===================================================================== */
const btn = (a, v, label, cls, extra) => `<button type="button" class="${cls || 'gt-btn'}" data-gta="${a}" data-gtv="${esc(v == null ? '' : v)}"${extra || ''}>${label}</button>`;
function card(bridge, n){
  B = bridge; const h = data(); if (!h) return '';
  const R = S.R; n = +n || B.week();
  if (R && R.stage === 'review' && R.n === n) return `<div class="hj-blk gt-trip" id="gt-trip">${vReview(R)}</div>`;
  const tr = tripsOf(n);
  const rows = stores().map(([k, nm]) => {
    const est = k === 'other' ? 0 : estimate(n, k), mine = tr.filter(t => t.store === k), reading = R && R.stage === 'read' && R.store === k && R.n === n;
    return `<div class="gt-store"><div class="gt-sh"><b>${esc(nm)}</b>${est > 0 ? `<small>List estimate about ${usd0(est)}</small>` : ''}</div>
      ${mine.map(t => `<div class="gt-saved"><span>${usd(t.total)} on ${esc(niceD(t.d))}${t.household > 0 ? ` <small>Food ${usd(t.food)} · Household ${usd(t.household)}</small>` : ''}${t.how === 'scan' ? ' <small>From the receipt</small>' : t.how === 'est' ? ' <small>The list\'s estimate</small>' : ''}</span>
        <span class="gt-acts">${t.photo ? btn('photo', t.id, S.ph === t.id ? 'Hide Photo' : 'Photo', 'gt-link') : ''}${btn('del', t.id, S.sure === t.id ? 'Tap Again to Remove' : 'Remove', 'gt-link')}</span>
        ${S.ph === t.id && t.photo ? `<div class="gt-photo"><img src="${t.photo}" alt="Receipt photo from ${esc(niceD(t.d))}"><button type="button" class="gt-link" data-gta="unphoto" data-gtv="${esc(t.id)}">Remove the Photo</button></div>` : ''}</div>`).join('')}
      ${reading ? `<div class="gt-read" data-gtread><b>${esc(R.note)}</b><div class="gt-prog"><span style="width:${R.pct || 4}%"></span></div><small>Read on this device. The picture stays here.</small></div>` : `
      <div class="gt-row"><label class="gt-amt"><span class="sr">${esc(nm)} total</span><span class="gt-d" aria-hidden="true">$</span><input inputmode="decimal" autocomplete="off" placeholder="Total" data-gti="${k}" value="${esc(S.T[k] || '')}"></label>${btn('type', k, 'Save', 'btn btn-gold btn-sm')}</div>
      <div class="gt-row gt-row2">${est > 0 ? btn('est', k, 'Use the List\'s Estimate') : ''}<label class="gt-btn gt-scan">Scan a Receipt<input type="file" accept="image/*" capture="environment" data-gtf="${k}"></label></div>`}
    </div>`; }).join('');
  return `<div class="hj-blk gt-trip" id="gt-trip"><div class="hj-kick">Log This Trip</div><h3>What This Week's Shopping Cost</h3>
    <p class="hj-sub">Week ${n} (Food Week ${esc(B.fwl(n))}). Type each store's total, use the list's estimate, or scan the receipt and we read it right here on your phone.</p>
    ${S.MSG ? `<p class="gt-msg" role="status">${esc(S.MSG)}</p>` : ''}
    <div class="gt-stores">${rows}</div>
    <label class="gt-keep"><input type="checkbox" data-gtk${S.keep ? ' checked' : ''}> Keep the Photo <small>on this device, with the trip</small></label>
    ${vHist(n)}
  </div>`;
}
function vHist(n){
  const h = data(), weeks = [...new Set(h.trips.filter(t => !t.x).map(t => +t.n).concat([n]))].sort((a, b) => a - b).slice(-6);
  if (!h.trips.length) return '';
  const tiles = weeks.map(w => { const t = h.trips.filter(x => +x.n === w && !x.x), paid = r2(t.reduce((a, x) => a + (+x.total || 0), 0)), est = estAll(w);
    const pct = est > 0 ? Math.min(100, Math.round(100 * paid / Math.max(paid, est))) : 100, over = est > 0 && paid > est;
    return `<div class="gt-wk${w === n ? ' on' : ''}"><b>Week ${w}</b><div class="gt-big">${paid ? usd(paid) : '...'}</div><small>${est > 0 ? 'List about ' + usd0(est) : 'No list estimate'}</small>
      <div class="gt-bar${over ? ' hi' : ''}"><span style="width:${paid ? pct : 0}%"></span></div>
      <small>${!paid ? 'Nothing logged yet' : est > 0 ? (over ? usd(paid - est) + ' above the list' : usd(est - paid) + ' under the list') : t.length + ' trip' + (t.length === 1 ? '' : 's')}</small>
      ${t.map(x => `<small class="gt-ln">${esc(storeName(x.store))} ${usd(x.total)}</small>`).join('')}</div>`; }).join('');
  return `<div class="gt-hist"><div class="hj-kick">Trip History</div><div class="gt-wks">${tiles}</div></div>`;
}
function vReview(R){
  const L = B.shopList(R.n), items = arr(L && L.items), sum = sumLines(R), tot = R.total, food = r2(R.lines.filter(l => !l.skip && l.kind !== 'household').reduce((a, l) => a + l.price, 0));
  const house = r2(R.lines.filter(l => !l.skip && l.kind === 'household').reduce((a, l) => a + l.price, 0)), want = tot != null ? r2(tot - (R.tax || 0)) : null, gap = want != null ? r2(want - sum) : null;
  const matched = R.lines.filter(l => !l.skip && l.itemId).length;
  const pick = i => { const l = R.lines[i], q = S.q.trim().toLowerCase(), list = items.filter(x => !q || String(x.name).toLowerCase().includes(q)).slice(0, 40);
    return `<div class="gt-pick"><input type="search" placeholder="Search this week's list" data-gtq value="${esc(S.q)}" aria-label="Search this week's list">
      <div class="gt-plist">${list.map(x => `<button type="button" class="gt-pi${x.id === l.itemId ? ' on' : ''}" data-gta="set" data-gtv="${i}|${esc(x.id)}">${esc(x.name)}<small>${esc(B.STORES[x.store] || '')}${x.price ? ' · list ' + usd(x.price) : ''}</small></button>`).join('') || '<p class="hj-sub">Nothing on this week\'s list by that name.</p>'}</div>
      <div class="gt-row">${btn('set', i + '|', 'No Match')}${btn('pickclose', '', 'Done')}</div></div>`; };
  return `<div class="hj-kick">Check the Receipt</div><h3>${esc(storeName(R.store))} · Week ${R.n}</h3>
    <div class="hj-chips gt-st">${stores().map(([k, nm]) => `<button type="button" class="chip${R.store === k ? ' on' : ''}" aria-pressed="${R.store === k}" data-gta="rstore" data-gtv="${k}">${esc(nm)}</button>`).join('')}</div>
    <div class="gt-g3"><label class="hj-fld"><span>Date</span><input type="date" data-gtr="date" value="${esc(R.date || '')}"></label>
      <label class="hj-fld"><span>Receipt total</span><input inputmode="decimal" data-gtr="total" value="${tot != null ? r2(tot).toFixed(2) : ''}" placeholder="Total"></label>
      <label class="hj-fld"><span>Tax</span><input inputmode="decimal" data-gtr="tax" value="${R.tax != null ? r2(R.tax).toFixed(2) : ''}" placeholder="0.00"></label></div>
    <p class="gt-check" data-gtcheck>${!R.lines.length ? 'We found no item lines. Type the total above and save, or try another photo.' : `${R.lines.filter(l => !l.skip).length} lines add up to ${usd(sum)}${R.tax ? ' before ' + usd(R.tax) + ' tax' : ''}. ${gap == null ? 'Add the receipt total above.' : Math.abs(gap) < 0.02 ? 'That matches the receipt.' : `That is ${usd(Math.abs(gap))} ${gap > 0 ? 'less than' : 'more than'} the receipt, often a line the camera missed. The receipt total is what we save.`}`} ${matched} matched to your list.</p>
    <div class="gt-lines">${R.lines.map((l, i) => `<div class="gt-line${l.skip ? ' skip' : ''}${l.kind === 'household' ? ' house' : ''}" data-gtl="${i}">
      <div class="gt-l1"><code>${esc(l.raw)}</code><label class="gt-pr"><span class="sr">Price</span>$<input inputmode="decimal" data-gtp="${i}" value="${r2(l.price).toFixed(2)}"></label></div>
      ${l.disc ? `<small class="gt-disc">Coupon ${usd(l.disc)} taken off</small>` : ''}
      <div class="gt-l2"><button type="button" class="gt-m${l.itemId ? ' ok' : ''}" data-gta="pick" data-gtv="${i}" aria-expanded="${S.pick === i}">${l.itemId ? 'Matches ' + esc(l.name) : l.name ? esc(l.name) + ' <small>(off this week\'s list)</small>' : 'Match to the List'}${l.how === 'memory' ? ' <small>Remembered</small>' : ''}</button>
        <span class="gt-k">${btn('kind', i + '|food', 'Food', 'chip' + (l.kind !== 'household' && !l.skip ? ' on' : ''), ` aria-pressed="${l.kind !== 'household' && !l.skip}"`)}${btn('kind', i + '|household', 'Household', 'chip' + (l.kind === 'household' && !l.skip ? ' on' : ''), ` aria-pressed="${l.kind === 'household' && !l.skip}"`)}${btn('kind', i + '|skip', 'Skip', 'chip' + (l.skip ? ' on' : ''), ` aria-pressed="${!!l.skip}"`)}</span></div>
      ${S.pick === i ? pick(i) : ''}</div>`).join('')}</div>
    <p class="hj-sub">Food ${usd(food)}${house ? ' · Household ' + usd(house) : ''}. Tax and anything the camera missed are shared between them.</p>
    <label class="gt-keep"><input type="checkbox" data-gtrk${R.keep ? ' checked' : ''}> Keep the Photo <small>on this device, with the trip</small></label>
    <div class="row gt-row">${btn('save', '', 'Save This Trip', 'btn btn-gold')}${btn('cancel', '', 'Cancel', 'gt-btn')}</div>
    <p class="hj-note">Read on this device. Lines you confirm are remembered for ${esc(storeName(R.store))}, so the next receipt matches itself.</p>`;
}

/* ---------- actions ---------- */
function act(a, v){
  const R = S.R, h = data(); if (!h) return;
  switch (a){
    case 'type': S.MSG = ''; saveTyped(v, 'type'); return;
    case 'est': S.MSG = ''; saveTyped(v, 'est'); return;
    case 'photo': S.ph = S.ph === v ? null : v; break;
    case 'unphoto': { const t = h.trips.find(x => x.id === v); if (t){ delete t.photo; t.u = Date.now(); B.save(); } S.ph = null; B.toast('Photo removed.'); break; }
    case 'del': { if (S.sure !== v){ S.sure = v; B.rerender(); setTimeout(() => { if (S.sure === v){ S.sure = null; B.rerender(); } }, 3500); return; }
      S.sure = null; const t = h.trips.find(x => x.id === v); if (t){ unMoney(t); h.trips = h.trips.filter(x => x.id !== v); B.H().trips = h.trips; B.save(); B.toast('Trip removed.'); } break; }
    case 'rstore': if (R){ R.store = v; const L = B.shopList(R.n), items = arr(L && L.items); R.lines.forEach(l => { if (l.how !== 'user'){ const m = match(l.raw, items, v, h.rcptMap); l.itemId = m.item ? m.item.id : ''; l.name = m.item ? m.item.name : (m.name || ''); l.how = m.how; l.kind = m.kind; l.skip = !!m.skip; } }); } break;
    case 'pick': S.pick = S.pick === +v ? -1 : +v; S.q = ''; break;
    case 'pickclose': S.pick = -1; S.q = ''; break;
    case 'set': { if (!R) break; const [i, id] = v.split('|'), l = R.lines[+i]; if (!l) break; const L = B.shopList(R.n), x = arr(L && L.items).find(y => y.id === id);
      l.itemId = x ? x.id : ''; l.name = x ? x.name : ''; l.how = 'user'; l.skip = false; if (x) l.kind = houseOf(x.name) ? 'household' : l.kind; S.pick = -1; S.q = ''; break; }
    case 'kind': { if (!R) break; const [i, k] = v.split('|'), l = R.lines[+i]; if (!l) break; if (k === 'skip') l.skip = !l.skip; else { l.skip = false; l.kind = k; } break; }
    case 'save': saveReview(); return;
    case 'cancel': S.R = null; S.pick = -1; break;
    default: return;
  }
  B.rerender();
}
document.addEventListener('click', e => { const t = e.target.closest && e.target.closest('[data-gta]'); if (!t || !B || !t.closest(ROOTS)) return; e.preventDefault(); act(t.dataset.gta, t.dataset.gtv || ''); });
document.addEventListener('input', e => { const t = e.target; if (!t || !B || !t.closest || !t.closest(ROOTS)) return;
  if (t.dataset.gti) S.T[t.dataset.gti] = t.value;
  const R = S.R; if (!R) return;
  if (t.dataset.gtp != null){ const l = R.lines[+t.dataset.gtp], v = parseFloat(String(t.value).replace(/[^0-9.]/g, '')); if (l && isFinite(v)) l.price = r2(v); }
  if (t.dataset.gtr === 'total' || t.dataset.gtr === 'tax'){ const v = parseFloat(String(t.value).replace(/[^0-9.]/g, '')); R[t.dataset.gtr] = isFinite(v) ? r2(v) : null; }
  if (t.dataset.gtr === 'date' && /^\d{4}-\d{2}-\d{2}$/.test(t.value)) R.date = t.value;
  if (t.dataset.gtq != null){ S.q = t.value; const box = t.closest('.gt-pick'), i = S.pick; if (box && i >= 0){ const pos = t.selectionStart; B.rerender(); const n2 = document.querySelector('[data-gtq]'); if (n2){ n2.focus(); try { n2.setSelectionRange(pos, pos); } catch(err){} } } }
});
document.addEventListener('change', e => { const t = e.target; if (!t || !B || !t.closest || !t.closest(ROOTS)) return;
  if (t.dataset.gtf != null && t.files && t.files[0]){ S.MSG = ''; readFile(t.files[0], t.dataset.gtf); t.value = ''; return; }
  if (t.dataset.gtk != null){ S.keep = !!t.checked; return; }
  if (t.dataset.gtrk != null && S.R){ S.R.keep = !!t.checked; return; }
  if (S.R && (t.dataset.gtp != null || t.dataset.gtr)) B.rerender();
});
document.addEventListener('keydown', e => { const t = e.target; if (e.key === 'Enter' && t && t.dataset && t.dataset.gti && B && t.closest && t.closest(ROOTS)){ e.preventDefault(); act('type', t.dataset.gti); } });

/* ---------- style ---------- */
(function(){ if (document.getElementById('gt-css')) return; const s = document.createElement('style'); s.id = 'gt-css'; s.textContent = `
.gt-trip h3{margin:0 0 6px;}
.gt-btn{display:inline-flex;align-items:center;justify-content:center;font:inherit;font-size:15px;font-weight:700;border:1px solid var(--line);background:transparent;color:var(--ink);border-radius:999px;padding:8px 16px;min-height:44px;cursor:pointer;box-sizing:border-box;}
.gt-btn:hover{border-color:var(--gold);}
.gt-link{font:inherit;font-size:14px;background:none;border:0;padding:4px 0;color:var(--gold);text-decoration:underline;cursor:pointer;min-height:32px;}
.gt-trip input:not([type=checkbox]):not([type=file]){font:inherit;font-size:16px;padding:9px 12px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--ink);box-sizing:border-box;min-width:0;}
.gt-msg{background:color-mix(in srgb,var(--sage) 14%,transparent);border:1px solid color-mix(in srgb,var(--sage) 40%,transparent);border-radius:12px;padding:10px 12px;margin:10px 0;font-size:15px;}
.gt-stores{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin:12px 0;}
.gt-store{border:1px solid var(--line);border-radius:14px;padding:12px;min-width:0;}
.gt-sh{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px 10px;margin-bottom:8px;}.gt-sh small{color:var(--ink-soft);font-size:13.5px;}
.gt-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px;}
.gt-amt{display:flex;align-items:center;gap:4px;flex:1 1 120px;min-width:0;}.gt-amt input{flex:1;min-width:0;width:100%;}
.gt-d{color:var(--ink-soft);}
.gt-scan{position:relative;overflow:hidden;cursor:pointer;}.gt-scan input{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;font-size:0;}
.gt-scan:focus-within{outline:2px solid var(--gold);outline-offset:3px;}
.gt-saved{display:flex;flex-wrap:wrap;justify-content:space-between;gap:4px 10px;padding:6px 0;border-bottom:1px dashed var(--line);font-size:15px;}
.gt-saved small{display:block;color:var(--ink-soft);font-size:13px;}.gt-acts{display:flex;gap:10px;}
.gt-photo{flex:1 1 100%;}.gt-photo img{display:block;max-width:100%;max-height:420px;border-radius:10px;border:1px solid var(--line);margin:6px 0;}
.gt-read{padding:8px 0;}.gt-read small{display:block;color:var(--ink-soft);font-size:13px;margin-top:4px;}
.gt-prog{height:8px;border-radius:99px;background:var(--line);overflow:hidden;margin-top:8px;}.gt-prog span{display:block;height:100%;background:var(--sage);transition:width .3s;}
.gt-keep{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:15px;margin:6px 0;}.gt-keep small{color:var(--ink-soft);}.gt-keep input{width:20px;height:20px;}
.gt-hist{margin-top:14px;}.gt-wks{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;}
.gt-wk{border:1px solid var(--line);border-radius:14px;padding:10px 12px;min-width:0;}.gt-wk.on{border-color:var(--gold);}
.gt-wk small{display:block;color:var(--ink-soft);font-size:13px;}.gt-big{font-size:22px;font-weight:700;margin:2px 0;}
.gt-bar{height:8px;border-radius:99px;background:var(--line);overflow:hidden;margin:6px 0;}.gt-bar span{display:block;height:100%;background:var(--sage);}.gt-bar.hi span{background:var(--honey,#B87A2A);}
.gt-st{margin:8px 0;}
.gt-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;}
.gt-check{background:var(--bg-deep,transparent);border-radius:12px;padding:10px 12px;font-size:15px;margin:10px 0;}
.gt-lines{display:grid;gap:8px;}
.gt-line{border:1px solid var(--line);border-radius:12px;padding:8px 10px;min-width:0;}.gt-line.skip{opacity:.55;}.gt-line.house{border-color:color-mix(in srgb,var(--honey,#B87A2A) 55%,var(--line));}
.gt-l1{display:flex;justify-content:space-between;gap:8px;align-items:center;min-width:0;}
.gt-l1 code{font-size:13.5px;overflow-wrap:anywhere;min-width:0;color:var(--ink-soft);}
.gt-pr{display:flex;align-items:center;gap:2px;flex:0 0 auto;}.gt-pr input{width:84px;text-align:right;}
.gt-disc{display:block;color:var(--sage);font-size:13px;}
.gt-l2{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;justify-content:space-between;margin-top:6px;}
.gt-m{font:inherit;font-size:15px;text-align:left;background:transparent;border:1px dashed var(--line);border-radius:10px;padding:6px 10px;color:var(--ink);cursor:pointer;min-height:40px;min-width:0;max-width:100%;overflow-wrap:anywhere;}
.gt-m.ok{border-style:solid;border-color:color-mix(in srgb,var(--sage) 60%,var(--line));}.gt-m small{color:var(--ink-soft);font-size:12.5px;}
.gt-k{display:flex;gap:6px;flex-wrap:wrap;}.gt-k .chip{min-height:38px;font-size:14px;}
.gt-pick{margin-top:8px;}.gt-pick input{width:100%;box-sizing:border-box;}
.gt-plist{display:grid;gap:4px;max-height:260px;overflow:auto;margin-top:6px;}
.gt-pi{font:inherit;font-size:15px;text-align:left;background:transparent;border:1px solid var(--line);border-radius:10px;padding:8px 10px;color:var(--ink);cursor:pointer;}
.gt-pi.on{border-color:var(--gold);}.gt-pi small{display:block;color:var(--ink-soft);font-size:12.5px;}
@media (max-width:560px){.gt-g3{grid-template-columns:1fr 1fr;}.gt-g3 .hj-fld:first-child{grid-column:1 / -1;}}
`; document.head.appendChild(s); })();

window.GGTrip = {v: V, card, act, parse, match, key, score, review: (text, store) => { if (!B) return null; return review(text, {n: B.week(), store: store || 'other'}); },
  save: () => saveReview(), state: S, prep, words};
})();
