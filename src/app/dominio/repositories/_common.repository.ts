import { Observable } from "rxjs";
import { PageSpringBoot } from "src/base/utils/page-spring-boot";

export abstract class commonRepository<E>{
    abstract create(cliente: E): Observable<E>;
    abstract readById(id: number): Observable<E>;
    abstract readByPage(pageNumber: number, size: number, options? : {}): Observable<PageSpringBoot<E>>;
    abstract update(id: number, cliente : E): Observable<E>;
    abstract deleteById(id: number, deep?: boolean): Observable<void>;
}