// =====================================================================
// GROUNDED FIELD GUIDE (TM): the 3D stage in every player (GWG BLD 897). (c) 2026 Grow With Grounded LLC.
// Chris, October 31, 2026: the 3D figure (MakeHuman CC0, three.js MIT, an ink and warm paint study), stage direction "A"
// (the figure stands inside the painting's own room: its floor and its light), the tree breath guide, gold form guides
// on the body at the key moment, and one clock for the figure, the breath, and Ava's count.
//
// How it rides along with the player (field-guide/health.js and stage.js, BLD 898):
//   The player still draws its SVG figure (GGMoves) on the stage, laid on the shared plan (data-dur, data-ph) and held to
//   the one clock by clkSync. That SVG stays in place, unseen, as the master timeline: each frame the 3D figure reads its
//   time, finds the breath phase it is in (from the plan), and shows the 3D move at the same point of the same phase. So the
//   3D body, the tree, and the count turn together, pause together, and restart together on each count, with no new clock.
//   A screen whose figure has no 3D move yet, a phone without WebGL, Save Data, or the Simple Figure setting keeps the SVG.
//
//   GGFig3D.sync(ctx): after every player draw. ctx: {art, kind, category, workout} for the painting (art-map.json), and
//     name, the move shown (for the move name map).
//   GGFig3D.detach(): when the player closes.
//   GGFig3D.ok(): true when this device and setting use the 3D stage.
//   GGFig3D.body() / GGFig3D.setBody('man' | 'woman'): the figure setting (saved on this device).
//   GGFig3D.state(): for tests: {on, move, tau, dur, u, phase, body, art, frames, mirrored, guide}.
//   GGFig3D.artFor(ref): the painting for {art, workout, category, kind} through the art map and its fallbacks.
//
// Lazy: this file is small; the engine (figure3d.js, about 0.5 MB) and the figure data (figure.bin) load only when a
// player with a figure opens on a device that can draw it. The engine (fig3d.js) sets window.GGFigure3D = {create, patterns,
// drawForms, ...} (v3d/ENGINE.md); a stand in built from the round 4 engine sets window.GG3D.create the same way.
// Reduced motion: the figure holds its key pose (the SVG is still too), and the form guides stay drawn.
// =====================================================================
(function(){
'use strict';
if (window.GGFig3D) return;
const V = 'b899';
const BASE = (() => { try { const s = document.currentScript && document.currentScript.src; return s ? new URL('./', s).href : '/shared/fig3d/'; } catch(e){ return '/shared/fig3d/'; } })();
const ls = {get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }, set(k, v){ try { localStorage.setItem(k, v); } catch(e){} }};
const mm = q => { try { return !!(window.matchMedia && matchMedia(q).matches); } catch(e){ return false; } };
const reduced = () => mm('(prefers-reduced-motion: reduce)');
const isDark = () => { const t = document.documentElement.getAttribute('data-theme'); return t ? t === 'dark' : mm('(prefers-color-scheme: dark)'); };

// ---------- can this device draw it ----------
let GL = null, SOFT = false;
// A device that draws WebGL only in software (no graphics chip: SwiftShader, llvmpipe) would spend the time the count and the
// breath need on drawing, so it keeps the simple figure unless the person turns 3D Figure on (gg-fig3d 'on').
function webgl(){
  if (GL != null) return GL;
  try { const c = document.createElement('canvas'), g = c.getContext('webgl2') || c.getContext('webgl'); GL = !!g;
    if (g){ const x = g.getExtension('WEBGL_debug_renderer_info'), r = String(x ? g.getParameter(x.UNMASKED_RENDERER_WEBGL) : g.getParameter(g.RENDERER) || '');
      SOFT = /swiftshader|llvmpipe|softpipe|software|basic render/i.test(r); const lc = g.getExtension('WEBGL_lose_context'); if (lc) lc.loseContext(); } } catch(e){ GL = false; }
  return GL;
}
function pref(){ return ls.get('gg-fig3d'); }
function ok(){
  if (/[?&]fig=svg\b/.test(location.search) || pref() === 'off' || F.failed) return false;
  try { if (navigator.connection && navigator.connection.saveData) return false; } catch(e){}
  if (mm('(prefers-reduced-data: reduce)')) return false;
  return webgl() && (!SOFT || pref() === 'on');
}
// The settings chip shows wherever WebGL exists, so the person can choose either figure.
function able(){ return webgl() && !F.failed; }

// ---------- the painting: one map, with fallbacks ----------
let MAP = null;
function artFor(ref){
  if (!MAP) return null; ref = ref || {};
  // BLD 899: a painting may name a different painting for the stage (stage: id), when its own scene has no room for a
  // person to work out (a close-up still life, water at the floor line, clutter). Cards keep their own painting.
  // BLD 900: stage may also be a list, the first painting whose file is on the site wins (a painting not yet delivered,
  // like yoga-studio, is skipped once its file fails to load); a list may name the painting itself to stand in its own room.
  const A = MAP.art || {}, one = id => id && A[id] && !MISS[id] ? Object.assign({id}, MAP.defaults || {}, A[id]) : null,
    next = a => { const l = Array.isArray(a.stage) ? a.stage : [a.stage]; for (const id of l){ if (id === a.id) return null; if (one(id)) return id; } return null; },
    pick = id => { let a = one(id), n = 0, to; while (a && a.stage && (to = next(a)) && n++ < 4) a = Object.assign(one(to), {card: a.card || a.id}); return a; };
  if (ref.exact) return one(ref.art);
  return pick(ref.art) || pick((MAP.workouts || {})[ref.workout]) || pick(ref.workout) || pick((MAP.categories || {})[ref.category]) ||
    pick((MAP.fallback || {})[ref.kind || 'move']) || pick(MAP.default);
}
const artUrl = a => new URL((MAP.base || '') + a.src + (/\?/.test(a.src) ? '' : '?v=' + V), new URL('art-map.json', BASE)).href;
const LUM = {}, MISS = {};
function lum(img){
  try { const c = document.createElement('canvas'); c.width = 48; c.height = 27; const g = c.getContext('2d'); g.drawImage(img, 0, 0, 48, 27);
    const d = g.getImageData(0, 0, 48, 27).data; let L = 0; for (let i = 0; i < d.length; i += 4) L += (.2126 * d[i] + .7152 * d[i + 1] + .0722 * d[i + 2]) / 255; return L / (d.length / 4); } catch(e){ return .6; }
}

// ---------- loading ----------
const F = {loading: null, ready: false, failed: false, buf: null};
// BLD 900: the art map loads on its own first (small), so the stage painting can show while the engine still loads.
let MAPP = null;
function mapP(){ return MAPP || (MAPP = fetch(BASE + 'art-map.json?v=' + V).then(r => r.ok ? r.json() : null).catch(() => null).then(m => { if (m) MAP = m; return m; })); }
const E = () => (window.GGFigure3D && window.GGFigure3D.create ? window.GGFigure3D : window.GG3D && window.GG3D.create ? window.GG3D : null);
function script(src){ return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.async = true; s.onload = res; s.onerror = () => rej(new Error('load ' + src)); document.head.appendChild(s); }); }
function load(){
  if (F.loading) return F.loading;
  F.loading = Promise.all([
    E() ? Promise.resolve() : script(BASE + 'fig3d.js?v=' + V),
    fetch(BASE + 'figure.bin?v=' + V).then(r => { if (!r.ok) throw new Error('figure data'); return r.arrayBuffer(); }),
    mapP()
  ]).then(([, buf, map]) => { F.buf = buf; MAP = map; F.ready = !!E(); if (!F.ready) throw new Error('engine'); })
    .catch(e => { F.failed = true; console.warn('GGFig3D: the simple figure stays (' + (e && e.message) + ')'); });
  return F.loading;
}

