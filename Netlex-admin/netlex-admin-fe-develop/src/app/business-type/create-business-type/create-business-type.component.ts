import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NyttAvtalService} from 'src/app/services/nyttavtal.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

import { BusinessTypeModel } from 'src/app/models/businessType.model';
import {menuactionspagename} from  '../../models/pagesnameandId';
 
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
  selector: 'app-create-business-type',
  templateUrl: './create-business-type.component.html',
  styleUrls: ['./create-business-type.component.scss']
})
export class CreateBusinessTypeComponent implements OnInit {
  @Input() operator: string;
  @Input() documentId: string;
  // @Output() fieldReset = new EventEmitter<Field>();

  businesstype: BusinessTypeModel = {name: '', amount: '', vat: ''};

  mainQuestionAnswerType: string;
  multiSelectionValue: string;
  name: string;
  amount: string;
  vat: string;
  subQuestion = false;
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

  constructor(

    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {


    
  }

  ngOnInit(): void {
    this.checkRoleAction();
}

onsubmit(): void{
  if (!this.businesstype.name || !this.businesstype.amount || !this.businesstype.vat){
      this.snackBar.open('Fyll i alla fält', 'ok');
      return;
  }  
// console.log("this.name"+this.businesstype.name)
  this.api.saveBusinessType(this.businesstype)
      .subscribe(
          res => {
              this.snackBar.open('Skapades framgångsrikt', 'ok');
            //   this.showloading = false;
              this.redirect();
              this.clearFields();
          },
          err => {
              this.snackBar.open('Skapad misslyckad', 'ok');
            //   this.showloading = false;
          }
      );
}
clearFields(): void{
  this.businesstype.name = '';
  this.businesstype.amount = '';
  this.businesstype.vat = '';
}
redirect(): void{
this.router.navigate(['/businesstype']);


}
checkRoleAction():any
{
    let RoleID =this.authService.getroleID();
    let roleactionID=menuactionspagename.businesstype.MAId;
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



