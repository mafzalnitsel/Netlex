import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogForPaymentComponent, UserInputComponent,SafeHtmlPipe} from './user-input.component';
import {CustomMaterialModule} from '../../netlex-common/custom-material/custom-material.module';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {MatRadioModule} from '@angular/material/radio';
import {TranslationsModule} from '../../netlex-common/translations/translations.module';
import {TranslateModule} from '@ngx-translate/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import { AgreementQuestionsDialogComponent } from './agreement-questions-dialog/agreement-questions-dialog.component';
import {DialogForPaymentComponent2, } from './agreement-questions-dialog/agreement-questions-dialog.component';
import { JavskontrollQuestionsDialogComponent } from './javskontroll-questions-dialog/javskontroll-questions-dialog.component';



@NgModule({
  declarations: [UserInputComponent, DialogForPaymentComponent,SafeHtmlPipe,DialogForPaymentComponent2, AgreementQuestionsDialogComponent, JavskontrollQuestionsDialogComponent],
    imports: [
        CommonModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        PdfViewerModule,
        MatRadioModule,
        TranslationsModule,
        TranslateModule,
        MatTooltipModule,
        MatButtonToggleModule,
        MatChipsModule
    ]
})
export class UserInputModule { }
