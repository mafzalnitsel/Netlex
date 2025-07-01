import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor() { }
  items = ['Inställningar'];
  InnerItems = ['Betalningsmottagare', 'Meddelande och texter', 'Avgifter', 'Bokföring',];
  expandedIndex = 0;
  ngOnInit(): void {
  }

}
