import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginModule} from './login/login.module';
import {CustomMaterialModule} from './custom-material/custom-material.module';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guard/auth.guard';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from './services/token-interceptor.service';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {EditorModule} from '@tinymce/tinymce-angular';
import {NyttAvtalModule} from './nytt-avtal/nytt-avtal.module';
import {NyttAvtalService} from './services/nyttavtal.service';
import {BusinessAgreementsService} from './services/businessAgreement.service';
import {NetlexCommonModule} from './netlexcommon/netfexcommon.module';
import {IdComponentModule} from './id-component/id-component.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {AnswerTypeService} from './services/answerType.service';
import {FieldService} from './services/field.service';
import {ProfileModule} from './profile/profile.module';
import {AnswerOptionService} from './services/answerOption.service';
import {CategoryService} from './services/category.service';
import {UserDocumentModule} from './user-document/user-document.module';
import {HomepageModule} from './homepage/homepage.module';
import {UserService} from './services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';
import {UserModule} from './user/user.module';
import {RegisterModule} from './register/register.module';
import {DocumentListModule} from './document-list/document-list.module';
// import {SalesModule} from './sales/sales.module';
import { SalesComponent } from './sales/sales.component';
import { ViewSalesComponent } from './sales/view-sales/view-sales.component';

import { LawyerSalesModule } from './lawyer-sales/lawyer-sales.module';
// import {LawyerSalesComponent} from './lawyer-sales/lawyer-sales.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { PaymentsModule } from './sales/payments/payments.module';
import {MatSelectModule} from "@angular/material/select";
import { CreateSchedulerComponent } from './schedule-list/create-scheduler/create-scheduler.component';
import { ViewSchedulerComponent } from './schedule-list/view-scheduler/view-scheduler.component';
import { CreateLawyerSchedulerComponent } from './lawyer-schedule-list/create-lawyer-scheduler/create-lawyer-scheduler.component';
import { ViewLawyerSchedulerComponent } from './lawyer-schedule-list/view-lawyer-scheduler/view-lawyer-scheduler.component';
import { BusinessTypeModule } from './business-type/business-type.module';
 import { LawyerService } from './services/lawyer.service';
 import { LawyerScheduleListComponent } from './lawyer-schedule-list/lawyer-schedule-list.component';

import { LawyerModule } from './lawyer/lawyer.module';
import{ViewPdfModule} from './View-Pdf/View-Pdf.module';

import { ActionModeule } from './role-action/role-action.module';

import { RoleModule } from './role/role.module';

import { ClientsDetailsModule } from './clients-details/clients-details.module';
import { QuestionAndAnswerModule } from './content-pages/question-and-answer/question-and-answer.module';



import { Contentpagemodule } from './contentpage/contentpage.module';
import { ContentPagesComponent } from './content-pages/content-pages.component';
import { HomeModule } from './content-pages/home/home.module'; 
import { AboutUsModule } from './content-pages/about-us/about-us.module';
// import { ScheduleMeetingCalenderModule } from './schedule-meeting-calender/schedule-meeting-calender.module'; 

// import { NgxCaptchaModule } from 'ngx-captcha';
// import { ReCaptchaV3Service } from 'ngx-captcha';

// import { RecaptchaModule } from "ng-recaptcha";

// import { Ng2GoogleRecaptchaModule } from 'ng2-google-recaptcha';

// import { NgHcaptchaModule } from 'ng-hcaptcha';

//////////////////////------Meeting_Calender------//////////////////////
// import { ScheduleMeetingCalenderComponent } from './schedule-meeting-calender/schedule-meeting-calender.component';
// import { CreateMeetingDialogComponent } from './schedule-meeting-calender/create-meeting-dialog/create-meeting-dialog.component';

// import { FullCalendarModule } from '@fullcalendar/angular';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { MeetingCalendarDialogComponent } from './schedule-meeting-calender/meeting-calendar-dialog/meeting-calendar-dialog.component';
////////////////////////------Meeting_Calender------//////////////////////

// import { EmailFailedComponent } from './email-failed/email-failed.component';
// import { ViewEmailFailedComponent } from './email-failed/view-email-failed/view-email-failed.component';
// import { EditEmailFailedComponent } from './email-failed/edit-email-failed/edit-email-failed.component';
import { EmailFailedModule } from './email-failed/email-failed.module';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { EmailConfigurationModule } from './configurations/email-configuration/email.configuration.module';
import { KlarnaConfigurationModule } from './configurations/klarna-configuration/klarna.configuration.module';
import { StripeConfigurationModule } from './configurations/stripe-configuration/stripe.configuration.module';
import { SwishConfigurationModule } from './configurations/swish-configuration/swish.configuration.module';
import { MyPagesTabModule } from './timeapp/my-pages-tab/my-pages-tab.module';
import { ReportsTabModule } from './timeapp/reports-tab/reports-tab.module';

// import { DialogModule } from './netlexcommon/dialog/dialog.module';

