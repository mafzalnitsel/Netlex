import { Component, Inject, OnInit, HostListener, Pipe, PipeTransform } from '@angular/core';
import { NewDealService } from '../../../services/newDeal.service';
import { AnswerOptionService } from '../../../services/answerOption.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from '../../../services/payment.service';
import { UtilService } from '../../../services/util.service';
import { DialogForUserDetailComponent } from '../../agreement/agreement.component';
import { RouterService } from "../../../services/router.service";
import { forkJoin } from "rxjs";
import { DialogComponent } from "../../../netlex-common/dialog/dialog.component";
import { TranslateService } from '@ngx-translate/core';
import { environment } from "../../../../environments/environment";
import { contentpagesService } from '../../../services/contentpages.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
@Component({
  selector: 'app-business-agreement-confirm',
  templateUrl: './business-agreement-confirm.component.html',
  styleUrls: ['./business-agreement-confirm.component.scss']
})
export class BusinessAgreementConfirmComponent implements OnInit {
  //----||---New---||----//
  bookButton: any;
  otherVideoPlaying: any;
  videoPauseStart: any;
  videoStarted = false;
  // videos = [{ id: 'video1', path: 'assets/videos/video1.mp4' }, { id: 'video2', path: 'assets/videos/video1.mp4' }, { id: 'video3', path: 'assets/videos/video1.mp4' },]
  // videos = [{ id: 'video1', path: 'assets/videos/video1.mp4', value: false }, { id: 'video2', path: 'assets/videos/video1.mp4', value: false },]
  videos = []
  // videos = [{ path: 'assets/videos/video1.mp4' }]
  videosExists = false;
  numOfVideos: any;
  showUserInputQuestions = false;
  // showUserInputQuestions = true;
  // userInputBoxHeight = '350px';
  // documentId: string;
  // documentUnitPrice: number;
  // documentTax: number;
  // documentTitle: string;
  documentDescription: string;
  documentTotal: number;
  documentTitleWords: number;

  // ownedHeroBanner = '';
  ownedHeroBanner = false;
  // sameHeroBanner = '';
  uniqueHeaderImage = '';
  globalHeaderImage = '';
  //----||---New---||----//
  selectedDocumentId: string;
  documentList = [];
  fieldList = [];
  index = 0;
  pdfSrc: string;
  pdf: string;
  documentId: string;
  fieldID: string;
  getIndex = 0;
  answerType: string;
  conditionValue: string;
  subQuestion: string;
  klarnaBtn = 'btn-default';
  stripeBtn = 'btn-default';
  swishBtn = 'btn-default';
  conditionOperator: string;
  isCurrDisplaySubQuestion = false;
  fieldId: string;
  nextBtn = true;
  isSubmit = false;
  isPreviousButtonDisable = true;
  userInputCard = true;
  paymentCard = false;
  question: any;
  nextFields = 3;
  previewFields = 0;
  paymentMethod: string;
  previewPdf = false;
  fieldData: any;
  paymentMethodNav = false;
  documentUnitPrice: number;
  documentTax: number;
  documentTitle: string;
  documentPrice: number;
  state: string;
  isDisable = true;
  showLoader = false;
  innerWidth: any;
  masterId: string;
  userInputs: {
    documentFieldId: string, fieldId: string, answer: string, name: string,
    fieldObjectId: string, userId: string, question: string
  }[];
  subQuestionInputs: {
    documentFieldId: string, fieldId: string, answer: string, name: string,
    fieldObjectId: string, userId: string, question: string
  }[];
  isValueInDocument: boolean;
  currentDocumentId: string;
  count = 0;
  subQuestionAnswer = [];
  preview: number;
  i: any;
  isEdit = false;

