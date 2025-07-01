import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import {CategoryModel} from '../models/category.model';

@Injectable()
export class CategoryService {
    constructor(private http: HttpClient, private authService: AuthService){}

    Create(answer: CategoryModel): any{
        return this.http.post<any>(`${this.authService.getAccessPoint()}answerOption/create`, answer);
    }
    getCategory(): any {
        return this.http.get<any>(`${this.authService.getAccessPoint()}getCategory`);
    }
}
