// import {Component} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { menuactionspagename } from '../models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';

import { ApiService } from 'src/app/services/api.service';
export interface CosnfigurationsTab {
  label: string;
  content: string;
}

/**
 * @title Tab group with asynchronously loading tab contents
 */

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {
  asyncTabs: Observable<CosnfigurationsTab[]>;
  prefTabs: any;
  tabID = 2;
  innerTabID = 0;

  ngOnInit(): void {
    this.checkRoleAction();
    // this.route.queryParams.subscribe(params => {
    //   if (params.tabID) { this.tabID = params.tabID; }
    // });

  }
  constructor(private route: ActivatedRoute, public authService: AuthService,

    private api: ApiService,) {

    // this.asyncTabs = Observable.create((observer: Observer<CosnfigurationsTab[]>) => {
    //   setTimeout(() => {
    //     observer.next([
    //       {label: 'First', content: 'Content 1'},
    //       {label: 'Second', content: 'Content 2'},
    //       {label: 'Third', content: 'Content 3'},
    //     ]);
    //   }, 1000);
    // });

  }
  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.configurations.MAId;
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