// ---------- the layer: made once, moved into each new stage after a redraw (the WebGL canvas keeps its context) ----------
const L = {el: null, cv: null, gc: null, paint: null, stage: null, box: null, raf: 0, ctx: {}, art: null, artImg: null, move: null, Q: {}, last: null, frames: 0,
  dirty: true, place: 0, gk: 0, mir: false, st: {}, dark: null, body: null};
function layer(){
  if (L.el) return L.el;
  const el = document.createElement('div'); el.className = 'g3'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<div class="g3-paint"></div><div class="g3-veil"></div><div class="g3-band"></div><canvas class="g3-fig"></canvas><canvas class="g3-guides"></canvas>';
  try { new ResizeObserver(() => { L.dirty = true; L.place = 0; L.gr = null; if (L.stage) kick(); else placeArt(); }).observe(el); } catch(e){}
  L.el = el; L.paint = el.querySelector('.g3-paint'); L.band = el.querySelector('.g3-band'); L.cv = el.querySelector('.g3-fig'); L.gc = el.querySelector('.g3-guides');
  return el;
}
function bodyPref(){
  const b = ls.get('gg-fig-body'); if (b === 'man' || b === 'woman') return b;
  try { const p = window.GGFig3D && GGFig3D.profileBody && GGFig3D.profileBody(); if (p === 'man' || p === 'woman') return p; } catch(e){}
  return 'man';
}
function makeStage(first){
  if (L.stage) return L.stage;
  const extra = name => fetch(BASE + 'figure-' + name + '.bin?v=' + V).then(r => { if (!r.ok) throw new Error(name); return r.arrayBuffer(); });
  let mv; try { mv = engineHas(first) ? first : undefined; } catch(e){}
  L.stage = E().create(L.cv, F.buf, {dark: isDark(), move: mv, extra, still: false, paper: false, palette: 'paint', zoom: .8});
  L.dark = isDark(); L.body = 'man';
  // Driven by the page's one clock, frame by frame: seek(u, {t}) when the engine has it (breathing life, glides), else
  // a held pose drawn each frame (the round 4 engine).
  if (!L.stage.seek && L.stage.virt) L.stage.virt(true);
  L.cv.addEventListener('webglcontextlost', e => { e.preventDefault(); F.failed = true; detach(); });
  return L.stage;
}
function engineHas(id){ try { const e = E(); if (e && e.patterns) return e.patterns().includes(id); } catch(e){} return false; }
const has = id => { try { if (L.stage && L.stage.has) return !!L.stage.has(id); } catch(e){} return engineHas(id) || !!(L.stage && L.stage.moves.some(m => m.id === id)); };
// The 3D pattern for the figure shown: PAT1's move name map first (GG3D.names: [[pattern on the move's name, id], ...]) when
// that 3D pattern is in the bundle, else the SVG figure's own pattern id.
function pick3d(svgId){
  const name = String(L.ctx.name || ''), map = window.GG3D && Array.isArray(window.GG3D.names) ? window.GG3D.names : null;
  if (name && map) for (const [re, id] of map){ try { if ((re instanceof RegExp ? re : new RegExp(re, 'i')).test(name) && has(id)) return id; } catch(e){} }
  return svgId;
}
// A move done on each side with a 3D partner (PAT3: id and id + '-other', each naming the other): the left side (or no
// side) shows the move as defined, the right side its partner, and the move blend glides across at the switch. Such a
// pair is never mirrored as a picture; other moves mirror the drawing on the left side, as the SVG does.
function sided(id){
  const d = defOf(id); if (!d || !d.other) return {id, pair: false};
  const base = /-other$/.test(id) && defOf(d.other) ? d.other : id, alt = defOf(base) && defOf(base).other;
  return {id: L.ctx.side === 'R' && alt && has(alt) ? alt : base, pair: true};
}
function defOf(id){ try { const G = window.GG3D; return (G && G.get && G.get(id)) || moveDef(id) || null; } catch(e){ return null; } }
const moveDef = id => { try { return (L.stage && L.stage.M && L.stage.M[id]) || null; } catch(e){ return null; } };

