import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from './auth.service';
import {User} from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserService {
    createAgreement = new BehaviorSubject<string>('default');


    constructor(private http: HttpClient, private authService: AuthService) {
    }


    getUserDetails(id: string): any{
        return this.http.get<any>(`${this.authService.getAccessPoint()}user/${id}`);
    }
    register(user: User): any{
        return this.http.post(`/users/register`, user);
    }
    editUser(userDetails): any{
        return this.http.post(`${this.authService.getAccessPoint()}user/update`, {userDetails});
    }

    updateOrAddNotRegisterUser(userDetails): any{
        return this.http.post(`${this.authService.getAccessPoint()}createOrUpdateNotRegisterUser`,
            {userDetails});
    }

    deleteUser(id): any {
        return this.http.post(`${this.authService.getAccessPoint()}user/delete`, {id});
    }

    addOrganization(organization): any {
        return this.http.post(`${this.authService.getAccessPoint()}user/addOrganization`, {organization});
    }

    getRequests(id: string): any {
        return this.http.get(`${this.authService.getAccessPoint()}user/requests/${id}`);
    }

    processRequest(action: string, id: string): any{
        return this.http.post(`${this.authService.getAccessPoint()}user/processRequests`, {action, id});
    }

    createAdmin(ssn: string,adminSsn: string, adminName: string): any{
        return this.http.post(`${this.authService.getAccessPoint()}user/createAdmin`, {ssn, adminSsn, adminName});
    }

    checkOrganizationSsn(organizationNo: string):any{

        return this.http.post(`${this.authService.getAccessPoint()}checkOrganisationSsn`, {organizationNo});
    }

    updateAsOrganizationUser(organizationNo: string, organizationName: string, ssn: string, organizationId: string): any{
        return this.http.post(`${this.authService.getAccessPoint()}updateAsOrganizationUser`,
            {organizationNo,organizationName, ssn, organizationId});

    }

    getOrganizationUserDetails(organizationNo: string, ssn: string): any{
        return this.http.post(`${this.authService.getAccessPoint()}getOrganizationUserDetails`,
            {organizationNo, ssn});
    }
}
