import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from "../../../services/auth.service";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportsComponent implements OnInit {

  constructor(private authService: AuthService, private api: ApiService) { }
  firstAccordion = ['Rapporter'];
  secondAccordion = ['Sammanställningar','Rapporter','Artiklar','Fakturering','Registrera']
  expandedIndex = 0;
  ngOnInit(): void {
  }
  showValue = false;
  show(): any {
    this.showValue= !this.showValue;
    console.log("this.showValue",this.showValue)
  }
}
