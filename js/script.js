import { selectFilter } from "./pages/receta.js"
import { initMap, validarFormulario } from "./pages/contacto.js"

const $main = $('#main-cointaner');
const opciones = {
  'Home': '../html/home.html',
  'RecetaDe': '../html/recetaComida.html',
  'Degustacion': '../html/degustacion.html',
  'Contacto': '../html/contacto.html',
};

function cargarVista(vistaUrl) {
  var vista = vistaUrl.substring(1);
  $main.load(opciones[vista], function () {
    switch (vista) {
      case "Home":
        break;
      case "RecetaDe":
        selectFilter();
        break;
      case "Contacto":
        initMap();
        validarFormulario();
        break;
      case "Degustacion":
        break;
    }
  });
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