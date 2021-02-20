import { Room } from "./room";
import { User } from "./user";

export class Image {

    constructor(
        public userId : string = "",
        public base64url : string = ""
        ) {
    }
}
