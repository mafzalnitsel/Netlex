import { Lawyer } from '../models/lawyer.model';
import { Component, OnInit, Input} from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { menuactionspagename } from '../models/pagesnameandId';


@Component({
  selector: 'app-lawyer',
  templateUrl: './lawyer.component.html',
  styleUrls: ['./lawyer.component.scss']
})
export class LawyerComponent implements OnInit {

  @Input('data') persons: Lawyer[] = [];
  asyncPersons: Observable<Lawyer[]>;
  p = 1;
  perPage = 10;
  total: number;
  loading: boolean;
  docs: any;


  constructor(public authService: AuthService,
              private router: Router,
              private api: ApiService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.checkRoleAction();
    this.getPage(1);

    
  }
  viewUser($event: { _id: string; }): any {
    this.router.navigate(['/lawyer/view/' + $event._id]);
}
  getPage(page: number): any {
    this.loading = true;
    this.asyncPersons = this.api.getLawyersList(page, this.perPage)
        .pipe(
            tap(res => {
                this.total = 10;
                this.p = page;
                this.perPage = 10;
                this.loading = false;
            }),
            map(({docs: docs1}) => docs1)
        );
}

deleteLawyer(userId: string): any {
  if (confirm('Är du säker på att du vill ta bort den här användaren?')) {
      this.loading = true;
      this.api.deleteLawyer(userId).subscribe(
          res => {
              this.loading = false;
              this.snackBar.open('Användaren har tagits bort', 'ok');
              window.scroll(0, 0);
              this.getPage(1);
          }, err => {
              this.loading = false;
              this.snackBar.open(
                  'Det går inte att ta bort användaren. Var god försök igen', 'ok');
              window.scroll(0, 0);
          }
      );
  }
}

checkRoleAction():any
{
    let RoleID =this.authService.getroleID();
    let roleactionID=menuactionspagename.lawyer.MAId;
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
