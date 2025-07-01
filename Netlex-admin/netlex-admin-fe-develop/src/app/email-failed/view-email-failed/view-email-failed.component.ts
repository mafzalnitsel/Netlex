import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
// import {environment} from '../../../environments/environment.prod';
import { MatSnackBar } from '@angular/material/snack-bar';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';
@Component({
    selector: 'app-view-email-failed',
    templateUrl: './view-email-failed.component.html',
    styleUrls: ['./view-email-failed.component.scss']
})
export class ViewEmailFailedComponent implements OnInit {
    private sub: any;
    id = '';
    userName = '';
    emailAddress = '';
    date = '';
    reason = '';
    reasonDetails = '';
    subject = '';
    content = '';
    paymentDate = '';
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
            this.viewEmailLogDetails();
        });
    }
    //Get EmailLog
    viewEmailLogDetails(): any {

        this.api.viewEmailLog(this.id)

            .subscribe(
                res => {
                    // console.log('viewEmailLogResponse', res)
                    this.userName = res.userDetails.userName;
                    this.emailAddress = res.emailAddress;
                    this.subject = res.subject;
                    this.content = res.content;
                    // this.content = res.content.split('<br>')[0];
                    this.date = res.createdAt.split('T')[0];
                    this.reason = res.error.code;
                    this.reasonDetails = res.error.message;
                },
                err => { }
            );
    }
    checkRoleAction(): any {
          let RoleID =this.authService.getroleID();
          let roleactionID=menuactionspagename.emailFailed.MAId;
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
