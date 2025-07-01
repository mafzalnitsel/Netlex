import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from 'src/app/netlex-common/custom-material/custom-material.module';
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from '@angular/forms';
import { TranslationsModule } from '../../netlex-common/translations/translations.module';
import { RouterModule } from '@angular/router';
import { AllLawyersComponent } from './all-lawyers.component';
import { LawyersDialogComponent,SafeHtmlPipe } from './lawyer-dialog/lawyer-dialog.component'




@NgModule({
  declarations: [
    AllLawyersComponent, LawyersDialogComponent,SafeHtmlPipe
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
export class AllLawyerModule {

}
