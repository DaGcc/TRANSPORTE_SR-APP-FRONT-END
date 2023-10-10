import { MenuEntity } from "@dominio/entities/menu.entity";
import { commonRepository } from "./_common.repository";
import { Observable } from 'rxjs';

export abstract class MenuRepository extends commonRepository<MenuEntity>{

    abstract findAllUserMenuByRolWithEmail(email : string ) : Observable<MenuEntity[]>;
    
} 