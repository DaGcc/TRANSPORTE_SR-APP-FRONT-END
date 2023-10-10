import { Observable } from "rxjs";
import { PageSpringBoot } from "src/base/utils/page-spring-boot";
import { UsuarioEntity } from "../entities/usuario.entity";
import { JwtOauth } from "src/base/utils/jwt-oauth";
import { commonRepository } from "./_common.repository";

export abstract class UsuarioRepository extends commonRepository<UsuarioEntity>{

    // abstract create(usuario: UsuarioEntity): Observable<UsuarioEntity>;
    // abstract readById(id: number): Observable<UsuarioEntity>;
    // abstract readByPage(pageNumber: number, size: number): Observable<PageSpringBoot<UsuarioEntity>>;
    // abstract update(id: number, usuario : UsuarioEntity): Observable<UsuarioEntity>;
    // abstract deleteById(id: number, deep?: boolean): Observable<void>;


    abstract readByEmail(email: number): Observable<UsuarioEntity>;

    abstract login(email: string, password: string) : Observable<JwtOauth>;

}