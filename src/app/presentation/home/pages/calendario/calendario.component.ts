import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '../../home.module';
import { UsuarioRepositoryImplService } from '@infraestructure/repositories/usuarios/usuario-repository-impl.service';
import { ActividadRepositoryImplService } from '@infraestructure/repositories/actividad/actividad-repository-impl.service';
import { DetalleActividadEntity } from '@dominio/entities/detalleActividad.entity';
import { EventSourceInput } from '@fullcalendar/core';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    CommonModule,
    HomeModule
  ],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit{


  eventos : EventSourceInput | undefined;

  a : any[] = []



  constructor(private _usuarioService : UsuarioRepositoryImplService, private _actividadService : ActividadRepositoryImplService){
    
  }

  ngOnInit(): void {

    if(!this._usuarioService.email) throw new Error("No se encuentra el email");

    this._actividadService.listarDetalleActividadesPorEmailConductor(this._usuarioService.email).subscribe({
      next : (data : DetalleActividadEntity[]) => {
        console.log(data)
        data.forEach( da => {
          
          da.listaHorarios.forEach( h => {
            return h.events.forEach( e => {

              this.a.push({
                  title: e.titulo,
                  // date: '2023-11-23',
                  start: e.start,
                  end: e.end,
                  allDay: h.diaCompleto
                })

              // this.eventos = [...this.eventos,{
              //   title: e.titulo,
              //   // date: '2023-11-23',
              //   start: e.start,
              //   end: e.end,
              //   allDay: h.diaCompleto
              // }]
             
            })
          })
        })
        // console.log(this.a)
        this.eventos = this.a;
        // console.log(this.eventos)
      }
    })
  }

 
  
}
