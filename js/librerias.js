/* =========================================================
   FRUTOS PACO · Librerías
   1. Swiper: slider "New in" de la portada
   2. AOS: las tarjetas aparecen al hacer scroll
   ========================================================= */

const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 1. SWIPER ---------- */
if (document.querySelector('.novedades')) {
  new Swiper('.novedades', {
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 800,
    rewind: true,
    grabCursor: true,
    keyboard: { enabled: true },
    autoplay: menosMovimiento ? false : {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    pagination: {
      el: '.novedades-progreso',
      type: 'progressbar'
    },
    a11y: {
      prevSlideMessage: 'Novedad anterior',
      nextSlideMessage: 'Siguiente novedad',
      slideLabelMessage: 'Novedad {{index}} de {{slidesLength}}'
    }
  });
}

/* ---------- 2. AOS ---------- */
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60,
  disable: menosMovimiento
});
