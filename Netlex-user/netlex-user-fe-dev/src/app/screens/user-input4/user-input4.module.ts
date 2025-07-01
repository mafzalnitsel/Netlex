import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogForPaymentComponent, UserInput4Component} from './user-input4.component';
import {CustomMaterialModule} from '../../netlex-common/custom-material/custom-material.module';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {MatRadioModule} from '@angular/material/radio';
import {TranslationsModule} from '../../netlex-common/translations/translations.module';
import {TranslateModule} from '@ngx-translate/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';



@NgModule({
  declarations: [UserInput4Component, DialogForPaymentComponent],
    imports: [
        CommonModule,
        CustomMaterialModule,
        FormsModule,
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
export class UserInput4Module { }
