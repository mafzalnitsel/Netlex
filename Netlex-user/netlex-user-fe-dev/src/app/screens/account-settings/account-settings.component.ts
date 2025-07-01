import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { NewDealService } from '../../services/newDeal.service';
import { DialogComponent } from '../../netlex-common/dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterService } from "../../services/router.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
    [x: string]: any;
    option: string;
    innerWidth: number;
    isAdmin: boolean;
    panelOpenState = false;
    settings = false;
    settingsScreen = false;
    showLoader = true;
    teamsMeetingLink = '';
    requestsScreen = false;
    myPurchase = false;
    meetingSales = false;
    lastEdited = false;
    lastEditedAgreementList = [1];
    myPurchaseList = [];
    meetingSalesList = [];
    myPurchasemasterList = [];
    myMeetingSalesMasterList = [];

    purchasedDocumentListMap = new Map();
    meetingSalesListMap = new Map();
    userName = '';
    documentDetails: any;
    constructor(public util: UtilService,
        private newDealService: NewDealService,
        public dialog: MatDialog,
        public translate: TranslateService,
        public router: Router,
        private routeService: RouterService,
        private api: ApiService,
        private authService: AuthService) {
        this.innerWidth = window.innerWidth;

    }

    ngOnInit(): void {
        this.util.show();
        this.userName = this.authService.getFirst();
        const role = localStorage.getItem('role');
        this.getLastEditedAgreement();
        this.getMyPurchase();
        this.getMeetingSales();
        setTimeout(() => {
            this.showLoader = false;
        }, 2000)

        this.isAdmin = role === 'Administration';

        if (this.util.edit) {
            this.settings = true;
            this.settingsScreenOption('userInformation');
        }

    }

    settingsScreenOption(event): any {
        this.option = event;
        this.settingsScreen = true;
    }

    OnClickBack(): void {
        this.settings = false;
        this.settingsScreen = false;
        this.requestsScreen = false;
        this.lastEdited = false;
        this.myPurchase = false;
        this.meetingSales = false;
    }

    onClickLastEditAgreement(): void {
        this.settingsScreen = false;
        this.requestsScreen = false;
        this.lastEdited = true;
        this.myPurchase = false;
        this.meetingSales = false;
        this.getLastEditedAgreement();
    }


    screenReset(event): void {

        if (event === 'prevSettings') {
            this.settings = true;
            this.settingsScreen = false;
        }

    }

    getLastEditedAgreement(): void {

        const userId = localStorage.getItem('id');

        if (userId) {
            this.newDealService.getDraftDocumentListByUserId(userId).subscribe(document => {
                this.lastEditedAgreementList = document.userDocumentMaster;
                let documentList = [];
                documentList = document.documentData;
                if (this.lastEditedAgreementList.length > 0) {
                    this.lastEditedAgreementList.forEach(agreement => {
                        const documentTemp = documentList.find(document => document['_id'] === agreement['documentTemplateId']);

                        if (document) {
                            agreement['lastUpdated'] = agreement['generationDate'];
                            agreement['documentTitle'] = documentTemp['documentTitle'];
                            agreement['documentTemplateId'] = documentTemp['_id'];

                        }
                    });
                }
            });
            console.log('this.lastEditedAgreementList',this.lastEditedAgreementList)
        }
    }
    deleteDraftAgrement(documentMasterId: any): any {
        //  alert(documentMasterId)
        if (confirm('Är du säker på att du vill ta bort den här användaren?')) {
            this.loading = true;
            this.newDealService.deleteDocumentCancelledByUser(documentMasterId).subscribe(
                res => {
                    this.loading = false;
                    this.snackBar.open('Användaren har tagits bort', 'ok');
                    window.scroll(0, 0);
                    this.getPage(1);
                }, err => {
                    this.loading = false;
                    this.snackBar.open(
                        'Det går inte att ta bort användaren. Var god försök igen', 'ok');
                    window.scroll(0, 0);
                }
            );
        }
    }
    onClickMeetingSales() {
        this.settingsScreen = false;
        this.requestsScreen = false;
        this.lastEdited = false;
        this.myPurchase = false;
        this.meetingSales = true;
        this.getMeetingSales();
    }




    onClickEditAgreement(agreement:any,documentTemplateId: any, documentMasterId: any): void {
        console.log('documentTemplateId',documentTemplateId)
        console.log('documentMasterId',documentMasterId)
        console.log('agreement',agreement)
        // debugger
        let width, height;
        this.innerWidth >= 425 ? width = 400 : width = 349;
        this.innerWidth >= 425 ? height = 400 : height = 410;
        const dialogRef = this.dialog.open(DialogComponent, {
            width: width,
            height: height,
            panelClass: 'mat-dialog-container-primary',
            data: {
                header: this.translate.instant('LAST_EDITED_AGREEMENTS_TABLE.DIALOG_TITLE'),
                content: this.translate.instant('LAST_EDITED_AGREEMENTS_TABLE.DIALOG_CONTENT'),
                action: this.translate.instant('LAST_EDITED_AGREEMENTS_TABLE.DIALOG_FIRST_BUTTON'),
                component: 'accountSettingsComponent'
            }
        });
        this.routeService.editDocumentId = documentTemplateId;
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.router.navigate(['/userInput', documentTemplateId], {
                    queryParams: {
                        master_id: documentMasterId,
                        edit: true,
                        index: 0
                    }
                });
            }
        });
    }


    // getAgreementPdfnew( documentTemplateId: any, documentMasterId: any, ): void {

    //     // Function to get the pdf content by document Id and Master Id.
    //     alert(documentTemplateId)

    //     this.newDealService.getPdfBuffer(documentTemplateId, documentMasterId).subscribe((pdfBuffer) => {// Service Call to get the PDF Buffer Data.

    //         const byteArray = new Uint8Array(pdfBuffer.pdfBuffer.data.tostr);
    //         const blob = new Blob([byteArray], {type: 'application/pdf'});
    //         const objectUrl = URL.createObjectURL(blob);
    //         const file = document.createElement('a');
    //         file.href = objectUrl;
    //         this.pdfSrc = file.href;
    //         window.open(objectUrl);

    //     });
    // }


    getAgreementPdf(purchase:any,documentTemplateId: any, documentMasterId: any) {
        // Function to get the pdf content by document Id and Master Id.
        this.showLoader = true;

        //  alert(documentMasterId);
        
        const documentid = localStorage.getItem('documentTemplateId');

        console.log('purchase',purchase)
        console.log('documentTemplateId',documentTemplateId ?documentTemplateId :documentid)
        console.log('documentMasterId',documentMasterId) // 645c9b617815e9d6e4d50dae

        this.newDealService.getPdfBuffer2((documentTemplateId ?documentTemplateId :documentid), documentMasterId).subscribe((pdfBuffer) => {// Service Call to get the PDF Buffer Data.
            console.log("pdfBufferpdfBufferpdfBuffer")
            this.showLoader = false;
            const byteArray = new Uint8Array(pdfBuffer.pdfBuffer.data);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            const objectUrl = URL.createObjectURL(blob);
            const file = document.createElement('a');
            file.href = objectUrl;
            this.pdfSrc = file.href;
            window.open(objectUrl);
        });
    }
    teamsMeetingHandler(payment: any) {
        // console.log("payment",payment);
        let schedulerId = payment.schedulerId
        this.api.scheduleById(schedulerId).subscribe(res => {
            // console.log('res of get schedule  by id', res)
            this.teamsMeetingLink = res.teamsMeetingLink;
            console.log('this.teamsMeetingLink', this.teamsMeetingLink)
            window.open(this.teamsMeetingLink, '_blank')
        },
            err => { }
        );
    }

    //Generate Meeting Pdf File
    generateMeetingSalesPdf(purchase: any) {
        this.showLoader = true;
        console.log("purchase", purchase);

        this.api.generateSalesPdf(purchase)

            .subscribe(
                res => {
                    // console.log('generateSalesPdf....res', res)
                    const byteArray = new Uint8Array(res.data);
                    const blob = new Blob([byteArray], { type: 'application/pdf' });
                    const objectUrl = URL.createObjectURL(blob);
                    // window.open(objectUrl,"_self");
                    window.open(objectUrl, '_blank');
                    // this.router.navigate(['/sales' ]);
                    const file = document.createElement('a');
                    file.href = objectUrl;

                    file.download = purchase.userName + ' - ' + purchase._id;
                    this.showLoader = false;
                    file.click();
                },
                err => { }
            );
    }
    //Generate Agreement Pdf File
    generateAgreementSalesPdf(purchase: any) {
        this.showLoader = true;
        console.log("purchase", purchase);

        this.api.generatePaymentPdf(purchase)

            .subscribe(
                res => {
                    // console.log('generateSalesPdf....res', res)
                    const byteArray = new Uint8Array(res.data);
                    const blob = new Blob([byteArray], { type: 'application/pdf' });
                    const objectUrl = URL.createObjectURL(blob);
                    // window.open(objectUrl,"_self");
                    window.open(objectUrl, '_blank');
                    // this.router.navigate(['/sales' ]);
                    const file = document.createElement('a');
                    file.href = objectUrl;

                    file.download = purchase.userName + ' - ' + purchase._id;
                    this.showLoader = false;
                    file.click();
                },
                err => { }
            );
    }
    onClickViewPurchasedAgreement(purchaseId, title, date, price, method): void {
        let purchaseContent = { purchaseId, title, date, price, method };
        let width, height;
        this.innerWidth >= 425 ? width = 400 : width = 349;
        this.innerWidth >= 425 ? height = 430 : height = 410;
        const dialogRef = this.dialog.open(DialogComponent, {
            width: width,
            height: height,
            panelClass: 'mat-dialog-container-primary',
            data: {
                header: this.translate.instant('MY_PURCHASE.DIALOG_TITLE'),
                content: purchaseContent,
                action: this.translate.instant('MY_PURCHASE.DIALOG_FIRST_BUTTON'),
                component: 'purchase'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    onClickViewMeetingSales(purchaseId, title, date, price, method): void {
        let purchaseContent = { purchaseId, title, date, price, method };
        let width, height;
        this.innerWidth >= 425 ? width = 400 : width = 349;
        this.innerWidth >= 425 ? height = 430 : height = 410;
        const dialogRef = this.dialog.open(DialogComponent, {
            width: width,
            height: height,
            panelClass: 'mat-dialog-container-primary',
            data: {
                header: this.translate.instant('MY_PURCHASE.DIALOG_TITLE'),
                content: purchaseContent,
                action: this.translate.instant('MY_PURCHASE.DIALOG_FIRST_BUTTON'),
                component: 'purchase'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
        });

    }

    showRequests(): any {
        this.settingsScreen = false;
        this.requestsScreen = true;
    }

    getMyPurchase(): void {
        const userId = localStorage.getItem('id');
        if (userId) {
            this.newDealService.getMyPurchaseByUserId(userId).subscribe(response => {
                console.log('response>>>>getMyPurchase', response)
                this.myPurchaseList = response.paymentInfo
                this.documentDetails = response.documentId;
                this.myPurchasemasterList = response.userDocumentMaster;


            });
        }

    }

    getMeetingSales(): void {
        const userId = localStorage.getItem('id');
        if (userId) {
            this.newDealService.getMeetingSalesByUserId(userId).subscribe(response => {
                // console.log('response>>>>getMeetingSales', response)
                this.meetingSalesList = response.sales;
                this.documentDetails = response.documentId;
                this.myMeetingSalesMasterList = response.userDocumentMaster;
                console.log('meetingSalesList', this.meetingSalesList)


                // console.log('this.meetingSalesList',this.meetingSalesList[0].salesAt)

            });
        }

    }

    onClickMyPurchase() {
        this.settingsScreen = false;
        this.requestsScreen = false;
        this.lastEdited = false;
        this.myPurchase = true;
        this.meetingSales = false;
        this.getMyPurchase();
    }

}


function id(id: any) {
    throw new Error('Function not implemented.');
}

