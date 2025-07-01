import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
// import {environment} from '../../../environments/environment.prod';
import { MatSnackBar } from '@angular/material/snack-bar';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';
@Component({
    selector: 'app-view-sales',
    templateUrl: './view-sales.component.html',
    styleUrls: ['./view-sales.component.scss']
})
export class ViewSalesComponent implements OnInit {
    private sub: any;
    id = '';
    userName = '';
    amount = '';
    salesDate = '';
    salesTime = '';
    paymentMethod = '';
    status = '';
    transaction_Id = '';

    showloading = false;
    alert: { success: boolean, text: string } = { success: true, text: '' };

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private snackBar: MatSnackBar, private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.checkRoleAction();
        this.sub = this.route.params.subscribe(params => {
            this.id = params.id;
            this.getSalesData();
        });
    }

    //Get Sales by Id
    getSalesData(): any {

        this.api.getSalesById(this.id)

            .subscribe(
                res => {
                    // console.log('getPaymentss....res', res)
                    if (res.userId) {
                        this.getUserfeById(res.userId);
                    }
                    this.amount = res.salesAmount;
                    this.salesDate = res.salesAt.split('T')[0];
                    this.paymentMethod = res.paymentMethod;
                    this.status = res.status;
                    this.transaction_Id = res.transaction_Id;

                                        
                    //Convert Time into AM/PM
                    let time='';
                    time = res.salesAt.split('T')[1].split('.')[0];
                    let hours = Number(time.match(/^(\d+)/)[1]);
                    let minutes = Number(time.match(/:(\d+)/)[1]);
                    let AM_PM = hours >= 12 ? "PM" : "AM";
                    this.salesTime = hours + ":" + minutes + " " + AM_PM;
                    //////////////////////////
                },
                err => { }
            );
    }
    getUserfeById(userId): any {
        this.api.getUserfeById(userId)
            .subscribe(
                res => {
                    // console.log('getUserfe....res', res)
                    this.userName = res.userName
                },
                err => { }
            );
    }
    checkRoleAction(): any {
        let RoleID = this.authService.getroleID();
        let roleactionID = menuactionspagename.sales.MAId;
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
