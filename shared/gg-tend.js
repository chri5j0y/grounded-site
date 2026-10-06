/* =====================================================================
   GROUNDED . TENDING (shared)
   The daily, weekly, and seasonal rhythm inside each tree app.
   Built for Oak first (Rebrand Session 3), written so Aspen and Maple
   can use it next with their own words and parts.

   The rhythm
   - Today: the practices from your growth plan, grouped by part. No
     limits, only suggestions: about 3 for a Strong part, 4 for Steady,
     5 for a Growing Edge (GGTend.suggest), plus any of their own. Checking off any one waters the tree for the day.
     Each practice has an "easier today" version and an optional note.
     Morning and evening anchors sit at the top and bottom.
   - Week: one of twelve weekly themes, a quick check-in (question 1 of
     every part plus Move, Rest, and Nourish), a short reflection, and
     the days tended calendar.
   - Season: twelve weeks. A full check-in at week 12 or later adds a
     ring and starts the next season.

   The tree is gentle. A day or few missed and the leaves look dry. About
   a week and it droops. Two weeks or more and it rests bare. It never
   dies, and nothing is ever taken away. The first practice perks it up,
   and a few days of tending bring it back to full.

   Everything is saved inside the person's own locked Grounded profile
   (GGP), under the tool's record, as "tend". Nothing leaves the device.

   For tools
     GGTend.init(cfg)        see the Oak page for a full example
     GGTend.render()         redraw whatever tab is showing
     GGTend.onFullCheckin(entry)   call when a full check-in finishes
     GGTend.setPlan(plan)    {partKey: {selected:[names], custom:'', own:[names]}}
     GGTend.suggest(level)   how many practices to suggest for a part:
                             'strong' 3, 'steady' 4, 'edge' 5 (3 if unknown)

   Optional config (Rebrand Session 4, for Aspen and Maple)
     journey      words that replace the shared journey for this age
                  (WEEKS by position, ANCHORS, LEVELS, LEVEL_MOVE)
     showStory    false hides the Grounded story in Week
     noQuick      true hides the quick check-in buttons
     shareRefl    true adds "Share this with my grown-up" to the reflection
     noRecords    true hides the records section (a grown-up keeps the backups)
     ringCount    () => number of rings to show, when a tool counts rings its own way
     tree         { pal: [3 colors] x3, trunk, trunkBare, fruit: 'acorn' or 'leaf', fruitColor }
     profileHtml  () => html for the profile section of the settings sheet
     extraSettings () => html added to the settings sheet
     Sequoia's game layer (GWG BLD 733), all optional, for any tool:
     todayExtra   (state) => html shown under the tree on Today
     seasonExtra  (state) => html shown under the season card
     onCheck      (done, partKey, state) called after a practice is checked or unchecked
     pause        () => true while a recent check-in flagged losing hope or feeling
                  alone. The tree holds as it is: no drying or drooping while it is on.
     pauseLine    the words under the tree while the pause is on
     tree.shape   'tall' draws a narrow, high crown on a massive flared trunk;
                  'layered' (Pine, GWG BLD 739) draws the tree from the Pine mark on a tall,
                  straight trunk; 'birch' (Birch, GWG BLD 742) draws the tree from the
                  Birch mark: two white trunks with dark marks, an airy crown, and catkins
                  (tree.fruitColor) for each part tended today. Optional for 'birch':
                  tree.trunkEdge (the thin outline on the white trunks), tree.limb (the color of the limbs)
     Pine's game layer (GWG BLD 739), all optional, for any tool:
     itemTag      (partKey, name, state) => html after a practice name on Today
                  (Pine shows mastery: Tried, Building, Mine)
     partNote     (partKey, state) => html under a part's heading on Today
                  (Pine's Hardy setting shows trouble on a long untended part)
     plain        () => true when the profile uses Plain wording: a week in the
                  journey with its own plain words ({intro, q}) shows those instead
     GGTend.plan()           the saved plan, or null
     GGTend.state()          the saved record, or null
     GGTend.openSettings()   the settings sheet behind the profile picture
   ===================================================================== */
