import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular';
export interface DialogComingData {
  lawyerId: string;
}
@Component({
  selector: 'app-date-n-time-dialog',
  templateUrl: './date-n-time-dialog.component.html',
  styleUrls: ['./date-n-time-dialog.component.scss']
})
export class DateNTimeDialogComponent implements OnInit {
  selected: Date | null;
  calendarOptions: CalendarOptions
  onDate: string;
  timesOptions = [
    { label: '09:00:00 - 09:30:00', value: '09:00:00 - 09:30:00', checked: false },
    { label: '09:30:00 - 10:00:00', value: '09:30:00 - 10:00:00', checked: false },
    { label: '10:00:00 - 10:30:00', value: '10:00:00 - 10:30:00', checked: false },
    { label: '10:30:00 - 11:00:00', value: '10:30:00 - 11:00:00', checked: false },
    { label: '11:00:00 - 11:30:00', value: '11:00:00 - 11:30:00', checked: false },
    { label: '11:30:00 - 12:00:00', value: '11:30:00 - 12:00:00', checked: false },
    { label: '12:00:00 - 12:30:00', value: '12:00:00 - 12:30:00', checked: false },
    { label: '12:30:00 - 13:00:00', value: '12:30:00 - 13:00:00', checked: false },
    { label: '13:00:00 - 13:30:00', value: '13:00:00 - 13:30:00', checked: false },
    { label: '13:30:00 - 14:00:00', value: '13:30:00 - 14:00:00', checked: false },
    { label: '14:00:00 - 14:30:00', value: '14:00:00 - 14:30:00', checked: false },
    { label: '14:30:00 - 15:00:00', value: '14:30:00 - 15:00:00', checked: false },
    { label: '15:00:00 - 15:30:00', value: '15:00:00 - 15:30:00', checked: false },
    { label: '15:30:00 - 16:00:00', value: '15:30:00 - 16:00:00', checked: false },
    { label: '16:00:00 - 16:30:00', value: '16:00:00 - 16:30:00', checked: false },
    { label: '16:30:00 - 17:00:00', value: '16:30:00 - 17:00:00', checked: false },
    { label: '17:00:00 - 17:30:00', value: '17:00:00 - 17:30:00', checked: false },
    { label: '17:30:00 - 18:00:00', value: '17:30:00 - 18:00:00', checked: false },
    { label: '18:00:00 - 18:30:00', value: '18:00:00 - 18:30:00', checked: false },
    { label: '18:30:00 - 19:00:00', value: '18:30:00 - 19:00:00', checked: false },
  ];
  constructor(
    public dialogRef: MatDialogRef<DateNTimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingLawyerId: DialogComingData,
  ) { }

  ngOnInit(): void {
    // console.log("incomingLawyerId", this.incomingLawyerId)
    this.showCalendar();
  }
  closeDateSelectionDialog() {
    this.dialogRef.close();
  }
  showCalendar() {

    let currentFullDate = new Date();
    let tomorrowFullDate: any;
    let minDate: any;
    tomorrowFullDate = new Date(currentFullDate.setDate(currentFullDate.getDate() + 1));
    minDate = tomorrowFullDate.toISOString().split('T')[0];

    this.calendarOptions = {
      // editable: true,
      initialView: 'dayGridMonth',
      dateClick: this.dateClickHandler.bind(this),
      // eventClick: this.handleDateClick.bind(this), // bind is important!
      // eventClick: this.openDialogViewMeeting.bind(this),
      // events: this.eventArray,
      // eventDisplay: 'list-item',
      // today: false,
      validRange: {
        start: minDate,
        // end: '2022-11-19'
      },
      dayMaxEventRows: true,
      views: {
        dayGridMonth: {
          // eventLimit: true,
          dayMaxEventRows: 3,

        }
      },
      // hiddenDays: [ 0,6],
      weekends: false,
      headerToolbar: {
        start: 'title', // will normally be on the left. if RTL, will be on the right
        center: '',
        end: 'prev,next'
      }
      ,selectable: true,
      selectAllow: function (e) {
        if (e.end.getTime() / 1000 - e.start.getTime() / 1000 <= 86400) {
            return true;
        }
     }
    };

  }
  dateClickHandler(event) {
    this.onDate = event.dateStr;
    // console.log("this.onDate", this.onDate)
    // let CurrentDateInISO = new Date().toISOString().split('T')[0];
  }
  timeHandler(event) {
    // console.log("event",event.value)
    localStorage.setItem("selectedDate",this.onDate)
    localStorage.setItem("selectedTime",event.value)
    localStorage.setItem("closeLawyerDialog","true")
    this.closeDateSelectionDialog();
  }
}
