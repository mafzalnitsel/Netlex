import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  constructor() { }
  items = ['Fakturering'];
  expandedIndex = 0;
  ngOnInit(): void {
  }

}
