import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Constant} from '../../../constant';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
@Component({
    selector: 'app-sub-question',
    templateUrl: './sub-question.component.html',
    styleUrls: ['./sub-question.component.scss']
})
export class SubQuestionComponent implements OnInit {

    @Output() fieldType = new EventEmitter<any>();
    @Input() answerType: string;
    @Input() dropDown: string[];
    @Input() condition: any;

    text: string;
    numberValue: string;
    numberOperator: string;
    trueFalse: string;
    dateOperator: string;
    dateValue: string;
    selectedDateValue: string;
    subQuestionCondition: [{ text: string }, { conditionOperator: string }, { conditionValue: string }];
    multiSelectionListValue: string;
    all = false;
    nextDisable = true;
    enable = true;
    validateOperator = false;
    validateValue = false;

    constructor(private datePipe: DatePipe,private authService:AuthService,private api:ApiService) {}

    ngOnInit(): any {
this.checkRoleAction();
        if (this.condition) {
            this.text = this.condition[0].text;

            if (this.condition && this.condition[1].conditionOperator === 'all') {
                this.all = true;
            } else {
                this.subQuestionCondition = [{text: this.condition[0].text}, {
                    conditionOperator: this.condition[1].conditionOperator
                }, {conditionValue: this.condition[2].conditionOperator}];

                if (this.answerType === 'Nummer') {
                    this.numberOperator = this.condition[1].conditionOperator;
                    this.numberValue = this.condition[2].conditionValue;
                }

                if (this.answerType === 'Datum') {
                    this.dateOperator = this.condition[1].conditionOperator;
                    this.dateValue = this.condition[2].conditionValue;
                }

                if (this.answerType === 'Stämmer/ Stämmer inte') {
                    this.trueFalse = this.condition[2].conditionValue;
                }

                if (this.answerType === 'Flervalsalternativ') {
                    this.multiSelectionListValue = this.condition[2].conditionValue;
                }

            }

        } else {
            this.text = Constant.filled;
        }

        this.validation(this.answerType);
    }

    validation(event): void { // initial validator

        if (event === 'Text') {
            this.nextDisable = false;
        } else if (event === 'Nummer') {
            this.nextDisable = !((this.numberValue !== '' && this.numberValue !== null) && (this.numberOperator !== ''
                && this.numberOperator !== null));
        } else if (event === 'Stämmer/ Stämmer inte') {
            this.nextDisable = !(this.trueFalse !== '' && this.trueFalse !== null);
        } else if (event === 'Datum') {
            this.nextDisable = !((this.dateValue !== '' && this.dateValue !== null) && (this.dateOperator !== ''
                && this.dateOperator !== null));
        } else if (event === 'Flervalsalternativ') {
            this.nextDisable = !(this.multiSelectionListValue !== '' && this.multiSelectionListValue !== null);
        }

    }

    next(): any { // submit values and go to sub question

        if (this.text && !this.all) {
            this.subQuestionCondition = [{text: this.text}, {conditionOperator: null}, {conditionValue: null}];
        }

        if (this.numberValue) {
            this.subQuestionCondition = [{text: this.text}, {conditionOperator: this.numberOperator},
                {conditionValue: this.numberValue}];
        }

        if (this.trueFalse) {
            this.subQuestionCondition = [{text: this.text}, {conditionOperator: '='}, {conditionValue: this.trueFalse}];

        }

        if (this.dateValue) {
            this.subQuestionCondition = [{text: this.text}, {conditionOperator: this.dateOperator},
                {conditionValue: this.dateValue}];
        }

        if (this.multiSelectionListValue) {
            this.subQuestionCondition = [{text: this.text}, {conditionOperator: '='},
                {conditionValue: this.multiSelectionListValue}];
        }

        this.fieldType.emit(this.subQuestionCondition);
    }

    prev(): void { // go to main question
        this.fieldType.emit('prev');
    }

    onChangeCheckBox(event): void { // choose all operator type

        if (event.checked === true) {
            this.subQuestionCondition = [{text: null}, {conditionOperator: 'all'}, {conditionValue: null}];
        } else {
            this.subQuestionCondition = [{text: this.text}, {conditionOperator: null}, {conditionValue: null}];
        }

    }

    selectedDate(event): any { // date pipe for select date
        this.dateValue = this.datePipe.transform(event, 'yyyy-MM-dd');
    }

    dateReset(): any { // reset the date value
        this.dateValue = '';
    }
    checkRoleAction():any
    {
        let RoleID =this.authService.getroleID();
        let roleactionID=menuactionspagename.id.MAId;
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
