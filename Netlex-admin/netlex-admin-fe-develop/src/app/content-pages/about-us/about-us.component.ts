import { QuestionAndAnswer } from 'src/app/models/question-and-answer';
import { Component, OnInit,Pipe, PipeTransform, Input, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Editor from '../../../assets/ckeditor';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AboutUs } from 'src/app/models/about-us.model';
import { ContentPagesModel } from 'src/app/models/content.pages.model';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  @ViewChild('ckEditorComp', { static: false }) ckEditorComp: any;

  @Input('data') persons: AboutUs[] = [];
  asyncPersons: Observable<AboutUs[]>;
  p = 1;
  perPage = 10;
  total: number;
  loading: boolean;

  showloading = false;
  id = '';
  docs: any;
  aboutUsHeader = '';
  aboutUsLawyerHeading = '';

  contentPages: { aboutUsHeader: string; aboutUsLawyerHeading: string;}[];

  constructor(public authService: AuthService,
    private router: Router,
    private api: ApiService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.checkRoleAction();
    this.getPage(1);
    this.getAboutUsHeader('aboutUs');

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


  viewAboutUs($event: { _id: string; }): any {
    this.router.navigate(['/about-us/view/' + $event._id]);
  }
  getPage(page: number): any {
    this.loading = true;
    this.asyncPersons = this.api.getAboutUsList(page, this.perPage)
      .pipe(
        tap(res => {

          this.total = res['total'];
          this.p = page;
          this.perPage = 10;
          this.loading = false;
        }),
        map(({ docs: docs1 }) => docs1)
      );
  }

  deleteAboutUs(_id: string): any {

    if (confirm('Är du säker på att du vill ta bort den här rollen?')) {

      this.loading = true;
      this.api.deleteAboutUs(_id).subscribe(
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

  getAboutUsHeader(name): any {

    this.api.getAboutUsHeader(name).subscribe(data => {

      let response = data.doc[0];

      this.id = response._id;
      this.aboutUsHeader = response.aboutUsHeader;
      this.aboutUsLawyerHeading = response.aboutUsLawyerHeading;
    });
  }

  updateAboutUsHeader(): any {

    this.showloading = true;
    this.contentPages = [{
      
      'aboutUsHeader': this.aboutUsHeader,
      'aboutUsLawyerHeading': this.aboutUsLawyerHeading,
    }]
    this.api.updateAboutUsHeader(this.contentPages, this.id)
      .subscribe(
        res => {
          this.snackBar.open('Rubrik och Beskrivning uppdaterades lyckades', 'ok');
          this.showloading = false;
          // console.log('this.id',this.id)
          // console.log('this.contentPages',this.contentPages)
        },
        err => {
          this.showloading = false;
        }
      );
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }
  checkRoleAction():any
  {
      let RoleID =this.authService.getroleID();
      let roleactionID=menuactionspagename.content_pages.MAId;
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
