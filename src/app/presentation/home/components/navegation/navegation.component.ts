import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewChild, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { NavigationEnd, Router, UrlSegmentGroup, UrlTree } from '@angular/router';
import { SidenavService } from './../../services/sidenav.service';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { DarkModeService } from '@shared/widgets/switch-dark-mode/dark-mode.service';
import { MenuRepositoryImplService } from '@infraestructure/repositories/menu/menu-repository-impl.service';
import { MenuEntity } from '@dominio/entities/menu.entity';
import { UsuarioRepositoryImplService } from '@infraestructure/repositories/usuarios/usuario-repository-impl.service';

@Component({
  selector: 'component-navegation',
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.scss']
})
export class NavegationComponent implements OnInit {

  //****************** INYECCIONES DE DEPENDENCIA *******************/

  menuService = inject(MenuRepositoryImplService);
  usuarioService = inject(UsuarioRepositoryImplService);
  darkModeService = inject(DarkModeService);
  sidenavService = inject(SidenavService);

  //*****************************************************************/



  pixelResponsive: number = 900

  @Input()
  public getScreenWidth: any;

  @Input()
  public getScreenHeight: any;

  @ViewChild('drawer') drawer!: MatDrawer;


  menus : MenuEntity[] = [];
  emailUser : string  | undefined;
  roles : string | string[] | undefined;

  // public ish$! : Observable<boolean>; 


  constructor() {
    // this.ish$ = this.sidenavService.isHandset$;
    // this.menuService.menuCambio$.subscribe({
    //   next: (data: MenuEntity[]) => {
        
    //     this.menus = data;
    //   }
    // })
    this.emailUser = this.usuarioService.email;
    this.roles = this.usuarioService.userRole;

    this.menus = this.menuService.menus;
  }

  // get isHandset$(){
  //   return this.sidenavService.isHandset$;
  // }

  ngOnInit(): void {
    this.sidenavService.sidenavCambio.subscribe({
      next: () => {
        this.drawer.toggle()
      }
    })

    // console.log(this.menus)
    // console.log( this.menuService.menus)
  }



  // onActivate(event: Event) {
  //   // window.scroll(0,0);
  //   // window.scroll({ 
  //   //         top: 0, 
  //   //         left: 0, 
  //   //         behavior: 'smooth' 
  //   //  });

  //   document.body.scrollTop = 0;
  //   //or document.querySelector('body').scrollTo(0,0)
  // }

}
