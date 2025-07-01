import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogForLoginComponent, PreviewScheduleComponent} from "./preview-schedule.component";
import {CustomMaterialModule} from "../../netlex-common/custom-material/custom-material.module";
import {TranslationsModule} from "../../netlex-common/translations/translations.module";
import {TranslateModule} from "@ngx-translate/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatRadioModule} from '@angular/material/radio';


import {RouterModule} from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';




@NgModule({
  declarations: [PreviewScheduleComponent, DialogForLoginComponent],
    imports: [
        CommonModule,
        CustomMaterialModule,
        TranslationsModule,
        TranslateModule,
        MatTooltipModule,
        MatRadioModule,

    ],
    exports:[
      PreviewScheduleComponent

    ]
})
export class PreviewScheduleModule { }
