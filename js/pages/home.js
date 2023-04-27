import { getRandom } from "../service/dataApi.js"
import { cardContainer } from "../utils/card.js"

export const maquetarHome = () => {
    cardContainer(1, getRandom(),false);
    cardContainer(2, getRandom(),false);
    cardContainer(3, getRandom(),false);
    cardContainer(4, getRandom(),false);
};