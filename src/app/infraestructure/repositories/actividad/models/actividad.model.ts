import { ConductorModel } from "@infraestructure/repositories/conductor/models/conductor.model";
import { SolicitudModel } from "@infraestructure/repositories/solicitud/models/solicitud.model";
import { VehiculoModel } from "@infraestructure/repositories/vehiculo/models/vehiculo.model";
import { DetalleActividadModel } from "./detalleActividadModel";

export interface ActividadModel{
    idActividad:           number;
    conductor:             ConductorModel;
    vehiculo:              VehiculoModel;
    solicitud:             SolicitudModel;
    descripcion:           string;
    fechaCreada:           string;
    estado:                boolean;
    listaDetalleActividad: DetalleActividadModel[];
}
