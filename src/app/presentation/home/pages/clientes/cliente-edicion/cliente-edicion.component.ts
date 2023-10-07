import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/_material/material.module';
import { GeneroEntity } from 'src/app/dominio/entities/genero.entity';
import { TipoClienteEntity } from 'src/app/dominio/entities/tipoCliente.entity';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente-edicion',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './cliente-edicion.component.html',
  styleUrls: ['./cliente-edicion.component.scss']
})
export class ClienteEdicionComponent {

  
  dialogRef = inject(MatDialogRef<ClienteEdicionComponent>);

  frmGroupCliente! : FormGroup
  frmGruopCredencials! : FormGroup
  hidePassword = true;
  hidePasswordConfirmacion = true;

  //=================== TEMPORALES ========================
  //? esto debe de venir de la api rest
  generos: GeneroEntity[] = [
    {idGenero: 1, tipo: 'Hombre'},
    {idGenero: 2, tipo: 'Mujer'},
    {idGenero: 3, tipo: 'Otro'},
  ];
  tiposCliente : TipoClienteEntity[] = [
    {idTipoCliente: 1, tipo : 'PERSONA SIN RUC'},
    {idTipoCliente: 2, tipo : 'PERSONA NATURAL'},
    {idTipoCliente: 3, tipo : 'PERSONA JURIDICA'}
  ]
  //=====================================================

  generoSeleccionado: GeneroEntity | undefined;
  tipoClienteSeleccionado : TipoClienteEntity | undefined;

  estados : boolean[] = [true, false]
  estadoSeleccionado : boolean | undefined


  constructor(){
    this.frmGroupCliente = new FormGroup({
      'idCliente' : new FormControl(0),
      'idDetalleCliente' : new FormControl(0),
      'tipoCliente' : new FormControl(undefined, Validators.required),
      'ruc' : new FormControl(undefined, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      'nombres' : new FormControl(undefined, [Validators.required , Validators.minLength(2), Validators.maxLength(40) ]),
      'apellidoPaterno' : new FormControl(undefined, Validators.required),
      'apellidoMaterno' : new FormControl(undefined, Validators.required),
      'edad' : new FormControl(undefined, Validators.required),
      'telefono' : new FormControl(undefined, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]) ,
      'email' : new FormControl(undefined, [Validators.required, Validators.email]),
      'dni' : new FormControl(undefined, [Validators.required,Validators.minLength(8), Validators.maxLength(8)]),
      'estado' : new FormControl(undefined, Validators.required),
      'genero': new FormControl(undefined, Validators.required)
    })
    console.log(this.frmGroupCliente)

    this.frmGruopCredencials = new FormGroup({
      'username' : new FormControl(undefined, Validators.required),
      'password' : new FormControl(undefined,Validators.required),
      'passwordConfir' : new FormControl( undefined, Validators.required)
    })


    this.evaluarFormulario();

  }


  //* Metodo par deshabilitar y habilitar algunos campo en base al tipo de cliente  
  evaluarFormulario(){

    console.log(this.tipoClienteSeleccionado)

    if(this.tipoClienteSeleccionado?.idTipoCliente === 1 ){
      // 'PERSONA SIN RUC'
      this.frmGroupCliente.get('nombres')?.enable();
      this.frmGroupCliente.get('apellidoPaterno')?.enable();
      this.frmGroupCliente.get('apellidoMaterno')?.enable();
      this.frmGroupCliente.get('edad')?.enable();
      this.frmGroupCliente.get('telefono')?.enable();
      this.frmGroupCliente.get('email')?.enable();
      this.frmGroupCliente.get('dni')?.enable();
      this.frmGroupCliente.get('estado')?.enable();
      this.frmGroupCliente.get('genero')?.enable();
      this.frmGroupCliente.get('ruc')?.disable();
    }else if(this.tipoClienteSeleccionado?.idTipoCliente === 2 || this.tipoClienteSeleccionado?.idTipoCliente === 3){
       //PERSONA NATURAL o PERSONA JURIDICA => cuentan con RUC
       this.frmGroupCliente.get('nombres')?.enable();
       this.frmGroupCliente.get('ruc')?.enable();
       this.frmGroupCliente.get('telefono')?.enable();
       this.frmGroupCliente.get('email')?.enable();
       this.frmGroupCliente.get('estado')?.enable();
       this.frmGroupCliente.get('apellidoPaterno')?.disable();
       this.frmGroupCliente.get('apellidoMaterno')?.disable();
       this.frmGroupCliente.get('dni')?.disable();
       this.frmGroupCliente.get('edad')?.disable();
       this.frmGroupCliente.get('genero')?.disable();
    }else{
      this.frmGroupCliente.get('nombres')?.disable();
      this.frmGroupCliente.get('ruc')?.disable();
      this.frmGroupCliente.get('apellidoPaterno')?.disable();
      this.frmGroupCliente.get('apellidoMaterno')?.disable();
      this.frmGroupCliente.get('edad')?.disable();
      this.frmGroupCliente.get('telefono')?.disable();
      this.frmGroupCliente.get('email')?.disable();
      this.frmGroupCliente.get('dni')?.disable();
      this.frmGroupCliente.get('estado')?.disable();
      this.frmGroupCliente.get('genero')?.disable();
    }
  }



}
