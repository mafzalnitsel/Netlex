import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ApiService} from "../services/api.service";
import {ActivatedRoute,Router} from "@angular/router";
import {map, tap} from "rxjs/operators";
import {schedulerModel} from "../models/scheduler.model";
 import { AuthService } from '../services/auth.service';
import { menuactionspagename } from '../models/pagesnameandId';
 
@Component({
  selector: 'app-schedule-list-c',
  templateUrl: './lawyer-schedule-list.component.html',
  styleUrls: ['./lawyer-schedule-list.component.scss']
})
export class LawyerScheduleListComponent implements OnInit {

  @Input('data') lists: schedulerModel[] = [];
  // @Input() showloading = false;
  asyncLists: Observable<schedulerModel[]>;
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
  constructor(private api: ApiService,private route:ActivatedRoute,  private router: Router,private AuthServiceApi:AuthService ) { }

  ngOnInit(): void {
  this.currentDate = new Date().toISOString();
  this.checkRoleAction();
    this.getPage(1);
  }

  getPage(page: number): any {
    this.loading = true;
    // let obj;
    let  Role= this.AuthServiceApi.isRole();
    Role = 'Advokat'; // BackEnd Query with "Advokat" so
    const Lawyerid=this.AuthServiceApi.isLawyer();
    this.asyncLists = this.api.getScheduleLawyerList(page, this.perPage, Lawyerid,Role)
        .pipe(
            tap(res =>{
              // obj=res;
              // console.log('obj',obj.docs[0]._id)
              console.log("res",res)

              this.total = res['total'];
              this.p = page;
              this.perPage = 10;
              this.loading = false;

            //   queryParams: {
            //     schedularID: obj.docs[0]._id
            // }
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
    this.router.navigate(['/lawyer-scheduler/view/' + $event._id]);
  }
  showAddSchedule() {
    const Lawyerid=this.AuthServiceApi.isLawyer();
    this.router.navigate(['/lawyer-scheduler'],{
      queryParams: {
          Lawyerid: Lawyerid
      }
  });
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
      let RoleID =this.AuthServiceApi.getroleID();
      let roleactionID=menuactionspagename.lawyer_schedule_list.MAId;
      this.api.GetRoleActionByRoleIdRoleActionId(RoleID,roleactionID)
      .subscribe(
        res => { 
          if(res.menuactionslist.length==0){
              this.AuthServiceApi.logout();
          }
          
        },
        err => { }
      );
  }
}
