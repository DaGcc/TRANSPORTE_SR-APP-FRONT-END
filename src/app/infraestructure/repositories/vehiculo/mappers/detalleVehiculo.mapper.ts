import { Mapper } from "@base/utils/mapper";
import { DetalleVehiculoModel } from "../models/detalleVehiculo.model";

export class DetalleVehiculoMapperImpl extends Mapper<DetalleVehiculoModel, DetalleVehiculoModel>{

    override mapFrom(param: DetalleVehiculoModel): DetalleVehiculoModel {
        return { 
            idDetalleVehiculo : param.idDetalleVehiculo,
            fechaCirculacionVenc: param.fechaCirculacionVenc,
            fechaSoatVenc:  param.fechaSoatVenc,
            fechaTecnicaVenc : param.fechaTecnicaVenc
        }
    }
    override mapTo(param: DetalleVehiculoModel): DetalleVehiculoModel {
        
        return { 
            idDetalleVehiculo : param.idDetalleVehiculo,
            fechaCirculacionVenc: param.fechaCirculacionVenc,
            fechaSoatVenc:  param.fechaSoatVenc,
            fechaTecnicaVenc : param.fechaTecnicaVenc
        }

    }

}