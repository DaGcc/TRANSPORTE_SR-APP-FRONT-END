import { OrdenServicioModel } from "./ordenServicio.model";

export interface ArchivoOrdenServicioModel { 
    idArchivoOrdenServicio : number;
    ordenServicio : OrdenServicioModel;
    data : any;
    nombre : string;
    type : string;
}