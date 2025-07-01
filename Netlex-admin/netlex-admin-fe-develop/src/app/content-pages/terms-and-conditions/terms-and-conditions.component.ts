// import { TermsAndConditions } from 'src/app/models/terms-and-conditions';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Editor from '../../../assets/ckeditor';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {
  @ViewChild('ckEditorComp', { static: false }) ckEditorComp: any;
  constructor(public authService: AuthService,
    private router: Router,
    private api: ApiService,
    private snackBar: MatSnackBar) {
  }
  contentPages: { paragraphs: string; }[];
  id: any;
  paragraphs: any;
  showloading = false;
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
    this.getTermsAndConditionsData('termsAndConditions');


  }
  getTermsAndConditionsData(name): any {

    this.api.getTermsAndConditions(name).subscribe(data => {
      let response = data.doc[0];
      // console.log("response",response)
      this.id = response._id;
      this.paragraphs = response.paragraphs;
    });
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  updateTermsAndConditions(): any {
    this.showloading = true;
    this.contentPages = [{
      'paragraphs': this.paragraphs,
    }]
    // console.log("contentPages", this.contentPages)
    this.api.updateTermsAndConditions(this.contentPages, this.id)
      .subscribe(
        res => {
          this.snackBar.open('Villkor och betingelser uppdaterades lyckades', 'ok');
          this.showloading = false;
          // console.log('this.id',this.id)
          // console.log('this.clientsDetails',this.clientsDetails)
        },
        err => {
          this.showloading = false;
        }
      );
  }
}