// ---------- one clock: the SVG figure's own time, through its plan's breath phases ----------
// The plan (data-ph, "in:1.8 out:1.2") is the timeline the tree and the count share. Each 3D move names its breath on its
// keys; its phases over the loop (Q) are read once. Phase i of the plan shows phase i of the 3D move, at the same share of
// the way through, so every turn of the breath is a turn of the body. A plan that covers two reps of a one rep move, or
// the other way round, wraps the 3D phases; a plan that does not match keeps an even pace.
const parsePh = s => String(s || '').trim().split(/\s+/).map(x => { const [k, d] = x.split(':'); return {k, d: +d}; }).filter(p => p.k && p.d > 0);
function probe(stage, id){
  const key = id + ':' + stage.current(); if (L.Q[key]) return L.Q[key];
  let Q = null; const d = moveDef(id);
  try {
    if (stage.phases) Q = stage.phases();
    else if (d && Array.isArray(d.bp)){
      // A held stretch led by its own breath pattern: the keys follow the pattern ([in, out] or [in, hold, out]), once a
      // loop, or once each side for a side to side move.
      const ks = d.bp.length === 3 ? ['in', 'hold', 'out'] : ['in', 'out'], per = d.alt ? 2 : 1, T = d.bp.reduce((a, b) => a + b, 0) * per; let u = 0; Q = [];
      for (let r = 0; r < per; r++) d.bp.forEach((x, i) => { Q.push({k: ks[i], u0: u, u1: u + x / T}); u += x / T; });
    }
    else {
      const N = 240, ks = [];
      const drv = !!stage.seek; if (drv && stage.virt) stage.virt(true);   // read without drawing
      for (let i = 0; i < N; i++){ stage.at(i / N); ks.push(stage.breath().phase); }
      if (drv){ stage.at(null); stage.virt(false); if (stage.drive) stage.drive(false); }
      Q = []; ks.forEach((k, i) => { const l = Q[Q.length - 1]; if (l && l.k === k) l.u1 = (i + 1) / N; else Q.push({k, u0: i / N, u1: (i + 1) / N}); });
      if (Q.length > 1 && Q[0].k === Q[Q.length - 1].k){ const z = Q.pop(); Q[0].u0 = z.u0 - 1; }
    }
  } catch(e){ Q = null; }
  return (L.Q[key] = Q && Q.length ? Q : null);
}
function warp(P, Q, tau, dur){
  const lin = dur > 0 ? ((tau % dur) + dur) % dur / dur : 0;
  if (!P || !P.length || !Q){ return {u: lin, phase: '', x: 0, i: -1}; }
  let t = ((tau % dur) + dur) % dur, i = 0; while (i < P.length - 1 && t >= P[i].d){ t -= P[i].d; i++; }
  const x = Math.max(0, Math.min(1, t / P[i].d));
  // Line the kinds up: the first rotation of Q whose kinds repeat along P.
  const n = Q.length; let rot = -1;
  if (P.length % n === 0) for (let r = 0; r < n && rot < 0; r++) if (P.every((p, j) => p.k === Q[(j + r) % n].k)) rot = r;
  if (rot < 0) return {u: lin, phase: P[i].k, x, i};
  const q = Q[(i + rot) % n], u = q.u0 + x * (q.u1 - q.u0);
  return {u: ((u % 1) + 1) % 1, phase: P[i].k, x, i};
}
// Own pace: a pattern marked own (walking, carries, stepping) keeps its own loop when the SVG figure is not on a counted
// plan (no data-dur), and the walking gaits always do, whatever the plan.
function ownPace(id, svg){ const d = moveDef(id); if (!d || !d.own) return false; return !!d.gait || !svg.hasAttribute('data-dur'); }
// The key pose shown when the figure holds still (reduced motion, a rest): the middle of a held top, else the end of
// the first move (the bottom of a squat or a push-up, the reach of a bird dog).
function keyU(Q){ if (!Q) return 0; const h = Q.find(q => q.k === 'hold'); return h ? (((h.u0 + h.u1) / 2) % 1 + 1) % 1 : ((Q[0].u1 - .02) % 1 + 1) % 1; }

