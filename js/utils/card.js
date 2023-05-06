import { translate, getElementById } from "../service/dataApi.js";
export const card = (image, imageAlt, title, instructions, id,ingredientes) => {
    const cardLink = $('<a>').addClass('cardLink').attr('href', "");
    const card = $('<article>').addClass('card');
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
    info.append(titleDiv).append(showInstructionsButton).append(instructionsText).append(buyButton);
    card.append(info);
    cardLink.prepend(card);

    cardLink.on('click', function (e) {
        e.preventDefault();
        //borrar dom mian
        const mainContainer = $('#seccion-receta');
        console.log(mainContainer);
        mainContainer.empty();
        //poner html de recetas
        mainContainer.append(card2(title ,image ,instructions,ingredientes));
        const contenedorUl = document.querySelector('.list-ingredientes');
        console.log(ingredientes);
		for (let index = 0; index < 20; index++) {
			const elementoLi = document.createElement('li');
			elementoLi.textContent = ingredientes[20 + index] + ' ' + ' ' + ingredientes[index];
			contenedorUl.appendChild(elementoLi);
		}
        // Aquí puedes agregar la lógica que deseas ejecutar cuando se hace clic en la card
        console.log('Se hizo clic en la card');
    });
    return cardLink;

};

const card2 = (titulo, image, instructions,ingredientes) => {
    return`
    <section class="container-data-receta">
        <h2 class="nombre-receta">${titulo} </h2>
        <section id="seccion-1">
            <h2>Reseta de ${titulo}</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quam ipsa a fugiat sit est tempore iste
                reiciendis perferendis praesentium illo repudiandae in, nam modi corrupti obcaecati, officia sequi
                ipsam.</p>
            <img src=${image} alt="Imagen de"+${image} class="img-receta">
        </section>
        <section id="seccion-2">
            <h3>Ingredientes: </h3>
            <ul class="list-ingredientes">
            </ul>
        </section>
        <section id="seccion-3">
            <h2>Preparacion</h2>
            <img src="" alt="POLLO A LA NARANJA" class="img-receta">
            <h3>Como hacer ${titulo}</h3>
            <p class="preparacion-receta">${instructions}</p>
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
            //const ingredientes = await translate(meal.strMeal);
            const titulo = await translate(meal.strMeal);
            const instrucciones = await translate(meal.strInstructions);
            /* a k*/
            const ingredients = [];
            for (const key in element) {
                if (key.includes("strIngredient") || key.includes("strMeasure")) {
                    ingredients.push(element[key]);
                }
            }
            var cardHome = card(meal.strMealThumb, meal.strMeal, titulo, instrucciones, meal.idMeal,ingredients);
            cardContainer.append(cardHome);
        });
    });
}