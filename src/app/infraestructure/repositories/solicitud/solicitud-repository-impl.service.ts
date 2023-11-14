import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageSpringBoot } from '@base/utils/page-spring-boot';
import { SolicitudEntity } from '@dominio/entities/solicitud.entity';
import { SolicitudRepository } from '@dominio/repositories/solicitud.repository';
import { Observable, EMPTY, Subject } from 'rxjs';
import { SolicitudMapperImpl } from './mappers/solicitud.mapper';
import { SolicitudModel } from './models/solicitud.model';
import { environment } from '@environments/environments';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudRepositoryImplService extends SolicitudRepository {

  mapperSolicitud : SolicitudMapperImpl = new SolicitudMapperImpl();

  solicitudCambio = new Subject<PageSpringBoot<SolicitudEntity>>();
  
  url: string = `${environment.host}/solicitudes`;


  constructor(private http: HttpClient) {
    super();
  }

  /**
   ** Funcion para crear un solicitud
   * @param e 
   * @returns 
   */
  override create(e : SolicitudEntity): Observable<SolicitudEntity>{
    this.mapperSolicitud.mapTo(e);
    return this.http.post<SolicitudModel>(`${this.url}`, e).pipe(map( data => {
      return this.mapperSolicitud.mapFrom(data);
    }))
  };

  override readById(id: number): Observable<SolicitudEntity>{
    return EMPTY;
  };

  override readByPage(pageNumber: number, size: number,
    options?: {
      estado: '0' | '1' | '2'
    }
  ): Observable<PageSpringBoot<SolicitudEntity>> {
    return this.http
      .get<PageSpringBoot<SolicitudModel>>(`${this.url}/detach/paginado?estado=${options?.estado || '2'}&page=${pageNumber}&size=${size}&sort=idSolicitud,desc`)
      .pipe(map(d => {
        //??destructuración AND "..." propagación 
        let { content, ...otherProperties } = d;
        let pe: PageSpringBoot<SolicitudEntity> = {
          content: d.content.map(m => { //* tranformamos cada elemento model a un entity
            return this.mapperSolicitud.mapFrom(m);
          }),
          ...otherProperties //*propagacion del objeto
        };
        return pe;
      }))
  };


  /**
   ** Data update  function. 
   * 
   * @param id 
   * @param e 
   * @returns An `Observable` type `SolicitudEntity`
   */
   override update(id: number, o: SolicitudEntity): Observable<SolicitudEntity> {
    let clienteModel = this.mapperSolicitud.mapTo(o)
    return this.http.put<SolicitudModel>(`${this.url}/${id}`, clienteModel, {
    }).pipe(map(s => {
      return this.mapperSolicitud.mapFrom(s) //* convertimos la respuesta del api rest en la estructura de negocio de la app
    }))
  }

  /**
   ** Function to delete data in two ways.
   ** The params is important, except from `deep`.
   * @param id 
   * @param deep 
   * @returns void, because the server emit status 204_HTTP.
   */
   override deleteById(id: number, deep?: boolean | undefined): Observable<void> {
    return this.http.delete<void>(`${this.url}/detach/${id}?deep=${deep}`);
  }


}

