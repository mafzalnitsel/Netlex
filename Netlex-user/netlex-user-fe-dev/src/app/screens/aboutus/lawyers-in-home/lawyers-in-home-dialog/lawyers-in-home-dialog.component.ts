import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from "../../../../../environments/environment";
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
    @Inject(MAT_DIALOG_DATA) public incomingLawyerDetails: DialogComingLawyerDetails,) { }
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
    this.dialogRef.close();
  }
}
