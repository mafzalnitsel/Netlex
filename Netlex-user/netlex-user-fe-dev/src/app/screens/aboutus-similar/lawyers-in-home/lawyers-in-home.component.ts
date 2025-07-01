import { Component, Pipe, PipeTransform, OnInit, HostListener, } from '@angular/core';
import { UtilService } from "../../../services/util.service";
import { environment } from "../../../../environments/environment";
import { contentpagesService } from '../../../services/contentpages.service';
import { htmlcontentModel } from '../../../models/contentpage';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
//import { Observable } from 'rxjs/internal/Observable';
import { Lawyer } from '../../../models/lawyer.model';
//import { map, tap } from 'rxjs/operators';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";
import { LawyersInHomeDialogComponent } from './lawyers-in-home-dialog/lawyers-in-home-dialog.component'
@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
@Component({
  selector: 'app-lawyers-in-home',
  templateUrl: './lawyers-in-home.component.html',
  styleUrls: ['./lawyers-in-home.component.scss']
})
export class LawyersInHomeComponent implements OnInit {
  innerWidth: any;
  // @ViewChild('scrollLawyersDiv') scrollLawyersDiv: ElementRef;
  lawyerScrollWidth: any;
  lawyerScrollPosition: any;
  scrollNumberLimit: any;
  scrollPointNumber: number = 0;
  stopAutoScroll = false;
  stopAutoScroll2 = false;
  ///////////////////////////
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
  constructor(private router: Router, private utilService: UtilService, private ContentpagesService: contentpagesService, private sanitizer: DomSanitizer, private dialog: MatDialog,) { }


