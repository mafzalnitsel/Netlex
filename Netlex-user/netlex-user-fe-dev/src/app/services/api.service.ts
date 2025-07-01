import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

import { BusinessTypeModel } from '../models/businessType.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient, private authService: AuthService) { }
    createUser(user: User, appStatus: string, userDataFromBankID: any): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}createUser`, { user, appStatus, userDataFromBankID });
    }
    getUsersList(pageNum: number, limit: number): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}user?page=${pageNum}&limit=${limit}`);
    }

    registerUser(user: User): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}people/create`, { user });
    }

    getAllUsers(): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}getusers`);
    }

    changePassword(password: string): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}changePassword`, { password });
    }

    getUser(id: string): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}schedulerr/${id}`);
    }

    deleteUser(id: string): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}user/delete/${id}`);
    }

    resetPassword(id: string): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}resetPassword`, { id });
    }

    // uploadFile(formData: FormData): any {
    //     console.log('formDataService', formData);
    //     return this.http.post<any>(`${this.authService.getAccessPoint()}uploadFile`, formData);
    // }

    // getScheduleList(pageNum: number, limit: number): any{
    //     return this.http.get<any>(`${this.authService.getAccessPoint()}scheduleList?page=${pageNum}&limit=${limit}`);
    // }

    updateUser(user: {}, id: string): any {
        return this.http.put<any>(`${this.authService.getAccessPoint()}user/update/${id}`, { user });
    }

    uploadFile(formData: FormData): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}uploadFile`, formData);
    }
    getScheduleList(pageNum: number, limit: number): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}scheduleList?page=${pageNum}&limit=${limit}`);
    }
    getMeetData(id: string): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}schedulerData/${id}`);
    }
    scheduleById(id): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}scheduleById/${id}`);
    }
    
  //-------- OfficeTimes Services-----------
  getOfficeTimes(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint2()}contentPage/${name}`);
  }
    // getDocumentById(id): any{
    //     return this.http.get<any>(`${this.authService.getAccessPoint()}documentById/${id}`);
    // }

    //business type services

    // getBusinessTypeList(value): any {
    //     return this.http.get<any>(`${this.authService.getAccessPoint()}businessTypeall/${value}`);
    // }

    getBusinessTypeList(): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}businessTypeall`);
    }
    getBusinessdataById(id): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}businessTypedetails/${id}`);
    }

    // getQuestionAndAnswer(pageNum: number, limit: number): any {
    //     return this.http.get<any>(`${this.authService.getAccessPoint()}questionAndAnswer?page=${pageNum}&limit=${limit}`);
    // }
    getQuestionAndAnswer(): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}questionAndAnswer`);
    }
    getFindUs(): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}getFindUs`);
    }
    generateSalesPdf(sales: any): any {
        // return this.http.post<any>(`${this.authService.getAccessPoint()}generateSalesPdf`, { sales });
        return this.http.post<any>(`${environment.adminserviceURL}generateSalesPdf`, { sales });
    }
    generatePaymentPdf(payment: any): any {
        return this.http.post<any>(`${environment.adminserviceURL}generatePaymentPdf`, { payment });
    }
}
