import { RolEntity } from "./rol.entity";


export interface MenuEntity {
    idMenu: number;
    nombre: string;
    icon:   string;
    url:    string;
    roles:  RolEntity[];
}
