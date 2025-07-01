import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomepageComponent} from './homepage.component';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {NetlexCommonModule} from '../netlexcommon/netfexcommon.module';
import {RouterModule} from '@angular/router';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [HomepageComponent],
    imports: [
        CommonModule,
        CustomMaterialModule,
        NetlexCommonModule,
        RouterModule,
        CdkAccordionModule,
        MatExpansionModule
    ]
})
export class HomepageModule { }
