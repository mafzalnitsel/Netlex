import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NyttAvtalService} from 'src/app/services/nyttavtal.service';
import {Field, FieldCore, FieldOnly, SubQuestion} from '../../models/field.model';
import {AnswerTypeModel} from '../../models/answerType.model';
import {AnswerTypeService} from '../../services/answerType.service';
import {FieldService} from '../../services/field.service';
import {AnswerOptionService} from '../../services/answerOption.service';
import {CategoryService} from '../../services/category.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {Constant} from '../../../constant';
import {ActivatedRoute} from '@angular/router';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-exist-id',
    templateUrl: './existing-id.component.html',
    styleUrls: ['./existing-id.component.scss'],
})
export class ExistingIdComponent implements OnInit {
    @Input() operator: string;
    @Input() documentId: string;
    @Input() documentScreenFieldId: string;
    @Input() documentScreen = false;
    @Output() editScreenReset = new EventEmitter<string>();

    mainQuestionAnswerType: string;
    multiSelectionValue: string;
    name: string;
    question: string;
    selectedAnswerType: string;
    questionMark: string;
    placeHolder: string;
    variableType = 'global';
    multiSelectionDropDown: string[];
    condition: [{ text: string }, { conditionOperator: string }, { conditionValue: string }];
    subQuestionValues = new SubQuestion(new FieldCore('', '', '', '', '',
        []), '', '', '');
    subQuestionValuesForValidate = new SubQuestion(new FieldCore('', '', '', '', '',
        []), '', '', '');
    mainQuestionValues = new FieldCore('', '', '', '', '', []);
    answerType: AnswerTypeModel[];
    globalFields = [];
    rows: number;
    subQuestion = false;
    subQuestionValuesIsPresent = false;
    fieldOfModel: boolean;
    subQuestionLabels: boolean;
    prevDisable: boolean;
    nextDisable: boolean;
    answerOptionValues;
    selectedFieldId: string;
    fieldId: string;

    addIdFieldControl = new FormControl('', [
        Validators.required,
    ]);
    questionFieldControl = new FormControl('', [
        Validators.required,
    ]);
    answerTypeFieldControl = new FormControl('', [
        Validators.required,
    ]);
    questionMarkFieldControl = new FormControl('', [
        Validators.required,
    ]);
    placeHolderFieldControl = new FormControl('', [
        Validators.required,
    ]);

    matcher = new MyErrorStateMatcher();

    constructor(private nyttAvtalService: NyttAvtalService,
                private answerTypeService: AnswerTypeService,
                private fieldService: FieldService,
                private answerOptionService: AnswerOptionService,
                private categoryService: CategoryService,
                private snackBar: MatSnackBar,
                private spinner: NgxSpinnerService,
                private route: ActivatedRoute,private authService:AuthService,private api:ApiService) {
    }

    ngOnInit(): void {
        this.checkRoleAction();
        this.fieldOfModel = false;
        this.subQuestionLabels = false;
        this.getActiveAnswerType();
        this.prevDisable = this.nextDisable = true;
        this.getGlobalFields();

        if (this.documentScreen) {
            this.selectedFieldId = this.documentScreenFieldId;
            this.getFieldData();
        }

    }

    getGlobalFields(): void { // get and sort the global fields
        const id = undefined;
        this.nyttAvtalService.getActiveFields(id).subscribe(result => {
            this.globalFields = result.sort((a, b) => a.field.name > b.field.name ? 1 : -1);
        });
    }

    getFieldData(): void { // get global field by id
        this.fieldService.getFieldValue(this.selectedFieldId).subscribe(result => {
            if (this.documentScreen) { this.variableType = result.isGlobal; }
            this.fieldId = result.field._id;
            this.name = result.field.field.name;
            this.question = result.field.field.question;
            this.selectedAnswerType = result.field.field.answerType;
            this.placeHolder = result.field.field.placeHolder;
            this.questionMark = result.field.field.questionMark;
            result.field.field.answerValue.forEach(value => {
                if (this.multiSelectionValue) {
                    this.multiSelectionValue = this.multiSelectionValue + "\n" + value;
                } else {
                    this.multiSelectionValue = value;
                }
            })
            this.fieldsAssigner(result);
        });
    }

    fieldsAssigner(result): void { // assign values to main question and sub question array
        this.mainQuestionValues = result.field.field;
        this.subQuestionValuesForValidate = this.subQuestionValues = result.field.subQuestion;

        if (result.field?.subQuestion) {
            this.subQuestionValuesIsPresent = true;
        }

        this.documentId = result.field.documentTemplateId;
        this.condition = [{text: result.field.subQuestion?.isFilled},
            {conditionOperator: result.field.subQuestion?.conditionOperator},
            {conditionValue: result.field.subQuestion?.conditionValue}];
    }

    getActiveAnswerType(): void { // get answer types for question
        this.answerTypeService.getActiveAnswerType().subscribe(res => {
                this.answerType = res.answer;
            },
            err => {
                console.log('err', err);
            }
        );
    }

