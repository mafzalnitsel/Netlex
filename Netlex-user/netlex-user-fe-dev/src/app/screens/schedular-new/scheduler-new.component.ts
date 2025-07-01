import { Lawyer } from '../../models/lawyer.model';
import { Component, Pipe, PipeTransform, ViewChild, AfterViewInit, OnInit, HostListener, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Scheduler } from '../../models/scheduler.model';
import { UtilService } from '../../services/util.service';
import { ApiService } from '../../services/api.service';
import { ScheduleService } from '../../services/schedule.service';
import { AuthService } from "../../services/auth.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { DialogComponent } from "../../netlex-common/dialog/dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { clientsDetailsservice } from 'src/app/services/clientsDetails.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from "../../../environments/environment";
import { contentpagesService } from '../../services/contentpages.service';
import { DateNTimeDialogComponent } from './date-n-time-dialog/date-n-time-dialog.component'
import { AnswerTypeService } from 'src/app/services/answerType.service';
@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(value) {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}
@Component({
    selector: 'app-scheduler-new',
    templateUrl: './scheduler-new.component.html',
    styleUrls: ['./scheduler-new.component.scss']
})
export class SchedulerNewComponent implements OnInit,OnDestroy  {
    lawyerAvailable = false;
    selectedAttachment: File = null; // Variable to store file
    lawyerName = "";
    FocNonFoc = "";
    choosenLawyerId: any;
    checkFoc$ = this._answertypeservice.myGlobalValue.asObservable()
    constructor(private api: ApiService, public utilService: UtilService,
        private authService: AuthService, private scheduleService: ScheduleService,
        private _answertypeservice : AnswerTypeService,
        private dialog: MatDialog, //public dialogRef: MatDialogRef<DateTimeDialog2Component>,
        private router: Router, private route: ActivatedRoute, private translate: TranslateService,
        private ClientsDetailsservice: clientsDetailsservice, private ContentpagesService: contentpagesService,) { }

    sessionValueold = [
        '09:00:00 - 09:30:00', '09:30:00 - 10:00:00',
        '10:00:00 - 10:30:00', '10:30:00 - 11:00:00',
        '11:00:00 - 11:30:00', '11:30:00 - 12:00:00',
        '12:00:00 - 12:30:00', '12:30:00 - 13:00:00',
        '13:00:00 - 13:30:00', '13:30:00 - 14:00:00',
        '14:00:00 - 14:30:00', '14:30:00 - 15:00:00',
        '15:00:00 - 15:30:00', '15:30:00 - 16:00:00',
        '16:00:00 - 16:30:00', '16:30:00 - 17:00:00',
        '17:00:00 - 17:30:00', '17:30:00 - 18:00:00',
        '18:00:00 - 18:30:00', '18:30:00 - 19:00:00',
    ];
    sessionValuett = ['10 AM - 11AM (10 Minuter)', '12 PM - 01 PM (30 Minuter)', '03 PM - 04 PM'];
    sessionValuet = ['09:00:00 - 09:30:00',
        '09:30:00 - 10:00:00',
        '10:00:00 - 10:30:00',
        '10:30:00 - 11:00:00',
        '11:00:00 - 11:30:00',
        '11:30:00 - 12:00:00',
        '12:00:00 - 12:30:00',
        '12:30:00 - 13:00:00',
        '13:00:00 - 13:30:00',
        '13:30:00 - 14:00:00',
        '14:00:00 - 14:30:00',
        '14:30:00 - 15:00:00',
        '15:00:00 - 15:30:00',
        '15:30:00 - 16:00:00',
        '16:00:00 - 16:30:00',
        '16:30:00 - 17:00:00',
        '17:00:00 - 17:30:00',
        '17:30:00 - 18:00:00',
        '18:00:00 - 18:30:00',
        '18:30:00 - 19:00:00',]

    sessionValue = [
        '09:00:00 - 09:30:00',
        '09:30:00 - 10:00:00',
        '10:00:00 - 10:30:00',
        '10:30:00 - 11:00:00',
        '11:00:00 - 11:30:00',
        '11:30:00 - 12:00:00',
        '12:00:00 - 12:30:00',
        '12:30:00 - 13:00:00',
        '13:00:00 - 13:30:00',
        '13:30:00 - 14:00:00',
        '14:00:00 - 14:30:00',
        '14:30:00 - 15:00:00',
        '15:00:00 - 15:30:00',
        '15:30:00 - 16:00:00',
        '16:00:00 - 16:30:00',
        '16:30:00 - 17:00:00',
        '17:00:00 - 17:30:00',
        '17:30:00 - 18:00:00',
        '18:00:00 - 18:30:00',
        '18:30:00 - 19:00:00',
    ];


    language = '';
    Foc = 'NonFoc';
    reasonOfFoc = '';
    statusExpireTime: any;

