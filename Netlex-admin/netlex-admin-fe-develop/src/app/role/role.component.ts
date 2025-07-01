

import { Role } from '../models/role';
import { Component, OnInit, Input} from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  @Input('data') persons: Role[] = [];
  asyncPersons: Observable<Role[]>;
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
    this.getPage(1);

    
  }
  viewRole($event: { _id: string; }): any {
    this.router.navigate(['/role/view/' + $event._id]);
}
  getPage(page: number): any {
    this.loading = true;
    this.asyncPersons = this.api.getRoleList(page, this.perPage)
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

deleteRole(_id: string): any {
  if (confirm('Är du säker på att du vill ta bort den här rollen?')) {
      this.loading = true;
      this.api.deleteRole(_id).subscribe(
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



}
