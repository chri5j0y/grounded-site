// =====================================================================
// GROUNDED FIELD GUIDE (TM): Stage, the set and setting behind every Tending player (GWG BLD 857).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// A scene panel: a sky that follows the hour (a gold sun rising through a bright blue-white morning, warmer
// light toward evening, dusk and stars at night), soft light rays, rolling hills, and a wooden deck the figure
// stands on. Each state has its own color, so a glance tells work from rest, the next move, or the last set.
//
//   GGStage.scene(state, opts): an HTML string, the full panel. The root carries data-ggstage.
//     state: 'work', 'rest', 'next', 'breathe', 'last', 'done', 'cook', 'med', 'practice'.
//     opts: {
//       hour: 0 to 23 (decimals welcome; default the clock now),
//       pct: 0 to 1, the rest left: a ring that drains (shown in 'rest', or in any state when given),
//       secs: whole seconds left, shown in the ring (60 and up shows as m:ss),
//       inhale, exhale: seconds; a breathing ring that grows on the inhale and shrinks on the exhale
//         (shown in 'breathe', or in any state when inhale is given), with Breathe In and Breathe Out,
//       fig: an HTML string placed center on the deck (a GGMoves svg, the candle, or nothing),
//       side: 'L' or 'R', a clear side badge in the top corner,
//       label: a short word or two shown in a pill in the top corner opposite the side badge,
//       fill: true to make the panel a backdrop that fills its positioned parent (position absolute, inset 0);
//         the player's content then sits above it with position relative and z-index 1.
//     }
//   GGStage.update(el, opts): in place and cheap (safe every 100 ms): opts.pct moves the ring, opts.secs
//     sets its number, opts.side changes the badge. el is the panel or any element holding one.
//   GGStage.colors(state, hour): {bg, fg, accent} for the current theme (light or dark): bg is a soft page
//     color for the player around the panel, fg the text color on bg, accent the state color for big
//     numbers, bars, and buttons (accent on bg reads at 4.5 to 1 or better).
//   GGStage.css: the stylesheet, injected once into the document by this file.
// The panel is 100 percent wide and sized for a 390 px phone first; it respects prefers-reduced-motion
// (no drifting, pulsing, or breathing animation; the rings still show the numbers) and the site's light
// and dark themes (data-theme on the root, or the system setting).
// =====================================================================
(function(){
'use strict';

// ---------- color helpers ----------
const hx = c => { c = c.replace('#', ''); return [0, 2, 4].map(i => parseInt(c.slice(i, i + 2), 16)); };
const toHex = a => '#' + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const mix = (a, b, u) => { const p = hx(a), q = hx(b); return toHex(p.map((v, i) => v + (q[i] - v) * u)); };

// The sky through the day: [hour, top, horizon, sun].
const SKY = [
  [0, '#0E1630', '#26294D', null], [4.5, '#16203F', '#3B3B66', null], [5.5, '#4B6DB2', '#FFC79C', '#FFB347'],
  [7, '#5FB3F2', '#FFE6B5', '#FFC22E'], [9, '#4FAEF4', '#E8F6FF', '#FFCB2E'], [12, '#45A6F0', '#EEF8FF', '#FFD84A'],
  [15, '#5BA8E4', '#F4F1E2', '#FFCF55'], [17.5, '#7AA2D6', '#FFD9A3', '#FFAD3A'], [19, '#675C9F', '#FFA472', '#FF8A3D'],
  [20.5, '#33355F', '#C47767', null], [22, '#141B36', '#2C2C50', null], [24, '#0E1630', '#26294D', null]
];
function skyAt(h){
  h = ((+h % 24) + 24) % 24;
  let i = 0; while (i < SKY.length - 2 && SKY[i + 1][0] <= h) i++;
  const a = SKY[i], b = SKY[i + 1], u = (h - a[0]) / (b[0] - a[0] || 1);
  const sun = a[3] && b[3] ? mix(a[3], b[3], u) : (a[3] || b[3] || null);
  return {top: mix(a[1], b[1], u), hor: mix(a[2], b[2], u), sun, h};
}
const SUNRISE = {top: '#7FB7E8', hor: '#FFD9B8'};
const DUSK = {top: '#231A3C', hor: '#B9757A'};

// State colors: [light accent, dark accent, a short name for the CSS class].
const ST = {
  work: ['#B83C0A', '#FF9A5C'], rest: ['#0F766E', '#4FD8C4'], next: ['#A35A00', '#FFC94D'], breathe: ['#1D64C2', '#8EC3FF'],
  last: ['#BE185D', '#FF7AAE'], done: ['#11763A', '#6EE29A'], cook: ['#A4431F', '#F5A57A'], med: ['#7A3FA8', '#CBA6F2'],
  practice: ['#3F7A3C', '#9FD394']
};
const stOf = s => ST[s] ? s : 'work';

function dark(){
  try {
    const t = document.documentElement.getAttribute('data-theme');
    if (t === 'dark') return true; if (t === 'light') return false;
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  } catch (e) { return false; }
}
function reduced(){ try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } }
const nowHour = () => { const d = new Date(); return d.getHours() + d.getMinutes() / 60; };
const hourOf = o => o && o.hour != null && isFinite(+o.hour) ? +o.hour : nowHour();

function bgOf(s, h, d){
  const eve = h >= 17 || h < 5, morn = h >= 5 && h < 12;
  const base = d ? (eve ? '#1A130F' : morn ? '#10161F' : '#141619') : (eve ? '#FFF5EA' : morn ? '#F5FAFF' : '#F8F8F4');
  return mix(base, ST[s][d ? 1 : 0], d ? 0.08 : 0.05);
}
function colors(state, hour){
  const s = stOf(state), h = hour != null && isFinite(+hour) ? ((+hour % 24) + 24) % 24 : nowHour(), d = dark();
  return {bg: bgOf(s, h, d), fg: d ? '#F4EEE4' : '#15202B', accent: ST[s][d ? 1 : 0]};
}

// ---------- the scene ----------
let N = 0;
const r1 = n => Math.round(n * 10) / 10;
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const C = 2 * Math.PI * 44;
const fmt = s => { s = Math.max(0, Math.round(+s || 0)); return s >= 60 ? Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0') : String(s); };

// Soft light rays turning slowly around a point.
function rays(x, y, n, len, col, op){
  let p = '';
  for (let i = 0; i < n; i++){
    const a = (i / n) * Math.PI * 2, w = Math.PI / n * 0.42;
    p += `M0 0L${r1(Math.cos(a - w) * len)} ${r1(Math.sin(a - w) * len)}L${r1(Math.cos(a + w) * len)} ${r1(Math.sin(a + w) * len)}Z`;
  }
  return `<g transform="translate(${r1(x)} ${r1(y)})"><g class="ggs-rays"><path d="${p}" fill="${col}" opacity="${op}"/></g></g>`;
}
const cloud = (x, y, s, op) => `<g class="ggs-cloud" opacity="${op}"><g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="34" ry="11" fill="#fff"/><ellipse cx="-12" cy="-8" rx="16" ry="11" fill="#fff"/><ellipse cx="10" cy="-11" rx="18" ry="13" fill="#fff"/></g></g>`;
function stars(seed, n){
  let s = '', k = seed;
  for (let i = 0; i < n; i++){ k = (k * 9301 + 49297) % 233280; const x = k / 233280 * 400; k = (k * 9301 + 49297) % 233280; const y = k / 233280 * 120;
    s += `<circle cx="${r1(x)}" cy="${r1(y + 6)}" r="${i % 3 ? 1 : 1.6}" fill="#FFF8E0" class="ggs-star" style="animation-delay:${(i % 7) * 0.6}s"/>`; }
  return s;
}

// The outdoor set: sky, sun or moon, rays, clouds, hills. Drawn in a 400 by 200 box whose bottom meets the deck.
function outdoors(id, sky, accent, state){
  const h = sky.h, up = h >= 5.5 && h <= 20.5, u = up ? (h - 5.5) / 15 : 0;
  const sx = 66 + 268 * u, sy = 186 - 150 * Math.sin(Math.PI * u);
  const glowC = sky.sun || '#FFF3C4', night = !up;
  let g = `<defs><linearGradient id="${id}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky.top}"/><stop offset=".72" stop-color="${sky.hor}"/><stop offset="1" stop-color="${mix(sky.hor, '#FFFFFF', 0.25)}"/></linearGradient>` +
    `<radialGradient id="${id}g"><stop offset="0" stop-color="${glowC}" stop-opacity=".85"/><stop offset=".35" stop-color="${glowC}" stop-opacity=".35"/><stop offset="1" stop-color="${glowC}" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="${id}a" cx="50%" cy="70%" r="55%"><stop offset="0" stop-color="${accent}" stop-opacity=".42"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient></defs>` +
    `<rect width="400" height="200" fill="url(#${id}k)"/>`;
  if (night) g += stars(7 + Math.round(h), 26) + `<circle cx="318" cy="46" r="15" fill="#F6F0DA"/><circle cx="326" cy="40" r="13" fill="${sky.top}" opacity=".9"/>`;
  else g += `<circle cx="${r1(sx)}" cy="${r1(sy)}" r="92" fill="url(#${id}g)"/>` + rays(sx, sy, 14, 260, glowC, h < 12 ? 0.2 : 0.13) + `<circle cx="${r1(sx)}" cy="${r1(sy)}" r="19" fill="${sky.sun}" class="ggs-sun"/>`;
  if (!night) g += cloud(70, 48, 1, 0.75) + cloud(300, 78, 0.8, 0.6);
  // The state wash: a soft glow of the state color rising behind the figure.
  g += `<ellipse cx="200" cy="200" rx="230" ry="150" fill="url(#${id}a)" class="ggs-wash"/>`;
  const far = mix(sky.hor, night ? '#1E2A3A' : '#8DB59A', night ? 0.6 : 0.5), near = mix(sky.hor, night ? '#16202C' : '#5E9A69', night ? 0.75 : 0.7);
  g += `<path d="M0 160C60 132 110 140 170 152C230 164 290 128 400 142V200H0Z" fill="${far}"/>` +
    `<path d="M0 182C80 164 150 176 210 182C280 189 340 166 400 172V200H0Z" fill="${near}"/>`;
  if (state === 'done') g += rays(200, 150, 18, 300, '#FFE08A', 0.28) + confetti();
  return g;
}
function confetti(){
  const cs = ['#FFC93C', '#FF7AAE', '#4FD8C4', '#8EC3FF', '#FF9A5C', '#6EE29A'];
  let s = '';
  for (let i = 0; i < 26; i++){ const x = 30 + (i * 67) % 340, y = 10 + (i * 37) % 110;
    s += `<rect x="${x}" y="${y}" width="8" height="13" rx="2.5" fill="${cs[i % cs.length]}" class="ggs-conf" style="animation-delay:${(i % 6) * 0.45}s" transform="rotate(${(i * 41) % 90 - 45} ${x + 3} ${y + 5})"/>`; }
  return s;
}

// The kitchen: a warm wall, a window on the hour's sky, a shelf, a counter, and a pot with steam.
function kitchen(id, sky){
  const wx = 226, sunX = wx + 14 + 66 * Math.max(0, Math.min(1, (sky.h - 5.5) / 15));
  return `<defs><linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F8E7CC"/><stop offset="1" stop-color="#F0D2A6"/></linearGradient>` +
    `<linearGradient id="${id}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky.top}"/><stop offset="1" stop-color="${sky.hor}"/></linearGradient>` +
    `<radialGradient id="${id}l" cx="50%" cy="0%" r="80%"><stop offset="0" stop-color="#FFF4D6" stop-opacity=".9"/><stop offset="1" stop-color="#FFF4D6" stop-opacity="0"/></radialGradient></defs>` +
    `<rect width="400" height="200" fill="url(#${id}w)"/><rect width="400" height="200" fill="url(#${id}l)"/>` +
    `<g><rect x="${wx}" y="34" width="104" height="80" rx="6" fill="url(#${id}k)"/>${sky.sun ? `<circle cx="${r1(sunX)}" cy="66" r="10" fill="${sky.sun}"/>` : `<circle cx="${wx + 76}" cy="54" r="7" fill="#F6F0DA"/>`}` +
    `<path d="M${wx + 52} 34V114M${wx} 74H${wx + 104}" stroke="#FFFDF7" stroke-width="5"/><rect x="${wx}" y="34" width="104" height="80" rx="6" fill="none" stroke="#FFFDF7" stroke-width="6"/><rect x="${wx - 8}" y="114" width="120" height="7" rx="3" fill="#C99A6A"/></g>` +
    `<path d="M74 74H194" stroke="#B5835A" stroke-width="6" stroke-linecap="round"/>` +
    `<g><rect x="84" y="50" width="18" height="24" rx="4" fill="#E9B44C"/><rect x="108" y="44" width="16" height="30" rx="4" fill="#7FB069"/><rect x="130" y="54" width="22" height="20" rx="5" fill="#E07A5F"/><circle cx="176" cy="62" r="11" fill="#5E9A69"/><path d="M176 51c-4-8 4-12 8-10" stroke="#5E9A69" stroke-width="3" fill="none"/></g>` +
    `<g><path d="M84 176h64l-6 22H90z" fill="#3C4A57"/><rect x="78" y="170" width="76" height="9" rx="4" fill="#4E5E6E"/>` +
    `<path class="ggs-steam" d="M100 162c-6-10 6-14 0-24M116 160c-6-10 6-14 0-24M132 162c-6-10 6-14 0-24" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none" opacity=".7"/></g>` +
    `<g><rect x="250" y="182" width="74" height="14" rx="4" fill="#D9A86C"/><circle cx="268" cy="180" r="7" fill="#E07A5F"/><circle cx="286" cy="181" r="6" fill="#F2A541"/><path d="M300 182c4-8 14-8 18 0z" fill="#7FB069"/></g>`;
}

// The meditation set: dusk, a few stars, a warm pool of candle light.
function dusk(id){
  return `<defs><linearGradient id="${id}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${DUSK.top}"/><stop offset=".75" stop-color="#5A3F66"/><stop offset="1" stop-color="${DUSK.hor}"/></linearGradient>` +
    `<radialGradient id="${id}c" cx="50%" cy="80%" r="55%"><stop offset="0" stop-color="#FFD58A" stop-opacity=".55"/><stop offset=".45" stop-color="#FFB35A" stop-opacity=".18"/><stop offset="1" stop-color="#FFB35A" stop-opacity="0"/></radialGradient></defs>` +
    `<rect width="400" height="200" fill="url(#${id}k)"/>${stars(11, 30)}` +
    `<path d="M0 170C90 150 160 166 230 172C300 178 350 160 400 164V200H0Z" fill="#3A2B48"/>` +
    `<ellipse cx="200" cy="190" rx="240" ry="160" fill="url(#${id}c)" class="ggs-wash"/>`;
}

// The done medal: a gold seal with a check.
const MEDAL = '<div class="ggs-medal"><svg viewBox="0 0 100 100"><defs><radialGradient id="ggsmd" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#FFE8A3"/><stop offset=".6" stop-color="#F4B728"/><stop offset="1" stop-color="#D99312"/></radialGradient></defs>' +
  '<circle cx="50" cy="50" r="44" fill="url(#ggsmd)" stroke="#FFF6D8" stroke-width="4"/><circle cx="50" cy="50" r="34" fill="none" stroke="#FFF6D8" stroke-width="2" opacity=".7"/><path d="M33 51l11 11 23-25" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';

function ringHTML(o, show){
  if (!show) return '';
  const pct = Math.max(0, Math.min(1, o.pct == null ? 1 : +o.pct));
  return `<div class="ggs-ring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" class="ggs-rt"/>` +
    `<circle cx="50" cy="50" r="44" class="ggs-rp" data-ggsarc stroke-dasharray="${r1(C)}" stroke-dashoffset="${r1(C * (1 - pct))}" transform="rotate(-90 50 50)"/></svg>` +
    (o.secs != null ? `<div class="ggs-secs" data-ggssecs>${esc(fmt(o.secs))}</div>` : '') + '</div>';
}
// BLD 898: o.phases ([{k: 'in' | 'out' | 'hold', d: seconds}], from GGMoves.plan) times the ring to the figure's own moves:
// it grows on in, shrinks on out, stays on hold, and shows Breathe In, Breathe Out, or Hold for each phase. Its loop is the
// figure's loop (data-dur), so the player restarts both together.
function phaseHTML(o, red){
  const P = o.phases.filter(p => p && +p.d > 0), T = P.reduce((a, p) => a + +p.d, 0), w = r1(T * 1000) / 1000;
  const lo = 26, hi = 46, r0 = P[0].k === 'out' ? hi : lo; let cur = r0, t = 0; const vs = [r0], kt = [0], st = [];
  P.forEach(p => { st.push(t / T); t += +p.d; cur = p.k === 'in' ? hi : p.k === 'out' ? lo : cur; vs.push(cur); kt.push(Math.min(1, t / T)); });
  const k4 = x => Math.round(x * 10000) / 10000, sp = kt.slice(1).map(() => '.45 0 .55 1').join(';');
  const an = red ? '' : `<animate attributeName="r" dur="${w}s" repeatCount="indefinite" values="${vs.join(';')}" keyTimes="${kt.map(k4).join(';')}" calcMode="spline" keySplines="${sp}"/>`;
  const has = k => P.some(p => p.k === k), first = P[0].k;
  const word = (t2, k) => !has(k) ? '' : `<g class="ggs-bwg" data-ggsbw="${k}"${red && k !== first ? ' opacity="0"' : ''}>${red ? '' : `<animate attributeName="opacity" dur="${w}s" repeatCount="indefinite" values="${P.map(p => p.k === k ? 1 : 0).join(';')}" keyTimes="${st.map(k4).join(';')}" calcMode="discrete"/>`}` +
    `<rect x="22" y="${o.fig ? -9 : 43}" width="56" height="14" rx="7" class="ggs-bwp"/><text x="50" y="${o.fig ? 1.6 : 53.6}" text-anchor="middle" class="ggs-bw">${t2}</text></g>`;
  const rr = red ? 38 : r0;
  return `<div class="ggs-breath${o.fig ? ' wf' : ''}"><svg viewBox="0 0 100 100" aria-hidden="true" class="ggs-brs" data-ggsbr data-dur="${w}" data-ph="${P.map(p => p.k + ':' + r1(+p.d * 100) / 100).join(' ')}">` +
    `<circle cx="50" cy="50" r="${rr}" class="ggs-bf">${an}</circle><circle cx="50" cy="50" r="${rr}" class="ggs-bs">${an}</circle>` +
    (o.secs != null && !o.fig ? '' : word('Breathe In', 'in') + word('Hold', 'hold') + word('Breathe Out', 'out')) + '</svg>' +
    (o.secs != null && !o.fig ? `<div class="ggs-secs" data-ggssecs>${esc(fmt(o.secs))}</div>` : '') + '</div>';
}
function breathHTML(o, red){
  if (Array.isArray(o.phases) && o.phases.some(p => p && +p.d > 0)) return phaseHTML(o, red);
  const i = Math.max(1, +o.inhale || 4), e = Math.max(1, +o.exhale || +o.inhale || 6), T = i + e, f = r1(i / T * 1000) / 1000;
  const an = (attr, a, b) => red ? '' : `<animate attributeName="${attr}" dur="${T}s" repeatCount="indefinite" values="${a};${b};${a}" keyTimes="0;${f};1" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1"/>`;
  const word = (t, on) => `<g class="ggs-bwg"${red && !on ? ' opacity="0"' : ''}>${red ? '' : `<animate attributeName="opacity" dur="${T}s" repeatCount="indefinite" values="${on ? '1;0' : '0;1'}" keyTimes="0;${f}" calcMode="discrete"/>`}` +
    `<rect x="22" y="${o.fig ? -9 : 43}" width="56" height="14" rx="7" class="ggs-bwp"/><text x="50" y="${o.fig ? 1.6 : 53.6}" text-anchor="middle" class="ggs-bw">${t}</text></g>`;
  return `<div class="ggs-breath${o.fig ? ' wf' : ''}"><svg viewBox="0 0 100 100" aria-hidden="true">` +
    `<circle cx="50" cy="50" r="${red ? 38 : 26}" class="ggs-bf">${an('r', 26, 46)}</circle><circle cx="50" cy="50" r="${red ? 38 : 26}" class="ggs-bs">${an('r', 26, 46)}</circle>` +
    (o.secs != null && !o.fig ? '' : word('Breathe In', true) + word('Breathe Out', false)) + '</svg>' +
    (o.secs != null && !o.fig ? `<div class="ggs-secs" data-ggssecs>${esc(fmt(o.secs))}</div>` : '') + '</div>';
}

function scene(state, opts){
  const o = opts || {}, s = stOf(state), h = hourOf(o), id = 'ggs' + (++N), red = reduced();
  const sky = skyAt(h), lightA = ST[s][0];
  let set, deck = 'deck';
  if (s === 'cook'){ set = kitchen(id, sky); deck = 'counter'; }
  else if (s === 'med'){ set = dusk(id); deck = 'floor'; }
  else if (s === 'practice'){ const k = {top: mix(sky.top, SUNRISE.top, 0.45), hor: mix(sky.hor, SUNRISE.hor, 0.45), sun: sky.sun || '#FFC79C', h: sky.sun ? h : 6.4}; set = outdoors(id, k, lightA, s); deck = 'meadow'; }
  else set = outdoors(id, sky, lightA, s);
  const tod = h >= 5 && h < 12 ? 'morning' : h >= 12 && h < 17 ? 'day' : h >= 17 && h < 21 ? 'evening' : 'night';
  const showRing = s === 'rest' || o.pct != null, showBreath = s === 'breathe' || o.inhale != null || (Array.isArray(o.phases) && o.phases.length > 0);
  const side = o.side === 'L' || o.side === 'R' ? `<div class="ggs-side" data-ggsside><b>${o.side}</b><span>${o.side === 'L' ? 'Left Side' : 'Right Side'}</span></div>` : '<div class="ggs-side" data-ggsside hidden></div>';
  const label = o.label ? `<div class="ggs-lab">${esc(o.label)}</div>` : '';
  const fig = o.fig ? `<div class="ggs-fig${showRing && s === 'rest' ? ' small' : ''}">${o.fig}</div>` : '';
  const mid = (showBreath ? breathHTML(o, red) : '') + (s === 'done' && !o.fig ? MEDAL : '');
  const ring = showRing ? ringHTML(o, true) : '';
  const scrimOp = s === 'med' ? 0.15 : tod === 'night' ? 0.2 : 0.42;
  return `<div class="ggs ggs-${s} ggs-${tod} ggs-on-${deck}${o.fill ? ' ggs-fill' : ''}${red ? ' ggs-still' : ''}" data-ggstage="${s}" style="--ggs-a:${lightA};--ggs-ad:${ST[s][1]};--ggs-scrim:${scrimOp};--ggs-bgl:${bgOf(s, h, false)};--ggs-bgd:${bgOf(s, h, true)}" aria-hidden="true">` +
    `<svg class="ggs-sky" viewBox="0 0 400 200" preserveAspectRatio="xMidYMax slice">${set}</svg>` +
    `<div class="ggs-deck"></div><div class="ggs-tint"></div><div class="ggs-scrim"></div>` +
    `<div class="ggs-mid${fig ? ' hasfig' : ''}">${mid}${s === 'rest' ? ring + fig : fig + ring}</div>${side}${label}</div>`;
}

function update(el, opts){
  if (!el) return; const o = opts || {};
  const root = el.matches && el.matches('[data-ggstage]') ? el : el.querySelector && el.querySelector('[data-ggstage]');
  if (!root) return;
  const c = root.__ggs || (root.__ggs = {arc: root.querySelector('[data-ggsarc]'), secs: root.querySelector('[data-ggssecs]'), side: root.querySelector('[data-ggsside]'), p: null, s: null, sd: null});
  if (o.pct != null && c.arc){ const v = r1(C * (1 - Math.max(0, Math.min(1, +o.pct)))); if (v !== c.p){ c.p = v; c.arc.setAttribute('stroke-dashoffset', v); } }
  if (o.secs != null && c.secs){ const t = fmt(o.secs); if (t !== c.s){ c.s = t; c.secs.textContent = t; } }
  if (o.side !== undefined && c.side && o.side !== c.sd){ c.sd = o.side;
    if (o.side === 'L' || o.side === 'R'){ c.side.hidden = false; c.side.innerHTML = `<b>${o.side}</b><span>${o.side === 'L' ? 'Left Side' : 'Right Side'}</span>`; } else c.side.hidden = true; }
}

// ---------- the stylesheet ----------
const D1 = ':root[data-theme="dark"]', D2 = ':root:not([data-theme="light"])';
const dk = rules => `${rules.replace(/&/g, D1)}\n@media (prefers-color-scheme: dark){${rules.replace(/&/g, D2)}}`;
const CSS = `
.ggs{--H:clamp(236px,64vw,340px);--dk:calc(var(--H) * .25);--fs:min(214px,56vw,calc(var(--H) * .8));position:relative;width:100%;height:var(--H);border-radius:22px;overflow:hidden;isolation:isolate;
  --ggm-ink:#1B2836;--ggm-far:.45;--ggm-gear:#5B6B7E;--ggm-gear-op:.9;--ggm-db:var(--ggs-a);--ggm-steel:#46525F;--ggm-mat:var(--ggs-a);--ggm-mat-op:.55;--ggm-ground-op:0;--ggm-shadow:#1B2836;--ggm-shadow-op:.22;
  box-shadow:0 1px 0 rgba(0,0,0,.04),0 12px 30px rgba(20,40,70,.16);margin:0 auto;}
.ggs.ggs-fill{position:absolute;inset:0;height:auto;border-radius:0;box-shadow:none;z-index:0;background:var(--ggs-bgl);}
.ggs.ggs-fill .ggs-mid{bottom:auto;top:0;height:var(--H);}
.ggs-sky{position:absolute;left:0;right:0;top:0;bottom:var(--dk);width:100%;height:calc(100% - var(--dk));display:block;}
.ggs.ggs-fill .ggs-sky{bottom:auto;height:calc(var(--H) - var(--dk));}
.ggs-deck{position:absolute;left:0;right:0;bottom:0;height:var(--dk);
  background:linear-gradient(180deg,rgba(255,255,255,.35),rgba(255,255,255,0) 30%),repeating-linear-gradient(180deg,#E6C596 0 9px,#D8B07B 9px 10px);}
.ggs.ggs-fill .ggs-deck{top:calc(var(--H) - var(--dk));bottom:auto;height:var(--dk);}
.ggs.ggs-fill .ggs-tint,.ggs.ggs-fill .ggs-scrim{bottom:auto;height:var(--H);}
.ggs.ggs-fill::after{display:none;}
.ggs-evening .ggs-deck{background:linear-gradient(180deg,rgba(255,220,180,.3),rgba(255,255,255,0) 30%),repeating-linear-gradient(180deg,#DDB384 0 9px,#C99A66 9px 10px);}
.ggs-night .ggs-deck{background:repeating-linear-gradient(180deg,#6F5B49 0 9px,#5E4C3D 9px 10px);}
.ggs-on-meadow .ggs-deck{background:linear-gradient(180deg,#9CCB7E,#7DB463);}
.ggs-on-counter .ggs-deck{background:linear-gradient(180deg,#B57A4A 0 14%,#8C5A35 14% 100%);}
.ggs-on-floor .ggs-deck{background:linear-gradient(180deg,#4A3550,#33243B);}
.ggs-deck::after{content:"";position:absolute;left:50%;top:22%;width:min(78%,300px);height:22%;transform:translateX(-50%);border-radius:50%;background:var(--ggs-a);opacity:.22;}
.ggs-on-counter .ggs-deck::after,.ggs-on-floor .ggs-deck::after{opacity:0;}
.ggs-scrim{position:absolute;inset:0;background:#06090F;opacity:0;pointer-events:none;}
.ggs-tint{position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,var(--ggs-a) 160%);opacity:.5;pointer-events:none;}
.ggs-cook .ggs-tint,.ggs-med .ggs-tint,.ggs-practice .ggs-tint{opacity:.25;}
.ggs::after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 0 0 4px var(--ggs-a);pointer-events:none;z-index:6;}
.ggs-last::after{box-shadow:inset 0 0 0 6px var(--ggs-a);}
.ggs-medal{position:absolute;left:50%;top:50%;width:min(130px,34vw,calc(var(--H) * .46));aspect-ratio:1;transform:translate(-50%,-62%);z-index:3;animation:ggspop .7s cubic-bezier(.2,1.4,.4,1) both;filter:drop-shadow(0 6px 12px rgba(0,0,0,.18));}
.ggs-medal svg{width:100%;height:100%;display:block;}
@keyframes ggspop{from{transform:translate(-50%,-62%) scale(.4);opacity:0;}to{transform:translate(-50%,-62%) scale(1);opacity:1;}}
.ggs-mid{position:absolute;left:0;right:0;top:0;bottom:0;}
.ggs-fig{position:absolute;left:50%;width:var(--fs);transform:translateX(-50%);bottom:calc(var(--dk) * .5 - var(--fs) * .118);z-index:2;}
.ggs-fig svg{width:100%;height:auto;display:block;}
.ggs-fig.small{--fs:min(120px,32vw);opacity:.85;}
.ggs-med .ggs-fig,.ggs-cook .ggs-fig{--fs:min(150px,40vw);bottom:calc(var(--dk) * .45);}
.ggs .hj-fig{width:100%;margin:0;}
.ggs .hj-candle{width:auto;margin:0;display:flex;justify-content:center;}
.ggs .hj-candle svg,.ggs-med .ggs-fig>svg{height:calc(var(--H) * .56);width:auto;margin:0 auto;}
.ggs-ring{position:absolute;left:50%;top:50%;width:min(190px,50vw,calc(var(--H) * .7));aspect-ratio:1;transform:translate(-50%,-56%);z-index:3;}
.ggs-mid.hasfig .ggs-ring{width:min(96px,26vw);top:auto;left:auto;right:14px;bottom:14px;transform:none;}
.ggs-rest .ggs-mid.hasfig .ggs-ring{width:min(190px,50vw,calc(var(--H) * .7));left:50%;top:50%;right:auto;bottom:auto;transform:translate(-50%,-56%);}
.ggs-rest .ggs-fig.small{bottom:calc(var(--dk) * .3 - var(--fs) * .118);left:auto;right:6px;transform:none;}
.ggs-ring svg{width:100%;height:100%;display:block;}
.ggs-rt{fill:rgba(255,255,255,.82);stroke:rgba(255,255,255,.55);stroke-width:8;}
.ggs-rp{fill:none;stroke:var(--ggs-a);stroke-width:8;stroke-linecap:round;transition:stroke-dashoffset .12s linear;}
.ggs-secs{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed','Barlow',sans-serif;font-weight:700;font-size:clamp(34px,11vw,58px);color:#13202C;font-variant-numeric:tabular-nums;line-height:1;}
.ggs-mid.hasfig:not(.ggs-rest *) .ggs-secs{font-size:clamp(22px,6vw,30px);}
.ggs-breath{position:absolute;left:50%;top:50%;width:min(210px,56vw,calc(var(--H) * .78));aspect-ratio:1;transform:translate(-50%,-56%);z-index:1;}
.ggs-breath.wf{width:min(260px,68vw,calc(var(--H) * .95));transform:translate(-50%,-52%);}
.ggs-breath svg{width:100%;height:100%;display:block;overflow:visible;}
.ggs-bf{fill:#FFFFFF;opacity:.5;}.ggs-bs{fill:none;stroke:var(--ggs-a);stroke-width:3;opacity:.9;}
.ggs-breath.wf .ggs-bf{opacity:.38;}
.ggs-bw{font-family:'Barlow',sans-serif;font-weight:700;font-size:7.6px;fill:#13202C;letter-spacing:.02em;}
.ggs-bwp{fill:rgba(255,255,255,.92);}
.ggs-breath.wf .ggs-bwg{transform:translateY(2px);}
.ggs-breath .ggs-secs{color:#13202C;}
.ggs-side{position:absolute;top:12px;left:12px;display:flex;align-items:center;gap:8px;padding:5px 12px 5px 5px;border-radius:999px;background:rgba(255,255,255,.92);color:#13202C;font:700 15px/1 'Barlow',sans-serif;z-index:4;box-shadow:0 2px 8px rgba(0,0,0,.12);}
.ggs-side[hidden]{display:none;}
.ggs-side b{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:var(--ggs-a);color:#fff;font-size:20px;}
.ggs-lab{position:absolute;top:12px;right:12px;padding:7px 12px;border-radius:999px;background:var(--ggs-a);color:#fff;font:700 14px/1 'Barlow',sans-serif;letter-spacing:.02em;z-index:4;max-width:46%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.ggs-rays{animation:ggsspin 90s linear infinite;}
.ggs-sun{animation:ggssun 5s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}
.ggs-cloud{animation:ggscloud 38s ease-in-out infinite alternate;}
.ggs-cloud+.ggs-cloud{animation-duration:52s;animation-direction:alternate-reverse;}
.ggs-star{animation:ggstw 3.6s ease-in-out infinite;}
.ggs-steam{animation:ggssteam 2.8s ease-in-out infinite;}
.ggs-last .ggs-wash{animation:ggspulse 1.4s ease-in-out infinite;}
.ggs-last .ggs-deck::after{animation:ggspulse 1.4s ease-in-out infinite;opacity:.38;}
.ggs-next .ggs-wash{animation:ggspulse 3s ease-in-out infinite;}
.ggs-conf{animation:ggsconf 2.7s ease-in-out infinite;transform-box:fill-box;}
.ggs-done .ggs-rays{animation-duration:40s;}
@keyframes ggsspin{to{transform:rotate(360deg);}}
@keyframes ggssun{0%,100%{transform:scale(1);}50%{transform:scale(1.07);}}
@keyframes ggscloud{from{transform:translateX(-14px);}to{transform:translateX(18px);}}
@keyframes ggstw{0%,100%{opacity:.35;}50%{opacity:1;}}
@keyframes ggssteam{0%{opacity:0;transform:translateY(6px);}40%{opacity:.75;}100%{opacity:0;transform:translateY(-12px);}}
@keyframes ggspulse{0%,100%{opacity:.75;}50%{opacity:1;}}
@keyframes ggsconf{0%{opacity:0;transform:translateY(-8px);}25%{opacity:1;}100%{opacity:0;transform:translateY(26px);}}
.ggs-still .ggs-rays,.ggs-still .ggs-sun,.ggs-still .ggs-cloud,.ggs-still .ggs-star,.ggs-still .ggs-steam,.ggs-still .ggs-wash,.ggs-still .ggs-deck::after,.ggs-still .ggs-conf{animation:none!important;}
@media (prefers-reduced-motion: reduce){.ggs *,.ggs .ggs-deck::after{animation:none!important;transition:none!important;}}
${dk(`& .ggs{--ggm-ink:#FFF6E8;--ggm-far:.5;--ggm-gear:#B9C4D2;--ggm-steel:#D7DEE6;--ggm-db:var(--ggs-ad);--ggm-mat:var(--ggs-ad);--ggm-mat-op:.5;--ggm-shadow:#000;--ggm-shadow-op:.4;box-shadow:0 12px 30px rgba(0,0,0,.4);}
& .ggs-scrim{opacity:var(--ggs-scrim);}& .ggs.ggs-fill{background:var(--ggs-bgd);}
& .ggs-rt{fill:rgba(14,18,26,.8);stroke:rgba(255,255,255,.18);}
& .ggs-rp{stroke:var(--ggs-ad);}
& .ggs-secs,& .ggs-breath .ggs-secs{color:#FFF6E8;}
& .ggs-bf{fill:#0E121A;}& .ggs-bs{stroke:var(--ggs-ad);}
& .ggs-bw{fill:#FFF6E8;}& .ggs-bwp{fill:rgba(14,18,26,.88);}
& .ggs-side{background:rgba(14,18,26,.88);color:#FFF6E8;}
& .ggs-side b{background:var(--ggs-ad);color:#14100C;}
& .ggs-lab{background:var(--ggs-ad);color:#14100C;}
& .ggs-deck::after{background:var(--ggs-ad);}
& .ggs::after{box-shadow:inset 0 0 0 4px var(--ggs-ad);}& .ggs-last::after{box-shadow:inset 0 0 0 6px var(--ggs-ad);}
& .ggs-tint{background:linear-gradient(180deg,transparent 30%,var(--ggs-ad) 170%);opacity:.4;}`)}
`;
(function(){ try { if (document.getElementById('ggs-css')) return; const s = document.createElement('style'); s.id = 'ggs-css'; s.textContent = CSS; (document.head || document.documentElement).appendChild(s); } catch (e) {} })();

window.GGStage = {scene, update, colors, css: CSS, states: Object.keys(ST)};
})();
