/* =====================================================================
   GROUNDED . SHARED PRACTICE LIBRARY (Rebrand Session 5)
   One practice library that every app reads: Oak, Maple, Aspen, Pine, Birch,
   Sequoia, and The Grove. The words still live in grove/data.js (the practices) and
   grove/library.js (the "Show me how" steps). Edit them there.

   Each tree app keeps its own practices and its own "How to do this".
   This library adds "Find more practices": anyone can browse the whole
   library by part, read how to do a practice, and add it to their plan.

   The files run in their own scope, so they never clash with a page
   that already has its own copies (The Grove, the site-wide search).

   For tools
     GGLibrary.ready()            a promise; resolves true when loaded
     GGLibrary.forPart(part, age) practices for one part that fit an age
                                  age: 'maple', 'aspen', 'pine', 'birch', or 'oak'
     GGLibrary.search(q, age)     search the whole library
     GGLibrary.get(key)           one practice, or null
     GGLibrary.view(it, age)      {name, text, busy, why, steps, hard, life, adapt}
                                  in the words for that age (life and adapt: Health and
                                  Ability tags from grove/data.js, GWG BLD 756)
     GGLibrary.info(key, age)     {desc, guide, hard, life, adapt} for a tending card
   Sources and Credits (GWG BLD 713): every "Show me how" ends with the quiet Sources line from
   shared/gg-sources.js (Adapted from, Sources, and the story a bedside practice was born from).
   ===================================================================== */
(function () {
  if (window.GGLibrary) return;
  var LIB = null, PARTS = null, waiting = null;
  var FILES = ['/grove/data.js?v=b756', '/grove/library.js?v=b756'];

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  function ready() {
    if (LIB) return Promise.resolve(true);
    if (waiting) return waiting;
    // On The Grove page the library is already loaded.
    if (window.GroveLibrary && typeof PART !== 'undefined') { LIB = window.GroveLibrary; PARTS = PART; return Promise.resolve(true); }
    waiting = Promise.all(FILES.map(function (u) {
      return fetch(u).then(function (r) { return r.ok ? r.text() : ''; }).catch(function () { return ''; });
    })).then(function (t) {
      if (!t[0] || !t[1]) return false;
      try {
        var keep = window.GroveLibrary;
        var got = new Function(t[0] + '\n;' + t[1] + '\n;return { lib: window.GroveLibrary, part: (typeof PART !== "undefined") ? PART : null };')();
        if (keep) window.GroveLibrary = keep; else { try { delete window.GroveLibrary; } catch (e) { window.GroveLibrary = undefined; } }
        LIB = got.lib; PARTS = got.part;
        return !!LIB;
      } catch (e) { return false; }
    });
    return waiting;
  }

  function kid(age) { return age === 'maple'; }
  function fits(it, age) { return LIB ? LIB.fits(it, age === 'oak' ? 'oak' : age) : false; }
  function forPart(part, age) { return LIB ? LIB.items.filter(function (it) { return it.part === part && fits(it, age); }) : []; }
  function search(q, age) { return LIB ? LIB.search(q, age) : []; }
  function get(key) { return LIB ? LIB.get(key) : null; }

  function view(it, age) {
    var k = kid(age) && it.kidName, h = it.how || [];
    var steps = k ? (h[4] || h[1]) : h[1];
    return {
      key: it.name,
      name: (k ? it.kidName : it.name) || it.name,
      text: (k ? it.kidText : it.text) || it.text || '',
      busy: (k ? it.kidBusy : it.busy) || it.busy || '',
      why: (k ? h[3] : h[0]) || h[0] || '',
      steps: steps ? String(steps).split('|') : [],
      hard: (k ? h[5] : h[2]) || h[2] || '',
      bedside: it.bedside || null,
      life: Array.isArray(it.life) ? it.life.slice() : [],
      adapt: it.adapt || '',
      app: age === 'maple' || age === 'aspen' || age === 'pine' || age === 'birch' || age === 'sequoia' ? age : 'lib'
    };
  }
  function guideHtml(v) {
    if (!v.why && !v.steps.length) return '';
    return (v.why ? '<p><b>Why it helps.</b> ' + esc(v.why) + '</p>' : '')
      + (v.steps.length ? '<p style="margin-bottom:2px"><b>How to do it.</b></p><ol>' + v.steps.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>' : '')
      + (v.hard ? '<p><b>If it\'s hard.</b> ' + esc(v.hard) + '</p>' : '')
      + (v.bedside ? bedsideHtml(v.bedside) : '')
      + (window.GGShelf && v.key ? GGShelf.html('practice', v.key) : '')
      + (window.GGSources && v.key ? GGSources.practice(v.key, v.app, v.bedside) : '');
  }
  // From the Bedside: a practice born from one of Chris's stories, with its lesson and (when published) the story.
  function bedsideHtml(b) {
    var L = b.lesson || [];
    return '<p class="gg-bedside" style="border-left:4px solid #8B5E1A;padding:6px 0 6px 12px;margin:10px 0"><b>From the Bedside.</b> Born from the story ' + esc(b.story) + '.'
      + (L.length === 2 ? ' <button type="button" class="gg-bedside-go" style="font:inherit;font-weight:600;color:inherit;background:none;border:0;text-decoration:underline;cursor:pointer;padding:4px 2px" onclick="window.GGLearn ? GGLearn.open(\'' + esc(L[0]) + '\', \'' + esc(L[1]) + '\') : location.assign(\'/' + esc(L[0]) + '/\')">Watch the Video</button>' : '')
      + (b.href ? ' <a href="' + esc(b.href) + '" target="_blank" rel="noopener">Read the Full Story</a>' : '') + '</p>';
  }
  function info(key, age) {
    var it = get(key); if (!it) return {};
    var v = view(it, age);
    return { desc: v.text, guide: guideHtml(v), hard: v.busy || v.hard, life: v.life, adapt: v.adapt };
  }

  window.GGLibrary = { ready: ready, forPart: forPart, search: search, get: get, view: view, info: info, guideHtml: guideHtml, fits: fits };
})();
