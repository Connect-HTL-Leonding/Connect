import { User } from "./user";
import { Position } from "./position";

export class Meeting {
    constructor(
        public id = 0,
        public time : Date = null,
        public position: Position = null,
        public creator: User = null
    ) { }
}

export class MeetupUser {
    constructor(
        public id = 0,
        public user_id = null
    ) {}
}
