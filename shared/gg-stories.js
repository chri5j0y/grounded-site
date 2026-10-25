/* =====================================================================
   GROUNDED STORIES (shared/gg-stories.js)   BLD 784, October 2026
   Chris's stories as narrated videos (the shared player, shared/gg-learn.js, Brian start to finish) with a Read
   option. Four stories play and read in full for everyone (open); every other Posted story shows a preview, and a
   member code opens it in full. Members also hear Early Previews. The Story Vault (Chris's Founder tool in the
   Field Guide) holds every story and seals stories/data.js with seal() below. Every code in the Field Guide's
   Access list (Founder, Staff, Guide, and Supporter, BLD 785) opens Grounded Stories; Supporter codes open only here.

   The data file (stories/data.js) sets window.GG_STORIES = {
     v: 1, made: 'YYYY-MM-DD', k: {v, round, folder} (where the locked clips live; the key itself is never here),
     list: [{id, slug, title, sub, col, status: 'posted' | 'early', open, substack, credit, mins, refs (when any),
             preview: [paragraphs shown to everyone; empty for an Early Preview], cut: 1 when the preview
             ends partway through a paragraph (BLD 788), full: [paragraphs] only when open}],
     lock: {iv, ct}: AES-GCM 256 with the stories key of JSON {id: [paragraphs]} for every story that is not open,
     ws: the one wrap salt (16 bytes) shared by every wrap below that carries no salt of its own (BLD 785),
     wraps: [{c, iv, ct}]: the 32 key bytes locked by each code (PBKDF2 SHA-256, 250,000 rounds with the shared salt
            ws, then AES-GCM 256 with a 12-byte IV). A typed code runs PBKDF2 once and then tries each wrap with one
            quick AES-GCM decrypt, so hundreds of codes still open in a moment. Older wraps made before BLD 785
            carry their own salt ({c, salt, iv, ct}, one PBKDF2 each, the Root Words method) and keep working. }
   Vault stories never appear in it, and no wrap carries a name, a level, or an organization. Base64 everywhere.

   API (the Story Vault, the lead's Node script, and the page all use these; works in browsers and in Node 22):
     GGStories.seal(stories, keyObj, wraps, salt) -> Promise<string>  the full text of stories/data.js
         stories: the Vault's list [{id, title, sub, col, status, open, substack, credit, paras: [], preview: n, ...}]
                  (status 'posted' and 'early' are sealed; 'vault' stays out; open counts only when posted)
         keyObj:  the stories key {v: 1, round: 's1', folder: 't', key: base64 of 32 bytes}
         wraps:   [{c, iv, ct}] from makeWrap with the salt, one per code in use (cancel a code: leave its wrap out);
                  an older wrap with its own salt ({c, salt, iv, ct}) rides along as it is
         salt:    the shared wrap salt (base64), written to data.js as ws
     GGStories.makeWrap(code, rawKeyBytes, salt) -> Promise<{c, iv, ct}>
         rawKeyBytes: Uint8Array of the 32 key bytes (a base64 string works too). salt: the shared wrap salt (base64
         or bytes; GGStories.newSalt() makes one). Without a salt it makes an older style wrap {c, salt, iv, ct}.
         c is a short random tag; the person's name, level, and organization stay in the Founder library only.
     GGStories.previewCut(paras, n) -> {paras, cut}  a locked story's preview (BLD 788): at most about 1,500 characters
         and 40 percent of the story, whole paragraphs while they fit, else the first paragraph's opening sentences (cut).
     GGStories.newSalt() -> base64 of 16 random bytes
     GGStories.check(code) -> Promise<boolean>  true when the code opens the loaded data.js (nothing is kept)
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
     GGStories.remember(key)      keeps the stories key on this device (base64 or base64url, 32 bytes)
   Open Grounded Stories (BLD 786): the Field Guide opens stories.html#k=<the stories key, base64url>. The key rides in
   the fragment only, so it never reaches a server; this file keeps it (remember) and clears the fragment at once with
   history.replaceState, before the page draws.
   Topics (BLD 786): a story's topics ['dying', 'grief', 'faith', 'kids'] (any, or none) come from the Story Vault and
   ride into data.js; the page filters by them, and a story with no topics field falls back to LOOK below.
   Supporter perks (BLD 787), sealed under the stories key, so every code opens them:
     seal(stories, keyObj, wraps, salt, extras) with extras = {letters, cards} from the Story Vault. The lock JSON also holds
       b:<story id>   the Story Behind the Story (a story's behind paragraphs, Chris's own words), on Posted and Early Preview
       l:<letter id>  a Posted letter's paragraphs        c:<card id>  {line, story: {id, slug, title, credit}, practice}
                      (a Posted card whose story is Posted)
     and data.js gains letters: [{id, month, title, from, mins, posted}] and cards: [{id, month, title}] (titles show to
     visitors; the words stay sealed). Older pages and older data.js files keep working: they read only the parts they know.
     The page: the closing card of a story with a note leads with The Story Behind the Story (a short video with its own
     opening line, then Back to the Story), and Read shows the note after the story; #gs-letters lists the letters (Watch,
     Read, New for 30 days); #gs-cards shows This Month's Card (GGPrint.reflectionCard, Save as PDF, Send by Email or Text)
     and past cards. Visitors see invites naming the months and titles.
     GGStories.spokenNote(paras), GGStories.spokenLetter(letter): every sentence for the recorder (B8, locked s1/t clips).
     GGStories.listenLetter(letter, keyObj): the Story Vault plays a letter; GGStories.listen plays a story with its note.
   Story pictures (BLD 787): stories/img/<story id>.webp, then .jpg, on each card (3 by 2) and behind the title in the story
   window; the picture area goes away cleanly when neither file is there. Public files, nothing sealed.
   ===================================================================== */
