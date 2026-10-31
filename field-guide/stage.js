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
//       inhale, exhale: seconds; the breath guide, a small tree whose canopy fills with golden light on the inhale and
//         lets it flow down to glowing roots on the exhale (BLD 897; shown in 'breathe', or in any state when inhale is
//         given), with Breathe In and Breathe Out; phases: the same timed by the figure's plan (BLD 898),
//       fig: an HTML string placed center on the deck (a GGMoves svg, the candle, or nothing),
//       side: 'L' or 'R', a clear side badge in the top corner,
//       label: a short word or two shown in a chip in the top corner (with the count, under it),
//       count: {n, of} (BLD 897): the rep numeral on an ink chip, top right, with an ink progress line along the bottom
//         that has a mark for each rep (data-hjrep on the numeral, so the player's count updates it in place),
//       fill: true to make the panel a backdrop that fills its positioned parent (position absolute, inset 0);
//         the player's content then sits above it with position relative and z-index 1.
//       med: {art, src, lg, since} (BLD 899): the meditation stage. The day's painting fills the panel, set by shared/med-stage.json
//         (src and lg here are used until that file arrives or when it has no entry); a painted flame gets a soft flicker drawn
//         over it, and a painting with no candle gets a painted-style candle in its foreground. The glow breathes with phases,
//         or inhale and exhale, on the player's one clock; otherwise once each 5.5 seconds. since: when the player opened.
//     }
//   GGStage.update(el, opts): in place and cheap (safe every 100 ms): opts.pct moves the ring, opts.secs
//     sets its number, opts.side changes the badge, opts.rep sets the count and its progress line (BLD 897). el is the panel or any element holding one.
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
// BLD 897 (Chris, October 31, 2026, the breath guide "1": the tree): the breath guide is a small tree. On the in breath its canopy
// fills with golden light and rises; on the out breath the light flows down the trunk to glowing roots; on a hold it rests.
// The lettering under it says Breathe In, Breathe Out, or Hold. o.phases ([{k: 'in' | 'out' | 'hold', d: seconds}], from
// GGMoves.plan, BLD 898) times it to the figure's own moves; its loop is the figure's loop (data-dur), so the player's one clock
// holds both together. The canopy's light (a circle whose radius grows on in) carries the timing the tests read.
// With a figure it sits top left on a frosted chip; without one (a breathing step) it stands larger in the middle.
// Reduced motion shows the tree still with the word only.
function treeHTML(o, red, P, mark){
  P = P.filter(p => p && +p.d > 0);
  const T = P.reduce((a, p) => a + +p.d, 0), w = r1(T * 1000) / 1000, id = 'ggt' + (++N);
  // The breath level at each turn (0 empty, 1 full): in fills, out empties, hold keeps.
  let lv = P[0].k === 'out' ? 1 : P[0].k === 'in' ? 0 : 1, t = 0; const L = [lv], kt = [0], st = [];
  P.forEach(p => { st.push(t / T); t += +p.d; lv = p.k === 'in' ? 1 : p.k === 'out' ? 0 : lv; L.push(lv); kt.push(Math.min(1, t / T)); });
  const k4 = x => Math.round(x * 10000) / 10000, sp = kt.slice(1).map(() => '.45 0 .55 1').join(';'), KT = kt.map(k4).join(';');
  const an = (attr, f, extra) => red ? '' : `<animate attributeName="${attr}" dur="${w}s" repeatCount="indefinite" values="${L.map(f).join(';')}" keyTimes="${KT}" calcMode="spline" keySplines="${sp}"${extra || ''}/>`;
  const L0 = red ? 1 : L[0], R = l => r1(24 + 16 * l), RISE = l => '0 ' + r1(-4 * l), ROOT = l => r1(.18 + .82 * (1 - l) * (1 - l)), FLOW = l => r1(1 - l);
  const has = k => P.some(p => p.k === k), first = P[0].k, label = !(o.secs != null && !o.fig);
  const word = (txt, k) => !has(k) ? '' : `<g class="ggs-bwg" data-ggsbw="${k}"${red && k !== first ? ' opacity="0"' : ''}>${red ? '' : `<animate attributeName="opacity" dur="${w}s" repeatCount="indefinite" values="${P.map(p => p.k === k ? 1 : 0).join(';')}" keyTimes="${st.map(k4).join(';')}" calcMode="discrete"/>`}` +
    `<text x="60" y="141" text-anchor="middle" class="ggs-bw">${txt}</text></g>`;
  return `<div class="ggs-breath ggs-tree${o.fig ? ' wf' : ''}"><svg viewBox="0 0 120 ${label ? 148 : 112}" aria-hidden="true" class="ggs-brs"${mark ? ` data-ggsbr data-dur="${w}" data-ph="${P.map(p => p.k + ':' + r1(+p.d * 100) / 100).join(' ')}"` : ''}>` +
    `<defs><radialGradient id="${id}c" cx="50%" cy="46%" r="58%"><stop offset="0" stop-color="#FFEBB0"/><stop offset=".62" stop-color="#F3C867"/><stop offset="1" stop-color="#D9A441" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="${id}t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="ggs-tink"/><stop offset="${FLOW(L0)}" stop-color="#F6C96A">${an('offset', FLOW)}</stop><stop offset="1" class="ggs-tink"/></linearGradient></defs>` +
    `<g class="ggs-troots"><path d="M60 92c-6 6-14 9-24 10M60 92c5 7 13 10 22 11M60 92c-1 8-4 13-8 17M60 92c2 7 5 12 10 15"/></g>` +
    `<g class="ggs-trootg" opacity="${ROOT(L0)}">${an('opacity', ROOT)}<path d="M60 92c-6 6-14 9-24 10M60 92c5 7 13 10 22 11M60 92c-1 8-4 13-8 17M60 92c2 7 5 12 10 15"/></g>` +
    `<path class="ggs-ttrunk" d="M56 94c2-12 1-24-2-34M64 94c-2-12-1-24 2-34" stroke="url(#${id}t)"/>` +
    `<g class="ggs-tcan">${red ? '' : `<animateTransform attributeName="transform" type="translate" dur="${w}s" repeatCount="indefinite" values="${L.map(RISE).join(';')}" keyTimes="${KT}" calcMode="spline" keySplines="${sp}"/>`}` +
    `<circle cx="60" cy="45" r="${R(L0)}" fill="url(#${id}c)" class="ggs-bf">${an('r', R)}</circle>` +
    `<path class="ggs-tcrown" d="M24 52c-6-16 8-28 20-26 2-12 22-18 32-8 12-4 26 6 22 20 10 6 6 24-8 24-6 10-22 10-30 4-10 6-26 2-30-8-8 0-10-4-6-6z"/></g>` +
    `<path class="ggs-tground" d="M18 95c18-3 66-3 84 0"/>` +
    (label ? word('Breathe In', 'in') + word('Hold', 'hold') + word('Breathe Out', 'out') : '') + '</svg>' +
    (label ? '' : `<div class="ggs-secs" data-ggssecs>${esc(fmt(o.secs))}</div>`) + '</div>';
}
function phaseHTML(o, red){ return treeHTML(o, red, o.phases, true); }
function breathHTML(o, red){
  if (Array.isArray(o.phases) && o.phases.some(p => p && +p.d > 0)) return phaseHTML(o, red);
  const i = Math.max(1, +o.inhale || 4), e = Math.max(1, +o.exhale || +o.inhale || 6);
  return treeHTML(o, red, [{k: 'in', d: i}, {k: 'out', d: e}], false);
}

