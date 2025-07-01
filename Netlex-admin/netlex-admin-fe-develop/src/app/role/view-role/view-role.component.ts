import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss']
})
export class ViewRoleComponent implements OnInit {

  private sub: any;
  id: '';
  name = '';
  showloading = false;
  alert: { success: boolean, text: string } = {success: true, text: ''};
  role: { name: string;  }[];
 

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
) {
}

  ngOnInit(): void {


    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.getRoleData();
  });
  }
  


  getRoleData(): any {

    this.api.getRole(this.id)

        .subscribe(
            res => {
                this.name = res.name;
               
            },
            err => {                }
        );
}
update(): any {
  this.showloading = true;
  this.role = [{
      'name': this.name,
  }]
  this.api.updateRole(this.role, this.id)
      .subscribe(
          res => {

              this.snackBar.open('Roll uppdaterades lyckades', 'ok');
              this.showloading = false;
              
              this.redirect();
          },
          err => {
              this.showloading = false;
          }
      );
      
}
redirect(): void{
  this.router.navigate(['/role']);
}
}
