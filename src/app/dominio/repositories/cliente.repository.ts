import { Observable } from "rxjs";
import { ClienteEntity } from "../entities/cliente.entity";

export abstract class ClienteRepository {

    abstract create(cliente: ClienteEntity): Observable<ClienteEntity>;
    abstract readById(id: number): Observable<ClienteEntity>;
    abstract readByPage(pageNumber: number, size: number): Observable<any>;
    abstract deleteById(id: number, deep?: boolean): Observable<void>;

}