function scene(state, opts){
  const o = opts || {}, s = stOf(state), h = hourOf(o), id = 'ggs' + (++N), red = reduced();
  const sky = skyAt(h), lightA = ST[s][0];
  let set, deck = 'deck';
  if (s === 'cook'){ set = kitchen(id, sky); deck = 'counter'; }
  else if (s === 'med'){ set = dusk(id); deck = 'floor'; }
  else if (s === 'practice'){ const k = {top: mix(sky.top, SUNRISE.top, 0.45), hor: mix(sky.hor, SUNRISE.hor, 0.45), sun: sky.sun || '#FFC79C', h: sky.sun ? h : 6.4}; set = outdoors(id, k, lightA, s); deck = 'meadow'; }
  else set = outdoors(id, sky, lightA, s);
  const ml = o.med && typeof o.med === 'object' ? medHTML(o.med, o, id, red) : '';
  if (ml){ set = dusk(id); deck = 'floor'; if (!red) setTimeout(flKick, 30); }
  const tod = h >= 5 && h < 12 ? 'morning' : h >= 12 && h < 17 ? 'day' : h >= 17 && h < 21 ? 'evening' : 'night';
  const showRing = s === 'rest' || o.pct != null, showBreath = s === 'breathe' || o.inhale != null || (Array.isArray(o.phases) && o.phases.length > 0);
  const side = o.side === 'L' || o.side === 'R' ? `<div class="ggs-side" data-ggsside><b>${o.side}</b><span>${o.side === 'L' ? 'Left Side' : 'Right Side'}</span></div>` : '<div class="ggs-side" data-ggsside hidden></div>';
  const cn = o.count && +o.count.of > 0 ? o.count : null, cr = cn ? Math.max(0, Math.min(+cn.of, +cn.n || 0)) : 0;
  const count = cn ? `<div class="ggs-count"><b data-hjrep data-ggsrep>${cr || ''}</b><span>of ${+cn.of}</span></div>` : '';
  const prog = cn ? `<div class="ggs-prog" data-ggsprog data-of="${+cn.of}"><i style="width:${r1(cr / cn.of * 100)}%"></i>${Array.from({length: Math.max(0, cn.of - 1)}, (x, k) => `<b style="left:${r1((k + 1) / cn.of * 100)}%"></b>`).join('')}</div>` : '';
  const label = o.label || cn ? `<div class="ggs-hud">${count}${o.label ? `<div class="ggs-lab">${esc(o.label)}</div>` : ''}</div>` : '';
  const fig = o.fig ? `<div class="ggs-fig${showRing && s === 'rest' ? ' small' : ''}">${o.fig}</div>` : '';
  const mid = (showBreath ? breathHTML(o, red) : '') + (s === 'done' && !o.fig && !ml ? MEDAL : '');
  const ring = showRing ? ringHTML(o, true) : '';
  const scrimOp = s === 'med' ? 0.15 : tod === 'night' ? 0.2 : 0.42;
  return `<div class="ggs ggs-${s} ggs-${tod} ggs-on-${deck}${o.fill ? ' ggs-fill' : ''}${red ? ' ggs-still' : ''}${ml ? ' ggs-hasml' : ''}" data-ggstage="${s}" style="--ggs-a:${lightA};--ggs-ad:${ST[s][1]};--ggs-scrim:${scrimOp};--ggs-bgl:${bgOf(s, h, false)};--ggs-bgd:${bgOf(s, h, true)}" aria-hidden="true">` +
    `<svg class="ggs-sky" viewBox="0 0 400 200" preserveAspectRatio="xMidYMax slice">${set}</svg>` +
    `<div class="ggs-deck"></div>${ml}<div class="ggs-tint"></div><div class="ggs-scrim"></div>` +
    `<div class="ggs-mid${fig ? ' hasfig' : ''}">${mid}${s === 'rest' ? ring + fig : fig + ring}</div>${side}${label}${prog}</div>`;
}

