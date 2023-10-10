import { UsuarioEntity } from 'src/app/dominio/entities/usuario.entity';
import { Mapper } from 'src/base/utils/mapper';
import { UsuarioModel } from '../models/usuario.model';

                                              //entrada-api     //negocio
export class UsuarioMapperImpl extends Mapper< UsuarioModel, UsuarioEntity > {


    override mapFrom(param: UsuarioModel): UsuarioEntity {
        throw new Error('Method not implemented.');
    }
    override mapTo(param: UsuarioEntity): UsuarioModel {
        throw new Error('Method not implemented.');
    }



}