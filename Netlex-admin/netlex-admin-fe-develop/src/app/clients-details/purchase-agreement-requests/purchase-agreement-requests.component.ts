import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Userfe } from '../../models/userfe.model';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { menuactionspagename } from '../../models/pagesnameandId';

@Component({
    selector: 'app-purchase-agreement-requests',
    templateUrl: './purchase-agreement-requests.component.html',
    styleUrls: ['./purchase-agreement-requests.component.scss']
})
export class PurchaseAgreementRequestsComponent implements OnInit {

    @Input('data') items: Userfe[] = [];
    asyncItems: Observable<Userfe[]>;
    p = 1;
    perPage = 10;
    total: number;
    showloading: boolean;
    docs: any;
    agreementRequestStatus: { status: string; }[];
    selectedUserType: string = 'Active';
    userTypeOptions: any = ['Active'];
    // userfeAccStatus: any;
    allUsersList: any;
    isRequestList = true;
    isViewOneRequest = false;
    viewRequestId : string;
    constructor(public authService: AuthService,
        private router: Router,
        private api: ApiService,
        private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        // this.checkRoleAction();
        this.getPage(1);
        // this.getAllUsersByStatus();
    }

    // viewBusiness($event): any {
    //     this.router.navigate(['/businesstype/view/' + $event._id]);
    // }

    getPage(page: number): any {
        this.showloading = true;
        const status = "new";
        this.asyncItems = this.api.getAgreeementRequestsList(page, this.perPage, status)
            .pipe(
                tap(res => {
                    // console.log("res of user fe in agreementRequests", res)
                    this.total = res['total'];
                    this.p = page;
                    this.perPage = 10;
                    this.showloading = false;
                }),
                map(({ docs: docs1 }) => docs1)
            );
    }
    viewDetails(id: string) {
        this.isRequestList = false;
        this.isViewOneRequest = true;
        this.viewRequestId = id;
    }
    closeViewDetailsHandler(value:any) {
        // console.log('value',value);
        if(value==='true'){
            this.isRequestList = true;
            this.isViewOneRequest = false;
        }
    }
    aprroveRequest(id: string) {
        console.log('id', id);
        // console.log("id", id)
        this.showloading = true;
        this.agreementRequestStatus = [{
            status: 'active'
        }]
        if (confirm('Är du säker på att du vill aktivera användarkontot??')) {
            this.api.updateAgreeementRequests(this.agreementRequestStatus, id).subscribe(
                (res: any) => {
                    // console.log("res", res);
                    this.snackBar.open('Begäran godkänns', 'ok');
                    this.getPage(1);
                    this.showloading = false;
                },
                (err: any) => {
                    console.log("err while updating agreement request", err);
                    this.snackBar.open('Kan inte uppdatera. Försök igen senare', 'ok');
                    this.showloading = false;
                }
            );
        }
    }

    // checkRoleAction(): any {
    //     let RoleID = this.authService.getroleID();
    //     let roleactionID = menuactionspagename.businesstype.MAId;
    //     this.api.GetRoleActionByRoleIdRoleActionId(RoleID, roleactionID)
    //         .subscribe(
    //             res => {
    //                 if (res.menuactionslist.length == 0) {
    //                     this.authService.logout();
    //                 }

    //             },
    //             err => { }
    //         );
    // }

    deleteBusinessType(BusinessTypeId: string): any {
        if (confirm('Är du säker på att du vill ta bort den här Affärs Typ?')) {
            this.showloading = true;
            this.api.deleteBusinessType(BusinessTypeId).subscribe(
                res => {
                    this.showloading = false;
                    this.snackBar.open('Affärs Typ har tagits bort', 'ok');
                    window.scroll(0, 0);
                    // this.getPage(1);
                }, err => {
                    console.log("err", err)
                    this.showloading = false;
                    this.snackBar.open(
                        'Det går inte att ta bort Affärs Typ. Var god försök igen', 'ok');
                    window.scroll(0, 0);
                }
            );
        }
    }
}
