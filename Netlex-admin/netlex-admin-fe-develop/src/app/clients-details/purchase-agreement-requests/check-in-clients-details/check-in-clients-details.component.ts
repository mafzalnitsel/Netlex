import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NyttAvtalService } from 'src/app/services/nyttavtal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-check-in-clients-details',
  templateUrl: './check-in-clients-details.component.html',
  styleUrls: ['./check-in-clients-details.component.scss']
})
export class CheckInClientsDetailsComponent implements OnInit {

  @Input() operator: string;
  @Input() documentId: string;
  @Input() requestId: string;
  @Output() closeViewDetails = new EventEmitter<string>();

  clientsDetails: ClientsDetailsModel = {
    fromName: '', fromPhoneNumber: '', fromEmail: '', fromSsn: '',
    toName: '', toPhoneNumber: '', toEmail: '', toSsn: '',
  };

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
  id = '';
  userData: any;
  allJavskontrollAnswers: any;
  allAnswers: any = [];
  showLoader = false;

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
    if (this.requestId) {
      // console.log('this.requestId', this.requestId);
      this.getAgreeementRequest(this.requestId);
    }
  }
  getAgreeementRequest(id: string) {
    this.api.getAgreeementRequest(id).subscribe((response: any) => {
      // console.log('response', response);
      this.userData = response.user;
      this.allJavskontrollAnswers = response.questionAndAnswers
      // console.log('this.userData', this.userData);
      // console.log('this.allJavskontrollAnswers', this.allJavskontrollAnswers);
      // let allAnswers = []
      this.allJavskontrollAnswers.forEach((element: any) => {
        this.allAnswers.push({
          answer1: element.answer1,
          answer2: element.answer2,
          // answer1IsInClient: false,
          answer1ExistsInCounterparty: false,
          answer2ExistsInCounterparty: false,
          answer1ExistsIn: '',
          answer2ExistsIn: '',
        })
        element['answer1ExistsInCounterparty'] = false;
        element['answer2ExistsInCounterparty'] = false;
        element['answer1ExistsIn'] = '';
        element['answer2ExistsIn'] = '';
      });
      // console.log('this.allAnswers',this.allAnswers);
      // console.log('this.allJavskontrollAnswers', this.allJavskontrollAnswers);

      this.getClientsDetailByData(this.allAnswers);

    })
  }
  getClientsDetailByData(allAnswers: any) {
    // console.log('allAnswers',allAnswers);
    // let data = { }
    this.api.getClientsDetailByData(allAnswers).subscribe((response: any) => {
      console.log('response', response);
      // if(response.length)
      this.allAnswers = response.result
    })
  }
  errorFieldClickHandler(data: any, answer: string) {
    // console.log('data',data);
    // console.log('answer',answer);

    // if(answer=='answer1'){
    // console.log('Its answer1',answer);
    // }
    // if(answer=='answer2'){
    // console.log('Its answer2',answer);
    // }

    if (data[answer + 'ExistsInCounterparty']) {
      // console.log('data', data);
      // console.log("data[answer+'ExistsInCounterparty']", data[answer + 'ExistsInCounterparty']);
      // console.log("data[answer+'ExistsIn']", data[answer + 'ExistsIn']);
      this.showLoader = true;
      let clientDetailsId = data[answer + 'ExistsIn']
      setTimeout(() => {
        this.router.navigate(['/clients-details/view/' + clientDetailsId]);
      }, 1000)

    }

  }
  closeViewDetailsHandler() {
    this.closeViewDetails.emit('true');
  }
  updateRequest(action: string) {
    // this.showloading = true;
    console.log('action', action);
    if (action == 'approved') {
      let agreementRequestStatus = [{
        // status: 'approved',
        status: action
      }]
      if (confirm('Är du säker på att du godkänner denna begäran?')) {
        this.api.updateAgreeementRequests(agreementRequestStatus, this.requestId).subscribe(
          (res: any) => {
            // console.log("res", res);
            this.snackBar.open('Begäran godkänns', 'ok');
            // this.getPage(1);
            // this.showloading = false;
            this.closeViewDetails.emit('true');

          },
          (err: any) => {
            console.log("err while updating agreement request", err);
            this.snackBar.open('Kan inte uppdatera. Försök igen senare', 'ok');
            // this.showloading = false;
          }
        );
      }
    } else if (action == 'rejected') {
      let agreementRequestStatus = [{
        // status: 'rejected',
        status: action
      }]
      if (confirm('Är du säker på att du avvisar denna begäran?')) {
        this.api.updateAgreeementRequests(agreementRequestStatus, this.requestId).subscribe(
          (res: any) => {
            // console.log("res", res);
            this.snackBar.open('Begäran avslogs', 'ok');
            // this.getPage(1);
            // this.showloading = false;
            this.closeViewDetails.emit('true');
          },
          (err: any) => {
            console.log("err while updating agreement request", err);
            this.snackBar.open('Kan inte uppdatera. Försök igen senare', 'ok');
            // this.showloading = false;
          }
        );
      }
    }

  }
  onsubmit(): void {
    if (!this.clientsDetails.fromName || !this.clientsDetails.fromPhoneNumber || !this.clientsDetails.fromEmail || !this.clientsDetails.fromSsn || !this.clientsDetails.toName || !this.clientsDetails.toPhoneNumber || !this.clientsDetails.toEmail || !this.clientsDetails.toSsn) {
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
  clearFields(): void {
    this.clientsDetails.fromName = '';
    this.clientsDetails.fromPhoneNumber = '';
    this.clientsDetails.fromEmail = '';
    this.clientsDetails.fromSsn = '';
    this.clientsDetails.toName = '';
    this.clientsDetails.toPhoneNumber = '';
    this.clientsDetails.toEmail = '';
    this.clientsDetails.toSsn = '';
  }
  redirect(): void {
    this.router.navigate(['/clients-details']);


  }

  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.clients_details.MAId;
    this.api.GetRoleActionByRoleIdRoleActionId(RoleID, roleactionID)
      .subscribe(
        res => {
          if (res.menuactionslist.length == 0) {
            this.authService.logout();
          }

        },
        err => { }
      );
  }
}



