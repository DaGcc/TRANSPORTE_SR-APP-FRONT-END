import { OrdenServicioEntity } from "./ordenServicio.entity"

export interface FacturaEntity {
    idFactura : number
    codigoFactura : string
    fecha : string
    estado : boolean
    ordenServicio : OrdenServicioEntity
}