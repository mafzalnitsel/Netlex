import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { HomeComponent } from './screens/home/home.component';
import { RegisterComponent } from './screens/register/register.component';
import { AgreementComponent } from './screens/agreement/agreement.component';
import { UserInputComponent } from './screens/user-input/user-input.component';
import { NavbarComponent } from './netlex-common/navbar/navbar.component';
import { AccountSettingsComponent } from './screens/account-settings/account-settings.component';
import { SchedulerComponent } from './screens/scheduler/scheduler.component';
import { SchedulerappComponent } from './screens/schedulerapp/schedulerapp.component';
import { SettingsComponent } from './screens/account-settings/settings/settings.component';
import { PreviewAgreementComponent } from "./screens/preview-agreement/preview-agreement.component";
import { AboutusComponent } from './screens/aboutus/aboutus.component';
import { QuestionAndAnswerComponent } from './screens/question-and-answer/question-and-answer.component';
import { AuthGuard } from "./guard/auth.guard";
import { PreviewPdfComponent } from "./screens/preview-pdf/preview-pdf.component";
import { PaymentComponent } from "./screens/payment/payment.component";
import { PaymentNewComponent } from './screens/payment-new/payment-new.component';
import { ScheduleListComponent } from './screens/schedule-list/schedule-list.component';
import { PreviewScheduleComponent } from './screens/preview-schedule/preview-schedule.component';
import { AgreementConfirmComponent } from './screens/agreement-confirm/agreement-confirm.component';
// import {PaymentComponent} from "./screens/payment/payment.component";
// import { ScheduleListComponent } from './screens/schedule-list/schedule-list.component';
import { HomeOldComponent } from './screens/home-old/home-old.component';
import { HomeOld1Component } from './screens/home-old1/home-old1.component';
import { Sample3Component } from './screens/home/sample3/sample3.component';
import { Sample4Component } from './screens/home/sample4/sample4.component';
// import { DateNTimeDialogComponent } from './screens/scheduler/date-n-time-dialog/date-n-time-dialog.component';
import { AgreementSample1Component } from './screens/agreement-sample1/agreement-sample1.component';
import { AgreementSample2Component } from './screens/agreement-sample2/agreement-sample2.component';
import { TestingComponent } from './screens/testing/testing.component';
import { LawyersInHomeComponent } from './screens/home/lawyers-in-home/lawyers-in-home.component'
import { UserInput2Component } from './screens/user-input2/user-input2.component';
import { UserInput3Component } from './screens/user-input3/user-input3.component';
import { UserInput4Component } from './screens/user-input4/user-input4.component';
import { AboutusSimilarComponent } from './screens/aboutus-similar/aboutus-similar.component';
import { SchedularOldComponent } from './screens/schedular-old/schedular-old.component';
import { SchedulerNewComponent } from './screens/schedular-new/scheduler-new.component';
import { AllLawyersComponent } from './screens/all-lawyers/all-lawyers.component';
import { QuestionAndAnswer1Component } from './screens/question-and-answer1/question-and-answer1.component';
import { FindUsComponent } from './screens/find-us/find-us.component';
import { PrivacyAndPolicyComponent } from './screens/privacy-and-policy/privacy-and-policy.component';
import { TermsAndConditionsComponent } from './screens/terms-and-conditions/terms-and-conditions.component';
import { BusinessAgreementComponent } from './screens/business-agreement/business-agreement.component';
import { BusinessAgreementConfirmComponent } from './screens/business-agreement/business-agreement-confirm/business-agreement-confirm.component';
import { ActivityAreasComponent } from './screens/activity-areas/activity-areas.component';
import { RegisterProgressLoadingComponent } from './screens/register/register-progress-loading/register-progress-loading.component';
import { AllLawyersFocComponent } from './screens/all-lawyers-foc/all-lawyers-foc.component';
import { KommersnartComponent } from './screens/kommersnart/kommersnart.component';
import {KommersnartPrivatePerrsonComponent} from "./screens/kommersnart-private-perrson/kommersnart-private-perrson.component";
const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // { path: 'home', component: HomeComponent },
    { path: 'scheduler/new-sample', component: SchedulerComponent },
    // { path: 'scheduler', component: AllLawyersComponent },
    { path: 'allLawyers', component: AllLawyersComponent },
    { path: 'alladvokaterfoc', component: AllLawyersFocComponent },
    { path: 'scheduler', component: SchedulerNewComponent },
    // { path: 'schedulerapp', component: SchedulerappComponent },
    { path: 'schedulerapp', component: HomeComponent },
    { path: 'schedulerlist', component: ScheduleListComponent },
    { path: 'preview-schedule/:id', component: PreviewScheduleComponent },
    { path: 'schedule-list', component: ScheduleListComponent },
    { path: 'agreementconfirm/:_id', component: AgreementConfirmComponent },
    // {path: 'schedule-list', component: ScheduleListComponent},
    //{path: 'schedule-list', component: ScheduleListComponent},
    { path: 'accountSettings', component: AccountSettingsComponent, canActivate: [AuthGuard] },
    { path: 'scheduler/view/:id', component: SchedulerComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'userInput', component: UserInputComponent },
    { path: 'userInput/:_id', component: UserInputComponent },
    { path: 'userInputEdit/:_id', component: UserInputComponent },
    { path: 'agreements/old', component: AgreementComponent },
    // { path: 'agreements', component: AgreementSample1Component },
    { path: 'agreements', component: AgreementSample2Component },
    { path: 'agreements/new', component: AgreementSample1Component },
    { path: 'klarna/success', component: AgreementSample2Component },
    { path: 'klarnasale/successsale', component: AgreementSample2Component },
    { path: 'klarna/back', component: PreviewAgreementComponent },
    { path: 'klarna/failure', component: PreviewAgreementComponent },
    { path: 'klarna/cancel', component: PreviewAgreementComponent },
    { path: 'klarna/error', component: PreviewAgreementComponent },
    { path: 'stripe/success', component: AgreementSample2Component },
    { path: 'stripesale/success', component: AgreementSample2Component },
    { path: 'stripe/cancel', component: PreviewAgreementComponent },
    { path: 'swish/success', component: AgreementSample2Component },
    { path: 'swishsale/success', component: AgreementSample2Component },
    { path: 'success', component: AgreementSample2Component },
    { path: 'settings', component: SettingsComponent },
    { path: 'preview-Agreement', component: PreviewAgreementComponent },
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'aboutUs', component: AboutusComponent },
    { path: 'questionAndAnswer', component: QuestionAndAnswerComponent },
    { path: 'preview-pdf', component: PreviewPdfComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'paymentNew', component: PaymentNewComponent },
    { path: 'findUs', component: FindUsComponent },
    { path: 'business-agreements', component: BusinessAgreementComponent },
    { path: 'business-agreement-confirm/:_id', component: BusinessAgreementConfirmComponent },
    { path: 'privacy-and-policy', component: PrivacyAndPolicyComponent },
    { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
    { path: 'activityAreas', component: ActivityAreasComponent },
    // { path: 'timetime', component: DateNTimeDialogComponent },
    // { path: 'agreements/sample1', component: AgreementSample1Component },
    { path: 'testing', component: TestingComponent },

    //Backup Hidden Paths
    { path: 'testing/6525116525', component: TestingComponent },
    { path: 'home/old/6525116525', component: HomeOldComponent },
    { path: 'home/old1/6525116525', component: HomeOld1Component },
    { path: 'home/sample3/6525116525', component: Sample3Component },
    { path: 'home/sample4/6525116525', component: Sample4Component },
    { path: 'scheduler1/6525116525', component: SchedularOldComponent },
    { path: 'aboutUs2/6525116525', component: AboutusSimilarComponent },
    { path: 'userInput2/6525116525/:_id', component: UserInput2Component },
    { path: 'userInput3/6525116525/:_id', component: UserInput4Component },
    { path: 'userInput4/6525116525/:_id', component: UserInput3Component },
    { path: 'questionAndAnswer/6525116525', component: QuestionAndAnswer1Component },
    { path: 'testProgessLoading', component: RegisterProgressLoadingComponent },
    // { path: 'lawyer', component: LawyersInHomeComponent },
    {path: 'kommersnart', component: KommersnartComponent},
    {path: 'Kommersnartprivatperson', component: KommersnartPrivatePerrsonComponent}

    // { path: 'lawyer', component: LawyersInHomeComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
