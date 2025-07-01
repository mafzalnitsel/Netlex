import { Component, Inject, OnInit } from '@angular/core';
import { NewDealService } from '../../../services/newDeal.service';
import { AnswerOptionService } from '../../../services/answerOption.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from '../../../services/payment.service';
import { UtilService } from '../../../services/util.service';
import { RouterService } from "../../../services/router.service";
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { DialogForUserDetailComponent } from '../../agreement/agreement.component';
// import { forkJoin } from "rxjs";
// import { DialogComponent } from "../../../netlex-common/dialog/dialog.component";

export interface JavskontrollDialogIncomingData {
  agreementId: string;
  // agreementAttachmentExist: any
}

@Component({
  selector: 'app-javskontroll-questions-dialog',
  templateUrl: './javskontroll-questions-dialog.component.html',
  styleUrls: ['./javskontroll-questions-dialog.component.scss']
})
export class JavskontrollQuestionsDialogComponent implements OnInit {
  agreementId: string;
  conditionchecker= false;
  userId: string;
  showloading = false
  answer = '';
  javskonrollForm: FormGroup;  /*Disabled*/
  mainSelectOptions: any = [
    { id: 1, label: '1' }, { id: 2, label: '2' },
    { id: 3, label: '3' }, { id: 4, label: '4' },
  ];
  mainSelectId = 1;
  mainSelectValue: any = '1';
  numberOfPersons = 1;
  firstInput = '';
  inputFieldsData: any = [
    { id: 1, question1: "Ange namn", answer1: "", question2: "Ange personnummer", answer2: "", placeholder1: "Anna Andersson", placeholder2: "ååååmmddxxxx", invalidSsn: false },
    // { id: 2, question1: "Ange namn", answer1: "", question2: "Ange personnummer", answer2: "", placeholder1: "Anna Andersson", placeholder2: "ååååmmddxxxx" }
  ];
  questionsObject = {};
  numberOfQuestions: any = []
  allQuestions: any = [];
  SsnValidator = [{ invalidSsn: false }, { invalidSsn: false }, { invalidSsn: false }, { invalidSsn: false }]; //Disabled
  questionIndex = 0;
  userName = '';
  userSSN = '';
  answer1 = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  answer2 = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  answer3 = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  constructor(@Inject(MAT_DIALOG_DATA) public incomingData: JavskontrollDialogIncomingData, private authService: AuthService, private newDealService: NewDealService,
    private answerOption: AnswerOptionService, private snackBar: MatSnackBar,
    private route: ActivatedRoute, private utilService: UtilService,
    private paymentService: PaymentService,
    private routeService: RouterService,
    private router: Router, public dialog: MatDialog,
    private translate: TranslateService, public dialogRef: MatDialogRef<JavskontrollQuestionsDialogComponent>) { }

