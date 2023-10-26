import { GeneroModel } from "@infraestructure/shared/models/genero.model";

export interface ConductorModel {
    idConductor: number;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    dni: string;
    telefono: string;
    email: string;
    edad: string;
    foto: any;
    genero: GeneroModel;
    estado: boolean;
}