(function (root) {
  'use strict';
  if (root.GGStories) return;
  var crypto = root.crypto, subtle = crypto && crypto.subtle;
  var enc = new TextEncoder(), dec = new TextDecoder();
  var ROUNDS = 250000, LS = 'gg_stories_key', SUBSCRIBE = 'https://chri5j0y.substack.com/subscribe';
  var LINES = { opening: 'A story by Chris Joy, read by a narrator.', thanks: 'Thank you for listening.', members: 'Members hear the whole story.',
    note: 'The story behind the story, a note from Chris Joy, read by a narrator.', letterGrounded: 'A letter from Grow With Grounded, read by a narrator.', letterChris: 'A letter from Chris Joy, read by a narrator.' };
  // The three Supporter perks (BLD 787), named the same way in the members bar, the invites, and supporters.html.
  var PERKS = 'the Story Behind the Story, the Monthly Letter, and Reflection Cards';
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function monthLabel(m) { var x = /^(\d{4})-(\d\d)/.exec(m || ''); return x ? MONTHS[+x[2] - 1] + ' ' + x[1] : ''; }
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
  var TOPICS = ['dying', 'grief', 'faith', 'kids'];
  function topicsOf(t) { return Array.isArray(t) ? TOPICS.filter(function (k) { return t.indexOf(k) >= 0; }) : null; }
  var THEMES = [['', 'All Stories'], ['dying', 'Dying and Saying Goodbye'], ['grief', 'Grief and After'], ['faith', 'Faith and Doubt'], ['kids', 'Kids and Families']];

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
  function makeWrap(code, raw, salt) {
    if (!subtle) return Promise.reject(new Error('This browser needs WebCrypto to make a code.'));
    raw = typeof raw === 'string' ? unb64(raw) : new Uint8Array(raw);
    if (raw.length !== 32) return Promise.reject(new Error('The stories key must be 32 bytes.'));
    if (!normCode(code)) return Promise.reject(new Error('A code is needed.'));
    var shared = salt != null && salt !== '', sb = shared ? (typeof salt === 'string' ? unb64(salt) : new Uint8Array(salt)) : rand(16);
    if (sb.length < 16) return Promise.reject(new Error('The wrap salt must be 16 bytes.'));
    var iv = rand(12), c = 'm' + Array.prototype.map.call(rand(6), function (b) { return (b % 36).toString(36); }).join('');
    return codeKey(code, sb).then(function (k) { return subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, raw); })
      .then(function (ct) { var w = { c: c, iv: b64(iv), ct: b64(new Uint8Array(ct)) }; if (!shared) w.salt = b64(sb); return w; });
  }
  // The preview everyone sees of a locked story (BLD 788): at most about 1,500 characters and at most 40 percent of the
  // story. Whole opening paragraphs (up to n, the Vault's count, when it gives one) while they fit; when the first
  // paragraph alone is past the limit, its opening sentences up to the limit, so a one paragraph story shows only its
  // opening. Returns {paras, cut} (cut: the last preview paragraph is the start of a longer one).
  var PV_MAX = 1500, PV_SHARE = 0.4;
  function previewCut(paras, n) {
    var P = (paras || []).map(function (p) { return String(p).replace(/\s+/g, ' ').trim(); }).filter(Boolean);
    var lim = Math.min(PV_MAX, Math.floor(P.join('\n\n').length * PV_SHARE)), want = +n > 0 ? +n : P.length, out = [], c = 0, i;
    for (i = 0; i < P.length && i < want; i++) { var add = (out.length ? 2 : 0) + P[i].length; if (c + add > lim) break; out.push(P[i]); c += add; }
    if (out.length) return { paras: out, cut: false };
    var S = sentences(P[0] || ''), part = [], pc = 0;
    for (i = 0; i < S.length; i++) { var a = (part.length ? 1 : 0) + S[i].length; if (pc + a > lim) break; part.push(S[i]); pc += a; }
    return { paras: part.length ? [part.join(' ')] : [], cut: part.length > 0 };
  }
  function newSalt() { return b64(rand(16)); }
  function unwrapOne(w, code) {
    return codeKey(code, unb64(w.salt)).then(function (k) { return subtle.decrypt({ name: 'AES-GCM', iv: unb64(w.iv) }, k, unb64(w.ct)); })
      .then(function (pt) { var u = new Uint8Array(pt); if (u.length !== 32) throw new Error('size'); return u; });
  }
  function seal(stories, keyObj, wraps, salt, extras) {
    if (!subtle) return Promise.reject(new Error('This browser needs WebCrypto to seal.'));
    var raw = unb64(keyObj && keyObj.key);
    if (raw.length !== 32) return Promise.reject(new Error('The stories key must be 32 bytes.'));
    var list = [], locked = {}, slugs = {}, n = 0;
    (stories || []).forEach(function (s) {
      if (!s || (s.status !== 'posted' && s.status !== 'early')) return;
      var paras = (s.paras || []).map(function (p) { return String(p).replace(/\s+/g, ' ').trim(); }).filter(Boolean);
      if (!paras.length) return;
      var open = !!s.open && s.status === 'posted', pv = previewCut(paras, s.preview);
      var sl = slug(s.title); if (slugs[sl]) sl += '-' + s.id; slugs[sl] = 1;
      var e = { id: String(s.id), slug: sl, title: String(s.title || ''), sub: String(s.sub || ''), col: String(s.col || ''), status: s.status, open: open,
        substack: String(s.substack || ''), credit: String(s.credit || ''), mins: mins(paras), preview: s.status === 'early' ? [] : pv.paras, posted: String(s.postedAt || '') };
      if (s.status !== 'early' && pv.cut) e.cut = 1; // the preview ends partway through a paragraph
      // refs: reference lines under a story (Read view only, never voiced). alt and draftNote stay in the Vault.
      var tp = topicsOf(s.topics); if (tp) e.topics = tp;
      var refs = (Array.isArray(s.refs) ? s.refs : []).map(function (r) { return String(r).trim(); }).filter(Boolean); if (refs.length) e.refs = refs;
      if (open) e.full = paras; else { locked[e.id] = paras; n++; }
      // The Story Behind the Story (BLD 787): Chris's own note, sealed for members on every Posted and Early Preview story.
      var note = (Array.isArray(s.behind) ? s.behind : []).map(function (p) { return String(p).replace(/\s+/g, ' ').trim(); }).filter(Boolean);
      if (note.length) { locked['b:' + e.id] = note; n++; }
      list.push(e);
    });
    // The Monthly Letter and Reflection Cards (BLD 787): titles for everyone, words for members. Only Posted ones ride.
    var X = extras || null, letters = [], cards = [];
    if (X) {
      (X.letters || []).forEach(function (l) {
        if (!l || l.status !== 'posted' || !l.id) return;
        var P = (l.paras || []).map(function (p) { return String(p).replace(/\s+/g, ' ').trim(); }).filter(Boolean); if (!P.length) return;
        letters.push({ id: String(l.id), month: String(l.month || ''), title: String(l.title || ''), from: l.from === 'chris' ? 'chris' : 'grounded', mins: mins(P), posted: String(l.postedAt || '') });
        locked['l:' + l.id] = P; n++;
      });
      (X.cards || []).forEach(function (c) {
        if (!c || c.status !== 'posted' || !c.id || !c.line) return;
        var st = list.filter(function (e) { return e.id === String(c.story) && e.status === 'posted'; })[0]; if (!st) return;
        var pr = c.practice || {};
        cards.push({ id: String(c.id), month: String(c.month || ''), title: String(c.title || pr.name || '') });
        locked['c:' + c.id] = { line: String(c.line), story: { id: st.id, slug: st.slug, title: st.title, credit: st.credit },
          practice: { name: String(pr.name || ''), why: String(pr.why || ''), steps: (pr.steps || []).map(String), src: (pr.src || []).map(String) }, posted: String(c.postedAt || '') };
        n++;
      });
      letters.sort(function (a, b) { return a.month < b.month ? 1 : a.month > b.month ? -1 : 0; });
      cards.sort(function (a, b) { return a.month < b.month ? 1 : a.month > b.month ? -1 : 0; });
    }
    var made = new Date().toISOString().slice(0, 10);
    var lockP = n ? aes(raw, ['encrypt']).then(function (k) { var iv = rand(12); return subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, enc.encode(JSON.stringify(locked))).then(function (ct) { return { iv: b64(iv), ct: b64(new Uint8Array(ct)) }; }); }) : Promise.resolve(null);
    return lockP.then(function (lock) {
      var W = (wraps || []).filter(function (w) { return w && w.iv && w.ct && (w.salt || salt); }).map(function (w) { var o = { c: String(w.c || '') }; if (w.salt) o.salt = w.salt; o.iv = w.iv; o.ct = w.ct; return o; });
      var data = { v: 1, made: made, k: { v: +keyObj.v || 1, round: String(keyObj.round || 's1'), folder: String(keyObj.folder || 't') }, list: list, lock: lock };
      if (X) { data.letters = letters; data.cards = cards; }
      if (salt && W.some(function (w) { return !w.salt; })) data.ws = typeof salt === 'string' ? salt : b64(salt);
      data.wraps = W;
      var json = JSON.stringify(data).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
      return '/* Grounded Stories (stories/data.js), sealed ' + made + ' by the Story Vault. Made by shared/gg-stories.js GGStories.seal; upload as it is.\n'
        + '   Stories past their preview are locked; a code from the Access list opens them. */\nwindow.GG_STORIES = ' + json + ';\n';
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
  // Finds the key a code opens: one PBKDF2 with the shared salt (ws), then a quick AES-GCM try of each shared salt
  // wrap; then any older wrap that carries its own salt (one PBKDF2 each, a few at once). Resolves the raw key or null.
  function find(code) {
    var d = data(); if (!d || !subtle || !normCode(code)) return Promise.resolve(null);
    var all = d.wraps || [], S = d.ws ? all.filter(function (w) { return !w.salt; }) : [], W = all.filter(function (w) { return w.salt; }), found = null;
    function sized(pt) { var u = new Uint8Array(pt); if (u.length !== 32) throw new Error('size'); return u; }
    var first = !S.length ? Promise.resolve(null) : codeKey(code, unb64(d.ws)).then(function (k) {
      return Promise.all(S.map(function (w) { return subtle.decrypt({ name: 'AES-GCM', iv: unb64(w.iv) }, k, unb64(w.ct)).then(sized, function () { return null; }); }))
        .then(function (r) { for (var i = 0; i < r.length; i++) if (r[i]) return r[i]; return null; });
    }, function () { return null; });
    function batch() {
      if (found || !W.length) return Promise.resolve(found);
      var part = W.splice(0, 4);
      return Promise.all(part.map(function (w) { return unwrapOne(w, code).then(function (u) { return u; }, function () { return null; }); }))
        .then(function (r) { r.forEach(function (u) { if (u && !found) found = u; }); return batch(); });
    }
    return first.then(function (u) { if (u) return u; return batch(); });
  }
  // True when a code opens the stories in the loaded data.js. Nothing is kept on the device (the Field Guide uses it
  // to tell a Supporter kindly where their code opens).
  function check(code) {
    return find(code).then(function (raw) { if (!raw) return false; return openLock(b64(raw)).then(function () { return true; }, function () { return false; }); }, function () { return false; });
  }
  function unlock(code) {
    return find(code).then(function (raw) {
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
  // o (BLD 787) plays another piece the same way: {paras, opening, eyebrow, id, sub} for the Story Behind the Story and the Monthly Letter.
  function lesson(s, mode, o) {
    o = o || {};
    var P = o.paras || (mode === 'preview' ? (s.preview || []) : paras(s.id)), scenes = [], cur = [], size = 0, eb = o.eyebrow || 'Grounded Stories';
    scenes.push({ k: 'title', hero: 'page-stories', heroNarrow: 'page-stories-narrow', eyebrow: eb, h: s.title, sub: o.sub != null ? o.sub : (s.sub || ''), beats: [o.opening || LINES.opening], hold: 1 });
    function flush() {
      if (!cur.length) return;
      var beats = [], at = [];
      cur.forEach(function (p) { p.forEach(function (x) { at.push(beats.length); beats.push(x); }); });
      scenes.push({ k: 'tale', eyebrow: eb, title: s.title, paras: cur, beats: beats, cue: { at: at } });
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
    return { id: o.id || 'story-' + s.id, n: '', title: s.title, mins: o.paras ? mins(P) : s.mins, blurb: s.sub || '', scenes: scenes, srcHtml: o.id && /^letter-/.test(o.id) ? '' : creditHtml(s) };
  }
  // The pieces a member's key opens besides the stories (BLD 787): the Story Behind the Story (b:<story id>), the Monthly Letter
  // (l:<letter id>), and Reflection Cards (c:<card id>). The Story Vault plays its own notes and letters with the stories key.
  function noteOf(id) { if (isV(id)) { var b = (OV.s.behind || []).filter(function (p) { return String(p).trim(); }); return b.length ? b : null; } var s = story(id); var n = s && OPENED && OPENED['b:' + s.id]; return Array.isArray(n) && n.length ? n : null; }
  function letterParas(id) { var n = OPENED && OPENED['l:' + id]; return Array.isArray(n) ? n : null; }
  function cardOf(id) { var c = OPENED && OPENED['c:' + id]; return c && c.line ? c : null; }
  function noteLesson(s) { return lesson(s, 'full', { paras: noteOf(s.id) || [], opening: LINES.note, eyebrow: 'The Story Behind the Story', sub: 'The Story Behind the Story', id: 'note-' + s.id }); }
  function letterLesson(l) { return lesson(l, 'full', { paras: l.paras || [], opening: l.from === 'chris' ? LINES.letterChris : LINES.letterGrounded, eyebrow: 'The Monthly Letter', sub: monthLabel(l.month), id: 'letter-' + l.id }); }
  // Every sentence the recorder needs (B8): a note's and a letter's.
  function spokenNote(p) { var out = [LINES.note]; (p || []).forEach(function (x) { out = out.concat(sentences(x)); }); out.push(LINES.thanks); return out; }
  function spokenLetter(l) { var out = [l && l.from === 'chris' ? LINES.letterChris : LINES.letterGrounded]; ((l && l.paras) || []).forEach(function (x) { out = out.concat(sentences(x)); }); out.push(LINES.thanks); return out; }

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
    '.gs-tabs .gs-sharebtn{display:inline-flex;align-items:center;gap:6px;margin-left:auto;}.gs-tabs .gs-sharebtn svg,.gs-share svg{width:16px;height:16px;flex:none;}',
    '.gs-smsg:empty{display:none;}.gs-smsg{font-size:15px;margin:6px 0 0;overflow-wrap:anywhere;}.gs-smsg .gs-link{font-weight:600;user-select:all;-webkit-user-select:all;}',
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
    '.gg-src-line{display:block;font-size:13px;line-height:1.4;margin-top:4px;}.gg-src-line a{color:inherit;text-decoration:underline;text-underline-offset:2px;}.gg-src-k{font-weight:600;}',
    // story pictures (BLD 787): stories/img/<id>.webp or .jpg, the area goes away cleanly when neither is there
    '.gs-img{aspect-ratio:3/2;margin:-28px -26px 16px;border-radius:15px 12px 0 0;overflow:hidden;background:color-mix(in srgb,var(--gold) 12%,var(--card));}',
    '.gs-img img,.gs-ban-pic img{display:block;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .4s ease;}.gs-img.gs-in img,.gs-ban-pic.gs-in img{opacity:1;}',
    '.gs-ban{margin:0 0 4px;}.gs-ban-pic{display:none;}.gs-ban-img{position:relative;border-radius:16px;overflow:hidden;min-height:clamp(170px,30vw,300px);display:flex;align-items:flex-end;background:#2E2118;margin:4px 0 12px;}',
    '.gs-ban-img .gs-ban-pic{display:block;position:absolute;inset:0;}.gs-ban-img::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(20,13,7,.82) 0%,rgba(20,13,7,.45) 45%,rgba(20,13,7,.05) 80%);pointer-events:none;}',
    '.gs-ban-img .gs-ban-t{position:relative;z-index:1;padding:18px 22px;color:#F6EFE2;}.gs-ban-img .ggl-eb{color:#F2C46A;}.gs-ov .gs-ban-img h2.gs-rh{color:#FFF8EC;text-shadow:0 2px 12px rgba(0,0,0,.45);margin:2px 0 0;}',
    // the story title in the story window is an h2 under the page's own h1 (BLD 788), styled as the window's title
    '.gs-ov h2.gs-rh{font-family:"Cormorant Garamond",serif;font-weight:600;font-size:36px;line-height:1.1;margin:6px 0 8px;}.gs-ov h2.gs-rh:focus{outline:none;}',
    // the perks (BLD 787): the Story Behind the Story, the Monthly Letter, Reflection Cards
    '.gs-rd .gs-note{margin:26px 0 0;padding:18px 20px;border:1px solid var(--ggl-line);border-left:4px solid var(--ggl-acc);border-radius:14px;background:var(--ggl-card);}.gs-rd .gs-note h2{font-family:"Cormorant Garamond",Georgia,serif;font-size:28px;margin:0 0 4px;color:var(--ggl-ink);}',
    '.gs-pcard{display:flex;flex-direction:column;}.gs-pcard h3{margin-top:4px;}.gs-pcard .card-actions{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:auto;padding-top:10px;}.gs-pcard .btn{display:inline-flex;align-items:center;gap:8px;}.gs-pcard .btn svg{width:18px;height:18px;flex:none;}',
    '.gs-from{color:var(--ink-soft);font-size:16px;margin:4px 0 0;}.gs-rcard{border-left:4px solid var(--gold);}.gs-rcard blockquote{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:clamp(22px,3.2vw,30px);line-height:1.3;margin:10px 0 6px;overflow-wrap:anywhere;}',
    '.gs-rcard .gs-prac{margin:12px 0 0;font-size:17px;}.gs-past{margin-top:18px;}.gs-past li{margin:6px 0;display:flex;gap:10px;flex-wrap:wrap;align-items:center;}.gs-past ul{list-style:none;padding:0;margin:8px 0 0;}',
    '.gs-cards-wrap{margin-top:18px;}.gs-cmsg{min-height:1.4em;font-size:15px;color:var(--ink-soft);margin:8px 0 0;}'
  ].join('\n');
  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/></svg>';
  var BOOK = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z"/></svg>';
  var SHARE = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V4"/><path d="M8 8l4-4 4 4"/><path d="M5 12v6.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V12"/></svg>';
  var ROOT = (function () { try { var s = root.document && document.currentScript && document.currentScript.src; if (s) return new URL('..', s).href.replace(/\/$/, ''); } catch (e) {} return root.location ? location.origin : ''; })();
  var READ_JS = '/read.js?v=b813', LEARN_JS = '/shared/gg-learn.js?v=b849';
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
  function themesOf(s) { var tp = topicsOf(s.topics); return tp ? tp.join(' ') : (LOOK[s.slug] || LOOK[slug(s.title)] || [''])[0]; }
  // Newest first: a story's posted time is set by the Story Vault when Chris posts it; older stories keep their order below.
  function isNew(s) { var t = Date.parse(s.posted || ''); return !!t && Date.now() - t < 30 * 864e5; }
  function newest(a) { return a.map(function (s, i) { return [s, i]; }).sort(function (x, y) { var tx = Date.parse(x[0].posted || '') || 0, ty = Date.parse(y[0].posted || '') || 0; return ty - tx || x[1] - y[1]; }).map(function (x) { return x[0]; }); }
  // Story pictures (BLD 787, public files): stories/img/<id>.webp, then <id>.jpg; the area goes when neither is there. IMG keeps
  // what this page learned, so a redraw (after an unlock) skips the ones already missing.
  var IMG = {};
  function imgBase(id) { return ROOT + '/stories/img/' + encodeURIComponent(id); }
  function imgTag(s, cls) {
    if (!s || !s.id || s.kind || IMG[s.id] === 'none') return '';
    return '<div class="' + cls + (IMG[s.id] ? ' gs-in' : '') + '" data-gsimg="' + esc(s.id) + '"><img src="' + imgBase(s.id) + '.' + (IMG[s.id] || 'webp') + '" alt="' + esc(s.title) + '" loading="lazy" decoding="async" onload="GGStories._imgOk(this)" onerror="GGStories._imgErr(this)"></div>';
  }
  function imgOk(el) { var w = el.parentNode; if (!w) return; IMG[w.getAttribute('data-gsimg')] = /\.jpg$/.test(el.getAttribute('src') || '') ? 'jpg' : 'webp'; w.classList.add('gs-in'); }
  function imgErr(el) {
    var w = el.parentNode; if (!w) return; var id = w.getAttribute('data-gsimg'), src = el.getAttribute('src') || '';
    if (/\.webp$/.test(src)) { el.setAttribute('src', imgBase(id) + '.jpg'); return; }
    IMG[id] = 'none'; var ban = w.closest && w.closest('.gs-ban-img'); if (ban) ban.classList.remove('gs-ban-img'); w.remove();
  }
  function card(s) {
    var L = LOOK[s.slug] || LOOK[slug(s.title)] || ['', ''], isFull = full(s.id), early = s.status === 'early';
    var tag = early ? 'Early Preview' : isFull ? 'Full Story' : 'Preview';
    if (isNew(s)) tag = 'New · ' + tag;
    return '<article class="card story gs-card" id="story-' + esc(s.slug) + '" data-themes="' + esc(themesOf(s)) + '">' + imgTag(s, 'gs-img')
      + '<div class="gs-meta"><span class="gs-tag">' + tag + '</span><span>' + esc(String(s.mins)) + ' min</span></div>'
      + '<h3>' + esc(s.title) + '</h3>' + (s.sub ? '<p class="story-sub">' + esc(s.sub) + '</p>' : '')
      + (L[1] && slug(L[1]) !== slug(s.sub) ? '<p class="story-quote">&ldquo;' + esc(L[1]) + '&rdquo;</p>' : '')
      + '<div class="card-actions"><button type="button" class="btn btn-primary" data-gs="watch" data-id="' + esc(s.id) + '" aria-label="Watch ' + esc(s.title) + '">' + PLAY + 'Watch</button>'
      + '<button type="button" class="btn btn-secondary" data-gs="read" data-id="' + esc(s.id) + '" aria-label="Read ' + esc(s.title) + '">' + BOOK + 'Read</button>'
      + '<button type="button" class="btn btn-secondary gs-share" data-gs="share" data-id="' + esc(s.id) + '" aria-label="Share ' + esc(s.title) + '">' + SHARE + 'Share</button>'
      + (s.substack ? '<a class="text-link gs-talk" href="' + esc(s.substack) + '" target="_blank" rel="noopener">Talk about this on Substack</a>' : '') + '</div><p class="gs-smsg" role="status" aria-live="polite"></p></article>';
  }
  function membersBar() {
    var el = document.getElementById('gs-members'); if (!el) return;
    if (unlocked()) {
      el.innerHTML = '<p><b>Unlocked on this device.</b> Every story here is open to you, in full, with ' + PERKS + '.</p><div class="gs-acts"><a class="gs-link" href="supporters.html">Welcome, Supporters</a><button type="button" class="gs-link" data-gs="forget">Forget This Device</button></div>';
      return;
    }
    el.innerHTML = '<p><b>Members hear every story in full.</b> Members also receive ' + PERKS + ', with a personal code when they join on Substack.</p>'
      + '<div class="gs-acts"><button type="button" class="btn btn-primary" data-gs="code">Enter Your Code</button><a class="btn btn-secondary" href="' + SUBSCRIBE + '" target="_blank" rel="noopener">Join on Substack</a><a class="gs-link" href="supporters.html">Welcome, Supporters</a></div><div class="gs-code-host" hidden></div>';
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
      else earlyEl.innerHTML = '<article class="card gs-invite"><h3>Members hear new stories first</h3><p>Early Previews are stories on their way to everyone, often before they reach Substack. Members also receive ' + PERKS + '. Join on Substack to receive your member code.</p>'
        + (E.length ? '<ul>' + E.map(function (s) { return '<li>' + esc(s.title) + '</li>'; }).join('') + '</ul>' : '')
        + '<div class="card-actions" style="margin-top:14px;display:flex;gap:12px;flex-wrap:wrap;"><a class="btn btn-primary" href="' + SUBSCRIBE + '" target="_blank" rel="noopener">Join on Substack</a><button type="button" class="btn btn-secondary" data-gs="code">Enter Your Code</button></div></article>';
    }
    var hP = document.getElementById('gs-posted-h'); if (hP) hP.hidden = !Pz.length;
    perks(d);
    filter(FILTER);
  }
  /* The Monthly Letter and Reflection Cards on the page (BLD 787). Members: the letters newest first (Watch, Read, New for 30
     days) and this month's card with past cards. Visitors: an invite naming the months and titles. */
  var MAIL = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l3 3v15H6z"/><path d="M9 11h6M9 15h6"/></svg>';
  function invite(h, p, rows) {
    return '<article class="card gs-invite"><h3>' + esc(h) + '</h3><p>' + esc(p) + '</p>' + (rows.length ? '<ul>' + rows.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' : '')
      + '<div class="card-actions" style="margin-top:14px;display:flex;gap:12px;flex-wrap:wrap;"><button type="button" class="btn btn-primary" data-gs="code">Enter Your Code</button><a class="btn btn-secondary" href="' + SUBSCRIBE + '" target="_blank" rel="noopener">Join on Substack</a></div></article>';
  }
  function letterCard(l) {
    var tag = 'The Monthly Letter'; if (isNew(l)) tag = 'New · ' + tag;
    return '<article class="card gs-pcard gs-letter" id="letter-' + esc(l.id) + '"><div class="gs-meta"><span class="gs-tag">' + tag + '</span><span>' + esc(String(l.mins || 1)) + ' min</span></div>'
      + '<h3>' + esc(l.title) + '</h3><p class="gs-from">' + esc(monthLabel(l.month)) + '. From ' + (l.from === 'chris' ? 'Chris Joy' : 'Grow With Grounded') + '.</p>'
      + '<div class="card-actions"><button type="button" class="btn btn-primary" data-gs="lwatch" data-id="' + esc(l.id) + '" aria-label="Watch ' + esc(l.title) + '">' + PLAY + 'Watch</button>'
      + '<button type="button" class="btn btn-secondary" data-gs="lread" data-id="' + esc(l.id) + '" aria-label="Read ' + esc(l.title) + '">' + BOOK + 'Read</button></div></article>';
  }
  function perks(d) {
    var lEl = document.getElementById('gs-letters'), cEl = document.getElementById('gs-cards');
    var Ls = (d.letters || []).filter(function (l) { return l && l.id; }), Cs = (d.cards || []).filter(function (c) { return c && c.id; });
    if (lEl) {
      if (unlocked()) { var mine = Ls.filter(function (l) { return letterParas(l.id); }); lEl.innerHTML = mine.length ? mine.map(letterCard).join('') : '<p class="gs-wait">The first letter arrives here soon.</p>'; }
      else lEl.innerHTML = invite('A letter each month for members', 'A letter each month from Grow With Grounded, read aloud. Join on Substack to receive your member code.', Ls.map(function (l) { return monthLabel(l.month) + ': ' + l.title; }));
    }
    if (cEl) {
      if (unlocked()) {
        var mc = Cs.filter(function (c) { return cardOf(c.id); });
        if (!mc.length) { cEl.innerHTML = '<p class="gs-wait">The first Reflection Card arrives here soon.</p>'; return; }
        var t = mc[0], c = cardOf(t.id);
        cEl.innerHTML = '<article class="card gs-pcard gs-rcard" id="card-' + esc(t.id) + '"><div class="gs-meta"><span class="gs-tag">This Month\u2019s Card</span><span>' + esc(monthLabel(t.month)) + '</span></div>'
          + '<blockquote>\u201C' + esc(c.line) + '\u201D</blockquote><p class="gs-from">From the story ' + esc(c.story.title) + ', by Chris Joy</p>'
          + '<p class="gs-prac"><b>This week\u2019s practice:</b> ' + esc(c.practice.name) + '</p>'
          + '<div class="card-actions"><button type="button" class="btn btn-primary" data-gs="cprint" data-id="' + esc(t.id) + '">' + MAIL + 'Print the Card</button>'
          + '<button type="button" class="btn btn-secondary" data-gs="csave" data-id="' + esc(t.id) + '">Save as PDF</button>'
          + '<button type="button" class="btn btn-secondary" data-gs="cmail" data-id="' + esc(t.id) + '">Send by Email</button>'
          + '<button type="button" class="btn btn-secondary" data-gs="ctext" data-id="' + esc(t.id) + '">Send by Text</button>'
          + '<button type="button" class="text-link gs-link" data-gs="read" data-id="' + esc(c.story.id) + '">Read the Story</button></div><p class="gs-cmsg" role="status"></p></article>'
          + (mc.length > 1 ? '<div class="gs-past"><h4>Past Cards</h4><ul>' + mc.slice(1).map(function (p) { var x = cardOf(p.id); return '<li><span>' + esc(monthLabel(p.month)) + ': ' + esc(p.title || x.practice.name) + ', from ' + esc(x.story.title) + '</span><button type="button" class="gs-link" data-gs="cprint" data-id="' + esc(p.id) + '">Print the Card</button></li>'; }).join('') + '</ul></div>' : '');
        warmPrint();
      } else cEl.innerHTML = invite('A printable card each month for members', 'A line from a Grounded Story and a practice to carry it into your week. Join on Substack to receive your member code.', Cs.map(function (c) { return monthLabel(c.month) + ': ' + c.title; }));
    }
  }
  var PRINT_JS = '/shared/gg-print.js?v=b836', SOURCES_JS = '/shared/gg-sources.js?v=b849';
  function warmPrint() { return need(SOURCES_JS, function () { return !!root.GGSources; }).then(function () { return need(PRINT_JS, function () { return !!root.GGPrint; }); }); }
  function cardModel(id) { var c = cardOf(id), t = ((data() || {}).cards || []).filter(function (x) { return x.id === id; })[0]; if (!c || !t) return null; return { month: t.month, line: c.line, story: c.story, practice: c.practice }; }
  function cardAct(g, id, btn) {
    var m = cardModel(id); if (!m) return;
    var msg = btn && btn.closest('.gs-rcard') ? btn.closest('.gs-rcard').querySelector('.gs-cmsg') : null;
    var go = function () {
      if (!root.GGPrint || !GGPrint.reflectionCard) { if (msg) msg.textContent = 'The card is on its way. Tap once more in a moment.'; return; }
      if (g === 'cprint') return GGPrint.reflectionCard(m);
      return GGPrint.sendReflection(m, g === 'csave' ? 'save' : g === 'cmail' ? 'email' : 'text').then(function (r) {
        if (!msg) return; msg.textContent = r === 'saved' ? 'Saved as a PDF.' : r === 'opened' ? 'Saved as a PDF. Attach it to the message that just opened.' : r === 'shared' ? 'Sent.' : '';
      });
    };
    if (root.GGPrint) go(); else warmPrint().then(go);
  }
  // BLD 832: share a story by its own address (stories/<slug>.html, which carries the story's own preview picture).
  function shareUrl(s) { return 'https://growwithgrounded.com/stories/' + s.slug + '.html'; }
  function shareStory(id, msg) {
    var s = (id && typeof id === 'object') ? id : story(id); if (!s || s.kind || !s.slug) return;
    var url = shareUrl(s), say = function (h) { if (msg) msg.innerHTML = h; };
    if (navigator.share) {
      navigator.share({ title: s.title + ' | Grounded Stories', text: s.sub || 'A story by Chris Joy.', url: url }).then(function () { say(''); }, function () {});
      return;
    }
    var shown = function () { say('Copy this link to share it: <span class="gs-link" tabindex="0">' + esc(url) + '</span>'); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(function () { say('Link copied. Paste it anywhere to share ' + esc(s.title) + '.'); }, shown);
    else shown();
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
    var y = new Date().getFullYear();
    if (s.kind === 'letter') return '<div class="gs-rd"><p class="gs-by">The Monthly Letter, ' + esc(monthLabel(s.month)) + '. From ' + (s.from === 'chris' ? 'Chris Joy' : 'Grow With Grounded') + '.</p>'
      + (s.paras || []).map(function (p) { return '<p class="gs-p">' + esc(p) + '</p>'; }).join('')
      + '<p class="gs-copy">&copy; ' + y + ' Grow With Grounded LLC. All rights reserved. For Supporters of Grounded Stories.</p></div>';
    var P = paras(s.id), whole = full(s.id);
    var h = '<div class="gs-rd"><p class="gs-by">A story by Chris Joy.</p>' + P.map(function (p) { return '<p class="gs-p">' + esc(p) + '</p>'; }).join('');
    if (!whole) {
      h += '<div class="gs-fade" aria-hidden="true"></div><div class="gs-more"><p><b>' + esc(LINES.members) + '</b> Enter your member code to read and hear it all.</p>'
        + '<div class="gs-acts"><button type="button" class="ggl-btn pri" data-gs="ov-code">Enter Your Code</button>'
        + (s.substack ? '<a class="ggl-btn" href="' + esc(s.substack) + '" target="_blank" rel="noopener">Read it on Substack</a>' : '<a class="ggl-btn" href="' + SUBSCRIBE + '" target="_blank" rel="noopener">Join on Substack</a>') + '</div></div>';
    }
    if (whole && s.refs && s.refs.length) h += '<div class="gs-refs">' + s.refs.map(function (r) { return '<p>' + esc(r) + '</p>'; }).join('') + '</div>';
    var note = whole ? noteOf(s.id) : null;
    if (note) h += '<div class="gs-note" id="gs-note"><h2>The Story Behind the Story</h2><p class="gs-by">A note from Chris Joy.</p>' + note.map(function (p) { return '<p class="gs-p">' + esc(p) + '</p>'; }).join('') + '</div>';
    h += '<div class="gs-src">' + creditHtml(s) + '</div>'
      + '<p class="gs-copy">&copy; ' + y + ' Grow With Grounded LLC. All rights reserved. To share or reuse these stories, ask us first.</p></div>';
    return h;
  }
  function endingFor(s, whole) {
    if (s.kind === 'letter') return { eyebrow: 'Thank You for Listening', h: s.title, sub: 'The Monthly Letter', say: LINES.thanks, ok: true,
      buttons: [['read', 'Read the Letter', 'pri'], ['again', 'Watch Again', ''], ['home', 'Back to Stories', 'quiet']] };
    if (OV && OV.mode === 'note') return { eyebrow: 'Thank You for Listening', h: s.title, sub: 'The Story Behind the Story', say: LINES.thanks, ok: true,
      buttons: [['story', 'Back to the Story', 'pri'], ['home', 'Back to Stories', 'quiet']] };
    // A member on a story with a note: the closing card leads with the Story Behind the Story.
    var note = whole && noteOf(s.id);
    if (whole) return { eyebrow: 'Thank You for Listening', h: s.title, sub: 'A story by Chris Joy.', say: LINES.thanks, ok: true,
      buttons: [].concat(note ? [['note', 'The Story Behind the Story', 'pri']] : [], s.substack ? [['talk', 'Talk about this on Substack', note ? '' : 'pri', s.substack]] : [], [['read', 'Read the Story', s.substack || note ? '' : 'pri'], ['again', 'Watch Again', ''], ['home', 'Back to Stories', 'quiet']]) };
    return { eyebrow: 'Grounded Stories', h: LINES.members, sub: 'Enter your member code to keep listening.', say: LINES.members, ok: false,
      buttons: [['code', 'Enter Your Code', 'pri']].concat(s.substack ? [['sub', 'Read it on Substack', '', s.substack]] : [['join', 'Join on Substack', '', SUBSCRIBE]], [['again', 'Watch Again', ''], ['home', 'Back to Stories', 'quiet']]) };
  }
  function play(at) {
    if (!OV) return;
    var s = OV.s, whole = s.kind ? true : full(s.id), nt = !s.kind && OV.mode === 'note' && whole && noteOf(s.id);
    if (!nt && !s.kind) OV.mode = 'story';
    var L = s.kind === 'letter' ? letterLesson(s) : nt ? noteLesson(s) : lesson(s, whole ? 'full' : 'preview'), K = whole && (!s.open || s.kind || nt) ? keyObj() : null;
    if (OV.ctl) try { OV.ctl.stop(); } catch (e) {}
    var host = $('.gs-watch', OV.root);
    var cfg = { app: 'site', lesson: L, track: { id: 'grounded-stories', kind: 'support', title: 'Grounded Stories', lessons: [L] }, done: {}, at: at || 0, accent: '#8B5E1A',
      mark: { name: 'Grounded Stories' }, mood: 'calm', ending: endingFor(s, whole),
      onAt: function (i) { if (OV) OV.at = i; },
      onEnd: function (id) {
        if (id === 'home') close();
        else if (id === 'read') view('read');
        else if (id === 'note') { OV.mode = 'note'; OV.at = 0; play(0); }
        else if (id === 'story') { OV.mode = 'story'; OV.at = 0; play(0); }
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
  // The Field Guide hands over the stories key when any Guide, Staff, or Founder code opens it on this device,
  // so Grounded Stories opens in full there with no member code (the same device storage as a member's unlock).
  function remember(k) {
    try { var t = String(k || '').replace(/-/g, '+').replace(/_/g, '/'); while (t.length % 4) t += '=';
      var raw = unb64(t); if (raw.length !== 32) return false; lsSet(b64(raw)); return true; } catch (e) { return false; }
  }
  // Open Grounded Stories (BLD 786): stories.html#k=<key> keeps the key on this device, then the fragment goes at once.
  function takeKey() {
    try {
      var h = root.location && root.location.hash || ''; if (h.slice(0, 3) !== '#k=') return false;
      var kept = remember(decodeURIComponent(h.slice(3)));
      root.history.replaceState(root.history.state, '', root.location.pathname + root.location.search);
      return kept;
    } catch (e) { return false; }
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
  // A letter, from the page (a member) or from the Story Vault (with the stories key): GGStories.openLetter(id, view),
  // GGStories.listenLetter(letter, keyObj).
  function letterPiece(l, P) { return { kind: 'letter', id: String(l.id), slug: 'letter-' + l.id, title: String(l.title || ''), sub: monthLabel(l.month), month: String(l.month || ''), from: l.from === 'chris' ? 'chris' : 'grounded', status: 'posted', open: false, substack: '', credit: '', mins: mins(P), paras: P }; }
  function openLetter(id, v, from) { var l = ((data() || {}).letters || []).filter(function (x) { return x.id === id; })[0], P = letterParas(id); if (!l || !P) return Promise.resolve(false); return open(letterPiece(l, P), v, from); }
  function listenLetter(l, k) { if (!l || !k) return Promise.resolve(false); VPEND = k; return open(letterPiece(l, (l.paras || []).slice()), 'watch', null, true); }
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
    if (!vk && !s.kind && s.status === 'early' && !unlocked()) { var inv = document.getElementById('gs-early'); if (inv) inv.scrollIntoView(); return Promise.resolve(false); }
    return need(READ_JS, function () { return !!root.GGRead; }).then(function () { return need(LEARN_JS, function () { return !!root.GGLearn; }); }).then(function () {
      if (!root.GGLearn) return false;
      if (OV) close(true);
      GGLearn.css(); css();
      var el = document.createElement('div');
      el.className = 'ggl ggl-app gs-ov'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Grounded Stories: ' + s.title);
      el.style.setProperty('--ggl-acc', '#8B5E1A'); el.style.setProperty('--ggl-bar', '#2E2118'); el.style.setProperty('--ggl-lite', '#E8C98E');
      el.innerHTML = '<div class="ggl-top"><img src="' + ROOT + '/favicon.svg" alt=""><b>Grounded Stories</b><button type="button" class="ggl-x" data-gs="close">' + (vk ? 'Back to the Story Vault' : 'Back to Stories') + '</button></div>'
        + '<div class="ggl-in"><div class="gs-ban' + (imgTag(s, 'gs-ban-pic') ? ' gs-ban-img' : '') + '">' + imgTag(s, 'gs-ban-pic') + '<div class="gs-ban-t"><div class="ggl-eb">' + (s.kind === 'letter' ? 'The Monthly Letter' : s.status === 'early' ? 'Early Preview' : 'Grounded Stories') + '</div><h2 class="gs-rh" tabindex="-1">' + esc(s.title) + '</h2></div></div>'
        + '<p class="ggl-muted">' + (s.sub ? esc(s.sub) + (/[.!?]["'\u201d\u2019)]*$/.test(s.sub) ? ' ' : '. ') : '') + 'About ' + esc(String(s.mins)) + (s.mins === 1 ? ' minute' : ' minutes') + (s.kind || full(s.id) ? '.' : ' in full.') + '</p>'
        + '<div class="gs-tabs" role="group" aria-label="Watch or read"><button type="button" data-v="watch" aria-pressed="true">Watch</button><button type="button" data-v="read" aria-pressed="false">Read</button>' + (s.kind || vk ? '' : '<button type="button" class="gs-sharebtn" data-gs="share">' + SHARE + 'Share</button>') + '</div><p class="gs-smsg" role="status" aria-live="polite"></p>'
        + '<div class="gs-watch"></div><div class="gs-rdv" hidden></div><div class="gs-codewrap" hidden></div>'
        + (s.substack ? '<p class="gs-talk-row"><a href="' + esc(s.substack) + '" target="_blank" rel="noopener">Talk about this on Substack</a></p>' : '') + '</div>';
      document.body.appendChild(el);
      OV = { s: s, root: el, at: 0, view: 'watch', mode: 'story', from: from || document.activeElement, overflow: document.body.style.overflow, hist: false, vault: !!vk, vaultKey: vk };
      if (vk) {}
      else if (!fromHash) { try { history.pushState({ ggStory: s.slug }, '', '#' + s.slug); OV.hist = true; } catch (e) {} }
      else { try { history.replaceState({ ggStory: s.slug }, '', location.href); } catch (e) {} }
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey, true);
      el.addEventListener('click', function (e) {
        var b = e.target.closest('[data-gs],[data-v]'); if (!b) return;
        if (b.getAttribute('data-gs') === 'close') close();
        else if (b.getAttribute('data-gs') === 'ov-code') showCode(function () { play(0); });
        else if (b.getAttribute('data-gs') === 'share') shareStory(s, $('.gs-smsg', el));
        else if (b.hasAttribute('data-v')) view(b.getAttribute('data-v'));
      });
      view(v === 'read' ? 'read' : 'watch');
      var h = $('h2.gs-rh', el); if (h) try { h.focus({ preventScroll: true }); } catch (e) {}
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
      else if (g === 'share') { e.preventDefault(); var cd = b.closest('.gs-card'); shareStory(b.getAttribute('data-id'), cd && cd.querySelector('.gs-smsg')); }
      else if (g === 'lwatch' || g === 'lread') { e.preventDefault(); openLetter(b.getAttribute('data-id'), g === 'lread' ? 'read' : 'watch', b); }
      else if (/^c(print|save|mail|text)$/.test(g)) { e.preventDefault(); cardAct(g, b.getAttribute('data-id'), b); }
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
    root.addEventListener('hashchange', function () { if ((location.hash || '').slice(0, 3) === '#k=') { takeKey(); restore().then(function () { render(); }); return; } fromHash(); });
    restore().then(function () { render(); fromHash(); });
  }

  root.GGStories = {
    version: 'b786', lines: LINES, words: WORDS, look: LOOK, topics: TOPICS, themesOf: themesOf,
    seal: seal, previewCut: previewCut, makeWrap: makeWrap, newSalt: newSalt, check: check, makeCode: makeCode, normCode: normCode, sentences: sentences, spoken: spoken, slug: slug, mins: mins, creditHtml: creditHtml,
    mount: mount, unlock: unlock, forget: forget, unlocked: unlocked, restore: restore, paras: paras, full: full, keyObj: keyObj, story: story, lesson: lesson, open: open, listen: listen, remember: remember, close: function () { close(); },
    // BLD 787: the Supporter perks and story pictures
    perks: PERKS, monthLabel: monthLabel, note: noteOf, letter: letterParas, card: cardOf, cardModel: cardModel, noteLesson: noteLesson, letterLesson: letterLesson,
    spokenNote: spokenNote, spokenLetter: spokenLetter, openLetter: openLetter, listenLetter: listenLetter, imgBase: imgBase, imgTag: imgTag, _imgOk: imgOk, _imgErr: imgErr
  };
  if (root.document) takeKey();
  if (typeof module !== 'undefined' && module.exports) module.exports = root.GGStories;
})(typeof window !== 'undefined' ? window : globalThis);
