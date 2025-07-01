import { Component, OnInit } from '@angular/core';
import { NewDealService } from "../../services/newDeal.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PaymentService } from "../../services/payment.service";
import { DialogComponent } from "../../netlex-common/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  agreementType: any;
  paymentMethod: string;
  documentTemplateId: string;
  documentMasterId: string;

  paymentCard = true;
  paymentMethodNav = false;
  showLoader = false;

  innerWidth: any;
  businesstype = '';
  businesstypeValue = ['Organisation', 'Privat'];
  previousPath = '';
  agreementId = '';
  documentDetails = { title: '', price: 0, unitPrice: 0, tax: 0 };

  constructor(private newDealService: NewDealService,
    private router: Router,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private utilService: UtilService) { }

  ngOnInit(): void {
    this.paymentMethod = 'Klarna';
    let style = 'color: blue ; font-size: 17px'
    // console.log("PaymentMethod Initially Set to: ",this.paymentMethod)
    console.log(`%cPaymentMethod Initially Set to:  ${this.paymentMethod}`, style);
    this.utilService.show();
    this.utilService.edit = false;
    this.route.queryParams.subscribe(params => { // To get the param from the  router


      this.documentMasterId = params?.documentMasterId;
      this.documentTemplateId = params?.documentTemplateId;
      this.agreementId = params?.agreementId
      // console.log("this.documentMasterId",this.documentMasterId)
      // console.log("this.documentTemplateId",this.documentTemplateId)
    });
    this.agreementType = localStorage.getItem('agreementType');
    // console.log("this.agreementType", this.agreementType);
    console.log("OnInit(in Payment)")

    //For Personal Agreements
    if (this.agreementType === 'personal') {
      console.log("this.agreementType", this.agreementType);
      this.getDocumentDetails();
      //On 11-01-2023
      this.previousPath = '/userInput/' + this.agreementId;
      // console.log("this.previousPath",this.previousPath)
    }

    //For Business Agreements
    if (this.agreementType === 'business') {
      this.getDocumentDetailsOfBusiness();
      //On 11-01-2023
      this.previousPath = '/business-agreement-confirm/' + this.agreementId;
      // console.log("this.previousPath",this.previousPath)
    }
  }

  //-----------Get For Personal Agreements---------------------
  getDocumentDetails() {
    console.log("getDocumentDetails Api called");

    this.newDealService.getDocumentById(this.documentTemplateId).subscribe(fields => {
      console.log("fields(Document Details in Payment)", fields)
      this.documentDetails.title = fields.documentTitle;
      this.documentDetails.price = Number(fields.documentPrice);
      this.documentDetails.unitPrice = Number(fields.documentPrice);
      this.documentDetails.tax = Number(fields.documentTax);
      console.log("this.documentDetails.title", this.documentDetails.title);
      console.log("this.documentDetails.price", this.documentDetails.price);
      console.log("this.documentDetails.unitPrice", this.documentDetails.unitPrice);
      console.log("this.documentDetails.tax", this.documentDetails.tax);
    });


  }

  //-----------Get For Business Agreements----------------------
  getDocumentDetailsOfBusiness() {
    this.newDealService.getBusinessAgreementById(this.documentTemplateId).subscribe(fields => {

      this.documentDetails.title = fields.documentTitle;
      this.documentDetails.price = Number(fields.documentPrice);
      this.documentDetails.unitPrice = Number(fields.documentPrice);
      this.documentDetails.tax = Number(fields.documentTax);
    });
  }

  navToPaymentMethod(): void {
    this.paymentMethodNav = true;
    this.paymentCard = false;
  }

  preScreen(): void {
    //Commented on 11-01-2023
    // this.router.navigate(['/preview-Agreement'], {
    //   queryParams: {
    //     master_id: this.documentMasterId,
    //     document_id: this.documentTemplateId
    //   }
    // });

    this.router.navigate([this.previousPath], {
      queryParams: {
        master_id: this.documentMasterId,
        document_id: this.documentTemplateId
      }
    });
    this.paymentCard = false;
  }

  navToPaymentScreen(): void {
    this.paymentMethodNav = false;
    this.paymentCard = true;
  }


  payment(): void {
    this.showLoader = true;
    const paymentDetail = {
      paymentMethod: this.paymentMethod,
      documentTitle: this.documentDetails.title,
      amount: this.documentDetails.price,
      tax: this.documentDetails.tax,
      documentId: this.documentTemplateId,
      masterId: this.documentMasterId
    };


    this.paymentService.paymentApi(paymentDetail).subscribe(returnData => {
      this.showLoader = false;
      window.location.href = returnData.redirect_url;

    }, err => {
      console.log('error', err);
      // this.spinner.hide();
    });
  }


  cancelAgreement(): void {
    let width, height;
    this.innerWidth >= 425 ? width = 400 : width = 349;
    this.innerWidth >= 425 ? height = 400 : height = 410;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: width,
      height: height,
      panelClass: 'mat-dialog-container-primary',
      data: {
        header: this.translate.instant('USERINPUTS.CANCEL_CHECKOUT'),
        content: this.translate.instant('USERINPUTS.CANCEL_CHECKOUT_CONTENT'),
        action: 'Ok',
        component: 'cancel'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newDealService.deleteDocumentCancelledByUser(this.documentMasterId).subscribe(deleteReturnData => {
          let width, height;
          this.innerWidth >= 425 ? width = 400 : width = 349;
          this.innerWidth >= 425 ? height = 400 : height = 410;
          if (deleteReturnData) {
            this.dialog.open(DialogComponent, {
              width: width,
              height: height,
              panelClass: 'mat-dialog-container-primary',
              data: {
                header: this.translate.instant('USERINPUTS.CANCEL_CHECKOUT'),
                content: this.translate.instant('USERINPUTS.REMOVESUCCESS'),
                action: 'Ok',
                component: 'done'
              }
            });
          } else {
            this.dialog.open(DialogComponent, {
              width: width,
              height: height,
              panelClass: 'mat-dialog-container-primary',
              data: {
                header: this.translate.instant('USERINPUTS.CANCEL_CHECKOUT'),
                content: this.translate.instant('USERINPUTS.REMOVEFAILED'),
                action: 'Ok',
                component: 'failed'
              }
            });
          }

        });
      }
    });
  }
}
