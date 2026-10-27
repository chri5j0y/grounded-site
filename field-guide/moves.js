// =====================================================================
// GROUNDED FIELD GUIDE (TM): Moves, the animated figures of the Tending workout player (GWG BLD 841, color and new moves BLD 857).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// A simple rounded line figure shows each move on screen while the voice coaches.
//   GGMoves.svg(pattern, opts): an inline SVG string, 240 by 240, looping with SMIL.
//     opts: {size: px (default 160), still: true for one held pose, pose: a key pose number to hold,
//       flip: true to mirror the figure and its gear (the left side), label: the spoken name, speed: 1 is the
//       pattern's own pace, 2 twice as fast}.
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

function frames(P, still, pose){
  const K = poses(P), pins = pinsOf(P, P.pr ? Object.assign({}, BASE[P.v], P.pr) : K[0]);
  if (pose != null) return [place(P, K[Math.max(0, Math.min(K.length - 1, pose | 0))], pins)];
  if (still){
    const p = P.sp != null ? (Number.isInteger(P.sp) ? K[P.sp] : blend(K[0], K[1], P.sp)) : blend(K[0], K[1 % K.length], 0.5);
    return [place(P, p, pins)];
  }
  // Dense frames (about 48 a loop) with an eased curve give a smooth, lively motion; each key pose holds a beat.
  const n = K.length, per = Math.max(12, Math.round(48 / n)), F = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < per; j++){
    const u = j / per, v = P.e === 'lin' ? u : ease(Math.min(1, u * 1.12));
    F.push(place(P, blend(K[i], K[(i + 1) % n], v, P.raw), pins));
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
  return `<animate attributeName="${attr}" dur="${dur}s" repeatCount="indefinite" values="${F.map(f).join(';')}"/>`;
}

// A dumbbell: a steel handle and two colored plates, carried at a hand.
function dumbbell(F, k, dur, op){
  const at = J => r1(J[k][0]) + ' ' + r1(J[k][1]);
  const mv = F.length === 1 ? '' : `<animateTransform attributeName="transform" type="translate" dur="${dur}s" repeatCount="indefinite" values="${F.map(at).join(';')}"/>`;
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
  'hip-flexor': {v: 's', an: ['rK', 98, 204], bg: G.couch, d: 3, pin: {lA: [0]},
    k: [{rl: [-10, -150, 180], ll: [88, 0, 90], ra: [36, 44], la: [36, 44]}, {rl: [-34, -150, 180], ll: [88, 0, 90], ra: [42, 50], la: [42, 50]}]},
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
// The far leg of a crossed seat is drawn mirrored by hand where the view keeps absolute angles.
P.twist.k.forEach(k => { k.rl = [76, -97, -90]; k.ll = [-76, 97, 90]; });
P.twist.pin = null;
P['hip-switch'].k.forEach(k => { k.sw = 15; k.hw = 9; });

// Keywords, in order: the first that matches wins.
const KW = [
  [/cat ?cow/, 'cat-cow'], [/child/, 'child-pose'], [/couch|hip flexor/, 'hip-flexor'], [/figure ?(4|four)|pigeon/, 'figure-4'],
  [/90\/90|hip switch|windshield/, 'hip-switch'], [/hanging (knee|leg)|knee raise|knees? to chest/, 'knee-raise'], [/dead ?hang|\bhang/, 'hang'], [/pull ?ups?|chin ?ups?|pullups|chinups/, 'pull-up'],
  [/hollow/, 'hollow'], [/reverse crunch/, 'reverse-crunch'], [/leg raise/, 'leg-raise'], [/dead ?bugs?|crunch/, 'dead-bug'],
  [/y.?t raise|reverse fly|rear delt/, 'yt-raise'], [/chest.?supported/, 'chest-row'], [/bird ?dogs?/, 'bird-dog'],
  [/side plank.*reach|reach.?through|thread the needle/, 'reach-through'], [/side plank/, 'side-plank'], [/pull.?through/, 'pull-through'], [/plank/, 'plank'],
  [/fast push|plyo push|explosive push/, 'fast-push-up'], [/push ?ups?|pushups|press ?ups?/, 'push-up'], [/push press/, 'push-press'],
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
  const id = P[pattern] ? pattern : of(pattern), M = P[id], dur = r1((M.d || 2.6) / (+opts.speed > 0 ? +opts.speed : 1)), size = opts.size || 160;
  const F = frames(M, !!opts.still || reduced(), opts.pose), side = M.v === 's';
  const far = op => op ? ` style="opacity:var(--ggm-far,${op})"` : '';
  const line = (k, op) => `<polyline points="${pts(F[0], SEG[k])}"${far(op)}>${anim(F, 'points', J => pts(J, SEG[k]), dur)}</polyline>`;
  const db = k => M.db && M.db.includes(k[0]) ? dumbbell(F, k, dur, side && k[0] === 'l' ? '.42' : '') : '';
  const head = `<circle r="${L.hr}" cx="${r1(F[0].head[0])}" cy="${r1(F[0].head[1])}" fill="currentColor" stroke="none">${anim(F, 'cx', J => r1(J.head[0]), dur)}${anim(F, 'cy', J => r1(J.head[1]), dur)}</circle>`;
  // A soft shadow on the floor follows the hips, so the figure stands on the ground of a stage.
  const sx = J => r1(J.hip[0]), srx = J => r1(Math.max(16, 30 - Math.max(0, 150 - J.hip[1]) * 0.12));
  const shadow = `<ellipse cx="${sx(F[0])}" cy="213" rx="${srx(F[0])}" ry="4.5" fill="currentColor" stroke="none" style="color:var(--ggm-shadow,currentColor);opacity:var(--ggm-shadow-op,0)">${anim(F, 'cx', sx, dur)}${anim(F, 'rx', srx, dur)}</ellipse>`;
  let body;
  if (side) body = line('la', '.42') + db('lH') + line('ll', '.42') + line('sp') + line('rl') + line('ra') + db('rH') + head;
  else body = line('ll') + line('rl') + line('hpb') + line('sp') + line('shb') + line('la') + line('ra') + db('lH') + db('rH') + head;
  const label = escA(opts.label || id.replace(/-/g, ' '));
  const flip = opts.flip ? ' transform="translate(240 0) scale(-1 1)"' : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="${size}" height="${size}" role="img" aria-label="${label}" class="gg-move${opts.flip ? ' gg-flip' : ''}" data-move="${id}">` +
    `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${flip}>` +
    `<path d="M14 212H226" stroke-width="3" style="opacity:var(--ggm-ground-op,.22)"/>${shadow}${M.bg || ''}<g stroke-width="9" style="color:var(--ggm-ink,currentColor)">${body}</g></g></svg>`;
}

// For a step that names a pattern itself (the Daily Practice), keep a specific pattern, and let a plain
// "standing" or "seat" give way to a better match for the step's name.
function pick(fig, name){
  const f = fig && P[fig] ? fig : null, n = name ? of(name) : 'standing';
  if (!f) return n;
  return (f === 'standing' || f === 'seat') && n !== 'standing' && n !== 'seat' ? n : f;
}

window.GGMoves = {svg, of, pick, patterns: Object.keys(P)};
})();
