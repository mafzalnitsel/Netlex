import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogForPublishComponent, BusinessAgreementsComponent} from './business-agreements.component';
import {NetlexCommonModule} from '../netlexcommon/netfexcommon.module';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {EditorModule} from '@tinymce/tinymce-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IdComponentModule} from '../id-component/id-component.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {FlexModule} from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {BusinessAgreementsService} from '../services/businessAgreement.service';
import { ListBusinessAgreementsComponent,DialogForWarnComponent } from './list-business-agreements/list-business-agreements.component';
import { DraftsBusinessAgreementsComponent } from './drafts-business-agreements/drafts-business-agreements.component';

@NgModule({
    declarations: [
        BusinessAgreementsComponent,
        DialogForPublishComponent,
        ListBusinessAgreementsComponent,
        DialogForWarnComponent,
        DraftsBusinessAgreementsComponent,
    ],
    imports: [
        CommonModule,
        NetlexCommonModule,
        CustomMaterialModule,
        ScrollingModule,
        EditorModule,
        FormsModule,
        IdComponentModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatTooltipModule,
        CKEditorModule,
        FlexModule,
        MatListModule,
        MatButtonModule,
        RouterModule,
    ],
})
export class BusinessAgreementsModule {
}
