import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionAndAnswer } from 'src/app/models/question-and-answer';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { ClientsDetailsQuestion } from 'src/app/models/clientDetailsQuestion';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-clients-details-questions',
  templateUrl: './clients-details-questions.component.html',
  styleUrls: ['./clients-details-questions.component.scss']
})
export class ClientsDetailsQuestionsComponent implements OnInit {

  asyncItems: Observable<ClientsDetailsQuestion[]>;
  p = 1;
  perPage = 10;
  total: number;
  alert: { success: boolean, text: string } = { success: true, text: '' };
  id = '';
  questionDetails = { question: '', placeholder: '', type: '' };
  answerTypeOptions = [{ label: "Text", value: "text" }, { label: "Nummer", value: "number" },]
  loading = false;
  isCreateQuestion = false;
  isEditQuestion = false;
  isShowQuestionList = true;

  constructor(
    public authService: AuthService,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.checkRoleAction();
    this.getPage(1);
  }

  getPage(page: number): any {
    this.loading = true;
    this.asyncItems = this.api.getClientsDetailsQuestionList(page, this.perPage)
      .pipe(
        tap(res => {
          // console.log('res', res)
          this.total = res['total'];
          this.p = page;
          this.perPage = 10;
          this.loading = false;
        }),
        map(({ docs: docs1 }) => docs1)
      );
  }
  createQuestionButtonHandler() {
    this.isCreateQuestion = true;
    this.isShowQuestionList = false;
  }
  backClickHandler() {
    this.isCreateQuestion = false;
    this.isEditQuestion = false;
    this.isShowQuestionList = true;
  }
  editQuestionButtonHandler(id: string) {
    this.id = id;
    this.api.getClientsDetailsQuestionById(id).subscribe((res: any) => {
      console.log("ress---------", res)
      this.questionDetails.question = res.question;
      this.questionDetails.placeholder = res.placeholder;
      this.questionDetails.type = res.type;
      this.isShowQuestionList = false;
      this.isEditQuestion = true;

    },
      (err: any) => {
        console.log('Error while getting question by id', err);
      }
    );
  }
  deleteClientsDetailsQuestion(id: string) {
    if (confirm('Är du säker på att du vill ta bort den här frågan om jävskontroll?')) {
      this.loading = true;
      this.api.deleteClientsDetailsQuestion(id).subscribe(
        res => {
          this.loading = false;
          this.snackBar.open('Frågan har tagits bort', 'ok');
          window.scroll(0, 0);
          this.getPage(1);
        }, err => {
          this.loading = false;
          this.snackBar.open(
            'Frågan kunde inte raderas. Var god försök igen', 'ok');
          window.scroll(0, 0);
        }
      );
    }
  }
  onsubmit(): void {
    console.log('questionDetails', this.questionDetails)
    if (!this.questionDetails.question || !this.questionDetails.placeholder || !this.questionDetails.type) {
      this.snackBar.open('Fyll i alla fält', 'ok');
      return;
    }
    this.api.createClientsDetailsQuestion(this.questionDetails)
      .subscribe(
        (res: any) => {
          this.snackBar.open('Skapades framgångsrikt', 'ok');

          // this.redirect(1);
          this.clearFields();
          this.backClickHandler();
        },
        (err: any) => {
          console.log(err)
          this.snackBar.open('Skapad misslyckad', 'ok');

        }
      );
  }
  update(): any {
    this.loading = true;
    // this.colors = [{
    //   'colorName': this.colorName,
    //   'colorCode': this.colorCode,
    // }]
    this.api.updateClientsDetailsQuestion(this.questionDetails, this.id)
      .subscribe(
        res => {
          this.snackBar.open('fråga och svar uppdaterades lyckades', 'ok');
          this.loading = false;
          this.clearFields();
          this.backClickHandler();
        },
        err => {
          this.loading = false;
        }
      );

  }
  clearFields(): void {
    this.id = '';
    this.questionDetails.question = '';
    this.questionDetails.placeholder = '';
    this.questionDetails.type = '';
  }
  // redirect(): void{
  //     this.router.navigate(['/content-pages']);
  // }
  // redirect(TabID): any {
  //   this.router.navigate(['/content-pages'], {
  //     queryParams: { tabID: TabID }
  //   });
  // }
  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.content_pages.MAId;
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
