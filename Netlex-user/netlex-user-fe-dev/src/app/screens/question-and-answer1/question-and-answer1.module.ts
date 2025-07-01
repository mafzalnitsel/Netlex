import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionAndAnswer1Component,SafeHtmlPipe } from './question-and-answer1.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {CustomMaterialModule} from "../../netlex-common/custom-material/custom-material.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    QuestionAndAnswer1Component,SafeHtmlPipe
  ],
    imports: [
        CommonModule,
        MatExpansionModule,
        CustomMaterialModule,
        RouterModule
    ]
})
export class QuestionAndAnswer1Module { }
