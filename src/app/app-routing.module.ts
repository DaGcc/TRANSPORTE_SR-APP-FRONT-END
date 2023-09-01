import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ResponseNotFoundComponent } from './shared/components/web/response-not-found/response-not-found.component';

const routes: Routes = [

  {
    path : 'auth',
    loadChildren : () => import('src/app/auth/auth.module').then( m => m.AuthModule ),
    data: { titulo:'Auth-M', url: "/auth", icon : null }
  },
  {
    path: 'page',
    loadChildren: () => import('src/app/home/home.module').then( m => m.HomeModule ),
    data: { titulo: 'Page' , url: "/page", icon : 'layers' }
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path:'forbidden-403',
    loadComponent : () => import('src/app/shared/components/web/response-forbidden/response-forbidden.component').then( m => m.ResponseForbiddenComponent ),
    data: { titulo:'Forbidden-403', url: ""  }
  },
  {
    path:'unauthorized-401',
    loadComponent : () => import('src/app/shared/components/web/response-unauthorized/response-unauthorized.component').then( m => m.ResponseUnauthorizedComponent ),
    data: { titulo:'Unauthorized-401', url: ""  }
  },
  {
    path: '**',
    loadComponent : () => import('src/app/shared/components/web/response-not-found/response-not-found.component').then( m => m.ResponseNotFoundComponent ),
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
