// =====================================================================
// GROUNDED FIELD GUIDE (TM): the Marketing Studio (GWG BLD 1030), in the Share tab for Staff and Founders.
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// Pick a template (Story Quote, Book Announcement, Membership Invite, Ceremony or Service, Event or Talk), a ready size
// (Instagram Square and Portrait, Story, Facebook, LinkedIn, Pinterest, an 8.5 by 11 print flyer at 300 dpi), and any
// Grounded painting; the words sit on a soft shade in Grounded's fonts and colors with the logo, and one tap saves a
// JPEG or PNG made right here on this device. Nothing is sent anywhere.
// The paintings: every public painting from shared/imglib/share.js, locked with the Staff share key, HMAC SHA-256(the
// Staff library's clip key, "gg-share-images|v1"), so Staff and Founders open it. In the End paintings come from
// shared/imglib/book.js, locked with the Image Library's Founder image key (BLD 1027): Founders only until the book is
// out on December 21, 2026; each one is unlocked in the browser from audio.growwithgrounded.com, as the Image Library does.
// =====================================================================
(function(){
'use strict';
const R2 = 'https://audio.growwithgrounded.com/';
const SHARE_JS = '../shared/imglib/share.js?v=c176', BOOK_JS = '../shared/imglib/book.js?v=c176', LIB_JS = '../shared/imglib/library.js?v=c173';
const COVER = '../shared/books/in-the-end-cover-1200.webp';
const DPI = 300;
const SIZES = [
  ['sq', 'Instagram Square', 1080, 1080], ['pt', 'Instagram Portrait', 1080, 1350], ['st', 'Story', 1080, 1920],
  ['fb', 'Facebook Post', 1200, 630], ['li', 'LinkedIn', 1200, 627], ['pin', 'Pinterest', 1000, 1500],
  ['fly', 'Print Flyer, 8.5 by 11', 2550, 3300]
];
const COLL = [['book', 'In the End'], ['tv', 'Tree Videos'], ['pv', 'Page Videos'], ['gg', 'Get Grounded Now'], ['ls', 'Living Sober'], ['rec', 'Recipes'], ['prac', 'Practice Cards'], ['fit', 'Grounded Fitness'], ['story', 'Grounded Stories'], ['hw', 'Heartwood'], ['app', 'The Grounded Way App'], ['site', 'Site Pages']];
const CN = Object.fromEntries(COLL);
const TREES = [['oak', 'Oak'], ['maple', 'Maple'], ['aspen', 'Aspen'], ['pine', 'Pine'], ['birch', 'Birch'], ['sequoia', 'Sequoia'], ['willow', 'Willow'], ['grove', 'The Grove']];
const TN = Object.fromEntries(TREES);
// The templates: each sets the words, the link line, and a starting painting (all can be changed).
const TPL = {
  quote: {name: 'Story Quote', eyebrow: 'Grounded Stories', head: 'Sometimes the mess itself becomes part of the medicine.', body: '', foot: 'Chris Joy, Grounded in Coffee', site: 'growwithgrounded.com/stories', img: {p: 'shared/heroes/p/story-grounded-in-coffee.webp', t: 'Grounded in Coffee'}, quote: true},
  book: {name: 'Book Announcement', eyebrow: 'A New Book', head: 'In the End', body: 'What Sitting with the Dying Taught Me about Living', foot: 'December 21, 2026', site: 'growwithgrounded.com/books', img: {p: 'shared/books/in-the-end-cover-1200.webp', t: 'In the End, Book Cover'}, book: true},
  member: {name: 'Membership Invite', eyebrow: 'The Grounded Way', head: 'Every part of you, working together.', body: 'Founding Members: $8 a month or $64 a year for your first year. Founding prices for our first 500 members.', foot: 'Start Membership', site: 'growwithgrounded.com', img: {p: 'shared/heroes/p/site-index-card-membership.webp', t: 'Membership'}},
  service: {name: 'Ceremony or Service', eyebrow: 'Ceremonies', head: 'Weddings, blessings, and new beginnings.', body: 'Ceremonies for all faith traditions and everything in-between.', foot: '', site: 'growwithgrounded.com/services', img: {p: 'shared/heroes/p/site-weddings-hero-wide.webp', t: 'Weddings'}},
  event: {name: 'Event or Talk', eyebrow: 'A Talk', head: 'The Grounded Way', body: 'A simple way to tend your mind, body, spirit, and relationships.', foot: '', site: 'growwithgrounded.com/speaking-training', img: {p: 'shared/heroes/home-wide.webp', t: 'The Grounded Way'}}
};
const PLACES = [['auto', 'Auto'], ['top', 'Top'], ['bottom', 'Bottom']];
const SHADES = [['soft', 'Soft'], ['med', 'Medium'], ['strong', 'Strong']];
const FOCI = [['top', 'Top'], ['center', 'Center'], ['bottom', 'Bottom']];
const PER = 24;

const S = {tpl: 'quote', size: 'sq', place: 'auto', shade: 'med', focus: 'center', logo: true, img: null, c: 'all', r: '', q: '', shown: PER,
  eyebrow: '', head: '', body: '', foot: '', site: ''};
let OPT = {}, ITEMS = [], LOAD = null, BOOKKEY = null, NOTE = '';
const IMG = {}, BURL = {};
const enc = new TextEncoder(), dec = new TextDecoder();
const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const unb64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const b64 = buf => { let s = ''; new Uint8Array(buf).forEach(b => { s += String.fromCharCode(b); }); return btoa(s); };
const subtle = window.crypto && window.crypto.subtle;
const $ = q => document.querySelector(q);
const fmt = n => Number(n).toLocaleString('en-US');

function applyTpl(k){
  const t = TPL[k]; S.tpl = k;
  S.eyebrow = t.eyebrow; S.head = t.head; S.body = t.body; S.foot = t.foot; S.site = t.site;
  S.img = Object.assign({kind: 'site'}, t.img);
}
applyTpl('quote');

// ---------- the lists ----------
function hmacKey(clipB64, label){
  return subtle.importKey('raw', unb64(clipB64), {name: 'HMAC', hash: 'SHA-256'}, false, ['sign'])
    .then(k => subtle.sign('HMAC', k, enc.encode(label)))
    .then(raw => subtle.importKey('raw', raw, {name: 'AES-GCM'}, false, ['decrypt']));
}
function script(url, global){
  if (window[global]) return Promise.resolve(window[global]);
  return new Promise(ok => { const s = document.createElement('script'); s.src = url; s.onload = () => ok(window[global] || null); s.onerror = () => ok(null); document.head.appendChild(s); });
}
async function openBox(key, box){
  const z = await subtle.decrypt({name: 'AES-GCM', iv: unb64(box.iv)}, key, unb64(box.ct));
  const buf = box.z === 'gzip' ? await new Response(new Blob([z]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer() : z;
  return JSON.parse(dec.decode(buf));
}
function load(){
  if (LOAD) return LOAD;
  LOAD = (async () => {
    const out = [];
    if (OPT.staffClip && subtle){
      try {
        const box = await script(SHARE_JS, 'GG_SHAREIMG');
        if (box){ const d = await openBox(await hmacKey(OPT.staffClip, 'gg-share-images|v1'), box); (d.items || []).forEach(it => out.push(it)); }
      } catch (e){ console.warn('Marketing Studio: the painting list', e); }
    }
    if (OPT.founder && OPT.founderClip && subtle){
      try {
        BOOKKEY = await hmacKey(OPT.founderClip, 'gg-image-library|v1');
        const box = await script(BOOK_JS, 'GG_IMGBOOK');
        if (box){ const d = await openBox(BOOKKEY, box); out.unshift(...(d.items || []).sort((a, b) => (a.o || 0) - (b.o || 0))); }
        if (!out.some(x => x.c !== 'book')){
          // Founders without the Staff list still see every public painting, from the Image Library list.
          const lb = await script(LIB_JS, 'GG_IMGLIB');
          if (lb){ const d = await openBox(BOOKKEY, lb); (d.items || []).forEach(x => { if (x.c !== 'book') out.push({t: x.t, c: x.c, r: x.r, k: x.k, u: x.u, b: x.v[0], s: (x.v.slice().reverse().find(v => Math.min(v[1], v[2]) >= 300) || x.v[0])[0]}); }); }
        }
      } catch (e){ console.warn('Marketing Studio: In the End', e); }
    }
    ITEMS = out;
    NOTE = out.length ? '' : 'The painting library opens with a Staff or Founder code. The template paintings are ready to use.';
    return out;
  })();
  return LOAD;
}
function bookUrl(id){
  if (BURL[id]) return BURL[id];
  const k = (window.GG_IMGBOOK || window.GG_IMGLIB || {}).k || {round: 's1', folder: 'i'};
  BURL[id] = fetch(R2 + k.round + '/' + k.folder + '/' + id + '.bin', {mode: 'cors'})
    .then(r => { if (!r.ok) throw new Error('http ' + r.status); return r.arrayBuffer(); })
    .then(buf => { const b = new Uint8Array(buf); return subtle.decrypt({name: 'AES-GCM', iv: b.slice(0, 12)}, BOOKKEY, b.slice(12)); })
    .then(pt => URL.createObjectURL(new Blob([pt], {type: 'image/jpeg'})));
  BURL[id].catch(() => { delete BURL[id]; });
  return BURL[id];
}
const srcOf = p => '../' + (p.indexOf('~/') === 0 ? 'shared/heroes/' + p.slice(2) : p);
function hay(it){ if (!it._h) it._h = [it.t, CN[it.c], it.r ? TN[it.r] : '', it.s && it.c === 'book' ? it.s : '', it.k || '', it.u || '', it.b && it.b[0] ? it.b[0] : ''].join(' ').toLowerCase(); return it._h; }
function list(){
  const words = S.q.toLowerCase().split(/\s+/).filter(Boolean), out = [];
  ITEMS.forEach((it, i) => {
    if (S.c !== 'all' && it.c !== S.c) return;
    if (S.r && it.r !== S.r) return;
    if (words.length){ const h = hay(it); if (!words.every(w => h.indexOf(w) >= 0)) return; }
    out.push(i);
  });
  return out;
}

// ---------- drawing ----------
function photo(url){
  if (IMG[url]) return IMG[url];
  IMG[url] = new Promise((ok, no) => { const im = new Image(); im.onload = () => ok(im); im.onerror = () => no(new Error('painting ' + url)); im.src = url; });
  IMG[url].catch(() => { delete IMG[url]; });
  return IMG[url];
}
function imgOf(sel, big){
  if (sel.kind === 'book') return bookUrl(big ? sel.f : sel.w).then(photo);
  return photo(srcOf(sel.p));
}
let LOGO = null;
function logo(){
  if (LOGO) return LOGO;
  LOGO = fetch('../favicon.svg').then(r => r.text()).then(txt => {
    const tree = txt.slice(1).match(/<svg\b[^>]*viewBox="0 0 3200 3536"[^>]*>[\s\S]*?<\/svg>/);
    let t = tree ? tree[0].replace(/^<svg\b/, '<svg xmlns="http://www.w3.org/2000/svg"').replace(/\s(x|y|width|height)="[^"]*"/g, '') : txt;
    t = t.replace(/<svg\b([^>]*)>/, '<svg$1 width="640" height="707">').replace(/fill="#8B5E1A"/g, 'fill="#FFF3DC"');
    const im = new Image(); im.src = URL.createObjectURL(new Blob([t], {type: 'image/svg+xml'}));
    return im.decode().then(() => im);
  });
  LOGO.catch(() => { LOGO = null; });
  return LOGO;
}
let FONTS = null;
function fonts(){
  if (!FONTS) FONTS = Promise.all(['600 40px "Cormorant Garamond"', 'italic 500 40px "Cormorant Garamond"', '500 20px Barlow', '600 20px Barlow', '700 20px "Barlow Condensed"'].map(f => document.fonts.load(f).catch(() => null))).then(() => document.fonts.ready);
  return FONTS;
}
const F = {
  eye: s => `700 ${s}px "Barlow Condensed", "Barlow", system-ui, sans-serif`,
  head: s => `600 ${s}px "Cormorant Garamond", Georgia, serif`,
  quote: s => `italic 500 ${s}px "Cormorant Garamond", Georgia, serif`,
  body: s => `500 ${s}px Barlow, system-ui, sans-serif`,
  foot: s => `600 ${s}px Barlow, system-ui, sans-serif`,
  brand: s => `600 ${s}px "Cormorant Garamond", Georgia, serif`
};
function wrap(ctx, text, maxW){
  const out = [];
  String(text || '').split('\n').forEach(par => {
    const words = par.split(/\s+/).filter(Boolean); let line = '';
    if (!words.length){ return; }
    words.forEach(w => { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width <= maxW || !line) line = t; else { out.push(line); line = w; } });
    if (line) out.push(line);
  });
  return out;
}
const CREAM = '#FFF8EC', GOLDL = '#F2C677', SOFTC = '#EFE2CB';
// The text block: eyebrow, headline, body, footer, and the link line; returns the lines and sizes that fit maxW by maxH.
function block(ctx, u, maxW, maxH, quote){
  const head = quote && S.head ? '“' + S.head.replace(/^["“]|["”]$/g, '') + '”' : S.head;
  for (let k = 1.35; k > .35; k -= .05){
    const z = {eye: u * .95 * k, head: u * (quote ? 2.5 : 2.9) * k, body: u * 1.3 * k, foot: u * 1.05 * k, site: u * .95 * k};
    const parts = [];
    const add = (key, text, font, size, color, gap, lh, track) => { if (!String(text || '').trim()) return; ctx.font = font(size); ctx.letterSpacing = track ? (size * track) + 'px' : '0px'; const ls = wrap(ctx, key === 'eye' ? String(text).toUpperCase() : text, maxW); ctx.letterSpacing = '0px'; parts.push({key, ls, font, size, color, gap, lh, track}); };
    add('eye', S.eyebrow, F.eye, z.eye, GOLDL, 0, 1.2, .16);
    add('head', head, quote ? F.quote : F.head, z.head, CREAM, z.eye * .55, 1.12);
    add('body', S.body, F.body, z.body, SOFTC, z.head * .42, 1.42);
    add('foot', S.foot, quote ? F.foot : F.foot, z.foot, quote ? GOLDL : CREAM, z.body * .9, 1.35);
    add('site', S.site, F.body, z.site, SOFTC, z.foot * .7, 1.3, .04);
    let h = 0; parts.forEach((p, i) => { h += (i ? p.gap : 0) + p.ls.length * p.size * p.lh; });
    if (h <= maxH) return {parts, h};
  }
  return {parts: [], h: u * .4};
}
function paintBlock(ctx, B, x, y, align){
  ctx.textBaseline = 'top'; ctx.textAlign = align;
  B.parts.forEach((p, i) => {
    y += i ? p.gap : 0;
    ctx.font = p.font(p.size); ctx.fillStyle = p.color; ctx.letterSpacing = p.track ? (p.size * p.track) + 'px' : '0px';
    p.ls.forEach(l => { ctx.fillText(l, x, y + p.size * (p.lh - 1) / 2); y += p.size * p.lh; });
  });
  ctx.letterSpacing = '0px';
}
function coverFill(ctx, im, x, y, w, h, fy){
  const iw = im.naturalWidth, ih = im.naturalHeight, k = Math.max(w / iw, h / ih), dw = iw * k, dh = ih * k;
  ctx.drawImage(im, x + (w - dw) / 2, y + (h - dh) * fy, dw, dh);
}
function blurred(im, W, H){
  // A soft, blurred version of the painting (drawn small, then large), the same in every browser.
  const c = document.createElement('canvas'); c.width = 14; c.height = Math.max(6, Math.round(14 * H / W));
  const x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; coverFill(x, im, 0, 0, c.width, c.height, .5);
  const c2 = document.createElement('canvas'); c2.width = 96; c2.height = Math.max(24, Math.round(96 * H / W));
  const x2 = c2.getContext('2d'); x2.imageSmoothingQuality = 'high'; x2.drawImage(c, 0, 0, c2.width, c2.height);
  return c2;
}
function brand(ctx, lg, x, y, s, align){
  // The logo: the Grounded tree and the name, in cream, with a soft shade of its own.
  ctx.save();
  ctx.font = F.brand(s * .62); const nm = 'Grow With Grounded™', tw = ctx.measureText(nm).width;
  const lw = s * 640 / 707, gap = s * .28, total = lw + gap + tw;
  const x0 = align === 'right' ? x - total : align === 'center' ? x - total / 2 : x;
  // the soft shade: an oval that fades to nothing at its edge
  const r = total * .75, cxm = x0 + total / 2, cym = y + s / 2;
  ctx.save(); ctx.translate(cxm, cym); ctx.scale(1, (s * 1.5) / r);
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
  g.addColorStop(0, 'rgba(20,13,6,.42)'); g.addColorStop(.6, 'rgba(20,13,6,.22)'); g.addColorStop(1, 'rgba(20,13,6,0)');
  ctx.fillStyle = g; ctx.fillRect(-r, -r, r * 2, r * 2); ctx.restore();
  ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = s * .25;
  if (lg) ctx.drawImage(lg, x0, y, lw, s);
  ctx.fillStyle = CREAM; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  ctx.fillText(nm, x0 + lw + gap, y + s * .55);
  ctx.restore();
  return total;
}
const SHADE = {soft: .58, med: .74, strong: .86};
async function draw(canvas, sel, k){
  // k: the preview draws smaller (k under 1), so only the saved file is made at full size.
  const sz = SIZES.find(z => z[0] === S.size) || SIZES[0], W = sz[2], H = sz[3]; k = k || 1;
  canvas.width = Math.round(W * k); canvas.height = Math.round(H * k);
  const ctx = canvas.getContext('2d'); ctx.setTransform(k, 0, 0, k, 0, 0); ctx.imageSmoothingQuality = 'high';
  await fonts();
  const big = W * H * k * k > 2.5e6;
  let im = null; try { im = await imgOf(sel || S.img, big); } catch (e){ im = null; }
  const lg = S.logo ? await logo().catch(() => null) : null;
  const u = Math.min(W, H) / 36, pad = Math.round(u * 2.6), fy = {top: .1, center: .5, bottom: .9}[S.focus];
  const wide = W / H > 1.5, a = SHADE[S.shade];
  ctx.fillStyle = '#2A1E15'; ctx.fillRect(0, 0, W, H);
  if (TPL[S.tpl].book){
    // Book Announcement: the painting soft and dark behind, the cover as a book, the words beside or below it.
    if (im){ ctx.save(); ctx.globalAlpha = 1; ctx.drawImage(blurred(im, W, H), 0, 0, W, H); ctx.restore(); }
    ctx.fillStyle = `rgba(18,12,6,${.35 + a * .35})`; ctx.fillRect(0, 0, W, H);
    let cv = null; try { cv = await photo(COVER); } catch (e){}
    const bh = Math.round(u * 1.9);
    let cs, cx, cy, tx, ty, tw, th, align;
    if (wide){ cs = Math.round(H - pad * 2.2); cx = pad * 1.2; cy = (H - cs) / 2; tx = cx + cs + pad * 1.2; tw = W - tx - pad; ty = pad + bh + u * 1.4; th = H - ty - pad; align = 'left'; }
    else { cs = Math.round(Math.min(W * .56, H * .42)); cx = (W - cs) / 2; cy = pad + bh + u * 2.4; tx = W / 2; tw = W - pad * 2; ty = cy + cs + u * 2.4; th = H - ty - pad; align = 'center'; }
    if (cv){
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = u * 2.2; ctx.shadowOffsetX = u * .6; ctx.shadowOffsetY = u * .9;
      ctx.fillStyle = '#000'; ctx.fillRect(cx, cy, cs, cs); ctx.restore();
      ctx.drawImage(cv, cx, cy, cs, cs);
      const sp = ctx.createLinearGradient(cx, 0, cx + cs * .07, 0); sp.addColorStop(0, 'rgba(0,0,0,.4)'); sp.addColorStop(.5, 'rgba(255,255,255,.14)'); sp.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sp; ctx.fillRect(cx, cy, cs * .07, cs);
    }
    const B = block(ctx, u, tw, th, false);
    const by = wide ? ty + Math.max(0, (th - B.h) / 2) : ty;
    paintBlock(ctx, B, tx, by, align);
    if (S.logo) brand(ctx, lg, wide ? tx : W / 2, pad, bh, wide ? 'left' : 'center');
    canvas.dataset.boxes = JSON.stringify({text: [tx, by, B.h], cover: [cx, cy, cs]});
    return canvas;
  }
  if (im) coverFill(ctx, im, 0, 0, W, H, fy);
  const bh = Math.round(u * 1.9);
  if (wide){
    // Wide posts: the words on the left over a soft shade that fades to the right.
    const tw = W * .52, B = block(ctx, u, tw, H - pad * 2 - bh - u * 1.6, TPL[S.tpl].quote);
    const g = ctx.createLinearGradient(0, 0, W * .78, 0);
    g.addColorStop(0, `rgba(20,13,6,${a})`); g.addColorStop(.62, `rgba(20,13,6,${a * .72})`); g.addColorStop(1, 'rgba(20,13,6,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const top = pad + bh + u * 1.6, by = top + Math.max(0, (H - pad - top - B.h) / 2);
    paintBlock(ctx, B, pad, by, 'left');
    if (S.logo) brand(ctx, lg, pad, pad, bh, 'left');
    canvas.dataset.boxes = JSON.stringify({text: [pad, by, B.h]});
    return canvas;
  }
  const atTop = S.place === 'top';
  const maxH = H * (H / W > 1.6 ? .5 : .6) - bh;
  const B = block(ctx, u, W - pad * 2, maxH, TPL[S.tpl].quote);
  const bandH = B.h + pad * 2.2 + (atTop ? bh + u * 1.4 : 0);
  const g = atTop ? ctx.createLinearGradient(0, 0, 0, bandH * 1.35) : ctx.createLinearGradient(0, H, 0, H - bandH * 1.35);
  g.addColorStop(0, `rgba(20,13,6,${a})`); g.addColorStop(.7, `rgba(20,13,6,${a * .8})`); g.addColorStop(1, 'rgba(20,13,6,0)');
  ctx.fillStyle = g; if (atTop) ctx.fillRect(0, 0, W, bandH * 1.35); else ctx.fillRect(0, H - bandH * 1.35, W, bandH * 1.35);
  const by = atTop ? pad + bh + u * 1.4 : H - pad - B.h;
  paintBlock(ctx, B, W / 2, by, 'center');
  if (S.logo) brand(ctx, lg, W / 2, atTop ? pad : pad, bh, 'center');
  canvas.dataset.boxes = JSON.stringify({text: [W / 2, by, B.h]});
  return canvas;
}

// ---------- files ----------
function crcTable(){ const t = []; for (let n = 0; n < 256; n++){ let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; }
let CRC = null;
function crc(bytes){ CRC = CRC || crcTable(); let c = 0xFFFFFFFF; for (let i = 0; i < bytes.length; i++) c = CRC[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
async function withDpi(blob, type){
  const b = new Uint8Array(await blob.arrayBuffer());
  if (type === 'image/jpeg'){
    // The JFIF header: units dots per inch, 300 by 300.
    if (b[2] === 0xFF && b[3] === 0xE0 && String.fromCharCode(b[6], b[7], b[8], b[9]) === 'JFIF'){ b[13] = 1; b[14] = DPI >> 8; b[15] = DPI & 255; b[16] = DPI >> 8; b[17] = DPI & 255; }
    return new Blob([b], {type});
  }
  // PNG: a pHYs chunk (pixels per meter) right after IHDR.
  const ppm = Math.round(DPI / .0254), ch = new Uint8Array(21), dv = new DataView(ch.buffer);
  dv.setUint32(0, 9); ch.set([112, 72, 89, 115], 4); dv.setUint32(8, ppm); dv.setUint32(12, ppm); ch[16] = 1; dv.setUint32(17, crc(ch.subarray(4, 17)));
  const at = 33; return new Blob([b.subarray(0, at), ch, b.subarray(at)], {type});
}
const slug = t => String(t).replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
function fileName(ext){ const sz = SIZES.find(z => z[0] === S.size); return ['Grounded', slug(TPL[S.tpl].name), slug(sz[1].split(',')[0]), sz[2] + 'x' + sz[3]].join('-') + '.' + ext; }
async function file(type){
  const cv = await draw(document.createElement('canvas'));
  let blob = await new Promise(ok => cv.toBlob(ok, type, .92));
  const W = cv.width, H = cv.height; cv.width = cv.height = 0;
  if (S.size === 'fly') blob = await withDpi(blob, type);
  return {blob, name: fileName(type === 'image/png' ? 'png' : 'jpg'), W, H};
}
function save(blob, name){ const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); toast('Saved ' + name); }
function toast(t){ const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 2200); }

// ---------- view ----------
const CSS = `#ms-root{margin-top:26px}.ms-wrap{display:grid;grid-template-columns:minmax(0,400px) minmax(0,1fr);gap:18px;align-items:start}
@media(max-width:900px){.ms-wrap{grid-template-columns:minmax(0,1fr)}.ms-prev{position:static !important}}
.ms-wrap .card{min-width:0}.ms-prev{position:sticky;top:12px}.ms-chips{display:flex;flex-wrap:wrap;gap:8px}
.ms-stage{background:var(--bg-deep);border:1px solid var(--line);border-radius:12px;padding:12px;display:flex;justify-content:center;align-items:center;min-height:160px}
.ms-stage canvas{display:block;max-width:100%;max-height:68vh;width:auto;height:auto;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.18)}
.ms-meta{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-top:12px}.ms-saves{display:flex;flex-wrap:wrap;gap:8px}
.ms-f input[type=text],.ms-f textarea,.ms-find input,.ms-find select{width:100%;max-width:100%;box-sizing:border-box}
.ms-cb{display:flex;align-items:center;gap:8px;margin-top:12px;font-weight:600;color:var(--ink-soft)}
.ms-lib{margin-top:18px}.ms-find{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,200px);gap:10px;margin-top:12px}@media(max-width:600px){.ms-find{grid-template-columns:minmax(0,1fr)}}
.ms-grid{list-style:none;margin:14px 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px}
.ms-grid li{min-width:0}.ms-tile{position:relative;display:block;width:100%;padding:0;border:2px solid transparent;border-radius:12px;background:var(--card);cursor:pointer;text-align:left;color:var(--ink);overflow:hidden}
.ms-tile[aria-pressed="true"]{border-color:var(--gold)}.ms-tile img{display:block;width:100%;aspect-ratio:1;object-fit:cover;background:var(--bg-deep)}
.ms-tile>span:last-child{padding:6px 8px 8px;font-size:13.5px;line-height:1.3;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.ms-tag{position:absolute;margin:6px;padding:1px 8px;border-radius:999px;background:rgba(0,0,0,.6);color:#fff;font-size:12px;font-weight:700}
.ms-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.ms-count{font-size:14px;color:var(--ink-soft);margin-top:10px}.ms-now{font-size:15px;color:var(--ink-soft);margin-top:10px;overflow-wrap:anywhere}`;
const chips = (key, list, val) => `<div class="ms-chips" role="group">${list.map(([k, l]) => `<button type="button" class="chip" data-ms="${key}" data-v="${esc(k)}" aria-pressed="${val === k}">${esc(l)}</button>`).join('')}</div>`;
function form(){
  return `<div class="page-head" style="margin-bottom:12px"><div class="eyebrow">Grow With Grounded</div><h2 style="margin:0">Marketing Studio</h2><p>Every Grounded painting, ready sizes for each platform and print, and your words in Grounded's fonts and colors with the logo. Tap Save, and post.</p></div>
  <div id="ms-top">${top()}</div>${libHtml()}`;
}
function top(){
  const sz = SIZES.find(z => z[0] === S.size);
  return `<div class="ms-wrap">
    <div class="card ms-f">
      <label class="f">Template</label>${chips('tpl', Object.entries(TPL).map(([k, t]) => [k, t.name]), S.tpl)}
      <label class="f">Size</label>${chips('size', SIZES.map(z => [z[0], z[1]]), S.size)}
      <label class="f" for="ms-eyebrow">Small Line Above</label><input type="text" id="ms-eyebrow" data-ms-t="eyebrow" maxlength="40" value="${esc(S.eyebrow)}" autocomplete="off">
      <label class="f" for="ms-head">${TPL[S.tpl].quote ? 'Quote' : 'Headline'}</label><textarea id="ms-head" data-ms-t="head" rows="2" maxlength="160">${esc(S.head)}</textarea>
      <label class="f" for="ms-body">${TPL[S.tpl].book ? 'Subtitle' : 'Tagline or Message'}</label><textarea id="ms-body" data-ms-t="body" rows="3" maxlength="240">${esc(S.body)}</textarea>
      <label class="f" for="ms-foot">${TPL[S.tpl].quote ? 'Who Said It' : 'Date, Place, or Call to Action'}</label><input type="text" id="ms-foot" data-ms-t="foot" maxlength="90" value="${esc(S.foot)}" placeholder="${TPL[S.tpl].quote ? 'Chris Joy, Grounded in Coffee' : 'Thursday, December 3, 7 PM, The Community Room'}" autocomplete="off">
      <label class="f" for="ms-site">Link Line</label><input type="text" id="ms-site" data-ms-t="site" maxlength="60" value="${esc(S.site)}" autocomplete="off">
      ${TPL[S.tpl].book ? '' : `<label class="f">Words Sit</label>${chips('place', PLACES, S.place)}`}
      <label class="f">Shade Behind the Words</label>${chips('shade', SHADES, S.shade)}
      ${TPL[S.tpl].book ? '' : `<label class="f">Painting Focus</label>${chips('focus', FOCI, S.focus)}`}
      <label class="ms-cb"><input type="checkbox" data-ms="logo"${S.logo ? ' checked' : ''}> Show the Grow With Grounded logo</label>
      <p class="ms-now" id="ms-now">Painting: <b>${esc(S.img.t || '')}</b>${TPL[S.tpl].book ? ' (behind the cover)' : ''}</p>
    </div>
    <div class="card ms-prev">
      <div class="ms-stage"><canvas id="ms-canvas" width="${Math.round(sz[2] * Math.min(1, 1350 / Math.max(sz[2], sz[3])))}" height="${Math.round(sz[3] * Math.min(1, 1350 / Math.max(sz[2], sz[3])))}" role="img" aria-label="${esc(TPL[S.tpl].name)} preview, ${esc(sz[1])}"></canvas></div>
      <div class="ms-meta"><span class="muted"><b>${esc(sz[1])}</b>, ${sz[2]} by ${sz[3]} pixels${S.size === 'fly' ? ' at 300 dpi' : ''}</span>
        <span class="ms-saves"><button type="button" class="btn btn-gold" data-ms="save-jpg">Save JPEG</button><button type="button" class="btn btn-line" data-ms="save-png">Save PNG</button></span></div>
      ${S.size === 'fly' ? '<p class="muted" style="margin-top:8px;font-size:15px">Letter size, 8.5 by 11 inches at 300 dpi, with the words held well inside the edges for any home or office printer.</p>' : ''}
    </div>
  </div>`;
}
function libHtml(){
  return `<div class="card ms-lib"><h3 style="margin:0 0 4px">Choose a Painting</h3><p class="muted" style="margin:0">Search by story, tree, topic, video, or recipe. Tap a painting to use it.${OPT.founder ? ' In the End paintings are for Founders until December 21, 2026.' : ''}</p>
    <div id="ms-colls"></div>
    <div class="ms-find"><label class="ms-sr" for="ms-q">Search paintings</label><input id="ms-q" type="search" placeholder="Search: sunrise, kitchen, Oak, Living Sober" value="${esc(S.q)}" autocomplete="off" spellcheck="false"><label class="ms-sr" for="ms-tree">Tree</label><select id="ms-tree"></select></div>
    <p class="ms-count" id="ms-count" aria-live="polite">Opening the paintings...</p>
    <ul class="ms-grid" id="ms-grid"></ul>
    <div style="text-align:center;margin-top:12px"><button type="button" class="btn btn-line" id="ms-more" data-ms="more" hidden>Show More</button></div>
  </div>`;
}
function tile(i){
  const it = ITEMS[i], on = S.img && (it.c === 'book' ? S.img.w === it.b.w[0] : S.img.p === it.b[0]);
  const meta = (CN[it.c] || '') + (it.r ? ', ' + TN[it.r] : '');
  const img = it.c === 'book' ? `<img alt="" data-bid="${esc(it.b.th[0])}" width="300" height="300">` : `<img alt="" loading="lazy" decoding="async" src="${esc(srcOf(it.s || it.b[0]))}">`;
  return `<li><button type="button" class="ms-tile" data-ms="pick" data-v="${i}" aria-pressed="${on}" title="${esc(it.t + ', ' + meta)}">${it.c === 'book' ? '<span class="ms-tag">Founders</span>' : ''}${img}<span>${esc(it.t)}</span></button></li>`;
}
function grid(){
  const g = $('#ms-grid'); if (!g) return;
  const L = list(), n = Math.min(L.length, S.shown);
  const counts = {all: ITEMS.length}; ITEMS.forEach(it => { counts[it.c] = (counts[it.c] || 0) + 1; });
  const co = $('#ms-colls');
  if (co) co.innerHTML = ITEMS.length ? `<div class="ms-chips" role="group" aria-label="Collections" style="margin-top:12px"><button type="button" class="chip" data-ms="coll" data-v="all" aria-pressed="${S.c === 'all'}">Everything ${fmt(counts.all)}</button>${COLL.filter(c => counts[c[0]]).map(c => `<button type="button" class="chip" data-ms="coll" data-v="${c[0]}" aria-pressed="${S.c === c[0]}">${esc(c[1])} ${fmt(counts[c[0]])}</button>`).join('')}</div>` : '';
  const trees = {}; ITEMS.forEach(it => { if (it.r && (S.c === 'all' || it.c === S.c)) trees[it.r] = (trees[it.r] || 0) + 1; });
  const sel = $('#ms-tree'); if (sel){ sel.innerHTML = '<option value="">Every Tree</option>' + TREES.filter(t => trees[t[0]]).map(t => `<option value="${t[0]}"${S.r === t[0] ? ' selected' : ''}>${t[1]} (${fmt(trees[t[0]])})</option>`).join(''); sel.disabled = !Object.keys(trees).length; }
  g.innerHTML = L.slice(0, n).map(tile).join('');
  g.querySelectorAll('img[data-bid]').forEach(im => bookUrl(im.getAttribute('data-bid')).then(u => { im.src = u; }, () => { im.alt = 'Resting. Try again soon.'; }));
  const m = $('#ms-more'); if (m) m.hidden = n >= L.length;
  const c = $('#ms-count'); if (c) c.textContent = !ITEMS.length ? (NOTE || 'Opening the paintings...') : L.length ? `Showing ${fmt(n)} of ${fmt(L.length)} ${L.length === 1 ? 'painting' : 'paintings'}` : 'No paintings match yet. Try another word or collection.';
}
let TOKEN = 0, TIMER = null;
function paint(){
  const cv = $('#ms-canvas'); if (!cv) return;
  const t = ++TOKEN, off = document.createElement('canvas');
  const z = SIZES.find(x => x[0] === S.size) || SIZES[0];
  draw(off, null, Math.min(1, 1350 / Math.max(z[2], z[3]))).then(() => { if (t !== TOKEN || !document.body.contains(cv)) return; cv.width = off.width; cv.height = off.height; cv.getContext('2d').drawImage(off, 0, 0); cv.dataset.ready = '1'; cv.dataset.boxes = off.dataset.boxes || ''; off.width = off.height = 0; }).catch(e => console.warn('Marketing Studio', e));
}
function soon(){ clearTimeout(TIMER); const cv = $('#ms-canvas'); if (cv) cv.dataset.ready = ''; TIMER = setTimeout(paint, 140); }
// A choice redraws the form and the preview only; the painting list stays as it is.
function rerender(){ const t = $('#ms-top'); if (!t) return; t.innerHTML = top(); paint(); }

document.addEventListener('click', e => {
  const j = e.target.closest && e.target.closest('[data-ms-jump]'); if (j){ e.preventDefault(); const r = $('#ms-root'); if (r) r.scrollIntoView({behavior: 'smooth', block: 'start'}); return; }
  const b = e.target.closest && e.target.closest('#ms-root [data-ms]'); if (!b) return;
  const k = b.dataset.ms, v = b.dataset.v;
  if (k === 'tpl'){ applyTpl(v); if (TPL[v].book) S.place = 'auto'; rerender(); return; }
  if (k === 'size' || k === 'place' || k === 'shade' || k === 'focus'){ S[k] = v; rerender(); return; }
  if (k === 'coll'){ S.c = v; S.r = ''; S.shown = PER; grid(); return; }
  if (k === 'more'){ S.shown += PER * 2; grid(); return; }
  if (k === 'pick'){
    const it = ITEMS[+v]; if (!it) return;
    S.img = it.c === 'book' ? {kind: 'book', w: it.b.w[0], f: it.b.f[0], t: it.t} : {kind: 'site', p: it.b[0], t: it.t};
    document.querySelectorAll('#ms-grid .ms-tile').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    const now = $('#ms-now'); if (now) now.innerHTML = 'Painting: <b>' + esc(it.t) + '</b>' + (TPL[S.tpl].book ? ' (behind the cover)' : '');
    paint(); return;
  }
  if (k === 'save-jpg' || k === 'save-png'){
    const type = k === 'save-png' ? 'image/png' : 'image/jpeg';
    b.disabled = true; file(type).then(f => save(f.blob, f.name)).catch(err => { console.warn(err); toast('That painting is resting. Try another.'); }).finally(() => { b.disabled = false; });
  }
});
document.addEventListener('change', e => {
  const t = e.target; if (!t.closest || !t.closest('#ms-root')) return;
  if (t.dataset.ms === 'logo'){ S.logo = t.checked; paint(); }
  if (t.id === 'ms-tree'){ S.r = t.value; S.shown = PER; grid(); }
});
let QT = null;
document.addEventListener('input', e => {
  const t = e.target; if (!t.closest || !t.closest('#ms-root')) return;
  if (t.dataset.msT){ S[t.dataset.msT] = t.value; soon(); }
  if (t.id === 'ms-q'){ clearTimeout(QT); QT = setTimeout(() => { S.q = t.value; S.shown = PER; grid(); }, 180); }
});

(function(){ const s = document.createElement('style'); s.id = 'ms-css'; s.textContent = CSS; document.head.appendChild(s); })();

window.GGStudio = {
  // o = {founder, staffClip (the Staff library's audio.key), founderClip (the Founder library's audio.key)}.
  view(o){
    o = o || {};
    if (o.staffClip !== OPT.staffClip || o.founderClip !== OPT.founderClip || !!o.founder !== !!OPT.founder){ OPT = {founder: !!o.founder, staffClip: o.staffClip || null, founderClip: o.founder ? o.founderClip || null : null}; LOAD = null; ITEMS = []; }
    setTimeout(() => { paint(); load().then(grid); }, 0);
    return `<div id="ms-root">${form()}</div>`;
  },
  // For tests: set the state, draw off screen, and make the saved files.
  set(o){ o = Object.assign({}, o || {}); if (o.tpl){ applyTpl(o.tpl); delete o.tpl; } Object.assign(S, o); },
  render: () => draw(document.createElement('canvas')),
  file, load, items: () => ITEMS, sizes: SIZES, templates: TPL, state: S
};
})();
