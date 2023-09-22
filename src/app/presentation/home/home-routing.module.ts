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
        path: 'geolocalizacion',
        loadComponent : () => import('./pages/geolocalizacion/geolocalizacion.component').then( m => m.GeolocalizacionComponent ),
        data: { titulo:'Geolocalización', url: "/page/geolocalizacion",icon: null }
      },
      {
        path: 'calendar',
        loadComponent: () => import('./pages/calendario/calendario.component').then( m => m.CalendarioComponent ),
        data : { titulo:'Gestion de actividades', url: "/page/calendar",icon: null }
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
