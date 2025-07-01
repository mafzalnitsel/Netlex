import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaymentComponent} from "./payment.component";
import {CustomMaterialModule} from "../../netlex-common/custom-material/custom-material.module";
import {TranslationsModule} from "../../netlex-common/translations/translations.module";
import {TranslateModule} from "@ngx-translate/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormsModule} from "@angular/forms";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatChipsModule} from "@angular/material/chips";



@NgModule({
  declarations: [PaymentComponent],
    imports: [
        CommonModule,
        CustomMaterialModule,
        TranslationsModule,
        TranslateModule,
        MatTooltipModule,
        FormsModule,
        MatTooltipModule,
        MatButtonToggleModule,
        MatChipsModule
    ]
})
export class PaymentModule { }
