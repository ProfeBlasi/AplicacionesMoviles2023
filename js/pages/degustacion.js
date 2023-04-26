import { getRandom } from "../service/dataApi.js"
import { cardContainer } from "../utils/card.js"

export const maquetarDegustacion = () => {
    console.log("Estoy maquetando");
    cardContainer(1, getRandom(),true);
    cardContainer(2, getRandom(),true);
    cardContainer(3, getRandom(),true);
    cardContainer(4, getRandom(),true);
};