import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-panel-tab',
  templateUrl: './control-panel-tab.component.html',
  styleUrls: ['./control-panel-tab.component.scss']
})
export class ControlPanelTabComponent implements OnInit {
  ReportsTabIntial = true;
  constructor() { }

  ngOnInit(): void {
  }
  controlPanelTabChanged(tabIndex): void {
    // console.log('tabIndex => ', tabIndex);
    console.log('index => ', tabIndex);
    this.ReportsTabIntial = false;
  }
}