  ngOnInit(): void {
    // console.log("incomingData",this.incomingData);
    this.agreementId = this.incomingData.agreementId
    // console.log("agreementId", this.agreementId);
    this.userId = localStorage.getItem("id");
     /*Disabled*/this.javskonrollForm = new FormGroup({ /* // name: new FormControl(this.hero.name, [ Validators.required, Validators.minLength(4)  ]),*/ ssnField1: new FormControl(), });  //Disabled
    this.getAllClientsDetailsQuestion();
    this.getLoggedInUserData();
  }
  getLoggedInUserData() {
    this.newDealService.getLoggedInUserData(this.userId).subscribe((response: any) => {
      // console.log('response', response);
      this.userName = response.userName;
      this.userSSN = response.ssn;
    })
  }
  getAllClientsDetailsQuestion() {
    // console.log('reached to call');
    this.newDealService.getAllClientsDetailsQuestion().subscribe((response: any) => {
      // console.log('response.doc[0]',response.doc[0]);
      let data = response.doc;
      this.allQuestions = response.doc;
      // this.allQuestions.forEach((element: any, i: number) => {
      //   element['_id'] = i + 1;
      //   element['invalidSsn'] = false;
      //   element['answer'] = "";
      // });
      // // console.log('this.allQuestions', this.allQuestions);
      // this.inputFieldsData = [];
      // this.inputFieldsData.push({ allQuestions: this.allQuestions });
      // console.log('this.inputFieldsData', this.inputFieldsData);

      // // console.log('data', data);
      let newObj = {};
      // let numOfQuestion = [];
      // //Adding all questions objects into single object
      data.forEach((element: any, index: any) => {
        // newObj["id"] = 1;
        newObj["question" + (index + 1)] = element.question;
        newObj["answer" + (index + 1)] = "";
        newObj["placeholder" + (index + 1)] = element.placeholder;
        newObj["type" + (index + 1)] = element.type;
        newObj["invalidSsn"] = false;
        // this.numberOfQuestions.push({ inputType: element.type })
      });
      console.log('newObj', newObj);
      // console.log('this.numberOfQuestions', this.numberOfQuestions);
      this.inputFieldsData = [];
      this.inputFieldsData.push(newObj);
      // console.log('this.inputFieldsData', this.inputFieldsData);
      this.questionsObject = newObj;
      console.log('this.questionsObject', this.questionsObject);
      // // console.log('this.numberOfQuestions',this.numberOfQuestions);
      // this.inputFieldsData = [];
      // this.inputFieldsData.push(newObj);
    })
  }
  // mainSelectHandler(selectedValue: any) {
  //   // console.log("ssnField1", this.javskonrollForm.controls['ssnField1'].errors);
  //   // console.log("selectedValue", selectedValue);
  //   // console.log("Inputs values before", this.inputFieldsData);
  //   this.mainSelectId = selectedValue.id;
  //   this.inputFieldsData = [];
  //   for (let index = 0; index < selectedValue.id; index++) {
  //     // console.log("index", index);
  //     // this.inputFieldsData.push({
  //     //   id: index + 1,
  //     //   question1: "Ange namn",
  //     //   answer1: "",
  //     //   question2: "Ange personnummer",
  //     //   answer2: "",
  //     //   placeholder1: "Anna Andersson",
  //     //   placeholder2: "ååååmmddxxxx",
  //     //   invalidSsn: false
  //     // })
  //     this.inputFieldsData.push({ allQuestions: this.allQuestions })
  //   }
  //   // console.log("Inputs values after", this.inputFieldsData);
  // }
  numberOfPersonsHandler(value: any) {
    console.log('value', value);
    console.log("Inputs values before", this.inputFieldsData);
    // this.mainSelectId = selectedValue.id;
    if (value == 1) {
      this.conditionchecker = true;
      const newArray = this.inputFieldsData[0];
      this.inputFieldsData = [newArray]
    }else  if (value == 0) {
      this.inputFieldsData = []
    }else if (value > 0 && value != 1) {
      this.conditionchecker = false;
      // console.log('value12345', value);
      this.inputFieldsData = [];
      this.answer1 = [];
      console.log('this.inputFieldsData', this.inputFieldsData);
      for (let index = 0; index < value; index++) {
        // console.log("index", index);
        // this.inputFieldsData.push({
        //   id: index + 1,
        //   question1: "Ange namn",
        //   answer1: "",
        //   question2: "Ange personnummer",
        //   answer2: "",
        //   placeholder1: "Anna Andersson",
        //   placeholder2: "ååååmmddxxxx",
        //   invalidSsn: false
        // })
        // this.inputFieldsData.push({ allQuestions: this.allQuestions })
        this.answer1.push('')
        // this.inputFieldsData.push(this.questionsObject)
        this.inputFieldsData.push({
          answer1: "",
          answer2: "",
          answer3: "",
          invalidSsn: false,
          placeholder1: this.questionsObject['placeholder1'],
          placeholder2: this.questionsObject['placeholder2'],
          placeholder3: this.questionsObject['placeholder3'],
          question1: this.questionsObject['question1'],
          question2: this.questionsObject['question2'],
          question3: this.questionsObject['question3'],
          type1: this.questionsObject['type1'],
          type2: this.questionsObject['type2'],
          type3: this.questionsObject['type3'],
        })
      }
    }
    console.log("Inputs values after", this.inputFieldsData);
  }

