import { Component, Pipe, PipeTransform, OnInit, Inject } from '@angular/core';
import { UtilService } from "../../../services/util.service";
import { environment } from "../../../../environments/environment";
import { contentpagesService } from '../../../services/contentpages.service';
import { htmlcontentModel } from '../../../models/contentpage';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DateNTimeDialogComponent } from '../date-n-time-dialog/date-n-time-dialog.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//import { Observable } from 'rxjs/internal/Observable';
import { Lawyer } from '../../../models/lawyer.model';
//import { map, tap } from 'rxjs/operators';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
// @Pipe({ name: "safeHtml" })
// export class SafeHtmlPipe implements PipeTransform {
//   constructor(private sanitizer: DomSanitizer) { }

//   transform(value) {
//     return this.sanitizer.bypassSecurityTrustHtml(value);
//   }
// }
export interface DialogComingData {
  // lawyerId: string;
}
@Component({
  selector: 'app-lawyers-dialog',
  templateUrl: './lawyers-dialog.component.html',
  styleUrls: ['./lawyers-dialog.component.scss']
})
export class LawyersDialogComponent implements OnInit {

  // cardShow = false;
  contactLawyerLink: string;
  // showhtml: any;
  // content_page: htmlcontentModel;
  LawyerID: string;
  // LawyerIDh: string;
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
  // LawyerDetailtwo: Array<{
  //   activityArea: string,
  //   email: string, firstName: string,
  //   languages: string, lastName: string,
  //   lawyerPic: string,
  //   phoneNumber: string, showLawyerToUser: string,
  //   status: string, title: string, _id: string, totalMeetingAssigned: string, training: string
  // }> = [];
  FirstTwoLawyersForMobile: Array<{
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



  aboutUsLawyerHeading: any;
  constructor(private utilService: UtilService, private ContentpagesService: contentpagesService, private sanitizer: DomSanitizer, private dialog: MatDialog, public dialogRef: MatDialogRef<DateNTimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingLawyersData: DialogComingData,) { }


  ngOnInit(): void {
    this.showimage = environment.adminserviceURL;
    this.utilService.show();
    this.contactLawyerLink = environment.contactToBookLawyerUrl;
    this.getContentPage();
    this.getaboutus();
    this.getContentPages();
    this.getActiveshowLawyerToUser();
    // this.BindAllLawyer();

    // this.openDateTimeDialogForLawyer("")
  }
  // showCard(): void {
  //   this.cardShow = true;
  //   this.LawyerID = "0";
  // }
  // hideCard(): void {
  //   this.cardShow = false;
  //   this.LawyerID = "0";

  // }
  // showCardNew(LawyerID): void {
  //   this.cardShow = false;
  //   this.LawyerID = LawyerID;
  // }
  // hideCardNew(LawyerID): void {
  //   // this.cardShow = false;
  //   this.LawyerID = "0";

  // }
  // back(): void {
  //   window.history.back();
  // }


  getContentPage(): any {

    this.ContentpagesService.getAboutUs().subscribe(aboutUsData => {
      console.log('aboutUsData', aboutUsData)
    });
  }

  getaboutus(): any {

    const Pagename = 'aboutUs'
    this.ContentpagesService.getaboutus().subscribe(aboutus => {
      //res.lawyer
      this.aboutusHeading = aboutus.aboutus;

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

        if (i < 4) {
          this.LawyerDetail.push(this.AllLawyerDetail[i]);
        }
        // else if (i < 8) {
        //   this.LawyerDetailtwo.push(this.AllLawyerDetail[i]);
        // }
        if (i < 1) {
          this.FirstTwoLawyersForMobile.push(this.AllLawyerDetail[i])
        }
      }

    }
  }
  lawyerClickHandler(lawyerdetail) {
    // console.log("lawyerdetail", lawyerdetail);
    this.openDateTimeDialogForLawyer(lawyerdetail._id);
    localStorage.setItem("selectedLawyerId",lawyerdetail._id)
    localStorage.setItem("selectedLawyerFName",lawyerdetail.firstName)
    localStorage.setItem("selectedLawyerLName",lawyerdetail.lastName)
  }
  closeLawyerSelectionDialog() {
    this.dialogRef.close();
  }
  openDateTimeDialogForLawyer(lawyerId) {
    // this.closeLawyerSelectionDialog();
    // console.log("lawyerId", lawyerId);
    const dialogRef = this.dialog.open(DateNTimeDialogComponent, {
      // height: '350px',
      // width: '600px',
      height: '90%',
      width: '90%',
      panelClass: 'mat-dialog-container-primary',
      disableClose: true,
      data: {
        //   eventIdToView : this.eventId
        lawyerId: lawyerId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      let lawyerDialogClose = localStorage.getItem("closeLawyerDialog");
      localStorage.setItem("closeLawyerDialog", undefined)
      if (lawyerDialogClose === 'true') {
        // console.log("lawyerDialogClose",lawyerDialogClose)
        this.closeLawyerSelectionDialog();
      }
    });
  }

}
