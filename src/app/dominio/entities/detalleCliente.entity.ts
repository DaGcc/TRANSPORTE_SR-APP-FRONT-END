import { Genero } from "./genero.entity";

export interface DetalleCliente {
    idDetalleCliente: number;
    genero:           Genero;
    apellidoPaterno:  string;
    apellidoMaterno:  string;
    dni:              string;
    edad:             string;
    foto:             any;
}
