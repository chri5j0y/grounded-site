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
  function health(s) {
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
  // the scene. Thriving shows the full crown in the palette's shade, body, and light, with a
  // gold catkin for each part tended today. Dry thins the crown a little; drooping thins it
  // more and lets it hang; resting bare shows the white trunks and their limbs. Never anything gone.
  var BIRCH_CROWN = [[31.6,21.7,4.3,0],[35.3,42.3,6.0,0],[71.9,30.5,6.9,0],[56.1,40.3,6.7,0],[31.6,20.0,6.8,0],[55.9,48.1,4.4,0],[32.4,19.5,4.7,0],[40.3,50.2,6.4,0],[34.0,39.3,5.5,0],[32.8,17.5,5.0,0],[59.2,49.2,6.0,0],[34.5,36.9,4.3,0],[59.8,40.8,6.8,0],[49.0,46.4,5.2,0],[48.1,55.0,6.4,0],[34.5,46.8,6.2,0],[34.7,46.9,5.1,0],[50.7,36.5,4.7,0],[28.4,30.8,4.2,0],[53.2,48.8,6.6,0],[52.3,17.1,6.7,0],[32.8,43.8,4.2,0],[65.1,28.1,3.6,1],[24.5,37.2,4.9,1],[54.0,43.6,5.7,1],[74.4,28.1,5.1,1],[47.5,32.8,3.7,1],[58.3,38.6,3.4,1],[37.3,50.1,5.2,1],[64.4,37.1,4.0,1],[67.3,22.6,4.2,1],[74.0,25.6,4.4,1],[52.4,36.2,4.9,1],[45.1,44.3,3.6,1],[66.4,33.7,5.3,1],[43.4,49.3,5.1,1],[50.8,23.1,3.6,1],[48.0,39.7,5.3,1],[57.8,28.8,5.0,1],[73.0,28.6,5.0,1],[57.4,24.3,5.0,1],[60.8,17.3,3.9,1],[40.9,36.6,3.9,1],[60.1,41.7,2.7,2],[39.9,49.5,3.9,2],[76.5,34.6,4.3,2],[51.7,20.2,2.6,2],[38.5,35.0,2.6,2],[56.1,12.7,2.9,2],[33.4,18.9,3.7,2],[61.8,24.4,3.9,2],[60.1,41.8,3.5,2],[53.1,41.8,4.3,2],[69.7,36.9,4.4,2],[44.6,16.2,3.9,2],[52.5,41.6,3.8,2],[52.7,11.1,2.7,2],[46.8,51.4,4.0,2],[44.5,13.6,4.0,2],[36.1,48.3,4.1,2],[53.9,41.2,3.4,2],[44.8,42.2,4.2,2],[37.9,21.4,3.1,2],[49.4,14.2,3.8,2]];
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
    if (!pal) return o + '</g>';
    var keep = [1, .86, .62][h] * (0.9 + 0.1 * Math.min(1, parts / 3)), sag = [0, .8, 2.8][h];
    [0, 1, 2].forEach(function (layer) {
      o += '<g fill="' + pal[layer] + '">';
      BIRCH_CROWN.forEach(function (c, i) {
        if (c[3] !== layer || ((i * 37) % 100) / 100 > keep) return;
        o += '<circle cx="' + c[0] + '" cy="' + f(c[1] + sag * (0.4 + (c[1] - 10) / 45)) + '" r="' + c[2] + '"/>';
      });
      o += '</g>';
    });
    // the fine hanging tips, longer as the tree droops
    [[30, 40, 48], [34, 46, 54], [66, 40, 49], [70, 44, 55], [38, 50, 58], [62, 50, 58]].forEach(function (t, i) {
      var y1 = t[2] + sag * 1.6;
      o += '<path d="M' + t[0] + ' ' + f(t[1] + sag) + 'Q' + (t[0] + (i % 2 ? 1.5 : -1.5)) + ' ' + f((t[1] + y1) / 2 + sag / 2) + ' ' + (t[0] + (i % 2 ? .5 : -.5)) + ' ' + f(y1) + '" stroke="' + pal[1] + '" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
    });
    // catkins, one for each part tended today, when the tree is well
    if (h <= 1) {
      var spots = [[36, 44], [60, 38], [46, 50], [66, 48], [42, 32], [54, 30]];
      for (var c = 0; c < Math.min(6, parts); c++) o += '<path d="M' + spots[c][0] + ' ' + spots[c][1] + 'v4.8" stroke="' + (T.fruitColor || '#7F6610') + '" stroke-width="1.7" stroke-linecap="round"/>';
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
