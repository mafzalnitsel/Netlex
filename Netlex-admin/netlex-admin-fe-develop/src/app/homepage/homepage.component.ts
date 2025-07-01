import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  name: string;
  id: string;
  userRole: string;
  menuactionslist: [];
  //userrolea="Roll-handling";
  showSidebar: Boolean = true;
  showMobileSidebar = true;

  showMainMenu = true;
  mainMenuButtons: any;

  administrationButton: Boolean = false;
  administratioSubMenuArray: any;

  avtalButton: Boolean = false;
  avtalSubMenu = false;
  avtalSubMenuArray: any;

  businessAvtalButton: Boolean = false;
  businessAvtalSubMenu = false;
  businessAvtalSubMenuArray: any;

  usersNLawyerButton: Boolean = false;
  usersNLawyerSubMenu = false;
  usersNLawyerSubMenuArray: any;

  configNLogsButton: Boolean = false;
  configNLogsSubMenu = false;
  configNLogsSubMenuArray: any;

  salesButton: Boolean = false;
  salesSubMenuArray: any;

  // meetingsNSalesButton: Boolean = false;
  // meetingsNSalesButtonSubMenu = false;
  // meetingsNSalesSubMenuArray: any;
  firstAccordion = ['Administrering', 'Personligt Avtal', 'Företag Avtal', 'Användare & Advokater', 'Config & E-postloggar', 'Rapporter', 'Försäljning'];

  showLoader = false;


  constructor(private api: ApiService, private Auth: AuthService, private router: Router,) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('userName');
    this.userRole = localStorage.getItem('roles');
    this.GetUserRoleAction();
  }
  GetUserRoleAction(): any {
    let iid = this.Auth.getroleID();
    this.api.GetUserRoleAction(iid)

      .subscribe(
        res => {

          this.menuactionslist = res.menuactionslist;
          let allMenuActions = res.menuactionslist;
          // console.log("allMenuActions", allMenuActions)
          let array0 = [];
          let array = [];
          let array2 = [];
          let array3 = [];
          let array4 = [];
          let array5 = [];
          let array6 = [];
          allMenuActions.map((ele) => {
            // console.log("ele",ele)
            // if(ele.menuactionsName!=='id' && ele.menuactionsName!=='Nytt Avtal'  && ele.menuactionsName!=='Ändra i Bef. avtal'
            // && ele.menuactionsName!=='Utkast av avtal'  && ele.menuactionsName!=='Dokumentera Kolla'  && ele.menuactionsName!=='Företag Avtal Lista'
            // && ele.menuactionsName!=='Utkast Företag Avtal' && ele.menuactionsName!=='Misslyckade e-postloggar' && ele.menuactionsName!=='Konfigurationer'){
            //   // this.avtalButton = true;
            //   array.push({
            //     name: ele.menuactionsName,
            //     url: ele.menuactionsUrl
            //   })
            // }
            //----------------Binding Main Menu Array------------
            if ( /*ele.menuactionsName === 'Användare' || ele.menuactionsName === 'Advokat'  || || ele.menuactionsName === 'Innehållssidor'
             || ele.menuactionsName === 'Roll-handling' || ele.menuactionsName === 'Säljshistora' || ele.menuactionsName === 'Affärs Typ'*/
              ele.menuactionsName === 'Schemalägg möte' || ele.menuactionsName === 'Jävskontroll' || ele.menuactionsName === 'Tid App') {
              // this.avtalButton = true;
              array.push({
                name: ele.menuactionsName,
                url: ele.menuactionsUrl
              })
            }
            // console.log("this.mainMenuButtons", this.mainMenuButtons)
            //--------------Binding Personal Agreement SubMenu Array------------
            if (ele.menuactionsName === 'Användare' || ele.menuactionsName === 'Roll-handling' || ele.menuactionsName === 'Innehållssidor') {
              this.administrationButton = true;
              array0.push({
                name: ele.menuactionsName,
                url: ele.menuactionsUrl
              })
            }
            //--------------Binding Personal Agreement SubMenu Array------------
            if (ele.menuactionsName === 'Nytt Avtal' || ele.menuactionsName === 'id' || ele.menuactionsName === 'Ändra i Bef. avtal'
              || ele.menuactionsName === 'Utkast av avtal' || ele.menuactionsName === 'Dokumentera Kolla') {
              this.avtalButton = true;
              array2.push({
                name: ele.menuactionsName,
                url: ele.menuactionsUrl
              })
            }
            // if (this.avtalButton === true) {
            //   if (ele.menuactionsName === 'id' || ele.menuactionsName === 'Nytt Avtal' || ele.menuactionsName === 'Ändra i Bef. avtal'
            //     || ele.menuactionsName === 'Utkast av avtal' || ele.menuactionsName === 'Dokumentera Kolla') {
            //     array2.push({
            //       name: ele.menuactionsName,
            //       url: ele.menuactionsUrl
            //     })
            //   }
            // }

            //--------------Binding Business Agreement SubMenu Array------------
            if (ele.menuactionsName === 'Företag Avtal Lista' || ele.menuactionsName === 'Utkast Företag Avtal') {
              this.businessAvtalButton = true;
              array3.push({
                name: ele.menuactionsName,
                url: ele.menuactionsUrl
              })
            }
            //--------------Binding Email logs & Config SubMenu Array------------
            if (ele.menuactionsName === 'Konfigurationer' || ele.menuactionsName === 'Misslyckade e-postloggar') {
              this.configNLogsButton = true;
              array4.push({
                name: ele.menuactionsName,
                url: ele.menuactionsUrl
              })
            }
            //--------------Binding Personal Agreement SubMenu Array------------
            if (ele.menuactionsName === 'Säljshistora' || ele.menuactionsName === 'Affärs Typ') {
              this.salesButton = true;
              array6.push({
                name: ele.menuactionsName,
                url: ele.menuactionsUrl
              })
            }
            //--------------Binding Users and Lawyers SubMenu Array------------
            // if (ele.menuactionsName === 'Användare' || ele.menuactionsName === 'Advokat') {
            //   console.log("ele.menuactionsName",ele.menuactionsName)
            //   this.usersNLawyerButton = true;
            //   array5.push({
            //     name: ele.menuactionsName,
            //     url: ele.menuactionsUrl
            //   })
            // }


          })
          this.mainMenuButtons = array;
          this.administratioSubMenuArray = array0;
          this.avtalSubMenuArray = array2;
          this.businessAvtalSubMenuArray = array3;
          this.configNLogsSubMenuArray = array4;
          this.usersNLawyerSubMenuArray = array5;
          this.salesSubMenuArray = array6;

          // console.log("this.avtalSubMenuArray", this.avtalSubMenuArray)



        },
        err => { }
      );
  }
  openUserNLawyerSubMenu() {
    // this.usersNLawyerButton = false;
    this.showMainMenu = false;
    this.usersNLawyerSubMenu = true;
  }
  openAvtalSubMenu() {
    this.showMainMenu = false;
    this.avtalSubMenu = true;
  }

  openBusinessAvtalSubMenu() {
    this.showMainMenu = false;
    this.businessAvtalSubMenu = true;
  }

  openConfigNLogsSubMenu() {
    this.showMainMenu = false;
    this.configNLogsSubMenu = true;
  }

  backToMainMenu() {
    this.usersNLawyerSubMenu = false;
    this.avtalSubMenu = false;
    this.configNLogsSubMenu = false;
    this.businessAvtalSubMenu = false;
    this.showMainMenu = true;
  }
  //GetUserRoleAction
  receivename($event) {  
    
    this.showMobileSidebar = $event; 
    // console.log("this.showMobileSidebar",this.showMobileSidebar);

    } 


  // //Nadeem@iot
  menuClicked(event): any {
    if (event === '/content-pages') {
      this.showLoader = true;
      setTimeout(() => {
        this.showLoader = false;
        this.router.navigate([event]);
      }, 700);
    }
    else {
      this.router.navigate([event]);
    }
  }
}
