export class User{
  constructor(
    public _id: string,
    public firstName: string,
    public lastName: string,
    public userName: string,
    public email: string,
    public ssn: string,
    public accountType: string,
    public organizationNumber: string,
  ){}
}
