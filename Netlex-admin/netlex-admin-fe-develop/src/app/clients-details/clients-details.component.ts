import {Component, OnInit, Input} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessTypeModel } from 'src/app/models/businessType.model';
import { ClientsDetailsModel } from '../models/clientsDetails.model';
import {Router} from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { menuactionspagename } from '../models/pagesnameandId';


@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.scss']
})
export class ClientsDetailsComponent implements OnInit {

    @Input('data') items: ClientsDetailsModel[] = [];
    asyncItems: Observable<ClientsDetailsModel[]>;
    p = 1;
    perPage = 10;
    total: number;
    loading: boolean;
    docs: any;


    constructor(public authService: AuthService,
                private router: Router,
                private api: ApiService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.checkRoleAction();
        this.getPage(1);
    }

    viewClientsDetails($event): any {
        this.router.navigate(['/clients-details/view/' + $event._id]);
        // console.log('idddddddddddddddddd',$event._id)
    }

    getPage(page: number): any {
        this.loading = true;
        this.asyncItems = this.api.getClientsDetailsList(page, this.perPage)
            .pipe(
                tap(res => {
                    // console.log('res',res)
                    this.total = res['total'];
                    this.p = page;
                    this.perPage = 10;
                    this.loading = false;
                }),
                map(({docs: docs1}) => docs1)
            );
    }

    deleteClientsDetails(ClientsDetailsId: string): any {
        if (confirm('Är du säker på att du vill ta bort den här Klients Detaljer?')) {
            this.loading = true;
            this.api.deleteClientsDetails(ClientsDetailsId).subscribe(
                res => {
                    this.loading = false;
                    this.snackBar.open('Klients Detaljer har tagits bort', 'ok');
                    window.scroll(0, 0);
                    this.getPage(1);
                }, err => {
                    console.log("err",err)
                    this.loading = false;
                    this.snackBar.open(
                        'Det går inte att ta bort Klients Detaljer. Var god försök igen', 'ok');
                    window.scroll(0, 0);
                }
            );
        }
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
