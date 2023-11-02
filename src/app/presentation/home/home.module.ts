 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { HomeToolBarComponent } from './components/home-tool-bar/home-tool-bar.component';
import { RouterModule } from '@angular/router';
import { NavegationComponent } from './components/navegation/navegation.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FooterComponent } from './components/footer/footer.component';
import { CardTittleComponent } from './widgets/card-tittle/card-tittle.component';
import { ButtonElevatedComponent } from './widgets/button-elevated/button-elevated.component';
import { CardActionComponent } from './widgets/card-action/card-action.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/_material/material.module';
import { PrimengModule } from 'src/app/_primeng/primeng.module';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { SwitchDarkModeComponent } from 'src/app/shared/widgets/switch-dark-mode/switch-dark-mode.component';



@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomeToolBarComponent,
    NavegationComponent,
    CalendarComponent,
    FooterComponent,
    CardTittleComponent,
    ButtonElevatedComponent,
    CardActionComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,  
    RouterModule,
    FormsModule,
    MaterialModule,
    PrimengModule,
    BreadcrumbComponent,
    FullCalendarModule,
    SwitchDarkModeComponent
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