  answerInputHandler(value: any, index: any, item: any) {
    console.log('value', value);
    console.log('index', index);
    console.log('item', item);
    console.log('answer1', this.answer1);
    // this.inputFieldsData[index+1][answ]
    // this.inputFieldsData[outerIndex].allQuestions[innerIndex].answer = 'a'
    let newData = this.inputFieldsData;
    newData[index].answer1 = value;
    console.log('this.inputFieldsData', this.inputFieldsData);
  }
  onSsnChange(value: any, i: any) {
    // console.log("value", value);
    // if(/^[0-9]+$/.test(value)){
    //   console.log('valid');
    // }else{
    //   console.log('invalid');
    // }
    var valueString = value.toString();
    // console.log("valueString.length", valueString.length);

    if (/^[0-9]+$/.test(value) && valueString.length == 12) {
      this.inputFieldsData[i].invalidSsn = false;
    } else {
      this.inputFieldsData[i].invalidSsn = true;
    }
  }
  onPre() {
    if (this.questionIndex >= 0) this.questionIndex = this.questionIndex - 1;
  }
  onNext() {
    if (this.questionIndex < this.mainSelectId) this.questionIndex = this.questionIndex + 1;
  }
  submit() {
    this.showloading = true;
    console.log("thisss", this.inputFieldsData);

    let emptyInputsAlert = false;
    let invalidInputsAlert = false;
    let sameSsnAlert = false;
    let array = [];
    // console.log('this.inputFieldsData before',this.inputFieldsData);
    // this.inputFieldsData.forEach((element: any, index: any) => {
    //   this.inputFieldsData[index].answer1 = this.answer1[index];
    //   console.log('this.questionsObject', this.questionsObject);
    //   // this.questionsObject.answer1 
    //   // array.push(this.questionsObject)
    //   console.log('element', element);
    //   console.log('this.answer1', this.answer1);
    //   console.log('this.answer1[0]', this.answer1[0]);
    //   console.log('this.answer1[index]', this.answer1[index]);
    //   // element.allQuestions.forEach((ele: any) => {
    //   //   //=== All field should be filled===
    //   //   if (ele.answer == '') emptyInputsAlert = true;

    //   //   //=== All SSN should be valid (Must be 12 Digits and only numbers)===
    //   //   if (ele.invalidSsn) invalidInputsAlert = true;
    //   // });
    //   //=== All SSN should be difference from each other===
    //   // this.inputFieldsData.forEach((element2: any, index2: any) => {
    //   //   if (index!==index2 && element.answer2 === element2.answer2) {
    //   //     sameSsnAlert = true;
    //   //   }
    //   // })
    //   if (index == (this.inputFieldsData.length - 1)) {
    //     console.log('this.inputFieldsData last index', this.inputFieldsData);

    //   }
    // });
    // console.log('this.inputFieldsData after',this.inputFieldsData);

    // if (emptyInputsAlert) {
    //   alert("Fyll i alla fält");
    //   return;
    // } else if (invalidInputsAlert) {
    //   alert("Personnummer måste vara giltigt");
    //   return;
    // }
    // else if (sameSsnAlert) {
    //   alert("Personnummer ska vara unikt för alla");
    //   return;
    // }
    let body = {
      userId: this.userId,
      documentId: this.agreementId,
      javskontrollAnswers: this.inputFieldsData
    }
    console.log('body', body);
    this.newDealService.saveAgreementRequest(body).subscribe(
      res => {
        // this.snackBar.open('Skapades framgångsrikt', 'ok');
        // console.log("res",res)
        this.showloading = false;
        localStorage.setItem("agreementRequested", "true")
        this.dialogRef.close();
        // this.redirect();
        // this.clearFields();
      },
      err => {
        // this.snackBar.open('Skapad misslyckad', 'ok');
        this.showloading = false;
      }
    );
  }
  submitOld() {
    this.showloading = true;
    console.log("thisss", this.inputFieldsData);

    let emptyInputsAlert = false;
    let invalidInputsAlert = false;
    let sameSsnAlert = false;
    this.inputFieldsData.forEach((element: any, index: any) => {

      //=== All field should be filled===
      if (element.answer1 == '' || element.answer2 == '') emptyInputsAlert = true;
      // else emptyInputsAlert = false;

      //=== All SSN should be valid (Must be 12 Digits and only numbers)===
      if (element.invalidSsn) invalidInputsAlert = true;
      // else invalidInputsAlert = false;

      //=== All SSN should be difference from each other===
      // this.inputFieldsData.forEach((element2: any, index2: any) => {
      //   if (index!==index2 && element.answer2 === element2.answer2) {
      //     sameSsnAlert = true;
      //   }
      // })
    });

    if (emptyInputsAlert) {
      alert("Fyll i alla fält");
      return;
    } else if (invalidInputsAlert) {
      alert("Personnummer måste vara giltigt");
      return;
    }
    // else if (sameSsnAlert) {
    //   alert("Personnummer ska vara unikt för alla");
    //   return;
    // }
    let body = {
      userId: this.userId,
      documentId: this.agreementId,
      javskontrollAnswers: this.inputFieldsData
    }
    console.log('body', body);
    this.newDealService.saveAgreementRequest(body).subscribe(
      res => {
        // this.snackBar.open('Skapades framgångsrikt', 'ok');
        // console.log("res",res)
        this.showloading = false;
        localStorage.setItem("agreementRequested", "true")
        this.dialogRef.close();
        // this.redirect();
        // this.clearFields();
      },
      err => {
        // this.snackBar.open('Skapad misslyckad', 'ok');
        this.showloading = false;
      }
    );
  }
  // ========== (Disabled) Run Time Validator by Nadeem Mansha ========== //
  ssnInputHandler(index: any) {
    // console.log("index",index);
    // // console.log("this.javskonrollForm.value.ssnField1",this.javskonrollForm.value);
    // this.inputFieldsData[index].answer2 = this.javskonrollForm.value.ssnField1;
    // console.log("Inputs values after", this.inputFieldsData);
    // let ssnField1ActualLength = this.javskonrollForm.controls['ssnField1'].errors?.minlength.actualLength;
    // let ssnField1RequiredLength = this.javskonrollForm.controls['ssnField1'].errors?.minlength.requiredLength;

    // if (ssnField1ActualLength < ssnField1RequiredLength) {
    //   console.log("Invalid");
    //   this.SsnValidator[index].invalidSsn = true;
    // } else {
    //   console.log("Valid");
    //   this.SsnValidator[index].invalidSsn = false;
    // }
  }
}
