import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor() { }
  items = ['Artiklar'];
  expandedIndex = 0;
  ngOnInit(): void {
  }

}
