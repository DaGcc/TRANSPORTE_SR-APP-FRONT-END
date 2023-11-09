import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { MaterialModule } from 'src/app/_material/material.module';
import { InputComponent } from '@shared/widgets/input/input.component';
import { VehiculoRepositoryImplService } from '@infraestructure/repositories/vehiculo/vehiculo-repository-impl.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TagComponent } from '@shared/widgets/tag/tag.component';
import { FormsModule } from '@angular/forms';
import { SkeletonComponent } from '@shared/widgets/skeleton/skeleton.component';
import { MatDialog } from '@angular/material/dialog';
import { PageSpringBoot } from '@base/utils/page-spring-boot';
import { VehiculoEntity } from '@dominio/entities/vehiculo.entity';
import { EstructuraDialogoConfirmacion } from '@shared/components/dialog-confirmacion/estructura-dialogo-confirmacion';
import { IEntityEditionDialog } from '@shared/interfaces/IEntityEditionDialog';
import { FlotaEdicionComponent } from './flota-edicion/flota-edicion.component';
import { Overlay } from '@angular/cdk/overlay';
import { DialogConfirmacionComponent } from '@shared/components/dialog-confirmacion/dialog-confirmacion.component';
import { mergeMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gestion-flota',
  standalone: true,
  imports: [

    NgIf,
    NgStyle,
    MaterialModule,
    InputComponent,
    FormsModule,
    TagComponent,
    SkeletonComponent

  ],
  templateUrl: './gestion-flota.component.html',
  styleUrls: ['./gestion-flota.component.scss']
})
export class GestionFlotaComponent implements OnInit {


  //************ Inyecciones de dependencia **+********

  _vehiculoService = inject(VehiculoRepositoryImplService);
  dialog = inject(MatDialog);
  overlay = inject(Overlay);
  _snackBar = inject(MatSnackBar);

  //************************************************ */

  //!-----------------------------------------------------


  //***** para la aplicacion de servicio paginado *****
  //?VALORES POR DEFECTO
  cantidad: number = 0;
  pageSize: number = 1;
  pageIndex: number = 0;
  //************************************************ */

  isLoadedDate: boolean = true;

  estadoVehiculos: '0' | '1' | '2' = '2';

  displayedColumns: string[] = ['idVehiculo', 'descripcion', 'placa', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  private debounceFilter?: NodeJS.Timeout
  private _enableFilterPaginator: boolean = false
  valorDeFiltro: string = '';
  get isEnableFilterPaginator(): boolean {
    return this._enableFilterPaginator;
  }


  ngOnInit(): void {

    this._vehiculoService.vehiculoCambio.subscribe({
      next: (data: PageSpringBoot<VehiculoEntity>) => {
        this.isLoadedDate = true;
        this.cantidad = data.totalElements;
        this.dataSource = new MatTableDataSource<VehiculoEntity>(data.content);
        this.dataSource.sort = this.sort;
      }
    })

    this._vehiculoService.readByPage(this.pageIndex, this.pageSize).subscribe({
      next: (data: PageSpringBoot<VehiculoEntity>) => {
        this.cantidad = data.totalElements;
        this.dataSource = new MatTableDataSource<VehiculoEntity>(data.content);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }
    })
  }


  /**
   ** Funcion que se ejecuta cada vez que interactuemos con el paginator.
   ** Nos sirve para hacer la siguiente peticion para la siguiente pagina, pues su parametro,
   ** nos da la pagina actual(page index) y el tamaño para la pagina, entre otros.
   * @param e 
   */
  nextPage(e: PageEvent) {
    // this.cantidad = e.length;
    this.isLoadedDate = false;
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this._vehiculoService.readByPage(this.pageIndex, this.pageSize, { estado: this.estadoVehiculos })
      .subscribe({
        next: (data: PageSpringBoot<VehiculoEntity>) => {
          this._vehiculoService.vehiculoCambio.next(data)
        }
      });
  }

  loadDataByStatus() {
    this.isLoadedDate = false;
    this._vehiculoService.readByPage(this.pageIndex, this.pageSize, {
      estado: this.estadoVehiculos
    }).subscribe({
      next: (data: PageSpringBoot<VehiculoEntity>) => {
        this._vehiculoService.vehiculoCambio.next(data);
      }
    })
  }


  filtroPorCampo(e: String) {

  }


  nextPageFiltro(e: PageEvent) {
    this.isLoadedDate = false;
    this._vehiculoService.filtroVehiculos(e.pageIndex, e.pageSize, this.valorDeFiltro).subscribe(d => {
      // this.cantidad = d.totalElements;
      this.dataSource = new MatTableDataSource<VehiculoEntity>(d.content);
      this.isLoadedDate = true;
      this.dataSource.sort = this.sort;
    })
  }


  fnCreateOrUpdate(obj?: VehiculoEntity): void {

    let data: IEntityEditionDialog<VehiculoEntity>;

    if (obj != undefined || obj != null) {
      //*EDICION
      data = { title: 'EDICION', subtitle: `ID DEL VEHICULO : ${obj.idVehiculo}`, body: obj }
    } else {
      //*CREACION
      data = { title: 'CREACION', subtitle: 'Formulario para registrar a un nuevo vehiculo' }
    }
    data.pageIndex = this.pageIndex;
    data.pageSize = this.pageSize;

    console.log(data)
    this.dialog.open(FlotaEdicionComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      autoFocus: false,
      disableClose: true,
      data,
      width: "1000px"
    });

  }





  /**
   ** Metodo para eliminar de dos manera en base a los argumentos enviados.
   * 
   * @param obj se recogera su id
   * @param deep para eliminar de manera profunda o solo por estado 
   */
  fnDelete(obj: VehiculoEntity, deep: boolean) {
    let body: string;
    let isEnableBtnConfir: boolean;
    //* si el estado es true, podemos cambiarlo(ocultarlo) 
    if (obj.estado) {
      //* habilitamos el boton de confirmación, pues su estado aun es true.
      isEnableBtnConfir = true;

      //* Si deep es true, es una eliminacion profunda, es decir, una eliminacion total de la base de datos
      body = deep ?
        `¿Desea eliminar de manera permanente al vehiculo con id ${obj.idVehiculo}?` : //* eliminacion total de la bbdd   
        `¿Desea eliminar al vehiculo con id ${obj.idVehiculo}, pero conservando su información?`; //* eliminacion con solo el estado

    } else {//* si estado es false, es decir que ya ha sido eliminado, pero no con deep, deshabilitaremos la funcion del boton confirmar
      body = `No puede realizar dicha accion debido a su estado del vehiculo de id: ${obj.idVehiculo}.`;
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
        if (confirmationResult) {//* Si dio en confirmar
          this.isLoadedDate = false;
          this._vehiculoService!.deleteById(obj.idVehiculo, deep).pipe(mergeMap((_) => {
            return this._vehiculoService.readByPage(this.pageIndex, this.pageSize);
          })).subscribe({
            next: (data: PageSpringBoot<VehiculoEntity>) => {
              this._vehiculoService.vehiculoCambio.next(data);
            }
          })
        } else {//* si cancelo
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
    this.isLoadedDate = false;
    this._vehiculoService.readByPage(this.pageIndex, this.pageSize, {
      estado: this.estadoVehiculos
    }).subscribe({
      next: (data: PageSpringBoot<VehiculoEntity>) => {
        // this.isLoadedDate = true;
        this._enableFilterPaginator = false;
        this._vehiculoService.vehiculoCambio.next(data);
      }
    })
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
