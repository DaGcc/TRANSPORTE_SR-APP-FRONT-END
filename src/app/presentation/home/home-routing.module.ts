import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { guardFn } from '@shared/guard/guard-fn';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'inicio',
        loadComponent : () => import('./pages/inicio/inicio.component').then( m => m.InicioComponent ),
        data: { titulo:'Inicio', url: "/page/inicio",icon: 'home_app_logo'  },
        canActivate : [guardFn]
      },
      {
        path: 'facturas',
        loadComponent : () => import('./pages/facturas/facturas.component').then( m => m.FacturasComponent ),
        data: { titulo: 'Gestion de Facturas y Orden de servicio', url : '/page/factura' },
        canActivate: [guardFn]
      },
      {
        path: 'geolocalizacion',
        loadComponent : () => import('./pages/geolocalizacion/geolocalizacion.component').then( m => m.GeolocalizacionComponent ),
        data: { titulo:'Geolocalización', url: "/page/geolocalizacion",icon: null },
        canActivate : [guardFn]
      },
      {
        path: 'calendar',
        loadComponent: () => import('./pages/calendario/calendario.component').then( m => m.CalendarioComponent ),
        data : { titulo:'Gestion de actividades', url: "/page/calendar",icon: null },
        canActivate : [guardFn]
      },
      {
        path: 'trabajadores',
        loadComponent: () => import('./pages/trabajadores/trabajadores.component').then( m => m.TrabajadoresComponent ),
        data : { titulo:'Gestion de trabajadores', url: "/page/trabajadores",icon: null },
        canActivate : [guardFn]
      }, 
      {
        path: 'clientes',
        loadComponent: () => import('./pages/clientes/clientes.component').then( m => m.ClientesComponent ),
        data : { titulo:'Gestion de clientes', url: "/page/clientes",icon: null },
        canActivate : [guardFn]
      }, 
      {
        path: 'envio-solicitud',
        loadComponent: () => import('./pages/solicitud/solicitud.component').then( m => m.SolicitudComponent ),
        data :  { titulo:'Envio de Solicitud', url: "/page/envio-solicitud",icon: null },
        canActivate : [guardFn]
      },
      {
        path: 'solicitudes',
        loadComponent : () => import("./pages/gestion-solicitud/gestion-solicitud.component").then( m => m.GestionSolicitudComponent ),
        data : { titulo: "Gestion de solicitudes", url: "/page/solicitudes", icon : null },
        canActivate : [guardFn]
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/perfil-user/perfil-user.component').then( m => m.PerfilUserComponent ),
        data : { titulo:'Perfil de usuario', url: "/page/perfil",icon: null },
        canActivate : [guardFn]
      },
      {
        path: 'flota',
        loadComponent: () => import("./pages/gestion-flota/gestion-flota.component").then( m => m.GestionFlotaComponent ),
        data : { titulo:'Gestion de las flotas', url: "/page/flota",icon: null },
        canActivate : [guardFn]
      },
      {
        path: 'dashboard',
        loadComponent : () => import("./pages/dashboard/dashboard.component").then( m => m.DashboardComponent ),
        data : { titulo:'Dashboard admin', url: "/page/dashboard",icon: null },
        canActivate : [guardFn]
      },
      {
        path : 'activities',
        loadComponent : () => import("./pages/gestion-actividades/gestion-actividades.component").then( m => m.GestionActividadesComponent ),
        data : { titulo:'Gestion de las actividades', url: "/page/activities",icon: null },
        canActivate : [guardFn]
      },
      {
        path : 'chat',
        loadComponent : () => import("./pages/chat/chat.component").then( m => m.ChatComponent ),
        data : { titulo:'Chat global', url: "/page/chat",icon: null },
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
