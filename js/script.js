const opciones = {
    'Home': '../html/home.html',
    'RecetaDe': '../html/recetaComida.html',
    'Noticias': '../html/noticias.html',
    'Formulario': '../html/formulario.html',
  };
  
  const $main = $('#main-cointaner');
  
  function cargarVista(vistaUrl) {
    $main.load(vistaUrl);
  }
  
  $('.menu a').click(function(event) {
    event.preventDefault();
    var page = $(this).attr('href');
    cargarVista(opciones[page.substring(1)]);
  });
  
  $('.mobile-menu').change(function() {
    var page = $(this).val();
    cargarVista(opciones[page.substring(1)]);
  });
  
  const primeraVista = opciones[Object.keys(opciones)[0]];
  cargarVista(primeraVista);