(function () {
  if (window.GGTend) return;
  var J = window.GGJourney || {};
  var C = null;            // the tool's config
  var CAL = null;          // the month showing on the calendar {y, m}
  var OPEN = {};           // which practice drawers are open

  /* ---------- an age's own words over the shared journey ---------- */
  function mergeJourney(base, over) {
    if (!over) return base;
    var out = {}; Object.keys(base).forEach(function (k) { out[k] = base[k]; });
    Object.keys(over).forEach(function (k) {
      if (k === 'WEEKS' && Array.isArray(base.WEEKS)) out.WEEKS = base.WEEKS.map(function (w, i) { var o = {}; Object.keys(w).forEach(function (x) { o[x] = w[x]; }); var v = over.WEEKS[i] || {}; Object.keys(v).forEach(function (x) { o[x] = v[x]; }); return o; });
      else out[k] = over[k];
    });
    return out;
  }
  // How many practices to suggest for one part of the tree. Suggestions only, never a limit.
  function suggest(level) { return level === 'edge' ? 5 : level === 'steady' ? 4 : 3; }

  /* ---------- small helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function dstr(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function today() { return dstr(new Date()); }
  function parse(s) { var p = String(s).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function addDays(s, n) { var d = parse(s); d.setDate(d.getDate() + n); return dstr(d); }
  function between(a, b) { return Math.round((parse(b) - parse(a)) / 86400000); }
  function nice(s) { return parse(s).toLocaleDateString(undefined, { month: 'long', day: 'numeric' }); }
  function rng(seed) { var a = seed >>> 0; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function el(id) { return document.getElementById(id); }
  function toast(m) { if (C && C.toast) C.toast(m); }
  function itemId(key, name) { return key + '|' + name; }

  /* ---------- the saved record ---------- */
  function S() { return C && C.store ? C.store.get() : null; }
  function blank() { return { v: 1, start: null, season: 1, rings: [], plan: null, level: null, days: {}, weeks: {} }; }
  function ensure() {
    var s = S(); if (!s) return null;
    var b = blank(); Object.keys(b).forEach(function (k) { if (s[k] === undefined) s[k] = b[k]; });
    // First time: the season starts on the latest full check-in, and the
    // latest growth plan becomes Today's practices.
    if (!s.start || !s.plan) {
      var full = (C.history() || []).filter(function (e) { return e && e.type !== 'quick' && e.date; });
      var last = full[full.length - 1];
      if (!s.start && last) s.start = last.date;
      if (!s.plan) { var withPlan = (C.history() || []).filter(function (e) { return e && e.growthPlan && countPlan(e.growthPlan); }); var lp = withPlan[withPlan.length - 1]; if (lp) s.plan = JSON.parse(JSON.stringify(lp.growthPlan)); }
    }
    return s;
  }
  function save() { return C.store.save(); }
  function countPlan(p) { var n = 0; Object.keys(p || {}).forEach(function (k) { var x = p[k] || {}; n += (x.selected || []).length + (x.custom ? 1 : 0) + (x.own || []).length + (x.lib || []).length; }); return n; }
  function items(s) {
    var out = [];
    C.parts.forEach(function (pt) {
      var x = (s.plan || {})[pt.key]; if (!x) return;
      (x.selected || []).forEach(function (name) { out.push({ key: pt.key, name: name, custom: false }); });
      if (x.custom) out.push({ key: pt.key, name: x.custom, custom: true });
      (x.own || []).forEach(function (name) { if (name) out.push({ key: pt.key, name: name, custom: true }); });
      // Practices added from the shared library (Rebrand Session 5): {k: library key, n: name}
      (x.lib || []).forEach(function (l) { if (l && l.k) out.push({ key: pt.key, name: l.n, custom: false, lib: l.k }); });
    });
    return out;
  }
  function day(s, d, make) { if (!s.days[d] && make) s.days[d] = { d: [], n: {}, e: [], a: [] }; return s.days[d] || null; }
  function tended(s, d) { var x = s.days[d]; return !!(x && ((x.d && x.d.length) || (x.a && x.a.length))); }
  // Rings: seasons finished, or (C.ringCount) the tool's own count, like Aspen's one ring per full check-in.
  function ringN(s) { return C.ringCount ? C.ringCount() : (s.rings || []).length; }
  function partsOn(s, d) { var x = s.days[d], set = {}; if (!x) return 0; (x.d || []).forEach(function (id) { set[id.split('|')[0]] = 1; }); return Object.keys(set).length; }

  /* ---------- season and week ---------- */
  function weekNo(s) { if (!s.start) return 0; return Math.floor(Math.max(0, between(s.start, today())) / 7) + 1; }
  function weekShown(s) { return Math.min(12, Math.max(1, weekNo(s))); }
  function stretch(w) { return (J.SEASON_ORDER || ['planting', 'rooting', 'blooming'])[Math.min(2, Math.floor((w - 1) / 4))]; }
  function weekKey(s) { return 's' + (s.season || 1) + 'w' + weekNo(s); }

  /* ---------- the gentle tree ---------- */
  // 0 thriving, 1 a little dry, 2 drooping, 3 resting bare
  function stateFrom(s, d) {
    var last = null;
    for (var i = 0; i <= 60; i++) { var x = addDays(d, -i); if (tended(s, x)) { last = i; break; } }
    if (last === null) return Object.keys(s.days).some(function (k) { return k < d && tended(s, k); }) ? 3 : 0;
    var missed = Math.max(0, last - 1);
    return missed === 0 ? 0 : missed <= 3 ? 1 : missed <= 12 ? 2 : 3;
  }
  // A tree app can cap how dry its tree looks (Maple, GWG BLD 745: only a thirsty look, never drooping).
  function health(s) {
    var h = healthOf(s);
    return C && typeof C.maxDry === 'number' ? Math.min(h, C.maxDry) : h;
  }
  function healthOf(s) {
    var d = today();
    if (C && C.pause && C.pause()) return 0;   // a gentle pause: the tree holds while hope or company is low
    if (!tended(s, d)) return stateFrom(s, d);
    // Tended today: start from how it looked before today, then perk up.
    var y = addDays(d, -1), any = Object.keys(s.days).some(function (k) { return k < d && tended(s, k); });
    if (!any) return 0;   // a brand-new tree starts out well
    var before = stateFrom(s, y);
    var recent = 0; for (var i = 0; i < 3; i++) if (tended(s, addDays(d, -i))) recent++;
    return Math.max(0, before - recent);
  }
  var LINES = [
    'Your tree is thriving.',
    'Your tree is a little dry. One practice will perk it up.',
    'Your tree is drooping. It is still here, and one practice is a start.',
    'Your tree is resting bare. Nothing is lost. Tend it once today and watch it wake up.'
  ];
  // Pine (GWG BLD 739): the tree from the Pine mark (shared/marks/pine.svg), drawn in the
  // mark's own units (trunk base at 50,90; tip at 50,6) and scaled into the scene.
  // Thriving, dry, and drooping use the palette's shade, body, and light; drooping
  // tiers sag at the tips; resting bare shows the trunk and its bare limbs. Never anything gone.
  function layeredTree(T, h, parts, R, cx, cy, gy, tk, pal, drop) {
    var k = (gy - 22) / 84, f = function (n) { return n.toFixed(2); };
    var o = '<g transform="translate(' + f(cx - 50 * k) + ' ' + f(gy - 90 * k) + ') scale(' + k.toFixed(4) + ')">';
    // [top, bottom, half width] of each tier, top tier first, as in the mark
    var tiers = [[6, 22, 9], [16, 36, 14], [28, 50, 19], [40, 64, 24], [52, 76, 28]];
    var bark = '<g fill="none" stroke-linecap="round"><path d="M48.3 89.4Q48.6 84 48.5 79M50.1 89.6Q50.3 85 50.0 78.5M51.7 89.4Q51.5 84.5 51.6 79" stroke="#000" stroke-opacity=".28" stroke-width="0.45"/><path d="M47.8 89Q47.9 84 47.8 79" stroke="#FFF" stroke-opacity=".18" stroke-width="0.35"/></g>';
    if (!pal) {
      // resting bare: the trunk and its limbs still reach out, ready to green again
      o += '<path d="M44 90Q47.2 87 47.4 80L49.2 8H50.8L52.6 80Q52.8 87 56 90Z" fill="' + tk + '"/>' + bark;
      tiers.forEach(function (t, i) {
        var y = t[1] - 2, r = t[2] * 0.72;
        o += '<path d="M50 ' + y + 'Q' + f(50 - r * 0.5) + ' ' + (y - 1) + ' ' + f(50 - r) + ' ' + (y + 1.5) + 'M50 ' + (y - 1.5) + 'Q' + f(50 + r * 0.5) + ' ' + (y - 2.5) + ' ' + f(50 + r) + ' ' + y + '" stroke="' + tk + '" stroke-width="' + (i > 2 ? 1.2 : 0.9) + '" fill="none" stroke-linecap="round"/>';
      });
      return o + '</g>';
    }
    o += '<path d="M44 90Q47.2 87 47.4 80V64H52.6V80Q52.8 87 56 90Z" fill="' + tk + '"/>' + bark;
    var sag = [0, 0.6, 2.6, 0][h];
    var tier = function (t, dy) {
      var top = t[0], yb = t[1], w = t[2], hh = yb - top, tooth = hh * 0.2, pts = [[50, top]];
      for (var j = 0; j <= 6; j++) {
        var x = 50 + w - j * w / 3, y = (j % 2 ? yb - tooth : yb);
        if (j === 0 || j === 6) y += sag;
        pts.push([x, y]);
      }
      return pts.map(function (p) { return f(p[0]) + ',' + f(p[1] + dy); }).join(' ');
    };
    tiers.forEach(function (t) {
      var top = t[0], yb = t[1], w = t[2], hh = yb - top;
      o += '<polygon points="' + tier(t, 2.2) + '" fill="' + pal[0] + '"/>';
      o += '<polygon points="' + tier(t, 0) + '" fill="' + pal[1] + '"/>';
      o += '<polygon points="50,' + f(top + 1) + ' ' + f(50 - w * 0.76) + ',' + f(yb - 1 + sag * 0.6) + ' ' + f(50 - w * 0.34) + ',' + f(yb - hh * 0.15) + '" fill="' + pal[2] + '" fill-opacity="0.8"/>';
      o += '<polygon points="50,' + f(top + 3) + ' ' + f(50 + w * 0.84) + ',' + f(yb - 0.5 + sag * 0.6) + ' ' + f(50 + w * 0.44) + ',' + f(yb - hh * 0.12) + '" fill="' + pal[0] + '" fill-opacity="0.6"/>';
    });
    // cones, one for each part tended today, when the tree is well
    if (h <= 1) {
      var spots = [[30, 77], [70, 77], [34, 65], [66, 65], [38, 51], [62, 51]];
      for (var c = 0; c < Math.min(6, parts); c++) {
        var sp = spots[c];
        o += '<g transform="translate(' + sp[0] + ' ' + sp[1] + ')"><ellipse rx="1.5" ry="2.4" fill="' + (T.fruitColor || '#8A5A2B') + '" stroke="#4E2E12" stroke-width=".35"/><path d="M-1.3 -.7H1.3M-1.4 .7H1.4" stroke="#4E2E12" stroke-width=".3"/></g>';
      }
    }
    return o + '</g>';
  }
  // Birch (GWG BLD 742): the tree from the Birch mark (shared/marks/birch.svg, Two Trunks),
  // drawn in the mark's own units (trunk bases at 48.5 and 56, ground at 90) and scaled into
  // the scene. The crown is the mark's Leafy Clusters: one solid shade silhouette under
  // everything (so the crown never shows holes), leafy masses tagged by layer (0 shade,
  // 1 body, 2 light, -1 where the pale inner limbs show), small sunlit highlight leaves, and
  // slender hanging twigs with their own leaves. Thriving shows it all in the palette's shade,
  // body, light, and highlight (a palette of three uses its light for the highlight), with a
  // gold catkin for each part tended today. Dry thins the light and highlight leaves; drooping
  // thins the body too and lets the twigs and masses hang; resting bare shows the white trunks,
  // their limbs, and their bare tips. The shade silhouette stays whenever there are leaves.
  // Never anything gone. Crown data comes from the mark's crown, generated, not hand typed.
  var BIRCH_SIL = "M73.8 33.0Q75.1 34.1 75.2 35.0Q75.0 35.6 73.6 36.1Q74.4 37.0 74.5 37.7Q74.5 38.3 73.8 38.7Q74.9 40.2 74.8 41.3Q74.6 42.0 73.2 42.2Q74.1 43.9 73.9 44.9Q73.5 45.5 72.0 45.4Q72.1 46.8 71.7 47.7Q71.3 48.3 70.2 48.5Q70.8 50.0 70.5 50.7Q70.0 50.9 68.7 50.2Q68.6 51.6 68.0 52.3Q67.2 52.7 65.9 52.5Q66.0 54.5 65.5 55.5Q64.9 55.9 63.8 55.1Q63.2 56.8 62.4 57.7Q61.2 58.2 59.8 58.1Q59.3 59.3 58.7 59.9Q57.7 60.1 56.5 59.5Q56.0 61.0 55.5 61.4Q54.7 61.2 53.8 59.9Q52.4 60.8 51.2 60.6Q49.8 60.0 48.5 58.4Q47.5 58.8 46.5 58.5Q45.9 57.8 45.4 56.4Q44.3 57.1 43.4 57.1Q42.7 56.8 42.3 55.8Q41.1 56.2 40.3 56.1Q39.5 55.5 39.0 54.4Q38.1 54.7 37.5 54.4Q37.0 53.7 36.9 52.4Q35.5 52.8 35.0 52.3Q34.7 51.3 35.3 49.3Q34.4 48.8 34.2 47.9Q34.2 46.5 34.8 44.7Q34.1 44.5 34.0 44.0Q34.1 43.1 34.9 41.9Q33.4 41.9 32.9 41.4Q32.8 40.5 33.7 39.1Q32.2 38.7 31.5 38.2Q31.2 37.4 31.6 36.4Q30.5 35.9 30.2 35.4Q29.9 34.6 30.5 33.7Q29.3 32.8 29.1 32.0Q29.2 30.9 30.4 29.8Q29.6 29.0 29.7 28.3Q30.0 27.4 31.2 26.7Q30.9 25.6 31.2 24.9Q31.7 23.9 32.9 23.3Q32.3 22.3 32.5 21.7Q32.9 21.0 33.9 20.7Q33.4 19.4 33.7 18.6Q34.1 17.7 35.2 17.3Q34.7 15.8 35.1 15.2Q35.6 14.5 37.0 14.6Q37.2 13.1 37.9 12.5Q38.5 11.8 39.7 11.8Q39.8 10.7 40.4 10.3Q41.2 9.7 42.4 9.9Q42.8 8.6 43.7 8.4Q44.4 8.1 45.6 8.9Q46.4 8.1 47.4 8.1Q48.7 8.0 50.3 8.7Q51.3 7.4 52.4 7.3Q53.1 7.0 53.8 7.8Q54.9 7.0 56.0 7.0Q56.6 7.0 57.2 7.7Q58.4 6.8 59.3 7.0Q60.1 7.1 60.6 8.4Q61.5 8.0 62.0 8.4Q62.8 8.8 63.2 10.0Q64.3 10.1 65.0 10.8Q65.4 11.5 65.5 12.7Q66.5 12.9 67.1 13.8Q67.5 14.6 67.3 16.0Q68.7 15.9 69.4 16.3Q69.9 16.7 69.8 17.6Q71.5 17.8 72.5 18.5Q73.5 19.0 73.7 20.2Q74.8 20.5 75.3 21.2Q75.6 21.8 75.2 22.7Q76.0 23.6 76.2 24.7Q76.3 25.7 75.6 26.9Q76.5 27.5 76.4 28.3Q76.2 28.9 75.0 29.7Q75.9 30.6 75.7 31.6Q75.3 32.2 73.8 33.0Z";
  var BIRCH_LIMBS = "M48.6 31Q47.5 27 46 23M48.6 33Q51 29 53 25.5M48.4 38Q43 34 39.5 32M56 45Q60.5 41 64 39M55.8 47Q57.5 42 58 37";
  var BIRCH_CROWN = [[0,14.3,"M62.1 14.3Q63.5 15.5 63.8 16.5Q63.8 17.2 62.7 17.6Q63.0 19.0 62.4 19.9Q61.3 20.3 59.3 20.3Q59.0 21.3 58.2 21.7Q57.5 21.8 56.4 21.2Q55.9 22.3 55.2 22.6Q54.4 22.5 53.4 21.7Q52.7 22.7 52.1 22.8Q51.2 22.6 50.3 21.6Q49.3 22.7 48.8 22.9Q48.5 22.4 48.7 21.0Q47.2 21.5 46.2 21.4Q45.7 20.9 45.8 19.9Q43.8 19.7 42.9 19.1Q42.5 18.1 43.2 16.6Q42.3 15.8 42.6 15.0Q42.9 13.8 44.4 12.6Q43.5 11.8 43.7 11.3Q44.3 10.6 46.0 10.3Q45.6 9.1 46.0 8.6Q46.8 7.9 48.3 8.0Q48.5 6.9 49.1 6.6Q50.0 6.2 51.1 6.6Q51.5 5.8 51.9 5.9Q52.5 6.0 53.2 6.9Q54.4 6.1 55.4 6.3Q56.3 6.3 56.8 7.4Q57.8 7.3 58.3 7.8Q58.9 8.1 59.0 9.0Q60.7 9.3 61.4 10.2Q61.8 10.8 61.4 11.9Q62.5 12.4 62.8 13.2Q62.9 13.7 62.1 14.3Z"],[1,13.3,"M60.8 13.4Q61.6 14.4 61.3 15.3Q60.8 15.8 59.4 16.1Q59.8 17.5 59.3 18.3Q58.4 18.7 56.7 18.5Q56.6 19.7 56.2 20.2Q55.6 20.3 54.6 19.7Q53.6 20.6 52.5 20.9Q51.8 20.7 51.1 19.8Q50.1 20.8 49.5 20.9Q49.0 20.5 48.8 19.2Q47.8 19.6 47.3 19.5Q46.6 19.1 46.5 18.1Q44.9 17.7 44.3 16.9Q43.9 15.7 44.3 14.1Q43.0 13.8 42.8 13.4Q42.7 12.8 43.6 12.2Q43.2 11.1 43.5 10.3Q44.0 9.4 45.2 8.6Q45.2 7.6 46.1 7.5Q47.2 7.1 49.0 7.5Q49.2 6.3 49.7 6.2Q50.3 5.9 51.3 6.8Q52.1 5.7 52.7 5.9Q53.4 5.9 54.1 7.2Q55.2 6.5 55.7 6.7Q56.5 6.8 56.7 7.8Q58.3 7.7 59.2 8.2Q59.9 8.5 59.8 9.4Q61.1 10.3 61.4 11.5Q61.7 12.3 60.8 13.4Z"],[2,11.3,"M53.8 11.0Q54.0 11.9 53.5 12.6Q53.1 13.0 52.1 13.3Q51.8 14.0 51.3 14.2Q50.7 14.2 49.9 13.7Q49.4 14.6 49.1 14.7Q48.8 14.5 48.6 13.5Q47.4 13.8 46.8 13.7Q46.2 13.4 46.1 12.6Q45.4 12.2 45.5 11.7Q45.7 10.9 46.7 10.2Q46.6 9.5 47.0 9.3Q47.5 8.9 48.5 9.0Q48.9 8.1 49.4 8.1Q49.8 8.0 50.3 8.8Q51.2 8.3 51.6 8.5Q51.9 8.7 51.7 9.6Q52.7 9.8 53.2 10.3Q53.8 10.6 53.8 11.0Z"],[0,21.3,"M52.9 21.7Q53.3 22.5 53.0 23.2Q52.6 23.6 51.6 23.9Q52.1 25.3 51.7 26.2Q51.2 26.6 49.9 26.7Q50.0 28.2 49.4 28.8Q48.4 29.0 46.7 28.3Q46.4 29.8 45.8 30.3Q45.2 30.3 44.2 29.3Q43.6 30.9 43.0 31.2Q42.4 31.0 41.8 29.5Q40.8 30.4 40.0 30.5Q38.8 30.2 38.0 29.2Q36.8 29.5 36.2 29.0Q35.8 28.2 36.0 26.6Q34.7 26.5 34.3 25.9Q33.9 24.9 34.5 23.5Q33.3 23.2 33.1 22.8Q33.1 22.0 34.0 21.1Q33.1 20.2 33.0 19.4Q33.0 18.4 33.9 17.6Q33.3 16.6 33.6 16.1Q34.3 15.4 35.9 15.2Q36.0 14.1 36.7 13.5Q37.5 12.9 38.9 12.9Q39.3 11.9 40.0 11.9Q40.7 11.7 41.7 12.4Q42.5 11.4 43.2 11.6Q44.0 11.6 44.8 12.8Q45.8 12.4 46.4 12.8Q47.0 13.2 47.2 14.4Q48.6 13.8 49.3 14.1Q49.7 14.2 49.6 15.0Q51.3 15.1 52.2 15.7Q52.7 16.1 52.2 17.1Q53.2 18.3 53.4 19.5Q53.6 20.5 52.9 21.7Z"],[1,19.8,"M50.4 20.1Q51.0 20.9 51.0 21.7Q50.7 22.1 49.8 22.5Q50.2 23.8 49.8 24.6Q49.3 25.0 48.0 24.8Q47.8 26.4 47.2 27.2Q46.5 27.6 45.4 27.2Q45.0 28.1 44.4 28.3Q43.6 28.1 42.7 27.2Q42.0 28.1 41.5 28.1Q40.7 27.6 40.0 26.2Q38.9 26.9 38.2 26.9Q37.4 26.5 36.9 25.4Q35.5 25.2 34.6 24.7Q34.2 23.8 34.4 22.5Q33.1 21.9 32.8 21.2Q32.7 20.1 33.4 19.0Q32.7 18.1 32.9 17.5Q33.2 16.7 34.3 16.1Q34.0 15.2 34.4 14.8Q35.0 14.2 36.5 14.2Q36.5 13.4 37.1 13.3Q37.9 13.1 39.3 13.6Q39.8 12.6 40.5 12.4Q41.3 12.1 42.3 12.5Q43.2 11.4 43.9 11.4Q44.7 11.2 45.3 12.2Q46.5 11.9 47.1 12.5Q47.7 12.9 47.7 14.1Q48.8 14.5 49.4 15.2Q50.0 15.7 50.0 16.6Q50.9 17.5 51.1 18.4Q51.1 19.2 50.4 20.1Z"],[2,17.6,"M44.0 17.5Q44.5 18.3 44.3 18.8Q43.7 19.1 42.3 19.1Q42.6 20.3 42.4 20.7Q41.8 20.8 40.6 20.1Q40.2 21.0 39.7 21.2Q39.3 21.0 38.8 20.2Q38.0 20.6 37.5 20.6Q37.2 20.3 37.3 19.4Q36.0 19.5 35.6 19.3Q35.3 18.8 35.9 17.9Q35.1 17.1 35.2 16.6Q35.5 15.8 36.7 15.2Q36.6 14.6 37.1 14.5Q37.7 14.3 38.9 14.7Q39.3 14.1 39.8 14.2Q40.2 14.2 40.7 14.9Q41.6 14.3 42.0 14.5Q42.4 14.5 42.3 15.2Q43.4 15.7 43.8 16.3Q44.2 16.8 44.0 17.5Z"],[0,20.9,"M72.7 21.0Q73.3 21.7 73.1 22.4Q72.7 22.8 71.6 23.0Q72.1 24.3 71.9 25.2Q71.6 25.8 70.5 25.9Q70.5 27.4 70.0 28.3Q69.3 28.8 68.0 28.6Q67.2 29.7 66.3 30.0Q65.4 30.0 64.4 29.2Q64.0 30.6 63.5 30.8Q63.1 30.4 62.6 28.7Q61.4 29.9 60.6 30.1Q60.0 29.7 59.7 28.3Q58.5 28.8 57.9 28.6Q57.3 28.0 57.4 26.5Q55.6 26.7 54.8 26.2Q54.4 25.3 55.0 23.7Q53.8 23.1 53.4 22.4Q53.2 21.4 53.9 20.3Q53.2 19.2 53.3 18.4Q53.5 17.3 54.3 16.4Q54.1 15.6 54.6 15.2Q55.2 14.7 56.5 14.5Q56.5 13.7 57.0 13.5Q57.7 13.2 59.0 13.5Q59.2 12.5 59.9 12.4Q60.6 12.2 61.7 12.8Q62.7 11.9 63.7 11.7Q64.6 11.4 65.4 12.0Q66.3 11.1 66.9 11.4Q67.3 11.5 67.4 12.7Q69.0 12.3 70.0 12.8Q70.7 13.2 70.6 14.4Q72.2 14.6 72.8 15.4Q73.2 16.0 72.5 17.2Q73.5 18.1 73.6 19.2Q73.6 20.0 72.7 21.0Z"],[1,19.4,"M71.4 19.6Q72.2 20.7 72.1 21.5Q71.9 22.1 70.8 22.5Q70.5 23.7 69.7 24.5Q69.1 25.0 67.9 25.2Q67.6 26.0 67.0 26.2Q66.2 26.1 65.0 25.4Q64.4 26.9 63.7 27.4Q63.0 27.5 62.1 26.6Q61.4 27.6 60.9 27.8Q60.3 27.6 59.9 26.4Q58.6 27.3 58.0 27.2Q57.2 26.6 57.0 25.2Q55.5 25.3 55.0 24.8Q54.4 23.8 54.9 22.1Q53.8 21.6 53.6 20.9Q53.5 19.9 54.3 18.9Q53.4 18.1 53.6 17.5Q53.9 16.7 55.4 16.1Q55.0 15.1 55.3 14.6Q55.9 14.0 57.3 13.8Q57.5 12.7 58.1 12.2Q58.5 11.6 59.4 11.7Q60.2 11.1 61.2 11.2Q62.1 11.3 63.2 12.0Q63.9 11.4 64.5 11.6Q65.2 11.8 65.7 12.8Q66.9 12.5 67.6 12.9Q68.3 13.1 68.5 14.1Q70.0 14.1 70.6 14.6Q71.0 15.0 70.5 15.9Q71.9 16.8 72.2 17.9Q72.3 18.6 71.4 19.6Z"],[2,17.0,"M63.8 16.5Q64.8 17.4 64.8 18.2Q64.7 18.6 63.8 18.9Q63.9 19.8 63.4 20.2Q62.6 20.2 61.1 19.6Q60.7 20.5 60.3 20.6Q59.9 20.4 59.4 19.5Q58.2 20.1 57.6 20.1Q57.0 19.8 57.0 18.8Q55.8 18.8 55.4 18.6Q55.3 18.1 56.0 17.3Q55.6 16.6 56.1 16.2Q56.6 15.6 58.1 15.1Q58.0 14.3 58.4 14.2Q58.7 13.9 59.5 14.2Q59.8 13.5 60.2 13.5Q60.6 13.4 60.9 14.1Q61.9 13.5 62.5 13.7Q62.9 13.8 62.8 14.6Q63.6 14.9 63.9 15.4Q64.1 15.8 63.8 16.5Z"],[0,33.7,"M45.5 33.4Q46.6 34.5 46.7 35.5Q46.8 36.1 45.9 36.6Q46.3 37.7 46.1 38.5Q45.8 39.0 44.8 39.2Q45.0 40.9 44.5 41.7Q43.8 42.0 42.2 41.5Q41.7 42.9 40.8 43.4Q40.1 43.5 39.1 42.9Q38.3 44.0 37.6 44.2Q36.6 43.8 35.6 42.4Q34.5 43.3 33.9 43.2Q33.4 42.6 33.3 41.0Q32.0 41.3 31.3 41.0Q30.7 40.3 30.7 39.0Q29.4 39.1 28.8 38.7Q28.6 38.0 29.0 37.0Q27.6 36.5 27.4 35.8Q27.4 34.8 28.5 33.5Q28.0 32.8 28.2 32.3Q28.6 31.5 29.7 30.9Q29.3 29.9 29.5 29.4Q29.9 28.6 30.9 28.2Q30.5 26.7 31.0 26.1Q31.6 25.4 33.0 25.5Q33.3 24.3 33.9 24.0Q34.5 23.6 35.4 24.2Q36.1 23.3 36.9 23.3Q38.0 23.2 39.1 24.0Q40.4 23.4 41.4 23.6Q42.0 23.8 42.3 24.8Q43.6 25.0 44.3 25.9Q44.7 26.6 44.5 28.0Q45.3 28.3 45.5 28.9Q45.5 29.4 45.0 30.3Q45.9 31.0 46.1 31.9Q46.2 32.6 45.5 33.4Z"],[1,32.2,"M45.0 32.6Q46.0 33.9 45.8 34.8Q45.5 35.3 43.9 35.5Q44.2 36.7 43.8 37.5Q43.4 37.9 42.3 37.8Q42.3 39.2 41.7 39.9Q40.9 40.2 39.5 39.7Q38.9 41.1 38.1 41.5Q37.3 41.2 36.3 39.9Q35.5 41.3 34.9 41.5Q34.3 41.1 34.0 39.5Q32.8 39.9 32.0 39.6Q31.0 39.0 30.4 37.7Q29.0 38.1 28.6 37.8Q28.3 37.1 29.0 35.7Q28.4 35.2 28.5 34.5Q28.7 33.6 29.6 32.5Q28.9 31.6 28.9 30.9Q29.0 29.9 29.8 29.2Q29.3 27.9 29.6 27.3Q30.0 26.5 31.3 26.3Q31.8 25.2 32.6 24.8Q33.2 24.3 34.2 24.5Q34.7 23.6 35.3 23.4Q35.8 23.2 36.4 23.8Q37.5 23.0 38.4 23.2Q39.3 23.4 39.9 24.6Q41.0 24.6 41.6 25.3Q42.2 25.9 42.2 27.3Q43.2 27.5 43.4 28.2Q43.7 28.7 43.3 29.6Q44.6 30.3 45.1 31.2Q45.4 31.9 45.0 32.6Z"],[2,29.8,"M38.4 29.9Q38.5 30.7 38.1 31.3Q37.7 31.6 36.7 31.6Q36.8 33.0 36.6 33.6Q36.2 33.7 35.3 33.0Q34.6 33.8 34.1 33.8Q33.3 33.3 32.8 32.0Q31.6 32.3 31.2 32.1Q30.9 31.6 31.3 30.6Q30.5 30.0 30.4 29.5Q30.4 28.8 31.1 28.1Q31.0 27.3 31.6 27.0Q32.0 26.6 33.1 26.7Q33.6 25.9 34.3 25.9Q34.8 25.8 35.4 26.5Q36.2 26.3 36.7 26.6Q37.2 26.7 37.5 27.4Q38.5 27.9 38.9 28.6Q39.0 29.1 38.4 29.9Z"],[0,33.5,"M76.1 33.5Q76.9 34.4 76.9 35.2Q76.8 35.6 75.8 35.8Q76.7 37.5 76.6 38.5Q76.4 39.0 75.1 38.9Q75.0 40.6 74.3 41.4Q73.7 41.7 72.4 41.2Q72.0 42.6 71.4 43.3Q70.6 43.6 69.6 43.1Q68.8 43.8 68.0 43.7Q67.1 43.3 66.2 42.2Q65.6 42.8 65.2 42.7Q64.7 42.2 64.4 41.0Q63.3 41.3 62.8 40.8Q62.5 39.8 62.8 38.1Q61.4 38.3 60.9 38.0Q60.5 37.3 60.9 36.1Q59.7 35.5 59.4 34.7Q59.3 33.6 60.1 32.4Q59.4 31.9 59.4 31.5Q59.5 31.0 60.4 30.5Q59.8 29.4 60.2 28.9Q60.6 28.0 62.1 27.8Q61.7 26.4 62.0 25.9Q62.6 25.1 63.8 25.2Q64.1 24.3 64.7 24.1Q65.5 23.8 66.5 24.3Q67.2 23.3 68.0 23.3Q68.8 23.2 69.6 23.9Q71.1 23.5 72.2 23.9Q73.1 24.2 73.7 25.3Q75.0 24.9 75.5 25.5Q76.1 25.8 75.8 27.1Q76.6 27.7 76.6 28.6Q76.6 29.4 75.9 30.6Q77.1 31.4 77.3 32.3Q77.2 32.8 76.1 33.5Z"],[1,31.6,"M75.2 31.8Q76.3 32.9 76.3 33.8Q76.1 34.3 74.7 34.5Q75.4 36.1 75.1 37.0Q74.5 37.4 73.0 37.1Q73.0 38.4 72.5 39.1Q72.0 39.4 71.1 39.0Q70.1 39.9 69.0 40.2Q68.2 40.1 67.3 39.2Q66.5 40.6 66.0 40.9Q65.4 40.7 65.0 39.4Q63.5 39.9 62.6 39.7Q61.8 38.9 61.6 37.3Q60.3 37.4 60.1 36.9Q60.0 35.9 61.0 34.2Q59.6 33.8 59.5 33.2Q59.5 32.3 60.7 31.1Q59.9 30.6 59.9 30.2Q60.1 29.6 61.1 29.2Q60.3 28.0 60.5 27.4Q60.9 26.5 62.2 26.3Q62.0 25.1 62.3 24.7Q63.0 24.2 64.4 24.6Q65.3 23.4 66.4 23.0Q67.2 22.5 68.2 22.9Q69.0 22.3 69.6 22.8Q70.4 23.2 71.0 24.7Q72.0 24.5 72.4 25.0Q72.8 25.5 72.6 26.7Q73.7 26.8 74.2 27.3Q74.4 27.7 74.0 28.5Q75.5 29.2 75.9 30.2Q76.1 30.9 75.2 31.8Z"],[2,29.2,"M69.0 29.5Q69.7 30.5 69.6 31.2Q69.2 31.5 68.1 31.4Q68.0 32.4 67.4 32.7Q66.9 32.5 65.9 31.5Q65.1 32.8 64.7 33.1Q64.2 33.0 64.1 31.9Q63.2 32.1 62.7 31.9Q62.5 31.3 62.7 30.4Q61.8 29.9 61.8 29.4Q61.9 28.6 63.0 27.8Q62.6 27.0 62.8 26.7Q63.2 26.3 64.2 26.3Q64.7 25.6 65.3 25.5Q65.8 25.4 66.4 25.9Q67.3 25.5 67.8 25.8Q68.1 26.0 68.0 27.1Q69.2 27.6 69.5 28.3Q69.7 28.8 69.0 29.5Z"],[0,27.6,"M64.2 26.6Q64.6 27.6 64.3 28.6Q63.9 29.2 62.8 29.9Q63.3 31.3 62.9 32.3Q62.3 32.9 60.7 33.0Q60.9 34.2 60.5 34.9Q59.8 35.1 58.4 34.7Q58.0 36.5 57.2 37.3Q56.6 37.6 55.4 36.8Q55.0 37.9 54.4 38.1Q53.9 37.9 53.3 36.6Q52.3 37.4 51.3 37.3Q50.5 36.8 49.8 35.3Q48.8 36.5 48.3 36.6Q47.9 36.1 48.1 34.5Q46.5 34.8 45.5 34.5Q44.8 33.9 44.7 32.6Q43.2 32.5 42.5 32.1Q42.1 31.3 42.5 30.2Q41.1 30.0 40.9 29.6Q41.0 28.7 42.2 27.6Q41.4 26.5 41.4 25.5Q41.5 24.2 42.4 23.1Q41.9 22.3 42.2 21.9Q42.8 21.3 44.1 21.1Q44.2 20.2 44.9 19.8Q45.7 19.2 47.0 19.2Q47.4 18.6 48.1 18.6Q49.0 18.6 50.3 19.1Q51.0 17.8 51.8 17.7Q52.4 17.5 53.1 18.4Q53.8 17.3 54.4 17.3Q55.2 17.1 55.8 18.0Q57.4 17.3 58.5 17.6Q59.3 17.8 59.6 19.1Q60.7 19.1 61.1 19.6Q61.6 20.0 61.6 21.0Q62.7 21.3 63.2 22.0Q63.3 22.5 62.7 23.4Q64.1 24.2 64.5 25.1Q64.9 25.8 64.2 26.6Z"],[1,26.0,"M61.7 25.9Q62.2 27.0 61.9 28.0Q61.5 28.6 60.2 29.1Q60.5 30.1 60.2 30.8Q59.9 31.1 59.0 31.1Q59.1 32.5 58.7 33.3Q57.9 33.6 56.6 33.4Q56.3 34.7 55.6 35.1Q55.0 34.8 54.0 33.6Q53.5 34.4 52.9 34.6Q52.2 34.3 51.4 33.4Q50.4 34.1 49.6 34.0Q48.6 33.6 47.8 32.5Q46.6 32.9 46.0 32.8Q45.5 32.3 45.5 31.2Q44.0 31.1 43.4 30.6Q42.9 29.8 43.2 28.4Q41.5 28.2 41.0 27.8Q40.9 27.0 41.9 26.0Q41.0 24.9 41.1 24.0Q41.4 22.8 42.7 21.8Q42.6 21.0 43.1 20.6Q44.2 20.1 45.8 19.9Q45.8 19.1 46.4 19.0Q47.2 18.8 48.6 19.2Q48.8 18.3 49.4 18.1Q49.8 17.9 50.5 18.3Q50.9 17.1 51.5 17.1Q52.2 16.9 53.1 17.9Q54.3 17.1 55.1 17.3Q56.0 17.4 56.6 18.6Q58.0 18.1 58.5 18.6Q59.2 18.8 59.1 20.0Q60.7 20.1 61.3 20.9Q61.9 21.4 61.5 22.4Q62.7 23.3 62.8 24.3Q62.8 25.0 61.7 25.9Z"],[2,23.4,"M53.4 23.5Q53.8 24.4 53.6 25.0Q53.4 25.4 52.6 25.6Q52.9 26.6 52.5 26.9Q51.9 26.8 50.7 26.1Q50.1 26.7 49.5 26.8Q49.0 26.6 48.5 25.9Q47.8 26.7 47.4 26.8Q47.2 26.5 47.3 25.7Q45.9 26.1 45.2 26.0Q44.6 25.5 44.8 24.5Q44.0 23.9 44.0 23.2Q44.1 22.4 45.1 21.5Q44.9 21.2 45.3 21.1Q46.0 21.0 47.2 21.1Q47.3 20.4 47.7 20.2Q48.2 20.0 49.1 20.4Q49.8 19.9 50.3 19.9Q50.7 19.9 50.9 20.5Q51.8 20.3 52.2 20.5Q52.8 20.6 52.9 21.1Q53.6 21.7 53.8 22.3Q53.9 22.9 53.4 23.5Z"],[-1],[0,46.4,"M50.6 45.9Q51.5 47.0 51.5 48.0Q51.4 48.6 50.3 49.1Q50.4 50.1 49.7 50.8Q49.1 51.1 47.8 51.1Q48.1 52.6 47.6 53.3Q47.0 53.5 45.6 52.9Q44.9 54.3 43.9 55.0Q43.2 55.2 42.3 54.6Q41.5 55.6 40.8 56.0Q40.0 55.9 39.2 55.2Q37.8 56.0 36.9 55.8Q36.3 55.0 36.1 53.2Q35.0 53.8 34.5 53.7Q34.2 53.2 34.5 52.1Q32.8 52.1 32.2 51.4Q31.7 50.2 32.2 48.5Q31.3 47.9 31.1 47.2Q31.1 46.3 31.7 45.3Q30.9 44.6 31.1 44.1Q31.3 43.4 32.6 42.9Q31.9 41.5 32.1 40.8Q32.5 39.8 33.8 39.5Q33.8 38.2 34.6 37.9Q35.4 37.4 37.1 37.8Q37.1 36.9 37.4 36.9Q38.0 36.8 38.9 37.5Q39.4 36.8 40.1 37.0Q41.1 37.2 42.1 38.5Q43.3 37.6 44.2 37.6Q44.9 37.5 45.3 38.4Q46.6 38.1 47.2 38.6Q48.1 39.0 48.2 40.2Q49.8 40.6 50.4 41.4Q50.9 42.1 50.3 43.2Q51.4 43.9 51.5 44.7Q51.5 45.2 50.6 45.9Z"],[1,44.3,"M48.8 44.3Q49.6 45.5 49.5 46.5Q49.2 47.2 48.0 47.8Q48.6 49.3 48.3 50.1Q47.7 50.5 46.3 50.3Q46.3 51.9 45.6 52.5Q45.0 52.5 43.6 51.6Q42.8 52.5 41.9 52.7Q41.2 52.7 40.3 51.9Q39.5 52.7 38.9 52.6Q38.5 52.2 38.2 51.0Q36.4 51.9 35.2 51.9Q34.5 51.5 34.3 50.3Q33.1 50.2 32.5 49.8Q31.8 49.1 31.7 47.9Q30.9 47.4 30.9 46.6Q31.0 45.7 31.9 44.6Q31.2 43.9 31.2 43.4Q31.4 42.7 32.4 42.1Q31.8 40.9 32.4 40.4Q33.0 39.7 34.6 39.6Q34.8 38.4 35.6 38.0Q36.2 37.6 37.4 37.9Q37.9 36.8 38.6 36.8Q39.0 36.6 39.7 37.4Q40.6 36.2 41.3 36.1Q42.1 35.9 42.7 36.9Q44.0 36.9 44.8 37.5Q45.4 38.1 45.6 39.3Q47.3 39.6 47.9 40.5Q48.2 41.1 47.5 42.3Q48.7 42.8 49.1 43.4Q49.3 43.8 48.8 44.3Z"],[2,42.8,"M41.8 42.9Q42.0 43.6 41.6 44.1Q41.2 44.3 40.1 44.3Q40.0 45.3 39.5 45.7Q39.1 45.9 38.4 45.5Q38.0 46.3 37.7 46.4Q37.4 46.1 37.1 45.0Q36.3 45.4 35.9 45.3Q35.3 45.0 35.1 44.2Q33.9 43.9 33.4 43.5Q33.2 42.8 33.9 41.9Q33.5 41.3 33.8 40.9Q34.2 40.4 35.1 40.2Q35.0 39.6 35.3 39.6Q35.8 39.5 36.8 40.0Q37.3 39.3 37.8 39.2Q38.2 39.1 38.7 39.7Q39.6 39.3 40.1 39.5Q40.4 39.6 40.3 40.2Q41.3 40.8 41.7 41.5Q42.0 42.1 41.8 42.9Z"],[0,46.0,"M74.3 45.8Q75.7 47.3 75.8 48.5Q75.8 49.4 74.5 49.9Q74.7 51.1 74.3 51.9Q73.4 52.2 71.8 52.0Q71.6 53.1 71.0 53.5Q70.5 53.6 69.5 53.1Q69.0 54.2 68.2 54.6Q67.6 54.5 66.8 53.7Q66.1 55.2 65.3 55.6Q64.3 55.6 63.4 54.6Q62.6 55.8 62.2 55.9Q61.8 55.4 61.7 53.8Q60.3 54.1 59.4 53.8Q58.6 53.1 58.3 51.7Q57.0 52.0 56.7 51.7Q56.5 50.9 57.2 49.6Q55.8 49.0 55.5 48.3Q55.4 47.1 56.5 45.7Q55.6 44.9 55.8 44.3Q56.4 43.4 58.1 42.8Q57.6 41.9 57.7 41.4Q57.9 40.7 58.8 40.5Q58.6 39.3 59.0 38.8Q59.7 38.2 60.9 38.2Q61.3 37.2 61.9 36.9Q62.7 36.5 63.9 36.9Q64.6 36.1 65.4 36.3Q65.8 36.5 66.3 37.8Q67.4 37.0 68.1 37.3Q68.8 37.3 69.2 38.3Q70.5 38.5 71.3 39.2Q72.1 39.8 72.3 41.0Q73.8 41.1 74.3 41.8Q74.5 42.2 73.8 43.1Q75.0 43.7 75.2 44.5Q75.2 45.1 74.3 45.8Z"],[1,45.1,"M73.0 45.4Q74.1 46.4 74.1 47.2Q74.0 47.7 72.7 47.8Q73.0 49.2 72.2 50.0Q71.5 50.2 69.7 49.8Q70.0 51.4 69.6 51.9Q69.1 51.9 67.9 50.9Q67.1 52.3 66.2 52.9Q65.6 53.0 64.7 52.1Q63.9 53.6 63.4 53.9Q62.7 53.6 62.1 52.2Q60.6 52.8 59.7 52.5Q58.9 51.6 58.7 49.8Q57.5 50.2 57.2 50.1Q57.0 49.5 57.7 48.3Q56.2 48.0 55.9 47.3Q55.7 46.3 56.7 44.9Q56.1 44.2 56.3 43.5Q56.7 42.7 57.9 42.0Q57.3 40.9 57.4 40.2Q57.8 39.4 58.8 39.1Q58.5 37.8 58.9 37.5Q59.6 37.1 61.1 37.6Q61.5 36.4 62.3 36.4Q63.1 36.3 64.3 37.4Q65.4 36.4 66.4 36.7Q67.0 36.8 67.3 38.2Q68.4 38.0 69.1 38.4Q69.9 38.6 70.2 39.5Q71.8 39.7 72.4 40.4Q72.9 41.0 72.4 42.1Q73.4 42.9 73.6 43.8Q73.7 44.6 73.0 45.4Z"],[2,42.8,"M66.5 43.0Q66.6 43.6 66.1 44.1Q65.7 44.3 64.7 44.3Q64.5 45.4 63.9 45.9Q63.4 46.0 62.6 45.3Q61.8 46.3 61.4 46.5Q61.0 46.2 60.8 45.0Q59.8 45.4 59.4 45.3Q59.0 44.9 59.2 44.0Q58.6 43.3 58.6 42.6Q58.6 41.7 59.2 40.8Q59.4 40.2 60.0 40.0Q60.4 39.7 61.3 39.8Q61.5 39.1 61.9 39.1Q62.2 39.1 62.6 39.8Q63.4 39.2 63.9 39.3Q64.3 39.4 64.5 40.2Q65.9 40.7 66.5 41.5Q66.9 42.2 66.5 43.0Z"],[0,50.0,"M63.3 50.3Q63.6 51.1 63.2 51.9Q62.6 52.4 61.3 52.7Q61.8 53.9 61.4 54.6Q60.8 54.9 59.2 54.6Q59.4 56.0 59.1 56.7Q58.3 56.9 57.0 56.5Q56.9 58.2 56.2 58.7Q55.7 58.7 54.7 57.5Q54.1 58.8 53.4 58.9Q52.4 58.5 51.5 56.9Q50.4 57.9 49.8 58.0Q49.2 57.6 49.0 56.2Q48.0 56.7 47.5 56.7Q47.0 56.3 46.9 55.3Q45.4 55.2 44.7 54.6Q43.9 53.7 43.9 52.2Q43.0 51.7 42.8 51.0Q42.7 50.1 43.4 49.1Q42.2 48.2 42.2 47.4Q42.3 46.4 43.6 45.7Q42.8 44.7 43.1 44.3Q43.7 43.7 45.4 43.6Q46.1 42.9 47.3 42.7Q48.2 42.4 49.6 42.6Q49.7 41.7 50.2 41.8Q50.8 41.8 51.7 42.7Q52.3 41.5 53.0 41.5Q53.6 41.3 54.1 42.2Q55.4 41.2 56.4 41.4Q57.1 41.5 57.4 42.6Q58.5 42.2 59.0 42.5Q59.6 42.7 59.4 43.6Q61.2 44.0 62.0 44.9Q62.7 45.5 62.5 46.7Q63.5 47.6 63.8 48.6Q63.9 49.4 63.3 50.3Z"],[1,48.5,"M61.4 48.3Q62.4 49.2 62.2 50.0Q61.8 50.5 60.2 50.7Q60.5 52.0 60.0 52.9Q59.2 53.4 57.7 53.4Q57.5 54.3 56.9 54.6Q55.9 54.6 54.5 54.0Q54.3 55.1 53.9 55.5Q53.3 55.5 52.6 54.8Q51.7 55.9 51.1 56.1Q50.2 55.9 49.4 54.8Q48.2 55.3 47.4 55.1Q46.9 54.5 46.8 53.3Q45.6 53.7 45.2 53.5Q44.9 52.8 45.5 51.6Q43.9 51.3 43.4 50.8Q42.9 49.9 43.5 48.7Q42.7 47.7 42.8 46.8Q43.1 45.7 44.1 44.8Q43.8 43.8 44.5 43.5Q45.2 43.0 46.9 43.0Q47.2 42.0 47.9 41.7Q48.6 41.3 49.8 41.6Q50.2 40.8 50.9 41.0Q51.3 41.0 51.9 41.9Q52.6 41.1 53.2 41.2Q53.7 41.3 54.1 42.3Q55.4 41.9 56.3 42.1Q57.2 42.2 57.6 43.0Q59.1 42.9 60.0 43.2Q60.4 43.5 60.2 44.1Q61.9 45.0 62.4 46.2Q62.5 47.1 61.4 48.3Z"],[2,46.5,"M54.2 46.7Q54.3 47.4 53.8 47.9Q53.3 48.1 52.3 48.2Q52.3 49.2 51.8 49.5Q51.2 49.5 50.1 48.6Q49.7 49.7 49.3 49.9Q48.9 49.7 48.6 48.7Q47.5 49.2 47.0 49.3Q46.4 49.1 46.4 48.4Q45.4 48.1 45.2 47.6Q45.2 46.9 45.9 46.0Q45.6 45.4 45.9 45.0Q46.3 44.4 47.2 44.1Q47.3 43.6 47.7 43.6Q48.2 43.5 48.9 43.9Q49.5 43.2 50.0 43.3Q50.3 43.3 50.6 44.0Q51.4 43.6 51.8 43.8Q52.1 44.0 51.9 44.8Q53.4 45.2 54.2 45.8Q54.6 46.2 54.2 46.7Z"],[0,38.5,"M59.4 38.2Q60.1 39.3 60.0 40.3Q59.7 41.0 58.7 41.5Q59.4 42.7 59.2 43.4Q58.8 43.7 57.7 43.5Q57.9 45.2 57.4 45.8Q56.6 46.0 55.1 45.2Q55.1 46.9 54.6 47.5Q53.7 47.4 52.4 46.1Q51.5 47.0 50.6 47.2Q49.4 47.0 48.3 46.1Q47.1 46.8 46.5 46.5Q45.9 45.6 45.9 43.8Q44.7 44.4 44.4 44.4Q44.1 43.9 44.6 42.7Q43.2 42.4 42.5 41.7Q42.1 40.8 42.3 39.6Q40.8 38.9 40.4 38.2Q40.3 37.2 41.3 36.2Q41.2 35.2 41.9 34.6Q42.5 33.7 43.9 33.2Q44.0 32.1 44.7 31.7Q45.3 31.1 46.6 31.1Q46.8 30.1 47.5 30.0Q47.9 29.8 48.9 30.5Q49.6 29.6 50.5 29.6Q51.1 29.5 51.9 30.3Q52.8 29.6 53.4 29.9Q54.3 30.0 54.9 30.9Q56.2 30.2 56.9 30.4Q57.4 30.4 57.3 31.4Q58.4 31.7 58.8 32.4Q59.4 33.0 59.3 34.1Q60.1 35.0 60.2 36.2Q60.1 37.1 59.4 38.2Z"],[1,37.0,"M57.7 37.3Q58.5 38.4 58.5 39.2Q58.4 39.8 57.5 40.2Q57.7 41.4 57.3 42.0Q56.5 42.3 55.1 42.1Q54.6 43.4 53.8 44.0Q53.2 44.2 52.2 43.7Q51.4 44.6 50.6 44.8Q50.0 44.6 49.4 43.7Q48.6 44.4 48.0 44.3Q47.6 43.9 47.4 42.8Q46.4 43.1 45.7 42.9Q45.0 42.4 44.7 41.3Q43.0 41.1 42.4 40.4Q41.6 39.4 41.7 38.0Q40.8 37.5 40.7 37.0Q40.8 36.3 41.8 35.5Q41.0 34.6 41.4 34.0Q42.1 33.2 43.9 32.8Q43.8 31.4 44.4 31.0Q45.4 30.4 47.1 30.7Q47.5 29.5 48.2 29.4Q48.8 29.1 49.7 30.0Q50.5 29.1 51.1 29.2Q51.6 29.2 52.1 30.0Q53.6 29.2 54.6 29.4Q55.3 29.4 55.4 30.5Q56.4 31.0 56.8 31.9Q57.3 32.6 57.2 33.8Q58.2 34.7 58.4 35.7Q58.4 36.4 57.7 37.3Z"],[2,34.8,"M51.7 35.2Q52.3 35.9 52.1 36.3Q51.7 36.4 50.5 36.2Q50.4 37.2 49.8 37.7Q49.4 37.8 48.5 37.3Q47.9 38.1 47.3 38.1Q46.9 37.8 46.6 36.8Q45.5 37.2 45.0 37.1Q44.6 36.7 44.8 35.8Q43.9 35.2 43.8 34.6Q43.9 33.8 44.8 33.0Q44.8 32.5 45.2 32.3Q45.6 32.1 46.5 32.2Q46.7 31.5 47.1 31.6Q47.6 31.6 48.2 32.4Q49.1 32.0 49.7 32.1Q50.3 32.1 50.4 32.7Q51.6 33.2 52.0 34.0Q52.2 34.5 51.7 35.2Z"]];
  var BIRCH_HI = ["M40.5 16.5Q39.7 17.8 41.4 19.1Q42.0 17.0 40.5 16.5Z","M45.0 14.5Q43.6 15.2 44.5 17.2Q46.0 15.7 45.0 14.5Z","M48.5 9.5Q47.5 10.7 49.0 12.2Q49.9 10.2 48.5 9.5Z","M34.0 29.0Q32.7 29.8 33.8 31.7Q35.1 30.1 34.0 29.0Z","M38.5 41.0Q37.7 42.3 39.4 43.6Q40.0 41.5 38.5 41.0Z","M47.5 22.5Q46.0 23.0 46.6 25.1Q48.3 23.8 47.5 22.5Z","M59.0 15.0Q57.9 16.1 59.2 17.7Q60.3 15.8 59.0 15.0Z","M48.0 34.5Q46.7 35.3 47.8 37.2Q49.1 35.6 48.0 34.5Z"];
  var BIRCH_TWIGS = [[33.5,40.0,"M33.5 40.0Q31.6 40.4 31.0 49.0",[[1,"M32.3 41.3Q32.5 42.6 34.3 42.5Q33.6 40.8 32.3 41.3Z"],[0,"M31.8 43.1Q30.4 43.1 30.4 45.0Q32.2 44.4 31.8 43.1Z"],[1,"M31.3 45.6Q31.2 46.9 33.0 47.2Q32.6 45.5 31.3 45.6Z"],[0,"M31.0 49.0Q29.6 49.0 29.4 50.9Q31.3 50.4 31.0 49.0Z"]]],[35.5,49.0,"M35.5 49.0Q34.4 49.4 34.0 58.5",[[1,"M34.8 50.4Q34.8 51.7 36.6 51.9Q36.1 50.1 34.8 50.4Z"],[0,"M34.5 52.3Q32.8 52.1 32.4 54.3Q34.7 53.9 34.5 52.3Z"],[1,"M34.2 55.0Q34.4 56.5 36.5 56.4Q35.6 54.4 34.2 55.0Z"],[0,"M34.0 58.5Q32.5 58.1 31.9 60.1Q34.0 60.0 34.0 58.5Z"]]],[71.5,39.0,"M71.5 39.0Q73.4 39.4 74.0 48.0",[[1,"M72.7 40.3Q72.4 41.5 74.1 42.0Q73.9 40.3 72.7 40.3Z"],[0,"M73.2 42.1Q71.6 42.1 71.5 44.4Q73.7 43.6 73.2 42.1Z"],[1,"M73.7 44.6Q73.7 46.3 76.0 46.4Q75.3 44.2 73.7 44.6Z"],[0,"M74.0 48.0Q72.5 48.1 72.4 50.2Q74.4 49.5 74.0 48.0Z"]]],[69.0,50.0,"M69.0 50.0Q70.1 50.4 70.5 59.5",[[1,"M69.7 51.4Q69.6 52.9 71.7 53.3Q71.2 51.1 69.7 51.4Z"],[0,"M70.0 53.3Q68.4 53.1 68.0 55.4Q70.3 54.9 70.0 53.3Z"],[1,"M70.3 56.0Q69.9 57.4 71.9 58.1Q71.8 56.0 70.3 56.0Z"],[0,"M70.5 59.5Q68.9 59.1 68.2 61.2Q70.4 61.1 70.5 59.5Z"]]],[46.0,55.0,"M46.0 55.0Q45.6 55.0 45.5 62.0",[[1,"M45.8 55.9Q45.8 57.4 48.0 57.5Q47.3 55.5 45.8 55.9Z"],[0,"M45.6 58.2Q44.0 57.7 43.2 59.9Q45.5 59.9 45.6 58.2Z"],[1,"M45.5 62.0Q45.3 63.5 47.4 64.0Q47.0 61.9 45.5 62.0Z"]]],[60.0,55.5,"M60.0 55.5Q60.6 55.6 60.8 63.0",[[0,"M60.4 56.5Q60.5 58.1 62.8 58.0Q61.9 55.9 60.4 56.5Z"],[1,"M60.6 59.0Q59.0 58.8 58.6 61.0Q60.8 60.6 60.6 59.0Z"],[0,"M60.8 63.0Q60.9 64.5 63.0 64.5Q62.2 62.5 60.8 63.0Z"]]]];
  var BIRCH_MARKS = [[47.5, 85, 1.6], [47.2, 76, 1.8], [47, 68.4, 2.4], [47.5, 61.6, 1.5], [47.9, 54.1, 1.6], [47.2, 45.8, 2.1], [47.2, 37.9, 1.7], [55.2, 85, 1.9], [55.3, 77.9, 1.6], [54.8, 69.9, 1.7], [54.9, 61, 2.1], [55, 52.2, 2]];
  function birchTree(T, h, parts, R, cx, cy, gy, tk, pal) {
    var k = (gy - 22) / 84, f = function (n) { return n.toFixed(2); }, o = '';
    // birch leaves turn yellow as they fall: a few on the ground when dry or drooping
    if (h === 1 || h === 2) for (var lf = 0; lf < (h === 1 ? 5 : 12); lf++) o += '<ellipse cx="' + (cx - 100 + R() * 200).toFixed(1) + '" cy="' + (gy - 1 + R() * 3).toFixed(1) + '" rx="3.4" ry="1.8" fill="' + (h === 1 ? '#D8B84A' : '#B89A3A') + '" transform="rotate(' + Math.round(R() * 60 - 30) + ' ' + cx + ' ' + gy + ')"/>';
    o += '<g transform="translate(' + f(cx - 52 * k) + ' ' + f(gy - 90 * k) + ') scale(' + k.toFixed(4) + ')">';
    var limb = T.limb || '#5A4A3C', edge = T.trunkEdge || '#8A8A84';
    o += '<path d="M48.5 46Q41 40 33 36M50.5 40Q57 34 65 31M47.5 58Q42 54 37 52M52 52Q58 48 64 46" stroke="' + limb + '" stroke-width="1.4" fill="none" stroke-linecap="round"/>';
    if (!pal) o += '<path d="M33 36L29 31M33 36L28 37M65 31L69 25M65 31L70 32M48.6 31L47.6 22M48.6 31L51.4 23M37 52L32 50M64 46L69 43M56 45L57.4 38" stroke="' + limb + '" stroke-width=".9" fill="none" stroke-linecap="round"/>';
    o += '<g fill="' + tk + '" stroke="' + edge + '" stroke-width=".5"><path d="M43.5 90Q46.5 86 46.8 78L47.0 30.0H50.0L50.2 78Q50.5 86 53.5 90Z"/><path d="M51.8 90Q54.3 86 54.5 78L54.7 44.0H57.3L57.5 78Q57.7 86 60.2 90Z"/></g>';
    o += '<g stroke="#2C2C2A" stroke-width=".9" stroke-linecap="round">' + BIRCH_MARKS.map(function (m) { return '<path d="M' + m[0] + ' ' + m[1] + 'h' + m[2] + '"/>'; }).join('') + '</g>';
    // the hanging twigs: each sags from where it leaves the crown (a stretch down, by transform)
    var hang = [1, 1.1, 1.35, 1][h], sag = [0, .8, 2.6, 0][h], dy = function (y) { return sag * (0.4 + (y - 10) / 45); };
    var twig = function (t, i) {
      var s = '<g transform="translate(0 ' + f(dy(t[1])) + ') translate(' + t[0] + ' ' + t[1] + ') scale(1 ' + hang + ') translate(' + (-t[0]) + ' ' + (-t[1]) + ')"><path d="' + t[2] + '" stroke="' + limb + '" stroke-width=".5" fill="none" stroke-linecap="round"/>';
      t[3].forEach(function (l, j) { if (keepIt(1, i * 5 + j)) s += '<path d="' + l[1] + '" fill="' + pal[l[0]] + '"/>'; });
      return s + '</g>';
    };
    if (!pal) return o + '</g>';
    // how much of each layer stays: shade masses always, body, light, and highlight thin as health falls
    var more = 0.9 + 0.1 * Math.min(1, parts / 3);
    var KEEP = { 0: [1, 1, 1], 1: [1, .9, .62], 2: [1, .7, .35], 3: [1, .5, 0] };
    function keepIt(layer, i) { return ((i * 37) % 100) / 100 < KEEP[layer][h] * (layer ? more : 1); }
    var hiC = pal[3] || pal[2];
    o += '<path d="' + BIRCH_SIL + '" fill="' + pal[0] + '"' + (sag ? ' transform="translate(0 ' + f(dy(33)) + ')"' : '') + '/>';
    BIRCH_CROWN.forEach(function (m, i) {
      if (m[0] < 0) { o += '<path d="' + BIRCH_LIMBS + '" stroke="' + tk + '" stroke-width=".8" fill="none" stroke-linecap="round" opacity=".5"/>'; return; }
      if (m[0] && !keepIt(m[0], i)) return;
      o += '<path d="' + m[2] + '" fill="' + pal[m[0]] + '"' + (sag ? ' transform="translate(0 ' + f(dy(m[1])) + ')"' : '') + '/>';
    });
    BIRCH_HI.forEach(function (d, i) { if (keepIt(3, i * 3 + 1)) o += '<path d="' + d + '" fill="' + hiC + '"/>'; });
    o += BIRCH_TWIGS.map(function (t, i) { return twig(t, i); }).join('');
    // catkins, one for each part tended today, when the tree is well
    if (h <= 1) {
      var spots = [[38, 44, .6], [61.5, 39, -.5], [47, 51, .5], [67, 51, -.4], [43, 30, .5], [57, 27, -.4]];
      for (var c = 0; c < Math.min(6, parts); c++) o += '<path d="M' + spots[c][0] + ' ' + spots[c][1] + 'q' + spots[c][2] + ' 2.4 ' + f(spots[c][2] * -.3) + ' 4.8" stroke="' + (T.fruitColor || '#7F6610') + '" stroke-width="1.7" fill="none" stroke-linecap="round"/>';
    }
    return o + '</g>';
  }
  function treeSVG(h, parts, big) {
    var R = rng(41), W = 320, H = 250, gy = 210, cx = 160, cy = 104;
    var T = (C && C.tree) || {};
    var pal = (T.pal || [
      ['#6F5517', '#A88A3A', '#D2B260'],   // thriving, Oak gold
      ['#7C6A3C', '#AE9A64', '#CDBB86'],   // dry
      ['#6B5634', '#8F7445', '#A88D5C']    // drooping
    ]).concat([null])[h];                  // bare
    var keep = [1, .92, .55, 0][h] * (0.9 + 0.1 * Math.min(1, parts / 3)), tall = T.shape === 'tall', layered = T.shape === 'layered', birch = T.shape === 'birch';
    var drop = [0, 2, 9, 0][h];
    var o = '<svg class="gt-tree-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(LINES[h]) + '" xmlns="http://www.w3.org/2000/svg">';
    if (parts >= 6 && h === 0) o += '<circle cx="' + cx + '" cy="' + cy + '" r="112" fill="#F2B33D" opacity=".16"/>';
    // ground: a thin grass line over soil, roots unseen below it
    o += '<rect x="0" y="' + gy + '" width="' + W + '" height="' + (H - gy) + '" fill="#81654B"/><rect x="0" y="' + (gy + 18) + '" width="' + W + '" height="' + (H - gy - 18) + '" fill="#6E543E"/>';
    o += '<path d="M0 ' + gy + 'H' + W + '" stroke="#5E7D3F" stroke-width="3"/>';
    // trunk with its flare into the ground, and the main limbs
    var tk = h === 3 ? (T.trunkBare || '#5A4636') : (T.trunk || '#4E2E12');
    if (layered) return o + layeredTree(T, h, parts, R, cx, cy, gy, tk, pal, drop) + '</svg>';
    if (birch) return o + birchTree(T, h, parts, R, cx, cy, gy, tk, pal) + '</svg>';
    if (tall) {
      // Sequoia: a massive trunk that flares wide at the ground, short limbs, and a narrow, high crown
      o += '<path d="M' + (cx - 44) + ' ' + gy + 'Q' + (cx - 20) + ' ' + (gy - 4) + ' ' + (cx - 17) + ' ' + (gy - 40) + 'L' + (cx - 10) + ' ' + (cy - 70) + 'H' + (cx + 10) + 'L' + (cx + 17) + ' ' + (gy - 40) + 'Q' + (cx + 20) + ' ' + (gy - 4) + ' ' + (cx + 44) + ' ' + gy + 'Z" fill="' + tk + '"/>';
      o += '<path d="M' + (cx - 7) + ' ' + (gy - 4) + 'Q' + (cx - 8) + ' ' + (gy - 60) + ' ' + (cx - 5) + ' ' + (cy - 50) + 'M' + (cx + 6) + ' ' + (gy - 6) + 'Q' + (cx + 7) + ' ' + (gy - 60) + ' ' + (cx + 4) + ' ' + (cy - 50) + 'M' + cx + ' ' + (gy - 2) + 'V' + (cy - 40) + '" stroke="#000" stroke-opacity=".18" stroke-width="2" fill="none"/>';
      o += '<path d="M' + (cx - 9) + ' ' + (cy + 4) + 'l-16 -6M' + (cx + 9) + ' ' + (cy - 10) + 'l17 -6M' + (cx - 9) + ' ' + (cy - 30) + 'l-14 -5M' + (cx + 9) + ' ' + (cy - 48) + 'l13 -5" stroke="' + tk + '" stroke-width="4" stroke-linecap="round"/>';
    } else {
    o += '<path d="M' + (cx - 30) + ' ' + gy + 'Q' + (cx - 14) + ' ' + (gy - 6) + ' ' + (cx - 12) + ' ' + (gy - 36) + 'L' + (cx - 9) + ' ' + (cy + 30) + 'H' + (cx + 9) + 'L' + (cx + 12) + ' ' + (gy - 36) + 'Q' + (cx + 14) + ' ' + (gy - 6) + ' ' + (cx + 30) + ' ' + gy + 'Z" fill="' + tk + '"/>';
    o += '<path d="M' + (cx - 5) + ' ' + (cy + 34) + 'Q' + (cx - 30) + ' ' + (cy + 14) + ' ' + (cx - 66) + ' ' + (cy - 4) + 'M' + (cx + 5) + ' ' + (cy + 32) + 'Q' + (cx + 34) + ' ' + (cy + 12) + ' ' + (cx + 70) + ' ' + (cy - 8) + 'M' + cx + ' ' + (cy + 30) + 'Q' + (cx - 3) + ' ' + (cy - 4) + ' ' + (cx + 4) + ' ' + (cy - 40) + 'M' + (cx - 34) + ' ' + (cy + 12) + 'Q' + (cx - 46) + ' ' + (cy - 14) + ' ' + (cx - 40) + ' ' + (cy - 38) + 'M' + (cx + 38) + ' ' + (cy + 10) + 'Q' + (cx + 50) + ' ' + (cy - 16) + ' ' + (cx + 44) + ' ' + (cy - 36) + '" stroke="' + tk + '" stroke-width="' + (h === 3 ? 5 : 6) + '" fill="none" stroke-linecap="round"/>';
    }
    if (h === 3 && !tall) o += '<path d="M' + (cx - 66) + ' ' + (cy - 4) + 'l-14 -10M' + (cx + 70) + ' ' + (cy - 8) + 'l16 -8M' + (cx + 4) + ' ' + (cy - 40) + 'l-8 -14M' + (cx - 40) + ' ' + (cy - 38) + 'l-10 -10M' + (cx + 44) + ' ' + (cy - 36) + 'l10 -12" stroke="' + tk + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    if (pal) {
      var clumps = [];
      for (var i = 0; i < 95; i++) {
        var a = R() * Math.PI * 2, rr = Math.sqrt(R()), x = cx + Math.cos(a) * rr * 116, y = cy - 18 + Math.sin(a) * rr * 58;
        if (tall) { var yy = R(); y = cy + 20 - yy * 120; x = cx + (R() * 2 - 1) * (16 + 30 * Math.sin(Math.PI * Math.min(1, yy * 1.15))); }
        clumps.push([x, y, (tall ? 10 : 13) + R() * 9, R()]);
      }
      [0, 1, 2].forEach(function (layer) {
        o += '<g fill="' + pal[layer] + '">';
        clumps.forEach(function (c, i) {
          if (c[3] > keep) return;
          var dy = [6, 0, -5][layer] + drop * (0.4 + (c[1] - cy + 70) / 140), r = c[2] * [1.05, .8, .5][layer];
          if (layer === 2 && i % 3) return;
          o += '<circle cx="' + c[0].toFixed(1) + '" cy="' + (c[1] + dy).toFixed(1) + '" r="' + r.toFixed(1) + '"/>';
        });
        o += '</g>';
      });
      // acorns (or bright leaves), one for each part tended today, when the tree is well
      if (h <= 1) for (var k = 0; k < Math.min(6, parts); k++) {
        var ax = tall ? cx - 26 + (k % 3) * 26 : cx - 80 + k * 32 + (k % 2) * 6, ay = tall ? cy + 6 - Math.floor(k / 3) * 44 - (k % 2) * 10 : cy + 36 - (k % 3) * 22;
        if (T.fruit === 'cone') o += '<g transform="translate(' + ax + ' ' + ay + ')"><ellipse rx="4" ry="5.6" fill="' + (T.fruitColor || '#8A5A2B') + '" stroke="#4E2E12" stroke-width=".8"/><path d="M-3.4 -1.6H3.4M-3.6 1.6H3.6" stroke="#4E2E12" stroke-width=".7"/></g>';
        else if (T.fruit === 'leaf') o += '<g transform="translate(' + ax + ' ' + ay + ') rotate(' + (k * 47 % 90 - 45) + ')"><path d="M0 -6C5 -6 7 -1 0 7C-7 -1 -5 -6 0 -6Z" fill="' + (T.fruitColor || '#E8B923') + '" stroke="#8A6A12" stroke-width=".8"/></g>';
        else o += '<g transform="translate(' + ax + ' ' + ay + ')"><ellipse cy="3" rx="4.2" ry="5.4" fill="#8A5A2B"/><path d="M-5 0Q0 -6 5 0Z" fill="#4E3418"/></g>';
      }
    }
    // fallen leaves on the ground when dry or drooping
    if (h === 1 || h === 2) for (var f = 0; f < (h === 1 ? 5 : 14); f++) o += '<ellipse cx="' + (cx - 110 + R() * 220).toFixed(1) + '" cy="' + (gy - 2 + R() * 4).toFixed(1) + '" rx="4" ry="2" fill="' + (h === 1 ? '#B79A55' : '#8F7445') + '" transform="rotate(' + Math.round(R() * 60 - 30) + ' ' + cx + ' ' + gy + ')"/>';
    return o + '</svg>';
  }

  /* ---------- Today ---------- */
  function needProfile(where) {
    if (C && C.lockedHtml) { var lh = C.lockedHtml(where); if (lh) return lh; }   // a tool's own "who's tending" screen (Oak, Rebrand Session 4)
    return '<div class="gt-card gt-empty"><h3>Your tree grows in your profile</h3><p>Daily tending is saved inside a private Grounded profile on this device, locked with a passcode only you know. Nothing is sent anywhere.</p><div class="btn-row"><button class="btn btn-primary" onclick="GGTend.act(\'createProfile\')">Create a profile</button><button class="btn btn-secondary" onclick="GGTend.act(\'openProfile\')">Open my profile</button></div><p class="gt-small"><a class="text-link" href="#" onclick="GGTend.act(\'about\');return false;">How ' + esc(C.toolName) + ' works</a></p></div>';
  }
  function anchorHtml(s, which) {
    var A = (J.ANCHORS || {})[which]; if (!A) return '';
    var x = day(s, today()), on = !!(x && x.a && x.a.indexOf(which) >= 0);
    // The whole card is the tap target (GWG BLD 743): a tap on the words checks it off, the same as the circle.
    return '<div class="gt-anchor gt-' + which + (on ? ' on' : '') + '" onclick="GGTend.anchor(\'' + which + '\')"><button type="button" class="gt-check' + (on ? ' on' : '') + '" aria-pressed="' + on + '" aria-label="' + esc(A.t) + (on ? ', done' : '') + '"></button><div><b>' + esc(A.t) + '</b><p>' + esc(A.b) + '</p></div></div>';
  }
  function practiceHtml(s, it) {
    var id = itemId(it.key, it.name), x = day(s, today()), done = !!(x && x.d.indexOf(id) >= 0), easy = !!(x && x.e.indexOf(id) >= 0);
    var note = (x && x.n && x.n[id]) || '', info = it.custom ? {} : it.lib ? (window.GGLibrary ? GGLibrary.info(it.lib, libAge()) : {}) : (C.practiceInfo(it.key, it.name) || {});
    var safe = encodeURIComponent(id), open = OPEN[id] || '';
    var body = '';
    if (open === 'how' && info.guide) body = '<div class="gt-drawer">' + info.guide + '</div>';
    if (open === 'note') body = '<div class="gt-drawer"><label class="gt-small" for="gt-n-' + safe + '">A note for today (optional)</label><textarea id="gt-n-' + safe + '" rows="2" onchange="GGTend.note(\'' + safe + '\', this.value)">' + esc(note) + '</textarea></div>';
    return '<li class="gt-item' + (done ? ' done' : '') + '"><button type="button" class="gt-check' + (done ? ' on' : '') + '" aria-pressed="' + done + '" aria-label="' + esc(it.name) + (done ? ', done' : '') + '" onclick="GGTend.check(\'' + safe + '\')"></button>'
      + '<div class="gt-item-main"><b>' + esc(it.name) + (it.custom ? ' <span class="gt-own">Your own</span>' : it.lib ? ' <span class="gt-own">From the library</span>' : '') + (C.itemTag ? (C.itemTag(it.key, it.name, s) || '') : '') + '</b>'
      + (easy && info.hard ? '<p class="gt-easy"><span>Easier today.</span> ' + esc(info.hard) + '</p>' : (info.desc ? '<p>' + esc(info.desc) + '</p>' : ''))
      + (note && open !== 'note' ? '<p class="gt-note">' + esc(note) + '</p>' : '')
      + '<div class="gt-acts">' + (info.hard ? '<button type="button" aria-pressed="' + easy + '" onclick="GGTend.easy(\'' + safe + '\')">' + (easy ? 'Back to the usual' : 'Easier today') + '</button>' : '')
      + (info.guide ? '<button type="button" aria-expanded="' + (open === 'how') + '" onclick="GGTend.drawer(\'' + safe + '\',\'how\')">How to do this</button>' : '')
      + '<button type="button" aria-expanded="' + (open === 'note') + '" onclick="GGTend.drawer(\'' + safe + '\',\'note\')">' + (note ? 'Edit note' : 'Add a note') + '</button></div>' + body + '</div></li>';
  }
  function renderToday() {
    var box = el(C.els.today); if (!box) return;
    var s = ensure();
    if (!s) { box.innerHTML = needProfile('today'); return; }
    var h = health(s), d = today(), x = day(s, d), list = items(s), parts = partsOn(s, d);
    var seasonLine = s.start ? 'Season ' + (s.season || 1) + ', week ' + weekShown(s) + ' of 12' : 'Your season begins with your first full check-in';
    var count = Object.keys(s.days).filter(function (k) { return tended(s, k) && (!s.start || k >= s.start); }).length;
    var html = '<div class="gt-card gt-treecard"><div class="gt-tree" id="gt-tree">' + treeSVG(h, parts) + '</div><div class="gt-tree-side"><p class="gt-status">' + (C.pause && C.pauseLine && C.pause() ? esc(C.pauseLine) : LINES[h]) + '</p>'
      + (parts >= 6 ? '<p class="gt-small">All six parts tended today. That is a full day.</p>' : parts ? '<p class="gt-small">' + parts + ' of 6 parts tended today.</p>' : '')
      + '<dl class="gt-stats"><div><dt>Days Tended</dt><dd>' + count + '</dd></div><div><dt>Rings</dt><dd>' + ringN(s) + '</dd></div></dl><p class="gt-small">' + seasonLine + '</p>'
      + (famOk() ? '<div class="gt-fam-row"><button type="button" class="btn btn-secondary btn-sm" onclick="GGTend.shareFamily()">Share to Family</button></div>' : '') + '</div></div>';
    if (C.todayExtra) html += C.todayExtra(s) || '';
    if (!list.length) {
      var hasCheck = (C.history() || []).length > 0;
      html += '<div class="gt-card gt-empty"><h3>' + (hasCheck ? 'Choose your practices' : 'Start with a check-in') + '</h3><p>' + (hasCheck ? 'Your growth plan is where you choose practices for each part of your tree. Start with about 3 for each part, and a few more for each growing edge. They show up here every day, ready to check off.' : 'The check-in shows how each part of your tree is doing. Then your growth plan turns it into small daily practices that show up here.') + '</p><div class="btn-row">'
        + (hasCheck ? '<button class="btn btn-primary" onclick="GGTend.act(\'plan\')">Build my growth plan</button>' : '<button class="btn btn-primary" onclick="GGTend.act(\'fullCheckin\')">Begin my check-in</button>' + (C.noQuick ? '' : '<button class="btn btn-secondary" onclick="GGTend.act(\'quickCheckin\')">Quick Check-in, 2 minutes</button>'))
        + '</div></div>';
      box.innerHTML = html; return;
    }
    html += anchorHtml(s, 'morning');
    C.parts.forEach(function (pt) {
      var mine = list.filter(function (it) { return it.key === pt.key; });
      if (!mine.length) return;
      var lv = '';
      if (pt.key === C.moveKey) {
        var L = s.level && J.LEVEL_MOVE && J.LEVEL_MOVE[s.level] && J.LEVEL_MOVE[s.level][stretch(weekShown(s))];
        lv = L ? '<div class="gt-level"><b>Move at your level: ' + esc(L.t) + '</b><p>' + L.b + '</p></div>' : '<p class="gt-small gt-level-set"><a class="text-link" href="#" onclick="GGTend.openSettings(\'level\');return false;">Set your movement level</a> to see movement fitted to you.</p>';
      }
      html += '<section class="gt-part" style="--pc:' + pt.color + '"><h3>' + (C.partIcon ? C.partIcon(pt.key) : '') + '<span>' + esc(pt.part) + '</span><small>' + esc(pt.name) + '</small></h3>' + (C.partNote ? (C.partNote(pt.key, s) || '') : '') + lv + '<ul>' + mine.map(function (it) { return practiceHtml(s, it); }).join('') + '</ul></section>';
    });
    html += anchorHtml(s, 'evening');
    html += '<div class="btn-row gt-foot"><button class="btn btn-secondary" onclick="GGTend.act(\'plan\')">Change my practices</button>' + (window.GGLibrary ? '<button class="btn btn-secondary" onclick="GGTend.openLib()">Find more practices</button>' : '') + '</div>';
    box.innerHTML = html;
  }

  /* ---------- Week ---------- */
  function weeklyQs() {
    var Q = C.questions(), out = [];
    C.parts.forEach(function (pt) {
      var list = Q[pt.key] || []; if (!list.length) return;
      out.push({ id: pt.key, key: pt.key, label: pt.part + (list[0].s ? ': ' + strandName(list[0].s) : ''), t: list[0].t });
      list.forEach(function (q, i) { if (i && q.s) out.push({ id: pt.key + '.' + q.s, key: pt.key, label: pt.part + ': ' + strandName(q.s), t: q.t }); });
    });
    return out;
  }
  function strandName(sid) { return { move: 'Move', rest: 'Rest', nourish: 'Nourish' }[sid] || sid; }
  function score(a) { var o = (C.answers || []).filter(function (x) { return x[0] === a; })[0]; return o ? o[2] : null; }
  function prevWeek(s) {
    var keys = Object.keys(s.weeks || {}).filter(function (k) { return k !== weekKey(s) && s.weeks[k] && s.weeks[k].ans; });
    keys.sort(function (a, b) { return String(s.weeks[a].date).localeCompare(String(s.weeks[b].date)); });
    return keys.length ? s.weeks[keys[keys.length - 1]] : null;
  }
  var EDIT = false;
  function renderWeek() {
    var box = el(C.els.week); if (!box) return;
    var s = ensure();
    if (!s) { box.innerHTML = needProfile('week'); return; }
    if (!s.start) {
      box.innerHTML = '<div class="gt-card gt-empty"><h3>Your season starts with a full check-in</h3><p>A season is twelve weeks. Each week brings a theme, a short check-in, and a question to sit with. It begins the day you finish your first full check-in.</p><div class="btn-row"><button class="btn btn-primary" onclick="GGTend.act(\'fullCheckin\')">Begin my check-in</button></div></div>' + calendarHtml(s);
      return;
    }
    var w = weekShown(s), W = (J.WEEKS || [])[w - 1] || {}, st = (J.SEASONS || {})[stretch(w)] || {}, rec = (s.weeks || {})[weekKey(s)] || null;
    if (W.plain && C.plain && C.plain()) { var Wp = {}; Object.keys(W).forEach(function (k) { Wp[k] = W[k]; }); Object.keys(W.plain).forEach(function (k) { Wp[k] = W.plain[k]; }); W = Wp; }
    var html = '<div class="gt-weekhead"><p class="gt-kicker">Season ' + (s.season || 1) + ', week ' + w + ' of 12</p><h2>' + esc(W.theme || '') + '</h2><p class="gt-stretch"><b>' + esc(st.name || '') + '.</b> ' + esc(st.line || '') + '</p></div>';
    if (weekNo(s) > 12) html += '<div class="gt-card gt-due"><p><b>Your season check-in is ready.</b> Finish a full check-in to add a ring to your tree and begin a new season.</p><div class="btn-row"><button class="btn btn-primary" onclick="GGTend.act(\'fullCheckin\')">Begin my season check-in</button></div></div>';
    html += '<div class="gt-card"><p class="gt-intro">' + esc(W.intro || '') + '</p>' + (W.story && C.showStory !== false ? '<p class="gt-story">From Grounded: <a class="text-link" href="' + esc(W.story.url) + '" target="_blank" rel="noopener">' + esc(W.story.title) + '</a>. <i>' + esc(W.story.line) + '</i></p>' : '') + '</div>';
    // the quick weekly check-in
    var Qs = weeklyQs(), pv = prevWeek(s);
    if (rec && rec.ans && !EDIT) {
      html += '<div class="gt-card"><h3>This Week\'s Check-in</h3><ul class="gt-wsum">' + Qs.map(function (q) {
        var a = rec.ans[q.id], lab = ((C.answers || []).filter(function (x) { return x[0] === a; })[0] || [])[1] || 'Skipped', p = pv && pv.ans ? score(pv.ans[q.id]) : null, n = score(a);
        var tr = p === null || n === null ? '' : n > p ? '<span class="gt-up">Up from last week</span>' : n < p ? '<span class="gt-down">Down from last week</span>' : '<span>Same as last week</span>';
        return '<li><b>' + esc(q.label) + '</b><span>' + esc(lab) + '</span>' + tr + '</li>';
      }).join('') + '</ul><div class="btn-row"><button class="btn btn-secondary" onclick="GGTend.editWeek()">Change my answers</button></div></div>';
    } else {
      html += '<div class="gt-card"><h3>This Week\'s Check-in</h3><p class="gt-small">' + esc(C.weekStem) + '</p><ol class="gt-wq">' + Qs.map(function (q, i) {
        var cur = rec && rec.ans ? rec.ans[q.id] : null;
        return '<li><p><b>' + esc(q.label) + '.</b> ' + esc(q.t) + '</p><div class="gt-opts" role="radiogroup" aria-label="' + esc(q.label) + '">' + (C.answers || []).map(function (o) {
          return '<button type="button" role="radio" aria-checked="' + (cur === o[0]) + '" data-q="' + esc(q.id) + '" data-a="' + o[0] + '" onclick="GGTend.pick(this)">' + esc(o[1]) + '</button>';
        }).join('') + '</div></li>';
      }).join('') + '</ol><div class="btn-row"><button class="btn btn-primary" onclick="GGTend.saveWeek()">Save this week</button></div></div>';
    }
    html += '<div class="gt-card"><h3>Reflection</h3><label class="gt-q" for="gt-refl">' + esc(W.q || 'What did you notice this week?') + '</label><textarea id="gt-refl" rows="4">' + esc(rec && rec.refl || '') + '</textarea>' + (C.shareRefl ? '<label class="gt-switch gt-share"><input type="checkbox" id="gt-refl-share"' + (rec && rec.share ? ' checked' : '') + '> Share this reflection with my grown-up</label><p class="gt-small">Your reflections are just for you unless you share one.</p>' : '') + '<div class="btn-row"><button class="btn btn-secondary" onclick="GGTend.saveRefl()">Save my reflection</button></div></div>';
    html += calendarHtml(s);
    box.innerHTML = html;
  }
  function calendarHtml(s) {
    var now = new Date(); if (!CAL) CAL = { y: now.getFullYear(), m: now.getMonth() };
    var first = new Date(CAL.y, CAL.m, 1), days = new Date(CAL.y, CAL.m + 1, 0).getDate(), lead = first.getDay();
    var name = first.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    var cells = '', n = 0, t = today();
    for (var i = 0; i < lead; i++) cells += '<span class="gt-cal-pad"></span>';
    for (var d = 1; d <= days; d++) {
      var k = CAL.y + '-' + pad(CAL.m + 1) + '-' + pad(d), on = tended(s, k), six = partsOn(s, k) >= 6;
      if (on) n++;
      cells += '<span class="gt-cal-day' + (on ? ' on' : '') + (six ? ' six' : '') + (k === t ? ' today' : '') + '" aria-label="' + nice(k) + (six ? ', all six parts tended' : on ? ', tended' : '') + '">' + d + '</span>';
    }
    var wk = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(function (x) { return '<span class="gt-cal-wd" aria-hidden="true">' + x + '</span>'; }).join('');
    return '<div class="gt-card gt-cal"><div class="gt-cal-head"><button type="button" onclick="GGTend.month(-1)" aria-label="Previous month">&lsaquo;</button><h3>' + esc(name) + '</h3><button type="button" onclick="GGTend.month(1)" aria-label="Next month">&rsaquo;</button></div>'
      + '<div class="gt-cal-grid">' + wk + cells + '</div><p class="gt-small">' + n + ' day' + (n === 1 ? '' : 's') + ' tended this month. A filled day means you tended your tree. A ring means all six parts.</p></div>';
  }

  /* ---------- Season ---------- */
  function ringsSVG(n, w) {
    var o = '<svg class="gt-rings" viewBox="0 0 200 200" role="img" aria-label="' + n + ' ring' + (n === 1 ? '' : 's') + '" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="96" fill="#C9A06A"/><circle cx="100" cy="100" r="96" fill="none" stroke="#5A3A1E" stroke-width="6"/>';
    var total = Math.max(n + 1, 2), step = 80 / total;
    for (var i = 1; i <= n; i++) o += '<circle cx="100" cy="100" r="' + (12 + step * i).toFixed(1) + '" fill="none" stroke="#8A5A2B" stroke-width="2.4"/>';
    var r = 12 + step * (n + 1), frac = Math.min(1, w / 12), c = 2 * Math.PI * r;
    o += '<circle cx="100" cy="100" r="' + r.toFixed(1) + '" fill="none" stroke="#8A5A2B" stroke-width="4" opacity=".18"/>';
    o += '<circle cx="100" cy="100" r="' + r.toFixed(1) + '" fill="none" stroke="#6B3F1C" stroke-width="4" stroke-linecap="round" stroke-dasharray="' + (c * frac).toFixed(1) + ' ' + c.toFixed(1) + '" transform="rotate(-90 100 100)"/>';
    return o + '<circle cx="100" cy="100" r="6" fill="#8A5A2B"/></svg>';
  }
  function renderSeason() {
    var box = el(C.els.season); if (!box) return;
    var s = ensure(), hist = C.history() || [];
    var html = '';
    if (s && s.start) {
      var w = weekShown(s), due = weekNo(s) >= 12, n = ringN(s);
      html += '<div class="gt-card gt-seasoncard"><div>' + ringsSVG(n, w) + '</div><div><p class="gt-kicker">Season ' + (s.season || 1) + '</p><h2>Week ' + w + ' of 12</h2><p>This season began ' + nice(s.start) + '. ' + (n ? 'Your tree has ' + n + ' ring' + (n === 1 ? '' : 's') + (C.ringCount ? ', one for each full check-in.' : ', one for each season you have finished.') : 'Finish this season with a full check-in to add your first ring.') + '</p>'
        + (due ? '<p class="gt-due-line"><b>Your season check-in is ready.</b> A full check-in now adds a ring and begins a new season.</p>' : '<p class="gt-small">The full check-in comes due at week 12. You can check in anytime.</p>') + '</div></div>';
    } else if (s) {
      html += '<div class="gt-card"><h2>Your first season</h2><p>A season is twelve weeks of tending, from Planting to Rooting to Blooming. It begins the day you finish your first full check-in. Every season you finish adds a ring to your tree.</p></div>';
    } else html += needProfile('season');
    html += '<div class="btn-row gt-season-acts"><button class="btn btn-primary" onclick="GGTend.act(\'fullCheckin\')">Begin a full check-in</button>' + (C.noQuick ? '' : '<button class="btn btn-secondary" onclick="GGTend.act(\'quickCheckin\')">Quick Check-in, 2 minutes</button>')
      + (C.hasResults() ? '<button class="btn btn-secondary" onclick="GGTend.act(\'results\')">My latest results</button>' : '')
      + '<button class="btn btn-secondary" onclick="GGTend.act(\'progress\')">My progress over time</button></div>';
    if (s && C.seasonExtra) html += C.seasonExtra(s) || '';
    html += earlierHtml(s);
    if (hist.length) html += '<div class="gt-card"><h3>Your Check-ins</h3><ul class="gt-hist">' + hist.slice().reverse().slice(0, 8).map(function (e) { return '<li><b>' + nice(e.date) + '</b><span>' + (e.type === 'quick' ? 'Quick Check-in' : 'Full Check-in') + '</span></li>'; }).join('') + '</ul></div>';
    box.innerHTML = html;
  }

  /* ---------- settings, behind the profile picture ---------- */
  function openSettings(focus) {
    var s = ensure(), a = window.GGP && GGP.active();
    var old = el('gt-settings'); if (old) old.remove();
    var R = window.GGApp && GGApp.remind, can = R && R.can && R.can(), rem = can ? R.get(C.tool) : null;
    var lv = (J.LEVELS || []).map(function (L) { return '<label class="gt-radio"><input type="radio" name="gt-level" value="' + L.id + '"' + (s && s.level === L.id ? ' checked' : '') + (s ? '' : ' disabled') + ' onchange="GGTend.setLevel(this.value)"><span><b>' + esc(L.name) + '</b>' + esc(L.desc) + '</span></label>'; }).join('');
    var html = '<div class="gt-sheet-back" id="gt-settings" role="dialog" aria-modal="true" aria-labelledby="gt-set-title" onclick="if(event.target===this)GGTend.closeSettings()"><div class="gt-sheet">'
      + '<div class="gt-sheet-head"><h2 id="gt-set-title">Profile and Settings</h2><button type="button" class="gt-x" onclick="GGTend.closeSettings()" aria-label="Close">&times;</button></div>'
      + (C.profileHtml ? C.profileHtml() : a ? '<section><h3>Your Profile</h3><p class="gt-who">' + (window.GGAv ? GGAv.html(a.avatar, a.name, 44) : '') + '<b>' + esc(a.name) + '</b></p><div class="btn-row"><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();GGP.manage()">Picture, passcode, and more</button><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();GGP.openDialog()">Switch profile</button><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();GGTend.act(\'lock\')">Lock</button></div></section>'
        : '<section><h3>Your Profile</h3><p>Create a private profile to keep your tree, your practices, and your check-ins on this device.</p><div class="btn-row"><button class="btn btn-primary btn-sm" onclick="GGTend.closeSettings();GGTend.act(\'createProfile\')">Create a profile</button><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();GGTend.act(\'openProfile\')">Open my profile</button></div></section>')
      + '<section id="gt-set-level"><h3>Movement Level</h3><p class="gt-small">Shapes the movement shown with your Leaves practices. Change it anytime.</p>' + lv + (s ? '' : '<p class="gt-small">Open your profile to choose a level.</p>') + '</section>'
      + groveSettingsHtml(s)
      + (C.extraSettings ? C.extraSettings() : '')
      + '<section><h3>Daily Reminder</h3>' + (can ? '<label class="gt-switch"><input type="checkbox"' + (rem && rem.on ? ' checked' : '') + ' onchange="GGTend.remind(this.checked)"> Remind me to tend my tree</label><label class="gt-small" for="gt-rtime">Time</label> <input type="time" id="gt-rtime" value="' + esc((rem && rem.time) || '08:00') + '" onchange="GGTend.remind(null)">' : '<p class="gt-small">Daily reminders come with the ' + esc(C.toolName) + ' phone app. They are set on your phone, and nothing is sent to a server.</p>') + '</section>'
      + '<section><h3>Reading and Display</h3><div class="btn-row">' + (window.GGRead && GGRead.settings ? '<button class="btn btn-secondary btn-sm" onclick="GGRead.settings()">Read Aloud Voice</button>' : '') + '<button class="btn btn-secondary btn-sm" onclick="GGTend.act(\'textSize\')">Text Size</button><button class="btn btn-secondary btn-sm" onclick="GGTend.theme()">Light or dark</button></div></section>'
      + (C.noRecords ? '' : '<section><h3>Your Records</h3><div class="btn-row">' + '<button class="btn btn-secondary btn-sm" onclick="GGBackupGo(\'make\')">Back up everything</button><button class="btn btn-secondary btn-sm" onclick="GGBackupGo(\'pick\')">Load a backup</button>' + '<button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();GGTend.act(\'progress\')">Save or load a results file</button></div><p class="gt-small">Back up everything saves one file with every profile on this device (each still locked), The Grove, and settings. Load it on any device to bring it all back. Everything stays on this device. To delete a profile and everything in it, open Picture, passcode, and more.</p></section>')
      + '<section><h3>About</h3><p><a class="text-link" href="#" onclick="GGTend.closeSettings();GGTend.act(\'about\');return false;">How ' + esc(C.toolName) + ' works</a> &nbsp; <a class="text-link" href="https://growwithgrounded.com/privacy.html">Privacy</a> &nbsp; <a class="text-link" href="https://growwithgrounded.com/terms.html">Terms</a></p></section>'
      + '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    var sheet = el('gt-settings'), f = focus === 'level' ? el('gt-set-level') : sheet.querySelector('.gt-x');
    if (focus === 'level' && f) f.scrollIntoView({ block: 'start' });
    var x = sheet.querySelector('.gt-x'); if (x) x.focus();
    sheet.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSettings(); });
  }
  function closeSettings() { var x = el('gt-settings'); if (x) x.remove(); }

  /* ---------- The Grove (Rebrand Session 5) ----------
     Your tree is yours. The grove is ours. A tree app never sends answers,
     levels, notes, or safety flags to The Grove. With the person's switch on
     (the default), it shares only the big picture of their growth, in the
     profile's small unencrypted "shared" record that a family view can read:
     days tended, rings, and which parts were tended on recent days. */
  var GROVE_LINE = 'Your tree is yours. The grove is ours.';
  var EARLIER_OPEN = false;
  function pid() { return C.profileId ? C.profileId() : null; }
  function publish(s) {
    var id = pid(); if (!id || !window.GGP || !GGP.isOpen || !GGP.isOpen(id) || !s) return;
    if (s.groveShow === false) { GGP.setShared(id, { tree: { tool: C.tool, show: false, updated: today() } }); return; }
    var recent = [], d = today();
    for (var i = 0; i < 14; i++) { var k = addDays(d, -i), x = s.days[k]; if (!x || !tended(s, k)) continue;
      var set = {}; (x.d || []).forEach(function (pidk) { set[pidk.split('|')[0]] = 1; }); recent.push({ d: k, parts: Object.keys(set) }); }
    var days = Object.keys(s.days).filter(function (k) { return tended(s, k); }).length;
    GGP.setShared(id, { tree: { tool: C.tool, show: true, days: days, rings: ringN(s), season: s.season || 1, recent: recent, updated: d } });
  }
  function groveSettingsHtml(s) {
    var on = !s || s.groveShow !== false;
    return '<section id="gt-set-grove"><h3>The Grove</h3><p class="gt-small"><b>' + GROVE_LINE + '</b> You tend your tree here. The Grove is where your family\'s trees grow together.</p>'
      + '<label class="gt-switch"><input type="checkbox"' + (on ? ' checked' : '') + (s ? '' : ' disabled') + ' onchange="GGTend.setGroveShow(this.checked)"> Show my growth on The Grove</label>'
      + '<p class="gt-small">Only the big picture shows: days tended, rings, and which parts you tended. Never your answers, levels, or notes. Turn it off anytime.</p>'
      + '<p><a class="text-link" href="/grove/">Visit The Grove</a></p></section>';
  }
  // Old personal tending from The Grove moves into this tree, once, as "Earlier, from The Grove".
  function moveEarlier() {
    var id = pid(); if (!id || !window.GGP || !GGP.isOpen || !GGP.isOpen(id)) return;
    var d = GGP.data(id), g = d && d.grove && d.grove.self; if (!g || typeof g !== 'object') return;
    var used = !!(g.start || Object.keys(g.watered || {}).length || Object.keys(g.journal || {}).some(function (k) { return String(g.journal[k] || '').trim(); }));
    var s = ensure(); if (!s) return;
    if (!used) { delete d.grove.self; GGP.save(id); return; }
    if (!s.earlier) s.earlier = { from: 'grove', moved: today(), self: JSON.parse(JSON.stringify(g)) };
    Promise.resolve(save()).then(function () { var d2 = GGP.data(id); if (d2 && d2.grove) { delete d2.grove.self; return GGP.save(id); } }).catch(function () {});
  }
  function earlierHtml(s) {
    var e = s && s.earlier, g = e && e.self; if (!g) return '';
    var days = Object.keys(g.watered || {}).filter(function (k) { return k <= today(); }).sort();
    var notes = Object.keys(g.journal || {}).filter(function (k) { return String(g.journal[k] || '').trim(); }).sort(function (a, b) { return a - b; });
    var html = '<div class="gt-card gt-earlier"><h3>Earlier, from The Grove</h3><p class="gt-small">Before your tree grew here, you tended in The Grove. It moved here on ' + nice(e.moved) + ', because your tree is yours.</p>'
      + '<dl class="gt-stats"><div><dt>Days tended there</dt><dd>' + days.length + '</dd></div>' + (notes.length ? '<div><dt>Reflections</dt><dd>' + notes.length + '</dd></div>' : '') + '</dl>'
      + (days.length ? '<p class="gt-small">From ' + nice(days[0]) + ' to ' + nice(days[days.length - 1]) + '.</p>' : '');
    if (notes.length) {
      html += '<button type="button" class="btn btn-secondary btn-sm" aria-expanded="' + EARLIER_OPEN + '" onclick="GGTend.earlierToggle()">' + (EARLIER_OPEN ? 'Hide my reflections' : 'Read my reflections') + '</button>';
      if (EARLIER_OPEN) html += notes.map(function (k) { return '<div class="gt-earlier-note"><b>Week ' + esc(k) + '</b><p>' + esc(g.journal[k]) + '</p></div>'; }).join('');
    }
    return html + '</div>';
  }

  /* ---------- Share to Family (BLD 732) ----------
     A person sends their tree by hand to family on other phones: a link to The Grove
     with the tree after the #, shown as a QR code too. Only the shape of the tree
     travels (see SHARE TO FAMILY in gg-app.js): first name, which tree, days tended,
     parts tended this week, tended today, days tended this week, and when it was made.
     The share id is random, made once, and kept in the person's own record (s.famId). */
  var FAM_TREE = { maple: 'maple', aspen: 'aspen', pine: 'pine', birch: 'birch', oak: 'oak', sequoia: 'sequoia' };
  var FAM_NAME = { maple: 'Maple', aspen: 'Aspen', pine: 'Pine', birch: 'Birch', oak: 'Oak', sequoia: 'Sequoia' };
  function famOk() { return !!(window.GGApp && GGApp.family && C && FAM_TREE[C.tool]); }
  function famFirst() {
    var F = GGApp.family, s = ensure(), n = s && s.famName ? F.firstName(s.famName) : '';
    if (n) return n;
    try { var id = pid(), p = id && window.GGP && GGP.get ? GGP.get(id) : null; if (p && p.name) n = F.firstName(String(p.name).replace(/[<>&"`\\]/g, '')); } catch (e) {}
    return n;
  }
  function famData(s, name) {
    var d = today(), wk = parse(d), back = (wk.getDay() + 6) % 7, mon = addDays(d, -back), w = 0, set = {};
    for (var i = 0; i <= back; i++) if (tended(s, addDays(mon, i))) w++;
    for (var j = 0; j < 7; j++) { var x = s.days[addDays(d, -j)]; if (x && tended(s, addDays(d, -j))) (x.d || []).forEach(function (id) { set[id.split('|')[0]] = 1; }); }
    var order = GGApp.family.parts, p = '';
    order.forEach(function (k, i) { if (set[k]) p += i; });
    var g = Object.keys(s.days).filter(function (k) { return tended(s, k); }).length;
    return { v: 1, i: s.famId, n: name, t: FAM_TREE[C.tool], g: g, p: p, d: tended(s, d) ? 1 : 0, w: Math.min(w, g), m: Math.floor(Date.now() / 1000) };
  }
  function famCss() {
    if (el('gt-fam-css')) return;
    var st = document.createElement('style'); st.id = 'gt-fam-css';
    st.textContent = '.gt-fam-row{margin-top:12px}'
      + '.gt-fam-qr{background:#fff;border-radius:14px;padding:12px;margin:8px auto 10px;max-width:240px}.gt-fam-qr svg{display:block;width:100%;height:auto}'
      + '.gt-fam-link{width:100%;box-sizing:border-box;font:14px/1.4 ui-monospace,Menlo,Consolas,monospace;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink);word-break:break-all;resize:none}'
      + '.gt-fam-name{font:inherit;width:100%;max-width:260px;box-sizing:border-box;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink)}'
      + '.gt-sheet ul.gt-fam-list{margin:0 0 8px;padding-left:20px;font-size:15px}.gt-sheet ul.gt-fam-list li{margin:2px 0}';
    document.head.appendChild(st);
  }
  var FAM_LINK = '';
  function famDraw() {
    var s = ensure(), box = el('gt-fam-out'); if (!s || !box) return;
    var inp = el('gt-fam-name'), name = GGApp.family.firstName(String(inp ? inp.value : '').replace(/[<>&"`\\]/g, ''));
    if (!name) { FAM_LINK = ''; box.innerHTML = '<p class="gt-small">Type a first name to make your link.</p>'; return; }
    if (s.famName !== name) { s.famName = name; persist(); }
    FAM_LINK = GGApp.family.url(famData(s, name));
    if (!FAM_LINK) { box.innerHTML = '<p class="gt-small">That link could not be made. Try a shorter first name.</p>'; return; }
    var svg = ''; try { if (window.GGQR) svg = GGQR.svg(FAM_LINK, { label: 'QR code for ' + name + '\'s tree' }); } catch (e) { svg = ''; }
    box.innerHTML = (svg ? '<div class="gt-fam-qr">' + svg + '</div><p class="gt-small">Family can scan this with their phone\'s camera, or you can send the link.</p>' : '')
      + '<label class="gt-small" for="gt-fam-link">Your link</label><textarea id="gt-fam-link" class="gt-fam-link" rows="3" readonly>' + esc(FAM_LINK) + '</textarea>'
      + '<div class="btn-row"><button type="button" class="btn btn-primary btn-sm" onclick="GGTend.famCopy()">Copy Link</button>'
      + (navigator.share ? '<button type="button" class="btn btn-secondary btn-sm" onclick="GGTend.famShare()">Share</button>' : '') + '</div>';
  }
  function openFamily() {
    var s = ensure(); if (!s || !famOk()) return;
    if (!s.famId) { s.famId = GGApp.family.newId(); persist(); }
    famCss(); closeFamily();
    var tn = FAM_NAME[C.tool];
    var html = '<div class="gt-sheet-back" id="gt-fam" role="dialog" aria-modal="true" aria-labelledby="gt-fam-title" onclick="if(event.target===this)GGTend.closeFamily()"><div class="gt-sheet">'
      + '<div class="gt-sheet-head"><h2 id="gt-fam-title">Share to Family</h2><button type="button" class="gt-x" onclick="GGTend.closeFamily()" aria-label="Close">&times;</button></div>'
      + '<section><p>Send your tree to family on their own phones. When they open your link, your tree stands in their grove, right beside theirs.</p>'
      + '<label class="gt-small" for="gt-fam-name">First name to show</label><br><input id="gt-fam-name" class="gt-fam-name" type="text" maxlength="24" autocomplete="given-name" value="' + esc(famFirst()) + '" oninput="GGTend.famDraw()"></section>'
      + '<section id="gt-fam-out"></section>'
      + '<section><h3>What Your Link Shares</h3><ul class="gt-fam-list"><li>Your first name</li><li>Your tree: ' + tn + '</li><li>How your tree looks: days tended and which parts you tended this week</li><li>Whether you tended today, and how many days this week</li><li>The day you made the link</li></ul>'
      + '<h3>What Stays with You</h3><p>Your answers, scores, notes, journal, and growth plan stay on this device.</p>'
      + '<p class="gt-small">Anyone with this link can see what it shares, so send it to family only. Your link is a snapshot: share again any time to send a fresh one.</p></section>'
      + '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    famDraw();
    var sheet = el('gt-fam'), x = sheet.querySelector('.gt-x'); if (x) x.focus();
    sheet.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeFamily(); });
  }
  function closeFamily() { var x = el('gt-fam'); if (x) x.remove(); }
  function famCopy() {
    if (!FAM_LINK) return;
    var done = function () { toast('Link copied.'); }, fail = function () { var t = el('gt-fam-link'); if (t) { t.focus(); t.select(); } toast('Copy did not work here. The link is selected, ready to copy.'); };
    try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(FAM_LINK).then(done, fail); return; } } catch (e) {}
    fail();
  }
  function famShare() {
    if (!FAM_LINK || !navigator.share) return;
    navigator.share({ title: 'My tree in The Grove', text: 'Here is my tree for your grove. Open the link to add it.', url: FAM_LINK }).catch(function () {});
  }

  /* ---------- find more practices (the shared library, Rebrand Session 5) ---------- */
  var LIBQ = { part: '', q: '', open: '' };
  function libAge() { return (typeof C.libAge === 'function' ? C.libAge() : C.libAge) || 'oak'; }
  function inPlan(s, it) { var x = ((s && s.plan) || {})[it.part] || {}; return (x.lib || []).some(function (l) { return l.k === it.key; }); }
  function libToggle(key) {
    var s = ensure(); if (!s) { toast('Open your profile to add practices.'); return; }
    var it = GGLibrary.get(key); if (!it) return;
    if (!s.plan) s.plan = {}; if (!s.plan[it.part]) s.plan[it.part] = { selected: [] };
    var x = s.plan[it.part], L = x.lib || (x.lib = []), i = -1;
    L.forEach(function (l, j) { if (l.k === key) i = j; });
    if (i >= 0) { L.splice(i, 1); toast('Taken out of your practices.'); }
    else { L.push({ k: key, n: GGLibrary.view(it, libAge()).name }); toast('Added to your practices.'); }
    persist(); renderToday(); drawLib();
  }
  function libItemHTML(it, s, age, partOf) {
    var v = GGLibrary.view(it, age), on = inPlan(s, it), open = LIBQ.open === it.key, safe = encodeURIComponent(it.key), pt = partOf[it.part] || {};
    return '<li class="gt-lib-item" style="--pc:' + (pt.color || '#8B5E1A') + '"><div class="gt-lib-top"><b>' + esc(v.name) + '</b><small>' + esc(pt.part || '') + (it.ages === 'young' ? ', For Young Adults' : '') + (it.bedside ? ', From the Bedside' : '') + '</small></div>'
      + (v.text ? '<p>' + esc(v.text) + '</p>' : '')
      + '<div class="gt-acts"><button type="button" aria-pressed="' + on + '" onclick="GGTend.libToggle(\'' + safe + '\')">' + (on ? 'In my practices. Take it out' : 'Add to my practices') + '</button>'
      + '<button type="button" aria-expanded="' + open + '" onclick="GGTend.libHow(\'' + safe + '\')">Show me how</button></div>'
      + (open ? '<div class="gt-drawer">' + GGLibrary.guideHtml(v) + '</div>' : '') + '</li>';
  }
  /* Searching: the same engine as the header search. Practices you can add come first,
     then "More from Grow With Grounded" (guides, books, pages), kid-safe in Maple, Aspen, and Pine. */
  function drawLibFind(box, s, age, partOf) {
    var q = LIBQ.q;
    window.GGSearchLoad().then(function (G) {
      if (!G) { LIBQ.engine = false; drawLib(); return; }
      G.ready().then(function () {
        if (LIBQ.q !== q || !el('gt-lib-list')) return;
        G.draw(box, q, {
          here: C.tool === 'maple' || C.tool === 'aspen' || C.tool === 'pine' || C.tool === 'birch' || C.tool === 'sequoia' ? C.tool : 'oak', localType: 'practice',
          kid: age === 'maple' || age === 'aspen' || age === 'pine' ? age : false,
          localLabel: 'Practices you can add', localNone: 'No practices to add',
          localKeep: function (x) { var it = GGLibrary.get(x.key); return !!it && GGLibrary.fits(it, age) && (!LIBQ.part || it.part === LIBQ.part); },
          localHTML: function (items) { return '<ul class="gt-lib-ul">' + items.slice(0, 80).map(function (x) { return libItemHTML(GGLibrary.get(x.key), s, age, partOf); }).join('') + '</ul>'; },
          accent: 'var(--btn-ink)'
        });
      });
    });
  }
  function drawLib() {
    var box = el('gt-lib-list'); if (!box) return;
    var s = ensure(), age = libAge();
    var chips = el('gt-lib-parts');
    if (chips) chips.innerHTML = '<button type="button" class="gt-chip' + (!LIBQ.part ? ' on' : '') + '" aria-pressed="' + !LIBQ.part + '" onclick="GGTend.libPart(\'\')">All parts</button>'
      + C.parts.map(function (pt) { var on = LIBQ.part === pt.key; return '<button type="button" class="gt-chip' + (on ? ' on' : '') + '" aria-pressed="' + on + '" style="--pc:' + pt.color + '" onclick="GGTend.libPart(\'' + pt.key + '\')">' + esc(pt.part) + '</button>'; }).join('');
    var partOf = {}; C.parts.forEach(function (pt) { partOf[pt.key] = pt; });
    if (LIBQ.q && window.GGSearchLoad && LIBQ.engine !== false) { drawLibFind(box, s, age, partOf); return; }
    box.classList.remove('ggf');
    var list = LIBQ.q ? GGLibrary.search(LIBQ.q, age) : C.parts.reduce(function (a, pt) { return (!LIBQ.part || LIBQ.part === pt.key) ? a.concat(GGLibrary.forPart(pt.key, age)) : a; }, []);
    if (LIBQ.q && LIBQ.part) list = list.filter(function (it) { return it.part === LIBQ.part; });
    if (!list.length) { box.innerHTML = '<p class="gt-small">' + (LIBQ.q ? 'Nothing found for that. Try a simpler word, like sleep, calm, or friends.' : 'No practices here yet.') + '</p>'; return; }
    box.innerHTML = '<ul class="gt-lib-ul">' + list.slice(0, 80).map(function (it) { return libItemHTML(it, s, age, partOf); }).join('') + '</ul>';
  }
  function openLib(part) {
    closeLib(); LIBQ = { part: part || '', q: '', open: '' };
    var html = '<div class="gt-sheet-back" id="gt-lib" role="dialog" aria-modal="true" aria-labelledby="gt-lib-title" onclick="if(event.target===this)GGTend.closeLib()"><div class="gt-sheet">'
      + '<div class="gt-sheet-head"><h2 id="gt-lib-title">Find more practices</h2><button type="button" class="gt-x" onclick="GGTend.closeLib()" aria-label="Close">&times;</button></div>'
      + '<p class="gt-small">The Grounded practice library. Add any practice to your own, alongside the ones from your growth plan. Suggestions only, never a limit.</p>'
      + '<label class="gt-small" for="gt-lib-q">Search practices, guides, and more</label><input id="gt-lib-q" class="gt-lib-q" type="search" placeholder="Try sleep, calm, or friends" enterkeyhint="search" oninput="GGTend.libFind(this.value)">'
      + '<div class="gt-lib-parts" id="gt-lib-parts"></div><div id="gt-lib-list"><p class="gt-small">Getting the library ready...</p></div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    var sheet = el('gt-lib'); sheet.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLib(); });
    var x = sheet.querySelector('.gt-x'); if (x) x.focus();
    GGLibrary.ready().then(function (ok) { var b = el('gt-lib-list'); if (!b) return; if (ok) drawLib(); else b.innerHTML = '<p class="gt-small">The library did not load. Check your connection and try again.</p>'; });
  }
  function closeLib() { var x = el('gt-lib'); if (x) x.remove(); }

  /* ---------- actions ---------- */
  function persist() { return save().catch(function () { toast('That did not save. Open your profile and try again.'); }); }
  function perk() { var t = el('gt-tree'); if (!t) return; t.classList.remove('perk'); void t.offsetWidth; t.classList.add('perk'); }
  var api = {
    init: function (cfg) { C = cfg; J = mergeJourney(window.GGJourney || {}, cfg.journey); },
    suggest: suggest,
    render: function () { if (!C) return; moveEarlier(); renderToday(); renderWeek(); renderSeason(); },
    setGroveShow: function (on) { var s = ensure(); if (!s) return; s.groveShow = !!on; persist(); publish(s); toast(on ? 'Your growth will show on The Grove.' : 'Your growth stays off The Grove.'); },
    earlierToggle: function () { EARLIER_OPEN = !EARLIER_OPEN; renderSeason(); },
    act: function (name) { if (C.actions[name]) C.actions[name](); },
    state: function () { return ensure(); },
    plan: function () { var s = ensure(); return s ? s.plan : null; },
    setPlan: function (p) { var s = ensure(); if (!s) return false; var old = s.plan || {}; s.plan = JSON.parse(JSON.stringify(p));
      Object.keys(old).forEach(function (k) { var L = (old[k] || {}).lib; if (L && L.length) { if (!s.plan[k]) s.plan[k] = { selected: [] }; if (!s.plan[k].lib) s.plan[k].lib = L; } });
      persist(); renderToday(); return true; },
    openLib: function (part) { openLib(part); }, closeLib: function () { closeLib(); },
    shareFamily: function () { openFamily(); }, closeFamily: function () { closeFamily(); }, famDraw: function () { famDraw(); }, famCopy: function () { famCopy(); }, famShare: function () { famShare(); },
    libFind: function (q) { LIBQ.q = q; drawLib(); }, libPart: function (p) { LIBQ.part = p; LIBQ.q = ''; var f = el('gt-lib-q'); if (f) f.value = ''; drawLib(); },
    libHow: function (safe) { var k = decodeURIComponent(safe); LIBQ.open = LIBQ.open === k ? '' : k; drawLib(); },
    libToggle: function (safe) { libToggle(decodeURIComponent(safe)); },
    onFullCheckin: function (entry) {
      var s = ensure(); if (!s) return null; var d = (entry && entry.date) || today(), msg = null;
      if (!s.start) { s.start = d; s.season = 1; msg = 'Your first season has begun. Week 1 starts today.'; }
      else if (weekNo(s) >= 12) { s.rings = (s.rings || []).concat([{ date: d, season: s.season || 1 }]); s.season = (s.season || 1) + 1; s.start = d; msg = 'A new ring for your tree. Season ' + s.season + ' begins today.'; }
      persist(); api.render(); return msg;
    },
    check: function (safe) {
      var s = ensure(); if (!s) return; var id = decodeURIComponent(safe), x = day(s, today(), true), i = x.d.indexOf(id), before = health(s);
      if (i >= 0) x.d.splice(i, 1); else x.d.push(id);
      persist(); publish(s); renderToday(); if (i < 0) { perk(); var p = partsOn(s, today()); if (C.onCheck) C.onCheck(true, id.split('|')[0], s, p, before); else if (p >= 6) toast('All six parts tended today.'); else if (before > 0) toast('Your tree is perking up.'); } else if (C.onCheck) C.onCheck(false, id.split('|')[0], s);
      renderWeek(); if (C.seasonExtra) renderSeason();
    },
    anchor: function (which) { var s = ensure(); if (!s) return; var x = day(s, today(), true), i = x.a.indexOf(which); if (i >= 0) x.a.splice(i, 1); else x.a.push(which); persist(); publish(s); renderToday(); if (i < 0) { perk(); if (C.onCheck) C.onCheck(true, '', s, partsOn(s, today()), 0); } renderWeek(); },
    easy: function (safe) { var s = ensure(); if (!s) return; var id = decodeURIComponent(safe), x = day(s, today(), true), i = x.e.indexOf(id); if (i >= 0) x.e.splice(i, 1); else x.e.push(id); persist(); renderToday(); },
    note: function (safe, v) { var s = ensure(); if (!s) return; var id = decodeURIComponent(safe), x = day(s, today(), true); v = String(v || '').trim(); if (v) x.n[id] = v.slice(0, 600); else delete x.n[id]; persist(); },
    drawer: function (safe, which) { var id = decodeURIComponent(safe); OPEN[id] = OPEN[id] === which ? '' : which; renderToday(); if (which === 'note' && OPEN[id]) { var t = el('gt-n-' + safe); if (t) t.focus(); } },
    pick: function (b) { var g = b.parentNode; Array.prototype.forEach.call(g.children, function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); }); },
    editWeek: function () { EDIT = true; renderWeek(); EDIT = false; },
    saveWeek: function () {
      var s = ensure(); if (!s) return; var box = el(C.els.week), ans = {};
      box.querySelectorAll('.gt-opts [aria-checked="true"]').forEach(function (b) { ans[b.getAttribute('data-q')] = b.getAttribute('data-a'); });
      if (Object.keys(ans).length < weeklyQs().length) { toast('Answer each question, or choose Not sure.'); return; }
      var k = weekKey(s), refl = (el('gt-refl') || {}).value; s.weeks[k] = Object.assign(s.weeks[k] || {}, { date: today(), ans: ans }); if (refl != null) s.weeks[k].refl = refl.trim(); var sh = el('gt-refl-share'); if (sh) { if (sh.checked) s.weeks[k].share = true; else delete s.weeks[k].share; }
      persist(); renderWeek(); toast('Saved. See you next week.');
    },
    saveRefl: function () { var s = ensure(); if (!s) return; var k = weekKey(s), v = ((el('gt-refl') || {}).value || '').trim(); s.weeks[k] = Object.assign(s.weeks[k] || { date: today() }, { refl: v.slice(0, 4000) }); var sh = el('gt-refl-share'); if (sh) { if (sh.checked) s.weeks[k].share = true; else delete s.weeks[k].share; } persist(); toast(sh && sh.checked ? 'Reflection saved and shared with your grown-up.' : 'Reflection saved.'); },
    month: function (n) { if (!CAL) return; CAL.m += n; if (CAL.m < 0) { CAL.m = 11; CAL.y--; } if (CAL.m > 11) { CAL.m = 0; CAL.y++; } renderWeek(); },
    setLevel: function (v) { var s = ensure(); if (!s) return; s.level = v; persist(); renderToday(); toast('Movement level saved.'); },
    remind: function (on) {
      var R = window.GGApp && GGApp.remind; if (!R) return; var cur = R.get(C.tool) || {}, t = (el('gt-rtime') || {}).value || cur.time || '08:00';
      R.set(C.tool, { on: on === null ? !!cur.on : on, time: t, title: C.toolName, body: 'Your tree is ready for today.' });
    },
    theme: function () { var b = document.querySelector('.gg-theme'); if (b) b.click(); },
    openSettings: openSettings, closeSettings: closeSettings,
    health: function () { var s = ensure(); return s ? health(s) : 0; },
    tended: function (d) { var s = ensure(); return !!(s && tended(s, d)); }, partsOn: function (d) { var s = ensure(); return s ? partsOn(s, d) : 0; },
    treeSVG: treeSVG, _week: function () { var s = ensure(); return s ? weekNo(s) : 0; }
  };
  window.GGTend = api;
})();
