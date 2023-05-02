import { translate, getElementById } from "../service/dataApi.js";

export const cardContainer = (container, data, degustacion) => {
    data.then(async data => {
        const meal = data.meals[0];
        const titulo = await translate(meal.strMeal);
        const instrucciones = await translate(meal.strInstructions);
        var cardHome = null;
        if (degustacion) {
            cardHome = cardCustomDegustacion(meal.strMealThumb, meal.strMeal, titulo, meal.idMeal);
        } else {
            cardHome = cardCustom(meal.strMealThumb, meal.strMeal, titulo, instrucciones);
        }
        const cardContainer = $(`.card-container[data-container=${container}]`);
        cardContainer.html(cardHome);
    });
}

const cardCustom = (image, imageAlt, title, instructions, id) => {
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
        const purchase = { id: id, meal: title, precio: precio, cantidad: 1 };
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
                const existingPurchase = purchases.find(p => p.id === id);
                console.log(id);
                console.log(existingPurchase);
                if (existingPurchase) {
                    Swal.fire('Esta receta ya esta en tu carrito');
                } else {
                    purchases.push(purchase);
                    localStorage.setItem('purchases', JSON.stringify(purchases));
                    Swal.fire('Esta receta se agrego a tu carrito');
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
            var cardHome = cardCustom(meal.strMealThumb, meal.strMeal, titulo, instrucciones, meal.idMeal);
            cardContainer.append(cardHome);
        });
    });
}

const cardCustomDegustacion = (image, imageAlt, title, id) => {
    const card = $('<div>').addClass('card');
    const imageDiv = $('<img>').addClass('card-image').attr('src', image).attr('alt', imageAlt);
    const titleDiv = $('<h2>').addClass('card-title').text(title);
    const precio = id - 52000;
    const priceDiv = $('<div>').addClass('card-price').text(`Precio: $${precio}`);
    const buyButton = $('<button>').addClass('card-buy').text('Agregar al carrito').on('click', function () {
        const purchase = { id: id, meal: title, precio: precio, cantidad: 1 };
        const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
        // Busca una compra con el mismo id y actualiza la cantidad
        const existingPurchase = purchases.find(p => p.id === id);
        if (existingPurchase) {
            existingPurchase.cantidad++;
        } else {
            purchases.push(purchase);
        }
        localStorage.setItem('purchases', JSON.stringify(purchases));
        Swal.fire(
            'Buena eleccion!',
            title + ' se agrego a su pedido correctamente',
            'success'
        );
    });
    card.append(imageDiv).append(titleDiv).append(priceDiv).append(buyButton);
    return card;
};
