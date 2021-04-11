import { Position } from "./position";

export class User {
    constructor(
        public id = "",
        public userName: string = "",
        public email: string = "",
        public firstname: string = "",
        public lastname: string = "",
        public custom : CustomUser = new CustomUser()
    ) { }
}

export class CustomUser {
    constructor(
        public id = "",
        public profilePicture = "",
        public finishedTutorial: boolean = false,
        public description: string = "",
        public gender: string = "",
        public birthday: Date = new Date(),
        public position = new Position()
        ) {

    }
}