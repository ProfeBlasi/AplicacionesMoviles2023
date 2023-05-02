import { translate, getElementById } from "../service/dataApi.js";

const card = (image, imageAlt, title, instructions, id) => {
    const card = $('<div>').addClass('card');
    const imageDiv = $('<img>').addClass('card-image').attr('src', image).attr('alt', imageAlt);
    card.append(imageDiv);
    const info = $('<div>').addClass('card-info');
    const titleDiv = $('<h2>').addClass('card-title').text(title);
    const instructionsText = $('<p>').addClass('card-instructions hidden').text(instructions);
    const showInstructionsButton = $('<button>').addClass('card-show-instructions').text('Mostrar instrucciones');
    const precio = id - 52000;
    showInstructionsButton.on('click', function () {
        Swal.fire({
            title: title,
            html: instructions,
            icon: 'info',
            confirmButtonText: 'OK',
        });
    });
    const buyButton = $('<button>').addClass('card-buy').text('Agregar al carrito').on('click', function () {
        const purchase = { image: image, meal: title, precio: precio, cantidad: 1 };
        Swal.fire({
            title: title + '!!',
            text: 'Precio: $' + precio + ' por unidad',
            imageUrl: image,
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonText: 'Agregar al carrito',
        }).then((result) => {
            if (result.isConfirmed) {
                const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
                // Busca una compra con el mismo id y actualiza la cantidad
                const existingPurchase = purchases.find(p => p.meal === title);
                if (existingPurchase) {
                    Swal.fire(
                        'Esta receta ya esta en tu carrito!',
                        'Podras sumar porciones o cancelar al finalizar tu pedido',
                        'error'
                      );
                } else {
                    purchases.push(purchase);
                    localStorage.setItem('purchases', JSON.stringify(purchases));
                    Swal.fire(
                        'La receta se agrego a tu carrito!',
                        'Podras sumar porciones o cancelar al finalizar tu pedido',
                        'success'
                      )
                }
            }
        })
    });
    info.append(titleDiv).append(showInstructionsButton).append(instructionsText).append(buyButton);
    card.append(info);
    return card;
};

export const listCardContainer = (data) => {
    data.then(data => {
        const cardContainer = $('.card-containerOpciones');
        cardContainer.empty();
        data.meals.forEach(async element => {
            const receta = await getElementById(element.idMeal);
            const meal = receta.meals[0];
            const titulo = await translate(meal.strMeal);
            const instrucciones = await translate(meal.strInstructions);
            var cardHome = card(meal.strMealThumb, meal.strMeal, titulo, instrucciones, meal.idMeal);
            cardContainer.append(cardHome);
        });
    });
}