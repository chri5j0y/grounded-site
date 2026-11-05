/* =====================================================================
   GROUNDED . THE TREE ROOM (shared/gg-room.js), GWG BLD 908
   Chris, November 3, 2026: "i want to try to have one app not many apps.. a tree is a profile and decides what vids and
   guides etc one sees". Home (/home/) is the one Grounded app, and Maple, Aspen, Pine, Birch, Oak, and Sequoia live
   inside it. Each tree page loads this file first, in its head.

   The door: opened on its own (the top of the window), the page becomes a door. It replaces itself with
   /home/?tree=<tree>, keeping the old query and hash (/oak/?guided=checkin#life=grief becomes
   /home/?tree=oak&guided=checkin#life=grief), so every printed link, QR code, visit link, guide link, and lesson link
   keeps working. Nothing on the page runs a second time: the page stays hidden while the door opens.

   The room: opened inside Home (or inside another Grounded page's frame), the page runs as it always has, with the
   same saved records. Inside Home, the room reads Membership from Home (window.top.GGHome.member()), so the lock
   lives in one place, and it shows one quiet line in forward words over the growth plan for a Start person.

   For tools and tests
     GGRoom.tree        the tree of this page ('oak')
     GGRoom.inHome      true inside Home
     GGRoom.member()    Home's Membership answer (false outside Home)
     GGRoom.door(loc)   the Home address a door opens for a location-like {pathname, search, hash}
   No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGRoom) return;
  var TREES = /^\/(maple|aspen|pine|birch|oak|sequoia)\/(index\.html)?$/;
  function door(loc) {
    var m = TREES.exec(loc.pathname || ''); if (!m) return '';
    var q = String(loc.search || '').replace(/^\?/, '');
    return '/home/?tree=' + m[1] + (q ? '&' + q : '') + (loc.hash || '');
  }
  var tree = (TREES.exec(location.pathname) || [])[1] || '';
  var top = false, inHome = false;
  try { top = window.self === window.top; } catch (e) { top = false; }
  try { inHome = !top && /^\/home\//.test(window.top.location.pathname); } catch (e) { inHome = false; }
  var api = {
    tree: tree, inHome: inHome, door: door,
    member: function () { try { return !!(inHome && window.top.GGHome && typeof window.top.GGHome.member === 'function' && window.top.GGHome.member()); } catch (e) { return false; } }
  };
  window.GGRoom = api;
  if (!tree) return;

  // The door. A crawler or a browser without scripts still reads the page itself.
  if (top) {
    var to = door(location);
    if (to) {
      api.leaving = true;
      try { document.documentElement.style.visibility = 'hidden'; } catch (e) {}
      location.replace(to);
      return;
    }
  }
  if (!inHome) return;

  // The room inside Home: one quiet line over the growth plan for a Start person (never inside a check-in, never on a kid tree).
  var KID = tree === 'maple' || tree === 'aspen';
  var LINE = 'Your growth plan brings one practice a day for each of the four to Today, taking turns through the ones you choose. Membership adds your own custom practices, trends, practice history, and reminders.';
  function mark() {
    if (KID || api.member()) { var o = document.getElementById('gg-room-plan'); if (o) o.remove(); return; }
    var v = document.getElementById('client-growthplan'); if (!v || document.getElementById('gg-room-plan')) return;
    var p = document.createElement('p'); p.id = 'gg-room-plan'; p.className = 'gg-room-plan';
    p.textContent = LINE;
    v.insertBefore(p, v.firstChild);
  }
  function css() {
    if (document.getElementById('gg-room-css')) return;
    var st = document.createElement('style'); st.id = 'gg-room-css';
    st.textContent = '.gg-room-plan{margin:10px 0 14px;padding:12px 14px;border-radius:14px;border:1px solid rgba(139,94,26,.35);background:rgba(217,168,71,.12);font:500 15px/1.45 Barlow,system-ui,sans-serif;}';
    (document.head || document.documentElement).appendChild(st);
  }
  function start() {
    css(); mark();
    try { if (window.top.GGMember && typeof window.top.GGMember.on === 'function') window.top.GGMember.on(mark); } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
