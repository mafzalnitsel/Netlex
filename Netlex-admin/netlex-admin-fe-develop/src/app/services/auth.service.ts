import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';
import { schedulerModel } from "../models/scheduler.model";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(user: Login): any {
    return this.http.post<any>(`${this.getAccessPoint()}auth/login`, user);
  }
  isUserLoggedIn(): any {
    return !!localStorage.getItem('token');
  }
  registerToken(token: string): any {
    localStorage.setItem('token', token);
  }
  getAccessPoint(): string {
    return environment.serviceURL;
  }
  getAccessPointWebURL(): string {
    return environment.webURL;
  }
  getAccessMailPoint(): string {
    return environment.mailserviceURL;
  }
  getRole(): string {
    return localStorage.getItem('roles');
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
  generateNewPassword(email: string): any {
    return this.http.post<any>(`${this.getAccessPoint()}auth/forgotPassword`, { email });
  }

  setData(data: User): any {
    localStorage.setItem('firstName', data.firstName);
    localStorage.setItem('lastName', data.lastName);
    localStorage.setItem('userName', data.userName);
    localStorage.setItem('email', data.email);
    localStorage.setItem('roles', data.roles);
    localStorage.setItem('_id', data._id);
    localStorage.setItem('Lawyerid', data.lawyerid);
    localStorage.setItem('roleID', data.roleID);
    //  localStorage.setItem('userType',data.userType);
  }
  getId(): string {
    return localStorage.getItem('_id');
  }
  getroleID(): string {
    return localStorage.getItem('roleID');
  }

  isWorker(): boolean {
    return localStorage.getItem('roles') === 'worker';
  }
  getEmail(): string {
    return localStorage.getItem('email');
  }
  getFirst(): string {
    return localStorage.getItem('firstName');
  }
  getLast(): string {
    return localStorage.getItem('lastName');
  }
  schedule(data: schedulerModel): any {
    return this.http.post<any>(`${this.getAccessPoint()}auth/schedule`, { data });
  }
  getUser(): string {
    return localStorage.getItem('userName');
  }
  logout(): any {
    // this.http.get<any>(`${this.getAccessPoint()}auth/logout`);
    // this.http.post<any>(`${this.getAccessPoint()}auth/logout`, 'nothing'); 
    this.http.get<any>(`${this.getAccessPoint()}auth/logout`).subscribe(
      res => {
        console.log('res', res)
      },
      err => { }
    )
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('_id');
    localStorage.removeItem('roles');
    localStorage.removeItem('Lawyerid');
    localStorage.removeItem('roleID');
    this.router.navigate(['/login']);

    //---------New--------
    // let userType = localStorage.getItem("userType")
    // // console.log("userType",userType)
    // if(userType==="Admin"){
    // this.router.navigate(['/login']);
    // }
    // if(userType==="Advokat"){
    // this.router.navigate(['/signin']);
    // }
    //---------New--------

  }
  // logoutAPI(): any {
  //   return this.http.get<any>(`${this.getAccessPoint()}auth/logout`);
  // }
  isAdmin(): any {
    return localStorage.getItem('roles');//=== 'Administration';
  }
  isRole(): any {

    return localStorage.getItem('roles');

  }
  isLawyer(): any {

    return localStorage.getItem('Lawyerid');

  }
}
