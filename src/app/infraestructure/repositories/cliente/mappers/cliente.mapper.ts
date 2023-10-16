
import { Mapper } from 'src/base/utils/mapper';
import { ClienteModel } from '../models/cliente.model';
import { ClienteEntity } from 'src/app/dominio/entities/cliente.entity';

                                                              //entrada-api     //negocio
export class ClienteMapperImpl extends Mapper< ClienteModel, ClienteEntity > {

    //me dara el la estructura de negocio con el cual toda mi app trabajara 
    mapFrom(param: ClienteModel): ClienteEntity {
        return {
            idCliente:      param.idCliente,
            ruc:            param.ruc,
            nombres:        param.nombre,
            telefono:       param.telefono,
            email:          param.email,
            estado:         param.estado,
            tipoCliente:    param.tipoCliente,
            detalleCliente: param.detalleCliente
        };
    }

    //me dara la estructura que tengo que enviar al servicio api rest
    mapTo(param: ClienteEntity) : ClienteModel {
        return {
            idCliente:      param.idCliente,
            ruc:            param.ruc,
            nombre:        param.nombres,
            telefono:       param.telefono,
            email:          param.email,
            estado:         param.estado,
            tipoCliente:    param.tipoCliente,
            detalleCliente: param.detalleCliente
        }
    }
}