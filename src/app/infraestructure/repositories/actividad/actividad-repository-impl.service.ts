import { Injectable } from '@angular/core';
import { PageSpringBoot } from '@base/utils/page-spring-boot';
import { ActividadEntity } from '@dominio/entities/actividad.entity';
import { ActividadRepository } from '@dominio/repositories/actividad.repository';
import { environment } from '@environments/environments';
import { EMPTY, Observable, Subject, map } from 'rxjs';
import { ActividadMapperImpl } from './mappers/actividad.mapper';
import { HttpClient } from '@angular/common/http';
import { ActividadModel } from './models/actividad.model';
import { DetalleActividadEntity } from '@dominio/entities/detalleActividad.entity';
import { DetalleActividadModel } from './models/detalleActividadModel';
import { DetalleActividadMapper } from './mappers/detalleActividadMapper';

@Injectable({
  providedIn: 'root'
})
export class ActividadRepositoryImplService extends ActividadRepository {


  mapperActividad: ActividadMapperImpl = new ActividadMapperImpl();
  mapperDetalleActividad: DetalleActividadMapper = new DetalleActividadMapper();

  actividadCambio = new Subject<PageSpringBoot<ActividadEntity>>();

  url: string = `${environment.host}/actividades`

  constructor(private http: HttpClient) {
    super();
  }


  /**
   ** Funcion para crear un solicitud
   * @param e 
   * @returns 
   */
  override create(e: ActividadEntity): Observable<ActividadEntity> {
    this.mapperActividad.mapTo(e);
    return this.http.post<ActividadModel>(`${this.url}`, e).pipe(map(data => {
      return this.mapperActividad.mapFrom(data);
    }))
  };

  override readById(id: number): Observable<ActividadEntity> {
    return EMPTY;
  };

  override readByPage(pageNumber: number, size: number,
    options?: {
      estado: '0' | '1' | '2'
    }
  ): Observable<PageSpringBoot<ActividadEntity>> {
    return this.http
      .get<PageSpringBoot<ActividadModel>>(`${this.url}/detach/paginado?estado=${options?.estado || '2'}&page=${pageNumber}&size=${size}&sort=idActividad,desc`)
      .pipe(map(d => {
        //??destructuración AND "..." propagación 
        let { content, ...otherProperties } = d;
        let pe: PageSpringBoot<ActividadEntity> = {
          content: d.content.map(m => { //* tranformamos cada elemento model a un entity
            return this.mapperActividad.mapFrom(m);
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
   * @returns An `Observable` type `ActividadEntity`
   */
  override update(id: number, o: ActividadEntity): Observable<ActividadEntity> {
    let clienteModel = this.mapperActividad.mapTo(o)
    return this.http.put<ActividadModel>(`${this.url}/${id}`, clienteModel, {
    }).pipe(map(s => {
      return this.mapperActividad.mapFrom(s) //* convertimos la respuesta del api rest en la estructura de negocio de la app
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


  /**
   ** Function to read all activities with email from `ConductorEntity`
   * @param email from `ConductorEntity`
   */
  override listarDetalleActividadesPorEmailConductor(email: string): Observable<DetalleActividadEntity[]> {
    return this.http.get<DetalleActividadModel[]>(`${this.url}/conductor`, {
      params: {
        email
      }
    }).pipe(map(d => {
      return d.map(de => {
        return this.mapperDetalleActividad.mapFrom(de)
      });
    }));
  }




}
