// =====================================================================
// GROUNDED FIELD GUIDE (TM): the coach voice and the hands-free players for Tending (GWG BLD 842).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// GGVoice speaks a line in a recorded voice: Ava for workouts and the daily practice, Andrew for the kitchen
// (Chris, October 24, 2026). Clips are locked like every sealed video (BLD 781 SPEC): name = hex of the first 16 bytes
// of HMAC SHA-256(key, voice + '|' + text); file = 12-byte IV + AES-GCM of the mp3, at
// https://audio.growwithgrounded.com/<round>/<folder>/<name>.bin, with the key from the Guide library (FLD.audio).
// A missing clip falls back to the device voice; Voice Off says nothing. Music plays softly under the voice.
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
function fetchClip(voice, text){
  const k = voice + '|' + text; if (cache.has(k)) return cache.get(k);
  const p = (async () => {
    if (!(await keys())) return null;
    const n = await nameOf(voice, text), ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 8000);
    try {
      const r = await fetch(BASE + (KEY.round || 's1') + '/' + (KEY.folder || 'g') + '/' + n + '.bin', {signal: ctl.signal});
      if (!r.ok) return null;
      const b = new Uint8Array(await r.arrayBuffer());
      const mp3 = await crypto.subtle.decrypt({name: 'AES-GCM', iv: b.slice(0, 12)}, AK, b.slice(12));
      return URL.createObjectURL(new Blob([mp3], {type: 'audio/mpeg'}));
    } catch(e){ return null; } finally { clearTimeout(t); }
  })();
  cache.set(k, p); if (cache.size > 300){ const f = cache.keys().next().value; cache.delete(f); }
  return p;
}
function device(text){
  return new Promise(res => {
    try { if (!window.speechSynthesis){ res(); return; } const u = new SpeechSynthesisUtterance(text); u.rate = 1; u.onend = u.onerror = () => res(); speechSynthesis.speak(u); cur = {stop(){ try { speechSynthesis.cancel(); } catch(e){} res(); }}; setTimeout(res, 1500 + text.length * 90); }
    catch(e){ res(); }
  });
}
// A tenth of a second of silence (a tiny WAV), played on the first tap so phones allow the voice afterward.
let SIL = ''; function silent(){ if (SIL) return SIL; const n = 2400, b = new ArrayBuffer(44 + n * 2), d = new DataView(b), w = (o, t) => { for (let i = 0; i < t.length; i++) d.setUint8(o + i, t.charCodeAt(i)); };
  w(0, 'RIFF'); d.setUint32(4, 36 + n * 2, true); w(8, 'WAVE'); w(12, 'fmt '); d.setUint32(16, 16, true); d.setUint16(20, 1, true); d.setUint16(22, 1, true); d.setUint32(24, 24000, true); d.setUint32(28, 48000, true); d.setUint16(32, 2, true); d.setUint16(34, 16, true); w(36, 'data'); d.setUint32(40, n * 2, true);
  return SIL = URL.createObjectURL(new Blob([b], {type: 'audio/wav'})); }
const V = window.GGVoice = {
  setKey(k){ KEY = k && k.key ? k : null; },
  on: () => pref('voice', true), setOn(v){ setPref('voice', v); if (!v) V.stop(); },
  musicOn: () => pref('music', true), setMusic(v){ setPref('music', v); if (!v) V.music(null); },
  chimeOn: () => pref('chime', true), setChime(v){ setPref('chime', v); },
  nameOf: async (voice, text) => (await keys()) ? nameOf(voice, text) : null,
  unlock(){ if (!el){ el = new Audio(); el.preload = 'auto'; } try { el.src = silent(); const p = el.play(); if (p) p.catch(() => {}); } catch(e){} try { const A = window.AudioContext || window.webkitAudioContext; V._c = V._c || new A(); V._c.resume && V._c.resume(); } catch(e){} },
  prefetch(voice, text){ if (V.on() && text) fetchClip(voice, text); },
  stop(){ if (cur){ const c = cur; cur = null; c.stop(); } },
  pause(){ try { el && el.pause(); musicEl && musicEl.pause(); window.speechSynthesis && speechSynthesis.pause(); } catch(e){} },
  resume(){ try { if (el && el.src && !el.ended && el.currentTime > 0) el.play().catch(() => {}); musicEl && V.musicOn() && musicEl.play().catch(() => {}); window.speechSynthesis && speechSynthesis.resume(); } catch(e){} },
  // Speak one line; resolves when it ends (or right away with Voice Off).
  async say(voice, text){
    if (!text || !V.on()) return;
    V.stop();
    const url = await fetchClip(voice, text);
    if (!V.on()) return;
    if (!url) return device(text);
    if (!el){ el = new Audio(); }
    await new Promise(res => {
      let done = false; const fin = () => { if (done) return; done = true; clearTimeout(g); res(); };
      cur = {stop(){ try { el.pause(); } catch(e){} fin(); }};
      el.onended = fin; el.onerror = fin; el.src = url;
      const g = setTimeout(fin, 30000);
      const p = el.play(); if (p) p.catch(fin);
      el.onloadedmetadata = () => { clearTimeout(g); setTimeout(fin, (el.duration || 20) * 1000 + 3000); };
    });
    cur = null;
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
