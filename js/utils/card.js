import { traducir, getElementById } from "../service/dataApi.js";

export const cardContainer = (container, data, degustacion) => {
    data.then(async data => {
        const meal = data.meals[0];
        const titulo = await traducir(meal.strMeal);
        const instrucciones = await traducir(meal.strInstructions);
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

const cardCustom = (image, imageAlt, title, instructions) => {
    const card = $('<div>').addClass('card');
    const imageDiv = $('<img>').addClass('card-image').attr('src', image).attr('alt', imageAlt);
    card.append(imageDiv);
    const info = $('<div>').addClass('card-info');
    const titleDiv = $('<h2>').addClass('card-title').text(title);
    const instructionsDiv = $('<p>').addClass('card-instructions hidden').text(instructions);
    const showInstructionsButton = $('<button>').addClass('card-show-instructions').text('Mostrar instrucciones');
    info.append(titleDiv).append(showInstructionsButton).append(instructionsDiv);
    card.append(info);
    showInstructionsButton.on('click', function () {
        instructionsDiv.toggleClass('hidden');
    });
    return card;
}

export const listCardContainer = (container, data) => {
    data.then(data => {
        const cardContainer = $('.card-containerOpciones');
        cardContainer.empty();
        data.meals.forEach(async element => {
            const receta = await getElementById(element.idMeal);
            const meal = receta.meals[0];
            const titulo = await traducir(meal.strMeal);
            const instrucciones = await traducir(meal.strInstructions);
            var cardHome = cardCustom(meal.strMealThumb, meal.strMeal, titulo, instrucciones);
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
