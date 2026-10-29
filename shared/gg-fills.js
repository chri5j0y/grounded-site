/* =====================================================================
   GROUNDED . ONE CARD, TWO CREDITS (GWG BLD 892)
   Chris (October 29, 2026): "when we go to The Grounded Way and see our Today's Tending, we will
   not see Meditation twice, but this Meditation practice will become the main and fulfill the
   checkin practices from the tree's growth plan".
   One shared map from a growth plan practice ('part|Name', as the trees save it) to the guided
   Tending sessions that fill it. On Today a practice and a planned session that fills it become
   one card, and Done credits both: the tree's day mark and the Tending log. A practice with no
   matching session today keeps its own card and offers Play a Guided One.
     GGFills.MAP['part|Name']               {kind, ids, only, style} for every tree
     GGFills.TREE[tree]['part|Name']         a tree's own rule, read first (null keeps a practice its own card)
     GGFills.fillsFor(part, name, tree)      the rule, or null
     GGFills.fills(pid, session, tree)       true when the session fills the practice
     GGFills.match(practice, items, tree)    the first of today's Tending items that fills it, or null
     GGFills.pick(pid, sessions, tree)       the best session to offer as Play a Guided One, or null
     GGFills.fillsOf(session, tree)          every 'part|Name' a session fills
   A session (or a Today item) is {kind: 'meditation'|'flow'|'strength'|'cardio', id, title, style}.
   ids lists preferred session ids or titles, best first (the Guide library and the public library
   share the ids m1 to m7 and p1 to p7). only: the session must be one of ids. style: a Flow
   session with a style fills only when its style matches (or it is in ids); a Flow session with
   no style fills any Flow practice.
   Kids' trees (Maple, Aspen) and Willow keep their own cards: their practices are written for a
   child with a grown-up or for the bedside, and none share these names.
   Stay their own cards on purpose: Breath Prayer, Gratitude Letter, Kind Voice Letter, Awe Walk,
   A Walk Among Trees, Savoring Walk, Meaning Walk, Two Hours Outdoors, Sleep, rest practices.
   ===================================================================== */
(function (root) {
  var MED = ['m1', 'm5', 'm7', 'Anchor in the Breath', 'Open Awareness', 'Rest and Let Go', 'Steady Breath, Steady Day', 'Sounds and Space', 'Rooted Like a Tree'];
  var med = { kind: 'meditation', ids: MED };
  var scan = { kind: 'meditation', ids: ['m2', 'Rest Through the Body', 'Soften From Head to Toe'], only: true };
  var MAP = {
    'bark|Meditation': med,
    'bark|Mindfulness': med,
    'bark|Quiet the Senses': med,
    'roots|Quiet Time': med,
    'bark|Body Scan': scan,
    'bark|Body Kindness Scan': scan,
    'branches|Loving-Kindness': { kind: 'meditation', ids: ['m3', 'Circles of Kindness', 'Warm Wishes'], only: true },
    'fruit|Two-Week Gratitude': { kind: 'meditation', ids: ['m4', 'Gathering Gratitude', 'A Grateful Heart'], only: true },
    'leaves|Movement': { kind: 'strength', ids: [] },
    'leaves|Strength Training': { kind: 'strength', ids: [] },
    'leaves|Walk or Jog': { kind: 'cardio', ids: [] },
    'leaves|Walk Your Way': { kind: 'cardio', ids: [] },
    'leaves|Yoga': { kind: 'flow', style: 'yoga', ids: ['Morning Flow'] },
    'leaves|Tai Chi': { kind: 'flow', style: 'taichi', ids: ['Slow Balance 1'] },
    'leaves|Stretch Break': { kind: 'flow', style: 'stretch', ids: ['Desk and Neck'] },
    'leaves|Chair Stretch': { kind: 'flow', style: 'stretch', ids: ['Chair Flow', 'Desk and Neck'] },
    'leaves|In-Bed Movement': { kind: 'flow', style: 'stretch', ids: ['p7', 'Evening Unwind', 'Full Body Stretch'] },
    'leaves|Breathe': { kind: 'flow', ids: ['p6', 'Breath and Focus'] }
  };
  var TREE = { maple: null, aspen: null, willow: null };
  var KINDS = { meditation: 1, flow: 1, strength: 1, cardio: 1 };

  function low(s) { return String(s == null ? '' : s).trim().toLowerCase(); }
  function has(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }
  function fillsFor(part, name, tree) {
    var pid = name == null && /\|/.test(String(part)) ? String(part) : String(part || '') + '|' + String(name || '').trim();
    if (tree && has(TREE, tree)) { var t = TREE[tree]; if (!t) return null; if (has(t, pid)) return t[pid] || null; }
    return has(MAP, pid) ? MAP[pid] : null;
  }
  function split(pid) { var s = String(pid || ''), i = s.indexOf('|'); return i < 0 ? [s, ''] : [s.slice(0, i), s.slice(i + 1)]; }
  /* Where a session sits in a rule's ids (ids or titles), or -1. */
  function rank(rule, s) {
    var L = (rule && rule.ids) || [], id = low(s && s.id), ti = low(s && s.title);
    for (var i = 0; i < L.length; i++) { var x = low(L[i]); if (x && (x === id || x === ti)) return i; }
    return -1;
  }
  function fitsRule(rule, s) {
    if (!rule || !s || !KINDS[s.kind] || rule.kind !== s.kind) return false;
    var r = rank(rule, s);
    if (rule.only) return r >= 0;
    if (rule.style && s.style && low(s.style) !== low(rule.style)) return r >= 0;
    return true;
  }
  function fills(pid, s, tree) { var p = split(pid); return fitsRule(fillsFor(p[0], p[1], tree), s); }
  /* practice: {part, name} or {pid} or 'part|Name'; items: today's Tending items, each carrying {kind, id, title, style}
     (or {fill: {...}}). An item already used by another card can be skipped with skip(item). */
  function match(practice, items, tree, skip) {
    var pid = typeof practice === 'string' ? practice : practice && (practice.pid || (practice.part + '|' + practice.name));
    var L = Array.isArray(items) ? items : [];
    for (var i = 0; i < L.length; i++) { var it = L[i], s = it && (it.fill || it); if (s && !(skip && skip(it)) && fills(pid, s, tree)) return it; }
    return null;
  }
  function pick(pid, sessions, tree) {
    var p = split(pid), rule = fillsFor(p[0], p[1], tree); if (!rule) return null;
    var best = null, bestR = 1e9;
    (Array.isArray(sessions) ? sessions : []).forEach(function (s, i) {
      if (!fitsRule(rule, s)) return;
      var r = rank(rule, s); r = r < 0 ? 1000 + i : r;
      // A Flow practice with a style prefers a session in that style over one with no style at all.
      if (rule.style && low(s.style) === low(rule.style)) r -= 500;
      if (r < bestR) { best = s; bestR = r; }
    });
    return best;
  }
  function fillsOf(s, tree) { return Object.keys(MAP).filter(function (pid) { return fills(pid, s, tree); }); }
  var api = { MAP: MAP, TREE: TREE, fillsFor: fillsFor, fills: fills, match: match, pick: pick, fillsOf: fillsOf, v: 'b892' };
  if (root && !root.GGFills) root.GGFills = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : null);
