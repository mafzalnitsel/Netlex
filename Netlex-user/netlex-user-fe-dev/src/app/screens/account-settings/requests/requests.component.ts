import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-requests',
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
    @Output() settingsBack = new EventEmitter<any>();
    @Input() option: string;

    innerWidth: number;
    requestsList: any;

    constructor(public user: UserService,
                public dialog: MatDialog,
                public translate: TranslateService,
                public router: Router,
                public snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.innerWidth = window.innerWidth;
        this.getRequests();
    }

    getRequests(): any {
        const id = localStorage.getItem('id');
        this.user.getRequests(id).subscribe(result => {
            this.requestsList = result;
        });
    }

    processRequest(event, id): void {
        this.user.processRequest(event, id).subscribe(response => {
            this.getRequests();
        });
    }
}
