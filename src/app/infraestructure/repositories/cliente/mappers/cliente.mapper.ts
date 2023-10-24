
import { Mapper } from 'src/base/utils/mapper';
import { ClienteModel } from '../models/cliente.model';
import { ClienteEntity } from 'src/app/dominio/entities/cliente.entity';
import { DetalleClienteEntity } from '@dominio/entities/detalleCliente.entity';
import { DetalleClienteModel } from '../models/detalleCliente.model';

                                                              //entrada-api     //negocio
export class ClienteMapperImpl extends Mapper< ClienteModel, ClienteEntity > {

    //me dara el la estructura de negocio con el cual toda mi app trabajara 
    mapFrom(param: ClienteModel): ClienteEntity {
        return {
            idCliente:      param.idCliente,
            ruc:            param.ruc,
            nombres:        param.nombres,
            telefono:       param.telefono,
            email:          param.email,
            estado:         param.estado,
            tipoCliente:    param.tipoCliente,
            detalleCliente: param.detalleCliente as DetalleClienteEntity
        };
    }

    //me dara la estructura que tengo que enviar al servicio api rest
    mapTo(param: ClienteEntity) : ClienteModel {
        return {
            idCliente:      param.idCliente,
            ruc:            param.ruc,
            nombres:        param.nombres,
            telefono:       param.telefono,
            email:          param.email,
            estado:         param.estado,
            tipoCliente:    param.tipoCliente,
            detalleCliente: param.detalleCliente as DetalleClienteModel
        }
    }
}