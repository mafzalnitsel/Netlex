import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from './auth.service';
import {User} from '../models/user.model';

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private authService: AuthService) {
    }
    getUserDetails(id: string): any{
        return this.http.get<any>(`${this.authService.getAccessPoint()}user/${id}`);
    }
    register(user: User): any{
        return this.http.post(`/users/register`, user);
    }
}
