import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutusComponent, SafeHtmlPipe } from './aboutus.component';
import { CustomMaterialModule } from 'src/app/netlex-common/custom-material/custom-material.module';
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from '@angular/forms';
import { TranslationsModule } from '../../netlex-common/translations/translations.module';
import { RouterModule } from '@angular/router';
import { LawyersInHomeComponent } from './lawyers-in-home/lawyers-in-home.component';
import { LawyersInHomeDialogComponent } from './lawyers-in-home/lawyers-in-home-dialog/lawyers-in-home-dialog.component'




@NgModule({
  declarations: [
    AboutusComponent, SafeHtmlPipe, LawyersInHomeComponent, LawyersInHomeDialogComponent
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
export class AboutusModule {

}
