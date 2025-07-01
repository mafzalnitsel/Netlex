
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';

import { AuthService } from './auth.service';

import { Lawyer } from '../models/lawyer.model';

@Injectable()
export class LawyerService {
    constructor(private http: HttpClient, private authService: AuthService) {
    }
    // getUserDetails(id: string): any{
    //     return this.http.get<any>(`${this.authService.getAccessPoint()}user/${id}`);
    // }
    registerlawyer(lawyer: Lawyer): any{
        return this.http.post(`/lawyerpostdata`, lawyer);
    }
    getLawyers(): any {

        console.log("user side lawyer services")
        
        return this.http.get<any>(`${this.authService.getAccessPoint()}getLawyers` );
    }
    getActiveLawyersList(): any {

        console.log("user side lawyer services")
        
        return this.http.get<any>(`${this.authService.getAccessPoint()}getActiveLawyersList` );
    }
    
    getLawyersEmailWithAvailability(email): any {
        const opts = { params: new HttpParams({fromObject: {email: email} })};
        return this.http.get<any>(`${this.authService.getAccessPoint()}getLawyersEmailWithAvailability`, opts);
      }
    
  
    
}
