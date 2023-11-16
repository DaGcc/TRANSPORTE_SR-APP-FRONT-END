import { Observable } from "rxjs";
import { ClienteEntity } from "../entities/cliente.entity";
import { PageSpringBoot } from "src/base/utils/page-spring-boot";
import { commonRepository } from "./_common.repository";
import { PageFiltroDTO } from "@base/utils/page-dto";

export abstract class ClienteRepository extends commonRepository<ClienteEntity>{

    // abstract create(cliente: ClienteEntity): Observable<ClienteEntity>;
    // abstract readById(id: number): Observable<ClienteEntity>;
    // abstract readByPage(pageNumber: number, size: number): Observable<PageSpringBoot<ClienteEntity>>;
    // abstract update(id: number, cliente : ClienteEntity): Observable<ClienteEntity>;
    // abstract deleteById(id: number, deep?: boolean): Observable<void>;
    
    abstract filtroClientes(pageIndex : number,pageSize : number , value : string) : Observable<PageFiltroDTO<ClienteEntity>>

    abstract readAll() : Observable<ClienteEntity[]>;
}