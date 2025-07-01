import {Component, Inject, OnInit} from '@angular/core';
import {NyttAvtalService} from '../services/nyttavtal.service';
import Swal from 'sweetalert2';
import {AnswerOptionService} from '../services/answerOption.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxSpinnerService} from 'ngx-spinner';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constant } from 'src/constant';
import { DialogForPublishComponent } from '../nytt-avtal/nytt-avtal.component';
import { menuactionspagename } from '../models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-user-document',
    templateUrl: './user-document.component.html',
    styleUrls: ['./user-document.component.scss']
})
export class UserDocumentComponent implements OnInit {
    selectedDocumentId: string;
    documentList = [];
    documentListPublished = [];
    fieldList = [];
    fieldData: any;
    isPreviousButtonDisable = true;
    index = 0;
    userInputCard = true;
    count = 0;
    getIndex = 0;
    preview: number;
    fieldID: string;
    showLoader = false;
    answerType: string;
    answerOptionValue = [];
    conditionValue: string;
    subQuestion: string;
    answerTypeCondition: string;
    optionCondition: string;
    conditionOperator: string;
    isCurrDisplaySubQuestion = false;
    fieldId: string;
    nextBtn = true;
    isSubmit = false;
    nextFields = 5;
    previewFields = 0;
 

    userInputs: { documentFieldId: string, fieldId: string, answer: string, name: string, fieldObjectId: string,  question: string }[];
    subQuestionInputs: { documentFieldId: string, fieldId: string, answer: string, name: string, fieldObjectId: string,  question: string }[];
    documentName = new Map<string, string>();
    isValueEnteredInDocument = false;
    isValueInDocument: boolean;
    currentDocumentId: string;

    constructor(private nyttAvatlService: NyttAvtalService, private answerOption: AnswerOptionService, private snackBar: MatSnackBar,
                private spinner: NgxSpinnerService, public dialog: MatDialog
                ,private authService:AuthService,private api:ApiService) {
    }


    ngOnInit(): void {
        this.checkRoleAction();
        this.fetchDocumentList();
        this.isSubmit = false;
    }

    fetchDocumentList(): void {
        this.nyttAvatlService.getDocumentListByStatus('Published').subscribe(document => {
            this.nyttAvatlService.getDocumentListByStatus('Draft').subscribe(saveDocument => {
            const documentSort =  [...document.document, ...saveDocument.document];
            this.documentList = documentSort.sort((a, b) => a.documentTitle > b.documentTitle ? 1 : -1);
            });
        });
    }

    checkDocumentHasValue(): void{
        if (this.isValueInDocument){
            this.openDialog();
        } else {
            this.documentChange();
        }

    }


    // documentChange(): void {
    //     // this.openDialog(); 
    //     this.isSubmit = false;
    //     this.index = 0;
    //     this.isCurrDisplaySubQuestion = false;
    //     this.currentDocumentId = this.selectedDocumentId;
    //     this.nyttAvatlService.fetchFieldsByDocumentId(this.selectedDocumentId).subscribe(fields => {
    //         this.userInputs = [];
    //         this.subQuestionInputs = [];
    //         fields.fieldList = fields.fieldList.filter(field => field.fieldId != null);
    //         if (fields.fieldList.length > 0) {
    //         this.subQuestion = fields.fieldList[this.index]?.fieldId.subQuestion;
    //         if (fields.fieldList[this.index]?.fieldId.subQuestion != null) {
    //             this.conditionValue = fields.fieldList[this.index].fieldId.subQuestion.conditionValue;
    //             this.answerTypeCondition = fields.fieldList[this.index].fieldId.field.answerType;
    //             this.conditionOperator = fields.fieldList[this.index].fieldId.subQuestion.conditionOperator;
    //             this.optionCondition = fields.fieldList[this.index].fieldId.subQuestion.optionText;
    //         }
    //         this.fieldList = fields.fieldList;
    //         this.userInputs.push({
    //             documentFieldId: this.fieldList[0]._id,
    //             fieldId: this.fieldList[0].fieldId._id,
    //             answer: '',
    //             name: this.fieldList[0].fieldId.field.name,
    //             fieldObjectId: this.fieldList[0].fieldId.field._id,
    //         });
    //         this.subQuestionInputs.push({
    //             documentFieldId: this.fieldList[0]._id,
    //             fieldId: this.fieldList[0].fieldId.subQuestion?.field._id,
    //             answer: '',
    //             name: this.fieldList[0].fieldId.subQuestion?.field.name,
    //             fieldObjectId: this.fieldList[0].fieldId.subQuestion?.field._id,
    //         });
    //         this.fieldID = this.fieldList[this.index].fieldId.field._id;
    //         this.answerType = this.fieldList[this.index].fieldId.field.answerType;
    //         this.fieldList[this.index].isMainQuestion = true;
    //         } else {
    //             this.isSubmit = true;
    //         }

