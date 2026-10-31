// =====================================================================
// GROUNDED FIELD GUIDE (TM): Moves, the animated figures of the Tending workout player (GWG BLD 841, color and new moves BLD 857).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// A simple rounded line figure shows each move on screen while the voice coaches.
//   GGMoves.svg(pattern, opts): an inline SVG string, 240 by 240, looping with SMIL.
//     opts: {size: px (default 160), still: true for one held pose, pose: a key pose number to hold,
//       flip: true to mirror the figure and its gear (the left side), label: the spoken name, speed: 1 is the
//       pattern's own pace, 2 twice as fast; BLD 896: tempo: seconds of one counted rep, so the loop matches the
//       voice count (one rep, or two for a pattern that works one side then the other), per: reps in one loop to set
//       that outright, hold: the share of each rep held at the top pose (0.4 by default where a pattern has one)}.
//   GGMoves.fig: the same as svg. GGMoves.loop(pattern, opts): {id, rep, per, dur, hold} for a tempo, or null.
//   GGMoves.sync(root, rep): restart every tempo figure in root (an svg, an element, or the document) on a counted rep.
//   GGMoves.restart(svgElement, {rep, alt}): the same for one figure (the player calls it on each counted rep).
//   GGMoves.refine(fig, name): a general fig gives way to a named BLD 896 figure (Leg Swings, Push-Up on Handles).
//     Colors come from CSS custom properties, each falling back to currentColor, so a plain page shows one
//     theme color and GGStage (stage.js) dresses the figure: --ggm-ink (body), --ggm-far (far limbs opacity),
//     --ggm-gear and --ggm-gear-op (bench, bar, step), --ggm-db and --ggm-steel (dumbbell plates and handle),
//     --ggm-mat and --ggm-mat-op, --ggm-ground-op (the floor line), --ggm-shadow and --ggm-shadow-op.
//     prefers-reduced-motion, or still: true, gives one held middle pose.
//     A player can pause a figure with svgElement.pauseAnimations() and go on with unpauseAnimations().
//   GGMoves.patterns: every pattern id.
//   GGMoves.of(nameOrId): the best pattern for an exercise name or item id, by keywords; "standing" by default.
//   GGMoves.pick(fig, name): a step's own pattern, unless it is a plain standing or seat and the name fits better.
// How it draws: each pattern is a few key poses written as joint angles (0 points down, 90 forward,
// 180 up, minus 90 back). The player eases between them, works out every joint, and keeps planted hands
// and feet in place with a two bone reach. Side view faces right, with the far arm and leg drawn soft.
// =====================================================================
(function(){
'use strict';

const L = {s1: 26, s2: 26, nk: 4, hr: 12.5, ua: 29, fa: 27, th: 40, sh: 40, ft: 12};
const RAD = Math.PI / 180;
const dir = (a, l) => [Math.sin(a * RAD) * l, Math.cos(a * RAD) * l];
const add = (p, a, l) => { const d = dir(a, l); return [p[0] + d[0], p[1] + d[1]]; };
const ang = (p, q) => Math.atan2(q[0] - p[0], q[1] - p[1]) / RAD;
const cross = (s, e, t) => (e[0] - s[0]) * (t[1] - s[1]) - (e[1] - s[1]) * (t[0] - s[0]);
const ANG = ['t', 'ra', 'la', 'rl', 'll'];

// Two bone reach from root s toward target t; sg picks the bend side (the sign of the cross product).
function reach(s, t, a, b, sg){
  const d = Math.max(Math.abs(a - b) + 0.5, Math.min(a + b - 0.5, Math.hypot(t[0] - s[0], t[1] - s[1])));
  const al = Math.acos(Math.max(-1, Math.min(1, (a * a + d * d - b * b) / (2 * a * d)))) / RAD, base = ang(s, t);
  let e = add(s, base + al, a);
  if (Math.sign(cross(s, e, t)) !== sg) e = add(s, base - al, a);
  return [e, add(e, ang(e, t), b)];
}

// Base poses: side (s), front standing (f), front seated with legs crossed (x).
const BASE = {
  s: {t: [180, 180], h: null, ra: [6, 16], la: [-4, 8], rl: [0, 0, 90], ll: [0, 0, 90], sw: 0, hw: 0, so: 7, s: 1, fl: 1},
  f: {t: [180, 180], h: null, ra: [9, 5], la: [9, 5], rl: [3, 0, 90], ll: [3, 0, 90], sw: 15, hw: 9, so: 7, s: 1, fl: 0.6, kz: [1, 1, 1, 1]},
  x: {t: [180, 180], h: null, ra: [28, 34], la: [28, 34], rl: [76, -97, -90], ll: [76, -97, -90], sw: 15, hw: 9, so: 7, s: 1, fl: 0.6}
};
const ANCH = {s: ['rA', 122, 206], f: ['hip', 120, 126], x: ['hip', 120, 194]};

// Forward reach for one pose: every joint, before the anchor and planted limbs.
function fk(p, front, nm){
  const J = {hip: [0, 0]}, sc = p.s;
  J.mid = add(J.hip, p.t[0], L.s1 * sc); J.neck = add(J.mid, p.t[1], L.s2 * sc);
  J.sh = add(J.neck, p.t[1] + 180, p.so);
  J.head = add(J.neck, p.h == null ? p.t[1] : p.h, L.nk + L.hr);
  const pu = front ? [-Math.cos(p.t[1] * RAD), Math.sin(p.t[1] * RAD)] : [0, 0];
  const pl = front ? [-Math.cos(p.t[0] * RAD), Math.sin(p.t[0] * RAD)] : [0, 0];
  for (const k of ['r', 'l']){
    const g = k === 'r' ? 1 : -1, m = a => front && !nm && k === 'l' ? -a : a;
    const A = p[k + 'a'], G = p[k + 'l'];
    J[k + 'S'] = [J.sh[0] + pu[0] * p.sw * g, J.sh[1] + pu[1] * p.sw * g];
    J[k + 'E'] = add(J[k + 'S'], m(A[0]), L.ua); J[k + 'H'] = add(J[k + 'E'], m(A[1]), L.fa);
    J[k + 'P'] = [J.hip[0] + pl[0] * p.hw * g, J.hip[1] + pl[1] * p.hw * g];
    const z = p.kz ? p.kz.slice(k === 'r' ? 0 : 2) : [1, 1];
    J[k + 'K'] = add(J[k + 'P'], m(G[0]), L.th * z[0]); J[k + 'A'] = add(J[k + 'K'], m(G[1]), L.sh * z[1]);
    J[k + 'T'] = add(J[k + 'A'], m(G[2]), L.ft * p.fl); J[k + 'f'] = m(G[2]);
  }
  return J;
}

function blend(a, b, u, raw){
  const o = {};
  for (const k in a){
    const x = a[k], y = b[k];
    if (Array.isArray(x)) o[k] = x.map((v, i) => { let d = y[i] - v; if (!raw && ANG.includes(k)) d = ((d % 360) + 540) % 360 - 180; return v + d * u; });
    else if (k === 'h') o[k] = x + (((y - x) % 360 + 540) % 360 - 180) * u;
    else if (typeof x === 'number' && typeof y === 'number') o[k] = x + (y - x) * u;
    else o[k] = u < 0.5 ? x : y;
  }
  return o;
}

const LIMB = {rH: ['rS', 'rE', L.ua, L.fa], lH: ['lS', 'lE', L.ua, L.fa], rA: ['rP', 'rK', L.th, L.sh], lA: ['lP', 'lK', L.th, L.sh]};
const MID = {rH: 'rE', lH: 'lE', rA: 'rK', lA: 'lK'};

// Every joint for one pose, placed on the stage.
function place(P, p, pins){
  const front = P.v !== 's', J = fk(p, front, P.nm), an = P.an || ANCH[P.v];
  const ax = p.ax == null ? an[1] : p.ax, ay = p.ay == null ? an[2] : p.ay, o = J[an[0]];
  const dx = ax - o[0], dy = ay - o[1];
  for (const k in J) if (Array.isArray(J[k])) J[k] = [J[k][0] + dx, J[k][1] + dy];
  if (pins) for (const e in pins){
    const q = pins[e], lb = LIMB[e];
    const t = typeof q.to === 'string' ? [J[q.to][0] + q.dx, J[q.to][1] + q.dy] : q.at;
    const r = reach(J[lb[0]], t, lb[2], lb[3], q.sg);
    J[lb[1]] = r[0]; J[e] = r[1];
    if (e[1] === 'A') J[e[0] + 'T'] = add(J[e], J[e[0] + 'f'], L.ft * p.fl);
  }
  return J;
}

// Planted hands and feet: a fixed point (from the reference pose, or given), or another joint.
function pinsOf(P, ref){
  if (!P.pin) return null;
  const R = place(P, ref, null), out = {};
  for (const e in P.pin){
    const q = P.pin[e];
    if (typeof q[0] === 'string') out[e] = {to: q[0], dx: q[1], dy: q[2], sg: q[3]};
    else if (q.length === 3) out[e] = {at: [q[0], q[1]], sg: q[2]};
    else { const sg = q[0] || Math.sign(cross(R[LIMB[e][0]], R[MID[e]], R[e])) || 1; out[e] = {at: R[e], sg}; }
  }
  return out;
}

const ease = u => 0.5 - 0.5 * Math.cos(Math.PI * u);
const r1 = n => Math.round(n * 10) / 10;

function poses(P){
  const B = BASE[P.v], an = P.an || ANCH[P.v];
  const K = P.k.map(k => { const o = Object.assign({ax: an[1], ay: an[2]}, B, k); for (const a of ANG) if (k[a] && !Array.isArray(k[a])) o[a] = [k[a], k[a]]; if (o.h == null) o.h = o.t[1]; return o; });
  return K;
}

function frames(P, still, pose, hold){
  const K = poses(P), pins = pinsOf(P, P.pr ? Object.assign({}, BASE[P.v], P.pr) : K[0]);
  if (pose != null) return [place(P, K[Math.max(0, Math.min(K.length - 1, pose | 0))], pins)];
  if (still){
    const p = P.sp != null ? (Number.isInteger(P.sp) ? K[P.sp] : blend(K[0], K[1], P.sp)) : blend(K[0], K[1 % K.length], 0.5);
    return [place(P, p, pins)];
  }
  if (hold > 0 && P.top) return held(P, K, pins, hold);
  // Dense frames (about 48 a loop) with an eased curve give a smooth, lively motion; each key pose holds a beat.
  const n = K.length, per = Math.max(12, Math.round(48 / n)), F = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < per; j++){
    const u = j / per, v = P.e === 'lin' ? u : ease(Math.min(1, u * 1.12));
    F.push(place(P, blend(K[i], K[(i + 1) % n], v, P.raw), pins));
  }
  F.push(F[0]);
  return F;
}

// BLD 896: frames that follow a counted rep. Each move eases from one key to the next, then holds that key: a top pose
// shares the hold fraction (about 40 percent of each rep), the other keys rest a short beat, and the moves share the rest.
function held(P, K, pins, hold){
  const n = K.length, N = Math.max(48, 24 * n), top = P.top, rest = 0.04, F = [];
  const hw = K.map((k, i) => top.includes((i + 1) % n) ? Math.min(0.8, hold) / top.length : rest);
  const mw = Math.max(0.1, 1 - hw.reduce((a, b) => a + b, 0)) / n;
  for (let i = 0; i < n; i++){
    const m = Math.max(4, Math.round(mw * N)), h = Math.round(hw[i] * N), to = place(P, K[(i + 1) % n], pins);
    for (let j = 0; j < m; j++) F.push(place(P, blend(K[i], K[(i + 1) % n], ease(j / m), P.raw), pins));
    for (let j = 0; j < h; j++) F.push(to);
  }
  F.push(F[0]);
  return F;
}

const pts = (J, ks) => ks.map(k => r1(J[k][0]) + ',' + r1(J[k][1])).join(' ');
const SEG = {
  ra: ['rS', 'rE', 'rH'], la: ['lS', 'lE', 'lH'], rl: ['rP', 'rK', 'rA', 'rT'], ll: ['lP', 'lK', 'lA', 'lT'],
  sp: ['hip', 'mid', 'neck'], shb: ['lS', 'rS'], hpb: ['lP', 'rP']
};

function anim(F, attr, f, dur){
  if (F.length === 1) return '';
  return `<animate attributeName="${attr}" dur="${dur}s" repeatCount="indefinite" values="${F.map(f).join(';')}"${F.kt ? ` keyTimes="${F.kt.join(';')}"` : ''}/>`;
}

// A dumbbell: a steel handle and two colored plates, carried at a hand.
function dumbbell(F, k, dur, op){
  const at = J => r1(J[k][0]) + ' ' + r1(J[k][1]);
  const mv = F.length === 1 ? '' : `<animateTransform attributeName="transform" type="translate" dur="${dur}s" repeatCount="indefinite" values="${F.map(at).join(';')}"${F.kt ? ` keyTimes="${F.kt.join(';')}"` : ''}/>`;
  return `<g transform="translate(${at(F[0])})"${op ? ' style="opacity:var(--ggm-far,' + op + ')"' : ''}><path d="M-10 0H10" stroke-width="4" style="stroke:var(--ggm-steel,currentColor)"/>` +
    `<g style="color:var(--ggm-db,currentColor)"><rect x="-16" y="-9" width="8" height="18" rx="3" fill="currentColor" stroke="none"/><rect x="8" y="-9" width="8" height="18" rx="3" fill="currentColor" stroke="none"/></g>${mv}</g>`;
}

// Gear, drawn behind the figure: soft in one theme color on a plain page, in its own colors on a GGStage.
const GS = 'style="color:var(--ggm-gear,currentColor);opacity:var(--ggm-gear-op,.38)"';
const G = {
  mat: '<rect x="16" y="209" width="208" height="5" rx="2.5" fill="currentColor" stroke="none" style="color:var(--ggm-mat,currentColor);opacity:var(--ggm-mat-op,.28)"/>',
  bench: (x, y, w) => `<g ${GS}><rect x="${x}" y="${y}" width="${w}" height="9" rx="4.5" fill="currentColor" stroke="none"/><path d="M${x + 10} ${y + 8}V210M${x + w - 10} ${y + 8}V210" stroke-width="5"/><path d="M${x + 3} 211H${x + 17}M${x + w - 17} 211H${x + w - 3}" stroke-width="4"/></g>`,
  box: (x, y, w) => `<g ${GS}><rect x="${x}" y="${y}" width="${w}" height="${212 - y}" rx="4" fill="currentColor" stroke="none" opacity=".55"/><path d="M${x + 2} ${y + 1}H${x + w - 2}" stroke-width="4"/></g>`,
  bar: `<g ${GS}><path d="M30 18H210" stroke-width="6"/><path d="M38 18V211M202 18V211" stroke-width="4" opacity=".6"/><path d="M28 211H48M192 211H212" stroke-width="4" opacity=".6"/></g>`,
  dipbar: `<g ${GS}><path d="M100 124H164" stroke-width="6"/><path d="M158 124V211" stroke-width="4" opacity=".6"/><path d="M146 211H170" stroke-width="4" opacity=".6"/></g>`,
  chair: `<g ${GS}><path d="M70 172H118M70 172L64 108M74 172V211M114 172V211" stroke-width="6"/></g>`,
  couch: '<rect x="34" y="150" width="44" height="62" rx="8" fill="currentColor" stroke="none" style="color:var(--ggm-gear,currentColor);opacity:var(--ggm-gear-op,.2)"/>',
  wall: '<rect x="70" y="30" width="100" height="182" rx="4" fill="currentColor" stroke="none" style="color:var(--ggm-gear,currentColor);opacity:calc(var(--ggm-gear-op,.38) * .4)"/>',
  // An adjustable bench set on an incline: a seat, a back pad at about 45 degrees, and legs.
  incline: (x, y, up) => `<g ${GS}><path d="M${x} ${y}H${x + 46}" stroke-width="9"/><path d="M${x + 2} ${y}L${x + 2 + (up ? 44 : -44)} ${y - 44}" stroke-width="9"/><path d="M${x + 8} ${y + 4}V210M${x + 40} ${y + 4}V210M${x + 8} ${y - 6}L${x + (up ? 26 : -18)} 210" stroke-width="4" opacity=".7"/></g>`
};

// Walking cycle helpers: four keys, near leg forward, passing, far leg forward, passing.
const walk = (y, a) => [
  {ay: y + 2, rl: [24, 6, 96], ll: [-18, -34, 50], ra: [-16 * a, -6 * a], la: [16 * a, 28 * a]},
  {ay: y, rl: [0, 0, 90], ll: [22, -36, 60], ra: [0, 8 * a], la: [0, 8 * a]},
  {ay: y + 2, ll: [24, 6, 96], rl: [-18, -34, 50], la: [-16 * a, -6 * a], ra: [16 * a, 28 * a]},
  {ay: y, ll: [0, 0, 90], rl: [22, -36, 60], ra: [0, 8 * a], la: [0, 8 * a]}
];
const SUP = {t: -90, h: -90};
const KNEES = {rH: [158, 199, -1], lH: [82, 199, 1]};

const P = {
  // Strength
  squat: {v: 's', an: ['rA', 124, 206], k: [{ra: [6, 16], la: [6, 16]}, {t: [146, 150], rl: [80, -30, 90], ll: [80, -30, 90], ra: [92, 90], la: [92, 90]}]},
  'goblet-squat': {v: 's', an: ['rA', 130, 206], db: 'r', bg: G.bench(68, 166, 54),
    k: [{ra: [12, 158], la: [12, 158]}, {t: [148, 152], rl: [80, -30, 90], ll: [80, -30, 90], ra: [-14, 128], la: [-14, 128]}]},
  lunge: {v: 's', an: ['rA', 152, 206], db: 'rl',
    k: [{rl: [30, 30, 90], ll: [-30, -30, 60], ra: [2, 2], la: [-2, -2]}, {rl: [86, -4, 90], ll: [-6, -84, 40], ra: [2, 2], la: [-2, -2]}]},
  'step-up': {v: 's', an: ['rA', 136, 182], bg: G.box(110, 187, 70),
    k: [{t: [168, 170], rl: [70, -10, 90], ll: [-14, -12, 80], ra: [-25, -10], la: [30, 50]}, {rl: [0, 0, 90], ll: [92, 0, 90], ra: [40, 130], la: [-30, -20]}]},
  hinge: {v: 's', an: ['rA', 108, 206], db: 'rl',
    k: [{ra: [0, 0], la: [0, 0]}, {t: [100, 98], h: 104, rl: [18, -6, 90], ll: [18, -6, 90], ra: [0, 0], la: [0, 0]}]},
  'sl-hinge': {v: 's', an: ['rA', 110, 206], db: 'r',
    k: [{ll: [-10, -16, 50], ra: [0, 0], la: [0, 0]}, {t: [98, 96], h: 102, rl: [16, -4, 90], ll: [-84, -84, -2], ra: [0, 0], la: [0, 0]}]},
  bridge: {v: 's', an: ['rA', 174, 206], bg: G.mat,
    k: [Object.assign({rl: [140, 40, 90], ll: [140, 40, 90], ra: [90, 90], la: [90, 90]}, SUP), {t: [-53, -53], h: -96, rl: [100, 14, 90], ll: [100, 14, 90], ra: [92, 92], la: [92, 92]}]},
  press: {v: 'f', db: 'rl', k: [{ra: [78, 178], la: [78, 178]}, {ra: [168, 178], la: [168, 178]}]},
  'bench-press': {v: 's', an: ['hip', 132, 166], db: 'r', bg: G.bench(50, 171, 106),
    k: [Object.assign({rl: [86, -8, 90], ll: [86, -8, 90], ra: [58, 178], la: [58, 178]}, SUP), Object.assign({rl: [86, -8, 90], ll: [86, -8, 90], ra: [178, 180], la: [178, 180]}, SUP)]},
  'push-up': {v: 's', an: ['rT', 30, 208], bg: G.mat, pin: {rH: [-1], lH: [-1]},
    k: [{t: [113, 113], h: 106, rl: [-67, -67, 12], ll: [-67, -67, 12], ra: [0, 0], la: [0, 0]}, {t: [97, 97], h: 96, rl: [-83, -83, 12], ll: [-83, -83, 12]}]},
  row: {v: 's', an: ['rA', 84, 206], db: 'r', bg: G.bench(76, 170, 108),
    k: [{t: [96, 96], h: 102, rl: [12, -6, 90], ll: [2, -88, -90], ra: [2, 2], la: [14, 14]}, {t: [96, 96], h: 102, rl: [12, -6, 90], ll: [2, -88, -90], ra: [-118, 4], la: [14, 14]}]},
  'pull-up': {v: 'f', an: ['neck', 120, 66], bg: G.bar, pin: {rH: [0], lH: [0]},
    k: [{ra: [164, 180], la: [164, 180], rl: [2, 2, 30], ll: [2, 2, 30]}, {ay: 42, rl: [4, 4, 30], ll: [4, 4, 30]}]},
  hang: {v: 'f', an: ['neck', 120, 66], bg: G.bar, d: 3, pin: {rH: [0], lH: [0]},
    k: [{ra: [164, 180], la: [164, 180], rl: [2, 2, 30], ll: [2, 2, 30]}, {ay: 69, ax: 121, rl: [3, 3, 30], ll: [1, 1, 30]}]},
  dip: {v: 's', an: ['neck', 126, 62], bg: G.dipbar, pin: {rH: [-1], lH: [-1]},
    k: [{t: [168, 174], h: 176, ra: [0, 0], la: [0, 0], rl: [2, -96, -150], ll: [8, -90, -150]}, {ay: 88, ax: 138, t: [150, 156], h: 162, rl: [10, -88, -150], ll: [16, -82, -150]}]},
  curl: {v: 's', db: 'rl', k: [{ra: [2, 6], la: [-2, 4]}, {ra: [6, 166], la: [2, 164]}]},
  triceps: {v: 's', db: 'r', k: [{ra: [176, 178], la: [176, 178]}, {ra: [172, -32], la: [172, -32]}]},
  'calf-raise': {v: 's', an: ['rT', 140, 175], bg: G.box(128, 180, 64), k: [{rl: [0, 0, 114], ll: [0, 0, 114]}, {rl: [0, 0, 46], ll: [0, 0, 46]}]},
  carry: {v: 's', an: ['hip', 118, 126], db: 'rl', e: 'lin', d: 2.2, k: walk(126, 0).map(k => Object.assign(k, {ra: [1, 1], la: [-1, -1]}))},
  swing: {v: 's', an: ['rA', 102, 206], db: 'r',
    k: [{t: [116, 112], h: 108, rl: [22, -10, 90], ll: [22, -10, 90], ra: [-30, -24], la: [-30, -24]}, {ra: [98, 96], la: [98, 96]}]},
  // Core and floor
  plank: {v: 's', an: ['rE', 172, 204], bg: G.mat, d: 3,
    k: [{t: [101, 101], h: 108, ra: [0, 90], la: [0, 90], rl: [-79, -79, 0], ll: [-79, -79, 0]}, {t: [103, 103], h: 110, ra: [0, 90], la: [0, 90], rl: [-77, -77, 0], ll: [-77, -77, 0]}]},
  'side-plank': {v: 'f', nm: true, an: ['rE', 154, 204], bg: G.mat,
    k: [{t: [104, 104], h: 112, sw: 11, hw: 8, ra: [0, 90], la: [-76, -76], rl: [-76, -76, -60], ll: [-76, -76, -60], fl: 0.8}, {t: [104, 104], h: 116, sw: 11, hw: 8, ra: [0, 90], la: [180, 180], rl: [-76, -76, -60], ll: [-76, -76, -60], fl: 0.8}]},
  'dead-bug': {v: 's', an: ['hip', 118, 203], bg: G.mat, d: 3,
    k: [Object.assign({ra: [180, 180], la: [180, 180], rl: [180, 90, 180], ll: [180, 90, 180]}, SUP), Object.assign({ra: [-96, -96], la: [180, 180], rl: [180, 90, 180], ll: [96, 96, 140]}, SUP),
      Object.assign({ra: [180, 180], la: [180, 180], rl: [180, 90, 180], ll: [180, 90, 180]}, SUP), Object.assign({ra: [180, 180], la: [-96, -96], rl: [96, 96, 140], ll: [180, 90, 180]}, SUP)]},
  'bird-dog': {v: 's', an: ['hip', 82, 164], bg: G.mat, d: 3,
    k: [{t: [108, 108], h: 100, ra: [0, 0], la: [0, 0], rl: [0, -90, -90], ll: [0, -90, -90]}, {t: [108, 108], h: 100, ra: [98, 98], la: [0, 0], rl: [0, -90, -90], ll: [-96, -96, -96]},
      {t: [108, 108], h: 100, ra: [0, 0], la: [0, 0], rl: [0, -90, -90], ll: [0, -90, -90]}, {t: [108, 108], h: 100, ra: [0, 0], la: [98, 98], rl: [-96, -96, -96], ll: [0, -90, -90]}]},
  'cat-cow': {v: 's', an: ['hip', 82, 164], bg: G.mat, d: 3, pin: {rH: [-1], lH: [-1]}, pr: {t: [108, 108], ra: [0, 0], la: [0, 0], rl: [0, -90, -90], ll: [0, -90, -90]},
    k: [{t: [136, 80], h: 26, ra: [0, 0], la: [0, 0], rl: [0, -90, -90], ll: [0, -90, -90]}, {t: [82, 132], h: 150, ra: [0, 0], la: [0, 0], rl: [0, -90, -90], ll: [0, -90, -90]}]},
  'child-pose': {v: 's', an: ['rK', 126, 204], bg: G.mat, d: 3, sp: 0,
    k: [{t: [84, 78], h: 70, rl: [60, -90, -90], ll: [60, -90, -90], ra: [78, 78], la: [78, 78]}, {t: [90, 80], h: 72, rl: [60, -90, -90], ll: [60, -90, -90], ra: [76, 76], la: [76, 76]}]},
  'hip-flexor': {v: 's', an: ['rK', 98, 204], bg: G.bench(22, 168, 58), d: 3, pin: {lA: [0]},
    k: [{rl: [-10, -150, -92], ll: [88, 0, 90], ra: [36, 44], la: [36, 44]}, {rl: [-34, -150, -92], ll: [88, 0, 90], ra: [42, 50], la: [42, 50]}]},
  'figure-4': {v: 's', an: ['hip', 128, 204], bg: G.mat, d: 3, pin: {lA: ['rK', 3, -7, -1], rH: ['rK', -8, 9, 1], lH: ['rK', -8, 9, 1]},
    k: [Object.assign({rl: [146, 92, 180], ll: [104, 60, 150]}, SUP), Object.assign({rl: [174, 118, 200], ll: [128, 70, 160]}, SUP)]},
  'hip-switch': {v: 'f', nm: true, an: ['hip', 120, 202], d: 3,
    k: [{ra: [34, 34], la: [-34, -34], rl: [150, 30, 90], ll: [-150, -30, -90]},
      {ra: [34, 34], la: [-34, -34], rl: [97, 66, 90], ll: [145, -63, -90], kz: [0.78, 0.25, 0.61, 1.12], t: [180, 176], h: 172},
      {ra: [34, 34], la: [-34, -34], rl: [150, 30, 90], ll: [-150, -30, -90]},
      {ra: [34, 34], la: [-34, -34], rl: [-145, 63, 90], ll: [-97, -66, -90], kz: [0.61, 1.12, 0.78, 0.25], t: [180, 184], h: 188}]},
  // Walking and warming
  walk: {v: 's', an: ['hip', 118, 126], e: 'lin', d: 2.2, k: walk(126, 1)},
  run: {v: 's', an: ['hip', 118, 124], e: 'lin', d: 2,
    k: [{ay: 126, t: [170, 172], rl: [34, 10, 100], ll: [-26, -62, 40], ra: [-40, 50], la: [40, 120]}, {ay: 120, t: [170, 172], rl: [8, -14, 86], ll: [46, -40, 70], ra: [0, 84], la: [0, 84]},
      {ay: 126, t: [170, 172], ll: [34, 10, 100], rl: [-26, -62, 40], la: [-40, 50], ra: [40, 120]}, {ay: 120, t: [170, 172], ll: [8, -14, 86], rl: [46, -40, 70], ra: [0, 84], la: [0, 84]}]},
  march: {v: 's', an: ['hip', 118, 126], d: 2.4,
    k: [{rl: [82, -4, 90], ll: [0, 0, 90], ra: [-30, 40], la: [34, 116]}, {ra: [0, 30], la: [0, 30]}, {ll: [82, -4, 90], rl: [0, 0, 90], la: [-30, 40], ra: [34, 116]}, {ra: [0, 30], la: [0, 30]}]},
  balance: {v: 's', an: ['rA', 120, 206], d: 3,
    k: [{t: [178, 180], ll: [72, -18, 84], ra: [40, 50], la: [36, 46]}, {t: [182, 180], ll: [76, -14, 86], ra: [46, 56], la: [40, 50]}]},
  stretch: {v: 's', an: ['rA', 160, 206], d: 3, sp: 1,
    k: [{t: [110, 104], h: 100, rl: [78, -6, 90], ll: [-58, -58, 20], ra: [2, 2], la: [4, 4]}, {t: [112, 108], h: 150, rl: [78, -6, 90], ll: [-58, -58, 20], ra: [2, 2], la: [178, 180]}]},
  'arm-circles': {v: 's', e: 'lin', d: 2.4,
    k: [{ra: [0, 0], la: [180, 180]}, {ra: [90, 90], la: [270, 270]}, {ra: [180, 180], la: [0, 0]}, {ra: [270, 270], la: [90, 90]}]},
  'arms-up': {v: 'f', d: 3, k: [{ra: [10, 8], la: [10, 8]}, {ra: [172, 178], la: [172, 178]}]},
  'forward-fold': {v: 's', an: ['rA', 126, 206], d: 3,
    k: [{ra: [178, 180], la: [178, 180]}, {t: [60, 34], h: 20, rl: [10, 0, 90], ll: [10, 0, 90], ra: [30, 30], la: [30, 30]}]},
  'side-bend': {v: 'f', nm: true, raw: true, d: 3.2,
    k: [{t: [178, 200], h: 210, ra: [172, 222], la: [-6, -4]}, {t: [182, 160], h: 150, ra: [6, 4], la: [-172, -222]}]},
  standing: {v: 'f', d: 3, k: [{}, {s: 1.035, ra: [13, 8], la: [13, 8]}]},
  // Seated and lying (yoga)
  seat: {v: 's', an: ['hip', 92, 166], bg: G.chair, d: 3,
    k: [{rl: [90, 0, 90], ll: [90, 0, 90], ra: [12, 76], la: [12, 76]}, {s: 1.04, rl: [90, 0, 90], ll: [90, 0, 90], ra: [13, 78], la: [13, 78]}]},
  'spinal-flex': {v: 's', an: ['hip', 92, 166], bg: G.chair, pin: {rH: [128, 158, 1], lH: [128, 158, 1]},
    k: [{t: [162, 172], h: 172, rl: [90, 0, 90], ll: [90, 0, 90]}, {t: [198, 168], h: 146, rl: [90, 0, 90], ll: [90, 0, 90]}]},
  twist: {v: 'x', nm: true, d: 3, sp: 0,
    k: [{t: [180, 184], h: 192, sw: 11, ra: [36, 14], la: [36, 52], ll: [-76, 97, 90]}, {t: [180, 176], h: 168, sw: 11, ra: [-36, -52], la: [-36, -14], ll: [-76, 97, 90]}]},
  'cross-seat': {v: 'x', pin: KNEES, d: 3, k: [{}, {s: 1.035}]},
  breath: {v: 'x', pin: KNEES, d: 3, k: [{}, {s: 1.08, sw: 18}]},
  shrug: {v: 'x', pin: KNEES, d: 2.4, k: [{}, {so: -4}]},
  neck: {v: 'x', pin: KNEES, d: 3, k: [{h: 150}, {h: 210}]},
  'life-nerve': {v: 's', an: ['hip', 58, 202], bg: G.mat, d: 3,
    k: [{rl: [90, 90, 180], ll: [90, 90, 180], ra: [176, 180], la: [176, 180]}, {t: [122, 110], h: 108, rl: [90, 90, 180], ll: [90, 90, 180], ra: [86, 84], la: [86, 84]}]},
  lie: {v: 's', an: ['hip', 126, 204], bg: G.mat, d: 3,
    k: [Object.assign({rl: [90, 90, 180], ll: [90, 90, 180], ra: [86, 86], la: [86, 86]}, SUP), {t: [-95, -84], h: -90, rl: [90, 90, 180], ll: [90, 90, 180], ra: [86, 88], la: [86, 88]}]}
};
// BLD 857: a pattern for every move in sessions A to D, the warm-up, and the cooldown.
const HALF = {rl: [0, -90, -90], ll: [90, 0, 90]};
Object.assign(P, {
  'bench-squat': {v: 's', an: ['rA', 124, 206], bg: G.bench(70, 171, 50),
    k: [{ra: [6, 16], la: [6, 16]}, {t: [146, 150], rl: [80, -30, 90], ll: [80, -30, 90], ra: [92, 90], la: [92, 90]}]},
  'reverse-lunge': {v: 's', an: ['rA', 150, 206], db: 'rl',
    k: [{ra: [2, 2], la: [-2, -2]}, {rl: [86, -4, 90], ll: [-6, -84, 40], ra: [2, 2], la: [-2, -2]}]},
  'ankle-rock': {v: 's', an: ['rA', 150, 206], bg: G.mat, d: 2.8, pin: {lA: [0]},
    k: [{rl: [90, 0, 90], ll: [-10, -90, -90], ra: [66, 70], la: [62, 66]}, {t: [174, 178], rl: [84, -20, 90], ll: [-4, -90, -90], ra: [70, 74], la: [66, 70]}]},
  'hip-thrust': {v: 's', an: ['rA', 176, 206], db: 'r', bg: G.bench(34, 168, 62), pin: {rH: ['hip', 2, -8, 1], lH: ['hip', 2, -8, 1]},
    k: [{t: [-124, -112], h: -104, rl: [136, 22, 90], ll: [136, 22, 90]}, {t: [-92, -94], h: -86, rl: [98, 10, 90], ll: [98, 10, 90]}]},
  'bridge-march': {v: 's', an: ['hip', 125, 174], bg: G.mat, d: 3.2,
    k: [{t: [-53, -53], h: -96, rl: [100, 14, 90], ll: [100, 14, 90], ra: [92, 92], la: [92, 92]}, {t: [-53, -53], h: -96, rl: [158, 62, 140], ll: [100, 14, 90], ra: [92, 92], la: [92, 92]},
      {t: [-53, -53], h: -96, rl: [100, 14, 90], ll: [100, 14, 90], ra: [92, 92], la: [92, 92]}, {t: [-53, -53], h: -96, ll: [158, 62, 140], rl: [100, 14, 90], ra: [92, 92], la: [92, 92]}]},
  'reverse-crunch': {v: 's', an: ['neck', 74, 199], bg: G.mat,
    k: [Object.assign({rl: [160, 84, 170], ll: [160, 84, 170], ra: [90, 90], la: [90, 90]}, SUP), {t: [-64, -86], h: -90, rl: [-140, 70, 150], ll: [-140, 70, 150], ra: [90, 90], la: [90, 90]}]},
  'leg-raise': {v: 's', an: ['hip', 126, 164], bg: G.bench(56, 170, 128),
    k: [Object.assign({rl: [94, 94, 170], ll: [94, 94, 170], ra: [-104, -70], la: [-104, -70]}, SUP), Object.assign({rl: [172, 172, 250], ll: [172, 172, 250], ra: [-104, -70], la: [-104, -70]}, SUP)]},
  'hollow': {v: 's', an: ['hip', 122, 200], bg: G.mat, d: 3,
    k: [{t: [-106, -116], h: -118, ra: [-112, -112], la: [-112, -112], rl: [112, 112, 176], ll: [112, 112, 176]}, {t: [-103, -112], h: -114, ra: [-107, -107], la: [-107, -107], rl: [108, 108, 172], ll: [108, 108, 172]}]},
  'knee-raise': {v: 's', an: ['neck', 120, 62], bg: G.bar, pin: {rH: [0], lH: [0]},
    k: [{ra: [178, 180], la: [178, 180], rl: [2, 0, 40], ll: [2, 0, 40]}, {t: [184, 178], rl: [96, 4, 70], ll: [92, 2, 70]}]},
  'pull-through': {v: 's', an: ['rT', 30, 208], db: 'r', bg: G.mat, d: 3,
    k: [{t: [113, 113], h: 106, rl: [-67, -67, 12], ll: [-67, -67, 12], ra: [0, 0], la: [0, 0]}, {t: [112, 112], h: 104, rl: [-68, -68, 12], ll: [-66, -66, 12], ra: [-34, -30], la: [0, 0]},
      {t: [113, 113], h: 106, rl: [-67, -67, 12], ll: [-67, -67, 12], ra: [0, 0], la: [0, 0]}, {t: [112, 112], h: 104, rl: [-66, -66, 12], ll: [-68, -68, 12], ra: [0, 0], la: [-34, -30]}]},
  'reach-through': {v: 'f', nm: true, an: ['rE', 154, 204], bg: G.mat,
    k: [{t: [104, 104], h: 112, sw: 11, hw: 8, ra: [0, 90], la: [180, 180], rl: [-76, -76, -60], ll: [-76, -76, -60], fl: 0.8},
      {t: [100, 96], h: 96, sw: 11, hw: 8, ra: [0, 90], la: [20, -14], rl: [-76, -76, -60], ll: [-76, -76, -60], fl: 0.8}]},
  'kneel-press': {v: 's', an: ['rK', 108, 204], db: 'r', bg: G.mat,
    k: [Object.assign({ra: [14, 168], la: [26, -40]}, HALF), Object.assign({ra: [176, 180], la: [26, -40]}, HALF)]},
  'push-press': {v: 'f', db: 'rl', d: 2.2,
    k: [{ra: [78, 178], la: [78, 178]}, {ay: 134, kz: [0.8, 1, 0.8, 1], ra: [78, 178], la: [78, 178]}, {ay: 122, ra: [168, 178], la: [168, 178], rl: [3, 0, 60], ll: [3, 0, 60]}, {ra: [170, 178], la: [170, 178]}]},
  'incline-press': {v: 's', an: ['hip', 128, 162], db: 'r', bg: G.incline(126, 170, false),
    k: [{t: [-136, -136], h: -130, rl: [80, 0, 90], ll: [80, 0, 90], ra: [14, 134], la: [14, 134]}, {t: [-136, -136], h: -130, rl: [80, 0, 90], ll: [80, 0, 90], ra: [134, 136], la: [134, 136]}]},
  'chest-row': {v: 's', an: ['hip', 104, 138], db: 'rl', bg: G.incline(92, 156, true),
    k: [{t: [134, 134], h: 120, rl: [-24, -24, 60], ll: [-24, -24, 60], ra: [0, 0], la: [0, 0]}, {t: [134, 134], h: 120, rl: [-24, -24, 60], ll: [-24, -24, 60], ra: [-104, 8], la: [-104, 8]}]},
  'yt-raise': {v: 's', an: ['hip', 104, 138], bg: G.incline(92, 156, true), d: 3.4,
    k: [{t: [134, 134], h: 120, rl: [-24, -24, 60], ll: [-24, -24, 60], ra: [2, 2], la: [2, 2]}, {t: [134, 134], h: 124, rl: [-24, -24, 60], ll: [-24, -24, 60], ra: [146, 146], la: [146, 146]},
      {t: [134, 134], h: 120, rl: [-24, -24, 60], ll: [-24, -24, 60], ra: [2, 2], la: [2, 2]}, {t: [134, 134], h: 122, rl: [-24, -24, 60], ll: [-24, -24, 60], ra: [96, 96], la: [96, 96]}]},
  suitcase: {v: 's', an: ['hip', 118, 126], db: 'r', e: 'lin', d: 2.2, k: walk(126, 0).map(k => Object.assign(k, {t: [181, 182], ra: [1, 1], la: [-1, -1]}))},
  'fast-push-up': {v: 's', an: ['rT', 30, 208], bg: G.mat, pin: {rH: [-1], lH: [-1]}, d: 1.4,
    k: [{t: [113, 113], h: 106, rl: [-67, -67, 12], ll: [-67, -67, 12], ra: [0, 0], la: [0, 0]}, {t: [97, 97], h: 96, rl: [-83, -83, 12], ll: [-83, -83, 12]}]},
  'wall-slide': {v: 'f', bg: G.wall, d: 3.2, k: [{ra: [104, 176], la: [104, 176]}, {ra: [158, 172], la: [158, 172]}]}
});
// BLD 892: cardio, agility, and floor figures. A key may give an "at" list of target points
// ({rA: [x, y, bend, foot], rH: [x, y, bend]}): solve() turns each into joint angles with the two bone
// reach, so feet land on the floor and hands meet a point. bend is the side of the knee or elbow
// (1 bends toward the right of the stage for a leg that hangs down). mir() mirrors a front view key.
const MIR = {ra: 'la', la: 'ra', rl: 'll', ll: 'rl', rA: 'lA', lA: 'rA', rH: 'lH', lH: 'rH'};
function mir(k){
  const o = {};
  for (const n in k){
    const v = k[n];
    if (n === 'at'){ o.at = {}; for (const e in v){ const q = v[e]; o.at[MIR[e]] = [240 - q[0], q[1], -q[2]].concat(q.length > 3 ? [-q[3]] : []); } }
    else if (MIR[n]) o[MIR[n]] = Array.isArray(v) ? v.map(a => -a) : -v;
    else if (n === 't') o.t = v.map(a => 360 - a);
    else if (n === 'h') o.h = 360 - v;
    else if (n === 'ax') o.ax = 240 - v;
    else o[n] = v;
  }
  return o;
}
function solve(M){
  M.k = M.k.map(k => {
    if (!k.at) return k;
    const o = Object.assign({}, k), at = o.at; delete o.at;
    const J = place(M, poses(Object.assign({}, M, {k: [o]}))[0], null);
    for (const e in at){
      const q = typeof at[e] === 'function' ? at[e](J) : at[e], lb = LIMB[e], r = reach(J[lb[0]], [q[0], q[1]], lb[2], lb[3], q[2]);
      const a = [ang(J[lb[0]], r[0]), ang(r[0], r[1])].map(r1), nm = e[0] + (e[1] === 'H' ? 'a' : 'l');
      if (e[1] === 'A') a.push(q.length > 3 ? q[3] : M.v !== 's' && e[0] === 'l' && M.nm ? -90 : 90);
      o[nm] = M.v !== 's' && !M.nm && e[0] === 'l' ? a.map(x => -x) : a;
    }
    return o;
  });
  return M;
}
// A stationary bike: saddle, frame, flywheel, crank, and handlebar, drawn as gear.
G.bike = `<g ${GS}><rect x="84" y="128" width="32" height="7" rx="3.5" fill="currentColor" stroke="none"/>` +
  '<path d="M102 134L124 182L170 190M166 192L158 104M150 102L170 100M124 182L106 210M170 190L180 210M94 210H118M166 210H194" stroke-width="6"/>' +
  '<circle cx="172" cy="186" r="18" stroke-width="5"/><circle cx="128" cy="182" r="5" fill="currentColor" stroke="none"/></g>';
const BIKE = {c: [128, 182], r: 15};
const pedal = a => [r1(BIKE.c[0] + BIKE.r * Math.sin(a * RAD)), r1(BIKE.c[1] - BIKE.r * Math.cos(a * RAD))];
const WO = {hand: [146, 205]};
const woStand = {ax: 100, ay: 126};
const woSquat = {ax: 88, ay: 172, t: [112, 108], h: 100, at: {rA: [100, 206, 1, 90], lA: [100, 206, 1, 90], rH: WO.hand.concat(-1), lH: WO.hand.concat(-1)}};
const woOne = (b, f) => ({ax: 112, ay: 162, t: [106, 106], h: 100, at: {[b + 'A']: [56, 200, 1, 24], [f + 'A']: [100, 206, 1, 90], rH: WO.hand.concat(-1), lH: WO.hand.concat(-1)}});
const woPlank = y => ({ax: 113, ay: y, t: [113, 113], h: 106, at: {rA: [40, 198, 1, 12], lA: [40, 198, 1, 12], rH: WO.hand.concat(-1), lH: WO.hand.concat(-1)}});
// Front view travel helpers: hip x, then right and left ankle x, at a hip height y.
const ft = (hx, y, rx, lx, ry, ly, rf, lf) => ({ax: hx, ay: y, at: {rA: [rx, ry || 206, 1, rf == null ? 90 : rf], lA: [lx, ly || 206, -1, lf == null ? -90 : lf]}});
const READY = {ra: [24, 4], la: [-24, -4]};
const skA = {ax: 140, ay: 140, t: [178, 172], h: 170, ra: [64, 36], at: {rA: [152, 206, 1, 90], lA: [168, 202, -1, 10], lH: [150, 176, 1]}};
const gv = [ft(92, 128, 100, 84), ft(104, 128, 124, 84), ft(116, 129, 122, 134, 206, 202, 90, -20), ft(132, 128, 148, 130, 206, 204)];
const GVA = [{ra: [14, 8], la: [-26, -16]}, {ra: [26, 16], la: [-14, -8]}];
const BX = (hx, hy, rx, ry, lx, ly, rf, lf, sw) => ({ax: hx, ay: hy, ra: [-14 * sw, -2 * sw], la: [14 * sw, 30 * sw], at: {rA: [rx, ry, 1, rf || 90], lA: [lx, ly, 1, lf || 90]}});
const IO = (hx, rx, lx) => Object.assign(ft(hx, 136, rx, lx), {s: 0.96}, READY);
const HT = (hx, rx, ry, lx, ly, rf, lf) => ({ax: hx, ay: 127, ra: [52, 62], la: [44, 54], at: {rA: [rx, ry, 1, rf || 90], lA: [lx, ly, 1, lf || 90]}});
const CC = {stand: {h: 178, at: {rH: [110, 60, -1], lH: [108, 61, -1]}}, crunch: (n, f) => ({t: [164, 128], h: 120, [n + 'l']: [118, 20, 100], at: {[f + 'H']: [150, 86, -1], [n + 'H']: [146, 78, 1]}})};
const BC = (n, f) => Object.assign({t: [-98, -116], h: -122, [n + 'a']: [150, -69], [f + 'a']: [-160, -36], [n + 'l']: [104, 104, 170], [f + 'l']: [168, 64, 150]});
Object.assign(P, {
  skater: {v: 'f', nm: true, an: ['hip', 120, 128], d: 2.4, sp: 1,
    k: [Object.assign(ft(120, 128, 128, 112), {ra: [16, 8], la: [-16, -8]}), skA, Object.assign(ft(120, 128, 128, 112), {ra: [16, 8], la: [-16, -8]}), mir(skA)]},
  punch: {v: 's', an: ['hip', 116, 131], d: 1.8, sp: 1,
    k: [{ra: [28, 164], la: [24, 160], at: {rA: [96, 206, 1, 70], lA: [132, 206, 1, 90]}},
      {ax: 118, t: [168, 166], h: 172, ra: [90, 90], la: [24, 160], at: {rA: [96, 206, 1, 64], lA: [132, 206, 1, 90]}},
      {ra: [28, 164], la: [24, 160], at: {rA: [96, 206, 1, 70], lA: [132, 206, 1, 90]}},
      {ax: 118, t: [170, 168], h: 172, ra: [28, 164], la: [90, 90], at: {rA: [96, 206, 1, 70], lA: [132, 206, 1, 90]}}]},
  'knee-drive': {v: 's', an: ['hip', 118, 126], d: 2, sp: 1,
    k: [{ra: [166, 172], la: [162, 170]}, {t: [172, 164], h: 168, rl: [100, 4, 90], at: {rH: [150, 124, -1], lH: [146, 124, -1]}},
      {ra: [166, 172], la: [162, 170]}, {t: [172, 164], h: 168, ll: [100, 4, 90], at: {rH: [150, 124, -1], lH: [146, 124, -1]}}]},
  'walk-out': {v: 's', an: ['hip', 100, 126], bg: G.mat, d: 6.4, sp: 3,
    k: [Object.assign({ra: [4, 8], la: [-4, 4]}, woStand), woSquat, woOne('r', 'l'), woPlank(166), woPlank(165), woOne('l', 'r'), woSquat, Object.assign({ra: [176, 180], la: [172, 178]}, woStand)]},
  bike: {v: 's', an: ['hip', 100, 124], bg: G.bike, e: 'lin', d: 1.8, sp: 0, pin: {rH: [164, 101, -1], lH: [164, 101, -1]},
    k: [0, 45, 90, 135, 180, 225, 270, 315].map(a => ({t: [150, 146], h: 140, at: {rA: pedal(a).concat(1, 104), lA: pedal(a + 180).concat(1, 104)}}))},
  shuffle: {v: 'f', nm: true, an: ['hip', 120, 144], d: 1.6, sp: 1,
    k: [ft(104, 144, 128, 80), ft(120, 144, 154, 80), ft(136, 144, 154, 116), ft(120, 144, 154, 80)].map(k => Object.assign(k, {s: 0.95, h: 180}, READY))},
  grapevine: {v: 'f', nm: true, an: ['hip', 120, 128], d: 4, sp: 2,
    k: gv.concat([mir(gv[0])], gv.slice(1).map(mir)).map((k, i) => Object.assign(k, GVA[i % 2]))},
  'box-step': {v: 's', an: ['hip', 104, 126], d: 3.2, sp: 2,
    k: [BX(104, 126, 104, 206, 104, 206, 0, 0, 1), BX(112, 127, 128, 196, 104, 206, 80, 0, -1), BX(118, 128, 134, 206, 104, 206, 0, 0, -1), BX(128, 127, 134, 206, 122, 196, 0, 80, 1),
      BX(134, 126, 134, 206, 134, 206, 0, 0, 1), BX(126, 127, 116, 198, 134, 206, 70, 0, -1), BX(120, 128, 104, 206, 134, 206, 0, 0, -1), BX(110, 127, 104, 206, 118, 198, 0, 70, 1)]},
  'in-out': {v: 'f', nm: true, an: ['hip', 120, 136], d: 1.8, sp: 2,
    k: [IO(120, 130, 110), IO(128, 164, 110), IO(120, 164, 76), IO(112, 130, 76)]},
  'cross-crunch': {v: 's', an: ['hip', 118, 126], d: 2.6, sp: 1,
    k: [CC.stand, CC.crunch('r', 'l'), CC.stand, CC.crunch('l', 'r')]},
  climber: {v: 's', an: ['hip', 125, 148], bg: G.bench(146, 176, 64), d: 3, sp: 1, pin: {rH: [169, 175, -1], lH: [169, 175, -1]},
    k: [{t: [130, 130], h: 120, at: {rA: [64, 200, 1, 40], lA: [64, 200, 1, 40]}}, {t: [130, 130], h: 120, rl: [60, -40, 40], at: {lA: [64, 200, 1, 40]}},
      {t: [130, 130], h: 120, at: {rA: [64, 200, 1, 40], lA: [64, 200, 1, 40]}}, {t: [130, 130], h: 120, ll: [60, -40, 40], at: {rA: [64, 200, 1, 40]}}]},
  bicycle: {v: 's', an: ['hip', 128, 203], bg: G.mat, d: 3.2, sp: 0, k: [BC('r', 'l'), BC('l', 'r')]},
  'wood-chop': {v: 'f', nm: true, an: ['hip', 120, 128], d: 2.4, sp: 0,
    k: [{ax: 120, ay: 128, sw: 11, t: [180, 172], h: 172, at: {rA: [146, 206, 1, 90], lA: [94, 206, -1, -90], rH: [170, 30, 1], lH: [168, 32, -1]}},
      {ax: 116, ay: 142, sw: 11, t: [186, 200], h: 206, at: {rA: [146, 206, 1, 60], lA: [94, 206, -1, -90], rH: [70, 170, -1], lH: [72, 168, 1]}}]},
  'knee-hold': {v: 's', an: ['lA', 124, 206], d: 3.4, sp: 1,
    k: [{ll: [56, -8, 90], ra: [-20, 10], la: [20, 30], at: {rA: [80, 204, 1, 40]}},
      {rl: [100, 4, 90], ll: [2, 0, 90], ra: [30, 60], la: [24, 50]}, {t: [182, 180], rl: [102, 6, 90], ll: [2, 0, 90], ra: [34, 64], la: [28, 54]}]},
  'heel-toe': {v: 's', an: ['hip', 118, 127], d: 3.6, sp: 0,
    k: [HT(118, 125, 206, 112, 206), HT(118, 118, 206, 122, 200, 0, 76), HT(118, 112, 206, 125, 206), HT(118, 122, 200, 118, 206, 76, 0)]},
  'down-dog': {v: 's', an: ['hip', 108, 132], bg: G.mat, d: 3, sp: 0, pin: {rH: [0], lH: [0]},
    k: [{t: [44, 44], h: 14, ra: [44, 44], la: [44, 44], rl: [-28, -28, 50], ll: [-28, -28, 50]},
      {ax: 106, ay: 130, t: [46, 46], h: 16, rl: [-27, -27, 58], ll: [-27, -27, 58]}]}
});
// BLD 892 strength figures. A band runs from its anchor to the hands (band: [x, y]); a dowel is a stick
// drawn from a few joints each frame (stick: J => [[x, y], [x, y]]).
const BACK = J => { const u = [J.neck[0] - J.hip[0], J.neck[1] - J.hip[1]], l = Math.hypot(u[0], u[1]) || 1; return {u: [u[0] / l, u[1] / l], n: [u[1] / l, -u[0] / l]}; };
const along = (p, b, n, u) => [p[0] + b.n[0] * n + b.u[0] * u, p[1] + b.n[1] * n + b.u[1] * u];
const kn = (hands, t, h) => Object.assign({t: t, h: h, at: {rH: hands[0], lH: hands[1]}}, HALF);
const qf = (hx, rx, lx, ry, ly) => Object.assign(ft(hx, 138, rx, lx, ry, ly, ry < 206 ? 40 : 90, ly < 206 ? -40 : -90), {s: 0.96, ra: [26, 30], la: [-26, -30]});
const SQP = {up: {ra: [24, 166], la: [20, 162]}, low: {t: [146, 150], rl: [80, -30, 90], ll: [80, -30, 90], ra: [30, 172], la: [26, 168]}};
const PLANK = {t: [113, 113], h: 106, rl: [-67, -67, 12], ll: [-67, -67, 12], ra: [0, 0], la: [0, 0]};
const tap = n => Object.assign({}, PLANK, {t: [112, 112], at: {[n + 'H']: J => [J.rS[0] + 3, J.rS[1] + 9, -1]}});
Object.assign(P, {
  'half-kneel-chop': {v: 's', an: ['rK', 100, 204], bg: G.mat, band: [222, 22], d: 2.8, sp: 0,
    k: [kn([[164, 58, 1], [162, 60, 1]], [178, 174], 174), kn([[116, 168, 1], [114, 166, 1]], [176, 178], 172)]},
  'half-kneel-lift': {v: 's', an: ['rK', 100, 204], bg: G.mat, band: [224, 206], d: 2.8, sp: 0,
    k: [kn([[150, 182, 1], [148, 180, 1]], [174, 176], 170), kn([[90, 60, -1], [92, 58, -1]], [180, 182], 184)]},
  'quick-feet': {v: 'f', nm: true, an: ['hip', 120, 138], d: 1.6, sp: 0,
    k: [qf(120, 156, 84), qf(122, 140, 84, 196), qf(124, 132, 84), qf(122, 132, 100, 206, 196), qf(120, 132, 108), qf(118, 140, 108, 196), qf(122, 156, 108),
      qf(120, 156, 96, 206, 196)]},
  'w-raise': {v: 's', an: ['hip', 100, 203], bg: G.mat, d: 3, sp: 1,
    k: [{t: [91, 94], h: 100, ra: [-82, 84], la: [-80, 86], rl: [-90, -90, -150], ll: [-90, -90, -150]},
      {t: [96, 108], h: 116, ra: [-134, 108], la: [-130, 110], rl: [-90, -90, -150], ll: [-90, -90, -150]}]},
  'face-pull': {v: 's', an: ['rA', 120, 206], band: [228, 60], d: 2.6, sp: 1,
    k: [{ll: [10, 4, 90], rl: [-8, -4, 80], ra: [108, 108], la: [104, 104]}, {ll: [10, 4, 90], rl: [-8, -4, 80], ra: [-140, 96], la: [-136, 100]}]},
  'pull-down': {v: 's', an: ['rK', 108, 204], bg: G.mat, band: [168, 10], d: 2.8, sp: 1,
    k: [{rl: [0, -90, -90], ll: [0, -90, -90], ra: [152, 152], la: [150, 150]}, {rl: [0, -90, -90], ll: [0, -90, -90], t: [178, 176], ra: [-10, 150], la: [-6, 146]}]},
  'overhead-carry': {v: 's', an: ['hip', 118, 126], db: 'r', e: 'lin', d: 2.2, k: walk(126, 0.6).map(k => Object.assign(k, {ra: [178, 180]}))},
  airplane: {v: 'f', nm: true, an: ['rA', 128, 206], d: 3.4, sp: 0,
    k: [{s: 0.3, h: 180, kz: [1, 1, 0.12, 0.12], rl: [0, 0, 90], ll: [90, 90, 90], ra: [92, 92], la: [-92, -92]},
      {s: 0.32, t: [180, 172], h: 172, kz: [1, 1, 0.12, 0.12], rl: [0, 0, 90], ll: [90, 90, 90], ra: [166, 170], la: [-14, -10]}]},
  'dowel-hinge': {v: 's', an: ['rA', 108, 206], d: 3.2, sp: 1,
    stick: J => { const b = BACK(J); return [along(J.hip, b, 9, -10), along(J.neck, b, 9, 30)]; },
    k: [{ra: [0, 0], la: [0, 0], at: {rH: J => along(J.neck, BACK(J), 10, 2).concat(1), lH: J => along(J.hip, BACK(J), 10, 4).concat(-1)}},
      {t: [100, 98], h: 104, rl: [18, -6, 90], ll: [18, -6, 90], at: {rH: J => along(J.neck, BACK(J), 10, 2).concat(1), lH: J => along(J.hip, BACK(J), 10, 4).concat(-1)}}]},
  'pass-through': {v: 's', d: 3.6, sp: 1, stick: J => [[J.rH[0] - 9, J.rH[1] + 5], [J.rH[0] + 9, J.rH[1] - 5]],
    k: [{ra: [26, 26], la: [24, 24]}, {ra: [180, 180], la: [178, 178]}, {ra: [-148, -148], la: [-150, -150]}, {ra: [180, 180], la: [178, 178]}]},
  'squat-press': {v: 's', an: ['rA', 124, 206], db: 'rl', d: 3, sp: 2,
    k: [Object.assign({}, SQP.up), Object.assign({}, SQP.low), {ra: [176, 180], la: [174, 178]}]},
  'shoulder-tap': {v: 's', an: ['rT', 30, 208], bg: G.mat, d: 2.4, sp: 1, k: [PLANK, tap('r'), PLANK, tap('l')]}
});
// BLD 896: warm-up, cooldown, and hold figures. A key list may name its top poses (top: [key numbers]) for the
// held top of a rep when the figure follows a tempo, and alt: true marks a pattern whose loop is two counted reps
// (one each side). hb: true draws a band between the hands; fg: J => svg draws gear placed from the first frame.
G.post = (x, y) => `<g ${GS}><path d="M${x} ${y}V211" stroke-width="5"/><path d="M${x - 10} 211H${x + 10}" stroke-width="4"/></g>`;
const HANDLE = x => `<path d="M${x - 12} 211L${x - 7} 202H${x + 7}L${x + 12} 211" stroke-width="4"/><path d="M${x - 6} 201H${x + 6}" stroke-width="5"/>`;
const HC = (a, R) => ({ax: r1(120 + Math.cos(a * RAD) * R), ay: r1(126 + Math.sin(a * RAD) * 3), t: [r1(180 + Math.cos(a * RAD) * 7), r1(180 + Math.cos(a * RAD) * 2)], h: 180});
const PUH = {hang: {ra: [164, 180], la: [164, 180], rl: [2, 2, 30], ll: [2, 2, 30]}, top: {ay: 42, rl: [4, 4, 30], ll: [4, 4, 30]}};
const DIP0 = {t: [168, 174], h: 176, ra: [0, 0], la: [0, 0], rl: [2, -96, -150], ll: [8, -90, -150]};
const SLR = {mid: ft(120, 134, 160, 80), hands: {ra: [16, -124], la: [16, -124]}};
const OB = {t: [90, 90], h: 92, sw: 9, hw: 8, ra: [64, 80], rl: [-30, -90, -150], ll: [-34, -92, -150], kz: [0.55, 1, 0.55, 1], fl: 0.8};
Object.assign(P, {
  'leg-swing': {v: 's', an: ['lA', 116, 206], bg: G.wall, d: 2.2, sp: 0,
    k: [{t: [184, 182], h: 180, ll: [0, 0, 90], rl: [60, 40, 112], ra: [-24, -10], la: [44, 70]}, {t: [176, 178], h: 178, ll: [0, 0, 90], rl: [-38, -54, 40], ra: [22, 30], la: [40, 66]}]},
  'leg-raise-bent': {v: 's', an: ['hip', 126, 164], bg: G.bench(56, 170, 128), top: [1],
    k: [Object.assign({rl: [100, 56, 146], ll: [100, 56, 146], ra: [-104, -70], la: [-104, -70]}, SUP), Object.assign({rl: [182, 104, 196], ll: [182, 104, 196], ra: [-104, -70], la: [-104, -70]}, SUP)]},
  'hip-circles': {v: 'f', nm: true, d: 3.2, e: 'lin', sp: 0, pin: {rA: [0], lA: [0], rH: ['rP', 7, -6, 1], lH: ['lP', -7, -6, -1]}, pr: {rl: [5, 0, 90], ll: [-5, 0, -90]},
    k: [0, 45, 90, 135, 180, 225, 270, 315].map(a => Object.assign(HC(a, 9), {rl: [5, 0, 90], ll: [-5, 0, -90]}))},
  'open-book': {v: 'f', nm: true, an: ['hip', 92, 191], bg: G.mat, d: 3.4, sp: 2, top: [2],
    k: [Object.assign({la: [76, 86]}, OB), Object.assign({h: 102, la: [178, 182]}, OB), Object.assign({h: 112, so: 4, la: [212, 218]}, OB), Object.assign({h: 104, la: [180, 182]}, OB)]},
  'hug-open': {v: 'f', d: 2.6, sp: 1,
    k: [{ra: [94, 94], la: [94, 94]}, {ra: [44, -104], la: [52, -98]}]},
  'pull-apart': {v: 'f', d: 2.6, sp: 1, hb: true, top: [1],
    k: [{ra: [12, -122], la: [12, -122]}, {so: 3, ra: [92, 92], la: [92, 92]}]},
  pallof: {v: 's', an: ['rA', 122, 206], bg: G.post(116, 94), band: [116, 94], d: 2.8, sp: 1, top: [1],
    k: [{ll: [8, 2, 90], rl: [-6, -2, 86], ra: [-12, 150], la: [-8, 152]}, {ll: [8, 2, 90], rl: [-6, -2, 86], ra: [90, 90], la: [88, 88]}]},
  'ankle-pumps': {v: 's', an: ['hip', 92, 166], bg: G.chair, d: 2.4, sp: 1,
    k: [{rl: [90, 24, 30], ll: [90, 24, 34], ra: [12, 76], la: [12, 76]}, {rl: [90, 24, 132], ll: [90, 24, 128], ra: [12, 76], la: [12, 76]}]},
  'weighted-bridge': {v: 's', an: ['rA', 174, 206], db: 'r', bg: G.mat, top: [1], pin: {rH: ['hip', 2, -8, 1], lH: ['hip', 2, -8, 1]},
    k: [Object.assign({rl: [140, 40, 90], ll: [140, 40, 90]}, SUP), {t: [-53, -53], h: -96, rl: [100, 14, 90], ll: [100, 14, 90]}]},
  'side-lunge-rock': {v: 'f', nm: true, an: ['hip', 120, 134], d: 3.2, sp: 1, alt: true, top: [1, 3],
    k: [Object.assign({}, SLR.mid, SLR.hands), Object.assign(ft(140, 150, 160, 80), SLR.hands, {t: [176, 178]}), Object.assign({}, SLR.mid, SLR.hands), Object.assign(ft(100, 150, 160, 80), SLR.hands, {t: [184, 182]})]},
  'dip-hold': {v: 's', an: ['neck', 126, 62], bg: G.dipbar, d: 3, sp: 0, pin: {rH: [-1], lH: [-1]},
    k: [DIP0, Object.assign({}, DIP0, {ay: 63, s: 1.02, h: 178})]},
  'pull-up-hold': {v: 'f', an: ['neck', 120, 66], bg: G.bar, d: 3, sp: 0, pin: {rH: [0], lH: [0]}, pr: PUH.hang,
    k: [PUH.top, Object.assign({}, PUH.top, {ay: 43, s: 1.02})]},
  'handle-push-up': {v: 's', an: ['rT', 30, 208], bg: G.mat, pin: {rH: [-1], lH: [-1]}, fg: J => `<g ${GS}>${HANDLE(r1(J.rH[0]))}</g>`,
    k: [{t: [113, 113], h: 106, rl: [-67, -67, 12], ll: [-67, -67, 12], ra: [0, 0], la: [0, 0]}, {t: [97, 97], h: 96, rl: [-83, -83, 12], ll: [-83, -83, 12]}]}
});
// The top of each rep, and the patterns whose loop is two counted reps, one each side.
Object.assign(P['bird-dog'], {alt: true, top: [1, 3]}); Object.assign(P['dead-bug'], {alt: true, top: [1, 3]});
P['hip-thrust'].top = [1]; P.bridge.top = [1];
['bridge-march', 'pull-through', 'shoulder-tap', 'cross-crunch', 'knee-drive', 'punch', 'climber', 'march', 'skater', 'bicycle', 'hip-switch', 'heel-toe'].forEach(id => { P[id].alt = true; });

['skater', 'punch', 'knee-drive', 'walk-out', 'bike', 'shuffle', 'grapevine', 'box-step', 'in-out', 'cross-crunch', 'climber', 'wood-chop', 'knee-hold', 'heel-toe', 'down-dog',
  'half-kneel-chop', 'half-kneel-lift', 'quick-feet', 'dowel-hinge', 'shoulder-tap', 'side-lunge-rock'].forEach(id => solve(P[id]));

// The far leg of a crossed seat is drawn mirrored by hand where the view keeps absolute angles.
// BLD 898 (Chris: "one balance vid it says to stand but the body is sitting"): standing forms of the seated breath, twist,
// shrug, and neck figures, for steps whose words say stand.
Object.assign(P, {
  'stand-breath': {v: 'f', d: 3, k: [{}, {s: 1.05, sw: 18, ra: [13, 8], la: [13, 8]}]},
  'stand-twist': {v: 'f', nm: true, d: 3, sp: 0, k: [{t: [180, 184], h: 192, sw: 11, ra: [36, 14], la: [36, 52]}, {t: [180, 176], h: 168, sw: 11, ra: [-36, -52], la: [-36, -14]}]},
  'stand-shrug': {v: 'f', d: 2.4, k: [{}, {so: -4}]},
  'stand-neck': {v: 'f', d: 3, k: [{h: 150}, {h: 210}]},
  // Seated forms on a chair (side view) or the floor (front view), for steps that say sit.
  'seat-march': {v: 's', an: ['hip', 92, 166], bg: G.chair, d: 2.6, alt: true,
    k: [{rl: [90, 0, 90], ll: [90, 0, 90], ra: [-14, 50], la: [14, 70]}, {rl: [116, 26, 100], ll: [90, 0, 90], ra: [14, 70], la: [-14, 50]},
      {rl: [90, 0, 90], ll: [90, 0, 90], ra: [-14, 50], la: [14, 70]}, {rl: [90, 0, 90], ll: [116, 26, 100], ra: [-14, 50], la: [14, 70]}]},
  'seat-arm-circles': {v: 's', an: ['hip', 92, 166], bg: G.chair, e: 'lin', d: 2.4,
    k: [{ra: [0, 0], la: [180, 180]}, {ra: [90, 90], la: [270, 270]}, {ra: [180, 180], la: [0, 0]}, {ra: [270, 270], la: [90, 90]}].map(k => Object.assign({rl: [90, 0, 90], ll: [90, 0, 90]}, k))},
  'seat-side-bend': {v: 'x', nm: true, raw: true, pin: null, d: 3.2,
    k: [{t: [178, 196], h: 204, ra: [172, 216], la: [28, 34]}, {t: [182, 164], h: 156, ra: [28, 34], la: [-172, -216]}]},
  'seat-arms-up': {v: 'x', pin: null, d: 3, k: [{ra: [28, 34], la: [28, 34]}, {ra: [168, 176], la: [168, 176]}]},
  'seat-press': {v: 's', an: ['hip', 92, 166], bg: G.chair, db: 'rl', d: 2.6,
    k: [{rl: [90, 0, 90], ll: [90, 0, 90], ra: [40, 172], la: [36, 168]}, {rl: [90, 0, 90], ll: [90, 0, 90], ra: [176, 178], la: [172, 176]}]},
  'seat-fold': {v: 's', an: ['hip', 92, 166], bg: G.chair, d: 3, sp: 1,
    k: [{rl: [90, 0, 90], ll: [90, 0, 90], ra: [12, 76], la: [12, 76]}, {t: [128, 116], h: 108, rl: [90, 0, 90], ll: [90, 0, 90], ra: [14, 14], la: [14, 14]}]},
  'seat-pulldown': {v: 's', an: ['hip', 92, 166], bg: G.chair, band: [100, 12], d: 2.8, sp: 1,
    k: [{rl: [90, 0, 90], ll: [90, 0, 90], ra: [168, 168], la: [166, 166]}, {rl: [90, 0, 90], ll: [90, 0, 90], t: [178, 176], ra: [-14, 152], la: [-10, 148]}]},
  'seat-row': {v: 's', an: ['hip', 58, 202], bg: G.mat, band: [226, 186], d: 2.8, sp: 1,
    k: [{t: [172, 174], rl: [90, 90, 180], ll: [90, 90, 180], ra: [84, 88], la: [84, 88]}, {t: [184, 182], rl: [90, 90, 180], ll: [90, 90, 180], ra: [-40, 82], la: [-40, 82]}]},
  'leg-press': {v: 's', an: ['hip', 96, 168], bg: `<g ${GS}><path d="M58 180L128 172M60 180L44 122" stroke-width="8"/><path d="M80 178V211M118 174V211" stroke-width="5"/></g>`, d: 3, sp: 1,
    k: [{t: [-136, -136], h: -140, rl: [146, 44, 140], ll: [146, 44, 140], ra: [20, 40], la: [20, 40]}, {t: [-136, -136], h: -140, rl: [116, 106, 196], ll: [116, 106, 196], ra: [20, 40], la: [20, 40]}]},
  'thread-needle': {v: 's', an: ['hip', 82, 164], bg: G.mat, d: 3, sp: 1, pin: {lH: [-1]}, pr: {t: [108, 108], ra: [0, 0], la: [0, 0], rl: [0, -90, -90], ll: [0, -90, -90]},
    k: [{t: [108, 108], h: 100, ra: [0, 0], la: [0, 0], rl: [0, -90, -90], ll: [0, -90, -90]}, {t: [96, 92], h: 120, ra: [-84, -88], la: [0, 0], rl: [0, -90, -90], ll: [0, -90, -90]}]},
  'wall-push-up': {v: 's', an: ['rT', 72, 208], bg: `<g ${GS}><path d="M186 26V211" stroke-width="7"/></g>`, d: 2.6, pin: {rH: [180, 96, -1], lH: [180, 96, -1]},
    k: [{t: [154, 154], h: 154, rl: [-26, -26, 62], ll: [-26, -26, 62]}, {t: [140, 140], h: 140, rl: [-40, -40, 50], ll: [-40, -40, 50]}]},
  'stand-ankle-rock': {v: 's', an: ['rA', 128, 206], bg: `<g ${GS}><path d="M190 26V211" stroke-width="7"/></g>`, d: 2.8, pin: {rH: [184, 100, -1], lH: [184, 100, -1]},
    k: [{rl: [2, 0, 90], ll: [-22, -26, 60]}, {t: [172, 174], rl: [34, -24, 90], ll: [-14, -40, 50]}]}
});
P.twist.k.forEach(k => { k.rl = [76, -97, -90]; k.ll = [-76, 97, 90]; });
P.twist.pin = null;
P['hip-switch'].k.forEach(k => { k.sw = 15; k.hw = 9; });

// Keywords, in order: the first that matches wins.
const KW = [
  // BLD 896 figures first: Leg Swings before the dumbbell swing, the holds before dips and pull-ups, and so on.
  [/leg swings?|swing (your|the|one) leg/, 'leg-swing'], [/^(?!.*seated).*hip (circles?|rotations?)/, 'hip-circles'], [/open ?book|book opener/, 'open-book'],
  [/hug (and|n|&) open|open (and|&) hug/, 'hug-open'], [/pull.?aparts?/, 'pull-apart'], [/pallof|anti.?rotation press/, 'pallof'],
  [/ankle pumps?|foot pumps?|point and flex/, 'ankle-pumps'], [/(weighted|dumbbell|\bdb|loaded) (glute )?bridge/, 'weighted-bridge'],
  [/side lunge rock|lunge rock|adductor|groin rock|side to side lunge/, 'side-lunge-rock'],
  [/dips? (top )?hold|top hold.*\bdips?\b|support hold|straight.?arm (support|hold)/, 'dip-hold'],
  [/(pull ?ups?|chin ?ups?).*(top )?hold|top hold|flexed.?arm hang|chin over (the )?bar/, 'pull-up-hold'],
  [/push.?ups? on (the )?handles|handle push.?ups?|push.?up handles/, 'handle-push-up'],
  [/bench leg raise|(bent.?knee|knees? bent|tucked?) leg raise|leg raise.*(bent|tuck)/, 'leg-raise-bent'], [/hip opener|kneeling hip/, 'hip-flexor'],
  // BLD 892 figures first, so a plainer word below them gives way.
  [/skater/, 'skater'], [/shadow ?box|punch|\bjabs?\b/, 'punch'], [/^(?!.*lunge).*knee drive/, 'knee-drive'], [/walk.?outs?\b|inchworm/, 'walk-out'],
  [/bicycle/, 'bicycle'], [/\bbike|cycling|stationary cycle/, 'bike'], [/shuffle/, 'shuffle'], [/grapevine/, 'grapevine'], [/box step(?!.?up)/, 'box-step'],
  [/\bin.?(and.?)?out step|\bin out\b/, 'in-out'], [/cross.?crunch|elbow to (opposite )?knee/, 'cross-crunch'], [/climber/, 'climber'],
  [/kneel.*chop/, 'half-kneel-chop'], [/kneel.*lift/, 'half-kneel-lift'], [/wood ?chop/, 'wood-chop'], [/knee hold|step.?back balance/, 'knee-hold'],
  [/heel.?to.?toe (walk|step)|tandem walk/, 'heel-toe'], [/down(ward)? dog/, 'down-dog'], [/quick feet|ladder/, 'quick-feet'], [/\bw raise|floor w\b/, 'w-raise'],
  [/face pull/, 'face-pull'], [/leg press/, 'leg-press'], [/seated (cable )?row|cable row/, 'seat-row'], [/seated march/, 'seat-march'], [/pull.?down|lat pull/, 'pull-down'], [/overhead carry|waiter.?s? (carry|walk)/, 'overhead-carry'], [/airplane/, 'airplane'],
  [/dowel (hip )?hinge|hinge with (a )?dowel/, 'dowel-hinge'], [/pass.?through|dowel pass/, 'pass-through'], [/squat (to |and )?press|thruster/, 'squat-press'],
  [/shoulder taps?/, 'shoulder-tap'],
  [/cat ?cow/, 'cat-cow'], [/child/, 'child-pose'], [/couch|hip flexor/, 'hip-flexor'], [/figure ?(4|four)|pigeon/, 'figure-4'],
  [/90\/90|hip switch|windshield/, 'hip-switch'], [/hanging (knee|leg)|knee raise|knees? to chest/, 'knee-raise'], [/dead ?hang|\bhang/, 'hang'], [/pull ?ups?|chin ?ups?|pullups|chinups/, 'pull-up'],
  [/hollow/, 'hollow'], [/reverse crunch/, 'reverse-crunch'], [/leg raise/, 'leg-raise'], [/dead ?bugs?|crunch/, 'dead-bug'],
  [/y.?t raise|reverse fly|rear delt/, 'yt-raise'], [/chest.?supported/, 'chest-row'], [/bird ?dogs?/, 'bird-dog'],
  [/thread the needle/, 'thread-needle'], [/side plank.*reach|reach.?through/, 'reach-through'], [/side plank/, 'side-plank'], [/pull.?through/, 'pull-through'], [/plank/, 'plank'],
  [/wall push/, 'wall-push-up'], [/fast push|plyo push|explosive push/, 'fast-push-up'], [/push ?ups?|pushups|press ?ups?/, 'push-up'], [/push press/, 'push-press'],
  [/incline (dumbbell |db )?press|incline bench/, 'incline-press'], [/bench press|chest press|floor press/, 'bench-press'], [/kneeling.*press|half.?kneel/, 'kneel-press'],
  [/tricep|skull/, 'triceps'], [/curl/, 'curl'], [/calf|heel raise/, 'calf-raise'],
  [/single ?leg (romanian|rdl|deadlift|hinge)|\bsl rdl/, 'sl-hinge'], [/balance|one leg stand|stand on one/, 'balance'],
  [/romanian|\brdl|deadlift|hinge|good morning/, 'hinge'], [/bridge march|marching bridge/, 'bridge-march'], [/hip thrust/, 'hip-thrust'], [/bridge/, 'bridge'], [/swing/, 'swing'],
  [/goblet/, 'goblet-squat'], [/step ?up|step drive|box step/, 'step-up'], [/ankle rock|knee to wall/, 'ankle-rock'], [/reverse lunge|back lunge|step back/, 'reverse-lunge'],
  [/lunge|split squat/, 'lunge'], [/squats? to (the )?(bench|box|chair)|box squat|bench squat/, 'bench-squat'],
  [/squat|sit to stand|chair stand/, 'squat'], [/\brows?\b/, 'row'], [/\bdips?\b/, 'dip'], [/wall slide|wall angel/, 'wall-slide'], [/arms? up|reach up|sun salut/, 'arms-up'],
  [/press|overhead|jerk/, 'press'], [/suitcase|one.?arm carry|single.?arm carry/, 'suitcase'], [/carry|farmer/, 'carry'], [/march|jacks?\b|high knee/, 'march'],
  [/\brun|jog|sprint|stride|interval/, 'run'], [/walk|mile|hike|treadmill|elliptical|zone 2|cardio/, 'walk'],
  [/spinal flex|spine flex/, 'spinal-flex'], [/twist/, 'twist'], [/arm circle/, 'arm-circles'], [/shrug|shoulder roll/, 'shrug'],
  [/\bneck/, 'neck'], [/life nerve|hamstring|toe touch|seated fold/, 'life-nerve'], [/forward fold|fold forward|ragdoll/, 'forward-fold'],
  [/side bend|side stretch/, 'side-bend'], [/breath|pranayama|meditat/, 'breath'],
  [/savasana|corpse|lie down|lying|on your back|relax/, 'lie'], [/cross ?leg|easy pose/, 'cross-seat'], [/\bseat|\bsit/, 'seat'],
  [/stretch|tight spot|mobility|world.?s greatest/, 'stretch'], [/stand/, 'standing']
];

function of(name){
  const s = String(name == null ? '' : name).toLowerCase().trim();
  if (P[s]) return s;
  const n = s.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ');
  for (const [re, id] of KW) if (re.test(n)) return id;
  return 'standing';
}

function reduced(){ try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } }
const escA = s => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));

