import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  constructor() { }
  items = ['Aktivitet'];
  expandedIndex = 0;
  ngOnInit(): void {
  }

}