  constructor(private authService: AuthService, private newDealService: NewDealService,
    private answerOption: AnswerOptionService, private snackBar: MatSnackBar,
    private route: ActivatedRoute, private utilService: UtilService,
    private paymentService: PaymentService,
    private routeService: RouterService,
    private router: Router, public dialog: MatDialog,
    private translate: TranslateService, private ContentpagesService: contentpagesService,) {
  }

  ngOnInit(): void {
    // var str = "your long";
    // var wordCount = str.match(/(\w+)/g).length;
    // alert(wordCount);
    window.scroll(0, 0)

    // this.sameHeroBanner = 'url(' + environment.adminserviceURL + 'heroBanners/agreementConfirmHeaderPic_637e257d8874ecd30dcb2a74.jpg)' ;
    this.getSchedulerHeaderImage();
    //console.log("environment",environment.adminserviceURL)
    this.userInputCard = true;
    this.paymentCard = false;
    this.previewPdf = false;
    this.paymentMethodNav = false;
    this.utilService.show();
    this.utilService.edit = false;

    let isEdit = false;

    this.route.params.subscribe(params => {
      this.documentId = params?._id;
    });

    this.route.queryParams.subscribe(params => {
      isEdit = params?.edit;
      this.isEdit = params?.edit;
      this.masterId = params?.master_id;

    });
    if (this.documentId) {
      // this.newDealService.getDocumentById(this.documentId).subscribe(fields => {
      //     this.documentTitle = fields.documentTitle;
      //     this.documentPrice = Number(fields.documentPrice);
      //     this.documentUnitPrice = Number(fields.documentPrice);
      //     this.documentTax = Number(fields.documentTax);
      // });
      this.newDealService.getBusinessAgreementById(this.documentId).subscribe(fields => {
        // debugger;
        // console.log("fields",fields)
        this.documentTitle = fields.documentTitle;
        this.documentDescription = fields.documentDescription;
        this.documentPrice = Number(fields.documentPrice);
        this.documentUnitPrice = Number(fields.documentPrice);
        this.documentTax = Number(fields.documentTax);
        this.documentTotal = Number(fields.documentPrice) + Number(fields.documentTax);
        //Count words
        var str = this.documentTitle;
        this.documentTitleWords = str.match(/(\w+)/g).length;
        // alert(this.documentTitleWords);
        //======Getting Own Hero Banner Dynamically======
        if (fields.agreementConfirmPic) {
          //  this.ownedHeroBanner = environment.adminserviceURL + fields.agreementConfirmPic;

          //  this.ownedHeroBanner = 'url(' + environment.adminserviceURL + fields.agreementConfirmPic +')';
          this.ownedHeroBanner = true;
          this.uniqueHeaderImage = 'url(' + environment.adminserviceURL + fields.agreementConfirmPic + ')'
          //  console.log("this.ownedHeroBanner",this.ownedHeroBanner)
        } else {
          this.ownedHeroBanner = false;
        }
        //===========Getting Videos Dynamically===========
        if (fields.videoPaths) {
          if (fields.videoPaths.length > 0) {
            // console.log("videoPaths", fields.videoPaths)
            this.videosExists = true;
            let videoPaths = fields.videoPaths;
            let showVideo = environment.adminserviceURL;
            videoPaths.forEach((element, index) => {
              // console.log("element",element)
              this.videos.push({
                id: 'video' + (index + 1),
                path: showVideo + element.url,
                value: false
              })
              // console.log("this.videos",this.videos)
            })
            if (fields.videoPaths.length === 1) {
              // console.log("1videos", fields.videoPaths)
              this.numOfVideos = 1;
            }
            if (fields.videoPaths.length === 2) {
              // console.log("2videos", fields.videoPaths)
              this.numOfVideos = 2;
            }
          }
          // this.videos
        }
      });
    }

    if (isEdit) {
      this.existDocumentDetails(this.documentId);
    } else {
      this.documentChange(this.documentId);
    }

    // if (this.routeService.data) {
    //     this.stateWiseShow(this.routeService.data.state);
    // }

    this.utilService.show();//New

  }
  //--------||-------New-------||--------//
  getSchedulerHeaderImage() {
    const Pagename = 'allHeaderImages'
    this.ContentpagesService.getContentPages(Pagename).subscribe(response => {
      //   console.log("response",response)
      let imageData = response.doc[0].schedulerHeaderImg;
      // console.log("imageData",imageData)
      this.globalHeaderImage = 'url(' + environment.adminserviceURL + imageData + ')';
      // console.log("this.globalHeaderImage",this.globalHeaderImage)
    });
  }
  // showUserInputsHandler() {
  //   this.showUserInputQuestions = true;
  // }
  videoPlayPause() {
    // var myVideo: any = document.getElementById("my_video_1");
    this.videoPauseStart = document.getElementById("my_video_1");
    // if (this.videoPauseStart.paused) {
    //   this.videoPauseStart.play();
    //   this.videoStarted = true;
    // }
    // else {
    //   this.videoPauseStart.pause();
    //   this.videoStarted = false;
    // };
  }
  onVideoHoverHandler(event, id) {
    // console.log("event", event.type)
    // console.log("id", id)
    // this.videos.map((x, i) => {
    //     if (x.id === id) {
    //         this.videos[i].value = true
    //     }
    //     else {
    //         this.videos[i].value = false
    //     }
    // })
    if (this.numOfVideos === 1) {
      this.videoPauseStart = document.getElementById(id);
      if (event.type === 'mouseover') {
        // this.videoPauseStart = document.getElementById(id);
        this.videoPauseStart.setAttribute("controls", "controls")
        this.videoStarted = true;
        this.videos.find(x => x.id === id).value = true;
      }
      else if (event.type === 'mouseout') {
        // this.videoPauseStart = document.getElementById(id);
        this.videoPauseStart.removeAttribute("controls");
        if (this.videoPauseStart.paused) {
          this.videoStarted = false;
          // this.videos.find(x => x.id === id).value = false;
          this.videos.find(x => x.id === id).value = false;
        }
        // this.videoStarted = false;
      }
    }
    if (this.numOfVideos === 2) {
      const newId = this.videos.find(x => x.id !== id).id
      this.otherVideoPlaying = document.getElementById(newId);
      this.videoPauseStart = document.getElementById(id);
      if (event.type === 'mouseover') {
        // this.videoPauseStart = document.getElementById(id);
        this.videoPauseStart.setAttribute("controls", "controls")
        this.videoStarted = true;
        this.videos.find(x => x.id === id).value = true;
        // this.videos.find(x => x.id !== id).value = false;
        if (!this.videoPauseStart.paused) {
          if (!this.otherVideoPlaying.paused) {
            // console.log('otherPlaying')
            this.otherVideoPlaying.pause();
          }
        }
      }
      else if (event.type === 'mouseout') {
        // this.videoPauseStart = document.getElementById(id);
        this.videoPauseStart.removeAttribute("controls");
        if (this.videoPauseStart.paused) {
          this.videoStarted = false;
          // this.videos.find(x => x.id === id).value = false;
          this.videos.find(x => x.id === id).value = false;
        }
        if (!this.videoPauseStart.paused) {
          if (!this.otherVideoPlaying.paused) {
            // console.log('otherPlaying')
            this.otherVideoPlaying.pause();
          }
        }
        // this.videoStarted = false;
      }
    }


    // console.log("newId",newId)
  }

