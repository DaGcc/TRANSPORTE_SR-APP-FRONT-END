import { Mapper } from "@base/utils/mapper";
import { MenuModel } from "../models/menu.model";
import { MenuEntity } from "@dominio/entities/menu.entity";

export class MenuMapperImpl extends Mapper<MenuModel, MenuEntity>{

    override mapFrom(param: MenuModel): MenuEntity {
        return {
            idMenu : param.idMenu,
            nombre : param.nombre,
            icon : param.icon,
            url : param.url,
            roles : param.roles
        }
    }

    override mapTo(param: MenuEntity): MenuModel {
        return {
            idMenu : param.idMenu,
            nombre : param.nombre,
            icon : param.icon,
            url : param.url,
            roles : param.roles
        }
    }

}