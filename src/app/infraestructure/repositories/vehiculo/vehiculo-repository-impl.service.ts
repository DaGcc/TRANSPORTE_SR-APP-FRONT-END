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
export class VehiculoRepositoryImplService extends  VehiculoRepository {
  
 
  mapperVehiculo : VehiculoMapperImpl = new VehiculoMapperImpl();


  vehiculoCambio  = new Subject<PageSpringBoot<VehiculoEntity>>();

  url: string = `${environment.host}/vehiculos`;

  constructor(private _http : HttpClient) {
    super();
  }

  override create(e: VehiculoEntity): Observable<VehiculoEntity> {
    this.mapperVehiculo.mapTo(e);
    return this._http.post<VehiculoModel>(`${this.url}`, e).pipe(map( data => {
      return this.mapperVehiculo.mapFrom(data);
    }))
  }
  override readById(id: number): Observable<VehiculoEntity> {
    throw new Error('Method not implemented.');
  }
  override readByPage(pageNumber: number, size: number, options?: {
    estado : '0' | '1' | '2'
  } | undefined): Observable<PageSpringBoot<VehiculoEntity>> {
    return this._http.get<PageSpringBoot<VehiculoModel>>(`${this.url}/detach/paginado?estado=${options?.estado || "2"}&page=${pageNumber}&size=${size}&sort=idVehiculo,desc`).pipe(map( d => {

      let {content , ...otherProperties } = d;
      
      let p : PageSpringBoot<VehiculoEntity> = {
        content :  content.map( c => this.mapperVehiculo.mapFrom(c) ),
        ...otherProperties
      }
      return p;
    }))
  }
  override update(id: number, e: VehiculoEntity): Observable<VehiculoEntity> {
    throw new Error('Method not implemented.');
  }
  override deleteById(id: number, deep?: boolean | undefined): Observable<void> {
    throw new Error('Method not implemented.');
  }

  override filtroVehiculos(pageIndex: number, pageSize: number, value: string): Observable<PageFiltroDTO<VehiculoEntity>> {
    throw new Error('Method not implemented.');
  }
  
}
