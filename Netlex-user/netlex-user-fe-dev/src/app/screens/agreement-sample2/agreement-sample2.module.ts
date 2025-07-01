import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomMaterialModule} from '../../netlex-common/custom-material/custom-material.module';
import {AgreementSample2Component, DialogForUserDetailComponent} from './agreement-sample2.component';
import {Router, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {TranslationsModule} from '../../netlex-common/translations/translations.module';


@NgModule({
    declarations: [AgreementSample2Component, DialogForUserDetailComponent,],
    imports: [
        CommonModule,
        CustomMaterialModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        TranslationsModule
    ]
})
export class AgreementSample2Module {
}
