import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular';
import { ScheduleService } from '../../../services/schedule.service';
export interface DialogComingData {
  lawyerId: string;
  selectedLawyerName: string;
  selectedDate: string;
  selectedTime: string;
}
@Component({
  selector: 'app-date-n-time-dialog',
  templateUrl: './date-n-time-dialog.component.html',
  styleUrls: ['./date-n-time-dialog.component.scss']
})
export class DateNTimeDialogComponent implements OnInit {
  choosenLawyerId: String;
  selectedLawyerName: String;
  selected: Date | null;
  calendarOptions: CalendarOptions
  onDate: string;
  calendarScrollWidth: any;
  calendarScrollPosition: any;
  stopCalendarScroll = true;
  // timesOptions = [
  //   { label: '09:00:00 - 09:30:00', value: '09:00:00 - 09:30:00', checked: false },
  //   { label: '09:30:00 - 10:00:00', value: '09:30:00 - 10:00:00', checked: false },
  //   { label: '10:00:00 - 10:30:00', value: '10:00:00 - 10:30:00', checked: false },
  //   { label: '10:30:00 - 11:00:00', value: '10:30:00 - 11:00:00', checked: false },
  //   { label: '11:00:00 - 11:30:00', value: '11:00:00 - 11:30:00', checked: false },
  //   { label: '11:30:00 - 12:00:00', value: '11:30:00 - 12:00:00', checked: false },
  //   { label: '12:00:00 - 12:30:00', value: '12:00:00 - 12:30:00', checked: false },
  //   { label: '12:30:00 - 13:00:00', value: '12:30:00 - 13:00:00', checked: false },
  //   { label: '13:00:00 - 13:30:00', value: '13:00:00 - 13:30:00', checked: false },
  //   { label: '13:30:00 - 14:00:00', value: '13:30:00 - 14:00:00', checked: false },
  //   { label: '14:00:00 - 14:30:00', value: '14:00:00 - 14:30:00', checked: false },
  //   { label: '14:30:00 - 15:00:00', value: '14:30:00 - 15:00:00', checked: false },
  //   { label: '15:00:00 - 15:30:00', value: '15:00:00 - 15:30:00', checked: false },
  //   { label: '15:30:00 - 16:00:00', value: '15:30:00 - 16:00:00', checked: false },
  //   { label: '16:00:00 - 16:30:00', value: '16:00:00 - 16:30:00', checked: false },
  //   { label: '16:30:00 - 17:00:00', value: '16:30:00 - 17:00:00', checked: false },
  //   { label: '17:00:00 - 17:30:00', value: '17:00:00 - 17:30:00', checked: false },
  //   { label: '17:30:00 - 18:00:00', value: '17:30:00 - 18:00:00', checked: false },
  //   { label: '18:00:00 - 18:30:00', value: '18:00:00 - 18:30:00', checked: false },
  //   { label: '18:30:00 - 19:00:00', value: '18:30:00 - 19:00:00', checked: false },
  // ];

  //Commented on 10-04-2023
  // timesOptions = [
  //   { value: '09:00:00 - 09:30:00', checked: false },
  //   { value: '09:30:00 - 10:00:00', checked: false },
  //   { value: '10:00:00 - 10:30:00', checked: false },
  //   { value: '10:30:00 - 11:00:00', checked: false },
  //   { value: '11:00:00 - 11:30:00', checked: false },
  //   { value: '11:30:00 - 12:00:00', checked: false },
  //   { value: '12:00:00 - 12:30:00', checked: false },
  //   { value: '12:30:00 - 13:00:00', checked: false },
  //   { value: '13:00:00 - 13:30:00', checked: false },
  //   { value: '13:30:00 - 14:00:00', checked: false },
  //   { value: '14:00:00 - 14:30:00', checked: false },
  //   { value: '14:30:00 - 15:00:00', checked: false },
  //   { value: '15:00:00 - 15:30:00', checked: false },
  //   { value: '15:30:00 - 16:00:00', checked: false },
  //   { value: '16:00:00 - 16:30:00', checked: false },
  //   { value: '16:30:00 - 17:00:00', checked: false },
  //   { value: '17:00:00 - 17:30:00', checked: false },
  //   { value: '17:30:00 - 18:00:00', checked: false },
  //   { value: '18:00:00 - 18:30:00', checked: false },
  //   { value: '18:30:00 - 19:00:00', checked: false },
  // ];
  timesOptions = [];
  showLoader = !false;
  constructor(
    public dialogRef: MatDialogRef<DateNTimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingLawyerData: DialogComingData,
    private scheduleService: ScheduleService,
  ) { }

