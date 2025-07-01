import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogForPublishComponent, NyttAvtalComponent} from './nytt-avtal.component';
import {NetlexCommonModule} from '../netlexcommon/netfexcommon.module';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {EditorModule} from '@tinymce/tinymce-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IdComponentModule} from '../id-component/id-component.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
    declarations: [
        NyttAvtalComponent,
        DialogForPublishComponent
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
        MatRadioModule
    ]
})
export class NyttAvtalModule {
}
