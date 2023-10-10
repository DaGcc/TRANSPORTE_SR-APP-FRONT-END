import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtOauth } from '@base/utils/jwt-oauth';
import { MenuEntity } from '@dominio/entities/menu.entity';
import { environment } from '@environments/environments';
import { MenuRepositoryImplService } from '@infraestructure/repositories/menu/menu-repository-impl.service';
import { UsuarioRepositoryImplService } from '@infraestructure/repositories/usuarios/usuario-repository-impl.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 

  //************* Inyecciones de dependencia *****************/

  usuarioService  = inject(UsuarioRepositoryImplService)
  menuService = inject(MenuRepositoryImplService)
  router = inject(Router)

  //**********************************************************/



  formGroup!: FormGroup


  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email : new FormControl(undefined, [Validators.email, Validators.required]),
      "password" : new FormControl(undefined, Validators.required)
    })
  }


  acceder(){
    //TODO: inicio de session

    this.usuarioService.login(this.formGroup.value.email,this.formGroup.value.password).subscribe({
      next: (data : JwtOauth) => {
        // console.log(data.access_token)

        const helper = new JwtHelperService();//*creamos una instancia del JwtHelperService, que es propio de la libreria auth0/angular-jwt
        
        sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);//*guardamos en el session estorage el token que vino como respuesta

        /**
         ** Gracias a la libreria auth0/angular-jwt podemos decodificar el toquen, para ver la metadata o payload,
         ** Ademas de que podemos ver si expiro o no.
         */
        let decodedToken = helper.decodeToken(data.access_token);

        console.log(decodedToken);

        this.menuService.findAllUserMenuByRolWithEmail(decodedToken.user_name).subscribe({
          next : (data:MenuEntity[]) => {
            console.log(data)
            
            this.router.navigate(['/page/inicio'])
          }
        });     
      }
    })
    
  }
}
