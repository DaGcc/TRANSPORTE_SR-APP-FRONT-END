import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageSpringBoot } from '@base/utils/page-spring-boot';
import { MenuEntity } from '@dominio/entities/menu.entity';
import { MenuRepository } from '@dominio/repositories/menu.repository';
import { environment } from '@environments/environments';
import { EMPTY, Observable, Subject, map } from 'rxjs';
import { MenuModel } from './models/menu.model';
import { MenuMapperImpl } from './mappers/menu.mapper';

@Injectable({
  providedIn: 'root'
})
export class MenuRepositoryImplService extends MenuRepository {


  menuMapper : MenuMapperImpl = new MenuMapperImpl();

  
  url: string = `${environment.host}/menus`;

  menuCambio$ = new Subject<MenuEntity[]>();

  constructor(private http: HttpClient) { 
    super();
  }

  override create(usuario: MenuEntity): Observable<MenuEntity>{
    return EMPTY;
  }
  override readById(id: number): Observable<MenuEntity>{
    return EMPTY;
  }
  override readByPage(pageNumber: number, size: number): Observable<PageSpringBoot<MenuEntity>>{
    return EMPTY;
  }
  override update(id: number, usuario : MenuEntity): Observable<MenuEntity>{
    return EMPTY;
  }
  override deleteById(id: number, deep?: boolean): Observable<void>{
    return EMPTY;
  }

  override findAllUserMenuByRolWithEmail(email : string) : Observable<MenuEntity[]>{
    return this.http.get<MenuModel[]>(`${this.url}/usuario/${email}`).pipe(map( (response: MenuModel[]) => {
      console.log(response)
      let e :  MenuEntity[] = response.map( m => {
        return this.menuMapper.mapFrom({...m});//... para que no haga referencia al mismo objeto del array
      })
      return e;
    }))
  }

}
