/* =====================================================================
   HEALTH AND ABILITY (shared/gg-life.js), GWG BLD 756, HA 1
   A person chooses what is part of their life right now (a condition, a
   disability, more than one, none, or "I'd rather not say"), changeable any
   time. The choice only adds and reorders: guides, practices, and videos
   that fit show first, with a few examples and help lines. Questions,
   scores, flags, alerts, and crisis lines never change because of it.

   Where it is kept
   - Inside the person's locked vault (gg-profiles.js), at the top beside
     email, as vault.life, shared by every tree. The offer card's "shown"
     date is vault.lifeOffer (it holds nothing about health).
   - Guests: in memory for this page visit only. Nothing is ever written to
     browser storage outside the lock, and nothing here ever travels: not in
     a Grove handoff, a Visit card, Share to Family, a Willow card, or a plan.
   - Helpers (Birch, Sequoia): private unless the person turns on
     "Share My Health and Ability with my helpers".

   The full API is in the header comments below each section, and in the
   build notes (P/L/API.md). In short:
     GGLife.CATS, cats(tree), get(id), set(obj, id), clear(id), has(),
     chosen(tree), gentle(), fits(tags, adapt), order(rows, tagOf),
     lines(tree), picks(tree, guides), addGuides(tree, guides),
     label(tree, grownView), chooser(host, opt), dialog(tree, opt),
     offerCard(host, tree, opt), use(id), who(), on(fn)
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGLife) return;

  var TREES = ['maple', 'aspen', 'pine', 'birch', 'oak', 'sequoia'];
  var KIDS = ['maple', 'aspen'];
  var HELPER_TREES = ['birch', 'sequoia'];

  /* ---------- the categories (conditions-plan.md, Section 2, decided October 7, 2026) ----------
     words and line per tree. A tree is offered a category only when it is in trees. */
  function same(name) { var o = {}; TREES.forEach(function (t) { o[t] = name; }); return o; }
  function over(base, o) { var r = {}; TREES.forEach(function (t) { r[t] = o[t] != null ? o[t] : base[t]; }); return r; }
  var CATS = [
    { id: 'health', trees: TREES,
      words: over(same('A Long-Term Health Condition'), { maple: 'A Health Condition', aspen: 'A Health Condition' }),
      line: over(same('Like asthma, diabetes, epilepsy, allergies, or heart or lung disease.'), {
        maple: 'Like asthma, allergies, diabetes, or seizures, or a body that hurts or gets sick a lot.',
        aspen: 'Like asthma, allergies, diabetes, or epilepsy, something you take care of every day.' }) },
    { id: 'pain', trees: ['aspen', 'pine', 'birch', 'oak', 'sequoia'],
      words: over(same('Chronic Pain or Fatigue'), { aspen: 'Pain or Headaches That Keep Coming Back' }),
      line: over(same('Pain or tiredness that stays, or keeps coming back.'), {
        aspen: 'Headaches, stomachaches, or other pain or tiredness that keeps coming back.' }) },
    { id: 'moving', trees: TREES,
      words: same('Moving Differently'),
      line: over(same('A wheelchair, crutches, braces, a cane, or a body that moves its own way.'), {
        maple: 'A wheelchair, braces, crutches, or a body that moves its own way.' }) },
    { id: 'hearing', trees: TREES,
      words: over(same('Deaf or Hard of Hearing'), { maple: 'Hearing Differently' }),
      line: over(same('Hearing a little, a lot, or not at all, with or without hearing aids or sign language.'), {
        maple: 'Hearing aids, sign language, or hearing a little or not at all.' }) },
    { id: 'seeing', trees: TREES,
      words: over(same('Blind or Low Vision'), { maple: 'Seeing Differently' }),
      line: over(same('Seeing a little or not at all, with or without a cane, a guide dog, or a screen reader.'), {
        maple: 'Seeing a little or not at all, even with glasses.' }) },
    { id: 'learning', trees: ['maple', 'aspen', 'pine', 'birch', 'oak'],
      words: same('Learning and Attention'),
      line: over(same('ADHD, dyslexia, and other ways a brain learns and focuses.'), {
        maple: 'ADHD, dyslexia, or a brain that learns and focuses its own way.' }) },
    { id: 'autism', trees: TREES,
      words: over(same('Autism or a Developmental Disability'), { maple: 'Autism and Different Ways of Thinking', sequoia: 'A Lifelong or Developmental Disability' }),
      line: over(same('Autism, an intellectual disability, or another lifelong difference in how a person grows and thinks.'), {
        maple: 'Autism, or a brain that thinks and feels the world its own way.',
        sequoia: 'A disability lived with since early in life, like autism or an intellectual disability.' }) },
    { id: 'mind', trees: ['aspen', 'pine', 'birch', 'oak', 'sequoia'],
      words: over(same('A Mental Health Condition'), { aspen: 'Mental Health, With a Counselor\'s or Doctor\'s Help', pine: 'Mental Health, With a Counselor\'s or Doctor\'s Help' }),
      line: over(same('Like depression, anxiety, bipolar disorder, or PTSD, often with help from a counselor or doctor.'), {
        aspen: 'Like anxiety or depression, with a counselor or doctor helping.',
        pine: 'Like anxiety, depression, or OCD, with a counselor or doctor helping.' }) },
    { id: 'serious', trees: ['pine', 'birch', 'oak', 'sequoia'],
      words: same('A Serious Illness or Treatment Right Now'),
      line: same('Like cancer, a transplant, or long hospital stays.') },
    { id: 'memory', trees: ['oak', 'sequoia'],
      words: same('Memory, Thinking, or a Brain Injury'),
      line: same('Memory changes, a stroke, a brain injury, or thinking that works differently than it did.') },
    { id: 'close', trees: TREES,
      words: over(same('Someone Close to Me Lives With One'), { maple: 'Someone in Our Family' }),
      line: over(same('A parent, child, partner, brother or sister, or friend living with any of these.'), {
        maple: 'A brother, sister, parent, or grandparent who lives with any of these.',
        aspen: 'A parent, brother, sister, or grandparent living with any of these.',
        pine: 'A parent, brother, sister, grandparent, or friend living with any of these.' }) },
    { id: 'none', special: true, trees: TREES, words: same('None Right Now'), line: same('Nothing to choose today. Come back any time.') },
    { id: 'rather', special: true, trees: TREES, words: same('I\'d Rather Not Say'), line: same('Gentler ways show first, without naming anything.') }
  ];
  var CAT = {}; CATS.forEach(function (c) { CAT[c.id] = c; });
  var IDS = CATS.filter(function (c) { return !c.special; }).map(function (c) { return c.id; });

  /* ---------- help lines: information and support, always BELOW the crisis lines ----------
     From conditions-research.md, Section 4: Minnesota first, then national. Numbers marked
     confirmed there on October 7, 2026; recheck before each release. Lines and links whose
     source could not be confirmed are left out. */
  var LINES = {
    asl988: { name: '988 Lifeline in ASL', how: 'Videophone in ASL, or text 988', sms: '988', url: 'https://988lifeline.org/', note: 'For Deaf and hard of hearing callers: tap ASL Now on the 988 website to reach a counselor who signs. Call or text 988 any time.' },
    dhub: { name: 'Disability Hub MN', how: '1-866-333-2466', tel: '18663332466', url: 'https://disabilityhubmn.org/', note: 'Help finding health, housing, independent living, and money resources in Minnesota.' },
    pacer: { name: 'PACER Center', how: '952-838-9000', tel: '9528389000', url: 'https://www.pacer.org/', note: 'For families of children and young adults with any disability, birth to 21: school plans, mental health, and what comes next.', grownup: true },
    nami: { name: 'NAMI HelpLine', how: '1-800-950-6264', tel: '18009506264', sms: '62640', smsBody: 'helpline', url: 'https://www.nami.org/talktous', note: 'Information and peer support for people with mental health conditions and their families, weekdays 10 a.m. to 10 p.m. Eastern. Not a crisis line.' },
    aging: { name: 'Minnesota Aging Pathways', how: '1-800-333-2433', tel: '18003332433', note: 'Minnesota\'s line for older adults and family caregivers: help at home, caregiving, and planning ahead.' },
    smrc: { name: 'Self-Management Resource Center', how: 'Find a workshop', url: 'https://selfmanagementresource.com/', note: 'Six-week workshops for living well with a long-term condition or pain, led by people who live with one.' },
    transition: { name: 'Got Transition', how: 'Open the website', url: 'https://gottransition.org/six-core-elements', note: 'Help for teens and young adults moving from children\'s health care to adult health care.' },
    sibs: { name: 'Sibling Support Project', how: 'Open the website', url: 'https://siblingsupport.org/', note: 'Sibshops and support for brothers and sisters of people with disabilities or health needs.', grownup: true },
    aacy: { name: 'American Association of Caregiving Youth', how: 'Open the website', url: 'https://aacy.org/', note: 'Support for kids and teens who help care for someone in their family.' },
    cpn: { name: 'Courageous Parents Network', how: 'Open the website', url: 'https://courageousparentsnetwork.org/', note: 'Videos, guides, and community for parents caring for a child with a serious medical condition.' }
  };
  Object.keys(LINES).forEach(function (k) { LINES[k].id = 'life-' + k; LINES[k].show = LINES[k].how; });
  var KIDLINES = { health: ['pacer'], pain: ['pacer'], moving: ['pacer'], hearing: ['asl988', 'pacer'], seeing: ['pacer'], learning: ['pacer'], autism: ['pacer'], mind: ['nami', 'pacer'], close: ['sibs', 'nami'] };
  var LINEMAP = {
    maple: KIDLINES,
    aspen: KIDLINES,
    pine: { health: ['transition', 'pacer'], pain: ['transition', 'pacer'], moving: ['pacer'], hearing: ['asl988', 'pacer'], seeing: ['pacer'], learning: ['pacer'], autism: ['pacer'], mind: ['nami'], serious: ['transition'], close: ['aacy', 'sibs', 'nami'] },
    birch: { health: ['transition', 'smrc'], pain: ['smrc'], moving: ['dhub'], hearing: ['asl988', 'dhub'], seeing: ['dhub'], learning: ['dhub', 'pacer'], autism: ['dhub', 'pacer'], mind: ['nami'], serious: ['dhub'], close: ['nami', 'dhub'] },
    oak: { health: ['smrc'], pain: ['smrc'], moving: ['dhub'], hearing: ['asl988', 'dhub'], seeing: ['dhub'], learning: ['dhub'], autism: ['dhub'], mind: ['nami'], serious: ['smrc', 'dhub'], memory: ['dhub', 'aging'], close: ['nami', 'pacer', 'cpn', 'aging'] },
    sequoia: { health: ['smrc', 'aging'], pain: ['smrc'], moving: ['aging', 'dhub'], hearing: ['asl988', 'aging'], seeing: ['aging', 'dhub'], autism: ['dhub'], mind: ['nami'], serious: ['aging'], memory: ['aging'], close: ['aging', 'nami'] }
  };

  /* ---------- small helpers ---------- */
  function today() { var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); }; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function blank() { return { ids: [], none: false, rather: false, gentle: false, shareHelpers: false, set: '' }; }
  function clean(o) {
    var r = blank(); if (!o || typeof o !== 'object') return r;
    (Array.isArray(o.ids) ? o.ids : []).forEach(function (id) { if (IDS.indexOf(id) >= 0 && r.ids.indexOf(id) < 0) r.ids.push(id); });
    r.none = !!o.none && !r.ids.length; r.rather = !!o.rather && !r.ids.length && !r.none;
    r.gentle = !!o.gentle; r.shareHelpers = !!o.shareHelpers;
    r.set = /^\d{4}-\d\d-\d\d$/.test(String(o.set || '')) ? o.set : '';
    return r;
  }
  function copy(o) { return clean(o); }
  function isEmpty(c) { return !c.ids.length && !c.none && !c.rather && !c.gentle && !c.shareHelpers; }
  function treeOk(t) { return TREES.indexOf(t) >= 0; }

  /* ---------- whose choice ---------- */
  var ctx = null;            // an app's chosen profile id (GGLife.use)
  var MEM = blank();         // guests: this page visit only
  var MEMOFFER = {};         // guests: the offer card shown this visit
  function P() { return window.GGP || null; }
  function activeId() { var g = P(), a = g && g.active && g.active(); return a ? a.id : null; }
  function who() { var g = P(); if (ctx && g && g.isOpen && g.isOpen(ctx)) return ctx; return activeId(); }
  // A helper looking at another grown-up's profile: they see the choice only if the person shares it.
  function helperView(id) {
    var g = P(), a = activeId(); if (!g || !id || !a || id === a) return false;
    var me = g.get(a), them = g.get(id);
    return !!(me && them && me.age === 'adult' && them.age === 'adult');
  }
  function vault(id) { var g = P(); return g && id && g.data ? g.data(id) : null; }
  function get(id) {
    id = id || who();
    if (!id) return copy(MEM);
    var v = vault(id); if (!v) return blank();
    var c = copy(v.life);
    if (helperView(id) && !c.shareHelpers) return blank();
    return c;
  }
  function fire(id) { try { window.dispatchEvent(new CustomEvent('gglife:change', { detail: { id: id || null, choice: get(id) } })); } catch (e) {} }
  function set(obj, id) {
    id = id || who();
    if (id && helperView(id)) return Promise.reject(new Error('Only the person can change this.'));
    var cur = id ? (function () { var v = vault(id); return v ? copy(v.life) : null; })() : copy(MEM);
    if (id && !cur) return Promise.reject(new Error('Open the profile first.'));
    if (obj === null) return clear(id);
    var next = clean(Object.assign({}, cur, obj || {}));
    next.set = today();
    if (!id) { MEM = next; fire(null); return Promise.resolve(copy(next)); }
    var v = vault(id);
    if (isEmpty(next)) delete v.life; else v.life = next;
    return Promise.resolve(P().save(id)).then(function () { fire(id); return copy(next); });
  }
  function clear(id) {
    id = id || who();
    if (id && helperView(id)) return Promise.reject(new Error('Only the person can change this.'));
    if (!id) { MEM = blank(); fire(null); return Promise.resolve(blank()); }
    var v = vault(id); if (!v) return Promise.reject(new Error('Open the profile first.'));
    delete v.life;
    return Promise.resolve(P().save(id)).then(function () { fire(id); return blank(); });
  }

  /* ---------- reading the choice ---------- */
  function cats(tree) { return CATS.filter(function (c) { return !c.special && c.trees.indexOf(tree) >= 0; }).map(function (c) { return { id: c.id, name: c.words[tree], line: c.line[tree] }; }); }
  function has() { return get().ids.length > 0; }
  function chosen(tree) { var c = get(); return cats(tree).filter(function (x) { return c.ids.indexOf(x.id) >= 0; }).map(function (x) { return x.id; }); }
  function gentle() { var c = get(); return !!(c.gentle || c.rather); }
  function fits(tags, adapt) {
    var life = tags, ad = adapt;
    if (tags && !Array.isArray(tags) && typeof tags === 'object') { life = tags.life; ad = ad || tags.adapt; }
    life = Array.isArray(life) ? life : [];
    var c = get();
    if (life.some(function (t) { return c.ids.indexOf(t) >= 0; })) return true;
    return !!((c.gentle || c.rather) && (life.indexOf('gentle') >= 0 || !!ad));
  }
  function order(rows, tagOf) {
    var list = Array.isArray(rows) ? rows.slice() : [];
    var f = typeof tagOf === 'function' ? tagOf : function (r) { return r && (r.life || r.adapt) ? { life: r.life, adapt: r.adapt } : []; };
    var yes = [], no = [];
    list.forEach(function (r) { (fits(f(r)) ? yes : no).push(r); });
    return yes.concat(no);
  }
  function lines(tree) {
    var map = LINEMAP[tree]; if (!map) return [];
    var out = [], seen = {};
    chosen(tree).forEach(function (id) { (map[id] || []).forEach(function (k) { if (!seen[k] && LINES[k]) { seen[k] = 1; out.push(Object.assign({}, LINES[k])); } }); });
    return out;
  }
  var GUIDES = {};
  function addGuides(tree, list) { if (treeOk(tree) || tree === 'grove') GUIDES[tree] = Array.isArray(list) ? list : []; }
  function picks(tree, list) {
    var ids = chosen(tree); if (!ids.length) return [];
    var src = Array.isArray(list) ? list : (GUIDES[tree] || []);
    return src.filter(function (g) { return g && Array.isArray(g.life) && g.life.some(function (t) { return ids.indexOf(t) >= 0; }); }).map(function (g) { return g.id; });
  }
  function label(tree, grownView) { return grownView ? 'Their Health and Ability' : 'Health and Ability'; }

  /* ---------- look and feel ---------- */
  var CSS = '' +
    '.gglife{--gl-bg:#FAF7F2;--gl-card:#FFFFFF;--gl-ink:#2C1810;--gl-soft:#6B5A48;--gl-line:#E6D9C2;--gl-gold:#8B5E1A;--gl-gold-soft:#F4EAD6;--gl-on-gold:#FFFFFF;--gl-ok:#4E6A3B;}' +
    '.gglife,.gglife *{box-sizing:border-box;}' +
    '.gglife{color:var(--gl-ink);font:16px/1.5 Barlow,system-ui,sans-serif;text-align:left;}' +
    '.gglife h2,.gglife h3{font:600 26px/1.15 "Cormorant Garamond",Georgia,serif;margin:0 0 6px;color:var(--gl-ink);}' +
    '.gglife p{margin:0 0 10px;}' +
    '.gglife .gl-intro{color:var(--gl-soft);font-size:15px;}' +
    '.gglife .gl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px;margin:12px 0;}' +
    '.gglife .gl-box{display:flex;gap:10px;align-items:flex-start;width:100%;min-height:48px;padding:10px 12px;border:1.5px solid var(--gl-line);border-radius:12px;background:var(--gl-card);color:var(--gl-ink);cursor:pointer;font:15px/1.35 Barlow,system-ui,sans-serif;text-align:left;text-transform:none;letter-spacing:0;}' +
    '.gglife .gl-box:hover{border-color:var(--gl-gold);}' +
    '.gglife .gl-box:focus-visible,.gglife .gl-b:focus-visible,.gglife .gl-link:focus-visible,.gglife .gl-sw:focus-visible{outline:3px solid var(--gl-gold);outline-offset:2px;}' +
    '.gglife .gl-box[aria-pressed=true]{border-color:var(--gl-gold);background:var(--gl-gold-soft);}' +
    '.gglife .gl-tick{flex:none;width:22px;height:22px;border-radius:6px;border:2px solid var(--gl-gold);display:grid;place-items:center;margin-top:1px;color:var(--gl-on-gold);}' +
    '.gglife .gl-box[aria-pressed=true] .gl-tick{background:var(--gl-gold);}' +
    '.gglife .gl-box b{display:block;font-weight:600;}' +
    '.gglife .gl-box small{display:block;color:var(--gl-soft);font-size:13.5px;margin-top:2px;}' +
    '.gglife .gl-specials{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px;margin:0 0 6px;}' +
    '.gglife .gl-sw{display:flex;gap:12px;align-items:flex-start;width:100%;padding:12px 2px;border:0;border-top:1px solid var(--gl-line);background:none;color:var(--gl-ink);cursor:pointer;font:15px/1.4 Barlow,system-ui,sans-serif;text-align:left;text-transform:none;letter-spacing:0;}' +
    '.gglife .gl-sw b{display:block;font-weight:600;}.gglife .gl-sw small{display:block;color:var(--gl-soft);font-size:13.5px;}' +
    '.gglife .gl-track{flex:none;width:46px;height:28px;border-radius:999px;background:var(--gl-line);position:relative;margin-top:1px;transition:background .2s;}' +
    '.gglife .gl-track:after{content:"";position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:#FFFFFF;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:left .2s;}' +
    '.gglife .gl-sw[aria-checked=true] .gl-track{background:var(--gl-gold);}.gglife .gl-sw[aria-checked=true] .gl-track:after{left:21px;}' +
    '.gglife .gl-foot{display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;justify-content:space-between;margin-top:10px;}' +
    '.gglife .gl-link{background:none;border:0;padding:6px 0;color:var(--gl-gold);font:inherit;font-size:15px;text-decoration:underline;cursor:pointer;text-transform:none;letter-spacing:0;}' +
    '.gglife .gl-status{color:var(--gl-ok);font-size:14px;min-height:1.3em;margin:6px 0 0;}' +
    '.gglife .gl-b{font:600 15px Barlow,system-ui,sans-serif;border-radius:999px;padding:11px 20px;min-height:44px;cursor:pointer;border:1px solid var(--gl-gold);background:transparent;color:var(--gl-gold);text-transform:none;letter-spacing:0;}' +
    '.gglife .gl-b.gl-go{background:var(--gl-gold);color:var(--gl-on-gold);}' +
    '.gglife.gl-card{background:var(--gl-card);border:1px solid var(--gl-line);border-left:5px solid var(--gl-gold);border-radius:14px;padding:14px 16px;margin:14px 0;box-shadow:0 4px 14px rgba(44,24,16,.05);}' +
    '.gglife.gl-card p{margin:0 0 10px;font-size:16px;}' +
    '.gglife.gl-card .gl-row{display:flex;flex-wrap:wrap;gap:8px;}' +
    '.gglife-back{position:fixed;inset:0;z-index:9995;background:rgba(20,16,12,.55);display:flex;align-items:flex-start;justify-content:center;padding:4vh 14px;overflow-y:auto;}' +
    '.gglife-back .gl-dlg{width:min(640px,100%);background:var(--gl-bg);border-radius:20px;box-shadow:0 24px 60px rgba(0,0,0,.3);padding:24px 22px 20px;margin:auto 0;}' +
    '@media (max-width:520px){.gglife .gl-grid,.gglife .gl-specials{grid-template-columns:1fr;}.gglife-back .gl-dlg{padding:20px 16px 16px;}}' +
    '@media (prefers-reduced-motion: reduce){.gglife .gl-track,.gglife .gl-track:after{transition:none;}}';
  var DARK = '.gglife{--gl-bg:#1E1A15;--gl-card:#28221B;--gl-ink:#F3EDE3;--gl-soft:#C2B6A4;--gl-line:#4A4034;--gl-gold:#D9A847;--gl-gold-soft:#342A1D;--gl-on-gold:#1E1A15;--gl-ok:#A9C79A;}';
  function addCSS() {
    if (document.getElementById('gglife-css')) return;
    var s = document.createElement('style'); s.id = 'gglife-css';
    s.textContent = CSS + '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) ' + DARK + '}:root[data-theme="dark"] ' + DARK;
    document.head.appendChild(s);
  }
  var TICK = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
  var uidN = 0;

  /* ---------- the chooser: one short screen ---------- */
  function chooser(host, opt) {
    opt = opt || {}; addCSS();
    var tree = treeOk(opt.tree) ? opt.tree : 'oak', kid = !!opt.forChild, pid = opt.id || null, n = ++uidN;
    var wrap = document.createElement('div'); wrap.className = 'gglife'; host.innerHTML = ''; host.appendChild(wrap);
    var helperOn = HELPER_TREES.indexOf(tree) >= 0;
    function paint(msg) {
      var c = get(pid), list = cats(tree), guest = !(pid || who());
      var intro = kid
        ? 'Choose together anything that\'s part of their life right now, or none. It changes only which guides, practices, and videos show first, and adds a few examples and help lines. Their questions and scores stay the same. It stays locked on this device, and you can change it any time.'
        : 'Choose anything that\'s part of your life right now, or none. It changes only which guides, practices, and videos show first, and adds a few examples and help lines. Your questions and scores stay the same. It stays locked on this device, and you can change it any time.';
      var box = function (id, name, line, on, kind) {
        return '<button type="button" class="gl-box" data-gl="' + kind + '" data-id="' + id + '" aria-pressed="' + on + '"><span class="gl-tick">' + (on ? TICK : '') + '</span><span><b>' + esc(name) + '</b><small>' + esc(line) + '</small></span></button>';
      };
      var sw = function (key, name, line, on) {
        return '<button type="button" class="gl-sw" role="switch" data-gl="sw" data-id="' + key + '" aria-checked="' + on + '"><span class="gl-track" aria-hidden="true"></span><span><b>' + esc(name) + '</b><small>' + esc(line) + '</small></span></button>';
      };
      wrap.innerHTML = '<h3 id="gl-h-' + n + '">' + esc(label(tree, kid)) + '</h3>' +
        '<p class="gl-intro">' + esc(intro) + '</p>' +
        '<div class="gl-grid" role="group" aria-labelledby="gl-h-' + n + '">' + list.map(function (x) { return box(x.id, x.name, x.line, c.ids.indexOf(x.id) >= 0, 'id'); }).join('') + '</div>' +
        '<div class="gl-specials">' + box('none', CAT.none.words[tree], CAT.none.line[tree], c.none, 'sp') + box('rather', CAT.rather.words[tree], CAT.rather.line[tree], c.rather, 'sp') + '</div>' +
        sw('gentle', 'Show Gentler Ways First', 'Practices with a seated, lying down, short, or low-energy way come first, and show that way.' + (c.rather ? ' On while I\'d Rather Not Say is chosen.' : ''), c.gentle || c.rather) +
        (helperOn ? sw('shareHelpers', 'Share My Health and Ability with my helpers', c.shareHelpers ? 'On. Helpers you added can see these choices, so they can help in ways that fit.' : 'Off. These choices stay private to you until you turn this on.', c.shareHelpers) : '') +
        '<div class="gl-foot"><button type="button" class="gl-link" data-gl="clear">Clear My Choices</button>' +
        (opt.onDone ? '<button type="button" class="gl-b gl-go" data-gl="done">Done</button>' : '') + '</div>' +
        '<p class="gl-status" role="status" aria-live="polite">' + esc(msg || (guest ? 'Kept for this visit only. Open a profile to keep it, locked on this device.' : (c.set ? 'Saved, locked on this device.' : ''))) + '</p>';
    }
    function save(patch, msg) {
      var go = patch === null ? clear(pid) : set(patch, pid);
      return go.then(function () { paint(msg); }, function (e) { paint(e && e.message ? e.message : 'That did not save. Try again.'); });
    }
    wrap.addEventListener('click', function (e) {
      var b = e.target.closest('[data-gl]'); if (!b || !wrap.contains(b)) return;
      var k = b.getAttribute('data-gl'), id = b.getAttribute('data-id'), c = get(pid), focusSel = '[data-gl="' + k + '"]' + (id ? '[data-id="' + id + '"]' : '');
      var after = function () { var f = wrap.querySelector(focusSel); if (f) f.focus(); };
      if (k === 'id') { var ids = c.ids.slice(), i = ids.indexOf(id); if (i >= 0) ids.splice(i, 1); else ids.push(id); save({ ids: ids, none: false, rather: false }).then(after); }
      else if (k === 'sp') {
        if (id === 'none') save({ ids: [], none: !c.none, rather: false }).then(after);
        else save({ ids: [], none: false, rather: !c.rather }).then(after);
      }
      else if (k === 'sw') { var p = {}; if (id === 'gentle' && c.rather) { save({}, 'Gentler ways stay first while I\'d Rather Not Say is chosen.').then(after); return; } p[id] = !c[id]; save(p).then(after); }
      else if (k === 'clear') { if (!confirm(kid ? 'Clear these choices? They are erased from this profile.' : 'Clear your choices? They are erased from your profile.')) return; save(null, 'Cleared. Nothing is kept.').then(function () { var f = wrap.querySelector('.gl-box'); if (f) f.focus(); }); }
      else if (k === 'done') { if (opt.onDone) opt.onDone(get(pid)); }
    });
    paint();
    return { el: wrap, refresh: function () { paint(); } };
  }

  /* ---------- the chooser in a dialog (Manage My Profile, the offer card) ---------- */
  function dialog(tree, opt) {
    opt = opt || {}; addCSS();
    return new Promise(function (resolve) {
      var back = document.createElement('div'); back.className = 'gglife-back gglife';
      back.innerHTML = '<div class="gl-dlg" role="dialog" aria-modal="true" aria-label="' + esc(label(tree, opt.forChild)) + '"></div>';
      document.body.appendChild(back);
      var box = back.firstChild, last = document.activeElement, done = false;
      function close() {
        if (done) return; done = true; back.remove(); document.removeEventListener('keydown', key, true);
        if (last && last.focus) try { last.focus(); } catch (e) {}
        var c = get(opt.id); if (opt.onDone) opt.onDone(c); resolve(c);
      }
      function key(e) {
        if (e.key === 'Escape') { e.stopPropagation(); close(); return; }
        if (e.key === 'Tab') {
          var f = box.querySelectorAll('button,a[href],input,select'); if (!f.length) return;
          var a = f[0], z = f[f.length - 1];
          if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
          else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
        }
      }
      document.addEventListener('keydown', key, true);
      back.addEventListener('click', function (e) { if (e.target === back) close(); });
      chooser(box, { tree: tree, forChild: opt.forChild, id: opt.id, onDone: close });
      var first = box.querySelector('.gl-box'); if (first) setTimeout(function () { first.focus(); }, 30);
    });
  }

  /* ---------- the quiet card after a first full check-in ---------- */
  function offerCard(host, tree, opt) {
    opt = opt || {};
    if (!host || !treeOk(tree)) return null;
    var id = who(), c = get(id);
    if (c.ids.length || c.none || c.rather) return null;
    if (id) {
      if (helperView(id)) return null;
      var v = vault(id); if (!v) return null;
      v.lifeOffer = v.lifeOffer && typeof v.lifeOffer === 'object' ? v.lifeOffer : {};
      if (v.lifeOffer[tree]) return null;
      v.lifeOffer[tree] = today(); P().save(id);
    } else {
      if (MEMOFFER[tree]) return null;
      MEMOFFER[tree] = 1;
    }
    addCSS();
    var card = document.createElement('div'); card.className = 'gglife gl-card'; card.setAttribute('role', 'note');
    card.innerHTML = '<p>' + esc(opt.forChild ? 'Want Grounded to fit their body and health? You can choose together in Settings.' : 'Want Grounded to fit your body and health? You can choose in Settings.') + '</p>' +
      '<div class="gl-row"><button type="button" class="gl-b gl-go" data-gl="choose">Choose Now</button><button type="button" class="gl-b" data-gl="later">Maybe Later</button></div>';
    card.addEventListener('click', function (e) {
      var b = e.target.closest('[data-gl]'); if (!b) return;
      if (b.getAttribute('data-gl') === 'later') { card.remove(); return; }
      card.remove();
      if (typeof opt.onChoose === 'function') opt.onChoose(); else dialog(tree, { forChild: opt.forChild });
    });
    host.appendChild(card);
    return card;
  }

  /* ---------- profile changes: unlock, lock, switch ---------- */
  var hooked = false;
  function hook() {
    if (hooked || !window.GGP || !GGP.on) return; hooked = true;
    GGP.on(function (type) { if (type === 'change' || type === 'ready') fire(who()); });
  }
  hook();
  if (!hooked) { var tries = 0, t = setInterval(function () { hook(); if (hooked || ++tries > 40) clearInterval(t); }, 250); }

  window.GGLife = {
    version: 'lf1', CATS: CATS, TREES: TREES.slice(), FITS: 'Fits You', LINES_TITLE: 'Information and Support',
    cats: cats, get: get, set: set, clear: clear, has: has, chosen: chosen, gentle: gentle, fits: fits, order: order,
    lines: lines, picks: picks, addGuides: addGuides, label: label, chooser: chooser, dialog: dialog, offerCard: offerCard,
    use: function (id) { ctx = id || null; fire(who()); }, who: who,
    on: function (fn) { window.addEventListener('gglife:change', function (e) { try { fn(e.detail); } catch (x) { console.error(x); } }); }
  };
})();
