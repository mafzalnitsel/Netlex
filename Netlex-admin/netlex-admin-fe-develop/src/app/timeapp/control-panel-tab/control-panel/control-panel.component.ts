import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  constructor() { }
  items = ['Kontroll Panel'];
  expandedIndex = 0;
  ngOnInit(): void {
  }

}
