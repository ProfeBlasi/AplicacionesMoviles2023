import { getCategories, getByOption, traducir, translate } from "../service/dataApi.js";
import { listCardContainer } from "../utils/card.js"

export const selectFilter = () => {
    var categoria;
    $(document).ready(function () {
        $('#categoria').on('change', async function () {
            categoria = $(this).val();
            var opciones = [];
            if (categoria === 'categoria') {
                opciones = await loadList(opciones, 'c');
            } else if (categoria === 'ingrediente') {
                opciones = await loadList(opciones, 'i');
            } else if (categoria === 'region') {
                opciones = await loadList(opciones, 'a');
            }
            var opcionSelect = $('#opcion');
            opcionSelect.empty();
            for (var i = 0; i < opciones.length; i++) {
                opcionSelect.append($('<option></option>').val(opciones[i]).html(opciones[i]));
            }
        });
    });
    $(document).ready(function () {
        $('#opcion').on('change', async function () {
            var opcion = $(this).val();
            opcion = await traducir(opcion);
            switch (categoria) {
                case 'categoria':
                    listCardContainer(getByOption('c', opcion));
                case 'ingrediente':
                    listCardContainer(getByOption('i', opcion));
                case 'region':
                    listCardContainer(getByOption('a', opcion));
            }
        });
    });
}

const loadList = async (opciones, filter) => {
    const data = await getCategories(filter);
    const promises = data.meals.map(async (category) => {
        switch (filter) {
            case 'c':
                const categoryName = await translate(category.strCategory);
                return categoryName;
            case 'i':
                const ingredientName = await translate(category.strIngredient);
                return ingredientName;
            case 'a':
                const areaName = await translate(category.strArea);
                return areaName;
        }
    });
    opciones = await Promise.all(promises);
    return opciones;
};