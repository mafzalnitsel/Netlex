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
  selector: 'app-email-configuration',
  templateUrl: './email-configuration.component.html',
  styleUrls: ['./email-configuration.component.scss']
})
export class EmailConfigurationComponent implements OnInit {
    private sub: any;
    id: '';


    oauth_client_id = '';
    oauth_client_secret = '';
    oauth_authority = '';
    user_id = '';



    total = '';
    showloading = false;
    alert: { success: boolean, text: string } = { success: true, text: '' };

    emailConfiguration: {
        oauth_client_id: String,
        oauth_client_secret: String,
        oauth_authority: String,
        user_id: String,
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
        this.getEmailConfiguration('emailConfiguration');

    }

    getEmailConfiguration(name): any {

        this.api.getEmailConfiguration(name).subscribe(emailConfigurationData => {

            let response = emailConfigurationData.doc[0];
            // console.log('response', response)
            this.id = response._id;
            this.oauth_client_id = response.oauth_client_id;
            this.oauth_client_secret = response.oauth_client_secret;
            this.oauth_authority = response.oauth_authority;
            this.user_id = response.user_id;

            // console.log(' this.oauth_client_id',  this.oauth_client_id)
        });
    }

    update(): any {
        this.showloading = true;
        this.emailConfiguration = [{
            'oauth_client_id': this.oauth_client_id,
            'oauth_client_secret': this.oauth_client_secret,
            'oauth_authority': this.oauth_authority,
            'user_id': this.user_id,
        }]
        this.api.updateEmailConfiguration(this.emailConfiguration, this.id)
            .subscribe(
                res => {
                    console.log("res",res.message)
                    if(res.message="EmailConfigurationUpdatedSuccessfully"){
                        this.snackBar.open('E-postkonfigurationen har uppdaterats', 'ok');
                    }
                    else{
                        this.snackBar.open('E-postkonfigurationen kan inte uppdateras. Försök igen senare', 'ok');
                    }
                    this.showloading = false;
                    // console.log('this.id',this.id)
                    // console.log('this.clientsDetails',this.clientsDetails)
                },
                err => {
                    this.snackBar.open('E-postkonfigurationen kan inte uppdateras. Försök igen senare', 'ok');
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
        const check = localStorage.getItem('updateEmailConfiguration');
        localStorage.setItem('updateEmailConfiguration', null);
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
