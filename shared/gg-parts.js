/* =====================================================================
   GROUNDED . THE PARTS (shared/gg-parts.js), GWG BLD 907
   (c) 2026 Grow With Grounded LLC.
   One source of truth for the six parts of a tree and The Grounded Way:
   tend four, grow two. Tend four (each gets practices): Roots, Bark,
   Leaves, Branches. Grow two (they grow from your tending, and keep their
   own check-in questions): Trunk and Fruit.

   Keys stay roots, trunk, bark, branches, leaves, fruit in code and in
   saved data. Labels always pair the tree word and the plain word:
   Roots: Spirit, Trunk: Meaning, Bark: Mind, Branches: Relationships,
   Leaves: Body, Fruit: Hope.

   Plain wording (a profile set to Plain, or a school lock): Roots reads
   "Roots: what grounds you" (calm, values, wonder, gratitude), with no God
   language. Every other part reads the same in Plain.

   window.GGParts
     KEYS                 the six keys in tree order
     TEND                 ['roots', 'bark', 'leaves', 'branches']
     GROW                 ['trunk', 'fruit']
     PROMISE              "The Grounded Way works when you tend all four parts."
     GROWS                "grows from your tending" (Trunk and Fruit)
     has(key)             true for one of the six keys
     tree(key)            'Roots'
     word(key, o)         'Spirit' ('what grounds you' for Roots with o.plain)
     meaning(key, o)      'what grounds you: faith, the sacred, or quiet meaning, in your own way' (BLD 929, one open
                          line for every grown-up; 'what grounds you' with o.plain)
     label(key, o)        'Roots: Spirit' ('Roots: what grounds you' with o.plain)
     color(key, dark)     the part's color (light, or dark with dark true)
     soft(key, dark)      the part's soft background color
     tend(key)            true for the four tended parts
     get(key, o)          {key, tree, word, meaning, label, color, colorDark, soft, softDark, tend, grows}
     list(o)              get() for all six, in tree order (o.only 'tend' or 'grow' narrows it)
     countTend(keys)      how many of the four tended parts are in keys (an array, or an object of key: true)
   The book art (GWG BLD 1065): one true vector per drawing in shared/art, drawn as a mask (shared/gg-art.css, added
   to the page once by the first call), crisp at every size and readable in light and dark.
     icon(key, tree, o)   the part's icon: Roots, Trunk, and Branches are shared by every tree; Leaves, Fruit, and Bark
                          are each tree's own, in the tree's color. tree is one of the six trees ('' for any other app).
                          o.size (px, default 1.35em), o.ink true (the text color, not the tree color), o.cls
     level(l, o)          the level icon: l is 's', 't', 'g' (or 'strong', 'steady', 'edge'); '' for Not sure yet
     pair(key, o)         the mirror pair for roots, bark, leaves, branches: {title, line, html}; null for the others.
                          o.h the drawings' height in px (default 96)
     TREE_COLORS          the six locked tree colors
     art(path)            the address of one art file ('parts/roots.svg'), with its version
   o.plain may be true, false, or a function returning either.
   The same object also carries gg-app.js's rename helpers (id, tag, fix, name) on pages that load it.
   Nothing here reads or saves anything about a person.
   ===================================================================== */
