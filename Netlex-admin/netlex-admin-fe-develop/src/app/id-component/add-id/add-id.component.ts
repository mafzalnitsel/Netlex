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
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-add-id',
    templateUrl: './add-id.component.html',
    styleUrls: ['./add-id.component.scss'],
})
export class AddIdComponent implements OnInit {
    @Input() operator: string;
    @Input() documentId: string;
    @Output() fieldReset = new EventEmitter<Field>();

    mainQuestionAnswerType: string;
    multiSelectionValue: string;
    name: string;
    question: string;
    selectedAnswerType: string;
    questionMark: string;
    placeHolder: string;
    variableType = 'local';
    multiSelectionDropDown: string[];
    condition: [{ text: string }, { conditionOperator: string }, { conditionValue: string }];
    subQuestionValues = new SubQuestion(new FieldCore('', '', '', '', '',
        []), '', '', '');
    mainQuestionValues = new FieldCore('', '', '', '', '', []);
    answerType: AnswerTypeModel[];
    rows: number;
    subQuestion = false;
    fieldOfModel: boolean;
    subQuestionLabels: boolean;
    prevDisable: boolean;
    nextDisable: boolean;
    answerOptionValues;
    global = false;

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
                private route: ActivatedRoute,
                private router: Router,private authService:AuthService,private api:ApiService) {
    }

    ngOnInit(): void {
        this.checkRoleAction();
        this.route.params.subscribe(params => {
            if (params.global) {
                this.global = params.global;
                // this.variableType = 'global';
            }
        });
        this.fieldOfModel = false;
        this.subQuestionLabels = false;
        this.getActiveAnswerType();
        this.prevDisable = this.nextDisable = true;

        if(this.global) {
            this.variableType = 'global';
        }
    }

    getActiveAnswerType(): void { // get answer types for question
        console.log("this is answer getActiveAnswerType");
        this.answerTypeService.getActiveAnswerType().subscribe(res => {
            console.log("this is answer written");
                this.answerType = res.answer;

                
            },
            err => {
                console.log('err', err);
            }
        );
    }

    submit(): void {
        if (!this.name || !this.question ||
            !this.selectedAnswerType || !this.questionMark ||
            !this.placeHolder) {
                
            this.snackBar.open('Lägg till alla fält!', 'ok');

            return;
            
        }

        this.spinner.show();
        let fieldValues;

        if (this.mainQuestionValues.name) {

            if (this.selectedAnswerType === 'Flervalsalternativ') {

                if (this.multiSelectionValue !== null) {
                    this.answerOptionValues = this.multiSelectionValue.split("\n");
                }

            } else {
                this.answerOptionValues = [];
            }

            this.subQuestionValues = new SubQuestion(new FieldCore(this.name, this.question, this.selectedAnswerType
                , this.placeHolder, this.questionMark, this.answerOptionValues), '', '',
                '');
            this.subQuestionValues.isFilled = this.condition[0]?.text;
            this.subQuestionValues.conditionOperator = this.condition[1]?.conditionOperator;
            this.subQuestionValues.conditionValue = this.condition[2]?.conditionValue;
            fieldValues = new Field(this.mainQuestionValues, this.subQuestionValues, this.variableType, '', null);
        } else {

            if (this.selectedAnswerType === 'Flervalsalternativ') {

                if (this.multiSelectionValue !== null) {
                    this.answerOptionValues = this.multiSelectionValue.split("\n");
                }

            } else {
                this.answerOptionValues = [];
            }

            fieldValues = new FieldOnly(new FieldCore(this.name, this.question, this.selectedAnswerType,
                this.placeHolder, this.questionMark, this.answerOptionValues), this.variableType, '', null);
        }

        // this.fieldService.fieldCheck(fieldValues.field.name, this.documentId, fieldValues.isGlobal).subscribe(response => {
        //
        //     if (response.msg === 'notFound') {
                this.fieldService.Create(fieldValues).subscribe(res => {
                        this.spinner.hide();


                        console.log(this.answerType);


                        this.snackBar.open('Tillagt framgångsrikt', 'ok');
                        this.fieldReset.emit(res);

                        if (res._id && this.global) {
                            this.columnReset();
                            this.subQuestionValues = new SubQuestion(new FieldCore('', '', '',
                                '', '', []), '', '', '');
                            this.mainQuestionValues = new FieldCore('', '', '', '',
                                '', []);
                            this.prevDisable = this.nextDisable = true;
                        }

                    },
                    err => {
                        this.spinner.hide();
                        this.snackBar.open('Tillagd misslyckades', 'ok');
                    }
                );
        //     } else {
        //         this.spinner.hide();
        //         this.snackBar.open('Variabeln finns redan', 'ok');
        //     }
        //
        // });

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
        this.subQuestionValues.field.name = this.name;
        this.subQuestionValues.field.question = this.question;
        this.subQuestionValues.field.answerType = this.selectedAnswerType;
        this.subQuestionValues.field.placeHolder = this.placeHolder;
        this.subQuestionValues.field.questionMark = this.questionMark;
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

    onChangeCheckBox(event): void { // select the variable is local or global
        event.checked ? this.variableType = 'global' : this.variableType = 'local';
    }

    editScreen(): void { // redirect to edit screen when global field creation
        this.router.navigate(['/existId']);
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
