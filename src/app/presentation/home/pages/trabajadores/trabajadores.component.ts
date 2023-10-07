import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from '@shared/components/table-view/table-view.component';
import { InputComponent } from '@shared/widgets/input/input.component';
import { MatDialog } from '@angular/material/dialog';
import { TrabajadoresEdicionComponent } from './trabajadores-edicion/trabajadores-edicion.component';
import { Overlay } from '@angular/cdk/overlay';
import { DialogConfirmacionComponent } from '@shared/components/dialog-confirmacion/dialog-confirmacion.component';
import { EstructuraDialogoConfirmacion } from '@shared/components/dialog-confirmacion/estructura-dialogo-confirmacion';

@Component({
  selector: 'app-trabajadores',
  standalone: true,
  imports: [
    CommonModule,
    TableViewComponent,
    InputComponent
  ],
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.scss']
})
export class TrabajadoresComponent {

  dialog = inject(MatDialog);
  overlay = inject(Overlay);

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'acciones'];



  openDialogEdition( obj? : any, i : number = 1 ): void {


    if( obj != undefined  || obj != null){
      //*EDICION

    }else {
      //*CREACION

    }

    this.dialog.open(TrabajadoresEdicionComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      disableClose : true,
      // width: '250px',
    });
    
  }

  fnDelete( obj : any ){
    let data : EstructuraDialogoConfirmacion = {
      header :  `Delete`,
      body : `¿Desea eliminar al trabajador con id ${obj.id}?`,
    } 
    const result = this.dialog.open(DialogConfirmacionComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      disableClose : true ,
      data,
 
    });
    result.afterClosed().subscribe({
      next : r => console.log(r)
    })
  }

  /**
  //!---- OTRA FORMA aplicando funcion flechas -------
  openDialogEditionO : ( obj? : any ) => void = () => { }
  //!--------------------------------------------------
  */
}
