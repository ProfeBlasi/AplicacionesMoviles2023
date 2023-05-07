import { translate, getElementById } from "../service/dataApi.js";
export const card = (image, imageAlt, title, instructions, id, ingredientes, xd) => {
    const cardLink = $('<a>').addClass('cardLink').attr('href', "");
    const card = $('<article>').addClass('card');
    const imageDiv = $('<img>').addClass('card-image').attr('src', image).attr('alt', imageAlt);
    card.append(imageDiv);
    const info = $('<div>').addClass('card-info');
    const titleDiv = $('<h2>').addClass('card-title').text(title);
    const shareButton = $('<button>').addClass('card-show-instructions').text('Compartir Wap');
    const precio = id - 52000;
    shareButton.on('click', function () {
        const mensaje = `¡Hola! Te comparto una receta: ${title} podes seguir las siguientes instrucciones ${instructions} ${image}`;
        const urlCompartir = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
        window.open(urlCompartir);
    });
    const buyButton = $('<button>').addClass('card-buy').text('Agregar al carrito').on('click', function () {
        const purchase = { id: id, image: image, meal: title, precio: precio, cantidad: 1 };
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
                const existingPurchase = purchases.find(p => p.id === id);
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
    info.append(titleDiv).append(shareButton).append(buyButton);
    card.append(info);
    cardLink.prepend(card);
    cardLink.on('click', async function (e) {
        e.preventDefault();
        const mainContainer = $('#seccion-receta');
        mainContainer.empty();
        mainContainer.append(card2(title, image, instructions));
        console.log(xd);
        console.log(instructions);
        const contenedorUl = document.querySelector('.list-ingredientes');
        for (let index = 0; index < 20; index++) {
            const elementoLi = document.createElement('li');
            elementoLi.textContent = ingredientes[20 + index] + ' ' + ' ' + await translate(ingredientes[index]);
            contenedorUl.appendChild(elementoLi);
        }
    });
    return cardLink;

};

const card2 = (titulo, image, instructions) => {
    return `
    <section class="container-data-receta">
        <h2 class="nombre-receta">Reseta de ${titulo} </h2>
        <section id="seccion-1">
            <img src=${image} alt="Imagen de"+${image} class="img-receta">
        </section>
        <section id="seccion-2">
            <h3>Ingredientes: </h3>
            <ul class="list-ingredientes">
            </ul>
            <h3>Instrucciones</h3>
            <p>${instructions}</p>
        </section>
    </section>
    `
}


export const listCardContainer = (data) => {
    data.then(data => {
        const cardContainer = $('.card-container');
        cardContainer.empty();
        data.meals.forEach(async element => {
            const receta = await getElementById(element.idMeal);
            const meal = receta.meals[0];
            const titulo = await translate(meal.strMeal);
            const instrucciones = await translate(meal.strInstructions);
            const ingredients = [];
            for (const key in meal) {
                if (key.includes("strIngredient") || key.includes("strMeasure")) {
                    ingredients.push(meal[key]);
                }
            }
            var cardHome = card(meal.strMealThumb, meal.strMeal, titulo, instrucciones, meal.idMeal, ingredients, meal.strInstructions);
            cardContainer.append(cardHome);
        });
    });
}