

import { QuestionAndAnswer } from 'src/app/models/question-and-answer';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Editor from '../../../assets/ckeditor';

import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { menuactionspagename } from 'src/app/models/pagesnameandId';



@Component({
  selector: 'app-question-and-answer',
  templateUrl: './question-and-answer.component.html',
  styleUrls: ['./question-and-answer.component.scss']
})
export class QuestionAndAnswerComponent implements OnInit {

  @ViewChild('ckEditorComp', { static: false }) ckEditorComp: any;

  @Input('data') persons: QuestionAndAnswer[] = [];
  asyncPersons: Observable<QuestionAndAnswer[]>;
  p = 1;
  perPage = 10;
  total: number;
  loading: boolean;
  docs: any;

  showloading = false;
  id = '';
  heading = '';
  description = '';
  htmlcontent = '';

  // colors: [categoryBackground: '#000', categoryTextColor: '#000', questionBackground: '#000', questionTextColor: '#000',];
  categoryBackground = '';
  categoryTextColor = '';
  questionBackground = '';
  questionTextColor = '';

  contentPages: { heading: string; description: string; colorScheme: {} }[];
  constructor(public authService: AuthService,
    private router: Router,
    private api: ApiService,
    private snackBar: MatSnackBar) {
  }
  //vvvvvvvvvvvv----ckEditor----vvvvvvvvvvvvv
  public ckEditor = Editor;
  editorConfig = {
    toolbar: {
      items: [
        // 'nextPage',
        // 'previousPage',
        'pageNavigation', '|',
        'alignment',
        'pageBreak',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'outdent',
        'indent',
        '|',
        'fontSize',
        'fontFamily',
        '|',
        'heading',
        '|',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'numberedList',
        'bulletedList',
        '|',
        'todoList',
        'link',
        'blockQuote',
        'imageUpload',
        'insertTable',
        'mediaEmbed',
        '|',
        'undo',
        'redo',
        'findAndReplace',
        'highlight'
      ]
    },
    language: 'sv',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ]
    },
    pagination: {
      // A4
      pageWidth: '21cm',
      pageHeight: '29.7cm',

      pageMargins: {
        top: '20mm',
        bottom: '20mm',
        right: '12mm',
        left: '12mm'
      }
    },
    licenseKey: environment.ckEditorLicense
  };
  //^^^^^^^^^^^^-----ckEditor-----^^^^^^^^^^^^^

  ngOnInit(): void {
    this.checkRoleAction();
    this.getPage(1);
    this.getHeadingDescOfQA('questionAndAnswer');


  }
  viewQuestionAndAnswer($event: { _id: string; }): any {
    this.router.navigate(['/question-and-answer/view/' + $event._id]);
  }
  getPage(page: number): any {
    this.loading = true;
    this.asyncPersons = this.api.getQuestionAndAnswerList(page, this.perPage)
      .pipe(
        tap(res => {
          // console.log(res)
          this.total = res['total'];
          this.p = page;
          this.perPage = 10;
          this.loading = false;
        }),
        map(({ docs: docs1 }) => docs1)
      );
  }

  deleteQuestionAndAnswer(_id: string): any {

    if (confirm('Är du säker på att du vill ta bort den här rollen?')) {

      this.loading = true;
      this.api.deleteQuestionAndAnswer(_id).subscribe(
        res => {
          this.loading = false;
          this.snackBar.open('Den här rollen har tagits bort', 'ok');
          window.scroll(0, 0);
          this.getPage(1);
        }, err => {
          this.loading = false;
          this.snackBar.open(
            'Det gick inte att ta bort rollen. Var god försök igen', 'ok');
          window.scroll(0, 0);
        }
      );
    }
  }


  getHeadingDescOfQA(name): any {

    this.api.getHeadingDescOfQA(name).subscribe(data => {
      // console.log("data.doc[0]",data.doc[0])
      let response = data.doc[0];

      this.id = response._id;
      this.heading = response.heading;
      this.description = response.description;
      this.categoryBackground = response.colorScheme.categoryBackground;
      this.categoryTextColor = response.colorScheme.categoryTextColor;
      this.questionBackground = response.colorScheme.questionBackground;
      this.questionTextColor = response.colorScheme.questionTextColor;
    });
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  updateHeadingDescOfQA(): any {
    console.log("this.categoryBackground", this.categoryBackground)
    console.log("this.categoryTextColor", this.categoryTextColor)
    console.log("this.questionBackground", this.questionBackground)
    console.log("this.questionTextColor", this.questionTextColor)
    this.showloading = true;
    this.contentPages = [{
      'heading': this.heading,
      'description': this.description,
      'colorScheme': {
        'categoryBackground': this.categoryBackground,
        'categoryTextColor': this.categoryTextColor,
        'questionBackground': this.questionBackground,
        'questionTextColor': this.questionTextColor,
      }
    }]
    this.api.updateHeadingDescOfQA(this.contentPages, this.id)
      .subscribe(
        res => {
          this.snackBar.open('Rubrik och Beskrivning uppdaterades lyckades', 'ok');
          this.showloading = false;
          // console.log('this.id',this.id)
          // console.log('this.clientsDetails',this.clientsDetails)
        },
        err => {
          this.showloading = false;
        }
      );
  }
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
