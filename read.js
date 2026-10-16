/* Grounded read-aloud engine, shared by Stories, Maple, Aspen, Pine, Birch, Oak, Sequoia, Willow, The Grove, and the Field Guide.
   Picks the most natural voice on each device (quality first, with a gentle preference for a
   male or female voice), lets people choose a voice and a speed,
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
    '@media print{.gg-rbar{display:none !important}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var I = {
    spk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5l12 7-12 7z"/></svg>',
    stop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'
  };
  var SEL = 'h1,h2,h3,h4,p,li,blockquote,figcaption,dt,dd,.card-sub,.step-domain,.domain-prompt,.restore-item';
  // Sources and credits are never read aloud (narration never names the source), nor anything marked .no-read (BLD 813).
  var SKIP = '.gg-src,.no-read,nav,footer,form,button,select,textarea,.no-print,[aria-hidden="true"],.gg-rbar,.gn-panel,script,style,.sr-only,.slider-hint,.restore-content';
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
  /* Locked reading (BLD 813): the Field Guide's written guides come from its sealed libraries, so their clips are locked
     like the sealed videos' (GGLearn.sealedClip, shared/gg-learn.js: the library's audio key names and unlocks each
     clip). runLocked holds that audio key while such a reading runs; LC keeps each sentence's unlocked clip. */
  var runLocked = null, LC = {};
  function srcFor(text) {
    if (!runLocked) return Promise.resolve(clipUrl(runVoice, text));
    if (!LC[text]) LC[text] = window.GGLearn.sealedClip(runLocked, runVoice, text).catch(function () { return ''; });
    return LC[text];
  }
  var QUIET = /\b988\b|\b911\b|crisis text line|741741|\b1-8\d\d-|\bhot ?line\b|\bhelp ?line\b|childhelp|samhsa|poison control|\brainn\b|love is respect|\bday one\b|\bmaarc\b|eldercare locator|\bnami\b|military onesource|\b211\b|loveis|22522/i;
  function quiet(t) { return QUIET.test(String(t || '')); }
  function missKey(text) { return runLocked ? 'L|' + text : clipUrl(runVoice, text); }
  function freeLocked() { var C = LC; LC = {}; Object.keys(C).forEach(function (k) { C[k].then(function (u) { if (u) try { URL.revokeObjectURL(u); } catch (e) {} }); }); }
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
  function dropClip() { if (!cc) return; clearTimeout(cc.timer); clearInterval(cc.watch); var a = clipEl(); a.onended = a.onerror = a.onplaying = null; cc = null; }
  /* Even rests (BLD 797, Chris, October 13, 2026, matching the videos): each voice's recordings carry silence before and
     after the words (Brian about 0.14 and 0.36 seconds, Jenny 0.21 and 0.87); most of it is skipped, then a 0.45 second
     rest, and the next chunk downloads while one plays. */
  var TRIM = { brian: [0.10, 0.28], jenny: [0.15, 0.78] }, REST = 450, pre = null;
  function ahead(k) {
    var it = q[k]; if (!it || !runVoice || !window.Audio) return;
    if (runLocked) { if (!miss[missKey(it.t)]) srcFor(it.t); return; }   // unlocks the next clip while this one plays
    var u = clipUrl(runVoice, it.t); if (miss[u]) return;
    try { if (!pre) { pre = new Audio(); pre.preload = 'auto'; } if (pre.src !== u) { pre.src = u; pre.load(); } } catch (e) {}
  }
  function playClip(item, t) {
    var a = clipEl(), url = missKey(item.t), c = { url: url, item: item, t: t, started: false, timer: 0 };
    function fail() {
      if (cc !== c || t !== tok || state !== 'playing') return;
      miss[url] = 1; dropClip(); try { a.pause(); } catch (e) {}
      advance(t);   // skipped quietly, and reading goes on (as in gg-listen.js)
    }
    c.fail = fail;
    c.arm = function () { clearTimeout(c.timer); c.timer = setTimeout(function () { if (!c.started && state === 'playing') fail(); }, 8000); };
    cc = c;
    var cut = TRIM[runVoice] || [0, 0];
    function done() {
      if (cc !== c) return; dropClip(); try { a.pause(); } catch (e) {}
      if (t !== tok || state !== 'playing') return;
      i++; setTimeout(function () { if (t === tok && state === 'playing') next(); }, REST / speed());
    }
    a.onplaying = function () {
      if (cc !== c) return; c.started = true; clearTimeout(c.timer); clearInterval(c.watch);
      if (!isFinite(a.duration) || a.duration < cut[0] + cut[1] + 0.4) return;
      var end = a.duration - cut[1];
      c.watch = setInterval(function () { if (cc !== c) return clearInterval(c.watch); if (!a.paused && a.currentTime >= end) done(); }, 25);
    };
    function start(src) {
      if (cc !== c || t !== tok) return;
      if (!src) return fail();
      a.onended = done;
      a.onerror = fail;
      a.src = cut[0] ? src + '#t=' + cut[0] : src; // start just before the first word
      ahead(i + 1);
      try { a.defaultPlaybackRate = speed(); a.playbackRate = speed(); } catch (e) {}
      c.arm();
      try { var p = a.play(); if (p && p.catch) p.catch(function (e) { if (!e || e.name !== 'AbortError') fail(); }); } catch (e) { fail(); }
    }
    c.arm();
    if (runLocked) srcFor(item.t).then(start); else start(clipUrl(runVoice, item.t));
  }
  // Stop what is sounding now (a voice or speed change, then next() starts the chunk again).
  function halt() { tok++; if (synth) synth.cancel(); if (cc) { dropClip(); try { clipEl().pause(); } catch (e) {} } }
  function next() {
    if (state !== 'playing') return;
    dropClip();
    if (i >= q.length) { stop(); return; }
    var item = q[i], t = ++tok; mark(item.el);
    if (!runVoice) speakItem(item, t);
    else if (miss[missKey(item.t)]) setTimeout(function () { advance(t); }, 0);   // a clip still on its way
    else playClip(item, t);
  }
  /* read(root, {recorded: tree name or true}): with a tree that has a Grounded voice, each chunk plays its recorded
     clip, and a missing one is skipped; every other caller reads with the device voice, as before. */
  /* read(root, {locked: {key: a sealed library's audio object, voice}}) (BLD 813): each chunk plays its locked clip. */
  function read(root, o) {
    var tr = o && o.recorded ? (o.recorded === true ? pageTree() : o.recorded) : '', rv = treeVoice(tr || '-');
    var lk = o && o.locked && window.GGLearn && GGLearn.sealedOk && GGLearn.sealedClip && GGLearn.sealedOk(o.locked) ? o.locked : null;
    stop();
    if (!lk || runLocked !== lk.key) freeLocked();
    runVoice = lk ? lk.voice : rv; runLocked = lk ? lk.key : null;
    if (!synth && !runVoice) return;
    q = blocksOf(root); i = 0;
    // Crisis lines and helplines are never spoken (Chris, firm, October 15, 2026): the Grounded voice leaves out any chunk
    // that names one, and the words stay on the page. o.skip(text) leaves out more.
    if (runVoice) q = q.filter(function (x) { return !quiet(x.t); });
    if (o && typeof o.skip === 'function') q = q.filter(function (x) { return !o.skip(x.t); });
    if (!q.length) return;
    if (runVoice) clipEl();
    // A locked clip arrives after the tap (it is fetched and unlocked first), so a moment of silence plays on the tap itself.
    if (lk && GGLearn.silent) { try { var a0 = clipEl(); a0.src = GGLearn.silent(); var p0 = a0.play(); if (p0 && p0.catch) p0.catch(function () {}); } catch (e) {} }
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
  // Videos and Read Aloud start right away (the Voice Check and Voice Setup steps are retired, Chris, October 13, 2026).
  function ensure(go) { if (go) go(); }
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
      '<label class="gg-vm"><span>Speed</span><select class="gg-vspeed" aria-label="Reading speed">' + SPEEDS.map(function (x) { return '<option value="' + x[0] + '"' + (Math.abs(parseFloat(x[0]) - speed()) < .01 ? ' selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select></label>';
    var sel = g.querySelector('.gg-vsel'), sp = g.querySelector('.gg-vspeed');
    fillMenu(sel);
    sel.addEventListener('change', function () { var v = list.find(function (x) { return x.name === sel.value; }); if (v) { chosen = v; try { localStorage.setItem(P.key, v.name); } catch (e) {} document.querySelectorAll('.gg-vsel').forEach(function (o) { if (o !== sel) fillMenu(o); }); if (state === 'playing') { halt(); next(); } } });
    sp.addEventListener('change', function () { try { localStorage.setItem(SPEED_KEY, sp.value); } catch (e) {} document.querySelectorAll('.gg-vspeed').forEach(function (o) { o.value = sp.value; }); speedNow(); });
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
    var lk = opts.locked && (opts.locked.voice === 'brian' || opts.locked.voice === 'jenny') ? opts.locked : null;
    var rv = lk ? lk.voice : opts.recorded ? treeVoice(opts.recorded) : '', rtree = rv && !lk ? (opts.recorded === true ? pageTree() : opts.recorded) : '';
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
      var go = function () { read(typeof opts.root === 'function' ? opts.root() : opts.root, lk ? { locked: lk, skip: opts.skip } : rv ? { recorded: rtree } : null); mine = state !== 'idle'; paint(); };
      // The Grounded voice starts right on the tap (Safari's rule for audio).
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
  window.GGRead = { chunks: chunks, quiet: quiet, clipName: clipName, clipUrl: clipUrl, treeVoice: treeVoice, pageTree: pageTree, rec: REC, setProfile: function (o) { for (var k in o) P[k] = o[k]; refresh(); }, read: read, stop: stop, pause: pause, resume: resume, control: control, toggle: toggle, settings: settings, say: say, speed: speed, isOn: isOn, available: !!synth, ensure: ensure, label: label, refresh: refresh, voices: function () { return list.slice(); }, get state() { return state; } };

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
