import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedularOldComponent, SafeHtmlPipe } from './schedular-old.component';
import { CustomMaterialModule } from '../../netlex-common/custom-material/custom-material.module';
import { MatDatepickerModule, } from '@angular/material/datepicker';

import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { TranslationsModule } from '../../netlex-common/translations/translations.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        SafeHtmlPipe,
        SchedularOldComponent,
    ],
    imports: [
        CommonModule,
        CustomMaterialModule,
        ReactiveFormsModule,
        TranslateModule,
        MatRadioModule,
        RouterModule,
        TranslationsModule,
        FormsModule,
        MatDatepickerModule,
    ]
})
export class SchedulerOldModule {
}
