import { Skin } from "./skin";

export class MySkin {
    constructor(
        public id = 0,
        public skin = new Skin(),
        public radius = 1,
        public age = 20,
        public niveau = 1
    ) {

    }
}
