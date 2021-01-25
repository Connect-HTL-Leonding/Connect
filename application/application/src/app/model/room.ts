
export class Room {

    unread:boolean;

    constructor(
        public id = 0,
        public type: string,
        public created: Date,
        public updated: Date
        //public time: IonDatetime
    ) {}
}
