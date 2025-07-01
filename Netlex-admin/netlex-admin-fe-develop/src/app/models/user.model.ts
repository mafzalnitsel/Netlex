export class User{
  constructor(
    public firstName: string,
    public lastName: string,
    public userName: string,
    public email: string,
    public roles: string,
    public _id: string,
    public status: string,
    public lawyerid: string,
    // public lawyerName: string,
    public profilePic: string,
    public roleID: string,
    public itsAdminUser: Boolean,
    public itsLawyerUser: Boolean,
  ){}
}
