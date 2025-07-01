import { HomeComponent } from './home.component'; 

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
import { MatRadioModule } from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [
    HomeComponent
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
        CustomMaterialModule,
        MatRadioModule,
        MatSliderModule
    ],
    exports : [HomeComponent]
})
export class HomeModule { }
