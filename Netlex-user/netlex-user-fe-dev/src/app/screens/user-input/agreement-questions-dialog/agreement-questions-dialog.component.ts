import { Component, Inject, OnInit } from '@angular/core';
import { NewDealService } from '../../../services/newDeal.service';
import { AnswerOptionService } from '../../../services/answerOption.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from '../../../services/payment.service';
import { UtilService } from '../../../services/util.service';
import { DialogForUserDetailComponent } from '../../agreement/agreement.component';
import { RouterService } from "../../../services/router.service";
import { forkJoin } from "rxjs";
import { DialogComponent } from "../../../netlex-common/dialog/dialog.component";
import { TranslateService } from '@ngx-translate/core';

// export interface any {
//     documentId: string;
//     paymentIsDone: string;
//     agreementAttachmentExist: any
// }
let agreementrequestid ;
@Component({
    selector: 'app-agreement-questions-dialog',
    templateUrl: './agreement-questions-dialog.component.html',
    styleUrls: ['./agreement-questions-dialog.component.scss']
})
export class AgreementQuestionsDialogComponent implements OnInit {

    //----||---New---||----//
    otherVideoPlaying: any;
    // agreementrequestid:string
    videoPauseStart: any;
    videoStarted = false;
    // videos = [{ id: 'video1', path: 'assets/videos/video1.mp4' }, { id: 'video2', path: 'assets/videos/video1.mp4' }, { id: 'video3', path: 'assets/videos/video1.mp4' },]
    videos = [{ id: 'video1', path: 'assets/videos/video1.mp4', value: false }, { id: 'video2', path: 'assets/videos/video1.mp4', value: false },]
    // videos = [{ path: 'assets/videos/video1.mp4' }]
    videosExists = true;
    showUserInputQuestions = false;
    // showUserInputQuestions = true;
    // userInputBoxHeight = '350px';
    // documentId: string;
    // documentUnitPrice: number;
    // documentTax: number;
    // documentTitle: string;
    documentDescription: string;
    documentTotal: number;
    documentTitleWords: number;
    agreementAttachmentExist: any;
    //----||---New---||----//
    selectedDocumentId: string;
    documentList = [];
    fieldList = [];
    index = 0;
    pdfSrc: string;
    pdf: string;
    documentId: string;
    paymentIsDone: string;
    afterQuestionRoute: any;
    locationParams: any;
    fieldID: string;
    getIndex = 0;
    answerType: string;
    conditionValue: string;
    subQuestion: string;
    klarnaBtn = 'btn-default';
    stripeBtn = 'btn-default';
    swishBtn = 'btn-default';
    conditionOperator: string;
    isCurrDisplaySubQuestion = false;
    fieldId: string;
    nextBtn = true;
    isSubmit = true;
    isPreviousButtonDisable = true;
    userInputCard = true;
    paymentCard = false;
    question: any;
    nextFields = 100;
    previewFields = 0;
    paymentMethod: string;
    previewPdf = false;
    fieldData: any;
    paymentMethodNav = false;
    documentUnitPrice: number;
    documentTax: number;
    documentTitle: string;
    documentPrice: number;
    state: string;
    isDisable = true;
    showLoader = false;
    innerWidth: any;
    masterId: string;
    userInputs: {
        documentFieldId: string, fieldId: string, answer: string, name: string,
        fieldObjectId: string, userId: string, question: string
    }[];
    subQuestionInputs: {
        documentFieldId: string, fieldId: string, answer: string, name: string,
        fieldObjectId: string, userId: string, question: string
    }[];
    isValueInDocument: boolean;
    currentDocumentId: string;
    count = 0;
    subQuestionAnswer = [];
    preview: number;
    i: any;
    isEdit = false;
    purchaseRequest = false;

    constructor(public dialogRef: MatDialogRef<AgreementQuestionsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public incomingUserInputs: any, private authService: AuthService, private newDealService: NewDealService,
        private answerOption: AnswerOptionService, private snackBar: MatSnackBar,
        private route: ActivatedRoute, private utilService: UtilService,
        private paymentService: PaymentService,
        private routeService: RouterService,
        private router: Router, public dialog: MatDialog,
        private translate: TranslateService) {
            console.log('incomingUserInputs,incomingUserInputs',incomingUserInputs)
    }

