import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountSettingsComponent} from './account-settings.component';
import {CustomMaterialModule} from '../../netlex-common/custom-material/custom-material.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {TranslateModule} from '@ngx-translate/core';
import { SettingsComponent } from './settings/settings.component';
import {SettingsModule} from './settings/settings.module';
import {RouterModule} from '@angular/router';
import {RequestsModule} from './requests/requests.module';


@NgModule({
    declarations: [
        AccountSettingsComponent,
    ],
    imports: [
        CommonModule,
        CustomMaterialModule,
        MatExpansionModule,
        TranslateModule,
        SettingsModule,
        RouterModule,
        RequestsModule
    ]
})
export class AccountSettingsModule {
}
