import { Component, OnInit ,ViewChild} from '@angular/core';
import { environment } from 'src/environments/environment';
 import * as Editor from '../../../../assets/ckeditor';

import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AboutUs } from 'src/app/models/about-us.model'; 
import { menuactionspagename } from 'src/app/models/pagesnameandId';


@Component({
  selector: 'app-create-about-us',
  templateUrl: './create-about-us.component.html',
  styleUrls: ['./create-about-us.component.scss']
})
export class CreateAboutUsComponent implements OnInit {

  @ViewChild('ckEditorComp', { static: false }) ckEditorComp: any;

  alert: {success: boolean, text: string} = {success: true, text: ''};
  aboutUs: AboutUs = {heading: '', description: '',  _id: ''};
  //  status = "Aktiv";
  //  totalMeetingAssigned = 0;
  //  statusValue = ['inAktiv' , 'Aktiv'];


  
    userForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
    });


    constructor(
      private authService: AuthService,
      private api: ApiService,
      private snackBar: MatSnackBar,
      private router: Router
  ) { }

  ngOnInit(): void {
this.checkRoleAction();
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
  

  // backToAboutUsTab($event: { _id: string; }): any {
  //   this.router.navigate(['/about-us/view/' + $event._id]);
  // }
  onsubmit(): void{
    console.log('aboutUs',this.aboutUs)
    if (!this.aboutUs.heading || !this.aboutUs.description){
        this.snackBar.open('Fyll i alla fält', 'ok');
        return;
    }
    this.api.createAboutUs(this.aboutUs)
        .subscribe(
            res => {
                this.snackBar.open('Skapades framgångsrikt', 'ok');
                
                this.redirect(3);
                this.clearFields();
            },
            err => {
              console.log(err)
                this.snackBar.open('Skapad misslyckad', 'ok');
                
            }
        );
  }
  clearFields(): void{
    this.aboutUs.heading = '';
    this.aboutUs.description = '';
  }
//   redirect(): void{
//       this.router.navigate(['/content-pages']);
//   }
  redirect(TabID): any {
    this.router.navigate(['/content-pages'], {
      queryParams: { tabID: TabID }
    });
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




