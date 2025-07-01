import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomMaterialModule} from './custom-material/custom-material.module';
import {DialogComponent} from './dialog/dialog.component';
import {DialogModule} from './dialog/dialog.module';
import {UtilService} from '../services/util.service';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {TranslationsModule} from './translations/translations.module';
import {TranslateModule} from '@ngx-translate/core';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        CustomMaterialModule,
        DialogModule,
        RouterModule,
        TranslationsModule,
        TranslateModule,
    ],
    exports: [
        NavbarComponent,
        FooterComponent
    ],
    providers: [UtilService]
})
export class NetlexCommonModule {
}
