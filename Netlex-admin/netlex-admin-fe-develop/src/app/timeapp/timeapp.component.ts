// import {Component} from '@angular/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { menuactionspagename } from '../models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';

import { ApiService } from 'src/app/services/api.service';
export interface TimeAppTabs {
  label: string;
  content: string;
}

@Component({
  selector: 'app-timeapp',
  templateUrl: './timeapp.component.html',
  styleUrls: ['./timeapp.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimeappComponent implements OnInit {
  asyncTabs: Observable<TimeAppTabs[]>;

  ReportsTabIntial = true;
  TabsNames = ['Bokföring', 'Registrera', 'Mina Sidor', 'Rapporter', 'Fakturering', 'Kontroll Panel',]
  array = [{ tab: false }, { tab: false }, { tab: false }, { tab: false }, { tab: false }, { tab: true }]
  AccountingTabActive = false;

  // tabID = 0;
  ngOnInit(): void {
    this.checkRoleAction();
    // this.route.queryParams.subscribe(params => {
    //   this.tabID = params.tabID;
    // });
  }
  constructor(private route: ActivatedRoute, public authService: AuthService,

    private api: ApiService,) { }
  //Report Tab Change
  reportTabChanged(tabIndex): void {
    // console.log('tabIndex => ', tabIndex);
    console.log('index => ', tabIndex);
    this.ReportsTabIntial = false;
  }
  selectedNavTab(index, tabName): any {
    // this.AccountingTabActive = true;
    this.array.forEach((ele, i) => {
      if (i === index) {
        this.array[i].tab = true
      }
      else {
        this.array[i].tab = false
      }
    })
  }
  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.timeApp.MAId;
    console.log(roleactionID);
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
