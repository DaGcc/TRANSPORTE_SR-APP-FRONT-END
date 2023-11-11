

import { Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/app/environments/environments';
import { AppService } from 'src/app/app.service';

@Injectable({
    providedIn: 'root'
})                                            //Sirve para interceptar todo lo referente a peticiones y respuestas http
export class InterceptorHttpService implements HttpInterceptor {


    debounce!: NodeJS.Timeout

    appService = inject(AppService);

    constructor(private snackBar: MatSnackBar, private router: Router) {
    }

    //Metodo del HttpInterceptor
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /**
         ** con next.handle(request), lo que estamos haciendo es pasar el requerimiento al siguiente interceptor de la cadena de interceptadores, 
         ** en este caso es el next el siguiente interceptor. 
         **
         ** cont pipe(retry(environment.REINTENTOS)), lo que hacemos es reintentar tantas peticiones se hayan establecido en REINTENTOS,
         ** si y solo si, ocurre algun error.
        */
        return next.handle(request).pipe(retry(environment.REINTENTOS)).

            //?.tap(...)? =>> hace acciones sin modificar el valor emitido
            pipe(tap(event => {
                // console.log(event)
                /*
                 *Capturamos el evento y evaluamos si es una instancia de HttpResponse(respuesta del servidor).
                 *Es decir, que el bloque de condicion "true" solo se ejecutara si el servidor esta encendido.
                */
                if (event instanceof HttpResponse) {

                    //*!Efecto visual que manda a cargar el progres bar, sirve para activarlo
                    this.appService.isLoad.next(true);//!empieza la solicitud.
                    

                    //*evaluamos si esa instancia contiene algun error en la respuesta http
                    if (event.body && event.body.error === true && event.body.errorMessage) {
                        //*si tiene error, lanzamos una instancia de Error con el mensaje de error
                        //*Este error sera capturado por el catchError, para controlarlo 
                        throw new Error(event.body.errorMessage);
                    } else {
                        //*termina la solicitud de manera succes.
                        // this.snackBar.open("EXITO", 'AVISO', { duration: 5000 }); 
                        setTimeout(() => {
                            //? esto se complementa con el  debounce 
                            this.appService.isLoad.next(false);
                        }, 510)
                    }
                } else {
                    //* si no es una instacia de tipo httpResponse hacer algo aquí
                    //* se ejecuta si el servidor esta apagado, es deci que sea todo menos un HttpResponse.

                    if (this.debounce) clearTimeout(this.debounce);

                    this.debounce = setTimeout(() => {
                        //?esto es para evitar el error de ExpressionChangedAfterItHasBeenCheckedError, que sucede al suscribirse en algun lugar 
                        //? para este proyecto en el app.component.ts para lo del progress bar. 
                        this.appService.isLoad.next(true);
                    }, 508)

                    // console.log(event)
                }

                //*se ejeuctara si es que ocurrio algun error en la peticion http, ya sea que el servidor este prendido o por otros motivos.
            })).pipe(catchError((err) => {
                console.log(err);

                //*!Efecto visual que manda a cargar el progres bar, sirve para desactivarlo
                setTimeout(() => {
                    //? esto se complementa con el  debounce 
                    this.appService.isLoad.next(false);
                }, 510)


                //https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
                if (err.status === 400) {//? error de fallo de parte del usuario
                    this.snackBar.open(err.error.mensaje || err.error.error_description, 'ERROR 400', { duration: 5000 });
                }
                else if (err.status === 401) {//? error de falta de credenciales 
                    // console.log(err);
                    this.snackBar.open(err.error.error_description, 'ERROR 401', { duration: 5000 });
                    sessionStorage.getItem(environment.TOKEN_NAME) ?  sessionStorage.removeItem(environment.TOKEN_NAME): '';
                    this.router.navigate(['/auth/login']);
                }
                else if (err.status === 403) {//? error de permisos para manipular el recurso
                    this.router.navigate(['/forbidden-403'])
                }
                else if (err.status === 500) {//? error del servidor
                    this.snackBar.open(err.mensaje || err.error.error, 'ERROR 500', { duration: 5000 });
                } else {
                    this.snackBar.open(err.message, 'ERROR', { duration: 5000 });
                }
                return EMPTY;
            }))/*.pipe( tap(d => {
                console.log(d)
            }));*/
    }
}