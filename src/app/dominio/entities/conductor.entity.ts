import { GeneroEntity } from "./genero.entity";

export interface ConductorEntity {
    idConductor: number;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    dni: string;
    telefono: string;
    email: string;
    edad: string;
    foto: any;
    genero: GeneroEntity;
    estado: boolean;
}