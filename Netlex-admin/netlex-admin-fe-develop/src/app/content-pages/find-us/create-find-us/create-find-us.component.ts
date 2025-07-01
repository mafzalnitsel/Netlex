import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FindUs } from 'src/app/models/find-us';
import { menuactionspagename } from 'src/app/models/pagesnameandId';


@Component({
  selector: 'app-create-find-us',
  templateUrl: './create-find-us.component.html',
  styleUrls: ['./create-find-us.component.scss']
})
export class CreateFindUsComponent implements OnInit {



  alert: { success: boolean, text: string } = { success: true, text: '' };
  findUs: FindUs = { office_Name: '', office_Address: '', office_Email: '', office_Contact: '', _id: '' };

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
this.checkRoleAction();
  }
  onsubmit(): void {
    // console.log('findUs',this.findUs)
    if (!this.findUs.office_Name || !this.findUs.office_Address|| !this.findUs.office_Email|| !this.findUs.office_Contact) {
      this.snackBar.open('Fyll i alla fält', 'ok');
      return;
    }
    this.api.createFindUs(this.findUs)
      .subscribe(
        res => {
          this.snackBar.open('Skapades framgångsrikt', 'ok');

          this.redirect(5);
          this.clearFields();
        },
        err => {
          console.log(err)
          this.snackBar.open('Skapad misslyckad', 'ok');

        }
      );
  }
  clearFields(): void {
    this.findUs.office_Name = '';
    this.findUs.office_Address = '';
    this.findUs.office_Email = '';
    this.findUs.office_Contact = '';
  }
  // redirect(): void{
  //     this.router.navigate(['/content-pages']);
  // }
  redirect(TabID): any {
    this.router.navigate(['/content-pages'], {
      queryParams: { tabID: TabID }
    });
  }
  checkRoleAction():any
  {
      let RoleID =this.authService.getroleID();
      let roleactionID=menuactionspagename.content_pages.MAId;
      this.api.GetRoleActionByRoleIdRoleActionId(RoleID,roleactionID)
      .subscribe(
        res => { 
          if(res.menuactionslist.length==0){
              this.authService.logout();
          }
          
        },
        err => { }
      );
  }
}
