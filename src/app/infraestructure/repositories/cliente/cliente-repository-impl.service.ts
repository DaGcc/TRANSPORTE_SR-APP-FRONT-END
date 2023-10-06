import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ClienteEntity } from 'src/app/dominio/entities/cliente.entity';
import { ClienteRepository } from 'src/app/dominio/repositories/cliente.repository';
import { environment } from 'src/app/environments/environments';
import { ClienteMapperImpl } from './mappers/cliente.repository.mapper';
import { ClienteModel } from './models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteRepositoryImplService extends ClienteRepository {

  userMapper = new ClienteMapperImpl();

  url : string = `${environment.host}/clientes` //end point del controlador 

  constructor(private http: HttpClient) {
    super();
  }

  override create(cliente: ClienteEntity): Observable<ClienteEntity> {
    let clienteModel = this.userMapper.mapTo(cliente);//convertimos a la estructura de la api rest
    return this.http.post<ClienteModel>(this.url,clienteModel).pipe(map( c => {
      return this.userMapper.mapFrom(c);//convertimos la respuesta del api rest en la estructura de negocio de la app
    }))
  }
  override readById(id: number): Observable<ClienteEntity> {
    return this.http.get<ClienteModel>(`${this.url}/${id}`).pipe(map( c => {
      return this.userMapper.mapFrom(c);//convertimos la respuesta del api rest en la estructura de negocio de la app
    }));
  }
  override readByPage(pageNumber: number, size: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
  override deleteById(id: number, deep?: boolean | undefined): Observable<void> {
    throw new Error('Method not implemented.');
  }


}

//DATO:
/**
 * Siempre las peticiones seran del tipo de modelo definido en la capa de infraestructura, y la respuesta con ayuda del mapeador 
 * lo comvertimos a las entidades de nuestro dominio
 */