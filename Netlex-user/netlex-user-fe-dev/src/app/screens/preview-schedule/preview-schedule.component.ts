import { Scheduler } from './../../models/scheduler.model';
import { Component, Inject, OnInit } from '@angular/core';
import { UtilService } from "../../services/util.service";

import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { ApiService } from 'src/app/services/api.service';
import { PaymentService } from "../../services/payment.service";
import { NewDealService } from "../../services/newDeal.service";
import { DialogComponent } from "../../netlex-common/dialog/dialog.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { forkJoin } from "rxjs";
import { DialogForPaymentComponent } from "../user-input/user-input.component";
import { TranslateService } from "@ngx-translate/core";
import { DialogForUserDetailComponent } from '../agreement/agreement.component';
import { RouterService } from "../../services/router.service";
@Component({
    selector: 'app-preview-schedule',
    templateUrl: './preview-schedule.component.html',
    styleUrls: ['./preview-schedule.component.scss']
})
export class PreviewScheduleComponent implements OnInit {

    ScheduleDetails = { heading: '', dateOf: '', time: '', };
    private sub: any;
    id = '';
    heading = '';
    dateOf = '';
    time = '';
    description = '';
    language = '';
    attachment = '';
    status = '';
    userName = '';
    userEmail = '';
    userSSN = '';
    userPhoneNo = '';
    lawyer = '';
    userInputCard = true;
    currentDateNTime: any;
    currentDate: any;

    constructor(
        private utilService: UtilService,
        private api: ApiService,
        private routerService: RouterService,
        private route: ActivatedRoute,
        private routeService: RouterService,
        private paymentService: PaymentService,
        public dialog: MatDialog,
        private router: Router,
        private translate: TranslateService,

        private newDealService: NewDealService) {
    }
    ngOnInit(): void {
        this.currentDateNTime =new Date().toISOString();
        this.currentDate =new Date().toISOString().substring(0,10);
        // console.log('this.currentDateNTime',this.currentDateNTime)
        // console.log('this.currentDate',this.currentDate)
        this.userInputCard = true;


        this.sub = this.route.params.subscribe(params => {
            this.id = params.id;
            this.getscheduleData();
        });


    }
    //   ngOnInit(): void {
    //     this.heading = this.api.scheduleById(id);

    // }

    getscheduleData() {
        this.api.scheduleById(this.id)
            .subscribe(res => {
                // console.log('res', res)
                this.ScheduleDetails.heading = res.heading;
                this.ScheduleDetails.dateOf = res.dateOf;
                this.ScheduleDetails.time = res.time;

                if (res.Ispaid == 'YES') {
                    this.paymentAlreadyPaid();
                }
                else if(this.currentDateNTime>=res.statusExpireTime ||
                this.currentDate>=res.dateOf){
                    this.paymentLinkExpired();
                }


            },
                err => { }
            );
    }

    paymentAlreadyPaid() {
        const dialogRef = this.dialog.open(DialogComponent, {
            height: '400px',
            width: '400px',
            panelClass: 'mat-dialog-container-primary',
            data: {
                // header: this.translate.instant('SCHEDULER.METTING_SCHEDULED_TITLE'),
                // content: this.translate.instant('SCHEDULER.METTING_SCHEDULED_DESC'),
                header: "Redan betalat",
                content: "Du har redan betalat för detta möte.",
                component: 'register'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['/home']);
        });
        return;
    }

    paymentLinkExpired() {
        const dialogRef = this.dialog.open(DialogComponent, {
            height: '400px',
            width: '400px',
            panelClass: 'mat-dialog-container-primary',
            data: {
                // header: this.translate.instant('SCHEDULER.METTING_SCHEDULED_TITLE'),
                // content: this.translate.instant('SCHEDULER.METTING_SCHEDULED_DESC'),
                header: "Mötesschemaläggaren har löpt ut",
                content: "Tyvärr kan du inte betala för detta möte.",
                component: 'register'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['/home']);
        });
        return;
    }

