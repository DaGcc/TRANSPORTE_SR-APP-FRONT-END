import { GeneroEntity } from "./genero.entity";

export interface DetalleClienteEntity {
    idDetalleCliente: number;
    genero:           GeneroEntity;
    apellidoPaterno:  string;
    apellidoMaterno:  string;
    dni:              string;
    edad:             string;
    foto:             any;
}
