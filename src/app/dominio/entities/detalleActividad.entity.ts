import { ActividadEntity } from "./actividad.entity";
import { HorarioEntity } from "./horario.entity";
import { RutaEntity } from "./ruta.entity";

export interface DetalleActividadEntity {
    idDetalleActividad?: number;
    descripcion:        string;
    costo:              number;
    fecha:              string;
    estadoAccion:       string;
    estado:             boolean;
    listaHorarios:      HorarioEntity[];
    listaRutas:         RutaEntity[];
}


