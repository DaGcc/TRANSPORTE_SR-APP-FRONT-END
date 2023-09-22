import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { CreateAcountComponent } from './pages/create-acount/create-acount.component';


import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { MaterialModule } from 'src/app/_material/material.module';

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
