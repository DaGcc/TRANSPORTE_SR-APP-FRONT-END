import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MaterialModule } from 'src/app/_material/material.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoVehiculoService } from '@infraestructure/services/tipo-vehiculo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehiculoEntity } from '@dominio/entities/vehiculo.entity';
import { VehiculoRepositoryImplService } from '@infraestructure/repositories/vehiculo/vehiculo-repository-impl.service';
import { IEntityEditionDialog } from '@shared/interfaces/IEntityEditionDialog';
import { DetalleVehiculoEntity } from '@dominio/entities/detalleVehiculo.entity';
import { TipoClienteEntity } from '@dominio/entities/tipoCliente.entity';
import { TipoVehiculoEntity } from '@dominio/entities/tipoVehiculo.entity';
import { switchMap } from 'rxjs';
import { PageSpringBoot } from '@base/utils/page-spring-boot';


@Component({
  selector: 'app-flota-edicion',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './flota-edicion.component.html',
  styleUrls: ['./flota-edicion.component.scss']
})
export class FlotaEdicionComponent implements OnInit {


  //************ Inyecciones de dependencia **+********

  private _vehiculoService = inject(VehiculoRepositoryImplService);
  dialogRef = inject(MatDialogRef<FlotaEdicionComponent>);
  private _tipoVehiculoService = inject(TipoVehiculoService);

  //************************************************ */


  frmVehiculo!: FormGroup

  listaDetalleVehiculo: DetalleVehiculoEntity[] = []


  tiposVehiculo: TipoVehiculoEntity[] = []
  estados: boolean[] = [true, false]

  constructor(@Inject(MAT_DIALOG_DATA) public data: IEntityEditionDialog<VehiculoEntity>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    console.log(this.data)
    this.frmVehiculo = new FormGroup({
      "idVehiculo": new FormControl(undefined),
      "tipoVehiculo": new FormControl(undefined, Validators.required),
      "placa": new FormControl(undefined, Validators.required),
      "colorVehiculo": new FormControl(undefined, Validators.required),
      "alto": new FormControl(undefined, Validators.required),
      "ancho": new FormControl(undefined, Validators.required),
      "estado": new FormControl(undefined, Validators.required)
    })


    this._tipoVehiculoService.readAll().subscribe({
      next: (data: TipoVehiculoEntity[]) => {
        this.tiposVehiculo = data;
      }
    })

    if (this.isEdition) {//* EDICION

      this.frmVehiculo.get("idVehiculo")?.setValue(this.data.body!.idVehiculo)
      this.frmVehiculo.get("tipoVehiculo")?.setValue(this.data.body!.tipoVehiculo.idTipoVehiculo)
      this.frmVehiculo.get("placa")?.setValue(this.data.body!.placa)
      this.frmVehiculo.get("colorVehiculo")?.setValue(this.data.body!.colorVehiculo)
      this.frmVehiculo.get("alto")?.setValue(Number(this.data.body!.alto.replace(",", ".")))//? crregir en la base de datos
      this.frmVehiculo.get("ancho")?.setValue(Number(this.data.body!.ancho.replace(",", ".")))
      this.frmVehiculo.get("estado")?.setValue(this.data.body!.estado)


    } else { //* CREACION

    }

  }

  get isEdition() : boolean{
    return this.data.body?.idVehiculo != null || this.data.body?.idVehiculo != undefined;
  }


  limitarLongitud(event: any): void {
    console.log(event)
    const inputValue: string = event.target.value;
    if (inputValue.length > 7) {
      event.target.value = inputValue.slice(0, 6);//solo quedate con los 9 primeros
    }
  }


  operar() {

    let vEdition: VehiculoEntity = {
      idVehiculo: this.frmVehiculo.get("idVehiculo")?.value,
      tipoVehiculo: this.tiposVehiculo.find( e => e.idTipoVehiculo == this.frmVehiculo.get("tipoVehiculo")?.value )!,
      placa: this.frmVehiculo.get("placa")?.value,
      colorVehiculo: this.frmVehiculo.get("colorVehiculo")?.value,
      alto: this.frmVehiculo.get("alto")?.value,
      ancho: this.frmVehiculo.get("ancho")?.value,
      estado: this.frmVehiculo.get("estado")?.value,
      foto: null,
      listaDetalleVehiculo: this.isEdition? this.data.body?.listaDetalleVehiculo! : []
    }

    console.log(vEdition)

    if(this.isEdition){//* EDICION
      this._vehiculoService.update(this.data.body!.idVehiculo, vEdition).pipe(switchMap(()=> {
        return this._vehiculoService.readByPage(this.data.pageIndex || 0, this.data.pageSize || 1);
      })).subscribe({
        next : (data :PageSpringBoot<VehiculoEntity> ) => {
          this._vehiculoService.vehiculoCambio.next(data)
          this._snackBar.open(`Se edito correctamente al veihuclo de id: ${vEdition.idVehiculo}`,"OK")
          this.dialogRef.close();
        }
      })
    }else {//* CREACION
      this._vehiculoService.create(vEdition).pipe(switchMap((_) => {
        return this._vehiculoService.readByPage(0, this.data.pageSize || 1);
      })).subscribe({
        next : (data : PageSpringBoot<VehiculoEntity>) => {
          this._vehiculoService.vehiculoCambio.next(data);
          this._snackBar.open(`Se creo correctamente al veihuclo con placa: ${vEdition.placa}}`, "OK")
          this.dialogRef.close();
        }
      })
    }

  }

}
