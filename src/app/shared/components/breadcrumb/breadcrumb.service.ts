import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';


interface item { ruta: string, bread: string, icon?: string }

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

   titulo: string | undefined;
   lista: item[] = [];


  l: any[] = []




  constructor( private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter((event : any)=>{

        // console.log(event)
        if (event instanceof ActivationEnd && event.snapshot.component !== null && event.snapshot.firstChild === null) {
          
          document.title = `APP - ${event.snapshot.data['titulo']}`;
          this.titulo = event.snapshot.data['titulo']
          
          // return { titulo: data.snapshot.data['titulo'], url : data.snapshot.data['url'] }
        }

        return event instanceof NavigationEnd ? true : false ; 
 
      })
    ).subscribe({
      next : (data : NavigationEnd) => {
        this.construirBreadcrumb(this.route.root)
        // console.log(this.route.root)
      }
    })
  }

  construirBreadcrumb(route: ActivatedRoute | null) {

    this.lista = [];

    while (route) {
      // console.log(route)
      // console.log(route.component !== null)
      if ( route.component !== null){
        //el appcompoenent no tiene data, por ende en el pirmer pagetittle saldra undefined, pero no es de preocupacion
        
        const pageTitle = route?.snapshot?.data['titulo'];
        // const url = route?.snapshot?.url.map((segment) => segment.path).join('/');
        const url = route?.snapshot?.data['url'];
        const icon = route?.snapshot.data['icon']
        // console.table({ bread: pageTitle, ruta: url }) //saldra en primera instancia undefined por lo mencionado anteriormente
        // console.log(pageTitle && url)
        if (pageTitle && url) {
          // console.table({ bread: pageTitle, ruta: url, icon }) 
          // this.lista.unshift({ bread: pageTitle, ruta: '/' + url });
          this.lista.push({ bread: pageTitle, ruta: url, icon });
        }
        // console.log(this.lista)

      }
      

      //busca al ultimo
      route = route.firstChild;
    }
  }

}
