/* =====================================================================
   GROUNDED . PRACTICE NAMES, OLD TO NEW (GWG BLD 885)
   A Growth Plan saves each practice by its part and name ('part|Name'), in the plan's
   selected lists and in each day's marks. When a practice is renamed, merged, or moved to
   another part, this map brings a saved record forward, on this device only, so an old
   pick shows and counts as the practice it became. Nothing is lost: a mark for an old name
   becomes a mark for the new one, and two picks that became one stay one.
   gg-profiles.js calls GGPracticeAlias.fixVault(vault) each time a profile opens, so every
   page that loads this file before gg-profiles.js reads the new names.
     GGPracticeAlias.MAP[tree]['part|Old Name'] = 'part|New Name'
     GGPracticeAlias.key(tree, 'part|Name')    the current key for a saved key
     GGPracticeAlias.fix(tree, record)         bring one tree record forward; true if it changed
     GGPracticeAlias.fixVault(vault)           the same for every tree in a profile
   To rename a practice later: add a line here, keep the old key in shared/practice-rhythm.js,
   and bump ?v= everywhere this file loads.
   ===================================================================== */
(function () {
  if (window.GGPracticeAlias) return;
  var MAP = {
    oak: {
      'trunk|Get Counseling': 'trunk|Talk With a Therapist',
      'leaves|Chakras': 'leaves|Body Awareness',
      'leaves|Unplugged Evening': 'leaves|Evening Wind Down',
      'trunk|Create Stuff': 'trunk|Create Something',
      'trunk|Journal Often': 'trunk|Journal',
      'branches|Faith': 'branches|Faith Community',
      'trunk|Expressive Writing': 'bark|Expressive Writing',
      'fruit|Volunteer': 'trunk|Volunteer',
      'leaves|Medicine': 'leaves|See the Doctor Early'
    },
    sequoia: {
      'leaves|Wind-Down Hour': 'leaves|Evening Wind Down',
      'trunk|Make Something': 'trunk|Create Something',
      'branches|Faith': 'branches|Faith Community',
      'leaves|Medicine': 'leaves|My Medicines'
    },
    pine: {
      'branches|Faith': 'branches|Faith Community',
      'trunk|Expressive Writing': 'bark|Expressive Writing'
    }
  };
  var PARTS = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];
  var has = function (o, k) { return !!o && Object.prototype.hasOwnProperty.call(o, k); };
  function key(tree, k) { var m = MAP[tree]; return has(m, k) ? m[k] : k; }

  // A plan: {part: {selected: [names], own: [names], custom, lib}}. Old picks move to the new part and name.
  function isPlan(x) { return PARTS.some(function (p) { var v = x[p]; return v && typeof v === 'object' && Array.isArray(v.selected); }); }
  function fixPlan(m, plan) {
    var moved = false;
    PARTS.forEach(function (p) {
      var x = plan[p]; if (!x || typeof x !== 'object') return;
      ['selected', 'own'].forEach(function (f) {
        if (!Array.isArray(x[f])) return;
        x[f] = x[f].filter(function (n) {
          var nk = has(m, p + '|' + n) ? m[p + '|' + n] : null; if (!nk) return true;
          var i = nk.indexOf('|'), np = nk.slice(0, i), nn = nk.slice(i + 1);
          var t = plan[np] && typeof plan[np] === 'object' ? plan[np] : (plan[np] = { selected: [], custom: '', own: [] });
          if (!Array.isArray(t.selected)) t.selected = [];
          if (t.selected.indexOf(nn) < 0) t.selected.push(nn);
          moved = true; return false;
        });
      });
      if (typeof x.custom === 'string' && has(m, p + '|' + x.custom.trim())) {
        var nk = m[p + '|' + x.custom.trim()], j = nk.indexOf('|'), q = nk.slice(0, j), qn = nk.slice(j + 1);
        var t2 = plan[q] && typeof plan[q] === 'object' ? plan[q] : (plan[q] = { selected: [], custom: '', own: [] });
        if (!Array.isArray(t2.selected)) t2.selected = [];
        if (t2.selected.indexOf(qn) < 0) t2.selected.push(qn);
        x.custom = ''; moved = true;
      }
    });
    return moved;
  }
  // Walks a tree record: plans, day marks ('part|Name' in lists), notes keyed by 'part|Name',
  // and any other string that is exactly an old key.
  function walk(m, x, depth) {
    if (!x || typeof x !== 'object' || depth > 40) return false;
    var ch = false;
    if (Array.isArray(x)) {
      var seen = {}, out = [], hit = false;
      for (var i = 0; i < x.length; i++) {
        var v = x[i];
        if (typeof v === 'string' && has(m, v)) { v = m[v]; hit = true; }
        else if (v && typeof v === 'object') { if (walk(m, v, depth + 1)) ch = true; }
        if (typeof v === 'string') { if (hit && seen[v]) continue; seen[v] = 1; }
        out.push(v);
      }
      if (hit) { x.length = 0; Array.prototype.push.apply(x, out); ch = true; }
      return ch;
    }
    if (isPlan(x) && fixPlan(m, x)) ch = true;
    Object.keys(x).forEach(function (k) {
      var v = x[k];
      if (typeof v === 'string' && has(m, v)) { x[k] = m[v]; ch = true; }
      else if (v && typeof v === 'object' && walk(m, v, depth + 1)) ch = true;
      if (has(m, k)) { var nk = m[k]; if (x[nk] == null) x[nk] = x[k]; delete x[k]; ch = true; }
    });
    return ch;
  }
  function fix(tree, rec) { var m = MAP[tree]; return !!(m && rec && typeof rec === 'object' && walk(m, rec, 0)); }
  function fixVault(v) {
    var ch = false; if (!v || typeof v !== 'object') return false;
    Object.keys(MAP).forEach(function (t) { if (v[t] && typeof v[t] === 'object' && fix(t, v[t])) ch = true; });
    return ch;
  }
  window.GGPracticeAlias = { MAP: MAP, key: key, fix: fix, fixVault: fixVault };
})();
