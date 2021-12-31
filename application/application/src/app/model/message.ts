import { Room } from "./room";
import { CustomUser, User } from "./user";

export class Message {
    constructor(
        public id = "",
        public message: string = "",
        public created = new Date(),
        public image = "",
        public updated: Date = new Date(),
        public room: Room = null,
        public user: CustomUser = null
    ) { }
}
