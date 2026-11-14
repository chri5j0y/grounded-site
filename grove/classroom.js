/* =====================================================================
   THE GROVE FOR CLASSROOMS (grove/classroom.js)   GWG BLD 982 Round 1
   Plays the Class Resets, the For Teachers video, and the Pilot Kickoff (grove/class-data.js, window.GG_CLASS) on a full
   screen of their own in the shared player (shared/gg-learn.js, GGLearn.player), in the recorded voice (public v1 clips).
   The Class Screen: any practice, big, one step at a time, with a timer, the painting behind it, and Full Screen for a
   projector or smartboard. Teacher's Day: four moments (Morning Circle, After Recess Reset, Before a Test, End of Day),
   each with a pick for today and two more. Painted cards: shared/heroes/grove/cards/<practice id>.webp.
   Used by The Grove (/grove/) and The Grove for Classrooms (/classrooms/). Nothing is saved or sent.
     GGClass.reset(id), GGClass.video('teachers' | 'kickoff'), GGClass.screen(practice or id)
     GGClass.dayHtml(), GGClass.resetsHtml(), GGClass.art(id), GGClass.has(id)
     Buttons anywhere on the page: data-gc-reset="id", data-gc-video="teachers", data-gc-screen="practice id".
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGClass) return;
  var D = window.GG_CLASS || { resets: [], day: [], cards: [], cheers: [], ending: {} };
  var V = 'c041';
  var esc = function (x) { return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var CARDS = {}; (D.cards || []).forEach(function (id) { CARDS[id] = 1; });
  var RS = {}; (D.resets || []).forEach(function (l) { RS[l.id.replace(/^cr-/, '')] = l; });
  var PCOL = { roots: '#8E5A2B', trunk: '#C27A1E', bark: '#6E5BB5', branches: '#1F8A8F', leaves: '#3A9B58', fruit: '#D9483F' };
  function art(id) { return CARDS[id] ? '/shared/heroes/grove/cards/' + id + '.webp?v=' + V : ''; }
  function need(src, ok) {
    if (ok()) return Promise.resolve();
    return new Promise(function (res) { var s = document.createElement('script'); s.src = src; s.onload = s.onerror = function () { res(); }; document.head.appendChild(s); });
  }
  function ready() {
    return need('/read.js?v=c030', function () { return !!window.GGRead; }).then(function () { return need('/shared/gg-learn.js?v=c112', function () { return !!window.GGLearn; }); });
  }

  /* ---------- practices for the Class Screen ----------
     The Grove app hands its own (with the grove's wording); any other page builds them from grove/together.js and
     grove/kinds.js in Plain wording, the way a public school class grove reads. */
  var PROVIDE = null, PLAIN = true, ALL = null;
  function allPractices() {
    if (ALL) return ALL;
    var T = window.GROVE_TOGETHER || { practices: [] }, K = window.GROVE_KINDS || {}, EX = K.existingKinds || {}, seen = {};
    ALL = {};
    T.practices.concat(K.practices || [], ((window.GROVE_GUIDES || {}).practices) || []).forEach(function (p) {
      if (!p || !p.id || seen[p.id]) return; seen[p.id] = 1;
      ALL[p.id] = Object.assign({}, p, { kinds: (EX[p.id] || p.kinds || ['family']) });
    });
    return ALL;
  }
  function practice(id) {
    var p = PROVIDE ? PROVIDE(id) : null;
    if (p) return p;
    var x = allPractices()[id]; if (!x) return null;
    var o = Object.assign({}, x); if (PLAIN && x.plain) Object.assign(o, x.plain);
    return o;
  }
  function sentences(t) { return (String(t || '').replace(/\s+/g, ' ').trim().match(/[^.!?]+[.!?]+["'”’)]*|[^.!?]+$/g) || []).map(function (s) { return s.trim(); }).filter(Boolean); }
  // The Class Screen lesson for one practice: its painting, its name and words, then each step big with a pause to do it.
  function screenLesson(p, plain) {
    var steps = String(p.steps || '').split('|').map(function (s) { return s.trim(); }).filter(Boolean);
    var img = CARDS[p.id] ? 'grove/cards/' + p.id : 'grove/kinds/classroom';
    var sc = [{ k: 'paint', img: img, eyebrow: 'Class Screen', h: p.name, sub: p.kid || '', beats: [p.name + '.'].concat(sentences(p.text)) }];
    steps.forEach(function (s, i) {
      var b = sentences(s), last = i === steps.length - 1;
      if (!b.length) return;
      b = b.map(function (t, j) { return j === b.length - 1 ? { t: t, w: last ? 20 : 10 } : t; });
      sc.push({ k: 'big', img: img, eyebrow: 'Step ' + (i + 1) + ' of ' + steps.length, h: s, beats: b });
    });
    return { id: 'cs-' + p.id + (plain === false ? '-f' : ''), title: p.name, mins: Math.max(1, Math.round(steps.length * 0.6)), voice: (D.voices || {}).kid || 'jenny', music: 'calm', blurb: p.text || '', sources: p.sources || [], scenes: sc };
  }

  /* ---------- the full screen ---------- */
  var OPEN = null;
  function css() {
    if (document.getElementById('gc-css')) return;
    var s = document.createElement('style'); s.id = 'gc-css';
    s.textContent = '.gc-pv .ggl-top{gap:8px}.gc-pv .ggl-top b{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'
      + '.gc-tools{display:flex;gap:6px;flex-wrap:wrap;align-items:center}.gc-tools button{font:inherit;font-size:14px;min-height:40px;padding:6px 12px;border-radius:999px;border:1px solid rgba(255,248,236,.5);background:transparent;color:#FFF8EC;cursor:pointer}'
      + '.gc-tools button[aria-pressed="true"]{background:#FFF8EC;color:#223829}.gc-timer{font:700 22px/1 "Barlow Condensed",sans-serif;letter-spacing:1px;color:#FFF8EC;min-width:64px;text-align:center}'
      + '.gc-timer.done{color:#F6D27A}.gc-pv .ggl-in{max-width:1280px}.gc-pv:fullscreen .ggl-in{max-width:none}'
      + '@media (max-width:640px){.gc-tools .gc-wide{display:none}.gc-tools button{padding:6px 10px}}';
    document.head.appendChild(s);
  }
  function close() {
    if (!OPEN) return;
    try { OPEN.ctl && OPEN.ctl.stop(); } catch (e) {}
    clearInterval(OPEN.tick);
    try { if (document.fullscreenElement) document.exitFullscreen(); } catch (e) {}
    OPEN.root.remove(); document.body.style.overflow = OPEN.overflow || '';
    document.removeEventListener('keydown', onKey, true);
    var f = OPEN.from; OPEN = null;
    if (f && f.focus) try { f.focus(); } catch (e) {}
  }
  function onKey(e) { if (OPEN && e.key === 'Escape' && !document.fullscreenElement) { e.preventDefault(); close(); } }
  function timer(sec) {
    if (!OPEN) return;
    clearInterval(OPEN.tick);
    var el = OPEN.root.querySelector('.gc-timer'), btns = OPEN.root.querySelectorAll('[data-gc-t]');
    Array.prototype.forEach.call(btns, function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-gc-t') === sec && sec > 0)); });
    if (!sec) { el.textContent = ''; el.classList.remove('done'); return; }
    var end = Date.now() + sec * 1000;
    function paint() {
      var left = Math.max(0, Math.round((end - Date.now()) / 1000));
      el.textContent = Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0');
      el.classList.toggle('done', !left);
      if (!left) clearInterval(OPEN.tick);
    }
    paint(); OPEN.tick = setInterval(paint, 500);
  }
  // play(lesson, o): o.title (top bar), o.back, o.ending ('kid', 'teach', or 'screen'), o.next (a lesson to offer next),
  // o.timer (show the timer buttons), o.from (the button to focus after).
  function play(l, o) {
    o = o || {};
    return ready().then(function () {
      if (!window.GGLearn) return;
      var keepFrom = OPEN ? OPEN.from : (o.from || document.activeElement);
      if (OPEN) { try { OPEN.ctl.stop(); } catch (e) {} clearInterval(OPEN.tick); OPEN.root.remove(); document.removeEventListener('keydown', onKey, true); }
      GGLearn.css(); css();
      var back = o.back || 'Back to Class', title = o.title || 'The Grove for Classrooms';
      var root = document.createElement('div');
      root.className = 'ggl ggl-app ggn-pv gc-pv'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'Video: ' + l.title);
      root.style.setProperty('--ggl-acc', '#2F5A3C'); root.style.setProperty('--ggl-bar', '#223829'); root.style.setProperty('--ggl-lite', '#9FCB9F');
      root.innerHTML = '<div class="ggl-top"><img src="/shared/marks/grove-tab.svg" alt=""><b>' + esc(title) + '</b><div class="gc-tools">'
        + (o.timer ? '<span class="gc-timer" aria-live="polite"></span><button type="button" data-gc-t="60" aria-pressed="false">1 min</button><button type="button" data-gc-t="120" aria-pressed="false">2 min</button><button type="button" class="gc-wide" data-gc-t="300" aria-pressed="false">5 min</button>' : '')
        + (document.fullscreenEnabled ? '<button type="button" class="gc-wide" data-gc-full="1">Full Screen</button>' : '')
        + '</div><button type="button" class="ggl-x" data-gc-x="1" aria-label="' + esc(back) + '"><span class="ggl-xf">' + esc(back) + '</span><span class="ggl-xs">Back</span></button></div>'
        + '<div class="ggl-in"><div class="ggl-eb">' + esc(o.eyebrow || 'Class Reset') + '</div><h1 tabindex="-1">' + esc(l.title) + '</h1><p class="ggl-muted">' + esc((l.mins ? 'About ' + l.mins + (l.mins === 1 ? ' minute. ' : ' minutes. ') : '') + (l.blurb || '')) + '</p><div class="gc-host"></div></div>';
      document.body.appendChild(root);
      OPEN = { root: root, from: keepFrom, overflow: OPEN ? OPEN.overflow : document.body.style.overflow, tick: 0 };
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey, true);
      root.addEventListener('click', function (e) {
        var t = e.target.closest('[data-gc-x],[data-gc-t],[data-gc-full]'); if (!t) return;
        if (t.hasAttribute('data-gc-x')) close();
        else if (t.hasAttribute('data-gc-t')) { var s = +t.getAttribute('data-gc-t'); timer(t.getAttribute('aria-pressed') === 'true' ? 0 : s); }
        else if (t.hasAttribute('data-gc-full')) { try { if (document.fullscreenElement) document.exitFullscreen(); else root.requestFullscreen(); } catch (x) {} }
      });
      var E = (D.ending || {})[o.ending || 'kid'] || {}, btns = [];
      if (o.next) btns.push(['next', 'Next: ' + o.next.title, 'pri']);
      btns.push(['again', 'Again', o.next ? '' : 'pri']);
      btns.push(['back', back, 'quiet']);
      var track = { id: 'grove-class', kind: 'support', title: title, lessons: [l] };
      OPEN.ctl = GGLearn.player(root.querySelector('.gc-host'), {
        app: 'site', lesson: l, track: track, tracks: [track], done: {}, at: 0, accent: '#2F5A3C', mood: 'calm', voice: l.voice || 'jenny',
        mark: { name: title },
        ending: { eyebrow: E.eyebrow || title, h: E.h || 'Nice work, everyone.', sub: E.sub || '', say: E.say || 'Nice work, everyone.', ok: true, buttons: btns },
        onDone: function () { try { window.dispatchEvent(new CustomEvent('gg-class-done', { detail: { id: l.id } })); } catch (e) {} },
        onEnd: function (b) {
          if (b === 'next' && o.next) play(o.next, Object.assign({}, o, { next: o.after ? o.after(o.next) : null }));
          else if (b === 'again') play(l, o);
          else close();
        },
        open: function () {}, home: close
      });
      var h1 = root.querySelector('h1'); if (h1) try { h1.focus(); } catch (e) {}
    });
  }
  function nextReset(l) { var L = D.resets || [], i = L.indexOf(l); return i >= 0 && L.length > 1 ? L[(i + 1) % L.length] : null; }
  function reset(id, from) {
    var l = RS[id]; if (!l) return Promise.resolve();
    return play(l, { from: from, ending: 'kid', eyebrow: 'Class Reset', next: nextReset(l), after: nextReset, timer: false });
  }
  function video(which, from) {
    var l = which === 'kickoff' ? D.kickoff : D.teachers; if (!l) return Promise.resolve();
    return play(l, { from: from, ending: 'teach', eyebrow: which === 'kickoff' ? '4-Week Classroom Pilot' : 'For Teachers', back: o_back(), title: 'The Grove for Classrooms' });
  }
  function o_back() { return /\/grove\//.test(location.pathname) ? 'Back to The Grove' : 'Back to the Page'; }
  function screen(p, from) {
    if (typeof p === 'string') p = practice(p);
    if (!p) return Promise.resolve();
    return play(screenLesson(p, PLAIN), { from: from, ending: 'screen', eyebrow: 'Class Screen', timer: true, title: 'Class Screen' });
  }

  /* ---------- Teacher's Day and the resets row ---------- */
  function dayIndex() { var d = new Date(); return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000); }
  function itemOf(key) {
    if (key.indexOf('p:') === 0) { var p = practice(key.slice(2)); return p ? { kind: 'p', id: p.id, title: p.name, blurb: p.kid || p.text, img: art(p.id), mins: 0 } : null; }
    var l = RS[key]; return l ? { kind: 'r', id: key, title: l.title, blurb: l.blurb, img: art(l.card), mins: l.mins } : null;
  }
  function btn(it, pri) {
    return it.kind === 'r' ? '<button type="button" class="btn ' + (pri ? 'btn-gold' : 'btn-line') + ' btn-sm" data-gc-reset="' + esc(it.id) + '">Play ' + esc(it.title) + '</button>'
      : '<button type="button" class="btn ' + (pri ? 'btn-gold' : 'btn-line') + ' btn-sm" data-gc-screen="' + esc(it.id) + '">Class Screen: ' + esc(it.title) + '</button>';
  }
  function dayHtml() {
    var n = dayIndex();
    return '<div class="card gc-day"><p class="gv-kicker">Teacher\'s Day</p><h3>Four moments, a pick for each</h3><p class="muted">Tap a pick and it plays full screen. No prep, a calm voice leads it.</p><div class="gc-day-grid">'
      + (D.day || []).map(function (m) {
        var L = m.items.map(itemOf).filter(Boolean); if (!L.length) return '';
        var i = n % L.length, pick = L[i], more = [L[(i + 1) % L.length], L[(i + 2) % L.length]].filter(function (x, j, a) { return x && x !== pick && a.indexOf(x) === j; });
        return '<div class="gc-moment"><div class="gc-mimg"' + (pick.img ? ' style="background-image:url(\'' + pick.img + '\')"' : '') + '></div><div class="gc-mtext"><b>' + esc(m.name) + '</b><span>' + esc(m.sub) + '</span>'
          + '<p class="gc-pick">Today: <b>' + esc(pick.title) + '</b>' + (pick.mins ? ', about ' + pick.mins + (pick.mins === 1 ? ' minute' : ' minutes') : '') + '</p>' + btn(pick, true)
          + (more.length ? '<p class="gc-more">Or: ' + more.map(function (x) { return '<button type="button" class="text-btn" ' + (x.kind === 'r' ? 'data-gc-reset' : 'data-gc-screen') + '="' + esc(x.id) + '">' + esc(x.title) + '</button>'; }).join(', ') + '</p>' : '')
          + '</div></div>';
      }).join('') + '</div></div>';
  }
  function resetsHtml(o) {
    o = o || {};
    return '<div class="gc-resets' + (o.cls ? ' ' + o.cls : '') + '">' + (D.resets || []).map(function (l) {
      var id = l.id.replace(/^cr-/, ''), img = art(l.card);
      return '<button type="button" class="gc-reset" data-gc-reset="' + esc(id) + '" style="--pc:' + (PCOL[l.part] || '#2F5A3C') + '"><span class="gc-rimg"' + (img ? ' style="background-image:url(\'' + img + '\')"' : '') + '></span><span class="gc-rtext"><b>' + esc(l.title) + '</b><small>About ' + l.mins + (l.mins === 1 ? ' minute' : ' minutes') + '</small><span>' + esc(l.blurb) + '</span></span></button>';
    }).join('') + '</div>';
  }
  function styles() {
    if (document.getElementById('gc-css2')) return;
    var s = document.createElement('style'); s.id = 'gc-css2';
    s.textContent = '.gc-resets{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin:10px 0 18px}'
      + '.gc-reset{display:flex;flex-direction:column;text-align:left;font:inherit;color:var(--ink,#2C1810);background:var(--card,#FFFDF9);border:1px solid var(--line,#E3D9C6);border-top:5px solid var(--pc);border-radius:14px;padding:0;overflow:hidden;cursor:pointer;min-width:0}'
      + '.gc-reset:focus-visible{outline:3px solid var(--gold,#2F5A3F);outline-offset:2px}.gc-rimg,.gc-mimg,.gc-cimg{display:block;aspect-ratio:16/9;background:var(--bg-deep,#F0E9DC) center/cover no-repeat}'
      + '.gc-rtext{display:flex;flex-direction:column;gap:3px;padding:10px 12px 12px}.gc-rtext b{font-size:calc(17px * var(--scale,1))}.gc-rtext small{font-family:"Barlow Condensed",sans-serif;letter-spacing:.5px;color:var(--accent,#6B5440)}.gc-rtext span{font-size:calc(14px * var(--scale,1));color:var(--ink-soft,#66564A);line-height:1.4}'
      + '.gc-day{border-left:6px solid var(--gold,#2F5A3F)}.gc-day-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-top:10px}'
      + '.gc-moment{background:var(--bg,#FAF7F2);border:1px solid var(--line,#E3D9C6);border-radius:14px;overflow:hidden;display:flex;flex-direction:column;min-width:0}.gc-mtext{padding:10px 12px 12px;display:flex;flex-direction:column;gap:4px;align-items:flex-start}'
      + '.gc-mtext>b{font-family:"Cormorant Garamond",serif;font-size:calc(22px * var(--scale,1));line-height:1.1}.gc-mtext>span{color:var(--ink-soft,#66564A);font-size:calc(14px * var(--scale,1))}.gc-pick{margin:6px 0 4px;font-size:calc(15px * var(--scale,1))}.gc-more{margin:6px 0 0;font-size:calc(14px * var(--scale,1));color:var(--ink-soft,#66564A)}'
      + '.gc-more .text-btn{font:inherit;background:none;border:0;color:var(--accent,#6B5440);text-decoration:underline;cursor:pointer;padding:0;min-height:32px}'
      + '.gc-cimg{border-radius:10px;margin:-2px 0 8px}.gc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}.gc-grid>.gv-prac{margin:0}';
    document.head.appendChild(s);
  }
  styles();

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-gc-reset],[data-gc-video],[data-gc-screen]'); if (!t) return;
    e.preventDefault();
    if (t.hasAttribute('data-gc-reset')) reset(t.getAttribute('data-gc-reset'), t);
    else if (t.hasAttribute('data-gc-video')) video(t.getAttribute('data-gc-video'), t);
    else screen(t.getAttribute('data-gc-screen'), t);
  });

  window.GGClass = {
    data: D, version: V, art: art, has: function (id) { return !!CARDS[id]; }, reset: reset, video: video, screen: screen, play: play, close: close,
    dayHtml: dayHtml, resetsHtml: resetsHtml, screenLesson: screenLesson, sentences: sentences, practice: practice, allPractices: allPractices,
    provide: function (fn) { PROVIDE = fn; }, plain: function (on) { PLAIN = on !== false; }, cheers: D.cheers || []
  };
})();
