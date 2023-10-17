import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { ClienteEntity } from 'src/app/dominio/entities/cliente.entity';
import { ClienteRepository } from 'src/app/dominio/repositories/cliente.repository';
import { environment } from 'src/app/environments/environments';
import { ClienteMapperImpl } from './mappers/cliente.mapper';
import { ClienteModel } from './models/cliente.model';
import { PageSpringBoot } from 'src/base/utils/page-spring-boot';
import { PageFiltroDTO } from '@base/utils/page-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteRepositoryImplService extends ClienteRepository {



  clienteMapper = new ClienteMapperImpl();

  url: string = `${environment.host}/clientes` //end point del controlador 


  clientesCambio = new Subject<PageSpringBoot<ClienteEntity>>()

  constructor(private http: HttpClient) {
    super();
  }

  override create(cliente: ClienteEntity): Observable<ClienteEntity> {
    let clienteModel = this.clienteMapper.mapTo(cliente);//convertimos a la estructura de la api rest
    return this.http.post<ClienteModel>(this.url, clienteModel).pipe(map(c => {
      return this.clienteMapper.mapFrom(c);//* convertimos la respuesta del api rest en la estructura de negocio de la app
    }))
  }
  override readById(id: number): Observable<ClienteEntity> {
    return this.http.get<ClienteModel>(`${this.url}/${id}`).pipe(map(c => {
      return this.clienteMapper.mapFrom(c);//* convertimos la respuesta del api rest en la estructura de negocio de la app
    }));
  }

  override readByPage(pageNumber: number, size: number,
    options?: {
      estado: '0' | '1' | '2'
    }
  ): Observable<PageSpringBoot<ClienteEntity>> {
    return this.http
      .get<PageSpringBoot<ClienteModel>>(`${this.url}/detach/paginado?estado=${options?.estado || '2'}&page=${pageNumber}&size=${size}&sort=idCliente,desc`)
      .pipe(map(d => {

        //??destructuración AND "..." propagación 
        let { content, ...otherProperties } = d;
        let pe: PageSpringBoot<ClienteEntity> = {
          content: d.content.map(m => { //* tranformamos cada elemento model a un entity
            return this.clienteMapper.mapFrom(m);
          }),
          ...otherProperties //*propagacion del objeto
        };
        return pe;
      }))
  }

  override update(id: number, cliente: ClienteEntity): Observable<ClienteEntity> {
    let clienteModel = this.clienteMapper.mapTo(cliente)
    return this.http.put<ClienteModel>(`${this.url}/${id}`, clienteModel, {
    }).pipe(map(c => {
      return this.clienteMapper.mapFrom(c) //* convertimos la respuesta del api rest en la estructura de negocio de la app
    }))
  }

  override deleteById(id: number, deep?: boolean | undefined): Observable<void> {
    return this.http.delete<void>(`${this.url}/detach/${id}?deep=${deep}`);
  }


  override filtroClientes(pageIndex: number, pageSize: number, value: string): Observable<PageFiltroDTO<ClienteEntity>> {
    return this.http.get<PageFiltroDTO<ClienteModel>>(`${this.url}/filtro?pageIndex=${pageIndex}&pageSize=${pageSize}&value=${value}`)
      .pipe(map(d => {
        const pe: PageFiltroDTO<ClienteEntity> = {
          firstPage: d.firstPage,
          lastPage: d.lastPage,
          totalElements: d.totalElements,
          content: d.content.map(m => {
            return this.clienteMapper.mapFrom(m);
          })
        };
        return pe;
      }))
  }

}

//DATO:
/**
 * Siempre las peticiones seran del tipo de modelo definido en la capa de infraestructura, y la respuesta con ayuda del mapeador 
 * lo comvertimos a las entidades de nuestro dominio
 */