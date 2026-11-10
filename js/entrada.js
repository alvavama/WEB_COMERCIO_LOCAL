/* =========================================================
   FRUTOS PACO · Animación de entrada
   A los 1,6 s las fotos y el logo se desvanecen
   y a los 2 s la página lleva a la home.
   ========================================================= */

const DESTINO = 'index.html';
const DURACION = 2000;   // milisegundos en la página de entrada
const SALIDA = 400;      // lo que dura el fundido final

// 1. Empieza el fundido de salida
setTimeout(function () {
  document.body.classList.add('entrada-saliendo');
}, DURACION - SALIDA);

// 2. Va a la home. replace() evita que el botón "atrás" vuelva a la animación
setTimeout(function () {
  window.location.replace(DESTINO);
}, DURACION);
