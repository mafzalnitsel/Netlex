import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from "../../../../../environments/environment";
import {  Router } from '@angular/router';
export interface DialogComingLawyerDetails {
  showLawyerDetails: string;
}
@Component({
  selector: 'app-lawyers-in-home-dialog',
  templateUrl: './lawyers-in-home-dialog.component.html',
  styleUrls: ['./lawyers-in-home-dialog.component.scss']
})
export class LawyersInHomeDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<LawyersInHomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingLawyerDetails: DialogComingLawyerDetails, public router: Router,) { }
  lawyerDetails: any;
  showimage: any;
  ngOnInit(): void {
    this.showimage = environment.adminserviceURL;
    // console.log("incomingLawyerDetails",this.incomingLawyerDetails)
    this.lawyerDetails = this.incomingLawyerDetails.showLawyerDetails;
    // console.log("lawyerDetails", this.lawyerDetails)
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  scheduleMeeting() {
    localStorage.setItem("ScheduleWithLawyerId",this.lawyerDetails._id)
    localStorage.setItem("lawyerSelected", "true")
    localStorage.setItem("selectedLawyerId", this.lawyerDetails._id)
    localStorage.setItem("selectedLawyerFName", this.lawyerDetails.firstName)
    localStorage.setItem("selectedLawyerLName", this.lawyerDetails.lastName)
    localStorage.setItem("lawyerMultipleLanguages", this.lawyerDetails.multipleLanguages)
    localStorage.setItem("lawyerLanguage", this.lawyerDetails.languages)
    // this.router.navigate(['/scheduler/new-sample'], { }
    this.dialogRef.close();
  }
  // lawyerClickHandler(lawyerdetail) {
  //   // console.log("lawyerdetail", lawyerdetail);
  //   // this.openDateTimeDialogForLawyer(lawyerdetail._id);
  //   localStorage.setItem("lawyerSelected", "true")
  //   localStorage.setItem("selectedLawyerId", lawyerdetail._id)
  //   localStorage.setItem("selectedLawyerFName", lawyerdetail.firstName)
  //   localStorage.setItem("selectedLawyerLName", lawyerdetail.lastName)
  //   localStorage.setItem("lawyerMultipleLanguages", lawyerdetail.multipleLanguages)
  //   localStorage.setItem("lawyerLanguage", lawyerdetail.languages)
  //   // this.router.navigate(['/scheduler/new-sample'], {
  //   this.router.navigate(['/scheduler'], {});
  // }
}
