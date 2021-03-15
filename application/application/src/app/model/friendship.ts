import { Skin } from "./skin";
import { CustomUser, User } from "./user";

export class Friendship {
    constructor(
        public id = 0,
        public user1 : CustomUser = new CustomUser(),
        public user2 : CustomUser = new CustomUser(),
        public skin : Skin = new Skin(),
        public created : Date = new Date(),
        public status = ""
        
    ) {

    }
}
