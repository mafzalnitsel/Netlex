import {Component, Input, OnInit} from '@angular/core';
import {Scheduler} from '../../models/scheduler.model';
import {Observable} from 'rxjs';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {UtilService} from '../../services/util.service';
import { ScheduleListModule } from './schedule-list.module';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {

  @Input('data') lists: Scheduler[] = [];
  // @Input() showloading = false;
  asyncLists: Observable<Scheduler[]>;
  p = 1;
  perPage = 10;
  total: number;
  loading: boolean;
  docs: any;
  status = '';
  statusValue = ['Yet to Be Confirmed ', 'Confirmed', 'Cancel'];
  searchValue: any;
  timer: any;
  constructor(private api: ApiService,  private router: Router, private utilService: UtilService ) { }

  ngOnInit(): void {
    console.log("gggggggggggggggggggggggggggggggg");
    
    this.getPage(1);
    this.utilService.show();
    this.utilService.edit = false;
  }

  getPage(page: number): any {
    this.loading = true;
    this.asyncLists = this.api.getScheduleList(page, this.perPage)
        .pipe(
            tap(res => {
              this.total = 10;
              this.p = page;
              this.perPage = 10;
              this.loading = false;
            }),
            map(({docs: docs1}) => docs1)
        );
  }

  isEditable(scheduleDate): any{
    const currentDate = new Date();
    const formatedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const formatedScheduleDate = new Date(scheduleDate);
    const scheduleDateWt = new Date(formatedScheduleDate.getFullYear(), formatedScheduleDate.getMonth(), formatedScheduleDate.getDate());
    return (formatedDate < scheduleDateWt);

  }
  viewScheduler($event): any {
    // this.showloading = true;
    this.router.navigate(['/scheduler/view/' + $event._id]);
  }

  showAddSchedule(): void {
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
    // debugger;
    let statusResult;
    this.lists.forEach(statusGroup => {


        statusResult = this.lists.map(function (status) {

        });


 
        statusResult = this.lists.map(function (status) {

        });
 

      console.log('statusGroup',statusGroup)
    // statusGroup.status.forEach(status => {
    //   statusResult =  this.lists.map( function (status) {
    //     });
    //   });


    });
  }
}
