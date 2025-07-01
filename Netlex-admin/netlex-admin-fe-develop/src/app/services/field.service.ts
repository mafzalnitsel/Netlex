import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Field } from '../models/field.model';

@Injectable()
export class FieldService {
    constructor(private http: HttpClient, private authService: AuthService) { }

    Create(field: Field): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}field/save`, field);
    }

    getFieldValue(value: string): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}field/${value}`);
    }

    update(field: Field): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}field/update`, field);
    }

    unsavedDocumentFieldsDelete(fieldsId): any {
        return this.http.post<any>(`${this.authService.getAccessPoint()}deleteByFieldsId`, { fieldsId });
    }

    fieldCheck(fieldName: string, documentId, fieldType: string): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}fieldCheck/${fieldName}/${documentId}/${fieldType}`);
    }
    //New Id Api Routes
    getActiveFieldsList(pageNum: number, limit: number): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}getActiveFieldsList?page=${pageNum}&limit=${limit}`);
    }
}
