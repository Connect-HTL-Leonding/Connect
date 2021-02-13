export class User {
    /*
    constructor(
        public id = 0,
        public username: string = "",
        public profilePicture: string = "",
        public desc: string = "",
        public instagram : string = "",
        public facebook: string = "",
        public twitter: string = "",
        public linkedIn : string = "",
        public gender: string = "",
        public questions = {
            q1: "",
            q2: "",
            q3: ""
        },
        public password: string  ="",
        public email: string = ""
    ) {

    }
    */

   constructor(
    public id = 0,
    public username: string = "",
    public profilePicture,
    public description: string = "",
    public gender: string = "",
    public email: string = "",
    public birthday : Date = new Date(),
    public fullname : string = ""
) {

}


}
