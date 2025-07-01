import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Sales } from '../models/sales.model';
import { menuactionspagename } from '../models/pagesnameandId';

@Component({
  selector: 'app-sales',
  templateUrl: './lawyer-sales.component.html',
  styleUrls: ['./lawyer-sales.component.scss']
})
export class LawyerSalesComponent implements OnInit {

  salesList: Observable<Sales[]>;

  // salesList = [{_id: 12, clientName: 'Dhaaru', clientId: '12', salesAmount: 123, salesAt: '2010', paymentMethod: 'Bank'}];
  showLoader: boolean = false;
  loading: boolean;
  perPage = 10;
  total: number;
  currentPage = 1;

  constructor(public authService: AuthService,
    private router: Router,
    // private route: ActivatedRoute,
    private api: ApiService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.checkRoleAction();
    this.getSales(1);

  }

  getSales(page: number): any {
    this.loading = true;
    //   let currentSchedularId;
    //   this.route.queryParams.subscribe(params => {
    //     console.log('params',params)
    //     // currentSchedularId = params.newId;

    // });
    let Role = this.authService.isRole();
    Role = 'Advokat'; // BackEnd Query with "Advokat" so
    const Lawyerid = this.authService.isLawyer();
    this.salesList = this.api.getLawyerSalesList(page, this.perPage, Lawyerid, Role).pipe(
      tap(res => {
        // console.log('res.docs', res.docs)
        // console.log('Role', Role)
        // console.log('Lawyerid', Lawyerid)



        // res.docs.forEach(ele => {
        // console.log('ele',ele) 
        // });

        this.total = res['total'];
        this.currentPage = page;
        this.perPage = 10;
        this.loading = false;
      }),
      map(({ docs: docs1 }) => docs1)
    );

    // this.api.getSalesList(page, this.perPage).subscribe(
    //     res => {
    //
    //     },
    //     err => {
    //     }
    // );
  }

  viewSales($event): any {
    // this.router.navigate(['/user/view/' + $event._id]);
  }
    //Generate Pdf File
    generateSalesPdf(event): any {
      this.showLoader = true;
      // console.log("event", event);
  
      this.api.generateSalesPdf(event)
  
        .subscribe(
          res => {
            // console.log('generateSalesPdf....res', res)
            const byteArray = new Uint8Array(res.data);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            const objectUrl = URL.createObjectURL(blob);
            // window.open(objectUrl,"_self");
            window.open(objectUrl, '_blank');
            // this.router.navigate(['/sales' ]);
            const file = document.createElement('a');
            file.href = objectUrl;
  
            file.download = event.userName + ' - ' + event._id;
            this.showLoader = false;
            file.click();
          },
          err => { }
        );
    }
  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.lawyer_sales.MAId;
    this.api.GetRoleActionByRoleIdRoleActionId(RoleID, roleactionID)
      .subscribe(
        res => {
          if (res.menuactionslist.length == 0) {
            this.authService.logout();
          }

        },
        err => { }
      );
  }
}


