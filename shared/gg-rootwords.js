/* Grow With Grounded: Root Words (GWG BLD 780).
   Twelve plain words that can open a person's own locked record when the passcode is forgotten.
   Grow With Grounded never sees a passcode or Root Words, and nothing here is ever sent anywhere.

   How it works
   - The record's own random key is locked twice: once with the passcode and once with the Root Words.
     Each lock is PBKDF2 (250,000 rounds, SHA-256, a random 16-byte salt) turning the words into a key,
     then AES-GCM (256) with a random 12-byte IV. Either one opens the record.
   - The words are made on this device from crypto.getRandomValues: 12 words from 2,048 is 132 bits.
   - The words themselves are kept only inside the locked record, so they can be shown again after the
     passcode. They are never kept in plain text.
   - Typing is forgiving: capital letters, extra spaces, commas, and numbers do not matter, and the first
     four letters of each word are enough, since no two words share their first four letters.

   The word list: adapted from the BIP39 English word list (Bitcoin Improvement Proposal 39, by Marek
   Palatinus, Pavol Rusnak, Aaron Voisine, and Sean Bowe; github.com/bitcoin/bips, bip-0039/english.txt),
   used under the MIT License. 142 of its words were swapped for gentler everyday words (acorn, daisy,
   lantern, and others), keeping 2,048 words that each differ in their first four letters.

   GGRoot.make()                 12 new words (an array)
   GGRoot.parse(text)            {words: [...], bad: [positions, 1 based], n}; words are the full words
   GGRoot.wrap(raw, words)       Promise of {salt, iv, ct} (base64), the key locked with the words
   GGRoot.unwrap(w, words)       Promise of the key bytes, or a rejection when the words do not open it
   GGRoot.show(o)                the words, once: {words, who, title, lead, print}; Promise when finished
   GGRoot.ask(o)                 type the words: {title, lead, verify(words) -> Promise of true or a message}
   GGRoot.print(words, who)      the printable card
   GGRoot.remind(o)              a gentle note after a big moment: {lead, onBackup, onWords, wordsLabel}
   GGRoot.words                  the list */
