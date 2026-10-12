// =====================================================================
// GROUNDED FIELD GUIDE (TM): The Story Vault (GWG BLD 784).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// Founders only, in the Founder tab. Every story Chris has written lives here: Vault (kept here while he tends it),
// Early Preview (members see it first), or Posted (on Grounded Stories: a preview for everyone, the whole story for
// members, and the whole story for everyone when Open to Everyone is on).
//
// Where it lives: the Founder library, FDR.storyVault = {v: 1, key: {v: 1, round: 's1', folder: 't', key}, codes: []
// (BLD 784 Member Codes; BLD 785 moves them into the Access list, FDR.access, as Supporter codes), stories: [{id, title,
// sub, col, status, open, substack, credit, paras, preview, chars, voice, note, voiced, topics?, and Vault only alt?,
// draftNote?, refs?}], sealed?: {at, posted, early, codes}}. The BLD 784 Founder patch adds it.
// Topics (BLD 786): topics: ['dying', 'grief', 'faith', 'kids'] (any, or none), the four filters on Grounded Stories. Four
// switches on each story page set them; Seal Grounded Stories carries them into data.js. A story with no topics yet shows
// the page's own choice (GGStories.themesOf) until a switch is touched. The BLD 786 Founder patch seeds every story.
//
// How edits save (the Update a Library pattern): each change is made to FDR.storyVault on this device, then, a moment
// later, index.html's fdrKeep seals the whole Founder library with the Founder key into "Ready to Upload" (lib-founder.js),
// the same sealed draft Seal It makes (DATA.founder.draft.libs.founder). The draft rides inside this device's encrypted
// records (and the one backup file), so the Vault reopens with every change. Uploading lib-founder.js carries the
// changes to every Founder device. One revision step covers everything waiting to upload. While an update from a chat
// waits in Update a Library for the Founder library, the Vault waits too, so neither one undoes the other.
//
// Codes (BLD 785): every code lives in one place, the Access list in the Founder tab (index.html, FDR.access). Each one
// carries a wrap of the stories key; C.wraps() hands the wraps of every code in use, and C.wsalt() the shared wrap salt.
// Seal Grounded Stories: GGStories.seal(Posted and Early Preview stories, the key, those wraps, the salt) makes
// stories/data.js to upload. The Access list runs the same seal (GGVault.seal). Vault stories, names, levels, and
// organizations never go into data.js.
//
// Supporter perks (BLD 787), sealed under the stories key with the stories, so every code opens them:
// - The Story Behind the Story: stories[i].behind = [paragraphs] in Chris's own words (one box on each story page; a blank
//   line starts a new paragraph; Clear), behindVoiced once a build records it. Nothing is ever written here for him; the
//   filter Has a Note lists the stories that carry one.
// - The Monthly Letter: storyVault.letters = [{id: 'L2026-11', month: '2026-11', title, from: 'grounded' | 'chris', paras,
//   status: 'vault' | 'posted', approvedAt, postedAt, voiced, note}]. Add a Letter (title, month, From, paste). A letter drafted
//   by a build shows Drafted for You and I Approve This Letter; Posted waits for the approval. Watch This Letter plays it.
// - Reflection Cards: storyVault.cards = [{id: 'R2026-11', month, story, line, practice: {name, why, steps, src}, status,
//   approvedAt, postedAt}]. Make a Card: pick a Posted story, tap one sentence exactly as written (about 30 words at most),
//   pick a practice from the library (GGLibrary) or write Grounded's own steps, print a test card, I Approve This Card, Posted.
// Seal Grounded Stories passes {letters, cards} to GGStories.seal; only Posted ones reach data.js (titles for everyone,
// words for members). Story pictures: each story page shows stories/img/<id>.webp or .jpg when it is on the site.
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
const FILTERS = [['all', 'All'], ['posted', 'Posted'], ['early', 'Early Preview'], ['vault', 'Vault'], ['voice', 'Needs a Voice'], ['note', 'Has a Note']];
const hasNote = s => Array.isArray(s.behind) && s.behind.some(p => String(p).trim());
const NOTEBOOK = 'Story: Chris Joy, from my notebook. Names and details changed.';
const pubCredit = t => 'Story: Chris Joy, ' + t + ' · Read it on Grounded';
const TOPICS = [['dying', 'Dying and Saying Goodbye'], ['grief', 'Grief and After'], ['faith', 'Faith and Doubt'], ['kids', 'Kids and Families']];
// The topics a story shows under now: its own, or the page's fallback (GGStories.themesOf) for a story with none set yet.
const topicsNow = s => Array.isArray(s.topics) ? s.topics.slice() : (window.GGStories && GGStories.themesOf ? String(GGStories.themesOf({slug: GGStories.slug(s.title), title: s.title}) || '').split(' ').filter(Boolean) : []);
const needsVoice = s => !s.voiced && s.voice !== false;
const charsOf = paras => paras.join('\n\n').length;
// Visitors see a locked story's opening (BLD 788, GGStories.previewCut, the rule Seal Grounded Stories uses): at most about
// 1,500 characters and at most 40 percent of the story, whole paragraphs while they fit, else the first paragraph's opening
// sentences. previewOf gives the count of whole paragraphs (0 when the preview is the first paragraph's opening sentences).
const cutOf = paras => window.GGStories && GGStories.previewCut ? GGStories.previewCut(paras) : {paras: [], cut: false};
function previewOf(paras){ const c = cutOf(paras); return c.cut ? 0 : c.paras.length; }
const splitParas = t => String(t || '').replace(/\r\n?/g, '\n').split(/\n\s*\n/).map(p => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean);

const UI = {f: 'all', q: '', open: null, adding: false, out: null, busy: false, err: '', groups: null, saved: 0, letter: null, card: null, cq: '', lib: null};
// The wraps of every code in use, from the Access list (C.wraps), or the Story Vault's own BLD 784 codes when the
// page has no Access list.
const liveWraps = V => C.wraps ? C.wraps() : (V.codes || []).filter(c => !c.cancelled).map(c => ({c: c.c, salt: c.salt, iv: c.iv, ct: c.ct}));

