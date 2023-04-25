import { traducir, getElementById } from "../service/dataApi.js";

export const cardContainer = (container, data) => {
    data.then(async data => {
        const meal = data.meals[0];
        const titulo = await traducir(meal.strMeal);
        const instrucciones = await traducir(meal.strInstructions);
        var cardHome = cardCustom(meal.strMealThumb, meal.strMeal, titulo, instrucciones);
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
            console.log(meal.strMeal);
            const titulo = await traducir(meal.strMeal);
            const instrucciones = await traducir(meal.strInstructions);
            var cardHome = cardCustom(meal.strMealThumb, meal.strMeal, titulo, instrucciones);
            cardContainer.append(cardHome);
        });
    });
}



/*
export const listCardContainer = (container, data) => {
    data.then(data => {
        const cardContainer = $(`.card-containerOpciones[data-container=${container}]`);
        let array = [];

        data.meals.forEach(function (valor, indice) {
            console.log("El valor en el índice " + indice + " es " + valor);
        });
        let currentMealIndex = 0;
        const showCurrentMeal = async () => {
            const element = meals[currentMealIndex];

            const receta = await getElementById(element.idMeal);
            const meal = receta.meals[0];
            const titulo = await traducir(meal.strMeal);
            const instrucciones = await traducir(meal.strInstructions);
            const cardHome = cardCustom(meal.strMealThumb, meal.strMeal, titulo, instrucciones);
            cardContainer.empty().append(cardHome);
        };

        // Mostrar la primera receta
        showCurrentMeal();

        // Agregar eventos de clic a los botones de cursor o flecha
        $('.btn-prev').on('click', () => {
            if (currentMealIndex > 0) {
                currentMealIndex--;
                showCurrentMeal();
            }
        });

        $('.btn-next').on('click', () => {
            if (currentMealIndex < meals.length - 1) {
                currentMealIndex++;
                showCurrentMeal();
            }
        });
    });
}*/