// FullCalendarModule.registerPlugins([
//   dayGridPlugin,
//   interactionPlugin
// ]);

// import {CdkAccordionModule} from '@angular/cdk/accordion';
import { TimeappComponent } from './timeapp/timeapp.component';
import { ControlPanelTabModule } from './timeapp/control-panel-tab/control-panel-tab.module';
import { RegisterTabModule } from './timeapp/register-tab/register-tab.module';
import { BillingTabModule } from './timeapp/billing-tab/billing-tab.module';
import { AccountingTabModule } from './timeapp/accounting-tab/accounting-tab.module';
// import { IdModule } from './id/id.module';
import { ColorsComponent } from './content-pages/colors/colors.component';
import { CreateColorsComponent } from './content-pages/colors/create-colors/create-colors.component';
import { ViewColorsComponent } from './content-pages/colors/view-colors/view-colors.component';
import { AllHeroBannersModule } from './content-pages/all-hero-banners/all-hero-banners.module';
import { FindUsComponent } from './content-pages/find-us/find-us.component';
import { CreateFindUsComponent } from './content-pages/find-us/create-find-us/create-find-us.component';
import { ViewFindUsComponent } from './content-pages/find-us/view-find-us/view-find-us.component';
import { TermsAndConditionsModule } from './content-pages/terms-and-conditions/terms-and-conditions.module';
import { PrivacyAndPolicyModule } from './content-pages/privacy-and-policy/privacy-and-policy.module';
import { BusinessAgreementsModule } from './business-agreements/business-agreements.module';
import { BankIdConfigurationModule } from './configurations/bank-id-configuration/swish.configuration.module';
import { ActivityAreasModule } from './content-pages/activity-areas/activity-areas.module';
import { TestModule } from './test/test.module';
// import { ReportsTabComponent } from './timeapp/reports-tab/reports-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleListComponent,
    CreateSchedulerComponent, 
    ViewSchedulerComponent,
    LawyerScheduleListComponent, 
    CreateLawyerSchedulerComponent, 
    ViewLawyerSchedulerComponent,
     ContentPagesComponent,
    SalesComponent,
    ViewSalesComponent,
    ConfigurationsComponent,

      //  ////---Meeting_Calender---////
      //  ScheduleMeetingCalenderComponent,
      //  MeetingCalendarDialogComponent,
      //  CreateMeetingDialogComponent,
      // ////---Meeting_Calender---////
      
    // LawyerSalesComponent,
    // StripeConfigurationComponent,
    // SwishConfigurationComponent,
    // KlarnaConfigurationComponent,
    // EmailFailedComponent,
    // ViewEmailFailedComponent,
    // EditEmailFailedComponent
    TimeappComponent,
    // BillingTabComponent,
    

    ColorsComponent,
    CreateColorsComponent,
    ViewColorsComponent,
    FindUsComponent,
    CreateFindUsComponent,
    ViewFindUsComponent,
    // ActivityAreasComponent,
  ],
  imports: [
    BrowserModule,
    Contentpagemodule,
    ActionModeule,
    LawyerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    LoginModule,
    HttpClientModule,
    LoginModule,
    BusinessTypeModule,
    ScrollingModule,
    EditorModule,
    NyttAvtalModule,
    NetlexCommonModule,
    // IdModule,
    IdComponentModule,
    MatFormFieldModule,
    ProfileModule,
    UserDocumentModule,
    HomepageModule,
    FormsModule,
    NgSelectModule,
    NgxPaginationModule,
    UserDocumentModule,
    UserModule,
    ReactiveFormsModule,
    RegisterModule,
    DocumentListModule,
    MatSelectModule,
    DocumentListModule,
    // SalesModule,
    LawyerSalesModule,
    ViewPdfModule,
    PaymentsModule,
    RoleModule,
    ClientsDetailsModule,
    QuestionAndAnswerModule,
    HomeModule,
    AboutUsModule,
    AllHeroBannersModule,
  
    MatTabsModule,
    EmailFailedModule,
    EmailConfigurationModule,
    KlarnaConfigurationModule,
    StripeConfigurationModule,
    SwishConfigurationModule,
    BankIdConfigurationModule,

    AccountingTabModule,
    RegisterTabModule,
    MyPagesTabModule,
    ReportsTabModule,
    BillingTabModule,
    ControlPanelTabModule,
    TermsAndConditionsModule,
    PrivacyAndPolicyModule,
    BusinessAgreementsModule,
    ActivityAreasModule,
    TestModule,
    // CdkAccordionModule,
    // ScheduleMeetingCalenderModule


    // DialogModule
  
  //  ////---Meeting_Calender---////
  //  FullCalendarModule,
  //  ////---Meeting_Calender---////

    
  ],
  providers: [AuthGuard, AuthService, NyttAvtalService,BusinessAgreementsService, LawyerService, AnswerTypeService, FieldService, AnswerOptionService,
      CategoryService, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
