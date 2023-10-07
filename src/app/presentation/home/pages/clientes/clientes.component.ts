import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from '@shared/components/table-view/table-view.component';
import { InputComponent } from '@shared/widgets/input/input.component';
import { ClienteRepositoryImplService } from '@infraestructure/repositories/cliente/cliente-repository-impl.service';
import { PageSpringBoot } from 'src/base/utils/page-spring-boot';
import { ClienteEntity } from 'src/app/dominio/entities/cliente.entity';
import { ClienteEdicionComponent } from './cliente-edicion/cliente-edicion.component';
import { MatDialog } from '@angular/material/dialog';
import { EstructuraDialogoConfirmacion } from '@shared/components/dialog-confirmacion/estructura-dialogo-confirmacion';
import { DialogConfirmacionComponent } from '@shared/components/dialog-confirmacion/dialog-confirmacion.component';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    TableViewComponent,
    InputComponent
  ],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {


  //************ Inyecciones de dependencia **+********

  dialog = inject(MatDialog);
  overlay = inject(Overlay);


  //************************************************ */

  //!-----------------------------------------------------


  data: ClienteEntity[] = [];

  displayedColumns: string[] = ['idCliente', 'nombres', 'telefono', 'email', 'estado', 'acciones'];

  constructor(public clienteService :ClienteRepositoryImplService ) {
    this.clienteService.readByPage(0, 5).subscribe({
      next: (data: PageSpringBoot<ClienteEntity>) => {
        this.data = data.content;
      }
    })
  }

  get service(){
    return this.clienteService;
  }
  



  openDialogEdition(obj?: any, i: number = 1): void {


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
                                                         
    let body = deep ?
     `¿Desea eliminar de manera permanente al cliente con id ${obj.idCliente}?` : //eliminacion total de la bbdd   
     `¿Desea eliminar al cliente con id ${obj.idCliente}, pero conservando su información?`; //eliminacion con solo el estado

    let data: EstructuraDialogoConfirmacion = {
      header: `Delete`,
      body
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

}
