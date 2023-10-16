
export interface PageFiltroDTO<E> {
    firstPage:     boolean;
    lastPage:      boolean;
    totalElements: number;
    content:       E[];
}
