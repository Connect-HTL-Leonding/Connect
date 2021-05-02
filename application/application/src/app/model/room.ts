export class Room {

    unread: boolean;

    constructor(
        public id = 0,
        public type: string = "",
        public created: Date = new Date(),
        public updated: Date = new Date()
        //public time: IonDatetime
    ) { }
}
