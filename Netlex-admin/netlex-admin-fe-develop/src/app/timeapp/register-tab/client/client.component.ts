import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  constructor() { }
  
  items = ['Klient'];
  expandedIndex = 0;
  ngOnInit(): void {
  }

}