    movePurchase(): void {

        this.routeService.documentId = this.id;
        localStorage.setItem('documentTemplateId', this.id);

        if (localStorage.getItem('email')) {

            localStorage.removeItem('scheduleIdToSave');
            // console.log('this.ScheduleDetails.lawyerId',this.ScheduleDetails.lawyerId)

            this.router.navigate(['/paymentNew'],
                {
                    queryParams: {
                        scheduleId: this.id,
                        // lawyerId: this.ScheduleDetails.lawyerId
                    }
                });

        }
        else {

            this.dialog.open(DialogForLoginComponent, {
                data: {

                    ScheduleId: this.id,

                },

                panelClass: 'full-dialog',
                height: '400px',
                width: '400px'
            });
            this.routeService.data = { documentId: this.id };
            this.userInputCard = true;

        }



    }






    //   ngOnInit(): void {
    //       let saveForLater = false;
    //       this.utilService.show();
    //       this.utilService.edit = false;
    //       this.route.queryParams.subscribe(params => {
    //           this.masterId = params.master_id;
    //           this.documentTemplateId = params.document_id;
    //           saveForLater = params?.saveForLater;

    //       });

    //       const req1 = this.newDealService.getAnswerByMasterId(this.masterId);
    //       const req2 = this.newDealService.fetchFieldsByDocumentId(this.documentTemplateId);
    //       const results = forkJoin(req1, req2);

    //       results.subscribe(([fieldAnswer, fields]) => {

    //           var fieldAnswerList = Object.keys(fieldAnswer).map(function (it) {
    //               return fieldAnswer[it];
    //           });


    //           fields['fieldList'].forEach((fieldsQuestion, index) => {

    //               const questionAnswerObject = {question: '', answer: '', index: 0};

    //               questionAnswerObject.question = fieldsQuestion.fieldId.field.question;
    //               questionAnswerObject.answer = fieldAnswerList.filter(answer => {
    //                   return answer.fieldId
    //                       == fieldsQuestion.fieldId.field._id
    //               }).length > 0 ?
    //                   fieldAnswerList.filter(answer => {
    //                       return answer.fieldId
    //                           == fieldsQuestion.fieldId.field._id
    //                   })[0]['answer'] : '';
    //               questionAnswerObject.index = index;

    //               this.questionList.push(questionAnswerObject);
    //               if (fieldsQuestion.fieldId.subQuestion) {

    //                   const questionAnswerObject = {question: '', answer: '', index: 0};

    //                   questionAnswerObject.question = fieldsQuestion.fieldId.subQuestion?.field.question;
    //                   questionAnswerObject.answer = fieldAnswerList.filter(answer => {
    //                       return answer.fieldId
    //                           == fieldsQuestion.fieldId.subQuestion.field._id
    //                   }).length > 0 ?
    //                       fieldAnswerList.filter(answer => {
    //                           return answer.fieldId ==
    //                               fieldsQuestion.fieldId.subQuestion.field._id
    //                       })[0]['answer'] : '';

    //                   questionAnswerObject.index = index;

    //                   this.questionList.push(questionAnswerObject);
    //               }
    //           })

    //       });

    //       const userName = localStorage.getItem('firstName');
    //       const userId = localStorage.getItem('id');
    //       this.response = this.router.url;
    //       if (location.pathname.includes('klarna/failure' || 'klarna/cancel')) {
    //           this.showLoader = true;
    //           this.getKlarnaPaymentResponse(userId);
    //       }
    //       if (location.pathname.includes('stripe/failure' || 'stripe/cancel')) {
    //           this.showLoader = true;
    //           this.getStripePaymentResponse(userId);
    //       }
    //       if (location.pathname.includes('swish/failure' || 'swish/cancel')) {
    //           this.showLoader = true;
    //           this.getSwishPaymentResponse(userId);
    //       }
    //       if (saveForLater) {
    //           const dialogRef = this.dialog.open(DialogComponent, {
    //               width: '400px',
    //               height: '400px',
    //               panelClass: 'mat-dialog-container-primary',
    //               data: {
    //                   header: this.translate.instant('USERINPUTS.AGREEMENT_SAVE'),
    //                   content: this.translate.instant('USERINPUTS.AGREEMENT_CONTENT'),
    //                   action: this.translate.instant('USERINPUTS.SAVE'),
    //                   component: 'done'
    //               }
    //           });
    //           // dialogRef.afterClosed().subscribe(result => {
    //           // });
    //       }

