import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild, type OnInit, ElementRef, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MensajeG } from '@dominio/entities/mensajeG';
import { UsuarioG } from '@dominio/entities/usuarioG';
import { environment } from '@environments/environments';
import { UsuarioRepositoryImplService } from '@infraestructure/repositories/usuarios/usuario-repository-impl.service';
import { Client, IFrame } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { MaterialModule } from 'src/app/_material/material.module';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {

  
  //cliente STOMP -------------------------------------------
  cliente: Client = new Client();
  // sockJS: any = new SockJS('http://localhost:8080/chat-websocket');
  //---------------------------------------------------------


  //PARA ELEMENTOS DEL DOM ----------------------------------
  @ViewChild('scrollMe') private scrollConteiner!: ElementRef ; //tambien se puede usar Element

  contGroup: any
  mensaje: MensajeG = new MensajeG();
  mensajes: MensajeG[] = []
  
  //---------------------------------------------------------
  usuarioService = inject(UsuarioRepositoryImplService);
  emailUser : string  | undefined;
  
  //VARIABLES------------------------------------------------
  // usuario : Usuario = JSON.parse(sessionStorage.getItem(environment.USUARIO)!) as Usuario
  user: UsuarioG = new UsuarioG();
  
  notificacion : string| undefined
  //---------------------------------------------------------

  // elemento : any  

  scrollButton() {
  
    setTimeout(()=>{
      this.scrollConteiner!.nativeElement.scrollTop = this.scrollConteiner!.nativeElement.scrollHeight - this.scrollConteiner!.nativeElement.clientHeight;
    },100)

  }

  constructor() {
   }


  ngOnDestroy(): void {
    this.desconectar();
  }


  ngOnInit(): void {

    // this.elemento = document.getElementById('ciculo');
    
    this.contGroup = document.getElementById('listChat');
    
    this.user.nombre = this.emailUser;
    this.user.color = "#0ff";
    this.user.email = this.emailUser;
    this.user.idUsuario = this.emailUser;
    this.user.estado = true;
    this.mensaje.username = this.emailUser;
    this.mensaje.color = "#0ff";

    this.conectar();
    this.logica();
    
    // this.elemento?.addEventListener('animationiteration', ()=>{
    //   var posicionTop = this.generarValorAleatorio(0, window.innerHeight - this.elemento.offsetHeight);
    //   var posicionLeft = this.generarValorAleatorio(0, window.innerWidth - this.elemento.offsetWidth);
    //   console.log(posicionLeft)
    //   console.log(posicionTop)
    //   this.elemento.style.setProperty('top', posicionTop+ 'px', 'important');

    //   this.elemento.style.setProperty('left', posicionLeft+ 'px', 'important');
  
    //   console.log(this.elemento)
    // });
    

  }

  conectar() {
    this.cliente.activate();
  }
  
  desconectar() {
    this.cliente.deactivate();
  }

  logica() {
    this.cliente.webSocketFactory = () => {
      let sockJs: any = new SockJS("http://localhost:8989/chat-websocket");
      return sockJs
    }
    this.cliente.onConnect = frame => {
      console.log(frame+ "on")


      this.mensaje.tipo = 'NUEVO_USUARIO'
      
      this.cliente.publish({
        destination: '/app/mensaje',
        body: JSON.stringify(this.mensaje)
      })

      this.cliente.subscribe('/chat/mensaje', e => {
        let mensaje: MensajeG = JSON.parse(e.body) as MensajeG;
        mensaje.fecha = new Date(mensaje.fecha!)
        console.log(mensaje)
        this.mensajes.push(mensaje)
        this.scrollButton();
      })



      this.cliente.subscribe('/chat/escribiendo', e => {
        this.notificacion = e.body
      })
    };



    this.cliente.onDisconnect = (frame) => {
      console.log(frame+ "of")
    }

  }

  escribiendo(texto : string ) { 
    let body = this.user.nombre;
    if(texto.trim()===''){
      body= "borra"
    }
    this.cliente.publish({
      destination: '/app/escribiendo',
      body: body
    })
  }


  enviarMensaje() {
    this.mensaje.tipo = 'MENSAJE'
    
    console.log(this.mensaje.texto)
    if(this.mensaje.texto?.trim()!="" && this.mensaje.texto!=undefined){
      this.cliente.publish({
        destination: '/app/mensaje',
        body: JSON.stringify(this.mensaje)
      })
      this.mensaje.texto=undefined
  
      this.cliente.publish({
        destination: '/app/escribiendo',
        body: "borra"
      })
    }
    
  }

}
