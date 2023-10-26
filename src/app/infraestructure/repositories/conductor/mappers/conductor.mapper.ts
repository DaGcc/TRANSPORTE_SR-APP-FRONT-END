import { Mapper } from "@base/utils/mapper";
import { ConductorModel } from "../models/conductor.model";
import { ConductorEntity } from "@dominio/entities/conductor.entity";

export class ConductorMapper extends Mapper<ConductorModel, ConductorEntity>{

    override mapFrom(param: ConductorModel): ConductorEntity {
        return {
            idConductor: param.idConductor,
            nombres: param.nombres,
            apellidoPaterno: param.apellidoPaterno,
            apellidoMaterno: param.apellidoMaterno,
            dni: param.dni,
            telefono: param.telefono,
            email: param.email,
            edad: param.edad,
            foto: param.foto,
            genero: param.genero,
            estado: param.estado
        }
    }

    override mapTo(param: ConductorEntity): ConductorModel {
        return {
            idConductor: param.idConductor,
            nombres: param.nombres,
            apellidoPaterno: param.apellidoPaterno,
            apellidoMaterno: param.apellidoMaterno,
            dni: param.dni,
            telefono: param.telefono,
            email: param.email,
            edad: param.edad,
            foto: param.foto,
            genero: param.genero,
            estado: param.estado
        }
    }
    

}