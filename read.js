/* Grounded read-aloud engine, shared by Stories, Soul Tree, and The Grove.
   Picks the most natural voice on each device (quality first, with a gentle preference for a
   male or female voice), lets people choose a voice, and plays a recorded audio file when one exists. */
(function () {
  var synth = window.speechSynthesis;
  var NOVELTY = /albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|organ|superstar|trinoids|whisper|wobble|zarvox|junior|grandma|grandpa|kathy|shelley|sandy|flo\b|rocko|eddy|reed|ralph|fred/i;
  var GOOD = /\b(andrew|brian|guy|christopher|eric|roger|steffan|evan|nathan|tom|aaron|arthur|jamie|oliver|daniel|ryan|thomas|davis|tony|jason|jenny|aria|ava|emma|michelle|samantha|allison|susan|serena|karen|moira|tessa|zoe|nicky|sonia|libby)\b/i;
  var MALE = /\b(andrew|brian|guy|christopher|eric|roger|steffan|evan|nathan|tom|aaron|arthur|jamie|oliver|daniel|ryan|thomas|davis|tony|jason|george|william|james|matthew|male)\b/i;
  var FEMALE = /\b(jenny|aria|ava|emma|michelle|samantha|allison|susan|serena|karen|moira|tessa|zoe|nicky|sonia|libby|victoria|kate|fiona|joanna|salli|kimberly|ivy|natasha|martha|female)\b/i;
  var P = { pref: null, rate: 0.95, pitch: 1, key: 'gg_voice' };
  var chosen = null, list = [];
  function quality(v) {
    var q = 0;
    if (/natural|neural|online/i.test(v.name)) q += 60;
    if (/premium/i.test(v.name)) q += 55;
    if (/enhanced/i.test(v.name)) q += 45;
    if (/google/i.test(v.name)) q += 25;
    if (GOOD.test(v.name)) q += 12;
    if (/en[-_]us/i.test(v.lang)) q += 10; else if (/en[-_](gb|au|ie|ca|nz)/i.test(v.lang)) q += 6;
    if (v.localService === false) q += 4;
    return q;
  }
  function score(v) {
    var s = quality(v), m = MALE.test(v.name), f = FEMALE.test(v.name);
    if (P.pref === 'male') s += m ? 25 : (f ? -10 : 0);
    if (P.pref === 'female') s += f ? 25 : (m ? -10 : 0);
    return s;
  }
  function refresh() {
    if (!synth) return;
    list = synth.getVoices().filter(function (v) { return /^en/i.test(v.lang) && !NOVELTY.test(v.name); })
      .sort(function (a, b) { return score(b) - score(a); });
    var saved = null; try { saved = localStorage.getItem(P.key); } catch (e) {}
    chosen = (saved && list.find(function (v) { return v.name === saved; })) || list[0] || null;
    document.querySelectorAll('.gg-vm select').forEach(fillMenu);
  }
  function nice(n) { return n.replace(/^Microsoft /, '').replace(/ Online \(Natural\)/, ' (natural)').replace(/ - English \(([^)]+)\)/, ', $1').replace(/^Google /, 'Google ').replace(/\s+/g, ' ').trim(); }
  function fillMenu(sel) {
    var cur = chosen ? chosen.name : '';
    sel.innerHTML = list.slice(0, 7).map(function (v) { return '<option value="' + v.name.replace(/"/g, '&quot;') + '"' + (v.name === cur ? ' selected' : '') + '>' + nice(v.name) + '</option>'; }).join('') || '<option>Device voice</option>';
  }
  if (synth) { refresh(); try { synth.addEventListener('voiceschanged', refresh); } catch (e) { synth.onvoiceschanged = refresh; } }

  var css = '.gg-rbar{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:14px 0 18px;font-family:inherit;}' +
    '.gg-rbtn{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(139,94,26,.5);background:transparent;color:inherit;border-radius:999px;padding:8px 16px;font:inherit;font-size:15px;font-weight:600;cursor:pointer;line-height:1.2;}' +
    '.gg-rbtn:hover{background:rgba(201,138,62,.14);}' +
    '.gg-rbtn[aria-pressed="true"]{background:rgba(201,138,62,.2);border-color:rgba(201,138,62,.85);}' +
    '.gg-rbtn svg{width:18px;height:18px;flex:none;}' +
    '.gg-rstop{padding:8px 12px;}' +
    '.gg-vm{display:inline-flex;align-items:center;gap:6px;font-size:14px;opacity:.9;}' +
    '.gg-vm select{font:inherit;font-size:14px;color:inherit;background:transparent;border:1px solid rgba(139,94,26,.4);border-radius:10px;padding:6px 8px;max-width:210px;}' +
    '.gg-vm select option{color:#2C1810;background:#fff;}' +
    '.gg-reading{background:rgba(232,180,90,.2) !important;outline:2px solid rgba(232,180,90,.7);outline-offset:4px;border-radius:6px;transition:background .3s ease;}' +
    '@media print{.gg-rbar{display:none !important}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var I = {
    spk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5l12 7-12 7z"/></svg>',
    stop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'
  };
  var SEL = 'h1,h2,h3,h4,p,li,blockquote,figcaption,dt,dd,.card-sub,.step-domain,.domain-prompt';
  var SKIP = 'nav,footer,form,button,select,textarea,.no-print,[aria-hidden="true"],.gg-rbar,.gn-panel,script,style,.sr-only,.slider-hint,.restore-content';
  function blocksOf(root) {
    var out = [];
    root.querySelectorAll(SEL).forEach(function (el) {
      if (!el.offsetParent || el.closest(SKIP) || el.querySelector(SEL)) return;
      var t = (el.innerText || '').replace(/\s+/g, ' ').trim();
      if (t.length < 2) return;
      if (t.length > 260) (t.match(/[^.!?]+[.!?]+["”’)]*\s*|[^.!?]+$/g) || [t]).forEach(function (x) { x = x.trim(); if (x) out.push({ el: el, t: x }); });
      else out.push({ el: el, t: t });
    });
    return out;
  }
  var q = [], i = 0, state = 'idle', cur = null, listeners = [], audio = null;
  function emit() { listeners.forEach(function (f) { try { f(state); } catch (e) {} }); }
  function mark(el) {
    if (cur) cur.classList.remove('gg-reading');
    cur = el; if (!el) return;
    el.classList.add('gg-reading');
    var r = el.getBoundingClientRect();
    if (r.top < 90 || r.bottom > innerHeight - 60) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function next() {
    if (state !== 'playing') return;
    if (i >= q.length) { stop(); return; }
    var item = q[i]; mark(item.el);
    var u = new SpeechSynthesisUtterance(item.t);
    if (!chosen) refresh();
    try { if (chosen) { u.voice = chosen; u.lang = chosen.lang; } } catch (e) { chosen = null; }
    u.rate = P.rate; u.pitch = P.pitch;
    u.onend = function () { if (state === 'playing') { i++; next(); } };
    u.onerror = function () { if (state === 'playing') { i++; next(); } };
    synth.speak(u);
  }
  function read(root) { if (!synth) return; stop(); q = blocksOf(root); i = 0; if (!q.length) return; state = 'playing'; emit(); next(); }
  function pause() { if (state !== 'playing') return; state = 'paused'; if (audio) audio.pause(); else synth.cancel(); emit(); }
  function resume() { if (state !== 'paused') return; state = 'playing'; emit(); if (audio) audio.play(); else next(); }
  function stop() { state = 'idle'; if (synth) synth.cancel(); if (audio) { audio.pause(); audio.currentTime = 0; } mark(null); emit(); }
  function voiceMenu() {
    var lab = document.createElement('label'); lab.className = 'gg-vm';
    lab.innerHTML = '<span>Voice</span><select aria-label="Choose a reading voice"></select>';
    var sel = lab.querySelector('select'); fillMenu(sel);
    sel.addEventListener('change', function () { var v = list.find(function (x) { return x.name === sel.value; }); if (v) { chosen = v; try { localStorage.setItem(P.key, v.name); } catch (e) {} if (state === 'playing') { synth.cancel(); next(); } } });
    return lab;
  }
  /* A play, pause, and stop control that reads a region. audioSrc plays a recording instead when it exists. */
  function control(opts) {
    var bar = document.createElement('div'); bar.className = 'gg-rbar no-print';
    var b = document.createElement('button'); b.type = 'button'; b.className = 'gg-rbtn';
    var s = document.createElement('button'); s.type = 'button'; s.className = 'gg-rbtn gg-rstop'; s.innerHTML = I.stop; s.setAttribute('aria-label', 'Stop reading'); s.hidden = true;
    var menu = voiceMenu();
    var mine = false, recorded = false;
    function paint() {
      var active = mine && state !== 'idle';
      if (!active) { b.innerHTML = I.spk + '<span>' + (recorded ? (opts.recordedLabel || 'Listen') : (opts.label || 'Read aloud')) + '</span>'; b.setAttribute('aria-pressed', 'false'); s.hidden = true; }
      else if (state === 'playing') { b.innerHTML = I.pause + '<span>Pause</span>'; b.setAttribute('aria-pressed', 'true'); s.hidden = false; }
      else { b.innerHTML = I.play + '<span>Resume</span>'; b.setAttribute('aria-pressed', 'true'); s.hidden = false; }
      menu.hidden = recorded;
    }
    listeners.push(function () { if (state === 'idle') mine = false; paint(); });
    b.addEventListener('click', function () {
      if (mine && state === 'playing') return pause();
      if (mine && state === 'paused') return resume();
      mine = true;
      if (recorded) { stop(); mine = true; audio.play(); state = 'playing'; emit(); }
      else read(typeof opts.root === 'function' ? opts.root() : opts.root);
    });
    s.addEventListener('click', stop);
    bar.appendChild(b); bar.appendChild(s); if (synth) bar.appendChild(menu);
    if (opts.audioSrc && window.fetch) {
      fetch(opts.audioSrc, { method: 'HEAD' }).then(function (r) {
        if (!r.ok) return;
        recorded = true; audio = new Audio(opts.audioSrc); audio.preload = 'none';
        audio.addEventListener('ended', stop); paint();
      }).catch(function () {});
    }
    if (!synth && !opts.audioSrc) bar.hidden = true;
    paint();
    return bar;
  }
  /* A Sprout-style "Read aloud: on / off" switch. When on, onRead is called whenever the page changes. */
  function toggle(opts) {
    var key = opts.key || 'gg_read_on';
    var on = false; try { on = localStorage.getItem(key) === '1'; } catch (e) {}
    var bar = document.createElement('div'); bar.className = 'gg-rbar no-print';
    var b = document.createElement('button'); b.type = 'button'; b.className = 'gg-rbtn gg-rtoggle';
    function paint() { b.innerHTML = I.spk + '<span>Read aloud: ' + (on ? 'on' : 'off') + '</span>'; b.setAttribute('aria-pressed', on ? 'true' : 'false'); }
    b.addEventListener('click', function () {
      on = !on; try { localStorage.setItem(key, on ? '1' : '0'); } catch (e) {}
      document.querySelectorAll('.gg-rtoggle').forEach(function (x) { if (x !== b) x.dispatchEvent(new CustomEvent('gg-sync')); });
      paint(); if (on) opts.onRead(); else stop();
    });
    b.addEventListener('gg-sync', function () { try { on = localStorage.getItem(key) === '1'; } catch (e) {} paint(); });
    paint(); bar.appendChild(b); if (synth) bar.appendChild(voiceMenu());
    if (!synth) bar.hidden = true;
    return bar;
  }
  function isOn(key) { try { return localStorage.getItem(key || 'gg_read_on') === '1'; } catch (e) { return false; } }
  window.GGRead = { setProfile: function (o) { for (var k in o) P[k] = o[k]; refresh(); }, read: read, stop: stop, pause: pause, resume: resume, control: control, toggle: toggle, isOn: isOn, available: !!synth, get state() { return state; } };
  window.addEventListener('pagehide', function () { if (synth) synth.cancel(); });
  window.dispatchEvent(new Event('ggread-ready'));

  /* Stories: a Read aloud control under the byline of every story page. */
  function storyMount() {
    var art = document.querySelector('article.story-page');
    if (!art || art.querySelector('.gg-rbar')) return;
    window.GGRead.setProfile({ pref: 'male', rate: 0.95, key: 'gg_voice_stories' });
    var slug = (location.pathname.split('/').pop() || '').replace(/\.html$/, '');
    var ctl = control({ root: art, label: 'Read this story aloud', recordedLabel: 'Listen to this story', audioSrc: slug ? 'audio/' + slug + '.mp3' : null });
    var by = art.querySelector('.byline') || art.querySelector('h1');
    by.parentNode.insertBefore(ctl, by.nextSibling);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', storyMount); else storyMount();
})();
