import { getRandom } from "../service/dataApi.js"
import { cardContainer } from "../utils/card.js"

export const maquetarDegustacion = () => {
    cardContainer(1, getRandom(),true);
};