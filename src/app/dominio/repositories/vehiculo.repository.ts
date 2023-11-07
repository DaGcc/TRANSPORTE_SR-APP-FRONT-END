import { VehiculoEntity } from "@dominio/entities/vehiculo.entity";
import { commonRepository } from "./_common.repository";
import { Observable } from "rxjs";
import { PageFiltroDTO } from "@base/utils/page-dto";

export abstract class VehiculoRepository extends commonRepository<VehiculoEntity>{
    abstract filtroVehiculos(pageIndex : number,pageSize : number , value : string) : Observable<PageFiltroDTO<VehiculoEntity>>
}