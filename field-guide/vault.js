// =====================================================================
// GROUNDED FIELD GUIDE (TM): The Story Vault (GWG BLD 784).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// Founders only, in the Founder tab. Every story Chris has written lives here: Vault (kept here while he tends it),
// Early Preview (members see it first), or Posted (on Grounded Stories: a preview for everyone, the whole story for
// members, and the whole story for everyone when Open to Everyone is on).
//
// Where it lives: the Founder library, FDR.storyVault = {v: 1, key: {v: 1, round: 's1', folder: 't', key}, codes:
// [{c, label, made, cancelled?, salt, iv, ct}], stories: [{id, title, sub, col, status, open, substack, credit, paras,
// preview, chars, voice, note, voiced, and Vault only alt?, draftNote?, refs?}], sealed?: {at, posted, early, codes}}.
// The BLD 784 Founder patch adds it.
//
// How edits save (the Update a Library pattern): each change is made to FDR.storyVault on this device, then, a moment
// later, index.html's fdrKeep seals the whole Founder library with the Founder key into "Ready to Upload" (lib-founder.js),
// the same sealed draft Seal It makes (DATA.founder.draft.libs.founder). The draft rides inside this device's encrypted
// records (and the one backup file), so the Vault reopens with every change. Uploading lib-founder.js carries the
// changes to every Founder device. One revision step covers everything waiting to upload. While an update from a chat
// waits in Update a Library for the Founder library, the Vault waits too, so neither one undoes the other.
//
// Member Codes: GGStories.makeCode() on this device, the stories key wrapped by the code with GGStories.makeWrap (Root
// Words method). The code is shown once; the label stays only here. Seal Grounded Stories: GGStories.seal(Posted and
// Early Preview stories, the key, the wraps of every active code) makes stories/data.js to upload. Vault stories and
// labels never go into data.js.
// =====================================================================
(function(){
'use strict';

let C = {}; // GGVault.init: fdr(), tier(), keep() -> Promise<bool>, render(), toast(m), updLvl()
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const unb64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const pad = n => String(n).padStart(2, '0');
const today = () => { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
const nice = s => { const m = /^(\d{4})-(\d\d)-(\d\d)/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'}) : ''; };
const toast = m => C.toast ? C.toast(m) : null;
const isFounder = () => !!(C.tier && C.tier() === 'founder');
const SV = () => { const f = C.fdr && C.fdr(); const v = f && f.storyVault; return v && Array.isArray(v.stories) ? v : null; };
const waits = () => !!(C.updLvl && C.updLvl() === 'founder');

const ST = [['vault', 'Vault'], ['early', 'Early Preview'], ['posted', 'Posted']];
const stName = k => (ST.find(x => x[0] === k) || ST[0])[1];
const FILTERS = [['all', 'All'], ['posted', 'Posted'], ['early', 'Early Preview'], ['vault', 'Vault'], ['voice', 'Needs a Voice']];
const NOTEBOOK = 'Story: Chris Joy, from my notebook. Names and details changed.';
const pubCredit = t => 'Story: Chris Joy, ' + t + ' · Read it on Grounded';
const needsVoice = s => !s.voiced && s.voice !== false;
const charsOf = paras => paras.join('\n\n').length;
// Visitors see the opening paragraphs up to about 1,500 characters: at least one, and always short of the whole story.
function previewOf(paras){
  let n = 0, c = 0;
  while (n < paras.length && c < 1500){ c += paras[n].length; n++; }
  if (n >= paras.length) n = paras.length - 1;
  return paras.length < 2 ? 0 : Math.max(1, n); // a one paragraph piece has no separate preview (stories.json's rule)
}
const splitParas = t => String(t || '').replace(/\r\n?/g, '\n').split(/\n\s*\n/).map(p => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean);

const UI = {f: 'all', q: '', open: null, adding: false, shown: null, out: null, busy: false, err: '', groups: null, saved: 0};

// ---------- saving ----------
let saveT = null, chain = Promise.resolve();
function keep(now){
  clearTimeout(saveT);
  const go = () => { chain = chain.then(async () => {
    let ok = false; try { ok = await (C.keep ? C.keep() : false); } catch (e) { ok = false; }
    UI.saved = ok ? Date.now() : -1; const el = document.getElementById('sv-saved'); if (el) el.innerHTML = savedLine();
  }); return chain; };
  if (now) return go();
  saveT = setTimeout(go, 700); return chain;
}
function savedLine(){
  if (UI.saved === -1) return '<span class="pill warn">Saving needs a moment</span> Try that change again in a moment.';
  return UI.saved ? 'Saved on this device. Upload lib-founder.js from Ready to Upload to carry it to every Founder device.' : 'Changes save on this device as you go.';
}
function rr(){ const y = window.scrollY; C.render && C.render(); window.scrollTo(0, y); }

// ---------- the list ----------
function counts(V){
  const n = {posted: 0, early: 0, vault: 0, open: 0, voice: 0};
  V.stories.forEach(s => { n[s.status] = (n[s.status] || 0) + 1; if (s.open && s.status === 'posted') n.open++; if (needsVoice(s)) n.voice++; });
  return n;
}
function matches(s){
  const f = UI.f;
  if (f === 'voice' ? !needsVoice(s) : f !== 'all' && s.status !== f) return false;
  const q = UI.q.trim().toLowerCase(); if (!q) return true;
  return [s.title, s.sub, s.col, s.note].concat(s.paras || []).some(t => String(t || '').toLowerCase().includes(q));
}
function pills(s){
  const st = s.status === 'posted' ? 'sage' : s.status === 'early' ? 'gold' : '';
  return `<span class="pill ${st}">${esc(stName(s.status))}</span>${s.open ? ' <span class="pill sage">Open to Everyone</span>' : ''}${needsVoice(s) ? ' <span class="pill gold">Needs a Voice</span>' : ''}`;
}
function listHTML(){
  const V = SV(); if (!V) return '';
  const cols = [], by = {};
  V.stories.forEach(s => { const c = s.col || 'Stories'; if (!by[c]){ by[c] = []; cols.push(c); } by[c].push(s); });
  const q = !!UI.q.trim() || UI.f !== 'all';
  const html = cols.map(c => {
    const all = by[c], cs = all.filter(matches); if (!cs.length) return '';
    const posted = all.filter(s => s.status !== 'vault').length, open = q || (UI.groups || []).includes(c);
    return `<details class="proof-sec sv-g" data-svg="${esc(c)}"${open ? ' open' : ''}><summary>${esc(c)}<span>${cs.length === all.length ? all.length : cs.length + ' of ' + all.length} ${all.length === 1 ? 'story' : 'stories'}, ${posted} shared</span></summary>
      ${cs.map(s => `<button type="button" class="sv-row" data-sva="open" data-v="${esc(s.id)}"><b>${esc(s.title)}</b>${s.sub ? `<small class="muted">${esc(s.sub)}</small>` : ''}<span class="sv-pills">${pills(s)}</span></button>`).join('')}</details>`;
  }).join('');
  return html || '<div class="card"><p class="muted">Every story is in another filter. Try All, or a different word.</p></div>';
}
function keepGroups(){ UI.groups = Array.from(document.querySelectorAll('.sv-g[open]')).map(x => x.getAttribute('data-svg')); }

// ---------- views ----------
function view(){
  if (!isFounder()) return '';
  const V = SV();
  if (!V) return `<div class="card" id="sv-top" style="border-left:4px solid var(--gold)"><h3>The Story Vault</h3><p class="muted">The Story Vault opens here once the BLD 784 Founder library update is sealed in Update a Library. It brings every story, the stories key, and Member Codes.</p></div>`;
  if (UI.adding) return addView();
  if (UI.open){ const s = V.stories.find(x => x.id === UI.open); if (s) return storyView(V, s); UI.open = null; }
  const n = counts(V), lock = waits() ? ' disabled' : '';
  const fb = ([k, t]) => `<button type="button" class="btn btn-sm ${UI.f === k ? 'btn-gold' : 'btn-line'}" data-sva="f" data-v="${k}" aria-pressed="${UI.f === k}">${t}</button>`;
  return `<div id="sv-top"><div class="page-head"><div class="eyebrow">Founder &middot; Chris and Kayti only</div><h1>The Story Vault</h1>
    <p>Every story you have written, in one quiet place. Mark each one Vault, Early Preview, or Posted, tend its words, and seal Grounded Stories for the site.</p></div>
  ${waits() ? '<p class="tipbox" style="border-left:3px solid var(--gold)">An update for the Founder library is waiting in Update a Library. Seal it or cancel it there, and the Story Vault is ready for changes again.</p>' : ''}
  <div class="card"><p><b>${V.stories.length}</b> stories: ${n.posted} Posted, ${n.early} Early Preview, ${n.vault} in the Vault. ${n.open} open to everyone. ${n.voice ? n.voice + (n.voice === 1 ? ' needs' : ' need') + ' a voice.' : 'Every voiced story is recorded.'}</p>
   <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold btn-sm" data-sva="add"${lock}>Add a Story</button></div>
   <p class="muted" id="sv-saved" style="font-size:14px;margin-top:8px">${savedLine()}</p></div>
  ${sealCard(V, n)}
  ${codesCard(V)}
  <div class="card"><h3>Stories</h3><label class="f" for="sv-q">Search</label><input type="text" inputmode="search" id="sv-q" data-svf="q" value="${esc(UI.q)}" placeholder="A title, a name, a phrase" autocomplete="off">
   <div class="row" style="margin-top:12px">${FILTERS.map(fb).join('')}</div></div>
  <div id="sv-list">${listHTML()}</div></div>`;
}
function sealCard(V, n){
  const S = V.sealed, live = V.codes.filter(c => !c.cancelled).length;
  return `<div class="card" id="sv-seal" style="border-left:4px solid var(--gold)"><h3>Seal Grounded Stories</h3>
   <p class="muted">Seals every Posted and Early Preview story into one file for the site, data.js: previews for everyone, the whole story for members, and the whole story for everyone where Open to Everyone is on. Vault stories stay right here.</p>
   <p style="margin-top:8px">${n.posted} Posted and ${n.early} Early Preview stories, opened by ${live} member ${live === 1 ? 'code' : 'codes'}.${S && S.at ? ` Last sealed ${esc(nice(S.at))}.` : ''}</p>
   <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold" data-sva="seal"${UI.busy || waits() ? ' disabled' : ''}>${UI.busy ? 'Sealing...' : 'Seal Grounded Stories'}</button></div>
   ${UI.err ? `<p class="tipbox" style="border-left:3px solid var(--danger)">${esc(UI.err)}</p>` : ''}
   ${UI.out ? `<div class="tipbox" style="margin-top:12px"><b>data.js is ready.</b>
     <ol class="sv-steps"><li>Upload data.js into the stories folder on the site, replacing the one there.</li><li>Upload lib-founder.js from Ready to Upload (Founder tab), so the Founder library keeps these stories and codes.</li></ol>
     <p class="muted" style="font-size:14px">Visitors and members see the new stories once data.js is uploaded.</p>
     <div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-sva="dl">Download data.js Again</button></div></div>` : ''}</div>`;
}
function codesCard(V){
  const sealedSet = new Set(((V.sealed || {}).codes) || []);
  const list = V.codes.slice().sort((a, b) => (!!a.cancelled - !!b.cancelled) || String(b.made || '').localeCompare(String(a.made || '')));
  const sh = UI.shown;
  return `<div class="card" id="sv-codes"><h3>Member Codes</h3>
   <p class="muted">One code for each member, most often a paid subscriber on Substack. A member types the code once on Grounded Stories, and that device opens every Posted story in full, plus the Early Previews.</p>
   ${sh ? `<div class="tipbox" style="border-left:4px solid var(--gold)"><b>${esc(sh.label)}</b><p class="codeshow">${esc(sh.code)}</p>
     <p class="muted" style="font-size:14px">This is the one time the code shows, so copy it now and share it privately. It opens stories once you seal Grounded Stories and upload data.js.</p>
     <div class="row" style="margin-top:8px"><button type="button" class="btn btn-gold btn-sm" data-sva="copy">Copy Code</button><button type="button" class="btn btn-line btn-sm" data-sva="hide">Done</button></div></div>` : ''}
   <label class="f" for="sv-label">Who it is for</label><input type="text" id="sv-label" placeholder="The member's name" autocomplete="off"${waits() ? ' disabled' : ''}>
   <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold btn-sm" data-sva="mk"${waits() ? ' disabled' : ''}>Make a Member Code</button></div>
   <div style="margin-top:12px">${list.map(c => `<div class="list-row"><div class="lr-main"><b>${esc(c.label || 'Member')}</b> ${c.cancelled ? '<span class="pill">Cancelled</span>' : sealedSet.has(c.c) ? '<span class="pill sage">Active</span>' : '<span class="pill gold">Opens After the Next Seal</span>'}<br><small class="muted">Made ${esc(nice(c.made))}${c.cancelled ? ', cancelled ' + esc(nice(c.cancelled)) : ''}</small></div>${c.cancelled ? '' : `<button type="button" class="btn btn-line btn-sm" data-sva="cancel" data-v="${esc(c.c)}"${waits() ? ' disabled' : ''}>Cancel a Code</button>`}</div>`).join('')}</div>
   <p class="muted" style="font-size:14px;margin-top:10px">Cancelling a code takes effect once you seal Grounded Stories and upload data.js: from then on, the code opens no new devices. A device that already unlocked with it keeps its stories, so the member keeps what they already received.</p></div>`;
}
function storyView(V, s){
  const lock = waits() ? ' disabled' : '', cols = [...new Set(V.stories.map(x => x.col).filter(Boolean))];
  const sw = ST.map(([k, t]) => `<button type="button" class="btn btn-sm ${s.status === k ? 'btn-gold' : 'btn-line'}" data-sva="st" data-v="${k}" aria-pressed="${s.status === k}"${lock}>${t}</button>`).join('');
  const paras = (s.paras || []).map((p, i) => `<div class="sv-p"><label class="f" for="sv-p${i}">Paragraph ${i + 1}${i < s.preview ? ' <span class="pill">Preview</span>' : ''}</label>
     <textarea id="sv-p${i}" rows="${Math.min(12, Math.max(3, Math.ceil(p.length / 70)))}" data-svf="para" data-v="${i}"${lock}>${esc(p)}</textarea>
     <button type="button" class="linkbtn sv-small" data-sva="pdel" data-v="${i}"${lock}>Remove This Paragraph</button></div>`).join('');
  return `<div id="sv-top" class="sv-story"><button class="linkbtn" data-sva="back">&larr; Back to the Story Vault</button>
  <div class="page-head" style="margin-top:14px"><div class="eyebrow">${esc(s.col || 'Stories')}</div><h1>${esc(s.title)}</h1>${s.sub ? `<p>${esc(s.sub)}</p>` : ''}<p class="sv-pills">${pills(s)}</p></div>
  ${waits() ? '<p class="tipbox" style="border-left:3px solid var(--gold)">An update for the Founder library is waiting in Update a Library. Seal it or cancel it there, and this story is ready for changes again.</p>' : ''}
  <div class="card"><h3>Where It Stands</h3><div class="row" style="margin-top:8px">${sw}</div>
   <p class="muted" style="font-size:14px;margin-top:8px">${{vault: 'Vault: kept here while you tend it. Visitors and members see it once you mark it Early Preview or Posted and seal.', early: 'Early Preview: members see the whole story first, often before it goes on Substack.', posted: 'Posted: on Grounded Stories, with a preview for everyone and the whole story for members.'}[s.status] || ''}</p>
   <label class="sv-tick"><input type="checkbox" data-svf="open"${s.open ? ' checked' : ''}${lock}> <span><b>Open to Everyone</b><br><small class="muted">The whole story plays and reads for every visitor once it is Posted.</small></span></label>
   <p class="muted" id="sv-saved" style="font-size:14px;margin-top:10px">${savedLine()}</p></div>
  <div class="card"><h3>Details</h3>
   <label class="f" for="sv-title">Title</label><input type="text" id="sv-title" data-svf="title" value="${esc(s.title)}"${lock}>
   <label class="f" for="sv-sub">Subtitle</label><input type="text" id="sv-sub" data-svf="sub" value="${esc(s.sub || '')}"${lock}>
   <label class="f" for="sv-col">Collection</label><input type="text" id="sv-col" data-svf="col" value="${esc(s.col || '')}" list="sv-cols"${lock}><datalist id="sv-cols">${cols.map(c => `<option value="${esc(c)}">`).join('')}</datalist>
   <label class="f" for="sv-sx">Substack Link</label><input type="text" inputmode="url" id="sv-sx" data-svf="substack" value="${esc(s.substack || '')}" placeholder="https://..."${lock}>
   <p class="muted" style="font-size:14px;margin-top:4px">With a link, the story shows "Talk about this on Substack."</p>
   <label class="f" for="sv-cr">Credit Line</label><input type="text" id="sv-cr" data-svf="credit" value="${esc(s.credit || '')}"${lock}>
   ${s.note ? `<p class="muted" style="margin-top:10px"><b>Note:</b> ${esc(s.note)}</p>` : ''}</div>
  <div class="card"><h3>The Story</h3>
   <p id="sv-voice">${voiceLine(s)}</p>
   <p class="muted" style="font-size:14px;margin-top:6px">Each box is one paragraph. A blank line inside a box makes two paragraphs when you leave the box. Visitors see the paragraphs marked Preview; members see them all.</p>
   <div style="margin-top:8px">${paras}</div>
   <div class="row" style="margin-top:10px"><button type="button" class="btn btn-line btn-sm" data-sva="padd"${lock}>Add a Paragraph</button></div></div>
  ${extrasHTML(s)}
  <button class="linkbtn" data-sva="back">&larr; Back to the Story Vault</button></div>`;
}
// Vault only extras from the story files (kept here for Chris, never sealed into data.js): a second version (alt),
// a draft note, and references.
function extrasHTML(s){
  const alt = s.alt && Array.isArray(s.alt.paras) && s.alt.paras.length ? s.alt : null, refs = Array.isArray(s.refs) ? s.refs.filter(Boolean) : [];
  if (!alt && !s.draftNote && !refs.length) return '';
  return `<div class="card"><h3>Kept in the Vault</h3><p class="muted" style="font-size:14px">For you only. These stay in the Vault and stay out of Grounded Stories.</p>
   ${alt ? `<details class="sv-x"><summary><b>Other Version</b>${alt.label ? ` <small class="muted">${esc(alt.label)}</small>` : ''}</summary>${alt.paras.map(p => `<p>${esc(p)}</p>`).join('')}</details>` : ''}
   ${s.draftNote ? `<details class="sv-x"><summary><b>Draft Note</b></summary><p>${esc(s.draftNote)}</p></details>` : ''}
   ${refs.length ? `<details class="sv-x"><summary><b>References</b></summary>${refs.map(r => `<p>${esc(r)}</p>`).join('')}</details>` : ''}</div>`;
}
function voiceLine(s){
  if (s.voiced) return '<span class="pill sage">Recorded</span> The narrator\'s voice reads this story as written.';
  if (s.voice === false) return '<span class="pill">Text Only</span> This story reads as text.';
  return '<span class="pill gold">Needs a Voice</span> The next build records these words in the narrator\'s voice. Until then, the new sentences play in the device voice.';
}
function addView(){
  const V = SV(), cols = [...new Set(V.stories.map(x => x.col).filter(Boolean))];
  return `<div id="sv-top"><button class="linkbtn" data-sva="back">&larr; Back to the Story Vault</button>
  <div class="page-head" style="margin-top:14px"><div class="eyebrow">The Story Vault</div><h1>Add a Story</h1><p>Paste the story in your own words. A blank line starts each new paragraph. It joins the Vault, ready for you to tend and share when it is ready.</p></div>
  <div class="card"><label class="f" for="sv-nt">Title</label><input type="text" id="sv-nt" autocomplete="off">
   <label class="f" for="sv-ns">Subtitle</label><input type="text" id="sv-ns" autocomplete="off">
   <label class="f" for="sv-nc">Collection</label><input type="text" id="sv-nc" value="New Stories" list="sv-cols2"><datalist id="sv-cols2">${cols.map(c => `<option value="${esc(c)}">`).join('')}</datalist>
   <label class="f" for="sv-nx">The story</label><textarea id="sv-nx" rows="14" placeholder="Paste the story here."></textarea>
   <p class="muted" id="sv-nmsg" role="alert" style="margin-top:6px"></p>
   <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold" data-sva="addgo"${waits() ? ' disabled' : ''}>Add to the Vault</button><button type="button" class="btn btn-line" data-sva="back">Back</button></div></div></div>`;
}

// ---------- changes ----------
function cur(){ const V = SV(); return V && UI.open ? V.stories.find(x => x.id === UI.open) : null; }
function textChanged(s){
  s.chars = charsOf(s.paras); s.preview = previewOf(s.paras);
  if (s.voiced){ s.voiced = false; const el = document.getElementById('sv-voice'); if (el) el.innerHTML = voiceLine(s); }
}
function setField(s, k, val){
  if (k === 'title'){
    const t = val.trim(); if (!t) return;
    if (s.credit === pubCredit(s.title)) s.credit = pubCredit(t);
    s.title = t;
  } else if (k === 'substack'){
    const u = val.trim(); s.substack = u;
    if (u && (!s.credit || s.credit === NOTEBOOK)) s.credit = pubCredit(s.title);
    if (!u && s.credit === pubCredit(s.title)) s.credit = NOTEBOOK;
  } else if (k === 'sub' || k === 'credit' || k === 'col') s[k] = val.trim();
}
async function addStory(){
  const V = SV(); if (!V || waits()) return;
  const t = (document.getElementById('sv-nt') || {}).value || '', paras = splitParas((document.getElementById('sv-nx') || {}).value);
  const msg = document.getElementById('sv-nmsg');
  if (!t.trim()){ if (msg) msg.textContent = 'Give the story a title.'; return; }
  if (!paras.length){ if (msg) msg.textContent = 'Paste the story text.'; return; }
  const max = V.stories.reduce((m, s) => { const k = /^s(\d+)$/.exec(s.id || ''); return k ? Math.max(m, +k[1]) : m; }, 0);
  let id = 's' + String(max + 1).padStart(3, '0'); while (V.stories.some(s => s.id === id)) id += 'a';
  const s = {id, title: t.trim(), sub: ((document.getElementById('sv-ns') || {}).value || '').trim(), col: ((document.getElementById('sv-nc') || {}).value || '').trim() || 'New Stories',
    status: 'vault', open: false, substack: '', credit: NOTEBOOK, paras, preview: previewOf(paras), chars: charsOf(paras), voice: true, note: 'Added in the Story Vault ' + today() + '.', voiced: false};
  V.stories.push(s); UI.adding = false; UI.open = id;
  C.render && C.render(); window.scrollTo(0, 0);
  await keep(true); toast('Added to the Vault.');
}
async function makeCode(){
  const V = SV(); if (!V || waits() || UI.busy) return;
  const el = document.getElementById('sv-label'), label = ((el && el.value) || '').trim();
  if (!label){ if (el) el.focus(); toast('Add who the code is for.'); return; }
  if (!window.GGStories) return alert('The stories tools are still loading. Try again in a moment.');
  UI.busy = true;
  try {
    const code = GGStories.makeCode(), w = await GGStories.makeWrap(code, unb64(V.key.key));
    V.codes.push({c: w.c, label, made: today(), salt: w.salt, iv: w.iv, ct: w.ct});
    UI.shown = {code, label, c: w.c};
  } catch (e) { UI.busy = false; alert('That code needs another try. Tap Make a Member Code again.'); return; }
  UI.busy = false; rr(); await keep(true);
}
async function cancelCode(id){
  const V = SV(); if (!V || waits()) return; const c = V.codes.find(x => x.c === id); if (!c) return;
  if (!confirm('Cancel the code for ' + (c.label || 'this member') + '? Once you seal Grounded Stories and upload data.js, it opens no new devices. A device that already unlocked keeps its stories.')) return;
  c.cancelled = today(); if (UI.shown && UI.shown.c === id) UI.shown = null;
  rr(); await keep(true); toast('Cancelled. Seal Grounded Stories when you are ready.');
}
function download(text, name){ const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], {type: 'text/javascript'})); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }
async function sealStories(){
  const V = SV(); if (!V || UI.busy || waits()) return;
  if (!window.GGStories || typeof GGStories.seal !== 'function') return alert('The stories tools are still loading. Try again in a moment.');
  UI.busy = true; UI.err = ''; UI.out = null; rr();
  try {
    await keep(true);
    const list = V.stories.filter(s => s.status === 'posted' || s.status === 'early').map(s => { const o = JSON.parse(JSON.stringify(s)); delete o.alt; delete o.draftNote; delete o.refs; delete o.note; return o; });
    const live = V.codes.filter(c => !c.cancelled), wraps = live.map(c => ({c: c.c, salt: c.salt, iv: c.iv, ct: c.ct}));
    const js = await GGStories.seal(list, V.key, wraps);
    if (typeof js !== 'string' || !js) throw new Error('empty');
    V.sealed = {at: today(), posted: list.filter(s => s.status === 'posted').length, early: list.filter(s => s.status === 'early').length, codes: live.map(c => c.c)};
    UI.out = {js}; UI.busy = false;
    download(js, 'data.js'); rr(); await keep(true);
    toast('data.js downloaded. Upload it into the stories folder on the site.');
  } catch (e) { UI.busy = false; UI.err = 'Sealing needs another try on this device. Tap Seal Grounded Stories again.'; rr(); }
}
function copy(t){
  const done = () => toast('Copied.');
  if (navigator.clipboard) navigator.clipboard.writeText(t).then(done, () => prompt('Copy the code:', t)); else prompt('Copy the code:', t);
}

// ---------- events ----------
document.addEventListener('click', e => {
  const b = e.target.closest && e.target.closest('[data-sva]'); if (!b || !SV() || !isFounder()) return;
  const a = b.getAttribute('data-sva'), v = b.getAttribute('data-v'), s = cur();
  if (a === 'open'){ keepGroups(); UI.open = v; C.render && C.render(); window.scrollTo(0, 0); }
  else if (a === 'back'){ UI.open = null; UI.adding = false; C.render && C.render(); const t = document.getElementById('sv-list'); if (t) window.scrollTo(0, 0); }
  else if (a === 'f'){ UI.f = v; keepGroups(); rr(); }
  else if (a === 'add'){ UI.adding = true; C.render && C.render(); window.scrollTo(0, 0); }
  else if (a === 'addgo') addStory();
  else if (a === 'mk') makeCode();
  else if (a === 'copy' && UI.shown) copy(UI.shown.code);
  else if (a === 'hide'){ UI.shown = null; rr(); }
  else if (a === 'cancel') cancelCode(v);
  else if (a === 'seal') sealStories();
  else if (a === 'dl' && UI.out) download(UI.out.js, 'data.js');
  else if (waits()) return;
  else if (a === 'st' && s){ s.status = v; rr(); keep(); }
  else if (a === 'padd' && s){ s.paras.push(''); rr(); const t = document.getElementById('sv-p' + (s.paras.length - 1)); if (t) t.focus(); }
  else if (a === 'pdel' && s){
    const i = +v; if (!(i >= 0 && i < s.paras.length)) return;
    if (s.paras.length < 2) return toast('A story keeps at least one paragraph.');
    if (s.paras[i].trim() && !confirm('Remove paragraph ' + (i + 1) + '?')) return;
    s.paras.splice(i, 1); textChanged(s); rr(); keep();
  }
});
document.addEventListener('input', e => {
  const t = e.target, k = t && t.getAttribute && t.getAttribute('data-svf'); if (!k || !SV() || !isFounder()) return;
  if (k === 'q'){ UI.q = t.value; const L = document.getElementById('sv-list'); if (L){ keepGroups(); L.innerHTML = listHTML(); } return; }
  const s = cur(); if (!s || waits()) return;
  if (k === 'para'){ const i = +t.getAttribute('data-v'); if (s.paras[i] !== t.value){ s.paras[i] = t.value; textChanged(s); keep(); } return; }
  if (k === 'open') return;
  setField(s, k, t.value); keep();
});
document.addEventListener('change', e => {
  const t = e.target, k = t && t.getAttribute && t.getAttribute('data-svf'); if (!k || !SV() || !isFounder()) return;
  const s = cur(); if (!s || waits()) return;
  if (k === 'open'){ s.open = !!t.checked; rr(); keep(); return; }
  if (k === 'para'){
    // Leaving a box: a blank line inside makes two paragraphs, and an empty box goes away.
    const i = +t.getAttribute('data-v'), parts = splitParas(t.value);
    const was = JSON.stringify(s.paras);
    if (parts.length === 1) s.paras[i] = parts[0];
    else if (!parts.length && s.paras.length > 1) s.paras.splice(i, 1);
    else if (parts.length > 1) s.paras.splice(i, 1, ...parts);
    if (JSON.stringify(s.paras) !== was){ textChanged(s); rr(); keep(); }
    return;
  }
  if (k === 'title' || k === 'sub' || k === 'col' || k === 'substack'){ rr(); keep(); }
});

// The Vault's own look (kept small; everything else uses the Field Guide's cards, pills, and buttons).
const css = document.createElement('style');
css.textContent = '.sv-row{display:block;width:100%;text-align:left;background:none;border:0;border-top:1px solid var(--line);padding:12px 2px;color:inherit;font:inherit;cursor:pointer;}'
  + '.sv-row:hover,.sv-row:focus-visible{background:color-mix(in srgb,var(--gold) 7%,transparent);}'
  + '.sv-row b{display:block;font-weight:600;overflow-wrap:anywhere;}.sv-row small{display:block;margin-top:2px;overflow-wrap:anywhere;}'
  + '.sv-pills{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;}.sv-pills .pill{margin:0;}'
  + '.sv-story textarea,#sv-top input[type=text],#sv-top textarea{width:100%;max-width:100%;box-sizing:border-box;}'
  + '.sv-p{margin-top:10px;}.sv-p .pill{margin-left:6px;}.sv-small{font-size:calc(14px * var(--scale,1));margin-top:4px;}'
  + '.sv-tick{display:flex;gap:10px;align-items:flex-start;margin-top:14px;cursor:pointer;}.sv-tick input{margin-top:5px;width:20px;height:20px;flex:none;}'
  + '.sv-x{border-top:1px solid var(--line);padding:6px 0;}.sv-x summary{cursor:pointer;padding:8px 0;}.sv-x p{margin-top:8px;overflow-wrap:anywhere;}'
  + '.sv-steps{margin:8px 0 6px 20px;}.sv-steps li{margin-top:4px;}#sv-top .codeshow{overflow-wrap:anywhere;}';
document.head.appendChild(css);

window.GGVault = {
  init(ctx){ C = ctx || {}; },
  view,
  has: () => !!SV(),
  count: () => { const V = SV(); return V ? V.stories.length : 0; },
  // for tests
  _previewOf: previewOf, _splitParas: splitParas, _ui: UI
};
})();