    // documentChange(): void {
    //     // this.openDialog(); 
    //     this.isSubmit = false;
    //     this.index = 0;
    //     this.isCurrDisplaySubQuestion = false;
    //     this.currentDocumentId = this.selectedDocumentId;
    //     this.nyttAvatlService.fetchFieldsByDocumentId(this.selectedDocumentId).subscribe(fields => {
    //         this.userInputs = [];
    //         this.subQuestionInputs = [];
    //         fields.fieldList = fields.fieldList.filter(field => field.fieldId != null);
    //         if (fields.fieldList.length > 0) {
    //         this.subQuestion = fields.fieldList[this.index]?.fieldId.subQuestion;
    //         if (fields.fieldList[this.index]?.fieldId.subQuestion != null) {
    //             this.conditionValue = fields.fieldList[this.index].fieldId.subQuestion.conditionValue;
    //             this.answerTypeCondition = fields.fieldList[this.index].fieldId.field.answerType;
    //             this.conditionOperator = fields.fieldList[this.index].fieldId.subQuestion.conditionOperator;
    //             this.optionCondition = fields.fieldList[this.index].fieldId.subQuestion.optionText;
    //         }
    //         this.fieldList = fields.fieldList;
    //         this.userInputs.push({
    //             documentFieldId: this.fieldList[0]._id,
    //             fieldId: this.fieldList[0].fieldId._id,
    //             answer: '',
    //             name: this.fieldList[0].fieldId.field.name,
    //             fieldObjectId: this.fieldList[0].fieldId.field._id,
    //         });
    //         this.subQuestionInputs.push({
    //             documentFieldId: this.fieldList[0]._id,
    //             fieldId: this.fieldList[0].fieldId.subQuestion?.field._id,
    //             answer: '',
    //             name: this.fieldList[0].fieldId.subQuestion?.field.name,
    //             fieldObjectId: this.fieldList[0].fieldId.subQuestion?.field._id,
    //         });
    //         this.fieldID = this.fieldList[this.index].fieldId.field._id;
    //         this.answerType = this.fieldList[this.index].fieldId.field.answerType;
    //         this.fieldList[this.index].isMainQuestion = true;
    //         } else {
    //             this.isSubmit = true;
    //         }


    //      });
    //  }
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
    // onNext(): any { 
    //     this.isValueInDocument = true;
    //     // Call function and store the result local variable
    //     // Check for Last record
    //     if (this.fieldList[this.index + 1]?.fieldId.field == null) {
    //         if (this.fieldList[this.index]?.fieldId.subQuestion == null ||
    //         this.isCurrDisplaySubQuestion) {
    //             this.isSubmit = true;
    //             this.nextBtn = false;
    //             return;
    //         } else {
    //             // to add new function
    //             const isSubQuestionEligible = this.checkSubQuestionEligibility();
    //             if (!isSubQuestionEligible) {
    //                 this.subQuestionInputs[this.index].answer = '';
    //                 this.isSubmit = true;
    //                 this.nextBtn = false;
    //                 return;
    //             } else {
    //                 this.subQuestionInputs[this.index].answer = '';
    //                 this.displaySubQuestion();
    //                 return;
    //             }


    //         }
    //     } else {
    //         if ((this.fieldList[this.index].fieldId.subQuestion != null && this.isCurrDisplaySubQuestion)
    //             || (this.fieldList[this.index]?.fieldId.subQuestion == null)) {
    //             this.userInput();
    //             this.index = this.index + 1;
    //             this.isCurrDisplaySubQuestion = false;
    //             return;
    //         } else {
    //            this.displaySubQuestion();
    //            return;
    //         }
    //     }
    // }

    // userInput(): void{ // Initialize the next user input.

    //     if (!this.userInputs[this.index + 1]) {
    //         this.userInputs.push({
    //             documentFieldId: this.fieldList[this.index + 1]?._id,
    //             fieldId: this.fieldList[this.index + 1]?.fieldId._id,
    //             answer: '',
    //             name: this.fieldList[this.index + 1]?.fieldId.field.name,
    //             fieldObjectId: this.fieldList[this.index + 1].fieldId.field._id,
    //         });
    //     }

