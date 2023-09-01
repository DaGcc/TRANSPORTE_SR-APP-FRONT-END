import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '@auth/layout/auth-layout/auth-layout.component';
import { LoginComponent } from '@auth/pages/login/login.component';
import { CreateAcountComponent } from '@auth/pages/create-acount/create-acount.component';

const routes: Routes = [

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path : 'login',
        component: LoginComponent,
        data: { titulo:'Login', url: "/auth/login"  }
      },
      {
        path: 'create-acount',
        component:CreateAcountComponent,
        data: { titulo:'Sign-up', url: "/auth/login"  }
      }, 
      {
        path:'',
        redirectTo:'login',
        pathMatch: 'full'
      }

    ]
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
