import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import {NewDealService} from "../../services/newDeal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentService} from "../../services/payment.service";

import { SaleService } from 'src/app/services/sale.service';
import {DialogComponent} from "../../netlex-common/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import { UtilService } from 'src/app/services/util.service';
import { BusinessTypeModel } from 'src/app/models/businessType.model';


@Component({
  selector: 'app-payment-new',
  templateUrl: './payment-new.component.html',
  styleUrls: ['./payment-new.component.scss']
})
export class PaymentNewComponent implements OnInit {
  scheduleId: string;
  paymentMethod: string;
  documentTemplateId: string;
  documentMasterId: string;
  private sub: any;
    id= '';
    ScheduleDetails = {heading: '',dateOf:'',time:'', lawyerId:''};

  paymentCard = true;
  paymentMethodNav = false;
  showLoader = false;

  innerWidth: any;

  BusinessTypeDetails = {name:'', amount:'', vat:''}

  businessType:  BusinessTypeModel[];

  isValueInDocument: boolean;
  selectedBusinessId: string;


  BusinesstypeList = {name: ''};

  isValueInbusinessType: boolean;
  businesstype='';
  businesstypeValue = ['Organisation', 'Privat'];

  documentDetails = {title: '', price: 0, unitPrice: 0, tax: 0};

  constructor(private newDealService: NewDealService,
              private router: Router,
              private paymentService: PaymentService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private translate:TranslateService,
              private api: ApiService,
              private saleService: SaleService,
              private utilService: UtilService) { }

  ngOnInit(): void {
   
    // this.utilService.show();
    // this.utilService.edit = false;
    // this.route.queryParams.subscribe(params => { // To get the param from the  router

    //   this.documentMasterId = params?.documentMasterId;
    //   this.documentTemplateId = params?.documentTemplateId;
    // });
     this.route.queryParams.subscribe(params => {
    
 
      this.scheduleId = params.scheduleId;
      console.log("------hhhhh---- " + params.scheduleId )
      
  });
  // console.log("-----------this.scheduleId--------    " + this.scheduleId )
    

    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      // this.getbusinessTypebyID();
      this.getscheduleData();
  });


this.getBusinessType();
    
  } 

 onChangebusinesstypeValue(): void { 
   
 
    this.getbusinessTypebyID();


    //  console.log("business type idn  old  " + this.selectedBusinessId);
    


}

getbusinessTypebyID(): void{
  
  console.log("selectedBusinessId in getbusinessTypebyID",this.selectedBusinessId);
  
  this.api.getBusinessdataById(this.selectedBusinessId)
        .subscribe( res => {
            this.BusinessTypeDetails.name =  res.name;
            this.BusinessTypeDetails.amount =  res.amount;
            this.BusinessTypeDetails.vat =  res.vat;

            console.log("business type idn    " + this.selectedBusinessId);
            console.log("this.BusinessTypeDetails.name   " + this.BusinessTypeDetails.name);

        },
            err => {      console.log('err', err);       }
        );
  
}


  
  


  getBusinessType(): void { // get answer types for question
    console.log("this is businesstype");
    this.api.getBusinessTypeList().subscribe(res => {
        
        console.log(res);
            this.businessType = res.doc;
            
        },
        err => {
            console.log('err', err);
        }
    );
}


 

  getDocumentDetails() {

    this.newDealService.getDocumentById(this.documentTemplateId).subscribe(fields => {

      this.documentDetails.title =  fields.documentTitle;
      // this.documentDetails.price = Number(fields.documentPrice);
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

    this.router.navigate(['/preview-Agreement'], {
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

  //schedule id
  getscheduleData() {
    console.log("this.scheduleId",this.scheduleId);
    console.log("this.id",this.id);
    console.log("this.selectedBusinessId",this.selectedBusinessId);

    this.api.scheduleById(this.scheduleId)
        .subscribe( res => {
            this.ScheduleDetails.heading =  res.heading;
            this.ScheduleDetails.dateOf =  res.dateOf;
            this.ScheduleDetails.time =  res.time;
            this.ScheduleDetails.lawyerId =  res.lawyerId;
            if(res.businessTypeId){
            console.log("res.businessTypeId",res.businessTypeId)
            this.selectedBusinessId =  res.businessTypeId;
            this.getbusinessTypebyID();
            }

        },
            err => {      console.log('err', err);       }
        );
} 

  // payment(): void {
  //   this.showLoader = true;
  //   const paymentDetail = {
  //     paymentMethod: this.paymentMethod,
  //     documentTitle: this.documentDetails.title,
  //     amount: this.documentDetails.price,
  //     tax: this.documentDetails.tax,
  //     documentId: this.documentTemplateId,
  //     masterId: this.documentMasterId
  //   };


  //   // console.log('Business Type Value' + this.businesstypeValue);
  //   // debugger;


  //   this.paymentService.paymentApi(paymentDetail).subscribe(returnData => {
  //     this.showLoader = false;
  //     window.location.href = returnData.redirect_url;

  //   }, err => {
  //     console.log('error', err);
  //     // this.spinner.hide();
  //   });
  // }
   payment(): void {
    this.showLoader = true;
    const paymentDetail = {
      paymentMethod: this.paymentMethod,
      documentTitle: this.ScheduleDetails.heading,
      amount: this.BusinessTypeDetails.amount,
      tax: this.BusinessTypeDetails.vat,
      documentId:  this.scheduleId,
      masterId: this.selectedBusinessId,
      lawyerId: this.ScheduleDetails.lawyerId,
      
    };


    // console.log('Business Type Value' + this.businesstypeValue);
    // debugger;


    this.paymentService.paymentSaleApi(paymentDetail).subscribe(returnData => {
      this.showLoader = false;
    
      window.location.href = returnData.redirect_url;
      

    }, err => {
      console.log('error', err);
      // this.spinner.hide();
    });
  }


  cancelAgreement(): void{
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
      if(result){
        this.newDealService.deleteDocumentCancelledByUser(this.documentMasterId).subscribe(deleteReturnData =>{
          let width, height;
          this.innerWidth >= 425 ? width = 400 : width = 349;
          this.innerWidth >= 425 ? height = 400 : height = 410;
          if(deleteReturnData){
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
            }else{
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
