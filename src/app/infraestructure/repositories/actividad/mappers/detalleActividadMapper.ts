import { Mapper } from "@base/utils/mapper";
import { DetalleActividadModel } from "../models/detalleActividadModel";
import { DetalleActividadEntity } from "@dominio/entities/detalleActividad.entity";
import { HorarioMapper } from "./horario.mapper";
import { RutaMapper } from "./ruta.mapper";

export class DetalleActividadMapper extends Mapper<DetalleActividadModel , DetalleActividadEntity> {

    horarioMapper : HorarioMapper = new HorarioMapper();
    rutaMapper : RutaMapper = new RutaMapper();

    override mapFrom(param: DetalleActividadModel): DetalleActividadEntity {
        return {
            idDetalleActividad : param.idDetalleActividad,
            costo : param.costo,
            descripcion : param.descripcion,
            estado : param.estado,
            estadoAccion : param.estadoAccion,
            fecha : param.fecha,
            listaHorarios : param.listaHorarios.map( this.horarioMapper.mapFrom ),
            listaRutas : param.listaRutas.map( this.rutaMapper.mapFrom )
        }
    }
    override mapTo(param: DetalleActividadEntity): DetalleActividadModel {
        return {
            idDetalleActividad : param.idDetalleActividad,
            costo : param.costo,
            descripcion : param.descripcion,
            estado : param.estado,
            estadoAccion : param.estadoAccion,
            fecha : param.fecha,
            listaHorarios : param.listaHorarios.map( h => this.horarioMapper.mapTo(h) ),
            listaRutas : param.listaRutas.map( r => this.rutaMapper.mapTo(r) )
        }
    }

}