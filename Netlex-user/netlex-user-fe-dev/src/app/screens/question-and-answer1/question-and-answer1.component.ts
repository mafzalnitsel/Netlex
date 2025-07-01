 
import { Component,Pipe, PipeTransform, OnInit } from '@angular/core';
import {UtilService} from "../../services/util.service";
import { contentpagesService } from '../../services/contentpages.service';
import { htmlcontentModel } from '../../models/contentpage';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}  
@Component({
  selector: 'app-question-and-answer1',
  templateUrl: './question-and-answer1.component.html',
  styleUrls: ['./question-and-answer1.component.scss']
})
export class QuestionAndAnswer1Component implements OnInit {  
  constructor(private utilService: UtilService,private ContentpagesService:contentpagesService,private api: ApiService) { }
  question: ''
  answer: ''
  heading:''
  description:''
  qaList: any;
  showhtml:any;
  showhtmltop:any;
  content_page:htmlcontentModel;
  ngOnInit(): void {
    this.getContentPage();
    this.getQuestionAndAnswer(); 
    this.utilService.show();
  }
  getQuestionAndAnswer(): any {
    this.api.getQuestionAndAnswer()
          .subscribe(
        res => {
          this.qaList = res.doc;
        },
        err => { }
      );
  } 
  getContentPage(): any {  
        const Pagename = 'questionAndAnswer'
        this.ContentpagesService.getContentPages(Pagename).subscribe(contentpage => {
        this.heading=contentpage.doc[0].heading;
        this.description=contentpage.doc[0].description;
        });
      }
      getContentPageTopd(): any {  
            const Pagename = 'questionAndAnswertop'
            this.ContentpagesService.getContentPages(Pagename).subscribe(contentpage => {            
              this.content_page=contentpage.contentpage[0];
             this.showhtmltop=contentpage.contentpage[0].htmlcontent;              
            });
          }
      

}
