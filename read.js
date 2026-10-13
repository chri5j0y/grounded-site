/* Grounded read-aloud engine, shared by Stories, Maple, Aspen, Pine, Birch, Oak, Sequoia, Willow, The Grove, and the Field Guide.
   Picks the most natural voice on each device (quality first, with a gentle preference for a
   male or female voice), lets people choose a voice and a speed, shows how to get a better voice,
   and plays a recorded audio file when one exists.
   Recorded Read Aloud (BLD 796): Read Aloud on a When Life Changes guide or a practice plays the Grounded voice,
   recorded Azure neural clips (Jenny for Maple, Aspen, Pine, and The Grove; Brian for Birch, Oak, Sequoia, and Willow,
   the BLD 778 video map), one clip per spoken chunk, named exactly like GGLearn.clipName (cyrb53 of voice and text)
   at https://audio.growwithgrounded.com/v1/<voice>/<name>.mp3. A chunk whose clip is missing, fails, or is slow is
   skipped quietly, and reading goes on (as in gg-listen.js). Its bar shows play, pause, stop, and speed only. A page asks for it with control({recorded: tree}) or read(root, {recorded: tree});
   only the guide's and practice's own words ask for a clip; what a person types stays on the device.
   Privacy: voices that run on the device come first. A voice that needs the internet sends the words
   it reads to that company, so it is never picked automatically; it shows as "uses internet" in the
   menu, and only a person can choose it. The Grounded voice plays audio files from Grow With Grounded's own
   audio address, named from the guide's own words. Everything else stays on the device. */
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
  /* ---------------- the Grounded voice (BLD 796) ---------------- */
  var REC = { base: 'https://audio.growwithgrounded.com/', round: 'v1' };
  var TREE_VOICE = { maple: 'jenny', aspen: 'jenny', pine: 'jenny', grove: 'jenny', birch: 'brian', oak: 'brian', sequoia: 'brian', willow: 'brian' };
  function pageTree() { var m = /^\/(maple|aspen|pine|birch|oak|sequoia|willow|grove)(\/|$)/.exec(location.pathname || ''); return m ? m[1] : ''; }
  // The recorded voice for a tree name (or true for this page's tree); '' when there is none.
  function treeVoice(t) { return TREE_VOICE[t === true || !t ? pageTree() : t] || ''; }
  // cyrb53 (a public domain 53-bit string hash, by bryc), the same as GGLearn.clipName in shared/gg-learn.js, byte for byte.
  function clipName(voice, text) {
    var h1 = 0xdeadbeef, h2 = 0x41c6ce57, s = voice + '\n' + String(text).replace(/\s+/g, ' ').trim();
    for (var i = 0, c; i < s.length; i++) { c = s.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507); h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507); h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return voice + '/' + (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  }
  function clipUrl(voice, text) { return REC.base + REC.round + '/' + clipName(voice, text) + '.mp3'; }
  /* iPhone and iPad report a Premium voice as plain "Ava"; the quality is only in its voiceURI
     (com.apple.voice.premium.en-US.Ava). So both are checked. */
  function tag(v) { return (v.name || '') + ' ' + (v.voiceURI || ''); }
  function tier(v) {
    if (!v) return '';
    var t = tag(v);
    if (/premium/i.test(t)) return 'Premium';
    if (/enhanced/i.test(t)) return 'Enhanced';
    if (/natural|neural/i.test(v.name)) return 'Natural';
    return '';
  }
  function quality(v) {
    var q = 0, t = tag(v);
    if (/natural|neural|online/i.test(v.name)) q += 60;
    if (/premium/i.test(t)) q += 55;
    if (/enhanced/i.test(t)) q += 45;
    if (/compact|super-compact|espeak/i.test(t)) q -= 20;
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
    // A saved choice that hasn't loaded yet stays saved (Safari loads voices in more than one pass),
    // so it is picked on a later voiceschanged. Nothing here ever overwrites it.
    var saved = null; try { saved = localStorage.getItem(P.key); } catch (e) {}
    chosen = (saved && list.find(function (v) { return v.name === saved; })) || list[0] || null;
    document.querySelectorAll('select.gg-vsel').forEach(fillMenu);
  }
  function online(v) { return v && v.localService === false; }
  function nice(n) { return n.replace(/^Microsoft /, '').replace(/ Online \(Natural\)/, ' (natural)').replace(/ - English \(([^)]+)\)/, ', $1').replace(/^Google /, 'Google ').replace(/\s+/g, ' ').trim(); }
  // "Ava (Premium)". A Mac already puts the quality in the name, so it isn't doubled.
  function label(v) { var n = nice(v.name), q = tier(v); if (q && q !== 'Natural' && n.toLowerCase().indexOf(q.toLowerCase()) < 0) n += ' (' + q + ')'; return n + (online(v) ? ' (uses internet)' : ''); }
  // Every English voice on the device, best first (novelty voices left out).
  // Every English voice on the device, best first (novelty voices left out).
  function fillMenu(sel) {
    var cur = chosen ? chosen.name : '';
    sel.innerHTML = list.map(function (v) { return '<option value="' + v.name.replace(/"/g, '&quot;') + '"' + (v.name === cur ? ' selected' : '') + '>' + label(v) + '</option>'; }).join('') || '<option>Device voice</option>';
  }
  if (synth) { refresh(); try { synth.addEventListener('voiceschanged', refresh); } catch (e) { synth.onvoiceschanged = refresh; } }

  var css = '.gg-rbar{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:14px 0 18px;font-family:inherit;}.gg-rbar[hidden]{display:none !important;}' +
    '.gg-rbtn{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(139,94,26,.5);background:transparent;color:inherit;border-radius:999px;padding:8px 16px;font:inherit;font-size:15px;font-weight:600;cursor:pointer;line-height:1.2;}' +
    '.gg-rbtn[hidden],.gg-vm[hidden]{display:none !important;}.gg-rbtn:hover{background:rgba(201,138,62,.14);}' +
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
    '.gg-vhelp b{font-weight:700;}.gg-vhelp details{margin:4px 0;}.gg-vhelp summary{cursor:pointer;font-weight:600;min-height:36px;display:flex;align-items:center;}.gg-vs-note{font-size:14px;opacity:.9;}' +
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
  /* A long block reads one sentence at a time. A sentence ends at . ! or ? (and any closing quote) followed by a space
     and a capital, a number, or an opening quote, so web addresses (988lifeline.org) and times (4:30 a.m.) stay whole.
     Recorded clips are named from these exact chunks (BLD 796), so a change here asks for new clips. */
  function sentences(t) {
    var out = [], re = /[.!?]+["\u201d\u2019)]*\s+(?=["\u201c\u2018(]?[A-Z0-9])/g, last = 0, m;
    while ((m = re.exec(t))) { out.push(t.slice(last, m.index + m[0].length).trim()); last = m.index + m[0].length; }
    out.push(t.slice(last).trim());
    return out.filter(function (x) { return !!x; });
  }
  function blocksOf(root) {
    var out = [];
    root.querySelectorAll(SEL).forEach(function (el) {
      var sk = el.closest(SKIP);
      if (!el.offsetParent || (sk && sk !== root && root.contains(sk)) || el.querySelector(SEL)) return;
      var t = el.innerText || '';
      // A label styled in capitals is read in its own words, the way it is written.
      try { if (getComputedStyle(el).textTransform === 'uppercase') t = el.textContent || t; } catch (e) {}
      t = t.replace(/\s+/g, ' ').trim();
      if (t.length < 2) return;
      if (t.length > 260) sentences(t).forEach(function (x) { out.push({ el: el, t: x }); });
      else out.push({ el: el, t: t });
    });
    return out;
  }
  var q = [], i = 0, state = 'idle', cur = null, listeners = [], audio = null;
  /* runVoice: the recorded voice for this reading ('' reads with the device voice). tok: every chunk start, stop, or
     change takes a new number, so a late callback from an earlier chunk does nothing. cc: the clip now playing. */
  var runVoice = '', tok = 0, cc = null, clip = null, miss = {}, story = false;
  function emit() { listeners.forEach(function (f) { try { f(state); } catch (e) {} }); }
  function mark(el) {
    if (cur) cur.classList.remove('gg-reading');
    cur = el; if (!el) return;
    el.classList.add('gg-reading');
    var r = el.getBoundingClientRect();
    if (r.top < 90 || r.bottom > innerHeight - 60) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function advance(t) { if (t !== tok || state !== 'playing') return; i++; next(); }
  function speakItem(item, t) {
    if (!synth) { advance(t); return; }
    var u = new SpeechSynthesisUtterance(item.t);
    if (!chosen) refresh();
    try { if (chosen) { u.voice = chosen; u.lang = chosen.lang; } } catch (e) { chosen = null; }
    u.rate = P.rate * speed(); u.pitch = P.pitch;
    u.onend = function () { advance(t); };
    u.onerror = function () { advance(t); };
    held = u; synth.speak(u);
  }
  // One reused audio element (Safari lets an element that played on a tap go on playing new clips).
  function clipEl() { if (!clip) { clip = new Audio(); clip.preload = 'auto'; } return clip; }
  function dropClip() { if (!cc) return; clearTimeout(cc.timer); var a = clipEl(); a.onended = a.onerror = a.onplaying = null; cc = null; }
  function playClip(item, t) {
    var a = clipEl(), url = clipUrl(runVoice, item.t), c = { url: url, item: item, t: t, started: false, timer: 0 };
    function fail() {
      if (cc !== c || t !== tok || state !== 'playing') return;
      miss[url] = 1; dropClip(); try { a.pause(); } catch (e) {}
      advance(t);   // skipped quietly, and reading goes on (as in gg-listen.js)
    }
    c.fail = fail;
    c.arm = function () { clearTimeout(c.timer); c.timer = setTimeout(function () { if (!c.started && state === 'playing') fail(); }, 8000); };
    cc = c;
    a.onplaying = function () { if (cc === c) { c.started = true; clearTimeout(c.timer); } };
    a.onended = function () { if (cc !== c) return; dropClip(); advance(t); };
    a.onerror = fail;
    a.src = url;
    try { a.defaultPlaybackRate = speed(); a.playbackRate = speed(); } catch (e) {}
    c.arm();
    try { var p = a.play(); if (p && p.catch) p.catch(function (e) { if (!e || e.name !== 'AbortError') fail(); }); } catch (e) { fail(); }
  }
  // Stop what is sounding now (a voice or speed change, then next() starts the chunk again).
  function halt() { tok++; if (synth) synth.cancel(); if (cc) { dropClip(); try { clipEl().pause(); } catch (e) {} } }
  function next() {
    if (state !== 'playing') return;
    dropClip();
    if (i >= q.length) { stop(); return; }
    var item = q[i], t = ++tok; mark(item.el);
    if (!runVoice) speakItem(item, t);
    else if (miss[clipUrl(runVoice, item.t)]) setTimeout(function () { advance(t); }, 0);   // a clip still on its way
    else playClip(item, t);
  }
  /* read(root, {recorded: tree name or true}): with a tree that has a Grounded voice, each chunk plays its recorded
     clip, and a missing one is skipped; every other caller reads with the device voice, as before. */
  function read(root, o) {
    var tr = o && o.recorded ? (o.recorded === true ? pageTree() : o.recorded) : '', rv = treeVoice(tr || '-');
    stop();
    runVoice = rv;
    if (!synth && !runVoice) return;
    q = blocksOf(root); i = 0; if (!q.length) return;
    if (runVoice) clipEl();
    state = 'playing'; emit(); next();
  }
  function pause() {
    if (state !== 'playing') return; state = 'paused';
    if (cc) { clearTimeout(cc.timer); try { clipEl().pause(); } catch (e) {} }
    else if (story && audio) audio.pause();
    else if (synth) synth.cancel();
    emit();
  }
  function resume() {
    if (state !== 'paused') return; state = 'playing'; emit();
    if (cc) { var c = cc; if (!c.started) c.arm(); try { var p = clipEl().play(); if (p && p.catch) p.catch(function (e) { if (!e || e.name !== 'AbortError') c.fail(); }); } catch (e) { c.fail(); } }
    else if (story && audio) audio.play();
    else next();
  }
  function stop() {
    state = 'idle'; tok++;
    if (synth) synth.cancel();
    if (cc) { dropClip(); try { clipEl().pause(); } catch (e) {} }
    if (audio) { audio.pause(); audio.currentTime = 0; }
    story = false; mark(null); emit();
  }
  // The chunks Read Aloud speaks for a region, in order (the inventory and tests read this; the reader uses the same).
  function chunks(root) { return blocksOf(root).map(function (x) { return x.t; }); }
  /* ---------------- Voice Setup ----------------
     Steps to get a better voice on each device and browser. Menus change, so each set also says what to
     search for. Checked October 2026. The Voice Check, the voice menu's help, and the Voice Setup page
     (voice-setup.html) all read these, so the steps are written once. */
  var STEPS = {
    ios: { name: 'iPhone or iPad', why: 'On an iPhone or iPad, web pages can use only Apple\'s built-in voices for now. The Premium and Enhanced voices in Settings don\'t reach web pages yet, in Safari or any other browser, so there is nothing to download.', steps: [
      'Open the Voice menu under any video or Read Aloud button.',
      'Tap Play a Sample and try a few voices. Keep the one that sounds clearest to you. Samantha, Daniel, Karen, and Moira are often the clearest.',
      'If the voice feels rushed, choose Slower in the Speed menu.',
      'For the most natural voices, watch on a computer in Microsoft Edge, on Windows or Mac.'
    ], note: 'Grow With Grounded picks the clearest voice it finds on your iPhone or iPad, and remembers the one you choose.' },
    mac: { name: 'Mac', why: 'Microsoft Edge for Mac has the most natural voices. Safari and Chrome on a Mac use the voices you download in System Settings.', steps: [
      'Best: open this page in Microsoft Edge for Mac. Its voices marked (natural) use the internet and sound the most like a person; choose one yourself in the Voice menu.',
      'Or, to keep everything on your Mac:',
      'Open System Settings, then Accessibility.',
      'Open Read &amp; Speak (or Spoken Content), then the System Voice menu, then Manage Voices.',
      'Under English, download a voice marked Premium or Enhanced, like Ava, Zoe, Evan, or Nathan.',
      'Quit your browser all the way (Command Q), open it again, and come back to this page.',
      'Open the Voice menu and pick the new voice.'
    ], note: 'Siri voices can\'t be used by websites. Choose a Premium or Enhanced voice instead.' },
    windows: { name: 'Windows', why: 'Microsoft Edge has the most natural voices on Windows. Chrome and Firefox use the voices installed in Windows.', steps: [
      'Best: open this page in Microsoft Edge. Its voices marked (natural) sound the most like a person.',
      'Natural voices in Edge use the internet: the words being read go to Microsoft to be spoken. Lessons and check-in questions are the same for everyone, so nothing about you is sent. Grow With Grounded never picks these for you; choose one yourself in the Voice menu.',
      'To keep everything on your computer instead: open Settings, then Time &amp; language, then Speech. Under Manage voices, choose Add voices and add an English voice.',
      'Close your browser all the way, open it again, and pick the voice in the Voice menu.'
    ], note: 'Voices named David, Zira, or Mark are the older Windows voices. They work, but they sound robotic.' },
    android: { name: 'Android', why: 'Chrome on Android uses your phone\'s text-to-speech engine. Google\'s engine has the best voices.', steps: [
      'Open Settings and search for Text-to-speech.',
      'Set the Preferred engine to Speech Services by Google. (Samsung phones start with Samsung\'s engine; switch it.)',
      'Tap the gear next to Speech Services by Google, then Install voice data, then English (United States).',
      'Download a voice you like. Tap play to hear each one.',
      'Close Chrome all the way (swipe it away in recent apps), open this page again, and pick the voice in the Voice menu.'
    ], note: 'Voice downloads are large. Use Wi-Fi.' },
    chromeos: { name: 'Chromebook', why: 'A Chromebook uses Google\'s voices.', steps: [
      'Open Settings, then Accessibility, then Text-to-speech.',
      'Open Text-to-speech voice settings (or Speech engines) and choose an English voice. Download a natural voice if one is offered.',
      'Close Chrome all the way, open this page again, and pick the voice in the Voice menu.'
    ], note: '' },
    linux: { name: 'Linux', why: 'Browsers on Linux use the voices installed on the computer, which are often very basic.', steps: [
      'Chrome offers Google voices that use the internet (they show as uses internet). Pick one in the Voice menu if you\'re comfortable with that.',
      'Or install a better voice package for your system, then restart the browser.'
    ], note: '' }
  };
  var BROWSER_NOTE = { firefox: 'Firefox uses the voices on your device. If they sound robotic, the steps above help, or open this page in Safari, Edge, or Chrome.' };
  function platform() {
    var ua = navigator.userAgent || '', pl = navigator.platform || '', touch = (navigator.maxTouchPoints || 0) > 1;
    var os = /iPhone|iPad|iPod/.test(ua) || (/Mac/.test(pl) && touch) ? 'ios' : /Android/.test(ua) ? 'android' : /CrOS/.test(ua) ? 'chromeos' : /Mac/.test(pl) || /Macintosh/.test(ua) ? 'mac' : /Win/.test(pl) || /Windows/.test(ua) ? 'windows' : /Linux/.test(ua) ? 'linux' : 'windows';
    var br = /Edg\//.test(ua) ? 'edge' : /Firefox|FxiOS/.test(ua) ? 'firefox' : /Chrome|CriOS/.test(ua) ? 'chrome' : /Safari/.test(ua) ? 'safari' : 'browser';
    var dev = os === 'ios' ? (/iPad/.test(ua) || (/Mac/.test(pl) && touch) ? 'iPad' : 'iPhone') : STEPS[os].name;
    var bname = { edge: 'Microsoft Edge', firefox: 'Firefox', chrome: 'Chrome', safari: 'Safari', browser: 'your browser' }[br];
    return { os: os, browser: br, label: dev + ', ' + bname };
  }
  // How good the voice in use is: great (Premium, Enhanced, Natural), okay (a newer standard voice), or basic.
  function voiceInfo() {
    if (!synth) return { ok: false, grade: 'none', name: '', text: 'This browser can\'t read aloud.' };
    if (!list.length) refresh();
    var v = chosen, q = tier(v), t = v ? tag(v) : '';
    var grade = !v ? 'none' : q ? 'great' : /google/i.test(v.name) && !online(v) ? 'great' : /compact|espeak|\b(david|zira|mark)\b/i.test(t) ? 'basic' : /google/i.test(v.name) ? 'okay' : /\b(samantha|alex|daniel|karen|moira|tessa|fred)\b/i.test(v.name) ? 'okay' : 'basic';
    if (v && platform().os === 'android' && /^en/i.test(v.lang) && !q) grade = 'okay';
    var best = list.filter(function (x) { return tier(x) && !online(x); }).length;
    return { ok: !!v, grade: grade, name: v ? label(v) : '', count: list.length, best: best };
  }
  // What to say about the voice in use (Voice Check, the Learn voice card, and Voice Setup all use this).
  function saidText(I) {
    if (!I || I.grade === 'none') return 'Let\'s find you a voice. If you just added one, fully close your browser and open this page again.';
    if (platform().os === 'ios') return 'This is one of the voices an iPhone or iPad lets web pages use. Pick the clearest one in the Voice menu. For the most natural voices, watch on a computer in Microsoft Edge.';
    return { great: 'Sounds great. You\'re all set.', okay: 'Sounds okay. A Premium, Enhanced, or Natural voice sounds much more like a person.', basic: 'Sounds basic, and it can make lessons hard to enjoy. A better voice takes a few minutes to set up.' }[I.grade];
  }
  function stepsHtml(os, open) {
    var S = STEPS[os]; if (!S) return '';
    return '<p class="gg-vs-why">' + S.why + '</p><ol>' + S.steps.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>' + (S.note ? '<p class="gg-vs-note">' + S.note + '</p>' : '');
  }
  // Steps for this device first, then every other device behind a tap.
  function helpHtml() {
    var p = platform(), others = Object.keys(STEPS).filter(function (k) { return k !== p.os; });
    return '<h4>Get a Better Voice</h4><p>Many computers and Android phones come with natural-sounding voices waiting to be turned on. Download one once, and every Grow With Grounded tool uses it, even offline. On an iPhone or iPad, pick the clearest voice in the Voice menu, since web pages there can use only Apple\'s built-in voices for now.</p>'
      + '<p><b>On your ' + STEPS[p.os].name + '</b></p>' + stepsHtml(p.os) + (BROWSER_NOTE[p.browser] ? '<p>' + BROWSER_NOTE[p.browser] + '</p>' : '')
      + others.map(function (k) { return '<details class="gg-vs-more"><summary>' + STEPS[k].name + '</summary>' + stepsHtml(k) + '</details>'; }).join('')
      + '<p>Voices marked \"uses internet\" read the words through that company\'s servers, so Grow With Grounded never picks them for you.</p>';
  }
  var SAMPLE = 'Hello. This is how lessons and read aloud will sound on this device. Take a slow breath. You are right where you need to be.';
  var CHECK_KEY = 'gg_voice_checked';
  function checked() { try { return !!localStorage.getItem(CHECK_KEY); } catch (e) { return true; } }
  /* The Voice Check: once per device, before the first video or Read Aloud, and anytime from the voice menu. */
  function check(done) {
    var old = document.querySelector('.gg-vc'); if (old) old.remove();
    if (!document.getElementById('gg-vc-css')) {
      var c = document.createElement('style'); c.id = 'gg-vc-css';
      c.textContent = '.gg-vc{position:fixed;inset:0;z-index:2147483600;background:rgba(28,22,18,.55);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:24px 14px calc(24px + env(safe-area-inset-bottom,0px));font-family:Barlow,system-ui,sans-serif;}'
        + '.gg-vc-box{background:#FFFCF6;color:#2C1810;max-width:560px;width:100%;border-radius:20px;padding:22px 22px 18px;box-shadow:0 18px 50px rgba(0,0,0,.3);margin:auto 0;}'
        + ':root[data-theme="dark"] .gg-vc-box{background:#26211C;color:#F2EADC;}@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .gg-vc-box{background:#26211C;color:#F2EADC;}}'
        + '.gg-vc h2{font-family:\'Cormorant Garamond\',serif;font-weight:600;font-size:32px;line-height:1.1;margin:0 0 6px;}.gg-vc h2:focus{outline:none;}'
        + '.gg-vc p{font-size:17px;line-height:1.5;margin:8px 0;}.gg-vc ol{margin:6px 0 8px 22px;padding:0;font-size:16px;line-height:1.5;}.gg-vc li{margin:4px 0;}'
        + '.gg-vc-now{display:flex;gap:12px;align-items:center;border-radius:14px;padding:12px 14px;margin:12px 0;background:rgba(139,94,26,.09);}'
        + '.gg-vc-dot{width:14px;height:14px;border-radius:50%;flex:none;}.gg-vc-now b{display:block;}.gg-vc-now small{display:block;font-size:15px;opacity:.85;}'
        + '.gg-vc-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;}'
        + '.gg-vc button{font:inherit;font-weight:600;min-height:48px;padding:10px 16px;border-radius:12px;border:1.5px solid #8B5E1A;background:transparent;color:inherit;cursor:pointer;}'
        + '.gg-vc button.pri{background:#8B5E1A;border-color:#8B5E1A;color:#FFF8EC;}.gg-vc button:focus-visible{outline:3px solid #C98A3E;outline-offset:2px;}'
        + '.gg-vc details{border-top:1px solid rgba(139,94,26,.25);padding:6px 0;}.gg-vc summary{cursor:pointer;font-weight:600;min-height:40px;display:flex;align-items:center;}'
        + '.gg-vs-note{font-size:15px !important;opacity:.9;}.gg-vc .gg-vc-steps{margin-top:6px;}';
      document.head.appendChild(c);
    }
    var p = platform(), wrap = document.createElement('div'); wrap.className = 'gg-vc'; wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-modal', 'true'); wrap.setAttribute('aria-label', 'Voice Check');
    var prev = document.activeElement;
    function paint() {
      var I = voiceInfo(), col = { great: '#5F7D48', okay: '#C07A26', basic: '#B8612F', none: '#B8612F' }[I.grade];
      var said = saidText(I), ios = p.os === 'ios';
      wrap.innerHTML = '<div class="gg-vc-box"><h2 tabindex="-1">Voice Check</h2>'
        + '<p>Lessons, videos, and Read Aloud use your device\'s own voice. A good voice makes them a joy to listen to; a basic one can sound robotic. Let\'s check yours.</p>'
        + '<p style="font-size:15px;opacity:.85">You\'re on ' + p.label + '.</p>'
        + '<div class="gg-vc-now"><span class="gg-vc-dot" style="background:' + col + '"></span><span><b>' + (I.name ? 'Your voice: ' + I.name : 'Your voice') + '</b><small>' + said + '</small></span></div>'
        + '<div class="gg-vc-row"><button type="button" data-v="sample">Play a Sample</button>' + (I.grade !== 'great' && !ios ? '<button type="button" data-v="again">I Added a Voice, Check Again</button>' : '') + '</div>'
        + (I.grade !== 'great' ? '<details class="gg-vc-steps"' + (I.grade !== 'great' ? ' open' : '') + '><summary>' + (ios ? 'Voices on Your iPhone or iPad' : 'Set Up a Better Voice on Your ' + STEPS[p.os].name) + '</summary>' + stepsHtml(p.os) + (BROWSER_NOTE[p.browser] ? '<p>' + BROWSER_NOTE[p.browser] + '</p>' : '') + '</details>' : '')
        + '<p style="font-size:15px">Other devices, a video, and a printable guide: <a href="/voice-setup.html" target="_blank" rel="noopener">Voice Setup</a>.</p>'
        + '<div class="gg-vc-row"><button type="button" class="pri" data-v="go">' + (I.grade === 'great' ? 'Continue' : 'Continue Anyway') + '</button></div></div>';
    }
    function finish() { try { localStorage.setItem(CHECK_KEY, new Date().toISOString().slice(0, 10)); } catch (e) {} if (synth) synth.cancel(); document.removeEventListener('keydown', key); wrap.remove(); if (prev && prev.focus) try { prev.focus(); } catch (e) {} if (done) done(); }
    function key(e) { if (e.key === 'Escape') { e.preventDefault(); finish(); } }
    wrap.addEventListener('click', function (e) {
      var b = e.target.closest('[data-v]'); if (!b) return;
      var v = b.getAttribute('data-v');
      if (v === 'sample') say(SAMPLE);
      else if (v === 'again') { refresh(); paint(); var h = wrap.querySelector('h2'); if (h) h.focus(); }
      else if (v === 'go') finish();
    });
    document.addEventListener('keydown', key);
    paint(); document.body.appendChild(wrap);
    var h = wrap.querySelector('h2'); if (h) h.focus();
    // Voices often arrive a moment after the page; repaint once they do.
    setTimeout(function () { if (wrap.isConnected) { refresh(); paint(); } }, 900);
  }
  // Run the Voice Check first if this device hasn't had one, then go on.
  function ensure(go) { if (!synth || checked()) { if (go) go(); return; } check(go); }
  /* Speed only, for a bar that reads in the Grounded voice (BLD 796; device voice menus retired, Chris, October 10, 2026). */
  function speedMenu() {
    var g = document.createElement('span'); g.className = 'gg-vm gg-vset';
    g.innerHTML = '<label class="gg-vm"><span>Speed</span><select class="gg-vspeed" aria-label="Reading speed">' + SPEEDS.map(function (x) { return '<option value="' + x[0] + '"' + (Math.abs(parseFloat(x[0]) - speed()) < .01 ? ' selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select></label>';
    var sp = g.querySelector('.gg-vspeed');
    sp.addEventListener('change', function () { try { localStorage.setItem(SPEED_KEY, sp.value); } catch (e) {} document.querySelectorAll('.gg-vspeed').forEach(function (o) { o.value = sp.value; }); speedNow(); });
    return g;
  }
  // A recorded clip changes speed where it is; the device voice starts the chunk again at the new speed.
  function speedNow() { if (cc) { try { clipEl().defaultPlaybackRate = speed(); clipEl().playbackRate = speed(); } catch (e) {} } else if (state === 'playing') { halt(); next(); } }
  function voiceMenu() {
    var g = document.createElement('span'); g.className = 'gg-vm gg-vset'; g.style.flexWrap = 'wrap';
    g.innerHTML = '<label class="gg-vm"><span>Voice</span><select class="gg-vsel" aria-label="Choose a reading voice"></select></label>' +
      '<label class="gg-vm"><span>Speed</span><select class="gg-vspeed" aria-label="Reading speed">' + SPEEDS.map(function (x) { return '<option value="' + x[0] + '"' + (Math.abs(parseFloat(x[0]) - speed()) < .01 ? ' selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select></label>' +
      '<button type="button" class="gg-vhelp-btn" aria-expanded="false">Get a Better Voice</button><button type="button" class="gg-vhelp-btn gg-vcheck-btn">Voice Check</button>';
    var sel = g.querySelector('.gg-vsel'), sp = g.querySelector('.gg-vspeed'), hb = g.querySelector('.gg-vhelp-btn');
    fillMenu(sel);
    sel.addEventListener('change', function () { var v = list.find(function (x) { return x.name === sel.value; }); if (v) { chosen = v; try { localStorage.setItem(P.key, v.name); } catch (e) {} document.querySelectorAll('.gg-vsel').forEach(function (o) { if (o !== sel) fillMenu(o); }); if (state === 'playing') { halt(); next(); } } });
    sp.addEventListener('change', function () { try { localStorage.setItem(SPEED_KEY, sp.value); } catch (e) {} document.querySelectorAll('.gg-vspeed').forEach(function (o) { o.value = sp.value; }); speedNow(); });
    g.querySelector('.gg-vcheck-btn').addEventListener('click', function () { check(); });
    hb.addEventListener('click', function () {
      var bar = g.closest('.gg-rbar') || g.parentNode, h = bar.querySelector('.gg-vhelp');
      if (h) { h.remove(); hb.setAttribute('aria-expanded', 'false'); return; }
      h = document.createElement('div'); h.className = 'gg-vhelp'; h.innerHTML = helpHtml(); bar.appendChild(h); hb.setAttribute('aria-expanded', 'true');
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
  // opts.onend runs when the line finishes (or fails), so a player can pause between lines.
  var held = null; // Safari can drop an utterance it isn't holding on to, and never fire its end
  function say(text, opts) {
    if (!synth || !text) return null;
    opts = opts || {};
    stop();
    try {
      if (!chosen) refresh();
      var u = new SpeechSynthesisUtterance(text), fired = false;
      try { if (chosen) { u.voice = chosen; u.lang = chosen.lang; } } catch (e) { chosen = null; }
      u.rate = (opts.rate || P.rate) * speed(); u.pitch = opts.pitch || P.pitch;
      var end = function () { if (fired) return; fired = true; if (held === u) held = null; if (opts.onend) try { opts.onend(); } catch (e) {} };
      u.onend = end; u.onerror = end;
      if (opts.onstart) u.onstart = function () { try { opts.onstart(); } catch (e) {} };
      held = u; synth.speak(u);
      return u;
    } catch (e) { return null; }
  }
  /* A play, pause, and stop control that reads a region. audioSrc plays a recording instead when it exists. */
  /* opts.recorded (a tree name, or true for this page's tree): a guide or practice, read in the Grounded voice. */
  function control(opts) {
    var rv = opts.recorded ? treeVoice(opts.recorded) : '', rtree = rv ? (opts.recorded === true ? pageTree() : opts.recorded) : '';
    var bar = document.createElement('div'); bar.className = 'gg-rbar no-print';
    var b = document.createElement('button'); b.type = 'button'; b.className = 'gg-rbtn';
    var s = document.createElement('button'); s.type = 'button'; s.className = 'gg-rbtn gg-rstop'; s.innerHTML = I.stop; s.setAttribute('aria-label', 'Stop reading'); s.hidden = true;
    var menu = rv ? speedMenu() : voiceMenu();
    var mine = false, recorded = false;
    function paint() {
      var active = mine && state !== 'idle';
      if (!active) { b.innerHTML = I.spk + '<span>' + (recorded ? (opts.recordedLabel || 'Listen') : (opts.label || 'Read Aloud')) + '</span>'; b.setAttribute('aria-pressed', 'false'); s.hidden = true; }
      else if (state === 'playing') { b.innerHTML = I.pause + '<span>Pause</span>'; b.setAttribute('aria-pressed', 'true'); s.hidden = false; }
      else { b.innerHTML = I.play + '<span>Resume</span>'; b.setAttribute('aria-pressed', 'true'); s.hidden = false; }
      menu.hidden = recorded;
    }
    listeners.push(function () { if (state === 'idle') mine = false; paint(); });
    b.addEventListener('click', function () {
      if (mine && state === 'playing') return pause();
      if (mine && state === 'paused') return resume();
      if (recorded) { mine = true; stop(); mine = true; story = true; audio.play(); state = 'playing'; emit(); return; }
      // read() stops whatever was reading first (which clears mine), so this bar takes the reading after it starts.
      var go = function () { read(typeof opts.root === 'function' ? opts.root() : opts.root, rv ? { recorded: rtree } : null); mine = state !== 'idle'; paint(); };
      // The Grounded voice starts right on the tap (Safari's rule for audio); the Voice Check is for device voices.
      if (rv) go(); else ensure(go);
    });
    s.addEventListener('click', stop);
    bar.appendChild(b); bar.appendChild(s); if (synth || rv) bar.appendChild(menu);
    if (opts.audioSrc && window.fetch) {
      fetch(opts.audioSrc, { method: 'HEAD' }).then(function (r) {
        if (!r.ok) return;
        recorded = true; audio = new Audio(opts.audioSrc); audio.preload = 'none';
        audio.addEventListener('ended', stop); bar.hidden = false; paint();
      }).catch(function () {});
    }
    // Chris, October 10, 2026: the device read-aloud bar and its voice menu are retired (the videos carry recorded voices);
    // the bar shows only once a real recording is found (story pages).
    // BLD 796: a guide's or practice's bar shows again, with the Grounded voice.
    bar.hidden = !rv;
    paint();
    return bar;
  }
  /* A Maple-style "Read aloud: on / off" switch. When on, onRead is called whenever the page changes. */
  function toggle(opts) {
    var key = opts.key || 'gg_read_on';
    var on = false; try { on = localStorage.getItem(key) === '1'; } catch (e) {}
    var bar = document.createElement('div'); bar.className = 'gg-rbar no-print';
    var b = document.createElement('button'); b.type = 'button'; b.className = 'gg-rbtn gg-rtoggle';
    function paint() { b.innerHTML = I.spk + '<span>Read Aloud: ' + (on ? 'on' : 'off') + '</span>'; b.setAttribute('aria-pressed', on ? 'true' : 'false'); }
    b.addEventListener('click', function () {
      on = !on; try { localStorage.setItem(key, on ? '1' : '0'); } catch (e) {}
      document.querySelectorAll('.gg-rtoggle').forEach(function (x) { if (x !== b) x.dispatchEvent(new CustomEvent('gg-sync')); });
      paint(); if (on) ensure(function () { opts.onRead(); }); else stop();
    });
    b.addEventListener('gg-sync', function () { try { on = localStorage.getItem(key) === '1'; } catch (e) {} paint(); });
    paint(); bar.appendChild(b); if (synth) bar.appendChild(voiceMenu());
    if (!synth) bar.hidden = true;
    return bar;
  }
  function isOn(key) { try { return localStorage.getItem(key || 'gg_read_on') === '1'; } catch (e) { return false; } }
  window.GGRead = { chunks: chunks, clipName: clipName, clipUrl: clipUrl, treeVoice: treeVoice, pageTree: pageTree, rec: REC, saidText: saidText, setProfile: function (o) { for (var k in o) P[k] = o[k]; refresh(); }, read: read, stop: stop, pause: pause, resume: resume, control: control, toggle: toggle, settings: settings, say: say, speed: speed, isOn: isOn, available: !!synth, check: check, ensure: ensure, checked: checked, voiceInfo: voiceInfo, platform: platform, steps: STEPS, stepsHtml: stepsHtml, helpHtml: helpHtml, label: label, refresh: refresh, voices: function () { return list.slice(); }, get state() { return state; } };

  /* Practice steps: any "Show me how" or "Learn more" box gets its own Read aloud button when it opens. */
  document.addEventListener('toggle', function (e) {
    var d = e.target;
    if (!d || !d.matches || !d.open || !d.matches('details.howto, details.learn, details.gg-readable')) return;
    var body = d.querySelector(':scope > div') || d;
    if (body.querySelector(':scope > .gg-rbar')) return;
    body.insertBefore(control({ root: body, label: 'Read these steps aloud', recorded: treeVoice(true) ? true : '' }), body.firstChild);
  }, true);
  window.addEventListener('pagehide', function () { if (synth) synth.cancel(); if (clip) try { clip.pause(); } catch (e) {} });
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
