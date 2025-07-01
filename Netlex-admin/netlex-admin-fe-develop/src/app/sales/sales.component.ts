import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Sales } from '../models/sales.model';
import { menuactionspagename } from '../models/pagesnameandId';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  salesList: Observable<Sales[]>;

  // salesList = [{_id: 12, clientName: 'Dhaaru', clientId: '12', salesAmount: 123, salesAt: '2010', paymentMethod: 'Bank'}];

  loading: boolean;
  showLoader: boolean = false;
  p = 1;
  perPage = 10;
  total: number;
  currentPage = 1;
  currentDate: any;
  status: '';
  selectedPaymentMethod: string;

  // startDate: string;
  // endDate: string;
  todayTotalAmount = 0;
  weeklyTotalAmount = 0;
  monthlyTotalAmount = 0;
  yearlyTotalAmount = 0;
  clientsOfDay = 0;
  clientsOfWeek = 0;
  clientsOfMonth = 0;
  clientsOfYear = 0;

  month: any;
  year: any;
  dayChangeValue = 0;
  dayChangeCondition: string;
  weekChangeValue = 0;
  weekChangeCondition: string;
  monthChangeValue = 0;
  monthChangeCondition: string;
  yearChangeValue = 0;
  yearChangeCondition: string;

  // dates = {fromDate:'' , toDate:''}
  fromDate='';
  toDate='';

  paymentMethodValues = ['all', 'klarna', 'stripe', 'swish'];
  statusValue = ['all', 'success', 'failed'];
  constructor(public authService: AuthService,
    private router: Router,
    private api: ApiService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.checkRoleAction();
    this.getSales(1);
    this.currentDate = new Date();
    this.month = this.currentDate.getMonth();
    this.year = this.currentDate.getFullYear();
    // console.log('this.currentDate', this.currentDate)
    // console.log('this.month', this.month)
    // console.log('this.year', this.year)

    // this.getDay(this.dayChangeCondition, this.dayChangeValue);  //Comented On__ 09-01-2023
    // this.getWeek(this.weekChangeCondition, this.weekChangeValue);  //Comented On__ 09-01-2023
    // this.getMonth(this.monthChangeCondition, this.monthChangeValue);  //Comented On__ 09-01-2023
    // this.getYear(this.yearChangeCondition, this.yearChangeValue);  //Comented On__ 09-01-2023

    // this.getMonth('decrement', 2);
    // this.getYear('decrement', 1);
  }

  getSales(page: number): any {
    this.loading = true;
    this.salesList = this.api.getSalesList(page, this.perPage, this.selectedPaymentMethod, this.status ,this.fromDate,this.toDate).pipe(
      tap(res => {
        // console.log("meeting sales response", res);

        this.total = res['total'];
        this.currentPage = page;
        this.perPage = 10;
        this.loading = false;
      }),
      map(({ docs: docs1 }) => docs1)
    );
  }
  getSalesByDate(startDate, endDate, amountType): any {
    // this.startDate = startDate;
    // this.endDate = endDate;

    this.api.getSalesByDate(startDate, endDate).subscribe(res => {
      // console.log('reseseses', res)
      if (amountType == 'ofDay') {
        res.forEach(element => {
          this.todayTotalAmount = this.todayTotalAmount + Number(element.salesAmount);
          this.clientsOfDay++;
        })
        console.log('this.todayTotalAmount', this.todayTotalAmount)
        console.log('this.clientsOfDay', this.clientsOfDay)
        console.log('of day', res)

      }
      else if (amountType == 'ofWeek') {
        res.forEach(element => {
          this.weeklyTotalAmount = this.weeklyTotalAmount + Number(element.salesAmount);
          this.clientsOfWeek++;
        })
        console.log('this.weeklyTotalAmount', this.weeklyTotalAmount)
        console.log('this.clientsOfWeek', this.clientsOfWeek)
        console.log('of week', res)

      }
      else if (amountType == 'ofMonth') {
        res.forEach(element => {
          this.monthlyTotalAmount = this.monthlyTotalAmount + Number(element.salesAmount);
          this.clientsOfMonth++;
        })
        console.log('this.monthlyTotalAmount', this.monthlyTotalAmount)
        console.log('this.clientsOfMonth', this.clientsOfMonth)
        console.log('of month', res)

      }
      else if (amountType == 'ofYear') {
        res.forEach(element => {
          this.yearlyTotalAmount = this.yearlyTotalAmount + Number(element.salesAmount);
          this.clientsOfYear++;
        })
        console.log('this.yearlyTotalAmount', this.yearlyTotalAmount)
        console.log('this.clientsOfYear', this.clientsOfYear)
        console.log('of year', res)

      }
    }
    );
  }

  getDay(type, value) {
    let amountType = 'ofDay';
    if (type == undefined && value == 0 || type == 'increment' && value == 0 || type == 'decrement' && value == 0) {
      //To find today date
      let date = new Date();
      let todayDate = new Date().toISOString().split('T')[0];
      //To find tommorow date
      let currentMonth = date.getMonth();
      let currentYear = date.getFullYear();
      var tomorrowDay = new Date().getDate() + 2;
      let tommorowDate = new Date(currentYear, currentMonth, tomorrowDay).toISOString().split('T')[0];

      console.log("todayDate", todayDate);
      console.log("tommorowDate", tommorowDate);

      this.getSalesByDate(todayDate, tommorowDate, amountType);
    }
    else if (type == 'increment' && value > 0) {

      //To find nextDay date & nextTommorow date
      let date = new Date();
      let nextDay = new Date().getDate() + 1 + value;
      let currentMonth = date.getMonth();
      let currentYear = date.getFullYear();
      let nextTomorrowDay = nextDay + 1;
      let nextDayDate = new Date(currentYear, currentMonth, nextDay).toISOString().split('T')[0];
      let nextTommorowDate = new Date(currentYear, currentMonth, nextTomorrowDay).toISOString().split('T')[0];

      console.log("nextDayDate", nextDayDate);
      console.log("nextTommorowDate", nextTommorowDate);

      this.getSalesByDate(nextDayDate, nextTommorowDate, amountType);
    }
    else if (type == 'decrement' && value > 0) {

      //To find nextDay date & nextTommorow date
      let date = new Date();
      let nextDay = new Date().getDate() + 1 - value;
      let currentMonth = date.getMonth();
      let currentYear = date.getFullYear();
      let nextTomorrowDay = nextDay + 1;
      let nextDayDate = new Date(currentYear, currentMonth, nextDay).toISOString().split('T')[0];
      let nextTommorowDate = new Date(currentYear, currentMonth, nextTomorrowDay).toISOString().split('T')[0];

      console.log("nextDayDate", nextDayDate);
      console.log("nextTommorowDate", nextTommorowDate);

      this.getSalesByDate(nextDayDate, nextTommorowDate, amountType);
    }

    // let newDate = new Date(date.setMonth(date.getMonth()-value)).toISOString().split('T')[0];

    // console.log('newDate',newDate)

  }
  getWeek(type, value) {
    let amountType = 'ofWeek';

    if (type == undefined && value == 0 || type == 'increment' && value == 0 || type == 'decrement' && value == 0) {
      //To find tommorow date
      let date = new Date();
      var tomorrowDay = new Date().getDate() + 2;
      let tommorowDate = new Date(this.year, this.month, tomorrowDay).toISOString().split('T')[0];

      //To find first day date of week
      let currentWeekDay = date.getDay() > 0 ? date.getDay() : 7;
      let currentWeekFirstDay = date.getDate() - currentWeekDay + 1;
      let firstDayOfWeek = new Date(date.setDate(currentWeekFirstDay));
      // let lastDayOfWeek = new Date(date.setDate(firstDayOfWeek.getDate() + 6));

      //to covert date into ISO format '2022-01-01'
      let weekFirstDayDate = firstDayOfWeek.toISOString().split('T')[0];
      // let weekLastDayDate = lastDayOfWeek.toISOString().split('T')[0];

      console.log("weekFirstDayDate", weekFirstDayDate);
      console.log("tommorowDate", tommorowDate);

      this.getSalesByDate(weekFirstDayDate, tommorowDate, amountType);
    }
    else if (type == 'increment' && value > 0) {

      //To find first&last day date of next week
      let date = new Date();
      let currentWeekDay = date.getDay() > 0 ? date.getDay() : 7;
      let currentWeekFirstDay = date.getDate() - currentWeekDay + 1;
      let nextWeekFistDay = currentWeekFirstDay + (value * 7);
      let firstDayOfWeek = new Date(date.setDate(nextWeekFistDay));
      let lastDayOfWeek = new Date(date.setDate(firstDayOfWeek.getDate() + 6));

      //to covert date into ISO format '2022-01-01'
      let weekFirstDayDate = firstDayOfWeek.toISOString().split('T')[0];
      let weekLastDayDate = lastDayOfWeek.toISOString().split('T')[0];

      console.log("weekFirstDayDate", weekFirstDayDate);
      console.log("weekLastDayDate", weekLastDayDate);

      this.getSalesByDate(weekFirstDayDate, weekLastDayDate, amountType);
    }
    else if (type == 'decrement' && value > 0) {
      //To find first&last day date of previous week
      let date = new Date();
      let currentWeekDay = date.getDay() > 0 ? date.getDay() : 7;
      let currentWeekFirstDay = date.getDate() - currentWeekDay + 1;
      let previousWeekFistDay = currentWeekFirstDay - (value * 7);
      let firstDayOfWeek = new Date(date.setDate(previousWeekFistDay));
      let lastDayOfWeek = new Date(date.setDate(firstDayOfWeek.getDate() + 6));

      //to covert date into ISO format '2022-01-01'
      let weekFirstDayDate = firstDayOfWeek.toISOString().split('T')[0];
      let weekLastDayDate = lastDayOfWeek.toISOString().split('T')[0];

      console.log("weekFirstDayDate", weekFirstDayDate);
      console.log("weekLastDayDate", weekLastDayDate);

      this.getSalesByDate(weekFirstDayDate, weekLastDayDate, amountType);
    }

    // let newDate = new Date(date.setMonth(date.getMonth()-value)).toISOString().split('T')[0];

    // console.log('newDate',newDate)

  }
  getMonth(type, value) {
    let amountType = 'ofMonth';

    if (type == undefined && value == 0 || type == 'increment' && value == 0 || type == 'decrement' && value == 0) {
      let date = new Date();
      let monthFirstDate = new Date(this.year, this.month, 2).toISOString().split('T')[0];

      let today = new Date().toISOString().split('T')[0];
      var tomorrowDay = new Date().getDate() + 2;
      let tommorowDate = new Date(this.year, this.month, tomorrowDay).toISOString().split('T')[0];


      console.log('monthFirstDate', monthFirstDate);
      console.log("tommorowDate", tommorowDate);
      // console.log("month",this.month+1);

      this.getSalesByDate(monthFirstDate, tommorowDate, amountType);
    }
    else if (type == 'increment' && value > 0) {
      let date = new Date();
      this.month = this.month + value;
      let monthFirstDate = new Date(this.year, this.month, 2).toISOString().split('T')[0];

      const monthLastDate = new Date(this.year, this.month + 1, 1).toISOString().split('T')[0];

      console.log('monthFirstDate', monthFirstDate)
      console.log("monthLastDate", monthLastDate);
      // console.log("month",this.month+1); 


      this.getSalesByDate(monthFirstDate, monthLastDate, amountType);
    }
    else if (type == 'decrement' && value > 0) {
      let date = new Date();
      this.month = this.month - value;
      let monthFirstDate = new Date(this.year, this.month, 2).toISOString().split('T')[0];

      const monthLastDate = new Date(this.year, this.month + 1, 1).toISOString().split('T')[0];

      console.log('monthFirstDate', monthFirstDate)
      console.log("monthLastDate", monthLastDate);
      // console.log("month",this.month+1); 


      this.getSalesByDate(monthFirstDate, monthLastDate, amountType);
    }

    // let newDate = new Date(date.setMonth(date.getMonth()-value)).toISOString().split('T')[0];

    // console.log('newDate',newDate)

  }
  getYear(type, value) {
    let amountType = 'ofYear';

    if (type == undefined && value == 0 || type == 'increment' && value == 0 || type == 'decrement' && value == 0) {
      let date = new Date();
      // let monthFirstDate = new Date(this.year, this.month, 2).toISOString().split('T')[0];
      let yearFirstDate = new Date(this.year, 0, 2).toISOString().split('T')[0];

      let today = new Date().toISOString().split('T')[0];
      var tomorrowDay = new Date().getDate() + 2;
      let tommorowDate = new Date(this.year, this.month, tomorrowDay).toISOString().split('T')[0];

      console.log('yearFirstDate', yearFirstDate);
      console.log("tommorowDate", tommorowDate);

      this.getSalesByDate(yearFirstDate, tommorowDate, amountType);
    }
    else if (type == 'increment' && value > 0) {
      let date = new Date();
      this.year = this.year + value;
      let yearFirstDate = new Date(this.year, 0, 2).toISOString().split('T')[0];

      const monthLastDate = new Date(this.year, this.month + 1, 1).toISOString().split('T')[0];

      // console.log('monthFirstDate',monthFirstDate)
      console.log("yearFirstDate", yearFirstDate);
      console.log("monthLastDate", monthLastDate);

      this.getSalesByDate(yearFirstDate, monthLastDate, amountType);
    }
    else if (type == 'decrement' && value > 0) {
      let date = new Date();
      this.year = this.year - value;
      let yearFirstDate = new Date(this.year, 0, 2).toISOString().split('T')[0];

      const monthLastDate = new Date(this.year, this.month + 1, 1).toISOString().split('T')[0];

      console.log("yearFirstDate", yearFirstDate);
      console.log("monthLastDate", monthLastDate);

      this.getSalesByDate(yearFirstDate, monthLastDate, amountType);
    }

    // let newDate = new Date(date.setMonth(date.getMonth()-value)).toISOString().split('T')[0];

    // console.log('newDate',newDate)

  }

  viewSales($event): any {
    // console.log("$event",$event);

    this.router.navigate(['/sales/view/' + $event._id]);
  }


  //Generate Pdf File
  generateSalesPdf(event): any {
    this.showLoader = true;
    console.log("event", event);

    this.api.generateSalesPdf(event)

      .subscribe(
        res => {
          // console.log('generateSalesPdf....res', res)
          const byteArray = new Uint8Array(res.data);
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          const objectUrl = URL.createObjectURL(blob);
          // window.open(objectUrl,"_self");
          window.open(objectUrl, '_blank');
          // this.router.navigate(['/sales' ]);
          const file = document.createElement('a');
          file.href = objectUrl;

          file.download = event.userName + ' - ' + event._id;
          this.showLoader = false;
          file.click();
        },
        err => { }
      );
  }
  // filterByDateHandler(type) {
  //   // console.log("type", type);
  //   if (type === 'fromDate') {
  //     let spiltedDate = this.fromDate.split('-');
  //     let datePlusOne = +spiltedDate[2];
  //     datePlusOne = datePlusOne + 1;
  //     // console.log(" datePlusOne", datePlusOne);
  //     this.minFromDate = spiltedDate[0] + "-" + spiltedDate[1] + "-" + datePlusOne
  //     console.log(" this.minFromDate", this.minFromDate);
  //   }else{
  //     let spiltedDate = this.toDate.split('-');
  //     let dateMinusOne = +spiltedDate[2];
  //     dateMinusOne = dateMinusOne - 1;
  //     // console.log(" dateMinusOne", dateMinusOne);
  //     this.maxToDate = spiltedDate[0] + "-" + spiltedDate[1] + "-" + dateMinusOne
  //     console.log(" this.maxToDate", this.maxToDate);
  //   }
  // }
  changeData(): any {
    let page = 1;
    this.loading = true;
    // console.log('Payment Method----',this.selectedPaymentMethod)
    // console.log('Status----',this.status)
    this.salesList = this.api.getSalesList(page, this.perPage, this.selectedPaymentMethod, this.status,this.fromDate,this.toDate)
      .pipe(
        tap(res => {
          // console.log('Sales res',res)
          this.total = res['total'];
          this.p = page;
          this.perPage = 10;
          this.loading = false;
        }),
        map(({ docs: docs1 }) => docs1)
      );
  }
  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.sales.MAId;
    this.api.GetRoleActionByRoleIdRoleActionId(RoleID, roleactionID)
      .subscribe(
        res => {
          if (res.menuactionslist.length == 0) {
            this.authService.logout();
          }

        },
        err => { }
      );
  }

}


