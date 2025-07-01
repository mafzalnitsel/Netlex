import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreviewAgreementComponent} from "./preview-agreement.component";
import {CustomMaterialModule} from "../../netlex-common/custom-material/custom-material.module";
import {TranslationsModule} from "../../netlex-common/translations/translations.module";
import {TranslateModule} from "@ngx-translate/core";
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [PreviewAgreementComponent],
    imports: [
        CommonModule,
        CustomMaterialModule,
        TranslationsModule,
        TranslateModule,
        MatTooltipModule
    ]
})
export class PreviewAgreementModule { }
