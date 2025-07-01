import { Component, Inject, OnInit } from '@angular/core';
import { BusinessAgreementsService } from '../../services/businessAgreement.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogForPublishComponent } from '../../nytt-avtal/nytt-avtal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { menuactionspagename } from '../../models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-list-business-agreements',
  templateUrl: './list-business-agreements.component.html',
  styleUrls: ['./list-business-agreements.component.scss']
})
export class ListBusinessAgreementsComponent implements OnInit {

  constructor(public businessAgreementsService: BusinessAgreementsService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
    private authService: AuthService, private api: ApiService
  ) {
  }

  documentList = [];
  documents = [];
  alphabetHide: boolean;

  ngOnInit(): void {
    this.checkRoleAction();
    this.alphabetHide = false;
    this.fetchDocument();
  }

  fetchDocument(): void {
    const value = 'Published';
    this.businessAgreementsService.getbusinessAgreementsListByStatus(value).subscribe(document => {
      console.log("docu", document)
      this.documentList = document.document;
      const sorted = this.documentList.sort((a, b) => a.documentTitle > b.documentTitle ? 1 : -1);
      const grouped = sorted.reduce((groups, dc) => {
        const letter = dc.documentTitle.charAt(0);
        groups[letter] = groups[letter] || [];
        groups[letter].push(dc);
        return groups;
      }, {});
      this.documents = Object.keys(grouped).map(key => ({ key, title: grouped[key] }));
    });
  }

  deletebusinessAgreement(id): void {
    this.businessAgreementsService.deleteBusinessAgreementsById(id).subscribe();
    this.fetchDocument();
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(DialogForWarnComponent, {
      height: '202px',
      width: '284px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletebusinessAgreement(id);
      }
    });
  }

  edit(id): void {
    this.router.navigate(['/business-agreements', id]).then();
  }
  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.businessAgreementsList.MAId;
    this.api.GetRoleActionByRoleIdRoleActionId(RoleID, roleactionID)
      .subscribe(
        res => {
          if (res.menuactionslist.length == 0) {
            this.authService.logout();
          }

        },
        err => { }
      );
  }
}

@Component({
  selector: 'app-dialog-warn',
  templateUrl: 'dialog-warn.html',
  styleUrls: ['dialog-document-list.scss']
})
export class DialogForWarnComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogForPublishComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dialogData }) { }

  discard(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.dialogRef.close(true);
  }



}
