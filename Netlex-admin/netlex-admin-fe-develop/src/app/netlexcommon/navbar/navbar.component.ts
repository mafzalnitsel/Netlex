import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from "../../../environments/environment";
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";
import { ReloadPreventDialogComponent } from "../reload-prevent-dialog/reload-prevent-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() isNewDealComponent: boolean = false;
  @ViewChild('sidenav') sidenav: MatSidenav;

  openSidebar: boolean = false;
  // reason = '';

  close(reason) {
    // this.reason = reason;
    this.sidenav.close();
  }
  //------------- Pass data to parent component ------------
  // passData: string = "Nadeem"; 
  // @Output() nameEmitter = new EventEmitter < string > ();  
  // @Output() nameEmitter = new EventEmitter<boolean>();
  // openSidebarHandler() {
  //     // console.log("MenuButton Clicked",this.openSidebar);
  //     this.openSidebar = !this.openSidebar;
  //     this.nameEmitter.emit(this.openSidebar);
  // }
  ////////////////////////////////////////////////////////////
  isactive = false;
  name: string;
  userRole: string;
  profilePic: string;
  alert: { success: boolean, text: string } = { success: true, text: '' };
  id: string;
  imgURL: string | ArrayBuffer;
  imagePath: '';
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
  firstAccordion = ['', 'Administrering', 'Personligt Avtal', 'Företag Avtal (För Sofia)', 'Användare & Advokater', 'Config & E-postloggar', 'Rapporter', 'Försäljning'];

  showLoader = false;
  userLawyerId = '';


  constructor(private authService: AuthService,
    private api: ApiService,
    public router: Router,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.name = localStorage.getItem('userName');
    this.userRole = localStorage.getItem('roles');
    this.getUserDate();
    // this.GetUserRoleAction();
  }

  logout(): void {
    return this.authService.logout();
  }

  active(): void {
    this.isactive = true;
  }

  getUserDate(): any {
    this.api.getUser(localStorage.getItem('_id'))
      .subscribe(
        res => {
          // console.log('resresresres',res);
          if (res.profilePic) {
            this.imgURL = environment.serviceURL + res.profilePic;
          }
          if (res.lawyerid) {
            // console.log('res.lawyerid',res.lawyerid);
            this.userLawyerId = res.lawyerid;
          }
          this.GetUserRoleAction();

        },
      );
  }

  navigationPrevent(): void {

    if (this.isNewDealComponent === false) {
      this.router.navigate(['/home']).then();
    } else {
      this.reloadDialog();
    }

  }


  reloadDialog(): void {
    const dialogRef = this.dialog.open(ReloadPreventDialogComponent, {
      width: '410px',
      height: '120px',
      data: { action: 'home' },
      panelClass: 'reloadPrevent',
      position: {
        top: '27px'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.router.navigate(['/home']).then();
      } else {
        return;
      }

    });
  }

  openSidebarHandler() {
    // console.log("MenuButton Clicked",this.openSidebar);
    // this.openSidebar = !this.openSidebar;
    // this.nameEmitter.emit(this.openSidebar);
    if (this.openSidebar) {
      this.sidenav.close();
      this.openSidebar = false;

    } else {
      this.sidenav.open();
      this.openSidebar = true;
    }
  }
  // GetUserRoleAction(): any {
  //     let iid = this.authService.getroleID();
  //     this.api.GetUserRoleAction(iid)

  //         .subscribe(
  //             res => {

  //                 this.menuactionslist = res.menuactionslist;


  //             },
  //             err => { }
  //         );
  // }

  ///////////////////////////////////---HomePageData---////////////////////////////////
  GetUserRoleAction(): any {
    let iid = this.authService.getroleID();
    // console.log('this.userLawyerId', this.userLawyerId);
    this.api.GetUserRoleAction(iid)
      .subscribe(
        res => {

          this.menuactionslist = res.menuactionslist;
          let allMenuActions = res.menuactionslist;
          // console.log("allMenuActions", allMenuActions);
          //Giving BusyCalender Right if User is lawyer
          if (this.userLawyerId) {
            allMenuActions.unshift({
              menuactionsName: "Upptagen tidskalender",
              menuactionsUrl: "/profile/busyCalendar",
              menuactions_id: "000000000000000",
              _id: "111111111111111"
            })
            // console.log("allMenuActions", allMenuActions);
          }
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
              ele.menuactionsName === 'Upptagen tidskalender' || ele.menuactionsName === 'Schemalägg möte'
              || ele.menuactionsName === 'Jävskontroll' || ele.menuactionsName === 'Tid App') {
              // this.avtalButton = true;
              array.push({
                name: ele.menuactionsName,
                url: ele.menuactionsUrl
              })
            }
            // console.log("this.mainMenuButtons", this.mainMenuButtons)
            //--------------Binding Personal Agreement SubMenu Array------------
            if (ele.menuactionsName === 'Användare' ||ele.menuactionsName === 'Affärs Typ' || ele.menuactionsName === 'Roll-handling' || ele.menuactionsName === 'Innehållssidor') {
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
            if (ele.menuactionsName === 'Säljshistora') {
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
  }/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
