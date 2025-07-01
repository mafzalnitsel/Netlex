import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentpageComponent,} from './contentpage.component';
import {NetlexCommonModule} from '../netlexcommon/netfexcommon.module';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {EditorModule} from '@tinymce/tinymce-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IdComponentModule} from '../id-component/id-component.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ContenteditComponent } from './contentedit/contentedit.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterModule} from '@angular/router';



@NgModule({
    declarations: [
        ContentpageComponent,
        ContenteditComponent
        

        
        
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgxPaginationModule,
        NetlexCommonModule,
        CustomMaterialModule,
        ScrollingModule,
        EditorModule,
        FormsModule,
        IdComponentModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatTooltipModule,
        CKEditorModule
    ]
})
export class Contentpagemodule {
}
