/* =====================================================================
   SOUND (shared/gg-sound.js)   GWG BLD 991 Sound and Music
   One small sound engine for the site's players: the video player (shared/gg-learn.js), the Readings Library's Listen
   (shared/gg-readings.js), and the workout and meditation players (field-guide/coach.js and field-guide/health.js).
   - One AudioContext for music, nature beds, and cues. Music and beds run through one bus that dips 4 dB while a
     sentence speaks (duck) and comes back over 0.6 seconds.
   - Nature beds: real recordings (audio.growwithgrounded.com/sound/v1), fetched once, decoded, and played by a looping
     AudioBufferSourceNode, so they loop with no gap. The plan (shared/gg-sound-plan.js) holds each bed's true length in
     samples, so the loop skips the encoder's padding on every browser. At most one bed plays at a time, and at most two
     decoded beds stay in memory. The same bed in the next scene keeps playing; a different one crossfades.
   - Nature Sounds On or Off is kept on this device (gg-nature). Off fetches nothing.
   - Cues: the meditation bells and the workout countdown, round bell, and finish chime (made in code by Grow With
     Grounded), timed on the Web Audio clock.
   Nothing starts before a tap: unlock() runs inside Play.
     GGSound.ctx(), .bus(), .unlock()          the shared context, the music and bed bus, resume inside a tap
     GGSound.natureOn(), .setNature(on)       the Nature Sounds choice
     GGSound.at(lessonId, scene)              [file, dB] when that scene carries a bed (or null); .has(lessonId)
     GGSound.reading(id)                       [file, dB] for a Readings Library reading (or null)
     GGSound.bed(file, dB, fadeIn), .bedOff(fadeOut), .bedPause(), .bedResume(), .preload(file)
     GGSound.duck(on, dB), .duckFor(seconds, dB)
     GGSound.cue(file, {gain, at, offset})    a Promise of {src, at, dur} (or null); .cueNow(file, opts) when decoded
     GGSound.ready()                           a Promise that resolves once the plan is loaded
   ===================================================================== */
