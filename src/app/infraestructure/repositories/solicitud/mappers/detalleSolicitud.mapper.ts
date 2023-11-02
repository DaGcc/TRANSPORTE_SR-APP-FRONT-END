import { Mapper } from "@base/utils/mapper";
import { DetalleSolicitudEntity } from "@dominio/entities/detalleSolicitud.entity";
import { DetalleSolicitudModel } from "../models/detalleSolicitud.model";

export class DetalleSolicitudMapper extends Mapper<DetalleSolicitudModel,DetalleSolicitudEntity>{

    override mapFrom(param: DetalleSolicitudModel): DetalleSolicitudEntity {
        return {
            fecha: param.fecha,
            estado : param.estado,
            estadoAccion : param.estadoAccion
        }
    }
    override mapTo(param: DetalleSolicitudEntity): DetalleSolicitudModel {
        return {
            fecha: param.fecha,
            estado : param.estado,
            estadoAccion : param.estadoAccion
        }
    }

}