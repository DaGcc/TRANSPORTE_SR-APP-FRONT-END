import { DetalleVehiculoModel } from "./detalleVehiculo.model";
import { TipoVehiculoModel } from "./tipoVehiculo.model";

export interface VehiculoModel {
    idVehiculo:           number;
    tipoVehiculo:         TipoVehiculoModel;
    placa:                string;
    foto:                 any;
    colorVehiculo:        string;
    alto:                 string;
    ancho:                string;
    estado:               boolean;
    listaDetalleVehiculo: DetalleVehiculoModel[];
}


