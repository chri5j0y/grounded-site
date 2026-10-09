// =====================================================================
// GROUNDED FIELD GUIDE (TM): Heartwood (GWG BLD 772).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// Heartwood is the couple's private app that comes with The Grounded Marriage (site: heartwood/). Its content is
// sealed on the site as heartwood/lib-heartwood.js; the readable copy lives only in the private workshop
// (heartwood/content/heartwood-content.json). Staff and Founders only; Guides never see any of this.
//
// Seal Heartwood (Founder tab): choose heartwood-content.json; reuse the Heartwood key in the Staff library
// (LIB.heartwood = {key: base64 of 32 bytes, made, v: 1}) or make a new one; the content is sealed here with
// AES-GCM into lib-heartwood.js (downloaded, to upload to heartwood/ on the site):
//   window.GFG_HEARTWOOD = {v: 1, made, iv, ct}, ct = AES-GCM of {_gfg: 'heartwood', v: 1, made, data: {BTV_Q, ...}}.
// A new key goes into the Staff library through Update a Library (Seal It, then upload lib-staff.js with
// lib-heartwood.js), and every earlier invite stops opening Heartwood once both are uploaded.
//
// Make Heartwood Invite (the client file, clients.js, and the premarital couple header, premarital.js): a short
// readable code (8 letters and numbers with no look-alikes, shown as ABCD-EFGH) and a link
// growwithgrounded.com/heartwood/#hw=<salt>.<iv>.<ct> (base64url): the Heartwood key sealed under the code with PBKDF2
// (250,000 rounds, SHA-256, the same as the Field Guide's codes) and AES-GCM. Nothing new is uploaded per couple.
// The invite (link and code) is kept on the client file (or the couple, when it has no client file) as
// rec.hw = {made, by, code, link}: inside DATA, encrypted on this device and in the locked backup like every
// other client record, so it can be shown again. One invite per couple; a new one replaces what is shown here,
// and earlier ones keep working until the next new Heartwood key.
//
// Email and Text (GWG BLD 773): beside the Copy buttons, each partner gets Email the Link and Text the Link, then
// (separate buttons) Email the Code and Text the Code, so the code never rides in the same message as the link. Names,
// emails, and phones come from the client file (the first partner), the premarital couple (first names), and a linked
// Wedding Plan (both partners); a missing email or phone opens the message with an empty address.
//
// Open Heartwood (GWG BLD 773, Staff and Founders): the top of the Premarital tab and the client file's Heartwood block.
// It makes a throwaway invite on the spot, sealed under a random code bound to the moment it was made
// (PBKDF2 pass 'open:<code>:<time>', never a couple's code: theirs are letters and numbers only), and opens
// heartwood/#hw=<invite>&hc=<code>&ht=<time> in a new tab. heartwood/open.js takes it once, within 15 minutes, then
// clears the address bar; a link without hc still asks for the code, as before.
//
// GGHw.content() opens lib-heartwood.js with the Staff library's key for the Premarital tab (the questions, the
// results words, and the faith backgrounds). On a Founder device that just sealed, it uses that content right away.
// =====================================================================
(function(){
'use strict';

let C = {}; // GGHw.init: lib(), tier(), data(), save(), render(), toast(), pendingPlain(lvl), setUpd(u), updBusy()
const ROUNDS = 250000;
const SITE = 'https://growwithgrounded.com/heartwood/';
const LIBURL = '../heartwood/lib-heartwood.js';
const ALPHA = 'ACDEFGHJKMNPQRTUVWXY34679'; // no 0 O 1 I L 2 Z 5 S 8 B
const enc = new TextEncoder(), dec = new TextDecoder();
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const b64 = u => { let s = ''; new Uint8Array(u).forEach(b => s += String.fromCharCode(b)); return btoa(s); };
const unb64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const b64u = u => b64(u).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const pad = n => String(n).padStart(2, '0');
const today = () => { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
const nice = s => { const m = /^(\d{4})-(\d\d)-(\d\d)/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'}) : ''; };
const tier = () => (C.tier && C.tier()) || '';
const isStaff = () => tier() === 'staff' || tier() === 'founder';
const isFounder = () => tier() === 'founder';
const D = () => (C.data && C.data()) || null;
const toast = m => C.toast ? C.toast(m) : null;
const normCode = s => String(s || '').normalize('NFKC').toUpperCase().replace(/[^A-Z0-9]/g, '');
const showCode = s => { s = normCode(s); return s.length === 8 ? s.slice(0, 4) + '-' + s.slice(4) : s; };

// ---------- the Heartwood key (Staff library) ----------
function keyOf(L){ const h = L && L.heartwood; if (!h || typeof h.key !== 'string') return null; try { return unb64(h.key).length === 32 ? h : null; } catch (e) { return null; } }
const hwKey = () => keyOf(C.lib && C.lib());
const aesKey = (raw, uses) => crypto.subtle.importKey('raw', typeof raw === 'string' ? unb64(raw) : raw, {name: 'AES-GCM'}, false, uses);

// ---------- the content (for the Premarital tab) ----------
let MEM = null, MEMK = '', LAST = null, STAMP = 0;
function parseLib(t){ const at = t.indexOf('GFG_HEARTWOOD'), a = at < 0 ? -1 : t.indexOf('{', at), b = t.lastIndexOf('}'); if (a < 0 || b < a) return null; try { return JSON.parse(t.slice(a, b + 1)); } catch (e) { return null; } }
async function content(){
  const h = hwKey(); if (!h) return null;
  if (MEM && MEMK === h.key) return MEM;
  if (LAST && LAST.key === h.key) { MEM = LAST.data; MEMK = h.key; return MEM; }
  let lib = null;
  try { const r = await fetch(new URL(LIBURL, location.href).href, {cache: 'no-cache'}); if (r.ok) lib = parseLib(await r.text()); } catch (e) {}
  if (!lib || lib.pending || typeof lib.iv !== 'string' || typeof lib.ct !== 'string') return null;
  try {
    const pt = await crypto.subtle.decrypt({name: 'AES-GCM', iv: unb64(lib.iv)}, await aesKey(h.key, ['decrypt']), unb64(lib.ct));
    const o = JSON.parse(dec.decode(pt)); if (!o || o._gfg !== 'heartwood' || !o.data) return null;
    MEM = o.data; MEMK = h.key; return MEM;
  } catch (e) { return null; }
}

// ---------- Seal Heartwood (Founder tab) ----------
const HS = {doc: null, name: '', err: '', mode: '', out: null, busy: false};
function countsOf(d){
  const L = d.GG_LEARN_GM, vids = L && Array.isArray(L.tracks) ? L.tracks.reduce((n, t) => n + ((t && t.lessons) || []).length, 0) : 0;
  return [[(d.BTV_Q && d.BTV_Q.questions || []).length, 'questions'], [(d.GM_WB && d.GM_WB.chapters || []).length, 'workbook chapters'], [(d.GM_PR && d.GM_PR.items || []).length, 'practices'], [vids, 'videos']]
    .map(([n, w]) => n + ' ' + w).join(', ');
}
function sealView(){
  if (!isFounder()) return '';
  const h = hwKey(), mode = HS.mode || (h ? 'reuse' : 'new');
  return `<div class="card" id="hw-seal" style="border-left:4px solid var(--gold)"><h3>Seal Heartwood</h3>
   <p class="muted">Heartwood is the couple's private app in The Grounded Marriage. Its content goes on the site sealed, as heartwood/lib-heartwood.js, and its key lives in the Staff library, so Staff and Founders can make couple invites and the Premarital tab can read the questions.</p>
   <p style="margin-top:10px">${h ? `<span class="pill sage">Key in the Staff library</span> Made ${esc(nice(h.made) || 'earlier')}.` : '<span class="pill gold">No Heartwood key yet</span> Sealing makes the first one.'}</p>
   <h4 style="margin-top:14px">1. Choose the Content File</h4>
   <p class="muted">heartwood-content.json, from a chat. It is readable, so never upload it to the site.</p>
   <div class="row" style="margin-top:8px"><label class="btn btn-gold btn-sm" style="cursor:pointer">Choose Content File<input type="file" id="hw-file" accept=".json,application/json" hidden></label></div>
   ${HS.err ? `<p class="tipbox" style="border-left:3px solid var(--danger)">${esc(HS.err)}</p>` : ''}
   ${HS.doc ? `<p style="margin-top:8px"><b>${esc(HS.name)}</b>${HS.doc.made ? ', made ' + esc(nice(HS.doc.made)) : ''}: ${esc(countsOf(HS.doc.data))}.</p>` : ''}
   <h4 style="margin-top:14px">2. The Key</h4>
   <div class="row" style="margin-top:6px;flex-direction:column;align-items:flex-start;gap:8px">
    ${h ? `<label><input type="radio" name="hw-mode" value="reuse"${mode === 'reuse' ? ' checked' : ''}> Reuse the Heartwood key (every invite keeps working)</label>` : ''}
    <label><input type="radio" name="hw-mode" value="new"${mode === 'new' ? ' checked' : ''}> Make a new Heartwood key</label></div>
   ${mode === 'new' && h ? '<p class="tipbox" style="border-left:3px solid var(--danger)">A new key retires every Heartwood invite made so far. Once the new files are uploaded, couples who already opened Heartwood need a new invite and code.</p>' : ''}
   ${mode === 'new' ? '<p class="muted" style="margin-top:8px">The new key goes into the Staff library through Update a Library: Seal It there, then upload lib-staff.js together with lib-heartwood.js.</p>' : ''}
   <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold" data-hwa="seal"${HS.doc && !HS.busy ? '' : ' disabled'}>${HS.busy ? 'Sealing...' : 'Seal Heartwood'}</button></div>
   ${HS.out ? `<div class="tipbox" style="margin-top:12px"><b>lib-heartwood.js is ready</b> (sealed ${esc(nice(HS.out.made))}). Upload it to the heartwood folder on the site${HS.out.newKey ? ', together with lib-staff.js once you Seal It in Update a Library' : ''}. Nothing changes for couples until it is uploaded.
     <div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-hwa="dl">Download lib-heartwood.js Again</button></div></div>` : ''}</div>`;
}
async function readFile(f){
  HS.err = ''; HS.doc = null; HS.out = null;
  let o = null; try { const t = await f.text(); if (/window\.GFG_/.test(t)) HS.err = "That's a sealed file for the site. Choose heartwood-content.json instead."; else o = JSON.parse(t); } catch (e) { HS.err = "That file couldn't be read. Choose heartwood-content.json."; }
  if (o && !HS.err){
    const d = o.data;
    if (o._gfg !== 'heartwood-content' || !d || typeof d !== 'object') HS.err = "That isn't a Heartwood content file.";
    else if (!d.BTV_Q || !Array.isArray(d.BTV_Q.questions) || !d.BTV_Q.questions.length || !Array.isArray(d.BTV_Q.areas)) HS.err = 'That content file has no questions. Ask the chat for a fresh one.';
    else { HS.doc = o; HS.name = f.name || 'heartwood-content.json'; }
  }
  rr('#hw-seal');
}
function download(text, name){ const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], {type: 'text/javascript'})); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }
async function seal(){
  if (!isFounder() || !HS.doc || HS.busy) return;
  const h = hwKey(), mode = HS.mode || (h ? 'reuse' : 'new');
  if (mode === 'new' && C.updBusy && C.updBusy()) return alert('An update is waiting in Update a Library. Seal it or cancel it first, then seal Heartwood.');
  if (mode === 'new' && h && !confirm('Make a new Heartwood key? Every Heartwood invite made so far stops working once the new files are uploaded, and couples who already opened Heartwood will need a new invite and code.')) return;
  HS.busy = true; C.render && C.render();
  try {
    const raw = mode === 'new' ? b64(crypto.getRandomValues(new Uint8Array(32))) : h.key, made = today();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = await crypto.subtle.encrypt({name: 'AES-GCM', iv}, await aesKey(raw, ['encrypt']), enc.encode(JSON.stringify({_gfg: 'heartwood', v: 1, made, data: HS.doc.data})));
    const js = "/* Heartwood's sealed content (GWG BLD 772), sealed " + made + ' in the Field Guide (Founder tab, Seal Heartwood). Upload to heartwood/ on the site. */\n'
      + 'window.GFG_HEARTWOOD = ' + JSON.stringify({v: 1, made, iv: b64(iv), ct: b64(ct)}) + ';\n';
    HS.out = {js, made, newKey: mode === 'new'};
    LAST = {key: raw, data: HS.doc.data}; MEM = null; STAMP++;
    download(js, 'lib-heartwood.js');
    if (mode === 'new'){
      const cur = await C.pendingPlain('staff');
      if (!cur){ HS.busy = false; HS.err = "This device can't open the Staff library, so the new key can't be kept. Nothing was changed."; HS.out = null; LAST = null; C.render && C.render(); return; }
      const next = JSON.parse(JSON.stringify(cur)); next.heartwood = {key: raw, made, v: 1};
      next._rev = (cur._rev || 0) + 1; next._updated = made;
      HS.busy = false; HS.mode = '';
      C.setUpd({lvl: 'staff', title: 'Heartwood Key (Seal Heartwood)', note: 'The key for the lib-heartwood.js you just downloaded. Seal It, then upload lib-staff.js and lib-heartwood.js together.',
        rows: [[cur.heartwood ? 'Replaces' : 'Adds', 'heartwood']], warns: cur.heartwood ? ['A new key retires every Heartwood invite made so far, once both files are uploaded.'] : [], from: cur._rev || 0, next});
      toast('lib-heartwood.js downloaded. Now Seal It below.');
      return;
    }
    HS.busy = false; rr('#hw-seal'); toast('lib-heartwood.js downloaded. Upload it to the heartwood folder on the site.');
  } catch (e) { HS.busy = false; HS.err = 'Sealing did not work on this device. Try again.'; C.render && C.render(); }
}

// ---------- invites (Staff and Founders) ----------
function newCode(){
  const out = []; const buf = new Uint8Array(32);
  while (out.length < 8){ crypto.getRandomValues(buf); for (const b of buf){ if (b < 250 && out.length < 8) out.push(ALPHA[b % 25]); } }
  return out.join('');
}
async function makeInvite(rawKey, code, pass){
  const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
  const base = await crypto.subtle.importKey('raw', enc.encode(pass || normCode(code)), 'PBKDF2', false, ['deriveKey']);
  const k = await crypto.subtle.deriveKey({name: 'PBKDF2', salt, iterations: ROUNDS, hash: 'SHA-256'}, base, {name: 'AES-GCM', length: 256}, false, ['encrypt']);
  const ct = await crypto.subtle.encrypt({name: 'AES-GCM', iv}, k, unb64(rawKey));
  return b64u(salt) + '.' + b64u(iv) + '.' + b64u(new Uint8Array(ct));
}
const files = () => { const d = D(); return d && d.cli && Array.isArray(d.cli.files) ? d.cli.files : []; };
const couples = () => { const d = D(); return d && d.pm && Array.isArray(d.pm.couples) ? d.pm.couples : []; };
// The record that keeps a couple's invite: the client file when there is one, otherwise the premarital couple.
function recFor(kind, id){
  if (kind === 'cli') return files().find(f => f.id === id) || null;
  const c = couples().find(x => x.id === id); if (!c) return null;
  return (c.cli && files().find(f => f.id === c.cli)) || c;
}
const OPEN = {id: '', busy: false};
// ---------- Email and Text for each partner (GWG BLD 773) ----------
const mailHref = (em, sub, body) => 'mailto:' + encodeURIComponent(String(em || '').trim()).replace(/%40/g, '@') + '?subject=' + encodeURIComponent(sub) + '&body=' + encodeURIComponent(body);
const smsHref = (ph, body) => 'sms:' + String(ph || '').replace(/[^\d+]/g, '') + '?&body=' + encodeURIComponent(body);
const first = s => String(s || '').trim().split(/\s+/)[0] || '';
// Both partners: names, emails, and phones from the client file, the premarital couple, and a linked Wedding Plan.
function partners(kind, id){
  const d = D() || {}, rec = recFor(kind, id) || {};
  const f = kind === 'cli' ? rec : (rec.c && rec.c.first !== undefined ? rec : null);
  const cp = kind === 'pm' ? couples().find(x => x.id === id) : couples().find(x => f && x.cli === f.id);
  const plans = d.wdp && Array.isArray(d.wdp.plans) ? d.wdp.plans : [];
  const wd = plans.find(p => (f && (p.cli === f.id || ((f.links || {}).wd || []).includes(p.id))) || (cp && p.pm === cp.id));
  const w = k => (wd && wd.c && wd.c[k]) || {}, fc = (f && f.c) || {};
  const P = [
    {name: first(fc.first) || (cp && cp.p1 && cp.p1.name) || w('p1').called || first(w('p1').full), em: fc.email || w('p1').em, ph: fc.phone || w('p1').ph},
    {name: first(fc.partner) || (cp && cp.p2 && cp.p2.name) || w('p2').called || first(w('p2').full), em: w('p2').em, ph: w('p2').ph}];
  return P.map((p, i) => ({name: String(p.name || '').trim() || (i ? 'Second Partner' : 'First Partner'), em: String(p.em || '').trim(), ph: String(p.ph || '').trim()}));
}
const SUBJ_LINK = 'Heartwood, your private app for the two of you', SUBJ_CODE = 'Your Heartwood code';
const hi = (p, t) => 'Hi ' + p.name + ',\n\n' + t;
function sendRows(kind, id, inv){
  return `<div class="hw-send" style="margin-top:12px"><h4 style="margin:0">Email or Text Each of Them</h4>
    <p class="muted" style="margin:4px 0 0;font-size:15px">Send the link first, then the code in a separate message.</p>
    ${partners(kind, id).map((p, i) => `<div class="hw-send1" data-hwp="${i}" style="margin-top:10px"><b>${esc(p.name)}</b> <small class="muted">${esc([p.em, p.ph].filter(Boolean).join(', ') || 'No email or phone on file yet')}</small>
      <div class="row" style="margin-top:6px"><a class="btn btn-line btn-sm" data-hws="link-mail" href="${esc(mailHref(p.em, SUBJ_LINK, hi(p, linkText(inv.link))))}">Email the Link</a><a class="btn btn-line btn-sm" data-hws="link-text" href="${esc(smsHref(p.ph, hi(p, linkText(inv.link))))}">Text the Link</a></div>
      <div class="row" style="margin-top:6px"><a class="btn btn-line btn-sm" data-hws="code-mail" href="${esc(mailHref(p.em, SUBJ_CODE, hi(p, codeText(inv.code))))}">Email the Code</a><a class="btn btn-line btn-sm" data-hws="code-text" href="${esc(smsHref(p.ph, hi(p, codeText(inv.code))))}">Text the Code</a></div></div>`).join('')}
    <p class="muted" style="margin-top:8px;font-size:14px">On a Mac, Text opens Messages. Missing an email or phone? The message opens with the address empty, ready to fill in.</p></div>`;
}

// ---------- Open Heartwood (GWG BLD 773, Staff and Founders) ----------
const HWOPEN = () => new URL('../heartwood/', location.href).href;
const OPENR = {busy: false, link: ''};
function openBtn(){
  return `<button type="button" class="btn btn-line btn-sm" data-hwa="open"${OPENR.busy ? ' disabled' : ''}>${OPENR.busy ? 'Opening...' : 'Open Heartwood'}</button>`;
}
function openLate(){ return OPENR.link ? `<p class="tipbox" style="margin-top:8px">The browser kept the new tab from opening. <a href="${esc(OPENR.link)}" target="_blank" rel="noopener" data-hwa="opened">Open Heartwood Now</a></p>` : ''; }
// The top of the Premarital tab.
function openView(){
  if (!isStaff()) return '';
  return `<div class="card hw-open" style="border-left:4px solid var(--gold)"><div class="spread" style="flex-wrap:wrap;gap:8px"><div style="min-width:0"><h3 style="margin:0">Heartwood</h3>
    <p class="muted" style="margin:4px 0 0;font-size:15px">${hwKey() ? 'Opens Heartwood in a new tab, unlocked with the Staff key. No code needed.' : 'Seal Heartwood comes first: a Founder seals it in the Founder tab, and its key arrives with the Staff library.'}</p></div>
    ${hwKey() ? openBtn() : ''}</div>${openLate()}</div>`;
}
async function openHw(){
  if (!isStaff() || OPENR.busy) return;
  const h = hwKey(); if (!h) return alert('Seal Heartwood comes first. A Founder seals it in the Founder tab.');
  const w = window.open('', '_blank'); // opened right away, so the browser lets it through
  OPENR.busy = true; OPENR.link = ''; C.render && C.render();
  try {
    const code = newCode() + newCode(), ht = String(Date.now());
    const inv = await makeInvite(h.key, '', 'open:' + code + ':' + ht);
    const url = HWOPEN() + '#hw=' + inv + '&hc=' + code + '&ht=' + ht;
    OPENR.busy = false;
    if (w && !w.closed){ try { w.opener = null; } catch (e) {} w.location.href = url; }
    else OPENR.link = url;
    C.render && C.render();
  } catch (e) { OPENR.busy = false; if (w) try { w.close(); } catch (x) {} C.render && C.render(); alert('Heartwood could not be opened on this device. Try again.'); }
}
const rr = sel => { C.render && C.render(); setTimeout(() => { const el = document.querySelector(sel); if (el) el.scrollIntoView({block: 'start'}); }, 30); };
const linkText = link => 'Here is Heartwood, the private app for the two of you that comes with The Grounded Marriage. Each of you, open this link on your own phone: ' + link + ' We will send your code separately. Everything you write in Heartwood stays on your own phone.';
const codeText = code => 'Your Heartwood code is ' + showCode(code) + '. When Heartwood asks, type it on each of your phones. Keep it just between the two of you.';
function inviteBlock(kind, id, o = {}){
  if (!isStaff()) return '';
  const rec = recFor(kind, id); if (!rec) return '';
  const h = hwKey(), inv = rec.hw && rec.hw.link ? rec.hw : null, key = kind + ':' + id, open = OPEN.id === key && inv;
  const qr = open && window.GGQR && GGQR.svg ? GGQR.svg(inv.link, {label: 'QR code for the Heartwood invite link', border: 2}) : '';
  const body = !h ? '<p class="tipbox" style="margin-top:8px">Seal Heartwood comes first: a Founder seals it in the Founder tab, and its key arrives with the Staff library. Then invites can be made here.</p>'
    : `${inv ? `<p style="margin-top:6px"><span class="pill sage">Invite made ${esc(nice(inv.made))}</span>${inv.by ? ' <small class="muted">by ' + esc(inv.by) + '</small>' : ''}</p>` : ''}
    <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold btn-sm" data-hwa="make" data-hwk="${esc(kind)}" data-hwv="${esc(id)}"${OPEN.busy ? ' disabled' : ''}>${OPEN.busy && OPEN.id === key ? 'Making...' : inv ? 'Make a New Invite' : 'Make Heartwood Invite'}</button>${inv ? `<button type="button" class="btn btn-line btn-sm" data-hwa="show" data-hwk="${esc(kind)}" data-hwv="${esc(id)}" aria-expanded="${!!open}">${open ? 'Hide the Invite' : 'Show the Invite'}</button>` : ''}${openBtn()}</div>${openLate()}
    ${open ? `<div class="hw-inv-panel" style="margin-top:12px">
      <label class="f" for="hw-link">The link, for both of them</label><input id="hw-link" readonly value="${esc(inv.link)}" style="width:100%">
      ${qr ? `<div class="hw-qr" style="max-width:200px;margin:10px 0">${qr}</div>` : ''}
      <label class="f" for="hw-lt">Send with the link</label><textarea id="hw-lt" rows="4" readonly style="width:100%">${esc(linkText(inv.link))}</textarea>
      <div class="row" style="margin-top:6px"><button type="button" class="btn btn-line btn-sm" data-hwa="copy" data-hwt="hw-lt">Copy the Link Message</button><button type="button" class="btn btn-line btn-sm" data-hwa="copy" data-hwt="hw-link">Copy Just the Link</button></div>
      <label class="f" style="margin-top:12px">The code, sent separately</label><p class="hw-code" style="font-size:26px;font-weight:700;letter-spacing:.12em;margin:4px 0">${esc(showCode(inv.code))}</p>
      <label class="f" for="hw-ct">Send with the code, in a separate message</label><textarea id="hw-ct" rows="3" readonly style="width:100%">${esc(codeText(inv.code))}</textarea>
      <div class="row" style="margin-top:6px"><button type="button" class="btn btn-line btn-sm" data-hwa="copy" data-hwt="hw-ct">Copy the Code Message</button></div>
      ${sendRows(kind, id, inv)}
      <p class="muted" style="margin-top:10px;font-size:15px">Each partner opens the link on their own phone and types the code. A new invite gives a new code; earlier invites keep working until the next new Heartwood key.</p></div>` : ''}`;
  return `<div class="${o.bare ? '' : 'card '}hw-inv" style="${o.bare ? '' : 'margin-top:14px;'}border-left:4px solid var(--gold)${o.bare ? ';padding-left:12px;margin-top:12px' : ''}"><h3 style="margin:0">Heartwood</h3>
   <p class="muted" style="margin:4px 0 0">The couple's private app. An invite is a link for both of them, and a short code you give them separately.</p>${body}${o.bare ? `<div class="row" style="margin-top:8px"><button type="button" class="linkbtn" data-hwa="close">Close</button></div>` : ''}</div>`;
}
// The premarital couple header: a small Heartwood Invite button, opening the full block in place.
function headBits(kind, id){
  if (!isStaff() || !recFor(kind, id)) return '';
  const key = kind + ':' + id, rec = recFor(kind, id);
  if (OPEN.id === key) return inviteBlock(kind, id, {bare: true});
  return ` <button type="button" class="linkbtn" data-hwa="show" data-hwk="${esc(kind)}" data-hwv="${esc(id)}">${rec.hw && rec.hw.link ? 'Heartwood Invite' : 'Make Heartwood Invite'}</button>`;
}
async function make(kind, id){
  if (!isStaff() || OPEN.busy) return;
  const rec = recFor(kind, id), h = hwKey(); if (!rec) return;
  if (!h) return alert('Seal Heartwood comes first. A Founder seals it in the Founder tab.');
  if (rec.hw && rec.hw.link && !confirm('Make a new Heartwood invite? It gets a new code, shown here from now on. The earlier link and code keep working.')) return;
  OPEN.busy = true; OPEN.id = kind + ':' + id; rr('.hw-inv');
  try {
    const code = newCode(), inv = await makeInvite(h.key, code);
    const by = String(((D() || {}).settings || {}).name || '').trim();
    rec.hw = {made: today(), by, code, link: SITE + '#hw=' + inv};
    rec.u = Date.now(); C.save && C.save();
    OPEN.busy = false; rr('.hw-inv'); toast('Heartwood invite made. Send the link, then the code separately.');
  } catch (e) { OPEN.busy = false; C.render && C.render(); alert('The invite could not be made on this device. Try again.'); }
}
function copy(id){
  const el = document.getElementById(id); if (!el) return;
  const t = el.value, ok = () => toast('Copied.');
  const old = () => { try { el.select(); document.execCommand('copy'); ok(); } catch (e) { toast('Select the text and copy it.'); } };
  try { if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t).then(ok, old); } catch (e) {}
  old();
}

