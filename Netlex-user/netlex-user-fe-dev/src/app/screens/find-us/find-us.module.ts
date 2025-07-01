import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AboutusComponent, SafeHtmlPipe } from './aboutus.component';
import { CustomMaterialModule } from 'src/app/netlex-common/custom-material/custom-material.module';
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from '@angular/forms';
import { TranslationsModule } from '../../netlex-common/translations/translations.module';
import { RouterModule } from '@angular/router';
// import { AboutusComponent, SafeHtmlPipe } from '../aboutus/aboutus.component';
import { FindUsComponent } from './find-us.component';
import { NetlexCommonModule } from 'src/app/netlex-common/netlex-common.module';




@NgModule({
  declarations: [
    FindUsComponent,
  ],
  imports: [

    CommonModule,
    // CustomMaterialModule,
    TranslateModule,
    TranslationsModule,
    NetlexCommonModule,
    RouterModule,
    FormsModule,
  ]
})
export class FindUsModule {

}
