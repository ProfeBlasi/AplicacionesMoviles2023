import { maquetarHome } from "./pages/home.js"
import { maquetarReceta } from "./pages/receta.js"

const opciones = {
  'Home': '../html/home.html',
  'RecetaDe': '../html/recetaComida.html',
  'Noticias': '../html/noticias.html',
  'Formulario': '../html/formulario.html',
};

const $main = $('#main-cointaner');

function cargarVista(vistaUrl) {
  var vista = vistaUrl.substring(1);
  $main.load(opciones[vista]);
  switch (vista) {
    case "Home":
      maquetarHome();
      break;
    case "RecetaDe":
      maquetarReceta();
      break;
    case "Noticias":
      console.log("El color es verde");
      break;
    case "Formulario":
      console.log("El color es azul");
      break;
  }
}

$('.menu a').click(function (event) {
  event.preventDefault();
  var page = $(this).attr('href');
  cargarVista(page);
});

$('.mobile-menu').change(function () {
  var page = $(this).val();
  cargarVista(page);
});

$(document).ready(function () {
  cargarVista('#Home');
});