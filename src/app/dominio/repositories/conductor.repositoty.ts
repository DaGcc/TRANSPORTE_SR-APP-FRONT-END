import { Observable } from "rxjs";
import { commonRepository } from "./_common.repository";
import { PageFiltroDTO } from "@base/utils/page-dto";
import { ConductorEntity } from "@dominio/entities/conductor.entity";

export abstract class ConductorRepository extends commonRepository<ConductorEntity> {

    abstract filtroConductores(pageIndex: number, pageSize: number, value: string): Observable<PageFiltroDTO<ConductorEntity>>

}