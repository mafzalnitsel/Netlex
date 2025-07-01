import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateUserComponent} from './create-user/create-user.component';
import {ViewUserComponent} from './view-user/view-user.component';
import {UserComponent} from './user.component';
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
import { MatRadioModule } from '@angular/material/radio';
import {EditorModule} from '@tinymce/tinymce-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    CreateUserComponent,
    ViewUserComponent,
      UserComponent,
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
        EditorModule,
        CKEditorModule
    ]
})
export class UserModule { }
