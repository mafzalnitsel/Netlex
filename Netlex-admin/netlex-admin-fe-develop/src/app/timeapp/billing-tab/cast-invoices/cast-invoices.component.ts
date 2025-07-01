import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cast-invoices',
  templateUrl: './cast-invoices.component.html',
  styleUrls: ['./cast-invoices.component.scss']
})
export class CastInvoicesComponent implements OnInit {

  constructor() { }
  items = ['Cast fakturor'];
  expandedIndex = 0;
  ngOnInit(): void {
  }

}
