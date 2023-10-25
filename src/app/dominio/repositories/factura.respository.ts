import { FacturaEntity } from "@dominio/entities/factura.entity";
import { commonRepository } from "./_common.repository";
import { Observable } from "rxjs";
import { FacturaOrdenServicioDTO } from "@base/utils/factura_orden_servicio-dto";

export abstract class FacturaRepository extends commonRepository<FacturaEntity> {

    public abstract createEspecial(fileFactura : File, fileOrdenServicio: File,dto :  FacturaOrdenServicioDTO) : Observable<void>
    public abstract buscarArchivoPorIdFactura(idFactura : number) : Observable<any>;
    public abstract updateEspecial(fileFactura : File, fileOrdenServicio: File,dto :  FacturaOrdenServicioDTO) : Observable<FacturaEntity>
}