    //   }

    //   getStripePaymentResponse(userId: any): any {
    //       if (location.pathname.includes('stripe/failure')) {
    //           this.showLoader = false;
    //           Swal.fire(
    //               'Betalning',
    //               'Stripe Betalning Failed',
    //               'error'
    //           ).then();
    //       }
    //   }

    //   getKlarnaPaymentResponse(userId: any): any {
    //       if (location.pathname.includes('klarna/failure')) {
    //           this.showLoader = false;
    //           Swal.fire(
    //               'Betalning',
    //               'klarna Betalning Failed',
    //               'error'
    //           ).then();
    //           return;
    //       }
    //       const pathName = location.pathname.split('/');
    //       const paymentDetails = {
    //           order_id: this.order_id,
    //           payment_provider: pathName[1],
    //           status: pathName[2],
    //           documentId: this.documentId,
    //           userId: userId ? userId : ''
    //       };
    //       this.paymentService.getPaymentDetail(paymentDetails).subscribe(payment => {
    //           this.timeOut = setTimeout(() => {
    //               this.getKlarnaPaymentResponse(userId);
    //           }, 5000);
    //       });

    //   }

    //   getSwishPaymentResponse(userId: any): any {
    //       if (location.pathname.includes('swish/failure')) {
    //           this.showLoader = false;
    //           Swal.fire(
    //               'Betalning',
    //               'Swish Betalning Failed',
    //               'error'
    //           ).then();
    //       }
    //   }


    //   editFields(index): void {
    //       localStorage.removeItem('documentIdToSave');
    //       this.state = 'edit';
    //       this.routerService.data = {state: this.state};
    //       this.routerService.editDocumentId = this.documentTemplateId;


    //       // this.router.navigate(['/userInput', this.documentTemplateId]);

    //       this.router.navigate(['/userInput', this.documentTemplateId], {
    //           queryParams: {
    //               master_id: this.masterId,
    //               edit: true,
    //               index: index
    //           }
    //       });
    //   }

    //   movePurchase(): void {
    //       localStorage.removeItem('documentIdToSave');

    //       this.router.navigate(['/paymentNew'],
    //           {queryParams: {documentMasterId: this.masterId, documentTemplateId: this.documentTemplateId}});
    //   }

    //   previewPage(): void {
    //       localStorage.removeItem('documentIdToSave');


    //       this.router.navigate(['/preview-pdf'],
    //           {queryParams: {documentMasterId: this.masterId, documentTemplateId: this.documentTemplateId}});
    //   }

    //   saveForLater(): any {
    //       let width, height;
    //       this.innerWidth >= 425 ? width = 400 : width = 349;
    //       this.innerWidth >= 425 ? height = 400 : height = 350;
    //       const dialogRef = this.dialog.open(DialogComponent, {
    //           width: width,
    //           height: height,
    //           panelClass: 'mat-dialog-container-primary',
    //           backdropClass: 'backdropBackground',
    //           data: {
    //               header: this.translate.instant('USERINPUTS.SAVEFORLATER'),
    //               content: this.translate.instant('USERINPUTS.SAVEFORLATER_CONTENT'),
    //               action: this.translate.instant('USERINPUTS.SAVE'), component: 'userInput'
    //           }
    //       });
    //       dialogRef.afterClosed().subscribe(result => {

