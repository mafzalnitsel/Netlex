// import {Component} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { menuactionspagename } from '../models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';
 
import { ApiService } from 'src/app/services/api.service';
export interface ExampleTab {
  label: string;
  content: string;
}

/**
 * @title Tab group with asynchronously loading tab contents
 */
@Component({
  selector: 'app-content-pages',
  templateUrl: './content-pages.component.html',
  styleUrls: ['./content-pages.component.scss']
})
export class ContentPagesComponent implements OnInit {
  asyncTabs: Observable<ExampleTab[]>;

  tabID = 0;

  ngOnInit(): void {
    this.checkRoleAction();
    this.route.queryParams.subscribe(params => {
      this.tabID = params.tabID;
    });

  }
  constructor(private route: ActivatedRoute,public authService: AuthService,
     
    private api: ApiService,) { }
  checkRoleAction():any
  {
      let RoleID =this.authService.getroleID();
      let roleactionID=menuactionspagename.content_pages.MAId;
      this.api.GetRoleActionByRoleIdRoleActionId(RoleID,roleactionID)
      .subscribe(
        res => { 
          if(res.menuactionslist.length==0){
              this.authService.logout();
          }
          
        },
        err => { }
      );
  }
}
