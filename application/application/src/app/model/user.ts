export class User {
    constructor(
        public id = 0,
        public userName: string = "",
        public email: string = "",
        public firstname: string = "",
        public lastname: string = "",
        public custom : CustomUser = new CustomUser()
    ) { }
}

export class CustomUser {
    constructor(
        public id = 0,
        public profilePicture = "",
        public description: string = "",
        public gender: string = "",
        public birthday: Date = new Date(),
        public position = {}
        ) {

    }
}