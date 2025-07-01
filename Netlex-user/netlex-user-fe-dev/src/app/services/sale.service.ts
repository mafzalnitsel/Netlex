import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class SaleService {
    constructor(private http: HttpClient, private authService: AuthService){}

    // paymentApi(paymentDetail: { amount: any; paymentMethod: string; tax: any; documentTitle: any; documentId: any; masterId: any}): any {
    //     return this.http.post<any>(`${this.authService.getAccessPoint()}Payment`, {paymentDetail});
    // }

    paymentApi(paymentDetail: { amount: any; paymentMethod: string; tax: any; documentTitle: any; documentId: any; masterId: any}): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}salePayment`, {paymentDetail});
    }

    getPaymentDetail(paymentDetail: any): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}SalegetPayment`, {paymentDetail});
    }

    paymentInfoBySessionId(paymentDetail: any): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}SalegetPayment`, {paymentDetail});
    }

    paymentbusinessApi(paymentDetail: {amount: any; paymentMethod: string; tax: any; documentTitle: any; documentId: any; masterId: any}): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}salePayment`, {paymentDetail});
    }

   
    

   


}