// ---------- saving ----------
// keep(): C.keep() resolves false when saving waits (BLD 788: index.html's persist() reports it), and the line says so.
// While a save waits for its moment the line says Saving..., and flush() (on closing or switching away) runs it at once.
let saveT = null, chain = Promise.resolve(), waitGo = null, busyN = 0;
const savedShow = () => { const el = document.getElementById('sv-saved'); if (el) el.innerHTML = savedLine(); };
function keep(now){
  clearTimeout(saveT); waitGo = null;
  const go = () => { waitGo = null; busyN++; chain = chain.then(async () => {
    let ok = false; try { ok = await (C.keep ? C.keep() : false); } catch (e) { ok = false; }
    busyN--; UI.saved = ok ? Date.now() : -1; savedShow();
  }); return chain; };
  if (now){ const r = go(); savedShow(); return r; }
  waitGo = go; saveT = setTimeout(go, 700); savedShow(); return chain;
}
function flush(){ if (!waitGo) return false; clearTimeout(saveT); waitGo(); return true; }
function savedLine(){
  if (waitGo || busyN > 0) return 'Saving...';
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
  if (f === 'voice' ? !needsVoice(s) : f === 'note' ? !hasNote(s) : f !== 'all' && s.status !== f) return false;
  const q = UI.q.trim().toLowerCase(); if (!q) return true;
  return [s.title, s.sub, s.col, s.note].concat(s.paras || []).some(t => String(t || '').toLowerCase().includes(q));
}
// Ten stories have a second (or third) copy under Reflections (BLD 788). The main copy is the Posted or Early Preview one,
// else the first; every other copy shows Other Copy, and its page points to the main one, so a fix lands where it shows.
const slugOf = t => String(t || '').toLowerCase().replace(/[\u2018\u2019']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
function mainCopy(s){
  const V = SV(); if (!V) return null;
  const same = V.stories.filter(x => slugOf(x.title) === slugOf(s.title)); if (same.length < 2) return null;
  const m = same.find(x => x.status !== 'vault') || same[0];
  return m === s ? null : m;
}
function pills(s){
  const st = s.status === 'posted' ? 'sage' : s.status === 'early' ? 'gold' : '';
  return `<span class="pill ${st}">${esc(stName(s.status))}</span>${mainCopy(s) ? ' <span class="pill">Other Copy</span>' : ''}${s.open ? ' <span class="pill sage">Open to Everyone</span>' : ''}${needsVoice(s) ? ' <span class="pill gold">Needs a Voice</span>' : ''}`;
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
  if (UI.letter){ const l = UI.letter === 'new' ? null : (V.letters || []).find(x => x.id === UI.letter); if (UI.letter === 'new') return letterAddView(); if (l) return letterView(l); UI.letter = null; }
  if (UI.card){ const c = (V.cards || []).find(x => x.id === UI.card); if (c) return cardView(V, c); UI.card = null; }
  if (UI.open){ const s = V.stories.find(x => x.id === UI.open); if (s) return storyView(V, s); UI.open = null; }
  const n = counts(V), lock = waits() ? ' disabled' : '';
  const fb = ([k, t]) => `<button type="button" class="btn btn-sm ${UI.f === k ? 'btn-gold' : 'btn-line'}" data-sva="f" data-v="${k}" aria-pressed="${UI.f === k}">${t}</button>`;
  return `<div id="sv-top"><div class="page-head"><div class="eyebrow">Founder &middot; Chris and Kayti only</div><h1>The Story Vault</h1>
    <p>Every story you have written, in one quiet place. Mark each one Vault, Early Preview, or Posted, tend its words, and seal Grounded Stories for the site.</p></div>
  ${waits() ? '<p class="tipbox" style="border-left:3px solid var(--gold)">An update for the Founder library is waiting in Update a Library. Seal it or cancel it there, and the Story Vault is ready for changes again.</p>' : ''}
  <div class="card"><p><b>${V.stories.length}</b> stories: ${n.posted} Posted, ${n.early} Early Preview, ${n.vault} in the Vault. ${n.open} open to everyone. ${n.voice ? n.voice + (n.voice === 1 ? ' needs' : ' need') + ' a voice.' : 'Every voiced story is recorded.'}</p>
   <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold btn-sm" data-sva="add"${lock}>Add a Story</button><a class="btn btn-line btn-sm" href="../stories.html" target="_blank" rel="noopener" data-fgstories="1">Open Grounded Stories</a></div>
   <p class="muted" id="sv-saved" style="font-size:14px;margin-top:8px">${savedLine()}</p></div>
  ${sealCard(V, n)}
  ${codesCard()}
  ${perksCards(V)}
  <div class="card"><h3>Stories</h3><label class="f" for="sv-q">Search</label><input type="text" inputmode="search" id="sv-q" data-svf="q" value="${esc(UI.q)}" placeholder="A title, a name, a phrase" autocomplete="off">
   <div class="row" style="margin-top:12px">${FILTERS.map(fb).join('')}</div></div>
  <div id="sv-list">${listHTML()}</div></div>`;
}
function sealCard(V, n){
  const S = V.sealed, live = liveWraps(V).length;
  return `<div class="card" id="sv-seal" style="border-left:4px solid var(--gold)"><h3>Seal Grounded Stories</h3>
   <p class="muted">Seals every Posted and Early Preview story, with its Story Behind the Story, and every Posted letter and Reflection Card into one file for the site, data.js: previews for everyone, the whole story for members, and the whole story for everyone where Open to Everyone is on. Vault stories stay right here.</p>
   <p style="margin-top:8px">${n.posted} Posted and ${n.early} Early Preview stories, ${(V.letters || []).filter(l => l.status === 'posted').length} Posted letters, and ${(V.cards || []).filter(c => c.status === 'posted').length} Posted Reflection Cards, opened by ${live} ${live === 1 ? 'code' : 'codes'} from the Access list.${S && S.at ? ` Last sealed ${esc(nice(S.at))}.` : ''}</p>
   <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold" data-sva="seal"${UI.busy || waits() ? ' disabled' : ''}>${UI.busy ? 'Sealing...' : 'Seal Grounded Stories'}</button></div>
   ${UI.err ? `<p class="tipbox" style="border-left:3px solid var(--danger)">${esc(UI.err)}</p>` : ''}
   ${UI.out ? `<div class="tipbox" style="margin-top:12px"><b>data.js is ready.</b>
     <ol class="sv-steps"><li>Upload data.js into the stories folder on the site, replacing the one there.</li><li>Upload lib-founder.js from Ready to Upload (Founder tab), so the Founder library keeps these stories and codes.</li></ol>
     <p class="muted" style="font-size:14px">Visitors and members see the new stories once data.js is uploaded.</p>
     <div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-sva="dl">Download data.js Again</button></div></div>` : ''}</div>`;
}
function codesCard(){
  return `<div class="card" id="sv-codes"><h3>Codes</h3>
   <p class="muted">Every code lives in the Access list now: Founder, Staff, Guide, and Supporter, plus codes for an organization. Each one opens Grounded Stories. Make, find, and cancel them there.</p>
   <div class="row" style="margin-top:10px"><button type="button" class="btn btn-line btn-sm" data-act="sec-open" data-v="founder|codes">Open the Access List</button></div></div>`;
}
function storyView(V, s){
  const lock = waits() ? ' disabled' : '', cols = [...new Set(V.stories.map(x => x.col).filter(Boolean))];
  const sw = ST.map(([k, t]) => `<button type="button" class="btn btn-sm ${s.status === k ? 'btn-gold' : 'btn-line'}" data-sva="st" data-v="${k}" aria-pressed="${s.status === k}"${lock}>${t}</button>`).join('');
  const pv = cutOf(s.paras || []), pvN = pv.cut ? 0 : pv.paras.length, pvTag = i => s.open ? '' : i < pvN ? ' <span class="pill">Preview</span>' : pv.cut && i === 0 ? ' <span class="pill">Opening Sentences Preview</span>' : '';
  const paras = (s.paras || []).map((p, i) => `<div class="sv-p"><label class="f" for="sv-p${i}">Paragraph ${i + 1}${pvTag(i)}</label>
     <textarea id="sv-p${i}" rows="${Math.min(12, Math.max(3, Math.ceil(p.length / 70)))}" data-svf="para" data-v="${i}"${lock}>${esc(p)}</textarea>
     <button type="button" class="linkbtn sv-small" data-sva="pdel" data-v="${i}"${lock}>Remove This Paragraph</button></div>`).join('');
  return `<div id="sv-top" class="sv-story"><button class="linkbtn" data-sva="back">&larr; Back to the Story Vault</button>
  <div class="page-head" style="margin-top:14px"><div class="eyebrow">${esc(s.col || 'Stories')}</div><h1>${esc(s.title)}</h1>${s.sub ? `<p>${esc(s.sub)}</p>` : ''}<p class="sv-pills">${pills(s)}</p>
   <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold" data-sva="watch">Watch This Story</button></div>
   ${needsVoice(s) ? '<p class="muted" style="font-size:14px;margin-top:6px">Sentences you changed play in the device voice until the next build records them.</p>' : ''}</div>
  ${waits() ? '<p class="tipbox" style="border-left:3px solid var(--gold)">An update for the Founder library is waiting in Update a Library. Seal it or cancel it there, and this story is ready for changes again.</p>' : ''}
  ${(() => { const m = mainCopy(s); return m ? `<div class="tipbox" style="border-left:3px solid var(--gold)"><p>This is another copy of <b>${esc(m.title)}</b>. The main copy is in ${esc(m.col || 'Stories')} (${esc(stName(m.status))}), and it is the one Grounded Stories uses. Make changes there.</p><div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-sva="open" data-v="${esc(m.id)}">Open the Main Copy</button></div></div>` : ''; })()}
  <div class="card"><h3>Where It Stands</h3><div class="row" style="margin-top:8px">${sw}</div>
   <p class="muted" style="font-size:14px;margin-top:8px">${{vault: 'Vault: kept here while you tend it. Visitors and members see it once you mark it Early Preview or Posted and seal.', early: 'Early Preview: members see the whole story first, often before it goes on Substack.', posted: 'Posted: on Grounded Stories, with a preview for everyone and the whole story for members.'}[s.status] || ''}</p>
   <label class="sv-tick"><input type="checkbox" data-svf="open"${s.open ? ' checked' : ''}${lock}> <span><b>Open to Everyone</b><br><small class="muted">The whole story plays and reads for every visitor once it is Posted.</small></span></label>
   <p class="muted" id="sv-saved" style="font-size:14px;margin-top:10px">${savedLine()}</p></div>
  <div class="card" id="sv-topics"><h3>Topics</h3><p class="muted" style="font-size:14px;margin-top:4px">Grounded Stories shows this story under each topic you choose, and always under All Stories.</p>
   ${(() => { const on = topicsNow(s); return TOPICS.map(([k, t]) => `<label class="sv-tick"><input type="checkbox" data-svf="topic" data-v="${k}"${on.includes(k) ? ' checked' : ''}${lock}> <span><b>${esc(t)}</b></span></label>`).join(''); })()}</div>
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
   <p class="muted" style="font-size:14px;margin-top:6px">Each box is one paragraph. A blank line inside a box makes two paragraphs when you leave the box. Visitors see the part marked Preview (at most about 1,500 characters, and 40 percent of the story); members see it all.</p>
   <div style="margin-top:8px">${paras}</div>
   <div class="row" style="margin-top:10px"><button type="button" class="btn btn-line btn-sm" data-sva="padd"${lock}>Add a Paragraph</button></div></div>
  ${behindHTML(s, lock)}
  ${picHTML(s)}
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
// The Story Behind the Story (BLD 787): Chris's own note, one box.
function behindHTML(s, lock){
  const has = hasNote(s);
  return `<div class="card" id="sv-behind"><h3>The Story Behind the Story</h3><p class="muted" style="font-size:14px;margin-top:4px">In your own words. Members see it and hear it read after the story.</p>
   <p id="sv-bvoice" style="margin-top:8px">${behindVoice(s)}</p>
   <label class="f" for="sv-bt">Your note</label><textarea id="sv-bt" rows="${has ? Math.min(14, Math.max(5, Math.ceil(s.behind.join('  ').length / 70))) : 5}" data-svf="behind"${lock}>${esc(has ? s.behind.join('\n\n') : '')}</textarea>
   <p class="muted" style="font-size:14px;margin-top:4px">A blank line starts a new paragraph.</p>
   <div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-sva="bclear"${has ? '' : ' disabled'}${lock}>Clear</button></div></div>`;
}
function behindVoice(s){
  if (!hasNote(s)) return '<span class="pill">No Note Yet</span> Add one whenever a story has more to tell.';
  if (s.behindVoiced) return '<span class="pill sage">Recorded</span> The narrator reads your note as written.';
  return '<span class="pill gold">Needs a Voice</span> The next build records your note. Until then, it plays in the device voice.';
}
// Story pictures (BLD 787): public files in the stories folder. PICS lists the stories that have one on the site (the 20
// shipped in BLD 787), so the Vault asks the site only for those (BLD 788); any other story shows Look for a Picture,
// for a picture uploaded since.
const PICS = new Set(['s002', 's003', 's004', 's005', 's006', 's007', 's008', 's009', 's010', 's011', 's012', 's013', 's014', 's015', 's016', 's017', 's019', 's020', 's021', 's022']);
const picImg = s => `<div class="sv-pic"><img src="../stories/img/${esc(s.id)}.webp" alt="${esc(s.title)}" onerror="GGVault._picErr(this)" onload="this.parentNode.classList.add('sv-in')"></div>`;
function picHTML(s){
  const id = esc(s.id), has = PICS.has(s.id) || UI.pic === s.id;
  return `<div class="card" id="sv-pic"><h3>Picture</h3>${has ? picImg(s) : ''}
   <p class="muted" style="font-size:14px;margin-top:8px">Picture: upload ${id}.jpg or ${id}.webp into the stories/img folder.</p>
   ${has ? '' : `<div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-sva="piclook">Look for a Picture</button></div>`}</div>`;
}
function picErr(el){ const src = el.getAttribute('src') || ''; if (/\.webp$/.test(src)) el.setAttribute('src', src.replace(/\.webp$/, '.jpg')); else if (el.parentNode){ el.parentNode.hidden = true; if (UI.pic && el.closest('#sv-pic')){ const n = el.closest('#sv-pic').querySelector('.sv-pic + p'); if (n) n.textContent = 'The picture shows here once ' + UI.pic + '.jpg or ' + UI.pic + '.webp is in the stories/img folder on the site.'; } } }

// ---------- the Monthly Letter and Reflection Cards (BLD 787) ----------
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthName = m => { const x = /^(\d{4})-(\d\d)/.exec(m || ''); return x ? MONTHS[+x[2] - 1] + ' ' + x[1] : ''; };
const nextMonth = () => { const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() + 1); return d.getFullYear() + '-' + pad(d.getMonth() + 1); };
const fromName = f => f === 'chris' ? 'Chris Joy' : 'Grow With Grounded';
// A card Chris makes himself (Make a Card, own: 1) is his own: no approval step; it counts as approved once it has a line
// and a practice (BLD 788), the way a letter he adds is approved at once.
const ownApprove = c => { if (c && c.own){ const ok = !!(c.line && (c.practice || {}).name); if (ok && !c.approvedAt) c.approvedAt = today(); else if (!ok && c.approvedAt) c.approvedAt = ''; } };
const perkPills = x => `${x.status === 'posted' ? '<span class="pill sage">Posted</span>' : '<span class="pill">Vault</span>'}${x.own ? ' <span class="pill sage">Your Card</span>' : x.approvedAt ? ' <span class="pill sage">Approved</span>' : ' <span class="pill gold">Drafted for You</span>'}${x.voiced === false && x.paras ? ' <span class="pill gold">Needs a Voice</span>' : ''}`;
function perksCards(V){
  const L = (V.letters || []).slice().sort((a, b) => (b.month || '').localeCompare(a.month || '')), Cd = (V.cards || []).slice().sort((a, b) => (b.month || '').localeCompare(a.month || ''));
  const lock = waits() ? ' disabled' : '';
  const st = id => { const s = V.stories.find(x => x.id === id); return s ? s.title : 'a story'; };
  return `<div class="card" id="sv-letters"><h3>The Monthly Letter</h3><p class="muted">A letter each month from Grow With Grounded, read aloud for members. Approve a drafted letter, mark it Posted, then seal.</p>
    ${L.map(l => `<button type="button" class="sv-row" data-sva="lopen" data-v="${esc(l.id)}"><b>${esc(l.title || 'A New Letter')}</b><small class="muted">${esc(monthName(l.month))}. From ${esc(fromName(l.from))}.</small><span class="sv-pills">${perkPills(l)}</span></button>`).join('') || '<p class="muted" style="margin-top:8px">Your letters gather here.</p>'}
    <div class="row" style="margin-top:10px"><button type="button" class="btn btn-line btn-sm" data-sva="ladd"${lock}>Add a Letter</button></div></div>
   <div class="card" id="sv-cards"><h3>Reflection Cards</h3><p class="muted">A printable card each month: a line from a Posted story and a practice to carry it into the week. Approve a card, mark it Posted, then seal.</p>
    ${Cd.map(c => `<button type="button" class="sv-row" data-sva="copen" data-v="${esc(c.id)}"><b>${esc(monthName(c.month))}: ${esc((c.practice || {}).name || 'A practice to choose')}</b><small class="muted">From the story ${esc(st(c.story))}.</small><span class="sv-pills">${perkPills(c)}</span></button>`).join('') || '<p class="muted" style="margin-top:8px">Your cards gather here.</p>'}
    <div class="row" style="margin-top:10px"><button type="button" class="btn btn-line btn-sm" data-sva="cadd"${lock}>Make a Card</button></div></div>`;
}
function letterVoice(l){
  if (l.voiced) return '<span class="pill sage">Recorded</span> The narrator reads this letter as written.';
  return '<span class="pill gold">Needs a Voice</span> The next build records these words. Until then, the new sentences play in the device voice.';
}
function letterView(l){
  const lock = waits() ? ' disabled' : '', ok = !!l.approvedAt;
  return `<div id="sv-top" class="sv-story"><button class="linkbtn" data-sva="back">&larr; Back to the Story Vault</button>
  <div class="page-head" style="margin-top:14px"><div class="eyebrow">The Monthly Letter &middot; ${esc(monthName(l.month))}</div><h1>${esc(l.title || 'A New Letter')}</h1><p class="sv-pills">${perkPills(l)}</p>
   <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold" data-sva="lwatch">Watch This Letter</button></div></div>
  ${ok ? '' : `<div class="card" id="sv-lapprove" style="border-left:4px solid var(--gold)"><p><span class="pill gold">Drafted for You</span></p><p style="margin-top:8px">${l.from === 'chris' ? 'This letter was drafted for you to read.' : 'Grow With Grounded drafted this letter for you.'} Read it, change anything you like, then approve it. It can be Posted once you approve it.</p>
   <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold" data-sva="lapprove"${lock}>I Approve This Letter</button></div></div>`}
  <div class="card"><h3>Where It Stands</h3><div class="row" style="margin-top:8px">
   <button type="button" class="btn btn-sm ${l.status !== 'posted' ? 'btn-gold' : 'btn-line'}" data-sva="lst" data-v="vault" aria-pressed="${l.status !== 'posted'}"${lock}>Vault</button>
   <button type="button" class="btn btn-sm ${l.status === 'posted' ? 'btn-gold' : 'btn-line'}" data-sva="lst" data-v="posted" aria-pressed="${l.status === 'posted'}"${ok ? lock : ' disabled'}>Posted</button></div>
   <p class="muted" style="font-size:14px;margin-top:8px">${l.status === 'posted' ? 'Posted: members watch and read it on Grounded Stories once you seal and upload data.js. Visitors see its month and title.' : ok ? 'Approved. Mark it Posted when it is ready for members.' : 'Approve it first, then mark it Posted.'}</p>
   <p class="muted" id="sv-saved" style="font-size:14px;margin-top:10px">${savedLine()}</p></div>
  <div class="card"><h3>Details</h3>
   <label class="f" for="sv-lt">Title</label><input type="text" id="sv-lt" data-svl="title" value="${esc(l.title || '')}"${lock}>
   <label class="f" for="sv-lm">Month</label><input type="month" id="sv-lm" data-svl="month" value="${esc(l.month || '')}"${lock}>
   <label class="f" for="sv-lf">From</label><select id="sv-lf" data-svl="from"${lock}><option value="grounded"${l.from !== 'chris' ? ' selected' : ''}>Grow With Grounded</option><option value="chris"${l.from === 'chris' ? ' selected' : ''}>Chris Joy</option></select>
   <p class="muted" style="font-size:14px;margin-top:4px">A letter from Grow With Grounded speaks as we and signs "With gratitude, Grow With Grounded". A letter from Chris Joy is in your own words.</p>
   ${l.note ? `<p class="muted" style="margin-top:10px"><b>Note:</b> ${esc(l.note)}</p>` : ''}</div>
  <div class="card"><h3>The Letter</h3><p id="sv-lvoice">${letterVoice(l)}</p>
   <label class="f" for="sv-lx">The letter</label><textarea id="sv-lx" rows="16" data-svl="text"${lock}>${esc((l.paras || []).join('\n\n'))}</textarea>
   <p class="muted" style="font-size:14px;margin-top:4px">A blank line starts a new paragraph.</p></div>
  ${l.status !== 'posted' ? `<button class="linkbtn" data-sva="ldel"${lock}>Remove This Letter</button><br>` : ''}
  <button class="linkbtn" data-sva="back">&larr; Back to the Story Vault</button></div>`;
}
function letterAddView(){
  return `<div id="sv-top"><button class="linkbtn" data-sva="back">&larr; Back to the Story Vault</button>
  <div class="page-head" style="margin-top:14px"><div class="eyebrow">The Monthly Letter</div><h1>Add a Letter</h1><p>Paste the letter. A blank line starts each new paragraph. It joins the Vault, ready to mark Posted when it is ready.</p></div>
  <div class="card"><label class="f" for="sv-alt">Title</label><input type="text" id="sv-alt" autocomplete="off">
   <label class="f" for="sv-alm">Month</label><input type="month" id="sv-alm" value="${nextMonth()}">
   <label class="f" for="sv-alf">From</label><select id="sv-alf"><option value="grounded">Grow With Grounded</option><option value="chris">Chris Joy</option></select>
   <label class="f" for="sv-alx">The letter</label><textarea id="sv-alx" rows="14" placeholder="Paste the letter here."></textarea>
   <p class="muted" id="sv-almsg" role="alert" style="margin-top:6px"></p>
   <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold" data-sva="laddgo"${waits() ? ' disabled' : ''}>Add the Letter</button><button type="button" class="btn btn-line" data-sva="back">Back</button></div></div></div>`;
}
// A card's sentences: the player's own rule (GGStories.sentences), exactly as written, about 30 words at most.
function cardLines(s){ if (!s || !window.GGStories) return []; const out = []; (s.paras || []).forEach(p => GGStories.sentences(p).forEach(x => { if (x.split(/\s+/).length <= 32) out.push(x); })); return out; }
function cardModel(V, c, test){ const s = V.stories.find(x => x.id === c.story) || {}; return {month: c.month, line: c.line, story: {title: s.title || '', slug: window.GGStories ? GGStories.slug(s.title || '') : '', credit: s.credit || ''}, practice: c.practice || {}, test: !!test}; }
function cardView(V, c){
  ownApprove(c);
  const lock = waits() ? ' disabled' : '', ok = !!c.approvedAt, posted = V.stories.filter(s => s.status === 'posted'), s = V.stories.find(x => x.id === c.story);
  const lines = cardLines(s), P = c.practice || {};
  const res = UI.lib && UI.cq.trim() ? UI.lib.slice(0, 8) : [];
  const storyOk = !!(s && s.status === 'posted'), ready = ok && storyOk && c.line && P.name;
  return `<div id="sv-top" class="sv-story"><button class="linkbtn" data-sva="back">&larr; Back to the Story Vault</button>
  <div class="page-head" style="margin-top:14px"><div class="eyebrow">Reflection Cards</div><h1>Reflection Card, ${esc(monthName(c.month))}</h1><p class="sv-pills">${perkPills(c)}</p></div>
  ${ok ? '' : c.own ? `<div class="card" id="sv-capprove" style="border-left:4px solid var(--sage)"><p><span class="pill sage">Your Card</span></p><p style="margin-top:8px">Choose a line from a Posted story and a practice below, and your card is ready to mark Posted.</p></div>` : `<div class="card" id="sv-capprove" style="border-left:4px solid var(--gold)"><p><span class="pill gold">Drafted for You</span></p><p style="margin-top:8px">Check the line, the story, and the practice, print a test card, then approve it. It can be Posted once you approve it.</p>
   <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold" data-sva="capprove"${c.line && P.name ? lock : ' disabled'}>I Approve This Card</button></div></div>`}
  <div class="card"><h3>Where It Stands</h3><div class="row" style="margin-top:8px">
   <button type="button" class="btn btn-sm ${c.status !== 'posted' ? 'btn-gold' : 'btn-line'}" data-sva="cst" data-v="vault" aria-pressed="${c.status !== 'posted'}"${lock}>Vault</button>
   <button type="button" class="btn btn-sm ${c.status === 'posted' ? 'btn-gold' : 'btn-line'}" data-sva="cst" data-v="posted" aria-pressed="${c.status === 'posted'}"${ready ? lock : ' disabled'}>Posted</button></div>
   <p class="muted" style="font-size:14px;margin-top:8px">${c.status === 'posted' ? 'Posted: members print it on Grounded Stories once you seal and upload data.js. Visitors see its month and practice name.' : !storyOk ? 'Cards use Posted stories. Choose a Posted story below.' : ok ? (c.own ? 'Ready. Mark it Posted when it is ready for members.' : 'Approved. Mark it Posted when it is ready for members.') : c.own ? 'Choose a line and a practice, then mark it Posted.' : 'Approve it first, then mark it Posted.'}</p>
   <p class="muted" id="sv-saved" style="font-size:14px;margin-top:10px">${savedLine()}</p></div>
  <div class="card"><h3>1. The Month</h3><label class="f" for="sv-cm">Month</label><input type="month" id="sv-cm" data-svc="month" value="${esc(c.month || '')}"${lock}></div>
  <div class="card"><h3>2. The Story</h3><label class="f" for="sv-cs">A Posted story</label><select id="sv-cs" data-svc="story"${lock}><option value="">Choose a story</option>${posted.map(x => `<option value="${esc(x.id)}"${x.id === c.story ? ' selected' : ''}>${esc(x.title)}</option>`).join('')}</select></div>
  <div class="card"><h3>3. The Line</h3><p class="muted" style="font-size:14px">Tap one sentence, exactly as written.</p>
   ${c.line ? `<p class="sv-line">&ldquo;${esc(c.line)}&rdquo;</p>` : ''}
   <div class="sv-lines">${s ? lines.map((x, i) => `<button type="button" class="sv-row${x === c.line ? ' sv-on' : ''}" data-sva="cline" data-v="${i}" aria-pressed="${x === c.line}"${lock}>${esc(x)}</button>`).join('') : '<p class="muted">Choose a story first.</p>'}</div></div>
  <div class="card"><h3>4. The Practice</h3>
   ${P.name ? `<p><b>${esc(P.name)}</b></p>${P.why ? `<p class="muted">${esc(P.why)}</p>` : ''}<ol class="sv-steps">${(P.steps || []).map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : '<p class="muted">Choose a practice from the library, or write Grounded\'s own.</p>'}
   <label class="f" for="sv-cq">Find a practice in the library</label><input type="text" inputmode="search" id="sv-cq" data-svc="q" value="${esc(UI.cq)}" placeholder="Gratitude, a walk, breath" autocomplete="off"${lock}>
   <div id="sv-cres">${res.map(it => `<button type="button" class="sv-row" data-sva="cpick" data-v="${esc(it.name)}"${lock}><b>${esc(it.name)}</b>${it.text ? `<small class="muted">${esc(it.text)}</small>` : ''}</button>`).join('')}</div>
   <details class="sv-x" style="margin-top:12px"><summary><b>Or write Grounded's own</b></summary>
    <label class="f" for="sv-cpn">Practice name</label><input type="text" id="sv-cpn" data-svc="pname" value="${esc(P.name || '')}"${lock}>
    <label class="f" for="sv-cpw">Why it helps</label><input type="text" id="sv-cpw" data-svc="pwhy" value="${esc(P.why || '')}"${lock}>
    <label class="f" for="sv-cpx">Steps, one on each line (three to five)</label><textarea id="sv-cpx" rows="5" data-svc="psteps"${lock}>${esc((P.steps || []).join('\n'))}</textarea></details></div>
  <div class="card"><h3>5. Preview</h3>${c.line && P.name ? `<div class="sv-cardpv"><p class="sv-line">&ldquo;${esc(c.line)}&rdquo;</p><p class="muted">From the story ${esc((s || {}).title || '')}, by Chris Joy. ${esc(monthName(c.month))}.</p><p style="margin-top:8px"><b>This week's practice:</b> ${esc(P.name)}</p></div>` : '<p class="muted">The preview shows once a line and a practice are chosen.</p>'}
   <div class="row" style="margin-top:10px"><button type="button" class="btn btn-line btn-sm" data-sva="ctest"${c.line && P.name ? '' : ' disabled'}>Print a Test Card</button></div></div>
  ${c.status !== 'posted' ? `<button class="linkbtn" data-sva="cdel"${lock}>Remove This Card</button><br>` : ''}
  <button class="linkbtn" data-sva="back">&larr; Back to the Story Vault</button></div>`;
}
function needLib(){ return new Promise(ok => { if (window.GGLibrary) return ok(); const sc = document.createElement('script'); sc.src = '../shared/gg-library.js?v=b791'; sc.onload = sc.onerror = () => ok(); document.head.appendChild(sc); }).then(() => window.GGLibrary ? GGLibrary.ready() : false); }
function libSearch(){ const q = UI.cq.trim(); if (!q){ UI.lib = null; return Promise.resolve(); } return needLib().then(okl => { UI.lib = okl ? GGLibrary.search(q, 'oak') : []; }); }
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
function download(text, name){ const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], {type: 'text/javascript'})); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }
async function sealStories(){
  const V = SV(); if (!V || UI.busy || waits()) return;
  if (!window.GGStories || typeof GGStories.seal !== 'function') return alert('The stories tools are still loading. Try again in a moment.');
  // BLD 788: members open locked stories with a code, so ask before sealing a data.js that no code opens yet.
  if (!liveWraps(V).length && !confirm('Members open these stories with a code from the Access list, and none is in use yet. Seal now anyway? Visitors would see the previews and the stories Open to Everyone. To make a code first, tap Cancel and open the Access list.')) return false;
  UI.busy = true; UI.err = ''; UI.out = null; rr();
  try {
    await keep(true);
    const list = V.stories.filter(s => s.status === 'posted' || s.status === 'early').map(s => { const o = JSON.parse(JSON.stringify(s)); delete o.alt; delete o.draftNote; delete o.refs; delete o.note; return o; });
    const wraps = liveWraps(V);
    // BLD 787: Posted letters and Reflection Cards ride along (a Grounded draft only once approved).
    const letters = (V.letters || []).filter(l => l.status === 'posted' && l.approvedAt), cards = (V.cards || []).filter(c => c.status === 'posted' && c.approvedAt);
    const js = await GGStories.seal(list, V.key, wraps, C.wsalt ? C.wsalt() : '', {letters, cards});
    if (typeof js !== 'string' || !js) throw new Error('empty');
    V.sealed = {at: today(), posted: list.filter(s => s.status === 'posted').length, early: list.filter(s => s.status === 'early').length, codes: wraps.map(c => c.c), letters: letters.length, cards: cards.length};
    UI.out = {js}; UI.busy = false;
    download(js, 'data.js'); if (C.sealed) C.sealed(); rr(); await keep(true);
    toast('data.js downloaded. Upload it into the stories folder on the site.');
    return true;
  } catch (e) { UI.busy = false; UI.err = 'Sealing needs another try on this device. Tap Seal Grounded Stories again.'; rr(); if (C.toast) toast(UI.err); return false; }
}

// ---------- events ----------
document.addEventListener('click', e => {
  const b = e.target.closest && e.target.closest('[data-sva]'); if (!b || !SV() || !isFounder()) return;
  const a = b.getAttribute('data-sva'), v = b.getAttribute('data-v'), s = cur();
  if (perkClick(a, v)) return;
  if (a === 'open'){ keepGroups(); UI.open = v; C.render && C.render(); window.scrollTo(0, 0); }
  else if (a === 'back'){ UI.open = null; UI.adding = false; UI.letter = null; UI.card = null; UI.cq = ''; UI.lib = null; C.render && C.render(); const t = document.getElementById('sv-list'); if (t) window.scrollTo(0, 0); }
  else if (a === 'f'){ UI.f = v; keepGroups(); rr(); }
  else if (a === 'add'){ UI.adding = true; C.render && C.render(); window.scrollTo(0, 0); }
  else if (a === 'addgo') addStory();
  else if (a === 'watch' && s){ if (window.GGStories && GGStories.listen) GGStories.listen(s, SV().key); }
  else if (a === 'seal') sealStories();
  else if (a === 'dl' && UI.out) download(UI.out.js, 'data.js');
  else if (a === 'piclook' && s){ UI.pic = s.id; rr(); }
  else if (waits()) return;
  else if (a === 'st' && s){ if (s.status !== v){ if (v === 'vault') delete s.postedAt; else if (s.status === 'vault' || !s.postedAt) s.postedAt = new Date().toISOString(); } s.status = v; rr(); keep(); }
  else if (a === 'padd' && s){ s.paras.push(''); rr(); const t = document.getElementById('sv-p' + (s.paras.length - 1)); if (t) t.focus(); }
  else if (a === 'bclear' && s){ if (!hasNote(s) || !confirm('Clear the Story Behind the Story for this story?')) return; delete s.behind; delete s.behindVoiced; rr(); keep(); }
  else if (a === 'pdel' && s){
    const i = +v; if (!(i >= 0 && i < s.paras.length)) return;
    if (s.paras.length < 2) return toast('A story keeps at least one paragraph.');
    if (s.paras[i].trim() && !confirm('Remove paragraph ' + (i + 1) + '?')) return;
    s.paras.splice(i, 1); textChanged(s); rr(); keep();
  }
});
// The Monthly Letter and Reflection Cards: clicks. Returns true when it handled one.
const curL = () => { const V = SV(); return V && UI.letter && UI.letter !== 'new' ? (V.letters || []).find(x => x.id === UI.letter) : null; };
const curC = () => { const V = SV(); return V && UI.card ? (V.cards || []).find(x => x.id === UI.card) : null; };
function uniqueId(list, base){ let id = base, n = 1; while (list.some(x => x.id === id)) id = base + String.fromCharCode(97 + n++); return id; }
function perkClick(a, v){
  const V = SV(), l = curL(), c = curC(), top = () => { C.render && C.render(); window.scrollTo(0, 0); };
  switch (a){
    case 'lopen': UI.letter = v; top(); return true;
    case 'copen': UI.card = v; UI.cq = ''; UI.lib = null; top(); return true;
    case 'lwatch': if (l && window.GGStories && GGStories.listenLetter) GGStories.listenLetter(l, V.key); return true;
    case 'ctest': if (c && window.GGPrint && GGPrint.reflectionCard) GGPrint.reflectionCard(cardModel(V, c, true)); return true;
  }
  if (waits()) return ['ladd', 'laddgo', 'lapprove', 'lst', 'ldel', 'cadd', 'capprove', 'cst', 'cline', 'cpick', 'cdel'].includes(a);
  switch (a){
    case 'ladd': UI.letter = 'new'; top(); return true;
    case 'laddgo': {
      const t = ((document.getElementById('sv-alt') || {}).value || '').trim(), m = (document.getElementById('sv-alm') || {}).value || '', P = splitParas((document.getElementById('sv-alx') || {}).value);
      const msg = document.getElementById('sv-almsg');
      if (!t){ if (msg) msg.textContent = 'Give the letter a title.'; return true; }
      if (!/^\d{4}-\d\d$/.test(m)){ if (msg) msg.textContent = 'Choose the month.'; return true; }
      if (!P.length){ if (msg) msg.textContent = 'Paste the letter.'; return true; }
      V.letters = V.letters || [];
      const L = {id: uniqueId(V.letters, 'L' + m), month: m, title: t, from: (document.getElementById('sv-alf') || {}).value === 'chris' ? 'chris' : 'grounded', paras: P, status: 'vault', approvedAt: today(), postedAt: '', voiced: false, note: 'Added in the Story Vault ' + today() + '.'};
      V.letters.push(L); UI.letter = L.id; top(); keep(true).then(() => toast('Added to the Vault.')); return true;
    }
    case 'lapprove': if (l){ l.approvedAt = today(); rr(); keep(); toast('Approved. Mark it Posted when it is ready.'); } return true;
    case 'lst': if (l){ if (v === 'posted' && !l.approvedAt) return true; if (l.status !== v){ l.status = v; l.postedAt = v === 'posted' ? new Date().toISOString() : ''; } rr(); keep(); } return true;
    case 'ldel': if (l && l.status !== 'posted' && confirm('Remove this letter from the Vault?')){ V.letters = V.letters.filter(x => x !== l); UI.letter = null; top(); keep(); } return true;
    case 'cadd': {
      V.cards = V.cards || []; const m = nextMonth();
      const cd = {id: uniqueId(V.cards, 'R' + m), month: m, story: '', line: '', practice: {name: '', why: '', steps: [], src: []}, status: 'vault', approvedAt: '', postedAt: '', own: 1};
      V.cards.push(cd); UI.card = cd.id; UI.cq = ''; UI.lib = null; top(); keep(); return true;
    }
    case 'capprove': if (c && c.line && (c.practice || {}).name){ c.approvedAt = today(); rr(); keep(); toast('Approved. Mark it Posted when it is ready.'); } return true;
    case 'cst': if (c){ const st = V.stories.find(x => x.id === c.story); if (v === 'posted' && !(c.approvedAt && st && st.status === 'posted')) return true; if (c.status !== v){ c.status = v; c.postedAt = v === 'posted' ? new Date().toISOString() : ''; } rr(); keep(); } return true;
    case 'cline': if (c){ const x = cardLines(V.stories.find(y => y.id === c.story))[+v]; if (x){ c.line = x; rr(); keep(); } } return true;
    case 'cpick': if (c && window.GGLibrary){ const it = (UI.lib || []).find(x => x.name === v) || GGLibrary.get(v); if (it){ const w = GGLibrary.view(it, 'oak');
      c.practice = {name: w.name, why: w.why, steps: w.steps.slice(0, 5), src: window.GGSources && GGSources.practiceList ? GGSources.practiceList(w.key || w.name) : []}; UI.cq = ''; UI.lib = null; rr(); keep(); } } return true;
    case 'cdel': if (c && c.status !== 'posted' && confirm('Remove this card from the Vault?')){ V.cards = V.cards.filter(x => x !== c); UI.card = null; top(); keep(); } return true;
  }
  return false;
}
// The Monthly Letter and Reflection Cards: typing.
let cqT = null;
document.addEventListener('input', e => {
  const t = e.target; if (!t || !t.getAttribute || !SV() || !isFounder()) return;
  const kl = t.getAttribute('data-svl'), kc = t.getAttribute('data-svc');
  if (kl && !waits()){ const l = curL(); if (!l) return;
    if (kl === 'title'){ l.title = t.value.trim(); keep(); }
    else if (kl === 'text'){ const P = splitParas(t.value); if (JSON.stringify(P) !== JSON.stringify(l.paras)){ l.paras = P; if (l.voiced){ l.voiced = false; const el = document.getElementById('sv-lvoice'); if (el) el.innerHTML = letterVoice(l); } keep(); } }
    return; }
  if (kc && !waits()){ const c = curC(); if (!c) return;
    if (kc === 'q'){ UI.cq = t.value; clearTimeout(cqT); cqT = setTimeout(() => libSearch().then(() => { const r = document.getElementById('sv-cres'); if (r) r.innerHTML = (UI.lib || []).slice(0, 8).map(it => `<button type="button" class="sv-row" data-sva="cpick" data-v="${esc(it.name)}"><b>${esc(it.name)}</b>${it.text ? `<small class="muted">${esc(it.text)}</small>` : ''}</button>`).join('') || (UI.cq.trim() ? '<p class="muted">Try another word.</p>' : ''); }), 250); return; }
    c.practice = c.practice || {name: '', why: '', steps: [], src: []};
    if (kc === 'pname'){ c.practice.name = t.value.trim(); c.practice.src = []; ownApprove(c); keep(); }
    else if (kc === 'pwhy'){ c.practice.why = t.value.trim(); keep(); }
    else if (kc === 'psteps'){ c.practice.steps = t.value.split('\n').map(x => x.trim()).filter(Boolean).slice(0, 5); keep(); }
    return; }
});
document.addEventListener('change', e => {
  const t = e.target; if (!t || !t.getAttribute || !SV() || !isFounder() || waits()) return;
  const kl = t.getAttribute('data-svl'), kc = t.getAttribute('data-svc');
  if (kl){ const l = curL(); if (!l) return;
    if (kl === 'month' && /^\d{4}-\d\d$/.test(t.value)){ l.month = t.value; rr(); keep(); }
    else if (kl === 'from'){ l.from = t.value === 'chris' ? 'chris' : 'grounded'; rr(); keep(); }
    else if (kl === 'title' || kl === 'text') rr();
    return; }
  if (kc){ const c = curC(); if (!c) return;
    if (kc === 'month' && /^\d{4}-\d\d$/.test(t.value)){ c.month = t.value; const V = SV(); if (c.status !== 'posted'){ const id = uniqueId(V.cards.filter(x => x !== c), 'R' + t.value); c.id = id; UI.card = id; } rr(); keep(); }
    else if (kc === 'story'){ if (c.story !== t.value){ c.story = t.value; c.line = ''; } rr(); keep(); }
    else if (kc === 'pname' || kc === 'pwhy' || kc === 'psteps') rr();
  }
});
document.addEventListener('input', e => {
  const t = e.target, k = t && t.getAttribute && t.getAttribute('data-svf'); if (!k || !SV() || !isFounder()) return;
  if (k === 'q'){ UI.q = t.value; const L = document.getElementById('sv-list'); if (L){ keepGroups(); L.innerHTML = listHTML(); } return; }
  const s = cur(); if (!s || waits()) return;
  if (k === 'para'){ const i = +t.getAttribute('data-v'); if (s.paras[i] !== t.value){ s.paras[i] = t.value; textChanged(s); keep(); } return; }
  if (k === 'behind'){ const P = splitParas(t.value), had = hasNote(s);
    if (P.length) s.behind = P; else delete s.behind; s.behindVoiced = false; if (!P.length) delete s.behindVoiced;
    const el = document.getElementById('sv-bvoice'); if (el) el.innerHTML = behindVoice(s);
    const cb = document.querySelector('[data-sva="bclear"]'); if (cb && had !== !!P.length) cb.disabled = !P.length;
    keep(); return; }
  if (k === 'open' || k === 'topic') return;
  setField(s, k, t.value); keep();
});
document.addEventListener('change', e => {
  const t = e.target, k = t && t.getAttribute && t.getAttribute('data-svf'); if (!k || !SV() || !isFounder()) return;
  const s = cur(); if (!s || waits()) return;
  if (k === 'open'){ s.open = !!t.checked; rr(); keep(); return; }
  if (k === 'topic'){ const v = t.getAttribute('data-v'), on = new Set(topicsNow(s)); if (t.checked) on.add(v); else on.delete(v); s.topics = TOPICS.map(x => x[0]).filter(x => on.has(x)); keep(); return; }
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
  + '.sv-steps{margin:8px 0 6px 20px;}.sv-steps li{margin-top:4px;}#sv-top .codeshow{overflow-wrap:anywhere;}'
  + '.sv-pic{aspect-ratio:3/2;max-width:480px;border-radius:12px;overflow:hidden;margin-top:8px;background:color-mix(in srgb,var(--gold) 10%,transparent);}.sv-pic img{display:block;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .3s;}.sv-pic.sv-in img{opacity:1;}'
  + '.sv-lines{max-height:380px;overflow:auto;margin-top:8px;border-bottom:1px solid var(--line);}.sv-row.sv-on{background:color-mix(in srgb,var(--gold) 16%,transparent);font-weight:600;}'
  + '.sv-line{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:calc(22px * var(--scale,1));line-height:1.35;margin:8px 0;overflow-wrap:anywhere;}'
  + '.sv-cardpv{border:1px solid var(--line);border-left:4px solid var(--gold);border-radius:12px;padding:12px 16px;margin-top:8px;}#sv-top select,#sv-top input[type=month]{max-width:100%;}';
document.head.appendChild(css);

window.GGVault = {
  init(ctx){ C = ctx || {}; },
  view,
  has: () => !!SV(),
  count: () => { const V = SV(); return V ? V.stories.length : 0; },
  // Seal Grounded Stories from anywhere (the Access list and Ready to Upload): downloads data.js. Resolves true when done.
  seal: () => sealStories(),
  // Run a Story Vault save that is waiting, now (BLD 788: index.html calls it when the page closes). True when one ran.
  flush: () => flush(),
  busy: () => UI.busy,
  // for tests
  _previewOf: previewOf, _splitParas: splitParas, _ui: UI, _picErr: picErr, _cardLines: cardLines
};
})();
