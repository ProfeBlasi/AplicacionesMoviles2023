import { get } from "./callApi.js"

const URL = 'https://www.themealdb.com/api/json/v1/1/'

const aleatorio = URL + "random.php"

export const getRandom = () => {
    return get(aleatorio);
}