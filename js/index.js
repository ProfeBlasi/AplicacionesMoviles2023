import { getRandom, Imprimir } from "./service/dataApi.js"

$(document).ready(function () {
    $('#miBoton').click(function () {
        $.ajax({
            url: "https://www.themealdb.com/api/json/v1/1/random.php",
            type: "GET",
            success: function (data) {
                const meal = data.meals[0];

                // Crea el elemento de la card
                const card = $('<div>').addClass('card');

                // Agrega la imagen de la comida a la card
                const image = $('<img>').addClass('card-image').attr('src', meal.strMealThumb).attr('alt', meal.strMeal);
                card.append(image);

                // Agrega la información de la comida a la card
                const info = $('<div>').addClass('card-info');
                const title = $('<h2>').addClass('card-title').text(meal.strMeal);
                const category = $('<p>').addClass('card-category').text(meal.strCategory);
                const instructions = $('<p>').addClass('card-instructions hidden').text(meal.strInstructions);
                const showInstructionsButton = $('<button>').addClass('card-show-instructions').text('Mostrar instrucciones');
                info.append(title).append(category).append(showInstructionsButton).append(instructions);
                card.append(info);

                // Agrega la card al contenedor
                const cardContainer = $('.card-container');
                cardContainer.html(card);

                // Agrega un controlador de eventos de clic para mostrar u ocultar las instrucciones
                const cardInstructions = $('.card-instructions');
                const cardShowInstructionsButton = $('.card-show-instructions');
                cardShowInstructionsButton.click(function () {
                    cardInstructions.toggleClass('visible');
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    })
});