  submit(): any {
    // console.log("this.documentId", this.documentId);

    if (localStorage.getItem('email') || localStorage.getItem('guestUserId')) {
      
      // localStorage.setItem('agreementType','business')
      localStorage.setItem('agreementType','personal')

      this.router.navigate(['/payment'],
        { queryParams: { documentMasterId: this.masterId, documentTemplateId: this.documentId, agreementId:this.documentId } });

    } else {
      // console.log("else");

      this.dialog.open(DialogForPaymentComponent, {
        data: {
          questionData: this.question,
          source: 'SaveAnswer',
          documentTemplateId: this.documentId,
          masterId: this.masterId
        },
        panelClass: 'full-dialog',
        height: '400px',
        width: '400px'
      },);
      this.routeService.data = { documentId: this.documentId };

      this.userInputCard = true;
    }

  }

  existDocumentDetails(documentTemplateId): void {

    let masterId = '';
    let index = 0;
    this.route.queryParams.subscribe(params => {
      masterId = params.master_id;
      index = Number(params.index) + 1;
    });

    if (index != 0) {

      if (((Number(index)) % 3) === 0) {

        this.nextFields = index;
        this.previewFields = index - 3;
      } else if (((Number(index) + 1) % 3) === 0) {

        this.nextFields = Number(index) + 1;
        this.previewFields = Number(index) - 2;
      } else if (((Number(index) + 2) % 3) === 0) {

        this.nextFields = Number(index) + 2;
        this.previewFields = Number(index) - 1;
      }

    } else {

      this.nextFields = 3;
      this.previewFields = 0;
    }

    const req1 = this.newDealService.fetchFieldsByDocumentId(documentTemplateId);
    const req3 = this.newDealService.getAnswerByMasterId(masterId);

    const results = forkJoin(req1, req3);

    this.userInputs = [];
    this.subQuestionInputs = [];

    results.subscribe(([fields, answers]) => {

      this.fieldData = answers;

      fields['fieldList']?.forEach((filedListData, index) => {
        this.userInputs.push({
          documentFieldId: filedListData._id,
          fieldId: filedListData.fieldId._id,

          answer: this.fieldData.filter(answer => {
            return answer.fieldId == filedListData.fieldId.field._id
          })
            ? this.fieldData.filter(answer => {
              return answer.fieldId == filedListData.fieldId.field._id
            })[0]['answer'] : '',

          name: filedListData.fieldId.field.name,
          fieldObjectId: filedListData.fieldId.field._id,
          userId: localStorage.getItem('id'),
          question: filedListData.fieldId.field.questionList,
        });

        if (filedListData.fieldId.subQuestion?.field._id) {
          this.subQuestionAnswer = this.fieldData.filter(subInputs => subInputs.fieldId ===
            filedListData.fieldId.subQuestion?.field._id);

        }

        this.subQuestionInputs.push({
          documentFieldId: filedListData._id,

          fieldId: filedListData.fieldId.subQuestion
            ? filedListData.fieldId.subQuestion?.field._id : '',

          // answer: '',

          answer: filedListData.fieldId.subQuestion ? this.fieldData.filter(answer => {
            return answer.fieldId ==
              filedListData.fieldId.subQuestion?.field._id
          }) ?
            this.fieldData.filter(answer => {
              return answer.fieldId ==
                filedListData.fieldId.subQuestion?.field._id
            })[0]['answer'] : '' : '',

          name: filedListData.fieldId.subQuestion ? filedListData.fieldId.subQuestion?.field.name : '',

          fieldObjectId: filedListData.fieldId.subQuestion ?
            filedListData.fieldId.subQuestion?.field._id : '',

          userId: localStorage.getItem('id'),
          question: filedListData.fieldId.subQuestion?.field.questionList,
        });
        this.fieldList.push(filedListData);
        this.fieldList[index].isMainQuestion = true;
      });

      this.isPreviousButtonDisable = false;

      if (this.nextFields >= this.fieldList.length) {
        this.isSubmit = true;
        this.nextBtn = false;
        this.isPreviousButtonDisable = false;
      }

      if (this.previewFields === 0) {
        this.isPreviousButtonDisable = true;
      }


    });

  }

