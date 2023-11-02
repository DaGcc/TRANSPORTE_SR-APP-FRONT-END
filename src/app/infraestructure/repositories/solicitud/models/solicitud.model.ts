import { ClienteModel } from "@infraestructure/repositories/cliente/models/cliente.model";
import { ServicioModel } from "@infraestructure/shared/models/servicio.model";
import { DetalleSolicitudModel } from "./detalleSolicitud.model";

export interface SolicitudModel {
    idSolicitud:           number;
    servicio:              ServicioModel;
    cliente:               ClienteModel;
    descripcion:           string;
    fechaSolicitada:       string;
    estado:                boolean;
    listaDetalleSolicitud: DetalleSolicitudModel[];
}

