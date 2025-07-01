import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";
import {map, tap} from "rxjs/operators";
import {schedulerModel} from "../models/scheduler.model";
import { menuactionspagename } from '../models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {

  @Input('data') lists: schedulerModel[] = [];
  // @Input() showloading = false;
  asyncLists: Observable<schedulerModel[]>;
  userId = localStorage.getItem('_id')
  roleId = localStorage.getItem('roleID')
  p = 1;
  perPage = 10;
  total: number;
  loading: boolean;
  docs: any;
  status = "";
  currentDate: any;
  statusValue = ['Ännu att bekräftas', 'Bekräftad', 'Avbryt'];
  private showloading: boolean;
  searchValue: any;
  private timer: any;
  constructor(private api: ApiService,  private router: Router,private authService:AuthService ) { }

  ngOnInit(): void {
    var items = localStorage.getItem("roles");
    console.log("roles---", items);
    if(items === "Administration"){
      console.log("yes")
      this.router.navigate(['/schedule-list']);
    }else{
      console.log("No")
      this.router.navigate(['/lawyer-schedule-list']);
    }

  this.currentDate = new Date().toISOString();
  // console.log('this.currentDate',this.currentDate)

    // this.checkRoleAction();
    this.getPage(1);
  }

  getPage(page: number): any {
    this.loading = true;
    this.asyncLists = this.api.getScheduleList(page, this.perPage)
        .pipe(
            tap(res =>{
              // console.log('res',res)
              this.total = res['total'];
              this.p = page;
              this.perPage = 10;
              this.loading = false;
            }),
            map(({docs: docs1}) => docs1)
        );
  }

  isEditable(scheduleDate){
    let currentDate = new Date();
    const formatedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const formatedScheduleDate = new Date(scheduleDate);
    const scheduleDateWt = new Date(formatedScheduleDate.getFullYear(), formatedScheduleDate.getMonth(), formatedScheduleDate.getDate());
    return (formatedDate < scheduleDateWt);

  }
  viewScheduler($event): any {
    // this.showloading = true;
    this.router.navigate(['/scheduler/view/' + $event._id]);
  }
  showAddSchedule() {
    this.router.navigate(['/scheduler']);
  }
  searchTimer(searchStr: string): void {
    clearTimeout(this.timer);
    const time = 10;
    this.timer = setTimeout(() => {
      this.searchFilter(searchStr);
    }, time);
  }

  searchFilter(search): any { 
    let statusResult;
    this.lists.forEach(statusGroup => {

        statusResult = this.lists.map(function (status) {

        });
    });
  }
  checkRoleAction():any
  {
      let RoleID =this.authService.getroleID();
      let roleactionID=menuactionspagename.schedule_list.MAId;
      this.api.GetRoleActionByRoleIdRoleActionId(RoleID,roleactionID)
      .subscribe(
        res => { 
          console.log(res)
          if(res.menuactionslist.length==0){
              // this.authService.logout();
          }
          
        },
        err => { }
      );
  }
}
