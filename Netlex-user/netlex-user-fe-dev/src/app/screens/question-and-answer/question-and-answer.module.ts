import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionAndAnswerComponent,SafeHtmlPipe } from './question-and-answer.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {CustomMaterialModule} from "../../netlex-common/custom-material/custom-material.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    QuestionAndAnswerComponent,SafeHtmlPipe
  ],
    imports: [
        CommonModule,
        MatExpansionModule,
        CustomMaterialModule,
        RouterModule
    ]
})
export class QuestionAndAnswerModule { }
