import { ActividadEntity } from "@dominio/entities/actividad.entity";
import { commonRepository } from "./_common.repository";
import { Observable } from "rxjs";

export abstract class ActividadRepository extends commonRepository<ActividadEntity>{
  
}