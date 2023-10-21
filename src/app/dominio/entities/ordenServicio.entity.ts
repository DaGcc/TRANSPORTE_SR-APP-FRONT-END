import { FacturaEntity } from "./factura.entity";

export interface OrdenServicioEntity {
    idOrdenServicio: number
    codigoOrden: string
    fecha: string
    estado: boolean

    //?? para registro de un orden de servicio independiente
    factura?: FacturaEntity
}