function update(el, opts){
  if (!el) return; const o = opts || {};
  const root = el.matches && el.matches('[data-ggstage]') ? el : el.querySelector && el.querySelector('[data-ggstage]');
  if (!root) return;
  const c = root.__ggs || (root.__ggs = {arc: root.querySelector('[data-ggsarc]'), secs: root.querySelector('[data-ggssecs]'), side: root.querySelector('[data-ggsside]'), p: null, s: null, sd: null});
  if (o.pct != null && c.arc){ const v = r1(C * (1 - Math.max(0, Math.min(1, +o.pct)))); if (v !== c.p){ c.p = v; c.arc.setAttribute('stroke-dashoffset', v); } }
  if (o.secs != null && c.secs){ const t = fmt(o.secs); if (t !== c.s){ c.s = t; c.secs.textContent = t; } }
  if (o.rep != null){ const b = root.querySelector('[data-ggsrep]'), pg = root.querySelector('[data-ggsprog]');
    if (b && b.textContent !== String(o.rep || '')) b.textContent = o.rep || '';
    if (pg){ const n = +pg.getAttribute('data-of') || 1, i = pg.querySelector('i'); if (i) i.style.width = r1(Math.max(0, Math.min(1, (+o.rep || 0) / n)) * 100) + '%'; } }
  if (o.side !== undefined && c.side && o.side !== c.sd){ c.sd = o.side;
    if (o.side === 'L' || o.side === 'R'){ c.side.hidden = false; c.side.innerHTML = `<b>${o.side}</b><span>${o.side === 'L' ? 'Left Side' : 'Right Side'}</span>`; } else c.side.hidden = true; }
}

// ---------- BLD 899: the meditation stage ----------
// Chris, October 31, 2026, option 1: a painted candle scene with a soft flicker added by the site. The flame sways on layered
// slow waves (no loop a person can find), the glow on the painting breathes, it pauses with the tab, and any new candle painting
// joins by one entry in shared/med-stage.json. One light loop (about 30 frames a second) moves every flame on the page.
const SELF = (() => { try { return (document.currentScript && document.currentScript.src) || ''; } catch (e) { return ''; } })();
const MS = {map: null, p: null, done: false, url: ''};
function medLoad(){
  if (MS.p) return; let u;
  try { u = new URL('../shared/med-stage.json', SELF || location.href); if (SELF) u.search = new URL(SELF).search; MS.url = u.href; } catch (e) { MS.done = true; return; }
  MS.p = fetch(MS.url).then(r => r.ok ? r.json() : null).catch(() => null).then(m => { MS.map = m && m.art ? m : null; MS.done = true; medHydrate(); });
}
function medEntry(m){
  medLoad(); const M = MS.map; if (!M) return null;
  const A = M.art || {}; let k = (M.use || {})[m.art] || m.art; if (!A[k]) k = M.default; const a = A[k]; if (!a) return null;
  let base; try { base = new URL(M.base || '', MS.url); } catch (e) { return null; }
  const abs = f => { try { return new URL(f, base).href; } catch (e) { return ''; } };
  return Object.assign({id: k}, a, {src: a.src ? abs(a.src) : m.src, lg: a.lg ? abs(a.lg) : a.src ? '' : m.lg});
}
const nb = v => Math.max(0, Math.min(1, +v || 0));
const phOf = o => Array.isArray(o.phases) && o.phases.some(p => p && +p.d > 0) ? o.phases.filter(p => p && +p.d > 0).map(p => ({k: p.k, d: +p.d}))
  : o.inhale != null ? [{k: 'in', d: Math.max(1, +o.inhale || 4)}, {k: 'out', d: Math.max(1, +o.exhale || +o.inhale || 6)}] : null;