(function () {
  if (window.GGSound) return;
  var V = 'c117', BASE = 'https://audio.growwithgrounded.com/sound/v1/';
  var HERE = (function () { try { var s = document.currentScript && document.currentScript.src; if (s) return s.replace(/[^\/]*$/, ''); } catch (e) {} return '/shared/'; })();
  var CUES = { 'bell-1.mp3': 1, 'bell-2.mp3': 1, 'bell-3.mp3': 1, 'fit-countdown.mp3': 1, 'fit-countdown-4.mp3': 1, 'fit-round-bell.mp3': 1, 'fit-finish.mp3': 1 };
  var S = { c: null, bus: null, bed: null, buf: {}, dec: {}, order: [], live: [] };
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function plan() { return window.GG_SOUND_PLAN || null; }
  var planP = null;
  function ready() {
    if (plan()) return Promise.resolve(plan());
    if (planP) return planP;
    planP = new Promise(function (ok) {
      var s = document.createElement('script'); s.src = HERE + 'gg-sound-plan.js?v=' + V; s.async = true;
      s.onload = function () { ok(plan()); }; s.onerror = function () { planP = null; ok(null); };
      document.head.appendChild(s);
    });
    return planP;
  }
  function natureOn() { return lsGet('gg-nature') !== 'off'; }
  function setNature(on) {
    lsSet('gg-nature', on ? 'on' : 'off');
    if (!on) bedOff(0.4);
    try { window.dispatchEvent(new CustomEvent('gg-nature', { detail: { on: !!on } })); } catch (e) {}
  }
  function ctx() {
    if (S.c) return S.c;
    var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    try { S.c = new AC(); } catch (e) { return null; }
    // The phone's ringer switch treats this sound like the voice (Safari 17 and up).
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
    S.bus = S.c.createGain(); S.bus.gain.value = 1; S.bus.connect(S.c.destination);
    return S.c;
  }
  function bus() { return ctx() ? S.bus : null; }
  function unlock() { var c = ctx(); if (c && c.state !== 'running' && c.resume) { try { var p = c.resume(); if (p && p.catch) p.catch(function () {}); } catch (e) {} } }
  function gainOf(db) { return Math.pow(10, db / 20); }
  function ramp(param, to, sec) {
    var c = S.c; if (!c) return;
    var t = c.currentTime;
    try { param.cancelScheduledValues(t); param.setValueAtTime(param.value, t); param.linearRampToValueAtTime(to, t + Math.max(0.01, sec)); } catch (e) { try { param.value = to; } catch (x) {} }
  }
  function urlOf(f) { var p = plan(); return ((p && p.base) || BASE) + f; }
  function touch(f) { if (CUES[f]) return; S.order = S.order.filter(function (x) { return x !== f; }); S.order.push(f); }
  // At most two decoded beds stay in memory (the one playing and the next); cues are small and stay.
  function trim() {
    var keep = S.bed ? S.bed.file : '';
    while (S.order.length > 2) {
      var i = 0; if (S.order[0] === keep) i = 1;
      var f = S.order.splice(i, 1)[0]; delete S.buf[f]; delete S.dec[f];
    }
  }
  function load(f) {
    if (S.buf[f]) { touch(f); return S.buf[f]; }
    var c = ctx(); if (!c || !window.fetch) return Promise.reject(new Error('no sound'));
    var pr = fetch(urlOf(f), { mode: 'cors', credentials: 'omit' }).then(function (r) { if (!r.ok) throw new Error('sound ' + r.status); return r.arrayBuffer(); })
      .then(function (ab) { return new Promise(function (ok, no) { var q = c.decodeAudioData(ab, ok, no); if (q && q.then) q.then(ok, no); }); })
      .then(function (b) { if (S.buf[f] === pr) S.dec[f] = b; return b; });
    S.buf[f] = pr; touch(f); trim();
    pr.catch(function () { if (S.buf[f] === pr) { delete S.buf[f]; S.order = S.order.filter(function (x) { return x !== f; }); } });
    return pr;
  }
  // The loop: the plan's true length (n samples at 44.1 kHz). A browser that leaves the encoder's lead in (about 1105
  // samples) starts the loop past it.
  function loopOf(b, f) {
    var p = plan(), n = p && p.n && p.n[f]; if (!n) return [0, b.duration];
    var len = n / 44100, extra = b.duration - len, lead = 1105 / 44100, st = extra >= lead - 0.002 ? lead : 0;
    return [st, Math.min(b.duration, st + len)];
  }
  function at(id, i) { var p = plan(), v = p && p.vid && p.vid[id]; return v && v[String(i)] || null; }
  function has(id) { var p = plan(); return !!(p && p.vid && p.vid[id]); }
  function reading(id) { var p = plan(); return p && p.read && p.read[id] || null; }
  // A bed's level: the beds are mastered near -30 LUFS and the voice near -18, so 0 dB here sits 12 dB under the voice;
  // the plan's dB is how far under the voice it plays (about 10 to 14).
  function bed(f, db, fadeIn) {
    if (!f || !natureOn()) { bedOff(0.4); return; }
    var c = ctx(); if (!c) return;
    var lvl = gainOf(12 + (isFinite(+db) ? +db : -11));
    var b = S.bed;
    if (b && b.file === f) { b.lvl = lvl; b.want = true; b.paused = false; if (b.g) ramp(b.g.gain, lvl, 0.8); return; }
    if (b) bedOff(2.5);
    b = S.bed = { file: f, lvl: lvl, want: true, paused: false, g: null, src: null, fin: fadeIn || 3 };
    load(f).then(function (buf) {
      if (S.bed !== b || !b.want) return;
      var g = c.createGain(); g.gain.value = 0; g.connect(S.bus);
      var s = c.createBufferSource(), L = loopOf(buf, f); s.buffer = buf; s.loop = true; s.loopStart = L[0]; s.loopEnd = L[1];
      s.connect(g); s.start(0, L[0]);
      b.g = g; b.src = s; b.t0 = c.currentTime;
      ramp(g.gain, b.paused ? 0 : b.lvl, b.fin);
    }, function () {});
  }
  function bedOff(sec) {
    var b = S.bed; S.bed = null; if (!b) return; b.want = false;
    var d = sec == null ? 2.5 : sec;
    if (b.g) { ramp(b.g.gain, 0, d); setTimeout(function () { try { b.src.stop(); } catch (e) {} try { b.g.disconnect(); } catch (e) {} }, (d + 0.25) * 1000); }
  }
  function bedPause() { var b = S.bed; if (!b) return; b.paused = true; if (b.g) ramp(b.g.gain, 0, 0.3); }
  function bedResume() { var b = S.bed; if (!b) return; b.paused = false; unlock(); if (b.g) ramp(b.g.gain, b.lvl, 0.8); }
  function preload(f) { if (f && natureOn() && ctx()) load(f).catch(function () {}); }
  // Ducking: music and bed dip while a sentence speaks, back up over 0.6 seconds after it ends.
  function duck(on, db) { if (!S.c || !S.bus) return; if (on) ramp(S.bus.gain, gainOf(db == null ? -4 : db), 0.12); else ramp(S.bus.gain, 1, 0.6); }
  function duckFor(sec, db) { if (!S.c || !S.bus) return; var g = S.bus.gain, t = S.c.currentTime; try { g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(gainOf(db == null ? -3 : db), t + 0.08); g.setValueAtTime(gainOf(db == null ? -3 : db), t + Math.max(0.1, sec)); g.linearRampToValueAtTime(1, t + Math.max(0.1, sec) + 0.6); } catch (e) {} }
  function startCue(buf, o) {
    var c = S.c, g = c.createGain(), s = c.createBufferSource(), when = o.at != null ? Math.max(c.currentTime, o.at) : c.currentTime;
    g.gain.value = o.gain == null ? 0.7 : o.gain; g.connect(c.destination); s.buffer = buf; s.connect(g);
    s.start(when, Math.max(0, Math.min(buf.duration - 0.01, o.offset || 0)));
    var h = { src: s, at: when, dur: buf.duration - (o.offset || 0), stop: function () { try { s.stop(); } catch (e) {} } };
    S.live.push(h); s.onended = function () { S.live = S.live.filter(function (x) { return x !== h; }); try { g.disconnect(); } catch (e) {} };
    return h;
  }
  function cue(f, o) {
    o = o || {}; var c = ctx(); if (!c) return Promise.resolve(null);
    unlock();
    return load(f).then(function (b) { return startCue(b, o); }, function () { return null; });
  }
  function cueNow(f, o) { var b = S.dec[f]; if (!b || !ctx()) return null; return startCue(b, o || {}); }
  function cueReady(f) { return !!S.dec[f]; }
  function state() {
    var b = S.bed;
    return { ctx: S.c ? S.c.state : '', nature: natureOn(), duck: S.bus ? Math.round(S.bus.gain.value * 1000) / 1000 : 1, decoded: Object.keys(S.dec),
      bed: b ? { file: b.file, lvl: Math.round(b.lvl * 1000) / 1000, gain: b.g ? Math.round(b.g.gain.value * 1000) / 1000 : null, paused: b.paused, loop: b.src ? [b.src.loopStart, b.src.loopEnd] : null } : null, cues: S.live.length };
  }
  window.GGSound = { version: V, ctx: ctx, bus: bus, unlock: unlock, ready: ready, natureOn: natureOn, setNature: setNature, at: at, has: has, reading: reading,
    bed: bed, bedOff: bedOff, bedPause: bedPause, bedResume: bedResume, preload: preload, load: load, duck: duck, duckFor: duckFor, cue: cue, cueNow: cueNow, cueReady: cueReady, state: state };
  ready();
})();
