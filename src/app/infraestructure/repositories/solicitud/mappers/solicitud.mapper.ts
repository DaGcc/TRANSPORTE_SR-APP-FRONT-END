import { Mapper } from "@base/utils/mapper";
import { SolicitudEntity } from "@dominio/entities/solicitud.entity";
import { SolicitudModel } from "../models/solicitud.model";
import { ClienteMapperImpl } from "@infraestructure/repositories/cliente/mappers/cliente.mapper";
import { DetalleSolicitudMapper } from "./detalleSolicitud.mapper";

export class SolicitudMapperImpl extends Mapper<SolicitudModel, SolicitudEntity>{

    mapperCliente :ClienteMapperImpl = new ClienteMapperImpl();
    mapperDetalleSolicitud : DetalleSolicitudMapper = new DetalleSolicitudMapper();


    override mapFrom(param: SolicitudModel): SolicitudEntity {
        
        return {
            idSolicitud : param.idSolicitud,
            cliente : this.mapperCliente.mapFrom(param.cliente),
            descripcion : param.descripcion,
            estado : param.estado,
            fechaSolicitada : param.fechaSolicitada,
            listaDetalleSolicitud : param.listaDetalleSolicitud.map( d => {
                return this.mapperDetalleSolicitud.mapFrom(d);
            } ),
            servicio : param.servicio
        }
    }
    override mapTo(param: SolicitudEntity): SolicitudModel {
        return {
            idSolicitud : param.idSolicitud,
            cliente : this.mapperCliente.mapTo(param.cliente),
            descripcion : param.descripcion,
            estado : param.estado,
            fechaSolicitada : param.fechaSolicitada,
            listaDetalleSolicitud : param.listaDetalleSolicitud.map( d => {
                return this.mapperDetalleSolicitud.mapTo(d);
            } ),
            servicio : param.servicio
        }
    }

}