    // languageValue = ['Any', 'English', 'Swedish'];
    languageValue = [];
    FocNonFocValue = ['Foc', 'NonFoc'];
    docSubmit: any = false;
    showLoading = false;
    lawyerList = [];
    schedulerForm: FormGroup;

    Ssn: any;

    toSsn: any = false;

    showLoader = false;
    // minDate = new Date();
    currentFullDate = new Date();
    tomorrowFullDate: any;
    minDate: any;
    alreadySelectedDate: any;
    ///////---NEW---///////
    // lawType = ['Family Law', 'Criminal Law', 'Civil Law', 'Business Law', 'Educational Law', 'Insurance Law', 'Immigration']
    lawType = [];
    selectedLawType: string = '';
    selectedLawyerId: any;
    selectedLawyerName = '';
    freeFOC : string="Inledande rådgivningsmöte (Kostnadsfritt)" ;
    selectedLawyerFName: any;
    selectedLawyerLName: any;
    selectedLawyerEmail: any;
    lawyerMultipleLanguages: any;
    lawyerPic: any;
    // language: any;
    selectedDate = '';
    selectedDate2 = '2022-11-17';
    selectedTime = '';
    placeholderForAutoFill = 'Ej valt'
    headerImage: any;
    headerImageExist = false;
    showimage: any;
    data: any ;
    ///////---NEW---///////

    ngOnInit(): void {
        this.getSchedulerHeaderImage();
        this.showimage = environment.adminserviceURL;
        let MOBILE_PATTERN = /[0-9\+\-\ ]/;
        this.schedulerForm = new FormGroup({
            heading: new FormControl('', [Validators.required]),
            dateOf: new FormControl('', [Validators.required]),
            time: new FormControl('', [Validators.required]),
            description: new FormControl(''),
            language: new FormControl('', [Validators.required]),
            attachment: new FormControl(''),
            lawyer: new FormControl('', [Validators.required]),
            lawyerId: new FormControl('', [Validators.required]),
            userName: new FormControl('', [Validators.required]),
            userEmail: new FormControl('', [Validators.required, Validators.email]),
            userSSN: new FormControl('', [Validators.required]),
            userPhoneNo: new FormControl('', [Validators.required, Validators.pattern(MOBILE_PATTERN)]),
            focnonfoc: new FormControl(true),
            reasonOfFoc: new FormControl(''),
            counterpartyName: new FormControl(''),
            counterpartySSN: new FormControl(''),
            
        });
        this.setFormsValue()
        this.utilService.show();
        this.docSubmit = false;
        ////////////////////////-----NEW-----/////////////////////////
        this.tomorrowFullDate = new Date(this.currentFullDate.setDate(this.currentFullDate.getDate() + 1));
        this.minDate = this.tomorrowFullDate.toISOString().split('T')[0];
        this.alreadySelectedDate = this.minDate;
        /////////////////////////-----NEW-----/////////////////////////
        this.statusExpireTime = '2022-01-24';
        //---------When user comes from lawyer click-------\\
        this.route.queryParams.subscribe(params => {
            this.choosenLawyerId = params.lawyerId;
            // console.log("lawyerId", params.lawyerId)
            if (params.lawyerId) {
                // console.log("lawyerId exist", params.lawyerId)
                this.getLawyerById();
            } else {
                this.router.navigate(['/allLawyers'], {});
            }
        });
        ///////////////////////////////////////////

        window.scroll(0, 0);
        let lawyerSelectedOrNot = localStorage.getItem("lawyerSelected");
        localStorage.setItem("lawyerSelected", '')
        // console.log("lawyerSelectedOrNot", lawyerSelectedOrNot)
        // if (lawyerSelectedOrNot === 'true') {
        // this.openDateTimeDialogForLawyer("")
        // let selectedLawyerId = localStorage.getItem("selectedLawyerId");
        // let selectedLawyerFName = localStorage.getItem("selectedLawyerFName");
        // let selectedLawyerLName = localStorage.getItem("selectedLawyerLName");
        // let lawyerMultipleLanguages = localStorage.getItem("lawyerMultipleLanguages");
        // let languages = localStorage.getItem("lawyerLanguage");
        // // console.log("languages", languages)
        // localStorage.setItem("selectedLawyerId", '')
        // localStorage.setItem("selectedLawyerFName", '')
        // localStorage.setItem("selectedLawyerLName", '')
        // localStorage.setItem("lawyerMultipleLanguages", '')
        // localStorage.setItem("lawyerLanguage", '')

        // if (selectedLawyerId !== '') {
        //     this.selectedLawyerId = selectedLawyerId;
        //     // console.log("selectedLawyerId", this.selectedLawyerId)
        // }
        // if (selectedLawyerFName !== '' && selectedLawyerLName !== '') {
        //     this.selectedLawyerName = selectedLawyerFName + ' ' + selectedLawyerLName;
        //     // console.log("selectedLawyerName", this.selectedLawyerName)
        // }
        // if (lawyerMultipleLanguages !== '' && lawyerMultipleLanguages === "true") {
        //     this.lawyerMultipleLanguages = lawyerMultipleLanguages;
        //     // console.log("lawyerMultipleLanguages", this.lawyerMultipleLanguages)
        // }
        // if (languages !== '') {
        //     this.language = languages;
        //     // console.log("language", this.language)
        // }
        // this.openDateTimeDialogForLawyer(selectedLawyerId)

        // }

        // localStorage.getItem("selectedLawyerId")
        // localStorage.getItem("selectedLawyerFName")
        // localStorage.getItem("selectedLawyerLName")
    }

