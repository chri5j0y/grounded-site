/* =====================================================================
   GROW WITH GROUNDED . A CARD FROM A GUIDE VISIT, IN HOME (shared/home/visit.js), GWG BLD 912 Round 2
   (c) 2026 Grow With Grounded LLC.
   During a Guide visit the Field Guide shows a Bring It Home QR code (field-guide/index.html fgVisitUrl 4892, built by
   GGApp.visit.url in shared/gg-app.js 373): https://growwithgrounded.com/<tree>/#gg-visit=v1.<code>. The tree door
   (shared/gg-room.js) hands it to /home/?tree=<tree>#gg-visit=... and Home reads it here, with no tree page, no iframe,
   and nothing from a tree page's DOM or globals. Contract: grounded-workshop patches/bld912/CONTRACT-R2.md.

   The card carries only a first name, the date, the strong parts, and what the person chose to try (and pl 1 when a
   Maple or Aspen Guide's school or group asks for Plain wording). Read exactly as gg-app.js reads it (vclean 351,
   vcode 367, vunpack 368, takeVisit 375) and kept waiting in the same place, sessionStorage 'gg-visit-in', so a tree
   page that opens later finds the same card.

   Saved exactly as each tree saves (line numbers as of BLD 911):
     oak       oak/index.html     vcAdd 2587, vcAddPlan 2566, vcRemove 2580   GGP.data(id, 'oak').visitCards
     birch     birch/app.js       vcAdd 1560, vcAddPlan 1539, vcRemove 1553   GGP.data(id, 'birch').visitCards
     sequoia   sequoia/app.js     vcAdd 1622, vcAddPlan 1601, vcRemove 1615   GGP.data(id, 'sequoia').visitCards
     pine      pine/app.js        vcAdd 1522, vcAddPlan 1501, vcRemove 1515   GGP.data(id, 'pine').visitCards
     maple     maple/index.html   mpVisitAdd 2596, mpVisitAddPlan 2575, mpVisitRemove 2589
                                  GGP.data(id, 'maple').kid.visitCards, written whole through saveKids 1572 (the kid as
                                  loadKids 1527 and migrateKid 1552 read it); pl 1 sets plainLock true on the maple record
     aspen     aspen/index.html   visitCheck 1645 (Add), removeVisitCard 1637
                                  GGP.data(id, 'aspen').student.visitCards, written whole through save 1232 (the student
                                  as load 1213 reads it); pl 1 sets plainLock true on the aspen record
   Each card is { added: 'YYYY-MM-DD', d, s, t }, the same card is never added twice, and the newest 12 are kept.
   Add to My Growth Plan writes the tree's tend.plan the way GGTend.setPlan does (shared/gg-tend.js 733, with the record
   made ready as ensure 112 does), then saves the profile.

   API (window.GGVisit):
     GGVisit.take(hash)            a #gg-visit= code in hash: read and kept waiting; true when hash held one
     GGVisit.pending()             the waiting card, or null;   GGVisit.clear()   set it aside
     GGVisit.canSave(id, tree)     '' when this profile can hold a card in this tree, else the reason
     GGVisit.save(id, tree)        adds the waiting card, as the tree does; Promise of {ok, plain, msg}
     GGVisit.list(id, tree)        the saved cards, oldest first
     GGVisit.addPlan(id, tree, i)  Add to My Growth Plan for card i; {n, msg}
     GGVisit.remove(id, tree, i)   removes card i; Promise
     GGVisit.cardsHtml(id, tree)   the cards as the screen draws them
     GGVisit.todayHtml(id, tree)   a card for Home's Today (newest card, or the waiting one), opening the screen
                                   with data-hm-tool="visit"
   GGScreen.visit opens the screen: the waiting card's ask (Add to <name>'s Tree, Maybe Later, Leave It Off), then
   the saved cards with Add to My Growth Plan and Remove This Card.
   Differences from the tree, on purpose: the ask sits at the top of this window instead of a dialog; in Maple and
   Aspen the open profile is the child, so the card goes on that child's tree (the tree's "Whose tree?" list held
   every child open on the device); Remove asks in place instead of the browser's confirm box.
   ===================================================================== */
