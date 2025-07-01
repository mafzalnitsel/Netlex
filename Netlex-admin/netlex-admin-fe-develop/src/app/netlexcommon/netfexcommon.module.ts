import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {RouterModule} from '@angular/router';
import { ReloadPreventDialogComponent } from './reload-prevent-dialog/reload-prevent-dialog.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    NavbarComponent,
    ReloadPreventDialogComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    RouterModule,
    MatSidenavModule,
    CdkAccordionModule,
    MatExpansionModule
  ],
  exports: [NavbarComponent]
})
export class NetlexCommonModule { }
