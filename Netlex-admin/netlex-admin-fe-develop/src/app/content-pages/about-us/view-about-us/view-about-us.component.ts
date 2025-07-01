import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service'; 
// import { environment } from 'src/environments/environment'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
 import * as Editor from '../../../../assets/ckeditor';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-about-us',
  templateUrl: './view-about-us.component.html',
  styleUrls: ['./view-about-us.component.scss']
})
export class ViewAboutUsComponent implements OnInit {

  @ViewChild('ckEditorComp', { static: false }) ckEditorComp: any;

  private sub: any;
  tabID=2;
  id: '';
  heading = '';
  description = '';
  showloading = false;
  alert: { success: boolean, text: string } = { success: true, text: '' };
  aboutUs: { heading: string; description: string; }[];


  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService:AuthService
  ) {
  }

  ngOnInit(): void {

this.checkRoleAction();
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.getAboutUsData();
    });
  }

      //vvvvvvvvvvvv----ckEditor----vvvvvvvvvvvvvvv
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

  getAboutUsData(): any {

    this.api.getAboutUs(this.id)

      .subscribe(
        res => {
          this.heading = res.heading;
          this.description = res.description;

        },
        err => { }
      );
  }
  // backToAboutUsTab2($event: { _id: string; }): any {
  //   this.router.navigate(['/about-us/view/' + $event._id]);
  // }
  // backToAboutUsTab(): any {
  //   this.router.navigate(['/content-page/:tabID']);
  // }
  update(): any {
    this.showloading = true;
    this.aboutUs = [{
      'heading': this.heading,
      'description': this.description,
    }]
    this.api.updateAboutUs(this.aboutUs, this.id)
      .subscribe(
        res => {

          this.snackBar.open('Om Oss uppdaterades lyckades', 'ok');
          this.showloading = false;

          this.redirect(3);
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

  // redirect(): void {
  //   this.router.navigate(['/content-pages']);
  // }
  redirect(TabID): any {
    this.router.navigate(['/content-pages'], {
      queryParams: { tabID: TabID }
    });
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