(function () {
  'use strict';
  window.GGScreen = window.GGScreen || {};
  if (window.GGVisit && window.GGScreen.visit) return;
  var V = 'b912';
  var TREES = ['oak', 'birch', 'sequoia', 'pine', 'maple', 'aspen'];
  var ADULT = { oak: 1, birch: 1, sequoia: 1, pine: 1 };
  var NAME = { oak: 'Oak', birch: 'Birch', sequoia: 'Sequoia', pine: 'Pine', maple: 'Maple', aspen: 'Aspen' };
  var PRAC = { oak: ['/oak/practices.js?v=b907', 'OAK_PRACTICES'], birch: ['/birch/practices.js?v=b907', 'BIRCH_PRACTICES'], sequoia: ['/sequoia/practices.js?v=b907', 'SEQUOIA_PRACTICES'], pine: ['/pine/practices.js?v=b907', 'PINE_PRACTICES'] };
  var KEYS = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];
  var WORD = { roots: 'What grounds you', trunk: 'Purpose', bark: 'Mind and feelings', branches: 'Relationships', leaves: 'Body', fruit: 'Hope' };   // DOMAIN_DEFS name in each practices.js
  var MP_HEX = { roots: '#FF6B6B', trunk: '#FF9F1C', bark: '#9B5DE5', branches: '#00B4D8', leaves: '#6CCB3A', fruit: '#D62839' };   // maple/index.html PARTS 983
  var VPEND = 'gg-visit-in';   // gg-app.js 339
  var ART = '/shared/heroes/way/growth-plan-sq.webp';

  /* ---------- small helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function clone(o) { return o == null ? o : JSON.parse(JSON.stringify(o)); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function dkey(d) { d = d || new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }   // todayKey, sgToday, dkey, today: the same local day in every tree
  function keyDate(k) { var p = String(k).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function addDays(k, n) { var d = keyDate(k); d.setDate(d.getDate() + n); return dkey(d); }
  function lower(s) { return String(s == null ? '' : s).toLowerCase(); }
  function arr(x) { return Array.isArray(x) ? x : []; }
  // formatDate (oak/index.html 1237, birch/app.js 113), fmtKey (maple/index.html 1571), fmtDate (aspen/index.html 1283)
  function longDate(iso) { var d = new Date(String(iso).slice(0, 10) + 'T00:00:00'); return isNaN(d) ? String(iso) : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); }
  function mpDate(k, year) { try { return keyDate(k).toLocaleDateString(undefined, year ? { month: 'long', day: 'numeric', year: 'numeric' } : { month: 'long', day: 'numeric' }); } catch (e) { return k; } }
  function asDate(k) { try { return new Date(k + 'T12:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }); } catch (e) { return k; } }
  function css(id, text) { if (document.getElementById(id)) return; var st = document.createElement('style'); st.id = id; st.textContent = text; document.head.appendChild(st); }
  function okOpen(id) { return !!(id && window.GGP && GGP.isOpen && GGP.isOpen(id)); }
  function prof(id) { return (window.GGP && GGP.get && GGP.get(id)) || {}; }

  /* ---------- the card code, as gg-app.js reads it (enc64 307, dec64 308, PK 150, vclean 351) ---------- */
  var PK = { holy: 'roots', meaning: 'trunk', mind: 'bark', community: 'branches', body: 'leaves', hope: 'fruit' }; // GG-PARTS-KEEP
  function pkId(s) { return typeof s === 'string' && Object.prototype.hasOwnProperty.call(PK, s) ? PK[s] : s; }
  function dec64(s) { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return decodeURIComponent(escape(atob(s))); }
  var VPARTS = KEYS.slice();
  function vclean(v) {
    if (!v || typeof v !== 'object') return null;
    var name = String(v.n || '').replace(/[<>]/g, '').trim().split(/\s+/)[0] || '';
    var d = String(v.d || ''); if (!/^\d{4}-\d\d-\d\d$/.test(d)) return null;
    var strong = []; (Array.isArray(v.s) ? v.s : []).forEach(function (k) { k = pkId(k); if (VPARTS.indexOf(k) >= 0 && strong.indexOf(k) < 0) strong.push(k); });
    var tries = []; (Array.isArray(v.t) ? v.t : []).forEach(function (t) {
      if (!Array.isArray(t) || tries.length >= 4 || VPARTS.indexOf(pkId(t[0])) < 0) return;
      var a = String(t[1] || '').replace(/[<>]/g, '').slice(0, 60), b = String(t[2] || '').replace(/[<>]/g, '').slice(0, 240);
      if (a) tries.push([pkId(t[0]), a, b]);
    });
    if (!strong.length && !tries.length) return null;
    var out = { n: name.slice(0, 30), d: d, s: strong, t: tries };
    if (v.pl === 1) out.pl = 1;
    return out;
  }
  function vunpack(s) { try { if (!/^v1\./.test(s)) return null; return vclean(JSON.parse(dec64(s.slice(3)))); } catch (e) { return null; } }
  // takeVisit, gg-app.js 375: true when the hash held a code; a good one waits in sessionStorage.
  function take(h) {
    var m = /[#&]gg-visit=([A-Za-z0-9._-]+)/.exec(String(h || '')); if (!m) return false;
    var c = vunpack(m[1]);
    if (c) { try { sessionStorage.setItem(VPEND, JSON.stringify(c)); } catch (e) {} }
    return true;
  }
  function pending() { try { return vclean(JSON.parse(sessionStorage.getItem(VPEND))); } catch (e) { return null; } }
  function clear() { try { sessionStorage.removeItem(VPEND); } catch (e) {} }

  /* ---------- Maple and Aspen: the child's record, read and written whole as the tree does ---------- */
  // migrateKid 1552 with moveOldCheckins 1544, maple/index.html
  var OLD_CI = 'check' + 'ups', OLD_CI_ID = 'check' + 'upId';
  function mpMigrate(k) {
    if (Array.isArray(k[OLD_CI])) k.checkins = (k.checkins || []).concat(k[OLD_CI]);
    delete k[OLD_CI];
    var fix = function (p) { if (p && p[OLD_CI_ID] !== undefined) { if (p.checkinId === undefined) p.checkinId = p[OLD_CI_ID]; delete p[OLD_CI_ID]; } };
    fix(k.plan); (k.pastPlans || []).forEach(fix);
    if (!k.checkins) k.checkins = [];
    if (!k.pastPlans) k.pastPlans = [];
    var last = k.checkins[k.checkins.length - 1];
    if (!k.grade && last) k.grade = last.grade;
    if (k.plan === undefined) {
      k.plan = null;
      if (last && last.plan && last.plan.acts) {
        var start = dkey(new Date(last.plan.made || last.date));
        k.plan = { acts: last.plan.acts.slice(), weeks: last.plan.weeks || 2, start: start, end: addDays(start, (last.plan.weeks || 2) * 7 - 1), checkinId: last.id, log: {} };
      }
    }
    return k;
  }
  // loadKids 1527 for this profile's kid
  function mpKid(id) {
    var p = prof(id), d = GGP.data(id, 'maple') || {};
    var k = Object.assign({ checkins: [] }, clone(d.kid || {}));
    k.name = p.name; k.avatar = p.avatar; k._pid = id; delete k._legacy;
    return mpMigrate(k);
  }
  // saveKids 1572 for this profile's kid: the whole kid, beside anything else in the maple record (a Plain lock)
  function mpSave(id, k) {
    var c = clone(k); delete c._pid; delete c._legacy; delete c.avatar;
    var all = Object.assign({}, GGP.data(id, 'maple') || {}, { kid: c });
    if (GGP.setData) GGP.setData(id, 'maple', all); else { var r = GGP.data(id, 'maple'); Object.keys(r).forEach(function (x) { delete r[x]; }); Object.assign(r, all); }
    var p = prof(id); if ((k.avatar || '') !== (p.avatar || '') && GGP.setAvatar) GGP.setAvatar(id, k.avatar);
    return GGP.save(id);
  }
  function mpLocked(id, k) { return (k && k.plainLock === true) || ((GGP.data(id, 'maple') || {}).plainLock === true); }   // plainLocked 1454
  // blankStudent 1212 and load 1213, aspen/index.html, for this profile's student
  function asStudent(id) {
    var p = prof(id), d = GGP.data(id, 'aspen') || {};
    var st = Object.assign({ rings: [], draft: null, plan: null, log: {}, leaves: 0, style: 'aspen', theme: 'lake', grade: 6 }, clone(d.student || {}));
    st.id = id; st.name = p.name; st.avatar = p.avatar; st._pid = id; delete st._legacy;
    var fr = (st.rings || []).filter(function (r) { return r && r.from; });
    if (fr.length) { st.rings = st.rings.filter(function (r) { return !(r && r.from); }); st.earlier = (st.earlier || []).concat(fr); }
    var gv = (GGP.data(id) || {}).grove, kind = gv && gv.self && gv.self.kind;
    if (kind) st.style = { birch: 'birch', maple: 'maple', pine: 'pine' }[kind] || 'aspen';
    return st;
  }
  // save 1232: only the student is replaced
  function asSave(id, st) {
    var c = clone(st); delete c._pid; delete c.avatar; delete c.id;
    var rec = GGP.data(id, 'aspen'); if (rec) rec.student = c; else GGP.setData(id, 'aspen', { student: c });
    var p = prof(id); if ((st.avatar || '') !== (p.avatar || '') && GGP.setAvatar) GGP.setAvatar(id, st.avatar);
    return GGP.save(id);
  }

  /* ---------- who can hold a card (each tree's PROF and vcRec) ---------- */
  function canSave(id, tree) {
    if (TREES.indexOf(tree) < 0) return 'This card belongs to a Grounded tree.';
    if (!okOpen(id)) return 'Open your profile first, then the card will ask again.';
    var age = prof(id).age;
    if (tree === 'maple' && age !== 'maple') return 'This card is for a Maple tree. Open that child\'s profile, then the card will ask again.';
    if (tree === 'aspen' && age !== 'aspen') return 'This card is for an Aspen tree. Open that student\'s profile, then the card will ask again.';
    if (tree === 'pine' && age !== 'pine') return 'This card is for a Pine tree. Open that profile, then the card will ask again.';   // pine/app.js profSync 1669
    if ((tree === 'birch' || tree === 'sequoia') && age !== 'adult') return 'This card is for a ' + NAME[tree] + ' tree. Open that profile, then the card will ask again.';   // birch 1710, sequoia 1764
    return '';
  }
  function list(id, tree) {
    if (!okOpen(id)) return [];
    if (tree === 'maple') return arr(((GGP.data(id, 'maple') || {}).kid || {}).visitCards);
    if (tree === 'aspen') return arr(((GGP.data(id, 'aspen') || {}).student || {}).visitCards);
    return arr((GGP.data(id, tree) || {}).visitCards);
  }
  function pushCard(listIn, v) {
    var L = Array.isArray(listIn) ? listIn : [];
    var card = { d: v.d, s: v.s, t: v.t }, same = JSON.stringify(card);
    if (!L.some(function (x) { return JSON.stringify({ d: x.d, s: x.s, t: x.t }) === same; })) L.push(Object.assign({ added: dkey() }, card));
    if (L.length > 12) L = L.slice(-12);
    return L;
  }
  // vcAdd, mpVisitAdd, Aspen's Add to <name>'s Tree
  function save(id, tree) {
    var v = pending(); if (!v) return Promise.resolve({ ok: false, msg: 'There is no card waiting.' });
    var why = canSave(id, tree); if (why) return Promise.resolve({ ok: false, msg: why });
    var plain = v.pl === 1 && (tree === 'maple' || tree === 'aspen'), done;
    if (tree === 'maple') {
      var k = mpKid(id); k.visitCards = pushCard(k.visitCards, v);
      if (v.pl === 1) GGP.data(id, 'maple').plainLock = true;   // 2602 to 2605: the profile's maple record
      clear(); done = mpSave(id, k);
      return done.then(function () { return { ok: true, plain: plain, msg: plain ? 'Added to your tree! Maple uses Plain wording now.' : 'Added to your tree!' }; }, function () { return { ok: false, msg: 'Let\'s try that again: open your tree and add it once more.' }; });
    }
    if (tree === 'aspen') {
      var st = asStudent(id); st.visitCards = pushCard(st.visitCards || [], v);
      if (v.pl === 1) { var r = GGP.data(id, 'aspen'); if (r) r.plainLock = true; else st.plainLock = true; }   // 1667
      clear(); done = asSave(id, st);
      return done.then(function () { return { ok: true, plain: plain, msg: plain ? 'Added to your tree. Aspen uses Plain wording now.' : 'Added to your tree.' }; }, function () { return { ok: false, msg: 'Let\'s try that again: open your tree and add it once more.' }; });
    }
    var rec = GGP.data(id, tree);
    rec.visitCards = pushCard(rec.visitCards, v);
    clear();
    var bad = tree === 'pine' ? 'That did not save. Open your profile and try again.' : 'Let\'s try that again: open your profile and save once more.';
    return GGP.save(id).then(function () { return { ok: true, plain: false, msg: 'Added to your tree. You will find it on Today.' }; }, function () { return { ok: false, msg: bad }; });
  }
  // vcRemove, mpVisitRemove, removeVisitCard
  function remove(id, tree, i) {
    if (!okOpen(id)) return Promise.resolve(false);
    if (tree === 'maple') {
      var k = mpKid(id); if (!Array.isArray(k.visitCards) || !k.visitCards[i]) return Promise.resolve(false);
      k.visitCards.splice(i, 1); if (!k.visitCards.length) delete k.visitCards;
      return mpSave(id, k).then(function () { return true; });
    }
    if (tree === 'aspen') {
      var st = asStudent(id); if (!st.visitCards || !st.visitCards[i]) return Promise.resolve(false);
      st.visitCards.splice(i, 1); if (!st.visitCards.length) delete st.visitCards;
      return asSave(id, st).then(function () { return true; });
    }
    var r = GGP.data(id, tree); if (!r || !Array.isArray(r.visitCards) || !r.visitCards[i]) return Promise.resolve(false);
    r.visitCards.splice(i, 1); if (!r.visitCards.length) delete r.visitCards;
    return GGP.save(id).then(function () { return true; });
  }

  /* ---------- the growth plan (Oak, Birch, Sequoia, Pine, Maple) ---------- */
  // The tree's practice library: DOMAIN_DEFS restore with NEW added (oak/index.html 1392, birch/app.js 91,
  // sequoia/app.js 69, pine/app.js 78), and Plain names (plainOf, birch 97, pine 84).
  var LIB = {};
  function lib(tree) {
    if (LIB[tree]) return LIB[tree];
    var SP = window[(PRAC[tree] || [])[1]] || {};
    var raw = SP.DOMAIN_DEFS || SP.domainDefs || SP.domains || SP.parts || [];
    if (!Array.isArray(raw)) raw = Object.keys(raw).map(function (k) { return Object.assign({ key: k }, raw[k]); });
    var by = {}; raw.forEach(function (d) { if (d && d.key) by[d.key] = d; });
    var NEW = SP.NEW || SP.added || {}, names = {};
    KEYS.forEach(function (k) {
      var d = by[k] || {}, L = (d.restore || []).map(function (r) { return Array.isArray(r) ? r[0] : (r.name || r.n); });
      (NEW[k] || []).forEach(function (r) { var n = Array.isArray(r) ? r[0] : (r.name || r.n); if (n && L.indexOf(n) < 0) L.push(n); });
      names[k] = L;
    });
    var G = Object.assign({}, SP.GUIDES || SP.guides || {}, SP.G || {}), PL = SP.PLAIN || SP.plain || {};
    return (LIB[tree] = { names: names, plain: function (k, n) { var g = G[k + '|' + n] || {}; return PL[k + '|' + n] || g.plain || null; }, plainParts: SP.PLAIN_PARTS || {} });
  }
  function adultPlain(id, tree) { return (tree === 'birch' || tree === 'pine') && (GGP.data(id, tree) || {}).wording === 'plain'; }   // isPlain, birch 329, pine 354
  // shownName (birch 102, pine 89); Oak and Sequoia show the saved name
  function shownName(id, tree, k, n) { if (!adultPlain(id, tree)) return n; var p = lib(tree).plain(k, n); return (p && (p.n || p.name)) || n; }
  // vcKnown 2540: a practice the tree knows goes in by its own name
  function vcKnown(id, tree, k, name) {
    var n = lower(name), L = lib(tree).names[k] || [];
    for (var i = 0; i < L.length; i++) if (lower(L[i]) === n || lower(shownName(id, tree, k, L[i])) === n) return L[i];
    return null;
  }
  // vcPlanHas 2545
  function vcPlanHas(id, tree, plan, k, name) {
    var x = (plan || {})[k] || {}, n = lower(name), known = vcKnown(id, tree, k, name);
    return arr(x.selected).some(function (y) { return y === known || lower(y) === n; }) || arr(x.own).some(function (y) { return lower(y) === n; })
      || lower(x.custom || '') === n || arr(x.lib).some(function (l) { return l && lower(l.n || '') === n; });
  }
  // Maple: ACTIVITIES (shared/home/visitdata.js), actByName 2306, shownTitle 1469, mpNormName 2307
  function mpActs() { return ((window.GGVisitData || {}).maple || []); }
  function mpAct(part, name) { var n = lower(name); var L = mpActs(); for (var i = 0; i < L.length; i++) { var a = L[i]; if (a[0] === part && (lower(a[1]) === n || (a[2] && lower(a[2]) === n))) return a; } return null; }
  function mpTitle(a, plain) { return plain && a[2] ? a[2] : a[1]; }
  function mpNorm(part, name, plain) { var a = mpAct(part, name); return a ? mpTitle(a, plain) : name; }
  // mpVisitPlanHas 2560
  function mpPlanHas(plan, k, name) {
    var x = (plan || {})[k] || {}, n = lower(name), a = mpAct(k, name);
    var same = function (y) { return lower(y) === n || (a && mpAct(k, y) === a); };
    return arr(x.selected).some(same) || arr(x.own).some(same) || (x.custom && same(x.custom)) || arr(x.lib).some(function (l) { return l && same(l.n || ''); });
  }
  // mpNormTend 2309: saved names read forward
  function mpNormId(id, plain) { var i = String(id).indexOf('|'); if (i < 0) return id; var k = id.slice(0, i); return k + '|' + mpNorm(k, id.slice(i + 1), plain); }
  function mpNormTend(t, plain) {
    Object.keys(t.plan || {}).forEach(function (k) { var x = t.plan[k]; if (x && Array.isArray(x.selected)) x.selected = x.selected.map(function (n) { return mpNorm(k, n, plain); }).filter(function (n, i, a) { return a.indexOf(n) === i; }); });
    Object.keys(t.days || {}).forEach(function (d) {
      var x = t.days[d]; if (!x || typeof x !== 'object') return;
      ['d', 'e'].forEach(function (f) { if (Array.isArray(x[f])) x[f] = x[f].map(function (n) { return mpNormId(n, plain); }).filter(function (n, i, a) { return a.indexOf(n) === i; }); });
      if (x.n && typeof x.n === 'object') { var o = {}; Object.keys(x.n).forEach(function (q) { o[mpNormId(q, plain)] = x.n[q]; }); x.n = o; }
    });
    return t;
  }
  // actsToPlan 2287
  function actsToPlan(acts, plain) {
    var out = {}; KEYS.forEach(function (k) { out[k] = { selected: [], custom: '', own: [] }; });
    var L = mpActs();
    (acts || []).forEach(function (aid) { var a = L.filter(function (x) { return x[3] === aid; })[0]; if (a && out[a[0]]) out[a[0]].selected.push(mpTitle(a, plain)); });
    return out;
  }
  function countPlan(p) { var n = 0; Object.keys(p || {}).forEach(function (k) { var x = p[k] || {}; n += (x.selected || []).length + (x.custom ? 1 : 0) + (x.own || []).length + (x.lib || []).length; }); return n; }
  // ensure, gg-tend.js 112: the blank fields, the season start from the latest full check-in, the plan from the latest one with a plan
  function ensure(s, hist) {
    var b = { v: 1, start: null, season: 1, rings: [], plan: null, level: null, days: {}, weeks: {} };
    Object.keys(b).forEach(function (k) { if (s[k] === undefined) s[k] = b[k]; });
    if (!s.start || !s.plan) {
      var full = hist.filter(function (e) { return e && e.type !== 'quick' && e.date; }), last = full[full.length - 1];
      if (!s.start && last) s.start = last.date;
      if (!s.plan) { var wp = hist.filter(function (e) { return e && e.growthPlan && countPlan(e.growthPlan); }), lp = wp[wp.length - 1]; if (lp) s.plan = clone(lp.growthPlan); }
    }
    return s;
  }
  // setPlan, gg-tend.js 733: library picks and own practices stay when the plan is rebuilt
  function setPlan(s, p) {
    var old = s.plan || {}; s.plan = clone(p);
    Object.keys(old).forEach(function (k) { var L = (old[k] || {}).lib, O = (old[k] || {}).own; if (L && L.length) { if (!s.plan[k]) s.plan[k] = { selected: [] }; if (!s.plan[k].lib) s.plan[k].lib = L; } if (O && O.length) { if (!s.plan[k]) s.plan[k] = { selected: [] }; if (!s.plan[k].own) s.plan[k].own = O; } });
  }
  // The history each tree's TEND_CFG gives GGTend (oak 2637, birch 1626, sequoia 1673, pine 1588, maple 2410)
  function adultHist(id, tree) { return arr((GGP.data(id, tree) || {}).history).filter(function (e) { return e && !e.from && (tree !== 'sequoia' || e.kind !== 'observed'); }); }
  function allIn(id, tree, v) {
    var plan = planNow(id, tree); if (!plan) return false;
    return (v.t || []).every(function (t) { return tree === 'maple' ? mpPlanHas(plan, t[0], t[1]) : vcPlanHas(id, tree, plan, t[0], t[1]); });
  }
  // GGTend.plan() without writing: what the tree would show
  function planNow(id, tree) {
    if (!okOpen(id)) return null;
    if (tree === 'maple') { var k = mpKid(id), plain = mpLocked(id, k) || k.wording === 'plain', t = clone(k.tend || {}); if (!t.plan && k.plan && (k.plan.acts || []).length) t.plan = actsToPlan(k.plan.acts, plain); mpNormTend(t, plain); return ensure(t, mpHist(k)).plan; }
    var r = GGP.data(id, tree) || {}; return ensure(clone(r.tend || {}), adultHist(id, tree)).plan;
  }
  function mpHist(k) { return (k.checkins || []).map(function (c) { return { date: dkey(new Date(c.date)), type: 'full' }; }); }
  // vcAddPlan 2566 (adult trees) and mpVisitAddPlan 2575 (Maple). Aspen cards carry no plan button (visitCardHTML 1623).
  function addPlan(id, tree, i) {
    if (tree === 'aspen' || !okOpen(id)) return Promise.resolve({ n: 0, msg: '' });
    var cards = list(id, tree), v = cards[i]; if (!v) return Promise.resolve({ n: 0, msg: '' });
    var n = 0, plan, s;
    if (tree === 'maple') {
      var k = mpKid(id), plain = mpLocked(id, k) || k.wording === 'plain';   // kidWording 1459
      if (!k.tend || typeof k.tend !== 'object') k.tend = {};
      s = k.tend; if (!s.plan && k.plan && (k.plan.acts || []).length) s.plan = actsToPlan(k.plan.acts, plain);   // mpTendGet 2292
      mpNormTend(s, plain); ensure(s, mpHist(k));
      plan = clone(s.plan || {});
      (v.t || []).forEach(function (t) {
        var key = t[0]; if (KEYS.indexOf(key) < 0 || mpPlanHas(plan, key, t[1])) return;
        var x = plan[key] || (plan[key] = { selected: [], custom: '', own: [] }); if (!Array.isArray(x.selected)) x.selected = [];
        var a = mpAct(key, t[1]); if (a) x.selected.push(mpTitle(a, plain)); else (x.own || (x.own = [])).push(String(t[1]));
        n++;
      });
      if (!n) return Promise.resolve({ n: 0, msg: 'These are already in your growth plan.' });
      setPlan(s, plan);
      return mpSave(id, k).then(function () { return { n: n, msg: n === 1 ? 'Added! Find it on Today.' : n + ' practices added! Find them on Today.' }; });
    }
    var rec = GGP.data(id, tree); if (!rec.tend || typeof rec.tend !== 'object') rec.tend = {};
    s = ensure(rec.tend, adultHist(id, tree));
    plan = clone(s.plan || {});
    (v.t || []).forEach(function (t) {
      var key = t[0]; if (KEYS.indexOf(key) < 0 || vcPlanHas(id, tree, plan, key, t[1])) return;
      var x = plan[key] || (plan[key] = { selected: [], custom: '', own: [] }); if (!Array.isArray(x.selected)) x.selected = [];
      var known = vcKnown(id, tree, key, t[1]); if (known) x.selected.push(known); else (x.own || (x.own = [])).push(String(t[1]));
      n++;
    });
    if (!n) return Promise.resolve({ n: 0, msg: 'These practices are already in your growth plan.' });
    setPlan(s, plan);
    var bad = function () { return { n: n, msg: 'That did not save. Open your profile and try again.' }; };   // persist, gg-tend.js 719
    return GGP.save(id).then(function () { return { n: n, msg: n === 1 ? 'Added to your growth plan. It shows here on Today.' : n + ' practices added to your growth plan. They show here on Today.' }; }, bad);
  }

  /* ---------- drawing ---------- */
  var PART_WORD = { roots: 'Roots', trunk: 'Trunk', bark: 'Bark', branches: 'Branches', leaves: 'Leaves', fruit: 'Fruit' };   // PARTS part, each tree
  function partName(tree, k) { return PART_WORD[k] || ''; }
  // Each part's words as the tree shows them (d.part and d.name, set from shared/gg-parts.js: oak/index.html 1354,
  // birch/app.js 211, sequoia/app.js 212, pine/app.js 198): "Roots: Spirit", and the meaning. Plain follows gwPlainOn:
  // Oak the profile's Birch wording (gwPlain 2905), Birch and Pine their own wording, Sequoia never.
  function treePlain(id, tree) { if (tree === 'oak') return ((GGP.data(id) || {}).birch || {}).wording === 'plain'; return adultPlain(id, tree); }
  function adultPart(id, tree, k) {
    var G = window.GGParts, pl = treePlain(id, tree), o = { plain: function () { return pl; } };
    if (G && G.label) { var m = G.meaning(k, o); return { part: G.label(k, o), name: m.charAt(0).toUpperCase() + m.slice(1) }; }
    return { part: PART_WORD[k], name: WORD[k] };
  }
  // vcPartName 2538
  function adultPartName(id, tree, k) { if (!PART_WORD[k]) return ''; var d = adultPart(id, tree, k); return d.part + (d.name ? ' (' + lower(d.name) + ')' : ''); }
  function aspenSub(k, plain) { var G = window.GGParts; if (G && G.word) { var w = G.word(k, { plain: function () { return plain; } }); if (w) return w.charAt(0).toUpperCase() + w.slice(1); } return WORD[k]; }   // aspen PARTS sub 1191
  function cardBody(id, tree, v, i, dated, opts) {
    opts = opts || {};
    var h = '', tries;
    if (tree === 'maple') {   // mpVisitCardHtml 2563
      var k = mpKid(id), plain = mpLocked(id, k) || k.wording === 'plain';
      var strong = (v.s || []).filter(function (x) { return PART_WORD[x]; });
      tries = (v.t || []).filter(function (t) { return PART_WORD[t[0]]; });
      if (dated) h += '<p class="ggv-small ggv-date">' + esc(mpDate(v.d, true)) + '</p>';
      if (strong.length) h += '<p><b>Your strong parts:</b> ' + strong.map(function (x) { return '<span class="ggv-dot" style="background:' + MP_HEX[x] + '" aria-hidden="true"></span>' + esc(PART_WORD[x]); }).join(', ') + '</p>';
      if (tries.length) h += '<p class="ggv-tryh"><b>What you chose to try:</b></p><ul class="ggv-tries">' + tries.map(function (t) { return '<li><b>' + esc(mpNorm(t[0], t[1], plain)) + '</b> <span class="ggv-small">(' + esc(PART_WORD[t[0]]) + ')</span>' + (t[2] ? ': ' + esc(t[2]) : '') + '</li>'; }).join('') + '</ul>';
      h += '<div class="ggv-acts">' + (tries.length ? (allIn(id, tree, v) ? '<span class="ggv-small">These are in your growth plan. Look for them on Today!</span>' : '<button type="button" class="hm-btn sm hm-pill" data-ggv="plan" data-i="' + i + '">Add to My Growth Plan</button>') : '') + '<button type="button" class="hm-btn sm line hm-pill" data-ggv="ask" data-i="' + i + '">Remove This Card</button></div>';
    } else if (tree === 'aspen') {   // visitCardHTML 1623
      var st = asStudent(id), r = GGP.data(id, 'aspen') || {}, ap = st.plainLock === true || r.plainLock === true || (st.wording || r.wording) === 'plain';
      var strongA = (v.s || []).filter(function (x) { return PART_WORD[x]; });
      h += '<p class="ggv-small ggv-date">' + esc(asDate(v.d)) + '</p>';
      if (strongA.length) h += '<p><b>What\'s growing strong:</b> ' + strongA.map(function (x) { return esc(PART_WORD[x]) + ' (' + esc(lower(aspenSub(x, ap))) + ')'; }).join(', ') + '</p>';
      if ((v.t || []).length) h += '<p class="ggv-tryh"><b>Something you want to try:</b></p><ul class="ggv-tries">' + v.t.map(function (t) { return '<li><b>' + esc(t[1]) + '</b>' + (t[2] ? ': ' + esc(t[2]) : '') + '</li>'; }).join('') + '</ul>';
      h += '<div class="ggv-acts"><button type="button" class="hm-btn sm line hm-pill" data-ggv="ask" data-i="' + i + '">Remove This Card</button></div>';
    } else {   // vcCardHtml 2551
      var strongN = (v.s || []).map(function (x) { return adultPartName(id, tree, x); }).filter(Boolean);
      tries = (v.t || []).filter(function (t) { return PART_WORD[t[0]]; });
      if (dated) h += '<p class="ggv-small ggv-date">' + esc(longDate(v.d)) + '</p>';
      if (strongN.length) h += '<p><b>Strong parts:</b> ' + strongN.map(esc).join(', ') + '</p>';
      if (tries.length) h += '<p class="ggv-tryh"><b>What you chose to try:</b></p><ul class="ggv-tries">' + tries.map(function (t) { return '<li><b>' + esc(t[1]) + '</b> <span class="ggv-small">(' + esc(adultPart(id, tree, t[0]).part) + ')</span>' + (t[2] ? ': ' + esc(t[2]) : '') + '</li>'; }).join('') + '</ul>';
      h += '<div class="ggv-acts">' + (tries.length ? (allIn(id, tree, v) ? '<span class="ggv-small">These practices are in your growth plan.</span>' : '<button type="button" class="hm-btn sm hm-pill" data-ggv="plan" data-i="' + i + '">Add to My Growth Plan</button>') : '') + '<button type="button" class="hm-btn sm line hm-pill" data-ggv="ask" data-i="' + i + '">Remove This Card</button></div>';
    }
    if (opts.asking === i) h += '<div class="ggv-confirm" role="group" aria-label="Remove this card"><p>' + (tree === 'aspen' ? 'Remove this card from your tree?' : tree === 'maple' ? 'Remove this card from your tree? Anything you added stays in your growth plan.' : 'Remove this card from your tree? Any practices you added stay in your growth plan.') + '</p><div class="ggv-acts"><button type="button" class="hm-btn sm hm-pill" data-ggv="remove" data-i="' + i + '">Remove</button><button type="button" class="hm-btn sm line hm-pill" data-ggv="keep">Keep It</button></div></div>';
    return h;
  }
  // vcTodayHtml 2558, mpVisitHtml 2569, visitCardsHTML 1630
  function cardsHtml(id, tree, opts) {
    var L = list(id, tree); if (!L.length) return '';
    var last = L.length - 1, v = L[last];
    var head = tree === 'maple' ? 'From your visit on ' + mpDate(v.d) : tree === 'aspen' ? 'From your visit' : 'From your visit on ' + longDate(v.d);
    var h = '<section class="ggv-card ggv-' + tree + '"><h3>' + esc(head) + '</h3>' + cardBody(id, tree, v, last, false, opts);
    if (L.length > 1) h += '<details class="ggv-earlier"' + (opts && opts.asking != null && opts.asking < last ? ' open' : '') + '><summary>Earlier visits (' + (L.length - 1) + ')</summary>' + L.slice(0, -1).map(function (x, j) { return '<div class="ggv-old">' + cardBody(id, tree, x, j, true, opts) + '</div>'; }).reverse().join('') + '</details>';
    h += (tree === 'maple' ? '' : '<p class="ggv-small ggv-foot">' + (tree === 'aspen' ? 'Just for you. If this phone is shared, anyone who can open your tree can see these cards.' : 'Kept in your own locked profile on this device.') + '</p>') + '</section>';
    return h;
  }
  // The waiting card's ask (vcCheck 2599, mpVisitCheck 2611, visitCheck 1645), shown at the top of the window
  function askHtml(id, tree) {
    var v = pending(); if (!v) return '';
    var nm = NAME[tree] || 'Grounded', p = prof(id), who = String(p.name || '').trim();
    var intro;
    if (tree === 'maple') intro = '<p>' + (v.n ? esc(v.n) + ', here' : 'Here') + ' is a card from your Maple visit on ' + esc(mpDate(v.d, true)) + '! It shows your strong parts and what you chose to try. It goes on your own tree.</p><p class="ggv-small">Grown-ups: the card holds only a first name, the date, the strong parts, and the practices chosen. You can remove it any time.</p>' + (v.pl === 1 ? '<p class="ggv-small"><b>For Grown-ups:</b> The Maple Guide\'s school or group uses Plain wording, so adding this card sets this child\'s Maple to Plain wording, locked, to match.</p>' : '');
    else if (tree === 'aspen') intro = '<p>' + (v.n ? esc(v.n) + ', here' : 'Here') + ' is a card from your Aspen visit on ' + esc(asDate(v.d)) + ': what\'s growing strong and what you want to try. It goes on your own tree, just for you.</p><p class="ggv-small">If this phone is shared with family, anyone who can open your tree can see it. You can remove it any time.</p>' + (v.pl === 1 ? '<p class="ggv-small"><b>For grown-ups:</b> The Aspen Guide\'s school or group uses Plain wording, so adding this card sets this student\'s Aspen to Plain wording, locked, to match.</p>' : '');
    else intro = '<p>' + (v.n ? esc(v.n) + ', here' : 'Here') + ' is a card from your ' + nm + ' Guide visit on ' + esc(longDate(v.d)) + ': your strong parts and what you chose to try. It goes on your own tree, kept in your own locked profile.</p><p class="ggv-small">You can remove it any time.</p>';
    var why = canSave(id, tree), kid = tree === 'maple' || tree === 'aspen';
    var drop = '<button type="button" class="hm-btn sm line hm-pill" data-ggv="drop">' + (tree === 'pine' || kid ? 'Skip for Now' : 'Leave It Off') + '</button>';
    var later = '<button type="button" class="hm-btn sm line hm-pill" data-ggv="later">Maybe Later</button>';
    var h = '<section class="ggv-card ggv-ask" aria-labelledby="ggv-ask-h"><h3 id="ggv-ask-h">A card from your visit</h3>' + intro;
    if (why) return h + '<p>' + esc(why) + '</p><div class="ggv-acts">' + later + drop + '</div></section>';
    var first = lower(who.split(/\s+/)[0]), other = !kid && !!(v.n && first && first !== lower(v.n));
    h += '<p>Add it to ' + esc(who) + '\'s tree?</p>' + (other ? '<p class="ggv-small">This card is for ' + esc(v.n) + '. If ' + esc(v.n) + ' has a profile on this device, choose Switch Person.</p>' : '');
    return h + '<div class="ggv-acts"><button type="button" class="hm-btn sm hm-pill" data-ggv="add">' + (kid ? 'Add to ' + esc(who) + '\'s Tree' : 'Add to My Tree') + '</button>' + (other ? '<button type="button" class="hm-btn sm line hm-pill" data-ggv="switch">Switch Person</button>' : '') + later + drop + '</div></section>';
  }
  // For Home's Today: the waiting card, or the newest saved one (vcTodayHtml shows on the tree's Today)
  function todayHtml(id, tree) {
    var v = pending(), L = list(id, tree);
    if (!v && !L.length) return '';
    var head, sub, btn;
    if (v && !canSave(id, tree)) { head = 'A card from your visit'; sub = 'Your strong parts and what you chose to try, ready to add to your tree.'; btn = 'See My Card'; }
    else if (L.length) { var last = L[L.length - 1], tries = (last.t || []).length; head = 'From your visit on ' + (tree === 'maple' ? mpDate(last.d) : longDate(last.d)); sub = tries ? tries + (tries === 1 ? ' practice' : ' practices') + ' you chose to try' + (L.length > 1 ? ', and ' + (L.length - 1) + ' earlier ' + (L.length === 2 ? 'visit' : 'visits') : '') + '.' : 'Your strong parts from your visit.'; btn = 'Open My Visit Card'; }
    else return '';
    return '<article class="hm-card hm-p-fruit ggv-today"><div class="hm-hd"><span class="hm-badge hm-pb" aria-hidden="true"><img src="' + ART + '" alt="" loading="lazy" decoding="async"></span><div style="min-width:0"><div class="hm-k">From Your Visit</div><h3 class="hm-h3">' + esc(head) + '</h3></div></div>' +
      '<p class="hm-sub">' + esc(sub) + '</p><div class="hm-acts tight"><button type="button" class="hm-pill" data-hm-tool="visit">' + esc(btn) + '</button></div></article>';
  }

  var CSS = '.ggv{color:var(--ink);line-height:1.55;font-size:16.5px;max-width:760px;margin:0 auto;overflow-wrap:anywhere}.ggv *{box-sizing:border-box}' +
    '.ggv-art{position:relative;margin:0 0 14px;border-radius:var(--r,22px);overflow:hidden;background:var(--bg-deep);aspect-ratio:16/6}.ggv-art img{display:block;width:100%;height:100%;object-fit:cover}' +
    '.ggv-art figcaption{position:absolute;left:0;right:0;bottom:0;padding:26px 18px 12px;background:linear-gradient(transparent,rgba(20,14,8,.72));color:#fff}' +
    '.ggv-art figcaption small{display:block;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;opacity:.92}.ggv-art figcaption b{display:block;font-family:"Barlow Condensed",sans-serif;font-size:28px;line-height:1.1}' +
    '@media (max-width:560px){.ggv-art{aspect-ratio:16/9}.ggv-art figcaption b{font-size:23px}}' +
    '.ggv-card{padding:14px 16px;border-radius:18px;background:var(--card);border:1px solid var(--line);border-left:5px solid var(--gold);box-shadow:var(--shadow);margin:0 0 14px}.ggv-maple{border-left:6px solid #2F7FB8}' +
    '.ggv-ask{border:2px solid var(--gold-soft)}.ggv-card h3{margin:0 0 8px;font-size:19px}.ggv-card p{margin:0 0 8px}' +
    '.ggv-small{font-size:14.5px;color:var(--ink-soft)}.ggv-date{margin:0 0 6px}.ggv-tryh{margin-top:8px}.ggv-tries{margin:4px 0 0;padding-left:22px}.ggv-tries li{margin:3px 0}' +
    '.ggv-dot{display:inline-block;width:12px;height:12px;border-radius:50%;vertical-align:-1px;margin-right:4px}' +
    '.ggv-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:10px 0 0}' +
    '.ggv-earlier{margin-top:12px}.ggv-earlier summary{cursor:pointer;font-weight:600;color:var(--gold)}.ggv-old{margin-top:12px;padding-top:10px;border-top:1px solid var(--line)}' +
    '.ggv-confirm{margin:10px 0 0;padding:12px 14px;border-radius:14px;background:var(--card-2);border:1px solid var(--line)}.ggv-foot{margin-top:12px}' +
    '.ggv-empty p{margin:0 0 8px}';

  function open(ctx) {
    var tree = ctx.tree, id = ctx.id, root = document.createElement('div'), asking = null;
    css('ggscr-visit-css', CSS);
    root.className = 'ggv'; ctx.host.appendChild(root);
    var toast = function (m) { if (m && ctx.toast) ctx.toast(m); };
    function draw() {
      var h = '<figure class="ggv-art"><img src="/shared/heroes/' + tree + '-wide.webp" alt="" loading="lazy"><figcaption><small>' + esc((NAME[tree] || '') + ' Guide visit') + '</small><b>From Your Visit</b></figcaption></figure>';
      var ask = askHtml(id, tree), cards = cardsHtml(id, tree, { asking: asking });
      h += ask + cards;
      if (!ask && !cards) h += '<section class="ggv-card ggv-empty"><p>When you meet with a Grounded Guide, they can show you a Bring It Home code at the end of your visit. Scan it with this device, and your strong parts and the practices you chose to try land right here, on your own tree.</p></section>';
      root.innerHTML = h;
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-ggv]'); if (!b) return;
      var k = b.getAttribute('data-ggv'), i = +b.getAttribute('data-i');
      if (k === 'add') { b.disabled = true; save(id, tree).then(function (r) { toast(r.msg); if (r.ok) ctx.changed(); draw(); }); return; }
      if (k === 'later') { ctx.close(); return; }
      if (k === 'drop') { clear(); toast(tree === 'pine' || tree === 'maple' || tree === 'aspen' ? 'The card was set aside.' : 'Your tree stays as it was.'); draw(); if (!list(id, tree).length) ctx.close(); return; }
      if (k === 'switch') { ctx.close(); if (window.GGP && GGP.lock) GGP.lock(); toast('Locked. Choose who is tending.'); return; }   // oakSwitch 2789
      if (k === 'plan') { addPlan(id, tree, i).then(function (r) { toast(r.msg); if (r.n) ctx.changed(); draw(); }); return; }
      if (k === 'ask') { asking = i; draw(); var c = root.querySelector('.ggv-confirm'); if (c) c.scrollIntoView({ block: 'nearest' }); return; }
      if (k === 'keep') { asking = null; draw(); return; }
      if (k === 'remove') { asking = null; remove(id, tree, i).then(function (ok) { if (ok) { toast('Card removed.'); ctx.changed(); } draw(); }, function () { toast('Let\'s try that again: open your profile and save once more.'); draw(); }); return; }
    });
    draw();
    return { close: function () { root.remove(); } };
  }

  window.GGVisit = { take: take, pending: pending, clear: clear, canSave: canSave, save: save, list: list, addPlan: addPlan, remove: remove,
    cardsHtml: function (id, tree) { return cardsHtml(id, tree, {}); }, askHtml: askHtml, todayHtml: todayHtml, unpack: vunpack };
  GGScreen.visit = {
    trees: TREES.slice(),
    title: function () { return 'From Your Visit'; },
    files: function (tree) { if (PRAC[tree]) return [PRAC[tree][0]]; if (tree === 'maple') return ['/shared/home/visitdata.js?v=' + V]; return []; },
    open: open
  };
})();
