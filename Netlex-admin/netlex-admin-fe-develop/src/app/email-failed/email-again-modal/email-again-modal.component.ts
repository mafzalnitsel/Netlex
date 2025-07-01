import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
  // animal: string;
  // name: string;
}
@Component({
  selector: 'app-email-again-modal',
  templateUrl: './email-again-modal.component.html',
  styleUrls: ['./email-again-modal.component.scss']
})
export class EmailAgainModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EmailAgainModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
  updateRequest(): any {
    localStorage.setItem('emailResend', 'Yes');
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
}