// ---------- form guides: thin gold ink lines and a few lettered words on the body at the key moment ----------
// From the move's own data when it has one (guide: {when, lines, labels}, see the BLD 897 notes), else the round 4 set.
const GUIDES = {
  squat: {when: 'mid', lines: [['v', 'lowerleg01.R', 'foot.R'], ['l', 'root', 'spine01'], ['tick', 'foot.R']], labels: [['lowerleg01.R', 'knees over toes', 1], ['spine01', 'chest tall', -1]]},
  'push-up': {when: 'always', lines: [['l', 'foot.R', 'upperarm01.R', .12]], labels: [['root', 'one long line', -1]]},
  'weighted-bridge': {when: 'hold', lines: [['l', 'lowerleg01.R', 'upperarm01.R']], labels: [['root', 'knees to shoulders in one line', -1]]},
  'bird-dog': {when: 'hold', lines: [['reach']], labels: [['root', 'hips level, reach long', -1]]},
  'leg-swing': {when: 'always', lines: [['v', 'head', 'foot.L']], labels: [['spine01', 'stand tall', 1]]},
  'reach-hold': {when: 'in out', lines: [['v', 'head', 'foot.L']], labels: [['neck01', 'shoulders soft', 1]]}
};
const JOINTS = ['root', 'spine01', 'neck01', 'head', 'upperarm01.R', 'upperarm01.L', 'lowerleg01.R', 'lowerleg01.L', 'foot.R', 'foot.L', 'wrist.R', 'wrist.L'];
let INK = '#3a2414', HALO = 'rgba(255,246,226,.85)', GOLD = '#b9781c';
const wob = (x, y, s) => Math.sin(x * .07 + y * .05 + s) * .8;
function stroke(g, pts, k, dash){
  const path = () => { g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x + wob(x, y, 1), y + wob(y, x, 2)) : g.moveTo(x, y)); };
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round'; g.setLineDash(dash || [7, 6]);
  g.globalAlpha = k * .7; g.strokeStyle = HALO; g.lineWidth = 5; path(); g.stroke();
  g.globalAlpha = k * .95; g.strokeStyle = GOLD; g.lineWidth = 2; path(); g.stroke(); g.restore();
}
function label(g, p, t, k, side, w){
  g.save(); g.font = 'italic 700 16px "Cormorant Garamond", Georgia, serif';
  const tw = g.measureText(t).width; let x = p[0] + side * 64; const y = p[1] - 10;
  if (side > 0) x = Math.min(x, w - tw - 8); else x = Math.max(x, tw + 8);
  g.globalAlpha = k * .6; g.strokeStyle = GOLD; g.lineWidth = 1; g.setLineDash([2, 3]); g.beginPath(); g.moveTo(p[0] + side * 6, p[1] - 2); g.lineTo(x - side * 4, y + 3); g.stroke();
  g.globalAlpha = k; g.textAlign = side > 0 ? 'left' : 'right'; g.lineJoin = 'round';
  g.strokeStyle = HALO; g.lineWidth = 5; g.setLineDash([]); g.strokeText(t, x, y); g.fillStyle = INK; g.fillText(t, x, y); g.restore();
}
function guideOf(id){ const d = moveDef(id); return d && Array.isArray(d.form) && d.form.length ? null : GUIDES[id] || null; }
// The move's own form guides (its form list, eased in and out by the engine at their moments), mirrored with the figure.
// BLD 900 (phone speed): the canvas box and the boxes the words keep clear of are read every 30 frames (and after a
// resize or a new stage), not every frame, and a frame with no guide showing, after one with none, draws nothing.
function drawForms(){
  const c = L.gc, g = c.getContext('2d'), d = Math.min(2, window.devicePixelRatio || 1);
  let list = []; try { list = (reduced() && L.stage.formsAll ? L.stage.formsAll() : L.stage.forms()) || []; } catch(e){}
  if (!list.length && !L.gDrawn) return false;
  if (!L.gr || L.gn-- <= 0 || L.gr.box !== L.box){
    const r = c.getBoundingClientRect(), avoid = [];
    // The words keep clear of the tree, the count and its chips, the side chip, and the progress line.
    if (L.box) L.box.querySelectorAll('.ggs-breath, .ggs-hud, .ggs-side:not([hidden]), .ggs-prog').forEach(e => { const b = e.getBoundingClientRect(); if (b.width) avoid.push({x: b.left - r.left - 4, y: b.top - r.top - 4, w: b.width + 8, h: b.height + 8}); });
    L.gr = {w: r.width, h: r.height, avoid, box: L.box}; L.gn = 30;
  }
  const R = L.gr, w = Math.round(R.w * d), h = Math.round(R.h * d);
  if (c.width !== w || c.height !== h){ c.width = w; c.height = h; }
  g.setTransform(d, 0, 0, d, 0, 0); g.clearRect(0, 0, R.w, R.h);
  L.gDrawn = list.length > 0;
  if (!list.length) return false;
  if (reduced()) list.forEach(f => { f.k = 1; });
  if (L.mir){ const m = p => p ? [R.w - p[0], p[1]] : p; list = list.map(f => Object.assign({}, f, {pts: f.pts.map(m), tick: m(f.tick), at: m(f.at), side: -(f.side || 1)})); }
  try { E().drawForms(g, list, {dark: isDark(), avoid: R.avoid, w: R.w, h: R.h}); } catch(e){}
  return list.some(f => f.k > .5);
}
function guideOn(G, ph, x){
  const w = String(G.when || 'always');
  if (w === 'always' || reduced()) return true;
  if (w === 'mid') return (ph === 'in' && x > .55) || (ph === 'out' && x < .45) || ph === 'hold';
  return w.split(/\s+/).includes(ph);
}
function drawGuides(G, show){
  const c = L.gc, g = c.getContext('2d'), r = c.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.round(r.width * d), h = Math.round(r.height * d);
  if (c.width !== w || c.height !== h){ c.width = w; c.height = h; }
  g.setTransform(d, 0, 0, d, 0, 0); g.clearRect(0, 0, r.width, r.height);
  const target = show ? 1 : 0; L.gk += (target - L.gk) * (reduced() ? 1 : .15);
  if (!G || L.gk < .02) return;
  let J; try { J = L.stage.screen(JOINTS); } catch(e){ return; }
  if (L.mir) for (const k in J) J[k] = [r.width - J[k][0], J[k][1]];
  const k = L.gk;
  for (const ln of G.lines || []){
    const [t, a, b, ext] = ln;
    if (t === 'v' && J[a] && J[b]) stroke(g, [[J[a][0], J[a][1] - 12], [J[a][0], J[b][1] + 6]], k);
    else if (t === 'l' && J[a] && J[b]){ const e = ext != null ? ext : .1, dx = J[b][0] - J[a][0], dy = J[b][1] - J[a][1]; stroke(g, [[J[a][0] - dx * e, J[a][1] - dy * e], [J[b][0] + dx * e, J[b][1] + dy * e]], k); }
    else if (t === 'tick' && J[a]){ const p = J[a]; stroke(g, [[p[0] + 10, p[1] - 4], [p[0] + 14, p[1]], [p[0] + 22, p[1] - 10]], k, []); }
    else if (t === 'reach'){ const hd = J['wrist.R'][1] < J['wrist.L'][1] ? J['wrist.R'] : J['wrist.L'], ft = J['foot.L'][1] < J['foot.R'][1] ? J['foot.L'] : J['foot.R'], dx = ft[0] - hd[0], dy = ft[1] - hd[1];
      stroke(g, [[hd[0] - dx * .06, hd[1] - dy * .06], [ft[0] + dx * .06, ft[1] + dy * .06]], k); }
  }
  for (const lb of G.labels || []){ const p = J[lb[0]]; if (p) label(g, p, lb[1], k, (lb[2] || 1) * (L.mir ? -1 : 1), r.width); }
}