  ngOnInit(): void {
    // console.log("incomingLawyerData", this.incomingLawyerData)
    this.choosenLawyerId = this.incomingLawyerData.lawyerId;
    this.selectedLawyerName = this.incomingLawyerData.selectedLawyerName;
    this.onDate = this.incomingLawyerData.selectedDate;
    // console.log("choosenLawyerId", this.choosenLawyerId)
    this.showCalendar();
    // console.log("this.onDate",this.onDate)

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
    // console.log("this.onDate", this.onDate)
    this.showLoader= true;
    this.lawyerAvailableOrNot(this.onDate);
    // let CurrentDateInISO = new Date().toISOString().split('T')[0];
    let screenSize = window.innerWidth;
    // console.log("screenSize", screenSize)
    this.calendarScrollPosition = document.getElementById('date_n_time_main').scrollTop;
    // console.log("this.calendarScrollPosition", this.calendarScrollPosition)
    if (screenSize < 960) {
      if (screenSize > 460) {
        setTimeout(() => {
          this.stopCalendarScroll = false;
          clearInterval(scrollToTime)
        }, 1500)
        let scrollToTime = setInterval(() => {
          if (this.calendarScrollPosition < 470) {
            this.calendarScrollPosition = this.calendarScrollPosition + 5
            document.getElementById('date_n_time_main').scrollTo(0, this.calendarScrollPosition)
          }
          // console.log("N")
        }, 3);
      }
      if (screenSize < 460) {
        setTimeout(() => {
          this.stopCalendarScroll = false;
          clearInterval(scrollToTime)
        }, 1500)
        let scrollToTime = setInterval(() => {
          if (this.calendarScrollPosition < 280) {
            this.calendarScrollPosition = this.calendarScrollPosition + 5
            document.getElementById('date_n_time_main').scrollTo(0, this.calendarScrollPosition)
          }
          // console.log("N")
        }, 3);
      }
    }

  }
  //-------Get times of selected lawyer on selected date---------
  lawyerAvailableOrNot(onDate: any) {
    if (this.choosenLawyerId) {
     this.AvailbiltyDateLawer(onDate,this.choosenLawyerId)
     

      
    }
  }



  AvailbiltyDateLawer(Date:string,LawerId : any){
    this.scheduleService.getLawyerAvailabilityOnDate(Date, LawerId).subscribe((res: any) => {
      console.log('res_Available Time...:', res);
      this.LawersBusyTime(Date,LawerId)

      this.timesOptions = res;
      // this.selectedLawyer = res.
    },
      (err: any) => {
        console.log('err while getting lawyer availablity by date:', err);
      });
  }


  LawersBusyTime(Date:string,LawerId : any){
    console.log("Data---", Date);
    console.log("LawerId---", LawerId);
  this.scheduleService.getAllLawyerBusyTimes(Date,LawerId).subscribe((res: any) => {
    console.log('Lawers Busy Time ===== > >>> ', res);
this.NetlexOfficeTimings(res)
  },
    (err: any) => {
      console.log('err while getting lawyer availablity by date:', err);
    });
}


NetlexOfficeTimings(event){
  this.scheduleService.getNetlexOfficeTimings().subscribe((res: any) => {
    // this.LawerBusyTime(Date,LawerId)
    console.log('Office Timing ===== > >>> ', res[0].officeTimes);
    console.log('Busy Timing ===== > >>> ', event);
    console.log('All time ===== > >>> ', this.timesOptions);
    //     let filteredData = this.timesOptions.filter(item => res[0]['times'].includes(item.value));
// console.log('Filter DAta ======>>>>',filteredData)
// this.timesOptions = filteredData
// this.showLoader = false;

    // this.timesOptions = res;
    // // this.selectedLawyer = res.
    // this.showLoader = false;
    let filteredArray = this.timesOptions.filter(item => res[0].officeTimes.includes(item.value));
    filteredArray.filter(value => event[0]?.times.includes(value));
     console.log(filteredArray)
     this.timesOptions= filteredArray
    this.showLoader = false;

    // this.timesOptions = res[0].officeTimes;

  },
    (err: any) => {
      console.log('err while getting lawyer availablity by date:', err);
    });
}
// getAllLawyerBusyTimes
  //-------When Time clicked---------
  timeHandler(event) {
    // console.log("event",event.value)
    localStorage.setItem("selectedDate", this.onDate)
    localStorage.setItem("selectedTime", event.value)
    localStorage.setItem("closeLawyerDialog", "true")
    this.closeDateSelectionDialog();
  }

}
