

import { ViewLawyerComponent } from './lawyer/view-lawyer/view-lawyer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NyttAvtalComponent } from './nytt-avtal/nytt-avtal.component';
//---------v-------New Id Component--------v---------
// import { IdComponent } from './id/id.component';
// import { CreateIdComponent } from './id/create-id/create-id.component';
// import { ViewIdComponent } from './id/view-id/view-id.component';
//---------^-------New Id Component--------^----------
import { AddIdComponent } from './id-component/add-id/add-id.component';
// import {ExistingIdComponent} from './id-component/existing-id/existing-id.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDocumentComponent } from './user-document/user-document.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { RegisterComponent } from './register/register.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDraftListComponent } from './document-list/document-draft-list/document-draft-list.component';
import { AuthGuard } from './guard/auth.guard';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ViewPaymentComponent } from './sales/payments/view-payment/view-payments.component';
import { PaymentsComponent } from './sales/payments/payments.component';
import { LawyerScheduleListComponent } from './lawyer-schedule-list/lawyer-schedule-list.component';
import { CreateSchedulerComponent } from './schedule-list/create-scheduler/create-scheduler.component';
import { CreateLawyerSchedulerComponent } from './lawyer-schedule-list/create-lawyer-scheduler/create-lawyer-scheduler.component';
import { ViewLawyerSchedulerComponent } from './lawyer-schedule-list/view-lawyer-scheduler/view-lawyer-scheduler.component';
import { SalesComponent } from './sales/sales.component';
import { ViewSalesComponent } from './sales/view-sales/view-sales.component';
import { LawyerSalesComponent } from './lawyer-sales/lawyer-sales.component';
import { ExistingIdComponent } from './id-component/existing-id/existing-id.component';
import { LawyerComponent } from './lawyer/lawyer.component';
import { CreateLawyerComponent } from './lawyer/create-lawyer/create-lawyer.component';
import { CreateBusinessTypeComponent } from './business-type/create-business-type/create-business-type.component';
import { ViewSchedulerComponent } from './schedule-list/view-scheduler/view-scheduler.component';
import { BusinessTypeComponent } from './business-type/business-type.component';
import { ViewBusinessTypeComponent } from './business-type/view-business-type/view-business-type.component';
import { ViewPdfComponent } from './view-pdf/view-pdf.component';
import { RoleComponent } from './role/role.component';
import { ViewRoleComponent } from './role/view-role/view-role.component';
import { CreateRoleComponent } from './role/create-role/create-role.component';

import { RoleActionComponent } from './role-action/role-action.component';
import { ViewActionComponent } from './role-action/view-action/view-action.component';
import { CreateActionComponent } from './role-action/create-action/create-action.component';


//import { RoleActionComponent } from './role-action/role-action.component';
//import { ViewActionComponent } from './role-action/view-action/view-action.component';
//import { CreateActionComponent } from './role-action/create-action/create-action.component';

import { ContentpageComponent } from './contentpage/contentpage.component';



//import { RoleComponent } from './role/role.component';
//import { ViewRoleComponent } from './role/view-role/view-role.component';
//import { CreateRoleComponent } from './role/create-role/create-role.component';
import { ContenteditComponent } from './contentpage/contentedit/contentedit.component';

import { ClientsDetailsComponent } from './clients-details/clients-details.component';
import { CreateClientsDetailsComponent } from './clients-details/create-clients-details/create-clients-details.component';
import { ViewClientsDetailsComponent } from './clients-details/view-clients-details/view-clients-details.component';
import { QuestionAndAnswerComponent } from './content-pages/question-and-answer/question-and-answer.component';
import { ViewQuestionAndAnswerComponent } from './content-pages/question-and-answer/view-question-and-answer/view-question-and-answer.component';
import { CreateQuestionAndAnswerComponent } from './content-pages/question-and-answer/create-question-and-answer/create-question-and-answer.component';
import { ContentPagesComponent } from './content-pages/content-pages.component';
import { CreateAboutUsComponent } from './content-pages/about-us/create-about-us/create-about-us.component';
import { ViewAboutUsComponent } from './content-pages/about-us/view-about-us/view-about-us.component';
// import { ScheduleMeetingCalenderComponent } from './schedule-meeting-calender/schedule-meeting-calender.component';
import { EmailFailedComponent } from './email-failed/email-failed.component';
import { ViewEmailFailedComponent } from './email-failed/view-email-failed/view-email-failed.component';
import { EditEmailFailedComponent } from './email-failed/edit-email-failed/edit-email-failed.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { TimeappComponent } from './timeapp/timeapp.component';