// The glow: brighter and a little wider on the in breath, settling on the out breath. With breath timing its loop carries data-dur,
// so the player's one clock (health.js clkSync) holds it with the tree and the figure; with none, one easy breath each 5.5 seconds.
function haloSVG(P, red, id, cls){
  let an = '', dur = '', r0 = 34;
  if (!red){
    let lv = P ? (P[0].k === 'in' ? 0 : 1) : 0, t = 0; const T = P ? P.reduce((a, p) => a + p.d, 0) : 5.5, L = [lv], kt = [0];
    (P || [{k: 'in', d: 2.4}, {k: 'out', d: 3.1}]).forEach(p => { t += p.d; lv = p.k === 'in' ? 1 : p.k === 'out' ? 0 : lv; L.push(lv); kt.push(Math.min(1, t / T)); });
    const k4 = x => Math.round(x * 10000) / 10000, sp = kt.slice(1).map(() => '.45 0 .55 1').join(';'), w = Math.round(T * 1000) / 1000;
    const a = (at, f) => `<animate attributeName="${at}" dur="${w}s" repeatCount="indefinite" values="${L.map(f).join(';')}" keyTimes="${kt.map(k4).join(';')}" calcMode="spline" keySplines="${sp}"/>`;
    an = a('r', l => r1(31 + 11 * l)) + a('opacity', l => Math.round((0.68 + 0.32 * l) * 100) / 100); r0 = r1(31 + 11 * L[0]);
    if (P) dur = ` data-dur="${w}"`;
  }
  return `<svg class="ggs-halo ${cls}" viewBox="0 0 100 100"${dur}><defs><radialGradient id="${id}"><stop offset="0" stop-color="#FFE7AE" stop-opacity=".8"/>` +
    `<stop offset=".32" stop-color="#FFC772" stop-opacity=".34"/><stop offset="1" stop-color="#FFB04E" stop-opacity="0"/></radialGradient></defs><circle cx="50" cy="50" r="${r0}" fill="url(#${id})">${an}</circle></svg>`;
}
// A flame in a 40 by 80 box, its base (where it meets the wick) at 20, 74. A lantern's light is a soft glow behind glass.
function flameSVG(id, k, lant){
  if (lant) return `<svg class="ggs-fl ln" viewBox="0 0 40 80"><defs><radialGradient id="${id}"><stop offset="0" stop-color="#FFF7DA"/><stop offset=".45" stop-color="#FFD47E" stop-opacity=".75"/><stop offset="1" stop-color="#FFB24A" stop-opacity="0"/></radialGradient></defs>` +
    `<g class="ggs-flg" data-k="${k}" data-ln="1"><ellipse cx="20" cy="50" rx="16" ry="25" fill="url(#${id})"/></g></svg>`;
  return `<svg class="ggs-fl" viewBox="0 0 40 80"><defs><linearGradient id="${id}o" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#E8802C"/><stop offset=".42" stop-color="#F8B24A"/><stop offset="1" stop-color="#FFDC90" stop-opacity=".15"/></linearGradient>` +
    `<radialGradient id="${id}i" cx="50%" cy="72%" r="62%"><stop offset="0" stop-color="#FFFEF4"/><stop offset="1" stop-color="#FFE6A2"/></radialGradient>` +
    `<filter id="${id}b" x="-60%" y="-30%" width="220%" height="160%"><feGaussianBlur stdDeviation=".9"/></filter></defs>` +
    `<g class="ggs-flg" data-k="${k}"><path d="M20 4C28 26 32 44 28 60C26 69 23 74 20 74C17 74 14 69 12 60C8 44 12 26 20 4Z" fill="url(#${id}o)" filter="url(#${id}b)" opacity=".95"/>` +
    `<path class="ggs-flc" d="M20 30C24 42 25 54 23 64C22 69 21 71 20 71C19 71 18 69 17 64C15 54 16 42 20 30Z" fill="url(#${id}i)"/><ellipse cx="20" cy="70" rx="3.2" ry="4" fill="#9DB2E0" opacity=".35"/></g></svg>`;
}
// The drawn candle, for a painting with no candle of its own: a warm cream pillar on a small stone or wooden dish, softened with a
// light paint grain, in a 100 by 160 box (the dish's foot at the bottom; the flame's base at 50, 51).
function candleSVG(id, dish){
  const wood = dish === 'wood', d0 = wood ? '#A06C3C' : '#A6977F', d1 = wood ? '#6E4524' : '#75674F', d2 = wood ? '#C08A55' : '#CDBC9C';
  return `<svg class="ggs-cdl" viewBox="0 0 100 160" aria-hidden="true"><defs>` +
    `<linearGradient id="${id}w" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#D9BF94"/><stop offset=".3" stop-color="#F6E6C6"/><stop offset=".64" stop-color="#E8D2A8"/><stop offset="1" stop-color="#B39470"/></linearGradient>` +
    `<radialGradient id="${id}l" cx="50%" cy="0%" r="90%"><stop offset="0" stop-color="#FFE4A0" stop-opacity=".75"/><stop offset="1" stop-color="#FFE4A0" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="${id}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${d2}"/><stop offset=".5" stop-color="${d0}"/><stop offset="1" stop-color="${d1}"/></linearGradient>` +
    `<filter id="${id}g" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".7 .045" numOctaves="2" seed="7" result="n"/>` +
    `<feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G" result="d"/>` +
    `<feColorMatrix in="n" type="matrix" values="0 0 0 0 .5 0 0 0 0 .34 0 0 0 0 .16 0 0 0 -.9 .5" result="t"/><feComposite in="t" in2="d" operator="in" result="u"/>` +
    `<feMerge result="m"><feMergeNode in="d"/><feMergeNode in="u"/></feMerge><feGaussianBlur in="m" stdDeviation=".45"/></filter>` +
    `<filter id="${id}s" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="2.4"/></filter><filter id="${id}p" x="-40%" y="-200%" width="180%" height="500%"><feGaussianBlur stdDeviation="7"/></filter></defs>` +
    `<ellipse cx="50" cy="152" rx="70" ry="12" fill="#FFCF7E" opacity=".38" filter="url(#${id}p)"/><ellipse cx="50" cy="153" rx="44" ry="5" fill="#1E140A" opacity=".26" filter="url(#${id}s)"/>` +
    `<g filter="url(#${id}g)"><path d="M10 142C12 152 30 156 50 156S88 152 90 142Z" fill="url(#${id}d)"/><ellipse cx="50" cy="142" rx="40" ry="7.5" fill="${d2}"/><ellipse cx="50" cy="142.5" rx="33" ry="5" fill="${d1}" opacity=".45"/>` +
    `<path d="M30 60V138C30 142 40 145 50 145S70 142 70 138V60Z" fill="url(#${id}w)"/><path d="M30 60V138C30 142 40 145 50 145S70 142 70 138V60Z" fill="url(#${id}l)"/>` +
    `<path d="M33 60C33 70 35 76 34 84C33 88 36 89 37 84C38 76 37 68 38 61Z" fill="#FBEFD8" opacity=".7"/>` +
    `<ellipse cx="50" cy="60" rx="20" ry="5" fill="#F8E8C6"/><ellipse cx="50" cy="60.6" rx="15" ry="3.3" fill="#EFCB8A"/><ellipse cx="50" cy="62" rx="19" ry="8" fill="#FFD27E" opacity=".35"/></g>` +
    `<path d="M50 59.5C50 56 51 54 50 51" stroke="#3A2C1E" stroke-width="1.7" fill="none" stroke-linecap="round"/>` +
    `<svg x="38" y="6.6" width="24" height="48" viewBox="0 0 40 80" overflow="visible">${flameSVG(id + 'f', 9).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg></svg>`;
}
let MN = 0;
function medHTML(m, o, id, red){
  const e = medEntry(m), wait = !e && !MS.done, a = e || {src: m.src, lg: m.lg}, f = Array.isArray(a.focal) ? a.focal.map(nb) : [0.5, 0.55];
  const P = phOf(o), ar = +a.ar > 0 ? +a.ar : 0, lant = a.kind === 'lantern', tone = a.tone != null ? nb(a.tone) : 0.4;
  const fl = Array.isArray(a.flames) ? a.flames.filter(Array.isArray).map(p => [nb(p[0]), nb(p[1]), +p[2] || +a.size || 0.04])
    : Array.isArray(a.flame) ? [[nb(a.flame[0]), nb(a.flame[1]), +a.size || 0.04]] : [];
  const lit = !!(fl.length && ar), c = Array.isArray(a.candle) ? a.candle.map(nb) : [f[0] < 0.5 ? 0.84 : 0.16, 0.94];
  const since = +m.since || Date.now(), dl = -((Date.now() - since) / 1000).toFixed(1), q = id + 'm' + (++MN), pc = v => r1(v * 1000) / 10 + '%';
  const srcset = a.lg && a.lg !== a.src ? ` srcset="${esc(a.src)} 600w, ${esc(a.lg)} 1100w" sizes="(max-width:699px) 100vw, 760px"` : '';
  let h = `<div class="ggs-ml${lit ? ' lit' : ''}${wait ? ' wait' : ''}" data-ggsml="${esc(m.art || '')}" data-src="${esc(m.src || '')}" data-lg="${esc(m.lg || '')}" data-since="${since}"` +
    ` data-ph="${P ? P.map(p => p.k + ':' + p.d).join(' ') : ''}" style="--fx:${f[0]};--fy:${f[1]};--tone:${tone};--cx:${pc(c[0])};--cy:${pc(c[1])}">` +
    `<div class="ggs-pt"><div class="ggs-pw${ar ? ' ar' : ''}" style="${ar ? `--ar:${ar};` : ''}animation-delay:${dl}s;transform-origin:${pc(f[0])} ${pc(f[1])}">` +
    (a.src ? `<img class="ggs-pi" src="${esc(a.src)}"${srcset} alt="" decoding="async">` : '');
  if (lit) fl.forEach((p, k) => { const at = `left:${pc(p[0])};top:${pc(p[1])};--fh:${pc(p[2])}`;
    h += `<div class="ggs-ph${lant ? ' ln' : ''}" style="${at}">${haloSVG(P, red, q + 'h' + k, '')}</div><div class="ggs-pf${lant ? ' ln' : ''}" style="${at}">${flameSVG(q + 'f' + k, k, lant)}</div>`; });
  return h + `</div></div><div class="ggs-pv"></div><div class="ggs-mh">${haloSVG(P, red, q + 'hc', '')}</div><div class="ggs-mc">${candleSVG(q + 'c', a.dish)}</div></div>`;
}
// When med-stage.json arrives (or cannot), each stage drawn before it is redrawn in place.
function medHydrate(){
  document.querySelectorAll('[data-ggsml]').forEach(el => { try {
    const ph = (el.getAttribute('data-ph') || '').split(' ').filter(Boolean).map(x => { const [k, d] = x.split(':'); return {k, d: +d}; });
    const sc = el.closest('.ggs'), red = reduced() || !!(sc && sc.classList.contains('ggs-still'));
    el.outerHTML = medHTML({art: el.getAttribute('data-ggsml'), src: el.getAttribute('data-src'), lg: el.getAttribute('data-lg'), since: +el.getAttribute('data-since')}, {phases: ph.length ? ph : null}, 'ggsh' + (++N), red);
  } catch (e) {} });
  if (!reduced()) flKick();
}
// A painting that cannot load leaves the dusk set and the drawn candle in the middle of the floor.
try { document.addEventListener('error', ev => { const t = ev.target; if (t && t.classList && t.classList.contains('ggs-pi')){ const r = t.closest('.ggs-ml'); if (r) r.classList.add('fail'); } }, true); } catch (e) {}
// The flicker: slow waves at unrelated speeds, a different blend for each flame, about 30 frames a second, only while a flame is on
// the page and the tab is in view (a hidden tab gets no frames, so the loop rests on its own).
const FL = {raf: 0, last: 0};
const wave = (t, k) => 0.55 * Math.sin(t * 1.13 + k * 1.7) + 0.3 * Math.sin(t * 2.71 + k * 4.1) + 0.15 * Math.sin(t * 6.37 + k * 2.3);
function flKick(){ if (!FL.raf && !reduced()) FL.raf = requestAnimationFrame(flTick); }
function flTick(ts){
  FL.raf = 0; const els = document.querySelectorAll('.ggs-flg'); if (!els.length) return;
  if (ts - FL.last > 32){ FL.last = ts; const t = ts / 1000;
    els.forEach((g, i) => { const k = +g.getAttribute('data-k') || i, gust = Math.max(0, Math.sin(t * 0.23 + k)) ** 6;
      if (g.getAttribute('data-ln')){ const s = 1 + 0.06 * wave(t * 1.6, k + 3); g.setAttribute('transform', `translate(20 50) scale(${s.toFixed(3)}) translate(-20 -50)`); g.setAttribute('opacity', (0.86 + 0.14 * wave(t * 2.2, k + 9)).toFixed(3)); return; }
      const a = (2.6 + 3 * gust) * wave(t, k) , sy = 1 + 0.06 * wave(t * 1.45, k + 3) + 0.03 * wave(t * 4.3, k + 11), sx = 1 - 0.035 * wave(t * 1.8, k + 5);
      g.setAttribute('transform', `rotate(${a.toFixed(2)} 20 74) translate(20 74) scale(${sx.toFixed(3)} ${sy.toFixed(3)}) translate(-20 -74)`); });
  }
  FL.raf = requestAnimationFrame(flTick);
}
try { document.addEventListener('visibilitychange', () => { if (!document.hidden) flKick(); }); } catch (e) {}

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
.ggs-rt{fill:rgba(255,248,232,.88);stroke:rgba(90,60,30,.18);stroke-width:5;}
.ggs-rp{fill:none;stroke:#C98A2C;stroke-width:4;stroke-linecap:round;transition:stroke-dashoffset .12s linear;}
.ggs-secs{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:clamp(36px,12vw,62px);color:#3A2414;font-variant-numeric:tabular-nums;line-height:1;}
.ggs-mid.hasfig:not(.ggs-rest *) .ggs-secs{font-size:clamp(22px,6vw,30px);}
.ggs-breath{position:absolute;left:50%;top:50%;width:min(172px,46vw,calc(var(--H) * .62));transform:translate(-50%,-52%);z-index:3;padding:8px 8px 4px;border-radius:20px;background:rgba(255,248,232,.84);box-shadow:0 4px 14px rgba(60,35,10,.14);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);}
.ggs-breath.wf{left:10px;top:10px;width:min(112px,28vw,calc(var(--H) * .38));transform:none;padding:6px 5px 2px;border-radius:16px;}
.ggs-breath svg{width:100%;height:auto;display:block;overflow:visible;}
.ggs-tcrown,.ggs-ttrunk,.ggs-tground,.ggs-troots path,.ggs-trootg path{fill:none;stroke:#3A2414;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;}
.ggs-ttrunk{stroke-width:3.4;}.ggs-tground{stroke-width:1.4;opacity:.6;}.ggs-troots{opacity:.5;}
.ggs-trootg path{stroke:#E7B04E;stroke-width:2.8;}
.ggs-tink{stop-color:#3A2414;}
.ggs-bw{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:700;font-size:21px;fill:#3A2414;}
.ggs-bwg[data-ggsbw="out"] .ggs-bw{fill:#8A5A12;}
.ggs-breath .ggs-secs{position:static;display:block;text-align:center;color:#3A2414;font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(26px,8vw,40px);padding-bottom:4px;}
.ggs-side{position:absolute;bottom:22px;left:12px;display:flex;align-items:center;gap:8px;padding:4px 12px 4px 4px;border-radius:999px;background:#E7B04E;color:#2A1A08;font:700 14px/1 'Barlow',sans-serif;letter-spacing:.04em;z-index:4;box-shadow:0 2px 8px rgba(60,35,10,.18);}
.ggs-side[hidden]{display:none;}
.ggs-side b{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:rgba(255,248,232,.9);color:#3A2414;font:700 17px/1 'Cormorant Garamond',Georgia,serif;}
.ggs-hud{position:absolute;top:10px;right:10px;display:grid;justify-items:end;gap:6px;z-index:4;max-width:52%;}
.ggs-lab{padding:7px 12px;border-radius:999px;background:rgba(255,248,232,.88);color:#2F2216;border:1px solid rgba(90,60,30,.22);font:700 13px/1 'Barlow',sans-serif;letter-spacing:.05em;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-shadow:0 2px 8px rgba(60,35,10,.12);}
.ggs-count{display:flex;align-items:baseline;gap:5px;padding:2px 12px 4px;border-radius:16px;background:rgba(255,248,232,.88);box-shadow:0 4px 14px rgba(60,35,10,.14);}
.ggs-count b{font:600 clamp(34px,10vw,54px)/1 'Cormorant Garamond',Georgia,serif;color:#3A2414;font-variant-numeric:lining-nums;min-width:.6em;text-align:right;}
.ggs-count span{font:italic 15px 'Cormorant Garamond',Georgia,serif;color:#6D5640;}
.ggs-prog{position:absolute;left:16px;right:16px;bottom:10px;height:3px;border-radius:2px;background:rgba(90,60,30,.22);z-index:4;}
.ggs-prog i{position:absolute;left:0;top:-1px;bottom:-1px;border-radius:3px;background:#C98A2C;transition:width .25s ease-out;}
.ggs-prog b{position:absolute;top:-3px;width:1px;height:9px;background:#3A2414;opacity:.35;}
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
/* BLD 899: the meditation stage. The painting covers the panel with its focal point in view (container units keep each painted flame
   on its wick at any panel size); a slow drift, a soft vignette, and the candle's breathing glow blended as light. */
.ggs-ml{position:absolute;inset:0;}
.ggs.ggs-fill .ggs-ml{bottom:auto;height:var(--H);}
.ggs-pt{position:absolute;inset:0;overflow:hidden;container-type:size;background:#2A1E1A;}
.ggs-pw{position:absolute;inset:0;animation:ggsmd 64s ease-in-out infinite alternate;will-change:transform;}
.ggs-pw.ar{inset:auto;width:max(100cqw,calc(100cqh * var(--ar)));height:max(100cqh,calc(100cqw / var(--ar)));left:calc((100cqw - max(100cqw,calc(100cqh * var(--ar)))) * var(--fx));top:calc((100cqh - max(100cqh,calc(100cqw / var(--ar)))) * var(--fy));}
.ggs-pi{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:calc(var(--fx) * 100%) calc(var(--fy) * 100%);display:block;filter:brightness(calc(1 - .16 * var(--tone))) sepia(calc(.2 * var(--tone))) saturate(1.04);}
.ggs-ph,.ggs-pf{position:absolute;pointer-events:none;}
.ggs-ph{height:calc(var(--fh) * 12);aspect-ratio:1;transform:translate(-50%,-56%);mix-blend-mode:screen;}
.ggs-ph.ln{height:calc(var(--fh) * 5);transform:translate(-50%,-50%);}
.ggs-pf{height:calc(var(--fh) * 1.143);aspect-ratio:1/2;transform:translate(-50%,-92.5%);mix-blend-mode:screen;}
.ggs-pf.ln{height:calc(var(--fh) * 1.4);transform:translate(-50%,-62%);}
.ggs-halo,.ggs-fl,.ggs-cdl{display:block;width:100%;height:100%;overflow:visible;}
.ggs-pv{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 85% 80% at calc(var(--fx) * 100%) 58%,transparent 48%,rgba(34,20,8,.26) 100%);}
.ggs-mh{position:absolute;left:var(--cx);top:calc(var(--cy) - var(--ch,36%) * .79);height:calc(var(--ch,36%) * 2.6);aspect-ratio:1;transform:translate(-50%,-50%);mix-blend-mode:screen;pointer-events:none;}
.ggs-mc{position:absolute;left:var(--cx);bottom:calc(100% - var(--cy));height:var(--ch,36%);aspect-ratio:100/160;transform:translateX(-50%);filter:drop-shadow(0 0 10px rgba(255,200,120,.25));}
.ggs-ml.lit .ggs-mh,.ggs-ml.lit .ggs-mc,.ggs-ml.wait .ggs-mh,.ggs-ml.wait .ggs-mc{display:none;}
.ggs-ml.fail .ggs-pt,.ggs-ml.fail .ggs-pv{display:none;}
.ggs-ml.fail{--cx:50%!important;--cy:96%!important;}.ggs-ml.fail .ggs-mh,.ggs-ml.fail .ggs-mc{display:block;}
.ggs-hasml .ggs-tint{opacity:.1;}
@keyframes ggsmd{from{transform:scale(1.02) translate(0,0);}to{transform:scale(1.08) translate(-1%,-.6%);}}
.ggs-still .ggs-pw{animation:none!important;}
.ggs-still .ggs-rays,.ggs-still .ggs-sun,.ggs-still .ggs-cloud,.ggs-still .ggs-star,.ggs-still .ggs-steam,.ggs-still .ggs-wash,.ggs-still .ggs-deck::after,.ggs-still .ggs-conf{animation:none!important;}
@media (prefers-reduced-motion: reduce){.ggs *,.ggs .ggs-deck::after{animation:none!important;transition:none!important;}}
${dk(`& .ggs{--ggm-ink:#FFF6E8;--ggm-far:.5;--ggm-gear:#B9C4D2;--ggm-steel:#D7DEE6;--ggm-db:var(--ggs-ad);--ggm-mat:var(--ggs-ad);--ggm-mat-op:.5;--ggm-shadow:#000;--ggm-shadow-op:.4;box-shadow:0 12px 30px rgba(0,0,0,.4);}
& .ggs-scrim{opacity:var(--ggs-scrim);}& .ggs.ggs-fill{background:var(--ggs-bgd);}
& .ggs-rt{fill:rgba(36,27,20,.86);stroke:rgba(242,220,180,.18);}
& .ggs-rp{stroke:#E7B04E;}
& .ggs-secs,& .ggs-breath .ggs-secs{color:#F4E8D4;}
& .ggs-breath{background:rgba(36,27,20,.84);box-shadow:0 4px 14px rgba(0,0,0,.35);}
& .ggs-tcrown,& .ggs-ttrunk,& .ggs-tground,& .ggs-troots path{stroke:#F2DCB4;}& .ggs-tink{stop-color:#F2DCB4;}
& .ggs-bw{fill:#F4E8D4;}& .ggs-bwg[data-ggsbw="out"] .ggs-bw{fill:#F0B850;}
& .ggs-side{background:#E7B04E;color:#1E140A;}
& .ggs-side b{background:rgba(36,27,20,.9);color:#F2DCB4;}
& .ggs-lab,& .ggs-count{background:rgba(36,27,20,.84);color:#F4E8D4;border-color:rgba(242,220,180,.2);}
& .ggs-count b{color:#F2DCB4;}& .ggs-count span{color:#CCB593;}& .ggs-prog{background:rgba(242,220,180,.2);}& .ggs-prog i{background:#E7B04E;}& .ggs-prog b{background:#F2DCB4;}
& .ggs-deck::after{background:var(--ggs-ad);}
& .ggs::after{box-shadow:inset 0 0 0 4px var(--ggs-ad);}& .ggs-last::after{box-shadow:inset 0 0 0 6px var(--ggs-ad);}
& .ggs-tint{background:linear-gradient(180deg,transparent 30%,var(--ggs-ad) 170%);opacity:.4;}
& .ggs-hasml .ggs-tint{opacity:.12;}& .ggs-pi{filter:brightness(calc(.8 - .16 * var(--tone))) sepia(calc(.22 * var(--tone))) saturate(1.02);}& .ggs-pv{background:radial-gradient(ellipse 85% 80% at calc(var(--fx) * 100%) 58%,transparent 40%,rgba(10,6,3,.42) 100%);}`)}
`;
(function(){ try { if (document.getElementById('ggs-css')) return; const s = document.createElement('style'); s.id = 'ggs-css'; s.textContent = CSS; (document.head || document.documentElement).appendChild(s); } catch (e) {} })();

window.GGStage = {scene, update, colors, css: CSS, states: Object.keys(ST), med: true};
})();
