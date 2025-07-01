import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { ApiService } from '../../services/api.service';
import { DialogComponent } from '../../netlex-common/dialog/dialog.component';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilService } from '../../services/util.service';
import { clientsDetailsservice } from 'src/app/services/clientsDetails.service';



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    // isMobileBankIdOnDevice = 'current';
    isMobileBankIdOnDevice = 'another';
    documentId: string;
    ssnDone = false;
    forQRCode: any;
    numOfQRCode = 0;
    limitNumOfQRCode = 0;
    ssn: string;
    email: string;
    organizationNumber: string;
    accountType: string;
    isCompany = false;
    accountTypeSelector = true;
    showLoader = false;
    deviceChanged = 0;
    orderRefArray = [];
    gettingQRLoader = true;
    qrScannedLoading = false;
    device = '';
    bankIdUrl = '';
    innerWidth: any;
    user = new User('', '', '', '', '', '', '', '');
    //Progress Bar Loading
    firstTask = { auth: true, auth2: true };
    progressBarLoading = false;
    constructor(public apiService: ApiService,
        public authService: AuthService,
        public router: Router,
        private route: ActivatedRoute,
        public translate: TranslateService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        public utilService: UtilService,
        private ClientsDetailsservice: clientsDetailsservice
    ) {
    }

    ngOnInit(): void {
        this.utilService.show();
        this.innerWidth = window.innerWidth;
        this.documentId = localStorage.getItem("fromDocumentId")
        console.log(' this.documentId', this.documentId);
        this.route.queryParams.subscribe(params => {
            // this.choosenLawyerId = params.lawyerId;
            // console.log("params", params)
            this.user.ssn = params?.ssn;
            // this.documentId =params?.document_id
            // this.getLawyerById();
        });
        this.device = localStorage.getItem('userDevice');
        console.log('this.device', this.device)
    }

    progressBarStatusHandler(value: any) {
        console.log("progressBarStatus in Register", value)
        this.progressBarLoading = false;
    }

    getclientsDetailstoSsn(toSsn): void {
        console.log("oragaagag")
        this.ClientsDetailsservice.getclientsDetailstoSsn(toSsn).subscribe(clientsDetails => {
            // console.log("clientsDetails", clientsDetails)
            if (clientsDetails.clientsDetails.length !== 0) {
                // console.log('toSsn true')
                const dialogRef = this.dialog.open(DialogComponent, {
                    height: '400px',
                    width: '400px',
                    panelClass: 'mat-dialog-container-primary',
                    data: {
                        // header: this.translate.instant('SCHEDULER.METTING_SCHEDULED_TITLE'),
                        // content: this.translate.instant('SCHEDULER.METTING_SCHEDULED_DESC'),
                        header: "du kan inte registrera dig",
                        content: "du kan inte registrera dig just nu",
                        component: 'register'
                    }
                });
                // dialogRef.afterClosed().subscribe(result => {
                //     this.router.navigate(['/register']);
                // });
                return;

            }
            else {
                // console.log('toSsn false')
                if (this.user.ssn.length <= 0 || this.user.email.length <= 0) {
                    this.snackBar.open(this.translate.instant('CREATE.ENTER_SSN_NUMBER'), 'ok');
                    return;
                }

                if (this.gettingQRLoader || this.isMobileBankIdOnDevice === 'current' /*|| (this.isMobileBankIdOnDevice === 'current' && this.deviceChanged > 0)*/) {
                    this.showLoader = true;
                }

                // =======||||||=========|||||======= Authorization =======||||||=========|||||=======
                this.authService.initiateBankIdAuthForSignUp(this.user.ssn, this.numOfQRCode, this.isMobileBankIdOnDevice).subscribe(response => {
                    // console.log("response",response)
                    // if (response.msg === 'err') {
                    //     this.showLoader = false;
                    //     this.openDialog('Err', '', 'ok');
                    // } else
                    if (response === 'user already in') {
                        this.showLoader = false;
                        this.openDialog(this.translate.instant('WARN.USER_ALREADY_IN'), '', 'ok');
                    } else {
                        if (this.device == 'Windows') {
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
                                    // console.log("ele", ele);
                                    // =======||||||=========|||||======= Collect data form Scanned QR =======||||||=========|||||=======
                                    this.authService.collectBankIdAuth(ele.orderRef).subscribe(res => {
                                        this.showLoader = false;
                                        // console.log('res', res)
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

                                            this.createUser(userDataFromBankID)
                                            // this.processOfValidate(userDataFromBankID);

                                            // alert("completed")
                                        }

                                    });
                                })

                            }, 1000);
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
                        //     console.log('response.data.autoStartToken',response.data.autoStartToken)

                        //     // console.log("this.deviceChanged", this.deviceChanged)
                        //     this.deviceChanged = this.deviceChanged + 1;
                        //     // if (this.deviceChanged >= 2) {
                        //         // console.log("Device is current", response)
                        //         // console.log("this.orderRefArray B", this.orderRefArray)
                        //         let autoStartToken = response.data.autoStartToken;
                        //         // console.log("bankIDForWindowURL", bankIDForWindowURL)
                        //         // if (this.innerWidth >= 960) {
                        //         //     window.open(`bankid:///?autostarttoken=${response.data.autoStartToken}&redirect=null`, "_self")
                        //         //     // window.open(bankIDForWindowURL, "_self")
                        //         // } else {
                        //         //     window.open(`https://app.bankid.com/?autostarttoken=${response.data.autoStartToken}&redirect=https://netlex.se/`, "_self")
                        //         //     // window.open(`bankid:///?autostarttoken=${response.data.autoStartToken}&redirect=https://netlex.se/`, "_self")
                        //         //     // window.open(bankIDForMobileURL, "_self")
                        //         // }
                        //         if (this.device == 'Windows') {
                        //             console.log("device", this.device);
                        //             window.open(`bankid:///?autostarttoken=${response.data.autoStartToken}&redirect=null`, "_self")
                        //             // window.open(bankIDForWindowURL, "_self")
                        //         } else if (this.device == 'iPhone;') {
                        //             console.log("device", this.device);
                        //             window.open(`bankid://app.bankid.com/?autostarttoken=${response.data.autoStartToken}&redirect=https://netlex.se/`, "_self")
                        //             // window.open(`https://app.bankid.com/?autostarttoken=${response.data.autoStartToken}&redirect=https://netlex.se/`)
                        //             // window.open(`bankid:///?autostarttoken=${response.data.autoStartToken}&redirect=https://netlex.se/`, "_self")
                        //             // window.open(bankIDForMobileURL, "_self")

                        //         } else{
                        //             console.log("device", this.device);
                        //             window.open(`https://app.bankid.com/?autostarttoken=${response.data.autoStartToken}&redirect=https://netlex.se/`)
                        //         }
                        //         // this.document.location.href = 'myappname://appname.com/login?name='+id+'&id='+token;

                        //         // if let appURL = URL(string: "https://myphotoapp.example.com/albums?albumname=vacation&index=1") {
                        //         //     UIApplication.shared.open(appURL) { success in
                        //         //         if success {
                        //         //             print("The URL was delivered successfully.")
                        //         //         } else {
                        //         //             print("The URL failed to open.")
                        //         //         }
                        //         //     }
                        //         // } else {
                        //         //     print("Invalid URL specified.")
                        //         // }


                        //         // let lastOrderRef = this.orderRefArray[this.orderRefArray.length-1]
                        //         // console.log("lastOrderRef", lastOrderRef)

                        //         interval = setInterval(() => {
                        //             this.orderRefArray.forEach((ele) => {
                        //                 // console.log("ele", ele);
                        //                 // =======||||||=========|||||======= Collect data form BankID App =======||||||=========|||||=======
                        //                 this.authService.collectBankIdAuth(ele.orderRef).subscribe(res => {
                        //                     // console.log('res', res)
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
                        //                         this.createUser(userDataFromBankID)
                        //                         // this.processOfValidate(userDataFromBankID);
                        //                         // alert("completed")
                        //                     }

                        //                 });
                        //             })

                        //         }, 1000);
                        //     // } else {
                        //     //     // let lastAutoStartToken = this.orderRefArray[this.orderRefArray.length-1]
                        //     //     // console.log("lastAutoStartToken", lastAutoStartToken)
                        //     //     // console.log('response',response)
                        //     //     this.submit();
                        //     // }

                        //     // window.open('bankid:///?redirect=null')

                        // }
                        else {
                            if (this.device != 'Windows') {
                                this.showLoader = true;
                                // debugger
                                clearInterval(interval);
                                console.log('response.data.autoStartToken', response.data.autoStartToken)
                                interval = setInterval(() => {
                                    this.orderRefArray.forEach((ele) => {
                                        // console.log("ele", ele);
                                        // =======||||||=========|||||======= Collect data form BankID App =======||||||=========|||||=======
                                        this.authService.collectBankIdAuth(ele.orderRef).subscribe(res => {
                                            // console.log('res', res)
                                            if (res.status === "inProgress") {

                                            }
                                            else if (res.status === "completed") {
                                                clearInterval(interval);
                                                // this.qrScannedLoading = true;
                                                this.showLoader = false;
                                                userDataFromBankID = res.resp;
                                                console.log("userDataFromBankID", userDataFromBankID)
                                                // this.router.navigate(['/']).then();
                                                this.createUser(userDataFromBankID)
                                                // this.processOfValidate(userDataFromBankID);
                                                // alert("completed")
                                            }

                                        });
                                    })

                                }, 1000);
                            }
                            else {
                                clearInterval(interval);
                                console.log('response.data.autoStartToken', response.data.autoStartToken)

                                // console.log("this.deviceChanged", this.deviceChanged)
                                window.open(`bankid:///?autostarttoken=${response.data.autoStartToken}&redirect=null`, "_self")
                                interval = setInterval(() => {
                                    this.orderRefArray.forEach((ele) => {
                                        // console.log("ele", ele);
                                        // =======||||||======= Collect data form BankID App =======||||||=======
                                        this.authService.collectBankIdAuth(ele.orderRef).subscribe(res => {
                                            // console.log('res', res)
                                            if (res.status === "inProgress") { }
                                            else if (res.status === "completed") {
                                                clearInterval(interval);
                                                // this.qrScannedLoading = true;
                                                userDataFromBankID = res.resp;
                                                console.log("userDataFromBankID", userDataFromBankID)
                                                this.createUser(userDataFromBankID)
                                                // this.processOfValidate(userDataFromBankID);
                                            }
                                        });
                                    })
                                }, 1000);

                            }

                        }
                        // if (this.isMobileBankIdOnDevice === 'current') {
                        //     window.open('bankid:///?redirect=null');
                        // }
                        // this.processOfValidate();
                    }

                });

                // return false;

            }
        });
    }
    createUser(userDataFromBankID): void {
        // this.qrScannedLoading = true;
        this.apiService.createUser(this.user, this.isMobileBankIdOnDevice, userDataFromBankID).subscribe(result => {
            console.log('result of createUser', result)
            if (result.msg === 'err') {
                this.showLoader = false;
                this.openDialog('Err', '', 'ok');
            } else if (result === 'user already in') {
                this.showLoader = false;
                this.openDialog(this.translate.instant('WARN.USER_ALREADY_IN'), '', 'ok');
            } else {
                // console.log("this.isMobileBankIdOnDevice", this.isMobileBankIdOnDevice)
                // if (this.isMobileBankIdOnDevice === 'current') {
                //     window.open('bankid:///?redirect=null');
                // }
                this.processOfValidate(userDataFromBankID);
            }

        });
    }

    submit(): void {
        // console.log('user.ssn',this.user.ssn)
        this.getclientsDetailstoSsn(this.user.ssn)

    }
    currentDeviceHandler() {
        // debugger
        this.isMobileBankIdOnDevice = 'current';
    }
    processOfValidate(userDataFromBankID): void {
        // this.authService.bankIdAuth(this.user.ssn).subscribe(response => {
        this.authService.bankIdAuth(userDataFromBankID.pno).subscribe(response => {
            console.log("processOfValidate response", response)
            if (response === 'inProgress' || response === 'err' || response === '') {
                setTimeout(() => {
                    this.processOfValidate(userDataFromBankID);
                }, 5000);
            } else if (response.status === 'complete') {
                this.showLoader = false;
                this.qrScannedLoading = false;
                // localStorage.setItem('firstName', response.completionData.user.name);
                // localStorage.setItem('lastName', response.completionData.user.surname);
                // localStorage.setItem('userName', response.completionData.user.givenName);
                localStorage.setItem('firstName', response.user[0].firstName);
                localStorage.setItem('lastName', response.user[0].lastName);
                localStorage.setItem('userName', response.user[0].firstName);
                localStorage.setItem('id', response.user[0]._id);
                localStorage.setItem('email', response.user[0].email);
                localStorage.setItem('accountType', response.user[0].accountType);
                localStorage.setItem('organizationNumber', response.user[0].organizationNumber);
                localStorage.setItem('userPortalToken', response.token);
                localStorage.setItem('role', response.user[0]?.role);
                this.utilService.registerEditScreen();
                this.router.navigate(['/accountSettings']);
            } else if (response.status === 'failed' || response === 'err') {
                this.openDialog(this.translate.instant('WARN.WARN_CREATE_FAILED'), '', 'OK');
                this.showLoader = false;
            } else if (response === 'UserAccNotApproved') {
                this.openDialog(this.translate.instant('WARN.WARN_ACCOUNT_NOT_ACTIVATED'),
                    'Vänligen ha tålamod ditt konto kommer att aktiveras inom 24 timmar. Tack', 'OK');
                this.showLoader = false;
                this.qrScannedLoading = false;
                // this.router.navigate(['/']);
                if (this.documentId) {
                    this.router.navigate(['/userInput', this.documentId]).then();
                }else{
                    this.router.navigate(['/']);
                }
            } else {
                this.showLoader = false;
            }

        });
    }

    selectAccount(type: string): void {
        this.accountTypeSelector = false;
        this.user.accountType = type;
        type === 'private' ? this.isCompany = false : this.isCompany = true;
    }

    openDialog(header, content, action): void {
        console.log("header",header)
        let width;
        let height;
        this.innerWidth >= 425 ? width = 400 : width = 349;
        this.innerWidth >= 425 ? height = 400 : height = 410;
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '400px',
            height: '400px',
            panelClass: 'mat-dialog-container-primary',
            data: { header: header, content: content, action: action, component: 'register' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if(header=='Användare redan registrerad' || header=='Err'){
                this.router.navigate(['/login']);
            }
        });
    }
}
