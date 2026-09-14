const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Cerrar menú' : 'Abrir menú';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.querySelector('.sr-only').textContent = 'Abrir menú';
    });
  });
}

const header = document.querySelector('[data-header]');
const updateHeader = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
};
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
