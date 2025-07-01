import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogComponent} from './dialog.component';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterModule} from "@angular/router";


@NgModule({
    declarations: [
        DialogComponent
    ],
    imports: [
        CommonModule,
        CustomMaterialModule,
        TranslateModule,
        MatTooltipModule,
        RouterModule
    ]
})
export class DialogModule {
}
