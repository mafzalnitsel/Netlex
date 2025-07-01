import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service'; 
// import { environment } from 'src/environments/environment'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-colors',
  templateUrl: './view-colors.component.html',
  styleUrls: ['./view-colors.component.scss']
})
export class ViewColorsComponent implements OnInit {

  private sub: any;
  id: '';
  // question = '';
  // answer = '';
  colorName = '';
  colorCode = '';
  showloading = false;
  alert: { success: boolean, text: string } = { success: true, text: '' };
  colors: { colorName: String; colorCode: String; }[];


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
      this.getColorsData();
    });
  }


  getColorsData(): any {

    this.api.getColors(this.id)

      .subscribe(
        res => {
          // console.log("ress---------",res)
          // this.colorName = res.color.colorName;
          // this.colorCode = res.color.colorCode;
          this.colorName = res.colorName;
          this.colorCode = res.colorCode;
        },
        err => { }
      );
  }
  
  update(): any {
    this.showloading = true;
    this.colors = [{
      'colorName': this.colorName,
      'colorCode': this.colorCode,
    }]
    this.api.updateColors(this.colors, this.id)
      .subscribe(
        res => {
          this.snackBar.open('fråga och svar uppdaterades lyckades', 'ok');
          this.showloading = false;
          // console.log('this.colorName',this.colorName)
          // console.log('this.colorCode',this.colorCode)
          // console.log('this.colors',this.colors)
          this.redirect(3);
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
