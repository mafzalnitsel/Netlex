import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { UtilService } from "../../services/util.service";
import { environment } from "../../../environments/environment";
import { contentpagesService } from '../../services/contentpages.service';
import { htmlcontentModel } from '../../models/contentpage';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
//import { Observable } from 'rxjs/internal/Observable';
import { Lawyer } from '../../models/lawyer.model';
//import { map, tap } from 'rxjs/operators';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  aboutUsDataArray: any;
  cardShow = false;
  contactLawyerLink: string;
  showhtml: any;
  content_page: htmlcontentModel;
  LawyerID: string;
  LawyerIDh: string;
  showimage: any;
  aboutusHeading: Array<{ description: string, heading: string, headingv: string, _id: string }> = [];
  aHeading: any;
  LawyerDetail: Array<{
    activityArea: string,
    email: string, firstName: string,
    languages: string, lastName: string,
    lawyerPic: string,
    phoneNumber: string, showLawyerToUser: string,
    status: string, title: string, _id: string, totalMeetingAssigned: string, training: string
  }> = [];
  LawyerDetailtwo: Array<{
    activityArea: string,
    email: string, firstName: string,
    languages: string, lastName: string,
    lawyerPic: string,
    phoneNumber: string, showLawyerToUser: string,
    status: string, title: string, _id: string, totalMeetingAssigned: string, training: string
  }> = [];
  LawyerDetailthree: Array<{
    activityArea: string,
    email: string, firstName: string,
    languages: string, lastName: string,
    lawyerPic: string,
    phoneNumber: string, showLawyerToUser: string,
    status: string, title: string, _id: string, totalMeetingAssigned: string, training: string
  }> = [];
  LawyerDetailfoure: Array<{
    activityArea: string,
    email: string, firstName: string,
    languages: string, lastName: string,
    lawyerPic: string,
    phoneNumber: string, showLawyerToUser: string,
    status: string, title: string, _id: string, totalMeetingAssigned: string, training: string
  }> = [];
  AllLawyerDetail: Array<{
    activityArea: string,
    email: string, firstName: string,
    languages: string, lastName: string,
    lawyerPic: string,
    phoneNumber: string, showLawyerToUser: string,
    status: string, title: string, _id: string, totalMeetingAssigned: string, training: string
  }> = [];

  headerImage: any;
  headerImageExist = false;

  aboutUsLawyerHeading: any;
  constructor(private utilService: UtilService, private ContentpagesService: contentpagesService, private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.getAboutUsHeaderImage();
    this.showimage = environment.adminserviceURL;
    this.utilService.show();
    this.contactLawyerLink = environment.contactToBookLawyerUrl;
    // this.getContentPage();
    this.getaboutus();
    this.getContentPages();
    this.getActiveshowLawyerToUser();
    // this.BindAllLawyer();
  }
  showCard(): void {
    this.cardShow = true;
    this.LawyerID = "0";
  }
  hideCard(): void {
    this.cardShow = false;
    this.LawyerID = "0";

  }
  showCardNew(LawyerID): void {
    this.cardShow = false;
    this.LawyerID = LawyerID;
  }
  hideCardNew(LawyerID): void {
    // this.cardShow = false;
    this.LawyerID = "0";

  }
  back(): void {
    window.history.back();
  }
  getAboutUsHeaderImage() {
    // debugger;
    const Pagename = 'allHeaderImages'
    this.ContentpagesService.getContentPages(Pagename).subscribe(response => {
      // console.log("response",response)
      this.headerImageExist = response.doc[0].aboutUsHeaderImgExist;
      let imageData = response.doc[0].aboutUsHeaderImg;
      // console.log("imageData",imageData)
      this.headerImage = 'url(' + environment.adminserviceURL + imageData + ')';
      // console.log("this.headerImage",this.headerImage)
    });
  }

  // getContentPage(): any {  

  //       this.ContentpagesService.getAboutUs().subscribe(aboutUsData => { 
  //       console.log('aboutUsData',aboutUsData)        
  //       });
  //     }

  getaboutus(): any {

    const Pagename = 'aboutUs'
    this.ContentpagesService.getaboutus().subscribe(aboutus => {
      //res.lawyer
      this.aboutusHeading = aboutus.aboutus;
      let array = [];
      this.aboutusHeading.forEach((element) => {
        if (element._id != this.aboutusHeading[0]._id) {
          array.push({
            // _id:element._id
            heading: element.heading,
            description: element.description
          })
        }
      })
      this.aboutUsDataArray = array;
      // console.log("this.aboutUsDataArray ",this.aboutUsDataArray )

    });
  }

  getContentPages(): any {

    const Pagename = 'aboutUs'
    this.ContentpagesService.getContentPages(Pagename).subscribe(contentpage => {

      this.aHeading = contentpage.doc[0].aboutUsHeader;
      this.aboutUsLawyerHeading = contentpage.doc[0].aboutUsLawyerHeading;

    });



  }
  getActiveshowLawyerToUser(): any {


    this.ContentpagesService.getActiveshowLawyerToUser().subscribe(Lawyer => {

      //  this.LawyerDetail = Lawyer.doc;
      this.AllLawyerDetail = Lawyer.doc;
      this.BindAllLawyer();
    });
  }
  BindAllLawyer(): any {

    if (this.AllLawyerDetail.length > 0) {
      for (let i = 0; i < this.AllLawyerDetail.length; ++i) {

        if (i < 3) {
          this.LawyerDetail.push(this.AllLawyerDetail[i]);
        }
        else if (i < 6) {
          this.LawyerDetailtwo.push(this.AllLawyerDetail[i]);
        }
        else if (i < 9) {
          this.LawyerDetailthree.push(this.AllLawyerDetail[i]);
        }
        else if (i < 12) {
          this.LawyerDetailfoure.push(this.AllLawyerDetail[i]);
        }
      }

    }
  }



}
