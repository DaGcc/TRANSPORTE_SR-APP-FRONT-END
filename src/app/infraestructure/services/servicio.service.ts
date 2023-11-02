import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageSpringBoot } from '@base/utils/page-spring-boot';
import { ServicioEntity } from '@dominio/entities/servicios.entity';
import { environment } from '@environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url: string = `${environment.host}/servicios`;


  constructor(private http: HttpClient) { }



  readAll(){
    return this.http.get<ServicioEntity[]>(`${this.url}`);
  }


}
