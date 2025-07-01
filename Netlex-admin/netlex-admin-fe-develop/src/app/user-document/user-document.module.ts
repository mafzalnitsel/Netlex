import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserDocumentComponent} from './user-document.component';
import {NetlexCommonModule} from '../netlexcommon/netfexcommon.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {NyttAvtalService} from '../services/nyttavtal.service';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
    declarations: [
        UserDocumentComponent,
    ],
    imports: [
        CommonModule,
        NetlexCommonModule,
        MatFormFieldModule,
        MatSelectModule,
        FlexModule,
        MatButtonModule,
        FormsModule,
        CustomMaterialModule,
        NgxSpinnerModule,
        MatTooltipModule,

    ],
    exports: [
        UserDocumentComponent,
    ],
    providers: [
        NyttAvtalService
    ]
})
export class UserDocumentModule {
}
