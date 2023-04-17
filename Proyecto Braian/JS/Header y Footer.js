import { Header,Footer} from "./Componentes.js";

$(document).ready(function () {
    $("#header").html(Header());
    $("#footer").html(Footer());
    Receta();
    listaDeRecetas();
    filtroPais();
    filtroIngrediente();
    filtroCategoria();
})


const Receta = () => {
    var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=big%20mac`;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (datos) {

            //console.log(datos);

            $.each(datos, function (index, elemento) {
                //console.log(elemento[0]);

                $(".nombre-receta").text(elemento[0].strMeal);
                $(".imagen-receta").attr("src", elemento[0].strMealThumb);
                $(".descipcion-receta").text(elemento[0].strInstructions);
                
                $(".ingredientes").append(`<li>${elemento[0].strMeasure1} ${elemento[0].strIngredient1}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure2} ${elemento[0].strIngredient2}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure3} ${elemento[0].strIngredient3}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure4} ${elemento[0].strIngredient4}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure5} ${elemento[0].strIngredient5}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure6} ${elemento[0].strIngredient6}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure7} ${elemento[0].strIngredient7}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure8} ${elemento[0].strIngredient8}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure9} ${elemento[0].strIngredient9}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure10} ${elemento[0].strIngredient10}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure11} ${elemento[0].strIngredient11}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure12} ${elemento[0].strIngredient12}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure13} ${elemento[0].strIngredient13}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure14} ${elemento[0].strIngredient14}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure15} ${elemento[0].strIngredient15}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure16} ${elemento[0].strIngredient16}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure17} ${elemento[0].strIngredient17}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure18} ${elemento[0].strIngredient18}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure19} ${elemento[0].strIngredient19}</li>`);
                $(".ingredientes").append(`<li>${elemento[0].strMeasure20} ${elemento[0].strIngredient20}</li>`);
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const listaDeRecetas = () => {
    var url = `https://www.themealdb.com/api/json/v1/1/search.php?f=e`;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (datos) {

            console.log(datos);

            $.each(datos, function (index, elemento) {
                console.log(elemento);

                $(".nombre-receta").text(elemento[0].strMeal);
                $(".imagen-receta").attr("src", elemento[0].strMealThumb);
                $(".descipcion-receta").text(elemento[0].strInstructions);

                for (var index = 0; index <= elemento.length; index++) {
                    $("#main").append(`
                    <a href="/HTML/Reseta.html">
                    <section class="section-card">
                        <img src= "${elemento[index].strMealThumb}" alt="">
                        <div class="div-card">
                            <h3>${elemento[index].strMeal}</h3>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur distinctio in deserunt incidunt aliquam fugit ullam nulla repudiandae mollitia pariatur, ratione placeat enim reiciendis. Eum doloribus necessitatibus voluptate corporis ipsam.
                            <br>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur distinctio in deserunt incidunt aliquam fugit ullam nulla repudiandae mollitia pariatur, ratione placeat enim reiciendis. Eum doloribus necessitatibus voluptate corporis ipsam.</p>
                        </div>
                    </section></a>
                    `); 
                }
            });
        

        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const filtroPais = () => {
    var url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (datos) {

            console.log(datos);

            $.each(datos, function (index, pais) {
                console.log(pais[0].strArea);
                
                for (var index = 0; index <= pais.length; index++) {
                    $("#filtro-pais").append(`
                <option value="${pais[index].strArea}">${pais[index].strArea}</option>
                `);
                }
            });
        

        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const filtroIngrediente = () => {
    var url = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (datos) {

            console.log(datos);

            $.each(datos, function (index, ingredientes) {
                console.log(ingredientes[0].strIngredient);
                
                for (var index = 0; index <= ingredientes.length; index++) {
                    $("#filtro-ingrediente").append(`
                <option value="${ingredientes[index].strIngredient}">${ingredientes[index].strIngredient}</option>
                `);
                }
            });
        

        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const filtroCategoria = () => {
    var url = `https://www.themealdb.com/api/json/v1/1/list.php?c=list`;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (datos) {

            console.log(datos);

            $.each(datos, function (index, categoria) {
                console.log(categoria[0].strCategory);
                
                for (var index = 0; index <= categoria.length; index++) {
                    $("#filtro-categoria").append(`
                <option value="${categoria[index].strCategory}">${categoria[index].strCategory}</option>
                `);
                }
            });
        

        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}
