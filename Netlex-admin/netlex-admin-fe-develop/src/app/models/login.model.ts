export class Login{
  constructor(
    private userName: string,
    private password: string,
    // private userType: string,
    private itsAdminUser : boolean,
    private itsLawyerUser : boolean,
  ){}
}
