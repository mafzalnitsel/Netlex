import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.scss']
})
export class CodesComponent implements OnInit {

  constructor() { }
  items = ['Koder'];
  InnerItems = ['Koder Grupper','Koder'];
  expandedIndex = 0;
  ngOnInit(): void {
  }

}