document.addEventListener('click', e => {
  const b = e.target.closest && e.target.closest('[data-hwa]'); if (!b) return;
  const a = b.getAttribute('data-hwa'), k = b.getAttribute('data-hwk'), v = b.getAttribute('data-hwv');
  if (a === 'seal') seal();
  else if (a === 'dl' && HS.out) download(HS.out.js, 'lib-heartwood.js');
  else if (a === 'make') make(k, v);
  else if (a === 'show'){ const key = k + ':' + v; OPEN.id = OPEN.id === key ? '' : key; rr('.hw-inv'); }
  else if (a === 'copy') copy(b.getAttribute('data-hwt'));
  else if (a === 'close'){ OPEN.id = ''; C.render && C.render(); }
  else if (a === 'open'){ e.preventDefault(); openHw(); }
  else if (a === 'opened'){ OPENR.link = ''; setTimeout(() => C.render && C.render(), 50); }
});
document.addEventListener('change', e => {
  const t = e.target; if (!t) return;
  if (t.id === 'hw-file' && t.files && t.files[0]){ const f = t.files[0]; t.value = ''; readFile(f); }
  else if (t.name === 'hw-mode'){ HS.mode = t.value; rr('#hw-seal'); }
});

window.GGHw = {
  init(ctx){ C = ctx || {}; },
  sealView, inviteBlock, headBits, content, openView,
  hasKey: () => !!hwKey(),
  stamp: () => STAMP + ':' + ((hwKey() || {}).key || '').slice(0, 6),
  // for tests and the Premarital tab
  _normCode: normCode, _newCode: newCode, _partners: partners
};
})();
