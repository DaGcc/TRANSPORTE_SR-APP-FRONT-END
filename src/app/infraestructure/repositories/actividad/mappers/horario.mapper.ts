import { Mapper } from "@base/utils/mapper";
import { HorarioEntity } from "@dominio/entities/horario.entity";
import { HorarioModel } from "../models/horario.model";

export class HorarioMapper extends Mapper<HorarioModel, HorarioEntity> {


    override mapFrom(param: HorarioModel): HorarioEntity {
        return {
            idHorario : param.idHorario,
            diaCompleto : param.diaCompleto,
            diaFin : param.diaFin,
            diaInicio : param.diaInicio,
            titulo : param.titulo,
            estado : param.estado,
            events : param.events || [],//* estoy seguro que mi API-REST me va a devolvolver esta propiedad que es de tio `Event`, pero mejor le doy un []
            horaFin : param.horaFin,
            horaInicio : param.horaInicio
        }
    }
    
    override mapTo(param: HorarioEntity): HorarioModel {//* Aqui diferimos en cuanto a la forma del JSON que enviaremos
        return {
            idHorario : param.idHorario,
            diaCompleto : param.diaCompleto,
            diaFin : param.diaFin,
            diaInicio : param.diaInicio,
            titulo : param.titulo,
            estado : param.estado,
            horaFin : param.horaFin,
            horaInicio : param.horaInicio
        }
    }

}