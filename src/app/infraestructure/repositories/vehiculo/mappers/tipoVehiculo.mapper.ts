import { Mapper } from "@base/utils/mapper";
import { TipoVehiculoModel } from "../models/tipoVehiculo.model";
import { TipoVehiculoEntity } from "@dominio/entities/tipoVehiculo.entity";

export class TipoVehiculoMapperImpl extends Mapper<TipoVehiculoModel, TipoVehiculoEntity>{

    override mapFrom(param: TipoVehiculoModel): TipoVehiculoEntity {
        return {
            idTipoVehiculo : param.idTipoVehiculo,
            capacidadMaxima : param.capacidadMaxima,
            descripcion : param.descripcion,
            tipo : param.tipo
        }
    }
    override mapTo(param: TipoVehiculoEntity): TipoVehiculoModel {
        return {
            idTipoVehiculo : param.idTipoVehiculo,
            capacidadMaxima : param.capacidadMaxima,
            descripcion : param.descripcion,
            tipo : param.tipo
        }
    }

}