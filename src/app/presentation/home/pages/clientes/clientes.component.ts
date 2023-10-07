import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '@shared/widgets/input/input.component';
import { ClienteRepositoryImplService } from '@infraestructure/repositories/cliente/cliente-repository-impl.service';
import { PageSpringBoot } from 'src/base/utils/page-spring-boot';
import { ClienteEntity } from 'src/app/dominio/entities/cliente.entity';
import { ClienteEdicionComponent } from './cliente-edicion/cliente-edicion.component';
import { MatDialog } from '@angular/material/dialog';
import { EstructuraDialogoConfirmacion } from '@shared/components/dialog-confirmacion/estructura-dialogo-confirmacion';
import { DialogConfirmacionComponent } from '@shared/components/dialog-confirmacion/dialog-confirmacion.component';
import { Overlay } from '@angular/cdk/overlay';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/_material/material.module';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    InputComponent
  ],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit{


  //************ Inyecciones de dependencia **+********
  // appService = inject(AppService);

  dialog = inject(MatDialog);
  overlay = inject(Overlay);

  //************************************************ */

  //!-----------------------------------------------------


  displayedColumns: string[] = ['idCliente', 'nombres', 'telefono', 'email', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(public clienteService :ClienteRepositoryImplService ) {

  }
  ngOnInit(): void {
    // this.appService.isLoad.next(true);
    this.clienteService.readByPage(0, 5).subscribe({
      next: (data: PageSpringBoot<ClienteEntity>) => {
        this.dataSource = new MatTableDataSource(data.content);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // this.appService.isLoad.next(false);
      }
    })
  }



  fnCreateOrUpdate(obj?: any, i: number = 1): void {


    if (obj != undefined || obj != null) {
      //*EDICION

    } else {
      //*CREACION

    }

    this.dialog.open(ClienteEdicionComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      disableClose: true,
      // width: '250px',
    });

  }

  fnDelete(obj: ClienteEntity, deep: boolean) {
    let body : string; 
    let isEnableBtnConfir : boolean;
    if(obj.estado){
       body = deep ?
       `¿Desea eliminar de manera permanente al cliente con id ${obj.idCliente}?` : //eliminacion total de la bbdd   
       `¿Desea eliminar al cliente con id ${obj.idCliente}, pero conservando su información?`; //eliminacion con solo el estado
       isEnableBtnConfir = true;
    }else {
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
          this.clienteService!.deleteById(obj.idCliente, deep).subscribe(console.log)
        }else{

        }
      },
      error: () => {
        console.log('Ocurrio un error en el dialo de comfirmación.')
      }
    })
  }


  fnReloadData(){

    this.clienteService.readByPage(0,5).subscribe({
      next: (data: PageSpringBoot<ClienteEntity>) => {
        this.dataSource = new MatTableDataSource(data.content);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
