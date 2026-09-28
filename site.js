// =====================================================================
// GROUNDED. SITE SCRIPT (shared by every page)
// =====================================================================

// Mobile menu
(function () {
  const btn = document.querySelector('.menu-btn');
  const menu = document.getElementById('site-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }));
})();

// Email links, assembled here so spam bots can't easily read the address
(function () {
  // EMAIL: set up hello@growwithgrounded.com in Cloudflare Email Routing before uploading this file.
  const address = 'hello' + '@' + 'growwithgrounded' + '.' + 'com';
  document.querySelectorAll('.email-link').forEach(a => {
    const subject = a.getAttribute('data-subject');
    a.href = 'mailto:' + address + (subject ? '?subject=' + encodeURIComponent(subject) : '');
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
