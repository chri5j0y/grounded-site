/* =====================================================================
   HEALTH AND ABILITY IN THE ADULT TREES (shared/gg-life-kit.js), GWG BLD 756, HA 1
   Small shared pieces that Birch, Oak, and Sequoia use on top of
   shared/gg-life.js (the choice itself). Nothing here reads or saves a
   person's choice on its own: it asks GGLife, which keeps the choice
   locked in the person's vault. Nothing here ever changes a question,
   a score, a flag, an alert, or a crisis line.

   For tools
     GGLifeKit.RING            {key: 'life', name: 'Health and Ability', color, blurb}
                               the When Life Changes ring, open to everyone
     GGLifeKit.tagged(topics)  guides with a life tag, in their own order
     GGLifeKit.picked(tree, topics)  guides that fit the choice (Picked for You)
     GGLifeKit.fits(tags)      GGLife.fits, false when GGLife is missing
     GGLifeKit.fitHtml(adapt)  the "Fits You" tag and the adapt line, for a practice row
     GGLifeKit.steps(tree, part)  growth plan idea lines for a Growing Edge part,
                               one per chosen category (never asking more on a hard day)
     GGLifeKit.notes(q, tree)  {ex: [...], tip: ''} from a question's life notes
     GGLifeKit.linesHtml(tree, lineHtml)  Information and Support lines, for BELOW
                               the crisis lines (never in their place)
     GGLifeKit.settingsHtml(tree, id)  a Settings section that mounts the chooser
     GGLifeKit.on(fn)          run fn when the choice changes (or the profile does)
   No dashes in any words here; Title Case for names.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGLifeKit) return;
  function G() { return window.GGLife || null; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var CSS = '.glk-adapt{display:block;margin:6px 0 0;font-size:.92em;line-height:1.45;color:var(--ink-soft,#5b5b5b);}'
    + '.glk-adapt b{color:var(--ink,#222);font-weight:600;}'
    + '.glk-picks{margin:0 0 18px;padding:14px 16px;border:1px solid var(--line,#ddd);border-left:5px solid #3F7C9C;border-radius:12px;background:var(--card,#fff);}'
    + '.glk-picks h3{margin:0 0 4px;font-size:1.05rem;}.glk-picks p{margin:0 0 10px;font-size:.95rem;color:var(--ink-soft,#5b5b5b);}'
    + '.glk-picks .lc-links,.lc-life-links{display:flex;flex-wrap:wrap;gap:8px;}'
    + '.glk-picks .lc-links button,.lc-life-links button{font:inherit;font-size:.95rem;padding:8px 12px;border-radius:999px;border:1px solid var(--line,#ccc);background:transparent;color:inherit;cursor:pointer;min-height:40px;text-align:left;}'
    + '.glk-picks .lc-links button:hover,.glk-picks .lc-links button:focus-visible,.lc-life-links button:hover,.lc-life-links button:focus-visible{border-color:#3F7C9C;}'
    + '.glk-lines{margin-top:14px;}.glk-lines h3,.glk-lines h4{margin:0 0 6px;font-size:1rem;}.glk-lines p{margin:0 0 8px;font-size:.92rem;}'
    + '.glk-step{list-style:none;margin-left:-1.1em;padding-left:1.1em;}'
    + '.glk-ex{margin:8px 0 0;padding-left:1.1em;font-size:.92rem;color:var(--ink-soft,#5b5b5b);}.glk-ex li{margin:2px 0;}'
    + '.glk-tip{margin:6px 0 0;font-size:.92rem;color:var(--ink-soft,#5b5b5b);}';
  function addCSS() {
    if (document.getElementById('glk-css')) return;
    var s = document.createElement('style'); s.id = 'glk-css'; s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }
  if (document.head) addCSS(); else document.addEventListener('DOMContentLoaded', addCSS);

  var RING = { key: 'life', name: 'Health and Ability', color: '#3F7C9C',
    blurb: 'Guides that touch living with a health condition or a disability, and walking beside someone who is. Open to everyone, whatever you chose in Settings.' };

  function tagged(topics) { return (topics || []).filter(function (t) { return t && Array.isArray(t.life) && t.life.length; }); }
  function picked(tree, topics) {
    var g = G(); if (!g) return [];
    var ids = g.picks(tree, tagged(topics));
    return ids.map(function (id) { return (topics || []).find(function (t) { return t.id === id; }); }).filter(Boolean);
  }
  function fits(tags) { var g = G(); try { return !!(g && g.fits(tags)); } catch (e) { return false; } }
  function fitHtml(adapt) {
    var g = G(), tag = '<span class="pm-tags"><span class="pm-tag pm-fit">' + esc(g ? g.FITS : 'Fits You') + '</span></span>';
    return tag + (adapt ? '<span class="glk-adapt"><b>A way that fits.</b> ' + esc(adapt) + '</span>' : '');
  }

  /* Growth plan ideas for a Growing Edge part: one line for each chosen category.
     A part's own line comes first; otherwise the line that fits any part. Each one
     makes the step smaller or kinder, never bigger. */
  var STEPS = {
    any: {
      health: 'Pick a step small enough for a hard day too, and count the days you rest as part of the plan.',
      pain: 'Plan this for a better hour of the day, and let a hard day\'s smaller version be enough.',
      moving: 'Shape this step to how your body moves: seated, rolling, or with a helper all count.',
      hearing: 'Choose a way that works for you: in sign, with captions, by text, or in a quiet room.',
      seeing: 'Choose a way that works for you: by sound, by touch, in large print, or with a screen reader.',
      learning: 'Break this into one small step, with a reminder you can see.',
      autism: 'Keep this step predictable: the same time, the same place, and a quiet way to do it.',
      mind: 'Go at your own pace, and bring this step to your counselor or doctor if that helps.',
      serious: 'On treatment or hospital days, the smallest version counts fully, and rest is tending too.',
      memory: 'Use a note, a calendar, or a helper\'s reminder, and keep this step the same each day.',
      close: 'Leave room for your own rest too. Tending yourself helps the person you love.'
    },
    leaves: {
      health: 'Rest when your body asks, and keep one steady habit, like water within reach or a regular wake time.',
      pain: 'Gentle movement on good days, rest without guilt on hard ones.',
      moving: 'Move each day in the way your body moves: chair moves, rolling, stretching in bed, or a walk with a cane all count.',
      serious: 'Let rest, water, and small meals count as tending on treatment days.',
      mind: 'Daylight, a steady wake time, and gentle movement help mood. Start with the one that feels easiest.',
      memory: 'Keep the same simple routine each day: wake time, meals, and a short walk or chair moves.'
    },
    bark: {
      pain: 'When pain rises, try slow breathing, and be as kind to yourself as you would be to a friend in pain.',
      mind: 'Keep using the tools your counselor or doctor gave you, and add one calming practice from your plan.',
      autism: 'Plan a quiet reset for after busy or loud times.',
      learning: 'Use a timer or a list to make room for one calm pause each day.',
      close: 'Give yourself a few minutes each day that are just for you.'
    },
    branches: {
      hearing: 'Ask people to face you, turn on captions, or text, and look for a Deaf or hard of hearing group if that fits you.',
      seeing: 'Ask for what helps you join in, like a ride, a described setting, or a call instead of a message.',
      moving: 'Choose places you can get into easily, and ask about access before you go.',
      close: 'Find one person or group who understands what caring for someone is like.',
      serious: 'Let people know one specific way they can help this week.',
      autism: 'Choose one person or group built around something you enjoy, and go at your own pace.'
    },
    roots: {
      serious: 'A short prayer, a quiet minute, or a familiar song from bed counts.',
      moving: 'Worship or quiet time from home, online, or by radio counts fully.',
      pain: 'A short practice in the time of day you feel best counts fully.'
    },
    trunk: {
      health: 'Name one way you matter, beyond what your body can do today.',
      pain: 'Name one way you matter, beyond what your body can do today.',
      serious: 'One small act that matters to you counts, even from a chair or a bed.'
    },
    fruit: {
      serious: 'Plan one small good thing for each week of treatment.',
      pain: 'Plan one small good thing that fits a low energy day.',
      mind: 'Write down one good thing each day, even a small one.'
    }
  };
  function steps(tree, part) {
    var g = G(); if (!g) return [];
    var out = [];
    g.chosen(tree).forEach(function (id) { var x = (STEPS[part] || {})[id] || STEPS.any[id]; if (x && out.indexOf(x) < 0) out.push(x); });
    return out;
  }
  function stepsHtml(tree, part) { return steps(tree, part).map(function (x) { return '<li class="glk-step">' + esc(x) + '</li>'; }).join(''); }

  /* Check-in notes: q.life = {id: {ex, tip}} (from the tree's checkin.js). Only ex and tip,
     exactly like Birch's My Season notes: the question, the answers, and the score stay the same. */
  function notes(q, tree) {
    var g = G(), out = { ex: [], tip: '' }; if (!g || !q || !q.life) return out;
    var tips = [];
    g.chosen(tree).forEach(function (id) { var n = q.life[id]; if (!n) return; if (n.ex && out.ex.indexOf(n.ex) < 0) out.ex.push(n.ex); if (n.tip && tips.indexOf(n.tip) < 0) tips.push(n.tip); });
    out.tip = tips.join(' ');
    return out;
  }
  function notesHtml(q, tree, withTip) {
    var n = notes(q, tree);
    return (n.ex.length ? '<ul class="glk-ex" aria-label="Examples that fit you">' + n.ex.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '')
      + (withTip && n.tip ? '<p class="glk-tip">' + esc(n.tip) + '</p>' : '');
  }

  /* Help lines for the choice: information and support, always BELOW the crisis lines. */
  function linesHtml(tree, lineHtml) {
    var g = G(); if (!g) return '';
    var L = g.lines(tree); if (!L.length) return '';
    var row = typeof lineHtml === 'function' ? lineHtml : function (x) {
      var href = x.tel ? 'tel:' + x.tel : x.url || '';
      return '<li><b>' + esc(x.name) + '</b>' + (href ? '<a href="' + esc(href) + '"' + (x.tel ? '' : ' target="_blank" rel="noopener"') + '>' + esc(x.show || x.how || '') + '</a>' : '') + (x.note ? '<span class="sq-linenote">' + esc(x.note) + '</span>' : '') + '</li>';
    };
    return '<div class="glk-lines"><h4>' + esc(g.LINES_TITLE || 'Information and Support') + '</h4><p>Information and support for what you chose in Health and Ability. In a crisis, use the lines above.</p><ul class="calm-list sq-lines">' + L.map(function (x) { return row(x); }).join('') + '</ul></div>';
  }

  /* Settings: a section that holds the one-screen chooser. */
  function settingsHtml(tree, id) {
    var g = G(); if (!g) return '';
    var hid = id + '-host';
    setTimeout(function () { var h = document.getElementById(hid); if (h && !h.getAttribute('data-on') && window.GGLife) { h.setAttribute('data-on', '1'); GGLife.chooser(h, { tree: tree }); } }, 0);
    return '<section id="' + esc(id) + '"><div id="' + esc(hid) + '"></div></section>';
  }

  function on(fn) { window.addEventListener('gglife:change', function (e) { try { fn(e.detail); } catch (x) { console.error(x); } }); }

  window.GGLifeKit = { RING: RING, tagged: tagged, picked: picked, fits: fits, fitHtml: fitHtml, steps: steps, stepsHtml: stepsHtml,
    notes: notes, notesHtml: notesHtml, linesHtml: linesHtml, settingsHtml: settingsHtml, on: on, esc: esc };
})();
