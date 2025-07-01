import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NewDealService } from '../../services/newDeal.service';
import { DialogComponent } from '../../netlex-common/dialog/dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../../services/util.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { RouterService } from "../../services/router.service";
import { environment } from "../../../environments/environment";
import { contentpagesService } from '../../services/contentpages.service';
import { AgreementQuestionsDialogComponent } from '../user-input/agreement-questions-dialog/agreement-questions-dialog.component';

@Component({
    selector: 'app-agreement-sample1',
    templateUrl: './agreement-sample1.component.html',
    styleUrls: ['./agreement-sample1.component.scss']
})
export class AgreementSample1Component implements OnInit {

    documentList = [];
    documents = [];
    filterDocuments = [];
    agreementList = [];
    order_id: string;
    status: string;
    alphabetHide: boolean;
    showLoader: boolean = false;
    isSearchEmpty: boolean = false;
    documentId: any;
    timeOut: any;
    searchValue: any;
    timer: any;
    innerWidth: any;
    response: any;
    session_id: any;
    masterId: string;
    schedule: { Ispaid: string; userId: string; };

    headerImage: any;
    currentPath: any;
    constructor(private authService: AuthService,
        private newDealService: NewDealService,
        public dialog: MatDialog,
        public translate: TranslateService,
        private paymentService: PaymentService,
        public router: Router,
        public routeService: RouterService,
        public utilService: UtilService,
        private route: ActivatedRoute,
        private ContentpagesService: contentpagesService,) {
        this.routeService.data = { state: null };
    }

    ngOnInit(): void {
        window.scroll(0, 0);
        this.getAgreementsHeaderImage();
        localStorage.removeItem('guestUserId');
        localStorage.removeItem('guestUserEmail');
        localStorage.removeItem('documentIdToSave')
        this.routeService.editDocumentId = '';
        this.utilService.show();
        this.utilService.edit = false;
        this.fetchDocumentList();
        this.alphabetHide = false;
        this.innerWidth = window.innerWidth;
        const userId = localStorage.getItem('id');
        let path = location.pathname;
        this.currentPath = location.pathname;
        this.route.queryParams.subscribe(params => {
            this.documentId = params.document_id;
            this.order_id = params.order_id;
            this.session_id = params.session_id;
            this.masterId = params.master_id;
        });

        let askQuestionsStatus = localStorage.getItem('askQuestionFirst');
        console.log("askQuestionsStatus", askQuestionsStatus)
        console.log("this.order_id", this.order_id)
        console.log("this.masterId", this.masterId)
        console.log("userId", userId)
        // if(localStorage.getItem('agreementType')!=='business'){
        // console.log("agreementType is business", localStorage.getItem('agreementType'))
        // }
        if (path.includes('klarnasale/successsale')) {
            console.log("if == klarnasale/successsale (1)")
            if (this.order_id) {
                this.showLoader = true;
                this.getKlarnaSalePaymentResponse(userId);
            }
        }
        else if (path.includes('stripesale/success')) {
            console.log("else if == stripesale/success (2)")
            this.showLoader = true;
            this.getStripeSalePaymentResponse(userId);
        }
        else if (path.includes('swishsale/success')) {
            // console.log(' SWISH DATA AGREEMENT PAGE');
            console.log("else if == swishsale/success (3)")
            this.showLoader = true;
            this.getSwishSalePaymentResponse(userId);
        }

        else if (localStorage.getItem('agreementType') !== 'business' && ((askQuestionsStatus == 'false' && !path.includes('agreements')) || (this.masterId == 'undefined' && !path.includes('agreements')))) {
            localStorage.setItem("afterQuestionsPath", path)
            localStorage.setItem("paymentIsDone", 'true')
            this.openUserInputsDialog();
        }
        else {

            if (path.includes('klarna/success')) {
                console.log("Calling Klarna Function")
                if (this.order_id) {
                    this.showLoader = true;
                    this.getKlarnaPaymentResponse(userId);
                }
            }
            if (path.includes('stripe/success')) {
                this.showLoader = true;
                this.getStripePaymentResponse(userId);
            }
            if (path.includes('swish/success')) {
                this.showLoader = true;
                this.getSwishPaymentResponse(userId);
            }

        }
        // if (path.includes('klarnasale/successsale')) {
        //     if (this.order_id) {
        //         this.showLoader = true;
        //         this.getKlarnaSalePaymentResponse(userId);
        //     }
        // }
        // if (path.includes('klarna/success')) {
        //     console.log("Calling Klarna Function")
        //     if (this.order_id) {
        //         this.showLoader = true;
        //         this.getKlarnaPaymentResponse(userId);
        //     }
        // }
        // if (path.includes('stripe/success')) {
        //     this.showLoader = true;
        //     this.getStripePaymentResponse(userId);
        // }
        // if (path.includes('stripesale/success')) {
        //     this.showLoader = true;
        //     this.getStripeSalePaymentResponse(userId);
        // }
        // if (path.includes('swish/success')) {
        //     this.showLoader = true;
        //     this.getSwishPaymentResponse(userId);
        // }
        // if (path.includes('swishsale/success')) {

        //     console.log(' SWISH DATA AGREEMENT PAGE');

        //     this.showLoader = true;
        //     this.getSwishSalePaymentResponse(userId);
        // }

    }

