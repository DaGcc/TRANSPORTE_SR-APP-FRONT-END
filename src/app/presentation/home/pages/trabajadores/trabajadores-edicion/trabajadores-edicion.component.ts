import { Component, OnInit, ViewChild, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/_material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IEntityEditionDialog } from '@shared/interfaces/IEntityEditionDialog';
import { ConductorEntity } from '@dominio/entities/conductor.entity';
import { ConductorRepositoryImplService } from '@infraestructure/repositories/conductor/conductor-repository-impl.service';
import { switchMap } from 'rxjs';
import { PageSpringBoot } from '@base/utils/page-spring-boot';
import { GeneroEntity } from '@dominio/entities/genero.entity';


interface Genero {
  idGenero: string;
  tipo: string;
}

@Component({
  selector: 'app-trabajadores-edicion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './trabajadores-edicion.component.html',
  styleUrls: ['./trabajadores-edicion.component.scss']
})
export class TrabajadoresEdicionComponent implements OnInit {



  dialogRef = inject(MatDialogRef<TrabajadoresEdicionComponent>);
  private _conductorService = inject(ConductorRepositoryImplService);
  private _snackBar = inject(MatSnackBar);

  frmGroupTrabajador!: FormGroup
  frmGruopCredencials!: FormGroup
  hidePassword = true;
  hidePasswordConfirmacion = true;

  isCreation: boolean = true;

  generos: GeneroEntity[] = [
    { idGenero: 1, tipo: 'Hombre' },
    { idGenero: 2, tipo: 'Mujer' },
    { idGenero: 3, tipo: 'Otro' },
  ];
  generoSeleccionado: string | undefined;

  estados: boolean[] = [true, false]
  estadoSeleccionado: boolean | undefined



  constructor(@Inject(MAT_DIALOG_DATA) public data: IEntityEditionDialog<ConductorEntity>) { }

  ngOnInit(): void {

    this.initForm();

    if (this.data.body?.idConductor != undefined && this.data.body != undefined) {//*EDICION

      this.isCreation = false;
      this.frmGroupTrabajador.get('id')?.setValue(this.data.body.idConductor);
      this.frmGroupTrabajador.get('nombres')?.setValue(this.data.body.nombres);
      this.frmGroupTrabajador.get('apellidoPaterno')?.setValue(this.data.body.apellidoPaterno);
      this.frmGroupTrabajador.get('apellidoMaterno')?.setValue(this.data.body.apellidoMaterno);
      this.frmGroupTrabajador.get('edad')?.setValue(this.data.body.edad);
      this.frmGroupTrabajador.get('dni')?.setValue(this.data.body.dni);
      this.frmGroupTrabajador.get('telefono')?.setValue(this.data.body.telefono);
      this.frmGroupTrabajador.get('email')?.setValue(this.data.body.email);
      this.frmGroupTrabajador.get('estado')?.setValue(this.data.body.estado);
      // this.frmGroupTrabajador.get('genero')?.setValue(this.generos[this.generos.indexOf(this.data.body.genero)]) -> no funciona, pues, busca en base a espacion en memoria.
      this.frmGroupTrabajador.get('genero')?.setValue(this.generos[this.generos.findIndex((e) => e.idGenero == this.data.body?.genero.idGenero)]);
    } else { //* CREACION
      this.isCreation = true;
    }


  }


  initForm() {
    this.frmGroupTrabajador = new FormGroup({
      'id': new FormControl(undefined),
      'nombres': new FormControl(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      'apellidoPaterno': new FormControl(undefined, Validators.required),
      'apellidoMaterno': new FormControl(undefined, Validators.required),
      'edad': new FormControl(undefined, Validators.required),
      'dni': new FormControl(undefined, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      'telefono': new FormControl(undefined, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      'email': new FormControl(undefined, [Validators.required, Validators.email]),
      'estado': new FormControl(undefined, Validators.required),
      'genero': new FormControl(undefined, Validators.required)
    })

    this.frmGruopCredencials = new FormGroup({
      'username': new FormControl(undefined, Validators.required),
      'password': new FormControl(undefined, Validators.required),
      'passwordConfir': new FormControl(undefined, Validators.required)

    })
  }



  operar() {

    let conductor: ConductorEntity = {
      idConductor: this.frmGroupTrabajador.get('id')?.value,
      nombres: this.frmGroupTrabajador.get('nombres')?.value,
      apellidoPaterno: this.frmGroupTrabajador.get('apellidoPaterno')?.value,
      apellidoMaterno: this.frmGroupTrabajador.get('apellidoMaterno')?.value,
      edad: this.frmGroupTrabajador.get('edad')?.value,
      dni: this.frmGroupTrabajador.get('dni')?.value,
      telefono: this.frmGroupTrabajador.get('telefono')?.value,
      email: this.frmGroupTrabajador.get('email')?.value,
      estado: this.frmGroupTrabajador.get('estado')?.value,
      genero: this.frmGroupTrabajador.get('genero')?.value,
      foto: null
    }

    switch (this.isCreation) {
      case true: {//* Creacion

        this._conductorService.create(conductor).pipe(switchMap(data => {
          console.log(data)
          return this._conductorService.readByPage(0, this.data.pageSize || 1);
        })).subscribe({
          next: (data: PageSpringBoot<ConductorEntity>) => {
            this._conductorService.conductorCambio$.next(data);
            this._snackBar.open(`Conductor registrado con exito!`, 'OK')
            this.dialogRef.close();
          }
        })
        break;
      }
      case false: {//* Edicion
        console.log(conductor)
        this._conductorService.update(conductor.idConductor, conductor).pipe(switchMap((data) => {
          console.log(data)
          return this._conductorService.readByPage(this.data.pageIndex || 0, this.data.pageSize || 1);
        })).subscribe({
          next: (data: PageSpringBoot<ConductorEntity>) => {
            this._conductorService.conductorCambio$.next(data);
            this._snackBar.open(`Conductor de id: ${conductor.idConductor}, editado con exito!`, 'OK')
            this.dialogRef.close();
          }
        })
        break;
      }
      default: {
        this._snackBar.open('Se producjo un error, por favor, cierre y vuelva a abrir esta ventana.', 'ERROR')
        break;
      }
    }

  }

}
