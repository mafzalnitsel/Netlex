import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  constructor() { }
  items = ['Mallar'];
  expandedIndex = 0;
  ngOnInit(): void {
  }

}
