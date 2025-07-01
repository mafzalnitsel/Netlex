// import { AboutUsComponent,SafeHtmlPipe } from './about-us.component';
// import { CreateAboutUsComponent } from './create-about-us/create-about-us.component'; 
// import { ViewAboutUsComponent } from './view-about-us/view-about-us.component'; 

import { ControlPanelTabComponent } from './control-panel-tab.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetlexCommonModule } from 'src/app/netlexcommon/netfexcommon.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatTabsModule } from '@angular/material/tabs';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { ActivityComponent } from './activity/activity.component';
import { IntegrationComponent } from './integration/integration.component';
import { CodesComponent } from './codes/codes.component';
import { ArticlesComponent } from './articles/articles.component';

@NgModule({
  declarations: [
    ControlPanelTabComponent,
    ControlPanelComponent,
    ActivityComponent,
    IntegrationComponent,
    CodesComponent,
    ArticlesComponent
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
    CdkAccordionModule,
    MatTabsModule
  ],
  exports: [ControlPanelTabComponent]
})
export class ControlPanelTabModule { }
