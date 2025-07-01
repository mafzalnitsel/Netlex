import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';
// import {environment} from '../../../environments/environment.prod';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {menuactionspagename} from  '../../models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';
@Component({
    selector: 'app-view-business-type',
    templateUrl: './view-business-type.component.html',
    styleUrls: ['./view-business-type.component.scss']
  })
  export class ViewBusinessTypeComponent implements OnInit {
    private sub: any;
    id: '';
    name = '';
    amount = '';
    vat = '';
    total= '';
    showloading = false;
    alert: { success: boolean, text: string } = {success: true, text: ''};
 
    rolesValue = ['Administration', 'Advokat', 'Biträdande jurist'];
    statusValue = ['Aktiv', 'Inaktiv'];
    businesstype: { name: string; amount: string; vat: string; }[];

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private snackBar: MatSnackBar, private authService: AuthService, 
    ) {
    }

    ngOnInit(): void {
        this.checkRoleAction();
        this.sub = this.route.params.subscribe(params => {
            this.id = params.id;
            this.getBusinessTypeData();
        });
    }

//Get BusinessType
    getBusinessTypeData(): any {

        this.api.getBusinessType(this.id)

            .subscribe(
                res => {
                    this.name = res.name;
                    this.amount = res.amount;
                    this.vat = res.vat;
                },
                err => {                }
            );
    }
//Update BusinessType
    update(): any {
        this.showloading = true;
        this.businesstype = [{
            'name': this.name,
            'amount': this.amount,
            'vat': this.vat
        }]
        this.api.updateBusinessType(this.businesstype, this.id)
            .subscribe(
                res => {
                    this.snackBar.open('Användaren uppdaterades lyckades', 'ok');
                    this.showloading = false;
                },
                err => {
                    this.showloading = false;
                }
            );
    }
    checkRoleAction():any
    {
        let RoleID =this.authService.getroleID();
        let roleactionID=menuactionspagename.businesstype.MAId;
        this.api.GetRoleActionByRoleIdRoleActionId(RoleID,roleactionID)
        .subscribe(
          res => { 
            if(res.menuactionslist.length==0){
                this.authService.logout();
            }
            
          },
          err => { }
        );
    }

}