// import { ColorsComponent } from './content-pages/colors/colors.component';
import { CreateColorsComponent } from './content-pages/colors/create-colors/create-colors.component';
import { ViewColorsComponent } from './content-pages/colors/view-colors/view-colors.component';
import { CreateFindUsComponent } from './content-pages/find-us/create-find-us/create-find-us.component';
import { ViewFindUsComponent } from './content-pages/find-us/view-find-us/view-find-us.component';
import { BusinessAgreementsComponent } from './business-agreements/business-agreements.component';
import { ListBusinessAgreementsComponent } from './business-agreements/list-business-agreements/list-business-agreements.component';
// import { BusinessAgreementsDraftListComponent } from './business-agreements/list-business-agreements/list-business-agreements.component'
import { DraftsBusinessAgreementsComponent } from './business-agreements/drafts-business-agreements/drafts-business-agreements.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [

    // { path: 'meeting-calender', component: ScheduleMeetingCalenderComponent },
    // { path: 'id2', component: IdComponent },
    // { path: 'id2/create', component: CreateIdComponent },
    // { path: 'id2/view/:id', component: ViewIdComponent },

    //Content Pages
    // { path: 'content-pages', component: ContentPagesComponent },
    { path: 'content-pages', component: ContentPagesComponent },

    //-------------About Us-----------
    { path: 'about-us/create', component: CreateAboutUsComponent },
    { path: 'about-us/view/:id', component: ViewAboutUsComponent },

    //Clients Details
    { path: 'clients-details', component: ClientsDetailsComponent },
    { path: 'clients-details/view/:id', component: ViewClientsDetailsComponent },
    { path: 'clients-details/create', component: CreateClientsDetailsComponent },

    //-------------Question And Answer-----------
    { path: 'question-and-answer', component: QuestionAndAnswerComponent },
    { path: 'question-and-answer/view/:id', component: ViewQuestionAndAnswerComponent },
    { path: 'question-and-answer/create', component: CreateQuestionAndAnswerComponent },

    //-------------Colors-----------
    // { path: 'colors', component: ColorsComponent },
    { path: 'colors/create', component: CreateColorsComponent },
    { path: 'colors/view/:id', component: ViewColorsComponent },

    //-------------Colors-----------
    { path: 'findus/create', component: CreateFindUsComponent },
    { path: 'findus/view/:id', component: ViewFindUsComponent },

    //Role Action
    { path: 'roleaction', component: RoleActionComponent },
    { path: 'roleaction/view/:id', component: ViewActionComponent },
    { path: 'roleaction/create', component: CreateActionComponent },
    { path: 'view/pdf', component: ViewPdfComponent },
    { path: 'login', component: LoginComponent },
    { path: 'scheduler/view/:id', component: ViewSchedulerComponent },
    { path: 'lawyer-scheduler/view/:id', component: ViewLawyerSchedulerComponent },

    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomepageComponent },
    { path: 'id', component: AddIdComponent },
    { path: 'id/:global', component: AddIdComponent },
    { path: 'existId', component: ExistingIdComponent },
    { path: 'nyttAvtal', component: NyttAvtalComponent },
    { path: 'nyttAvtal/:id', component: NyttAvtalComponent },
    { path: 'business-agreements', component: BusinessAgreementsComponent },
    { path: 'business-agreements/:id', component: BusinessAgreementsComponent },
    { path: 'businessAgreementsList', component: ListBusinessAgreementsComponent },
    { path: 'businessAgreementsDraftList', component: DraftsBusinessAgreementsComponent },
    
    { path: 'profile', component: ProfileComponent },
    { path: 'profile/busyCalendar', component: ProfileComponent },
    { path: 'userDocument', component: UserDocumentComponent },
    // { path: 'user/view/:id', component: ViewUserComponent, canActivate: [AuthGuard], data: { roles: ['Administration'] } },
    // { path: 'lawyer/view/:id', component: ViewLawyerComponent, canActivate: [AuthGuard], data: { roles: ['Administration'] } },
    { path: 'user/view/:id', component: ViewUserComponent },
    { path: 'lawyer/view/:id', component: ViewLawyerComponent },

    //{ path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['Administration'] } },
    { path: 'user', component: UserComponent },
    { path: 'createUser', component: CreateUserComponent, },
    //{ path: 'lawyer', component: LawyerComponent, canActivate: [AuthGuard], data: { roles: ['Administration'] } },
    // { path: 'createlawyer', component: CreateLawyerComponent, canActivate: [AuthGuard], data: { roles: ['Administration'] } },
    // { path: 'createUser', component: CreateUserComponent, canActivate: [AuthGuard], data: { roles: ['Administration'] } },

    { path: 'lawyer', component: LawyerComponent },
    { path: 'createlawyer', component: CreateLawyerComponent },
    { path: 'createUser', component: CreateUserComponent },

    { path: 'documentList', component: DocumentListComponent },
    { path: 'documentDraftList', component: DocumentDraftListComponent },
    { path: 'schedule-list', component: ScheduleListComponent },
    { path: 'lawyer-schedule-list', component: LawyerScheduleListComponent },
    { path: 'scheduler', component: CreateSchedulerComponent },

    // {path: 'contentpage' , component: ContentpageComponent,canActivate: [AuthGuard], data: {roles: ['Administration']}},
    // {path: 'contentpageUpdate/:id' , component: ContenteditComponent,canActivate: [AuthGuard], data: {roles: ['Administration']}},
    { path: 'contentpage', component: ContentpageComponent },
    { path: 'contentpageUpdate/:id', component: ContenteditComponent },

    { path: 'payments', component: PaymentsComponent },
    { path: 'payment/view/:id', component: ViewPaymentComponent },
    { path: 'lawyer-scheduler', component: CreateLawyerSchedulerComponent },
    { path: 'businesstype/create', component: CreateBusinessTypeComponent },
    // {path: 'businesstype/view/:id' , component: ViewBusinessTypeComponent, canActivate: [AuthGuard], data: {roles: ['Administration']}},
    { path: 'businesstype/view/:id', component: ViewBusinessTypeComponent },
    { path: 'sales', component: SalesComponent },
    { path: 'sales/view/:id', component: ViewSalesComponent },
    { path: 'lawyer-sales', component: LawyerSalesComponent },
    // {path: 'businesstype', component: BusinessTypeComponent, canActivate: [AuthGuard], data: {roles: ['Administration']}},
    // {path: 'role', component: RoleComponent, canActivate: [AuthGuard], data: {roles: ['Administration']}},
    // {path: 'role/view/:id', component: ViewRoleComponent, canActivate: [AuthGuard], data: {roles: ['Administration']}},
    // {path: 'create-role', component: CreateRoleComponent, canActivate: [AuthGuard], data: {roles: ['Administration']}},
    { path: 'businesstype', component: BusinessTypeComponent },
    // {path: 'role', component: RoleComponent},
    // {path: 'role/view/:id', component: ViewRoleComponent},
    // {path: 'create-role', component: CreateRoleComponent},

    //Configurations
    { path: 'configurations', component: ConfigurationsComponent },
    //Failed Email Logs
    { path: 'email-failed', component: EmailFailedComponent },
    { path: 'view-email-failed/:id', component: ViewEmailFailedComponent },
    { path: 'edit-email-failed/:id', component: EditEmailFailedComponent },
    { path: 'test6525', component: TestComponent },


    //TimeApp
    { path: 'timeapp', component: TimeappComponent },


    { path: '**', component: LoginComponent },



];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