    openUserInputsDialog() {
        // console.log("lawyerId", lawyerId);
        const dialogRef = this.dialog.open(AgreementQuestionsDialogComponent, {
            height: 'auto',
            // height: '75%',
            width: '40%',
            panelClass: 'mat-dialog-container-primary',
            // disableClose: true,
            data: {
                //   eventIdToView : this.eventId
                documentId: this.documentId,
                paymentIsDone: 'true'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            // let afterQuestionMasterId = localStorage.getItem('master_id');
            // console.log("afterQuestionMasterId",afterQuestionMasterId);
            let afterQuestionMasterId: any;
            this.showLoader = true;

            // let interval= setInterval(() => {
            //     afterQuestionMasterId = localStorage.getItem('master_id');
            //     console.log("afterQuestionMasterId2", afterQuestionMasterId);
            //     localStorage.removeItem('master_id')
            //     if (afterQuestionMasterId && afterQuestionMasterId!=undefined) {
            //         this.masterId = afterQuestionMasterId;
            //         console.log("this.masterId gotted", afterQuestionMasterId);
            //         clearInterval(interval);
            //         this.afterQuestionDoneSavePayment();
            //         // this.ngOnInit();
            //     }
            // }, 1000)
            setTimeout(() => {
                afterQuestionMasterId = localStorage.getItem('master_id');
                console.log("afterQuestionMasterId2", afterQuestionMasterId);
                localStorage.removeItem('master_id')
                if (afterQuestionMasterId && afterQuestionMasterId != undefined) {
                    this.masterId = afterQuestionMasterId;
                    console.log("this.masterId gotted", afterQuestionMasterId);
                    this.afterQuestionDoneSavePayment();
                    // this.ngOnInit();
                }
            }, 5000)

        });
    }
    afterQuestionDoneSavePayment() {
        console.log("reached afterQuestionDoneSavePayment")
        let userId = localStorage.getItem('id');
        if (this.currentPath.includes('klarnasale/successsale')) {
            if (this.order_id) {
                this.showLoader = true;
                this.getKlarnaSalePaymentResponse(userId);
            }
        }
        if (this.currentPath.includes('klarna/success')) {
            console.log("Calling Klarna Function")
            if (this.order_id) {
                this.showLoader = true;
                this.getKlarnaPaymentResponse(userId);
            }
        }
        if (this.currentPath.includes('stripe/success')) {
            this.showLoader = true;
            this.getStripePaymentResponse(userId);
        }
        if (this.currentPath.includes('stripesale/success')) {
            this.showLoader = true;
            this.getStripeSalePaymentResponse(userId);
        }
        if (this.currentPath.includes('swish/success')) {
            this.showLoader = true;
            this.getSwishPaymentResponse(userId);
        }
        if (this.currentPath.includes('swishsale/success')) {

            console.log(' SWISH DATA AGREEMENT PAGE');

            this.showLoader = true;
            this.getSwishSalePaymentResponse(userId);
        }
    }
    // getSwishSalePaymentResponse(userId: any): any {
    //     let path = location.pathname;
    //     let orderId;

    //       if (path.includes('swishsale/success')) {
    //        this.route.queryParams.subscribe(params => {
    //                 this.documentId = params.document_id;
    //                 orderId = params.session_id;
    //                 this.masterId = params?.master_id;
    //             });
    //             console.log( ' this.masterId'+this.masterId)
    //             const orderedSession = {
    //                 order_id: this.order_id,//this.response.split('session_id=')[1],
    //                 payment_provider: 'Swish',
    //                 status: 'Unpaid',
    //                 documentId: this.documentId,
    //                 userId: userId ? userId : '',
    //                 masterId :  this.masterId 
    //             };
    //             this.paymentService.paymentInfoBySessionIdSale(orderedSession).subscribe(payment => {
    //                 if (payment.status === 'success') {
    //                   const id =orderedSession.documentId;
    //                     this.schedule = {Ispaid: "YES",}
    //                      console.log("------SHEDULE ID ------" + id)
    //                     this.showLoader = false;
    //                     let documentTemplateId = localStorage.getItem('documentTemplateId');
    //                     this.newDealService.updateschedulePaymentIspaid(this.schedule, id ).subscribe({});

    //                   clearTimeout(this.timeOut);
    //                     this.showLoader = false;
    //                     this.paymentDialogSale();
    //                 }


    //             });
    //         }



    // }
    getAgreementsHeaderImage() {
        // debugger;
        const Pagename = 'allHeaderImages'
        this.ContentpagesService.getContentPages(Pagename).subscribe(response => {
            //   console.log("response",response)
            let imageData = response.doc[0].agreementHeaderImg;
            // console.log("imageData",imageData)
            this.headerImage = 'url(' + environment.adminserviceURL + imageData + ')';
            //   console.log("this.headerImage",this.headerImage)
        });
    }
    getSwishSalePaymentResponse(userId: any): any {

        console.log('sdfsdfsdfsd')

        let path = location.pathname;
        let orderId;

        if (path.includes('swishsale/success')) {
            this.route.queryParams.subscribe(params => {
                this.documentId = params.document_id;
                // this.documentId = '626675eb1fa8be23483e45cd';

                orderId = params.session_id;
                this.masterId = params?.master_id;

                console.log('this.documentId : ' + this.documentId)
            });
            console.log('Agreement side front end ' + userId)
            const orderedSession = {
                //  documentId: this.documentId,
                // documentId: '6269172e2f5ce61ad0a50355',
                documentId: this.documentId,
                order_id: orderId,
                payment_provider: 'Swish',
                status: 'Created',
                //documentId: '626675eb1fa8be23483e45cd',
                userId: userId ? userId : '',
                masterId: this.masterId
            };
            this.paymentService.paymentInfoBySessionIdSale(orderedSession).subscribe(payment => {

                console.log('HELOOOOO')
                console.log(this.documentId + " document ID")
                if (payment.status === 'PAID') {
                    //if (payment.status === 'success') {

                    const id = this.documentId;
                    this.showLoader = true;
                    let documentTemplateId = localStorage.getItem('documentTemplateId');


                    this.schedule = { Ispaid: "YES", userId: localStorage.getItem('id') }
                    console.log("------SHEDULE ID ------" + id)
                    this.newDealService.updateschedulePaymentIspaid(payment._id, id).subscribe({});
                    clearTimeout(this.timeOut);
                    this.paymentDialogSale();
                }
            });



        }

    }

    getSwishPaymentResponse(userId: any): any {

        let path = location.pathname;
        console.log("this is swishpayment " + path)
        if (path.includes('swish/success')) {
            const orderedSession = {
                order_id: this.order_id,//this.response.split('session_id=')[1],
                payment_provider: 'Swish',
                status: 'Created',
                documentId: this.documentId,
                userId: userId ? userId : ''

            };
            // this.paymentService.paymentInfoBySessionId(orderedSession).subscribe(response => {
            //     this.timeOut = setTimeout(() => {

            //         if (response.status === 'PAID') {
            //            // clearTimeout(this.timeOut);
            //             this.newDealService.updateAgreementPaymentStatus(this.order_id,this.masterId).subscribe({});
            //             this.paymentDialog();
            //         } else {
            //             this.getSwishPaymentResponse(userId);
            //         }

            //     }, 5000);

            // });

            if (path.includes('swish/success')) {
                const orderedSession = {
                    order_id: this.order_id,//this.response.split('session_id=')[1],
                    payment_provider: 'Swish',
                    status: 'Unpaid',
                    documentId: this.documentId,
                    userId: userId ? userId : ''
                };
                this.paymentService.paymentInfoBySessionId(orderedSession).subscribe(payment => {
                    console.log("payment", payment)
                    if (payment) {
                        this.showLoader = false;
                        let documentTemplateId = localStorage.getItem('documentTemplateId');
                        this.newDealService.updateAgreementPaymentStatus(payment._id, this.masterId).subscribe({});
                        this.paymentDialog();
                    }
                });
            }

        }

    }


    getStripePaymentResponse(userId: any): any {
        let path = location.pathname;
        let orderId;

        if (path.includes('stripe/success')) {
            this.route.queryParams.subscribe(params => {
                this.documentId = params.document_id;
                orderId = params.session_id;
                this.masterId = params?.master_id;
            });
            const orderedSession = {
                order_id: orderId,
                payment_provider: 'Stripe',
                status: 'Unpaid',
                documentId: this.documentId,
                userId: userId ? userId : ''
            };
            this.paymentService.paymentInfoBySessionId(orderedSession).subscribe(payment => {
                this.timeOut = setTimeout(() => {

                    if (payment.status === 'success') {
                        let documentTemplateId = localStorage.getItem('documentTemplateId');
                        this.newDealService.updateAgreementPaymentStatus(payment._id, this.masterId).subscribe({});
                        clearTimeout(this.timeOut);
                        this.showLoader = false;
                        this.paymentDialog();
                    } else {
                        this.getStripePaymentResponse(userId);
                    }

                }, 5000);
            });
        }


    }



    getStripeSalePaymentResponse(userId: any): any {
        let path = location.pathname;
        let orderId;

        if (path.includes('stripesale/success')) {
            this.route.queryParams.subscribe(params => {
                this.documentId = params.document_id;
                orderId = params.session_id;
                this.masterId = params?.master_id;
                console.log('this.documentId : ' + this.documentId);
            });
            console.log(' this.masterId' + this.masterId)
            const orderedSession = {
                order_id: orderId,
                payment_provider: 'Stripe',
                status: 'Unpaid',
                documentId: this.documentId,
                userId: userId ? userId : '',
                masterId: this.masterId
            };
            this.paymentService.paymentInfoBySessionIdSale(orderedSession).subscribe(payment => {
                this.timeOut = setTimeout(() => {

                    if (payment.status === 'success') {

                        const id = orderedSession.documentId;
                        this.schedule = { Ispaid: "YES", userId: localStorage.getItem('id') }
                        console.log("------SHEDULE ID ------" + id)

                        this.newDealService.updateschedulePaymentIspaid(this.schedule, id).subscribe({});



                        let documentTemplateId = localStorage.getItem('documentTemplateId');
                        // this.newDealService.updateAgreementPaymentStatus(payment._id,this.masterId).subscribe({});
                        clearTimeout(this.timeOut);
                        this.showLoader = false;
                        this.paymentDialogSale();
                    } else {
                        this.getStripeSalePaymentResponse(userId);
                    }

                }, 5000);
            });
        }



    }

    getKlarnaPaymentResponse(userId: any): any {
        console.log("reached in Klarna Get Function of APi to save record", userId)
        console.log("this.masterId", this.masterId);

        this.route.queryParams.subscribe(params => {
            this.documentId = params.document_id;
            this.order_id = params.order_id;
            if (params.master_id != 'undefined') this.masterId = params?.master_id;

        });
        if (this.order_id) {
            this.status = 'success';



            const pathName = location.pathname.split('/');
            const paymentDetails = {
                order_id: this.order_id,
                payment_provider: 'klarna',
                status: 'success',
                documentId: this.documentId,
                userId: userId ? userId : '',
                masterId: this.masterId,
                agreementType: localStorage.getItem('agreementType')
            };
            console.log("paymentDetails", paymentDetails)

            this.paymentService.getPaymentDetail(paymentDetails).subscribe(payment => {
                console.log("getKlarnaPaymentResponse", payment)
                this.timeOut = setTimeout(() => {
                    if (payment.status === 'success') {
                        // console.log("payment.status", payment.status);
                        // console.log("payment._id", payment._id);
                        // console.log("this.masterId", this.masterId);
                        // console.log("this.documentId", this.documentId);
                        // console.log("localStorage.getItem('id')", localStorage.getItem('id'));
                        // console.table(["It is Business Agreement", "Calling Api updateAgreementPaymentStatus"]);
                        let consoleTable = [
                            { name: "payment.status", value: payment.status },
                            { name: "payment._id", value: payment._id },
                            { name: "payment.masterId", value: payment.masterId },
                            { name: "payment.documentId", value: payment.documentId },
                            { name: "localStorage.getItem('id')", value: localStorage.getItem('id') }
                        ]
                        console.log('consoleTable');
                        console.table(consoleTable);
                        let documentTemplateId = localStorage.getItem('documentTemplateId');
                        // this.newDealService.updateAgreementPaymentStatus(payment._id, this.masterId).subscribe({});
                        if (localStorage.getItem('agreementType') !== 'business') {
                            console.log("It is Personal Agreement");
                            console.log("Calling Api updateAgreementPaymentStatus");
                            console.table([{ name: "this.masterId", value: this.masterId },
                            { name: "payment._id", value: payment._id },]);
                            this.newDealService.updateAgreementPaymentStatus(payment._id, this.masterId).subscribe(ress => {
                                console.log("updateAgreementPaymentStatus and sending mail")
                                console.log("ress", ress)
                            });
                            clearTimeout(this.timeOut);
                            this.showLoader = false;
                            this.paymentDialog();
                            localStorage.removeItem('userId');
                        } else {
                            console.log("It is Business Agreement");
                            console.log("Calling Api updateBusinessAgreementPaymentStatus");
                            console.table([{ name: "this.documentId", value: this.documentId },
                            { name: "payment._id", value: payment._id }, { name: "localStorage.getItem('id')", value: localStorage.getItem('id') },]);
                            this.newDealService.updateBusinessAgreementPaymentStatus(payment._id, 'itsBusinessAgreement', this.documentId, localStorage.getItem('id')).subscribe(ress => {
                                console.log("updateAgreementPaymentStatus and sending mail")
                                console.log("ress", ress)
                            });
                            clearTimeout(this.timeOut);
                            this.showLoader = false;
                            this.paymentDialog();
                            localStorage.removeItem('userId');
                            // this.router.navigate(['/business-agreements'], {
                            // });
                        }

                    } else {
                        this.getKlarnaPaymentResponse(userId);
                    }
                }, 5000);
            });
        }


    }

    getKlarnaSalePaymentResponse(userId: any): any {
        console.log('reached getKlarnaSalePaymentResponse');
        this.route.queryParams.subscribe(params => {
            this.documentId = params.document_id;
            this.order_id = params.order_id;
            this.masterId = params?.master_id;
        });
        if (this.order_id) {
            this.status = 'success';



            const pathName = location.pathname.split('/');
            const paymentDetails = {
                order_id: this.order_id,
                payment_provider: 'klarna',
                status: 'success',
                documentId: this.documentId,
                userId: userId ? userId : '',
                masterId: this.masterId
            };
            this.paymentService.getPaymentDetailSale(paymentDetails).subscribe(payment => {
                console.log("payment response in getKlarnaSalePaymentResponse ", payment)
                this.timeOut = setTimeout(() => {
                    if (payment.status === 'success') {
                        const id = paymentDetails.documentId;
                        this.schedule = { Ispaid: "YES", userId: localStorage.getItem('id') }
                        this.newDealService.updateschedulePaymentIspaid(this.schedule, id).subscribe({});


                        // const id =orderedSession.documentId;
                        // this.schedule = {Ispaid: "YES",}
                        //  console.log("------SHEDULE ID ------" + id)

                        // this.newDealService.updateschedulePaymentIspaid(this.schedule, id ).subscribe({});


                        let documentTemplateId = localStorage.getItem('documentTemplateId');
                        // this.newDealService.updateAgreementPaymentStatus(payment._id,this.masterId).subscribe({});
                        clearTimeout(this.timeOut);
                        this.showLoader = false;
                        this.paymentDialogSale();
                        localStorage.removeItem('userId');
                    } else {
                        this.getKlarnaSalePaymentResponse(userId);
                    }
                }, 5000);
            });
        }


    }

    searchTimer(searchStr: string): void {
        clearTimeout(this.timer);
        const time = 10;
        this.timer = setTimeout(() => {
            this.searchFilter(searchStr);
        }, time);
    }

    searchFilter(search): any {
        debugger;
        let documentResult = [];
        this.documents.forEach(documentGroup => {
            documentGroup.title.forEach(document => {

                if (document.documentTitle.trim().toLowerCase().includes(search.toLowerCase())) {
                    documentResult.push(document);
                }

            });
        });

        documentResult = documentResult.filter(function (el) {
            return el !== null;
        });
        this.filterDocuments = this.alphabetSort(documentResult);

    }
    paymentDialogSale(): void {

        console.log('THIS IS DIALOG FOR SWISH PAYMENT ');


        let width, height;
        this.innerWidth >= 425 ? width = 400 : width = 349;
        this.innerWidth >= 425 ? height = 400 : height = 410;
        const dialogRef = this.dialog.open(DialogComponent, {
            width: width,
            height: height,
            panelClass: 'mat-dialog-container-primary',
            data: {
                header: 'Betalning klar',
                content: 'Du får ett mejl med din beställnings- och beställningsinformation.',
                action: 'Save',
                component: 'done'
            }
        });
        dialogRef.afterClosed().subscribe(result => {

            this.router.navigate(['/schedulerapp'], {
                queryParams: {
                    scheduleid: this.documentId,
                }
            });

        });
    }

    fetchDocumentList(): void {
        const value = 'Published';
        this.newDealService.getDocumentListByStatus(value,'filterAgreement').subscribe(document => {
            this.documentList = document.document;
            this.documents = this.alphabetSort(this.documentList);
            this.filterDocuments = this.alphabetSort(this.documentList);
        });
    }

    alphabetSort(documents): any {
        const sorted = documents.sort((a, b) => a.documentTitle.trim().toUpperCase().localeCompare(b.documentTitle.trim().toUpperCase()));
        const grouped = sorted.reduce((groups, dc) => {
            const letter = dc.documentTitle.trim().charAt(0).toUpperCase();
            groups[letter] = groups[letter] || [];
            groups[letter].push(dc);
            return groups;
        }, {});
        return Object.keys(grouped).map(key => ({ key, title: grouped[key] }));
    }

    openDialog(header, content, action, id, price, isMobile): void {
        // this.router.navigate(['/agreementconfirm', id]).then();
        this.router.navigate(['/userInput', id]).then();
        // let width, height;
        // this.innerWidth >= 425 ? width = 400 : width = 330;
        // this.innerWidth >= 425 ? height = 400 : height = 350;



        // const dialogRef = this.dialog.open(DialogComponent, {
        //     width: width,
        //     height: height,
        //     panelClass: 'mat-dialog-container-primary',
        //     data: {header: header, content: content, action: action, component: 'agreementList', price: price, isMobile}
        // });

        // dialogRef.afterClosed().subscribe(result => {

        //     if (result === true) {
        //         this.router.navigate(['/userInput', id]).then();
        //     }

        // });
    }

    paymentDialog(): void {


        let width, height;
        this.innerWidth >= 425 ? width = 400 : width = 349;
        this.innerWidth >= 425 ? height = 400 : height = 410;
        const dialogRef = this.dialog.open(DialogComponent, {
            width: width,
            height: height,
            panelClass: 'mat-dialog-container-primary',
            data: {
                header: 'Betalning klar',
                content: 'Du får ett mejl med din beställnings- och beställningsinformation.',
                action: 'Save',
                component: 'done'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    getTotalAmount(documentPrice: any, documentTax: any) {
        return Number(documentPrice) + Number(documentTax);
    }
}


@Component({
    selector: 'dialog-userDetail',
    templateUrl: './dialog-userDetail.html',
    styleUrls: ['./agreement-sample1.component.scss']
})
export class DialogForUserDetailComponent implements OnInit {
    @Output() pdfReturn = new EventEmitter();
    firstName: string;
    lastName: string;
    ssn: string;
    email: string;
    documentId: any;
    submitAnswer: any;
    firstname = new FormControl('', [Validators.required]);
    lastname = new FormControl('', [Validators.required]);
    Ssn = new FormControl('', [Validators.required]);
    Email = new FormControl('', [Validators.required]);

    getErrorMessage(): any {
        if (this.firstname.hasError('required') || this.lastname.hasError('required')
            || this.Ssn.hasError('required') || this.Email.hasError('required')) {
            return 'You must enter a value';
        }

        return this.firstname.hasError('Value') ? 'Not a valid value' : '';
    }

    constructor(public dialogRef: MatDialogRef<DialogForUserDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: { questionData, masterId, documentId },
        private snackBar: MatSnackBar, private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private paymentService: PaymentService,
        private newDealService: NewDealService,
        public dialog: MatDialog,) {
        this.submitAnswer = data.questionData;
    }

    ngOnInit(): void {
        this.documentId = this.data.documentId


    }


    saveUser(): void {
        let userDetail: any;
        if (!this.firstName || !this.lastName ||
            !this.ssn || !this.email) {
            this.snackBar.open('Lägg till alla fält!', 'ok');
            return;
        }
        if (!localStorage.getItem('id')) {
            userDetail = {
                _id: localStorage.getItem('id'),
                firstName: this.firstName,
                lastName: this.lastName,
                userName: this.firstName + this.lastName,
                ssn: this.ssn,
                email: this.email,
                accountType: '',
                organizationNumber: '',
                status: 'Not Register'
            };
            this.userService.updateOrAddNotRegisterUser(userDetail).subscribe(userData => {
                localStorage.setItem('guestUserId', userData[0]._id);
                localStorage.setItem('guestUserEmail', userData[0].email);
                const status = 'SaveAnswer';
                this.newDealService.submitFieldAnswer(userData[0]._id, this.submitAnswer, status).subscribe(savedData => {
                    if (savedData) {
                        localStorage.setItem('getCurrentDocumentMasterId', savedData.savedUserDocumentMaster._id);
                        localStorage.setItem('getCurrentDocumentId', this.documentId);
                        this.router.navigate(['/preview-Agreement'], {
                            queryParams: {
                                master_id: savedData.savedUserDocumentMaster._id,
                                document_id: this.documentId
                            }
                        }).then();
                        return;
                    } else {
                        return;
                    }
                });
            });

            this.dialogRef.close();
        }

    }

    click(): void {
        this.dialogRef.close();
    }


}

