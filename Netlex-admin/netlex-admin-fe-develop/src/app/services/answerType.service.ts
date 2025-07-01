import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AnswerTypeService {
    
    constructor(private http: HttpClient, private authService: AuthService){}

    getActiveAnswerType(): any {

        console.log("user side answertype services")
        
        
        
        

        return this.http.get<any>(`${this.authService.getAccessPoint()}activeAnswerType` );
    }
}
