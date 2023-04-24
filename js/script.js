import { maquetarHome } from "./pages/home.js"

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
    maquetarHome();
  }
  
  $('.menu a').click(function(event) {
    event.preventDefault();
    var page = $(this).attr('href');
    cargarVista(page);
  });
  
  $('.mobile-menu').change(function() {
    var page = $(this).val();
    cargarVista(page);
  });

  $(document).ready(function() {
    cargarVista('#Home');
  });