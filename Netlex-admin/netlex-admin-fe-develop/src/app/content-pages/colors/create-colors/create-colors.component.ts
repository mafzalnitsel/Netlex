import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionAndAnswer } from 'src/app/models/question-and-answer';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { Colors } from 'src/app/models/colors';


@Component({
  selector: 'app-create-colors',
  templateUrl: './create-colors.component.html',
  styleUrls: ['./create-colors.component.scss']
})
export class CreateColorsComponent implements OnInit {


  // colorName = '';
  // colorCode = '';
  alert: { success: boolean, text: string } = { success: true, text: '' };
  colors: Colors = { colorName: '', colorCode: '', _id: '' };

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
    // this.checkRoleAction();
  }

  // checkColor(event){
  //   console.log("colorCode",this.colorCode)
  //   console.log("colorName",this.colorName)
  // }

  onsubmit(): void {
    // console.log('colors', this.colors)
    if (!this.colors.colorName || !this.colors.colorCode) {
      this.snackBar.open('Fyll i alla fält', 'ok');
      return;
    }
    this.api.createColors(this.colors)
      .subscribe(
        res => {
          this.snackBar.open('Skapades framgångsrikt', 'ok');

          this.redirect(1);
          this.clearFields();
        },
        err => {
          console.log(err)
          this.snackBar.open('Skapad misslyckad', 'ok');

        }
      );
  }
  clearFields(): void {
    this.colors.colorName = '';
    this.colors.colorCode = '';
  }
  // redirect(): void{
  //     this.router.navigate(['/content-pages']);
  // }
  redirect(TabID): any {
    this.router.navigate(['/content-pages'], {
      queryParams: { tabID: TabID }
    });
  }
  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.content_pages.MAId;
    this.api.GetRoleActionByRoleIdRoleActionId(RoleID, roleactionID)
      .subscribe(
        res => {
          if (res.menuactionslist.length == 0) {
            this.authService.logout();
          }
        },
        err => { }
      );
  }
}
