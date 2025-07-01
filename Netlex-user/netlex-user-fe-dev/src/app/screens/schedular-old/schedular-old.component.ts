import { Lawyer } from './../../models/lawyer.model';
import { Component, Pipe, PipeTransform, ViewChild, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Scheduler } from '../../models/scheduler.model';
import { UtilService } from '../../services/util.service';
import { ApiService } from '../../services/api.service';
import { ScheduleService } from '../../services/schedule.service';
import { AuthService } from "../../services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { DialogComponent } from "../../netlex-common/dialog/dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { clientsDetailsservice } from 'src/app/services/clientsDetails.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(value) {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}
@Component({
  selector: 'app-schedular-old',
  templateUrl: './schedular-old.component.html',
  styleUrls: ['./schedular-old.component.scss']
})
export class SchedularOldComponent implements OnInit {
    lawyerAvailable = false;
    selectedAttachment: File = null; // Variable to store file
    lawyerName = "";
    FocNonFoc = "";
    constructor(private api: ApiService, public utilService: UtilService, private authService: AuthService,
        private scheduleService: ScheduleService, private dialog: MatDialog,
        private router: Router, private route: ActivatedRoute, private translate: TranslateService, private ClientsDetailsservice: clientsDetailsservice) { }

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

    languageValue = ['Any', 'English', 'Swedish'];
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
    ///////---NEW---///////
    lawType = ['Family Law', 'Criminal Law', 'Civil Law', 'Business Law', 'Educational Law', 'Insurance Law', 'Immigration']
    selectedLawType: 'blue';
    ///////---NEW---///////

    ngOnInit(): void {
        let MOBILE_PATTERN = /[0-9\+\-\ ]/;
        this.schedulerForm = new FormGroup({
            heading: new FormControl('', [Validators.required]),
            dateOf: new FormControl('', [Validators.required]),
            time: new FormControl('', [Validators.required]),
            description: new FormControl(''),
            language: new FormControl('', [Validators.required]),
            attachment: new FormControl(''),
            lawyer: new FormControl('', [Validators.required]),
            userName: new FormControl('', [Validators.required]),
            userEmail: new FormControl('', [Validators.required, Validators.email]),
            userSSN: new FormControl('', [Validators.required]),
            userPhoneNo: new FormControl('', [Validators.required, Validators.pattern(MOBILE_PATTERN)]),
            focnonfoc: new FormControl(''),
            reasonOfFoc: new FormControl(''),
        });
        this.utilService.show();
        this.docSubmit = false;
        ////////////////////////-----NEW-----/////////////////////////
        this.tomorrowFullDate = new Date(this.currentFullDate.setDate(this.currentFullDate.getDate() + 1));
        this.minDate = this.tomorrowFullDate.toISOString().split('T')[0];
        /////////////////////////-----NEW-----/////////////////////////
        this.statusExpireTime = '2022-01-24';

        window.scroll(0, 0);
        // this.selectLawyerForMeeting();

        //---------When user comes from lawyer click-------\\
        this.route.queryParams.subscribe(params => {
            // this.Id = params.lawyerId;
            // console.log("lawyerId", params.lawyerId)
        });

    }

    getclientsDetailstoEmail(toEmail): any {

        this.ClientsDetailsservice.getclientsDetailstoEmail(toEmail).subscribe(clientsDetails => {
            if (clientsDetails.clientsDetails.length !== 0) {
                // console.log('toEmail true')

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
                dialogRef.afterClosed().subscribe(result => {
                    this.router.navigate(['/scheduler']);
                });
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
                dialogRef.afterClosed().subscribe(result => {
                    this.router.navigate(['/scheduler']);
                });
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
                dialogRef.afterClosed().subscribe(result => {
                    this.router.navigate(['/scheduler']);
                });
                return;

            }
            else {
                // console.log('toSsn false')
                this.docSubmit = true;
                // if (this.schedulerForm.invalid || (!this.lawyerAvailable && this.schedulerForm.value.lawyer != 'Any')) {
                //     return;
                // }
                // else {
                const lawyerId = (this.schedulerForm.value.lawyer === 'Any' ? this.findNextAvailableLawyer() :
                    this.schedulerForm.value.lawyer.lawyer._id);

                const dataValue = new Scheduler(
                    this.schedulerForm.value.heading,
                    this.schedulerForm.value.dateOf,
                    this.schedulerForm.value.time,
                    this.schedulerForm.value.description,
                    this.schedulerForm.value.language,
                    this.schedulerForm.value.attachment,
                    'New',
                    lawyerId,
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
                formData.append('lawyerId', lawyerId);
                // formData.append('lawyer',this.lawyerName);// this.schedulerForm.value.lawyer);

                formData.append('userName', this.schedulerForm.value.userName);
                formData.append('userEmail', this.schedulerForm.value.userEmail);
                formData.append('userSSN', this.schedulerForm.value.userSSN);
                formData.append('userPhoneNo', this.schedulerForm.value.userPhoneNo);
                formData.append('focnonfoc', this.Foc);
                formData.append('reasonOfFoc', this.reasonOfFoc);
                formData.append('statusExpireTime', this.statusExpireTime);


                if (this.selectedAttachment) {
                    formData.append('attachment', this.selectedAttachment, this.selectedAttachment.name);
                }

                this.authService.schedule(formData)
                    .subscribe(
                        res => {
                            //console.log('formData',formData)

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
                                this.router.navigate(['/home']);
                            });
                        }
                    );
                // }
            }
        });
    }

    submit(): void {
        // console.log('userSSNuserSSN', this.statusExpireTime)

        ///////---NEW---///////
        this.showLoader = true;
        ///////---NEW---///////

        // console.log(" this.schedulerForm.value.heading",  this.schedulerForm.value.heading)
        // console.log("this.schedulerForm.value.dateOf", this.schedulerForm.value.dateOf)
        // console.log("this.schedulerForm.value.time", this.schedulerForm.value.time)
        // console.log("this.schedulerForm.value.description", this.schedulerForm.value.description)
        // console.log("this.schedulerForm.value.language", this.schedulerForm.value.language)
        // console.log("this.schedulerForm.value.attachment", this.schedulerForm.value.attachment)
        // console.log(" this.schedulerForm.value.userName",  this.schedulerForm.value.userName)
        // console.log("this.schedulerForm.value.lawyer", this.schedulerForm.value.lawyer)
        // console.log("this.schedulerForm.value.userEmail", this.schedulerForm.value.userEmail)
        // console.log("this.schedulerForm.value.userSSN", this.schedulerForm.value.userSSN)
        // console.log("this.schedulerForm.value.userPhoneNo", this.schedulerForm.value.userPhoneNo)
        // console.log("this.schedulerForm.value.reasonOfFoc", this.schedulerForm.value.reasonOfFoc)
        // console.log("this.statusExpireTime", this.statusExpireTime)

        if (this.schedulerForm.invalid) {
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


        if (this.selectedAttachment) {
            formData.append('attachment', this.selectedAttachment, this.selectedAttachment.name);
        }

        this.authService.schedule(formData)
            .subscribe(
                res => {
                    //console.log('formData',formData)

                    this.docSubmit = false;
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
        if (selectedDate) {
            this.scheduleService.getLawyersWithAvailability(selectedDate).subscribe(res => {
                // console.log('res.lawyerListWithSchedule:',res.lawyerListWithSchedule)
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
}
