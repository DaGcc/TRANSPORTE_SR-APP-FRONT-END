import { OrdenServicioModel } from "./ordenServicio.model"

export interface FacturaModel {
    idFactura : number
    codigoFactura : string
    fecha : string
    estado : boolean
    ordenServicio : OrdenServicioModel
}