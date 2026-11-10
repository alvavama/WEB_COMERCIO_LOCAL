/* =========================================================
   FRUTOS PACO · Animación de entrada en la home
   La capa #entrada se desvanece sola con CSS a los 3 s
   (@keyframes salir). Aquí solo se quita del documento
   y se vuelve a permitir el scroll.
   ========================================================= */

const capaEntrada = document.querySelector('#entrada');
const DURACION_ENTRADA = 3000; // milisegundos

if (capaEntrada) {
  if (document.documentElement.classList.contains('sin-entrada')) {
    // Ya se vio en esta sesión (o se pide menos movimiento): fuera directamente
    capaEntrada.remove();
  } else {
    setTimeout(function () {
      capaEntrada.remove();
      document.documentElement.classList.remove('entrada-activa');
    }, DURACION_ENTRADA);
  }
}
