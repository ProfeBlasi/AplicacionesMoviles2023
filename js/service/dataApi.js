import { get } from "./callApi.js"

const URL = 'https://www.themealdb.com/api/json/v1/1/'

const TRANSLATE_GOOGLE = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q='

const aleatorio = URL + "random.php"

export const getRandom = () => {
    return get(aleatorio);
}

export const traducir = async (texto) => {
    const oraciones = texto.split('. ');
    const traducciones = [];
    
    for (const oracion of oraciones) {
      const respuesta = await fetch(TRANSLATE_GOOGLE + encodeURIComponent(oracion));
      const json = await respuesta.json();
      traducciones.push(json[0][0][0]);
    }
    
    return traducciones.join('. ');
  };