import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
// import {environment} from '../../../environments/environment.prod';
// import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { UpdateModalComponent } from "./update-modal/update-modal.component"

@Component({
  selector: 'app-stripe-configuration',
  templateUrl: './stripe-configuration.component.html',
  styleUrls: ['./stripe-configuration.component.scss']
})
export class StripeConfigurationComponent implements OnInit {
    private sub: any;
    id: '';


    stripe_secret_key = '';
    // klarna_password = '';
    // klarna_confirm_url = '';
    // user_id = '';



    total = '';
    showloading = false;
    alert: { success: boolean, text: string } = { success: true, text: '' };

    paymentsConfiguration: {
        stripe_secret_key: String,
        // klarna_password: String,
        // klarna_confirm_url: String,
        // user_id: String,
    }[];
    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private snackBar: MatSnackBar,
        private authService: AuthService,
        private dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.checkRoleAction();
        this.getKlarnaConfiguration('stripeConfiguration');

    }

    getKlarnaConfiguration(name): any {

        this.api.getKlarnaConfiguration(name).subscribe(paymentsConfigurationData => {

            let response = paymentsConfigurationData.doc[0];
            // console.log('response', response)
            this.id = response._id;
            this.stripe_secret_key = response.stripe_secret_key;
            // this.klarna_password = response.klarna_password;
            // this.klarna_confirm_url = response.klarna_confirm_url;
            // this.user_id = response.user_id;

            // console.log(' this.stripe_secret_key',  this.stripe_secret_key)
        });
    }

    update(): any {
        this.showloading = true;
        this.paymentsConfiguration = [{
            'stripe_secret_key': this.stripe_secret_key,
            // 'klarna_password': this.klarna_password,
            // 'klarna_confirm_url': this.klarna_confirm_url,
            // 'user_id': this.user_id,
        }]
        this.api.updateStripeConfiguration(this.paymentsConfiguration, this.id)
            .subscribe(
                res => {
                    console.log("res.message",res.message)
                    if(res.message==="PaymentsConfigurationUpdatedSuccessfully"){
                        this.snackBar.open('Stripe konfigurationen uppdaterats', 'ok');
                    }
                    else{
                        this.snackBar.open('Stripe konfigurationen kan inte uppdateras. Försök igen senare', 'ok');
                    }
                    this.showloading = false;
                    // console.log('this.id',this.id)
                    // console.log('this.clientsDetails',this.clientsDetails)
                },
                err => {
                    this.snackBar.open('Stripe konfigurationen kan inte uppdateras. Försök igen senare', 'ok');
                    this.showloading = false;
                }
            );
    }

    openDialog() {
        const dialogRef = this.dialog.open(UpdateModalComponent, {
            height: '430px',
            width: '430px',
            panelClass: 'mat-dialog-container-primary',
            disableClose: true,
            data: {
                // eventID : this.eventId,
                dateExpired: 'YES'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.updateCheck();
        });
    }
    updateCheck() {
        const check = localStorage.getItem('updateStripeConfiguration');
        localStorage.setItem('updateStripeConfiguration', null);
        if (check == 'Yes') {
            // console.log("update clicked")
            this.update();
        }
    }

  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.configurations.MAId;
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
