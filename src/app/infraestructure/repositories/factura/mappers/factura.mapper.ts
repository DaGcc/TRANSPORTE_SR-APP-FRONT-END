import { Mapper } from "@base/utils/mapper";
import { FacturaEntity } from "@dominio/entities/factura.entity";
import { FacturaModel } from "../models/factura.model";

export class FacturaMapper extends Mapper<FacturaModel, FacturaEntity>{


    override mapFrom(param: FacturaModel): FacturaEntity {
        return {
            idFactura : param.idFactura,
            codigoFactura : param.codigoFactura,
            ordenServicio : param.ordenServicio,
            fecha : param.fecha,
            estado : param.estado
        }
    }
    override mapTo(param: FacturaEntity): FacturaModel {
        return {
            idFactura : param.idFactura,
            codigoFactura : param.codigoFactura,
            ordenServicio : param.ordenServicio,
            fecha : param.fecha,
            estado: param.estado
        }
    }

}