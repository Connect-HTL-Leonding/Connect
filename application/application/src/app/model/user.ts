export class User {
    constructor(
        public id = 0,
        public userName: string = "",
        public profilePicture = "",
        public description: string = "",
        public gender: string = "",
        public email: string = "",
        public birthday: Date = new Date(),
        public firstname: string = "",
        public lastname: string = ""

    ) { }
}
