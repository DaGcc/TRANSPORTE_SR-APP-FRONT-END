// Generated by https://quicktype.io

import { DetalleClienteEntity } from "./detalleCliente.entity";
import { TipoClienteEntity } from "./tipoCliente.entity";

export interface ClienteEntity {
    idCliente:      number;
    ruc:            string;
    nombres:        string;
    telefono:       string;
    email:          string;
    estado:         boolean;
    tipoCliente:    TipoClienteEntity;
    detalleCliente?: DetalleClienteEntity;
}




