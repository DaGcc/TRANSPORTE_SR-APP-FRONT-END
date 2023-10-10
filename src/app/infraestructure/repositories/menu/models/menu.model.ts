import { RolModel } from "@infraestructure/repositories/rol/models/rol.model";


export interface MenuModel {
    idMenu: number;
    nombre: string;
    icon:   string;
    url:    string;
    roles:  RolModel[];
}
