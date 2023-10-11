
import { Component, inject } from '@angular/core';

import { SidenavService } from '../../services/sidenav.service';
import { DarkModeService } from '@shared/widgets/switch-dark-mode/dark-mode.service';
import { UsuarioRepositoryImplService } from '@infraestructure/repositories/usuarios/usuario-repository-impl.service';
import { Router } from '@angular/router';

@Component({
  selector: 'component-home-tool-bar',
  templateUrl: './home-tool-bar.component.html',
  styleUrls: ['./home-tool-bar.component.scss']
})
export class HomeToolBarComponent {
  


  //****************INYECCIONES DE DEPENDENCIA *****************/
  usuarioService  = inject(UsuarioRepositoryImplService)
  router = inject(Router)
  //************************************************************/


  // isHandset$ :  Observable<boolean> ;
  // constructor(private sidenavService : SidenavService ){
  //     this.isHandset$ = this.sidenavService.isHandset$;
  //     console.log(this.isHandset$)
  // }


  constructor(public sidenavService : SidenavService, public darkModeService : DarkModeService ){

  }

  toggle(){
    this.sidenavService.sidenavCambio.next();
    // this.sidenavService.sdCambio.set(true);
  }



  get isLogged(){
    return this.usuarioService.isLogged();
  }


  singOut(){
    return this.usuarioService.signOut('/auth/login');
  }
  
}
