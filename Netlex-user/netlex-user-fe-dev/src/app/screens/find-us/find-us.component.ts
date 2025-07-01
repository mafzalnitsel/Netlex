import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util.service';
import { RouterService } from "../../services/router.service";

@Component({
  selector: 'app-find-us',
  templateUrl: './find-us.component.html',
  styleUrls: ['./find-us.component.scss']
})
export class FindUsComponent  {
  constructor(
    public translate: TranslateService,
    public router: Router,
    public routeService: RouterService,
    public utilService: UtilService,) {
    this.routeService.data = { state: null };
}
getvalue(name:any){
console.log("data",name)
 }
ngOnInit(): void {
    // window.scroll(0, 0);
    this.utilService.show();
    // this.utilService.edit = false;

}
}