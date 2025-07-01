import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessTypeComponent } from './business-type.component';
import { ViewBusinessTypeComponent } from './view-business-type/view-business-type.component';
import { CreateBusinessTypeComponent } from './create-business-type/create-business-type.component';
import {NetlexCommonModule} from '../netlexcommon/netfexcommon.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {CustomMaterialModule} from '../custom-material/custom-material.module';

@NgModule({
  declarations: [
    BusinessTypeComponent,
    ViewBusinessTypeComponent,
    CreateBusinessTypeComponent,
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
        CustomMaterialModule
    ]
})
export class BusinessTypeModule { }
