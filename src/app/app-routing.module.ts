import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ResponseNotFoundComponent } from './shared/components/web/response-not-found/response-not-found.component';
import { ResponseForbiddenComponent } from './shared/components/web/response-forbidden/response-forbidden.component';
import { ResponseUnauthorizedComponent } from './shared/components/web/response-unauthorized/response-unauthorized.component';
import { AuthLayoutComponent } from '@auth/layout/auth-layout/auth-layout.component';
import { LoginComponent } from '@auth/pages/login/login.component';
import { CreateAcountComponent } from '@auth/pages/create-acount/create-acount.component';
import { HomeLayoutComponent } from './home/layout/home-layout/home-layout.component';
import { InicioComponent } from './home/pages/inicio/inicio.component';
import { GeolocalizacionComponent } from './home/pages/geolocalizacion/geolocalizacion.component';
import { CalendarioComponent } from './home/pages/calendario/calendario.component';

const routes: Routes = [

  // {
  //   path : 'auth',
  //   loadChildren : () => import('src/app/auth/auth.module').then( m => m.AuthModule ),
  //   data: { titulo:'Auth-M', url: "/auth", icon : null }
  // },

  {
    path: 'auth',
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

    ],
    data: { titulo:'Auth-M', url: "/auth", icon : null }
  },
 





  // {
  //   path: 'page',
  //   loadChildren: () => import('src/app/home/home.module').then( m => m.HomeModule ),
  //   data: { titulo: 'Page' , url: "/page", icon : 'layers' }
  // },


  {
    path: 'page',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'inicio',
        component : InicioComponent,
        data: { titulo:'Inicio', url: "/page/inicio",icon: 'home_app_logo'  }
      },
      {
        path: 'geolocalizacion',
        component : GeolocalizacionComponent,
        data: { titulo:'Geolocalización', url: "/page/geolocalizacion",icon: null }
      },
      {
        path: 'calendar',
        component: CalendarioComponent,
        data : { titulo:'Gestion de actividades', url: "/page/calendar",icon: null }
      },  
      {
        path:'',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ],
    data: { titulo: 'Page' , url: "/page", icon : 'layers' }
  },


  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path:'forbidden-403',
    component : ResponseForbiddenComponent,
    data: { titulo:'Forbidden-403', url: ""  }
  },
  {
    path:'unauthorized-401',
    component: ResponseUnauthorizedComponent,
    data: { titulo:'Unauthorized-401', url: ""  }
  },
  {
    path: '**',
    component: ResponseNotFoundComponent,
    data: { titulo:'Not-found-404', url: ""  }
    // component : ResponseNotFoundComponent
  },


  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
