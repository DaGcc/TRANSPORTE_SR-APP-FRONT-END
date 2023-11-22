import { ActividadEntity } from "@dominio/entities/actividad.entity";
import { commonRepository } from "./_common.repository";
import { Observable } from "rxjs";
import { DetalleActividadEntity } from "@dominio/entities/detalleActividad.entity";

export abstract class ActividadRepository extends commonRepository<ActividadEntity>{
  
    abstract listarDetalleActividadesPorEmailConductor( email : string ) : Observable<DetalleActividadEntity[]> ;

}