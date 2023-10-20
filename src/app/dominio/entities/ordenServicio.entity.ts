import { FacturaEntity } from "./factura.entity";

export interface OrdenServicioEntity {
    idOrdenServicio: number
    factura: FacturaEntity
    codigoOrden: string
    fecha: string
    estado: boolean
}