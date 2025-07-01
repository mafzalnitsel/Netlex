


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { Lawyer } from '../models/lawyer.model';
import { BusinessTypeModel } from '../models/businessType.model';
import { ClientsDetailsModel } from '../models/clientsDetails.model';
import { QuestionAndAnswer } from '../models/question-and-answer';
import { Role } from '../models/role';
import { RoleAction } from '../models/RoleAction.model';
import { ContentPage } from '../models/contentpage.model';
import { AboutUs } from '../models/about-us.model';
import { Colors } from 'src/app/models/colors';
import { FindUs } from '../models/find-us';





@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;
  getSalesList(pageNum: number, limit: number, PaymentMethod: string,
    status: string, fromDate: string, toDate: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}getSalesList?page=${pageNum}&limit=${limit}&paymentMethod=${PaymentMethod}&status=${status}&fromDate=${fromDate}&toDate=${toDate}`);
  }
  getSalesById(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}sales/${id}`);
  }
  // generateSalesPdf(id: string): any {
  //   return this.http.get<any>(`${this.authService.getAccessPoint()}generateSalesPdf/${id}`);
  // }
  generateSalesPdf(sales: any): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}generateSalesPdf`, { sales });
  }
  getLawyerSalesList(pageNum: number, limit: number, Lawyerid: string, Role: string) {
    return this.http.get<any>(`${this.authService.getAccessPoint()}getLawyerSalesList?page=${pageNum}&limit=${limit}&Lawyerid=${Lawyerid} &Role=${Role}`);
  }
  getSalesByDate(startDate: string,
    endDate: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}getSalesByDates?startDate=${startDate}&endDate=${endDate}`);
  }
  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsersList(pageNum: number, limit: number, userType: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}user?page=${pageNum}&limit=${limit}&userType=${userType}`);
  }
  getUsersByType(pageNum: number, limit: number): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}user?page=${pageNum}&limit=${limit}`);
  }
  registerUser(user: User): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}people/create`, { user });
  }

  getAllUsers(): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}getAllUsers`);
  }

  changePassword(password: string): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}changePassword`, { password });
  }
  getUser(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}user/${id}`);
  }
  deleteUser(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}user/delete/${id}`);
  }
  resetPassword(id: string): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}resetPassword`, { id });
  }

  uploadProfilePic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}user/uploadPic`, formData);
  }

  updateUser(user: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}user/update/${id}`, { user });
  }
  //Client Users Services
  // getUserfeList(pageNum: number, limit: number): any {
  //   return this.http.get<any>(`${this.authService.getAccessPoint()}userfe?page=${pageNum}&limit=${limit}`);
  // }
  getUserfeList(pageNum: number, limit: number): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}userfe?page=${pageNum}&limit=${limit}`);
  }
  getUserfeById(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}userfe/${id}`);
  }
  getNewUserfeList(pageNum: number, limit: number, status: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}userfe?page=${pageNum}&limit=${limit}&status=${status}`);
  }
  getAllNewFeUsers(status: string): any {
    // return this.http.get<any>(`${this.authService.getAccessPoint()}userfe/getAll?status=${status}`);
    return this.http.get<any>(`${this.authService.getAccessPoint()}getAll/userfe?status=${status}`);
  }
  updateUserFeStatus(user: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}userfe/update/${id}`, { user });
  }
  updateSchedule(data: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}updateSchedule/${id}`, { data });
  }
  
  uploadFile(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}uploadFile`, formData);
  }
  getScheduleList(pageNum: number, limit: number): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}scheduleList?page=${pageNum}&limit=${limit}`);
  }
  getScheduleLawyerList(pageNum: number, limit: number, Lawyerid: string, Role: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}scheduleLawyerList?page=${pageNum}&limit=${limit}&Lawyerid=${Lawyerid} &Role=${Role}`);
  }
  getMeetData(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}schedulerData/${id}`);
  }
  //GEt Schedule data for Schedule Meeting Calendar
  getSchedule(): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}getSchedule`);
  }
  //Payments Services
  getPaymentList(pageNum: number, limit: number, PaymentMethod: string,
    status: string, fromDate: string, toDate: string, paymentAgreementType: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}paymentlist?page=${pageNum}&limit=${limit}&paymentMethod=${PaymentMethod}&status=${status}&fromDate=${fromDate}&toDate=${toDate}&paymentAgreementType=${paymentAgreementType}`);
  }

  getPayment(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}payment/${id}`);
  }
  generatePaymentPdf(payment: any): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}generatePaymentPdf`, { payment });
  }
  //Clients Details Services
  getClientsDetailsList(pageNum: number, limit: number): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}clientsDetails?page=${pageNum}&limit=${limit}`);
  }
  getClientsDetails(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}clientsDetails/${id}`);
  }

  saveClientsDetails(clientsDetails: ClientsDetailsModel): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}clientsDetails/create`, clientsDetails);
  }
  deleteClientsDetails(id: string): any {

    return this.http.get<any>(`${this.authService.getAccessPoint()}clientsDetails/delete/${id}`);

  }

  updateClientsDetails(clientsDetails: {}, id: string): any {

    return this.http.put<any>(`${this.authService.getAccessPoint()}clientsDetails/update/${id}`, { clientsDetails });

  }
  //-------------ClientDetailsQuestion Services--------------
  getClientsDetailsQuestionList(pageNum: number, limit: number): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}getClientsDetailsQuestionList?page=${pageNum}&limit=${limit}`);
  }
  getClientsDetailsQuestionById(id): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}getClientsDetailsQuestionById/${id}`);
  }
  createClientsDetailsQuestion(questionDetails: any): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}clientsDetailsQuestion/create`, { questionDetails });
  }
  updateClientsDetailsQuestion(questionDetails: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}clientsDetailsQuestion/update/${id}`, { questionDetails });
  }
  deleteClientsDetailsQuestion(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}clientsDetailsQuestion/delete/${id}`);
  }
  getAllClientsDetailsQuestion(): any {
    // return this.http.post<any>(`${this.authService.getAccessPoint()}getAgreeementRequestByUserId`, {userId,documentId});
    return this.http.get<any>(`${this.authService.getAccessPoint()}getAllClientsDetailsQuestion`);
  }
  // getClientsDetailsQuestion(): any {
  //   return this.http.get<any>(`${this.authService.getAccessPoint()}getColors/`);
  // }
  //Client Details Agreement Requests(Javskontroll Answers)
  getAgreeementRequestsList(pageNum: number, limit: number, status: string): any {
    // return this.http.get<any>(`${this.authService.getAccessPoint()}getAgreeementRequestsList?userId=${userId}&documentId=${documentId}`);
    return this.http.get<any>(`${this.authService.getAccessPoint()}getAgreeementRequestsList?page=${pageNum}&limit=${limit}&status=${status}`);
  }
  getAgreeementRequest(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}getAgreeementRequest/${id}`);
  }
  // getClientsDetailByData(data: any): any {
  //   return this.http.post<any>(`${this.authService.getAccessPoint()}getClientsDetailByData`,{data});
  // }
  getClientsDetailByData(findData: any): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}getClientsDetailByData`, { findData });
  }
  // updateAgreeementRequests(questionDetails: {}, id: string): any {
  //   return this.http.put<any>(`${this.authService.getAccessPoint()}agreementRequest/update/${id}`, { questionDetails });
  // }
  updateAgreeementRequests(data: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}agreementRequest/update/${id}`, { data });
  }
  //---------- Lawyer Busy Time Services  ----------
  getAllLawyerBusyTimes(lawyerId: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}getAllLawyerBusyTimes?lawyerId=${lawyerId}`);
  }
  getLawyerBusyTimeById(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}getLawyerBusyTime/${id}`);
  }
  getLawyerBusyTime(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}getLawyerBusyTimeByLawyerId/${id}`);
  }
  createLawyerBusyTime(lawyerBusyTime: any): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}lawyerBusyTime/create`, { lawyerBusyTime });
  }
  updateLawyerBusyTime(lawyerBusyTime: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}lawyerBusyTime/update/${id}`, { lawyerBusyTime });
  }
  deleteLawyerBusyTime(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}lawyerBusyTime/delete/${id}`);
  }
  //-------- OfficeTimes Services-----------
  getOfficeTimes(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}contentPage/${name}`);
  }
  updateOfficeTimes(contentPages: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}contentPage/update/${id}`, { contentPages });
  }
  //-------------Colors Services--------------
  getColorsList(pageNum: number, limit: number): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}colors?page=${pageNum}&limit=${limit}`);
  }
  getColors(id): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}colors/view/${id}`);
  }
  createColors(colors: Colors): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}colors/create`, { colors });
  }
  updateColors(colors: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}colors/update/${id}`, { colors });
  }
  deleteColors(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}colors/delete/${id}`);
  }
  getAllColors(): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}getColors/`);
  }

  //------------Find Us Services----------------
  getFindUsList(pageNum: number, limit: number): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}findUs?page=${pageNum}&limit=${limit}`);
  }
  getFindUs(id): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}findUs/view/${id}`);
  }

  createFindUs(findUs: FindUs): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}findUs/create`, { findUs });
  }

  deleteFindUs(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}findUs/delete/${id}`);
  }

  updateFindUs(findUs: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}findUs/update/${id}`, { findUs });
  }
  //---------QuestionAndAnswer Services--------- 
  getQuestionAndAnswerList(pageNum: number, limit: number): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}questionAndAnswer?page=${pageNum}&limit=${limit}`);
  }
  getQuestionAndAnswer(id): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}questionAndAnswer/view/${id}`);
  }

  createQuestionAndAnswer(questionAndAnswer: QuestionAndAnswer): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}questionAndAnswer/create`, { questionAndAnswer });
  }

  deleteQuestionAndAnswer(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}questionAndAnswer/delete/${id}`);
  }

  updateQuestionAndAnswer(questionAndAnswer: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}questionAndAnswer/update/${id}`, { questionAndAnswer });
  }
  //-------- QuestionAndAnswer Heading&Description Services-----------
  getHeadingDescOfQA(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}contentPage/${name}`);
  }
  updateHeadingDescOfQA(contentPages: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}contentPage/update/${id}`, { contentPages });
  }
  //-------------  Ask Agreement Questions First Services -----------------
  getAskAgreementsQuestionsFirst(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}contentPage/${name}`);
  }
  updateAskAgreementsQuestionsFirst(contentPages: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}contentPage/update/${id}`, { contentPages });
  }
  //------------------- Content Pages Services -------------------
  getHome(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}contentPage/${name}`);
  }
  updateContentPages(contentPages: {}, id: string): any {

    return this.http.put<any>(`${this.authService.getAccessPoint()}contentPage/update/${id}`, { contentPages });
  }
  uploadHomeHeaderPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}home/uploadHomePic`, formData);
  }
  uploadHomeHeaderPicMob(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}home/uploadHomePicMob`, formData);
  }
  uploadIntroPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}home/uploadIntroPic`, formData);
  }
  uploadServicesBgPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}home/uploadServicesBgPic`, formData);
  }
  uploadFooterBgPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}home/uploadFooterBgPic`, formData);
  }
  uploadSelectAgreementPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}home/uploadSelectAgreementPic`, formData);
  }
  uploadFillAgreementPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}home/uploadFillAgreementPic`, formData);
  }
  uploadPurchasePic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}home/uploadPurchasePic`, formData);
  }
  uploadAvailabilityPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}home/uploadAvailabilityPic`, formData);
  }
  //All Header Images Services
  getAllHeaders(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}contentPage/${name}`);
  }
  publishHeaderPics(publishData: {}, id: string): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}heroBanners/publishHeaderPics/${id}`, { publishData });
  }
  uploadAgreementHeaderPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}heroBanners/uploadAgreementHeaderPic`, formData);
  }
  uploadAgreementConfirmHeaderPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}heroBanners/uploadAgreementConfirmHeaderPic`, formData);
  }
  uploadLawyerHeaderPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}heroBanners/uploadLawyerHeaderPic`, formData);
  }
  uploadSchedulerHeaderPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}heroBanners/uploadSchedulerHeaderPic`, formData);
  }
  uploadQuestionAnswerHeaderPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}heroBanners/uploadQuestionAnswerHeaderPic`, formData);
  }
  uploadAboutUsHeaderPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}heroBanners/uploadAboutUsHeaderPic`, formData);
  }
  uploadFindUsHeaderPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}heroBanners/uploadFindUsHeaderPic`, formData);
  }
  uploadBusinessHeaderPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}heroBanners/uploadBusinessHeaderPic`, formData);
  }
  uploadTermsConditionsHeaderPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}heroBanners/uploadTermsConditionsHeaderPic`, formData);
  }
  uploadPrivacyPolicyHeaderPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}heroBanners/uploadPrivacyPolicyHeaderPic`, formData);
  }
  //About Us Services
  getAboutUsList(pageNum: number, limit: number): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}aboutUs?page=${pageNum}&limit=${limit}`);
  }
  getAboutUs(id): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}aboutUs/view/${id}`);
  }

  createAboutUs(aboutUs: AboutUs): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}aboutUs/create`, { aboutUs });
  }

  deleteAboutUs(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}aboutUs/delete/${id}`);
  }

  updateAboutUs(aboutUs: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}aboutUs/update/${id}`, { aboutUs });
  }

  getAboutUsHeader(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}contentPage/${name}`);
  }
  updateAboutUsHeader(contentPages: {}, id: string): any {

    return this.http.put<any>(`${this.authService.getAccessPoint()}contentPage/update/${id}`, { contentPages });
  }
  //-------- TermsAndConditions Services-----------
  getActivityAreasContents(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}contentPage/${name}`);
  }
  updatetActivityAreasContents(contentPages: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}contentPage/update/${id}`, { contentPages });
  }
  //-------- TermsAndConditions Services-----------
  getTermsAndConditions(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}contentPage/${name}`);
  }
  updateTermsAndConditions(contentPages: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}contentPage/update/${id}`, { contentPages });
  }
  //-------- PrivacyAndPolicy Services-----------
  getPrivacyAndPolicy(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}contentPage/${name}`);
  }
  updatePrivacyAndPolicy(contentPages: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}contentPage/update/${id}`, { contentPages });
  }
  //--------ActivityAreaForLawyer Services--------
  getActivityAreaForLawyer(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}contentPage/${name}`);
  }
  updateActivityAreaForLawyer(contentPages: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}contentPage/update/${id}`, { contentPages });
  }
  //--------QuestionsCatergoryOptions Services--------
  getQuestionsCatergoryOptions(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}contentPage/${name}`);
  }
  updateQuestionsCatergoryOptions(contentPages: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}contentPage/update/${id}`, { contentPages });
  }
  //Email Configuration Serivces
  getEmailConfiguration(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}emailConfiguration/${name}`);
  }
  updateEmailConfiguration(emailConfiguration: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}emailConfiguration/update/${id}`, { emailConfiguration });
  }

  //Payments Configuration Serivces
  getKlarnaConfiguration(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}paymentsConfiguration/${name}`);
  }
  updateKlarnaConfiguration(paymentsConfiguration: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}paymentsConfiguration/update/${id}`, { paymentsConfiguration });
  }
  getStripeConfiguration(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}paymentsConfiguration/${name}`);
  }
  updateStripeConfiguration(paymentsConfiguration: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}paymentsConfiguration/update/${id}`, { paymentsConfiguration });
  }
  getSwishConfiguration(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}paymentsConfiguration/${name}`);
  }
  updateSwishConfiguration(paymentsConfiguration: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}paymentsConfiguration/update/${id}`, { paymentsConfiguration });
  }
  uploadSwishPemCertFile(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}paymentsConfiguration/uploadSwishPemCert`, formData);
  }
  uploadSwishKeyCertFile(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}paymentsConfiguration/uploadSwishKeyCert`, formData);
  }
  uploadSwishPemRootFile(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}paymentsConfiguration/uploadSwishPemRoot`, formData);
  }
  //-------------BankID Configuration Routes------------------
  getBankIdConfiguration(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}paymentsConfiguration/${name}`);
  }
  updateBankIdConfiguration(paymentsConfiguration: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}paymentsConfiguration/update/${id}`, { paymentsConfiguration });
  }
  // uploadBankIdFPCertFile(formData: FormData): any {
  //   return this.http.post<any>(`${this.authService.getAccessPoint()}bankIdConfiguration/uploadSwishPemCert`, formData);
  // }
  //EmailLog Routes
  getEmailLogList(pageNum: number, limit: number): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}emailLog?page=${pageNum}&limit=${limit}`);
  }
  viewEmailLog(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}emailLog/view/${id}`);
  }
  updateEmailLog(emailLog: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}emailLog/update/${id}`, { emailLog });
  }
  resendEmail(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}resendEmail/${id}`);
  }
  //BusinessType Routes

  getBusinessTypeall(): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}businessTypeall`);
  }

  getBusinessTypeList(pageNum: number, limit: number): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}businessType?page=${pageNum}&limit=${limit}`);
  }

  getBusinessType(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}businessType/${id}`);
  }

  saveBusinessType(businessType: BusinessTypeModel): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}businessType/create`, businessType);
  }
  deleteBusinessType(id: string): any {

    return this.http.get<any>(`${this.authService.getAccessPoint()}businessType/delete/${id}`);

  }

  updateBusinessType(businessType: {}, id: string): any {

    return this.http.put<any>(`${this.authService.getAccessPoint()}businessType/update/${id}`, { businessType });

  }

  //lawyer services
  registerlawyer(lawyer: Lawyer): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}lawyerpostdata`, { lawyer });
  }
  getLawyersList(pageNum: number, limit: number): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}lawyerlist?page=${pageNum}&limit=${limit}`);
  }

  deleteLawyer(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}lawyer/delete/${id}`);
  }
  updateLawyer(lawyer: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}lawyer/update/${id}`, { lawyer });
  }
  getLawyer(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}lawyer/${id}`);
  }
  uploadLawyerPic(formData: FormData): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}lawyer/uploadLawyerPic`, formData);
  }

  //menuaction

  getactiveMenuAction(): any {
    console.log("user side answertype services")
    return this.http.get<any>(`${this.authService.getAccessPoint()}getactiveMenuAction`);
  }
  //role_action services
  createRoleAction(roleActionData: RoleAction): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}actionrole/create`, { roleActionData });
  }
  updateRoleAction(roleActionData: RoleAction): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}actionrole/update`, { roleActionData });
  }

  deletemanylist(answer: RoleAction): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}deletemanylist/${answer}`);
  }

  getRoleActionList(pageNum: number, limit: number): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}roleaction?page=${pageNum}&limit=${limit}`);
  }
  deleteRoleAction(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}roleaction/delete/${id}`);
  }
  getRoleAction(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}roleaction/view/${id}`);
  }

  getallroleaction(roleID: string): any {

    return this.http.get<any>(`${this.authService.getAccessPoint()}getallroleaction/${roleID}`);
  }




  //role services
  getRoleList(pageNum: number, limit: number): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}role?page=${pageNum}&limit=${limit}`);
  }
  getroledataById(id): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}role/view/${id}`);
  }

  deleteRole(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}role/delete/${id}`);
  }

  createRole(role: Role): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}role/create`, { role });
  }
  getRole(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}role/view/${id}`);
  }
  updateRole(role: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}role/update/${id}`, { role });
  }

  getactiverole(): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}getactiverole`);
  }
  // getAllUsers(): any{
  //   return this.http.get<any>(`${this.authService.getAccessPoint()}getusers`);
  // }
  getActionsForLawyer(name: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}getRoleByValue/${name}`);
  }
  // getAllRoleActions(idd: string): any {
  //   return this.http.get<any>(`${this.authService.getAccessPoint()}getAllRoleAction/${idd}`);
  // }
  getAllRoleData(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}allRoleData/${id}`);
  }
  //content page Api
  ContentPageStatus(): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}contentByStatus`);


  }
  // ContentpageList(pageNum: number, limit: number): any {
  //   return this.http.get<any>(`${this.authService.getAccessPoint()}contentpagelist?page=${pageNum}&limit=${limit}`);
  // }

  ContentpageList(pageNum: number, limit: number): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}contentpagelist?page=${pageNum}&limit=${limit}`);
  }
  updateContentPage(contentPage: {}, id: string): any {
    return this.http.put<any>(`${this.authService.getAccessPoint()}contentupdate/${id}`, { contentPage });
  }

  contentById(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}contentById/${id}`);
  }
  GetUserRoleAction(id: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}GetUserRoleAction/${id}`);
  }
  GetRoleActionByRoleIdRoleActionId(id: string, roleactionID: string): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}GetRoleActionByRoleIdRoleActionId/${id}/${roleactionID}`);
  }

  postCheckForetag(foretag: {}): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}CheckDataForetag` , foretag);
  }
  getCheckForetag(): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}CheckDataForetag`);
  }
  postCheckPrivatePerson(privateperson: {}): any {
    return this.http.post<any>(`${this.authService.getAccessPoint()}CheckDataPrivatePerson` , privateperson);
  }
  getCheckPrivatePerson(): any {
    return this.http.get<any>(`${this.authService.getAccessPoint()}CheckDataPrivatePerson` );
  }
}
