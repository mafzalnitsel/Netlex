
export class Lawyer{
    constructor(
      public firstName: string,
      public lastName: string,
      public email: string,
      public phoneNumber: string,
      public status: string,
      public totalMeetingAssigned: number,
      public _id: string,
      public lawyerPic: string,
      public showLawyerToUser: Boolean,
      public training: String,
      public languages: String,
      // public languages: [],
      public multipleLanguages: Boolean,
      public activityArea: any,
      public title: String,
      public languagesOptions:any,      
    ){}
  }