    ngOnDestroy() {
        this._answertypeservice.myGlobalValue.next('default')
      }
    getSchedulerHeaderImage() {
        // debugger;
        const Pagename = 'allHeaderImages'
        this.ContentpagesService.getContentPages(Pagename).subscribe(response => {
            //   console.log("response",response)
            this.headerImageExist = response.doc[0].schedulerHeaderImgExist;
            let imageData = response.doc[0].schedulerHeaderImg;
            // console.log("imageData",imageData)
            this.headerImage = 'url(' + environment.adminserviceURL + imageData + ')';
            // console.log("this.headerImage",this.headerImage)
        });
    }
    
    getLawyerById() {
        this.ContentpagesService.getLawyerById(this.choosenLawyerId)

            .subscribe(
                (res : any) => {
                    console.log("resresres", res)
                    // this.setFormsValue(res)
                    this.selectedLawyerFName = res.firstName;
                    this.selectedLawyerLName = res.lastName;
                    this.selectedLawyerName = res.firstName + ' ' + res.lastName;
                    this.lawyerMultipleLanguages = res.multipleLanguages;
                    this.lawyerPic = res.lawyerPic;
                    this.selectedLawyerEmail = res.email;
                    if (this.lawyerMultipleLanguages) {
                        // console.log("this.lawyerMultipleLanguages",this.lawyerMultipleLanguages)
                        this.languageValue = res.languages;
                    }
                    else {
                        // console.log("this.lawyerMultipleLanguages",this.lawyerMultipleLanguages)
                        this.language = res.languages[0];
                    }
                    this.lawType = res.activityArea;
                    this.selectedLawyerId = res._id
                    // this.email = res.email;
                    // this.phoneNumber = res.phoneNumber;
                    // this.training = res.training;
                    // this.languages = res.languages;
                    // this.selectedLanguages = res.languages;
                    // this.multipleLanguages = res.multipleLanguages;
                    // this.languages =['Svenska', 'Engelska',  'Arabiska', 'Persiska'];
                    // this.activityArea = res.activityArea;
                    // this.title = res.title;

                    this.openDateTimeDialogForLawyer(this.choosenLawyerId)
                    
                    

                },
                err => { }
            );
    }

    setFormsValue(){
        let data = JSON.parse(localStorage.getItem('userInfo'))
        // console.log(data)
        this.schedulerForm.get('userSSN').patchValue(data?.ssn);
        this.schedulerForm.get('userEmail').patchValue(data?.email);
        this.schedulerForm.get('userName').patchValue(data?.userName);
        this.schedulerForm.get('userPhoneNo').patchValue(data?.phoneNumber);
        if(this._answertypeservice.myGlobalValue.value === 'FreeFoc'){
            this.Foc = 'Foc'
        this.schedulerForm.get('reasonOfFoc').patchValue('Gratis inledande rådgivning eller konsultation');
        this.schedulerForm.get('heading').patchValue('Inledande rådgivningsmöte (Kostnadsfritt)');
    this.reasonOfFoc = 'Gratis inledande rådgivning eller konsultation'
        }
        
    }

