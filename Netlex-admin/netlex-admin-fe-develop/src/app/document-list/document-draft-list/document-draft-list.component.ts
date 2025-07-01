import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogForPublishComponent } from '../../nytt-avtal/nytt-avtal.component';
import { NyttAvtalService } from '../../services/nyttavtal.service';
import { Router } from '@angular/router';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
    selector: 'app-document-draft-list',
    templateUrl: './document-draft-list.component.html',
    styleUrls: ['./document-draft-list.component.scss']
})
export class DocumentDraftListComponent implements OnInit {

    documentList = [];
    documents = [];
    isEditPrices = false;
    showloading = false;
    constructor(private dialog: MatDialog,
        private nyttAvatlService: NyttAvtalService, public snackBar: MatSnackBar,
        public router: Router, private api: ApiService, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.checkRoleAction();
        this.fetchDocument();
    }

    fetchDocument(): void {
        const value = 'Draft';
        this.nyttAvatlService.getDocumentListByStatus(value).subscribe(document => {
            this.documentList = document.document;
            this.documentList.forEach((ele) => {
                ele.documentPrice = Number(ele.documentPrice);
                ele.documentTax = Number(ele.documentTax);
            })
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
    editPricesHandler(value: any) {
        console.log('value', value);
        this.isEditPrices = value;
    }
    taxAddition(event: any, document: any, index: number): void {
        // console.log('event', event);
        // console.log('data',data);
        // console.log('index',index);
        // console.log('this.documents', this.documents);
        // console.log('document', document);
        // this.documentTax = (data * 0.25).toString();
        // console.log('this.documentPrice',this.documentPrice);
        // document.documentPrice = data;
        document.documentTax = (event * 0.25).toString();
        // document.documentTax = (data * 0.25);
    }
    updateDocumentPrice(value: any, status: string) {
        console.log('value', value);
        // let status = 'Published';
        let documentId = value._id;
        let documentPrice = value.documentPrice;
        let documentTax = value.documentTax;
        if (status == 'Published') {
            if (confirm('Är du säker på att du vill publicera detta avtal?')) {
                this.showloading = true;
                this.nyttAvatlService.updateDocumentPrice(documentId, documentPrice, documentTax, status).subscribe(
                    (res: any) => {
                        console.log('res', res);
                        setTimeout(() => {
                            this.showloading = false;
                            this.isEditPrices = false;
                            this.snackBar.open('Dokument publiceras', 'ok');
                            this.fetchDocument();
                        }, 1000);
                    },
                    (err: any) => {
                        console.log('err', err);
                        this.showloading = false;
                        this.snackBar.open('Uppdaterar misslyckad', 'ok');
                    },
                );
            }
        }
        else {
            this.showloading = true;
            this.nyttAvatlService.updateDocumentPrice(documentId, documentPrice, documentTax, status).subscribe(
                (res: any) => {
                    console.log('res', res);
                    setTimeout(() => {
                        this.showloading = false;
                        this.isEditPrices = false;
                        this.snackBar.open('Uppdaterad framgångsrikt', 'ok');
                        this.fetchDocument();
                    }, 1000);
                },
                (err: any) => {
                    console.log('err', err);
                    this.showloading = false;
                    this.snackBar.open('Uppdaterar misslyckad', 'ok');
                },
            );
        }


    }
    deleteDocument(id): void {
        this.nyttAvatlService.deleteDocumentById(id).subscribe(res => {
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
        this.router.navigate(['/nyttAvtal', id]);
    }
    checkRoleAction(): any {
        let RoleID = this.authService.getroleID();
        let roleactionID = menuactionspagename.documentDraftList.MAId;
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
    selector: 'app-dialog-delete-list',
    templateUrl: 'dialog-delete-list.html',
    styleUrls: ['./document-draft-list.component.scss']
})
export class DialogForPublishListComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogForPublishComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {}) { }

    discard(): void {
        this.dialogRef.close();
    }

    delete(): void {
        this.dialogRef.close(true);
    }

}
