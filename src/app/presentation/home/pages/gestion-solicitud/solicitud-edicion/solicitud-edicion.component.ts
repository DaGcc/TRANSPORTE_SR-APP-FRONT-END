import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/_material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServicioService } from '@infraestructure/services/servicio.service';
import { SolicitudRepositoryImplService } from '@infraestructure/repositories/solicitud/solicitud-repository-impl.service';
import { SolicitudEntity } from '@dominio/entities/solicitud.entity';
import { IEntityEditionDialog } from '@shared/interfaces/IEntityEditionDialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription, forkJoin, map, mergeMap, switchMap } from 'rxjs';
import { ServicioEntity } from '@dominio/entities/servicios.entity';
import { DetalleSolicitudEntity } from '@dominio/entities/detalleSolicitud.entity';
import { EstadoAccions } from '@base/utils/estadosAccion';
import { TagComponent } from '@shared/widgets/tag/tag.component';
import { ClienteRepositoryImplService } from '@infraestructure/repositories/cliente/cliente-repository-impl.service';
import { ClienteEntity } from '@dominio/entities/cliente.entity';
import { PageSpringBoot } from '@base/utils/page-spring-boot';

@Component({
  selector: 'app-solicitud-edicion',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    AsyncPipe,
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

  private _solicitudService = inject(SolicitudRepositoryImplService);
  private _clienteService = inject(ClienteRepositoryImplService);
  dialogRef = inject(MatDialogRef<SolicitudEdicionComponent>);
  private _servicioService = inject(ServicioService);


  //************************************************ */

  frmGroupSolicitud!: FormGroup
  formControlClientes: FormControl = new FormControl(undefined, Validators.required);
  allClientes: ClienteEntity[] = []
  filtroClientes: Observable<ClienteEntity[]> | undefined;
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
    // console.log(this.estadoAccion);

    forkJoin({
      dataServicios: this._servicioService.readAll(),
      dataClientes: this._clienteService.readAll()
    }).subscribe(({ dataServicios, dataClientes }) => {
      this.servicios = dataServicios;
      this.allClientes = dataClientes;

      if (this.data.body != undefined && this.data.body?.idSolicitud != undefined) {//* EDICION
        this.frmGroupSolicitud.get("idSolicitud")?.setValue(this.data.body.idSolicitud)
        this.frmGroupSolicitud.get("servicio")?.setValue(this.servicios.find((e) => { return e.idServicio == this.data.body?.servicio.idServicio }))
        this.frmGroupSolicitud.get("cliente")?.setValue(this.allClientes.find(c => c.idCliente == this.data.body!.cliente.idCliente));
        this.frmGroupSolicitud.get("cliente")?.disable();
        this.frmGroupSolicitud.get("descripcion")?.setValue(this.data.body.descripcion)
        this.frmGroupSolicitud.get("estado")?.setValue(this.data.body.estado)
        this.detallesSolicitud = [...this.data.body.listaDetalleSolicitud]; //* para no mutar
        this.isCreation = false
      } else {//* CREACION
        this.detallesSolicitud = [];
        this.isCreation = true;
        this.formarYAgregarDetalle(EstadoAccions.EV);//* agregacion de detalle con estado de evaluacion de manera predeterminada
      }
    })

    this.filtroClientes = this.formControlClientes.valueChanges.pipe(map((d => {
      return this._filtroClientes(d)
    })))

  }


  initForm() {
    this.frmGroupSolicitud = new FormGroup({
      'idSolicitud': new FormControl(undefined),
      'servicio': new FormControl(undefined, Validators.required),
      'cliente': this.formControlClientes,
      'descripcion': new FormControl(undefined, Validators.required),
      'estado': new FormControl(undefined, Validators.required),
    })
  }

  private _filtroClientes(val: any) {
    if (val != null && val.idCliente > 0) {
      return this.allClientes.filter(option => option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || option.email.toLowerCase().includes(val.email.toLowerCase()));
    } else {
      return this.allClientes.filter(option => option.nombres.toLowerCase().includes(val.toLowerCase()) || option.email.toLowerCase().includes(val.toLowerCase()));
    }
  }

  displayFn(obj: ClienteEntity) {
    return obj ? `${obj.nombres}` : obj;
  }

  initFormTwo() {
    this.frmGroupDetalle = new FormGroup({
      "estadoAccion": new FormControl(undefined, Validators.required),
    })
  }

  crearDetalle() {
    this.isAddDetalle = true;
  }

  cancelarAgregacionDetalle() {
    this.frmGroupDetalle.reset();
    this.isAddDetalle = false;
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
    this.formarYAgregarDetalle(detalle);
    this.cancelarAgregacionDetalle();
  }

  formarYAgregarDetalle( detalle : string){
    let d: DetalleSolicitudEntity = {
      estado: true,
      fecha: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString(),
      estadoAccion: detalle
    }
    console.log(d)
    this.detallesSolicitud.push(d)
  }

  quitarDetalle(i: number) {
    this.detallesSolicitud.splice(i, 1);
  }


  operar() {

    let o: SolicitudEntity = {
      idSolicitud: this.isCreation ? undefined : this.frmGroupSolicitud.get("idSolicitud")?.value,
      cliente: this.frmGroupSolicitud.get("cliente")?.value,
      servicio: this.frmGroupSolicitud.get("servicio")?.value,
      descripcion: this.frmGroupSolicitud.get("descripcion")?.value,
      estado: this.frmGroupSolicitud.get("estado")?.value,
      fechaSolicitada: this.data.body?.fechaSolicitada || (new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString()),
      listaDetalleSolicitud: this.detallesSolicitud
    }
    console.log(o)
    if (this.isCreation) {

      this._solicitudService.create(o).pipe(switchMap((d:SolicitudEntity)=> {
        console.log(d)
        return this._solicitudService.readByPage( 0, this.data.pageSize || 1)
      })).subscribe( {
        next : (data : PageSpringBoot<SolicitudEntity>) => {
          this._solicitudService.solicitudCambio.next(data);
          this.closeDialog(`Se creo una nueva solicitud con exito !!!`)
        }
      })

    } else {
      this._solicitudService.update(o.idSolicitud,o).pipe(switchMap((_)=> {
        return this._solicitudService.readByPage(this.data.pageIndex || 0, this.data.pageSize || 1)
      })).subscribe( {
        next : (data : PageSpringBoot<SolicitudEntity>) => {
          this._solicitudService.solicitudCambio.next(data);
          this.closeDialog(`Se actualizo la solicitud de id: ${o.idSolicitud}`)
        }
      })
    }
  }

  closeDialog(msg? : string){

    if(msg){
      this._snackBar.open(msg, "AVISO",{
        duration: 3000
      })
    }

    this.dialogRef.close();
  }



  ngOnDestroy(): void {

    if (this.subscriptorServicios$ != null) {
      this.subscriptorServicios$.unsubscribe();
    }
  }
}
