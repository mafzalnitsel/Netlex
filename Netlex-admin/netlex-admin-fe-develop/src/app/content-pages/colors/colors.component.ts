

import { Colors } from 'src/app/models/colors';
import { Component, OnInit, Input , ViewChild} from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { menuactionspagename } from 'src/app/models/pagesnameandId';



@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {
  asyncPersons: Observable<Colors[]>;
  p = 1;
  perPage = 10;
  total: number;
  loading: boolean;
  docs: any;

  showloading = false;
  id = '';
  constructor(public authService: AuthService,
    private router: Router,
    private api: ApiService,
    private snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.checkRoleAction();
    this.getPage(1);


  }
  viewColorHandler($event: { _id: string; }): any {
    this.router.navigate(['/colors/view/' + $event._id]);
  }

  getPage(page: number): any {
    this.loading = true;
    this.asyncPersons = this.api.getColorsList(page, this.perPage)
      .pipe(
        tap(res => {
          // console.log("res",res)
          this.total = res['total'];
          this.p = page;
          this.perPage = 10;
          this.loading = false;
        }),
        map(({ docs: docs1 }) => docs1)
      );
  }

  deleteColorsHandler(_id: string): any {
    if (confirm('Är du säker på att du vill ta bort den här rollen?')) {
      this.loading = true;
      this.api.deleteColors(_id).subscribe(
        res => {
          this.loading = false;
          this.snackBar.open('Den här rollen har tagits bort', 'ok');
          window.scroll(0, 0);
          this.getPage(1);
        }, err => {
          this.loading = false;
          this.snackBar.open(
            'Det gick inte att ta bort rollen. Var god försök igen', 'ok');
          window.scroll(0, 0);
        }
      );
    }
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
