import { CreateActionComponent } from './create-action/create-action.component';
import { ViewActionComponent } from './view-action/view-action.component';
import { RoleActionComponent } from './role-action.component';



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {NetlexCommonModule} from '../netlexcommon/netfexcommon.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {CustomMaterialModule} from '../custom-material/custom-material.module';


@NgModule({
    declarations: [
        ViewActionComponent,
        CreateActionComponent,
        RoleActionComponent
     
    ],
      imports: [
          CommonModule,
          NetlexCommonModule,
          NgxPaginationModule,
          FormsModule,
          FlexModule,
          MatCardModule,
          MatCheckboxModule,
          MatSelectModule,
          MatInputModule,
          MatIconModule,
          RouterModule,
          MatButtonModule,
          CustomMaterialModule,
          ReactiveFormsModule
      ]
  })
  export class ActionModeule { }