  documentChange(documentId): void {
    // this.openDialog();
    this.index = 0;
    this.count = 0;
    this.isCurrDisplaySubQuestion = false;
    this.currentDocumentId = this.selectedDocumentId;

    this.newDealService.fetchFieldsByDocumentId(documentId).subscribe(fields => {
      this.userInputs = [];
      this.subQuestionInputs = [];

      fields.fieldList.forEach((filedListData, index) => {

        this.userInputs.push({
          documentFieldId: filedListData._id,
          fieldId: filedListData.fieldId._id,
          answer: '',
          name: filedListData.fieldId.field.name,
          fieldObjectId: filedListData.fieldId.field._id,
          userId: localStorage.getItem('id'),
          question: filedListData.fieldId.field.questionList,
        });

        this.subQuestionInputs.push({
          documentFieldId: filedListData._id,
          fieldId: filedListData.fieldId.subQuestion ? filedListData.fieldId.subQuestion?.field._id : '',
          answer: '',
          name: filedListData.fieldId.subQuestion ? filedListData.fieldId.subQuestion?.field.name : null,
          fieldObjectId: filedListData.fieldId.subQuestion ?
            filedListData.fieldId.subQuestion?.field._id : '',
          userId: localStorage.getItem('id'),
          question: filedListData.fieldId.subQuestion?.field.questionList,
        });
        this.fieldList.push(filedListData);
        this.fieldList[index].isMainQuestion = true;
      });

      if (fields.fieldList != null && fields.fieldList.length > 0) {

        if (fields.fieldList.length <= 3) {
          this.isSubmit = true;
          this.nextBtn = false;
        }
      } else {
        this.isSubmit = true;
        this.nextBtn = false;
      }
    });

  }

}
@Component({
  selector: 'dialog-payment',
  templateUrl: './dialog-payment.html',
  styleUrls: ['./business-agreement-confirm.component.scss']
})
export class DialogForPaymentComponent implements OnInit {

