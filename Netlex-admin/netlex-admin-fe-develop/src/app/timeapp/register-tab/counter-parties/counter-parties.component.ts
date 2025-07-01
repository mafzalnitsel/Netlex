import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter-parties',
  templateUrl: './counter-parties.component.html',
  styleUrls: ['./counter-parties.component.scss']
})
export class CounterPartiesComponent implements OnInit {

  constructor() { }
  items = ['Counterparties'];
  expandedIndex = 0;
  ngOnInit(): void {
  }

}
