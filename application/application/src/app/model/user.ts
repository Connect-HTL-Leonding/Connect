export class User {
    constructor(
        public id = 0,
        public username: string,
        public profilePicture: string,
        public latestMessage: string,
        public desc: string
    ) {

    }
}
