import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerComponent, SafeHtmlPipe } from './scheduler.component';
import { CustomMaterialModule } from '../../netlex-common/custom-material/custom-material.module';
import { MatDatepickerModule, } from '@angular/material/datepicker';

import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { TranslationsModule } from '../../netlex-common/translations/translations.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LawyersDialogComponent } from './lawyers-dialog/lawyers-dialog.component';
import { DateNTimeDialogComponent } from './date-n-time-dialog/date-n-time-dialog.component';
//////////////////////------Meeting_Calender------//////////////////////
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
FullCalendarModule.registerPlugins([
    dayGridPlugin,
    interactionPlugin
]);
////////////////////////------Meeting_Calender------//////////////////////
@NgModule({
    declarations: [
        SafeHtmlPipe,
        SchedulerComponent,
        LawyersDialogComponent,
        DateNTimeDialogComponent,
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
        FullCalendarModule
    ]
})
export class SchedulerModule {
}
