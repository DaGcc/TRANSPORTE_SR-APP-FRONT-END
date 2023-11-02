import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/_material/material.module';
import { ServicioEntity } from '@dominio/entities/servicios.entity';
import { ServicioService } from '@infraestructure/services/servicio.service';
import { DetalleSolicitudEntity } from '@dominio/entities/detalleSolicitud.entity';
import { ClienteRepositoryImplService } from '@infraestructure/repositories/cliente/cliente-repository-impl.service';
import { UsuarioRepositoryImplService } from '@infraestructure/repositories/usuarios/usuario-repository-impl.service';
import { PageSpringBoot } from '@base/utils/page-spring-boot';
import { ClienteEntity } from '@dominio/entities/cliente.entity';
import { PageFiltroDTO } from '@base/utils/page-dto';
import { SolicitudEntity } from '@dominio/entities/solicitud.entity';
import { Subscription } from 'rxjs';
import { EstadoAccions } from '@base/utils/estadosAccion';
import { SolicitudRepositoryImplService } from '@infraestructure/repositories/solicitud/solicitud-repository-impl.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent  implements OnInit, OnDestroy{
  
  frmGroupSolicitud! : FormGroup;

  cliente : ClienteEntity | undefined;
  servicios : ServicioEntity[] = [];
  listaDetalleSolicitud : DetalleSolicitudEntity[] = []


  
  //!-----------------------------------------------------

  //***************** Subscriptores ******************/
  subscriptorServicios$!: Subscription;
  subscriptorCliente$!: Subscription;
  //************************************************ */

  //!-----------------------------------------------------

  constructor(private _servicioService : ServicioService, private _clienteService : ClienteRepositoryImplService, 
    private _usuarioRepositoryImplService : UsuarioRepositoryImplService, private _solicitudService :SolicitudRepositoryImplService,
    private _snackBar : MatSnackBar){
   

    // this.clienteService.
  }
  ngOnDestroy(): void {
   
      if(this.subscriptorServicios$ != null){
        this.subscriptorServicios$.unsubscribe();
      }
  }
  
  ngOnInit() {

    this.frmGroupSolicitud  = new FormGroup({
      'idSolicitud' : new FormControl(undefined),
      'servicio' : new FormControl(undefined, Validators.required),
      'cliente' : new FormControl(undefined, Validators.required),
      'descripcion' : new FormControl(undefined, Validators.required)
    })

    this.subscriptorServicios$ = this._servicioService.readAll().subscribe({
      next:(data: ServicioEntity[]) => {
        this.servicios = data;
      }
    });

     this.subscriptorCliente$ = this._clienteService.filtroClientes(0, 1, this._usuarioRepositoryImplService.email!).subscribe({
      next : (d : PageFiltroDTO<ClienteEntity> ) => {
        this.cliente = d.content[0];
        this.frmGroupSolicitud.get("cliente")?.setValue(this.cliente.nombres);
        this.frmGroupSolicitud.get("cliente")?.disable();
      }
    });

    console.log("ga")

  }
  

  operar(){

    let fechaSolicitada = new Date(Date.now() - new Date().getTimezoneOffset()*60000).toISOString();

    let solicitud : SolicitudEntity = {
      idSolicitud : 0,
      cliente : this.cliente!,
      descripcion : this.frmGroupSolicitud.get("descripcion")?.value,
      fechaSolicitada : fechaSolicitada,
      servicio : this.frmGroupSolicitud.get("servicio")?.value,
      estado : true,
      listaDetalleSolicitud : [
        {
          fecha : fechaSolicitada,
          estadoAccion : EstadoAccions.EV,
          estado: true
        }
      ]
    }

    this._solicitudService.create(solicitud).subscribe({
      next : (data : SolicitudEntity) => {
        this._snackBar.open("Su solicitud fue enviada con exito!!!","OK")
        this.frmGroupSolicitud.get("descripcion")?.setValue(undefined);
      }
    })
  }

  limitarLongitud(event: any): void {
    // console.log(event)
    const inputValue: string = event.target.value;
    if (inputValue.length > 9) {
      event.target.value = inputValue.slice(0, 9);//solo quedate con los 9 primeros
    }
  }


}
