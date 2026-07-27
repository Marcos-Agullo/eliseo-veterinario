document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');

    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute(
      'aria-label',
      isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
    );
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Abrir menú de navegación');
    });
  });

  document.addEventListener('click', (event) => {
    const clickInsideNav = nav.contains(event.target);
    const clickOnHamburger = hamburger.contains(event.target);

    if (nav.classList.contains('open') && !clickInsideNav && !clickOnHamburger) {
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Abrir menú de navegación');
    }
  });

  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('visible'));
  }

  const galleryButtons = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  let lastFocusedElement = null;

  function openLightbox(image, button) {
    lastFocusedElement = button;
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox.classList.contains('active')) return;

    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    document.body.classList.remove('no-scroll');

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  galleryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const image = button.querySelector('img');
      openLightbox(image, button);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeLightbox();
    }

    if (
      event.key === 'Tab' &&
      lightbox.classList.contains('active')
    ) {
      event.preventDefault();
      lightboxClose.focus();
    }
  });

  const form = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    formNote.textContent =
      'El formulario estará disponible próximamente. Mientras tanto, contacta con nosotros por WhatsApp o por teléfono.';
  });

  document.getElementById('year').textContent = new Date().getFullYear();
});
