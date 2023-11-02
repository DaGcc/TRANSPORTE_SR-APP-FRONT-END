import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageSpringBoot } from '@base/utils/page-spring-boot';
import { SolicitudEntity } from '@dominio/entities/solicitud.entity';
import { SolicitudRepository } from '@dominio/repositories/solicitud.repository';
import { Observable, EMPTY } from 'rxjs';
import { SolicitudMapperImpl } from './mappers/solicitud.mapper';
import { SolicitudModel } from './models/solicitud.model';
import { environment } from '@environments/environments';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudRepositoryImplService extends SolicitudRepository {

  mapperSolicitud : SolicitudMapperImpl = new SolicitudMapperImpl();

  
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

  override readByPage(pageNumber: number, size: number, options? : {}): Observable<PageSpringBoot<SolicitudEntity>>{
    return EMPTY;
  };

  override update(id: number, e : SolicitudEntity): Observable<SolicitudEntity>{
    return EMPTY;
  };

  override deleteById(id: number, deep?: boolean): Observable<void>{
    return EMPTY;
  };

}