    submit(): void { // submit question and sub question if sub question present for update

        if (!this.name || !this.question ||
            !this.selectedAnswerType || !this.questionMark ||
            !this.placeHolder) {
            this.snackBar.open('Lägg till alla fält!', 'ok');
            return;
        }

        this.spinner.show();
        let fieldValues;

        if (this.subQuestionValuesIsPresent === true || this.subQuestionLabels === true) {

            if (this.selectedAnswerType === 'Flervalsalternativ') {

                if (this.multiSelectionValue !== null) {
                    this.answerOptionValues = this.multiSelectionValue.split("\n");
                }

            } else {
                this.answerOptionValues = [];
            }

            if (this.subQuestionLabels === true) {
                this.subQuestionValues = new SubQuestion(new FieldCore(this.name, this.question, this.selectedAnswerType
                    , this.placeHolder, this.questionMark, this.answerOptionValues), '', '',
                    '');
                this.subQuestionValues.isFilled = this.condition[0]?.text;
                this.subQuestionValues.conditionOperator = this.condition[1]?.conditionOperator;
                this.subQuestionValues.conditionValue = this.condition[2]?.conditionValue;
            }

            fieldValues = new Field(this.mainQuestionValues, this.subQuestionValues, this.variableType, this.documentId, this.fieldId);
        } else {

            if (this.selectedAnswerType === 'Flervalsalternativ') {

                if (this.multiSelectionValue !== null) {
                    this.answerOptionValues = this.multiSelectionValue.split("\n");
                }

            } else {
                this.answerOptionValues = [];
            }

            fieldValues = new FieldOnly(new FieldCore(this.name, this.question, this.selectedAnswerType,
                this.placeHolder, this.questionMark, this.answerOptionValues), this.variableType, this.documentId, this.fieldId);
        }

        this.fieldService.update(fieldValues).subscribe(res => {
                this.spinner.hide();
                this.snackBar.open('Uppdateringen lyckades', 'Ok');

                if (!this.documentScreen){
                    window.location.reload();
                }

            },
            err => {
                this.spinner.hide();
                this.snackBar.open('Tillagd misslyckades', 'Ok');
            }
        );
    }

    addSubQuestion(): void { // add sub question after main question

        if (!this.name || !this.question ||
            !this.selectedAnswerType || !this.questionMark ||
            !this.placeHolder) {
            this.snackBar.open('Lägg till alla fält!', 'ok');
            return;
        }

        if (this.mainQuestionValues) {

            if (this.selectedAnswerType === 'Flervalsalternativ') {
                this.answerOptionValues = this.multiSelectionValue;
                this.multiSelectionDropDown = this.multiSelectionValue.split("\n");
            }

            this.mainQuestionAnswerType = this.selectedAnswerType;
            this.mainQuestionValues = new FieldCore(this.name, this.question, this.selectedAnswerType, this.placeHolder
                , this.questionMark, this.multiSelectionDropDown);
            this.fieldOfModel = true;
            this.prevDisable = false;
            this.nextDisable = false;
        }

        this.columnReset();
        this.mainQuestionValues ? this.subQuestion = true : this.subQuestion = false;
    }

    columnReset(): void { // reset the field values
        this.name = this.question = this.questionMark = this.placeHolder = this.selectedAnswerType = '';
    }

    screenId(conditionValues): void { // maintain screen swap changes

        if (conditionValues === 'prev') {
            this.subQuestion = this.nextDisable = false;
            this.prevDisable = true;
            this.prevScreen();
        } else {
            this.prevDisable = this.subQuestion = false;
            this.nextDisable = true;
            this.condition = conditionValues;
            this.nextScreen();
        }

    }

    subQuestionAssigner(): void { // assign field values to sub question array
      if(this.subQuestionValues) {
        this.subQuestionValues.field.name = this.name;
        this.subQuestionValues.field.question = this.question;
        this.subQuestionValues.field.answerType = this.selectedAnswerType;
        this.subQuestionValues.field.placeHolder = this.placeHolder;
        this.subQuestionValues.field.questionMark = this.questionMark;
      }
    }

    prevScreen(): void { // changing the previous screen and maintain values
        this.subQuestionAssigner();

        if (this.prevDisable && !this.nextDisable) {
            this.name = this.mainQuestionValues.name;
            this.question = this.mainQuestionValues.question;
            this.selectedAnswerType = this.mainQuestionValues.answerType;
            this.placeHolder = this.mainQuestionValues.placeHolder;
            this.questionMark = this.mainQuestionValues.questionMark;
            this.subQuestionLabels = false;
        }

        if (!this.prevDisable) {
            this.subQuestion = true;
        }

    }

    nextScreen(): void { // changing the next screen and maintain values
        this.subQuestionLabels = true;

        if (this.prevDisable && !this.nextDisable) {
            this.mainQuestionAnswerType = this.selectedAnswerType;
            this.subQuestion = true;
            this.addSubQuestion();
        }

        if (this.subQuestionValues.field.name) {
            this.name = this.subQuestionValues.field.name;
            this.question = this.subQuestionValues.field.question;
            this.selectedAnswerType = this.subQuestionValues.field.answerType;
            this.placeHolder = this.subQuestionValues.field.placeHolder;
            this.questionMark = this.subQuestionValues.field.questionMark;
        }

    }

    onChangeAnswerType(): void { // reset the sub question operator and value while answer type change
        if (!this.subQuestionLabels) {
            this.condition = [{text: Constant.filled}, {conditionOperator: ''}, {conditionValue: ''}];
        }
    }

    backToAddScreen(): void{ // back to "add" screen
        this.editScreenReset.emit('back');
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
