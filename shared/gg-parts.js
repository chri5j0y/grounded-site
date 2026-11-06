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
  window.GGParts = Object.assign(window.GGParts || {}, {
    KEYS: KEYS.slice(), TEND: TEND.slice(), GROW: GROW.slice(), GROWS: GROWS,
    PROMISE: 'The Grounded Way works when you tend all four parts.',
    has: has, tree: tree, word: word, meaning: meaning, label: label, color: color, soft: soft, tend: tend,
    get: get, list: list, countTend: countTend
  });
})();
