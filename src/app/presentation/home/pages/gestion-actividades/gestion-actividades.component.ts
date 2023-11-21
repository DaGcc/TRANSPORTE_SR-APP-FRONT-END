import { DatePipe, NgIf, NgStyle } from '@angular/common';
import { Component, inject, ViewChild, type OnInit } from '@angular/core';
import { PlacesService } from '../geolocalizacion/services/places.service';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '@shared/widgets/input/input.component';
import { SkeletonComponent } from '@shared/widgets/skeleton/skeleton.component';
import { TagComponent } from '@shared/widgets/tag/tag.component';
import { MaterialModule } from 'src/app/_material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActividadRepositoryImplService } from '@infraestructure/repositories/actividad/actividad-repository-impl.service';
import { PageSpringBoot } from '@base/utils/page-spring-boot';
import { ActividadEntity } from '@dominio/entities/actividad.entity';
import { mergeMap } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';
import { IEntityEditionDialog } from '@shared/interfaces/IEntityEditionDialog';
import { DialogConfirmacionComponent } from '@shared/components/dialog-confirmacion/dialog-confirmacion.component';
import { EstructuraDialogoConfirmacion } from '@shared/components/dialog-confirmacion/estructura-dialogo-confirmacion';

@Component({
  selector: 'app-gestion-actividades',
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    DatePipe,
    MaterialModule,
    InputComponent,
    FormsModule,
    TagComponent,
    SkeletonComponent
  ],
  templateUrl: './gestion-actividades.component.html',
  styleUrls: ['./gestion-actividades.component.scss']
})
export class GestionActividadesComponent implements OnInit {

  //************ Inyecciones de dependencia **+********

  dialog = inject(MatDialog);
  overlay = inject(Overlay);
  private _snackBar = inject(MatSnackBar);
  // private _bottomSheet = inject(MatBottomSheet)
  //************************************************ */



  //***** para la aplicacion de servicio paginado *****
  //?VALORES POR DEFECTO
  cantidad: number = 0;
  pageSize: number = 1;
  pageIndex: number = 0;
  //************************************************ */

  isLoadedDate: boolean = true;

