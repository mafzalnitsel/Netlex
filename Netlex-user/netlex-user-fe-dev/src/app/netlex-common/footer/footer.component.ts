import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { contentpagesService } from 'src/app/services/contentpages.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  //---------||-------New-------||-------//
  footer_Bg_type: String;
  footer_Bg_Color: String;
  footer_Bg_Image: String;
  footerparagraphTexts: any;
  //---------||-------New-------||-------//
  constructor(public utilService: UtilService, private ContentpagesService: contentpagesService,) { }

  ngOnInit(): void {
    this.getContentPages();
  }
  getContentPages(): any {
    const Pagename = 'home'
    this.ContentpagesService.getContentPages(Pagename).subscribe(contentpage => {
      // console.log("contentpage.doc[0]", contentpage.doc[0])
      this.footer_Bg_type = contentpage.doc[0].footerBgType;
      this.footer_Bg_Color = contentpage.doc[0].footerBgColor;
      this.footer_Bg_Image = contentpage.doc[0].footerBgImage;
      this.footerparagraphTexts = contentpage.doc[0].footerparagraphTexts;

    })
  }
}
