

import { Component, OnInit } from '@angular/core';
// import { role } from 'src/app/models/role.model';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
// import { RoleModule } from '../role.module';
import { Role } from 'src/app/models/role';


@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {



  alert: {success: boolean, text: string} = {success: true, text: ''};
   role: Role = {name: '',  _id: '',  useForLawyer: ''};
  //  status = "Aktiv";
  //  totalMeetingAssigned = 0;
  //  statusValue = ['inAktiv' , 'Aktiv'];


  
    userForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
    });


    constructor(
      private authService: AuthService,
      private api: ApiService,
      private snackBar: MatSnackBar,
      private router: Router
  ) { }

  ngOnInit(): void {
  }
  onsubmit(): void{
    if (!this.role.name){
        this.snackBar.open('Fyll i alla fält', 'ok');
        return;
    }
    this.api.createRole(this.role)
        .subscribe(
            res => {
                this.snackBar.open('Skapades framgångsrikt', 'ok');
                
                this.redirect();
                this.clearFields();
            },
            err => {
              console.log(err)
                this.snackBar.open('Skapad misslyckad', 'ok');
                
            }
        );
  }
  clearFields(): void{
    this.role.name = '';
  }
  redirect(): void{
      this.router.navigate(['/role']);
  }

}
