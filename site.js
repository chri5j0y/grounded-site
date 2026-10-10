// =====================================================================
// GROUNDED. SITE SCRIPT (shared by every page)
// =====================================================================

// Mobile menu
(function () {
  const btn = document.querySelector('.menu-btn');
  const menu = document.getElementById('site-menu');
  if (!btn || !menu) return;
  const shut = () => { menu.classList.remove('open'); menu.classList.remove('gn-menu-sub'); btn.setAttribute('aria-expanded', 'false'); };
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) { try { document.dispatchEvent(new CustomEvent('gg:menu-open', { detail: { from: 'site-menu' } })); } catch (e) {} }
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', shut));
  // Escape closes the phone menu and returns focus to the Menu button; so does a tap outside it
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open') && !document.querySelector('.gn-panel.gn-show:not(.gn-sub-mode)')) { shut(); btn.focus(); }
  });
  document.addEventListener('click', e => {
    if (!menu.classList.contains('open')) return;
    if (menu.contains(e.target) || btn.contains(e.target)) return;
    shut();
  });
  // another menu (the profile menu) opening closes this one
  document.addEventListener('gg:menu-open', e => { if (e.detail && e.detail.from !== 'site-menu' && e.detail.from && !/^gn-/.test(e.detail.from) && menu.classList.contains('open')) shut(); });
})();

// #anchor links land below the sticky header: once the fonts and images have settled,
// scroll the target into place again with no animation (unless the visitor has already scrolled).
(function () {
  const id = decodeURIComponent((location.hash || '').slice(1));
  if (!id || /[=\/]/.test(id)) return;
  let moved = false;
  const mark = () => { moved = true; };
  ['wheel', 'touchstart', 'keydown'].forEach(t => window.addEventListener(t, mark, { once: true, passive: true }));
  const land = () => {
    if (moved) return;
    const el = document.getElementById(id); if (!el) return;
    const html = document.documentElement, was = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    el.scrollIntoView({ block: 'start' });
    html.style.scrollBehavior = was;
  };
  const ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  const loaded = document.readyState === 'complete' ? Promise.resolve() : new Promise(r => window.addEventListener('load', r, { once: true }));
  Promise.all([ready, loaded]).then(() => { land(); setTimeout(land, 350); });
})();

// Email links, assembled here so spam bots can't easily read the address
(function () {
  // EMAIL: set up hello@growwithgrounded.com in Cloudflare Email Routing before uploading this file.
  const address = 'hello' + '@' + 'growwithgrounded' + '.' + 'com';
  const at = user => user + '@' + 'growwithgrounded' + '.' + 'com';
  document.querySelectorAll('.email-link').forEach(a => {
    const subject = a.getAttribute('data-subject');
    const who = at(a.getAttribute('data-user') || 'hello');
    a.href = 'mailto:' + who + (subject ? '?subject=' + encodeURIComponent(subject) : '');
    a.querySelectorAll('[data-fill]').forEach(el => { el.textContent = who; });
  });
  const text = document.getElementById('email-text');
  if (text) text.textContent = address;
})();

// Story previews that expand in place
document.querySelectorAll('.preview-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = document.getElementById(btn.getAttribute('aria-controls'));
    const open = body.hasAttribute('hidden');
    if (open) body.removeAttribute('hidden'); else body.setAttribute('hidden', '');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Close Preview' : 'Read Preview';
  });
});

// A link to one story (stories.html#story-birth-plan) opens its preview
(function(){
  const id = decodeURIComponent(location.hash || '').slice(1);
  if (!/^story-/.test(id)) return;
  const card = document.getElementById(id); if (!card) return;
  const btn = card.querySelector('.preview-btn');
  if (btn && btn.getAttribute('aria-expanded') !== 'true') btn.click();
  setTimeout(() => card.scrollIntoView(), 0);
})();

document.querySelectorAll('.year').forEach(el => { el.textContent = new Date().getFullYear(); });

// CALL OR TEXT: when your local number is ready, type it between the quotes, for example '320-555-0123'.
// Every "Call or text" line on the site appears automatically once a number is here.
const PHONE = '';
if (PHONE) {
  document.querySelectorAll('.call-text').forEach(el => {
    const digits = PHONE.replace(/[^0-9]/g, '');
    el.innerHTML = 'Call or text <a class="text-link" href="sms:+1' + digits + '">' + PHONE + '</a>. Grieving? A text is always okay.';
    el.hidden = false;
  });
}
