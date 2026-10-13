// GROUNDED FIELD GUIDE (TM): the offline copy (GWG BLD 797). (c) 2026 Grow With Grounded LLC.
// Keeps the Field Guide working with no signal once it has opened here with a connection.
//  The page, the sealed libraries (lib-guide.js, lib-staff.js, lib-founder.js, already encrypted), codes.js, and data
//  files without a ?v=: network first, so updates arrive whenever there is a connection; the saved copy answers when
//  the network is gone or too slow.
//  Scripts and stylesheets with a ?v=, and fonts: saved copy first (a new ?v= is a new address).
//  Pictures and icons without a ?v=: the saved copy at once, refreshed in the background.
//  Recorded audio and video stay online only: when offline they fail quietly, and Listen and the videos skip them.
// The address of this file carries ?b=, a tag made from every ?v= on the page (offline.js). A new tag installs a new
// copy under its own name, which reuses unchanged files from the last copy and then clears it.
var TAG = new URL(self.location.href).searchParams.get('b') || '0';
var NAME = 'gfg-' + TAG, PREFIX = 'gfg-';
var SCOPE = self.registration.scope, SCOPE_PATH = new URL(SCOPE).pathname, ORIGIN = self.location.origin;
var LIBS = ['codes.js', 'lib-guide.js', 'lib-staff.js', 'lib-founder.js'];
var LIB_RE = /\/field-guide\/(codes|lib-guide|lib-staff|lib-founder|lib-field)\.js$/;
var MEDIA = /\.(mp3|m4a|aac|wav|ogg|oga|opus|flac|mp4|m4v|webm|mov)$/i;
var ASSET = /\.(js|css|svg|png|webp|jpe?g|gif|ico|woff2?|json)$/i;
var STILL = /\.(svg|png|webp|jpe?g|gif|ico|css)$/i;
var FONT = /\.woff2?$/i;
var WAIT_PAGE = 6000, WAIT_LIB = 10000;

function keyOf(u) { return u.searchParams.has('v') ? u.href : u.origin + u.pathname; }
function isPage(u) { return u.pathname === SCOPE_PATH || u.pathname === SCOPE_PATH + 'index.html'; }
function okToKeep(r) { return r && r.ok && r.status === 200 && r.type === 'basic'; }

// ---------- install: save everything the Field Guide needs ----------
function refs(text, base, css) {
  var out = [], m, re;
  re = /(?:src|href)\s*=\s*["']([^"'#<>{}$`\s]+)["']/g;
  while ((m = re.exec(text))) out.push(m[1]);
  re = /["'`]((?:\.\.\/|\/)[A-Za-z0-9_\-\/.]+?\.[a-z0-9]+(?:\?v=[A-Za-z0-9_.\-]+)?)["'`]/g;
  while ((m = re.exec(text))) out.push(m[1]);
  if (css) { re = /url\(\s*["']?([^"')]+)["']?\s*\)/g; while ((m = re.exec(text))) out.push(m[1]); }
  var L = [];
  out.forEach(function (x) {
    try {
      var u = new URL(x, base);
      if (u.origin !== ORIGIN || MEDIA.test(u.pathname) || !ASSET.test(u.pathname) || LIB_RE.test(u.pathname)) return;
      var q = u.searchParams.get('v'); u.search = q ? '?v=' + q : ''; u.hash = '';
      if (L.indexOf(u.href) < 0) L.push(u.href);
    } catch (e) {}
  });
  return L;
}
function olderCaches() { return caches.keys().then(function (K) { return K.filter(function (k) { return k.indexOf(PREFIX) === 0 && k !== NAME; }); }); }
function fromOlder(old, key) {
  return old.reduce(function (p, n) { return p.then(function (hit) { return hit || caches.open(n).then(function (c) { return c.match(key); }); }); }, Promise.resolve(null));
}
function pool(items, n, fn) {
  var i = 0;
  function next() { if (i >= items.length) return Promise.resolve(); var it = items[i++]; return Promise.resolve().then(function () { return fn(it); }).catch(function () {}).then(next); }
  var w = []; for (var k = 0; k < n; k++) w.push(next()); return Promise.all(w);
}
function precache() {
  return Promise.all([caches.open(NAME), olderCaches()]).then(function (a) {
    var cache = a[0], old = a[1], seen = {};
    function save(href, reuse, scan) {
      if (seen[href]) return Promise.resolve(); seen[href] = 1;
      var u = new URL(href), key = keyOf(u);
      return (reuse ? fromOlder(old, key) : Promise.resolve(null)).then(function (hit) {
        if (hit && !scan) return cache.put(key, hit);
        return (hit ? Promise.resolve(hit) : fetch(href, { cache: 'no-cache' })).then(function (r) {
          if (!okToKeep(r) && !(hit && r === hit)) return;
          var keep = cache.put(key, r.clone());
          if (!scan) return keep;
          return Promise.all([keep, r.text()]).then(function (b) { return pool(refs(b[1], /\.css$/i.test(u.pathname) ? u.href : SCOPE, /\.css$/i.test(u.pathname)), 4, function (h) { var v = new URL(h); return save(h, v.searchParams.has('v') || FONT.test(v.pathname), false); }); });
        });
      });
    }
    return fetch(SCOPE, { cache: 'no-cache' }).then(function (r) {
      if (!okToKeep(r)) return;
      return Promise.all([cache.put(SCOPE, r.clone()), r.text()]).then(function (b) {
        var L = refs(b[1], SCOPE, false);
        var libs = pool(LIBS.map(function (n) { return SCOPE + n; }), 2, function (h) { return save(h, true, false); });
        var rest = pool(L, 6, function (h) {
          var u = new URL(h), local = u.pathname.indexOf(SCOPE_PATH) === 0 && /\.js$/.test(u.pathname), css = /\.css$/i.test(u.pathname);
          return save(h, u.searchParams.has('v') || FONT.test(u.pathname), local || css);
        });
        return Promise.all([libs, rest]);
      });
    });
  });
}
self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(precache().catch(function () {}));
});
// The last copy is cleared once this one holds the page and the Guide library; until then both answer.
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.open(NAME).then(function (c) {
    return Promise.all([c.match(SCOPE), c.match(SCOPE + 'lib-guide.js')]);
  }).then(function (h) {
    if (!h[0] || !h[1]) return;
    return olderCaches().then(function (K) { return Promise.all(K.map(function (k) { return caches.delete(k); })); });
  }).catch(function () {}).then(function () { return self.clients.claim(); }));
});

