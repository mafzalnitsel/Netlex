import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomMaterialModule} from '../../../netlex-common/custom-material/custom-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {RequestsComponent} from './requests.component';



@NgModule({
  declarations: [
    RequestsComponent
  ],
  exports: [
    RequestsComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    TranslateModule,
    FormsModule
  ]
})
export class RequestsModule { }
