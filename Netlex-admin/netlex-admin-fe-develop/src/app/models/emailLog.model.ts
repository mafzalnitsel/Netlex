export class EmailLogModel {

    constructor(
        public userDetails: {},

        public subject: string,

        public contentType: string,

        public content: string,

        public emailAddress: string,

        public error: {},

        public errorFullArray: {}
    ) { }




}