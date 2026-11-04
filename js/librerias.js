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
    // Con "menos movimiento" el fundido es más corto
    speed: menosMovimiento ? 300 : 800,
    loop: true,            // de la última novedad vuelve a la primera, sin fin
    grabCursor: true,
    keyboard: { enabled: true },
    // Cambia cada 4 segundos en móvil, iPad y desktop.
    // Sin pauseOnMouseEnter: el slider ocupa casi toda la pantalla
    // y con el ratón encima se quedaba parado.
    autoplay: {
      delay: 4000,
      disableOnInteraction: false   // si se desliza a mano, sigue solo después
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
