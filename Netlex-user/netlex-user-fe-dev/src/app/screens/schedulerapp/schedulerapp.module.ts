import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SchedulerappComponent} from './schedulerapp.component';
import {CustomMaterialModule} from '../../netlex-common/custom-material/custom-material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
    declarations: [
        SchedulerappComponent
    ],
    imports: [
        CommonModule,
        CustomMaterialModule,
        ReactiveFormsModule,
        TranslateModule
    ]
})
export class SchedulerappModule {
}
