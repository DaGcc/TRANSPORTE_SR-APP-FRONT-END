import { Injectable } from '@angular/core';
import { PageFiltroDTO } from '@base/utils/page-dto';
import { PageSpringBoot } from '@base/utils/page-spring-boot';
import { ConductorEntity } from '@dominio/entities/conductor.entity';
import { ConductorRepository } from '@dominio/repositories/conductor.repositoty';
import { environment } from '@environments/environments';
import { Observable, Subject, map } from 'rxjs';
import { ConductorMapper } from './mappers/conductor.mapper';
import { HttpClient } from '@angular/common/http';
import { ConductorModel } from './models/conductor.model';

@Injectable({
  providedIn: 'root'
})
export class ConductorRepositoryImplService extends ConductorRepository {

  conductorMapper: ConductorMapper = new ConductorMapper();

  url: string = `${environment.host}/conductores`

  conductorCambio$ = new Subject<PageSpringBoot<ConductorEntity>>();

  constructor(private http: HttpClient) {
    super();
  }


  override filtroConductores(pageIndex: number, pageSize: number, value: string): Observable<PageFiltroDTO<ConductorEntity>> {
    throw new Error('Method not implemented.');
  }
  override create(e: ConductorEntity): Observable<ConductorEntity> {
    let model = this.conductorMapper.mapTo(e);//convertimos a la estructura de la api rest
    return this.http.post<ConductorModel>(this.url, model).pipe(map(c => {
      return this.conductorMapper.mapFrom(c);//* convertimos la respuesta del api rest en la estructura de negocio de la app
    }))
  }
  override readById(id: number): Observable<ConductorEntity> {
    throw new Error('Method not implemented.');
  }


  override readByPage(pageNumber: number, size: number, options?: {
    estado: '0' | '1' | '2'
  }): Observable<PageSpringBoot<ConductorEntity>> {
    return this.http
      .get<PageSpringBoot<ConductorModel>>(`${this.url}/detach/paginado?estado=${options?.estado || '2'}&page=${pageNumber}&size=${size}&sort=idConductor,desc`)
      .pipe(map(d => {

        //??destructuración AND "..." propagación 
        let { content, ...otherProperties } = d;
        let pe: PageSpringBoot<ConductorEntity> = {
          content: d.content.map(m => { //* tranformamos cada elemento model a un entity
            return this.conductorMapper.mapFrom(m);
          }),
          ...otherProperties //*propagacion del objeto
        };
        return pe;
      }))
  }

  override update(id: number, e: ConductorEntity): Observable<ConductorEntity> {
    let model = this.conductorMapper.mapTo(e)
    return this.http.put<ConductorEntity>(`${this.url}/${id}`, model, {
    }).pipe(map(c => {
      return this.conductorMapper.mapFrom(c) //* convertimos la respuesta del api rest en la estructura de negocio de la app
    }))
  }
  override deleteById(id: number, deep?: boolean | undefined): Observable<void> {
    return this.http.delete<void>(`${this.url}/detach/${id}?deep=${deep}`);
  }

}


