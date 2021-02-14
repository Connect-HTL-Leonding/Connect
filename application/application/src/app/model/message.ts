import { Room } from "./room";
import { User } from "./user";

export class Message {

    constructor(
        public id = 0,
        public created: Date = new Date(),
        public message: string = "",
        public updated: Date = new Date(),
        public room: Room = new Room(),
        public user: User = new User()
        ) {
    }
}
