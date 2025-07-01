
import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { UtilService } from "../../services/util.service";
import { contentpagesService } from '../../services/contentpages.service';
import { htmlcontentModel } from '../../models/contentpage';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { QuestionAndAnswer } from 'src/app/models/question-and-answer';
import { environment } from "../../../environments/environment";

@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

//import { Component, OnInit } from '@angular/core';

//import { UtilService } from "../../services/util.service";






//import {UtilService} from "../../services/util.service";
//import { contentpageService } from '../../services/contentpage.service';
//import { htmlcontentModel } from '../../models/contentpage';


@Component({
  selector: 'app-question-and-answer',
  templateUrl: './question-and-answer.component.html',
  styleUrls: ['./question-and-answer.component.scss']
})
export class QuestionAndAnswerComponent implements OnInit {



  constructor(private utilService: UtilService, private ContentpagesService: contentpagesService, private api: ApiService) { }

  question: '';
  answer: '';
  questionCategory: '';
  heading: '';
  description: '';
  qaList: any;
  showhtml: any;
  showhtmltop: any;
  content_page: htmlcontentModel;
  //Hero Banner
  headerImage: any;
  headerImageExist = false;
  //Accordion Design 
  questionTextColor= '';
  questionBackground= '';
  categoryTextColor= '';
  categoryBackground= '';
  ngOnInit(): void {

    // this.getContentPageTop();
    // this.qaList= [
    // { id: 1,question: 'Kan jag ta bort mitt användarkonto?',answer: 'Ja! Du kan alltid ta bort ditt användarkonto genom att gå in på användarkonto och klicka på “Ta bort konto”.' },
    // { id: 2,question: 'Hur vet jag vilket avtal jag behöver?',answer: 'Vi är alltid redo att hjälpa dig med de frågor och funderingar som kan uppstå när du ska välja ett avtal samt när du skapar ett avtal. Du når oss enklast via chatten.'},
    // { id: 3,question: 'Kan jag känna mig säker på att avtalen är juridiskt korrekta?',answer: 'Ja, det kan du. Alla våra avtal är skapade och granskade av våra jurister och advokater.'},
    // { id: 4,question: 'Hur kommer jag i kontakt med er?', answer: 'Du kan snabbt komma i kontakt med oss via chatten. Om vi inte är tillgängliga kan du skicka ett mail till kontakt@netlex.se. Om du önskar rådgivning kan du enklast boka in ett möte kan alltid boka ett möte med våra jurister och advokater. Vi erbjuder rådgivning på flera olika språk.'},
    // { id: 5,question: 'Vilka betalningsmetoder är tillgängliga?',answer: 'Vi erbjuder Swish och Klarna som betalningsmetoder.'},
    // { id: 6,question: 'Kan jag betala med faktura?',answer: 'Ja! Klarna erbjuder betalning med faktura.'},
    // { id: 7,question: 'Kan jag ändra i avtalet om jag inte är nöjd?',answer: 'Det är tyvärr inte möjligt att redigera ett avtal efter att du har betalat och fått avtalet som en PDF fil mailat till dig. Vi har dock en Nöjd-Kund garanti! Om något inte stämmer kan du maila oss på kontakt@netlex.se så hjälper vi dig.'},
    // ]
    this.getQuestionAnswerHeaderImage();
    this.getQuestionsAnswerCategory();
    this.getContentPage();
    this.getQuestionAndAnswer();
    this.utilService.show();

  }
  getQuestionAndAnswer(): any {

    this.api.getQuestionAndAnswer()

      .subscribe(
        res => {
          this.qaList = res.doc;
          // console.log('qaList',this.qaList);

        },
        err => { }
      );
  }
  getQuestionAnswerHeaderImage() {
    // debugger;
    const Pagename = 'allHeaderImages'
    this.ContentpagesService.getContentPages(Pagename).subscribe(response => {
      // console.log("response",response)
      this.headerImageExist = response.doc[0].questionAnswerHeaderImgExist;
      let imageData = response.doc[0].questionAnswerHeaderImg;
      // console.log("imageData",imageData)
      this.headerImage = 'url(' + environment.adminserviceURL + imageData + ')';
      // console.log("this.headerImage",this.headerImage)
    });
  }
  getContentPage(): any {
    // debugger;
    const Pagename = 'questionAndAnswer'
    this.ContentpagesService.getContentPages(Pagename).subscribe(contentpage => {
      let data = contentpage.doc[0];
      this.heading = data.heading;
      this.description = data.description;
      this.questionTextColor = data.colorScheme.questionTextColor;
      this.questionBackground = data.colorScheme.questionBackground;
      this.categoryTextColor = data.colorScheme.categoryTextColor;
      this.categoryBackground = data.colorScheme.categoryBackground;
      //   this.content_page=contentpage.contentpage[0];
      //  this.showhtml=contentpage.contentpage[0].htmlcontent;

    });
  }
  getContentPageTopd(): any {
    // debugger;
    const Pagename = 'questionAndAnswertop'
    this.ContentpagesService.getContentPages(Pagename).subscribe(contentpage => {
      //res.lawyer

      this.content_page = contentpage.contentpage[0];
      this.showhtmltop = contentpage.contentpage[0].htmlcontent;

    });
  }
  getQuestionsAnswerCategory(): any {
    // debugger;
    const Pagename = 'questionsCategoryOptions'
    this.ContentpagesService.getContentPages(Pagename).subscribe(categoryOptions => {
      // console.log("categoryOptions",categoryOptions);

      this.questionCategory = categoryOptions.doc[0].questionsCategoryOptions;
      // console.log("questionCategory",this.questionCategory);


    });
  }

}
