import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { UtilService } from "../../services/util.service";
import { contentpagesService } from '../../services/contentpages.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from "../../../environments/environment";

@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {
  headerImage: any;
  headerImageExist = false;

  constructor(private utilService: UtilService, private ContentpagesService: contentpagesService,) { }
  termsAndConditions: any;
  ngOnInit(): void {
    this.utilService.show();
    window.scroll(0, 0)
    this.getContentPages('termsAndConditions');
    this.getHeaderImage();
  }
  getContentPages(Pagename) {
    this.ContentpagesService.getContentPages(Pagename).subscribe(response => {
      // console.log("response",response)
      this.termsAndConditions = response.doc[0].paragraphs;
    });
  }

  getHeaderImage() {
    const Pagename = 'allHeaderImages'
    this.ContentpagesService.getContentPages(Pagename).subscribe(response => {
      // console.log("response",response)
      this.headerImageExist = response.doc[0].termsConditionsHeaderImgExist;
      let imageData = response.doc[0].termsConditionsHeaderImg;
      // console.log("imageData",imageData)
      this.headerImage = 'url(' + environment.adminserviceURL + imageData + ')';
      // console.log("this.headerImage",this.headerImage)
    });
  }
}
