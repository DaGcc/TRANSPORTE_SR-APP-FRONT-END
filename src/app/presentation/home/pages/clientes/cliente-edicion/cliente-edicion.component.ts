import { Component, Inject, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/_material/material.module';
import { GeneroEntity } from 'src/app/dominio/entities/genero.entity';
import { TipoClienteEntity } from 'src/app/dominio/entities/tipoCliente.entity';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteEntity } from 'src/app/dominio/entities/cliente.entity';
import { IEntityEditionDialog } from '@shared/interfaces/IEntityEditionDialog';
import { ClienteRepositoryImplService } from '@infraestructure/repositories/cliente/cliente-repository-impl.service';
import { switchMap } from 'rxjs';
import { PageSpringBoot } from 'src/base/utils/page-spring-boot';
import { MatSnackBar } from '@angular/material/snack-bar';

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


  constructor(@Inject(MAT_DIALOG_DATA) public data: IEntityEditionDialog<ClienteEntity>, public clienteService: ClienteRepositoryImplService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.frmGroupCliente = new FormGroup({
      'idCliente': new FormControl(0),
      'idDetalleCliente': new FormControl(0),
      'tipoCliente': new FormControl(undefined, Validators.required),
      'ruc': new FormControl(undefined, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),//!CONTROLAR ERROR DE RUC EXISTENTE
      'nombres': new FormControl(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      'apellidoPaterno': new FormControl(undefined, Validators.required),
      'apellidoMaterno': new FormControl(undefined, Validators.required),
      'edad': new FormControl(undefined, Validators.required),
      'telefono': new FormControl(undefined, [Validators.required, Validators.min(900000000), Validators.max(999999999), Validators.pattern("^[0-9]{9}$")]),
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
      console.log(this.data.body?.tipoCliente.idTipoCliente)

      //* Setearemos valores al formulario, pero en base al tipo de cliente, peus deshabilitaremos algunos controles en base a al tipo.
      if (this.data.body?.tipoCliente.idTipoCliente === 1) { //*Persona sin RUC

        //* Seteamos algunos de los valores de entrada al formulario
        this.frmGroupCliente.get('idCliente')?.setValue(this.data.body.idCliente);
        this.frmGroupCliente.get('idDetalleCliente')?.setValue(this.data.body.detalleCliente!.idDetalleCliente);
        this.frmGroupCliente.get('tipoCliente')?.setValue(this.data.body.tipoCliente.idTipoCliente);
        this.frmGroupCliente.get('tipoCliente')?.disable();//!deshabilitado, por que en la edicion no cambiaremos tu tipo
        this.frmGroupCliente.get('nombres')?.setValue(this.data.body.nombres);
        this.frmGroupCliente.get('email')?.setValue(this.data.body.email);
        this.frmGroupCliente.get('telefono')?.setValue(this.data.body.telefono);
        this.frmGroupCliente.get('estado')?.setValue(this.data.body.estado);
        this.frmGroupCliente.get('apellidoPaterno')?.setValue(this.data.body.detalleCliente!.apellidoPaterno);
        this.frmGroupCliente.get('apellidoMaterno')?.setValue(this.data.body.detalleCliente!.apellidoMaterno);
        this.frmGroupCliente.get('edad')?.setValue(this.data.body.detalleCliente!.edad);
        this.frmGroupCliente.get('dni')?.setValue(this.data.body.detalleCliente!.dni);

        this.frmGroupCliente.get('genero')?.setValue(this.data.body.detalleCliente!.genero.idGenero);


      } else if (this.data.body?.tipoCliente.idTipoCliente === 2 || this.data.body?.tipoCliente.idTipoCliente === 3) { //*Persona con RUC

        //* Seteamos algunos de los valores de entrada al formulario
        this.frmGroupCliente.get('idCliente')?.setValue(this.data.body.idCliente);
        this.frmGroupCliente.get('tipoCliente')?.setValue(this.data.body.tipoCliente.idTipoCliente);
        this.frmGroupCliente.get('ruc')?.setValue(this.data.body.ruc);
        this.frmGroupCliente.get('tipoCliente')?.disable();//!deshabilitado, por que en la edicion no cambiaremos tu tipo
        this.frmGroupCliente.get('nombres')?.setValue(this.data.body.nombres);
        this.frmGroupCliente.get('email')?.setValue(this.data.body.email);
        this.frmGroupCliente.get('telefono')?.setValue(this.data.body.telefono);
        this.frmGroupCliente.get('estado')?.setValue(this.data.body.estado);

      }
      //* Evaluamos los campos que vamos a deshabilitar en base el tipo del cliente
      this.evaluarFormulario(this.data.body?.tipoCliente.idTipoCliente);

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
        this.frmGroupCliente.get('ruc')?.disable(); //!deshabilitado 
        break;
      }
      case 2:
      case 3: {
        //PERSONA NATURAL o PERSONA JURIDICA => cuentan con RUC
        this.frmGroupCliente.get('nombres')?.enable();
        this.frmGroupCliente.get('ruc')?.enable();
        this.frmGroupCliente.get('telefono')?.enable();
        this.frmGroupCliente.get('email')?.enable();
        this.frmGroupCliente.get('estado')?.enable();
        this.frmGroupCliente.get('apellidoPaterno')?.disable(); //!deshabilitado 
        this.frmGroupCliente.get('apellidoMaterno')?.disable(); //!deshabilitado 
        this.frmGroupCliente.get('dni')?.disable(); //!deshabilitado 
        this.frmGroupCliente.get('edad')?.disable(); //!deshabilitado 
        this.frmGroupCliente.get('genero')?.disable(); //!deshabilitado 
        break;
      }
      default: { //si no se envia nada, se sobreentiende que se desea desabilitar todos los campo, menos el selector de tipoCliente
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

  operar(formularioNumber: number) {//

    let clienteBody: ClienteEntity;

    clienteBody = {
      idCliente: this.frmGroupCliente.value['idCliente'],
      nombres: this.frmGroupCliente.value['nombres'],
      ruc: this.frmGroupCliente.value['ruc'],
      email: this.frmGroupCliente.value['email'],
      telefono: this.frmGroupCliente.value['telefono'],
      tipoCliente: {
        idTipoCliente: this.frmGroupCliente.get('tipoCliente')?.value as number,//*debemos acceder asi al valor de ese campo(formControl | control) desabilitado de un formulario 
        tipo: ''
      },
      estado: this.frmGroupCliente.value['estado']
    }

    //* Eliminamos el detallecliente si es que es de un tipo de cliente con RUC
    if (this.frmGroupCliente.get('tipoCliente')?.value === 1) {//* Sin RUC, tiene detalle

      clienteBody.detalleCliente = {
        idDetalleCliente: this.frmGroupCliente.value['idDetalleCliente'],
        apellidoPaterno: this.frmGroupCliente.value['apellidoPaterno'],
        apellidoMaterno: this.frmGroupCliente.value['apellidoMaterno'],
        dni: this.frmGroupCliente.value['dni'],
        edad: this.frmGroupCliente.value['edad'],
        genero: {
          idGenero: this.frmGroupCliente.value['genero'],
          tipo: ''
        },
        foto: null //??? aun no ???? ------
      }
    }

    if (formularioNumber == 1) {//*si se envia desde el formulario 1, quiere decir que es un update.

      const o = this.snackBar.open('Editando...', 'OK')

      this.clienteService.update(clienteBody.idCliente, clienteBody).pipe(switchMap((_) => {
        // console.log(data)
        return this.clienteService.readByPage(this.data.pageIndex || 0, this.data.pageSize || 5);
      })).subscribe({
        next: (rsp: PageSpringBoot<ClienteEntity>) => {
          this.clienteService.clientesCambio.next(rsp);
          setTimeout(() => {
            o.dismiss()
            this.dialogRef.close()
          }, 1000)
        }
      })

    } else if (formularioNumber == 2) {//*aqui es con credenciales, por ende, se completa los dos pasos del formulario, que equivale a la creacion del usuario.

      const o = this.snackBar.open('Creando...', 'OK')

      this.clienteService.create(clienteBody).pipe(switchMap(() => {
        return this.clienteService.readByPage(this.data.pageIndex || 0, this.data.pageSize || 5);;
      })).subscribe({
        next: (rsp: PageSpringBoot<ClienteEntity>) => {
          this.clienteService.clientesCambio.next(rsp);
          setTimeout(() => {
            o.dismiss()
            this.dialogRef.close()
          }, 1000)
        }
      })

    }
  }


  eliminacionDetalleCliente(){
    
  }


  limitarLongitud(event: any): void {
    console.log(event)
    const inputValue: string = event.target.value;
    if (inputValue.length > 9) {
      event.target.value = inputValue.slice(0, 9);//solo quedate con los 9 primeros
    }
  }
}




/**
 *?? DATO:
 **---- formulario:
 ** cuando desabilitas un control del un formulario, este no se crea en la propiedad de "this.frmGroupCliente.value",
 ** por ende, cuando queremos acceder al valor de ese control deshabilitado, tendremos "undefined", por mas que el campo contenga un valor, pero este disable.

 ** Pero cuando hacemos  "this.frmGroupCliente.get('tipoCliente')?.value", estamos accediendo al control directamente, este por mas que este deshabilitado
 ** tiene un valor, y nos da el value por mas que este desabilitado.
 **-----
 */