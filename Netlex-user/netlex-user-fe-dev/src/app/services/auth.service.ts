import {User} from '../models/user.model';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Login} from '../models/login.model';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Scheduler} from '../models/scheduler.model';
import {UtilService} from './util.service';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient,
                private router: Router,
                private util: UtilService) {
    }

    initiateBankIdAuth(ssn: string, numOfQRCode: number, appStatus: string): any {
        return this.http.post<any>(`${this.getAccessPoint()}initiateBankIdAuth`, {ssn,numOfQRCode, appStatus});
    }
    initiateBankIdAuthForSignUp(ssn: string, numOfQRCode: number, appStatus: string): any {
        return this.http.post<any>(`${this.getAccessPoint()}initiateBankIdAuthForSignUp`, {ssn,numOfQRCode, appStatus});
    }
    collectBankIdAuth(orderRef: string): any {
        return this.http.post<any>(`${this.getAccessPoint()}collectBankIdAuth`, {orderRef});
    }
    bankIdAuth(ssn: string): any {
        return this.http.post<any>(`${this.getAccessPoint()}bankIdAuth`, {ssn});
    }
    bankIdAuthLogin(ssn: string,userDataFromBankID: any): any {
        return this.http.post<any>(`${this.getAccessPoint()}bankIdAuthLogin`, {ssn,userDataFromBankID});
    }
    
    login(user: Login): any {
        return this.http.post<any>(`${this.getAccessPoint()}auth/login`, user);
    }

    isUserLoggedIn(): any {
        return !!localStorage.getItem('userPortalToken');
    }

    registerToken(token: string): any {
        localStorage.setItem('userPortalToken', token);
    }

    getAccessPoint(): string {
        return environment.serviceURL;
    }
    getAccessPoint2(): string {
        return environment.adminserviceURL;
    }
    getRole(): string {
        return localStorage.getItem('roles');
    }

    getToken(): string {
        return localStorage.getItem('userPortalToken');
    }

    generateNewPassword(email: string): any {
        return this.http.post<any>(`${this.getAccessPoint()}auth/forgotPassword`, {email});
    }

    schedule(data): any {
        return this.http.post<any>(`${this.getAccessPoint()}schedule`, data);
    }
    uploadMeetingAttachment(formData: FormData): any {
        // return this.http.post<any>(`${this.getAccessPoint()}uploadMeetingAttachment`, formData);
        return this.http.post<any>(`${environment.adminserviceURL}uploadMeetingAttachment`, formData);
    }
    scheduleapp(data): any {
        return this.http.post<any>(`${this.getAccessPoint()}scheduleapp`, data);
    }
    UpdateSchedule(data): any {
        return this.http.post<any>(`${this.getAccessPoint()}UpdateSchedule`, data);
    }
    
    getId(): string {
        return localStorage.getItem('id');
    }

    isWorker(): boolean {
        return localStorage.getItem('roles') === 'worker';
    }

    getEmail(): string {
        return localStorage.getItem('email');
    }

    getFirst(): string {
        return localStorage.getItem('firstName');
    }

    getLast(): string {
        return localStorage.getItem('lastName');
    }

    getUser(): string {
        return localStorage.getItem('userName');
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('userName');
        localStorage.removeItem('email');
        localStorage.removeItem('id');
        localStorage.removeItem('roles');
        localStorage.removeItem('userPortalToken');
        // this.router.navigate(['/home']);
        this.router.navigate(['/']);
    }

    isAdmin(): any {
        return localStorage.getItem('roles') === 'Administration';
    }

}
