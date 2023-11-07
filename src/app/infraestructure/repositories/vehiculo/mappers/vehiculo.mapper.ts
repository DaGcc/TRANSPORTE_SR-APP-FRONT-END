import { Mapper } from "@base/utils/mapper";
import { VehiculoModel } from "../models/vehiculo.model";
import { VehiculoEntity } from "@dominio/entities/vehiculo.entity";
import { DetalleVehiculoMapperImpl } from "./detalleVehiculo.mapper";
import { TipoVehiculoMapperImpl } from "./tipoVehiculo.mapper";

export class VehiculoMapperImpl extends Mapper<VehiculoModel, VehiculoEntity>{
    
    detalleVehiculoMapper : DetalleVehiculoMapperImpl = new DetalleVehiculoMapperImpl();
    tipoVehiculoMapper : TipoVehiculoMapperImpl = new TipoVehiculoMapperImpl();

    override mapFrom(param: VehiculoModel): VehiculoEntity {
        return {
            idVehiculo : param.idVehiculo,
            alto : param.alto,
            ancho: param.ancho,
            colorVehiculo: param.colorVehiculo,
            placa: param.placa,
            tipoVehiculo: this.tipoVehiculoMapper.mapFrom(param.tipoVehiculo),
            foto: param.foto,
            estado: param.estado,
            listaDetalleVehiculo: param.listaDetalleVehiculo.map( this.detalleVehiculoMapper.mapFrom )
        }
    }
    override mapTo(param: VehiculoEntity): VehiculoModel {
        return {
            idVehiculo : param.idVehiculo,
            alto : param.alto,
            ancho: param.ancho,
            colorVehiculo: param.colorVehiculo,
            placa: param.placa,
            tipoVehiculo: this.tipoVehiculoMapper.mapTo(param.tipoVehiculo),
            foto: param.foto,
            estado: param.estado,
            listaDetalleVehiculo: param.listaDetalleVehiculo.map( this.detalleVehiculoMapper.mapTo )
        }
    }

}