function svg(pattern, opts){
  opts = opts || {};
  const id = P[pattern] ? pattern : of(pattern), M = P[id], size = opts.size || 160, lp = loop(id, opts);
  // BLD 898: a tempo or a breath ({breath: [in, out]}) lays the frames on the shared timeline (plan), with exact keyTimes.
  const pl = !opts.still && !reduced() && opts.pose == null && (lp || opts.breath) ? plan(id, opts) : null;
  const dur = pl ? pl.dur : lp ? lp.dur : r1((M.d || 2.6) / (+opts.speed > 0 ? +opts.speed : 1));
  const F = pl ? planFrames(M, pl) : frames(M, !!opts.still || reduced(), opts.pose, lp ? lp.hold : 0), side = M.v === 's';
  const far = op => op ? ` style="opacity:var(--ggm-far,${op})"` : '';
  const line = (k, op) => `<polyline points="${pts(F[0], SEG[k])}"${far(op)}>${anim(F, 'points', J => pts(J, SEG[k]), dur)}</polyline>`;
  const db = k => M.db && M.db.includes(k[0]) ? dumbbell(F, k, dur, side && k[0] === 'l' ? '.42' : '') : '';
  const head = `<circle r="${L.hr}" cx="${r1(F[0].head[0])}" cy="${r1(F[0].head[1])}" fill="currentColor" stroke="none">${anim(F, 'cx', J => r1(J.head[0]), dur)}${anim(F, 'cy', J => r1(J.head[1]), dur)}</circle>`;
  // A soft shadow on the floor follows the hips, so the figure stands on the ground of a stage.
  const sx = J => r1(J.hip[0]), srx = J => r1(Math.max(16, 30 - Math.max(0, 150 - J.hip[1]) * 0.12));
  const shadow = `<ellipse cx="${sx(F[0])}" cy="213" rx="${srx(F[0])}" ry="4.5" fill="currentColor" stroke="none" style="color:var(--ggm-shadow,currentColor);opacity:var(--ggm-shadow-op,0)">${anim(F, 'cx', sx, dur)}${anim(F, 'rx', srx, dur)}</ellipse>`;
  // A band from its anchor to the hands, and a dowel, both moving with the figure.
  const seg = (f, k) => `<polyline points="${f(F[0])}">${anim(F, 'points', f, dur)}</polyline>`;
  const hands = J => [(J.rH[0] + J.lH[0]) / 2, (J.rH[1] + J.lH[1]) / 2];
  const band = M.band ? `<g style="color:var(--ggm-db,currentColor)"><g stroke-width="3">${seg(J => r1(M.band[0]) + ',' + r1(M.band[1]) + ' ' + hands(J).map(r1).join(','))}</g>` +
    `<circle cx="${M.band[0]}" cy="${M.band[1]}" r="5" fill="currentColor" stroke="none"/></g>` : '';
  const stick = M.stick ? `<g stroke-width="5" style="color:var(--ggm-steel,currentColor)">${seg(J => M.stick(J).map(q => q.map(r1).join(',')).join(' '))}</g>` : '';
  const hb = M.hb ? `<g stroke-width="3" style="color:var(--ggm-db,currentColor)">${seg(J => pts(J, ['rH', 'lH']))}</g>` : '';
  const fg = M.fg ? M.fg(F[0]) : '';
  let body;
  if (side) body = line('la', '.42') + db('lH') + line('ll', '.42') + stick + line('sp') + line('rl') + line('ra') + db('rH') + head;
  else body = line('ll') + line('rl') + line('hpb') + line('sp') + line('shb') + stick + line('la') + line('ra') + db('lH') + db('rH') + head;
  body += hb;
  const label = escA(opts.label || id.replace(/-/g, ' '));
  const flip = opts.flip ? ' transform="translate(240 0) scale(-1 1)"' : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="${size}" height="${size}" role="img" aria-label="${label}" class="gg-move${opts.flip ? ' gg-flip' : ''}" data-move="${id}"${pl && F.length > 1 ? ` data-rep="${pl.rep}" data-per="${pl.per}" data-dur="${pl.dur}" data-ph="${pl.phases.map(x => x.k + ':' + x.d).join(' ')}"` : lp && F.length > 1 ? ` data-rep="${lp.rep}" data-per="${lp.per}"` : ''}>` +
    `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${flip}>` +
    `<path d="M14 212H226" stroke-width="3" style="opacity:var(--ggm-ground-op,.22)"/>${shadow}${M.bg || ''}${fg}${band}<g stroke-width="9" style="color:var(--ggm-ink,currentColor)">${body}</g></g></svg>`;
}

// For a step that names a pattern itself (the Daily Practice), keep a specific pattern, and let a plain
// "standing" or "seat" give way to a better match for the step's name.
// BLD 898: with the step's how text, the figure also takes the posture its words name (stand, sit, kneel, lie).
function pick(fig, name, how){
  const f = fig && P[fig] ? fig : null, n = name ? of(name) : 'standing';
  if (!f) return fit(n, name, how);
  return fit((f === 'standing' || f === 'seat') && n !== 'standing' && n !== 'seat' ? n : refine(f, name), name, how);
}
// BLD 896: a move that names a general pattern (fig) gives way to its own BLD 896 figure when its name asks for one
// (Leg Swings set as balance, Push-Up on Handles set as push-up), and a plain "standing" gives way to any better match.
const REFINE = {balance: ['leg-swing'], swing: ['leg-swing'], 'push-up': ['handle-push-up'], 'leg-raise': ['leg-raise-bent'], bridge: ['weighted-bridge'],
  dip: ['dip-hold'], 'pull-up': ['pull-up-hold'], hang: ['pull-up-hold'], 'yt-raise': ['pull-apart'], lunge: ['side-lunge-rock'], 'cross-seat': [], 'ankle-rock': ['ankle-pumps'], 'reach-through': ['thread-needle']};
function refine(fig, name, how){
  const f = fig && P[fig] ? fig : null, n = name ? of(name) : 'standing';
  if (!f) return how != null ? fit(n, name, how) : n;
  const r = f === 'standing' ? n : (REFINE[f] || []).includes(n) ? n : f;
  return how != null ? fit(r, name, how) : r;
}
// BLD 898: the posture of every figure, and the posture a step's words name, so the body matches the words.
const POSE = {};
[['stand', 'squat goblet-squat lunge step-up hinge sl-hinge press curl triceps calf-raise carry swing walk run march balance stretch arm-circles arms-up forward-fold side-bend standing bench-squat reverse-lunge push-press suitcase wall-slide skater punch knee-drive shuffle grapevine box-step in-out cross-crunch wood-chop knee-hold heel-toe quick-feet face-pull overhead-carry airplane dowel-hinge pass-through squat-press leg-swing hip-circles hug-open pull-apart pallof side-lunge-rock row stand-breath stand-twist stand-shrug stand-neck wall-push-up stand-ankle-rock'],
  ['seat', 'seat spinal-flex twist cross-seat breath shrug neck ankle-pumps bike hip-switch life-nerve seat-arms-up seat-march seat-arm-circles seat-side-bend seat-press seat-fold seat-pulldown seat-row leg-press'],
  ['kneel', 'hip-flexor half-kneel-chop half-kneel-lift kneel-press pull-down ankle-rock child-pose'],
  ['fours', 'bird-dog cat-cow thread-needle'],
  ['lie', 'bridge dead-bug figure-4 lie reverse-crunch hollow bicycle w-raise bench-press leg-raise leg-raise-bent bridge-march hip-thrust weighted-bridge open-book incline-press chest-row yt-raise'],
  ['stand plank', 'walk-out'], ['plank', 'plank side-plank push-up fast-push-up handle-push-up shoulder-tap pull-through reach-through climber down-dog'],
  ['hang', 'pull-up hang knee-raise pull-up-hold'], ['support', 'dip dip-hold']].forEach(([k, ids]) => ids.split(' ').forEach(id => { POSE[id] = k; }));
const pose = id => POSE[P[id] ? id : of(id)] || '';
const SAYS = [['fours', /(?<!from )(hands and knees|all fours|table ?top)/], ['kneel', /\bkneel(ing)?\b|(come|get|be|rest) (up )?on(to)? (your|both) knees|half.?kneel/],
  ['lie', /\blie\b|\blying\b|on your (back|side|belly|stomach)|face down|savasana|corpse/], ['plank', /\bplank\b|push.?up position/], ['hang', /\bhang\b(?! heavy| loose| easy| soft)|from the bar/],
  ['seat', /\bsit\b(?! (back|down|the hips|your hips|into|between|deep|low|or stand))|\bsitting\b|\bseated\b|cross.?legged|easy pose/],
  ['stand', /\bstand(ing)?\b|keep your feet (steady|planted)|on your feet|feet (hip|shoulder) width|shift your weight|weight shift|rock your weight|(hold|holding) the back of a chair|hands? on (the|a) wall/]];
// Words that name both postures (Sit to Stand, "Sit or stand tall") leave the figure as it is.
const BOTH = /sit.?to.?stand|chair stand|wall sit|sit or stand|stand or sit|stand (all the way )?up.*sit|sit.*then stand/;
function says(name, how){
  for (const t of [name, how]){ const s = String(t || '').toLowerCase(); if (BOTH.test(s)) return ''; if (/then lie (back|down)/.test(s)) return 'lie'; let best = '', at = 1e9;
    for (const [k, re] of SAYS){ const m = s.match(re); if (m && m.index < at){ at = m.index; best = k; } }
    if (best) return best; }
  return '';
}
const FITS = {stand: ['stand'], seat: ['seat'], kneel: ['kneel', 'fours'], fours: ['fours'], lie: ['lie'], plank: ['plank'], hang: ['hang']};
// A figure in another posture than the words gives way to its form in that posture, else to the best match for the name.
const TO = {stand: {breath: 'stand-breath', 'cross-seat': 'standing', seat: 'standing', twist: 'stand-twist', shrug: 'stand-shrug', neck: 'stand-neck', 'spinal-flex': 'forward-fold', 'life-nerve': 'forward-fold',
    'ankle-rock': 'stand-ankle-rock', 'push-up': 'wall-push-up'},
  seat: {'stand-breath': 'breath', standing: 'seat', 'stand-twist': 'twist', 'stand-shrug': 'shrug', 'stand-neck': 'neck', march: 'seat-march', 'arm-circles': 'seat-arm-circles', 'side-bend': 'seat-side-bend',
    press: 'seat-press', 'figure-4': 'seat-fold', 'forward-fold': 'seat-fold', 'pull-up': 'seat-pulldown', 'pull-down': 'seat-pulldown', row: 'seat-row', squat: 'leg-press', 'arms-up': 'seat-arms-up', balance: 'seat'},
  lie: {standing: 'lie', seat: 'lie', breath: 'lie', 'cross-seat': 'lie', 'stand-breath': 'lie'}, kneel: {standing: 'child-pose', seat: 'child-pose'}, fours: {'reach-through': 'thread-needle', 'child-pose': 'cat-cow'}};
function fit(id, name, how){
  if (how == null || !P[id]) return id; const w = says(name, how), p = POSE[id];
  if (!w || !p || p.split(' ').some(x => (FITS[w] || [w]).includes(x))) return id;
  let t = (TO[w] || {})[id]; if (t === 'seat-fold' && /legs? (extended|long|straight|out)/.test(String(how).toLowerCase())) t = 'life-nerve'; if (t && P[t]) return t;
  const n = of(name); if (String(POSE[n] || '').split(' ').some(x => (FITS[w] || [w]).includes(x))) return n;
  return id;
}
// BLD 896: a figure that follows the voice count. tempo is the seconds of one counted rep; a pattern marked alt (one rep
// each side) loops over two reps, others over one (per sets it outright; the player's alt flag leaves it to the pattern,
// since a two key figure shows one side whichever side is counted); a pattern with top poses holds them for hold (0.4) of each rep.
// Walking, running, carries, and the bike keep their own pace.
const GAIT = ['walk', 'run', 'carry', 'suitcase', 'overhead-carry', 'bike'];
function loop(pattern, opts){
  opts = opts || {}; const id = P[pattern] ? pattern : of(pattern), M = P[id], t = +opts.tempo;
  if (!(t > 0) || GAIT.includes(id)) return null;
  const per = +opts.per > 0 ? Math.round(+opts.per) : M.alt ? 2 : 1, rep = Math.round(t * 100) / 100;
  return {id, rep, per, dur: Math.round(rep * per * 100) / 100, hold: M.top ? (opts.hold != null ? Math.max(0, +opts.hold || 0) : 0.4) : 0};
}
// BLD 898 (Chris: "the count, the breath and the movements were way out of sync"): one timeline drives the figure, the breath
// ring, and the count. plan(pattern, {tempo} or {breath: [in, out]}) lays out the loop as moves and holds, each with its breath:
// in on the lowering or opening, out on the effort or the fold, hold on a held top pose. The figure's frames carry exact
// keyTimes from it, and the player builds the breath ring from the same phases, so both turn at the same instant.
// A pattern's first move (key 0 to key 1) breathes in, or out for the patterns listed here.
const OUT_FIRST = new Set(('press push-press bench-press incline-press seat-press pull-up row chest-row yt-raise face-pull pull-down seat-pulldown seat-row curl calf-raise ' +
  'bridge hip-thrust weighted-bridge bridge-march step-up swing cat-cow forward-fold seat-fold life-nerve spinal-flex leg-raise leg-raise-bent knee-raise reverse-crunch ' +
  'pull-apart pallof dead-bug bird-dog leg-press kneel-press hollow ' +
  // BLD 897: out on the effort, as the 3D figures breathe them.
  'climber cross-crunch knee-hold bicycle walk-out').split(' '));
function plan(pattern, opts){
  opts = opts || {}; const id = P[pattern] ? pattern : of(pattern), M = P[id], br = opts.breath;
  const bm = Array.isArray(br) && +br[0] > 0 && +br[1] > 0, lp = bm ? null : loop(id, opts);
  if (!lp && !bm) return null;
  const K = M.k.length, n = K % 2 && !lp ? K * 2 : K, first = OUT_FIRST.has(id) ? 'out' : 'in', other = first === 'in' ? 'out' : 'in', segs = [];
  if (bm){
    const d = {in: +br[0], out: +br[1]};
    for (let i = 0; i < n; i++){ const k = i % 2 ? other : first; segs.push({a: i % K, b: (i + 1) % K, d: d[k], k}); }
  } else {
    const dur = lp.dur, per = lp.per, mv = K / per, top = lp.hold > 0 && M.top ? M.top : [];
    if (top.length){
      const hw = M.k.map((x, i) => top.includes((i + 1) % K) ? Math.min(0.8, lp.hold) / top.length : 0.04), mw = Math.max(0.1, 1 - hw.reduce((a, b) => a + b, 0)) / K;
      for (let i = 0; i < K; i++){ const k = (i % mv) % 2 ? other : first;
        if (hw[i] >= 0.1){ segs.push({a: i, b: (i + 1) % K, d: mw * dur, k}); segs.push({a: (i + 1) % K, b: (i + 1) % K, d: hw[i] * dur, k: 'hold'}); }
        else segs.push({a: i, b: (i + 1) % K, d: (mw + hw[i]) * dur, k}); }
    } else {
      // Two moves a rep: the lowering (breathe in) takes six tenths, the effort (breathe out) four. Other counts share evenly.
      for (let i = 0; i < K; i++){ const j = i % mv, k = j % 2 ? other : first, w = mv === 2 ? (k === 'in' ? 0.6 : 0.4) : 1 / mv; segs.push({a: i, b: (i + 1) % K, d: w * lp.rep, k}); }
    }
  }
  const r3 = x => Math.round(x * 1000) / 1000, dur = r3(segs.reduce((a, s) => a + s.d, 0)), phases = [];
  segs.forEach(s => { const l = phases[phases.length - 1]; if (l && l.k === s.k) l.d += s.d; else phases.push({k: s.k, d: s.d}); });
  phases.forEach(p => { p.d = r3(p.d); });
  return {id, dur, rep: lp ? lp.rep : r3(+br[0] + +br[1]), per: lp ? lp.per : Math.max(1, Math.round(n / 2)), first, segs, phases};
}
// Frames at exact times from a plan: each move eases from key to key, each hold stays on its key. F.kt are the keyTimes.
function planFrames(M, pl){
  const K = poses(M), pins = pinsOf(M, M.pr ? Object.assign({}, BASE[M.v], M.pr) : K[0]), F = [], kt = [], N = Math.max(96, Math.round(pl.dur * 16));
  let t = 0;
  pl.segs.forEach(s => {
    if (s.a === s.b){ F.push(place(M, K[s.b], pins)); kt.push(t / pl.dur); t += s.d; return; }
    const m = Math.max(6, Math.round(s.d / pl.dur * N));
    for (let j = 0; j < m; j++){ const u = j / m; F.push(place(M, blend(K[s.a], K[s.b], M.e === 'lin' ? u : ease(u), M.raw), pins)); kt.push((t + s.d * u) / pl.dur); }
    t += s.d;
  });
  F.push(F[0]); kt.push(1); F.kt = kt.map(x => Math.round(Math.min(1, x) * 10000) / 10000); return F;
}

// Restart a figure on each counted rep (rep 1, 2, 3 ...): an alternating figure starts its second half on even reps.
// root is an svg made with a tempo, or any element (or the document) holding them.
function sync(root, rep){
  const r = Math.max(1, rep | 0), list = root && root.getAttribute && root.getAttribute('data-rep') ? [root] : Array.from((root || document).querySelectorAll('svg.gg-move[data-rep]'));
  list.forEach(s => { const t = +s.getAttribute('data-rep'), n = +s.getAttribute('data-per') || 1; try { if (s.setCurrentTime) s.setCurrentTime(((r - 1) % n) * t); } catch (e){} });
  return list.length;
}

// The same for one figure (the player's call): o.rep is the counted rep. A figure made without a tempo starts again
// on each rep, or every other rep when o.alt says the count alternates sides.
function restart(el, o){
  o = o || {}; const r = Math.max(1, (o.rep | 0) || 1);
  if (!el || !el.setCurrentTime) return false;
  try { if (+el.getAttribute('data-rep') > 0) sync(el, r); else if (!o.alt || r % 2 === 1) el.setCurrentTime(0); return true; } catch (e){ return false; }
}

window.GGMoves = {svg, fig: svg, of, pick, refine, loop, plan, sync, restart, pose, says, fit, patterns: Object.keys(P)};
})();
