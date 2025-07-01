import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogForWarnComponent, DocumentListComponent } from './document-list.component';
import { FlexModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { NetlexCommonModule } from '../netlexcommon/netfexcommon.module';
import { MatButtonModule } from '@angular/material/button';
import { DialogForPublishListComponent, DocumentDraftListComponent } from './document-draft-list/document-draft-list.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        DocumentListComponent,
        DialogForWarnComponent,
        DocumentDraftListComponent,
        DialogForPublishListComponent
    ],
    imports: [
        CommonModule,
        FlexModule,
        MatListModule,
        NetlexCommonModule,
        MatButtonModule,
        CustomMaterialModule,
        FormsModule
    ]
})
export class DocumentListModule {
}
