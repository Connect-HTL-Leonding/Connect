import { IonDatetime } from "@ionic/angular";

export class Chat {

    unread:boolean;

    constructor(
        public id = 0,
        public username: string,
        public profilePicture: string,
        public latestMessage: string,
        public unreadMessages: number,
        //public time: IonDatetime
    ) {
        if(this.unreadMessages > 0) {
            this.unread = true;
        }
        else {
            this.unread = false;
        }
    }
}
