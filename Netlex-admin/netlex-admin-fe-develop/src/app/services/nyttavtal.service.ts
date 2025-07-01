import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class NyttAvtalService {
    constructor(private http: HttpClient, private authService: AuthService) {
    }

    getActiveFields(documentId): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}activeFields/${documentId}`);
    }
    convertLocalToGlobal(documentId): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}convertLocalToGlobal/${documentId}`);
    }
    submitDocument(id: any, document: any, documentTitle: string, documentDescription: string, documentPrice: string, documentTax: string, status: string, attachmentExist: any, agreementType: any): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}documentContent`,
            { id, document, documentTitle, documentDescription, documentPrice, documentTax, status, attachmentExist, agreementType, });
    }

    editDocument(id: any, document: any, documentTitle: string, documentDescription: string, documentPrice: string, documentTax: string, status: string): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}editDocumentContent`,
            { id, document, documentTitle, documentDescription, documentPrice, documentTax, status });
    }

    getDocumentList(): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}documentList`);
    }

    getDocumentListByStatus(value): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}documentListByStatus/${value}`);
    }
    updateDocumentPrice(id: any, documentPrice: any, documentTax: any, status: string): any {
        return this.http.put<any>(`${this.authService.getAccessPoint()}updateDocumentPrice/${id}`, {documentPrice, documentTax, status });
    }
    fetchFieldsByDocumentId(documentTemplateId: any): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}getFieldsByDocumentId`, { documentTemplateId });
    }
    submitFieldAnswer(userID: string, userInput: any, status: any): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}submitAnswer`, { userID, userInput, status });
    }

    fetchFieldById(id: string): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}fieldById/${id}`);
    }

    deleteDocumentById(id): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}deleteDocument`, { id });
    }

    publishDocumentById(id): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}publishDocument`, { id });
    }

    getDocumentById(id): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}documentById/${id}`);
    }

    deleteLocalFieldById(fieldId): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}deleteLocalFieldById`, { fieldId });
    }

    //Upload Videos
    uploadAgreementVideoReq(id): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}documentContent/uploadVideoRequest/${id}`);
    }
    uploadAgreementVideos(formData: FormData): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}documentContent/uploadVideos`, formData);
    }
    //Upload Images
    uploadAgreementHeaderPic(formData: FormData): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}documentContent/uploadAgreementHeaderPic`, formData);
    }
    //Upload Pdf
    uploadAgreementPdf(formData: FormData): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}documentContent/uploadAgreementPdf`, formData);
    }
}
