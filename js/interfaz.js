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
const logo = cabecera.querySelector('.logo');

// En el Figma la cabecera mide 646 px de los 2302 px de alto del frame: un 28 %
const PROPORCION_CABECERA = 0.28;
const ESTIRADO_MAXIMO = 1.3; // el estirado vertical del diseño
const ESTIRADO_MINIMO = 1;   // la letra sin estirar

// Si la pantalla es baja (portátiles), el logo se estira menos en vertical
// para que la cabecera no ocupe más pantalla que en el diseño.
// Siempre ocupa todo el ancho: solo cambia la altura de las letras.
// Solo en pantallas muy bajas (móvil en horizontal) se reduce también el tamaño.
function ajustarLogo() {
  logo.style.fontSize = ''; // partimos del tamaño que llena el ancho
  const estilo = getComputedStyle(logo);
  const letra = parseFloat(estilo.fontSize);
  const estiradoActual = parseFloat(estilo.getPropertyValue('--estirado')) || ESTIRADO_MAXIMO;

  // Lo que ocupa la cabecera sin contar el logo (márgenes y subtítulo)
  const resto = cabecera.offsetHeight - letra * (0.04 + 0.83 * estiradoActual);
  const altoDeseado = window.innerHeight * PROPORCION_CABECERA;

  let estirado = (altoDeseado - resto - 0.04 * letra) / (0.83 * letra);

  if (estirado < ESTIRADO_MINIMO) {
    // Ni sin estirar cabe: reducimos un poco la letra (como mucho un 30 %)
    estirado = ESTIRADO_MINIMO;
    const letraQueCabe = Math.max((altoDeseado - resto) / 0.87, letra * 0.7);
    logo.style.fontSize = letraQueCabe + 'px';
  }

  estirado = Math.min(ESTIRADO_MAXIMO, estirado);
  logo.style.setProperty('--estirado', estirado.toFixed(3));
}

function medirCabecera() {
  ajustarLogo();
  raiz.style.setProperty('--alto-cabecera', cabecera.offsetHeight + 'px');
}

medirCabecera();
window.addEventListener('resize', medirCabecera);
document.fonts.ready.then(medirCabecera);
