import { Component, ViewChild, inject, OnInit } from '@angular/core';
import { DatePipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { MaterialModule } from 'src/app/_material/material.module';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IEntityEditionDialog } from '@shared/interfaces/IEntityEditionDialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { InputComponent } from '@shared/widgets/input/input.component';
import { FacturaRepositoryImplService } from '@infraestructure/repositories/factura/factura-repository-impl.service';
import { PageSpringBoot } from '@base/utils/page-spring-boot';
import { FacturaEntity } from '@dominio/entities/factura.entity';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FacturasEdicionComponent } from './facturas-edicion/facturas-edicion.component';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [
    DatePipe,
    NgFor,
    NgIf,
    NgStyle,
    MaterialModule,
    InputComponent
  ],
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {



  //************** Inyecciones de dependencia **************/
  facturaService = inject(FacturaRepositoryImplService);
  dialog = inject(MatDialog)
  overlay = inject(Overlay);
  //********************************************************/

  //******** para la aplicacion de servicio paginado *********
  //?VALORES POR DEFECTO
  cantidad: number = 0;
  pageSize: number = 1;
  pageIndex: number = 0;
  //*********************************************************/


  displayedColumns: string[] = ['fecha', 'idFactura', 'codigoFactura', 'idOrdenServicio', 'codigoOrden', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {

    this.facturaService.facturaCambio.subscribe({
      next: (page: PageSpringBoot<FacturaEntity>) => {
        this.cantidad = page.totalElements;
        this.dataSource = new MatTableDataSource<FacturaEntity>(page.content);
        this.dataSource.sort = this.sort;
      }
    })


    this.facturaService.readByPage(this.pageIndex, this.pageSize).subscribe({
      next: (data: PageSpringBoot<FacturaEntity>) => {
        this.cantidad = data.totalElements;
        this.dataSource = new MatTableDataSource<FacturaEntity>(data.content);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      }
    })

  }

  private debounceFilter?: NodeJS.Timeout
  private _enableFilterPaginator: boolean = false
  valorDeFiltro: string = '';
  get isEnableFilterPaginator(): boolean {
    return this._enableFilterPaginator;
  }



  fnCreateOrUpdate(obj?: FacturaEntity): void {
    let data: IEntityEditionDialog<FacturaEntity>;

    if (obj != undefined || obj != null) {
      //*EDICION
      data = { title: 'EDICION', subtitle: `ID DE LA FACTURA : ${obj.idFactura} & ID DEL ORDEN DE SERVICIO : ${obj.ordenServicio.idOrdenServicio}`, body: obj }
    } else {
      //*CREACION
      data = { title: 'CREACION', subtitle: 'Formulario para crear la factura' }
    }
    data.pageIndex = this.pageIndex;
    data.pageSize = this.pageSize;

    console.log(data)
    this.dialog.open(FacturasEdicionComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      disableClose: true,
      data
    });

  }

  fnDelete(obj: any, deep: boolean) {

  }

  fnReloadData() {

  }


  nextPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.facturaService.readByPage(this.pageIndex, this.pageSize).subscribe({
      next: (page: PageSpringBoot<FacturaEntity>) => {
        this.facturaService.facturaCambio.next(page);
      }
    })
  }


  nextPageFiltro(e: PageEvent) {

  }

  filtroPorCampo(e: string) {

  }


  applyFilter(event: Event) {
    console.log(event)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
