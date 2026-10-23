/* =====================================================================
   LIVING SOBER, THE PAGE (shared/living-sober.js)   GWG BLD 837, October 2026
   The live parts of living-sober.html:
     Today's Encouragement and a Mantra   from shared/sober-words.js (window.GGSoberWords), picked by the day of the year;
                                           a quiet empty state until the words load
     Start Here                           three Growing a Healthy Tree videos from Oak (shared/learn-lessons.js, loaded on tap),
                                           played in shared/gg-learn.js with Brian's recorded clips
     Early Days: 30 Days                  the day list from shared/sober-30.js (window.GGSober30), each day in the player overlay
     Share                                every Share button opens a branded picture (shared/gg-sharecard.js); Share This Page
                                           sends the page address (the phone's share sheet, or Copy)
   Links that open a video: #watch=<lesson id> (Start Here) and #day=<n> (Early Days). The video waits on its Play button.
   Nothing personal is kept here. The viewer's choices stay in the apps' locked vault.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGLivingSober) return;
  var PAGE = 'https://growwithgrounded.com/living-sober';
  var READ = '/read.js?v=b813', LEARN = '/shared/gg-learn.js?v=b839', LESSONS = '/shared/learn-lessons.js?v=b836';
  var ACC = '#4E7D6A';
  // Start Here: the most welcoming three of Oak's Growing a Healthy Tree (shared/learn-lessons.js, track oak-sober).
  var START = [
    { id: 'ok-ls-tree', title: 'The Healthy Tree', mins: 6, blurb: 'The six parts of your tree, and Chris’s three kinds of tools: mind, body, and spirit.' },
    { id: 'ok-ls-morning', title: 'A First Morning Rhythm', mins: 4, blurb: 'Water, light, breath, a choice, and a short walk to start a Sober day.' },
    { id: 'ok-ls-breathe', title: 'Breathe Through It', mins: 4, blurb: 'Slow, low, and long: a breath for cravings, anger, and hard nights.' }
  ];
  var esc = function (x) { return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function need(src, test) { return new Promise(function (ok) { if (test()) return ok(); var s = document.createElement('script'); s.src = src; s.onload = s.onerror = function () { ok(); }; document.head.appendChild(s); }); }
  var SHARE = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3"/><path d="M7.5 7.5L12 3l4.5 4.5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>';
  var PLAY = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z" fill="currentColor"/></svg>';

  /* ---------- Today's Encouragement and a Mantra ---------- */
  function dayOfYear(d) { d = d || new Date(); var s = new Date(d.getFullYear(), 0, 0); return Math.floor((d - s) / 86400000); }
  function pick(list, n) {
    var W = window.GGSoberWords; if (!W) return null;
    if (typeof W.pick === 'function') return W.pick(list, n);
    var L = W[list]; if (!L || !L.length) return null; return L[((n % L.length) + L.length) % L.length];
  }
  var TODAY = { daily: null, mantra: null };
  function words() {
    var n = dayOfYear(), d = pick('daily', n - 1), m = pick('mantras', n - 1);
    TODAY.daily = d; TODAY.mantra = m;
    var dt = $('#ls-daily-text'), mt = $('#ls-mantra-text');
    if (dt) dt.textContent = d ? d.text : 'Today’s encouragement is on its way. Take one slow breath while it arrives.';
    if (mt) mt.textContent = m ? m.text : 'One day at a time.';
    Array.prototype.forEach.call(document.querySelectorAll('[data-ls-share="daily"],[data-ls-share="mantra"]'), function (b) { b.disabled = !(b.getAttribute('data-ls-share') === 'daily' ? d : m); });
    var wk = $('#ls-week'), w = pick('weekly', Math.floor((n - 1) / 7));
    if (wk && w) { wk.hidden = false; $('#ls-week-title', wk).textContent = w.title || ''; $('#ls-week-text', wk).textContent = w.text || ''; TODAY.weekly = w; }
  }

  /* ---------- the player overlay for Start Here (the Get Grounded Now pattern, shared/ggn.js) ---------- */
  var OPEN = null;
  function close() {
    var o = OPEN; if (!o) return; OPEN = null;
    try { if (o.ctl) o.ctl.stop(); } catch (e) {}
    document.removeEventListener('keydown', onKey, true);
    o.root.remove(); document.body.style.overflow = o.overflow || '';
    if (o.from && o.from.focus) try { o.from.focus({ preventScroll: true }); } catch (e) {}
  }
  function onKey(e) { if (OPEN && e.key === 'Escape') { e.preventDefault(); close(); } }
  function oakLesson(id) {
    var G = window.GG_LEARN || {}, hit = null;
    ((G.oak || {}).tracks || []).forEach(function (t) { (t.lessons || []).forEach(function (l) { if (l.id === id) hit = { t: t, l: l }; }); });
    return hit;
  }
  function watch(id, from) {
    var meta = START.filter(function (x) { return x.id === id; })[0]; if (!meta) return Promise.resolve();
    return need(READ, function () { return !!window.GGRead; }).then(function () { return need(LEARN, function () { return !!window.GGLearn; }); })
      .then(function () { return need(LESSONS, function () { return !!window.GG_LEARN; }); }).then(function () {
        var hit = oakLesson(id); if (!hit || !window.GGLearn) return;
        var keepFrom = OPEN ? OPEN.from : (from || document.activeElement);
        if (OPEN) { try { OPEN.ctl.stop(); } catch (e) {} OPEN.root.remove(); document.removeEventListener('keydown', onKey, true); }
        GGLearn.css();
        var l = hit.l, at = START.map(function (x) { return x.id; }).indexOf(id), nx = START[at + 1] || null;
        var root = document.createElement('div');
        root.className = 'ggl ggl-app ls-pv'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'Video: ' + l.title);
        root.style.setProperty('--ggl-acc', ACC); root.style.setProperty('--ggl-bar', '#1F3229'); root.style.setProperty('--ggl-lite', '#CFE3D8');
        root.innerHTML = '<div class="ggl-top"><img src="/shared/marks/living-sober-tab.svg?v=b839" alt=""><b>Living Sober</b><button type="button" class="ggl-x" data-ls-x="1">Back to Living Sober</button></div>'
          + '<div class="ggl-in"><div class="ggl-eb">Start Here, ' + (at + 1) + ' of ' + START.length + '</div><h1 tabindex="-1">' + esc(l.title) + '</h1><p class="ggl-muted">' + esc(l.blurb || meta.blurb) + ' About ' + esc(String(l.mins || meta.mins)) + ' minutes.</p><div class="ls-host"></div></div>';
        document.body.appendChild(root);
        OPEN = { root: root, from: keepFrom, overflow: OPEN ? OPEN.overflow : document.body.style.overflow };
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onKey, true);
        root.addEventListener('click', function (e) { if (e.target.closest('[data-ls-x]')) close(); });
        var btns = [];
        if (nx) btns.push(['next', 'Next: ' + nx.title, 'pri']);
        else btns.push(['days', 'Early Days: 30 Days', 'pri']);
        btns.push(['share', 'Share This Video', '']);
        btns.push(['again', 'Watch Again', '']);
        btns.push(['back', 'Back to Living Sober', 'quiet']);
        var track = { id: 'ls-start', kind: 'support', title: 'Start Here', lessons: [l] }, done = {};
        OPEN.ctl = GGLearn.player(root.querySelector('.ls-host'), {
          app: 'site', lesson: l, track: track, tracks: [track], done: done, at: 0, accent: ACC, mood: 'calm',
          voice: GGLearn.recVoice({ app: 'oak', lesson: l, track: hit.t }, true) || 'brian',
          mark: { name: 'Living Sober' },
          ending: { eyebrow: 'Living Sober', h: 'Take all the time you need.', sub: nx ? 'Up next: ' + nx.title : 'Next: thirty short videos, one for each early day.', say: 'Take all the time you need.', ok: true, buttons: btns },
          onDone: function (x) { done[x] = 1; },
          onEnd: function (b) {
            if (b === 'next' && nx) watch(nx.id);
            else if (b === 'again') watch(id);
            else if (b === 'share') shareVideo(meta);
            else if (b === 'days') { close(); var s = $('#early-days'); if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            else if (b === 'back') close();
          },
          open: function () {}, home: close
        });
        var h1 = root.querySelector('h1'); if (h1) try { h1.focus({ preventScroll: true }); } catch (e) {}
      });
  }

  /* ---------- Early Days: 30 Days ---------- */
  function days() {
    var host = $('#ls-days'); if (!host) return;
    var S = window.GGSober30;
    if (!S || !S.lessons || !S.lessons.length) { host.innerHTML = '<p class="ls-empty">The thirty days are on their way. Start Here holds three videos to begin with today.</p>'; return; }
    host.innerHTML = '<ol class="ls-days">' + S.lessons.map(function (l) {
      return '<li class="ls-day" id="day-' + l.n + '"><span class="ls-dn" aria-hidden="true">' + l.n + '</span><div class="ls-dt"><b>Day ' + l.n + ': ' + esc(l.title) + '</b><small>' + esc(l.blurb || '') + '</small></div>'
        + '<div class="ls-db"><button type="button" class="btn btn-secondary ls-play" data-ls-day="' + l.n + '" aria-label="Watch Day ' + l.n + ', ' + esc(l.title) + ', about ' + (l.mins || 2) + ' minutes">' + PLAY + '<span>' + (l.mins || 2) + ' min</span></button>'
        + '<button type="button" class="ls-ic" data-ls-share-day="' + l.n + '" aria-label="Share Day ' + l.n + '">' + SHARE + '</button></div></li>';
    }).join('') + '</ol>';
  }
  function playDay(n, from) {
    var S = window.GGSober30; if (!S || !S.open) return;
    try { if (from && from.focus) from.focus({ preventScroll: true }); } catch (e) {}
    S.open(n, { app: 'site', closeLabel: 'Back to Living Sober', backLabel: 'Back to Living Sober' }).catch(function () {});
  }

  /* ---------- sharing ---------- */
  function card(o) { if (window.GGShareCard) GGShareCard.share(o); }
  function shareVideo(meta) { card({ kind: 'video', head: meta.title, text: meta.blurb, url: PAGE + '#watch=' + meta.id }); }
  function shareDay(n) { var l = window.GGSober30 && GGSober30.lesson(n); if (l) card({ kind: 'video', head: 'Early Days, Day ' + n + ': ' + l.title, text: l.blurb, url: PAGE + '#day=' + n }); }
  function sharePage(btn) {
    var msg = btn && btn.parentNode && btn.parentNode.querySelector('.ls-smsg'), say = function (h) { if (msg) msg.innerHTML = h; };
    if (navigator.share) { navigator.share({ title: 'Living Sober | Grow With Grounded', text: 'A clear mind, a healthy body, and a life you’re fully present for.', url: PAGE }).then(function () { say('Shared. Thank you for passing it on.'); }, function () {}); return; }
    var shown = function () { say('Copy this link to share it: <span class="ls-link">' + esc(PAGE) + '</span>'); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(PAGE).then(function () { say('Link copied. Paste it anywhere to share Living Sober.'); }, shown); else shown();
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-ls-watch],[data-ls-day],[data-ls-share],[data-ls-share-day],[data-ls-share-watch]'); if (!t) return;
    if (t.hasAttribute('data-ls-watch')) watch(t.getAttribute('data-ls-watch'), t);
    else if (t.hasAttribute('data-ls-day')) playDay(parseInt(t.getAttribute('data-ls-day'), 10), t);
    else if (t.hasAttribute('data-ls-share-day')) shareDay(parseInt(t.getAttribute('data-ls-share-day'), 10));
    else if (t.hasAttribute('data-ls-share-watch')) { var m = START.filter(function (x) { return x.id === t.getAttribute('data-ls-share-watch'); })[0]; if (m) shareVideo(m); }
    else {
      var k = t.getAttribute('data-ls-share');
      if (k === 'daily' && TODAY.daily) card({ kind: 'daily', text: TODAY.daily.text });
      else if (k === 'mantra' && TODAY.mantra) card({ kind: 'mantra', text: TODAY.mantra.text });
      else if (k === 'weekly' && TODAY.weekly) card({ kind: 'weekly', head: TODAY.weekly.title, text: TODAY.weekly.text });
      else if (k === 'love') { var lv = pick('love', dayOfYear() - 1); card({ kind: 'love', text: lv ? lv.text : 'Your peace matters too. Tend your own tree, one day at a time.' }); }
      else if (k === 'rule') card({ kind: 'monthly', head: '80, 10, 10', text: '80% of your attention on today. 10% on the past, honoring how far you have come. 10% on the future.' });
      else if (k === 'page') sharePage(t);
    }
  });

  // #watch=<id> and #day=<n> open that video (it waits on its Play button); the hash comes off the address first.
  function fromLink() {
    var h = location.hash || '', w = /^#watch=([a-z0-9-]+)$/.exec(h), d = /^#day-?=?(\d{1,2})$/.exec(h);
    if (!w && !d) return;
    if (d && !(window.GGSober30 && GGSober30.open)) return; // the thirty days are still loading; this runs again when they arrive
    try { history.replaceState(history.state, '', location.pathname + location.search); } catch (e) {}
    if (w) { var s = $('#start'); if (s) s.scrollIntoView({ block: 'start' }); watch(w[1]); }
    else { var n = parseInt(d[1], 10), row = $('#day-' + n); if (row) row.scrollIntoView({ block: 'center' }); playDay(n); }
  }
  window.addEventListener('hashchange', fromLink);

  function boot() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-ls-watch],[data-ls-share-watch]'), function (b) { b.hidden = false; });
    words(); days(); fromLink();
  }
  window.GGLivingSober = { watch: watch, playDay: playDay, start: START, words: words, days: days, close: close };
  // The words and the thirty days are separate files; draw what is here now, and again as each arrives.
  function whenLoaded(test, fn) { if (test()) return fn(); var n = 0, iv = setInterval(function () { if (test() || ++n > 40) { clearInterval(iv); if (test()) fn(); } }, 150); }
  function start() { boot(); whenLoaded(function () { return !!window.GGSoberWords; }, words); whenLoaded(function () { return !!(window.GGSober30 && GGSober30.lessons); }, function () { days(); fromLink(); }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
