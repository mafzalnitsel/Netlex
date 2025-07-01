import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {DialogComponent} from '../../../netlex-common/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from "sweetalert2";
import {AuthService} from "../../../services/auth.service";


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    @Output() settingsBack = new EventEmitter<any>();
    @Input() option: string;
    mname:string;
    phoneno:string;
    name: string;
    surName: string;
    middlename:string;
    phonenumber:any;
    email: string;
    id: string;
    userName: string;
    organizationName: string;
    organizationNumber: string;
    innerWidth: number;
    addOrganization = true;
    createAdmin = false;
    adminSsn: string;
    adminName: string;
    showLoader = false;
    organizationDetails: any;
    userSsn: string;
    organizationId: string;
    isAdmin: boolean;

    constructor(public user: UserService,
                public dialog: MatDialog,
                public translate: TranslateService,
                public router: Router,
                public snackBar: MatSnackBar,
                public userService: UserService,
                public authService: AuthService) {
    }

    ngOnInit(): void {
        const role = localStorage.getItem('role');
        this.isAdmin = role === 'Administration';
        this.userName = this.name = localStorage.getItem('firstName');
        this.surName = localStorage.getItem('lastName');
        this.email = localStorage.getItem('email');
        this.middlename = localStorage.getItem('middleName');
        this.phonenumber = localStorage.getItem('phoneno');
        this.id = localStorage.getItem('id');
        this.innerWidth = window.innerWidth;
        this.userService.getUserDetails(localStorage.getItem('id')).subscribe(userDetails =>{
            this.userSsn = userDetails.ssn;
        });
    }

    settingBackNavigation(): void { // back button
        this.settingsBack.emit('prevSettings');
    }

    submitUserDetails(): any { // update current user
        const userDetails = [this.name, this.surName, this.email, this.id,this.mname,this.phoneno];
        console.log('userDetails',userDetails)
        this.user.editUser(userDetails).subscribe(response => {

           if (response) {
               localStorage.setItem('firstName', response.firstName);
               localStorage.setItem('lastName',  response.lastName);
               localStorage.setItem('userName',  response.userName);
               localStorage.setItem('email',  response.email);
               localStorage.setItem('middleName',  response.middlename);
               localStorage.setItem('phoneno',  response.phoneno);
               this.snackBar.open(this.translate.instant('SETTINGS.USER_UPDATED'), 'ok');
           }
        });
    }

    deleteUser(): any { // Delete current user
        this.openDialog(this.translate.instant('ACCOUNT_DELETE.ACCOUNT'), this.translate.instant('ACCOUNT_DELETE.WARN_MSG'),
            this.translate.instant('ACCOUNT_DELETE.DELETE'), localStorage.getItem('id'));

    }

    openDialog(header, content, action, id): void {
        let width;
        let height;
        this.innerWidth >= 425 ? width = 400 : width = 349;
        this.innerWidth >= 425 ? height = 400 : height = 410;
        const dialogRef = this.dialog.open(DialogComponent, {
            width: width,
            height: height,
            panelClass: 'mat-dialog-container-primary',
            data: {header: header, content: content, action: action, component: 'settings'}
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result === true) {
                this.user.deleteUser(id).subscribe(response => {
                    if (response) {
                        localStorage.removeItem('firstName');
                        localStorage.removeItem('lastName');
                        localStorage.removeItem('userName');
                        localStorage.removeItem('email');
                        localStorage.removeItem('accountType');
                        localStorage.removeItem('organizationNumber');
                        localStorage.removeItem('id');
                        localStorage.removeItem('userPortalToken');
                        localStorage.removeItem('role');
                        this.router.navigate(['/home']);
                    }
                });
            }

        });
    }
    getnameandphonenum(event:any): void{
        if(event.name == 'Mellannamn'){
            this.mname = event.value
        }else if(event.name == 'PHONENUM'){
            this.phoneno = event.value
        }
    }
    submitOrganization(): void{ 
        // New Organization add from in account
        
        let organizationDetails = [this.organizationName, this.organizationNumber, this.id];
        this.user.addOrganization(organizationDetails).subscribe(res => {
            if (res.msg === 'not found') {
                this.snackBar.open(this.translate.instant('COMMON.NOT_FOUND'),'OK');
            }

        });
    }

    createAdminScreen(): void{
        this.userService.checkOrganizationSsn(this.organizationNumber).subscribe(res =>{
            this.organizationDetails = res.organizationUser[0];
            let width;
            let height;
            this.innerWidth >= 425 ? width = 400 : width = 349;
            this.innerWidth >= 425 ? height = 400 : height = 410;
            if(!res.organizationUser[0]){
                this.dialog.open(DialogComponent, {
                    width: width,
                    height: height,
                    panelClass: 'mat-dialog-container-primary',
                    data: {
                        header: this.translate.instant('USERINPUTS.NOTMATCH'),
                        content: this.translate.instant('USERINPUTS.ENTERNONOTMATCH'),
                        action: 'Ok',
                        component: 'organization'
                    }
                });
            }else{
                this.addOrganization = false;
                this.createAdmin = true;
            }
        });

    }

    createAdminUser(): void{
        this.showLoader = true;
        if (!this.adminSsn) {
            this.snackBar.open(this.translate.instant('CREATE.ENTER_SSN_NUMBER'), 'ok');
            this.showLoader = false;
            return;
        }else{
            // this.authService.initiateBankIdAuth(this.adminSsn, 'current').subscribe(response => {
            this.authService.initiateBankIdAuth(this.adminSsn,0, 'current').subscribe(response => {
                this.processOfValidate();

            });
        }


    }

    processOfValidate(): void {
        this.authService.bankIdAuth(this.adminSsn).subscribe(response => {
            const organizationNo =  this.organizationDetails.organizationNumber;
            const organizationName =  this.organizationDetails.organizationName;
            this.userService.getOrganizationUserDetails(organizationNo, this.adminSsn).subscribe(organizationUser =>
            {
                this.organizationId = organizationUser[0]._id;
            });

            if (response === 'inProgress') {
                setTimeout(() => {
                    this.processOfValidate();
                }, 5000);
            } else if (response.status === 'complete') {
                this.showLoader = false;

                this.userService.updateAsOrganizationUser(organizationNo, organizationName, this.userSsn, this.organizationId).subscribe(updateData => {
                    let width;
                    let height;
                    this.innerWidth >= 425 ? width = 400 : width = 349;
                    this.innerWidth >= 425 ? height = 400 : height = 410;
                    if(!updateData){
                        this.dialog.open(DialogComponent, {
                            width: width,
                            height: height,
                            panelClass: 'mat-dialog-container-primary',
                            data: {
                                header: 'Organisationsanvändare',
                                content: 'Sammankoppling av personnummer och organisation misslyckades',
                                action: 'OK',
                                component: 'organization'
                            }
                        });
                       }else{
                        this.dialog.open(DialogComponent, {
                            width: width,
                            height: height,
                            panelClass: 'mat-dialog-container-primary',
                            data: {
                                header: 'Organisationsanvändare',
                                content: 'Sammankoppling av personnummer och organisation lyckades',
                                action: 'Ok',
                                component: 'done'
                            }
                        });
                     }
                });
            }
             else {
                this.openDialog(this.translate.instant('WARN.WARN_LOGIN_FAILED'), '', 'OK','');
                this.showLoader = false;
            }

        });
    }

}
