import { getRandom } from "../service/dataApi.js"
import { cardContainer } from "../utils/card.js"

export const maquetarHome = () => {
    cardContainer(1, getRandom());
    cardContainer(2, getRandom());
    cardContainer(3, getRandom());
    cardContainer(4, getRandom());
};