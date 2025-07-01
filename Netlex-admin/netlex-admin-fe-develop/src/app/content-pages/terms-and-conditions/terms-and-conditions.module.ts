import { TermsAndConditionsComponent } from './terms-and-conditions.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


import { NetlexCommonModule } from 'src/app/netlexcommon/netfexcommon.module'; 
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module'; 


@NgModule({
  declarations: [
    TermsAndConditionsComponent,
  ],
    imports: [
        CommonModule,
        NetlexCommonModule,
        NgxPaginationModule,
        FormsModule,
        FlexModule,
        MatCardModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        RouterModule,
        MatButtonModule,
        CKEditorModule,
        CustomMaterialModule
    ],
    exports : [TermsAndConditionsComponent]
})
export class TermsAndConditionsModule { }
