/* Grounded read-aloud engine, shared by Stories, Maple, Aspen, Oak, The Grove, and the Field Guide.
   Picks the most natural voice on each device (quality first, with a gentle preference for a
   male or female voice), lets people choose a voice and a speed, shows how to get a better voice,
   and plays a recorded audio file when one exists.
   Privacy: voices that run on the device come first. A voice that needs the internet sends the words
   it reads to that company, so it is never picked automatically; it shows as "uses internet" in the
   menu, and only a person can choose it. Nothing else leaves the device. */
(function () {
  var synth = window.speechSynthesis;
  var NOVELTY = /albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|organ|superstar|trinoids|whisper|wobble|zarvox|junior|grandma|grandpa|kathy|shelley|sandy|flo\b|rocko|eddy|reed|ralph|fred/i;
  var GOOD = /\b(andrew|brian|guy|christopher|eric|roger|steffan|evan|nathan|tom|aaron|arthur|jamie|oliver|daniel|ryan|thomas|davis|tony|jason|jenny|aria|ava|emma|michelle|samantha|allison|susan|serena|karen|moira|tessa|zoe|nicky|sonia|libby)\b/i;
  var MALE = /\b(andrew|brian|guy|christopher|eric|roger|steffan|evan|nathan|tom|aaron|arthur|jamie|oliver|daniel|ryan|thomas|davis|tony|jason|george|william|james|matthew|male)\b/i;
  var FEMALE = /\b(jenny|aria|ava|emma|michelle|samantha|allison|susan|serena|karen|moira|tessa|zoe|nicky|sonia|libby|victoria|kate|fiona|joanna|salli|kimberly|ivy|natasha|martha|female)\b/i;
  var P = { pref: null, rate: 0.95, pitch: 1, key: 'gg_voice' };
  var SPEEDS = [['0.8', 'Slower'], ['1', 'Normal'], ['1.2', 'Faster']], SPEED_KEY = 'gg_voice_speed';
  function speed() { var v = 1; try { v = parseFloat(localStorage.getItem(SPEED_KEY)) || 1; } catch (e) {} return Math.min(1.5, Math.max(0.6, v)); }
  var chosen = null, list = [];
  function quality(v) {
    var q = 0;
    if (/natural|neural|online/i.test(v.name)) q += 60;
    if (/premium/i.test(v.name)) q += 55;
    if (/enhanced/i.test(v.name)) q += 45;
    if (/google/i.test(v.name)) q += 25;
    if (GOOD.test(v.name)) q += 12;
    if (/en[-_]us/i.test(v.lang)) q += 10; else if (/en[-_](gb|au|ie|ca|nz)/i.test(v.lang)) q += 6;
    if (v.localService === false) q -= 200;   // online voices: never chosen automatically
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
    document.querySelectorAll('select.gg-vsel').forEach(fillMenu);
  }
  function online(v) { return v && v.localService === false; }
  function nice(n) { return n.replace(/^Microsoft /, '').replace(/ Online \(Natural\)/, ' (natural)').replace(/ - English \(([^)]+)\)/, ', $1').replace(/^Google /, 'Google ').replace(/\s+/g, ' ').trim(); }
  function fillMenu(sel) {
    var cur = chosen ? chosen.name : '';
    sel.innerHTML = list.filter(function (v, k) { return k < 7 || v.name === cur; }).slice(0, 8).map(function (v) { return '<option value="' + v.name.replace(/"/g, '&quot;') + '"' + (v.name === cur ? ' selected' : '') + '>' + nice(v.name) + (online(v) ? ' (uses internet)' : '') + '</option>'; }).join('') || '<option>Device voice</option>';
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
    '.gg-vhelp-btn{font:inherit;font-size:14px;color:inherit;background:transparent;border:0;text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:6px 2px;min-height:32px;}' +
    '.gg-vhelp{flex-basis:100%;font-size:15px;line-height:1.5;border:1px solid rgba(139,94,26,.35);border-radius:12px;padding:12px 16px;margin-top:2px;}' +
    '.gg-vhelp h4{margin:0 0 6px;font-size:16px;}.gg-vhelp p{margin:6px 0;}.gg-vhelp ol{margin:4px 0 10px 20px;padding:0;}.gg-vhelp li{margin:3px 0;}' +
    '.gg-vhelp b{font-weight:700;}' +
    '@media print{.gg-rbar{display:none !important}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var I = {
    spk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5l12 7-12 7z"/></svg>',
    stop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'
  };
  var SEL = 'h1,h2,h3,h4,p,li,blockquote,figcaption,dt,dd,.card-sub,.step-domain,.domain-prompt,.restore-item';
  var SKIP = 'nav,footer,form,button,select,textarea,.no-print,[aria-hidden="true"],.gg-rbar,.gn-panel,script,style,.sr-only,.slider-hint,.restore-content';
  function blocksOf(root) {
    var out = [];
    root.querySelectorAll(SEL).forEach(function (el) {
      var sk = el.closest(SKIP);
      if (!el.offsetParent || (sk && sk !== root && root.contains(sk)) || el.querySelector(SEL)) return;
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
    u.rate = P.rate * speed(); u.pitch = P.pitch;
    u.onend = function () { if (state === 'playing') { i++; next(); } };
    u.onerror = function () { if (state === 'playing') { i++; next(); } };
    synth.speak(u);
  }
  function read(root) { if (!synth) return; stop(); q = blocksOf(root); i = 0; if (!q.length) return; state = 'playing'; emit(); next(); }
  function pause() { if (state !== 'playing') return; state = 'paused'; if (audio) audio.pause(); else synth.cancel(); emit(); }
  function resume() { if (state !== 'paused') return; state = 'playing'; emit(); if (audio) audio.play(); else next(); }
  function stop() { state = 'idle'; if (synth) synth.cancel(); if (audio) { audio.pause(); audio.currentTime = 0; } mark(null); emit(); }
  /* Steps to get a better voice. Phone menus change, so each one also says what to search for. Checked Oct 2026. */
  var HELP = '<h4>Get a better voice</h4>' +
    '<p>Most phones and computers come with free, natural-sounding voices that aren\'t turned on yet. Download one once, and every Grounded tool can use it, even offline.</p>' +
    '<p><b>iPhone or iPad</b></p><ol><li>Open Settings, then Accessibility.</li><li>Tap Read &amp; Speak (on older versions, Spoken Content), then Voices, then English.</li><li>Pick a voice marked Enhanced or Premium, like Ava, Evan, Nathan, or Zoe, and tap download. Use Wi-Fi; they\'re large.</li></ol>' +
    '<p><b>Android</b></p><ol><li>Open Settings and search for Text-to-speech.</li><li>Choose Speech Services by Google as the engine, then tap its settings.</li><li>Tap Install voice data, then English, and download a voice you like.</li></ol>' +
    '<p><b>Mac</b></p><ol><li>Open System Settings, then Accessibility.</li><li>Open Read &amp; Speak (or Spoken Content), then System voice, then Manage Voices.</li><li>Download an English voice marked Enhanced, Premium, or Siri.</li></ol>' +
    '<p><b>Windows</b></p><ol><li>Open Settings, then Time &amp; language, then Speech.</li><li>Under Manage voices, tap Add voices and add an English voice.</li></ol>' +
    '<p>Then close this page all the way, open it again, and pick the new voice from the Voice menu. Voices marked "uses internet" read the words through that company\'s servers, so Grounded never picks them for you.</p>';
  function voiceMenu() {
    var g = document.createElement('span'); g.className = 'gg-vm gg-vset'; g.style.flexWrap = 'wrap';
    g.innerHTML = '<label class="gg-vm"><span>Voice</span><select class="gg-vsel" aria-label="Choose a reading voice"></select></label>' +
      '<label class="gg-vm"><span>Speed</span><select class="gg-vspeed" aria-label="Reading speed">' + SPEEDS.map(function (x) { return '<option value="' + x[0] + '"' + (Math.abs(parseFloat(x[0]) - speed()) < .01 ? ' selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select></label>' +
      '<button type="button" class="gg-vhelp-btn" aria-expanded="false">Get a better voice</button>';
    var sel = g.querySelector('.gg-vsel'), sp = g.querySelector('.gg-vspeed'), hb = g.querySelector('.gg-vhelp-btn');
    fillMenu(sel);
    sel.addEventListener('change', function () { var v = list.find(function (x) { return x.name === sel.value; }); if (v) { chosen = v; try { localStorage.setItem(P.key, v.name); } catch (e) {} document.querySelectorAll('.gg-vsel').forEach(function (o) { if (o !== sel) fillMenu(o); }); if (state === 'playing') { synth.cancel(); next(); } } });
    sp.addEventListener('change', function () { try { localStorage.setItem(SPEED_KEY, sp.value); } catch (e) {} document.querySelectorAll('.gg-vspeed').forEach(function (o) { o.value = sp.value; }); if (state === 'playing') { synth.cancel(); next(); } });
    hb.addEventListener('click', function () {
      var bar = g.closest('.gg-rbar') || g.parentNode, h = bar.querySelector('.gg-vhelp');
      if (h) { h.remove(); hb.setAttribute('aria-expanded', 'false'); return; }
      h = document.createElement('div'); h.className = 'gg-vhelp'; h.innerHTML = HELP; bar.appendChild(h); hb.setAttribute('aria-expanded', 'true');
    });
    return g;
  }
  /* Just the voice, speed, and help, for tools that keep their own Read aloud switch (Maple, Aspen, Field Guide). */
  function settings() {
    var bar = document.createElement('div'); bar.className = 'gg-rbar gg-rset no-print';
    if (synth) bar.appendChild(voiceMenu()); else bar.hidden = true;
    return bar;
  }
  /* Speak one line with the chosen voice and speed. Used by tools that read one question at a time. */
  function say(text, opts) {
    if (!synth || !text) return;
    opts = opts || {};
    stop();
    try {
      if (!chosen) refresh();
      var u = new SpeechSynthesisUtterance(text);
      try { if (chosen) { u.voice = chosen; u.lang = chosen.lang; } } catch (e) { chosen = null; }
      u.rate = (opts.rate || P.rate) * speed(); u.pitch = opts.pitch || P.pitch;
      synth.speak(u);
    } catch (e) {}
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
  /* A Maple-style "Read aloud: on / off" switch. When on, onRead is called whenever the page changes. */
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
  window.GGRead = { setProfile: function (o) { for (var k in o) P[k] = o[k]; refresh(); }, read: read, stop: stop, pause: pause, resume: resume, control: control, toggle: toggle, settings: settings, say: say, speed: speed, isOn: isOn, available: !!synth, get state() { return state; } };

  /* Practice steps: any "Show me how" or "Learn more" box gets its own Read aloud button when it opens. */
  document.addEventListener('toggle', function (e) {
    var d = e.target;
    if (!d || !d.matches || !d.open || !d.matches('details.howto, details.learn, details.gg-readable')) return;
    var body = d.querySelector(':scope > div') || d;
    if (body.querySelector(':scope > .gg-rbar')) return;
    body.insertBefore(control({ root: body, label: 'Read these steps aloud' }), body.firstChild);
  }, true);
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
