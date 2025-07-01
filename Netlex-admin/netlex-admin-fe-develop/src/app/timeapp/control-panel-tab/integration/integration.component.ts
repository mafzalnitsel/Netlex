import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent implements OnInit {

  constructor() { }
  items = ['Integrationer'];
  expandedIndex = 0;
  ngOnInit(): void {
  }

}
