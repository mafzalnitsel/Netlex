
import { RoleAction } from '../models/RoleAction.model';
import { Role } from '../models/role';

import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { menuactionspagename } from '../models/pagesnameandId';

@Component({
  selector: 'app-role-action',
  templateUrl: './role-action.component.html',
  styleUrls: ['./role-action.component.scss']
})
export class RoleActionComponent implements OnInit {
  @Input('data') persons: Role[] = [];
  asyncPersons: Observable<Role[]>;
  p = 1;
  // currentPage = 1;
  perPage = 10;
  total: number;
  loading: boolean;
  docs: any;
  deleteRoleId: any;

  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    private router: Router,
    private api: ApiService,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
this.checkRoleAction();
    this.getPage(1);

  }

  viewRole() {

  }
  //RoleAction List
  //   getPage(page: number): any {
  //     this.loading = true;
  //     this.asyncPersons = this.api.getRoleActionList(page, this.perPage)
  //         .pipe(
  //             tap(res => {
  //                 //this.total = 10;
  //                 this.total = res['total'];

  //             //  this.currentPage = page;

  //                 this.p = page;
  //                 this.perPage = 10;
  //                 this.loading = false;
  //             }),
  //             map(({docs: docs1}) => docs1)
  //         );
  // }

  viewRoleAction($event: { _id: string; }): any {
    this.router.navigate(['/roleaction/view/' + $event._id]);
  }
  //RoleList
  getPage(page: number): any {
    this.loading = true;
    this.asyncPersons = this.api.getRoleList(page, this.perPage)
      .pipe(
        tap(res => {
          this.total = res['total'];
          this.p = page;
          this.perPage = 10;
          this.loading = false;
        }),
        map(({ docs: docs1 }) => docs1)
      );
  }
  deleteRoleAction(_id: string): any {
    if (confirm('Är du säker på att du vill ta bort den här rollen?')) {
      this.loading = true;
      this.api.deleteRoleAction(_id).subscribe(
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
    this.deleteRole(_id)
  }
  deleteRole(_id: string): any {
    // if (confirm('Är du säker på att du vill ta bort den här rollen?')) {
    this.loading = true;
    this.api.deleteRole(_id).subscribe(
      res => {
        this.loading = false;
      }, err => {
        this.loading = false;
      }
    );
    // }
  }
  checkRoleAction():any
    {
        let RoleID =this.authService.getroleID();
        let roleactionID=menuactionspagename.roleaction.MAId;
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