    ngOnInit(): void {
        // var str = "your long";
        // var wordCount = str.match(/(\w+)/g).length;
        // alert(wordCount);
        agreementrequestid = this.incomingUserInputs.AgreementRequestID
        console.log('agreementrequestid',agreementrequestid)
        this.userInputCard = true;
        this.paymentCard = false;
        this.previewPdf = false;
        this.paymentMethodNav = false;
        this.utilService.show();
        this.utilService.edit = false;

        let isEdit = false;
       const masterid= localStorage.getItem('master_id')
       const edit= JSON.parse(localStorage.getItem('edit'))
       console.log('masterid',masterid)
        console.log('edit',edit)
        this.route.params.subscribe(params => {
            console.log('params',params)
            this.documentId = params?._id;
            this.documentId = this.incomingUserInputs.documentId;

            this.paymentIsDone = this.incomingUserInputs.paymentIsDone;
            // this.agreementAttachmentExist = this.incomingUserInputs.agreementAttachmentExist;
            this.agreementAttachmentExist = localStorage.getItem('agreementAttachmentExist');

            console.log("this.documentId", this.documentId)
            console.log("this.paymentIsDone", this.paymentIsDone)
            console.log('params in questions modal', params)
            console.log("agreementAttachmentExist in questions modal", this.agreementAttachmentExist);

            // console.log('this.router.url',this.router.url);
            this.afterQuestionRoute = this.router.url.split('?')[0];
            console.log('this.afterQuestionRoute', this.afterQuestionRoute);

            // console.log("this.documentId", this.documentId)
        });
        this.route.queryParams.subscribe(params => {
            this.locationParams = params
        });
        this.route.queryParams.subscribe(params => {
            console.log('paramsparams',params)
            isEdit = params?.edit || edit;
            this.isEdit = params?.edit || edit;
            this.masterId = params?.master_id || masterid;

        });
        if (this.documentId) {
            // this.newDealService.getDocumentById(this.documentId).subscribe(fields => {
            //     this.documentTitle = fields.documentTitle;
            //     this.documentPrice = Number(fields.documentPrice);
            //     this.documentUnitPrice = Number(fields.documentPrice);
            //     this.documentTax = Number(fields.documentTax);
            // });
            this.newDealService.getDocumentById(this.documentId).subscribe(fields => {
                // debugger;
                this.documentTitle = fields.documentTitle;
                this.documentDescription = fields.documentDescription;
                this.documentPrice = Number(fields.documentPrice);
                this.documentUnitPrice = Number(fields.documentPrice);
                this.documentTax = Number(fields.documentTax);
                this.documentTotal = Number(fields.documentPrice) + Number(fields.documentTax);
                //Count words
                var str = this.documentTitle;
                this.documentTitleWords = str.match(/(\w+)/g).length;
                // alert(this.documentTitleWords);
            });
        }

        if (isEdit) {
            console.log("AAA")
            this.existDocumentDetails(this.documentId);
        } else {
            console.log("BB")
            // this.existDocumentDetails(this.documentId);
            this.documentChange(this.documentId);
        }

        // if (this.routeService.data) {
        //     this.stateWiseShow(this.routeService.data.state);
        // }

        this.utilService.show();//New

    }
    //--------||-------New-------||--------//
    showUserInputsHandler() {
        this.showUserInputQuestions = true;
    }
    videoPlayPause() {
        // var myVideo: any = document.getElementById("my_video_1");
        this.videoPauseStart = document.getElementById("my_video_1");
        // if (this.videoPauseStart.paused) {
        //   this.videoPauseStart.play();
        //   this.videoStarted = true;
        // }
        // else {
        //   this.videoPauseStart.pause();
        //   this.videoStarted = false;
        // };
    }
    onVideoHoverHandler(event, id) {
        // console.log("event", event.type)
        // console.log("id", id)
        // this.videos.map((x, i) => {
        //     if (x.id === id) {
        //         this.videos[i].value = true
        //     }
        //     else {
        //         this.videos[i].value = false
        //     }
        // })
        const newId = this.videos.find(x => x.id !== id).id
        this.otherVideoPlaying = document.getElementById(newId);
        this.videoPauseStart = document.getElementById(id);
        if (event.type === 'mouseover') {
            // this.videoPauseStart = document.getElementById(id);
            this.videoPauseStart.setAttribute("controls", "controls")
            this.videoStarted = true;
            this.videos.find(x => x.id === id).value = true;
            // this.videos.find(x => x.id !== id).value = false;
            if (!this.videoPauseStart.paused) {
                if (!this.otherVideoPlaying.paused) {
                    // console.log('otherPlaying')
                    this.otherVideoPlaying.pause();
                }
            }
        }
        else if (event.type === 'mouseout') {
            // this.videoPauseStart = document.getElementById(id);
            this.videoPauseStart.removeAttribute("controls");
            if (this.videoPauseStart.paused) {
                this.videoStarted = false;
                // this.videos.find(x => x.id === id).value = false;
                this.videos.find(x => x.id === id).value = false;
            }
            if (!this.videoPauseStart.paused) {
                if (!this.otherVideoPlaying.paused) {
                    // console.log('otherPlaying')
                    this.otherVideoPlaying.pause();
                }
            }
            // this.videoStarted = false;
        }


        // console.log("newId",newId)
    }
    openUserInputsDialog(showLawyerDetails) {
        // console.log("lawyerId", lawyerId);
        const dialogRef = this.dialog.open(AgreementQuestionsDialogComponent, {
            height: '85%',
            width: '60%',
            panelClass: 'mat-dialog-container-primary',
            disableClose: true,
            data: {
                //   eventIdToView : this.eventId
                showLawyerDetails: showLawyerDetails
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            // this.scheduleMeetingRedirect(showLawyerDetails._id);
            // const scheduleMeetingOrNot = localStorage.getItem("ScheduleWithLawyerId")
            // localStorage.setItem("ScheduleWithLawyerId", '')
            // if (scheduleMeetingOrNot !== '') {
            //   // console.log("scheduleMeetingOrNot",scheduleMeetingOrNot)
            //   this.router.navigate(['/scheduler'], {
            //     queryParams: {
            //       lawyerId: showLawyerDetails._id
            //     }
            //   });
            // }
        });
    }
    //--------||-------New-------||--------//

    existDocumentDetails(documentTemplateId): void {
        const masterid= localStorage.getItem('master_id')
        const edit= localStorage.getItem('edit')
        const index = Number(localStorage.getItem('index'))

        if (index != 0) {
            if (((Number(index)) % 200) === 0) {
                this.nextFields = index;
                this.previewFields = index - 200;
            } else if (((Number(index) + 1) % 200) === 0) {

                this.nextFields = Number(index) + 200;
                this.previewFields = Number(index) - 200;
            } else if (((Number(index) + 2) % 3) === 0) {

                this.nextFields = Number(index) + 200;
                this.previewFields = Number(index) - 200;
            }

        } else {

            this.nextFields = 200;
            this.previewFields = 0;
        }

        const req1 = this.newDealService.fetchFieldsByDocumentId(documentTemplateId);
        const req3 = this.newDealService.getAnswerByMasterId(masterid);

        const results = forkJoin(req1, req3);

        this.userInputs = [];
        this.subQuestionInputs = [];
console.log('results',results)
        results.subscribe(([fields, answers]) => {

            this.fieldData = answers;

            fields['fieldList']?.forEach((filedListData, index) => {
                this.userInputs.push({
                    documentFieldId: filedListData._id,
                    fieldId: filedListData.fieldId._id,

                    answer: this.fieldData.filter(answer => {
                        return answer.fieldId == filedListData.fieldId.field._id
                    })
                        ? this.fieldData.filter(answer => {
                            return answer.fieldId == filedListData.fieldId.field._id
                        })[0]['answer'] : '',

                    name: filedListData.fieldId.field.name,
                    fieldObjectId: filedListData.fieldId.field._id,
                    userId: localStorage.getItem('id'),
                    question: filedListData.fieldId.field.questionList,
                });

                if (filedListData.fieldId.subQuestion?.field._id) {
                    this.subQuestionAnswer = this.fieldData.filter(subInputs => subInputs.fieldId ===
                        filedListData.fieldId.subQuestion?.field._id);

                }

                this.subQuestionInputs.push({
                    documentFieldId: filedListData._id,

                    fieldId: filedListData.fieldId.subQuestion
                        ? filedListData.fieldId.subQuestion?.field._id : '',

                    // answer: '',

                    answer: filedListData.fieldId.subQuestion ? this.fieldData.filter(answer => {
                        return answer.fieldId ==
                            filedListData.fieldId.subQuestion?.field._id
                    }) ?
                        this.fieldData.filter(answer => {
                            return answer.fieldId ==
                                filedListData.fieldId.subQuestion?.field._id
                        })[0]['answer'] : '' : '',

                    name: filedListData.fieldId.subQuestion ? filedListData.fieldId.subQuestion?.field.name : '',

                    fieldObjectId: filedListData.fieldId.subQuestion ?
                        filedListData.fieldId.subQuestion?.field._id : '',

                    userId: localStorage.getItem('id'),
                    question: filedListData.fieldId.subQuestion?.field.questionList,
                });
                this.fieldList.push(filedListData);
                this.fieldList[index].isMainQuestion = true;
            });

            this.isPreviousButtonDisable = false;

            if (this.nextFields >= this.fieldList.length) {
                this.isSubmit = true;
                this.nextBtn = false;
                this.isPreviousButtonDisable = false;
            }

            if (this.previewFields === 0) {
                this.isPreviousButtonDisable = true;
            }


        });

    }

    documentChange(documentId): void {
        // this.openDialog();
        this.index = 0;
        this.count = 0;
        this.isCurrDisplaySubQuestion = false;
        this.currentDocumentId = this.selectedDocumentId;

        this.newDealService.fetchFieldsByDocumentId(documentId).subscribe(fields => {
            console.log("fields", fields);
            this.userInputs = [];
            this.subQuestionInputs = [];

            fields.fieldList.forEach((filedListData, index) => {

                this.userInputs.push({
                    documentFieldId: filedListData._id,
                    fieldId: filedListData.fieldId._id,
                    answer: '',
                    name: filedListData.fieldId.field.name,
                    fieldObjectId: filedListData.fieldId.field._id,
                    userId: localStorage.getItem('id'),
                    question: filedListData.fieldId.field.questionList,
                });

                this.subQuestionInputs.push({
                    documentFieldId: filedListData._id,
                    fieldId: filedListData.fieldId.subQuestion ? filedListData.fieldId.subQuestion?.field._id : '',
                    answer: '',
                    name: filedListData.fieldId.subQuestion ? filedListData.fieldId.subQuestion?.field.name : null,
                    fieldObjectId: filedListData.fieldId.subQuestion ?
                        filedListData.fieldId.subQuestion?.field._id : '',
                    userId: localStorage.getItem('id'),
                    question: filedListData.fieldId.subQuestion?.field.questionList,
                });
                this.fieldList.push(filedListData);
                this.fieldList[index].isMainQuestion = true;
            });

            if (fields.fieldList != null && fields.fieldList.length > 0) {

                if (fields.fieldList.length <= 3) {
                    this.isSubmit = true;
                    this.nextBtn = false;
                }
            } else {
                this.isSubmit = true;
                this.nextBtn = false;
            }
        });

    }

    checkMainQuestion(index): any {
        const isSubQuestionEligible = this.checkSubQuestionEligibility(index);
        this.getIndex = index;
        if (!this.fieldList[index + 1]?.fieldId.field && !this.fieldList[index + 1]?.fieldId.subQuestion) {
            this.isSubmit = true;
            this.nextBtn = false;
        }
        if (!isSubQuestionEligible) {
            this.fieldList[index].isSubQuestionEligible = false;
            this.subQuestionInputs[index].answer = '';
            return;
        } else {
            this.subQuestionInputs[index].answer = '';
            this.displaySubQuestion();
            return;
        }
    }

    onPrev(): any { // On click prev button
        this.nextFields = this.previewFields;
        this.previewFields = this.nextFields - 3;
        this.nextBtn = true;
        this.isSubmit = false;

        this.isPreviousButtonDisable = (this.nextFields - 3) === 0;

    }

    onNext(): any {


        this.previewFields = this.nextFields;
        this.nextFields = this.nextFields + 3;
        this.preview = 3;
        this.isValueInDocument = true;
        // Call function and store the result local variable
        // Check for Last record

        this.isPreviousButtonDisable = false; // by default on  click change the previous button to visible

        if (this.nextFields >= this.fieldList.length) {
            this.isSubmit = true;
            this.nextBtn = false;
            return;
        } else {
            if (this.previewFields) {

            }
            if ((this.fieldList[this.getIndex].fieldId.subQuestion != null && this.isCurrDisplaySubQuestion)
                || (this.fieldList[this.getIndex]?.fieldId.subQuestion == null)) {
                this.userInput();
                this.isCurrDisplaySubQuestion = false;
                return;
            } else {
                this.displaySubQuestion();
                return;
            }
        }
    }

    userInput(): void { // Initialize the next user input.
        if ('/userInput/' + this.documentId && !localStorage.getItem('documentData')) {
            if (!this.userInputs[this.getIndex + 1]) {
                this.userInputs.push({
                    documentFieldId: this.fieldList[this.getIndex + 1]?._id,
                    fieldId: this.fieldList[this.getIndex + 1]?.fieldId._id,
                    answer: '',
                    name: this.fieldList[this.getIndex + 1]?.fieldId.field.name,
                    fieldObjectId: this.fieldList[this.getIndex + 1]?.fieldId.field._id,
                    userId: localStorage.getItem('id'),
                    question: this.fieldList[this.getIndex + 1].fieldId.field.questionList,
                });
            }

            if (!this.subQuestionInputs[this.getIndex + 1]) {
                this.subQuestionInputs.push({

                    documentFieldId: this.fieldList[this.getIndex + 1]?._id,

                    fieldId: this.fieldList[this.getIndex + 1]?.fieldId.subQuestion ?
                        this.fieldList[this.getIndex + 1]?.fieldId.subQuestion?.field._id : '',

                    answer: '',
                    name: this.fieldList[this.getIndex + 1]?.fieldId.subQuestion ?
                        this.fieldList[this.getIndex + 1]?.fieldId.subQuestion?.field.name : '',

                    fieldObjectId: this.fieldList[this.getIndex + 1]?.fieldId.subQuestion ?
                        this.fieldList[this.getIndex + 1]?.fieldId.subQuestion?.field._id : '',

                    userId: localStorage.getItem('id'),

                    question: this.fieldList[this.getIndex + 1].fieldId.subQuestion?.field.questionList,
                });
            }
        } else {
            this.userInputs.push({
                documentFieldId: this.fieldList[this.getIndex + 1]?._id,
                fieldId: this.fieldList[this.getIndex + 1]?.fieldId._id,
                answer: this.fieldData[this.getIndex + 1]?.answer,
                name: this.fieldList[this.getIndex + 1]?.fieldId.field.name,
                fieldObjectId: this.fieldList[this.getIndex + 1]?.fieldId.field._id,
                userId: localStorage.getItem('id'),
                question: this.fieldList[this.getIndex + 1].fieldId.field.questionList,
            });
        }

        if (!this.subQuestionInputs[this.getIndex + 1]) {
            this.subQuestionInputs.push({
                documentFieldId: this.fieldList[this.getIndex + 1]?._id,

                fieldId: this.fieldList[this.getIndex + 1]?.fieldId.subQuestion ?
                    this.fieldList[this.getIndex + 1]?.fieldId.subQuestion?.field._id : '',

                answer: this.fieldData[this.getIndex + 1]?.answer,

                name: this.fieldList[this.getIndex + 1]?.fieldId.subQuestion ?
                    this.fieldList[this.getIndex + 1]?.fieldId.subQuestion?.field.name : '',

                fieldObjectId: this.fieldList[this.getIndex + 1]?.fieldId.subQuestion ?
                    this.fieldList[this.getIndex + 1]?.fieldId.subQuestion?.field._id : '',

                userId: localStorage.getItem('id'),

                question: this.fieldList[this.getIndex + 1].fieldId.subQuestion?.field.questionList,
            });
        }

    }


    displaySubQuestion(): void {

        const isSubQuestionEligible = this.checkSubQuestionEligibility(this.getIndex);

        if (isSubQuestionEligible) {
            this.subQuestionInputs[this.getIndex].answer = '';
            this.fieldList[this.getIndex].isSubQuestionEligible = true;
            this.isCurrDisplaySubQuestion = true;
        } else {
            this.subQuestionInputs[this.getIndex].answer = '';
            this.userInput();
            this.index = this.index + 1;
            this.isCurrDisplaySubQuestion = false;
            return;
        }
    }

    checkSubQuestionEligibility(index): boolean {
        const fieldValue = this.fieldList[index].fieldId;
        if (fieldValue.subQuestion == null) {
            return false;
        }
        if (fieldValue?.subQuestion.conditionValue === 'all') {
            return true;
        }
        if (fieldValue.subQuestion.optionText === 'Tom') {
            if (this.userInputs[index]?.answer &&
                this.userInputs[index]?.answer.toString().trim() !== '') {
                return false;
            } else {
                return true;
            }
        }
        if (fieldValue.field.answerType === 'Text') {
            if (this.userInputs[index]?.answer && this.userInputs[index]?.answer.toString().trim() !== '') {
                return true;
            } else {
                return false;
            }
        }
        let operator = fieldValue.subQuestion.conditionOperator;
        if (operator === '=') {
            operator = '===';
        }
        return eval('"' + this.userInputs[index]?.answer + '" ' + operator
            + ' "' + fieldValue.subQuestion.conditionValue + '" ');


    }

    // navToPaymentScreen(): void {
    //     this.paymentMethodNav = false;
    //     this.paymentCard = true;
    // }
    //
    // navToPaymentMethod(): void {
    //     this.paymentMethodNav = true;
    //     this.paymentCard = false;
    // }

    // payment(): void {
    //     this.showLoader = true;
    //     const paymentDetail = {
    //         paymentMethod: this.paymentMethod,
    //         documentTitle: this.documentTitle,
    //         amount: this.documentPrice,
    //         tax: this.documentTax,
    //         documentId: this.documentId,
    //         masterId: this.masterId
    //     };
    //     this.paymentService.paymentApi(paymentDetail).subscribe(returnData => {
    //         this.showLoader = false;
    //         window.location.href = returnData.redirect_url;
    //
    //     }, err => {
    //         console.log('error', err);
    //         // this.spinner.hide();
    //     });
    // }

    saveForLater(): any {
        this.subQuestionInputs = this.subQuestionInputs.filter(subInputs => subInputs.fieldId != null);
        this.question = [...this.userInputs, ...this.subQuestionInputs];
        localStorage.getItem('id');

        let width, height;
        this.innerWidth >= 425 ? width = 400 : width = 349;
        this.innerWidth >= 425 ? height = 400 : height = 350;
        const dialogRef = this.dialog.open(DialogComponent, {
            width: width,
            height: height,
            panelClass: 'mat-dialog-container-primary',
            backdropClass: 'backdropBackground',
            data: {
                header: this.translate.instant('USERINPUTS.SAVEFORLATER'), content: this.translate.instant('USERINPUTS.SAVEFORLATER_CONTENT'),
                action: this.translate.instant('USERINPUTS.SAVE'), component: 'userInput'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
        this.dialogRef.close();
            if (result === true) {
                if (localStorage.getItem('email' || 'firstName')) {
                    this.subQuestionInputs = this.subQuestionInputs.filter(subInputs => subInputs.fieldId != null);
                    const mergedArray = [...this.userInputs, ...this.subQuestionInputs];
                    const userID = localStorage.getItem('id');
                    const status = 'SaveForLater';
                    console.log('this.subQuestionInputs',this.subQuestionInputs)
                    console.log('mergedArray',mergedArray)
                    if (this.routeService.editDocumentId) {
                        this.newDealService.updateAnswer(userID, mergedArray, status, this.routeService.editDocumentId, '', this.masterId, false).subscribe(returnData => {
                            if (returnData) {
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
                            }
                        });
                    } else {
                        console.log('fdsdgdhfgklhd')
                        this.newDealService.postSaveLaterAgrement(agreementrequestid,userID, mergedArray, status).subscribe(returnData => {
                            if (returnData) {
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
                            }
                        });
                    }

                } else {
                    this.dialog.open(DialogForPaymentComponent2, {
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
    skipQuestionsHandler(value: any) {
        // console.log("value", value)
        // console.log("manualAngleValue", this.manualAngleValue)

        // this.skipQuestion= value;
        if (value) {
            // console.log("value", value)
            // this.dialogRef.close();
            let path = location.pathname;
            console.log("path", path)
            console.log("path.includes('userInput')", path.includes('userInput'))

            if (path.includes('userInput')) {
                console.log("path includes userInput", path);
                this.dialogRef.close();
                this.skipQuestionsAndSubmit();
            } else {
                localStorage.setItem('agreementType', 'business');
                this.dialogRef.close();
            }

        }
    }
    movePurchase(): void {
        localStorage.removeItem('documentIdToSave');
        localStorage.setItem('agreementType', 'personal')
        this.router.navigate(['/payment'],
            { queryParams: { documentMasterId: this.masterId, documentTemplateId: this.documentId, agreementId: this.documentId } });
    }
    skipQuestionsAndSubmit(): any {
        this.showLoader = true;
        // console.log("All filled");
        // this.question = [...this.userInputs, ...this.subQuestionInputs];
        // this.routeService.documentId = this.documentId;
        localStorage.setItem('documentTemplateId', this.documentId);
        if (localStorage.getItem('email') || localStorage.getItem('guestUserId')) {
            this.movePurchase()
            // this.agreementGenerate();
            // this.routeService.data = { documentId: this.documentId };
            // this.userInputCard = true;
        } else {

            this.dialog.open(DialogForPaymentComponent2, {
                data: {
                    questionData: this.question,
                    source: 'SaveAnswer',
                    documentTemplateId: this.documentId,
                    masterId: this.masterId
                },
                panelClass: 'full-dialog',
                height: '400px',
                width: '400px'
            },);
            this.routeService.data = { documentId: this.documentId };

            this.userInputCard = true;
        }
        setTimeout(() => {
            this.showLoader = false;
            this.dialogRef.close();
        }, 1500)



    }
    submit(): any {
        let questionNotFilled = false;
        console.log("this.fieldList", this.fieldList)
        // console.log("this.userInputs",this.userInputs)
        // console.log("this.subQuestionInputs",this.subQuestionInputs)
        this.userInputs.forEach((ele, i) => {
            // console.log("ele",ele)
            // if(this.fieldList[i].fieldId.field.question){}
            if (ele.answer == '') {
                // console.log("empty")
                questionNotFilled = true;
                return;
            }
        });
        if (!questionNotFilled) {
            this.showLoader = true;
            // console.log("All filled");
            this.question = [...this.userInputs, ...this.subQuestionInputs];
            this.routeService.documentId = this.documentId;
            localStorage.setItem('documentTemplateId', this.documentId);
            if (localStorage.getItem('email') || localStorage.getItem('guestUserId')) {
                this.purchaseRequest = true;
                this.agreementGenerate();
                this.routeService.data = { documentId: this.documentId };
                this.userInputCard = true;
            } else {

                this.dialog.open(DialogForPaymentComponent2, {
                    data: {
                        questionData: this.question,
                        source: 'SaveAnswer',
                        documentTemplateId: this.documentId,
                        masterId: this.masterId
                    },
                    panelClass: 'full-dialog',
                    height: '400px',
                    width: '400px'
                },);
                this.routeService.data = { documentId: this.documentId };

                this.userInputCard = true;
            }
            setTimeout(() => {
                this.showLoader = false;
                this.dialogRef.close();
            }, 1000)
        }
        else {
            alert('Vänligen fyll i samtliga fält');
            questionNotFilled = false;
        }



    }

    onchangeBtn(btnClassName): void {
        if (btnClassName === 'klarnaBtn') {
            this.klarnaBtn = 'btn-change';
            this.swishBtn = 'btn-default';
            this.stripeBtn = 'btn-default';
        } else if (btnClassName === 'swishBtn') {
            this.swishBtn = 'btn-change';
            this.klarnaBtn = 'btn-default';
            this.stripeBtn = 'btn-default';
        } else {
            this.swishBtn = 'btn-default';
            this.klarnaBtn = 'btn-default';
            this.stripeBtn = 'btn-change';
        }
    }


    agreementGenerate(): void {
        // debugger
        this.subQuestionInputs = this.subQuestionInputs.filter(subInputs => subInputs.fieldId != null);
        const mergedArray = [...this.userInputs, ...this.subQuestionInputs];
        console.log("mergedArray", mergedArray)
        const userID = localStorage.getItem('id');
        const status = 'SaveAnswer';

        if (this.routeService.editDocumentId) {
            this.newDealService.updateAnswer(userID, mergedArray, status,
                this.routeService.editDocumentId, '', this.masterId, this.purchaseRequest).subscribe(returnData => {
                    console.log("this.paymentIsDone")
                    if (this.paymentIsDone) {
                        // this.router.navigate(['/preview-Agreement'], {
                        //     queryParams: {
                        //         master_id: returnData.savedUserDocumentMaster._id,
                        //         document_id: this.documentId
                        //     }
                        // });
                        console.log("this.masterId", this.masterId)
                        // localStorage.setItem('master_id',this.masterId)
                        // this.dialogRef.close();
                    }
                    else {
                        this.router.navigate(['/preview-Agreement'], {
                            queryParams: {
                                master_id: returnData.savedUserDocumentMaster._id,
                                document_id: this.documentId
                            }
                        });
                    }

                    const byteArray = new Uint8Array(returnData.pdfBuffer.data);
                    const blob = new Blob([byteArray], { type: 'application/pdf' });
                    const objectUrl = URL.createObjectURL(blob);
                    const file = document.createElement('a');
                    file.href = objectUrl;
                    this.pdf = file.href;
                    this.routeService.pdfBlob = this.pdf;
                    // const selectedDocument = this.documentList.find(document => document._id === this.selectedDocumentId);

                });
        } else {
            // this.newDealService.submitFieldAnswer(userID, mergedArray, status).subscribe(returnData => {
            this.newDealService.submitFieldAnswerNew(userID, mergedArray, status, this.purchaseRequest).subscribe(returnData => {
                // this.router.navigate(['/preview-Agreement'], {
                //     queryParams: {
                //         master_id: returnData.savedUserDocumentMaster._id,
                //         document_id: this.documentId
                //     }
                // });
                // console.log("this.paymentIsDone",this.paymentIsDone)
                if (this.paymentIsDone) {
                    // this.router.navigate(['/preview-Agreement'], {
                    //     queryParams: {
                    //         master_id: returnData.savedUserDocumentMaster._id,
                    //         document_id: this.documentId
                    //     }
                    // });
                    console.log("this.masterId", returnData.savedUserDocumentMaster._id)
                    localStorage.setItem('master_id', returnData.savedUserDocumentMaster._id)
                    console.log("this.locationParams", this.locationParams)
                    localStorage.setItem('askQuestionFirst', 'doneAfter');
                    // this.router.navigate([this.afterQuestionRoute], {
                    //     queryParams: {
                    //         document_id: this.locationParams.document_id,
                    //         master_id: returnData.savedUserDocumentMaster._id,
                    //         hppId: this.locationParams.hppId,
                    //         order_id: this.locationParams.order_id,
                    //     }
                    // });
                    this.dialogRef.close();
                }
                else {
                    this.router.navigate(['/preview-Agreement'], {
                        queryParams: {
                            master_id: returnData.savedUserDocumentMaster._id,
                            document_id: this.documentId
                        }
                    });
                }
                this.routeService.masterId = returnData.savedUserDocumentMaster._id;
                const byteArray = new Uint8Array(returnData.pdfBuffer.data);
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                const objectUrl = URL.createObjectURL(blob);
                const file = document.createElement('a');
                file.href = objectUrl;
                this.pdf = file.href;
                this.routeService.pdfBlob = this.pdf;
                // const selectedDocument = this.documentList.find(document => document._id === this.selectedDocumentId);

            });
        }

    }

    // preScreen(): void {
    //     this.router.navigate(['/preview-Agreement'], {
    //         queryParams: {
    //             master_id: this.routeService.masterId,
    //             document_id: this.documentId
    //         }
    //     });
    //     this.paymentCard = false;
    // }
    //
    // PrevBtn(): void {
    //     this.previewPdf = false;
    //     this.router.navigate(['/preview-Agreement'], {
    //         queryParams: {
    //             master_id: this.routeService.masterId,
    //             document_id: this.documentId
    //         }
    //     });
    // }

    // stateWiseShow(state): void {
    //     if (state === 'purchase') {
    //         this.paymentCard = true;
    //         this.userInputCard = false;
    //     } else if (state === 'previewPdf') {
    //         this.previewPdf = true;
    //         this.userInputCard = false;
    //         this.newDealService.getPdfBuffer(this.documentId, this.masterId).subscribe((pdfBuffer) => {
    //             const byteArray = new Uint8Array(pdfBuffer.pdfBuffer.data);
    //             const blob = new Blob([byteArray], {type: 'application/pdf'});
    //             const objectUrl = URL.createObjectURL(blob);
    //             const file = document.createElement('a');
    //             file.href = objectUrl;
    //             this.pdfSrc = file.href;
    //         });
    //
    //     }
    // }
}


@Component({
    selector: 'dialog-payment',
    templateUrl: './dialog-payment.html',
    styleUrls: ['./agreement-questions-dialog.component.scss']
})
export class DialogForPaymentComponent2 implements OnInit {

    pdfSrc = '';
    paymentMethod: string;
    payeeName: string;
    documentId: string;
    paymentScreen = false;
    question: any;
    documentDetail: any;
    saveForLater = false;


    constructor(public dialogRef: MatDialogRef<DialogForPaymentComponent2>, @Inject(MAT_DIALOG_DATA)
    public data: any,
        private paymentService: PaymentService, private authService: AuthService,
        private newDealService: NewDealService, public router: Router,
        public utilService: UtilService, public dialog: MatDialog) {
        this.documentId = data.documentTemplateId;
        this.question = data.questionData;
console.log('data',data)
        if (this.documentId) {
            this.newDealService.getDocumentById(this.documentId).subscribe(fields => {
                this.documentDetail = fields;
            });
        }

    }

    ngOnInit(): void {
        if (this.data.source === 'SaveForLater') {
            this.saveForLater = true;
        }
        this.utilService.show();
    }


    click(): void {
        this.dialogRef.close();
    }

    login(): void {
        if (localStorage.getItem('guestUserId')) {
            // this.newDealService.getAnswerByMasterId(localStorage.getItem('getCurrentDocumentMasterId')).subscribe(returnData => {
            //
            // });
            this.router.navigate(['/login'], {
                queryParams: {
                    master_id: localStorage.getItem('getCurrentDocumentMasterId'),
                    document_id: localStorage.getItem('getCurrentDocumentId'),
                    source: this.data.source
                }
            });
            this.dialogRef.close();
        } else {
            this.newDealService.submitFieldAnswer('', this.question, 'SaveAnswer').subscribe(returnData => {
                this.router.navigate(['/login'], {
                    queryParams: {
                        master_id: returnData.savedUserDocumentMaster._id,
                        document_id: this.documentId,
                        source: this.data.source
                    }
                });
                localStorage.setItem('documentIdToSave', returnData.savedUserDocumentMaster._id);

            });
            this.dialogRef.close();
        }


    }

    register(): void {
        if (localStorage.getItem('guestUserId')) {
            this.router.navigate(['/register'], {
                queryParams: {
                    master_id: localStorage.getItem('getCurrentDocumentMasterId'),
                    document_id: localStorage.getItem('getCurrentDocumentId'),
                    source: this.data.source
                }
            });
            this.dialogRef.close();
        } else {
            this.newDealService.submitFieldAnswer('', this.question, 'SaveAnswer').subscribe(returnData => {
                this.router.navigate(['/register'], {
                    queryParams: {
                        master_id: returnData.savedUserDocumentMaster._id,
                        document_id: this.documentId,
                        source: this.data.source
                    }
                });
                localStorage.setItem('documentIdToSave', returnData.savedUserDocumentMaster._id);

            });

            // localStorage.setItem('documentData', JSON.stringify(this.questionList));
            // localStorage.setItem('documentTemplateId', this.documentId);
            this.dialogRef.close();
        }

    }

    generate(): void {
        this.paymentScreen = true;
    }

    skip(): void {
        this.dialog.open(DialogForUserDetailComponent, {
            data: { questionData: this.data.questionData, masterId: this.data.masterId, documentId: this.documentId },
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
