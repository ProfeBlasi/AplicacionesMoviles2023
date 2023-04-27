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
  console.log(page);
  cargarVista(page);
});

$('.mobile-menu').change(function () {
  var page = $(this).val();
  cargarVista(page);
});

$(document).ready(function () {
  cargarVista('#Home');
});

$(document).on('click', '#pedido', function (event) {

  const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
  const resumenPedido = $('.section-container-degustacion');
  const verPedido = $('#pedido');
  verPedido.hide();
  const cardContainer1 = $('.card-container[data-container=1]');
  const cardContainer2 = $('.card-container[data-container=2]');
  const cardContainer3 = $('.card-container[data-container=3]');
  const cardContainer4 = $('.card-container[data-container=4]');
  cardContainer1.empty();
  cardContainer2.empty();
  cardContainer3.empty();
  cardContainer4.empty();

  let total = 0;

  // Crear tabla dinámicamente
  const tabla = document.createElement('table');
  tabla.classList.add('table');

  // Crear cabecera de la tabla
  const cabecera = document.createElement('thead');
  const filaCabecera = document.createElement('tr');
  const encabezados = ['Comida', 'Precio unitario', 'Cantidad'];

  encabezados.forEach(function (encabezado) {
    const th = document.createElement('th');
    const texto = document.createTextNode(encabezado);
    th.appendChild(texto);
    filaCabecera.appendChild(th);
  });

  cabecera.appendChild(filaCabecera);
  tabla.appendChild(cabecera);

  // Crear cuerpo de la tabla
  const cuerpo = document.createElement('tbody');

  purchases.forEach(function (purchase) {
    const fila = document.createElement('tr');

    const celdaComida = document.createElement('td');
    const textoComida = document.createTextNode(purchase.meal);
    celdaComida.appendChild(textoComida);
    fila.appendChild(celdaComida);

    const celdaPrecio = document.createElement('td');
    const textoPrecio = document.createTextNode('$ '+purchase.precio);
    celdaPrecio.appendChild(textoPrecio);
    fila.appendChild(celdaPrecio);

    const celdaCantidad = document.createElement('td');
    const textoCantidad = document.createTextNode(purchase.cantidad);
    celdaCantidad.appendChild(textoCantidad);
    fila.appendChild(celdaCantidad);

    cuerpo.appendChild(fila);

    total += purchase.precio * purchase.cantidad;
  });
  tabla.appendChild(cuerpo);
  resumenPedido.append(tabla);
  var nuevoSpan = document.createElement("span");
  nuevoSpan.append('Precio total: $' + total);
  resumenPedido.append(nuevoSpan);
  const seguirComprando = $('<button>Seguir comprando</button>');
  const comprarBtn = $('<button>Comprar</button>');
  comprarBtn.addClass('btnCompra');
  seguirComprando.addClass('btnSeguirComprando');
  resumenPedido.append(seguirComprando);
  resumenPedido.append(comprarBtn);
  comprarBtn.click(function () {
    localStorage.removeItem('purchases');
    if (total === 0) {
      Swal.fire(
        'Ohoo',
        'No tenias comidas en tu pedido',
        'question'
      );
      resumenPedido.empty();
      comprarBtn.hide();
      $main.load('../html/degustacion.html');
      maquetarDegustacion();
    }
    else {
      Swal.fire(
        'Genial',
        'Su compra por el monto de $' + total + ' se realizo correctamente',
        'success'
      );
      resumenPedido.empty();
      comprarBtn.hide();
      $main.load('../html/degustacion.html');
      maquetarDegustacion();
    }
  });

  seguirComprando.click(function () {
    resumenPedido.empty();
    comprarBtn.hide();
    $main.load('../html/degustacion.html');
    maquetarDegustacion();
  });
});



$(document).on('click', '#enviar', function (event) {
    var error = false;
    $(".error").text("");
    $("#formulario input[required], #formulario textarea[required]").foreach(function () {
      if ($(this).val() == "") {
        $(this).next(".error").text("Este campo es obligatorio");
        error = true;
      }
    });
    if(!error) {
      Swal.fire(
        'Genial',
        'Su compra por el monto de realizo correctamente',
        'success'
      );
    }
  });