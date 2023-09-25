import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/_material/material.module';
import { MatDialogRef } from '@angular/material/dialog';


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
  hide = true;

  generos: Genero[] = [
    {idGenero: '1', tipo: 'Hombre'},
    {idGenero: '2', tipo: 'Mujer'},
    {idGenero: '3', tipo: 'Otro'},
  ];
  generoSeleccionado: string | undefined;

  estados : boolean[] = [true, false]
  estadoSeleccionado : boolean | undefined


  ngOnInit(): void {
    
    this.frmGroupTrabajador = new FormGroup({
      'id' : new FormControl(0),
      'nombres' : new FormControl(undefined, [Validators.required , Validators.minLength(2), Validators.maxLength(40) ]),
      'apellidoPaterno' : new FormControl(undefined, Validators.required),
      'apellidoMaterno' : new FormControl(undefined, Validators.required),
      'edad' : new FormControl(undefined, Validators.required),
      'telefono' : new FormControl(undefined, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]) ,
      'email' : new FormControl(undefined, [Validators.required, Validators.email]),
      'estado' : new FormControl(undefined, Validators.required),
      'genero': new FormControl(undefined, Validators.required)
    })
    console.log(this.frmGroupTrabajador)

    this.frmGruopCredencials = new FormGroup({
      'username' : new FormControl(undefined, Validators.required),
      'password' : new FormControl(undefined,Validators.required),
      'passwordConfir' : new FormControl( undefined, Validators.required)

    })
  }


}
