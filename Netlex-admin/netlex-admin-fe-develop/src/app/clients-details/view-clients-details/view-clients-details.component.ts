import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';
// import {environment} from '../../../environments/environment.prod';
// import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import{AuthService}from'../../services/auth.service'
@Component({
  selector: 'app-view-clients-details',
  templateUrl: './view-clients-details.component.html',
  styleUrls: ['./view-clients-details.component.scss']
})
export class ViewClientsDetailsComponent implements OnInit {
    private sub: any;
    id: '';
    fromName = '';
    fromPhoneNumber = '';
    fromEmail = '';
    fromSsn = '';
    toName = '';
    toPhoneNumber = '';
    toEmail = '';
    toSsn = '';
    total= '';
    showloading = false;
    alert: { success: boolean, text: string } = {success: true, text: ''};
 
    clientsDetails: { fromName: string; fromPhoneNumber: string; fromEmail: string; fromSsn: string; 
        toName: string; toPhoneNumber: string; toEmail: string; toSsn: string; }[];

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private snackBar: MatSnackBar,
        private authService: AuthService,
        
    ) {
    }

    ngOnInit(): void {
        this. checkRoleAction();
        this.sub = this.route.params.subscribe(params => {
            this.id = params.id;
            // console.log('id',params.id)
            this.getClientsDetails();
        });
    }

//Get ClientsDetails
getClientsDetails(): any {

        this.api.getClientsDetails(this.id)

            .subscribe(
                res => {
                    this.fromName = res.fromName;
                    this.fromPhoneNumber = res.fromPhoneNumber;
                    this.fromEmail = res.fromEmail;
                    this.fromSsn = res.fromSsn;
                    this.toName = res.toName;
                    this.toPhoneNumber = res.toPhoneNumber;
                    this.toEmail = res.toEmail;
                    this.toSsn = res.toSsn;
                },
                err => {                }
            );
    }
//Update ClientsDetails
    update(): any {
        this.showloading = true;
        this.clientsDetails = [{
            'fromName': this.fromName,
            'fromPhoneNumber': this.fromPhoneNumber,
            'fromEmail': this.fromEmail,
            'fromSsn': this.fromSsn,
            'toName': this.toName,
            'toPhoneNumber': this.toPhoneNumber,
            'toEmail': this.toEmail,
            'toSsn': this.toSsn
        }]
        this.api.updateClientsDetails(this.clientsDetails, this.id)
            .subscribe(
                res => {
                    this.snackBar.open('Clients Details uppdaterades lyckades', 'ok');
                    this.showloading = false;
                    // console.log('this.id',this.id)
                    // console.log('this.clientsDetails',this.clientsDetails)
                },
                err => {
                    this.showloading = false;
                }
            );
    }
    checkRoleAction():any
    {
        let RoleID =this.authService.getroleID();
        let roleactionID=menuactionspagename.clients_details.MAId;
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
