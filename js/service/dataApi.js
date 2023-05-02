import { get } from "./callApi.js"

const API_URL = 'https://www.themealdb.com/api/json/v1/1/'

const TRANSLATE_GOOGLE = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q='

const TRADUCIR_GOOGLE = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q='
const ALEATORIO = API_URL + "random.php"

const OPTIONS_URL = API_URL + 'list.php?CHAR=lista';

const SELECCION_URL = API_URL + 'filter.php?CHAR=lista';

const GET_BY_ID = API_URL + 'lookup.php?i='

export const getRandom = () => {
  return get(ALEATORIO);
}

export const translate = async (texto) => {
  const oraciones = texto.split('. ');
  const traducciones = [];

  for (const oracion of oraciones) {
    const respuesta = await fetch(TRANSLATE_GOOGLE + encodeURIComponent(oracion));
    const json = await respuesta.json();
    traducciones.push(json[0][0][0]);
  }
  return traducciones.join('. ');
};

export const traducir = async (texto) => {
  const oraciones = texto.split('. ');
  const traducciones = [];

  for (const oracion of oraciones) {
    const respuesta = await fetch(TRADUCIR_GOOGLE + encodeURIComponent(oracion));
    const json = await respuesta.json();
    traducciones.push(json[0][0][0]);
  }
  return traducciones.join('. ');
};

export const getCategories = (caracter) => {
  let newCATEGORIES_URL = OPTIONS_URL.replace("CHAR", caracter);
  return get(newCATEGORIES_URL);;
};

export const getByOption = (caracter, option) => {
  let newCATEGORIES_URL = SELECCION_URL
  .replace("CHAR", caracter)
  .replace("lista", option);
  return get(newCATEGORIES_URL);
}

export const getElementById = (id) => {
  return get(GET_BY_ID + id);
}