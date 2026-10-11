/* =====================================================================
   GROUNDED STORIES (shared/gg-stories.js)   BLD 784, October 2026
   Chris's stories as narrated videos (the shared player, shared/gg-learn.js, Brian start to finish) with a Read
   option. Four stories play and read in full for everyone (open); every other Posted story shows a preview, and a
   member code opens it in full. Members also hear Early Previews. The Story Vault (Chris's Founder tool in the
   Field Guide) holds every story, makes and cancels member codes, and seals stories/data.js with seal() below.

   The data file (stories/data.js) sets window.GG_STORIES = {
     v: 1, made: 'YYYY-MM-DD', k: {v, round, folder} (where the locked clips live; the key itself is never here),
     list: [{id, slug, title, sub, col, status: 'posted' | 'early', open, substack, credit, mins, refs (when any),
             preview: [paragraphs shown to everyone; empty for an Early Preview], full: [paragraphs] only when open}],
     lock: {iv, ct}: AES-GCM 256 with the stories key of JSON {id: [paragraphs]} for every story that is not open,
     wraps: [{c, salt, iv, ct}]: the 32 key bytes locked by each member code (PBKDF2 SHA-256, 250,000 rounds,
            16-byte salt, then AES-GCM 256 with a 12-byte IV: the Root Words method, shared/gg-rootwords.js) }
   Vault stories never appear in it. Base64 everywhere.

   API (the Story Vault, the lead's Node script, and the page all use these; works in browsers and in Node 22):
     GGStories.seal(stories, keyObj, wraps) -> Promise<string>  the full text of stories/data.js
         stories: the Vault's list [{id, title, sub, col, status, open, substack, credit, paras: [], preview: n, ...}]
                  (status 'posted' and 'early' are sealed; 'vault' stays out; open counts only when posted)
         keyObj:  the stories key {v: 1, round: 's1', folder: 't', key: base64 of 32 bytes}
         wraps:   [{c, salt, iv, ct}] from makeWrap, one per member code in use (cancel a code: leave its wrap out)
     GGStories.makeWrap(code, rawKeyBytes) -> Promise<{c, salt, iv, ct}>
         rawKeyBytes: Uint8Array of the 32 key bytes (a base64 string works too). c is a short random tag; the
         subscriber's name stays in the Founder library only.
     GGStories.makeCode() -> 'word-word-word-NN'   three easy words (512 gentle words) and a number from 10 to 99,
         from crypto.getRandomValues. Typing is forgiving: capitals, spaces, and dashes all work.
     GGStories.sentences(paragraph) -> [sentence]   the player's own sentence rule (gg-learn.js beatsOf), so a
         recorded clip's sentence is exactly what plays.
     GGStories.spoken(story, paras) -> [sentence]   every sentence a video speaks, in order (opening line, the
         story, the closing line), for the recorder.
     GGStories.lines   {opening, thanks, members}: the fixed spoken lines.
     GGStories.slug(title), GGStories.normCode(code), GGStories.mins(paras), GGStories.creditHtml(story)
   Page runtime (stories.html):
     GGStories.mount()            draws the members bar and the story sections from window.GG_STORIES
     GGStories.unlock(code)       Promise<boolean>; on true the key stays on this device (localStorage
                                  'gg_stories_key', the raw key in base64) so a member types the code once
     GGStories.forget()           Forget This Device: clears the key
     GGStories.unlocked()         true when this device holds a key that opens the lock
     GGStories.paras(id)          the paragraphs this visitor may see (full when open or unlocked, else the preview)
     GGStories.full(id)           true when paras(id) is the whole story
     GGStories.keyObj()           {v, round, folder, key} for the player's cfg.sealed, or null
     GGStories.lesson(story, mode) a lesson for GGLearn.player: mode 'full' or 'preview'
     GGStories.open(id, view)     opens a story: view 'watch' (default) or 'read'
   ===================================================================== */
