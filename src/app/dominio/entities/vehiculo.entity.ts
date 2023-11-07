import { DetalleVehiculoEntity } from "./detalleVehiculo.entity";
import { TipoVehiculoEntity } from "./tipoVehiculo.entity";

export interface VehiculoEntity {
    idVehiculo:           number;
    tipoVehiculo:         TipoVehiculoEntity;
    placa:                string;
    foto:                 any;
    colorVehiculo:        string;
    alto:                 string;
    ancho:                string;
    estado:               boolean;
    listaDetalleVehiculo: DetalleVehiculoEntity[];
}


