import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogForPublishComponent} from '../../nytt-avtal/nytt-avtal.component';
import {NyttAvtalService} from '../../services/nyttavtal.service';
import { BusinessAgreementsService } from '../../services/businessAgreement.service';
import {Router} from '@angular/router';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-drafts-business-agreements',
  templateUrl: './drafts-business-agreements.component.html',
  styleUrls: ['./drafts-business-agreements.component.scss']
})
export class DraftsBusinessAgreementsComponent implements OnInit {

    documentList = [];
    documents = [];

    constructor(private dialog: MatDialog,
                private businessAgreementsService: BusinessAgreementsService,
                public router: Router,private api:ApiService,private authService:AuthService) {
    }

    ngOnInit(): void {
        this.checkRoleAction();
        this.fetchDocument();
    }

    fetchDocument(): void {
        const value = 'Draft';
        this.businessAgreementsService.getbusinessAgreementsListByStatus(value).subscribe(document => {
            this.documentList = document.document;
            const sorted = this.documentList.sort((a, b) => a.documentTitle > b.documentTitle ? 1 : -1);
            const grouped = sorted.reduce((groups, dc) => {
                const letter = dc.documentTitle.charAt(0);
                groups[letter] = groups[letter] || [];
                groups[letter].push(dc);
                return groups;
            }, {});
            this.documents = Object.keys(grouped).map(key => ({key, title: grouped[key]}));
        });
    }

    deleteDocument(id): void {
        this.businessAgreementsService.deleteBusinessAgreementsById(id).subscribe(res => {
        });
        this.fetchDocument();
    }


    openDialog(id): void {
        const dialogRef = this.dialog.open(DialogForPublishListComponent, {});

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteDocument(id);
            }
        });
    }

    edit(id): void {
        this.router.navigate(['/business-agreements', id]);
    }
    checkRoleAction():any
    {
        let RoleID =this.authService.getroleID();
        let roleactionID=menuactionspagename.businessAgreementsDraftList.MAId;
        this.api.GetRoleActionByRoleIdRoleActionId(RoleID,roleactionID)
        .subscribe(
          res => { 
            if(res.menuactionslist.length==0){
                this.authService.logout();
            }
            
          },
          err => { }
        );
    }
}

@Component({
    selector: 'app-dialog-delete-list',
    templateUrl: 'dialog-delete-list.html',
    styleUrls: ['./drafts-business-agreements.component.scss']
})
export class DialogForPublishListComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogForPublishComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {}) {}

    discard(): void {
        this.dialogRef.close();
    }

    delete(): void {
        this.dialogRef.close(true);
    }

}
