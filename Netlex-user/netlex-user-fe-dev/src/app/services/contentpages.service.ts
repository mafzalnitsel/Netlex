import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class contentpagesService {
    constructor(private http: HttpClient, private authService: AuthService) { }

    // getContentdPages(name:any): any {
    //     return this.http.get<any>(`${this.authService.getAccessPoint()}contentPage`,name);
    // }
    getContentPages(name: string): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}contentPage/${name}`);
    }
    getCheckPrivatePerson(): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}CheckDataPrivatePerson`);
    }
    getCheckDataForetag(): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}CheckDataForetag`);
    }
    getAboutUs(): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}aboutUs`);
    }
    getaboutus(): any {

        return this.http.get<any>(`${this.authService.getAccessPoint()}getaboutus`);

    }
    getActiveshowLawyerToUser(): any {

        return this.http.get<any>(`${this.authService.getAccessPoint()}getActiveshowLawyerToUser`);

    }
    getActiveshowLawyerToUserList(pageNum: number, limit: number) {
        return this.http.get<any>(`${this.authService.getAccessPoint()}getActiveshowLawyerToUserList?page=${pageNum}&limit=${limit}`);
    }
    getLawyerById(id: string): any {

        return this.http.get<any>(`${this.authService.getAccessPoint()}getLawyerById/${id}`);

    }

}
