import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawyerFocDialogComponent, SafeHtmlPipe } from './lawyer-foc-dialog/lawyer-foc-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationsModule } from 'src/app/netlex-common/translations/translations.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomMaterialModule } from 'src/app/netlex-common/custom-material/custom-material.module';



@NgModule({
  declarations: [
    LawyerFocDialogComponent,
    SafeHtmlPipe
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
export class AllLawyersFocModule { }
