/* =====================================================================
   THE FIELD GUIDE, THE PAGE (shared/the-field-guide.js)   GWG BLD 838, October 2026
   The live parts of the-field-guide.html, the public page for people who are new to the Field Guide:
     Sample videos   two public videos from Oak, played in shared/gg-learn.js with Brian's recorded clips, the way
                     shared/living-sober.js plays its Start Here videos (the loaders wait for a tap):
                       ok-s-listen               Listening Beneath the Words (Oak Learn, Shelter for Others)
                       ok-g-loneliness-helper    Loneliness: For the Helper (Oak When Life Changes)
                     The promo video and A Taste of For Guides are page videos (shared/page-videos.js, data-gg-watch).
                     Nothing sealed is used here: every sample is already public in the Oak app or was written for this page.
     Request Access  the practitioner request opens an email with a few questions, the way the Field Guide's own sign-in
                     screen does (the address is put together here so it is never posted as plain text).
   Links that open a sample: #watch=<id>. The video waits on its Play button. Nothing personal is kept here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGFieldGuidePage) return;
  var READ = '/read.js?v=b813', LEARN = '/shared/gg-learn.js?v=b863', LESSONS = '/shared/learn-lessons.js?v=b852', GUIDES = '/oak/guide-videos.js?v=b852';
  var ACC = '#6E4A14';
  var SAMPLES = [
    { id: 'ok-s-listen', kind: 'lesson', track: 'oak-shelter', eyebrow: 'From Oak Learn', title: 'Listening Beneath the Words' },
    { id: 'ok-g-loneliness-helper', kind: 'guide', guide: 'loneliness', side: 'helper', eyebrow: 'From Oak, When Life Changes', title: 'Loneliness: For the Helper' }
  ];
  var esc = function (x) { return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function need(src, test) { return new Promise(function (ok) { if (test()) return ok(); var s = document.createElement('script'); s.src = src; s.onload = s.onerror = function () { ok(); }; document.head.appendChild(s); }); }

  /* ---------- Request Access: an email with a few questions ---------- */
  function mailLink(kind) {
    var to = 'hello' + '@' + 'growwithgrounded.com';
    var m = kind === 'org'
      ? ['Field Guide for our organization', ['Organization:', 'Your name and role:', 'What kind of organization (church, school, other):', 'About how many people would use it:', 'Anything else we should know:']]
      : ['Field Guide access request', ['Your name:', 'Your role (chaplain, pastor, teacher, coach, other):', 'Where you serve:', 'How you would use the Field Guide:', 'Yearly ($240) or monthly ($24):']];
    return 'mailto:' + to + '?subject=' + encodeURIComponent(m[0]) + '&body=' + encodeURIComponent(m[1].join('\n\n') + '\n');
  }
  function mails() { Array.prototype.forEach.call(document.querySelectorAll('[data-fg-mail]'), function (a) { a.href = mailLink(a.getAttribute('data-fg-mail')); }); }

  /* ---------- the sample videos, in the player overlay (the living-sober.js pattern) ---------- */
  var OPEN = null;
  function close() {
    var o = OPEN; if (!o) return; OPEN = null;
    try { if (o.ctl) o.ctl.stop(); } catch (e) {}
    document.removeEventListener('keydown', onKey, true);
    o.root.remove(); document.body.style.overflow = o.overflow || '';
    if (o.from && o.from.focus) try { o.from.focus({ preventScroll: true }); } catch (e) {}
  }
  function onKey(e) { if (OPEN && e.key === 'Escape') { e.preventDefault(); close(); } }
  function find(meta) {
    if (meta.kind === 'lesson') {
      var G = (window.GG_LEARN || {}).oak || {}, hit = null;
      (G.tracks || []).forEach(function (t) { if (t.id === meta.track) (t.lessons || []).forEach(function (l) { if (l.id === meta.id) hit = { t: t, l: l }; }); });
      return hit;
    }
    var O = (window.GG_LEARN_GUIDES || {}).oak || {}, g = (O.guides || []).filter(function (x) { return x.id === meta.guide; })[0];
    var v = g && g[meta.side];
    return v ? { t: { id: 'oak-guides', kind: 'guide', title: 'When Life Changes' }, l: v } : null;
  }
  function watch(id, from) {
    var meta = SAMPLES.filter(function (x) { return x.id === id; })[0]; if (!meta) return Promise.resolve();
    var data = meta.kind === 'lesson' ? need(LESSONS, function () { return !!window.GG_LEARN; }) : need(GUIDES, function () { return !!(window.GG_LEARN_GUIDES && window.GG_LEARN_GUIDES.oak); });
    return need(READ, function () { return !!window.GGRead; }).then(function () { return need(LEARN, function () { return !!window.GGLearn; }); })
      .then(function () { return data; }).then(function () {
        var hit = find(meta); if (!hit || !window.GGLearn) return;
        var keepFrom = OPEN ? OPEN.from : (from || document.activeElement);
        if (OPEN) { try { OPEN.ctl.stop(); } catch (e) {} OPEN.root.remove(); document.removeEventListener('keydown', onKey, true); }
        GGLearn.css();
        var l = hit.l, at = SAMPLES.indexOf(meta), nx = SAMPLES[at + 1] || null;
        var root = document.createElement('div');
        root.className = 'ggl ggl-app fg-pv'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'Video: ' + meta.title);
        root.style.setProperty('--ggl-acc', ACC); root.style.setProperty('--ggl-bar', '#2C1E10'); root.style.setProperty('--ggl-lite', '#EBDDC4');
        root.innerHTML = '<div class="ggl-top"><img src="/shared/marks/fieldguide.svg" alt=""><b>The Field Guide</b><button type="button" class="ggl-x" data-fg-x="1">Back to the Page</button></div>'
          + '<div class="ggl-in"><div class="ggl-eb">Sample, ' + esc(meta.eyebrow) + '</div><h1 tabindex="-1">' + esc(meta.title) + '</h1><p class="ggl-muted">' + esc(l.blurb || '') + ' About ' + esc(String(l.mins || 4)) + ' minutes.</p><div class="fg-host"></div></div>';
        document.body.appendChild(root);
        OPEN = { root: root, from: keepFrom, overflow: OPEN ? OPEN.overflow : document.body.style.overflow };
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onKey, true);
        root.addEventListener('click', function (e) { if (e.target.closest('[data-fg-x]')) close(); });
        var btns = [];
        if (nx) btns.push(['next', 'Next Sample: ' + nx.title, 'pri']);
        else btns.push(['get', 'Request Access', 'pri']);
        btns.push(['again', 'Watch Again', '']);
        btns.push(['back', 'Back to the Page', 'quiet']);
        var track = { id: 'fg-samples', kind: 'support', title: 'Samples', lessons: [l] }, done = {};
        OPEN.ctl = GGLearn.player(root.querySelector('.fg-host'), {
          app: 'site', lesson: l, track: track, tracks: [track], done: done, at: 0, accent: ACC, mood: 'calm',
          voice: GGLearn.recVoice({ app: 'oak', lesson: l, track: hit.t }, true) || 'brian',
          mark: { name: 'Field Guide' },
          ending: { eyebrow: 'The Field Guide', h: 'Take all the time you need.', sub: nx ? 'Up next: ' + nx.title : 'The Field Guide holds a Guide, training, and videos like this for every tree.', say: 'Take all the time you need.', ok: true, buttons: btns },
          onDone: function (x) { done[x] = 1; },
          onEnd: function (b) {
            if (b === 'next' && nx) watch(nx.id);
            else if (b === 'again') watch(id);
            else if (b === 'get') { close(); var s = $('#get-it'); if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            else if (b === 'back') close();
          },
          open: function () {}, home: close
        });
        var h1 = root.querySelector('h1'); if (h1) try { h1.focus({ preventScroll: true }); } catch (e) {}
      });
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-fg-watch]'); if (!t) return;
    e.preventDefault(); watch(t.getAttribute('data-fg-watch'), t);
  });
  function boot() {
    mails();
    Array.prototype.forEach.call(document.querySelectorAll('[data-fg-watch]'), function (b) { b.hidden = false; });
    var m = /^#watch=([\w-]+)$/.exec(location.hash || '');
    if (m && SAMPLES.some(function (x) { return x.id === m[1]; })) watch(m[1]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  window.GGFieldGuidePage = { watch: watch, samples: SAMPLES, mailLink: mailLink };
})();
