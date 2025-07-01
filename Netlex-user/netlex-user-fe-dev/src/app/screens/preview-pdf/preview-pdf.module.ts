import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomMaterialModule} from "../../netlex-common/custom-material/custom-material.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {TranslationsModule} from "../../netlex-common/translations/translations.module";
import {TranslateModule} from "@ngx-translate/core";
import {PreviewPdfComponent} from "./preview-pdf.component";


@NgModule({
    declarations: [PreviewPdfComponent],
    imports: [
        CommonModule,
        CustomMaterialModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        PdfViewerModule,
        TranslationsModule,
        TranslateModule,

    ]
})
export class PreviewPdfModule {
}
