import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-extended-search',
  templateUrl: './extended-search.component.html',
  styleUrls: ['./extended-search.component.scss']
})
export class ExtendedSearchComponent implements OnInit {

  constructor() { }
  items = ['Förlängd Sök'];
  expandedIndex = 0;
  ngOnInit(): void {
  }

}
