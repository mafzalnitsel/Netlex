import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lawyer-busy-time',
  templateUrl: './lawyer-busy-time.component.html',
  styleUrls: ['./lawyer-busy-time.component.scss']
})
export class LawyerBusyTimeComponent implements OnInit {
  @Input() lawyerId: string;
  @Output() closeViewLawyerBusyTime = new EventEmitter<string>();

  calendarOptions: CalendarOptions
  onDate: string;
  showDatelabel: string;
  startTimes = ['all', 'klarna', 'stripe', 'swish'];
  // timesOptions = [
  //   { value: "09:00:00 - 09:30:00", checked: false },
  //   { value: "09:30:00 - 10:00:00", checked: false },
  //   { value: "10:00:00 - 10:30:00", checked: false },
  //   { value: "10:30:00 - 11:00:00", checked: false },
  //   { value: "11:00:00 - 11:30:00", checked: false },
  //   { value: "11:30:00 - 12:00:00", checked: false },
  //   { value: "12:00:00 - 12:30:00", checked: false },
  //   { value: "12:30:00 - 13:00:00", checked: false },
  //   { value: "13:00:00 - 13:30:00", checked: false },
  //   { value: "13:30:00 - 14:00:00", checked: false },
  //   { value: "14:00:00 - 14:30:00", checked: false },
  //   { value: "14:30:00 - 15:00:00", checked: false },
  //   { value: "15:00:00 - 15:30:00", checked: false },
  //   { value: "15:30:00 - 16:00:00", checked: false },
  //   { value: "16:00:00 - 16:30:00", checked: false },
  //   { value: "16:30:00 - 17:00:00", checked: false },
  //   { value: "17:00:00 - 17:30:00", checked: false },
  //   { value: "17:30:00 - 18:00:00", checked: false },
  //   { value: "18:00:00 - 18:30:00", checked: false },
  //   { value: "18:30:00 - 19:00:00", checked: false },
  // ];
  // timesOptions = [
  //   "00:00:00 - 00:30:00",
  //   "00:30:00 - 01:00:00",
  //   "01:00:00 - 01:30:00",
  //   "01:30:00 - 02:00:00",
  //   "02:00:00 - 02:30:00",
  //   "02:30:00 - 03:00:00",
  //   "03:00:00 - 03:30:00",
  //   "03:30:00 - 04:00:00",
  //   "04:00:00 - 04:30:00",
  //   "04:30:00 - 05:00:00",
  //   "05:00:00 - 05:30:00",
  //   "05:30:00 - 06:00:00",
  //   "06:00:00 - 06:30:00",
  //   "06:30:00 - 07:00:00",
  //   "07:00:00 - 07:30:00",
  //   "07:30:00 - 08:00:00",
  //   "08:00:00 - 08:30:00",
  //   "08:30:00 - 09:00:00",
  //   "09:00:00 - 09:30:00",
  //   "09:30:00 - 10:00:00",
  //   "10:00:00 - 10:30:00",
  //   "10:30:00 - 11:00:00",
  //   "11:00:00 - 11:30:00",
  //   "11:30:00 - 12:00:00",
  //   "12:00:00 - 12:30:00",
  //   "12:30:00 - 13:00:00",
  //   "13:00:00 - 13:30:00",
  //   "13:30:00 - 14:00:00",
  //   "14:00:00 - 14:30:00",
  //   "14:30:00 - 15:00:00",
  //   "15:00:00 - 15:30:00",
  //   "15:30:00 - 16:00:00",
  //   "16:00:00 - 16:30:00",
  //   "16:30:00 - 17:00:00",
  //   "17:00:00 - 17:30:00",
  //   "17:30:00 - 18:00:00",
  //   "18:00:00 - 18:30:00",
  //   "18:30:00 - 19:00:00",
  //   "19:00:00 - 19:30:00",
  //   "19:30:00 - 20:00:00",
  //   "20:00:00 - 20:30:00",
  //   "20:30:00 - 21:00:00",
  //   "21:00:00 - 21:30:00",
  //   "21:30:00 - 22:00:00",
  //   "22:00:00 - 22:30:00",
  //   "22:30:00 - 23:00:00",
  //   "23:00:00 - 23:30:00",
  //   "23:30:00 - 00:00:00",
  // ];
  timesOptions = [];
  selectedStartTime = '';
  startTimeIndex: any;