  pdfSrc = '';
  paymentMethod: string;
  payeeName: string;
  documentId: string;
  paymentScreen = false;
  question: any;
  documentDetail: any;
  saveForLater = false;


  constructor(public dialogRef: MatDialogRef<DialogForPaymentComponent>, @Inject(MAT_DIALOG_DATA)
  public data: { questionData, source, documentTemplateId, masterId },
    private paymentService: PaymentService, private authService: AuthService,
    private newDealService: NewDealService, public router: Router,
    public utilService: UtilService, public dialog: MatDialog) {
    this.documentId = data.documentTemplateId;
    this.question = data.questionData;

    if (this.documentId) {
      this.newDealService.getDocumentById(this.documentId).subscribe(fields => {
        this.documentDetail = fields;
      });
    }

  }

  ngOnInit(): void {
    if (this.data.source === 'SaveForLater') {
      this.saveForLater = true;
    }
    this.utilService.show();
  }


  click(): void {
    this.dialogRef.close();
  }

  login(): void {
    if (localStorage.getItem('guestUserId')) {
      // this.newDealService.getAnswerByMasterId(localStorage.getItem('getCurrentDocumentMasterId')).subscribe(returnData => {
      //
      // });
      this.router.navigate(['/login'], {
        queryParams: {
          master_id: localStorage.getItem('getCurrentDocumentMasterId'),
          document_id: localStorage.getItem('getCurrentDocumentId'),
          source: this.data.source
        }
      });
      this.dialogRef.close();
    } else {
      this.newDealService.submitFieldAnswer('', this.question, 'SaveAnswer').subscribe(returnData => {
        this.router.navigate(['/login'], {
          queryParams: {
            master_id: returnData.savedUserDocumentMaster._id,
            document_id: this.documentId,
            source: this.data.source
          }
        });
        localStorage.setItem('documentIdToSave', returnData.savedUserDocumentMaster._id);

      });
      this.dialogRef.close();
    }


  }
  loginWithoutQA(): void {
    if (localStorage.getItem('guestUserId')) {
        console.log("if")

        // this.newDealService.getAnswerByMasterId(localStorage.getItem('getCurrentDocumentMasterId')).subscribe(returnData => {
        //
        // });
        this.router.navigate(['/login'], {
            queryParams: {
                master_id: localStorage.getItem('getCurrentDocumentMasterId'),
                document_id: localStorage.getItem('getCurrentDocumentId'),
                source: this.data.source
            }
        });
        this.dialogRef.close();
    } else {
        console.log("else")
        // this.newDealService.submitFieldAnswer('', this.question, 'SaveAnswer').subscribe(returnData => {
            this.router.navigate(['/login'], {
                queryParams: {
                    // master_id: returnData.savedUserDocumentMaster._id,
                    document_id: this.documentId,
                    source: this.data.source
                }
            });
            // localStorage.setItem('documentIdToSave', returnData.savedUserDocumentMaster._id);

        // });
        this.dialogRef.close();
    }


}
  register(): void {
    if (localStorage.getItem('guestUserId')) {
      this.router.navigate(['/register'], {
        queryParams: {
          master_id: localStorage.getItem('getCurrentDocumentMasterId'),
          document_id: localStorage.getItem('getCurrentDocumentId'),
          source: this.data.source
        }
      });
      this.dialogRef.close();
    } else {
      this.newDealService.submitFieldAnswer('', this.question, 'SaveAnswer').subscribe(returnData => {
        this.router.navigate(['/register'], {
          queryParams: {
            master_id: returnData.savedUserDocumentMaster._id,
            document_id: this.documentId,
            source: this.data.source
          }
        });
        localStorage.setItem('documentIdToSave', returnData.savedUserDocumentMaster._id);

      });

      // localStorage.setItem('documentData', JSON.stringify(this.questionList));
      // localStorage.setItem('documentTemplateId', this.documentId);
      this.dialogRef.close();
    }

  }

