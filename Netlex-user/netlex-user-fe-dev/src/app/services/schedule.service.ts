import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Lawyer} from "../models/lawyer.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getLawyersList(): any{
    return this.http.get<any>(`${this.authService.getAccessPoint()}getLawyers`);
  }

  getLawyersWithAvailability(selectedDate): any {
    const opts = { params: new HttpParams({fromObject: {selectedDate: selectedDate} })};
    return this.http.get<any>(`${this.authService.getAccessPoint()}getLawyersWithAvailability`, opts);
  }
  getLawyerAvailabilityOnDate(selectedDate,lawyerid): any {
    const opts = { params: new HttpParams({fromObject: {selectedDate: selectedDate,lawyerId: lawyerid} })};
    return this.http.get<any>(`${this.authService.getAccessPoint()}getLawyersWithAvailability`, opts);
  }
  getNetlexOfficeTimings(): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}contentpage`);
  }
  getAllLawyerBusyTimes(selectedDate,lawyerid): any {     
    const opts = { params: new HttpParams({fromObject: {selectedDate: selectedDate,lawyerId: lawyerid} })};
    return this.http.get<any>(`${this.authService.getAccessPoint()}lawyerbusytimes`, opts);
  }
}