(function (root) {
  'use strict';
  if (root.GGStories) return;
  var crypto = root.crypto, subtle = crypto && crypto.subtle;
  var enc = new TextEncoder(), dec = new TextDecoder();
  var ROUNDS = 250000, LS = 'gg_stories_key', SUBSCRIBE = 'https://chri5j0y.substack.com/subscribe';
  var LINES = { opening: 'A story by Chris Joy, read by a narrator.', thanks: 'Thank you for listening.', members: 'Members hear the whole story.' };
  var WORDS = (
    'acorn acre alder almond amber anchor apple apricot aspen aurora autumn badger balsam banjo banner barley basil basin ' +
    'basket bay bayou beacon bean beech beet bell berry birch bison blanket bloom blossom bluebird bluff boat bobcat bold ' +
    'book boulder bowl bramble branch brave bread breeze briar brick bridge bright brook broom brush buck bucket bud ' +
    'burrow butte button cabin cactus calm candle canoe canyon cardinal caribou caring carrot cascade cashew catbird cedar ' +
    'celery cello chair chalk chapel cheer cherry chestnut chickadee cinder clay clear cliff clock cloud clover coast ' +
    'cobble cocoon comet compass condor copper coral cottage cougar cove cozy cradle cranberry crane crayon creek crest ' +
    'cricket crocus crow cup currant cypress dahlia daisy date dawn deer delta desk dew dolphin door dove dragonfly drum ' +
    'dune dusk eager eagle earth easel echo egret elder elk elm ember evergreen fable fair falcon fawn feather fern fiddle ' +
    'field fig finch fir firefly fjord flame flax flint flower flute fond forest fossil fox friendly frost garden garnet ' +
    'gate gazelle generous gentle geyser giving glacier glad glade glen glow goldfinch good goose gopher gourd grace grain ' +
    'granite grape grateful grouse grove guitar gull hammock happy harbor hardy hare harp harvest hat haven hawk hazel ' +
    'hearth hearty heath hedge helpful hemlock heron hickory hill hollow honest honey hopeful hops horizon humble ' +
    'hummingbird ibis inlet iris island ivy jade jasper jay jolly journal joy joyful juniper kale keen kelp kestrel kettle ' +
    'key kind kindly kite kiwi koala ladder lagoon lake lamb lamp lantern larch lark laurel leaf ledge leek lemon lentil ' +
    'letter lichen lilac lily lime linden lively locket lodge loom loon lotus loyal lupine lynx magpie mallard manatee ' +
    'mango map maple marigold marsh marten meadow meadowlark mellow melon merry mesa mild millet minnow mint mist mitten ' +
    'moon moose moss moth mountain mug mustang nectar needle nest nettle nimble noble north notebook nutmeg oak oar oasis ' +
    'oat ocean olive onion onyx open orange orchard orchid oriole osprey otter owl paddle paint panda papaya paper parsley ' +
    'pasture patient pea peace peach pear pearl pebble pecan pelican pencil penguin pepper petal pheasant piano pika ' +
    'pillow pine pinecone pitcher plate playful plover plucky plum polite pond poplar poppy porch pottery prairie prism ' +
    'puffin pumpkin puzzle quail quarry quiet quill quilt quinoa rabbit raccoon radiant radish rain rainbow raisin rapids ' +
    'raven ready redwood reed reef rhubarb ribbon rice ridge ripple river robin rock rope rose rowan rye sable saddle sage ' +
    'sail salmon sand sapling scarf seal seed sequoia serene sesame shade shelf shell shore sierra sincere sky skylark ' +
    'slate snow snug song sorrel sparrow spinach spoon spring sprout spruce spry squash squirrel stamp star starling ' +
    'steady stone stork story stream sturdy summit sun sunbeam sunflower sunny sunrise swallow swan sweet swift table ' +
    'tamarack tea teal teapot tender thankful thicket thistle thread thrush thunder thyme ticket tide tidy timber tomato ' +
    'torch trail trout true trunk trusty tulip tundra turnip twig upbeat valiant valley vase vine violet violin vivid ' +
    'wagon walnut warbler warm water wheat wheel willing willow wind window winter wise witty wolf wonder worthy wren yam ' +
    'yarn yarrow yew zephyr zest zucchini').split(' ');
  // The four filters (themes) and the line under each Posted story's title, by slug. A story the Vault adds later
  // shows under All until it is tagged here.
  var LOOK = {
    'drift-away': ['dying', "Some people don't say goodbye. They sing it."],
    'the-recovery': ['kids', 'Not the mistake. The recovery.'],
    'grounded-in-coffee': ['grief', 'Sometimes the mess itself becomes part of the medicine.'],
    'the-atypical-atheist': ['faith', 'I believe in God, or something. I just cannot stand the church crap.'],
    'birth-plan': ['dying', "You don't just have to get ready to die. No one can, really. But you get a say in how it goes."],
    'enlightenment': ['faith dying', 'I have spent my whole life learning how to hold on well. Perhaps I only have one more thing left to learn.'],
    'welcome-home': ['dying', 'His arms stayed open the whole time, reaching for someone neither of us could see.'],
    'love-a-connection-words-could-never-carry': ['faith kids', 'Love between us, right here, right now, is God loving us through each other.'],
    'prayer-a-language-dementia-cannot-touch': ['faith', 'The prayer stayed whole long after everything else had come apart.'],
    'love': ['faith kids', 'Love between us, right here, right now, is God loving us through each other.'],
    'if-she-is-still-here': ['grief', "I almost said tomorrow. She didn't have a tomorrow."],
    'prayer': ['faith', 'The prayer stayed whole long after everything else had come apart.'],
    'total-bliss': ['dying', "Peace wasn't a big enough word for what she had. She needed bliss."],
    'he-came-to-collect': ['kids dying', 'You cannot save the whole field if the fence is broken in one spot.'],
    'he-was-praying-too': ['faith', 'When you were praying for me… I was praying too.'],
    'please-help-my-dad-die': ['dying kids', 'Sometimes the hardest part of dying is finding permission to leave.'],
    'the-impossible-dance-of-particles': ['faith', 'Finally naming the God you have known all along in your own sacred language.'],
    'grief-debt': ['grief', 'Turns out my heart was keeping better count than my head was.'],
    'my-boundaries-have-gates': ['grief', "It's okay to care deeply. The harder part is caring for yourself just as deeply afterward."],
    'he-deserves-that': ['dying', '']
  };
  var THEMES = [['', 'All Stories'], ['dying', 'Dying and saying goodbye'], ['grief', 'Grief and after'], ['faith', 'Faith and doubt'], ['kids', 'Kids and families']];

  /* ---------------- small helpers ---------------- */
  function b64(u) { u = u instanceof Uint8Array ? u : new Uint8Array(u); var s = ''; for (var i = 0; i < u.length; i += 8192) s += String.fromCharCode.apply(null, u.subarray(i, i + 8192)); return btoa(s); }
  function unb64(s) { var b = atob(String(s || '')), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function esc(x) { return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function rand(n) { return crypto.getRandomValues(new Uint8Array(n)); }
  function slug(t) { return String(t || '').toLowerCase().replace(/[‘’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'story'; }
  function normCode(code) { return String(code || '').normalize('NFKC').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean).join('-'); }

  // The player's sentence rule (shared/gg-learn.js beatsOf), kept identical so clip names match.
  var ABBR = /\b(Mr|Mrs|Ms|Dr|St|Rev|Fr|Sr|Jr|vs|etc|No)\.$/i;
  function sentences(p) {
    var txt = String(p || '').replace(/\s+/g, ' ').trim(); if (!txt) return [];
    var parts = txt.match(/[^.!?]+(?:[.!?]+["'”’)]*|$)/g) || [txt], out = [];
    parts.forEach(function (x) {
      x = x.trim(); if (!x) return;
      var prev = out[out.length - 1];
      if (prev && (ABBR.test(prev) || (/\d\.$/.test(prev) && /^\d/.test(x)) || x.length < 3)) out[out.length - 1] = prev + (/^\d/.test(x) && /\d\.$/.test(prev) ? '' : ' ') + x;
      else out.push(x);
    });
    return out;
  }
  function spoken(story, paras, mode) {
    var out = [LINES.opening];
    (paras || []).forEach(function (p) { out = out.concat(sentences(p)); });
    out.push(mode === 'preview' ? LINES.members : LINES.thanks);
    return out;
  }
  // Minutes at the recorded pace: about 150 words a minute, plus the pause after each sentence and page.
  function mins(paras) {
    var w = 0, s = 0;
    (paras || []).forEach(function (p) { w += String(p).split(/\s+/).filter(Boolean).length; s += sentences(p).length; });
    return Math.max(1, Math.round(w / 150 + s * 0.9 / 60 + (paras || []).length * 0.25 / 60));
  }
  // The Sources line for a story (CLAUDE.md): "Story: Chris Joy, <title> · Read it on Grounded" (linked) or the notebook line.
  function creditHtml(s) {
    var c = String((s && s.credit) || '').trim(); if (!c) return '';
    var m = /^Story:\s*(.*?)(?:\s*[·|]\s*Read it on Grounded\.?)?$/.exec(c);
    if (m && /Read it on Grounded/.test(c)) return '<small class="gg-src-line"><span class="gg-src-k">Story:</span> ' + esc(m[1]) + (s.substack ? ' &middot; <a href="' + esc(s.substack) + '" target="_blank" rel="noopener">Read it on Grounded</a>' : '') + '</small>';
    if (m) return '<small class="gg-src-line"><span class="gg-src-k">Story:</span> ' + esc(m[1]) + '</small>';
    return '<small class="gg-src-line">' + esc(c) + '</small>';
  }

  /* ---------------- keys and locks ---------------- */
  function aes(raw, use) { return subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, use); }
  function codeKey(code, salt) {
    return subtle.importKey('raw', enc.encode(normCode(code)), 'PBKDF2', false, ['deriveKey']).then(function (base) {
      return subtle.deriveKey({ name: 'PBKDF2', salt: salt, iterations: ROUNDS, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    });
  }
  function makeCode() {
    var r = crypto.getRandomValues(new Uint32Array(4));
    return [0, 1, 2].map(function (i) { return WORDS[r[i] & 511]; }).join('-') + '-' + (10 + r[3] % 90);
  }
  function makeWrap(code, raw) {
    if (!subtle) return Promise.reject(new Error('This browser needs WebCrypto to make a code.'));
    raw = typeof raw === 'string' ? unb64(raw) : new Uint8Array(raw);
    if (raw.length !== 32) return Promise.reject(new Error('The stories key must be 32 bytes.'));
    if (!normCode(code)) return Promise.reject(new Error('A code is needed.'));
    var salt = rand(16), iv = rand(12), c = 'm' + Array.prototype.map.call(rand(6), function (b) { return (b % 36).toString(36); }).join('');
    return codeKey(code, salt).then(function (k) { return subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, raw); })
      .then(function (ct) { return { c: c, salt: b64(salt), iv: b64(iv), ct: b64(new Uint8Array(ct)) }; });
  }
  function unwrapOne(w, code) {
    return codeKey(code, unb64(w.salt)).then(function (k) { return subtle.decrypt({ name: 'AES-GCM', iv: unb64(w.iv) }, k, unb64(w.ct)); })
      .then(function (pt) { var u = new Uint8Array(pt); if (u.length !== 32) throw new Error('size'); return u; });
  }
  function seal(stories, keyObj, wraps) {
    if (!subtle) return Promise.reject(new Error('This browser needs WebCrypto to seal.'));
    var raw = unb64(keyObj && keyObj.key);
    if (raw.length !== 32) return Promise.reject(new Error('The stories key must be 32 bytes.'));
    var list = [], locked = {}, slugs = {}, n = 0;
    (stories || []).forEach(function (s) {
      if (!s || (s.status !== 'posted' && s.status !== 'early')) return;
      var paras = (s.paras || []).map(function (p) { return String(p).replace(/\s+/g, ' ').trim(); }).filter(Boolean);
      if (!paras.length) return;
      var open = !!s.open && s.status === 'posted', pn = Math.max(1, Math.min(+s.preview || 1, paras.length > 1 ? paras.length - 1 : 1));
      var sl = slug(s.title); if (slugs[sl]) sl += '-' + s.id; slugs[sl] = 1;
      var e = { id: String(s.id), slug: sl, title: String(s.title || ''), sub: String(s.sub || ''), col: String(s.col || ''), status: s.status, open: open,
        substack: String(s.substack || ''), credit: String(s.credit || ''), mins: mins(paras), preview: s.status === 'early' ? [] : paras.slice(0, pn), posted: String(s.postedAt || '') };
      // refs: reference lines under a story (Read view only, never voiced). alt and draftNote stay in the Vault.
      var refs = (Array.isArray(s.refs) ? s.refs : []).map(function (r) { return String(r).trim(); }).filter(Boolean); if (refs.length) e.refs = refs;
      if (open) e.full = paras; else { locked[e.id] = paras; n++; }
      list.push(e);
    });
    var made = new Date().toISOString().slice(0, 10);
    var lockP = n ? aes(raw, ['encrypt']).then(function (k) { var iv = rand(12); return subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, enc.encode(JSON.stringify(locked))).then(function (ct) { return { iv: b64(iv), ct: b64(new Uint8Array(ct)) }; }); }) : Promise.resolve(null);
    return lockP.then(function (lock) {
      var data = { v: 1, made: made, k: { v: +keyObj.v || 1, round: String(keyObj.round || 's1'), folder: String(keyObj.folder || 't') }, list: list, lock: lock,
        wraps: (wraps || []).filter(function (w) { return w && w.salt && w.iv && w.ct; }).map(function (w) { return { c: String(w.c || ''), salt: w.salt, iv: w.iv, ct: w.ct }; }) };
      var json = JSON.stringify(data).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
      return '/* Grounded Stories (stories/data.js), sealed ' + made + ' by the Story Vault. Made by shared/gg-stories.js GGStories.seal; upload as it is.\n'
        + '   Stories past their preview are locked; a member code opens them. */\nwindow.GG_STORIES = ' + json + ';\n';
    });
  }

  /* ---------------- the page runtime ---------------- */
  var KEY = null, OPENED = null; // the raw key (base64) and the unlocked paragraphs {id: [...]} on this device
  function data() { var d = root.GG_STORIES; return d && Array.isArray(d.list) ? d : null; }
  function lsGet() { try { return root.localStorage.getItem(LS) || ''; } catch (e) { return ''; } }
  function lsSet(v) { try { if (v) root.localStorage.setItem(LS, v); else root.localStorage.removeItem(LS); } catch (e) {} }
  function openLock(rawB64) {
    var d = data(); if (!d) return Promise.reject(new Error('data'));
    if (!d.lock) return Promise.resolve({});
    return aes(unb64(rawB64), ['decrypt']).then(function (k) { return subtle.decrypt({ name: 'AES-GCM', iv: unb64(d.lock.iv) }, k, unb64(d.lock.ct)); })
      .then(function (pt) { return JSON.parse(dec.decode(pt)); });
  }
  // The key this device kept from an earlier unlock opens the stories again without a code.
  function restore() {
    var k = lsGet(); if (!k || !subtle || !data()) return Promise.resolve(false);
    return openLock(k).then(function (o) { KEY = k; OPENED = o; return true; }, function () { return false; });
  }
  function unlock(code) {
    var d = data(); if (!d || !subtle || !normCode(code)) return Promise.resolve(false);
    var W = (d.wraps || []).slice(), found = null;
    // Each wrap takes one PBKDF2 (a fraction of a second); a few run at once.
    function batch() {
      if (found || !W.length) return Promise.resolve(found);
      var part = W.splice(0, 4);
      return Promise.all(part.map(function (w) { return unwrapOne(w, code).then(function (u) { return u; }, function () { return null; }); }))
        .then(function (r) { r.forEach(function (u) { if (u && !found) found = u; }); return batch(); });
    }
    return batch().then(function (raw) {
      if (!raw) return false;
      var k = b64(raw);
      return openLock(k).then(function (o) { KEY = k; OPENED = o; lsSet(k); return true; }, function () { return false; });
    });
  }
  function forget() { KEY = null; OPENED = null; lsSet(''); }
  function unlocked() { return !!(KEY && OPENED); }
  function isV(id) { return !!(OV && OV.vault && (OV.s.id === id || OV.s.slug === id)); }
  function story(id) { if (isV(id)) return OV.s; var d = data(); if (!d) return null; for (var i = 0; i < d.list.length; i++) if (d.list[i].id === id || d.list[i].slug === id) return d.list[i]; return null; }
  function full(id) { if (isV(id)) return true; var s = story(id); return !!s && (s.open || !!(OPENED && OPENED[s.id])); }
  function paras(id) { if (isV(id)) return OV.s.paras || []; var s = story(id); if (!s) return []; if (s.open && s.full) return s.full; if (OPENED && OPENED[s.id]) return OPENED[s.id]; return s.preview || []; }
  function keyObj() { if (OV && OV.vault) return OV.vaultKey || null; var d = data(); if (!KEY || !d) return null; var k = d.k || {}; return { v: k.v || 1, round: k.round || 's1', folder: k.folder || 't', key: KEY }; }

  // A lesson for the shared player: the title scene speaks the opening line, then the story a page at a time.
  // Each paragraph's sentences are the beats; short paragraphs share a page, a long one spans pages (always whole sentences).
  function lesson(s, mode) {
    var P = mode === 'preview' ? (s.preview || []) : paras(s.id), scenes = [], cur = [], size = 0;
    scenes.push({ k: 'title', hero: 'page-stories', eyebrow: 'Grounded Stories', h: s.title, sub: s.sub || '', beats: [LINES.opening], hold: 1 });
    function flush() {
      if (!cur.length) return;
      var beats = [], at = [];
      cur.forEach(function (p) { p.forEach(function (x) { at.push(beats.length); beats.push(x); }); });
      scenes.push({ k: 'tale', eyebrow: 'Grounded Stories', title: s.title, paras: cur, beats: beats, cue: { at: at } });
      cur = []; size = 0;
    }
    P.forEach(function (p) {
      var S = sentences(p), len = String(p).length;
      if (!S.length) return;
      if (len > 640) {
        flush();
        var piece = [], pl = 0;
        S.forEach(function (x) { if (piece.length && pl + x.length > 560) { cur = [piece]; flush(); piece = []; pl = 0; } piece.push(x); pl += x.length + 1; });
        if (piece.length) { cur = [piece]; flush(); }
        return;
      }
      if (cur.length && size + len > 520) flush();
      cur.push(S); size += len + 1;
    });
    flush();
    return { id: 'story-' + s.id, n: '', title: s.title, mins: s.mins, blurb: s.sub || '', scenes: scenes, srcHtml: creditHtml(s) };
  }

  /* ---------------- the page ---------------- */
  var CSS = [
    '.gs-members{display:flex;flex-wrap:wrap;align-items:center;gap:12px 18px;justify-content:space-between;background:var(--card);border:1px solid var(--line);border-left:4px solid var(--gold);border-radius:14px;padding:16px 20px;margin:26px 0 6px;}',
    '.gs-members p{margin:0;font-size:17px;line-height:1.5;}.gs-members b{font-weight:600;}.gs-acts{display:flex;flex-wrap:wrap;gap:10px;align-items:center;}',
    '.gs-acts .btn{padding:10px 18px;font-size:15px;}.gs-link{background:none;border:0;font:inherit;font-size:16px;color:var(--gold);text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:6px 2px;}',
    '.gs-code{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:12px;width:100%;}.gs-code[hidden]{display:none;}',
    '.gs-code input{flex:1 1 220px;min-width:0;font:inherit;font-size:18px;padding:10px 14px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink);}',
    '.gs-msg{width:100%;margin:2px 0 0;font-size:16px;color:var(--ink-soft);min-height:1.4em;}.gs-msg.gs-try{color:var(--gold);}',
    '.gs-h{margin-top:46px;}.gs-lead{color:var(--ink-soft);font-size:17px;margin-top:4px;}',
    '.gs-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin-top:18px;}',
    '.gs-card{display:flex;flex-direction:column;}.gs-card h3{margin-top:4px;}.gs-card .story-quote{flex:0 0 auto;margin:8px 0 12px;}',
    '.gs-meta{display:flex;gap:12px;align-items:center;flex-wrap:wrap;font-size:14px;color:var(--ink-soft);}',
    '.gs-tag{font-family:"Barlow Condensed",sans-serif;font-weight:700;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:var(--gold);}',
    '.gs-card .card-actions{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:auto;padding-top:6px;}',
    '.gs-card .btn{display:inline-flex;align-items:center;gap:8px;}.gs-card .btn svg{width:18px;height:18px;flex:none;}',
    '.gs-talk{font-size:16px;}',
    '.gs-invite{border-left:4px solid var(--gold);}.gs-invite ul{margin:10px 0 0 20px;}.gs-invite li{margin:2px 0;}',
    '.gs-wait{color:var(--ink-soft);font-style:italic;}',
    '@media (max-width:820px){.gs-grid{grid-template-columns:minmax(0,1fr);}}',
    // the story window (the player's own overlay styles, ggl ggl-app)
    '.gs-ov a.ggl-btn{text-decoration:none;display:inline-flex;align-items:center;justify-content:center;}.gs-ov .ggl-in{max-width:980px;}.gs-ov .ln-ctl [data-g="read"]{display:none;}.gs-tabs{display:flex;gap:8px;margin:6px 0 14px;flex-wrap:wrap;}',
    '.gs-tabs button{font:inherit;font-size:16px;font-weight:600;border:1px solid var(--ggl-line);background:var(--ggl-card);color:var(--ggl-ink);border-radius:999px;padding:7px 18px;cursor:pointer;min-height:40px;}',
    '.gs-tabs button[aria-pressed="true"]{background:var(--ggl-acc);border-color:var(--ggl-acc);color:#fff;}',
    '.gs-ov .gs-talk-row{margin:14px 0 0;}.gs-ov .gs-talk-row a{color:var(--ggl-ink);}',
    '.gs-rd{max-width:680px;margin:6px auto 0;}.gs-rd .gs-by{color:var(--ggl-soft);font-size:16px;margin:0 0 18px;}',
    '.gs-rd p.gs-p{font-family:"Cormorant Garamond",Georgia,serif;font-weight:500;font-size:22px;line-height:1.65;margin:0 0 16px;color:var(--ggl-ink);}',
    '.gs-rd .gs-more{border:1px solid var(--ggl-line);border-left:4px solid var(--ggl-acc);border-radius:14px;padding:16px 18px;margin:22px 0;background:var(--ggl-card);}',
    '.gs-rd .gs-more p{margin:0 0 10px;font-size:17px;}.gs-rd .gs-fade{height:70px;margin-top:-70px;position:relative;background:linear-gradient(rgba(247,242,232,0),#F7F2E8);}',
    ':root[data-theme="dark"] .gs-rd .gs-fade{background:linear-gradient(rgba(27,23,20,0),#1B1714);}',
    '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .gs-rd .gs-fade{background:linear-gradient(rgba(27,23,20,0),#1B1714);}}',
    '.gs-rd .gs-refs{margin:18px 0 0;font-size:14px;line-height:1.5;color:var(--ggl-soft);}.gs-rd .gs-refs p{margin:0 0 4px;}',
    '.gs-rd .gs-src{margin:22px 0 8px;color:var(--ggl-soft);}.gs-rd .gs-copy{font-size:13px;color:var(--ggl-soft);margin-top:10px;}',
    '.gs-ov .gs-code input{background:var(--ggl-card);color:var(--ggl-ink);border-color:var(--ggl-line);}.gs-ov .gs-msg{color:var(--ggl-soft);}',
    '.gs-ov .gs-codewrap{margin:14px 0 0;padding:14px 16px;border:1px solid var(--ggl-line);border-radius:14px;background:var(--ggl-card);}.gs-ov .gs-codewrap[hidden]{display:none;}',
    '.gg-src-line{display:block;font-size:13px;line-height:1.4;margin-top:4px;}.gg-src-line a{color:inherit;text-decoration:underline;text-underline-offset:2px;}.gg-src-k{font-weight:600;}'
  ].join('\n');
  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/></svg>';
  var BOOK = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z"/></svg>';
  var ROOT = (function () { try { var s = root.document && document.currentScript && document.currentScript.src; if (s) return new URL('..', s).href.replace(/\/$/, ''); } catch (e) {} return root.location ? location.origin : ''; })();
  var READ_JS = '/read.js?v=b784', LEARN_JS = '/shared/gg-learn.js?v=b784s';
  function need(src, test) { return new Promise(function (ok) { if (test()) return ok(); var s = document.createElement('script'); s.src = ROOT + src; s.onload = s.onerror = function () { ok(); }; document.head.appendChild(s); }); }
  function css() { if (document.getElementById('gs-css')) return; var s = document.createElement('style'); s.id = 'gs-css'; s.textContent = CSS; document.head.appendChild(s); }
  var $ = function (s, r) { return (r || document).querySelector(s); };

  // The code box: one input, one button, a kind message. done() runs after a good code.
  function codeBox(host, done, inOv) {
    host.innerHTML = '<form class="gs-code" novalidate><label class="sr-only" for="gs-in-' + (++codeBox.n) + '">Your member code</label>'
      + '<input id="gs-in-' + codeBox.n + '" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="acorn-meadow-lantern-42">'
      + '<button class="' + (inOv ? 'ggl-btn pri' : 'btn btn-primary') + '" type="submit">Open the Stories</button><p class="gs-msg" aria-live="polite"></p></form>';
    var f = $('form', host), inp = $('input', f), msg = $('.gs-msg', f), btn = $('button', f);
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!normCode(inp.value)) { msg.className = 'gs-msg gs-try'; msg.textContent = 'Type the code just as you received it: three words and a number.'; inp.focus(); return; }
      btn.disabled = true; msg.className = 'gs-msg'; msg.textContent = 'Opening the stories, one moment.';
      unlock(inp.value).then(function (ok) {
        btn.disabled = false;
        if (ok) { msg.textContent = 'Welcome in. Every story is open to you on this device.'; render(); if (done) done(); return; }
        msg.className = 'gs-msg gs-try';
        msg.textContent = "Let's try that once more: check each word and the number, like acorn-meadow-lantern-42. Your code arrives with your Substack membership.";
        inp.focus(); inp.select();
      });
    });
    setTimeout(function () { try { inp.focus(); } catch (e) {} }, 0);
  }
  codeBox.n = 0;

  var FILTER = '';
  function themesOf(s) { return (LOOK[s.slug] || LOOK[slug(s.title)] || [''])[0]; }
  // Newest first: a story's posted time is set by the Story Vault when Chris posts it; older stories keep their order below.
  function isNew(s) { var t = Date.parse(s.posted || ''); return !!t && Date.now() - t < 30 * 864e5; }
  function newest(a) { return a.map(function (s, i) { return [s, i]; }).sort(function (x, y) { var tx = Date.parse(x[0].posted || '') || 0, ty = Date.parse(y[0].posted || '') || 0; return ty - tx || x[1] - y[1]; }).map(function (x) { return x[0]; }); }
  function card(s) {
    var L = LOOK[s.slug] || LOOK[slug(s.title)] || ['', ''], isFull = full(s.id), early = s.status === 'early';
    var tag = early ? 'Early Preview' : isFull ? 'Full Story' : 'Preview';
    if (isNew(s)) tag = 'New · ' + tag;
    return '<article class="card story gs-card" id="story-' + esc(s.slug) + '" data-themes="' + esc(L[0]) + '">'
      + '<div class="gs-meta"><span class="gs-tag">' + tag + '</span><span>' + esc(String(s.mins)) + ' min</span></div>'
      + '<h3>' + esc(s.title) + '</h3>' + (s.sub ? '<p class="story-sub">' + esc(s.sub) + '</p>' : '')
      + (L[1] && slug(L[1]) !== slug(s.sub) ? '<p class="story-quote">&ldquo;' + esc(L[1]) + '&rdquo;</p>' : '')
      + '<div class="card-actions"><button type="button" class="btn btn-primary" data-gs="watch" data-id="' + esc(s.id) + '" aria-label="Watch ' + esc(s.title) + '">' + PLAY + 'Watch</button>'
      + '<button type="button" class="btn btn-secondary" data-gs="read" data-id="' + esc(s.id) + '" aria-label="Read ' + esc(s.title) + '">' + BOOK + 'Read</button>'
      + (s.substack ? '<a class="text-link gs-talk" href="' + esc(s.substack) + '" target="_blank" rel="noopener">Talk about this on Substack</a>' : '') + '</div></article>';
  }
  function membersBar() {
    var el = document.getElementById('gs-members'); if (!el) return;
    if (unlocked()) {
      el.innerHTML = '<p><b>Unlocked on this device.</b> Every story here is open to you, in full.</p><div class="gs-acts"><button type="button" class="gs-link" data-gs="forget">Forget This Device</button></div>';
      return;
    }
    el.innerHTML = '<p><b>Members hear every story in full.</b> Members receive a personal code when they join on Substack.</p>'
      + '<div class="gs-acts"><button type="button" class="btn btn-primary" data-gs="code">Enter Your Code</button><a class="btn btn-secondary" href="' + SUBSCRIBE + '" target="_blank" rel="noopener">Join on Substack</a></div><div class="gs-code-host" hidden></div>';
  }
  function render() {
    var d = data(); css(); membersBar();
    var openEl = document.getElementById('gs-open'), postEl = document.getElementById('gs-posted'), earlyEl = document.getElementById('gs-early');
    if (!d) { if (openEl) openEl.innerHTML = '<p class="gs-wait">The stories are on their way. Read them now on <a class="text-link" href="https://chri5j0y.substack.com" target="_blank" rel="noopener">Substack</a>.</p>'; return; }
    var O = d.list.filter(function (s) { return s.open; }), Pz = newest(d.list.filter(function (s) { return !s.open && s.status === 'posted'; })), E = newest(d.list.filter(function (s) { return s.status === 'early'; }));
    if (openEl) openEl.innerHTML = O.map(card).join('');
    if (postEl) postEl.innerHTML = Pz.map(card).join('');
    if (earlyEl) {
      if (unlocked()) earlyEl.innerHTML = E.length ? E.map(card).join('') : '<p class="gs-wait">New early previews arrive here first.</p>';
      else earlyEl.innerHTML = '<article class="card gs-invite"><h3>Members hear new stories first</h3><p>Early Previews are stories on their way to everyone, often before they reach Substack. Join on Substack to receive your member code.</p>'
        + (E.length ? '<ul>' + E.map(function (s) { return '<li>' + esc(s.title) + '</li>'; }).join('') + '</ul>' : '')
        + '<div class="card-actions" style="margin-top:14px;display:flex;gap:12px;flex-wrap:wrap;"><a class="btn btn-primary" href="' + SUBSCRIBE + '" target="_blank" rel="noopener">Join on Substack</a><button type="button" class="btn btn-secondary" data-gs="code">Enter Your Code</button></div></article>';
    }
    var hP = document.getElementById('gs-posted-h'); if (hP) hP.hidden = !Pz.length;
    filter(FILTER);
  }
  function filter(t) {
    FILTER = t || '';
    Array.prototype.forEach.call(document.querySelectorAll('.gs-filter button'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-theme') === FILTER)); });
    Array.prototype.forEach.call(document.querySelectorAll('.gs-card'), function (a) { a.hidden = !!FILTER && (' ' + a.getAttribute('data-themes') + ' ').indexOf(' ' + FILTER + ' ') < 0; });
  }
  function filters() {
    var el = document.querySelector('.gs-filter'); if (!el) return;
    el.innerHTML = THEMES.map(function (t) { return '<button type="button" aria-pressed="' + (t[0] === FILTER) + '" data-theme="' + t[0] + '">' + esc(t[1]) + '</button>'; }).join('');
  }

  /* the story window: Watch (the shared player) and Read */
  var OV = null;
  function readHtml(s) {
    var P = paras(s.id), whole = full(s.id), y = new Date().getFullYear();
    var h = '<div class="gs-rd"><p class="gs-by">A story by Chris Joy.</p>' + P.map(function (p) { return '<p class="gs-p">' + esc(p) + '</p>'; }).join('');
    if (!whole) {
      h += '<div class="gs-fade" aria-hidden="true"></div><div class="gs-more"><p><b>' + esc(LINES.members) + '</b> Enter your member code to read and hear it all.</p>'
        + '<div class="gs-acts"><button type="button" class="ggl-btn pri" data-gs="ov-code">Enter Your Code</button>'
        + (s.substack ? '<a class="ggl-btn" href="' + esc(s.substack) + '" target="_blank" rel="noopener">Read it on Substack</a>' : '<a class="ggl-btn" href="' + SUBSCRIBE + '" target="_blank" rel="noopener">Join on Substack</a>') + '</div></div>';
    }
    if (whole && s.refs && s.refs.length) h += '<div class="gs-refs">' + s.refs.map(function (r) { return '<p>' + esc(r) + '</p>'; }).join('') + '</div>';
    h += '<div class="gs-src">' + creditHtml(s) + '</div>'
      + '<p class="gs-copy">&copy; ' + y + ' Grow With Grounded LLC. All rights reserved. To share or reuse these stories, ask us first.</p></div>';
    return h;
  }
  function endingFor(s, whole) {
    if (whole) return { eyebrow: 'Thank You for Listening', h: s.title, sub: 'A story by Chris Joy.', say: LINES.thanks, ok: true,
      buttons: [].concat(s.substack ? [['talk', 'Talk about this on Substack', 'pri', s.substack]] : [], [['read', 'Read the Story', s.substack ? '' : 'pri'], ['again', 'Watch Again', ''], ['home', 'Back to Stories', 'quiet']]) };
    return { eyebrow: 'Grounded Stories', h: LINES.members, sub: 'Enter your member code to keep listening.', say: LINES.members, ok: false,
      buttons: [['code', 'Enter Your Code', 'pri']].concat(s.substack ? [['sub', 'Read it on Substack', '', s.substack]] : [['join', 'Join on Substack', '', SUBSCRIBE]], [['again', 'Watch Again', ''], ['home', 'Back to Stories', 'quiet']]) };
  }
  function play(at) {
    if (!OV) return;
    var s = OV.s, whole = full(s.id), L = lesson(s, whole ? 'full' : 'preview'), K = whole && !s.open ? keyObj() : null;
    if (OV.ctl) try { OV.ctl.stop(); } catch (e) {}
    var host = $('.gs-watch', OV.root);
    var cfg = { app: 'site', lesson: L, track: { id: 'grounded-stories', kind: 'support', title: 'Grounded Stories', lessons: [L] }, done: {}, at: at || 0, accent: '#8B5E1A',
      mark: { name: 'Grounded Stories' }, mood: 'calm', ending: endingFor(s, whole),
      onAt: function (i) { if (OV) OV.at = i; },
      onEnd: function (id) {
        if (id === 'home') close();
        else if (id === 'read') view('read');
        else if (id === 'code') showCode(function () { play(Math.max(0, lesson(s, 'preview').scenes.length - 1)); }); // picks up on the last preview page
      },
      open: function () {}, home: close };
    if (K) cfg.sealed = { key: K, voice: 'brian' }; else cfg.voice = 'brian';
    OV.ctl = GGLearn.player(host, cfg);
  }
  function showCode(after) {
    var w = $('.gs-codewrap', OV.root); w.hidden = false;
    codeBox(w, function () { w.hidden = true; w.innerHTML = ''; if (OV) { $('.gs-rdv', OV.root).innerHTML = readHtml(OV.s); if (OV.view === 'watch') after(); } }, true);
    try { w.scrollIntoView({ block: 'nearest' }); } catch (e) {}
  }
  function view(v) {
    if (!OV) return; OV.view = v;
    Array.prototype.forEach.call(OV.root.querySelectorAll('.gs-tabs button'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-v') === v)); });
    var w = $('.gs-watch', OV.root), r = $('.gs-rdv', OV.root);
    if (v === 'read') { if (OV.ctl) { try { OV.ctl.stop(); } catch (e) {} OV.ctl = null; } w.hidden = true; r.hidden = false; r.innerHTML = readHtml(OV.s); }
    else { r.hidden = true; w.hidden = false; play(OV.at || 0); }
  }
  // The Story Vault (Founder tab) plays any story in full with the stories key: GGStories.listen(story, keyObj).
  var VPEND = null;
  function listen(v, k) {
    if (!v || !k) return Promise.resolve(false);
    var P = (v.paras || []).slice();
    VPEND = k;
    return open({ id: String(v.id), slug: slug(v.title || v.id), title: String(v.title || ''), sub: String(v.sub || ''), col: String(v.col || ''), status: 'posted', open: false,
      substack: String(v.substack || ''), credit: String(v.credit || ''), mins: mins(P), paras: P }, 'watch', null, true);
  }
  function close(fromPop) {
    if (!OV) return;
    var o = OV; OV = null;
    if (o.ctl) try { o.ctl.stop(); } catch (e) {}
    document.removeEventListener('keydown', onKey, true);
    o.root.remove(); document.body.style.overflow = o.overflow || '';
    if (!fromPop && !o.vault) { if (o.hist) { try { history.back(); } catch (e) {} } else { try { history.replaceState(history.state, '', location.pathname + location.search); } catch (e) {} } }
    var c = document.getElementById('story-' + o.s.slug), b = c && c.querySelector('[data-gs="watch"]');
    try { (o.from && o.from.isConnected ? o.from : b || document.body).focus({ preventScroll: true }); } catch (e) {}
  }
  function onKey(e) {
    if (!OV) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'Tab') {
      var f = Array.prototype.filter.call(OV.root.querySelectorAll('button,a[href],select,input,[tabindex]:not([tabindex="-1"])'), function (x) { return !x.disabled && x.offsetParent !== null; });
      if (!f.length) return; var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  }
  function open(id, v, from, fromHash) {
    var vk = VPEND; VPEND = null;
    var s = (id && typeof id === 'object') ? id : story(id); if (!s) return Promise.resolve(false);
    if (!vk && s.status === 'early' && !unlocked()) { var inv = document.getElementById('gs-early'); if (inv) inv.scrollIntoView(); return Promise.resolve(false); }
    return need(READ_JS, function () { return !!root.GGRead; }).then(function () { return need(LEARN_JS, function () { return !!root.GGLearn; }); }).then(function () {
      if (!root.GGLearn) return false;
      if (OV) close(true);
      GGLearn.css(); css();
      var el = document.createElement('div');
      el.className = 'ggl ggl-app gs-ov'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Grounded Stories: ' + s.title);
      el.style.setProperty('--ggl-acc', '#8B5E1A'); el.style.setProperty('--ggl-bar', '#2E2118'); el.style.setProperty('--ggl-lite', '#E8C98E');
      el.innerHTML = '<div class="ggl-top"><img src="' + ROOT + '/favicon.svg" alt=""><b>Grounded Stories</b><button type="button" class="ggl-x" data-gs="close">' + (vk ? 'Back to the Story Vault' : 'Back to Stories') + '</button></div>'
        + '<div class="ggl-in"><div class="ggl-eb">' + (s.status === 'early' ? 'Early Preview' : 'Grounded Stories') + '</div><h1 tabindex="-1">' + esc(s.title) + '</h1>'
        + '<p class="ggl-muted">' + (s.sub ? esc(s.sub) + (/[.!?]["'\u201d\u2019)]*$/.test(s.sub) ? ' ' : '. ') : '') + 'About ' + esc(String(s.mins)) + (s.mins === 1 ? ' minute' : ' minutes') + (full(s.id) ? '.' : ' in full.') + '</p>'
        + '<div class="gs-tabs" role="group" aria-label="Watch or read"><button type="button" data-v="watch" aria-pressed="true">Watch</button><button type="button" data-v="read" aria-pressed="false">Read</button></div>'
        + '<div class="gs-watch"></div><div class="gs-rdv" hidden></div><div class="gs-codewrap" hidden></div>'
        + (s.substack ? '<p class="gs-talk-row"><a href="' + esc(s.substack) + '" target="_blank" rel="noopener">Talk about this on Substack</a></p>' : '') + '</div>';
      document.body.appendChild(el);
      OV = { s: s, root: el, at: 0, view: 'watch', from: from || document.activeElement, overflow: document.body.style.overflow, hist: false, vault: !!vk, vaultKey: vk };
      if (vk) {}
      else if (!fromHash) { try { history.pushState({ ggStory: s.slug }, '', '#' + s.slug); OV.hist = true; } catch (e) {} }
      else { try { history.replaceState({ ggStory: s.slug }, '', location.href); } catch (e) {} }
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey, true);
      el.addEventListener('click', function (e) {
        var b = e.target.closest('[data-gs],[data-v]'); if (!b) return;
        if (b.getAttribute('data-gs') === 'close') close();
        else if (b.getAttribute('data-gs') === 'ov-code') showCode(function () { play(0); });
        else if (b.hasAttribute('data-v')) view(b.getAttribute('data-v'));
      });
      view(v === 'read' ? 'read' : 'watch');
      var h = $('h1', el); if (h) try { h.focus({ preventScroll: true }); } catch (e) {}
      return true;
    });
  }
  function fromHash() {
    var h = decodeURIComponent((location.hash || '').slice(1)), m = /^(read=)?(?:story-)?(.+)$/.exec(h);
    if (!h || !m || !data()) { if (OV && !h) close(true); return; }
    var s = story(m[2]); if (!s) return;
    if (/^story-/.test(h)) { var c = document.getElementById(h); if (c) setTimeout(function () { c.scrollIntoView(); }, 0); return; }
    if (OV && OV.s.id === s.id) return;
    var c2 = document.getElementById('story-' + s.slug); if (c2) c2.scrollIntoView();
    open(s.id, m[1] ? 'read' : 'watch', null, true);
  }
  function mount() {
    if (!root.document) return;
    css(); filters();
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-gs]'); if (!b || (OV && OV.root.contains(b))) return;
      var g = b.getAttribute('data-gs');
      if (g === 'watch' || g === 'read') { e.preventDefault(); open(b.getAttribute('data-id'), g, b); }
      else if (g === 'forget') { forget(); render(); var m = document.getElementById('gs-members'); if (m) { var p = document.createElement('p'); p.className = 'gs-msg'; p.setAttribute('role', 'status'); p.textContent = 'This device is back to previews. Your code works again any time.'; m.appendChild(p); } }
      else if (g === 'code') {
        var bar = document.getElementById('gs-members'); if (!bar) return;
        if (!$('.gs-code-host', bar)) membersBar();
        var hostEl = $('.gs-code-host', bar); hostEl.hidden = false; codeBox(hostEl, null);
        try { bar.scrollIntoView({ block: 'nearest' }); } catch (x) {}
      }
    });
    var fl = document.querySelector('.gs-filter'); if (fl) fl.addEventListener('click', function (e) { var b = e.target.closest('button[data-theme]'); if (b) filter(b.getAttribute('data-theme')); });
    root.addEventListener('popstate', function (e) { if (OV && !(e.state && e.state.ggStory === OV.s.slug)) close(true); });
    root.addEventListener('hashchange', fromHash);
    restore().then(function () { render(); fromHash(); });
  }

  root.GGStories = {
    version: 'b784s', lines: LINES, words: WORDS, look: LOOK,
    seal: seal, makeWrap: makeWrap, makeCode: makeCode, normCode: normCode, sentences: sentences, spoken: spoken, slug: slug, mins: mins, creditHtml: creditHtml,
    mount: mount, unlock: unlock, forget: forget, unlocked: unlocked, restore: restore, paras: paras, full: full, keyObj: keyObj, story: story, lesson: lesson, open: open, listen: listen, close: function () { close(); }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.GGStories;
})(typeof window !== 'undefined' ? window : globalThis);
