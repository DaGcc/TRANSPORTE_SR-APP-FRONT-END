import { Observable } from "rxjs";
import { ClienteEntity } from "../entities/cliente.entity";
import { PageSpringBoot } from "src/base/utils/page-spring-boot";

export abstract class ClienteRepository {

    abstract create(cliente: ClienteEntity): Observable<ClienteEntity>;
    abstract readById(id: number): Observable<ClienteEntity>;
    abstract readByPage(pageNumber: number, size: number): Observable<PageSpringBoot<ClienteEntity>>;
    abstract deleteById(id: number, deep?: boolean): Observable<void>;

}