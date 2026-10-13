/* =====================================================================
   THE GROUNDED READINGS LIBRARY (shared/gg-readings.js, GWG BLD 798). (c) 2026 Grow With Grounded LLC.
   Prayers, scripture, blessings, poems, hymns, songs, and stories for all faith traditions and everything in-between.
   Data: shared/readings/index.js (a light list of every reading: id, title, by, tags, first line) loads first, and each
   group file (shared/readings/<group>.js) loads only when one of its readings is opened, or when a person asks to search
   inside every reading. The builder (grounded-workshop patches/bld798/source/build-readings.py) writes these files.
   Listen: the Grounded voice, recorded Azure neural clips, one clip per chunk (chunksOf below), named by GGLearn.clipName
   (cyrb53 of voice and text, copied here byte for byte) at https://audio.growwithgrounded.com/v1/<voice>/<name>.mp3.
   A missing or slow clip is skipped quietly. Even rests as in read.js (BLD 797): TRIM per voice, a 0.45 second rest,
   and the next clip downloads while one plays. The recording plan runs this same chunksOf in node, so the clips match.
   Use:
     GGReadings.mount(el, {mode: 'page'})   the full library in a page (readings.html), with #r=, #q=, #t=, #d=, #y=, #o=
     GGReadings.open({trad, occasion, type, q, id})   the library in a window over any page (Willow)
     GGReadings.pick({occasion, trad, type, q, title, button}) a Promise of the chosen reading, or null when closed:
       {id, title, by, tr, year, text, lines, translit, note, source, sourceLine, rights, trad, type, occasion, voice}
     GGReadings.chunksOf(reading)  the spoken chunks: the title, then a stanza or paragraph each (long ones by sentence)
     GGReadings.get(id), GGReadings.index(), GGReadings.search(opts)  Promises, for tools that list readings themselves
   ===================================================================== */
