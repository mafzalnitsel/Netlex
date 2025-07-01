import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-co-partners',
  templateUrl: './co-partners.component.html',
  styleUrls: ['./co-partners.component.scss']
})
export class CoPartnersComponent implements OnInit {

  constructor() { }
  items = ['Medparter'];
  expandedIndex = 0;
  ngOnInit(): void {
  }

}
