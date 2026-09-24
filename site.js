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
  const address = 'joy2serve' + '@' + 'gmail' + '.' + 'com';
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
