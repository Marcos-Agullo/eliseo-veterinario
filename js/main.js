document.addEventListener('DOMContentLoaded', () => {

  // ===== MENÚ HAMBURGUESA =====
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // ===== ANIMACIÓN AL HACER SCROLL =====
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  // ===== LIGHTBOX GALERÍA =====
  const galeriaImgs = document.querySelectorAll('#galeria-grid img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  galeriaImgs.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ===== FORMULARIO DE CONTACTO (SIN BACKEND) =====
  const form = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // IMPORTANTE: este formulario no envía datos reales.
    // Debe conectarse a un servicio de envío (ej. Formspree, EmailJS) o backend propio antes de producción.
    formNote.textContent = '⚠️ Este formulario aún no está conectado a un servicio de envío. Por favor, contacta por WhatsApp o llamada mientras se habilita esta función.';
  });

  // ===== AÑO ACTUAL EN EL FOOTER =====
  document.getElementById('year').textContent = new Date().getFullYear();

});