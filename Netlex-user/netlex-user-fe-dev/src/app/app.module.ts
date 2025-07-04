import { APP_INITIALIZER, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AuthService } from "./services/auth.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { LoginModule } from "./screens/login/login.module";
import { RegisterModule } from "./screens/register/register.module";
import { UserService } from "./services/user.service";
import { AuthGuard } from "./guard/auth.guard";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { ScheduleListModule } from "./screens/schedule-list/schedule-list.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CustomMaterialModule } from "./netlex-common/custom-material/custom-material.module";
import { StorageService } from "./services/storage-service";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import {
  AppTranslateLoader,
  initTranslation,
} from "./services/app-translate-loader";
import { TranslationsModule } from "./netlex-common/translations/translations.module";

import { QRCodeModule } from "angularx-qrcode";

import { HomeModule } from "./screens/home/home.module";
import { NetlexCommonModule } from "./netlex-common/netlex-common.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgreementModule } from "./screens/agreement/agreement.module";
import { NewDealService } from "./services/newDeal.service";
import { UserInputModule } from "./screens/user-input/user-input.module";
import { ApiService } from "./services/api.service";
import { AnswerOptionService } from "./services/answerOption.service";
import { AnswerTypeService } from "./services/answerType.service";
import { PaymentService } from "./services/payment.service";
import { UtilService } from "./services/util.service";
import { NgxPaginationModule } from "ngx-pagination";
import { MatExpansionModule } from "@angular/material/expansion";
import { SchedulerModule } from "./screens/scheduler/scheduler.module";
import { AccountProfileComponent } from "./screens/account-profile/account-profile.component";
import { AccountSettingsModule } from "./screens/account-settings/account-settings.module";
import { SettingsModule } from "./screens/account-settings/settings/settings.module";
import { RequestsModule } from "./screens/account-settings/requests/requests.module";
import { PreviewAgreementModule } from "./screens/preview-agreement/preview-agreement.module";
import { AboutusModule } from "./screens/aboutus/aboutus.module";
import { QuestionAndAnswerModule } from "./screens/question-and-answer/question-and-answer.module";
import { PreviewPdfModule } from "./screens/preview-pdf/preview-pdf.module";
import { PaymentModule } from "./screens/payment/payment.module";
import { PaymentNewModule } from "./screens/payment-new/payment-new.module";
import { SchedulerappModule } from "./screens/schedulerapp/schedulerapp.module";
import { PreviewScheduleModule } from "./screens/preview-schedule/preview-schedule.module";
import { SaleService } from "./services/sale.service";
import { contentpagesService } from "./services/contentpages.service";
import { clientsDetailsservice } from "./services/clientsDetails.service";

import { agreementconfirmModule } from "./screens/agreement-confirm/agreement-confirm.module";
import {
  HomeOldComponent,
  SafeHtmlPipe,
} from "./screens/home-old/home-old.component";
import { AgreementSample1Module } from "./screens/agreement-sample1/agreement-sample1.module";
import { AgreementSample2Module } from "./screens/agreement-sample2/agreement-sample2.module";
import { TestingComponent } from "./screens/testing/testing.component";
// import { AgreementConfirmSample1Component } from './screens/agreement-confirm-sample1/agreement-confirm-sample1.component';
import { UserInput2Module } from "./screens/user-input2/user-input2.module";
import { UserInput3Module } from "./screens/user-input3/user-input3.module";
import { UserInput4Module } from "./screens/user-input4/user-input4.module";
import { AboutusSimilarModule } from "./screens/aboutus-similar/aboutus-similar.module";
import { QuestionAndAnswer1Module } from "./screens/question-and-answer1/question-and-answer1.module";
import { SchedulerOldModule } from "./screens/schedular-old/scheduler.module";
import { SchedulerNewModule } from "./screens/schedular-new/scheduler-new.module";
// import { AllLawyersComponent } from './screens/all-lawyers/all-lawyers.component';
import { AllLawyerModule } from "./screens/all-lawyers/all-lawyers.module";
import { HomeOld1Component } from "./screens/home-old1/home-old1.component";
import { FindUsComponent } from "./screens/find-us/find-us.component";
import { TermsAndConditionsModule } from "./screens/terms-and-conditions/terms-and-conditions.module";
import { PrivacyAndPolicyModule } from "./screens/privacy-and-policy/privacy-and-policy.module";
import { BusinessAgreementComponent } from "./screens/business-agreement/business-agreement.component";
import { BusinessAgreementConfirmModule } from "./screens/business-agreement/business-agreement-confirm/business-agreement-confirm.module";
import { ActivityAreasModule } from "./screens/activity-areas/activity-areas.module";
import { AllLawyersFocComponent } from "./screens/all-lawyers-foc/all-lawyers-foc.component";
import { AllLawyersFocModule } from "./screens/all-lawyers-foc/all-lawyers-foc.module";
import { KommersnartComponent } from "./screens/kommersnart/kommersnart.component";
import { KommersnartPrivatePerrsonComponent } from "./screens/kommersnart-private-perrson/kommersnart-private-perrson.component";
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountProfileComponent,
    SafeHtmlPipe,
    HomeOldComponent,
    TestingComponent,
    // AllLawyersComponent,
    HomeOld1Component,
    FindUsComponent,
    BusinessAgreementComponent,
    AllLawyersFocComponent,
    KommersnartComponent,
    KommersnartPrivatePerrsonComponent,
    ChatComponent,
    // AgreementConfirmSample1Component,
  ],
  imports: [
    LoginModule,
    PreviewScheduleModule,
    RegisterModule,
    NetlexCommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CustomMaterialModule,
    HomeModule,
    AllLawyersFocModule,
    ScheduleListModule,
    FormsModule,
    AgreementModule,
    NgxPaginationModule,
    UserInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: AppTranslateLoader,
      },
    }),
    TranslationsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    SchedulerModule,
    SchedulerappModule,
    AccountSettingsModule,
    SettingsModule,
    RequestsModule,
    PreviewAgreementModule,
    AboutusModule,
    AboutusSimilarModule,
    QuestionAndAnswerModule,
    PreviewPdfModule,
    PaymentModule,
    agreementconfirmModule,
    AgreementSample1Module,
    AgreementSample2Module,
    QRCodeModule,

    ScheduleListModule,
    UserInput2Module,
    UserInput3Module,
    UserInput4Module,
    QuestionAndAnswer1Module,
    SchedulerOldModule,
    SchedulerNewModule,
    AllLawyerModule,
    TermsAndConditionsModule,
    PrivacyAndPolicyModule,
    BusinessAgreementConfirmModule,
    ActivityAreasModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserService,
    NewDealService,
    ApiService,
    AnswerOptionService,
    AnswerTypeService,
    PaymentService,
    SaleService,
    contentpagesService,
    clientsDetailsservice,
    UtilService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initTranslation,
      deps: [TranslateService, StorageService],
      multi: true,
    },
  ],
  exports: [SafeHtmlPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
