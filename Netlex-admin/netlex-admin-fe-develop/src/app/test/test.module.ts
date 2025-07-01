import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestComponent } from './test.component';
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
import {MatProgressBarModule} from '@angular/material/progress-bar';
// import {MatChipsModule} from '@angular/material/chips';

@NgModule({
    declarations: [
        TestComponent
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
        MatRadioModule,
        MatProgressBarModule,
        // MatChipsModule,
        
    ],
})
export class TestModule {
}
