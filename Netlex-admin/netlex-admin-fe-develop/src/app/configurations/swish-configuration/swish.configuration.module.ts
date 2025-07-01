import { SwishConfigurationComponent } from './swish-configuration.component'; 
import { UpdateModalComponent } from './update-modal/update-modal.component'; 

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    SwishConfigurationComponent,
    UpdateModalComponent
  ],
    imports: [
        CommonModule,
        NetlexCommonModule,
        NgxPaginationModule,
        FormsModule,
        FlexModule,
        MatCardModule,
        // MatSelectModule,
        MatInputModule,
        MatIconModule,
        RouterModule,
        MatButtonModule,
        // CustomMaterialModule
    ],
    exports : [SwishConfigurationComponent]
})
export class SwishConfigurationModule { }
