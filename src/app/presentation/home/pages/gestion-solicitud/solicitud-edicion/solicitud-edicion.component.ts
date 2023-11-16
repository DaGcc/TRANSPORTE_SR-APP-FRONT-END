import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/_material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServicioService } from '@infraestructure/services/servicio.service';
import { SolicitudRepositoryImplService } from '@infraestructure/repositories/solicitud/solicitud-repository-impl.service';
import { SolicitudEntity } from '@dominio/entities/solicitud.entity';
import { IEntityEditionDialog } from '@shared/interfaces/IEntityEditionDialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ServicioEntity } from '@dominio/entities/servicios.entity';
import { DetalleSolicitudEntity } from '@dominio/entities/detalleSolicitud.entity';
import { EstadoAccions } from '@base/utils/estadosAccion';
import { TagComponent } from '@shared/widgets/tag/tag.component';

@Component({
  selector: 'app-solicitud-edicion',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TagComponent
  ],
  templateUrl: './solicitud-edicion.component.html',
  styleUrls: ['./solicitud-edicion.component.scss']
})
export class SolicitudEdicionComponent implements OnInit, OnDestroy {



  //************ Inyecciones de dependencia **+********

  private _solicitudService = inject(SolicitudRepositoryImplService)
  dialogRef = inject(MatDialogRef<SolicitudEdicionComponent>);
  private _servicioService = inject(ServicioService)


  //************************************************ */

  frmGroupSolicitud!: FormGroup
  estados: boolean[] = [true, false]
  servicios: ServicioEntity[] = [];
  isCreation: boolean = false;
  detallesSolicitud: DetalleSolicitudEntity[] = [];

  //* Formulario para detalle de la solicitud */
  frmGroupDetalle!: FormGroup;
  estadoAccion = Object.keys(EstadoAccions).map(k => {
    return (EstadoAccions as any)[k];
  });
  isAddDetalle: boolean = false

  //!-----------------------------------------------------

  //***************** Subscriptores ******************/
  subscriptorServicios$!: Subscription;
  subscriptorCliente$!: Subscription;
  //************************************************ */

  //!-----------------------------------------------------




  constructor(@Inject(MAT_DIALOG_DATA) public data: IEntityEditionDialog<SolicitudEntity>, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {

    this.initForm();

    // this.estadoAccion.filter( e => {
    //   return this.data.body?.listaDetalleSolicitud.find(e)? true: false;
    // })


    this.initFormTwo()
    console.log(this.estadoAccion);

    this.subscriptorServicios$ = this._servicioService.readAll().subscribe({
      next: (data: ServicioEntity[]) => {
        this.servicios = data;
        if (this.data.body != undefined && this.data.body?.idSolicitud != undefined) {//* EDICION
          this.frmGroupSolicitud.get("idSolicitud")?.setValue(this.data.body.idSolicitud)
          this.frmGroupSolicitud.get("servicio")?.setValue(this.servicios.find((e) => { return e.idServicio == this.data.body?.servicio.idServicio }))
          this.frmGroupSolicitud.get("cliente")?.setValue(this.data.body.cliente.nombres);
          this.frmGroupSolicitud.get("cliente")?.disable();
          this.frmGroupSolicitud.get("descripcion")?.setValue(this.data.body.descripcion)
          this.frmGroupSolicitud.get("estado")?.setValue(this.data.body.estado)
          this.detallesSolicitud = [...this.data.body.listaDetalleSolicitud]; //* para no mutar
          this.isCreation = false
        } else {//* CREACION
          this.detallesSolicitud = [];
          this.isCreation = true;
        }
      }
    });
  }

  initForm() {
    this.frmGroupSolicitud = new FormGroup({
      'idSolicitud': new FormControl(undefined),
      'servicio': new FormControl(undefined, Validators.required),
      'cliente': new FormControl(undefined, Validators.required),
      'descripcion': new FormControl(undefined, Validators.required),
      'estado': new FormControl(undefined, Validators.required),
    })
  }



  crearDetalle() {
    this.isAddDetalle = true;

  }
  cancelarAgregacionDetalle() {
    this.frmGroupDetalle.reset();
    this.isAddDetalle = false;
  }

  initFormTwo() {
    this.frmGroupDetalle = new FormGroup({
      "estadoAccion": new FormControl(undefined),
    })
  }

  addDetalle() {

    let detalle = this.frmGroupDetalle.get("estadoAccion")?.value;

    // let vb = this.detallesSolicitud.find( e => {
    //   return  e.estadoAccion == detalle;
    // })

    if (this.detallesSolicitud.some(e => {
      return e.estadoAccion == detalle
    })) {
      this._snackBar.open("No puedes volver a poner este estado a la solicitud, por que ya lo tiene", "AVISO", {
        duration: 4000
      })
      return;
    }
    let d: DetalleSolicitudEntity = {
      estado: true,
      fecha: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString(),
      estadoAccion: detalle
    }
    console.log(d)
    this.detallesSolicitud.push(d)
    this.cancelarAgregacionDetalle();
  }
  quitarDetalle(i: number) {
    this.detallesSolicitud.splice(i, 1);
  }


  operar() {

    let o : SolicitudEntity = {
      idSolicitud : this.isCreation? undefined : this.frmGroupSolicitud.get("idSolicitud")?.value,
      cliente : this.frmGroupSolicitud.get("cliente")?.value,
      servicio : this.frmGroupSolicitud.get("servicio")?.value,
      descripcion : this.frmGroupSolicitud.get("descripcion")?.value,
      estado : this.frmGroupSolicitud.get("estado")?.value,
      fechaSolicitada : this.data.body?.fechaSolicitada || new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString(), 
      listaDetalleSolicitud : this.detallesSolicitud
    }
    console.log(o)
    if(this.isCreation){
      
    }else {
      // this._solicitudService.update()
    }
  }


  ngOnDestroy(): void {

    if (this.subscriptorServicios$ != null) {
      this.subscriptorServicios$.unsubscribe();
    }
  }
}
