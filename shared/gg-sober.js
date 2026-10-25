/* =====================================================================
   LIVING SOBER IN THE ADULT TREES (shared/gg-sober.js), GWG BLD 837
   The Living Sober card, the sober date and its stars, milestones,
   My Anchor Plan, and the ?sober= link, for Birch, Oak, and Sequoia.
   Maple, Aspen, and Pine never load this file.

   Privacy: nothing here keeps anything on its own. The choice, the
   sober date, and the milestones shown live in the locked vault through
   shared/gg-life.js (vault.life); My Anchor Plan lives in vault.soberAnchor.
   Guests keep everything in memory for this page visit only. Nothing is
   ever written to browser storage, and nothing ever travels.

   For tools
     GGSober.init(tree, opts)    once per app. opts: open(kind) shows Living Sober in When Life Changes
                                 (kind 'sober' or 'anchor'), create() and openProfile() for a guest,
                                 helper() true while a helper views someone else.
     GGSober.cardHtml(tree, where)  the Living Sober card ('all' or 'ring'); '' for a helper view.
                                 Clicks are handled here (data-ggs), so an app only places the string.
     GGSober.count(date, today)  {n, unit, star, label} for a sober date: under a month days (bronze),
                                 under a year months (silver), then years (gold). Never the date itself.
     GGSober.reached(date, today)  milestone keys reached: d1 d3 d7 d14 d21, m1 to m11, y1, y2, ...
     GGSober.check(tree)         shows the newest milestone not yet shown, once (then all reached are marked).
     GGSober.anchor(tree, edit)  opens My Anchor Plan (view, or edit).
     GGSober.daily(tree)         today's encouragement {kind, text}.
     GGSober.refresh()           repaints every card on the page.
   The ?sober= link (read once, then taken off the address): 1 turns Living Sober on, love sets the stage
   to Someone I Love (change, early, growing, long set theirs), anchor opens My Anchor Plan. Notes for the
   page are in the BLD 837 build folder (app-api.md).
   Words come from shared/sober-words.js (window.GGSoberWords), with safe lines here while it loads.
   Sharing uses shared/gg-sharecard.js (window.GGShareCard), with the device share or a copied link as backup.
   No dashes in any words here; Title Case for names.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGSober) return;
  var V = 'b850';
  var TREES = ['birch', 'oak', 'sequoia'];
  var SITE = 'https://growwithgrounded.com/living-sober';
  var ROOT = (function () { try { var s = document.currentScript && document.currentScript.src; if (s) return new URL('..', s).href.replace(/\/$/, ''); } catch (e) {} return location.origin; })();
  function L() { return window.GGLife || null; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function todayStr() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parts(d) { var m = /^(\d{4})-(\d\d)-(\d\d)$/.exec(String(d || '')); return m ? [+m[1], +m[2], +m[3]] : null; }
  function dim(y, m) { return new Date(y, m, 0).getDate(); } // days in month m (1 to 12)
  function script(src, test) { return new Promise(function (ok) { if (test()) return ok(); var s = document.createElement('script'); s.src = ROOT + src; s.onload = s.onerror = function () { ok(); }; document.head.appendChild(s); }); }
  function needWords() { return script('/shared/sober-words.js?v=' + V, function () { return !!window.GGSoberWords; }); }
  function needShare() { return script('/shared/gg-sharecard.js?v=' + V, function () { return !!window.GGShareCard; }); }
  function need30() { return script('/shared/sober-30.js?v=' + V, function () { return !!window.GGSober30; }); }
  function needMore() { return script('/shared/sober-more.js?v=' + V, function () { return !!window.GGSoberMore; }); }

  /* ---------- the count: one number, never the date ---------- */
  function count(date, now) {
    var s = parts(date), t = parts(now || todayStr()); if (!s || !t) return null;
    var days = Math.round((Date.UTC(t[0], t[1] - 1, t[2]) - Date.UTC(s[0], s[1] - 1, s[2])) / 864e5);
    if (days < 0) return null;
    var months = (t[0] - s[0]) * 12 + (t[1] - s[1]);
    if (t[2] < Math.min(s[2], dim(t[0], t[1]))) months -= 1;
    var years = Math.floor(months / 12);
    var r = { days: days, months: months, years: years };
    if (months < 1) { r.n = days; r.unit = days === 1 ? 'day' : 'days'; r.star = 'bronze'; }
    else if (months < 12) { r.n = months; r.unit = months === 1 ? 'month' : 'months'; r.star = 'silver'; }
    else { r.n = years; r.unit = years === 1 ? 'year' : 'years'; r.star = 'gold'; }
    r.label = r.n === 0 ? 'Day One' : r.n + ' ' + r.unit;
    return r;
  }
  var DAYS = [1, 3, 7, 14, 21];
  function reached(date, now) {
    var c = count(date, now); if (!c) return [];
    var out = [];
    DAYS.forEach(function (d) { if (c.days >= d) out.push('d' + d); });
    for (var m = 1; m <= 11; m++) if (c.months >= m) out.push('m' + m);
    for (var y = 1; y <= c.years; y++) out.push('y' + y);
    return out; // oldest first
  }

  /* ---------- words: shared/sober-words.js, with safe lines while it loads ---------- */
  var FALL = {
    milestones: {
      d1: { head: 'One Day', text: 'One full day. You chose yourself today, and it counts.' },
      d3: { head: 'Three Days', text: 'Three days of showing up for yourself. Your body is already thanking you.' },
      d7: { head: 'One Week', text: 'A whole week of clear mornings and steady choices.' },
      d14: { head: 'Two Weeks', text: 'Two weeks. Every day is building something real.' },
      d21: { head: 'Three Weeks', text: 'Three weeks of growing. Keep tending what is working.' },
      m1: { head: 'One Month', text: 'One month sober. Honor how far you have come, and keep your eyes on today.' },
      m: { head: '{n} Months', text: '{n} months of living sober. Today is still where the good work happens.' },
      y1: { head: 'One Year', text: 'One year sober. A whole year of clear days. Celebrate it well.' },
      y: { head: '{n} Years', text: '{n} years sober. Honor the road behind you, and keep growing today.' }
    },
    daily: [
      { id: 'f1', text: 'Today is the day that matters. Tend it well.' },
      { id: 'f2', text: 'One clear choice at a time is how a strong life grows.' },
      { id: 'f3', text: 'Water, a real meal, and rest. Simple things build steady days.' },
      { id: 'f4', text: 'You are building a life you are fully present for.' },
      { id: 'f5', text: 'Reach out today. Connection is part of the path.' }
    ],
    love: [
      { id: 'fl1', text: 'Tending yourself is a gift to the person you love.' },
      { id: 'fl2', text: 'Their path is theirs. Your peace is yours to grow.' },
      { id: 'fl3', text: 'You can love someone and still keep your own life steady and full.' }
    ]
  };
  function W() { return window.GGSoberWords || {}; }
  function fill(s, n) { return String(s || '').replace(/\{n\}/g, n); }
  function milestoneWords(key) {
    var M = W().milestones || {}, n = +key.slice(1), x = M[key];
    if (!x && key[0] === 'y') x = M.y;
    if (!x) x = FALL.milestones[key] || (key[0] === 'm' ? FALL.milestones.m : key[0] === 'y' ? FALL.milestones.y : null) || FALL.milestones.d1;
    return { head: fill(x.head, n), text: fill(x.text, n) };
  }
  function dayOfYear() { var d = new Date(); return Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(d.getFullYear(), 0, 1)) / 864e5); }
  // Today's encouragement: by days since the sober date when set (the first 90 days in order, then rotating),
  // otherwise by the day of the year. Someone I Love draws from its own words.
  function daily(tree) {
    var g = L(), st = g ? g.soberStage(tree) : '', date = g && g.soberDate ? g.soberDate(tree) : '';
    if (st === 'love') { var lv = (W().love && W().love.length ? W().love : FALL.love); return { kind: 'love', text: lv[dayOfYear() % lv.length].text, id: lv[dayOfYear() % lv.length].id }; }
    var list = W().daily && W().daily.length ? W().daily : FALL.daily, c = date ? count(date) : null;
    var i = (c ? c.days : dayOfYear()) % list.length;
    for (var k = 0; k < list.length; k++) { var x = list[(i + k) % list.length]; if (!st || !Array.isArray(x.stage) || !x.stage.length || x.stage.indexOf(st) >= 0) return { kind: 'daily', text: x.text, id: x.id }; }
    return { kind: 'daily', text: list[i].text, id: list[i].id };
  }
  function mantras() { var m = W().mantras; return (m && m.length ? m : [{ text: 'Just for today.' }, { text: 'This feeling will pass.' }, { text: 'One clear choice at a time.' }]).map(function (x) { return x.text; }); }

  /* ---------- sharing ---------- */
  function toast(msg) {
    if (typeof window.showToast === 'function') { try { window.showToast(msg); return; } catch (e) {} }
    var t = document.createElement('div'); t.className = 'ggs-toast'; t.setAttribute('role', 'status'); t.textContent = msg; document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 3200);
  }
  function share(o) {
    o = Object.assign({ url: SITE }, o);
    var S = window.GGShareCard;
    if (S && typeof S.share === 'function') { try { return Promise.resolve(S.share(o)).catch(function () {}); } catch (e) {} }
    var words = (o.head ? o.head + '. ' : '') + o.text;
    if (navigator.share) return navigator.share({ title: 'Living Sober', text: words, url: o.url }).catch(function () {});
    var done = function () { toast('Copied. Paste it anywhere to share.'); };
    try { return navigator.clipboard.writeText(words + ' ' + o.url).then(done, function () { toast(o.url); }); } catch (e) { toast(o.url); return Promise.resolve(); }
  }

  /* ---------- look and feel (the apps' own colors, Living Sober green, a gold star) ---------- */
  var CSS = '' +
    '.ggs-card{--ls:#4E7D6A;--ls-soft:rgba(78,125,106,.09);margin:18px 0;padding:18px 20px;border:1px solid var(--line,#E2D8C3);border-left:6px solid var(--ls);border-radius:14px;background:var(--card,#fff);color:var(--ink,#2C1810);}' +
    '.ggs-card *{box-sizing:border-box;}' +
    '.ggs-eb{display:flex;align-items:center;gap:8px;margin:0 0 6px;font-family:"Barlow Condensed",sans-serif;font-weight:700;font-size:13px;letter-spacing:1.4px;text-transform:uppercase;color:var(--ls);}' +
    '.ggs-card h3{margin:0 0 6px;font-family:"Cormorant Garamond",Georgia,serif;font-weight:700;font-size:26px;line-height:1.15;color:var(--ink,#2C1810);}' +
    '.ggs-card p{margin:0 0 10px;font-size:15.5px;line-height:1.55;}' +
    '.ggs-soft{color:var(--ink-soft,#6B5A4D);font-size:14.5px !important;}' +
    '.ggs-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:10px 0 0;}' +
    '.ggs-row .btn{margin:0;}' +
    '.ggs-stages{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:8px;margin:10px 0 4px;}' +
    '.ggs-st{display:block;width:100%;min-height:48px;padding:9px 12px;border:1.5px solid var(--line,#E2D8C3);border-radius:10px;background:transparent;color:var(--ink,#2C1810);cursor:pointer;font:15px/1.3 Barlow,system-ui,sans-serif;text-align:left;}' +
    '.ggs-st b{display:block;font-weight:600;}.ggs-st small{display:block;color:var(--ink-soft,#6B5A4D);font-size:13px;}' +
    '.ggs-st:hover,.ggs-st[aria-checked=true]{border-color:var(--ls);}.ggs-st[aria-checked=true]{background:var(--ls-soft);}' +
    '.ggs-count{display:flex;align-items:center;gap:10px;margin:4px 0 10px;font-family:"Cormorant Garamond",Georgia,serif;font-size:22px;font-weight:600;line-height:1.2;}' +
    '.ggs-count small{font-family:Barlow,system-ui,sans-serif;font-size:13.5px;font-weight:400;color:var(--ink-soft,#6B5A4D);}' +
    '.ggs-enc{margin:12px 0 4px;padding:12px 14px;border-radius:12px;background:var(--ls-soft);}' +
    '.ggs-enc b{display:block;font-family:"Barlow Condensed",sans-serif;font-size:12.5px;letter-spacing:1.2px;text-transform:uppercase;color:var(--ls);margin-bottom:2px;}' +
    '.ggs-enc q{display:block;font-family:"Cormorant Garamond",Georgia,serif;font-size:21px;line-height:1.35;font-style:italic;quotes:none;}' +
    '.ggs-link{background:none;border:0;padding:6px 0;min-height:36px;color:var(--ls);font:inherit;font-size:14.5px;text-decoration:underline;cursor:pointer;}' +
    '.ggs-date{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:6px 0 10px;}' +
    '.ggs-date input{min-height:44px;padding:8px 10px;border:1.5px solid var(--line,#E2D8C3);border-radius:10px;background:var(--card,#fff);color:var(--ink,#2C1810);font:15px Barlow,system-ui,sans-serif;color-scheme:light dark;}' +
    '.ggs-card :focus-visible,.ggs-dlg :focus-visible{outline:3px solid var(--ls);outline-offset:2px;}' +
    '.ggs-back{position:fixed;inset:0;z-index:9996;background:rgba(20,16,12,.6);display:flex;align-items:flex-start;justify-content:center;padding:4vh 14px;overflow-y:auto;}' +
    '.ggs-dlg{--ls:#4E7D6A;--ls-soft:rgba(78,125,106,.09);width:min(620px,100%);margin:auto 0;background:var(--bg,#FAF7F2);color:var(--ink,#2C1810);border-radius:20px;box-shadow:0 24px 60px rgba(0,0,0,.3);padding:24px 22px 20px;font:16px/1.5 Barlow,system-ui,sans-serif;}' +
    '.ggs-dlg *{box-sizing:border-box;}' +
    '.ggs-dlg h2{margin:0 0 6px;font-family:"Cormorant Garamond",Georgia,serif;font-weight:700;font-size:30px;line-height:1.1;}' +
    '.ggs-dlg h3{margin:18px 0 6px;font-family:"Cormorant Garamond",Georgia,serif;font-weight:700;font-size:21px;}' +
    '.ggs-dlg p{margin:0 0 10px;}.ggs-dlg label{display:block;font-size:14.5px;}' +
    '.ggs-dlg input[type=text],.ggs-dlg input[type=tel],.ggs-dlg textarea{width:100%;min-height:44px;padding:9px 11px;border:1.5px solid var(--line,#E2D8C3);border-radius:10px;background:var(--card,#fff);color:var(--ink,#2C1810);font:15.5px Barlow,system-ui,sans-serif;}' +
    '.ggs-dlg textarea{min-height:64px;resize:vertical;}' +
    '.ggs-pp{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:0 0 8px;}' +
    '.ggs-ideas{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:6px;}' +
    '.ggs-ideas label{display:flex;gap:10px;align-items:center;min-height:44px;padding:6px 10px;border:1.5px solid var(--line,#E2D8C3);border-radius:10px;cursor:pointer;background:var(--card,#fff);}' +
    '.ggs-ideas input{width:20px;height:20px;accent-color:#4E7D6A;flex:none;}' +
    '.ggs-chips{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 0;}.ggs-chips button{min-height:38px;padding:6px 12px;border-radius:999px;border:1px solid var(--line,#E2D8C3);background:transparent;color:inherit;font:14px Barlow,system-ui,sans-serif;cursor:pointer;}' +
    '.ggs-view ul{margin:0 0 6px;padding-left:20px;}.ggs-view li{margin:3px 0;}.ggs-view a{color:inherit;}' +
    '.ggs-view .ggs-remind{font-family:"Cormorant Garamond",Georgia,serif;font-size:24px;font-style:italic;line-height:1.3;margin:0 0 6px;}' +
    '.ggs-lines{margin-top:16px;padding-top:12px;border-top:1px solid var(--line,#E2D8C3);font-size:14.5px;}.ggs-lines p{margin:0 0 6px;}' +
    '.ggs-foot{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end;align-items:center;margin-top:18px;}.ggs-foot .ggs-link{margin-right:auto;}' +
    '.ggs-dlg .btn{margin:0;}' +
    '.ggs-ms{text-align:center;}' +
    '.ggs-ms svg{display:block;margin:0 auto 6px;width:150px;height:150px;}' +
    '.ggs-ms .ggs-cnt{font-family:"Barlow Condensed",sans-serif;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:var(--ls);font-size:15px;margin:0 0 2px;}' +
    '.ggs-ms .ggs-foot{justify-content:center;}' +
    '.ggs-star-in{transform-origin:75px 62px;animation:ggsStar .9s cubic-bezier(.2,.8,.3,1.2) both;}' +
    '.ggs-rib{transform-origin:75px 80px;animation:ggsRib .7s .35s ease-out both;}' +
    '.ggs-spark{animation:ggsSpark 1.6s .6s ease-out both;}' +
    '@keyframes ggsStar{from{transform:scale(.2) rotate(-40deg);opacity:0;}to{transform:none;opacity:1;}}' +
    '@keyframes ggsRib{from{transform:scaleY(0);opacity:0;}to{transform:none;opacity:1;}}' +
    '@keyframes ggsSpark{0%{opacity:0;}40%{opacity:1;}100%{opacity:.55;}}' +
    '.ggs-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:9999;max-width:calc(100% - 32px);padding:10px 16px;border-radius:12px;background:#2E2118;color:#F6EFE2;font:15px Barlow,system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.25);}' +
    '.ggs-today{margin:12px 0 4px;padding:12px 14px;border:1px solid var(--line,#E2D8C3);border-radius:12px;}.ggs-today b{display:block;font-family:"Barlow Condensed",sans-serif;font-size:12.5px;letter-spacing:1.2px;text-transform:uppercase;color:var(--ls);margin-bottom:2px;}' +
    '.ggs-card .ggs-intent{font-family:"Cormorant Garamond",Georgia,serif;font-size:22px;line-height:1.3;margin:0 0 4px !important;}' +
    '.ggs-pick{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 6px;}.ggs-pick button{min-width:44px;min-height:44px;padding:6px 12px;border-radius:10px;border:1.5px solid var(--line,#E2D8C3);background:var(--card,#fff);color:inherit;font:15px Barlow,system-ui,sans-serif;cursor:pointer;}.ggs-pick button[aria-checked=true]{border-color:var(--ls);background:var(--ls-soft);font-weight:600;}' +
    '.ggs-list{margin:0 0 6px;padding-left:20px;}.ggs-list li{margin:3px 0;}' +
    '.ggs-tw{overflow-x:auto;}.ggs-tbl{border-collapse:collapse;width:100%;font-size:14px;}.ggs-tbl th,.ggs-tbl td{padding:6px 8px;border-bottom:1px solid var(--line,#E2D8C3);text-align:left;vertical-align:top;}' +
    '.ggs-meds{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:6px;}.ggs-med{display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 4px;border:1px solid var(--line,#E2D8C3);border-radius:12px;background:transparent;color:inherit;font:13.5px Barlow,system-ui,sans-serif;cursor:pointer;}.ggs-med[disabled]{opacity:.45;cursor:default;}.ggs-med.got{border-color:var(--ls);}' +
    '.ggs-kept b{font-family:"Cormorant Garamond",Georgia,serif;font-size:30px;color:var(--ls);}' +
    '.ggs-body{margin:0;padding-left:20px;}.ggs-body li{margin:6px 0;opacity:.7;}.ggs-body li.got{opacity:1;}.ggs-body li.got b{color:var(--ls);}' +
    '.ggs-src{font-size:13px !important;color:var(--ink-soft,#6B5A4D);}.ggs-src a{color:inherit;}' +
    '.ggs-plans{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px;}.ggs-toastline{font-family:"Cormorant Garamond",Georgia,serif;font-size:21px;font-style:italic;}' +
    '@media (max-width:520px){.ggs-card{padding:16px 14px;}.ggs-pp{grid-template-columns:1fr;}.ggs-dlg{padding:20px 16px 16px;}.ggs-stages{grid-template-columns:1fr;}}' +
    '@media (prefers-reduced-motion: reduce){.ggs-star-in,.ggs-rib,.ggs-spark{animation:none;}}' +
    '@media print{.ggs-card{display:none;}}';
  var DARK = '.ggs-card,.ggs-dlg{--ls:#8DBCA8;--ls-soft:rgba(141,188,168,.12);}';
  function addCSS() {
    if (document.getElementById('ggs-css')) return;
    var s = document.createElement('style'); s.id = 'ggs-css';
    s.textContent = CSS + '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) ' + DARK.replace(',', ',:root:not([data-theme="light"]) ') + '}' + ':root[data-theme="dark"] ' + DARK.replace(',', ',:root[data-theme="dark"] ');
    (document.head || document.documentElement).appendChild(s);
  }
  var STAR_C = { bronze: ['#B0723A', '#8A5426'], silver: ['#A9B2BC', '#7D8792'], gold: ['#D9A847', '#A87A22'] };
  var STAR_PTS = (function () { var p = []; for (var i = 0; i < 10; i++) { var r = i % 2 ? 0.42 : 1, a = Math.PI / 2 + i * Math.PI / 5; p.push([Math.cos(a) * r, -Math.sin(a) * r]); } return p; })();
  function starPath(cx, cy, R) { return 'M' + STAR_PTS.map(function (q) { return (cx + q[0] * R).toFixed(1) + ' ' + (cy + q[1] * R).toFixed(1); }).join('L') + 'Z'; }
  function starSvg(kind, size, label) {
    var c = STAR_C[kind] || STAR_C.gold;
    return '<svg viewBox="0 0 24 24" width="' + (size || 22) + '" height="' + (size || 22) + '" role="img" aria-label="' + esc(label || (kind + ' star')) + '"><path d="' + starPath(12, 12.6, 11) + '" fill="' + c[0] + '" stroke="' + c[1] + '" stroke-width="1" stroke-linejoin="round"/></svg>';
  }
  // The milestone mark: a star on a ribbon, with a few sparks.
  function bigStar(kind) {
    var c = STAR_C[kind] || STAR_C.gold;
    return '<svg viewBox="0 0 150 150" aria-hidden="true">' +
      '<g class="ggs-rib"><path d="M54 84 L40 140 L58 128 L66 146 L76 92 Z" fill="#4E7D6A"/><path d="M96 84 L110 140 L92 128 L84 146 L74 92 Z" fill="#3E6656"/></g>' +
      '<g class="ggs-star-in"><circle cx="75" cy="62" r="46" fill="' + c[0] + '" opacity=".16"/><path d="' + starPath(75, 64, 44) + '" fill="' + c[0] + '" stroke="' + c[1] + '" stroke-width="2.5" stroke-linejoin="round"/></g>' +
      '<g class="ggs-spark" fill="#D9A847"><circle cx="18" cy="34" r="3"/><circle cx="132" cy="26" r="3.5"/><circle cx="138" cy="84" r="2.5"/><circle cx="12" cy="92" r="2.5"/><circle cx="104" cy="8" r="2"/></g></svg>';
  }

  /* ---------- whose card ---------- */
  var APP = { tree: null, opts: {}, guestCarry: null, startIds: null, pending: null, note: '', dateOpen: false, stageOpen: false };
  function isHelper() { var g = L(); try { return !!((APP.opts.helper && APP.opts.helper()) || (g && g.helperView && g.helperView())); } catch (e) { return false; } }
  function activeAdult() { var a = window.GGP && GGP.active && GGP.active(); return a && a.age === 'adult' ? a : null; }
  function isGuest() { var g = L(); return !(g && g.who && g.who()); }
  function adultsHere() { try { return window.GGP ? GGP.list().filter(function (p) { return p.age === 'adult'; }).length : 0; } catch (e) { return 0; } }

  /* ---------- the card ---------- */
  function stageButtons(tree, cur) {
    var g = L();
    return '<div class="ggs-stages" role="radiogroup" aria-label="Where are you right now?">' + g.STAGES.filter(function (x) { return g.stages(tree).indexOf(x.id) >= 0; }).map(function (x) {
      return '<button type="button" class="ggs-st" role="radio" data-ggs="stage" data-id="' + x.id + '" aria-checked="' + (cur === x.id) + '"><b>' + esc(x.name) + '</b><small>' + esc(x.line) + '</small></button>';
    }).join('') + '</div>';
  }
  function guestHtml() {
    if (!isGuest()) return '';
    var n = adultsHere();
    return '<p class="ggs-soft">Kept for this visit only. ' + (n ? 'Open your profile' : 'Create a profile') + ' to keep Living Sober, your sober date, and your Anchor Plan, locked on this device.</p>' +
      '<div class="ggs-row">' + (n ? '<button type="button" class="btn btn-secondary btn-sm" data-ggs="openprof">Open My Profile</button>' : '') + '<button type="button" class="btn btn-secondary btn-sm" data-ggs="create">Create a Profile</button></div>';
  }
  function cardHtml(tree, where) {
    var g = L(); if (!g || TREES.indexOf(tree) < 0 || isHelper()) return '';
    addCSS();
    var on = g.sober(tree), st = g.soberStage(tree);
    var head = '<div class="ggs-card no-print" data-ggs-card="' + esc(tree) + '" data-where="' + esc(where || 'ring') + '" role="region" aria-label="Living Sober">' +
      '<p class="ggs-eb">' + starSvg('gold', 16, '') + 'Living Sober</p>';
    if (!on) {
      return head + '<h3>Open Living Sober</h3>' +
        '<p>Grounded stands for living alcohol-free and free of harmful drugs: a clear mind, a healthy body, and a life you are fully present for. Living Sober keeps guides, encouragement, and a plan for hard moments close at hand, for wherever you are.</p>' +
        '<div class="ggs-row"><button type="button" class="btn btn-primary btn-sm" data-ggs="on">Open Living Sober</button></div>' +
        '<p class="ggs-soft" style="margin-top:12px">Or choose where you are right now. It stays private, locked on this device.</p>' + stageButtons(tree, '') + guestHtml() + '</div>';
    }
    var stage = g.STAGES.filter(function (x) { return x.id === st; })[0];
    var date = g.soberDate(tree), c = date ? count(date) : null, love = st === 'love';
    var enc = daily(tree);
    var html = head + '<h3>' + (stage ? esc(stage.name) : 'Living Sober') + '</h3>';
    if (!stage) html += '<p>Where are you right now? Choosing a stage puts its guides first. It stays private.</p>' + stageButtons(tree, '');
    else if (APP.stageOpen) html += stageButtons(tree, st) + '<div class="ggs-row"><button type="button" class="ggs-link" data-ggs="stagedone">Done</button></div>';
    // The count, shown lightly: one star and one number.
    if (c && !love) {
      html += '<p class="ggs-count">' + starSvg(c.star, 26, c.star + ' star') + '<span>' + esc(c.label) + ' <small>sober</small></span></p>';
    }
    if (!love) {
      if (APP.dateOpen) html += '<div class="ggs-date"><label for="ggs-date-in" class="ggs-soft" style="flex-basis:100%">My sober date. It stays locked on this device; only the count shows.</label><input id="ggs-date-in" type="date" data-ggs="date" max="' + todayStr() + '" min="1900-01-01" value="' + esc(date) + '"><button type="button" class="btn btn-secondary btn-sm" data-ggs="datedone">Done</button>' + (date ? '<button type="button" class="ggs-link" data-ggs="nodate">Clear the Date</button>' : '') + '</div>';
    }
    if (!love) html += todayHtml(tree);
    html += '<div class="ggs-enc"><b>' + (love ? 'For You Today' : 'Today\'s Encouragement') + '</b><q>' + esc(enc.text) + '</q><div class="ggs-row"><button type="button" class="btn btn-secondary btn-sm" data-ggs="share-daily">Share</button></div></div>';
    if (!love) html += '<div class="ggs-row"><button type="button" class="btn btn-primary btn-sm ggs-wave" data-ggs="wave">Ride the Wave</button><button type="button" class="btn btn-secondary btn-sm" data-ggs="week">My Week</button><button type="button" class="btn btn-secondary btn-sm" data-ggs="gains">Milestones and Gains</button><button type="button" class="btn btn-secondary btn-sm" data-ggs="good">Good Times, Sober</button></div>';
    html += '<div class="ggs-row"><button type="button" class="btn btn-primary btn-sm" data-ggs="anchor">My Anchor Plan</button>' +
      '<button type="button" class="btn btn-secondary btn-sm" data-ggs="thirty">' + esc(thirtyLabel(tree)) + '</button></div>';
    html += '<div class="ggs-row">' + (stage ? '<button type="button" class="ggs-link" data-ggs="stagechange">Change My Stage</button>' : '') +
      (!love && !APP.dateOpen ? '<button type="button" class="ggs-link" data-ggs="dateopen">' + (date ? 'Change My Sober Date' : 'Add My Sober Date') + '</button>' : '') + '</div>';
    return html + guestHtml() + (APP.note ? '<p class="ggs-soft" role="status">' + esc(APP.note) + '</p>' : '') + '</div>';
  }
  function thirtyLabel(tree) {
    var S = window.GGSober30, n = next30(tree);
    var c = S && S.count ? S.count : 90;
    return S && n > 1 ? 'Early Days: Day ' + n + ' of ' + c : 'Early Days: ' + c + ' Days';
  }
  function next30(tree) {
    var S = window.GGSober30; if (!S || !S.lessons) return 1;
    for (var i = 0; i < S.lessons.length; i++) { var l = S.lessons[i]; if (!(window.GGLearn && GGLearn.watched && GGLearn.watched(tree, l.id))) return l.n || i + 1; }
    return 1;
  }
  function refresh() {
    document.querySelectorAll('[data-ggs-card]').forEach(function (el) {
      var t = el.getAttribute('data-ggs-card'), w = el.getAttribute('data-where'), a = document.activeElement, key = a && el.contains(a) ? a.getAttribute('data-ggs') : null, id = a && a.getAttribute('data-id');
      var h = cardHtml(t, w); if (!h) { el.remove(); return; }
      var tmp = document.createElement('div'); tmp.innerHTML = h; var nu = tmp.firstChild; el.replaceWith(nu);
      if (key) { var f = nu.querySelector('[data-ggs="' + key + '"]' + (id ? '[data-id="' + id + '"]' : '')) || nu.querySelector('[data-ggs]'); if (f) try { f.focus({ preventScroll: true }); } catch (e) {} }
    });
  }
  function save(patch, note) {
    var g = L(); APP.note = note || '';
    return g.set(patch).then(function () { refresh(); }, function (e) { APP.note = e && e.message ? e.message : 'Try saving once more.'; refresh(); });
  }
  function turnOn(stage) {
    var g = L(), c = g.get(), ids = c.ids.slice(); if (ids.indexOf('sober') < 0) ids.push('sober');
    var p = { ids: ids, none: false, rather: false }; if (stage) p.sober = stage;
    return save(p, isGuest() ? '' : 'Living Sober is on, locked in your profile.');
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-ggs]'); if (!b || !b.closest('[data-ggs-card]')) return;
    var card = b.closest('[data-ggs-card]'), tree = card.getAttribute('data-ggs-card'), k = b.getAttribute('data-ggs'), g = L(); if (!g) return;
    if (k === 'on') turnOn('');
    else if (k === 'stage') { APP.stageOpen = false; if (!g.sober(tree)) turnOn(b.getAttribute('data-id')); else save({ sober: b.getAttribute('data-id') }); }
    else if (k === 'stagechange') { APP.stageOpen = true; refresh(); var f = document.querySelector('[data-ggs-card] .ggs-st[aria-checked=true]') || document.querySelector('[data-ggs-card] .ggs-st'); if (f) f.focus(); }
    else if (k === 'stagedone') { APP.stageOpen = false; refresh(); }
    else if (k === 'dateopen') { APP.dateOpen = true; refresh(); var d = document.querySelector('[data-ggs-card] [data-ggs="date"]'); if (d) d.focus(); }
    else if (k === 'datedone') { APP.dateOpen = false; refresh(); }
    else if (k === 'nodate') { APP.dateOpen = false; save({ soberDate: '' }); }
    else if (k === 'share-daily') { var x = daily(tree); share({ kind: x.kind, head: x.kind === 'love' ? 'For You Today' : 'Today\'s Encouragement', text: x.text, star: null, count: null }); }
    else if (k === 'anchor') anchorDlg(tree, false);
    else if (k === 'intent') intentDlg(tree);
    else if (k === 'look') lookDlg(tree);
    else if (k === 'wave') waveDlg(tree);
    else if (k === 'week') weekDlg(tree);
    else if (k === 'gains') gainsDlg(tree);
    else if (k === 'good') goodDlg(tree, '');
    else if (k === 'thirty') open30(tree);
    else if (k === 'create') { if (APP.opts.create) APP.opts.create(); }
    else if (k === 'openprof') { if (APP.opts.openProfile) APP.opts.openProfile(); }
  });
  document.addEventListener('change', function (e) {
    var d = e.target.closest && e.target.closest('[data-ggs="date"]'); if (!d || !d.closest('[data-ggs-card]')) return;
    var g = L(); if (!g) return;
    if (d.value && !g.okDate(d.value)) { APP.note = 'Choose a day up to today.'; refresh(); return; }
    if (!d.value) return;
    APP.dateOpen = false;
    save({ soberDate: d.value }, 'Saved, locked on this device.');
  });

  /* ---------- Early Days: 30 Days (shared/sober-30.js) ---------- */
  function open30(tree) {
    need30().then(function () {
      var S = window.GGSober30;
      if (!S) { toast('Early Days is on its way. Check back soon.'); return; }
      var n = next30(tree), l = S.lesson ? S.lesson(n) : (S.lessons || [])[n - 1];
      if (window.GGLearn && GGLearn.open && l) GGLearn.open(tree, l.id);
      else if (S.open) S.open(n, { app: tree });
    });
  }

  /* ---------- Living Sober Every Day (GWG BLD 850): the daily companion ----------
     A morning intention, an evening look back (urge, mood, sleep, what helped), Ride the Wave (Brian, ten minutes),
     My Week, Milestones and Gains (medallions, money kept, what the body regains), and Good Times, Sober (plans for
     unwinding, celebrating, letting loose, and big days). Everything saves through GGLife.days / setDay / setCost:
     locked in the vault, or for this visit only for a guest. Words and plans come from shared/sober-more.js. */
  var MOOD = ['Heavy', 'Low', 'Okay', 'Good', 'Bright'], SLEEP = ['Rough', 'Light', 'Okay', 'Good', 'Deep'];
  var HELP = [['water', 'Water'], ['food', 'A real meal'], ['walk', 'A walk'], ['move', 'Movement'], ['outside', 'Time outside'], ['shower', 'A warm shower'],
    ['music', 'Music'], ['rest', 'Rest'], ['people', 'My good people'], ['family', 'Family'], ['quiet', 'Quiet time'], ['write', 'Writing it out'],
    ['wave', 'Riding the wave'], ['plan', 'My Anchor Plan'], ['hobby', 'A hobby'], ['early', 'Early to bed']];
  var HELPN = {}; HELP.forEach(function (x) { HELPN[x[0]] = x[1]; });
  var INTENTS = ['Water first', 'Move my body', 'Get outside', 'Eat real meals', 'Call a good friend', 'Be present', 'Early to bed', 'Ride every wave', 'Kind to myself', 'Make something'];
  function M() { return window.GGSoberMore || {}; }
  function addDays(d, n) { var p = parts(d), x = new Date(p[0], p[1] - 1, p[2] + n); return x.getFullYear() + '-' + pad(x.getMonth() + 1) + '-' + pad(x.getDate()); }
  function dayLog(tree, d) { var g = L(); return g && g.days ? (g.days().log[d || todayStr()] || {}) : {}; }
  function setDay(patch, d) { var g = L(); if (!g || !g.setDay) return Promise.resolve(); return g.setDay(d || todayStr(), patch).then(function () { refresh(); }, function (e) { toast(e && e.message ? e.message : 'Try saving once more.'); }); }
  function todayHtml(tree) {
    var t = dayLog(tree), looked = t.u != null || t.m || t.s;
    return '<div class="ggs-today"><b>Today</b>' +
      (t.i ? '<p class="ggs-intent">' + esc(t.i) + '</p>' : '<p class="ggs-soft">Start the day with one intention.</p>') +
      '<div class="ggs-row" style="margin-top:4px"><button type="button" class="btn btn-secondary btn-sm" data-ggs="intent">' + (t.i ? 'Change My Intention' : 'Set Today\'s Intention') + '</button>' +
      '<button type="button" class="btn btn-secondary btn-sm" data-ggs="look">' + (looked ? 'Evening Look Back: Done' : 'Evening Look Back') + '</button>' +
      (t.w ? '<span class="ggs-soft">' + t.w + (t.w === 1 ? ' wave ridden today' : ' waves ridden today') + '</span>' : '') + '</div></div>';
  }
  function choiceRow(name, list, cur, first) {
    return '<div class="ggs-pick" role="radiogroup" aria-label="' + esc(name) + '">' + list.map(function (x, i) {
      var v = x[0], lab = x[1]; return '<button type="button" role="radio" aria-checked="' + (String(cur) === String(v)) + '" data-pick="' + esc(name) + '" data-v="' + esc(v) + '"' + (first && i === 0 ? ' data-first' : '') + '>' + esc(lab) + '</button>';
    }).join('') + '</div>';
  }
  function pickable(box) {
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-pick]'); if (!b) return;
      b.parentNode.querySelectorAll('[data-pick]').forEach(function (x) { x.setAttribute('aria-checked', String(x === b && x.getAttribute('aria-checked') !== 'true')); });
    });
  }
  function picked(box, name) { var b = box.querySelector('[data-pick="' + name + '"][aria-checked=true]'); return b ? b.getAttribute('data-v') : null; }
  function intentDlg(tree) {
    var t = dayLog(tree);
    dialog('Today\'s Intention', '<p class="ggs-eb">' + starSvg('gold', 16, '') + 'Living Sober</p><h2>Today\'s Intention</h2><p class="ggs-soft">One simple aim for today. Tap one, or write your own.</p>' +
      '<div class="ggs-chips">' + INTENTS.map(function (x) { return '<button type="button" data-it="' + esc(x) + '">' + esc(x) + '</button>'; }).join('') + '</div>' +
      '<label style="margin-top:12px" for="ggs-it">My intention</label><input type="text" id="ggs-it" maxlength="160" value="' + esc(t.i || '') + '" data-first>' +
      '<div class="ggs-foot">' + (t.i ? '<button type="button" class="ggs-link" data-dd="clear">Clear</button>' : '') + '<button type="button" class="btn btn-secondary" data-dd="close">Close</button><button type="button" class="btn btn-primary" data-dd="save">Save</button></div>', function (d) {
      d.box.setAttribute('data-ggs-intent', tree);
      d.box.addEventListener('click', function (e) {
        var c = e.target.closest('[data-it]'); if (c) { var i = d.box.querySelector('#ggs-it'); i.value = c.getAttribute('data-it'); i.focus(); return; }
        var b = e.target.closest('[data-dd]'); if (!b) return; var k = b.getAttribute('data-dd');
        if (k === 'close') d.close();
        else if (k === 'clear') setDay({ i: null }).then(d.close);
        else { var v = d.box.querySelector('#ggs-it').value.trim(); if (!v) { d.box.querySelector('#ggs-it').focus(); return; } setDay({ i: v }).then(function () { d.close(); toast('Saved. Have a good day.'); }); }
      });
    });
  }
  function lookDlg(tree) {
    var t = dayLog(tree), u = [];
    for (var i = 0; i <= 10; i++) u.push([i, String(i)]);
    dialog('Evening Look Back', '<p class="ggs-eb">' + starSvg('gold', 16, '') + 'Living Sober</p><h2>Evening Look Back</h2><p class="ggs-soft">A minute to notice today. It stays locked on this device.</p>' +
      (t.i ? '<p>Today\'s intention: <b>' + esc(t.i) + '</b></p>' : '') +
      '<h3>The strongest urge today</h3><p class="ggs-soft">0 is calm, 10 is a big wave.</p>' + choiceRow('u', u, t.u, true) +
      '<h3>Mood</h3>' + choiceRow('m', MOOD.map(function (x, i) { return [i + 1, x]; }), t.m) +
      '<h3>Last night\'s sleep</h3>' + choiceRow('s', SLEEP.map(function (x, i) { return [i + 1, x]; }), t.s) +
      '<h3>What helped today</h3><div class="ggs-ideas">' + HELP.map(function (x) { return '<label><input type="checkbox" name="h" value="' + x[0] + '"' + ((t.h || []).indexOf(x[0]) >= 0 ? ' checked' : '') + '> ' + esc(x[1]) + '</label>'; }).join('') + '</div>' +
      '<label style="margin-top:10px" for="ggs-ho">In my own words (optional)</label><input type="text" id="ggs-ho" maxlength="200" value="' + esc(t.ho || '') + '">' +
      '<div class="ggs-foot"><button type="button" class="btn btn-secondary" data-dd="close">Close</button><button type="button" class="btn btn-primary" data-dd="save">Save</button></div>', function (d) {
      d.box.setAttribute('data-ggs-look', tree); pickable(d.box);
      d.box.addEventListener('click', function (e) {
        var b = e.target.closest('[data-dd]'); if (!b) return;
        if (b.getAttribute('data-dd') === 'close') { d.close(); return; }
        var h = []; d.box.querySelectorAll('input[name=h]:checked').forEach(function (x) { h.push(x.value); });
        var uu = picked(d.box, 'u'), mm = picked(d.box, 'm'), ss = picked(d.box, 's');
        setDay({ u: uu === null ? null : +uu, m: mm === null ? null : +mm, s: ss === null ? null : +ss, h: h, ho: d.box.querySelector('#ggs-ho').value }).then(function () { d.close(); toast('Saved. Rest well tonight.'); });
      });
    });
  }
  function openWave(tree) {
    need30().then(function () {
      var S = window.GGSober30;
      if (!S || !S.open || !S.wave) { toast('Ride the Wave is on its way. Check back soon.'); return; }
      S.open('wave', { app: tree, onEnd: function (b) { if (b !== 'back') return; } , onDone: function () { var t = dayLog(tree); setDay({ w: (t.w || 0) + 1 }); toast('You rode it. Well done.'); } });
    });
  }
  function waveDlg(tree) {
    var g = L(), a = g && g.anchor ? g.anchor() : null, ppl = a && a.people ? a.people.filter(function (p) { return p.name || p.num; }) : [];
    dialog('Ride the Wave', '<p class="ggs-eb">' + starSvg('gold', 16, '') + 'Living Sober</p><h2>Ride the Wave</h2>' +
      '<p>An urge is a wave. It rises, peaks, and passes, often within fifteen to thirty minutes. You can ride it out.</p>' +
      '<div class="ggs-row"><button type="button" class="btn btn-primary" data-dd="play" data-first>Ride It With Me, 10 Minutes</button><button type="button" class="btn btn-secondary" data-dd="rode">I Rode It Out</button></div>' +
      '<h3>Play the Tape Forward</h3><p class="ggs-soft">Picture tonight and tomorrow morning both ways. Which morning do you want to wake up to?</p>' +
      '<h3>One Kind Next Step</h3><ul class="ggs-list"><li>A tall glass of water</li><li>A walk outside, ten minutes</li><li>A warm shower</li><li>Something good to eat</li><li>Text one of your good people</li></ul>' +
      (ppl.length ? '<h3>My Good People</h3><ul class="ggs-list">' + ppl.map(function (p) { var h = telHref(p.num); return '<li>' + esc(p.name || p.num) + (h ? ' <a href="' + esc(h) + '">' + esc(p.num) + '</a>' : '') + '</li>'; }).join('') + '</ul>' : '<p class="ggs-soft">Add your good people in My Anchor Plan, and they show here.</p>') +
      '<div class="ggs-foot"><button type="button" class="btn btn-secondary" data-dd="anchor">My Anchor Plan</button><button type="button" class="btn btn-secondary" data-dd="close">Close</button></div>', function (d) {
      d.box.setAttribute('data-ggs-wave', tree);
      d.box.addEventListener('click', function (e) {
        var b = e.target.closest('[data-dd]'); if (!b) return; var k = b.getAttribute('data-dd');
        if (k === 'close') d.close();
        else if (k === 'anchor') { d.close(); anchorDlg(tree, false); }
        else if (k === 'rode') { var t = dayLog(tree); setDay({ w: (t.w || 0) + 1 }).then(function () { d.close(); toast('You rode it. Well done.'); }); }
        else if (k === 'play') { d.close(); openWave(tree); }
      });
    });
  }
  function weekDlg(tree) {
    var g = L(), all = g && g.days ? g.days() : { log: {} }, today = todayStr(), rows = [], tally = {}, us = [];
    for (var i = 6; i >= 0; i--) {
      var d = addDays(today, -i), x = all.log[d] || {}, p = parts(d), nm = new Date(p[0], p[1] - 1, p[2]).toLocaleDateString(undefined, { weekday: 'short' });
      (x.h || []).forEach(function (h) { tally[h] = (tally[h] || 0) + 1; }); if (x.u != null) us.push(x.u);
      rows.push('<tr><th>' + esc(i === 0 ? 'Today' : nm) + '</th><td>' + (x.i ? esc(x.i) : '') + '</td><td>' + (x.u != null ? esc(x.u) : '') + '</td><td>' + (x.m ? esc(MOOD[x.m - 1]) : '') + '</td><td>' + (x.s ? esc(SLEEP[x.s - 1]) : '') + '</td><td>' + (x.w ? esc(x.w) : '') + '</td></tr>');
    }
    var top = Object.keys(tally).sort(function (a, b) { return tally[b] - tally[a]; }).slice(0, 3);
    var waves = Object.keys(all.log).filter(function (k) { return k >= addDays(today, -6); }).reduce(function (a, k) { return a + (all.log[k].w || 0); }, 0);
    dialog('My Week', '<p class="ggs-eb">' + starSvg('gold', 16, '') + 'Living Sober</p><h2>My Week</h2>' +
      (top.length ? '<p><b>What helped most:</b> ' + top.map(function (h) { return esc(HELPN[h] || h) + ' (' + tally[h] + ')'; }).join(', ') + '</p>' : '<p class="ggs-soft">Your evening look backs fill this in, day by day.</p>') +
      (waves ? '<p><b>Waves ridden this week:</b> ' + waves + '. Each one is strength you are building.</p>' : '') +
      (us.length > 1 ? '<p><b>Urges:</b> from ' + us[0] + ' to ' + us[us.length - 1] + ' across the week.</p>' : '') +
      '<div class="ggs-tw"><table class="ggs-tbl"><thead><tr><th>Day</th><th>Intention</th><th>Urge</th><th>Mood</th><th>Sleep</th><th>Waves</th></tr></thead><tbody>' + rows.join('') + '</tbody></table></div>' +
      '<div class="ggs-foot"><button type="button" class="ggs-link" data-dd="clear">Clear My Days</button><button type="button" class="btn btn-primary" data-dd="close" data-first>Close</button></div>', function (d) {
      d.box.setAttribute('data-ggs-week', tree);
      d.box.addEventListener('click', function (e) {
        var b = e.target.closest('[data-dd]'); if (!b) return;
        if (b.getAttribute('data-dd') === 'close') d.close();
        else { if (!confirm('Clear every day you have saved? It is erased from this device.')) return; L().clearDays().then(function () { d.close(); refresh(); toast('Cleared.'); }); }
      });
    });
  }
  // Medallions: days 1, 3, 7, 14, 21, 30, 60, 90, six months, one year, then every year.
  var MEDS = [[1, '1 Day'], [3, '3 Days'], [7, '1 Week'], [14, '2 Weeks'], [21, '3 Weeks'], [30, '30 Days'], [60, '60 Days'], [90, '90 Days'], [182, '6 Months'], [365, '1 Year']];
  function medals(days) {
    var out = MEDS.map(function (x) { return { n: x[0], label: x[1], star: x[0] < 30 ? 'bronze' : x[0] < 365 ? 'silver' : 'gold', got: days >= x[0] }; });
    for (var y = 2; y <= Math.max(2, Math.floor(days / 365) + 1); y++) out.push({ n: y * 365, label: y + ' Years', star: 'gold', got: days >= y * 365 });
    return out;
  }
  function money(n) { return '$' + Math.round(n).toLocaleString(); }
  function gainsDlg(tree) {
    needMore().then(function () {
      var g = L(), date = g.soberDate(tree), c = date ? count(date) : null, days = c ? c.days + 1 : 0, all = g.days ? g.days() : { cost: 0 }, B = M().body || {}, Mo = M().money || {};
      var meds = medals(days), kept = all.cost ? all.cost * days / 7 : 0;
      var body = (B.milestones || []).map(function (x) {
        var need = { d1: 1, d3: 3, d7: 7, d14: 14, m1: 30, m3: 90, m6: 182, y1: 365 }[x.key] || 0, got = days >= need && days > 0;
        return '<li class="' + (got ? 'got' : '') + '"><b>' + esc(x.title) + '</b> ' + esc(x.text) + '</li>';
      }).join('');
      var html = '<p class="ggs-eb">' + starSvg('gold', 16, '') + 'Living Sober</p><h2>Milestones and Gains</h2>' +
        (date ? '<p>' + esc(c.label) + ' sober. Every day counts.</p>' : '<p class="ggs-soft">Add your sober date on the card, and your medallions and gains fill in.</p>') +
        '<h3>Medallions</h3><div class="ggs-meds">' + meds.map(function (m) { return '<button type="button" class="ggs-med' + (m.got ? ' got' : '') + '" data-med="' + m.n + '"' + (m.got ? '' : ' disabled') + ' aria-label="' + esc(m.label + (m.got ? ', reached. Share it.' : ', ahead')) + '">' + starSvg(m.got ? m.star : 'silver', 34, '') + '<span>' + esc(m.label) + '</span></button>'; }).join('') + '</div>' +
        '<h3>Money Kept</h3><p class="ggs-soft">' + esc(Mo.ask || 'In a typical week, about how much did drinking cost?') + '</p>' +
        '<div class="ggs-date"><label for="ggs-cost" class="ggs-soft" style="flex-basis:100%">' + esc(Mo.help || 'Count drinks, rides, takeout, and the rest. A rough number is fine.') + '</label><span>$</span><input id="ggs-cost" type="number" inputmode="decimal" min="0" step="1" value="' + (all.cost || '') + '" style="max-width:140px"><button type="button" class="btn btn-secondary btn-sm" data-dd="cost">Save</button></div>' +
        (kept ? '<p class="ggs-kept"><b>' + money(kept) + '</b> kept so far' + (days >= 7 ? ', about ' + money(all.cost * 52) + ' a year.' : '.') + '</p>' : '') +
        (kept && (Mo.ideas || []).length ? '<p class="ggs-soft">Ideas for it: ' + Mo.ideas.map(esc).join('; ') + '.</p>' : '') +
        '<h3>' + esc(B.title || 'What Your Body Regains') + '</h3><ul class="ggs-body">' + body + '</ul>' + (B.note ? '<p class="ggs-soft">' + esc(B.note) + '</p>' : '') +
        (B.credits && B.credits.length ? '<p class="ggs-src">Sources: ' + B.credits.map(function (x) { return x[1] ? '<a href="' + esc(x[1]) + '" target="_blank" rel="noopener">' + esc(x[0]) + '</a>' : esc(x[0]); }).join('; ') + '</p>' : '') +
        '<div class="ggs-foot"><button type="button" class="btn btn-primary" data-dd="close" data-first>Close</button></div>';
      dialog('Milestones and Gains', html, function (d) {
        d.box.setAttribute('data-ggs-gains', tree);
        d.box.addEventListener('click', function (e) {
          var m = e.target.closest('[data-med]'); if (m && !m.disabled) { var x = meds.filter(function (q) { return String(q.n) === m.getAttribute('data-med'); })[0]; needShare(); share({ kind: 'milestone', head: x.label + ' Sober', text: 'One day at a time, and here I am.', star: x.star, count: x.label }); return; }
          var b = e.target.closest('[data-dd]'); if (!b) return;
          if (b.getAttribute('data-dd') === 'close') d.close();
          else { var v = d.box.querySelector('#ggs-cost').value; g.setCost(+v || 0).then(function () { d.close(); gainsDlg(tree); }); }
        });
      });
    });
  }
  function goodDlg(tree, id) {
    needMore().then(function () {
      var G = M().goodtimes || { plans: [] }, P2 = (G.plans || []).filter(function (x) { return x.id === id; })[0];
      var list = function (t, a) { return a && a.length ? '<h3>' + esc(t) + '</h3><ul class="ggs-list">' + a.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : ''; };
      var html = '<p class="ggs-eb">' + starSvg('gold', 16, '') + 'Living Sober</p>';
      if (!P2) html += '<h2>' + esc(G.title || 'Good Times, Sober') + '</h2><p>' + esc(G.intro || '') + '</p><div class="ggs-plans">' + (G.plans || []).map(function (x, i) { return '<button type="button" class="ggs-st" data-gt="' + esc(x.id) + '"' + (i === 0 ? ' data-first' : '') + '><b>' + esc(x.title) + '</b><small>' + esc(x.line || '') + '</small></button>'; }).join('') + '</div>' +
        '<div class="ggs-foot"><button type="button" class="btn btn-primary" data-dd="close">Close</button></div>';
      else html += '<h2>' + esc(P2.title) + '</h2><p>' + esc(P2.line || '') + '</p>' + list('Before You Go', P2.before) + list('When Someone Offers a Drink', P2.say) + list('Great Instead', P2.instead) + list('An Easy Exit', P2.exit) +
        (P2.toast ? '<h3>A Sober Toast</h3><p class="ggs-toastline">' + esc(P2.toast) + '</p>' : '') +
        '<div class="ggs-foot"><button type="button" class="btn btn-secondary" data-gt="" data-first>All Plans</button><button type="button" class="btn btn-primary" data-dd="close">Close</button></div>';
      dialog(P2 ? P2.title : 'Good Times, Sober', html, function (d) {
        d.box.setAttribute('data-ggs-good', id || 'all');
        d.box.addEventListener('click', function (e) {
          var t = e.target.closest('[data-gt]'); if (t) { d.close(); goodDlg(tree, t.getAttribute('data-gt')); return; }
          var b = e.target.closest('[data-dd]'); if (b) d.close();
        });
      });
    });
  }

  /* ---------- a small dialog ---------- */
  function dialog(label, html, setup) {
    addCSS();
    var back = document.createElement('div'); back.className = 'ggs-back';
    back.innerHTML = '<div class="ggs-dlg" role="dialog" aria-modal="true" aria-label="' + esc(label) + '">' + html + '</div>';
    document.body.appendChild(back);
    var box = back.firstChild, last = document.activeElement, done = false, overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function close() {
      if (done) return; done = true; back.remove(); document.removeEventListener('keydown', key, true); document.body.style.overflow = overflow;
      if (last && last.focus && document.contains(last)) try { last.focus({ preventScroll: true }); } catch (e) {}
    }
    function key(e) {
      if (e.key === 'Escape') { e.stopPropagation(); close(); return; }
      if (e.key === 'Tab') {
        var f = box.querySelectorAll('button,a[href],input,textarea,select'); if (!f.length) return;
        var a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    }
    document.addEventListener('keydown', key, true);
    back.addEventListener('click', function (e) { if (e.target === back) close(); });
    var api = { box: box, close: close, set: function (h) { box.innerHTML = h; } };
    if (setup) setup(api);
    setTimeout(function () { var f = box.querySelector('[data-first]') || box.querySelector('button,input'); if (f) try { f.focus({ preventScroll: true }); } catch (e) {} }, 30);
    return api;
  }

  /* ---------- milestones: each one shows once ---------- */
  var SHOWING = false;
  function check(tree) {
    tree = tree || APP.tree;
    var g = L(); if (!g || TREES.indexOf(tree) < 0 || SHOWING || isHelper() || !g.sober(tree)) return;
    var c = g.get(), date = g.soberDate(tree); if (!date) return;
    var all = reached(date); if (!all.length) return;
    var seen = c.soberSeen && c.soberSeen.at === date ? c.soberSeen.k : [];
    var fresh = all.filter(function (k) { return seen.indexOf(k) < 0; }); if (!fresh.length) return;
    var key = fresh[fresh.length - 1]; // the newest one only, never a pile after time away
    SHOWING = true;
    g.set({ soberSeen: { at: date, k: all } }).then(function () { needWords().then(function () { SHOWING = false; showMilestone(tree, key, count(date)); }); }, function () { SHOWING = false; });
  }
  function showMilestone(tree, key, c) {
    var w = milestoneWords(key), star = key[0] === 'd' ? 'bronze' : key[0] === 'm' ? 'silver' : 'gold';
    var n = +key.slice(1), lab = key[0] === 'd' ? n + (n === 1 ? ' day' : ' days') : key[0] === 'm' ? n + (n === 1 ? ' month' : ' months') : n + (n === 1 ? ' year' : ' years');
    needShare();
    dialog(w.head, '<div class="ggs-ms">' + bigStar(star) + '<p class="ggs-cnt">' + esc(lab) + ' sober</p><h2>' + esc(w.head) + '</h2><p>' + esc(w.text) + '</p>' +
      '<div class="ggs-foot"><button type="button" class="btn btn-secondary" data-ms="share">Share</button><button type="button" class="btn btn-primary" data-ms="close" data-first>Keep Growing</button></div></div>', function (d) {
      d.box.setAttribute('data-ggs-ms', key);
      d.box.addEventListener('click', function (e) {
        var b = e.target.closest('[data-ms]'); if (!b) return;
        if (b.getAttribute('data-ms') === 'close') d.close();
        else share({ kind: 'milestone', head: w.head, text: w.text, star: star, count: lab });
      });
    });
  }

  /* ---------- My Anchor Plan ---------- */
  var IDEAS = [
    ['walk', 'Take a walk outside'], ['water', 'Drink a tall glass of water'], ['eat', 'Eat something nourishing'],
    ['shower', 'Take a warm shower'], ['breathe', 'Breathe slowly for two minutes'], ['text', 'Text or call my person'],
    ['meeting', 'Go to a meeting, in person or online'], ['tea', 'Make a cup of tea'], ['write', 'Write out what I feel'],
    ['move', 'Move my body: stretch, lift, or dance'], ['pray', 'Pray, or sit quietly for a minute'], ['bed', 'Go to bed early']
  ];
  var IDEA = {}; IDEAS.forEach(function (x) { IDEA[x[0]] = x[1]; });
  function linesHtml(tree) {
    var g = L(), ls = g && g.soberLines ? g.soberLines(tree) : [];
    return '<div class="ggs-lines"><p><b>Help Lines</b></p><p>In a crisis, call or text 988. In an emergency, call 911.</p>' +
      ls.map(function (x) { var href = x.tel ? 'tel:' + x.tel : x.url || ''; return '<p><b>' + esc(x.name) + ':</b> ' + (href ? '<a href="' + esc(href) + '"' + (x.tel ? '' : ' target="_blank" rel="noopener"') + '>' + esc(x.how) + '</a>' : esc(x.how)) + '. ' + esc(x.note) + '</p>'; }).join('') + '</div>';
  }
  function telHref(n) { var d = String(n || '').replace(/[^0-9+]/g, ''); return d.length >= 3 ? 'tel:' + d : ''; }
  function viewHtml(tree, a) {
    var h = '<div class="ggs-view">';
    if (a.remind) h += '<h3>What I\'ll Remind Myself</h3><p class="ggs-remind">' + esc(a.remind) + '</p>';
    if (a.people.length) h += '<h3>Who I\'ll Call or Text</h3><ul>' + a.people.map(function (p) { var t = telHref(p.num); return '<li><b>' + esc(p.name || 'My person') + '</b>' + (p.num ? ': ' + (t ? '<a href="' + esc(t) + '">' + esc(p.num) + '</a>' : esc(p.num)) : '') + '</li>'; }).join('') + '</ul>';
    var does = a.do.map(function (d) { return IDEA[d]; }).filter(Boolean); if (a.own) does.push(a.own);
    if (does.length) h += '<h3>What I\'ll Do</h3><ul>' + does.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
    if (a.go) h += '<h3>Where I\'ll Go</h3><p>' + esc(a.go) + '</p>';
    return h + '</div>';
  }
  function editHtml(tree, a) {
    a = a || { people: [], do: [], own: '', go: '', remind: '' };
    var pp = a.people.slice(); while (pp.length < 3) pp.push({ name: '', num: '' });
    return '<form class="ggs-form" novalidate>' +
      '<h3>Who I\'ll Call or Text</h3><p class="ggs-soft">Names and numbers of people who will pick up.</p>' +
      pp.map(function (p, i) { return '<div class="ggs-pp"><label>Name<input type="text" name="pn' + i + '" value="' + esc(p.name) + '" autocomplete="off"' + (i === 0 ? ' data-first' : '') + '></label><label>Number<input type="tel" name="pt' + i + '" value="' + esc(p.num) + '" autocomplete="off" inputmode="tel"></label></div>'; }).join('') +
      '<h3>What I\'ll Do</h3><div class="ggs-ideas">' + IDEAS.map(function (x) { return '<label><input type="checkbox" name="do" value="' + x[0] + '"' + (a.do.indexOf(x[0]) >= 0 ? ' checked' : '') + '>' + esc(x[1]) + '</label>'; }).join('') + '</div>' +
      '<label style="margin-top:8px">My own idea<input type="text" name="own" value="' + esc(a.own) + '" autocomplete="off"></label>' +
      '<h3>Where I\'ll Go</h3><label>A safe, steady place: a friend\'s home, a meeting, a park, a coffee shop<input type="text" name="go" value="' + esc(a.go) + '" autocomplete="off"></label>' +
      '<h3>What I\'ll Remind Myself</h3><label>A mantra, in my own words<input type="text" name="remind" value="' + esc(a.remind) + '" autocomplete="off"></label>' +
      '<div class="ggs-chips" aria-label="Mantra ideas">' + mantras().slice(0, 4).map(function (m) { return '<button type="button" data-mantra="' + esc(m) + '">' + esc(m) + '</button>'; }).join('') + '</div>' +
      '</form>';
  }
  function readForm(box) {
    var f = box.querySelector('.ggs-form'), o = { people: [], do: [], own: '', go: '', remind: '' };
    for (var i = 0; i < 3; i++) o.people.push({ name: f.elements['pn' + i].value, num: f.elements['pt' + i].value });
    box.querySelectorAll('input[name=do]:checked').forEach(function (x) { o.do.push(x.value); });
    o.own = f.elements.own.value; o.go = f.elements.go.value; o.remind = f.elements.remind.value;
    return o;
  }
  function anchorDlg(tree, edit) {
    var g = L(); if (!g || isHelper()) return;
    needWords();
    var a = g.anchor(), mode = edit || !a ? 'edit' : 'view';
    var intro = '<p class="ggs-eb">' + starSvg('gold', 16, '') + 'Living Sober</p><h2>My Anchor Plan</h2>';
    function body() {
      a = g.anchor();
      if (mode === 'view' && a) return intro + '<p class="ggs-soft">Your plan for a hard moment, any hour. Read it, then take the first step.</p>' + viewHtml(tree, a) + linesHtml(tree) +
        '<div class="ggs-foot"><button type="button" class="ggs-link" data-an="clear">Clear My Plan</button><button type="button" class="btn btn-secondary" data-an="print">Print</button><button type="button" class="btn btn-secondary" data-an="edit">Edit</button><button type="button" class="btn btn-primary" data-an="close" data-first>Close</button></div>';
      return intro + '<p class="ggs-soft">Fill it out on a steady day, so it is ready for a hard one. It stays locked on this device' + (isGuest() ? ', for this visit only until you open or create a profile.' : '.') + '</p>' + editHtml(tree, a) + linesHtml(tree) +
        '<p class="ggs-soft" role="status" aria-live="polite" data-an-status></p>' +
        '<div class="ggs-foot"><button type="button" class="btn btn-secondary" data-an="close">Close</button><button type="button" class="btn btn-primary" data-an="save">Save My Plan</button></div>';
    }
    dialog('My Anchor Plan', body(), function (d) {
      d.box.setAttribute('data-ggs-anchor', tree);
      d.box.addEventListener('submit', function (e) { e.preventDefault(); });
      d.box.addEventListener('click', function (e) {
        var m = e.target.closest('[data-mantra]'); if (m) { var r = d.box.querySelector('input[name=remind]'); if (r) { r.value = m.getAttribute('data-mantra'); r.focus(); } return; }
        var b = e.target.closest('[data-an]'); if (!b) return;
        var k = b.getAttribute('data-an');
        if (k === 'close') d.close();
        else if (k === 'edit') { mode = 'edit'; d.set(body()); var f = d.box.querySelector('[data-first]'); if (f) f.focus(); }
        else if (k === 'print') printPlan(tree, g.anchor());
        else if (k === 'clear') { if (!confirm('Clear your Anchor Plan? It is erased from this device.')) return; g.setAnchor(null).then(function () { APP.guestAnchor = null; mode = 'edit'; d.set(body()); refresh(); }); }
        else if (k === 'save') {
          var o = readForm(d.box);
          g.setAnchor(o).then(function (saved) {
            if (isGuest()) APP.guestAnchor = saved;
            if (!saved) { var s = d.box.querySelector('[data-an-status]'); if (s) s.textContent = 'Add at least one person, idea, place, or mantra.'; return; }
            mode = 'view'; d.set(body()); var f = d.box.querySelector('[data-first]'); if (f) f.focus(); toast('Saved, locked on this device.');
          }, function (er) { var s = d.box.querySelector('[data-an-status]'); if (s) s.textContent = er && er.message ? er.message : 'Try saving once more.'; });
        }
      });
    });
  }
  // Print: a plain page with the plan alone and a Print button (a hidden frame when pop-ups are blocked).
  function printPlan(tree, a) {
    if (!a) return;
    var html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>My Anchor Plan</title>' +
      '<link rel="stylesheet" href="' + ROOT + '/fonts/fonts.css"><style>body{margin:0;background:#FFFCF6;color:#2C1810;font-family:Barlow,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.55;}' +
      '.bar{position:sticky;top:0;display:flex;gap:10px;align-items:center;padding:10px 14px;background:#2E2118;color:#F6EFE2;}.bar b{font-family:"Cormorant Garamond",Georgia,serif;font-size:20px;margin-right:auto;}' +
      '.bar button{min-height:44px;padding:8px 16px;border-radius:10px;border:1.5px solid #D9A847;background:#D9A847;color:#2E2118;font:inherit;font-weight:600;cursor:pointer;}' +
      'main{max-width:7in;margin:0 auto;padding:28px 18px 40px;}.eb{font-family:"Barlow Condensed",sans-serif;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;color:#4E7D6A;}' +
      'h1{font-family:"Cormorant Garamond",Georgia,serif;font-weight:700;font-size:36px;margin:4px 0 10px;}h3{font-family:"Cormorant Garamond",Georgia,serif;font-size:22px;margin:18px 0 4px;}' +
      '.ggs-remind{font-family:"Cormorant Garamond",Georgia,serif;font-size:26px;font-style:italic;}ul{padding-left:22px;}a{color:inherit;}.ggs-lines{margin-top:20px;border-top:1px solid #DDD0B8;padding-top:10px;font-size:14px;}.ggs-lines p{margin:0 0 6px;}' +
      '.foot{font-size:12px;color:#6B5A4D;margin-top:18px;}@media print{.bar{display:none;}main{padding:0;}@page{margin:.7in;}}</style></head><body>' +
      '<div class="bar"><b>My Anchor Plan</b><button type="button" onclick="window.print()">Print or Save as PDF</button></div>' +
      '<main><div class="eb">Living Sober</div><h1>My Anchor Plan</h1>' + viewHtml(tree, a) + linesHtml(tree) +
      '<p class="foot">From Grow With Grounded, growwithgrounded.com/living-sober. Yours to keep close.</p></main></body></html>';
    var w = null; try { w = window.open('', '_blank'); } catch (e) { w = null; }
    if (w && w.document) { w.document.open(); w.document.write(html); w.document.close(); try { w.focus(); } catch (e) {} return; }
    var f = document.createElement('iframe'); f.setAttribute('aria-hidden', 'true'); f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
    document.body.appendChild(f); f.contentDocument.open(); f.contentDocument.write(html); f.contentDocument.close();
    setTimeout(function () { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) {} setTimeout(function () { f.remove(); }, 60000); }, 700);
  }

  /* ---------- the ?sober= link ---------- */
  function readFlag() {
    var v = null;
    try {
      var u = new URL(location.href); v = u.searchParams.get('sober');
      if (v == null) return null;
      u.searchParams.delete('sober');
      history.replaceState(history.state, '', u.pathname + (u.searchParams.toString() ? '?' + u.searchParams.toString() : '') + u.hash);
    } catch (e) { return null; }
    v = String(v).toLowerCase().trim();
    var g = L(), stages = g ? g.STAGES.map(function (x) { return x.id; }) : [];
    if (stages.indexOf(v) >= 0) return { stage: v, anchor: false };
    if (v === 'anchor' || v === 'plan') return { stage: '', anchor: true };
    if (/^(1|on|yes|true|)$/.test(v)) return { stage: '', anchor: false };
    return null;
  }
  // Apply the waiting link: into the open profile's locked vault, or for this visit while no profile is open.
  function applyPending() {
    var g = L(), p = APP.pending; if (!g || !p || isHelper()) return Promise.resolve();
    var id = g.who(), a = activeAdult();
    if (id && !a) { APP.pending = null; return Promise.resolve(); } // a young person's profile: the kids' trees keep their own framing
    var c = g.get(), ids = c.ids.slice(); if (ids.indexOf('sober') < 0) ids.push('sober');
    var patch = { ids: ids, none: false, rather: false }; if (p.stage) patch.sober = p.stage;
    if (!id) { APP.pending.guest = true; return g.set(patch).then(function () { refresh(); }); }
    APP.pending = null;
    return g.set(patch).then(function () { APP.note = 'Living Sober is on, locked in your profile.'; refresh(); toast('Living Sober is on, locked in your profile.'); });
  }
  // A profile made during this visit keeps what a guest filled in: the stage, the sober date, and the Anchor Plan.
  function carryGuest() {
    var g = L(), a = activeAdult(), gc = APP.guestCarry; if (!g || !a || isHelper()) return Promise.resolve();
    var isNew = APP.startIds && APP.startIds.indexOf(a.id) < 0;
    APP.guestCarry = null;
    var anc = APP.guestAnchor; APP.guestAnchor = null;
    if (!isNew) return Promise.resolve();
    var jobs = [];
    var c = g.get();
    if (gc && gc.ids.indexOf('sober') >= 0) {
      var ids = c.ids.slice(); if (ids.indexOf('sober') < 0) ids.push('sober');
      var patch = { ids: ids, none: false, rather: false };
      if (gc.sober && !c.sober) patch.sober = gc.sober;
      if (gc.soberDate && !c.soberDate) patch.soberDate = gc.soberDate;
      jobs.push(g.set(patch));
    }
    if (anc && !g.anchor()) jobs.push(g.setAnchor(anc));
    return Promise.all(jobs).then(function () { refresh(); });
  }

  /* ---------- start ---------- */
  function init(tree, opts) {
    if (TREES.indexOf(tree) < 0 || APP.tree) return;
    APP.tree = tree; APP.opts = opts || {};
    addCSS();
    var flag = readFlag();
    if (flag) APP.pending = flag;
    needWords().then(refresh);
    needShare();
    var g = L();
    if (g && g.sober(tree)) need30().then(refresh);
    var ready = window.GGP && GGP.ready && GGP.ready.then ? GGP.ready : Promise.resolve();
    ready.then(function () {
      try { APP.startIds = window.GGP ? GGP.list().map(function (p) { return p.id; }) : []; } catch (e) { APP.startIds = []; }
      return applyPending();
    }).then(function () {
      if (!flag) { check(tree); return; }
      setTimeout(function () {
        if (APP.opts.open) try { APP.opts.open(flag.anchor ? 'anchor' : 'sober'); } catch (e) { console.error(e); }
        if (flag.anchor) setTimeout(function () { anchorDlg(tree, false); }, 120);
        else check(tree);
      }, 180);
    }).catch(function (e) { console.error(e); });
    if (window.GGLife) GGLife.on(function (d) {
      // A guest's choices this visit, so a profile made now can keep them.
      if (d && !d.id) APP.guestCarry = d.choice;
      if (d && d.id && APP.pending && APP.pending.guest) { APP.pending.guest = false; applyPending().then(carryGuest); }
      else if (d && d.id && (APP.guestCarry || APP.guestAnchor)) carryGuest();
      if (L() && L().sober(APP.tree) && !window.GGSober30) need30().then(refresh);
      setTimeout(function () { check(APP.tree); }, 250);
    });
    window.addEventListener('gg-learn-close', refresh);
  }

  window.GGSober = { version: V, TREES: TREES.slice(), init: init, cardHtml: cardHtml, count: count, reached: reached, check: check,
    anchor: function (tree, edit) { anchorDlg(tree || APP.tree, !!edit); }, daily: daily, refresh: refresh, share: share, milestoneWords: milestoneWords, star: starSvg };
})();
