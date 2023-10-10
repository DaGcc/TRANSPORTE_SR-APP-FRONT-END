import { RolEntity } from "./rol.entity";


export interface UsuarioEntity {
    idUsuario:     number;
    password:      string;
    email:         string;
    estado:        boolean;
    nonLocked:     boolean;
    fechaCreacion: string;
    listaRole:     RolEntity[];
}
