import { Component, Inject, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/_material/material.module';
import { GeneroEntity } from 'src/app/dominio/entities/genero.entity';
import { TipoClienteEntity } from 'src/app/dominio/entities/tipoCliente.entity';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteEntity } from 'src/app/dominio/entities/cliente.entity';
import { IEntityEditionDialog } from '@shared/interfaces/IEntityEditionDialog';
import { ClienteRepositoryImplService } from '@infraestructure/repositories/cliente/cliente-repository-impl.service';
import { switchMap } from 'rxjs';
import { PageSpringBoot } from 'src/base/utils/page-spring-boot';

@Component({
  selector: 'app-cliente-edicion',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './cliente-edicion.component.html',
  styleUrls: ['./cliente-edicion.component.scss']
})
export class ClienteEdicionComponent implements OnInit {


  dialogRef = inject(MatDialogRef<ClienteEdicionComponent>);

  frmGroupCliente!: FormGroup
  frmGruopCredencials!: FormGroup
  hideSteepTwo: boolean = false;
  hidePassword = true;
  hidePasswordConfirmacion = true;

  //=================== TEMPORALES ========================
  //? esto debe o puede de venir de la api rest - evaluando
  generos: GeneroEntity[] = [
    { idGenero: 1, tipo: 'Hombre' },
    { idGenero: 2, tipo: 'Mujer' },
    { idGenero: 3, tipo: 'Otro' },
  ];
  tiposCliente: TipoClienteEntity[] = [
    { idTipoCliente: 1, tipo: 'PERSONA SIN RUC' },
    { idTipoCliente: 2, tipo: 'PERSONA NATURAL' },
    { idTipoCliente: 3, tipo: 'PERSONA JURIDICA' }
  ]
  //=====================================================

 

  estados: boolean[] = [true, false]


  constructor(@Inject(MAT_DIALOG_DATA) public data: IEntityEditionDialog<ClienteEntity>, public clienteService :ClienteRepositoryImplService) { }

  ngOnInit(): void {

    this.frmGroupCliente = new FormGroup({
      'idCliente': new FormControl(0),
      'idDetalleCliente': new FormControl(0),
      'tipoCliente': new FormControl(undefined, Validators.required),
      'ruc': new FormControl(undefined, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      'nombres': new FormControl(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      'apellidoPaterno': new FormControl(undefined, Validators.required),
      'apellidoMaterno': new FormControl(undefined, Validators.required),
      'edad': new FormControl(undefined, Validators.required),
      'telefono': new FormControl(undefined, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      'email': new FormControl(undefined, [Validators.required, Validators.email]),
      'dni': new FormControl(undefined, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      'estado': new FormControl(undefined, Validators.required),
      'genero': new FormControl(undefined, Validators.required)
    })

    this.frmGruopCredencials = new FormGroup({
      'username': new FormControl(undefined, Validators.required),
      'password': new FormControl(undefined, Validators.required),
      'passwordConfir': new FormControl(undefined, Validators.required)
    })


    if (this.data.title === 'EDICION') {

      /**
       ** Desabilitamos el formulario 2 de credenciales, para que no se manipulen sus username o password
       ** con un *ngIf en el stepper 2 del html
       */
      this.hideSteepTwo = true;

      //Persona sin RUC
      if (this.data.body?.tipoCliente.idTipoCliente === 1) {
        this.frmGroupCliente.get('idCliente')?.setValue(this.data.body.idCliente);
        this.frmGroupCliente.get('idDetalleCliente')?.setValue(this.data.body.detalleCliente.idDetalleCliente);
        this.frmGroupCliente.get('nombres')?.setValue(this.data.body.nombres);
        this.frmGroupCliente.get('email')?.setValue(this.data.body.email);
        this.frmGroupCliente.get('telefono')?.setValue(this.data.body.telefono);
        this.frmGroupCliente.get('estado')?.setValue(this.data.body.estado);
        this.frmGroupCliente.get('apellidoPaterno')?.setValue(this.data.body.detalleCliente.apellidoPaterno);
        this.frmGroupCliente.get('apellidoMaterno')?.setValue(this.data.body.detalleCliente.apellidoMaterno);
        this.frmGroupCliente.get('edad')?.setValue(this.data.body.detalleCliente.edad);
        this.frmGroupCliente.get('dni')?.setValue(this.data.body.detalleCliente.dni);
        this.frmGroupCliente.get('tipoCliente')?.setValue(this.data.body.tipoCliente.idTipoCliente);
        this.frmGroupCliente.get('tipoCliente')?.disable();
        this.frmGroupCliente.get('genero')?.setValue(this.data.body.detalleCliente.genero.idGenero);

        //* Evauamos los campos que vamos a deshabilitar en base el tipo del cliente
        this.evaluarFormulario(this.data.body.tipoCliente.idTipoCliente);
      }
    } else if (this.data.title === 'CREACION') {
      /**
       ** Como es creacion, desabilitamos todo el formulario, a excepcion del campo tipo de cliente
       ** Pues, ese campo tiene un evento que revaluara que campos seran habilitados o no en base a lo seleccionado
       */
      this.evaluarFormulario();
    }


  }


  //* Metodo par deshabilitar y habilitar algunos campo en base al tipo de cliente  
  evaluarFormulario(tp?: number) {

    switch (tp) {

      case 1: {
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
        break;
      }
      case 2: {
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
        break;
      }
      default: { //si no se envia nada, se sobreentiende que se desea desabilitar todos los campo
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
        break;
      }

    }
  }

  operar( formularioNumber : number ){

    let clienteBody : ClienteEntity;

    clienteBody =  {
      idCliente: this.frmGroupCliente.value['idCliente'],
      nombres : this.frmGroupCliente.value['nombres'],
      ruc : this.frmGroupCliente.value['ruc'],
      email: this.frmGroupCliente.value['email'],
      telefono : this.frmGroupCliente.value['telefono'],
      tipoCliente : this.data.body?.tipoCliente!,
      detalleCliente: {
        idDetalleCliente : this.frmGroupCliente.value['idDetalleCliente'],
        apellidoPaterno: this.frmGroupCliente.value['apellidoPaterno'],
        apellidoMaterno: this.frmGroupCliente.value['apellidoMaterno'],
        dni: this.frmGroupCliente.value['dni'],
        edad: this.frmGroupCliente.value['edad'],
        genero : {
          idGenero : this.frmGroupCliente.value['genero'],
          tipo : ''
        },
        foto : null //??? aun no
      },
      estado : this.frmGroupCliente.value['estado']
    }

    this.clienteService.update(clienteBody.idCliente, clienteBody).pipe(switchMap( (_) => {
      // console.log(data)
      return this.clienteService.readByPage(0 , 5 );
    })).subscribe({
      next: (rsp : PageSpringBoot<ClienteEntity>) => {
        this.dialogRef.close()
        this.clienteService.clientesCambio.next(rsp);
      }
    })

    if(formularioNumber == 1){
      
    }else if(formularioNumber == 2){
      //aqui es con credenciales, pero por el momento no 
    }



    // console.log(clienteBody)
    // console.log(formularioNumber)
  }

}