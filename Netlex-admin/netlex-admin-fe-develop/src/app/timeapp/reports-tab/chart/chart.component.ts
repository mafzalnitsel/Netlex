import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  items=['Diagram'];
  expandedIndex = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
