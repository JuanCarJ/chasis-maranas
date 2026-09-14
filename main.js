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

const diagnosisButtons = document.querySelectorAll('[data-diagnosis]');
const diagnosisSubmit = document.querySelector('[data-diagnosis-submit]');
const diagnosisHelp = document.querySelector('[data-diagnosis-help]');

diagnosisButtons.forEach((button) => {
  button.addEventListener('click', () => {
    diagnosisButtons.forEach((item) => {
      item.classList.remove('is-selected');
      item.setAttribute('aria-pressed', 'false');
    });

    button.classList.add('is-selected');
    button.setAttribute('aria-pressed', 'true');

    const issue = button.dataset.diagnosis;
    const message = `Hola, vi la página de Chasis Marañas. Mi moto: ${issue}. Quiero enviarles fotos para consultar la reparación.`;
    diagnosisSubmit.href = `https://wa.me/573117353516?text=${encodeURIComponent(message)}`;
    diagnosisSubmit.classList.remove('is-disabled');
    diagnosisSubmit.setAttribute('aria-disabled', 'false');
    diagnosisHelp.textContent = `Consulta preparada: ${issue}.`;
  });
});

diagnosisSubmit?.addEventListener('click', (event) => {
  if (diagnosisSubmit.getAttribute('aria-disabled') === 'true') {
    event.preventDefault();
    diagnosisHelp.textContent = 'Selecciona primero qué le pasó a tu moto.';
  }
});

const photoTrack = document.querySelector('[data-photo-track]');
const photoSlides = photoTrack?.querySelectorAll('.photo-slide');
const photoPrev = document.querySelector('[data-carousel-prev]');
const photoNext = document.querySelector('[data-carousel-next]');

const movePhotos = (direction) => {
  if (!photoTrack || !photoSlides?.length) return;
  const slideGap = Number.parseFloat(getComputedStyle(photoTrack).columnGap || getComputedStyle(photoTrack).gap || '18') || 18;
  const slideWidth = photoSlides[0].getBoundingClientRect().width + slideGap;
  photoTrack.scrollBy({ left: direction * slideWidth, behavior: 'smooth' });
};

photoPrev?.addEventListener('click', () => movePhotos(-1));
photoNext?.addEventListener('click', () => movePhotos(1));