  estadoActividades: '0' | '1' | '2' = '2';

  
  displayedColumns: string[] = ['idActividad', 'conductor', 'vehiculo','fechaCreada','solicitud','estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private _enableFilterPaginator: boolean = false
  valorDeFiltro: string = '';
  get isEnableFilterPaginator(): boolean {
    return this._enableFilterPaginator;
  }

  constructor(private _actividadService : ActividadRepositoryImplService) { }


  ngOnInit(): void { 

    this._actividadService.actividadCambio.subscribe({
      next: (data: PageSpringBoot<ActividadEntity>) => {
        this.isLoadedDate = true;
        this.cantidad = data.totalElements;
        this.dataSource = new MatTableDataSource<ActividadEntity>(data.content);
        this.dataSource.sort = this.sort;
      }
    })


    this._actividadService.readByPage(this.pageIndex, this.pageSize).subscribe({
      next: (data: PageSpringBoot<ActividadEntity>) => {
        this.cantidad = data.totalElements;
        this.dataSource = new MatTableDataSource<ActividadEntity>(data.content);
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
    this._actividadService.readByPage(this.pageIndex, this.pageSize, { estado: this.estadoActividades })
      .subscribe({
        next: (data: PageSpringBoot<ActividadEntity>) => {
          this._actividadService.actividadCambio.next(data)
        }
      });
  }

  loadDataByStatus() {
    this.isLoadedDate = false;
    this._actividadService.readByPage(this.pageIndex, this.pageSize, {
      estado: this.estadoActividades
    }).subscribe({
      next: (data: PageSpringBoot<ActividadEntity>) => {
        this._actividadService.actividadCambio.next(data);
      }
    })
  }


  filtroPorCampo(e: String) {

  }


  nextPageFiltro(e: PageEvent) {
    // this.isLoadedDate = false;
    // this._actividadService.filtroVehiculos(e.pageIndex, e.pageSize, this.valorDeFiltro).subscribe(d => {
    //   // this.cantidad = d.totalElements;
    //   this.dataSource = new MatTableDataSource<ActividadEntity>(d.content);
    //   this.isLoadedDate = true;
    //   this.dataSource.sort = this.sort;
    // })
  }


  /**
   ** Metodo para crear o actualizar la data de una entidad en especifico.
   * @param obj  => sera a entidad a evaluar para su creacion o actualizacion
   */
  fnCreateOrUpdate(obj?: ActividadEntity): void {

    let data: IEntityEditionDialog<ActividadEntity>;

    if (obj != undefined || obj != null) {
      //*EDICION
      data = { title: 'EDICION', subtitle: `ID DE LA SOLICITUD : ${obj.idActividad}`, body: obj }
    } else {
      //*CREACION
      data = { title: 'CREACION', subtitle: 'Formulario para registrar a una nueva solicitud' }
    }
    data.pageIndex = this.pageIndex;
    data.pageSize = this.pageSize;

    // console.log(data)
    // this.dialog.open(SolicitudEdicionComponent, {
    //   scrollStrategy: this.overlay.scrollStrategies.noop(),
    //   autoFocus: false,
    //   disableClose: true,
    //   data,
    //   width: "1000px"
    // });

  }


  /**
   ** Metodo para eliminar de dos manera en base a los argumentos enviados.
   * 
   * @param obj se recogera su id
   * @param deep para eliminar de manera profunda o solo por estado 
   */
  fnDelete(obj: ActividadEntity, deep: boolean) {
    let body: string;
    let isEnableBtnConfir: boolean;
    //* si el estado es true, podemos cambiarlo(ocultarlo) 
    if (obj.estado) {
      //* habilitamos el boton de confirmación, pues su estado aun es true.
      isEnableBtnConfir = true;

      //* Si deep es true, es una eliminacion profunda, es decir, una eliminacion total de la base de datos
      body = deep ?
        `¿Desea eliminar de manera permanente la actividad con id ${obj.idActividad}?` : //* eliminacion total de la bbdd   
        `¿Desea eliminar la actividad con id ${obj.idActividad}, pero conservando su información?`; //* eliminacion con solo el estado

    } else {//* si estado es false, es decir que ya ha sido eliminado, pero no con deep, deshabilitaremos la funcion del boton confirmar
      body = `No puede realizar dicha accion debido a su estado de la actividad de id: ${obj.idActividad}.`;
      isEnableBtnConfir = false;
    }

    //* Objeto de tipo `EstructuraDialogoConfirmacion` con lso valores necesarios para la confirmacion
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
    //* evaluaremos si es sque se confirmo o no en el dialogo de confimación.
    result.afterClosed().subscribe({
      next: (confirmationResult: boolean) => {
        if (confirmationResult) {//* Si dio en confirmar
          this.isLoadedDate = false;
          this._actividadService!.deleteById(obj.idActividad, deep).pipe(mergeMap((_) => {
            return this._actividadService.readByPage(this.pageIndex, this.pageSize);
          })).subscribe({
            next: (data: PageSpringBoot<ActividadEntity>) => {
              this._actividadService.actividadCambio.next(data);
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


  /**
   ** Metodo para recargar la data en la tabla
   ** Tambien trabaja con estado
   */
  fnReloadData() {
    this.isLoadedDate = false;
    this._actividadService.readByPage(this.pageIndex, this.pageSize, {
      estado: this.estadoActividades
    }).subscribe({
      next: (data: PageSpringBoot<ActividadEntity>) => {
        // this.isLoadedDate = true;
        this._enableFilterPaginator = false;
        this._actividadService.actividadCambio.next(data);
      }
    })
  }

  /**
   ** Filtro a nivel local, es decir, que no hace una peticion para aplicar filtro.
   * @param event => parametro propio el paginator de Angular Material
   */
  applyFilter(event: Event) {
    console.log(event)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  /**
   ** Metodo que abrira una hoja emergente, que mostrara el detalle de la solicitud
   * @param obj => parametro que enviaremos a esa hoja para el renderizado
   */
  verDescripcion( obj : ActividadEntity ){
    // this._bottomSheet.open(VerDescriptionComponent, {
    //   data : obj,
    //   panelClass : "bs",
    //   scrollStrategy : this.overlay.scrollStrategies.noop()
    // })
  }



}
