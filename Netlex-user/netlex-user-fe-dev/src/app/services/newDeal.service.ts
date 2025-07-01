import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable()
export class NewDealService {
    [x: string]: any;
    constructor(private http: HttpClient, private authService: AuthService) {
    }

    getActiveFields(documentId): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}activeFields/${documentId}`);
    }

    submitDocument(id: any, document: any, documentTitle: string, documentDescription: string, status: string): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}documentContent`,
            {id, document, documentTitle, documentDescription, status});
    }

    editDocument(id: any, document: any, documentTitle: string, documentDescription: string, status: string): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}editDocumentContent`,
            {id, document, documentTitle, documentDescription, status});
    }

    getDocumentList(): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}documentList`);
    }

    getDocumentListByStatus(value,filterAgreement): any {
        // return this.http.get<any>(`${this.authService.getAccessPoint()}documentListByStatus/${value}&${filterAgreement}`);
        return this.http.get<any>(`${this.authService.getAccessPoint()}documentListByStatus?value=${value}&filterAgreement=${filterAgreement}`);
    }
    getBusinessAgreementsListByStatus(value): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}businessAgreementsListByStatus/${value}`);
    }
    getBusinessAgreementById(id): any{
        return this.http.get<any>(`${this.authService.getAccessPoint()}businessAgreementById/${id}`);
    }
    getDraftDocumentListByUserId(userId): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}getExistDocument`, {userId});
    }
    // removeDraft(userId): any{
    //     return this.http.get<any>(`${this.authService.getAccessPoint()}deleteDocumentCancelledByUser` ,{userId});
    //   }

    // Agreement Requests Routes(JavskontrollAnswers)
    saveAgreementRequest(agreementRequestBody: any): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}agreementRequest/create`, agreementRequestBody);
    }
    getAgreeementRequestByUserId(userId: string,documentId: string,): any {
        // return this.http.post<any>(`${this.authService.getAccessPoint()}getAgreeementRequestByUserId`, {userId,documentId});
        return this.http.get<any>(`${this.authService.getAccessPoint()}getAgreeementRequestByUserId?userId=${userId}&documentId=${documentId}`);
    }
    getAllClientsDetailsQuestion(): any {
        // return this.http.post<any>(`${this.authService.getAccessPoint()}getAgreeementRequestByUserId`, {userId,documentId});
        return this.http.get<any>(`${this.authService.getAccessPoint()}getAllClientsDetailsQuestion`);
    }
    getLoggedInUserData(userId: string): any {
        // return this.http.post<any>(`${this.authService.getAccessPoint()}getAgreeementRequestByUserId`, {userId,documentId});
        return this.http.get<any>(`${this.authService.getAccessPoint()}user/${userId}`);
    }
    getDocumentAnswersByDocumentId(documentTemplateId): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}getDocumentDetailsByDocumentId/${documentTemplateId}`);
    }

    fetchFieldsByDocumentId(documentTemplateId: any): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}getFieldsByDocumentId`, {documentTemplateId});
    }
    postSaveLaterAgrement(requestagreementid:string,userID: string,userInput: any,status: any): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}submitAnswer`, {requestagreementid,userID,userInput, status});
    }
    submitFieldAnswer(userID: string,userInput: any,status: any): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}submitAnswer`, {userID,userInput, status});
    }
    submitFieldAnswerNew(userID: string,userInput: any,status: any,purchaseRequest: any): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}submitAnswer`, {userID,userInput, status,purchaseRequest});
    }
    updateAnswer(userID: string,userInput: any,status: any, documentId: any, paymentId: any, masterId: any,purchaseRequest: any): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}updateAnswer`, {userID,userInput, status, documentId, paymentId, masterId,purchaseRequest});
    }
    updateAgreementPaymentStatus(paymentId: string, masterId: string): any {
        console.log("Api's Component")
        console.table([ { name: "position", value: "Api's Component" },{ name: "masterId", value: masterId },
        { name: "paymentId", value: paymentId },]);
        return this.http.post<any>(`${this.authService.getAccessPoint()}updateAgreementPaymentStatus`, {paymentId, masterId});
    }
    updateBusinessAgreementPaymentStatus(paymentId: string, masterId: string,documentId: string,userLoggedInId: string): any {
        console.log("Api's Component")
        console.table([{ name: "position", value: "Api's Component" },{ name: "masterId", value: masterId },
        { name: "paymentId", value: paymentId }, { name: "documentId", value: documentId }, { name: "userLoggedInId", value: userLoggedInId },]);
        return this.http.post<any>(`${this.authService.getAccessPoint()}updateAgreementPaymentStatus`, {paymentId, masterId,documentId,userLoggedInId});
    }
    
    
    updateschedulePaymentIspaid(schedule: {}, id: string): any{

        return this.http.put<any>(`${this.authService.getAccessPoint()}ScheduleupdateIspaid/${id}`, {schedule});
    
      }


    submitFieldToPdf(userInput: any): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}submitToPdf`, {userInput});
    }
    saveForLater(userID: string,userInput: any):any{
        return this.http.post<any>(`${this.authService.getAccessPoint()}saveForLater`, {userID,userInput});

    }

    fetchFieldById(id: string): any{
        return this.http.get<any>(`${this.authService.getAccessPoint()}fieldById/${id}`);
    }

    deleteDocumentById(id): any{
        return this.http.post<any>(`${this.authService.getAccessPoint()}deleteDocument`, {id});
    }

    publishDocumentById(id): any{
        return this.http.post<any>(`${this.authService.getAccessPoint()}publishDocument`, {id});
    }

    getDocumentById(id): any{
        return this.http.get<any>(`${this.authService.getAccessPoint()}documentById/${id}`);
    }

    deleteLocalFieldById(fieldId): any{
        return this.http.post<any>(`${this.authService.getAccessPoint()}deleteLocalFieldById`, {fieldId});
    }

    getMyPurchaseByUserId(userId): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}getMyPurchase`, {userId});
    }

    getMeetingSalesByUserId(userId): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}meetingSales`, {userId});
    }

    fetchExistDocumentDetails(documentTemplateId): any{
        return this.http.get<any>(`${this.authService.getAccessPoint()}getDocumentFieldsId/${documentTemplateId}`);
    }

    getAnswerByMasterId(masterId): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}getAnswerByMasterId/${masterId}`);
    }

    getPdfBuffer(document: any, master_id: any): any{
        return this.http.post<any>(`${this.authService.getAccessPoint()}getPdfBuffer`, {document, master_id});

    }
    getPdfBuffer2(document: any, master_id: any): any{
        return this.http.post<any>(`${this.authService.getAccessPoint()}getPdfBuffer2`, {document, master_id});

    }
    deleteDocumentCancelledByUser(master_id: any): any{
        return this.http.post<any>(`${this.authService.getAccessPoint()}deleteDocumentCancelledByUser`, {master_id});

    }

}
