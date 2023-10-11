import { Injectable } from '@angular/core';
import { UsuarioMapperImpl } from './mappers/usuario.mapper';
import { UsuarioEntity } from 'src/app/dominio/entities/usuario.entity';
import { Observable, map, EMPTY } from 'rxjs';
import { PageSpringBoot } from 'src/base/utils/page-spring-boot';
import { UsuarioRepository } from 'src/app/dominio/repositories/usuario.repository';
import { UsuarioModel } from './models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environments';
import { JwtOauth } from 'src/base/utils/jwt-oauth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRepositoryImplService extends UsuarioRepository {


  
  ususarioMapper = new UsuarioMapperImpl();

  url: string = `${environment.host}/usuarios`;
  urlAuth: string = `${environment.host}/oauth/token`;


  
  // ********************************************************************************************************
  //* ESTE METODO ES : Compartir Datos a través de un Servicio Común - necesita get y set
  //* Pues al ser un service provide in root, este es singleton
  //* es decir, que todo los componentes que inyecten a este servicio, accederan a la misma instancia del service: 
  
  private emailUserSingle : string | undefined;
  private UserRoleSingle : string[] | string | undefined;

  set email( usuarioEntity : string) {
    this.emailUserSingle = usuarioEntity;
  }

  get email(): string | undefined{
    return this.emailUserSingle;
  }

  set userRole( UserRoleSingle : string | string[] | undefined ) {
    this.UserRoleSingle = UserRoleSingle;
  }

  get userRole(): string | string[] | undefined{
    return this.UserRoleSingle;
  }
  //************************** END -  Compartir Datos a través de un Servicio Común ******************** */


  constructor(private http: HttpClient, private router :Router) { 
    super();
  }


  override create(usuario: UsuarioEntity): Observable<UsuarioEntity>{
    let usuarioModel = this.ususarioMapper.mapTo(usuario);//convertimos a la estructura de la api rest
    return this.http.post<UsuarioModel>(this.url, usuarioModel).pipe(map(c => {
      return this.ususarioMapper.mapFrom(c);//convertimos la respuesta del api rest en la estructura de negocio de la app
    }))
  }
  override readById(id: number): Observable<UsuarioEntity>{
    return EMPTY;
  }
  override readByPage(pageNumber: number, size: number): Observable<PageSpringBoot<UsuarioEntity>>{
    return EMPTY;
  }
  override update(id: number, usuario : UsuarioEntity): Observable<UsuarioEntity>{
    return EMPTY;
  }
  override deleteById(id: number, deep?: boolean): Observable<void>{
    return EMPTY;
  }

  override readByEmail(email: number): Observable<UsuarioEntity>{
    return EMPTY;
  }



  
  override login(email: string, password: string) : Observable<JwtOauth>{
    const body = `grant_type=password&username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    return this.http.post<JwtOauth>(this.urlAuth, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    });
  }


  isLogged(){
    return !!sessionStorage.getItem(environment.TOKEN_NAME)
  }

  signOut(route : string){
    sessionStorage.removeItem(environment.TOKEN_NAME);
    this.router.navigate([`${route}`]);
  }
  
}



/** 
 * ? DATO?:
 ** Si tu modulo de carga de forma peresoza, puedes optar por el metodo de "Compartir Datos a través de un Servicio Común"
 ** esto, si tu modulo a que tiene un componente que adquiere valores, lo quiere pasar a otro componente de otro modulo que recien se va a cargar(lazy)
 *
 * ! ------ Contra parte -------
 * 
 ** Pero usa Subject o BehaviorSubject, si los compoentes que se van a intercambiar info estan en el mismo modulo y ya cargados.
 */
