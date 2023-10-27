import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from '@shared/components/table-view/table-view.component';
import { InputComponent } from '@shared/widgets/input/input.component';
import { MatDialog } from '@angular/material/dialog';
import { TrabajadoresEdicionComponent } from './trabajadores-edicion/trabajadores-edicion.component';
import { Overlay } from '@angular/cdk/overlay';
import { DialogConfirmacionComponent } from '@shared/components/dialog-confirmacion/dialog-confirmacion.component';
import { EstructuraDialogoConfirmacion } from '@shared/components/dialog-confirmacion/estructura-dialogo-confirmacion';
import { MaterialModule } from 'src/app/_material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteRepositoryImplService } from '@infraestructure/repositories/cliente/cliente-repository-impl.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription, mergeMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PageSpringBoot } from '@base/utils/page-spring-boot';
import { ClienteEntity } from '@dominio/entities/cliente.entity';
import { IEntityEditionDialog } from '@shared/interfaces/IEntityEditionDialog';
import { ClienteEdicionComponent } from '../clientes/cliente-edicion/cliente-edicion.component';
import { ConductorRepositoryImplService } from '@infraestructure/repositories/conductor/conductor-repository-impl.service';
import { ConductorEntity } from '@dominio/entities/conductor.entity';

@Component({
  selector: 'app-trabajadores',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    InputComponent
  ],
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.scss']
})
export class TrabajadoresComponent  implements OnInit, OnDestroy {


  //************ Inyecciones de dependencia **+********

  dialog = inject(MatDialog);
  overlay = inject(Overlay);

  //************************************************ */

  //!-----------------------------------------------------


  //***** para la aplicacion de servicio paginado *****
  //?VALORES POR DEFECTO
  cantidad: number = 0;
  pageSize: number = 1;
  pageIndex: number = 0;
  //************************************************ */

  //!-----------------------------------------------------

  //***************** Subscriptores ******************/
  subscriptorReadConductorByPage$!: Subscription;
  subscriptorClienteCambio$!: Subscription;
  //************************************************ */

  //!-----------------------------------------------------


