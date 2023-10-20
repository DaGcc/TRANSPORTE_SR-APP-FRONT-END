import { Injectable } from '@angular/core';
import { PageSpringBoot } from '@base/utils/page-spring-boot';
import { FacturaEntity } from '@dominio/entities/factura.entity';
import { FacturaRepository } from '@dominio/repositories/factura.respository';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environments';
import { FacturaOrdenServicioDTO } from '@base/utils/factura_orden_servicio-dto';

@Injectable({
  providedIn: 'root'
})
export class FacturaRepositoryImplService extends FacturaRepository {


  private url : string = `${environment.host}/facturas`

  constructor(private http : HttpClient) {
    super();
  }


  override create(cliente: FacturaEntity): Observable<FacturaEntity> {
    throw new Error('Method not implemented.');
  }
  override readById(id: number): Observable<FacturaEntity> {
    throw new Error('Method not implemented.');
  }
  override readByPage(pageNumber: number, size: number, options?: {} | undefined): Observable<PageSpringBoot<FacturaEntity>> {
    throw new Error('Method not implemented.');
  }
  override update(id: number, cliente: FacturaEntity): Observable<FacturaEntity> {
    throw new Error('Method not implemented.');
  }
  override deleteById(id: number, deep?: boolean | undefined): Observable<void> {
    throw new Error('Method not implemented.');
  }

  // dto : FacturaOrdenFilesDTO<FacturaEntity,ArchivoFacturaEntity,ArchivoOrdenServicioEntity>
  override createEspecial(fileFactura : File, fileOrdenServicio: File,dto :  FacturaOrdenServicioDTO) : Observable<void>{

    let formdata  : FormData = new FormData();

    formdata.append("fileFactura", fileFactura);
    formdata.append("fileOrdenServicio", fileOrdenServicio);

    formdata.append("codigoFactura", `${dto.codigoFactura}` );
    formdata.append("fechaFactura", `${dto.fechaFactura}`);
    formdata.append("estadoFactura", `${dto.estadoFactura}`);
    formdata.append("codigoOrden", `${dto.codigoOrden}`);
    formdata.append("fechaOrden", `${dto.fechaOrden}`);
    formdata.append("estadoOrden", `${dto.estadoOrden}`);

    return this.http.post<void>(`${this.url}/detach`,formdata);
  }



}
