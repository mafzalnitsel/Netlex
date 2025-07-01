import { Component, OnInit, Inject,Pipe,PipeTransform } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from "../../../../environments/environment";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(value) {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}
export interface DialogComingLawyerDetails {
  showLawyerDetails: string;
}
@Component({
  selector: 'app-lawyer-dialog',
  templateUrl: './lawyer-dialog.component.html',
  styleUrls: ['./lawyer-dialog.component.scss']
})
export class LawyersDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<LawyersDialogComponent>,
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
