import { Component, Inject, OnInit } from "@angular/core";
import { NyttAvtalService } from "../services/nyttavtal.service";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from "@angular/material/dialog";
import { DialogForPublishComponent } from "../nytt-avtal/nytt-avtal.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { menuactionspagename } from "../models/pagesnameandId";
import { AuthService } from "src/app/services/auth.service";
import { ApiService } from "src/app/services/api.service";
import { HttpClient } from "@angular/common/http";
@Component({
    selector: "app-document-list",
    templateUrl: "./document-list.component.html",
    styleUrls: ["./document-list.component.scss"],
})
export class DocumentListComponent implements OnInit {
    
    constructor(
        public nyttAvatlService: NyttAvtalService,
        public snackBar: MatSnackBar,
        public dialog: MatDialog,
        public router: Router,
        private authService: AuthService,
        private api: ApiService,
        private http: HttpClient
    ) { }
    
    
    documentList = [];
    documents = [];
    isChecked: boolean;
    IsInput: boolean;
    checked: boolean = false
    privatechecked: boolean;
    fortagchecked: boolean;
  
    
    alphabetHide: boolean;
   // showDatadisplay =false;
    ComingInputSoonData = false
    showloading = false;
    askQuestionFirst = false;
  //  ComingSoonApId = '';
    isEditPrices = false;
    // editPriceOfDocument = '';
    askAgreementsQuestionFirstId = '';
  
    // comingSoon:{
    //     showDatadisplay: boolean;
    // }[];

    contentPages: {
        askQuestionsFirst: boolean;
    }[];
    // documentPrice = '';
    // documentTax = '';
    ngOnInit(): void {
        this.getData();
        this.checkRoleAction();
        this.alphabetHide = false;
        this.fetchDocument();
        this.getAskQuestionsFirstData();
    }
    //   askQuestionFirstHandler(value) {
    //     console.log("value", value);
    //     this.askQuestionFirst = value;
    //     // this.askQuestionFirst = response.askQuestionFirst;
    //   }
    getAskQuestionsFirstData(): any {
        let name = 'askAgreementsQuestionsFirst'
        this.api.getAskAgreementsQuestionsFirst(name).subscribe((data) => {
            let response = data.doc[0];
            this.askAgreementsQuestionFirstId = response._id;
            //   console.log("response for ask questions first",response)
            //   console.log("this.askAgreementsQuestionFirstId",this.askAgreementsQuestionFirstId)
        });
    };
    OnInInput(){
        if (this.IsInput) {
            const foretag = "checked";
            this.Data(foretag);    
          } else {
          const foretag = "unchecked";
            this.Data(foretag);      
          }
        }

// CHeck API Call Foretag Coming Soon
        Data(foretag: string) {
            const body = {
                foretagcheckbox: foretag
            }
        this.api.postCheckForetag(body)
              .subscribe(response => {
                console.log('Data posted successfully:', response);
              }, error => {
                console.error('Error posting data:', error);
              });
          }
     

    
    
    
    onCheckboxChange() {
        if (this.isChecked) {
            const privateperson = "checked";
            this.postData(privateperson);    
        } else {
            const privateperson = "unchecked";
            this.postData(privateperson);      
        }
      }
      getData(){
        console.log("Data is Consoling---")
        this.api.getCheckPrivatePerson()
        .subscribe(response => {
          const responseArray = response as any[];
          const length = responseArray.length;
           this.privatechecked = response[length-1].privateperson == "checked" ? true : false;
          console.log('privatechecked successfully:', this.privatechecked);

        }, error => {
          console.error('Error posting data:', error);
        });
        this.api.getCheckForetag()
        .subscribe(response => {
          const responseArray = response as any[];
          const length = responseArray.length;
          this.fortagchecked = response[length-1].foretag == "checked" ? true : false;
          console.log('fortagchecked successfully:', this.fortagchecked);

        }, error => {
          console.error('Error posting data:', error);
        });
      }
// CHeck API Call PrivatePerson Coming Soon
      postData(privateperson: string) {
        console.log("privateperson----",privateperson )
        const body = {
            privatecheckbox: privateperson
        }
        this.api.postCheckPrivatePerson(body)
          .subscribe(response => {
            console.log('Data posted successfully:', response);
          }, error => {
            console.error('Error posting data:', error);
          });
      } 

    // showinputData(value: any){
    //     this.ComingInputSoonData = true;
    //     this.showDatadisplay = value;
    //     this.comingSoon = [{
    //         'showDatadisplay': value,
    //     }]