// ---------- the painting placed so its floor meets the figure's feet ----------
function setArt(){
  const a = artFor(L.ctx); if (!a){ L.el.classList.remove('g3-art'); return; }
  if (!L.art || L.art.id !== a.id){
    L.art = a; const img = new Image(); img.decoding = 'async'; L.artImg = null;
    img.onload = () => { if (L.art !== a) return; L.artImg = img; if (LUM[a.id] == null) LUM[a.id] = lum(img); L.paint.style.backgroundImage = `url("${img.src}")`; L.el.classList.add('g3-art'); tone(); L.dirty = true; L.place = 0;
      if (!L.stage && L.box){ L.box.classList.add('g3-pre'); placeArt(); } };
    img.onerror = () => { if (L.art !== a) return; MISS[a.id] = true; L.art = null; setArt(); };
    img.src = artUrl(a);
  }
  if (L.stage && L.lit !== a.id){ L.lit = a.id;
    try { L.stage.light(a.light || [-.5, .78]); } catch(e){}
    // A painting with its own mat: the figure uses it, and the drawn mat is hidden.
    try { if (L.stage.props) L.stage.props({mat: !a.mat}); } catch(e){}
  }
  tone();
}
function tone(){
  const a = L.art; if (!a || !L.el) return; const m = LUM[a.id] != null ? LUM[a.id] : .6, t = a.tone != null ? a.tone : .5, dark = isDark();
  const veil = dark ? .5 + .35 * m : Math.max(.12, Math.min(.55, (m - .35) * .9 + t * .2));
  L.el.style.setProperty('--g3-veil', veil.toFixed(3)); L.el.style.setProperty('--g3-sepia', (.25 + .35 * t).toFixed(3));
}
// BLD 899 (Chris: "the guy looks like a miniature in a big world", "front plank he has feet on the wall"): the painting is
// sized so a person standing on its floor line is the figure's own height (scale: a 1.73 m person's height there, as a
// share of the painting's height), its floor line meets the floor under the figure, and its focal point sits under the
// figure. When the painting cannot move far enough (it must always cover the stage), the figure moves instead, as far
// as it can while the whole move stays on the stage. mode 'study': a soft backdrop (blurred, dissolved at the edges)
// and a plain painted floor band under the figure, for a painting with no room for a person.
// The placement for the move shown, read once per move, body, and stage size (the floor under the hips at the start).
function figGeom(W, H){
  const st = L.stage, c = st.camera, key = [L.move, L.art && L.art.id, st.current(), W, H, L.mir ? 1 : 0, c.position.x.toFixed(2), c.position.y.toFixed(2), c.position.z.toFixed(2)].join('|'); if (L.geo && L.geo.key === key) return L.geo;
  const Vc = c.position.constructor, f = st.figs[st.current()], s = f.rig.scale;
  const pr = v => { const p = v.clone().project(c); const x = (p.x * .5 + .5) * W; return [L.mir ? W - x : x, (.5 - p.y * .5) * H]; };
  const r = f.bones.root.getWorldPosition(new Vc()), g = pr(new Vc(r.x, 0, r.z)), t = pr(new Vc(r.x, 1.73 * s, r.z));
  // The whole loop's box on the stage, and the points on the floor (under 3 cm), from 12 poses round the loop.
  let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9; const floor = [];
  try { for (let i = 0; i < 12; i++){ const T = st.track(i / 12); for (const k in T){ const p = pr(new Vc(T[k][0], T[k][1], T[k][2]));
    x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); if (T[k][1] < .03 * s) floor.push(pr(new Vc(T[k][0], 0, T[k][2]))); } } } catch(e){ x0 = g[0] - 60; x1 = g[0] + 60; y0 = t[1]; y1 = g[1]; }
  // The drawn mat (when shown): its four corners on the floor, for the room check (the whole mat on open floor).
  let mat = null;
  try { const sc = st.floor && st.floor.parent; if (sc) sc.traverse(o => { const gp = o.geometry && o.geometry.parameters; if (mat || !o.isMesh || !gp || o.geometry.type !== 'BoxGeometry' || Math.abs(gp.height - .012) > .002 || Math.abs(gp.width - .62) > .01) return;
    let vis = true; for (let q = o; q; q = q.parent) if (q.visible === false) vis = false; if (!vis) return;
    o.updateWorldMatrix(true, false); mat = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([i, j]) => { const v = new Vc(i * gp.width / 2, 0, j * gp.depth / 2).applyMatrix4(o.matrixWorld); v.y = 0; return pr(v); }); }); } catch(e){ mat = null; }
  return (L.geo = {key, fx: g[0], fy: g[1], hp: Math.abs(g[1] - t[1]), box: [x0, y0, x1, y1 + 6], floor, mat});
}
function placeArt(){
  const img = L.artImg, a = L.art; if (!img || !a || !L.box) return;
  const bx = L.el.getBoundingClientRect(); if (!bx.width) return;
  const W = bx.width, H = bx.height, iw = img.naturalWidth, ih = img.naturalHeight, study = a.mode === 'study';
  L.el.classList.toggle('g3-study', study);
  let G; try { G = figGeom(W, H); } catch(e){ G = {fx: W * .45, fy: H * .835, hp: H * .72, box: [W * .3, H * .12, W * .6, H * .84], floor: []}; }
  const cover = Math.max(W / iw, H / ih) * ih * 1.02, fl = a.floor != null ? a.floor : .8, fo = (a.focal || [.5])[0];
  let ph = study || !(a.scale > 0) ? cover * (study ? 1.06 : 1.12) : Math.max(cover, G.hp / a.scale), pw = ph * iw / ih;
  let ox, oy, dx = 0, dy = 0;
  if (!study){
    // BLD 900 (Chris: "on cardio videos he is often standing to the side.. how come he is not standing in the center?"): the
    // figure always stands in the middle of the stage (its move's box centered across). The painting slides so its focal
    // point sits under the figure; when it cannot slide far enough and still cover the stage, it grows a little instead.
    const b = G.box, m = 8, lim = (v, lo, hi) => lo > hi ? (lo + hi) / 2 : Math.max(lo, Math.min(hi, v));
    dx = lim(W / 2 - (b[0] + b[2]) / 2, m - b[0], W - m - b[2]);
    const fx = G.fx + dx, k = Math.max(1, fx / (fo * pw || 1e-6), (W - fx) / ((1 - fo) * pw || 1e-6));
    L.pw0 = pw; L.fxs = fx / W;
    if (k > 1){ pw *= k; ph *= k; }
    ox = fx - fo * pw;
    // Up and down as before: the painting's floor line meets the feet; what the painting cannot do, the figure does.
    oy = Math.min(0, Math.max(H - ph, G.fy - fl * ph));
    dy = lim(oy + fl * ph - G.fy, m - b[1], H - m - b[3]);
    oy = G.fy + dy - fl * ph;
    L.grow = k;
  } else { ox = Math.min(0, Math.max(W - pw, G.fx - fo * pw)); oy = Math.min(0, Math.max(H - ph, G.fy - fl * ph)); L.band.style.top = Math.round(G.fy - Math.min(26, H * .07)) + 'px'; L.grow = 1; }
  const st = L.paint.style; st.backgroundSize = `${pw.toFixed(0)}px ${ph.toFixed(0)}px`; st.backgroundPosition = `${ox.toFixed(0)}px ${oy.toFixed(0)}px`;
  const tf = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`; L.cv.style.transform = tf + (L.mir ? ' scaleX(-1)' : ''); L.gc.style.transform = tf;
  // For the room check (tests): the painting's box, the figure's move box, and its floor points, in painting units (0 to 1).
  const P = (x, y) => [(x + dx - ox) / pw, (y + dy - oy) / ph];
  L.fit = {art: a.id, card: a.card || a.id, mode: a.mode || '', scale: G.hp / ph, want: a.scale || 0, dx, dy, view: [-ox / pw, -oy / ph, (W - ox) / pw, (H - oy) / ph],
    box: P(G.box[0], G.box[1]).concat(P(G.box[2], G.box[3])), floor: G.floor.map(p => P(p[0], p[1])), feet: P(G.fx, G.fy),
    mat: G.mat ? G.mat.map(p => P(p[0], p[1])) : null, cx: ((G.box[0] + G.box[2]) / 2 + dx) / W, grow: L.grow || 1, vw: W / (L.pw0 || pw), fxs: L.fxs || .5};
}

// ---------- each frame ----------
function master(){ const b = L.box; return b && b.isConnected ? b.querySelector('svg.gg-move') : null; }
function frame(){
  L.raf = 0; if (!L.box || !L.box.isConnected || !L.stage || document.hidden) return;
  const svg = master(); if (!svg){ detach(); return; }
  const sd = L.force && has(L.force) ? {id: L.force, pair: true} : sided(pick3d(svg.getAttribute('data-move'))), id = sd.id, st = L.stage;
  if (id !== L.move){ if (!has(id)){ unhide(); return; } st.move(id); L.move = id; L.dirty = true; L.place = 0; L.gk = 0; }
  const dk = isDark(); if (dk !== L.dark){ L.dark = dk; st.theme(dk); setInk(); tone(); L.dirty = true; }
  const bp = bodyPref(); if (bp !== L.body){ L.body = bp; Promise.resolve(st.body(bp)).then(() => { L.dirty = true; L.place = 0; kick(); }).catch(() => {}); }
  const mir = !sd.pair && svg.classList.contains('gg-flip'); if (mir !== L.mir){ L.mir = mir; L.place = 0; L.cv.style.transform = (L.cv.style.transform || '').replace(/ ?scaleX\(-1\)/, '') + (mir ? ' scaleX(-1)' : ''); }
  const Q = probe(st, id), anim = svg.querySelector('animate');
  let dur = +svg.getAttribute('data-dur') || 0, tau = 0, w;
  L.still = !anim;
  if (!anim){ w = {u: keyU(Q), phase: 'hold', x: 0}; dur = 0; }
  else if (ownPace(id, svg)){
    // BLD 899 (Chris: "he is walking way too fast"): a walk, a carry, or another move with its own pace keeps its own
    // natural loop (the pattern's tempo times its reps), never the SVG figure's loop or the workout tempo. Its time
    // runs while the SVG figure runs and holds while it is paused.
    const d = moveDef(id), loop = d ? (+d.tempo || 3) * (d.reps || (d.alt ? 2 : 1)) : 4, now = performance.now();
    let held = false; try { held = svg.animationsPaused(); } catch(e){}
    if (L.ownId !== id){ L.ownId = id; L.ownT = 0; L.ownAt = now; }
    if (!held) L.ownT += Math.min(1, Math.max(0, (now - L.ownAt) / 1000));   // (a long gap, a hidden tab, adds at most a second)
    L.ownAt = now; dur = loop; tau = L.ownT;
    w = {u: (L.ownT / loop) % 1, phase: '', x: 0};
  } else {
    if (!dur) dur = parseFloat(anim.getAttribute('dur')) || 2.6;
    try { tau = svg.getCurrentTime(); } catch(e){ tau = 0; }
    w = warp(parsePh(svg.getAttribute('data-ph')), Q, tau, dur);
  }
  let wall = Date.now(); try { if (document.timeline && performance.timeOrigin) wall = performance.timeOrigin + document.timeline.currentTime; } catch(e){}
  L.st = {on: true, at: Date.now(), wall, move: id, tau: dur ? ((tau % dur) + dur) % dur : 0, dur, u: w.u, phase: w.phase, body: st.current(), art: L.art ? L.art.id : '', mirrored: L.mir};
  const drive = st.seek && !reduced();
  if (drive || L.dirty || L.last == null || Math.abs(w.u - L.last) > 1e-5){
    if (drive) st.seek(w.u, {t: performance.now()}); else { st.at(w.u); if (st.draw) st.draw(); }
    L.last = w.u; L.dirty = false; L.frames++;
    // The 3D move's own breath at the pose shown (from its keys; a breath pattern move, from its pattern at that point).
    try { const d = moveDef(id), q = d && Array.isArray(d.bp) && Q ? Q.find(z => w.u >= ((z.u0 % 1) + 1) % 1 && w.u < z.u1) : null; L.bph = q ? q.k : d && Array.isArray(d.bp) ? '' : st.breath().phase; } catch(e){ L.bph = ''; }
    if (!L.box.classList.contains('g3-on')){ const b = L.box; if (b.classList.contains('g3-pre')){ L.el.classList.add('g3-settle'); setTimeout(() => { if (L.el) L.el.classList.remove('g3-settle'); }, 900); } b.classList.add('g3-on'); }
  }
  L.st.bphase = L.bph || '';
  const G = guideOf(id);
  if (!G && L.stage.forms && E().drawForms) L.st.guide = drawForms();
  else { drawGuides(G, G && guideOn(G, w.phase, w.x)); L.st.guide = L.gk > .5; }
  if (L.place-- <= 0){ placeArt(); L.place = 30; }
  L.raf = requestAnimationFrame(frame);
}
function kick(){ if (!L.raf && L.box) L.raf = requestAnimationFrame(frame); }
function setInk(){ const d = isDark(); INK = d ? '#f6e4c2' : '#3a2414'; HALO = d ? 'rgba(30,22,15,.8)' : 'rgba(255,246,226,.85)'; GOLD = d ? '#f0b850' : '#b9781c'; }
function unhide(){ if (L.box) L.box.classList.remove('g3-on', 'g3-want', 'g3-pre', 'g3-wait'); if (L.el && L.el.parentNode) L.el.remove(); L.st = {on: false}; }
function detach(){ if (L.raf) cancelAnimationFrame(L.raf); L.raf = 0; unhide(); L.box = null; L.want = false; }
// The simple figure shows at once wherever 3D will not draw it (health.js held it back with its calm placeholder, g3-wait).
function unwait(){ document.querySelectorAll('.hj-stagebox.g3-wait, .hj-stagebox.g3-pre').forEach(b => b.classList.remove('g3-wait', 'g3-pre')); }
// BLD 900: while the engine loads, the layer joins the stage with the painting only (no figure yet; health.js holds a calm
// placeholder on the stage), so the first screen goes from the painting to the 3D figure, never through the simple figure.
function prePaint(box){
  mapP().then(() => { if (!MAP || F.ready || F.failed || !L.want || !box.isConnected || !ok()) return;
    const host = box.querySelector('.ggs') || box, el = layer();
    if (el.parentNode !== host) host.insertBefore(el, host.firstChild ? host.firstChild.nextSibling : null);
    L.box = box; setArt(); if (L.artImg){ box.classList.add('g3-pre'); placeArt(); } });
}

// The stage of the open player (the one holding a GGMoves figure), after each draw.
function sync(ctx){
  if (ctx) L.ctx = ctx;
  const box = Array.from(document.querySelectorAll('.hj-stagebox')).find(b => b.querySelector('svg.gg-move') && b.getClientRects().length);
  if (!box || !ok()){ detach(); unwait(); return; }
  L.want = true;
  if (!F.ready){ box.classList.add('g3-want'); prePaint(box); load().then(() => { if (!L.want) return; if (F.ready) sync(); else { detach(); unwait(); } }); return; }
  const svg = box.querySelector('svg.gg-move');
  // The canvas is placed first (the engine sizes itself from it), then the stage is made once.
  const host = box.querySelector('.ggs') || box, el = layer();
  if (el.parentNode !== host) host.insertBefore(el, host.firstChild ? host.firstChild.nextSibling : null);
  try { makeStage(svg.getAttribute('data-move')); } catch(e){ F.failed = true; console.warn('GGFig3D: the simple figure stays (' + (e && e.message) + ')'); detach(); unwait(); return; }
  // A move with no 3D form yet keeps its SVG figure, on the same taller stage so the player's size holds steady.
  const id = pick3d(svg.getAttribute('data-move'));
  if (!has(id)){ detach(); unwait(); box.classList.add('g3-want'); return; }
  box.classList.add('g3-want');
  if (L.box !== box){ L.box = box; L.dirty = true; L.place = 0; if (L.frames) box.classList.add('g3-on'); }
  setInk(); setArt();
  if (L.raf){ cancelAnimationFrame(L.raf); L.raf = 0; }
  frame();
}
document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(); });
addEventListener('resize', () => { L.dirty = true; L.place = 0; L.gr = null; kick(); });

// ---------- the stylesheet ----------
const D1 = ':root[data-theme="dark"]', D2 = ':root:not([data-theme="light"])';
const dk = r => `${r.replace(/&/g, D1)}\n@media (prefers-color-scheme: dark){${r.replace(/&/g, D2)}}`;
const CSS = `
.hj-stagebox.g3-want .ggs{--H:clamp(300px,92vw,440px);}
.g3{position:absolute;inset:0;z-index:1;pointer-events:none;overflow:hidden;border-radius:inherit;}
.g3-paint{position:absolute;inset:0;background:#e8d5ad no-repeat;filter:sepia(var(--g3-sepia,.4)) saturate(.85) contrast(.96);opacity:0;transition:opacity .5s;}
.g3.g3-art .g3-paint{opacity:1;}
.g3-paint::after{content:"";position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 55%,rgba(255,244,222,0) 40%,rgba(80,50,20,.28));}
.g3-veil{position:absolute;inset:0;background:#f6ead2;opacity:var(--g3-veil,.3);}
.g3-fig,.g3-guides{position:absolute;inset:0;width:100%;height:100%;display:block;}
.g3-band{position:absolute;left:0;right:0;bottom:0;top:80%;display:none;background:linear-gradient(180deg,rgba(214,186,140,0),rgba(214,186,140,.92) 22px,#cfae7c);}
.g3.g3-study .g3-band{display:block;}
.g3.g3-study .g3-paint{filter:sepia(var(--g3-sepia,.4)) saturate(.7) contrast(.9) blur(5px);transform:scale(1.04);-webkit-mask-image:radial-gradient(120% 95% at 50% 40%,#000 45%,transparent 100%);mask-image:radial-gradient(120% 95% at 50% 40%,#000 45%,transparent 100%);}
.hj-stagebox.g3-on .ggs-fig,.hj-stagebox.g3-pre .ggs-fig{opacity:0;}
.hj-stagebox.g3-on .ggs-sky,.hj-stagebox.g3-on .ggs-deck,.hj-stagebox.g3-on .ggs-tint,.hj-stagebox.g3-on .ggs-scrim,
.hj-stagebox.g3-pre .ggs-sky,.hj-stagebox.g3-pre .ggs-deck,.hj-stagebox.g3-pre .ggs-tint,.hj-stagebox.g3-pre .ggs-scrim{visibility:hidden;}
.hj-stagebox.g3-on .ggs::after,.hj-stagebox.g3-pre .ggs::after{box-shadow:none;}
.hj-stagebox:not(.g3-on) .g3-fig,.hj-stagebox:not(.g3-on) .g3-guides{opacity:0;}
.g3-fig,.g3-guides{transition:opacity .45s ease;}
/* BLD 900 (phone speed): while the 3D figure moves, the page around it uses plain fills in place of live blurs and filters
   (each blur over a moving canvas is redrawn every frame). The painting behind the player holds still. */
@media (max-width: 700px), (pointer: coarse){
.hj-ov:has(.hj-stagebox.g3-on) .hj-paint img{animation:none;filter:none;}
.hj-ov:has(.hj-stagebox.g3-on) .hj-ovtop{-webkit-backdrop-filter:none;backdrop-filter:none;background:color-mix(in srgb,var(--bg) 92%,transparent);}
.hj-ov:has(.hj-stagebox.g3-on) .hj-ovb{-webkit-backdrop-filter:none;backdrop-filter:none;background:color-mix(in srgb,var(--bg) 94%,transparent);}
.hj-stagebox.g3-on .ggs-breath{-webkit-backdrop-filter:none;backdrop-filter:none;}
.hj-stagebox.g3-on .g3-paint{filter:none;}
}
.g3.g3-settle .g3-paint{transition:opacity .5s,background-size .7s ease,background-position .7s ease;}
@media (prefers-reduced-motion: reduce){.g3-fig,.g3-guides,.g3-paint,.g3.g3-settle .g3-paint{transition:none;}}
.hj-stagebox.g3-on .ggs-rest .g3-fig,.hj-stagebox.g3-on .ggs-next .g3-fig{opacity:.62;}
${dk('& .g3-veil{background:#120c08;}& .g3-paint{background-color:#2a2018;}& .g3-band{background:linear-gradient(180deg,rgba(58,42,28,0),rgba(58,42,28,.92) 22px,#3a2a1c);}')}
`;
(function(){ try { if (document.getElementById('g3-css')) return; const s = document.createElement('style'); s.id = 'g3-css'; s.textContent = CSS; (document.head || document.documentElement).appendChild(s); } catch(e){} })();

window.GGFig3D = {sync, detach, ok, able, load, artFor, has: id => F.ready && L.stage ? has(id) : null,
  body: bodyPref, setBody(b){ if (b === 'man' || b === 'woman'){ ls.set('gg-fig-body', b); L.dirty = true; kick(); } },
  state(){ return Object.assign({ready: F.ready, failed: F.failed, frames: L.frames, lite: L.stage && L.stage.mode ? L.stage.mode().lite : null}, L.st, {fit: L.fit || null}); },
  // For tests (the room check): show this 3D pattern and this painting whatever the step is; null to go back.
  probe(id, art, exact){ L.force = id || null; L.ctx = Object.assign({}, L.ctx, {art: art || undefined, exact: !!(art && exact)}); L.geo = null; L.place = 0; L.dirty = true; if (L.box){ setArt(); kick(); } },
  profileBody: null, version: V};
})();
