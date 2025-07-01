import { ApiService } from 'src/app/services/api.service';
import { ContentPage } from './../../models/contentpage.model';

import { Component, OnInit, ViewChild } from '@angular/core';



import { environment } from 'src/environments/environment';


import { MatDialog} from '@angular/material/dialog';

import {MyErrorStateMatcher } from '../../nytt-avtal/nytt-avtal.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import * as Editor from '../../../assets/ckeditor';




@Component({
  selector: 'app-contentedit',
  templateUrl: './contentedit.component.html',
  styleUrls: ['./contentedit.component.scss']
})
export class ContenteditComponent implements OnInit {
  @ViewChild('ckEditorComp', { static: false }) ckEditorComp: any;
  constructor(public dialog: MatDialog,
     
      private snackBar: MatSnackBar,
      private router: ActivatedRoute,
      public route: Router,
      
      private api: ApiService,

  ) {
  }
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

  htmlcontent = '';
  status = '';
  id = '';
 
  name = '';
  
  data: ContentPage[];
  showloading = false;
 
 
  panelOpenState: boolean;

  destroy = true;
  contentPage: { name: string; htmlcontent: string  }[];


 

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {

     
              this.router.params.subscribe(params => {
              this.id = params?.id;
              console.log('id'+ this.id);
              this.fetchDocumentById();

          });
      


    
         

     

      window.addEventListener('beforeunload', function (e) {
          const confirmationMessage = '\o/';
          e.returnValue = confirmationMessage;
          return confirmationMessage;
      });
  }


  

  fetchDocumentById(): any { // get the document by id

      if (this.id) {

        console.log("==================" + this.id);
          this.api.contentById(this.id).subscribe(res => {
              console.log(res);
            this.name = res.data.name;
            this.htmlcontent = res.data.htmlcontent;
            
              

          });
      }

  }



 


 

 

 
 


  update(): any {
    this.showloading = true;
    this.contentPage = [{
        'name': this.name,
        'htmlcontent': this.htmlcontent,

    }]
    this.api.updateContentPage(this.contentPage, this.id)
        .subscribe(
            res => {
  
                this.snackBar.open('innehållssida uppdaterades lyckades', 'ok');
                this.showloading = false;
                
                this.redirect();
            },
            err => {
                this.showloading = false;
                this.snackBar.open('innehållssidan uppdaterad misslyckades ',' ok ');

            }
        );
        
  }
  redirect(): void{
    this.route.navigate(['/contentpage']);
  }
  




  public onReady(editor) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
  }



}


