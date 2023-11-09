import { Mapper } from "@base/utils/mapper";
import { DetalleVehiculoModel } from "../models/detalleVehiculo.model";
import { DetalleVehiculoEntity } from './../../../../dominio/entities/detalleVehiculo.entity';

export class DetalleVehiculoMapperImpl extends Mapper<DetalleVehiculoModel, DetalleVehiculoEntity>{

    override mapFrom(param: DetalleVehiculoModel): DetalleVehiculoEntity {
        return { 
            idDetalleVehiculo : param.idDetalleVehiculo,
            fechaCirculacionVenc: param.fechaCirculacionVenc,
            fechaSoatVenc:  param.fechaSoatVenc,
            fechaTecnicaVenc : param.fechaTecnicaVenc
        }
    }
    override mapTo(param: DetalleVehiculoEntity): DetalleVehiculoModel {
        
        return { 
            idDetalleVehiculo : param.idDetalleVehiculo,
            fechaCirculacionVenc: param.fechaCirculacionVenc,
            fechaSoatVenc:  param.fechaSoatVenc,
            fechaTecnicaVenc : param.fechaTecnicaVenc
        }

    }

}