import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from './dialog.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        private userServices : UserService,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        
    }


    onNoClick(event): void {
        this.userServices.createAgreement.next(event)

        this.dialogRef.close();
    }

    onClickFirstButton(): void {
        this.dialogRef.close(true);
    }

}

