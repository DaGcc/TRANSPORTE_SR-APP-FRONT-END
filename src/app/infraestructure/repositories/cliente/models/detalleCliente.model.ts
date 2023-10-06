import { Genero } from "./genero.model";

export interface DetalleCliente {
    idDetalleCliente: number;
    genero:           Genero;
    apellidoPaterno:  string;
    apellidoMaterno:  string;
    dni:              string;
    edad:             string;
    foto:             any;
}
