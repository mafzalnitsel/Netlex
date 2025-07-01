import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {AddIdComponent} from './add-id/add-id.component';
import {NetlexCommonModule} from '../netlexcommon/netfexcommon.module';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {RouterModule} from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SubQuestionComponent } from './sub-question/sub-question.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {ExistingIdComponent} from './existing-id/existing-id.component';


@NgModule({
    declarations: [
        AddIdComponent,
        SubQuestionComponent,
        ExistingIdComponent
    ],
    imports: [
        CommonModule,
        NetlexCommonModule,
        CommonModule,
        CustomMaterialModule,
        RouterModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        NgxSpinnerModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    exports: [
        AddIdComponent,
        SubQuestionComponent,
        ExistingIdComponent,
    ],
    providers: [
        DatePipe,
    ]
})
export class IdComponentModule {
}
