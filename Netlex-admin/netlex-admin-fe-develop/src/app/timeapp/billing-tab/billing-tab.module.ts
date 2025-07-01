import { BillingTabComponent } from './billing-tab.component';
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
import { MatTabsModule } from '@angular/material/tabs';
import { BillingComponent } from './billing/billing.component';
import { TemplatesComponent } from './templates/templates.component';
import { SettingComponent } from './setting/setting.component';
import { CastInvoicesComponent } from './cast-invoices/cast-invoices.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@NgModule({
  declarations: [
    BillingTabComponent,
    BillingComponent,
    TemplatesComponent,
    SettingComponent,
    CastInvoicesComponent
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
        MatTabsModule,
        CdkAccordionModule
    ],
    exports : [BillingTabComponent]
})
export class BillingTabModule { }
