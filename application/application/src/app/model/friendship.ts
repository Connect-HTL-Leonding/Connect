import { Skin } from "./skin";
import { User } from "./user";

export class Friendship {
    constructor(
        public id = 0,
        public user1 : User = new User(),
        public user2 : User = new User(),
        public skin : Skin = new Skin(),
        public created : Date = new Date(),
        public status = ""
        
    ) {

    }
}
