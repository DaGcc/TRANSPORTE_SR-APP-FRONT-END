import { Injectable } from '@angular/core';
import { PageSpringBoot } from '@base/utils/page-spring-boot';
import { FacturaEntity } from '@dominio/entities/factura.entity';
import { FacturaRepository } from '@dominio/repositories/factura.respository';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environments';
import { FacturaOrdenServicioDTO } from '@base/utils/factura_orden_servicio-dto';
import { FacturaModel } from './models/factura.model';
import { FacturaMapper } from './mappers/factura.mapper';

@Injectable({
  providedIn: 'root'
})
export class FacturaRepositoryImplService extends FacturaRepository {

  private facturaMapper: FacturaMapper = new FacturaMapper();

  private url: string = `${environment.host}/facturas`;

  facturaCambio = new Subject<PageSpringBoot<FacturaEntity>>;

  constructor(private http: HttpClient) {
    super();
  }


  override create(factura: FacturaEntity): Observable<FacturaEntity> {
    throw new Error('Method not implemented.');
  }
  override readById(id: number): Observable<FacturaEntity> {
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
  override readByPage(pageNumber: number, size: number, options?: {} | undefined): Observable<PageSpringBoot<FacturaEntity>> {
    return this.http.get<PageSpringBoot<FacturaModel>>(`${this.url}/paginado?page=${pageNumber}&size=${size}&sort=idFactura,desc`)
      .pipe(map(data => {
        let { content, ...otherProperties } = data;
        let p: PageSpringBoot<FacturaEntity> = {
          content: content.map(f => this.facturaMapper.mapFrom(f)),
          ...otherProperties
        }
        return p;
      }))
  }

  /**
   ** Se actualizaran los campos de la factura. 
   * @param id 
   * @param e //
   * @returns un `Observable` de `FacturaEntity` para el uso global en la app. 
   */
  override update(id: number, e: FacturaEntity): Observable<FacturaEntity> {
    let facturaModel = this.facturaMapper.mapTo(e)
    return this.http.put<FacturaModel>(`${this.url}/${id}`, facturaModel, {
    }).pipe(map(c => {
      return this.facturaMapper.mapFrom(c) //* convertimos la respuesta del api rest en la estructura de negocio de la app
    }))
  }

  
  override deleteById(id: number, deep?: boolean | undefined): Observable<void> {
    throw new Error('Method not implemented.');
  }

  /**
   ** Se trabajara con dos tipos de archivos para las entidades de `archivoFactura` y `arhivoOrdenServicio`
   ** El dto es importante, pues este sera recepcionado por el backend
   ** para hacer la logica necesaria con las validacions y poder guardar los datos de `Factura` y `ordenServicio`.
   * 
   * @param fileFactura 
   * @param fileOrdenServicio 
   * @param dto 
   * @returns No se espera nada del servidor(backend), pero la respuesta la manejaremos coomo `Observable<void>`
   */
  override createEspecial(fileFactura: File, fileOrdenServicio: File, dto: FacturaOrdenServicioDTO): Observable<void> {

    //* Creamos el `FormData` para el body de tipo `multipart/form-data`
    let formdata: FormData = new FormData();

    formdata.append("fileFactura", fileFactura); //* Tipo file => pdf, excel, mp4, jpg, png, etc.
    formdata.append("fileOrdenServicio", fileOrdenServicio);  //* Tipo file => pdf, excel, mp4, jpg, png, etc.

    //* el Backend manejara esta logica
    formdata.append("codigoFactura", `${dto.codigoFactura}`);
    formdata.append("fechaFactura", `${dto.fechaFactura}`);
    formdata.append("estadoFactura", `${dto.estadoFactura}`);
    formdata.append("codigoOrden", `${dto.codigoOrden}`);
    formdata.append("fechaOrden", `${dto.fechaOrden}`);
    formdata.append("estadoOrden", `${dto.estadoOrden}`);

    return this.http.post<void>(`${this.url}/detach`, formdata);
  }



  /**
   * 
   * @param idFactura 
   * @returns un blob o arreglo de bytes
   */
  public override buscarArchivoPorIdFactura(idFactura: number): Observable<any> {
    return this.http.get(`${this.url}/archivo-factura/${idFactura}`,{
      responseType: 'blob'
    })
  }



}
