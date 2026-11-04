/* =========================================================
   FRUTOS PACO · Interfaz (JavaScript nativo)
   1. Menú desplegable
   2. Modo claro / oscuro (se recuerda con localStorage)
   ========================================================= */

/* ---------- 1. MENÚ DESPLEGABLE ---------- */

// 1. Seleccionar
const botonMenu = document.querySelector('#boton-menu');
const menu = document.querySelector('#menu');

function abrirMenu() {
  menu.classList.remove('hidden');
  botonMenu.setAttribute('aria-expanded', 'true');
  botonMenu.setAttribute('aria-label', 'Cerrar menú');
}

function cerrarMenu() {
  menu.classList.add('hidden');
  botonMenu.setAttribute('aria-expanded', 'false');
  botonMenu.setAttribute('aria-label', 'Abrir menú');
}

// 2. Escuchar  ·  3. Cambiar
botonMenu.addEventListener('click', function () {
  if (menu.classList.contains('hidden')) {
    abrirMenu();
  } else {
    cerrarMenu();
  }
});

// Al elegir un enlace, el menú se cierra
menu.querySelectorAll('a').forEach(function (enlace) {
  enlace.addEventListener('click', cerrarMenu);
});

// Cerrar con la tecla Escape y devolver el foco al botón
document.addEventListener('keydown', function (evento) {
  if (evento.key === 'Escape' && !menu.classList.contains('hidden')) {
    cerrarMenu();
    botonMenu.focus();
  }
});

// Cerrar al hacer clic fuera del menú
document.addEventListener('click', function (evento) {
  const dentro = menu.contains(evento.target) || botonMenu.contains(evento.target);
  if (!dentro && !menu.classList.contains('hidden')) {
    cerrarMenu();
  }
});


/* ---------- 2. MODO CLARO / OSCURO ---------- */

const raiz = document.documentElement; // <html>
const botonTema = document.querySelector('#boton-tema');
const textoTema = document.querySelector('#texto-tema');

// Pone el texto y el estado del botón según el modo actual
function actualizarBotonTema() {
  const oscuro = raiz.classList.contains('dark');
  textoTema.textContent = oscuro ? 'Modo claro' : 'Modo oscuro';
  botonTema.setAttribute('aria-pressed', oscuro ? 'true' : 'false');
}

botonTema.addEventListener('click', function () {
  raiz.classList.toggle('dark');
  const oscuro = raiz.classList.contains('dark');
  try {
    localStorage.setItem('tema', oscuro ? 'oscuro' : 'claro');
  } catch (e) {
    // Si el navegador no deja guardar, el cambio funciona igualmente
  }
  actualizarBotonTema();
});

// Al cargar: el <head> ya ha puesto la clase .dark si tocaba
actualizarBotonTema();


/* ---------- 3. CABECERA FIJA ----------
   La cabecera se queda arriba (sticky). Guardamos su altura en una variable CSS
   para que los enlaces internos (#temporada, #quienes...) no queden tapados. */
const cabecera = document.querySelector('#cabecera');

function medirCabecera() {
  raiz.style.setProperty('--alto-cabecera', cabecera.offsetHeight + 'px');
}

medirCabecera();
window.addEventListener('resize', medirCabecera);
document.fonts.ready.then(medirCabecera);
