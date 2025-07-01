import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NyttAvtalService} from 'src/app/services/nyttavtal.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroupDirective, NgForm, FormGroup, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { ClientsDetailsModel } from 'src/app/models/clientsDetails.model';
import { menuactionspagename } from 'src/app/models/pagesnameandId';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
  selector: 'app-create-clients-details',
  templateUrl: './create-clients-details.component.html',
  styleUrls: ['./create-clients-details.component.scss']
})
export class CreateClientsDetailsComponent implements OnInit {

  @Input() operator: string;
  @Input() documentId: string;

  clientsDetails: ClientsDetailsModel = {fromName: '',fromPhoneNumber: '',fromEmail: '',fromSsn: '',
  toName: '',toPhoneNumber: '',toEmail: '',toSsn: '',};

  // fromName: string;
  // fromPhoneNumber: string;
  // fromEmail: string;
  // fromSsn: string;
  // toName: string;
  // toPhoneNumber: string;
  // toEmail: string;
  // toSsn: string;
  subQuestion = false;
  global = false;

  addIdFieldControl = new FormControl('', [
      Validators.required,
  ]);
  placeHolderFieldControl = new FormControl('', [
      Validators.required,
  ]);
  
  userForm = new FormGroup({
    fromEmail: new FormControl('', [Validators.required, Validators.email]),
    toEmail: new FormControl('', [Validators.required, Validators.email]),
  });
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
  if (!this.clientsDetails.fromName || !this.clientsDetails.fromPhoneNumber || !this.clientsDetails.fromEmail || !this.clientsDetails.fromSsn || !this.clientsDetails.toName || !this.clientsDetails.toPhoneNumber || !this.clientsDetails.toEmail || !this.clientsDetails.toSsn){
      this.snackBar.open('Fyll i alla fält', 'ok');
      return;
  }  
// console.log("this.fromName"+this.clientsDetails.fromName)


  this.api.saveClientsDetails(this.clientsDetails)
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
  this.clientsDetails.fromName = '';
  this.clientsDetails.fromPhoneNumber = '';
  this.clientsDetails.fromEmail = '';
  this.clientsDetails.fromSsn = '';
  this.clientsDetails.toName = '';
  this.clientsDetails.toPhoneNumber = '';
  this.clientsDetails.toEmail = '';
  this.clientsDetails.toSsn = '';
}
redirect(): void{
this.router.navigate(['/clients-details']);


}
checkRoleAction():any
{
    let RoleID =this.authService.getroleID();
    let roleactionID=menuactionspagename.clients_details.MAId;
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



