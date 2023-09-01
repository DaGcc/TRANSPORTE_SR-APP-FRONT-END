import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'inicio',
        loadComponent : () => import('./pages/inicio/inicio.component').then( m => m.InicioComponent ),
        data: { titulo:'Inicio', url: "/page/inicio",icon: 'home_app_logo'  }
      },
      {
        path:'',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
    // data: { titulo:'Auth-M', url: "/auth"  }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
