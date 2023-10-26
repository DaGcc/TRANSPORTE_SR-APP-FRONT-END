import { Component, OnInit, ViewChild, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/_material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IEntityEditionDialog } from '@shared/interfaces/IEntityEditionDialog';
import { ConductorEntity } from '@dominio/entities/conductor.entity';
import { ConductorRepositoryImplService } from '@infraestructure/repositories/conductor/conductor-repository-impl.service';


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
export class TrabajadoresEdicionComponent implements OnInit{


  dialogRef = inject(MatDialogRef<TrabajadoresEdicionComponent>);


 
  frmGroupTrabajador! : FormGroup
  frmGruopCredencials! : FormGroup
  hidePassword = true;
  hidePasswordConfirmacion = true;

  isCreation : boolean = true; 

  generos: Genero[] = [
    {idGenero: '1', tipo: 'Hombre'},
    {idGenero: '2', tipo: 'Mujer'},
    {idGenero: '3', tipo: 'Otro'},
  ];
  generoSeleccionado: string | undefined;

  estados : boolean[] = [true, false]
  estadoSeleccionado : boolean | undefined



  constructor(@Inject(MAT_DIALOG_DATA) public data: IEntityEditionDialog<ConductorEntity>, public conductorService: ConductorRepositoryImplService,
  private _snackBar: MatSnackBar){ }

  ngOnInit(): void {
    this.frmGroupTrabajador = new FormGroup({
      'id' : new FormControl(0),
      'nombres' : new FormControl(undefined, [Validators.required , Validators.minLength(2), Validators.maxLength(40) ]),
      'apellidoPaterno' : new FormControl(undefined, Validators.required),
      'apellidoMaterno' : new FormControl(undefined, Validators.required),
      'edad' : new FormControl(undefined, Validators.required),
      'dni': new FormControl(undefined, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      'telefono' : new FormControl(undefined, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]) ,
      'email' : new FormControl(undefined, [Validators.required, Validators.email]),
      'estado' : new FormControl(undefined, Validators.required),
      'genero': new FormControl(undefined, Validators.required)
    })

    this.frmGruopCredencials = new FormGroup({
      'username' : new FormControl(undefined, Validators.required),
      'password' : new FormControl(undefined,Validators.required),
      'passwordConfir' : new FormControl( undefined, Validators.required)

    })

    if(this.data.body?.idConductor != undefined && this.data.body != undefined){//*EDICION

      console.log('e')
      this.isCreation = false;
      this.frmGroupTrabajador.get('nombres')?.setValue(this.data.body?.nombres);
      this.frmGroupTrabajador.get('apellidoPaterno')?.setValue(this.data.body?.apellidoPaterno);
      this.frmGroupTrabajador.get('apellidoMaterno')?.setValue(this.data.body?.apellidoMaterno);
      this.frmGroupTrabajador.get('edad')?.setValue(this.data.body?.edad);
      this.frmGroupTrabajador.get('dni')?.setValue(this.data.body?.dni);
      this.frmGroupTrabajador.get('telefono')?.setValue(this.data.body?.telefono);
      this.frmGroupTrabajador.get('email')?.setValue(this.data.body?.email);
      this.frmGroupTrabajador.get('estado')?.setValue(this.data.body?.estado);
      this.frmGroupTrabajador.get('genero')?.setValue(this.data.body?.genero);

    }else { //* CREACION
      this.isCreation = true;
      console.log('c')
    }


  }



  operar(){

  }

}
