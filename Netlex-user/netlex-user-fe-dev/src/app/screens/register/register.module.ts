import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from './register.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {TranslationsModule} from '../../netlex-common/translations/translations.module';
import {TranslateModule} from '@ngx-translate/core';
import { QRCodeModule } from 'angularx-qrcode';
import { RegisterProgressLoadingComponent } from './register-progress-loading/register-progress-loading.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
      RegisterComponent,
      RegisterProgressLoadingComponent
  ],
    imports: [
        CommonModule,
        FlexModule,
        MatCardModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        RouterModule,
        MatListModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatIconModule,
        TranslationsModule,
        ExtendedModule,
        TranslateModule,
        QRCodeModule,
        MatProgressBarModule,
        MatRadioModule,
        
    ],
  exports: [
      RegisterComponent,
      // RegisterProgressLoadingComponent
  ]
})
export class RegisterModule { }
