import { HorarioModel } from "./horario.model";
import { RutaModel } from "./ruta.model";

export interface DetalleActividadModel {
    idDetalleActividad?: number;
    descripcion:        string;
    costo:              number;
    fecha:              string;
    estadoAccion:       string;
    estado:             boolean;
    listaHorarios:      HorarioModel[];
    listaRutas:         RutaModel[];
}