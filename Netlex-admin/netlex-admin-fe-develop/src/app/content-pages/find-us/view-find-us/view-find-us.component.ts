import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service'; 
// import { environment } from 'src/environments/environment'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-find-us',
  templateUrl: './view-find-us.component.html',
  styleUrls: ['./view-find-us.component.scss']
})
export class ViewFindUsComponent implements OnInit {

  private sub: any;
  id: '';
  office_Name = '';
  office_Address = '';
  office_Email = '';
  office_Contact = '';
  showloading = false;
  alert: { success: boolean, text: string } = { success: true, text: '' };
  findUs: { office_Name: string; office_Address: string; office_Email: string; office_Contact: string; }[];


  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService:AuthService
  ) {
  }

  ngOnInit(): void {

  // this. checkRoleAction();
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.getFindUsData();
    });
  }


  getFindUsData(): any {

    this.api.getFindUs(this.id)

      .subscribe(
        res => {
          this.office_Name = res.office_Name;
          this.office_Address = res.office_Address;
          this.office_Email = res.office_Email;
          this.office_Contact = res.office_Contact;

        },
        err => { }
      );
  }
  
  update(): any {
    this.showloading = true;
    this.findUs = [{
      'office_Name': this.office_Name,
      'office_Address': this.office_Address,
      'office_Email': this.office_Email,
      'office_Contact': this.office_Contact,
    }]
    this.api.updateFindUs(this.findUs, this.id)
      .subscribe(
        res => {

          this.snackBar.open('Hitta Oss uppdaterades lyckades', 'ok');
          this.showloading = false;
          // console.log('this.office_Name',this.office_Name)
          // console.log('this.answer',this.answer)
          // console.log('this.findUs',this.findUs)
          this.redirect(5);
        },
        err => {
          this.showloading = false;
        }
      );

  }
  // redirect(): void {
  //   this.router.navigate(['/content-pages']);
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
