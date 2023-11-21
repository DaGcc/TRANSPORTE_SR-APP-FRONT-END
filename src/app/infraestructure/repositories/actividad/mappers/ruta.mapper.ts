import { Mapper } from "@base/utils/mapper";
import { RutaEntity } from "@dominio/entities/ruta.entity";
import { RutaModel } from "../models/ruta.model";

export class RutaMapper extends Mapper<RutaModel, RutaEntity> {

    override mapFrom(param: RutaModel): RutaEntity {
        return {
            idRuta: param.idRuta,
            latitud: param.latitud,
            longitud: param.longitud,
            nombre: param.nombre,
            estado: param.estado
        }
    }
    override mapTo(param: RutaEntity): RutaModel {
        return {
            idRuta: param.idRuta,
            latitud: param.latitud,
            longitud: param.longitud,
            nombre: param.nombre,
            estado: param.estado
        }
    }

}