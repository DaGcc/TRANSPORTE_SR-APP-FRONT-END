import { FacturaModel } from "./factura.model"

export interface OrdenServicioModel { 
 
    idOrdenServicio: number
    codigoOrden: string
    fecha: string
    estado: boolean

    //?? para mnejo de crud independiente
    factura?: FacturaModel
}