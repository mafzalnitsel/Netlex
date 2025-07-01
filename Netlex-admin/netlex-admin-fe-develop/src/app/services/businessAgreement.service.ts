import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable()
export class BusinessAgreementsService {
    constructor(private http: HttpClient, private authService: AuthService) {
    }

    submitBusinessAgreement(id: any, documentTitle: string, documentDescription: string, documentPrice: string, documentTax: string, status: string): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}businessAgreements/save`,
            {id, documentTitle, documentDescription, documentPrice, documentTax, status});
    }

    getbusinessAgreementsListByStatus(value): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}businessAgreementsListByStatus/${value}`);
    }

    getBusinessAgreementById(id): any{
        return this.http.get<any>(`${this.authService.getAccessPoint()}getBusinessAgreementById/${id}`);
    }

    deleteBusinessAgreementsById(id): any{
        return this.http.post<any>(`${this.authService.getAccessPoint()}deleteBusinessAgreement`, {id});
    }

    //Upload Pdf
    uploadBusimessAgreementPdf(formData: FormData): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}businessAgreements/uploadBusimessAgreementPdf`, formData);
    }
    //Upload Videos
    uploadAgreementVideoReq(id): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}documentContent/uploadVideoRequest/${id}`);
    }
    uploadAgreementVideos(formData: FormData): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}documentContent/uploadVideos`, formData);
    }
    //Upload Image
    uploadAgreementHeaderPic(formData: FormData): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}documentContent/uploadAgreementHeaderPic`, formData);
    }




    // submitDocument(id: any, document: any, documentTitle: string, documentDescription: string, documentPrice: string, documentTax: string, status: string): any {
    //     return this.http.post<any>(`${this.authService.getAccessPoint()}documentContent`,
    //         {id, document, documentTitle, documentDescription, documentPrice, documentTax, status});
    // }

    // editDocument(id: any, document: any, documentTitle: string, documentDescription: string,documentPrice: string, documentTax: string, status: string): any {
    //     return this.http.post<any>(`${this.authService.getAccessPoint()}editDocumentContent`,
    //         {id, document, documentTitle, documentDescription, documentPrice, documentTax, status});
    // }

    // deleteLocalFieldById(fieldId): any{
    //     return this.http.post<any>(`${this.authService.getAccessPoint()}deleteLocalFieldById`, {fieldId});
    // }

    // getActiveFields(documentId): any {
    //     return this.http.get<any>(`${this.authService.getAccessPoint()}activeFields/${documentId}`);
    // }

    // getDocumentList(): any {
    //     return this.http.get<any>(`${this.authService.getAccessPoint()}documentList`);
    // }

    // fetchFieldsByDocumentId(documentTemplateId: any): any {
    //     return this.http.post<any>(`${this.authService.getAccessPoint()}getFieldsByDocumentId`, {documentTemplateId});
    // }

    // submitFieldAnswer(userID: string,userInput: any,status: any): any {
    //     return this.http.post<any>(`${this.authService.getAccessPoint()}submitAnswer`, {userID,userInput, status});
    // }

    // fetchFieldById(id: string): any{
    //     return this.http.get<any>(`${this.authService.getAccessPoint()}fieldById/${id}`);
    // }

    // publishDocumentById(id): any{
    //     return this.http.post<any>(`${this.authService.getAccessPoint()}publishDocument`, {id});
    // }

}
