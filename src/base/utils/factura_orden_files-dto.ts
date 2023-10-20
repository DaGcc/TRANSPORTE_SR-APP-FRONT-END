import { ArchivoFacturaEntity } from "@dominio/entities/archivoFactura.entity";
import { ArchivoOrdenServicioEntity } from "@dominio/entities/archivoOrdenServicio.entity";
import { FacturaEntity } from "@dominio/entities/factura.entity";

export interface FacturaOrdenFilesDTO <T,A,C>{
    factura : T;//??
    archivoFactura : A;
    archivoOrdenServicio : C;
}