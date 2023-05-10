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
        //Getselect()
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
        //Getselect()
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


function Getselect() {
    // Obtener los elementos select
    const select1 = document.getElementById('categoria');
    const select2 = document.getElementById('opcion');

    // Configurar los valores seleccionados en los elementos select
    const storedSelect1Value = localStorage.getItem('select1Value');
    if (storedSelect1Value) {
        select1.value = storedSelect1Value;
    }

    const storedSelect2Value = localStorage.getItem('select2Value');
    if (storedSelect2Value) {
        select2.value = storedSelect2Value;
    }

    // Actualizar el valor seleccionado en el objeto localStorage cuando el usuario cambia la selección en un select
    select1.addEventListener('change', () => {
        localStorage.setItem('select1Value', select1.value);
    });

    select2.addEventListener('change', () => {
        localStorage.setItem('select2Value', select2.value);
    });
}