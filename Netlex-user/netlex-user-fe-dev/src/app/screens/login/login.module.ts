import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {TranslationsModule} from '../../netlex-common/translations/translations.module';
import {TranslateModule} from '@ngx-translate/core';
import {CustomMaterialModule} from '../../netlex-common/custom-material/custom-material.module';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CustomMaterialModule,
        CommonModule,
        FlexModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        TranslationsModule,
        TranslateModule,
        ExtendedModule,
        QRCodeModule
    ]
})
export class LoginModule {
}
