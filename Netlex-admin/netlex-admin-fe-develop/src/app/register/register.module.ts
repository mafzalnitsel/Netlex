import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from './register.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [
      RegisterComponent
  ],
    imports: [
        CommonModule,
        FlexModule,
        MatCardModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        RouterModule,
        MatListModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
  exports: [
  ]
})
export class RegisterModule { }
