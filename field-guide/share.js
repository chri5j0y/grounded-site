// =====================================================================
// GROUNDED FIELD GUIDE (TM): the Share Card Builder (GWG BLD 746; Painting look,
// The Grounded Marriage, and named bios, GWG BLD 757).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// A Staff and Founder tab. Pick a subject, a message, a platform, a format,
// and a look (Light, Dark, Tree Color, or Painting, which sets the words over the
// subject's own painting with a soft shade); it draws the card or banner at the platform's exact size and
// saves it as a PNG. Bios for each platform sit below with a Copy button.
// Data: the Staff library's brand.share, with a small built-in fallback so
// the tab works before that library update is applied. Everything is drawn
// on this device; nothing is sent anywhere.
// =====================================================================
(function(){
'use strict';

const TREES = ['maple', 'aspen', 'pine', 'birch', 'oak', 'sequoia', 'willow', 'grove'];
const CREAM = '#FAF7F2', INK = '#2C1810', GOLD = '#8B5E1A', SOFT = '#6B5A4D';

// The built-in fallback. Colors match shared/gg-learn.js; taglines and lines match each tool's page.
const FB = {
  subjects: [
    {id: 'gwg', name: 'Grow With Grounded', mark: 'favicon.svg', color: GOLD, tagline: 'For every threshold, from first breath to last.', line: 'Spiritual guidance, ceremonies, and tools for every age. All faith traditions and everything in-between.', url: 'growwithgrounded.com'},
    {id: 'maple', name: 'Maple', color: '#C4501E', tagline: 'Bright leaves, strong roots.', line: 'Built for grades K to 5, their families, and their teachers.'},
    {id: 'aspen', name: 'Aspen', color: '#1F6F74', tagline: 'Rooted together.', line: 'Built for grades 6 to 8, their families, and their teachers.'},
    {id: 'pine', name: 'Pine', color: '#3A6B35', tagline: 'Stand tall through every season.', line: 'Built for grades 9 to 12.'},
    {id: 'birch', name: 'Birch', color: '#7F6610', tagline: 'New ground, deep roots.', line: 'Built for young adults, 18 to 26.'},
    {id: 'oak', name: 'Oak', color: '#3D5A73', tagline: 'Shelter for others. Strength for you.', line: 'Built for adults, 25 to 60.'},
    {id: 'sequoia', name: 'Sequoia', color: '#7A2E1C', tagline: 'A long life, still growing.', line: 'Built for older adults, 60 and up.'},
    {id: 'willow', name: 'Willow', color: '#5D5A6E', tagline: 'Held gently, all the way home.', line: 'For the person in hospice and the people who love them.'},
    {id: 'grove', name: 'The Grove', color: '#223829', tagline: 'All ages. All stages. Growing together.', line: 'Built for families, classrooms, churches, and groups.'},
    {id: 'marriage', name: 'The Grounded Marriage', mark: 'marriage/mark.svg', color: '#3F5F86', tagline: 'Before the Vows and After the Vows: a private place for the two of you to talk, grow, and keep growing.', line: 'For couples. Everything stays on your device.', url: 'growwithgrounded.com/marriage', always: true},
    {id: 'field', name: 'Grounded Field Guide', mark: 'favicon.svg', color: '#2E2118', tagline: 'Every Grounded tool and guide, in one place.', line: 'For chaplains, pastors, teachers, school counselors, and parents.', url: 'growwithgrounded.com/field-guide'}
  ],
  messages: [],
  bios: [],
  platforms: [
    {id: 'facebook', name: 'Facebook', card: [1200, 630], square: [1080, 1080], banner: [1640, 624], safe: 'Words stay in the center. Your profile photo sits at the lower left.'},
    {id: 'instagram', name: 'Instagram', card: [1080, 1350], square: [1080, 1080], safe: 'The grid shows the middle square of a tall card, so the words stay centered.'},
    {id: 'linkedin', name: 'LinkedIn', card: [1200, 627], square: [1080, 1080], banner: [1584, 396], safe: 'Your profile photo sits at the lower left, so the words sit to the right of it.'},
    {id: 'x', name: 'X', card: [1600, 900], square: [1080, 1080], banner: [1500, 500], safe: 'Your profile photo sits at the lower left, so the words sit to the right of it.'},
    {id: 'substack', name: 'Substack', card: [1200, 630], square: [1080, 1080], banner: [1100, 220], safe: 'Words stay in the center.'}
  ]
};
const KINDS = [['tagline', 'Tagline'], ['intro', 'Intro'], ['what', 'What We Do'], ['pitch', 'Pitch'], ['slogan', 'Slogan']];
const LOOKS = [['light', 'Light'], ['dark', 'Dark'], ['tree', 'Tree Color'], ['painting', 'Painting']];
const FORMATS = [['card', 'Card'], ['square', 'Square'], ['banner', 'Banner']];
// The Painting look: each subject's wide painting, and where its main tree stands (a fraction of the image width).
const FOCUS = {maple: .37, aspen: .36, pine: .38, birch: .18, oak: .72, sequoia: .22, willow: .21, grove: .5, home: .74, marriage: .64};
// People named in the bios (bios may name a person who is not a card subject).
const PEOPLE = {chris: 'Chris Joy', kayti: 'Kayti Joy'};
// Banner safe areas as fractions [left, top, right, bottom]: profile photos sit at the lower left on X, LinkedIn, and Facebook.
const SAFE = {facebook: [.12, .1, .92, .9], x: [.22, .12, .92, .88], linkedin: [.25, .1, .94, .9], substack: [.06, .1, .94, .9]};

let LIB = null;
const S = {subject: 'gwg', msg: 'tag', own: '', platform: 'facebook', format: 'card', look: 'light', marks: true, bios: 'all'};

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const slug = s => String(s).replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const chars = s => Array.from(String(s || '')).length;

// ---------- data ----------
function data(){
  const d = (LIB && LIB.brand && LIB.brand.share) || {};
  const fbS = id => FB.subjects.find(x => x.id === id) || {};
  const subjects = (Array.isArray(d.subjects) && d.subjects.length ? d.subjects : FB.subjects).map(s => Object.assign({}, fbS(treeKey(s) || s.id), s));
  // Built-in subjects a library may not list yet (The Grounded Marriage) join before the Field Guide.
  FB.subjects.filter(f => f.always && !subjects.some(s => s.id === f.id || (isMarriage(f) && isMarriage(s)))).forEach(f => {
    const at = subjects.findIndex(s => isLogo(s) && !isGWG(s)); subjects.splice(at < 0 ? subjects.length : at, 0, Object.assign({}, f));
  });
  return {
    subjects,
    messages: Array.isArray(d.messages) ? d.messages : FB.messages,
    bios: Array.isArray(d.bios) ? d.bios : FB.bios,
    platforms: (Array.isArray(d.platforms) && d.platforms.length ? d.platforms : FB.platforms)
  };
}
// The tree a subject belongs to, if any (by id, mark, or name).
function treeKey(s){
  const id = String(s.id || '').toLowerCase().replace(/^the-?/, '');
  if (TREES.includes(id)) return id;
  const m = String(s.mark || '').match(/marks\/([a-z]+)/); if (m && TREES.includes(m[1])) return m[1];
  const n = String(s.name || '').toLowerCase().replace(/^the /, '');
  return TREES.includes(n) ? n : null;
}
function markUrl(s){
  const t = treeKey(s), m = s.mark;
  if (m && /^(https?:|\/)/.test(m)) return m;
  if (m && /[\/.]/.test(m)) return '../' + m.replace(/^(\.\.\/|\.\/)+/, '');
  if (t) return '../shared/marks/' + t + '.svg';
  return '../favicon.svg';
}
const isLogo = s => /favicon\.svg$/.test(markUrl(s));
const siteOf = s => s.url || (treeKey(s) ? 'growwithgrounded.com/' + treeKey(s) : 'growwithgrounded.com');
const isGWG = s => s.id === 'gwg' || /^grow with grounded$/i.test(s.name || '');
const isMarriage = s => s.id === 'marriage' || /grounded marriage/i.test(s.name || '') || /marriage\/mark/.test(s.mark || '');
// The subject's painting: a tree's own wide painting, The Grounded Marriage's, or the home painting for Grow With Grounded and the Field Guide.
function heroOf(s){
  const fx = +s.focus;
  if (s.hero) return {url: /^(https?:|\/)/.test(s.hero) ? s.hero : '../' + String(s.hero).replace(/^(\.\.\/|\.\/)+/, ''), fx: fx >= 0 && fx <= 1 ? fx : .5};
  const t = treeKey(s);
  if (t) return {url: '../shared/heroes/' + t + '-wide.webp', fx: FOCUS[t]};
  if (isMarriage(s)) return {url: '../marriage/hero-wide.webp', fx: FOCUS.marriage};
  return {url: '../shared/heroes/home-wide.webp', fx: FOCUS.home};
}

function messagesFor(D, sub){
  const list = D.messages.filter(m => m && m.text && (m.subject === 'all' || m.subject === sub.id || (treeKey(sub) && m.subject === treeKey(sub))));
  return list.filter(m => String(m.text).trim() !== String(sub.tagline || '').trim());
}
function current(){
  const D = data();
  const sub = D.subjects.find(x => x.id === S.subject) || D.subjects[0];
  const msgs = messagesFor(D, sub);
  let text = sub.tagline || '';
  if (S.msg === 'own') text = S.own;
  else if (S.msg.startsWith('m:')){ const m = msgs[+S.msg.slice(2)]; if (m) text = m.text; else S.msg = 'tag'; }
  const plat = D.platforms.find(p => p.id === S.platform) || D.platforms[0];
  const fmts = FORMATS.filter(([k]) => k === 'square' ? true : Array.isArray(plat[k]));
  if (!fmts.some(([k]) => k === S.format)) S.format = fmts[0][0];
  const size = S.format === 'square' ? (plat.square || [1080, 1080]) : plat[S.format];
  return {D, sub, msgs, text, plat, fmts, W: +size[0], H: +size[1]};
}

// ---------- color ----------
const hex = c => { const m = String(c).replace('#', ''); const f = m.length === 3 ? m.split('').map(x => x + x).join('') : m; return [0, 2, 4].map(i => parseInt(f.slice(i, i + 2), 16) || 0); };
const mix = (a, b, t) => { const A = hex(a), B = hex(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
function palette(sub, look){
  const c = sub.color || GOLD, logo = isLogo(sub);
  if (look === 'dark') return {bg: '#1E1510', glow: '#2E2118', band: '#2A1E15', ink: '#F2EADC', soft: '#BFB09A', acc: logo ? '#D9A847' : mix(c, '#F6E7CF', .5), logo: '#D9A847'};
  if (look === 'tree') return {bg: c, glow: mix(c, '#FFFFFF', .14), band: mix(c, '#000000', .22), ink: '#FFF8EC', soft: mix(c, '#FFF8EC', .82), acc: mix(c, '#FFE9B8', .8), logo: '#FFF8EC'};
  if (look === 'painting') return {bg: '#2A1E15', glow: '#2A1E15', band: 'rgba(12,8,5,.52)', ink: '#FFF8EC', soft: '#F1E7D6', acc: logo ? '#F2D08E' : mix(c, '#FFF1DA', .66), logo: '#FFF8EC'};
  return {bg: CREAM, glow: '#F0E8D8', band: '#E9DFCB', ink: INK, soft: SOFT, acc: logo ? GOLD : c, logo: GOLD};
}

// ---------- images and fonts ----------
const IMG = {};
function loadImg(url){
  if (IMG[url]) return IMG[url];
  IMG[url] = fetch(url).then(r => { if (!r.ok) throw new Error('mark ' + r.status); return r.text(); }).then(txt => {
    // The tab icon wraps the house tree in a light tile; the cards use the tree itself, so it can take each look's color.
    const tree = txt.slice(1).match(/<svg\b[^>]*viewBox="0 0 3200 3536"[^>]*>[\s\S]*?<\/svg>/);
    if (tree) txt = tree[0].replace(/^<svg\b/, '<svg xmlns="http://www.w3.org/2000/svg"').replace(/\s(x|y)="[^"]*"/g, '');
    // Give the SVG a large size so it draws crisp at any scale.
    const vb = (txt.match(/viewBox="([^"]+)"/) || [])[1]; const p = vb ? vb.trim().split(/[\s,]+/).map(Number) : [0, 0, 100, 100];
    const k = 1200 / Math.max(p[2], p[3]); const w = Math.round(p[2] * k), h = Math.round(p[3] * k);
    txt = txt.replace(/<svg\b([^>]*)>/, (all, attrs) => '<svg' + attrs.replace(/\s(width|height)="[^"]*"/g, '') + ' width="' + w + '" height="' + h + '">');
    const img = new Image(); img.src = URL.createObjectURL(new Blob([txt], {type: 'image/svg+xml'}));
    return img.decode().then(() => img);
  });
  IMG[url].catch(() => { delete IMG[url]; });
  return IMG[url];
}
// A painting (same-origin WebP), kept once loaded.
function loadPhoto(url){
  const key = 'photo:' + url;
  if (IMG[key]) return IMG[key];
  IMG[key] = new Promise((ok, no) => { const img = new Image(); img.onload = () => ok(img); img.onerror = () => no(new Error('painting ' + url)); img.src = url; });
  IMG[key].catch(() => { delete IMG[key]; });
  return IMG[key];
}
// Draw the painting to cover the canvas with its main tree near x = place (a fraction of W); returns where the tree landed.
function cover(ctx, img, W, H, fx, place){
  const iw = img.naturalWidth || 2000, ih = img.naturalHeight || 800, k = Math.max(W / iw, H / ih), dw = iw * k, dh = ih * k;
  const dx = Math.min(0, Math.max(W - dw, W * place - fx * dw));
  const dy = (H - dh) * .56;
  ctx.drawImage(img, dx, dy, dw, dh);
  return (dx + fx * dw) / W;
}
// The house logo drawn in one color (for the Dark and Tree Color looks).
function tint(img, color){
  const c = document.createElement('canvas'); c.width = img.naturalWidth || 1200; c.height = img.naturalHeight || 1200;
  const x = c.getContext('2d'); x.drawImage(img, 0, 0, c.width, c.height); x.globalCompositeOperation = 'source-in'; x.fillStyle = color; x.fillRect(0, 0, c.width, c.height);
  return c;
}
let FONTS = null;
function fonts(){
  if (!FONTS) FONTS = Promise.all(['600 40px "Cormorant Garamond"', 'italic 500 40px "Cormorant Garamond"', '500 20px Barlow', '600 20px Barlow'].map(f => document.fonts.load(f).catch(() => null))).then(() => document.fonts.ready);
  return FONTS;
}

// ---------- layout ----------
const F_NAME = u => `600 ${u * 4.4}px "Cormorant Garamond", Georgia, serif`;
const F_MSG = u => `italic 500 ${u * 2.5}px "Cormorant Garamond", Georgia, serif`;
const F_LINE = u => `500 ${u * 1.25}px Barlow, system-ui, sans-serif`;
function greedy(ctx, words, maxW){
  const lines = []; let cur = '';
  for (const w of words){ const t = cur ? cur + ' ' + w : w; if (!cur || ctx.measureText(t).width <= maxW) cur = t; else { lines.push(cur); cur = w; } }
  if (cur) lines.push(cur);
  return lines;
}
// Wrap to fit maxW, then balance the lines so the last line is not left alone.
function wrap(ctx, text, font, maxW, spacing){
  ctx.font = font; ctx.letterSpacing = spacing || '0px';
  const words = String(text || '').trim().split(/\s+/).filter(Boolean);
  let lines = greedy(ctx, words, maxW);
  if (lines.length > 1){
    let lo = 0, hi = maxW;
    for (let i = 0; i < 10; i++){ const mid = (lo + hi) / 2; if (greedy(ctx, words, mid).length === lines.length) hi = mid; else lo = mid; }
    lines = greedy(ctx, words, hi);
  }
  const widths = lines.map(l => ctx.measureText(l).width); ctx.letterSpacing = '0px';
  return {lines, widths, w: Math.max(0, ...widths)};
}
// Measure the whole block at unit u. Returns null when it does not fit the region.
function measure(ctx, o, u, R, parts){
  const horiz = o.horiz, gapM = u * 2.2;
  const markH = horiz ? u * (o.logo ? 7.6 : 6.6) : u * (o.logo ? 8.6 : 7.4);
  const markW = o.logo ? markH * 3200 / 3536 : markH;
  const colW = horiz ? R.w - markW - gapM : R.w;
  if (colW < u * 8) return null;
  const name = wrap(ctx, o.name, F_NAME(u), colW); if (name.lines.length > 2 || name.w > colW) return null;
  const msgLimit = o.msg.length > 120 ? 6 : 4;
  const msg = o.msg ? wrap(ctx, o.msg, F_MSG(u), colW) : {lines: [], widths: [], w: 0}; if (msg.lines.length > msgLimit || msg.w > colW) return null;
  const line = parts.line && o.line ? wrap(ctx, o.line, F_LINE(u), colW, (u * 0.025) + 'px') : {lines: [], widths: [], w: 0}; if (line.lines.length > 3 || line.w > colW) return null;
  const rowH = parts.marks ? u * 3 : 0, rowW = parts.marks ? 8 * rowH + 7 * u * .55 : 0; if (rowW > colW) return null;
  let h = name.lines.length * u * 4.4 * 1.08;
  if (msg.lines.length) h += u * .7 + msg.lines.length * u * 2.5 * 1.22;
  if (line.lines.length) h += u * .8 + line.lines.length * u * 1.25 * 1.4;
  if (rowH) h += u * 1.3 + rowH;
  const textW = Math.max(name.w, msg.w, line.w, rowW);
  const W = horiz ? markW + gapM + textW : Math.max(markW, textW);
  const H = horiz ? Math.max(h, markH) : markH + u * 1.6 + h;
  if (W > R.w || H > R.h) return null;
  return {u, name, msg, line, rowH, rowW, textH: h, textW, markW, markH, gapM, W, H, parts};
}
function fit(ctx, o, R, cap){
  // Full content first; drop the tree marks row, then the small line, only when the words would get too small.
  const tries = [{line: true, marks: o.marks}, {line: true, marks: false}, {line: false, marks: false}].filter((p, i) => i !== 1 || o.marks);
  let got = null;
  for (const parts of tries){
    let lo = 0, hi = cap; got = null;
    for (let i = 0; i < 24; i++){ const mid = (lo + hi) / 2; const m = measure(ctx, o, mid, R, parts); if (m){ got = m; lo = mid; } else hi = mid; }
    if (got && got.u >= o.minU) return got;
  }
  return got;
}

// Draw one card or banner on a canvas of exactly W by H pixels.
async function draw(canvas, cur, look){
  const {sub, text, plat, W, H} = cur;
  await fonts();
  const logo = isLogo(sub), P = palette(sub, look), pnt = look === 'painting', hero = pnt ? heroOf(sub) : null;
  const showMarks = S.marks && isGWG(sub);
  const imgs = await Promise.all([loadImg(markUrl(sub)), ...(showMarks ? TREES.map(t => loadImg('../shared/marks/' + t + '.svg')) : [])]);
  const photo = pnt ? await loadPhoto(hero.url) : null;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const banner = S.format === 'banner', horiz = banner || W / H >= 1.3;
  const band = Math.round(H * (banner ? .07 : .075)); const bandTop = H - band;
  // The Painting look: the main tree stays in view, and the words sit on the open side of the painting.
  let side = 'center', place = .5;
  if (pnt && horiz && Math.abs(hero.fx - .5) > .08){ side = hero.fx < .5 ? 'right' : 'left'; place = side === 'right' ? (banner ? .2 : .25) : (banner ? .8 : .75); }
  // The region the words and marks stay inside.
  let R;
  if (banner){ const f = plat.safeBox || SAFE[plat.id] || [.1, .12, .9, .88]; R = {x: W * f[0], y: H * f[1], w: W * (f[2] - f[0]), h: Math.min(H * f[3], bandTop - H * .04) - H * f[1]}; }
  else if (pnt && side !== 'center') R = side === 'right' ? {x: W * .46, y: H * .07, w: W * .48, h: bandTop - H * .05 - H * .07} : {x: W * .06, y: H * .07, w: W * .48, h: bandTop - H * .05 - H * .07};
  else if (pnt && !horiz) R = {x: W * .07, y: H * .06, w: W * .86, h: (bandTop - H * .05) * .62 - H * .06};
  else R = {x: W * .07, y: H * .07, w: W * .86, h: bandTop - H * .05 - H * .07};
  const RS = Object.assign({}, R);
  // A banner's words stop short of its painting's tree.
  if (pnt && banner && side !== 'center'){
    const edge = W * (hero.fx + (side === 'right' ? .1 : -.1));
    if (side === 'right' && edge > R.x && edge < R.x + R.w * .6){ R.w -= edge - R.x; R.x = edge; }
    if (side === 'left' && edge < R.x + R.w && edge > R.x + R.w * .4) R.w = edge - R.x;
  }
  const o ={horiz, logo, name: sub.name || '', msg: String(text || '').trim(), line: sub.line || '', marks: showMarks, minU: Math.min(W, H) * (banner ? .028 : .018)};
  const cap = banner ? H * (W / H >= 3.9 ? .045 : .03) : horiz ? Math.min(H * .036, W * .022) : W * .03;
  const m = fit(ctx, o, R, pnt && side !== 'center' && !banner ? cap * .92 : cap);
  // Where the block sits: centered in the region, or toward the open side of a banner's painting.
  let bx = m ? R.x + (R.w - m.W) / 2 : 0; const by = m ? R.y + (R.h - m.H) / 2 : 0;
  if (m && pnt && banner && side !== 'center'){ bx = side === 'right' ? R.x + R.w - m.W : R.x; }
  if (pnt){
    // The painting, a light all-over shade, then a soft deeper shade behind the words so they read.
    ctx.fillStyle = P.bg; ctx.fillRect(0, 0, W, H);
    cover(ctx, photo, W, H, hero.fx, place);
    ctx.fillStyle = 'rgba(14,10,6,.2)'; ctx.fillRect(0, 0, W, H);
    if (horiz && !banner && side !== 'center'){
      const g = ctx.createLinearGradient(side === 'right' ? W : 0, 0, side === 'right' ? W * .3 : W * .7, 0);
      g.addColorStop(0, 'rgba(14,10,6,.66)'); g.addColorStop(.55, 'rgba(14,10,6,.5)'); g.addColorStop(1, 'rgba(14,10,6,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    } else if (!horiz){
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, 'rgba(14,10,6,.62)'); g.addColorStop(.5, 'rgba(14,10,6,.44)'); g.addColorStop(.8, 'rgba(14,10,6,.08)'); g.addColorStop(1, 'rgba(14,10,6,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }
    if (m){
      // An oval of shade under the block itself, in every format.
      const cx = bx + m.W / 2, cy = by + m.H / 2, rx = m.W * .62 + m.u * 6, ry = m.H * .62 + m.u * 5;
      ctx.save(); ctx.translate(cx, cy); ctx.scale(rx / ry, 1);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, ry); g.addColorStop(0, 'rgba(14,10,6,.5)'); g.addColorStop(.6, 'rgba(14,10,6,.36)'); g.addColorStop(1, 'rgba(14,10,6,0)');
      ctx.fillStyle = g; ctx.fillRect(-ry, -ry, 2 * ry, 2 * ry); ctx.restore();
    }
  } else {
    // Background: a soft warm glow from below.
    ctx.fillStyle = P.bg; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.translate(W / 2, H * 1.2); ctx.scale(W / H * .9, 1);
    const r = H * 1.25, g = ctx.createRadialGradient(0, 0, 0, 0, 0, r); g.addColorStop(0, P.glow); g.addColorStop(.6, P.bg); g.addColorStop(1, P.bg);
    ctx.fillStyle = g; ctx.fillRect(-r, -r, 2 * r, 2 * r); ctx.restore();
  }
  // A thin ground band.
  ctx.fillStyle = P.band; ctx.fillRect(0, bandTop, W, band);
  if (m){
    const u = m.u;
    const markImg = logo && P.logo !== GOLD ? tint(imgs[0], P.logo) : imgs[0];
    if (pnt){ ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = u * .9; ctx.shadowOffsetY = u * .08; }
    let tx, ty, align;
    if (horiz){
      ctx.drawImage(markImg, bx, by + (m.H - m.markH) / 2, m.markW, m.markH);
      tx = bx + m.markW + m.gapM; ty = by + (m.H - m.textH) / 2; align = 'left';
    } else {
      ctx.drawImage(markImg, R.x + (R.w - m.markW) / 2, by, m.markW, m.markH);
      tx = R.x + R.w / 2; ty = by + m.markH + u * 1.6; align = 'center';
    }
    ctx.textAlign = align; ctx.textBaseline = 'alphabetic';
    const lines = (blk, font, size, lh, color, spacing) => { ctx.font = font; ctx.fillStyle = color; ctx.letterSpacing = spacing || '0px'; blk.lines.forEach(l => { ty += size * lh; ctx.fillText(l, tx, ty - size * (lh - 1) / 2 - size * .2); }); ctx.letterSpacing = '0px'; };
    lines(m.name, F_NAME(u), u * 4.4, 1.08, P.ink);
    if (m.msg.lines.length){ ty += u * .7; lines(m.msg, F_MSG(u), u * 2.5, 1.22, P.acc); }
    if (m.line.lines.length){ ty += u * .8; lines(m.line, F_LINE(u), u * 1.25, 1.4, P.soft, (u * .025) + 'px'); }
    if (m.rowH){
      ty += u * 1.3; let x = horiz ? tx : tx - m.rowW / 2;
      imgs.slice(1).forEach(im => { ctx.drawImage(im, x, ty, m.rowH, m.rowH); x += m.rowH + u * .55; });
    }
    ctx.shadowColor = 'rgba(0,0,0,0)'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  }
  canvas.fit = m ? {x: bx, y: by, w: m.W, h: m.H, u: m.u, R, parts: m.parts, side} : null;
  // The site, small at the bottom, in the ground band.
  const us = Math.max(band * .4, 9);
  if (us >= 9){
    ctx.font = `600 ${us}px Barlow, system-ui, sans-serif`; ctx.letterSpacing = (us * .08) + 'px'; ctx.fillStyle = look === 'light' ? SOFT : P.soft; ctx.textBaseline = 'middle';
    if (banner){ ctx.textAlign = 'right'; ctx.fillText(siteOf(sub), RS.x + RS.w, bandTop + band / 2); }
    else { ctx.textAlign = 'center'; ctx.fillText(siteOf(sub), W / 2, bandTop + band / 2); }
    ctx.letterSpacing = '0px';
  }
  return canvas;
}

// ---------- view ----------
const CSS = `
.sc-wrap{display:grid;grid-template-columns:minmax(0,380px) minmax(0,1fr);gap:18px;align-items:start;}
@media (max-width:900px){.sc-wrap{grid-template-columns:minmax(0,1fr);}.sc-prev{position:static;}}
.sc-wrap .card{min-width:0;}
.sc-chips{display:flex;flex-wrap:wrap;gap:8px;}
.sc-prev{position:sticky;top:12px;}
.sc-stage{background:var(--bg-deep);border:1px solid var(--line);border-radius:12px;padding:12px;display:flex;justify-content:center;align-items:center;min-height:160px;}
.sc-stage canvas{display:block;max-width:100%;max-height:66vh;width:auto;height:auto;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.16);}
.sc-meta{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-top:12px;}
.sc-cb{display:flex;align-items:center;gap:8px;margin-top:12px;font-weight:600;color:var(--ink-soft);}
.sc-bio{border-top:1px solid var(--line);padding:14px 0;}
.sc-bio:first-of-type{border-top:0;}
.sc-bio p{white-space:pre-wrap;margin:6px 0;overflow-wrap:anywhere;}
.sc-count{font-weight:600;font-size:14px;color:var(--ink-soft);}
.sc-count.over{color:var(--danger);}
.sc-wrap select,.sc-bios select{max-width:100%;}
`;
function chips(key, list, val){ return `<div class="sc-chips" role="group">${list.map(([k, l]) => `<button type="button" class="chip" data-sc="${key}" data-v="${esc(k)}" aria-pressed="${val === k}">${esc(l)}</button>`).join('')}</div>`; }
const clip = (t, n) => { t = String(t); return t.length > n ? t.slice(0, n - 3).replace(/\s+\S*$/, '') + '...' : t; };

function biosHtml(D){
  // A bio's subject is a card subject (Grow With Grounded) or a person (Chris Joy, Kayti Joy); a person's name comes from PEOPLE or the start of the bio's label.
  const subName = id => { const s = D.subjects.find(x => x.id === id || (id === 'grounded' && isGWG(x))); if (s) return s.name; if (PEOPLE[id]) return PEOPLE[id]; if (id === 'all') return 'Every Subject';
    const b = D.bios.find(x => x.subject === id && x.label); return b ? String(b.label).split(',')[0] : id; };
  const platName = id => (D.platforms.find(p => p.id === id) || {}).name || id;
  const subs = [...new Set(D.bios.map(b => b.subject))];
  const list = D.bios.map((b, i) => [b, i]).filter(([b]) => S.bios === 'all' || b.subject === S.bios);
  const order = D.platforms.map(p => p.id).concat([...new Set(D.bios.map(b => b.platform))]);
  const plats = [...new Set(order)].filter(p => list.some(([b]) => b.platform === p));
  return `<div class="card sc-bios" style="margin-top:18px"><h2 style="margin-bottom:4px">Bios</h2><p class="muted">A bio for each platform, written to its length. Tap Copy and paste it into the profile.</p>
  ${subs.length > 1 ? `<label class="f" for="sc-biosub">Show</label><select id="sc-biosub" data-sc="bios"><option value="all">Every Bio</option>${subs.map(s => `<option value="${esc(s)}"${S.bios === s ? ' selected' : ''}>${esc(subName(s))}</option>`).join('')}</select>` : ''}
  ${plats.length ? plats.map(p => `<h3 style="margin-top:16px">${esc(platName(p))}</h3>${list.filter(([b]) => b.platform === p).map(([b, i]) => { const n = chars(b.text), lim = +b.limit || 0; const aim = +b.aim || 0, nm = subName(b.subject), head = b.label ? (String(b.label).indexOf(nm) === 0 ? b.label : nm + ', ' + b.label) : nm + ', ' + platName(b.platform) + (b.part ? ' ' + b.part : '');
      return `<div class="sc-bio"><div class="spread"><b>${esc(head)}</b><span class="sc-count${lim && n > lim ? ' over' : ''}">${n}${aim ? ' characters, aiming for ' + aim + (lim ? ' (' + platName(b.platform) + ' allows ' + lim + ')' : '') : (lim ? ' of ' + lim : '') + ' characters'}</span></div><p>${esc(b.text)}</p><button type="button" class="btn btn-line btn-sm" data-sc="copy-bio" data-v="${i}">Copy</button></div>`; }).join('')}`).join('') : `<p class="muted" style="margin-top:10px">The bios arrive with the next Staff library update.</p>`}</div>`;
}
function inner(){
  const c = current(), {D, sub, msgs, plat, fmts, W, H} = c;
  const groups = KINDS.map(([k, l]) => [l, msgs.map((m, i) => [m, i]).filter(([m]) => (m.kind || 'slogan') === k)]).filter(g => g[1].length);
  const msgSel = `<select id="sc-msg" data-sc="msg"><optgroup label="Tagline"><option value="tag"${S.msg === 'tag' ? ' selected' : ''}>${esc(clip(sub.tagline || 'The tagline', 80))}</option></optgroup>
    ${groups.map(([l, list]) => `<optgroup label="${esc(l)}">${list.map(([m, i]) => `<option value="m:${i}"${S.msg === 'm:' + i ? ' selected' : ''}>${esc(clip(m.text, 80))}</option>`).join('')}</optgroup>`).join('')}
    <optgroup label="Your Words"><option value="own"${S.msg === 'own' ? ' selected' : ''}>Write My Own</option></optgroup></select>`;
  return `<div class="page-head"><div class="eyebrow">Grow With Grounded</div><h1>Share Card Builder</h1><p>Make a card or banner for any platform, sized and ready to post.</p></div>
  <div class="sc-wrap">
    <div class="card">
      <label class="f" for="sc-sub">Subject</label>
      <select id="sc-sub" data-sc="subject">${D.subjects.map(s => `<option value="${esc(s.id)}"${s.id === sub.id ? ' selected' : ''}>${esc(s.name)}</option>`).join('')}</select>
      <label class="f" for="sc-msg">Message</label>${msgSel}
      ${S.msg === 'own' ? `<label class="f" for="sc-own">Your Message</label><textarea id="sc-own" data-sc="own" rows="3" placeholder="Type the words for the card.">${esc(S.own)}</textarea>` : ''}
      <label class="f">Platform</label>${chips('platform', D.platforms.map(p => [p.id, p.name]), plat.id)}
      <label class="f">Format</label>${chips('format', fmts, S.format)}
      <label class="f">Look</label>${chips('look', LOOKS, S.look)}
      ${isGWG(sub) ? `<label class="sc-cb"><input type="checkbox" data-sc="marks"${S.marks ? ' checked' : ''}> Show the eight tree marks</label>` : ''}
    </div>
    <div class="card sc-prev">
      <div class="sc-stage"><canvas id="sc-canvas" width="${W}" height="${H}" role="img" aria-label="${esc(sub.name)} ${esc(plat.name)} ${esc(S.format)} preview"></canvas></div>
      <div class="sc-meta"><span class="muted"><b>${esc(plat.name)} ${esc((FORMATS.find(f => f[0] === S.format) || [])[1] || '')}</b>, ${W} by ${H} pixels</span><button type="button" class="btn btn-gold" data-sc="save">Save Image</button></div>
      ${(plat.safe || plat.safeNote) && S.format === 'banner' ? `<p class="muted" style="margin-top:8px;font-size:15px">${esc(plat.safe || plat.safeNote)}</p>` : ''}
    </div>
  </div>
  ${biosHtml(D)}`;
}
let TOKEN = 0;
function paint(){
  const cv = document.getElementById('sc-canvas'); if (!cv) return;
  const t = ++TOKEN, c = current();
  const off = document.createElement('canvas');
  draw(off, c, S.look).then(() => { if (t !== TOKEN || !document.body.contains(cv)) return; cv.width = off.width; cv.height = off.height; cv.getContext('2d').drawImage(off, 0, 0); cv.dataset.ready = '1'; }).catch(e => { console.warn('Share card', e); });
}
function rerender(){ const r = document.getElementById('sc-root'); if (!r) return; r.innerHTML = inner(); paint(); }
function toast(t){ const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 2200); }
async function copyText(t){
  try { await navigator.clipboard.writeText(t); }
  catch (e){ const a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (x){} a.remove(); }
  toast('Copied.');
}
async function save(){
  const c = current(); const cv = await draw(document.createElement('canvas'), c, S.look);
  const name = [slug(c.sub.name), slug(c.plat.name), (FORMATS.find(f => f[0] === S.format) || ['', 'Card'])[1], c.W + 'x' + c.H].join('-') + '.png';
  cv.toBlob(b => { if (!b) return; const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); toast('Saved ' + name); }, 'image/png');
}

document.addEventListener('click', e => {
  const t = e.target.closest && e.target.closest('#sc-root [data-sc]'); if (!t || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA' || t.type === 'checkbox') return;
  const k = t.dataset.sc, v = t.dataset.v;
  if (k === 'save'){ save(); return; }
  if (k === 'copy-bio'){ const b = data().bios[+v]; if (b) copyText(b.text); return; }
  if (k === 'platform' || k === 'format' || k === 'look'){ S[k] = v; rerender(); }
});
document.addEventListener('change', e => {
  const t = e.target; if (!t.closest || !t.closest('#sc-root') || !t.dataset.sc) return;
  const k = t.dataset.sc;
  if (k === 'subject'){ S.subject = t.value; S.msg = 'tag'; rerender(); }
  else if (k === 'msg'){ S.msg = t.value; rerender(); if (S.msg === 'own'){ const o = document.getElementById('sc-own'); if (o) o.focus(); } }
  else if (k === 'marks'){ S.marks = t.checked; paint(); }
  else if (k === 'bios'){ S.bios = t.value; rerender(); }
});
let ownT = null;
document.addEventListener('input', e => {
  const t = e.target; if (!t.closest || !t.closest('#sc-root') || t.dataset.sc !== 'own') return;
  S.own = t.value; clearTimeout(ownT); ownT = setTimeout(paint, 180);
});

(function(){ const s = document.createElement('style'); s.id = 'sc-css'; s.textContent = CSS; document.head.appendChild(s); })();

window.GGShare = {
  view(lib){ LIB = lib || null; setTimeout(paint, 0); return `<div id="sc-root">${inner()}</div>`; },
  // For tests and the lead: draw any card off screen. o = {subject, msg, own, platform, format, look, marks}.
  render(o){ Object.assign(S, o || {}); return draw(document.createElement('canvas'), current(), S.look); },
  state: S, data
};
})();
