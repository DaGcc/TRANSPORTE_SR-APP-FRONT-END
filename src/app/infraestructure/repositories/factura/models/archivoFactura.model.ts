import { FacturaModel } from "./factura.model";

export interface ArchivoFacturaModel{
    idArchivoFactura : number;
    factura : FacturaModel;
    data : any;
    nombre : string;
    type : string;
}