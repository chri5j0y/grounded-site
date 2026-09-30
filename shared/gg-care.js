/* =====================================================================
   GROUNDED SHARED CARE PLAN
   Practice check-offs are a small open record every tool on
   growwithgrounded.com can read: practice names and dates only.
   Check-in handoffs hold real answers, so they travel inside the
   person's own locked Grounded profile, never in open storage.

   GGCare.check(who, practiceName, date, on)   mark a practice done or not
   GGCare.isChecked(who, practiceName, date)   true if done in any tool
   GGCare.days(who)                             dates with any check-off, oldest first
   GGCare.daysTended(who)                       how many of those dates
   GGCare.send({from, who, name, age, answers}) hand check-in answers to Garden
                                                who is a profile id that is open now
                                                answers use Garden ids: {"hope.3": 4}
                                                returns true once it is locked away
   GGCare.inbox(who)                            recent handoffs, newest first
                                                (empty unless that profile is open)
   GGCare.dismiss(from, who)                    remove a handoff once used
   GGCare.rename(from, to)                      move check-offs to a new name
   GGCare.forget(who)                           erase one person's check-offs
   ===================================================================== */
(function () {
  var KEY = 'gg-shared-v1';
  function read() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function write(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} }
  function slug(s) { return String(s || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function today() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function whoKey(w) { return slug(w || 'me') || 'me'; }
  // The locked inbox inside an open profile, or null.
  function box(who) {
    var G = window.GGP; if (!who || !G || !G.isOpen || !G.isOpen(who)) return null;
    var d = G.data(who, 'inbox'); if (!Array.isArray(d.list)) d.list = [];
    return d;
  }
  function store(who) { try { window.GGP.save(who); } catch (e) {} }
  // Handoffs saved before profiles locked them move in, then leave open storage.
  function moveIn(who, b) {
    var d = read(), w = whoKey(who), old = (d.inbox || []).filter(function (x) { return x.who === w; });
    if (!old.length) return;
    old.forEach(function (x) { b.list = b.list.filter(function (y) { return y.from !== x.from; }); b.list.push(x); });
    b.list = b.list.slice(-20);
    d.inbox = (d.inbox || []).filter(function (x) { return x.who !== w; });
    write(d); store(who);
  }

  window.GGCare = {
    slug: slug,
    check: function (who, name, date, on) {
      var d = read(); d.care = d.care || {};
      var p = d.care[whoKey(who)] = d.care[whoKey(who)] || {};
      var day = p[date || today()] = p[date || today()] || {};
      if (on) day[slug(name)] = 1; else delete day[slug(name)];
      // keep about a year of days
      var keys = Object.keys(p).sort(); while (keys.length > 400) delete p[keys.shift()];
      write(d);
    },
    isChecked: function (who, name, date) {
      var p = (read().care || {})[whoKey(who)] || {};
      return !!(p[date || today()] || {})[slug(name)];
    },
    daysTended: function (who) {
      var p = (read().care || {})[whoKey(who)] || {};
      return Object.keys(p).filter(function (k) { return Object.keys(p[k]).length; }).length;
    },
    days: function (who) {
      var p = (read().care || {})[whoKey(who)] || {};
      return Object.keys(p).filter(function (k) { return Object.keys(p[k]).length; }).sort();
    },
    send: function (entry) {
      var b = box(entry.who); if (!b) return false;
      b.list = b.list.filter(function (x) { return x.from !== entry.from; });
      b.list.push({ from: entry.from, who: whoKey(entry.who), name: entry.name || '', age: entry.age || 'adult', date: today(), answers: entry.answers || {} });
      b.list = b.list.slice(-20);
      store(entry.who);
      return true;
    },
    inbox: function (who) {
      var b = box(who); if (!b) return [];
      moveIn(who, b);
      return b.list.slice().sort(function (a, c) { return a.date < c.date ? 1 : -1; });
    },
    rename: function (from, to) {
      var d = read(), a = whoKey(from), b = whoKey(to); d.care = d.care || {};
      if (a === b || !d.care[a]) return;
      var dest = d.care[b] = d.care[b] || {};
      Object.keys(d.care[a]).forEach(function (day) { dest[day] = Object.assign(dest[day] || {}, d.care[a][day]); });
      delete d.care[a];
      (d.inbox || []).forEach(function (x) { if (x.who === a) x.who = b; });
      write(d);
    },
    forget: function (who) {
      var d = read(), w = whoKey(who);
      if (d.care) delete d.care[w];
      d.inbox = (d.inbox || []).filter(function (x) { return x.who !== w; });
      write(d);
    },
    dismiss: function (from, who) {
      var b = box(who);
      if (b) { b.list = b.list.filter(function (x) { return x.from !== from; }); store(who); }
      var d = read(), w = whoKey(who);
      d.inbox = (d.inbox || []).filter(function (x) { return !(x.from === from && x.who === w); });
      write(d);
    }
  };
})();