(function () {
  'use strict';
  var NODE = typeof window === 'undefined';

  /* ---------------- chunks (shared with the recording plan) ---------------- */
  function norm(t) { return String(t == null ? '' : t).replace(/\s+/g, ' ').trim(); }
  // The same sentence rule as read.js: . ! or ? (and any closing quote) then a space and a capital, number, or opening quote.
  function sentences(t) {
    var out = [], re = /[.!?]+["”’)]*\s+(?=["“‘(]?[A-Z0-9])/g, last = 0, m;
    while ((m = re.exec(t))) { out.push(t.slice(last, m.index + m[0].length).trim()); last = m.index + m[0].length; }
    out.push(t.slice(last).trim());
    return out.filter(function (x) { return !!x; });
  }
  var MAX = 300, SOFT = 220;
  // A sentence still too long (a poem's stanza with no full stop) is cut after ; : or , into pieces near SOFT characters.
  function soften(s) {
    if (s.length <= MAX) return [s];
    var parts = s.replace(/([;:,])\s+/g, '$1\u0000').split('\u0000'), out = [], cur = '';
    parts.forEach(function (p) {
      if (cur && (cur + ' ' + p).length > SOFT) { out.push(cur); cur = p; } else cur = cur ? cur + ' ' + p : p;
    });
    if (cur) out.push(cur);
    return out;
  }
  function stanzas(r) { return String((r && r.text) || '').replace(/\r\n?/g, '\n').split(/\n\s*\n/).map(function (s) { return s.trim(); }).filter(function (s) { return !!s; }); }
  // [{t: spoken text, s: stanza index, or -1 for the title}]
  function chunkInfo(r) {
    var out = [], ti = norm(r && r.title);
    if (ti) out.push({ t: ti, s: -1 });
    stanzas(r).forEach(function (st, si) {
      var t = norm(st);
      if (t.length <= MAX) { out.push({ t: t, s: si }); return; }
      sentences(t).forEach(function (x) { soften(x).forEach(function (y) { out.push({ t: y, s: si }); }); });
    });
    return out;
  }
  function chunksOf(r) { return chunkInfo(r).map(function (c) { return c.t; }); }
  // cyrb53 (a public domain 53-bit string hash, by bryc), the same as GGLearn.clipName in shared/gg-learn.js, byte for byte.
  function clipName(voice, text) {
    var h1 = 0xdeadbeef, h2 = 0x41c6ce57, s = voice + '\n' + String(text).replace(/\s+/g, ' ').trim();
    for (var i = 0, c; i < s.length; i++) { c = s.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507); h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507); h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return voice + '/' + (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  }
  if (NODE) { module.exports = { chunksOf: chunksOf, chunkInfo: chunkInfo, clipName: clipName, sentences: sentences }; return; }
  if (window.GGReadings) return;

  /* ---------------- names ---------------- */
  var GROUPS = [
    ['Every Tradition', ['all']],
    ['Christian', ['christian', 'catholic', 'orthodox', 'oriental', 'episcopal', 'lutheran', 'methodist', 'presbyterian', 'baptist', 'nondenom', 'pentecostal', 'anabaptist', 'moravian', 'ucc', 'disciples', 'blackchurch', 'quaker', 'adventist', 'lds', 'jw', 'cs']],
    ['Celtic', ['celtic']],
    ['Other Faiths', ['jewish', 'muslim', 'bahai', 'zoroastrian', 'sikh', 'hindu', 'buddhist', 'jain', 'taoist', 'confucian', 'shinto', 'uu']],
    ['Family and Land Ways', ['indigenous', 'hmong', 'african', 'nature', 'pagan']],
    ['Other Paths', ['sbnr', 'humanist', 'stoic', 'agnostic', 'atheist']]
  ];
  var TRAD = {
    all: 'For Every Tradition and In-between', christian: 'Christian, Every Church', catholic: 'Catholic', orthodox: 'Eastern Orthodox', oriental: 'Oriental Orthodox',
    episcopal: 'Episcopal and Anglican', lutheran: 'Lutheran', methodist: 'Methodist and Wesleyan', presbyterian: 'Presbyterian and Reformed', baptist: 'Baptist',
    nondenom: 'Non-denominational and Evangelical', pentecostal: 'Pentecostal and Holiness', anabaptist: 'Mennonite, Amish, and Anabaptist', moravian: 'Moravian',
    ucc: 'United Church of Christ and Congregational', disciples: 'Disciples of Christ', blackchurch: 'The Black Church and the Spirituals', quaker: 'Quaker (Friends)',
    adventist: 'Seventh-day Adventist', lds: 'Latter-day Saint', jw: "Jehovah's Witness", cs: 'Christian Science', celtic: 'Celtic',
    jewish: 'Jewish', muslim: 'Muslim', bahai: "Bahá'í", zoroastrian: 'Zoroastrian', sikh: 'Sikh', hindu: 'Hindu', buddhist: 'Buddhist', jain: 'Jain',
    taoist: 'Taoist', confucian: 'Confucian', shinto: 'Shinto', uu: 'Unitarian Universalist', indigenous: 'Native and Indigenous Ways', hmong: 'Hmong',
    african: 'African and Diaspora Traditions', nature: 'Nature and the Earth', pagan: 'Earth-centered and Pagan', sbnr: 'Spiritual but Not Religious',
    humanist: 'Humanist', stoic: 'Stoic', agnostic: 'Agnostic', atheist: 'Atheist'
  };
  var CHRISTIAN = GROUPS[1][1].slice(1);
  var DENOM = { reform: 'Reform', conservative: 'Conservative', orthodox: 'Orthodox', reconstructionist: 'Reconstructionist', hasidic: 'Hasidic', sephardic: 'Sephardic',
    sunni: 'Sunni', shia: 'Shia', sufi: 'Sufi', theravada: 'Theravada', mahayana: 'Mahayana', zen: 'Zen', pureland: 'Pure Land', tibetan: 'Tibetan',
    vaishnava: 'Vaishnava', shaiva: 'Shaiva', shakta: 'Shakta', vedanta: 'Vedanta', bhakti: 'Bhakti', coptic: 'Coptic', armenian: 'Armenian', ethiopian: 'Ethiopian',
    syriac: 'Syriac', scottish: 'Scottish Gaelic', irish: 'Irish', welsh: 'Welsh', manx: 'Manx', breton: 'Breton', cornish: 'Cornish', bcp1662: 'Prayer Book 1662', bcp1928: 'Prayer Book 1928' };
  var TYPE = { prayer: 'Prayer', scripture: 'Scripture', blessing: 'Blessing', poem: 'Poem', hymn: 'Hymn', song: 'Song', story: 'Story', reflection: 'Reflection', litany: 'Litany', chant: 'Chant' };
  var TYPES = ['prayer', 'scripture', 'blessing', 'poem', 'hymn', 'song', 'story', 'reflection', 'litany', 'chant'];
  var OCC = { funeral: 'Funerals', dying: 'The Last Days', grief: 'Grief', comfort: 'Comfort', wedding: 'Weddings', birth: 'Birth and New Life', blessing: 'Blessings',
    celebration: 'Celebrations', daily: 'Every Day', gratitude: 'Gratitude', healing: 'Healing', home: 'Home', nature: 'Nature', hope: 'Hope', peace: 'Peace',
    forgiveness: 'Forgiveness', morning: 'Morning', evening: 'Evening', season: 'The Seasons' };
  var OCCS = ['funeral', 'dying', 'grief', 'comfort', 'wedding', 'birth', 'blessing', 'celebration', 'daily', 'gratitude', 'healing', 'home', 'nature', 'hope', 'peace', 'forgiveness', 'morning', 'evening', 'season'];
  var RIGHTS = { pd: 'Public domain', grounded: 'Written by Grow With Grounded', cc: 'Shared under Creative Commons', permitted: 'Used with permission' };
  function tradName(k) { return TRAD[k] || cap(k); }
  function denomName(k) { return DENOM[k] || cap(k); }
  function cap(k) { return String(k || '').replace(/[-_]+/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); }); }
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  /* ---------------- data, loaded lazily ---------------- */
  var SRC = (function () { try { var s = document.currentScript && document.currentScript.src; if (s) return s; } catch (e) {} return location.origin + '/shared/gg-readings.js'; })();
  var BASE = SRC.replace(/gg-readings\.js.*$/, '') + 'readings/';
  var VQ = (/[?&]v=([^&#]+)/.exec(SRC) || [])[1] || '';
  var loading = {};
  function script(url) {
    if (!loading[url]) loading[url] = new Promise(function (ok, no) {
      var s = document.createElement('script'); s.src = url; s.async = true;
      s.onload = function () { ok(); }; s.onerror = function () { delete loading[url]; no(new Error('load ' + url)); };
      document.head.appendChild(s);
    });
    return loading[url];
  }
  var IDX = null, BYID = {};
  function index() {
    if (IDX) return Promise.resolve(IDX);
    return script(BASE + 'index.js' + (VQ ? '?v=' + VQ : '')).then(function () {
      var raw = window.GGReadingsIndex || { items: [], groups: {} };
      IDX = { v: raw.v, groups: raw.groups || {}, items: (raw.items || []).map(function (a) {
        var x = { id: a[0], title: a[1], by: a[2], g: a[3], trad: a[4] || [], denom: a[5] || [], type: a[6], occasion: a[7] || [], first: a[8] || '', rights: a[9], voice: a[10], tr: a[11] || '' };
        BYID[x.id] = x; return x;
      }) };
      return IDX;
    });
  }
  var DATA = {};
  function group(g) {
    if (DATA[g]) return Promise.resolve(DATA[g]);
    return index().then(function (ix) {
      var gv = (ix.groups[g] || {}).v || VQ;
      return script(BASE + g + '.js' + (gv ? '?v=' + gv : ''));
    }).then(function () {
      var list = (window.GGReadingsData || {})[g] || [], m = {};
      list.forEach(function (r) { m[r.id] = r; });
      DATA[g] = m; return m;
    });
  }
  function get(id) { return index().then(function () { var x = BYID[id]; if (!x) return null; return group(x.g).then(function (m) { return m[id] || null; }); }); }
  function loadAll() { return index().then(function (ix) { return Promise.all(Object.keys(ix.groups).map(function (g) { return group(g).catch(function () {}); })); }); }

  /* ---------------- search ---------------- */
  function tradHit(x, t) { if (!t) return true; if (x.trad.indexOf(t) >= 0) return true; return t !== 'all' && CHRISTIAN.indexOf(t) >= 0 && x.trad.indexOf('christian') >= 0; }
  function words(q) { return norm(q).toLowerCase().replace(/[^\w\s'À-ɏ]/g, ' ').split(/\s+/).filter(function (w) { return w.length > 1; }); }
  function hay(x) {
    if (!x._h) x._h = (x.title + ' ' + x.by + ' ' + x.tr + ' ' + x.first + ' ' + x.trad.map(tradName).join(' ') + ' ' + x.denom.map(denomName).join(' ') + ' ' + (TYPE[x.type] || '') + ' ' + x.occasion.map(function (o) { return OCC[o] || o; }).join(' ')).toLowerCase();
    var full = DATA[x.g] && DATA[x.g][x.id];
    return full ? x._h + ' ' + (full._t || (full._t = (full.text + ' ' + (full.note || '')).toLowerCase())) : x._h;
  }
  function filter(ix, o) {
    var ws = words(o.q || '');
    var out = ix.items.filter(function (x) {
      if (!tradHit(x, o.trad)) return false;
      if (o.denom && x.denom.indexOf(o.denom) < 0) return false;
      if (o.type && x.type !== o.type) return false;
      if (o.occasion && x.occasion.indexOf(o.occasion) < 0) return false;
      if (!ws.length) return true;
      var h = hay(x); return ws.every(function (w) { return h.indexOf(w) >= 0; });
    });
    if (ws.length) {
      var score = function (x) { var t = x.title.toLowerCase(); return ws.reduce(function (n, w) { return n + (t.indexOf(w) >= 0 ? 2 : 0) + (x.by.toLowerCase().indexOf(w) >= 0 ? 1 : 0); }, 0); };
      out = out.map(function (x, i) { return [score(x), i, x]; }).sort(function (a, b) { return b[0] - a[0] || a[1] - b[1]; }).map(function (a) { return a[2]; });
    }
    return out;
  }
  function search(o) { return index().then(function (ix) { return filter(ix, o || {}); }); }

  /* ---------------- a reading, for tools and copies ---------------- */
  function bylineOf(r) { return [r.by, r.tr ? 'translated by ' + r.tr : '', r.year && r.rights !== 'grounded' ? String(r.year) : ''].filter(Boolean).join(', '); }
  function sourceText(r) {
    var s = r.source || {};
    if (r.rights === 'grounded') return 'Words: Grow With Grounded.';
    return (r.rights === 'permitted' ? 'Used with permission: ' : 'Source: ') + (s.name || 'Source unknown') + (s.url ? ' (' + s.url + ')' : '') + '.';
  }
  function sourceHtml(r) {
    var s = r.source || {};
    if (r.rights === 'grounded') return 'Words: Grow With Grounded.';
    var name = esc(s.name || 'Source unknown');
    return (r.rights === 'permitted' ? 'Used with permission: ' : 'Source: ') + (s.url ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + name + '</a>' : name) + '.';
  }
  function linesOf(r) { var out = []; stanzas(r).forEach(function (st, i) { if (i) out.push(''); st.split('\n').forEach(function (l) { out.push(l.trim()); }); }); return out; }
  function plain(r) { return [r.title, bylineOf(r), '', r.translit || '', stanzas(r).join('\n\n'), '', sourceText(r)].filter(function (x, i) { return i !== 3 || x; }).join('\n').replace(/\n{3,}/g, '\n\n'); }
  function result(r) {
    return { id: r.id, title: r.title, by: r.by, tr: r.tr || '', year: r.year, text: stanzas(r).join('\n\n'), lines: linesOf(r), translit: r.translit || '', note: r.note || '',
      source: r.source || {}, sourceLine: sourceText(r), byline: bylineOf(r), rights: r.rights, trad: (r.trad || []).slice(), denom: (r.denom || []).slice(), type: r.type,
      occasion: (r.occasion || []).slice(), voice: r.voice, plain: plain(r) };
  }

  /* ---------------- Listen (the Grounded voice) ---------------- */
  var REC = { base: 'https://audio.growwithgrounded.com/', round: 'v1' };
  function nameOf(v, t) { return (window.GGLearn && GGLearn.clipName ? GGLearn.clipName : clipName)(v, t); }
  function clipUrl(v, t) { return REC.base + REC.round + '/' + nameOf(v, t) + '.mp3'; }
  var SPEEDS = [['0.8', 'Slower'], ['1', 'Normal'], ['1.2', 'Faster']], SPEED_KEY = 'gg_voice_speed';
  function speed() { var v = 1; try { v = parseFloat(localStorage.getItem(SPEED_KEY)) || 1; } catch (e) {} return Math.min(1.5, Math.max(0.6, v)); }
  var TRIM = { brian: [0.10, 0.28], jenny: [0.15, 0.78] }, REST = 450;
  var P = { state: 'idle', id: null, q: [], i: 0, voice: '', tok: 0, el: null, pre: null, cc: null, miss: {}, played: 0, root: null, onend: null };
  function audioEl() { if (!P.el) { P.el = new Audio(); P.el.preload = 'auto'; } return P.el; }
  function lmark() {
    if (!P.root) return;
    Array.prototype.forEach.call(P.root.querySelectorAll('[data-ggr-s]'), function (n) { n.classList.toggle('ggr-now', P.state !== 'idle' && P.q[P.i] && +n.getAttribute('data-ggr-s') === P.q[P.i].s); });
  }
  function lpaint() {
    document.querySelectorAll('.ggr-listen').forEach(function (bar) {
      var mine = bar.getAttribute('data-id') === P.id && P.state !== 'idle', b = bar.querySelector('.ggr-lplay'), s = bar.querySelector('.ggr-lstop');
      b.innerHTML = !mine ? IC.spk + '<span>Listen</span>' : P.state === 'playing' ? IC.pause + '<span>Pause</span>' : IC.play + '<span>Resume</span>';
      b.setAttribute('aria-pressed', mine ? 'true' : 'false'); s.hidden = !mine;
    });
    lmark();
  }
  function dropClip() { var c = P.cc; if (!c) return; clearTimeout(c.timer); clearInterval(c.watch); var a = audioEl(); a.onended = a.onerror = a.onplaying = null; P.cc = null; }
  function ahead(k) {
    var it = P.q[k]; if (!it) return; var u = clipUrl(P.voice, it.t); if (P.miss[u]) return;
    try { if (!P.pre) { P.pre = new Audio(); P.pre.preload = 'auto'; } if (P.pre.src !== u) { P.pre.src = u; P.pre.load(); } } catch (e) {}
  }
  function lnext() {
    if (P.state !== 'playing') return;
    dropClip();
    if (P.i >= P.q.length) { var played = P.played, done = P.onend; lstop(); if (done) done(played); return; }
    var t = ++P.tok, url = clipUrl(P.voice, P.q[P.i].t); lmark();
    if (P.miss[url]) { setTimeout(function () { if (t === P.tok && P.state === 'playing') { P.i++; lnext(); } }, 0); return; }
    var a = audioEl(), c = { t: t, started: false, timer: 0, watch: 0 }, cut = TRIM[P.voice] || [0, 0];
    function fail() { if (P.cc !== c || t !== P.tok || P.state !== 'playing') return; P.miss[url] = 1; dropClip(); try { a.pause(); } catch (e) {} P.i++; lnext(); }
    function done() {
      if (P.cc !== c) return; dropClip(); try { a.pause(); } catch (e) {}
      if (t !== P.tok || P.state !== 'playing') return;
      P.i++; P.played++; setTimeout(function () { if (t === P.tok && P.state === 'playing') lnext(); }, REST / speed());
    }
    c.fail = fail;
    c.arm = function () { clearTimeout(c.timer); c.timer = setTimeout(function () { if (!c.started && P.state === 'playing') fail(); }, 8000); };
    P.cc = c;
    a.onplaying = function () {
      if (P.cc !== c) return; c.started = true; clearTimeout(c.timer); clearInterval(c.watch);
      if (!isFinite(a.duration) || a.duration < cut[0] + cut[1] + 0.4) return;
      var end = a.duration - cut[1];
      c.watch = setInterval(function () { if (P.cc !== c) return clearInterval(c.watch); if (!a.paused && a.currentTime >= end) done(); }, 25);
    };
    a.onended = done; a.onerror = fail;
    a.src = cut[0] ? url + '#t=' + cut[0] : url;
    ahead(P.i + 1);
    try { a.defaultPlaybackRate = speed(); a.playbackRate = speed(); } catch (e) {}
    c.arm();
    try { var p = a.play(); if (p && p.catch) p.catch(function (e) { if (!e || e.name !== 'AbortError') fail(); }); } catch (e) { fail(); }
  }
  function lplay(r, root, onend) {
    lstop(); if (!window.Audio) return;
    P.id = r.id; P.voice = r.voice === 'jenny' ? 'jenny' : 'brian'; P.q = chunkInfo(r); P.i = 0; P.played = 0; P.root = root; P.onend = onend || null;
    audioEl(); P.state = 'playing'; lpaint(); lnext();
  }
  function lpause() { if (P.state !== 'playing') return; P.state = 'paused'; if (P.cc) { clearTimeout(P.cc.timer); try { audioEl().pause(); } catch (e) {} } lpaint(); }
  function lresume() {
    if (P.state !== 'paused') return; P.state = 'playing'; lpaint();
    var c = P.cc; if (!c) { lnext(); return; }
    if (!c.started) c.arm();
    try { var p = audioEl().play(); if (p && p.catch) p.catch(function (e) { if (!e || e.name !== 'AbortError') c.fail(); }); } catch (e) { c.fail(); }
  }
  function lstop() { P.state = 'idle'; P.tok++; if (P.cc) { dropClip(); try { audioEl().pause(); } catch (e) {} } lpaint(); P.id = null; P.root = null; }
  window.addEventListener('pagehide', function () { lstop(); });

  /* ---------------- look ---------------- */
  var IC = {
    spk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5l12 7-12 7z"/></svg>',
    stop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>'
  };
  var CSS = '.ggr{--ggr-ink:var(--ink,#2C1810);--ggr-soft:var(--ink-soft,#6B5A4D);--ggr-line:var(--line,#E2D8C3);--ggr-card:var(--card,#fff);--ggr-bg:var(--bg,#FAF7F2);--ggr-gold:var(--gold,#8B5E1A);--ggr-sage:var(--sage,#5F7D48);color:var(--ggr-ink);font-family:"Barlow",system-ui,sans-serif;min-width:0;}' +
    '.ggr *{box-sizing:border-box;}.ggr [hidden]{display:none !important;}' +
    '.ggr-searchrow{position:relative;margin:0 0 12px;}.ggr-searchrow svg{position:absolute;left:14px;top:50%;width:20px;height:20px;transform:translateY(-50%);color:var(--ggr-soft);pointer-events:none;}' +
    '.ggr-q{width:100%;font:inherit;font-size:17px;color:var(--ggr-ink);background:var(--ggr-card);border:1.5px solid var(--ggr-line);border-radius:999px;padding:12px 18px 12px 44px;min-height:48px;}' +
    '.ggr-q:focus,.ggr-f select:focus{outline:2px solid var(--ggr-gold);outline-offset:1px;border-color:var(--ggr-gold);}' +
    '.ggr-filters{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 14px;margin:0 0 10px;}' +
    '.ggr-f{display:flex;flex-direction:column;gap:4px;min-width:0;}.ggr-f span{font-family:"Barlow Condensed",sans-serif;font-weight:700;font-size:14px;letter-spacing:1px;text-transform:uppercase;color:var(--ggr-soft);}' +
    '.ggr-f select{font:inherit;font-size:16px;color:var(--ggr-ink);background:var(--ggr-card);border:1px solid var(--ggr-line);border-radius:10px;padding:10px 12px;width:100%;min-height:44px;}' +
    '.ggr-f select option{color:#2C1810;background:#fff;}' +
    '.ggr-chips{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 12px;}' +
    '.ggr-chip{font:inherit;font-size:15.5px;color:var(--ggr-ink);background:var(--ggr-bg);border:1.5px solid var(--ggr-line);border-radius:999px;padding:7px 15px;min-height:40px;cursor:pointer;}' +
    '.ggr-chip:hover{border-color:var(--ggr-gold);}.ggr-chip[aria-pressed="true"]{border-color:var(--ggr-gold);background:var(--ggr-card);font-weight:700;color:var(--ggr-gold);}' +
    '.ggr-status{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:6px 14px;font-size:15.5px;color:var(--ggr-soft);margin:6px 0 12px;min-height:1.5em;}' +
    '.ggr-link{font:inherit;font-size:15.5px;background:none;border:0;padding:4px 0;color:var(--ggr-gold);font-weight:700;cursor:pointer;text-decoration:underline;text-underline-offset:3px;}' +
    '.ggr-h{font-family:"Barlow Condensed",sans-serif;font-weight:700;font-size:15px;letter-spacing:2px;text-transform:uppercase;color:var(--ggr-sage);margin:22px 0 10px;}' +
    '.ggr-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;}' +
    '.ggr-card{display:flex;flex-direction:column;align-items:flex-start;gap:3px;text-align:left;font:inherit;color:var(--ggr-ink);background:var(--ggr-card);border:1px solid var(--ggr-line);border-left:4px solid var(--ggr-gold);border-radius:14px;padding:14px 16px;cursor:pointer;min-width:0;}' +
    '.ggr-card:hover,.ggr-card:focus-visible{border-color:var(--ggr-gold);}' +
    '.ggr-card b{font-family:"Cormorant Garamond",Georgia,serif;font-size:21px;line-height:1.2;}.ggr-card small{font-size:14.5px;color:var(--ggr-soft);}' +
    '.ggr-list{display:flex;flex-direction:column;gap:10px;}' +
    '.ggr-item{display:block;width:100%;text-align:left;font:inherit;color:var(--ggr-ink);background:var(--ggr-card);border:1px solid var(--ggr-line);border-radius:14px;padding:14px 18px;cursor:pointer;min-width:0;}' +
    '.ggr-item:hover,.ggr-item:focus-visible{border-color:var(--ggr-gold);}' +
    '.ggr-item b{display:block;font-family:"Cormorant Garamond",Georgia,serif;font-size:22px;line-height:1.2;}' +
    '.ggr-item .ggr-meta{display:block;font-size:15px;color:var(--ggr-soft);margin-top:2px;overflow-wrap:anywhere;}' +
    '.ggr-item i{display:block;font-size:15.5px;color:var(--ggr-soft);margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
    '.ggr-more{margin:14px 0 0;text-align:center;}' +
    '.ggr-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-family:"Barlow Condensed",sans-serif;font-weight:700;font-size:16px;letter-spacing:1px;text-transform:uppercase;border-radius:999px;padding:11px 22px;min-height:44px;cursor:pointer;border:1px solid var(--ggr-line);background:var(--ggr-card);color:var(--ggr-ink);text-decoration:none;}' +
    '.ggr-btn:hover{border-color:var(--ggr-gold);}.ggr-btn.ggr-pri{background:var(--ggr-gold);border-color:var(--ggr-gold);color:#fff;}' +
    ':root[data-theme="dark"] .ggr-btn.ggr-pri{color:#1F1A14;}@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .ggr-btn.ggr-pri{color:#1F1A14;}}' +
    '.ggr-btn svg{width:18px;height:18px;flex:none;}' +
    '.ggr-back{font:inherit;font-size:16px;font-weight:700;color:var(--ggr-gold);background:none;border:0;cursor:pointer;padding:8px 0;min-height:44px;}' +
    '.ggr-back::before{content:"\\2190  ";}' +
    '.ggr-view h2{font-family:"Cormorant Garamond",Georgia,serif;font-weight:700;font-size:36px;line-height:1.12;margin:4px 0 6px;color:var(--ggr-ink);}' +
    '.ggr-by{font-size:17px;color:var(--ggr-soft);margin:0 0 4px;}.ggr-tags{font-size:14.5px;color:var(--ggr-soft);margin:0 0 12px;}' +
    '.ggr-acts{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:12px 0 16px;}' +
    '.ggr-listen{display:inline-flex;flex-wrap:wrap;gap:10px;align-items:center;}' +
    '.ggr-listen select{font:inherit;font-size:15px;color:var(--ggr-ink);background:var(--ggr-card);border:1px solid var(--ggr-line);border-radius:10px;padding:8px 10px;min-height:44px;}' +
    '.ggr-lstop{padding:11px 14px;}' +
    '.ggr-text{font-family:"Cormorant Garamond",Georgia,serif;font-size:23px;line-height:1.55;color:var(--ggr-ink);background:var(--ggr-card);border:1px solid var(--ggr-line);border-radius:16px;padding:22px 24px;overflow-wrap:break-word;}' +
    '.ggr-text p{margin:0 0 16px;padding:2px 6px;border-radius:6px;transition:background .3s ease;}.ggr-text p:last-child{margin-bottom:0;}' +
    '.ggr-text .ggr-tl{font-style:italic;color:var(--ggr-soft);}' +
    '.ggr-text.ggr-prose{font-family:"Barlow",system-ui,sans-serif;font-size:19px;line-height:1.7;}' +
    '.ggr-now{background:rgba(232,180,90,.22);outline:2px solid rgba(232,180,90,.65);}' +
    '.ggr-note{font-size:16.5px;color:var(--ggr-ink);margin:14px 0 0;}.ggr-src{font-size:14.5px;color:var(--ggr-soft);margin:12px 0 0;line-height:1.55;overflow-wrap:anywhere;}.ggr-src a{color:inherit;}' +
    '.ggr-say{font-size:15.5px;color:var(--ggr-sage);font-weight:600;min-height:1.3em;margin:4px 0 0;}' +
    '.ggr-empty{font-size:17px;color:var(--ggr-soft);padding:12px 0;}' +
    '@media(max-width:760px){.ggr-filters{grid-template-columns:1fr 1fr;}.ggr-filters .ggr-f:first-child{grid-column:1 / -1;}.ggr-cards{grid-template-columns:1fr 1fr;}.ggr-view h2{font-size:30px;}.ggr-text{font-size:21px;padding:18px 16px;}}' +
    '@media(max-width:460px){.ggr-cards{grid-template-columns:1fr;}}' +
    /* the window over a page */
    '.ggr-dlg{position:fixed;inset:0;z-index:9000;display:flex;align-items:flex-start;justify-content:center;background:rgba(20,14,8,.55);padding:3vh 12px;overflow:hidden;}' +
    '.ggr-panel{background:var(--bg,#FAF7F2);color:var(--ink,#2C1810);width:min(920px,100%);max-height:94vh;overflow:auto;overscroll-behavior:contain;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.35);padding:18px 22px 26px;}' +
    '.ggr-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 10px;}' +
    '.ggr-top h2{font-family:"Cormorant Garamond",Georgia,serif;font-size:28px;margin:0;line-height:1.15;color:var(--ink,#2C1810);}' +
    '.ggr-x{flex:none;width:44px;height:44px;border-radius:50%;border:1px solid var(--line,#E2D8C3);background:var(--card,#fff);color:var(--ink,#2C1810);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;}.ggr-x svg{width:20px;height:20px;}' +
    'body.ggr-lock{overflow:hidden;}' +
    '@media(max-width:600px){.ggr-dlg{padding:0;}.ggr-panel{max-height:100vh;height:100%;border-radius:0;padding:14px 16px 24px;}}' +
    '@media print{.ggr-dlg{display:none !important;}}';
  function style() { if (document.getElementById('ggr-css')) return; var s = document.createElement('style'); s.id = 'ggr-css'; s.textContent = CSS; document.head.appendChild(s); }

  function copyText(text, say) {
    var done = function () { say('Copied. Paste it wherever you need it.'); };
    var old = function () {
      var t = document.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.top = '-1000px';
      document.body.appendChild(t); t.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (e) {} document.body.removeChild(t);
      if (ok) done(); else say('Select the words and copy them by hand.');
    };
    try { if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(done, old); return; } } catch (e) {}
    old();
  }
  // Save or Print: a print-ready copy in a hidden frame, so the page's own print rules never hide it.
  var PCSS = 'body{margin:0;color:#2C1810;background:#fff;font-family:"Barlow",Arial,sans-serif;font-size:13pt;line-height:1.55;}@page{margin:18mm;}' +
    '.p-eb{font-family:"Barlow Condensed",Arial,sans-serif;font-weight:700;font-size:10pt;letter-spacing:2pt;text-transform:uppercase;color:#8B5E1A;margin:0 0 2mm;}' +
    'h1{font-family:"Cormorant Garamond",Georgia,serif;font-size:26pt;line-height:1.1;margin:0 0 2mm;}.p-by{color:#6B5A4D;margin:0 0 6mm;}' +
    '.p-text p{font-family:"Cormorant Garamond",Georgia,serif;font-size:16pt;line-height:1.5;margin:0 0 5mm;break-inside:avoid;}.p-tl{font-style:italic;}' +
    '.p-foot{margin-top:8mm;padding-top:3mm;border-top:.6pt solid #E2D8C3;font-size:9.5pt;color:#6B5A4D;}a{color:inherit;text-decoration:none;}';
  function printHtml(r) {
    return '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>' + esc(r.title) + '</title><link rel="stylesheet" href="' + esc(new URL('../../fonts/fonts.css', BASE).href) + '"><style>' + PCSS + '</style></head><body>' +
      '<p class="p-eb">The Grounded Readings Library</p><h1>' + esc(r.title) + '</h1><p class="p-by">' + esc(bylineOf(r)) + '</p><div class="p-text">' +
      (r.translit ? '<p class="p-tl">' + esc(r.translit) + '</p>' : '') + stanzas(r).map(function (s) { return '<p>' + esc(s).replace(/\n/g, '<br>') + '</p>'; }).join('') + '</div>' +
      '<p class="p-foot">' + sourceHtml(r) + '<br>From the Grounded Readings Library, growwithgrounded.com/readings. For all faith traditions and everything in-between.</p></body></html>';
  }
  function printReading(r) {
    var old = document.getElementById('ggr-print'); if (old) old.remove();
    var f = document.createElement('iframe'); f.id = 'ggr-print'; f.title = 'Print copy'; f.setAttribute('aria-hidden', 'true'); f.tabIndex = -1;
    f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;';
    document.body.appendChild(f);
    var d = f.contentWindow.document; d.open(); d.write(printHtml(r)); d.close();
    setTimeout(function () { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) { try { window.print(); } catch (x) {} } }, 450);
  }

  /* ---------------- the browser (a page, a window, or a picker) ---------------- */
  var PAGE = 40;
  function mount(el, opts) {
    opts = opts || {};
    style();
    var pick = typeof opts.onPick === 'function', usesHash = opts.mode === 'page';
    var st = { q: opts.q || '', trad: opts.trad || '', denom: opts.denom || '', type: opts.type || '', occasion: opts.occasion || '', open: opts.id || null, shown: PAGE, deep: false };
    var root = document.createElement('div'); root.className = 'ggr'; el.appendChild(root);
    var listY = 0;
    function fromHash() {
      var h = {}; String(location.hash || '').replace(/^#/, '').split('&').forEach(function (kv) { var i = kv.indexOf('='); if (i > 0) { try { h[kv.slice(0, i)] = decodeURIComponent(kv.slice(i + 1).replace(/\+/g, ' ')); } catch (e) {} } });
      st.q = h.q || ''; st.trad = h.t || ''; st.denom = h.d || ''; st.type = h.y || ''; st.occasion = h.o || ''; st.open = h.r || null;
    }
    function hashOf() {
      if (st.open) return '#r=' + encodeURIComponent(st.open);
      var a = []; if (st.q) a.push('q=' + encodeURIComponent(st.q)); if (st.trad) a.push('t=' + st.trad); if (st.denom) a.push('d=' + st.denom); if (st.type) a.push('y=' + st.type); if (st.occasion) a.push('o=' + st.occasion);
      return a.length ? '#' + a.join('&') : '';
    }
    function setHash(push) {
      if (!usesHash) return;
      var h = hashOf(), url = location.pathname + location.search + h;
      if ((location.hash || '') === h) return;
      try { if (push) history.pushState({ ggr: 1 }, '', url); else history.replaceState(history.state, '', url); } catch (e) {}
    }
    if (usesHash) {
      fromHash();
      window.addEventListener('popstate', function () { fromHash(); lstop(); draw(); });
      window.addEventListener('hashchange', function () { if (location.hash !== hashOf()) { fromHash(); lstop(); draw(); } });
    }
    function scrollTop() {
      var p = root.closest('.ggr-panel'); if (p) { p.scrollTop = 0; return; }
      var y = root.getBoundingClientRect().top + window.pageYOffset - 90; if (window.pageYOffset > y) window.scrollTo(0, Math.max(0, y));
    }
    function draw() {
      root.setAttribute('aria-busy', 'true');
      index().then(function (ix) {
        root.removeAttribute('aria-busy');
        if (st.open) return drawReading(st.open);
        drawList(ix);
      }).catch(function () { root.innerHTML = '<p class="ggr-empty">The library is loading slowly. Check the connection, then try again.</p><button type="button" class="ggr-btn" data-act="retry">Try Again</button>'; });
    }
    function present(ix, key) { var m = {}; ix.items.forEach(function (x) { (x[key] || []).forEach(function (k) { m[k] = (m[k] || 0) + 1; }); }); return m; }
    function tradCount(ix, t) { return ix.items.filter(function (x) { return tradHit(x, t); }).length; }
    function drawList(ix) {
      var list = filter(ix, st), traits = present(ix, 'trad');
      var have = function (t) { return t === 'christian' ? CHRISTIAN.some(function (c) { return traits[c]; }) || traits.christian : traits[t]; };
      var tradOpts = '<option value="">Every reading</option>' + GROUPS.map(function (g) {
        var o = g[1].filter(function (t) { return have(t) || t === st.trad; }); if (!o.length) return '';
        return '<optgroup label="' + esc(g[0]) + '">' + o.map(function (t) { return '<option value="' + t + '"' + (st.trad === t ? ' selected' : '') + '>' + esc(tradName(t)) + '</option>'; }).join('') + '</optgroup>';
      }).join('');
      var typeOpts = '<option value="">Every kind</option>' + TYPES.filter(function (t) { return t === st.type || ix.items.some(function (x) { return x.type === t; }); }).map(function (t) { return '<option value="' + t + '"' + (st.type === t ? ' selected' : '') + '>' + esc(TYPE[t]) + '</option>'; }).join('');
      var occ = present(ix, 'occasion');
      var occOpts = '<option value="">Every moment</option>' + OCCS.filter(function (o) { return occ[o] || st.occasion === o; }).map(function (o) { return '<option value="' + o + '"' + (st.occasion === o ? ' selected' : '') + '>' + esc(OCC[o]) + '</option>'; }).join('');
      var denoms = {};
      if (st.trad) ix.items.forEach(function (x) { if (x.trad.indexOf(st.trad) >= 0) x.denom.forEach(function (d) { denoms[d] = (denoms[d] || 0) + 1; }); });
      var dk = Object.keys(denoms).sort(function (a, b) { return denomName(a).localeCompare(denomName(b)); });
      var landing = !st.q && !st.trad && !st.type && !st.occasion;
      var h = '<div class="ggr-searchrow">' + IC.search + '<input class="ggr-q" type="search" placeholder="Search: shepherd, hearth, river, peace, Rumi..." aria-label="Search the readings" value="' + esc(st.q) + '" enterkeyhint="search"></div>' +
        '<div class="ggr-filters"><label class="ggr-f"><span>Tradition</span><select data-k="trad">' + tradOpts + '</select></label>' +
        '<label class="ggr-f"><span>Kind</span><select data-k="type">' + typeOpts + '</select></label>' +
        '<label class="ggr-f"><span>Moment</span><select data-k="occasion">' + occOpts + '</select></label></div>' +
        (dk.length ? '<div class="ggr-chips" role="group" aria-label="Within ' + esc(tradName(st.trad)) + '"><button type="button" class="ggr-chip" data-denom="" aria-pressed="' + !st.denom + '">All ' + esc(tradName(st.trad)) + '</button>' +
          dk.map(function (d) { return '<button type="button" class="ggr-chip" data-denom="' + esc(d) + '" aria-pressed="' + (st.denom === d) + '">' + esc(denomName(d)) + '</button>'; }).join('') + '</div>' : '');
      if (landing) {
        h += '<p class="ggr-status" role="status">' + ix.items.length + ' readings, and growing.</p>';
        h += '<h3 class="ggr-h">For a Moment</h3><div class="ggr-chips">' + OCCS.filter(function (o) { return occ[o]; }).map(function (o) { return '<button type="button" class="ggr-chip" data-occ="' + o + '">' + esc(OCC[o]) + '</button>'; }).join('') + '</div>';
        GROUPS.forEach(function (g) {
          var cards = g[1].filter(have).map(function (t) {
            var n = tradCount(ix, t);
            return '<button type="button" class="ggr-card" data-trad="' + t + '"><b>' + esc(tradName(t)) + '</b><small>' + n + (n === 1 ? ' reading' : ' readings') + '</small></button>';
          }).join('');
          if (cards) h += '<h3 class="ggr-h">' + esc(g[0]) + '</h3><div class="ggr-cards">' + cards + '</div>';
        });
      } else {
        var more = st.q && !st.deep && Object.keys(ix.groups).some(function (g) { return !DATA[g]; });
        h += '<div class="ggr-status"><span role="status">' + (list.length ? list.length + (list.length === 1 ? ' reading' : ' readings') : 'Nothing here yet. Try another word, or fewer choices.') + '</span>' +
          (more ? '<button type="button" class="ggr-link" data-act="deep">Search inside every reading</button>' : '') +
          '<button type="button" class="ggr-link" data-act="clear">Start Over</button></div>';
        h += '<div class="ggr-list">' + list.slice(0, st.shown).map(function (x) {
          var meta = [x.by, TYPE[x.type] || '', x.trad.filter(function (t) { return t !== 'all'; }).slice(0, 2).map(tradName).join(', ')].filter(Boolean).join(' · ');
          return '<button type="button" class="ggr-item" data-id="' + esc(x.id) + '"><b>' + esc(x.title) + '</b><span class="ggr-meta">' + esc(meta) + '</span>' + (x.first ? '<i>' + esc(x.first) + '</i>' : '') + '</button>';
        }).join('') + '</div>';
        if (list.length > st.shown) h += '<div class="ggr-more"><button type="button" class="ggr-btn" data-act="more">Show More (' + (list.length - st.shown) + ')</button></div>';
      }
      root.innerHTML = h;
      var q = root.querySelector('.ggr-q'), timer = 0;
      q.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(function () { st.q = q.value; st.shown = PAGE; setHash(false); var pos = q.selectionStart; drawList(ix); var nq = root.querySelector('.ggr-q'); nq.focus(); try { nq.setSelectionRange(pos, pos); } catch (e) {} }, 220); });
      root.querySelectorAll('select[data-k]').forEach(function (s) {
        s.addEventListener('change', function () { var k = s.getAttribute('data-k'); st[k] = s.value; if (k === 'trad') st.denom = ''; st.shown = PAGE; setHash(false); drawList(ix); var n = root.querySelector('select[data-k="' + k + '"]'); if (n) n.focus(); });
      });
    }
    function drawReading(id) {
      root.innerHTML = '<p class="ggr-empty">Opening the reading...</p>';
      get(id).then(function (r) {
        if (st.open !== id) return;
        if (!r) { st.open = null; setHash(false); draw(); return; }
        var prose = r.type === 'story' || r.type === 'reflection';
        var tags = [TYPE[r.type] || '', (r.trad || []).map(tradName).join(', '), (r.denom || []).map(denomName).join(', ')].filter(Boolean).join(' · ');
        root.innerHTML = '<article class="ggr-view">' +
          '<button type="button" class="ggr-back" data-act="back">Back to the readings</button>' +
          '<h2>' + esc(r.title) + '</h2><p class="ggr-by">' + esc(bylineOf(r)) + '</p><p class="ggr-tags">' + esc(tags) + ' · ' + esc(RIGHTS[r.rights] || '') + '</p>' +
          '<div class="ggr-acts">' + (pick ? '<button type="button" class="ggr-btn ggr-pri" data-act="use">' + esc(opts.button || 'Use This Reading') + '</button>' : '') +
          '<span class="ggr-listen" data-id="' + esc(r.id) + '"><button type="button" class="ggr-btn ggr-lplay"></button><button type="button" class="ggr-btn ggr-lstop" aria-label="Stop listening" hidden>' + IC.stop + '</button>' +
          '<select class="ggr-speed" aria-label="Listening speed">' + SPEEDS.map(function (x) { return '<option value="' + x[0] + '"' + (Math.abs(parseFloat(x[0]) - speed()) < .01 ? ' selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select></span>' +
          '<button type="button" class="ggr-btn" data-act="copy">Copy</button><button type="button" class="ggr-btn" data-act="print">Save or Print</button></div>' +
          '<p class="ggr-say" role="status" aria-live="polite"></p>' +
          '<div class="ggr-text' + (prose ? ' ggr-prose' : '') + '">' + (r.translit ? '<p class="ggr-tl" lang="und">' + esc(r.translit) + '</p>' : '') +
          stanzas(r).map(function (s, i) { return '<p data-ggr-s="' + i + '">' + esc(s).replace(/\n/g, '<br>') + '</p>'; }).join('') + '</div>' +
          (r.note ? '<p class="ggr-note">' + esc(r.note) + '</p>' : '') +
          '<p class="ggr-src">' + sourceHtml(r) + (r.pd && r.rights === 'pd' ? ' Public domain: ' + esc(r.pd) + '.' : '') + '</p></article>';
        root._r = r; lpaint();
        var b = root.querySelector('.ggr-back'); if (b && opts.focus !== false) try { b.focus({ preventScroll: true }); } catch (e) {}
      });
    }
    function say(m) { var s = root.querySelector('.ggr-say'); if (!s) return; s.textContent = m; clearTimeout(s._t); s._t = setTimeout(function () { s.textContent = ''; }, 3600); }
    root.addEventListener('click', function (e) {
      var t = e.target.closest('button'); if (!t || !root.contains(t)) return;
      var act = t.getAttribute('data-act');
      if (t.classList.contains('ggr-item')) { listY = window.pageYOffset; st.open = t.getAttribute('data-id'); setHash(true); draw(); scrollTop(); return; }
      if (t.hasAttribute('data-trad')) { st.trad = t.getAttribute('data-trad'); st.denom = ''; st.shown = PAGE; setHash(false); draw(); return; }
      if (t.hasAttribute('data-occ')) { st.occasion = t.getAttribute('data-occ'); st.shown = PAGE; setHash(false); draw(); return; }
      if (t.hasAttribute('data-denom')) { st.denom = t.getAttribute('data-denom'); st.shown = PAGE; setHash(false); draw(); return; }
      if (t.classList.contains('ggr-lplay')) {
        var r = root._r; if (!r) return;
        if (P.id === r.id && P.state === 'playing') return lpause();
        if (P.id === r.id && P.state === 'paused') return lresume();
        lplay(r, root, function (played) { if (!played) say('The recorded voice for this reading is on its way. The words are here to read aloud.'); });
        return;
      }
      if (t.classList.contains('ggr-lstop')) { lstop(); return; }
      if (act === 'back') {
        lstop();
        if (usesHash && history.state && history.state.ggr) { history.back(); return; }
        st.open = null; setHash(false); draw(); if (usesHash) setTimeout(function () { window.scrollTo(0, listY); }, 0); return;
      }
      if (act === 'more') { st.shown += PAGE; draw(); return; }
      if (act === 'clear') { st.q = st.trad = st.denom = st.type = st.occasion = ''; st.shown = PAGE; setHash(false); draw(); return; }
      if (act === 'retry') { draw(); return; }
      if (act === 'deep') { st.deep = true; t.textContent = 'Searching every reading...'; loadAll().then(draw); return; }
      if (act === 'copy' && root._r) { copyText(plain(root._r), say); return; }
      if (act === 'print' && root._r) { printReading(root._r); return; }
      if (act === 'use' && root._r) { lstop(); opts.onPick(result(root._r)); return; }
    });
    root.addEventListener('change', function (e) {
      if (!e.target.classList.contains('ggr-speed')) return;
      try { localStorage.setItem(SPEED_KEY, e.target.value); } catch (x) {}
      if (P.cc) { try { audioEl().defaultPlaybackRate = speed(); audioEl().playbackRate = speed(); } catch (x) {} }
    });
    draw();
    return {
      el: root, state: st, redraw: draw,
      show: function (o) { for (var k in o) if (k in st) st[k] = o[k]; st.shown = PAGE; setHash(false); draw(); },
      destroy: function () { lstop(); root.remove(); }
    };
  }

  /* ---------------- a window over any page ---------------- */
  var openDlg = null;
  function open(opts) {
    opts = opts || {};
    style();
    if (openDlg) openDlg.close(null);
    var last = document.activeElement, dlg = document.createElement('div');
    dlg.className = 'ggr-dlg'; dlg.setAttribute('role', 'dialog'); dlg.setAttribute('aria-modal', 'true'); dlg.setAttribute('aria-labelledby', 'ggr-dlg-h');
    dlg.innerHTML = '<div class="ggr-panel"><div class="ggr-top"><h2 id="ggr-dlg-h">' + esc(opts.title || 'The Grounded Readings Library') + '</h2><button type="button" class="ggr-x" aria-label="Close">' + IC.stop + '</button></div><div class="ggr-host"></div></div>';
    document.body.appendChild(dlg); document.body.classList.add('ggr-lock');
    var done = false, ctl;
    function close(val) {
      if (done) return; done = true; openDlg = null;
      ctl.destroy(); dlg.remove(); document.body.classList.remove('ggr-lock'); document.removeEventListener('keydown', key, true);
      try { if (last && last.focus) last.focus(); } catch (e) {}
      if (opts.onClose) try { opts.onClose(val); } catch (e) {}
    }
    function key(e) {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(null); return; }
      if (e.key === 'Tab') {
        var f = Array.prototype.filter.call(dlg.querySelectorAll('button,select,input,a[href]'), function (n) { return n.offsetParent; });
        if (!f.length) return; var a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    }
    document.addEventListener('keydown', key, true);
    dlg.addEventListener('click', function (e) { if (e.target === dlg) close(null); });
    dlg.querySelector('.ggr-x').addEventListener('click', function () { close(null); });
    ctl = mount(dlg.querySelector('.ggr-host'), { q: opts.q, trad: opts.trad, denom: opts.denom, type: opts.type, occasion: opts.occasion, id: opts.id, button: opts.button,
      onPick: opts.onPick ? function (r) { var f = opts.onPick; close(r); f(r); } : null });
    setTimeout(function () { var q = dlg.querySelector('.ggr-q') || dlg.querySelector('.ggr-x'); if (q) try { q.focus({ preventScroll: true }); } catch (e) {} }, 60);
    openDlg = { el: dlg, close: close, ctl: ctl };
    return openDlg;
  }
  /* The picker other tools call: GGReadings.pick({occasion: 'wedding'}).then(function (r) { if (r) ... }) */
  function pick(opts) {
    opts = opts || {};
    return new Promise(function (ok) {
      var chosen = false;
      open({ title: opts.title || 'Choose a Reading', q: opts.q, trad: opts.trad, denom: opts.denom, type: opts.type, occasion: opts.occasion, id: opts.id, button: opts.button,
        onPick: function (r) { chosen = true; ok(r); }, onClose: function (v) { if (!chosen && !v) ok(null); } });
    });
  }

  window.GGReadings = { mount: mount, open: open, pick: pick, get: function (id) { return get(id).then(function (r) { return r ? result(r) : null; }); }, index: index, search: search, loadAll: loadAll,
    chunksOf: chunksOf, chunkInfo: chunkInfo, clipName: clipName, clipUrl: clipUrl, rec: REC, trim: TRIM, rest: REST, labels: { trad: TRAD, type: TYPE, occasion: OCC, denom: DENOM, rights: RIGHTS, groups: GROUPS },
    listen: { play: function (r) { return (r && r.text ? Promise.resolve(r) : get(r && r.id || r)).then(function (x) { if (x) lplay(x, null); }); }, pause: lpause, resume: lresume, stop: lstop, get state() { return P.state; } },
    base: BASE };
})();
