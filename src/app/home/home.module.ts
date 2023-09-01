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


@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomeToolBarComponent,
    NavegationComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,  
    RouterModule,
    MaterialModule,
    PrimengModule,
    BreadcrumbComponent
  ]
})
export class HomeModule { }
