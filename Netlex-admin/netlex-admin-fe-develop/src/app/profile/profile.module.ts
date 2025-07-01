import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from './profile.component';
import {NetlexCommonModule} from '../netlexcommon/netfexcommon.module';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {RouterModule} from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";

//////////////////////------Busy_Time_Calender------//////////////////////
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { LawyerBusyTimeComponent } from './lawyer-busy-time/lawyer-busy-time.component';
FullCalendarModule.registerPlugins([
    dayGridPlugin,
    interactionPlugin
]);
////////////////////////------Busy_Time_Calender------//////////////////////

@NgModule({
  declarations: [
      ProfileComponent,
      LawyerBusyTimeComponent
  ],
  imports: [
    CommonModule,
    NetlexCommonModule,
    CommonModule,
    CustomMaterialModule,
    RouterModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    FullCalendarModule,
  ],
  exports: [
      ProfileComponent
  ],
})
export class ProfileModule { }
