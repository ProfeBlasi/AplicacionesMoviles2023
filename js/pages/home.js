import { getRandom, traducir } from "../service/dataApi.js"

export const maquetarHome = () => {
    cardContainer(1);
    cardContainer(2);
    cardContainer(3);
    cardContainer(4);
};

const cardContainer = (container) => {
    getRandom().then(async data => {
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
    showInstructionsButton.on('click', function() {
        instructionsDiv.toggleClass('hidden');
      });
    
      return card;
  }
