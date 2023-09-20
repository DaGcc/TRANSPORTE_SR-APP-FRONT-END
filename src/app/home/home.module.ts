 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { HomeToolBarComponent } from './components/home-tool-bar/home-tool-bar.component';
import { MaterialModule } from '../_material/material.module';
import { RouterModule } from '@angular/router';
import { NavegationComponent } from './components/navegation/navegation.component';
import { PrimengModule } from '../_primeng/primeng.module';
import { BreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { CardTittleComponent } from './widgets/card-tittle/card-tittle.component';
import { ButtonElevatedComponent } from './widgets/button-elevated/button-elevated.component';
import { CardActionComponent } from './widgets/card-action/card-action.component';


@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomeToolBarComponent,
    NavegationComponent,
    CalendarComponent,
    FooterComponent,
    CardTittleComponent,
    ButtonElevatedComponent,
    CardActionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,  
    RouterModule,
    FormsModule,
    MaterialModule,
    PrimengModule,
    BreadcrumbComponent,
    FullCalendarModule
  ],
  exports:[
    CalendarComponent,
    FooterComponent,
    CardTittleComponent,
    ButtonElevatedComponent,
    CardActionComponent
  ]
})
export class HomeModule { }
