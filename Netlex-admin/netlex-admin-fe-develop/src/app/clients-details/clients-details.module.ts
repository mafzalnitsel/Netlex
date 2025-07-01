import { ClientsDetailsComponent } from './clients-details.component';
import { ViewClientsDetailsComponent } from './view-clients-details/view-clients-details.component';
import { CreateClientsDetailsComponent } from './create-clients-details/create-clients-details.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {MatTabsModule} from '@angular/material/tabs';
import { NewUserRequestsComponent } from './new-user-requests/new-user-requests.component';
import { PurchaseAgreementRequestsComponent } from './purchase-agreement-requests/purchase-agreement-requests.component';
import { ClientsDetailsQuestionsComponent } from './clients-details-questions/clients-details-questions.component';
import { CheckInClientsDetailsComponent } from './purchase-agreement-requests/check-in-clients-details/check-in-clients-details.component';

@NgModule({
  declarations: [
    ClientsDetailsComponent,
    ViewClientsDetailsComponent,
    CreateClientsDetailsComponent,
    NewUserRequestsComponent,
    PurchaseAgreementRequestsComponent,
    ClientsDetailsQuestionsComponent,
    CheckInClientsDetailsComponent
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
        MatTabsModule
    ]
})
export class ClientsDetailsModule { }
