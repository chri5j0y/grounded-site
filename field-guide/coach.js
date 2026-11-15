// =====================================================================
// GROUNDED FIELD GUIDE (TM): the coach voice and the hands-free players for Tending (GWG BLD 842).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// GGVoice speaks a line in a recorded voice: Ava for workouts and the daily practice, Andrew for the kitchen
// (Chris, October 24, 2026). Clips are locked like every sealed video (BLD 781 SPEC): name = hex of the first 16 bytes
// of HMAC SHA-256(key, voice + '|' + text); file = 12-byte IV + AES-GCM of the mp3, at
// https://audio.growwithgrounded.com/<round>/<folder>/<name>.bin, with the key from the Guide library (FLD.audio).
// A missing clip falls back to the device voice; Voice Off says nothing. Music plays softly under the voice.
// Public Tending (BLD 866): the same call, GGVoice.setKey(GGTendPublic.audio), with {key, round: 'p1', folder: 't'}. That key is
// unsealed on purpose (public clips are open to everyone); clip names and decryption are the same as the sealed rounds.
// =====================================================================
(function(){
'use strict';
const BASE = 'https://audio.growwithgrounded.com/';
let KEY = null, HK = null, AK = null, keyRaw = '';
const cache = new Map();
let el = null, cur = null, musicEl = null;
// BLD 991 Sound and Music: shared/gg-sound.js gives one AudioContext for the voice's counts, the music, and the cues, and a
// bus that dips the music under Ava's lines (4 dB, 3 under her counts). Workout music plays as a playlist of its group
// (field-guide/health.js musicFor), crossfading over 4 seconds, through a Web Audio gain (phones ignore an audio volume).
const SND_JS = (() => { try { const s = document.currentScript && document.currentScript.src; if (s) return new URL('../shared/gg-sound.js?v=c117', s).href; } catch(e){} return '/shared/gg-sound.js?v=c117'; })();
let sndP = null;
function needSnd(){ if (window.GGSound) return Promise.resolve(window.GGSound); if (sndP) return sndP; sndP = new Promise(ok => { const s = document.createElement('script'); s.src = SND_JS; s.onload = () => ok(window.GGSound || null); s.onerror = () => { sndP = null; ok(null); }; document.head.appendChild(s); }); return sndP; }
const G = () => window.GGSound || null;
const CUE_FILES = ['fit-countdown-4.mp3', 'fit-round-bell.mp3', 'fit-finish.mp3', 'bell-1.mp3', 'bell-3.mp3'];
const MU_LEVEL = 0.14, MU_X = 4;
const PL = {key: '', list: [], i: 0, k: 0, E: [], on: false, played: new Set(), x: false};
function plEl(){
  const a = new Audio(); a.crossOrigin = 'anonymous'; a.preload = 'auto'; const e = {a, g: null};
  const S = G(), c = S && S.ctx();
  if (c){ try { const n = c.createMediaElementSource(a); e.g = c.createGain(); e.g.gain.value = 0; n.connect(e.g); e.g.connect(S.bus()); } catch(x){ e.g = null; } }
  if (!e.g) a.volume = 0;
  a.addEventListener('timeupdate', () => plTime(e));
  a.addEventListener('ended', () => { if (PL.E[PL.k] === e && PL.on && !PL.x) plNext(); });
  return e;
}
function plLevel(e, to, sec){
  if (e.g){ const c = e.g.context, t = c.currentTime; try { e.g.gain.cancelScheduledValues(t); e.g.gain.setValueAtTime(e.g.gain.value, t); e.g.gain.linearRampToValueAtTime(to, t + Math.max(0.01, sec)); } catch(x){ e.g.gain.value = to; } return; }
  const a = e.a, from = a.volume, t0 = Date.now(); clearInterval(e.fi); e.fi = setInterval(() => { const k = Math.min(1, (Date.now() - t0) / (sec * 1000 || 1)); try { a.volume = from + (to - from) * k; } catch(x){} if (k >= 1) clearInterval(e.fi); }, 60);
}
function plStart(e, src, sec){ e.a.src = src; PL.played.add(src); const p = e.a.play(); if (p) p.catch(() => {}); plLevel(e, MU_LEVEL, sec); }
function plTime(e){ if (PL.E[PL.k] !== e || !PL.on || PL.x) return; const a = e.a; if (isFinite(a.duration) && a.duration > MU_X * 3 && a.duration - a.currentTime <= MU_X) plNext(); }
function plNext(){
  if (!PL.list.length) return; PL.x = true;
  const old = PL.E[PL.k]; PL.k = 1 - PL.k; PL.i = (PL.i + 1) % PL.list.length;
  if (!PL.E[PL.k]) PL.E[PL.k] = plEl();
  plStart(PL.E[PL.k], PL.list[PL.i], MU_X);
  if (old){ plLevel(old, 0, MU_X); setTimeout(() => { try { if (PL.E[PL.k] !== old) old.a.pause(); } catch(x){} PL.x = false; }, MU_X * 1000 + 200); } else PL.x = false;
}
function plPlay(list, start){
  const key = list.join('|');
  if (PL.on && PL.key === key){ const e = PL.E[PL.k]; if (e){ const p = e.a.play(); if (p) p.catch(() => {}); plLevel(e, MU_LEVEL, 1); } return; }
  plStop(0.4); PL.key = key; PL.list = list.slice(); PL.i = Math.max(0, +start || 0) % list.length; PL.on = true; PL.x = false;
  if (!PL.E[PL.k]) PL.E[PL.k] = plEl();
  plStart(PL.E[PL.k], PL.list[PL.i], 2);
}
function plStop(sec){ PL.on = false; PL.key = ''; PL.E.forEach(e => { if (!e) return; plLevel(e, 0, sec || 0.6); setTimeout(() => { if (!PL.on || PL.E[PL.k] !== e) try { e.a.pause(); } catch(x){} }, (sec || 0.6) * 1000 + 100); }); }
function plPause(){ PL.E.forEach(e => { try { e && e.a.pause(); } catch(x){} }); }
function plResume(){ if (!PL.on) return; const e = PL.E[PL.k]; if (e){ const p = e.a.play(); if (p) p.catch(() => {}); } }
const pref = (k, d) => { try { const v = localStorage.getItem('gg-health-' + k); return v == null ? d : v === '1'; } catch(e){ return d; } };
const setPref = (k, v) => { try { localStorage.setItem('gg-health-' + k, v ? '1' : '0'); } catch(e){} };
async function keys(){
  if (!KEY || !KEY.key || !(window.crypto && crypto.subtle)) return false;
  if (keyRaw === KEY.key && HK && AK) return true;
  const raw = Uint8Array.from(atob(KEY.key), c => c.charCodeAt(0));
  HK = await crypto.subtle.importKey('raw', raw, {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
  AK = await crypto.subtle.importKey('raw', raw, {name: 'AES-GCM'}, false, ['decrypt']);
  keyRaw = KEY.key; return true;
}
async function nameOf(voice, text){
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', HK, new TextEncoder().encode(voice + '|' + text)));
  return Array.from(sig.slice(0, 16)).map(b => b.toString(16).padStart(2, '0')).join('');
}
function fetchClip(voice, text, ms){
  const k = voice + '|' + text; if (cache.has(k)) return cache.get(k);
  const p = (async () => {
    if (!(await keys())) return null;
    const n = await nameOf(voice, text), ctl = new AbortController(), t = setTimeout(() => ctl.abort(), ms || 8000);
    try {
      const r = await fetch(BASE + (KEY.round || 's1') + '/' + (KEY.folder || 'g') + '/' + n + '.bin', {signal: ctl.signal});
      if (!r.ok) return null;
      const b = new Uint8Array(await r.arrayBuffer());
      const mp3 = await crypto.subtle.decrypt({name: 'AES-GCM', iv: b.slice(0, 12)}, AK, b.slice(12));
      return URL.createObjectURL(new Blob([mp3], {type: 'audio/mpeg'}));
    } catch(e){ return null; } finally { clearTimeout(t); }
  })();
  // BLD 879: a clip that failed to arrive (a slow first connection) is forgotten, so the next try fetches it again.
  p.then(u => { if (!u && cache.get(k) === p) cache.delete(k); });
  cache.set(k, p); if (cache.size > 300){ const f = cache.keys().next().value; cache.delete(f); }
  return p;
}
// BLD 898: decoded short lines for words on the beat, with the silence before the voice measured once.
const BUF = new Map(), SCH = [];
function decoded(voice, text){
  const k = voice + '|' + text; if (BUF.has(k)) return BUF.get(k);
  const e = {done: false, v: null}; BUF.set(k, e);
  (async () => {
    try {
      const c = V._c, url = await fetchClip(voice, text); if (!url || !c || !c.decodeAudioData) return;
      const ab = await (await fetch(url)).arrayBuffer(), buf = await new Promise((ok, no) => { const p = c.decodeAudioData(ab, ok, no); if (p && p.then) p.then(ok, no); });
      const d = buf.getChannelData(0), n = d.length; let i = 0; while (i < n && Math.abs(d[i]) < 0.01) i++;
      e.v = {buf, lead: Math.max(0, i / buf.sampleRate - 0.01)};
    } catch(x){} finally { e.done = true; if (!e.v){ BUF.delete(k); if (BUF.size > 80) BUF.delete(BUF.keys().next().value); } }
  })();
  return e;
}
// onstart runs when the device voice really starts the line (a breath circle starts with it, November 12, 2026). The
// device voice is cancelled only while it is speaking: on an iPhone, cancelling an idle one can take the sound away.
function device(text, onstart){
  return new Promise(res => {
    try { if (!window.speechSynthesis){ if (onstart) onstart(); res(); return; }
      const u = new SpeechSynthesisUtterance(text); let over = false;
      const me = {dev: true, stop(){ try { const s = speechSynthesis; if (s.speaking || s.pending) s.cancel(); } catch(e){} end(); }};
      const end = () => { if (over) return; over = true; if (cur === me) cur = null; res(); };
      u.rate = 1; u.onstart = () => { if (onstart) try { onstart(); } catch(e){} }; u.onend = u.onerror = end; cur = me; speechSynthesis.speak(u); setTimeout(end, 1500 + text.length * 90); }
    catch(e){ res(); }
  });
}
// A tenth of a second of silence (a tiny WAV), played on the first tap so phones allow the voice afterward.
let SIL = ''; function silent(){ if (SIL) return SIL; const n = 2400, b = new ArrayBuffer(44 + n * 2), d = new DataView(b), w = (o, t) => { for (let i = 0; i < t.length; i++) d.setUint8(o + i, t.charCodeAt(i)); };
  w(0, 'RIFF'); d.setUint32(4, 36 + n * 2, true); w(8, 'WAVE'); w(12, 'fmt '); d.setUint32(16, 16, true); d.setUint16(20, 1, true); d.setUint16(22, 1, true); d.setUint32(24, 24000, true); d.setUint32(28, 48000, true); d.setUint16(32, 2, true); d.setUint16(34, 16, true); w(36, 'data'); d.setUint32(40, n * 2, true);
  return SIL = URL.createObjectURL(new Blob([b], {type: 'audio/wav'})); }
const V = window.GGVoice = {
  setKey(k){ KEY = k && typeof k.key === 'string' && k.key ? k : null; },
  on: () => pref('voice', true), setOn(v){ setPref('voice', v); if (!v) V.stop(); },
  musicOn: () => pref('music', true), setMusic(v){ setPref('music', v); if (!v) V.music(null); },
  chimeOn: () => pref('chime', true), setChime(v){ setPref('chime', v); },
  nameOf: async (voice, text) => (await keys()) ? nameOf(voice, text) : null,
  unlock(){ V._held = false; if (!el){ el = new Audio(); el.preload = 'auto'; } try { el.src = silent(); const p = el.play(); if (p) p.catch(() => {}); } catch(e){} try { const A = window.AudioContext || window.webkitAudioContext; V._c = V._c || (G() && G().ctx()) || new A(); V._c.resume && V._c.resume(); } catch(e){}
    needSnd().then(S => { if (!S) return; S.unlock(); CUE_FILES.forEach(f => S.load(f).catch(() => {})); }); },
  prefetch(voice, text){ if (V.on() && text) fetchClip(voice, text); },
  stop(){ if (SCH.length){ SCH.forEach(x => { try { x.stop(); } catch(e){} }); SCH.length = 0; } if (cur){ const c = cur; cur = null; c.stop(); } },
  // Pause and Resume (and a pause the phone made): _held tells a line's pause apart from one the player asked for.
  pause(){ V._held = true; if (SCH.length){ SCH.forEach(x => { try { x.stop(); } catch(e){} }); SCH.length = 0; } plPause(); if (G()) G().duck(false); try { el && el.pause(); musicEl && musicEl.pause(); const s = window.speechSynthesis; if (s && s.speaking) s.pause(); } catch(e){} },
  resume(){ V._held = false; try { if (el && el.src && !el.ended && (el.currentTime > 0 || (cur && cur.clip))) el.play().catch(e => { if (e && e.name === 'NotAllowedError' && cur && cur.clip && V.onlost) try { V.onlost(); } catch(x){} }); if (V._c && V._c.state !== 'running' && V._c.resume) V._c.resume(); musicEl && V.musicOn() && musicEl.play().catch(() => {}); V.musicOn() && plResume(); const s = window.speechSynthesis; if (s && s.paused) s.resume(); } catch(e){} },
  // Speak one line; resolves when it ends (or right away with Voice Off). o.onstart runs when the line's sound really starts
  // (the recording plays, or the device voice begins), so the breath circle can start with the voice (November 12, 2026).
  // Sound and pictures keep one clock: when the phone stops the sound mid line (an outside pause, or a refused play), the line
  // waits, V.onlost tells the player to pause, and resume() plays the same line on from where it stopped.
  async say(voice, text, o){
    const onstart = o && o.onstart;
    if (!text || !V.on()) return;
    V.stop();
    let url = await fetchClip(voice, text);
    if (!url && V.on()) url = await fetchClip(voice, text, 15000); // BLD 879: one more try, with more time, before the device voice
    if (!V.on()) return;
    if (!url) return device(text, onstart);
    if (!el){ el = new Audio(); }
    let me = null;
    if (G()) G().duck(true, -4);
    await new Promise(res => {
      let done = false, began = false, g = 0;
      const fin = () => { if (done) return; done = true; clearTimeout(g); el.onplaying = el.onpause = el.onloadedmetadata = null; res(); };
      const arm = ms => { clearTimeout(g); g = setTimeout(fin, ms); };
      const lost = () => { if (done) return; clearTimeout(g); if (V._held) return; me.lost = true; let held = false; try { held = !!(V.onlost && V.onlost()); } catch(e){} if (!held) fin(); };
      me = cur = {clip: true, lost: false, stop(){ el.onpause = null; try { el.pause(); } catch(e){} fin(); }};
      el.onended = fin; el.onerror = fin; el.src = url;
      arm(30000);
      el.onplaying = () => { me.lost = false; if (!began){ began = true; if (onstart) try { onstart(); } catch(e){} }
        if (isFinite(el.duration) && el.duration > 0) arm(Math.max(0, el.duration - el.currentTime) * 1000 / (el.playbackRate || 1) + 3000); };
      // A pause the player did not ask for (the end of the line also fires one) holds the line and its guard.
      el.onpause = () => { if (done || el.ended || (isFinite(el.duration) && el.currentTime >= el.duration - 0.1)) return; lost(); };
      const p = el.play(); if (p) p.catch(e => { if (done) return; if (e && (e.name === 'NotAllowedError' || (e.name === 'AbortError' && !el.ended))) return lost(); fin(); });
      el.onloadedmetadata = () => { if (!began) arm((el.duration || 20) * 1000 + 3000); };
    });
    if (cur === me) cur = null;
    if (G()) G().duck(false);
  },
  // BLD 898: words on the beat. prime() downloads and decodes short lines (the counts) ahead of time and measures the
  // silence each recording carries before the voice (about 0.08 to 0.14 seconds). at(voice, text, when) then starts the
  // line so its first word sounds at `when` (a Date.now() time): Web Audio starts it at that instant, past its lead in.
  // A line still on its way is left out (a late count would pull the rep off the beat); a line with no recording is
  // spoken by the device voice at the beat. Returns how it went: 'clip', 'device', 'drop', or 'off'.
  prime(voice, texts){ if (!V.on()) return; (texts || []).forEach(t => { if (t) decoded(voice, t); }); },
  // BLD 931 (Chris's workout notes, November 6, 2026: the Break counts down, then instructions play before the clock): how long
  // a line plays, in seconds (its decoded recording, start to end), so the player can start the next move's instructions that
  // many seconds before a Break ends. Resolves null when the line has no recording or the voice is off.
  len(voice, text){
    if (!text || !V.on()) return Promise.resolve(null);
    const e = decoded(voice, text), t0 = Date.now();
    return new Promise(res => { const look = () => { if (e.done || Date.now() - t0 > 6000) return res(e.v ? e.v.buf.duration : null); setTimeout(look, 40); }; look(); });
  },
  at(voice, text, when){
    if (!text || !V.on()) return 'off';
    const k = voice + '|' + text, b = BUF.get(k), self = this && this.say ? this : V, wait = Math.max(0, (+when || Date.now()) - Date.now());
    const c = V._c, ok = b && b.v && c && c.state === 'running' && c.createBufferSource;
    if (ok){
      try { const s = c.createBufferSource(); s.buffer = b.v.buf; s.connect(c.destination); const at = c.currentTime + wait / 1000;
        if (SCH.length){ SCH.forEach(x => { try { x.stop(at); } catch(e){} }); SCH.length = 0; }
        s.start(at, b.v.lead); SCH.push(s); if (G()) setTimeout(() => G() && G().duckFor(Math.max(0.3, b.v.buf.duration - b.v.lead), -3), wait); if (V.trace) V.trace.push({text, when: +when, how: 'clip', lead: b.v.lead}); return 'clip'; } catch(e){}
    }
    if (b && !b.done && V._c){ decoded(voice, text); if (V.trace) V.trace.push({text, when: +when, how: 'drop'}); return 'drop'; }
    setTimeout(() => { if (V.on()) self.say(voice, text); }, wait);
    if (V.trace) V.trace.push({text, when: +when, how: 'device'}); return 'device';
  },
  // Soft music under the voice; null stops it.
  // BLD 991: an array is a playlist (its group's tracks, from list[start]), crossfading over 4 seconds.
  music(src, start){
    try {
      if (!src || !V.musicOn()){ if (musicEl){ musicEl.pause(); musicEl = null; } plStop(0.6); return; }
      if (Array.isArray(src)){ if (musicEl){ musicEl.pause(); musicEl = null; } if (!src.length) return; needSnd().then(() => { if (V.musicOn()) plPlay(src, start); }); return; }
      plStop(0.4);
      if (musicEl && musicEl.dataset.src === src){ musicEl.play().catch(() => {}); return; }
      if (musicEl) musicEl.pause();
      musicEl = new Audio(src); musicEl.dataset.src = src; musicEl.loop = true; musicEl.volume = 0.14; musicEl.play().catch(() => {});
    } catch(e){}
  },
  // BLD 991: the tracks this session played (their credits show on the finish screen).
  musicPlayed(){ return Array.from(PL.played); },
  musicReset(){ PL.played = new Set(); },
  busy: () => !!cur,
  // BLD 991 cues (made in code by Grow With Grounded): a Promise that resolves after `wait` seconds (or the cue's length).
  cue(file, o){ o = o || {}; return needSnd().then(S => S ? S.cue(file, {gain: o.gain == null ? 0.7 : o.gain}) : null).then(h => new Promise(r => setTimeout(() => r(h), Math.max(0, (o.wait != null ? o.wait : h ? h.dur : 0) * 1000)))); },
  // The countdown (decision 8): three beeps and a go beep (fit-countdown-4, beeps at 0, 1, 2, and 3 s), placed on the Web Audio
  // clock so the go beep lands as the clock reaches zero. Returns a handle with stop(), or null (Beeps off, or not ready yet).
  countdown(leftMs){
    if (!V.chimeOn()) return null; const S = G(); if (!S || !S.cueReady('fit-countdown-4.mp3')) return null;
    const c = S.ctx(); if (!c || c.state !== 'running') return null;
    const L = Math.max(0, +leftMs || 0) / 1000;
    return S.cueNow('fit-countdown-4.mp3', L >= 3 ? {at: c.currentTime + (L - 3), gain: 0.7} : {offset: 3 - L, gain: 0.7});
  },
  tick(){ if (!V.chimeOn()) return; try { const A = window.AudioContext || window.webkitAudioContext; const c = V._c = V._c || new A(), o = c.createOscillator(), g = c.createGain(); o.frequency.value = 880; g.gain.setValueAtTime(0.0001, c.currentTime); g.gain.exponentialRampToValueAtTime(0.2, c.currentTime + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.12); o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.14); } catch(e){} }
};
// BLD 991: the sound engine loads with the coach, so the first tap finds one shared AudioContext.
needSnd();
})();
