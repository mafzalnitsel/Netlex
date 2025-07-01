import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matter',
  templateUrl: './matter.component.html',
  styleUrls: ['./matter.component.scss']
})
export class MatterComponent implements OnInit {

  constructor() { }
  items = ['Materia'];
  expandedIndex = 0;
  ngOnInit(): void {
  }

}
