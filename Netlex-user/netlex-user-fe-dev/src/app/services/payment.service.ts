import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class PaymentService {
    constructor(private http: HttpClient, private authService: AuthService){}

    // paymentApi(paymentDetail: { amount: any; paymentMethod: string; tax: any; documentTitle: any; documentId: any; masterId: any}): any {
    //     return this.http.post<any>(`${this.authService.getAccessPoint()}Payment`, {paymentDetail});
    // }

    paymentApi(paymentDetail: { amount: any; paymentMethod: string; tax: any; documentTitle: any; documentId: any; masterId: any}): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}Payment`, {paymentDetail});
    }

    getPaymentDetail(paymentDetail: any): any {
        console.log("paymentDetail in api",paymentDetail)

        return this.http.post<any>(`${this.authService.getAccessPoint()}getPayment`, {paymentDetail});
    }

    paymentInfoBySessionId(paymentDetail: any): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}getPayment`, {paymentDetail});
    }


    //// sale //

    getPaymentDetailSale(paymentDetail: any): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}getPaymentsale`, {paymentDetail});
    }

    paymentInfoBySessionIdSale(paymentDetail  ): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}getPaymentsale`, {paymentDetail});
    }

     paymentSaleApi(paymentDetail: {amount: any; paymentMethod: string; tax: any; documentTitle: any; documentId: any; masterId: any; lawyerId: any}): any {
          return this.http.post<any>(`${this.authService.getAccessPoint()}PaymentNew`, {paymentDetail});
    }



 

}
