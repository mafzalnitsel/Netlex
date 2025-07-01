import { Component, Pipe, PipeTransform, OnInit, Inject } from '@angular/core';
import { UtilService } from "../../services/util.service";
import { environment } from "../../../environments/environment";
import { contentpagesService } from '../../services/contentpages.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { DateNTimeDialogComponent } from '../schedular-new/date-n-time-dialog/date-n-time-dialog.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LawyersDialogComponent } from './lawyer-dialog/lawyer-dialog.component'

@Component({
  selector: 'app-all-lawyers',
  templateUrl: './all-lawyers.component.html',
  styleUrls: ['./all-lawyers.component.scss']
})
export class AllLawyersComponent implements OnInit {
  LawyerID: string;
  showimage: any;
  LawyerDetail: Array<{
    activityArea: string,
    email: string, firstName: string,
    languages: string, lastName: string,
    lawyerPic: string,
    phoneNumber: string, showLawyerToUser: string,
    status: string, title: string, _id: string, totalMeetingAssigned: string, training: string
  }> = [];
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

  headerImage: any;
  headerImageExist = false;

  constructor(
    private utilService: UtilService,
    private ContentpagesService: contentpagesService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    public router: Router,
    //  public dialogRef: MatDialogRef<DateNTimeDialogComponent>
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getHeaderImage();
    this.showimage = environment.adminserviceURL;
    this.utilService.show();
    this.getActiveshowLawyerToUser();
  }
  getHeaderImage() {
    // debugger;
    const Pagename = 'allHeaderImages'
    this.ContentpagesService.getContentPages(Pagename).subscribe(response => {
      console.log("response.doc[0]",response.doc[0])
      this.headerImageExist = response.doc[0].lawyersHeaderImgExist;
      let imageData = response.doc[0].lawyersHeaderImg;
      // console.log("imageData",imageData)
      this.headerImage = 'url(' + environment.adminserviceURL + imageData + ')';
      // console.log("this.headerImage",this.headerImage)
    });
  }
  getActiveshowLawyerToUser(): any {
    this.ContentpagesService.getActiveshowLawyerToUser().subscribe(Lawyer => {
      //  this.LawyerDetail = Lawyer.doc;
      this.AllLawyerDetail = Lawyer.doc;
    });
  }
  lawyerClickHandler(lawyerdetail) {
    console.log("lawyerdetail", lawyerdetail);
    // this.openDateTimeDialogForLawyer(lawyerdetail._id);

    //Commented On 12-09-2022 (No Need)
    // localStorage.setItem("lawyerSelected", "true")
    // localStorage.setItem("selectedLawyerId", lawyerdetail._id)
    // localStorage.setItem("selectedLawyerFName", lawyerdetail.firstName)
    // localStorage.setItem("selectedLawyerLName", lawyerdetail.lastName)
    // localStorage.setItem("lawyerMultipleLanguages", lawyerdetail.multipleLanguages)
    // localStorage.setItem("lawyerLanguage", lawyerdetail.languages)

    // this.router.navigate(['/scheduler/new-sample'], {
    this.router.navigate(['/scheduler'], {
      queryParams: {
        lawyerId: lawyerdetail._id ,
      }
    });
    // this.router.navigate(['/scheduler/' + lawyerdetail._id]);

  }
  scheduleMeetingRedirect(lawyer) {
    const scheduleMeetingOrNot = localStorage.getItem("ScheduleWithLawyerId")
    localStorage.setItem("ScheduleWithLawyerId", '')
    // console.log("scheduleMeetingOrNot", scheduleMeetingOrNot)
    if (scheduleMeetingOrNot !== '') {
      // console.log("scheduleMeetingOrNot",scheduleMeetingOrNot)
      this.lawyerClickHandler(lawyer);
      // this.router.navigate(['/scheduler'], {
      //   queryParams: {
      //     lawyerId: lawyer_id
      //   }
      // });
    }
  }
  openLawyerDetailsDialog(showLawyerDetails) {
    // console.log("lawyerId", lawyerId);\
    const dialogRef = this.dialog.open(LawyersDialogComponent, {
      height: '95%',
      width: '80%',
      panelClass: 'mat-dialog-container-primary',
      // disableClose: true,
      data: {
        //   eventIdToView : this.eventId
        showLawyerDetails: showLawyerDetails
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.scheduleMeetingRedirect(showLawyerDetails);
      // const scheduleMeetingOrNot = localStorage.getItem("ScheduleWithLawyerId")
      // localStorage.setItem("ScheduleWithLawyerId", '')
      // if (scheduleMeetingOrNot !== '') {
      //   // console.log("scheduleMeetingOrNot",scheduleMeetingOrNot)
      //   this.router.navigate(['/scheduler'], {
      //     queryParams: {
      //       lawyerId: showLawyerDetails._id
      //     }
      //   });
      // }
    });
  }
}
