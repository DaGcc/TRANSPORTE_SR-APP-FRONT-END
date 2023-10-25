export interface FacturaOrdenServicioDTO {

    /**
    * Atributos de factura
    */
    idFactura?: number;
    codigoFactura: string;
    fechaFactura: string;
    estadoFactura: boolean;


    /**
     * Atributos de la clase OrdenServicio
     */
    idOrdenServicio?: number;
    codigoOrden: string;
    fechaOrden: string;
    estadoOrden: boolean;

}