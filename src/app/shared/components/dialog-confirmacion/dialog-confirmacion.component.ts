import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe, NgIf, UpperCasePipe } from '@angular/common';
import { MaterialModule } from 'src/app/_material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstructuraDialogoConfirmacion } from './estructura-dialogo-confirmacion';

@Component({
  selector: 'app-dialog-confir',
  standalone: true,
  imports: [
    UpperCasePipe,
    DatePipe,
    NgIf,
    MaterialModule
  ],
  templateUrl: './dialog-confirmacion.component.html',
  styleUrls: ['./dialog-confirmacion.component.scss']
})
export class DialogConfirmacionComponent implements OnInit{

  fecha : Date = new Date();
  constructor(@Inject(MAT_DIALOG_DATA) public data : EstructuraDialogoConfirmacion, private dialogRef : MatDialogRef<DialogConfirmacionComponent>) { }


  ngOnInit(): void {
    // console.log(this.data?.body)

  }



  /*
  * retornara "true" cuando le dan en el btn de  aceptar.
  * para recoger ese valor leer la documentacion de angular material para el compoenente de MatDialog.
  */
  aceptar(){
    this.dialogRef.close(true);
  }

  /*
  * retornara "false" cuando le dan en el btn de  cancelar.
  * para recoger ese valor leer la documentacion de angular material para el compoenente de MatDialog.
  */
  cancelar(){
    this.dialogRef.close(false);
  }

}
