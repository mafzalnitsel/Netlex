import { Lawyer } from './../../models/lawyer.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Schedulerapp } from '../../models/schedulerapp.model';
import { UtilService } from '../../services/util.service';
import { ApiService } from '../../services/api.service';
import { ScheduleService } from '../../services/schedule.service';
import { AuthService } from "../../services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogComponent } from "../../netlex-common/dialog/dialog.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-schedulerapp',
    templateUrl: './schedulerapp.component.html',
    styleUrls: ['./schedulerapp.component.scss']
})
export class SchedulerappComponent implements OnInit {
    lawyerAvailable = false;
    selectedAttachment: File = null; // Variable to store file
    lawyerName = "";
    scheduleId = '';
    heading = '';
    dateOf = '';
    time = '';
    attachment = '';
    userName = '';
    lawyer = '';
    userEmail = '';
    userSSN = '';
    userPhoneNo = '';
    description = '';
    constructor(private api: ApiService, public utilService: UtilService, private authService: AuthService,
        private scheduleService: ScheduleService, private dialog: MatDialog,
        private router: Router, private translate: TranslateService,
        private route: ActivatedRoute,) { }

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
    languageValue = ['Any', 'English', 'Swedish'];
    docSubmit: any = false;
    showLoading = false;
    lawyerList = [];
    schedulerForm: FormGroup;
    ///////---NEW---///////
    showLoader = false;
    // minDate = new Date();
    currentFullDate = new Date();
    tomorrowFullDate: any;
    minDate: any;
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
        });

        ////////////////////////-----NEW-----/////////////////////////
        this.tomorrowFullDate = new Date(this.currentFullDate.setDate(this.currentFullDate.getDate() + 1));
        this.minDate = this.tomorrowFullDate.toISOString().split('T')[0];
        /////////////////////////-----NEW-----/////////////////////////

        this.route.queryParams.subscribe(params => {
            this.scheduleId = params.scheduleid;
            // this.id = params.id;
            // this.scheduleId   ='626687b330c25c2c3455b51e';
            this.getscheduleData();

            //  console.log("------hhhhh---- " + params.scheduleid )
        });




        this.utilService.show();
        this.docSubmit = false;

    }


    getscheduleData(): any {
        this.api.getMeetData(this.scheduleId).subscribe(
            res => {
                this.heading = res.heading;
                this.dateOf = res.dateOf;
                this.time = res.time;
                this.language = res.language;
                this.attachment = res.attachment;
                this.description = res.description;
                this.userName = res.userName;
                this.lawyer = res.lawyer;
                this.userEmail = res.userEmail;
                this.userSSN = res.userSSN;
                this.userPhoneNo = res.userPhoneNo;

                // let datech=res.dateOf.split('/');
                //datech=datech[2]+'-'+datech[1]+'-'+datech[0];
                console.log(res);
                this.getLawyersWithAvailabilityselectDate(res.dateOf, res.lawyerId)
            },
            err => { }
        );


    }

    submit(): void {
        this.docSubmit = true;
        ///////---NEW---///////
        this.showLoader = true;
        ///////---NEW---///////
        if (this.schedulerForm.invalid || (!this.lawyerAvailable && this.schedulerForm.value.lawyer != 'Any')) {
            return;
        } else {
            const lawyerId = (this.schedulerForm.value.lawyer === 'Any' ? this.findNextAvailableLawyer() :
                this.schedulerForm.value.lawyer.lawyer._id);

            const dataValue = new Schedulerapp(
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
                this.schedulerForm.value.userPhoneNo
            );

            const formData: FormData = new FormData();
            formData.append('heading', this.schedulerForm.value.heading);
            formData.append('dateOf', this.schedulerForm.value.dateOf);
            formData.append('time', this.schedulerForm.value.time);
            formData.append('description', this.schedulerForm.value.description);
            formData.append('language', this.schedulerForm.value.language);
            formData.append('status', 'Ännu att bekräftas');
            formData.append('lawyerId', lawyerId);
            formData.append('lawyer', this.lawyerName);// this.schedulerForm.value.lawyer);

            formData.append('userName', this.schedulerForm.value.userName);
            formData.append('userEmail', this.schedulerForm.value.userEmail);
            formData.append('userSSN', this.schedulerForm.value.userSSN);
            formData.append('userPhoneNo', this.schedulerForm.value.userPhoneNo);


            if (this.selectedAttachment) {
                formData.append('attachment', this.selectedAttachment, this.selectedAttachment.name);
            }

            this.authService.scheduleapp(formData)
                .subscribe(
                    res => {
                        this.docSubmit = false;
                        this.schedulerForm.reset();
                        ///////---NEW---///////
                        this.showLoader = false;
                        ///////---NEW---///////
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
        }

    }

    changeFile(): any {
        const attachmentFile = this.schedulerForm.value.attachment;
        this.api.uploadFile(attachmentFile)
            .subscribe(res => {

            });
    }

    checkLawyerAvailability() {
        const selectedLawyer = this.schedulerForm.value.lawyer;
        const selectedTime = this.schedulerForm.value.time;
        if (selectedLawyer && selectedTime && selectedLawyer !== 'Any') {
            this.lawyerAvailable = this.isLawyerFree(selectedLawyer);
        } else {
            this.lawyerAvailable = false;
        }
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
                this.lawyerList = res.lawyerListWithSchedule;
            });
        }
    }
    getLawyersWithAvailabilityselectDate(selecteDate, id) {
        this.lawyerAvailable = false;
        this.lawyerList = [];
        this.schedulerForm.controls['lawyer'].setValue("");
        debugger;
        const selectedDate = selecteDate;//this.schedulerForm.value.dateOf;
        if (selectedDate) {
            this.scheduleService.getLawyersWithAvailability(selectedDate).subscribe(res => {
                this.lawyerList = res.lawyerListWithSchedule;
                for (let i = 0; i < this.lawyerList.length; ++i) {
                    if (this.lawyerList[i].lawyer._id == id) {
                        this.lawyer = this.lawyerList[i];
                        break;

                    }
                }


                this.lawyerAvailable = true;
                this.isLawyerFree(this.lawyer);
                console.log('this.lawyerList' + this.lawyerList[0].lawyer._id);

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
