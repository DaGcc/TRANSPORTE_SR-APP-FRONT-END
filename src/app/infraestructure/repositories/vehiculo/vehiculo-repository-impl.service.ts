import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageSpringBoot } from '@base/utils/page-spring-boot';
import { VehiculoEntity } from '@dominio/entities/vehiculo.entity';
import { VehiculoRepository } from '@dominio/repositories/vehiculo.repository';
import { environment } from '@environments/environments';
import { Observable, Subject, map } from 'rxjs';
import { VehiculoMapperImpl } from './mappers/vehiculo.mapper';
import { VehiculoModel } from './models/vehiculo.model';
import { PageFiltroDTO } from '@base/utils/page-dto';

@Injectable({
  providedIn: 'root'
})
export class VehiculoRepositoryImplService extends VehiculoRepository {


  mapperVehiculo: VehiculoMapperImpl = new VehiculoMapperImpl();


  vehiculoCambio = new Subject<PageSpringBoot<VehiculoEntity>>();

  url: string = `${environment.host}/vehiculos`;

  constructor(private _http: HttpClient) {
    super();
  }

  override create(e: VehiculoEntity): Observable<VehiculoEntity> {
    this.mapperVehiculo.mapTo(e);
    return this._http.post<VehiculoModel>(`${this.url}`, e).pipe(map(data => {
      return this.mapperVehiculo.mapFrom(data);
    }))
  }
  override readById(id: number): Observable<VehiculoEntity> {
    throw new Error('Method not implemented.');
  }

   /**
   ** Can use whit diferents modules.
   ** The params is important except from `options`
   * 
   * @param pageNumber 
   * @param size 
   * @param options 
   * @returns An `PageSpringBoot` it's type generic from `FacturaEntity`
   */
  override readByPage(pageNumber: number, size: number, options?: {
    estado: '0' | '1' | '2'
  } | undefined): Observable<PageSpringBoot<VehiculoEntity>> {
    return this._http.get<PageSpringBoot<VehiculoModel>>(`${this.url}/detach/paginado?estado=${options?.estado || "2"}&page=${pageNumber}&size=${size}&sort=idVehiculo,desc`).pipe(map(d => {

      let { content, ...otherProperties } = d;

      let p: PageSpringBoot<VehiculoEntity> = {
        content: content.map(c => this.mapperVehiculo.mapFrom(c)),
        ...otherProperties
      }
      return p;
    }))
  }

  /**
   ** Data update  function. 
   * 
   * @param id 
   * @param e 
   * @returns An `Observable` type `VehiculoEntity`
   */
  override update(id: number, e: VehiculoEntity): Observable<VehiculoEntity> {
    let clienteModel = this.mapperVehiculo.mapTo(e)
    return this._http.put<VehiculoModel>(`${this.url}/${id}`, clienteModel, {
    }).pipe(map(c => {
      return this.mapperVehiculo.mapFrom(c) //* convertimos la respuesta del api rest en la estructura de negocio de la app
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
    return this._http.delete<void>(`${this.url}/detach/${id}?deep=${deep}`);
  }

  override filtroVehiculos(pageIndex: number, pageSize: number, value: string): Observable<PageFiltroDTO<VehiculoEntity>> {
    throw new Error('Method not implemented.');
  }

}
