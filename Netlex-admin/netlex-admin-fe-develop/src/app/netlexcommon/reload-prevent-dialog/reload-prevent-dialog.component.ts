import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-reload-prevent-dialog',
  templateUrl: './reload-prevent-dialog.component.html',
  styleUrls: ['./reload-prevent-dialog.component.scss']
})
export class ReloadPreventDialogComponent implements OnInit {
  isHome: boolean = false;

  constructor(
      public dialogRef: MatDialogRef<ReloadPreventDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {action}
  ) {

    if (this.data.action === 'home'){
      this.isHome = true;
    }

  }

  ngOnInit(): void {
  }

  onNoClick(action): void {
    this.dialogRef.close(action);
  }

}
