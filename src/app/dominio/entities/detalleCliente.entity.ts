import { ClienteEntity } from "./cliente.entity";
import { GeneroEntity } from "./genero.entity";

export interface DetalleClienteEntity {
    idDetalleCliente: number;
    genero:           GeneroEntity;
    apellidoPaterno:  string;
    apellidoMaterno:  string;
    dni:              string;
    edad:             string;
    foto:             any;

    //?? para registro de detalle independiente
    cliente? : ClienteEntity;
}
