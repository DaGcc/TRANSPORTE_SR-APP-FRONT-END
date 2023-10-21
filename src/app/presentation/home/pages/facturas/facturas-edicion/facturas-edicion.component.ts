import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/_material/material.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEntityEditionDialog } from '@shared/interfaces/IEntityEditionDialog';
import { FacturaEntity } from '@dominio/entities/factura.entity';

@Component({
  selector: 'app-facturas-edicion',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './facturas-edicion.component.html',
  styleUrls: ['./facturas-edicion.component.scss']
})
export class FacturasEdicionComponent implements OnInit {



  frmFactura!: FormGroup;
  frmOrdenServicio!: FormGroup;

  estados: boolean[] = [true, false]

  constructor ( @Inject(MAT_DIALOG_DATA) public data : IEntityEditionDialog<FacturaEntity>, public dialogRef : MatDialogRef<FacturasEdicionComponent> ){ }

  ngOnInit(): void {
    this.initForm();

    //** condicional para la edicion 
    if (this.data.body?.idFactura != undefined && this.data.body != undefined ) {//** modificacion
      
      //* Seteamos valores al formulario
      this.frmFactura.get('idFactura')?.setValue(this.data.body.idFactura);
      this.frmFactura.get('codigoFactura')?.setValue(this.data.body.codigoFactura);
      this.frmFactura.get('estado')?.setValue(this.data.body.estado);

      this.frmOrdenServicio.get('idOrdenServicio')?.setValue(this.data.body.ordenServicio.idOrdenServicio)
      this.frmOrdenServicio.get('codigoOrdenServico')?.setValue(this.data.body.ordenServicio.codigoOrden);
      this.frmOrdenServicio.get('estado')?.setValue(this.data.body.ordenServicio.estado);
    }else{//* creacion
      
    }

  }



  /**
   ** Metodo para inicializar el formulario.
   ** Inicializara tambien los controles de cada formulario.
   */
  initForm(){
    this.frmFactura = new FormGroup({
      'idFactura': new FormControl(0),
      'codigoFactura': new FormControl(undefined, Validators.required),
      // 'fecha': new FormGroup(undefined, Validators.required),
      'estado': new FormControl(undefined, Validators.required)
    })

    this.frmOrdenServicio = new FormGroup({
      'idOrdenServicio': new FormControl(0),
      'codigoOrdenServico': new FormControl(undefined, Validators.required),
      // 'fecha': new FormControl(undefined, Validators.required),
      'estado': new FormControl(undefined, Validators.required)
    })
  }




  limitarLongitud(event: any): void {
    console.log(event)
    const inputValue: string = event.target.value;
    if (inputValue.length > 9) {
      event.target.value = inputValue.slice(0, 9);//solo quedate con los 9 primeros
    }
  }

}
