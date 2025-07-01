import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationsModule } from '../../netlex-common/translations/translations.module';
import { HomeComponent, SafeHtmlPipe } from './home.component';
import { CustomMaterialModule } from '../../netlex-common/custom-material/custom-material.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { LawyersInHomeComponent } from './lawyers-in-home/lawyers-in-home.component';
import { Sample3Component } from './sample3/sample3.component';
import { Sample4Component } from './sample4/sample4.component';
// import {CarouselModule} from 'primeng/carousel';
// import { OwlModule } from 'ngx-owl-carousel';
// import { CarouselModule } from 'ngx-owl-carousel-o';
// import { FooterComponent } from '../../netlex-common/footer/footer.component';
import { LawyersInHomeDialogComponent } from './lawyers-in-home/lawyers-in-home-dialog/lawyers-in-home-dialog.component'

@NgModule({
    declarations: [
        HomeComponent, SafeHtmlPipe, LawyersInHomeComponent , Sample3Component, Sample4Component,
        // FooterComponent,
        LawyersInHomeDialogComponent,
    ],
    imports: [
        CommonModule,
        TranslationsModule,
        CustomMaterialModule,
        RouterModule,
        TranslateModule,
        FormsModule,
        // CarouselModule,
        // OwlModule,
        // CarouselModule 
    ],
    exports: [
        // NavbarComponent,
        // FooterComponent
    ],
})
export class HomeModule {
}
