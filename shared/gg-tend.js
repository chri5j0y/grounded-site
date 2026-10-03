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
  function treeSVG(h, parts, big) {
    var R = rng(41), W = 320, H = 250, gy = 210, cx = 160, cy = 104;
    var T = (C && C.tree) || {};
    var pal = (T.pal || [
      ['#6F5517', '#A88A3A', '#D2B260'],   // thriving, Oak gold
      ['#7C6A3C', '#AE9A64', '#CDBB86'],   // dry
      ['#6B5634', '#8F7445', '#A88D5C']    // drooping
    ]).concat([null])[h];                  // bare
    var keep = [1, .92, .55, 0][h] * (0.9 + 0.1 * Math.min(1, parts / 3));
    var drop = [0, 2, 9, 0][h];
    var o = '<svg class="gt-tree-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(LINES[h]) + '" xmlns="http://www.w3.org/2000/svg">';
    if (parts >= 6 && h === 0) o += '<circle cx="' + cx + '" cy="' + cy + '" r="112" fill="#F2B33D" opacity=".16"/>';
    // ground: a thin grass line over soil, roots unseen below it
    o += '<rect x="0" y="' + gy + '" width="' + W + '" height="' + (H - gy) + '" fill="#81654B"/><rect x="0" y="' + (gy + 18) + '" width="' + W + '" height="' + (H - gy - 18) + '" fill="#6E543E"/>';
    o += '<path d="M0 ' + gy + 'H' + W + '" stroke="#5E7D3F" stroke-width="3"/>';
    // trunk with its flare into the ground, and the main limbs
    var tk = h === 3 ? (T.trunkBare || '#5A4636') : (T.trunk || '#4E2E12');
    o += '<path d="M' + (cx - 30) + ' ' + gy + 'Q' + (cx - 14) + ' ' + (gy - 6) + ' ' + (cx - 12) + ' ' + (gy - 36) + 'L' + (cx - 9) + ' ' + (cy + 30) + 'H' + (cx + 9) + 'L' + (cx + 12) + ' ' + (gy - 36) + 'Q' + (cx + 14) + ' ' + (gy - 6) + ' ' + (cx + 30) + ' ' + gy + 'Z" fill="' + tk + '"/>';
    o += '<path d="M' + (cx - 5) + ' ' + (cy + 34) + 'Q' + (cx - 30) + ' ' + (cy + 14) + ' ' + (cx - 66) + ' ' + (cy - 4) + 'M' + (cx + 5) + ' ' + (cy + 32) + 'Q' + (cx + 34) + ' ' + (cy + 12) + ' ' + (cx + 70) + ' ' + (cy - 8) + 'M' + cx + ' ' + (cy + 30) + 'Q' + (cx - 3) + ' ' + (cy - 4) + ' ' + (cx + 4) + ' ' + (cy - 40) + 'M' + (cx - 34) + ' ' + (cy + 12) + 'Q' + (cx - 46) + ' ' + (cy - 14) + ' ' + (cx - 40) + ' ' + (cy - 38) + 'M' + (cx + 38) + ' ' + (cy + 10) + 'Q' + (cx + 50) + ' ' + (cy - 16) + ' ' + (cx + 44) + ' ' + (cy - 36) + '" stroke="' + tk + '" stroke-width="' + (h === 3 ? 5 : 6) + '" fill="none" stroke-linecap="round"/>';
    if (h === 3) o += '<path d="M' + (cx - 66) + ' ' + (cy - 4) + 'l-14 -10M' + (cx + 70) + ' ' + (cy - 8) + 'l16 -8M' + (cx + 4) + ' ' + (cy - 40) + 'l-8 -14M' + (cx - 40) + ' ' + (cy - 38) + 'l-10 -10M' + (cx + 44) + ' ' + (cy - 36) + 'l10 -12" stroke="' + tk + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    if (pal) {
      var clumps = [];
      for (var i = 0; i < 95; i++) {
        var a = R() * Math.PI * 2, rr = Math.sqrt(R()), x = cx + Math.cos(a) * rr * 116, y = cy - 18 + Math.sin(a) * rr * 58;
        clumps.push([x, y, 13 + R() * 9, R()]);
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
        var ax = cx - 80 + k * 32 + (k % 2) * 6, ay = cy + 36 - (k % 3) * 22;
        if (T.fruit === 'leaf') o += '<g transform="translate(' + ax + ' ' + ay + ') rotate(' + (k * 47 % 90 - 45) + ')"><path d="M0 -6C5 -6 7 -1 0 7C-7 -1 -5 -6 0 -6Z" fill="' + (T.fruitColor || '#E8B923') + '" stroke="#8A6A12" stroke-width=".8"/></g>';
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
    return '<div class="gt-anchor gt-' + which + '"><button type="button" class="gt-check' + (on ? ' on' : '') + '" aria-pressed="' + on + '" aria-label="' + esc(A.t) + (on ? ', done' : '') + '" onclick="GGTend.anchor(\'' + which + '\')"></button><div><b>' + esc(A.t) + '</b><p>' + esc(A.b) + '</p></div></div>';
  }
  function practiceHtml(s, it) {
    var id = itemId(it.key, it.name), x = day(s, today()), done = !!(x && x.d.indexOf(id) >= 0), easy = !!(x && x.e.indexOf(id) >= 0);
    var note = (x && x.n && x.n[id]) || '', info = it.custom ? {} : it.lib ? (window.GGLibrary ? GGLibrary.info(it.lib, libAge()) : {}) : (C.practiceInfo(it.key, it.name) || {});
    var safe = encodeURIComponent(id), open = OPEN[id] || '';
    var body = '';
    if (open === 'how' && info.guide) body = '<div class="gt-drawer">' + info.guide + '</div>';
    if (open === 'note') body = '<div class="gt-drawer"><label class="gt-small" for="gt-n-' + safe + '">A note for today (optional)</label><textarea id="gt-n-' + safe + '" rows="2" onchange="GGTend.note(\'' + safe + '\', this.value)">' + esc(note) + '</textarea></div>';
    return '<li class="gt-item' + (done ? ' done' : '') + '"><button type="button" class="gt-check' + (done ? ' on' : '') + '" aria-pressed="' + done + '" aria-label="' + esc(it.name) + (done ? ', done' : '') + '" onclick="GGTend.check(\'' + safe + '\')"></button>'
      + '<div class="gt-item-main"><b>' + esc(it.name) + (it.custom ? ' <span class="gt-own">Your own</span>' : it.lib ? ' <span class="gt-own">From the library</span>' : '') + '</b>'
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
    var html = '<div class="gt-card gt-treecard"><div class="gt-tree" id="gt-tree">' + treeSVG(h, parts) + '</div><div class="gt-tree-side"><p class="gt-status">' + LINES[h] + '</p>'
      + (parts >= 6 ? '<p class="gt-small">All six parts tended today. That is a full day.</p>' : parts ? '<p class="gt-small">' + parts + ' of 6 parts tended today.</p>' : '')
      + '<dl class="gt-stats"><div><dt>Days tended</dt><dd>' + count + '</dd></div><div><dt>Rings</dt><dd>' + ringN(s) + '</dd></div></dl><p class="gt-small">' + seasonLine + '</p></div></div>';
    if (!list.length) {
      var hasCheck = (C.history() || []).length > 0;
      html += '<div class="gt-card gt-empty"><h3>' + (hasCheck ? 'Choose your practices' : 'Start with a check-in') + '</h3><p>' + (hasCheck ? 'Your growth plan is where you choose practices for each part of your tree. Start with about 3 for each part, and a few more for each growing edge. They show up here every day, ready to check off.' : 'The check-in shows how each part of your tree is doing. Then your growth plan turns it into small daily practices that show up here.') + '</p><div class="btn-row">'
        + (hasCheck ? '<button class="btn btn-primary" onclick="GGTend.act(\'plan\')">Build my growth plan</button>' : '<button class="btn btn-primary" onclick="GGTend.act(\'fullCheckin\')">Begin my check-in</button>' + (C.noQuick ? '' : '<button class="btn btn-secondary" onclick="GGTend.act(\'quickCheckin\')">Quick check-in, 2 minutes</button>'))
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
      html += '<section class="gt-part" style="--pc:' + pt.color + '"><h3>' + (C.partIcon ? C.partIcon(pt.key) : '') + '<span>' + esc(pt.part) + '</span><small>' + esc(pt.name) + '</small></h3>' + lv + '<ul>' + mine.map(function (it) { return practiceHtml(s, it); }).join('') + '</ul></section>';
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
    var html = '<div class="gt-weekhead"><p class="gt-kicker">Season ' + (s.season || 1) + ', week ' + w + ' of 12</p><h2>' + esc(W.theme || '') + '</h2><p class="gt-stretch"><b>' + esc(st.name || '') + '.</b> ' + esc(st.line || '') + '</p></div>';
    if (weekNo(s) > 12) html += '<div class="gt-card gt-due"><p><b>Your season check-in is ready.</b> Finish a full check-in to add a ring to your tree and begin a new season.</p><div class="btn-row"><button class="btn btn-primary" onclick="GGTend.act(\'fullCheckin\')">Begin my season check-in</button></div></div>';
    html += '<div class="gt-card"><p class="gt-intro">' + esc(W.intro || '') + '</p>' + (W.story && C.showStory !== false ? '<p class="gt-story">From Grounded: <a class="text-link" href="' + esc(W.story.url) + '" target="_blank" rel="noopener">' + esc(W.story.title) + '</a>. <i>' + esc(W.story.line) + '</i></p>' : '') + '</div>';
    // the quick weekly check-in
    var Qs = weeklyQs(), pv = prevWeek(s);
    if (rec && rec.ans && !EDIT) {
      html += '<div class="gt-card"><h3>This week\'s check-in</h3><ul class="gt-wsum">' + Qs.map(function (q) {
        var a = rec.ans[q.id], lab = ((C.answers || []).filter(function (x) { return x[0] === a; })[0] || [])[1] || 'Skipped', p = pv && pv.ans ? score(pv.ans[q.id]) : null, n = score(a);
        var tr = p === null || n === null ? '' : n > p ? '<span class="gt-up">Up from last week</span>' : n < p ? '<span class="gt-down">Down from last week</span>' : '<span>Same as last week</span>';
        return '<li><b>' + esc(q.label) + '</b><span>' + esc(lab) + '</span>' + tr + '</li>';
      }).join('') + '</ul><div class="btn-row"><button class="btn btn-secondary" onclick="GGTend.editWeek()">Change my answers</button></div></div>';
    } else {
      html += '<div class="gt-card"><h3>This week\'s check-in</h3><p class="gt-small">' + esc(C.weekStem) + '</p><ol class="gt-wq">' + Qs.map(function (q, i) {
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
    html += '<div class="btn-row gt-season-acts"><button class="btn btn-primary" onclick="GGTend.act(\'fullCheckin\')">Begin a full check-in</button>' + (C.noQuick ? '' : '<button class="btn btn-secondary" onclick="GGTend.act(\'quickCheckin\')">Quick check-in, 2 minutes</button>')
      + (C.hasResults() ? '<button class="btn btn-secondary" onclick="GGTend.act(\'results\')">My latest results</button>' : '')
      + '<button class="btn btn-secondary" onclick="GGTend.act(\'progress\')">My progress over time</button></div>';
    html += earlierHtml(s);
    if (hist.length) html += '<div class="gt-card"><h3>Your check-ins</h3><ul class="gt-hist">' + hist.slice().reverse().slice(0, 8).map(function (e) { return '<li><b>' + nice(e.date) + '</b><span>' + (e.type === 'quick' ? 'Quick check-in' : 'Full check-in') + '</span></li>'; }).join('') + '</ul></div>';
    box.innerHTML = html;
  }

  /* ---------- settings, behind the profile picture ---------- */
  function openSettings(focus) {
    var s = ensure(), a = window.GGP && GGP.active();
    var old = el('gt-settings'); if (old) old.remove();
    var R = window.GGApp && GGApp.remind, can = R && R.can && R.can(), rem = can ? R.get(C.tool) : null;
    var lv = (J.LEVELS || []).map(function (L) { return '<label class="gt-radio"><input type="radio" name="gt-level" value="' + L.id + '"' + (s && s.level === L.id ? ' checked' : '') + (s ? '' : ' disabled') + ' onchange="GGTend.setLevel(this.value)"><span><b>' + esc(L.name) + '</b>' + esc(L.desc) + '</span></label>'; }).join('');
    var html = '<div class="gt-sheet-back" id="gt-settings" role="dialog" aria-modal="true" aria-labelledby="gt-set-title" onclick="if(event.target===this)GGTend.closeSettings()"><div class="gt-sheet">'
      + '<div class="gt-sheet-head"><h2 id="gt-set-title">Profile and settings</h2><button type="button" class="gt-x" onclick="GGTend.closeSettings()" aria-label="Close">&times;</button></div>'
      + (C.profileHtml ? C.profileHtml() : a ? '<section><h3>Your profile</h3><p class="gt-who">' + (window.GGAv ? GGAv.html(a.avatar, a.name, 44) : '') + '<b>' + esc(a.name) + '</b></p><div class="btn-row"><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();GGP.manage()">Picture, passcode, and more</button><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();GGP.openDialog()">Switch profile</button><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();GGTend.act(\'lock\')">Lock</button></div></section>'
        : '<section><h3>Your profile</h3><p>Create a private profile to keep your tree, your practices, and your check-ins on this device.</p><div class="btn-row"><button class="btn btn-primary btn-sm" onclick="GGTend.closeSettings();GGTend.act(\'createProfile\')">Create a profile</button><button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();GGTend.act(\'openProfile\')">Open my profile</button></div></section>')
      + '<section id="gt-set-level"><h3>Movement level</h3><p class="gt-small">Shapes the movement shown with your Leaves practices. Change it anytime.</p>' + lv + (s ? '' : '<p class="gt-small">Open your profile to choose a level.</p>') + '</section>'
      + groveSettingsHtml(s)
      + (C.extraSettings ? C.extraSettings() : '')
      + '<section><h3>Daily reminder</h3>' + (can ? '<label class="gt-switch"><input type="checkbox"' + (rem && rem.on ? ' checked' : '') + ' onchange="GGTend.remind(this.checked)"> Remind me to tend my tree</label><label class="gt-small" for="gt-rtime">Time</label> <input type="time" id="gt-rtime" value="' + esc((rem && rem.time) || '08:00') + '" onchange="GGTend.remind(null)">' : '<p class="gt-small">Daily reminders come with the ' + esc(C.toolName) + ' phone app. They are set on your phone, and nothing is sent to a server.</p>') + '</section>'
      + '<section><h3>Reading and display</h3><div class="btn-row">' + (window.GGRead && GGRead.settings ? '<button class="btn btn-secondary btn-sm" onclick="GGRead.settings()">Read aloud voice</button>' : '') + '<button class="btn btn-secondary btn-sm" onclick="GGTend.act(\'textSize\')">Text size</button><button class="btn btn-secondary btn-sm" onclick="GGTend.theme()">Light or dark</button></div></section>'
      + (C.noRecords ? '' : '<section><h3>Your records</h3><div class="btn-row">' + (a ? '<button class="btn btn-secondary btn-sm" onclick="GGP.backup()">Download a backup</button>' : '') + '<button class="btn btn-secondary btn-sm" onclick="GGTend.closeSettings();GGTend.act(\'progress\')">Save or load a results file</button></div><p class="gt-small">Everything stays on this device. To delete a profile and everything in it, open Picture, passcode, and more.</p></section>')
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
    return '<li class="gt-lib-item" style="--pc:' + (pt.color || '#8B5E1A') + '"><div class="gt-lib-top"><b>' + esc(v.name) + '</b><small>' + esc(pt.part || '') + '</small></div>'
      + (v.text ? '<p>' + esc(v.text) + '</p>' : '')
      + '<div class="gt-acts"><button type="button" aria-pressed="' + on + '" onclick="GGTend.libToggle(\'' + safe + '\')">' + (on ? 'In my practices. Take it out' : 'Add to my practices') + '</button>'
      + '<button type="button" aria-expanded="' + open + '" onclick="GGTend.libHow(\'' + safe + '\')">Show me how</button></div>'
      + (open ? '<div class="gt-drawer">' + GGLibrary.guideHtml(v) + '</div>' : '') + '</li>';
  }
  /* Searching: the same engine as the header search. Practices you can add come first,
     then "More from Grow With Grounded" (guides, books, pages), kid-safe in Maple and Aspen. */
  function drawLibFind(box, s, age, partOf) {
    var q = LIBQ.q;
    window.GGSearchLoad().then(function (G) {
      if (!G) { LIBQ.engine = false; drawLib(); return; }
      G.ready().then(function () {
        if (LIBQ.q !== q || !el('gt-lib-list')) return;
        G.draw(box, q, {
          here: C.tool === 'maple' || C.tool === 'aspen' ? C.tool : 'oak', localType: 'practice',
          kid: age === 'maple' || age === 'aspen' ? age : false,
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
      persist(); publish(s); renderToday(); if (i < 0) { perk(); var p = partsOn(s, today()); if (p >= 6) toast('All six parts tended today.'); else if (before > 0) toast('Your tree is perking up.'); }
      renderWeek();
    },
    anchor: function (which) { var s = ensure(); if (!s) return; var x = day(s, today(), true), i = x.a.indexOf(which); if (i >= 0) x.a.splice(i, 1); else x.a.push(which); persist(); publish(s); renderToday(); if (i < 0) perk(); renderWeek(); },
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
    treeSVG: treeSVG, _week: function () { var s = ensure(); return s ? weekNo(s) : 0; }
  };
  window.GGTend = api;
})();