    //           if (result === true) {
    //               if (!localStorage.getItem('guestUserId')) {
    //                               let width, height;
    //                               this.innerWidth >= 425 ? width = 400 : width = 349;
    //                               this.innerWidth >= 425 ? height = 400 : height = 410;
    //                               const dialogRef = this.dialog.open(DialogComponent, {
    //                                   width: width,
    //                                   height: height,
    //                                   panelClass: 'mat-dialog-container-primary',
    //                                   data: {
    //                                       header: this.translate.instant('USERINPUTS.AGREEMENT_SAVE'),
    //                                       content: this.translate.instant('USERINPUTS.AGREEMENT_CONTENT'),
    //                                       action: this.translate.instant('USERINPUTS.SAVE'),
    //                                       component: 'done'
    //                                   }
    //                               });
    //                               dialogRef.afterClosed().subscribe(result => {
    //                               });
    //               } else {
    //                   this.dialog.open(DialogForPaymentComponent, {
    //                       data: {
    //                           questionData: this.question,
    //                           source: 'SaveForLater',
    //                           documentTemplateId: this.documentId,
    //                           disableClose: true
    //                       },
    //                       panelClass: 'full-dialog',
    //                       height: '400px',
    //                       width: '400px'
    //                   });
    //               }
    //           }

    //       });

    //   }

}




//DIALOG FOR PAYMENTCONTROL

@Component({
    selector: 'dialog-login.html',
    templateUrl: './dialog-login.html',
    styleUrls: ['./preview-schedule.component.scss']
})
export class DialogForLoginComponent implements OnInit {

    pdfSrc = '';
    paymentMethod: string;
    payeeName: string;
    documentId: string;
    paymentScreen = false;
    question: any;
    documentDetail: any;
    saveForLater = false;


    constructor(public dialogRef: MatDialogRef<DialogForLoginComponent>, @Inject(MAT_DIALOG_DATA)
    public data: { questionData, source, ScheduleId, masterId },
        // private paymentService: PaymentService, private authService: AuthService,
        private newDealService: NewDealService, public router: Router,
        public utilService: UtilService, public dialog: MatDialog) {
        this.documentId = data.ScheduleId;
        // this.question = data.questionData;

        if (this.documentId) {
            this.newDealService.getDocumentById(this.documentId).subscribe(fields => {
                this.documentDetail = fields;
            });
        }

    }

    ngOnInit(): void {

        this.utilService.show();
    }


    click(): void {
        this.dialogRef.close();
    }

    login(): void {

        // this.newDealService.submitFieldAnswer('', this.question, 'SaveAnswer').subscribe(returnData => {

        console.log('this.documentId' + this.documentId)
        this.router.navigate(['/login'], {
            queryParams: {

                scheduleid: this.documentId,

            }
        });
        //  localStorage.setItem('documentIdToSave', returnData.savedUserDocumentMaster._id);

        //  });
        this.dialogRef.close();
    }






    register(): void {

        this.router.navigate(['/register'], {
            queryParams: {
                scheduleid: this.documentId,
            }
        });
        this.dialogRef.close();
    }

    generate(): void {
        this.paymentScreen = true;
    }

    skip(): void {
        this.dialog.open(DialogForUserDetailComponent, {
            // data: {questionData: this.data.questionData, masterId: this.data.masterId, documentId: this.documentId},
            panelClass: 'full-dialog',
            height: '580px',
            width: '400px'
        });
        this.dialogRef.close();

    }

    subscribe(): void {
        const paymentDetail = {
            paymentMethod: this.paymentMethod,
            documentTitle: this.documentDetail.documentTitle,
            amount: this.documentDetail.documentPrice,
            tax: this.documentDetail.documentTax,
        };
    }

    addWaterMark(doc): void {
        const totalPages = doc.internal.getNumberOfPages();

        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setTextColor(150);
            doc.text(50, doc.internal.pageSize.height - 30, 'Netlex');
        }

        return doc;
    }
}


