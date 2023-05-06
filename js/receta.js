// se utiliza para cargar primero el documento html y despues la api
document.addEventListener('DOMContentLoaded', () => {
	getInfoReceta();
	
});


// recuperamos el querystring
const querystring = window.location.search;
//console.log(querystring) // '?s=Big%20Mac'

// usando el querystring, creamos un objeto del tipo URLSearchParams
const params = new URLSearchParams(querystring);

// recuperamos el valor del parámetro "i"
const query = params.hash('i'); // "Big Mac"
//const query = params.get('i'); // "Big Mac"

async function getInfoReceta() {
	var url = `https://www.themealdb.com/api/json/v1/1/search.php?i=${query}`
	const response = await fetch(url);     // se conecta al endpoint con la url
	const data = await response.json();    //guarda los datos que devuelve el endpoint y los trasforma en json
	//console.log(data.meals);
	data.meals.forEach(datos => {
		console.log(datos);

		//nombre de la receta
		for (let index = 0; index < document.querySelectorAll('.nomb-receta').length; index++) {
			let nombReceta = document.querySelectorAll('.nomb-receta')[index].textContent = datos.strMeal;
			//traductor(nombReceta);
		}

		// preparacion de la receta
		document.querySelector('.preparacion-receta').textContent = datos.strInstructions;

		//lista de los ingredientes de la receta
		const ingredients = [];
		for (const key in datos) {
			if (key.includes("strIngredient") || key.includes("strMeasure")) {
				ingredients.push(datos[key]);
			}
		}

		const contenedorUl = document.querySelector('.list-ingredientes');

		for (let index = 0; index < 20; index++) {
			const elementoLi = document.createElement('li');
			elementoLi.textContent = ingredients[20 + index] + ' ' + ' ' + ingredients[index];
			contenedorUl.appendChild(elementoLi);

		}

		// imagen de la receta
		for (let index = 0; index < document.querySelectorAll('.nomb-receta').length; index++) {
			document.querySelectorAll('.img-receta')[index].setAttribute("src", datos.strMealThumb);
		}


	});
}


