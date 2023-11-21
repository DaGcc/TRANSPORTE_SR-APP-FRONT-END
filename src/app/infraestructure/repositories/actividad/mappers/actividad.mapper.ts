import { Mapper } from "@base/utils/mapper";
import { ActividadModel } from "../models/actividad.model";
import { ActividadEntity } from "@dominio/entities/actividad.entity";
import { ConductorMapper } from "@infraestructure/repositories/conductor/mappers/conductor.mapper";
import { VehiculoMapperImpl } from "@infraestructure/repositories/vehiculo/mappers/vehiculo.mapper";
import { SolicitudMapperImpl } from "@infraestructure/repositories/solicitud/mappers/solicitud.mapper";
import { DetalleActividadMapper } from './detalleActividadMapper';

export class ActividadMapperImpl extends Mapper<ActividadModel, ActividadEntity>{

    conductorMapper: ConductorMapper = new ConductorMapper();
    vehiculoMapper: VehiculoMapperImpl = new VehiculoMapperImpl();
    solicitudMapper: SolicitudMapperImpl = new SolicitudMapperImpl();
    detalleActividadMapper: DetalleActividadMapper = new DetalleActividadMapper();

    override mapFrom(param: ActividadModel): ActividadEntity {
        return {
            idActividad: param.idActividad,
            conductor: this.conductorMapper.mapFrom(param.conductor),
            vehiculo: this.vehiculoMapper.mapFrom(param.vehiculo),
            solicitud: this.solicitudMapper.mapFrom(param.solicitud),
            descripcion: param.descripcion,
            estado: param.estado,
            fechaCreada: param.fechaCreada,
            listaDetalleActividad: param.listaDetalleActividad.map( d => this.detalleActividadMapper.mapFrom(d) )
        }
    }
    override mapTo(param: ActividadEntity): ActividadModel {
        return {
            idActividad: param.idActividad,
            conductor: this.conductorMapper.mapTo(param.conductor),
            vehiculo: this.vehiculoMapper.mapTo(param.vehiculo),
            solicitud: this.solicitudMapper.mapTo(param.solicitud),
            descripcion: param.descripcion,
            estado: param.estado,
            fechaCreada: param.fechaCreada,
            listaDetalleActividad: param.listaDetalleActividad.map(this.detalleActividadMapper.mapTo)
        }
    }

}