  ngOnInit(): void {
    this.showimage = environment.adminserviceURL;
    this.utilService.show();
    this.contactLawyerLink = environment.contactToBookLawyerUrl;
    this.getContentPage();
    this.getaboutus();
    this.getContentPages();
    this.getActiveshowLawyerToUser();
    // this.BindAllLawyer();
    this.lawyerScrollWidth = document.getElementById('scrollLawyersDiv').scrollWidth;
    this.lawyerScrollPosition = document.getElementById('scrollLawyersDiv').scrollLeft;
    // console.log("lawyerScrollPosition", lawyerScrollPosition);
    window.addEventListener('load', () => {
      self.setInterval(() => {
        if (!this.stopAutoScroll && !this.stopAutoScroll2) {
          // console.log("lawyerScrollPosition", this.lawyerScrollPosition)
          // console.log("this.lawyerScrollWidth",this.lawyerScrollWidth)
          // let lawyerScrollPosition = document.getElementById('scrollLawyersDiv').scrollLeft;
          if (this.scrollPointNumber < this.scrollNumberLimit) {
            // this.lawyerScrollPosition = this.lawyerScrollPosition + 1;
            this.lawyerScrollPosition = this.lawyerScrollPosition + (this.lawyerScrollWidth / 4)
            document.getElementById('scrollLawyersDiv').scrollTo(this.lawyerScrollPosition, 0)
            this.scrollPointNumber = this.scrollPointNumber + 1;
          }
          else {
            this.lawyerScrollPosition = 0;
            document.getElementById('scrollLawyersDiv').scrollTo(this.lawyerScrollPosition, 0)
            this.scrollPointNumber = 0;
          }
        }
      }, 3000);
    });
  }
  lawyerCardClickHandler(clickedLawyerdetails) {
    // console.log("clickedLawyerdetails",clickedLawyerdetails)
    this.openLawyerDetailsDialog(clickedLawyerdetails);
  }
  openLawyerDetailsDialog(showLawyerDetails) {
    // console.log("lawyerId", lawyerId);
    this.stopAutoScroll2 = true;
    const dialogRef = this.dialog.open(LawyersInHomeDialogComponent, {
      height: '95%',
      width: '80%',
      panelClass: 'mat-dialog-container-primary',
      disableClose: true,
      data: {
        //   eventIdToView : this.eventId
        showLawyerDetails: showLawyerDetails
      }
    });
    dialogRef.afterClosed().subscribe(result => {
        this.scheduleMeetingRedirect(showLawyerDetails._id);
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
  scheduleMeetingRedirect(lawyer_id){
    const scheduleMeetingOrNot = localStorage.getItem("ScheduleWithLawyerId")
    localStorage.setItem("ScheduleWithLawyerId", '')
    if (scheduleMeetingOrNot !== '') {
      // console.log("scheduleMeetingOrNot",scheduleMeetingOrNot)
      this.redirect(lawyer_id)
      // this.router.navigate(['/scheduler'], {
      //   queryParams: {
      //     lawyerId: lawyer_id
      //   }
      // });
    }
  }
  redirect(lawyer_id){
    // console.log("lawyer_id",lawyer_id)
    this.router.navigate(['/scheduler'], {
      queryParams: {
        lawyerId: lawyer_id
      }
    });
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
      this.scrollNumberLimit = this.AllLawyerDetail.length - 4;
      // this.openLawyerDetailsDialog(this.AllLawyerDetail[3]);
      this.BindAllLawyer();
    });
  }
  BindAllLawyer(): any {

    if (this.AllLawyerDetail.length > 0) {
      for (let i = 0; i < this.AllLawyerDetail.length; ++i) {

        if (i < 8) {
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
  lawyerAutoScrollHandler(value) {
    // console.log("value",value)
    this.stopAutoScroll = value;
    // if (value.type === 'mouseover') {
    //   this.stopAutoScroll = true;
    // }
    // if (value.type === 'mouseout') {
    //   this.stopAutoScroll = false;
    // }
  }
  lawyerScrollLeftHandler() {
    // this.lawyerAutoScrollHandler('click');
    // console.log("lawyerScrollWidth", this.lawyerScrollWidth);
    if (this.scrollPointNumber > 0) {
      this.scrollPointNumber = this.scrollPointNumber - 1;
    }
    this.lawyerScrollPosition = document.getElementById('scrollLawyersDiv').scrollLeft;
    // console.log("lawyerScrollPosition", this.lawyerScrollPosition);
    let moveLawyerScroll = this.lawyerScrollPosition - (this.lawyerScrollWidth / 4) /*- 10*/
    document.getElementById('scrollLawyersDiv').scrollTo(moveLawyerScroll, 0)
    let lawyerDivInnerWidth = document.getElementById('scrollLawyersDiv').getBoundingClientRect().width;
    // console.log(" lawyerDivInnerWidth", lawyerDivInnerWidth)
    // console.log(" window.innerWidth", window.innerWidth)
  }
  lawyerScrollRightHandler() {
    // this.lawyerAutoScrollHandler('click');
    // console.log("lawyerScrollWidth", this.lawyerScrollWidth);
    if (this.scrollPointNumber < this.scrollNumberLimit) {
      this.scrollPointNumber = this.scrollPointNumber + 1;
    }
    this.lawyerScrollPosition = document.getElementById('scrollLawyersDiv').scrollLeft;
    console.log("lawyerScrollPosition", this.lawyerScrollPosition);
    let moveLawyerScroll = this.lawyerScrollPosition + (this.lawyerScrollWidth / 4) /*+ 10*/
    document.getElementById('scrollLawyersDiv').scrollTo(moveLawyerScroll, 0)
    // document.getElementById('scrollLawyersDiv').scrollTo(0, 0)
    let lawyerDivInnerWidth = document.getElementById('scrollLawyersDiv').getBoundingClientRect().width;
    // console.log(" lawyerDivInnerWidth", lawyerDivInnerWidth)
    // console.log(" window.innerWidth", window.innerWidth)

  }

  // scrollLawyersDiv
  // ngAfterViewInit() {
  //   // console.log("fgfhfg", this.scrollLawyersDiv.nativeElement);
  //   document.getElementById('myBtn').addEventListener('click',function(){
  //     console.log("fghghgh",document.getElementById('scrollLawyersDiv').scrollLeft);
  // });
  // }
  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   this.innerWidth = window.innerWidth;
  //   // console.log(" this.innerWidth", this.innerWidth)
  // }

  @HostListener("document:scroll")
  scrollFunction() {
    // console.log("document.body.scrollTop", document.body.scrollHeight)
    // console.log("document.body.scrollTop2", window.scrollY)
    if (this.innerWidth > 959) {
      // if (window.scrollY > 10) {
      //   this.banner_box1 = true
      // }
    }
    else {
    }
  }

}
