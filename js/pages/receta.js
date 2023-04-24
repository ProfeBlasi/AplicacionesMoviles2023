import { getCategories, getByOption } from "../service/dataApi.js";
import { traducir } from "../service/dataApi.js";
import { listCardContainer } from "../utils/card.js"

export const maquetarReceta = () => {
    options('c','opcionCategorias');
    //options('i','opcionIngrediente');
    //options('a','opcionArea');
}

const options = (caracter, idClassOption) =>{
    return getCategories(caracter).then(data => {
        const select = document.getElementById(idClassOption);
        listCardContainer('',getByOption('c', data.meals[0].strCategory));
        data.meals.forEach(async category => {
            const option = document.createElement('option');
            switch (caracter) {
                case "c":
                    option.value = category.strCategory;
                    option.text = await traducir(category.strCategory);
                  break;
                /*case "i":
                    option.value = category.strIngredient;
                    option.text = await traducir(category.strIngredient);
                  break;
                case "a":
                    option.value = category.strArea;
                    option.text = await traducir(category.strArea);
                  break;*/
              }
            select.appendChild(option);
        });
    });
}
