import { get, message } from "./callApi.js"

const URL = 'https://www.themealdb.com/api/json/v1/1/'

const aleatorio = URL + "random.php"

export const getRandom = () => {
    return get(aleatorio);
}

export const Imprimir = (mensaje) => {
    var mes = message(mensaje);   
    console.log("Llego el mensaje");
    return mes;
}