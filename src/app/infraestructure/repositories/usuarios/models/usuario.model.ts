import { RolModel } from "@infraestructure/repositories/rol/models/rol.model";


export interface UsuarioModel {
    idUsuario:     number;
    password:      string;
    email:         string;
    estado:        boolean;
    nonLocked:     boolean;
    fechaCreacion: string;
    listaRole:     RolModel[];
}
