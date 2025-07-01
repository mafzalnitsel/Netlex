import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Login} from '../models/login.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showForgotPassword = false;
  CreateNewAccount: true;
  userName: string;
  password: string;
  // userType: string = 'Admin'; // New(Only Admin User can login)
  itsAdminUser = true;
  itsLawyerUser = false;
  forgotUserName: string;
  forgotEmail: string;
  alert: {success: boolean, text: string} = {success: true, text: ''};
  showLoader = false;

  constructor(private authService: AuthService, private router: Router,
              private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // localStorage.setItem("userType","Admin");
    // console.log("localStorage.setItem in login",localStorage.getItem("userType"))
  }

  // //With Checkbox
  // loginAs(value){
  //   if(value){
  //     // console.log("true",value)
  //     this.itsAdminUser = false;
  //     this.itsLawyerUser = true;
  //   }
  //   else{
  //     // console.log("false",value)
  //     this.itsAdminUser = true;
  //     this.itsLawyerUser = false;
  //   }
  // }

  loginAs(value){
    if(this.itsAdminUser){
      // console.log("true",value)
      this.itsAdminUser = false;
      this.itsLawyerUser = true;
    }
    else{
      // console.log("false",value)
      this.itsAdminUser = true;
      this.itsLawyerUser = false;
    }
  }

  submit(): void {
    this.showLoader = true;
    if (!this.userName || !this.password){
        this.snackBar.open('Ange användarnamn och lösenord', 'OK');
        this.showLoader = false;
        return;
    }
    const user = new Login(this.userName, this.password, this.itsAdminUser,this.itsLawyerUser);
    this.authService.login(user)
      .subscribe(
        res => {
          this.showLoader = false;
          this.authService.setData(res.data);
          this.authService.registerToken(res.token);
          this.router.navigate(['home']);
        },
        err => {
          this.showLoader = false;
          this.snackBar.open('Ange rätt användarnamn och lösenord', 'OK');
        }
      );
  }

  submitForgotPassword(): void {
    this.showLoader = true;
    if (!this.forgotEmail){
        this.snackBar.open('Ange din e-postadress', 'OK');
        this.showLoader = false;
        return;
    }
    this.authService.generateNewPassword(this.forgotEmail)
        .subscribe(
            res => {
              this.showForgotPassword = false;
              this.snackBar.open('Nytt lösenord skickas till din e-postadress', 'OK');
              this.showLoader = false;
              return;
            },
            err => {
              this.showLoader = false;
              this.snackBar.open('E-post ännu inte registrerad', 'OK');
            }
        );
  }

  displayForgotPassword(): void {
    this.showForgotPassword = true;
  }

  displayCreateAccount(): void {
      this.CreateNewAccount = true;
  }

}
