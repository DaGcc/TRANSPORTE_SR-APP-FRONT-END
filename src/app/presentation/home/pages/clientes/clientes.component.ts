import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { InputComponent } from '@shared/widgets/input/input.component';
import { ClienteRepositoryImplService } from '@infraestructure/repositories/cliente/cliente-repository-impl.service';
import { PageSpringBoot } from 'src/base/utils/page-spring-boot';
import { ClienteEntity } from 'src/app/dominio/entities/cliente.entity';
import { ClienteEdicionComponent } from './cliente-edicion/cliente-edicion.component';
import { MatDialog } from '@angular/material/dialog';
import { EstructuraDialogoConfirmacion } from '@shared/components/dialog-confirmacion/estructura-dialogo-confirmacion';
import { DialogConfirmacionComponent } from '@shared/components/dialog-confirmacion/dialog-confirmacion.component';
import { Overlay } from '@angular/cdk/overlay';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/_material/material.module';
import { IEntityEditionDialog } from '@shared/interfaces/IEntityEditionDialog';
import { Subscription, mergeMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    MaterialModule,
    InputComponent
  ],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit, OnDestroy {


  //************ Inyecciones de dependencia **+********

  dialog = inject(MatDialog);
  overlay = inject(Overlay);

  //************************************************ */

  //!-----------------------------------------------------


  //***** para la aplicacion de servicio paginado *****
  cantidad: number = 0;
  pageSize: number = 1;
  pageIndex: number = 0;
  //************************************************ */

  //!-----------------------------------------------------

  //***************** Subscriptores ******************/
  subcriptorReadClientesByPage$! : Subscription;
  //************************************************ */

  //!-----------------------------------------------------


  displayedColumns: string[] = ['idCliente', 'nombres', 'telefono', 'email', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  //*inyeccion de dependencia via constructor
  constructor(private clienteService: ClienteRepositoryImplService, private _snackBar : MatSnackBar) { }


  ngOnInit(): void {

    /** 
     ** Este solo se ejecutara si y solo si por algun lado le dan un .next al subject clientesCambio 
    */
    this.clienteService.clientesCambio.subscribe({
      next: (data: PageSpringBoot<ClienteEntity>) => {
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
     this.subcriptorReadClientesByPage$ = this.clienteService.readByPage(this.pageIndex,this.pageSize).subscribe({
      next: (data: PageSpringBoot<ClienteEntity>) => {

        //* seteamos la cantidad de elementos que tiene la respuesta, pero no el contenido, pues ese depende de el tamaño de la pagina.
        //* nos sirve para darle un tamaño al paginator.
        this.cantidad = data.totalElements; 

        this.dataSource = new MatTableDataSource(data.content);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })

    if(this.subcriptorReadClientesByPage$){
      console.log(true)
    }else{
      console.log(false)
    }
    console.log(this.subcriptorReadClientesByPage$);

  }

  /**
   ** Funcion que se ejecuta cada vez que interactuemos con el paginator.
   ** Nos sirve para hacer la siguiente peticion para la siguiente pagina, pues su parametro,
   ** nos da la pagina actual(page index) y el tamaño para la pagina, entre otros.
   * @param e 
   */
  nextPage( e : PageEvent){
    // this.cantidad = e.length;
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.clienteService.readByPage(this.pageIndex,this.pageSize).subscribe({
      next : (data: PageSpringBoot<ClienteEntity>)  => {
        this.clienteService.clientesCambio.next(data)
      }
    });
  }



  fnCreateOrUpdate(obj?: ClienteEntity): void {

    let data: IEntityEditionDialog<ClienteEntity>;

    if (obj != undefined || obj != null) {
      //*EDICION
      data = { title: 'EDICION', subtitle: `ID DEL CLIENTE : ${obj.idCliente}`, body: obj }
    } else {
      //*CREACION
      data = { title: 'CREACION', subtitle: 'Formulario para crear a un nuevo cliente' }
    }
    data.pageIndex = this.pageIndex;
    data.pageSize = this.pageSize;

    console.log(data)
    this.dialog.open(ClienteEdicionComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      disableClose: true,
      data
    });

  }

  fnDelete(obj: ClienteEntity, deep: boolean) {
    let body: string;
    let isEnableBtnConfir: boolean;
    //* si el estado es true, podemos cambiarlo(ocultarlo) 
    if (obj.estado) {
      //* habilitamos el boton de confirmación, pues su estado aun es true.
      isEnableBtnConfir = true;

      //* Si deep es true, es una eliminacion profunda, es decir, una eliminacion total de la base de datos
      body = deep ? 
        `¿Desea eliminar de manera permanente al cliente con id ${obj.idCliente}?` : //* eliminacion total de la bbdd   
        `¿Desea eliminar al cliente con id ${obj.idCliente}, pero conservando su información?`; //* eliminacion con solo el estado

    } else {//* si estado es false, es decir que ya ha sido eliminado, pero no con deep, deshabilitaremos la funcion del boton confirmar
      body = `No puede realizar dicha accion en este usuario debido a su estado del Cliente con id: ${obj.idCliente}.`;
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
          this.clienteService!.deleteById(obj.idCliente, deep).pipe(mergeMap(()=>{
            return this.clienteService.readByPage(this.pageIndex,this.pageSize);
          })).subscribe({
            next : (data : PageSpringBoot<ClienteEntity>) => {
              this.clienteService.clientesCambio.next(data);
            }
          })
        } else {
          this._snackBar.open('Ningun cambio por realizar','OK',{
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
    this.clienteService.readByPage(this.pageIndex, this.pageSize).subscribe({
      next: (data: PageSpringBoot<ClienteEntity>) => {
        this.clienteService.clientesCambio.next(data);
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



  //* BUENAS PRACTICAS
  ngOnDestroy(): void {

    //* Validamos si el subcriptor tiene alguna subscripcion para poder darse de baja.
    if(this.subcriptorReadClientesByPage$){
      this.subcriptorReadClientesByPage$.unsubscribe();
      console.log((this.subcriptorReadClientesByPage$))
    }


  }

}
