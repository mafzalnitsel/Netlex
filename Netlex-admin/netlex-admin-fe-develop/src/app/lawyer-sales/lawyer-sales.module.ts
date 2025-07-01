import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { SalesComponent } from '../sales/sales.component';
import { LawyerSalesComponent } from './lawyer-sales.component';
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
    // SalesComponent,
    LawyerSalesComponent
  ],
  imports: [
    CommonModule,
    NetlexCommonModule,
    NgxPaginationModule,
    FormsModule,
    // NgSelectModule,
    // FlexModule,
    // MatCardModule,
    // MatSelectModule,
    // MatInputModule,
    // MatIconModule,
    RouterModule,
    // MatButtonModule,
    CustomMaterialModule
  ]
})
export class LawyerSalesModule { }
