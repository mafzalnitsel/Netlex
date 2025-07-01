import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class clientsDetailsservice {
    constructor(private http: HttpClient, private authService: AuthService) { }

    getclientsDetailstoSsn(toSsn: string): any {
 
             return this.http.get<any>(`${this.authService.getAccessPoint()}getclientsDetailstoSsn/${toSsn}`);
          }
          getclientsDetailstossnto(toSsn: string): any {
            return this.http.get<any>(`${this.authService.getAccessPoint()}getclientsDetailstossnto/${toSsn}`);
         }
           
    getclientsDetailstoEmail(toEmail: string): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}getclientsDetailstoEmail/${toEmail}`);
    }
    getclientsDetailstoPhoneNumber(toPhoneNumber: string): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}getclientsDetailstoPhoneNumber/${toPhoneNumber}`);
    }

 
}
