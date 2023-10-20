import { FacturaModel } from "./factura.model"

export interface OrdenServicioModel { 
 
    idOrdenServicio: number
    factura: FacturaModel
    codigoOrden: string
    fecha: string
    estado: boolean
}