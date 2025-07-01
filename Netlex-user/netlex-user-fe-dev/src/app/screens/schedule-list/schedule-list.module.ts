import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScheduleListComponent} from './schedule-list.component';
import {CustomMaterialModule} from '../../netlex-common/custom-material/custom-material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        ScheduleListComponent
    ],
    imports: [
        CommonModule,
        CustomMaterialModule,
        NgxPaginationModule,
        FormsModule,
        TranslateModule
    ]
})
export class ScheduleListModule {
}