  selectedEndTime = '';
  endTimeIndex: any;

  selectedTimesArray: any;
  isSelectedTimeInvalid = false;

  allLawyerBusyTimes: any = [];
  eventId = '';
  isAllDayBusy = false;
  showLoader = false;
  eventTypeOptions = ['Busy', 'Personal Meeting', 'Official Travel'];
  eventType = '';
  eventDesc = '';
  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    // console.log('this.lawyerId', this.lawyerId);
    // if (this.lawyerId) {
    //   this.getAllLawyerBusyTimes();
    // }
    this.getAllOfficeTimes('netlexOfficeTimings');
    this.getAllBusyTimesByLawyerId();

    // this.showCalendar();
  }
  getAllOfficeTimes(name: string): any {
    this.api.getOfficeTimes(name)
      .subscribe(
        (response: any) => {
          // console.log('response',response);
          let data = response.doc[0].officeTimes;
          console.log('fsdfsdf',data);
          this.timesOptions = data;
        },
        (error: any) => {
          console.log('Error while getting all office times', error);
        },
      )
  }
  getAllBusyTimesByLawyerId(): void {
    // console.log('this.lawyerId', this.lawyerId);
    this.api.getAllLawyerBusyTimes(this.lawyerId)
      .subscribe((res: any) => {
        // console.log("res", res);
        let data = res.doc;
        // console.log('data', data);
        data.forEach((element: any) => {
          this.allLawyerBusyTimes.push({
            id: element._id,
            title: 'Busy',
            date: element.date,
            editable: false,
          })
        });

        // this.eventArray.push({
        //   title: 'Möte med klient',
        //   date: element.dateOf,
        //   dateExpired : 'today',
        //   id: element._id,
        //   isPaid : element.Ispaid,
        //   statusExpired : 'NO',
        //   statusExpireTime : FormatedStatusExpiryDate,
        //   editable : false,
        //   color: '#4060D4'
        // })

        // console.log("this.allLawyerBusyTimes", this.allLawyerBusyTimes);
        this.showCalendar();

      },
        (err: any) => { }
      );
  }
  showCalendar() {

    let currentFullDate = new Date();
    let tomorrowFullDate: any;
    let minDate: any;
    tomorrowFullDate = new Date(currentFullDate.setDate(currentFullDate.getDate() + 1));
    minDate = tomorrowFullDate.toISOString().split('T')[0];
    let todayDate = new Date().toISOString().split('T')[0];
    // console.log('todayDate', todayDate);

    this.calendarOptions = {
      // editable: true,
      initialView: 'dayGridMonth',
      dateClick: this.dateClickHandler.bind(this),
      // eventClick: this.handleDateClick.bind(this), // bind is important!
      eventClick: this.editEventHandler.bind(this),
      events: this.allLawyerBusyTimes,
      // eventDisplay: 'list-item',
      // today: false,
      validRange: {
        // start: minDate,
        start: todayDate,
        // end: '2022-11-19'
      },
      dayMaxEventRows: true,
      views: {
        dayGridMonth: {
          // eventLimit: true,
          dayMaxEventRows: 3,

        }
      },
      hiddenDays: [0, 6],
      // weekends: false,
      headerToolbar: {
        start: 'title', // will normally be on the left. if RTL, will be on the right
        center: '',
        end: 'prev,next'
      }
      , selectable: true,
      selectAllow: function (e) {
        if (e.end.getTime() / 1000 - e.start.getTime() / 1000 <= 86400) {
          return true;
        }
      }
    };

  }
  //-------When Date clicked---------
  dateClickHandler(event: any) {
    this.onDate = event.dateStr;
    // console.log("this.onDate", this.onDate);
    this.eventId = '';
    let todayDate = new Date().toISOString().split('T')[0];
    let currentTimeHours = new Date().getHours();
    let passedTimeIndexes = [];
    if (this.onDate == todayDate) {
      // console.log('You selected today date');
      this.showDatelabel = 'i dag';
      // Remove current passed out time
      this.timesOptions.forEach((ele, i) => {
        // let time = ele.split(' - ')[0].split(':')[0];
        let time = Number(ele.split(' - ')[0].split(':')[0]);
        if (time <= currentTimeHours) {
          // console.log('time', time);
          // console.log('i', i);
          passedTimeIndexes.push(i);
        }
        if (i === (this.timesOptions.length - 1)) {
          passedTimeIndexes.forEach((item) => {
            this.timesOptions.splice(0, 1)
          })

        }
      })
    } else {
      let obj = this.onDate.split('-');
      this.showDatelabel = '(' + obj[2] + '/' + obj[1] + '/' + obj[0] + ')';
      // console.log('this.showDatelabel', this.showDatelabel);
      this.getAllOfficeTimes('netlexOfficeTimings');
    }
  }
  // -------When Event clicked---------
  editEventHandler(event: any) {
    // console.log('event.event.start', event.event.start);
    // console.log('event.event.id', event.event.id);
    this.eventId = event.event.id;
    let date = new Date().toISOString();
    // console.log('date', date);
    this.api.getLawyerBusyTimeById(this.eventId)
      .subscribe((res: any) => {
        console.log("res", res);
        // if (date > res.date) {
        //   console.log('date is passed');
        // }
        this.eventType = res.eventSubject;
        this.eventDesc = res.eventDescContent;
        this.onDate = res.date;
        this.selectedStartTime = res.times[0];
        let index = this.timesOptions.findIndex((item) => item === res.times[res.times.length - 1]);
        // console.log('index',index);
        this.selectedEndTime = this.timesOptions[index + 1];
        // this.selectedEndTime = this.timesOptions[index];

        // Indexes of selected times
        this.startTimeIndex = this.timesOptions.findIndex((item) => item === res.times[0])
        this.endTimeIndex = index + 1;
        // console.log('startTimeIndex', this.startTimeIndex);
        // console.log('endTimeIndex', this.endTimeIndex);
        // console.log('selectedStartTime',this.selectedStartTime);
        // console.log('selectedEndTime',this.selectedEndTime);
        this.timeDifferenceHandler();
      },
        (err: any) => { }
      );
  }

  startTimeChangeHandler(): any {
    // console.log('selectedStartTime',this.selectedStartTime);
    this.startTimeIndex = this.timesOptions.findIndex((item) => item === this.selectedStartTime)
    // console.log('this.startTimeIndex', this.startTimeIndex);
    if (this.endTimeIndex) this.timeDifferenceHandler();
  }

  endTimeChangeHandler(): any {
    // console.log('selectedEndTime',this.selectedEndTime);
    this.endTimeIndex = this.timesOptions.findIndex((item) => item === this.selectedEndTime)
    // console.log('this.endTimeIndex', this.endTimeIndex);
    this.timeDifferenceHandler();
  }
  timeDifferenceHandler() {
    // let newArr = this.timesOptions.slice(this.startTimeIndex, this.endTimeIndex);
    this.selectedTimesArray = this.timesOptions.slice(this.startTimeIndex, this.endTimeIndex);
    // console.log('this.selectedTimesArray', this.selectedTimesArray);
    if (this.selectedTimesArray.length === 0) {
      this.isSelectedTimeInvalid = true;
    } else {
      this.isSelectedTimeInvalid = false;
    }
  }
  allDayBusyHandler(value: any) {
    // console.log('value',value);
    this.isAllDayBusy = value;
    this.selectedTimesArray = this.timesOptions;
  }
  errorClickHandler() {
    alert('Till tid borde vara större än Från tid');
  }
  onSubmit(): void {
    this.showLoader = true;
    // console.log('selectedTimesArray', this.selectedTimesArray)
    if (this.isSelectedTimeInvalid) {
      this.snackBar.open('Till tid borde vara större än Från tid', 'ok');
      return;
    }
    console.log('this.eventType', this.eventType);
    console.log('this.eventDesc', this.eventDesc);
    if (!this.lawyerId || !this.onDate || !this.selectedTimesArray || !this.eventType || !this.eventDesc) {
      this.snackBar.open('Fyll i alla fält', 'ok');
      this.showLoader = false;
      return;
    }
    let lawyerBusyTime = {
      lawyerId: this.lawyerId,
      date: this.onDate,
      times: this.selectedTimesArray,
      eventSubject: this.eventType,
      eventDescContent: this.eventDesc,
    }
    this.api.createLawyerBusyTime(lawyerBusyTime)
      .subscribe((res: any) => {
        // console.log('res', res);
        this.snackBar.open('Skapades framgångsrikt', 'ok');
        this.showLoader = false;
        this.clearFields();
        this.closeBusyTimeHandler();
      },
        (err: any) => {
          this.showLoader = false;
          console.log('Error Saving LawyerBusyTime', err);
          if (err && err.error && err.error.msg === 'lawyerBusyTimeAlreadyExist') {
            this.snackBar.open('Skapad misslyckad, Existerar redan', 'ok');
          } else {
            this.snackBar.open('Skapad misslyckad', 'ok');
          }
        }
      );
  }
  onUpdate() {
    this.showLoader = true;
    if (this.isSelectedTimeInvalid) {
      this.snackBar.open('Till tid borde vara större än Från tid', 'ok');
      return;
    }
    if (!this.lawyerId || !this.onDate || !this.selectedTimesArray || !this.eventType || !this.eventDesc) {
      this.snackBar.open('Fyll i alla fält', 'ok');
      this.showLoader = false;
      return;
    }
    let lawyerBusyTime = [{
      lawyerId: this.lawyerId,
      date: this.onDate,
      times: this.selectedTimesArray,
      eventSubject: this.eventType,
      eventDescContent: this.eventDesc,
    }]
    // console.log('lawyerBusyTime', lawyerBusyTime);
    this.api.updateLawyerBusyTime(lawyerBusyTime, this.eventId)
      .subscribe(
        res => {
          this.showLoader = false;
          this.snackBar.open('Uppdateringen lyckades', 'ok');
          this.clearFields();
          this.closeBusyTimeHandler();
        },
        err => {
          this.showLoader = false;
          console.log("Error in Updating LawyerBusyTime", err);
          if (err && err.error && err.error.msg === 'lawyerBusyTimeAlreadyExist') {
            this.snackBar.open('Uppdateringen misslyckades, Existerar redan', 'ok');
          } else {
            this.snackBar.open('Uppdateringen misslyckades', 'ok');
          }
        }
      );
  }
  onDelete() {
    if (confirm('Är du säker på att du vill ta bort upptagen tid?')) {
      this.showLoader = true;
      this.api.deleteLawyerBusyTime(this.eventId)
        .subscribe((response: any) => {
          // console.log('response', response);
          this.snackBar.open('Raderad framgångsrikt', 'ok');
          this.showLoader = false;
          this.clearFields();
          this.closeBusyTimeHandler();
        },
          (err: any) => {
            console.log('Error while deleting lawyerBusyTime(event)', err);
            this.showLoader = false;
            this.snackBar.open('Operationen misslyckades', 'ok');
          })
    }
  }
  closeBusyTimeHandler() {
    this.closeViewLawyerBusyTime.emit('true');
  }
  clearFields() {
    this.lawyerId = '';
    this.onDate = '';
    this.selectedStartTime = '';
    this.selectedEndTime = '';
    this.selectedTimesArray = [];
  }
}
