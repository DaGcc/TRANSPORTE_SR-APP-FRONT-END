import { GeneroModel } from "./genero.model";

export interface DetalleClienteModel {
    idDetalleCliente: number;
    genero:           GeneroModel;
    apellidoPaterno:  string;
    apellidoMaterno:  string;
    dni:              string;
    edad:             string;
    foto:             any;
}
