// Obtener el contenedor de la aplicación
const appContainer = document.querySelector('#app');

// Definir una función para cambiar la vista de la aplicación
function cambiarVista(vista) {
  appContainer.innerHTML = vista;
}

// Definir una función para cargar una vista
function cargarVista(vistaUrl) {
  fetch(vistaUrl)
    .then(response => response.text())
    .then(html => cambiarVista(html));
}

// Definir un objeto con las opciones y sus URLs de vista correspondientes
const opciones = {
  'vista1': 'vista1.html',
  'vista2': 'vista2.html',
  'vista3': 'vista3.html'
};

// Escuchar el evento "hashchange" para cambiar la vista según la opción seleccionada
window.addEventListener('hashchange', () => {
  const opcion = location.hash.slice(1);
  const vistaUrl = opciones[opcion];
  cargarVista(vistaUrl);
});

// Cargar la vista inicial
const primeraVista = opciones[Object.keys(opciones)[0]];
cargarVista(primeraVista);