import { OrdenServicioEntity } from "./ordenServicio.entity";

export interface ArchivoOrdenServicioEntity { 
    idArchivoOrdenServicio : number;
    ordenServicio : OrdenServicioEntity;
    data : any;
    nombre : string;
    type : string;
}