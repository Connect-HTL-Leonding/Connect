import { User } from "./user";
import { Position } from "./position";

export class Meetup {
    constructor(
        public time : Date = null,
        public position: Position = null
    ) { }
}
