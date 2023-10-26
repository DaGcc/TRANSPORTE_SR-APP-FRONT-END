import { ClienteModel } from "./cliente.model";
import { GeneroModel } from "../../../shared/models/genero.model";

export interface DetalleClienteModel {
    idDetalleCliente: number;
    genero:           GeneroModel;
    apellidoPaterno:  string;
    apellidoMaterno:  string;
    dni:              string;
    edad:             string;
    foto:             any;

    //?? para registro de detalle independiente, nesecito mandar a que cliente pertenece
    cliente? : ClienteModel;
}
