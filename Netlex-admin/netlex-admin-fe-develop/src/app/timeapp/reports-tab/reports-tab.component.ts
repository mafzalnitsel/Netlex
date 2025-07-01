import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-reports-tab',
  templateUrl: './reports-tab.component.html',
  styleUrls: ['./reports-tab.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class ReportsTabComponent implements OnInit {
  ReportsTabIntial= true;
  constructor() { }

  ngOnInit(): void {
  }
  reportTabChanged(tabIndex): void {
    // console.log('tabIndex => ', tabIndex);
    console.log('index => ', tabIndex);
    this.ReportsTabIntial = false;
  }
}
