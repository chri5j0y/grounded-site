/* =====================================================================
   GROUNDED SHARED CARE PLAN
   One small record every tool on growwithgrounded.com can read.
   It holds only practice check-offs and check-in handoffs. No journal
   entries, no notes, nothing else. It stays in this browser.

   GGCare.check(who, practiceName, date, on)   mark a practice done or not
   GGCare.isChecked(who, practiceName, date)   true if done in any tool
   GGCare.send({from, who, age, answers})       hand check-in answers to Garden
                                                answers use Garden ids: {"hope.3": 4}
   GGCare.inbox(who)                            recent handoffs, newest first
   GGCare.dismiss(from, who)                    remove a handoff once used
   ===================================================================== */
(function () {
  var KEY = 'gg-shared-v1';
  function read() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function write(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} }
  function slug(s) { return String(s || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function today() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function whoKey(w) { return slug(w || 'me') || 'me'; }

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
    send: function (entry) {
      var d = read(); var w = whoKey(entry.who);
      d.inbox = (d.inbox || []).filter(function (x) { return !(x.from === entry.from && x.who === w); });
      d.inbox.push({ from: entry.from, who: w, name: entry.name || '', age: entry.age || 'adult', date: today(), answers: entry.answers || {} });
      d.inbox = d.inbox.slice(-20);
      write(d);
    },
    inbox: function (who) {
      var list = read().inbox || [];
      if (who) { var w = whoKey(who); list = list.filter(function (x) { return x.who === w; }); }
      return list.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    },
    dismiss: function (from, who) {
      var d = read(); var w = whoKey(who);
      d.inbox = (d.inbox || []).filter(function (x) { return !(x.from === from && x.who === w); });
      write(d);
    }
  };
})();