    openDateTimeDialogForLawyer(lawyerId) {
        // this.closeLawyerSelectionDialog();
        // console.log("lawyerId", lawyerId);
        // console.log("this.selectedDate",this.selectedDate);
        // console.log("this.selectedTime",this.selectedTime);

        const dialogRef = this.dialog.open(DateNTimeDialogComponent, {
            // height: '350px',
            // width: '600px',
            height: '90%',
            width: '90%',
            panelClass: 'mat-dialog-container-primary',
            // disableClose: true,
            data: {
                //   eventIdToView : this.eventId
                lawyerId: lawyerId,
                selectedLawyerName: this.selectedLawyerName,
                // selectedDate: this.selectedDate,
                // selectedTime: this.selectedTime,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            //Get
            // let selectedLawyerId = localStorage.getItem("selectedLawyerId");
            // let selectedLawyerFName = localStorage.getItem("selectedLawyerFName");
            // let selectedLawyerLName = localStorage.getItem("selectedLawyerLName");
            let selectedDate = localStorage.getItem("selectedDate");
            let selectedTime = localStorage.getItem("selectedTime");
            //Remove
            localStorage.setItem("selectedLawyerId", '')
            localStorage.setItem("selectedLawyerFName", '')
            localStorage.setItem("selectedLawyerLName", '')
            localStorage.setItem("selectedDate", '')
            localStorage.setItem("selectedTime", '')
            //save
            // if (selectedLawyerId !== '') {
            //     this.selectedLawyerId = selectedLawyerId;
            //     console.log("selectedLawyerId", this.selectedLawyerId)
            // }
            if (selectedDate !== '') {
                this.selectedDate = selectedDate;
                // console.log("selectedDate", this.selectedDate)
            }
            if (selectedTime !== '') {
                this.selectedTime = selectedTime;
                // console.log("selectedTime", this.selectedTime)
            }
            // if (selectedLawyerFName !== '' && selectedLawyerLName !== '') {
            //     this.selectedLawyerName = selectedLawyerFName + ' ' + selectedLawyerLName;
            //     console.log("selectedLawyerName", this.selectedLawyerName)
            // }
            //console
            // console.log("selectedLawyerId", this.selectedLawyerId)
            // console.log("selectedLawyerFName", this.selectedLawyerFName)
            // console.log("selectedLawyerLName", this.selectedLawyerLName)
            // console.log("selectedLawyerName", this.selectedLawyerName)
            // console.log("selectedDate", this.selectedDate)
            // console.log("selectedTime", this.selectedTime)
        });
    }
    getclientsDetailstoEmail(toEmail): any {

        this.ClientsDetailsservice.getclientsDetailstoEmail(toEmail).subscribe(clientsDetails => {
            if (clientsDetails.clientsDetails.length !== 0) {
                // console.log('toEmail true')
                this.showLoader = false;

                const dialogRef = this.dialog.open(DialogComponent, {
                    height: '400px',
                    width: '400px',
                    panelClass: 'mat-dialog-container-primary',
                    data: {
                        header: "du kan inte skapa ett advokatschema",
                        content: "du kan inte skapa ett advokatschema",
                        component: 'register'
                    }
                });
                // dialogRef.afterClosed().subscribe(result => {
                //     // this.router.navigate(['/scheduler']);
                // });
                return;

            }
            else {
                // console.log('toEmail false')
                this.getclientsDetailstoPhoneNumber(this.schedulerForm.value.userPhoneNo)

            }
        });
    }

    getclientsDetailstoPhoneNumber(toPhoneNumber): any {

        this.ClientsDetailsservice.getclientsDetailstoPhoneNumber(toPhoneNumber).subscribe(clientsDetails => {
            if (clientsDetails.clientsDetails.length !== 0) {
                // console.log('toPhoneNumber true')
                this.showLoader = false;

                const dialogRef = this.dialog.open(DialogComponent, {
                    height: '400px',
                    width: '400px',
                    panelClass: 'mat-dialog-container-primary',
                    data: {
                        // header: this.translate.instant('SCHEDULER.METTING_SCHEDULED_TITLE'),
                        // content: this.translate.instant('SCHEDULER.METTING_SCHEDULED_DESC'),
                        header: "du kan inte skapa ett advokatschema",
                        content: "du kan inte skapa ett advokatschema",
                        component: 'register'
                    }
                });
                // dialogRef.afterClosed().subscribe(result => {
                //     // this.router.navigate(['/scheduler']);
                // });
                return;
            }
            else {
                // console.log('toPhoneNumber false')
                this.getclientsDetailstoSsn(this.schedulerForm.value.userSSN)
            }
        })
    }

    getclientsDetailstoSsn(toSsn): any {

        this.ClientsDetailsservice.getclientsDetailstoSsn(toSsn).subscribe(clientsDetails => {
            if (clientsDetails.clientsDetails.length !== 0) {
                // console.log('toSsn true')
                this.showLoader = false;

                const dialogRef = this.dialog.open(DialogComponent, {
                    height: '400px',
                    width: '400px',
                    panelClass: 'mat-dialog-container-primary',
                    data: {
                        // header: this.translate.instant('SCHEDULER.METTING_SCHEDULED_TITLE'),
                        // content: this.translate.instant('SCHEDULER.METTING_SCHEDULED_DESC'),
                        header: "du kan inte skapa ett advokatschema",
                        content: "du kan inte skapa ett advokatschema",
                        component: 'register'
                    }
                });
                // dialogRef.afterClosed().subscribe(result => {
                //     // this.router.navigate(['/scheduler']);
                // });
                return;

            }
            else {
                // console.log('toSsn false')
                this.docSubmit = true;
                // if (this.schedulerForm.invalid || (!this.lawyerAvailable && this.schedulerForm.value.lawyer != 'Any')) {
                //     return;
                // }
                // else {
                // const lawyerId = (this.schedulerForm.value.lawyer === 'Any' ? this.findNextAvailableLawyer() :
                //     this.schedulerForm.value.lawyer.lawyer._id);

                const dataValue = new Scheduler(
                    this.schedulerForm.value.heading,
                    this.schedulerForm.value.dateOf,
                    this.schedulerForm.value.time,
                    this.schedulerForm.value.description,
                    this.schedulerForm.value.language,
                    this.schedulerForm.value.lawyerId,
                    'New',
                    this.schedulerForm.value.lawyerId,
                    this.schedulerForm.value.userName,
                    this.schedulerForm.value.lawyer,


                    this.schedulerForm.value.userEmail,
                    this.schedulerForm.value.userSSN,
                    this.schedulerForm.value.userPhoneNo,
                    this.schedulerForm.value.reasonOfFoc,
                    this.statusExpireTime,

                    this.schedulerForm.value.counterpartyName,
                    this.schedulerForm.value.counterpartySSN,


                );

                const formData: FormData = new FormData();
                formData.append('heading', this.schedulerForm.value.heading);
                formData.append('dateOf', this.schedulerForm.value.dateOf);
                formData.append('time', this.schedulerForm.value.time);
                formData.append('description', this.schedulerForm.value.description);
                formData.append('language', this.schedulerForm.value.language);
                formData.append('status', 'Möte begärt');
                formData.append('lawyerId', this.schedulerForm.value.lawyerId);
                // formData.append('lawyer',this.lawyerName);// this.schedulerForm.value.lawyer);

                formData.append('userName', this.schedulerForm.value.userName);
                formData.append('userEmail', this.schedulerForm.value.userEmail);
                formData.append('userSSN', this.schedulerForm.value.userSSN);
                formData.append('userPhoneNo', this.schedulerForm.value.userPhoneNo);
                formData.append('focnonfoc', this.Foc);
                formData.append('reasonOfFoc', this.reasonOfFoc);
                formData.append('statusExpireTime', this.statusExpireTime);
                formData.append('counterpartyName', this.schedulerForm.value.counterpartyName);
                formData.append('counterpartySSN', this.schedulerForm.value.counterpartySSN);


                // if (this.selectedAttachment) {
                //     formData.append('attachment', this.selectedAttachment, this.selectedAttachment.name);
                // }


                this.authService.schedule(formData)
                    .subscribe(
                        res => {
                            //console.log('formData',formData)
                            // const formData = new FormData();
                            if (this.selectedAttachment != undefined) {
                                formData.append('file', this.selectedAttachment);
                                formData.append('meetingId', res._id);
                                this.authService.uploadMeetingAttachment(formData)
                                    .subscribe(res => {
                                        // this.snackBar.open('Företag avtal Pdf har uppdaterats', 'ok');
                                        // this.openDialog('publishSave')
                                        // this.openDialog('publishSave');
                                        // this.pdfUploadingLoader = false;

                                        // this.showLoader = false;

                                    },
                                        err => {
                                            console.log('err', err);
                                            // this.showLoader = false;

                                            // this.pdfUploadingLoader = false;
                                            // this.snackBar.open('uploading failed', 'ok');

                                        }
                                    );
                            }

                            this.docSubmit = false;
                            this.schedulerForm.reset();
                            this.showLoader = false;

                            const dialogRef = this.dialog.open(DialogComponent, {
                                height: '400px',
                                width: '400px',
                                panelClass: 'mat-dialog-container-primary',
                                data: {
                                    header: this.translate.instant('SCHEDULER.METTING_SCHEDULED_TITLE'),
                                    content: this.translate.instant('SCHEDULER.METTING_SCHEDULED_DESC'),
                                    component: 'register'
                                }
                            });
                            dialogRef.afterClosed().subscribe(result => {
                                this.router.navigate(['/']);
                            });
                        }
                    );
                // }
            }
        });
    }

    submit(): void {
        this.docSubmit = true;
        // console.log('userSSNuserSSN', this.statusExpireTime)
        // this.testSubmittion();
        ///////---NEW---///////
        this.showLoader = true;
        if (this.selectedDate) {
            this.schedulerForm.value.dateOf = this.selectedDate;
            // console.log("this.selectedDate", this.selectedDate)
        }
        if (this.selectedTime) {
            this.schedulerForm.value.time = this.selectedTime;
            // console.log("this.selectedTime", this.selectedTime)
        }
        if (this.selectedLawyerName) {
            this.schedulerForm.value.lawyer = this.selectedLawyerName;
            // console.log("this.selectedLawyerName", this.selectedLawyerName)
        }
        if (this.selectedLawyerId) {
            this.schedulerForm.value.lawyerId = this.selectedLawyerId;
            // console.log("this.selectedLawyerId", this.selectedLawyerId)
        }
        if (this.language) {
            this.schedulerForm.value.language = this.language;
            // console.log("this.language", this.language)
        }
        ///////---NEW---///////

        // console.log(" this.schedulerForm.value.heading", this.schedulerForm.value.heading)
        // console.log("this.schedulerForm.value.dateOf", this.schedulerForm.value.dateOf)
        // console.log("this.schedulerForm.value.time", this.schedulerForm.value.time)
        // console.log("this.schedulerForm.value.description", this.schedulerForm.value.description)
        // console.log("this.schedulerForm.value.language", this.schedulerForm.value.language)
        // console.log("this.schedulerForm.value.attachment", this.schedulerForm.value.attachment)
        // console.log(" this.schedulerForm.value.userName", this.schedulerForm.value.userName)
        // console.log("this.schedulerForm.value.lawyer", this.schedulerForm.value.lawyer)
        // console.log("this.schedulerForm.value.lawyerId", this.schedulerForm.value.lawyerId)
        // console.log("this.schedulerForm.value.userEmail", this.schedulerForm.value.userEmail)
        // console.log("this.schedulerForm.value.userSSN", this.schedulerForm.value.userSSN)
        // console.log("this.schedulerForm.value.userPhoneNo", this.schedulerForm.value.userPhoneNo)
        // console.log("this.schedulerForm.value.reasonOfFoc", this.schedulerForm.value.reasonOfFoc)
        // console.log("this.statusExpireTime", this.statusExpireTime)
        // console.log("this.schedulerForm.value.reasonOfFoc", this.schedulerForm.value.counterpartyName)
        // console.log("this.schedulerForm.value.reasonOfFoc", this.schedulerForm.value.counterpartySSN)
        // this.schedulerForm.value.heading = 'Migrationsverket'; 
        console.log(this.schedulerForm.value)

        if (this.schedulerForm.value.heading && this.schedulerForm.value.dateOf && this.schedulerForm.value.time /*&& this.schedulerForm.value.description*/
            && this.schedulerForm.value.language /*&& this.schedulerForm.value.attachment*/ && this.schedulerForm.value.userName && this.schedulerForm.value.lawyer
            && this.schedulerForm.value.lawyerId && this.schedulerForm.value.userEmail && this.schedulerForm.value.userSSN && this.schedulerForm.value.userPhoneNo
            && ((this.Foc == 'Foc' && this.schedulerForm.value.reasonOfFoc) || this.Foc == 'NonFoc')
            &&  this.schedulerForm.value.counterpartyName && this.schedulerForm.value.counterpartySSN /*&& this.schedulerForm.value.counterpartySSN*/
            // && ((!this.schedulerForm.value.counterpartyName && this.schedulerForm.value.counterpartyName === " " /*&& this.schedulerForm.value.counterpartySSN*/) || this.schedulerForm.value.counterpartySSN === " ")
            
            ) {
console.log(this.schedulerForm.value)
            console.log("All fields are filled")
            // this.schedulerForm.invalid = false;
            if (this.schedulerForm.controls['userEmail'].errors?.email) {
                this.showLoader = false;
                const dialogRef = this.dialog.open(DialogComponent, {
                    height: '400px',
                    width: '400px',
                    panelClass: 'mat-dialog-container-primary',
                    data: {
                        header: "Ogiltig e-post",
                        content: "Förlåt, Den angivna e-postadressen är ogiltig.",
                        component: 'register'
                    }
                });
                return;
            }
            if (this.schedulerForm.value.userSSN === this.schedulerForm.value.counterpartySSN) {
                // console.log("same ssn")
                this.showLoader = false;
                const dialogRef = this.dialog.open(DialogComponent, {
                    height: '400px',
                    width: '400px',
                    panelClass: 'mat-dialog-container-primary',
                    data: {
                        header: "Ange ett annat personnummer",
                        content: "Ditt och motpartens personnummer bör inte vara detsamma",
                        component: 'register'
                    }
                });
                // dialogRef.afterClosed().subscribe(result => {});
                return;
            }
        }
        else if(this._answertypeservice.myGlobalValue.value === 'FreeFoc' && this.schedulerForm.value.heading
             && this.schedulerForm.value.dateOf 
             && this.schedulerForm.value.time /*&& this.schedulerForm.value.description*/
             && this.schedulerForm.value.language /*&& this.schedulerForm.value.attachment*/ && this.schedulerForm.value.userName && this.schedulerForm.value.lawyer
            && this.schedulerForm.value.lawyerId 
            && this.schedulerForm.value.userEmail 
            && this.schedulerForm.value.userSSN
            && this.schedulerForm.value.userPhoneNo
            && ((this.Foc == 'Foc' && this.schedulerForm.value.reasonOfFoc) || this.Foc == 'NonFoc')
            && ((this.schedulerForm.value.heading !== 'Migrationsrätt'  && this.schedulerForm.value.heading !== 'Migrationsverket')
             /*&& this.schedulerForm.value.counterpartySSN*/) || this.schedulerForm.value.heading === 'Migrationsrätt'){
            if (this.schedulerForm.controls['userEmail'].errors?.email) {
                this.showLoader = false;
                const dialogRef = this.dialog.open(DialogComponent, {
                    height: '400px',
                    width: '400px',
                    panelClass: 'mat-dialog-container-primary',
                    data: {
                        header: "Ogiltig e-post",
                        content: "Förlåt, Den angivna e-postadressen är ogiltig.",
                        component: 'register'
                    }
                });
                return;
            }
            if (this.schedulerForm.value.userSSN === this.schedulerForm.value.counterpartySSN) {
                // console.log("same ssn")
                this.showLoader = false;
                const dialogRef = this.dialog.open(DialogComponent, {
                    height: '400px',
                    width: '400px',
                    panelClass: 'mat-dialog-container-primary',
                    data: {
                        header: "Ange ett annat personnummer",
                        content: "Ditt och motpartens personnummer bör inte vara detsamma",
                        component: 'register'
                    }
                });
                // dialogRef.afterClosed().subscribe(result => {});
                return;
            }
        }
        else if(this.schedulerForm.value.heading === 'Migrationsrätt' || this.schedulerForm.value.heading === 'Migrationsverket' 
        &&  this.schedulerForm.value.dateOf 
             && this.schedulerForm.value.time /*&& this.schedulerForm.value.description*/
             && this.schedulerForm.value.language /*&& this.schedulerForm.value.attachment*/ && this.schedulerForm.value.userName && this.schedulerForm.value.lawyer
            && this.schedulerForm.value.lawyerId 
            && this.schedulerForm.value.userEmail 
            && this.schedulerForm.value.userSSN
            && this.schedulerForm.value.userPhoneNo
            && ((this.Foc == 'Foc' && this.schedulerForm.value.reasonOfFoc) || this.Foc == 'NonFoc')
           
             /*&& this.schedulerForm.value.counterpartySSN*/) {
            if (this.schedulerForm.controls['userEmail'].errors?.email) {
                this.showLoader = false;
                const dialogRef = this.dialog.open(DialogComponent, {
                    height: '400px',
                    width: '400px',
                    panelClass: 'mat-dialog-container-primary',
                    data: {
                        header: "Ogiltig e-post",
                        content: "Förlåt, Den angivna e-postadressen är ogiltig.",
                        component: 'register'
                    }
                });
                return;
            }
            if (this.schedulerForm.value.userSSN === this.schedulerForm.value.counterpartySSN) {
                // console.log("same ssn")
                this.showLoader = false;
                const dialogRef = this.dialog.open(DialogComponent, {
                    height: '400px',
                    width: '400px',
                    panelClass: 'mat-dialog-container-primary',
                    data: {
                        header: "Ange ett annat personnummer",
                        content: "Ditt och motpartens personnummer bör inte vara detsamma",
                        component: 'register'
                    }
                });
                // dialogRef.afterClosed().subscribe(result => {});
                return;
            }
        }
        else {
            console.log("All fields not filled---", this.schedulerForm.value.counterpartyName)
            this.showLoader = false;
            const dialogRef = this.dialog.open(DialogComponent, {
                height: '400px',
                width: '400px',
                panelClass: 'mat-dialog-container-primary',
                data: {
                    header: this.translate.instant('SCHEDULER.ERROR'),
                    content: this.translate.instant('SCHEDULER.FILL_IN_FEILDS'),
                    component: 'register'
                }
            });
            return;
        }
        // console.log("this.schedulerForm.invalid", this.schedulerForm.invalid)
        // if (this.schedulerForm.invalid) {
        //     this.showLoader = false;
        //     const dialogRef = this.dialog.open(DialogComponent, {
        //         height: '400px',
        //         width: '400px',
        //         panelClass: 'mat-dialog-container-primary',
        //         data: {
        //             header: this.translate.instant('SCHEDULER.ERROR'),
        //             content: this.translate.instant('SCHEDULER.FILL_IN_FEILDS'),
        //             component: 'register'
        //         }
        //     });
        //     return;
        // }
        if (!this.lawyerAvailable && this.schedulerForm.value.lawyer === 'Any') {
            this.showLoader = false;
            const dialogRef = this.dialog.open(DialogComponent, {
                height: '400px',
                width: '400px',
                panelClass: 'mat-dialog-container-primary',
                data: {
                    header: this.translate.instant('SCHEDULER.ERROR'),
                    content: this.translate.instant('SCHEDULER.CHOOSE_LAWYER'),
                    component: 'register'
                }
            })
            return;
        }
        this.getclientsDetailstoEmail(this.schedulerForm.value.userEmail)

        // this.getclientsDetailstoSsn(this.schedulerForm.value.userSSN)

        // this.getclientsDetailstoPhoneNumber(this.schedulerForm.value.userPhoneNo)

        // console.log('userSSNuserSSNuserSSNuserSSN', this.schedulerForm.value.userSSN)


    }
    testSubmittion() {
        // console.log('toSsn false')
        this.docSubmit = true;
        // if (this.schedulerForm.invalid || (!this.lawyerAvailable && this.schedulerForm.value.lawyer != 'Any')) {
        //     return;
        // }
        // else {
        const formData: FormData = new FormData();
        formData.append('heading', 'heading');
        formData.append('dateOf', 'dateOf');
        formData.append('time', 'time');
        formData.append('description', 'description');
        formData.append('language', 'language');
        formData.append('status', 'Möte begärt');
        formData.append('lawyerId', '633d65231831ee47c000d3f2');
        formData.append('userName', 'userName');
        formData.append('userEmail', 'userEmail');
        formData.append('userSSN', 'userSSN');
        formData.append('userPhoneNo', 'userPhoneNo');
        formData.append('focnonfoc', 'focnonfoc');
        formData.append('reasonOfFoc', 'reasonOfFoc');
        formData.append('statusExpireTime', 'statusExpireTime');
        formData.append('counterpartyName', 'counterpartyName');
        formData.append('counterpartySSN', 'counterpartySSN');



        if (this.selectedAttachment) {
            formData.append('attachment', this.selectedAttachment, this.selectedAttachment.name);
        }

        this.authService.schedule(formData)
            .subscribe(
                res => {
                    //console.log('formData',formData)

                    this.schedulerForm.reset();
                    this.showLoader = false;

                }
            );
        // }

    }
    onChangeFOC(event): any {
        if (event == true) {
            this.Foc = "Foc"
        }
        else {
            this.Foc = "NonFoc"
            this.reasonOfFoc = '';
        }
    }

    changeFile(): any {
        const attachmentFile = this.schedulerForm.value.attachment;
        this.api.uploadFile(attachmentFile)
            .subscribe(res => {

            });
    }

    checkLawyerAvailability() {
        // debugger;
        const selectedLawyer = this.schedulerForm.value.lawyer;
        const selectedTime = this.schedulerForm.value.time;
        if (selectedLawyer && selectedTime && selectedLawyer !== 'Any') {
            this.lawyerAvailable = this.isLawyerFree(selectedLawyer);
        } else {
            this.lawyerAvailable = false;
        }
    }
    onChangeCheckBox(event): void { // select the variable is local or global
        event.checked ? this.FocNonFoc = 'true' : this.FocNonFoc = 'false';
    }
    private isLawyerFree(selectedLawyer) {

        let availability = true;
        let scheduleList = selectedLawyer.schedule;
        const selectedDate = this.schedulerForm.value.dateOf;
        const selectedTime = this.schedulerForm.value.time;
        this.lawyerName = selectedLawyer.lawyer.firstName + ' ' + selectedLawyer.lawyer.lastName;
        scheduleList.forEach(schedule => {
            let meetingStart = new Date(schedule.start.dateTime);
            let meetingEnd = new Date(schedule.end.dateTime);
            let selectedDateTime = new Date(selectedDate + 'T' + selectedTime.split(" - ")[0]);

            if (meetingStart <= selectedDateTime && meetingEnd > selectedDateTime) {
                availability = false;
            } else {
            }
        });
        return availability;
    }

    getLawyersWithAvailability() {
        this.lawyerAvailable = false;
        this.lawyerList = [];
        this.schedulerForm.controls['lawyer'].setValue("");

        const selectedDate = this.schedulerForm.value.dateOf;
        // console.log("selectedDate",selectedDate)
        if (selectedDate) {
            this.scheduleService.getLawyersWithAvailability(selectedDate).subscribe(res => {
                console.log('res.lawyerListWithSchedule:', res.lawyerListWithSchedule)
                this.lawyerList = res.lawyerListWithSchedule;
            });
        }
    }

    // in case of any lawyer is chosen, finding next available lawyer for the selected date & time,
    // if no one is available returning the first lawyer from list
    public findNextAvailableLawyer() {
        let lawyersSorted = this.lawyerList;
        lawyersSorted.sort((a, b) => a.lawyer.totalMeetingAssigned.localeCompare(b.lawyer.totalMeetingAssigned));
        lawyersSorted.forEach(lawyer => {
            if (this.isLawyerFree(lawyer)) {
                return lawyer._id;
            }
        });
        return lawyersSorted[0]['_id'];
    }

    onFileSelection(event) {
        this.selectedAttachment = event.target.files[0];
    }
    lawTypeFun(event) {
        // console.log("event", event)
        // console.log("event.value", event.value)
        this.selectedLawType = event.value;
        // console.log("this.selectedLawType", this.selectedLawType)
        // this.testSubmittion();
        // this.selectLawyerForMeeting();
    }
}
