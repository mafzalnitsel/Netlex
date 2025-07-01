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
  selector: 'app-activity-areas',
  templateUrl: './activity-areas.component.html',
  styleUrls: ['./activity-areas.component.scss']
})
export class ActivityAreasComponent implements OnInit {
  @ViewChild('ckEditorComp', { static: false }) ckEditorComp: any;
  constructor(public authService: AuthService,
    private router: Router,
    private api: ApiService,
    private snackBar: MatSnackBar) {
  }
  contentPages: { expertise1: string; expertise2: string; expertise3: string; expertise4: string; expertise5: string; expertise6: string; }[];
  id: any;
  showloading = false;
  editorloading = false;
  expertise1: any;
  expertise2: any;
  expertise3: any;
  expertise4: any;
  expertise5: any;
  expertise6: any;
  // expertiseOptions: any = ['Expertis1', 'Expertis2', 'Expertis3', 'Expertis4', 'Expertis5', 'Expertis6'];
  expertiseOptions: any = ['Familjerätt', 'Brottmål', 'Tvistemål', 'Migrationsrätt', 'Notarius Publicus', 'Socialrätt'];
  // selectedExpertise: string = 'Expertis1';
  selectedExpertise: string = 'Familjerätt';

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
    this.getActivityAreasContents('activityAreasPageContent');
    // this.getExpertiseOptions('home')

  }
  // getExpertiseOptions(name: any) {

  //   this.api.getHome(name).subscribe(data => {
  //     let res = data.doc[0].servicesAllTexts;
  //     console.log("Expertise Options Res", res);
  //     // this.id = response._id;
  //     // this.expertise1 = response.expertise1;
  //     // this.expertise2 = response.expertise2;
  //     // this.expertise3 = response.expertise3;
  //     // this.expertise4 = response.expertise4;
  //     // this.expertise5 = response.expertise5;
  //     // this.expertise6 = response.expertise6;
  //   });
  // }
  getActivityAreasContents(name: any): any {

    this.api.getTermsAndConditions(name).subscribe(data => {
      let response = data.doc[0];
      console.log("response", response);
      this.id = response._id;
      this.expertise1 = response.expertise1;
      this.expertise2 = response.expertise2;
      this.expertise3 = response.expertise3;
      this.expertise4 = response.expertise4;
      this.expertise5 = response.expertise5;
      this.expertise6 = response.expertise6;
    });
  }
  changeExpertiseHandler() {
    this.editorloading = true;
    setTimeout(()=>{
      this.editorloading = false;
    },500)
  }
  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  updatetActivityAreas(): any {
    this.showloading = true;
    this.contentPages = [{
      'expertise1': this.expertise1,
      'expertise2': this.expertise2,
      'expertise3': this.expertise3,
      'expertise4': this.expertise4,
      'expertise5': this.expertise5,
      'expertise6': this.expertise6,
    }]
    // console.log("contentPages", this.contentPages)
    this.api.updatetActivityAreasContents(this.contentPages, this.id)
      .subscribe(
        res => {
          this.snackBar.open('Aktivitetsområde uppdaterades lyckades', 'ok');
          // this.showloading = false;
          // console.log('this.id',this.id)
          // console.log('this.clientsDetails',this.clientsDetails)
          setTimeout(()=>{
            this.showloading = false;
          },300)
        },
        err => {
          // this.showloading = false;
          this.snackBar.open('Fel: Inte uppdaterad', 'ok');
          setTimeout(()=>{
            this.showloading = false;
          },300)
        }
      );
  }
}
