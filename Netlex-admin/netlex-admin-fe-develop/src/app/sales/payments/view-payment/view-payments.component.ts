import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
// import {environment} from '../../../environments/environment.prod';
import {MatSnackBar} from '@angular/material/snack-bar';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';
@Component({
    selector: 'app-view-business-type',
    templateUrl: './view-payment.component.html',
    styleUrls: ['./view-payment.component.scss']
  })
  export class ViewPaymentComponent implements OnInit {
    private sub: any;
    id='';
    userName='';
    amount='';
    paymentDate='';
    paymentTime='';
    paymentMethod='';
    status='';
    transaction_Id='';

    showloading = false;
    alert: { success: boolean, text: string } = {success: true, text: ''};

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private snackBar: MatSnackBar,private authService:AuthService
    ) {
    }

    ngOnInit(): void {
        this.checkRoleAction();
        this.sub = this.route.params.subscribe(params => {
            this.id = params.id;
            this.getPaymentData();
        });
    }

//Get BusinessType
getPaymentData(): any {

    this.api.getPayment(this.id)

        .subscribe(
            res => {
                // console.log('getPaymentss....res',res)
                this.userName=res.userName;
                this.amount=res.amount;
                this.paymentDate=res.paymentDate.split('T')[0];
                this.paymentMethod=res.paymentMethod;
                this.status=res.status;
                this.transaction_Id=res.transaction_Id;

                                                        
                    //Convert Time into AM/PM
                    let time='';
                    time = res.paymentDate.split('T')[1].split('.')[0];
                    let hours = Number(time.match(/^(\d+)/)[1]);
                    let minutes = Number(time.match(/:(\d+)/)[1]);
                    let AM_PM = hours >= 12 ? "PM" : "AM";
                    this.paymentTime = hours + ":" + minutes + " " + AM_PM;
                    //////////////////////////
            },
            err => {                }
        );
}
checkRoleAction():any
  {
      let RoleID =this.authService.getroleID();
      let roleactionID=menuactionspagename.sales.MAId;
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
