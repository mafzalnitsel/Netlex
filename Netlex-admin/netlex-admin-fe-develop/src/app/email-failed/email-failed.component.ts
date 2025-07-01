import { Component, OnInit, Input,Pipe, PipeTransform } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmailLogModel } from 'src/app/models/emailLog.model';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { menuactionspagename } from '../models/pagesnameandId';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { EmailAgainModalComponent } from "./email-again-modal/email-again-modal.component"
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// @Pipe({ name: "safeHtml" })
// export class SafeHtmlPipe implements PipeTransform {
//   constructor(private sanitizer: DomSanitizer) {}

//   transform(value) {
//     return this.sanitizer.bypassSecurityTrustHtml(value);
//   }
// }
@Component({
    selector: 'app-email-failed',
    templateUrl: './email-failed.component.html',
    styleUrls: ['./email-failed.component.scss']
})
export class EmailFailedComponent implements OnInit {

    @Input('data') items: EmailLogModel[] = [];
    asyncItems: Observable<EmailLogModel[]>;
    p = 1;
    perPage = 10;
    total: number;
    docs: any;

    showLoader = false;

    constructor(public authService: AuthService,
        private router: Router,
        private api: ApiService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,) {
    }

    ngOnInit(): void {
        this.checkRoleAction();
        this.getPage(1);
    }

    getPage(page: number): any {
        // console.log("run")
        this.showLoader = true;
        this.asyncItems = this.api.getEmailLogList(page, this.perPage)
            .pipe(
                tap(res => {
                    // console.log("res", res)

                    this.total = res['total'];
                    this.p = page;
                    this.perPage = 10;
                    this.showLoader = false;
                }),
                map(({ docs: docs1 }) => docs1)
            );
    }
    resendEmail(event): any {
        this.showLoader = true;
        this.snackBar.open('E-postsändning pågår.Snälla du vänta', 'ok');
        let id = event._id
        this.api.resendEmail(id)
            .subscribe(
                res => {
                    console.log('resendEmail', res)
                    if (res === "EmailSent") {
                        // window.scroll(0, 0);
                        this.snackBar.open('E-post har skickats framgångsrikt', 'ok');
                        this.getPage(1);
                    }
                    else if (res === "EmailNotSend") {
                        this.snackBar.open('E-post har inte skickats, försök igen', 'ok');
                    }
                    this.showLoader = false;

                },
                err => {
                    console.log("err", err)
                    this.showLoader = false;
                }
            );
        // this.router.navigate(['/view-email-failed/' + $event._id]);
    }
    openDialog(event) {
        const dialogRef = this.dialog.open(EmailAgainModalComponent, {
            height: '320px',
            width: '400px',
            panelClass: 'mat-dialog-container-primary',
            disableClose: true,
            data: {
                // eventID : this.eventId,
                dateExpired: 'YES'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.emailResendCheck(event);
        });
    }
    emailResendCheck(event) {
        const check = localStorage.getItem('emailResend');
        localStorage.setItem('emailResend', null);
        if (check == 'Yes') {
            // console.log("update clicked")
            this.resendEmail(event);
            // this.resend = "Yes"
        }
    }
    viewEmailDetails($event): any {
        this.router.navigate(['/view-email-failed/' + $event._id]);
    }
    editEmail($event): any {
        this.router.navigate(['/edit-email-failed/' + $event._id]);
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
