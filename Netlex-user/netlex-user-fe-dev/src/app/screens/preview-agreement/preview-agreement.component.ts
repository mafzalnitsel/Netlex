import {Component, OnInit} from '@angular/core';
import {UtilService} from "../../services/util.service";
import {RouterService} from "../../services/router.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {PaymentService} from "../../services/payment.service";
import {NewDealService} from "../../services/newDeal.service";
import {DialogComponent} from "../../netlex-common/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {forkJoin} from "rxjs";
import {DialogForPaymentComponent} from "../user-input/user-input.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-preview-agreement',
    templateUrl: './preview-agreement.component.html',
    styleUrls: ['./preview-agreement.component.scss']
})
export class PreviewAgreementComponent implements OnInit {
    questionList = [];
    answer = [];

    state: string;
    documentTemplateId: string;
    status: string;
    order_id: string;
    masterId: string;

    response: any;
    timeOut: any;
    documentId: any;
    innerWidth: any;

    showLoader = false;
    question  = [];

    constructor(private utilService: UtilService, private routerService: RouterService,
                private route: ActivatedRoute, private paymentService: PaymentService,
                public dialog: MatDialog,
                private router: Router,
                private translate:TranslateService,
                private routeService: RouterService,
                private newDealService: NewDealService) {
    }

    ngOnInit(): void {
        let saveForLater = false;
        this.utilService.show();
        this.utilService.edit = false;
        this.route.queryParams.subscribe(params => {
            this.masterId = params.master_id;
            this.documentTemplateId = params.document_id;
            saveForLater = params?.saveForLater;

        });
        let path = location.pathname;
            console.log("this.masterId",this.masterId);
        if (this.masterId=='undefined' && path.includes('klarna/back')) {
            // console.log("klarna/back")
            // console.log("this.documentTemplateId",this.documentTemplateId);
            this.router.navigate(['/userInput/'+ this.documentTemplateId ], {});
            
        }

        const req1 = this.newDealService.getAnswerByMasterId(this.masterId);
        const req2 = this.newDealService.fetchFieldsByDocumentId(this.documentTemplateId);
        const results = forkJoin(req1, req2);

        results.subscribe(([fieldAnswer, fields]) => {

            var fieldAnswerList = Object.keys(fieldAnswer).map(function (it) {
                return fieldAnswer[it];
            });


            fields['fieldList'].forEach((fieldsQuestion, index) => {

                const questionAnswerObject = {question: '', answer: '', index: 0};

                questionAnswerObject.question = fieldsQuestion.fieldId.field.question;
                questionAnswerObject.answer = fieldAnswerList.filter(answer => {
                    return answer.fieldId
                        == fieldsQuestion.fieldId.field._id
                }).length > 0 ?
                    fieldAnswerList.filter(answer => {
                        return answer.fieldId
                            == fieldsQuestion.fieldId.field._id
                    })[0]['answer'] : '';
                questionAnswerObject.index = index;

                this.questionList.push(questionAnswerObject);
                if (fieldsQuestion.fieldId.subQuestion) {

                    const questionAnswerObject = {question: '', answer: '', index: 0};

                    questionAnswerObject.question = fieldsQuestion.fieldId.subQuestion?.field.question;
                    questionAnswerObject.answer = fieldAnswerList.filter(answer => {
                        return answer.fieldId
                            == fieldsQuestion.fieldId.subQuestion.field._id
                    }).length > 0 ?
                        fieldAnswerList.filter(answer => {
                            return answer.fieldId ==
                                fieldsQuestion.fieldId.subQuestion.field._id
                        })[0]['answer'] : '';

                    questionAnswerObject.index = index;

                    this.questionList.push(questionAnswerObject);
                }
            })

        });

        const userName = localStorage.getItem('firstName');
        const userId = localStorage.getItem('id');
        this.response = this.router.url;
        if (location.pathname.includes('klarna/failure' || 'klarna/cancel')) {
            this.showLoader = true;
            this.getKlarnaPaymentResponse(userId);
        }
        if (location.pathname.includes('stripe/failure' || 'stripe/cancel')) {
            this.showLoader = true;
            this.getStripePaymentResponse(userId);
        }
        if (location.pathname.includes('swish/failure' || 'swish/cancel')) {
            this.showLoader = true;
            this.getSwishPaymentResponse(userId);
        }
        if (saveForLater) {
            const dialogRef = this.dialog.open(DialogComponent, {
                width: '400px',
                height: '400px',
                panelClass: 'mat-dialog-container-primary',
                data: {
                    header: this.translate.instant('USERINPUTS.AGREEMENT_SAVE'),
                    content: this.translate.instant('USERINPUTS.AGREEMENT_CONTENT'),
                    action: this.translate.instant('USERINPUTS.SAVE'),
                    component: 'done'
                }
            });
            // dialogRef.afterClosed().subscribe(result => {
            // });
        }

    }

