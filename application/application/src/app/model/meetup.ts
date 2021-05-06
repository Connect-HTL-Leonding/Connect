import { User } from "./user";
import { Position } from "./position";

export class Meeting {
    constructor(
        public time : Date = null,
        public position: Position = null,
        public creator: User = null
    ) { }
}
