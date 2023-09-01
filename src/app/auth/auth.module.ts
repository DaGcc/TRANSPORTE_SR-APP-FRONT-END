import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from '@auth/pages/login/login.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { CreateAcountComponent } from './pages/create-acount/create-acount.component';
import { RouterModule } from '@angular/router';


import { ButtonModule } from 'primeng/button';
import { MaterialModule } from '../_material/material.module';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthLayoutComponent,
    CreateAcountComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    MaterialModule,
    PasswordModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    BreadcrumbComponent
  ]
})
export class AuthModule { }
