import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/_material/material.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IEntityEditionDialog } from '@shared/interfaces/IEntityEditionDialog';
import { FacturaEntity } from '@dominio/entities/factura.entity';
import { FacturaRepositoryImplService } from '@infraestructure/repositories/factura/factura-repository-impl.service';
import { OrdenServicioEntity } from '@dominio/entities/ordenServicio.entity';
import { FacturaOrdenServicioDTO } from '@base/utils/factura_orden_servicio-dto';
import { switchMap } from 'rxjs';
import { PageSpringBoot } from '@base/utils/page-spring-boot';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-facturas-edicion',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './facturas-edicion.component.html',
  styleUrls: ['./facturas-edicion.component.scss']
})
export class FacturasEdicionComponent implements OnInit {



  frmFactura!: FormGroup;

  estados: boolean[] = [true, false]

  isCreation: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IEntityEditionDialog<FacturaEntity>, public dialogRef: MatDialogRef<FacturasEdicionComponent>,
    private facturaService: FacturaRepositoryImplService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();

    //** condicional para la edicion 
    if (this.data.body?.idFactura != undefined && this.data.body != undefined) {//** modificacion
      this.isCreation = false;

      //* Seteamos valores al formulario
      this.frmFactura.get('idFactura')?.setValue(this.data.body.idFactura);
      this.frmFactura.get('codigoFactura')?.setValue(this.data.body.codigoFactura);
      // this.frmFactura.get('fechaFactura')?.setValue(this.data.body.fecha);
      this.frmFactura.get('estadoFactura')?.setValue(this.data.body.estado);
      this.frmFactura.get('idOrdenServicio')?.setValue(this.data.body.ordenServicio.idOrdenServicio)
      this.frmFactura.get('codigoOrdenServico')?.setValue(this.data.body.ordenServicio.codigoOrden);
      // this.frmFactura.get('fechaOrdenServicio')?.setValue(this.data.body.ordenServicio.fecha);
      this.frmFactura.get('estadoOrdenServicio')?.setValue(this.data.body.ordenServicio.estado);
    } else {//* creacion
      this.isCreation = true
    }

  }

  /**
   ** Metodo para inicializar el formulario.
   ** Inicializara tambien los controles de cada formulario.
   */
  initForm() {
    this.frmFactura = new FormGroup({
      'idFactura': new FormControl(undefined),
      'codigoFactura': new FormControl(undefined, Validators.required),
      // 'fechaFactura': new FormGroup(undefined, Validators.required),
      'estadoFactura': new FormControl(undefined, Validators.required),

      'idOrdenServicio': new FormControl(undefined),
      'codigoOrdenServico': new FormControl(undefined, Validators.required),
      // 'fechaOrdenServicio': new FormControl(undefined, Validators.required),
      'estadoOrdenServicio': new FormControl(undefined, Validators.required)
    })
  }



  /**
   * Operaremos en base a una variable que nos indicara si es de edicion o creacion.
   * 
   */
  operar() {

    let fechaISO = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString();

    //* creamos el dto que contiene la factura y el orden servicio
    let dto: FacturaOrdenServicioDTO = {
      idFactura : this.frmFactura.get('idFactura')?.value,
      codigoFactura: this.frmFactura.get('codigoFactura')?.value,
      codigoOrden: this.frmFactura.get('codigoOrdenServico')?.value,
      idOrdenServicio : this.frmFactura.get('idOrdenServicio')?.value,
      estadoFactura: this.frmFactura.get('estadoFactura')?.value,
      estadoOrden: this.frmFactura.get('estadoOrdenServicio')?.value,
      fechaFactura: this.data.body?.fecha || fechaISO ,
      fechaOrden: this.data.body?.ordenServicio.fecha || fechaISO
    }


    if (this.isCreation) {//* CREACION
      
      console.log(dto)

      // console.log(fechaISO.replace('Z',''))


      //* BUENAS PRACTICAS
      //! Lanzamos un error si no se cargan los archivos correspondientes.
      //! Esto con el fin de evitar ejecutar las instrucciones siguientes que es interactuar con la API.
      if (!this.fileOs || !this.fileFactura) throw Error('No se encuentran los archivos file factura o file orden servicio.');

      // console.log(dto)
      this.facturaService.createEspecial(this.fileFactura!, this.fileOs!, dto).pipe(switchMap(() => {
        return this.facturaService.readByPage(0, this.data.pageSize || 5);
      })).subscribe({
        next: (data: PageSpringBoot<FacturaEntity>) => {
          this.facturaService.facturaCambio.next(data);
          this._snackBar.open('Factura registrada con exito!.', 'OK')
          this.dialogRef.close();
        }
      })


    } else {//* MODIFICACION

      this.facturaService.updateEspecial(this.fileFactura!, this.fileOs!, dto).pipe(switchMap((data)=>{
        console.log(data)
        return this.facturaService.readByPage(this.data.pageIndex || 0, this.data.pageSize || 5)
      })).subscribe({
        next: (data : PageSpringBoot<FacturaEntity>) => {
          this._snackBar.open(`Factura de id: ${dto.idFactura}, editada con exito!`, 'OK')
          this.facturaService.facturaCambio.next(data);
            this.dialogRef.close();
        }
      }) 
    }

  }
  fileOs: File | undefined | null;
  cargarFileOrdenServicio(e: Event) {
    this.fileOs = (e.target as HTMLInputElement).files?.item(0);
  }

  fileFactura: File | undefined | null
  cargarFileFactura(e: Event) {
    this.fileFactura = (e.target as HTMLInputElement).files?.item(0);
  }


  limitarLongitud(event: any): void {
    // console.log(event)
    const inputValue: string = event.target.value;
    if (inputValue.length > 9) {
      event.target.value = inputValue.slice(0, 9);//solo quedate con los 9 primeros
    }
  }

}
