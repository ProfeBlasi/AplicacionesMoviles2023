export const compra = () => {
    const purchases = JSON.parse(localStorage.getItem('purchases'));
    if (purchases != null && purchases.length > 0) {
        let total = 0;
        // Crear tabla dinámicamente
        const tabla = document.createElement('table');
        tabla.classList.add('table');

        // Crear cabecera de la tabla
        const cabecera = document.createElement('thead');
        const filaCabecera = document.createElement('tr');
        const encabezados = ['Comida', "Nombre", 'Precio unitario', 'Cantidad', 'Quitar o agregar'];

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

            const celdaImgComida = document.createElement('td');
            const imagenComida = document.createElement('img');
            imagenComida.src = purchase.image;
            celdaImgComida.appendChild(imagenComida);
            fila.appendChild(celdaImgComida);


            const celdaComida = document.createElement('td');
            const textoComida = document.createTextNode(purchase.meal);
            celdaComida.appendChild(textoComida);
            fila.appendChild(celdaComida);

            const celdaPrecio = document.createElement('td');
            const textoPrecio = document.createTextNode('$ ' + purchase.precio);
            celdaPrecio.appendChild(textoPrecio);
            fila.appendChild(celdaPrecio);

            const celdaCantidad = document.createElement('td');
            const textoCantidad = document.createTextNode(purchase.cantidad);
            celdaCantidad.appendChild(textoCantidad);
            fila.appendChild(celdaCantidad);

            const celdaBotones = document.createElement('td');
            const divBotones = $('<div>').addClass('purchase-buttons');
            const increaseButton = $('<button>').addClass('purchase-increase-quantity').text('+');
            const decreaseButton = $('<button>').addClass('purchase-decrease-quantity').text('-');
            divBotones.append(decreaseButton).append(increaseButton);
            celdaBotones.appendChild(divBotones[0]);
            fila.appendChild(celdaBotones);

            cuerpo.appendChild(fila);
            total += purchase.precio * purchase.cantidad;
            // Manejadores de eventos para los botones de incrementar y decrementar cantidad
            increaseButton.on('click', function () {
                purchase.cantidad++;
                textoCantidad.textContent = purchase.cantidad;
                total += purchase.precio; // Incrementar el total con el precio del producto
                $('.resumen-total-precio').text("Total $ " + total); // Actualizar el elemento del DOM que muestra el total
                // Guardar los cambios en el localStorage
                localStorage.setItem('purchases', JSON.stringify(purchases));
            });

            decreaseButton.on('click', function () {
                if (purchase.cantidad > 1) {
                    console.log(purchase.cantidad);
                    purchase.cantidad--;
                    textoCantidad.textContent = purchase.cantidad;
                    total -= purchase.precio; // Decrementar el total con el precio del producto
                    $('.resumen-total-precio').text("Total $ " + total); // Actualizar el elemento del DOM que muestra el total
                    // Guardar los cambios en el localStorage
                    localStorage.setItem('purchases', JSON.stringify(purchases));
                } else {
                    console.log(purchase.cantidad);
                    // Eliminar objeto del arreglo si la cantidad es 0
                    purchases.splice(purchases.indexOf(purchase), 1);
                    total -= purchase.precio; // Decrementar el total con el precio del producto eliminado
                    $('.resumen-total-precio').text("Total $" + total); // Actualizar el elemento del DOM que muestra el total
                    // Guardar los cambios en el localStorage
                    localStorage.setItem('purchases', JSON.stringify(purchases));
                    // Eliminar la tarjeta del DOM
                    fila.remove();
                    if (purchases.length === 0) {
                        cleanContainer();
                    }
                }
            });
        });
        tabla.appendChild(cuerpo);
        $('.resumen-items').append(tabla);
        $('.resumen-total-precio').append("Total $ " + total);
        const btnComprar = $('<button>').addClass('comprar').text('Comprar');
        const btnCancelar = $('<button>').addClass('cancelar').text('Cancelar');
        $('.container-precio').append(btnComprar, btnCancelar);
        btnComprar.on('click', function () {
            Swal.fire({
                title: 'Ud va a confirmar su compra?',
                text: "Por un monto de $ " + total,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar!'
              }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('purchases');
                    cleanContainer();
                  Swal.fire(
                    'Genial!',
                    'Su compra esta en camino.',
                    'success'
                  )
                }
              })
        });
        btnCancelar.on('click', function () {
            Swal.fire({
                title: 'Ud va a cancelar su compra?',
                text: "Por un monto de $ " + total,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, cancelar!'
              }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('purchases');
                    cleanContainer();
                  Swal.fire(
                    'Ok!',
                    'Ud cancelo su compra.',
                    'error'
                  )
                }
              })
        });
    } else {
        cleanContainer();
    }
}

const cleanContainer = () => {
    const containerCompra = $('.container-compra');
    const h2 = $('<h2>').text('Agrega recetas a tu carrito');
    const img = $('<img>').attr('src', '../Imagenes/undraw_empty_cart_co35.svg'); // Reemplaza "ruta-de-tu-imagen.jpg" con la ruta de tu imagen
    containerCompra.empty().append(h2, img);
}