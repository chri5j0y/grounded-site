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
  unlock(){ V._held = false; if (!el){ el = new Audio(); el.preload = 'auto'; } try { el.src = silent(); const p = el.play(); if (p) p.catch(() => {}); } catch(e){} try { const A = window.AudioContext || window.webkitAudioContext; V._c = V._c || new A(); V._c.resume && V._c.resume(); } catch(e){} },
  prefetch(voice, text){ if (V.on() && text) fetchClip(voice, text); },
  stop(){ if (SCH.length){ SCH.forEach(x => { try { x.stop(); } catch(e){} }); SCH.length = 0; } if (cur){ const c = cur; cur = null; c.stop(); } },
  // Pause and Resume (and a pause the phone made): _held tells a line's pause apart from one the player asked for.
  pause(){ V._held = true; if (SCH.length){ SCH.forEach(x => { try { x.stop(); } catch(e){} }); SCH.length = 0; } try { el && el.pause(); musicEl && musicEl.pause(); const s = window.speechSynthesis; if (s && s.speaking) s.pause(); } catch(e){} },
  resume(){ V._held = false; try { if (el && el.src && !el.ended && (el.currentTime > 0 || (cur && cur.clip))) el.play().catch(e => { if (e && e.name === 'NotAllowedError' && cur && cur.clip && V.onlost) try { V.onlost(); } catch(x){} }); if (V._c && V._c.state !== 'running' && V._c.resume) V._c.resume(); musicEl && V.musicOn() && musicEl.play().catch(() => {}); const s = window.speechSynthesis; if (s && s.paused) s.resume(); } catch(e){} },
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
        s.start(at, b.v.lead); SCH.push(s); if (V.trace) V.trace.push({text, when: +when, how: 'clip', lead: b.v.lead}); return 'clip'; } catch(e){}
    }
    if (b && !b.done && V._c){ decoded(voice, text); if (V.trace) V.trace.push({text, when: +when, how: 'drop'}); return 'drop'; }
    setTimeout(() => { if (V.on()) self.say(voice, text); }, wait);
    if (V.trace) V.trace.push({text, when: +when, how: 'device'}); return 'device';
  },
  // Soft music under the voice; null stops it.
  music(src){
    try {
      if (!src || !V.musicOn()){ if (musicEl){ musicEl.pause(); musicEl = null; } return; }
      if (musicEl && musicEl.dataset.src === src){ musicEl.play().catch(() => {}); return; }
      if (musicEl) musicEl.pause();
      musicEl = new Audio(src); musicEl.dataset.src = src; musicEl.loop = true; musicEl.volume = 0.14; musicEl.play().catch(() => {});
    } catch(e){}
  },
  tick(){ if (!V.chimeOn()) return; try { const A = window.AudioContext || window.webkitAudioContext; const c = V._c = V._c || new A(), o = c.createOscillator(), g = c.createGain(); o.frequency.value = 880; g.gain.setValueAtTime(0.0001, c.currentTime); g.gain.exponentialRampToValueAtTime(0.2, c.currentTime + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.12); o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.14); } catch(e){} }
};
})();
