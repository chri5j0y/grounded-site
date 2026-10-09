// =====================================================================
// GROUNDED FIELD GUIDE (TM): Books (GWG BLD 770).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// A Founders tab for the business books of Grow With Grounded LLC, a two-member LLC that files as a
// partnership (Form 1065, with a Schedule K-1 for each member):
//   Overview: this month and this year at a glance, and the monthly Set Aside for Taxes reminder.
//   Income: client payments flow in by themselves from Client Files (clients.js), plus income entered here.
//   Expenses: date, payee, amount, a category in plain words matching the partnership return, paid by the
//     business account or personally (to be paid back), a receipt note, and an optional receipt photo kept small.
//   Mileage Log: date, from, to, purpose, miles, the client, and who drove, at the IRS standard mileage rate
//     (one Founder setting, shared with travel in Clients).
//   Reports: profit and loss by month or year, totals by category, mileage, what is owed back to each member,
//     and each member's share.
//   Year-End: a summary for TurboTax Business, CSV files (income, expenses, mileage, totals by category), and a
//     checklist of what TurboTax Business asks for a two-member LLC partnership.
//   Settings: members and shares, the set-aside percent, where trips start, the mileage rate, your own categories.
// Categories and where they go on the return are a starting point: confirm them with your tax preparer.
// Privacy: everything lives in DATA.books, encrypted with the rest of this device's records and carried in the
// locked backup (merged by GGBooks.merge; deletions recorded in DATA.deleted.books). Bank account numbers, card
// numbers, and Social Security numbers are never asked for or kept. CSV files and printouts are made only when a
// Founder asks, and they say plainly that they are not encrypted.
// =====================================================================
(function(){
'use strict';

let C = {}; // GGBooks.init: data(), lib(), tier(), save(), render(), go(), toast(), sheet(), ph(), pf()
const S = {sec: 'overview', form: null, edit: null, per: 'month', ym: '', yr: '', fy: '', fcat: '', photo: null, yeYr: '', set: null};
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const arr = x => Array.isArray(x) ? x : [];
const toast = m => C.toast ? C.toast(m) : null;
const D = () => (C.data && C.data()) || null;
const isFounder = () => (C.tier && C.tier()) === 'founder';
const fk = k => ` data-fk="${esc(k)}"`;

// ---------- dates and money ----------
const pad = n => String(n).padStart(2, '0');
const isoOf = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const today = () => isoOf(new Date());
const dOf = s => { const m = /^(\d{4})-(\d\d)-(\d\d)/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const nice = s => { const d = dOf(s); return d ? MON[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() : (s || ''); };
const short = s => { const d = dOf(s); return d ? MON[d.getMonth()].slice(0, 3) + ' ' + d.getDate() : (s || ''); };
const ymOf = s => String(s || '').slice(0, 7);
const ymNice = ym => { const m = /^(\d{4})-(\d\d)$/.exec(ym || ''); return m ? MON[+m[2] - 1] + ' ' + m[1] : ym; };
const thisYm = () => today().slice(0, 7);
const prevYm = ym => { const m = /^(\d{4})-(\d\d)$/.exec(ym); const d = new Date(+m[1], +m[2] - 2, 1); return d.getFullYear() + '-' + pad(d.getMonth() + 1); };
const r2 = n => Math.round((+n || 0) * 100) / 100;
const money = n => { n = r2(n); return (n < 0 ? '-$' : '$') + Math.abs(n).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}); };
const perMile = n => '$' + (Math.round(n * 1000) % 10 ? (+n).toFixed(3) : (+n).toFixed(2));
const miles = n => (Math.round((+n || 0) * 10) / 10).toLocaleString('en-US') + ((Math.round((+n || 0) * 10) / 10) === 1 ? ' mile' : ' miles');

// ---------- categories (plain words for the partnership return; confirm with your tax preparer) ----------
// where: the place on Form 1065 in plain words. tt: the wording TurboTax Business uses, as closely as we know it.
const CATS = [
  {id: 'adv', t: 'Advertising', where: 'Other Deductions', tt: 'Advertising', ex: 'Flyers, ads, printing for promotion, website ads'},
  {id: 'park', t: 'Car and Truck: Parking and Tolls', where: 'Other Deductions (car and truck)', tt: 'Car and truck expenses: parking and tolls', ex: 'Parking and tolls on business trips. Miles go in the Mileage Log.'},
  {id: 'labor', t: 'Contract Labor', where: 'Other Deductions', tt: 'Contract labor', ex: 'People paid for work who are not employees. A Form 1099-NEC may be due; ask your tax preparer.'},
  {id: 'ins', t: 'Insurance', where: 'Other Deductions', tt: 'Insurance (other than health)', ex: 'Liability or professional insurance for the business'},
  {id: 'legal', t: 'Legal and Professional Fees', where: 'Other Deductions', tt: 'Legal and professional services', ex: 'Attorney, accountant, tax preparer'},
  {id: 'office', t: 'Office Expense', where: 'Other Deductions', tt: 'Office expenses', ex: 'Paper, ink, postage, small office items'},
  {id: 'supplies', t: 'Supplies', where: 'Other Deductions', tt: 'Supplies', ex: 'Ceremony supplies, candles, sand, cords, printed programs'},
  {id: 'travel', t: 'Travel', where: 'Other Deductions', tt: 'Travel', ex: 'Lodging and fares for overnight business trips'},
  {id: 'meals', t: 'Meals (50%)', where: 'Other Deductions (half of the cost)', tt: 'Meals (50% deductible)', ex: 'Business meals. Half of the cost counts.', pct: 0.5},
  {id: 'util', t: 'Utilities and Phone', where: 'Other Deductions', tt: 'Utilities (phone and internet)', ex: 'The business share of phone and internet'},
  {id: 'soft', t: 'Software and Subscriptions', where: 'Other Deductions', tt: 'Software and subscriptions', ex: 'Website hosting, domain, apps, Substack'},
  {id: 'lic', t: 'Licenses and Fees', where: 'Taxes and Licenses', tt: 'Taxes and licenses', ex: 'State filing fees, licenses, the officiant filing'},
  {id: 'edu', t: 'Education', where: 'Other Deductions', tt: 'Education and training', ex: 'Courses, conferences, books for the work'},
  {id: 'bank', t: 'Bank and Payment Fees', where: 'Other Deductions', tt: 'Bank and merchant fees', ex: 'Card processing and Venmo business fees'},
  {id: 'rent', t: 'Rent', where: 'Rent', tt: 'Rent or lease', ex: 'Rented space for sessions or events'},
  {id: 'equip', t: 'Equipment', where: 'Depreciation, or an expense: ask your tax preparer', tt: 'Assets (equipment)', ex: 'Larger items that last, like a tablet or sound bowls'},
  {id: 'other', t: 'Other', where: 'Other Deductions', tt: 'Other expenses', ex: 'Anything else for the business'}
];
const CAR = {id: 'car', t: 'Car and Truck (From the Mileage Log)', where: 'Other Deductions (car and truck)', tt: 'Car and truck expenses (standard mileage rate)'};
const INCK = [['ceremony', 'Ceremonies'], ['session', 'Sessions'], ['package', 'Packages'], ['speaking', 'Speaking and Training'], ['product', 'Products'], ['other', 'Other Income']];
const METHODS = ['Check', 'Card', 'Venmo', 'Cash', 'Bank Transfer'];
const DEF_RATE = 0.76;

// ---------- the store ----------
function store(){
  const d = D(); if (!d) return null;
  const b = d.books = d.books || {};
  b.inc = arr(b.inc); b.exp = arr(b.exp); b.mi = arr(b.mi); b.cats = arr(b.cats);
  b.aside = b.aside && typeof b.aside === 'object' ? b.aside : {}; b.ye = b.ye && typeof b.ye === 'object' ? b.ye : {};
  if (!b.set || typeof b.set !== 'object') b.set = {};
  const s = b.set;
  if (!Array.isArray(s.members) || !s.members.length) s.members = [{id: 'm1', name: 'Chris Joy', share: 50}, {id: 'm2', name: 'Kayti Joy', share: 50}];
  if (!(+s.pct >= 0 && +s.pct <= 100) || s.pct === '' || s.pct == null) s.pct = 25;
  if (typeof s.home !== 'string') s.home = 'St. Cloud';
  return b;
}
const B = () => store() || {inc: [], exp: [], mi: [], cats: [], aside: {}, ye: {}, set: {members: [], pct: 25, home: 'St. Cloud'}};
function save(){ C.save && C.save(); }
const cats = () => CATS.concat(arr(B().cats).map(c => ({id: c.id, t: c.t, where: 'Other Deductions', tt: 'Other expenses', ex: 'Your own category', own: true})));
const catOf = id => id === 'car' ? CAR : (cats().find(c => c.id === id) || {id, t: 'Other', where: 'Other Deductions', tt: 'Other expenses'});
const members = () => arr(B().set.members);
const memName = id => id === 'biz' ? 'Business Account' : id === 'bizcar' ? 'Business Vehicle' : ((members().find(m => m.id === id) || {}).name || 'A Member');
const firstName = id => memName(id).split(/\s+/)[0];

// The IRS standard mileage rate: one Founder setting, shared with travel in Clients (DATA.cli.irs).
function rate(){
  if (window.GGCli && GGCli.irs){ const r = +GGCli.irs(); if (r > 0) return r; }
  const d = D(), r = d && d.cli && d.cli.irs; return r && +r.rate > 0 ? +r.rate : DEF_RATE;
}
function setRate(r){ const d = D(); if (!d) return; const c = d.cli = d.cli || {}; c.irs = {rate: r, u: Date.now()}; save(); }

// Client payments, read live from Client Files, so a payment edited or removed there follows here.
function cliName(f){ const c = (f && f.c) || {}; const a = [c.first, c.last].filter(Boolean).join(' ').trim(), p = (c.partner || '').trim(); return (a && p ? a + ' and ' + p : a || p) || 'A Client'; }
function cliFiles(){ try { return window.GGCli && GGCli.files ? arr(GGCli.files()) : arr(((D() || {}).cli || {}).files); } catch (e){ return []; } }
function cliPays(){
  if (window.GGCli && GGCli.payments){ try { return arr(GGCli.payments()).map(p => Object.assign({src: 'cli', amt: +p.amt || 0}, p)); } catch (e){} }
  const out = []; cliFiles().forEach(f => arr(f.pays).forEach(p => out.push({src: 'cli', id: p.id, date: p.date, amt: +p.amt || 0, what: p.what || '', method: p.method || '', ref: p.ref || '', file: f.id, name: cliName(f)})));
  return out;
}

// ---------- the numbers ----------
const inPer = (date, per) => per.length === 4 ? String(date || '').slice(0, 4) === per : ymOf(date) === per;
const deduct = e => r2((+e.amt || 0) * (catOf(e.cat).pct || 1));
const tripAmt = t => r2((+t.miles || 0) * (+t.rate || rate()));
function incomeRows(per){
  const cp = cliPays().filter(p => inPer(p.date, per)).map(p => ({src: 'cli', id: p.id, date: p.date, from: p.name, amt: p.amt, kind: 'Client Payment', what: p.what, method: p.method, note: p.ref, file: p.file}));
  const mine = B().inc.filter(x => inPer(x.date, per)).map(x => ({src: 'own', id: x.id, date: x.date, from: x.from, amt: +x.amt || 0, kind: (INCK.find(k => k[0] === x.kind) || ['', 'Other Income'])[1], what: '', method: x.method || '', note: x.note || ''}));
  return cp.concat(mine).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}
function sums(per){
  const inc = incomeRows(per), exp = B().exp.filter(e => inPer(e.date, per)), mi = B().mi.filter(t => inPer(t.date, per));
  const income = r2(inc.reduce((a, x) => a + x.amt, 0)), cliIn = r2(inc.filter(x => x.src === 'cli').reduce((a, x) => a + x.amt, 0));
  const byCat = {};
  exp.forEach(e => { const k = e.cat || 'other'; const o = byCat[k] = byCat[k] || {spent: 0, ded: 0, n: 0}; o.spent = r2(o.spent + (+e.amt || 0)); o.ded = r2(o.ded + deduct(e)); o.n++; });
  const miles_ = Math.round(mi.reduce((a, t) => a + (+t.miles || 0), 0) * 10) / 10, carAmt = r2(mi.reduce((a, t) => a + tripAmt(t), 0));
  if (mi.length) byCat.car = {spent: carAmt, ded: carAmt, n: mi.length};
  const spent = r2(Object.values(byCat).reduce((a, o) => a + o.spent, 0)), ded = r2(Object.values(byCat).reduce((a, o) => a + o.ded, 0));
  const profit = r2(income - ded), pct = +B().set.pct || 0, aside = r2(Math.max(0, profit) * pct / 100);
  const shares = members().map(m => ({m, share: +m.share || 0, amt: r2(profit * (+m.share || 0) / 100), aside: r2(aside * (+m.share || 0) / 100)}));
  return {inc, exp, mi, income, cliIn, ownIn: r2(income - cliIn), byCat, spent, ded, profit, miles: miles_, carAmt, pct, aside, shares};
}
// What the business owes back to each member: personal purchases and miles driven in a personal car, not yet paid back.
function owed(){
  const out = {}; members().forEach(m => { out[m.id] = {m, exp: [], mi: [], amt: 0}; });
  B().exp.forEach(e => { if (e.paid && e.paid !== 'biz' && !e.reimb && out[e.paid]){ out[e.paid].exp.push(e); out[e.paid].amt = r2(out[e.paid].amt + (+e.amt || 0)); } });
  B().mi.forEach(t => { if (t.driver && t.driver !== 'bizcar' && !t.reimb && out[t.driver]){ out[t.driver].mi.push(t); out[t.driver].amt = r2(out[t.driver].amt + tripAmt(t)); } });
  return Object.values(out);
}
const years = () => { const s = new Set([today().slice(0, 4)]); B().inc.concat(B().exp, B().mi, cliPays()).forEach(x => { const y = String(x.date || '').slice(0, 4); if (/^\d{4}$/.test(y)) s.add(y); }); return [...s].sort().reverse(); };

// ---------- small builders ----------
const lockNote = t => `<div class="bk-lock" role="note"><span aria-hidden="true">&#128274;</span><span>${esc(t)}</span></div>`;
const blk = (title, inner, sub, id) => `<section class="bk-blk"${id ? ` id="${id}"` : ''}>${title ? `<h3>${esc(title)}</h3>` : ''}${sub ? `<p class="bk-sub">${esc(sub)}</p>` : ''}${inner}</section>`;
function fld(key, lab, val, type, ph, extra){
  const id = 'bk-f-' + key;
  return `<div class="bk-fld"><label class="f" for="${id}">${esc(lab)}</label><input id="${id}" type="${type || 'text'}" data-bkf="${esc(key)}" value="${esc(val == null ? '' : val)}"${ph ? ` placeholder="${esc(ph)}"` : ''}${type === 'number' ? ' min="0" step="0.01" inputmode="decimal"' : ''} autocomplete="off"${extra || ''}></div>`;
}
const chip = (act, v, label, on, extra) => `<button type="button" class="chip" data-bka="${act}" data-bkv="${esc(v)}" aria-pressed="${!!on}"${fk(act + '|' + v)}${extra || ''}>${esc(label)}</button>`;
const sumBox = rows => `<div class="bk-sums">${rows.map(r => `<div${r[2] ? ` class="${r[2]}"` : ''}><span>${esc(r[0])}</span><b>${esc(r[1])}</b></div>`).join('')}</div>`;
const yearSel = (key, val) => `<select data-bksel="${key}" aria-label="Year">${years().map(y => `<option value="${y}"${y === val ? ' selected' : ''}>${y}</option>`).join('')}</select>`;
function monthSel(val){
  const ys = years(), opts = [];
  ys.forEach(y => { for (let m = 12; m >= 1; m--){ const ym = y + '-' + pad(m); if (ym <= thisYm() || B().inc.concat(B().exp, B().mi).some(x => ymOf(x.date) === ym)) opts.push(ym); } });
  return `<select data-bksel="ym" aria-label="Month">${opts.map(o => `<option value="${o}"${o === val ? ' selected' : ''}>${esc(ymNice(o))}</option>`).join('')}</select>`;
}

// ---------- Overview ----------
function asideCard(ym, compact){
  const s = sums(ym), a = B().aside[ym], done = a && a.done;
  const tail = done ? `<p class="bk-ok" role="status">Set aside ${esc(money(a.amt))} on ${esc(nice(a.date))}.</p><button type="button" class="linkbtn" data-bka="aside-undo" data-bkv="${ym}">Undo</button>`
    : s.aside > 0 ? `<div class="row" style="margin-top:8px"><button type="button" class="btn btn-gold btn-sm" data-bka="aside" data-bkv="${ym}"${fk('aside|' + ym)}>I Set It Aside</button></div>` : '';
  return `<div class="bk-aside${done ? ' done' : ''}"><div style="min-width:0;flex:1 1 260px"><h3>Set Aside for Taxes: ${esc(ymNice(ym))}</h3>
    <p style="margin:4px 0 0">${s.profit > 0 ? `About <b>${esc(money(s.aside))}</b>, ${esc(String(s.pct))}% of ${esc(money(s.profit))} profit${ym === thisYm() ? ' so far' : ''}${s.shares.length ? ': ' + s.shares.map(x => esc(firstName(x.m.id)) + ' ' + esc(money(x.aside))).join(', ') : ''}.` : 'No profit to set aside yet this month.'}</p>
    ${compact ? '' : '<p class="bk-sub" style="margin:4px 0 0">Move it to a savings account for the quarterly estimated taxes each member pays. Confirm the percent with your tax preparer.</p>'}${tail}</div></div>`;
}
function vOverview(){
  const ym = thisYm(), y = ym.slice(0, 4), m = sums(ym), yr = sums(y), last = prevYm(ym), ow = owed().filter(o => o.amt > 0);
  const lastS = sums(last), lastDue = lastS.aside > 0 && !(B().aside[last] && B().aside[last].done);
  return `<div class="bk-kick">Founders Only</div><h2 style="margin:2px 0 10px">Overview</h2>
  ${lockNote('Books is encrypted on this device and in your locked backup. Only your passcode opens it. Bank and card numbers are never kept here.')}
  ${lastDue ? asideCard(last) : ''}${asideCard(ym, lastDue)}
  ${blk(ymNice(ym), sumBox([['Income', money(m.income)], ['Expenses', money(m.ded)], ['Profit', money(m.profit), m.profit < 0 ? 'neg' : '']]))}
  ${blk('This Year, ' + y, sumBox([['Income', money(yr.income)], ['Expenses', money(yr.ded)], ['Profit', money(yr.profit), yr.profit < 0 ? 'neg' : '']]) + `<p class="bk-sub" style="margin:0">${esc(miles(yr.miles))} logged, ${esc(money(yr.carAmt))} at the mileage rate. Client payments: ${esc(money(yr.cliIn))}.</p>`)}
  <div class="row" style="margin:0 0 14px"><button type="button" class="btn btn-gold" data-bka="new" data-bkv="inc">Add Income</button><button type="button" class="btn btn-gold" data-bka="new" data-bkv="exp">Add an Expense</button><button type="button" class="btn btn-gold" data-bka="new" data-bkv="mi">Add a Trip</button></div>
  ${ow.length ? blk('Owed Back to Members', `<ul class="bk-ul">${ow.map(o => `<li><b>${esc(o.m.name)}</b>: ${esc(money(o.amt))} <span class="muted">(${o.exp.length} purchase${o.exp.length === 1 ? '' : 's'}, ${o.mi.length} trip${o.mi.length === 1 ? '' : 's'})</span></li>`).join('')}</ul><button type="button" class="linkbtn" data-bka="sec" data-bkv="reports">See it in Reports</button>`) : ''}`;
}

// ---------- Income ----------
function incForm(){
  const F = S.form, ed = S.edit;
  return blk(ed ? 'Edit Income' : 'Add Income', `<div class="bk-g2">${fld('date', 'Date', F.date, 'date')}${fld('amt', 'Amount', F.amt, 'number', '0.00')}</div>
    ${fld('from', 'From', F.from, 'text', 'Who paid, or what it was for')}
    <label class="f">Kind</label><div class="bk-chips">${INCK.map(k => chip('fset', 'kind|' + k[0], k[1], F.kind === k[0])).join('')}</div>
    <label class="f">How it came in</label><div class="bk-chips">${METHODS.map(t => chip('fset', 'method|' + t, t, F.method === t)).join('')}</div>
    ${fld('note', 'Note', F.note, 'text', 'A check number or a short note')}
    <div class="row" style="margin-top:14px"><button type="button" class="btn btn-gold" data-bka="save" data-bkv="inc"${fk('save-inc')}>${ed ? 'Save Changes' : 'Add It'}</button><button type="button" class="btn btn-line" data-bka="cancel">Cancel</button>${ed ? `<button type="button" class="btn btn-danger btn-sm" data-bka="del" data-bkv="${F.k}|${esc(ed)}">Delete</button>` : ''}</div>`,
    'Client payments come in by themselves from Client Files. Add anything else here.', 'bk-form');
}
function vIncome(){
  const y = S.fy || today().slice(0, 4), rows = incomeRows(y), tot = r2(rows.reduce((a, x) => a + x.amt, 0)), cl = r2(rows.filter(x => x.src === 'cli').reduce((a, x) => a + x.amt, 0));
  return `<div class="bk-kick">Money In</div><h2 style="margin:2px 0 10px">Income</h2>
  ${S.form && S.form.k === 'inc' ? incForm() : `<div class="row" style="margin:0 0 14px"><button type="button" class="btn btn-gold" data-bka="new" data-bkv="inc"${fk('new-inc')}>Add Income</button></div>`}
  <div class="bk-filt"><label class="f" style="margin:0">Year</label>${yearSel('fy', y)}</div>
  ${sumBox([['Income, ' + y, money(tot)], ['From Client Files', money(cl)], ['Entered Here', money(r2(tot - cl))]])}
  ${rows.length ? `<div class="bk-tw"><table class="bk-tbl"><thead><tr><th>Date</th><th>From</th><th>Kind</th><th class="r">Amount</th><th></th></tr></thead><tbody>${rows.map(x => `<tr><td>${esc(short(x.date))}</td><td>${esc(x.from)}${x.what || x.method || x.note ? `<br><small class="muted">${esc([x.what, x.method, x.note].filter(Boolean).join(', '))}</small>` : ''}</td><td>${x.src === 'cli' ? '<span class="pill sage">Client File</span>' : esc(x.kind)}</td><td class="r">${esc(money(x.amt))}</td><td class="r">${x.src === 'cli' ? `<button type="button" class="linkbtn" data-bka="cli-open" data-bkv="${esc(x.file)}">Open File</button>` : `<button type="button" class="linkbtn" data-bka="edit" data-bkv="inc|${esc(x.id)}">Edit</button>`}</td></tr>`).join('')}</tbody></table></div>`
    : `<p class="muted">No income recorded for ${esc(y)} yet. Payments recorded in Client Files show here by themselves.</p>`}`;
}

// ---------- Expenses ----------
function expForm(){
  const F = S.form, ed = S.edit, c = catOf(F.cat);
  return blk(ed ? 'Edit Expense' : 'Add an Expense', `<div class="bk-g2">${fld('date', 'Date', F.date, 'date')}${fld('amt', 'Amount', F.amt, 'number', '0.00')}</div>
    ${fld('payee', 'Paid To', F.payee, 'text', 'The store, person, or company')}
    <label class="f">Category</label><div class="bk-chips">${cats().map(k => chip('fset', 'cat|' + k.id, k.t, F.cat === k.id)).join('')}</div>
    ${F.cat ? `<p class="bk-sub">${esc(c.ex || '')} On the return: ${esc(c.where)}.</p>` : ''}
    <div class="bk-add"><input type="text" id="bk-owncat" aria-label="Add your own category" placeholder="Something else? Name a category" autocomplete="off"><button type="button" class="btn btn-line btn-sm" data-bka="owncat">Add Your Own</button></div>
    <label class="f">Paid By</label><div class="bk-chips">${chip('fset', 'paid|biz', 'Business Account', F.paid === 'biz')}${members().map(m => chip('fset', 'paid|' + m.id, 'Personal: ' + m.name.split(/\s+/)[0], F.paid === m.id)).join('')}</div>
    ${F.paid && F.paid !== 'biz' ? `<p class="bk-sub">Paid personally, so the business owes ${esc(firstName(F.paid))} this amount back. It shows under Owed Back to Members until it is marked paid back.</p>` : ''}
    ${fld('note', 'Receipt Note', F.note, 'text', 'What it was for, and where the receipt is kept')}
    <label class="f">Receipt Photo (optional)</label>
    <div class="bk-photo">${F.photo ? `<img src="${esc(F.photo)}" alt="Receipt photo"><div class="row"><button type="button" class="btn btn-line btn-sm" data-bka="photo-del">Remove Photo</button></div>` : `<label class="btn btn-line btn-sm bk-file"><input type="file" accept="image/*" data-bkphoto="1">Add a Photo</label><p class="bk-sub" style="margin:6px 0 0">Kept small and encrypted with the rest of Books.</p>`}</div>
    <div class="row" style="margin-top:14px"><button type="button" class="btn btn-gold" data-bka="save" data-bkv="exp"${fk('save-exp')}>${ed ? 'Save Changes' : 'Add It'}</button><button type="button" class="btn btn-line" data-bka="cancel">Cancel</button>${ed ? `<button type="button" class="btn btn-danger btn-sm" data-bka="del" data-bkv="${F.k}|${esc(ed)}">Delete</button>` : ''}</div>`,
    'Never write card or bank numbers here.', 'bk-form');
}
function vExpenses(){
  const y = S.fy || today().slice(0, 4), all = B().exp.filter(e => inPer(e.date, y)), rows = all.filter(e => !S.fcat || e.cat === S.fcat).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const spent = r2(rows.reduce((a, e) => a + (+e.amt || 0), 0)), ded = r2(rows.reduce((a, e) => a + deduct(e), 0));
  const used = [...new Set(all.map(e => e.cat))];
  return `<div class="bk-kick">Money Out</div><h2 style="margin:2px 0 10px">Expenses</h2>
  ${S.form && S.form.k === 'exp' ? expForm() : `<div class="row" style="margin:0 0 14px"><button type="button" class="btn btn-gold" data-bka="new" data-bkv="exp"${fk('new-exp')}>Add an Expense</button></div>`}
  <div class="bk-filt"><label class="f" style="margin:0">Year</label>${yearSel('fy', y)}<select data-bksel="fcat" aria-label="Category"><option value="">Every Category</option>${cats().filter(c => used.includes(c.id)).map(c => `<option value="${c.id}"${S.fcat === c.id ? ' selected' : ''}>${esc(c.t)}</option>`).join('')}</select></div>
  ${sumBox([['Spent', money(spent)], ['Counts on the Return', money(ded)], ['Receipts With Photos', String(rows.filter(e => e.photo).length)]])}
  ${rows.length ? `<div class="bk-tw"><table class="bk-tbl"><thead><tr><th>Date</th><th>Paid To</th><th>Category</th><th class="r">Amount</th><th></th></tr></thead><tbody>${rows.map(e => `<tr><td>${esc(short(e.date))}</td><td>${esc(e.payee)}${e.note ? `<br><small class="muted">${esc(e.note)}</small>` : ''}${e.paid && e.paid !== 'biz' ? `<br><small class="${e.reimb ? 'muted' : 'bk-owe'}">${esc(firstName(e.paid))} paid${e.reimb ? ', paid back ' + esc(short(e.reimb)) : ', to pay back'}</small>` : ''}</td><td>${esc(catOf(e.cat).t)}</td><td class="r">${esc(money(e.amt))}</td><td class="r">${e.photo ? `<button type="button" class="linkbtn" data-bka="photo-view" data-bkv="${esc(e.id)}">Receipt</button><br>` : ''}<button type="button" class="linkbtn" data-bka="edit" data-bkv="exp|${esc(e.id)}">Edit</button></td></tr>`).join('')}</tbody></table></div>`
    : `<p class="muted">No expenses${S.fcat ? ' in this category' : ''} for ${esc(y)} yet.</p>`}
  ${photoBox()}`;
}
function photoBox(){
  const e = S.photo && B().exp.find(x => x.id === S.photo); if (!e || !e.photo) return '';
  return `<div class="bk-modal" role="dialog" aria-modal="true" aria-label="Receipt photo"><div class="bk-mbox"><div class="spread"><b>${esc(e.payee || 'Receipt')}, ${esc(nice(e.date))}</b><button type="button" class="btn btn-line btn-sm" data-bka="photo-close"${fk('photo-close')}>Close</button></div><img src="${esc(e.photo)}" alt="Receipt photo"></div></div>`;
}

// ---------- Mileage Log ----------
function miForm(){
  const F = S.form, ed = S.edit, f = cliFiles().slice().sort((a, b) => cliName(a).localeCompare(cliName(b)));
  const m = +F.miles || 0, total = F.rt ? m * 2 : m;
  return blk(ed ? 'Edit Trip' : 'Add a Trip', `<div class="bk-g2">${fld('date', 'Date', F.date, 'date')}${fld('miles', F.rt ? 'Miles One Way' : 'Miles', F.miles, 'number', '0')}</div>
    <label class="cb"><input type="checkbox" data-bkck="rt"${F.rt ? ' checked' : ''}><span>Round trip (doubles the miles)</span></label>
    <div class="bk-g2">${fld('from', 'From', F.from, 'text', 'Where you started')}${fld('to', 'To', F.to, 'text', 'Where you went')}</div>
    ${fld('purpose', 'Purpose', F.purpose, 'text', 'For example: wedding rehearsal, family meeting')}
    <label class="f" for="bk-f-cli">Client (optional)</label><select id="bk-f-cli" data-bkfs="cli"><option value="">No Client</option>${f.map(x => `<option value="${esc(x.id)}"${F.cli === x.id ? ' selected' : ''}>${esc(cliName(x))}</option>`).join('')}</select>
    <label class="f">Who Drove</label><div class="bk-chips">${members().map(x => chip('fset', 'driver|' + x.id, x.name.split(/\s+/)[0] + "'s Car", F.driver === x.id)).join('')}${chip('fset', 'driver|bizcar', 'Business Vehicle', F.driver === 'bizcar')}</div>
    <p class="bk-sub" id="bk-trip-amt">${total ? esc(miles(total)) + ' at ' + esc(perMile(+F.rate || rate())) + ' a mile: ' + esc(money(total * (+F.rate || rate()))) + '.' : 'Enter the miles to see the amount.'}${F.driver && F.driver !== 'bizcar' ? ' Owed back to ' + esc(firstName(F.driver)) + ' until it is marked paid back.' : ''}</p>
    <div class="row" style="margin-top:14px"><button type="button" class="btn btn-gold" data-bka="save" data-bkv="mi"${fk('save-mi')}>${ed ? 'Save Changes' : 'Add It'}</button><button type="button" class="btn btn-line" data-bka="cancel">Cancel</button>${ed ? `<button type="button" class="btn btn-danger btn-sm" data-bka="del" data-bkv="${F.k}|${esc(ed)}">Delete</button>` : ''}</div>`,
    'Log each business trip on the day you drive it. The IRS asks for the date, where, why, and the miles.', 'bk-form');
}
function rateBlk(){
  return blk('Mileage Rate', `<div class="bk-add"><input type="number" min="0" step="0.001" id="bk-rate" aria-label="Rate a mile" value="${esc(rate())}"><button type="button" class="btn btn-line btn-sm" data-bka="rate">Update the Rate</button></div>
    <p class="bk-sub">Now ${esc(perMile(rate()))} a mile. This is the same rate Clients uses for travel. Update it each January when the IRS sets the new rate (to verify on irs.gov). Each trip keeps the rate from the day it was logged.</p>`);
}
function vMileage(){
  const y = S.fy || today().slice(0, 4), rows = B().mi.filter(t => inPer(t.date, y)).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const ml = Math.round(rows.reduce((a, t) => a + (+t.miles || 0), 0) * 10) / 10, amt = r2(rows.reduce((a, t) => a + tripAmt(t), 0));
  return `<div class="bk-kick">Car and Truck</div><h2 style="margin:2px 0 10px">Mileage Log</h2>
  ${S.form && S.form.k === 'mi' ? miForm() : `<div class="row" style="margin:0 0 14px"><button type="button" class="btn btn-gold" data-bka="new" data-bkv="mi"${fk('new-mi')}>Add a Trip</button></div>`}
  <div class="bk-filt"><label class="f" style="margin:0">Year</label>${yearSel('fy', y)}</div>
  ${sumBox([['Miles, ' + y, (Math.round(ml * 10) / 10).toLocaleString('en-US')], ['At the Rate', money(amt)], ['Trips', String(rows.length)]])}
  ${rows.length ? `<div class="bk-tw"><table class="bk-tbl"><thead><tr><th>Date</th><th>Trip</th><th class="r">Miles</th><th class="r">Amount</th><th></th></tr></thead><tbody>${rows.map(t => { const f = t.cli && cliFiles().find(x => x.id === t.cli); return `<tr><td>${esc(short(t.date))}</td><td>${esc([t.from, t.to].filter(Boolean).join(' to '))}${t.rt ? ' and back' : ''}<br><small class="muted">${esc([t.purpose, f ? cliName(f) : '', memName(t.driver)].filter(Boolean).join(', '))}${t.driver && t.driver !== 'bizcar' ? (t.reimb ? ', paid back ' + esc(short(t.reimb)) : '') : ''}</small>${t.driver && t.driver !== 'bizcar' && !t.reimb ? '<br><small class="bk-owe">To pay back</small>' : ''}</td><td class="r">${esc(String(Math.round((+t.miles || 0) * 10) / 10))}</td><td class="r">${esc(money(tripAmt(t)))}</td><td class="r"><button type="button" class="linkbtn" data-bka="edit" data-bkv="mi|${esc(t.id)}">Edit</button></td></tr>`; }).join('')}</tbody></table></div>`
    : `<p class="muted">No trips logged for ${esc(y)} yet.</p>`}
  ${rateBlk()}`;
}

// ---------- Reports ----------
function perOf(){ return S.per === 'year' ? (S.yr || today().slice(0, 4)) : (S.ym || thisYm()); }
function plHTML(per){
  const s = sums(per), keys = Object.keys(s.byCat).sort((a, b) => catOf(a).t.localeCompare(catOf(b).t));
  const name = per.length === 4 ? 'the year ' + per : ymNice(per);
  return `<div class="bk-tw"><table class="bk-tbl"><thead><tr><th>Profit and Loss, ${esc(name)}</th><th class="r">Amount</th></tr></thead><tbody>
    <tr><td>Client payments (from Client Files)</td><td class="r">${esc(money(s.cliIn))}</td></tr><tr><td>Other income</td><td class="r">${esc(money(s.ownIn))}</td></tr>
    <tr class="sub"><td>Total income</td><td class="r">${esc(money(s.income))}</td></tr>
    ${keys.map(k => { const o = s.byCat[k], c = catOf(k); return `<tr><td>${esc(c.t)}${c.pct ? `<br><small class="muted">${esc(money(o.spent))} spent; half counts</small>` : k === 'car' ? `<br><small class="muted">${esc(miles(s.miles))}</small>` : ''}</td><td class="r">${esc(money(o.ded))}</td></tr>`; }).join('') || '<tr><td>No expenses</td><td class="r">$0.00</td></tr>'}
    <tr class="sub"><td>Total expenses that count</td><td class="r">${esc(money(s.ded))}</td></tr></tbody>
    <tfoot><tr><td>${s.profit < 0 ? 'Loss' : 'Profit'}</td><td class="r">${esc(money(s.profit))}</td></tr></tfoot></table></div>
    <h4>Each Member's Share</h4><div class="bk-tw"><table class="bk-tbl"><tbody>${s.shares.map(x => `<tr><td>${esc(x.m.name)}, ${esc(String(x.share))}%</td><td class="r">${esc(money(x.amt))}</td></tr>`).join('')}</tbody></table></div>
    <p class="bk-sub">Set aside for taxes, about ${esc(String(s.pct))}% of profit: <b>${esc(money(s.aside))}</b>${s.shares.length ? ' (' + s.shares.map(x => esc(firstName(x.m.id)) + ' ' + esc(money(x.aside))).join(', ') + ')' : ''}. Confirm the percent with your tax preparer.</p>
    `;
}
function owedHTML(withButtons){
  const ow = owed();
  return ow.map(o => `<div class="bk-owed"><div class="spread"><b>${esc(o.m.name)}: ${esc(money(o.amt))}</b>${withButtons && o.amt > 0 ? `<button type="button" class="btn btn-line btn-sm" data-bka="reimb" data-bkv="${esc(o.m.id)}"${fk('reimb|' + o.m.id)}>Mark Paid Back Today</button>` : ''}</div>
    ${o.exp.length || o.mi.length ? `<ul class="bk-ul">${o.exp.map(e => `<li>${esc(short(e.date))}: ${esc(e.payee || catOf(e.cat).t)}, ${esc(money(e.amt))}</li>`).join('')}${o.mi.map(t => `<li>${esc(short(t.date))}: ${esc(miles(t.miles))}${t.to ? ' to ' + esc(t.to) : ''}, ${esc(money(tripAmt(t)))}</li>`).join('')}</ul>` : '<p class="muted" style="margin:4px 0 0">All paid back.</p>'}</div>`).join('');
}
function vReports(){
  const per = perOf(), s = sums(per);
  return `<div class="bk-kick">How the Business Is Doing</div><h2 style="margin:2px 0 10px">Reports</h2>
  <div class="bk-chips" style="margin-bottom:10px">${chip('per', 'month', 'By Month', S.per !== 'year')}${chip('per', 'year', 'By Year', S.per === 'year')}</div>
  <div class="bk-filt">${S.per === 'year' ? yearSel('yr', per) : monthSel(per)}</div>
  ${sumBox([['Income', money(s.income)], ['Expenses', money(s.ded)], [s.profit < 0 ? 'Loss' : 'Profit', money(s.profit), s.profit < 0 ? 'neg' : '']])}
  ${blk('Profit and Loss', plHTML(per) + `<div class="row" style="margin-top:10px"><button type="button" class="btn btn-line btn-sm" data-bka="print-pl">Print or Save This Report</button></div>`)}
  ${blk('Mileage', `<p style="margin:0">${esc(miles(s.miles))} on ${s.mi.length} trip${s.mi.length === 1 ? '' : 's'}, ${esc(money(s.carAmt))} at the mileage rate.</p>`)}
  ${blk('Owed Back to Members', owedHTML(true), 'Personal purchases for the business and miles driven in a personal car. Pay them back from the business account, then mark them here.')}`;
}

// ---------- Year-End ----------
const YE_LIST = [
  ['basics', 'Business Basics', 'The legal name (Grow With Grounded LLC), the business address, the EIN, the date the business started (October 5, 2026), and what the business does.'],
  ['method', 'Accounting Method', 'Cash: income counts when it comes in, expenses when they are paid. Books works this way.'],
  ['members', 'Each Member', "Name, address, and ownership share (50% each). TurboTax also asks each member's Social Security number: have it ready from your own papers. Books never keeps it."],
  ['capital', 'Money In and Out', 'What each member put into the business and took out this year, from the business bank statements.'],
  ['income', 'Gross Receipts', 'Total income from the Year-End summary, and any Form 1099-NEC or 1099-K the business received (Venmo, PayPal, a card processor).'],
  ['expenses', 'Expenses by Category', 'The Year-End summary and the Expenses CSV. Meals count at half.'],
  ['vehicle', 'Vehicle Questions', 'For each car used: business miles (the Mileage Log), total miles driven all year, commuting miles, and the date it was first used for the business.'],
  ['assets', 'Equipment and Larger Purchases', 'Anything under Equipment, with the date and cost. Your tax preparer decides whether it is an expense this year or depreciated.'],
  ['gp', 'Guaranteed Payments', 'Any set payments to a member for their work, if the business makes them.'],
  ['nec', 'Forms 1099-NEC Sent', 'Anyone paid under Contract Labor may need a Form 1099-NEC by January 31. Confirm the current amount with your tax preparer.'],
  ['sched', 'Balance Sheet Questions', 'Smaller partnerships (receipts under $250,000 and assets under $1 million) can often skip the balance sheet schedules. Confirm with your tax preparer.'],
  ['mn', 'Minnesota Return', "The Minnesota partnership return (Form M3) and each member's Schedule KPI. TurboTax Business or your tax preparer files it with the federal return."],
  ['k1', 'Schedule K-1 for Each Member', "The return makes a K-1 for Chris and one for Kayti. Each member uses theirs on their own Form 1040."],
  ['due', 'The Due Date', 'March 15 for a calendar year (March 15, 2027 for 2026). An extension is Form 7004. Filing on time matters for partnerships, even in a small first year.'],
  ['keep', 'Keep the Records', 'Save the CSV files, the printed summary, the receipts, and a Books backup for seven years.']
];
function yeHTML(y){
  const s = sums(y), keys = Object.keys(s.byCat).sort((a, b) => catOf(a).t.localeCompare(catOf(b).t)), ow = owed();
  return `<h4>Income</h4><div class="bk-tw"><table class="bk-tbl"><tbody><tr><td>Gross receipts (all income, ${esc(y)})</td><td class="r">${esc(money(s.income))}</td></tr><tr><td><small class="muted">From Client Files ${esc(money(s.cliIn))}; entered in Books ${esc(money(s.ownIn))}</small></td><td></td></tr></tbody></table></div>
    <h4>Expenses, With Where They Go</h4><div class="bk-tw"><table class="bk-tbl"><thead><tr><th>Category</th><th>Form 1065</th><th>TurboTax Business</th><th class="r">Counts</th></tr></thead><tbody>${keys.map(k => { const o = s.byCat[k], c = catOf(k); return `<tr><td>${esc(c.t)}${c.pct ? `<br><small class="muted">${esc(money(o.spent))} spent</small>` : ''}</td><td>${esc(c.where)}</td><td>${esc(c.tt)}</td><td class="r">${esc(money(o.ded))}</td></tr>`; }).join('') || '<tr><td colspan="4">No expenses</td></tr>'}</tbody>
    <tfoot><tr><td colspan="3">Total expenses that count</td><td class="r">${esc(money(s.ded))}</td></tr><tr><td colspan="3">${s.profit < 0 ? 'Ordinary business loss' : 'Ordinary business income'}</td><td class="r">${esc(money(s.profit))}</td></tr></tfoot></table></div>
    <h4>Schedule K-1: Each Member's Share</h4><div class="bk-tw"><table class="bk-tbl"><tbody>${s.shares.map(x => `<tr><td>${esc(x.m.name)}, ${esc(String(x.share))}%</td><td class="r">${esc(money(x.amt))}</td></tr>`).join('')}</tbody></table></div>
    <h4>Vehicle</h4><p>${esc(miles(s.miles))} on ${s.mi.length} business trip${s.mi.length === 1 ? '' : 's'}, ${esc(money(s.carAmt))} at the standard mileage rate.${members().map(m => { const ml = Math.round(s.mi.filter(t => t.driver === m.id).reduce((a, t) => a + (+t.miles || 0), 0) * 10) / 10; return ml ? ' ' + esc(m.name.split(/\s+/)[0]) + "'s car: " + esc(miles(ml)) + '.' : ''; }).join('')}</p>
    ${ow.some(o => o.amt > 0) ? `<h4>Still Owed Back to Members</h4><p>${ow.filter(o => o.amt > 0).map(o => esc(o.m.name) + ': ' + esc(money(o.amt))).join('; ')}. Paying these back before the year ends keeps the books simple.</p>` : ''}
    <p class="muted">Categories and where they go are a starting point. Confirm them with your tax preparer.</p>`;
}
function yeYear(){ const y = S.yeYr || String(new Date().getFullYear() - (new Date().getMonth() < 3 ? 1 : 0)); return years().includes(y) ? y : years()[0]; }
function vYearEnd(){
  const yy = yeYear(), ye = B().ye[yy] || {}, done = ye.done || {};
  return `<div class="bk-kick">For TurboTax Business</div><h2 style="margin:2px 0 10px">Year-End</h2>
  <div class="bk-filt"><label class="f" style="margin:0">Tax Year</label>${yearSel('yeYr', yy)}</div>
  ${blk('Summary for ' + yy, yeHTML(yy) + `<div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold btn-sm" data-bka="print-ye">Print or Save the Summary</button></div>`, 'Grow With Grounded LLC, a two-member LLC that files as a partnership: Form 1065, with a Schedule K-1 for each member.')}
  ${blk('CSV Files', `<div class="row"><button type="button" class="btn btn-line btn-sm" data-bka="csv" data-bkv="income">Income CSV</button><button type="button" class="btn btn-line btn-sm" data-bka="csv" data-bkv="expenses">Expenses CSV</button><button type="button" class="btn btn-line btn-sm" data-bka="csv" data-bkv="mileage">Mileage CSV</button><button type="button" class="btn btn-line btn-sm" data-bka="csv" data-bkv="summary">Totals by Category CSV</button></div>
    <p class="bk-sub">For your tax preparer or a spreadsheet. These files are not encrypted, so keep them somewhere private and share them only when you need to.</p>`)}
  ${blk('What TurboTax Business Asks', `<div class="bk-check">${YE_LIST.map(([k, h, p]) => `<label class="tick${done[k] ? ' done' : ''}"><input type="checkbox" data-bkye="${k}"${done[k] ? ' checked' : ''}><span><b>${esc(h)}</b><br><small>${esc(p)}</small></span></label>`).join('')}</div>`, 'For a two-member LLC partnership. Tick each one as it is ready. Confirm anything unsure with your tax preparer.')}`;
}

// ---------- Settings ----------
function vSettings(){
  const st = B().set, T = S.set || (S.set = {members: members().map(m => Object.assign({}, m)), pct: st.pct, home: st.home});
  const sum = T.members.reduce((a, m) => a + (+m.share || 0), 0);
  return `<div class="bk-kick">Books</div><h2 style="margin:2px 0 10px">Settings</h2>
  ${blk('Members and Shares', T.members.map((m, i) => `<div class="bk-g2">${`<div class="bk-fld"><label class="f" for="bk-mn-${i}">Member ${i + 1}</label><input id="bk-mn-${i}" type="text" data-bkset="members.${i}.name" value="${esc(m.name)}" autocomplete="off"></div>`}${`<div class="bk-fld"><label class="f" for="bk-ms-${i}">Share (%)</label><input id="bk-ms-${i}" type="number" min="0" max="100" step="1" inputmode="decimal" data-bkset="members.${i}.share" value="${esc(m.share)}"></div>`}</div>`).join('') +
    `<p class="bk-sub" id="bk-sharesum">${sum === 100 ? 'Shares add up to 100%.' : 'Shares add up to ' + esc(String(sum)) + '%. They need to add up to 100%.'} Match your operating agreement.</p>`)}
  ${blk('Set Aside for Taxes', `<div class="bk-fld" style="max-width:220px"><label class="f" for="bk-pct">Percent of Profit</label><input id="bk-pct" type="number" min="0" max="60" step="1" inputmode="decimal" data-bkset="pct" value="${esc(T.pct)}"></div><p class="bk-sub">About 25% is a common starting point for federal and Minnesota income tax and self-employment tax together. Confirm it with your tax preparer.</p>`)}
  ${blk('Where Trips Start', `<div class="bk-fld"><label class="f" for="bk-home">Starting Place</label><input id="bk-home" type="text" data-bkset="home" value="${esc(T.home)}" autocomplete="off"></div>`)}
  <div class="row" style="margin:0 0 14px"><button type="button" class="btn btn-gold" data-bka="set-save"${fk('set-save')}>Save Settings</button></div>
  ${rateBlk()}
  ${blk('Your Own Categories', `${arr(B().cats).length ? `<ul class="bk-ul">${B().cats.map(c => `<li class="spread"><span>${esc(c.t)}</span><button type="button" class="linkbtn" data-bka="cat-del" data-bkv="${esc(c.id)}">Remove</button></li>`).join('')}</ul>` : '<p class="muted" style="margin:0">None yet. Add one here or from an expense.</p>'}
    <div class="bk-add"><input type="text" id="bk-owncat" aria-label="Add your own category" placeholder="Name a category" autocomplete="off"><button type="button" class="btn btn-line btn-sm" data-bka="owncat">Add Your Own</button></div>`, 'Your own categories go under Other Deductions on the return. Confirm with your tax preparer.')}
  ${blk('Receipt Photos', `<p style="margin:0">${esc(photoKB())} of receipt photos on this device.</p><p class="bk-sub">Photos are kept small so Books stays quick. For a long year, keep the paper receipts or your own photos in a private folder too.</p>`)}`;
}
function photoKB(){ const n = B().exp.reduce((a, e) => a + (e.photo ? e.photo.length * 0.75 : 0), 0); return n > 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.round(n / 1024) + ' KB'; }

// ---------- the tab ----------
const SECS = [['overview', 'Overview'], ['income', 'Income'], ['expenses', 'Expenses'], ['mileage', 'Mileage Log'], ['reports', 'Reports'], ['yearend', 'Year-End'], ['settings', 'Settings']];
function inner(){ return S.sec === 'income' ? vIncome() : S.sec === 'expenses' ? vExpenses() : S.sec === 'mileage' ? vMileage() : S.sec === 'reports' ? vReports() : S.sec === 'yearend' ? vYearEnd() : S.sec === 'settings' ? vSettings() : vOverview(); }
function view(){
  if (!isFounder() || !D()) return '';
  store();
  return `<div id="bk-root"><div class="page-head" style="margin-bottom:12px"><div class="eyebrow">Grow With Grounded LLC</div><h1>Books</h1><p>Income, expenses, mileage, and the year-end summary, kept private on this device.</p></div>
  <div class="bk-secs" role="group" aria-label="Sections">${SECS.map(([k, l]) => `<button type="button" class="chip" data-bka="sec" data-bkv="${k}" aria-pressed="${S.sec === k}"${fk('sec|' + k)}>${esc(l)}</button>`).join('')}</div>
  <div id="bk-in">${inner()}</div></div>`;
}
function rerender(keepScroll){
  const r = document.getElementById('bk-root'); if (!r){ if (C.render) C.render(); return; }
  const ae = document.activeElement, k = ae && ae.getAttribute && ae.getAttribute('data-fk'), y = window.scrollY;
  r.outerHTML = view(); if (keepScroll) window.scrollTo(0, y); else window.scrollTo(0, 0);
  if (k){ const el = document.querySelector('#bk-root [data-fk="' + (window.CSS && CSS.escape ? CSS.escape(k) : k) + '"]'); if (el) try { el.focus({preventScroll: true}); } catch (e) {} }
}
function toForm(){ setTimeout(() => { const f = document.getElementById('bk-form'); if (f && f.scrollIntoView) f.scrollIntoView({block: 'start'}); const i = f && f.querySelector('input'); if (i) try { i.focus({preventScroll: true}); } catch (e) {} }, 0); }

// ---------- actions ----------
function blank(k){
  if (k === 'inc') return {k, date: today(), amt: '', from: '', kind: 'session', method: '', note: ''};
  if (k === 'exp') return {k, date: today(), amt: '', payee: '', cat: '', paid: 'biz', note: '', photo: null};
  return {k, date: today(), miles: '', rt: true, from: B().set.home || '', to: '', purpose: '', cli: '', driver: (members()[0] || {}).id || 'bizcar', rate: 0};
}
const listOf = k => k === 'inc' ? B().inc : k === 'exp' ? B().exp : B().mi;
const secOf = k => k === 'inc' ? 'income' : k === 'exp' ? 'expenses' : 'mileage';
function saveForm(k){
  const F = S.form; if (!F) return;
  const amt = r2(F.amt), ml = +F.miles;
  if (!dOf(F.date)){ toast('Add the date.'); return; }
  if (k !== 'mi' && !(amt > 0)){ toast('Enter the amount, for example 25.00.'); const i = document.getElementById('bk-f-amt'); if (i) i.focus(); return; }
  if (k === 'mi' && !(ml > 0)){ toast('Enter the miles.'); const i = document.getElementById('bk-f-miles'); if (i) i.focus(); return; }
  if (k === 'exp' && !F.cat){ toast('Tap a category.'); return; }
  let rec;
  if (k === 'inc') rec = {date: F.date, amt, from: String(F.from || '').trim(), kind: F.kind || 'other', method: F.method || '', note: String(F.note || '').trim()};
  else if (k === 'exp') rec = {date: F.date, amt, payee: String(F.payee || '').trim(), cat: F.cat, paid: F.paid || 'biz', note: String(F.note || '').trim(), photo: F.photo || null};
  else { const m = Math.round((F.rt ? ml * 2 : ml) * 10) / 10; rec = {date: F.date, miles: m, oneWay: F.rt ? ml : null, rt: !!F.rt, from: String(F.from || '').trim(), to: String(F.to || '').trim(), purpose: String(F.purpose || '').trim(), cli: F.cli || '', driver: F.driver || 'bizcar', rate: +F.rate > 0 ? +F.rate : rate()}; }
  const L = listOf(k);
  if (S.edit){ const x = L.find(y => y.id === S.edit); if (x){ const keep = {reimb: x.reimb || null}; Object.assign(x, rec, k === 'inc' ? {} : (k === 'exp' && rec.paid !== x.paid) || (k === 'mi' && rec.driver !== x.driver) ? {reimb: null} : keep, {u: Date.now()}); } }
  else L.push(Object.assign({id: 'bk' + uid(), u: Date.now(), reimb: null}, rec));
  save(); toast(S.edit ? 'Saved.' : 'Added.'); S.form = null; S.edit = null; rerender(true);
}
function del(k, id){
  const d = D(), L = listOf(k), x = L.find(y => y.id === id); if (!x) return;
  if (!confirm('Delete this entry from Books?')) return;
  const b = store(); if (k === 'inc') b.inc = b.inc.filter(y => y !== x); else if (k === 'exp') b.exp = b.exp.filter(y => y !== x); else b.mi = b.mi.filter(y => y !== x);
  d.deleted = d.deleted || {clients: {}, sessions: {}}; d.deleted.books = d.deleted.books || {}; d.deleted.books[id] = Date.now();
  save(); S.form = null; S.edit = null; toast('Deleted.'); rerender(true);
}
function addCat(){
  const i = document.getElementById('bk-owncat'), t = i ? i.value.trim().replace(/\s+/g, ' ') : '';
  if (!t){ toast('Type a category name first.'); if (i) i.focus(); return; }
  const SMALL = ['a', 'an', 'the', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'at', 'by', 'as'];
  const tt = t.split(' ').map((w, i) => i && SMALL.includes(w.toLowerCase()) ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  if (cats().some(c => c.t.toLowerCase() === tt.toLowerCase())){ toast('That category is already here.'); return; }
  const c = {id: 'own' + uid(), t: tt, u: Date.now()}; store().cats.push(c); save();
  if (S.form && S.form.k === 'exp') S.form.cat = c.id;
  toast('Category added.'); rerender(true);
}
// A receipt photo, made small: the longest side at most 900 pixels, saved as a JPEG of about 100 KB or less.
function shrink(file){
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onerror = () => rej(new Error('read'));
    r.onload = () => { const img = new Image(); img.onerror = () => rej(new Error('image')); img.onload = () => {
      let side = 900, q = 0.6, out = '';
      for (let tries = 0; tries < 6; tries++){
        const s = Math.min(1, side / Math.max(img.width, img.height)), w = Math.max(1, Math.round(img.width * s)), h = Math.max(1, Math.round(img.height * s));
        const cv = document.createElement('canvas'); cv.width = w; cv.height = h; const g = cv.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, w, h); g.drawImage(img, 0, 0, w, h);
        out = cv.toDataURL('image/jpeg', q); if (out.length * 0.75 <= 100 * 1024) break; side = Math.round(side * 0.8); q = Math.max(0.4, q - 0.05);
      }
      res(out); }; img.src = r.result; };
    r.readAsDataURL(file);
  });
}
function markReimb(mid){
  const t = today(); let n = 0;
  B().exp.forEach(e => { if (e.paid === mid && !e.reimb){ e.reimb = t; e.u = Date.now(); n++; } });
  B().mi.forEach(x => { if (x.driver === mid && !x.reimb){ x.reimb = t; x.u = Date.now(); n++; } });
  if (n){ save(); toast('Marked paid back to ' + firstName(mid) + '.'); } rerender(true);
}
// ---------- printouts and CSV files ----------
function sheet(html, title, file){
  const body = (C.ph ? C.ph(title) : '') + `<style>${PCSS}</style>` + html + (C.pf ? C.pf() : '');
  API.last = {title, html: body};
  if (C.sheet) C.sheet(body, title, {file, confidential: true});
}
const csvCell = v => { let s = v == null ? '' : String(v); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
const csvOf = rows => rows.map(r => r.map(csvCell).join(',')).join('\r\n') + '\r\n';
function csvRows(kind, y){
  const s = sums(y);
  if (kind === 'income') return [['Date', 'From', 'Kind', 'For', 'Method', 'Note', 'Source', 'Amount']].concat(s.inc.slice().reverse().map(x => [x.date, x.from, x.kind, x.what || '', x.method || '', x.note || '', x.src === 'cli' ? 'Client Files' : 'Books', r2(x.amt).toFixed(2)]));
  if (kind === 'expenses') return [['Date', 'Paid To', 'Category', 'Form 1065', 'TurboTax Business', 'Amount', 'Counts on the Return', 'Paid By', 'Paid Back', 'Receipt Note', 'Receipt Photo']].concat(s.exp.slice().sort((a, b) => (a.date || '').localeCompare(b.date || '')).map(e => { const c = catOf(e.cat); return [e.date, e.payee, c.t, c.where, c.tt, r2(e.amt).toFixed(2), deduct(e).toFixed(2), memName(e.paid || 'biz'), e.paid && e.paid !== 'biz' ? (e.reimb || 'Not yet') : '', e.note || '', e.photo ? 'Yes, in Books' : '']; }));
  if (kind === 'mileage') return [['Date', 'From', 'To', 'Round Trip', 'Purpose', 'Client', 'Vehicle', 'Miles', 'Rate a Mile', 'Amount', 'Paid Back']].concat(s.mi.slice().sort((a, b) => (a.date || '').localeCompare(b.date || '')).map(t => { const f = t.cli && cliFiles().find(x => x.id === t.cli); return [t.date, t.from, t.to, t.rt ? 'Yes' : 'No', t.purpose, f ? cliName(f) : '', t.driver === 'bizcar' ? 'Business Vehicle' : firstName(t.driver) + "'s car", String(t.miles), String(+t.rate || rate()), tripAmt(t).toFixed(2), t.driver && t.driver !== 'bizcar' ? (t.reimb || 'Not yet') : '']; }));
  const keys = Object.keys(s.byCat).sort((a, b) => catOf(a).t.localeCompare(catOf(b).t));
  return [['Line', 'Form 1065', 'TurboTax Business', 'Spent', 'Counts on the Return']].concat([['Gross Receipts', 'Gross receipts or sales', 'Gross receipts', s.income.toFixed(2), s.income.toFixed(2)]],
    keys.map(k => { const c = catOf(k), o = s.byCat[k]; return [c.t, c.where, c.tt, o.spent.toFixed(2), o.ded.toFixed(2)]; }),
    [['Total Expenses', '', '', s.spent.toFixed(2), s.ded.toFixed(2)], [s.profit < 0 ? 'Ordinary Business Loss' : 'Ordinary Business Income', 'Ordinary business income (loss)', '', '', s.profit.toFixed(2)]],
    s.shares.map(x => ['Schedule K-1: ' + x.m.name + ', ' + x.share + '%', 'Share of ordinary business income', '', '', x.amt.toFixed(2)]),
    [['Business Miles', '', 'Vehicle: business miles', '', String(s.miles)]]);
}
function csv(kind, y){
  const text = csvOf(csvRows(kind, y)), name = 'books-' + kind + '-' + y + '.csv';
  API.lastCsv = {name, text};
  const blob = new Blob(['\ufeff' + text], {type: 'text/csv'});
  if (window.GGApp && GGApp.share) GGApp.share(blob, name, 'Books ' + kind + ' ' + y);
  else { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500); }
  toast('Saved ' + name + '. It is not encrypted, so keep it private.');
}
const PCSS = `.bk-tbl{width:100%;border-collapse:collapse;}.bk-tbl td,.bk-tbl th{border-top:1px solid #ccc;padding:5px 4px;text-align:left;vertical-align:top;}.bk-tbl .r{text-align:right;white-space:nowrap;}.bk-tbl tfoot td,.bk-tbl tr.sub td{font-weight:700;}.muted{color:#555;}.bk-sub{color:#555;}`;

function act(a, v, el){
  const d = D(); if (!d || !isFounder()) return;
  store();
  switch (a){
    case 'sec': S.sec = v; S.form = null; S.edit = null; S.photo = null; S.set = null; rerender(false); return;
    case 'new': S.sec = secOf(v); S.form = blank(v); S.edit = null; if (C.go && !document.getElementById('bk-root')) C.go('books'); else rerender(true); toForm(); return;
    case 'cancel': S.form = null; S.edit = null; rerender(true); return;
    case 'edit': { const [k, id] = v.split('|'), x = listOf(k).find(y => y.id === id); if (!x) return; S.edit = id;
      S.form = Object.assign(blank(k), x, {k}, k === 'mi' ? {miles: x.rt ? (x.oneWay != null ? x.oneWay : x.miles / 2) : x.miles} : {}); rerender(true); toForm(); return; }
    case 'del': { const [k, id] = v.split('|'); del(k, id); return; }
    case 'fset': { if (!S.form) return; const i = v.indexOf('|'), k = v.slice(0, i), val = v.slice(i + 1); S.form[k] = S.form[k] === val && k === 'method' ? '' : val; rerender(true); return; }
    case 'save': saveForm(v); return;
    case 'owncat': addCat(); return;
    case 'cat-del': { const b = store(); if (b.exp.some(e => e.cat === v)){ toast('Some expenses use this category. Move them first.'); return; } b.cats = b.cats.filter(c => c.id !== v); d.deleted = d.deleted || {clients: {}, sessions: {}}; d.deleted.books = d.deleted.books || {}; d.deleted.books[v] = Date.now(); save(); rerender(true); return; }
    case 'photo-del': if (S.form){ S.form.photo = null; rerender(true); } return;
    case 'photo-view': S.photo = v; rerender(true); return;
    case 'photo-close': S.photo = null; rerender(true); return;
    case 'cli-open': if (window.GGCli && GGCli.open) GGCli.open('files', v); return;
    case 'aside': { const s = sums(v); B().aside[v] = {done: true, amt: s.aside, date: today(), u: Date.now()}; save(); toast('Marked as set aside.'); if (document.getElementById('bk-root')) rerender(true); else if (C.render) C.render(); return; }
    case 'aside-undo': B().aside[v] = {done: false, u: Date.now()}; save(); rerender(true); return;
    case 'aside-open': S.sec = 'overview'; if (C.go) C.go('books'); return;
    case 'per': S.per = v; rerender(true); return;
    case 'reimb': { const o = owed().find(x => x.m.id === v); if (!o || !o.amt) return; if (!confirm('Mark ' + money(o.amt) + ' as paid back to ' + o.m.name + ' today?')) return; markReimb(v); return; }
    case 'rate': { const i = document.getElementById('bk-rate'), r = i ? +i.value : 0; if (!(r > 0 && r < 10)){ toast('Enter the rate a mile, for example 0.76.'); return; }
      const y = today().slice(0, 4), same = B().mi.filter(t => String(t.date).slice(0, 4) === y && +t.rate !== r);
      setRate(r);
      if (same.length && confirm('Use ' + perMile(r) + ' for the ' + same.length + ' trip' + (same.length === 1 ? '' : 's') + ' already logged in ' + y + ' too?')){ same.forEach(t => { t.rate = r; t.u = Date.now(); }); save(); }
      toast('Mileage rate updated for Books and Clients.'); rerender(true); return; }
    case 'set-save': { const T = S.set; if (!T) return; const sum = T.members.reduce((x, m) => x + (+m.share || 0), 0);
      if (T.members.some(m => !String(m.name || '').trim())){ toast('Add a name for each member.'); return; }
      if (Math.abs(sum - 100) > 0.01){ toast('Shares need to add up to 100%.'); return; }
      const p = +T.pct; if (!(p >= 0 && p <= 60)){ toast('Enter a percent from 0 to 60.'); return; }
      const st = B().set; st.members = T.members.map(m => ({id: m.id, name: String(m.name).trim(), share: +m.share})); st.pct = p; st.home = String(T.home || '').trim(); st.u = Date.now(); save(); S.set = null; toast('Settings saved.'); rerender(true); return; }
    case 'print-pl': { const per = perOf(); sheet(`<h2>Profit and Loss</h2><p class="muted">Grow With Grounded LLC, ${esc(per.length === 4 ? 'the year ' + per : ymNice(per))}</p>` + plHTML(per), 'Profit and Loss, ' + (per.length === 4 ? per : ymNice(per)), 'profit-and-loss-' + per); return; }
    case 'print-ye': { const y = yeYear(); sheet(`<h2>Year-End Summary for TurboTax Business</h2><p class="muted">Grow With Grounded LLC, tax year ${esc(y)}. Form 1065, with a Schedule K-1 for each member.</p>` + yeHTML(y), 'Year-End Summary ' + y, 'year-end-summary-' + y); return; }
    case 'csv': csv(v, yeYear()); return;
  }
}

// ---------- events ----------
document.addEventListener('click', e => {
  const t = e.target.closest && e.target.closest('[data-bka]'); if (!t || !D()) return;
  if (t.disabled) return;
  e.preventDefault(); act(t.dataset.bka, t.dataset.bkv || '', t);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && S.photo && document.querySelector('#bk-root .bk-modal')){ S.photo = null; rerender(true); return; }
  if (e.key !== 'Enter' || !e.target.closest) return;
  if (e.target.id === 'bk-owncat' && e.target.closest('#bk-root')){ e.preventDefault(); addCat(); }
});
// Typing saves to the form as it goes, with no redraw, so the next tap always lands.
document.addEventListener('input', e => {
  const t = e.target; if (!t.closest || !t.closest('#bk-root') || !D()) return;
  if (t.dataset.bkf && S.form){ S.form[t.dataset.bkf] = t.value;
    if (S.form.k === 'mi' && t.dataset.bkf === 'miles'){ const p = document.getElementById('bk-trip-amt'), m = +t.value || 0, tot = S.form.rt ? m * 2 : m, r = +S.form.rate || rate(); if (p) p.textContent = tot ? miles(tot) + ' at ' + perMile(r) + ' a mile: ' + money(tot * r) + '.' + (S.form.driver && S.form.driver !== 'bizcar' ? ' Owed back to ' + firstName(S.form.driver) + ' until it is marked paid back.' : '') : 'Enter the miles to see the amount.'; }
    return; }
  if (t.dataset.bkset && S.set){ const p = t.dataset.bkset.split('.'); if (p[0] === 'members'){ const m = S.set.members[+p[1]]; if (m) m[p[2]] = p[2] === 'share' ? (t.value === '' ? '' : +t.value) : t.value; const sum = S.set.members.reduce((a, x) => a + (+x.share || 0), 0), n = document.getElementById('bk-sharesum'); if (n) n.textContent = (sum === 100 ? 'Shares add up to 100%.' : 'Shares add up to ' + sum + '%. They need to add up to 100%.') + ' Match your operating agreement.'; } else S.set[p[0]] = t.value; }
});
document.addEventListener('change', e => {
  const t = e.target; if (!t.closest || !t.closest('#bk-root') || !D()) return;
  if (t.dataset.bksel){ const k = t.dataset.bksel; S[k] = t.value; rerender(true); return; }
  if (t.dataset.bkfs && S.form){ S.form[t.dataset.bkfs] = t.value; return; }
  if (t.dataset.bkck && S.form){ S.form[t.dataset.bkck] = !!t.checked; rerender(true); return; }
  if (t.dataset.bkye){ const y = yeYear(), b = store(), ye = b.ye[y] = b.ye[y] || {done: {}}; ye.done = ye.done || {}; ye.done[t.dataset.bkye] = !!t.checked; ye.u = Date.now(); save(); const l = t.closest('label'); if (l) l.classList.toggle('done', !!t.checked); return; }
  if (t.dataset.bkphoto && S.form && t.files && t.files[0]){
    const f = t.files[0]; if (!/^image\//.test(f.type || 'image/')){ toast('Choose a photo.'); return; }
    shrink(f).then(u => { if (S.form){ S.form.photo = u; rerender(true); toast('Photo added.'); } }).catch(() => toast('That photo could not be read. Try another.'));
  }
});

// ---------- styles ----------
const CSS = `
#bk-root{min-width:0;}
.bk-secs{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 16px;}.bk-secs .chip{min-height:46px;}
.bk-kick{font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);font-size:14px;}
.bk-blk{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px 18px;margin:0 0 14px;min-width:0;}.bk-blk h3{margin:0 0 8px;overflow-wrap:anywhere;}.bk-blk h4{margin:14px 0 6px;}
.bk-sub{color:var(--ink-soft);font-size:15px;margin:6px 0 10px;}
.bk-lock{display:flex;gap:10px;align-items:center;background:var(--bg-deep);border-radius:12px;padding:10px 14px;margin:0 0 14px;font-size:15px;}
.bk-chips{display:flex;flex-wrap:wrap;gap:8px;}.bk-chips .chip{min-height:46px;font-size:calc(16px * var(--scale));padding:9px 16px;}
.bk-g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 14px;}@media(max-width:700px){.bk-g2{grid-template-columns:minmax(0,1fr);}}
.bk-fld{min-width:0;}
#bk-root select{width:auto;max-width:100%;}
.bk-filt{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:0 0 12px;}.bk-filt select{flex:0 1 auto;min-width:0;}
.bk-add{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;}.bk-add input{flex:1 1 200px;min-width:0;width:auto;}
.bk-sums{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:12px;}.bk-sums div{background:var(--bg-deep);border-radius:12px;padding:10px 12px;min-width:0;}.bk-sums span{display:block;font-size:14px;color:var(--ink-soft);}.bk-sums b{font-size:1.25em;overflow-wrap:anywhere;}.bk-sums .neg b{color:var(--danger);}
@media(max-width:560px){.bk-sums{grid-template-columns:minmax(0,1fr);}}
.bk-tw{overflow-x:auto;max-width:100%;}.bk-tbl{width:100%;border-collapse:collapse;}.bk-tbl th,.bk-tbl td{border-top:1px solid var(--line);padding:8px 6px;text-align:left;vertical-align:top;overflow-wrap:anywhere;}.bk-tbl th{font-size:13px;color:var(--ink-soft);}
.bk-tbl .r{text-align:right;white-space:nowrap;}.bk-tbl tfoot td,.bk-tbl tr.sub td{font-weight:700;}.bk-tbl small{font-size:13.5px;}
@media(max-width:560px){.bk-tbl th,.bk-tbl td{padding:7px 4px;font-size:15px;}}
.bk-owe{color:var(--gold);font-weight:600;}
.bk-ul{margin:0 0 6px;padding-left:20px;}.bk-ul li{margin:4px 0;}
.bk-owed{border-top:1px solid var(--line);padding:10px 0;}.bk-owed:first-of-type{border-top:0;}
.bk-aside{display:flex;gap:14px;flex-wrap:wrap;align-items:center;background:var(--card);border:1px solid var(--line);border-left:4px solid var(--gold);border-radius:16px;padding:14px 18px;margin:0 0 14px;}.bk-aside h3{margin:0;}.bk-aside.done{border-left-color:var(--sage);}
.bk-ok{margin:8px 0 0;font-weight:600;}
.bk-photo img{display:block;max-width:min(100%,320px);height:auto;border-radius:10px;border:1px solid var(--line);margin:0 0 8px;background:#fff;}
.bk-file{position:relative;overflow:hidden;cursor:pointer;}.bk-file input{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;}
.bk-modal{position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:16px;z-index:60;}
.bk-mbox{background:var(--card);border-radius:16px;padding:14px;max-width:min(680px,100%);max-height:100%;overflow:auto;}.bk-mbox img{display:block;max-width:100%;height:auto;margin-top:10px;border-radius:10px;background:#fff;}
.bk-check .tick small{color:var(--ink-soft);font-size:14.5px;}
.bk-home{margin-top:14px;}
`;
(function(){ const s = document.createElement('style'); s.id = 'bk-css'; s.textContent = CSS; document.head.appendChild(s); })();

// ---------- the API ----------
const API = window.GGBooks = {
  init(ctx){ C = ctx || {}; },
  view,
  // Founders' Home: last month's Set Aside for Taxes, until it is marked.
  homeCard(){
    if (!isFounder() || !D()) return '';
    const last = prevYm(thisYm()), s = sums(last), a = B().aside[last];
    if (!(s.aside > 0) || (a && a.done)) return '';
    return `<div class="bk-aside bk-home"><div style="min-width:0;flex:1 1 260px"><h3>Set Aside for Taxes: ${esc(ymNice(last))}</h3><p class="muted" style="margin:4px 0 0">About ${esc(money(s.aside))}, ${esc(String(s.pct))}% of ${esc(money(s.profit))} profit. Move it to savings for estimated taxes.</p></div>
      <div class="row"><button type="button" class="btn btn-gold btn-sm" data-bka="aside" data-bkv="${last}">I Set It Aside</button><button type="button" class="btn btn-line btn-sm" data-bka="aside-open">Open Books</button></div></div>`;
  },
  // Backups: entries combine; the newest copy of each wins and deleted entries stay deleted.
  merge(out, inc){
    out.deleted = out.deleted || {clients: {}, sessions: {}}; out.deleted.books = out.deleted.books || {};
    Object.entries((inc.deleted || {}).books || {}).forEach(([id, ts]) => { out.deleted.books[id] = Math.max(out.deleted.books[id] || 0, ts); });
    const o = out.books = out.books || {}, i = inc.books || {}; let added = 0, updated = 0;
    ['inc', 'exp', 'mi', 'cats'].forEach(k => {
      o[k] = arr(o[k]);
      arr(i[k]).forEach(x => { if (!x || !x.id) return; const j = o[k].findIndex(y => y.id === x.id); if (j < 0){ o[k].push(x); added++; } else if ((x.u || 0) > (o[k][j].u || 0)){ o[k][j] = x; updated++; } });
      o[k] = o[k].filter(x => !(out.deleted.books[x.id] && out.deleted.books[x.id] >= (x.u || 0)));
    });
    ['aside', 'ye'].forEach(k => { o[k] = o[k] && typeof o[k] === 'object' ? o[k] : {}; Object.entries(i[k] || {}).forEach(([m, x]) => { if (x && (!o[k][m] || (x.u || 0) > (o[k][m].u || 0))) o[k][m] = x; }); });
    if (i.set && (!o.set || (i.set.u || 0) > (o.set.u || 0))) o.set = i.set;
    return {added, updated};
  },
  open(sec){ S.sec = sec || 'overview'; if (C.go) C.go('books'); },
  // For tests and the lead.
  state: S, sums, owed, cliPays, rate, csvRows, csvOf, CATS, YE_LIST, last: null, lastCsv: null
};
})();
