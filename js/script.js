import { maquetarHome } from "./pages/home.js"
import { maquetarReceta } from "./pages/receta.js"
import { createMap } from "./pages/formulario.js"
import { maquetarDegustacion } from "./pages/degustacion.js"

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
        maquetarHome();
        break;
      case "RecetaDe":
        maquetarReceta();
        break;
      case "Contacto":
        createMap();
        break;
      case "Degustacion":
        maquetarDegustacion();
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
  cargarVista('#Degustacion');
});

$(document).ready(function () {
  $("#enviar").click(function (event) {
    var error = false;
    $(".error").text("");
    $("#formulario input[required], #formulario textarea[required]").each(function () {
      if ($(this).val() == "") {
        $(this).next(".error").text("Este campo es obligatorio");
        error = true;
      }
    });
    if (error) {
      event.preventDefault();
    }
  });
});