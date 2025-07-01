import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewPdfComponent} from './view-Pdf.component';
import {NetlexCommonModule} from '../netlexcommon/netfexcommon.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {NyttAvtalService} from '../services/nyttavtal.service';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
    declarations: [
        ViewPdfComponent,
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
        ViewPdfComponent,
    ],
    providers: [
        NyttAvtalService
    ]
})
export class ViewPdfModule {
}
