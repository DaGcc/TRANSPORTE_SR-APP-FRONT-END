import { FacturaEntity } from "./factura.entity";

export interface ArchivoFacturaEntity{
    idArchivoFactura : number;
    factura : FacturaEntity;
    data : any;
    nombre : string;
    type : string;
}