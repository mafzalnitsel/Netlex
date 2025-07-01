import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentModel } from 'src/app/models/payment.model';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { menuactionspagename } from 'src/app/models/pagesnameandId';


@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

    @Input('data') items: PaymentModel[] = [];
    @Input() paymentAgreementType = '';
    asyncItems: Observable<PaymentModel[]>;
    p = 1;
    perPage = 10;
    total: number;
    currentPage: 1;
    loading: boolean;
    docs: any;
    status: '';
    selectedPaymentMethod: string;
    paymentMethodValues = ['all', 'klarna', 'stripe', 'swish'];
    statusValue = ['all', 'success', 'failed'];
    // dates = {fromDate:'' , toDate:''}
    showLoader: boolean = false;
    fromDate = '';
    toDate = '';
    constructor(public authService: AuthService,
        private router: Router,
        private api: ApiService,
        private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        // console.log("this.paymentAgreementType",this.paymentAgreementType)
        this.checkRoleAction();
        this.getPage(1);
    }

    viewPayment($event): any {
        this.router.navigate(['/payment/view/' + $event._id]);
    }
    generatePaymentPdf(event) {
        this.showLoader = true;
        // console.log("event", event);

        this.api.generatePaymentPdf(event)

            .subscribe(
                res => {
                    // console.log('generatePaymentPdf....res', res)
                    const byteArray = new Uint8Array(res.data);
                    const blob = new Blob([byteArray], { type: 'application/pdf' });
                    const objectUrl = URL.createObjectURL(blob);
                    // window.open(objectUrl,"_self");
                    window.open(objectUrl, '_blank');
                    // this.router.navigate(['/sales' ]);
                    const file = document.createElement('a');
                    file.href = objectUrl;

                    file.download = event.userName + ' - ' + event._id;
                      this.showLoader = false;
                    file.click();
                },
                err => { }
            );
    }
    getPage(page: number): any {
        console.log("this.paymentAgreementType",this.paymentAgreementType)
        this.loading = true;
        this.asyncItems = this.api.getPaymentList(page, this.perPage, this.selectedPaymentMethod, this.status,this.fromDate,this.toDate,this.paymentAgreementType)
            .pipe(
                tap(res => {
                    // console.log("Payments list",res)
                    this.total = res['total'];
                    this.p = page;
                    this.perPage = 10;
                    this.loading = false;
                }),
                map(({ docs: docs1 }) => docs1)
            );
    }
    changeData(): any {
        let page = 1;
        this.loading = true;
        this.asyncItems = this.api.getPaymentList(page, this.perPage, this.selectedPaymentMethod, this.status,this.fromDate,this.toDate,this.paymentAgreementType)
            .pipe(
                tap(res => {
                    // console.log("Payments list",res)
                    this.total = 10;
                    this.p = page;
                    this.perPage = 10;
                    this.loading = false;
                }),
                map(({ docs: docs1 }) => docs1)
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
