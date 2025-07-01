import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsComponent} from './settings.component';
import {CustomMaterialModule} from '../../../netlex-common/custom-material/custom-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    SettingsComponent
  ],
  exports: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    TranslateModule,
    FormsModule
  ]
})
export class SettingsModule { }
