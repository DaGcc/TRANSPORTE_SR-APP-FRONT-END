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
import { OrdenServicioEntity } from '@dominio/entities/ordenServicio.entity';
import { FacturaPdfViewerComponent } from './factura-pdf-viewer/factura-pdf-viewer.component';
import { EstructuraDialogoConfirmacion } from '@shared/components/dialog-confirmacion/estructura-dialogo-confirmacion';
import { DialogConfirmacionComponent } from '@shared/components/dialog-confirmacion/dialog-confirmacion.component';
import { mergeMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  _facturaService = inject(FacturaRepositoryImplService);
  dialog = inject(MatDialog)
  overlay = inject(Overlay);
  _snackBar = inject(MatSnackBar);
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

    this._facturaService.facturaCambio.subscribe({
      next: (page: PageSpringBoot<FacturaEntity>) => {
        this.cantidad = page.totalElements;
        this.dataSource = new MatTableDataSource<FacturaEntity>(page.content);
        this.dataSource.sort = this.sort;
      }
    })


    this._facturaService.readByPage(this.pageIndex, this.pageSize).subscribe({
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



  /**
   * Metodo para eliminar de dos manera en base a los argumentos enviados.
   * 
   * @param obj se recogera su id
   * @param deep para eliminar de manera profunda o solo por estado 
   */
  fnCreateOrUpdate(obj?: FacturaEntity): void {
    // let data: IEntityEditionDialog<FacturaEntity | OrdenServicioEntity>;
    let data: IEntityEditionDialog<FacturaEntity>;

    if (obj != undefined || obj != null) { //*EDICION
      data = { title: 'EDICION', subtitle: `ID DE LA FACTURA : ${obj.idFactura} ID DEL ORDEN DE SERVICIO : ${obj.ordenServicio.idOrdenServicio}`, body: obj }
    } else { //*CREACION
      data = { title: 'CREACION', subtitle: 'Formulario para crear la factura con su orden de servicio' }
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

  fnDelete(obj: FacturaEntity, deep: boolean) {
    let body: string;
    let isEnableBtnConfir: boolean;
    //* si el estado es true, podemos cambiarlo(ocultarlo) 
    if (obj.estado) {
      //* habilitamos el boton de confirmación, pues su estado aun es true.
      isEnableBtnConfir = true;

      //* Si deep es true, es una eliminacion profunda, es decir, una eliminacion total de la base de datos.
      body = deep ?
        `¿Desea eliminar de manera permanente la factura con id ${obj.idFactura}?` : //* eliminacion total de la bbdd.
        `¿Desea eliminar al cliente con id ${obj.idFactura}, pero conservando su información?`; //* eliminacion con solo el estado.

    } else {//* si estado es false, es decir que ya ha sido eliminado, pero no con deep, deshabilitaremos la funcion del boton confirmar.
      body = `No puede realizar dicha accion en este usuario debido a su estado del Cliente con id: ${obj.idFactura}.`;
      isEnableBtnConfir = false;
    }

    let data: EstructuraDialogoConfirmacion = {
      header: `Delete`,
      body,
      isEnableBtnConfir
    }

    const result = this.dialog.open(DialogConfirmacionComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      disableClose: true,
      data
    });
    result.afterClosed().subscribe({
      next: (confirmationResult: boolean) => {
        if (confirmationResult) {
          this._facturaService.deleteById(obj.idFactura, deep).pipe(mergeMap((_) => {
            return this._facturaService.readByPage(this.pageIndex, this.pageSize);
          })).subscribe({
            next: (data: PageSpringBoot<FacturaEntity>) => {
              this._facturaService.facturaCambio.next(data);
            }
          })
        } else {
          this._snackBar.open('Ningun cambio por realizar', 'OK', {
            duration: 2000
          })
        }
      },
      error: () => {
        console.log('Ocurrio un error en el dialogo de comfirmación.')
      }
    })
  }

  fnReloadData() {

  }


  nextPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this._facturaService.readByPage(this.pageIndex, this.pageSize).subscribe({
      next: (page: PageSpringBoot<FacturaEntity>) => {
        this._facturaService.facturaCambio.next(page);
      }
    })
  }


  nextPageFiltro(e: PageEvent) {

  }

  filtroPorCampo(e: string) {

  }

  viewPdf(obj: FacturaEntity | OrdenServicioEntity) {

    if ("idFactura" in obj) { //*Tipo FacturaEntity
      this._facturaService.buscarArchivoPorIdFactura(obj.idFactura).subscribe({
        next: (data: Blob) => {
          this.dialog.open(FacturaPdfViewerComponent, {
            scrollStrategy: this.overlay.scrollStrategies.noop(),
            data,
            width: '900px'
          })
        }
      })
    } else {
      this._facturaService.buscarArchivoPorIdOrdenServicio(obj.idOrdenServicio).subscribe({
        next: data => {
          this.dialog.open(FacturaPdfViewerComponent, {
            scrollStrategy: this.overlay.scrollStrategies.noop(),
            data,
            width: '900px'
          })
        }
      })
    }

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
