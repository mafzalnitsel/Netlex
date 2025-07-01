import { Lawyer } from './lawyer.model';
export class Schedulerapp {
    constructor(
        public heading: string,
        public dateOf: string,
        public time: string,
        public description: string,
        public language: string,
        public attachment: string,
        public status: string,
        public lawyerId: string,
        public userName: string,
        public userEmail:string,
        public userSSN: string,
        public userPhoneNo: string,
        public lawyer: String,
    ){}
}