    //     this.api.ComingSoonAp(this.comingSoon, ) .subscribe(res=>{
    //         this.ComingInputSoonData = false
    //         if(value){
    //             this.ComingInputSoonData =!this.showDatadisplay
    //             console.log("Chekc--", this.ComingInputSoonData)
    //         }
    //         else{
    //             this.showDatadisplay = !this.ComingInputSoonData
    //             console.log("un-Chekc--", this.showDatadisplay)

    //         }


    //     })
    // }
    
    askQuestionFirstHandler(value: any) {
        // console.log("value", value);
        this.showloading = true;
        this.askQuestionFirst = value;
        this.contentPages = [{
            'askQuestionsFirst': value,
        }]
        this.api.updateAskAgreementsQuestionsFirst(this.contentPages, this.askAgreementsQuestionFirstId)
            .subscribe(
                res => {
                    // console.log('updateAskAgreementsQuestionsFirst res', res);
                    setTimeout(() => {
                        this.showloading = false;
                        if (value) {
                            //(SnackBar) Questions will be asked before payment
                            this.snackBar.open('Frågor kommer att ställas innan betalning', 'ok');
                        } else {
                            //(SnackBar) Questions will be asked after payment
                            this.snackBar.open('Frågor kommer att ställas efter betalning', 'ok');
                        }
                    }, 1000);
                },
                err => {
                    console.log('Error while updating "Ask Agreements Questions First"', err)
                    this.showloading = false;
                    //(SnackBar) Failed to update
                    this.snackBar.open('Det gick inte att uppdatera', 'ok');
                }
            );
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

        if (status == 'Draft') {
            if (confirm('Är du säker på att du vill opublicerat detta avtal?')) {
                this.showloading = true;
                this.nyttAvatlService.updateDocumentPrice(documentId, documentPrice, documentTax, status).subscribe(
                    (res: any) => {
                        console.log('res', res);
                        setTimeout(() => {
                            this.showloading = false;
                            this.isEditPrices = false;
                            this.snackBar.open('Dokument opublicerat', 'ok');
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
                        // if (status == 'Draft') {
                        //     //(SnackBar) Document unpublished
                        //     this.snackBar.open('Dokument opublicerat', 'ok');
                        // } else {
                        //     //(SnackBar) Document updated
                        //     this.snackBar.open('Uppdaterad framgångsrikt', 'ok');
                        // }
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
    fetchDocument(): void {
        const value = "Published";
        this.nyttAvatlService
            .getDocumentListByStatus(value)
            .subscribe((document) => {
                console.log('document', document);
                this.documentList = document.document;
                this.documentList.forEach((ele) => {
                    ele.documentPrice = Number(ele.documentPrice);
                    ele.documentTax = Number(ele.documentTax);
                })
                // this.documentPrice = document.document.documentPrice;
                // this.documentTax = document.document.documentTax;
                const sorted = this.documentList.sort((a, b) =>
                    a.documentTitle > b.documentTitle ? 1 : -1
                );
                const grouped = sorted.reduce((groups, dc) => {
                    const letter = dc.documentTitle.charAt(0);
                    groups[letter] = groups[letter] || [];
                    groups[letter].push(dc);
                    return groups;
                }, {});
                this.documents = Object.keys(grouped).map((key) => ({
                    key,
                    title: grouped[key],
                }));
            });
    }

    deleteDocument(id): void {
        this.nyttAvatlService.deleteDocumentById(id).subscribe();
        this.fetchDocument();
    }

    openDialog(id): void {
        const dialogRef = this.dialog.open(DialogForWarnComponent, {
            height: "202px",
            width: "284px",
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.deleteDocument(id);
            }
        });
    }

    edit(id): void {
        this.router.navigate(["/nyttAvtal", id]).then();
    }
    checkRoleAction(): any {
        let RoleID = this.authService.getroleID();
        let roleactionID = menuactionspagename.documentList.MAId;
        this.api.GetRoleActionByRoleIdRoleActionId(RoleID, roleactionID).subscribe(
            (res) => {
                if (res.menuactionslist.length == 0) {
                    this.authService.logout();
                }
            },
            (err) => { }
        );
    }
}


@Component({
    selector: "app-dialog-warn",
    templateUrl: "dialog-warn.html",
    styleUrls: ["dialog-document-list.scss"],
})
export class DialogForWarnComponent {
    constructor(
        public dialogRef: MatDialogRef<DialogForPublishComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { dialogData }
    ) { }

    discard(): void {
        this.dialogRef.close();
    }

    delete(): void {
        this.dialogRef.close(true);
    }
}
