import { LawyerComponent } from './lawyer.component';
import { ViewLawyerComponent } from './view-lawyer/view-lawyer.component';
import { CreateLawyerComponent } from './create-lawyer/create-lawyer.component';
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
import {EditorModule} from '@tinymce/tinymce-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    CreateLawyerComponent,
    ViewLawyerComponent,
      LawyerComponent,
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
        EditorModule,
        CKEditorModule,
        MatRadioModule,
    ]
})
export class LawyerModule { }
