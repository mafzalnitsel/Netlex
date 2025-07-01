import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityAreasComponent, SafeHtmlPipe } from './activity-areas.component';
import { CustomMaterialModule } from 'src/app/netlex-common/custom-material/custom-material.module';
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from '@angular/forms';
import { TranslationsModule } from '../../netlex-common/translations/translations.module';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    ActivityAreasComponent, SafeHtmlPipe
  ],
  imports: [

    CommonModule,
    CustomMaterialModule,
    TranslateModule,
    TranslationsModule,
    RouterModule,
    FormsModule,
  ]
})
export class ActivityAreasModule {

}