    getStripePaymentResponse(userId: any): any {
        if (location.pathname.includes('stripe/failure')) {
            this.showLoader = false;
            Swal.fire(
                'Betalning',
                'Stripe Betalning Failed',
                'error'
            ).then();
        }
    }

    getKlarnaPaymentResponse(userId: any): any {
        if (location.pathname.includes('klarna/failure')) {
            this.showLoader = false;
            Swal.fire(
                'Betalning',
                'klarna Betalning Failed',
                'error'
            ).then();
            return;
        }
        const pathName = location.pathname.split('/');
        const paymentDetails = {
            order_id: this.order_id,
            payment_provider: pathName[1],
            status: pathName[2],
            documentId: this.documentId,
            userId: userId ? userId : ''
        };
        this.paymentService.getPaymentDetail(paymentDetails).subscribe(payment => {
            this.timeOut = setTimeout(() => {
                this.getKlarnaPaymentResponse(userId);
            }, 5000);
        });

    }

    getSwishPaymentResponse(userId: any): any {
        if (location.pathname.includes('swish/failure')) {
            this.showLoader = false;
            Swal.fire(
                'Betalning',
                'Swish Betalning Failed',
                'error'
            ).then();
        }
    }


    editFields(index): void {
        localStorage.removeItem('documentIdToSave');
        this.state = 'edit';
        this.routerService.data = {state: this.state};
        this.routerService.editDocumentId = this.documentTemplateId;

        // let paymentStatus = localStorage.getItem('paymentIsDone');
        // console.log("paymentStatus in previwAgreement", paymentStatus)
        // this.router.navigate(['/userInput', this.documentTemplateId]);

        this.router.navigate(['/userInput', this.documentTemplateId], {
            queryParams: {
                master_id: this.masterId,
                edit: true,
                index: index
            }
        });
    }

    movePurchase(): void {
        localStorage.removeItem('documentIdToSave');

        
        this.router.navigate(['/payment'],
            {queryParams: {documentMasterId: this.masterId, documentTemplateId: this.documentTemplateId}});

        // this.agreementUnderApproval(); //Nadeem Created on (24-03-2023) Created on (28-03-2023) because no need here 
    }
    // agreementUnderApproval(): any {
    //     let width, height;
    //     this.innerWidth >= 425 ? width = 400 : width = 349;
    //     this.innerWidth >= 425 ? height = 400 : height = 350;
    //     const dialogRef = this.dialog.open(DialogComponent, {
    //         width: width,
    //         height: height,
    //         panelClass: 'mat-dialog-container-primary',
    //         backdropClass: 'backdropBackground',
    //         data: {
    //             header: 'Avtalsköp begärs',
    //             // content: 'Your agreement has been created and you will receive our email shortly',
    //             content: 'Ditt avtal har skapats och du kommer att få vårt mejl inom kort',
    //             action: 'ok'
    //             , component: 'register'
    //         }
    //     });
    //     dialogRef.afterClosed().subscribe(result => { });

    // }
    previewPage(): void {
        localStorage.removeItem('documentIdToSave');


        this.router.navigate(['/preview-pdf'],
            {queryParams: {documentMasterId: this.masterId, documentTemplateId: this.documentTemplateId}});
    }

    saveForLater(): any {
        let width, height;
        this.innerWidth >= 425 ? width = 400 : width = 349;
        this.innerWidth >= 425 ? height = 400 : height = 350;
        const dialogRef = this.dialog.open(DialogComponent, {
            width: width,
            height: height,
            panelClass: 'mat-dialog-container-primary',
            backdropClass: 'backdropBackground',
            data: {
                header: this.translate.instant('USERINPUTS.SAVEFORLATER'),
                content: this.translate.instant('USERINPUTS.SAVEFORLATER_CONTENT'),
                action: this.translate.instant('USERINPUTS.SAVE'), component: 'userInput'
            }
        });
        dialogRef.afterClosed().subscribe(result => {

            if (result === true) {
                if (!localStorage.getItem('guestUserId')) {
                                let width, height;
                                this.innerWidth >= 425 ? width = 400 : width = 349;
                                this.innerWidth >= 425 ? height = 400 : height = 410;
                                const dialogRef = this.dialog.open(DialogComponent, {
                                    width: width,
                                    height: height,
                                    panelClass: 'mat-dialog-container-primary',
                                    data: {
                                        header: this.translate.instant('USERINPUTS.AGREEMENT_SAVE'),
                                        content: this.translate.instant('USERINPUTS.AGREEMENT_CONTENT'),
                                        action: this.translate.instant('USERINPUTS.SAVE'),
                                        component: 'done'
                                    }
                                });
                                dialogRef.afterClosed().subscribe(result => {
                                });
                } else {
                    this.dialog.open(DialogForPaymentComponent, {
                        data: {
                            questionData: this.question,
                            source: 'SaveForLater',
                            documentTemplateId: this.documentId,
                            disableClose: true
                        },
                        panelClass: 'full-dialog',
                        height: '400px',
                        width: '400px'
                    });
                }
            }

        });

    }

}
