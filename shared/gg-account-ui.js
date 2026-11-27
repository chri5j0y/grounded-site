/* =====================================================================
   GROUNDED ACCOUNT SHEETS (shared/gg-account-ui.js), GWG BLD 938 stage 1
   A small set of sheets styled like Home, for stage 2 to mount: Create My Account, Sign In, Forgot My Password,
   Use My Root Words, Start Fresh, Keep My Account, My Account (devices with Sign Out That Device, Change My Password,
   See My Root Words, New Root Words, Download My Account Data, Sign Out), Delete My Account, and Household.
   Needs shared/gg-account.js; uses shared/gg-sync.js when it is on the page, and shared/gg-rootwords.js to show words.
     GGAccountUI.open(view, opts)   view: signup, signin, forgot, recover, fresh, keep, confirm, join, account, delete,
                                    household, password, membership; opts: {token}. Promise when the sheet closes.
   BLD 1017, Start Membership (the membership view; every Start Membership button on the site opens it through
   shared/gg-join.js, and /home/#membership opens it in The Grounded Way): signed out, Create My Account (or I Have an
   Account) first; then the choice: Begin My 14 Days (Try Membership for 14 days, no card, full Membership on the
   account at once) or Join Now (the Founding prices, the Stripe payment links carrying this account).
   TRIAL_LIVE (shared/gg-account.js) keeps Begin My 14 Days resting until Chris reads the trial sections of Terms and Privacy; until
   then the choice shows Join Now only. Tests turn it on for one browser with window.GG_TRIAL_LIVE = true.
     GGAccountUI.fromHash()         opens the sheet a #confirm=, #recover=, #keep=, or #join= link asks for
     GGAccountUI.css(href)          adds shared/gg-account.css once (opts.css false skips it)
   No dashes in any words here.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGAccountUI) return;
  var HERE = (function () { try { var s = document.currentScript && document.currentScript.src; return s ? s.replace(/[^/]*$/, '') : '/shared/'; } catch (e) { return '/shared/'; } })();
  var CSS = HERE + 'gg-account.css?v=c193', cssOn = false, cur = null, uid = 0;
  // BLD 1017: the Membership Trial rests until Terms and Privacy carry its sections (TRIAL_LIVE in shared/gg-account.js)
  function trialLive() { return !!(G() && G().trialLive && G().trialLive()); }
  // The Founding prices and their Stripe payment links (the same four links The Grounded Way page used, BLD 949)
  var PLANS = [
    { id: 'mm', who: 'Founding Member', price: '$8 a month', then: 'then $12 a month', href: 'https://buy.stripe.com/bJe6oG27y8UcgNO06y7kc00?prefilled_promo_code=FOUNDINGM' },
    { id: 'my', who: 'Founding Member', price: '$64 a year', then: 'then $96 a year', save: 'Saves a third', href: 'https://buy.stripe.com/4gMdR8h2sfiA1SUdXo7kc01?prefilled_promo_code=FOUNDINGMY' },
    { id: 'hm', who: 'Founding Household', price: '$16 a month', then: 'then $24 a month', href: 'https://buy.stripe.com/8x29ASaE4fiA69a6uW7kc02?prefilled_promo_code=FOUNDINGH' },
    { id: 'hy', who: 'Founding Household', price: '$128 a year', then: 'then $192 a year', save: 'Saves a third', href: 'https://buy.stripe.com/7sYdR88vWfiAgNOcTk7kc03?prefilled_promo_code=FOUNDINGHY' }
  ];
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function css(href) { if (cssOn || document.querySelector('link[data-ga-css]')) { cssOn = true; return; } var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href || CSS; l.setAttribute('data-ga-css', '1'); document.head.appendChild(l); cssOn = true; }
  var G = function () { return window.GGAccount; };
  function when(t) { if (!t) return ''; var d = new Date(t); return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }); }

  /* ---------- the sheet ---------- */
  function sheet(title, lead) {
    close();
    var id = 'ga-t' + (++uid), w = document.createElement('div');
    w.className = 'ga ga-wrap';
    w.innerHTML = '<div class="ga-bg" data-ga="close"></div><div class="ga-sheet" role="dialog" aria-modal="true" aria-labelledby="' + id + '" tabindex="-1">' +
      '<div class="ga-hd"><h2 class="ga-h2" id="' + id + '">' + esc(title) + '</h2><button type="button" class="ga-x" data-ga="close" aria-label="Close"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button></div>' +
      (lead ? '<p class="ga-lead">' + esc(lead) + '</p>' : '') + '<div class="ga-body"></div><p class="ga-msg" role="status" aria-live="polite"></p></div>';
    document.body.appendChild(w);
    document.documentElement.classList.add('ga-sheeted');
    var done, p = new Promise(function (r) { done = r; });
    cur = { w: w, body: w.querySelector('.ga-body'), msg: w.querySelector('.ga-msg'), done: done, p: p, last: document.activeElement };
    w.addEventListener('click', function (e) { var b = e.target.closest('[data-ga]'); if (!b) return; if (b.getAttribute('data-ga') === 'close') { e.preventDefault(); close(); } });
    w.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    setTimeout(function () { var s = w.querySelector('.ga-sheet'); s && s.focus(); }, 0);
    return cur;
  }
  function close() {
    if (!cur) return;
    var c = cur; cur = null;
    c.w.remove(); document.documentElement.classList.remove('ga-sheeted');
    try { c.last && c.last.focus && c.last.focus(); } catch (e) {}
    c.done();
  }
  function say(m, ok) { if (!cur) return; cur.msg.textContent = m || ''; cur.msg.className = 'ga-msg' + (m ? ok ? ' ok' : ' warn' : ''); }
  function busy(btn, on, label) { if (!btn) return; if (on) { btn.dataset.l = btn.textContent; btn.disabled = true; btn.textContent = label || 'One Moment'; } else { btn.disabled = false; if (btn.dataset.l) btn.textContent = btn.dataset.l; } }
  function field(id, label, type, ac, hint) {
    return '<label class="ga-f"><span>' + esc(label) + '</span><input id="' + id + '" type="' + type + '"' + (ac ? ' autocomplete="' + ac + '"' : '') + (type === 'email' ? ' inputmode="email" autocapitalize="off" spellcheck="false"' : '') + '>' + (hint ? '<small>' + esc(hint) + '</small>' : '') + '</label>';
  }
  // BLD 1047: Sign in with Apple and Google, shown only when their flags and the server both say so
  function provRow() { return '<div class="ga-prov" hidden></div>'; }
  function provWire() {
    var box = cur && cur.w.querySelector('.ga-prov'), c = cur; if (!box || !G().providers) return;
    G().providers().then(function (pv) {
      if (cur !== c || (!pv.apple && !pv.google)) return;
      box.innerHTML = (pv.apple ? '<button type="button" class="ga-btn big line" data-sign="apple">Sign In With Apple</button>' : '') + (pv.google ? '<button type="button" class="ga-btn big line" data-sign="google">Sign In With Google</button>' : '') + '<p class="ga-or">or with your email</p>';
      box.hidden = false;
      Array.prototype.forEach.call(box.querySelectorAll('[data-sign]'), function (b) { b.addEventListener('click', function () { busy(b, true); G().signinWith(b.getAttribute('data-sign')).catch(function () { busy(b, false); say('Try again in a moment, or use your email.'); }); }); });
    });
  }
  function val(id) { var e = cur && cur.w.querySelector('#' + id); return e ? e.value : ''; }
  function on(sel, fn) { var e = cur && cur.w.querySelector(sel); if (e) e.addEventListener('click', function (ev) { ev.preventDefault(); fn(e); }); }
  function form(fn) { var f = cur.w.querySelector('form'); if (f) f.addEventListener('submit', function (ev) { ev.preventDefault(); fn(f.querySelector('button[type=submit]')); }); }
  function fail(btn) { return function (e) { busy(btn, false); say((e && e.message) || G().words('server')); }; }
  function showWords(words, again) {
    if (window.GGRoot && GGRoot.show) return GGRoot.show({ words: words, who: '', again: !!again, title: 'Your Account Root Words', lead: 'If your password ever slips your mind, these 12 words and your email open your Grounded Account again, with everything in place. Write them down or print the card, and keep them somewhere private.' });
    var c = sheet('Your Account Root Words', 'If your password ever slips your mind, these 12 words and your email open your Grounded Account again. Write them down and keep them somewhere private.');
    c.body.innerHTML = '<ol class="ga-words">' + words.map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') + '</ol><button type="button" class="ga-btn big" data-ga="close">I Saved My Root Words</button>';
    return c.p;
  }

  /* ---------- the views ---------- */
  var V = {};
  V.signup = function (o) {
    o = o || {};
    // BLD 958: an invite on this device (a link from a parent) makes the account for the person it names; a teen or kid
    // account comes only this way. A kid's invite carries a sign in name, so a kid needs no email.
    var inv = o.token || joinWaiting(), kid = o.kid || joinKid();
    var c = sheet(o.title || 'Create My Account', kid ? 'Your parent made a place for you in your family’s Household. Choose a password, and your tree opens on every device you sign in on.' : o.lead || 'One email and one password open your tree on every device, and the same password opens your own profile. Everything is locked on this device before it leaves, so only you can open it. Your account costs nothing; Membership is the paid part on top.');
    var agree = '<a href="/terms.html" target="_blank" rel="noopener">Terms of Use</a> and the <a href="/privacy.html" target="_blank" rel="noopener">Privacy Policy</a>';
    c.body.innerHTML = (kid || o.oauth ? '' : provRow()) + '<form novalidate>' + (kid ? '<p class="ga-note">Your sign in name: <b>' + esc(kid) + '</b></p>' : field('ga-em', 'Email', 'email', 'username')) + field('ga-pw', 'Password', 'password', 'new-password', 'At least 10 characters. A short phrase of four or more words is strong and easy to remember. Your phone can save it and fill it with Face ID. Your password is the key to your account, so keep it yours alone.') +
      '<label class="ga-check"><input id="ga-ag" type="checkbox"><span>' + (inv ? 'I agree to the ' + agree + '.' : 'I am 18 or older, and I agree to the ' + agree + '.') + '</span></label>' +
      '<button type="submit" class="ga-btn big">Create My Account</button></form>' + (inv ? '' : '<p class="ga-note">Younger than 18? A parent adds you from their Grounded Household, and the invite opens your account.</p>') + '<div class="ga-alt"><button type="button" class="ga-link" data-go="signin">I Have an Account</button></div>';
    on('[data-go=signin]', function () { V.signin({ then: o.then, oauth: o.oauth, email: o.email }); });
    if (o.email) { var ie = cur.w.querySelector('#ga-em'); if (ie) { ie.value = o.email; if (o.oauth) ie.readOnly = true; } }
    provWire();
    form(function (btn) {
      if (!cur.w.querySelector('#ga-ag').checked) return say(inv ? 'Check the box to agree to the Terms of Use and the Privacy Policy.' : 'Check the box to say you are 18 or older and agree to the Terms of Use and the Privacy Policy.');
      busy(btn, true, 'Locking Your Keys');
      say('Making your keys on this device. This takes a few seconds.', true);
      var email = kid || val('ga-em');
      G().signUp({ email: email, password: val('ga-pw'), adult: !inv, invite: inv || undefined, oauth: o.oauth || undefined }).then(function (r) {
        return showWords(r.words).then(function () {
          // BLD 1073 One Smooth Setup: with no grown-up profile open here, the page that hosts these sheets (The Grounded
          // Way) carries straight on into the profile setup, and the Household joins along the way.
          var made = { email: email, band: (G().info() || {}).band || '', kid: kid, invite: inv || '' };
          var go = function () { if (!o.then && MADE && MADE(made)) { close(); MADE_ON = true; return true; } markSetup(); return false; };
          // A kid's account starts confirmed, so the invite joins the Household right away.
          // The invite leaves the waiting spot first, so the page's own waiting join never tries the same invite at once.
          if (kid && inv) { joinWait(null); return G().household.join(inv).then(function () { joinKid(null); made.joined = true; if (go()) return; var d = sheet('You Are In', 'Welcome to your family’s Household. Your tree opens on every device you sign in on.'); d.body.innerHTML = '<button type="button" class="ga-btn big" data-ga="close">Done</button>'; return d.p; }, function (e) { if (!(e && /exists|expired|other/.test(e.why || ''))) joinWait(inv); if (!go()) close(); }); }
          if (o.then) { markSetup(); return o.then(); }   // BLD 1017: Start Membership carries on to its choice
          if (go()) return;
          V.welcome(email, !!o.oauth);
        });
      }).catch(fail(btn));
    });
    return c.p;
  };
  V.welcome = function (email, sure) {
    // BLD 1047: confirm the email later; the tree is already growing
    var c = sheet('Your Account Is Ready', sure ? 'Your email is confirmed, and your tree grows on every device you sign in on.' : 'Your tree is already growing. We sent a link to ' + email + '; tap it when you like to confirm your email.');
    c.body.innerHTML = '<button type="button" class="ga-btn big" data-ga="close">Done</button>';
    return c.p;
  };
  V.signin = function (o) {
    o = o || {};
    var c = sheet('Sign In', o.oauth ? 'Your email is confirmed. Type your Grounded password once, and your tree opens on this device. Your phone can save it and fill it with Face ID next time.' : 'Sign in with your Grounded Account email (or your sign in name) and password. The same password opens your own profile.');
    c.body.innerHTML = (o.oauth ? '' : provRow()) + '<form novalidate>' + field('ga-em', 'Email or Sign In Name', 'text', 'username') + field('ga-pw', 'Password', 'password', 'current-password') + '<button type="submit" class="ga-btn big">Sign In</button></form>' +
      '<div class="ga-alt"><button type="button" class="ga-link" data-go="forgot">Forgot My Password</button><button type="button" class="ga-link" data-go="signup">Create My Account</button></div>';
    on('[data-go=forgot]', function () { V.forgot(); }); on('[data-go=signup]', function () { V.signup(o.then ? { then: o.then, title: o.title, lead: o.lead } : o.oauth ? { oauth: o.oauth, email: o.email } : undefined); });
    if (o.email) { var ie = cur.w.querySelector('#ga-em'); if (ie) { ie.value = o.email; if (o.oauth) ie.readOnly = true; } }
    provWire();
    form(function (btn) {
      busy(btn, true, 'Opening Your Account');
      G().signIn({ email: val('ga-em'), password: val('ga-pw'), oauth: o.oauth || undefined }).then(function () {
        if (window.GGSync) GGSync.sync().catch(function () {});
        if (o.then) return o.then();   // BLD 1017: Start Membership carries on to its choice
        say('Welcome back. Your tree is coming in now.', true); setTimeout(close, 900);
      }).catch(fail(btn));
    });
    return c.p;
  };
  V.forgot = function () {
    var c = sheet('Forgot My Password', 'Your email shows us it is you, and your Root Words open your account on this device. Then you choose a new password, with everything in place.');
    c.body.innerHTML = '<form novalidate>' + field('ga-em', 'Email', 'email', 'email') + '<button type="submit" class="ga-btn big">Send the Link</button></form>';
    form(function (btn) {
      busy(btn, true);
      G().forgot(val('ga-em')).then(function () { busy(btn, false); say('If this email has a Grounded Account, a link is on its way. It works for 30 minutes.', true); }).catch(fail(btn));
    });
    return c.p;
  };
  V.recover = function (o) {
    var c = sheet('Use My Root Words', 'Type your 12 Root Words, then choose a new password. Everything you saved stays.');
    c.body.innerHTML = '<form novalidate><label class="ga-f"><span>Your 12 Root Words</span><textarea id="ga-rw" rows="3" autocapitalize="off" spellcheck="false" autocomplete="off"></textarea><small>Capital letters, commas, and numbers are all fine, and the first four letters of each word are enough.</small></label>' +
      field('ga-pw', 'New Password', 'password', 'new-password', 'At least 10 characters.') + '<button type="submit" class="ga-btn big">Set My New Password</button></form>' +
      '<div class="ga-alt"><button type="button" class="ga-link" data-go="fresh">I Have Lost My Root Words Too</button></div>';
    on('[data-go=fresh]', function () { V.fresh(o); });
    form(function (btn) {
      busy(btn, true, 'Opening Your Account');
      G().recover({ token: o.token, words: val('ga-rw'), password: val('ga-pw') }).then(function () {
        if (window.GGSync) GGSync.sync().catch(function () {});
        say('Your new password is set, and your account and your tree are open on this device.', true); setTimeout(close, 1400);
      }).catch(fail(btn));
    });
    return c.p;
  };
  // BLD 1047: Start Fresh says plainly what happens and when: the account is erased in 24 hours, at a time shown here,
  // and the same email can make a new account right after.
  V.fresh = function (o) {
    var at = Date.now() + 864e5, w = G().whenText ? G().whenText(at) : '';
    var c = sheet('Start Fresh', 'With the password and the Root Words both gone, no one can open what is locked in this account, including us. Start Fresh erases your account in 24 hours' + (w ? ', on ' + w : '') + '. After that, you can make a new account with the same email right away. We email you a Keep My Account link first, in case you find your Root Words.');
    c.body.innerHTML = '<form novalidate>' + field('ga-cf', 'Type START FRESH to confirm', 'text', 'off') + '<button type="submit" class="ga-btn big warm">Start Fresh</button></form>' +
      '<p class="ga-note">This device keeps its own copy, still locked with each profile’s password or passcode.</p>';
    form(function (btn) {
      if (val('ga-cf').trim().toUpperCase() !== 'START FRESH') return say('Type START FRESH to confirm.');
      busy(btn, true);
      G().startFresh(o.token).then(function (r) {
        var t = r && r.at ? G().whenText(r.at) : w;
        c.body.innerHTML = '<div class="ga-card"><span class="ga-k">Starting Fresh</span><b class="ga-big">Your account is erased on ' + esc(t) + '.</b><small>Right after that, you can make a new Grounded Account with the same email. Until then, the Keep My Account link in your email keeps everything just as it is.</small></div><button type="button" class="ga-btn big" data-ga="close">Done</button>';
        say('');
      }).catch(fail(btn));
    });
    return c.p;
  };
  // BLD 1047: back from Sign in with Apple or Google with a ticket: sign in (with the password) or create the account
  V.oauth = function (o) {
    var c = sheet('One Moment', '');
    c.body.innerHTML = '<p class="ga-lead">Opening your sign in…</p>';
    G().oauthWho(o.token).then(function (r) {
      if (cur !== c) return;
      return r.known ? V.signin({ oauth: o.token, email: r.email }) : V.signup({ oauth: o.token, email: r.email, title: 'Create My Account', lead: 'Your email is confirmed. Choose a password for your tree: it locks everything on this device, so only you can open it, and your phone can save it and fill it with Face ID.' });
    }, function () { if (cur === c) V.oauthx(); });
    return c.p;
  };
  V.oauthx = function () {
    var c = sheet('Sign In', 'That sign in did not finish. Try again, or sign in with your email.');
    c.body.innerHTML = '<button type="button" class="ga-btn big" data-go="signin">Sign In</button>';
    on('[data-go=signin]', function () { V.signin(); });
    return c.p;
  };
  V.keep = function (o) {
    var c = sheet('Keep My Account', '');
    c.body.innerHTML = '<p class="ga-lead">Keeping your account…</p>';
    G().keep(o.token).then(function () { c.body.innerHTML = '<p class="ga-lead">Your account stays just as it is.</p><button type="button" class="ga-btn big" data-ga="close">Done</button>'; }, function (e) { say(e.message); });
    return c.p;
  };
  V.confirm = function (o) {
    var c = sheet('Confirm Your Email', '');
    c.body.innerHTML = '<p class="ga-lead">Confirming…</p>';
    G().confirm(o.token).then(function (r) {
      // BLD 1073: a profile setup waiting on this device carries straight on once the email is confirmed
      if (o.then && cur === c && !(r && r.trial)) { close(); return o.then(r); }   // 14 days opening here keep their own words first
      if (cur === c) c.w.classList.add('ga-calm');   // a Household invite waiting here joins without waiting for Done
      c.body.innerHTML = '<p class="ga-lead">' + (r && r.trial ? 'Your email is confirmed, and your 14 days of Membership are open. Every device you sign in on has the full Grounded Way.' : 'Your email is confirmed. Sign in on every device you use, and your tree comes along.') + '</p><button type="button" class="ga-btn big" data-ga="close">Done</button>'; }, function (e) { say(e.message); });
    return c.p;
  };
  // BLD 957: an invite opened before the account exists or is confirmed waits on this device (gg-join-wait) and joins by
  // itself once the email is confirmed, so the invite never gets lost on the way through sign up (Chris, November 9, 2026).
  var JW = 'gg-join-wait';
  function joinWait(t) { try { if (t) localStorage.setItem(JW, JSON.stringify({ t: t, at: Date.now() })); else localStorage.removeItem(JW); } catch (e) {} }
  function joinWaiting() { try { var o = JSON.parse(localStorage.getItem(JW) || 'null'); return o && o.t && Date.now() - o.at < 14 * 86400000 ? o.t : null; } catch (e) { return null; } }
  // BLD 958: a kid's invite carries the kid's sign in name; it waits with the invite.
  function joinKid(k) { try { if (k) localStorage.setItem(JW + '-kid', k); else if (k === null) localStorage.removeItem(JW + '-kid'); return localStorage.getItem(JW + '-kid') || ''; } catch (e) { return ''; } }

  V.join = function (o) {
    if (o && o.token) joinWait(o.token);
    if (o && o.kid) joinKid(o.kid);
    // BLD 958: someone new opens their invite: Create My Account comes first (I Have an Account is one tap away).
    if (G().state() === 'out') { MADE_ON = false; var s = V.signup({ token: o && o.token, kid: o && o.kid }); return s.then(function () { if (G().state() !== 'out' && joinWaiting() && !MADE_ON) return V.join({ token: joinWaiting() }); }); }
    // BLD 1073: a waiting invite on a confirmed account joins at once, with no sheet (the host says so after)
    if (o && o.auto) return G().household.join(o.token).then(function () { joinWait(null); joinKid(null); return { joined: true }; }, function (e) { if (e && /exists|expired|other/.test(e.why || '')) joinWait(null); return { joined: false, why: e && e.why || '' }; });
    var inf = G().info && G().info();
    if (inf && inf.confirmed === false) { var w = sheet('Join the Household', 'Your invite is saved on this device. Confirm your email from the message we sent, and you join the Household by yourself.'); w.body.innerHTML = '<button type="button" class="ga-btn big" data-ga="close">OK</button>'; return w.p; }
    var c = sheet('Join the Household', 'Each person keeps their own private account. The Family Kitchen, Grounded Money, and the Family Planner can be shared between you, and everything else stays yours alone.');
    c.body.innerHTML = '<button type="button" class="ga-btn big" data-go="join">Join the Household</button>';
    on('[data-go=join]', function (btn) { busy(btn, true); G().household.join(o.token).then(function () { joinWait(null); joinKid(null); say('You are in the Household now.', true); setTimeout(close, 1000); }).catch(function (e) { if (e && /exists|expired|other/.test(e.why || '')) joinWait(null); fail(btn)(e); }); });
    return c.p;
  };
  // A password asked once more, for steps that need a recent sign in
  function askPass(lead, label, fn) {
    var box = cur.w.querySelector('.ga-ask');
    if (!box) { box = document.createElement('form'); box.className = 'ga-ask'; cur.body.appendChild(box); }
    box.innerHTML = '<p class="ga-note">' + esc(lead) + '</p>' + field('ga-askpw', 'Password', 'password', 'current-password') + '<div class="ga-row"><button type="submit" class="ga-btn">' + esc(label) + '</button><button type="button" class="ga-btn line" data-ask="no">Cancel</button></div>';
    box.querySelector('[data-ask=no]').addEventListener('click', function () { box.remove(); say(''); });
    box.addEventListener('submit', function (ev) { ev.preventDefault(); var b = box.querySelector('button[type=submit]'); busy(b, true); Promise.resolve(fn(val('ga-askpw'))).then(function () { box.remove(); }, fail(b)); });
    var i = box.querySelector('input'); i && i.focus();
  }
  V.account = function () {
    if (G().state() === 'out') return V.signin();
    var c = sheet('My Account', '');
    c.body.innerHTML = '<p class="ga-lead">Opening My Account…</p>';
    var paint = function () {
      return G().account().then(function (a) {
        if (!cur || cur !== c) return;
        var st = window.GGSync ? GGSync.status() : null;
        c.body.innerHTML =
          '<div class="ga-card"><span class="ga-k">Email</span><b class="ga-big">' + esc(a.email) + '</b>' +
            (a.confirmed ? '<small class="ga-ok">Confirmed</small>' : '<small>Tap the link in your email to confirm it.</small><button type="button" class="ga-btn sm line" data-go="resend">Send the Link Again</button>') + '</div>' +
          (st ? '<div class="ga-card"><span class="ga-k">Sync</span><b>' + (st.state === 'waiting' ? 'Changes wait on this device and send when the connection returns.' : st.last ? 'Synced ' + new Date(st.last).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : 'Ready to sync') + '</b><button type="button" class="ga-btn sm line" data-go="sync">Sync Now</button></div>' : '') +
          '<div class="ga-card"><span class="ga-k">Devices</span><ul class="ga-list">' + a.devices.map(function (d) {
            return '<li><div><b>' + esc(d.name) + (d.this ? ' (this device)' : '') + '</b><small>Signed in ' + esc(when(d.created)) + (d.last_sync ? ', synced ' + esc(when(d.last_sync)) : '') + '</small></div>' + (d.this ? '' : '<button type="button" class="ga-btn sm line" data-dev="' + esc(d.id) + '">Sign Out That Device</button>') + '</li>';
          }).join('') + '</ul></div>' +
          '<div class="ga-rows">' +
            '<button type="button" data-go="password">Change My Password</button>' +
            '<button type="button" data-go="words">See My Root Words</button>' +
            '<button type="button" data-go="newwords">New Root Words</button>' +
            '<button type="button" data-go="household">Household</button>' +
            '<button type="button" data-go="export">Download My Account Data</button>' +
          '</div>' +
          '<label class="ga-check"><input id="ga-erase" type="checkbox"><span>Erase This Device Too when I sign out</span></label>' +
          '<div class="ga-row"><button type="button" class="ga-btn line" data-go="out">Sign Out</button></div>' +
          '<div class="ga-alt"><button type="button" class="ga-link" data-go="delete">Delete My Account</button></div>';
        on('[data-go=resend]', function (b) { busy(b, true); G().resend().then(function () { busy(b, false); say('A new link is on its way.', true); }).catch(fail(b)); });
        on('[data-go=sync]', function (b) { busy(b, true, 'Syncing'); GGSync.sync().then(function () { paint(); }); });
        on('[data-go=password]', function () { V.password(); });
        on('[data-go=household]', function () { V.household(); });
        on('[data-go=delete]', function () { V.delete(); });
        on('[data-go=out]', function (b) { busy(b, true); G().signOut({ erase: cur.w.querySelector('#ga-erase').checked }).then(function () { close(); }); });
        on('[data-go=words]', function () { askPass('Type your password to see your Root Words.', 'See My Root Words', function (pw) { return G().rootWords({ password: pw }).then(function (w) { if (w) return showWords(w, true); say('Your Root Words are kept inside your account.'); }); }); });
        on('[data-go=newwords]', function () { askPass('New Root Words replace the old ones, which then stop working. Type your password to make them.', 'Make New Root Words', function (pw) { return G().newRootWords({ password: pw }).then(function (w) { return showWords(w); }); }); });
        on('[data-go=export]', function () { askPass('Your account data downloads to this device, every box still locked, so only you can open it.', 'Download', function (pw) { return G().exportData(pw).then(function (x) { var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(x)], { type: 'application/json' })); a.download = 'grounded-account-data.json'; document.body.appendChild(a); a.click(); a.remove(); say('Your account data is downloaded.', true); }); }); });
        Array.prototype.forEach.call(c.w.querySelectorAll('[data-dev]'), function (b) {
          b.addEventListener('click', function () {
            var id = b.getAttribute('data-dev');
            busy(b, true);
            G().signOutDevice(id).then(function () { say('That device is signed out.', true); paint(); }, function (e) {
              busy(b, false);
              if (e.why !== 'recent') return say(e.message);
              askPass('Type your password to sign out that device.', 'Sign Out That Device', function (pw) { return G().signOutDevice(id, pw).then(function () { say('That device is signed out.', true); paint(); }); });
            });
          });
        });
      }, function (e) { if (cur === c) say(e.message); });
    };
    paint();
    return c.p;
  };
  V.password = function () {
    var c = sheet('Change My Password', 'Your Root Words stay the same, and the new password opens your own profile too. Other devices sign out unless you keep them signed in.');
    c.body.innerHTML = '<form novalidate>' + field('ga-old', 'Password Now', 'password', 'current-password') + field('ga-pw', 'New Password', 'password', 'new-password', 'At least 10 characters.') +
      '<label class="ga-check"><input id="ga-keep" type="checkbox"><span>Keep my other devices signed in</span></label><button type="submit" class="ga-btn big">Change My Password</button></form>';
    form(function (btn) {
      busy(btn, true, 'Locking Your Keys');
      G().changePassword({ old: val('ga-old'), password: val('ga-pw'), keepDevices: cur.w.querySelector('#ga-keep').checked }).then(function () { busy(btn, false); say('Your new password is set.', true); }).catch(fail(btn));
    });
    return c.p;
  };
  V.delete = function () {
    var c = sheet('Delete My Account', 'This erases everything our server holds for you, at once:');
    c.body.innerHTML = '<ul class="ga-bul"><li>every locked box, your device list, your sign in, and your account record</li><li>your place in a Household (a Household you started ends, and each person keeps their own copy)</li></ul>' +
      '<p class="ga-note">This device keeps its own copy, still locked, so you can keep using Grounded on this device. Choose Erase This Device Too to remove it here as well.</p>' +
      '<form novalidate>' + field('ga-cf', 'Type DELETE to confirm', 'text', 'off') + field('ga-pw', 'Password', 'password', 'current-password') +
      '<label class="ga-check"><input id="ga-erase" type="checkbox"><span>Erase This Device Too</span></label><button type="submit" class="ga-btn big warm">Delete My Account</button></form>';
    form(function (btn) {
      if (val('ga-cf').trim() !== 'DELETE') return say('Type DELETE to confirm.');
      busy(btn, true, 'Erasing');
      G().deleteAccount({ password: val('ga-pw'), confirm: 'DELETE', erase: cur.w.querySelector('#ga-erase').checked }).then(function () {
        c.body.innerHTML = '<p class="ga-lead">Your Grounded Account is deleted. Thank you for growing with us.</p><button type="button" class="ga-btn big" data-ga="close">Done</button>'; say('');
      }).catch(fail(btn));
    });
    return c.p;
  };
  var KIND = { kitchen: 'Family Kitchen', money: 'Grounded Money', planner: 'Family Planner' , plates: 'Our Plates' };   // BLD 950: the Family Planner joins the shared spaces; BLD 967: Our Plates
  // BLD 958: invite a grown-up, a teen (13 to 17), or a kid (12 and under). A teen or kid needs the parent's approval, and a
  // kid can have a sign in name in place of an email. Every invite can be texted from the parent's own phone.
  var BAND = { teen: 'Teen', kid: 'Kid' };
  var AGES = [['adult', 'Grown-up'], ['teen', 'Teen, 13 to 17'], ['kid', 'Kid, 12 and Under']];
  var OK_LINE = 'Every part of Grounded is shaped for each age. Kids and teens see guides, videos, and practices written for their age. Tending for them centers on movement, food, and energy, with weight and calories kept for grown-ups. Any question about a substance goes to a trusted grown-up, and Grounded asks open questions only. Their data stays locked to their own account, and you see them here in your Household, where you can remove their account any time.';
  function inviteForm() {
    return '<form class="ga-card ga-inv" novalidate><span class="ga-k">Invite</span><div class="ga-ages" role="radiogroup" aria-label="Who is it for">' + AGES.map(function (a, i) {
      return '<label class="ga-check"><input type="radio" name="ga-age" value="' + a[0] + '"' + (i ? '' : ' checked') + '><span>' + esc(a[1]) + '</span></label>';
    }).join('') + '</div>' + field('ga-em', 'Their Email', 'email', 'off') +
      '<div class="ga-kidname" hidden>' + field('ga-kn', 'Their Sign In Name', 'text', 'off', 'Letters and numbers, like carson.joy. A kid signs in with this name, and every message about their account comes to you.') + '</div>' +
      '<div class="ga-ok" hidden><p class="ga-note">' + esc(OK_LINE) + '</p><label class="ga-check"><input id="ga-okb" type="checkbox"><span>I am their parent or guardian, and I approve their Grounded Account.</span></label></div>' +
      '<button type="submit" class="ga-btn">Send the Invite</button></form>';
  }
  function inviteWire(paint) {
    var f = cur && cur.w.querySelector('.ga-inv'); if (!f) return;
    var age = function () { var r = f.querySelector('input[name=ga-age]:checked'); return r ? r.value : 'adult'; };
    var show = function () { var a = age(); f.querySelector('.ga-ok').hidden = a === 'adult'; f.querySelector('.ga-kidname').hidden = a !== 'kid'; f.querySelector('#ga-em').closest('label').querySelector('span').textContent = a === 'kid' ? 'Their Email (if they have one)' : 'Their Email'; };
    Array.prototype.forEach.call(f.querySelectorAll('input[name=ga-age]'), function (r) { r.addEventListener('change', show); });
    f.addEventListener('submit', function (ev) {
      ev.preventDefault(); var btn = f.querySelector('button[type=submit]'), a = age(), em = val('ga-em').trim(), kn = val('ga-kn').trim();
      if (a !== 'adult' && !f.querySelector('#ga-okb').checked) return say('Check the box to approve their account.');
      if (a === 'kid' && !em && !kn) return say('Add their sign in name, or their email if they have one.');
      busy(btn, true);
      G().household.invite(a === 'kid' && !em ? null : em, { band: a, ok: a !== 'adult', name: a === 'kid' && !em ? kn : undefined }).then(function (r) { busy(btn, false); sent(r, em, paint); }).catch(fail(btn));
    });
  }
  // After an invite: text it from this phone (the phone's own Messages; Grounded keeps no phone numbers), or copy the link.
  function sent(r, em, paint) {
    var box = document.createElement('div'); box.className = 'ga-card ga-sent';
    var msg = 'You are invited to our family Household on Grounded. Open this link on your phone: ' + (r && r.link || '');
    box.innerHTML = '<span class="ga-k">Invite Ready</span><p class="ga-note">' + (r && r.name ? 'Their sign in name is <b>' + esc(r.name) + '</b>. Text them the invite, and they choose their password when they open it.' : em ? 'The invite is on its way to ' + esc(em) + '. You can text it to them too.' : '') + '</p>' +
      '<div class="ga-row"><a class="ga-btn" href="sms:?&body=' + encodeURIComponent(msg) + '">Text the Invite</a><button type="button" class="ga-btn line" data-go="copy">Copy the Link</button></div><div class="ga-alt"><button type="button" class="ga-link" data-go="more">Done</button></div>';
    var f = cur && cur.w.querySelector('.ga-inv'); if (f) f.replaceWith(box); else if (cur) cur.body.appendChild(box);
    box.querySelector('[data-go=copy]').addEventListener('click', function () { try { navigator.clipboard.writeText(r.link).then(function () { say('The link is copied.', true); }, function () { say(r.link, true); }); } catch (e) { say(r.link, true); } });
    box.querySelector('[data-go=more]').addEventListener('click', function () { paint(); });
    say('');
  }
  V.household = function () {
    if (G().state() === 'out') return V.signin();
    var c = sheet('Household', 'Up to 6 people, each with their own private account. The Family Kitchen, Grounded Money, and the Family Planner can be shared between you; everything else stays each person’s own.');
    var paint = function () {
      return G().household.get().then(function (h) {
        if (cur !== c) return;
        if (!h) {
          c.body.innerHTML = '<button type="button" class="ga-btn big" data-go="start">Start a Household</button><p class="ga-note">Invited to someone’s Household? Tap the link in your invite email.</p>';
          on('[data-go=start]', function (b) { busy(b, true); G().household.create().then(paint).catch(fail(b)); });
          return;
        }
        var shared = window.GGSync ? GGSync.spaces().map(function (s) { return s.kind; }) : [];
        c.body.innerHTML = '<div class="ga-card"><span class="ga-k">People</span><ul class="ga-list">' + h.people.map(function (p) {
            return '<li><div><b>' + esc(p.kid || p.email) + (p.me ? ' (you)' : '') + '</b><small>' + (BAND[p.band] ? BAND[p.band] + ' · ' : '') + (p.owner ? 'Started the Household' : p.joined ? 'Joined ' + esc(when(p.joined)) : 'Invited ' + esc(when(p.invited))) + '</small></div>' +
              (h.owner && !p.me ? (p.account ? '<button type="button" class="ga-btn sm line" data-rm="' + esc(p.account) + '">Remove</button>' : '<button type="button" class="ga-btn sm line" data-inv="' + esc(p.email) + '">Cancel Invite</button>') : '') + '</li>';
          }).join('') + '</ul></div>' +
          (h.owner && h.people.length < h.seats ? inviteForm() : '') +
          '<div class="ga-card"><span class="ga-k">Shared</span><ul class="ga-list">' + ['kitchen', 'money', 'planner', 'plates'].map(function (k) {   // BLD 967: Our Plates
            var onIt = shared.indexOf(k) >= 0 || h.spaces.some(function (s) { return s.kind === k && s.key; });
            return '<li><div><b>' + KIND[k] + '</b><small>' + (onIt ? 'Shared with your Household' : 'On your own devices') + '</small></div>' + (onIt || !window.GGSync ? '' : '<button type="button" class="ga-btn sm" data-share="' + k + '">Share With Our Household</button>') + '</li>';
          }).join('') + '</ul></div>' +
          '<div class="ga-alt">' + (h.owner ? '<button type="button" class="ga-link" data-go="end">End the Household</button>' : '<button type="button" class="ga-link" data-go="leave">Leave the Household</button>') + '</div>';
        inviteWire(paint);
        Array.prototype.forEach.call(c.w.querySelectorAll('[data-rm]'), function (b) { b.addEventListener('click', function () { busy(b, true); G().household.remove(b.getAttribute('data-rm')).then(paint).catch(fail(b)); }); });
        Array.prototype.forEach.call(c.w.querySelectorAll('[data-inv]'), function (b) { b.addEventListener('click', function () { busy(b, true); G().household.cancelInvite(b.getAttribute('data-inv')).then(paint).catch(fail(b)); }); });
        Array.prototype.forEach.call(c.w.querySelectorAll('[data-share]'), function (b) { b.addEventListener('click', function () { busy(b, true); GGSync.shareSpace(b.getAttribute('data-share')).then(function () { say('Shared with your Household.', true); paint(); }).catch(fail(b)); }); });
        on('[data-go=end]', function (b) { if (!b.dataset.sure) { b.dataset.sure = 1; b.textContent = 'Tap Again to End the Household'; return; } busy(b, true); G().household.end().then(paint).catch(fail(b)); });
        on('[data-go=leave]', function (b) { if (!b.dataset.sure) { b.dataset.sure = 1; b.textContent = 'Tap Again to Leave'; return; } busy(b, true); G().household.leave().then(paint).catch(fail(b)); });
      }, function (e) { if (cur === c) say(e.message); });
    };
    paint();
    return c.p;
  };

  /* ---------- BLD 1017: Start Membership ---------- */
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function lastDay(ms) { var d = new Date(ms - 60000); return MONTHS[d.getMonth()] + ' ' + d.getDate(); }
  function plansHtml(pick) {
    return '<fieldset class="ga-plans"><legend class="ga-k">Founding prices for our first 500 members</legend>' + PLANS.map(function (p) {
      return '<label class="ga-plan"><input type="radio" name="ga-plan" value="' + p.id + '"' + (p.id === pick ? ' checked' : '') + '><span><b>' + esc(p.who) + '</b><span class="ga-pr">' + esc(p.price) + (p.save ? ' <em>' + esc(p.save) + '</em>' : '') + '</span><small>For your first year, ' + esc(p.then) + '.' + (p.who === 'Founding Household' ? ' Your whole home, up to six people.' : '') + '</small></span></label>';
    }).join('') + '</fieldset>';
  }
  V.membership = function (o) {
    o = o || {};
    var A = G();
    var lead = 'The full Grounded Way: Grounded Nutrition and Grounded Fitness, Grounded Meditation, deeper Spirit programs, Grounded Relationships with the Grove, the full growth plan, Grounded Seasons, and Grounded Stories read aloud.';
    if (A.state() === 'out') {
      return V.signup({ title: 'Start Membership', lead: 'First, your Grounded Account: one email and password, and Membership opens on every device you sign in on. Everything is locked on this device before it leaves, so only you can open it.', then: function () { return V.membership(o); } });
    }
    var c = sheet('Start Membership', lead);
    c.body.innerHTML = '<p class="ga-note">One moment.</p>';
    var info = A.info() || {};
    var ask = trialLive() ? A.trial().catch(function () { return null; }) : Promise.resolve(null);
    Promise.all([ask, A.memberRefresh().catch(function () { return A.member(); })]).then(function (r) {
      if (cur !== c) return;
      var t = r[0], m = r[1], tr = t && t.trial, paid = m && m.status === 'active' && !m.trial;
      var top = '';
      if (paid) {
        top = '<div class="ga-card"><span class="ga-k">Membership</span><b class="ga-big">Membership is open on your Grounded Account.</b><small>Every device you sign in on has the full Grounded Way.</small></div>' +
          '<a class="ga-btn big" href="/home/">Open The Grounded Way</a>';
        c.body.innerHTML = top; return;
      }
      if (t && t.live && tr && tr.status === 'open') {
        top = '<div class="ga-card"><span class="ga-k">Your 14 Days</span><b class="ga-big">Your 14 days of Membership are open through ' + esc(lastDay(tr.ends)) + '.</b><small>Join now, and Membership carries straight on from today.</small></div>' +
          '<a class="ga-btn big line" href="/home/">Open The Grounded Way</a>';
      } else if (t && t.live && tr && tr.status === 'waiting') {
        top = '<div class="ga-card"><span class="ga-k">Your 14 Days</span><b class="ga-big">Your 14 days begin when you confirm your email.</b><small>Tap the link we sent to ' + esc(info.email || 'your email') + '. Membership opens on every device you sign in on.</small></div>';
      } else if (t && t.live && tr && (tr.status === 'ended' || tr.status === 'used')) {
        top = '<div class="ga-card"><span class="ga-k">Welcome Back</span><b class="ga-big">Join now, and the full Grounded Way opens again on every device.</b><small>Everything you made is right where it is.</small></div>';
      } else if (t && t.live && t.can) {
        top = '<div class="ga-card ga-trial"><span class="ga-k">Try Membership for 14 Days</span><b class="ga-big">Everything opens today. No card needed.</b>' +
          '<small>On day 12 we send one gentle note. If you choose to wait after 14 days, your account returns to Start, the light version, with every tree, check-in, and plan right where it is.</small>' +
          '<button type="button" class="ga-btn big" data-go="trial">Begin My 14 Days</button></div>' +
          '<p class="ga-or">Or join now at the Founding price</p>';
      }
      c.body.innerHTML = top + plansHtml(o.plan || 'mm') + '<button type="button" class="ga-btn big' + (t && t.live && t.can ? ' line' : '') + '" data-go="join">Join Now</button>' +
        '<p class="ga-note">Yearly saves a third. Membership opens on your Grounded Account as soon as you join, on every device you sign in on.</p>';
      on('[data-go=join]', function () {
        var pick = c.w.querySelector('input[name=ga-plan]:checked'), p = PLANS.filter(function (x) { return pick && x.id === pick.value; })[0] || PLANS[0];
        location.href = A.checkoutUrl(p.href);
      });
      on('[data-go=trial]', function (b) {
        busy(b, true);
        A.trialStart().then(function (x) {
          var tt = x && x.trial;
          if (tt && tt.status === 'waiting') { say(''); V.membership(o); return; }
          var d = sheet('Your 14 Days Are Open', 'Full Membership is open on your Grounded Account through ' + lastDay(tt && tt.ends || Date.now() + 14 * 864e5) + '. Every device you sign in on has the full Grounded Way.');
          d.body.innerHTML = '<a class="ga-btn big" href="/home/">Open The Grounded Way</a><p class="ga-note">On day 12 we send one gentle note with the Founding prices. Join anytime, and Membership carries straight on.</p>';
        }).catch(fail(b));
      });
    });
    return c.p;
  };

  function open(view, o) {
    if (!G()) return Promise.reject(new Error('GGAccountUI needs shared/gg-account.js'));
    o = o || {};
    if (o.css !== false) css(o.cssHref);
    var fn = V[view] || V.account;
    return G().ready.then(function () { return fn(o); });
  }
  function fromHash(o) {
    var h = G() && G().readHash();
    if (!h) return null;
    return open(h.kind, Object.assign({ token: h.token, kid: h.kid || '' }, o || {}));
  }
  // BLD 1073: GGAccountUI.onMade(fn): fn({email, band, kid, invite, joined}) runs after a new account's Root Words; when it
  // answers true, the host carries on (its profile setup) in place of Your Account Is Ready.
  var MADE = null, MADE_ON = false;
  // Made on another page (Start Membership) or with a choice still to come: a small note on this device (the account id,
  // the age band, the time) lets The Grounded Way carry straight on into the profile setup on the next visit.
  function markSetup() {
    try {
      var a = window.GGP && GGP.active && GGP.active(), i = G().info();
      if (!i || (a && a.age === 'adult' && GGP.isOpen && GGP.isOpen(a.id))) return;
      localStorage.setItem('gg-setup-wait', JSON.stringify({ a: i.accountId, band: i.band || 'adult', at: Date.now() }));
    } catch (e) {}
  }
  function onMade(fn) { MADE = typeof fn === 'function' ? fn : null; }
  window.GGAccountUI = { open: open, fromHash: fromHash, close: close, css: css, joinWaiting: joinWaiting, joinKid: function () { return joinKid(); }, onMade: onMade };
})();
