import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { UtilService } from '../../services/util.service';
import { RouterService } from "../../services/router.service";

@Component({
  selector: 'app-kommersnart',
  templateUrl: './kommersnart.component.html',
  styleUrls: ['./kommersnart.component.scss']
})
export class KommersnartComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    public router: Router,
    public routeService: RouterService,
    public utilService: UtilService,) {
    this.routeService.data = { state: null };
}

  
ngOnInit(): void {
  // window.scroll(0, 0);
  this.utilService.show();
  // this.utilService.edit = false;

}
  Close(){
    this.router.navigate(['']);
  }
}