    //     if (!this.subQuestionInputs[this.index + 1]) {
    //         this.subQuestionInputs.push({
    //             documentFieldId: this.fieldList[this.index + 1]?._id,
    //             fieldId: this.fieldList[this.index + 1]?.fieldId.subQuestion?.field._id,
    //             answer: '',
    //             name: this.fieldList[this.index + 1]?.fieldId.subQuestion?.field.name,
    //             fieldObjectId: this.fieldList[this.index + 1].fieldId.subQuestion?.field._id,
    //         });
    //     }
    // }

    userInput(): void { // Initialize the next user input.
        if (!this.userInputs[this.index + 1]){
            if (!this.userInputs[this.getIndex + 1]) {
                this.userInputs.push({
                    documentFieldId: this.fieldList[this.getIndex + 1]?._id,
                    fieldId: this.fieldList[this.getIndex + 1]?.fieldId._id,
                    answer: '',
                    name: this.fieldList[this.getIndex + 1]?.fieldId.field.name,
                    fieldObjectId: this.fieldList[this.getIndex + 1]?.fieldId.field._id,
                   // userId: localStorage.getItem('id'),
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

                   // userId: localStorage.getItem('id'),

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
               // userId: localStorage.getItem('id'),
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

              //  userId: localStorage.getItem('id'),

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


    documentChange(): void {
        // this.openDialog();
        this.index = 0;
        this.count = 0;
        this.isCurrDisplaySubQuestion = false;
        this.currentDocumentId = this.selectedDocumentId;
        this.userInputs = [];
        this.subQuestionInputs = [];
        this.fieldList = [];
        this.nextBtn = true;
        this.nextFields = 5;
        this.previewFields = 0;
        this.nyttAvatlService.fetchFieldsByDocumentId(this.selectedDocumentId).subscribe(fields => {

            this.userInputs = [];
            this.subQuestionInputs = [];

            fields.fieldList.forEach((filedListData, index) => {

                this.userInputs.push({
                    documentFieldId: filedListData._id,
                    fieldId: filedListData.fieldId._id,
                    answer: '',
                    name: filedListData.fieldId.field.name,
                    fieldObjectId: filedListData.fieldId.field._id,
                    //userId: localStorage.getItem('_id'),
                    question: filedListData.fieldId.field.questionList,
                });

                this.subQuestionInputs.push({
                    documentFieldId: filedListData._id,
                    fieldId: filedListData.fieldId.subQuestion ? filedListData.fieldId.subQuestion?.field._id : '',
                    answer: '',
                    name: filedListData.fieldId.subQuestion ? filedListData.fieldId.subQuestion?.field.name : null,
                    fieldObjectId: filedListData.fieldId.subQuestion ?
                        filedListData.fieldId.subQuestion?.field._id : '',
                   // userId: localStorage.getItem('_id'),
                    question: filedListData.fieldId.subQuestion?.field.questionList,
                });
                this.fieldList.push(filedListData);
                this.fieldList[index].isMainQuestion = true;
            });
            this.nextFields = fields.fieldList.length;

            if (fields.fieldList != null && fields.fieldList.length > 0) {

               // if (fields.fieldList.length <= 3) {
                    this.isSubmit = true;
                    this.nextBtn = false;
               // }
            } else {
                this.isSubmit = true;
                this.nextBtn = false;
            }
        });
    }


    // onPrev(): any { // On click prev button
    //     if (this.index > 0) {
    //         if (this.isCurrDisplaySubQuestion) { // To check current question is sub question.
    //             this.isCurrDisplaySubQuestion = false;
    //             this.fieldList[this.index].isSubQuestionEligible = false; // To Display the main Question
    //             return;
    //         }
    //         // Check for sub eligible
    //         if (this.fieldList[this.index - 1] && this.fieldList[this.index - 1].isSubQuestionEligible) {
    //             this.isCurrDisplaySubQuestion = true; // To indicate as sub question is displayed
    //         }
    //         this.index = this.index - 1;
    //         this.nextBtn = true;
    //         return;
    //     }
    // }

    onPrev(): any { // On click prev button
        this.nextFields = this.previewFields;
        this.previewFields = this.nextFields - 5;
        this.nextBtn = true;
        this.isSubmit = false;

        this.isPreviousButtonDisable = (this.nextFields - 5) === 0;

    }

    onNext(): any {



        this.previewFields = this.nextFields;
        this.nextFields = this.nextFields + 5;
        this.preview = 5;
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


    // onNext(): any { 
    //     this.isValueInDocument = true;
    //     // Call function and store the result local variable
    //     // Check for Last record
    //     if (this.fieldList[this.index + 1]?.fieldId.field == null) {
    //         if (this.fieldList[this.index]?.fieldId.subQuestion == null ||
    //         this.isCurrDisplaySubQuestion) {
    //             this.isSubmit = true;
    //             this.nextBtn = false;
    //             return;
    //         } else {
    //             // to add new function
    //             const isSubQuestionEligible = this.checkSubQuestionEligibility();
    //             if (!isSubQuestionEligible) {
    //                 this.subQuestionInputs[this.index].answer = '';
    //                 this.isSubmit = true;
    //                 this.nextBtn = false;
    //                 return;
    //             } else {
    //                 this.subQuestionInputs[this.index].answer = '';
    //                 this.displaySubQuestion();
    //                 return;
    //             }


    //         }
    //     } else {
    //         if ((this.fieldList[this.index].fieldId.subQuestion != null && this.isCurrDisplaySubQuestion)
    //             || (this.fieldList[this.index]?.fieldId.subQuestion == null)) {
    //             this.userInput();
    //             this.index = this.index + 1;
    //             this.isCurrDisplaySubQuestion = false;
    //             return;
    //         } else {
    //            this.displaySubQuestion();
    //            return;
    //         }
    //     }
    // }
    // userInput(): void { // Initialize the next user input.
    //     if (!this.userInputs[this.index + 1]){
    //         if (!this.userInputs[this.getIndex + 1]) {
    //             this.userInputs.push({
    //                 documentFieldId: this.fieldList[this.getIndex + 1]?._id,
    //                 fieldId: this.fieldList[this.getIndex + 1]?.fieldId._id,
    //                 answer: '',
    //                 name: this.fieldList[this.getIndex + 1]?.fieldId.field.name,
    //                 fieldObjectId: this.fieldList[this.getIndex + 1]?.fieldId.field._id,
    //                // userId: localStorage.getItem('id'),
    //                 question: this.fieldList[this.getIndex + 1].fieldId.field.questionList,
    //             });
    //         }

    //         if (!this.subQuestionInputs[this.getIndex + 1]) {
    //             this.subQuestionInputs.push({

    //                 documentFieldId: this.fieldList[this.getIndex + 1]?._id,

    //                 fieldId: this.fieldList[this.getIndex + 1]?.fieldId.subQuestion ?
    //                     this.fieldList[this.getIndex + 1]?.fieldId.subQuestion?.field._id : '',

    //                 answer: '',
    //                 name: this.fieldList[this.getIndex + 1]?.fieldId.subQuestion ?
    //                     this.fieldList[this.getIndex + 1]?.fieldId.subQuestion?.field.name : '',

    //                 fieldObjectId: this.fieldList[this.getIndex + 1]?.fieldId.subQuestion ?
    //                     this.fieldList[this.getIndex + 1]?.fieldId.subQuestion?.field._id : '',

    //                // userId: localStorage.getItem('id'),

    //                 question: this.fieldList[this.getIndex + 1].fieldId.subQuestion?.field.questionList,
    //             });
    //         }
    //     } else {
    //         this.userInputs.push({
    //             documentFieldId: this.fieldList[this.getIndex + 1]?._id,
    //             fieldId: this.fieldList[this.getIndex + 1]?.fieldId._id,
    //             answer: this.fieldData[this.getIndex + 1]?.answer,
    //             name: this.fieldList[this.getIndex + 1]?.fieldId.field.name,
    //             fieldObjectId: this.fieldList[this.getIndex + 1]?.fieldId.field._id,
    //            // userId: localStorage.getItem('id'),
    //             question: this.fieldList[this.getIndex + 1].fieldId.field.questionList,
    //         });
    //     }

    //     if (!this.subQuestionInputs[this.getIndex + 1]) {
    //         this.subQuestionInputs.push({
    //             documentFieldId: this.fieldList[this.getIndex + 1]?._id,

    //             fieldId: this.fieldList[this.getIndex + 1]?.fieldId.subQuestion ?
    //                 this.fieldList[this.getIndex + 1]?.fieldId.subQuestion?.field._id : '',

    //             answer: this.fieldData[this.getIndex + 1]?.answer,

    //             name: this.fieldList[this.getIndex + 1]?.fieldId.subQuestion ?
    //                 this.fieldList[this.getIndex + 1]?.fieldId.subQuestion?.field.name : '',

    //             fieldObjectId: this.fieldList[this.getIndex + 1]?.fieldId.subQuestion ?
    //                 this.fieldList[this.getIndex + 1]?.fieldId.subQuestion?.field._id : '',

    //           //  userId: localStorage.getItem('id'),

    //             question: this.fieldList[this.getIndex + 1].fieldId.subQuestion?.field.questionList,
    //         });
    //     }
    // }


    // userInput(): void{ // Initialize the next user input.

    //     if (!this.userInputs[this.index + 1]) {
    //         this.userInputs.push({
    //             documentFieldId: this.fieldList[this.index + 1]?._id,
    //             fieldId: this.fieldList[this.index + 1]?.fieldId._id,
    //             answer: '',
    //             name: this.fieldList[this.index + 1]?.fieldId.field.name,
    //             fieldObjectId: this.fieldList[this.index + 1].fieldId.field._id,
    //         });
    //     }

    //     if (!this.subQuestionInputs[this.index + 1]) {
    //         this.subQuestionInputs.push({
    //             documentFieldId: this.fieldList[this.index + 1]?._id,
    //             fieldId: this.fieldList[this.index + 1]?.fieldId.subQuestion?.field._id,
    //             answer: '',
    //             name: this.fieldList[this.index + 1]?.fieldId.subQuestion?.field.name,
    //             fieldObjectId: this.fieldList[this.index + 1].fieldId.subQuestion?.field._id,
    //         });
    //     }
    // }

    // displaySubQuestion(index): void {

    //     const isSubQuestionEligible = this.checkSubQuestionEligibility(index);

    //     if (isSubQuestionEligible ) {
    //         this.subQuestionInputs[this.index].answer = '';
    //         this.fieldList[this.index].isSubQuestionEligible = true;
    //         this.isCurrDisplaySubQuestion = true;
    //         this.nextBtn = true;
    //     }else{
    //         if (this.subQuestionInputs[this.index]) {
    //           this.subQuestionInputs[this.index].answer = '';
    //         }
    //         this.userInput();
    //         this.index = this.index + 1;
    //         this.isCurrDisplaySubQuestion = false;
    //         return;
    //     }
    // }

  
    

    submit(): any {
        this.showLoader = true;
        this.subQuestionInputs = this.subQuestionInputs.filter(subInputs => subInputs.fieldId != null);
        const mergedArray = [...this.userInputs, ...this.subQuestionInputs];
        const userID = localStorage.getItem('id');
        const status = 'SaveAnswer';
        this.nyttAvatlService.submitFieldAnswer(userID, mergedArray, status).subscribe(returnData => {
                this.snackBar.open('Avtal genereras framgångsrikt', 'OK');
                this.spinner.show();
                const byteArray = new Uint8Array(returnData.data);
                const blob = new Blob([byteArray], {type: 'application/pdf'});
                // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                //    // window.navigator.msSaveOrOpenBlob(blob);
                //     this.showLoader = false;
                //     this.spinner.hide();
                // } else {
                    const objectUrl = URL.createObjectURL(blob);
                    window.open(objectUrl);
                    const file = document.createElement('a');
                    file.href = objectUrl;

                    const selectedDocument = this.documentList.find(document => document._id === this.selectedDocumentId);
                    file.download = localStorage.getItem('userName') + ' - ' + selectedDocument.documentTitle;
                    this.showLoader = false;
                    file.click();
                    this.showLoader = false;
                    this.spinner.hide();
               // }
            },
            err => {
                this.snackBar.open('Avtalet genererade misslyckades', 'OK');
                console.log('error', err);
                this.spinner.hide();
            });
    }


    openDialog(): void {

       const dialogRef = this.dialog.open(DialogForPublishComponent, {
        data: {dialogType: 'documentChange'}
    });

       dialogRef.afterClosed().subscribe(result => {
            if (result === 'OK'){
                this.isValueInDocument = false;
                this.nextBtn = true;
                this.documentChange();
            }
            else {this.selectedDocumentId = this.currentDocumentId; }
        });
    }

    checkRoleAction():any
    {
        let RoleID =this.authService.getroleID();
        let roleactionID=menuactionspagename.userDocument.MAId;
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


function next(next: any, arg1: (result: any) => void) {
    throw new Error('Function not implemented.');
}
// @Component({
//     selector: 'app-dialog-publish',
//     templateUrl: 'dialog-publish.html',
//     styleUrls: ['./nytt-avtal.component.scss']
// })
// export class DialogForPublishComponent {
//     isDelete = false;

//     constructor(
//         public dialogRef: MatDialogRef<DialogForPublishComponent>,
//         @Inject(MAT_DIALOG_DATA) public data: {eventState}) {
//         data.eventState === 'publishSave' ? this.isDelete = false : this.isDelete = true ;
//     }

//     save(): void {
//         this.dialogRef.close(Constant.draft);
//     }

//     publish(): void {
//         this.dialogRef.close(Constant.published);
//     }

//     delete(event): void{
//         event ? this.dialogRef.close('delete') : this.dialogRef.close();
//     }



// }