  registerWithoutQA(): void {
    if (localStorage.getItem('guestUserId')) {
        this.router.navigate(['/register'], {
            queryParams: {
                master_id: localStorage.getItem('getCurrentDocumentMasterId'),
                document_id: localStorage.getItem('getCurrentDocumentId'),
                source: this.data.source
            }
        });
        this.dialogRef.close();
    } else {
        // this.newDealService.submitFieldAnswer('', this.question, 'SaveAnswer').subscribe(returnData => {
        //     this.router.navigate(['/register'], {
        //         queryParams: {
        //             master_id: returnData.savedUserDocumentMaster._id,
        //             document_id: this.documentId,
        //             source: this.data.source
        //         }
        //     });
        //     localStorage.setItem('documentIdToSave', returnData.savedUserDocumentMaster._id);

        // });
        this.router.navigate(['/register'], {
            queryParams: {
                // master_id: returnData.savedUserDocumentMaster._id,
                document_id: this.documentId,
                source: this.data.source
            }
        });
        // localStorage.setItem('documentData', JSON.stringify(this.questionList));
        // localStorage.setItem('documentTemplateId', this.documentId);
        this.dialogRef.close();
    }

}
  generate(): void {
    this.paymentScreen = true;
  }

  skip(): void {
    this.dialog.open(DialogForUserDetailComponent, {
      data: { questionData: this.data.questionData, masterId: this.data.masterId, documentId: this.documentId },
      panelClass: 'full-dialog',
      height: '580px',
      width: '400px'
    });
    this.dialogRef.close();

  }

  subscribe(): void {
    const paymentDetail = {
      paymentMethod: this.paymentMethod,
      documentTitle: this.documentDetail.documentTitle,
      amount: this.documentDetail.documentPrice,
      tax: this.documentDetail.documentTax,
    };
  }

  addWaterMark(doc): void {
    const totalPages = doc.internal.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setTextColor(150);
      doc.text(50, doc.internal.pageSize.height - 30, 'Netlex');
    }

    return doc;
  }
}