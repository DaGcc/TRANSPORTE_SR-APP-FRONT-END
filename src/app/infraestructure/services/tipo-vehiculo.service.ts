import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicioEntity } from '@dominio/entities/servicios.entity';
import { TipoVehiculoEntity } from '@dominio/entities/tipoVehiculo.entity';
import { environment } from '@environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {

  url: string = `${environment.host}/tipo-vehiculos`;


  constructor(private http: HttpClient) { }

  readAll(){          //??? recomendacion: manejarlo con maper.
    return this.http.get<TipoVehiculoEntity[]>(`${this.url}`);
  }
  
  
}
