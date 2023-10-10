import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "@environments/environments";
import { MenuRepositoryImplService } from "@infraestructure/repositories/menu/menu-repository-impl.service";
import { UsuarioRepositoryImplService } from "@infraestructure/repositories/usuarios/usuario-repository-impl.service";
import { MenuEntity } from '@dominio/entities/menu.entity';
import { map } from "rxjs";

export const guardFn: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    //****************INYECCIONES DE DEPENDENCIA *****************/
    const usuarioService = inject(UsuarioRepositoryImplService)
    const menuService = inject(MenuRepositoryImplService)
    const snackBar = inject(MatSnackBar);
    const router = inject(Router)
    //***********************************************************

    const helper = new JwtHelperService();
    let rpta = usuarioService.isLogged();

    if (rpta) { //* si esta logeado => hay un token en el session storage

        let token: string = sessionStorage.getItem(environment.TOKEN_NAME)!;//se que si va a venir un token

        if (!helper.isTokenExpired(token)) {//* si el token aun no esta expirado

            console.log(state.url)
            let url = state.url;//*estado de la url donde actual

            let decodedToken = helper.decodeToken(token);//*decodificamos el token jwt que esta en base64


            return menuService.findAllUserMenuByRolWithEmail(decodedToken.email).pipe(map((menus: MenuEntity[]) => {
                menuService.menuCambio$.next(menus);
                let bd: boolean = false;
                for (let menu of menus) {
                    if (menu.url.length > 0 && menu.url !== './') {
                        if (menu.url.startsWith(url)) {
                            bd = true;
                            break;
                        } else {
                            bd = false;
                        }
                    } else {
                        bd = false;
                    }
                }

                if (bd) {
                    return bd;
                } else {
                    //prohibido - forbidden 403
                    router.navigate(['forbidden-403']);
                    return false;
                }
            }))

        } else {
            usuarioService.signOut('unauthorized-401');
        }

        return true;
    } else { //* si no esta logeado  => no existe un toke en el session storage

        snackBar.open('NO SE ENCUENTRA AUTENTICADO', 'Uuuy..!', {
            duration: 2000
        })

        setTimeout(() => {
            router.navigate(['unauthorized-401']);//mandar a login o tener un template de 401 Unauthorized=>carecer de credenciales
        }, 500)

        return false;
    }

}