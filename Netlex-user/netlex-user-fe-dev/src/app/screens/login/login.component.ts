import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../netlex-common/dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from '../../services/util.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    // isMobileBankIdOnDevice = 'current';
    isMobileBankIdOnDevice = 'another';
    ssnDone = false;
    forQRCode: any;
    numOfQRCode = 0;
    limitNumOfQRCode = 0;
    ssn: string;
    showLoader = false;
    deviceChanged = 0;
    orderRefArray = [];
    gettingQRLoader = true;
    qrScannedLoading = false;
    isCompany = false;
    device = '';
    bankIdUrl = '';
    innerWidth: any;
    documentId: string;
    masterId: string;
    source = false;
    scheduleid: string;

    constructor(private authService: AuthService,
        private router: Router,
        public dialog: MatDialog,
        private translate: TranslateService,
        private utilService: UtilService,
        public snackBar: MatSnackBar,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.device = localStorage.getItem('userDevice');
        console.log('this.device', this.device)
        this.utilService.show();
        let source = '';
        this.route.queryParams.subscribe((params: Params) => {
            // debugger;
            if (params?.documscheduleent_id != undefined) {
                // this.documentId = params?.documscheduleent_id;
                this.documentId = params?.documscheduleent_id;

            }
            else {
                this.documentId = params?.document_id;

            }
            console.log('this.documentId', this.documentId);
            this.masterId = params?.master_id;

            source = params?.source;
            this.scheduleid = params?.scheduleid;
        });
        if (source === 'SaveForLater') {
            this.source = true;
        }
        this.innerWidth = window.innerWidth;
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('userName');
        localStorage.removeItem('email');
        localStorage.removeItem('accountType');
        localStorage.removeItem('organizationNumber');
        localStorage.removeItem('id');

    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
    }
    submit(): void {
        if (this.gettingQRLoader || this.isMobileBankIdOnDevice === 'current' /*|| (this.isMobileBankIdOnDevice === 'current' && this.deviceChanged > 0)*/) {
            this.showLoader = true;
        }
        if (this.ssn.length <= 0) {
            this.snackBar.open(this.translate.instant('CREATE.ENTER_SSN_NUMBER'), 'ok');
            this.showLoader = false;
            return;
        }
        // --------------Below Code Used For Login With hardcode SSN ----------------------
        // if(this.ssn == '999999999999'){
        //     localStorage.setItem('firstName', 'SADMAN');
        //     localStorage.setItem('lastName', 'YIGIT');
        //     localStorage.setItem('userName', 'SADMAN YIGIT');
        //     localStorage.setItem('email', 'shadman@mirlex.se');
        //     localStorage.setItem('accountType', 'private');
        //     localStorage.setItem('organizationNumber', '');
        //     localStorage.setItem('id', '63e3b302b05e4423545e0815');
        //     localStorage.setItem('userPortalToken', 'a9938ab8-9b65-4af1-903f-4ac4ad1f34c5');
        //     localStorage.setItem('role', 'user');
        //     this.router.navigate(['/preview-Agreement'], { queryParams: { master_id: this.masterId, document_id: this.documentId } }).then();
           
        // }
                    // --------------END Below Code Used For Login With hardcode SSN ----------------------
        // =======||||||=========|||||======= Authorization =======||||||=========|||||=======
        this.authService.initiateBankIdAuth(this.ssn, this.numOfQRCode, this.isMobileBankIdOnDevice).subscribe(response => {
            // this.authService.initiateBankIdAuth(this.ssn, 'another').subscribe(response => {
            console.log('response', response)
            if (response !== 'Not Yet Registered' && response !== 'UserAccNotApproved') {
                if (this.device == 'Windows') {
                    // --------------Below Code Used For Login With hardcode SSN ----------------------
                    // localStorage.setItem('firstName', 'SADMAN');
                    // localStorage.setItem('lastName', 'YIGIT');
                    // localStorage.setItem('userName', 'SADMAN YIGIT');
                    // localStorage.setItem('email', 'shadman@mirlex.se');
                    // localStorage.setItem('accountType', 'private');
                    // localStorage.setItem('organizationNumber', '');
                    // localStorage.setItem('id', '63e3b302b05e4423545e0815');
                    // localStorage.setItem('userPortalToken', 'a9938ab8-9b65-4af1-903f-4ac4ad1f34c5');
                    // localStorage.setItem('role', 'user');
                    // this.router.navigate(['/preview-Agreement'], { queryParams: { master_id: this.masterId, document_id: this.documentId } }).then();
                   
                    console.log("device", this.device);
                    this.bankIdUrl = `bankid:///?autostarttoken=${response.data.autoStartToken}&redirect=null`;
                    console.log("bankIdUrl", this.bankIdUrl);
                } else if (this.device == 'iPhone;') {
                    console.log("device", this.device);
                    this.bankIdUrl = `https://app.bankid.com/?autostarttoken=${response.data.autoStartToken}&redirect=https://netlex.se/`;
                    console.log("bankIdUrl", this.bankIdUrl);

                } else {
                    console.log("device", this.device);
                    this.bankIdUrl = `https://app.bankid.com/?autostarttoken=${response.data.autoStartToken}&redirect=https://netlex.se/`;
                    console.log("bankIdUrl", this.bankIdUrl);
                }
                let interval: any;
                let userDataFromBankID: any;
                this.orderRefArray.push({ orderRef: response.data.orderRef })
                if (response.forQRCode) {
                    this.gettingQRLoader = false;
                    // /\/\/\/\---- QR Time will always btw 0 to 5 ---/\/\/\/\
                    if (this.numOfQRCode < 5) {
                        this.numOfQRCode = this.numOfQRCode + 1;
                    }
                    else {
                        // alert("Failed to Scan QR Retry")
                        this.limitNumOfQRCode = this.limitNumOfQRCode + (this.numOfQRCode - 1);
                        this.numOfQRCode = 0;
                    }
                    // /\/\/\/\/\----- If QR Limmit Exceeded -------/\/\/\/\/\/\
                    if (this.limitNumOfQRCode > 25) {
                        clearInterval(interval);
                        this.ssnDone = false;
                        this.openDialog(this.translate.instant('WARN.WARN_LOGIN_FAILED'), '', 'OK');
                        return;
                    }
                    this.ssnDone = true;
                    this.showLoader = false;
                    this.forQRCode = response.forQRCode;
                }
                //////////////////////--------- If Another Device ------//////////////////////
                if (this.isMobileBankIdOnDevice !== 'current') {
                    interval = setInterval(() => {
                        this.orderRefArray.forEach((ele) => {
                            console.log("ele", ele);
                            // =======||||||=========|||||======= Collect data form Scanned QR =======||||||=========|||||=======
                            this.authService.collectBankIdAuth(ele.orderRef).subscribe(res => {
                                this.showLoader = false;
                                console.log('res', res)
                                if (res.status === "inProgress") {

                                }
                                else if (res.status === "userSign") {
                                    this.qrScannedLoading = true;
                                    // alert("Sign In")
                                }
                                else if (res.status === "completed") {
                                    clearInterval(interval);
                                    this.qrScannedLoading = true;
                                    userDataFromBankID = res.resp;
                                    console.log("userDataFromBankID", userDataFromBankID)
                                    // this.router.navigate(['/']).then();
                                    this.processOfValidate(userDataFromBankID);

                                    // alert("completed")
                                }

                            });
                        })

                    }, 1500);
                    // /\/\/\--- Recalling this function (after 10 Sec) ----/\/\/\
                    setTimeout(() => {
                        if (!this.qrScannedLoading) {
                            clearInterval(interval);
                            this.submit();
                        }
                        // }, 2000);
                    }, 10000);


                }
                //////////////////////--------- If Current Device ------//////////////////////
                // else {
                //     clearInterval(interval);

                //     console.log("this.deviceChanged", this.deviceChanged)
                //     this.deviceChanged = this.deviceChanged + 1;
                //     // if (this.deviceChanged >= 2) {
                //         console.log("Device is current", response)
                //         console.log("this.orderRefArray B", this.orderRefArray)
                //         let autoStartToken = response.data.autoStartToken;
                //         // let bankIDForMobileURL =`https://app.bankid.com/?autostarttoken=${autoStartToken}&redirect=null`;
                //         // let bankIDForWindowURL=`bankid:///?autostarttoken=${autoStartToken}&redirect=null`;
                //         // console.log("bankIDForWindowURL", bankIDForWindowURL)
                //         if (this.innerWidth >= 960) {
                //             window.open(`bankid:///?autostarttoken=${response.data.autoStartToken}&redirect=null`, "_self")
                //             // window.open(bankIDForWindowURL, "_self")
                //         } else {
                //             window.open(`https://app.bankid.com/?autostarttoken=${response.data.autoStartToken}&redirect=https://netlex.se/`, "_self")
                //             // window.open(bankIDForMobileURL, "_self")
                //         }
                //         // let lastOrderRef = this.orderRefArray[this.orderRefArray.length-1]
                //         // console.log("lastOrderRef", lastOrderRef)

                //         interval = setInterval(() => {
                //             this.orderRefArray.forEach((ele) => {
                //                 // console.log("ele", ele);
                //                 // =======||||||=========|||||======= Collect data form BankID App =======||||||=========|||||=======
                //                 this.authService.collectBankIdAuth(ele.orderRef).subscribe(res => {
                //                     console.log('res', res)
                //                     if (res.status === "inProgress") {

                //                     }
                //                     // else if (res.status === "userSign") {
                //                     //     // this.qrScannedLoading = true;
                //                     //     // alert("Sign In")
                //                     // }
                //                     else if (res.status === "completed") {
                //                         clearInterval(interval);
                //                         // this.qrScannedLoading = true;
                //                         userDataFromBankID = res.resp;
                //                         console.log("userDataFromBankID", userDataFromBankID)
                //                         // this.router.navigate(['/']).then();
                //                         this.processOfValidate(userDataFromBankID);

                //                         // alert("completed")
                //                     }

                //                 });
                //             })

                //         }, 1000);
                //     // } else this.submit();

                //     // window.open('bankid:///?redirect=null')

                // }
                else {
                    // debugger
                    if (this.device != 'Windows') {
                        // debugger

                        this.showLoader = true;
                        clearInterval(interval);
                        interval = setInterval(() => {
                            this.orderRefArray.forEach((ele) => {
                                // console.log("ele", ele);
                                // =======||||||======= Collect data form BankID App =======||||||=======
                                this.authService.collectBankIdAuth(ele.orderRef).subscribe(res => {
                                    console.log('res', res)
                                    if (res.status === "inProgress") { }
                                    else if (res.status === "completed") {
                                        clearInterval(interval);
                                        this.showLoader = false;
                                        // this.qrScannedLoading = true;
                                        userDataFromBankID = res.resp;
                                        console.log("userDataFromBankID", userDataFromBankID)
                                        this.processOfValidate(userDataFromBankID);
                                    }
                                });
                            })
                        }, 1000);
                    }
                    else {
                        // debugger
                        clearInterval(interval);
                        // console.log("this.deviceChanged", this.deviceChanged)
                        window.open(`bankid:///?autostarttoken=${response.data.autoStartToken}&redirect=null`, "_self")
                        interval = setInterval(() => {
                            this.orderRefArray.forEach((ele) => {
                                // console.log("ele", ele);
                                // =======||||||======= Collect data form BankID App =======||||||=======
                                this.authService.collectBankIdAuth(ele.orderRef).subscribe(res => {
                                    console.log('res', res)
                                    if (res.status === "inProgress") { }
                                    else if (res.status === "completed") {
                                        clearInterval(interval);
                                        // this.qrScannedLoading = true;
                                        userDataFromBankID = res.resp;
                                        console.log("userDataFromBankID", userDataFromBankID)
                                        // this.router.navigate(['/']).then();
                                        this.processOfValidate(userDataFromBankID);
                                    }
                                });
                            })
                        }, 1000);
                    }
                }
            }
            else if (response == 'Not Yet Registered') {
                this.openDialog(this.translate.instant('WARN.USER_NOT_REGISTER'), '', 'OK');
                this.showLoader = false;
            }
            else if (response == 'UserAccNotApproved') {
                console.log("UserAccNotApproved", '& response', response);
                this.openDialog(this.translate.instant('WARN.WARN_ACCOUNT_NOT_ACTIVATED'),
                    'Vänligen ha tålamod ditt konto kommer att aktiveras inom 24 timmar. Tack', 'OK');
                this.showLoader = false;
            }
            else {
                this.openDialog(this.translate.instant('WARN.WARN_LOGIN_FAILED'), '', 'OK');
                this.showLoader = false;
            }
            // if (response!=='Not Yet Registered' && this.isMobileBankIdOnDevice === 'current') {
            //    window.open('bankid:///?redirect=null');
            // }
            // if (response === 'initiated') {
            // this.processOfValidate();
            // }

        });
    }

    processOfValidate(userDataFromBankID): void {
        this.authService.bankIdAuthLogin(this.ssn, userDataFromBankID).subscribe(response => {
            console.log("response", response)
            localStorage.setItem('userInfo', JSON.stringify(response['completionData'][0]))
            // response.status="complete"
            if (response === 'inProgress') {
                setTimeout(() => {
                    this.processOfValidate(userDataFromBankID);
                }, 5000);
            } else if (response.status === 'complete') {
                this.showLoader = false;
                localStorage.setItem('firstName', response.user[0].firstName);
                localStorage.setItem('lastName', response.user[0].lastName);
                localStorage.setItem('userName', response.user[0].userName);
                localStorage.setItem('email', response.user[0].email);
                localStorage.setItem('accountType', response.user[0].accountType);
                localStorage.setItem('organizationNumber', response.user[0].organizationNumber);
                localStorage.setItem('id', response.user[0]._id);
                localStorage.setItem('userPortalToken', response.token);
                localStorage.setItem('role', response.user[0]?.role);

                // localStorage.setItem('firstName', "Akmal");
                // localStorage.setItem('lastName', "Mahar");
                // localStorage.setItem('userName', "Akmal");
                // localStorage.setItem('email',"rakellind@dayrep.com");
                // localStorage.setItem('accountType', "organization");
                // localStorage.setItem('organizationNumber',"4807123211");
                // localStorage.setItem('id',"6217366652167208dc8b5f20");
                // localStorage.setItem('userPortalToken',"akmalasdasd");
                // localStorage.setItem('role', "admin");

                //     localStorage.setItem('firstName', "talha");
                //     localStorage.setItem('lastName', "saeed");
                //     localStorage.setItem('userName', "abcd12");
                //     localStorage.setItem('email',"talha.saeed@aiotpl.com");
                //     localStorage.setItem('accountType', "organization");
                //     localStorage.setItem('organizationNumber',"4807123211");
                //    // localStorage.setItem('id',"6229fa691d2e675b40284e0c");
                //     localStorage.setItem('id',"622f1282851fa75d3e788057");
                //     localStorage.setItem('userPortalToken',"akmalasdasd");
                //     localStorage.setItem('role', "user");

                // if (response.user[0].accountType === 'organization') {
                //     localStorage.setItem('role', response.user[0].role);
                // }
                // debugger;
                if (this.masterId) {
                    if (this.source) {
                        this.router.navigate(['/preview-Agreement'], { queryParams: { master_id: this.masterId, document_id: this.documentId, saveForLater: true } }).then();
                    } else {
                        this.router.navigate(['/preview-Agreement'], { queryParams: { master_id: this.masterId, document_id: this.documentId } }).then();
                    }
                } else {
                    if (this.scheduleid) {


                        //this.router.navigate(['/preview-schedule'],{ queryParams: {  master_id: this.scheduleid } }).then();
                        this.router.navigate(['/preview-schedule/' + this.scheduleid]).then();

                    } else if (this.documentId) {
                        this.router.navigate(['/userInput', this.documentId]).then();
                    } else {
                        this.router.navigate(['/']).then();
                    }


                }

            } else {
                this.openDialog(this.translate.instant('WARN.WARN_LOGIN_FAILED'), '', 'OK');
                this.showLoader = false;
            }

        });
    }
    currentDeviceHandler() {
        // debugger
        this.isMobileBankIdOnDevice = 'current';
    }
    openDialog(header, content, action): void {
        console.log("header", header)
        let width;
        let height;
        this.innerWidth >= 425 ? width = 400 : width = 349;
        this.innerWidth >= 425 ? height = 400 : height = 410;
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '400px',
            height: '400px',
            panelClass: 'mat-dialog-container-primary',
            data: { header: header, content: content, action: action, component: 'login' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (header === 'Användaren är inte registrerad') {
                if (this.documentId) {
                    this.router.navigate(['/register'], { queryParams: { ssn: this.ssn, document_id: this.documentId } }).then();
                } else {
                    this.router.navigate(['/register'], { queryParams: { ssn: this.ssn } }).then();
                }
            }
        });
    }

}