(function () {
  'use strict';
  // shared/gg-app.js also keeps its part rename helpers (id, tag, fix, name) on window.GGParts. Both live on one object:
  // this file adds to it, and gg-app.js adds to this one, whichever loads first.
  if (window.GGParts && window.GGParts.label) return;
  var KEYS = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];
  var TEND = ['roots', 'bark', 'leaves', 'branches'];
  var GROW = ['trunk', 'fruit'];
  var GROWS = 'grows from your tending';
  // Colors are the Home's part colors (home/home.css), light and dark.
  var P = {
    roots: { tree: 'Roots', word: 'Spirit', meaning: 'what grounds you: faith, the sacred, or quiet meaning, in your own way', plainWord: 'what grounds you', plainMeaning: 'what grounds you', color: '#7A4E2D', colorDark: '#D9A982', soft: '#EFE2D6', softDark: '#3E2D20' },
    trunk: { tree: 'Trunk', word: 'Meaning', meaning: 'your meaning and purpose', color: '#8B5E1A', colorDark: '#E3B25A', soft: '#F3E6CC', softDark: '#43341B' },
    bark: { tree: 'Bark', word: 'Mind', meaning: 'your thoughts, feelings, and focus', color: '#7A3FA8', colorDark: '#CBA6F2', soft: '#EEE3F6', softDark: '#372747' },
    branches: { tree: 'Branches', word: 'Relationships', meaning: 'the people you love, face to face', color: '#3F6F94', colorDark: '#94BAD8', soft: '#DDE8F0', softDark: '#223446' },
    leaves: { tree: 'Leaves', word: 'Body', meaning: 'food, movement, rest, and a healthy body', color: '#4E7D4A', colorDark: '#9CCB8A', soft: '#E0ECD8', softDark: '#26381F' },
    fruit: { tree: 'Fruit', word: 'Hope', meaning: 'your hope', color: '#B5452F', colorDark: '#F0957C', soft: '#F6DED6', softDark: '#47241C' }
  };
  function plainOf(o) { var p = o && o.plain; try { return !!(typeof p === 'function' ? p() : p); } catch (e) { return false; } }
  function has(k) { return Object.prototype.hasOwnProperty.call(P, k); }
  function tree(k) { return has(k) ? P[k].tree : ''; }
  function word(k, o) { if (!has(k)) return ''; return plainOf(o) && P[k].plainWord ? P[k].plainWord : P[k].word; }
  function meaning(k, o) { if (!has(k)) return ''; return plainOf(o) && P[k].plainMeaning ? P[k].plainMeaning : P[k].meaning; }
  function label(k, o) { return has(k) ? P[k].tree + ': ' + word(k, o) : ''; }
  function color(k, dark) { return has(k) ? (dark ? P[k].colorDark : P[k].color) : ''; }
  function soft(k, dark) { return has(k) ? (dark ? P[k].softDark : P[k].soft) : ''; }
  function tend(k) { return TEND.indexOf(k) >= 0; }
  function get(k, o) {
    if (!has(k)) return null;
    var x = P[k];
    return { key: k, tree: x.tree, word: word(k, o), meaning: meaning(k, o), label: label(k, o), color: x.color, colorDark: x.colorDark, soft: x.soft, softDark: x.softDark, tend: tend(k), grows: tend(k) ? '' : GROWS };
  }
  function list(o) {
    var only = o && o.only;
    return KEYS.filter(function (k) { return only === 'tend' ? tend(k) : only === 'grow' ? !tend(k) : true; }).map(function (k) { return get(k, o); });
  }
  function countTend(keys) {
    var set = {};
    if (Array.isArray(keys)) keys.forEach(function (k) { set[k] = 1; });
    else if (keys && typeof keys === 'object') Object.keys(keys).forEach(function (k) { if (keys[k]) set[k] = 1; });
    return TEND.filter(function (k) { return set[k]; }).length;
  }
  /* ---------- the book art (GWG BLD 1065) ---------- */
  var AV = 'c212';
  // The mirror pairs wait for their new drawings (Chris asked for stronger art, November 25, 2026). When the new vectors
  // are in shared/art/mirror (bld1065 build_art.py), set PAIRS_ON true; pair() returns null until then.
  var PAIRS_ON = false;
  var ROOT = (function () { try { var c = document.currentScript && document.currentScript.src; if (c) return new URL('..', c).href.replace(/\/$/, ''); } catch (e) {} return ''; })();
  var TREE_COLORS = { oak: '#3D5A73', maple: '#C4501E', aspen: '#1F6F74', pine: '#3A6B35', birch: '#7F6610', sequoia: '#7A2E1C' };
  var OWN = { leaves: 1, fruit: 1, bark: 1 };
  var LVL = { s: 'strong', strong: 'strong', t: 'steady', steady: 'steady', g: 'growing', edge: 'growing', growing: 'growing' };
  var LVN = { strong: 'Strong', steady: 'Steady', growing: 'Growing Edge' };
  // The mirror pairs (the Oak book): what the tree does, and the same in a person, in words drawn from the book's captions.
  var PAIRS = {
    roots: { title: 'Roots and Spirit', art: [['roots', 1], ['spirit', 1]], line: 'Deep roots hold the whole tree steady, the way a rooted spirit holds a whole life.' },
    bark: { title: 'Bark and the Mind', art: [['bark', 0.411], ['mind', 0.826]], line: 'Bark guards the living layer of the tree, and the mind guards the living center of a person.' },
    leaves: { title: 'Leaf and Lungs', art: [['leaf', 0.589], ['lungs', 0.848]], line: 'A leaf breathes in what we breathe out, and our lungs breathe in what the leaf gives away.' },
    branches: { title: 'Branches and Hands', art: [['branch', 1.758], ['hands', 1.756]], line: 'Branches divide and reach outward, and as we reach out, the paths between us grow.' }
  };
  function art(path) { return ROOT + '/shared/art/' + path + '?v=' + AV; }
  function css() {
    if (typeof document === 'undefined' || document.getElementById('gg-art-css')) return;
    if (document.querySelector('link[href*="/shared/gg-art.css"]')) return;
    var l = document.createElement('link'); l.id = 'gg-art-css'; l.rel = 'stylesheet'; l.href = ROOT + '/shared/gg-art.css?v=' + AV;
    (document.head || document.documentElement).appendChild(l);
  }
  function span(cls, src, style, label) {
    css();
    return '<span class="' + cls + '" style="--ic:url(\'' + src + '\')' + (style || '') + '"' + (label ? ' role="img" aria-label="' + String(label).replace(/"/g, '&quot;') + '"' : ' aria-hidden="true"') + '></span>';
  }
  function icon(k, t, o) {
    o = o || {}; if (!has(k) || !TREE_COLORS[t]) return '';
    var src = art('parts/' + (OWN[k] ? t + '-' + k : k) + '.svg');
    return span('gg-ic gg-pt' + (o.ink ? '' : ' gg-tc-' + t) + (o.cls ? ' ' + o.cls : ''), src, o.size ? ';--s:' + o.size + 'px' : '', o.label);
  }
  function level(l, o) {
    o = o || {}; var n = LVL[l]; if (!n) return '';
    return span('gg-ic gg-lv gg-lv-' + n + (o.cls ? ' ' + o.cls : ''), art('levels/' + n + '.svg'), o.size ? ';--s:' + o.size + 'px' : '', o.label === true ? LVN[n] : o.label);
  }
  function pair(k, o) {
    o = o || {}; var P2 = PAIRS_ON && PAIRS[k]; if (!P2) return null;
    var h = o.h || 96;
    var html = '<div class="gg-pair" style="--ph:' + h + 'px" aria-hidden="true">' + P2.art.map(function (a) { return span('gg-mir', art('mirror/' + a[0] + '.svg'), ';--ar:' + a[1] + ';--h:' + Math.round(a[1] > 1.4 ? h * 0.62 : h) + 'px'); }).join('') + '</div>';
    return { title: P2.title, line: P2.line, html: html };
  }
  window.GGParts = Object.assign(window.GGParts || {}, {
    KEYS: KEYS.slice(), TEND: TEND.slice(), GROW: GROW.slice(), GROWS: GROWS,
    PROMISE: 'The Grounded Way works when you tend all four parts.',
    has: has, tree: tree, word: word, meaning: meaning, label: label, color: color, soft: soft, tend: tend,
    get: get, list: list, countTend: countTend,
    icon: icon, level: level, pair: pair, art: art, artCss: css, TREE_COLORS: TREE_COLORS
  });
})();
