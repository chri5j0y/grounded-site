/* =====================================================================
   LIVING SOBER, THE PAGE (shared/living-sober.js)   GWG BLD 837, October 2026
   The live parts of living-sober.html:
     Today's Encouragement and a Mantra   from shared/sober-words.js (window.GGSoberWords), picked by the day of the year;
                                           a quiet empty state until the words load
     Start Here                           three Growing a Healthy Tree videos from Oak (shared/learn-lessons.js, loaded on tap),
                                           played in shared/gg-learn.js with Brian's recorded clips
     Early Days: 90 Days                  the day list from shared/sober-30.js (window.GGSober30), each day in the player overlay
     Living Sober Together (BLD 851)      Sleep, Food, and Movement (#early-body, inside #every-day), Healthy People, Healthy Places and
                                           Strong on Your Own (#together), Loving Someone Who Drinks or Uses (#craft, in #love), from
                                           shared/sober-more.js; each opens in the trees with ?sober=basics, people, solo, mine, or craft
     Share                                every Share button opens a branded picture (shared/gg-sharecard.js); Share This Page
                                           sends the page address (the phone's share sheet, or Copy)
   BLD 856, the page redesigned: a sticky chip menu (the chip for the section in view lights up), the ninety days as one
     path in three chapters (Days 1 to 30 Today Is Enough, 31 to 60 Growing Strong, 61 to 90 A Life You Love), each a
     <details> of day tiles (#chapter-1 to 3, every tile keeps id day-<n>), Ride the Wave beside them (#wave), cards that
     rise in on scroll (only when motion is welcome).
   Links that open a video: #watch=<lesson id> (Start Here) and #day=<n> (Early Days). The video waits on its Play button.
   Nothing personal is kept here. The viewer's choices stay in the apps' locked vault.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGLivingSober) return;
  var PAGE = 'https://growwithgrounded.com/living-sober';
  var READ = '/read.js?v=b813', LEARN = '/shared/gg-learn.js?v=b851', LESSONS = '/shared/learn-lessons.js?v=b852';
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

  /* ---------- Today's Encouragement and a Mantra ---------- */
  function dayOfYear(d) { d = d || new Date(); var s = new Date(d.getFullYear(), 0, 0); return Math.floor((d - s) / 86400000); }
  function pick(list, n) {
    var W = window.GGSoberWords; if (!W) return null;
    if (typeof W.pick === 'function') return W.pick(list, n);
    var L = W[list]; if (!L || !L.length) return null; return L[((n % L.length) + L.length) % L.length];
  }
  var TODAY = { daily: null, mantra: null };
  function words() {
    // The page has no stage: daily words come only from items for everyone (no stage tags) or for Thinking About a Change.
    var W0 = window.GGSoberWords, open = W0 && W0.daily ? W0.daily.filter(function (x) { return !Array.isArray(x.stage) || !x.stage.length || x.stage.indexOf('change') >= 0; }) : [];
    var n = dayOfYear(), d = open.length ? open[(((n - 1) % open.length) + open.length) % open.length] : pick('daily', n - 1), m = pick('mantras', n - 1);
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
        else btns.push(['days', 'Early Days: 90 Days', 'pri']);
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

  /* ---------- Early Days: 90 Days, one path in three chapters (BLD 856) ---------- */
  var ICON = function (id, cls) { return '<svg class="' + (cls || 'i') + '" aria-hidden="true"><use href="#lsi-' + id + '"/></svg>'; };
  var CH = [
    { n: 1, from: 1, to: 30, acc: 'a-honey', icon: 'sunrise', title: 'Today Is Enough', line: 'The basics that steady a body and mind: water, food, sleep, your people, and riding out the first hard moments.' },
    { n: 2, from: 31, to: 60, acc: 'a-green', icon: 'sprout', title: 'Growing Strong', line: 'A daily rhythm you enjoy: mornings, evenings, good company, saying no with ease, and your first sober celebration.' },
    { n: 3, from: 61, to: 90, acc: 'a-blue', icon: 'tree', title: 'A Life You Love', line: 'Clear mornings, deeper rest, purpose, closeness, and a life that keeps getting fuller.' }
  ];
  var BIG = { 1: 1, 7: 1, 14: 1, 30: 1, 60: 1, 90: 1 };
  function chapterOf(n) { for (var i = 0; i < CH.length; i++) if (n >= CH[i].from && n <= CH[i].to) return CH[i]; return CH[0]; }
  function openChapter(n) { var d = document.getElementById('chapter-' + n); if (d && !d.open) d.open = true; return d; }
  function days() {
    var host = $('#ls-days'); if (!host) return;
    var S = window.GGSober30;
    if (!S || !S.lessons || !S.lessons.length) { host.innerHTML = '<p class="ls-empty">The ninety days are on their way. Start Here holds three videos to begin with today.</p>'; return; }
    var was = {}; Array.prototype.forEach.call(host.querySelectorAll('details.ls-ch'), function (d) { was[d.id] = d.open; });
    host.innerHTML = CH.map(function (c) {
      var list = S.lessons.filter(function (l) { return l.n >= c.from && l.n <= c.to; });
      if (!list.length) return '';
      var open = was.hasOwnProperty('chapter-' + c.n) ? was['chapter-' + c.n] : c.n === 1;
      return '<details class="ls-ch ' + c.acc + '" id="chapter-' + c.n + '"' + (open ? ' open' : '') + '><summary>'
        + '<span class="ls-chart">' + ICON(c.icon, '') + '</span><span class="ls-cht"><small>Chapter ' + c.n + ', Days ' + c.from + ' to ' + c.to + '</small><b>' + esc(c.title) + '</b><span>' + esc(c.line) + ' ' + list.length + ' videos.</span></span>'
        + '<span class="ls-chev">' + ICON('chev') + '</span></summary><ol class="ls-tiles">' + list.map(function (l) {
          var m = l.mins || 2;
          return '<li class="ls-tile' + (BIG[l.n] ? ' big' : '') + '" id="day-' + l.n + '"><button type="button" class="ls-tbtn" data-ls-day="' + l.n + '" title="' + esc(l.blurb || '') + '" aria-label="Watch Day ' + l.n + ', ' + esc(l.title) + ', about ' + m + (m === 1 ? ' minute' : ' minutes') + '">'
            + '<span class="ls-tn">' + l.n + '</span><span class="ls-tt">' + esc(l.title) + '</span><span class="ls-tm">' + ICON('play') + m + ' min</span></button>'
            + '<button type="button" class="ls-tsh" data-ls-share-day="' + l.n + '" aria-label="Share Day ' + l.n + '"><svg aria-hidden="true" width="15" height="15"><use href="#lsi-share"/></svg></button></li>';
        }).join('') + '</ol></details>';
    }).join('');
  }
  function playDay(n, from) {
    var S = window.GGSober30; if (!S || !S.open) return;
    try { if (from && from.focus) from.focus({ preventScroll: true }); } catch (e) {}
    S.open(n, { app: 'site', closeLabel: 'Back to Living Sober', backLabel: 'Back to Living Sober' }).catch(function () {});
  }

  /* ---------- Living Sober Every Day (BLD 850): Ride the Wave, Good Times, Sober, and What Your Body Regains ---------- */
  function more() {
    var M = window.GGSoberMore; if (!M) return;
    var g = $('#ls-good'), b = $('#ls-body'), G = M.goodtimes || {}, B = M.body || {};
    var ul = function (t, a) { return a && a.length ? '<h4>' + esc(t) + '</h4><ul>' + a.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : ''; };
    if (g) g.innerHTML = (G.intro ? '<p>' + esc(G.intro) + '</p>' : '') + '<div class="ls-gtw">' + (G.plans || []).map(function (p) {
      return '<details class="ls-gt" id="gt-' + esc(p.id) + '"><summary><b>' + esc(p.title) + '</b><small>' + esc(p.line || '') + '</small></summary><div class="ls-gtb">' +
        ul('Before You Go', p.before) + ul('When Someone Offers a Drink', p.say) + ul('Great Instead', p.instead) + ul('An Easy Exit', p.exit) + (p.toast ? '<h4>A Sober Toast</h4><p>' + esc(p.toast) + '</p>' : '') + '</div></details>';
    }).join('') + '</div>';
    if (b) b.innerHTML = (B.intro ? '<p>' + esc(B.intro) + '</p>' : '') + '<ol class="ls-tl">' + (B.milestones || []).map(function (x) { return '<li><span class="ls-med" aria-hidden="true">' + esc(x.title) + '</span><div><b>' + esc(x.title) + '</b><p>' + esc(x.text) + '</p></div></li>'; }).join('') + '</ol>' +
      (B.note ? '<p class="ls-note">' + esc(B.note) + '</p>' : '') + (B.credits && B.credits.length ? '<p class="ls-src">Sources: ' + B.credits.map(function (c) { return c[1] ? '<a href="' + esc(c[1]) + '" target="_blank" rel="noopener">' + esc(c[0]) + '</a>' : esc(c[0]); }).join('; ') + '</p>' : '');
  }
  /* ---------- Living Sober Together (BLD 851): a taste of each piece, with Open in Oak for the full tool ---------- */
  function srcs(list) { return list && list.length ? '<p class="ls-src">Sources: ' + list.map(function (c) { return c[1] ? '<a href="' + esc(c[1]) + '" target="_blank" rel="noopener">' + esc(c[0]) + '</a>' : esc(c[0]); }).join('; ') + '</p>' : ''; }
  function together() {
    var M = window.GGSoberMore; if (!M) return;
    var ul = function (a) { return a && a.length ? '<ul>' + a.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : ''; };
    var P = M.people, S = M.solo, C = M.craft, B = M.basics, h;
    if (P && (h = $('#ls-people'))) h.innerHTML = (P.how ? '<p>' + esc(P.how) + '</p>' : '') + '<div class="ls-gtw">' + (P.places || []).map(function (x) {
      return '<details class="ls-gt" id="pl-' + esc(x.id) + '"><summary><b>' + esc(x.title) + '</b><small>' + esc(x.line || '') + '</small></summary><div class="ls-gtb">' +
        '<h4>Why It Helps</h4><p>' + esc(x.why || '') + '</p><h4>How to Find One Near You</h4>' +
        (x.link ? '<p><a class="text-link" href="' + esc(x.link) + '">' + esc((x.find || [])[0] || x.link) + '</a></p>' : '<ul class="ls-words" aria-label="Search words to try">' + (x.find || []).map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') + '</ul>') +
        '<h4>A First Step</h4><p>' + esc(x.first || '') + '</p><h4>What to Say the First Time</h4><p class="ls-try">' + esc(x.say || '') + '</p></div></details>';
    }).join('') + '</div>' + (P.meeting ? '<p class="ls-note">' + (P.meetingUrl ? '<a class="text-link" href="' + esc(P.meetingUrl) + '" target="_blank" rel="noopener">' + esc(P.meeting) + '</a>' : esc(P.meeting)) + '</p>' : '') + srcs(P.credits);
    if (S && (h = $('#ls-solo'))) h.innerHTML = '<p>' + esc(S.intro || '') + '</p><div class="ls-gtw">' + (S.parts || []).map(function (x) {
      return '<details class="ls-gt" id="so-' + esc(x.id) + '"><summary><b>' + esc(x.title) + '</b>' + (x.lead ? '<small>' + esc(x.lead) + '</small>' : '') + '</summary><div class="ls-gtb">' + ul(x.items) + '</div></details>';
    }).join('') + '</div>' + (S.few ? '<p class="ls-note"><b>' + esc(S.few.title) + '.</b> ' + esc(S.few.text) + '</p>' : '');
    if (C && (h = $('#ls-craft'))) h.innerHTML = '<p>' + esc(C.intro || '') + '</p><div class="ls-gtw">' + (C.parts || []).map(function (x) {
      return '<details class="ls-gt" id="cr-' + esc(x.id) + '"><summary><b>' + esc(x.title) + '</b><small>' + esc(x.lead || '') + '</small></summary><div class="ls-gtb">' + ul(x.items) + (x.try ? '<h4>Try Saying</h4><p class="ls-try">' + esc(x.try) + '</p>' : '') + '</div></details>';
    }).join('') + '</div>' + srcs(C.credits);
    if (B && (h = $('#ls-basics'))) h.innerHTML = '<p>' + esc(B.intro || '') + '</p><div class="ls-basics">' + (B.parts || []).map(function (x, i) { var k = ['moon', 'bowl', 'walk'][i % 3], a = ['a-blue', 'a-honey', 'a-green'][i % 3]; return '<div class="' + a + '"><h4>' + ICON(k) + esc(x.title) + '</h4>' + ul(x.items) + '</div>'; }).join('') + '</div>' +
      (B.note ? '<p class="ls-note">' + esc(B.note) + '</p>' : '') + (B.health ? '<p class="ls-note"><a class="text-link" href="/field-guide/">' + esc(B.health) + '</a></p>' : '') + srcs(B.credits);
  }
  function wave(from) {
    var S = window.GGSober30; if (!S || !S.open || !S.wave) return;
    try { if (from && from.focus) from.focus({ preventScroll: true }); } catch (e) {}
    S.open('wave', { app: 'site', closeLabel: 'Back to Living Sober', backLabel: 'Back to Living Sober' }).catch(function () {});
  }
  document.addEventListener('click', function (e) { var t = e.target.closest && e.target.closest('[data-ls-wave]'); if (t) wave(t); });

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
    else { var n = parseInt(d[1], 10); openChapter(chapterOf(n).n); var row = $('#day-' + n); if (row) row.scrollIntoView({ block: 'center' }); playDay(n); }
  }
  window.addEventListener('hashchange', fromLink);

  /* ---------- BLD 856: the chip menu, the chapter path, and gentle motion ---------- */
  var CALM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function chips() {
    var nav = $('.ls-chips'); if (!nav) return;
    var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    var secs = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); }).filter(Boolean);
    function light(id) {
      links.forEach(function (a) {
        var on = a.getAttribute('href') === '#' + id;
        if (on) { a.setAttribute('aria-current', 'true'); var ul = a.closest('ul'); if (ul && ul.scrollWidth > ul.clientWidth) { var x = a.offsetLeft - (ul.clientWidth - a.offsetWidth) / 2; try { ul.scrollTo({ left: Math.max(0, x), behavior: CALM ? 'auto' : 'smooth' }); } catch (e) { ul.scrollLeft = x; } } }
        else a.removeAttribute('aria-current');
      });
    }
    // The lit chip is the last section whose top has reached the space under the chips.
    var cur = null, ticking = false;
    function pickNow() {
      ticking = false; var hit = null, line = nav.getBoundingClientRect().bottom + 24;
      secs.forEach(function (s) { var r = s.getBoundingClientRect(); if (r.top <= line && r.bottom > line) hit = s.id; });
      if (hit !== cur) { cur = hit; if (hit) light(hit); else links.forEach(function (a) { a.removeAttribute('aria-current'); }); }
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(pickNow); } }, { passive: true });
    window.addEventListener('resize', pickNow);
    pickNow();
  }
  function rise() {
    if (CALM || !('IntersectionObserver' in window)) return;
    var els = document.querySelectorAll('.ls .ls-rise'); if (!els.length) return;
    document.documentElement.classList.add('ls-anim');
    var io = new IntersectionObserver(function (ents) { ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }
  // The chapter dots on the path open their chapter before the page moves to it.
  document.addEventListener('click', function (e) { var a = e.target.closest && e.target.closest('[data-ls-ch]'); if (a) openChapter(a.getAttribute('data-ls-ch')); });
  // A link straight to #chapter-2 or #day-45 (scrolling only) opens that chapter too.
  function openFromHash() { var m = /^#chapter-(\d)$/.exec(location.hash) || null; if (m) { var d = openChapter(m[1]); if (d) d.scrollIntoView({ block: 'start' }); } }
  window.addEventListener('hashchange', openFromHash);

  function boot() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-ls-watch],[data-ls-share-watch]'), function (b) { b.hidden = false; });
    words(); days(); more(); together(); fromLink();
    chips(); rise();
  }
  window.GGLivingSober = { watch: watch, playDay: playDay, start: START, words: words, days: days, close: close };
  // The words and the thirty days are separate files; draw what is here now, and again as each arrives.
  function whenLoaded(test, fn) { if (test()) return fn(); var n = 0, iv = setInterval(function () { if (test() || ++n > 40) { clearInterval(iv); if (test()) fn(); } }, 150); }
  function start() { boot(); whenLoaded(function () { return !!window.GGSoberWords; }, words); whenLoaded(function () { return !!window.GGSoberMore; }, function () { more(); together(); }); whenLoaded(function () { return !!(window.GGSober30 && GGSober30.lessons); }, function () { Array.prototype.forEach.call(document.querySelectorAll('[data-ls-wave]'), function (b) { b.hidden = !GGSober30.wave; }); days(); fromLink(); openFromHash(); }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