(function () {
  if (window.GGRoot) return;
  var LIST = (
    'ability able about above absent absorb abstract absurd access account achieve acid acorn acoustic acquire ' +
    'across act action actor actress actual adapt add address adjust admit adult advance advice aerobic afford ' +
    'afraid again age agent agree ahead aim air airport aisle alarm album alert all alley allow almost alone alpha ' +
    'already also alter always amateur amazing amber among amount amused analyst anchor ancient angle animal ankle ' +
    'announce annual another answer antenna anthem antique any apart apology appear apple approve april arch arctic ' +
    'area arena argue arm around arrange arrive arrow art artefact artist artwork ask aspect asset assist assume ' +
    'athlete atom attend attitude attract auction audit august aunt author auto autumn average avocado avoid awake ' +
    'aware away awesome awkward axis baby backpack bacon badge bag bagel bakery balance balcony ball bamboo banana ' +
    'banjo banner banquet bar barely bargain barrel base basic basket battle bay beach bean beauty because become ' +
    'beef before begin behave behind believe below belt bench benefit best better between beyond bicycle bid bike ' +
    'bind biology bird birth biscuit black blade blanket blossom blouse blue bluff blur blush board boat bobcat ' +
    'body boil bone bonfire bonnet bonus book boost border boring borrow boss bottom bounce bouquet box boy bracket ' +
    'brain brand brass brave bread breeze brick bridge brief bright bring brisk broccoli broken bronze broom ' +
    'brother brown brush bubble buddy budget buffalo build bulb bulk bundle bungalow burger burst bus business busy ' +
    'butter buyer buzz cabbage cabin cable cactus cake call calm camera camp can canal cancel candy cannon canoe ' +
    'canvas canyon capable capital captain car caramel carbon card cargo carpet carry cart case cash castle casual ' +
    'cat catalog catch category cattle caught cause caution cave cedar ceiling celery cello cement census century ' +
    'cereal certain chair chalk champion change chapter charge chase chat cheap check cheese chef cherry chest ' +
    'chicken chief child chimney chipmunk choice choose chuckle chunk churn cinnamon circle citizen city civil ' +
    'claim clap clarify claw clay clean clerk clever click client cliff climb clinic clip clock clog close cloth ' +
    'cloud clover clown club clump cluster clutch coach coast cobalt cobble coconut code coffee coil coin collect ' +
    'color column combine come comfort comic common company concert conduct confirm congress connect consider ' +
    'control convince cook cool copper copy coral core corn correct cost cotton couch country couple course cousin ' +
    'cover coyote cozy crack cradle craft cram crane crater crawl cream credit creek crew cricket crisp critic crop ' +
    'cross crouch crowd crucial cruise crumble crunch crush crystal cube culture cup cupboard cupcake curious ' +
    'current curtain curve cushion custom cute cycle dad daisy damp dance daring dash daughter dawn day deal debate ' +
    'debris decade december decide decline decorate decrease deer defense define defy degree delay deliver demand ' +
    'dentist deny depart depend deposit depth deputy derive describe desert design desk detail detect develop ' +
    'device devote dew diagram dial diamond diary dice diesel diet differ digital dignity dilemma dimple dinner ' +
    'dinosaur direct dirt discover dish dismiss display distance divert divide doctor document dog doll dolphin ' +
    'domain donate donkey donor doodle door double dove draft dragon drama draw dream dress drift drill drink drip ' +
    'drive drop drum dry duck dumpling dune during dust dutch duty dynamic eager eagle early earn earth easel ' +
    'easily east easy echo ecology economy edge edit educate effort egg eight either elbow elder electric elegant ' +
    'element elephant elevator elite elm else embark ember embody embrace emerge emotion employ empower empty ' +
    'enable enact end endless endorse energy enforce engage engine enhance enjoy enlist enough enrich enroll ensure ' +
    'enter entire entry envelope episode equal equip era erase erode erosion error erupt escape essay essence ' +
    'estate eternal ethics evidence evoke evolve exact example excess exchange excite exclude excuse exercise ' +
    'exhaust exhibit exist exit exotic expand expect expire explain expose express extend extra eye eyebrow fable ' +
    'fabric face faculty fade faint falcon fall false fame family famous fan fancy fantasy farm fashion father ' +
    'fatigue fault favorite feature february federal fee feed feel fence fern festival fetch few fiber fiction ' +
    'fiddle field fiesta fig figure file film filter final find fine finger finish fire firm first fiscal fish fit ' +
    'fitness fix flag flame flannel flash flat flavor flee flight flip float flock floor flower fluid flush flute ' +
    'fly foam focus fog foil fold follow food foot force forest forget fork fortune forum forward fossil foster ' +
    'found fox fragile frame frequent fresh friend fringe frog front frost frown frozen fruit fuel fun funny ' +
    'furnace future gadget gain galaxy gallery game gap garage garbage garden garlic garment garnet gas gasp gate ' +
    'gather gauge gaze general genius genre gentle genuine gesture ghost giant gift giggle ginger giraffe girl give ' +
    'glacier glad glance glare glass glen glide glimpse globe glory glove glow glue goat gold gondola good goose ' +
    'gorilla gossip govern gown grab grace grain grant grape grass gravity great green grid grit grocery group grow ' +
    'grunt guard guess guide guitar gumdrop gym habit hair half hallway hammer hamster hand happy harbor hard ' +
    'harmony harp harvest hat have hawk haystack hazel head health heart heavy hedgehog height hello helmet help ' +
    'hen hero hidden high hiking hill hint hip hire history hobby hockey hold hole holiday hollow home honey hood ' +
    'hope horn horse hospital host hotel hour hover hub hug huge human humble humor hundred hungry hunt hurdle ' +
    'hurry husband hybrid ice icon idea identify idle igloo ignore image imitate immense immune impact impose ' +
    'improve impulse inch include income increase index indicate indoor industry infant inform inhale inherit ' +
    'initial inlet inner innocent input inquiry insect inside inspire install intact interest into invest invite ' +
    'involve iris iron island isolate issue item ivory jacket jaguar jar jasmine jazz jeans jelly jewel jigsaw job ' +
    'join joke journey joy judge juice jump jungle junior junk just kangaroo kayak kazoo keen keep kestrel ketchup ' +
    'kettle key kick kid kind kingdom kiss kit kitchen kite kitten kiwi knee knife knock know lab label labor ' +
    'ladder ladle lady lagoon lake lamp language lantern laptop large later latin laugh laundry lava lavender law ' +
    'lawn layer leader leaf learn leave lecture left leg legal legend leisure lemon lend length lens leopard lesson ' +
    'letter level liberty library license life lift light like lilac limb limit linen link lion liquid list little ' +
    'live lizard load loan lobby lobster local lock logic long loop loud lounge love loyal lucky luggage lullaby ' +
    'lumber lunar lunch luxury lyrics machine magic magnet maid mail main major make mallard mammal man manage ' +
    'mandate mango mansion mantle manual maple marble march margin marine market marriage mask mass master match ' +
    'material math matrix matter maximum maze meadow mean measure meat mechanic medal media melody melt member ' +
    'memory mention menu mercy merge merit merry mesh message metal method middle midnight milk million mimic mind ' +
    'minimum minnow minor mint minute mirror miss mistake mix mixed mixture mobile model modify mom moment monitor ' +
    'monkey monster month moon moral more morning mosaic mosquito moss mother motion motor mountain mouse move ' +
    'movie much muffin mulberry mule multiply muscle museum mushroom music must mutual myself mystery myth naive ' +
    'name napkin narrow nation nature near neck nectar need negative neither nephew nerve nest net network neutral ' +
    'never news next nice night noble noise nominee noodle nook normal north nose notable note nothing notice novel ' +
    'now nugget number nurse nut nutmeg oak oatmeal obey object oblige oboe obscure observe obtain obvious occur ' +
    'ocean october odor off offer office often oil okay old olive olympic omit once one onion online only open ' +
    'opera opinion oppose option orange orbit orchard order ordinary organ orient original ostrich other otter ' +
    'outdoor outer output outside oval oven over own owner oxygen oyster ozone pact paddle page pair pajamas palace ' +
    'palm pancake panda panel panther papaya paper paprika parade parent park parrot parsley party pass patch path ' +
    'patient patrol pattern pause pave payment peace peanut pear peasant pebble pecan pelican pen penalty pencil ' +
    'people pepper perfect permit person pet petal phone photo phrase physical piano picnic picture piece pig ' +
    'pigeon pilot pinecone pink pinwheel pioneer pipe pitch pizza place planet plastic plate play plaza please ' +
    'pledge pluck plug plunge poem poet point polar pole police pond pony pool poppy popular porch portion position ' +
    'possible post potato pottery powder power practice praise predict prefer prepare present pretty prevent price ' +
    'primary print priority private prize problem process produce profit program project promote proof property ' +
    'prosper protect proud provide public pudding puffin pull pulp pulse pumpkin pupil puppy purchase purity ' +
    'purpose purse push put puzzle pyramid quality quantum quarter question quick quiet quilt quit quiz quote ' +
    'rabbit raccoon race rack radar radio raft rail rain raise rally ramp ranch random range rapid rare rate rather ' +
    'raven raw razor ready real reason rebel rebuild recall receive recipe record recycle reduce reef reflect ' +
    'reform refuse region regret regular reject relax release relief rely remain remember remind remove render ' +
    'renew rent reopen repair repeat replace report require rescue resemble resist resource response result retire ' +
    'retreat return reunion reveal review reward rhythm rib ribbon rice rich riddle ride ridge right rigid ring ' +
    'ripple risk ritual rival river road roast robin robot robust rocket romance roof rookie room rose rotate rough ' +
    'round route rowboat royal rubber rug rule run runway rural saddle safe saffron sage sail salad salmon salon ' +
    'salsa salt salute same sample sand sapling sapphire sardine satisfy sauce sausage save say scale scan scarf ' +
    'scatter scene scheme school science scissors scone scorpion scout scrap screen script scrub sea search season ' +
    'seat second secret section security seed seek segment select sell seminar senior sense sentence series service ' +
    'session settle setup seven shadow shaft shallow shamrock share shed shell sheriff shield shift shine ship ' +
    'shiver shoe shop short shoulder shove shrimp shrug shuffle shy sibling side sight sign silent silk silly ' +
    'silver similar simple since sing siren sister situate six size skate sketch ski skill skin skirt skylark slab ' +
    'slam sleep slender slice slide slight slim slogan slot slow slush small smart smile smoke smooth snack snake ' +
    'snap sniff snow soap soccer social sock soda soft solar solid solution solve someone song soon sorry sort ' +
    'sound soup source south space spare spatial spawn speak special speed spell spend sphere spice spider spike ' +
    'spin split spoil sponsor spoon sport spot spray spread spring sprout square squeeze squirrel stable stadium ' +
    'staff stage stairs stamp stand start state stay steak steel stem step stereo stick still sting stock stomach ' +
    'stone stool story stove strategy street strike strong struggle student stuff stumble style subject submit ' +
    'subway success such sudden sugar suggest suit summer sun sunbeam sundial sunny sunrise sunset super supply ' +
    'supreme sure surface surge surprise surround survey sustain swallow swamp swap swarm sweet swift swim swing ' +
    'switch symbol syrup system table tackle tag tail talent talk tank tape target task taste tattoo taxi teach ' +
    'team teapot tell ten tenant tennis tent term test text thank that theme then theory there they thimble thing ' +
    'this thought three thrive throw thumb thunder thyme ticket tide tiger tilt timber time tinsel tiny tip tired ' +
    'tissue title toast today toddler toe together token tomato tomorrow tone tongue tonight tool tooth top topic ' +
    'topple torch tornado tortoise toss total tourist toward tower town toy track trade traffic train transfer trap ' +
    'trash travel tray treat tree trellis trend trial tribe trick trim trip trophy trouble truck true truly trumpet ' +
    'trust truth try tuba tube tugboat tuition tulip tumble tuna tundra tunnel turkey turn turtle twelve twenty ' +
    'twice twin twist two type typical ukulele umbrella umpire unable unaware uncle uncover under undo unfair ' +
    'unfold uniform unique unit universe unknown unlock until unusual unveil update upgrade uphold upon upper urban ' +
    'urge usage use used useful usual utility vacant vacuum vague valid valley valve van vanish vapor various vast ' +
    'vault vehicle velvet vendor venture venue verb verify version very vessel veteran viable vibrant victory video ' +
    'view village vintage violin virtual visa visit vista visual vital vivid vocal voice void volcano volume vote ' +
    'voyage waffle wage wagon wait walk wall walnut walrus waltz want warm wash wasp waste water wave way wealth ' +
    'wear weasel weather web wedding weekend weird welcome west wet whale what wheat wheel when where whip whisper ' +
    'wicker wide width wife wild will win window wing wink winner winter wire wisdom wise wish witness wolf woman ' +
    'wonder wood wool word work world worry worth wrap wren wrestle wrist write wrong yard yarn year yellow yodel ' +
    'yogurt you young youth zebra zero zest zinnia zipper zone zoo '
  ).trim().split(' ');
  var N = 12, ROUNDS = 250000, subtle = window.crypto && crypto.subtle, enc = new TextEncoder();
  var BY4 = {}, BY3 = {};
  LIST.forEach(function (w) { if (w.length === 3) BY3[w] = w; else BY4[w.slice(0, 4)] = w; });

  function b64(u) { var s = ''; for (var i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); }
  function unb64(s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---------- making and reading the words ---------- */
  function make() {
    var r = crypto.getRandomValues(new Uint16Array(N)), out = [];
    for (var i = 0; i < N; i++) out.push(LIST[r[i] & 2047]); // 2,048 words: 11 bits each, evenly
    return out;
  }
  function match(t) {
    if (t.length < 3) return null;
    if (t.length === 3) return BY3[t] || null;
    var w = BY4[t.slice(0, 4)];
    return w || null;
  }
  function parse(text) {
    var toks = String(text || '').normalize('NFKC').toLowerCase().replace(/[^a-z]+/g, ' ').trim().split(' ').filter(Boolean);
    var words = [], bad = [];
    toks.forEach(function (t, i) { var w = match(t); words.push(w || t); if (!w) bad.push(i + 1); });
    return { words: words, bad: bad, n: toks.length, ok: toks.length === N && !bad.length };
  }
  function phrase(words) { return words.join(' '); }
  function key(words, salt) {
    return subtle.importKey('raw', enc.encode(phrase(words)), 'PBKDF2', false, ['deriveKey']).then(function (base) {
      return subtle.deriveKey({ name: 'PBKDF2', salt: salt, iterations: ROUNDS, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    });
  }
  function wrap(raw, words) {
    var salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    return key(words, salt).then(function (k) { return subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, raw); })
      .then(function (ct) { return { salt: b64(salt), iv: b64(iv), ct: b64(new Uint8Array(ct)) }; });
  }
  function unwrap(w, words) {
    if (!w || !w.salt) return Promise.reject(new Error('none'));
    return key(words, unb64(w.salt)).then(function (k) { return subtle.decrypt({ name: 'AES-GCM', iv: unb64(w.iv) }, k, unb64(w.ct)); })
      .then(function (pt) { return new Uint8Array(pt); });
  }

  /* ---------- look and feel (follows the page's light or dark) ---------- */
  var CSS = '' +
    '.ggr-back{position:fixed;inset:0;z-index:100001;background:rgba(20,16,12,.58);display:flex;align-items:flex-start;justify-content:center;padding:4vh 14px;overflow-y:auto;}' +
    '.ggr{--r-bg:#FAF7F2;--r-card:#FFFFFF;--r-ink:#2C1810;--r-soft:#6B5A48;--r-line:#E6D9C2;--r-gold:#8B5E1A;--r-gold-soft:#F4EAD6;--r-on-gold:#FFFFFF;--r-warn:#9B3B2B;' +
    'width:min(540px,100%);background:var(--r-bg);color:var(--r-ink);border-radius:20px;box-shadow:0 24px 60px rgba(0,0,0,.3);padding:24px 22px 20px;font:16px/1.5 Barlow,system-ui,sans-serif;text-align:left;margin:auto 0;color-scheme:light;box-sizing:border-box;}' +
    '.ggr *{box-sizing:border-box;}' +
    '.ggr h2{font:600 28px/1.15 "Cormorant Garamond",Georgia,serif;margin:0 0 6px;color:var(--r-ink);}' +
    '.ggr p{margin:0 0 12px;color:var(--r-ink);}.ggr .ggr-small{font-size:14px;color:var(--r-soft);}' +
    '.ggr-words{list-style:none;margin:14px 0;padding:14px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px 10px;background:var(--r-card);border:1px solid var(--r-line);border-radius:14px;counter-reset:w;}' +
    '@media (max-width:420px){.ggr-words{grid-template-columns:repeat(2,minmax(0,1fr));}}' +
    '.ggr-words li{counter-increment:w;font:600 17px/1.3 Barlow,system-ui,sans-serif;color:var(--r-ink);overflow-wrap:anywhere;}' +
    '.ggr-words li::before{content:counter(w) ".";display:inline-block;min-width:1.7em;color:var(--r-soft);font-weight:500;font-size:14px;}' +
    '.ggr-note{background:var(--r-gold-soft);border-radius:12px;padding:12px 14px;font-size:15px;}' +
    '.ggr label{display:block;font-weight:600;font-size:14px;margin:12px 0 5px;}' +
    '.ggr input,.ggr textarea{width:100%;font:16px Barlow,system-ui,sans-serif;padding:11px 12px;border:1px solid var(--r-line);border-radius:10px;background:var(--r-card);color:var(--r-ink);-webkit-text-fill-color:var(--r-ink);caret-color:var(--r-ink);}' +
    '.ggr textarea{min-height:110px;resize:vertical;line-height:1.5;}' +
    '.ggr-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;align-items:center;margin-top:16px;}' +
    '.ggr-b{font:600 15px Barlow,system-ui,sans-serif;border-radius:999px;padding:11px 20px;min-height:44px;cursor:pointer;border:1px solid var(--r-gold);background:transparent;color:var(--r-gold);}' +
    '.ggr-b.ggr-go{background:var(--r-gold);color:var(--r-on-gold);}.ggr-b[disabled]{opacity:.55;cursor:default;}' +
    '.ggr-link{background:none;border:0;padding:6px 0;color:var(--r-gold);font:inherit;font-size:14px;text-decoration:underline;cursor:pointer;margin-right:auto;}' +
    '.ggr-msg{color:var(--r-warn);font-size:14px;min-height:1.2em;margin:10px 0 0 !important;}' +
    '.ggr-count{font-size:14px;color:var(--r-soft);margin:6px 0 0 !important;}' +
    '.ggr-two{display:grid;grid-template-columns:1fr 1fr;gap:10px;}' +
    '.ggr-remind{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:9000;width:min(460px,calc(100vw - 24px));background:var(--r-card);color:var(--r-ink);border:1px solid var(--r-line);border-radius:16px;box-shadow:0 14px 34px rgba(0,0,0,.22);padding:14px 44px 14px 16px;font:15px/1.45 Barlow,system-ui,sans-serif;text-align:left;box-sizing:border-box;' +
    '--r-card:#FFFFFF;--r-ink:#2C1810;--r-soft:#6B5A48;--r-line:#E6D9C2;--r-gold:#8B5E1A;--r-on-gold:#FFFFFF;}' +
    '.ggr-remind p{margin:0 0 4px;}.ggr-remind b{font-weight:600;}.ggr-remind .ggr-row{justify-content:flex-start;margin-top:10px;}' +
    '.ggr-remind .ggr-b{padding:8px 14px;min-height:40px;font-size:14px;}' +
    '.ggr-x{position:absolute;top:6px;right:6px;width:36px;height:36px;border:0;background:none;color:var(--r-soft);font-size:24px;line-height:1;cursor:pointer;border-radius:50%;}';
  var DARKV = '--r-bg:#1E1A15;--r-card:#28221B;--r-ink:#F3EDE3;--r-soft:#C2B6A4;--r-line:#3E352B;--r-gold:#D9A847;--r-gold-soft:#342A1D;--r-on-gold:#1E1A15;--r-warn:#F09A86;color-scheme:dark;';
  function addCSS() {
    if (document.getElementById('ggr-css')) return;
    var s = document.createElement('style'); s.id = 'ggr-css';
    s.textContent = CSS + '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .ggr,:root:not([data-theme="light"]) .ggr-remind{' + DARKV + '}}' +
      ':root[data-theme="dark"] .ggr,:root[data-theme="dark"] .ggr-remind{' + DARKV + '}';
    document.head.appendChild(s);
  }
  function modal(html) {
    addCSS();
    var back = document.createElement('div'); back.className = 'ggr-back';
    back.innerHTML = '<div class="ggr" role="dialog" aria-modal="true" aria-labelledby="ggr-h">' + html + '</div>';
    document.body.appendChild(back);
    return back;
  }
  function wordsHtml(words) { return '<ol class="ggr-words" aria-label="Your 12 Root Words">' + words.map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') + '</ol>'; }
  var SAFE = 'Keep these somewhere safe. With them, your tree can grow back.';
  var SEED = 'Like a seed phrase, just for you.';

  /* ---------- the printable card ---------- */
  function print(words, who) {
    var doc = '<!doctype html><html><head><meta charset="utf-8"><title>My Root Words</title><style>' +
      'body{font-family:Georgia,serif;color:#2C1810;margin:0;padding:28px;}' +
      '.card{border:2px solid #8B5E1A;border-radius:16px;padding:22px 24px;max-width:520px;margin:0 auto;}' +
      'h1{font-size:26px;margin:0 0 4px;}p{font-family:Arial,sans-serif;font-size:14px;line-height:1.5;margin:6px 0;}' +
      'ol{columns:3;column-gap:22px;font-family:Arial,sans-serif;font-size:17px;font-weight:bold;margin:16px 0;padding-left:28px;}li{margin:0 0 8px;}' +
      '.small{color:#6B5A48;font-size:12.5px;}</style></head><body><div class="card"><h1>My Root Words</h1>' +
      (who ? '<p><b>For ' + esc(who) + '</b></p>' : '') +
      '<p>' + SAFE + '</p><ol>' + words.map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') + '</ol>' +
      '<p class="small">' + SEED + ' Keep them in order. If you forget your passcode, choose Forgot your passcode, then Use My Root Words, and set a new passcode. Grow With Grounded never sees these words and cannot recover them.</p>' +
      '<p class="small">growwithgrounded.com</p></div></body></html>';
    var f = document.createElement('iframe'); f.setAttribute('aria-hidden', 'true'); f.title = 'My Root Words card';
    f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0;';
    document.body.appendChild(f);
    var d = f.contentWindow.document; d.open(); d.write(doc); d.close();
    setTimeout(function () { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) {} setTimeout(function () { f.remove(); }, 60000); }, 250);
  }

  /* ---------- show the words (once, at the start; again later after the passcode) ---------- */
  function show(o) {
    o = o || {};
    var words = o.words || [];
    return new Promise(function (resolve) {
      var back = modal(''), box = back.firstChild, prev = document.activeElement;
      function close() { back.remove(); document.removeEventListener('keydown', key); try { if (prev && prev.focus) prev.focus(); } catch (e) {} resolve(true); }
      function key(e) { if (e.key === 'Escape') close(); }
      document.addEventListener('keydown', key);
      function first() {
        box.innerHTML = '<h2 id="ggr-h">' + esc(o.title || 'Your Root Words') + '</h2>' +
          '<p>' + esc(o.lead || 'If you ever forget your passcode, these 12 words open your tree again, so you can choose a new passcode.') + '</p>' +
          '<p class="ggr-note"><b>' + SAFE + '</b><br><span class="ggr-small">' + SEED + '</span></p>' +
          wordsHtml(words) +
          '<p class="ggr-small">Write them down in order, or print the card, and keep it somewhere private. They never leave this device, so no one, including us, can recover them. ' + (o.again ? '' : 'You can see them again in Settings, after your passcode.') + '</p>' +
          '<div class="ggr-row"><button type="button" class="ggr-b" data-r="print">Print My Card</button>' +
          (o.again ? '<button type="button" class="ggr-b ggr-go" data-r="done">Done</button>' : '<button type="button" class="ggr-b ggr-go" data-r="next">I Kept Them Safe</button>') + '</div>';
        box.querySelector('[data-r="print"]').onclick = function () { print(words, o.who); };
        var n = box.querySelector('[data-r="next"]'); if (n) n.onclick = check;
        var dn = box.querySelector('[data-r="done"]'); if (dn) dn.onclick = close;
        setTimeout(function () { var f = box.querySelector('.ggr-go'); if (f) f.focus(); }, 30);
      }
      function check() {
        var a = 1 + Math.floor(Math.random() * 6), b = 7 + Math.floor(Math.random() * 6);
        box.innerHTML = '<h2 id="ggr-h">Check Two Words</h2><p>To be sure they are kept, type word ' + a + ' and word ' + b + '. The first four letters are enough.</p>' +
          '<div class="ggr-two"><div><label for="ggr-c1">Word ' + a + '</label><input id="ggr-c1" autocomplete="off" autocapitalize="off" spellcheck="false"></div>' +
          '<div><label for="ggr-c2">Word ' + b + '</label><input id="ggr-c2" autocomplete="off" autocapitalize="off" spellcheck="false"></div></div>' +
          '<p class="ggr-msg" role="alert" id="ggr-msg"></p>' +
          '<div class="ggr-row"><button type="button" class="ggr-link" data-r="skip">Skip for Now</button><button type="button" class="ggr-b" data-r="back">See Them Again</button><button type="button" class="ggr-b ggr-go" data-r="ok">Done</button></div>';
        function ok() {
          var x = parse(box.querySelector('#ggr-c1').value).words[0], y = parse(box.querySelector('#ggr-c2').value).words[0];
          if (x === words[a - 1] && y === words[b - 1]) { close(); return; }
          box.querySelector('#ggr-msg').textContent = 'Those do not match words ' + a + ' and ' + b + '. Look at your card, or see them again.';
        }
        box.querySelector('[data-r="ok"]').onclick = ok;
        box.querySelector('[data-r="back"]').onclick = first;
        box.querySelector('[data-r="skip"]').onclick = close;
        box.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.tagName === 'INPUT') ok(); });
        setTimeout(function () { box.querySelector('#ggr-c1').focus(); }, 30);
      }
      first();
    });
  }

  /* ---------- type the words (Forgot your passcode) ---------- */
  function ask(o) {
    o = o || {};
    return new Promise(function (resolve) {
      var back = modal('<h2 id="ggr-h">' + esc(o.title || 'Use My Root Words') + '</h2>' +
        '<p>' + esc(o.lead || 'Type your 12 Root Words in order. Capital letters and extra spaces do not matter, and the first four letters of each word are enough.') + '</p>' +
        '<label for="ggr-in">Your Root Words</label><textarea id="ggr-in" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-describedby="ggr-cnt"></textarea>' +
        '<p class="ggr-count" id="ggr-cnt" aria-live="polite">0 of 12 words</p><p class="ggr-msg" role="alert" id="ggr-msg"></p>' +
        '<div class="ggr-row"><button type="button" class="ggr-b" data-r="no">Cancel</button><button type="button" class="ggr-b ggr-go" data-r="ok">' + esc(o.ok || 'Open With My Root Words') + '</button></div>');
      var box = back.firstChild, ta = box.querySelector('#ggr-in'), msg = box.querySelector('#ggr-msg'), cnt = box.querySelector('#ggr-cnt'), busy = false, prev = document.activeElement;
      function close(v) { back.remove(); try { if (prev && prev.focus) prev.focus(); } catch (e) {} resolve(v); }
      ta.addEventListener('input', function () { var r = parse(ta.value); cnt.textContent = r.n + ' of 12 words' + (r.bad.length ? '. Check word ' + r.bad.join(', ') + '.' : ''); });
      function go() {
        if (busy) return;
        var r = parse(ta.value);
        if (r.bad.length) { msg.textContent = 'Word ' + r.bad[0] + ' is not one of the Root Words. Check it on your card.'; return; }
        if (r.n !== N) { msg.textContent = 'Type all 12 words, in order. You have ' + r.n + '.'; return; }
        if (!o.verify) return close(r.words);
        busy = true; msg.textContent = 'One moment...'; box.querySelector('[data-r="ok"]').disabled = true;
        Promise.resolve(o.verify(r.words)).then(function (res) {
          busy = false; box.querySelector('[data-r="ok"]').disabled = false;
          if (res === true) close(r.words); else msg.textContent = res || 'Those Root Words do not open this. Check the order and try again.';
        }, function () { busy = false; box.querySelector('[data-r="ok"]').disabled = false; msg.textContent = 'Those Root Words do not open this. Check the order and try again.'; });
      }
      box.addEventListener('click', function (e) { var r = e.target.getAttribute && e.target.getAttribute('data-r'); if (r === 'no') close(null); else if (r === 'ok') go(); });
      back.addEventListener('click', function (e) { if (e.target === back) close(null); });
      box.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(null); else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) go(); });
      setTimeout(function () { ta.focus(); }, 30);
    });
  }

  /* ---------- a gentle note after a big moment ---------- */
  function remind(o) {
    o = o || {}; addCSS();
    var old = document.querySelector('.ggr-remind'); if (old) old.remove();
    var el = document.createElement('div'); el.className = 'ggr-remind'; el.setAttribute('role', 'status');
    el.innerHTML = (o.lead ? '<p class="ggr-small" style="color:var(--r-soft)">' + esc(o.lead) + '</p>' : '') + '<p><b>Save a backup and keep your Root Words safe.</b></p>' +
      '<div class="ggr-row"><button type="button" class="ggr-b ggr-go" data-r="bk">Save a Backup</button><button type="button" class="ggr-b" data-r="rw">' + esc(o.wordsLabel || 'See My Root Words') + '</button></div>' +
      '<button type="button" class="ggr-x" data-r="x" aria-label="Close">&times;</button>';
    document.body.appendChild(el);
    el.addEventListener('click', function (e) {
      var r = e.target.closest && e.target.closest('[data-r]'); if (!r) return;
      var a = r.getAttribute('data-r'); el.remove();
      if (a === 'bk' && o.onBackup) o.onBackup(); else if (a === 'rw' && o.onWords) o.onWords();
    });
    return el;
  }

  window.GGRoot = { make: make, parse: parse, wrap: wrap, unwrap: unwrap, show: show, ask: ask, print: print, remind: remind, words: LIST, N: N, SAFE: SAFE, SEED: SEED };
})();