  displayedColumns: string[] = ['idConductor', 'nombres', 'telefono', 'email', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  estadoConductores: '0' | '1' | '2' = '2';


  //*inyeccion de dependencia via constructor
  constructor(private _conductorService: ConductorRepositoryImplService, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {

    /** 
     ** Este solo se ejecutara si y solo si por algun lado le dan un .next al subject clientesCambio 
    */
    this.subscriptorClienteCambio$ = this._conductorService.conductorCambio$.subscribe({
      next: (data: PageSpringBoot<ConductorEntity>) => {
        // console.log(data)
        this.dataSource = new MatTableDataSource(data.content);
        this.dataSource.sort = this.sort;
        this.cantidad = data.totalElements;//* nos sirve para darle un tamaño al paginator.
        //! ya no seteamos el "this.dataSource.paginator = this.paginator;", pues se resetearia sus valores de pagina
      }
    })

    /** 1
     ** Solicitara a al repositorio un llamado a lo establecido, con  el número pagina establecida y un tamaño
     ** esto, es debido a que estamos consumiendo de manera paginada.
     ** Por otro lado, dicha subcricion se la damos a una variable de tipo Subscription para que le haga referencia, pues es una buena practica 
     ** para evitar perdidas o fugas de memoria.
     */
    this.subscriptorReadConductorByPage$ = this._conductorService.readByPage(this.pageIndex, this.pageSize).subscribe({
      next: (data: PageSpringBoot<ConductorEntity>) => {

        //* seteamos la cantidad de elementos que tiene la respuesta, pero no el contenido, pues ese depende de el tamaño de la pagina.
        //* nos sirve para darle un tamaño al paginator.
        this.cantidad = data.totalElements;

        this.dataSource = new MatTableDataSource(data.content);
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
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this._conductorService.readByPage(this.pageIndex, this.pageSize, { estado: this.estadoConductores })
      .subscribe({
        next: (data: PageSpringBoot<ConductorEntity>) => {
          this._conductorService.conductorCambio$.next(data)
        }
      });
  }


  fnCreateOrUpdate(obj?: ConductorEntity): void {

    let data: IEntityEditionDialog<ConductorEntity>;

    if (obj != undefined || obj != null) {
      //*EDICION
      data = { title: 'EDICION', subtitle: `ID DEL CONDUCTOR : ${obj.idConductor}`, body: obj }
    } else {
      //*CREACION
      data = { title: 'CREACION', subtitle: 'Formulario para crear a un nuevo conductor' }
    }
    data.pageIndex = this.pageIndex;
    data.pageSize = this.pageSize;

    console.log(data)
    this.dialog.open(TrabajadoresEdicionComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      disableClose: true,
      data
    });

  }

  fnDelete(obj: ConductorEntity, deep: boolean) {
    let body: string;
    let isEnableBtnConfir: boolean;
    //* si el estado es true, podemos cambiarlo(ocultarlo) 
    if (obj.estado) {
      //* habilitamos el boton de confirmación, pues su estado aun es true.
      isEnableBtnConfir = true;

      //* Si deep es true, es una eliminacion profunda, es decir, una eliminacion total de la base de datos
      body = deep ?
        `¿Desea eliminar de manera permanente al cliente con id ${obj.idConductor}?` : //* eliminacion total de la bbdd   
        `¿Desea eliminar al cliente con id ${obj.idConductor}, pero conservando su información?`; //* eliminacion con solo el estado

    } else {//* si estado es false, es decir que ya ha sido eliminado, pero no con deep, deshabilitaremos la funcion del boton confirmar
      body = `No puede realizar dicha accion en este usuario debido a su estado del Cliente con id: ${obj.idConductor}.`;
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
          this._conductorService!.deleteById(obj.idConductor, deep).pipe(mergeMap(() => {
            return this._conductorService.readByPage(this.pageIndex, this.pageSize);
          })).subscribe({
            next: (data: PageSpringBoot<ConductorEntity>) => {
              this._conductorService.conductorCambio$.next(data);
            }
          })
        } else {
          this._snackBar.open('Ningun cambio por realizar', 'OK', {
            duration: 2000
          })
        }
      },
      error: () => {
        console.log('Ocurrio un error en el dialo de comfirmación.')
      }
    })
  }


  fnReloadData() {
    this._conductorService.readByPage(this.pageIndex, this.pageSize).subscribe({
      next: (data: PageSpringBoot<ConductorEntity>) => {
        this._enableFilterPaginator = false;
        this._conductorService.conductorCambio$.next(data);
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


  private debounceFilter?: NodeJS.Timeout
  private _enableFilterPaginator: boolean = false
  valorDeFiltro: string = '';
  get isEnableFilterPaginator(): boolean {
    return this._enableFilterPaginator;
  }

  filtroPorCampo(e: string) {
    this.debounceFilter ? clearTimeout(this.debounceFilter) : '';

    this.debounceFilter = setTimeout(() => {
      if (e.trim() == '') {
        this._snackBar.open('No se filtrara espacios en blanco', 'AVISO', {
          duration: 1300
        })
      } else {
        this.valorDeFiltro = e;
        this._enableFilterPaginator = true;
        this._conductorService.filtroConductores(0, this.pageSize, this.valorDeFiltro).subscribe(d => {
          this.cantidad = d.totalElements;
          this.dataSource = new MatTableDataSource<ConductorEntity>(d.content);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;//* le damos el pginador por ser un nuevo elemento html paginador
        })
      }
    }, 600)
  }

  nextPageFiltro(e: PageEvent) {
    this._conductorService.filtroConductores(e.pageIndex, e.pageSize, this.valorDeFiltro).subscribe(d => {
      // this.cantidad = d.totalElements;
      this.dataSource = new MatTableDataSource<ConductorEntity>(d.content);
      this.dataSource.sort = this.sort;
    })
  }


  loadDataByStatus() {
    this._conductorService.readByPage(this.pageIndex, this.pageSize, {
      estado: this.estadoConductores
    }).subscribe({
      next: (data: PageSpringBoot<ConductorEntity>) => {
        this._conductorService.conductorCambio$.next(data);
      }
    })
  }

  //* BUENAS PRACTICAS
  ngOnDestroy(): void {

    //* DATO: para desubscribir a un subscriptor primero tenemos que validar tiene alguna subscripción para poder darse de baja.

    if (this.subscriptorReadConductorByPage$) {
      this.subscriptorReadConductorByPage$.unsubscribe();
      // console.log((this.subscriptorReadClientesByPage$))
    }

    if (this.subscriptorClienteCambio$) {
      this.subscriptorClienteCambio$.unsubscribe();
    }
  }


}