// ---------- answering requests ----------
function put(e, key, r) { if (!okToKeep(r)) return; var c = r.clone(); e.waitUntil(caches.open(NAME).then(function (x) { return x.put(key, c); }).catch(function () {})); }
function netFirst(e, req, key, wait) {
  return caches.match(key).then(function (hit) {
    return new Promise(function (done) {
      var over = false, t = 0;
      function end(r) { if (over) return; over = true; clearTimeout(t); done(r); }
      if (hit) t = setTimeout(function () { end(hit); }, wait);
      var net = fetch(req).then(function (r) { put(e, key, r); return r; });
      e.waitUntil(net.catch(function () {}));
      net.then(function (r) { end(!r.ok && hit ? hit : r); }, function () { end(hit || Response.error()); });
    });
  });
}
function savedFirst(e, req, key) {
  return caches.match(key).then(function (hit) {
    return hit || fetch(req).then(function (r) { put(e, key, r); return r; });
  });
}
function savedThenFresh(e, req, key) {
  return caches.match(key).then(function (hit) {
    var net = fetch(req).then(function (r) { put(e, key, r); return r; });
    e.waitUntil(net.catch(function () {}));
    return hit || net;
  });
}
self.addEventListener('fetch', function (e) {
  var req = e.request; if (req.method !== 'GET') return;
  var u = new URL(req.url); if (u.origin !== ORIGIN) return;
  if (MEDIA.test(u.pathname) || req.headers.has('range') || req.destination === 'audio' || req.destination === 'video') return;
  if (req.mode === 'navigate') { if (isPage(u)) e.respondWith(netFirst(e, req, SCOPE, WAIT_PAGE)); return; }
  // The page asks for the libraries with ?t= each time; the plain address lets the browser check them with a small request.
  if (LIB_RE.test(u.pathname)) { e.respondWith(netFirst(e, new Request(u.origin + u.pathname, { cache: 'no-cache', credentials: 'same-origin' }), u.origin + u.pathname, WAIT_LIB)); return; }
  var key = keyOf(u);
  if (u.searchParams.has('v') || FONT.test(u.pathname)) { e.respondWith(savedFirst(e, req, key)); return; }
  if (STILL.test(u.pathname)) { e.respondWith(savedThenFresh(e, req, key)); return; }
  e.respondWith(netFirst(e, req, key, WAIT_PAGE));
});
