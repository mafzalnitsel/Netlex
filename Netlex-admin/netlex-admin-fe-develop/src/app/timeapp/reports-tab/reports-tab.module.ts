// import { AboutUsComponent,SafeHtmlPipe } from './about-us.component';
// import { CreateAboutUsComponent } from './create-about-us/create-about-us.component'; 
// import { ViewAboutUsComponent } from './view-about-us/view-about-us.component'; 

import { ReportsTabComponent } from './reports-tab.component';
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
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatTabsModule} from '@angular/material/tabs';
import { ReportsComponent } from './reports/reports.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    ReportsTabComponent,
    ReportsComponent,
    ChartComponent
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
        CKEditorModule,
        CdkAccordionModule,
        MatTabsModule
    ],
    exports : [ReportsTabComponent,ReportsComponent,ChartComponent]
})
export class ReportsTabModule { }
