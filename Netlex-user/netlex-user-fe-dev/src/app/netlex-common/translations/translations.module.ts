import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

import { TranslationsComponent } from './translations.component';

@NgModule({
  declarations: [TranslationsComponent],
  exports: [
    TranslationsComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
  ]
})
export class TranslationsModule {
}
