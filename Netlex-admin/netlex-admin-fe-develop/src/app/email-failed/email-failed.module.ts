import { EmailFailedComponent
  // ,SafeHtmlPipe
 } from './email-failed.component';
import { EditEmailFailedComponent } from './edit-email-failed/edit-email-failed.component'; 
import { ViewEmailFailedComponent } from './view-email-failed/view-email-failed.component'; 

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
import { EmailAgainModalComponent } from './email-again-modal/email-again-modal.component';


@NgModule({
  declarations: [
    EmailFailedComponent,
    // SafeHtmlPipe,
    EditEmailFailedComponent,
    ViewEmailFailedComponent, 
    EmailAgainModalComponent
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
        CKEditorModule
    ],
    // exports : [EmailFailedComponent]
})
export class EmailFailedModule { }
