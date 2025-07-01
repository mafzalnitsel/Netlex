import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AnswerOptionService {
    constructor(private http: HttpClient, private authService: AuthService){}

    // create(answer: AnswerOptionModel): any{
    //     return this.http.post<any>(`${this.authService.getAccessPoint()}answerOption/create`, answer);
    // }
    //
    // getActiveAnswerOption(fieldId: string): any {
    //     return this.http.get<any>(`${this.authService.getAccessPoint()}getAnswer/${fieldId}`);
    // }
    // deleteAnswer(answer: AnswerOptionModel): any{
    //     return this.http.delete<any>(`${this.authService.getAccessPoint()}answerOption/${answer}`);
    // }
}
