import { Room } from "./room";
import { User } from "./user";

export class Message {

    constructor(
        public id = 0,
        public message: string = "",
        public created: Date = new Date(),
        
        public updated: Date = new Date(),
        public room: Room = null,
        public user: User = null
        ) {
    }
}
