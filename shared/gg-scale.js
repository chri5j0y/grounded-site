// =====================================================================
// GROUNDED . RECIPE SCALER (GWG BLD 880): ingredient amounts that fit the table.
// (c) 2026 Grow With Grounded LLC.
// Every public recipe is written for six (serves: 6), and its steps name ingredients without amounts, so one recorded
// voice fits every size. This scales the leading amount of each ingredient line to any household, in kitchen-friendly
// measures: cups, lb, tbsp, and tsp to the nearest 1/4 (tsp under 1 to the nearest 1/8, with thirds of a cup too),
// whole cans, eggs, tortillas, fillets, and cloves, and halves for produce. Mixed numbers use digits (1 1/2).
// Pure functions, no page and no storage: the same code runs in the browser (window.GGScale) and in Node (require).
//
//   line(text, factor) -> text      one ingredient line; factor 1 returns the line exactly as written
//   recipe(r, n) -> copy of r       serves: n, ingredients scaled by n / r.serves (nutrition stays per serving)
//   factor(r, n) -> n / r.serves
// =====================================================================
(function (root) {
  'use strict';

  var NUM = '(\\d+(?:\\.\\d+)?\\s+\\d+/\\d+|\\d+/\\d+|\\d+(?:\\.\\d+)?)';
  var LEAD = new RegExp('^' + NUM + '(?:\\s+to\\s+' + NUM + ')?');
  var SIZE = { large: 1, medium: 1, small: 1, whole: 1 };

  // Measures: kind, and whether the line spells the word out.
  var MEAS = {
    lb: ['lb', 0], lbs: ['lb', 0], pound: ['lb', 1], pounds: ['lb', 1],
    oz: ['oz', 0], ounce: ['oz', 1], ounces: ['oz', 1],
    tbsp: ['tbsp', 0], tablespoon: ['tbsp', 1], tablespoons: ['tbsp', 1],
    tsp: ['tsp', 0], teaspoon: ['tsp', 1], teaspoons: ['tsp', 1],
    cup: ['cup', 1], cups: ['cup', 1], pint: ['pint', 1], pints: ['pint', 1], quart: ['quart', 1], quarts: ['quart', 1]
  };
  var TSP = { tsp: 1, tbsp: 3, cup: 48 };
  var WORD = { lb: ['pound', 'pounds', 'lb'], oz: ['ounce', 'ounces', 'oz'], tbsp: ['tablespoon', 'tablespoons', 'tbsp'], tsp: ['teaspoon', 'teaspoons', 'tsp'],
    cup: ['cup', 'cups'], pint: ['pint', 'pints'], quart: ['quart', 'quarts'] };

  // Count nouns: singular and plural. Whole ones round to whole numbers (at least 1); the rest (produce) to halves.
  var PAIRS = [['can', 'cans', 1], ['block', 'blocks', 1], ['jar', 'jars', 1], ['package', 'packages', 0], ['box', 'boxes', 0], ['bunch', 'bunches', 0],
    ['head', 'heads', 0], ['crown', 'crowns', 0], ['clove', 'cloves', 1], ['stalk', 'stalks', 1], ['rib', 'ribs', 1], ['slice', 'slices', 1],
    ['leaf', 'leaves', 1], ['egg', 'eggs', 1], ['tortilla', 'tortillas', 1], ['fillet', 'fillets', 1], ['bun', 'buns', 1], ['pita', 'pitas', 1],
    ['skewer', 'skewers', 1], ['date', 'dates', 1], ['onion', 'onions', 0], ['lemon', 'lemons', 0], ['lime', 'limes', 0], ['avocado', 'avocados', 0],
    ['cucumber', 'cucumbers', 0], ['pepper', 'peppers', 0], ['tomato', 'tomatoes', 0], ['carrot', 'carrots', 0], ['apple', 'apples', 0],
    ['banana', 'bananas', 0], ['potato', 'potatoes', 0], ['container', 'containers', 1], ['cup', 'cups', 1]];
  var NOUN = {};
  PAIRS.forEach(function (p) { NOUN[p[0]] = { one: p[0], many: p[1], whole: !!p[2] }; NOUN[p[1]] = NOUN[p[0]]; });
  var CONTAINER = { can: 1, block: 1, jar: 1 };

  function toNum(s) {
    s = String(s).trim();
    var m = /^(\d+(?:\.\d+)?)\s+(\d+)\/(\d+)$/.exec(s); if (m) return +m[1] + m[2] / m[3];
    m = /^(\d+)\/(\d+)$/.exec(s); if (m) return m[1] / m[2];
    return +s;
  }
  var FR = [[1 / 8, '1/8'], [1 / 4, '1/4'], [1 / 3, '1/3'], [3 / 8, '3/8'], [1 / 2, '1/2'], [5 / 8, '5/8'], [2 / 3, '2/3'], [3 / 4, '3/4'], [7 / 8, '7/8']];
  function fmt(v) {
    if (!(v > 0)) return '0';
    var w = Math.floor(v + 1e-6), f = v - w;
    if (f < 0.02) return String(w);
    if (f > 0.98) return String(w + 1);
    var best = FR[0];
    FR.forEach(function (x) { if (Math.abs(x[0] - f) < Math.abs(best[0] - f)) best = x; });
    return (w ? w + ' ' : '') + best[1];
  }
  function step(v, s, min) { return Math.max(min, Math.round(v / s) * s); }
  function cups(v) {
    var q = step(v, 0.25, 0.25), t = step(v, 1 / 3, 1 / 3);
    return Math.abs(t - v) + 0.01 < Math.abs(q - v) ? t : q;
  }

  // A measured amount: returns {v, kind} after rounding and moving to a friendlier measure when it is very small or large.
  function measure(v, kind) {
    if (kind === 'cup' && v < 0.2) { v *= 16; kind = 'tbsp'; }
    if (kind === 'tbsp' && v >= 12) { return { v: cups(v / 16), kind: 'cup' }; }
    if (kind === 'tbsp' && v < 0.9) { v *= 3; kind = 'tsp'; }
    if (kind === 'tsp' && v >= 3) { v /= 3; kind = 'tbsp'; }
    if (kind === 'lb' && v < 0.22) { v *= 16; kind = 'oz'; }
    return round(v, kind);
  }
  // Rounding alone, in a measure already chosen.
  function round(v, kind) {
    if (kind === 'cup') return { v: cups(v), kind: kind };
    if (kind === 'tbsp' && v >= 2) return { v: step(v, 0.5, 0.5), kind: kind };
    if (kind === 'tsp') return { v: v < 0.94 ? step(v, 0.125, 0.125) : step(v, 0.25, 0.25), kind: kind };
    if (kind === 'oz') return { v: step(v, 1, 1), kind: kind };
    if (kind === 'pint' || kind === 'quart') return { v: step(v, 0.5, 0.5), kind: kind };
    return { v: step(v, 0.25, 0.25), kind: kind };
  }
  function count(v, whole) {
    if (whole) return Math.max(1, Math.round(v));
    return v < 0.9 ? step(v, 0.25, 0.25) : step(v, 0.5, 0.5);
  }
  function unitWord(kind, v, spelled, orig) {
    var w = WORD[kind];
    if (!spelled && w[2]) return w[2];
    var out = v > 1 ? w[1] : w[0];
    return /^[A-Z]/.test(orig || '') ? out.charAt(0).toUpperCase() + out.slice(1) : out;
  }
  function inflect(word, many) {
    var n = NOUN[word.toLowerCase()]; if (!n) return word;
    var out = many ? n.many : n.one;
    return /^[A-Z]/.test(word) ? out.charAt(0).toUpperCase() + out.slice(1) : out;
  }

  // Where the head of the line ends: the first comma outside brackets.
  function headEnd(s) {
    var d = 0;
    for (var i = 0; i < s.length; i++) { var c = s.charAt(i); if (c === '(') d++; else if (c === ')') d = Math.max(0, d - 1); else if (c === ',' && !d) return i; }
    return s.length;
  }

  // Scale one quantity at the start of s ("2 1/4 lb ...", "3 to 4 tablespoons ...", "1 can (28 oz) ...").
  // Returns the new text, or s unchanged when it does not start with an amount.
  function piece(s, f, opts) {
    opts = opts || {};
    var m = LEAD.exec(s); if (!m) return s;
    var a = toNum(m[1]), b = m[2] ? toNum(m[2]) : null, rest = s.slice(m[0].length);
    if (!(a > 0) || (b != null && !(b > 0))) return s;
    var wm = /^(\s+)([A-Za-z]+)/.exec(rest), w1 = wm ? wm[2] : '', lw = w1.toLowerCase();
    if (lw === 'pinch' || lw === 'pinches' || lw === 'dash') return s;
    // A measure right after the amount.
    if (MEAS[lw]) {
      var k = MEAS[lw], rb = b != null ? measure(b * f, k[0]) : null, ra = measure(a * f, k[0]);
      if (rb && rb.kind !== ra.kind) { var kk = MEAS[rb.kind] ? rb.kind : k[0]; ra = round(a * f * (TSP[k[0]] || 1) / (TSP[kk] || 1), kk); }
      var top = rb ? rb.v : ra.v, txt = fmt(ra.v) + (rb && rb.v !== ra.v ? ' to ' + fmt(rb.v) : '');
      return txt + wm[1] + unitWord(ra.kind, top, k[1] || ra.kind !== k[0] && WORD[ra.kind].length < 3, w1) + rest.slice(wm[0].length);
    }
    // A count: find the noun (a unit word right after the amount, after a size word, or the last word of the head).
    var he = opts.head != null ? opts.head : headEnd(rest), head = rest.slice(0, he);
    var noun = null, at = -1, re = /[A-Za-z]+/g, x, words = [];
    var flat = head.replace(/\([^)]*\)/g, function (p) { return new Array(p.length + 1).join(' '); });
    while ((x = re.exec(flat))) words.push([x[0], x.index]);
    if (words.length && NOUN[words[0][0].toLowerCase()]) { noun = words[0][0]; at = words[0][1]; }
    else if (words.length > 1 && SIZE[words[0][0].toLowerCase()] && NOUN[words[1][0].toLowerCase()] && !/^(cups?)$/i.test(words[1][0])) { noun = words[1][0]; at = words[1][1]; }
    else if (words.length) { var lst = words[words.length - 1]; if (NOUN[lst[0].toLowerCase()] && !/^(cups?)$/i.test(lst[0])) { noun = lst[0]; at = lst[1]; } }
    if (noun && /^cups?$/i.test(noun) && at !== words[0][1]) noun = null;
    var info = noun ? NOUN[noun.toLowerCase()] : null;
    var whole = info ? info.whole : false;
    if (noun && /^onions?$/i.test(noun) && /\bgreen\s+$/i.test(head.slice(0, at))) whole = true;
    if (opts.whole != null && !info) whole = opts.whole;
    var va = count(a * f, whole), vb = b != null ? count(b * f, whole) : null, top2 = vb != null ? vb : va;
    var out = fmt(va) + (vb != null && vb !== va ? ' to ' + fmt(vb) : '');
    if (noun) {
      var many = top2 > 1;
      rest = rest.slice(0, at) + inflect(noun, many) + rest.slice(at + noun.length);
      // A container keeps its size in brackets: "1 can (28 oz)" and "2 cans (28 oz each)".
      if (CONTAINER[info.one]) {
        var after = at + inflect(noun, many).length;
        rest = rest.slice(0, after) + rest.slice(after).replace(/^(\s*\(\s*[\d.]+\s*(?:oz|ounces?))(\s+each)?(\s*\))/i, function (all, p1, ea, p3) { return p1 + (many ? ' each' : '') + p3; });
      }
    }
    return out + rest;
  }

  // Amounts inside the line that describe the whole amount: "about 1 1/2 lb", "(from 1 1/2 cups dry", and a swap in brackets.
  function inner(s, f) {
    s = s.replace(/(\babout|\(from)\s+(\d[^,)]*)/g, function (all, w, tail) {
      if (/\beach\b/i.test(tail)) return all;
      return w + ' ' + piece(tail, f, { head: tail.length });
    });
    s = s.replace(/(\bswap:\s*)([^)]*)/g, function (all, lead, body) {
      return lead + body.replace(/(^|\bplus\s+)(\d[^)]*?)(?=\s+plus\b|$)/g, function (a2, p, q) {
        var m = /^(\d+(?:\s+\d+\/\d+)?|\d+\/\d+)(\s+extra)?(\s+.*)$/.exec(q); if (!m) return a2;
        if (m[2]) { var sc = piece(m[1] + m[3], f, { head: 0 }), mm = LEAD.exec(sc); return p + mm[0] + m[2] + sc.slice(mm[0].length); }
        return p + piece(q, f, { head: 0 });
      });
    });
    return s;
  }

  function line(text, factor) {
    var s = String(text == null ? '' : text), f = +factor;
    if (!(f > 0) || Math.abs(f - 1) < 1e-9) return s;
    if (/^\s*equipment\s*:/i.test(s) || !/^\d/.test(s)) return s;
    var m = LEAD.exec(s); if (!m) return s;
    var first = piece(s, f), lead = LEAD.exec(first)[0];
    // Leave the leading amount alone in the second pass, then scale the amounts inside.
    var rest = first.slice(lead.length);
    var wm = /^(\s+[A-Za-z]+)/.exec(rest), keep = wm ? wm[0] : '';
    return lead + keep + inner(rest.slice(keep.length), f);
  }

  function factor(r, n) { var base = +(r && r.serves) || 6, want = +n || base; return want / base; }
  function recipe(r, n) {
    if (!r) return r;
    var f = factor(r, n), out = {};
    for (var k in r) if (Object.prototype.hasOwnProperty.call(r, k)) out[k] = r[k];
    out.serves = +n || r.serves;
    out.ingredients = (r.ingredients || []).map(function (l) { return typeof l === 'string' ? line(l, f) : l; });
    return out;
  }

  var API = { line: line, recipe: recipe, factor: factor, fmt: fmt };
  if (typeof module === 'object' && module.exports) module.exports = API;
  if (root) root.GGScale = API;
})(typeof window !== 'undefined' ? window : this);
