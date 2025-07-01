import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Userfe } from '../models/userfe.model';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { menuactionspagename } from '../models/pagesnameandId';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    @Input('data') persons: User[] = [];
    asyncPersons: Observable<User[]>;
    @Input('data') personss: Userfe[] = [];
    asyncPersonss: Observable<Userfe[]>;
    p = 1;
    perPage = 10;
    total: number;
    p1 = 1;
    perPage1 = 10;
    total1: number;
    loading: boolean;
    docs: any;
    docs2: any;
    selectedUserType: string = 'All';
    userTypeOptions: any = ['All'];


    constructor(public authService: AuthService,
        private router: Router,
        private api: ApiService,
        private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.checkRoleAction();
        this.getRole();
        this.getPage(1);
        this.getUserfe(1);
    }

    viewUser($event): any {
        this.router.navigate(['/user/view/' + $event._id]);
    }
    getRole(): void {
        this.api.getactiverole().subscribe(res => {
            //   this.role = res.doc;
            let roles = res.doc;
            // console.log('roles', roles);
            roles.forEach((ele) => {
                // console.log('ele', ele)
                this.userTypeOptions.push(ele.name)
            })
        },
            err => {
                console.log('err', err);
            }
        );
    }
    getPage(page: number): any {

        this.loading = true;
        this.asyncPersons = this.api.getUsersList(page, this.perPage, this.selectedUserType)
            .pipe(
                tap(res => {
                    console.log('res', res)
                    this.total = res['total'];
                    // this.total = 10;
                    this.p = page;
                    this.perPage = 10;
                    this.loading = false;
                }),
                map(({ docs: docs1 }) => docs1)
            );

    }

    getUserfe(page: number): any {
        this.loading = true;
        this.asyncPersonss = this.api.getUserfeList(page, this.perPage)
            .pipe(
                tap(res => {
                    // console.log('res',res)
                    this.total1 = res['total'];
                    this.p1 = page;
                    this.perPage1 = 10;
                    this.loading = false;
                }),
                map(({ docs: docs1 }) => docs1)
            );
    }


    deleteUser(userId: string): any {
        if (confirm('Är du säker på att du vill ta bort den här användaren?')) {
            this.loading = true;
            this.api.deleteUser(userId).subscribe(
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

    changeUserType() {
        this.getPage(1);
    }
    checkRoleAction(): any {
        let RoleID = this.authService.getroleID();
        let roleactionID = menuactionspagename.user.MAId;
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
