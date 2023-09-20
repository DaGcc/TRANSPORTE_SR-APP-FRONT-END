import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from '@auth/pages/login/login.component';
import { AuthLayoutComponent } from '@auth/layout/auth-layout/auth-layout.component';
import { CreateAcountComponent } from '@auth/pages/create-acount/create-acount.component';
import { PrimengModule } from './_primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { MaterialModule } from './_material/material.module';
import { HomeLayoutComponent } from './home/layout/home-layout/home-layout.component';
import { HomeToolBarComponent } from './home/components/home-tool-bar/home-tool-bar.component';
import { NavegationComponent } from './home/components/navegation/navegation.component';
import { CalendarComponent } from './home/components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarioComponent } from './home/pages/calendario/calendario.component';
import { InicioComponent } from './home/pages/inicio/inicio.component';
import { GeolocalizacionComponent } from './home/pages/geolocalizacion/geolocalizacion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthLayoutComponent,
    CreateAcountComponent,
    

    HomeLayoutComponent,
    HomeToolBarComponent,
    NavegationComponent,
    CalendarComponent,
    CalendarioComponent,
    InicioComponent,
    GeolocalizacionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PrimengModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BreadcrumbComponent,
    FullCalendarModule
  ],
  exports: [
    
  ],

  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
