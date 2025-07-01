import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AnswerTypeService {
    // myGlobalVariable: any;
    myGlobalValue = new BehaviorSubject<string>('default');
    myGlobalVariable = new BehaviorSubject<string>('default');
    constructor(private http: HttpClient, private authService: AuthService){        
        // this.myGlobalVariable = [];
    }
    getActiveAnswerType(): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}activeAnswerType`);
    }
}
